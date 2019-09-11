const parser = require('./requestParser')
const errorCheck = require('./utils/errorChecker')
const dataFetcher = require('./dataFetcher')

//const parser = require('parseRequest')
const net = require('net')
const port = 7070
const host = '127.0.0.1'

const server = net.createServer()
server.listen(port, host, () => {
  console.log('TCP Server is running on port ' + port + '.')
})

server.on('connection', function(sock){
  console.log('CONNECTED: ' + sock.remoteAddress + ' : ' + sock.remotePort)

  sock.on('data', function(data){
    [ requestLine, requestLineObject ] = parser.parseRequest(data, sock)

    // Check if there are additional whitespaces in the request line
    let badRequest = errorCheck.wsInRequestLine(requestLine)
    let statusLine = ''

    if(badRequest === 'Bad Request'){
      statusLine = errorCheck.badRequest400()
      sock.write(statusLine)
    }
    else {
      let getFetchedData = async () => {
        let fetchedData = await dataFetcher.fetchData(requestLineObject.uri)
        console.log('fetchedData', fetchedData)
        if(fetchedData === '404'){
          statusLine = errorCheck.fileNotExists404()
          sock.write(Buffer.from(statusLine))
        }
        if(fetchedData === '500'){
          statusLine = errorCheck.serverError500()
          sock.write(Buffer.from(statusLine))
        }
        statusLine = Buffer.from(`HTTP/1.1 200 OK\r\n`)
        console.log('here1', statusLine, fetchedData.header1)
        let headerField = Buffer.from(fetchedData.header1)
        console.log('here2', headerField)
        let blankLine = Buffer.from('\r\n\r\n')
        console.log('here3', blankLine)
        console.log(Buffer.concat([statusLine, headerField, blankLine, fetchedData.data]).toString())

        sock.write(Buffer.concat([statusLine, headerField, blankLine, fetchedData.data]))
      }
    getFetchedData()
    }
  })

  // Add a 'close' event handler to this instance of socket
  sock.on('close', function(data){
    console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort)
  })
})







