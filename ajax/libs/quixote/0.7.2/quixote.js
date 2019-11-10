!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.quixote=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./util/ensure.js":21,"./util/oop.js":22,"./util/shim.js":23}],2:[function(require,module,exports){
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

},{"../util/ensure.js":21,"../values/position.js":25,"./position_descriptor.js":8,"./relative_position.js":9}],3:[function(require,module,exports){
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

		return this + " was " + difference + " than expected.\n" +
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
		expected = self.convert(expected, expectedType);
		if (expected === undefined) throw new Error("Can't compare " + self + " to " + expectedType + ".");
	}

	return expected;
}

},{"../util/ensure.js":21,"../util/oop.js":22,"../values/value.js":27}],4:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var Position = require("../values/position.js");
var RelativePosition = require("./relative_position.js");
var PositionDescriptor = require("./position_descriptor.js");
var ElementSize = require("./element_size.js");

var TOP = "top";
var RIGHT = "right";
var BOTTOM = "bottom";
var LEFT = "left";

var Me = module.exports = function ElementEdge(element, position) {
	var QElement = require("../q_element.js");      // break circular dependency
	ensure.signature(arguments, [ QElement, String ]);

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

	var edge = this._element.getRawPosition()[this._position];
	var scroll = this._element.frame.getRawScrollPosition();

	if (this._position === RIGHT || this._position === LEFT) return Position.x(edge + scroll.x);
	else return Position.y(edge + scroll.y);
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

},{"../q_element.js":15,"../util/ensure.js":21,"../values/position.js":25,"./element_size.js":5,"./position_descriptor.js":8,"./relative_position.js":9}],5:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var SizeDescriptor = require("./size_descriptor.js");
var Size = require("../values/size.js");
var RelativeSize = require("./relative_size.js");
var SizeMultiple = require("./size_multiple.js");

var X_DIMENSION = "width";
var Y_DIMENSION = "height";

var Me = module.exports = function ElementSize(dimension, element) {
	var QElement = require("../q_element.js");    // break circular dependency
	ensure.signature(arguments, [ String, QElement ]);
	ensure.that(dimension === X_DIMENSION || dimension === Y_DIMENSION, "Unrecognized dimension: " + dimension);

	this._dimension = dimension;
	this._element = element;
};
SizeDescriptor.extend(Me);

Me.x = factoryFn(X_DIMENSION);
Me.y = factoryFn(Y_DIMENSION);

Me.prototype.value = function value() {
	ensure.signature(arguments, []);

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
},{"../q_element.js":15,"../util/ensure.js":21,"../values/size.js":26,"./relative_size.js":10,"./size_descriptor.js":11,"./size_multiple.js":12}],6:[function(require,module,exports){
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
},{"../q_frame.js":17,"../util/ensure.js":21,"../values/position.js":25,"./position_descriptor.js":8}],7:[function(require,module,exports){
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
},{"../q_frame.js":17,"../util/ensure.js":21,"../values/size.js":26,"./size_descriptor.js":11}],8:[function(require,module,exports){
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
	if (type !== "number") return;

	return this._pdbc.dimension === X_DIMENSION ? Position.x(arg) : Position.y(arg);
};

function factoryFn(dimension) {
	return function factory(self) {
		// _pdbc: "PositionDescriptor base class." An attempt to prevent name conflicts.
		self._pdbc = { dimension: dimension };
	};
}

},{"../util/ensure.js":21,"../util/oop.js":22,"../values/position.js":25,"./descriptor.js":3,"./relative_position.js":9}],9:[function(require,module,exports){
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

},{"../util/ensure.js":21,"../values/pixels.js":24,"../values/position.js":25,"../values/size.js":26,"../values/value.js":27,"./descriptor.js":3,"./element_size.js":5,"./position_descriptor.js":8}],10:[function(require,module,exports){
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
},{"../util/ensure.js":21,"../values/size.js":26,"../values/value.js":27,"./descriptor.js":3,"./size_descriptor.js":11,"./size_multiple.js":12}],11:[function(require,module,exports){
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
	if (type === "number") return Size.create(arg);
};

},{"../util/ensure.js":21,"../util/oop.js":22,"../values/size.js":26,"./descriptor.js":3,"./relative_size.js":10,"./size_multiple.js":12}],12:[function(require,module,exports){
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
},{"../util/ensure.js":21,"../values/size.js":26,"./descriptor.js":3,"./size_descriptor.js":11}],13:[function(require,module,exports){
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

},{"../q_frame.js":17,"../util/ensure.js":21,"../values/position.js":25,"./position_descriptor.js":8}],14:[function(require,module,exports){
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
},{"../util/ensure.js":21,"../values/size.js":26,"./relative_size.js":10,"./size_descriptor.js":11,"./size_multiple.js":12}],15:[function(require,module,exports){
// Copyright (c) 2014-2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("./util/ensure.js");
var camelcase = require("../vendor/camelcase-1.0.1-modified.js");
var ElementEdge = require("./descriptors/element_edge.js");
var Center = require("./descriptors/center.js");
var ElementSize = require("./descriptors/element_size.js");
var Assertable = require("./assertable.js");

var Me = module.exports = function QElement(domElement, frame, nickname) {
	var QFrame = require("./q_frame.js");    // break circular dependency
	ensure.signature(arguments, [ Object, QFrame, String ]);

	this._domElement = domElement;
	this._nickname = nickname;

	this.frame = frame;

	// properties
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
	ensure.signature(arguments, [ String ]);

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

Me.prototype.toDomElement = function toDomElement() {
	ensure.signature(arguments, []);
	return this._domElement;
};

Me.prototype.toString = function toString() {
	ensure.signature(arguments, []);
	return "'" + this._nickname + "'";
};

Me.prototype.equals = function equals(that) {
	ensure.signature(arguments, [ Me ]);
	return this._domElement === that._domElement;
};

},{"../vendor/camelcase-1.0.1-modified.js":28,"./assertable.js":1,"./descriptors/center.js":2,"./descriptors/element_edge.js":4,"./descriptors/element_size.js":5,"./q_frame.js":17,"./util/ensure.js":21}],16:[function(require,module,exports){
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
},{"./q_element.js":15,"./q_frame.js":17,"./util/ensure.js":21}],17:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("./util/ensure.js");
var shim = require("./util/shim.js");
var quixote = require("./quixote.js");
var QElement = require("./q_element.js");
var QElementList = require("./q_element_list.js");
var QViewport = require("./q_viewport.js");
var QPage = require("./q_page.js");

var Me = module.exports = function QFrame(frameDom) {
	ensure.signature(arguments, [ Object ]);
	ensure.that(frameDom.tagName === "IFRAME", "QFrame DOM element must be an iframe");

	this._domElement = frameDom;
	this._loaded = false;
	this._removed = false;
};

function loaded(self, width, height) {
	self._loaded = true;
	self._document = self._domElement.contentDocument;
	self._originalBody = self._document.body.innerHTML;
	self._originalWidth = width;
	self._originalHeight = height;
}

Me.create = function create(parentElement, options, callback) {
	ensure.signature(arguments, [ Object, [ Object, Function ], [ undefined, Function ] ]);

	if (callback === undefined) {
		callback = options;
		options = {};
	}
	var width = options.width || 2000;
	var height = options.height || 2000;

	// WORKAROUND Mobile Safari 7.0.0: weird style results occur when both src and stylesheet are loaded (see test)
	ensure.that(
		!(options.src && options.stylesheet),
		"Cannot specify HTML URL and stylesheet URL simultaneously due to Mobile Safari issue"
	);

	var iframe = document.createElement("iframe");
	iframe.setAttribute("width", width);
	iframe.setAttribute("height", height);
	iframe.setAttribute("frameborder", "0");    // WORKAROUND IE 8: don't include frame border in position calcs

	if (options.src !== undefined) {
		iframe.setAttribute("src", options.src);
		shim.EventTarget.addEventListener(iframe, "load", onFrameLoad);
	}

	var frame = new Me(iframe);
	parentElement.appendChild(iframe);

	// WORKAROUND IE 8: ensure that the frame is in standards mode, not quirks mode.
	if (options.src === undefined) {
		shim.EventTarget.addEventListener(iframe, "load", onFrameLoad);
		var standardsMode = "<!DOCTYPE html>\n" +
			"<html>" +
			"<head></head><body></body>" +
			"</html>";
		iframe.contentWindow.document.open();
		iframe.contentWindow.document.write(standardsMode);
		iframe.contentWindow.document.close();
	}

	return frame;

	function onFrameLoad() {
		// WORKAROUND Mobile Safari 7.0.0, Safari 6.2.0, Chrome 38.0.2125: frame is loaded synchronously
		// We force it to be asynchronous here
		setTimeout(function() {
			loaded(frame, width, height);
			loadStylesheet(frame, options.stylesheet, function() {
				callback(null, frame);
			});
		}, 0);
	}
};

function loadStylesheet(self, url, callback) {
	ensure.signature(arguments, [ Me, [ undefined, String ], Function ]);
	if (url === undefined) return callback();

	var link = document.createElement("link");
	shim.EventTarget.addEventListener(link, "load", onLinkLoad);
	link.setAttribute("rel", "stylesheet");
	link.setAttribute("type", "text/css");
	link.setAttribute("href", url);

	shim.Document.head(self._document).appendChild(link);
	function onLinkLoad() {
		callback();
	}
}

Me.prototype.reset = function() {
	ensure.signature(arguments, []);
	ensureUsable(this);

	this._document.body.innerHTML = this._originalBody;
	this.scroll(0, 0);
	this.resize(this._originalWidth, this._originalHeight);
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
	ensure.signature(arguments, [ String, [undefined, String] ]);
	if (nickname === undefined) nickname = html;
	ensureUsable(this);

	var tempElement = document.createElement("div");
	tempElement.innerHTML = html;
	ensure.that(
		tempElement.childNodes.length === 1,
		"Expected one element, but got " + tempElement.childNodes.length + " (" + html + ")"
	);

	var insertedElement = tempElement.childNodes[0];
	this._document.body.appendChild(insertedElement);
	return new QElement(insertedElement, this, nickname);
};

Me.prototype.get = function(selector, nickname) {
	ensure.signature(arguments, [ String, [undefined, String] ]);
	if (nickname === undefined) nickname = selector;
	ensureUsable(this);

	var nodes = this._document.querySelectorAll(selector);
	ensure.that(nodes.length === 1, "Expected one element to match '" + selector + "', but found " + nodes.length);
	return new QElement(nodes[0], this, nickname);
};

Me.prototype.getAll = function(selector, nickname) {
	ensure.signature(arguments, [ String, [undefined, String] ]);
	if (nickname === undefined) nickname = selector;

	return new QElementList(this._document.querySelectorAll(selector), this, nickname);
};

Me.prototype.scroll = function scroll(x, y) {
	ensure.signature(arguments, [ Number, Number ]);

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
	ensure.signature(arguments, [ Number, Number ]);

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

},{"./q_element.js":15,"./q_element_list.js":16,"./q_page.js":18,"./q_viewport.js":19,"./quixote.js":20,"./util/ensure.js":21,"./util/shim.js":23}],18:[function(require,module,exports){
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

},{"./assertable.js":1,"./descriptors/center.js":2,"./descriptors/page_edge.js":6,"./descriptors/page_size.js":7,"./q_frame.js":17,"./util/ensure.js":21}],19:[function(require,module,exports){
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

},{"./assertable.js":1,"./descriptors/center.js":2,"./descriptors/viewport_edge.js":13,"./descriptors/viewport_size.js":14,"./q_frame.js":17,"./util/ensure.js":21}],20:[function(require,module,exports){
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

exports.browser.enlargesFrameToPageSize = function enlargesFrameToPageSize() {
	ensure.signature(arguments, []);
	ensure.that(
		features.enlargesFrame !== undefined,
		"Must create a frame before using Quixote browser feature detection."
	);

	return features.enlargesFrame;
};


function detectBrowserFeatures(callback) {
	var FRAME_WIDTH = 300;
	var FRAME_HEIGHT = 200;

	features = {};
	var detector = QFrame.create(document.body, { width: FRAME_WIDTH, height: FRAME_HEIGHT }, function(err) {
		if (err) {
			console.log("Error during Quixote browser feature detection:", err);
			return callback();
		}

		try {
			detector.add("<div style='width: " + (FRAME_WIDTH + 200) + "px'>force scrolling</div>");
			features.enlargesFrame = !detector.viewport().width.value().equals(Size.create(FRAME_WIDTH));

			return callback();
		}
		finally {
			detector.remove();
		}
	});
}
},{"./q_frame.js":17,"./util/ensure.js":21,"./values/size.js":26}],21:[function(require,module,exports){
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

var EnsureException = exports.EnsureException = function(fnToRemoveFromStackTrace, message) {
	if (Error.captureStackTrace) Error.captureStackTrace(this, fnToRemoveFromStackTrace);
	else this.stack = (new Error()).stack;
	this.message = message;
};
EnsureException.prototype = shim.Object.create(Error.prototype);
EnsureException.prototype.constructor = EnsureException;
EnsureException.prototype.name = "EnsureException";

},{"./oop.js":22,"./shim.js":23}],22:[function(require,module,exports){
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
},{"./shim.js":23}],23:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

exports.Array = {

	// WORKAROUND IE 8: no Array.isArray
	isArray: function isArray(thing) {
		if (Array.isArray) return Array.isArray(thing);

		return Object.prototype.toString.call(thing) === '[object Array]';
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


exports.EventTarget = {

	// WORKAROUND IE8: no EventTarget.addEventListener()
	addEventListener: function addEventListener(element, event, callback) {
		if (element.addEventListener) return element.addEventListener(event, callback);

		element.attachEvent("on" + event, callback);
	}

};


exports.Document = {

	// WORKAROUND IE8: no document.head
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
},{}],24:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var Value = require("./value.js");

var Me = module.exports = function Pixels(amount) {
	ensure.signature(arguments, [ Number ]);
	this._amount = amount;
};
Value.extend(Me);

Me.create = function create(amount) {
	return new Me(amount);
};

Me.prototype.compatibility = function compatibility() {
	return [ Me ];
};

Me.prototype.plus = Value.safe(function plus(operand) {
	return new Me(this._amount + operand._amount);
});

Me.prototype.minus = Value.safe(function minus(operand) {
	return new Me(this._amount - operand._amount);
});

Me.prototype.times = function times(operand) {
	ensure.signature(arguments, [ Number ]);

	return new Me(this._amount * operand);
};

Me.prototype.average = Value.safe(function average(operand) {
	return new Me((this._amount + operand._amount) / 2);
});

Me.prototype.compare = Value.safe(function compare(operand) {
	var difference = this._amount - operand._amount;
	if (Math.abs(difference) <= 0.5) return 0;
	else return difference;
});

Me.prototype.diff = Value.safe(function diff(expected) {
	if (this.compare(expected) === 0) return "";

	var difference = Math.abs(this._amount - expected._amount);

	var desc = difference;
	if (difference * 100 !== Math.floor(difference * 100)) desc = "about " + difference.toFixed(2);
	return desc + "px";
});

Me.prototype.toString = function toString() {
	ensure.signature(arguments, []);
	return this._amount + "px";
};

},{"../util/ensure.js":21,"./value.js":27}],25:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var Value = require("./value.js");
var Pixels = require("./pixels.js");
var Size = require("./size.js");

var X_DIMENSION = "x";
var Y_DIMENSION = "y";

var Me = module.exports = function Position(dimension, value) {
	ensure.signature(arguments, [ String, [Number, Pixels] ]);

	this._dimension = dimension;
	this._value = (typeof value === "number") ? Pixels.create(value) : value;
};
Value.extend(Me);

Me.x = function x(value) {
	return new Me(X_DIMENSION, value);
};

Me.y = function y(value) {
	return new Me(Y_DIMENSION, value);
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

	var direction;
	var comparison = actualValue.compare(expectedValue);
	if (this._dimension === X_DIMENSION) direction = comparison < 0 ? "further left" : "further right";
	else direction = comparison < 0 ? "higher" : "lower";

	return actualValue.diff(expectedValue) + " " + direction;
});

Me.prototype.toString = function toString() {
	ensure.signature(arguments, []);
	return this._value.toString();
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

},{"../util/ensure.js":21,"./pixels.js":24,"./size.js":26,"./value.js":27}],26:[function(require,module,exports){
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

	var desc = actualValue.compare(expectedValue) > 0 ? " larger" : " smaller";
	return actualValue.diff(expectedValue) + desc;
});

Me.prototype.toString = function toString() {
	ensure.signature(arguments, []);
	return this._value.toString();
};

