import { Tree, Dropdown } from 'antd'
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree'
import type { MenuProps, DropdownProps } from 'antd'
import '@/components/fileTree.css'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import { stringify } from 'gray-matter'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const { DirectoryTree } = Tree

interface FileTreeProps {
  style: CSSProperties
  directoryTree: DataNode[]
  onSelectMarkdown: (attributes: any) => any
}

function fileTree({ directoryTree, onSelectMarkdown, style }: FileTreeProps) {
  
  const onSelect: DirectoryTreeProps['onSelect'] = async (keys, info) => {
    if (!info.node.isLeaf) return
    const result = await window.electronAPI.getFrontMatter(keys[0] as string)
    onSelectMarkdown(result?.data)
  };

  const dropDownItemList: MenuProps['items'] = [
    {
      label: '设置文件夹名为文章分类',
      key: 'setCategory',
    }
  ];
  
  const [currentDirectory, setCurrentDirectory] = useState<any>(null)
  const onRightClick: DirectoryTreeProps['onRightClick'] = ({ event, node }) => {
    if (!node.isLeaf) {
      setCurrentDirectory(node)
    } else {
      event.stopPropagation()
    }
  }
  const onMenuItemClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'setCategory':
        handleDirectorySetCategory()
        break;
    }
  }
  const onContextMenuOpenChange: DropdownProps['onOpenChange'] = (open) => {
    if (!open) setCurrentDirectory('')
  }
  const handleDirectorySetCategory = async () => {
    const pathList: string[] = currentDirectory.children.map((item: any) => item.key)
    for (const path of pathList) {
      const frontmatter = await window.electronAPI.getFrontMatter(path)
      frontmatter.data.category = [currentDirectory.title]
      if (frontmatter.data.date) {
        // 下方代码请根据不同情况取消代码注释使用
        // 处理本来不带时区的时间，需要减8
        // frontmatter.data.date = dayjs(frontmatter.data.date).subtract(8, 'h').format('YYYY-MM-DD HH:mm:ss Z')
        // 处理带时区的时间，则直接 format 即可
        // frontmatter.data.date = dayjs(frontmatter.data.date).format('YYYY-MM-DD HH:mm:ss Z')
      }
      // 渲染出来的 frontmatter 会带一个换行符，将换行符去掉
      const newFrontmatterString = stringify('', frontmatter.data).slice(0, -1).replace(/date: '([^']*)'/g, "date: $1")
      await window.electronAPI.writeFile(path, newFrontmatterString + frontmatter.content)
      console.log('Frontmatter has been replaced successfully.');
    }
  }

  return (
    <section className="file-tree-container" style={style}>
      <Dropdown
        menu={{ items: dropDownItemList, onClick: onMenuItemClick }}
        trigger={['contextMenu']}
        onOpenChange={onContextMenuOpenChange}
      >
        <DirectoryTree treeData={directoryTree} onSelect={onSelect} onRightClick={onRightClick}></DirectoryTree>
      </Dropdown>
    </section>
  )
}

export default fileTree