/// <reference types="vite-plugin-electron/electron-env" />
/// <reference types="gray-matter" />

interface electronAPI {
  openSelectDirDialog: () => Promise<void>
  getFrontMatter: (markdownPath: string) => Promise<matter.GrayMatterFile<string>>
  readFile: (path: string) => Promise<string>
  writeFile: (path: string, content: string) => Promise<void>
}

interface Window {
  electronAPI: electronAPI;
}