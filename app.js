const APP=(()=>{
let doc=window.document;
let currentYearGl=new Date().getFullYear();


let shiftConfig={
  2024:{
    A:8,
    B:29,
    C:22,
    D:15,
    color:"#fff",
    ramadan:{
      startDate:"03/11/2024",
      endDate:"04/08/2024"
    },
    holiday:[
      "01/07/2024 H",
      "02/22/2024 N",
      "04/09/2024 H",
      "04/10/2024 H",
      "04/11/2024 H",
      "04/12/2024 H",
      "04/14/2024 R",
      "06/15/2024 H",
      "06/16/2024 H",
      "06/17/2024 H",
      "06/18/2024 H",
      "06/19/2024 R",
      "09/22/2024 H",
      "09/23/2024 N",
      "11/17/2024 H",
    ],
    schoolHoliday:[]
  },
  2025:{
    A:10,
    B:31,
    C:24,
    D:17,
    color:"#fff",
    ramadan:{
      startDate:"03/01/2025",
      endDate:"03/31/2025"
    },
    holiday:[
        "01/05/2025 H",
        "02/22/2025 N",
        "02/23/2025 R",
        "03/30/2025 H",
        "03/31/2025 H",
        "04/01/2025 H",
        "04/02/2025 H",
        "06/05/2025 H",
        "06/06/2025 H",
        "06/07/2025 H",
        "06/08/2025 H",
        "06/09/2025 R",
        "06/10/2025 R",
        "09/23/2025 N",
        "11/16/2025 H",
      ],
    schoolHoliday:[]
  },
  2026:{
    A:11,
    B:32,
    C:25,
    D:18,
    color:"#fff",
    ramadan:{
      startDate:"",
      endDate:""
    },
    holiday:[],
    schoolHoliday:[]
  }
}
let AIndexG,BIndexG,CIndexG,DIndexG=0;
let AIndex,BIndex,CIndex,DIndex=0;
let ramadanDays=[];
let holidays=[];
let sholidays=[];
let holidaysWithClasses=[];
let sHolidaysWithClasses=[];
let finalNotesData={};
let selectedDayNote='';
let schedulePattern=[2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,                             
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0,
                     2,2,2,2,2,2,2,0,0,1,1,1,1,1,1,1,0,0,3,3,3,3,3,3,3,0,0,0 
                     ];


const calendarInitializationAndPreparation=(year)=>{
  let days=document.querySelectorAll(".day-content");
  let monthNumbers=[];
  days.forEach((d)=>{
      let monthNumber=d.offsetParent.offsetParent.parentNode.attributes[1].textContent;
      monthNumbers.push(monthNumber);
  });
  let monthNumbersU=new Set(monthNumbers);
  let monthsTemp={};
  monthNumbersU.forEach((m)=>{
      let daysTemp=[];
      days.forEach((d)=>{
          let day=d;
          day.setAttribute("class", "")
          let monthNumber=d.offsetParent.offsetParent.parentNode.attributes[1].textContent;
          if(monthNumber == m){
            calendarData.forEach((cd)=>{
                 let date=cd.date;
                 let className=cd.className;
                 
                  if(new Date(currentYear,monthNumber,d.textContent).getTime() == date){
                    day.classList.forEach((ell)=>{
                      
                      day.classList.remove(ell);
                     });
                    //day.classList.add(className);
                  }
              });
              daysTemp.push({
                  dateNum:d.textContent,
                  date:new Date(currentYear,monthNumber,d.textContent),
                  dateString:new Date(currentYear,monthNumber,d.textContent).toLocaleDateString(),
                  dateTimeStamp:new Date(currentYear,monthNumber,d.textContent).getTime() 
              });
          }
      });
      monthsTemp[m]={
          days:daysTemp,
          monthName:data.months[m]
      };
  });
  fullYearDates[currentYear]=monthsTemp;
}

const initNewCalendar = (shiftType,className)=>{
   document.querySelector('.generated-result-A').innerHTML='';
   document.querySelector('.generated-result-B').innerHTML='';
   document.querySelector('.generated-result-C').innerHTML='';
   document.querySelector('.generated-result-D').innerHTML='';
    const calendar = new Calendar(`${className}`, {
      minDate:new Date(),
      maxDate:new Date(new Date().getFullYear()+1,1,1),
        renderEnd:(yearCalendar)=>{
            let currentYear=yearCalendar.currentYear;
            currentYearGl=yearCalendar.currentYear;
            let calendarData=prepareCalendarDataGrid(currentYear,shiftType);
            let days=document.querySelectorAll(".day-content");
            let monthNumbers=[];
            days.forEach((d)=>{
                let monthNumber=d.offsetParent.offsetParent.parentNode.attributes[1].textContent;
                monthNumbers.push(monthNumber);
            });
            let monthNumbersU=new Set(monthNumbers);
           let retunredData=generatePerShiftGridT(currentYear,shiftType);
            monthNumbersU.forEach((m)=>{
                days.forEach((d)=>{
                    let day=d;
                    let monthNumber=d.offsetParent.offsetParent.parentNode.attributes[1].textContent;

                    let foundData=retunredData[new Date(currentYear,monthNumber,d.textContent).getTime()];
                    if (foundData != undefined){
                      day.setAttribute("data-datetime",new Date(currentYear,monthNumber,d.textContent).getTime());
                    day.setAttribute("data-date",new Date(currentYear,monthNumber,d.textContent).toLocaleDateString());
                      day.classList.add(foundData.class);
                      day.append(`(${foundData.shiftT})`);

                    }

                    if(monthNumber == m){
                      calendarData.forEach((cd)=>{
                           let date=cd.date;
                           let className=cd.className;
                            if(new Date(currentYear,monthNumber,d.textContent.split('(')[0]).getTime() == date){
                              day.classList.add(className);
                            }
                        });
                    }

                    
                });

            });
        },
        yearChanged:(yearCalendar)=>{
          let currentYear=yearCalendar.currentYear;
          currentYearGl=yearCalendar.currentYear;
          let calendarData=prepareCalendarDataGrid(currentYear,shiftType);
          let days=document.querySelectorAll(".day-content");
          let monthNumbers=[];
          days.forEach((d)=>{
              let monthNumber=d.offsetParent.offsetParent.parentNode.attributes[1].textContent;
              monthNumbers.push(monthNumber);
          });
          let monthNumbersU=new Set(monthNumbers);
         let retunredData=generatePerShiftGridT(currentYear,shiftType);
          monthNumbersU.forEach((m)=>{
              days.forEach((d)=>{
                  let day=d;
                  let monthNumber=d.offsetParent.offsetParent.parentNode.attributes[1].textContent;

                  let foundData=retunredData[new Date(currentYear,monthNumber,d.textContent).getTime()];
                  if (foundData != undefined){
                    day.setAttribute("data-datetime",new Date(currentYear,monthNumber,d.textContent).getTime());
                  day.setAttribute("data-date",new Date(currentYear,monthNumber,d.textContent).toLocaleDateString());
                    day.classList.add(foundData.class);
                    day.append(`(${foundData.shiftT})`);

                  }

                  if(monthNumber == m){
                    calendarData.forEach((cd)=>{
                         let date=cd.date;
                         let className=cd.className;
                          if(new Date(currentYear,monthNumber,d.textContent.split('(')[0]).getTime() == date){
                            day.classList.add(className);
                          }
                      });
                  }

                  
              });

          });
        },
        customDayRenderer:(e)=>{
          //console.log(e);
        }
  });
}

let yearsSelection=()=>{
  let selectionDiv=doc.querySelector('.year-selection');
  let years=Object.keys(shiftConfig);
  let tempOption=`<div class='row'>
        <div class='col-sm-12 col-lg-4 col-md-4 m-auto'>
        <h3 class='text-center'>Which year would you like to show ?</h3>
        <select class='form-select form-select-lg col-3' id='year-selection'>`;
    years.forEach((el)=>{
      if(currentYearGl == el){
        tempOption +=`<option value='${el}' selected>${el}</option>`;
      }else{
        tempOption +=`<option value='${el}'>${el}</option>`;

      }
      
    });
      tempOption +="</select></div></div>";
      selectionDiv.innerHTML=tempOption;
      let selectedYear=doc.querySelector('#year-selection');
          selectedYear.addEventListener('change',(el)=>{
            let selectedValue=el.target.value;
            currentYearGl=selectedValue;
            generateFullYearCalendar(selectedValue,"row");
          });
}   

let days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
//let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
let months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let generateLayout=(d)=>{
  let template="<table class='table table-bordered text-center'>";
  d.forEach((el) => {
    template +=`<thead class="table-dark">
      <tr>
      <th colspan="2"></th>
      <th>Days</th>`;
    el.monthDays.forEach((el1)=>{
      template +=`<th class="${el1.class}">${el1.weekDayH}</th>`;
    });
    template +=`
     </tr></thead><tbody>
      <tr class='table-dark'>
      <td rowspan="5" class="fs-3 align-middle"> <span class='rotate-text'> ${el.month} </span></td>
      <td rowspan="5" class="fs-3  align-middle"> <span class='rotate-text'> Groups </span></td>
      <td >#</td>
      `
      el.monthDays.forEach((el1)=>{
        template +=`<td class="${el1.class}">${el1.weekDayN}</td>`;
      });
      template +=`</tr><tr><td class="shift-A">A</td>`;
      el.A.forEach((el1)=>{template +=`<td class='${el1.class}'>${el1.shiftT}</td>`;});
      template +=`</tr><tr><td class="shift-B">B</td>`;
      el.B.forEach((el1)=>{template +=`<td class='${el1.class}'>${el1.shiftT}</td>`;});
      template +=`</tr><tr><td class="shift-C">C</td>`;
      el.C.forEach((el1)=>{template +=`<td class='${el1.class}'>${el1.shiftT}</td>`;});
      template +=`</tr><tr><td class="shift-D">D</td>`;
      el.D.forEach((el1)=>{template +=`<td class='${el1.class}'>${el1.shiftT}</td>`;});
      template +=`</tr>`;
  });
  template +=`</tbody></table>`;
doc.querySelector('.generated-result').innerHTML=template;
}

let generateTemplate = function() {
  let count = 1;
  let temp = '';
  let days = sliceDate().monthDays;
  let firstDay = sliceDate().firstDay + 1;
  temp += `
      <table class='calendar-month'>
       <tr  class='calendar-month-header'>
        <th colspan='7'>
        ${months[sliceDate().month]}
        </th>
        </tr>
       <tr class='calendar-month-days-header'>
        <td class='calendar-month-day-header'>Sun</td>
        <td class='calendar-month-day-header'>Mon</td>
        <td class='calendar-month-day-header'>Tue</td>
        <td class='calendar-month-day-header'>Wed</td>
        <td class='calendar-month-day-header'>Thr</td>
        <td class='calendar-month-day-header'>Fri</td>
        <td class='calendar-month-day-header'>Sat</td>
       </tr>
      `;
  for (let i = 1; i <= days; i++) {
    if (count == 1) {
      if (i == 1) {
        if (firstDay > 0) {
          temp += `<tr class='calendar-month-days'>`;
          for (let i = 0; i < firstDay; i++) {
            if (i == firstDay - 1) {
              temp += `
                             <td class='day'>1</td>
                             `;
            } else {
              temp += `
                             <td class='day'></td>
                             `;
            }

          }
          count = firstDay;
        } else {
          temp += `
             <tr class='calendar-month-days'>
            <td class='day'>${i}</td>
        `;
        }
      } else {
        temp += `
             <tr class='calendar-month-days'>
            <td class='day'>${i}</td>
        `;
      }

      count++;
    } else if (count == 7) {
      count = 1;
      temp += `
            <td class='day'>${i}</td>
            </tr>
             `;
    } else {
      temp += `
            <td class='day'>${i}</td>
        `;
      count++;
    }
  }
  temp += `
      </table>
      `;
  return temp;
}

let generateTemplateTable = function(date) {
  let count = 1;
  let temp = '';
  let days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  let firstDay = new Date(date.getFullYear(), date.getMonth(),1).getDay();
  let weekDays=["SUN","MON","TUE","WED","THR","FRI","SAT"];
  let headerTemp="<tr class='calendar-month-days-header'>";
  
let remain=7 - firstDay ;
  console.log(firstDay,weekDays[firstDay],remain);
 /*
  let headers=array.forEach(element => {
    headerTemp +=`
    <td class='calendar-month-day-header'>${weekDays[firstDay]}</td>
    `
    
  });
  headerTemp +=`</tr>`;
*/
 
  temp += `
      <table class='calendar-month'>
       <tr  class='calendar-month-header'>
        <th colspan='7'>
        ${months[date.getMonth()]}
        </th>
        </tr>
       <tr class='calendar-month-days-header'>
        <td class='calendar-month-day-header'>Sun</td>
        <td class='calendar-month-day-header'>Mon</td>
        <td class='calendar-month-day-header'>Tue</td>
        <td class='calendar-month-day-header'>Wed</td>
        <td class='calendar-month-day-header'>Thr</td>
        <td class='calendar-month-day-header'>Fri</td>
        <td class='calendar-month-day-header'>Sat</td>
       </tr>
      `;
  for (let i = 1; i <= days; i++) {
    let dateTimeValue = new Date(date.getFullYear(), date.getMonth(), i).getTime();
    let classValue='';
    if(ramadanDays.indexOf(dateTimeValue) !=-1){
      classValue='ramadan';
    }else if(holidays.indexOf(dateTimeValue) !=-1){
      let valueIndex=holidays.indexOf(dateTimeValue);
      classValue=holidaysWithClasses[valueIndex].split(" ")[1] != undefined ? holidaysWithClasses[valueIndex].split(" ")[1]:"holiday";
    }else{
      classValue='';
    }
    if (count == 1) {
      if (i == 1) {
        if (firstDay > 0) {
          temp += `<tr class='calendar-month-days'>`;
          for (let i = 0; i < firstDay; i++) {
            if (i == firstDay - 1) {
              temp += `
                             <td class='day ${classValue}' data-date='${dateTimeValue}'>1</td>
                             `;
            } else {
              temp += `
                             <td class='day'></td>
                             `;
            }
          }
          if(firstDay-1 == 6){
              temp += `
                             </tr>
                             `;
            count=0;
          }else{
        count = firstDay;
          }
          
        } else {
          temp += `
             <tr class='calendar-month-days'>
            <td class='day ${classValue}' data-date='${dateTimeValue}'>${i}</td>
        `;
        }
      } else {
        temp += `
             <tr class='calendar-month-days'>
            <td class='day ${classValue}' data-date='${dateTimeValue}'>${i}</td>
        `;
      }
      count++;
    } else if (count == 7) {
      count = 1;
      temp += `
            <td class='day ${classValue}' data-date='${dateTimeValue}'>${i}</td>
            </tr>
             `;
    } else {
      temp += `
            <td class='day ${classValue}' data-date='${dateTimeValue}'>${i}</td>
        `;
      count++;
    }
  }
  temp += `
      </table>
      `;
  return temp;
}

let generatePerShift=function(shiftLetter,days,index){
  let temp1='';
  let temp2='';
  let shiftValues=[];
        for(let i=1;i<=days;i++){
          let dayClass='';
          let value=schedulePattern[index] == 1 ? "M" : schedulePattern[index] == 2 ? "E" : schedulePattern[index] == 3 ? "N":"OFF";
          shiftValues.push({
            shiftT:value,
            shiftL:shiftLetter,
            day:days[i],
            class:value == "OFF" ? "day-off-"+shiftLetter:"day-"+shiftLetter
          });
          temp2 +=`
          ${value == "OFF" ? "<td class='day-off-"+shiftLetter+"'>"+value:"<td class='day-"+shiftLetter+"'>"+value}</td>
            `;
            index = index + 1;
        }

        if(shiftLetter == "A"){
         AIndex=index;
        }else if(shiftLetter == "B"){
         BIndex=index;
        }else if(shiftLetter == "C"){
           CIndex=index;
        }else if(shiftLetter == "D"){
           DIndex=index;
        }

              temp1 +=`
          <tr  class='calendar-month-days'>
           <td class="shift-${shiftLetter}">${shiftLetter}</td>
            ${temp2}
          </tr>
          `;
          return shiftValues;
}



let generatePerShiftGrid=function(shiftLetter,days,index){
  
  let shiftValues=[];
        for(let i=1;i<=days;i++){
          let value=schedulePattern[index] == 1 ? "M" : schedulePattern[index] == 2 ? "E" : schedulePattern[index] == 3 ? "N":"OFF";
          shiftValues.push({
            shiftT:value,
            shiftL:shiftLetter,
            day:i,
            class:value == "OFF" ? "day-off-"+shiftLetter:"day-"+shiftLetter
          });
            index = index + 1;
        }
          return [shiftValues,index];
}

let generatePerShiftGridT=function(year,shiftLetter){
  let index=shiftConfig[year][shiftLetter];
  let shiftValues=[];
  let shiftValueObj={};
  for(let m=0;m < 12;m++){
    let totalDays = new Date(year, m+1, 0).getDate();
    for(let i=1;i<=totalDays;i++){
      let value=schedulePattern[index] == 1 ? "M" : schedulePattern[index] == 2 ? "E" : schedulePattern[index] == 3 ? "N":"OFF";
      shiftValueObj[new Date(year,m,i).getTime()]={
        shiftT:value,
        shiftL:shiftLetter,
        dateTime:new Date(year,m,i).getTime(),
        date:new Date(year,m,i).toLocaleString(),
        day:new Date(year,m,i),
        class:value == "OFF" ? "day-off-border-"+shiftLetter:"day-"+shiftLetter
      }

      shiftValues.push({
        shiftT:value,
        shiftL:shiftLetter,
        dateTime:new Date(year,m,i).getTime(),
        date:new Date(year,m,i).toLocaleString(),
        day:new Date(year,m,i),
        class:value == "OFF" ? "day-off-"+shiftLetter:"day-"+shiftLetter
      });
        index = index + 1;
    }
  }
          return shiftValueObj;
}

let getDatesBetweenTwoDates=function(startDate,endDate){
  let stDate=new Date(startDate).getTime();
  let enDate=new Date(endDate).getTime();
  let incrementByOneDay=24 * 60 * 60 * 1000;
  let selectedDates=[];
  while(stDate <= enDate){
    selectedDates.push({
      date:new Date(stDate),
      dateTime:stDate
    });
    stDate = stDate+incrementByOneDay;
  }
  return selectedDates;
}
let generateTemplateRow = function(date) {
  let weekDays=["SUN","MON","TUE","WED","THR","FRI","SAT"];
  let temp = '';
  let weekDaysHeader='';
  let weekDaysNumber='';
  let days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()+1;
  let month={};
  let monthDays=[];
  temp += `
      <div class='membersContainer'></div>
        `;
 for(let i=1;i<=days;i++){
          let dayClass='';
          let sDayClass='';
          let hasNote=false;
          let weekDay=weekDays[new Date(date.getFullYear(),date.getMonth(),i).getDay()];
          let selectedDay=new Date(date.getFullYear(),date.getMonth(),i);
            if(ramadanDays.indexOf(selectedDay.getTime()) !=-1){
               dayClass='ramadan';
            }else if(holidays.indexOf(selectedDay.getTime()) !=-1){
              let valueIndex=holidays.indexOf(selectedDay.getTime());
              let holidayClass=holidaysWithClasses[valueIndex].split(" ")[1] != undefined ? holidaysWithClasses[valueIndex].split(" ")[1]:"holiday";
              dayClass=holidaysWithClasses[valueIndex].split(" ")[1] != undefined ? holidaysWithClasses[valueIndex].split(" ")[1]:"holiday";
            }
            if(sholidays.indexOf(selectedDay.getTime()) !=-1){
              let valueIndex=sholidays.indexOf(selectedDay.getTime());
              sDayClass=sHolidaysWithClasses[valueIndex].split(" ")[1] != undefined ? sHolidaysWithClasses[valueIndex].split(" ")[1]:"holiday";
            }
             if(finalNotesData[selectedDay.getTime()] != undefined){
                hasNote=true;
                dayClass +=' note';
              }else{
                 hasNote=false;
              }
              
            monthDays.push({
              weekDayH:weekDay,
              weekDayN:selectedDay.getDate(),
              class:dayClass +" " + sDayClass,
              hasNote:hasNote,
              date:selectedDay.toLocaleDateString(),
              dateTime:selectedDay.getTime()
            });
 }
    month['year']=new Date(date).getFullYear();
     month["totalDays"]=days;
     month["month"]=months[date.getMonth()];
     month["monthDays"]=monthDays;
     month['A']=generatePerShift("A",days,AIndex);
     month['B']=generatePerShift("B",days,BIndex);
     month['C']=generatePerShift("C",days,CIndex);
     month['D']=generatePerShift("D",days,DIndex);

  return month;
}

let sliceDate = function() {
  let cur = new Date();
  return {
    month: cur.getMonth(),
    year: cur.getFullYear(),
    day: cur.getDate(),
    monthDays: new Date(cur.getFullYear(), cur.getMonth() + 1, 0).getDate(),
    firstDay: new Date(cur.getFullYear(), cur.getMonth(), 1).getDay()
  }
}

let convertDate = function(d) {
  let cur = new Date(d);
  return `${cur.getFullYear()}-${cur.getMonth() + 1}-${cur.getDate()}`
}
function dumpCSSText(element){
  var s = '';
  var o = getComputedStyle(element);
  for(var i = 0; i < o.length; i++){
    s+=o[i] + ':' + o.getPropertyValue(o[i])+';';
  }
  return s;
}
let printDocument=function(dept,div,year){
  let selectDiv=document.querySelector('.calendar-container');
  //selectDiv.style.margin='-30px';
html2canvas(document.querySelector('.calendar-container'))
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg');
        const pdf = new jsPDF({
        orientation: 'p', // landscape
        unit: 'pt', // points, pixels won't work properly
        format: [3220, 1930] // set needed dimensions for any element
  });
        pdf.addImage(imgData, 'jpeg', 0, 0, canvas.width, canvas.height);
        pdf.save('download.pdf');
       // selectDiv.style.margin='';
      });


}
let loopThroughMonths=function(year,layout){
     let finalData=[];
      let temp=`<div class='full-calendar'>`;
  if(layout == 'table'){
   for(let i=0;i<12;i++){
        let starDate=new Date(year,i,1);
        temp += generateTemplateTable(starDate);
         finalData.push(temp);
    }
  }else if(layout == 'row'){
       let config=shiftConfig[year];
       AIndex=config.A;
       BIndex=config.B;
       CIndex=config.C;
       DIndex=config.D;
       for(let i=0;i<12;i++){
        let starDate=new Date(year,i,1);
        finalData.push(generateTemplateRow(starDate));
    }
  }
    return finalData;
}

