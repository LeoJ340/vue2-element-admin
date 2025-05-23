import OSS from 'ali-oss'

const client = new OSS({
  region: process.env.VUE_APP_OSS_REGION,
  accessKeyId: process.env.VUE_APP_OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.VUE_APP_OSS_ACCESS_KEY_SECRET,
  bucket: process.env.VUE_APP_OSS_BUCKET
})

function getSuffix(file) {
  return file.name.substring(file.name.lastIndexOf('.') + 1)
}

// 分片上传
async function multipartUpload(path, file, cb) {
  return await client.multipartUpload(path, file, {
    progress: (p, cpy, res) => {
      cb(file.uid, p)
    },
    timeout: 6000000
  })
}

async function uploadOne(file, path = '', cb) {
  const suffix = getSuffix(file)
  let result
  if (file.size / (1024 * 1024) >= 2) {
    result = await multipartUpload(`${path}/${file.uid}.${suffix}`, file, cb)
  } else {
    result = await client.put(`${path}/${file.uid}.${suffix}`, file)
  }
  return result
}

async function uploadList(files, path = '', cb = (uid, progress) => {
  // 默认回调，输出上传进度
  files.find(file => file.uid === uid).progress = progress
  let count = 0
  files.forEach(file => {
    if (file.progress) {
      count += file.progress
    }
  })
  console.log(Math.floor(count / files.length * 100))
}) {
  const tasks = files.map(file => {
    return uploadOne(file, path, cb)
  })
  return await Promise.all(tasks)
}

async function getList() {
  return await client.list()
}

async function removeOne(fileName) {
  return await client.delete(fileName)
}

async function removeList(fileNames) {
  return await client.deleteMulti(fileNames)
}

export const OSSPlugin = {
  install(Vue) {
    Vue.prototype.$oss = {
      getList,
      uploadOne,
      uploadList,
      removeOne,
      removeList
    }
  }
}
