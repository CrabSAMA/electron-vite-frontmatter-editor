import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import path from 'path'
import { readDir, readFrontMatter } from './util'

async function handleDirectoryOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["openDirectory"]
    })
  if (canceled) {
    return
  } else {
    return {
      tree: readDir(filePaths[0]),
      path: filePaths[0]
    }
  }
}

app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: 'Main window',
    webPreferences: {
      preload: path.join(__dirname, './preload.js')
    }
  })

  // 打开调试工具
  win.webContents.openDevTools()

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // Load your file
    win.loadFile('dist/index.html');
  }

  // 监听事件
  ipcMain.handle('openSelectDirDialog', handleDirectoryOpen)
  ipcMain.handle('getFrontMatter', (event, markdownPath) => {
    return readFrontMatter(markdownPath)
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
})