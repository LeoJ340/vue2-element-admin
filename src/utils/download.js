import JSZip from 'jszip'
import { saveAs } from 'file-saver'

/**
 * 批量打包下载
 * 传入图片URL列表
 * @param {Array: [String]} imageUrls
 * @param {String} folderName
 */
export function zip(imageUrls, folderName = '下载') {
  const zip = new JSZip()
  const folder = zip.folder(folderName)
  const downloadTasks = imageUrls.map(imageUrl => {
    return fetch(imageUrl).then(imageContent => {
      const name = imageUrl.split('/')[imageUrl.split('/').length - 1]
      // 写入二进制内容文件
      folder.file(name, imageContent.blob(), { binary: true })
    })
  })
  Promise.all(downloadTasks).then(() => {
    zip.generateAsync({ type: 'blob' }).then(content => {
      // 写入本地
      saveAs(content, folderName)
    })
  })
}

/**
 * 批量一个一个下载
 * @param imageUrls
 */
export function OneByOne(imageUrls) {
  imageUrls.forEach(pictureUrl => {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.style.height = '0'
    iframe.src = pictureUrl
    document.body.appendChild(iframe)
    setTimeout(() => {
      iframe.remove()
    }, 5 * 60 * 1000)
  })
}

/**
 * 下载文本文件
 * @param content
 * @param filename
 */
export function downloadText(content, filename = 'download.txt') {
  // 创建一个 Blob 对象
  const blob = new Blob([content], { type: 'text/plain' })
  // 创建一个临时的 <a> 标签
  const a = document.createElement('a')
  // 创建一个 URL 指向 Blob 对象
  const url = URL.createObjectURL(blob)
  // 设置 <a> 标签的 href 属性为 Blob URL
  a.href = url
  // 设置 <a> 标签的 download 属性为文件名
  a.download = filename
  // 将 <a> 标签添加到文档中（虽然这里我们不会真正显示它）
  document.body.appendChild(a)
  // 模拟点击 <a> 标签以触发下载
  a.click()
  // 移除 <a> 标签
  document.body.removeChild(a)
  // 释放 Blob URL
  URL.revokeObjectURL(url)
}
