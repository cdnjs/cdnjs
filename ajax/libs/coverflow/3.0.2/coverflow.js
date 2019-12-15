/*! CoverflowJS - v3.0.2 - 2015-12-31
* Copyright (c) 2015 Paul Baukus, Addy Osmani, Sebastian Sauer, Brandon Belvin, April Barrett, Kirill Kostko; Licensed MIT */
/*! jQuery UI - v1.10.4 - 2014-01-17
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.effect.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
(function( $, undefined ) {

var uuid = 0,
	runiqueId = /^ui-id-\d+$/;

// $.ui might exist from components with no dependencies, e.g., $.ui.position
$.ui = $.ui || {};

$.extend( $.ui, {
	version: "@VERSION",

	keyCode: {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	}
});

// plugins
$.fn.extend({
	focus: (function( orig ) {
		return function( delay, fn ) {
			return typeof delay === "number" ?
				this.each(function() {
					var elem = this;
					setTimeout(function() {
						$( elem ).focus();
						if ( fn ) {
							fn.call( elem );
						}
					}, delay );
				}) :
				orig.apply( this, arguments );
		};
	})( $.fn.focus ),

	scrollParent: function() {
		var scrollParent;
		if (($.ui.ie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
			scrollParent = this.parents().filter(function() {
				return (/(relative|absolute|fixed)/).test($.css(this,"position")) && (/(auto|scroll)/).test($.css(this,"overflow")+$.css(this,"overflow-y")+$.css(this,"overflow-x"));
			}).eq(0);
		} else {
			scrollParent = this.parents().filter(function() {
				return (/(auto|scroll)/).test($.css(this,"overflow")+$.css(this,"overflow-y")+$.css(this,"overflow-x"));
			}).eq(0);
		}

		return (/fixed/).test(this.css("position")) || !scrollParent.length ? $(document) : scrollParent;
	},

	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}

		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	},

	uniqueId: function() {
		return this.each(function() {
			if ( !this.id ) {
				this.id = "ui-id-" + (++uuid);
			}
		});
	},

	removeUniqueId: function() {
		return this.each(function() {
			if ( runiqueId.test( this.id ) ) {
				$( this ).removeAttr( "id" );
			}
		});
	}
});

// selectors
function focusable( element, isTabIndexNotNaN ) {
	var map, mapName, img,
		nodeName = element.nodeName.toLowerCase();
	if ( "area" === nodeName ) {
		map = element.parentNode;
		mapName = map.name;
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
			return false;
		}
		img = $( "img[usemap=#" + mapName + "]" )[0];
		return !!img && visible( img );
	}
	return ( /input|select|textarea|button|object/.test( nodeName ) ?
		!element.disabled :
		"a" === nodeName ?
			element.href || isTabIndexNotNaN :
			isTabIndexNotNaN) &&
		// the element and all of its ancestors must be visible
		visible( element );
}

function visible( element ) {
	return $.expr.filters.visible( element ) &&
		!$( element ).parents().addBack().filter(function() {
			return $.css( this, "visibility" ) === "hidden";
		}).length;
}

$.extend( $.expr[ ":" ], {
	data: $.expr.createPseudo ?
		$.expr.createPseudo(function( dataName ) {
			return function( elem ) {
				return !!$.data( elem, dataName );
			};
		}) :
		// support: jQuery <1.8
		function( elem, i, match ) {
			return !!$.data( elem, match[ 3 ] );
		},

	focusable: function( element ) {
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
	},

	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			isTabIndexNaN = isNaN( tabIndex );
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
	}
});

// support: jQuery <1.8
if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {
	$.each( [ "Width", "Height" ], function( i, name ) {
		var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
			type = name.toLowerCase(),
			orig = {
				innerWidth: $.fn.innerWidth,
				innerHeight: $.fn.innerHeight,
				outerWidth: $.fn.outerWidth,
				outerHeight: $.fn.outerHeight
			};

		function reduce( elem, size, border, margin ) {
			$.each( side, function() {
				size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;
				if ( border ) {
					size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;
				}
				if ( margin ) {
					size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;
				}
			});
			return size;
		}

		$.fn[ "inner" + name ] = function( size ) {
			if ( size === undefined ) {
				return orig[ "inner" + name ].call( this );
			}

			return this.each(function() {
				$( this ).css( type, reduce( this, size ) + "px" );
			});
		};

		$.fn[ "outer" + name] = function( size, margin ) {
			if ( typeof size !== "number" ) {
				return orig[ "outer" + name ].call( this, size );
			}

			return this.each(function() {
				$( this).css( type, reduce( this, size, true, margin ) + "px" );
			});
		};
	});
}

// support: jQuery <1.8
if ( !$.fn.addBack ) {
	$.fn.addBack = function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	};
}

// support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
if ( $( "<a>" ).data( "a-b", "a" ).removeData( "a-b" ).data( "a-b" ) ) {
	$.fn.removeData = (function( removeData ) {
		return function( key ) {
			if ( arguments.length ) {
				return removeData.call( this, $.camelCase( key ) );
			} else {
				return removeData.call( this );
			}
		};
	})( $.fn.removeData );
}





// deprecated
$.ui.ie = !!/msie [\w.]+/.exec( navigator.userAgent.toLowerCase() );

$.support.selectstart = "onselectstart" in document.createElement( "div" );
$.fn.extend({
	disableSelection: function() {
		return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
			".ui-disableSelection", function( event ) {
				event.preventDefault();
			});
	},

	enableSelection: function() {
		return this.unbind( ".ui-disableSelection" );
	}
});

$.extend( $.ui, {
	// $.ui.plugin is deprecated. Use $.widget() extensions instead.
	plugin: {
		add: function( module, option, set ) {
			var i,
				proto = $.ui[ module ].prototype;
			for ( i in set ) {
				proto.plugins[ i ] = proto.plugins[ i ] || [];
				proto.plugins[ i ].push( [ option, set[ i ] ] );
			}
		},
		call: function( instance, name, args ) {
			var i,
				set = instance.plugins[ name ];
			if ( !set || !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) {
				return;
			}

			for ( i = 0; i < set.length; i++ ) {
				if ( instance.options[ set[ i ][ 0 ] ] ) {
					set[ i ][ 1 ].apply( instance.element, args );
				}
			}
		}
	},

	// only used by resizable
	hasScroll: function( el, a ) {

		//If overflow is hidden, the element might have extra content, but the user wants to hide it
		if ( $( el ).css( "overflow" ) === "hidden") {
			return false;
		}

		var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
			has = false;

		if ( el[ scroll ] > 0 ) {
			return true;
		}

		// TODO: determine which cases actually cause this to happen
		// if the element doesn't have the scroll set, see if it's possible to
		// set the scroll
		el[ scroll ] = 1;
		has = ( el[ scroll ] > 0 );
		el[ scroll ] = 0;
		return has;
	}
});

})( jQuery );

(function( $, undefined ) {

var uuid = 0,
	slice = Array.prototype.slice,
	_cleanData = $.cleanData;
$.cleanData = function( elems ) {
	for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
		try {
			$( elem ).triggerHandler( "remove" );
		// http://bugs.jquery.com/ticket/8235
		} catch( e ) {}
	}
	_cleanData( elems );
};

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		// proxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		proxiedPrototype = {},
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( !$.isFunction( value ) ) {
			proxiedPrototype[ prop ] = value;
			return;
		}
		proxiedPrototype[ prop ] = (function() {
			var _super = function() {
					return base.prototype[ prop ].apply( this, arguments );
				},
				_superApply = function( args ) {
					return base.prototype[ prop ].apply( this, args );
				};
			return function() {
				var __super = this._super,
					__superApply = this._superApply,
					returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply( this, arguments );

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		})();
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );
};

$.widget.extend = function( target ) {
	var input = slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.widget.extend.apply( null, [ options ].concat(args) ) :
			options;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;
		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			// 1.9 BC for #7810
			// TODO remove dual storage
			.removeData( this.widgetName )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( arguments.length === 1 ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( arguments.length === 1 ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled ui-state-disabled", !!value )
				.attr( "aria-disabled", value );
			this.hoverable.removeClass( "ui-state-hover" );
			this.focusable.removeClass( "ui-state-focus" );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			// accept selectors, DOM elements
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^(\w+)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

})( jQuery );

(function($, undefined) {

var dataSpace = "ui-effects-";

$.effects = {
	effect: {}
};

/*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
(function( jQuery, undefined ) {

	var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",

	// plusequals test for += 100 -= 100
	rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,
	// a set of RE's that can match strings and generate color tuples.
	stringParsers = [{
			re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			parse: function( execResult ) {
				return [
					execResult[ 1 ],
					execResult[ 2 ],
					execResult[ 3 ],
					execResult[ 4 ]
				];
			}
		}, {
			re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			parse: function( execResult ) {
				return [
					execResult[ 1 ] * 2.55,
					execResult[ 2 ] * 2.55,
					execResult[ 3 ] * 2.55,
					execResult[ 4 ]
				];
			}
		}, {
			// this regex ignores A-F because it's compared against an already lowercased string
			re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
			parse: function( execResult ) {
				return [
					parseInt( execResult[ 1 ], 16 ),
					parseInt( execResult[ 2 ], 16 ),
					parseInt( execResult[ 3 ], 16 )
				];
			}
		}, {
			// this regex ignores A-F because it's compared against an already lowercased string
			re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
			parse: function( execResult ) {
				return [
					parseInt( execResult[ 1 ] + execResult[ 1 ], 16 ),
					parseInt( execResult[ 2 ] + execResult[ 2 ], 16 ),
					parseInt( execResult[ 3 ] + execResult[ 3 ], 16 )
				];
			}
		}, {
			re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			space: "hsla",
			parse: function( execResult ) {
				return [
					execResult[ 1 ],
					execResult[ 2 ] / 100,
					execResult[ 3 ] / 100,
					execResult[ 4 ]
				];
			}
		}],

	// jQuery.Color( )
	color = jQuery.Color = function( color, green, blue, alpha ) {
		return new jQuery.Color.fn.parse( color, green, blue, alpha );
	},
	spaces = {
		rgba: {
			props: {
				red: {
					idx: 0,
					type: "byte"
				},
				green: {
					idx: 1,
					type: "byte"
				},
				blue: {
					idx: 2,
					type: "byte"
				}
			}
		},

		hsla: {
			props: {
				hue: {
					idx: 0,
					type: "degrees"
				},
				saturation: {
					idx: 1,
					type: "percent"
				},
				lightness: {
					idx: 2,
					type: "percent"
				}
			}
		}
	},
	propTypes = {
		"byte": {
			floor: true,
			max: 255
		},
		"percent": {
			max: 1
		},
		"degrees": {
			mod: 360,
			floor: true
		}
	},
	support = color.support = {},

	// element for support tests
	supportElem = jQuery( "<p>" )[ 0 ],

	// colors = jQuery.Color.names
	colors,

	// local aliases of functions called often
	each = jQuery.each;

// determine rgba support immediately
supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
support.rgba = supportElem.style.backgroundColor.indexOf( "rgba" ) > -1;

// define cache name and alpha properties
// for rgba and hsla spaces
each( spaces, function( spaceName, space ) {
	space.cache = "_" + spaceName;
	space.props.alpha = {
		idx: 3,
		type: "percent",
		def: 1
	};
});

function clamp( value, prop, allowEmpty ) {
	var type = propTypes[ prop.type ] || {};

	if ( value == null ) {
		return (allowEmpty || !prop.def) ? null : prop.def;
	}

	// ~~ is an short way of doing floor for positive numbers
	value = type.floor ? ~~value : parseFloat( value );

	// IE will pass in empty strings as value for alpha,
	// which will hit this case
	if ( isNaN( value ) ) {
		return prop.def;
	}

	if ( type.mod ) {
		// we add mod before modding to make sure that negatives values
		// get converted properly: -10 -> 350
		return (value + type.mod) % type.mod;
	}

	// for now all property types without mod have min and max
	return 0 > value ? 0 : type.max < value ? type.max : value;
}

function stringParse( string ) {
	var inst = color(),
		rgba = inst._rgba = [];

	string = string.toLowerCase();

	each( stringParsers, function( i, parser ) {
		var parsed,
			match = parser.re.exec( string ),
			values = match && parser.parse( match ),
			spaceName = parser.space || "rgba";

		if ( values ) {
			parsed = inst[ spaceName ]( values );

			// if this was an rgba parse the assignment might happen twice
			// oh well....
			inst[ spaces[ spaceName ].cache ] = parsed[ spaces[ spaceName ].cache ];
			rgba = inst._rgba = parsed._rgba;

			// exit each( stringParsers ) here because we matched
			return false;
		}
	});

	// Found a stringParser that handled it
	if ( rgba.length ) {

		// if this came from a parsed string, force "transparent" when alpha is 0
		// chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
		if ( rgba.join() === "0,0,0,0" ) {
			jQuery.extend( rgba, colors.transparent );
		}
		return inst;
	}

	// named colors
	return colors[ string ];
}

color.fn = jQuery.extend( color.prototype, {
	parse: function( red, green, blue, alpha ) {
		if ( red === undefined ) {
			this._rgba = [ null, null, null, null ];
			return this;
		}
		if ( red.jquery || red.nodeType ) {
			red = jQuery( red ).css( green );
			green = undefined;
		}

		var inst = this,
			type = jQuery.type( red ),
			rgba = this._rgba = [];

		// more than 1 argument specified - assume ( red, green, blue, alpha )
		if ( green !== undefined ) {
			red = [ red, green, blue, alpha ];
			type = "array";
		}

		if ( type === "string" ) {
			return this.parse( stringParse( red ) || colors._default );
		}

		if ( type === "array" ) {
			each( spaces.rgba.props, function( key, prop ) {
				rgba[ prop.idx ] = clamp( red[ prop.idx ], prop );
			});
			return this;
		}

		if ( type === "object" ) {
			if ( red instanceof color ) {
				each( spaces, function( spaceName, space ) {
					if ( red[ space.cache ] ) {
						inst[ space.cache ] = red[ space.cache ].slice();
					}
				});
			} else {
				each( spaces, function( spaceName, space ) {
					var cache = space.cache;
					each( space.props, function( key, prop ) {

						// if the cache doesn't exist, and we know how to convert
						if ( !inst[ cache ] && space.to ) {

							// if the value was null, we don't need to copy it
							// if the key was alpha, we don't need to copy it either
							if ( key === "alpha" || red[ key ] == null ) {
								return;
							}
							inst[ cache ] = space.to( inst._rgba );
						}

						// this is the only case where we allow nulls for ALL properties.
						// call clamp with alwaysAllowEmpty
						inst[ cache ][ prop.idx ] = clamp( red[ key ], prop, true );
					});

					// everything defined but alpha?
					if ( inst[ cache ] && jQuery.inArray( null, inst[ cache ].slice( 0, 3 ) ) < 0 ) {
						// use the default of 1
						inst[ cache ][ 3 ] = 1;
						if ( space.from ) {
							inst._rgba = space.from( inst[ cache ] );
						}
					}
				});
			}
			return this;
		}
	},
	is: function( compare ) {
		var is = color( compare ),
			same = true,
			inst = this;

		each( spaces, function( _, space ) {
			var localCache,
				isCache = is[ space.cache ];
			if (isCache) {
				localCache = inst[ space.cache ] || space.to && space.to( inst._rgba ) || [];
				each( space.props, function( _, prop ) {
					if ( isCache[ prop.idx ] != null ) {
						same = ( isCache[ prop.idx ] === localCache[ prop.idx ] );
						return same;
					}
				});
			}
			return same;
		});
		return same;
	},
	_space: function() {
		var used = [],
			inst = this;
		each( spaces, function( spaceName, space ) {
			if ( inst[ space.cache ] ) {
				used.push( spaceName );
			}
		});
		return used.pop();
	},
	transition: function( other, distance ) {
		var end = color( other ),
			spaceName = end._space(),
			space = spaces[ spaceName ],
			startColor = this.alpha() === 0 ? color( "transparent" ) : this,
			start = startColor[ space.cache ] || space.to( startColor._rgba ),
			result = start.slice();

		end = end[ space.cache ];
		each( space.props, function( key, prop ) {
			var index = prop.idx,
				startValue = start[ index ],
				endValue = end[ index ],
				type = propTypes[ prop.type ] || {};

			// if null, don't override start value
			if ( endValue === null ) {
				return;
			}
			// if null - use end
			if ( startValue === null ) {
				result[ index ] = endValue;
			} else {
				if ( type.mod ) {
					if ( endValue - startValue > type.mod / 2 ) {
						startValue += type.mod;
					} else if ( startValue - endValue > type.mod / 2 ) {
						startValue -= type.mod;
					}
				}
				result[ index ] = clamp( ( endValue - startValue ) * distance + startValue, prop );
			}
		});
		return this[ spaceName ]( result );
	},
	blend: function( opaque ) {
		// if we are already opaque - return ourself
		if ( this._rgba[ 3 ] === 1 ) {
			return this;
		}

		var rgb = this._rgba.slice(),
			a = rgb.pop(),
			blend = color( opaque )._rgba;

		return color( jQuery.map( rgb, function( v, i ) {
			return ( 1 - a ) * blend[ i ] + a * v;
		}));
	},
	toRgbaString: function() {
		var prefix = "rgba(",
			rgba = jQuery.map( this._rgba, function( v, i ) {
				return v == null ? ( i > 2 ? 1 : 0 ) : v;
			});

		if ( rgba[ 3 ] === 1 ) {
			rgba.pop();
			prefix = "rgb(";
		}

		return prefix + rgba.join() + ")";
	},
	toHslaString: function() {
		var prefix = "hsla(",
			hsla = jQuery.map( this.hsla(), function( v, i ) {
				if ( v == null ) {
					v = i > 2 ? 1 : 0;
				}

				// catch 1 and 2
				if ( i && i < 3 ) {
					v = Math.round( v * 100 ) + "%";
				}
				return v;
			});

		if ( hsla[ 3 ] === 1 ) {
			hsla.pop();
			prefix = "hsl(";
		}
		return prefix + hsla.join() + ")";
	},
	toHexString: function( includeAlpha ) {
		var rgba = this._rgba.slice(),
			alpha = rgba.pop();

		if ( includeAlpha ) {
			rgba.push( ~~( alpha * 255 ) );
		}

		return "#" + jQuery.map( rgba, function( v ) {

			// default to 0 when nulls exist
			v = ( v || 0 ).toString( 16 );
			return v.length === 1 ? "0" + v : v;
		}).join("");
	},
	toString: function() {
		return this._rgba[ 3 ] === 0 ? "transparent" : this.toRgbaString();
	}
});
color.fn.parse.prototype = color.fn;

// hsla conversions adapted from:
// https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021

function hue2rgb( p, q, h ) {
	h = ( h + 1 ) % 1;
	if ( h * 6 < 1 ) {
		return p + (q - p) * h * 6;
	}
	if ( h * 2 < 1) {
		return q;
	}
	if ( h * 3 < 2 ) {
		return p + (q - p) * ((2/3) - h) * 6;
	}
	return p;
}

spaces.hsla.to = function ( rgba ) {
	if ( rgba[ 0 ] == null || rgba[ 1 ] == null || rgba[ 2 ] == null ) {
		return [ null, null, null, rgba[ 3 ] ];
	}
	var r = rgba[ 0 ] / 255,
		g = rgba[ 1 ] / 255,
		b = rgba[ 2 ] / 255,
		a = rgba[ 3 ],
		max = Math.max( r, g, b ),
		min = Math.min( r, g, b ),
		diff = max - min,
		add = max + min,
		l = add * 0.5,
		h, s;

	if ( min === max ) {
		h = 0;
	} else if ( r === max ) {
		h = ( 60 * ( g - b ) / diff ) + 360;
	} else if ( g === max ) {
		h = ( 60 * ( b - r ) / diff ) + 120;
	} else {
		h = ( 60 * ( r - g ) / diff ) + 240;
	}

	// chroma (diff) == 0 means greyscale which, by definition, saturation = 0%
	// otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)
	if ( diff === 0 ) {
		s = 0;
	} else if ( l <= 0.5 ) {
		s = diff / add;
	} else {
		s = diff / ( 2 - add );
	}
	return [ Math.round(h) % 360, s, l, a == null ? 1 : a ];
};

spaces.hsla.from = function ( hsla ) {
	if ( hsla[ 0 ] == null || hsla[ 1 ] == null || hsla[ 2 ] == null ) {
		return [ null, null, null, hsla[ 3 ] ];
	}
	var h = hsla[ 0 ] / 360,
		s = hsla[ 1 ],
		l = hsla[ 2 ],
		a = hsla[ 3 ],
		q = l <= 0.5 ? l * ( 1 + s ) : l + s - l * s,
		p = 2 * l - q;

	return [
		Math.round( hue2rgb( p, q, h + ( 1 / 3 ) ) * 255 ),
		Math.round( hue2rgb( p, q, h ) * 255 ),
		Math.round( hue2rgb( p, q, h - ( 1 / 3 ) ) * 255 ),
		a
	];
};


each( spaces, function( spaceName, space ) {
	var props = space.props,
		cache = space.cache,
		to = space.to,
		from = space.from;

	// makes rgba() and hsla()
	color.fn[ spaceName ] = function( value ) {

		// generate a cache for this space if it doesn't exist
		if ( to && !this[ cache ] ) {
			this[ cache ] = to( this._rgba );
		}
		if ( value === undefined ) {
			return this[ cache ].slice();
		}

		var ret,
			type = jQuery.type( value ),
			arr = ( type === "array" || type === "object" ) ? value : arguments,
			local = this[ cache ].slice();

		each( props, function( key, prop ) {
			var val = arr[ type === "object" ? key : prop.idx ];
			if ( val == null ) {
				val = local[ prop.idx ];
			}
			local[ prop.idx ] = clamp( val, prop );
		});

		if ( from ) {
			ret = color( from( local ) );
			ret[ cache ] = local;
			return ret;
		} else {
			return color( local );
		}
	};

	// makes red() green() blue() alpha() hue() saturation() lightness()
	each( props, function( key, prop ) {
		// alpha is included in more than one space
		if ( color.fn[ key ] ) {
			return;
		}
		color.fn[ key ] = function( value ) {
			var vtype = jQuery.type( value ),
				fn = ( key === "alpha" ? ( this._hsla ? "hsla" : "rgba" ) : spaceName ),
				local = this[ fn ](),
				cur = local[ prop.idx ],
				match;

			if ( vtype === "undefined" ) {
				return cur;
			}

			if ( vtype === "function" ) {
				value = value.call( this, cur );
				vtype = jQuery.type( value );
			}
			if ( value == null && prop.empty ) {
				return this;
			}
			if ( vtype === "string" ) {
				match = rplusequals.exec( value );
				if ( match ) {
					value = cur + parseFloat( match[ 2 ] ) * ( match[ 1 ] === "+" ? 1 : -1 );
				}
			}
			local[ prop.idx ] = value;
			return this[ fn ]( local );
		};
	});
});

// add cssHook and .fx.step function for each named hook.
// accept a space separated string of properties
color.hook = function( hook ) {
	var hooks = hook.split( " " );
	each( hooks, function( i, hook ) {
		jQuery.cssHooks[ hook ] = {
			set: function( elem, value ) {
				var parsed, curElem,
					backgroundColor = "";

				if ( value !== "transparent" && ( jQuery.type( value ) !== "string" || ( parsed = stringParse( value ) ) ) ) {
					value = color( parsed || value );
					if ( !support.rgba && value._rgba[ 3 ] !== 1 ) {
						curElem = hook === "backgroundColor" ? elem.parentNode : elem;
						while (
							(backgroundColor === "" || backgroundColor === "transparent") &&
							curElem && curElem.style
						) {
							try {
								backgroundColor = jQuery.css( curElem, "backgroundColor" );
								curElem = curElem.parentNode;
							} catch ( e ) {
							}
						}

						value = value.blend( backgroundColor && backgroundColor !== "transparent" ?
							backgroundColor :
							"_default" );
					}

					value = value.toRgbaString();
				}
				try {
					elem.style[ hook ] = value;
				} catch( e ) {
					// wrapped to prevent IE from throwing errors on "invalid" values like 'auto' or 'inherit'
				}
			}
		};
		jQuery.fx.step[ hook ] = function( fx ) {
			if ( !fx.colorInit ) {
				fx.start = color( fx.elem, hook );
				fx.end = color( fx.end );
				fx.colorInit = true;
			}
			jQuery.cssHooks[ hook ].set( fx.elem, fx.start.transition( fx.end, fx.pos ) );
		};
	});

};

color.hook( stepHooks );

jQuery.cssHooks.borderColor = {
	expand: function( value ) {
		var expanded = {};

		each( [ "Top", "Right", "Bottom", "Left" ], function( i, part ) {
			expanded[ "border" + part + "Color" ] = value;
		});
		return expanded;
	}
};

// Basic color names only.
// Usage of any of the other color names requires adding yourself or including
// jquery.color.svg-names.js.
colors = jQuery.Color.names = {
	// 4.1. Basic color keywords
	aqua: "#00ffff",
	black: "#000000",
	blue: "#0000ff",
	fuchsia: "#ff00ff",
	gray: "#808080",
	green: "#008000",
	lime: "#00ff00",
	maroon: "#800000",
	navy: "#000080",
	olive: "#808000",
	purple: "#800080",
	red: "#ff0000",
	silver: "#c0c0c0",
	teal: "#008080",
	white: "#ffffff",
	yellow: "#ffff00",

	// 4.2.3. "transparent" color keyword
	transparent: [ null, null, null, 0 ],

	_default: "#ffffff"
};

})( jQuery );


/******************************************************************************/
/****************************** CLASS ANIMATIONS ******************************/
/******************************************************************************/
(function() {

var classAnimationActions = [ "add", "remove", "toggle" ],
	shorthandStyles = {
		border: 1,
		borderBottom: 1,
		borderColor: 1,
		borderLeft: 1,
		borderRight: 1,
		borderTop: 1,
		borderWidth: 1,
		margin: 1,
		padding: 1
	};

$.each([ "borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle" ], function( _, prop ) {
	$.fx.step[ prop ] = function( fx ) {
		if ( fx.end !== "none" && !fx.setAttr || fx.pos === 1 && !fx.setAttr ) {
			jQuery.style( fx.elem, prop, fx.end );
			fx.setAttr = true;
		}
	};
});

function getElementStyles( elem ) {
	var key, len,
		style = elem.ownerDocument.defaultView ?
			elem.ownerDocument.defaultView.getComputedStyle( elem, null ) :
			elem.currentStyle,
		styles = {};

	if ( style && style.length && style[ 0 ] && style[ style[ 0 ] ] ) {
		len = style.length;
		while ( len-- ) {
			key = style[ len ];
			if ( typeof style[ key ] === "string" ) {
				styles[ $.camelCase( key ) ] = style[ key ];
			}
		}
	// support: Opera, IE <9
	} else {
		for ( key in style ) {
			if ( typeof style[ key ] === "string" ) {
				styles[ key ] = style[ key ];
			}
		}
	}

	return styles;
}


function styleDifference( oldStyle, newStyle ) {
	var diff = {},
		name, value;

	for ( name in newStyle ) {
		value = newStyle[ name ];
		if ( oldStyle[ name ] !== value ) {
			if ( !shorthandStyles[ name ] ) {
				if ( $.fx.step[ name ] || !isNaN( parseFloat( value ) ) ) {
					diff[ name ] = value;
				}
			}
		}
	}

	return diff;
}

// support: jQuery <1.8
if ( !$.fn.addBack ) {
	$.fn.addBack = function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	};
}

$.effects.animateClass = function( value, duration, easing, callback ) {
	var o = $.speed( duration, easing, callback );

	return this.queue( function() {
		var animated = $( this ),
			baseClass = animated.attr( "class" ) || "",
			applyClassChange,
			allAnimations = o.children ? animated.find( "*" ).addBack() : animated;

		// map the animated objects to store the original styles.
		allAnimations = allAnimations.map(function() {
			var el = $( this );
			return {
				el: el,
				start: getElementStyles( this )
			};
		});

		// apply class change
		applyClassChange = function() {
			$.each( classAnimationActions, function(i, action) {
				if ( value[ action ] ) {
					animated[ action + "Class" ]( value[ action ] );
				}
			});
		};
		applyClassChange();

		// map all animated objects again - calculate new styles and diff
		allAnimations = allAnimations.map(function() {
			this.end = getElementStyles( this.el[ 0 ] );
			this.diff = styleDifference( this.start, this.end );
			return this;
		});

		// apply original class
		animated.attr( "class", baseClass );

		// map all animated objects again - this time collecting a promise
		allAnimations = allAnimations.map(function() {
			var styleInfo = this,
				dfd = $.Deferred(),
				opts = $.extend({}, o, {
					queue: false,
					complete: function() {
						dfd.resolve( styleInfo );
					}
				});

			this.el.animate( this.diff, opts );
			return dfd.promise();
		});

		// once all animations have completed:
		$.when.apply( $, allAnimations.get() ).done(function() {

			// set the final class
			applyClassChange();

			// for each animated element,
			// clear all css properties that were animated
			$.each( arguments, function() {
				var el = this.el;
				$.each( this.diff, function(key) {
					el.css( key, "" );
				});
			});

			// this is guarnteed to be there if you use jQuery.speed()
			// it also handles dequeuing the next anim...
			o.complete.call( animated[ 0 ] );
		});
	});
};

$.fn.extend({
	addClass: (function( orig ) {
		return function( classNames, speed, easing, callback ) {
			return speed ?
				$.effects.animateClass.call( this,
					{ add: classNames }, speed, easing, callback ) :
				orig.apply( this, arguments );
		};
	})( $.fn.addClass ),

	removeClass: (function( orig ) {
		return function( classNames, speed, easing, callback ) {
			return arguments.length > 1 ?
				$.effects.animateClass.call( this,
					{ remove: classNames }, speed, easing, callback ) :
				orig.apply( this, arguments );
		};
	})( $.fn.removeClass ),

	toggleClass: (function( orig ) {
		return function( classNames, force, speed, easing, callback ) {
			if ( typeof force === "boolean" || force === undefined ) {
				if ( !speed ) {
					// without speed parameter
					return orig.apply( this, arguments );
				} else {
					return $.effects.animateClass.call( this,
						(force ? { add: classNames } : { remove: classNames }),
						speed, easing, callback );
				}
			} else {
				// without force parameter
				return $.effects.animateClass.call( this,
					{ toggle: classNames }, force, speed, easing );
			}
		};
	})( $.fn.toggleClass ),

	switchClass: function( remove, add, speed, easing, callback) {
		return $.effects.animateClass.call( this, {
			add: add,
			remove: remove
		}, speed, easing, callback );
	}
});

})();

