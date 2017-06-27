/*! vissense - v0.0.2 - 2014-07-12
* Copyright (c) 2014 tbk;*/
/*! vissense - v0.0.2 - 2014-07-12
* Copyright (c) 2014 tbk;*/
/*! vissense - v0.0.2 - 2014-07-12
* Copyright (c) 2014 tbk;*/
;(function (global) {
    "use strict";

    var lastId = -1;

    // Visibility.js allow you to know, that your web page is in the background
    // tab and thus not visible to the user. This library is wrap under
    // Page Visibility API. It fix problems with different vendor prefixes and
    // add high-level useful functions.
    var self = {

        // Call callback only when page become to visible for user or
        // call it now if page is visible now or Page Visibility API
        // doesn’t supported.
        //
        // Return false if API isn’t supported, true if page is already visible
        // or listener ID (you can use it in `unbind` method) if page isn’t
        // visible now.
        //
        //   Visibility.onVisible(function () {
        //       startIntroAnimation();
        //   });
        onVisible: function (callback) {
            var support = self.isSupported();
            if ( !support || !self.hidden() ) {
                callback();
                return support;
            }

            var listener = self.change(function (e, state) {
                if ( !self.hidden() ) {
                    self.unbind(listener);
                    callback();
                }
            });
            return listener;
        },

        // Call callback when visibility will be changed. First argument for
        // callback will be original event object, second will be visibility
        // state name.
        //
        // Return listener ID to unbind listener by `unbind` method.
        //
        // If Page Visibility API doesn’t supported method will be return false
        // and callback never will be called.
        //
        //   Visibility.change(function(e, state) {
        //       Statistics.visibilityChange(state);
        //   });
        //
        // It is just proxy to `visibilitychange` event, but use vendor prefix.
        change: function (callback) {
            if ( !self.isSupported() ) {
                return false;
            }
            lastId += 1;
            var number = lastId;
            self._callbacks[number] = callback;
            self._listen();
            return number;
        },

        // Remove `change` listener by it ID.
        //
        //   var id = Visibility.change(function(e, state) {
        //       firstChangeCallback();
        //       Visibility.unbind(id);
        //   });
        unbind: function (id) {
            delete self._callbacks[id];
        },

        // Call `callback` in any state, expect “prerender”. If current state
        // is “prerender” it will wait until state will be changed.
        // If Page Visibility API doesn’t supported, it will call `callback`
        // immediately.
        //
        // Return false if API isn’t supported, true if page is already after
        // prerendering or listener ID (you can use it in `unbind` method)
        // if page is prerended now.
        //
        //   Visibility.afterPrerendering(function () {
        //       Statistics.countVisitor();
        //   });
        afterPrerendering: function (callback) {
            var support   = self.isSupported();
            var prerender = 'prerender';

            if ( !support || prerender != self.state() ) {
                callback();
                return support;
            }

            var listener = self.change(function (e, state) {
                if ( prerender != state ) {
                    self.unbind(listener);
                    callback();
                }
            });
            return listener;
        },

        // Return true if page now isn’t visible to user.
        //
        //   if ( !Visibility.hidden() ) {
        //       VideoPlayer.play();
        //   }
        //
        // It is just proxy to `document.hidden`, but use vendor prefix.
        hidden: function () {
            return !!(self._doc.hidden || self._doc.webkitHidden);
        },

        // Return visibility state: 'visible', 'hidden' or 'prerender'.
        //
        //   if ( 'prerender' == Visibility.state() ) {
        //       Statistics.pageIsPrerendering();
        //   }
        //
        // Don’t use `Visibility.state()` to detect, is page visible, because
        // visibility states can extend in next API versions.
        // Use more simpler and general `Visibility.hidden()` for this cases.
        //
        // It is just proxy to `document.visibilityState`, but use
        // vendor prefix.
        state: function () {
            return self._doc.visibilityState       ||
                   self._doc.webkitVisibilityState ||
                   'visible';
        },

        // Return true if browser support Page Visibility API.
        //
        //   if ( Visibility.isSupported() ) {
        //       Statistics.startTrackingVisibility();
        //       Visibility.change(function(e, state)) {
        //           Statistics.trackVisibility(state);
        //       });
        //   }
        isSupported: function () {
            return !!(self._doc.visibilityState ||
                      self._doc.webkitVisibilityState);
        },

        // Link to document object to change it in tests.
        _doc: document || {},

        // Callbacks from `change` method, that wait visibility changes.
        _callbacks: { },

        // Listener for `visibilitychange` event.
        _change: function(event) {
            var state = self.state();

            for ( var i in self._callbacks ) {
                self._callbacks[i].call(self._doc, event, state);
            }
        },

        // Set listener for `visibilitychange` event.
        _listen: function () {
            if ( self._init ) {
                return;
            }

            var event = 'visibilitychange';
            if ( self._doc.webkitVisibilityState ) {
                event = 'webkit' + event;
            }

            var listener = function () {
                self._change.apply(self, arguments);
            };
            if ( self._doc.addEventListener ) {
                self._doc.addEventListener(event, listener);
            } else {
                self._doc.attachEvent(event, listener);
            }
            self._init = true;
        }

    };

    if ( typeof(module) != 'undefined' && module.exports ) {
        module.exports = self;
    } else {
        global.Visibility = self;
    }

})(this);

