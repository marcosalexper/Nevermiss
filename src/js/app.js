// ==================================
// Carregador de componentes
// ==================================

async function loadComponent(path) {


    const response =
        await fetch(path);



    if(!response.ok){

        throw new Error(
            `Erro ao carregar: ${path}`
        );

    }



    return await response.text();

}





// ==================================
// Layout principal
// ==================================

async function loadLayout(){


    const app =
        document.getElementById(
            "app"
        );


    if(!app){

        throw new Error(
            "Elemento #app não encontrado"
        );

    }



    app.innerHTML =
        await loadComponent(
            "./layouts/main.html"
        );


}





// ==================================
// Sidebar
// ==================================

async function loadSidebar(){


    const sidebar =
        document.getElementById(
            "sidebar"
        );


    if(!sidebar){

        throw new Error(
            "Sidebar não encontrada"
        );

    }



    sidebar.innerHTML =
        await loadComponent(
            "./components/sidebar/sidebar.html"
        );


}





// ==================================
// Header
// ==================================

async function loadHeader(){


    const header =
        document.getElementById(
            "header"
        );


    if(!header){

        throw new Error(
            "Header não encontrado"
        );

    }



    header.innerHTML =
        await loadComponent(
            "./components/header/header.html"
        );


}





// ==================================
// Modal
// ==================================

async function loadModal(){


    const modalHTML =
        await loadComponent(
            "./components/modal/modal.html"
        );



    document.body.insertAdjacentHTML(
        "beforeend",
        modalHTML
    );



    console.log(
        "Modal HTML carregado"
    );



    console.log(
        "openModal disponível:",
        typeof window.openModal
    );


}





// ==================================
// Eventos da Sidebar
// ==================================

function initializeNavigation(){


    document.addEventListener(
        "click",
        (event)=>{


            const link =
                event.target.closest(
                    "[data-page]"
                );



            if(!link){

                return;

            }



            const page =
                link.dataset.page;



            navigate(page);



        }
    );


}





// ==================================
// Inicialização da aplicação
// ==================================

async function initializeApp(){


    try{


        console.log(
            "Iniciando Nevermiss"
        );



        await loadLayout();



        console.log(
            "Layout carregado"
        );



        await loadSidebar();



        console.log(
            "Sidebar carregada"
        );



        await loadHeader();



        console.log(
            "Header carregado"
        );



        await loadModal();



        console.log(
            "Aplicando navegação"
        );


        initializeNavigation();




        console.log(
            "Abrindo Dashboard"
        );


        navigate(
            "dashboard"
        );





        if(window.lucide){

            lucide.createIcons();

        }




    }catch(error){


        console.error(
            "Erro ao iniciar Nevermiss:",
            error
        );


    }


}




initializeApp();