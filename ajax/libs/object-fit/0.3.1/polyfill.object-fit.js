/*!
 * A polyfill for Webkit's window.getMatchedCSSRules, based on
 * https://gist.github.com/ydaniv/3033012
 *
 * @author: Yehonatan Daniv
 * @author: Christian "Schepp" Schaefer <schaepp@gmx.de>
 *
 */

'use strict';

(function() {
	if ( typeof window.getMatchedCSSRules !== 'function' ) {
		var ELEMENT_RE = /[\w-]+/g,
				ID_RE = /#[\w-]+/g,
				CLASS_RE = /\.[\w-]+/g,
				ATTR_RE = /\[[^\]]+\]/g,
				// :not() pseudo-class does not add to specificity, but its content does as if it was outside it
				PSEUDO_CLASSES_RE = /\:(?!not)[\w-]+(\(.*\))?/g,
				PSEUDO_ELEMENTS_RE = /\:\:?(after|before|first-letter|first-line|selection)/g;
			// convert an array-like object to array
			var toArray = function(list) {
				var items = [];
				for (var i in list) {
					items.push(list[i]);
				}
				return items;
			};
	 
			// handles extraction of `cssRules` as an `Array` from a stylesheet or something that behaves the same
			var getSheetRules = function(stylesheet) {
				var sheet_media = stylesheet.media && stylesheet.media.mediaText;
				// if this sheet is disabled skip it
				if ( stylesheet.disabled ) return [];
				// if this sheet's media is specified and doesn't match the viewport then skip it
				if ( sheet_media && sheet_media.length && ! window.matchMedia(sheet_media).matches ) return [];
				// get the style rules of this sheet
				return toArray(stylesheet.cssRules);
			};
	 
			var _find = function (string, re) {
				var matches = string.match(re);
				return re ? re.length : 0;
			};

			// calculates the specificity of a given `selector`
			var calculateScore = function (selector) {
				var score = [0,0,0],
					parts = selector.split(' '),
					part, match;
				//TODO: clean the ':not' part since the last ELEMENT_RE will pick it up
				while ( part = parts.shift(), typeof part == 'string' ) {
					// find all pseudo-elements
					match = _find(part, PSEUDO_ELEMENTS_RE);
					score[2] = match;
					// and remove them
					match && (part = part.replace(PSEUDO_ELEMENTS_RE, ''));
					// find all pseudo-classes
					match = _find(part, PSEUDO_CLASSES_RE);
					score[1] = match;
					// and remove them
					match && (part = part.replace(PSEUDO_CLASSES_RE, ''));
					// find all attributes
					match = _find(part, ATTR_RE);
					score[1] += match;
					// and remove them
					match && (part = part.replace(ATTR_RE, ''));
					// find all IDs
					match = _find(part, ID_RE);
					score[0] = match;
					// and remove them
					match && (part = part.replace(ID_RE, ''));
					// find all classes
					match = _find(part, CLASS_RE);
					score[1] += match;
					// and remove them
					match && (part = part.replace(CLASS_RE, ''));
					// find all elements
					score[2] += _find(part, ELEMENT_RE);
				}
				return parseInt(score.join(''), 10);
			};
	 
			// returns the heights possible specificity score an element can get from a give rule's selectorText
			var getSpecificityScore = function(element, selector_text) {
				var selectors = selector_text.split(','),
					selector, score, result = 0;
				while ( selector = selectors.shift() ) {
					if ((element.mozMatchesSelector && element.mozMatchesSelector(selector)) || 
						(element.msMatchesSelector && element.msMatchesSelector(selector)) || 
						(element.oMatchesSelector && element.oMatchesSelector(selector)) || 
						(element.webkitMatchesSelector && element.webkitMatchesSelector(selector))
					) {
						score = calculateScore(selector);
						result = score > result ? score : result;
					}
				}
				return result;
			};
	 
			var sortBySpecificity = function(element, rules) {
				// comparing function that sorts CSSStyleRules according to specificity of their `selectorText`
				function compareSpecificity (a, b) {
					return getSpecificityScore(element, b.selectorText) - getSpecificityScore(element, a.selectorText);
				}
	 
				return rules.sort(compareSpecificity);
			};
	 
			//TODO: not supporting 2nd argument for selecting pseudo elements
			//TODO: not supporting 3rd argument for checking author style sheets only
			window.getMatchedCSSRules = function (element /*, pseudo, author_only*/) {
				var style_sheets, sheet, sheet_media,
					rules, rule,
					result = [];
				// get stylesheets and convert to a regular Array
				style_sheets = toArray(window.document.styleSheets);
	 
				// assuming the browser hands us stylesheets in order of appearance
				// we iterate them from the beginning to follow proper cascade order
				while ( sheet = style_sheets.shift() ) {
					// get the style rules of this sheet
					rules = getSheetRules(sheet);
					// loop the rules in order of appearance
					while ( rule = rules.shift() ) {
						// if this is an @import rule
						if ( rule.styleSheet ) {
							// insert the imported stylesheet's rules at the beginning of this stylesheet's rules
							rules = getSheetRules(rule.styleSheet).concat(rules);
							// and skip this rule
							continue;
						}
						// if there's no stylesheet attribute BUT there IS a media attribute it's a media rule
						else if ( rule.media ) {
							// insert the contained rules of this media rule to the beginning of this stylesheet's rules
							rules = getSheetRules(rule).concat(rules);
							// and skip it
							continue
						}
						// check if this element matches this rule's selector
						if ((element.mozMatchesSelector && element.mozMatchesSelector(rule.selectorText)) || 
							(element.msMatchesSelector && element.msMatchesSelector(rule.selectorText)) || 
							(element.oMatchesSelector && element.oMatchesSelector(rule.selectorText)) || 
							(element.webkitMatchesSelector && element.webkitMatchesSelector(rule.selectorText))
						) {
							// push the rule to the results set
							result.push(rule);
						}
					}
				}
				// sort according to specificity
				return sortBySpecificity(element, result);
			};
	}
}());	
/*!
 * A polyfill for requestAnimationFrame, based on
 * http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
 *
 * @author: Erik Möller
 * @author: Paul Irish
 *
 */