;(function(/*window*/) {
  'use strict';
  // Date.now is polyfilled by againjs!

    // @href https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    if (!Object.keys) {
      Object.keys = (function () {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
            dontEnums = [
              'toString',
              'toLocaleString',
              'valueOf',
              'hasOwnProperty',
              'isPrototypeOf',
              'propertyIsEnumerable',
              'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function (obj) {
          if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
            throw new TypeError('Object.keys called on non-object');
          }

          var result = [], prop, i;

          for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
              result.push(prop);
            }
          }

          if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
              if (hasOwnProperty.call(obj, dontEnums[i])) {
                result.push(dontEnums[i]);
              }
            }
          }
          return result;
        };
      }());
    }

}.call(this, this));
;(function(window, undefined) {
  'use strict';

    function _window(element) {
		var doc = element.ownerDocument;
		return 'defaultView' in doc ? doc.defaultView : doc.parentWindow;
	}

    /**
    * Returns a function that invokes callback only if call to when() is true
    */
    function fireIf(when, callback) {
      return function() {
        return when() ? callback() : undefined;
      };
    }

    window.VisSenseUtils = {
        _window : _window,
        fireIf: fireIf
    };

}.call(this, this));
/**
 * depends on ['vissense.utils']
 */
 ;(function(window, VisSenseUtils, undefined) {
  'use strict';

  /*--------------------------------------------------------------------------*/

  function extend(object, source, callback) {
    var index = -1,
        props = Object.keys(source),
        length = props.length;

    while (++index < length) {
      var key = props[index];
      object[key] = callback ? callback(object[key], source[key], key, object, source) : source[key];
    }

    return object;
  }

  function noop() {
  }

  function identity(i) {
    return i;
  }

  function now() {
      return new Date().getTime();
  }

  function defer(callback) {
      return window.setTimeout(function() {
          callback();
      }, 0 /*1*/);
  }

  function isObject(obj) {
    return obj === Object(obj);
  }

  function defaults(obj, source) {
    if (!isObject(obj)) {
        return obj;
    }

    for (var prop in Object.keys(source)) {
      if (obj[prop] === void 0) {
        obj[prop] = source[prop];
      }
    }
    return obj;
  }

  VisSenseUtils = extend(VisSenseUtils, {
    noop:noop,
    identity:identity,
    isObject:isObject,
    defaults:defaults,
    extend:extend,
    now:now,
    defer:defer
  });

}.call(this, this, this.VisSenseUtils));
;(function(window, VisSenseUtils, Visibility) {
  'use strict';

    /*--------------------------------------------------------------------------*/
    var PageVisibilityAPIAvailable = !!Visibility && !!Visibility.change && !!Visibility.isSupported && Visibility.isSupported();

    function isPageVisibilityAPIAvailable() {
      return !!PageVisibilityAPIAvailable;
    }

    function isPageVisible() {
      return PageVisibilityAPIAvailable ? !Visibility.hidden() : true;
    }

    function onPageVisibilityChange(callback) {
        if(PageVisibilityAPIAvailable) {
            Visibility.change(callback);
        }
    }

    VisSenseUtils.isPageVisibilityAPIAvailable = isPageVisibilityAPIAvailable;
    VisSenseUtils.isPageVisible = isPageVisible;
    VisSenseUtils.onPageVisibilityChange = onPageVisibilityChange;

}.call(this, this, this.VisSenseUtils, this.Visibility));
/**
 * Exports following functions to VisSenseUtils
 *
 * - isVisibleByStyling
 *
 */
