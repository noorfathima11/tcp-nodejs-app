let formJSON = document.getElementById('post-json')
//let imageUpload = document.getElementById('image')
//let reader = new FileReader()

// const readFile = async () => {
//   return new Promise((resolve) => {
//     reader.onload = (theFile) => {
//       let fileName = theFile.name
//       resolve(fileName)
//     }
//   })
// }

formJSON.addEventListener('change', async (e) => {
  console.log('Form submitted')
  e.preventDefault()
  //let fileName = await readFile()
  //let fileData = reader.readAsArrayBuffer(e.target.image.files[0])
  let headers = { 'Accept': 'multipart/form-data', 'Content-Type': 'multipart/form-data' }
  let body = { inputName: e.target.inputName.value,
               inputNameAgain: e.target.inputNameAgain.value
               //imageFileName: fileName,
               //imageFileData: fileData
             }
  let reqBody = { headers: headers, method: 'POST', body: JSON.stringify(body) }
  let res = await fetch('http://localhost:7070/post-data.js', reqBody)
  console.log(res)
})


