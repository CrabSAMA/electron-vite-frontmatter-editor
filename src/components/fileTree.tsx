import { Tree } from 'antd'
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree'
import '@/components/fileTree.css'
import type { CSSProperties } from 'react'

const { DirectoryTree } = Tree

interface FileTreeProps {
  style: CSSProperties
  directoryTree: DataNode[]
  onSelectMarkdown: (attributes: any) => any
}

function fileTree({ directoryTree, onSelectMarkdown, style }: FileTreeProps) {
  
  const onSelect: DirectoryTreeProps['onSelect'] = async (keys, info) => {
    console.log('Trigger Select', keys, info);
    if (!info.node.isLeaf) return
    const result = await window.electronAPI.getFrontMatter(keys[0])
    onSelectMarkdown(result?.attributes)
  };

  return (
    <section className="file-tree-container" style={style}>
      <DirectoryTree treeData={directoryTree} onSelect={onSelect}></DirectoryTree>
    </section>
  )
}

export default fileTree