;(function(window, VisSenseUtils, undefined) {
  'use strict';

    function _isVisibleByOffsetParentCheck(element) {
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement.offsetParent
        if(!element.offsetParent) {
            var position = _findEffectiveStyleProperty(element, 'position');
            if(position !== 'fixed') {
                return false;
            }
        }
        return true;
    }

	function _findEffectiveStyle(element) {
		var w = VisSenseUtils._window(element);

		if (typeof element.style === 'undefined') {
			return undefined; // not a styled element
		}
		if (w.getComputedStyle) {
			// DOM-Level-2-CSS
			return w.getComputedStyle(element, null);
		}
		if (element.currentStyle) {
			// non-standard IE alternative
			return element.currentStyle;
			// TODO: this won't really work in a general sense, as
			//   currentStyle is not identical to getComputedStyle()
			//   ... but it's good enough for "visibility"
		}

		throw new Error('cannot determine effective stylesheet in this browser');
	}

	function _findEffectiveStyleProperty(element, property) {
		var effectiveStyle = _findEffectiveStyle(element);
		if(!effectiveStyle) {
		    return undefined;
		}
		var propertyValue = effectiveStyle[property];
		if (propertyValue === 'inherit' && element.parentNode.style) {
			return _findEffectiveStyleProperty(element.parentNode, property);
		}
		return propertyValue;
	}

	function _isDisplayed(element) {
		var display = _findEffectiveStyleProperty(element, 'display');
		if (display === 'none') {
			return false;
		}
		if (element.parentNode.style) {
			return _isDisplayed(element.parentNode);
		}
		return true;
	}

    function isVisibleByStyling(element) {
        if (element === VisSenseUtils._window(element).document) {
            return true;
        }

        if (!element || !element.parentNode){
            return false;
        }

        if(!_isVisibleByOffsetParentCheck(element)) {
            return false;
        }

        var displayed = _isDisplayed(element);
        if(displayed !== true) {
            return false;
        }

        var opacity = _findEffectiveStyleProperty(element, 'opacity');
        if(+opacity < 0.01) {
            return false;
        }

        var visibility = _findEffectiveStyleProperty(element, 'visibility');
        if(visibility === 'hidden' || visibility === 'collapse') {
            return false;
        }

        return true;
    }

    VisSenseUtils._isDisplayed = _isDisplayed;
    VisSenseUtils._findEffectiveStyle = _findEffectiveStyle;
    VisSenseUtils.isVisibleByStyling = isVisibleByStyling;

}.call(this, this, this.VisSenseUtils));
/**
 * Exports following functions to VisSenseUtils
 *
 * viewportHeight
 * viewportWidth
 * isFullyInViewport
 * isInViewport
 * _getBoundingClientRect
 */
;(function(window, VisSenseUtils) {
  'use strict';

	function _getBoundingClientRect(element) {
		var r = element.getBoundingClientRect();
		// height and width are not standard elements - so lets add them
		if(typeof r.height === 'undefined' || typeof r.width === 'undefined') {
			// copying object because attributes cannot be added to 'r'
			return {
				top: r.top,
				bottom: r.bottom,
				left: r.left,
				right: r.right,
				height: element.clientHeight,
				width: element.clientWidth
			};
		}
		return r;
	}

    function viewport(element) {
		var w = VisSenseUtils._window(element);
		return {
		    height: w.innerHeight || w.document.documentElement.clientHeight,
		    width: w.innerWidth || w.document.documentElement.clientWidth
		};
	}

	function isFullyInViewport(element) {
		var r = _getBoundingClientRect(element);
		if(r && (r.width <= 0 || r.height <= 0)) {
			return false;
		}
		var view = viewport(element);

		return (!!r &&
			r.top >= 0 &&
			r.left >= 0 &&
			r.bottom < view.height &&
			r.right < view.width
		);
	}

	function isInViewport(element) {
		var r = _getBoundingClientRect(element);
		if(r && (r.width <= 0 || r.height <= 0)) {
			return false;
		}
		var view = viewport(element);
		return ( !!r &&
			r.bottom > 0 &&
			r.right > 0 &&
			r.top < view.height &&
			r.left < view.width
		);
	}

    VisSenseUtils.viewport = viewport;
    VisSenseUtils.isFullyInViewport = isFullyInViewport;
    VisSenseUtils.isInViewport = isInViewport;
    VisSenseUtils._getBoundingClientRect = _getBoundingClientRect;

}.call(this, this, this.VisSenseUtils));
/*
 *
 * - percentage
 * - isVisible
 * - isFullyVisible
 * - isHidden
 */
