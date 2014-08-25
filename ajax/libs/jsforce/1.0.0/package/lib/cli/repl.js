/*global process, global */
/**
 * @file Creates REPL interface with built in Salesforce API objects and automatically resolves promise object
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var stream = require('stream'),
    rstream = require('readable-stream'),
    Readable = stream.Readable || rstream.Readable,
    Writable = stream.Writable || rstream.Writable,
    Transform = stream.Transform || rstream.Transform,
    PassThrough = stream.PassThrough || rstream.PassThrough,
    _      = require('underscore'),
    sf     = require('../salesforce');

/**
 * Intercept the evaled value returned from repl evaluator, convert and send back to output.
 * @private
 */
function injectBefore(replServer, method, beforeFn) {
  var _orig = replServer[method];
  replServer[method] = function() {
    var args = Array.prototype.slice.call(arguments);
    var callback = args.pop();
    beforeFn.apply(null, args.concat(function(err, res) {
      if (err || res) {
        callback(err, res);
      } else {
        _orig.apply(replServer, args.concat(callback));
      }
    }));
  };
  return replServer;
}

/**
 *
 */
function injectAfter(replServer, method, afterFn) {
  var _orig = replServer[method];
  replServer[method] = function() {
    var args = Array.prototype.slice.call(arguments);
    var callback = args.pop();
    _orig.apply(replServer, args.concat(function() {
      var args = Array.prototype.slice.call(arguments);
      try {
        afterFn.apply(null, args.concat(callback));
      } catch(e) {
        callback(e);
      }
    }));
  };
  return replServer;
}


/**
 * When the result was "promise", resolve its value
 * @private
 */
function promisify(err, value, callback) {
  if (err) { throw err; }
  if (isPromiseLike(value)) {
    value.then(function(v) {
      callback(null, v);
    }, function(err) {
      callback(err);
    });
  } else {
    callback(null, value);
  }
}

/**
 * Detect whether the value has CommonJS Promise/A+ interface or not
 * @private
 */
function isPromiseLike(v) {
  return _.isObject(v) && _.isFunction(v.then);
}

/**
 * Output object to stdout in JSON representation
 * @private
 */
function outputToStdout(prettyPrint) {
  if (prettyPrint && !_.isNumber(prettyPrint)) {
    prettyPrint = 4;
  }
  return function(err, value, callback) {
    if (err) {
      console.error(err);
    } else {
      var str = JSON.stringify(value, null, prettyPrint);
      console.log(str);
    }
    callback(err, value);
  };
}


/**
 * define get accessor using Object.defineProperty
 * @private
 */
function defineProp(obj, prop, getter) {
  if (Object.defineProperty) {
    Object.defineProperty(obj, prop, { get: getter });
  }
}


/**
 *
 */
var Repl = module.exports = function(cli, replModule) {
  this._cli = cli;
  this._replModule = replModule;
  this._in = new Transform();
  this._out = new Transform();
  var self = this;
  this._in._transform = function(chunk, encoding, callback) {
    if (!self._paused) { this.push(chunk); }
    callback();
  };
  this._out._transform = function(chunk, encoding, callback) {
    if (!self._paused && self._interactive !== false) { this.push(chunk); }
    callback();
  };
};

/**
 *
 */
Repl.prototype.start = function(options) {
  var self = this;
  var cli = this._cli;
  options = options || {};

  process.stdin.resume();
  process.stdin.setRawMode(true);
  process.stdin.pipe(this._in);

  this._interactive = options.interactive;

  this._out.pipe(process.stdout);
  defineProp(this._out, "columns", function() { return process.stdout.columns; });

  var replServer = this._replModule.start({
    input: this._in,
    output: this._out,
    terminal: true
  });

  this._defineAdditionalCommands(replServer);

  replServer = injectBefore(replServer, "complete", function() {
    self.complete.apply(self, arguments);
  });
  replServer = injectAfter(replServer, "eval", promisify);

  if (options.interactive === false) { 
    replServer = injectAfter(replServer, "eval", outputToStdout(options.prettyPrint));
    replServer = injectAfter(replServer, "eval", function() { process.exit(); });
  }
  replServer.on('exit', function() { process.exit(); });

  this._defineBuiltinVars(replServer.context);

  if (options.evalScript) {
    this._in.write(options.evalScript + "\n", "utf-8");
  }
  return this;
};

