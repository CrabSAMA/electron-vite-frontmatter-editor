import * as fs from 'fs';
import * as path from 'path';
import type { DataNode } from 'antd/es/tree';
import { read } from 'gray-matter'


export function readDir(dir: string): DataNode[] {
  const files = fs.readdirSync(dir); // 读取目录下的文件和文件夹
  const result: DataNode[] = [];
  files.forEach(file => {
    const filePath = path.join(dir, file); // 获取文件/文件夹的完整路径
    const stat = fs.statSync(filePath); // 获取文件/文件夹的信息
    const isDirectory = stat.isDirectory();
    if (file.startsWith('.')) return
    // img 文件夹不处理
    if (isDirectory && file === 'img') return
    const item: DataNode = {
      title: file,
      key: filePath,
      isLeaf: !isDirectory
    };
    if (isDirectory && !file.startsWith('.')) {
      item.children = readDir(filePath); // 递归读取子目录
    }
    if (!isDirectory && path.extname(filePath) !== '.md') return
    result.push(item);
  });
  return result;
}

export function readFrontMatter(markdownPath: string) {
  const content = read(markdownPath)
  return content
}