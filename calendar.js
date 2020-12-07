var currentTitle = document.getElementById("current-year-month");
var calendarBody = document.getElementById("calendar-body");
var prevBtn = document.getElementById("prev");
var nextBtn = document.getElementById("next");
var mainTodayDate = document.getElementById("main-date");
var mainTodayDay = document.getElementById("main-day");
var compareDate = document.getElementById("compare-date");
var selectDate = document.getElementById("selectedDate");

var today = new Date(); // 오늘
var clickDate = new Date(); // 선택한 날짜
var first = new Date(today.getFullYear(), today.getMonth(), 1);

var dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//일반년도의 일수
var leapYear = [
  "31",
  "29",
  "31",
  "30",
  "31",
  "30",
  "31",
  "31",
  "30",
  "31",
  "30",
  "31",
];

//윤년의 일수
var notleapYear = [
  "31",
  "28",
  "31",
  "30",
  "31",
  "30",
  "31",
  "31",
  "30",
  "31",
  "30",
  "31",
];

var pageFirst = first;
var pageYear;

prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

selectDate.addEventListener("change", onChangeMonth);

var tdGroup = [];

if (first.getFullYear() % 4 === 0) {
  pageYear = leapYear;
} else {
  pageYear = notleapYear;
}

window.onload = load();

function load() {
  selectDate.value = `${today.getFullYear}-${
    today.getMonth() + 1 < 10
      ? "0" + today.getMonth() + 1
      : today.getMonth() + 1
  }`;
  showCalendar();
  showMain();
  onloadCalendar();
  clickStart();
}

function showCalendar() {
  let monthCnt = 100;
  let cnt = 1;
  for (var i = 0; i < 6; i++) {
    var $tr = document.createElement("tr");
    $tr.setAttribute("id", monthCnt);
    for (var j = 0; j < 7; j++) {
      if ((i == 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]) {
        var $td = document.createElement("td");
        $tr.appendChild($td);
      } else {
        var $td = document.createElement("td");
        $td.textContent = cnt;
        $td.setAttribute("id", cnt);
        $tr.appendChild($td);
        cnt++;
      }
    }
    monthCnt++;
    calendarBody.appendChild($tr);
  }
}

function removeCalendar() {
  let catchTr = 100;
  for (var i = 100; i < 106; i++) {
    var $tr = document.getElementById(catchTr);
    $tr.remove();
    catchTr++;
  }
}

function onloadCalendar() {
  currentTitle.innerHTML =
    monthList[first.getMonth()] +
    "&nbsp;&nbsp;&nbsp;&nbsp;" +
    first.getFullYear();
}

function prev() {
  if (pageFirst.getMonth() === 1) {
    pageFirst = new Date(first.getFullYear() - 1, 12, 1);
    first = pageFirst;
    if (first.getFullYear() % 4 === 0) {
      pageYear = leapYear;
    } else {
      pageYear = notleapYear;
    }
  } else {
    pageFirst = new Date(first.getFullYear(), first.getMonth() - 1, 1);
    first = pageFirst;
  }

  clickDate = new Date(
    clickDate.getFullYear(),
    clickDate.getMonth() - 1,
    clickDate.getDate()
  );

  currentTitle.innerHTML =
    monthList[first.getMonth()] +
    "&nbsp;&nbsp;&nbsp;&nbsp;" +
    first.getFullYear();
  removeCalendar();
  showCalendar();
  showMain();
  clickedDate1 = document.getElementById(today.getDate());
  clickedDate1.classList.add("active");
  clickStart();
}

function next() {
  if (pageFirst.getMonth() === 12) {
    pageFirst = new Date(first.getFullYear() + 1, 1, 1);
    first = pageFirst;
    if (first.getFullYear() % 4 === 0) {
      pageYear = leapYear;
    } else {
      pageYear = notleapYear;
    }
  } else {
    pageFirst = new Date(first.getFullYear(), first.getMonth() + 1, 1);
    first = pageFirst;
  }

  clickDate = new Date(
    clickDate.getFullYear(),
    clickDate.getMonth() + 1,
    clickDate.getDate()
  );
  currentTitle.innerHTML =
    monthList[first.getMonth()] +
    "&nbsp;&nbsp;&nbsp;&nbsp;" +
    first.getFullYear();
  removeCalendar();
  showCalendar();
  showMain();
  clickedDate1 = document.getElementById(today.getDate());
  clickedDate1.classList.add("active");
  clickStart();
}

function showMain() {
  mainTodayDay.innerHTML = dayList[clickDate.getDay()];
  mainTodayDate.innerHTML = clickDate.getDate();
}

var clickedDate1 = document.getElementById(today.getDate());
clickedDate1.classList.add("active");

function clickStart() {
  for (let i = 1; i <= pageYear[first.getMonth()]; i++) {
    tdGroup[i] = document.getElementById(i);
    tdGroup[i].addEventListener("click", changeToday);
  }
}

function onChangeMonth(e) {
  console.log("시발람아");
  const changeDate = new Date(e.target.value);
  const changeYear = changeDate.getFullYear();
  const changeMonth = changeDate.getMonth();

  if (today.getMonth() + 1 !== changeMonth) {
    pageFirst = new Date(changeYear, changeMonth, 1);
    first = pageFirst;

    currentTitle.innerHTML =
      monthList[first.getMonth()] +
      "&nbsp;&nbsp;&nbsp;&nbsp;" +
      first.getFullYear();

    clickDate = new Date(changeYear, changeMonth);
    //lastMonthDay = new Date(selectedYear, selectedMonth, 0).getDate();
    removeCalendar();
    showCalendar();
    showMain();
    clickStart();
  }
}

//클릭시 선택한 날짜를 바꾸는 함수
function changeToday(e) {
  for (let i = 1; i <= pageYear[first.getMonth()]; i++) {
    if (tdGroup[i].classList.contains("active")) {
      tdGroup[i].classList.remove("active");
    }
  }

  clickedDate1 = e.currentTarget;
  clickedDate1.classList.add("active");

  compareDatefun();

  clickDate = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);

  showMain();
}

//날짜 차이를 출력하는 함수
function compareDatefun() {
  const date = new Date(first.getFullYear(), first.getMonth(), clickedDate1.id);
  const subtractTime = date.getTime() - today.getTime();

  if (clickedDate1.length > 2) {
    return;
  }

  const diff = Math.ceil(subtractTime / (1000 * 3600 * 24));

  if (diff != 0) {
    diff > 0
      ? (compareDate.innerHTML = `${diff} days later than today.`)
      : (compareDate.innerHTML = `${Number(diff) * -1} days before today.`);
  } else {
    compareDate.innerHTML = "T O D A Y";
  }
}
