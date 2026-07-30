async function loadComponent(path) {


    const response = await fetch(path);


    if (!response.ok) {

        throw new Error(`Erro ao carregar: ${path}`);

    }


    return await response.text();

}



async function loadLayout() {


    const app = document.getElementById("app");


    app.innerHTML = await loadComponent(
        "./layouts/main.html"
    );


}



async function loadSidebar() {


    document.getElementById("sidebar").innerHTML =
        await loadComponent(
            "./components/sidebar/sidebar.html"
        );


}



async function loadHeader() {


    document.getElementById("header").innerHTML =
        await loadComponent(
            "./components/header/header.html"
        );


}



async function initializeApp() {


    try {


        console.log("Iniciando Nevermiss");



        await loadLayout();


        console.log("Layout carregado");



        await loadSidebar();


        console.log("Sidebar carregada");



        await loadHeader();


        console.log("Header carregado");



        // Carrega página inicial

        navigate("dashboard");



        // Ativa navegação da sidebar

        document.addEventListener(
            "click",
            (event)=>{


                const link =
                    event.target.closest("[data-page]");



                if(!link)
                    return;



                const page =
                    link.dataset.page;



                navigate(page);



            }
        );



        // Inicializa ícones

        if(window.lucide){

            lucide.createIcons();

        }



    } catch(error) {


        console.error(
            "Erro ao iniciar Nevermiss:",
            error
        );


    }


}



initializeApp();