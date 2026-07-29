async function loadComponent(path) {

    const response = await fetch(path);

    return await response.text();

}

async function start() {

    const app = document.getElementById("app");

    const layout = await loadComponent("./layouts/main.html");

    app.innerHTML = layout;

    document.getElementById("sidebar").innerHTML =
        await loadComponent("./components/sidebar/sidebar.html");

    document.getElementById("header").innerHTML =
        await loadComponent("./components/header/header.html");

}

start();