'use strict';

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
/*!
 * Polyfill CSS object-fit
 * http://helloanselm.com/object-fit
 *
 * @author: Anselm Hannemann <hello@anselm-hannemann.com>
 * @author: Christian "Schepp" Schaefer <schaepp@gmx.de>
 * @version: 0.3.1
 *
 */

(function (global) {

	'use strict';

	// Storage variable
	var objectFit = {};

	objectFit._debug = false;
	
	objectFit.observer = null;

	objectFit.getComputedStyle = function(element, context) {
		context = context || window;

		if (context.getComputedStyle) {
			return context.getComputedStyle(element, null);
		}
		else {
			return element.currentStyle;
		}
	};

	objectFit.getDefaultComputedStyle = function(element){
		var newelement = element.cloneNode(true);
		var styles = {};
		var iframe = document.createElement('iframe');
		document.body.appendChild(iframe);
		iframe.contentWindow.document.open();
		iframe.contentWindow.document.write('<body></body>');
		iframe.contentWindow.document.body.appendChild(newelement);
		iframe.contentWindow.document.close();

		var defaultElement = iframe.contentWindow.document.querySelectorAll(element.nodeName.toLowerCase())[0];
		var defaultComputedStyle = this.getComputedStyle(defaultElement, iframe.contentWindow);

		for (var property in defaultComputedStyle) {
			var value = defaultComputedStyle.getPropertyValue ? defaultComputedStyle.getPropertyValue(property) : defaultComputedStyle[property];
			if (value !== null) {
				switch (property) {
					default:
						styles[property] = value;
					break;

					case 'width':
					case 'height':
					case 'minWidth':
					case 'minHeight':
					case 'maxWidth':
					case 'maxHeight':
					break;
				}
			}
		}

		document.body.removeChild(iframe);

		return styles;
	};
	
	objectFit.getMatchedStyle = function(element, property){
		// element property has highest priority
		var val = null;
		var inlineval = null;
		
		if (element.style.getPropertyValue) {
			inlineval = element.style.getPropertyValue(property);
		} else if (element.currentStyle) {
			inlineval = element.currentStyle[property];
		}

		// get matched rules
		var rules = window.getMatchedCSSRules(element);
		
		if (rules.length) {
			// iterate the rules backwards
			// rules are ordered by priority, highest last
			for (var i = rules.length; i --> 0;){
				var r = rules[i];
	
				var important = r.style.getPropertyPriority(property);
	
				// if set, only reset if important
				if (val === null || important) {
					val = r.style.getPropertyValue(property);

					// done if important
					if (important) {
						break;
					}
					//return val;
				}
			}
		}

		// if it's important, we are done
		if (!val && inlineval !== null) {
			val = inlineval;
		}
		
		return val;
	};

	// Detects orientation
	objectFit.orientation = function(replacedElement) {
		if (replacedElement.parentNode && replacedElement.parentNode.nodeName.toLowerCase() === 'x-object-fit') {
			var width = replacedElement.naturalWidth || replacedElement.clientWidth;
			var height = replacedElement.naturalHeight || replacedElement.clientHeight;
			var parentWidth = replacedElement.parentNode.clientWidth;
			var parentHeight = replacedElement.parentNode.clientHeight;

			if (!height || width / height > parentWidth / parentHeight) {
				if (replacedElement.getAttribute('data-x-object-relation') !== 'wider') {
					replacedElement.setAttribute('data-x-object-relation','wider');
					replacedElement.className = 'x-object-fit-wider';
					if (this._debug && window.console) {
						console.log('x-object-fit-wider');
					}
				}
			} else {
				if (replacedElement.getAttribute('data-x-object-relation') !== 'taller') {
					replacedElement.setAttribute('data-x-object-relation','taller');
					replacedElement.className = 'x-object-fit-taller';
					if (this._debug && window.console) {
						console.log('x-object-fit-taller');
					}
				}
			}
		}
	};

	objectFit.process = function(args) {
		if (!args.selector || !args.replacedElements) {
			return;
		}
		args.fittype = args.fittype || 'none';
		switch (args.fittype) {
			default:
				return;

			case 'none':
			case 'fill':
			case 'contain':
			case 'cover':
			break;
		}

		var replacedElements = args.replacedElements;
		if(!replacedElements.length) {
			return;
		}

		for (var i = 0, replacedElementsLength = replacedElements.length; i < replacedElementsLength; i++) {
			this.processElement(replacedElements[i], args);
		}
	};
	
	objectFit.processElement = function(replacedElement, args) {
		var property, value;
		
		var replacedElementStyles = objectFit.getComputedStyle(replacedElement);
		var replacedElementDefaultStyles = objectFit.getDefaultComputedStyle(replacedElement);

		var wrapperElement = document.createElement('x-object-fit');

		if (objectFit._debug && window.console) {
			console.log('Applying to WRAPPER-------------------------------------------------------');
		}
		for (property in replacedElementStyles) {
			switch (property) {
				default:
					value = objectFit.getMatchedStyle(replacedElement,property);
					if (value !== null && value !== '') {
						if (objectFit._debug && window.console) {
							console.log(property + ': ' + value);
						}
						wrapperElement.style[property] = value;
					}
				break;
				
				case 'length':
				case 'parentRule':
				break;
			}
		}

		if (objectFit._debug && window.console) {
			console.log('Applying to REPLACED ELEMENT-------------------------------------------------------');
		}
		for (property in replacedElementDefaultStyles) {
			switch (property) {
				default:
					value = replacedElementDefaultStyles[property];
					if (objectFit._debug && window.console && value !== '') {
						console.log(property + ': ' + value);
					}
					replacedElement.style[property] = value;
				break;
				
				case 'length':
				case 'parentRule':
				break;
			}
		}

		wrapperElement.setAttribute('class','x-object-fit-' + args.fittype);
		replacedElement.parentNode.insertBefore(wrapperElement, replacedElement);
		wrapperElement.appendChild(replacedElement);

		objectFit.orientation(replacedElement);

		var resizeTimer = null;
		var resizeAction = function(){
			if (resizeTimer !== null) {
				window.cancelAnimationFrame(resizeTimer);
			}
			resizeTimer = window.requestAnimationFrame(function(){
				objectFit.orientation(replacedElement);
			});
		};
		
		switch (args.fittype) {
			default:
			break;

			case 'contain':
			case 'cover':
				if (window.addEventListener) {
					replacedElement.addEventListener('load', resizeAction, false);
					window.addEventListener('resize', resizeAction, false);
					window.addEventListener('orientationchange', resizeAction, false);
				} else {
					replacedElement.attachEvent('onload', resizeAction);
					window.attachEvent('onresize', resizeAction);
				}
			break;
		}
	};
	
	objectFit.listen = function(args) {
		var domInsertedAction = function(element){
			for (var i = 0, argsLength = args.length; i < argsLength; i++) {
				if ((element.mozMatchesSelector && element.mozMatchesSelector(args[i].selector)) ||
					(element.msMatchesSelector && element.msMatchesSelector(args[i].selector)) ||
					(element.oMatchesSelector && element.oMatchesSelector(args[i].selector)) ||
					(element.webkitMatchesSelector && element.webkitMatchesSelector(args[i].selector))
				) {
					args[i].replacedElements = [element];
					objectFit.process(args[i]);
					if (objectFit._debug && window.console) {
						console.log('Matching node inserted: ' + element.nodeName);
					}
				}
			}
		};
		
		var domInsertedObserverFunction = function(element){
			objectFit.observer.disconnect();
			domInsertedAction(element);
			objectFit.observer.observe(document.documentElement, {
				childList: true,
				subtree: true
			});
		};
		
		var domInsertedEventFunction = function(event){
			window.removeEventListener('DOMNodeInserted', domInsertedEventFunction, false);
			domInsertedAction(event.target);
			window.addEventListener('DOMNodeInserted', domInsertedEventFunction, false);
		};

		var domRemovedAction = function(element){
			if (element.nodeName.toLowerCase() === 'x-object-fit') {
				element.parentNode.removeChild(element);
				if (objectFit._debug && window.console) {
					console.log('Matching node removed: ' + element.nodeName);
				}
			}
		};
		
		var domRemovedObserverFunction = function(element){
			objectFit.observer.disconnect();
			domRemovedAction(element);
			objectFit.observer.observe(document.documentElement, {
				childList: true,
				subtree: true
			});
		};
		
		var domRemovedEventFunction = function(event){
			window.removeEventListener('DOMNodeRemoved', domRemovedEventFunction, false);
			domRemovedAction(event.target.parentNode);
			window.addEventListener('DOMNodeRemoved', domRemovedEventFunction, false);
		};

		if (window.MutationObserver) {
			if (objectFit._debug && window.console) {
				console.log('DOM MutationObserver');
			}
			this.observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					if (mutation.addedNodes && mutation.addedNodes.length) {
						var nodes = mutation.addedNodes;
						for (var i = 0, nodesLength = nodes.length; i < nodesLength; i++) {
							domInsertedObserverFunction(nodes[i]);
						}
					}
					if (mutation.removedNodes && mutation.removedNodes.length) {
						domRemovedObserverFunction(mutation.target);
					}
				});
			});
			this.observer.observe(document.documentElement, {
				childList: true,
				subtree: true
			});
		} else if (window.addEventListener) {
			if (objectFit._debug && window.console) {
				console.log('DOM Mutation Events');
			}
			window.addEventListener('DOMNodeInserted', domInsertedEventFunction, false);
			window.addEventListener('DOMNodeRemoved', domRemovedEventFunction, false);
		}
	};

	objectFit.init = function(args) {
		if (!args) {
			return;
		}
		if (typeof args !== 'Array') {
			args = [args];
		}

		for (var i = 0, argsLength = args.length; i < argsLength; i++) {
			args[i].replacedElements = document.querySelectorAll(args[i].selector);
			this.process(args[i]);
		}

		this.listen(args);
	};

	objectFit.polyfill = function(args) {
		if('objectFit' in document.documentElement.style === false) {
			if (objectFit._debug && window.console) {
				console.log('object-fit not natively supported');
			}
			// If the library is loaded after document onload event
            if(document.readyState === 'complete') {
                objectFit.init(args);
            } else {
                // Otherwise attach event listeners
                if (window.addEventListener) {
                    window.addEventListener('load', function(){
                        objectFit.init(args);
                    }, false);
                } else {
                    window.attachEvent('onload', function(){
                        objectFit.init(args);
                    });
                }
            }
		} else {
			if (objectFit._debug && window.console) {
				console.log('object-fit natively supported');
			}
		}
	};

	// Export into global space
	global.objectFit = objectFit;

}(window));
