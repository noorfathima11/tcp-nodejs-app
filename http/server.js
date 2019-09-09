//const parser = require('parseRequest')
const net = require('net')
const port = 7070
const host = '127.0.0.1'

const server = net.createServer()
server.listen(port, host, () => {
  console.log('TCP Server is running on port ' + port + '.')
})

let requestObject = {}

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
}
