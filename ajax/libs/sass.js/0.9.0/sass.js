/*! sass.js - v0.9.0 (59917af) - built 2015-05-21
  providing libsass 3.2.4 (a6482aa)
  via emscripten 1.32.4 (ae2f801)
 */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.Sass = factory();
  }
}(this, function () {
  'use strict';
  /*global Worker*/

  var noop = function(){};
  var slice = [].slice;
  // defined upon first Sass.initialize() call
  var globalWorkerUrl;

  function Sass(workerUrl) {
    if (!workerUrl && !globalWorkerUrl) {
      throw new Error(
        'Sass needs to be initialized with the URL of sass.worker.js - '
        + 'either via Sass.setWorkerUrl(url) or by new Sass(url)'
      );
    }

    if (!globalWorkerUrl) {
      globalWorkerUrl = workerUrl;
    }

    // bind all functions
    // we're doing this because we used to have a single hard-wired instance that allowed
    // [].map(Sass.removeFile) and we need to maintain that for now (at least until 1.0.0)
    for (var key in this) {
      if (typeof this[key] === 'function') {
        this[key] = this[key].bind(this);
      }
    }

    this._callbacks = {};
    this._worker = new Worker(workerUrl || globalWorkerUrl);
    this._worker.addEventListener('message', this._handleWorkerMessage, false);
  }

  // allow setting the workerUrl before the first Sass instance is initialized,
  // where registering the global workerUrl would've happened automatically
  Sass.setWorkerUrl = function(workerUrl) {
    globalWorkerUrl = workerUrl;
  };

  Sass.style = {
    nested: 0,
    expanded: 1,
    compact: 2,
    compressed: 3
  };

  Sass.comments = {
    'none': 0,
    'default': 1
  };

  Sass.prototype = {
    style: Sass.style,
    comments: Sass.comments,

    destroy: function() {
      this._worker && this._worker.terminate();
      this._worker = null;
      this._callbacks = {};
      this._importer = null;
    },

    _handleWorkerMessage: function(event) {
      if (event.data.command) {
        this[event.data.command](event.data.args);
      }

      this._callbacks[event.data.id] && this._callbacks[event.data.id](event.data.result);
      delete this._callbacks[event.data.id];
    },

    _dispatch: function(options, callback) {
      if (!this._worker) {
        throw new Error('Sass worker has been terminated');
      }

      options.id = 'cb' + Date.now() + Math.random();
      this._callbacks[options.id] = callback;
      this._worker.postMessage(options);
    },

    _importerInit: function(args) {
      // importer API done callback pushing results
      // back to the worker
      var done = function done(result) {
        this._worker.postMessage({
          command: '_importerFinish',
          args: [result]
        });
      }.bind(this);

      try {
        this._importer(args[0], done);
      } catch(e) {
        done({ error: e.message });
        throw e;
      }
    },

    importer: function(importerCallback, callback) {
      if (typeof importerCallback !== 'function' && importerCallback !== null) {
        throw new Error('importer callback must either be a function or null');
      }

      // callback is executed in the main EventLoop
      this._importer = importerCallback;
      // tell worker to activate importer callback
      this._worker.postMessage({
        command: 'importer',
        args: [Boolean(importerCallback)]
      });

      callback && callback();
    },
  };

  var commands = 'writeFile readFile listFiles removeFile clearFiles lazyFiles preloadFiles options compile compileFile';
  commands.split(' ').forEach(function(command) {
    Sass.prototype[command] = function() {
      var callback = slice.call(arguments, -1)[0];
      var args = slice.call(arguments, 0, -1);
      if (typeof callback !== 'function') {
        args.push(callback);
        callback = noop;
      }

      this._dispatch({
        command: command,
        args: args
      }, callback);
    };
  });

  // automatically set the workerUrl in case we're loaded by a simple
  // <script src="path/to/sass.js"></script>
  // see https://github.com/medialize/sass.js/pull/32#issuecomment-103142214
  // we can only run this test in the browser,
  // so make sure we actually have a DOM to work with
  if (typeof document !== 'undefined' && document.getElementsByTagName) {
    // http://www.2ality.com/2014/05/current-script.html
    var currentScript = document.currentScript || (function() {
      var scripts = document.getElementsByTagName('script');
      return scripts[scripts.length - 1];
    })();

    var defaultWorkerUrl = currentScript && currentScript.src;
    // make sure we're not running in some concatenated thing
    if (defaultWorkerUrl && defaultWorkerUrl.slice(-8) === '/sass.js') {
      Sass.setWorkerUrl(defaultWorkerUrl.slice(0, -8) + '/sass.worker.js');
    }
  }

  return Sass;
}));