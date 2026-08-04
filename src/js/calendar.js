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


const STORAGE_KEY = "nevermiss-events";


// ==============================
// STORAGE
// ==============================

function getEvents(){

    const events = localStorage.getItem(STORAGE_KEY);

    return events 
        ? JSON.parse(events)
        : [];

}



function saveEvent(event){

    const events = getEvents();

    events.push(event);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(events)
    );

}



// ==============================
// CALENDAR NAVIGATION
// ==============================

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


    const grid = document.getElementById(
        "calendar-grid"
    );


    if(!grid){

        return;

    }


    grid.innerHTML = "";



    const year = currentDate.getFullYear();

    const month = currentDate.getMonth();



    const title = document.getElementById(
        "calendar-month"
    );


    if(title){

        title.textContent =
            `${months[month]} ${year}`;

    }



    const firstDay = new Date(
        year,
        month,
        1
    );


    const lastDay = new Date(
        year,
        month + 1,
        0
    );



    let startDay = firstDay.getDay();


    // Domingo vira 6
    // Segunda vira 0

    startDay =
        startDay === 0
        ? 6
        : startDay - 1;



    // espaços vazios antes do primeiro dia

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



        const dateString =
            `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;



        cell.innerHTML = `

            <span>
                ${day}
            </span>

        `;



        // indicador de evento

        if(hasEventOnDate(dateString)){


            const indicator =
                document.createElement("div");


            indicator.className =
                "event-indicator";


            cell.appendChild(indicator);

        }




        // seleção do dia

        cell.onclick = function(){


            document
            .querySelectorAll(".calendar-cell")
            .forEach(item=>{

                item.classList.remove(
                    "selected"
                );

            });



            cell.classList.add(
                "selected"
            );


        };




        // dia atual

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



// verifica eventos no dia

function hasEventOnDate(date){


    const events =
        getEvents();



    return events.some(event => 
        event.date === date
    );


}



// ==============================
// INITIALIZE CALENDAR
// ==============================


window.initializeCalendar = function(){


    console.log(
        "Calendar inicializado"
    );



    renderCalendar();

    renderUpcomingEvents();




    // ==============================
    // MONTH BUTTONS
    // ==============================


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
    // ADD EVENT BUTTON
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




                // espera o modal criar o botão

                setTimeout(()=>{


                    const saveButton =
                        document.getElementById(
                            "confirm-modal"
                        );



                    if(saveButton){


                        saveButton.onclick =
                            handleSaveEvent;


                    }else{


                        console.error(
                            "Botão Confirm Modal não encontrado"
                        );


                    }


                },100);



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







// ==============================
// SAVE EVENT
// ==============================


function handleSaveEvent(){



    const title =
        document.getElementById(
            "event-title"
        );


    const date =
        document.getElementById(
            "event-date"
        );


    const time =
        document.getElementById(
            "event-time"
        );




    if(
        !title ||
        !date ||
        !time
    ){

        console.error(
            "Campos do evento não encontrados"
        );

        return;

    }




    if(

        !title.value.trim()
        ||
        !date.value
        ||
        !time.value

    ){


        alert(
            "Fill in all fields."
        );


        return;


    }




    const event = {


        id:
            Date.now(),


        title:
            title.value.trim(),


        date:
            date.value,


        time:
            time.value


    };




    saveEvent(event);



    console.log(
        "Evento salvo:",
        event
    );




    renderCalendar();

    renderUpcomingEvents();




    if(
        typeof window.closeModal === "function"
    ){

        window.closeModal();

    }



}








// ==============================
// UPCOMING EVENTS
// ==============================


function renderUpcomingEvents(){



    const eventsList =
        document.getElementById(
            "events-list"
        );



    if(!eventsList){

        return;

    }




    let events =
        getEvents();




    events.sort((a,b)=>{


        return (

            new Date(
                `${a.date}T${a.time}`
            )

            -

            new Date(
                `${b.date}T${b.time}`
            )

        );


    });





    eventsList.innerHTML = "";





    if(events.length === 0){



        eventsList.innerHTML = `


            <div class="event-item">


                <strong>
                    No upcoming events
                </strong>


                <span>
                    Create your first event.
                </span>


            </div>


        `;



        return;


    }






    events.forEach(event=>{


        const item =
            document.createElement(
                "div"
            );



        item.className =
            "event-item";





        item.innerHTML = `



            <strong>
                ${event.title}
            </strong>


            <span>
                ${event.date} • ${event.time}
            </span>



        `;




        eventsList.appendChild(
            item
        );



    });



}
