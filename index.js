const electron = require("electron")
const app = electron.app

const moment = require("moment")
const title = require("console-title")
const { setApplicationMenu } = require("./menu")

async function debug(title, message) {
    console.log(`[${moment().format("DD/MM/YYYY-HH:mm:ss")}] [${title}] ${message}`)
}
title("YouTube Music: Dev Console")
debug("App", "Waiting...")

app.on("ready", () => {
    debug("App", "Ready, creating BrowserWindow")
    const window = new electron.BrowserWindow({
        width: "1280",
        height: "720",
        show: false,
        title: "YouTube Music",
        icon: "icon.ico",
        roundedCorners: true
    })

    this.BrowserWindow = window
    setApplicationMenu()

    window.webContents.on("will-navigate", (event, url) => {
        debug("WebContents", "Navigation: " + url)
    })

    window.webContents.on("will-redirect", (event, url) => {
        debug("WebContents", "Redirect: " + url)
    })

    window.webContents.on("media-started-playing", (event) => {
        debug("WebContents", "Playing " + window.webContents.getURL())
    })

    window.webContents.on("enter-html-full-screen", (event) => {
        if(window.isFullScreen()) {
            debug("Window", "Menu Bar has been hidden")
            window.setMenuBarVisibility(false)
        }
    })

    window.webContents.on("leave-html-full-screen", (event) => {
        if(!window.isFullScreen()) {
            debug("Window", "Menu Bar has been shown")
            window.setMenuBarVisibility(true)
        }
    })

    debug("WebContents", "Old User Agent: " + window.webContents.getUserAgent())
    window.webContents.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36")
    debug("WebContents", "New User Agent: " + window.webContents.getUserAgent())
    window.loadURL("https://music.youtube.com/")
    debug("WebContents", "Loading: https://music.youtube.com/")

    window.webContents.on("did-finish-load", () => {
        debug("WebContents", "Loaded: https://music.youtube.com/")
        window.show()
    })
})
