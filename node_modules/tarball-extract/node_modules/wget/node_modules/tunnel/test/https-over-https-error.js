var http = require('http');
var https = require('https');
var net = require('net');
var fs = require('fs');
var path = require('path');
var should = require('should');
var tunnel = require('../index');

function readPem(file) {
  return fs.readFileSync(path.join('test/keys', file + '.pem'));
}

describe('HTTPS over HTTPS authentication failed', function() {
  it('should finish without error', function(done) {
    var serverPort = 3008;
    var proxyPort = 3009;
    var serverConnect = 0;
    var proxyConnect = 0;
    var clientRequest = 0;
    var clientConnect = 0;
    var clientError = 0;
    var server;
    var proxy;

    server = https.createServer({
      key: readPem('agent1-key'), // agent1 is signed by ca1
      cert: readPem('agent1-cert'),
      ca: [ readPem('ca2-cert') ], // ca for agent3
      requestCert: true,
      rejectUnauthorized: true
    }, function(req, res) {
      tunnel.debug('SERVER: got request');
      ++serverConnect;
      res.writeHead(200);
      res.end('Hello, ' + serverConnect);
      tunnel.debug('SERVER: sending response');
    });
    server.listen(serverPort, setupProxy);

    function setupProxy() {
      proxy = https.createServer({
        key: readPem('agent3-key'), // agent3 is signed by ca2
        cert: readPem('agent3-cert'),
        ca: [ readPem('ca1-cert') ], // ca for agent1
        requestCert: true,
        rejectUnauthorized: true
      }, function(req, res) {
        should.fail();
      });
      proxy.on('upgrade', onConnect); // for v0.6
      proxy.on('connect', onConnect); // for v0.7 or later

      function onConnect(req, clientSocket, head) {
        req.method.should.equal('CONNECT');
        req.url.should.equal('localhost:' + serverPort);
        req.headers.should.not.have.property('transfer-encoding');
        ++proxyConnect;

        var serverSocket = net.connect(serverPort, function() {
          tunnel.debug('PROXY: replying to client CONNECT request');
          clientSocket.write('HTTP/1.1 200 Connection established\r\n\r\n');
          clientSocket.pipe(serverSocket);
          serverSocket.write(head);
          serverSocket.pipe(clientSocket);
          // workaround, see #2524
          serverSocket.on('end', function() {
            clientSocket.end();
          });
        });
      }
      proxy.listen(proxyPort, setupClient);
    }

    function setupClient() {
      function doRequest(name, options, host) {
        tunnel.debug('CLIENT: Making HTTPS request (%s)', name);
        ++clientRequest;
        var agent = tunnel.httpsOverHttps(options);
        var req = https.get({
          port: serverPort,
          headers: {
            host: host ? host : 'localhost',
          },
          agent: agent
        }, function(res) {
          tunnel.debug('CLIENT: got HTTPS response (%s)', name);
          ++clientConnect;
          req.emit('finish');
        });
        req.on('error', function(err) {
          tunnel.debug('CLIENT: failed HTTP response (%s)', name, err);
          ++clientError;
          req.emit('finish');
        });
        req.on('finish', function() {
          if (clientConnect + clientError === clientRequest) {
            proxy.close();
            server.close();
          }
        });
      }

      doRequest('no cert origin nor proxy', { // invalid
        maxSockets: 1,
        ca: [ readPem('ca1-cert') ], // ca for origin server (agent1)
        rejectUnauthorized: true,
        // no certificate for origin server
        proxy: {
          port: proxyPort,
          servername: 'agent3',
          ca: [ readPem('ca2-cert') ], // ca for proxy server (agent3)
          rejectUnauthorized: true
          // no certificate for proxy
        }
      }, 'agent1');

      doRequest('no cert proxy', { // invalid
        maxSockets: 1,
        ca: [ readPem('ca1-cert') ], // ca for origin server (agent1)
        rejectUnauthorized: true,
        // client certification for origin server
        key: readPem('agent3-key'),
        cert: readPem('agent3-cert'),
        proxy: {
          port: proxyPort,
          servername: 'agent3',
          ca: [ readPem('ca2-cert') ], // ca for proxy server (agent3)
          rejectUnauthorized: true
          // no certificate for proxy
        }
      }, 'agent1');

      doRequest('no cert origin', { // invalid
        maxSockets: 1,
        ca: [ readPem('ca1-cert') ], // ca for origin server (agent1)
        rejectUnauthorized: true,
        // no certificate for origin server
        proxy: {
          port: proxyPort,
          servername: 'agent3',
          ca: [ readPem('ca2-cert') ], // ca for proxy server (agent3)
          rejectUnauthorized: true,
          // client certification for proxy
          key: readPem('agent1-key'),
          cert: readPem('agent1-cert')
        }
      }, 'agent1');

      doRequest('invalid proxy server name', { // invalid
        maxSockets: 1,
        ca: [ readPem('ca1-cert') ], // ca for origin server (agent1)
        rejectUnauthorized: true,
        // client certification for origin server
        key: readPem('agent3-key'),
        cert: readPem('agent3-cert'),
        proxy: {
          port: proxyPort,
          ca: [ readPem('ca2-cert') ], // ca for agent3
          rejectUnauthorized: true,
          // client certification for proxy
          key: readPem('agent1-key'),
          cert: readPem('agent1-cert')
        }
      }, 'agent1');

      doRequest('invalid origin server name', { // invalid
        maxSockets: 1,
        ca: [ readPem('ca1-cert') ], // ca for agent1
        rejectUnauthorized: true,
        // client certification for origin server
        key: readPem('agent3-key'),
        cert: readPem('agent3-cert'),
        proxy: {
          port: proxyPort,
          servername: 'agent3',
          ca: [ readPem('ca2-cert') ], // ca for proxy server (agent3)
          rejectUnauthorized: true,
          // client certification for proxy
          key: readPem('agent1-key'),
          cert: readPem('agent1-cert')
        }
      });

      doRequest('valid', { // valid
        maxSockets: 1,
        ca: [ readPem('ca1-cert') ], // ca for origin server (agent1)
        rejectUnauthorized: true,
        // client certification for origin server
        key: readPem('agent3-key'),
        cert: readPem('agent3-cert'),
        proxy: {
          port: proxyPort,
          servername: 'agent3',
          ca: [ readPem('ca2-cert') ], // ca for proxy server (agent3)
          rejectUnauthorized: true,
          // client certification for proxy
          key: readPem('agent1-key'),
          cert: readPem('agent1-cert')
        }
      }, 'agent1');
    }

    server.on('close', function() {
      serverConnect.should.equal(1);
      proxyConnect.should.equal(3);
      clientConnect.should.equal(1);
      clientError.should.equal(5);

      done();
    });
  });
});
