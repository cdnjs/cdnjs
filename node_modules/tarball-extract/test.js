var tarball = require('./tarball')

url = 'http://www.tcpdump.org/release/libpcap-1.3.0.tar.gz'
tarball.extractTarballDownload(url , '/tmp/libpcap-1.3.0.tar.gz', '/tmp/libpcap-1.3.0', {}, function(err, result) {
  console.log(err, result)
})

