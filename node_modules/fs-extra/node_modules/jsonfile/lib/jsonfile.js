var fs = require('fs')

var me = module.exports

me.spaces = 2

me.readFile = function(file, options, callback) {
  if (callback == undefined) {
    callback = options
    options = null
  }

  fs.readFile(file, options, function(err, data) {
    if (err) return callback(err, null)

    var obj = null
    try {
      obj = JSON.parse(data)
    } catch (err2) {
      return callback(err2, null)
    }

    callback(null, obj)
  })
}

me.readFileSync = function(file, options) {
  return JSON.parse(fs.readFileSync(file, options))
}

me.writeFile = function(file, obj, options, callback) {
  if (callback == undefined) {
    callback = options
    options = null
  }

  var str = ''
  try {
    str = JSON.stringify(obj, null, me.spaces)
  } catch (err) {
    if (callback) return callback(err, null)
  }

  fs.writeFile(file, str, options, callback)
}

me.writeFileSync = function(file, obj, options) {
  var str = JSON.stringify(obj, null, me.spaces)
  return fs.writeFileSync(file, str, options) //not sure if fs.writeFileSync returns anything, but just in case
}
