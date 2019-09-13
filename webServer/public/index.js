let formJSON = document.getElementById('post-json')
console.log('form-JSON', formJSON)

formJSON.addEventListener('submit', async (e) => {
  console.log('Form submitted')
  e.preventDefault()
  let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  let body = { inputName: e.target.inputName.value, inputNameAgain: e.target.inputNameAgain.value }
  let reqBody = { headers: headers, method: 'POST', body: JSON.stringify(body) }
  let res = await fetch('http://localhost:7070/post-data.json', reqBody)
  console.log(res)
})
