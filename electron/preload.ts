import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  openSelectDirDialog: () => ipcRenderer.invoke('openSelectDirDialog'),
  getFrontMatter: (markdownPath: string) => ipcRenderer.invoke('getFrontMatter', markdownPath),
  readFile: (path: string) => ipcRenderer.invoke('readFile', path),
  writeFile: (path: string, content: string) => ipcRenderer.invoke('writeFile', path, content)
})