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

        await loadLayout();

        await loadSidebar();

        await loadHeader();

        // Inicializa os ícones do Lucide
        if (window.lucide) {

            lucide.createIcons();

        }

    } catch (error) {

        console.error(error);

    }

}

initializeApp();