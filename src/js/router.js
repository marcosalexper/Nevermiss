const routes = {

    dashboard: "./pages/dashboard.html",

    calendar: "./pages/calendar.html",

    wishlist: "./pages/wishlist.html",

    documents: "./pages/documents.html",

    vault: "./pages/vault.html",

    settings: "./pages/settings.html"

};


async function navigate(page) {

    const container = document.getElementById("page-content");


    if (!container) {

        console.error("page-content não encontrado");

        return;

    }


    const file = routes[page];


    if (!file) {

        container.innerHTML =
        "<h2>Página não encontrada</h2>";

        return;

    }


    try {


        const response = await fetch(file);


        if (!response.ok) {

            throw new Error(
                `Erro ao carregar ${file}`
            );

        }


        const html = await response.text();


        container.innerHTML = html;



        // Atualiza URL

        window.history.pushState(
            {page},
            "",
            `#${page}`
        );



        // Recria ícones

        if(window.lucide){

            lucide.createIcons();

        }



        // Inicialização dos módulos


        if (

            page === "calendar" &&

            typeof window.initializeCalendar === "function"

        ) {

            window.initializeCalendar();

        }



        if (

            page === "wishlist" &&

            typeof window.initializeWishlist === "function"

        ) {

            window.initializeWishlist();

        }



        if (

            page === "documents" &&

            typeof window.initializeDocuments === "function"

        ) {

            window.initializeDocuments();

        }



        if (

            page === "vault" &&

            typeof window.initializeVault === "function"

        ) {

            window.initializeVault();

        }



    } catch(error) {


        console.error(
            "Erro no router:",
            error
        );


        container.innerHTML = `

            <h2>
                Erro ao carregar página
            </h2>

        `;


    }

}



// Navegação pelo botão voltar/avançar

window.addEventListener(
    "popstate",
    () => {

        const page =
        location.hash.replace("#","")
        ||
        "dashboard";


        navigate(page);

    }
);