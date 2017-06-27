/*global process */
var http = require('http'),
    url = require('url'),
    openUrl = require('open'),
    async = require('async'),
    commander = require('commander'),
    coprompt = require('co-prompt'),
    registry = require('./registry'),
    Repl = require('./repl'),
    sf = require('../salesforce');

var repl;
var conn = null;
var connName = null;
var outputEnabled = true;

/**
 *
 */
function start() {
  var self = this;
  var program = new commander.Command();
  program.option('-u, --username [username]', 'Salesforce username')
         .option('-p, --password [password]', 'Salesforce password (and security token, if available)')
         .option('-c, --connection [connection]', 'Connection name stored in connection registry')
         .option('-e, --evalScript [evalScript]', 'Script to evaluate')
         .option('--coffee', 'Using CoffeeScript')
         .parse(process.argv);
  var replModule = program.coffee ? require('coffee-script/lib/coffee-script/repl') : require('repl');
  repl = new Repl(this, replModule);
  outputEnabled = !program.evalScript;
  var options = { username: program.username, password: program.password };
  connect(program.connection, options, function(err, res) {
    if (err) {
      console.error(err.message);
      process.exit();
    } else {
      if (program.evalScript) {
        repl.start({
          interactive: false,
          evalScript: program.evalScript
        });
      } else {
        repl.start();
      }
    }
  });
}

/**
 *
 */
function getCurrentConnection() {
  return conn;
}

function print(message) {
  if (outputEnabled) { console.log(message); }
}

/**
 *
 */
function saveCurrentConnection() {
  if (conn && connName) {
    var connConfig = {
      oauth2: conn.oauth2 && {
        clientId: conn.oauth2.clientId,
        clientSecret: conn.oauth2.clientSecret,
        redirectUri: conn.oauth2.redirectUri,
        loginUrl: conn.oauth2.loginUrl
      },
      accessToken: conn.accessToken,
      instanceUrl: conn.instanceUrl,
      refreshToken: conn.refreshToken
    };
    registry.saveConnection(connName, connConfig);
  }
}

/**
 *
 */
function connect(name, options, callback) {
  connName = name;
  options = options || {};
  var connConfig = registry.getConnection(name);
  var username, password;
  if (!connConfig) {
    connConfig = {};
    username = name;
  }
  conn = new sf.Connection(connConfig);
  username = username || options.username;
  password = options.password;
  var handleLogin = function(err) {
    if (err) { return callback(err); }
    saveCurrentConnection();
    callback();
  };
  if (username) {
    loginByPassword(username, password, 2, handleLogin);
  } else {
    if (connName && conn.accessToken) {
      conn.on('refresh', function(accessToken) {
        print('Refreshing access token ... ');
        saveCurrentConnection();
      });
      conn.identity(function(err, identity) {
        if (err) {
          print(err.message);
          if (conn.oauth2) {
            callback(new Error('Please re-authorize connection.'));
          } else {
            loginByPassword(connName, null, 2, handleLogin);
          }
        } else {
          print('Logged in as : ' + identity.username);
          callback();
        }
      });
    } else {
      callback();
    }
  }
}

/**
 *
 */
function loginByPassword(username, password, retry, callback) {
  if (!password) {
    promptPassword('Password: ', function(err, pass) {
      if (err) { return callback(err); }
      loginByPassword(username, pass, retry, callback);
    });
    return;
  }
  conn.login(username, password, function(err, result) {
    if (err) {
      console.error(err.message);
      if (retry > 0) {
        loginByPassword(username, null, --retry, callback);
      } else {
        callback(new Error());
      }
    } else {
      print("Logged in as : " + username);
      callback(null, result);
    }
  });
}

/**
 *
 */
function disconnect(name) {
  name = name || connName;
  if (registry.getConnection(name)) {
    registry.removeConnection(name);
    print("Disconnect connection '" + name + "'");
  }
  connName = null;
  conn = new sf.Connection();
}

/**
 *
 */
