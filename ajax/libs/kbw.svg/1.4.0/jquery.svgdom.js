/* http://keith-wood.name/svg.html
   SVG/jQuery DOM compatibility for jQuery v1.4.0.
   Written by Keith Wood (kbwood{at}iinet.com.au) April 2009.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

/* Support adding class names to SVG nodes. */
var origAddClass = $.fn.addClass;

$.fn.addClass = function(classNames) {
	classNames = classNames || '';
	var addName = function(name, names) {
		return names + ($.inArray(name, names.split(/\s+/)) == -1 ?
			(names ? ' ' : '') + name : '');
	};
	return this.each(function() {
		if (isSVGElem(this)) {
			var node = this;
			$.each(classNames.split(/\s+/), function(i, className) {
				if (node.className) {
					node.className.baseVal =
						addName(className, node.className.baseVal);
				}
				else {
					node.setAttribute('class',
						addName(className, node.getAttribute('class')));
				}
			});
		}
		else {
			origAddClass.apply($(this), [classNames]);
		}
	});
};

/* Support removing class names from SVG nodes. */
var origRemoveClass = $.fn.removeClass;

$.fn.removeClass = function(classNames) {
	classNames = classNames || '';
	var removeName = function(name, names) {
		names = names.split(/\s+/);
		var remove = $.inArray(name, names);
		return $.grep(names, function(n, i) { return i != remove; }).join(' ');
	};
	return this.each(function() {
		if (isSVGElem(this)) {
			var node = this;
			$.each(classNames.split(/\s+/), function(i, className) {
				if (node.className) {
					node.className.baseVal =
						removeName(className, node.className.baseVal);
				}
				else {
					node.setAttribute('class',
						removeName(className, node.getAttribute('class')));
				}
			});
		}
		else {
			origRemoveClass.apply($(this), [classNames]);
		}
	});
};

/* Support toggling class names on SVG nodes. */
var origToggleClass = $.fn.toggleClass;

$.fn.toggleClass = function(className, state) {
	return this.each(function() {
		if (isSVGElem(this)) {
			if (typeof state !== 'boolean') {
				state = !$(this).hasClass(className);
			}
			$(this)[(state ? 'add' : 'remove') + 'Class'](className);
		}
		else {
			origToggleClass.apply($(this), [className, state]);
		}
	});
};

/* Support checking class names on SVG nodes. */
var origHasClass = $.fn.hasClass;

$.fn.hasClass = function(className) {
	className = className || '';
	var found = false;
	this.each(function() {
		if (isSVGElem(this)) {
			var names = (this.className ? this.className.baseVal :
				this.getAttribute('class')).split(/\s+/);
			if ($.inArray(className, names) > -1) {
				found = true;
			}
		}
		else {
			if (origHasClass.apply($(this), [className])) {
				found = true;
			}
		}
		return !found;
	});
	return found;
};

/* Support attributes on SVG nodes. */
var origAttr = $.fn.attr;

$.fn.attr = function(name, value, type) {
	if (typeof name === 'string' && value === undefined) {
		var val = origAttr.apply(this, [name, value, type]);
		return (val && val.baseVal ? val.baseVal.valueAsString : val);
	}
	return this.each(function() {
		if (isSVGElem(this)) {
			if (typeof name == 'object') {
				for (var n in name) {
					this.setAttribute(n, name[n]);
				}
			}
			else {
				this.setAttribute(name, (typeof value == 'function' ? value() : value));
			}
		}
		else {
			origAttr.apply($(this), [name, value, type]);
		}
	});
};

/* Support removing attributes on SVG nodes. */
var origRemoveAttr = $.fn.removeAttr;

$.fn.removeAttr = function(name) {
	return this.each(function() {
		if (isSVGElem(this)) {
			if (this[name] && this[name].baseVal) {
				this[name].baseVal.value = '';
			}
			else {
				this.setAttribute(name, '');
			}
		}
		else {
			origRemoveAttr.apply($(this), [name]);
		}
	});
};

/* Does this node belong to SVG? */
function isSVGElem(node) {
	return (node.nodeType == 1 && node.namespaceURI == $.svg.svgNS);
}

})(jQuery);
