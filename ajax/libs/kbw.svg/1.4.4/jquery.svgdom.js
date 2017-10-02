/* http://keith-wood.name/svg.html
   jQuery DOM compatibility for jQuery SVG v1.4.4.
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
			if ($.svg.isSVGElem(this)) {
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
			if ($.svg.isSVGElem(this)) {
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
			if ($.svg.isSVGElem(this)) {
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
			if ($.svg.isSVGElem(this)) {
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
			if (val && val.baseVal && val.baseVal.numberOfItems != null) { // Multiple values
				value = '';
				val = val.baseVal;
				if (name == 'transform') {
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
		return this.each(function() {
			if ($.svg.isSVGElem(this)) {
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
			if ($.svg.isSVGElem(this)) {
				(this[name] && this[name].baseVal ? this[name].baseVal.value = '' :
					this.setAttribute(name, ''));
			}
			else {
				origRemoveAttr.apply($(this), [name]);
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
		return function(elem, name) {
			var value = (name.match(/^svg.*/) ? $(elem).attr($.cssProps[name] || name) : '');
			return value || origCSS(elem, name);
		};
	}($.css);
}
  
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
		return ($.svg.isSVGElem(context) ?
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
			var className = (!$.svg.isSVGElem(elem) ? elem.className :
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
	var className = (!$.svg.isSVGElem(elem) ? elem.className :
		(elem.className ? elem.className.baseVal : elem.getAttribute('class')));
	return (' ' + className + ' ').indexOf(match) > -1;
};

$.expr.filter.ATTR = function(origFilterAttr) {
	return function(elem, match) {
		var handler = null;
		if ($.svg.isSVGElem(elem)) {
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
	In the event.add function (line 2646, v1.6.2):

				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					try { // SVG
						elem.addEventListener( type, eventHandle, false );

					} catch(e) {
						if (elem.attachEvent)
							elem.attachEvent( "on" + type, eventHandle );
					}
				}

	In the event.remove function (line 2776, v1.6.2):

				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
					try { // SVG
						elem.removeEventListener(type, elemData.handle, false);
					}
					catch (e) {
						if (elem.detachEvent)
							elem.detachEvent("on" + type, elemData.handle);
					}
				}

	In the event.fix function (line 3036, v.1.6.2)

		if (event.target.namespaceURI == 'http://www.w3.org/2000/svg') { // SVG
			event.button = [1, 4, 2][event.button];
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		// Note: button is not normalized, so don't use it
		if ( !event.which && event.button !== undefined ) {
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
		}

	In the Sizzle function (line 3873, v1.6.2):

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );

		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] || set.item(i) ); // SVG
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] || set.item(i) ); // SVG
				}
			}
		}

	} else {

	In the fallback for the Sizzle makeArray function (line 4617, v1.6.2):

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );

		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] || array.item(i) ); // SVG
				}

			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

	In the jQuery.cleanData function (line 6220, v1.6.2)

				if ( deleteExpando ) {
					delete elem[ jQuery.expando ];

				} else {
					try { // SVG
						elem.removeAttribute( jQuery.expando );
					} catch (e) {
						// Ignore
					}
				}

	In the fallback getComputedStyle function (line 6509, v.1.6.2)

		defaultView = (elem.ownerDocument ? elem.ownerDocument.defaultView : elem.defaultView); // SVG
		if ( !defaultView ) {
			return undefined;
		}

*/

})(jQuery);
