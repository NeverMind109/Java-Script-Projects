const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const currentDate = document.querySelector(".calendar__date");
const daysTag = document.querySelector(".calendar__days");
const prevMonthBtn = document.getElementById("prev-month-btn");
const calendarBtns = document.querySelectorAll(".calendar__btn");

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

const renderCalendar = () => {
  let lastDateOfTheMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // get last days of the previous month
  let firstDayOfTheMonth = new Date(currentYear, currentMonth, 0).getDay(); // day when the month starts
  let lastDateOfTheLastMonth = new Date(currentYear, currentMonth, 0).getDate(); // get first days of the next month
  let lastDayOfTheMonth = new Date(
    currentYear,
    currentMonth,
    lastDateOfTheMonth
  ).getDay(); // day when month ends

  let liTags = "";

  // previous month last days
  for (let i = firstDayOfTheMonth; i > 0; i--) {
    liTags += `<li class="calendar__list-item calendar__days-item inactive">${
      lastDateOfTheLastMonth - i + 1
    }</li>`;
  }

  // current month days and current day
  for (let i = 1; i <= lastDateOfTheMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
        ? "active"
        : "";
    liTags += `<li class="calendar__list-item calendar__days-item ${isToday}">${i}</li>`;
  }

  // next month first days
  for (let i = lastDayOfTheMonth; i <= 6; i++) {
    liTags += `<li class="calendar__list-item calendar__days-item inactive">${
      i - lastDayOfTheMonth + 1
    }</li>`;
  }

  currentDate.innerText = `${MONTHS[currentMonth]} ${currentYear}`;
  daysTag.innerHTML = liTags;
};

renderCalendar();

calendarBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.id === "prev-month-btn") {
      currentMonth -= 1;
    } else if (btn.dataset.id === "next-month-btn") {
      currentMonth += 1;
    }

    if (currentMonth < 0 || currentMonth > 11) {
      date = new Date(currentYear, currentMonth);
      currentYear = date.getFullYear();
      currentMonth = date.getMonth();
    } else {
      date = new Date();
    }

    renderCalendar();
  });
});
