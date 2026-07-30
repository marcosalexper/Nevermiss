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


        webPreferences: {

            preload: path.join(__dirname, "preload.js"),

            nodeIntegration: true,

            contextIsolation: false,

            devTools: true

        }

    });



    // Remove menu padrão

    Menu.setApplicationMenu(null);



    mainWindow.loadFile(
        path.join(__dirname, "../src/index.html")
    );



    // Atalho para abrir DevTools

    mainWindow.webContents.on(
        "before-input-event",
        (event, input) => {


            if (

                input.key === "F12"

                ||

                (

                    input.control

                    &&

                    input.shift

                    &&

                    input.key.toLowerCase() === "i"

                )

            ) {


                mainWindow.webContents.toggleDevTools();


            }


        }

    );



    // Abre automaticamente o console
    // DESCOMENTE se quiser sempre abrir ao iniciar

    /*
    mainWindow.webContents.openDevTools();
    */


}



app.whenReady().then(() => {


    createWindow();



    app.on(
        "activate",
        () => {


            if (
                BrowserWindow.getAllWindows().length === 0
            ) {

                createWindow();

            }


        }
    );


});




app.on(
    "window-all-closed",
    () => {


        if(process.platform !== "darwin"){

            app.quit();

        }


    }
);