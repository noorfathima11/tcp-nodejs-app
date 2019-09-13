const checkMime = require('./utils/mimeTypes')
const path = require("path")
const fs = require("fs")
const rootDir = __dirname + "/public"

const readData = async (fileLocation) => {
  return new Promise((resolve) => {
    fs.readFile(fileLocation, function(err, data){
      if(err) resolve('500')
      let extension = path.parse(fileLocation).ext
      console.log('ext', extension, data)
      const contentType = `Content-type: ${checkMime.mimeType[extension] || 'text/plain'}`
      const contentLength = `Content-Length: ${Buffer.byteLength(data.toString(), 'utf')}`
      const enter = '\r\n'
      console.log('contentLength', contentLength)
      resolve({
        header : contentType.concat(enter, contentLength),
        data : data
      })
    })
  })
}

const writeData = async (fileLocation, body) => {
  return new Promise(resolve => {
    fs.writeFile(fileLocation, body, error => {
      if(error) resolve('500')
      else resolve(({
        header : `Content-type: text/plain`,
        data: Buffer.from('POST successfull')
      }))
    })
  })
}

exports.fetchData = async function (requestLine, body) {
  let fileLocation = path.join(rootDir, requestLine.uri)
  console.log('fileLocation', fileLocation)
  console.log('existsSync', fs.existsSync(fileLocation), 'lstat', (fs.lstatSync(fileLocation).isDirectory() || fs.lstatSync(fileLocation).isFile()))
  isDirExists = fs.existsSync(fileLocation) && (fs.lstatSync(fileLocation).isDirectory() || fs.lstatSync(fileLocation).isFile())
  console.log(isDirExists)
  if(!isDirExists) return '404'
  if(!fs.lstatSync(fileLocation).isFile()) fileLocation += 'index.html'
  console.log('newFileLocation', fileLocation, body)
  if(requestLine.method === 'GET') return await readData(fileLocation)
  if(requestLine.method === 'POST') return await writeData(fileLocation, body)
}
