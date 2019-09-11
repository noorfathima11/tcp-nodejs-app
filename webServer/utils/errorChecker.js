exports.wsInRequestLine = function (requestLine) {
  if(requestLine.length > 3){
    return 'Bad Request'
  }
}

exports.badRequest400 = function () {
  return (`HTTP/1.1 400 Bad Request\r\n` +
         '\r\n')
}

exports.fileNotExists404 = function () {
  console.log('404 error')
  return `HTTP/1.1 404 File not found!\r\n` + `\r\n`
}

exports.serverError500 = function () {
  console.log('500 server error')
  return `HTTP/1.1 500 Server Error\r\n` + `\r\n`

}