;(function(window, Math, VisSenseUtils, undefined) {
  'use strict';

	function percentage(element) {
		if(!VisSenseUtils.isInViewport(element) || !VisSenseUtils.isVisibleByStyling(element) || !VisSenseUtils.isPageVisible()) {
			return 0;
		}

		var r = VisSenseUtils._getBoundingClientRect(element);
		if(!r || r.height <= 0 || r.width <= 0) {
			return 0;
		}

		var vh = 0; // visible height
		var vw = 0; // visible width
		var viewport = VisSenseUtils.viewport(element);

		if(r.top >= 0) {
			vh = Math.min(r.height, viewport.height - r.top);
		} else if(r.top < 0 && r.bottom > 0) {
			vh = Math.min(viewport.height, r.bottom);
		}

		if(r.left >= 0) {
			vw = Math.min(r.width, viewport.width - r.left);
		} else if(r.left < 0 && r.right > 0) {
			vw = Math.min(viewport.width, r.right);
		}

		var area = (vh * vw) / (r.height * r.width);

		return Math.max(area, 0);
	}

	function isFullyVisible(element) {
		return VisSenseUtils.isPageVisible() &&
		VisSenseUtils.isFullyInViewport(element) &&
		VisSenseUtils.isVisibleByStyling(element);
	}

    function isVisible(element) {
        return VisSenseUtils.isPageVisible() &&
        VisSenseUtils.isInViewport(element) &&
        VisSenseUtils.isVisibleByStyling(element);
    }

    function isHidden(element) {
        return !isVisible(element);
    }

    VisSenseUtils.percentage = percentage;
    VisSenseUtils.isFullyVisible = isFullyVisible;
    VisSenseUtils.isVisible = isVisible;
    VisSenseUtils.isHidden = isHidden;

}.call(this, this, this.Math, this.VisSenseUtils));
;(function(window, VisSenseUtils, undefined) {
  'use strict';

    /**
     * An object used to flag environments features.
     */
    var support = (function(window, document) {
        /**
        * Detect IE version
        */
        function getIEVersion() {
          var v = 4, div = document.createElement('div');
          while (
            div.innerHTML = '<!--[if gt IE '+v+']><i></i><![endif]-->',
            div.getElementsByTagName('i')[0]
          ){
            v++;
          }
          return v > 4 ? v : undefined;
        }

        /**
         * Detect IE
         
        function isIE() {
          return !!getIEVersion();
        }*/

        /**
         * Detect if the DOM is supported.
         */
        function isDomPresent() {
          try {
           return document.createDocumentFragment().nodeType === 11;
          } catch(e) {}
          return false;
        }

        function canReadStyle() {
          try {
           return !!VisSenseUtils._findEffectiveStyle(document.getElementsByTagName('body')[0]);
          } catch(e) {}
          return false;
        }

        var support = {};
        support.MinIEVersion = 7;
        support.PageVisibilityAPIAvailable = VisSenseUtils.isPageVisibilityAPIAvailable();
        support.IEVersion = getIEVersion();
        support.DOMPresent = isDomPresent();
        support.CanReadStyle = canReadStyle();
        support.BrowserSupported = support.IEVersion >= support.MinIEVersion;

        support.compatible = support.DOMPresent && support.CanReadStyle && support.BrowserSupported;

        return support;
    }(window, window.document));

    VisSenseUtils.support = function() {
        return support;
    };

}.call(this, this, this.VisSenseUtils));
;(function(window, Math, VisSenseUtils, undefined) {
  'use strict';

    /**
     * Creates a `VisSense` object which wraps the given element to enable
     * visibility operations
     *
     * @example
     *
     * var visElement = VisSense(element);
     *
     * visElement.isVisible();
     * // => true
     *
     * visElement.percentage();
     * // => 0.93
     *
     */
    function VisSense(element, config) {
        if (!(this instanceof VisSense)) {
            return new VisSense(element, config);
        }

        // currently only ELEMENT_NODEs are supported
        // see https://developer.mozilla.org/en-US/docs/Web/API/Node.nodeType
        if ( !element || 1 !== element.nodeType ) {
            throw new Error('InvalidArgument: not an element node');
        }

        this._element = element;
        this._config = config || {};
    }

    VisSense.prototype.percentage = function() {
      return VisSenseUtils.percentage(this._element);
    };

    VisSense.prototype.isFullyVisible = function() {
      return VisSenseUtils.isFullyVisible(this._element);
    };

    VisSense.prototype.isVisible = function() {
      return VisSenseUtils.isVisible(this._element);
    };

    VisSense.prototype.isHidden = function() {
      return VisSenseUtils.isHidden(this._element);
    };

    /*--------------------------------------------------------------------------*/

    /**
    * Returns a function that invokes callback only if element is hidden
    */
    VisSense.prototype.fireIfFullyVisible = function(callback) {
        var me = this;
        return VisSenseUtils.fireIf(function() {
            return me.isFullyVisible();
        }, callback);
    };

    /**
    * Returns a function that invokes callback only if element is hidden
    */
    VisSense.prototype.fireIfVisible = function(callback) {
        var me = this;
        return VisSenseUtils.fireIf(function() {
            return me.isVisible();
        }, callback);
    };

    /**
    * Returns a function that invokes callback only if element is hidden
    */
    VisSense.prototype.fireIfHidden = function (callback) {
        var me = this;
        return VisSenseUtils.fireIf(function() {
            return me.isHidden();
        }, callback);
    };

    /*--------------------------------------------------------------------------*/

    VisSense.prototype.getFullyVisibleThreshold = VisSenseUtils.noop;

  /*--------------------------------------------------------------------------*/

  VisSense.fn = VisSense.prototype;

  // export VisSense
  window.VisSense = VisSense;

}.call(this, this, this.Math, this.VisSenseUtils));
/**
 * detects visibility changes of an element.
 *
 * example:
 * var elem = document.getElementById('myElement');
 * var visobj = VisSense(eleme):
 * var vismon = visobj.monitor();
 *
 * vismon.onVisibilityChange(function() { ... });
 * vismon.onPercentageChange(function() { ... });
 * vismon.onVisible(function() { ... });
 * vismon.onFullyVisible(function() { ... });
 * vismon.onHidden(function() { ... });
 *
 *
 * hasVisibilityChanged() // => true
 * hasPercentageChanged // => true
 *
 * fireIfVisibilityChanged(function() { ... });
 * fireIfPercentageChanged(function() { ... });
 *
 */