Me.prototype.toPixels = function toPixels() {
	ensure.signature(arguments, []);
	return this._value;
};

},{"../util/ensure.js":21,"./pixels.js":24,"./value.js":27}],27:[function(require,module,exports){
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ensure = require("../util/ensure.js");
var oop = require("../util/oop.js");
var shim = require("../util/shim.js");

var Me = module.exports = function Value() {};
Me.extend = oop.extendFn(Me);
oop.makeAbstract(Me, [
	"diff",
	"toString",
	"compatibility"
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
},{"../util/ensure.js":21,"../util/oop.js":22,"../util/shim.js":23}],28:[function(require,module,exports){
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

},{}]},{},[20])(20)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvanNob3JlL0RvY3VtZW50cy9Qcm9qZWN0cy9xdWl4b3RlL3NyYy9hc3NlcnRhYmxlLmpzIiwiL1VzZXJzL2pzaG9yZS9Eb2N1bWVudHMvUHJvamVjdHMvcXVpeG90ZS9zcmMvZGVzY3JpcHRvcnMvY2VudGVyLmpzIiwiL1VzZXJzL2pzaG9yZS9Eb2N1bWVudHMvUHJvamVjdHMvcXVpeG90ZS9zcmMvZGVzY3JpcHRvcnMvZGVzY3JpcHRvci5qcyIsIi9Vc2Vycy9qc2hvcmUvRG9jdW1lbnRzL1Byb2plY3RzL3F1aXhvdGUvc3JjL2Rlc2NyaXB0b3JzL2VsZW1lbnRfZWRnZS5qcyIsIi9Vc2Vycy9qc2hvcmUvRG9jdW1lbnRzL1Byb2plY3RzL3F1aXhvdGUvc3JjL2Rlc2NyaXB0b3JzL2VsZW1lbnRfc2l6ZS5qcyIsIi9Vc2Vycy9qc2hvcmUvRG9jdW1lbnRzL1Byb2plY3RzL3F1aXhvdGUvc3JjL2Rlc2NyaXB0b3JzL3BhZ2VfZWRnZS5qcyIsIi9Vc2Vycy9qc2hvcmUvRG9jdW1lbnRzL1Byb2plY3RzL3F1aXhvdGUvc3JjL2Rlc2NyaXB0b3JzL3BhZ2Vfc2l6ZS5qcyIsIi9Vc2Vycy9qc2hvcmUvRG9jdW1lbnRzL1Byb2plY3RzL3F1aXhvdGUvc3JjL2Rlc2NyaXB0b3JzL3Bvc2l0aW9uX2Rlc2NyaXB0b3IuanMiLCIvVXNlcnMvanNob3JlL0RvY3VtZW50cy9Qcm9qZWN0cy9xdWl4b3RlL3NyYy9kZXNjcmlwdG9ycy9yZWxhdGl2ZV9wb3NpdGlvbi5qcyIsIi9Vc2Vycy9qc2hvcmUvRG9jdW1lbnRzL1Byb2plY3RzL3F1aXhvdGUvc3JjL2Rlc2NyaXB0b3JzL3JlbGF0aXZlX3NpemUuanMiLCIvVXNlcnMvanNob3JlL0RvY3VtZW50cy9Qcm9qZWN0cy9xdWl4b3RlL3NyYy9kZXNjcmlwdG9ycy9zaXplX2Rlc2NyaXB0b3IuanMiLCIvVXNlcnMvanNob3JlL0RvY3VtZW50cy9Qcm9qZWN0cy9xdWl4b3RlL3NyYy9kZXNjcmlwdG9ycy9zaXplX211bHRpcGxlLmpzIiwiL1VzZXJzL2pzaG9yZS9Eb2N1bWVudHMvUHJvamVjdHMvcXVpeG90ZS9zcmMvZGVzY3JpcHRvcnMvdmlld3BvcnRfZWRnZS5qcyIsIi9Vc2Vycy9qc2hvcmUvRG9jdW1lbnRzL1Byb2plY3RzL3F1aXhvdGUvc3JjL2Rlc2NyaXB0b3JzL3ZpZXdwb3J0X3NpemUuanMiLCIvVXNlcnMvanNob3JlL0RvY3VtZW50cy9Qcm9qZWN0cy9xdWl4b3RlL3NyYy9xX2VsZW1lbnQuanMiLCIvVXNlcnMvanNob3JlL0RvY3VtZW50cy9Qcm9qZWN0cy9xdWl4b3RlL3NyYy9xX2VsZW1lbnRfbGlzdC5qcyIsIi9Vc2Vycy9qc2hvcmUvRG9jdW1lbnRzL1Byb2plY3RzL3F1aXhvdGUvc3JjL3FfZnJhbWUuanMiLCIvVXNlcnMvanNob3JlL0RvY3VtZW50cy9Qcm9qZWN0cy9xdWl4b3RlL3NyYy9xX3BhZ2UuanMiLCIvVXNlcnMvanNob3JlL0RvY3VtZW50cy9Qcm9qZWN0cy9xdWl4b3RlL3NyYy9xX3ZpZXdwb3J0LmpzIiwiL1VzZXJzL2pzaG9yZS9Eb2N1bWVudHMvUHJvamVjdHMvcXVpeG90ZS9zcmMvcXVpeG90ZS5qcyIsIi9Vc2Vycy9qc2hvcmUvRG9jdW1lbnRzL1Byb2plY3RzL3F1aXhvdGUvc3JjL3V0aWwvZW5zdXJlLmpzIiwiL1VzZXJzL2pzaG9yZS9Eb2N1bWVudHMvUHJvamVjdHMvcXVpeG90ZS9zcmMvdXRpbC9vb3AuanMiLCIvVXNlcnMvanNob3JlL0RvY3VtZW50cy9Qcm9qZWN0cy9xdWl4b3RlL3NyYy91dGlsL3NoaW0uanMiLCIvVXNlcnMvanNob3JlL0RvY3VtZW50cy9Qcm9qZWN0cy9xdWl4b3RlL3NyYy92YWx1ZXMvcGl4ZWxzLmpzIiwiL1VzZXJzL2pzaG9yZS9Eb2N1bWVudHMvUHJvamVjdHMvcXVpeG90ZS9zcmMvdmFsdWVzL3Bvc2l0aW9uLmpzIiwiL1VzZXJzL2pzaG9yZS9Eb2N1bWVudHMvUHJvamVjdHMvcXVpeG90ZS9zcmMvdmFsdWVzL3NpemUuanMiLCIvVXNlcnMvanNob3JlL0RvY3VtZW50cy9Qcm9qZWN0cy9xdWl4b3RlL3NyYy92YWx1ZXMvdmFsdWUuanMiLCIvVXNlcnMvanNob3JlL0RvY3VtZW50cy9Qcm9qZWN0cy9xdWl4b3RlL3ZlbmRvci9jYW1lbGNhc2UtMS4wLjEtbW9kaWZpZWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIENvcHlyaWdodCAoYykgMjAxNSBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuL3V0aWwvZW5zdXJlLmpzXCIpO1xudmFyIG9vcCA9IHJlcXVpcmUoXCIuL3V0aWwvb29wLmpzXCIpO1xudmFyIHNoaW0gPSByZXF1aXJlKFwiLi91dGlsL3NoaW0uanNcIik7XG5cbnZhciBNZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQXNzZXJ0YWJsZSgpIHtcblx0ZW5zdXJlLnVucmVhY2hhYmxlKFwiQXNzZXJ0YWJsZSBpcyBhYnN0cmFjdCBhbmQgc2hvdWxkIG5vdCBiZSBjb25zdHJ1Y3RlZCBkaXJlY3RseS5cIik7XG59O1xuTWUuZXh0ZW5kID0gb29wLmV4dGVuZEZuKE1lKTtcbm9vcC5tYWtlQWJzdHJhY3QoTWUsIFtdKTtcblxuTWUucHJvdG90eXBlLmFzc2VydCA9IGZ1bmN0aW9uIGFzc2VydChleHBlY3RlZCwgbWVzc2FnZSkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBPYmplY3QsIFt1bmRlZmluZWQsIFN0cmluZ10gXSk7XG5cdGlmIChtZXNzYWdlID09PSB1bmRlZmluZWQpIG1lc3NhZ2UgPSBcIkRpZmZlcmVuY2VzIGZvdW5kXCI7XG5cblx0dmFyIGRpZmYgPSB0aGlzLmRpZmYoZXhwZWN0ZWQpO1xuXHRpZiAoZGlmZiAhPT0gXCJcIikgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgKyBcIjpcXG5cIiArIGRpZmYgKyBcIlxcblwiKTtcbn07XG5cbk1lLnByb3RvdHlwZS5kaWZmID0gZnVuY3Rpb24gZGlmZihleHBlY3RlZCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBPYmplY3QgXSk7XG5cblx0dmFyIHJlc3VsdCA9IFtdO1xuXHR2YXIga2V5cyA9IHNoaW0uT2JqZWN0LmtleXMoZXhwZWN0ZWQpO1xuXHR2YXIga2V5LCBvbmVEaWZmLCBkZXNjcmlwdG9yO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0XHRrZXkgPSBrZXlzW2ldO1xuXHRcdGRlc2NyaXB0b3IgPSB0aGlzW2tleV07XG5cdFx0ZW5zdXJlLnRoYXQoXG5cdFx0XHRcdGRlc2NyaXB0b3IgIT09IHVuZGVmaW5lZCxcblx0XHRcdFx0dGhpcyArIFwiIGRvZXNuJ3QgaGF2ZSBhIHByb3BlcnR5IG5hbWVkICdcIiArIGtleSArIFwiJy4gRGlkIHlvdSBtaXNzcGVsbCBpdD9cIlxuXHRcdCk7XG5cdFx0b25lRGlmZiA9IGRlc2NyaXB0b3IuZGlmZihleHBlY3RlZFtrZXldKTtcblx0XHRpZiAob25lRGlmZiAhPT0gXCJcIikgcmVzdWx0LnB1c2gob25lRGlmZik7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcXG5cIik7XG59O1xuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE0IFRpdGFuaXVtIEkuVC4gTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBGb3IgbGljZW5zZSwgc2VlIFwiUkVBRE1FXCIgb3IgXCJMSUNFTlNFXCIgZmlsZS5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgZW5zdXJlID0gcmVxdWlyZShcIi4uL3V0aWwvZW5zdXJlLmpzXCIpO1xudmFyIFBvc2l0aW9uRGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuL3Bvc2l0aW9uX2Rlc2NyaXB0b3IuanNcIik7XG52YXIgUG9zaXRpb24gPSByZXF1aXJlKFwiLi4vdmFsdWVzL3Bvc2l0aW9uLmpzXCIpO1xudmFyIFJlbGF0aXZlUG9zaXRpb24gPSByZXF1aXJlKFwiLi9yZWxhdGl2ZV9wb3NpdGlvbi5qc1wiKTtcblxudmFyIFhfRElNRU5TSU9OID0gXCJ4XCI7XG52YXIgWV9ESU1FTlNJT04gPSBcInlcIjtcblxudmFyIE1lID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBDZW50ZXIoZGltZW5zaW9uLCBwb3NpdGlvbjEsIHBvc2l0aW9uMiwgZGVzY3JpcHRpb24pIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgU3RyaW5nLCBQb3NpdGlvbkRlc2NyaXB0b3IsIFBvc2l0aW9uRGVzY3JpcHRvciwgU3RyaW5nIF0pO1xuXG5cdGlmIChkaW1lbnNpb24gPT09IFhfRElNRU5TSU9OKSBQb3NpdGlvbkRlc2NyaXB0b3IueCh0aGlzKTtcblx0ZWxzZSBpZiAoZGltZW5zaW9uID09PSBZX0RJTUVOU0lPTikgUG9zaXRpb25EZXNjcmlwdG9yLnkodGhpcyk7XG5cdGVsc2UgZW5zdXJlLnVucmVhY2hhYmxlKFwiVW5rbm93biBkaW1lbnNpb246IFwiICsgZGltZW5zaW9uKTtcblxuXHR0aGlzLl9kaW1lbnNpb24gPSBkaW1lbnNpb247XG5cdHRoaXMuX3Bvc2l0aW9uMSA9IHBvc2l0aW9uMTtcblx0dGhpcy5fcG9zaXRpb24yID0gcG9zaXRpb24yO1xuXHR0aGlzLl9kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xufTtcblBvc2l0aW9uRGVzY3JpcHRvci5leHRlbmQoTWUpO1xuXG5NZS54ID0gZmFjdG9yeUZuKFhfRElNRU5TSU9OKTtcbk1lLnkgPSBmYWN0b3J5Rm4oWV9ESU1FTlNJT04pO1xuXG5NZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSgpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9uMS52YWx1ZSgpLm1pZHBvaW50KHRoaXMuX3Bvc2l0aW9uMi52YWx1ZSgpKTtcbn07XG5cbk1lLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXHRyZXR1cm4gdGhpcy5fZGVzY3JpcHRpb247XG59O1xuXG5mdW5jdGlvbiBmYWN0b3J5Rm4oZGltZW5zaW9uKSB7XG5cdHJldHVybiBmdW5jdGlvbihwb3NpdGlvbjEsIHBvc2l0aW9uMiwgZGVzY3JpcHRpb24pIHtcblx0XHRyZXR1cm4gbmV3IE1lKGRpbWVuc2lvbiwgcG9zaXRpb24xLCBwb3NpdGlvbjIsIGRlc2NyaXB0aW9uKTtcblx0fTtcbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxNCBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vuc3VyZS5qc1wiKTtcbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vdXRpbC9vb3AuanNcIik7XG52YXIgVmFsdWUgPSByZXF1aXJlKFwiLi4vdmFsdWVzL3ZhbHVlLmpzXCIpO1xuXG52YXIgTWUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIERlc2NyaXB0b3IoKSB7XG5cdGVuc3VyZS51bnJlYWNoYWJsZShcIkRlc2NyaXB0b3IgaXMgYWJzdHJhY3QgYW5kIHNob3VsZCBub3QgYmUgY29uc3RydWN0ZWQgZGlyZWN0bHkuXCIpO1xufTtcbk1lLmV4dGVuZCA9IG9vcC5leHRlbmRGbihNZSk7XG5vb3AubWFrZUFic3RyYWN0KE1lLCBbXG5cdFwidmFsdWVcIixcblx0XCJ0b1N0cmluZ1wiXG5dKTtcblxuTWUucHJvdG90eXBlLmRpZmYgPSBmdW5jdGlvbiBkaWZmKGV4cGVjdGVkKSB7XG5cdGV4cGVjdGVkID0gbm9ybWFsaXplVHlwZSh0aGlzLCBleHBlY3RlZCk7XG5cdHRyeSB7XG5cdFx0dmFyIGFjdHVhbFZhbHVlID0gdGhpcy52YWx1ZSgpO1xuXHRcdHZhciBleHBlY3RlZFZhbHVlID0gZXhwZWN0ZWQudmFsdWUoKTtcblxuXHRcdGlmIChhY3R1YWxWYWx1ZS5lcXVhbHMoZXhwZWN0ZWRWYWx1ZSkpIHJldHVybiBcIlwiO1xuXG5cdFx0dmFyIGRpZmZlcmVuY2UgPSBhY3R1YWxWYWx1ZS5kaWZmKGV4cGVjdGVkVmFsdWUpO1xuXHRcdHZhciBleHBlY3RlZERlc2MgPSBleHBlY3RlZFZhbHVlLnRvU3RyaW5nKCk7XG5cdFx0aWYgKGV4cGVjdGVkIGluc3RhbmNlb2YgTWUpIGV4cGVjdGVkRGVzYyArPSBcIiAoXCIgKyBleHBlY3RlZCArIFwiKVwiO1xuXG5cdFx0cmV0dXJuIHRoaXMgKyBcIiB3YXMgXCIgKyBkaWZmZXJlbmNlICsgXCIgdGhhbiBleHBlY3RlZC5cXG5cIiArXG5cdFx0XHRcIiAgRXhwZWN0ZWQ6IFwiICsgZXhwZWN0ZWREZXNjICsgXCJcXG5cIiArXG5cdFx0XHRcIiAgQnV0IHdhczogIFwiICsgYWN0dWFsVmFsdWU7XG5cdH1cblx0Y2F0Y2ggKGVycikge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbid0IGNvbXBhcmUgXCIgKyB0aGlzICsgXCIgdG8gXCIgKyBleHBlY3RlZCArIFwiOiBcIiArIGVyci5tZXNzYWdlKTtcblx0fVxufTtcblxuTWUucHJvdG90eXBlLmNvbnZlcnQgPSBmdW5jdGlvbiBjb252ZXJ0KGFyZywgdHlwZSkge1xuXHQvLyBUaGlzIG1ldGhvZCBpcyBtZWFudCB0byBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXMuIEl0IHNob3VsZCByZXR1cm4gJ3VuZGVmaW5lZCcgd2hlbiBhbiBhcmd1bWVudFxuXHQvLyBjYW4ndCBiZSBjb252ZXJ0ZWQuIEluIHRoaXMgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiwgbm8gYXJndW1lbnRzIGNhbiBiZSBjb252ZXJ0ZWQsIHNvIHdlIGFsd2F5c1xuXHQvLyByZXR1cm4gJ3VuZGVmaW5lZCcuXG5cdHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5NZS5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzKHRoYXQpIHtcblx0Ly8gRGVzY3JpcHRvcnMgYXJlbid0IHZhbHVlIG9iamVjdHMuIFRoZXkncmUgbmV2ZXIgZXF1YWwgdG8gYW55dGhpbmcuIEJ1dCBzb21ldGltZXNcblx0Ly8gdGhleSdyZSB1c2VkIGluIHRoZSBzYW1lIHBsYWNlcyB2YWx1ZSBvYmplY3RzIGFyZSB1c2VkLCBhbmQgdGhpcyBtZXRob2QgZ2V0cyBjYWxsZWQuXG5cdHJldHVybiBmYWxzZTtcbn07XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVR5cGUoc2VsZiwgZXhwZWN0ZWQpIHtcblx0dmFyIGV4cGVjdGVkVHlwZSA9IHR5cGVvZiBleHBlY3RlZDtcblx0aWYgKGV4cGVjdGVkID09PSBudWxsKSBleHBlY3RlZFR5cGUgPSBcIm51bGxcIjtcblxuXHRpZiAoZXhwZWN0ZWRUeXBlID09PSBcIm9iamVjdFwiICYmIChleHBlY3RlZCBpbnN0YW5jZW9mIE1lIHx8IGV4cGVjdGVkIGluc3RhbmNlb2YgVmFsdWUpKSByZXR1cm4gZXhwZWN0ZWQ7XG5cblx0aWYgKGV4cGVjdGVkID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBjb21wYXJlIFwiICsgc2VsZiArIFwiIHRvIFwiICsgZXhwZWN0ZWQgKyBcIi4gRGlkIHlvdSBtaXNzcGVsbCBhIHByb3BlcnR5IG5hbWU/XCIpO1xuXHR9XG5cdGVsc2UgaWYgKGV4cGVjdGVkVHlwZSA9PT0gXCJvYmplY3RcIikge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbid0IGNvbXBhcmUgXCIgKyBzZWxmICsgXCIgdG8gXCIgKyBvb3AuaW5zdGFuY2VOYW1lKGV4cGVjdGVkKSArIFwiIGluc3RhbmNlcy5cIik7XG5cdH1cblx0ZWxzZSB7XG5cdFx0ZXhwZWN0ZWQgPSBzZWxmLmNvbnZlcnQoZXhwZWN0ZWQsIGV4cGVjdGVkVHlwZSk7XG5cdFx0aWYgKGV4cGVjdGVkID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGNvbXBhcmUgXCIgKyBzZWxmICsgXCIgdG8gXCIgKyBleHBlY3RlZFR5cGUgKyBcIi5cIik7XG5cdH1cblxuXHRyZXR1cm4gZXhwZWN0ZWQ7XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlbnN1cmUgPSByZXF1aXJlKFwiLi4vdXRpbC9lbnN1cmUuanNcIik7XG52YXIgUG9zaXRpb24gPSByZXF1aXJlKFwiLi4vdmFsdWVzL3Bvc2l0aW9uLmpzXCIpO1xudmFyIFJlbGF0aXZlUG9zaXRpb24gPSByZXF1aXJlKFwiLi9yZWxhdGl2ZV9wb3NpdGlvbi5qc1wiKTtcbnZhciBQb3NpdGlvbkRlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi9wb3NpdGlvbl9kZXNjcmlwdG9yLmpzXCIpO1xudmFyIEVsZW1lbnRTaXplID0gcmVxdWlyZShcIi4vZWxlbWVudF9zaXplLmpzXCIpO1xuXG52YXIgVE9QID0gXCJ0b3BcIjtcbnZhciBSSUdIVCA9IFwicmlnaHRcIjtcbnZhciBCT1RUT00gPSBcImJvdHRvbVwiO1xudmFyIExFRlQgPSBcImxlZnRcIjtcblxudmFyIE1lID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBFbGVtZW50RWRnZShlbGVtZW50LCBwb3NpdGlvbikge1xuXHR2YXIgUUVsZW1lbnQgPSByZXF1aXJlKFwiLi4vcV9lbGVtZW50LmpzXCIpOyAgICAgIC8vIGJyZWFrIGNpcmN1bGFyIGRlcGVuZGVuY3lcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgUUVsZW1lbnQsIFN0cmluZyBdKTtcblxuXHRpZiAocG9zaXRpb24gPT09IExFRlQgfHwgcG9zaXRpb24gPT09IFJJR0hUKSBQb3NpdGlvbkRlc2NyaXB0b3IueCh0aGlzKTtcblx0ZWxzZSBpZiAocG9zaXRpb24gPT09IFRPUCB8fCBwb3NpdGlvbiA9PT0gQk9UVE9NKSBQb3NpdGlvbkRlc2NyaXB0b3IueSh0aGlzKTtcblx0ZWxzZSBlbnN1cmUudW5yZWFjaGFibGUoXCJVbmtub3duIHBvc2l0aW9uOiBcIiArIHBvc2l0aW9uKTtcblxuXHR0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcblx0dGhpcy5fcG9zaXRpb24gPSBwb3NpdGlvbjtcbn07XG5Qb3NpdGlvbkRlc2NyaXB0b3IuZXh0ZW5kKE1lKTtcblxuTWUudG9wID0gZmFjdG9yeUZuKFRPUCk7XG5NZS5yaWdodCA9IGZhY3RvcnlGbihSSUdIVCk7XG5NZS5ib3R0b20gPSBmYWN0b3J5Rm4oQk9UVE9NKTtcbk1lLmxlZnQgPSBmYWN0b3J5Rm4oTEVGVCk7XG5cbk1lLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uIHZhbHVlKCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXG5cdHZhciBlZGdlID0gdGhpcy5fZWxlbWVudC5nZXRSYXdQb3NpdGlvbigpW3RoaXMuX3Bvc2l0aW9uXTtcblx0dmFyIHNjcm9sbCA9IHRoaXMuX2VsZW1lbnQuZnJhbWUuZ2V0UmF3U2Nyb2xsUG9zaXRpb24oKTtcblxuXHRpZiAodGhpcy5fcG9zaXRpb24gPT09IFJJR0hUIHx8IHRoaXMuX3Bvc2l0aW9uID09PSBMRUZUKSByZXR1cm4gUG9zaXRpb24ueChlZGdlICsgc2Nyb2xsLngpO1xuXHRlbHNlIHJldHVybiBQb3NpdGlvbi55KGVkZ2UgKyBzY3JvbGwueSk7XG59O1xuXG5NZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9uICsgXCIgZWRnZSBvZiBcIiArIHRoaXMuX2VsZW1lbnQ7XG59O1xuXG5mdW5jdGlvbiBmYWN0b3J5Rm4ocG9zaXRpb24pIHtcblx0cmV0dXJuIGZ1bmN0aW9uIGZhY3RvcnkoZWxlbWVudCkge1xuXHRcdHJldHVybiBuZXcgTWUoZWxlbWVudCwgcG9zaXRpb24pO1xuXHR9O1xufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE0IFRpdGFuaXVtIEkuVC4gTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBGb3IgbGljZW5zZSwgc2VlIFwiUkVBRE1FXCIgb3IgXCJMSUNFTlNFXCIgZmlsZS5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgZW5zdXJlID0gcmVxdWlyZShcIi4uL3V0aWwvZW5zdXJlLmpzXCIpO1xudmFyIFNpemVEZXNjcmlwdG9yID0gcmVxdWlyZShcIi4vc2l6ZV9kZXNjcmlwdG9yLmpzXCIpO1xudmFyIFNpemUgPSByZXF1aXJlKFwiLi4vdmFsdWVzL3NpemUuanNcIik7XG52YXIgUmVsYXRpdmVTaXplID0gcmVxdWlyZShcIi4vcmVsYXRpdmVfc2l6ZS5qc1wiKTtcbnZhciBTaXplTXVsdGlwbGUgPSByZXF1aXJlKFwiLi9zaXplX211bHRpcGxlLmpzXCIpO1xuXG52YXIgWF9ESU1FTlNJT04gPSBcIndpZHRoXCI7XG52YXIgWV9ESU1FTlNJT04gPSBcImhlaWdodFwiO1xuXG52YXIgTWUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEVsZW1lbnRTaXplKGRpbWVuc2lvbiwgZWxlbWVudCkge1xuXHR2YXIgUUVsZW1lbnQgPSByZXF1aXJlKFwiLi4vcV9lbGVtZW50LmpzXCIpOyAgICAvLyBicmVhayBjaXJjdWxhciBkZXBlbmRlbmN5XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIFN0cmluZywgUUVsZW1lbnQgXSk7XG5cdGVuc3VyZS50aGF0KGRpbWVuc2lvbiA9PT0gWF9ESU1FTlNJT04gfHwgZGltZW5zaW9uID09PSBZX0RJTUVOU0lPTiwgXCJVbnJlY29nbml6ZWQgZGltZW5zaW9uOiBcIiArIGRpbWVuc2lvbik7XG5cblx0dGhpcy5fZGltZW5zaW9uID0gZGltZW5zaW9uO1xuXHR0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbn07XG5TaXplRGVzY3JpcHRvci5leHRlbmQoTWUpO1xuXG5NZS54ID0gZmFjdG9yeUZuKFhfRElNRU5TSU9OKTtcbk1lLnkgPSBmYWN0b3J5Rm4oWV9ESU1FTlNJT04pO1xuXG5NZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSgpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHR2YXIgcG9zaXRpb24gPSB0aGlzLl9lbGVtZW50LmdldFJhd1Bvc2l0aW9uKCk7XG5cdHJldHVybiBTaXplLmNyZWF0ZShwb3NpdGlvblt0aGlzLl9kaW1lbnNpb25dKTtcbn07XG5cbk1lLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXG5cdHJldHVybiB0aGlzLl9kaW1lbnNpb24gKyBcIiBvZiBcIiArIHRoaXMuX2VsZW1lbnQ7XG59O1xuXG5mdW5jdGlvbiBmYWN0b3J5Rm4oZGltZW5zaW9uKSB7XG5cdHJldHVybiBmdW5jdGlvbiBmYWN0b3J5KGVsZW1lbnQpIHtcblx0XHRyZXR1cm4gbmV3IE1lKGRpbWVuc2lvbiwgZWxlbWVudCk7XG5cdH07XG59IiwiLy8gQ29weXJpZ2h0IChjKSAyMDE0IFRpdGFuaXVtIEkuVC4gTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBGb3IgbGljZW5zZSwgc2VlIFwiUkVBRE1FXCIgb3IgXCJMSUNFTlNFXCIgZmlsZS5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgZW5zdXJlID0gcmVxdWlyZShcIi4uL3V0aWwvZW5zdXJlLmpzXCIpO1xudmFyIFBvc2l0aW9uRGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuL3Bvc2l0aW9uX2Rlc2NyaXB0b3IuanNcIik7XG52YXIgUG9zaXRpb24gPSByZXF1aXJlKFwiLi4vdmFsdWVzL3Bvc2l0aW9uLmpzXCIpO1xuXG52YXIgVE9QID0gXCJ0b3BcIjtcbnZhciBSSUdIVCA9IFwicmlnaHRcIjtcbnZhciBCT1RUT00gPSBcImJvdHRvbVwiO1xudmFyIExFRlQgPSBcImxlZnRcIjtcblxudmFyIE1lID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBQYWdlRWRnZShlZGdlLCBmcmFtZSkge1xuXHR2YXIgUUZyYW1lID0gcmVxdWlyZShcIi4uL3FfZnJhbWUuanNcIik7ICAgIC8vIGJyZWFrIGNpcmN1bGFyIGRlcGVuZGVuY3lcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgU3RyaW5nLCBRRnJhbWUgXSk7XG5cblx0aWYgKGVkZ2UgPT09IExFRlQgfHwgZWRnZSA9PT0gUklHSFQpIFBvc2l0aW9uRGVzY3JpcHRvci54KHRoaXMpO1xuXHRlbHNlIGlmIChlZGdlID09PSBUT1AgfHwgZWRnZSA9PT0gQk9UVE9NKSBQb3NpdGlvbkRlc2NyaXB0b3IueSh0aGlzKTtcblx0ZWxzZSBlbnN1cmUudW5yZWFjaGFibGUoXCJVbmtub3duIGVkZ2U6IFwiICsgZWRnZSk7XG5cblx0dGhpcy5fZWRnZSA9IGVkZ2U7XG5cdHRoaXMuX2ZyYW1lID0gZnJhbWU7XG59O1xuUG9zaXRpb25EZXNjcmlwdG9yLmV4dGVuZChNZSk7XG5cbk1lLnRvcCA9IGZhY3RvcnlGbihUT1ApO1xuTWUucmlnaHQgPSBmYWN0b3J5Rm4oUklHSFQpO1xuTWUuYm90dG9tID0gZmFjdG9yeUZuKEJPVFRPTSk7XG5NZS5sZWZ0ID0gZmFjdG9yeUZuKExFRlQpO1xuXG5NZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSgpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHR2YXIgeCA9IFBvc2l0aW9uLngoMCk7XG5cdHZhciB5ID0gUG9zaXRpb24ueSgwKTtcblxuXHRzd2l0Y2godGhpcy5fZWRnZSkge1xuXHRcdGNhc2UgVE9QOiByZXR1cm4geTtcblx0XHRjYXNlIFJJR0hUOiByZXR1cm4geC5wbHVzKHRoaXMuX2ZyYW1lLnBhZ2UoKS53aWR0aC52YWx1ZSgpKTtcblx0XHRjYXNlIEJPVFRPTTogcmV0dXJuIHkucGx1cyh0aGlzLl9mcmFtZS5wYWdlKCkuaGVpZ2h0LnZhbHVlKCkpO1xuXHRcdGNhc2UgTEVGVDogcmV0dXJuIHg7XG5cblx0XHRkZWZhdWx0OiBlbnN1cmUudW5yZWFjaGFibGUoKTtcblx0fVxufTtcblxuTWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0c3dpdGNoKHRoaXMuX2VkZ2UpIHtcblx0XHRjYXNlIFRPUDogcmV0dXJuIFwidG9wIG9mIHBhZ2VcIjtcblx0XHRjYXNlIFJJR0hUOiByZXR1cm4gXCJyaWdodCBzaWRlIG9mIHBhZ2VcIjtcblx0XHRjYXNlIEJPVFRPTTogcmV0dXJuIFwiYm90dG9tIG9mIHBhZ2VcIjtcblx0XHRjYXNlIExFRlQ6IHJldHVybiBcImxlZnQgc2lkZSBvZiBwYWdlXCI7XG5cblx0XHRkZWZhdWx0OiBlbnN1cmUudW5yZWFjaGFibGUoKTtcblx0fVxufTtcblxuZnVuY3Rpb24gZmFjdG9yeUZuKGVkZ2UpIHtcblx0cmV0dXJuIGZ1bmN0aW9uIGZhY3RvcnkoZnJhbWUpIHtcblx0XHRyZXR1cm4gbmV3IE1lKGVkZ2UsIGZyYW1lKTtcblx0fTtcbn0iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlbnN1cmUgPSByZXF1aXJlKFwiLi4vdXRpbC9lbnN1cmUuanNcIik7XG52YXIgU2l6ZURlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi9zaXplX2Rlc2NyaXB0b3IuanNcIik7XG52YXIgU2l6ZSA9IHJlcXVpcmUoXCIuLi92YWx1ZXMvc2l6ZS5qc1wiKTtcblxudmFyIFhfRElNRU5TSU9OID0gXCJ3aWR0aFwiO1xudmFyIFlfRElNRU5TSU9OID0gXCJoZWlnaHRcIjtcblxudmFyIE1lID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBQYWdlU2l6ZShkaW1lbnNpb24sIGZyYW1lKSB7XG5cdHZhciBRRnJhbWUgPSByZXF1aXJlKFwiLi4vcV9mcmFtZS5qc1wiKTsgICAgLy8gYnJlYWsgY2lyY3VsYXIgZGVwZW5kZW5jeVxuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBTdHJpbmcsIFFGcmFtZSBdKTtcblx0ZW5zdXJlLnRoYXQoZGltZW5zaW9uID09PSBYX0RJTUVOU0lPTiB8fCBkaW1lbnNpb24gPT09IFlfRElNRU5TSU9OLCBcIlVucmVjb2duaXplZCBkaW1lbnNpb246IFwiICsgZGltZW5zaW9uKTtcblxuXHR0aGlzLl9kaW1lbnNpb24gPSBkaW1lbnNpb247XG5cdHRoaXMuX2ZyYW1lID0gZnJhbWU7XG59O1xuU2l6ZURlc2NyaXB0b3IuZXh0ZW5kKE1lKTtcblxuTWUueCA9IGZhY3RvcnlGbihYX0RJTUVOU0lPTik7XG5NZS55ID0gZmFjdG9yeUZuKFlfRElNRU5TSU9OKTtcblxuTWUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24oKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0Ly8gVVNFRlVMIFJFQURJTkc6IGh0dHA6Ly93d3cucXVpcmtzbW9kZS5vcmcvbW9iaWxlL3ZpZXdwb3J0cy5odG1sXG5cdC8vIGFuZCBodHRwOi8vd3d3LnF1aXJrc21vZGUub3JnL21vYmlsZS92aWV3cG9ydHMyLmh0bWxcblxuXHQvLyBBUEkgU0VNQU5USUNTLlxuXHQvLyBSZWYgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0NTU19PYmplY3RfTW9kZWwvRGV0ZXJtaW5pbmdfdGhlX2RpbWVuc2lvbnNfb2ZfZWxlbWVudHNcblx0Ly8gICAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg6IHN1bSBvZiBib3VuZGluZyBib3hlcyBvZiBlbGVtZW50ICh0aGUgZGlzcGxheWVkIHdpZHRoIG9mIHRoZSBlbGVtZW50LFxuXHQvLyAgICAgIGluY2x1ZGluZyBwYWRkaW5nIGFuZCBib3JkZXIpLiBGcmFjdGlvbmFsLiBBcHBsaWVzIHRyYW5zZm9ybWF0aW9ucy5cblx0Ly8gICAgY2xpZW50V2lkdGg6IHZpc2libGUgd2lkdGggb2YgZWxlbWVudCBpbmNsdWRpbmcgcGFkZGluZyAoYnV0IG5vdCBib3JkZXIpLiBFWENFUFQgb24gcm9vdCBlbGVtZW50IChodG1sKSwgd2hlcmVcblx0Ly8gICAgICBpdCBpcyB0aGUgd2lkdGggb2YgdGhlIHZpZXdwb3J0LiBSb3VuZHMgdG8gYW4gaW50ZWdlci4gRG9lc24ndCBhcHBseSB0cmFuc2Zvcm1hdGlvbnMuXG5cdC8vICAgIG9mZnNldFdpZHRoOiB2aXNpYmxlIHdpZHRoIG9mIGVsZW1lbnQgaW5jbHVkaW5nIHBhZGRpbmcsIGJvcmRlciwgYW5kIHNjcm9sbGJhcnMgKGlmIGFueSkuIFJvdW5kcyB0byBhbiBpbnRlZ2VyLlxuXHQvLyAgICAgIERvZXNuJ3QgYXBwbHkgdHJhbnNmb3JtYXRpb25zLlxuXHQvLyAgICBzY3JvbGxXaWR0aDogZW50aXJlIHdpZHRoIG9mIGVsZW1lbnQsIGluY2x1ZGluZyBhbnkgcGFydCB0aGF0J3Mgbm90IHZpc2libGUgZHVlIHRvIHNjcm9sbGJhcnMuIFJvdW5kcyB0b1xuXHQvLyAgICAgIGFuIGludGVnZXIuIERvZXNuJ3QgYXBwbHkgdHJhbnNmb3JtYXRpb25zLiBOb3QgY2xlYXIgaWYgaXQgaW5jbHVkZXMgc2Nyb2xsYmFycywgYnV0IEkgdGhpbmsgbm90LiBBbHNvXG5cdC8vICAgICAgbm90IGNsZWFyIGlmIGl0IGluY2x1ZGVzIGJvcmRlcnMgb3IgcGFkZGluZy4gKEJ1dCBmcm9tIHRlc3RzLCBhcHBhcmVudGx5IG5vdCBib3JkZXJzLiBFeGNlcHQgb24gcm9vdFxuXHQvLyAgICAgIGVsZW1lbnQgYW5kIGJvZHkgZWxlbWVudCwgd2hpY2ggaGF2ZSBzcGVjaWFsIHJlc3VsdHMgdGhhdCB2YXJ5IGJ5IGJyb3dzZXIuKVxuXG5cdC8vIFRFU1QgUkVTVUxUUzogV0lEVEhcblx0Ly8gICDinJQgPSBjb3JyZWN0IGFuc3dlclxuXHQvLyAgIOKcmCA9IGluY29ycmVjdCBhbnN3ZXIgYW5kIGRpdmVyZ2VzIGZyb20gc3BlY1xuXHQvLyAgIH4gPSBpbmNvcnJlY3QgYW5zd2VyLCBidXQgbWF0Y2hlcyBzcGVjXG5cdC8vIEJST1dTRVJTIFRFU1RFRDogU2FmYXJpIDYuMi4wIChNYWMgT1MgWCAxMC44LjUpOyBNb2JpbGUgU2FmYXJpIDcuMC4wIChpT1MgNy4xKTsgRmlyZWZveCAzMi4wLjAgKE1hYyBPUyBYIDEwLjgpO1xuXHQvLyAgICBGaXJlZm94IDMzLjAuMCAoV2luZG93cyA3KTsgQ2hyb21lIDM4LjAuMjEyNSAoTWFjIE9TIFggMTAuOC41KTsgQ2hyb21lIDM4LjAuMjEyNSAoV2luZG93cyA3KTsgSUUgOCwgOSwgMTAsIDExXG5cblx0Ly8gaHRtbCB3aWR0aCBzdHlsZSBzbWFsbGVyIHRoYW4gdmlld3BvcnQgd2lkdGg7IGJvZHkgd2lkdGggc3R5bGUgc21hbGxlciB0aGFuIGh0bWwgd2lkdGggc3R5bGVcblx0Ly8gIE5PVEU6IFRoZXNlIHRlc3RzIHdlcmUgY29uZHVjdGVkIHdoZW4gY29ycmVjdCByZXN1bHQgd2FzIHdpZHRoIG9mIGJvcmRlci4gVGhhdCBoYXMgYmVlbiBjaGFuZ2VkXG5cdC8vICB0byBcIndpZHRoIG9mIHZpZXdwb3J0LlwiXG5cdC8vICAgIGh0bWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcblx0Ly8gICAgICDinJggSUUgOCwgOSwgMTA6IHdpZHRoIG9mIHZpZXdwb3J0XG5cdC8vICAgICAg4pyUIFNhZmFyaSwgTW9iaWxlIFNhZmFyaSwgQ2hyb21lLCBGaXJlZm94LCBJRSAxMTogd2lkdGggb2YgaHRtbCwgaW5jbHVkaW5nIGJvcmRlclxuXHQvLyAgICBodG1sLmNsaWVudFdpZHRoXG5cdC8vICAgICAgfiBTYWZhcmksIE1vYmlsZSBTYWZhcmksIENocm9tZSwgRmlyZWZveCwgSUUgOCwgOSwgMTAsIDExOiB3aWR0aCBvZiB2aWV3cG9ydFxuXHQvLyAgICBodG1sLm9mZnNldFdpZHRoXG5cdC8vICAgICAg4pyYIElFIDgsIDksIDEwOiB3aWR0aCBvZiB2aWV3cG9ydFxuXHQvLyAgICAgIOKclCBTYWZhcmksIE1vYmlsZSBTYWZhcmksIENocm9tZSwgRmlyZWZveCwgSUUgMTE6IHdpZHRoIG9mIGh0bWwsIGluY2x1ZGluZyBib3JkZXJcblx0Ly8gICAgaHRtbC5zY3JvbGxXaWR0aFxuXHQvLyAgICAgIOKcmCBJRSA4LCA5LCAxMCwgMTEsIEZpcmVmb3g6IHdpZHRoIG9mIHZpZXdwb3J0XG5cdC8vICAgICAgfiBTYWZhcmksIE1vYmlsZSBTYWZhcmksIENocm9tZTogd2lkdGggb2YgaHRtbCwgZXhjbHVkaW5nIGJvcmRlclxuXHQvLyAgICBib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG5cdC8vICAgICAgfiBTYWZhcmksIE1vYmlsZSBTYWZhcmksIENocm9tZSwgRmlyZWZveCwgSUUgOCwgOSwgMTAsIDExOiB3aWR0aCBvZiBib2R5LCBpbmNsdWRpbmcgYm9yZGVyXG5cdC8vICAgIGJvZHkuY2xpZW50V2lkdGhcblx0Ly8gICAgICB+IFNhZmFyaSwgTW9iaWxlIFNhZmFyaSwgQ2hyb21lLCBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTE6IHdpZHRoIG9mIGJvZHksIGV4Y2x1ZGluZyBib3JkZXJcblx0Ly8gICAgYm9keS5vZmZzZXRXaWR0aFxuXHQvLyAgICAgIH4gU2FmYXJpLCBNb2JpbGUgU2FmYXJpLCBDaHJvbWUsIEZpcmVmb3gsIElFIDgsIDksIDEwLCAxMTogd2lkdGggb2YgYm9keSwgaW5jbHVkaW5nIGJvcmRlclxuXHQvLyAgICBib2R5LnNjcm9sbFdpZHRoXG5cdC8vICAgICAg4pyYIFNhZmFyaSwgTW9iaWxlIFNhZmFyaSwgQ2hyb21lOiB3aWR0aCBvZiB2aWV3cG9ydFxuXHQvLyAgICAgIH4gRmlyZWZveCwgSUUgOCwgOSwgMTAsIDExOiB3aWR0aCBvZiBib2R5LCBleGNsdWRpbmcgYm9yZGVyXG5cblx0Ly8gZWxlbWVudCB3aWR0aCBzdHlsZSB3aWRlciB0aGFuIHZpZXdwb3J0OyBib2R5IGFuZCBodG1sIHdpZHRoIHN0eWxlcyBhdCBkZWZhdWx0XG5cdC8vIEJST1dTRVIgQkVIQVZJT1I6IGh0bWwgYW5kIGJvZHkgYm9yZGVyIGV4dGVuZCB0byB3aWR0aCBvZiB2aWV3cG9ydCBhbmQgbm90IGJleW9uZCAoZXhjZXB0IG9uIE1vYmlsZSBTYWZhcmkpXG5cdC8vIENvcnJlY3QgcmVzdWx0IGlzIGVsZW1lbnQgd2lkdGggKyBib2R5IGJvcmRlci1sZWZ0ICsgaHRtbCBib3JkZXItbGVmdCAoZXhjZXB0IG9uIE1vYmlsZSBTYWZhcmkpXG5cdC8vIE1vYmlsZSBTYWZhcmkgdXNlcyBhIGxheW91dCB2aWV3cG9ydCwgc28gaXQncyBleHBlY3RlZCB0byBpbmNsdWRlIGJvZHkgYm9yZGVyLXJpZ2h0IGFuZCBodG1sIGJvcmRlci1yaWdodC5cblx0Ly8gICAgaHRtbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuXHQvLyAgICAgIOKclCBNb2JpbGUgU2FmYXJpOiBlbGVtZW50IHdpZHRoICsgYm9keSBib3JkZXIgKyBodG1sIGJvcmRlclxuXHQvLyAgICAgIH4gU2FmYXJpLCBDaHJvbWUsIEZpcmVmb3gsIElFIDgsIDksIDEwLCAxMTogdmlld3BvcnQgd2lkdGhcblx0Ly8gICAgaHRtbC5jbGllbnRXaWR0aFxuXHQvLyAgICAgIOKclCBNb2JpbGUgU2FmYXJpOiBlbGVtZW50IHdpZHRoICsgYm9keSBib3JkZXIgKyBodG1sIGJvcmRlclxuXHQvLyAgICAgIH4gU2FmYXJpLCBDaHJvbWUsIEZpcmVmb3gsIElFIDgsIDksIDEwLCAxMTogdmlld3BvcnQgd2lkdGhcblx0Ly8gICAgaHRtbC5vZmZzZXRXaWR0aFxuXHQvLyAgICAgIOKclCBNb2JpbGUgU2FmYXJpOiBlbGVtZW50IHdpZHRoICsgYm9keSBib3JkZXIgKyBodG1sIGJvcmRlclxuXHQvLyAgICAgIH4gU2FmYXJpLCBDaHJvbWUsIEZpcmVmb3gsIElFIDgsIDksIDEwLCAxMTogdmlld3BvcnQgd2lkdGhcblx0Ly8gICAgaHRtbC5zY3JvbGxXaWR0aFxuXHQvLyAgICAgIOKclCBNb2JpbGUgU2FmYXJpOiBlbGVtZW50IHdpZHRoICsgYm9keSBib3JkZXIgKyBodG1sIGJvcmRlclxuXHQvLyAgICAgIOKcmCBTYWZhcmksIENocm9tZTogZWxlbWVudCB3aWR0aCArIGJvZHkgYm9yZGVyLWxlZnQgKEJVVCBOT1QgaHRtbCBib3JkZXItbGVmdClcblx0Ly8gICAgICDinJQgRmlyZWZveCwgSUUgOCwgOSwgMTAsIDExOiBlbGVtZW50IHdpZHRoICsgYm9keSBib3JkZXItbGVmdCArIGh0bWwgYm9yZGVyLWxlZnRcblx0Ly8gICAgYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuXHQvLyAgICAgIH4gTW9iaWxlIFNhZmFyaTogZWxlbWVudCB3aWR0aCArIGJvZHkgYm9yZGVyXG5cdC8vICAgICAgfiBTYWZhcmksIENocm9tZSwgRmlyZWZveCwgSUUgOCwgOSwgMTAsIDExOiB2aWV3cG9ydCB3aWR0aCAtIGh0bWwgYm9yZGVyXG5cdC8vICAgIGJvZHkuY2xpZW50V2lkdGhcblx0Ly8gICAgICB+IE1vYmlsZSBTYWZhcmk6IGVsZW1lbnQgd2lkdGhcblx0Ly8gICAgICB+IFNhZmFyaSwgQ2hyb21lLCBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTE6IHZpZXdwb3J0IHdpZHRoIC0gaHRtbCBib3JkZXIgLSBib2R5IGJvcmRlclxuXHQvLyAgICBib2R5Lm9mZnNldFdpZHRoXG5cdC8vICAgICAgfiBNb2JpbGUgU2FmYXJpOiBlbGVtZW50IHdpZHRoICsgYm9keSBib3JkZXJcblx0Ly8gICAgICB+IFNhZmFyaSwgQ2hyb21lLCBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTE6IHZpZXdwb3J0IHdpZHRoIC0gaHRtbCBib3JkZXJcblx0Ly8gICAgYm9keS5zY3JvbGxXaWR0aFxuXHQvLyAgICAgIOKclCBNb2JpbGUgU2FmYXJpOiBlbGVtZW50IHdpZHRoICsgYm9keSBib3JkZXIgKyBodG1sIGJvcmRlclxuXHQvLyAgICAgIOKclCBTYWZhcmksIENocm9tZTogZWxlbWVudCB3aWR0aCArIGJvZHkgYm9yZGVyLWxlZnQgKyBodG1sIGJvcmRlci1sZWZ0IChtYXRjaGVzIGFjdHVhbCBicm93c2VyKVxuXHQvLyAgICAgIH4gRmlyZWZveCwgSUUgOCwgOSwgMTAsIDExOiBlbGVtZW50IHdpZHRoXG5cblx0Ly8gVEVTVCBSRVNVTFRTOiBIRUlHSFRcblx0Ly8gICDinJQgPSBjb3JyZWN0IGFuc3dlclxuXHQvLyAgIOKcmCA9IGluY29ycmVjdCBhbnN3ZXIgYW5kIGRpdmVyZ2VzIGZyb20gc3BlY1xuXHQvLyAgIH4gPSBpbmNvcnJlY3QgYW5zd2VyLCBidXQgbWF0Y2hlcyBzcGVjXG5cblx0Ly8gaHRtbCBoZWlnaHQgc3R5bGUgc21hbGxlciB0aGFuIHZpZXdwb3J0IGhlaWdodDsgYm9keSBoZWlnaHQgc3R5bGUgc21hbGxlciB0aGFuIGh0bWwgaGVpZ2h0IHN0eWxlXG5cdC8vICBOT1RFOiBUaGVzZSB0ZXN0cyB3ZXJlIGNvbmR1Y3RlZCB3aGVuIGNvcnJlY3QgcmVzdWx0IHdhcyBoZWlnaHQgb2Ygdmlld3BvcnQuXG5cdC8vICAgIGh0bWwuY2xpZW50SGVpZ2h0XG5cdC8vICAgICAg4pyUIFNhZmFyaSwgTW9iaWxlIFNhZmFyaSwgQ2hyb21lLCBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTE6IGhlaWdodCBvZiB2aWV3cG9ydFxuXG5cdC8vIGVsZW1lbnQgaGVpZ2h0IHN0eWxlIHRhbGxlciB0aGFuIHZpZXdwb3J0OyBib2R5IGFuZCBodG1sIHdpZHRoIHN0eWxlcyBhdCBkZWZhdWx0XG5cdC8vIEJST1dTRVIgQkVIQVZJT1I6IGh0bWwgYW5kIGJvZHkgYm9yZGVyIGVuY2xvc2UgZW50aXJlIGVsZW1lbnRcblx0Ly8gQ29ycmVjdCByZXN1bHQgaXMgZWxlbWVudCB3aWR0aCArIGJvZHkgYm9yZGVyLXRvcCArIGh0bWwgYm9yZGVyLXRvcCArIGJvZHkgYm9yZGVyLWJvdHRvbSArIGh0bWwgYm9yZGVyLWJvdHRvbVxuXHQvLyAgICBodG1sLmNsaWVudEhlaWdodFxuXHQvLyAgICAgIOKclCBNb2JpbGUgU2FmYXJpOiBlbGVtZW50IGhlaWdodCArIGFsbCBib3JkZXJzXG5cdC8vICAgICAgfiBTYWZhcmksIENocm9tZSwgRmlyZWZveCwgSUUgOCwgOSwgMTAsIDExOiBoZWlnaHQgb2Ygdmlld3BvcnRcblx0Ly8gICAgaHRtbC5zY3JvbGxIZWlnaHRcblx0Ly8gICAgICDinJQgRmlyZWZveCwgSUUgOCwgOSwgMTAsIDExOiBlbGVtZW50IGhlaWdodCArIGFsbCBib3JkZXJzXG5cdC8vICAgICAg4pyYIFNhZmFyaSwgTW9iaWxlIFNhZmFyaSwgQ2hyb21lOiBlbGVtZW50IGhlaWdodCArIGh0bWwgYm9yZGVyLWJvdHRvbVxuXHQvLyAgICBib2R5LnNjcm9sbEhlaWdodFxuXHQvLyAgICAgIOKclCBTYWZhcmksIE1vYmlsZSBTYWZhcmksIENocm9tZTogZWxlbWVudCBoZWlnaHQgKyBhbGwgYm9yZGVyc1xuXHQvLyAgICAgIH4gRmlyZWZveCwgSUUgOCwgOSwgMTAsIDExOiBlbGVtZW50IGhlaWdodCAoYm9keSBoZWlnaHQgLSBib2R5IGJvcmRlcilcblxuXHR2YXIgZG9jdW1lbnQgPSB0aGlzLl9mcmFtZS50b0RvbUVsZW1lbnQoKS5jb250ZW50RG9jdW1lbnQ7XG5cdHZhciBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHR2YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5cblx0Ly8gQkVTVCBXSURUSCBBTlNXRVIgU08gRkFSIChBU1NVTUlORyBWSUVXUE9SVCBJUyBNSU5JTVVNIEFOU1dFUik6XG5cdHZhciB3aWR0aCA9IE1hdGgubWF4KGJvZHkuc2Nyb2xsV2lkdGgsIGh0bWwuc2Nyb2xsV2lkdGgpO1xuXG5cdC8vIEJFU1QgSEVJR0hUIEFOU1dFUiBTTyBGQVIgKEFTU1VNSU5HIFZJRVdQT1JUIElTIE1JTklNVU0gQU5TV0VSKTpcblx0dmFyIGhlaWdodCA9IE1hdGgubWF4KGJvZHkuc2Nyb2xsSGVpZ2h0LCBodG1sLnNjcm9sbEhlaWdodCk7XG5cblx0cmV0dXJuIFNpemUuY3JlYXRlKHRoaXMuX2RpbWVuc2lvbiA9PT0gWF9ESU1FTlNJT04gPyB3aWR0aCA6IGhlaWdodCk7XG59O1xuXG5NZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHRyZXR1cm4gdGhpcy5fZGltZW5zaW9uICsgXCIgb2YgcGFnZVwiO1xufTtcblxuZnVuY3Rpb24gZmFjdG9yeUZuKGRpbWVuc2lvbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gZmFjdG9yeShmcmFtZSkge1xuXHRcdHJldHVybiBuZXcgTWUoZGltZW5zaW9uLCBmcmFtZSk7XG5cdH07XG59IiwiLy8gQ29weXJpZ2h0IChjKSAyMDE0IFRpdGFuaXVtIEkuVC4gTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBGb3IgbGljZW5zZSwgc2VlIFwiUkVBRE1FXCIgb3IgXCJMSUNFTlNFXCIgZmlsZS5cbi8qanNoaW50IG5ld2NhcDpmYWxzZSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlbnN1cmUgPSByZXF1aXJlKFwiLi4vdXRpbC9lbnN1cmUuanNcIik7XG52YXIgb29wID0gcmVxdWlyZShcIi4uL3V0aWwvb29wLmpzXCIpO1xudmFyIERlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi9kZXNjcmlwdG9yLmpzXCIpO1xudmFyIFBvc2l0aW9uID0gcmVxdWlyZShcIi4uL3ZhbHVlcy9wb3NpdGlvbi5qc1wiKTtcblxuZnVuY3Rpb24gUmVsYXRpdmVQb3NpdGlvbigpIHtcblx0cmV0dXJuIHJlcXVpcmUoXCIuL3JlbGF0aXZlX3Bvc2l0aW9uLmpzXCIpOyAgIFx0Ly8gYnJlYWsgY2lyY3VsYXIgZGVwZW5kZW5jeVxufVxuXG52YXIgWF9ESU1FTlNJT04gPSBcInhcIjtcbnZhciBZX0RJTUVOU0lPTiA9IFwieVwiO1xuXG52YXIgTWUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFBvc2l0aW9uRGVzY3JpcHRvcihkaW1lbnNpb24pIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgU3RyaW5nIF0pO1xuXHRlbnN1cmUudW5yZWFjaGFibGUoXCJQb3NpdGlvbkRlc2NyaXB0b3IgaXMgYWJzdHJhY3QgYW5kIHNob3VsZCBub3QgYmUgY29uc3RydWN0ZWQgZGlyZWN0bHkuXCIpO1xufTtcbkRlc2NyaXB0b3IuZXh0ZW5kKE1lKTtcbk1lLmV4dGVuZCA9IG9vcC5leHRlbmRGbihNZSk7XG5cbk1lLnggPSBmYWN0b3J5Rm4oWF9ESU1FTlNJT04pO1xuTWUueSA9IGZhY3RvcnlGbihZX0RJTUVOU0lPTik7XG5cbk1lLnByb3RvdHlwZS5wbHVzID0gZnVuY3Rpb24gcGx1cyhhbW91bnQpIHtcblx0aWYgKHRoaXMuX3BkYmMuZGltZW5zaW9uID09PSBYX0RJTUVOU0lPTikgcmV0dXJuIFJlbGF0aXZlUG9zaXRpb24oKS5yaWdodCh0aGlzLCBhbW91bnQpO1xuXHRlbHNlIHJldHVybiBSZWxhdGl2ZVBvc2l0aW9uKCkuZG93bih0aGlzLCBhbW91bnQpO1xufTtcblxuTWUucHJvdG90eXBlLm1pbnVzID0gZnVuY3Rpb24gbWludXMoYW1vdW50KSB7XG5cdGlmICh0aGlzLl9wZGJjLmRpbWVuc2lvbiA9PT0gWF9ESU1FTlNJT04pIHJldHVybiBSZWxhdGl2ZVBvc2l0aW9uKCkubGVmdCh0aGlzLCBhbW91bnQpO1xuXHRlbHNlIHJldHVybiBSZWxhdGl2ZVBvc2l0aW9uKCkudXAodGhpcywgYW1vdW50KTtcbn07XG5cbk1lLnByb3RvdHlwZS5jb252ZXJ0ID0gZnVuY3Rpb24gY29udmVydChhcmcsIHR5cGUpIHtcblx0aWYgKHR5cGUgIT09IFwibnVtYmVyXCIpIHJldHVybjtcblxuXHRyZXR1cm4gdGhpcy5fcGRiYy5kaW1lbnNpb24gPT09IFhfRElNRU5TSU9OID8gUG9zaXRpb24ueChhcmcpIDogUG9zaXRpb24ueShhcmcpO1xufTtcblxuZnVuY3Rpb24gZmFjdG9yeUZuKGRpbWVuc2lvbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gZmFjdG9yeShzZWxmKSB7XG5cdFx0Ly8gX3BkYmM6IFwiUG9zaXRpb25EZXNjcmlwdG9yIGJhc2UgY2xhc3MuXCIgQW4gYXR0ZW1wdCB0byBwcmV2ZW50IG5hbWUgY29uZmxpY3RzLlxuXHRcdHNlbGYuX3BkYmMgPSB7IGRpbWVuc2lvbjogZGltZW5zaW9uIH07XG5cdH07XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlbnN1cmUgPSByZXF1aXJlKFwiLi4vdXRpbC9lbnN1cmUuanNcIik7XG52YXIgUG9zaXRpb24gPSByZXF1aXJlKFwiLi4vdmFsdWVzL3Bvc2l0aW9uLmpzXCIpO1xudmFyIERlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi9kZXNjcmlwdG9yLmpzXCIpO1xudmFyIFBvc2l0aW9uRGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuL3Bvc2l0aW9uX2Rlc2NyaXB0b3IuanNcIik7XG52YXIgVmFsdWUgPSByZXF1aXJlKFwiLi4vdmFsdWVzL3ZhbHVlLmpzXCIpO1xudmFyIFNpemUgPSByZXF1aXJlKFwiLi4vdmFsdWVzL3NpemUuanNcIik7XG52YXIgUGl4ZWxzID0gcmVxdWlyZShcIi4uL3ZhbHVlcy9waXhlbHMuanNcIik7XG52YXIgRWxlbWVudFNpemUgPSByZXF1aXJlKFwiLi9lbGVtZW50X3NpemUuanNcIik7XG5cbnZhciBYX0RJTUVOU0lPTiA9IFwieFwiO1xudmFyIFlfRElNRU5TSU9OID0gXCJ5XCI7XG52YXIgUExVUyA9IDE7XG52YXIgTUlOVVMgPSAtMTtcblxudmFyIE1lID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZWxhdGl2ZVBvc2l0aW9uKGRpbWVuc2lvbiwgZGlyZWN0aW9uLCByZWxhdGl2ZVRvLCByZWxhdGl2ZUFtb3VudCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBTdHJpbmcsIE51bWJlciwgRGVzY3JpcHRvciwgW051bWJlciwgRGVzY3JpcHRvciwgVmFsdWVdIF0pO1xuXG5cdGlmIChkaW1lbnNpb24gPT09IFhfRElNRU5TSU9OKSBQb3NpdGlvbkRlc2NyaXB0b3IueCh0aGlzKTtcblx0ZWxzZSBpZiAoZGltZW5zaW9uID09PSBZX0RJTUVOU0lPTikgUG9zaXRpb25EZXNjcmlwdG9yLnkodGhpcyk7XG5cdGVsc2UgZW5zdXJlLnVucmVhY2hhYmxlKFwiVW5rbm93biBkaW1lbnNpb246IFwiICsgZGltZW5zaW9uKTtcblxuXHR0aGlzLl9kaW1lbnNpb24gPSBkaW1lbnNpb247XG5cdHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcblx0dGhpcy5fcmVsYXRpdmVUbyA9IHJlbGF0aXZlVG87XG5cblx0aWYgKHR5cGVvZiByZWxhdGl2ZUFtb3VudCA9PT0gXCJudW1iZXJcIikge1xuXHRcdGlmIChyZWxhdGl2ZUFtb3VudCA8IDApIHRoaXMuX2RpcmVjdGlvbiAqPSAtMTtcblx0XHR0aGlzLl9hbW91bnQgPSBTaXplLmNyZWF0ZShNYXRoLmFicyhyZWxhdGl2ZUFtb3VudCkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHRoaXMuX2Ftb3VudCA9IHJlbGF0aXZlQW1vdW50O1xuXHR9XG59O1xuUG9zaXRpb25EZXNjcmlwdG9yLmV4dGVuZChNZSk7XG5cbk1lLnJpZ2h0ID0gY3JlYXRlRm4oWF9ESU1FTlNJT04sIFBMVVMpO1xuTWUuZG93biA9IGNyZWF0ZUZuKFlfRElNRU5TSU9OLCBQTFVTKTtcbk1lLmxlZnQgPSBjcmVhdGVGbihYX0RJTUVOU0lPTiwgTUlOVVMpO1xuTWUudXAgPSBjcmVhdGVGbihZX0RJTUVOU0lPTiwgTUlOVVMpO1xuXG5mdW5jdGlvbiBjcmVhdGVGbihkaW1lbnNpb24sIGRpcmVjdGlvbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gY3JlYXRlKHJlbGF0aXZlVG8sIHJlbGF0aXZlQW1vdW50KSB7XG5cdFx0cmV0dXJuIG5ldyBNZShkaW1lbnNpb24sIGRpcmVjdGlvbiwgcmVsYXRpdmVUbywgcmVsYXRpdmVBbW91bnQpO1xuXHR9O1xufVxuXG5NZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSgpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHR2YXIgYmFzZVZhbHVlID0gdGhpcy5fcmVsYXRpdmVUby52YWx1ZSgpO1xuXHR2YXIgcmVsYXRpdmVWYWx1ZSA9IHRoaXMuX2Ftb3VudC52YWx1ZSgpO1xuXG5cdGlmICh0aGlzLl9kaXJlY3Rpb24gPT09IFBMVVMpIHJldHVybiBiYXNlVmFsdWUucGx1cyhyZWxhdGl2ZVZhbHVlKTtcblx0ZWxzZSByZXR1cm4gYmFzZVZhbHVlLm1pbnVzKHJlbGF0aXZlVmFsdWUpO1xufTtcblxuTWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0dmFyIGJhc2UgPSB0aGlzLl9yZWxhdGl2ZVRvLnRvU3RyaW5nKCk7XG5cdGlmICh0aGlzLl9hbW91bnQuZXF1YWxzKFNpemUuY3JlYXRlKDApKSkgcmV0dXJuIGJhc2U7XG5cblx0dmFyIHJlbGF0aW9uID0gdGhpcy5fYW1vdW50LnRvU3RyaW5nKCk7XG5cdGlmICh0aGlzLl9kaW1lbnNpb24gPT09IFhfRElNRU5TSU9OKSByZWxhdGlvbiArPSAodGhpcy5fZGlyZWN0aW9uID09PSBQTFVTKSA/IFwiIHRvIHJpZ2h0IG9mIFwiIDogXCIgdG8gbGVmdCBvZiBcIjtcblx0ZWxzZSByZWxhdGlvbiArPSAodGhpcy5fZGlyZWN0aW9uID09PSBQTFVTKSA/IFwiIGJlbG93IFwiIDogXCIgYWJvdmUgXCI7XG5cblx0cmV0dXJuIHJlbGF0aW9uICsgYmFzZTtcbn07XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlbnN1cmUgPSByZXF1aXJlKFwiLi4vdXRpbC9lbnN1cmUuanNcIik7XG52YXIgU2l6ZSA9IHJlcXVpcmUoXCIuLi92YWx1ZXMvc2l6ZS5qc1wiKTtcbnZhciBEZXNjcmlwdG9yID0gcmVxdWlyZShcIi4vZGVzY3JpcHRvci5qc1wiKTtcbnZhciBTaXplRGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuL3NpemVfZGVzY3JpcHRvci5qc1wiKTtcbnZhciBWYWx1ZSA9IHJlcXVpcmUoXCIuLi92YWx1ZXMvdmFsdWUuanNcIik7XG52YXIgU2l6ZU11bHRpcGxlID0gcmVxdWlyZShcIi4vc2l6ZV9tdWx0aXBsZS5qc1wiKTtcblxudmFyIFBMVVMgPSAxO1xudmFyIE1JTlVTID0gLTE7XG5cbnZhciBNZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUmVsYXRpdmVTaXplKGRpcmVjdGlvbiwgcmVsYXRpdmVUbywgYW1vdW50KSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIE51bWJlciwgRGVzY3JpcHRvciwgW051bWJlciwgRGVzY3JpcHRvciwgVmFsdWVdIF0pO1xuXG5cdHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcblx0dGhpcy5fcmVsYXRpdmVUbyA9IHJlbGF0aXZlVG87XG5cblx0aWYgKHR5cGVvZiBhbW91bnQgPT09IFwibnVtYmVyXCIpIHtcblx0XHR0aGlzLl9hbW91bnQgPSBTaXplLmNyZWF0ZShNYXRoLmFicyhhbW91bnQpKTtcblx0XHRpZiAoYW1vdW50IDwgMCkgdGhpcy5fZGlyZWN0aW9uICo9IC0xO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHRoaXMuX2Ftb3VudCA9IGFtb3VudDtcblx0fVxufTtcblNpemVEZXNjcmlwdG9yLmV4dGVuZChNZSk7XG5cbk1lLmxhcmdlciA9IGZhY3RvcnlGbihQTFVTKTtcbk1lLnNtYWxsZXIgPSBmYWN0b3J5Rm4oTUlOVVMpO1xuXG5NZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSgpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHR2YXIgYmFzZVZhbHVlID0gdGhpcy5fcmVsYXRpdmVUby52YWx1ZSgpO1xuXHR2YXIgcmVsYXRpdmVWYWx1ZSA9IHRoaXMuX2Ftb3VudC52YWx1ZSgpO1xuXG5cdGlmICh0aGlzLl9kaXJlY3Rpb24gPT09IFBMVVMpIHJldHVybiBiYXNlVmFsdWUucGx1cyhyZWxhdGl2ZVZhbHVlKTtcblx0ZWxzZSByZXR1cm4gYmFzZVZhbHVlLm1pbnVzKHJlbGF0aXZlVmFsdWUpO1xufTtcblxuTWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0dmFyIGJhc2UgPSB0aGlzLl9yZWxhdGl2ZVRvLnRvU3RyaW5nKCk7XG5cdGlmICh0aGlzLl9hbW91bnQuZXF1YWxzKFNpemUuY3JlYXRlKDApKSkgcmV0dXJuIGJhc2U7XG5cblx0dmFyIHJlbGF0aW9uID0gdGhpcy5fYW1vdW50LnRvU3RyaW5nKCk7XG5cdGlmICh0aGlzLl9kaXJlY3Rpb24gPT09IFBMVVMpIHJlbGF0aW9uICs9IFwiIGxhcmdlciB0aGFuIFwiO1xuXHRlbHNlIHJlbGF0aW9uICs9IFwiIHNtYWxsZXIgdGhhbiBcIjtcblxuXHRyZXR1cm4gcmVsYXRpb24gKyBiYXNlO1xufTtcblxuZnVuY3Rpb24gZmFjdG9yeUZuKGRpcmVjdGlvbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gZmFjdG9yeShyZWxhdGl2ZVRvLCBhbW91bnQpIHtcblx0XHRyZXR1cm4gbmV3IE1lKGRpcmVjdGlvbiwgcmVsYXRpdmVUbywgYW1vdW50KTtcblx0fTtcbn0iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuLypqc2hpbnQgbmV3Y2FwOmZhbHNlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vuc3VyZS5qc1wiKTtcbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vdXRpbC9vb3AuanNcIik7XG52YXIgRGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuL2Rlc2NyaXB0b3IuanNcIik7XG52YXIgU2l6ZSA9IHJlcXVpcmUoXCIuLi92YWx1ZXMvc2l6ZS5qc1wiKTtcblxuZnVuY3Rpb24gUmVsYXRpdmVTaXplKCkge1xuXHRyZXR1cm4gcmVxdWlyZShcIi4vcmVsYXRpdmVfc2l6ZS5qc1wiKTsgICBcdC8vIGJyZWFrIGNpcmN1bGFyIGRlcGVuZGVuY3lcbn1cblxuZnVuY3Rpb24gU2l6ZU11bHRpcGxlKCkge1xuXHRyZXR1cm4gcmVxdWlyZShcIi4vc2l6ZV9tdWx0aXBsZS5qc1wiKTsgICBcdC8vIGJyZWFrIGNpcmN1bGFyIGRlcGVuZGVuY3lcbn1cblxudmFyIE1lID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBTaXplRGVzY3JpcHRvcigpIHtcblx0ZW5zdXJlLnVucmVhY2hhYmxlKFwiU2l6ZURlc2NyaXB0b3IgaXMgYWJzdHJhY3QgYW5kIHNob3VsZCBub3QgYmUgY29uc3RydWN0ZWQgZGlyZWN0bHkuXCIpO1xufTtcbkRlc2NyaXB0b3IuZXh0ZW5kKE1lKTtcbk1lLmV4dGVuZCA9IG9vcC5leHRlbmRGbihNZSk7XG5cbk1lLnByb3RvdHlwZS5wbHVzID0gZnVuY3Rpb24gcGx1cyhhbW91bnQpIHtcblx0cmV0dXJuIFJlbGF0aXZlU2l6ZSgpLmxhcmdlcih0aGlzLCBhbW91bnQpO1xufTtcblxuTWUucHJvdG90eXBlLm1pbnVzID0gZnVuY3Rpb24gbWludXMoYW1vdW50KSB7XG5cdHJldHVybiBSZWxhdGl2ZVNpemUoKS5zbWFsbGVyKHRoaXMsIGFtb3VudCk7XG59O1xuXG5NZS5wcm90b3R5cGUudGltZXMgPSBmdW5jdGlvbiB0aW1lcyhhbW91bnQpIHtcblx0cmV0dXJuIFNpemVNdWx0aXBsZSgpLmNyZWF0ZSh0aGlzLCBhbW91bnQpO1xufTtcblxuTWUucHJvdG90eXBlLmNvbnZlcnQgPSBmdW5jdGlvbiBjb252ZXJ0KGFyZywgdHlwZSkge1xuXHRpZiAodHlwZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIFNpemUuY3JlYXRlKGFyZyk7XG59O1xuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE0IFRpdGFuaXVtIEkuVC4gTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBGb3IgbGljZW5zZSwgc2VlIFwiUkVBRE1FXCIgb3IgXCJMSUNFTlNFXCIgZmlsZS5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgZW5zdXJlID0gcmVxdWlyZShcIi4uL3V0aWwvZW5zdXJlLmpzXCIpO1xudmFyIERlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi9kZXNjcmlwdG9yLmpzXCIpO1xudmFyIFNpemVEZXNjcmlwdG9yID0gcmVxdWlyZShcIi4vc2l6ZV9kZXNjcmlwdG9yLmpzXCIpO1xudmFyIFNpemUgPSByZXF1aXJlKFwiLi4vdmFsdWVzL3NpemUuanNcIik7XG5cbnZhciBNZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gU2l6ZU11bHRpcGxlKHJlbGF0aXZlVG8sIG11bHRpcGxlKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIERlc2NyaXB0b3IsIE51bWJlciBdKTtcblxuXHR0aGlzLl9yZWxhdGl2ZVRvID0gcmVsYXRpdmVUbztcblx0dGhpcy5fbXVsdGlwbGUgPSBtdWx0aXBsZTtcbn07XG5TaXplRGVzY3JpcHRvci5leHRlbmQoTWUpO1xuXG5NZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocmVsYXRpdmVUbywgbXVsdGlwbGUpIHtcblx0cmV0dXJuIG5ldyBNZShyZWxhdGl2ZVRvLCBtdWx0aXBsZSk7XG59O1xuXG5NZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSgpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHRyZXR1cm4gdGhpcy5fcmVsYXRpdmVUby52YWx1ZSgpLnRpbWVzKHRoaXMuX211bHRpcGxlKTtcbn07XG5cbk1lLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXG5cdHZhciBtdWx0aXBsZSA9IHRoaXMuX211bHRpcGxlO1xuXHR2YXIgYmFzZSA9IHRoaXMuX3JlbGF0aXZlVG8udG9TdHJpbmcoKTtcblx0aWYgKG11bHRpcGxlID09PSAxKSByZXR1cm4gYmFzZTtcblxuXHR2YXIgZGVzYztcblx0c3dpdGNoKG11bHRpcGxlKSB7XG5cdFx0Y2FzZSAxLzI6IGRlc2MgPSBcImhhbGYgb2YgXCI7IGJyZWFrO1xuXHRcdGNhc2UgMS8zOiBkZXNjID0gXCJvbmUtdGhpcmQgb2YgXCI7IGJyZWFrO1xuXHRcdGNhc2UgMi8zOiBkZXNjID0gXCJ0d28tdGhpcmRzIG9mIFwiOyBicmVhaztcblx0XHRjYXNlIDEvNDogZGVzYyA9IFwib25lLXF1YXJ0ZXIgb2YgXCI7IGJyZWFrO1xuXHRcdGNhc2UgMy80OiBkZXNjID0gXCJ0aHJlZS1xdWFydGVycyBvZiBcIjsgYnJlYWs7XG5cdFx0Y2FzZSAxLzU6IGRlc2MgPSBcIm9uZS1maWZ0aCBvZiBcIjsgYnJlYWs7XG5cdFx0Y2FzZSAyLzU6IGRlc2MgPSBcInR3by1maWZ0aHMgb2YgXCI7IGJyZWFrO1xuXHRcdGNhc2UgMy81OiBkZXNjID0gXCJ0aHJlZS1maWZ0aHMgb2YgXCI7IGJyZWFrO1xuXHRcdGNhc2UgNC81OiBkZXNjID0gXCJmb3VyLWZpZnRocyBvZiBcIjsgYnJlYWs7XG5cdFx0Y2FzZSAxLzY6IGRlc2MgPSBcIm9uZS1zaXh0aCBvZiBcIjsgYnJlYWs7XG5cdFx0Y2FzZSA1LzY6IGRlc2MgPSBcImZpdmUtc2l4dGhzIG9mIFwiOyBicmVhaztcblx0XHRjYXNlIDEvODogZGVzYyA9IFwib25lLWVpZ2h0aCBvZiBcIjsgYnJlYWs7XG5cdFx0Y2FzZSAzLzg6IGRlc2MgPSBcInRocmVlLWVpZ2h0aHMgb2YgXCI7IGJyZWFrO1xuXHRcdGNhc2UgNS84OiBkZXNjID0gXCJmaXZlLWVpZ2h0aHMgb2YgXCI7IGJyZWFrO1xuXHRcdGNhc2UgNy84OiBkZXNjID0gXCJzZXZlbi1laWdodGhzIG9mIFwiOyBicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0aWYgKG11bHRpcGxlID4gMSkgZGVzYyA9IG11bHRpcGxlICsgXCIgdGltZXMgXCI7XG5cdFx0XHRlbHNlIGRlc2MgPSAobXVsdGlwbGUgKiAxMDApICsgXCIlIG9mIFwiO1xuXHR9XG5cblx0cmV0dXJuIGRlc2MgKyBiYXNlO1xufTsiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlbnN1cmUgPSByZXF1aXJlKFwiLi4vdXRpbC9lbnN1cmUuanNcIik7XG52YXIgUG9zaXRpb25EZXNjcmlwdG9yID0gcmVxdWlyZShcIi4vcG9zaXRpb25fZGVzY3JpcHRvci5qc1wiKTtcbnZhciBQb3NpdGlvbiA9IHJlcXVpcmUoXCIuLi92YWx1ZXMvcG9zaXRpb24uanNcIik7XG5cbnZhciBUT1AgPSBcInRvcFwiO1xudmFyIFJJR0hUID0gXCJyaWdodFwiO1xudmFyIEJPVFRPTSA9IFwiYm90dG9tXCI7XG52YXIgTEVGVCA9IFwibGVmdFwiO1xuXG52YXIgTWUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFZpZXdwb3J0RWRnZShwb3NpdGlvbiwgZnJhbWUpIHtcblx0dmFyIFFGcmFtZSA9IHJlcXVpcmUoXCIuLi9xX2ZyYW1lLmpzXCIpOyAgICAvLyBicmVhayBjaXJjdWxhciBkZXBlbmRlbmN5XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIFN0cmluZywgUUZyYW1lIF0pO1xuXG5cdGlmIChwb3NpdGlvbiA9PT0gTEVGVCB8fCBwb3NpdGlvbiA9PT0gUklHSFQpIFBvc2l0aW9uRGVzY3JpcHRvci54KHRoaXMpO1xuXHRlbHNlIGlmIChwb3NpdGlvbiA9PT0gVE9QIHx8IHBvc2l0aW9uID09PSBCT1RUT00pIFBvc2l0aW9uRGVzY3JpcHRvci55KHRoaXMpO1xuXHRlbHNlIGVuc3VyZS51bnJlYWNoYWJsZShcIlVua25vd24gcG9zaXRpb246IFwiICsgcG9zaXRpb24pO1xuXG5cdHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XG5cdHRoaXMuX2ZyYW1lID0gZnJhbWU7XG59O1xuUG9zaXRpb25EZXNjcmlwdG9yLmV4dGVuZChNZSk7XG5cbk1lLnRvcCA9IGZhY3RvcnlGbihUT1ApO1xuTWUucmlnaHQgPSBmYWN0b3J5Rm4oUklHSFQpO1xuTWUuYm90dG9tID0gZmFjdG9yeUZuKEJPVFRPTSk7XG5NZS5sZWZ0ID0gZmFjdG9yeUZuKExFRlQpO1xuXG5NZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbigpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHR2YXIgc2Nyb2xsID0gdGhpcy5fZnJhbWUuZ2V0UmF3U2Nyb2xsUG9zaXRpb24oKTtcblx0dmFyIHggPSBQb3NpdGlvbi54KHNjcm9sbC54KTtcblx0dmFyIHkgPSBQb3NpdGlvbi55KHNjcm9sbC55KTtcblxuXHRzd2l0Y2godGhpcy5fcG9zaXRpb24pIHtcblx0XHRjYXNlIFRPUDogcmV0dXJuIHk7XG5cdFx0Y2FzZSBSSUdIVDogcmV0dXJuIHgucGx1cyh0aGlzLl9mcmFtZS52aWV3cG9ydCgpLndpZHRoLnZhbHVlKCkpO1xuXHRcdGNhc2UgQk9UVE9NOiByZXR1cm4geS5wbHVzKHRoaXMuX2ZyYW1lLnZpZXdwb3J0KCkuaGVpZ2h0LnZhbHVlKCkpO1xuXHRcdGNhc2UgTEVGVDogcmV0dXJuIHg7XG5cblx0XHRkZWZhdWx0OiBlbnN1cmUudW5yZWFjaGFibGUoKTtcblx0fVxufTtcblxuTWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cdHJldHVybiB0aGlzLl9wb3NpdGlvbiArIFwiIGVkZ2Ugb2Ygdmlld3BvcnRcIjtcbn07XG5cbmZ1bmN0aW9uIGZhY3RvcnlGbihwb3NpdGlvbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gZmFjdG9yeShmcmFtZSkge1xuXHRcdHJldHVybiBuZXcgTWUocG9zaXRpb24sIGZyYW1lKTtcblx0fTtcbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxNCBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vuc3VyZS5qc1wiKTtcbnZhciBTaXplRGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuL3NpemVfZGVzY3JpcHRvci5qc1wiKTtcbnZhciBTaXplID0gcmVxdWlyZShcIi4uL3ZhbHVlcy9zaXplLmpzXCIpO1xudmFyIFJlbGF0aXZlU2l6ZSA9IHJlcXVpcmUoXCIuL3JlbGF0aXZlX3NpemUuanNcIik7XG52YXIgU2l6ZU11bHRpcGxlID0gcmVxdWlyZShcIi4vc2l6ZV9tdWx0aXBsZS5qc1wiKTtcblxudmFyIFhfRElNRU5TSU9OID0gXCJ4XCI7XG52YXIgWV9ESU1FTlNJT04gPSBcInlcIjtcblxudmFyIE1lID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBQYWdlU2l6ZShkaW1lbnNpb24sIGZyYW1lKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIFN0cmluZywgT2JqZWN0IF0pO1xuXHRlbnN1cmUudGhhdChkaW1lbnNpb24gPT09IFhfRElNRU5TSU9OIHx8IGRpbWVuc2lvbiA9PT0gWV9ESU1FTlNJT04sIFwiVW5yZWNvZ25pemVkIGRpbWVuc2lvbjogXCIgKyBkaW1lbnNpb24pO1xuXG5cdHRoaXMuX2RpbWVuc2lvbiA9IGRpbWVuc2lvbjtcblx0dGhpcy5fZnJhbWUgPSBmcmFtZTtcbn07XG5TaXplRGVzY3JpcHRvci5leHRlbmQoTWUpO1xuXG5NZS54ID0gZmFjdG9yeUZuKFhfRElNRU5TSU9OKTtcbk1lLnkgPSBmYWN0b3J5Rm4oWV9ESU1FTlNJT04pO1xuXG5NZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbigpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHQvLyBVU0VGVUwgUkVBRElORzogaHR0cDovL3d3dy5xdWlya3Ntb2RlLm9yZy9tb2JpbGUvdmlld3BvcnRzLmh0bWxcblx0Ly8gYW5kIGh0dHA6Ly93d3cucXVpcmtzbW9kZS5vcmcvbW9iaWxlL3ZpZXdwb3J0czIuaHRtbFxuXG5cdC8vIEJST1dTRVJTIFRFU1RFRDogU2FmYXJpIDYuMi4wIChNYWMgT1MgWCAxMC44LjUpOyBNb2JpbGUgU2FmYXJpIDcuMC4wIChpT1MgNy4xKTsgRmlyZWZveCAzMi4wLjAgKE1hYyBPUyBYIDEwLjgpO1xuXHQvLyAgICBGaXJlZm94IDMzLjAuMCAoV2luZG93cyA3KTsgQ2hyb21lIDM4LjAuMjEyNSAoTWFjIE9TIFggMTAuOC41KTsgQ2hyb21lIDM4LjAuMjEyNSAoV2luZG93cyA3KTsgSUUgOCwgOSwgMTAsIDExXG5cblx0Ly8gV2lkdGggdGVjaG5pcXVlcyBJJ3ZlIHRyaWVkOiAoTm90ZTogcmVzdWx0cyBhcmUgZGlmZmVyZW50IGluIHF1aXJrcyBtb2RlKVxuXHQvLyBib2R5LmNsaWVudFdpZHRoXG5cdC8vIGJvZHkub2Zmc2V0V2lkdGhcblx0Ly8gYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuXHQvLyAgICBmYWlscyBvbiBhbGwgYnJvd3NlcnM6IGRvZXNuJ3QgaW5jbHVkZSBtYXJnaW5cblx0Ly8gYm9keS5zY3JvbGxXaWR0aFxuXHQvLyAgICB3b3JrcyBvbiBTYWZhcmksIE1vYmlsZSBTYWZhcmksIENocm9tZVxuXHQvLyAgICBmYWlscyBvbiBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTE6IGRvZXNuJ3QgaW5jbHVkZSBtYXJnaW5cblx0Ly8gaHRtbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuXHQvLyBodG1sLm9mZnNldFdpZHRoXG5cdC8vICAgIHdvcmtzIG9uIFNhZmFyaSwgTW9iaWxlIFNhZmFyaSwgQ2hyb21lLCBGaXJlZm94XG5cdC8vICAgIGZhaWxzIG9uIElFIDgsIDksIDEwOiBpbmNsdWRlcyBzY3JvbGxiYXJcblx0Ly8gaHRtbC5zY3JvbGxXaWR0aFxuXHQvLyBodG1sLmNsaWVudFdpZHRoXG5cdC8vICAgIFdPUktTISBTYWZhcmksIE1vYmlsZSBTYWZhcmksIENocm9tZSwgRmlyZWZveCwgSUUgOCwgOSwgMTAsIDExXG5cblx0Ly8gSGVpZ2h0IHRlY2huaXF1ZXMgSSd2ZSB0cmllZDogKE5vdGUgdGhhdCByZXN1bHRzIGFyZSBkaWZmZXJlbnQgaW4gcXVpcmtzIG1vZGUpXG5cdC8vIGJvZHkuY2xpZW50SGVpZ2h0XG5cdC8vIGJvZHkub2Zmc2V0SGVpZ2h0XG5cdC8vIGJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG5cdC8vICAgIGZhaWxzIG9uIGFsbCBicm93c2Vyczogb25seSBpbmNsdWRlcyBoZWlnaHQgb2YgY29udGVudFxuXHQvLyBib2R5IGdldENvbXB1dGVkU3R5bGUoXCJoZWlnaHRcIilcblx0Ly8gICAgZmFpbHMgb24gYWxsIGJyb3dzZXJzOiBJRTggcmV0dXJucyBcImF1dG9cIjsgb3RoZXJzIG9ubHkgaW5jbHVkZSBoZWlnaHQgb2YgY29udGVudFxuXHQvLyBib2R5LnNjcm9sbEhlaWdodFxuXHQvLyAgICB3b3JrcyBvbiBTYWZhcmksIE1vYmlsZSBTYWZhcmksIENocm9tZTtcblx0Ly8gICAgZmFpbHMgb24gRmlyZWZveCwgSUUgOCwgOSwgMTAsIDExOiBvbmx5IGluY2x1ZGVzIGhlaWdodCBvZiBjb250ZW50XG5cdC8vIGh0bWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG5cdC8vIGh0bWwub2Zmc2V0SGVpZ2h0XG5cdC8vICAgIHdvcmtzIG9uIElFIDgsIDksIDEwXG5cdC8vICAgIGZhaWxzIG9uIElFIDExLCBTYWZhcmksIE1vYmlsZSBTYWZhcmksIENocm9tZTogb25seSBpbmNsdWRlcyBoZWlnaHQgb2YgY29udGVudFxuXHQvLyBodG1sLnNjcm9sbEhlaWdodFxuXHQvLyAgICB3b3JrcyBvbiBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTFcblx0Ly8gICAgZmFpbHMgb24gU2FmYXJpLCBNb2JpbGUgU2FmYXJpLCBDaHJvbWU6IG9ubHkgaW5jbHVkZXMgaGVpZ2h0IG9mIGNvbnRlbnRcblx0Ly8gaHRtbC5jbGllbnRIZWlnaHRcblx0Ly8gICAgV09SS1MhIFNhZmFyaSwgTW9iaWxlIFNhZmFyaSwgQ2hyb21lLCBGaXJlZm94LCBJRSA4LCA5LCAxMCwgMTFcblxuXHR2YXIgaHRtbCA9IHRoaXMuX2ZyYW1lLmdldChcImh0bWxcIikudG9Eb21FbGVtZW50KCk7XG5cdHZhciB2YWx1ZSA9ICh0aGlzLl9kaW1lbnNpb24gPT09IFhfRElNRU5TSU9OKSA/IGh0bWwuY2xpZW50V2lkdGggOiBodG1sLmNsaWVudEhlaWdodDtcblx0cmV0dXJuIFNpemUuY3JlYXRlKHZhbHVlKTtcbn07XG5cbk1lLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXG5cdHZhciBkZXNjID0gKHRoaXMuX2RpbWVuc2lvbiA9PT0gWF9ESU1FTlNJT04pID8gXCJ3aWR0aFwiIDogXCJoZWlnaHRcIjtcblx0cmV0dXJuIGRlc2MgKyBcIiBvZiB2aWV3cG9ydFwiO1xufTtcblxuZnVuY3Rpb24gZmFjdG9yeUZuKGRpbWVuc2lvbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gZmFjdG9yeShmcmFtZSkge1xuXHRcdHJldHVybiBuZXcgTWUoZGltZW5zaW9uLCBmcmFtZSk7XG5cdH07XG59IiwiLy8gQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlbnN1cmUgPSByZXF1aXJlKFwiLi91dGlsL2Vuc3VyZS5qc1wiKTtcbnZhciBjYW1lbGNhc2UgPSByZXF1aXJlKFwiLi4vdmVuZG9yL2NhbWVsY2FzZS0xLjAuMS1tb2RpZmllZC5qc1wiKTtcbnZhciBFbGVtZW50RWRnZSA9IHJlcXVpcmUoXCIuL2Rlc2NyaXB0b3JzL2VsZW1lbnRfZWRnZS5qc1wiKTtcbnZhciBDZW50ZXIgPSByZXF1aXJlKFwiLi9kZXNjcmlwdG9ycy9jZW50ZXIuanNcIik7XG52YXIgRWxlbWVudFNpemUgPSByZXF1aXJlKFwiLi9kZXNjcmlwdG9ycy9lbGVtZW50X3NpemUuanNcIik7XG52YXIgQXNzZXJ0YWJsZSA9IHJlcXVpcmUoXCIuL2Fzc2VydGFibGUuanNcIik7XG5cbnZhciBNZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUUVsZW1lbnQoZG9tRWxlbWVudCwgZnJhbWUsIG5pY2tuYW1lKSB7XG5cdHZhciBRRnJhbWUgPSByZXF1aXJlKFwiLi9xX2ZyYW1lLmpzXCIpOyAgICAvLyBicmVhayBjaXJjdWxhciBkZXBlbmRlbmN5XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIE9iamVjdCwgUUZyYW1lLCBTdHJpbmcgXSk7XG5cblx0dGhpcy5fZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG5cdHRoaXMuX25pY2tuYW1lID0gbmlja25hbWU7XG5cblx0dGhpcy5mcmFtZSA9IGZyYW1lO1xuXG5cdC8vIHByb3BlcnRpZXNcblx0dGhpcy50b3AgPSBFbGVtZW50RWRnZS50b3AodGhpcyk7XG5cdHRoaXMucmlnaHQgPSBFbGVtZW50RWRnZS5yaWdodCh0aGlzKTtcblx0dGhpcy5ib3R0b20gPSBFbGVtZW50RWRnZS5ib3R0b20odGhpcyk7XG5cdHRoaXMubGVmdCA9IEVsZW1lbnRFZGdlLmxlZnQodGhpcyk7XG5cblx0dGhpcy5jZW50ZXIgPSBDZW50ZXIueCh0aGlzLmxlZnQsIHRoaXMucmlnaHQsIFwiY2VudGVyIG9mICdcIiArIG5pY2tuYW1lICsgXCInXCIpO1xuXHR0aGlzLm1pZGRsZSA9IENlbnRlci55KHRoaXMudG9wLCB0aGlzLmJvdHRvbSwgXCJtaWRkbGUgb2YgJ1wiICsgbmlja25hbWUgKyBcIidcIik7XG5cblx0dGhpcy53aWR0aCA9IEVsZW1lbnRTaXplLngodGhpcyk7XG5cdHRoaXMuaGVpZ2h0ID0gRWxlbWVudFNpemUueSh0aGlzKTtcbn07XG5Bc3NlcnRhYmxlLmV4dGVuZChNZSk7XG5cbk1lLnByb3RvdHlwZS5nZXRSYXdTdHlsZSA9IGZ1bmN0aW9uIGdldFJhd1N0eWxlKHN0eWxlTmFtZSkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBTdHJpbmcgXSk7XG5cblx0dmFyIHN0eWxlcztcblx0dmFyIHJlc3VsdDtcblxuXHQvLyBXT1JLQVJPVU5EIElFIDg6IG5vIGdldENvbXB1dGVkU3R5bGUoKVxuXHRpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcblx0XHQvLyBXT1JLQVJPVU5EIEZpcmVmb3ggNDAuMC4zOiBtdXN0IHVzZSBmcmFtZSdzIGNvbnRlbnRXaW5kb3cgKHJlZiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjA0MDYyKVxuXHRcdHN0eWxlcyA9IHRoaXMuZnJhbWUudG9Eb21FbGVtZW50KCkuY29udGVudFdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuX2RvbUVsZW1lbnQpO1xuXHRcdHJlc3VsdCA9IHN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlTmFtZSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0c3R5bGVzID0gdGhpcy5fZG9tRWxlbWVudC5jdXJyZW50U3R5bGU7XG5cdFx0cmVzdWx0ID0gc3R5bGVzW2NhbWVsY2FzZShzdHlsZU5hbWUpXTtcblx0fVxuXHRpZiAocmVzdWx0ID09PSBudWxsIHx8IHJlc3VsdCA9PT0gdW5kZWZpbmVkKSByZXN1bHQgPSBcIlwiO1xuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxuTWUucHJvdG90eXBlLmdldFJhd1Bvc2l0aW9uID0gZnVuY3Rpb24gZ2V0UmF3UG9zaXRpb24oKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0Ly8gV09SS0FST1VORCBJRSA4OiBObyBUZXh0UmVjdGFuZ2xlLmhlaWdodCBvciAud2lkdGhcblx0dmFyIHJlY3QgPSB0aGlzLl9kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRyZXR1cm4ge1xuXHRcdGxlZnQ6IHJlY3QubGVmdCxcblx0XHRyaWdodDogcmVjdC5yaWdodCxcblx0XHR3aWR0aDogcmVjdC53aWR0aCAhPT0gdW5kZWZpbmVkID8gcmVjdC53aWR0aCA6IHJlY3QucmlnaHQgLSByZWN0LmxlZnQsXG5cblx0XHR0b3A6IHJlY3QudG9wLFxuXHRcdGJvdHRvbTogcmVjdC5ib3R0b20sXG5cdFx0aGVpZ2h0OiByZWN0LmhlaWdodCAhPT0gdW5kZWZpbmVkID8gcmVjdC5oZWlnaHQgOiByZWN0LmJvdHRvbSAtIHJlY3QudG9wXG5cdH07XG59O1xuXG5NZS5wcm90b3R5cGUudG9Eb21FbGVtZW50ID0gZnVuY3Rpb24gdG9Eb21FbGVtZW50KCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXHRyZXR1cm4gdGhpcy5fZG9tRWxlbWVudDtcbn07XG5cbk1lLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXHRyZXR1cm4gXCInXCIgKyB0aGlzLl9uaWNrbmFtZSArIFwiJ1wiO1xufTtcblxuTWUucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyh0aGF0KSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIE1lIF0pO1xuXHRyZXR1cm4gdGhpcy5fZG9tRWxlbWVudCA9PT0gdGhhdC5fZG9tRWxlbWVudDtcbn07XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlbnN1cmUgPSByZXF1aXJlKFwiLi91dGlsL2Vuc3VyZS5qc1wiKTtcbnZhciBRRWxlbWVudCA9IHJlcXVpcmUoXCIuL3FfZWxlbWVudC5qc1wiKTtcblxudmFyIE1lID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBRRWxlbWVudExpc3Qobm9kZUxpc3QsIGZyYW1lLCBuaWNrbmFtZSkge1xuXHR2YXIgUUZyYW1lID0gcmVxdWlyZShcIi4vcV9mcmFtZS5qc1wiKTsgICAgLy8gYnJlYWsgY2lyY3VsYXIgZGVwZW5kZW5jeVxuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBPYmplY3QsIFFGcmFtZSwgU3RyaW5nIF0pO1xuXG5cdHRoaXMuX25vZGVMaXN0ID0gbm9kZUxpc3Q7XG5cdHRoaXMuX2ZyYW1lID0gZnJhbWU7XG5cdHRoaXMuX25pY2tuYW1lID0gbmlja25hbWU7XG59O1xuXG5NZS5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gbGVuZ3RoKCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXG5cdHJldHVybiB0aGlzLl9ub2RlTGlzdC5sZW5ndGg7XG59O1xuXG5NZS5wcm90b3R5cGUuYXQgPSBmdW5jdGlvbiBhdChyZXF1ZXN0ZWRJbmRleCwgbmlja25hbWUpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgTnVtYmVyLCBbdW5kZWZpbmVkLCBTdHJpbmddIF0pO1xuXG5cdHZhciBpbmRleCA9IHJlcXVlc3RlZEluZGV4O1xuXHR2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGgoKTtcblx0aWYgKGluZGV4IDwgMCkgaW5kZXggPSBsZW5ndGggKyBpbmRleDtcblxuXHRlbnN1cmUudGhhdChcblx0XHRpbmRleCA+PSAwICYmIGluZGV4IDwgbGVuZ3RoLFxuXHRcdFwiJ1wiICsgdGhpcy5fbmlja25hbWUgKyBcIidbXCIgKyByZXF1ZXN0ZWRJbmRleCArIFwiXSBpcyBvdXQgb2YgYm91bmRzOyBsaXN0IGxlbmd0aCBpcyBcIiArIGxlbmd0aFxuXHQpO1xuXHR2YXIgZWxlbWVudCA9IHRoaXMuX25vZGVMaXN0W2luZGV4XTtcblxuXHRpZiAobmlja25hbWUgPT09IHVuZGVmaW5lZCkgbmlja25hbWUgPSB0aGlzLl9uaWNrbmFtZSArIFwiW1wiICsgaW5kZXggKyBcIl1cIjtcblx0cmV0dXJuIG5ldyBRRWxlbWVudChlbGVtZW50LCB0aGlzLl9mcmFtZSwgbmlja25hbWUpO1xufTtcblxuTWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0cmV0dXJuIFwiJ1wiICsgdGhpcy5fbmlja25hbWUgKyBcIicgbGlzdFwiO1xufTsiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlbnN1cmUgPSByZXF1aXJlKFwiLi91dGlsL2Vuc3VyZS5qc1wiKTtcbnZhciBzaGltID0gcmVxdWlyZShcIi4vdXRpbC9zaGltLmpzXCIpO1xudmFyIHF1aXhvdGUgPSByZXF1aXJlKFwiLi9xdWl4b3RlLmpzXCIpO1xudmFyIFFFbGVtZW50ID0gcmVxdWlyZShcIi4vcV9lbGVtZW50LmpzXCIpO1xudmFyIFFFbGVtZW50TGlzdCA9IHJlcXVpcmUoXCIuL3FfZWxlbWVudF9saXN0LmpzXCIpO1xudmFyIFFWaWV3cG9ydCA9IHJlcXVpcmUoXCIuL3Ffdmlld3BvcnQuanNcIik7XG52YXIgUVBhZ2UgPSByZXF1aXJlKFwiLi9xX3BhZ2UuanNcIik7XG5cbnZhciBNZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUUZyYW1lKGZyYW1lRG9tKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIE9iamVjdCBdKTtcblx0ZW5zdXJlLnRoYXQoZnJhbWVEb20udGFnTmFtZSA9PT0gXCJJRlJBTUVcIiwgXCJRRnJhbWUgRE9NIGVsZW1lbnQgbXVzdCBiZSBhbiBpZnJhbWVcIik7XG5cblx0dGhpcy5fZG9tRWxlbWVudCA9IGZyYW1lRG9tO1xuXHR0aGlzLl9sb2FkZWQgPSBmYWxzZTtcblx0dGhpcy5fcmVtb3ZlZCA9IGZhbHNlO1xufTtcblxuZnVuY3Rpb24gbG9hZGVkKHNlbGYsIHdpZHRoLCBoZWlnaHQpIHtcblx0c2VsZi5fbG9hZGVkID0gdHJ1ZTtcblx0c2VsZi5fZG9jdW1lbnQgPSBzZWxmLl9kb21FbGVtZW50LmNvbnRlbnREb2N1bWVudDtcblx0c2VsZi5fb3JpZ2luYWxCb2R5ID0gc2VsZi5fZG9jdW1lbnQuYm9keS5pbm5lckhUTUw7XG5cdHNlbGYuX29yaWdpbmFsV2lkdGggPSB3aWR0aDtcblx0c2VsZi5fb3JpZ2luYWxIZWlnaHQgPSBoZWlnaHQ7XG59XG5cbk1lLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwYXJlbnRFbGVtZW50LCBvcHRpb25zLCBjYWxsYmFjaykge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBPYmplY3QsIFsgT2JqZWN0LCBGdW5jdGlvbiBdLCBbIHVuZGVmaW5lZCwgRnVuY3Rpb24gXSBdKTtcblxuXHRpZiAoY2FsbGJhY2sgPT09IHVuZGVmaW5lZCkge1xuXHRcdGNhbGxiYWNrID0gb3B0aW9ucztcblx0XHRvcHRpb25zID0ge307XG5cdH1cblx0dmFyIHdpZHRoID0gb3B0aW9ucy53aWR0aCB8fCAyMDAwO1xuXHR2YXIgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgMjAwMDtcblxuXHQvLyBXT1JLQVJPVU5EIE1vYmlsZSBTYWZhcmkgNy4wLjA6IHdlaXJkIHN0eWxlIHJlc3VsdHMgb2NjdXIgd2hlbiBib3RoIHNyYyBhbmQgc3R5bGVzaGVldCBhcmUgbG9hZGVkIChzZWUgdGVzdClcblx0ZW5zdXJlLnRoYXQoXG5cdFx0IShvcHRpb25zLnNyYyAmJiBvcHRpb25zLnN0eWxlc2hlZXQpLFxuXHRcdFwiQ2Fubm90IHNwZWNpZnkgSFRNTCBVUkwgYW5kIHN0eWxlc2hlZXQgVVJMIHNpbXVsdGFuZW91c2x5IGR1ZSB0byBNb2JpbGUgU2FmYXJpIGlzc3VlXCJcblx0KTtcblxuXHR2YXIgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtcblx0aWZyYW1lLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHdpZHRoKTtcblx0aWZyYW1lLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBoZWlnaHQpO1xuXHRpZnJhbWUuc2V0QXR0cmlidXRlKFwiZnJhbWVib3JkZXJcIiwgXCIwXCIpOyAgICAvLyBXT1JLQVJPVU5EIElFIDg6IGRvbid0IGluY2x1ZGUgZnJhbWUgYm9yZGVyIGluIHBvc2l0aW9uIGNhbGNzXG5cblx0aWYgKG9wdGlvbnMuc3JjICE9PSB1bmRlZmluZWQpIHtcblx0XHRpZnJhbWUuc2V0QXR0cmlidXRlKFwic3JjXCIsIG9wdGlvbnMuc3JjKTtcblx0XHRzaGltLkV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoaWZyYW1lLCBcImxvYWRcIiwgb25GcmFtZUxvYWQpO1xuXHR9XG5cblx0dmFyIGZyYW1lID0gbmV3IE1lKGlmcmFtZSk7XG5cdHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcblxuXHQvLyBXT1JLQVJPVU5EIElFIDg6IGVuc3VyZSB0aGF0IHRoZSBmcmFtZSBpcyBpbiBzdGFuZGFyZHMgbW9kZSwgbm90IHF1aXJrcyBtb2RlLlxuXHRpZiAob3B0aW9ucy5zcmMgPT09IHVuZGVmaW5lZCkge1xuXHRcdHNoaW0uRXZlbnRUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihpZnJhbWUsIFwibG9hZFwiLCBvbkZyYW1lTG9hZCk7XG5cdFx0dmFyIHN0YW5kYXJkc01vZGUgPSBcIjwhRE9DVFlQRSBodG1sPlxcblwiICtcblx0XHRcdFwiPGh0bWw+XCIgK1xuXHRcdFx0XCI8aGVhZD48L2hlYWQ+PGJvZHk+PC9ib2R5PlwiICtcblx0XHRcdFwiPC9odG1sPlwiO1xuXHRcdGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50Lm9wZW4oKTtcblx0XHRpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC53cml0ZShzdGFuZGFyZHNNb2RlKTtcblx0XHRpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5jbG9zZSgpO1xuXHR9XG5cblx0cmV0dXJuIGZyYW1lO1xuXG5cdGZ1bmN0aW9uIG9uRnJhbWVMb2FkKCkge1xuXHRcdC8vIFdPUktBUk9VTkQgTW9iaWxlIFNhZmFyaSA3LjAuMCwgU2FmYXJpIDYuMi4wLCBDaHJvbWUgMzguMC4yMTI1OiBmcmFtZSBpcyBsb2FkZWQgc3luY2hyb25vdXNseVxuXHRcdC8vIFdlIGZvcmNlIGl0IHRvIGJlIGFzeW5jaHJvbm91cyBoZXJlXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdGxvYWRlZChmcmFtZSwgd2lkdGgsIGhlaWdodCk7XG5cdFx0XHRsb2FkU3R5bGVzaGVldChmcmFtZSwgb3B0aW9ucy5zdHlsZXNoZWV0LCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y2FsbGJhY2sobnVsbCwgZnJhbWUpO1xuXHRcdFx0fSk7XG5cdFx0fSwgMCk7XG5cdH1cbn07XG5cbmZ1bmN0aW9uIGxvYWRTdHlsZXNoZWV0KHNlbGYsIHVybCwgY2FsbGJhY2spIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgTWUsIFsgdW5kZWZpbmVkLCBTdHJpbmcgXSwgRnVuY3Rpb24gXSk7XG5cdGlmICh1cmwgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblx0c2hpbS5FdmVudFRhcmdldC5hZGRFdmVudExpc3RlbmVyKGxpbmssIFwibG9hZFwiLCBvbkxpbmtMb2FkKTtcblx0bGluay5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpO1xuXHRsaW5rLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0L2Nzc1wiKTtcblx0bGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHVybCk7XG5cblx0c2hpbS5Eb2N1bWVudC5oZWFkKHNlbGYuX2RvY3VtZW50KS5hcHBlbmRDaGlsZChsaW5rKTtcblx0ZnVuY3Rpb24gb25MaW5rTG9hZCgpIHtcblx0XHRjYWxsYmFjaygpO1xuXHR9XG59XG5cbk1lLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgW10pO1xuXHRlbnN1cmVVc2FibGUodGhpcyk7XG5cblx0dGhpcy5fZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSB0aGlzLl9vcmlnaW5hbEJvZHk7XG5cdHRoaXMuc2Nyb2xsKDAsIDApO1xuXHR0aGlzLnJlc2l6ZSh0aGlzLl9vcmlnaW5hbFdpZHRoLCB0aGlzLl9vcmlnaW5hbEhlaWdodCk7XG59O1xuXG5NZS5wcm90b3R5cGUudG9Eb21FbGVtZW50ID0gZnVuY3Rpb24oKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cdGVuc3VyZU5vdFJlbW92ZWQodGhpcyk7XG5cblx0cmV0dXJuIHRoaXMuX2RvbUVsZW1lbnQ7XG59O1xuXG5NZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cdGVuc3VyZUxvYWRlZCh0aGlzKTtcblx0aWYgKHRoaXMuX3JlbW92ZWQpIHJldHVybjtcblxuXHR0aGlzLl9kb21FbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5fZG9tRWxlbWVudCk7XG5cdHRoaXMuX3JlbW92ZWQgPSB0cnVlO1xufTtcblxuTWUucHJvdG90eXBlLnZpZXdwb3J0ID0gZnVuY3Rpb24oKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cdGVuc3VyZVVzYWJsZSh0aGlzKTtcblxuXHRyZXR1cm4gbmV3IFFWaWV3cG9ydCh0aGlzKTtcbn07XG5cbk1lLnByb3RvdHlwZS5wYWdlID0gZnVuY3Rpb24oKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cdGVuc3VyZVVzYWJsZSh0aGlzKTtcblxuXHRyZXR1cm4gbmV3IFFQYWdlKHRoaXMpO1xufTtcblxuTWUucHJvdG90eXBlLmJvZHkgPSBmdW5jdGlvbigpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblxuXHRyZXR1cm4gdGhpcy5nZXQoXCJib2R5XCIpO1xufTtcblxuTWUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGh0bWwsIG5pY2tuYW1lKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIFN0cmluZywgW3VuZGVmaW5lZCwgU3RyaW5nXSBdKTtcblx0aWYgKG5pY2tuYW1lID09PSB1bmRlZmluZWQpIG5pY2tuYW1lID0gaHRtbDtcblx0ZW5zdXJlVXNhYmxlKHRoaXMpO1xuXG5cdHZhciB0ZW1wRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdHRlbXBFbGVtZW50LmlubmVySFRNTCA9IGh0bWw7XG5cdGVuc3VyZS50aGF0KFxuXHRcdHRlbXBFbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxLFxuXHRcdFwiRXhwZWN0ZWQgb25lIGVsZW1lbnQsIGJ1dCBnb3QgXCIgKyB0ZW1wRWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aCArIFwiIChcIiArIGh0bWwgKyBcIilcIlxuXHQpO1xuXG5cdHZhciBpbnNlcnRlZEVsZW1lbnQgPSB0ZW1wRWxlbWVudC5jaGlsZE5vZGVzWzBdO1xuXHR0aGlzLl9kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGluc2VydGVkRWxlbWVudCk7XG5cdHJldHVybiBuZXcgUUVsZW1lbnQoaW5zZXJ0ZWRFbGVtZW50LCB0aGlzLCBuaWNrbmFtZSk7XG59O1xuXG5NZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oc2VsZWN0b3IsIG5pY2tuYW1lKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIFN0cmluZywgW3VuZGVmaW5lZCwgU3RyaW5nXSBdKTtcblx0aWYgKG5pY2tuYW1lID09PSB1bmRlZmluZWQpIG5pY2tuYW1lID0gc2VsZWN0b3I7XG5cdGVuc3VyZVVzYWJsZSh0aGlzKTtcblxuXHR2YXIgbm9kZXMgPSB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0ZW5zdXJlLnRoYXQobm9kZXMubGVuZ3RoID09PSAxLCBcIkV4cGVjdGVkIG9uZSBlbGVtZW50IHRvIG1hdGNoICdcIiArIHNlbGVjdG9yICsgXCInLCBidXQgZm91bmQgXCIgKyBub2Rlcy5sZW5ndGgpO1xuXHRyZXR1cm4gbmV3IFFFbGVtZW50KG5vZGVzWzBdLCB0aGlzLCBuaWNrbmFtZSk7XG59O1xuXG5NZS5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24oc2VsZWN0b3IsIG5pY2tuYW1lKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIFN0cmluZywgW3VuZGVmaW5lZCwgU3RyaW5nXSBdKTtcblx0aWYgKG5pY2tuYW1lID09PSB1bmRlZmluZWQpIG5pY2tuYW1lID0gc2VsZWN0b3I7XG5cblx0cmV0dXJuIG5ldyBRRWxlbWVudExpc3QodGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciksIHRoaXMsIG5pY2tuYW1lKTtcbn07XG5cbk1lLnByb3RvdHlwZS5zY3JvbGwgPSBmdW5jdGlvbiBzY3JvbGwoeCwgeSkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBOdW1iZXIsIE51bWJlciBdKTtcblxuXHR0aGlzLl9kb21FbGVtZW50LmNvbnRlbnRXaW5kb3cuc2Nyb2xsKHgsIHkpO1xufTtcblxuTWUucHJvdG90eXBlLmdldFJhd1Njcm9sbFBvc2l0aW9uID0gZnVuY3Rpb24gZ2V0UmF3U2Nyb2xsUG9zaXRpb24oKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cblx0cmV0dXJuIHtcblx0XHR4OiBzaGltLldpbmRvdy5wYWdlWE9mZnNldCh0aGlzLl9kb21FbGVtZW50LmNvbnRlbnRXaW5kb3csIHRoaXMuX2RvY3VtZW50KSxcblx0XHR5OiBzaGltLldpbmRvdy5wYWdlWU9mZnNldCh0aGlzLl9kb21FbGVtZW50LmNvbnRlbnRXaW5kb3csIHRoaXMuX2RvY3VtZW50KVxuXHR9O1xufTtcblxuTWUucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbIE51bWJlciwgTnVtYmVyIF0pO1xuXG5cdHRoaXMuX2RvbUVsZW1lbnQuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgXCJcIiArIHdpZHRoKTtcblx0dGhpcy5fZG9tRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgXCJcIiArIGhlaWdodCk7XG59O1xuXG5mdW5jdGlvbiBlbnN1cmVVc2FibGUoc2VsZikge1xuXHRlbnN1cmVMb2FkZWQoc2VsZik7XG5cdGVuc3VyZU5vdFJlbW92ZWQoc2VsZik7XG59XG5cbmZ1bmN0aW9uIGVuc3VyZUxvYWRlZChzZWxmKSB7XG5cdGVuc3VyZS50aGF0KHNlbGYuX2xvYWRlZCwgXCJRRnJhbWUgbm90IGxvYWRlZDogV2FpdCBmb3IgZnJhbWUgY3JlYXRpb24gY2FsbGJhY2sgdG8gZXhlY3V0ZSBiZWZvcmUgdXNpbmcgZnJhbWVcIik7XG59XG5cbmZ1bmN0aW9uIGVuc3VyZU5vdFJlbW92ZWQoc2VsZikge1xuXHRlbnN1cmUudGhhdCghc2VsZi5fcmVtb3ZlZCwgXCJBdHRlbXB0ZWQgdG8gdXNlIGZyYW1lIGFmdGVyIGl0IHdhcyByZW1vdmVkXCIpO1xufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE0IFRpdGFuaXVtIEkuVC4gTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBGb3IgbGljZW5zZSwgc2VlIFwiUkVBRE1FXCIgb3IgXCJMSUNFTlNFXCIgZmlsZS5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgZW5zdXJlID0gcmVxdWlyZShcIi4vdXRpbC9lbnN1cmUuanNcIik7XG52YXIgUGFnZVNpemUgPSByZXF1aXJlKFwiLi9kZXNjcmlwdG9ycy9wYWdlX3NpemUuanNcIik7XG52YXIgUGFnZUVkZ2UgPSByZXF1aXJlKFwiLi9kZXNjcmlwdG9ycy9wYWdlX2VkZ2UuanNcIik7XG52YXIgQ2VudGVyID0gcmVxdWlyZShcIi4vZGVzY3JpcHRvcnMvY2VudGVyLmpzXCIpO1xudmFyIEFzc2VydGFibGUgPSByZXF1aXJlKFwiLi9hc3NlcnRhYmxlLmpzXCIpO1xuXG52YXIgTWUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFFQYWdlKGZyYW1lKSB7XG5cdHZhciBRRnJhbWUgPSByZXF1aXJlKFwiLi9xX2ZyYW1lLmpzXCIpOyAgIC8vIGJyZWFrIGNpcmN1bGFyIGRlcGVuZGVuY3lcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgUUZyYW1lIF0pO1xuXG5cdC8vIHByb3BlcnRpZXNcblx0dGhpcy53aWR0aCA9IFBhZ2VTaXplLngoZnJhbWUpO1xuXHR0aGlzLmhlaWdodCA9IFBhZ2VTaXplLnkoZnJhbWUpO1xuXG5cdHRoaXMudG9wID0gUGFnZUVkZ2UudG9wKGZyYW1lKTtcblx0dGhpcy5yaWdodCA9IFBhZ2VFZGdlLnJpZ2h0KGZyYW1lKTtcblx0dGhpcy5ib3R0b20gPSBQYWdlRWRnZS5ib3R0b20oZnJhbWUpO1xuXHR0aGlzLmxlZnQgPSBQYWdlRWRnZS5sZWZ0KGZyYW1lKTtcblxuXHR0aGlzLmNlbnRlciA9IENlbnRlci54KHRoaXMubGVmdCwgdGhpcy5yaWdodCwgXCJjZW50ZXIgb2YgcGFnZVwiKTtcblx0dGhpcy5taWRkbGUgPSBDZW50ZXIueSh0aGlzLnRvcCwgdGhpcy5ib3R0b20sIFwibWlkZGxlIG9mIHBhZ2VcIik7XG59O1xuQXNzZXJ0YWJsZS5leHRlbmQoTWUpO1xuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE0IFRpdGFuaXVtIEkuVC4gTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBGb3IgbGljZW5zZSwgc2VlIFwiUkVBRE1FXCIgb3IgXCJMSUNFTlNFXCIgZmlsZS5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgZW5zdXJlID0gcmVxdWlyZShcIi4vdXRpbC9lbnN1cmUuanNcIik7XG52YXIgVmlld3BvcnRTaXplID0gcmVxdWlyZShcIi4vZGVzY3JpcHRvcnMvdmlld3BvcnRfc2l6ZS5qc1wiKTtcbnZhciBWaWV3cG9ydEVkZ2UgPSByZXF1aXJlKFwiLi9kZXNjcmlwdG9ycy92aWV3cG9ydF9lZGdlLmpzXCIpO1xudmFyIENlbnRlciA9IHJlcXVpcmUoXCIuL2Rlc2NyaXB0b3JzL2NlbnRlci5qc1wiKTtcbnZhciBBc3NlcnRhYmxlID0gcmVxdWlyZShcIi4vYXNzZXJ0YWJsZS5qc1wiKTtcblxudmFyIE1lID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBRVmlld3BvcnQoZnJhbWUpIHtcblx0dmFyIFFGcmFtZSA9IHJlcXVpcmUoXCIuL3FfZnJhbWUuanNcIik7ICAgLy8gYnJlYWsgY2lyY3VsYXIgZGVwZW5kZW5jeVxuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBRRnJhbWUgXSk7XG5cblx0Ly8gcHJvcGVydGllc1xuXHR0aGlzLndpZHRoID0gVmlld3BvcnRTaXplLngoZnJhbWUpO1xuXHR0aGlzLmhlaWdodCA9IFZpZXdwb3J0U2l6ZS55KGZyYW1lKTtcblxuXHR0aGlzLnRvcCA9IFZpZXdwb3J0RWRnZS50b3AoZnJhbWUpO1xuXHR0aGlzLnJpZ2h0ID0gVmlld3BvcnRFZGdlLnJpZ2h0KGZyYW1lKTtcblx0dGhpcy5ib3R0b20gPSBWaWV3cG9ydEVkZ2UuYm90dG9tKGZyYW1lKTtcblx0dGhpcy5sZWZ0ID0gVmlld3BvcnRFZGdlLmxlZnQoZnJhbWUpO1xuXG5cdHRoaXMuY2VudGVyID0gQ2VudGVyLngodGhpcy5sZWZ0LCB0aGlzLnJpZ2h0LCBcImNlbnRlciBvZiB2aWV3cG9ydFwiKTtcblx0dGhpcy5taWRkbGUgPSBDZW50ZXIueSh0aGlzLnRvcCwgdGhpcy5ib3R0b20sIFwibWlkZGxlIG9mIHZpZXdwb3J0XCIpO1xufTtcbkFzc2VydGFibGUuZXh0ZW5kKE1lKTtcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxNCBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuL3V0aWwvZW5zdXJlLmpzXCIpO1xudmFyIFFGcmFtZSA9IHJlcXVpcmUoXCIuL3FfZnJhbWUuanNcIik7XG52YXIgU2l6ZSA9IHJlcXVpcmUoXCIuL3ZhbHVlcy9zaXplLmpzXCIpO1xuXG52YXIgZmVhdHVyZXMgPSBudWxsO1xuXG5leHBvcnRzLmNyZWF0ZUZyYW1lID0gZnVuY3Rpb24ob3B0aW9ucywgY2FsbGJhY2spIHtcblx0cmV0dXJuIFFGcmFtZS5jcmVhdGUoZG9jdW1lbnQuYm9keSwgb3B0aW9ucywgZnVuY3Rpb24oZXJyLCBjYWxsYmFja0ZyYW1lKSB7XG5cdFx0aWYgKGZlYXR1cmVzID09PSBudWxsKSB7XG5cdFx0XHRkZXRlY3RCcm93c2VyRmVhdHVyZXMoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNhbGxiYWNrKGVyciwgY2FsbGJhY2tGcmFtZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjYWxsYmFjayhlcnIsIGNhbGxiYWNrRnJhbWUpO1xuXHRcdH1cblx0fSk7XG59O1xuXG5leHBvcnRzLmJyb3dzZXIgPSB7fTtcblxuZXhwb3J0cy5icm93c2VyLmVubGFyZ2VzRnJhbWVUb1BhZ2VTaXplID0gZnVuY3Rpb24gZW5sYXJnZXNGcmFtZVRvUGFnZVNpemUoKSB7XG5cdGVuc3VyZS5zaWduYXR1cmUoYXJndW1lbnRzLCBbXSk7XG5cdGVuc3VyZS50aGF0KFxuXHRcdGZlYXR1cmVzLmVubGFyZ2VzRnJhbWUgIT09IHVuZGVmaW5lZCxcblx0XHRcIk11c3QgY3JlYXRlIGEgZnJhbWUgYmVmb3JlIHVzaW5nIFF1aXhvdGUgYnJvd3NlciBmZWF0dXJlIGRldGVjdGlvbi5cIlxuXHQpO1xuXG5cdHJldHVybiBmZWF0dXJlcy5lbmxhcmdlc0ZyYW1lO1xufTtcblxuXG5mdW5jdGlvbiBkZXRlY3RCcm93c2VyRmVhdHVyZXMoY2FsbGJhY2spIHtcblx0dmFyIEZSQU1FX1dJRFRIID0gMzAwO1xuXHR2YXIgRlJBTUVfSEVJR0hUID0gMjAwO1xuXG5cdGZlYXR1cmVzID0ge307XG5cdHZhciBkZXRlY3RvciA9IFFGcmFtZS5jcmVhdGUoZG9jdW1lbnQuYm9keSwgeyB3aWR0aDogRlJBTUVfV0lEVEgsIGhlaWdodDogRlJBTUVfSEVJR0hUIH0sIGZ1bmN0aW9uKGVycikge1xuXHRcdGlmIChlcnIpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiRXJyb3IgZHVyaW5nIFF1aXhvdGUgYnJvd3NlciBmZWF0dXJlIGRldGVjdGlvbjpcIiwgZXJyKTtcblx0XHRcdHJldHVybiBjYWxsYmFjaygpO1xuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHRkZXRlY3Rvci5hZGQoXCI8ZGl2IHN0eWxlPSd3aWR0aDogXCIgKyAoRlJBTUVfV0lEVEggKyAyMDApICsgXCJweCc+Zm9yY2Ugc2Nyb2xsaW5nPC9kaXY+XCIpO1xuXHRcdFx0ZmVhdHVyZXMuZW5sYXJnZXNGcmFtZSA9ICFkZXRlY3Rvci52aWV3cG9ydCgpLndpZHRoLnZhbHVlKCkuZXF1YWxzKFNpemUuY3JlYXRlKEZSQU1FX1dJRFRIKSk7XG5cblx0XHRcdHJldHVybiBjYWxsYmFjaygpO1xuXHRcdH1cblx0XHRmaW5hbGx5IHtcblx0XHRcdGRldGVjdG9yLnJlbW92ZSgpO1xuXHRcdH1cblx0fSk7XG59IiwiLy8gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFNlZSBMSUNFTlNFLlRYVCBmb3IgZGV0YWlscy5cblwidXNlIHN0cmljdFwiO1xuXG4vLyBSdW50aW1lIGFzc2VydGlvbnMgZm9yIHByb2R1Y3Rpb24gY29kZS4gKENvbnRyYXN0IHRvIGFzc2VydC5qcywgd2hpY2ggaXMgZm9yIHRlc3QgY29kZS4pXG5cbnZhciBzaGltID0gcmVxdWlyZShcIi4vc2hpbS5qc1wiKTtcbnZhciBvb3AgPSByZXF1aXJlKFwiLi9vb3AuanNcIik7XG5cbmV4cG9ydHMudGhhdCA9IGZ1bmN0aW9uKHZhcmlhYmxlLCBtZXNzYWdlKSB7XG5cdGlmIChtZXNzYWdlID09PSB1bmRlZmluZWQpIG1lc3NhZ2UgPSBcIkV4cGVjdGVkIGNvbmRpdGlvbiB0byBiZSB0cnVlXCI7XG5cblx0aWYgKHZhcmlhYmxlID09PSBmYWxzZSkgdGhyb3cgbmV3IEVuc3VyZUV4Y2VwdGlvbihleHBvcnRzLnRoYXQsIG1lc3NhZ2UpO1xuXHRpZiAodmFyaWFibGUgIT09IHRydWUpIHRocm93IG5ldyBFbnN1cmVFeGNlcHRpb24oZXhwb3J0cy50aGF0LCBcIkV4cGVjdGVkIGNvbmRpdGlvbiB0byBiZSB0cnVlIG9yIGZhbHNlXCIpO1xufTtcblxuZXhwb3J0cy51bnJlYWNoYWJsZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0aWYgKCFtZXNzYWdlKSBtZXNzYWdlID0gXCJVbnJlYWNoYWJsZSBjb2RlIGV4ZWN1dGVkXCI7XG5cblx0dGhyb3cgbmV3IEVuc3VyZUV4Y2VwdGlvbihleHBvcnRzLnVucmVhY2hhYmxlLCBtZXNzYWdlKTtcbn07XG5cbmV4cG9ydHMuc2lnbmF0dXJlID0gZnVuY3Rpb24oYXJncywgc2lnbmF0dXJlKSB7XG5cdHNpZ25hdHVyZSA9IHNpZ25hdHVyZSB8fCBbXTtcblx0dmFyIGV4cGVjdGVkQXJnQ291bnQgPSBzaWduYXR1cmUubGVuZ3RoO1xuXHR2YXIgYWN0dWFsQXJnQ291bnQgPSBhcmdzLmxlbmd0aDtcblxuXHRpZiAoYWN0dWFsQXJnQ291bnQgPiBleHBlY3RlZEFyZ0NvdW50KSB7XG5cdFx0dGhyb3cgbmV3IEVuc3VyZUV4Y2VwdGlvbihcblx0XHRcdGV4cG9ydHMuc2lnbmF0dXJlLFxuXHRcdFx0XCJGdW5jdGlvbiBjYWxsZWQgd2l0aCB0b28gbWFueSBhcmd1bWVudHM6IGV4cGVjdGVkIFwiICsgZXhwZWN0ZWRBcmdDb3VudCArIFwiIGJ1dCBnb3QgXCIgKyBhY3R1YWxBcmdDb3VudFxuXHRcdCk7XG5cdH1cblxuXHR2YXIgdHlwZSwgYXJnLCBuYW1lO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHNpZ25hdHVyZS5sZW5ndGg7IGkrKykge1xuXHRcdHR5cGUgPSBzaWduYXR1cmVbaV07XG5cdFx0YXJnID0gYXJnc1tpXTtcblx0XHRuYW1lID0gXCJBcmd1bWVudCBcIiArIGk7XG5cblx0XHRpZiAoIXNoaW0uQXJyYXkuaXNBcnJheSh0eXBlKSkgdHlwZSA9IFsgdHlwZSBdO1xuXHRcdGlmICghdHlwZU1hdGNoZXModHlwZSwgYXJnLCBuYW1lKSkge1xuXHRcdFx0dmFyIG1lc3NhZ2UgPSBuYW1lICsgXCIgZXhwZWN0ZWQgXCIgKyBleHBsYWluVHlwZSh0eXBlKSArIFwiLCBidXQgd2FzIFwiO1xuXHRcdFx0dGhyb3cgbmV3IEVuc3VyZUV4Y2VwdGlvbihleHBvcnRzLnNpZ25hdHVyZSwgbWVzc2FnZSArIGV4cGxhaW5BcmcoYXJnKSk7XG5cdFx0fVxuXHR9XG59O1xuXG5mdW5jdGlvbiB0eXBlTWF0Y2hlcyh0eXBlLCBhcmcpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKG9uZVR5cGVNYXRjaGVzKHR5cGVbaV0sIGFyZykpIHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcblxuXHRmdW5jdGlvbiBvbmVUeXBlTWF0Y2hlcyh0eXBlLCBhcmcpIHtcblx0XHRzd2l0Y2ggKGdldFR5cGUoYXJnKSkge1xuXHRcdFx0Y2FzZSBcImJvb2xlYW5cIjogcmV0dXJuIHR5cGUgPT09IEJvb2xlYW47XG5cdFx0XHRjYXNlIFwic3RyaW5nXCI6IHJldHVybiB0eXBlID09PSBTdHJpbmc7XG5cdFx0XHRjYXNlIFwibnVtYmVyXCI6IHJldHVybiB0eXBlID09PSBOdW1iZXI7XG5cdFx0XHRjYXNlIFwiYXJyYXlcIjogcmV0dXJuIHR5cGUgPT09IEFycmF5O1xuXHRcdFx0Y2FzZSBcImZ1bmN0aW9uXCI6IHJldHVybiB0eXBlID09PSBGdW5jdGlvbjtcblx0XHRcdGNhc2UgXCJvYmplY3RcIjogcmV0dXJuIHR5cGUgPT09IE9iamVjdCB8fCBhcmcgaW5zdGFuY2VvZiB0eXBlO1xuXHRcdFx0Y2FzZSBcInVuZGVmaW5lZFwiOiByZXR1cm4gdHlwZSA9PT0gdW5kZWZpbmVkO1xuXHRcdFx0Y2FzZSBcIm51bGxcIjogcmV0dXJuIHR5cGUgPT09IG51bGw7XG5cdFx0XHRjYXNlIFwiTmFOXCI6IHJldHVybiBpc05hTih0eXBlKTtcblxuXHRcdFx0ZGVmYXVsdDogZXhwb3J0cy51bnJlYWNoYWJsZSgpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBleHBsYWluVHlwZSh0eXBlKSB7XG5cdHZhciBqb2luZXIgPSBcIlwiO1xuXHR2YXIgcmVzdWx0ID0gXCJcIjtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlLmxlbmd0aDsgaSsrKSB7XG5cdFx0cmVzdWx0ICs9IGpvaW5lciArIGV4cGxhaW5PbmVUeXBlKHR5cGVbaV0pO1xuXHRcdGpvaW5lciA9IChpID09PSB0eXBlLmxlbmd0aCAtIDIpID8gXCIsIG9yIFwiIDogXCIsIFwiO1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG5cblx0ZnVuY3Rpb24gZXhwbGFpbk9uZVR5cGUodHlwZSkge1xuXHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0Y2FzZSBCb29sZWFuOiByZXR1cm4gXCJib29sZWFuXCI7XG5cdFx0XHRjYXNlIFN0cmluZzogcmV0dXJuIFwic3RyaW5nXCI7XG5cdFx0XHRjYXNlIE51bWJlcjogcmV0dXJuIFwibnVtYmVyXCI7XG5cdFx0XHRjYXNlIEFycmF5OiByZXR1cm4gXCJhcnJheVwiO1xuXHRcdFx0Y2FzZSBGdW5jdGlvbjogcmV0dXJuIFwiZnVuY3Rpb25cIjtcblx0XHRcdGNhc2UgbnVsbDogcmV0dXJuIFwibnVsbFwiO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0aWYgKHR5cGVvZiB0eXBlID09PSBcIm51bWJlclwiICYmIGlzTmFOKHR5cGUpKSByZXR1cm4gXCJOYU5cIjtcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9vcC5jbGFzc05hbWUodHlwZSkgKyBcIiBpbnN0YW5jZVwiO1xuXHRcdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGV4cGxhaW5BcmcoYXJnKSB7XG5cdHZhciB0eXBlID0gZ2V0VHlwZShhcmcpO1xuXHRpZiAodHlwZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHR5cGU7XG5cblx0cmV0dXJuIG9vcC5pbnN0YW5jZU5hbWUoYXJnKSArIFwiIGluc3RhbmNlXCI7XG59XG5cbmZ1bmN0aW9uIGdldFR5cGUodmFyaWFibGUpIHtcblx0dmFyIHR5cGUgPSB0eXBlb2YgdmFyaWFibGU7XG5cdGlmICh2YXJpYWJsZSA9PT0gbnVsbCkgdHlwZSA9IFwibnVsbFwiO1xuXHRpZiAoc2hpbS5BcnJheS5pc0FycmF5KHZhcmlhYmxlKSkgdHlwZSA9IFwiYXJyYXlcIjtcblx0aWYgKHR5cGUgPT09IFwibnVtYmVyXCIgJiYgaXNOYU4odmFyaWFibGUpKSB0eXBlID0gXCJOYU5cIjtcblx0cmV0dXJuIHR5cGU7XG59XG5cblxuLyoqKioqL1xuXG52YXIgRW5zdXJlRXhjZXB0aW9uID0gZXhwb3J0cy5FbnN1cmVFeGNlcHRpb24gPSBmdW5jdGlvbihmblRvUmVtb3ZlRnJvbVN0YWNrVHJhY2UsIG1lc3NhZ2UpIHtcblx0aWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBmblRvUmVtb3ZlRnJvbVN0YWNrVHJhY2UpO1xuXHRlbHNlIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrO1xuXHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufTtcbkVuc3VyZUV4Y2VwdGlvbi5wcm90b3R5cGUgPSBzaGltLk9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcbkVuc3VyZUV4Y2VwdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFbnN1cmVFeGNlcHRpb247XG5FbnN1cmVFeGNlcHRpb24ucHJvdG90eXBlLm5hbWUgPSBcIkVuc3VyZUV4Y2VwdGlvblwiO1xuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE0IFRpdGFuaXVtIEkuVC4gTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBGb3IgbGljZW5zZSwgc2VlIFwiUkVBRE1FXCIgb3IgXCJMSUNFTlNFXCIgZmlsZS5cblwidXNlIHN0cmljdFwiO1xuXG4vLyBjYW4ndCB1c2UgZW5zdXJlLmpzIGR1ZSB0byBjaXJjdWxhciBkZXBlbmRlbmN5XG52YXIgc2hpbSA9IHJlcXVpcmUoXCIuL3NoaW0uanNcIik7XG5cbmV4cG9ydHMuY2xhc3NOYW1lID0gZnVuY3Rpb24oY29uc3RydWN0b3IpIHtcblx0aWYgKHR5cGVvZiBjb25zdHJ1Y3RvciAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgYSBjb25zdHJ1Y3RvclwiKTtcblx0cmV0dXJuIHNoaW0uRnVuY3Rpb24ubmFtZShjb25zdHJ1Y3Rvcik7XG59O1xuXG5leHBvcnRzLmluc3RhbmNlTmFtZSA9IGZ1bmN0aW9uKG9iaikge1xuXHR2YXIgcHJvdG90eXBlID0gc2hpbS5PYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcblx0aWYgKHByb3RvdHlwZSA9PT0gbnVsbCkgcmV0dXJuIFwiPG5vIHByb3RvdHlwZT5cIjtcblxuXHR2YXIgY29uc3RydWN0b3IgPSBwcm90b3R5cGUuY29uc3RydWN0b3I7XG5cdGlmIChjb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkIHx8IGNvbnN0cnVjdG9yID09PSBudWxsKSByZXR1cm4gXCI8YW5vbj5cIjtcblxuXHRyZXR1cm4gc2hpbS5GdW5jdGlvbi5uYW1lKGNvbnN0cnVjdG9yKTtcbn07XG5cbmV4cG9ydHMuZXh0ZW5kRm4gPSBmdW5jdGlvbiBleHRlbmRGbihwYXJlbnRDb25zdHJ1Y3Rvcikge1xuXHRyZXR1cm4gZnVuY3Rpb24oY2hpbGRDb25zdHJ1Y3Rvcikge1xuXHRcdGNoaWxkQ29uc3RydWN0b3IucHJvdG90eXBlID0gc2hpbS5PYmplY3QuY3JlYXRlKHBhcmVudENvbnN0cnVjdG9yLnByb3RvdHlwZSk7XG5cdFx0Y2hpbGRDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjaGlsZENvbnN0cnVjdG9yO1xuXHR9O1xufTtcblxuZXhwb3J0cy5tYWtlQWJzdHJhY3QgPSBmdW5jdGlvbiBtYWtlQWJzdHJhY3QoY29uc3RydWN0b3IsIG1ldGhvZHMpIHtcblx0dmFyIG5hbWUgPSBzaGltLkZ1bmN0aW9uLm5hbWUoY29uc3RydWN0b3IpO1xuXHRzaGltLkFycmF5LmZvckVhY2gobWV0aG9kcywgZnVuY3Rpb24obWV0aG9kKSB7XG5cdFx0Y29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihuYW1lICsgXCIgc3ViY2xhc3NlcyBtdXN0IGltcGxlbWVudCBcIiArIG1ldGhvZCArIFwiKCkgbWV0aG9kXCIpO1xuXHRcdH07XG5cdH0pO1xuXG5cdGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jaGVja0Fic3RyYWN0TWV0aG9kcyA9IGZ1bmN0aW9uIGNoZWNrQWJzdHJhY3RNZXRob2RzKCkge1xuXHRcdHZhciB1bmltcGxlbWVudGVkID0gW107XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHNoaW0uQXJyYXkuZm9yRWFjaChtZXRob2RzLCBmdW5jdGlvbihuYW1lKSB7XG5cdFx0XHRpZiAoc2VsZltuYW1lXSA9PT0gY29uc3RydWN0b3IucHJvdG90eXBlW25hbWVdKSB1bmltcGxlbWVudGVkLnB1c2gobmFtZSArIFwiKClcIik7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHVuaW1wbGVtZW50ZWQ7XG5cdH07XG59OyIsIi8vIENvcHlyaWdodCAoYykgMjAxNCBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5BcnJheSA9IHtcblxuXHQvLyBXT1JLQVJPVU5EIElFIDg6IG5vIEFycmF5LmlzQXJyYXlcblx0aXNBcnJheTogZnVuY3Rpb24gaXNBcnJheSh0aGluZykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KSByZXR1cm4gQXJyYXkuaXNBcnJheSh0aGluZyk7XG5cblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaW5nKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcblx0fSxcblxuXHQvLyBXT1JLQVJPVU5EIElFIDg6IG5vIEFycmF5LmZvckVhY2hcblx0Zm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChvYmosIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG5cdFx0Lypqc2hpbnQgYml0d2lzZTpmYWxzZSwgZXFlcWVxOmZhbHNlLCAtVzA0MTpmYWxzZSAqL1xuXG5cdFx0aWYgKEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKSByZXR1cm4gb2JqLmZvckVhY2goY2FsbGJhY2ssIHRoaXNBcmcpO1xuXG5cdFx0Ly8gVGhpcyB3b3JrYXJvdW5kIGJhc2VkIG9uIHBvbHlmaWxsIGNvZGUgZnJvbSBNRE46XG5cdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZm9yRWFjaFxuXG5cdFx0Ly8gUHJvZHVjdGlvbiBzdGVwcyBvZiBFQ01BLTI2MiwgRWRpdGlvbiA1LCAxNS40LjQuMThcblx0XHQvLyBSZWZlcmVuY2U6IGh0dHA6Ly9lczUuZ2l0aHViLmlvLyN4MTUuNC40LjE4XG5cbiAgICB2YXIgVCwgaztcblxuICAgIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignIHRoaXMgaXMgbnVsbCBvciBub3QgZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIC8vIDEuIExldCBPIGJlIHRoZSByZXN1bHQgb2YgY2FsbGluZyBUb09iamVjdCBwYXNzaW5nIHRoZSB8dGhpc3wgdmFsdWUgYXMgdGhlIGFyZ3VtZW50LlxuICAgIHZhciBPID0gT2JqZWN0KG9iaik7XG5cbiAgICAvLyAyLiBMZXQgbGVuVmFsdWUgYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBHZXQgaW50ZXJuYWwgbWV0aG9kIG9mIE8gd2l0aCB0aGUgYXJndW1lbnQgXCJsZW5ndGhcIi5cbiAgICAvLyAzLiBMZXQgbGVuIGJlIFRvVWludDMyKGxlblZhbHVlKS5cbiAgICB2YXIgbGVuID0gTy5sZW5ndGggPj4+IDA7XG5cbiAgICAvLyA0LiBJZiBJc0NhbGxhYmxlKGNhbGxiYWNrKSBpcyBmYWxzZSwgdGhyb3cgYSBUeXBlRXJyb3IgZXhjZXB0aW9uLlxuICAgIC8vIFNlZTogaHR0cDovL2VzNS5naXRodWIuY29tLyN4OS4xMVxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihjYWxsYmFjayArICcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICAvLyA1LiBJZiB0aGlzQXJnIHdhcyBzdXBwbGllZCwgbGV0IFQgYmUgdGhpc0FyZzsgZWxzZSBsZXQgVCBiZSB1bmRlZmluZWQuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICBUID0gdGhpc0FyZztcbiAgICB9XG5cbiAgICAvLyA2LiBMZXQgayBiZSAwXG4gICAgayA9IDA7XG5cbiAgICAvLyA3LiBSZXBlYXQsIHdoaWxlIGsgPCBsZW5cbiAgICB3aGlsZSAoayA8IGxlbikge1xuXG4gICAgICB2YXIga1ZhbHVlO1xuXG4gICAgICAvLyBhLiBMZXQgUGsgYmUgVG9TdHJpbmcoaykuXG4gICAgICAvLyAgIFRoaXMgaXMgaW1wbGljaXQgZm9yIExIUyBvcGVyYW5kcyBvZiB0aGUgaW4gb3BlcmF0b3JcbiAgICAgIC8vIGIuIExldCBrUHJlc2VudCBiZSB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIEhhc1Byb3BlcnR5IGludGVybmFsIG1ldGhvZCBvZiBPIHdpdGggYXJndW1lbnQgUGsuXG4gICAgICAvLyAgIFRoaXMgc3RlcCBjYW4gYmUgY29tYmluZWQgd2l0aCBjXG4gICAgICAvLyBjLiBJZiBrUHJlc2VudCBpcyB0cnVlLCB0aGVuXG4gICAgICBpZiAoayBpbiBPKSB7XG5cbiAgICAgICAgLy8gaS4gTGV0IGtWYWx1ZSBiZSB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIEdldCBpbnRlcm5hbCBtZXRob2Qgb2YgTyB3aXRoIGFyZ3VtZW50IFBrLlxuICAgICAgICBrVmFsdWUgPSBPW2tdO1xuXG4gICAgICAgIC8vIGlpLiBDYWxsIHRoZSBDYWxsIGludGVybmFsIG1ldGhvZCBvZiBjYWxsYmFjayB3aXRoIFQgYXMgdGhlIHRoaXMgdmFsdWUgYW5kXG4gICAgICAgIC8vIGFyZ3VtZW50IGxpc3QgY29udGFpbmluZyBrVmFsdWUsIGssIGFuZCBPLlxuICAgICAgICBjYWxsYmFjay5jYWxsKFQsIGtWYWx1ZSwgaywgTyk7XG4gICAgICB9XG4gICAgICAvLyBkLiBJbmNyZWFzZSBrIGJ5IDEuXG4gICAgICBrKys7XG4gICAgfVxuICAgIC8vIDguIHJldHVybiB1bmRlZmluZWRcblx0fVxuXG59O1xuXG5cbmV4cG9ydHMuRXZlbnRUYXJnZXQgPSB7XG5cblx0Ly8gV09SS0FST1VORCBJRTg6IG5vIEV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoKVxuXHRhZGRFdmVudExpc3RlbmVyOiBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQsIGV2ZW50LCBjYWxsYmFjaykge1xuXHRcdGlmIChlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHJldHVybiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrKTtcblxuXHRcdGVsZW1lbnQuYXR0YWNoRXZlbnQoXCJvblwiICsgZXZlbnQsIGNhbGxiYWNrKTtcblx0fVxuXG59O1xuXG5cbmV4cG9ydHMuRG9jdW1lbnQgPSB7XG5cblx0Ly8gV09SS0FST1VORCBJRTg6IG5vIGRvY3VtZW50LmhlYWRcblx0aGVhZDogZnVuY3Rpb24gaGVhZChkb2MpIHtcblx0XHRpZiAoZG9jLmhlYWQpIHJldHVybiBkb2MuaGVhZDtcblxuXHRcdHJldHVybiBkb2MucXVlcnlTZWxlY3RvcihcImhlYWRcIik7XG5cdH1cblxufTtcblxuXG5leHBvcnRzLkZ1bmN0aW9uID0ge1xuXG5cdC8vIFdPUktBUk9VTkQgSUUgOCwgSUUgOSwgSUUgMTAsIElFIDExOiBubyBmdW5jdGlvbi5uYW1lXG5cdG5hbWU6IGZ1bmN0aW9uIG5hbWUoZm4pIHtcblx0XHRpZiAoZm4ubmFtZSkgcmV0dXJuIGZuLm5hbWU7XG5cblx0XHQvLyBCYXNlZCBvbiBjb2RlIGJ5IEphc29uIEJ1bnRpbmcgZXQgYWwsIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzMzMjQyOVxuXHRcdHZhciBmdW5jTmFtZVJlZ2V4ID0gL2Z1bmN0aW9uXFxzKyguezEsfSlcXHMqXFwoLztcblx0XHR2YXIgcmVzdWx0cyA9IChmdW5jTmFtZVJlZ2V4KS5leGVjKChmbikudG9TdHJpbmcoKSk7XG5cdFx0cmV0dXJuIChyZXN1bHRzICYmIHJlc3VsdHMubGVuZ3RoID4gMSkgPyByZXN1bHRzWzFdIDogXCI8YW5vbj5cIjtcblx0fSxcblxufTtcblxuXG5leHBvcnRzLk9iamVjdCA9IHtcblxuXHQvLyBXT1JLQVJPVU5EIElFIDg6IG5vIE9iamVjdC5jcmVhdGUoKVxuXHRjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZShwcm90b3R5cGUpIHtcblx0XHRpZiAoT2JqZWN0LmNyZWF0ZSkgcmV0dXJuIE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcblxuXHRcdHZhciBUZW1wID0gZnVuY3Rpb24gVGVtcCgpIHt9O1xuXHRcdFRlbXAucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdHJldHVybiBuZXcgVGVtcCgpO1xuXHR9LFxuXG5cdC8vIFdPUktBUk9VTkQgSUUgODogbm8gT2JqZWN0LmdldFByb3RvdHlwZU9mXG5cdC8vIENhdXRpb246IERvZXNuJ3Qgd29yayBvbiBJRSA4IGlmIGNvbnN0cnVjdG9yIGhhcyBiZWVuIGNoYW5nZWQsIGFzIGlzIHRoZSBjYXNlIHdpdGggYSBzdWJjbGFzcy5cblx0Z2V0UHJvdG90eXBlT2Y6IGZ1bmN0aW9uIGdldFByb3RvdHlwZU9mKG9iaikge1xuXHRcdGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YpIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcblxuXHRcdHZhciByZXN1bHQgPSBvYmouY29uc3RydWN0b3IgPyBvYmouY29uc3RydWN0b3IucHJvdG90eXBlIDogbnVsbDtcblx0XHRyZXR1cm4gcmVzdWx0IHx8IG51bGw7XG5cdH0sXG5cblx0Ly8gV09SS0FST1VORCBJRSA4OiBObyBPYmplY3Qua2V5c1xuXHRrZXlzOiBmdW5jdGlvbiBrZXlzKG9iaikge1xuXHRcdGlmIChPYmplY3Qua2V5cykgcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7XG5cblx0XHQvLyBGcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9rZXlzXG5cdCAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxcblx0ICAgICAgaGFzRG9udEVudW1CdWcgPSAhKHsgdG9TdHJpbmc6IG51bGwgfSkucHJvcGVydHlJc0VudW1lcmFibGUoJ3RvU3RyaW5nJyksXG5cdCAgICAgIGRvbnRFbnVtcyA9IFtcblx0ICAgICAgICAndG9TdHJpbmcnLFxuXHQgICAgICAgICd0b0xvY2FsZVN0cmluZycsXG5cdCAgICAgICAgJ3ZhbHVlT2YnLFxuXHQgICAgICAgICdoYXNPd25Qcm9wZXJ0eScsXG5cdCAgICAgICAgJ2lzUHJvdG90eXBlT2YnLFxuXHQgICAgICAgICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG5cdCAgICAgICAgJ2NvbnN0cnVjdG9yJ1xuXHQgICAgICBdLFxuXHQgICAgICBkb250RW51bXNMZW5ndGggPSBkb250RW51bXMubGVuZ3RoO1xuXG5cdCAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnICYmICh0eXBlb2Ygb2JqICE9PSAnZnVuY3Rpb24nIHx8IG9iaiA9PT0gbnVsbCkpIHtcblx0ICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5rZXlzIGNhbGxlZCBvbiBub24tb2JqZWN0Jyk7XG5cdCAgfVxuXG5cdCAgdmFyIHJlc3VsdCA9IFtdLCBwcm9wLCBpO1xuXG5cdCAgZm9yIChwcm9wIGluIG9iaikge1xuXHQgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkge1xuXHQgICAgICByZXN1bHQucHVzaChwcm9wKTtcblx0ICAgIH1cblx0ICB9XG5cblx0ICBpZiAoaGFzRG9udEVudW1CdWcpIHtcblx0ICAgIGZvciAoaSA9IDA7IGkgPCBkb250RW51bXNMZW5ndGg7IGkrKykge1xuXHQgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGRvbnRFbnVtc1tpXSkpIHtcblx0ICAgICAgICByZXN1bHQucHVzaChkb250RW51bXNbaV0pO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiByZXN1bHQ7XG5cdH1cblxufTtcblxuXG5leHBvcnRzLldpbmRvdyA9IHtcblxuXHQvLyBXT1JLQVJPVU5EIElFIDg6IE5vIFdpbmRvdy5wYWdlWE9mZnNldFxuXHRwYWdlWE9mZnNldDogZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xuXHRcdGlmICh3aW5kb3cucGFnZVhPZmZzZXQgIT09IHVuZGVmaW5lZCkgcmV0dXJuIHdpbmRvdy5wYWdlWE9mZnNldDtcblxuXHRcdC8vIEJhc2VkIG9uIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3cuc2Nyb2xsWVxuXHRcdHZhciBpc0NTUzFDb21wYXQgPSAoKGRvY3VtZW50LmNvbXBhdE1vZGUgfHwgXCJcIikgPT09IFwiQ1NTMUNvbXBhdFwiKTtcblx0XHRyZXR1cm4gaXNDU1MxQ29tcGF0ID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQgOiBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG5cdH0sXG5cblxuXHQvLyBXT1JLQVJPVU5EIElFIDg6IE5vIFdpbmRvdy5wYWdlWU9mZnNldFxuXHRwYWdlWU9mZnNldDogZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xuXHRcdGlmICh3aW5kb3cucGFnZVlPZmZzZXQgIT09IHVuZGVmaW5lZCkgcmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldDtcblxuXHRcdC8vIEJhc2VkIG9uIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3cuc2Nyb2xsWVxuXHRcdHZhciBpc0NTUzFDb21wYXQgPSAoKGRvY3VtZW50LmNvbXBhdE1vZGUgfHwgXCJcIikgPT09IFwiQ1NTMUNvbXBhdFwiKTtcblx0XHRyZXR1cm4gaXNDU1MxQ29tcGF0ID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA6IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuXHR9XG5cbn07IiwiLy8gQ29weXJpZ2h0IChjKSAyMDE0IFRpdGFuaXVtIEkuVC4gTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBGb3IgbGljZW5zZSwgc2VlIFwiUkVBRE1FXCIgb3IgXCJMSUNFTlNFXCIgZmlsZS5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgZW5zdXJlID0gcmVxdWlyZShcIi4uL3V0aWwvZW5zdXJlLmpzXCIpO1xudmFyIFZhbHVlID0gcmVxdWlyZShcIi4vdmFsdWUuanNcIik7XG5cbnZhciBNZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUGl4ZWxzKGFtb3VudCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBOdW1iZXIgXSk7XG5cdHRoaXMuX2Ftb3VudCA9IGFtb3VudDtcbn07XG5WYWx1ZS5leHRlbmQoTWUpO1xuXG5NZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoYW1vdW50KSB7XG5cdHJldHVybiBuZXcgTWUoYW1vdW50KTtcbn07XG5cbk1lLnByb3RvdHlwZS5jb21wYXRpYmlsaXR5ID0gZnVuY3Rpb24gY29tcGF0aWJpbGl0eSgpIHtcblx0cmV0dXJuIFsgTWUgXTtcbn07XG5cbk1lLnByb3RvdHlwZS5wbHVzID0gVmFsdWUuc2FmZShmdW5jdGlvbiBwbHVzKG9wZXJhbmQpIHtcblx0cmV0dXJuIG5ldyBNZSh0aGlzLl9hbW91bnQgKyBvcGVyYW5kLl9hbW91bnQpO1xufSk7XG5cbk1lLnByb3RvdHlwZS5taW51cyA9IFZhbHVlLnNhZmUoZnVuY3Rpb24gbWludXMob3BlcmFuZCkge1xuXHRyZXR1cm4gbmV3IE1lKHRoaXMuX2Ftb3VudCAtIG9wZXJhbmQuX2Ftb3VudCk7XG59KTtcblxuTWUucHJvdG90eXBlLnRpbWVzID0gZnVuY3Rpb24gdGltZXMob3BlcmFuZCkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBOdW1iZXIgXSk7XG5cblx0cmV0dXJuIG5ldyBNZSh0aGlzLl9hbW91bnQgKiBvcGVyYW5kKTtcbn07XG5cbk1lLnByb3RvdHlwZS5hdmVyYWdlID0gVmFsdWUuc2FmZShmdW5jdGlvbiBhdmVyYWdlKG9wZXJhbmQpIHtcblx0cmV0dXJuIG5ldyBNZSgodGhpcy5fYW1vdW50ICsgb3BlcmFuZC5fYW1vdW50KSAvIDIpO1xufSk7XG5cbk1lLnByb3RvdHlwZS5jb21wYXJlID0gVmFsdWUuc2FmZShmdW5jdGlvbiBjb21wYXJlKG9wZXJhbmQpIHtcblx0dmFyIGRpZmZlcmVuY2UgPSB0aGlzLl9hbW91bnQgLSBvcGVyYW5kLl9hbW91bnQ7XG5cdGlmIChNYXRoLmFicyhkaWZmZXJlbmNlKSA8PSAwLjUpIHJldHVybiAwO1xuXHRlbHNlIHJldHVybiBkaWZmZXJlbmNlO1xufSk7XG5cbk1lLnByb3RvdHlwZS5kaWZmID0gVmFsdWUuc2FmZShmdW5jdGlvbiBkaWZmKGV4cGVjdGVkKSB7XG5cdGlmICh0aGlzLmNvbXBhcmUoZXhwZWN0ZWQpID09PSAwKSByZXR1cm4gXCJcIjtcblxuXHR2YXIgZGlmZmVyZW5jZSA9IE1hdGguYWJzKHRoaXMuX2Ftb3VudCAtIGV4cGVjdGVkLl9hbW91bnQpO1xuXG5cdHZhciBkZXNjID0gZGlmZmVyZW5jZTtcblx0aWYgKGRpZmZlcmVuY2UgKiAxMDAgIT09IE1hdGguZmxvb3IoZGlmZmVyZW5jZSAqIDEwMCkpIGRlc2MgPSBcImFib3V0IFwiICsgZGlmZmVyZW5jZS50b0ZpeGVkKDIpO1xuXHRyZXR1cm4gZGVzYyArIFwicHhcIjtcbn0pO1xuXG5NZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblx0cmV0dXJuIHRoaXMuX2Ftb3VudCArIFwicHhcIjtcbn07XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgVGl0YW5pdW0gSS5ULiBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIEZvciBsaWNlbnNlLCBzZWUgXCJSRUFETUVcIiBvciBcIkxJQ0VOU0VcIiBmaWxlLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlbnN1cmUgPSByZXF1aXJlKFwiLi4vdXRpbC9lbnN1cmUuanNcIik7XG52YXIgVmFsdWUgPSByZXF1aXJlKFwiLi92YWx1ZS5qc1wiKTtcbnZhciBQaXhlbHMgPSByZXF1aXJlKFwiLi9waXhlbHMuanNcIik7XG52YXIgU2l6ZSA9IHJlcXVpcmUoXCIuL3NpemUuanNcIik7XG5cbnZhciBYX0RJTUVOU0lPTiA9IFwieFwiO1xudmFyIFlfRElNRU5TSU9OID0gXCJ5XCI7XG5cbnZhciBNZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUG9zaXRpb24oZGltZW5zaW9uLCB2YWx1ZSkge1xuXHRlbnN1cmUuc2lnbmF0dXJlKGFyZ3VtZW50cywgWyBTdHJpbmcsIFtOdW1iZXIsIFBpeGVsc10gXSk7XG5cblx0dGhpcy5fZGltZW5zaW9uID0gZGltZW5zaW9uO1xuXHR0aGlzLl92YWx1ZSA9ICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpID8gUGl4ZWxzLmNyZWF0ZSh2YWx1ZSkgOiB2YWx1ZTtcbn07XG5WYWx1ZS5leHRlbmQoTWUpO1xuXG5NZS54ID0gZnVuY3Rpb24geCh2YWx1ZSkge1xuXHRyZXR1cm4gbmV3IE1lKFhfRElNRU5TSU9OLCB2YWx1ZSk7XG59O1xuXG5NZS55ID0gZnVuY3Rpb24geSh2YWx1ZSkge1xuXHRyZXR1cm4gbmV3IE1lKFlfRElNRU5TSU9OLCB2YWx1ZSk7XG59O1xuXG5NZS5wcm90b3R5cGUuY29tcGF0aWJpbGl0eSA9IGZ1bmN0aW9uIGNvbXBhdGliaWxpdHkoKSB7XG5cdHJldHVybiBbIE1lLCBTaXplIF07XG59O1xuXG5NZS5wcm90b3R5cGUucGx1cyA9IFZhbHVlLnNhZmUoZnVuY3Rpb24gcGx1cyhvcGVyYW5kKSB7XG5cdGNoZWNrQXhpcyh0aGlzLCBvcGVyYW5kKTtcblx0cmV0dXJuIG5ldyBNZSh0aGlzLl9kaW1lbnNpb24sIHRoaXMuX3ZhbHVlLnBsdXMob3BlcmFuZC50b1BpeGVscygpKSk7XG59KTtcblxuTWUucHJvdG90eXBlLm1pbnVzID0gVmFsdWUuc2FmZShmdW5jdGlvbiBtaW51cyhvcGVyYW5kKSB7XG5cdGNoZWNrQXhpcyh0aGlzLCBvcGVyYW5kKTtcblx0cmV0dXJuIG5ldyBNZSh0aGlzLl9kaW1lbnNpb24sIHRoaXMuX3ZhbHVlLm1pbnVzKG9wZXJhbmQudG9QaXhlbHMoKSkpO1xufSk7XG5cbk1lLnByb3RvdHlwZS5taWRwb2ludCA9IFZhbHVlLnNhZmUoZnVuY3Rpb24gbWlkcG9pbnQob3BlcmFuZCkge1xuXHRjaGVja0F4aXModGhpcywgb3BlcmFuZCk7XG5cdHJldHVybiBuZXcgTWUodGhpcy5fZGltZW5zaW9uLCB0aGlzLl92YWx1ZS5hdmVyYWdlKG9wZXJhbmQudG9QaXhlbHMoKSkpO1xufSk7XG5cbk1lLnByb3RvdHlwZS5kaWZmID0gVmFsdWUuc2FmZShmdW5jdGlvbiBkaWZmKGV4cGVjdGVkKSB7XG5cdGNoZWNrQXhpcyh0aGlzLCBleHBlY3RlZCk7XG5cblx0dmFyIGFjdHVhbFZhbHVlID0gdGhpcy5fdmFsdWU7XG5cdHZhciBleHBlY3RlZFZhbHVlID0gZXhwZWN0ZWQuX3ZhbHVlO1xuXHRpZiAoYWN0dWFsVmFsdWUuZXF1YWxzKGV4cGVjdGVkVmFsdWUpKSByZXR1cm4gXCJcIjtcblxuXHR2YXIgZGlyZWN0aW9uO1xuXHR2YXIgY29tcGFyaXNvbiA9IGFjdHVhbFZhbHVlLmNvbXBhcmUoZXhwZWN0ZWRWYWx1ZSk7XG5cdGlmICh0aGlzLl9kaW1lbnNpb24gPT09IFhfRElNRU5TSU9OKSBkaXJlY3Rpb24gPSBjb21wYXJpc29uIDwgMCA/IFwiZnVydGhlciBsZWZ0XCIgOiBcImZ1cnRoZXIgcmlnaHRcIjtcblx0ZWxzZSBkaXJlY3Rpb24gPSBjb21wYXJpc29uIDwgMCA/IFwiaGlnaGVyXCIgOiBcImxvd2VyXCI7XG5cblx0cmV0dXJuIGFjdHVhbFZhbHVlLmRpZmYoZXhwZWN0ZWRWYWx1ZSkgKyBcIiBcIiArIGRpcmVjdGlvbjtcbn0pO1xuXG5NZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblx0cmV0dXJuIHRoaXMuX3ZhbHVlLnRvU3RyaW5nKCk7XG59O1xuXG5NZS5wcm90b3R5cGUudG9QaXhlbHMgPSBmdW5jdGlvbiB0b1BpeGVscygpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblx0cmV0dXJuIHRoaXMuX3ZhbHVlO1xufTtcblxuZnVuY3Rpb24gY2hlY2tBeGlzKHNlbGYsIG90aGVyKSB7XG5cdGlmIChvdGhlciBpbnN0YW5jZW9mIE1lKSB7XG5cdFx0ZW5zdXJlLnRoYXQoc2VsZi5fZGltZW5zaW9uID09PSBvdGhlci5fZGltZW5zaW9uLCBcIkNhbid0IGNvbXBhcmUgWCBjb29yZGluYXRlIHRvIFkgY29vcmRpbmF0ZVwiKTtcblx0fVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE0IFRpdGFuaXVtIEkuVC4gTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBGb3IgbGljZW5zZSwgc2VlIFwiUkVBRE1FXCIgb3IgXCJMSUNFTlNFXCIgZmlsZS5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgZW5zdXJlID0gcmVxdWlyZShcIi4uL3V0aWwvZW5zdXJlLmpzXCIpO1xudmFyIFZhbHVlID0gcmVxdWlyZShcIi4vdmFsdWUuanNcIik7XG52YXIgUGl4ZWxzID0gcmVxdWlyZShcIi4vcGl4ZWxzLmpzXCIpO1xuXG52YXIgTWUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFNpemUodmFsdWUpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFsgW051bWJlciwgUGl4ZWxzXSBdKTtcblxuXHR0aGlzLl92YWx1ZSA9ICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpID8gUGl4ZWxzLmNyZWF0ZSh2YWx1ZSkgOiB2YWx1ZTtcbn07XG5WYWx1ZS5leHRlbmQoTWUpO1xuXG5NZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUodmFsdWUpIHtcblx0cmV0dXJuIG5ldyBNZSh2YWx1ZSk7XG59O1xuXG5NZS5wcm90b3R5cGUuY29tcGF0aWJpbGl0eSA9IGZ1bmN0aW9uIGNvbXBhdGliaWxpdHkoKSB7XG5cdHJldHVybiBbIE1lIF07XG59O1xuXG5NZS5wcm90b3R5cGUucGx1cyA9IFZhbHVlLnNhZmUoZnVuY3Rpb24gcGx1cyhvcGVyYW5kKSB7XG5cdHJldHVybiBuZXcgTWUodGhpcy5fdmFsdWUucGx1cyhvcGVyYW5kLl92YWx1ZSkpO1xufSk7XG5cbk1lLnByb3RvdHlwZS5taW51cyA9IFZhbHVlLnNhZmUoZnVuY3Rpb24gbWludXMob3BlcmFuZCkge1xuXHRyZXR1cm4gbmV3IE1lKHRoaXMuX3ZhbHVlLm1pbnVzKG9wZXJhbmQuX3ZhbHVlKSk7XG59KTtcblxuTWUucHJvdG90eXBlLnRpbWVzID0gZnVuY3Rpb24gdGltZXMob3BlcmFuZCkge1xuXHRyZXR1cm4gbmV3IE1lKHRoaXMuX3ZhbHVlLnRpbWVzKG9wZXJhbmQpKTtcbn07XG5cbk1lLnByb3RvdHlwZS5jb21wYXJlID0gVmFsdWUuc2FmZShmdW5jdGlvbiBjb21wYXJlKHRoYXQpIHtcblx0cmV0dXJuIHRoaXMuX3ZhbHVlLmNvbXBhcmUodGhhdC5fdmFsdWUpO1xufSk7XG5cbk1lLnByb3RvdHlwZS5kaWZmID0gVmFsdWUuc2FmZShmdW5jdGlvbiBkaWZmKGV4cGVjdGVkKSB7XG5cdHZhciBhY3R1YWxWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xuXHR2YXIgZXhwZWN0ZWRWYWx1ZSA9IGV4cGVjdGVkLl92YWx1ZTtcblxuXHRpZiAoYWN0dWFsVmFsdWUuZXF1YWxzKGV4cGVjdGVkVmFsdWUpKSByZXR1cm4gXCJcIjtcblxuXHR2YXIgZGVzYyA9IGFjdHVhbFZhbHVlLmNvbXBhcmUoZXhwZWN0ZWRWYWx1ZSkgPiAwID8gXCIgbGFyZ2VyXCIgOiBcIiBzbWFsbGVyXCI7XG5cdHJldHVybiBhY3R1YWxWYWx1ZS5kaWZmKGV4cGVjdGVkVmFsdWUpICsgZGVzYztcbn0pO1xuXG5NZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblx0cmV0dXJuIHRoaXMuX3ZhbHVlLnRvU3RyaW5nKCk7XG59O1xuXG5NZS5wcm90b3R5cGUudG9QaXhlbHMgPSBmdW5jdGlvbiB0b1BpeGVscygpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblx0cmV0dXJuIHRoaXMuX3ZhbHVlO1xufTtcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxNCBUaXRhbml1bSBJLlQuIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gRm9yIGxpY2Vuc2UsIHNlZSBcIlJFQURNRVwiIG9yIFwiTElDRU5TRVwiIGZpbGUuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVuc3VyZSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vuc3VyZS5qc1wiKTtcbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vdXRpbC9vb3AuanNcIik7XG52YXIgc2hpbSA9IHJlcXVpcmUoXCIuLi91dGlsL3NoaW0uanNcIik7XG5cbnZhciBNZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gVmFsdWUoKSB7fTtcbk1lLmV4dGVuZCA9IG9vcC5leHRlbmRGbihNZSk7XG5vb3AubWFrZUFic3RyYWN0KE1lLCBbXG5cdFwiZGlmZlwiLFxuXHRcInRvU3RyaW5nXCIsXG5cdFwiY29tcGF0aWJpbGl0eVwiXG5dKTtcblxuTWUuc2FmZSA9IGZ1bmN0aW9uIHNhZmUoZm4pIHtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGVuc3VyZUNvbXBhdGliaWxpdHkodGhpcywgdGhpcy5jb21wYXRpYmlsaXR5KCksIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdH07XG59O1xuXG5NZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSgpIHtcblx0ZW5zdXJlLnNpZ25hdHVyZShhcmd1bWVudHMsIFtdKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5NZS5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzKHRoYXQpIHtcblx0cmV0dXJuIHRoaXMuZGlmZih0aGF0KSA9PT0gXCJcIjtcbn07XG5cbmZ1bmN0aW9uIGVuc3VyZUNvbXBhdGliaWxpdHkoc2VsZiwgY29tcGF0aWJsZSwgYXJncykge1xuXHR2YXIgYXJnO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHsgICAvLyBhcmdzIGlzIG5vdCBhbiBBcnJheSwgY2FuJ3QgdXNlIGZvckVhY2hcblx0XHRhcmcgPSBhcmdzW2ldO1xuXHRcdGNoZWNrT25lQXJnKHNlbGYsIGNvbXBhdGlibGUsIGFyZyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY2hlY2tPbmVBcmcoc2VsZiwgY29tcGF0aWJsZSwgYXJnKSB7XG5cdHZhciB0eXBlID0gdHlwZW9mIGFyZztcblx0aWYgKGFyZyA9PT0gbnVsbCkgdHlwZSA9IFwibnVsbFwiO1xuXHRpZiAodHlwZSAhPT0gXCJvYmplY3RcIikgdGhyb3dFcnJvcih0eXBlKTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGNvbXBhdGlibGUubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoYXJnIGluc3RhbmNlb2YgY29tcGF0aWJsZVtpXSkgcmV0dXJuO1xuXHR9XG5cdHRocm93RXJyb3Iob29wLmluc3RhbmNlTmFtZShhcmcpKTtcblxuXHRmdW5jdGlvbiB0aHJvd0Vycm9yKHR5cGUpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3Iob29wLmluc3RhbmNlTmFtZShzZWxmKSArIFwiIGlzbid0IGNvbXBhdGlibGUgd2l0aCBcIiArIHR5cGUpO1xuXHR9XG59IiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdGlmIChzdHIubGVuZ3RoID09PSAxKSB7XG5cdFx0cmV0dXJuIHN0cjtcblx0fVxuXG5cdHJldHVybiBzdHJcblx0LnJlcGxhY2UoL15bXy5cXC0gXSsvLCAnJylcblx0LnRvTG93ZXJDYXNlKClcblx0LnJlcGxhY2UoL1tfLlxcLSBdKyhcXHd8JCkvZywgZnVuY3Rpb24gKG0sIHAxKSB7XG5cdFx0cmV0dXJuIHAxLnRvVXBwZXJDYXNlKCk7XG5cdH0pO1xufTtcbiJdfQ==
