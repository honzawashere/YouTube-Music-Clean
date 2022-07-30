const electron = require("electron")
const app = electron.app

app.on("ready", () => {
    const window = new electron.BrowserWindow({
        width: "1280",
        height: "720",
        show: false,
        title: "YouTube Music",
        icon: "icon.ico",
        roundedCorners: true
    })

    window.setMenuBarVisibility(false)
    window.loadURL("https://music.youtube.com")

    window.on("ready-to-show", () => {
        window.show()
    })
})