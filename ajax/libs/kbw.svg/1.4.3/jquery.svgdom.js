/* http://keith-wood.name/svg.html
   SVG/jQuery DOM compatibility for jQuery v1.4.3.
   Written by Keith Wood (kbwood{at}iinet.com.au) April 2009.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

/* Support adding class names to SVG nodes. */
$.fn.addClass = function(origAddClass) {
	return function(classNames) {
		classNames = classNames || '';
		return this.each(function() {
			if (isSVGElem(this)) {
				var node = this;
				$.each(classNames.split(/\s+/), function(i, className) {
					var classes = (node.className ? node.className.baseVal : node.getAttribute('class'));
					if ($.inArray(className, classes.split(/\s+/)) == -1) {
						classes += (classes ? ' ' : '') + className;
						(node.className ? node.className.baseVal = classes :
							node.setAttribute('class',  classes));
					}
				});
			}
			else {
				origAddClass.apply($(this), [classNames]);
			}
		});
	};
}($.fn.addClass);

/* Support removing class names from SVG nodes. */
$.fn.removeClass = function(origRemoveClass) {
	return function(classNames) {
		classNames = classNames || '';
		return this.each(function() {
			if (isSVGElem(this)) {
				var node = this;
				$.each(classNames.split(/\s+/), function(i, className) {
					var classes = (node.className ? node.className.baseVal : node.getAttribute('class'));
					classes = $.grep(classes.split(/\s+/), function(n, i) { return n != className; }).
						join(' ');
					(node.className ? node.className.baseVal = classes :
						node.setAttribute('class', classes));
				});
			}
			else {
				origRemoveClass.apply($(this), [classNames]);
			}
		});
	};
}($.fn.removeClass);