/******************************************************************************/
/*********************************** EFFECTS **********************************/
/******************************************************************************/

(function() {

$.extend( $.effects, {
	version: "@VERSION",

	// Saves a set of properties in a data storage
	save: function( element, set ) {
		for( var i=0; i < set.length; i++ ) {
			if ( set[ i ] !== null ) {
				element.data( dataSpace + set[ i ], element[ 0 ].style[ set[ i ] ] );
			}
		}
	},

	// Restores a set of previously saved properties from a data storage
	restore: function( element, set ) {
		var val, i;
		for( i=0; i < set.length; i++ ) {
			if ( set[ i ] !== null ) {
				val = element.data( dataSpace + set[ i ] );
				// support: jQuery 1.6.2
				// http://bugs.jquery.com/ticket/9917
				// jQuery 1.6.2 incorrectly returns undefined for any falsy value.
				// We can't differentiate between "" and 0 here, so we just assume
				// empty string since it's likely to be a more common value...
				if ( val === undefined ) {
					val = "";
				}
				element.css( set[ i ], val );
			}
		}
	},

	setMode: function( el, mode ) {
		if (mode === "toggle") {
			mode = el.is( ":hidden" ) ? "show" : "hide";
		}
		return mode;
	},

	// Translates a [top,left] array into a baseline value
	// this should be a little more flexible in the future to handle a string & hash
	getBaseline: function( origin, original ) {
		var y, x;
		switch ( origin[ 0 ] ) {
			case "top": y = 0; break;
			case "middle": y = 0.5; break;
			case "bottom": y = 1; break;
			default: y = origin[ 0 ] / original.height;
		}
		switch ( origin[ 1 ] ) {
			case "left": x = 0; break;
			case "center": x = 0.5; break;
			case "right": x = 1; break;
			default: x = origin[ 1 ] / original.width;
		}
		return {
			x: x,
			y: y
		};
	},

	// Wraps the element around a wrapper that copies position properties
	createWrapper: function( element ) {

		// if the element is already wrapped, return it
		if ( element.parent().is( ".ui-effects-wrapper" )) {
			return element.parent();
		}

		// wrap the element
		var props = {
				width: element.outerWidth(true),
				height: element.outerHeight(true),
				"float": element.css( "float" )
			},
			wrapper = $( "<div></div>" )
				.addClass( "ui-effects-wrapper" )
				.css({
					fontSize: "100%",
					background: "transparent",
					border: "none",
					margin: 0,
					padding: 0
				}),
			// Store the size in case width/height are defined in % - Fixes #5245
			size = {
				width: element.width(),
				height: element.height()
			},
			active = document.activeElement;

		// support: Firefox
		// Firefox incorrectly exposes anonymous content
		// https://bugzilla.mozilla.org/show_bug.cgi?id=561664
		try {
			active.id;
		} catch( e ) {
			active = document.body;
		}

		element.wrap( wrapper );

		// Fixes #7595 - Elements lose focus when wrapped.
		if ( element[ 0 ] === active || $.contains( element[ 0 ], active ) ) {
			$( active ).focus();
		}

		wrapper = element.parent(); //Hotfix for jQuery 1.4 since some change in wrap() seems to actually lose the reference to the wrapped element

		// transfer positioning properties to the wrapper
		if ( element.css( "position" ) === "static" ) {
			wrapper.css({ position: "relative" });
			element.css({ position: "relative" });
		} else {
			$.extend( props, {
				position: element.css( "position" ),
				zIndex: element.css( "z-index" )
			});
			$.each([ "top", "left", "bottom", "right" ], function(i, pos) {
				props[ pos ] = element.css( pos );
				if ( isNaN( parseInt( props[ pos ], 10 ) ) ) {
					props[ pos ] = "auto";
				}
			});
			element.css({
				position: "relative",
				top: 0,
				left: 0,
				right: "auto",
				bottom: "auto"
			});
		}
		element.css(size);

		return wrapper.css( props ).show();
	},

	removeWrapper: function( element ) {
		var active = document.activeElement;

		if ( element.parent().is( ".ui-effects-wrapper" ) ) {
			element.parent().replaceWith( element );

			// Fixes #7595 - Elements lose focus when wrapped.
			if ( element[ 0 ] === active || $.contains( element[ 0 ], active ) ) {
				$( active ).focus();
			}
		}


		return element;
	},

	setTransition: function( element, list, factor, value ) {
		value = value || {};
		$.each( list, function( i, x ) {
			var unit = element.cssUnit( x );
			if ( unit[ 0 ] > 0 ) {
				value[ x ] = unit[ 0 ] * factor + unit[ 1 ];
			}
		});
		return value;
	}
});

// return an effect options object for the given parameters:
function _normalizeArguments( effect, options, speed, callback ) {

	// allow passing all options as the first parameter
	if ( $.isPlainObject( effect ) ) {
		options = effect;
		effect = effect.effect;
	}

	// convert to an object
	effect = { effect: effect };

	// catch (effect, null, ...)
	if ( options == null ) {
		options = {};
	}

	// catch (effect, callback)
	if ( $.isFunction( options ) ) {
		callback = options;
		speed = null;
		options = {};
	}

	// catch (effect, speed, ?)
	if ( typeof options === "number" || $.fx.speeds[ options ] ) {
		callback = speed;
		speed = options;
		options = {};
	}

	// catch (effect, options, callback)
	if ( $.isFunction( speed ) ) {
		callback = speed;
		speed = null;
	}

	// add options to effect
	if ( options ) {
		$.extend( effect, options );
	}

	speed = speed || options.duration;
	effect.duration = $.fx.off ? 0 :
		typeof speed === "number" ? speed :
		speed in $.fx.speeds ? $.fx.speeds[ speed ] :
		$.fx.speeds._default;

	effect.complete = callback || options.complete;

	return effect;
}

function standardAnimationOption( option ) {
	// Valid standard speeds (nothing, number, named speed)
	if ( !option || typeof option === "number" || $.fx.speeds[ option ] ) {
		return true;
	}

	// Invalid strings - treat as "normal" speed
	if ( typeof option === "string" && !$.effects.effect[ option ] ) {
		return true;
	}

	// Complete callback
	if ( $.isFunction( option ) ) {
		return true;
	}

	// Options hash (but not naming an effect)
	if ( typeof option === "object" && !option.effect ) {
		return true;
	}

	// Didn't match any standard API
	return false;
}

$.fn.extend({
	effect: function( /* effect, options, speed, callback */ ) {
		var args = _normalizeArguments.apply( this, arguments ),
			mode = args.mode,
			queue = args.queue,
			effectMethod = $.effects.effect[ args.effect ];

		if ( $.fx.off || !effectMethod ) {
			// delegate to the original method (e.g., .show()) if possible
			if ( mode ) {
				return this[ mode ]( args.duration, args.complete );
			} else {
				return this.each( function() {
					if ( args.complete ) {
						args.complete.call( this );
					}
				});
			}
		}

		function run( next ) {
			var elem = $( this ),
				complete = args.complete,
				mode = args.mode;

			function done() {
				if ( $.isFunction( complete ) ) {
					complete.call( elem[0] );
				}
				if ( $.isFunction( next ) ) {
					next();
				}
			}

			// If the element already has the correct final state, delegate to
			// the core methods so the internal tracking of "olddisplay" works.
			if ( elem.is( ":hidden" ) ? mode === "hide" : mode === "show" ) {
				elem[ mode ]();
				done();
			} else {
				effectMethod.call( elem[0], args, done );
			}
		}

		return queue === false ? this.each( run ) : this.queue( queue || "fx", run );
	},

	show: (function( orig ) {
		return function( option ) {
			if ( standardAnimationOption( option ) ) {
				return orig.apply( this, arguments );
			} else {
				var args = _normalizeArguments.apply( this, arguments );
				args.mode = "show";
				return this.effect.call( this, args );
			}
		};
	})( $.fn.show ),

	hide: (function( orig ) {
		return function( option ) {
			if ( standardAnimationOption( option ) ) {
				return orig.apply( this, arguments );
			} else {
				var args = _normalizeArguments.apply( this, arguments );
				args.mode = "hide";
				return this.effect.call( this, args );
			}
		};
	})( $.fn.hide ),

	toggle: (function( orig ) {
		return function( option ) {
			if ( standardAnimationOption( option ) || typeof option === "boolean" ) {
				return orig.apply( this, arguments );
			} else {
				var args = _normalizeArguments.apply( this, arguments );
				args.mode = "toggle";
				return this.effect.call( this, args );
			}
		};
	})( $.fn.toggle ),

	// helper functions
	cssUnit: function(key) {
		var style = this.css( key ),
			val = [];

		$.each( [ "em", "px", "%", "pt" ], function( i, unit ) {
			if ( style.indexOf( unit ) > 0 ) {
				val = [ parseFloat( style ), unit ];
			}
		});
		return val;
	}
});

})();

