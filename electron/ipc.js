const  { ipcMain } = require("electron");


ipcMain.on(
    "app-message",
    (event, message) => {

        console.log(message);

    }
);