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
      resolve({
        header1 : `Content-type: ${checkMime.mimeType[extension] || 'text/plain'}`,
        data : data
      })
    })
  })
}

exports.fetchData = async function (uri) {
  let fileLocation = path.join(rootDir, uri)
  console.log('fileLocation', fileLocation)
  isDirExists = fs.existsSync(fileLocation) && fs.lstatSync(fileLocation).isDirectory()
  console.log(isDirExists)
  if(!isDirExists) return '404'
  fileLocation += 'index.html'
  console.log('newFileLocation', fileLocation)
  return await readData(fileLocation)
}
