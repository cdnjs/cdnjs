/**
 * The reload plugin to free your finger.
 *
 * Active this plugin with seajs hook:
 *
 * - ?seajs-reload
 * - ?seajs-reload=8000
 * - ?seajs-reload=192.168.1.2:8000
 *
 * The default request location is localhost:8000
 *
 * You need a reload server that supports it.
 * The server should watch the file changes, and sent a "update" message.
 *
 * For example:
 * 
 *   var io = require('socket.io').listen(8000)
 *   io.sockets.on('connection', function(socket) {
 *     // if (fileChanged) {
 *     socket.emit('update', {message: 'file changed'})
 *     // }
 *   })
 *
 * We provided a server for you at:
 *
 * https://github.com/seajs/reload-server
 */
define('seajs/plugin-reload', [], function(require) {

  var loc = location.search.match(/seajs-reload=?([^:]*:)?(\d+)?/)
  var host = loc[1] || 'localhost:'
  var port = loc[2] || '8000'
  var url = 'http://' + host + port

  require.async(url + '/socket.io/socket.io.js', function() {
    var socket = io.connect(url)
    socket.on('update', function() {
      location.reload()
    })
  })

});

