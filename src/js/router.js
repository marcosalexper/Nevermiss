const routes = {

    dashboard: "./pages/dashboard.html",

    calendar: "./pages/calendar.html",

    wishlist: "./pages/wishlist.html",

    documents: "./pages/documents.html",

    vault: "./pages/vault.html",

    settings: "./pages/settings.html"

};


async function navigate(page){


    const container =
        document.getElementById("page-content");


    if(!container){

        console.error(
            "page-content não encontrado"
        );

        return;

    }


    const file =
        routes[page];


    if(!file){

        container.innerHTML =
        "<h2>Página não encontrada</h2>";

        return;

    }


    const response =
        await fetch(file);


    const html =
        await response.text();


    container.innerHTML =
        html;


}