/// <reference types="vite-plugin-electron/electron-env" />
/// <reference types="gray-matter" />

interface electronAPI {
  openSelectDirDialog: () => Promise<void>
  getFrontMatter: (markdownPath: string) => Promise<matter.GrayMatterFile<string>>
}

interface Window {
  electronAPI: electronAPI;
}