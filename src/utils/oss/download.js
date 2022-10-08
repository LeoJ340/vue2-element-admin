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
