var fs = require('fs')
 , tar = require('tar')
 , zlib = require('zlib')
 , wget = require('wget')
 
function extractTarball(sourceFile, destination, callback) {
  if( /(gz|tgz)$/i.test(sourceFile)) {
    // This file is gzipped, use zlib to deflate the stream before passing to tar.
    fs.createReadStream(sourceFile)
    .pipe(zlib.createGunzip())
    .pipe(tar.Extract({ path: destination}))
    .on('error', function(er) { callback(er)})
    .on("end", function() { callback(null)})
  } else {
    // This file is not gzipped, just deflate it.
    fs.createReadStream(sourceFile)
    .pipe(tar.Extract({ path: destination}))
    .on('error', function(er) { callback(er)})
    .on("end", function() { callback(null)})
  }
}

function extractTarballDownload(url, downloadFile, destination, options, callback) {
  if(!options) options = {}
  var download = wget.download(url, downloadFile, options)
  download.on('error', function(err){
    callback('error', {error: err})
  })
  download.on('end', function(output) {
    extractTarball(output, destination, function(err, data){
      callback(null, {url: url, downloadFile: downloadFile, destination: destination})
    })
  })
}

exports.extractTarball = extractTarball
exports.extractTarballDownload = extractTarballDownload
