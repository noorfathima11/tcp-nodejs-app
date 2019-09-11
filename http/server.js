//const parser = require('parseRequest')
const net = require('net')
const port = 7070
const host = '127.0.0.1'

const server = net.createServer()
server.listen(port, host, () => {
  console.log('TCP Server is running on port ' + port + '.')
})

let requestLineObject = {
  method : '',
  uri : '',
  protocol : ''
}
let headerFieldsObject = {}

server.on('connection', function(sock){
  console.log('CONNECTED: ' + sock.remoteAddress + ' : ' + sock.remotePort)

  sock.on('data', function(data){
    requestObject = parseRequest(data, sock)
  })

  // Add a 'close' event handler to this instance of socket
  sock.on('close', function(data){
    console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort)
  })
})

function parseRequest(requestData, sock) {
  console.log('DATA ' + sock.remoteAddress + ' : ' + requestData)
  requestData = requestData.toString()
  console.log('typeof', typeof requestData)
  console.log('requestdata', requestData)
  let requestSplit = requestData.split(/\r\n|\r|\n/)
  console.log('splitArray', requestSplit)
  // let keys = Object.keys(requestLine)
  // let i = 0
  // splitArray[0].split(/\s/).forEach(element => {
  //   requestLine[keys[i++]] = element
  // })
  let requestLine = requestSplit[0].split(/\s/)
  requestLineObject.method = requestLine[0]
  requestLineObject.uri = requestLine[1]
  requestLineObject.protocol = requestLine[2]

  // Check if there are additional whitespaces in the request line
  if(requestLine.length > 3){
    sock.write(`HTTP/1.1 400 Bad Request\r\n` +
              '\r\n')
  } else {
    sock.write(`${requestLineObject.protocol} 200 OK\r\n` +
               '\r\n')
    sock.write('Hello World')
  }

  console.log('requestLineObject', requestLineObject)

  let newLineIndex = requestSplit.indexOf('')
  let headerFields = requestSplit.slice(1, newLineIndex)
  headerFields.forEach(element => {
    element = element.split(/\s/)
    headerFieldsObject[element[0].split(/:/)[0]] = element.slice(1).toString()
  })
  console.log(headerFields)
  console.log(headerFieldsObject)
}
