import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  openSelectDirDialog: () => ipcRenderer.invoke('openSelectDirDialog'),
  getFrontMatter: (markdownPath: string) => ipcRenderer.invoke('getFrontMatter', markdownPath)
})