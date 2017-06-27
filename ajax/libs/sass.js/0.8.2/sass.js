/*! sass.js - v0.8.2 (6df72b8) - built 2015-05-09
  providing libsass 3.2.3 (3cf31ef)
  via emscripten 1.31.3 (5ce6ee5)
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

  var Sass = {
    _worker: null,
    _callbacks: {},

    style: {
      nested: 0,
      expanded: 1,
      compact: 2,
      compressed: 3
    },
    comments: {
      'none': 0,
      'default': 1
    },

    _dispatch: function(options, callback) {
      options.id = 'cb' + Date.now() + Math.random();
      Sass._callbacks[options.id] = callback;
      Sass._worker.postMessage(options);
    },

    _importerInit: function(args) {
      // importer API done callback pushing results
      // back to the worker
      var done = function done(result) {
        Sass._worker.postMessage({
          command: '_importerFinish',
          args: [result]
        });
      };

      try {
        Sass._importer(args[0], done);
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
      Sass._importer = importerCallback;
      // tell worker to activate importer callback
      Sass._worker.postMessage({
        command: 'importer',
        args: [Boolean(importerCallback)]
      });

      callback && callback();
    },

    initialize: function(workerUrl) {
      if (Sass._worker) {
        throw new Error('Sass Worker is already initalized');
      }

      Sass._worker = new Worker(workerUrl);
      Sass._worker.addEventListener('message', function(event) {
        if (event.data.command) {
          Sass[event.data.command](event.data.args);
        }

        Sass._callbacks[event.data.id] && Sass._callbacks[event.data.id](event.data.result);
        delete Sass._callbacks[event.data.id];
      }, false);
    }
  };

  var commands = 'writeFile readFile listFiles removeFile clearFiles lazyFiles preloadFiles options compile compileFile';
  commands.split(' ').forEach(function(command) {
    Sass[command] = function() {
      var callback = slice.call(arguments, -1)[0];
      var args = slice.call(arguments, 0, -1);
      if (typeof callback !== 'function') {
        args.push(callback);
        callback = noop;
      }

      Sass._dispatch({
        command: command,
        args: args
      }, callback);
    };
  });

  return Sass;
}));