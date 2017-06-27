(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.quixote = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("./util/ensure.js");
var oop = require("./util/oop.js");
var shim = require("./util/shim.js");

var Me = module.exports = function Assertable() {
	ensure.unreachable("Assertable is abstract and should not be constructed directly.");
};
Me.extend = oop.extendFn(Me);
oop.makeAbstract(Me, []);

Me.prototype.assert = function assert(expected, message) {
	ensure.signature(arguments, [ Object, [undefined, String] ]);
	if (message === undefined) message = "Differences found";

	var diff = this.diff(expected);
	if (diff !== "") throw new Error(message + ":\n" + diff + "\n");
};

Me.prototype.diff = function diff(expected) {
	ensure.signature(arguments, [ Object ]);

	var result = [];
	var keys = shim.Object.keys(expected);
	var key, oneDiff, descriptor;
	for (var i = 0; i < keys.length; i++) {
		key = keys[i];
		descriptor = this[key];
		ensure.that(
				descriptor !== undefined,
				this + " doesn't have a property named '" + key + "'. Did you misspell it?"
		);
		oneDiff = descriptor.diff(expected[key]);
		if (oneDiff !== "") result.push(oneDiff);
	}

	return result.join("\n");
};

},{"./util/ensure.js":23,"./util/oop.js":24,"./util/shim.js":25}],3:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var PositionDescriptor = require("./position_descriptor.js");
var Position = require("../values/position.js");
var RelativePosition = require("./relative_position.js");

var X_DIMENSION = "x";
var Y_DIMENSION = "y";

var Me = module.exports = function Center(dimension, position1, position2, description) {
	ensure.signature(arguments, [ String, PositionDescriptor, PositionDescriptor, String ]);

	if (dimension === X_DIMENSION) PositionDescriptor.x(this);
	else if (dimension === Y_DIMENSION) PositionDescriptor.y(this);
	else ensure.unreachable("Unknown dimension: " + dimension);

	this._dimension = dimension;
	this._position1 = position1;
	this._position2 = position2;
	this._description = description;
};
PositionDescriptor.extend(Me);

Me.x = factoryFn(X_DIMENSION);
Me.y = factoryFn(Y_DIMENSION);

Me.prototype.value = function value() {
	ensure.signature(arguments, []);
	return this._position1.value().midpoint(this._position2.value());
};

Me.prototype.toString = function toString() {
	ensure.signature(arguments, []);
	return this._description;
};

function factoryFn(dimension) {
	return function(position1, position2, description) {
		return new Me(dimension, position1, position2, description);
	};
}

},{"../util/ensure.js":23,"../values/position.js":27,"./position_descriptor.js":10,"./relative_position.js":11}],4:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var oop = require("../util/oop.js");
var Value = require("../values/value.js");

var Me = module.exports = function Descriptor() {
	ensure.unreachable("Descriptor is abstract and should not be constructed directly.");
};
Me.extend = oop.extendFn(Me);
oop.makeAbstract(Me, [
	"value",
	"toString"
]);

Me.prototype.diff = function diff(expected) {
	expected = normalizeType(this, expected);
	try {
		var actualValue = this.value();
		var expectedValue = expected.value();

		if (actualValue.equals(expectedValue)) return "";

		var difference = actualValue.diff(expectedValue);
		var expectedDesc = expectedValue.toString();
		if (expected instanceof Me) expectedDesc += " (" + expected + ")";

		return this + " was " + difference + ".\n" +
			"  Expected: " + expectedDesc + "\n" +
			"  But was:  " + actualValue;
	}
	catch (err) {
		throw new Error("Can't compare " + this + " to " + expected + ": " + err.message);
	}
};

Me.prototype.convert = function convert(arg, type) {
	// This method is meant to be overridden by subclasses. It should return 'undefined' when an argument
	// can't be converted. In this default implementation, no arguments can be converted, so we always
	// return 'undefined'.
	return undefined;
};

Me.prototype.equals = function equals(that) {
	// Descriptors aren't value objects. They're never equal to anything. But sometimes
	// they're used in the same places value objects are used, and this method gets called.
	return false;
};

function normalizeType(self, expected) {
	var expectedType = typeof expected;
	if (expected === null) expectedType = "null";

	if (expectedType === "object" && (expected instanceof Me || expected instanceof Value)) return expected;

	if (expected === undefined) {
		throw new Error("Can't compare " + self + " to " + expected + ". Did you misspell a property name?");
	}
	else if (expectedType === "object") {
		throw new Error("Can't compare " + self + " to " + oop.instanceName(expected) + " instances.");
	}
	else {
		var converted = self.convert(expected, expectedType);
		if (converted !== undefined) return converted;

		var explanation = expected;
		if (expectedType === "string") explanation = "'" + explanation + "'";
		if (expectedType === "function") explanation = "a function";

		throw new Error("Can't compare " + self + " to " + explanation + ".");
	}

}

},{"../util/ensure.js":23,"../util/oop.js":24,"../values/value.js":30}],5:[function(require,module,exports){
// Copyright (c) 2014-2016 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var ensure = require("../util/ensure.js");
	var Position = require("../values/position.js");
	var PositionDescriptor = require("./position_descriptor.js");
	var RenderState = require("../values/render_state.js");

	var TOP = "top";
	var RIGHT = "right";
	var BOTTOM = "bottom";
	var LEFT = "left";

	var Me = module.exports = function ElementEdge(element, position) {
		var QElement = require("../q_element.js");      // break circular dependency
		ensure.signature(arguments, [QElement, String]);

		if (position === LEFT || position === RIGHT) PositionDescriptor.x(this);
		else if (position === TOP || position === BOTTOM) PositionDescriptor.y(this);
		else ensure.unreachable("Unknown position: " + position);

		this._element = element;
		this._position = position;
	};
	PositionDescriptor.extend(Me);

	Me.top = factoryFn(TOP);
	Me.right = factoryFn(RIGHT);
	Me.bottom = factoryFn(BOTTOM);
	Me.left = factoryFn(LEFT);

	Me.prototype.value = function value() {
		ensure.signature(arguments, []);

		var rawPosition = this._element.getRawPosition();

		var edge = rawPosition[this._position];
		var scroll = this._element.frame.getRawScrollPosition();

		if (this._position === RIGHT || this._position === LEFT) {
			if (!elementRendered(this)) return Position.noX();
			return Position.x(edge + scroll.x);
		}
		else {
			if (!elementRendered(this)) return Position.noY();
			return Position.y(edge + scroll.y);
		}
	};

	Me.prototype.toString = function toString() {
		ensure.signature(arguments, []);
		return this._position + " edge of " + this._element;
	};

	function factoryFn(position) {
		return function factory(element) {
			return new Me(element, position);
		};
	}

	function elementRendered(self) {
		return self._element.rendered.value().equals(RenderState.rendered());
	}

}());
},{"../q_element.js":17,"../util/ensure.js":23,"../values/position.js":27,"../values/render_state.js":28,"./position_descriptor.js":10}],6:[function(require,module,exports){
// Copyright (c) 2016 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var ensure = require("../util/ensure.js");
	var RenderState = require("../values/render_state.js");
	var Descriptor = require("./descriptor.js");

	var Me = module.exports = function ElementRendered(element) {
		var QElement = require("../q_element.js");      // break circular dependency
		ensure.signature(arguments, [ QElement ]);

		this._element = element;
	};
	Descriptor.extend(Me);

	Me.create = function create(element) {
		return new Me(element);
	};

	Me.prototype.value = function value() {
		if (!this._element.frame.body().toDomElement().contains(this._element.toDomElement())) return RenderState.detached();
		else if (this._element.getRawStyle("display") === "none") return RenderState.displayNone();
		else return RenderState.rendered();
	};

	Me.prototype.toString = function toString() {
		return "render status of " + this._element.toString();
	};

	Me.prototype.convert = function convert(arg, type) {
	  if (type === "boolean") {
		  return arg ? RenderState.rendered() : RenderState.notRendered();
	  }
		if (type === "string") {
			if (arg === "display:none") return RenderState.displayNone();
			if (arg === "detached") return RenderState.detached();
		}
	};

}());
},{"../q_element.js":17,"../util/ensure.js":23,"../values/render_state.js":28,"./descriptor.js":4}],7:[function(require,module,exports){
// Copyright (c) 2014-2016 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var ensure = require("../util/ensure.js");
	var SizeDescriptor = require("./size_descriptor.js");
	var Size = require("../values/size.js");
	var RenderState = require("../values/render_state.js");

	var X_DIMENSION = "width";
	var Y_DIMENSION = "height";

	var Me = module.exports = function ElementSize(dimension, element) {
		var QElement = require("../q_element.js");    // break circular dependency
		ensure.signature(arguments, [String, QElement]);
		ensure.that(dimension === X_DIMENSION || dimension === Y_DIMENSION, "Unrecognized dimension: " + dimension);

		this._dimension = dimension;
		this._element = element;
	};
	SizeDescriptor.extend(Me);

	Me.x = factoryFn(X_DIMENSION);
	Me.y = factoryFn(Y_DIMENSION);

	Me.prototype.value = function value() {
		ensure.signature(arguments, []);

		if (!elementRendered(this)) return Size.createNone();

		var position = this._element.getRawPosition();
		return Size.create(position[this._dimension]);
	};

	Me.prototype.toString = function toString() {
		ensure.signature(arguments, []);

		return this._dimension + " of " + this._element;
	};

	function factoryFn(dimension) {
		return function factory(element) {
			return new Me(dimension, element);
		};
	}

	function elementRendered(self) {
		return self._element.rendered.value().equals(RenderState.rendered());
	}

}());
},{"../q_element.js":17,"../util/ensure.js":23,"../values/render_state.js":28,"../values/size.js":29,"./size_descriptor.js":13}],8:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var PositionDescriptor = require("./position_descriptor.js");
var Position = require("../values/position.js");

var TOP = "top";
var RIGHT = "right";
var BOTTOM = "bottom";
var LEFT = "left";

var Me = module.exports = function PageEdge(edge, frame) {
	var QFrame = require("../q_frame.js");    // break circular dependency
	ensure.signature(arguments, [ String, QFrame ]);

	if (edge === LEFT || edge === RIGHT) PositionDescriptor.x(this);
	else if (edge === TOP || edge === BOTTOM) PositionDescriptor.y(this);
	else ensure.unreachable("Unknown edge: " + edge);

	this._edge = edge;
	this._frame = frame;
};
PositionDescriptor.extend(Me);

Me.top = factoryFn(TOP);
Me.right = factoryFn(RIGHT);
Me.bottom = factoryFn(BOTTOM);
Me.left = factoryFn(LEFT);

Me.prototype.value = function value() {
	ensure.signature(arguments, []);

	var x = Position.x(0);
	var y = Position.y(0);

	switch(this._edge) {
		case TOP: return y;
		case RIGHT: return x.plus(this._frame.page().width.value());
		case BOTTOM: return y.plus(this._frame.page().height.value());
		case LEFT: return x;

		default: ensure.unreachable();
	}
};

Me.prototype.toString = function toString() {
	ensure.signature(arguments, []);

	switch(this._edge) {
		case TOP: return "top of page";
		case RIGHT: return "right side of page";
		case BOTTOM: return "bottom of page";
		case LEFT: return "left side of page";

		default: ensure.unreachable();
	}
};

function factoryFn(edge) {
	return function factory(frame) {
		return new Me(edge, frame);
	};
}
},{"../q_frame.js":19,"../util/ensure.js":23,"../values/position.js":27,"./position_descriptor.js":10}],9:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var SizeDescriptor = require("./size_descriptor.js");
var Size = require("../values/size.js");

var X_DIMENSION = "width";
var Y_DIMENSION = "height";

var Me = module.exports = function PageSize(dimension, frame) {
	var QFrame = require("../q_frame.js");    // break circular dependency
	ensure.signature(arguments, [ String, QFrame ]);
	ensure.that(dimension === X_DIMENSION || dimension === Y_DIMENSION, "Unrecognized dimension: " + dimension);

	this._dimension = dimension;
	this._frame = frame;
};
SizeDescriptor.extend(Me);

Me.x = factoryFn(X_DIMENSION);
Me.y = factoryFn(Y_DIMENSION);

Me.prototype.value = function() {
	ensure.signature(arguments, []);

	// USEFUL READING: http://www.quirksmode.org/mobile/viewports.html
	// and http://www.quirksmode.org/mobile/viewports2.html

	// API SEMANTICS.
	// Ref https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
	//    getBoundingClientRect().width: sum of bounding boxes of element (the displayed width of the element,
	//      including padding and border). Fractional. Applies transformations.
	//    clientWidth: visible width of element including padding (but not border). EXCEPT on root element (html), where
	//      it is the width of the viewport. Rounds to an integer. Doesn't apply transformations.
	//    offsetWidth: visible width of element including padding, border, and scrollbars (if any). Rounds to an integer.
	//      Doesn't apply transformations.
	//    scrollWidth: entire width of element, including any part that's not visible due to scrollbars. Rounds to
	//      an integer. Doesn't apply transformations. Not clear if it includes scrollbars, but I think not. Also
	//      not clear if it includes borders or padding. (But from tests, apparently not borders. Except on root
	//      element and body element, which have special results that vary by browser.)

	// TEST RESULTS: WIDTH
	//   ✔ = correct answer
	//   ✘ = incorrect answer and diverges from spec
	//   ~ = incorrect answer, but matches spec
	// BROWSERS TESTED: Safari 6.2.0 (Mac OS X 10.8.5); Mobile Safari 7.0.0 (iOS 7.1); Firefox 32.0.0 (Mac OS X 10.8);
	//    Firefox 33.0.0 (Windows 7); Chrome 38.0.2125 (Mac OS X 10.8.5); Chrome 38.0.2125 (Windows 7); IE 8, 9, 10, 11

	// html width style smaller than viewport width; body width style smaller than html width style
	//  NOTE: These tests were conducted when correct result was width of border. That has been changed
	//  to "width of viewport."
	//    html.getBoundingClientRect().width
	//      ✘ IE 8, 9, 10: width of viewport
	//      ✔ Safari, Mobile Safari, Chrome, Firefox, IE 11: width of html, including border
	//    html.clientWidth
	//      ~ Safari, Mobile Safari, Chrome, Firefox, IE 8, 9, 10, 11: width of viewport
	//    html.offsetWidth
	//      ✘ IE 8, 9, 10: width of viewport
	//      ✔ Safari, Mobile Safari, Chrome, Firefox, IE 11: width of html, including border
	//    html.scrollWidth
	//      ✘ IE 8, 9, 10, 11, Firefox: width of viewport
	//      ~ Safari, Mobile Safari, Chrome: width of html, excluding border
	//    body.getBoundingClientRect().width
	//      ~ Safari, Mobile Safari, Chrome, Firefox, IE 8, 9, 10, 11: width of body, including border
	//    body.clientWidth
	//      ~ Safari, Mobile Safari, Chrome, Firefox, IE 8, 9, 10, 11: width of body, excluding border
	//    body.offsetWidth
	//      ~ Safari, Mobile Safari, Chrome, Firefox, IE 8, 9, 10, 11: width of body, including border
	//    body.scrollWidth
	//      ✘ Safari, Mobile Safari, Chrome: width of viewport
	//      ~ Firefox, IE 8, 9, 10, 11: width of body, excluding border

	// element width style wider than viewport; body and html width styles at default
	// BROWSER BEHAVIOR: html and body border extend to width of viewport and not beyond (except on Mobile Safari)
	// Correct result is element width + body border-left + html border-left (except on Mobile Safari)
	// Mobile Safari uses a layout viewport, so it's expected to include body border-right and html border-right.
	//    html.getBoundingClientRect().width
	//      ✔ Mobile Safari: element width + body border + html border
	//      ~ Safari, Chrome, Firefox, IE 8, 9, 10, 11: viewport width
	//    html.clientWidth
	//      ✔ Mobile Safari: element width + body border + html border
	//      ~ Safari, Chrome, Firefox, IE 8, 9, 10, 11: viewport width
	//    html.offsetWidth
	//      ✔ Mobile Safari: element width + body border + html border
	//      ~ Safari, Chrome, Firefox, IE 8, 9, 10, 11: viewport width
	//    html.scrollWidth
	//      ✔ Mobile Safari: element width + body border + html border
	//      ✘ Safari, Chrome: element width + body border-left (BUT NOT html border-left)
	//      ✔ Firefox, IE 8, 9, 10, 11: element width + body border-left + html border-left
	//    body.getBoundingClientRect().width
	//      ~ Mobile Safari: element width + body border
	//      ~ Safari, Chrome, Firefox, IE 8, 9, 10, 11: viewport width - html border
	//    body.clientWidth
	//      ~ Mobile Safari: element width
	//      ~ Safari, Chrome, Firefox, IE 8, 9, 10, 11: viewport width - html border - body border
	//    body.offsetWidth
	//      ~ Mobile Safari: element width + body border
	//      ~ Safari, Chrome, Firefox, IE 8, 9, 10, 11: viewport width - html border
	//    body.scrollWidth
	//      ✔ Mobile Safari: element width + body border + html border
	//      ✔ Safari, Chrome: element width + body border-left + html border-left (matches actual browser)
	//      ~ Firefox, IE 8, 9, 10, 11: element width

	// TEST RESULTS: HEIGHT
	//   ✔ = correct answer
	//   ✘ = incorrect answer and diverges from spec
	//   ~ = incorrect answer, but matches spec

	// html height style smaller than viewport height; body height style smaller than html height style
	//  NOTE: These tests were conducted when correct result was height of viewport.
	//    html.clientHeight
	//      ✔ Safari, Mobile Safari, Chrome, Firefox, IE 8, 9, 10, 11: height of viewport

	// element height style taller than viewport; body and html width styles at default
	// BROWSER BEHAVIOR: html and body border enclose entire element
	// Correct result is element width + body border-top + html border-top + body border-bottom + html border-bottom
	//    html.clientHeight
	//      ✔ Mobile Safari: element height + all borders
	//      ~ Safari, Chrome, Firefox, IE 8, 9, 10, 11: height of viewport
	//    html.scrollHeight
	//      ✔ Firefox, IE 8, 9, 10, 11: element height + all borders
	//      ✘ Safari, Mobile Safari, Chrome: element height + html border-bottom
	//    body.scrollHeight
	//      ✔ Safari, Mobile Safari, Chrome: element height + all borders
	//      ~ Firefox, IE 8, 9, 10, 11: element height (body height - body border)

	var document = this._frame.toDomElement().contentDocument;
	var html = document.documentElement;
	var body = document.body;

	// BEST WIDTH ANSWER SO FAR (ASSUMING VIEWPORT IS MINIMUM ANSWER):
	var width = Math.max(body.scrollWidth, html.scrollWidth);

	// BEST HEIGHT ANSWER SO FAR (ASSUMING VIEWPORT IS MINIMUM ANSWER):
	var height = Math.max(body.scrollHeight, html.scrollHeight);

	return Size.create(this._dimension === X_DIMENSION ? width : height);
};

Me.prototype.toString = function() {
	ensure.signature(arguments, []);

	return this._dimension + " of page";
};

function factoryFn(dimension) {
	return function factory(frame) {
		return new Me(dimension, frame);
	};
}
},{"../q_frame.js":19,"../util/ensure.js":23,"../values/size.js":29,"./size_descriptor.js":13}],10:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
/*jshint newcap:false */
"use strict";

var ensure = require("../util/ensure.js");
var oop = require("../util/oop.js");
var Descriptor = require("./descriptor.js");
var Position = require("../values/position.js");

function RelativePosition() {
	return require("./relative_position.js");   	// break circular dependency
}

var X_DIMENSION = "x";
var Y_DIMENSION = "y";

var Me = module.exports = function PositionDescriptor(dimension) {
	ensure.signature(arguments, [ String ]);
	ensure.unreachable("PositionDescriptor is abstract and should not be constructed directly.");
};
Descriptor.extend(Me);
Me.extend = oop.extendFn(Me);

Me.x = factoryFn(X_DIMENSION);
Me.y = factoryFn(Y_DIMENSION);

Me.prototype.plus = function plus(amount) {
	if (this._pdbc.dimension === X_DIMENSION) return RelativePosition().right(this, amount);
	else return RelativePosition().down(this, amount);
};

Me.prototype.minus = function minus(amount) {
	if (this._pdbc.dimension === X_DIMENSION) return RelativePosition().left(this, amount);
	else return RelativePosition().up(this, amount);
};

Me.prototype.convert = function convert(arg, type) {
	switch (type) {
		case "number": return this._pdbc.dimension === X_DIMENSION ? Position.x(arg) : Position.y(arg);
		case "string":
			if (arg === "none") return this._pdbc.dimension === X_DIMENSION ? Position.noX() : Position.noY();
			else return undefined;
			break;
		default: return undefined;
	}
};

function factoryFn(dimension) {
	return function factory(self) {
		// _pdbc: "PositionDescriptor base class." An attempt to prevent name conflicts.
		self._pdbc = { dimension: dimension };
	};
}

},{"../util/ensure.js":23,"../util/oop.js":24,"../values/position.js":27,"./descriptor.js":4,"./relative_position.js":11}],11:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var Position = require("../values/position.js");
var Descriptor = require("./descriptor.js");
var PositionDescriptor = require("./position_descriptor.js");
var Value = require("../values/value.js");
var Size = require("../values/size.js");
var Pixels = require("../values/pixels.js");
var ElementSize = require("./element_size.js");

var X_DIMENSION = "x";
var Y_DIMENSION = "y";
var PLUS = 1;
var MINUS = -1;

var Me = module.exports = function RelativePosition(dimension, direction, relativeTo, relativeAmount) {
	ensure.signature(arguments, [ String, Number, Descriptor, [Number, Descriptor, Value] ]);

	if (dimension === X_DIMENSION) PositionDescriptor.x(this);
	else if (dimension === Y_DIMENSION) PositionDescriptor.y(this);
	else ensure.unreachable("Unknown dimension: " + dimension);

	this._dimension = dimension;
	this._direction = direction;
	this._relativeTo = relativeTo;

	if (typeof relativeAmount === "number") {
		if (relativeAmount < 0) this._direction *= -1;
		this._amount = Size.create(Math.abs(relativeAmount));
	}
	else {
		this._amount = relativeAmount;
	}
};
PositionDescriptor.extend(Me);

Me.right = createFn(X_DIMENSION, PLUS);
Me.down = createFn(Y_DIMENSION, PLUS);
Me.left = createFn(X_DIMENSION, MINUS);
Me.up = createFn(Y_DIMENSION, MINUS);

function createFn(dimension, direction) {
	return function create(relativeTo, relativeAmount) {
		return new Me(dimension, direction, relativeTo, relativeAmount);
	};
}

Me.prototype.value = function value() {
	ensure.signature(arguments, []);

	var baseValue = this._relativeTo.value();
	var relativeValue = this._amount.value();

	if (this._direction === PLUS) return baseValue.plus(relativeValue);
	else return baseValue.minus(relativeValue);
};

Me.prototype.toString = function toString() {
	ensure.signature(arguments, []);

	var base = this._relativeTo.toString();
	if (this._amount.equals(Size.create(0))) return base;

	var relation = this._amount.toString();
	if (this._dimension === X_DIMENSION) relation += (this._direction === PLUS) ? " to right of " : " to left of ";
	else relation += (this._direction === PLUS) ? " below " : " above ";

	return relation + base;
};

},{"../util/ensure.js":23,"../values/pixels.js":26,"../values/position.js":27,"../values/size.js":29,"../values/value.js":30,"./descriptor.js":4,"./element_size.js":7,"./position_descriptor.js":10}],12:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var Size = require("../values/size.js");
var Descriptor = require("./descriptor.js");
var SizeDescriptor = require("./size_descriptor.js");
var Value = require("../values/value.js");
var SizeMultiple = require("./size_multiple.js");

var PLUS = 1;
var MINUS = -1;

var Me = module.exports = function RelativeSize(direction, relativeTo, amount) {
	ensure.signature(arguments, [ Number, Descriptor, [Number, Descriptor, Value] ]);

	this._direction = direction;
	this._relativeTo = relativeTo;

	if (typeof amount === "number") {
		this._amount = Size.create(Math.abs(amount));
		if (amount < 0) this._direction *= -1;
	}
	else {
		this._amount = amount;
	}
};
SizeDescriptor.extend(Me);

Me.larger = factoryFn(PLUS);
Me.smaller = factoryFn(MINUS);

Me.prototype.value = function value() {
	ensure.signature(arguments, []);

	var baseValue = this._relativeTo.value();
	var relativeValue = this._amount.value();

	if (this._direction === PLUS) return baseValue.plus(relativeValue);
	else return baseValue.minus(relativeValue);
};

Me.prototype.toString = function toString() {
	ensure.signature(arguments, []);

	var base = this._relativeTo.toString();
	if (this._amount.equals(Size.create(0))) return base;

	var relation = this._amount.toString();
	if (this._direction === PLUS) relation += " larger than ";
	else relation += " smaller than ";

	return relation + base;
};

function factoryFn(direction) {
	return function factory(relativeTo, amount) {
		return new Me(direction, relativeTo, amount);
	};
}
},{"../util/ensure.js":23,"../values/size.js":29,"../values/value.js":30,"./descriptor.js":4,"./size_descriptor.js":13,"./size_multiple.js":14}],13:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
/*jshint newcap:false */
"use strict";

var ensure = require("../util/ensure.js");
var oop = require("../util/oop.js");
var Descriptor = require("./descriptor.js");
var Size = require("../values/size.js");

function RelativeSize() {
	return require("./relative_size.js");   	// break circular dependency
}

function SizeMultiple() {
	return require("./size_multiple.js");   	// break circular dependency
}

var Me = module.exports = function SizeDescriptor() {
	ensure.unreachable("SizeDescriptor is abstract and should not be constructed directly.");
};
Descriptor.extend(Me);
Me.extend = oop.extendFn(Me);

Me.prototype.plus = function plus(amount) {
	return RelativeSize().larger(this, amount);
};

Me.prototype.minus = function minus(amount) {
	return RelativeSize().smaller(this, amount);
};

Me.prototype.times = function times(amount) {
	return SizeMultiple().create(this, amount);
};

Me.prototype.convert = function convert(arg, type) {
	switch(type) {
		case "number": return Size.create(arg);
		case "string": return arg === "none" ? Size.createNone() : undefined;
		default: return undefined;
	}
};

},{"../util/ensure.js":23,"../util/oop.js":24,"../values/size.js":29,"./descriptor.js":4,"./relative_size.js":12,"./size_multiple.js":14}],14:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var Descriptor = require("./descriptor.js");
var SizeDescriptor = require("./size_descriptor.js");
var Size = require("../values/size.js");

var Me = module.exports = function SizeMultiple(relativeTo, multiple) {
	ensure.signature(arguments, [ Descriptor, Number ]);

	this._relativeTo = relativeTo;
	this._multiple = multiple;
};
SizeDescriptor.extend(Me);

Me.create = function create(relativeTo, multiple) {
	return new Me(relativeTo, multiple);
};

Me.prototype.value = function value() {
	ensure.signature(arguments, []);

	return this._relativeTo.value().times(this._multiple);
};

Me.prototype.toString = function toString() {
	ensure.signature(arguments, []);

	var multiple = this._multiple;
	var base = this._relativeTo.toString();
	if (multiple === 1) return base;

	var desc;
	switch(multiple) {
		case 1/2: desc = "half of "; break;
		case 1/3: desc = "one-third of "; break;
		case 2/3: desc = "two-thirds of "; break;
		case 1/4: desc = "one-quarter of "; break;
		case 3/4: desc = "three-quarters of "; break;
		case 1/5: desc = "one-fifth of "; break;
		case 2/5: desc = "two-fifths of "; break;
		case 3/5: desc = "three-fifths of "; break;
		case 4/5: desc = "four-fifths of "; break;
		case 1/6: desc = "one-sixth of "; break;
		case 5/6: desc = "five-sixths of "; break;
		case 1/8: desc = "one-eighth of "; break;
		case 3/8: desc = "three-eighths of "; break;
		case 5/8: desc = "five-eighths of "; break;
		case 7/8: desc = "seven-eighths of "; break;
		default:
			if (multiple > 1) desc = multiple + " times ";
			else desc = (multiple * 100) + "% of ";
	}

	return desc + base;
};
},{"../util/ensure.js":23,"../values/size.js":29,"./descriptor.js":4,"./size_descriptor.js":13}],15:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var PositionDescriptor = require("./position_descriptor.js");
var Position = require("../values/position.js");

var TOP = "top";
var RIGHT = "right";
var BOTTOM = "bottom";
var LEFT = "left";

var Me = module.exports = function ViewportEdge(position, frame) {
	var QFrame = require("../q_frame.js");    // break circular dependency
	ensure.signature(arguments, [ String, QFrame ]);

	if (position === LEFT || position === RIGHT) PositionDescriptor.x(this);
	else if (position === TOP || position === BOTTOM) PositionDescriptor.y(this);
	else ensure.unreachable("Unknown position: " + position);

	this._position = position;
	this._frame = frame;
};
PositionDescriptor.extend(Me);

Me.top = factoryFn(TOP);
Me.right = factoryFn(RIGHT);
Me.bottom = factoryFn(BOTTOM);
Me.left = factoryFn(LEFT);

Me.prototype.value = function() {
	ensure.signature(arguments, []);

	var scroll = this._frame.getRawScrollPosition();
	var x = Position.x(scroll.x);
	var y = Position.y(scroll.y);

	switch(this._position) {
		case TOP: return y;
		case RIGHT: return x.plus(this._frame.viewport().width.value());
		case BOTTOM: return y.plus(this._frame.viewport().height.value());
		case LEFT: return x;

		default: ensure.unreachable();
	}
};

Me.prototype.toString = function() {
	ensure.signature(arguments, []);
	return this._position + " edge of viewport";
};

function factoryFn(position) {
	return function factory(frame) {
		return new Me(position, frame);
	};
}

},{"../q_frame.js":19,"../util/ensure.js":23,"../values/position.js":27,"./position_descriptor.js":10}],16:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var SizeDescriptor = require("./size_descriptor.js");
var Size = require("../values/size.js");
var RelativeSize = require("./relative_size.js");
var SizeMultiple = require("./size_multiple.js");

var X_DIMENSION = "x";
var Y_DIMENSION = "y";

var Me = module.exports = function PageSize(dimension, frame) {
	ensure.signature(arguments, [ String, Object ]);
	ensure.that(dimension === X_DIMENSION || dimension === Y_DIMENSION, "Unrecognized dimension: " + dimension);

	this._dimension = dimension;
	this._frame = frame;
};
SizeDescriptor.extend(Me);

Me.x = factoryFn(X_DIMENSION);
Me.y = factoryFn(Y_DIMENSION);

Me.prototype.value = function() {
	ensure.signature(arguments, []);

	// USEFUL READING: http://www.quirksmode.org/mobile/viewports.html
	// and http://www.quirksmode.org/mobile/viewports2.html

	// BROWSERS TESTED: Safari 6.2.0 (Mac OS X 10.8.5); Mobile Safari 7.0.0 (iOS 7.1); Firefox 32.0.0 (Mac OS X 10.8);
	//    Firefox 33.0.0 (Windows 7); Chrome 38.0.2125 (Mac OS X 10.8.5); Chrome 38.0.2125 (Windows 7); IE 8, 9, 10, 11

	// Width techniques I've tried: (Note: results are different in quirks mode)
	// body.clientWidth
	// body.offsetWidth
	// body.getBoundingClientRect().width
	//    fails on all browsers: doesn't include margin
	// body.scrollWidth
	//    works on Safari, Mobile Safari, Chrome
	//    fails on Firefox, IE 8, 9, 10, 11: doesn't include margin
	// html.getBoundingClientRect().width
	// html.offsetWidth
	//    works on Safari, Mobile Safari, Chrome, Firefox
	//    fails on IE 8, 9, 10: includes scrollbar
	// html.scrollWidth
	// html.clientWidth
	//    WORKS! Safari, Mobile Safari, Chrome, Firefox, IE 8, 9, 10, 11

	// Height techniques I've tried: (Note that results are different in quirks mode)
	// body.clientHeight
	// body.offsetHeight
	// body.getBoundingClientRect().height
	//    fails on all browsers: only includes height of content
	// body getComputedStyle("height")
	//    fails on all browsers: IE8 returns "auto"; others only include height of content
	// body.scrollHeight
	//    works on Safari, Mobile Safari, Chrome;
	//    fails on Firefox, IE 8, 9, 10, 11: only includes height of content
	// html.getBoundingClientRect().height
	// html.offsetHeight
	//    works on IE 8, 9, 10
	//    fails on IE 11, Safari, Mobile Safari, Chrome: only includes height of content
	// html.scrollHeight
	//    works on Firefox, IE 8, 9, 10, 11
	//    fails on Safari, Mobile Safari, Chrome: only includes height of content
	// html.clientHeight
	//    WORKS! Safari, Mobile Safari, Chrome, Firefox, IE 8, 9, 10, 11

	var html = this._frame.get("html").toDomElement();
	var value = (this._dimension === X_DIMENSION) ? html.clientWidth : html.clientHeight;
	return Size.create(value);
};

Me.prototype.toString = function() {
	ensure.signature(arguments, []);

	var desc = (this._dimension === X_DIMENSION) ? "width" : "height";
	return desc + " of viewport";
};

function factoryFn(dimension) {
	return function factory(frame) {
		return new Me(dimension, frame);
	};
}
},{"../util/ensure.js":23,"../values/size.js":29,"./relative_size.js":12,"./size_descriptor.js":13,"./size_multiple.js":14}],17:[function(require,module,exports){
// Copyright (c) 2014-2016 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var ensure = require("./util/ensure.js");
	var shim = require("./util/shim.js");
	var camelcase = require("../vendor/camelcase-1.0.1-modified.js");
	var ElementRendered = require("./descriptors/element_rendered.js");
	var ElementEdge = require("./descriptors/element_edge.js");
	var Center = require("./descriptors/center.js");
	var ElementSize = require("./descriptors/element_size.js");
	var Assertable = require("./assertable.js");

	var Me = module.exports = function QElement(domElement, frame, nickname) {
		var QFrame = require("./q_frame.js");    // break circular dependency
		ensure.signature(arguments, [Object, QFrame, String]);

		this._domElement = domElement;
		this._nickname = nickname;

		this.frame = frame;

		// properties
		this.rendered = ElementRendered.create(this);

		this.top = ElementEdge.top(this);
		this.right = ElementEdge.right(this);
		this.bottom = ElementEdge.bottom(this);
		this.left = ElementEdge.left(this);

		this.center = Center.x(this.left, this.right, "center of '" + nickname + "'");
		this.middle = Center.y(this.top, this.bottom, "middle of '" + nickname + "'");

		this.width = ElementSize.x(this);
		this.height = ElementSize.y(this);
	};
	Assertable.extend(Me);

	Me.prototype.getRawStyle = function getRawStyle(styleName) {
		ensure.signature(arguments, [String]);

		var styles;
		var result;

		// WORKAROUND IE 8: no getComputedStyle()
		if (window.getComputedStyle) {
			// WORKAROUND Firefox 40.0.3: must use frame's contentWindow (ref https://bugzilla.mozilla.org/show_bug.cgi?id=1204062)
			styles = this.frame.toDomElement().contentWindow.getComputedStyle(this._domElement);
			result = styles.getPropertyValue(styleName);
		}
		else {
			styles = this._domElement.currentStyle;
			result = styles[camelcase(styleName)];
		}
		if (result === null || result === undefined) result = "";
		return result;
	};

	Me.prototype.getRawPosition = function getRawPosition() {
		ensure.signature(arguments, []);

		// WORKAROUND IE 8: No TextRectangle.height or .width
		var rect = this._domElement.getBoundingClientRect();
		return {
			left: rect.left,
			right: rect.right,
			width: rect.width !== undefined ? rect.width : rect.right - rect.left,

			top: rect.top,
			bottom: rect.bottom,
			height: rect.height !== undefined ? rect.height : rect.bottom - rect.top
		};
	};

	Me.prototype.remove = function remove() {
		shim.Element.remove(this._domElement);
	};

	Me.prototype.toDomElement = function toDomElement() {
		ensure.signature(arguments, []);
		return this._domElement;
	};

	Me.prototype.toString = function toString() {
		ensure.signature(arguments, []);
		return "'" + this._nickname + "'";
	};

	Me.prototype.equals = function equals(that) {
		ensure.signature(arguments, [Me]);
		return this._domElement === that._domElement;
	};

}());
},{"../vendor/camelcase-1.0.1-modified.js":32,"./assertable.js":2,"./descriptors/center.js":3,"./descriptors/element_edge.js":5,"./descriptors/element_rendered.js":6,"./descriptors/element_size.js":7,"./q_frame.js":19,"./util/ensure.js":23,"./util/shim.js":25}],18:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("./util/ensure.js");
var QElement = require("./q_element.js");

var Me = module.exports = function QElementList(nodeList, frame, nickname) {
	var QFrame = require("./q_frame.js");    // break circular dependency
	ensure.signature(arguments, [ Object, QFrame, String ]);

	this._nodeList = nodeList;
	this._frame = frame;
	this._nickname = nickname;
};

Me.prototype.length = function length() {
	ensure.signature(arguments, []);

	return this._nodeList.length;
};

Me.prototype.at = function at(requestedIndex, nickname) {
	ensure.signature(arguments, [ Number, [undefined, String] ]);

	var index = requestedIndex;
	var length = this.length();
	if (index < 0) index = length + index;

	ensure.that(
		index >= 0 && index < length,
		"'" + this._nickname + "'[" + requestedIndex + "] is out of bounds; list length is " + length
	);
	var element = this._nodeList[index];

	if (nickname === undefined) nickname = this._nickname + "[" + index + "]";
	return new QElement(element, this._frame, nickname);
};

Me.prototype.toString = function toString() {
	ensure.signature(arguments, []);

	return "'" + this._nickname + "' list";
};
},{"./q_element.js":17,"./q_frame.js":19,"./util/ensure.js":23}],19:[function(require,module,exports){
// Copyright (c) 2014-2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var ensure = require("./util/ensure.js");
	var shim = require("./util/shim.js");
	var quixote = require("./quixote.js");
	var QElement = require("./q_element.js");
	var QElementList = require("./q_element_list.js");
	var QViewport = require("./q_viewport.js");
	var QPage = require("./q_page.js");
	var async = require("../vendor/async-1.4.2.js");

	var Me = module.exports = function QFrame(frameDom) {
		ensure.signature(arguments, [Object]);
		ensure.that(frameDom.tagName === "IFRAME", "QFrame DOM element must be an iframe");

		this._domElement = frameDom;
		this._loaded = false;
		this._removed = false;
	};

	function loaded(self, width, height, src, stylesheets) {
		self._loaded = true;
		self._document = self._domElement.contentDocument;
		self._originalBody = self._document.body.innerHTML;
		self._originalWidth = width;
		self._originalHeight = height;
		self._originalSrc = src;
		self._originalStylesheets = stylesheets;
	}

	Me.create = function create(parentElement, options, callback) {
		ensure.signature(arguments, [Object, [Object, Function], [undefined, Function]]);
		if (callback === undefined) {
			callback = options;
			options = {};
		}
		var width = options.width || 2000;
		var height = options.height || 2000;
		var src = options.src;
		var stylesheets = options.stylesheet || [];
		if (!shim.Array.isArray(stylesheets)) stylesheets = [ stylesheets ];

		var err = checkUrls(src, stylesheets);
		if (err) return callback(err);

		var iframe = insertIframe(parentElement, width, height);
		shim.EventTarget.addEventListener(iframe, "load", onFrameLoad);
		setIframeContent(iframe, src);

		var frame = new Me(iframe);
		setFrameLoadCallback(frame, callback);

		return frame;

		function onFrameLoad() {
			// WORKAROUND Mobile Safari 7.0.0, Safari 6.2.0, Chrome 38.0.2125: frame is loaded synchronously
			// We force it to be asynchronous here
			setTimeout(function() {
				loaded(frame, width, height, src, stylesheets);
				loadStylesheets(frame, stylesheets, function() {
					frame._frameLoadCallback(null, frame);
				});
			}, 0);
		}
	};

	function setFrameLoadCallback(frame, callback) {
		frame._frameLoadCallback = callback;
	}

	function checkUrls(src, stylesheets) {
		if (!urlExists(src)) return error("src", src);

		for (var i = 0; i < stylesheets.length; i++) {
			var url = stylesheets[i];
			if (!urlExists(url)) return error("stylesheet", url);
		}

		return null;

		function error(name, url) {
			return new Error("404 error while loading " + name + " (" + url + ")");
		}
	}

	function urlExists(url) {
		if (url === undefined) return true;

		var http = new XMLHttpRequest();
		http.open('HEAD', url, false);
		http.send();
		return http.status !== 404;
	}

	function insertIframe(parentElement, width, height) {
		var iframe = document.createElement("iframe");
		iframe.setAttribute("width", width);
		iframe.setAttribute("height", height);
		iframe.setAttribute("frameborder", "0");    // WORKAROUND IE 8: don't include frame border in position calcs
		parentElement.appendChild(iframe);
		return iframe;
	}

	function setIframeContent(iframe, src) {
		if (src === undefined) {
			writeStandardsModeHtml(iframe);
		}	else {
			setIframeSrc(iframe, src);
		}
	}

	function setIframeSrc(iframe, src) {
		iframe.setAttribute("src", src);
	}

	function writeStandardsModeHtml(iframe) {
		var standardsMode = "<!DOCTYPE html>\n<html><head></head><body></body></html>";
		iframe.contentWindow.document.open();
		iframe.contentWindow.document.write(standardsMode);
		iframe.contentWindow.document.close();
	}

	function loadStylesheets(self, urls, callback) {
		async.each(urls, addLinkTag, callback);

		function addLinkTag(url, onLinkLoad) {
			var link = document.createElement("link");
			shim.EventTarget.addEventListener(link, "load", function(event) { onLinkLoad(null); });
			link.setAttribute("rel", "stylesheet");
			link.setAttribute("type", "text/css");
			link.setAttribute("href", url);
			shim.Document.head(self._document).appendChild(link);
		}
	}

	Me.prototype.reset = function() {
		ensure.signature(arguments, []);
		ensureUsable(this);

		this._document.body.innerHTML = this._originalBody;
		this.scroll(0, 0);
		this.resize(this._originalWidth, this._originalHeight);
	};

	Me.prototype.reload = function(callback) {
		ensure.signature(arguments, [Function]);
		ensureUsable(this);

		var frame = this;
		var iframe = this._domElement;
		var src = this._originalSrc;

		this.resize(this._originalWidth, this._originalHeight);
		setFrameLoadCallback(frame, callback);
		setIframeContent(iframe, src);
	};

	Me.prototype.toDomElement = function() {
		ensure.signature(arguments, []);
		ensureNotRemoved(this);

		return this._domElement;
	};

	Me.prototype.remove = function() {
		ensure.signature(arguments, []);
		ensureLoaded(this);
		if (this._removed) return;

		this._domElement.parentNode.removeChild(this._domElement);
		this._removed = true;
	};

	Me.prototype.viewport = function() {
		ensure.signature(arguments, []);
		ensureUsable(this);

		return new QViewport(this);
	};

	Me.prototype.page = function() {
		ensure.signature(arguments, []);
		ensureUsable(this);

		return new QPage(this);
	};

	Me.prototype.body = function() {
		ensure.signature(arguments, []);

		return this.get("body");
	};

	Me.prototype.add = function(html, nickname) {
		ensure.signature(arguments, [String, [undefined, String]]);
		if (nickname === undefined) nickname = html;
		ensureUsable(this);

		var tempElement = document.createElement("div");
		tempElement.innerHTML = shim.String.trim(html);
		ensure.that(
			tempElement.childNodes.length === 1,
			"Expected one element, but got " + tempElement.childNodes.length + " (" + html + ")"
		);

		var insertedElement = tempElement.childNodes[0];
		this._document.body.appendChild(insertedElement);
		return new QElement(insertedElement, this, nickname);
	};

	Me.prototype.get = function(selector, nickname) {
		ensure.signature(arguments, [String, [undefined, String]]);
		if (nickname === undefined) nickname = selector;
		ensureUsable(this);

		var nodes = this._document.querySelectorAll(selector);
		ensure.that(nodes.length === 1, "Expected one element to match '" + selector + "', but found " + nodes.length);
		return new QElement(nodes[0], this, nickname);
	};

	Me.prototype.getAll = function(selector, nickname) {
		ensure.signature(arguments, [String, [undefined, String]]);
		if (nickname === undefined) nickname = selector;

		return new QElementList(this._document.querySelectorAll(selector), this, nickname);
	};

	Me.prototype.scroll = function scroll(x, y) {
		ensure.signature(arguments, [Number, Number]);

		this._domElement.contentWindow.scroll(x, y);
	};

	Me.prototype.getRawScrollPosition = function getRawScrollPosition() {
		ensure.signature(arguments, []);

		return {
			x: shim.Window.pageXOffset(this._domElement.contentWindow, this._document),
			y: shim.Window.pageYOffset(this._domElement.contentWindow, this._document)
		};
	};

	Me.prototype.resize = function resize(width, height) {
		ensure.signature(arguments, [Number, Number]);

		this._domElement.setAttribute("width", "" + width);
		this._domElement.setAttribute("height", "" + height);
	};

	function ensureUsable(self) {
		ensureLoaded(self);
		ensureNotRemoved(self);
	}

	function ensureLoaded(self) {
		ensure.that(self._loaded, "QFrame not loaded: Wait for frame creation callback to execute before using frame");
	}

	function ensureNotRemoved(self) {
		ensure.that(!self._removed, "Attempted to use frame after it was removed");
	}

})();

},{"../vendor/async-1.4.2.js":31,"./q_element.js":17,"./q_element_list.js":18,"./q_page.js":20,"./q_viewport.js":21,"./quixote.js":22,"./util/ensure.js":23,"./util/shim.js":25}],20:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("./util/ensure.js");
var PageSize = require("./descriptors/page_size.js");
var PageEdge = require("./descriptors/page_edge.js");
var Center = require("./descriptors/center.js");
var Assertable = require("./assertable.js");

var Me = module.exports = function QPage(frame) {
	var QFrame = require("./q_frame.js");   // break circular dependency
	ensure.signature(arguments, [ QFrame ]);

	// properties
	this.width = PageSize.x(frame);
	this.height = PageSize.y(frame);

	this.top = PageEdge.top(frame);
	this.right = PageEdge.right(frame);
	this.bottom = PageEdge.bottom(frame);
	this.left = PageEdge.left(frame);

	this.center = Center.x(this.left, this.right, "center of page");
	this.middle = Center.y(this.top, this.bottom, "middle of page");
};
Assertable.extend(Me);

},{"./assertable.js":2,"./descriptors/center.js":3,"./descriptors/page_edge.js":8,"./descriptors/page_size.js":9,"./q_frame.js":19,"./util/ensure.js":23}],21:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("./util/ensure.js");
var ViewportSize = require("./descriptors/viewport_size.js");
var ViewportEdge = require("./descriptors/viewport_edge.js");
var Center = require("./descriptors/center.js");
var Assertable = require("./assertable.js");

var Me = module.exports = function QViewport(frame) {
	var QFrame = require("./q_frame.js");   // break circular dependency
	ensure.signature(arguments, [ QFrame ]);

	// properties
	this.width = ViewportSize.x(frame);
	this.height = ViewportSize.y(frame);

	this.top = ViewportEdge.top(frame);
	this.right = ViewportEdge.right(frame);
	this.bottom = ViewportEdge.bottom(frame);
	this.left = ViewportEdge.left(frame);

	this.center = Center.x(this.left, this.right, "center of viewport");
	this.middle = Center.y(this.top, this.bottom, "middle of viewport");
};
Assertable.extend(Me);

},{"./assertable.js":2,"./descriptors/center.js":3,"./descriptors/viewport_edge.js":15,"./descriptors/viewport_size.js":16,"./q_frame.js":19,"./util/ensure.js":23}],22:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("./util/ensure.js");
var QFrame = require("./q_frame.js");
var Size = require("./values/size.js");

var features = null;

exports.createFrame = function(options, callback) {
	return QFrame.create(document.body, options, function(err, callbackFrame) {
		if (features === null) {
			detectBrowserFeatures(function() {
				callback(err, callbackFrame);
			});
		}
		else {
			callback(err, callbackFrame);
		}
	});
};

exports.browser = {};

exports.browser.enlargesFrameToPageSize = createDetectionMethod("enlargesFrame");
exports.browser.enlargesFonts = createDetectionMethod("enlargesFonts");

function createDetectionMethod(propertyName) {
	return function() {
		ensure.signature(arguments, []);

		var feature = features[propertyName];
		ensure.that(feature !== undefined, "Must create a frame before using Quixote browser feature detection.");
		return feature;
	};
}

function detectBrowserFeatures(callback) {
	var FRAME_WIDTH = 1500;
	var FRAME_HEIGHT = 200;

	features = {};
	var frame = QFrame.create(document.body, { width: FRAME_WIDTH, height: FRAME_HEIGHT }, function(err) {
		if (err) {
			console.log("Error while creating Quixote browser feature detection frame: " + err);
			return callback();
		}

		try {
			features.enlargesFrame = detectFrameEnlargement(frame, FRAME_WIDTH);

			frame.reset();
			detectFontEnlargement(frame, FRAME_WIDTH, function(result) {
				features.enlargesFonts = result;
				frame.remove();
				return callback();
			});

		}
		catch(err2) {
			console.log("Error during Quixote browser feature detection: " + err2);
		}
	});

}

function detectFrameEnlargement(frame, frameWidth) {
	frame.add("<div style='width: " + (frameWidth + 200) + "px'>force scrolling</div>");
	return !frame.viewport().width.value().equals(Size.create(frameWidth));
}

function detectFontEnlargement(frame, frameWidth, callback) {
	ensure.that(frameWidth >= 1500, "Detector frame width must be larger than screen to detect font enlargement");

	// WORKAROUND IE 8: we use a <div> because the <style> tag can't be added by frame.add(). At the time of this
	// writing, I'm not sure if the issue is with frame.add() or if IE just can't programmatically add <style> tags.
	frame.add("<div><style>p { font-size: 15px; }</style></div>");

	var text = frame.add("<p>arbitrary text</p>");
	frame.add("<p>must have two p tags to work</p>");

	// WORKAROUND IE 8: need to force reflow or getting font-size may fail below
	// This seems to occur when IE is running in a slow VirtualBox VM. There is no test for this line.
	var forceReflow = text.offsetHeight;

	// WORKAROUND Safari 8.0.0: timeout required because font is enlarged asynchronously
	setTimeout(function() {
		var fontSize = text.getRawStyle("font-size");
		ensure.that(fontSize !== "", "Expected font-size to be a value");

		// WORKAROUND IE 8: ignores <style> tag we added above
		if (fontSize === "12pt") return callback(false);

		return callback(fontSize !== "15px");
	}, 0);

}

},{"./q_frame.js":19,"./util/ensure.js":23,"./values/size.js":29}],23:[function(require,module,exports){
// Copyright (c) 2013-2014 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.
"use strict";

// Runtime assertions for production code. (Contrast to assert.js, which is for test code.)

var shim = require("./shim.js");
var oop = require("./oop.js");

exports.that = function(variable, message) {
	if (message === undefined) message = "Expected condition to be true";

	if (variable === false) throw new EnsureException(exports.that, message);
	if (variable !== true) throw new EnsureException(exports.that, "Expected condition to be true or false");
};

exports.unreachable = function(message) {
	if (!message) message = "Unreachable code executed";

	throw new EnsureException(exports.unreachable, message);
};

exports.signature = function(args, signature) {
	signature = signature || [];
	var expectedArgCount = signature.length;
	var actualArgCount = args.length;

	if (actualArgCount > expectedArgCount) {
		throw new EnsureException(
			exports.signature,
			"Function called with too many arguments: expected " + expectedArgCount + " but got " + actualArgCount
		);
	}

	var type, arg, name;
	for (var i = 0; i < signature.length; i++) {
		type = signature[i];
		arg = args[i];
		name = "Argument " + i;

		if (!shim.Array.isArray(type)) type = [ type ];
		if (!typeMatches(type, arg, name)) {
			var message = name + " expected " + explainType(type) + ", but was ";
			throw new EnsureException(exports.signature, message + explainArg(arg));
		}
	}
};

function typeMatches(type, arg) {
	for (var i = 0; i < type.length; i++) {
		if (oneTypeMatches(type[i], arg)) return true;
	}
	return false;

	function oneTypeMatches(type, arg) {
		switch (getType(arg)) {
			case "boolean": return type === Boolean;
			case "string": return type === String;
			case "number": return type === Number;
			case "array": return type === Array;
			case "function": return type === Function;
			case "object": return type === Object || arg instanceof type;
			case "undefined": return type === undefined;
			case "null": return type === null;
			case "NaN": return isNaN(type);

			default: exports.unreachable();
		}
	}
}

function explainType(type) {
	var joiner = "";
	var result = "";
	for (var i = 0; i < type.length; i++) {
		result += joiner + explainOneType(type[i]);
		joiner = (i === type.length - 2) ? ", or " : ", ";
	}
	return result;

	function explainOneType(type) {
		switch (type) {
			case Boolean: return "boolean";
			case String: return "string";
			case Number: return "number";
			case Array: return "array";
			case Function: return "function";
			case null: return "null";
			default:
				if (typeof type === "number" && isNaN(type)) return "NaN";
				else {
					return oop.className(type) + " instance";
				}
		}
	}
}

function explainArg(arg) {
	var type = getType(arg);
	if (type !== "object") return type;

	return oop.instanceName(arg) + " instance";
}

function getType(variable) {
	var type = typeof variable;
	if (variable === null) type = "null";
	if (shim.Array.isArray(variable)) type = "array";
	if (type === "number" && isNaN(variable)) type = "NaN";
	return type;
}


/*****/

var EnsureException = exports.EnsureException = function EnsureException(fnToRemoveFromStackTrace, message) {
	if (Error.captureStackTrace) Error.captureStackTrace(this, fnToRemoveFromStackTrace);
	else this.stack = (new Error()).stack;
	this.message = message;
};
EnsureException.prototype = shim.Object.create(Error.prototype);
EnsureException.prototype.constructor = EnsureException;
EnsureException.prototype.name = "EnsureException";

},{"./oop.js":24,"./shim.js":25}],24:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

// can't use ensure.js due to circular dependency
var shim = require("./shim.js");

exports.className = function(constructor) {
	if (typeof constructor !== "function") throw new Error("Not a constructor");
	return shim.Function.name(constructor);
};

exports.instanceName = function(obj) {
	var prototype = shim.Object.getPrototypeOf(obj);
	if (prototype === null) return "<no prototype>";

	var constructor = prototype.constructor;
	if (constructor === undefined || constructor === null) return "<anon>";

	return shim.Function.name(constructor);
};

exports.extendFn = function extendFn(parentConstructor) {
	return function(childConstructor) {
		childConstructor.prototype = shim.Object.create(parentConstructor.prototype);
		childConstructor.prototype.constructor = childConstructor;
	};
};

exports.makeAbstract = function makeAbstract(constructor, methods) {
	var name = shim.Function.name(constructor);
	shim.Array.forEach(methods, function(method) {
		constructor.prototype[method] = function() {
			throw new Error(name + " subclasses must implement " + method + "() method");
		};
	});

	constructor.prototype.checkAbstractMethods = function checkAbstractMethods() {
		var unimplemented = [];
		var self = this;
		shim.Array.forEach(methods, function(name) {
			if (self[name] === constructor.prototype[name]) unimplemented.push(name + "()");
		});
		return unimplemented;
	};
};
},{"./shim.js":25}],25:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

exports.Array = {

	// WORKAROUND IE 8: no Array.isArray
	isArray: function isArray(thing) {
		if (Array.isArray) return Array.isArray(thing);

		return Object.prototype.toString.call(thing) === '[object Array]';
	},

	// WORKAROUND IE 8: no Array.forEach
	every: function every(obj, callbackfn, thisArg) {
		/*jshint bitwise:false, eqeqeq:false, -W041:false */
		if (Array.prototype.every) return obj.every(callbackfn, thisArg);

		// This workaround based on polyfill code from MDN:
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
		var T, k;

		if (this == null) {
			throw new TypeError('this is null or not defined');
		}

		// 1. Let O be the result of calling ToObject passing the this
		//    value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get internal method
		//    of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If IsCallable(callbackfn) is false, throw a TypeError exception.
		if (typeof callbackfn !== 'function') {
			throw new TypeError();
		}

		// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
		if (arguments.length > 1) {
			T = thisArg;
		}

		// 6. Let k be 0.
		k = 0;

		// 7. Repeat, while k < len
		while (k < len) {

			var kValue;

			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the HasProperty internal
			//    method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			if (k in O) {

				// i. Let kValue be the result of calling the Get internal method
				//    of O with argument Pk.
				kValue = O[k];

				// ii. Let testResult be the result of calling the Call internal method
				//     of callbackfn with T as the this value and argument list
				//     containing kValue, k, and O.
				var testResult = callbackfn.call(T, kValue, k, O);

				// iii. If ToBoolean(testResult) is false, return false.
				if (!testResult) {
					return false;
				}
			}
			k++;
		}
		return true;
	},

	// WORKAROUND IE 8: no Array.forEach
	forEach: function forEach(obj, callback, thisArg) {
		/*jshint bitwise:false, eqeqeq:false, -W041:false */

		if (Array.prototype.forEach) return obj.forEach(callback, thisArg);

		// This workaround based on polyfill code from MDN:
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

		// Production steps of ECMA-262, Edition 5, 15.4.4.18
		// Reference: http://es5.github.io/#x15.4.4.18

    var T, k;

    if (obj == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(obj);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as the this value and
        // argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
	}

};


exports.Element = {

	// WORKAROUND IE 8, IE 9, IE 10, IE 11: no Element.remove()
	remove: function remove(element) {
		element.parentNode.removeChild(element);
	}

};


exports.EventTarget = {

	// WORKAROUND IE 8: no EventTarget.addEventListener()
	addEventListener: function addEventListener(element, event, callback) {
		if (element.addEventListener) return element.addEventListener(event, callback);

		element.attachEvent("on" + event, callback);
	}

};


exports.Document = {

	// WORKAROUND IE 8: no document.head
	head: function head(doc) {
		if (doc.head) return doc.head;

		return doc.querySelector("head");
	}

};


exports.Function = {

	// WORKAROUND IE 8, IE 9, IE 10, IE 11: no function.name
	name: function name(fn) {
		if (fn.name) return fn.name;

		// Based on code by Jason Bunting et al, http://stackoverflow.com/a/332429
		var funcNameRegex = /function\s+(.{1,})\s*\(/;
		var results = (funcNameRegex).exec((fn).toString());
		return (results && results.length > 1) ? results[1] : "<anon>";
	},

};


exports.Object = {

	// WORKAROUND IE 8: no Object.create()
	create: function create(prototype) {
		if (Object.create) return Object.create(prototype);

		var Temp = function Temp() {};
		Temp.prototype = prototype;
		return new Temp();
	},

	// WORKAROUND IE 8: no Object.getPrototypeOf
	// Caution: Doesn't work on IE 8 if constructor has been changed, as is the case with a subclass.
	getPrototypeOf: function getPrototypeOf(obj) {
		if (Object.getPrototypeOf) return Object.getPrototypeOf(obj);

		var result = obj.constructor ? obj.constructor.prototype : null;
		return result || null;
	},

	// WORKAROUND IE 8: No Object.keys
	keys: function keys(obj) {
		if (Object.keys) return Object.keys(obj);

		// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
	  var hasOwnProperty = Object.prototype.hasOwnProperty,
	      hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
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
	}

};


exports.String = {

	// WORKAROUND IE 8: No String.trim()
	trim: function(str) {
		if (str.trim !== undefined) return str.trim();

		// Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
		return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	}

};


exports.Window = {

	// WORKAROUND IE 8: No Window.pageXOffset
	pageXOffset: function(window, document) {
		if (window.pageXOffset !== undefined) return window.pageXOffset;

		// Based on https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
		var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
		return isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
	},


	// WORKAROUND IE 8: No Window.pageYOffset
	pageYOffset: function(window, document) {
		if (window.pageYOffset !== undefined) return window.pageYOffset;

		// Based on https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
		var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
		return isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
	}

};
},{}],26:[function(require,module,exports){
// Copyright (c) 2014-2016 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var Value = require("./value.js");

var Me = module.exports = function Pixels(amount) {
	ensure.signature(arguments, [ [ Number, null ] ]);
	this._none = (amount === null);
	this._amount = amount;
};
Value.extend(Me);

Me.create = function create(amount) {
	return new Me(amount);
};

Me.createNone = function createNone() {
	return new Me(null);
};

Me.ZERO = Me.create(0);
Me.NONE = Me.createNone();

Me.prototype.compatibility = function compatibility() {
	return [ Me ];
};

Me.prototype.plus = Value.safe(function plus(operand) {
	if (this._none || operand._none) return Me.createNone();
	return new Me(this._amount + operand._amount);
});

Me.prototype.minus = Value.safe(function minus(operand) {
	if (this._none || operand._none) return Me.createNone();
	return new Me(this._amount - operand._amount);
});

Me.prototype.times = function times(operand) {
	ensure.signature(arguments, [ Number ]);

	if (this._none) return Me.createNone();
	return new Me(this._amount * operand);
};

Me.prototype.average = Value.safe(function average(operand) {
	if (this._none || operand._none) return Me.createNone();
	return new Me((this._amount + operand._amount) / 2);
});

Me.prototype.compare = Value.safe(function compare(operand) {
	var bothHavePixels = !this._none && !operand._none;
	var neitherHavePixels = this._none && operand._none;
	var onlyLeftHasPixels = !this._none && operand._none;

	if (bothHavePixels) {
		var difference = this._amount - operand._amount;
		if (Math.abs(difference) <= 0.5) return 0;
		else return difference;
	}
	else if (neitherHavePixels) {
				return 0;
	}
	else if (onlyLeftHasPixels) {
		return 1;
	}
	else {
		return -1;
	}
});

Me.max = function(l, r) {
	ensure.signature(arguments, [ Me, Me ]);

	return l.compare(r) >= 0 ? l : r;
};

Me.min = function(l, r) {
	ensure.signature(arguments, [ Me, Me ]);

	return l.compare(r) <= 0 ? l : r;
};

Me.prototype.diff = Value.safe(function diff(expected) {
	if (this.compare(expected) === 0) return "";
	if (this._none || expected._none) return "non-measurable";

	var difference = Math.abs(this._amount - expected._amount);

	var desc = difference;
	if (difference * 100 !== Math.floor(difference * 100)) desc = "about " + difference.toFixed(2);
	return desc + "px";
});

Me.prototype.toString = function toString() {
	ensure.signature(arguments, []);
	return this._none ? "no pixels" : this._amount + "px";
};

},{"../util/ensure.js":23,"./value.js":30}],27:[function(require,module,exports){
// Copyright (c) 2014-2016 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var Value = require("./value.js");
var Pixels = require("./pixels.js");
var Size = require("./size.js");

var X_DIMENSION = "x";
var Y_DIMENSION = "y";

var Me = module.exports = function Position(dimension, value) {
	ensure.signature(arguments, [ String, [ Number, Pixels ] ]);

	this._dimension = dimension;
	this._value = (typeof value === "number") ? Pixels.create(value) : value;
};
Value.extend(Me);

Me.x = function x(value) {
	ensure.signature(arguments, [ [ Number, Pixels ] ]);

	return new Me(X_DIMENSION, value);
};

Me.y = function y(value) {
	ensure.signature(arguments, [ [ Number, Pixels ] ]);

	return new Me(Y_DIMENSION, value);
};

Me.noX = function noX() {
	ensure.signature(arguments, []);

	return new Me(X_DIMENSION, Pixels.NONE);
};

Me.noY = function noY() {
	ensure.signature(arguments, []);

	return new Me(Y_DIMENSION, Pixels.NONE);
};

Me.prototype.compatibility = function compatibility() {
	return [ Me, Size ];
};

Me.prototype.plus = Value.safe(function plus(operand) {
	checkAxis(this, operand);
	return new Me(this._dimension, this._value.plus(operand.toPixels()));
});

Me.prototype.minus = Value.safe(function minus(operand) {
	checkAxis(this, operand);
	return new Me(this._dimension, this._value.minus(operand.toPixels()));
});

Me.prototype.midpoint = Value.safe(function midpoint(operand) {
	checkAxis(this, operand);
	return new Me(this._dimension, this._value.average(operand.toPixels()));
});

Me.prototype.diff = Value.safe(function diff(expected) {
	checkAxis(this, expected);

	var actualValue = this._value;
	var expectedValue = expected._value;

	if (actualValue.equals(expectedValue)) return "";
	else if (isNone(expected) && !isNone(this)) return "rendered when not expected";
	else if (!isNone(expected) && isNone(this)) return "not rendered";

	var direction;
	var comparison = actualValue.compare(expectedValue);
	if (this._dimension === X_DIMENSION) direction = comparison < 0 ? "further left than expected" : "further right than expected";
	else direction = comparison < 0 ? "higher than expected" : "lower than expected";

	return actualValue.diff(expectedValue) + " " + direction;
});

Me.prototype.toString = function toString() {
	ensure.signature(arguments, []);

	if (isNone(this)) return "not rendered";
	else return this._value.toString();
};

Me.prototype.toPixels = function toPixels() {
	ensure.signature(arguments, []);
	return this._value;
};

function checkAxis(self, other) {
	if (other instanceof Me) {
		ensure.that(self._dimension === other._dimension, "Can't compare X coordinate to Y coordinate");
	}
}

function isNone(position) {
	return position._value.equals(Pixels.NONE);
}
},{"../util/ensure.js":23,"./pixels.js":26,"./size.js":29,"./value.js":30}],28:[function(require,module,exports){
// Copyright (c) 2016 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var ensure = require("../util/ensure.js");
	var Value = require("./value.js");

	var RENDERED = "rendered";
	var NOT_RENDERED = "not rendered";
	var DISPLAY_NONE = "not rendered due to display:none property";
	var DETACHED = "not rendered due to being detached from DOM";

	var Me = module.exports = function RenderState(state) {
		ensure.signature(arguments, [ String ]);

		this._state = state;
	};
	Value.extend(Me);

	Me.rendered = function rendered() {
		return new Me(RENDERED);
	};

	Me.notRendered = function notRendered() {
		return new Me(NOT_RENDERED);
	};

	Me.displayNone = function displayNone() {
		return new Me(DISPLAY_NONE);
	};

	Me.detached = function detached() {
		return new Me(DETACHED);
	};

	Me.prototype.compatibility = function compatibility() {
		return [ Me ];
	};

	Me.prototype.diff = Value.safe(function diff(expected) {
		var thisState = this._state;
		var expectedState = expected._state;

		if (thisState === expectedState) return "";

		if (thisState === RENDERED) return "different than expected";
		else if (expectedState === RENDERED) return "different than expected";
		else if (thisState === NOT_RENDERED || expectedState === NOT_RENDERED) return "";
		else return "achieved differently than expected";
	});

	Me.prototype.toString = function toString() {
		return this._state;
	};

}());
},{"../util/ensure.js":23,"./value.js":30}],29:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var Value = require("./value.js");
var Pixels = require("./pixels.js");

var Me = module.exports = function Size(value) {
	ensure.signature(arguments, [ [Number, Pixels] ]);

	this._value = (typeof value === "number") ? Pixels.create(value) : value;
};
Value.extend(Me);

Me.create = function create(value) {
	return new Me(value);
};

Me.createNone = function createNone() {
	ensure.signature(arguments, []);

	return new Me(Pixels.NONE);
};

Me.prototype.compatibility = function compatibility() {
	return [ Me ];
};

Me.prototype.plus = Value.safe(function plus(operand) {
	return new Me(this._value.plus(operand._value));
});

Me.prototype.minus = Value.safe(function minus(operand) {
	return new Me(this._value.minus(operand._value));
});

Me.prototype.times = function times(operand) {
	return new Me(this._value.times(operand));
};

Me.prototype.compare = Value.safe(function compare(that) {
	return this._value.compare(that._value);
});

Me.prototype.diff = Value.safe(function diff(expected) {
	var actualValue = this._value;
	var expectedValue = expected._value;

	if (actualValue.equals(expectedValue)) return "";
	if (isNone(expected) && !isNone(this)) return "rendered when not expected";
	if (!isNone(expected) && isNone(this)) return "not rendered";

	var desc = actualValue.compare(expectedValue) > 0 ? " larger than expected" : " smaller than expected";
	return actualValue.diff(expectedValue) + desc;
});

Me.prototype.toString = function toString() {
	ensure.signature(arguments, []);

	if (isNone(this)) return "not rendered";
	else return this._value.toString();
};

Me.prototype.toPixels = function toPixels() {
	ensure.signature(arguments, []);
	return this._value;
};

function isNone(size) {
	return size._value.equals(Pixels.NONE);
}
},{"../util/ensure.js":23,"./pixels.js":26,"./value.js":30}],30:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var oop = require("../util/oop.js");
var shim = require("../util/shim.js");

var Me = module.exports = function Value() {};
Me.extend = oop.extendFn(Me);
oop.makeAbstract(Me, [
	"compatibility",
	"diff",
	"toString"
]);

Me.safe = function safe(fn) {
	return function() {
		ensureCompatibility(this, this.compatibility(), arguments);
		return fn.apply(this, arguments);
	};
};

Me.prototype.value = function value() {
	ensure.signature(arguments, []);
	return this;
};

Me.prototype.equals = function equals(that) {
	return this.diff(that) === "";
};

function ensureCompatibility(self, compatible, args) {
	var arg;
	for (var i = 0; i < args.length; i++) {   // args is not an Array, can't use forEach
		arg = args[i];
		checkOneArg(self, compatible, arg);
	}
}

function checkOneArg(self, compatible, arg) {
	var type = typeof arg;
	if (arg === null) type = "null";
	if (type !== "object") throwError(type);

	for (var i = 0; i < compatible.length; i++) {
		if (arg instanceof compatible[i]) return;
	}
	throwError(oop.instanceName(arg));

	function throwError(type) {
		throw new Error(oop.instanceName(self) + " isn't compatible with " + type);
	}
}
},{"../util/ensure.js":23,"../util/oop.js":24,"../util/shim.js":25}],31:[function(require,module,exports){
(function (process,global){
/*!
 * async
 * https://github.com/caolan/async
 *
 * Copyright 2010-2014 Caolan McMahon
 * Released under the MIT license
 */
(function () {

    var async = {};
    function noop() {}
    function identity(v) {
        return v;
    }
    function toBool(v) {
        return !!v;
    }
    function notId(v) {
        return !v;
    }

    // global on the server, window in the browser
    var previous_async;

    // Establish the root object, `window` (`self`) in the browser, `global`
    // on the server, or `this` in some virtual machines. We use `self`
    // instead of `window` for `WebWorker` support.
    var root = typeof self === 'object' && self.self === self && self ||
            typeof global === 'object' && global.global === global && global ||
            this;

    if (root != null) {
        previous_async = root.async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    function only_once(fn) {
        return function() {
            if (fn === null) throw new Error("Callback was already called.");
            fn.apply(this, arguments);
            fn = null;
        };
    }

    function _once(fn) {
        return function() {
            if (fn === null) return;
            fn.apply(this, arguments);
            fn = null;
        };
    }

    //// cross-browser compatiblity functions ////

    var _toString = Object.prototype.toString;

    var _isArray = Array.isArray || function (obj) {
        return _toString.call(obj) === '[object Array]';
    };

    // Ported from underscore.js isObject
    var _isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    function _isArrayLike(arr) {
        return _isArray(arr) || (
            // has a positive integer length property
            typeof arr.length === "number" &&
            arr.length >= 0 &&
            arr.length % 1 === 0
        );
    }

    function _each(coll, iterator) {
        return _isArrayLike(coll) ?
            _arrayEach(coll, iterator) :
            _forEachOf(coll, iterator);
    }

    function _arrayEach(arr, iterator) {
        var index = -1,
            length = arr.length;

        while (++index < length) {
            iterator(arr[index], index, arr);
        }
    }

    function _map(arr, iterator) {
        var index = -1,
            length = arr.length,
            result = Array(length);

        while (++index < length) {
            result[index] = iterator(arr[index], index, arr);
        }
        return result;
    }

    function _range(count) {
        return _map(Array(count), function (v, i) { return i; });
    }

    function _reduce(arr, iterator, memo) {
        _arrayEach(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    }

    function _forEachOf(object, iterator) {
        _arrayEach(_keys(object), function (key) {
            iterator(object[key], key);
        });
    }

    function _indexOf(arr, item) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === item) return i;
        }
        return -1;
    }

    var _keys = Object.keys || function (obj) {
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    function _keyIterator(coll) {
        var i = -1;
        var len;
        var keys;
        if (_isArrayLike(coll)) {
            len = coll.length;
            return function next() {
                i++;
                return i < len ? i : null;
            };
        } else {
            keys = _keys(coll);
            len = keys.length;
            return function next() {
                i++;
                return i < len ? keys[i] : null;
            };
        }
    }

    // Similar to ES6's rest param (http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)
    // This accumulates the arguments passed into an array, after a given index.
    // From underscore.js (https://github.com/jashkenas/underscore/pull/2140).
    function _restParam(func, startIndex) {
        startIndex = startIndex == null ? func.length - 1 : +startIndex;
        return function() {
            var length = Math.max(arguments.length - startIndex, 0);
            var rest = Array(length);
            for (var index = 0; index < length; index++) {
                rest[index] = arguments[index + startIndex];
            }
            switch (startIndex) {
                case 0: return func.call(this, rest);
                case 1: return func.call(this, arguments[0], rest);
            }
            // Currently unused but handle cases outside of the switch statement:
            // var args = Array(startIndex + 1);
            // for (index = 0; index < startIndex; index++) {
            //     args[index] = arguments[index];
            // }
            // args[startIndex] = rest;
            // return func.apply(this, args);
        };
    }

    function _withoutIndex(iterator) {
        return function (value, index, callback) {
            return iterator(value, callback);
        };
    }

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////

    // capture the global reference to guard against fakeTimer mocks
    var _setImmediate = typeof setImmediate === 'function' && setImmediate;

    var _delay = _setImmediate ? function(fn) {
        // not a direct alias for IE10 compatibility
        _setImmediate(fn);
    } : function(fn) {
        setTimeout(fn, 0);
    };

    if (typeof process === 'object' && typeof process.nextTick === 'function') {
        async.nextTick = process.nextTick;
    } else {
        async.nextTick = _delay;
    }
    async.setImmediate = _setImmediate ? _delay : async.nextTick;


    async.forEach =
    async.each = function (arr, iterator, callback) {
        return async.eachOf(arr, _withoutIndex(iterator), callback);
    };

    async.forEachSeries =
    async.eachSeries = function (arr, iterator, callback) {
        return async.eachOfSeries(arr, _withoutIndex(iterator), callback);
    };


    async.forEachLimit =
    async.eachLimit = function (arr, limit, iterator, callback) {
        return _eachOfLimit(limit)(arr, _withoutIndex(iterator), callback);
    };

    async.forEachOf =
    async.eachOf = function (object, iterator, callback) {
        callback = _once(callback || noop);
        object = object || [];
        var size = _isArrayLike(object) ? object.length : _keys(object).length;
        var completed = 0;
        if (!size) {
            return callback(null);
        }
        _each(object, function (value, key) {
            iterator(object[key], key, only_once(done));
        });
        function done(err) {
            if (err) {
                callback(err);
            }
            else {
                completed += 1;
                if (completed >= size) {
                    callback(null);
                }
            }
        }
    };

    async.forEachOfSeries =
    async.eachOfSeries = function (obj, iterator, callback) {
        callback = _once(callback || noop);
        obj = obj || [];
        var nextKey = _keyIterator(obj);
        var key = nextKey();
        function iterate() {
            var sync = true;
            if (key === null) {
                return callback(null);
            }
            iterator(obj[key], key, only_once(function (err) {
                if (err) {
                    callback(err);
                }
                else {
                    key = nextKey();
                    if (key === null) {
                        return callback(null);
                    } else {
                        if (sync) {
                            async.setImmediate(iterate);
                        } else {
                            iterate();
                        }
                    }
                }
            }));
            sync = false;
        }
        iterate();
    };



    async.forEachOfLimit =
    async.eachOfLimit = function (obj, limit, iterator, callback) {
        _eachOfLimit(limit)(obj, iterator, callback);
    };

    function _eachOfLimit(limit) {

        return function (obj, iterator, callback) {
            callback = _once(callback || noop);
            obj = obj || [];
            var nextKey = _keyIterator(obj);
            if (limit <= 0) {
                return callback(null);
            }
            var done = false;
            var running = 0;
            var errored = false;

            (function replenish () {
                if (done && running <= 0) {
                    return callback(null);
                }

                while (running < limit && !errored) {
                    var key = nextKey();
                    if (key === null) {
                        done = true;
                        if (running <= 0) {
                            callback(null);
                        }
                        return;
                    }
                    running += 1;
                    iterator(obj[key], key, only_once(function (err) {
                        running -= 1;
                        if (err) {
                            callback(err);
                            errored = true;
                        }
                        else {
                            replenish();
                        }
                    }));
                }
            })();
        };
    }


    function doParallel(fn) {
        return function (obj, iterator, callback) {
            return fn(async.eachOf, obj, iterator, callback);
        };
    }
    function doParallelLimit(fn) {
        return function (obj, limit, iterator, callback) {
            return fn(_eachOfLimit(limit), obj, iterator, callback);
        };
    }
    function doSeries(fn) {
        return function (obj, iterator, callback) {
            return fn(async.eachOfSeries, obj, iterator, callback);
        };
    }

    function _asyncMap(eachfn, arr, iterator, callback) {
        callback = _once(callback || noop);
        var results = [];
        eachfn(arr, function (value, index, callback) {
            iterator(value, function (err, v) {
                results[index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    }

    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);
    async.mapLimit = doParallelLimit(_asyncMap);

    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.inject =
    async.foldl =
    async.reduce = function (arr, memo, iterator, callback) {
        async.eachOfSeries(arr, function (x, i, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err || null, memo);
        });
    };

    async.foldr =
    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, identity).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };

    function _filter(eachfn, arr, iterator, callback) {
        var results = [];
        eachfn(arr, function (x, index, callback) {
            iterator(x, function (v) {
                if (v) {
                    results.push({index: index, value: x});
                }
                callback();
            });
        }, function () {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    }

    async.select =
    async.filter = doParallel(_filter);

    async.selectLimit =
    async.filterLimit = doParallelLimit(_filter);

    async.selectSeries =
    async.filterSeries = doSeries(_filter);

    function _reject(eachfn, arr, iterator, callback) {
        _filter(eachfn, arr, function(value, cb) {
            iterator(value, function(v) {
                cb(!v);
            });
        }, callback);
    }
    async.reject = doParallel(_reject);
    async.rejectLimit = doParallelLimit(_reject);
    async.rejectSeries = doSeries(_reject);

    function _createTester(eachfn, check, getResult) {
        return function(arr, limit, iterator, cb) {
            function done() {
                if (cb) cb(getResult(false, void 0));
            }
            function iteratee(x, _, callback) {
                if (!cb) return callback();
                iterator(x, function (v) {
                    if (cb && check(v)) {
                        cb(getResult(true, x));
                        cb = iterator = false;
                    }
                    callback();
                });
            }
            if (arguments.length > 3) {
                eachfn(arr, limit, iteratee, done);
            } else {
                cb = iterator;
                iterator = limit;
                eachfn(arr, iteratee, done);
            }
        };
    }

    async.any =
    async.some = _createTester(async.eachOf, toBool, identity);

    async.someLimit = _createTester(async.eachOfLimit, toBool, identity);

    async.all =
    async.every = _createTester(async.eachOf, notId, notId);

    async.everyLimit = _createTester(async.eachOfLimit, notId, notId);

    function _findGetResult(v, x) {
        return x;
    }
    async.detect = _createTester(async.eachOf, identity, _findGetResult);
    async.detectSeries = _createTester(async.eachOfSeries, identity, _findGetResult);
    async.detectLimit = _createTester(async.eachOfLimit, identity, _findGetResult);

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                callback(null, _map(results.sort(comparator), function (x) {
                    return x.value;
                }));
            }

        });

        function comparator(left, right) {
            var a = left.criteria, b = right.criteria;
            return a < b ? -1 : a > b ? 1 : 0;
        }
    };

    async.auto = function (tasks, callback) {
        callback = _once(callback || noop);
        var keys = _keys(tasks);
        var remainingTasks = keys.length;
        if (!remainingTasks) {
            return callback(null);
        }

        var results = {};

        var listeners = [];
        function addListener(fn) {
            listeners.unshift(fn);
        }
        function removeListener(fn) {
            var idx = _indexOf(listeners, fn);
            if (idx >= 0) listeners.splice(idx, 1);
        }
        function taskComplete() {
            remainingTasks--;
            _arrayEach(listeners.slice(0), function (fn) {
                fn();
            });
        }

        addListener(function () {
            if (!remainingTasks) {
                callback(null, results);
            }
        });

        _arrayEach(keys, function (k) {
            var task = _isArray(tasks[k]) ? tasks[k]: [tasks[k]];
            var taskCallback = _restParam(function(err, args) {
                if (args.length <= 1) {
                    args = args[0];
                }
                if (err) {
                    var safeResults = {};
                    _forEachOf(results, function(val, rkey) {
                        safeResults[rkey] = val;
                    });
                    safeResults[k] = args;
                    callback(err, safeResults);
                }
                else {
                    results[k] = args;
                    async.setImmediate(taskComplete);
                }
            });
            var requires = task.slice(0, task.length - 1);
            // prevent dead-locks
            var len = requires.length;
            var dep;
            while (len--) {
                if (!(dep = tasks[requires[len]])) {
                    throw new Error('Has inexistant dependency');
                }
                if (_isArray(dep) && _indexOf(dep, k) >= 0) {
                    throw new Error('Has cyclic dependencies');
                }
            }
            function ready() {
                return _reduce(requires, function (a, x) {
                    return (a && results.hasOwnProperty(x));
                }, true) && !results.hasOwnProperty(k);
            }
            if (ready()) {
                task[task.length - 1](taskCallback, results);
            }
            else {
                addListener(listener);
            }
            function listener() {
                if (ready()) {
                    removeListener(listener);
                    task[task.length - 1](taskCallback, results);
                }
            }
        });
    };



    async.retry = function(times, task, callback) {
        var DEFAULT_TIMES = 5;
        var DEFAULT_INTERVAL = 0;

        var attempts = [];

        var opts = {
            times: DEFAULT_TIMES,
            interval: DEFAULT_INTERVAL
        };

        function parseTimes(acc, t){
            if(typeof t === 'number'){
                acc.times = parseInt(t, 10) || DEFAULT_TIMES;
            } else if(typeof t === 'object'){
                acc.times = parseInt(t.times, 10) || DEFAULT_TIMES;
                acc.interval = parseInt(t.interval, 10) || DEFAULT_INTERVAL;
            } else {
                throw new Error('Unsupported argument type for \'times\': ' + typeof t);
            }
        }

        var length = arguments.length;
        if (length < 1 || length > 3) {
            throw new Error('Invalid arguments - must be either (task), (task, callback), (times, task) or (times, task, callback)');
        } else if (length <= 2 && typeof times === 'function') {
            callback = task;
            task = times;
        }
        if (typeof times !== 'function') {
            parseTimes(opts, times);
        }
        opts.callback = callback;
        opts.task = task;

        function wrappedTask(wrappedCallback, wrappedResults) {
            function retryAttempt(task, finalAttempt) {
                return function(seriesCallback) {
                    task(function(err, result){
                        seriesCallback(!err || finalAttempt, {err: err, result: result});
                    }, wrappedResults);
                };
            }

            function retryInterval(interval){
                return function(seriesCallback){
                    setTimeout(function(){
                        seriesCallback(null);
                    }, interval);
                };
            }

            while (opts.times) {

                var finalAttempt = !(opts.times-=1);
                attempts.push(retryAttempt(opts.task, finalAttempt));
                if(!finalAttempt && opts.interval > 0){
                    attempts.push(retryInterval(opts.interval));
                }
            }

            async.series(attempts, function(done, data){
                data = data[data.length - 1];
                (wrappedCallback || opts.callback)(data.err, data.result);
            });
        }

        // If a callback is passed, run this as a controll flow
        return opts.callback ? wrappedTask() : wrappedTask;
    };

    async.waterfall = function (tasks, callback) {
        callback = _once(callback || noop);
        if (!_isArray(tasks)) {
            var err = new Error('First argument to waterfall must be an array of functions');
            return callback(err);
        }
        if (!tasks.length) {
            return callback();
        }
        function wrapIterator(iterator) {
            return _restParam(function (err, args) {
                if (err) {
                    callback.apply(null, [err].concat(args));
                }
                else {
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    ensureAsync(iterator).apply(null, args);
                }
            });
        }
        wrapIterator(async.iterator(tasks))();
    };

    function _parallel(eachfn, tasks, callback) {
        callback = callback || noop;
        var results = _isArrayLike(tasks) ? [] : {};

        eachfn(tasks, function (task, key, callback) {
            task(_restParam(function (err, args) {
                if (args.length <= 1) {
                    args = args[0];
                }
                results[key] = args;
                callback(err);
            }));
        }, function (err) {
            callback(err, results);
        });
    }

    async.parallel = function (tasks, callback) {
        _parallel(async.eachOf, tasks, callback);
    };

    async.parallelLimit = function(tasks, limit, callback) {
        _parallel(_eachOfLimit(limit), tasks, callback);
    };

    async.series = function(tasks, callback) {
        _parallel(async.eachOfSeries, tasks, callback);
    };

    async.iterator = function (tasks) {
        function makeCallback(index) {
            function fn() {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            }
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        }
        return makeCallback(0);
    };

    async.apply = _restParam(function (fn, args) {
        return _restParam(function (callArgs) {
            return fn.apply(
                null, args.concat(callArgs)
            );
        });
    });

    function _concat(eachfn, arr, fn, callback) {
        var result = [];
        eachfn(arr, function (x, index, cb) {
            fn(x, function (err, y) {
                result = result.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, result);
        });
    }
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        callback = callback || noop;
        if (test()) {
            var next = _restParam(function(err, args) {
                if (err) {
                    callback(err);
                } else if (test.apply(this, args)) {
                    iterator(next);
                } else {
                    callback(null);
                }
            });
            iterator(next);
        } else {
            callback(null);
        }
    };

    async.doWhilst = function (iterator, test, callback) {
        var calls = 0;
        return async.whilst(function() {
            return ++calls <= 1 || test.apply(this, arguments);
        }, iterator, callback);
    };

    async.until = function (test, iterator, callback) {
        return async.whilst(function() {
            return !test.apply(this, arguments);
        }, iterator, callback);
    };

    async.doUntil = function (iterator, test, callback) {
        return async.doWhilst(iterator, function() {
            return !test.apply(this, arguments);
        }, callback);
    };

    async.during = function (test, iterator, callback) {
        callback = callback || noop;

        var next = _restParam(function(err, args) {
            if (err) {
                callback(err);
            } else {
                args.push(check);
                test.apply(this, args);
            }
        });

        var check = function(err, truth) {
            if (err) {
                callback(err);
            } else if (truth) {
                iterator(next);
            } else {
                callback(null);
            }
        };

        test(check);
    };

    async.doDuring = function (iterator, test, callback) {
        var calls = 0;
        async.during(function(next) {
            if (calls++ < 1) {
                next(null, true);
            } else {
                test.apply(this, arguments);
            }
        }, iterator, callback);
    };

    function _queue(worker, concurrency, payload) {
        if (concurrency == null) {
            concurrency = 1;
        }
        else if(concurrency === 0) {
            throw new Error('Concurrency must not be zero');
        }
        function _insert(q, data, pos, callback) {
            if (callback != null && typeof callback !== "function") {
                throw new Error("task callback must be a function");
            }
            q.started = true;
            if (!_isArray(data)) {
                data = [data];
            }
            if(data.length === 0 && q.idle()) {
                // call drain immediately if there are no tasks
                return async.setImmediate(function() {
                    q.drain();
                });
            }
            _arrayEach(data, function(task) {
                var item = {
                    data: task,
                    callback: callback || noop
                };

                if (pos) {
                    q.tasks.unshift(item);
                } else {
                    q.tasks.push(item);
                }

                if (q.tasks.length === q.concurrency) {
                    q.saturated();
                }
            });
            async.setImmediate(q.process);
        }
        function _next(q, tasks) {
            return function(){
                workers -= 1;
                var args = arguments;
                _arrayEach(tasks, function (task) {
                    task.callback.apply(task, args);
                });
                if (q.tasks.length + workers === 0) {
                    q.drain();
                }
                q.process();
            };
        }

        var workers = 0;
        var q = {
            tasks: [],
            concurrency: concurrency,
            payload: payload,
            saturated: noop,
            empty: noop,
            drain: noop,
            started: false,
            paused: false,
            push: function (data, callback) {
                _insert(q, data, false, callback);
            },
            kill: function () {
                q.drain = noop;
                q.tasks = [];
            },
            unshift: function (data, callback) {
                _insert(q, data, true, callback);
            },
            process: function () {
                if (!q.paused && workers < q.concurrency && q.tasks.length) {
                    while(workers < q.concurrency && q.tasks.length){
                        var tasks = q.payload ?
                            q.tasks.splice(0, q.payload) :
                            q.tasks.splice(0, q.tasks.length);

                        var data = _map(tasks, function (task) {
                            return task.data;
                        });

                        if (q.tasks.length === 0) {
                            q.empty();
                        }
                        workers += 1;
                        var cb = only_once(_next(q, tasks));
                        worker(data, cb);
                    }
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            },
            idle: function() {
                return q.tasks.length + workers === 0;
            },
            pause: function () {
                q.paused = true;
            },
            resume: function () {
                if (q.paused === false) { return; }
                q.paused = false;
                var resumeCount = Math.min(q.concurrency, q.tasks.length);
                // Need to call q.process once per concurrent
                // worker to preserve full concurrency after pause
                for (var w = 1; w <= resumeCount; w++) {
                    async.setImmediate(q.process);
                }
            }
        };
        return q;
    }

    async.queue = function (worker, concurrency) {
        var q = _queue(function (items, cb) {
            worker(items[0], cb);
        }, concurrency, 1);

        return q;
    };

    async.priorityQueue = function (worker, concurrency) {

        function _compareTasks(a, b){
            return a.priority - b.priority;
        }

        function _binarySearch(sequence, item, compare) {
            var beg = -1,
                end = sequence.length - 1;
            while (beg < end) {
                var mid = beg + ((end - beg + 1) >>> 1);
                if (compare(item, sequence[mid]) >= 0) {
                    beg = mid;
                } else {
                    end = mid - 1;
                }
            }
            return beg;
        }

        function _insert(q, data, priority, callback) {
            if (callback != null && typeof callback !== "function") {
                throw new Error("task callback must be a function");
            }
            q.started = true;
            if (!_isArray(data)) {
                data = [data];
            }
            if(data.length === 0) {
                // call drain immediately if there are no tasks
                return async.setImmediate(function() {
                    q.drain();
                });
            }
            _arrayEach(data, function(task) {
                var item = {
                    data: task,
                    priority: priority,
                    callback: typeof callback === 'function' ? callback : noop
                };

                q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);

                if (q.tasks.length === q.concurrency) {
                    q.saturated();
                }
                async.setImmediate(q.process);
            });
        }

        // Start with a normal queue
        var q = async.queue(worker, concurrency);

        // Override push to accept second parameter representing priority
        q.push = function (data, priority, callback) {
            _insert(q, data, priority, callback);
        };

        // Remove unshift function
        delete q.unshift;

        return q;
    };

    async.cargo = function (worker, payload) {
        return _queue(worker, 1, payload);
    };

    function _console_fn(name) {
        return _restParam(function (fn, args) {
            fn.apply(null, args.concat([_restParam(function (err, args) {
                if (typeof console === 'object') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _arrayEach(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            })]));
        });
    }
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        var queues = {};
        hasher = hasher || identity;
        var memoized = _restParam(function memoized(args) {
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (key in memo) {
                async.setImmediate(function () {
                    callback.apply(null, memo[key]);
                });
            }
            else if (key in queues) {
                queues[key].push(callback);
            }
            else {
                queues[key] = [callback];
                fn.apply(null, args.concat([_restParam(function (args) {
                    memo[key] = args;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                        q[i].apply(null, args);
                    }
                })]));
            }
        });
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
    };

    async.unmemoize = function (fn) {
        return function () {
            return (fn.unmemoized || fn).apply(null, arguments);
        };
    };

    function _times(mapper) {
        return function (count, iterator, callback) {
            mapper(_range(count), iterator, callback);
        };
    }

    async.times = _times(async.map);
    async.timesSeries = _times(async.mapSeries);
    async.timesLimit = function (count, limit, iterator, callback) {
        return async.mapLimit(_range(count), limit, iterator, callback);
    };

    async.seq = function (/* functions... */) {
        var fns = arguments;
        return _restParam(function (args) {
            var that = this;

            var callback = args[args.length - 1];
            if (typeof callback == 'function') {
                args.pop();
            } else {
                callback = noop;
            }

            async.reduce(fns, args, function (newargs, fn, cb) {
                fn.apply(that, newargs.concat([_restParam(function (err, nextargs) {
                    cb(err, nextargs);
                })]));
            },
            function (err, results) {
                callback.apply(that, [err].concat(results));
            });
        });
    };

    async.compose = function (/* functions... */) {
        return async.seq.apply(null, Array.prototype.reverse.call(arguments));
    };


    function _applyEach(eachfn) {
        return _restParam(function(fns, args) {
            var go = _restParam(function(args) {
                var that = this;
                var callback = args.pop();
                return eachfn(fns, function (fn, _, cb) {
                    fn.apply(that, args.concat([cb]));
                },
                callback);
            });
            if (args.length) {
                return go.apply(this, args);
            }
            else {
                return go;
            }
        });
    }

    async.applyEach = _applyEach(async.eachOf);
    async.applyEachSeries = _applyEach(async.eachOfSeries);


    async.forever = function (fn, callback) {
        var done = only_once(callback || noop);
        var task = ensureAsync(fn);
        function next(err) {
            if (err) {
                return done(err);
            }
            task(next);
        }
        next();
    };

    function ensureAsync(fn) {
        return _restParam(function (args) {
            var callback = args.pop();
            args.push(function () {
                var innerArgs = arguments;
                if (sync) {
                    async.setImmediate(function () {
                        callback.apply(null, innerArgs);
                    });
                } else {
                    callback.apply(null, innerArgs);
                }
            });
            var sync = true;
            fn.apply(this, args);
            sync = false;
        });
    }

    async.ensureAsync = ensureAsync;

    async.constant = _restParam(function(values) {
        var args = [null].concat(values);
        return function (callback) {
            return callback.apply(this, args);
        };
    });

    async.wrapSync =
    async.asyncify = function asyncify(func) {
        return _restParam(function (args) {
            var callback = args.pop();
            var result;
            try {
                result = func.apply(this, args);
            } catch (e) {
                return callback(e);
            }
            // if result is Promise object
            if (_isObject(result) && typeof result.then === "function") {
                result.then(function(value) {
                    callback(null, value);
                })["catch"](function(err) {
                    callback(err.message ? err : new Error(err));
                });
            } else {
                callback(null, result);
            }
        });
    };

    // Node.js
    if (typeof module === 'object' && module.exports) {
        module.exports = async;
    }
    // AMD / RequireJS
    else if (typeof define === 'function' && define.amd) {
        define([], function () {
            return async;
        });
    }
    // included directly via <script> tag
    else {
        root.async = async;
    }

}());

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":1}],32:[function(require,module,exports){
'use strict';
module.exports = function (str) {
	if (str.length === 1) {
		return str;
	}

	return str
	.replace(/^[_.\- ]+/, '')
	.toLowerCase()
	.replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
		return p1.toUpperCase();
	});
};

},{}]},{},[22])(22)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwic3JjL2Fzc2VydGFibGUuanMiLCJzcmMvZGVzY3JpcHRvcnMvY2VudGVyLmpzIiwic3JjL2Rlc2NyaXB0b3JzL2Rlc2NyaXB0b3IuanMiLCJzcmMvZGVzY3JpcHRvcnMvZWxlbWVudF9lZGdlLmpzIiwic3JjL2Rlc2NyaXB0b3JzL2VsZW1lbnRfcmVuZGVyZWQuanMiLCJzcmMvZGVzY3JpcHRvcnMvZWxlbWVudF9zaXplLmpzIiwic3JjL2Rlc2NyaXB0b3JzL3BhZ2VfZWRnZS5qcyIsInNyYy9kZXNjcmlwdG9ycy9wYWdlX3NpemUuanMiLCJzcmMvZGVzY3JpcHRvcnMvcG9zaXRpb25fZGVzY3JpcHRvci5qcyIsInNyYy9kZXNjcmlwdG9ycy9yZWxhdGl2ZV9wb3NpdGlvbi5qcyIsInNyYy9kZXNjcmlwdG9ycy9yZWxhdGl2ZV9zaXplLmpzIiwic3JjL2Rlc2NyaXB0b3JzL3NpemVfZGVzY3JpcHRvci5qcyIsInNyYy9kZXNjcmlwdG9ycy9zaXplX211bHRpcGxlLmpzIiwic3JjL2Rlc2NyaXB0b3JzL3ZpZXdwb3J0X2VkZ2UuanMiLCJzcmMvZGVzY3JpcHRvcnMvdmlld3BvcnRfc2l6ZS5qcyIsInNyYy9xX2VsZW1lbnQuanMiLCJzcmMvcV9lbGVtZW50X2xpc3QuanMiLCJzcmMvcV9mcmFtZS5qcyIsInNyYy9xX3BhZ2UuanMiLCJzcmMvcV92aWV3cG9ydC5qcyIsInNyYy9xdWl4b3RlLmpzIiwic3JjL3V0aWwvZW5zdXJlLmpzIiwic3JjL3V0aWwvb29wLmpzIiwic3JjL3V0aWwvc2hpbS5qcyIsInNyYy92YWx1ZXMvcGl4ZWxzLmpzIiwic3JjL3ZhbHVlcy9wb3NpdGlvbi5qcyIsInNyYy92YWx1ZXMvcmVuZGVyX3N0YXRlLmpzIiwic3JjL3ZhbHVlcy9zaXplLmpzIiwic3JjL3ZhbHVlcy92YWx1ZS5qcyIsInZlbmRvci9hc3luYy0xLjQuMi5qcyIsInZlbmRvci9jYW1lbGNhc2UtMS4wLjEtbW9kaWZpZWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0c0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxNSBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuL3V0aWwvZW5zdXJlLmpzXCIpO1xudmFyIG9vcCA9IHJlcXVpcmUoXCIuL3V0aWwvb29wLmpzXCIpO1xudmFyIHNoaW0gPSByZXF1aXJlKFwiLi91dGlsL3NoaW0uanNcIik7XG5cbnZhciBNZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQXNzZXJ0YWJsZSgpIHtcblx0ZW5zdXJlLnVucmVhY2hhYmxlKFwiQXNzZXJ0YWJsZSBpcyBhYnN0cmFjdCBhbmQgc2hvdWxkIG5vdCBiZSBjb25zdHJ1Y3RlZCBkaXJlY3RseS5cIik7XG59O1xuTWUuZXh0ZW5kID0gb29wLmV4dGVuZEZuKE1lKTtcbm9vcC5tYWtlQWJzdHJhY3QoTWUsIFtdKTtcblxuTWUucHJvdG90eXBlLmFzc2VydCA9IGZ1bmN0aW9uIGFzc2VydChleHBlY3RlZCwgbWVzc2FnZSkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBPYmplY3QsIFt1bmRlZmluZWQsIFN0cmluZ10gXSk7XG5cdGlmIChtZXNzYWdlID09PSB1bmRlZmluZWQpIG1lc3NhZ2UgPSBcIkRpZmZlcmVuY2VzIGZvdW5kXCI7XG5cblx0dmFyIGRpZmYgPSB0aGlzLmRpZmYoZXhwZWN0ZWQpO1xuXHRpZiAoZGlmZiAhPT0gXCJcIikgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgKyBcIjpcXG5cIiArIGRpZmYgKyBcIlxcblwiKTtcbn07XG5cbk1lLnByb3RvdHlwZS5kaWZmID0gZnVuY3Rpb24gZGlmZihleHBlY3RlZCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBPYmplY3QgXSk7XG5cblx0dmFyIHJlc3VsdCA9IFtdO1xuXHR2YXIga2V5cyA9IHNoaW0uT2JqZWN0LmtleXMoZXhwZWN0ZWQpO1xuXHR2YXIga2V5LCBvbmVEaWZmLCBkZXNjcmlwdG9yO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0XHRrZXkgPSBrZXlzW2ldO1xuXHRcdGRlc2NyaXB0b3IgPSB0aGlzW2tleV07XG5cdFx0ZW5zdXJlLnRoYXQoXG5cdFx0XHRcdGRlc2NyaXB0b3IgIT09IHVuZGVmaW5lZCxcblx0XHRcdFx0dGhpcyArIFwiIGRvZXNuJ3QgaGF2ZSBhIHByb3BlcnR5IG5hbWVkICdcIiArIGtleSArIFwiJy4gRGlkIHlvdSBtaXNzcGVsbCBpdD9cIlxuXHRcdCk7XG5cdFx0b25lRGlmZiA9IGRlc2NyaXB0b3IuZGlmZihleHBlY3RlZFtrZXldKTtcblx0XHRpZiAob25lRGlmZiAhPT0gXCJcIikgcmVzdWx0LnB1c2gob25lRGlmZik7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcXG5cIik7XG59O1xuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE0IFRpdGFuaXVtIEkuVC4gTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBGb3IgbGljZW5zZSwgc2VlIFwiUkVBRE1FXCIgb3IgXCJMSUNFTlNFXCIgZmlsZS5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgZW5zdXJlID0gcmVxdWlyZShcIi4uL3V0aWwvZW5zdXJlLmpzXCIpO1xudmFyIFBvc2l0aW9uRGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuL3Bvc2l0aW9uX2Rlc2NyaXB0b3IuanNcIik7XG52YXIgUG9zaXRpb24gPSByZXF1aXJlKFwiLi4vdmFsdWVzL3Bvc2l0aW9uLmpzXCIpO1xudmFyIFJlbGF0aXZlUG9zaXRpb24gPSByZXF1aXJlKFwiLi9yZWxhdGl2ZV9wb3NpdGlvbi5qc1wiKTtcblxudmFyIFhfRElNRU5TSU9OID0gXCJ4XCI7XG52YXIgWV9ESU1FTlNJT04gPSBcInlcIjtcblxudmFyIE1lID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBDZW50ZXIoZGltZW5zaW9uLCBwb3NpdGlvbjEsIHBvc2l0aW9uMiwgZGVzY3JpcHRpb24pIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgU3RyaW5nLCBQb3NpdGlvbkRlc2NyaXB0b3IsIFBvc2l0aW9uRGVzY3JpcHRvciwgU3RyaW5nIF0pO1xuXG5cdGlmIChkaW1lbnNpb24gPT09IFhfRElNRU5TSU9OKSBQb3NpdGlvbkRlc2NyaXB0b3IueCh0aGlzKTtcblx0ZWxzZSBpZiAoZGltZW5zaW9uID09PSBZX0RJTUVOU0lPTikgUG9zaXRpb25EZXNjcmlwdG9yLnkodGhpcyk7XG5cdGVsc2UgZW5zdXJlLnVucmVhY2hhYmxlKFwiVW5rbm93biBkaW1lbnNpb246IFwiICsgZGltZW5zaW9uKTtcblxuXHR0aGlzLl9kaW1lbnNpb24gPSBkaW1lbnNpb247XG5cdHRoaXMuX3Bvc2l0aW9uMSA9IHBvc2l0aW9uMTtcblx0dGhpcy5fcG9zaXRpb24yID0gcG9zaXRpb24yO1xuXHR0aGlzLl9kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xufTtcblBvc2l0aW9uRGVzY3JpcHRvci5leHRlbmQoTWUpO1xuXG5NZS54ID0gZmFjdG9yeUZuKFhfRElNRU5TSU9OKTtcbk1lLnkgPSBmYWN0b3J5Rm4oWV9ESU1FTlNJT04pO1xuXG5NZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSgpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9uMS52YWx1ZSgpLm1pZHBvaW50KHRoaXMuX3Bvc2l0aW9uMi52YWx1ZSgpKTtcbn07XG5cbk1lLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXHRyZXR1cm4gdGhpcy5fZGVzY3JpcHRpb247XG59O1xuXG5mdW5jdGlvbiBmYWN0b3J5Rm4oZGltZW5zaW9uKSB7XG5cdHJldHVybiBmdW5jdGlvbihwb3NpdGlvbjEsIHBvc2l0aW9uMiwgZGVzY3JpcHRpb24pIHtcblx0XHRyZXR1cm4gbmV3IE1lKGRpbWVuc2lvbiwgcG9zaXRpb24xLCBwb3NpdGlvbjIsIGRlc2NyaXB0aW9uKTtcblx0fTtcbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxNCBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vuc3VyZS5qc1wiKTtcbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vdXRpbC9vb3AuanNcIik7XG52YXIgVmFsdWUgPSByZXF1aXJlKFwiLi4vdmFsdWVzL3ZhbHVlLmpzXCIpO1xuXG52YXIgTWUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIERlc2NyaXB0b3IoKSB7XG5cdGVuc3VyZS51bnJlYWNoYWJsZShcIkRlc2NyaXB0b3IgaXMgYWJzdHJhY3QgYW5kIHNob3VsZCBub3QgYmUgY29uc3RydWN0ZWQgZGlyZWN0bHkuXCIpO1xufTtcbk1lLmV4dGVuZCA9IG9vcC5leHRlbmRGbihNZSk7XG5vb3AubWFrZUFic3RyYWN0KE1lLCBbXG5cdFwidmFsdWVcIixcblx0XCJ0b1N0cmluZ1wiXG5dKTtcblxuTWUucHJvdG90eXBlLmRpZmYgPSBmdW5jdGlvbiBkaWZmKGV4cGVjdGVkKSB7XG5cdGV4cGVjdGVkID0gbm9ybWFsaXplVHlwZSh0aGlzLCBleHBlY3RlZCk7XG5cdHRyeSB7XG5cdFx0dmFyIGFjdHVhbFZhbHVlID0gdGhpcy52YWx1ZSgpO1xuXHRcdHZhciBleHBlY3RlZFZhbHVlID0gZXhwZWN0ZWQudmFsdWUoKTtcblxuXHRcdGlmIChhY3R1YWxWYWx1ZS5lcXVhbHMoZXhwZWN0ZWRWYWx1ZSkpIHJldHVybiBcIlwiO1xuXG5cdFx0dmFyIGRpZmZlcmVuY2UgPSBhY3R1YWxWYWx1ZS5kaWZmKGV4cGVjdGVkVmFsdWUpO1xuXHRcdHZhciBleHBlY3RlZERlc2MgPSBleHBlY3RlZFZhbHVlLnRvU3RyaW5nKCk7XG5cdFx0aWYgKGV4cGVjdGVkIGluc3RhbmNlb2YgTWUpIGV4cGVjdGVkRGVzYyArPSBcIiAoXCIgKyBleHBlY3RlZCArIFwiKVwiO1xuXG5cdFx0cmV0dXJuIHRoaXMgKyBcIiB3YXMgXCIgKyBkaWZmZXJlbmNlICsgXCIuXFxuXCIgK1xuXHRcdFx0XCIgIEV4cGVjdGVkOiBcIiArIGV4cGVjdGVkRGVzYyArIFwiXFxuXCIgK1xuXHRcdFx0XCIgIEJ1dCB3YXM6ICBcIiArIGFjdHVhbFZhbHVlO1xuXHR9XG5cdGNhdGNoIChlcnIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBjb21wYXJlIFwiICsgdGhpcyArIFwiIHRvIFwiICsgZXhwZWN0ZWQgKyBcIjogXCIgKyBlcnIubWVzc2FnZSk7XG5cdH1cbn07XG5cbk1lLnByb3RvdHlwZS5jb252ZXJ0ID0gZnVuY3Rpb24gY29udmVydChhcmcsIHR5cGUpIHtcblx0Ly8gVGhpcyBtZXRob2QgaXMgbWVhbnQgdG8gYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzLiBJdCBzaG91bGQgcmV0dXJuICd1bmRlZmluZWQnIHdoZW4gYW4gYXJndW1lbnRcblx0Ly8gY2FuJ3QgYmUgY29udmVydGVkLiBJbiB0aGlzIGRlZmF1bHQgaW1wbGVtZW50YXRpb24sIG5vIGFyZ3VtZW50cyBjYW4gYmUgY29udmVydGVkLCBzbyB3ZSBhbHdheXNcblx0Ly8gcmV0dXJuICd1bmRlZmluZWQnLlxuXHRyZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuTWUucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyh0aGF0KSB7XG5cdC8vIERlc2NyaXB0b3JzIGFyZW4ndCB2YWx1ZSBvYmplY3RzLiBUaGV5J3JlIG5ldmVyIGVxdWFsIHRvIGFueXRoaW5nLiBCdXQgc29tZXRpbWVzXG5cdC8vIHRoZXkncmUgdXNlZCBpbiB0aGUgc2FtZSBwbGFjZXMgdmFsdWUgb2JqZWN0cyBhcmUgdXNlZCwgYW5kIHRoaXMgbWV0aG9kIGdldHMgY2FsbGVkLlxuXHRyZXR1cm4gZmFsc2U7XG59O1xuXG5mdW5jdGlvbiBub3JtYWxpemVUeXBlKHNlbGYsIGV4cGVjdGVkKSB7XG5cdHZhciBleHBlY3RlZFR5cGUgPSB0eXBlb2YgZXhwZWN0ZWQ7XG5cdGlmIChleHBlY3RlZCA9PT0gbnVsbCkgZXhwZWN0ZWRUeXBlID0gXCJudWxsXCI7XG5cblx0aWYgKGV4cGVjdGVkVHlwZSA9PT0gXCJvYmplY3RcIiAmJiAoZXhwZWN0ZWQgaW5zdGFuY2VvZiBNZSB8fCBleHBlY3RlZCBpbnN0YW5jZW9mIFZhbHVlKSkgcmV0dXJuIGV4cGVjdGVkO1xuXG5cdGlmIChleHBlY3RlZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgY29tcGFyZSBcIiArIHNlbGYgKyBcIiB0byBcIiArIGV4cGVjdGVkICsgXCIuIERpZCB5b3UgbWlzc3BlbGwgYSBwcm9wZXJ0eSBuYW1lP1wiKTtcblx0fVxuXHRlbHNlIGlmIChleHBlY3RlZFR5cGUgPT09IFwib2JqZWN0XCIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBjb21wYXJlIFwiICsgc2VsZiArIFwiIHRvIFwiICsgb29wLmluc3RhbmNlTmFtZShleHBlY3RlZCkgKyBcIiBpbnN0YW5jZXMuXCIpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciBjb252ZXJ0ZWQgPSBzZWxmLmNvbnZlcnQoZXhwZWN0ZWQsIGV4cGVjdGVkVHlwZSk7XG5cdFx0aWYgKGNvbnZlcnRlZCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gY29udmVydGVkO1xuXG5cdFx0dmFyIGV4cGxhbmF0aW9uID0gZXhwZWN0ZWQ7XG5cdFx0aWYgKGV4cGVjdGVkVHlwZSA9PT0gXCJzdHJpbmdcIikgZXhwbGFuYXRpb24gPSBcIidcIiArIGV4cGxhbmF0aW9uICsgXCInXCI7XG5cdFx0aWYgKGV4cGVjdGVkVHlwZSA9PT0gXCJmdW5jdGlvblwiKSBleHBsYW5hdGlvbiA9IFwiYSBmdW5jdGlvblwiO1xuXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgY29tcGFyZSBcIiArIHNlbGYgKyBcIiB0byBcIiArIGV4cGxhbmF0aW9uICsgXCIuXCIpO1xuXHR9XG5cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxNC0yMDE2IFRpdGFuaXVtIEkuVC4gTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBGb3IgbGljZW5zZSwgc2VlIFwiUkVBRE1FXCIgb3IgXCJMSUNFTlNFXCIgZmlsZS5cbihmdW5jdGlvbigpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0dmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vuc3VyZS5qc1wiKTtcblx0dmFyIFBvc2l0aW9uID0gcmVxdWlyZShcIi4uL3ZhbHVlcy9wb3NpdGlvbi5qc1wiKTtcblx0dmFyIFBvc2l0aW9uRGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuL3Bvc2l0aW9uX2Rlc2NyaXB0b3IuanNcIik7XG5cdHZhciBSZW5kZXJTdGF0ZSA9IHJlcXVpcmUoXCIuLi92YWx1ZXMvcmVuZGVyX3N0YXRlLmpzXCIpO1xuXG5cdHZhciBUT1AgPSBcInRvcFwiO1xuXHR2YXIgUklHSFQgPSBcInJpZ2h0XCI7XG5cdHZhciBCT1RUT00gPSBcImJvdHRvbVwiO1xuXHR2YXIgTEVGVCA9IFwibGVmdFwiO1xuXG5cdHZhciBNZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRWxlbWVudEVkZ2UoZWxlbWVudCwgcG9zaXRpb24pIHtcblx0XHR2YXIgUUVsZW1lbnQgPSByZXF1aXJlKFwiLi4vcV9lbGVtZW50LmpzXCIpOyAgICAgIC8vIGJyZWFrIGNpcmN1bGFyIGRlcGVuZGVuY3lcblx0XHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW1FFbGVtZW50LCBTdHJpbmddKTtcblxuXHRcdGlmIChwb3NpdGlvbiA9PT0gTEVGVCB8fCBwb3NpdGlvbiA9PT0gUklHSFQpIFBvc2l0aW9uRGVzY3JpcHRvci54KHRoaXMpO1xuXHRcdGVsc2UgaWYgKHBvc2l0aW9uID09PSBUT1AgfHwgcG9zaXRpb24gPT09IEJPVFRPTSkgUG9zaXRpb25EZXNjcmlwdG9yLnkodGhpcyk7XG5cdFx0ZWxzZSBlbnN1cmUudW5yZWFjaGFibGUoXCJVbmtub3duIHBvc2l0aW9uOiBcIiArIHBvc2l0aW9uKTtcblxuXHRcdHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XG5cdH07XG5cdFBvc2l0aW9uRGVzY3JpcHRvci5leHRlbmQoTWUpO1xuXG5cdE1lLnRvcCA9IGZhY3RvcnlGbihUT1ApO1xuXHRNZS5yaWdodCA9IGZhY3RvcnlGbihSSUdIVCk7XG5cdE1lLmJvdHRvbSA9IGZhY3RvcnlGbihCT1RUT00pO1xuXHRNZS5sZWZ0ID0gZmFjdG9yeUZuKExFRlQpO1xuXG5cdE1lLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uIHZhbHVlKCkge1xuXHRcdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0XHR2YXIgcmF3UG9zaXRpb24gPSB0aGlzLl9lbGVtZW50LmdldFJhd1Bvc2l0aW9uKCk7XG5cblx0XHR2YXIgZWRnZSA9IHJhd1Bvc2l0aW9uW3RoaXMuX3Bvc2l0aW9uXTtcblx0XHR2YXIgc2Nyb2xsID0gdGhpcy5fZWxlbWVudC5mcmFtZS5nZXRSYXdTY3JvbGxQb3NpdGlvbigpO1xuXG5cdFx0aWYgKHRoaXMuX3Bvc2l0aW9uID09PSBSSUdIVCB8fCB0aGlzLl9wb3NpdGlvbiA9PT0gTEVGVCkge1xuXHRcdFx0aWYgKCFlbGVtZW50UmVuZGVyZWQodGhpcykpIHJldHVybiBQb3NpdGlvbi5ub1goKTtcblx0XHRcdHJldHVybiBQb3NpdGlvbi54KGVkZ2UgKyBzY3JvbGwueCk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKCFlbGVtZW50UmVuZGVyZWQodGhpcykpIHJldHVybiBQb3NpdGlvbi5ub1koKTtcblx0XHRcdHJldHVybiBQb3NpdGlvbi55KGVkZ2UgKyBzY3JvbGwueSk7XG5cdFx0fVxuXHR9O1xuXG5cdE1lLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cdFx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9uICsgXCIgZWRnZSBvZiBcIiArIHRoaXMuX2VsZW1lbnQ7XG5cdH07XG5cblx0ZnVuY3Rpb24gZmFjdG9yeUZuKHBvc2l0aW9uKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGZhY3RvcnkoZWxlbWVudCkge1xuXHRcdFx0cmV0dXJuIG5ldyBNZShlbGVtZW50LCBwb3NpdGlvbik7XG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVsZW1lbnRSZW5kZXJlZChzZWxmKSB7XG5cdFx0cmV0dXJuIHNlbGYuX2VsZW1lbnQucmVuZGVyZWQudmFsdWUoKS5lcXVhbHMoUmVuZGVyU3RhdGUucmVuZGVyZWQoKSk7XG5cdH1cblxufSgpKTsiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTYgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuKGZ1bmN0aW9uKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHR2YXIgZW5zdXJlID0gcmVxdWlyZShcIi4uL3V0aWwvZW5zdXJlLmpzXCIpO1xuXHR2YXIgUmVuZGVyU3RhdGUgPSByZXF1aXJlKFwiLi4vdmFsdWVzL3JlbmRlcl9zdGF0ZS5qc1wiKTtcblx0dmFyIERlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi9kZXNjcmlwdG9yLmpzXCIpO1xuXG5cdHZhciBNZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRWxlbWVudFJlbmRlcmVkKGVsZW1lbnQpIHtcblx0XHR2YXIgUUVsZW1lbnQgPSByZXF1aXJlKFwiLi4vcV9lbGVtZW50LmpzXCIpOyAgICAgIC8vIGJyZWFrIGNpcmN1bGFyIGRlcGVuZGVuY3lcblx0XHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBRRWxlbWVudCBdKTtcblxuXHRcdHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuXHR9O1xuXHREZXNjcmlwdG9yLmV4dGVuZChNZSk7XG5cblx0TWUuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGVsZW1lbnQpIHtcblx0XHRyZXR1cm4gbmV3IE1lKGVsZW1lbnQpO1xuXHR9O1xuXG5cdE1lLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uIHZhbHVlKCkge1xuXHRcdGlmICghdGhpcy5fZWxlbWVudC5mcmFtZS5ib2R5KCkudG9Eb21FbGVtZW50KCkuY29udGFpbnModGhpcy5fZWxlbWVudC50b0RvbUVsZW1lbnQoKSkpIHJldHVybiBSZW5kZXJTdGF0ZS5kZXRhY2hlZCgpO1xuXHRcdGVsc2UgaWYgKHRoaXMuX2VsZW1lbnQuZ2V0UmF3U3R5bGUoXCJkaXNwbGF5XCIpID09PSBcIm5vbmVcIikgcmV0dXJuIFJlbmRlclN0YXRlLmRpc3BsYXlOb25lKCk7XG5cdFx0ZWxzZSByZXR1cm4gUmVuZGVyU3RhdGUucmVuZGVyZWQoKTtcblx0fTtcblxuXHRNZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gXCJyZW5kZXIgc3RhdHVzIG9mIFwiICsgdGhpcy5fZWxlbWVudC50b1N0cmluZygpO1xuXHR9O1xuXG5cdE1lLnByb3RvdHlwZS5jb252ZXJ0ID0gZnVuY3Rpb24gY29udmVydChhcmcsIHR5cGUpIHtcblx0ICBpZiAodHlwZSA9PT0gXCJib29sZWFuXCIpIHtcblx0XHQgIHJldHVybiBhcmcgPyBSZW5kZXJTdGF0ZS5yZW5kZXJlZCgpIDogUmVuZGVyU3RhdGUubm90UmVuZGVyZWQoKTtcblx0ICB9XG5cdFx0aWYgKHR5cGUgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdGlmIChhcmcgPT09IFwiZGlzcGxheTpub25lXCIpIHJldHVybiBSZW5kZXJTdGF0ZS5kaXNwbGF5Tm9uZSgpO1xuXHRcdFx0aWYgKGFyZyA9PT0gXCJkZXRhY2hlZFwiKSByZXR1cm4gUmVuZGVyU3RhdGUuZGV0YWNoZWQoKTtcblx0XHR9XG5cdH07XG5cbn0oKSk7IiwiLy8gQ29weXJpZ2h0IChjKSAyMDE0LTIwMTYgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuKGZ1bmN0aW9uKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHR2YXIgZW5zdXJlID0gcmVxdWlyZShcIi4uL3V0aWwvZW5zdXJlLmpzXCIpO1xuXHR2YXIgU2l6ZURlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi9zaXplX2Rlc2NyaXB0b3IuanNcIik7XG5cdHZhciBTaXplID0gcmVxdWlyZShcIi4uL3ZhbHVlcy9zaXplLmpzXCIpO1xuXHR2YXIgUmVuZGVyU3RhdGUgPSByZXF1aXJlKFwiLi4vdmFsdWVzL3JlbmRlcl9zdGF0ZS5qc1wiKTtcblxuXHR2YXIgWF9ESU1FTlNJT04gPSBcIndpZHRoXCI7XG5cdHZhciBZX0RJTUVOU0lPTiA9IFwiaGVpZ2h0XCI7XG5cblx0dmFyIE1lID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBFbGVtZW50U2l6ZShkaW1lbnNpb24sIGVsZW1lbnQpIHtcblx0XHR2YXIgUUVsZW1lbnQgPSByZXF1aXJlKFwiLi4vcV9lbGVtZW50LmpzXCIpOyAgICAvLyBicmVhayBjaXJjdWxhciBkZXBlbmRlbmN5XG5cdFx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtTdHJpbmcsIFFFbGVtZW50XSk7XG5cdFx0ZW5zdXJlLnRoYXQoZGltZW5zaW9uID09PSBYX0RJTUVOU0lPTiB8fCBkaW1lbnNpb24gPT09IFlfRElNRU5TSU9OLCBcIlVucmVjb2duaXplZCBkaW1lbnNpb246IFwiICsgZGltZW5zaW9uKTtcblxuXHRcdHRoaXMuX2RpbWVuc2lvbiA9IGRpbWVuc2lvbjtcblx0XHR0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcblx0fTtcblx0U2l6ZURlc2NyaXB0b3IuZXh0ZW5kKE1lKTtcblxuXHRNZS54ID0gZmFjdG9yeUZuKFhfRElNRU5TSU9OKTtcblx0TWUueSA9IGZhY3RvcnlGbihZX0RJTUVOU0lPTik7XG5cblx0TWUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gdmFsdWUoKSB7XG5cdFx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHRcdGlmICghZWxlbWVudFJlbmRlcmVkKHRoaXMpKSByZXR1cm4gU2l6ZS5jcmVhdGVOb25lKCk7XG5cblx0XHR2YXIgcG9zaXRpb24gPSB0aGlzLl9lbGVtZW50LmdldFJhd1Bvc2l0aW9uKCk7XG5cdFx0cmV0dXJuIFNpemUuY3JlYXRlKHBvc2l0aW9uW3RoaXMuX2RpbWVuc2lvbl0pO1xuXHR9O1xuXG5cdE1lLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0XHRyZXR1cm4gdGhpcy5fZGltZW5zaW9uICsgXCIgb2YgXCIgKyB0aGlzLl9lbGVtZW50O1xuXHR9O1xuXG5cdGZ1bmN0aW9uIGZhY3RvcnlGbihkaW1lbnNpb24pIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gZmFjdG9yeShlbGVtZW50KSB7XG5cdFx0XHRyZXR1cm4gbmV3IE1lKGRpbWVuc2lvbiwgZWxlbWVudCk7XG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVsZW1lbnRSZW5kZXJlZChzZWxmKSB7XG5cdFx0cmV0dXJuIHNlbGYuX2VsZW1lbnQucmVuZGVyZWQudmFsdWUoKS5lcXVhbHMoUmVuZGVyU3RhdGUucmVuZGVyZWQoKSk7XG5cdH1cblxufSgpKTsiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlbnN1cmUgPSByZXF1aXJlKFwiLi4vdXRpbC9lbnN1cmUuanNcIik7XG52YXIgUG9zaXRpb25EZXNjcmlwdG9yID0gcmVxdWlyZShcIi4vcG9zaXRpb25fZGVzY3JpcHRvci5qc1wiKTtcbnZhciBQb3NpdGlvbiA9IHJlcXVpcmUoXCIuLi92YWx1ZXMvcG9zaXRpb24uanNcIik7XG5cbnZhciBUT1AgPSBcInRvcFwiO1xudmFyIFJJR0hUID0gXCJyaWdodFwiO1xudmFyIEJPVFRPTSA9IFwiYm90dG9tXCI7XG52YXIgTEVGVCA9IFwibGVmdFwiO1xuXG52YXIgTWUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFBhZ2VFZGdlKGVkZ2UsIGZyYW1lKSB7XG5cdHZhciBRRnJhbWUgPSByZXF1aXJlKFwiLi4vcV9mcmFtZS5qc1wiKTsgICAgLy8gYnJlYWsgY2lyY3VsYXIgZGVwZW5kZW5jeVxuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBTdHJpbmcsIFFGcmFtZSBdKTtcblxuXHRpZiAoZWRnZSA9PT0gTEVGVCB8fCBlZGdlID09PSBSSUdIVCkgUG9zaXRpb25EZXNjcmlwdG9yLngodGhpcyk7XG5cdGVsc2UgaWYgKGVkZ2UgPT09IFRPUCB8fCBlZGdlID09PSBCT1RUT00pIFBvc2l0aW9uRGVzY3JpcHRvci55KHRoaXMpO1xuXHRlbHNlIGVuc3VyZS51bnJlYWNoYWJsZShcIlVua25vd24gZWRnZTogXCIgKyBlZGdlKTtcblxuXHR0aGlzLl9lZGdlID0gZWRnZTtcblx0dGhpcy5fZnJhbWUgPSBmcmFtZTtcbn07XG5Qb3NpdGlvbkRlc2NyaXB0b3IuZXh0ZW5kKE1lKTtcblxuTWUudG9wID0gZmFjdG9yeUZuKFRPUCk7XG5NZS5yaWdodCA9IGZhY3RvcnlGbihSSUdIVCk7XG5NZS5ib3R0b20gPSBmYWN0b3J5Rm4oQk9UVE9NKTtcbk1lLmxlZnQgPSBmYWN0b3J5Rm4oTEVGVCk7XG5cbk1lLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uIHZhbHVlKCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXG5cdHZhciB4ID0gUG9zaXRpb24ueCgwKTtcblx0dmFyIHkgPSBQb3NpdGlvbi55KDApO1xuXG5cdHN3aXRjaCh0aGlzLl9lZGdlKSB7XG5cdFx0Y2FzZSBUT1A6IHJldHVybiB5O1xuXHRcdGNhc2UgUklHSFQ6IHJldHVybiB4LnBsdXModGhpcy5fZnJhbWUucGFnZSgpLndpZHRoLnZhbHVlKCkpO1xuXHRcdGNhc2UgQk9UVE9NOiByZXR1cm4geS5wbHVzKHRoaXMuX2ZyYW1lLnBhZ2UoKS5oZWlnaHQudmFsdWUoKSk7XG5cdFx0Y2FzZSBMRUZUOiByZXR1cm4geDtcblxuXHRcdGRlZmF1bHQ6IGVuc3VyZS51bnJlYWNoYWJsZSgpO1xuXHR9XG59O1xuXG5NZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHRzd2l0Y2godGhpcy5fZWRnZSkge1xuXHRcdGNhc2UgVE9QOiByZXR1cm4gXCJ0b3Agb2YgcGFnZVwiO1xuXHRcdGNhc2UgUklHSFQ6IHJldHVybiBcInJpZ2h0IHNpZGUgb2YgcGFnZVwiO1xuXHRcdGNhc2UgQk9UVE9NOiByZXR1cm4gXCJib3R0b20gb2YgcGFnZVwiO1xuXHRcdGNhc2UgTEVGVDogcmV0dXJuIFwibGVmdCBzaWRlIG9mIHBhZ2VcIjtcblxuXHRcdGRlZmF1bHQ6IGVuc3VyZS51bnJlYWNoYWJsZSgpO1xuXHR9XG59O1xuXG5mdW5jdGlvbiBmYWN0b3J5Rm4oZWRnZSkge1xuXHRyZXR1cm4gZnVuY3Rpb24gZmFjdG9yeShmcmFtZSkge1xuXHRcdHJldHVybiBuZXcgTWUoZWRnZSwgZnJhbWUpO1xuXHR9O1xufSIsIi8vIENvcHlyaWdodCAoYykgMjAxNCBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vuc3VyZS5qc1wiKTtcbnZhciBTaXplRGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuL3NpemVfZGVzY3JpcHRvci5qc1wiKTtcbnZhciBTaXplID0gcmVxdWlyZShcIi4uL3ZhbHVlcy9zaXplLmpzXCIpO1xuXG52YXIgWF9ESU1FTlNJT04gPSBcIndpZHRoXCI7XG52YXIgWV9ESU1FTlNJT04gPSBcImhlaWdodFwiO1xuXG52YXIgTWUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFBhZ2VTaXplKGRpbWVuc2lvbiwgZnJhbWUpIHtcblx0dmFyIFFGcmFtZSA9IHJlcXVpcmUoXCIuLi9xX2ZyYW1lLmpzXCIpOyAgICAvLyBicmVhayBjaXJjdWxhciBkZXBlbmRlbmN5XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIFN0cmluZywgUUZyYW1lIF0pO1xuXHRlbnN1cmUudGhhdChkaW1lbnNpb24gPT09IFhfRElNRU5TSU9OIHx8IGRpbWVuc2lvbiA9PT0gWV9ESU1FTlNJT04sIFwiVW5yZWNvZ25pemVkIGRpbWVuc2lvbjogXCIgKyBkaW1lbnNpb24pO1xuXG5cdHRoaXMuX2RpbWVuc2lvbiA9IGRpbWVuc2lvbjtcblx0dGhpcy5fZnJhbWUgPSBmcmFtZTtcbn07XG5TaXplRGVzY3JpcHRvci5leHRlbmQoTWUpO1xuXG5NZS54ID0gZmFjdG9yeUZuKFhfRElNRU5TSU9OKTtcbk1lLnkgPSBmYWN0b3J5Rm4oWV9ESU1FTlNJT04pO1xuXG5NZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbigpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHQvLyBVU0VGVUwgUkVBRElORzogaHR0cDovL3d3dy5xdWlya3Ntb2RlLm9yZy9tb2JpbGUvdmlld3BvcnRzLmh0bWxcblx0Ly8gYW5kIGh0dHA6Ly93d3cucXVpcmtzbW9kZS5vcmcvbW9iaWxlL3ZpZXdwb3J0czIuaHRtbFxuXG5cdC8vIEFQSSBTRU1BTlRJQ1MuXG5cdC8vIFJlZiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ1NTX09iamVjdF9Nb2RlbC9EZXRlcm1pbmluZ190aGVfZGltZW5zaW9uc19vZl9lbGVtZW50c1xuXHQvLyAgICBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDogc3VtIG9mIGJvdW5kaW5nIGJveGVzIG9mIGVsZW1lbnQgKHRoZSBkaXNwbGF5ZWQgd2lkdGggb2YgdGhlIGVsZW1lbnQsXG5cdC8vICAgICAgaW5jbHVkaW5nIHBhZGRpbmcgYW5kIGJvcmRlcikuIEZyYWN0aW9uYWwuIEFwcGxpZXMgdHJhbnNmb3JtYXRpb25zLlxuXHQvLyAgICBjbGllbnRXaWR0aDogdmlzaWJsZSB3aWR0aCBvZiBlbGVtZW50IGluY2x1ZGluZyBwYWRkaW5nIChidXQgbm90IGJvcmRlcikuIEVYQ0VQVCBvbiByb290IGVsZW1lbnQgKGh0bWwpLCB3aGVyZVxuXHQvLyAgICAgIGl0IGlzIHRoZSB3aWR0aCBvZiB0aGUgdmlld3BvcnQuIFJvdW5kcyB0byBhbiBpbnRlZ2VyLiBEb2Vzbid0IGFwcGx5IHRyYW5zZm9ybWF0aW9ucy5cblx0Ly8gICAgb2Zmc2V0V2lkdGg6IHZpc2libGUgd2lkdGggb2YgZWxlbWVudCBpbmNsdWRpbmcgcGFkZGluZywgYm9yZGVyLCBhbmQgc2Nyb2xsYmFycyAoaWYgYW55KS4gUm91bmRzIHRvIGFuIGludGVnZXIuXG5cdC8vICAgICAgRG9lc24ndCBhcHBseSB0cmFuc2Zvcm1hdGlvbnMuXG5cdC8vICAgIHNjcm9sbFdpZHRoOiBlbnRpcmUgd2lkdGggb2YgZWxlbWVudCwgaW5jbHVkaW5nIGFueSBwYXJ0IHRoYXQncyBub3QgdmlzaWJsZSBkdWUgdG8gc2Nyb2xsYmFycy4gUm91bmRzIHRvXG5cdC8vICAgICAgYW4gaW50ZWdlci4gRG9lc24ndCBhcHBseSB0cmFuc2Zvcm1hdGlvbnMuIE5vdCBjbGVhciBpZiBpdCBpbmNsdWRlcyBzY3JvbGxiYXJzLCBidXQgSSB0aGluayBub3QuIEFsc29cblx0Ly8gICAgICBub3QgY2xlYXIgaWYgaXQgaW5jbHVkZXMgYm9yZGVycyBvciBwYWRkaW5nLiAoQnV0IGZyb20gdGVzdHMsIGFwcGFyZW50bHkgbm90IGJvcmRlcnMuIEV4Y2VwdCBvbiByb290XG5cdC8vICAgICAgZWxlbWVudCBhbmQgYm9keSBlbGVtZW50LCB3aGljaCBoYXZlIHNwZWNpYWwgcmVzdWx0cyB0aGF0IHZhcnkgYnkgYnJvd3Nlci4pXG5cblx0Ly8gVEVTVCBSRVNVTFRTOiBXSURUSFxuXHQvLyAgIOKclCA9IGNvcnJlY3QgYW5zd2VyXG5cdC8vICAg4pyYID0gaW5jb3JyZWN0IGFuc3dlciBhbmQgZGl2ZXJnZXMgZnJvbSBzcGVjXG5cdC8vICAgfiA9IGluY29ycmVjdCBhbnN3ZXIsIGJ1dCBtYXRjaGVzIHNwZWNcblx0Ly8gQlJPV1NFUlMgVEVTVEVEOiBTYWZhcmkgNi4yLjAgKE1hYyBPUyBYIDEwLjguNSk7IE1vYmlsZSBTYWZhcmkgNy4wLjAgKGlPUyA3LjEpOyBGaXJlZm94IDMyLjAuMCAoTWFjIE9TIFggMTAuOCk7XG5cdC8vICAgIEZpcmVmb3ggMzMuMC4wIChXaW5kb3dzIDcpOyBDaHJvbWUgMzguMC4yMTI1IChNYWMgT1MgWCAxMC44LjUpOyBDaHJvbWUgMzguMC4yMTI1IChXaW5kb3dzIDcpOyBJRSA4LCA5LCAxMCwgMTFcblxuXHQvLyBodG1sIHdpZHRoIHN0eWxlIHNtYWxsZXIgdGhhbiB2aWV3cG9ydCB3aWR0aDsgYm9keSB3aWR0aCBzdHlsZSBzbWFsbGVyIHRoYW4gaHRtbCB3aWR0aCBzdHlsZVxuXHQvLyAgTk9URTogVGhlc2UgdGVzdHMgd2VyZSBjb25kdWN0ZWQgd2hlbiBjb3JyZWN0IHJlc3VsdCB3YXMgd2lkdGggb2YgYm9yZGVyLiBUaGF0IGhhcyBiZWVuIGNoYW5nZWRcblx0Ly8gIHRvIFwid2lkdGggb2Ygdmlld3BvcnQuXCJcblx0Ly8gICAgaHRtbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuXHQvLyAgICAgIOKcmCBJRSA4LCA5LCAxMDogd2lkdGggb2Ygdmlld3BvcnRcblx0Ly8gICAgICDinJQgU2FmYXJpLCBNb2JpbGUgU2FmYXJpLCBDaHJvbWUsIEZpcmVmb3gsIElFIDExOiB3aWR0aCBvZiBodG1sLCBpbmNsdWRpbmcgYm9yZGVyXG5cdC8vICAgIGh0bWwuY2xpZW50V2lkdGhcblx0Ly8gICAgICB+IFNhZmFyaSwgTW9iaWxlIFNhZmFyaSwgQ2hyb21lLCBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTE6IHdpZHRoIG9mIHZpZXdwb3J0XG5cdC8vICAgIGh0bWwub2Zmc2V0V2lkdGhcblx0Ly8gICAgICDinJggSUUgOCwgOSwgMTA6IHdpZHRoIG9mIHZpZXdwb3J0XG5cdC8vICAgICAg4pyUIFNhZmFyaSwgTW9iaWxlIFNhZmFyaSwgQ2hyb21lLCBGaXJlZm94LCBJRSAxMTogd2lkdGggb2YgaHRtbCwgaW5jbHVkaW5nIGJvcmRlclxuXHQvLyAgICBodG1sLnNjcm9sbFdpZHRoXG5cdC8vICAgICAg4pyYIElFIDgsIDksIDEwLCAxMSwgRmlyZWZveDogd2lkdGggb2Ygdmlld3BvcnRcblx0Ly8gICAgICB+IFNhZmFyaSwgTW9iaWxlIFNhZmFyaSwgQ2hyb21lOiB3aWR0aCBvZiBodG1sLCBleGNsdWRpbmcgYm9yZGVyXG5cdC8vICAgIGJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcblx0Ly8gICAgICB+IFNhZmFyaSwgTW9iaWxlIFNhZmFyaSwgQ2hyb21lLCBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTE6IHdpZHRoIG9mIGJvZHksIGluY2x1ZGluZyBib3JkZXJcblx0Ly8gICAgYm9keS5jbGllbnRXaWR0aFxuXHQvLyAgICAgIH4gU2FmYXJpLCBNb2JpbGUgU2FmYXJpLCBDaHJvbWUsIEZpcmVmb3gsIElFIDgsIDksIDEwLCAxMTogd2lkdGggb2YgYm9keSwgZXhjbHVkaW5nIGJvcmRlclxuXHQvLyAgICBib2R5Lm9mZnNldFdpZHRoXG5cdC8vICAgICAgfiBTYWZhcmksIE1vYmlsZSBTYWZhcmksIENocm9tZSwgRmlyZWZveCwgSUUgOCwgOSwgMTAsIDExOiB3aWR0aCBvZiBib2R5LCBpbmNsdWRpbmcgYm9yZGVyXG5cdC8vICAgIGJvZHkuc2Nyb2xsV2lkdGhcblx0Ly8gICAgICDinJggU2FmYXJpLCBNb2JpbGUgU2FmYXJpLCBDaHJvbWU6IHdpZHRoIG9mIHZpZXdwb3J0XG5cdC8vICAgICAgfiBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTE6IHdpZHRoIG9mIGJvZHksIGV4Y2x1ZGluZyBib3JkZXJcblxuXHQvLyBlbGVtZW50IHdpZHRoIHN0eWxlIHdpZGVyIHRoYW4gdmlld3BvcnQ7IGJvZHkgYW5kIGh0bWwgd2lkdGggc3R5bGVzIGF0IGRlZmF1bHRcblx0Ly8gQlJPV1NFUiBCRUhBVklPUjogaHRtbCBhbmQgYm9keSBib3JkZXIgZXh0ZW5kIHRvIHdpZHRoIG9mIHZpZXdwb3J0IGFuZCBub3QgYmV5b25kIChleGNlcHQgb24gTW9iaWxlIFNhZmFyaSlcblx0Ly8gQ29ycmVjdCByZXN1bHQgaXMgZWxlbWVudCB3aWR0aCArIGJvZHkgYm9yZGVyLWxlZnQgKyBodG1sIGJvcmRlci1sZWZ0IChleGNlcHQgb24gTW9iaWxlIFNhZmFyaSlcblx0Ly8gTW9iaWxlIFNhZmFyaSB1c2VzIGEgbGF5b3V0IHZpZXdwb3J0LCBzbyBpdCdzIGV4cGVjdGVkIHRvIGluY2x1ZGUgYm9keSBib3JkZXItcmlnaHQgYW5kIGh0bWwgYm9yZGVyLXJpZ2h0LlxuXHQvLyAgICBodG1sLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG5cdC8vICAgICAg4pyUIE1vYmlsZSBTYWZhcmk6IGVsZW1lbnQgd2lkdGggKyBib2R5IGJvcmRlciArIGh0bWwgYm9yZGVyXG5cdC8vICAgICAgfiBTYWZhcmksIENocm9tZSwgRmlyZWZveCwgSUUgOCwgOSwgMTAsIDExOiB2aWV3cG9ydCB3aWR0aFxuXHQvLyAgICBodG1sLmNsaWVudFdpZHRoXG5cdC8vICAgICAg4pyUIE1vYmlsZSBTYWZhcmk6IGVsZW1lbnQgd2lkdGggKyBib2R5IGJvcmRlciArIGh0bWwgYm9yZGVyXG5cdC8vICAgICAgfiBTYWZhcmksIENocm9tZSwgRmlyZWZveCwgSUUgOCwgOSwgMTAsIDExOiB2aWV3cG9ydCB3aWR0aFxuXHQvLyAgICBodG1sLm9mZnNldFdpZHRoXG5cdC8vICAgICAg4pyUIE1vYmlsZSBTYWZhcmk6IGVsZW1lbnQgd2lkdGggKyBib2R5IGJvcmRlciArIGh0bWwgYm9yZGVyXG5cdC8vICAgICAgfiBTYWZhcmksIENocm9tZSwgRmlyZWZveCwgSUUgOCwgOSwgMTAsIDExOiB2aWV3cG9ydCB3aWR0aFxuXHQvLyAgICBodG1sLnNjcm9sbFdpZHRoXG5cdC8vICAgICAg4pyUIE1vYmlsZSBTYWZhcmk6IGVsZW1lbnQgd2lkdGggKyBib2R5IGJvcmRlciArIGh0bWwgYm9yZGVyXG5cdC8vICAgICAg4pyYIFNhZmFyaSwgQ2hyb21lOiBlbGVtZW50IHdpZHRoICsgYm9keSBib3JkZXItbGVmdCAoQlVUIE5PVCBodG1sIGJvcmRlci1sZWZ0KVxuXHQvLyAgICAgIOKclCBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTE6IGVsZW1lbnQgd2lkdGggKyBib2R5IGJvcmRlci1sZWZ0ICsgaHRtbCBib3JkZXItbGVmdFxuXHQvLyAgICBib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG5cdC8vICAgICAgfiBNb2JpbGUgU2FmYXJpOiBlbGVtZW50IHdpZHRoICsgYm9keSBib3JkZXJcblx0Ly8gICAgICB+IFNhZmFyaSwgQ2hyb21lLCBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTE6IHZpZXdwb3J0IHdpZHRoIC0gaHRtbCBib3JkZXJcblx0Ly8gICAgYm9keS5jbGllbnRXaWR0aFxuXHQvLyAgICAgIH4gTW9iaWxlIFNhZmFyaTogZWxlbWVudCB3aWR0aFxuXHQvLyAgICAgIH4gU2FmYXJpLCBDaHJvbWUsIEZpcmVmb3gsIElFIDgsIDksIDEwLCAxMTogdmlld3BvcnQgd2lkdGggLSBodG1sIGJvcmRlciAtIGJvZHkgYm9yZGVyXG5cdC8vICAgIGJvZHkub2Zmc2V0V2lkdGhcblx0Ly8gICAgICB+IE1vYmlsZSBTYWZhcmk6IGVsZW1lbnQgd2lkdGggKyBib2R5IGJvcmRlclxuXHQvLyAgICAgIH4gU2FmYXJpLCBDaHJvbWUsIEZpcmVmb3gsIElFIDgsIDksIDEwLCAxMTogdmlld3BvcnQgd2lkdGggLSBodG1sIGJvcmRlclxuXHQvLyAgICBib2R5LnNjcm9sbFdpZHRoXG5cdC8vICAgICAg4pyUIE1vYmlsZSBTYWZhcmk6IGVsZW1lbnQgd2lkdGggKyBib2R5IGJvcmRlciArIGh0bWwgYm9yZGVyXG5cdC8vICAgICAg4pyUIFNhZmFyaSwgQ2hyb21lOiBlbGVtZW50IHdpZHRoICsgYm9keSBib3JkZXItbGVmdCArIGh0bWwgYm9yZGVyLWxlZnQgKG1hdGNoZXMgYWN0dWFsIGJyb3dzZXIpXG5cdC8vICAgICAgfiBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTE6IGVsZW1lbnQgd2lkdGhcblxuXHQvLyBURVNUIFJFU1VMVFM6IEhFSUdIVFxuXHQvLyAgIOKclCA9IGNvcnJlY3QgYW5zd2VyXG5cdC8vICAg4pyYID0gaW5jb3JyZWN0IGFuc3dlciBhbmQgZGl2ZXJnZXMgZnJvbSBzcGVjXG5cdC8vICAgfiA9IGluY29ycmVjdCBhbnN3ZXIsIGJ1dCBtYXRjaGVzIHNwZWNcblxuXHQvLyBodG1sIGhlaWdodCBzdHlsZSBzbWFsbGVyIHRoYW4gdmlld3BvcnQgaGVpZ2h0OyBib2R5IGhlaWdodCBzdHlsZSBzbWFsbGVyIHRoYW4gaHRtbCBoZWlnaHQgc3R5bGVcblx0Ly8gIE5PVEU6IFRoZXNlIHRlc3RzIHdlcmUgY29uZHVjdGVkIHdoZW4gY29ycmVjdCByZXN1bHQgd2FzIGhlaWdodCBvZiB2aWV3cG9ydC5cblx0Ly8gICAgaHRtbC5jbGllbnRIZWlnaHRcblx0Ly8gICAgICDinJQgU2FmYXJpLCBNb2JpbGUgU2FmYXJpLCBDaHJvbWUsIEZpcmVmb3gsIElFIDgsIDksIDEwLCAxMTogaGVpZ2h0IG9mIHZpZXdwb3J0XG5cblx0Ly8gZWxlbWVudCBoZWlnaHQgc3R5bGUgdGFsbGVyIHRoYW4gdmlld3BvcnQ7IGJvZHkgYW5kIGh0bWwgd2lkdGggc3R5bGVzIGF0IGRlZmF1bHRcblx0Ly8gQlJPV1NFUiBCRUhBVklPUjogaHRtbCBhbmQgYm9keSBib3JkZXIgZW5jbG9zZSBlbnRpcmUgZWxlbWVudFxuXHQvLyBDb3JyZWN0IHJlc3VsdCBpcyBlbGVtZW50IHdpZHRoICsgYm9keSBib3JkZXItdG9wICsgaHRtbCBib3JkZXItdG9wICsgYm9keSBib3JkZXItYm90dG9tICsgaHRtbCBib3JkZXItYm90dG9tXG5cdC8vICAgIGh0bWwuY2xpZW50SGVpZ2h0XG5cdC8vICAgICAg4pyUIE1vYmlsZSBTYWZhcmk6IGVsZW1lbnQgaGVpZ2h0ICsgYWxsIGJvcmRlcnNcblx0Ly8gICAgICB+IFNhZmFyaSwgQ2hyb21lLCBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTE6IGhlaWdodCBvZiB2aWV3cG9ydFxuXHQvLyAgICBodG1sLnNjcm9sbEhlaWdodFxuXHQvLyAgICAgIOKclCBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTE6IGVsZW1lbnQgaGVpZ2h0ICsgYWxsIGJvcmRlcnNcblx0Ly8gICAgICDinJggU2FmYXJpLCBNb2JpbGUgU2FmYXJpLCBDaHJvbWU6IGVsZW1lbnQgaGVpZ2h0ICsgaHRtbCBib3JkZXItYm90dG9tXG5cdC8vICAgIGJvZHkuc2Nyb2xsSGVpZ2h0XG5cdC8vICAgICAg4pyUIFNhZmFyaSwgTW9iaWxlIFNhZmFyaSwgQ2hyb21lOiBlbGVtZW50IGhlaWdodCArIGFsbCBib3JkZXJzXG5cdC8vICAgICAgfiBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTE6IGVsZW1lbnQgaGVpZ2h0IChib2R5IGhlaWdodCAtIGJvZHkgYm9yZGVyKVxuXG5cdHZhciBkb2N1bWVudCA9IHRoaXMuX2ZyYW1lLnRvRG9tRWxlbWVudCgpLmNvbnRlbnREb2N1bWVudDtcblx0dmFyIGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cdHZhciBib2R5ID0gZG9jdW1lbnQuYm9keTtcblxuXHQvLyBCRVNUIFdJRFRIIEFOU1dFUiBTTyBGQVIgKEFTU1VNSU5HIFZJRVdQT1JUIElTIE1JTklNVU0gQU5TV0VSKTpcblx0dmFyIHdpZHRoID0gTWF0aC5tYXgoYm9keS5zY3JvbGxXaWR0aCwgaHRtbC5zY3JvbGxXaWR0aCk7XG5cblx0Ly8gQkVTVCBIRUlHSFQgQU5TV0VSIFNPIEZBUiAoQVNTVU1JTkcgVklFV1BPUlQgSVMgTUlOSU1VTSBBTlNXRVIpOlxuXHR2YXIgaGVpZ2h0ID0gTWF0aC5tYXgoYm9keS5zY3JvbGxIZWlnaHQsIGh0bWwuc2Nyb2xsSGVpZ2h0KTtcblxuXHRyZXR1cm4gU2l6ZS5jcmVhdGUodGhpcy5fZGltZW5zaW9uID09PSBYX0RJTUVOU0lPTiA/IHdpZHRoIDogaGVpZ2h0KTtcbn07XG5cbk1lLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXG5cdHJldHVybiB0aGlzLl9kaW1lbnNpb24gKyBcIiBvZiBwYWdlXCI7XG59O1xuXG5mdW5jdGlvbiBmYWN0b3J5Rm4oZGltZW5zaW9uKSB7XG5cdHJldHVybiBmdW5jdGlvbiBmYWN0b3J5KGZyYW1lKSB7XG5cdFx0cmV0dXJuIG5ldyBNZShkaW1lbnNpb24sIGZyYW1lKTtcblx0fTtcbn0iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuLypqc2hpbnQgbmV3Y2FwOmZhbHNlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vuc3VyZS5qc1wiKTtcbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vdXRpbC9vb3AuanNcIik7XG52YXIgRGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuL2Rlc2NyaXB0b3IuanNcIik7XG52YXIgUG9zaXRpb24gPSByZXF1aXJlKFwiLi4vdmFsdWVzL3Bvc2l0aW9uLmpzXCIpO1xuXG5mdW5jdGlvbiBSZWxhdGl2ZVBvc2l0aW9uKCkge1xuXHRyZXR1cm4gcmVxdWlyZShcIi4vcmVsYXRpdmVfcG9zaXRpb24uanNcIik7ICAgXHQvLyBicmVhayBjaXJjdWxhciBkZXBlbmRlbmN5XG59XG5cbnZhciBYX0RJTUVOU0lPTiA9IFwieFwiO1xudmFyIFlfRElNRU5TSU9OID0gXCJ5XCI7XG5cbnZhciBNZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUG9zaXRpb25EZXNjcmlwdG9yKGRpbWVuc2lvbikge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBTdHJpbmcgXSk7XG5cdGVuc3VyZS51bnJlYWNoYWJsZShcIlBvc2l0aW9uRGVzY3JpcHRvciBpcyBhYnN0cmFjdCBhbmQgc2hvdWxkIG5vdCBiZSBjb25zdHJ1Y3RlZCBkaXJlY3RseS5cIik7XG59O1xuRGVzY3JpcHRvci5leHRlbmQoTWUpO1xuTWUuZXh0ZW5kID0gb29wLmV4dGVuZEZuKE1lKTtcblxuTWUueCA9IGZhY3RvcnlGbihYX0RJTUVOU0lPTik7XG5NZS55ID0gZmFjdG9yeUZuKFlfRElNRU5TSU9OKTtcblxuTWUucHJvdG90eXBlLnBsdXMgPSBmdW5jdGlvbiBwbHVzKGFtb3VudCkge1xuXHRpZiAodGhpcy5fcGRiYy5kaW1lbnNpb24gPT09IFhfRElNRU5TSU9OKSByZXR1cm4gUmVsYXRpdmVQb3NpdGlvbigpLnJpZ2h0KHRoaXMsIGFtb3VudCk7XG5cdGVsc2UgcmV0dXJuIFJlbGF0aXZlUG9zaXRpb24oKS5kb3duKHRoaXMsIGFtb3VudCk7XG59O1xuXG5NZS5wcm90b3R5cGUubWludXMgPSBmdW5jdGlvbiBtaW51cyhhbW91bnQpIHtcblx0aWYgKHRoaXMuX3BkYmMuZGltZW5zaW9uID09PSBYX0RJTUVOU0lPTikgcmV0dXJuIFJlbGF0aXZlUG9zaXRpb24oKS5sZWZ0KHRoaXMsIGFtb3VudCk7XG5cdGVsc2UgcmV0dXJuIFJlbGF0aXZlUG9zaXRpb24oKS51cCh0aGlzLCBhbW91bnQpO1xufTtcblxuTWUucHJvdG90eXBlLmNvbnZlcnQgPSBmdW5jdGlvbiBjb252ZXJ0KGFyZywgdHlwZSkge1xuXHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRjYXNlIFwibnVtYmVyXCI6IHJldHVybiB0aGlzLl9wZGJjLmRpbWVuc2lvbiA9PT0gWF9ESU1FTlNJT04gPyBQb3NpdGlvbi54KGFyZykgOiBQb3NpdGlvbi55KGFyZyk7XG5cdFx0Y2FzZSBcInN0cmluZ1wiOlxuXHRcdFx0aWYgKGFyZyA9PT0gXCJub25lXCIpIHJldHVybiB0aGlzLl9wZGJjLmRpbWVuc2lvbiA9PT0gWF9ESU1FTlNJT04gPyBQb3NpdGlvbi5ub1goKSA6IFBvc2l0aW9uLm5vWSgpO1xuXHRcdFx0ZWxzZSByZXR1cm4gdW5kZWZpbmVkO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDogcmV0dXJuIHVuZGVmaW5lZDtcblx0fVxufTtcblxuZnVuY3Rpb24gZmFjdG9yeUZuKGRpbWVuc2lvbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gZmFjdG9yeShzZWxmKSB7XG5cdFx0Ly8gX3BkYmM6IFwiUG9zaXRpb25EZXNjcmlwdG9yIGJhc2UgY2xhc3MuXCIgQW4gYXR0ZW1wdCB0byBwcmV2ZW50IG5hbWUgY29uZmxpY3RzLlxuXHRcdHNlbGYuX3BkYmMgPSB7IGRpbWVuc2lvbjogZGltZW5zaW9uIH07XG5cdH07XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlbnN1cmUgPSByZXF1aXJlKFwiLi4vdXRpbC9lbnN1cmUuanNcIik7XG52YXIgUG9zaXRpb24gPSByZXF1aXJlKFwiLi4vdmFsdWVzL3Bvc2l0aW9uLmpzXCIpO1xudmFyIERlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi9kZXNjcmlwdG9yLmpzXCIpO1xudmFyIFBvc2l0aW9uRGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuL3Bvc2l0aW9uX2Rlc2NyaXB0b3IuanNcIik7XG52YXIgVmFsdWUgPSByZXF1aXJlKFwiLi4vdmFsdWVzL3ZhbHVlLmpzXCIpO1xudmFyIFNpemUgPSByZXF1aXJlKFwiLi4vdmFsdWVzL3NpemUuanNcIik7XG52YXIgUGl4ZWxzID0gcmVxdWlyZShcIi4uL3ZhbHVlcy9waXhlbHMuanNcIik7XG52YXIgRWxlbWVudFNpemUgPSByZXF1aXJlKFwiLi9lbGVtZW50X3NpemUuanNcIik7XG5cbnZhciBYX0RJTUVOU0lPTiA9IFwieFwiO1xudmFyIFlfRElNRU5TSU9OID0gXCJ5XCI7XG52YXIgUExVUyA9IDE7XG52YXIgTUlOVVMgPSAtMTtcblxudmFyIE1lID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZWxhdGl2ZVBvc2l0aW9uKGRpbWVuc2lvbiwgZGlyZWN0aW9uLCByZWxhdGl2ZVRvLCByZWxhdGl2ZUFtb3VudCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBTdHJpbmcsIE51bWJlciwgRGVzY3JpcHRvciwgW051bWJlciwgRGVzY3JpcHRvciwgVmFsdWVdIF0pO1xuXG5cdGlmIChkaW1lbnNpb24gPT09IFhfRElNRU5TSU9OKSBQb3NpdGlvbkRlc2NyaXB0b3IueCh0aGlzKTtcblx0ZWxzZSBpZiAoZGltZW5zaW9uID09PSBZX0RJTUVOU0lPTikgUG9zaXRpb25EZXNjcmlwdG9yLnkodGhpcyk7XG5cdGVsc2UgZW5zdXJlLnVucmVhY2hhYmxlKFwiVW5rbm93biBkaW1lbnNpb246IFwiICsgZGltZW5zaW9uKTtcblxuXHR0aGlzLl9kaW1lbnNpb24gPSBkaW1lbnNpb247XG5cdHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcblx0dGhpcy5fcmVsYXRpdmVUbyA9IHJlbGF0aXZlVG87XG5cblx0aWYgKHR5cGVvZiByZWxhdGl2ZUFtb3VudCA9PT0gXCJudW1iZXJcIikge1xuXHRcdGlmIChyZWxhdGl2ZUFtb3VudCA8IDApIHRoaXMuX2RpcmVjdGlvbiAqPSAtMTtcblx0XHR0aGlzLl9hbW91bnQgPSBTaXplLmNyZWF0ZShNYXRoLmFicyhyZWxhdGl2ZUFtb3VudCkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHRoaXMuX2Ftb3VudCA9IHJlbGF0aXZlQW1vdW50O1xuXHR9XG59O1xuUG9zaXRpb25EZXNjcmlwdG9yLmV4dGVuZChNZSk7XG5cbk1lLnJpZ2h0ID0gY3JlYXRlRm4oWF9ESU1FTlNJT04sIFBMVVMpO1xuTWUuZG93biA9IGNyZWF0ZUZuKFlfRElNRU5TSU9OLCBQTFVTKTtcbk1lLmxlZnQgPSBjcmVhdGVGbihYX0RJTUVOU0lPTiwgTUlOVVMpO1xuTWUudXAgPSBjcmVhdGVGbihZX0RJTUVOU0lPTiwgTUlOVVMpO1xuXG5mdW5jdGlvbiBjcmVhdGVGbihkaW1lbnNpb24sIGRpcmVjdGlvbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gY3JlYXRlKHJlbGF0aXZlVG8sIHJlbGF0aXZlQW1vdW50KSB7XG5cdFx0cmV0dXJuIG5ldyBNZShkaW1lbnNpb24sIGRpcmVjdGlvbiwgcmVsYXRpdmVUbywgcmVsYXRpdmVBbW91bnQpO1xuXHR9O1xufVxuXG5NZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSgpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHR2YXIgYmFzZVZhbHVlID0gdGhpcy5fcmVsYXRpdmVUby52YWx1ZSgpO1xuXHR2YXIgcmVsYXRpdmVWYWx1ZSA9IHRoaXMuX2Ftb3VudC52YWx1ZSgpO1xuXG5cdGlmICh0aGlzLl9kaXJlY3Rpb24gPT09IFBMVVMpIHJldHVybiBiYXNlVmFsdWUucGx1cyhyZWxhdGl2ZVZhbHVlKTtcblx0ZWxzZSByZXR1cm4gYmFzZVZhbHVlLm1pbnVzKHJlbGF0aXZlVmFsdWUpO1xufTtcblxuTWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0dmFyIGJhc2UgPSB0aGlzLl9yZWxhdGl2ZVRvLnRvU3RyaW5nKCk7XG5cdGlmICh0aGlzLl9hbW91bnQuZXF1YWxzKFNpemUuY3JlYXRlKDApKSkgcmV0dXJuIGJhc2U7XG5cblx0dmFyIHJlbGF0aW9uID0gdGhpcy5fYW1vdW50LnRvU3RyaW5nKCk7XG5cdGlmICh0aGlzLl9kaW1lbnNpb24gPT09IFhfRElNRU5TSU9OKSByZWxhdGlvbiArPSAodGhpcy5fZGlyZWN0aW9uID09PSBQTFVTKSA/IFwiIHRvIHJpZ2h0IG9mIFwiIDogXCIgdG8gbGVmdCBvZiBcIjtcblx0ZWxzZSByZWxhdGlvbiArPSAodGhpcy5fZGlyZWN0aW9uID09PSBQTFVTKSA/IFwiIGJlbG93IFwiIDogXCIgYWJvdmUgXCI7XG5cblx0cmV0dXJuIHJlbGF0aW9uICsgYmFzZTtcbn07XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlbnN1cmUgPSByZXF1aXJlKFwiLi4vdXRpbC9lbnN1cmUuanNcIik7XG52YXIgU2l6ZSA9IHJlcXVpcmUoXCIuLi92YWx1ZXMvc2l6ZS5qc1wiKTtcbnZhciBEZXNjcmlwdG9yID0gcmVxdWlyZShcIi4vZGVzY3JpcHRvci5qc1wiKTtcbnZhciBTaXplRGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuL3NpemVfZGVzY3JpcHRvci5qc1wiKTtcbnZhciBWYWx1ZSA9IHJlcXVpcmUoXCIuLi92YWx1ZXMvdmFsdWUuanNcIik7XG52YXIgU2l6ZU11bHRpcGxlID0gcmVxdWlyZShcIi4vc2l6ZV9tdWx0aXBsZS5qc1wiKTtcblxudmFyIFBMVVMgPSAxO1xudmFyIE1JTlVTID0gLTE7XG5cbnZhciBNZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUmVsYXRpdmVTaXplKGRpcmVjdGlvbiwgcmVsYXRpdmVUbywgYW1vdW50KSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIE51bWJlciwgRGVzY3JpcHRvciwgW051bWJlciwgRGVzY3JpcHRvciwgVmFsdWVdIF0pO1xuXG5cdHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcblx0dGhpcy5fcmVsYXRpdmVUbyA9IHJlbGF0aXZlVG87XG5cblx0aWYgKHR5cGVvZiBhbW91bnQgPT09IFwibnVtYmVyXCIpIHtcblx0XHR0aGlzLl9hbW91bnQgPSBTaXplLmNyZWF0ZShNYXRoLmFicyhhbW91bnQpKTtcblx0XHRpZiAoYW1vdW50IDwgMCkgdGhpcy5fZGlyZWN0aW9uICo9IC0xO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHRoaXMuX2Ftb3VudCA9IGFtb3VudDtcblx0fVxufTtcblNpemVEZXNjcmlwdG9yLmV4dGVuZChNZSk7XG5cbk1lLmxhcmdlciA9IGZhY3RvcnlGbihQTFVTKTtcbk1lLnNtYWxsZXIgPSBmYWN0b3J5Rm4oTUlOVVMpO1xuXG5NZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSgpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHR2YXIgYmFzZVZhbHVlID0gdGhpcy5fcmVsYXRpdmVUby52YWx1ZSgpO1xuXHR2YXIgcmVsYXRpdmVWYWx1ZSA9IHRoaXMuX2Ftb3VudC52YWx1ZSgpO1xuXG5cdGlmICh0aGlzLl9kaXJlY3Rpb24gPT09IFBMVVMpIHJldHVybiBiYXNlVmFsdWUucGx1cyhyZWxhdGl2ZVZhbHVlKTtcblx0ZWxzZSByZXR1cm4gYmFzZVZhbHVlLm1pbnVzKHJlbGF0aXZlVmFsdWUpO1xufTtcblxuTWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0dmFyIGJhc2UgPSB0aGlzLl9yZWxhdGl2ZVRvLnRvU3RyaW5nKCk7XG5cdGlmICh0aGlzLl9hbW91bnQuZXF1YWxzKFNpemUuY3JlYXRlKDApKSkgcmV0dXJuIGJhc2U7XG5cblx0dmFyIHJlbGF0aW9uID0gdGhpcy5fYW1vdW50LnRvU3RyaW5nKCk7XG5cdGlmICh0aGlzLl9kaXJlY3Rpb24gPT09IFBMVVMpIHJlbGF0aW9uICs9IFwiIGxhcmdlciB0aGFuIFwiO1xuXHRlbHNlIHJlbGF0aW9uICs9IFwiIHNtYWxsZXIgdGhhbiBcIjtcblxuXHRyZXR1cm4gcmVsYXRpb24gKyBiYXNlO1xufTtcblxuZnVuY3Rpb24gZmFjdG9yeUZuKGRpcmVjdGlvbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gZmFjdG9yeShyZWxhdGl2ZVRvLCBhbW91bnQpIHtcblx0XHRyZXR1cm4gbmV3IE1lKGRpcmVjdGlvbiwgcmVsYXRpdmVUbywgYW1vdW50KTtcblx0fTtcbn0iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuLypqc2hpbnQgbmV3Y2FwOmZhbHNlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vuc3VyZS5qc1wiKTtcbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vdXRpbC9vb3AuanNcIik7XG52YXIgRGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuL2Rlc2NyaXB0b3IuanNcIik7XG52YXIgU2l6ZSA9IHJlcXVpcmUoXCIuLi92YWx1ZXMvc2l6ZS5qc1wiKTtcblxuZnVuY3Rpb24gUmVsYXRpdmVTaXplKCkge1xuXHRyZXR1cm4gcmVxdWlyZShcIi4vcmVsYXRpdmVfc2l6ZS5qc1wiKTsgICBcdC8vIGJyZWFrIGNpcmN1bGFyIGRlcGVuZGVuY3lcbn1cblxuZnVuY3Rpb24gU2l6ZU11bHRpcGxlKCkge1xuXHRyZXR1cm4gcmVxdWlyZShcIi4vc2l6ZV9tdWx0aXBsZS5qc1wiKTsgICBcdC8vIGJyZWFrIGNpcmN1bGFyIGRlcGVuZGVuY3lcbn1cblxudmFyIE1lID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBTaXplRGVzY3JpcHRvcigpIHtcblx0ZW5zdXJlLnVucmVhY2hhYmxlKFwiU2l6ZURlc2NyaXB0b3IgaXMgYWJzdHJhY3QgYW5kIHNob3VsZCBub3QgYmUgY29uc3RydWN0ZWQgZGlyZWN0bHkuXCIpO1xufTtcbkRlc2NyaXB0b3IuZXh0ZW5kKE1lKTtcbk1lLmV4dGVuZCA9IG9vcC5leHRlbmRGbihNZSk7XG5cbk1lLnByb3RvdHlwZS5wbHVzID0gZnVuY3Rpb24gcGx1cyhhbW91bnQpIHtcblx0cmV0dXJuIFJlbGF0aXZlU2l6ZSgpLmxhcmdlcih0aGlzLCBhbW91bnQpO1xufTtcblxuTWUucHJvdG90eXBlLm1pbnVzID0gZnVuY3Rpb24gbWludXMoYW1vdW50KSB7XG5cdHJldHVybiBSZWxhdGl2ZVNpemUoKS5zbWFsbGVyKHRoaXMsIGFtb3VudCk7XG59O1xuXG5NZS5wcm90b3R5cGUudGltZXMgPSBmdW5jdGlvbiB0aW1lcyhhbW91bnQpIHtcblx0cmV0dXJuIFNpemVNdWx0aXBsZSgpLmNyZWF0ZSh0aGlzLCBhbW91bnQpO1xufTtcblxuTWUucHJvdG90eXBlLmNvbnZlcnQgPSBmdW5jdGlvbiBjb252ZXJ0KGFyZywgdHlwZSkge1xuXHRzd2l0Y2godHlwZSkge1xuXHRcdGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIFNpemUuY3JlYXRlKGFyZyk7XG5cdFx0Y2FzZSBcInN0cmluZ1wiOiByZXR1cm4gYXJnID09PSBcIm5vbmVcIiA/IFNpemUuY3JlYXRlTm9uZSgpIDogdW5kZWZpbmVkO1xuXHRcdGRlZmF1bHQ6IHJldHVybiB1bmRlZmluZWQ7XG5cdH1cbn07XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlbnN1cmUgPSByZXF1aXJlKFwiLi4vdXRpbC9lbnN1cmUuanNcIik7XG52YXIgRGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuL2Rlc2NyaXB0b3IuanNcIik7XG52YXIgU2l6ZURlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi9zaXplX2Rlc2NyaXB0b3IuanNcIik7XG52YXIgU2l6ZSA9IHJlcXVpcmUoXCIuLi92YWx1ZXMvc2l6ZS5qc1wiKTtcblxudmFyIE1lID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBTaXplTXVsdGlwbGUocmVsYXRpdmVUbywgbXVsdGlwbGUpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgRGVzY3JpcHRvciwgTnVtYmVyIF0pO1xuXG5cdHRoaXMuX3JlbGF0aXZlVG8gPSByZWxhdGl2ZVRvO1xuXHR0aGlzLl9tdWx0aXBsZSA9IG11bHRpcGxlO1xufTtcblNpemVEZXNjcmlwdG9yLmV4dGVuZChNZSk7XG5cbk1lLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShyZWxhdGl2ZVRvLCBtdWx0aXBsZSkge1xuXHRyZXR1cm4gbmV3IE1lKHJlbGF0aXZlVG8sIG11bHRpcGxlKTtcbn07XG5cbk1lLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uIHZhbHVlKCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXG5cdHJldHVybiB0aGlzLl9yZWxhdGl2ZVRvLnZhbHVlKCkudGltZXModGhpcy5fbXVsdGlwbGUpO1xufTtcblxuTWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0dmFyIG11bHRpcGxlID0gdGhpcy5fbXVsdGlwbGU7XG5cdHZhciBiYXNlID0gdGhpcy5fcmVsYXRpdmVUby50b1N0cmluZygpO1xuXHRpZiAobXVsdGlwbGUgPT09IDEpIHJldHVybiBiYXNlO1xuXG5cdHZhciBkZXNjO1xuXHRzd2l0Y2gobXVsdGlwbGUpIHtcblx0XHRjYXNlIDEvMjogZGVzYyA9IFwiaGFsZiBvZiBcIjsgYnJlYWs7XG5cdFx0Y2FzZSAxLzM6IGRlc2MgPSBcIm9uZS10aGlyZCBvZiBcIjsgYnJlYWs7XG5cdFx0Y2FzZSAyLzM6IGRlc2MgPSBcInR3by10aGlyZHMgb2YgXCI7IGJyZWFrO1xuXHRcdGNhc2UgMS80OiBkZXNjID0gXCJvbmUtcXVhcnRlciBvZiBcIjsgYnJlYWs7XG5cdFx0Y2FzZSAzLzQ6IGRlc2MgPSBcInRocmVlLXF1YXJ0ZXJzIG9mIFwiOyBicmVhaztcblx0XHRjYXNlIDEvNTogZGVzYyA9IFwib25lLWZpZnRoIG9mIFwiOyBicmVhaztcblx0XHRjYXNlIDIvNTogZGVzYyA9IFwidHdvLWZpZnRocyBvZiBcIjsgYnJlYWs7XG5cdFx0Y2FzZSAzLzU6IGRlc2MgPSBcInRocmVlLWZpZnRocyBvZiBcIjsgYnJlYWs7XG5cdFx0Y2FzZSA0LzU6IGRlc2MgPSBcImZvdXItZmlmdGhzIG9mIFwiOyBicmVhaztcblx0XHRjYXNlIDEvNjogZGVzYyA9IFwib25lLXNpeHRoIG9mIFwiOyBicmVhaztcblx0XHRjYXNlIDUvNjogZGVzYyA9IFwiZml2ZS1zaXh0aHMgb2YgXCI7IGJyZWFrO1xuXHRcdGNhc2UgMS84OiBkZXNjID0gXCJvbmUtZWlnaHRoIG9mIFwiOyBicmVhaztcblx0XHRjYXNlIDMvODogZGVzYyA9IFwidGhyZWUtZWlnaHRocyBvZiBcIjsgYnJlYWs7XG5cdFx0Y2FzZSA1Lzg6IGRlc2MgPSBcImZpdmUtZWlnaHRocyBvZiBcIjsgYnJlYWs7XG5cdFx0Y2FzZSA3Lzg6IGRlc2MgPSBcInNldmVuLWVpZ2h0aHMgb2YgXCI7IGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRpZiAobXVsdGlwbGUgPiAxKSBkZXNjID0gbXVsdGlwbGUgKyBcIiB0aW1lcyBcIjtcblx0XHRcdGVsc2UgZGVzYyA9IChtdWx0aXBsZSAqIDEwMCkgKyBcIiUgb2YgXCI7XG5cdH1cblxuXHRyZXR1cm4gZGVzYyArIGJhc2U7XG59OyIsIi8vIENvcHlyaWdodCAoYykgMjAxNCBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vuc3VyZS5qc1wiKTtcbnZhciBQb3NpdGlvbkRlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi9wb3NpdGlvbl9kZXNjcmlwdG9yLmpzXCIpO1xudmFyIFBvc2l0aW9uID0gcmVxdWlyZShcIi4uL3ZhbHVlcy9wb3NpdGlvbi5qc1wiKTtcblxudmFyIFRPUCA9IFwidG9wXCI7XG52YXIgUklHSFQgPSBcInJpZ2h0XCI7XG52YXIgQk9UVE9NID0gXCJib3R0b21cIjtcbnZhciBMRUZUID0gXCJsZWZ0XCI7XG5cbnZhciBNZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gVmlld3BvcnRFZGdlKHBvc2l0aW9uLCBmcmFtZSkge1xuXHR2YXIgUUZyYW1lID0gcmVxdWlyZShcIi4uL3FfZnJhbWUuanNcIik7ICAgIC8vIGJyZWFrIGNpcmN1bGFyIGRlcGVuZGVuY3lcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgU3RyaW5nLCBRRnJhbWUgXSk7XG5cblx0aWYgKHBvc2l0aW9uID09PSBMRUZUIHx8IHBvc2l0aW9uID09PSBSSUdIVCkgUG9zaXRpb25EZXNjcmlwdG9yLngodGhpcyk7XG5cdGVsc2UgaWYgKHBvc2l0aW9uID09PSBUT1AgfHwgcG9zaXRpb24gPT09IEJPVFRPTSkgUG9zaXRpb25EZXNjcmlwdG9yLnkodGhpcyk7XG5cdGVsc2UgZW5zdXJlLnVucmVhY2hhYmxlKFwiVW5rbm93biBwb3NpdGlvbjogXCIgKyBwb3NpdGlvbik7XG5cblx0dGhpcy5fcG9zaXRpb24gPSBwb3NpdGlvbjtcblx0dGhpcy5fZnJhbWUgPSBmcmFtZTtcbn07XG5Qb3NpdGlvbkRlc2NyaXB0b3IuZXh0ZW5kKE1lKTtcblxuTWUudG9wID0gZmFjdG9yeUZuKFRPUCk7XG5NZS5yaWdodCA9IGZhY3RvcnlGbihSSUdIVCk7XG5NZS5ib3R0b20gPSBmYWN0b3J5Rm4oQk9UVE9NKTtcbk1lLmxlZnQgPSBmYWN0b3J5Rm4oTEVGVCk7XG5cbk1lLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uKCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXG5cdHZhciBzY3JvbGwgPSB0aGlzLl9mcmFtZS5nZXRSYXdTY3JvbGxQb3NpdGlvbigpO1xuXHR2YXIgeCA9IFBvc2l0aW9uLngoc2Nyb2xsLngpO1xuXHR2YXIgeSA9IFBvc2l0aW9uLnkoc2Nyb2xsLnkpO1xuXG5cdHN3aXRjaCh0aGlzLl9wb3NpdGlvbikge1xuXHRcdGNhc2UgVE9QOiByZXR1cm4geTtcblx0XHRjYXNlIFJJR0hUOiByZXR1cm4geC5wbHVzKHRoaXMuX2ZyYW1lLnZpZXdwb3J0KCkud2lkdGgudmFsdWUoKSk7XG5cdFx0Y2FzZSBCT1RUT006IHJldHVybiB5LnBsdXModGhpcy5fZnJhbWUudmlld3BvcnQoKS5oZWlnaHQudmFsdWUoKSk7XG5cdFx0Y2FzZSBMRUZUOiByZXR1cm4geDtcblxuXHRcdGRlZmF1bHQ6IGVuc3VyZS51bnJlYWNoYWJsZSgpO1xuXHR9XG59O1xuXG5NZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9uICsgXCIgZWRnZSBvZiB2aWV3cG9ydFwiO1xufTtcblxuZnVuY3Rpb24gZmFjdG9yeUZuKHBvc2l0aW9uKSB7XG5cdHJldHVybiBmdW5jdGlvbiBmYWN0b3J5KGZyYW1lKSB7XG5cdFx0cmV0dXJuIG5ldyBNZShwb3NpdGlvbiwgZnJhbWUpO1xuXHR9O1xufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE0IFRpdGFuaXVtIEkuVC4gTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBGb3IgbGljZW5zZSwgc2VlIFwiUkVBRE1FXCIgb3IgXCJMSUNFTlNFXCIgZmlsZS5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgZW5zdXJlID0gcmVxdWlyZShcIi4uL3V0aWwvZW5zdXJlLmpzXCIpO1xudmFyIFNpemVEZXNjcmlwdG9yID0gcmVxdWlyZShcIi4vc2l6ZV9kZXNjcmlwdG9yLmpzXCIpO1xudmFyIFNpemUgPSByZXF1aXJlKFwiLi4vdmFsdWVzL3NpemUuanNcIik7XG52YXIgUmVsYXRpdmVTaXplID0gcmVxdWlyZShcIi4vcmVsYXRpdmVfc2l6ZS5qc1wiKTtcbnZhciBTaXplTXVsdGlwbGUgPSByZXF1aXJlKFwiLi9zaXplX211bHRpcGxlLmpzXCIpO1xuXG52YXIgWF9ESU1FTlNJT04gPSBcInhcIjtcbnZhciBZX0RJTUVOU0lPTiA9IFwieVwiO1xuXG52YXIgTWUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFBhZ2VTaXplKGRpbWVuc2lvbiwgZnJhbWUpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgU3RyaW5nLCBPYmplY3QgXSk7XG5cdGVuc3VyZS50aGF0KGRpbWVuc2lvbiA9PT0gWF9ESU1FTlNJT04gfHwgZGltZW5zaW9uID09PSBZX0RJTUVOU0lPTiwgXCJVbnJlY29nbml6ZWQgZGltZW5zaW9uOiBcIiArIGRpbWVuc2lvbik7XG5cblx0dGhpcy5fZGltZW5zaW9uID0gZGltZW5zaW9uO1xuXHR0aGlzLl9mcmFtZSA9IGZyYW1lO1xufTtcblNpemVEZXNjcmlwdG9yLmV4dGVuZChNZSk7XG5cbk1lLnggPSBmYWN0b3J5Rm4oWF9ESU1FTlNJT04pO1xuTWUueSA9IGZhY3RvcnlGbihZX0RJTUVOU0lPTik7XG5cbk1lLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uKCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXG5cdC8vIFVTRUZVTCBSRUFESU5HOiBodHRwOi8vd3d3LnF1aXJrc21vZGUub3JnL21vYmlsZS92aWV3cG9ydHMuaHRtbFxuXHQvLyBhbmQgaHR0cDovL3d3dy5xdWlya3Ntb2RlLm9yZy9tb2JpbGUvdmlld3BvcnRzMi5odG1sXG5cblx0Ly8gQlJPV1NFUlMgVEVTVEVEOiBTYWZhcmkgNi4yLjAgKE1hYyBPUyBYIDEwLjguNSk7IE1vYmlsZSBTYWZhcmkgNy4wLjAgKGlPUyA3LjEpOyBGaXJlZm94IDMyLjAuMCAoTWFjIE9TIFggMTAuOCk7XG5cdC8vICAgIEZpcmVmb3ggMzMuMC4wIChXaW5kb3dzIDcpOyBDaHJvbWUgMzguMC4yMTI1IChNYWMgT1MgWCAxMC44LjUpOyBDaHJvbWUgMzguMC4yMTI1IChXaW5kb3dzIDcpOyBJRSA4LCA5LCAxMCwgMTFcblxuXHQvLyBXaWR0aCB0ZWNobmlxdWVzIEkndmUgdHJpZWQ6IChOb3RlOiByZXN1bHRzIGFyZSBkaWZmZXJlbnQgaW4gcXVpcmtzIG1vZGUpXG5cdC8vIGJvZHkuY2xpZW50V2lkdGhcblx0Ly8gYm9keS5vZmZzZXRXaWR0aFxuXHQvLyBib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG5cdC8vICAgIGZhaWxzIG9uIGFsbCBicm93c2VyczogZG9lc24ndCBpbmNsdWRlIG1hcmdpblxuXHQvLyBib2R5LnNjcm9sbFdpZHRoXG5cdC8vICAgIHdvcmtzIG9uIFNhZmFyaSwgTW9iaWxlIFNhZmFyaSwgQ2hyb21lXG5cdC8vICAgIGZhaWxzIG9uIEZpcmVmb3gsIElFIDgsIDksIDEwLCAxMTogZG9lc24ndCBpbmNsdWRlIG1hcmdpblxuXHQvLyBodG1sLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG5cdC8vIGh0bWwub2Zmc2V0V2lkdGhcblx0Ly8gICAgd29ya3Mgb24gU2FmYXJpLCBNb2JpbGUgU2FmYXJpLCBDaHJvbWUsIEZpcmVmb3hcblx0Ly8gICAgZmFpbHMgb24gSUUgOCwgOSwgMTA6IGluY2x1ZGVzIHNjcm9sbGJhclxuXHQvLyBodG1sLnNjcm9sbFdpZHRoXG5cdC8vIGh0bWwuY2xpZW50V2lkdGhcblx0Ly8gICAgV09SS1MhIFNhZmFyaSwgTW9iaWxlIFNhZmFyaSwgQ2hyb21lLCBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTFcblxuXHQvLyBIZWlnaHQgdGVjaG5pcXVlcyBJJ3ZlIHRyaWVkOiAoTm90ZSB0aGF0IHJlc3VsdHMgYXJlIGRpZmZlcmVudCBpbiBxdWlya3MgbW9kZSlcblx0Ly8gYm9keS5jbGllbnRIZWlnaHRcblx0Ly8gYm9keS5vZmZzZXRIZWlnaHRcblx0Ly8gYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcblx0Ly8gICAgZmFpbHMgb24gYWxsIGJyb3dzZXJzOiBvbmx5IGluY2x1ZGVzIGhlaWdodCBvZiBjb250ZW50XG5cdC8vIGJvZHkgZ2V0Q29tcHV0ZWRTdHlsZShcImhlaWdodFwiKVxuXHQvLyAgICBmYWlscyBvbiBhbGwgYnJvd3NlcnM6IElFOCByZXR1cm5zIFwiYXV0b1wiOyBvdGhlcnMgb25seSBpbmNsdWRlIGhlaWdodCBvZiBjb250ZW50XG5cdC8vIGJvZHkuc2Nyb2xsSGVpZ2h0XG5cdC8vICAgIHdvcmtzIG9uIFNhZmFyaSwgTW9iaWxlIFNhZmFyaSwgQ2hyb21lO1xuXHQvLyAgICBmYWlscyBvbiBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTE6IG9ubHkgaW5jbHVkZXMgaGVpZ2h0IG9mIGNvbnRlbnRcblx0Ly8gaHRtbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcblx0Ly8gaHRtbC5vZmZzZXRIZWlnaHRcblx0Ly8gICAgd29ya3Mgb24gSUUgOCwgOSwgMTBcblx0Ly8gICAgZmFpbHMgb24gSUUgMTEsIFNhZmFyaSwgTW9iaWxlIFNhZmFyaSwgQ2hyb21lOiBvbmx5IGluY2x1ZGVzIGhlaWdodCBvZiBjb250ZW50XG5cdC8vIGh0bWwuc2Nyb2xsSGVpZ2h0XG5cdC8vICAgIHdvcmtzIG9uIEZpcmVmb3gsIElFIDgsIDksIDEwLCAxMVxuXHQvLyAgICBmYWlscyBvbiBTYWZhcmksIE1vYmlsZSBTYWZhcmksIENocm9tZTogb25seSBpbmNsdWRlcyBoZWlnaHQgb2YgY29udGVudFxuXHQvLyBodG1sLmNsaWVudEhlaWdodFxuXHQvLyAgICBXT1JLUyEgU2FmYXJpLCBNb2JpbGUgU2FmYXJpLCBDaHJvbWUsIEZpcmVmb3gsIElFIDgsIDksIDEwLCAxMVxuXG5cdHZhciBodG1sID0gdGhpcy5fZnJhbWUuZ2V0KFwiaHRtbFwiKS50b0RvbUVsZW1lbnQoKTtcblx0dmFyIHZhbHVlID0gKHRoaXMuX2RpbWVuc2lvbiA9PT0gWF9ESU1FTlNJT04pID8gaHRtbC5jbGllbnRXaWR0aCA6IGh0bWwuY2xpZW50SGVpZ2h0O1xuXHRyZXR1cm4gU2l6ZS5jcmVhdGUodmFsdWUpO1xufTtcblxuTWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0dmFyIGRlc2MgPSAodGhpcy5fZGltZW5zaW9uID09PSBYX0RJTUVOU0lPTikgPyBcIndpZHRoXCIgOiBcImhlaWdodFwiO1xuXHRyZXR1cm4gZGVzYyArIFwiIG9mIHZpZXdwb3J0XCI7XG59O1xuXG5mdW5jdGlvbiBmYWN0b3J5Rm4oZGltZW5zaW9uKSB7XG5cdHJldHVybiBmdW5jdGlvbiBmYWN0b3J5KGZyYW1lKSB7XG5cdFx0cmV0dXJuIG5ldyBNZShkaW1lbnNpb24sIGZyYW1lKTtcblx0fTtcbn0iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNiBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG4oZnVuY3Rpb24oKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdHZhciBlbnN1cmUgPSByZXF1aXJlKFwiLi91dGlsL2Vuc3VyZS5qc1wiKTtcblx0dmFyIHNoaW0gPSByZXF1aXJlKFwiLi91dGlsL3NoaW0uanNcIik7XG5cdHZhciBjYW1lbGNhc2UgPSByZXF1aXJlKFwiLi4vdmVuZG9yL2NhbWVsY2FzZS0xLjAuMS1tb2RpZmllZC5qc1wiKTtcblx0dmFyIEVsZW1lbnRSZW5kZXJlZCA9IHJlcXVpcmUoXCIuL2Rlc2NyaXB0b3JzL2VsZW1lbnRfcmVuZGVyZWQuanNcIik7XG5cdHZhciBFbGVtZW50RWRnZSA9IHJlcXVpcmUoXCIuL2Rlc2NyaXB0b3JzL2VsZW1lbnRfZWRnZS5qc1wiKTtcblx0dmFyIENlbnRlciA9IHJlcXVpcmUoXCIuL2Rlc2NyaXB0b3JzL2NlbnRlci5qc1wiKTtcblx0dmFyIEVsZW1lbnRTaXplID0gcmVxdWlyZShcIi4vZGVzY3JpcHRvcnMvZWxlbWVudF9zaXplLmpzXCIpO1xuXHR2YXIgQXNzZXJ0YWJsZSA9IHJlcXVpcmUoXCIuL2Fzc2VydGFibGUuanNcIik7XG5cblx0dmFyIE1lID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBRRWxlbWVudChkb21FbGVtZW50LCBmcmFtZSwgbmlja25hbWUpIHtcblx0XHR2YXIgUUZyYW1lID0gcmVxdWlyZShcIi4vcV9mcmFtZS5qc1wiKTsgICAgLy8gYnJlYWsgY2lyY3VsYXIgZGVwZW5kZW5jeVxuXHRcdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbT2JqZWN0LCBRRnJhbWUsIFN0cmluZ10pO1xuXG5cdFx0dGhpcy5fZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG5cdFx0dGhpcy5fbmlja25hbWUgPSBuaWNrbmFtZTtcblxuXHRcdHRoaXMuZnJhbWUgPSBmcmFtZTtcblxuXHRcdC8vIHByb3BlcnRpZXNcblx0XHR0aGlzLnJlbmRlcmVkID0gRWxlbWVudFJlbmRlcmVkLmNyZWF0ZSh0aGlzKTtcblxuXHRcdHRoaXMudG9wID0gRWxlbWVudEVkZ2UudG9wKHRoaXMpO1xuXHRcdHRoaXMucmlnaHQgPSBFbGVtZW50RWRnZS5yaWdodCh0aGlzKTtcblx0XHR0aGlzLmJvdHRvbSA9IEVsZW1lbnRFZGdlLmJvdHRvbSh0aGlzKTtcblx0XHR0aGlzLmxlZnQgPSBFbGVtZW50RWRnZS5sZWZ0KHRoaXMpO1xuXG5cdFx0dGhpcy5jZW50ZXIgPSBDZW50ZXIueCh0aGlzLmxlZnQsIHRoaXMucmlnaHQsIFwiY2VudGVyIG9mICdcIiArIG5pY2tuYW1lICsgXCInXCIpO1xuXHRcdHRoaXMubWlkZGxlID0gQ2VudGVyLnkodGhpcy50b3AsIHRoaXMuYm90dG9tLCBcIm1pZGRsZSBvZiAnXCIgKyBuaWNrbmFtZSArIFwiJ1wiKTtcblxuXHRcdHRoaXMud2lkdGggPSBFbGVtZW50U2l6ZS54KHRoaXMpO1xuXHRcdHRoaXMuaGVpZ2h0ID0gRWxlbWVudFNpemUueSh0aGlzKTtcblx0fTtcblx0QXNzZXJ0YWJsZS5leHRlbmQoTWUpO1xuXG5cdE1lLnByb3RvdHlwZS5nZXRSYXdTdHlsZSA9IGZ1bmN0aW9uIGdldFJhd1N0eWxlKHN0eWxlTmFtZSkge1xuXHRcdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbU3RyaW5nXSk7XG5cblx0XHR2YXIgc3R5bGVzO1xuXHRcdHZhciByZXN1bHQ7XG5cblx0XHQvLyBXT1JLQVJPVU5EIElFIDg6IG5vIGdldENvbXB1dGVkU3R5bGUoKVxuXHRcdGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuXHRcdFx0Ly8gV09SS0FST1VORCBGaXJlZm94IDQwLjAuMzogbXVzdCB1c2UgZnJhbWUncyBjb250ZW50V2luZG93IChyZWYgaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTIwNDA2Milcblx0XHRcdHN0eWxlcyA9IHRoaXMuZnJhbWUudG9Eb21FbGVtZW50KCkuY29udGVudFdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuX2RvbUVsZW1lbnQpO1xuXHRcdFx0cmVzdWx0ID0gc3R5bGVzLmdldFByb3BlcnR5VmFsdWUoc3R5bGVOYW1lKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRzdHlsZXMgPSB0aGlzLl9kb21FbGVtZW50LmN1cnJlbnRTdHlsZTtcblx0XHRcdHJlc3VsdCA9IHN0eWxlc1tjYW1lbGNhc2Uoc3R5bGVOYW1lKV07XG5cdFx0fVxuXHRcdGlmIChyZXN1bHQgPT09IG51bGwgfHwgcmVzdWx0ID09PSB1bmRlZmluZWQpIHJlc3VsdCA9IFwiXCI7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcblxuXHRNZS5wcm90b3R5cGUuZ2V0UmF3UG9zaXRpb24gPSBmdW5jdGlvbiBnZXRSYXdQb3NpdGlvbigpIHtcblx0XHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXG5cdFx0Ly8gV09SS0FST1VORCBJRSA4OiBObyBUZXh0UmVjdGFuZ2xlLmhlaWdodCBvciAud2lkdGhcblx0XHR2YXIgcmVjdCA9IHRoaXMuX2RvbUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGxlZnQ6IHJlY3QubGVmdCxcblx0XHRcdHJpZ2h0OiByZWN0LnJpZ2h0LFxuXHRcdFx0d2lkdGg6IHJlY3Qud2lkdGggIT09IHVuZGVmaW5lZCA/IHJlY3Qud2lkdGggOiByZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0LFxuXG5cdFx0XHR0b3A6IHJlY3QudG9wLFxuXHRcdFx0Ym90dG9tOiByZWN0LmJvdHRvbSxcblx0XHRcdGhlaWdodDogcmVjdC5oZWlnaHQgIT09IHVuZGVmaW5lZCA/IHJlY3QuaGVpZ2h0IDogcmVjdC5ib3R0b20gLSByZWN0LnRvcFxuXHRcdH07XG5cdH07XG5cblx0TWUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSgpIHtcblx0XHRzaGltLkVsZW1lbnQucmVtb3ZlKHRoaXMuX2RvbUVsZW1lbnQpO1xuXHR9O1xuXG5cdE1lLnByb3RvdHlwZS50b0RvbUVsZW1lbnQgPSBmdW5jdGlvbiB0b0RvbUVsZW1lbnQoKSB7XG5cdFx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblx0XHRyZXR1cm4gdGhpcy5fZG9tRWxlbWVudDtcblx0fTtcblxuXHRNZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXHRcdHJldHVybiBcIidcIiArIHRoaXMuX25pY2tuYW1lICsgXCInXCI7XG5cdH07XG5cblx0TWUucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyh0aGF0KSB7XG5cdFx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtNZV0pO1xuXHRcdHJldHVybiB0aGlzLl9kb21FbGVtZW50ID09PSB0aGF0Ll9kb21FbGVtZW50O1xuXHR9O1xuXG59KCkpOyIsIi8vIENvcHlyaWdodCAoYykgMjAxNCBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuL3V0aWwvZW5zdXJlLmpzXCIpO1xudmFyIFFFbGVtZW50ID0gcmVxdWlyZShcIi4vcV9lbGVtZW50LmpzXCIpO1xuXG52YXIgTWUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFFFbGVtZW50TGlzdChub2RlTGlzdCwgZnJhbWUsIG5pY2tuYW1lKSB7XG5cdHZhciBRRnJhbWUgPSByZXF1aXJlKFwiLi9xX2ZyYW1lLmpzXCIpOyAgICAvLyBicmVhayBjaXJjdWxhciBkZXBlbmRlbmN5XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIE9iamVjdCwgUUZyYW1lLCBTdHJpbmcgXSk7XG5cblx0dGhpcy5fbm9kZUxpc3QgPSBub2RlTGlzdDtcblx0dGhpcy5fZnJhbWUgPSBmcmFtZTtcblx0dGhpcy5fbmlja25hbWUgPSBuaWNrbmFtZTtcbn07XG5cbk1lLnByb3RvdHlwZS5sZW5ndGggPSBmdW5jdGlvbiBsZW5ndGgoKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0cmV0dXJuIHRoaXMuX25vZGVMaXN0Lmxlbmd0aDtcbn07XG5cbk1lLnByb3RvdHlwZS5hdCA9IGZ1bmN0aW9uIGF0KHJlcXVlc3RlZEluZGV4LCBuaWNrbmFtZSkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBOdW1iZXIsIFt1bmRlZmluZWQsIFN0cmluZ10gXSk7XG5cblx0dmFyIGluZGV4ID0gcmVxdWVzdGVkSW5kZXg7XG5cdHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCgpO1xuXHRpZiAoaW5kZXggPCAwKSBpbmRleCA9IGxlbmd0aCArIGluZGV4O1xuXG5cdGVuc3VyZS50aGF0KFxuXHRcdGluZGV4ID49IDAgJiYgaW5kZXggPCBsZW5ndGgsXG5cdFx0XCInXCIgKyB0aGlzLl9uaWNrbmFtZSArIFwiJ1tcIiArIHJlcXVlc3RlZEluZGV4ICsgXCJdIGlzIG91dCBvZiBib3VuZHM7IGxpc3QgbGVuZ3RoIGlzIFwiICsgbGVuZ3RoXG5cdCk7XG5cdHZhciBlbGVtZW50ID0gdGhpcy5fbm9kZUxpc3RbaW5kZXhdO1xuXG5cdGlmIChuaWNrbmFtZSA9PT0gdW5kZWZpbmVkKSBuaWNrbmFtZSA9IHRoaXMuX25pY2tuYW1lICsgXCJbXCIgKyBpbmRleCArIFwiXVwiO1xuXHRyZXR1cm4gbmV3IFFFbGVtZW50KGVsZW1lbnQsIHRoaXMuX2ZyYW1lLCBuaWNrbmFtZSk7XG59O1xuXG5NZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHRyZXR1cm4gXCInXCIgKyB0aGlzLl9uaWNrbmFtZSArIFwiJyBsaXN0XCI7XG59OyIsIi8vIENvcHlyaWdodCAoYykgMjAxNC0yMDE1IFRpdGFuaXVtIEkuVC4gTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBGb3IgbGljZW5zZSwgc2VlIFwiUkVBRE1FXCIgb3IgXCJMSUNFTlNFXCIgZmlsZS5cbihmdW5jdGlvbigpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0dmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuL3V0aWwvZW5zdXJlLmpzXCIpO1xuXHR2YXIgc2hpbSA9IHJlcXVpcmUoXCIuL3V0aWwvc2hpbS5qc1wiKTtcblx0dmFyIHF1aXhvdGUgPSByZXF1aXJlKFwiLi9xdWl4b3RlLmpzXCIpO1xuXHR2YXIgUUVsZW1lbnQgPSByZXF1aXJlKFwiLi9xX2VsZW1lbnQuanNcIik7XG5cdHZhciBRRWxlbWVudExpc3QgPSByZXF1aXJlKFwiLi9xX2VsZW1lbnRfbGlzdC5qc1wiKTtcblx0dmFyIFFWaWV3cG9ydCA9IHJlcXVpcmUoXCIuL3Ffdmlld3BvcnQuanNcIik7XG5cdHZhciBRUGFnZSA9IHJlcXVpcmUoXCIuL3FfcGFnZS5qc1wiKTtcblx0dmFyIGFzeW5jID0gcmVxdWlyZShcIi4uL3ZlbmRvci9hc3luYy0xLjQuMi5qc1wiKTtcblxuXHR2YXIgTWUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFFGcmFtZShmcmFtZURvbSkge1xuXHRcdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbT2JqZWN0XSk7XG5cdFx0ZW5zdXJlLnRoYXQoZnJhbWVEb20udGFnTmFtZSA9PT0gXCJJRlJBTUVcIiwgXCJRRnJhbWUgRE9NIGVsZW1lbnQgbXVzdCBiZSBhbiBpZnJhbWVcIik7XG5cblx0XHR0aGlzLl9kb21FbGVtZW50ID0gZnJhbWVEb207XG5cdFx0dGhpcy5fbG9hZGVkID0gZmFsc2U7XG5cdFx0dGhpcy5fcmVtb3ZlZCA9IGZhbHNlO1xuXHR9O1xuXG5cdGZ1bmN0aW9uIGxvYWRlZChzZWxmLCB3aWR0aCwgaGVpZ2h0LCBzcmMsIHN0eWxlc2hlZXRzKSB7XG5cdFx0c2VsZi5fbG9hZGVkID0gdHJ1ZTtcblx0XHRzZWxmLl9kb2N1bWVudCA9IHNlbGYuX2RvbUVsZW1lbnQuY29udGVudERvY3VtZW50O1xuXHRcdHNlbGYuX29yaWdpbmFsQm9keSA9IHNlbGYuX2RvY3VtZW50LmJvZHkuaW5uZXJIVE1MO1xuXHRcdHNlbGYuX29yaWdpbmFsV2lkdGggPSB3aWR0aDtcblx0XHRzZWxmLl9vcmlnaW5hbEhlaWdodCA9IGhlaWdodDtcblx0XHRzZWxmLl9vcmlnaW5hbFNyYyA9IHNyYztcblx0XHRzZWxmLl9vcmlnaW5hbFN0eWxlc2hlZXRzID0gc3R5bGVzaGVldHM7XG5cdH1cblxuXHRNZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocGFyZW50RWxlbWVudCwgb3B0aW9ucywgY2FsbGJhY2spIHtcblx0XHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW09iamVjdCwgW09iamVjdCwgRnVuY3Rpb25dLCBbdW5kZWZpbmVkLCBGdW5jdGlvbl1dKTtcblx0XHRpZiAoY2FsbGJhY2sgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Y2FsbGJhY2sgPSBvcHRpb25zO1xuXHRcdFx0b3B0aW9ucyA9IHt9O1xuXHRcdH1cblx0XHR2YXIgd2lkdGggPSBvcHRpb25zLndpZHRoIHx8IDIwMDA7XG5cdFx0dmFyIGhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IDIwMDA7XG5cdFx0dmFyIHNyYyA9IG9wdGlvbnMuc3JjO1xuXHRcdHZhciBzdHlsZXNoZWV0cyA9IG9wdGlvbnMuc3R5bGVzaGVldCB8fCBbXTtcblx0XHRpZiAoIXNoaW0uQXJyYXkuaXNBcnJheShzdHlsZXNoZWV0cykpIHN0eWxlc2hlZXRzID0gWyBzdHlsZXNoZWV0cyBdO1xuXG5cdFx0dmFyIGVyciA9IGNoZWNrVXJscyhzcmMsIHN0eWxlc2hlZXRzKTtcblx0XHRpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcblxuXHRcdHZhciBpZnJhbWUgPSBpbnNlcnRJZnJhbWUocGFyZW50RWxlbWVudCwgd2lkdGgsIGhlaWdodCk7XG5cdFx0c2hpbS5FdmVudFRhcmdldC5hZGRFdmVudExpc3RlbmVyKGlmcmFtZSwgXCJsb2FkXCIsIG9uRnJhbWVMb2FkKTtcblx0XHRzZXRJZnJhbWVDb250ZW50KGlmcmFtZSwgc3JjKTtcblxuXHRcdHZhciBmcmFtZSA9IG5ldyBNZShpZnJhbWUpO1xuXHRcdHNldEZyYW1lTG9hZENhbGxiYWNrKGZyYW1lLCBjYWxsYmFjayk7XG5cblx0XHRyZXR1cm4gZnJhbWU7XG5cblx0XHRmdW5jdGlvbiBvbkZyYW1lTG9hZCgpIHtcblx0XHRcdC8vIFdPUktBUk9VTkQgTW9iaWxlIFNhZmFyaSA3LjAuMCwgU2FmYXJpIDYuMi4wLCBDaHJvbWUgMzguMC4yMTI1OiBmcmFtZSBpcyBsb2FkZWQgc3luY2hyb25vdXNseVxuXHRcdFx0Ly8gV2UgZm9yY2UgaXQgdG8gYmUgYXN5bmNocm9ub3VzIGhlcmVcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGxvYWRlZChmcmFtZSwgd2lkdGgsIGhlaWdodCwgc3JjLCBzdHlsZXNoZWV0cyk7XG5cdFx0XHRcdGxvYWRTdHlsZXNoZWV0cyhmcmFtZSwgc3R5bGVzaGVldHMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGZyYW1lLl9mcmFtZUxvYWRDYWxsYmFjayhudWxsLCBmcmFtZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSwgMCk7XG5cdFx0fVxuXHR9O1xuXG5cdGZ1bmN0aW9uIHNldEZyYW1lTG9hZENhbGxiYWNrKGZyYW1lLCBjYWxsYmFjaykge1xuXHRcdGZyYW1lLl9mcmFtZUxvYWRDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2hlY2tVcmxzKHNyYywgc3R5bGVzaGVldHMpIHtcblx0XHRpZiAoIXVybEV4aXN0cyhzcmMpKSByZXR1cm4gZXJyb3IoXCJzcmNcIiwgc3JjKTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzaGVldHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciB1cmwgPSBzdHlsZXNoZWV0c1tpXTtcblx0XHRcdGlmICghdXJsRXhpc3RzKHVybCkpIHJldHVybiBlcnJvcihcInN0eWxlc2hlZXRcIiwgdXJsKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdGZ1bmN0aW9uIGVycm9yKG5hbWUsIHVybCkge1xuXHRcdFx0cmV0dXJuIG5ldyBFcnJvcihcIjQwNCBlcnJvciB3aGlsZSBsb2FkaW5nIFwiICsgbmFtZSArIFwiIChcIiArIHVybCArIFwiKVwiKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiB1cmxFeGlzdHModXJsKSB7XG5cdFx0aWYgKHVybCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcblxuXHRcdHZhciBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0aHR0cC5vcGVuKCdIRUFEJywgdXJsLCBmYWxzZSk7XG5cdFx0aHR0cC5zZW5kKCk7XG5cdFx0cmV0dXJuIGh0dHAuc3RhdHVzICE9PSA0MDQ7XG5cdH1cblxuXHRmdW5jdGlvbiBpbnNlcnRJZnJhbWUocGFyZW50RWxlbWVudCwgd2lkdGgsIGhlaWdodCkge1xuXHRcdHZhciBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xuXHRcdGlmcmFtZS5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCB3aWR0aCk7XG5cdFx0aWZyYW1lLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBoZWlnaHQpO1xuXHRcdGlmcmFtZS5zZXRBdHRyaWJ1dGUoXCJmcmFtZWJvcmRlclwiLCBcIjBcIik7ICAgIC8vIFdPUktBUk9VTkQgSUUgODogZG9uJ3QgaW5jbHVkZSBmcmFtZSBib3JkZXIgaW4gcG9zaXRpb24gY2FsY3Ncblx0XHRwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGlmcmFtZSk7XG5cdFx0cmV0dXJuIGlmcmFtZTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNldElmcmFtZUNvbnRlbnQoaWZyYW1lLCBzcmMpIHtcblx0XHRpZiAoc3JjID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHdyaXRlU3RhbmRhcmRzTW9kZUh0bWwoaWZyYW1lKTtcblx0XHR9XHRlbHNlIHtcblx0XHRcdHNldElmcmFtZVNyYyhpZnJhbWUsIHNyYyk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gc2V0SWZyYW1lU3JjKGlmcmFtZSwgc3JjKSB7XG5cdFx0aWZyYW1lLnNldEF0dHJpYnV0ZShcInNyY1wiLCBzcmMpO1xuXHR9XG5cblx0ZnVuY3Rpb24gd3JpdGVTdGFuZGFyZHNNb2RlSHRtbChpZnJhbWUpIHtcblx0XHR2YXIgc3RhbmRhcmRzTW9kZSA9IFwiPCFET0NUWVBFIGh0bWw+XFxuPGh0bWw+PGhlYWQ+PC9oZWFkPjxib2R5PjwvYm9keT48L2h0bWw+XCI7XG5cdFx0aWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQub3BlbigpO1xuXHRcdGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LndyaXRlKHN0YW5kYXJkc01vZGUpO1xuXHRcdGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LmNsb3NlKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBsb2FkU3R5bGVzaGVldHMoc2VsZiwgdXJscywgY2FsbGJhY2spIHtcblx0XHRhc3luYy5lYWNoKHVybHMsIGFkZExpbmtUYWcsIGNhbGxiYWNrKTtcblxuXHRcdGZ1bmN0aW9uIGFkZExpbmtUYWcodXJsLCBvbkxpbmtMb2FkKSB7XG5cdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXHRcdFx0c2hpbS5FdmVudFRhcmdldC5hZGRFdmVudExpc3RlbmVyKGxpbmssIFwibG9hZFwiLCBmdW5jdGlvbihldmVudCkgeyBvbkxpbmtMb2FkKG51bGwpOyB9KTtcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKFwicmVsXCIsIFwic3R5bGVzaGVldFwiKTtcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHQvY3NzXCIpO1xuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHVybCk7XG5cdFx0XHRzaGltLkRvY3VtZW50LmhlYWQoc2VsZi5fZG9jdW1lbnQpLmFwcGVuZENoaWxkKGxpbmspO1xuXHRcdH1cblx0fVxuXG5cdE1lLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuXHRcdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cdFx0ZW5zdXJlVXNhYmxlKHRoaXMpO1xuXG5cdFx0dGhpcy5fZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSB0aGlzLl9vcmlnaW5hbEJvZHk7XG5cdFx0dGhpcy5zY3JvbGwoMCwgMCk7XG5cdFx0dGhpcy5yZXNpemUodGhpcy5fb3JpZ2luYWxXaWR0aCwgdGhpcy5fb3JpZ2luYWxIZWlnaHQpO1xuXHR9O1xuXG5cdE1lLnByb3RvdHlwZS5yZWxvYWQgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXHRcdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbRnVuY3Rpb25dKTtcblx0XHRlbnN1cmVVc2FibGUodGhpcyk7XG5cblx0XHR2YXIgZnJhbWUgPSB0aGlzO1xuXHRcdHZhciBpZnJhbWUgPSB0aGlzLl9kb21FbGVtZW50O1xuXHRcdHZhciBzcmMgPSB0aGlzLl9vcmlnaW5hbFNyYztcblxuXHRcdHRoaXMucmVzaXplKHRoaXMuX29yaWdpbmFsV2lkdGgsIHRoaXMuX29yaWdpbmFsSGVpZ2h0KTtcblx0XHRzZXRGcmFtZUxvYWRDYWxsYmFjayhmcmFtZSwgY2FsbGJhY2spO1xuXHRcdHNldElmcmFtZUNvbnRlbnQoaWZyYW1lLCBzcmMpO1xuXHR9O1xuXG5cdE1lLnByb3RvdHlwZS50b0RvbUVsZW1lbnQgPSBmdW5jdGlvbigpIHtcblx0XHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXHRcdGVuc3VyZU5vdFJlbW92ZWQodGhpcyk7XG5cblx0XHRyZXR1cm4gdGhpcy5fZG9tRWxlbWVudDtcblx0fTtcblxuXHRNZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG5cdFx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblx0XHRlbnN1cmVMb2FkZWQodGhpcyk7XG5cdFx0aWYgKHRoaXMuX3JlbW92ZWQpIHJldHVybjtcblxuXHRcdHRoaXMuX2RvbUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9kb21FbGVtZW50KTtcblx0XHR0aGlzLl9yZW1vdmVkID0gdHJ1ZTtcblx0fTtcblxuXHRNZS5wcm90b3R5cGUudmlld3BvcnQgPSBmdW5jdGlvbigpIHtcblx0XHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXHRcdGVuc3VyZVVzYWJsZSh0aGlzKTtcblxuXHRcdHJldHVybiBuZXcgUVZpZXdwb3J0KHRoaXMpO1xuXHR9O1xuXG5cdE1lLnByb3RvdHlwZS5wYWdlID0gZnVuY3Rpb24oKSB7XG5cdFx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblx0XHRlbnN1cmVVc2FibGUodGhpcyk7XG5cblx0XHRyZXR1cm4gbmV3IFFQYWdlKHRoaXMpO1xuXHR9O1xuXG5cdE1lLnByb3RvdHlwZS5ib2R5ID0gZnVuY3Rpb24oKSB7XG5cdFx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHRcdHJldHVybiB0aGlzLmdldChcImJvZHlcIik7XG5cdH07XG5cblx0TWUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGh0bWwsIG5pY2tuYW1lKSB7XG5cdFx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtTdHJpbmcsIFt1bmRlZmluZWQsIFN0cmluZ11dKTtcblx0XHRpZiAobmlja25hbWUgPT09IHVuZGVmaW5lZCkgbmlja25hbWUgPSBodG1sO1xuXHRcdGVuc3VyZVVzYWJsZSh0aGlzKTtcblxuXHRcdHZhciB0ZW1wRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0dGVtcEVsZW1lbnQuaW5uZXJIVE1MID0gc2hpbS5TdHJpbmcudHJpbShodG1sKTtcblx0XHRlbnN1cmUudGhhdChcblx0XHRcdHRlbXBFbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxLFxuXHRcdFx0XCJFeHBlY3RlZCBvbmUgZWxlbWVudCwgYnV0IGdvdCBcIiArIHRlbXBFbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoICsgXCIgKFwiICsgaHRtbCArIFwiKVwiXG5cdFx0KTtcblxuXHRcdHZhciBpbnNlcnRlZEVsZW1lbnQgPSB0ZW1wRWxlbWVudC5jaGlsZE5vZGVzWzBdO1xuXHRcdHRoaXMuX2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW5zZXJ0ZWRFbGVtZW50KTtcblx0XHRyZXR1cm4gbmV3IFFFbGVtZW50KGluc2VydGVkRWxlbWVudCwgdGhpcywgbmlja25hbWUpO1xuXHR9O1xuXG5cdE1lLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihzZWxlY3Rvciwgbmlja25hbWUpIHtcblx0XHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW1N0cmluZywgW3VuZGVmaW5lZCwgU3RyaW5nXV0pO1xuXHRcdGlmIChuaWNrbmFtZSA9PT0gdW5kZWZpbmVkKSBuaWNrbmFtZSA9IHNlbGVjdG9yO1xuXHRcdGVuc3VyZVVzYWJsZSh0aGlzKTtcblxuXHRcdHZhciBub2RlcyA9IHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdGVuc3VyZS50aGF0KG5vZGVzLmxlbmd0aCA9PT0gMSwgXCJFeHBlY3RlZCBvbmUgZWxlbWVudCB0byBtYXRjaCAnXCIgKyBzZWxlY3RvciArIFwiJywgYnV0IGZvdW5kIFwiICsgbm9kZXMubGVuZ3RoKTtcblx0XHRyZXR1cm4gbmV3IFFFbGVtZW50KG5vZGVzWzBdLCB0aGlzLCBuaWNrbmFtZSk7XG5cdH07XG5cblx0TWUucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uKHNlbGVjdG9yLCBuaWNrbmFtZSkge1xuXHRcdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbU3RyaW5nLCBbdW5kZWZpbmVkLCBTdHJpbmddXSk7XG5cdFx0aWYgKG5pY2tuYW1lID09PSB1bmRlZmluZWQpIG5pY2tuYW1lID0gc2VsZWN0b3I7XG5cblx0XHRyZXR1cm4gbmV3IFFFbGVtZW50TGlzdCh0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSwgdGhpcywgbmlja25hbWUpO1xuXHR9O1xuXG5cdE1lLnByb3RvdHlwZS5zY3JvbGwgPSBmdW5jdGlvbiBzY3JvbGwoeCwgeSkge1xuXHRcdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbTnVtYmVyLCBOdW1iZXJdKTtcblxuXHRcdHRoaXMuX2RvbUVsZW1lbnQuY29udGVudFdpbmRvdy5zY3JvbGwoeCwgeSk7XG5cdH07XG5cblx0TWUucHJvdG90eXBlLmdldFJhd1Njcm9sbFBvc2l0aW9uID0gZnVuY3Rpb24gZ2V0UmF3U2Nyb2xsUG9zaXRpb24oKSB7XG5cdFx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHR4OiBzaGltLldpbmRvdy5wYWdlWE9mZnNldCh0aGlzLl9kb21FbGVtZW50LmNvbnRlbnRXaW5kb3csIHRoaXMuX2RvY3VtZW50KSxcblx0XHRcdHk6IHNoaW0uV2luZG93LnBhZ2VZT2Zmc2V0KHRoaXMuX2RvbUVsZW1lbnQuY29udGVudFdpbmRvdywgdGhpcy5fZG9jdW1lbnQpXG5cdFx0fTtcblx0fTtcblxuXHRNZS5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcblx0XHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW051bWJlciwgTnVtYmVyXSk7XG5cblx0XHR0aGlzLl9kb21FbGVtZW50LnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIFwiXCIgKyB3aWR0aCk7XG5cdFx0dGhpcy5fZG9tRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgXCJcIiArIGhlaWdodCk7XG5cdH07XG5cblx0ZnVuY3Rpb24gZW5zdXJlVXNhYmxlKHNlbGYpIHtcblx0XHRlbnN1cmVMb2FkZWQoc2VsZik7XG5cdFx0ZW5zdXJlTm90UmVtb3ZlZChzZWxmKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVuc3VyZUxvYWRlZChzZWxmKSB7XG5cdFx0ZW5zdXJlLnRoYXQoc2VsZi5fbG9hZGVkLCBcIlFGcmFtZSBub3QgbG9hZGVkOiBXYWl0IGZvciBmcmFtZSBjcmVhdGlvbiBjYWxsYmFjayB0byBleGVjdXRlIGJlZm9yZSB1c2luZyBmcmFtZVwiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVuc3VyZU5vdFJlbW92ZWQoc2VsZikge1xuXHRcdGVuc3VyZS50aGF0KCFzZWxmLl9yZW1vdmVkLCBcIkF0dGVtcHRlZCB0byB1c2UgZnJhbWUgYWZ0ZXIgaXQgd2FzIHJlbW92ZWRcIik7XG5cdH1cblxufSkoKTtcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxNCBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuL3V0aWwvZW5zdXJlLmpzXCIpO1xudmFyIFBhZ2VTaXplID0gcmVxdWlyZShcIi4vZGVzY3JpcHRvcnMvcGFnZV9zaXplLmpzXCIpO1xudmFyIFBhZ2VFZGdlID0gcmVxdWlyZShcIi4vZGVzY3JpcHRvcnMvcGFnZV9lZGdlLmpzXCIpO1xudmFyIENlbnRlciA9IHJlcXVpcmUoXCIuL2Rlc2NyaXB0b3JzL2NlbnRlci5qc1wiKTtcbnZhciBBc3NlcnRhYmxlID0gcmVxdWlyZShcIi4vYXNzZXJ0YWJsZS5qc1wiKTtcblxudmFyIE1lID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBRUGFnZShmcmFtZSkge1xuXHR2YXIgUUZyYW1lID0gcmVxdWlyZShcIi4vcV9mcmFtZS5qc1wiKTsgICAvLyBicmVhayBjaXJjdWxhciBkZXBlbmRlbmN5XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIFFGcmFtZSBdKTtcblxuXHQvLyBwcm9wZXJ0aWVzXG5cdHRoaXMud2lkdGggPSBQYWdlU2l6ZS54KGZyYW1lKTtcblx0dGhpcy5oZWlnaHQgPSBQYWdlU2l6ZS55KGZyYW1lKTtcblxuXHR0aGlzLnRvcCA9IFBhZ2VFZGdlLnRvcChmcmFtZSk7XG5cdHRoaXMucmlnaHQgPSBQYWdlRWRnZS5yaWdodChmcmFtZSk7XG5cdHRoaXMuYm90dG9tID0gUGFnZUVkZ2UuYm90dG9tKGZyYW1lKTtcblx0dGhpcy5sZWZ0ID0gUGFnZUVkZ2UubGVmdChmcmFtZSk7XG5cblx0dGhpcy5jZW50ZXIgPSBDZW50ZXIueCh0aGlzLmxlZnQsIHRoaXMucmlnaHQsIFwiY2VudGVyIG9mIHBhZ2VcIik7XG5cdHRoaXMubWlkZGxlID0gQ2VudGVyLnkodGhpcy50b3AsIHRoaXMuYm90dG9tLCBcIm1pZGRsZSBvZiBwYWdlXCIpO1xufTtcbkFzc2VydGFibGUuZXh0ZW5kKE1lKTtcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxNCBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuL3V0aWwvZW5zdXJlLmpzXCIpO1xudmFyIFZpZXdwb3J0U2l6ZSA9IHJlcXVpcmUoXCIuL2Rlc2NyaXB0b3JzL3ZpZXdwb3J0X3NpemUuanNcIik7XG52YXIgVmlld3BvcnRFZGdlID0gcmVxdWlyZShcIi4vZGVzY3JpcHRvcnMvdmlld3BvcnRfZWRnZS5qc1wiKTtcbnZhciBDZW50ZXIgPSByZXF1aXJlKFwiLi9kZXNjcmlwdG9ycy9jZW50ZXIuanNcIik7XG52YXIgQXNzZXJ0YWJsZSA9IHJlcXVpcmUoXCIuL2Fzc2VydGFibGUuanNcIik7XG5cbnZhciBNZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUVZpZXdwb3J0KGZyYW1lKSB7XG5cdHZhciBRRnJhbWUgPSByZXF1aXJlKFwiLi9xX2ZyYW1lLmpzXCIpOyAgIC8vIGJyZWFrIGNpcmN1bGFyIGRlcGVuZGVuY3lcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgUUZyYW1lIF0pO1xuXG5cdC8vIHByb3BlcnRpZXNcblx0dGhpcy53aWR0aCA9IFZpZXdwb3J0U2l6ZS54KGZyYW1lKTtcblx0dGhpcy5oZWlnaHQgPSBWaWV3cG9ydFNpemUueShmcmFtZSk7XG5cblx0dGhpcy50b3AgPSBWaWV3cG9ydEVkZ2UudG9wKGZyYW1lKTtcblx0dGhpcy5yaWdodCA9IFZpZXdwb3J0RWRnZS5yaWdodChmcmFtZSk7XG5cdHRoaXMuYm90dG9tID0gVmlld3BvcnRFZGdlLmJvdHRvbShmcmFtZSk7XG5cdHRoaXMubGVmdCA9IFZpZXdwb3J0RWRnZS5sZWZ0KGZyYW1lKTtcblxuXHR0aGlzLmNlbnRlciA9IENlbnRlci54KHRoaXMubGVmdCwgdGhpcy5yaWdodCwgXCJjZW50ZXIgb2Ygdmlld3BvcnRcIik7XG5cdHRoaXMubWlkZGxlID0gQ2VudGVyLnkodGhpcy50b3AsIHRoaXMuYm90dG9tLCBcIm1pZGRsZSBvZiB2aWV3cG9ydFwiKTtcbn07XG5Bc3NlcnRhYmxlLmV4dGVuZChNZSk7XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlbnN1cmUgPSByZXF1aXJlKFwiLi91dGlsL2Vuc3VyZS5qc1wiKTtcbnZhciBRRnJhbWUgPSByZXF1aXJlKFwiLi9xX2ZyYW1lLmpzXCIpO1xudmFyIFNpemUgPSByZXF1aXJlKFwiLi92YWx1ZXMvc2l6ZS5qc1wiKTtcblxudmFyIGZlYXR1cmVzID0gbnVsbDtcblxuZXhwb3J0cy5jcmVhdGVGcmFtZSA9IGZ1bmN0aW9uKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG5cdHJldHVybiBRRnJhbWUuY3JlYXRlKGRvY3VtZW50LmJvZHksIG9wdGlvbnMsIGZ1bmN0aW9uKGVyciwgY2FsbGJhY2tGcmFtZSkge1xuXHRcdGlmIChmZWF0dXJlcyA9PT0gbnVsbCkge1xuXHRcdFx0ZGV0ZWN0QnJvd3NlckZlYXR1cmVzKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjYWxsYmFjayhlcnIsIGNhbGxiYWNrRnJhbWUpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Y2FsbGJhY2soZXJyLCBjYWxsYmFja0ZyYW1lKTtcblx0XHR9XG5cdH0pO1xufTtcblxuZXhwb3J0cy5icm93c2VyID0ge307XG5cbmV4cG9ydHMuYnJvd3Nlci5lbmxhcmdlc0ZyYW1lVG9QYWdlU2l6ZSA9IGNyZWF0ZURldGVjdGlvbk1ldGhvZChcImVubGFyZ2VzRnJhbWVcIik7XG5leHBvcnRzLmJyb3dzZXIuZW5sYXJnZXNGb250cyA9IGNyZWF0ZURldGVjdGlvbk1ldGhvZChcImVubGFyZ2VzRm9udHNcIik7XG5cbmZ1bmN0aW9uIGNyZWF0ZURldGVjdGlvbk1ldGhvZChwcm9wZXJ0eU5hbWUpIHtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0XHR2YXIgZmVhdHVyZSA9IGZlYXR1cmVzW3Byb3BlcnR5TmFtZV07XG5cdFx0ZW5zdXJlLnRoYXQoZmVhdHVyZSAhPT0gdW5kZWZpbmVkLCBcIk11c3QgY3JlYXRlIGEgZnJhbWUgYmVmb3JlIHVzaW5nIFF1aXhvdGUgYnJvd3NlciBmZWF0dXJlIGRldGVjdGlvbi5cIik7XG5cdFx0cmV0dXJuIGZlYXR1cmU7XG5cdH07XG59XG5cbmZ1bmN0aW9uIGRldGVjdEJyb3dzZXJGZWF0dXJlcyhjYWxsYmFjaykge1xuXHR2YXIgRlJBTUVfV0lEVEggPSAxNTAwO1xuXHR2YXIgRlJBTUVfSEVJR0hUID0gMjAwO1xuXG5cdGZlYXR1cmVzID0ge307XG5cdHZhciBmcmFtZSA9IFFGcmFtZS5jcmVhdGUoZG9jdW1lbnQuYm9keSwgeyB3aWR0aDogRlJBTUVfV0lEVEgsIGhlaWdodDogRlJBTUVfSEVJR0hUIH0sIGZ1bmN0aW9uKGVycikge1xuXHRcdGlmIChlcnIpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiRXJyb3Igd2hpbGUgY3JlYXRpbmcgUXVpeG90ZSBicm93c2VyIGZlYXR1cmUgZGV0ZWN0aW9uIGZyYW1lOiBcIiArIGVycik7XG5cdFx0XHRyZXR1cm4gY2FsbGJhY2soKTtcblx0XHR9XG5cblx0XHR0cnkge1xuXHRcdFx0ZmVhdHVyZXMuZW5sYXJnZXNGcmFtZSA9IGRldGVjdEZyYW1lRW5sYXJnZW1lbnQoZnJhbWUsIEZSQU1FX1dJRFRIKTtcblxuXHRcdFx0ZnJhbWUucmVzZXQoKTtcblx0XHRcdGRldGVjdEZvbnRFbmxhcmdlbWVudChmcmFtZSwgRlJBTUVfV0lEVEgsIGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdFx0XHRmZWF0dXJlcy5lbmxhcmdlc0ZvbnRzID0gcmVzdWx0O1xuXHRcdFx0XHRmcmFtZS5yZW1vdmUoKTtcblx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKCk7XG5cdFx0XHR9KTtcblxuXHRcdH1cblx0XHRjYXRjaChlcnIyKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkVycm9yIGR1cmluZyBRdWl4b3RlIGJyb3dzZXIgZmVhdHVyZSBkZXRlY3Rpb246IFwiICsgZXJyMik7XG5cdFx0fVxuXHR9KTtcblxufVxuXG5mdW5jdGlvbiBkZXRlY3RGcmFtZUVubGFyZ2VtZW50KGZyYW1lLCBmcmFtZVdpZHRoKSB7XG5cdGZyYW1lLmFkZChcIjxkaXYgc3R5bGU9J3dpZHRoOiBcIiArIChmcmFtZVdpZHRoICsgMjAwKSArIFwicHgnPmZvcmNlIHNjcm9sbGluZzwvZGl2PlwiKTtcblx0cmV0dXJuICFmcmFtZS52aWV3cG9ydCgpLndpZHRoLnZhbHVlKCkuZXF1YWxzKFNpemUuY3JlYXRlKGZyYW1lV2lkdGgpKTtcbn1cblxuZnVuY3Rpb24gZGV0ZWN0Rm9udEVubGFyZ2VtZW50KGZyYW1lLCBmcmFtZVdpZHRoLCBjYWxsYmFjaykge1xuXHRlbnN1cmUudGhhdChmcmFtZVdpZHRoID49IDE1MDAsIFwiRGV0ZWN0b3IgZnJhbWUgd2lkdGggbXVzdCBiZSBsYXJnZXIgdGhhbiBzY3JlZW4gdG8gZGV0ZWN0IGZvbnQgZW5sYXJnZW1lbnRcIik7XG5cblx0Ly8gV09SS0FST1VORCBJRSA4OiB3ZSB1c2UgYSA8ZGl2PiBiZWNhdXNlIHRoZSA8c3R5bGU+IHRhZyBjYW4ndCBiZSBhZGRlZCBieSBmcmFtZS5hZGQoKS4gQXQgdGhlIHRpbWUgb2YgdGhpc1xuXHQvLyB3cml0aW5nLCBJJ20gbm90IHN1cmUgaWYgdGhlIGlzc3VlIGlzIHdpdGggZnJhbWUuYWRkKCkgb3IgaWYgSUUganVzdCBjYW4ndCBwcm9ncmFtbWF0aWNhbGx5IGFkZCA8c3R5bGU+IHRhZ3MuXG5cdGZyYW1lLmFkZChcIjxkaXY+PHN0eWxlPnAgeyBmb250LXNpemU6IDE1cHg7IH08L3N0eWxlPjwvZGl2PlwiKTtcblxuXHR2YXIgdGV4dCA9IGZyYW1lLmFkZChcIjxwPmFyYml0cmFyeSB0ZXh0PC9wPlwiKTtcblx0ZnJhbWUuYWRkKFwiPHA+bXVzdCBoYXZlIHR3byBwIHRhZ3MgdG8gd29yazwvcD5cIik7XG5cblx0Ly8gV09SS0FST1VORCBJRSA4OiBuZWVkIHRvIGZvcmNlIHJlZmxvdyBvciBnZXR0aW5nIGZvbnQtc2l6ZSBtYXkgZmFpbCBiZWxvd1xuXHQvLyBUaGlzIHNlZW1zIHRvIG9jY3VyIHdoZW4gSUUgaXMgcnVubmluZyBpbiBhIHNsb3cgVmlydHVhbEJveCBWTS4gVGhlcmUgaXMgbm8gdGVzdCBmb3IgdGhpcyBsaW5lLlxuXHR2YXIgZm9yY2VSZWZsb3cgPSB0ZXh0Lm9mZnNldEhlaWdodDtcblxuXHQvLyBXT1JLQVJPVU5EIFNhZmFyaSA4LjAuMDogdGltZW91dCByZXF1aXJlZCBiZWNhdXNlIGZvbnQgaXMgZW5sYXJnZWQgYXN5bmNocm9ub3VzbHlcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHR2YXIgZm9udFNpemUgPSB0ZXh0LmdldFJhd1N0eWxlKFwiZm9udC1zaXplXCIpO1xuXHRcdGVuc3VyZS50aGF0KGZvbnRTaXplICE9PSBcIlwiLCBcIkV4cGVjdGVkIGZvbnQtc2l6ZSB0byBiZSBhIHZhbHVlXCIpO1xuXG5cdFx0Ly8gV09SS0FST1VORCBJRSA4OiBpZ25vcmVzIDxzdHlsZT4gdGFnIHdlIGFkZGVkIGFib3ZlXG5cdFx0aWYgKGZvbnRTaXplID09PSBcIjEycHRcIikgcmV0dXJuIGNhbGxiYWNrKGZhbHNlKTtcblxuXHRcdHJldHVybiBjYWxsYmFjayhmb250U2l6ZSAhPT0gXCIxNXB4XCIpO1xuXHR9LCAwKTtcblxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFNlZSBMSUNFTlNFLlRYVCBmb3IgZGV0YWlscy5cblwidXNlIHN0cmljdFwiO1xuXG4vLyBSdW50aW1lIGFzc2VydGlvbnMgZm9yIHByb2R1Y3Rpb24gY29kZS4gKENvbnRyYXN0IHRvIGFzc2VydC5qcywgd2hpY2ggaXMgZm9yIHRlc3QgY29kZS4pXG5cbnZhciBzaGltID0gcmVxdWlyZShcIi4vc2hpbS5qc1wiKTtcbnZhciBvb3AgPSByZXF1aXJlKFwiLi9vb3AuanNcIik7XG5cbmV4cG9ydHMudGhhdCA9IGZ1bmN0aW9uKHZhcmlhYmxlLCBtZXNzYWdlKSB7XG5cdGlmIChtZXNzYWdlID09PSB1bmRlZmluZWQpIG1lc3NhZ2UgPSBcIkV4cGVjdGVkIGNvbmRpdGlvbiB0byBiZSB0cnVlXCI7XG5cblx0aWYgKHZhcmlhYmxlID09PSBmYWxzZSkgdGhyb3cgbmV3IEVuc3VyZUV4Y2VwdGlvbihleHBvcnRzLnRoYXQsIG1lc3NhZ2UpO1xuXHRpZiAodmFyaWFibGUgIT09IHRydWUpIHRocm93IG5ldyBFbnN1cmVFeGNlcHRpb24oZXhwb3J0cy50aGF0LCBcIkV4cGVjdGVkIGNvbmRpdGlvbiB0byBiZSB0cnVlIG9yIGZhbHNlXCIpO1xufTtcblxuZXhwb3J0cy51bnJlYWNoYWJsZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0aWYgKCFtZXNzYWdlKSBtZXNzYWdlID0gXCJVbnJlYWNoYWJsZSBjb2RlIGV4ZWN1dGVkXCI7XG5cblx0dGhyb3cgbmV3IEVuc3VyZUV4Y2VwdGlvbihleHBvcnRzLnVucmVhY2hhYmxlLCBtZXNzYWdlKTtcbn07XG5cbmV4cG9ydHMuc2lnbmF0dXJlID0gZnVuY3Rpb24oYXJncywgc2lnbmF0dXJlKSB7XG5cdHNpZ25hdHVyZSA9IHNpZ25hdHVyZSB8fCBbXTtcblx0dmFyIGV4cGVjdGVkQXJnQ291bnQgPSBzaWduYXR1cmUubGVuZ3RoO1xuXHR2YXIgYWN0dWFsQXJnQ291bnQgPSBhcmdzLmxlbmd0aDtcblxuXHRpZiAoYWN0dWFsQXJnQ291bnQgPiBleHBlY3RlZEFyZ0NvdW50KSB7XG5cdFx0dGhyb3cgbmV3IEVuc3VyZUV4Y2VwdGlvbihcblx0XHRcdGV4cG9ydHMuc2lnbmF0dXJlLFxuXHRcdFx0XCJGdW5jdGlvbiBjYWxsZWQgd2l0aCB0b28gbWFueSBhcmd1bWVudHM6IGV4cGVjdGVkIFwiICsgZXhwZWN0ZWRBcmdDb3VudCArIFwiIGJ1dCBnb3QgXCIgKyBhY3R1YWxBcmdDb3VudFxuXHRcdCk7XG5cdH1cblxuXHR2YXIgdHlwZSwgYXJnLCBuYW1lO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHNpZ25hdHVyZS5sZW5ndGg7IGkrKykge1xuXHRcdHR5cGUgPSBzaWduYXR1cmVbaV07XG5cdFx0YXJnID0gYXJnc1tpXTtcblx0XHRuYW1lID0gXCJBcmd1bWVudCBcIiArIGk7XG5cblx0XHRpZiAoIXNoaW0uQXJyYXkuaXNBcnJheSh0eXBlKSkgdHlwZSA9IFsgdHlwZSBdO1xuXHRcdGlmICghdHlwZU1hdGNoZXModHlwZSwgYXJnLCBuYW1lKSkge1xuXHRcdFx0dmFyIG1lc3NhZ2UgPSBuYW1lICsgXCIgZXhwZWN0ZWQgXCIgKyBleHBsYWluVHlwZSh0eXBlKSArIFwiLCBidXQgd2FzIFwiO1xuXHRcdFx0dGhyb3cgbmV3IEVuc3VyZUV4Y2VwdGlvbihleHBvcnRzLnNpZ25hdHVyZSwgbWVzc2FnZSArIGV4cGxhaW5BcmcoYXJnKSk7XG5cdFx0fVxuXHR9XG59O1xuXG5mdW5jdGlvbiB0eXBlTWF0Y2hlcyh0eXBlLCBhcmcpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKG9uZVR5cGVNYXRjaGVzKHR5cGVbaV0sIGFyZykpIHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcblxuXHRmdW5jdGlvbiBvbmVUeXBlTWF0Y2hlcyh0eXBlLCBhcmcpIHtcblx0XHRzd2l0Y2ggKGdldFR5cGUoYXJnKSkge1xuXHRcdFx0Y2FzZSBcImJvb2xlYW5cIjogcmV0dXJuIHR5cGUgPT09IEJvb2xlYW47XG5cdFx0XHRjYXNlIFwic3RyaW5nXCI6IHJldHVybiB0eXBlID09PSBTdHJpbmc7XG5cdFx0XHRjYXNlIFwibnVtYmVyXCI6IHJldHVybiB0eXBlID09PSBOdW1iZXI7XG5cdFx0XHRjYXNlIFwiYXJyYXlcIjogcmV0dXJuIHR5cGUgPT09IEFycmF5O1xuXHRcdFx0Y2FzZSBcImZ1bmN0aW9uXCI6IHJldHVybiB0eXBlID09PSBGdW5jdGlvbjtcblx0XHRcdGNhc2UgXCJvYmplY3RcIjogcmV0dXJuIHR5cGUgPT09IE9iamVjdCB8fCBhcmcgaW5zdGFuY2VvZiB0eXBlO1xuXHRcdFx0Y2FzZSBcInVuZGVmaW5lZFwiOiByZXR1cm4gdHlwZSA9PT0gdW5kZWZpbmVkO1xuXHRcdFx0Y2FzZSBcIm51bGxcIjogcmV0dXJuIHR5cGUgPT09IG51bGw7XG5cdFx0XHRjYXNlIFwiTmFOXCI6IHJldHVybiBpc05hTih0eXBlKTtcblxuXHRcdFx0ZGVmYXVsdDogZXhwb3J0cy51bnJlYWNoYWJsZSgpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBleHBsYWluVHlwZSh0eXBlKSB7XG5cdHZhciBqb2luZXIgPSBcIlwiO1xuXHR2YXIgcmVzdWx0ID0gXCJcIjtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlLmxlbmd0aDsgaSsrKSB7XG5cdFx0cmVzdWx0ICs9IGpvaW5lciArIGV4cGxhaW5PbmVUeXBlKHR5cGVbaV0pO1xuXHRcdGpvaW5lciA9IChpID09PSB0eXBlLmxlbmd0aCAtIDIpID8gXCIsIG9yIFwiIDogXCIsIFwiO1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG5cblx0ZnVuY3Rpb24gZXhwbGFpbk9uZVR5cGUodHlwZSkge1xuXHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0Y2FzZSBCb29sZWFuOiByZXR1cm4gXCJib29sZWFuXCI7XG5cdFx0XHRjYXNlIFN0cmluZzogcmV0dXJuIFwic3RyaW5nXCI7XG5cdFx0XHRjYXNlIE51bWJlcjogcmV0dXJuIFwibnVtYmVyXCI7XG5cdFx0XHRjYXNlIEFycmF5OiByZXR1cm4gXCJhcnJheVwiO1xuXHRcdFx0Y2FzZSBGdW5jdGlvbjogcmV0dXJuIFwiZnVuY3Rpb25cIjtcblx0XHRcdGNhc2UgbnVsbDogcmV0dXJuIFwibnVsbFwiO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0aWYgKHR5cGVvZiB0eXBlID09PSBcIm51bWJlclwiICYmIGlzTmFOKHR5cGUpKSByZXR1cm4gXCJOYU5cIjtcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9vcC5jbGFzc05hbWUodHlwZSkgKyBcIiBpbnN0YW5jZVwiO1xuXHRcdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGV4cGxhaW5BcmcoYXJnKSB7XG5cdHZhciB0eXBlID0gZ2V0VHlwZShhcmcpO1xuXHRpZiAodHlwZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHR5cGU7XG5cblx0cmV0dXJuIG9vcC5pbnN0YW5jZU5hbWUoYXJnKSArIFwiIGluc3RhbmNlXCI7XG59XG5cbmZ1bmN0aW9uIGdldFR5cGUodmFyaWFibGUpIHtcblx0dmFyIHR5cGUgPSB0eXBlb2YgdmFyaWFibGU7XG5cdGlmICh2YXJpYWJsZSA9PT0gbnVsbCkgdHlwZSA9IFwibnVsbFwiO1xuXHRpZiAoc2hpbS5BcnJheS5pc0FycmF5KHZhcmlhYmxlKSkgdHlwZSA9IFwiYXJyYXlcIjtcblx0aWYgKHR5cGUgPT09IFwibnVtYmVyXCIgJiYgaXNOYU4odmFyaWFibGUpKSB0eXBlID0gXCJOYU5cIjtcblx0cmV0dXJuIHR5cGU7XG59XG5cblxuLyoqKioqL1xuXG52YXIgRW5zdXJlRXhjZXB0aW9uID0gZXhwb3J0cy5FbnN1cmVFeGNlcHRpb24gPSBmdW5jdGlvbiBFbnN1cmVFeGNlcHRpb24oZm5Ub1JlbW92ZUZyb21TdGFja1RyYWNlLCBtZXNzYWdlKSB7XG5cdGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgZm5Ub1JlbW92ZUZyb21TdGFja1RyYWNlKTtcblx0ZWxzZSB0aGlzLnN0YWNrID0gKG5ldyBFcnJvcigpKS5zdGFjaztcblx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn07XG5FbnN1cmVFeGNlcHRpb24ucHJvdG90eXBlID0gc2hpbS5PYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5FbnN1cmVFeGNlcHRpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRW5zdXJlRXhjZXB0aW9uO1xuRW5zdXJlRXhjZXB0aW9uLnByb3RvdHlwZS5uYW1lID0gXCJFbnN1cmVFeGNlcHRpb25cIjtcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxNCBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG5cInVzZSBzdHJpY3RcIjtcblxuLy8gY2FuJ3QgdXNlIGVuc3VyZS5qcyBkdWUgdG8gY2lyY3VsYXIgZGVwZW5kZW5jeVxudmFyIHNoaW0gPSByZXF1aXJlKFwiLi9zaGltLmpzXCIpO1xuXG5leHBvcnRzLmNsYXNzTmFtZSA9IGZ1bmN0aW9uKGNvbnN0cnVjdG9yKSB7XG5cdGlmICh0eXBlb2YgY29uc3RydWN0b3IgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yKFwiTm90IGEgY29uc3RydWN0b3JcIik7XG5cdHJldHVybiBzaGltLkZ1bmN0aW9uLm5hbWUoY29uc3RydWN0b3IpO1xufTtcblxuZXhwb3J0cy5pbnN0YW5jZU5hbWUgPSBmdW5jdGlvbihvYmopIHtcblx0dmFyIHByb3RvdHlwZSA9IHNoaW0uT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG5cdGlmIChwcm90b3R5cGUgPT09IG51bGwpIHJldHVybiBcIjxubyBwcm90b3R5cGU+XCI7XG5cblx0dmFyIGNvbnN0cnVjdG9yID0gcHJvdG90eXBlLmNvbnN0cnVjdG9yO1xuXHRpZiAoY29uc3RydWN0b3IgPT09IHVuZGVmaW5lZCB8fCBjb25zdHJ1Y3RvciA9PT0gbnVsbCkgcmV0dXJuIFwiPGFub24+XCI7XG5cblx0cmV0dXJuIHNoaW0uRnVuY3Rpb24ubmFtZShjb25zdHJ1Y3Rvcik7XG59O1xuXG5leHBvcnRzLmV4dGVuZEZuID0gZnVuY3Rpb24gZXh0ZW5kRm4ocGFyZW50Q29uc3RydWN0b3IpIHtcblx0cmV0dXJuIGZ1bmN0aW9uKGNoaWxkQ29uc3RydWN0b3IpIHtcblx0XHRjaGlsZENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IHNoaW0uT2JqZWN0LmNyZWF0ZShwYXJlbnRDb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xuXHRcdGNoaWxkQ29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2hpbGRDb25zdHJ1Y3Rvcjtcblx0fTtcbn07XG5cbmV4cG9ydHMubWFrZUFic3RyYWN0ID0gZnVuY3Rpb24gbWFrZUFic3RyYWN0KGNvbnN0cnVjdG9yLCBtZXRob2RzKSB7XG5cdHZhciBuYW1lID0gc2hpbS5GdW5jdGlvbi5uYW1lKGNvbnN0cnVjdG9yKTtcblx0c2hpbS5BcnJheS5mb3JFYWNoKG1ldGhvZHMsIGZ1bmN0aW9uKG1ldGhvZCkge1xuXHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IobmFtZSArIFwiIHN1YmNsYXNzZXMgbXVzdCBpbXBsZW1lbnQgXCIgKyBtZXRob2QgKyBcIigpIG1ldGhvZFwiKTtcblx0XHR9O1xuXHR9KTtcblxuXHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY2hlY2tBYnN0cmFjdE1ldGhvZHMgPSBmdW5jdGlvbiBjaGVja0Fic3RyYWN0TWV0aG9kcygpIHtcblx0XHR2YXIgdW5pbXBsZW1lbnRlZCA9IFtdO1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRzaGltLkFycmF5LmZvckVhY2gobWV0aG9kcywgZnVuY3Rpb24obmFtZSkge1xuXHRcdFx0aWYgKHNlbGZbbmFtZV0gPT09IGNvbnN0cnVjdG9yLnByb3RvdHlwZVtuYW1lXSkgdW5pbXBsZW1lbnRlZC5wdXNoKG5hbWUgKyBcIigpXCIpO1xuXHRcdH0pO1xuXHRcdHJldHVybiB1bmltcGxlbWVudGVkO1xuXHR9O1xufTsiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuQXJyYXkgPSB7XG5cblx0Ly8gV09SS0FST1VORCBJRSA4OiBubyBBcnJheS5pc0FycmF5XG5cdGlzQXJyYXk6IGZ1bmN0aW9uIGlzQXJyYXkodGhpbmcpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSkgcmV0dXJuIEFycmF5LmlzQXJyYXkodGhpbmcpO1xuXG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGluZykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG5cdH0sXG5cblx0Ly8gV09SS0FST1VORCBJRSA4OiBubyBBcnJheS5mb3JFYWNoXG5cdGV2ZXJ5OiBmdW5jdGlvbiBldmVyeShvYmosIGNhbGxiYWNrZm4sIHRoaXNBcmcpIHtcblx0XHQvKmpzaGludCBiaXR3aXNlOmZhbHNlLCBlcWVxZXE6ZmFsc2UsIC1XMDQxOmZhbHNlICovXG5cdFx0aWYgKEFycmF5LnByb3RvdHlwZS5ldmVyeSkgcmV0dXJuIG9iai5ldmVyeShjYWxsYmFja2ZuLCB0aGlzQXJnKTtcblxuXHRcdC8vIFRoaXMgd29ya2Fyb3VuZCBiYXNlZCBvbiBwb2x5ZmlsbCBjb2RlIGZyb20gTUROOlxuXHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2V2ZXJ5XG5cdFx0dmFyIFQsIGs7XG5cblx0XHRpZiAodGhpcyA9PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCd0aGlzIGlzIG51bGwgb3Igbm90IGRlZmluZWQnKTtcblx0XHR9XG5cblx0XHQvLyAxLiBMZXQgTyBiZSB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgVG9PYmplY3QgcGFzc2luZyB0aGUgdGhpc1xuXHRcdC8vICAgIHZhbHVlIGFzIHRoZSBhcmd1bWVudC5cblx0XHR2YXIgTyA9IE9iamVjdCh0aGlzKTtcblxuXHRcdC8vIDIuIExldCBsZW5WYWx1ZSBiZSB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIEdldCBpbnRlcm5hbCBtZXRob2Rcblx0XHQvLyAgICBvZiBPIHdpdGggdGhlIGFyZ3VtZW50IFwibGVuZ3RoXCIuXG5cdFx0Ly8gMy4gTGV0IGxlbiBiZSBUb1VpbnQzMihsZW5WYWx1ZSkuXG5cdFx0dmFyIGxlbiA9IE8ubGVuZ3RoID4+PiAwO1xuXG5cdFx0Ly8gNC4gSWYgSXNDYWxsYWJsZShjYWxsYmFja2ZuKSBpcyBmYWxzZSwgdGhyb3cgYSBUeXBlRXJyb3IgZXhjZXB0aW9uLlxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2tmbiAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuXHRcdH1cblxuXHRcdC8vIDUuIElmIHRoaXNBcmcgd2FzIHN1cHBsaWVkLCBsZXQgVCBiZSB0aGlzQXJnOyBlbHNlIGxldCBUIGJlIHVuZGVmaW5lZC5cblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcblx0XHRcdFQgPSB0aGlzQXJnO1xuXHRcdH1cblxuXHRcdC8vIDYuIExldCBrIGJlIDAuXG5cdFx0ayA9IDA7XG5cblx0XHQvLyA3LiBSZXBlYXQsIHdoaWxlIGsgPCBsZW5cblx0XHR3aGlsZSAoayA8IGxlbikge1xuXG5cdFx0XHR2YXIga1ZhbHVlO1xuXG5cdFx0XHQvLyBhLiBMZXQgUGsgYmUgVG9TdHJpbmcoaykuXG5cdFx0XHQvLyAgIFRoaXMgaXMgaW1wbGljaXQgZm9yIExIUyBvcGVyYW5kcyBvZiB0aGUgaW4gb3BlcmF0b3Jcblx0XHRcdC8vIGIuIExldCBrUHJlc2VudCBiZSB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIEhhc1Byb3BlcnR5IGludGVybmFsXG5cdFx0XHQvLyAgICBtZXRob2Qgb2YgTyB3aXRoIGFyZ3VtZW50IFBrLlxuXHRcdFx0Ly8gICBUaGlzIHN0ZXAgY2FuIGJlIGNvbWJpbmVkIHdpdGggY1xuXHRcdFx0Ly8gYy4gSWYga1ByZXNlbnQgaXMgdHJ1ZSwgdGhlblxuXHRcdFx0aWYgKGsgaW4gTykge1xuXG5cdFx0XHRcdC8vIGkuIExldCBrVmFsdWUgYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBHZXQgaW50ZXJuYWwgbWV0aG9kXG5cdFx0XHRcdC8vICAgIG9mIE8gd2l0aCBhcmd1bWVudCBQay5cblx0XHRcdFx0a1ZhbHVlID0gT1trXTtcblxuXHRcdFx0XHQvLyBpaS4gTGV0IHRlc3RSZXN1bHQgYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBDYWxsIGludGVybmFsIG1ldGhvZFxuXHRcdFx0XHQvLyAgICAgb2YgY2FsbGJhY2tmbiB3aXRoIFQgYXMgdGhlIHRoaXMgdmFsdWUgYW5kIGFyZ3VtZW50IGxpc3Rcblx0XHRcdFx0Ly8gICAgIGNvbnRhaW5pbmcga1ZhbHVlLCBrLCBhbmQgTy5cblx0XHRcdFx0dmFyIHRlc3RSZXN1bHQgPSBjYWxsYmFja2ZuLmNhbGwoVCwga1ZhbHVlLCBrLCBPKTtcblxuXHRcdFx0XHQvLyBpaWkuIElmIFRvQm9vbGVhbih0ZXN0UmVzdWx0KSBpcyBmYWxzZSwgcmV0dXJuIGZhbHNlLlxuXHRcdFx0XHRpZiAoIXRlc3RSZXN1bHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGsrKztcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0Ly8gV09SS0FST1VORCBJRSA4OiBubyBBcnJheS5mb3JFYWNoXG5cdGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2gob2JqLCBjYWxsYmFjaywgdGhpc0FyZykge1xuXHRcdC8qanNoaW50IGJpdHdpc2U6ZmFsc2UsIGVxZXFlcTpmYWxzZSwgLVcwNDE6ZmFsc2UgKi9cblxuXHRcdGlmIChBcnJheS5wcm90b3R5cGUuZm9yRWFjaCkgcmV0dXJuIG9iai5mb3JFYWNoKGNhbGxiYWNrLCB0aGlzQXJnKTtcblxuXHRcdC8vIFRoaXMgd29ya2Fyb3VuZCBiYXNlZCBvbiBwb2x5ZmlsbCBjb2RlIGZyb20gTUROOlxuXHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZvckVhY2hcblxuXHRcdC8vIFByb2R1Y3Rpb24gc3RlcHMgb2YgRUNNQS0yNjIsIEVkaXRpb24gNSwgMTUuNC40LjE4XG5cdFx0Ly8gUmVmZXJlbmNlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjQuNC4xOFxuXG4gICAgdmFyIFQsIGs7XG5cbiAgICBpZiAob2JqID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJyB0aGlzIGlzIG51bGwgb3Igbm90IGRlZmluZWQnKTtcbiAgICB9XG5cbiAgICAvLyAxLiBMZXQgTyBiZSB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgVG9PYmplY3QgcGFzc2luZyB0aGUgfHRoaXN8IHZhbHVlIGFzIHRoZSBhcmd1bWVudC5cbiAgICB2YXIgTyA9IE9iamVjdChvYmopO1xuXG4gICAgLy8gMi4gTGV0IGxlblZhbHVlIGJlIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgR2V0IGludGVybmFsIG1ldGhvZCBvZiBPIHdpdGggdGhlIGFyZ3VtZW50IFwibGVuZ3RoXCIuXG4gICAgLy8gMy4gTGV0IGxlbiBiZSBUb1VpbnQzMihsZW5WYWx1ZSkuXG4gICAgdmFyIGxlbiA9IE8ubGVuZ3RoID4+PiAwO1xuXG4gICAgLy8gNC4gSWYgSXNDYWxsYWJsZShjYWxsYmFjaykgaXMgZmFsc2UsIHRocm93IGEgVHlwZUVycm9yIGV4Y2VwdGlvbi5cbiAgICAvLyBTZWU6IGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDkuMTFcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoY2FsbGJhY2sgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgLy8gNS4gSWYgdGhpc0FyZyB3YXMgc3VwcGxpZWQsIGxldCBUIGJlIHRoaXNBcmc7IGVsc2UgbGV0IFQgYmUgdW5kZWZpbmVkLlxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgVCA9IHRoaXNBcmc7XG4gICAgfVxuXG4gICAgLy8gNi4gTGV0IGsgYmUgMFxuICAgIGsgPSAwO1xuXG4gICAgLy8gNy4gUmVwZWF0LCB3aGlsZSBrIDwgbGVuXG4gICAgd2hpbGUgKGsgPCBsZW4pIHtcblxuICAgICAgdmFyIGtWYWx1ZTtcblxuICAgICAgLy8gYS4gTGV0IFBrIGJlIFRvU3RyaW5nKGspLlxuICAgICAgLy8gICBUaGlzIGlzIGltcGxpY2l0IGZvciBMSFMgb3BlcmFuZHMgb2YgdGhlIGluIG9wZXJhdG9yXG4gICAgICAvLyBiLiBMZXQga1ByZXNlbnQgYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBIYXNQcm9wZXJ0eSBpbnRlcm5hbCBtZXRob2Qgb2YgTyB3aXRoIGFyZ3VtZW50IFBrLlxuICAgICAgLy8gICBUaGlzIHN0ZXAgY2FuIGJlIGNvbWJpbmVkIHdpdGggY1xuICAgICAgLy8gYy4gSWYga1ByZXNlbnQgaXMgdHJ1ZSwgdGhlblxuICAgICAgaWYgKGsgaW4gTykge1xuXG4gICAgICAgIC8vIGkuIExldCBrVmFsdWUgYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBHZXQgaW50ZXJuYWwgbWV0aG9kIG9mIE8gd2l0aCBhcmd1bWVudCBQay5cbiAgICAgICAga1ZhbHVlID0gT1trXTtcblxuICAgICAgICAvLyBpaS4gQ2FsbCB0aGUgQ2FsbCBpbnRlcm5hbCBtZXRob2Qgb2YgY2FsbGJhY2sgd2l0aCBUIGFzIHRoZSB0aGlzIHZhbHVlIGFuZFxuICAgICAgICAvLyBhcmd1bWVudCBsaXN0IGNvbnRhaW5pbmcga1ZhbHVlLCBrLCBhbmQgTy5cbiAgICAgICAgY2FsbGJhY2suY2FsbChULCBrVmFsdWUsIGssIE8pO1xuICAgICAgfVxuICAgICAgLy8gZC4gSW5jcmVhc2UgayBieSAxLlxuICAgICAgaysrO1xuICAgIH1cbiAgICAvLyA4LiByZXR1cm4gdW5kZWZpbmVkXG5cdH1cblxufTtcblxuXG5leHBvcnRzLkVsZW1lbnQgPSB7XG5cblx0Ly8gV09SS0FST1VORCBJRSA4LCBJRSA5LCBJRSAxMCwgSUUgMTE6IG5vIEVsZW1lbnQucmVtb3ZlKClcblx0cmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoZWxlbWVudCkge1xuXHRcdGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcblx0fVxuXG59O1xuXG5cbmV4cG9ydHMuRXZlbnRUYXJnZXQgPSB7XG5cblx0Ly8gV09SS0FST1VORCBJRSA4OiBubyBFdmVudFRhcmdldC5hZGRFdmVudExpc3RlbmVyKClcblx0YWRkRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50LCBldmVudCwgY2FsbGJhY2spIHtcblx0XHRpZiAoZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKSByZXR1cm4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjayk7XG5cblx0XHRlbGVtZW50LmF0dGFjaEV2ZW50KFwib25cIiArIGV2ZW50LCBjYWxsYmFjayk7XG5cdH1cblxufTtcblxuXG5leHBvcnRzLkRvY3VtZW50ID0ge1xuXG5cdC8vIFdPUktBUk9VTkQgSUUgODogbm8gZG9jdW1lbnQuaGVhZFxuXHRoZWFkOiBmdW5jdGlvbiBoZWFkKGRvYykge1xuXHRcdGlmIChkb2MuaGVhZCkgcmV0dXJuIGRvYy5oZWFkO1xuXG5cdFx0cmV0dXJuIGRvYy5xdWVyeVNlbGVjdG9yKFwiaGVhZFwiKTtcblx0fVxuXG59O1xuXG5cbmV4cG9ydHMuRnVuY3Rpb24gPSB7XG5cblx0Ly8gV09SS0FST1VORCBJRSA4LCBJRSA5LCBJRSAxMCwgSUUgMTE6IG5vIGZ1bmN0aW9uLm5hbWVcblx0bmFtZTogZnVuY3Rpb24gbmFtZShmbikge1xuXHRcdGlmIChmbi5uYW1lKSByZXR1cm4gZm4ubmFtZTtcblxuXHRcdC8vIEJhc2VkIG9uIGNvZGUgYnkgSmFzb24gQnVudGluZyBldCBhbCwgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzMyNDI5XG5cdFx0dmFyIGZ1bmNOYW1lUmVnZXggPSAvZnVuY3Rpb25cXHMrKC57MSx9KVxccypcXCgvO1xuXHRcdHZhciByZXN1bHRzID0gKGZ1bmNOYW1lUmVnZXgpLmV4ZWMoKGZuKS50b1N0cmluZygpKTtcblx0XHRyZXR1cm4gKHJlc3VsdHMgJiYgcmVzdWx0cy5sZW5ndGggPiAxKSA/IHJlc3VsdHNbMV0gOiBcIjxhbm9uPlwiO1xuXHR9LFxuXG59O1xuXG5cbmV4cG9ydHMuT2JqZWN0ID0ge1xuXG5cdC8vIFdPUktBUk9VTkQgSUUgODogbm8gT2JqZWN0LmNyZWF0ZSgpXG5cdGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKHByb3RvdHlwZSkge1xuXHRcdGlmIChPYmplY3QuY3JlYXRlKSByZXR1cm4gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xuXG5cdFx0dmFyIFRlbXAgPSBmdW5jdGlvbiBUZW1wKCkge307XG5cdFx0VGVtcC5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0cmV0dXJuIG5ldyBUZW1wKCk7XG5cdH0sXG5cblx0Ly8gV09SS0FST1VORCBJRSA4OiBubyBPYmplY3QuZ2V0UHJvdG90eXBlT2Zcblx0Ly8gQ2F1dGlvbjogRG9lc24ndCB3b3JrIG9uIElFIDggaWYgY29uc3RydWN0b3IgaGFzIGJlZW4gY2hhbmdlZCwgYXMgaXMgdGhlIGNhc2Ugd2l0aCBhIHN1YmNsYXNzLlxuXHRnZXRQcm90b3R5cGVPZjogZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2Yob2JqKSB7XG5cdFx0aWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZikgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuXG5cdFx0dmFyIHJlc3VsdCA9IG9iai5jb25zdHJ1Y3RvciA/IG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgOiBudWxsO1xuXHRcdHJldHVybiByZXN1bHQgfHwgbnVsbDtcblx0fSxcblxuXHQvLyBXT1JLQVJPVU5EIElFIDg6IE5vIE9iamVjdC5rZXlzXG5cdGtleXM6IGZ1bmN0aW9uIGtleXMob2JqKSB7XG5cdFx0aWYgKE9iamVjdC5rZXlzKSByZXR1cm4gT2JqZWN0LmtleXMob2JqKTtcblxuXHRcdC8vIEZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2tleXNcblx0ICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFxuXHQgICAgICBoYXNEb250RW51bUJ1ZyA9ICEoeyB0b1N0cmluZzogbnVsbCB9KS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgndG9TdHJpbmcnKSxcblx0ICAgICAgZG9udEVudW1zID0gW1xuXHQgICAgICAgICd0b1N0cmluZycsXG5cdCAgICAgICAgJ3RvTG9jYWxlU3RyaW5nJyxcblx0ICAgICAgICAndmFsdWVPZicsXG5cdCAgICAgICAgJ2hhc093blByb3BlcnR5Jyxcblx0ICAgICAgICAnaXNQcm90b3R5cGVPZicsXG5cdCAgICAgICAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcblx0ICAgICAgICAnY29uc3RydWN0b3InXG5cdCAgICAgIF0sXG5cdCAgICAgIGRvbnRFbnVtc0xlbmd0aCA9IGRvbnRFbnVtcy5sZW5ndGg7XG5cblx0ICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgJiYgKHR5cGVvZiBvYmogIT09ICdmdW5jdGlvbicgfHwgb2JqID09PSBudWxsKSkge1xuXHQgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmtleXMgY2FsbGVkIG9uIG5vbi1vYmplY3QnKTtcblx0ICB9XG5cblx0ICB2YXIgcmVzdWx0ID0gW10sIHByb3AsIGk7XG5cblx0ICBmb3IgKHByb3AgaW4gb2JqKSB7XG5cdCAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSB7XG5cdCAgICAgIHJlc3VsdC5wdXNoKHByb3ApO1xuXHQgICAgfVxuXHQgIH1cblxuXHQgIGlmIChoYXNEb250RW51bUJ1Zykge1xuXHQgICAgZm9yIChpID0gMDsgaSA8IGRvbnRFbnVtc0xlbmd0aDsgaSsrKSB7XG5cdCAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgZG9udEVudW1zW2ldKSkge1xuXHQgICAgICAgIHJlc3VsdC5wdXNoKGRvbnRFbnVtc1tpXSk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9XG5cdCAgcmV0dXJuIHJlc3VsdDtcblx0fVxuXG59O1xuXG5cbmV4cG9ydHMuU3RyaW5nID0ge1xuXG5cdC8vIFdPUktBUk9VTkQgSUUgODogTm8gU3RyaW5nLnRyaW0oKVxuXHR0cmltOiBmdW5jdGlvbihzdHIpIHtcblx0XHRpZiAoc3RyLnRyaW0gIT09IHVuZGVmaW5lZCkgcmV0dXJuIHN0ci50cmltKCk7XG5cblx0XHQvLyBCYXNlZCBvbiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvVHJpbVxuXHRcdHJldHVybiBzdHIucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcblx0fVxuXG59O1xuXG5cbmV4cG9ydHMuV2luZG93ID0ge1xuXG5cdC8vIFdPUktBUk9VTkQgSUUgODogTm8gV2luZG93LnBhZ2VYT2Zmc2V0XG5cdHBhZ2VYT2Zmc2V0OiBmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50KSB7XG5cdFx0aWYgKHdpbmRvdy5wYWdlWE9mZnNldCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gd2luZG93LnBhZ2VYT2Zmc2V0O1xuXG5cdFx0Ly8gQmFzZWQgb24gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvdy5zY3JvbGxZXG5cdFx0dmFyIGlzQ1NTMUNvbXBhdCA9ICgoZG9jdW1lbnQuY29tcGF0TW9kZSB8fCBcIlwiKSA9PT0gXCJDU1MxQ29tcGF0XCIpO1xuXHRcdHJldHVybiBpc0NTUzFDb21wYXQgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCA6IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcblx0fSxcblxuXG5cdC8vIFdPUktBUk9VTkQgSUUgODogTm8gV2luZG93LnBhZ2VZT2Zmc2V0XG5cdHBhZ2VZT2Zmc2V0OiBmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50KSB7XG5cdFx0aWYgKHdpbmRvdy5wYWdlWU9mZnNldCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0O1xuXG5cdFx0Ly8gQmFzZWQgb24gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvdy5zY3JvbGxZXG5cdFx0dmFyIGlzQ1NTMUNvbXBhdCA9ICgoZG9jdW1lbnQuY29tcGF0TW9kZSB8fCBcIlwiKSA9PT0gXCJDU1MxQ29tcGF0XCIpO1xuXHRcdHJldHVybiBpc0NTUzFDb21wYXQgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIDogZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG5cdH1cblxufTsiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNiBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vuc3VyZS5qc1wiKTtcbnZhciBWYWx1ZSA9IHJlcXVpcmUoXCIuL3ZhbHVlLmpzXCIpO1xuXG52YXIgTWUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFBpeGVscyhhbW91bnQpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgWyBOdW1iZXIsIG51bGwgXSBdKTtcblx0dGhpcy5fbm9uZSA9IChhbW91bnQgPT09IG51bGwpO1xuXHR0aGlzLl9hbW91bnQgPSBhbW91bnQ7XG59O1xuVmFsdWUuZXh0ZW5kKE1lKTtcblxuTWUuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGFtb3VudCkge1xuXHRyZXR1cm4gbmV3IE1lKGFtb3VudCk7XG59O1xuXG5NZS5jcmVhdGVOb25lID0gZnVuY3Rpb24gY3JlYXRlTm9uZSgpIHtcblx0cmV0dXJuIG5ldyBNZShudWxsKTtcbn07XG5cbk1lLlpFUk8gPSBNZS5jcmVhdGUoMCk7XG5NZS5OT05FID0gTWUuY3JlYXRlTm9uZSgpO1xuXG5NZS5wcm90b3R5cGUuY29tcGF0aWJpbGl0eSA9IGZ1bmN0aW9uIGNvbXBhdGliaWxpdHkoKSB7XG5cdHJldHVybiBbIE1lIF07XG59O1xuXG5NZS5wcm90b3R5cGUucGx1cyA9IFZhbHVlLnNhZmUoZnVuY3Rpb24gcGx1cyhvcGVyYW5kKSB7XG5cdGlmICh0aGlzLl9ub25lIHx8IG9wZXJhbmQuX25vbmUpIHJldHVybiBNZS5jcmVhdGVOb25lKCk7XG5cdHJldHVybiBuZXcgTWUodGhpcy5fYW1vdW50ICsgb3BlcmFuZC5fYW1vdW50KTtcbn0pO1xuXG5NZS5wcm90b3R5cGUubWludXMgPSBWYWx1ZS5zYWZlKGZ1bmN0aW9uIG1pbnVzKG9wZXJhbmQpIHtcblx0aWYgKHRoaXMuX25vbmUgfHwgb3BlcmFuZC5fbm9uZSkgcmV0dXJuIE1lLmNyZWF0ZU5vbmUoKTtcblx0cmV0dXJuIG5ldyBNZSh0aGlzLl9hbW91bnQgLSBvcGVyYW5kLl9hbW91bnQpO1xufSk7XG5cbk1lLnByb3RvdHlwZS50aW1lcyA9IGZ1bmN0aW9uIHRpbWVzKG9wZXJhbmQpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgTnVtYmVyIF0pO1xuXG5cdGlmICh0aGlzLl9ub25lKSByZXR1cm4gTWUuY3JlYXRlTm9uZSgpO1xuXHRyZXR1cm4gbmV3IE1lKHRoaXMuX2Ftb3VudCAqIG9wZXJhbmQpO1xufTtcblxuTWUucHJvdG90eXBlLmF2ZXJhZ2UgPSBWYWx1ZS5zYWZlKGZ1bmN0aW9uIGF2ZXJhZ2Uob3BlcmFuZCkge1xuXHRpZiAodGhpcy5fbm9uZSB8fCBvcGVyYW5kLl9ub25lKSByZXR1cm4gTWUuY3JlYXRlTm9uZSgpO1xuXHRyZXR1cm4gbmV3IE1lKCh0aGlzLl9hbW91bnQgKyBvcGVyYW5kLl9hbW91bnQpIC8gMik7XG59KTtcblxuTWUucHJvdG90eXBlLmNvbXBhcmUgPSBWYWx1ZS5zYWZlKGZ1bmN0aW9uIGNvbXBhcmUob3BlcmFuZCkge1xuXHR2YXIgYm90aEhhdmVQaXhlbHMgPSAhdGhpcy5fbm9uZSAmJiAhb3BlcmFuZC5fbm9uZTtcblx0dmFyIG5laXRoZXJIYXZlUGl4ZWxzID0gdGhpcy5fbm9uZSAmJiBvcGVyYW5kLl9ub25lO1xuXHR2YXIgb25seUxlZnRIYXNQaXhlbHMgPSAhdGhpcy5fbm9uZSAmJiBvcGVyYW5kLl9ub25lO1xuXG5cdGlmIChib3RoSGF2ZVBpeGVscykge1xuXHRcdHZhciBkaWZmZXJlbmNlID0gdGhpcy5fYW1vdW50IC0gb3BlcmFuZC5fYW1vdW50O1xuXHRcdGlmIChNYXRoLmFicyhkaWZmZXJlbmNlKSA8PSAwLjUpIHJldHVybiAwO1xuXHRcdGVsc2UgcmV0dXJuIGRpZmZlcmVuY2U7XG5cdH1cblx0ZWxzZSBpZiAobmVpdGhlckhhdmVQaXhlbHMpIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdH1cblx0ZWxzZSBpZiAob25seUxlZnRIYXNQaXhlbHMpIHtcblx0XHRyZXR1cm4gMTtcblx0fVxuXHRlbHNlIHtcblx0XHRyZXR1cm4gLTE7XG5cdH1cbn0pO1xuXG5NZS5tYXggPSBmdW5jdGlvbihsLCByKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIE1lLCBNZSBdKTtcblxuXHRyZXR1cm4gbC5jb21wYXJlKHIpID49IDAgPyBsIDogcjtcbn07XG5cbk1lLm1pbiA9IGZ1bmN0aW9uKGwsIHIpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgTWUsIE1lIF0pO1xuXG5cdHJldHVybiBsLmNvbXBhcmUocikgPD0gMCA/IGwgOiByO1xufTtcblxuTWUucHJvdG90eXBlLmRpZmYgPSBWYWx1ZS5zYWZlKGZ1bmN0aW9uIGRpZmYoZXhwZWN0ZWQpIHtcblx0aWYgKHRoaXMuY29tcGFyZShleHBlY3RlZCkgPT09IDApIHJldHVybiBcIlwiO1xuXHRpZiAodGhpcy5fbm9uZSB8fCBleHBlY3RlZC5fbm9uZSkgcmV0dXJuIFwibm9uLW1lYXN1cmFibGVcIjtcblxuXHR2YXIgZGlmZmVyZW5jZSA9IE1hdGguYWJzKHRoaXMuX2Ftb3VudCAtIGV4cGVjdGVkLl9hbW91bnQpO1xuXG5cdHZhciBkZXNjID0gZGlmZmVyZW5jZTtcblx0aWYgKGRpZmZlcmVuY2UgKiAxMDAgIT09IE1hdGguZmxvb3IoZGlmZmVyZW5jZSAqIDEwMCkpIGRlc2MgPSBcImFib3V0IFwiICsgZGlmZmVyZW5jZS50b0ZpeGVkKDIpO1xuXHRyZXR1cm4gZGVzYyArIFwicHhcIjtcbn0pO1xuXG5NZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblx0cmV0dXJuIHRoaXMuX25vbmUgPyBcIm5vIHBpeGVsc1wiIDogdGhpcy5fYW1vdW50ICsgXCJweFwiO1xufTtcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxNC0yMDE2IFRpdGFuaXVtIEkuVC4gTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBGb3IgbGljZW5zZSwgc2VlIFwiUkVBRE1FXCIgb3IgXCJMSUNFTlNFXCIgZmlsZS5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgZW5zdXJlID0gcmVxdWlyZShcIi4uL3V0aWwvZW5zdXJlLmpzXCIpO1xudmFyIFZhbHVlID0gcmVxdWlyZShcIi4vdmFsdWUuanNcIik7XG52YXIgUGl4ZWxzID0gcmVxdWlyZShcIi4vcGl4ZWxzLmpzXCIpO1xudmFyIFNpemUgPSByZXF1aXJlKFwiLi9zaXplLmpzXCIpO1xuXG52YXIgWF9ESU1FTlNJT04gPSBcInhcIjtcbnZhciBZX0RJTUVOU0lPTiA9IFwieVwiO1xuXG52YXIgTWUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFBvc2l0aW9uKGRpbWVuc2lvbiwgdmFsdWUpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgU3RyaW5nLCBbIE51bWJlciwgUGl4ZWxzIF0gXSk7XG5cblx0dGhpcy5fZGltZW5zaW9uID0gZGltZW5zaW9uO1xuXHR0aGlzLl92YWx1ZSA9ICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpID8gUGl4ZWxzLmNyZWF0ZSh2YWx1ZSkgOiB2YWx1ZTtcbn07XG5WYWx1ZS5leHRlbmQoTWUpO1xuXG5NZS54ID0gZnVuY3Rpb24geCh2YWx1ZSkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBbIE51bWJlciwgUGl4ZWxzIF0gXSk7XG5cblx0cmV0dXJuIG5ldyBNZShYX0RJTUVOU0lPTiwgdmFsdWUpO1xufTtcblxuTWUueSA9IGZ1bmN0aW9uIHkodmFsdWUpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgWyBOdW1iZXIsIFBpeGVscyBdIF0pO1xuXG5cdHJldHVybiBuZXcgTWUoWV9ESU1FTlNJT04sIHZhbHVlKTtcbn07XG5cbk1lLm5vWCA9IGZ1bmN0aW9uIG5vWCgpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHRyZXR1cm4gbmV3IE1lKFhfRElNRU5TSU9OLCBQaXhlbHMuTk9ORSk7XG59O1xuXG5NZS5ub1kgPSBmdW5jdGlvbiBub1koKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0cmV0dXJuIG5ldyBNZShZX0RJTUVOU0lPTiwgUGl4ZWxzLk5PTkUpO1xufTtcblxuTWUucHJvdG90eXBlLmNvbXBhdGliaWxpdHkgPSBmdW5jdGlvbiBjb21wYXRpYmlsaXR5KCkge1xuXHRyZXR1cm4gWyBNZSwgU2l6ZSBdO1xufTtcblxuTWUucHJvdG90eXBlLnBsdXMgPSBWYWx1ZS5zYWZlKGZ1bmN0aW9uIHBsdXMob3BlcmFuZCkge1xuXHRjaGVja0F4aXModGhpcywgb3BlcmFuZCk7XG5cdHJldHVybiBuZXcgTWUodGhpcy5fZGltZW5zaW9uLCB0aGlzLl92YWx1ZS5wbHVzKG9wZXJhbmQudG9QaXhlbHMoKSkpO1xufSk7XG5cbk1lLnByb3RvdHlwZS5taW51cyA9IFZhbHVlLnNhZmUoZnVuY3Rpb24gbWludXMob3BlcmFuZCkge1xuXHRjaGVja0F4aXModGhpcywgb3BlcmFuZCk7XG5cdHJldHVybiBuZXcgTWUodGhpcy5fZGltZW5zaW9uLCB0aGlzLl92YWx1ZS5taW51cyhvcGVyYW5kLnRvUGl4ZWxzKCkpKTtcbn0pO1xuXG5NZS5wcm90b3R5cGUubWlkcG9pbnQgPSBWYWx1ZS5zYWZlKGZ1bmN0aW9uIG1pZHBvaW50KG9wZXJhbmQpIHtcblx0Y2hlY2tBeGlzKHRoaXMsIG9wZXJhbmQpO1xuXHRyZXR1cm4gbmV3IE1lKHRoaXMuX2RpbWVuc2lvbiwgdGhpcy5fdmFsdWUuYXZlcmFnZShvcGVyYW5kLnRvUGl4ZWxzKCkpKTtcbn0pO1xuXG5NZS5wcm90b3R5cGUuZGlmZiA9IFZhbHVlLnNhZmUoZnVuY3Rpb24gZGlmZihleHBlY3RlZCkge1xuXHRjaGVja0F4aXModGhpcywgZXhwZWN0ZWQpO1xuXG5cdHZhciBhY3R1YWxWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xuXHR2YXIgZXhwZWN0ZWRWYWx1ZSA9IGV4cGVjdGVkLl92YWx1ZTtcblxuXHRpZiAoYWN0dWFsVmFsdWUuZXF1YWxzKGV4cGVjdGVkVmFsdWUpKSByZXR1cm4gXCJcIjtcblx0ZWxzZSBpZiAoaXNOb25lKGV4cGVjdGVkKSAmJiAhaXNOb25lKHRoaXMpKSByZXR1cm4gXCJyZW5kZXJlZCB3aGVuIG5vdCBleHBlY3RlZFwiO1xuXHRlbHNlIGlmICghaXNOb25lKGV4cGVjdGVkKSAmJiBpc05vbmUodGhpcykpIHJldHVybiBcIm5vdCByZW5kZXJlZFwiO1xuXG5cdHZhciBkaXJlY3Rpb247XG5cdHZhciBjb21wYXJpc29uID0gYWN0dWFsVmFsdWUuY29tcGFyZShleHBlY3RlZFZhbHVlKTtcblx0aWYgKHRoaXMuX2RpbWVuc2lvbiA9PT0gWF9ESU1FTlNJT04pIGRpcmVjdGlvbiA9IGNvbXBhcmlzb24gPCAwID8gXCJmdXJ0aGVyIGxlZnQgdGhhbiBleHBlY3RlZFwiIDogXCJmdXJ0aGVyIHJpZ2h0IHRoYW4gZXhwZWN0ZWRcIjtcblx0ZWxzZSBkaXJlY3Rpb24gPSBjb21wYXJpc29uIDwgMCA/IFwiaGlnaGVyIHRoYW4gZXhwZWN0ZWRcIiA6IFwibG93ZXIgdGhhbiBleHBlY3RlZFwiO1xuXG5cdHJldHVybiBhY3R1YWxWYWx1ZS5kaWZmKGV4cGVjdGVkVmFsdWUpICsgXCIgXCIgKyBkaXJlY3Rpb247XG59KTtcblxuTWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0aWYgKGlzTm9uZSh0aGlzKSkgcmV0dXJuIFwibm90IHJlbmRlcmVkXCI7XG5cdGVsc2UgcmV0dXJuIHRoaXMuX3ZhbHVlLnRvU3RyaW5nKCk7XG59O1xuXG5NZS5wcm90b3R5cGUudG9QaXhlbHMgPSBmdW5jdGlvbiB0b1BpeGVscygpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblx0cmV0dXJuIHRoaXMuX3ZhbHVlO1xufTtcblxuZnVuY3Rpb24gY2hlY2tBeGlzKHNlbGYsIG90aGVyKSB7XG5cdGlmIChvdGhlciBpbnN0YW5jZW9mIE1lKSB7XG5cdFx0ZW5zdXJlLnRoYXQoc2VsZi5fZGltZW5zaW9uID09PSBvdGhlci5fZGltZW5zaW9uLCBcIkNhbid0IGNvbXBhcmUgWCBjb29yZGluYXRlIHRvIFkgY29vcmRpbmF0ZVwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiBpc05vbmUocG9zaXRpb24pIHtcblx0cmV0dXJuIHBvc2l0aW9uLl92YWx1ZS5lcXVhbHMoUGl4ZWxzLk5PTkUpO1xufSIsIi8vIENvcHlyaWdodCAoYykgMjAxNiBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG4oZnVuY3Rpb24oKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdHZhciBlbnN1cmUgPSByZXF1aXJlKFwiLi4vdXRpbC9lbnN1cmUuanNcIik7XG5cdHZhciBWYWx1ZSA9IHJlcXVpcmUoXCIuL3ZhbHVlLmpzXCIpO1xuXG5cdHZhciBSRU5ERVJFRCA9IFwicmVuZGVyZWRcIjtcblx0dmFyIE5PVF9SRU5ERVJFRCA9IFwibm90IHJlbmRlcmVkXCI7XG5cdHZhciBESVNQTEFZX05PTkUgPSBcIm5vdCByZW5kZXJlZCBkdWUgdG8gZGlzcGxheTpub25lIHByb3BlcnR5XCI7XG5cdHZhciBERVRBQ0hFRCA9IFwibm90IHJlbmRlcmVkIGR1ZSB0byBiZWluZyBkZXRhY2hlZCBmcm9tIERPTVwiO1xuXG5cdHZhciBNZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUmVuZGVyU3RhdGUoc3RhdGUpIHtcblx0XHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBTdHJpbmcgXSk7XG5cblx0XHR0aGlzLl9zdGF0ZSA9IHN0YXRlO1xuXHR9O1xuXHRWYWx1ZS5leHRlbmQoTWUpO1xuXG5cdE1lLnJlbmRlcmVkID0gZnVuY3Rpb24gcmVuZGVyZWQoKSB7XG5cdFx0cmV0dXJuIG5ldyBNZShSRU5ERVJFRCk7XG5cdH07XG5cblx0TWUubm90UmVuZGVyZWQgPSBmdW5jdGlvbiBub3RSZW5kZXJlZCgpIHtcblx0XHRyZXR1cm4gbmV3IE1lKE5PVF9SRU5ERVJFRCk7XG5cdH07XG5cblx0TWUuZGlzcGxheU5vbmUgPSBmdW5jdGlvbiBkaXNwbGF5Tm9uZSgpIHtcblx0XHRyZXR1cm4gbmV3IE1lKERJU1BMQVlfTk9ORSk7XG5cdH07XG5cblx0TWUuZGV0YWNoZWQgPSBmdW5jdGlvbiBkZXRhY2hlZCgpIHtcblx0XHRyZXR1cm4gbmV3IE1lKERFVEFDSEVEKTtcblx0fTtcblxuXHRNZS5wcm90b3R5cGUuY29tcGF0aWJpbGl0eSA9IGZ1bmN0aW9uIGNvbXBhdGliaWxpdHkoKSB7XG5cdFx0cmV0dXJuIFsgTWUgXTtcblx0fTtcblxuXHRNZS5wcm90b3R5cGUuZGlmZiA9IFZhbHVlLnNhZmUoZnVuY3Rpb24gZGlmZihleHBlY3RlZCkge1xuXHRcdHZhciB0aGlzU3RhdGUgPSB0aGlzLl9zdGF0ZTtcblx0XHR2YXIgZXhwZWN0ZWRTdGF0ZSA9IGV4cGVjdGVkLl9zdGF0ZTtcblxuXHRcdGlmICh0aGlzU3RhdGUgPT09IGV4cGVjdGVkU3RhdGUpIHJldHVybiBcIlwiO1xuXG5cdFx0aWYgKHRoaXNTdGF0ZSA9PT0gUkVOREVSRUQpIHJldHVybiBcImRpZmZlcmVudCB0aGFuIGV4cGVjdGVkXCI7XG5cdFx0ZWxzZSBpZiAoZXhwZWN0ZWRTdGF0ZSA9PT0gUkVOREVSRUQpIHJldHVybiBcImRpZmZlcmVudCB0aGFuIGV4cGVjdGVkXCI7XG5cdFx0ZWxzZSBpZiAodGhpc1N0YXRlID09PSBOT1RfUkVOREVSRUQgfHwgZXhwZWN0ZWRTdGF0ZSA9PT0gTk9UX1JFTkRFUkVEKSByZXR1cm4gXCJcIjtcblx0XHRlbHNlIHJldHVybiBcImFjaGlldmVkIGRpZmZlcmVudGx5IHRoYW4gZXhwZWN0ZWRcIjtcblx0fSk7XG5cblx0TWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3N0YXRlO1xuXHR9O1xuXG59KCkpOyIsIi8vIENvcHlyaWdodCAoYykgMjAxNCBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vuc3VyZS5qc1wiKTtcbnZhciBWYWx1ZSA9IHJlcXVpcmUoXCIuL3ZhbHVlLmpzXCIpO1xudmFyIFBpeGVscyA9IHJlcXVpcmUoXCIuL3BpeGVscy5qc1wiKTtcblxudmFyIE1lID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBTaXplKHZhbHVlKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIFtOdW1iZXIsIFBpeGVsc10gXSk7XG5cblx0dGhpcy5fdmFsdWUgPSAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSA/IFBpeGVscy5jcmVhdGUodmFsdWUpIDogdmFsdWU7XG59O1xuVmFsdWUuZXh0ZW5kKE1lKTtcblxuTWUuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHZhbHVlKSB7XG5cdHJldHVybiBuZXcgTWUodmFsdWUpO1xufTtcblxuTWUuY3JlYXRlTm9uZSA9IGZ1bmN0aW9uIGNyZWF0ZU5vbmUoKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0cmV0dXJuIG5ldyBNZShQaXhlbHMuTk9ORSk7XG59O1xuXG5NZS5wcm90b3R5cGUuY29tcGF0aWJpbGl0eSA9IGZ1bmN0aW9uIGNvbXBhdGliaWxpdHkoKSB7XG5cdHJldHVybiBbIE1lIF07XG59O1xuXG5NZS5wcm90b3R5cGUucGx1cyA9IFZhbHVlLnNhZmUoZnVuY3Rpb24gcGx1cyhvcGVyYW5kKSB7XG5cdHJldHVybiBuZXcgTWUodGhpcy5fdmFsdWUucGx1cyhvcGVyYW5kLl92YWx1ZSkpO1xufSk7XG5cbk1lLnByb3RvdHlwZS5taW51cyA9IFZhbHVlLnNhZmUoZnVuY3Rpb24gbWludXMob3BlcmFuZCkge1xuXHRyZXR1cm4gbmV3IE1lKHRoaXMuX3ZhbHVlLm1pbnVzKG9wZXJhbmQuX3ZhbHVlKSk7XG59KTtcblxuTWUucHJvdG90eXBlLnRpbWVzID0gZnVuY3Rpb24gdGltZXMob3BlcmFuZCkge1xuXHRyZXR1cm4gbmV3IE1lKHRoaXMuX3ZhbHVlLnRpbWVzKG9wZXJhbmQpKTtcbn07XG5cbk1lLnByb3RvdHlwZS5jb21wYXJlID0gVmFsdWUuc2FmZShmdW5jdGlvbiBjb21wYXJlKHRoYXQpIHtcblx0cmV0dXJuIHRoaXMuX3ZhbHVlLmNvbXBhcmUodGhhdC5fdmFsdWUpO1xufSk7XG5cbk1lLnByb3RvdHlwZS5kaWZmID0gVmFsdWUuc2FmZShmdW5jdGlvbiBkaWZmKGV4cGVjdGVkKSB7XG5cdHZhciBhY3R1YWxWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xuXHR2YXIgZXhwZWN0ZWRWYWx1ZSA9IGV4cGVjdGVkLl92YWx1ZTtcblxuXHRpZiAoYWN0dWFsVmFsdWUuZXF1YWxzKGV4cGVjdGVkVmFsdWUpKSByZXR1cm4gXCJcIjtcblx0aWYgKGlzTm9uZShleHBlY3RlZCkgJiYgIWlzTm9uZSh0aGlzKSkgcmV0dXJuIFwicmVuZGVyZWQgd2hlbiBub3QgZXhwZWN0ZWRcIjtcblx0aWYgKCFpc05vbmUoZXhwZWN0ZWQpICYmIGlzTm9uZSh0aGlzKSkgcmV0dXJuIFwibm90IHJlbmRlcmVkXCI7XG5cblx0dmFyIGRlc2MgPSBhY3R1YWxWYWx1ZS5jb21wYXJlKGV4cGVjdGVkVmFsdWUpID4gMCA/IFwiIGxhcmdlciB0aGFuIGV4cGVjdGVkXCIgOiBcIiBzbWFsbGVyIHRoYW4gZXhwZWN0ZWRcIjtcblx0cmV0dXJuIGFjdHVhbFZhbHVlLmRpZmYoZXhwZWN0ZWRWYWx1ZSkgKyBkZXNjO1xufSk7XG5cbk1lLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXG5cdGlmIChpc05vbmUodGhpcykpIHJldHVybiBcIm5vdCByZW5kZXJlZFwiO1xuXHRlbHNlIHJldHVybiB0aGlzLl92YWx1ZS50b1N0cmluZygpO1xufTtcblxuTWUucHJvdG90eXBlLnRvUGl4ZWxzID0gZnVuY3Rpb24gdG9QaXhlbHMoKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cdHJldHVybiB0aGlzLl92YWx1ZTtcbn07XG5cbmZ1bmN0aW9uIGlzTm9uZShzaXplKSB7XG5cdHJldHVybiBzaXplLl92YWx1ZS5lcXVhbHMoUGl4ZWxzLk5PTkUpO1xufSIsIi8vIENvcHlyaWdodCAoYykgMjAxNCBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vuc3VyZS5qc1wiKTtcbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vdXRpbC9vb3AuanNcIik7XG52YXIgc2hpbSA9IHJlcXVpcmUoXCIuLi91dGlsL3NoaW0uanNcIik7XG5cbnZhciBNZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gVmFsdWUoKSB7fTtcbk1lLmV4dGVuZCA9IG9vcC5leHRlbmRGbihNZSk7XG5vb3AubWFrZUFic3RyYWN0KE1lLCBbXG5cdFwiY29tcGF0aWJpbGl0eVwiLFxuXHRcImRpZmZcIixcblx0XCJ0b1N0cmluZ1wiXG5dKTtcblxuTWUuc2FmZSA9IGZ1bmN0aW9uIHNhZmUoZm4pIHtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGVuc3VyZUNvbXBhdGliaWxpdHkodGhpcywgdGhpcy5jb21wYXRpYmlsaXR5KCksIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdH07XG59O1xuXG5NZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSgpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5NZS5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzKHRoYXQpIHtcblx0cmV0dXJuIHRoaXMuZGlmZih0aGF0KSA9PT0gXCJcIjtcbn07XG5cbmZ1bmN0aW9uIGVuc3VyZUNvbXBhdGliaWxpdHkoc2VsZiwgY29tcGF0aWJsZSwgYXJncykge1xuXHR2YXIgYXJnO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHsgICAvLyBhcmdzIGlzIG5vdCBhbiBBcnJheSwgY2FuJ3QgdXNlIGZvckVhY2hcblx0XHRhcmcgPSBhcmdzW2ldO1xuXHRcdGNoZWNrT25lQXJnKHNlbGYsIGNvbXBhdGlibGUsIGFyZyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY2hlY2tPbmVBcmcoc2VsZiwgY29tcGF0aWJsZSwgYXJnKSB7XG5cdHZhciB0eXBlID0gdHlwZW9mIGFyZztcblx0aWYgKGFyZyA9PT0gbnVsbCkgdHlwZSA9IFwibnVsbFwiO1xuXHRpZiAodHlwZSAhPT0gXCJvYmplY3RcIikgdGhyb3dFcnJvcih0eXBlKTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGNvbXBhdGlibGUubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoYXJnIGluc3RhbmNlb2YgY29tcGF0aWJsZVtpXSkgcmV0dXJuO1xuXHR9XG5cdHRocm93RXJyb3Iob29wLmluc3RhbmNlTmFtZShhcmcpKTtcblxuXHRmdW5jdGlvbiB0aHJvd0Vycm9yKHR5cGUpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3Iob29wLmluc3RhbmNlTmFtZShzZWxmKSArIFwiIGlzbid0IGNvbXBhdGlibGUgd2l0aCBcIiArIHR5cGUpO1xuXHR9XG59IiwiLyohXG4gKiBhc3luY1xuICogaHR0cHM6Ly9naXRodWIuY29tL2Nhb2xhbi9hc3luY1xuICpcbiAqIENvcHlyaWdodCAyMDEwLTIwMTQgQ2FvbGFuIE1jTWFob25cbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4oZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGFzeW5jID0ge307XG4gICAgZnVuY3Rpb24gbm9vcCgpIHt9XG4gICAgZnVuY3Rpb24gaWRlbnRpdHkodikge1xuICAgICAgICByZXR1cm4gdjtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9Cb29sKHYpIHtcbiAgICAgICAgcmV0dXJuICEhdjtcbiAgICB9XG4gICAgZnVuY3Rpb24gbm90SWQodikge1xuICAgICAgICByZXR1cm4gIXY7XG4gICAgfVxuXG4gICAgLy8gZ2xvYmFsIG9uIHRoZSBzZXJ2ZXIsIHdpbmRvdyBpbiB0aGUgYnJvd3NlclxuICAgIHZhciBwcmV2aW91c19hc3luYztcblxuICAgIC8vIEVzdGFibGlzaCB0aGUgcm9vdCBvYmplY3QsIGB3aW5kb3dgIChgc2VsZmApIGluIHRoZSBicm93c2VyLCBgZ2xvYmFsYFxuICAgIC8vIG9uIHRoZSBzZXJ2ZXIsIG9yIGB0aGlzYCBpbiBzb21lIHZpcnR1YWwgbWFjaGluZXMuIFdlIHVzZSBgc2VsZmBcbiAgICAvLyBpbnN0ZWFkIG9mIGB3aW5kb3dgIGZvciBgV2ViV29ya2VyYCBzdXBwb3J0LlxuICAgIHZhciByb290ID0gdHlwZW9mIHNlbGYgPT09ICdvYmplY3QnICYmIHNlbGYuc2VsZiA9PT0gc2VsZiAmJiBzZWxmIHx8XG4gICAgICAgICAgICB0eXBlb2YgZ2xvYmFsID09PSAnb2JqZWN0JyAmJiBnbG9iYWwuZ2xvYmFsID09PSBnbG9iYWwgJiYgZ2xvYmFsIHx8XG4gICAgICAgICAgICB0aGlzO1xuXG4gICAgaWYgKHJvb3QgIT0gbnVsbCkge1xuICAgICAgICBwcmV2aW91c19hc3luYyA9IHJvb3QuYXN5bmM7XG4gICAgfVxuXG4gICAgYXN5bmMubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcm9vdC5hc3luYyA9IHByZXZpb3VzX2FzeW5jO1xuICAgICAgICByZXR1cm4gYXN5bmM7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG9ubHlfb25jZShmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoZm4gPT09IG51bGwpIHRocm93IG5ldyBFcnJvcihcIkNhbGxiYWNrIHdhcyBhbHJlYWR5IGNhbGxlZC5cIik7XG4gICAgICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgZm4gPSBudWxsO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9vbmNlKGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChmbiA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGZuID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLy8vIGNyb3NzLWJyb3dzZXIgY29tcGF0aWJsaXR5IGZ1bmN0aW9ucyAvLy8vXG5cbiAgICB2YXIgX3RvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuICAgIHZhciBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gX3RvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9O1xuXG4gICAgLy8gUG9ydGVkIGZyb20gdW5kZXJzY29yZS5qcyBpc09iamVjdFxuICAgIHZhciBfaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2Ygb2JqO1xuICAgICAgICByZXR1cm4gdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlID09PSAnb2JqZWN0JyAmJiAhIW9iajtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gX2lzQXJyYXlMaWtlKGFycikge1xuICAgICAgICByZXR1cm4gX2lzQXJyYXkoYXJyKSB8fCAoXG4gICAgICAgICAgICAvLyBoYXMgYSBwb3NpdGl2ZSBpbnRlZ2VyIGxlbmd0aCBwcm9wZXJ0eVxuICAgICAgICAgICAgdHlwZW9mIGFyci5sZW5ndGggPT09IFwibnVtYmVyXCIgJiZcbiAgICAgICAgICAgIGFyci5sZW5ndGggPj0gMCAmJlxuICAgICAgICAgICAgYXJyLmxlbmd0aCAlIDEgPT09IDBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZWFjaChjb2xsLCBpdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gX2lzQXJyYXlMaWtlKGNvbGwpID9cbiAgICAgICAgICAgIF9hcnJheUVhY2goY29sbCwgaXRlcmF0b3IpIDpcbiAgICAgICAgICAgIF9mb3JFYWNoT2YoY29sbCwgaXRlcmF0b3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9hcnJheUVhY2goYXJyLCBpdGVyYXRvcikge1xuICAgICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICAgIGxlbmd0aCA9IGFyci5sZW5ndGg7XG5cbiAgICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yKGFycltpbmRleF0sIGluZGV4LCBhcnIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX21hcChhcnIsIGl0ZXJhdG9yKSB7XG4gICAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgICAgbGVuZ3RoID0gYXJyLmxlbmd0aCxcbiAgICAgICAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRvcihhcnJbaW5kZXhdLCBpbmRleCwgYXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9yYW5nZShjb3VudCkge1xuICAgICAgICByZXR1cm4gX21hcChBcnJheShjb3VudCksIGZ1bmN0aW9uICh2LCBpKSB7IHJldHVybiBpOyB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfcmVkdWNlKGFyciwgaXRlcmF0b3IsIG1lbW8pIHtcbiAgICAgICAgX2FycmF5RWFjaChhcnIsIGZ1bmN0aW9uICh4LCBpLCBhKSB7XG4gICAgICAgICAgICBtZW1vID0gaXRlcmF0b3IobWVtbywgeCwgaSwgYSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbWVtbztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZm9yRWFjaE9mKG9iamVjdCwgaXRlcmF0b3IpIHtcbiAgICAgICAgX2FycmF5RWFjaChfa2V5cyhvYmplY3QpLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpdGVyYXRvcihvYmplY3Rba2V5XSwga2V5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2luZGV4T2YoYXJyLCBpdGVtKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYXJyW2ldID09PSBpdGVtKSByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgdmFyIF9rZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBrIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgICAgIGtleXMucHVzaChrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gX2tleUl0ZXJhdG9yKGNvbGwpIHtcbiAgICAgICAgdmFyIGkgPSAtMTtcbiAgICAgICAgdmFyIGxlbjtcbiAgICAgICAgdmFyIGtleXM7XG4gICAgICAgIGlmIChfaXNBcnJheUxpa2UoY29sbCkpIHtcbiAgICAgICAgICAgIGxlbiA9IGNvbGwubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIHJldHVybiBpIDwgbGVuID8gaSA6IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga2V5cyA9IF9rZXlzKGNvbGwpO1xuICAgICAgICAgICAgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgPCBsZW4gPyBrZXlzW2ldIDogbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTaW1pbGFyIHRvIEVTNidzIHJlc3QgcGFyYW0gKGh0dHA6Ly9hcml5YS5vZmlsYWJzLmNvbS8yMDEzLzAzL2VzNi1hbmQtcmVzdC1wYXJhbWV0ZXIuaHRtbClcbiAgICAvLyBUaGlzIGFjY3VtdWxhdGVzIHRoZSBhcmd1bWVudHMgcGFzc2VkIGludG8gYW4gYXJyYXksIGFmdGVyIGEgZ2l2ZW4gaW5kZXguXG4gICAgLy8gRnJvbSB1bmRlcnNjb3JlLmpzIChodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmUvcHVsbC8yMTQwKS5cbiAgICBmdW5jdGlvbiBfcmVzdFBhcmFtKGZ1bmMsIHN0YXJ0SW5kZXgpIHtcbiAgICAgICAgc3RhcnRJbmRleCA9IHN0YXJ0SW5kZXggPT0gbnVsbCA/IGZ1bmMubGVuZ3RoIC0gMSA6ICtzdGFydEluZGV4O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gTWF0aC5tYXgoYXJndW1lbnRzLmxlbmd0aCAtIHN0YXJ0SW5kZXgsIDApO1xuICAgICAgICAgICAgdmFyIHJlc3QgPSBBcnJheShsZW5ndGgpO1xuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIHJlc3RbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4ICsgc3RhcnRJbmRleF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKHN0YXJ0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpcywgcmVzdCk7XG4gICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSwgcmVzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDdXJyZW50bHkgdW51c2VkIGJ1dCBoYW5kbGUgY2FzZXMgb3V0c2lkZSBvZiB0aGUgc3dpdGNoIHN0YXRlbWVudDpcbiAgICAgICAgICAgIC8vIHZhciBhcmdzID0gQXJyYXkoc3RhcnRJbmRleCArIDEpO1xuICAgICAgICAgICAgLy8gZm9yIChpbmRleCA9IDA7IGluZGV4IDwgc3RhcnRJbmRleDsgaW5kZXgrKykge1xuICAgICAgICAgICAgLy8gICAgIGFyZ3NbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGFyZ3Nbc3RhcnRJbmRleF0gPSByZXN0O1xuICAgICAgICAgICAgLy8gcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3dpdGhvdXRJbmRleChpdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRvcih2YWx1ZSwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vLy8gZXhwb3J0ZWQgYXN5bmMgbW9kdWxlIGZ1bmN0aW9ucyAvLy8vXG5cbiAgICAvLy8vIG5leHRUaWNrIGltcGxlbWVudGF0aW9uIHdpdGggYnJvd3Nlci1jb21wYXRpYmxlIGZhbGxiYWNrIC8vLy9cblxuICAgIC8vIGNhcHR1cmUgdGhlIGdsb2JhbCByZWZlcmVuY2UgdG8gZ3VhcmQgYWdhaW5zdCBmYWtlVGltZXIgbW9ja3NcbiAgICB2YXIgX3NldEltbWVkaWF0ZSA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbicgJiYgc2V0SW1tZWRpYXRlO1xuXG4gICAgdmFyIF9kZWxheSA9IF9zZXRJbW1lZGlhdGUgPyBmdW5jdGlvbihmbikge1xuICAgICAgICAvLyBub3QgYSBkaXJlY3QgYWxpYXMgZm9yIElFMTAgY29tcGF0aWJpbGl0eVxuICAgICAgICBfc2V0SW1tZWRpYXRlKGZuKTtcbiAgICB9IDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHByb2Nlc3MubmV4dFRpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgYXN5bmMubmV4dFRpY2sgPSBwcm9jZXNzLm5leHRUaWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFzeW5jLm5leHRUaWNrID0gX2RlbGF5O1xuICAgIH1cbiAgICBhc3luYy5zZXRJbW1lZGlhdGUgPSBfc2V0SW1tZWRpYXRlID8gX2RlbGF5IDogYXN5bmMubmV4dFRpY2s7XG5cblxuICAgIGFzeW5jLmZvckVhY2ggPVxuICAgIGFzeW5jLmVhY2ggPSBmdW5jdGlvbiAoYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jLmVhY2hPZihhcnIsIF93aXRob3V0SW5kZXgoaXRlcmF0b3IpLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGFzeW5jLmZvckVhY2hTZXJpZXMgPVxuICAgIGFzeW5jLmVhY2hTZXJpZXMgPSBmdW5jdGlvbiAoYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jLmVhY2hPZlNlcmllcyhhcnIsIF93aXRob3V0SW5kZXgoaXRlcmF0b3IpLCBjYWxsYmFjayk7XG4gICAgfTtcblxuXG4gICAgYXN5bmMuZm9yRWFjaExpbWl0ID1cbiAgICBhc3luYy5lYWNoTGltaXQgPSBmdW5jdGlvbiAoYXJyLCBsaW1pdCwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBfZWFjaE9mTGltaXQobGltaXQpKGFyciwgX3dpdGhvdXRJbmRleChpdGVyYXRvciksIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgYXN5bmMuZm9yRWFjaE9mID1cbiAgICBhc3luYy5lYWNoT2YgPSBmdW5jdGlvbiAob2JqZWN0LCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBfb25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgICAgb2JqZWN0ID0gb2JqZWN0IHx8IFtdO1xuICAgICAgICB2YXIgc2l6ZSA9IF9pc0FycmF5TGlrZShvYmplY3QpID8gb2JqZWN0Lmxlbmd0aCA6IF9rZXlzKG9iamVjdCkubGVuZ3RoO1xuICAgICAgICB2YXIgY29tcGxldGVkID0gMDtcbiAgICAgICAgaWYgKCFzaXplKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgX2VhY2gob2JqZWN0LCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgaXRlcmF0b3Iob2JqZWN0W2tleV0sIGtleSwgb25seV9vbmNlKGRvbmUpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIGRvbmUoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlZCArPSAxO1xuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQgPj0gc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgYXN5bmMuZm9yRWFjaE9mU2VyaWVzID1cbiAgICBhc3luYy5lYWNoT2ZTZXJpZXMgPSBmdW5jdGlvbiAob2JqLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBfb25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgICAgb2JqID0gb2JqIHx8IFtdO1xuICAgICAgICB2YXIgbmV4dEtleSA9IF9rZXlJdGVyYXRvcihvYmopO1xuICAgICAgICB2YXIga2V5ID0gbmV4dEtleSgpO1xuICAgICAgICBmdW5jdGlvbiBpdGVyYXRlKCkge1xuICAgICAgICAgICAgdmFyIHN5bmMgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZXJhdG9yKG9ialtrZXldLCBrZXksIG9ubHlfb25jZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAga2V5ID0gbmV4dEtleSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3luYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jLnNldEltbWVkaWF0ZShpdGVyYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlcmF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgc3luYyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGl0ZXJhdGUoKTtcbiAgICB9O1xuXG5cblxuICAgIGFzeW5jLmZvckVhY2hPZkxpbWl0ID1cbiAgICBhc3luYy5lYWNoT2ZMaW1pdCA9IGZ1bmN0aW9uIChvYmosIGxpbWl0LCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgX2VhY2hPZkxpbWl0KGxpbWl0KShvYmosIGl0ZXJhdG9yLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF9lYWNoT2ZMaW1pdChsaW1pdCkge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gX29uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICAgICAgICBvYmogPSBvYmogfHwgW107XG4gICAgICAgICAgICB2YXIgbmV4dEtleSA9IF9rZXlJdGVyYXRvcihvYmopO1xuICAgICAgICAgICAgaWYgKGxpbWl0IDw9IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHJ1bm5pbmcgPSAwO1xuICAgICAgICAgICAgdmFyIGVycm9yZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgKGZ1bmN0aW9uIHJlcGxlbmlzaCAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUgJiYgcnVubmluZyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAocnVubmluZyA8IGxpbWl0ICYmICFlcnJvcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBuZXh0S2V5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJ1bm5pbmcgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJ1bm5pbmcgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgaXRlcmF0b3Iob2JqW2tleV0sIGtleSwgb25seV9vbmNlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bm5pbmcgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGVuaXNoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9O1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gZG9QYXJhbGxlbChmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaiwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4oYXN5bmMuZWFjaE9mLCBvYmosIGl0ZXJhdG9yLCBjYWxsYmFjayk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRvUGFyYWxsZWxMaW1pdChmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaiwgbGltaXQsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIGZuKF9lYWNoT2ZMaW1pdChsaW1pdCksIG9iaiwgaXRlcmF0b3IsIGNhbGxiYWNrKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZG9TZXJpZXMoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIGZuKGFzeW5jLmVhY2hPZlNlcmllcywgb2JqLCBpdGVyYXRvciwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9hc3luY01hcChlYWNoZm4sIGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gX29uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICAgIGVhY2hmbihhcnIsIGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpdGVyYXRvcih2YWx1ZSwgZnVuY3Rpb24gKGVyciwgdikge1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbaW5kZXhdID0gdjtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jLm1hcCA9IGRvUGFyYWxsZWwoX2FzeW5jTWFwKTtcbiAgICBhc3luYy5tYXBTZXJpZXMgPSBkb1NlcmllcyhfYXN5bmNNYXApO1xuICAgIGFzeW5jLm1hcExpbWl0ID0gZG9QYXJhbGxlbExpbWl0KF9hc3luY01hcCk7XG5cbiAgICAvLyByZWR1Y2Ugb25seSBoYXMgYSBzZXJpZXMgdmVyc2lvbiwgYXMgZG9pbmcgcmVkdWNlIGluIHBhcmFsbGVsIHdvbid0XG4gICAgLy8gd29yayBpbiBtYW55IHNpdHVhdGlvbnMuXG4gICAgYXN5bmMuaW5qZWN0ID1cbiAgICBhc3luYy5mb2xkbCA9XG4gICAgYXN5bmMucmVkdWNlID0gZnVuY3Rpb24gKGFyciwgbWVtbywgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGFzeW5jLmVhY2hPZlNlcmllcyhhcnIsIGZ1bmN0aW9uICh4LCBpLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaXRlcmF0b3IobWVtbywgeCwgZnVuY3Rpb24gKGVyciwgdikge1xuICAgICAgICAgICAgICAgIG1lbW8gPSB2O1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyIHx8IG51bGwsIG1lbW8pO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgYXN5bmMuZm9sZHIgPVxuICAgIGFzeW5jLnJlZHVjZVJpZ2h0ID0gZnVuY3Rpb24gKGFyciwgbWVtbywgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZXZlcnNlZCA9IF9tYXAoYXJyLCBpZGVudGl0eSkucmV2ZXJzZSgpO1xuICAgICAgICBhc3luYy5yZWR1Y2UocmV2ZXJzZWQsIG1lbW8sIGl0ZXJhdG9yLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF9maWx0ZXIoZWFjaGZuLCBhcnIsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgICBlYWNoZm4oYXJyLCBmdW5jdGlvbiAoeCwgaW5kZXgsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpdGVyYXRvcih4LCBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaCh7aW5kZXg6IGluZGV4LCB2YWx1ZTogeH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKF9tYXAocmVzdWx0cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEuaW5kZXggLSBiLmluZGV4O1xuICAgICAgICAgICAgfSksIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHgudmFsdWU7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jLnNlbGVjdCA9XG4gICAgYXN5bmMuZmlsdGVyID0gZG9QYXJhbGxlbChfZmlsdGVyKTtcblxuICAgIGFzeW5jLnNlbGVjdExpbWl0ID1cbiAgICBhc3luYy5maWx0ZXJMaW1pdCA9IGRvUGFyYWxsZWxMaW1pdChfZmlsdGVyKTtcblxuICAgIGFzeW5jLnNlbGVjdFNlcmllcyA9XG4gICAgYXN5bmMuZmlsdGVyU2VyaWVzID0gZG9TZXJpZXMoX2ZpbHRlcik7XG5cbiAgICBmdW5jdGlvbiBfcmVqZWN0KGVhY2hmbiwgYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgX2ZpbHRlcihlYWNoZm4sIGFyciwgZnVuY3Rpb24odmFsdWUsIGNiKSB7XG4gICAgICAgICAgICBpdGVyYXRvcih2YWx1ZSwgZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAgIGNiKCF2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGFzeW5jLnJlamVjdCA9IGRvUGFyYWxsZWwoX3JlamVjdCk7XG4gICAgYXN5bmMucmVqZWN0TGltaXQgPSBkb1BhcmFsbGVsTGltaXQoX3JlamVjdCk7XG4gICAgYXN5bmMucmVqZWN0U2VyaWVzID0gZG9TZXJpZXMoX3JlamVjdCk7XG5cbiAgICBmdW5jdGlvbiBfY3JlYXRlVGVzdGVyKGVhY2hmbiwgY2hlY2ssIGdldFJlc3VsdCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oYXJyLCBsaW1pdCwgaXRlcmF0b3IsIGNiKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgICAgICAgICAgIGlmIChjYikgY2IoZ2V0UmVzdWx0KGZhbHNlLCB2b2lkIDApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGl0ZXJhdGVlKHgsIF8sIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjYikgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IoeCwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNiICYmIGNoZWNrKHYpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYihnZXRSZXN1bHQodHJ1ZSwgeCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IgPSBpdGVyYXRvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDMpIHtcbiAgICAgICAgICAgICAgICBlYWNoZm4oYXJyLCBsaW1pdCwgaXRlcmF0ZWUsIGRvbmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYiA9IGl0ZXJhdG9yO1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gbGltaXQ7XG4gICAgICAgICAgICAgICAgZWFjaGZuKGFyciwgaXRlcmF0ZWUsIGRvbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGFzeW5jLmFueSA9XG4gICAgYXN5bmMuc29tZSA9IF9jcmVhdGVUZXN0ZXIoYXN5bmMuZWFjaE9mLCB0b0Jvb2wsIGlkZW50aXR5KTtcblxuICAgIGFzeW5jLnNvbWVMaW1pdCA9IF9jcmVhdGVUZXN0ZXIoYXN5bmMuZWFjaE9mTGltaXQsIHRvQm9vbCwgaWRlbnRpdHkpO1xuXG4gICAgYXN5bmMuYWxsID1cbiAgICBhc3luYy5ldmVyeSA9IF9jcmVhdGVUZXN0ZXIoYXN5bmMuZWFjaE9mLCBub3RJZCwgbm90SWQpO1xuXG4gICAgYXN5bmMuZXZlcnlMaW1pdCA9IF9jcmVhdGVUZXN0ZXIoYXN5bmMuZWFjaE9mTGltaXQsIG5vdElkLCBub3RJZCk7XG5cbiAgICBmdW5jdGlvbiBfZmluZEdldFJlc3VsdCh2LCB4KSB7XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgICBhc3luYy5kZXRlY3QgPSBfY3JlYXRlVGVzdGVyKGFzeW5jLmVhY2hPZiwgaWRlbnRpdHksIF9maW5kR2V0UmVzdWx0KTtcbiAgICBhc3luYy5kZXRlY3RTZXJpZXMgPSBfY3JlYXRlVGVzdGVyKGFzeW5jLmVhY2hPZlNlcmllcywgaWRlbnRpdHksIF9maW5kR2V0UmVzdWx0KTtcbiAgICBhc3luYy5kZXRlY3RMaW1pdCA9IF9jcmVhdGVUZXN0ZXIoYXN5bmMuZWFjaE9mTGltaXQsIGlkZW50aXR5LCBfZmluZEdldFJlc3VsdCk7XG5cbiAgICBhc3luYy5zb3J0QnkgPSBmdW5jdGlvbiAoYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgYXN5bmMubWFwKGFyciwgZnVuY3Rpb24gKHgsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpdGVyYXRvcih4LCBmdW5jdGlvbiAoZXJyLCBjcml0ZXJpYSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHt2YWx1ZTogeCwgY3JpdGVyaWE6IGNyaXRlcmlhfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIsIHJlc3VsdHMpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIF9tYXAocmVzdWx0cy5zb3J0KGNvbXBhcmF0b3IpLCBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY29tcGFyYXRvcihsZWZ0LCByaWdodCkge1xuICAgICAgICAgICAgdmFyIGEgPSBsZWZ0LmNyaXRlcmlhLCBiID0gcmlnaHQuY3JpdGVyaWE7XG4gICAgICAgICAgICByZXR1cm4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IDA7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgYXN5bmMuYXV0byA9IGZ1bmN0aW9uICh0YXNrcywgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBfb25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgICAgdmFyIGtleXMgPSBfa2V5cyh0YXNrcyk7XG4gICAgICAgIHZhciByZW1haW5pbmdUYXNrcyA9IGtleXMubGVuZ3RoO1xuICAgICAgICBpZiAoIXJlbWFpbmluZ1Rhc2tzKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVzdWx0cyA9IHt9O1xuXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgZnVuY3Rpb24gYWRkTGlzdGVuZXIoZm4pIHtcbiAgICAgICAgICAgIGxpc3RlbmVycy51bnNoaWZ0KGZuKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihmbikge1xuICAgICAgICAgICAgdmFyIGlkeCA9IF9pbmRleE9mKGxpc3RlbmVycywgZm4pO1xuICAgICAgICAgICAgaWYgKGlkeCA+PSAwKSBsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdGFza0NvbXBsZXRlKCkge1xuICAgICAgICAgICAgcmVtYWluaW5nVGFza3MtLTtcbiAgICAgICAgICAgIF9hcnJheUVhY2gobGlzdGVuZXJzLnNsaWNlKDApLCBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRMaXN0ZW5lcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXJlbWFpbmluZ1Rhc2tzKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF9hcnJheUVhY2goa2V5cywgZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gX2lzQXJyYXkodGFza3Nba10pID8gdGFza3Nba106IFt0YXNrc1trXV07XG4gICAgICAgICAgICB2YXIgdGFza0NhbGxiYWNrID0gX3Jlc3RQYXJhbShmdW5jdGlvbihlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhcmdzID0gYXJnc1swXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2FmZVJlc3VsdHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgX2ZvckVhY2hPZihyZXN1bHRzLCBmdW5jdGlvbih2YWwsIHJrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhZmVSZXN1bHRzW3JrZXldID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2FmZVJlc3VsdHNba10gPSBhcmdzO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIsIHNhZmVSZXN1bHRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNba10gPSBhcmdzO1xuICAgICAgICAgICAgICAgICAgICBhc3luYy5zZXRJbW1lZGlhdGUodGFza0NvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciByZXF1aXJlcyA9IHRhc2suc2xpY2UoMCwgdGFzay5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgZGVhZC1sb2Nrc1xuICAgICAgICAgICAgdmFyIGxlbiA9IHJlcXVpcmVzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBkZXA7XG4gICAgICAgICAgICB3aGlsZSAobGVuLS0pIHtcbiAgICAgICAgICAgICAgICBpZiAoIShkZXAgPSB0YXNrc1tyZXF1aXJlc1tsZW5dXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdIYXMgaW5leGlzdGFudCBkZXBlbmRlbmN5Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChfaXNBcnJheShkZXApICYmIF9pbmRleE9mKGRlcCwgaykgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0hhcyBjeWNsaWMgZGVwZW5kZW5jaWVzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gcmVhZHkoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZWR1Y2UocmVxdWlyZXMsIGZ1bmN0aW9uIChhLCB4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoYSAmJiByZXN1bHRzLmhhc093blByb3BlcnR5KHgpKTtcbiAgICAgICAgICAgICAgICB9LCB0cnVlKSAmJiAhcmVzdWx0cy5oYXNPd25Qcm9wZXJ0eShrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZWFkeSgpKSB7XG4gICAgICAgICAgICAgICAgdGFza1t0YXNrLmxlbmd0aCAtIDFdKHRhc2tDYWxsYmFjaywgcmVzdWx0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhZGRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBsaXN0ZW5lcigpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVhZHkoKSkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgIHRhc2tbdGFzay5sZW5ndGggLSAxXSh0YXNrQ2FsbGJhY2ssIHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG5cbiAgICBhc3luYy5yZXRyeSA9IGZ1bmN0aW9uKHRpbWVzLCB0YXNrLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgREVGQVVMVF9USU1FUyA9IDU7XG4gICAgICAgIHZhciBERUZBVUxUX0lOVEVSVkFMID0gMDtcblxuICAgICAgICB2YXIgYXR0ZW1wdHMgPSBbXTtcblxuICAgICAgICB2YXIgb3B0cyA9IHtcbiAgICAgICAgICAgIHRpbWVzOiBERUZBVUxUX1RJTUVTLFxuICAgICAgICAgICAgaW50ZXJ2YWw6IERFRkFVTFRfSU5URVJWQUxcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBwYXJzZVRpbWVzKGFjYywgdCl7XG4gICAgICAgICAgICBpZih0eXBlb2YgdCA9PT0gJ251bWJlcicpe1xuICAgICAgICAgICAgICAgIGFjYy50aW1lcyA9IHBhcnNlSW50KHQsIDEwKSB8fCBERUZBVUxUX1RJTUVTO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHR5cGVvZiB0ID09PSAnb2JqZWN0Jyl7XG4gICAgICAgICAgICAgICAgYWNjLnRpbWVzID0gcGFyc2VJbnQodC50aW1lcywgMTApIHx8IERFRkFVTFRfVElNRVM7XG4gICAgICAgICAgICAgICAgYWNjLmludGVydmFsID0gcGFyc2VJbnQodC5pbnRlcnZhbCwgMTApIHx8IERFRkFVTFRfSU5URVJWQUw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgYXJndW1lbnQgdHlwZSBmb3IgXFwndGltZXNcXCc6ICcgKyB0eXBlb2YgdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbmd0aCA8IDEgfHwgbGVuZ3RoID4gMykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cyAtIG11c3QgYmUgZWl0aGVyICh0YXNrKSwgKHRhc2ssIGNhbGxiYWNrKSwgKHRpbWVzLCB0YXNrKSBvciAodGltZXMsIHRhc2ssIGNhbGxiYWNrKScpO1xuICAgICAgICB9IGVsc2UgaWYgKGxlbmd0aCA8PSAyICYmIHR5cGVvZiB0aW1lcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FsbGJhY2sgPSB0YXNrO1xuICAgICAgICAgICAgdGFzayA9IHRpbWVzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdGltZXMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHBhcnNlVGltZXMob3B0cywgdGltZXMpO1xuICAgICAgICB9XG4gICAgICAgIG9wdHMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgb3B0cy50YXNrID0gdGFzaztcblxuICAgICAgICBmdW5jdGlvbiB3cmFwcGVkVGFzayh3cmFwcGVkQ2FsbGJhY2ssIHdyYXBwZWRSZXN1bHRzKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiByZXRyeUF0dGVtcHQodGFzaywgZmluYWxBdHRlbXB0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNlcmllc0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhc2soZnVuY3Rpb24oZXJyLCByZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzQ2FsbGJhY2soIWVyciB8fCBmaW5hbEF0dGVtcHQsIHtlcnI6IGVyciwgcmVzdWx0OiByZXN1bHR9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgd3JhcHBlZFJlc3VsdHMpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJldHJ5SW50ZXJ2YWwoaW50ZXJ2YWwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihzZXJpZXNDYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllc0NhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9LCBpbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2hpbGUgKG9wdHMudGltZXMpIHtcblxuICAgICAgICAgICAgICAgIHZhciBmaW5hbEF0dGVtcHQgPSAhKG9wdHMudGltZXMtPTEpO1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzLnB1c2gocmV0cnlBdHRlbXB0KG9wdHMudGFzaywgZmluYWxBdHRlbXB0KSk7XG4gICAgICAgICAgICAgICAgaWYoIWZpbmFsQXR0ZW1wdCAmJiBvcHRzLmludGVydmFsID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzLnB1c2gocmV0cnlJbnRlcnZhbChvcHRzLmludGVydmFsKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhc3luYy5zZXJpZXMoYXR0ZW1wdHMsIGZ1bmN0aW9uKGRvbmUsIGRhdGEpe1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhW2RhdGEubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgKHdyYXBwZWRDYWxsYmFjayB8fCBvcHRzLmNhbGxiYWNrKShkYXRhLmVyciwgZGF0YS5yZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBhIGNhbGxiYWNrIGlzIHBhc3NlZCwgcnVuIHRoaXMgYXMgYSBjb250cm9sbCBmbG93XG4gICAgICAgIHJldHVybiBvcHRzLmNhbGxiYWNrID8gd3JhcHBlZFRhc2soKSA6IHdyYXBwZWRUYXNrO1xuICAgIH07XG5cbiAgICBhc3luYy53YXRlcmZhbGwgPSBmdW5jdGlvbiAodGFza3MsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gX29uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICAgIGlmICghX2lzQXJyYXkodGFza3MpKSB7XG4gICAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCB0byB3YXRlcmZhbGwgbXVzdCBiZSBhbiBhcnJheSBvZiBmdW5jdGlvbnMnKTtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGFza3MubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB3cmFwSXRlcmF0b3IoaXRlcmF0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBfcmVzdFBhcmFtKGZ1bmN0aW9uIChlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KG51bGwsIFtlcnJdLmNvbmNhdChhcmdzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh3cmFwSXRlcmF0b3IobmV4dCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbnN1cmVBc3luYyhpdGVyYXRvcikuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgd3JhcEl0ZXJhdG9yKGFzeW5jLml0ZXJhdG9yKHRhc2tzKSkoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gX3BhcmFsbGVsKGVhY2hmbiwgdGFza3MsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgbm9vcDtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBfaXNBcnJheUxpa2UodGFza3MpID8gW10gOiB7fTtcblxuICAgICAgICBlYWNoZm4odGFza3MsIGZ1bmN0aW9uICh0YXNrLCBrZXksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0YXNrKF9yZXN0UGFyYW0oZnVuY3Rpb24gKGVyciwgYXJncykge1xuICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmdzWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHRzW2tleV0gPSBhcmdzO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jLnBhcmFsbGVsID0gZnVuY3Rpb24gKHRhc2tzLCBjYWxsYmFjaykge1xuICAgICAgICBfcGFyYWxsZWwoYXN5bmMuZWFjaE9mLCB0YXNrcywgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICBhc3luYy5wYXJhbGxlbExpbWl0ID0gZnVuY3Rpb24odGFza3MsIGxpbWl0LCBjYWxsYmFjaykge1xuICAgICAgICBfcGFyYWxsZWwoX2VhY2hPZkxpbWl0KGxpbWl0KSwgdGFza3MsIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgYXN5bmMuc2VyaWVzID0gZnVuY3Rpb24odGFza3MsIGNhbGxiYWNrKSB7XG4gICAgICAgIF9wYXJhbGxlbChhc3luYy5lYWNoT2ZTZXJpZXMsIHRhc2tzLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGFzeW5jLml0ZXJhdG9yID0gZnVuY3Rpb24gKHRhc2tzKSB7XG4gICAgICAgIGZ1bmN0aW9uIG1ha2VDYWxsYmFjayhpbmRleCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gZm4oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhc2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0YXNrc1tpbmRleF0uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLm5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZuLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChpbmRleCA8IHRhc2tzLmxlbmd0aCAtIDEpID8gbWFrZUNhbGxiYWNrKGluZGV4ICsgMSk6IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGZuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYWtlQ2FsbGJhY2soMCk7XG4gICAgfTtcblxuICAgIGFzeW5jLmFwcGx5ID0gX3Jlc3RQYXJhbShmdW5jdGlvbiAoZm4sIGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIF9yZXN0UGFyYW0oZnVuY3Rpb24gKGNhbGxBcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkoXG4gICAgICAgICAgICAgICAgbnVsbCwgYXJncy5jb25jYXQoY2FsbEFyZ3MpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIF9jb25jYXQoZWFjaGZuLCBhcnIsIGZuLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIGVhY2hmbihhcnIsIGZ1bmN0aW9uICh4LCBpbmRleCwgY2IpIHtcbiAgICAgICAgICAgIGZuKHgsIGZ1bmN0aW9uIChlcnIsIHkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KHkgfHwgW10pO1xuICAgICAgICAgICAgICAgIGNiKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyLCByZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMuY29uY2F0ID0gZG9QYXJhbGxlbChfY29uY2F0KTtcbiAgICBhc3luYy5jb25jYXRTZXJpZXMgPSBkb1NlcmllcyhfY29uY2F0KTtcblxuICAgIGFzeW5jLndoaWxzdCA9IGZ1bmN0aW9uICh0ZXN0LCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBub29wO1xuICAgICAgICBpZiAodGVzdCgpKSB7XG4gICAgICAgICAgICB2YXIgbmV4dCA9IF9yZXN0UGFyYW0oZnVuY3Rpb24oZXJyLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGVzdC5hcHBseSh0aGlzLCBhcmdzKSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVyYXRvcihuZXh0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0ZXJhdG9yKG5leHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgYXN5bmMuZG9XaGlsc3QgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIHRlc3QsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjYWxscyA9IDA7XG4gICAgICAgIHJldHVybiBhc3luYy53aGlsc3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gKytjYWxscyA8PSAxIHx8IHRlc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSwgaXRlcmF0b3IsIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgYXN5bmMudW50aWwgPSBmdW5jdGlvbiAodGVzdCwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBhc3luYy53aGlsc3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRlc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSwgaXRlcmF0b3IsIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgYXN5bmMuZG9VbnRpbCA9IGZ1bmN0aW9uIChpdGVyYXRvciwgdGVzdCwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jLmRvV2hpbHN0KGl0ZXJhdG9yLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9LCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGFzeW5jLmR1cmluZyA9IGZ1bmN0aW9uICh0ZXN0LCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBub29wO1xuXG4gICAgICAgIHZhciBuZXh0ID0gX3Jlc3RQYXJhbShmdW5jdGlvbihlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goY2hlY2spO1xuICAgICAgICAgICAgICAgIHRlc3QuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBjaGVjayA9IGZ1bmN0aW9uKGVyciwgdHJ1dGgpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0cnV0aCkge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yKG5leHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0ZXN0KGNoZWNrKTtcbiAgICB9O1xuXG4gICAgYXN5bmMuZG9EdXJpbmcgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIHRlc3QsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjYWxscyA9IDA7XG4gICAgICAgIGFzeW5jLmR1cmluZyhmdW5jdGlvbihuZXh0KSB7XG4gICAgICAgICAgICBpZiAoY2FsbHMrKyA8IDEpIHtcbiAgICAgICAgICAgICAgICBuZXh0KG51bGwsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ZXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGl0ZXJhdG9yLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF9xdWV1ZSh3b3JrZXIsIGNvbmN1cnJlbmN5LCBwYXlsb2FkKSB7XG4gICAgICAgIGlmIChjb25jdXJyZW5jeSA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25jdXJyZW5jeSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihjb25jdXJyZW5jeSA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb25jdXJyZW5jeSBtdXN0IG5vdCBiZSB6ZXJvJyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2luc2VydChxLCBkYXRhLCBwb3MsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCAmJiB0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRhc2sgY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcS5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghX2lzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gW2RhdGFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZGF0YS5sZW5ndGggPT09IDAgJiYgcS5pZGxlKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBjYWxsIGRyYWluIGltbWVkaWF0ZWx5IGlmIHRoZXJlIGFyZSBubyB0YXNrc1xuICAgICAgICAgICAgICAgIHJldHVybiBhc3luYy5zZXRJbW1lZGlhdGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHEuZHJhaW4oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9hcnJheUVhY2goZGF0YSwgZnVuY3Rpb24odGFzaykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0YXNrLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2sgfHwgbm9vcFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICAgICAgICAgIHEudGFza3MudW5zaGlmdChpdGVtKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBxLnRhc2tzLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHEudGFza3MubGVuZ3RoID09PSBxLmNvbmN1cnJlbmN5KSB7XG4gICAgICAgICAgICAgICAgICAgIHEuc2F0dXJhdGVkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3luYy5zZXRJbW1lZGlhdGUocS5wcm9jZXNzKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfbmV4dChxLCB0YXNrcykge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgd29ya2VycyAtPSAxO1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgIF9hcnJheUVhY2godGFza3MsIGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhc2suY2FsbGJhY2suYXBwbHkodGFzaywgYXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHEudGFza3MubGVuZ3RoICsgd29ya2VycyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBxLmRyYWluKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHEucHJvY2VzcygpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB3b3JrZXJzID0gMDtcbiAgICAgICAgdmFyIHEgPSB7XG4gICAgICAgICAgICB0YXNrczogW10sXG4gICAgICAgICAgICBjb25jdXJyZW5jeTogY29uY3VycmVuY3ksXG4gICAgICAgICAgICBwYXlsb2FkOiBwYXlsb2FkLFxuICAgICAgICAgICAgc2F0dXJhdGVkOiBub29wLFxuICAgICAgICAgICAgZW1wdHk6IG5vb3AsXG4gICAgICAgICAgICBkcmFpbjogbm9vcCxcbiAgICAgICAgICAgIHN0YXJ0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcGF1c2VkOiBmYWxzZSxcbiAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uIChkYXRhLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIF9pbnNlcnQocSwgZGF0YSwgZmFsc2UsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBraWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcS5kcmFpbiA9IG5vb3A7XG4gICAgICAgICAgICAgICAgcS50YXNrcyA9IFtdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVuc2hpZnQ6IGZ1bmN0aW9uIChkYXRhLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIF9pbnNlcnQocSwgZGF0YSwgdHJ1ZSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByb2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXEucGF1c2VkICYmIHdvcmtlcnMgPCBxLmNvbmN1cnJlbmN5ICYmIHEudGFza3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKHdvcmtlcnMgPCBxLmNvbmN1cnJlbmN5ICYmIHEudGFza3MubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXNrcyA9IHEucGF5bG9hZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcS50YXNrcy5zcGxpY2UoMCwgcS5wYXlsb2FkKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcS50YXNrcy5zcGxpY2UoMCwgcS50YXNrcy5sZW5ndGgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IF9tYXAodGFza3MsIGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhc2suZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocS50YXNrcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxLmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJzICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2IgPSBvbmx5X29uY2UoX25leHQocSwgdGFza3MpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlcihkYXRhLCBjYik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVuZ3RoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHEudGFza3MubGVuZ3RoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bm5pbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd29ya2VycztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpZGxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcS50YXNrcy5sZW5ndGggKyB3b3JrZXJzID09PSAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhdXNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcS5wYXVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc3VtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChxLnBhdXNlZCA9PT0gZmFsc2UpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICAgICAgcS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdW1lQ291bnQgPSBNYXRoLm1pbihxLmNvbmN1cnJlbmN5LCBxLnRhc2tzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgLy8gTmVlZCB0byBjYWxsIHEucHJvY2VzcyBvbmNlIHBlciBjb25jdXJyZW50XG4gICAgICAgICAgICAgICAgLy8gd29ya2VyIHRvIHByZXNlcnZlIGZ1bGwgY29uY3VycmVuY3kgYWZ0ZXIgcGF1c2VcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB3ID0gMTsgdyA8PSByZXN1bWVDb3VudDsgdysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzeW5jLnNldEltbWVkaWF0ZShxLnByb2Nlc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHE7XG4gICAgfVxuXG4gICAgYXN5bmMucXVldWUgPSBmdW5jdGlvbiAod29ya2VyLCBjb25jdXJyZW5jeSkge1xuICAgICAgICB2YXIgcSA9IF9xdWV1ZShmdW5jdGlvbiAoaXRlbXMsIGNiKSB7XG4gICAgICAgICAgICB3b3JrZXIoaXRlbXNbMF0sIGNiKTtcbiAgICAgICAgfSwgY29uY3VycmVuY3ksIDEpO1xuXG4gICAgICAgIHJldHVybiBxO1xuICAgIH07XG5cbiAgICBhc3luYy5wcmlvcml0eVF1ZXVlID0gZnVuY3Rpb24gKHdvcmtlciwgY29uY3VycmVuY3kpIHtcblxuICAgICAgICBmdW5jdGlvbiBfY29tcGFyZVRhc2tzKGEsIGIpe1xuICAgICAgICAgICAgcmV0dXJuIGEucHJpb3JpdHkgLSBiLnByaW9yaXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2JpbmFyeVNlYXJjaChzZXF1ZW5jZSwgaXRlbSwgY29tcGFyZSkge1xuICAgICAgICAgICAgdmFyIGJlZyA9IC0xLFxuICAgICAgICAgICAgICAgIGVuZCA9IHNlcXVlbmNlLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB3aGlsZSAoYmVnIDwgZW5kKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1pZCA9IGJlZyArICgoZW5kIC0gYmVnICsgMSkgPj4+IDEpO1xuICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGl0ZW0sIHNlcXVlbmNlW21pZF0pID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYmVnID0gbWlkO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IG1pZCAtIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGJlZztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9pbnNlcnQocSwgZGF0YSwgcHJpb3JpdHksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCAmJiB0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRhc2sgY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcS5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghX2lzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gW2RhdGFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBjYWxsIGRyYWluIGltbWVkaWF0ZWx5IGlmIHRoZXJlIGFyZSBubyB0YXNrc1xuICAgICAgICAgICAgICAgIHJldHVybiBhc3luYy5zZXRJbW1lZGlhdGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHEuZHJhaW4oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9hcnJheUVhY2goZGF0YSwgZnVuY3Rpb24odGFzaykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0YXNrLFxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eTogcHJpb3JpdHksXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicgPyBjYWxsYmFjayA6IG5vb3BcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcS50YXNrcy5zcGxpY2UoX2JpbmFyeVNlYXJjaChxLnRhc2tzLCBpdGVtLCBfY29tcGFyZVRhc2tzKSArIDEsIDAsIGl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHEudGFza3MubGVuZ3RoID09PSBxLmNvbmN1cnJlbmN5KSB7XG4gICAgICAgICAgICAgICAgICAgIHEuc2F0dXJhdGVkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFzeW5jLnNldEltbWVkaWF0ZShxLnByb2Nlc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdGFydCB3aXRoIGEgbm9ybWFsIHF1ZXVlXG4gICAgICAgIHZhciBxID0gYXN5bmMucXVldWUod29ya2VyLCBjb25jdXJyZW5jeSk7XG5cbiAgICAgICAgLy8gT3ZlcnJpZGUgcHVzaCB0byBhY2NlcHQgc2Vjb25kIHBhcmFtZXRlciByZXByZXNlbnRpbmcgcHJpb3JpdHlcbiAgICAgICAgcS5wdXNoID0gZnVuY3Rpb24gKGRhdGEsIHByaW9yaXR5LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgX2luc2VydChxLCBkYXRhLCBwcmlvcml0eSwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFJlbW92ZSB1bnNoaWZ0IGZ1bmN0aW9uXG4gICAgICAgIGRlbGV0ZSBxLnVuc2hpZnQ7XG5cbiAgICAgICAgcmV0dXJuIHE7XG4gICAgfTtcblxuICAgIGFzeW5jLmNhcmdvID0gZnVuY3Rpb24gKHdvcmtlciwgcGF5bG9hZCkge1xuICAgICAgICByZXR1cm4gX3F1ZXVlKHdvcmtlciwgMSwgcGF5bG9hZCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF9jb25zb2xlX2ZuKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIF9yZXN0UGFyYW0oZnVuY3Rpb24gKGZuLCBhcmdzKSB7XG4gICAgICAgICAgICBmbi5hcHBseShudWxsLCBhcmdzLmNvbmNhdChbX3Jlc3RQYXJhbShmdW5jdGlvbiAoZXJyLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29uc29sZS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb25zb2xlW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYXJyYXlFYWNoKGFyZ3MsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZVtuYW1lXSh4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSldKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYy5sb2cgPSBfY29uc29sZV9mbignbG9nJyk7XG4gICAgYXN5bmMuZGlyID0gX2NvbnNvbGVfZm4oJ2RpcicpO1xuICAgIC8qYXN5bmMuaW5mbyA9IF9jb25zb2xlX2ZuKCdpbmZvJyk7XG4gICAgYXN5bmMud2FybiA9IF9jb25zb2xlX2ZuKCd3YXJuJyk7XG4gICAgYXN5bmMuZXJyb3IgPSBfY29uc29sZV9mbignZXJyb3InKTsqL1xuXG4gICAgYXN5bmMubWVtb2l6ZSA9IGZ1bmN0aW9uIChmbiwgaGFzaGVyKSB7XG4gICAgICAgIHZhciBtZW1vID0ge307XG4gICAgICAgIHZhciBxdWV1ZXMgPSB7fTtcbiAgICAgICAgaGFzaGVyID0gaGFzaGVyIHx8IGlkZW50aXR5O1xuICAgICAgICB2YXIgbWVtb2l6ZWQgPSBfcmVzdFBhcmFtKGZ1bmN0aW9uIG1lbW9pemVkKGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGFyZ3MucG9wKCk7XG4gICAgICAgICAgICB2YXIga2V5ID0gaGFzaGVyLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGtleSBpbiBtZW1vKSB7XG4gICAgICAgICAgICAgICAgYXN5bmMuc2V0SW1tZWRpYXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgbWVtb1trZXldKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGtleSBpbiBxdWV1ZXMpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZXNba2V5XS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHF1ZXVlc1trZXldID0gW2NhbGxiYWNrXTtcbiAgICAgICAgICAgICAgICBmbi5hcHBseShudWxsLCBhcmdzLmNvbmNhdChbX3Jlc3RQYXJhbShmdW5jdGlvbiAoYXJncykge1xuICAgICAgICAgICAgICAgICAgICBtZW1vW2tleV0gPSBhcmdzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcSA9IHF1ZXVlc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcXVldWVzW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gcS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHFbaV0uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG1lbW9pemVkLm1lbW8gPSBtZW1vO1xuICAgICAgICBtZW1vaXplZC51bm1lbW9pemVkID0gZm47XG4gICAgICAgIHJldHVybiBtZW1vaXplZDtcbiAgICB9O1xuXG4gICAgYXN5bmMudW5tZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKGZuLnVubWVtb2l6ZWQgfHwgZm4pLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF90aW1lcyhtYXBwZXIpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjb3VudCwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBtYXBwZXIoX3JhbmdlKGNvdW50KSwgaXRlcmF0b3IsIGNhbGxiYWNrKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhc3luYy50aW1lcyA9IF90aW1lcyhhc3luYy5tYXApO1xuICAgIGFzeW5jLnRpbWVzU2VyaWVzID0gX3RpbWVzKGFzeW5jLm1hcFNlcmllcyk7XG4gICAgYXN5bmMudGltZXNMaW1pdCA9IGZ1bmN0aW9uIChjb3VudCwgbGltaXQsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gYXN5bmMubWFwTGltaXQoX3JhbmdlKGNvdW50KSwgbGltaXQsIGl0ZXJhdG9yLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGFzeW5jLnNlcSA9IGZ1bmN0aW9uICgvKiBmdW5jdGlvbnMuLi4gKi8pIHtcbiAgICAgICAgdmFyIGZucyA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIF9yZXN0UGFyYW0oZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wb3AoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBub29wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhc3luYy5yZWR1Y2UoZm5zLCBhcmdzLCBmdW5jdGlvbiAobmV3YXJncywgZm4sIGNiKSB7XG4gICAgICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgbmV3YXJncy5jb25jYXQoW19yZXN0UGFyYW0oZnVuY3Rpb24gKGVyciwgbmV4dGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IoZXJyLCBuZXh0YXJncyk7XG4gICAgICAgICAgICAgICAgfSldKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKGVyciwgcmVzdWx0cykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoYXQsIFtlcnJdLmNvbmNhdChyZXN1bHRzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGFzeW5jLmNvbXBvc2UgPSBmdW5jdGlvbiAoLyogZnVuY3Rpb25zLi4uICovKSB7XG4gICAgICAgIHJldHVybiBhc3luYy5zZXEuYXBwbHkobnVsbCwgQXJyYXkucHJvdG90eXBlLnJldmVyc2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuXG5cbiAgICBmdW5jdGlvbiBfYXBwbHlFYWNoKGVhY2hmbikge1xuICAgICAgICByZXR1cm4gX3Jlc3RQYXJhbShmdW5jdGlvbihmbnMsIGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBnbyA9IF9yZXN0UGFyYW0oZnVuY3Rpb24oYXJncykge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBlYWNoZm4oZm5zLCBmdW5jdGlvbiAoZm4sIF8sIGNiKSB7XG4gICAgICAgICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIGFyZ3MuY29uY2F0KFtjYl0pKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdvLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdvO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYy5hcHBseUVhY2ggPSBfYXBwbHlFYWNoKGFzeW5jLmVhY2hPZik7XG4gICAgYXN5bmMuYXBwbHlFYWNoU2VyaWVzID0gX2FwcGx5RWFjaChhc3luYy5lYWNoT2ZTZXJpZXMpO1xuXG5cbiAgICBhc3luYy5mb3JldmVyID0gZnVuY3Rpb24gKGZuLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgZG9uZSA9IG9ubHlfb25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgICAgdmFyIHRhc2sgPSBlbnN1cmVBc3luYyhmbik7XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhc2sobmV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dCgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBlbnN1cmVBc3luYyhmbikge1xuICAgICAgICByZXR1cm4gX3Jlc3RQYXJhbShmdW5jdGlvbiAoYXJncykge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJncy5wb3AoKTtcbiAgICAgICAgICAgIGFyZ3MucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlubmVyQXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgICBpZiAoc3luYykge1xuICAgICAgICAgICAgICAgICAgICBhc3luYy5zZXRJbW1lZGlhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgaW5uZXJBcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgaW5uZXJBcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBzeW5jID0gdHJ1ZTtcbiAgICAgICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgc3luYyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYy5lbnN1cmVBc3luYyA9IGVuc3VyZUFzeW5jO1xuXG4gICAgYXN5bmMuY29uc3RhbnQgPSBfcmVzdFBhcmFtKGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgICB2YXIgYXJncyA9IFtudWxsXS5jb25jYXQodmFsdWVzKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgYXN5bmMud3JhcFN5bmMgPVxuICAgIGFzeW5jLmFzeW5jaWZ5ID0gZnVuY3Rpb24gYXN5bmNpZnkoZnVuYykge1xuICAgICAgICByZXR1cm4gX3Jlc3RQYXJhbShmdW5jdGlvbiAoYXJncykge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJncy5wb3AoKTtcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgcmVzdWx0IGlzIFByb21pc2Ugb2JqZWN0XG4gICAgICAgICAgICBpZiAoX2lzT2JqZWN0KHJlc3VsdCkgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyLm1lc3NhZ2UgPyBlcnIgOiBuZXcgRXJyb3IoZXJyKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBOb2RlLmpzXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gYXN5bmM7XG4gICAgfVxuICAgIC8vIEFNRCAvIFJlcXVpcmVKU1xuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBhc3luYztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIGluY2x1ZGVkIGRpcmVjdGx5IHZpYSA8c2NyaXB0PiB0YWdcbiAgICBlbHNlIHtcbiAgICAgICAgcm9vdC5hc3luYyA9IGFzeW5jO1xuICAgIH1cblxufSgpKTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cikge1xuXHRpZiAoc3RyLmxlbmd0aCA9PT0gMSkge1xuXHRcdHJldHVybiBzdHI7XG5cdH1cblxuXHRyZXR1cm4gc3RyXG5cdC5yZXBsYWNlKC9eW18uXFwtIF0rLywgJycpXG5cdC50b0xvd2VyQ2FzZSgpXG5cdC5yZXBsYWNlKC9bXy5cXC0gXSsoXFx3fCQpL2csIGZ1bmN0aW9uIChtLCBwMSkge1xuXHRcdHJldHVybiBwMS50b1VwcGVyQ2FzZSgpO1xuXHR9KTtcbn07XG4iXX0=