;(function(window, VisSense, VisSenseUtils, undefined) {
  'use strict';

    var STATES = {
        HIDDEN: 0,
        VISIBLE: 1,
        FULLY_VISIBLE: 2
    };

    function VisState(state, percentage, prev) {
        this._$$state = state;
        this._$$percentage = percentage;
        this._$$prev = prev;
    }

    VisState.prototype.isVisible = function() {
        return this._$$state ===  STATES.VISIBLE || this.isFullyVisible();
    };

    VisState.prototype.isFullyVisible = function() {
        return this._$$state ===  STATES.FULLY_VISIBLE;
    };

    VisState.prototype.isHidden = function() {
        return this._$$state ===  STATES.HIDDEN;
    };

    VisState.prototype.state = function() {
        return this._$$state;
    };

    VisState.prototype.wasVisible = function() {
        return !!this._$$prev && this._$$prev.isVisible();
    };

    VisState.prototype.wasFullyVisible = function() {
        return !!this._$$prev && this._$$prev.isFullyVisible();
    };

    VisState.prototype.wasHidden = function() {
        return !!this._$$prev && this._$$prev.isHidden();
    };

    VisState.prototype.hasVisibilityChanged = function() {
        return !this._$$prev || this._$$state !== this._$$prev._$$state;
    };

    VisState.prototype.prev = function() {
        return this._$$prev;
    };

    VisState.prototype.hasPercentageChanged = function() {
        return !this._$$prev || this._$$percentage !== this._$$prev._$$percentage;
    };

    VisState.prototype.percentage = function() {
        return this._$$percentage;
    };

    function state(status, percentage, prev) {
        if(!!prev) {
            // disable getting previous state from prev
            prev.prev = VisSenseUtils.noop;
        }

        return new VisState(status, percentage, prev);
    }

    // export
    VisSenseUtils.VisState = {
        hidden: function(percentage, prev) {
            return state(STATES.HIDDEN, percentage, prev || null);
        },
        visible:function(percentage, prev) {
            return state(STATES.VISIBLE, percentage, prev || null);
        },
        fullyvisible: function(percentage, prev) {
            return state(STATES.FULLY_VISIBLE, percentage, prev || null);
        }
    };

}.call(this, this, this.VisSense, this.VisSenseUtils));
/**
 * detects visibility changes of an element.
 *
 * example:
 * var elem = document.getElementById('myElement');
 * var visobj = VisSense(eleme):
 * var vismon = visobj.monitor();
 *
 * vismon.onVisibilityChange(function() { ... });
 * vismon.onPercentageChange(function() { ... });
 * vismon.onVisible(function() { ... });
 * vismon.onFullyVisible(function() { ... });
 * vismon.onHidden(function() { ... });
 *
 *
 * hasVisibilityChanged() // => true
 * hasVisibilityPercentageChanged // => true
 *
 * fireIfVisibilityChanged(function() { ... });
 * fireIfPercentageChanged(function() { ... });
 *
 */
