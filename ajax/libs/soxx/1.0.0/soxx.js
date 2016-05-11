(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Soxx = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Soxx
module.exports = Soxx = {
  connect: _connect,

  // Internal objects
  _options: {},
  _userDefinedFunctions: {
    on: {},
    emit: {},
    connect: false,
    close: false
  },
  _returnObject: {},
  _socket: {},
  _isOpen: false,
  _waitTime: 500,

  // Exposing internal functions for testing
  __close: _closeConnection,
  __emit: _emit,
  __on: _on
}

function _connect(opts, cb) {
  opts = opts || {}

  var options = {}
  options.protocol = 'ws'
  options.hostname = 'echo.websocket.org'
  options.path = '/?encoding=text'
  options.port = 80
  options.verbose = true
  for (i in opts) {
    options[i] = opts[i]
  }
  options.url = options.url || options.protocol + '://' + options.hostname + ':' + options.port + options.path
  Soxx._options = options

  if (Soxx._options.verbose && cb) {
    console.log('Soxx | Setting listener on Websocket:', Soxx._options.url, 'Event: Connection open')
  }
  Soxx._userDefinedFunctions.open = cb
  Soxx._socket = new WebSocket(options.url)
  Soxx._socket.onopen = options.onopen || _onOpen
  Soxx._socket.onclose = options.onclose || _onClose
  Soxx._socket.onmessage = options.onmessage || _onMessage
  Soxx._socket.onerror = options.onerror || _onError
  Soxx._returnObject = {
    socket: Soxx._socket,
    close: _close,
    disconnect: _closeConnection
  }
  if (!options.onmessage) {
    Soxx._returnObject.on = _on
    Soxx._returnObject.emit = _emit
  }
  return Soxx._returnObject
}

/** Exposed Functions */

function _closeConnection(cb) { // Internal Function: Close connection and run callback if present
  Soxx._userDefinedFunctions.close = cb
  Soxx._socket.close()
  return false
}

function _close(cb) { // Exposed Function : Soxx.open(opts).close(cb)
  // set up custom on close cb
  if (Soxx._options.verbose) {
    console.log('Soxx | Setting listener on Websocket:', Soxx._options.url, 'Event: Connection close')
  }
  Soxx._userDefinedFunctions.close = cb
  return Soxx._returnObject
}

function _emit(event, data, cb) { // Exposed Function : Soxx.open(opts).emit(cb)
  // reject 'connect' and 'close' events
  if (event === 'connect' || event === 'close') {
    console.error('Soxx | \'connect\' and \'close\' events are reserved. Please choose another event name.')
    return false
  }
  var objectToEmit = {
    event: event,
    data: data
  }
  if (Soxx._options.verbose) {
    console.log('Soxx | Emitting to Websocket:', Soxx._options.url, objectToEmit)
  }
  if (Soxx._isOpen) {
    Soxx._socket.send(JSON.stringify(objectToEmit))
  }
  else {
    console.log('Soxx | Socket not yet open. Waiting', Soxx._waitTime, 'ms to try again.')
    setTimeout(function () {
      _emit(event, data, cb)
    }, Soxx._waitTime)
  }
  return Soxx._returnObject
}

function _on(event, cb) { // Exposed Function : Soxx.open(opts).on(cb)
  // Reserve 'connect' and 'close' events
  if (event !== 'connect' && event !== 'close') {
    if (Soxx._options.verbose) {
      console.log('Soxx | Setting listener on Websocket:', Soxx._options.url, 'Event:', event)
    }
    Soxx._userDefinedFunctions.on[event] = cb
  }
  else { // set up custom on connect and close cbs

  }
  return Soxx._returnObject
}

/** Internal Functions */

function _onOpen(evt) { // Internal Function: To run after connection is opened
  var data = evt.data
  Soxx._isOpen = true
  if (Soxx._options.verbose) {
    console.log('Soxx | Connected to Websocket:', Soxx._options.url)
  }
  if (Soxx._userDefinedFunctions.open && typeof Soxx._userDefinedFunctions.open === 'function') {
    Soxx._userDefinedFunctions.open(evt)
  }
}

function _onClose(event) { // Internal Function: To run after connection is closed
  if (Soxx._options.verbose) {
    console.log('Soxx | Closed connection to Websocket:', Soxx._options.url)
  }
  if (Soxx._userDefinedFunctions.close && typeof Soxx._userDefinedFunctions.close === 'function') {
    Soxx._userDefinedFunctions.close()
  }
  Soxx = {
    connect: _connect,
    _options: {},
    _userDefinedFunctions: {
      on: {},
      emit: {},
      connect: false,
      close: false
    },
    _returnObject: {},
    _socket: {},
    _isOpen: false,
    _waitTime: 500,
    __close: _closeConnection,
    __emit: _emit,
    __on: _on
  }
}

function _onMessage(event) { // Internal Function: Parse Event ID and run the corresponding _onFunctions function
  var message = event.data
  if (Soxx._options.verbose) {
    console.log('Soxx | Receiving message from Websocket', Soxx._options.url, message)
  }
  try {
    message = JSON.parse(message)
  }
  catch (e) {
    console.error('Soxx | Message parsing from Websocket failed.')
    return
  }
  if (Soxx._userDefinedFunctions.on[message.event]) {
    Soxx._userDefinedFunctions.on[message.event](message.data)
  }
}

function _onError(event) { // Internal Function: To run on socket error
  console.error('Soxx | An error occured while connecting to Websocket.', Soxx._options.url, event)
}


},{}]},{},[1])(1)
});