let prepareCalendarData=function(year,layout){
  let dates = obj.getItems('test').map(function(el){
        return new Date(el.date).getTime()
      }).sort();
      dates.forEach(function(date){

        let values=[];
      obj.getItems('test').forEach(function(em){
        if(new Date(em.date).getTime() == date){
          values.push(em);
        }
        });
        finalNotesData[date]=values;
      });
      ramadanDaysObj=getDatesBetweenTwoDates(shiftConfig[year].ramadan.startDate,shiftConfig[year].ramadan.endDate);
      ramadanDays=ramadanDaysObj.map(function(el){
          return el.dateTime;
      });
      holidaysWithClasses=shiftConfig[year].holiday;
      holidays=shiftConfig[year].holiday.map(function(el){
          return new Date(el.split(" ")[0]).getTime();
      });

      sHolidaysWithClasses=shiftConfig[year].schoolHoliday;
      sholidays=shiftConfig[year].schoolHoliday.map(function(el){
          return new Date(el.split(" ")[0]).getTime();
      });
      return loopThroughMonths(year,layout);
}

let organizeDataForGoogleCalendar=function(year,selectedShift){
     let tempData=[];
     let finalData=[];
      let config=shiftConfig[year];
       AIndex=config.A;
       BIndex=config.B;
       CIndex=config.C;
       DIndex=config.D;
       for(let i=0;i<12;i++){
        let starDate=new Date(year,i,1);
        tempData.push(generateTemplateRow(starDate));
       }
       
    return finalData;
}
let notesTracker=function(status){
  setTimeout(function(){
 let elements=document.querySelectorAll('.js-note');
      Array.prototype.slice.call(elements).forEach(function(el){
        el.addEventListener('click',function(e){
            let target=e.target.getAttribute('data-date');
            selectedDayNote=target;
            status=true;
        });
      });
  },1000);
}