function authorize(clientName, callback) {
  clientName = clientName || 'default';
  var oauth2Config = registry.getClient(clientName);
  if (!oauth2Config || !oauth2Config.clientId || !oauth2Config.clientSecret) {
    return callback(new Error("No OAuth2 client information registered : '"+clientName+"'. Please register client info first."));
  }
  var oauth2 = new sf.OAuth2(oauth2Config);
  var state = Math.random().toString(36).substring(2);
  var authzUrl = oauth2.getAuthorizationUrl({ state: state });
  print('Opening authorization page in browser...');
  print('URL: ' + authzUrl);
  openUrl(authzUrl);
  waitCallback(oauth2Config.redirectUri, state, function(err, params) {
    if (err) { return callback(err); }
    conn = new sf.Connection({ oauth2: oauth2 });
    if (!params.code) {
      return callback(new Error('No authorization code returned.'));
    }
    if (params.state !== state) {
      return callback(new Error('Invalid state parameter returned.'));
    }
    print('Received authorization code. Please close the opened browser window.');
    conn.authorize(params.code).then(function(res) {
      print('Authorized. Fetching user info...');
      return conn.identity();
    }).then(function(identity) {
      print('Logged in as : ' + identity.username);
      connName = identity.username;
      saveCurrentConnection();
    }).thenCall(callback);
  });
}


/**
 *
 */
function waitCallback(serverUrl, state, callback) {
  if (serverUrl.indexOf('http://localhost:') === 0) {
    var server = http.createServer(function(req, res) {
      var qparams = url.parse(req.url, true).query;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<html><script>location.href="about:blank";</script></html>');
      res.end();
      callback(null, qparams);
      server.close();
      req.connection.end();
      req.connection.destroy();
    });
    var port = url.parse(serverUrl).port;
    server.listen(port, "localhost");
  } else {
    var msg = 'Copy & paste authz code passed in redirected URL: ';
    promptMessage(msg, function(err, code) {
      if (err) {
        callback(err);
      } else {
        callback(null, { code: decodeURIComponent(code), state: state });
      }
    });
  }
}

/**
 *
 */
function register(clientName, clientConfig, callback) {
  if (!clientName) {
    clientName = "default";
  }

  var prompts = {
    "clientId": "Input client ID (consumer key) : ",
    "clientSecret": "Input client secret (consumer secret) : ",
    "redirectUri": "Input redirect URI : ",
    "loginUrl": "Input login URL (default is https://login.salesforce.com) : "
  };
  async.series([
    function(cb) {
      if (registry.getClient(clientName)) {
        var msg = "Client '"+clientName+"' is already registered. Are you sure you want to override ? [yN] : ";
        promptConfirm(msg, function(err, ok) {
          if (ok) {
            cb();
          } else {
            cb(new Error('Registration canceled.'));
          }
        });
      } else {
        cb();
      }
    }
  ].concat(Object.keys(prompts).map(function(name) {
    var message = prompts[name];
    return function(cb) {
      if (!clientConfig[name]) {
        promptMessage(message, function(err, value) {
          if (err) { return cb(err); }
          if (value) { clientConfig[name] = value; }
          cb();
        });
      } else {
        cb();
      }
    };
  })).concat(function(cb) {
    registry.registerClient(clientName, clientConfig);
    print("Client registered successfully.");
    cb();
  }), callback);
}

/**
 *
 */
function listConnections() {
  var names = registry.getConnectionNames();
  for (var i=0; i<names.length; i++) {
    var name = names[i];
    print((name === connName ? '* ' : '  ') + name);
  }
}

/**
 *
 */
function getConnectionNames() {
  return registry.getConnectionNames();
}

/**
 *
 */
function getClientNames() {
  return registry.getClientNames();
}

/**
 *
 */
function promptMessage(message, callback) {
  repl.pause();
  coprompt(message)(function(err, res) {
    repl.resume();
    callback(err, res);
  });
}

/**
 *
 */
function promptPassword(message, callback) {
  repl.pause();
  coprompt.password(message)(function(err, res) {
    repl.resume();
    callback(err, res);
  });
}

/**
 *
 */
function promptConfirm(message, callback) {
  repl.pause();
  coprompt.confirm(message)(function(err, res) {
    repl.resume();
    callback(err, res);
  });
}

/**
 *
 */
module.exports = {
  start: start,
  getCurrentConnection: getCurrentConnection,
  saveCurrentConnection: saveCurrentConnection,
  listConnections: listConnections,
  getConnectionNames: getConnectionNames,
  getClientNames: getClientNames,
  connect: connect,
  disconnect: disconnect,
  authorize: authorize,
  register: register
};

