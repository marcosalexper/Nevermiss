const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

function createWindow() {

    const mainWindow = new BrowserWindow({

        width: 1280,
        height: 720,

        minWidth: 1100,
        minHeight: 700,

        center: true,

        autoHideMenuBar: true,


       
        // icon: path.join(__dirname, "../assets/icon.ico"),

        webPreferences: {

            preload: path.join(__dirname, "preload.js"),

            nodeIntegration: true,

            contextIsolation: false

        }

    });

    // Remove completamente a barra de menu
    Menu.setApplicationMenu(null);

    mainWindow.loadFile(
        path.join(__dirname, "../src/index.html")
    );

}

app.whenReady().then(() => {

    createWindow();

    app.on("activate", () => {

        if (BrowserWindow.getAllWindows().length === 0) {

            createWindow();

        }

    });

});

app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {

        app.quit();

    }

});