let prepareCalendarDataGrid=function(year,shiftType){
      let dataPrepared=[];
      let ramadanDaysObj=getDatesBetweenTwoDates(shiftConfig[year].ramadan.startDate,shiftConfig[year].ramadan.endDate);
      ramadanDaysObj.forEach(function(el){
        dataPrepared.push({
          date: el.dateTime,
          className:"ramadan"
        });
      });
     shiftConfig[year].holiday.map(function(el){
        dataPrepared.push({
          date: new Date(el.split(" ")[0]).getTime(),
          className:el.split(" ")[1]
        });
      });
      
  return dataPrepared;
      
}

let generateFullYearCalendar=function(year,layout){
  //currYear.innerHTML=year;
  let keys=Object.keys(shiftConfig[year]).slice(0,4);
  initNewCalendar(keys[3],'.generated-result-'+keys[3]);
  document.querySelector('#shiftType').addEventListener('change',(e)=>{
    document.querySelector('.generated-result-A').innerHTML='';
    document.querySelector('.generated-result-B').innerHTML='';
    document.querySelector('.generated-result-C').innerHTML='';
    document.querySelector('.generated-result-D').innerHTML='';
    let selectedValue=e.target.value;
    initNewCalendar(selectedValue,`.generated-result-${selectedValue}`);
  });
}

let generatePDFAction=function(){
  let el=doc.querySelector('#generatePDF');
  el.addEventListener('click',generatePDF);
}

let generatePDF=function(){
  let d=prepareCalendarData(currentYearGl,"row");
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
      if(d[i].monthDays[j].class != " "){
          tempStyle=d[i].monthDays[j].class.replace(/-/g,'')
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

generateFullYearCalendar(new Date().getFullYear(),"table")
generatePDFAction();


return {
  generateFullYearCalendar:generateFullYearCalendar
}

})();

APP.generateFullYearCalendar(new Date().getFullYear(),'row');

