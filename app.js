"use strict";

const APP = (() => {
    const doc = window.document;
    let currentYearGl = new Date().getFullYear();
    let calendarDataForJsYearCalendar = {}; // Renamed for clarity, used by js-year-calendar
    let shiftDataForJsYearCalendar = {};  // Renamed for clarity, used by js-year-calendar

    // Configuration
    const shiftConfig = {
        2024: {
            A: 8, B: 29, C: 22, D: 15, color: "#fff",
            ramadan: { startDate: "03/11/2024", endDate: "04/08/2024" },
            holiday: [
                "01/07/2024 H", "02/22/2024 N", "04/09/2024 H", "04/10/2024 H",
                "04/11/2024 H", "04/12/2024 H", "04/14/2024 R", "06/15/2024 H",
                "06/16/2024 H", "06/17/2024 H", "06/18/2024 H", "06/19/2024 R",
                "09/22/2024 H", "09/23/2024 N", "11/17/2024 H",
            ],
            schoolHoliday: []
        },
        2025: {
            A: 10, B: 31, C: 24, D: 17, color: "#fff",
            ramadan: { startDate: "03/01/2025", endDate: "03/31/2025" },
            holiday: [
                "01/05/2025 H", "02/22/2025 N", "02/23/2025 R", "03/30/2025 H",
                "03/31/2025 H", "04/01/2025 H", "04/02/2025 H", "06/05/2025 H",
                "06/06/2025 H", "06/07/2025 H", "06/08/2025 H", "06/09/2025 R",
                "06/10/2025 R", "09/23/2025 N", "11/16/2025 H",
            ],
            schoolHoliday: []
        },
        2026: {
            A: 11, B: 32, C: 25, D: 18, color: "#fff",
            ramadan: { startDate: "02/18/2026", endDate: "03/18/2026" },
            holiday: [
                "01/11/2026 H", "02/22/2026 N","03/19/2026 H", "03/20/2026 H","03/21/2026 H",
                "03/22/2026 H","03/23/2026 R","03/24/2026 R","05/26/2026 H",
                "05/27/2026 H","05/28/2026 H","05/29/2026 H","09/23/2026 N",
                "09/24/2026 H","11/22/2026 H"
     
            ],
            schoolHoliday: []
        }
    };

    const schedulePattern = [
        2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0,
        2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0,
        2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0,
        2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0,
        2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0,
        2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0,
        2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0,
        2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0,
        2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0,
        2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0,
        2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0,
        2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0,
        2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0,
        // Pattern is 368 elements long. Using modulo for safety.
    ];
    const PATTERN_LENGTH = schedulePattern.length;

    const SHIFT_CODES = { 0: "OFF", 1: "M", 2: "E", 3: "N" };
    const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

    // DOM Elements
    let yearSelectionElement;
    let shiftTypeSelectorElement;
    let generatePdfButtonElement;
    const domElementsCache = {
        'A': null, 'B': null, 'C': null, 'D': null
    };


    /**
     * Initializes the js-year-calendar for a given shift type.
     * @param {string} shiftType - The shift letter (A, B, C, D).
     * @param {string}- className - The CSS selector for the calendar container.
     */
    const initNewJsYearCalendar = (shiftType, targetSelector) => {
        // Clear previous calendar instances if any are tied to the element
        const container = doc.querySelector(targetSelector);
        if (!container) {
            console.error(`Container element ${targetSelector} not found.`);
            return;
        }
        container.innerHTML = ''; // Clear content before new calendar

        const yearConfig = shiftConfig[currentYearGl];
        if (!yearConfig) {
            console.error(`Configuration for year ${currentYearGl} not found.`);
            return;
        }

        new Calendar(targetSelector, { // Assuming Calendar is from js-year-calendar
            minDate: new Date(),
            maxDate: new Date(new Date().getFullYear()+1,1,1),
            currentYear: parseInt(currentYearGl),
            renderEnd: (yearCalendar) => {
                const currentYear = yearCalendar.currentYear;
                calendarDataForJsYearCalendar = prepareHolidayRamadanDataForGrid(currentYear, yearConfig);
                shiftDataForJsYearCalendar = generateShiftDataForFullYearGrid(currentYear, shiftType, yearConfig);
            },
            yearChanged: (yearCalendar) => {
                // This callback might be an issue if year can be changed from within js-year-calendar
                // currentYearGl should align. For this app, year is changed via our own dropdown.
                const currentYear = yearCalendar.currentYear;
                if (currentYear.toString() !== currentYearGl.toString()) { // Ensure sync
                    currentYearGl = currentYear.toString();
                     // Potentially update other UI elements or re-trigger full calendar generation logic
                }
                calendarDataForJsYearCalendar = prepareHolidayRamadanDataForGrid(currentYear, shiftConfig[currentYear]);
                shiftDataForJsYearCalendar = generateShiftDataForFullYearGrid(currentYear, shiftType, shiftConfig[currentYear]);
            },
            customDayRenderer: (htmlElement, date) => {
                const timestamp = date.getTime();
                const holidayRamadanInfo = calendarDataForJsYearCalendar[timestamp];
                const shiftInfo = shiftDataForJsYearCalendar[timestamp];

                if (shiftInfo) {
                    htmlElement.classList.add(shiftInfo.class);
                    htmlElement.append(` (${shiftInfo.shiftT})`);
                }
                if (holidayRamadanInfo) {
                    // js-year-calendar might overwrite classes, so ensure holiday classes are prominent
                    // Or, ensure your CSS handles combined classes well.
                    htmlElement.classList.add(holidayRamadanInfo.class);
                }
            }
        });
    };

    /**
     * Sets up the year selection dropdown.
     */
    const setupYearsSelection = () => {
        const selectionDiv = doc.querySelector('.year-selection');
        if (!selectionDiv) return;

        const years = Object.keys(shiftConfig);
        let optionsHtml = years.map(year =>
            `<option value='${year}' ${currentYearGl == year ? 'selected' : ''}>${year}</option>`
        ).join('');

        selectionDiv.innerHTML = `
            <div class='row'>
                <div class='col-sm-12 col-lg-4 col-md-4 m-auto'>
                    <h3 class='text-center'>Which year would you like to show?</h3>
                    <select class='form-select form-select-lg col-3' id='year-selection'>
                        ${optionsHtml}
                    </select>
                </div>
            </div>`;

        yearSelectionElement = doc.querySelector('#year-selection');
        yearSelectionElement.addEventListener('change', (e) => {
            currentYearGl = e.target.value;
            // Re-initialize the calendar for the new year and currently selected shift
            const currentShift = shiftTypeSelectorElement ? shiftTypeSelectorElement.value : Object.keys(shiftConfig[currentYearGl])[0];
            generateFullYearCalendarView(currentYearGl, currentShift);
        });
    };
    
    /**
     * Gets dates between two date strings.
     * @param {string} startDateStr - MM/DD/YYYY
     * @param {string} endDateStr - MM/DD/YYYY
     * @returns {Array<{date: Date, dateTime: number}>}
     */
    const getDatesBetweenTwoDates = (startDateStr, endDateStr) => {
        if (!startDateStr || !endDateStr) return [];
        // Basic validation for date strings if needed, or rely on Date parsing
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || startDate > endDate) {
             console.warn("Invalid start/end dates for getDatesBetweenTwoDates:", startDateStr, endDateStr);
             return [];
        }
        
        const dates = [];
        let currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()); // Normalize time part

        while (currentDate <= endDate) {
            dates.push({
                date: new Date(currentDate),
                dateTime: currentDate.getTime()
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };

    /**
     * Prepares holiday and Ramadan data for the js-year-calendar grid.
     * @param {number|string} year - The year.
     * @param {object} yearConfig - The configuration for the given year from shiftConfig.
     * @returns {object} - Object keyed by timestamp with class and date info.
     */
    const prepareHolidayRamadanDataForGrid = (year, yearConfig) => {
        const dataPreparedObj = {};
        if (!yearConfig) return dataPreparedObj;

        const ramadanDaysObj = getDatesBetweenTwoDates(yearConfig.ramadan.startDate, yearConfig.ramadan.endDate);
        ramadanDaysObj.forEach(el => {
            dataPreparedObj[el.dateTime] = { class: "ramadan", date: el.dateTime };
        });

        (yearConfig.holiday || []).forEach(holidayStr => {
            const parts = holidayStr.split(" ");
            const date = new Date(parts[0]); // Assumes MM/DD/YYYY
            if (!isNaN(date.getTime())) {
                 dataPreparedObj[date.getTime()] = {
                    class: parts[1] || "holiday", // Default to "holiday" if no class specified
                    date: date.getTime()
                };
            } else {
                console.warn("Invalid holiday date string:", parts[0]);
            }
        });
        return dataPreparedObj;
    };

    /**
     * Generates shift data for a full year for a specific shift type, for js-year-calendar.
     * @param {number|string} year - The year.
     * @param {string} shiftLetter - The shift letter (A, B, C, D).
     * @param {object} yearConfig - The configuration for the given year from shiftConfig.
     * @returns {object} - Object keyed by timestamp with shift details.
     */
    const generateShiftDataForFullYearGrid = (year, shiftLetter, yearConfig) => {
        let currentIndex = yearConfig[shiftLetter];
        const shiftValueObj = {};

        for (let m = 0; m < 12; m++) {
            const totalDaysInMonth = new Date(year, m + 1, 0).getDate();
            for (let d = 1; d <= totalDaysInMonth; d++) {
                const currentDate = new Date(year, m, d);
                const timestamp = currentDate.getTime();
                const shiftCode = schedulePattern[currentIndex % PATTERN_LENGTH];
                const shiftText = SHIFT_CODES[shiftCode] || "ERR";

                shiftValueObj[timestamp] = {
                    shiftT: shiftText,
                    shiftL: shiftLetter,
                    dateTime: timestamp,
                    date: currentDate.toLocaleDateString(), // Consider locale for display consistency
                    day: currentDate,
                    class: shiftText === "OFF" ? `day-off-border-${shiftLetter}` : `day-${shiftLetter}`
                };
                currentIndex++;
            }
        }
        return shiftValueObj;
    };

    /**
     * Initializes the full year calendar view, typically using js-year-calendar.
     * This sets up the main calendar display.
     * @param {number|string} year - The year to display.
     * @param {string} initialShiftType - The initial shift type to display.
     */
    const generateFullYearCalendarView = (year, initialShiftType) => {
        currentYearGl = year.toString(); // Ensure currentYearGl is updated
        const yearConfig = shiftConfig[currentYearGl];
        if (!yearConfig) {
            console.error(`No configuration found for year ${currentYearGl}. Cannot generate calendar view.`);
            // Potentially display an error message to the user
            doc.querySelectorAll('.generated-result-A, .generated-result-B, .generated-result-C, .generated-result-D').forEach(el => el.innerHTML = 'Configuration missing.');
            return;
        }

        // Clear all shift display areas
        Object.keys(domElementsCache).forEach(key => {
            if (domElementsCache[key]) domElementsCache[key].innerHTML = '';
        });
        
        // Initialize for the selected shift type
        initNewJsYearCalendar(initialShiftType, `.generated-result-${initialShiftType}`);

        // Update year in UI if there's a dedicated display for it (e.g., #currYear)
        // const currYearDisplay = doc.querySelector('#currYear');
        // if (currYearDisplay) currYearDisplay.innerHTML = year;
    };

    /**
     * Sets up the shift type selector.
     */
    const setupShiftTypeSelector = () => {
        shiftTypeSelectorElement = doc.querySelector('#shiftType');
        if (!shiftTypeSelectorElement) return;
        
        shiftTypeSelectorElement.addEventListener('change', (e) => {
            const selectedShift = e.target.value;
            generateFullYearCalendarView(currentYearGl, selectedShift);
        });
    };
    
    /**
     * Prepares all necessary data for PDF generation for a given year.
     * @param {number|string} year - The year for which to prepare data.
     * @returns {Array<object>|null} - Array of month data objects, or null if config missing.
     */
    const prepareDataForPDF = (year) => {
        const yearConfig = shiftConfig[year];
        if (!yearConfig) {
            console.error(`Configuration for year ${year} not found for PDF generation.`);
            return null;
        }

        const yearSpecialDates = {
            ramadanTimestamps: new Set(getDatesBetweenTwoDates(yearConfig.ramadan.startDate, yearConfig.ramadan.endDate).map(d => d.dateTime)),
            holidayData: (yearConfig.holiday || []).reduce((acc, hStr) => {
                const parts = hStr.split(" ");
                const date = new Date(parts[0]); // Assumes MM/DD/YYYY
                if(!isNaN(date.getTime())) acc[date.getTime()] = parts[1] || "holiday";
                return acc;
            }, {}),
            schoolHolidayData: (yearConfig.schoolHoliday || []).reduce((acc, hStr) => {
                const parts = hStr.split(" ");
                const date = new Date(parts[0]);
                if(!isNaN(date.getTime())) acc[date.getTime()] = parts[1] || "sholiday"; // Assuming 'sholiday' class
                return acc;
            }, {})
        };

        let currentIndices = {
            A: yearConfig.A,
            B: yearConfig.B,
            C: yearConfig.C,
            D: yearConfig.D
        };

        const allMonthsData = [];

        for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
            const firstDayOfMonth = new Date(year, monthIdx, 1);
            const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
            
            const monthEntry = {
                year: year,
                month: MONTH_NAMES[monthIdx],
                monthDays: [],
                A: [], B: [], C: [], D: []
            };

            // Generate day headers and apply special day classes
            for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
                const currentDate = new Date(year, monthIdx, dayNum);
                const timestamp = currentDate.getTime();
                let dayClass = "";

                if (yearSpecialDates.ramadanTimestamps.has(timestamp)) {
                    dayClass += " ramadan";
                } else if (yearSpecialDates.holidayData[timestamp]) {
                    dayClass += ` ${yearSpecialDates.holidayData[timestamp]}`;
                }
                if (yearSpecialDates.schoolHolidayData[timestamp]) { // School holidays can coexist
                    dayClass += ` ${yearSpecialDates.schoolHolidayData[timestamp]}`;
                }
                
                monthEntry.monthDays.push({
                    weekDayH: DAYS_SHORT[currentDate.getDay()],
                    weekDayN: dayNum,
                    class: dayClass.trim(),
                    // hasNote: false, // Placeholder if notes functionality is re-added
                    date: currentDate.toLocaleDateString(),
                    dateTime: timestamp
                });
            }
            
            // Generate shift data for each group
            ['A', 'B', 'C', 'D'].forEach(shiftLetter => {
                const shiftResult = generateShiftDataForMonth(shiftLetter, daysInMonth, currentIndices[shiftLetter]);
                monthEntry[shiftLetter] = shiftResult.shifts;
                currentIndices[shiftLetter] = shiftResult.nextIndex;
            });
            allMonthsData.push(monthEntry);
        }
        return allMonthsData;
    };

    /**
     * Generates shift data for a specific month and shift group.
     * @param {string} shiftLetter - The shift letter (A, B, C, D).
     * @param {number} numDaysInMonth - Total days in the month.
     * @param {number} startIndexInPattern - The starting index in schedulePattern.
     * @returns {{shifts: Array<object>, nextIndex: number}}
     */
    const generateShiftDataForMonth = (shiftLetter, numDaysInMonth, startIndexInPattern) => {
        const shifts = [];
        let currentIndex = startIndexInPattern;
        for (let i = 0; i < numDaysInMonth; i++) {
            const shiftCode = schedulePattern[currentIndex % PATTERN_LENGTH];
            const shiftText = SHIFT_CODES[shiftCode] || "ERR";
            shifts.push({
                shiftT: shiftText,
                class: shiftText === "OFF" ? `day-off-${shiftLetter}` : `day-${shiftLetter}`
            });
            currentIndex++;
        }
        return { shifts, nextIndex: currentIndex };
    };

    /**
     * Defines the styles for the PDF document.
     * @returns {object} pdfMake styles object.
     */
    const getPdfStyles = () => ({
        header: { margin: [0, 30], color: "white", fillColor: "#212529", alignment: "center" },
        header1: { color: "white", fillColor: "#212529", alignment: "center" },
        R: { fillColor: "#FDB121", color: "white", alignment: "center" },
        H: { fillColor: "#00DFFF", color: "white", alignment: "center" },
        N: { fillColor: "#993299", color: "white", alignment: "center" },
        L: { fillColor: "#407294", color: "white", alignment: "center" }, // Weekend style
        ramadan: { fillColor: "#20B2AA", color: "white", alignment: "center" },
        note: { /* Define note style if needed */ },
        // Shift specific styles
        shiftA: { fillColor: "#00768B", color: "white", alignment: "center" },
        dayoffA: { fillColor: "#00768B", color: "white", alignment: "center" }, // Or a lighter shade
        shiftB: { fillColor: "#1EA0A5", color: "white", alignment: "center" },
        dayoffB: { fillColor: "#1EA0A5", color: "white", alignment: "center" },
        shiftC: { fillColor: "#004C48", color: "white", alignment: "center" },
        dayoffC: { fillColor: "#004C48", color: "white", alignment: "center" },
        shiftD: { fillColor: "#B44237", color: "white", alignment: "center" },
        dayoffD: { fillColor: "#B44237", color: "white", alignment: "center" },
        // Default cell style (can be overridden)
        defaultCell: { alignment: "center" }
    });

    /**
     * Generates and triggers download of the PDF.
     */
    const generatePDF = () => {
        const pdfData = prepareDataForPDF(currentYearGl);
        if (!pdfData || pdfData.length === 0) {
            alert("Could not generate PDF data. Check console for errors.");
            return;
        }

        const letters = ["A", "B", "C", "D"];
        const finalPdfContent = [];

        pdfData.forEach(monthData => {
            const monthTableBody = [];
            
            // Header Row 1: Empty, Empty, "Days", Day Names (SUN, MON...)
            const dayNamesRow = [{ text: '', colSpan: 2, style: "header1" }, {}, { text: "Days", style: "header1" }];
            monthData.monthDays.forEach(day => {
                dayNamesRow.push({ text: day.weekDayH, style: (day.class && getPdfStyles()[day.class.split(' ')[0]]) ? day.class.split(' ')[0] : "header1" });
            });
            monthTableBody.push(dayNamesRow);

            // Header Row 2: Month Name, "Groups", "#", Day Numbers (1, 2, 3...)
            const dayNumbersRow = [
                { text: monthData.month, rowSpan: 5, style: "header" }, // Month Name (spans 5 rows)
                { text: "Groups", rowSpan: 5, style: "header" },    // "Groups" (spans 5 rows)
                { text: "#", style: "header1" }                     // "#"
            ];
            monthData.monthDays.forEach(day => {
                dayNumbersRow.push({ text: day.weekDayN, style: (day.class && getPdfStyles()[day.class.split(' ')[0]]) ? day.class.split(' ')[0] : "header1" });
            });
            monthTableBody.push(dayNumbersRow);

            // Shift Rows (A, B, C, D)
            letters.forEach(letter => {
                const shiftRow = [
                    {}, // Spanned by Month Name
                    {}, // Spanned by "Groups"
                    { text: letter, style: `shift${letter}` } // Shift Letter (A, B, C, D)
                ];
                monthData[letter].forEach(shiftDay => {
                    shiftRow.push({
                        text: shiftDay.shiftT,
                        style: shiftDay.class.replace(/-/g, '') // e.g., day-off-A -> dayoffA
                    });
                });
                monthTableBody.push(shiftRow);
            });
            
            finalPdfContent.push({
                margin: [-35, 5, -35, 5], // Adjust margins [left, top, right, bottom]
                table: {
                    // widths: ['auto', 'auto', 'auto', ...Array(monthData.monthDays.length).fill('*')], // Distribute remaining equally
                    // headerRows: 2, // Number of header rows that repeat if table breaks across pages
                    body: monthTableBody
                },
                // layout: 'lightHorizontalLines' // Optional: adds some default styling
            });
        });


        // Legend
        finalPdfContent.push({
            columns: [
                { width: '*', text: '' },
                {
                    width: 'auto',
                    table: {
                        body: [
                            [
                                { text: "Ramadan", style: "ramadan", margin: [5, 2] }, {},
                                { text: "Rescheduled", style: "R", margin: [5, 2] }, {},
                                { text: "National/Founding", style: "N", margin: [5, 2] }, {},
                                { text: "Holidays", style: "H", margin: [5, 2] }, {},
                                { text: "Weekends", style: "L", margin: [5, 2] } // Assuming L is for weekend
                            ],
                        ]
                    },
                    layout: 'noBorders'
                },
                { width: '*', text: '' },
            ],
            margin: [0, 20, 0, 10] // Margin for the legend section
        });

        // Footer/Developer Credit
        finalPdfContent.push({
            text: 'Developed by Jassem',
            alignment: 'center',
            fontSize: 10,
            italics: true,
            margin: [0, 20, 0, 0]
        });

        const docDefinition = {
            info: {
                title: `${pdfData[0].year} Shift Schedule`,
                author: 'https://jassemdeveloper.github.io/', // Replace if this is a placeholder
                subject: `${pdfData[0].year} Shift Schedule`,
            },
            pageSize: { width: 20000, height: 'auto' }, // Custom page size
            pageOrientation: 'landscape', // Changed to landscape as tables are wide
            pageMargins: [ 40, 60, 40, 60 ], // [left, top, right, bottom]
            defaultStyle: { fontSize: 10, alignment: "center" }, // Smaller default font for more content
            header: {
                text: `${pdfData[0].year} Shift Schedule`,
                fontSize: 24, // Reduced header font size
                margin: [0, 20, 0, 20], // Adjusted header margin
                bold: true,
                alignment: "center"
            },
            content: finalPdfContent,
            styles: getPdfStyles()
        };
        pdfMake.createPdf(docDefinition).download(`${pdfData[0].year} Shift Schedule.pdf`);
    };
    


    let generatePDF1=function(){
  let d=prepareDataForPDF(currentYearGl);
  let letters=["A","B","C","D"];
  let finalDataToPrint=[];
  for(var i=0;i < d.length;i++){
    let mainArr=[];
    let days=[];
    let daysN=[];
    days.push({text:'',colSpan:2,style:"header1"},{},{text:"Days",style:"header1"});
    daysN.push({text:d[i].month,rowSpan:5,style:"header"},{text:"Groups",rowSpan:5,style:"header"},{text:"#",style:"header1"});
    for(var j=0;j < d[i].monthDays.length;j++){
      let tempStyle="header1";
      if(d[i].monthDays[j].class.length > 0){
          tempStyle=d[i].monthDays[j].class.replace(/-/g,'');
         
        }
      
         days.push(
           {
             text: d[i].monthDays[j].weekDayH,
             style: tempStyle.trim()
             }
           );
         daysN.push(
           {
             text: d[i].monthDays[j].weekDayN,
             style: tempStyle.trim()
             }
           );
    }
     mainArr.push(days);
     mainArr.push(daysN);
    for(var ii=0;ii<letters.length;ii++){
      let shift=[];
      shift.push({},{},{text:letters[ii],style:"shift"+letters[ii]});
      for(var jj=0;jj < d[i][letters[ii]].length;jj++){
         shift.push(
           {
             text:d[i][letters[ii]][jj].shiftT,
             style:d[i][letters[ii]][jj].class.replace(/-/g,'')
             }
           );
      }
      mainArr.push(shift);
      }

finalDataToPrint.push({
margin:[-35,5],
table:{
   headerRows: 6,
     width: ['auto'],
    body: mainArr
}
});
  }

finalDataToPrint.push({
columns: [
    { width: '*', text: '' },
    {
        width: 'auto',
            table: {
                    body: [
                            [
                            {text:"Ramadan",style:"ramadan",margin:[5,5]},
                            {},
                            {text:"Rescheduled days off",style:"R",margin:[5,5]},
                            {},
                            {text:"National/Founding Day",style:"N",margin:[5,5]},
                            {},
                            {text:"Holidays",style:"H",margin:[5,5]},
                            {},
                            {text:"Weekends",style:"L",margin:[5,5]}
                            ],
                    ]
            },
            layout: 'noBorders'
    },
    { width: '*', text: '' },
]
});

finalDataToPrint.push({
table:{
   body:[
       [
          {text:'Developed by Jassem'} 
          ]
       ]
},           
  layout: 'noBorders'
} );

  var dd = {
     info: {
title: d[0].year + " Shift Schedule",
author: 'https://jassemdeveloper.github.io/',
subject: d[0].year + " Shift Schedule",
},
   pageSize: {
    width:1165,
    height:'auto'
},
  defaultStyle: {
fontSize: 12,
alignment:"center"
},
   header:{
     text:d[0].year + " Shift Schedule",
     fontSize:30,
     margin:[0,4],
     bold:true,
     alignment:"center"
 },
pageOrientation: 'portrait',
content: finalDataToPrint,
styles: {
    header:{
        margin:[0,30],
        color:"white",
        fillColor:"#212529",
    },
    header1:{
        color:"white",
        fillColor:"#212529",
    },
    R:{
fillColor: "#FDB121",		        
color:"white",
},
H:{
fillColor: "#00DFFF",		        
color:"white",
},
N:{
fillColor: "#993299",		        
color:"white",
},
L:{
fillColor: "#407294",		        
color:"white",
},
ramadan:{
fillColor: "#20B2AA",		        
color:"white",
},
shiftA:{
    fillColor: "#00768B",		        
color:"white",
},
dayoffA:{
    fillColor: "#00768B",		        
color:"white",
},
shiftB:{
    fillColor: "#1EA0A5",		        
color:"white",
},
dayoffB:{
    fillColor: "#1EA0A5",		        
color:"white",
},
shiftC:{
    fillColor: "#004C48",		        
color:"white",
},
dayoffC:{
    fillColor: "#004C48",		        
color:"white",
},
shiftD:{
    fillColor: "#B44237",		        
color:"white",
},
dayoffD:{
    fillColor: "#B44237",		        
color:"white",
}
}
  }
 pdfMake.createPdf(dd).download(d[0].year + " Shift Schedule.pdf");
}

    /**
     * Initializes application event listeners and initial view.
     */
    const initApp = () => {
        // Cache general DOM elements
        Object.keys(domElementsCache).forEach(key => {
            domElementsCache[key] = doc.querySelector(`.generated-result-${key}`);
        });

        setupYearsSelection();
        setupShiftTypeSelector();

        generatePdfButtonElement = doc.querySelector('#generatePDF');
        if (generatePdfButtonElement) {
            generatePdfButtonElement.addEventListener('click', generatePDF1);
        } else {
            console.warn("#generatePDF button not found.");
        }
        
        // Initial calendar generation
        const initialYear = currentYearGl;
        const yearConfig = shiftConfig[initialYear];
        if (yearConfig) {
             const initialShift = shiftTypeSelectorElement ? shiftTypeSelectorElement.value : Object.keys(yearConfig)[0];
             generateFullYearCalendarView(initialYear, initialShift);
        } else {
            console.error(`Initial configuration for year ${initialYear} is missing.`);
            // Display error in UI if appropriate
            Object.values(domElementsCache).filter(el => el).forEach(el => el.innerHTML = `Configuration for year ${initialYear} is missing.`);
        }

    };

    // Initialize the application once the DOM is ready
    doc.addEventListener('DOMContentLoaded', initApp);

    // Public API (if needed for external calls, though this app seems self-contained)
    return {
        // generateFullYearCalendarView, // Expose if needed
        // generatePDF // Expose if needed
    };

})();