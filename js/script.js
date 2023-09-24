document.addEventListener("DOMContentLoaded", function () {

  /*Get tháng năm*/
  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  /*Get các element từ HTML*/
  const monthYearDisplay = document.getElementById("monthYearDisplay");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const calendar = document.getElementById("calendar");

  function updateCalendar() {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startingDay = new Date(currentYear, currentMonth, 1).getDay();

    monthYearDisplay.textContent = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
    }).format(new Date(currentYear, currentMonth, 1));

    calendar.innerHTML = "";

    /*Tạo div day-header có 7 ngày trong tuần*/
    const dayHeaders = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (let i = 0; i < dayHeaders.length; i++) {
      const dayHeader = document.createElement("div");
      dayHeader.textContent = dayHeaders[i];
      dayHeader.classList.add("day-header");
      calendar.appendChild(dayHeader);
    }

    /*Những ngày nào dưới ngày bắt đầu của tháng thì là emtyDay*/
    for (let i = 0; i < startingDay; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.classList.add("day");
      calendar.appendChild(emptyDay);
    }

    /*Chạy từ ngày 1 đến ngày cuối của tháng*/
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement("div");
      dayElement.textContent = i;
      dayElement.classList.add("day");

      /*Nếu ngày hiện tại thì add màu xanh, tiếp tục với đỏ và xanh dương*/
      if (
        currentYear === currentDate.getFullYear() &&
        currentMonth === currentDate.getMonth() &&
        i === currentDate.getDate()
      ) {
        dayElement.classList.add("green");
      } else if (new Date(currentYear, currentMonth, i).getDay() === 0) {
        dayElement.classList.add("red");
      } else {
        dayElement.classList.add("blue");
      }

      calendar.appendChild(dayElement);
    }
  }

  prevBtn.addEventListener("click", function () {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    updateCalendar();
  });

  nextBtn.addEventListener("click", function () {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    updateCalendar();
  });

  updateCalendar();
});