/******************************************************************************/
/*********************************** EASING ***********************************/
/******************************************************************************/

(function() {

// based on easing equations from Robert Penner (http://www.robertpenner.com/easing)

var baseEasings = {};

$.each( [ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function( i, name ) {
	baseEasings[ name ] = function( p ) {
		return Math.pow( p, i + 2 );
	};
});

$.extend( baseEasings, {
	Sine: function ( p ) {
		return 1 - Math.cos( p * Math.PI / 2 );
	},
	Circ: function ( p ) {
		return 1 - Math.sqrt( 1 - p * p );
	},
	Elastic: function( p ) {
		return p === 0 || p === 1 ? p :
			-Math.pow( 2, 8 * (p - 1) ) * Math.sin( ( (p - 1) * 80 - 7.5 ) * Math.PI / 15 );
	},
	Back: function( p ) {
		return p * p * ( 3 * p - 2 );
	},
	Bounce: function ( p ) {
		var pow2,
			bounce = 4;

		while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
		return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );
	}
});

$.each( baseEasings, function( name, easeIn ) {
	$.easing[ "easeIn" + name ] = easeIn;
	$.easing[ "easeOut" + name ] = function( p ) {
		return 1 - easeIn( 1 - p );
	};
	$.easing[ "easeInOut" + name ] = function( p ) {
		return p < 0.5 ?
			easeIn( p * 2 ) / 2 :
			1 - easeIn( p * -2 + 2 ) / 2;
	};
});

})();

})(jQuery);

