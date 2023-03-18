import '@/style/App.css'
import FileTree from '@/components/fileTree'
import { Button } from 'antd'
import { useState } from 'react'

function App() {

  const [directoryTree, setDirectoryTree] = useState([])
  const [directoryPath, setDirectoryPath] = useState('')
  const [markdownAttributes, setMarkdownAttributes] = useState({})

  const openSelectDirDialog = async () => {
    const { tree, path } = await window.electronAPI.openSelectDirDialog()
    setDirectoryTree(tree)
    setDirectoryPath(path)
  }

  return (
    <div className="App">
      <Button onClick={openSelectDirDialog}>选择 markdown 文件夹</Button>
      <span>{ directoryPath }</span>
      <section style={{ display: 'flex' }}>
        <FileTree
          style={{ flex: 1 }}
          directoryTree={directoryTree}
          onSelectMarkdown={setMarkdownAttributes}
        />
        <section style={{ flex: 2 }}>
          <span>{ JSON.stringify(markdownAttributes) }</span>
        </section>
      </section>
    </div>
  )
}

export default App
