// yepnope.js
// v2.0.0
//
// by
// Alex Sexton - @slexaxton - alexsexton[at]gmail.com
// Ralph Holzmann - @rlph - ralphholzmann[at]gmail.com
//
// http://yepnopejs.com/
// https://github.com/SlexAxton/yepnope.js/
//
// New BSD
//
// Consider inlining this script after minifying

window.yepnope = (function (window, document, undef) {
  // Yepnope's style is intentionally very flat to aid in
  // minification. The authors are usually against too much
  // self-minification, but in the case of a script loader, we're
  // especially file size sensitive.

  // Some aliases
  var sTimeout = window.setTimeout;
  var firstScript;
  var scriptsQueue = [];
  var count = 0;
  var toString = {}.toString;

  // This is just used for a race condition,
  // so even if it fails it's not a huge risk
  var isOldIE = !!document.attachEvent && !(window.opera && toString.call(window.opera) == '[object Opera]');

  function noop(){}

  // Helper functions
  function isObject(obj) {
    return Object(obj) === obj;
  }

  function isString(s) {
    return typeof s == 'string';
  }

  // Loader Utilities
  function uniq() {
    return 'yn_' + (count++);
  }

  function readFirstScript() {
    if (!firstScript || !firstScript.parentNode) {
      firstScript = document.getElementsByTagName('script')[0];
    }
  }

  function isFileReady(readyState) {
    // Check to see if any of the ways a file can be ready are available as properties on the file's element
    return (!readyState || readyState == 'loaded' || readyState == 'complete' || readyState == 'uninitialized');
  }

  function runWhenReady(src, cb) {
      cb.call(window);
  }

  // Inject a script into the page and know when it's done
  function injectJs(options, cb) {
    var src;
    var attrs;
    var timeout;

    if (isString(options)) {
      src = options;
    }
    else if (isObject(options)) {
      // Allow rewritten url to take precedence
      src = options._url || options.src;
      attrs = options.attrs;
      timeout = options.timeout;
    }

    cb = cb || noop;
    attrs = attrs || {};

    var script = document.createElement('script');
    var done;
    var i;

    timeout = timeout || yepnope.errorTimeout;

    script.src = src;

    // IE Race condition
    // http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
    if (isOldIE) {
      script.event = 'onclick';
      script.id = script.htmlFor = attrs.id || uniq();
    }

    // Add our extra attributes to the script element
    for (i in attrs) {
      script.setAttribute(i, attrs[i]);
    }

    // Bind to load events
    script.onreadystatechange = script.onload = function () {

      if ( !done && isFileReady(script.readyState) ) {
        // Set done to prevent this function from being called twice.
        done = 1;

        // Second half of IE race condition hack
        if (isOldIE) {
          try {
            // By calling this here, we create a synchronous
            // execution of the contents of the script
            // and the execution of the callback below.
            script.onclick();
          }
          catch (e) {}
        }

        // Just run the callback
        runWhenReady(src, cb);
      }

      // Handle memory leak in IE
      script.onload = script.onreadystatechange = script.onerror = null;
    };

    // This won't work in every browser, but
    // would be helpful in those that it does.
    // http://stackoverflow.com/questions/2027849/how-to-trigger-script-onerror-in-internet-explorer/2032014#2032014
    // For those that don't support it, the timeout will be the backup
    script.onerror = function () {
      // Don't call the callback again, so we mark it done
      done = 1;
      cb(new Error('Script Error: ' + src));
      // We don't waste bytes on cleaning up memory in error cases
      // because hopefully it doesn't happen often enough to matter.
      // And you're probably already in an 'uh-oh' situation.
    };

    // 404 Fallback
    sTimeout(function () {
      // Don't do anything if the script has already finished
      if (!done) {
        // Mark it as done, which means the callback won't run again
        done = 1;

        // Might as well pass in an error-state if we fire the 404 fallback
        cb(new Error('Timeout: ' + src));
        // Maybe...
        script.parentNode.removeChild(script);
      }
    }, timeout);

    // Inject script into to document
    readFirstScript();
    firstScript.parentNode.insertBefore(script, firstScript);
  }

  function injectCss(options, cb) {
    var attrs = {};
    var href;
    var i;
    var media;

    // optionally accept an object of settings
    // or a string that's the url
    if (isObject(options)) {
      // allow the overriden _url property to take precendence
      href = options._url || options.href;
      attrs = options.attrs || {};
    }
    else if (isString(options)) {
      href = options;
    }

    // Create stylesheet link
    var link = document.createElement('link');

    cb = cb || noop;

    // Add attributes
    link.href = href;
    link.rel = 'stylesheet';
    // Technique to force non-blocking loading from:
    // https://github.com/filamentgroup/loadCSS/blob/master/loadCSS.js#L20
    link.media = 'only x';
    link.type = 'text/css';

    // On next tick, just set the media to what it's supposed to be
    sTimeout(function() {
      link.media = attrs.media || 'all';
    });

    // Add our extra attributes to the link element
    for (i in attrs) {
      link.setAttribute(i, attrs[i]);
    }

    readFirstScript();
    // We append link tags so the cascades work as expected.
    // A little more dangerous, but if you're injecting CSS
    // dynamically, you probably can handle it.
    firstScript.parentNode.appendChild(link);

    // Always just run the callback for CSS on next tick. We're not
    // going to try to normalize this, so don't worry about runwhenready here.
    sTimeout(function() {
      cb.call(window);
    });
  }

  function getExtension(url) {
    //The extension is always the last characters before the ? and after a period.
    //The previous method was not accounting for the possibility of a period in the query string.
    var b = url.split('?')[0];
    return b.substr(b.lastIndexOf('.')+1);
  }

  function defaultUrlFormatter(base, tests) {
    var url = base;
    var passed = [];
    var failed = [];

    for(var i in tests) {
      if (tests.hasOwnProperty(i)) {
        if (tests[i]) {
          passed.push(encodeURIComponent(i));
        }
        else {
          failed.push(encodeURIComponent(i));
        }
      }
    }

    if (passed.length || failed.length) {
      url += '?';
    }

    if (passed.length) {
      url += 'yep=' + passed.join(',');
    }

    if (failed.length) {
      url += (passed.length ? '&' : '') + 'nope=' + failed.join(',');
    }

    return url;
  }

  // The leaked function. Mostly just takes a set
  // of arguments, and then passes them to be run.
  function yepnope(url, tests, cb) {
    var options;

    if (isObject(url)) {
      // It was just kidding about being the url
      options = url;
      // Can't ever have both, so this is fine
      url = options.src || options.href;
    }

    url = yepnope.urlFormatter(url, tests);

    if (!options) {
      options = {_url: url};
    }
    else {
      options._url = url;
    }

    var type = getExtension(url);

    if (type === 'js') {
      injectJs(options, cb);
    }
    else if (type === 'css') {
      injectCss(options, cb);
    }
    else {
      throw new Error('Unable to determine filetype.');
    }
  }

  // Add a default for the error timer
  yepnope.errorTimeout = 10e3;
  // Expose no BS script injection
  yepnope.injectJs = injectJs;
  // Expose super-lightweight css injector
  yepnope.injectCss = injectCss;
  // Allow someone to override the url writer
  yepnope.urlFormatter = defaultUrlFormatter;

  return yepnope;
})(window, document);
