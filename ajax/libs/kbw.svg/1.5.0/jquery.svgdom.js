/* http://keith-wood.name/svg.html
   jQuery DOM compatibility for jQuery SVG v1.5.0.
   Written by Keith Wood (kbwood{at}iinet.com.au) April 2009.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict
 
var rclass = /[\t\r\n]/g,
	rspace = /\s+/,
	rwhitespace = "[\\x20\\t\\r\\n\\f]";

/** Retrieve the element classes.
	@private
	@param elem {Element} The element to examine.
	@return {string} The class names. */
function getClassNames(elem) {
	return (!$.svg.isSVGElem(elem) ? elem.className :
		(elem.className ? elem.className.baseVal : elem.getAttribute('class'))) || '';
}

/** Set the element classes.
	@private
	@param elem {Element} The element to update.
	@param classes {string} The new class names. */
function setClassNames(elem, classes) {
	(elem.className ? elem.className.baseVal = classes : elem.setAttribute('class',  classes));
}

/** Support adding class names to SVG nodes.
	@param classNames {string} The classes to add. */
$.fn.addClass = function(origAddClass) {
	return function(classNames) {
		if ($.isFunction(classNames)) {
			return this.each(function(i) {
				$(this).addClass(classNames.call(this, i, getClassNames(this)));
			});
		}
		var origArgs = arguments;
		classNames = classNames || '';
		return this.each(function() {
			if ($.svg.isSVGElem(this)) {
				var node = this;
				$.each(classNames.split(/\s+/), function(i, className) {
					var classes = getClassNames(node);
					if ($.inArray(className, classes.split(/\s+/)) === -1) {
						setClassNames(node,  classes += (classes ? ' ' : '') + className);
					}
				});
			}
			else {
				origAddClass.apply($(this), origArgs);
			}
		});
	};
}($.fn.addClass);

/** Support removing class names from SVG nodes.
	@param classNames {string} The classes to remove. */
$.fn.removeClass = function(origRemoveClass) {
	return function(classNames) {
		if ($.isFunction(classNames)) {
			return this.each(function(i) {
				$(this).removeClass(classNames.call(this, i, getClassNames(this)));
			});
		}
		var origArgs = arguments;
		classNames = classNames || '';
		return this.each(function() {
			if ($.svg.isSVGElem(this)) {
				var node = this;
				$.each(classNames.split(/\s+/), function(i, className) {
					var classes = getClassNames(node);
					classes = $.grep(classes.split(/\s+/), function(n, i) { return n !== className; }).join(' ');
					setClassNames(node, classes);
				});
			}
			else {
				origRemoveClass.apply($(this), origArgs);
			}
		});
	};
}($.fn.removeClass);

/** Support toggling class names on SVG nodes.
	@param classNames {string} The classes to toggle. */
$.fn.toggleClass = function(origToggleClass) {
	return function(classNames, state) {
		if ($.isFunction(classNames)) {
			return this.each(function(i) {
				$(this).toggleClass(classNames.call(this, i, getClassNames(this), state), state);
			});
		}
		var origArgs = arguments;
		var hasState = (typeof state === 'boolean');
		return this.each(function() {
			if ($.svg.isSVGElem(this)) {
				if (typeof classNames === 'string') {
					var node = $(this);
					$.each(classNames.split(/\s+/), function(i, className) {
						if (!hasState) {
							state = !node.hasClass(className);
						}
						node[(state ? 'add' : 'remove') + 'Class'](className);
					});
				}
				else {
					var classes = getClassNames(this);
					if (classes) {
						$._data(this, '__className__', classes); // store className if set
					}
					// toggle whole className
					setClassNames(this, classes || classNames === false ? '' : $._data(this, '__className__') || '');
				}
			}
			else {
				origToggleClass.apply($(this), origArgs);
			}
		});
	};
}($.fn.toggleClass);

/** Support checking class names on SVG nodes.
	@param className {string} The class to check.
	@return {boolean} <code>true</code> if this class is present, <code>false</code> if not. */
$.fn.hasClass = function(origHasClass) {
	return function(className) {
		className = className || '';
		var found = false;
		this.each(function() {
			if ($.svg.isSVGElem(this)) {
				found = ($.inArray(className, getClassNames(this).split(/\s+/)) > -1);
			}
			else {
				found = (origHasClass.apply($(this), [className]));
			}
			return !found;
		});
		return found;
	};
}($.fn.hasClass);

/** Support attributes on SVG nodes.
	@param name {string} The attribute name.
	@param [value] {any} The new attribute value.
	@param type {boolean} Internal flag.
	@return {any} If an attribute value is requested. */
$.fn.attr = function(origAttr) {
	return function(name, value, type) {
		if (typeof name === 'string' && value === undefined) { // Return attribute value
			var val = origAttr.apply(this, arguments);
			if (val && val.baseVal && val.baseVal.numberOfItems != null) { // Multiple values
				value = '';
				val = val.baseVal;
				if (name === 'transform') {
					for (var i = 0; i < val.numberOfItems; i++) {
						var item = val.getItem(i);
						switch (item.type) {
							case 1: value += ' matrix(' + item.matrix.a + ',' + item.matrix.b + ',' +
										item.matrix.c + ',' + item.matrix.d + ',' +
										item.matrix.e + ',' + item.matrix.f + ')';
									break;
							case 2: value += ' translate(' + item.matrix.e + ',' + item.matrix.f + ')'; break;
							case 3: value += ' scale(' + item.matrix.a + ',' + item.matrix.d + ')'; break;
							case 4: value += ' rotate(' + item.angle + ')'; break; // Doesn't handle new origin
							case 5: value += ' skewX(' + item.angle + ')'; break;
							case 6: value += ' skewY(' + item.angle + ')'; break;
						}
					}
					val = value.substring(1);
				}
				else {
					val = val.getItem(0).valueAsString;
				}
			}
			return (val && val.baseVal ? val.baseVal.valueAsString : val);
		}

		var options = name;
		if (typeof name === 'string') {
			options = {};
			options[name] = value;
		}
		if ($.isFunction(value)) {
			return $(this).each(function(i) {
				$(this).attr(name, value.call(this, i, $(this).attr(name)));
			});
		}
		var origArgs = arguments;
		return $(this).each(function() {
			if ($.svg.isSVGElem(this)) {
				for (var n in options) {
					(type ? this.style[n] = options[n] : this.setAttribute(n, options[n]));
				}
			}
			else {
				origAttr.apply($(this), origArgs);
			}
		});
	};
}($.fn.attr);

/** Support removing attributes on SVG nodes.
	@param names {string} The names of the attributes to remove. */
$.fn.removeAttr = function(origRemoveAttr) {
	return function(names) {
		var origArgs = arguments;
		return this.each(function() {
			if ($.svg.isSVGElem(this)) {
				var node = this;
				$.each(names.split(/\s+/), function(i, name) {
					(node[name] && node[name].baseVal ? node[name].baseVal.value = null : node.removeAttribute(name));
				});
			}
			else {
				origRemoveAttr.apply($(this), origArgs);
			}
		});
	};
}($.fn.removeAttr);

/* Add numeric only properties. */
$.extend($.cssNumber, {
	'stopOpacity': true,
	'strokeMitrelimit': true,
	'strokeOpacity': true
});

/* Support retrieving CSS/attribute values on SVG nodes. */
if ($.cssProps) {
	$.css = function(origCSS) {
		return function(elem, name, numeric, extra) {
			var value = (name.match(/^svg.*/) ? $(elem).attr($.cssProps[name] || name) : '');
			return value || origCSS(elem, name, numeric, extra);
		};
	}($.css);
}

})(jQuery);
