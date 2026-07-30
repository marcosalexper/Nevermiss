let currentDate = new Date();

function previousMonth() {

    currentDate.setMonth(
        currentDate.getMonth() - 1
    );

    renderCalendar();

}


function nextMonth() {

    currentDate.setMonth(
        currentDate.getMonth() + 1
    );

    renderCalendar();

}

const months = [
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
    "December"
];

function renderCalendar() {

    const grid = document.getElementById("calendar-grid");

    if (!grid) return;

    grid.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Atualiza o título do mês
    const monthTitle = document.getElementById("calendar-month");

    if (monthTitle) {

        monthTitle.textContent = `${months[month]} ${year}`;

    }

    const firstDay = new Date(year, month, 1);

    const lastDay = new Date(year, month + 1, 0);

    let startDay = firstDay.getDay();

    // Segunda-feira como primeiro dia da semana
    startDay = startDay === 0 ? 6 : startDay - 1;

    const totalDays = lastDay.getDate();

    // Dias vazios antes do dia 1
    for (let i = 0; i < startDay; i++) {

        const empty = document.createElement("div");

        empty.className = "calendar-cell empty";

        grid.appendChild(empty);

    }

    // Dias do mês
    for (let day = 1; day <= totalDays; day++) {

        const cell = document.createElement("div");

        cell.className = "calendar-cell";

        cell.textContent = day;

        cell.dataset.day = day;

        cell.addEventListener(
    "click",
    () => {

        document
            .querySelectorAll(".calendar-cell")
            .forEach(c => c.classList.remove("selected"));

        cell.classList.add("selected");

    }
);

        const today = new Date();

        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {

            cell.classList.add("today");

        }

        grid.appendChild(cell);

    }

}

// Inicializa o módulo Calendar
window.initializeCalendar = function () {

    renderCalendar();

    const previous =
        document.getElementById("previous-month");

    const next =
        document.getElementById("next-month");

    if(previous){

        previous.onclick = previousMonth;

    }

    if(next){

        next.onclick = nextMonth;

    }

};