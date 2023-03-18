/// <reference types="vite-plugin-electron/electron-env" />

interface electronAPI {
  openSelectDirDialog: Function
  getFrontMatter: Function
}

interface Window {
  electronAPI: electronAPI;
}