(function( $, window, document, undefined ) {

$.coverflow = {
	renderer : {},
	support : {}
};

function ClassicRenderer( widget, element, items, options ) {

	var me = this;

	me.widget = widget;

	me.element = element;

	me.items = items;

	me.options = options;

}

ClassicRenderer.prototype = {

	cssClass : "classic",

	itemMargin : 0,

	initialize : function() {

		var me = this,
			o = me.options,
			css = {},
			$activeItem = me.items
				.eq( me.widget.currentIndex );

		me.itemSize = $activeItem.width();

		me.outerWidth = me.element.parent().outerWidth( false );

		me.itemMargin = - Math.floor( o.overlap / 2 * $activeItem.innerWidth() );

		me.items
			// apply a negative margin so items overlap
			.css({
				marginLeft : me.itemMargin,
				marginRight : me.itemMargin
			});

		// make sure there's enough space
		css.width = me.items.width() * me.items.length;

		// Center the actual parent's left side within its parent
		$.extend( css, me._getCenterPosition() );
		me.element.css( css );
	},
	_getCenterPosition : function () {
		var me = this,
			pos,
			itemSize = me.itemSize,
			index = me.widget.currentIndex;

		pos = ( me.outerWidth - itemSize ) / 2;
		pos -= index * me.itemSize / 2;
		pos += parseInt( me.element.css( "paddingLeft" ), 10 ) || 0;
		pos -= index * me.itemMargin * 2;

		pos -= me.itemMargin;
		pos = Math.round( pos );

		return { left : pos };
	},
	select : function () {
		return this._getCenterPosition();
	},
	getElementTransitionStyles : function( o ) {

		var transitionFn = $.coverflow.transition[ o.easing ] || $.coverflow.transition.easeOutQuint;
		return $.extend( this._getCenterPosition(), {
					"transition" : "left " + o.duration + "ms " + transitionFn
				});
	},
	refresh : function ( state, from, to ) {
		var me = this,
			o = me.options,
			itemLength = me.items.length,
			itemSize = me.itemSize,
			itemMargin = me.itemMargin;

		this.items.each( function ( i ) {

			var side = ( ( i === to && from - to < 0 ) || i - to  > 0 )
					? "left"
					: "right",
				mod = ( i === to )
					? ( 1 - state )
					: ( i === from ? state : 1 ),
				css = {
					zIndex: itemLength + ( side === "left" ? to - i : i - to ) + 10,
					visibility: "visible"
				},
				scale = ( 1 - mod * ( 1 - o.scale )  ),
				matrixT = [
					scale, ( mod * ( side === "right" ? -0.15 : 0.15 ) ),
					0, scale,
					0, 0
				];

			css.left = (
				( -i * ( itemSize / 2 ) )
				+ ( side === "right"
					? - itemSize / 2 + ( itemSize / 2 * o.overlap )
					: itemSize / 2 - ( itemSize / 2 * o.overlap )
				) * mod
			);

			if( o.visibleAside > 0
				&& ( i < to - o.visibleAside
				|| i > to + o.visibleAside )
			) {
				css.visibility = "hidden";
			}

			if( $.coverflow.isOldie ) {
				if( i === to ) {
					css.left += itemMargin;
					css.top = 0;
				} else {
					css.top = Math.ceil( -itemMargin / 2 );
				}
			}

			me._transform( this, css, matrixT );

			$( this ).css( css );
		});
	},
	_transform : function() {

		var me = this;

		if( $.coverflow.support.transform ) {
			me._matrixTransform.apply( me, arguments );
			return;
		}
		if( $.coverflow.isOldie ) {
			me._fallbackTransform.apply( me, arguments );
		}
	},
	_matrixTransform : function ( el, css, matrixT ) {
		css.transform = "matrix(" + matrixT.join( "," ) + ")";
	},
	_fallbackTransform : function ( el, css, matrixT ) {
		// Adapted from Paul Baukus transformie lib
		if( ! el.filters[ "DXImageTransform.Microsoft.Matrix" ] ) {
			el.style.filter = (el.style.filter ? "" : " " ) + "progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\"auto expand\")";
		}
		var filters = el.filters[ "DXImageTransform.Microsoft.Matrix" ];
		filters.M11 = matrixT[ 0 ];
		filters.M12 = matrixT[ 2 ];
		filters.M21 = matrixT[ 1 ];
		filters.M22 = matrixT[ 3 ];
	}
};

$.extend( $.coverflow.renderer, {
	Classic : ClassicRenderer
});


function toRadian ( angle ) {
	return parseFloat( ( angle * 0.017453 ) .toFixed( 6 ) );
}

function ThreeDRenderer() {
	$.coverflow.renderer.Classic.apply( this, arguments );
}

ThreeDRenderer.prototype = {

	cssClass : "3d",

	initialize : function() {
		var me = this,
			css = {};

		me.itemSize = me.items
				.eq( me.widget.currentIndex )
				.outerWidth( true );

		me.outerWidth = me.element.parent().outerWidth( false );

		// make sure there's enough space
		css.width = me.itemSize * me.items.length;

		// Center the actual parents' left side within its parent
		$.extend(
			css,
			me._getCenterPosition(),
			me._getPerspectiveOrigin()
		);

		me.element
			.css( css );
	},
	getItemRenderedWidth : function () {

		var o = this.options;

		// Estimate the rendered width (not taking perspective into account)
		return Math.cos( toRadian( o.angle ) ) * this.itemSize * o.scale;
	},
	_getPerspectiveOrigin : function () {

		var me = this,
			o = me.options;

		// Center the perspective on the visual center of the container
		return {
			perspectiveOrigin : Math.round( me.itemSize / 2 +
				( me.widget.currentIndex *
					me.getItemRenderedWidth() *
					( 1 - o.overlap )
				) ) + "px " +
				o.perspectiveY + "%"
		};
	},
	_getCenterPosition : function () {
		var me = this,
			pos,
			renderedWidth = me.getItemRenderedWidth(),
			index = me.widget.currentIndex;

		// Get default center
		pos = ( me.outerWidth - me.itemSize ) / 2;

		// Shift left based on the number of elements before selection
		pos -= index * renderedWidth;

		// Adjust back right for the overlap of the elements
		pos += index * renderedWidth * me.options.overlap;

		// Adjust for the padding
		pos -= parseInt( me.element.css( "paddingLeft" ), 10 ) || 0;

		pos = Math.round( pos );

		return { left : pos };
	},
	select : function () {

		return $.extend(
			{},
			this._getCenterPosition(),
			this._getPerspectiveOrigin()
		);
	},
	getElementTransitionStyles : function ( o ) {

		var me = this,
			transitionFn = $.coverflow.transition[ o.easing ] || $.coverflow.transition.easeOutQuint,
			css = {
				transitionProperty : "left",
				transitionDuration : o.duration + "ms",
				transitionTimingFunction : transitionFn,
				transitionDelay : "initial"
			};

		return $.extend(
				css,
				me._getCenterPosition(),
				me._getPerspectiveOrigin()
			);
	},
	refresh : function ( state, from, to ) {
		var me = this,
			o = me.options,
			itemLength = me.items.length,
			itemSize = me.itemSize,
			renderedWidth = me.getItemRenderedWidth();

		this.items.each( function ( i ) {

			var side = ( ( i === to && from - to < 0 ) || i - to  > 0 )
					? "left"
					: "right",
				mod = ( i === to )
					? ( 1 - state )
					: ( i === from ? state : 1 ),
				css = {
					zIndex: itemLength + ( side === "left" ? to - i : i - to ) + 10,
					visibility: "visible"
				},
				scale = 1 - ( mod * ( 1 - o.scale ) ),
				angle = side === "right" ? o.angle : - o.angle,
				matrixT;

			angle = toRadian( mod * angle );

			// Adjust left to center active item in display window
			css.left = Math.round(
				-i * itemSize +
				( mod * i * renderedWidth * ( 1 - o.overlap ) ) +
				( ( 1 - mod ) * i * renderedWidth * ( 1 - o.overlap ) )
			);

			if( o.visibleAside > 0
				&& ( i < to - o.visibleAside
				|| i > to + o.visibleAside )
			) {
				css.visibility = "hidden";
			}

			// transponed matrix
			matrixT = [
				( scale * Math.cos( angle ) ).toFixed( 6 ), 0,     Math.sin( -angle ).toFixed( 6 ),           0,
				0,                                          scale, 0,                                         0,
				Math.sin( angle ).toFixed( 6 ),             0,     ( scale * Math.cos( angle )).toFixed( 6 ), 0,
				0,                                          0,     0,                                         1
			];

			css.transform = "matrix3d(" + matrixT.join( ", ") + ")";
			css.transformOrigin = side === "right" ? "left center" : "right center";

			$( this ).css( css );
		});
	}
};

$.extend( $.coverflow.renderer, {
	ThreeD : ThreeDRenderer
});

/**
 * extends jQuery.support by the following properties:
 *
 * - transform
 * - transition
 *
 * polyfills requestAnimationFrame/cancelAnimationFrame
 *
 * extends jQuery.cssProps:
 * - transitionProperty
 * - transitionDuration
 * - transitionTimingFunction
 * - transitionDelay
 * - perspectiveOrigin
 *
 */

	/**
	 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	 *
	 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	 * MIT license
	 *
	 * @see https://gist.github.com/paulirish/1579671
	 */

	var el = document.createElement( "div" ),
		style = el.style,
		lastTime = 0,
		vendors = [ "ms", "moz", "webkit", "o" ],
		vendorsLength = vendors.length,
		vendorPrefix = "",
		x = 0,
		support = $.coverflow.support,
		capitalize = function( string ) {
			return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
		};

	for( ; x < vendorsLength && ! window.requestAnimationFrame; x++ ) {
		window.requestAnimationFrame = window[ vendors[ x ] + "RequestAnimationFrame" ];
		window.cancelAnimationFrame = window[ vendors[ x ] + "CancelAnimationFrame" ] ||
			window[ vendors[ x ] + "CancelRequestAnimationFrame" ];
	}

	if ( ! window.requestAnimationFrame ) {
		window.requestAnimationFrame = function( callback ) {
			var currTime = new Date().getTime(),
				timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) ),
				id = window.setTimeout( function() {
					callback( currTime + timeToCall );
				}, timeToCall );

			lastTime = currTime + timeToCall;

			return id;
		};
	}

	if ( ! window.cancelAnimationFrame ) {
		window.cancelAnimationFrame = function( id ) {
			clearTimeout( id );
		};
	}

	// Check for vendor prefixed support of transition events first
	// Some Webkit browsers on Android are providing false positives
	// on non-prefixed transition event handlers
	// e.g. Webkit on Galaxy Tab II
	$.each( vendors, function( i, p ) {

		if( p !== "ms" ) {
			p = capitalize( p );
		}
		if( ! support.transform  && p + "Transform" in style ) {
			support.transform = p + "Transform";
		}
		if( ! support.transition && p + "Transition" in style ) {
			support.transition = p + "Transition";
		}

		if( support.transform && support.transition ) {
			vendorPrefix = p;
			return false;
		}
		return true;
	});

	if( ! support.transform || ! support.transition ) {

		support.transform = "transform" in style ? "transform" : false;
		support.transition = "transition" in style ? "transition" : false;
	}

	// expose feature support if not already set
	if( $.support.transform == null ) {
		$.support.transform = support.transform;
	}
	if( $.support.transition == null ) {
		$.support.transition = support.transition;
	}

	if( $.cssProps == null ) {
		throw new Error( "Your jQuery version is too old. Please upgrade." );
	}

	if( !! vendorPrefix ) {

		$.each([
				"transitionProperty",
				"transitionDuration",
				"transitionTimingFunction",
				"transitionDelay",
				"perspectiveOrigin"
			], function( i, cssProperty ) {

				if( $.cssProps[ cssProperty ] != null ) {
					return;
				}

				$.cssProps[ cssProperty ] = vendorPrefix + capitalize( cssProperty );
			});
	}

	el = null;


