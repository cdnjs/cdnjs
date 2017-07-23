var express = require('express');
var httpProxy = require('http-proxy');
var url = require('url');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');

var common = require('./common');
var pjson = require('../package.json');

var BITGOEXPRESS_USER_AGENT = "BitGoExpress/" + pjson.version;

module.exports = function(args) {
  // Create express app
  var app = express();

  // Set up morgan for logging, with optional logging into a file
  if (args.logfile) {
    // create a write stream (in append mode)
    var accessLogPath = path.resolve(args.logfile);
    var accessLogStream = fs.createWriteStream(accessLogPath, {flags: 'a'});
    console.log('Log location: ' + accessLogPath);
    // setup the logger
    app.use(morgan('combined', {stream: accessLogStream}))
  } else {
    app.use(morgan('combined'));
  }
  morgan.token('remote-user', function(req, res){ return req.isProxy ? 'proxy' : 'local_express'; });

  // Be more robust about accepting URLs with double slashes
  app.use(function(req, res, next) {
    req.url = req.url.replace(/\/\//g, '/');
    next();
  });

  // Decorate the client routes
  require('./clientRoutes')(app, args);

  // Mount the proxy middleware
  var options = {};
  if (common.Environments[args.env].network === 'testnet') {
    // Need to do this to make supertest agent pass (set rejectUnauthorized to false)
    options = { secure: false };
  }

  if (args.customrooturi || args.custombitcoinnetwork || process.env.BITGO_CUSTOM_ROOT_URI || process.env.BITGO_CUSTOM_BITCOIN_NETWORK) {
    args.env = 'custom';
    if (args.customrooturi) {
      common.Environments['custom'].uri = args.customrooturi;
    }
    if (args.custombitcoinnetwork) {
      common.Environments['custom'].network = args.custombitcoinnetwork;
    }
  }

  var proxy = httpProxy.createProxyServer(options);

  proxy.on('proxyReq', function (proxyReq, req, res, options) {
    // Need to rewrite the host, otherwise cross-site protection kicks in
    proxyReq.setHeader('host', url.parse(common.Environments[args.env].uri).hostname);

    var userAgent = req.headers['user-agent'] ? BITGOEXPRESS_USER_AGENT + " " + req.headers['user-agent'] : BITGOEXPRESS_USER_AGENT;
    proxyReq.setHeader('User-Agent', userAgent);
  });

  app.use(function (req, res) {
    req.isProxy = true;
    proxy.web(req, res, { target: common.Environments[args.env].uri, changeOrigin: true });
  });

  return app;
};