/**
 *
 */
Repl.prototype._defineAdditionalCommands = function(replServer) {
  var cli = this._cli;
  replServer.defineCommand('connections', {
    help: 'List currenty registered Salesforce connections',
    action: function(name) {
      cli.listConnections();
      replServer.displayPrompt();
    }
  });
  replServer.defineCommand('connect', {
    help: 'Connect to Salesforce instance',
    action: function(name, password) {
      var options = null;
      if (password) {
        options = { username: name, password: password };
      }
      cli.connect(name, options, function(err, res) {
        if (err) { console.error(err.message); }
        replServer.displayPrompt();
      });
    }
  });
  replServer.defineCommand('disconnect', {
    help: 'Disconnect connection and erase it from registry',
    action: function(name) {
      cli.disconnect(name);
      replServer.displayPrompt();
    }
  });
  replServer.defineCommand('authorize', {
    help: 'Connect to Salesforce using OAuth2 authorization flow',
    action: function(clientName) {
      cli.authorize(clientName, function(err, res) {
        if (err) { console.error(err.message); }
        replServer.displayPrompt();
      });
    }
  });
  replServer.defineCommand('register', {
    help: 'Register OAuth2 client information',
    action: function(clientName, clientId, clientSecret, redirectUri, loginUrl) {
      var config = {
        clientId: clientId,
        clientSecret: clientSecret,
        redirectUri: redirectUri,
        loginUrl: loginUrl
      };
      cli.register(clientName, config, function(err, res) {
        if (err) { console.error(err.message); }
        replServer.displayPrompt();
      });
    }
  });
};

/**
 *
 */
Repl.prototype.pause = function() {
  this._paused = true;
  process.stdin.setRawMode(false);
};

/**
 *
 */
Repl.prototype.resume = function() {
  this._paused = false;
  process.stdin.resume();
  process.stdin.setRawMode(true);
};

/**
 *
 */
Repl.prototype.complete = function(line, callback) {
  var tokens = line.replace(/^\s+/, '').split(/\s+/);
  var command = tokens[0];
  var keyword = tokens[1] || '';
  if (command[0] === '.' && tokens.length === 2) {
    var candidates = [];
    if (command === '.connect' || command === '.disconnect') {
      candidates = this._cli.getConnectionNames();
    }
    if (command === '.authorize') {
      candidates = this._cli.getClientNames();
    }
    candidates = candidates.filter(function(name) {
      return name.indexOf(keyword) === 0;
    });
    callback(null, [ candidates, keyword ]);
  } else {
    callback();
  }
};

/**
 * Map all node-salesforce object to REPL context
 * @private
 */
Repl.prototype._defineBuiltinVars = function(context) {
  var cli = this._cli;

  // define salesforce package root objects
  for (var key in sf) {
    if (sf.hasOwnProperty(key) && !global[key]) {
      context[key] = sf[key];
    }
  }
  // expose salesforce package root as "$sf" in context.
  context.$sf = sf;

  function createProxyFunc(prop) {
    return function() {
      var conn = cli.getCurrentConnection();
      return conn[prop].apply(conn, arguments);
    };
  }

  function createProxyAccessor(prop) {
    return function() {
      var conn = cli.getCurrentConnection();
      return conn[prop];
    };
  }

  var conn = cli.getCurrentConnection();
  // define connection prototype functions as proxy
  for (var prop in conn) {
    if (prop.indexOf('_') === 0) { // ignore private
      continue;
    }
    if (_.isFunction(conn[prop])) {
      context[prop] = createProxyFunc(prop);
    } else if (_.isObject(conn[prop])) {
      defineProp(context, prop, createProxyAccessor(prop));
    }
  }

  // expose default connection as "$conn"
  defineProp(context, "$conn", function(){ return cli.getCurrentConnection(); });

};