/*
 * Detect support for 3d css transformations
 * Based on Modernizr 2.7.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms3d-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes
 */

    var docElement = document.documentElement,

        mod = "coverflowjsfeaturedetection",
        modElem = document.createElement( mod ),
        mStyle = modElem.style,

        omPrefixes = "Webkit Moz O ms",

        cssomPrefixes = omPrefixes.split( " " ),

        domPrefixes = omPrefixes.toLowerCase().split( " " ),

        injectElementWithStyles = function( rule, callback, nodes, testnames ) {

            var style, ret, node, docOverflow,
                div = document.createElement( "div" ),
                body = document.body,
                fakeBody = body || document.createElement( "body" );

            if( parseInt( nodes, 10 ) ) {
                while( nodes-- ) {
                    node = document.createElement( "div" );
                    node.id = testnames ? testnames[ nodes ] : mod + ( nodes + 1 );
                    div.appendChild(node);
                }
            }

            style = [ "&#173;", "<style id='s", mod, "'>", rule, "</style>" ].join( "" );
            div.id = mod;
            ( body ? div : fakeBody ).innerHTML += style;
            fakeBody.appendChild(div);
            if( ! body ) {
                fakeBody.style.background = "";
                fakeBody.style.overflow = "hidden";
                docOverflow = docElement.style.overflow;
                docElement.style.overflow = "hidden";
                docElement.appendChild( fakeBody );
            }

            ret = callback( div, rule );
            if( ! body ) {
                fakeBody.parentNode.removeChild( fakeBody );
                docElement.style.overflow = docOverflow;
            } else {
                div.parentNode.removeChild(div);
            }

            return !!ret;

        },

        _hasOwnProperty = ({}).hasOwnProperty,
        hasOwnProp;

	function is( obj, type ) {
        return typeof obj === type;
    }

    if( ! is( _hasOwnProperty, "undefined" ) && ! is( _hasOwnProperty.call, "undefined" ) ) {
        hasOwnProp = function( object, property ) {
            return _hasOwnProperty.call(object, property);
        };
    } else {
        hasOwnProp = function( object, property ) {
            return ( ( property in object ) && is( object.constructor.prototype[ property ], "undefined"));
        };
    }

    function contains( str, substr ) {
        return !!~( "" + str ).indexOf( substr );
    }

    function testProps( props, prefixed ) {

		var i, prop;

		for( i in props ) {
            prop = props[ i ];
            if( ! contains( prop, "-" ) && mStyle[ prop ] !== undefined) {
                return prefixed === "pfx" ? prop : true;
            }
        }
        return false;
    }

    function testDOMProps( props, obj, elem ) {

		var i, item;

		for( i in props ) {
            item = obj[ props[ i ] ];
            if( item !== undefined) {

                if( elem === false) {
					return props[ i ];
                }

                if( is( item, "function" ) ) {
                    return $.proxy( item, elem || obj );
                }

                return item;
            }
        }
        return false;
    }

    function testPropsAll(prop, prefixed, elem) {

        var ucProp = prop.charAt( 0 ).toUpperCase() + prop.slice( 1 ),
            props = ( prop + " " + cssomPrefixes.join( ucProp + " " ) + ucProp).split( " " );

        if( is( prefixed, "string" ) || is( prefixed, "undefined" ) ) {
            return testProps( props, prefixed );

        } else {
            props = ( prop + " " + ( domPrefixes ).join( ucProp + " " ) + ucProp ).split( " " );
            return testDOMProps( props, prefixed, elem );
        }
    }

    $.coverflow.support.transform3d = (function() {

        var ret = !! testPropsAll( "perspective" );

        if( ret && "webkitPerspective" in docElement.style ) {

            injectElementWithStyles(
				"@media (transform-3d),(-webkit-transform-3d){#coverflowjsfeaturedetection{left:9px;position:absolute;height:3px;}}",
				function( node )
			{
                ret = node.offsetLeft === 9 && node.offsetHeight === 3;
            });
        }
        return ret;
    })();

	// expose feature support if not already set
    if( $.support.transform3d == null ) {
	    $.support.transform3d = $.coverflow.support.transform3d;
    }


