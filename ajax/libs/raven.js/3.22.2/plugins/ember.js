/*! Raven.js 3.22.2 (1b6187b) | github.com/getsentry/raven-js */

/*
 * Includes TraceKit
 * https://github.com/getsentry/TraceKit
 *
 * Copyright 2018 Matt Robenolt and other contributors
 * Released under the BSD license
 * https://github.com/getsentry/raven-js/blob/master/LICENSE
 *
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Raven = global.Raven || {}, global.Raven.Plugins = global.Raven.Plugins || {}, global.Raven.Plugins.Ember = factory());
}(this, (function () { 'use strict';

/**
 * Ember.js plugin
 *
 * Patches event handler callbacks and ajax callbacks.
 */
function emberPlugin(Raven, Ember) {
  Ember = Ember || window.Ember; // quit if Ember isn't on the page

  if (!Ember) return;
  var _oldOnError = Ember.onerror;

  Ember.onerror = function EmberOnError(error) {
    Raven.captureException(error);

    if (typeof _oldOnError === 'function') {
      _oldOnError.call(this, error);
    }
  };

  Ember.RSVP.on('error', function (reason) {
    if (reason instanceof Error) {
      Raven.captureException(reason, {
        extra: {
          context: 'Unhandled Promise error detected'
        }
      });
    } else {
      Raven.captureMessage('Unhandled Promise error detected', {
        extra: {
          reason: reason
        }
      });
    }
  });
}

var ember = emberPlugin;

return ember;

})));
