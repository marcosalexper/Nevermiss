const routes = {

    dashboard: "./pages/dashboard.html",

    calendar: "./pages/calendar.html",

    documents: "./pages/documents.html",

    vault: "./pages/vault.html",

    settings: "./pages/settings.html"

};



async function navigate(page) {


    const container =
        document.getElementById(
            "page-content"
        );



    if (!container) {


        console.error(
            "page-content não encontrado"
        );


        return;

    }



    const file =
        routes[page];



    if (!file) {


        container.innerHTML =
        "<h2>Página não encontrada</h2>";


        return;

    }



    try {


        const response =
            await fetch(file);



        if(!response.ok){


            throw new Error(
                `Erro ao carregar ${file}`
            );


        }




        const html =
            await response.text();



        container.innerHTML =
            html;




        window.history.pushState(

            {page},

            "",

            `#${page}`

        );





        if(window.lucide){


            lucide.createIcons();


        }






        // ==============================
        // MODULE INITIALIZERS
        // ==============================



        const modules = {


            calendar:
                window.initializeCalendar,


            wishlist:
                window.initializeWishlist,


            documents:
                window.initializeDocuments,


            vault:
                window.initializeVault


        };





        if(

            modules[page] &&

            typeof modules[page] === "function"

        ){


            modules[page]();


        }





    }catch(error){



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

    ()=>{


        const page =

            location.hash.replace("#","")

            ||

            "dashboard";



        navigate(page);



    }

);