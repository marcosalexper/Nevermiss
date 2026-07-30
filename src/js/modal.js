console.log("MODAL JS EXECUTOU");



function openModal(title, content){


    console.log(
        "FUNÇÃO OPEN MODAL CHAMADA"
    );


    const overlay =
        document.getElementById(
            "modal-overlay"
        );


    if(!overlay){

        console.error(
            "overlay não encontrado"
        );

        return;

    }



    const modalTitle =
        document.getElementById(
            "modal-title"
        );


    const modalBody =
        document.getElementById(
            "modal-body"
        );



    if(modalTitle){

        modalTitle.textContent =
            title;

    }



    if(modalBody){

        modalBody.innerHTML =
            content;

    }



    overlay.classList.add(
        "show"
    );



    if(window.lucide){

        lucide.createIcons();

    }


}





function closeModal(){


    const overlay =
        document.getElementById(
            "modal-overlay"
        );



    if(!overlay){

        return;

    }



    overlay.classList.remove(
        "show"
    );


}






window.openModal =
    openModal;


window.closeModal =
    closeModal;






// ================================
// Eventos do Modal
// ================================


document.addEventListener(
    "click",
    (event)=>{


        const closeButton =
            event.target.closest(
                "#close-modal"
            );



        const cancelButton =
            event.target.closest(
                "#cancel-modal"
            );



        if(
            closeButton ||
            cancelButton
        ){

            closeModal();

        }


    }
);





console.log(
    "WINDOW OPENMODAL:",
    typeof window.openModal
);