/**
 * @license Released under the MIT license.
 *
 * CoverflowJS
 *
 * 3D transformations: Brandon Belvin
 * Refactored for jQuery 1.8 / jQueryUI 1.9 Sebastian Sauer
 * Re-written for jQueryUI 1.8.6/jQuery core 1.4.4+ by Addy Osmani with adjustments
 * Maintenance updates for 1.8.9/jQuery core 1.5, 1.6.2 made.
 * Original Component: Paul Bakaus for jQueryUI 1.7
 *
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 *
 * In case you want swipe support and you don't use jQuery mobile yet:
 * jquery-mobile.custom.js
 *
 * $.animate support for older browsers depends on:
 *  jquery.ui.effect.js
 *
 * Events:
 *  beforeselect
 *  select
 */


	function debounce( func, threshold ) {

		var timeout;

		return function() {
			var obj = this,
				args = arguments;

			if( timeout ) {
				clearTimeout( timeout );
			}

			timeout = setTimeout(function() {
						func.apply( obj, args );
						timeout = null;
					}, threshold
				);
		};
	}

	var eventsMap = {
			"transition":     "transitionend",
			"MozTransition":  "transitionend",
			"OTransition":    "oTransitionEnd",
			"WebkitTransition": "webkitTransitionEnd",
			"msTransition":   "transitionend"
		},
		userAgent = navigator.userAgent.toLowerCase(),
		isOldie = (function() {

			var match = /(msie) ([\w.]+)/.exec( userAgent );

			return match !== null && match[ 1 ] && ( ~~ match[ 2 ] ) < 10;
		})();

	$.coverflow = $.extend( true, {}, $.coverflow, {

		isAndroid : (/android/).test( userAgent ),

		isOldie : isOldie,

		transition : {

			/**
			 * @see http://matthewlein.com/ceaser/
			 *
			 * easing not available as css timing functions:
			 *
			 * easeInElastic
			 * easeOutElastic
			 * easeInOutElastic
			 *
			 * easeInBounce
			 * easeOutBounce
			 * easeInOutBounce
			 */

			// ease-in
			"easeInQuad" : "cubic-bezier( .55,.085,.68,.53 )",
			"easeInCubic": "cubic-bezier( .550, .055, .675, .190 )",
			"easeInQuart": "cubic-bezier( .895, .03, .685, .22 )",
			"easeInQuint": "cubic-bezier( .755, .05, .855, .06 )",
			"easeInSine" : "cubic-bezier( .47, 0, .745, .715 )",
			"easeInExpo" : "cubic-bezier( .95, .05, .795, .035 )",
			"easeInCirc" : "cubic-bezier( .6, .04, .98, .335 )",
			"easeInBack" : "cubic-bezier( .6, -.28, .735, .045 )",

			// ease-out
			"easeOutQuad" : "cubic-bezier( .25,.46,.45,.94 )",
			"easeOutCubic": "cubic-bezier( .215,.61,.355,1 )",
			"easeOutQuart": "cubic-bezier( .165, .84, .44, 1 )",
			"easeOutQuint": "cubic-bezier( .23, 1, .32, 1 )",
			"easeOutSine" : "cubic-bezier( .39, .575, .565, 1 )",
			"easeOutExpo" : "cubic-bezier( .19,1,.22,1 )",
			"easeOutCirc" : "cubic-bezier( .075, .82, .165, 1 )",
			"easeOutBack" : "cubic-bezier( .175, .885, .32, 1.275 )",

			// ease-in-out
			"easeInOutQuad" : "cubic-bezier( .455, .03, .515, .955 )",
			"easeInOutCubic": "cubic-bezier( .645, .045, .355, 1 )",
			"easeInOutQuart": "cubic-bezier( .77, 0, .175, 1 )",
			"easeInOutQuint": "cubic-bezier( .86, 0, .07, 1 )",
			"easeInOutSine" : "cubic-bezier( .445, .05, .55, .95 )",
			"easeInOutExpo" : "cubic-bezier( 1, 0, 0, 1 )",
			"easeInOutCirc" : "cubic-bezier( .785, .135, .15, .86 )",
			"easeInOutBack" : "cubic-bezier( .68, -.55, .265, 1.55 )"
		},
		renderer : {}
	});

	$.widget( "ui.coverflow", {

		options: {
			items : "> *",
			active : 0,
			duration : 400,
			visibleAside: null,
			easing : "easeOutQuint",
			// renderer options
			// angle and perspective are only available when the browser supports 3d transformations
			angle: 45,
			perspectiveY: 45,
			scale: 0.7,
			overlap: 0.3,
			// selection triggers
			trigger : {
				itemfocus : false,
				itemclick : true,
				mousewheel : true,
				// if swipe is enabled, itemfocus will be set to false
				swipe : true
			}
		},
		isTicking : false,
		_create : function () {

			var me = this,
				o = this.options,
				Renderer,
				rendererOptions,
				support = $.coverflow.support || {};

			me.elementOrigStyle = me.element.attr( "style" );

			me.items = me.element.find( o.items )
					.each( function () {
						var $this = $( this );
						$this.data({
							coverflowOrigElemAttr : {
								style : $this.attr( "style" ),
								"class" : $this.attr( "class" ),
								// Tab index is included here as attr, even though we call it as a prop because when you removeProp it sets it to 0 instead of actually removing
								tabIndex : $this.attr( "tabIndex" )
							}
						});
					})
					.addClass( "ui-coverflow-item" );

			me._setDimensions();

			me.support = support;

			if ( // transform is not supported
				! support.transform
				// or is old IE
				|| isOldie
				// or it's opera: fails to create a perspective on coverflow items
				|| window.opera != null
				// or no css3 transformation is available
				|| ! support.transform3d
			) {
				Renderer = $.coverflow.renderer.Classic;
			} else {
				Renderer = $.coverflow.renderer.ThreeD;
			}

			rendererOptions = {
				angle: o.angle,
				perspectiveY: o.perspectiveY,
				scale: o.scale,
				overlap: o.overlap,
				itemSize : me.itemSize,
				visibleAside: o.visibleAside !== null && ! isNaN( parseInt( o.visibleAside, 10 ) )
					? parseInt( o.visibleAside, 10 )
					: 0,
				outerWidth : me.outerWidth
			};

			me.renderer = new Renderer(
					me,
					me.element,
					me.items,
					rendererOptions
				);

			me.element
				.addClass( "ui-coverflow ui-coverflow-" + me.renderer.cssClass + "-render" )
				.parent()
				.addClass( "ui-coverflow-wrapper ui-clearfix" );

			if( o.trigger.itemfocus ) {
				this._bindFocus();
			}

			if( o.trigger.itemclick ) {
				me._on( me.items, { click : me._select });
			}

			if( o.trigger.mousewheel ) {
				me._on({
					wheel: debounce(me._onMouseWheel, 20),
					DOMMouseScroll: debounce(me._onMouseWheel, 20)
				});

				me._on({
					wheel: me._preventPageScroll,
					DOMMouseScroll: me._preventPageScroll
				});
			}

			if( o.trigger.swipe ) {
				me._bindSwipe();
			}

			me.useJqueryAnimate = ! ( support.transition && $.isFunction( window.requestAnimationFrame ) );

			me.coverflowrafid = 0;
		},
		_bindFocus : function() {
			var me = this;

			// set tabindex so widget items get focusable
			// makes items accessible by keyboard
			me.items
				.prop( "tabIndex", 0 );

			me._on( me.items, { focus : me._select });
		},
		_bindSwipe : function() {

			var me = this,
				$el = me.element,
				hasJqm = false,
				hasHammer = false;

			// jQuery mobile
			if( $.event.special && $.event.special.swipe ) {

				hasJqm = true;

				if( $.coverflow.isAndroid ) {
					$.event.special.swipe.scrollSupressionThreshold = 0;
				}

				$.event.special.swipe.handleSwipe = function( start, stop ) {

					var startPos = start.coords,
						endPos = stop.coords,
						swipeEv = $.event.special.swipe;

					if ( stop.time - start.time < swipeEv.durationThreshold &&
						Math.abs( startPos[ 0 ] - endPos[ 0 ] ) > swipeEv.horizontalDistanceThreshold &&
						Math.abs( startPos[ 1 ] - endPos[ 1 ] ) < swipeEv.verticalDistanceThreshold
					) {

						start.origin
							.trigger( "swipe", { swipestart: start, swipestop: stop } )
							.trigger(
								start.coords[0] > stop.coords[ 0 ]
									? "swipeleft"
									: "swiperight", { swipestart: start, swipestop: stop }
							);
					}
				};

				me._on({
					swipe : debounce( me._handleJQmSwipe, 150 )
				});
			}

			// hammer.js
			if( $el.hammer && window.Hammer != null ) {

				hasHammer = true;

				$el
					.hammer()
					.on("drag swipe", function(ev) {

						// only horizontal swipe
						if( Hammer.utils.isVertical( ev.gesture.direction) ) {
						   return;
						}

						// prevent scrolling, so the drag/swipe handler is getting called
						// fix swipe on webkit based Android browsers
						ev.gesture.preventDefault();
					});

				me._on({
					swipe: me._handleHammerSwipe
				});
			}

			if( ! hasJqm && ! hasHammer ) {
				me._on({
					swipeleft : me.next,
					swiperight : me.prev
				});
			}
		},
		_init : function () {
			var me = this,
				o = me.options;

			o.duration = ~~ o.duration;
			if( o.duration < 1 ) {
				o.duration = 1;
			}

			me.currentIndex = me._isValidIndex( o.active, true ) ? o.active : 0;
			me.activeItem = me.items
				.removeClass( "ui-state-active" )
				.eq( me.currentIndex )
				.addClass( "ui-state-active" );

			me._setDimensions();

			// Call renderer-specific code
			me.renderer.initialize();

			// Jump to the first item
			me._refresh( 1, me._getFrom(), me.currentIndex );

			me._trigger( "beforeselect", null, me._ui() );
			me._trigger( "select", null, me._ui() );
		},
		_setDimensions : function() {
			var me = this;

			me.itemWidth = me.items.width();

			me.itemHeight = me.items.height();

			me.itemSize = me.items.outerWidth( true );

			me.outerWidth = me.element.parent().outerWidth( false );
		},
		_isValidIndex : function ( index, ignoreCurrent ) {
			ignoreCurrent = !! ignoreCurrent;
			index = ~~index;
			return ( this.currentIndex !== index || ignoreCurrent ) && index > -1 && !! this.items.get( index );
		},
		_select: function ( ev ) {
			this.select( ev.currentTarget );
		},
		next : function () {
			return this.select( this.currentIndex + 1 );
		},
		prev : function () {
			return this.select( this.currentIndex - 1 );
		},
		_handleJQmSwipe : function ( ev, data ) {
			var start = data.swipestart,
				stop = data.swipestop,
				time = stop.time - start.time,
				distance = stop.coords[ 0 ] - start.coords[ 0 ],
				speed = distance / time,
				direction = distance < 0 ? "left" : "right";

			this._handleSwipe( direction, speed );
		},
		_handleHammerSwipe : function( ev ) {
			var gesture = ev.gesture;

			this._handleSwipe(
				gesture.direction,
				gesture.distance / gesture.deltaTime
			);
		},
		_handleSwipe : function( direction, speed ) {

			var me = this,
				delta,
				destination;

			delta = me.outerWidth * ( Math.pow( speed, 2 ) ) * 0.25;
			delta /= me.itemWidth;
			delta = Math.floor( delta ) * ( direction === "left" ? 1 : -1 );

			destination = me.currentIndex + delta;

			if( ! delta ) {
				( direction === "left" ) ? me.next() : me.prev();
				return;
			}
			if( destination < 0 ) {
				me.select( 0 );
				return;
			}

			if( me._isValidIndex( destination ) ) {
				me.select( destination );
				return;
			}
			me.select( me.items.length - 1 );
		},
		_getFrom : function () {
			var me = this;

			return Math.abs( me.previous - me.currentIndex ) <= 1
				? me.previousIndex
				: me.currentIndex + ( me.previousIndex < me.currentIndex ? -1 : 1 );
		},
		select : function( item ) {

			var me = this,
				o = me.options,
				index = ! isNaN( parseInt( item, 10 ) )
						? parseInt( item, 10 )
						: me.items.index( item ),
				animation;

			if( ! me._isValidIndex( index ) ) {
				return false;
			}

			if( false === me._trigger(
					"beforeselect",
					null,
					this._ui(
						me.items.eq( index ), index
					)
				)
			) {
				return false;
			}

			if( me.isTicking ) {
				if( me.useJqueryAnimate ) {
					me.element.stop( true, false );
				} else {

					if( me.coverflowrafid ) {
						window.cancelAnimationFrame( me.coverflowrafid );
					}

					me.element
						.unbind( eventsMap[ me.support.transition ] );
				}
			}
			me.isTicking = true;

			me.previousIndex = me.currentIndex;
			o.active = me.currentIndex = index;

			animation = $.extend( {}, me.renderer.select(), {
					coverflow : 1
				});

			if( me.useJqueryAnimate ) {

				me._animation( o, animation );
			} else {

				o = $.extend({
						duration: o.duration,
						easing: o.easing
					}, animation );

				me._transition( o );
			}

			return true;
		},
		_animation : function( o, animation ) {

			var me = this,
				from = this._getFrom();

			// Overwrite $.fx.step.coverflow everytime again with custom scoped values for this specific animation
			$.fx.step.coverflow = function( fx ) {
				me._refresh( fx.now, from, me.currentIndex );
			};

			// 1. Stop the previous animation
			// 2. Animate the parent's left/top property so the current item is in the center
			// 3. Use our custom coverflow animation which animates the item

			me.element
				.animate(
					animation,
					{
						duration: o.duration,
						easing: o.easing
					}
				)
				.promise()
				.done(function() {
					me._onAnimationEnd();
				});
		},
		_transition : function( o ) {
			var me = this,
				d = new Date(),
				from = me._getFrom(),
				to = me.currentIndex,
				styles = {},
				loopRefresh = function() {
					var state = ( (new Date()).getTime() - d.getTime() ) / o.duration;

					if( state > 1 ) {
						me.isTicking = false;
					} else {
						me._refresh( state, from, to );
					}

					if( me.isTicking ) {
						me.coverflowrafid = window.requestAnimationFrame( loopRefresh );
					}
				};


			if( $.isFunction( me.renderer.getElementTransitionStyles ) ) {
				styles = $.extend( styles, me.renderer.getElementTransitionStyles( o ) );
			}

			me.element
				.one( eventsMap[ me.support.transition ],
					function() {
						me._refresh( 1, from, to );
						me._onAnimationEnd();
					}
				)
				.css( styles );

			me.coverflowrafid = window.requestAnimationFrame( loopRefresh );
		},
		_onAnimationEnd : function() {

			var me = this;

			if( me.coverflowrafid ) {
				cancelAnimationFrame( me.coverflowrafid );
			}

			me.isTicking = false;
			me.activeItem = me.items
					.removeClass( "ui-state-active" )
					.eq( me.currentIndex )
					.addClass( "ui-state-active" );

			// fire select after animation has finished
			me._trigger( "select", null, me._ui() );
		},
		_refresh: function( state, from, to ) {
			this.element
				.parent()
				.scrollTop( 0 );

			this.renderer.refresh( state, from, to );

		},
		_ui : function ( active, index ) {
			return {
				active: active || this.activeItem,
				index: index != null ? index : this.currentIndex
			};
		},
		_preventPageScroll : function(ev) {
			ev.preventDefault();
		},
		_onMouseWheel : function ( ev ) {
			var origEv = ev.originalEvent,
				delta = Math.abs(origEv.wheelDelta) > 0 ? origEv.wheelDelta : -origEv.detail;

			// mac os specific - fighting trackpad clumsy scrolling behaviour
			if( delta > -10 && delta < 3 ) {
				return;
			}

			if( delta > 0 ) {
				this.prev();
				return;
			}
			this.next();
		},
		_destroy : function () {

			var me = this;

			if ( me.elementOrigStyle !== undefined ) {
				me.element.attr( "style", this.elementOrigStyle );
			} else {
				me.element.removeAttr( "style" );
			}

			me.element
				.removeClass(
					"ui-coverflow ui-helper-clearfix ui-coverflow-"
					+ ( me.renderer.cssClass || "classic" ) + "-render"
				)
				.parent()
				.removeClass( "ui-coverflow-wrapper ui-clearfix" );

			me.items
				.removeClass( "ui-coverflow-item ui-state-active" )
				.each(function(){
					var $this = $( this ),
						origAttr = $this.data( "coverflowOrigElemAttr" );

					$.each( origAttr, function( name, value ) {
						if ( value !== undefined ) {
							$this.attr( name, value );
						} else {
							$this.removeAttr( name );
						}
					});

					$this.data( "coverflowOrigElemAttr", null );
				});

			me._super();
		}
	});


})( jQuery, this, this.document );
