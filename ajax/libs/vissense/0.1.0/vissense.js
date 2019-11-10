/*! { "name": "vissense", "version": "0.1.0", "copyright": "(c) 2014 tbk" } */
;(function(window, Math, Visibility, undefined) {
'use strict';
function _window(element) {
    var doc = element && element.ownerDocument;
    return doc ? doc.defaultView || doc.parentWindow : window;
}

/**
* Returns a function that invokes callback only if call to when() is true
*/
function fireIf(when, callback) {
    return function() {
        return (isFunction(when) ? when() : when) ? callback() : undefined;
    };
}

function extend(dest, source, callback) {
    var index = -1,
        props = Object.keys(source),
        length = props.length;

    while (++index < length) {
        var key = props[index];
        dest[key] = callback ? callback(dest[key], source[key], key, dest, source) : source[key];
    }

    return dest;
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
function isFunction(func) {
    return typeof func === 'function';
}

function defaults(dest, source) {
    if (!isObject(dest)) {
        return source;
    }
    var keys = Object.keys(source);
    for (var i = 0, n = keys.length; i < n; i++) {
        var prop = keys[i];
        if (dest[prop] === void 0) {
            dest[prop] = source[prop];
        }
    }
    return dest;
}

function debounce(fn, delay) {
    var timer = null;
    return function () {
        var self = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(self, args);
        }, delay);
    };
}
/********************************************************** element-position */

function _getBoundingClientRect(element) {
    var r = element.getBoundingClientRect();
    // height and width are not standard elements - so lets add them
    if(r.height === undefined || r.width === undefined) {
        // copying object because attributes cannot be added to 'r'
        return extend({
            height: element.clientHeight,
            width: element.clientWidth
        }, r);
    }
    return r;
}

/**
* return the viewport (does *not* subtract scrollbar size)
*/
function _viewport(element) {
    var w = element ?   _window(element) : window;
    if(w.innerWidth === undefined) {
        return {
            height: w.document.documentElement.clientHeight,
            width: w.document.documentElement.clientWidth
        };
    }
    return {
        height: w.innerHeight,
        width: w.innerWidth
    };
}


/********************************************************** element-position end */

/********************************************************** element-styling */

/**
* element.offsetParent
*
* Firefox: null if element is hidden (style.display := "none")
* Webkit: null if the element is hidden
* or if the style.position of the element itself is set to "fixed".
* Internet Explorer (9): null if the style.position of the element itself is set to "fixed".
* (Having style.display := "none" does not affect this browser.)
*
* more info: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement.offsetParent
*/
function _isVisibleByOffsetParentCheck(element) {
    if(!element.offsetParent) {
        var position = _findEffectiveStyleProperty(element, 'position');
        if(position !== 'fixed') {
            return false;
        }
    }
    return true;
}

function _findEffectiveStyleProperty(element, property, computedStyleProvider) {
    if (element.style === undefined) {
        return; // not a styled element, e.g. document
    }
    var w =  computedStyleProvider || _window(element);
    var effectiveStyle =  w.getComputedStyle(element, null);
    return effectiveStyle && effectiveStyle.getPropertyValue(property);
}

function _isDisplayed(element) {
    var display = _findEffectiveStyleProperty(element, 'display', _window(element));
    if (display === 'none') {
        return false;
    }

    var visibility = _findEffectiveStyleProperty(element, 'visibility', _window(element));
    if (visibility === 'hidden' || visibility === 'collapse') {
        return false;
    }

    if (element.parentNode && element.parentNode.style) {
        return _isDisplayed(element.parentNode);
    }

    return true;
}

function isVisibleByStyling(element) {
    if (element ===  _window(element).document) {
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

    return true;
}
/********************************************************** element-styling end */

/********************************************************** element visibility */

function _isInViewport(rect, viewport) {
    if(!rect || (rect.width <= 0 || rect.height <= 0)) {
        return false;
    }
    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.top < viewport.height &&
        rect.left < viewport.width;
}

function percentage(element) {
    if(!isPageVisible()) {
        return 0;
    }

    var rect = _getBoundingClientRect(element);
    var view = _viewport(element);

    if(!_isInViewport(rect, view) || !isVisibleByStyling(element)) {
       return 0;
    }

    var vh = 0; // visible height
    var vw = 0; // visible width

    if(rect.top >= 0) {
        vh = Math.min(rect.height, view.height - rect.top);
    } else if(rect.bottom > 0) {
        vh = Math.min(view.height, rect.bottom);
    } /* otherwise {
        this path cannot be taken otherwise element would not be in viewport
    } */

    if(rect.left >= 0) {
        vw = Math.min(rect.width, view.width - rect.left);
    } else if(rect.right > 0) {
        vw = Math.min(view.width, rect.right);
    } /* otherwise {
         this path cannot be taken otherwise element would not be in viewport
    } */

    // rect's height and width are greater than 0 because element is in viewport
    return (vh * vw) / (rect.height * rect.width);
}

/********************************************************** element visibility end */

/********************************************************** page visibility - hard dependency to Visibilityjs*/
var PageVisibilityAPIAvailable = Visibility && Visibility.change && Visibility.isSupported && Visibility.isSupported();

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
/********************************************************** page visibility end */

window.VisSenseUtils = extend({}, {

    fireIf: fireIf,

    noop:noop,
    identity:identity,
    isObject:isObject,
    isFunction:isFunction,
    defaults:defaults,
    extend:extend,
    now:now,
    defer:defer,
    debounce:debounce,

    isPageVisibilityAPIAvailable : isPageVisibilityAPIAvailable,
    isPageVisible : isPageVisible,
    onPageVisibilityChange : onPageVisibilityChange,

    percentage : percentage,
    isVisibleByStyling : isVisibleByStyling,

    _window : _window,

    _viewport : _viewport,
    _isInViewport : _isInViewport,

    _getBoundingClientRect : _getBoundingClientRect,
    _isDisplayed : _isDisplayed,
    _findEffectiveStyleProperty:_findEffectiveStyleProperty

});
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

    if ( !element || 1 !== element.nodeType ) {
        throw new Error('not an element node');
    }

    this._element = element;
    this._config = defaults(config, {
        fullyvisible : 1,
        hidden: 0
    });
}

VisSense.prototype.percentage = function() {
  return percentage(this._element);
};

VisSense.prototype.isFullyVisible = function() {
  return percentage(this._element) >= this._config.fullyvisible;
};

VisSense.prototype.isVisible = function() {
  return !this.isHidden();
};

VisSense.prototype.isHidden = function() {
  return percentage(this._element) <= this._config.hidden;
};

/*--------------------------------------------------------------------------*/

/**
* Returns a function that invokes callback only if element is hidden
*/
VisSense.prototype.fireIfFullyVisible = function(callback) {
    var me = this;
    return fireIf(function() {
        return me.isFullyVisible();
    }, callback);
};

/**
* Returns a function that invokes callback only if element is hidden
*/
VisSense.prototype.fireIfVisible = function(callback) {
    var me = this;
    return fireIf(function() {
        return me.isVisible();
    }, callback);
};

/**
* Returns a function that invokes callback only if element is hidden
*/
VisSense.prototype.fireIfHidden = function (callback) {
    var me = this;
    return fireIf(function() {
        return me.isHidden();
    }, callback);
};

VisSense.fn = VisSense.prototype;
VisSense.version = '0.1.0';
VisSense.of = function(element, config) {
    return new VisSense(element, config);
};

// export VisSense
window.VisSense = VisSense;

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
function nextState(visobj, previousState) {
    var percentage = visobj.percentage();

    // check if nothing changed
    if(!!previousState && percentage === previousState.percentage()) {
      if(!previousState.hasPercentageChanged()) {
        return previousState;
      }
    }

    if(visobj.isHidden()) {
        return VisSense.VisState.hidden(percentage, previousState);
    }
    else if (visobj.isFullyVisible()) {
         return VisSense.VisState.fullyvisible(percentage, previousState);
    }

    // else element is visible
    return VisSense.VisState.visible(percentage, previousState);
}

/*--------------------------------------------------------------------------*/

function fireListeners(listeners, context) {
    var keys = Object.keys(listeners);
    for (var i = 0, n = keys.length; i < n; i++) {
        listeners[i].call(context || window);
    }
}
/*--------------------------------------------------------------------------*/

function VisMon(visobj, inConfig) {
    var me = this;
    var config = defaults(inConfig, {
        strategy: new VisMon.Strategy.NoopStrategy()
    });

    me._visobj = visobj;
    me._lastListenerId = -1;
    me._status = null;
    me._listeners = {};
    me._strategy = config.strategy;

    me._events = ['update', 'hidden', 'visible', 'fullyvisible', 'percentagechange', 'visibilitychange'];
    for (var i = 0, n = me._events.length; i < n; i++) {
        if (config[me._events[i]]) {
            me.on(me._events[i], config[me._events[i]]);
        }
    }
}

// "read-only" access to VisSense instance
VisMon.prototype.visobj = function() {
    return this._visobj;
};

/**
* "read-only" access to status
*/
VisMon.prototype.status = function() {
    return this._status;
};

VisMon.prototype.start = function() {
    this._strategy.start(this);
    return this;
};

VisMon.prototype.stop = function() {
    return this._strategy.stop(this);
};

VisMon.prototype.use = function(strategy) {
    this._strategy.stop();
    this._strategy = strategy;
    this._strategy.start(this);
};

// Adds a listener that will be called on update().
//
// var id = visobj.monitor().onUpdate(function() {
//   doSomething();
// });
VisMon.prototype.onUpdate = function(callback) {
    this._lastListenerId += 1;
    this._listeners[this._lastListenerId] = callback;
    return this._lastListenerId;
};

/**
* update state and notify listeners
*/
VisMon.prototype.update = function() {
    // update status
    this._status = nextState(this._visobj, this._status);
    // notify listeners
    fireListeners(this._listeners, this);


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

    return fireIf(function() {
        return me._status.hasVisibilityChanged();
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

    return fireIf(function() {
        return me._status.hasPercentageChanged();
    }, callback);
};

/**
* Fires when visibility state changes
*/
VisMon.prototype.onVisibilityChange = function (callback) {
    return this.onUpdate(this.fireIfVisibilityChanged(callback));
};

/**
* Fires when visibility percentage changes
*/
VisMon.prototype.onPercentageChange = function (callback) {
    var me = this;
    return this.onUpdate(this.fireIfPercentageChanged(function() {
        var status = me.status();
        var prev = status.prev();
        // call with '(newValue, oldValue, context)'
        callback(status.percentage(), prev && prev.percentage(), me);
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

    var fireIfVisible =  fireIf(function() {
        return me._status.isVisible();
    }, callback);

    // only fire when coming from state hidden or no previous state is present
    var handler = me.fireIfVisibilityChanged(fireIf(function() {
        return !me._status.prev() || me._status.wasHidden();
    }, fireIfVisible));
    return me.onUpdate(handler);
};

/**
* Fires when visibility changes and element becomes fully visible
*/
VisMon.prototype.onFullyVisible = function (callback) {
    var me = this;

    var fireIfFullyVisible =  fireIf(function() {
        return me._status.isFullyVisible();
    }, callback);

    var handler = me.fireIfVisibilityChanged(fireIfFullyVisible);
    return me.onUpdate(handler);
};

/**
* Fires when visibility changes and element becomes hidden
*/
VisMon.prototype.onHidden = function (callback) {
    var me = this;

    var fireIfHidden =  fireIf(function() {
        return me._status.isHidden();
    }, callback);

    var handler = me.fireIfVisibilityChanged(fireIfHidden);
    return me.onUpdate(handler);
};

VisMon.prototype.on = function(eventName, handler) {
    var me = this;
    switch(eventName) {
        case 'update': return me.onUpdate(handler);
        case 'hidden': return me.onHidden(handler);
        case 'visible': return me.onVisible(handler);
        case 'fullyvisible': return me.onFullyVisible(handler);
        case 'percentagechange': return me.onPercentageChange(handler);
        case 'visibilitychange': return me.onVisibilityChange(handler);
    }

    return -1;
};

VisSense.VisMon = VisMon;

VisSense.fn.monitor = function(config) {
    return new VisMon(this, config);
};

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
var STATES = {
    HIDDEN: 0,
    VISIBLE: 1,
    FULLY_VISIBLE: 2
};

function VisState(state, percentage, prev) {
    this._state = state;
    this._percentage = percentage;
    this._prev = prev;
}

VisState.prototype.isVisible = function() {
    return this._state ===  STATES.VISIBLE || this.isFullyVisible();
};

VisState.prototype.isFullyVisible = function() {
    return this._state ===  STATES.FULLY_VISIBLE;
};

VisState.prototype.isHidden = function() {
    return this._state ===  STATES.HIDDEN;
};

VisState.prototype.state = function() {
    return this._state;
};

VisState.prototype.wasVisible = function() {
    return !!this._prev && this._prev.isVisible();
};

VisState.prototype.wasFullyVisible = function() {
    return !!this._prev && this._prev.isFullyVisible();
};

VisState.prototype.wasHidden = function() {
    return !!this._prev && this._prev.isHidden();
};

VisState.prototype.hasVisibilityChanged = function() {
    return !this._prev || this._state !== this._prev._state;
};

VisState.prototype.prev = function() {
    return this._prev;
};

VisState.prototype.hasPercentageChanged = function() {
    return !this._prev || this._percentage !== this._prev._percentage;
};

VisState.prototype.percentage = function() {
    return this._percentage;
};

function state(status, percentage, prev) {
    if(!!prev) {
        delete prev._prev;
        prev.prev = noop;
    }

    return new VisState(status, percentage, prev);
}

// export
VisSense.VisState = {
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
VisMon.Strategy = function() {};
VisMon.Strategy.prototype.start = function() {
    throw new Error('Strategy#start needs to be overridden.');
};
VisMon.Strategy.prototype.stop = function() {
    throw new Error('Strategy#stop needs to be overridden.');
};

VisMon.Strategy.NoopStrategy = function() {};
VisMon.Strategy.NoopStrategy.prototype = Object.create(VisMon.Strategy.prototype);
VisMon.Strategy.NoopStrategy.prototype.start = function(monitor) {
    monitor.update();
};
VisMon.Strategy.NoopStrategy.prototype.stop = function() {};

VisMon.Strategy.PollingStrategy = function(config) {
    this._config = defaults(config, {
        interval: 1000
    });
    this._started = false;
};
VisMon.Strategy.PollingStrategy.prototype = Object.create(VisMon.Strategy.prototype);
VisMon.Strategy.PollingStrategy.prototype.start = function(monitor) {
    var me = this;

    fireIf(!me._started, function() {
        me.stop();

        me._update = function() {
            monitor.update();
        };

        addEventListener('visibilitychange', me._update);

        (function update() {
            monitor.update();
            me._timer = setTimeout(update, me._config.interval);
        }());

        me._started = true;
    })();

    return me._started;
};
VisMon.Strategy.PollingStrategy.prototype.stop = function() {
    var me = this;
    if(!me._started) {
        return false;
    }
    clearTimeout(me._timer);
    removeEventListener('visibilitychange', me._update);

    me._started = false;

    return true;
};

VisMon.Strategy.EventStrategy = function(config) {
    this._config = defaults(config, {
        debounce: 30
    });
    this._started = false;
};
VisMon.Strategy.EventStrategy.prototype = Object.create(VisMon.Strategy.prototype);
VisMon.Strategy.EventStrategy.prototype.start = function(monitor) {
    var me = this;
    fireIf(!me._started, function() {
        me.stop();

        me._update = debounce(function() {
            monitor.update();
        }, me._config.debounce);

        addEventListener('visibilitychange', me._update);
        addEventListener('scroll', me._update);
        addEventListener('resize', me._update);

        me._update();

        me._started = true;
    })();

    return this._started;
};

VisMon.Strategy.EventStrategy.prototype.stop = function() {
    var me = this;
    if(!me._started) {
        return false;
    }
    removeEventListener('resize', me._update);
    removeEventListener('scroll', me._update);
    removeEventListener('visibilitychange', me._update);

    me._started = false;

    return true;
};
})(window, Math, window.Visibility || null, undefined);