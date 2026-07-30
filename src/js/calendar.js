let currentDate = new Date();


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



function previousMonth(){

    currentDate.setMonth(
        currentDate.getMonth() - 1
    );

    renderCalendar();

}



function nextMonth(){

    currentDate.setMonth(
        currentDate.getMonth() + 1
    );

    renderCalendar();

}




function renderCalendar(){

    const grid =
        document.getElementById("calendar-grid");


    if(!grid){

        return;

    }


    grid.innerHTML = "";


    const year =
        currentDate.getFullYear();


    const month =
        currentDate.getMonth();



    const title =
        document.getElementById(
            "calendar-month"
        );


    if(title){

        title.textContent =
            `${months[month]} ${year}`;

    }



    const firstDay =
        new Date(year, month, 1);



    const lastDay =
        new Date(year, month + 1, 0);



    let startDay =
        firstDay.getDay();


    startDay =
        startDay === 0
        ? 6
        : startDay - 1;



    for(
        let i = 0;
        i < startDay;
        i++
    ){

        const empty =
            document.createElement("div");


        empty.className =
            "calendar-cell empty";


        grid.appendChild(empty);

    }



    const totalDays =
        lastDay.getDate();



    for(
        let day = 1;
        day <= totalDays;
        day++
    ){


        const cell =
            document.createElement("div");


        cell.className =
            "calendar-cell";


        cell.textContent =
            day;



        cell.onclick = function(){


            document
            .querySelectorAll(".calendar-cell")
            .forEach(item => {

                item.classList.remove(
                    "selected"
                );

            });


            cell.classList.add(
                "selected"
            );


        };



        const today =
            new Date();



        if(

            day === today.getDate()
            &&
            month === today.getMonth()
            &&
            year === today.getFullYear()

        ){

            cell.classList.add(
                "today"
            );

        }


        grid.appendChild(cell);

    }

}





window.initializeCalendar = function(){


    console.log("Calendar inicializado");


    renderCalendar();



    const previous =
        document.getElementById(
            "previous-month"
        );


    const next =
        document.getElementById(
            "next-month"
        );



    if(previous){

        previous.onclick =
            previousMonth;

    }


    if(next){

        next.onclick =
            nextMonth;

    }



    // ==============================
    // ADD EVENT
    // ==============================


    const addButton =
        document.getElementById(
            "add-event-button"
        );


    console.log(
        "Botão Add Event:",
        addButton
    );



    if(addButton){


        addButton.onclick = function(){


            console.log(
                "Clicou no Add Event"
            );



            if(
                typeof window.openModal === "function"
            ){


                window.openModal(

                    "New Event",

                    `

                    <label>
                        Title
                    </label>


                    <input
                        id="event-title"
                        type="text"
                    >


                    <label>
                        Date
                    </label>


                    <input
                        id="event-date"
                        type="date"
                    >


                    <label>
                        Time
                    </label>


                    <input
                        id="event-time"
                        type="time"
                    >

                    `

                );


            }else{


                console.error(
                    "openModal não existe"
                );


            }


        };


    }else{


        console.error(
            "Botão Add Event não encontrado"
        );


    }


};