;(function(window, VisSense, VisSenseUtils, undefined) {
  'use strict';

    function nextState(visobj, previousState) {
        var percentage = visobj.percentage();

        // check if nothing changed
        if(!!previousState && percentage === previousState.percentage()) {
          if(!previousState.hasPercentageChanged()) {
            return previousState;
          }
        }

        if(visobj.isHidden()) {
            return VisSenseUtils.VisState.hidden(percentage, previousState);
        }
        else if (visobj.isFullyVisible()) {
             return VisSenseUtils.VisState.fullyvisible(percentage, previousState);
        }
        else if (visobj.isVisible()) {
          return VisSenseUtils.VisState.visible(percentage, previousState);
        }

        throw new Error('IllegalState');
    }

    /*--------------------------------------------------------------------------*/

    function fireListeners(listeners, context) {
        for(var i in listeners) {
            if(listeners.hasOwnProperty(i)) {
                listeners[i].call(context || window);
            }
        }
    }
    /*--------------------------------------------------------------------------*/

    function VisMon(visobj) {
        var me = this;

        me._$$visobj = visobj;
        me._$$lastListenerId = -1;
        me._$$status = null;
        me._$$listeners = {};
    }

    // "read-only" access to VisSense instance
    VisMon.prototype.visobj = function() {
        return this._$$visobj;
    };

    /**
    * "read-only" access to status
    */
    VisMon.prototype.status = function() {
        return this._$$status;
    };

    VisMon.prototype.percentage = function() {
        return this._$$status.percentage();
    };
    /**
    * read-only access to status
    */
    VisMon.prototype.prev = function() {
        return this._$$status.prev();
    };

    // Adds a listener that will be called on update().
    //
    // var id = visobj.monitor()._bind(function() {
    //   doSomething();
    // });
    VisMon.prototype._bind = function(callback) {
        this._$$lastListenerId += 1;
        this._$$listeners[this._$$lastListenerId] = callback;
        return this._$$lastListenerId;
    };

    VisMon.prototype.off = function(listenerId) {
        delete this._$$listeners[listenerId];
        return true;
    };

    /**
    * expose update method
    */
    VisMon.prototype.update = function() {
        // update status
        this._$$status = nextState(this._$$visobj, this._$$status);
        // notify listeners
        fireListeners(this._$$listeners, this);
    };

    /**
    * Returns a function that invokes callback only
    * if the visibility state changes.
    *
    * shorthand for
    * if(visobj.hasVisibilityChanged()) {
    *   callback();
    * }
    * visobj.fireIfVisibilityChanged(callback)
    */
    VisMon.prototype.fireIfVisibilityChanged = function(callback) {
        var me = this;

        return VisSenseUtils.fireIf(function() {
            return me.status().hasVisibilityChanged();
        }, callback);
    };

    /**
    * Returns a function that invokes callback only
    * if visibility rate changes.
    * This does not occur when element is hidden but may
    * be called multiple times if element is in state
    * `VISIBLE` and (depending on the config) `FULLY_VISIBLE`
    */
    VisMon.prototype.fireIfPercentageChanged = function(callback) {
        var me = this;

        return VisSenseUtils.fireIf(function() {
            return me.status().hasPercentageChanged();
        }, callback);
    };

    /**
    * Fires when visibility state changes
    */
    VisMon.prototype.onVisibilityChange = function (callback) {
        return this._bind(this.fireIfVisibilityChanged(callback));
    };

    /**
    * Fires when visibility percentage changes
    */
    VisMon.prototype.onPercentageChange = function (callback) {
        var me = this;
        return this._bind(this.fireIfPercentageChanged(function() {
            var prev = me.status().prev();
            callback(me.percentage(), prev && prev.percentage());
        }));
    };

    /**
    * Fires when visibility changes and and state transits from:
    * HIDDEN => VISIBLE
    * HIDDEN => FULLY_VISIBLE
    * Fires NOT when state transits from:
    * VISIBLE => FULLY_VISIBLE or
    * FULLY_VISIBLE => VISIBLE
    *
    * VisSense(document.getElementById('example1')).monitor().onVisible(function() {
    *   Animations.startAnimation();
    * });
    */
    VisMon.prototype.onVisible = function (callback) {
        var me = this;

        var fireIfVisible =  VisSenseUtils.fireIf(function() {
            return me.status().isVisible();
        }, callback);

        // only fire when coming from state hidden or no previous state is present
        var handler = me.fireIfVisibilityChanged(VisSenseUtils.fireIf(function() {
            return !me.status().prev() || me.status().wasHidden();
        }, fireIfVisible));
        return me._bind(handler);
    };

    /**
    * Fires when visibility changes and element becomes fully visible
    */
    VisMon.prototype.onFullyVisible = function (callback) {
        var me = this;

        var fireIfFullyVisible =  VisSenseUtils.fireIf(function() {
            return me.status().isFullyVisible();
        }, callback);

        var handler = me.fireIfVisibilityChanged(fireIfFullyVisible);
        return me._bind(handler);
    };

    /**
    * Fires when visibility changes and element becomes hidden
    */
    VisMon.prototype.onHidden = function (callback) {
        var me = this;

        var fireIfHidden =  VisSenseUtils.fireIf(function() {
            return me.status().isHidden();
        }, callback);

        var handler = me.fireIfVisibilityChanged(fireIfHidden);
        return me._bind(handler);
    };

    VisMon.prototype.on = function(eventName, handler) {
        var emitEvents = {
            'hidden' : this.onHidden,
            'visible' : this.onVisible,
            'fullyvisible' : this.onFullyVisible,
            'percentagechange' : this.onPercentageChange,
            'visibilitychange' : this.onVisibilityChange
        };

        if(!emitEvents[eventName]) {
            throw new Error('VisMon: Event "'+ eventName +'" is not supported');
        }

        return emitEvents[eventName](handler);
    };

    VisSense.fn.monitor = function(incomingConfig) {
        var config = incomingConfig || {};

        if(!!config.detached) {
            return new VisMon(this, config);
        }

        if(this._$$monitor) {
            return this._$$monitor;
        }

        this._$$monitor = new VisMon(this, config);

        return this._$$monitor;
    };

}.call(this, this, this.VisSense, this.VisSenseUtils));
!function(window){"use strict";function cancel(timer){clearInterval(timer.id),clearTimeout(timer.delay),delete timer.id,delete timer.delay}function run(timer,interval,state,runNow){var runner=function(){timer.last[state]=Date.now(),timer.callback()};if(timer.last=timer.last||{},runNow){var now=Date.now(),last=now-timer.last[state];interval>last?timer.delay=setTimeout(function(){runner(),timer.id=setInterval(runner,interval)},interval-last):(setTimeout(function(){runner()},0),timer.id=setInterval(runner,interval))}else timer.id=setInterval(runner,interval)}function Again(config){return this instanceof Again?(this._$$initialized=!1,this._$$state=null,this._$$lastTimerId=-1,this._$$timers={},this._$$config=config||{},void(this._$$config.reinitializeOn=this._$$config.reinitializeOn||{})):new Again(config)}var version="0.0.11";Date.now||(Date.now=function(){return(new Date).getTime()}),Again.prototype.state=function(){return this._$$state},Again.prototype.update=function(state){this._$$state=state,this._cancelAndReinitialize()},Again.prototype.every=function(callback,stateIntervals,runNow){this._$$lastTimerId+=1;var id=this._$$lastTimerId,intervals=stateIntervals;return parseFloat(stateIntervals)===stateIntervals&&(intervals={"*":parseFloat(stateIntervals)}),this._$$timers[id]={callback:callback,intervals:intervals},this._run(id,!!runNow),id},Again.prototype.stop=function(id){return this._$$timers[id]?(cancel(this._$$timers[id]),delete this._$$timers[id],!0):!1},Again.prototype.stopAll=function(){for(var id in this._$$timers)this._$$timers.hasOwnProperty(id)&&cancel(this._$$timers[id]);this._$$timers={}},Again.prototype._run=function(id,runNow){var timer=this._$$timers[id],interval=+timer.intervals[this._$$state]||+timer.intervals["*"];interval>0&&run(timer,interval,this._$$state,!!runNow)},Again.prototype._cancelAndReinitialize=function(){var runNow=!!this._$$config.reinitializeOn[this._$$state];for(var id in this._$$timers)this._$$timers.hasOwnProperty(id)&&(cancel(this._$$timers[id]),this._run(id,runNow))},window.Again=Again,window.Again.version=version,window.Again.create=window.Again}(window);
/*
 * depends on ['againjs', 'vissense.core', 'vissense.monitor']
 */
