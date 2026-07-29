function loadCSS(path){

    const link = document.createElement("link");

    link.rel = "stylesheet";

    link.href = path;

    document.head.appendChild(link);

}


async function loadComponent(path){

    const response = await fetch(path);

    return await response.text();

}


async function start(){


    loadCSS("./components/sidebar/sidebar.css");

    loadCSS("./components/header/header.css");


    const app = document.getElementById("app");


    app.innerHTML = await loadComponent(
        "./layouts/main.html"
    );


    document.getElementById("sidebar").innerHTML =
        await loadComponent(
            "./components/sidebar/sidebar.html"
        );


    document.getElementById("header").innerHTML =
        await loadComponent(
            "./components/header/header.html"
        );


}


start();