/* Support toggling class names on SVG nodes. */
$.fn.toggleClass = function(origToggleClass) {
	return function(className, state) {
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
}($.fn.toggleClass);

/* Support checking class names on SVG nodes. */
$.fn.hasClass = function(origHasClass) {
	return function(className) {
		className = className || '';
		var found = false;
		this.each(function() {
			if (isSVGElem(this)) {
				var classes = (this.className ? this.className.baseVal :
					this.getAttribute('class')).split(/\s+/);
				found = ($.inArray(className, classes) > -1);
			}
			else {
				found = (origHasClass.apply($(this), [className]));
			}
			return !found;
		});
		return found;
	};
}($.fn.hasClass);

/* Support attributes on SVG nodes. */
$.fn.attr = function(origAttr) {
	return function(name, value, type) {
		if (typeof name === 'string' && value === undefined) {
			var val = origAttr.apply(this, [name, value, type]);
			if (val && val.baseVal && val.baseVal.numberOfItems != null) { // Transform
				value = '';
				val = val.baseVal;
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
			return (val && val.baseVal ? val.baseVal.valueAsString : val);
		}
		var options = name;
		if (typeof name === 'string') {
			options = {};
			options[name] = value;
		}
		return this.each(function() {
			if (isSVGElem(this)) {
				for (var n in options) {
					var val = ($.isFunction(options[n]) ? options[n]() : options[n]);
					(type ? this.style[n] = val : this.setAttribute(n, val));
				}
			}
			else {
				origAttr.apply($(this), [name, value, type]);
			}
		});
	};
}($.fn.attr);

/* Support removing attributes on SVG nodes. */
$.fn.removeAttr = function(origRemoveAttr) {
	return function(name) {
		return this.each(function() {
			if (isSVGElem(this)) {
				(this[name] && this[name].baseVal ? this[name].baseVal.value = '' :
					this.setAttribute(name, ''));
			}
			else {
				origRemoveAttr.apply($(this), [name]);
			}
		});
	};
}($.fn.removeAttr);

/* Determine if any nodes are SVG nodes. */
function anySVG(checkSet) {
	for (var i = 0; i < checkSet.length; i++) {
		if (checkSet[i].nodeType == 1 && checkSet[i].namespaceURI == $.svg.svgNS) {
			return true;
		}
	}
	return false;
}

/* Update Sizzle selectors. */

$.expr.relative['+'] = function(origRelativeNext) {
	return function(checkSet, part, isXML) {
		origRelativeNext(checkSet, part, isXML || anySVG(checkSet));
	};
}($.expr.relative['+']);

$.expr.relative['>'] = function(origRelativeChild) {
	return function(checkSet, part, isXML) {
		origRelativeChild(checkSet, part, isXML || anySVG(checkSet));
	};
}($.expr.relative['>']);

$.expr.relative[''] = function(origRelativeDescendant) {
	return function(checkSet, part, isXML) {
		origRelativeDescendant(checkSet, part, isXML || anySVG(checkSet));
	};
}($.expr.relative['']);

$.expr.relative['~'] = function(origRelativeSiblings) {
	return function(checkSet, part, isXML) {
		origRelativeSiblings(checkSet, part, isXML || anySVG(checkSet));
	};
}($.expr.relative['~']);

$.expr.find.ID = function(origFindId) {
	return function(match, context, isXML) {
		return (isSVGElem(context) ?
			[context.ownerDocument.getElementById(match[1])] :
			origFindId(match, context, isXML));
	};
}($.expr.find.ID);

var div = document.createElement('div');
div.appendChild(document.createComment(''));
if (div.getElementsByTagName('*').length > 0) { // Make sure no comments are found
	$.expr.find.TAG = function(match, context) {
		var results = context.getElementsByTagName(match[1]);
		if (match[1] === '*') { // Filter out possible comments
			var tmp = [];
			for (var i = 0; results[i] || results.item(i); i++) {
				if ((results[i] || results.item(i)).nodeType === 1) {
					tmp.push(results[i] || results.item(i));
				}
			}
			results = tmp;
		}
		return results;
	};
}

$.expr.preFilter.CLASS = function(match, curLoop, inplace, result, not, isXML) {
	match = ' ' + match[1].replace(/\\/g, '') + ' ';
	if (isXML) {
		return match;
	}
	for (var i = 0, elem = {}; elem != null; i++) {
		elem = curLoop[i];
		if (!elem) {
			try {
				elem = curLoop.item(i);
			}
			catch (e) {
				// Ignore
			}
		}
		if (elem) {
			var className = (!isSVGElem(elem) ? elem.className :
				(elem.className ? elem.className.baseVal : '') || elem.getAttribute('class'));
			if (not ^ (className && (' ' + className + ' ').indexOf(match) > -1)) {
				if (!inplace)
					result.push(elem);
			}
			else if (inplace) {
				curLoop[i] = false;
			}
		}
	}
	return false;
};

$.expr.filter.CLASS = function(elem, match) {
	var className = (!isSVGElem(elem) ? elem.className :
		(elem.className ? elem.className.baseVal : elem.getAttribute('class')));
	return (' ' + className + ' ').indexOf(match) > -1;
};

$.expr.filter.ATTR = function(origFilterAttr) {
	return function(elem, match) {
		var handler = null;
		if (isSVGElem(elem)) {
			handler = match[1];
			$.expr.attrHandle[handler] = function(elem){
				var attr = elem.getAttribute(handler);
				return attr && attr.baseVal || attr;
			};
		}
		var filter = origFilterAttr(elem, match);
		if (handler) {
			$.expr.attrHandle[handler] = null;
		}
		return filter;
	};
}($.expr.filter.ATTR);

/*
	Change Sizzle initialisation (line 1425) in jQuery v1.3.2 base code...
	
	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );
		} else if ( context.nodeType === 1 ) {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && contains(context, checkSet[i])) ) {
					results.push( set[i] || set.item(i) ); // Here
				}
			}
		} else {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] || set.item(i) ); // Here
				}
			}
		}
	}
	
	Change fallback makeArray (line 2076) implementation in jQuery Sizzle...
	
			if ( typeof array.length === "number" ) {
				for ( var i = 0, l = array.length; i < l; i++ ) {
					ret.push( array[i] || array.item(i) ); // Here
				}
			}
*/

/*
	Events management requires changes to jQuery v1.3.2 base code...

	In $.event.add (line 2437)...
	
				if ( !jQuery.event.special[type] || jQuery.event.special[type].setup.call(elem, data, namespaces) === false ) {
					// Bind the global event handler to the element
					try { // Here
						elem.addEventListener(type, handle, false);
					}
					catch(e) {
						if (elem.attachEvent)
							elem.attachEvent("on" + type, handle);
					}
				}

	In $.event.remove (line 2521)...
	
							if ( !jQuery.event.special[type] || jQuery.event.special[type].teardown.call(elem, namespaces) === false ) {
								try { // Here
									elem.removeEventListener(type, jQuery.data(elem, "handle"), false);
								}
								catch (e) {
									if (elem.detachEvent)
										elem.detachEvent("on" + type, jQuery.data(elem, "handle"));
								}
							}
*/

/* Does this node belong to SVG? */
function isSVGElem(node) {
	return (node.nodeType == 1 && node.namespaceURI == $.svg.svgNS);
}

})(jQuery);