;(function(window, Again, VisSense, VisSenseUtils, undefined) {
    'use strict';

    function VisTimer(vismon, config) {
        var me = this;

        me._$$vismon = vismon;
        me._config = config || {};

        me._config.reinitializeImmediatelyOnHidden = true;
        me._config.checkIntervalVisible = 100;
        me._config.checkIntervalHidden = 100;

        me._$$again = Again.create({
            reinitializeOn: {
                'hidden': false,
                'visible': true
            }
        });

        me.start(me._config.checkIntervalVisible, me._config.checkIntervalHidden);
    }

    VisTimer.prototype.start = function(checkIntervalVisible, checkIntervalHidden) {
        if(!!this._$$started) {
            return false;
        }

        (function init(me) {
            me._config.checkIntervalVisible = checkIntervalVisible || me._config.checkIntervalVisible;
            me._config.checkIntervalHidden = checkIntervalHidden || me._config.checkIntervalHidden;

            var triggerVisMonUpdate = function() {
                me._$$vismon.update();
            };

            var triggerSelfUpdate = function() {
                var hasPrev = !!me._$$vismon.status().prev();
                var isHidden = me._$$vismon.status().isHidden();
                var wasHidden = me._$$vismon.status().wasHidden();

                if (isHidden !== wasHidden || !hasPrev) {
                    me._$$again.update(!!isHidden ? 'hidden' : 'visible');
                }
            };

            me._$$vismon.onHidden(triggerSelfUpdate);
            me._$$vismon.onVisible(triggerSelfUpdate);

            // react on tab changes
            VisSenseUtils.onPageVisibilityChange(triggerVisMonUpdate);

            triggerVisMonUpdate();

            VisSenseUtils.defer(function() {
                triggerSelfUpdate();
                // reschedule update immediately
                VisSenseUtils.defer(triggerVisMonUpdate);
            });

            // check for other changes periodically. this is needed for example
            // if an accordion expands on the page or dynamic content has been added
            me.every(me._config.checkIntervalVisible, me._config.checkIntervalHidden, triggerVisMonUpdate, true);
        }(this));

        return true;
    };

    VisTimer.prototype.vismon = function() {
        return this._$$vismon;
    };

    /*
    * Run callback every `interval` milliseconds if element is visible and
    * every `hiddenInterval` milliseconds if element is hidden.
    */
    VisTimer.prototype.every = function (interval, hiddenInterval, callback, runNow) {
        if (!callback) {
            callback = hiddenInterval;
            hiddenInterval = 0;
        }
        var me = this;
        return this._$$again.every(function() {
            callback(me._$$vismon);
        }, {
            'visible': interval,
            'hidden': hiddenInterval
        }, runNow);
    };

    VisTimer.prototype.stop = function(id) {
        return this._$$again.stop(id);
    };

    /**
    *
    * As this also stops the interval updating the state
    * the object is unusable after this call.
    */
    VisTimer.prototype.destroy = function() {
        return this._$$again.stopAll();
    };

    VisSense.fn.timer = function(incomingConfig) {
        var config = incomingConfig || {};

        if(!!config.detached) {
            return new VisTimer(this.monitor({ detached : true }), config);
        }

        if(this._$$timer) {
            return this._$$timer;
        }

        this._$$timer = new VisTimer(this.monitor(), config);

        return this._$$timer;
    };

}(this, this.Again, this.VisSense, this.VisSenseUtils));