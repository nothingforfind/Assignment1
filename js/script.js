document.addEventListener("DOMContentLoaded", function () {

  /*Get tháng năm*/
  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  /*Get các element từ HTML*/
  const monthDisplay = document.getElementById("monthDisplay");
  const equalDisplay = document.getElementById("equalDisplay");
  const yearDisplay = document.getElementById("yearDisplay");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const calendar = document.getElementById("calendar");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function updateCalendar() {
    /*Muốn lấy số ngày trong tháng thì hàm Date sử dụng index tháng nên +1*/
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    /*Muốn lấy ngày thứ trong tháng hàm Date lại sử dụng tháng đúng*/
    const startingDay = new Date(currentYear, currentMonth, 1).getDay();
    console.log(new Date(currentYear, currentMonth, 1).getDay());

    monthDisplay.textContent = `${monthNames[currentMonth]}`;
    equalDisplay.textContent =  ` == `;
    yearDisplay.textContent = `${currentYear}`;

    calendar.innerHTML = "";

    /*Tạo div day-header có 7 ngày trong tuần*/
    const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 0; i < dayHeaders.length; i++) {
      const dayHeader = document.createElement("div");
      dayHeader.textContent = dayHeaders[i];
      dayHeader.classList.add("day-header");
      calendar.appendChild(dayHeader);
    }

    /*Những ngày trong tuần nhỏ hơn startingDay thì in ra màu xám.*/
    for (let i = 0; i < startingDay; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.classList.add("day");
      emptyDay.classList.add("gray");
      calendar.appendChild(emptyDay);
    }

    /*Chạy từ ngày 1 đến ngày cuối của tháng*/
    for (let i = 1; i <= daysInMonth; i++) {

      /*Tạo 1 div với class day*/
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

        /*Nếu là ngày chủ nhật thì add class red*/
      } else if (new Date(currentYear, currentMonth, i).getDay() === 0) {
        dayElement.classList.add("red");
        /*Còn lại add class blue*/
      } else {
        dayElement.classList.add("blue");
      }

      /*Add vào calendar*/
      calendar.appendChild(dayElement);
    }
  }

  /*Khi nút prev được nhấn tháng --*/
  prevBtn.addEventListener("click", function () {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    updateCalendar();
  });

  /*Khi nút next được nhấn tháng ++*/
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
