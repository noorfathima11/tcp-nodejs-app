let requestLineObject = {
  method : '',
  uri : '',
  protocol : ''
}
let headerFieldsObject = {}
let bodyObject = {}

exports.parseRequest = function (requestData, sock){
  console.log('DATA ' + sock.remoteAddress + ' : ' + requestData)
  requestData = requestData.toString()
  let requestSplit = requestData.split(/\r\n|\r|\n|\r\n\r\n/)
  console.log('splitArray', requestSplit)

  let requestLine = requestLineParser(requestSplit[0])

  headerFieldsParser(requestSplit)
  console.log('Helllllllllllllllo')
  if(Object.keys(headerFieldsObject).includes('Content-Length')) {
    console.log('Body exists')
    //bodyObject = bodyParser(requestSplit[requestSplit.length - 1])
    bodyObject = requestSplit[requestSplit.length - 1]
    console.log('bodyObject', bodyObject)
  }
  return [requestLine, requestLineObject, bodyObject]

}

function requestLineParser(requestLine0){
  // let keys = Object.keys(requestLine)
  // let i = 0
  // splitArray[0].split(/\s/).forEach(element => {
  //   requestLine[keys[i++]] = element
  // })
  let requestLine = requestLine0.split(/\s/)
  requestLineObject.method = requestLine[0]
  requestLineObject.uri = requestLine[1]
  requestLineObject.protocol = requestLine[2]
  console.log('requestLineObject', requestLineObject)
  return requestLine
}

function headerFieldsParser(request){
  let newLineIndex = request.indexOf('')
  let headerFields = request.slice(1, newLineIndex)
  headerFields.forEach(element => {
    element = element.split(/\s/)
    headerFieldsObject[element[0].split(/:/)[0]] = element.slice(1).toString()
  })
  console.log(headerFields)
  console.log(headerFieldsObject)
}

// function bodyParser(body){
//   return JSON.parse(body)
// }

