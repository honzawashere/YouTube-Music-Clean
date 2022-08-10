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
    window.webContents.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36")
    window.loadURL("https://music.youtube.com")

    window.webContents.on("did-finish-load", () => {
        window.show()
    })
})
