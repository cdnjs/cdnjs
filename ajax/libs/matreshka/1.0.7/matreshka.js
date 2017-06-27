/*
	Matreshka v1.0.7 (2015-09-09)
	JavaScript Framework by Andrey Gubanov
	Released under the MIT license
	More info: http://matreshka.io
*/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('xclass',factory);
    } else {
        // Browser globals
        root.Class = factory();
    }
}(this, function () {
	var isArguments = function( o ) {
		return !!o && ( o.toString() === '[object Arguments]' || typeof o === 'object' && o !== null && 'length' in o && 'callee' in o );
	},
	ie = (function() {
		// Returns the version of Internet Explorer or a -1 (indicating the use of another browser).
		var rv = -1,
			ua, re;
		if ( navigator.appName == 'Microsoft Internet Explorer' ) {
			ua = navigator.userAgent;
			re = new RegExp( 'MSIE ([0-9]{1,}[\.0-9]{0,})' );
			if ( re.exec(ua) != null ) {
				rv = parseFloat( RegExp.$1 );
			}
		}
		return rv;
	})(),
	ieDocumentMode = document.documentMode,
	ie8 = ieDocumentMode === 8,
	err = 'Internet Explorer ' + ie + ' doesn\'t support Class function';
	if( ~ie && ie < 8 ) {
		throw Error( err );
	} else if( ieDocumentMode < 8 ) {
		throw Error( err + '. Switch your "Document Mode" to "Standards"' );
	}
	
		
	
	var Class = function( prototype ) {
		var constructor = realConstructor = prototype.constructor !== Object ? prototype.constructor : function EmptyConstructor() {},
			extend = prototype[ 'extends' ] = prototype[ 'extends' ] || prototype.extend,
			extend_prototype = extend && extend.prototype,
			implement = prototype[ 'implements' ] = prototype[ 'implements' ] || prototype.implement,
			realConstructor = constructor,
			parent = {};
		
		delete prototype.extend;
		delete prototype.implement;
		
		if( extend_prototype ) {
			for( var key in extend_prototype ) {
				parent[ key ] = typeof extend_prototype[ key ] === 'function' ? ( function( value ) {
					return function( context, args ) {
						args = isArguments( args ) ? args : Array.prototype.slice.call( arguments, 1 );
						return value.apply( context, args );
					}
				})( extend_prototype[ key ] ) : extend_prototype[ key ];
			}
			
			parent.constructor = ( function( value ) {
				return function( context, args ) {
					args = isArguments( args ) ? args : Array.prototype.slice.call( arguments, 1 );
					return value.apply( context, args );
				}
			})( extend_prototype.constructor );
		}
		
		if( ie8 ) {
			prototype.prototype = null;
			prototype.constructor = null;
			constructor = function() {
				if( this instanceof constructor ) {
					var r = new XDomainRequest;
					for( var p in constructor.prototype ) if( p !== 'constructor' ) {
						r[ p ] = constructor.prototype[ p ];
					}
					r.hasOwnProperty = constructor.prototype.hasOwnProperty;
					realConstructor.apply( r, arguments );

					return r;
				} else {
					realConstructor.apply( this, arguments );
				}			
			};
			
			prototype.constructor = constructor;
			constructor.prototype = constructor.fn = prototype;
			constructor.parent = parent;
			extend && Class.IEInherits( constructor, extend );
		} else {
			prototype.constructor = constructor;
			constructor.prototype = constructor.fn = prototype;
			constructor.parent = parent;

			extend && Class.inherits( constructor, extend );
		}
		
		implement && implement.validate( constructor.prototype );
		
		constructor.same = function() {
			return function() {
				return constructor.apply( this, arguments );
			};
		};
		
		if( this instanceof Class ) {
			return new constructor;
		} else {
			return constructor;
		}
	};

	Class.inherits = function( Child, Parent ) {
		var prototype = Child.prototype,
			F = function() {};
		F.prototype = Parent.prototype;
		Child.prototype = new F;
		Child.prototype.constructor = Child;
		for( var m in prototype ) {
			Child.prototype[ m ] = prototype[ m ];
		};
		
		if( typeof Symbol != 'undefined' && prototype[ Symbol.iterator ] ) {
			Child.prototype[ Symbol.iterator ] = prototype[ Symbol.iterator ];
		}
		
		Child.prototype.instanceOf = function( _Class ) {
			return this instanceof _Class;
		}
	};

	Class.IEInherits = function( Child, Parent ) {
		var childHasOwn = Child.prototype.hasOwnProperty,
			childConstructor = Child.prototype.constructor,
			parentHasOwn,
			objectHasOwn = Object.prototype.hasOwnProperty;
		while ( Parent ) {
			parentHasOwn = parentHasOwn || Parent.prototype.hasOwnProperty,
			Child.prototype = ( function( pp, cp ) { // extending
				var o = {},
					i;
				for( i in pp )  {
					o[ i ] = pp[ i ]
				}
				for( i in cp ) {
					o[ i ] = cp[ i ]
				}
				return o;
			})( Parent.prototype, Child.prototype );
			Parent = Parent.prototype && Parent.prototype[ 'extends' ] && Parent.prototype[ 'extends' ].prototype;
		}

		if( childHasOwn !== objectHasOwn ) {
			Child.prototype.hasOwnProperty = childHasOwn;
		} else if( parentHasOwn !== objectHasOwn ) {
			Child.prototype.hasOwnProperty = parentHasOwn;
		}
		
		Child.prototype.constructor = childConstructor;
		
		Child.prototype.instanceOf = function( _Class ) {
			var PossibleParent = Child;
			while( PossibleParent ) {
				if( PossibleParent === _Class ) {
					return true;
				}
				PossibleParent = PossibleParent.prototype[ 'extends' ]
			}
			return false;
		}
	};

	
	Class.Interface = function Interface( parent, props ) {
		var propsMap = {},
			isArray = function( probArray ) {
				return typeof probArray === 'object' && probArray !== null && 'length' in probArray;
			},
			properties,
			list;
		if( parent instanceof Interface ) {
			for( var i in parent.propsMap ) propsMap[ i ] = 1;
			properties = isArray( props ) ? props : [].slice.call( arguments, 1 );
		} else {
			properties = isArray( parent ) ? parent : arguments;
		}
		for( i = 0; i < properties.length; i++ ) {
			propsMap[ properties[ i ] ] = 1;
		}
		
		this.propsMap = propsMap;
		
		this.validate = function( prototype ) {
			for( var i in this.propsMap ) {
				if( typeof prototype[ i ] !== 'function' ) {
					throw Error( 'Interface error: Method "' + i + '" is not implemented in '+ (prototype.constructor.name || prototype.name || 'given') +' prototype' );
				}
			}
		}
	};

	Class.isXDR = ie8;
    return Class;
}));


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('matreshka_dir/polyfills/addeventlistener',factory);
    } else {
        factory();
    }
}(this, function () {
	( function( win, doc, s_add, s_rem ) {
	if( doc[s_add] ) return;
		Element.prototype[ s_add ] = win[ s_add ] = doc[ s_add ] = function( on, fn, self ) {
			return (self = this).attachEvent( 'on' + on, function(e){
				var e = e || win.event;
				e.target = e.target || e.srcElement;
				e.preventDefault  = e.preventDefault  || function(){e.returnValue = false};
				e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true};
				e.which = e.button ? ( e.button === 2 ? 3 : e.button === 4 ? 2 : e.button ) : e.keyCode;
				fn.call(self, e);
			});
		};
		Element.prototype[ s_rem ] = win[ s_rem ] = doc[ s_rem ] = function( on, fn ) {
			return this.detachEvent( 'on' + on, fn );
		};
	})( window, document, 'addEventListener', 'removeEventListener' );
}));

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('balalaika', [
			'matreshka_dir/polyfills/addeventlistener'
		], factory);
    } else {
        root.$b = factory();
    }
}(this, function () {

// nsRegAndEvents is regesp for eventname.namespace and the list of all events
// fn is empty array and balalaika prototype
return ( function( window, document, fn, nsRegAndEvents, id, s_EventListener, s_MatchesSelector, i, j, k, l, $ ) {
	$ = function( s, context ) {
		return new $.i( s, context );
	};
	
	$.i = function( s, context ) {
		fn.push.apply( this, !s ? fn : s.nodeType || s == window ? [s] : "" + s === s ? /</.test( s ) 
		? ( ( i = document.createElement( context || 'div' ) ).innerHTML = s, i.children ) : (context&&$(context)[0]||document).querySelectorAll(s) : /f/.test(typeof s) ? /c/.test(document.readyState) ? s() : $(document).on('DOMContentLoaded', s) : s );
	};
	
	$.i[ l = 'prototype' ] = ( $.extend = function(obj) {
		k = arguments;
		for( i = 1; i < k.length; i++ ) {
			if ( l = k[ i ] ) {
				for (j in l) {
					obj[j] = l[j];
				}
			}
		}
		
		return obj;
	})( $.fn = $[ l ] = fn, { // $.fn = $.prototype = fn
		on: function( n, f ) {
			// n = [ eventName, nameSpace ]
			n = n.split( nsRegAndEvents );
			this.map( function( item ) {
				// item.b$ is balalaika_id for an element
				// i is eventName + id ("click75")
				// nsRegAndEvents[ i ] is array of events (eg all click events for element#75) ([[namespace, handler], [namespace, handler]])
				( nsRegAndEvents[ i = n[ 0 ] + ( item.b$ = item.b$ || ++id ) ] = nsRegAndEvents[ i ] || [] ).push([f, n[ 1 ]]);
				// item.addEventListener( eventName, f )
				item[ 'add' + s_EventListener ]( n[ 0 ], f );
			});
			return this;
		},
		off: function( n, f ) {
			// n = [ eventName, nameSpace ]
			n = n.split( nsRegAndEvents );
			// l = 'removeEventListener'
			l = 'remove' + s_EventListener;
			this.map( function( item ) {
				// k - array of events
				// item.b$ - balalaika_id for an element
				// n[ 0 ] + item.b$ - eventName + id ("click75")
				k = nsRegAndEvents[ n[ 0 ] + item.b$ ];
				// if array of events exist then i = length of array of events
				if( i = k && k.length ) {
					// while j = one of array of events
					while( j = k[ --i ] ) {
						// if( no f and no namespace || f but no namespace || no f but namespace || f and namespace )
						if( ( !f || f == j[ 0 ] ) && ( !n[ 1 ] || n[ 1 ] == j[ 1 ] ) ) {
							// item.removeEventListener( eventName, handler );
							item[ l ]( n[ 0 ], j[ 0 ] );
							// remove event from array of events
							k.splice( i, 1 );
						}
					}
				} else {
					// if event added before using addEventListener, just remove it using item.removeEventListener( eventName, f )
					!n[ 1 ] && item[ l ]( n[ 0 ], f );
				}	
			});
			return this;
		},
		is: function( s ) {
			i = this[ 0 ];
			j = !!i && ( i.matches
				|| i[ 'webkit' + s_MatchesSelector ]
				|| i[ 'moz' + s_MatchesSelector ]
				|| i[ 'ms' + s_MatchesSelector ] );
			return !!j && j.call( i, s );
		}
	});	
	return $;
})( window, document, [], /\.(.+)/, 0, 'EventListener', 'MatchesSelector' );

}));
// taken from https://github.com/remy/polyfills and modified
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('matreshka_dir/polyfills/classlist',factory);
    } else {
        factory();
    }
}(this, function () {
	var toggle = function (token, force) {
		if( typeof force === 'boolean' ) {
			this[ force ? 'add' : 'remove' ](token);
		} else {
			this[ !this.contains(token) ? 'add' : 'remove' ](token);
		}

		return this.contains(token);
	};
	
	if( window.DOMTokenList ) {
		var a = document.createElement( 'a' );
		a.classList.toggle( 'x', false );
		if( a.className ) {
			window.DOMTokenList.prototype.toggle = toggle;
		} 
	}
	
	if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

	var prototype = Array.prototype,
		push = prototype.push,
		splice = prototype.splice,
		join = prototype.join;

	function DOMTokenList(el) {
		this.el = el;
		// The className needs to be trimmed and split on whitespace
		// to retrieve a list of classes.
		var classes = el.className.replace(/^\s+|\s+$/g, '').split(/\s+/);
		for (var i = 0; i < classes.length; i++) {
			push.call(this, classes[i]);
		}
	};

	DOMTokenList.prototype = {
		add: function (token) {
			if (this.contains(token)) return;
			push.call(this, token);
			this.el.className = this.toString();
		},
		contains: function (token) {
			return this.el.className.indexOf(token) != -1;
		},
		item: function (index) {
			return this[index] || null;
		},
		remove: function (token) {
			if (!this.contains(token)) return;
			for (var i = 0; i < this.length; i++) {
				if (this[i] == token) break;
			}
			splice.call(this, i, 1);
			this.el.className = this.toString();
		},
		toString: function () {
			return join.call(this, ' ');
		},
		toggle: toggle
	};

	window.DOMTokenList = DOMTokenList;

	function defineElementGetter(obj, prop, getter) {
		if (Object.defineProperty) {
			Object.defineProperty(obj, prop, {
				get: getter
			});
		} else {
			obj.__defineGetter__(prop, getter);
		}
	}

	defineElementGetter(Element.prototype, 'classList', function () {
		return new DOMTokenList(this);
	});

}));



( function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('matreshka_dir/balalaika-extended',[ 'balalaika', 'matreshka_dir/polyfills/classlist', ], factory);
    } else {
        factory( root.$b );
    }
}(this, function ( $b ) {
	var s_classList = 'classList',
		_on, _off;
	if( !$b ) {
		throw new Error( 'Balalaika is missing' );
	}
	
	_on = $b.fn.on;
	_off = $b.fn.off;
	
	$b.extend( $b.fn, {
		on: function( n, f ) {
			n.split( /\s/ ).forEach( function( n ) {
				_on.call( this, n, f );
			}, this );
			return this;
		},
		off: function( n, f ) {
			n.split( /\s/ ).forEach( function( n ) {
				_off.call( this, n, f );
			}, this );
			return this;
		},
		hasClass: function( className ) { return !!this[ 0 ] && this[ 0 ][ s_classList ].contains( className ); },
		addClass: function( className ) {
			this.forEach( function( item ) {
				var classList = item[ s_classList ];
				classList.add.apply( classList, className.split( /\s/ ) );
			});
			return this;
		},
		removeClass: function( className ) {
			this.forEach( function( item ) {
				var classList = item[ s_classList ];
				classList.remove.apply( classList, className.split( /\s/ ) );
			});
			return this;
		},
		toggleClass: function( className, b ) {
			this.forEach( function( item ) {
				var classList = item[ s_classList ];
				if( typeof b !== 'boolean' ) {
					b = !classList.contains( className );
				}
				classList[ b ? 'add' : 'remove' ].apply( classList, className.split( /\s/ ) );
			});
			return this;
		},
		add: function( s ) {
			var result = $b( this ),
				ieIndexOf = function( a, e ) {
					for( j = 0; j < a.length; j++ ) if( a[ j ] === e ) return j;
				},
				i, j;
			s = $b( s ).slice();
			[].push.apply( result, s );
			for( i = result.length - s.length; i < result.length; i++ ) {
				if( ( [].indexOf ? result.indexOf( result[ i ] )  : ieIndexOf( result, result[ i ] ) ) !== i ) { // @IE8
					result.splice( i--, 1 );
				}
			}
			return result;
		},
		not: function( s ) {
			var result = $b( this ),
				index,
				i;
			s = $b( s );
			
			for( i = 0; i < s.length; i++ ) {
				if( ~( index = result.indexOf( s[ i ] ) ) ) {
					result.splice( index, 1 );
				}
			}
			
			return result;
		},
		find: function( s ) {
			var result = $b();
			this.forEach( function( item ) {
				result = result.add( $b( s, item ) );
			});
			return result;
		}
	});
	
	// simple html parser
	$b.parseHTML = function( html ) {
		var node = document.createElement( 'div' ),
			// wrapMap is taken from jQuery
			wrapMap = {
					option: [ 1, "<select multiple='multiple'>", "</select>" ],
					legend: [ 1, "<fieldset>", "</fieldset>" ],
					thead: [ 1, "<table>", "</table>" ],
					tr: [ 2, "<table><tbody>", "</tbody></table>" ],
					td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
					col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
					area: [ 1, "<map>", "</map>" ],
					_: [ 0, "", "" ]
			},
			wrapper,
			i;
			
		html = html.replace( /^\s+|\s+$/g, '' );
		
		wrapMap.optgroup = wrapMap.option;
		wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
		wrapMap.th = wrapMap.td;
		
		wrapper = wrapMap[ /<([\w:]+)/.exec( html )[ 1 ] ] || wrapMap._;
		
		node.innerHTML = wrapper[ 1 ] + html + wrapper[ 2 ];
		
		i = wrapper[ 0 ];
		
		while( i-- ) {
			node = node.children[ 0 ];
		}
		
		return $b( node.children );
	};
	
	$b.create = function( tagName, props ) {
		var el = document.createElement( tagName ),
			i, j;
		if( props ) for( i in props ) {
			if( i == 'attributes' && typeof props[ i ] == 'object' ) {
				for( j in props[ i ] ) if( props[ i ].hasOwnProperty( j ) ) {
					el.setAttribute( j, props[ i ][ j ] );
				}
			} else  if( el[ i ] && typeof props == 'object' ) {
				el[ i ] = $b.extend( el[ i ] || {}, props[ i ] );
			} else {
				el[ i ] = props[ i ];
			}			
		}
		return el;
	};
	
	// @IE8 Balalaika fix. This browser doesn't support HTMLCollection and NodeList as second argument for .apply
	// This part of code will be removed in Matreshka 1.0
	(function( document, $, i, j, k, fn ) {
		var bugs,
			children = document.createElement( 'div' ).children;
		try { [].push.apply( [], children ); }
		catch( e ) { bugs = true; }
		bugs = bugs || typeof children === 'function' || document.documentMode < 9;

		if( bugs ) {
			fn = $.i[ j = 'prototype' ];

			$.i = function( s, context ) {
				k = !s ? fn : s && s.nodeType || s == window ? [s] : typeof s == 'string' ?  /</.test( s ) ? ( ( i = document.createElement( 'div' ) ).innerHTML = s, i.children ) : (context&&$(context)[0]||document).querySelectorAll(s) : /f/.test(typeof s) && (!s[0]&&!s[0].nodeType) ? /c/.test(document.readyState) ? s() : !function r(f){/in/(document.readyState)?setTimeout(r,9,f):f()}(s): s;
			
				j = []; for (i = k ? k.length : 0; i--; j[i] = k[i]) {}
				
				fn.push.apply( this, j );
			};
			
			$.i[ j ] = fn;
			
			fn.is = function( selector ) {
				var elem = this[ 0 ],
					elems = elem.parentNode.querySelectorAll( selector ),
					i;
				
				for ( i = 0; i < elems.length; i++ ) { if( elems[ i ] === elem ) return true; }
				return false;
			};
		}
		return $;
	})( document, $b );
	
	return $b;
}));


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('matreshka_dir/dollar-lib',['matreshka_dir/balalaika-extended'], factory);
    } else {
        root.__DOLLAR_LIB = factory( root.$b );
    }
}(this, function ( $b ) {
	var neededMethods = 'on off is hasClass addClass removeClass toggleClass add not find'.split( /\s+/ ),
		dollar = typeof $ == 'function' ? $ : null,
		useDollar = true,
		i;
	
	if( dollar ) {
		for( i = 0; i < neededMethods.length; i++ ) {
			if( !dollar.prototype[ neededMethods[ i ] ] ) {
				useDollar = false;
				break;
			}
		}
		
		if( !dollar.parseHTML ) {
			useDollar = false;
		}
	} else {
		useDollar = false;
	}
	
    return useDollar ? dollar : $b;
}));

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define( 'matreshka_dir/binders',factory );
    } else {
        root.__MK_BINDERS = factory();
    }
}(this, function ( MK ) {
	var oneWayBinder = function( f ) {
		return { on: null, getValue: null, setValue: f };
	},
	binders;
	
	return binders = {
		innerHTML: function() {// @IE8
			return oneWayBinder( function( v ) {
				this.innerHTML = v === null ? '' : v + '';
			});
		},
		className: function( className ) {
			var not = !className.indexOf( '!' );
			if( not ) {
				className = className.replace( '!', '' );
			}
			return oneWayBinder( function( v ) {
				this.classList.toggle( className, not ? !v : !!v );
			});
		},
		property: function( propertyName ) {
			return oneWayBinder( function( v ) {
				this[ propertyName ] = v;
			});
		},
		attribute: function( attributeName ) {
			return oneWayBinder( function( v ) {
				this.setAttribute( attributeName, v );
			});
		},
		textarea: function() {
			return binders.input( 'text' );
		},
		progress: function() {
			return binders.input();
		},
		input: function( type ) {
			var on;
			switch( type ) {
				case 'checkbox': 
					return {
						on: 'click keyup',
						getValue: function() { return this.checked; },
						setValue: function( v ) { this.checked = v; }
					};
				case 'radio':
					return {
						on: 'click keyup',
						getValue: function() { return this.value; },
						setValue: function( v ) {
							this.checked = this.value == v;
						}
					};
				case 'submit':
				case 'button':
				case 'image':
				case 'reset':
					return {};
				case 'hidden':
					on = null;
					break;
				case 'file':
					on = 'change';
					break;
				case 'text':
				case 'password':
					// IE8 requires to use 'keyup paste' instead of 'input'
					on = document.documentMode == 8 ? 'keyup paste' : 'input';
					break;
			/*  case 'date':
				case 'datetime':
				case 'datetime-local':
				case 'month':
				case 'time':
				case 'week':
				case 'file':
				case 'range':
				case 'color':
				case 'search':
				case 'email':
				case 'tel':
				case 'url':
				case 'number':  */
				default: // other future (HTML6+) inputs
					on = 'input';
			}
			
			return {
				on: on,
				getValue: function() { return this.value; },
				setValue: function( v ) {
					if( this.value != v ) {
						this.value = v;
					}
				}
			}
		},
		select: function( multiple ) {
			var i;
			if( multiple ) {
				return {
					on: 'change',
					getValue: function() {
						return [].slice.call( this.options )
							.filter( function( o ) { return o.selected; })
							.map( function( o ) { return o.value; });
					},
					setValue: function( v ) {
						v = typeof v == 'string' ? [ v ] : v;
						for( i = this.options.length - 1; i >= 0; i-- ) {
							this.options[ i ].selected = ~v.indexOf( this.options[ i ].value );
						}
					}
				};
			} else {
				return {
					on: 'change',
					getValue: function() { return this.value; },
					setValue: function( v ) {
						var _this = this,
							options;
							
						_this.value = v;
						
						if( !v ) {
							options = _this.options;
							for( i = options.length - 1; i >= 0; i-- ) {
								if( !options[ i ].value ) {
									options[ i ].selected = true;
								}
							}
						}
					}
				};
			}
		},
		visibility: function( value ) {
			value = typeof value == 'undefined' ? true : value;
			return oneWayBinder( function( v ) {
				this.style.display = value ? ( v ? '' : 'none' ) : ( v ? 'none' : '' );
			});
		}
	};
}));

(function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define('matreshka_dir/matreshka-core',[
			'xclass',
			'balalaika',
			'matreshka_dir/dollar-lib',
			'matreshka_dir/binders'
		], factory);
    } else {
        root.MK = root.Matreshka = factory( root.Class, root.$b, root.__DOLLAR_LIB, root.__MK_BINDERS );
    }
}(this, function ( Class, $b, $, binders ) {

if( !Class ) {
	throw Error( 'Class function is missing' );
}
if( ![].forEach ) {
	throw Error( 'Internet Explorer 8 requires to use es5-shim: https://github.com/es-shims/es5-shim' );
}
/**
 * @private
 * @since 0.0.4
 * @todo optimize
 * @summary This object is used to map DOM nodes and their DOM events
 */
var domEventsMap = {
	list: {},
	// adds events to the map
	add: function( o ) {
		if( o.node ) {
			if( typeof o.on == 'function' ) {
				o.on.call( o.node, o.handler );
			} else {
				$( o.node ).on( o.on.split( /\s/ ).join( '.mk ' ) + '.mk', o.handler );
			}
		}
		
		( this.list[ o.instance.__id ] = this.list[ o.instance.__id ] || [] ).push( o );
	},
	// removes events from the map
	remove: function( o ) {
		var evts = this.list[ o.instance.__id ],
			evt, i;
			
		if( !evts ) return;
  
		for( i = 0; i < evts.length; i++ ) {
			evt = evts[ i ];
			if( evt.node !== o.node ) continue;
			// remove Matreshka event
			evt.mkHandler && o.instance._off( '_runbindings:' + o.key, evt.mkHandler );
			// remove DOM event
			$( o.node ).off( evt.on + '.mk', evt.handler );
			this.list[ o.instance.__id ].splice( i--, 1 );
		}
	}
},
slice = [].slice,
trim = function( s ) { return s.trim ? s.trim() : s.replace(/^\s+|\s+$/g, '') },
/**
 * @private
 * @summary selectNodes selects nodes match to custom selectors such as :sandbox and :bound(KEY)
 */
selectNodes = function( _this, s ) {
	var result = $(),
		execResult,
		bound,
		selector;
	
	// replacing :sandbox to :bound(sandbox)
	s.replace( /:sandbox/g, ':bound(sandbox)' ).split( ',' ).forEach( function( s ) {
		// if selector contains ":bound(KEY)" substring
		if( execResult = /:bound\(([^(]*)\)(.*)/.exec( trim(s) ) ) {
			// getting KEY from :bound(KEY)
			bound = _this.$bound( execResult[1] );
			
			// if native selector passed after :bound(KEY) is not empty string
			// for example ":bound(KEY) .my-selector"
			if( selector = trim( execResult[2] ) ) {
				// if native selector contains children selector
				// for example ":bound(KEY) > .my-selector"
				if( selector.indexOf( '>' ) == 0 ) {
					// selecting children
					each( bound, function( node ) {
						var r = MK.randomString();
						node.setAttribute( r, r );
						result = result.add( $( '['+r+'="'+r+'"]' + selector, node ) );
						node.removeAttribute( r );
					});
				} else {
					// if native selector doesn't contain children selector
					result = result.add( bound.find( selector ) );
				}
			} else {
				// if native selector is empty string
				result = result.add( bound );
			}
		// if it's native selector
		} else {
			result = result.add( s );
		}
	});
		
	return result;
};


var MK = Class({
	//__special: null, // { <key>: { getter: f, $nodes: jQ, value: 4 }}
	//__events: null,
	isMK: true,
	/**
	 * @private
	 * @member {boolean} Matreshka#isMKInitialized
	 * @summary Using for lazy initialization
	 */
	isMKInitialized: false,
	
	on: function( names, callback, triggerOnInit, context, xtra ) {
		var _this = this._initMK(),
			t, i;
		
		// if event-callback object is passed to the function
		if( typeof names == 'object' && !(names instanceof Array) ) {
			for( i in names ) if( names.hasOwnProperty( i ) ) {
				_this.on( i, names[ i ], callback, triggerOnInit );
			}
			
			return _this;
		}
		
		// callback is required
		if( !callback ) throw Error( 'callback is not function for event(s) "'+names+'"' );
			
		names = names instanceof Array ? names : trim( names )
			.replace( /\s+/g, ' ' ) // single spaces only
			.split( /\s(?![^(]*\))/g ) // split by spaces
		;
		
		// allow to flip triggerOnInit and context
		if( typeof triggerOnInit != 'boolean' && typeof triggerOnInit != 'undefined' ) {
			t = context;
			context = triggerOnInit;
			triggerOnInit = t;
		}
		
		// for every name call _on method
		for( i = 0; i < names.length; i++ ) {
			_this._on( names[ i ], callback, context, xtra );
		}
		
		// trigger after event is initialized
		if( triggerOnInit === true ) {
			callback.call( context || _this, {
				triggeredOnInit: true
			});
		}
		
		return _this;
	},
	onDebounce: function( names, callback, debounceDelay, triggerOnInit, context, xtra ) {
		var cbc;
		// flip args
		if( typeof debounceDelay != 'number' ) {
			xtra = context;
			context = triggerOnInit;
			triggerOnInit = debounceDelay;
			debounceDelay = 0;
		};
		
		cbc = MK.debounce( callback, debounceDelay );
		
		// set reference to real callback for .off method
		cbc._callback = callback;
		
		return this.on( names, cbc, triggerOnInit, context, xtra );
	},
	// @TODO refactor
	_on: function( name, callback, context, xtra ) {
		// index of @
		var indexOfET = name.indexOf( '@' ),
			_this = this._initMK(),
			ctx = context || _this,
			delegatedReg = /^(.*?)\((.*)\)/,
			evtName,
			selector,
			key_selector,
			events,
			ev,
			key,
			changeHandler, bindHandler, unbindHandler,
			domEvtHandler, tmp, domEvtName;
		
		// if @ exists in event name
		if( ~indexOfET ) {
			// a@b -> key=a name=b
			key = name.slice( 0, indexOfET );
			name = name.slice( indexOfET + 1 );
			// called when value of delegated property is changed
			changeHandler = function( evt ) {
				var target = _this[ key ],
					handler;
					
				// if new value is Matreshka instance
				if( target && target.isMK ) {
					handler = function( evt ) {
						if( !evt || !evt.private ) {
							callback.apply( this, arguments );
						}
					};
					
					handler._callback = callback;
					
					// add event to the new value
					target._on( name, handler, ctx );
				}
				
				// remove event handler from previous value 
				if( evt && evt.previousValue && evt.previousValue.isMK ) {
					evt.previousValue._off( name, callback, context );
				}
			};
			changeHandler._callback = callback;
			_this._on( 'change:' + key, changeHandler, _this, name );
			changeHandler();
		// if @ doesn't exist in event name
		} else {
			// x::(y) -> x::sandbox(y)
			name = name.replace( '::(', '::sandbox(' );
			// x::a(b) -> x::a
			evtName = name.replace( /\(.+\)/, '' );
			// event magic from Backbone
			events = _this.__events[ evtName ] || (_this.__events[ evtName ] = []);
			ev = {
				callback: callback,
				context: context,
				ctx: ctx,
				xtra: xtra
			};
			
			// if there is no event with same callback
			if( !events.some( function( ev2 ) {
				return ev2.callback == ev.callback && ev2.callback._callback == ev.callback && ev2.context == ev.context;
			}) ) {
				
				// add given event object to an array of events
				events.push( ev );
				
				// if event name is change:KEY
				if( !name.indexOf( 'change:' ) ) {
					// define needed accessors for KEY
					_this._defineSpecial( name.replace( 'change:', '' ) );
				}
				
				
				// x::y -> domEvtName = x, key = y
				tmp = name.split( '::' );
				domEvtName = tmp[ 0 ];
				key = tmp[ 1 ];
				
				// if event name is DOM_EVT::KEY (eg click::x)
				if( key ) {
					// retrieve selector from event name
					
					if( key_selector = delegatedReg.exec( key ) ) {
						// x::y(z) -> z
						selector = ev.selector = key_selector[2];
						// x::y(z) -> y
						key = key_selector[1];
					}
					
					domEvtHandler = function( evt ) {
						var node = this,
							$nodes = $( node ),
							handler = function() {
								// add often used properties to event object
								callback.call( ctx, {
									self: _this,
									node: node,
									$nodes: $nodes,
									key: key,
									domEvent: evt,
									originalEvent: evt.originalEvent || evt,
									preventDefault: function() {
										evt.preventDefault();
									},
									stopPropagation: function() {
										evt.stopPropagation();
									},
									which: evt.which,
									target: evt.target
								});
							},
							is, randomID;
							
						// DOM event is delegated
						if( selector ) {
							randomID = 'x' + String( Math.random() ).split( '.' )[1];
							node.setAttribute( randomID, randomID );
							is = '['+randomID+'="'+randomID+'"] ' + selector;
							if( $( evt.target ).is( is + ',' + is + ' *' ) ) {
								handler();
							}
							node.removeAttribute( randomID );
						} else {
							handler();
						}
					};
					bindHandler = function( evt ) {
						var $nodes = evt && evt.$nodes || _this.__special[ key ] && _this.__special[ key ].$nodes,
							evtName = domEvtName + '.' + _this.__id + key;
							
						$nodes && $nodes.on( evtName, domEvtHandler );
					},
					unbindHandler = function( evt ) {
						evt.$nodes && evt.$nodes.off( domEvtName + '.' + _this.__id + key, domEvtHandler );
					};
					
					bindHandler._callback = unbindHandler._callback = callback;
					
					_this._on( 'bind:' + key, bindHandler );
					bindHandler();
					_this._on( 'unbind:' + key, unbindHandler );
				}
			}
		}
		return _this;
	},
	
	
	once: function ( names, callback, context ) {
		if( !callback ) throw Error( 'callback is not function for event "'+names+'"' );
		var _this = this._initMK(),
			i;
			
		names = names.split( /\s/ );
		
		for( i = 0; i < names.length; i++ ) {
			( function( name ) {
				var once = ( function(func) {
					var ran = false, memo;
					return function() {
						if (ran) return memo;
						ran = true;
						memo = func.apply(this, arguments);
						func = null;
						return memo;
					};
				})( callback );
				once._callback = callback;
				_this._on( name, once, context ) ;
			})( names[ i ] );
		}
		
		return this;
	},
	
	
	
	off: function( names, callback, context ) {
		var _this = this._initMK(),
			i;
		
		// if event-callback object is passed to the function
		if( typeof names == 'object' && !(names instanceof Array) ) {
			for( i in names ) if( names.hasOwnProperty( i ) ) {
				_this.off( i, names[ i ], callback );
			}
			
			return _this;
		}
		
		if (!names && !callback && !context) {
			_this.events = {};
			return _this;
		}
		
		names = trim( names )
			.replace( /\s+/g, ' ' ) // single spaces only
			.split( /\s(?![^(]*\))/g )
		;
		
		for (i = 0; i < names.length; i++) {
			_this._off(names[ i ], callback, context);
		}
		
		return _this;
	},
  
	_off: function( name, callback, context ) {
		var indexOfET = name.indexOf( '@' ),
			_this = this._initMK(),
			delegatedReg = /^(.*?)\((.*)\)/,
			selector,
			key_selector,
			retain, ev, events, key, domEvt, domEvtName, domEvtKey, i;
		if( ~indexOfET ) {
			key = name.slice( 0, indexOfET );
			name = name.slice( indexOfET + 1 );
			
			if( callback ) {
				_this._off( 'change:' + key, callback, context );
			} else {
				events = _this.__events[ 'change:' + key ] || [];
				for( i = 0; i < events.length; i++ ) {
					if( events[ i ].xtra === name ) {
						_this._off( 'change:' + key, events[ i ].callback );
					}
				}
			}
			
			if( _this[ key ] && _this[ key ].isMK ) {
				_this[ key ]._off( name, callback, context );
			}
			
		} else if (events = _this.__events[name]) {
			_this.__events[name] = retain = [];
			if (callback || context) {
				for ( i = 0; i < events.length; i++) {
					ev = events[i];
					
					if ((callback && callback !== ev.callback && callback !== ev.callback._callback) || (context && context !== ev.context)) {
						retain.push(ev);
					}
				}
			}
			if (!retain.length) delete _this.__events[name];
			
			domEvt = name.split( '::' );
			domEvtName = domEvt[ 0 ];
			key = domEvt[ 1 ]; 
			if( key && _this.__special[ key ] ) {
				if( key_selector = delegatedReg.exec( key ) ) {
					selector = ev.selector = key_selector[2];
					key = key_selector[1];
				}
				
				_this.__special[ key ].$nodes.off( domEvtName + '.' + _this.__id + key );
				
				_this._off( 'bind:' + key, callback );
				_this._off( 'unbind:' + key, callback );
			}
		}
		
		return _this;
	},
	
	
	trigger: function(names) {
		var _this = this._initMK(),
			args,
			i;
			
		if( names ) {
			args = slice.call(arguments);
			names = names.split( /\s/ );
			
			for( i = 0; i < names.length; i++ ) {
				args = args.slice();
				args[ 0 ] = names[ i ];
				_this._trigger.apply( _this, args );
			}
		}
		
		return _this;
	},
	
	_trigger: function(name) {
		var _this = this._initMK(),
			events = _this.__events[name],
			args, triggerEvents;
		if( name && events ) {
			args = slice.call(arguments, 1),
			triggerEvents = function(events, args) {
				var ev, i = -1, l = events.length;
				while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args || []);
			};
			
			triggerEvents(events, args);
		}
		return _this;
	},
	
	
	bindNode: function( key, node, binder, evt, optional ) {
		var _this = this._initMK(),
			isUndefined = typeof _this[ key ] == 'undefined',
			$nodes,
			keys,
			i,
			special;
		
		/*
		 * this.bindNode([['key', $(), {on:'evt'}], [{key: $(), {on: 'evt'}}]], { silent: true });
		 */
		if( key instanceof Array ) {
			for( i = 0; i < key.length; i++ ) {
				_this.bindNode( key[ i ][ 0 ], key[ i ][ 1 ], key[ i ][ 2 ] || evt, node );
			}
			
			return _this;
		}
		
		/*
		 * this.bindNode('key1 key2', node, binder, { silent: true });
		 */
		if( typeof key == 'string' ) {
			keys = key.split( /\s/ );
			if( keys.length > 1 ) {
				for( i = 0; i < keys.length; i++ ) {
					_this.bindNode( keys[ i ], node, binder, evt );
				}
				return _this;
			}
		}
		
		
		/*
		 * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
		 */		
		if( typeof key == 'object' ) {
			for( i in key ) if( key.hasOwnProperty( i ) ) {
				_this.bindNode( i, key[ i ], node, binder, evt );
			}
			return _this;
		}
		
		evt = evt || {};
		
		special = _this._defineSpecial( key );
		
		$nodes = _this._getNodes( node );
		
		if( !$nodes.length ) {
			if( optional ) {
				return _this;
			} else {
				throw Error( 'Binding error: node is missing for key "'+key+'"' );
			}
		}
		
		

		special.$nodes = special.$nodes.add( $nodes );
		
		_this.$nodes[ key ] = special.$nodes;
		_this.nodes[ key ] = special.$nodes[ 0 ];
		
		if( key == 'sandbox' ) {
			_this.$sandbox = special.$nodes;
			_this.sandbox = special.$nodes[ 0 ];
		}
		
		MK.each( $nodes, function( node ) {
			var _binder = binder !== null ? extend( key == 'sandbox' ? {} : MK.lookForBinder( node ) || {}, binder ) : {},
				options = {
					self: _this,
					key: key,
					$nodes: $nodes,
					node: node
				},
				mkHandler;
			
			if( _binder.initialize ) {
				_binder.initialize.call( node, extend( { value: special.value }, options ) );
			}
			
			if( _binder.setValue ) {
				mkHandler = function( evt ) {
					var v = _this[ key ];
					if( evt && evt.changedNode == node && evt.onChangeValue == v ) return;
					_binder.setValue.call( node, v, extend( { value: v }, options ) );
				};
				_this._on( '_runbindings:' + key, mkHandler );
				!isUndefined && mkHandler()
			}
			
			if( isUndefined && _binder.getValue && evt.assignDefaultValue !== false ) {
				_this.set( key, _binder.getValue.call( node, options ), extend({
					fromNode: true
				}, evt ));
			}
			
			if( _binder.getValue && _binder.on ) {
				domEventsMap.add({
					node: node,
					on: _binder.on,
					instance: _this,
					key: key,
					mkHandler: mkHandler,
					handler: function( evt ) {
						var oldvalue = _this[ key ],
							value = _binder.getValue.call( node, extend({
								value: oldvalue,
								domEvent: evt,
								originalEvent: evt.originalEvent || evt,
								preventDefault: function() {
									evt.preventDefault();
								},
								stopPropagation: function() {
									evt.stopPropagation();
								},
								which: evt.which,
								target: evt.target
							}, options ) );
						if( value !== oldvalue ) {
							_this.set( key, value, {
								fromNode: true,
								changedNode: node,
								onChangeValue: value
							});
						}
					}
				});
			}			
		});
		
		if( !evt.silent ) {
			_this._trigger( 'bind:' + key, extend({
				key: key,
				$nodes: $nodes,
				node: $nodes[ 0 ] || null
			}, evt ) );
		}
		
		return _this;
	},
	
	bindOptionalNode: function( key, node, binder, evt ) {
		var _this = this;
		if( typeof key == 'object' ) {
			/*
			 * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
			 */
			_this.bindNode( key, node, binder, true );
		} else {
			_this.bindNode( key, node, binder, evt, true );
		}
		return _this;
	},
	
	unbindNode: function( key, node, evt ) {
		var _this = this._initMK(),
			type = typeof key,
			$nodes,
			keys,
			special = _this.__special[ key ],
			i;
		
		if( key instanceof Array ) {
			for( i = 0; i < key.length; i++ ) {
				evt = node;
				_this.unbindNode( key[ i ][ 0 ], key[ i ][ 1 ] || evt, evt );
			}
			
			return _this;
		}
		
		if( type == 'string' ) {
			keys = key.split( /\s/ );
			if( keys.length > 1 ) {
				for( i = 0; i < keys.length; i++ ) {
					_this.unbindNode( keys[ i ], node, evt );
				}
				return _this;
			}
		}
		
		
		if( key === null ) {
			for( key in _this.__special ) if( _this.__special.hasOwnProperty( key ) ){
				_this.unbindNode( key, node, evt );
			}
			return _this;
		} else if( type == 'object' ) {
			for( i in key ) if( key.hasOwnProperty( i ) ) {
				_this.unbindNode( i, key[ i ], node );
			}
			return _this;
		} else if( !node ) {
			if( special && special.$nodes ) {
				return _this.unbindNode( key, special.$nodes, evt );
			} else {
				return _this;
			}
		} else if( !special ) {
			return _this;
		}
		

		$nodes = _this._getNodes( node );

		MK.each( $nodes, function( node, i ) {
			domEventsMap.remove({
				node: node,
				instance: _this
			});
			
			special.$nodes = special.$nodes.not( node );
		});
		
		_this.$nodes[ key ] = special.$nodes;
		_this.nodes[ key ] = special.$nodes[0] || null;
		
		if( key == 'sandbox' ) {
			_this.sandbox = special.$nodes[0] || null;
			_this.$sandbox = special.$nodes;
		}
		
		if( !evt || !evt.silent ) {
			_this._trigger( 'unbind:' + key, extend({
				key: key,
				$nodes: $nodes,
				node: $nodes[ 0 ] || null
			}, evt ) );
		}
		
		return _this;
	},
	
	boundAll: function( key ) {
		var _this = this._initMK(),
			__special = _this.__special,
			keys, $nodes, i;

		key = !key ? 'sandbox' : key;
		keys = typeof key == 'string' ? key.split( /\s/ ) : key;
		if( keys.length <= 1 ) {
			return keys[ 0 ] in __special ? __special[ keys[ 0 ] ].$nodes : $();
		} else {
			$nodes = $();
			for( i = 0; i < keys.length; i++ ) {
				$nodes = $nodes.add( __special[ keys[ i ] ].$nodes );
			}
			return $nodes;
		}
	},
	
	
	$bound: function( key ) {
		return this.boundAll( key );
	},
	
	
	bound: function( key ) {
		var _this = this._initMK(),
			__special = _this.__special,
			keys,
			i;
		
		key = !key ? 'sandbox' : key;
		keys = typeof key == 'string' ? key.split( /\s/ ) : key;
		if( keys.length <= 1 ) {
			return keys[ 0 ] in __special ? __special[ keys[ 0 ] ].$nodes[ 0 ] || null : null;
		} else {
			for( i = 0; i < keys.length; i++ ) {
				if( keys[ i ] in __special && __special[ keys[ i ] ].$nodes.length ) {
					return __special[ keys[ i ] ].$nodes[ 0 ];
				}
			}
		}
		
		return null;
	},
	
	
	selectAll: function( s ) {
		var _this = this._initMK();
		return /:sandbox|:bound\(([^(]*)\)/.test( s ) ? selectNodes( _this, s ) : _this.$sandbox.find( s );
	},
	
	$: function( s ) {
		return this.selectAll( s );
	},
	
	select: function( s ) {
		return this.selectAll( s )[ 0 ] || null;
	},
	
	_getNodes: function( s ) {
		return typeof s == 'string' && !/</.test( s ) && /:sandbox|:bound\(([^(]*)\)/.test( s ) ? selectNodes( this._initMK(), s ) : $( s );
	},
	
	/**
	 * @private
	 * @method Matreshka#_defineSpecial
	 * @todo Defines needed descriptor for given key
	 */
	_defineSpecial: function( key ) {
		var _this = this._initMK(),
			specialProps = _this.__special[ key ];
		if( !specialProps ) {
			specialProps = _this.__special[ key ] = {
				$nodes: $(),
				value: _this[ key ],
				getter: function() { return specialProps.value; },
				setter: function( v ) {
					_this.set( key, v, {
						fromSetter: true
					});
				},
				mediator: null
			};
			Object.defineProperty( _this, key, {
				configurable: true,
				get: function() {
					return specialProps.getter.call( _this );
				},
				set: function( v ) {
					specialProps.setter.call( _this, v );
				}
			});
		}
		
		return specialProps;
	},
	
	
	eq: function( object ) { // @IE8
		return typeof object == 'object' && object !== null && this.__id == object.__id;
	},
	
	
	defineGetter: function( key, getter ) {
		var _this = this._initMK(),
			__special,
			i;
		if( typeof key == 'object' ) {
			for( i in key ) if( key.hasOwnProperty( i ) ) {
				_this.defineGetter( i, key[ i ] );
			}
			return _this;
		}
		
		__special = _this._defineSpecial( key );
		__special.getter = function() {
			return getter.call( _this, {
				value: __special.value,
				key: key,
				self: _this
			});
		};
		
		return _this;
	},
	
	
	defineSetter: function( key, setter ) {
		var _this = this._initMK(),
			i;
		if( typeof key == 'object' ) {
			for( i in key ) if( key.hasOwnProperty( i ) ) {
				_this.defineSetter( i, key[ i ] );
			}
			return _this;
		}
		
		_this._defineSpecial( key ).setter = function( v ) {
			return setter.call( _this, v, {
				value: v,
				key: key,
				self: _this
			});
		};
		
		return _this;
	},
	
	
	
	mediate: function( keys, mediator ) {
		var _this = this._initMK(),
			type = typeof keys,
			i,
			__special;
			
		if( type == 'object' && !( keys instanceof Array ) ) {
			for( i in keys ) if( keys.hasOwnProperty( i ) ) {
				_this.mediate( i, keys[ i ] );
			}
			return _this;
		}
		
		keys = type == 'string' ? keys.split( /\s/ ) : keys; 

		for( i = 0; i < keys.length; i++ ) ( function( key ) {
			__special = _this._defineSpecial( key );
		
			__special.mediator = function( v ) {
				return mediator.call( _this, v, __special.value, key, _this );
			};
			
			_this.set( key, __special.mediator( __special.value ), {
				fromMediator: true
			})
		})( keys[ i ] );

		return _this;
	},
	
	
	linkProps: function( key, keys, getter, setOnInit ) {
		var keys = typeof keys == 'string' ? keys.split( /\s/ ) : keys,
			on_Change = function( evt ) {
				var values = [],
					_protect = evt._protect = evt._protect || evt.key + this.__id;
			
				if( _protect !== key + self.__id ) {
					if( typeof keys[ 0 ] == 'object' ) {
						for( i = 0; i < keys.length; i += 2 ) {
							_this = keys[ i ];
							
							_keys = typeof keys[ i + 1 ] == 'string' ? keys[ i + 1 ].split( /\s/ ) : keys[ i + 1 ];
							for( j = 0; j < _keys.length; j++ ) {
								values.push( _this[ _keys[ j ] ] );
							}
						}
					} else {
						for( i = 0; i < keys.length; i++ ) {
							_key = keys[ i ];
							_this = self;
							values.push( _this[ _key ] );
						}
					}
					self.set( key, getter.apply( self, values ), extend({}, evt, {
						fromDependency: true
					}));
				}
				
			},
			_this, _key, _keys, i, j,
			self = this._initMK();
		getter = getter || function( value ) { return value; };
		
		
		if( typeof keys[ 0 ] == 'object' ) {
			for( i = 0; i < keys.length; i += 2 ) {
				_this = keys[ i ]._initMK();
				_keys = typeof keys[ i + 1 ] == 'string' ? keys[ i + 1 ].split( /\s/ ) : keys[ i + 1 ];
				for( j = 0; j < _keys.length; j++ ) {
					_this._defineSpecial( _keys[j] );
					_this._on( '_rundependencies:' + _keys[j], on_Change );
				}
			}
		} else {
			for( i = 0; i < keys.length; i++ ) {
				_key = keys[ i ];
				_this = this;
				_this._defineSpecial( _key );
				_this._on( '_rundependencies:' + _key, on_Change );
			}
		}
		
		setOnInit !== false && on_Change.call( typeof keys[ 0 ] == 'object' ? keys[ 0 ] : this, {
			key: typeof keys[ 0 ] == 'object' ? keys[ 1 ] : keys[ 0 ]
		});
		
		return this;
	},
	
	
	get: function( key ) {
		return this[ key ];
	},
	
	
	set: function( key, v, evt ) {
		var _this = this,
			type = typeof key,
			special, prevVal, newV, i,
			_isNaN = Number.isNaN || function(value) {
				return typeof value == 'number' && isNaN(value);
			};
			
		if( type == 'undefined' ) return _this;
		
		if( type == 'object' ) {
			for( i in key ) if( key.hasOwnProperty( i ) ) {
				_this.set( i, key[ i ], v );
			}
			return _this;
		}
		
		if( !_this.__special || !_this.__special[ key ] ) {
			_this[ key ] = v;
			return _this;
		}
		
		special = _this.__special[ key ];
		prevVal = special.value;

		evt = evt || {};
		
		if( special.mediator && v !== prevVal && !evt.skipMediator && !evt.fromMediator ) {
			newV = special.mediator.call( _this, v, prevVal, key, _this );
		} else {
			newV = v;
		}
		
		special.value = newV;

		if( newV !== prevVal || evt.force || evt.forceHTML || newV !== v && !_isNaN( newV ) ) {
			evt = extend({}, evt, {
				value: newV,
				previousValue: prevVal,
				key: key,
				node: special.$nodes[ 0 ] || null,
				$nodes: special.$nodes,
				self: _this
			});
			
			if( !evt.silentHTML ) {
				_this._trigger( '_runbindings:' + key, evt );
			}
		}
		
		if( ( newV !== prevVal || evt.force ) && !evt.silent ) {
			_this
				._trigger( 'change:' + key, evt )
				._trigger( 'change', evt )
			;
		}
		
		if( ( newV !== prevVal || evt.force || evt.forceHTML ) && !evt.skipLinks ) {
			_this._trigger( '_rundependencies:' + key, evt );
		}
		
		return _this;
	},
	
	
	remove: function( key, evt ) {
		var _this = this._initMK(),
			exists,
			keys = String( key ).split( /\s/ ),
			i;
			
		evt = extend({
			keys: keys
		}, evt );
		
		for( i = 0; i < keys.length; i++ ) {
			exists = keys[ i ] in _this;
			if( exists ) {
				evt.key = keys[ i ];
				evt.value = _this[ keys[ i ] ];
				
				_this.unbindNode( keys[ i ] )._off( 'change:' + keys[ i ] );
				
				delete _this.__special[ keys[ i ] ];
				
				try { // @IE8 fix
					delete _this[ keys[ i ] ];
				} catch(e) {}
				
				if( !evt || !evt.silent ) {
					_this
						._trigger( 'delete', evt )
						._trigger( 'delete:' + keys[ i ], evt )
					;
				}
			}
		}
		
		return _this;
	},
	
	
	define: function( key, descriptor ) {
		var _this = this;
		if( typeof key == 'object' ) {
			for( var p in key ) {
				_this.define( p, key[ p ] );				
			}		
			return _this;
		}
		Object.defineProperty( _this, key, descriptor );
		return _this;
	},
	
	delay: function( f, delay, thisArg ) {
		var _this = this;
		if( typeof delay == 'object' ) {
			thisArg = delay;
			delay = 0;
		}
		
		setTimeout( function() {
			f.call( thisArg || _this );
		}, delay || 0 );
		
		return _this;
	},
	
	/**
	 * @private
	 * Experimental simple template engine
	 */
	_parseBindings: function( node ) {
		var _this = this._initMK(),
			$nodes = ( typeof node == 'string' ? MK.$.parseHTML( node.replace( /^\s+|\s+$/g, '' ) ) : $( node ) );
		
		var all = $nodes.find( '*' ).add( $nodes );
			
		MK.each( all, function( node ) {
			
			( function f( node ) {
				if( node.tagName !== 'TEXTAREA' ) {
					MK.each( node.childNodes, function( childNode ) {
						var previous = childNode.previousSibling,
							textContent;
							
						if( childNode.nodeType == 3 && ~childNode.nodeValue.indexOf( '{{' ) ) {
							textContent = childNode.nodeValue.replace( /{{([^}]*)}}/g, '<mk-bind mk-html="$1"></mk-bind>' );
							//console.log( node, node.nodeType );
							if( previous ) {
								previous.insertAdjacentHTML( 'afterend', textContent );
							} else {
								node.insertAdjacentHTML( 'afterbegin', textContent )
							}
							
							node.removeChild( childNode );
						} else if( childNode.nodeType == 1 ) {
							f( childNode );
						}
					});
				}
			})( node );
		});
		
		// reload list of nodes
		all = $nodes.find( '*' ).add( $nodes );
		
		MK.each( all, function( node ) {
			var bindHTMLKey = node.getAttribute( 'mk-html' );
			if( bindHTMLKey ) {
				_this.bindNode( bindHTMLKey, node, MK.binders.innerHTML() );
				node.removeAttribute( 'mk-html' );
			}
			
			MK.each( node.attributes, function( attr ) {
				var attrValue = trim( attr.value ),
					attrName = attr.name,
					keys,
					key,
					binder;
					
				if( ~attrValue.indexOf( '{{' ) ) {
					keys = attrValue.match( /{{[^}]*}}/g ).map( function( key ) {
						return key.replace( /{{(.*)}}/, '$1' );
					});
					
					if( keys.length == 1 && /^{{[^}]*}}$/g.test( attrValue ) ) {
						key = keys[0];
					} else {
						key = MK.randomString();
						_this.linkProps( key, keys, function() {
							var v = attrValue;
							keys.forEach( function( _key ) {
								v = v.replace( new RegExp( '{{'+_key+'}}', 'g' ), _this[ _key ] );
							});
							
							return v;
						});
					}
				
					if( ( attrName == 'value' && node.type != 'checkbox' 
							|| attrName == 'checked' && node.type == 'checkbox' ) 
						&& MK.lookForBinder( node ) ) {
						_this.bindNode( key, node );
					} else {
						_this.bindNode( key, node, MK.binders.attribute( attrName ) );
					}
				}
			});
		}, _this );
		
		return $nodes;
	},
	/**
	 * @method Matreshka#_initMK
	 * @private
	 */
	_initMK: function() {
		var _this = this;
		if( !_this.isMKInitialized ) {
			extend( _this, {
				isMKInitialized: true,
				Matreshka: MK,
				'sandbox': null,
				/**
				* Instance id
				* @private
				* @since 0.0.2
				* @member {number}
				*/
				__id: 'mk' + MK.randomString(),
				/**
				* This object contains all events
				* @private
				* @member {object}
				*/
				__events: {},
				/**
				* This object contains all special values
				* @private
				* @member {object}
				*/
				__special: {},
				/**
				 * Object contains bound nodes
				 * @private
				 * @member {object}
				 * @since 1.0.5
				 */
				$nodes: {},
				nodes: {}
			});
		}
		
		return _this;
	},
	toString: function() {
		return '[object Matreshka]'	
	},
	constructor: function Matreshka() {
		this._initMK();
	},
	getAnswerToTheUltimateQuestionOfLifeTheUniverseAndEverything: function() {
		this.delay( function() {
			alert( 42 );
		}, 1000*60*60*24*365.25*7.5e6 );
	}
}),


extend = MK.extend = function( o1, o2 ) {
	var i, j;
	if( o1 ) for( i = 1; i < arguments.length; i++ ) {
		o2 = arguments[ i ];
		if( o2 ) for( j in o2 ) if( o2.hasOwnProperty( j ) ) {
			o1[ j ] = o2[ j ];
		}
	}
	return o1;
},

each = MK.each = function( o, f, thisArg ) {
	if( !o ) return;
	if( 'length' in o ) [].forEach.call( o, f, thisArg );
	else for( var i in o ) if( o.hasOwnProperty( i ) ) {
		f.call( thisArg, o[ i ], i, o );
	}
	return o;
};

extend( MK, {
	version: 'dev',
	
	binders: binders,
	
	defaultBinders: [],
	
	Class: Class,
	
	$: $,
	
	$b: $b,
	
	useAs$: function( _$ ) {
		return MK.$ = $ = _$;
	},
	
	isXDR: Class.isXDR,
	
	noop: function() {},
	
	debounce: function ( f, d, thisArg ) {
		var timeout;
		if( typeof d !== 'number' ) {
			thisArg = d;
			d = 0;
		}
		return function() {
			var args = arguments,
				_this = this;
			clearTimeout( timeout );
			timeout = setTimeout( function() {
				f.apply( thisArg || _this, args );
			}, d || 0 );
		};
	},
	
	randomString: function() {
		return ( new Date().getTime() - new Date( 2013, 4, 3 ).getTime() ).toString( 36 ) + Math.floor( Math.random() * 1679616 ).toString( 36 );
	},
	
	lookForBinder: function( node ) {
		var result,
			ep = MK.defaultBinders,
			i;
		for( i = 0; i < ep.length; i++ ) {
			if( result = ep[ i ].call( node, node ) ) {
				return result;
			}
		}
	},
	
	to: function to( data ) {
		var result,
			i;
		if( typeof data == 'object' ) {
			if( 'length' in data ) {
				result = [];
				for( i = 0; i < data.length; i++ ) {
					result[ i ] = to( data[ i ] );
				}
				result = new MK.Array().recreate( result );
			} else {
				result = {};
				for( i in data ) if( data.hasOwnProperty( i ) ) {
					result[i] = to( data[ i ] );
				}
				result = new MK.Object( result )
			}
		} else {
			result = data;
		}
		
		return result;
	}
});

MK.defaultBinders.push( function( node ) {
	var tagName = node.tagName,
		b;
		
	if( tagName == 'INPUT' ) {
		b = binders.input( node.type );
	} else if( tagName == 'TEXTAREA' ) {
		b = binders.textarea();
	} else if( tagName == 'SELECT' ) {
		b = binders.select( node.multiple );
	} else if( tagName == 'PROGRESS' ) {
		b = binders.progress();
	}
	
	return b;
});



return MK;
}));

(function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define( 'matreshka_dir/matreshka-object',[ 'matreshka_dir/matreshka-core'], factory );
    } else {
        factory( root.MK );
    }
}(this, function ( MK ) {
	if( !MK ) {
		throw new Error( 'Matreshka is missing' );
	}
	var i,
	
	prototype = {
		'extends': MK,
		isMKObject: true,
		renderer: null,
		constructor: function MatreshkaObject( object ) {
			this.jset( object );
		},
		keys: function() {
			var _this = this,
				keys = [],
				p;
			for( p in _this._keys ) if( _this._keys.hasOwnProperty( p ) ) {
				keys.push( p );
			}
			return keys;
		},
		
		/**
		 * @method Matreshka.Object#_initMK
		 * @private
		 */
		_initMK: function() {
			var _this = this;
			if( _this.isMKInitialized ) return _this;
			MK.Object.parent._initMK( _this, arguments );
			
			return _this
				.set( '_keys', {} )
				._on( 'delete', function( evt ) {
					if( !evt || !evt.silent ) {
						_this._trigger( 'modify', evt );
					}
				})
				._on( 'change', function( evt ) {
					if( evt && ( evt.key in _this._keys ) && !evt.silent ) {
						_this._trigger( 'modify', evt );
					}
				})
			;
		},
		
		
		_on: function( name, callback, context, xtra ) {
			var _this = this._initMK(),
				f;
			if( name.indexOf( '@' ) == 0 ) {
				name = name.slice( 1 );
				f = function( evt ) {
					var target = _this[ evt.key ];
					if( target && target.isMK && evt && ( evt.key in _this._keys ) ) {
						target._on( name, callback, context || _this );
					}
				};
				
				_this.each( function( item ) {
					item && item.isMK && item._on( name, callback, context || _this );
				}, _this );
				
				f._callback = callback;
				_this._on( 'change', f, _this, name );
			} else {
				MK.prototype._on.call( _this, name, callback, context, xtra );
			}
			
			return this;
		},
		
		_off: function( name, callback, context ) {
			var _this = this._initMK(),
				removeevents;
			if( name.indexOf( '@' ) == 0 ) {
				name = name.slice( 1 );
				if( callback ) {
					_this.off( 'change', callback, context );
				} else {
					events = _this.__events.change || [];
					for( var i = 0; i < events.length; i++ ) {
						if( events[ i ].xtra == name ) {
							_this.off( 'change', events[ i ].callback );
						}
					}
				}
				
				_this.each( function( item ) {
					item.isMK && item.off( name, callback, context );
				}, _this );
			} else {
				MK.prototype._off.call( _this, name, callback, context );
			}
			
			return this;
		},
		
		
		hasOwnProperty: function( key ) {
			return this._initMK()._keys.hasOwnProperty( key );
		},
		
		
		toObject: function() {
			var _this = this._initMK(),
				o = {},
				_keys = _this._keys,
				p;
			for( p in _keys ) if( _keys.hasOwnProperty( p ) ) {
				o[ p ] = _this[ p ];
			}
			return o;
		},
		
		
		toNative: function() {
			return this.toObject();
		},
		
		
		toJSON: function() {
			var _this = this._initMK(),
				JSON = {},
				_keys = _this._keys;
			for( var p in _keys ) if( _keys.hasOwnProperty( p ) ) {
				JSON[ p ] = _this[ p ] && _this[ p ].toJSON ? _this[ p ].toJSON() : _this[ p ];
			}
			return JSON;
		},
		
		
		keyOf: function( o ) {
			var _this = this._initMK(),
				_keys = _this._keys,
				p;
				
			for( p in _keys ) if( _keys.hasOwnProperty( p ) ) {
				if( o && o.isMK ) {
					if( o.eq( _this[ p ] ) ) {
						return p;
					}
				} else if( o === _this[ p ] ) {
					return p;
				}
			}
			
			return null;
		},
		
		
		jset: function( key, v, evt ) {
			var _this = this._initMK(),
				type = typeof key;
				
			if( type == 'undefined' ) return _this;
			
			if( type == 'object' ) {
				key = key.toJSON ? key.toJSON() : key;
				for( i in key ) {
					_this.jset( i, key[ i ], v );
				}
				return _this;
			}
			
			_this._keys[ key ] = 1;
			
			_this._defineSpecial( key );
			
			return _this.set( key, v, evt );
		},
		
		remove: function( key, evt ) {
			this.removeDataKeys( key );
			return MK.Object.parent.remove( this, key, evt );
		},
		
		addDataKeys: function( keys ) {
			var _this = this._initMK();
			if( !arguments.length ) return _this;
			keys = arguments.length > 1 ? arguments : keys instanceof Array ? keys : String( keys ).split( /\s/ );
			for( i = 0; i < keys.length; i++ ) {
				_this._keys[ keys[ i ] ] = 1;
				_this._defineSpecial( keys[ i ] );
			}
			return _this;
		},
		
		removeDataKeys: function( keys ) {
			var _this = this._initMK();
			if( !arguments.length ) return _this;
			keys = arguments.length > 1 ? arguments : keys instanceof Array ? keys : String( keys ).split( /\s/ );
			for( i = 0; i < keys.length; i++ ) {
				delete _this._keys[ keys[ i ] ];
			}
			return _this;
		},
		
		each: function( callback, thisArg ) {
			var _this = this._initMK(),
				p;
			for( p in _this._keys ) if( _this._keys.hasOwnProperty( p ) ) {
				callback.call( thisArg, _this[ p ], p, _this );
			}
			
			return _this;
		}
	};
	

	prototype[ typeof Symbol != 'undefined' ? Symbol.iterator : '@@iterator' ] = function() {
		var _this = this,
			keys = _this.keys(),
			i = 0;
			
		return {
			next: function() {
				if ( i > keys.length - 1 ) {
					return { done: true };
				} else {
					return { done: false, value: _this[ keys[ i++ ] ] };
				}
			}
		};
	};
	
	return MK.Object = MK.Class( prototype );
}));

(function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define( 'matreshka_dir/matreshka-array',[ 'matreshka_dir/matreshka-core' ], factory );
    } else {
        factory( root.MK );
    }
}(this, function ( MK ) {	
	if( !MK ) {
		throw new Error( 'Matreshka is missing' );
	}
	
	var Array_prototype = Array.prototype,
		slice = Array_prototype.slice,
		// Array methods flags
		/*SIMPLE = 1,
		RETURNS_NEW_ARRAY = 2,
		RETURNS_NEW_TYPE = 3,
		MODIFIES = 4,
		MODIFIES_AND_RETURNS_NEW_TYPE = 5,
		SPLICE = 6,*/
		silentFlag = { silent: true, dontRender: true, skipMediator: true },
		compare = function( a1, a2, i, l ) {
			if ( a1.length != a2.length )
				return false;

			for( i = 0, l = a1.length; i < l; i++ ) {
				if ( a1[i] && a1[i].isMK ? !a1[i].eq(a2[i]) : a1[i] !== a2[i] ) { 
					return false;   
				}           
			}
			
			return true;
		},
		indexOf = MK.isXDR ? function( sought ) {
			var _this = this,
				i, item,
				isMK = sought && sought.isMK;
				
			for( i = 0; i < _this.length; i++ ) {
				item = _this[i];
				if( isMK ? sought.eq( item ) : sought === item ) {
					return i;
				}
			}
			
			return -1;
		} : Array_prototype.indexOf,
		lastIndexOf = MK.isXDR ? function ( sought ) {
			var _this = this,
				i, item,
				isMK = sought && sought.isMK;
				
			for( i = _this.length - 1; i >= 0; i-- ) {
				item = _this[i];
				if( isMK ? sought.eq( item ) : sought === item ) {
					return i;
				}
			}
			
			return -1;
		} : Array_prototype.lastIndexOf,
	
	
	triggerAddone = function( _this, added, i ) {
		if( _this.__events.addone ) {
			for( i = 0; i < added.length; i++ ) {
				_this._trigger( 'addone', {
					self: _this,
					added: added[ i ]
				});
			}
		}
	},
	
	triggerRemoveone = function( _this, removed, i ) {
		if( _this.__events.removeone ) {
			for( i = 0; i < removed.length; i++ ) {
				_this._trigger( 'removeone', {
					self: _this,
					removed: removed[ i ]
				});
			}
		}
	},
	
	createMethod = function( name, hasOptions ) {
		var i;
		
		switch( name ) {
			case 'forEach':
				return function() {
					var _this = this;
					Array_prototype[ name ].apply( MK.isXDR ? _this.toArray() : _this, arguments );
					return _this;
				};
			case 'map':
			case 'filter':
			case 'slice':
				return function() {
					var _this = this;
					return new MK.Array().recreate( Array_prototype[ name ].apply( MK.isXDR ? _this.toArray() : _this, arguments ), silentFlag );
				};
			case 'every':
			case 'some':
			case 'reduce':
			case 'reduceRight':
			case 'toString':
			case 'join':
				return function() {
					var _this = this;
					return Array_prototype[ name ].apply( MK.isXDR ? _this.toArray() : _this, arguments );
				};
			case 'sort':
			case 'reverse':
				return function() {
					var _this = this,
						_arguments = arguments,
						args = slice.call( _arguments, 0, hasOptions ? -1 : _arguments.length ),
						evt = hasOptions ? _arguments[ _arguments.length - 1 ] || {} : {},
						array = _this.toArray(),
						returns = Array_prototype[ name ].apply( array, args );
					
					if( !compare( _this, array ) ) {
						_this.recreate( array, silentFlag );
						
						evt = MK.extend({
							returns: returns,
							args: args,
							originalArgs: slice.call( _arguments ),
							method: name,
							self: _this,
							added: [],
							removed: []
						}, evt );
						
						if( !evt.silent ) {
							_this
								._trigger( name, evt )
								._trigger( 'modify', evt )
							;
						}
						
						if( !evt.dontRender ) {
							_this.processRendering( evt );
						}
					}
					
					return _this;
				};
			case 'push':
			case 'pop':
			case 'unshift':
			case 'shift':
				return function() {
					var _this = this,
						_arguments = arguments,
						args = slice.call( _arguments, 0, hasOptions ? -1 : _arguments.length ),
						evt = hasOptions ? _arguments[ _arguments.length - 1 ] || {} : {},
						array = _this.toArray(),
						returns,
						added,
						removed;
					
					if( !evt.skipMediator && typeof _this._itemMediator == 'function' && ( name == 'unshift' || name == 'push' ) ) {
						for( i = 0; i < args.length; i++ ) {
							args[ i ] = _this._itemMediator.call( _this, args[ i ], i );
						}
					}
					
					returns = Array_prototype[ name ].apply( array, args );
					
					if( !compare( _this, array ) ) {
						_this.recreate( array, silentFlag );
						
						evt = MK.extend({
							returns: returns,
							args: args,
							originalArgs: slice.call( _arguments ),
							method: name,
							self: _this,
							added: added = name == 'push' || name == 'unshift' ? args : [],
							removed: removed = name == 'pop' || name == 'shift' ? [ returns ] : []
						}, evt );
						
						if( !evt.silent ) {
							_this._trigger( name, evt );
							
							if( added.length ) {
								_this._trigger( 'add', evt );
								triggerAddone( _this, added );
							} 
							
							if( removed.length ) { // pop, shift
								_this._trigger( 'remove', evt );
								triggerRemoveone( _this, removed );
							}
							
							_this._trigger( 'modify', evt );
						}
						
						if( !evt.dontRender ) {
							_this.processRendering( evt );
						}
					}
					
					return returns;
				};
			case 'splice': 
				return function() {
					var _this = this,
						_arguments = arguments,
						args = slice.call( _arguments, 0, hasOptions ? -1 : _arguments.length ),
						evt = hasOptions ? _arguments[ _arguments.length - 1 ] || {} : {},
						array = _this.toArray(),
						returns,
						added,
						removed;
					
					if( !evt.skipMediator && typeof _this._itemMediator == 'function' ) {
						for( i = 2; i < args.length; i++ ) {
							args[ i ] = _this._itemMediator.call( _this, args[ i ], i );
						}
					}
					
					returns = Array_prototype[ name ].apply( array, args );
					
					if( !compare( _this, array ) ) {
						_this.recreate( array, silentFlag );
						
						evt = MK.extend({
							returns: returns,
							args: args,
							originalArgs: slice.call( _arguments ),
							method: name,
							self: _this,
							added: added = slice.call( args, 2 ),
							removed: removed = returns
						}, evt );
						
						if( !evt.silent ) {
							_this._trigger( name, evt );
							
							if( added.length ) {
								_this._trigger( 'add', evt );
								triggerAddone( _this, added );
							}
							
							if( removed.length ) {
								_this._trigger( 'remove', evt );
								triggerRemoveone( _this, removed );
							}
							
							_this._trigger( 'modify', evt );
						}
						
						if( !evt.dontRender ) {
							_this.processRendering( evt );
						}
					}
					
					return new MK.Array().recreate( returns, silentFlag );
				};
		}
	},
	
	prototype = {
		'extends': MK,
		isMKArray: true,
		length: 0,
		itemRenderer: null,
		renderIfPossible: true,
		useBindingsParser: false,
		Model: null,
		constructor: function MatreshkaArray( length ) {
			var _this = this._initMK(),
				al = arguments.length,
				i;
			if( al == 1 && typeof length == 'number' ) {
				_this.length = length;
			} else {
				for( i = 0; i < al; i++ ) {
					_this[ i ] = arguments[ i ];
				}
				_this.length = arguments.length;
			}
		},
		
		mediateItem: function( itemMediator ) {
			var _this = this, i;
			_this._itemMediator = itemMediator;
			for( i = 0; i < _this.length; i++ ) {
				_this[ i ] = itemMediator.call( _this, _this[ i ], i );
			}
			return _this;
		},
		
		_on: function( name, callback, context, xtra ) {
			var _this = this._initMK(),
				f;
				
			if( name.indexOf( '@' ) == 0 ) {
				name = name.slice( 1 );
				f = function( evt ) {
					( evt && evt.added ? evt.added : _this ).forEach( function( item ) {
						item && item.isMK && item._on( name, callback, context || _this );
					});
				};
				
				f._callback = callback;
				_this._on( 'add', f, _this, name );
				f.call( context || _this );
			} else {
				MK.prototype._on.call( _this, name, callback, context, xtra );
			}
			
			return _this;
		},
		
		_off: function( name, callback, context ) {
			var _this = this._initMK(),
				events,
				i;
				
			if( name.indexOf( '@' ) == 0 ) {
				name = name.slice( 1 );
				if( callback ) {
					_this.off( 'add', callback, context );
				} else {
					events = _this.__events.add || [];
					for( i = 0; i < events.length; i++ ) {
						if( events[ i ].xtra == name ) {
							_this.off( 'add', events[ i ].callback );
						}
					}
				}
				
				_this.forEach( function( item ) {
					item.isMK && item.off( name, callback, context );
				}, _this );
			} else {
				MK.prototype._off.call( _this, name, callback, context );
			}
			
			return _this;
		},
		
		recreate: function( array, evt ) {
			array = array || [];
			var _this = this,
				diff = _this.length - array.length,
				was = _this.toArray(),
				prepared,
				i,
				added, removed, now;
				
			evt = evt || {};
			
			if( _this._itemMediator && !evt.skipMediator ) {
				prepared = [];
				for( i = 0; i < array.length; i++ ) {
					prepared[ i ] = _this._itemMediator.call( _this, array[ i ], i );
				}
				array = prepared;
			}
			
			for( i = 0; i < array.length; i++ ) {
				_this[ i ] = array[ i ];
			}
			
			for( i = 0; i < diff; i++ ) {
				_this.remove( i + array.length, { silent: true });
			}
			
			_this.length = array.length;
			
			if( evt.silent && evt.dontRender ) {
				return _this;
			}
			
			now = _this.toArray();
			
			removed = was.length ? was.filter( function( item ) {
				return !~indexOf.call( now, item );
			}) : [];
			
			added = now.length ? now.filter( function( item ) {
				return !~indexOf.call( was, item );
			}) : [];
			
			evt = MK.extend({
				added: added,
				removed: removed,
				was: was,
				now: now,
				method: 'recreate',
				self: _this
			}, evt );
			
			if( !evt.silent ) {
				if( added.length ) {
					_this._trigger( 'add', evt );
					triggerAddone( _this, added );
				}
				
				if( removed.length ) {
					_this._trigger( 'remove', evt );
					triggerRemoveone( _this, removed );
				}
				
				if( added.length || removed.length ) {
					_this
						._trigger( 'recreate', evt )
						._trigger( 'modify', evt )
					;
				}
			}
			
			if( !evt.dontRender ) {
				_this.processRendering( evt );
			}
			
			return _this;
		},
		
		
		toArray: function() {
			var _this = this,
				array,
				i;
			try {
				return slice.call( _this );
			} catch( e ) {
				array = [];
				for( i = 0; i < _this.length; i++ ) {
					array[ i ] = _this[ i ];
				}
				return array;
			}
		},
		
		
		toNative: function() {
			return this.toArray();
		},
		
		/**
		 * @method Matreshka.Array#_initMK
		 * @private
		 */
		_initMK: function() {
			var _this = this;
			
			if( _this.isMKInitialized ) return _this;
				
			return MK.prototype._initMK.call( _this )
				.on( 'change:Model', function() {
					var Model = _this.Model;
					if( Model ) {
						_this.mediateItem( function( item ) {
							return !item || !item.isMK || !item.instanceOf( Model ) ? new Model( item && item.toJSON ? item.toJSON() : item, _this ) : item;
						});
					}
				}, true )
			;
		},
		
		/**
		 * @private
		 * @since 0.1
		 */
		_renderOne: function( item, evt ) {
			var _this = this,
				__id = _this.__id,
				renderer = item.renderer || _this.itemRenderer,
				rendererContext = renderer === item.renderer ? item: _this,
				node = item.bound( __id ),
				$node,
				template;

			if( !item[ __id ] ) {
				item[ __id ] = _this;
			}
			
			if( evt.moveSandbox ) {
				if( node = item.bound( 'sandbox' ) ) {
					item.bindNode( __id, node );
				}
			}
			
			if( !node ) {
				if( typeof renderer == 'function' ) {
					renderer = renderer.call( rendererContext, item );
				}
				
				if( typeof renderer == 'string' && !~renderer.indexOf( '<' ) && !~renderer.indexOf( '{{' ) ) {
					template = rendererContext._getNodes( renderer );
					if( template = template && template[0] ) {
						template = template.innerHTML;
					} else {
						throw Error( 'renderer node is missing: ' + renderer );
					}
				} else {
					template = renderer;
				}
				
				$node = _this.useBindingsParser
					? item._parseBindings( template ) 
					: ( typeof template == 'string' ? MK.$.parseHTML( template.replace( /^\s+|\s+$/g, '' ) ) : MK.$( template ) );
				
				if( item.bindRenderedAsSandbox !== false && $node.length ) {
					item.bindNode( 'sandbox', $node );
				}
				
				item.bindNode( __id, $node );
		
				item._trigger( 'render', {
					node: $node[ 0 ],
					$nodes: $node,
					self: item,
					parentArray: _this
				});
				
				node = $node[0];
			} 
			
			return node;
		},
		
		processRendering: function( evt ) {
			var _this = this,
				__id = _this.__id,
				container = container = _this.bound( 'container' ) || _this.bound(),
				destroyOne = function( item ) {
					if( item && item.isMK ) {
						var node = item.bound( __id );
						item.remove( __id, { silent: true });
						return node;
					}
				},
				renderOne = function( item ) {
					return item
						&& item.isMK
						&& _this.renderIfPossible 
						&& container 
						&& !evt.dontRender 
						&& ( _this.itemRenderer || item && item.renderer )
						&& _this._renderOne( item, evt );
				},
				node,
				i;
			
			switch ( evt.method ) {
				case 'push':
					for( i = _this.length - evt.added.length; i < _this.length; i++ ) {
						if( node = renderOne( _this[ i ] ) ) {
							container.appendChild( node );
						}
					}
					break;
				case 'unshift':
					for( i = evt.added.length - 1; i + 1; i-- ) {
						if( node = renderOne( _this[ i ] ) ) {
							if( container.children ) {
								container.insertBefore( node, container.firstChild );
							} else {
								container.appendChild( node );
							}
						}
					}
					break;
				case 'pull':
				case 'pop':
				case 'shift':
					for( i = 0; i < evt.removed.length; i++ ) {
						if( node = destroyOne( evt.removed[ i ] ) ) {
							container.removeChild( node );
						}
					}
					break;
				case 'sort':
				case 'reverse':
					for( i = 0; i < _this.length; i++ ) {
						if( node = _this[ i ].bound( __id ) ) {
							container.appendChild( node );
						}
					}
					break;
				case 'rerender':
					for( i = 0; i < _this.length; i++ ) {
						if( node = renderOne( _this[ i ] ) ) {
							container.appendChild( node );
						}
					}
					break;
				case 'recreate':
				case 'splice':
					for( i = 0; i < evt.removed.length; i++ ) {
						if( node = destroyOne( evt.removed[ i ] ) ) {
							container.removeChild( node );
						}
					}
					
					for( i = 0; i < _this.length; i++ ) {
						if( node = renderOne( _this[ i ] ) ) {
							container.appendChild( node );
						}
					}
					break;
			}
			
			return _this;
		},
		
		
		rerender: function() {
			return this.processRendering({
				method: 'rerender'
			});
		},
		
		
		hasOwnProperty: function( p ) {
			return p == 'length' || p < this.length && p >= 0;
		},
		
		
		toJSON: function() {
			var _this = this,
				JSON = [],
				i;
				
			for( i = 0; i < _this.length; i++ ) {
				_this[ i ] && _this[ i ].toJSON ? JSON.push( _this[ i ].toJSON() ) : JSON.push( _this[ i ] );
			}
			
			return JSON;
		},
		
		
		concat: function() {
			var args = arguments,
				result = this.toArray(),
				arg,
				i,
				j;
			for( i = 0; i < args.length; i++ ) {
				arg = args[ i ];
				if( arg instanceof Array || arg && arg.instanceOf && arg.instanceOf( MK.Array ) ) {
					for( j = 0; j < arg.length; j++ ) {
						result.push( arg[ i ] );
					}
				}
			}
			
			return new MK.Array().recreate( result );
		},
		
		
		
		pull: function( index, evt ) {
			var _this = this,
				array = _this.toArray(),
				_index = index,
				type = typeof index,
				returns,
				removed;
			
			if( type != 'number' && type != 'string' ) {
				index = _this.indexOf( index );
				if( !~index ) {
					return null;
				}
			}
			
			returns = array.splice( index, 1 )[ 0 ] || null;
			
			if( !compare( array, _this ) ) {
				evt = evt || {};
				
				_this.recreate( array, silentFlag );
				
				evt = MK.extend({
					returns: returns,
					args: [ _index ],
					method: 'pull',
					self: _this,
					added: [],
					removed: removed = returns ? [ returns ] : []
				}, evt );
				
				if( !evt.silent ) {
					_this._trigger( 'pull', evt );
					_this._trigger( 'remove', evt );
					triggerRemoveone( _this, removed );
					_this._trigger( 'modify', evt );
				}
				
				_this.processRendering( evt );
			}
		
			return returns;
		},
		
		// es5-shim doesn't help with indexOf and lastIndexOf
		indexOf: indexOf,
		lastIndexOf: lastIndexOf
	};
	
	'push pop unshift shift sort reverse splice map filter slice every some reduce reduceRight forEach toString join'.split( ' ' ).forEach( function( name ) {
		prototype[ name ] = createMethod( name );
	});
	
	'push pop unshift shift sort reverse splice'.split( ' ' ).forEach( function( name ) {
		prototype[ name + '_' ] = createMethod( name, 1 );
	});
	
	prototype.each = prototype.forEach;

	prototype[ typeof Symbol != 'undefined' ? Symbol.iterator : '@@iterator' ] = function() {
		var _this = this,
			i = 0;
		return {
			next: function() {
				if ( i > _this.length - 1 ) {
					return { done: true };
				} else {
					return { done: false, value: _this[ i++ ] };
				}
			}
		};
	};
	
	MK.Array = MK.Class( prototype );
	
	MK.Array.of = function() {
		var result = new MK.Array(),
			args = arguments,
			i;
		
		result.length = args.length;
		
		for( i = 0; i < args.length; i++ ) {
			result[i] = args[i];
		}
		
		return result;
	};
	
	// Doesn't work with maps and sets yet
	MK.Array.from = function( arrayLike, mapFn, thisArg ) {
		var result = new MK.Array(),
			i;
		
		result.length = arrayLike.length;
		
		for( i = 0; i < arrayLike.length; i++ ) {
			result[i] = mapFn ? mapFn.call( thisArg, arrayLike[i], i, arrayLike ) : arrayLike[i];
		}
		
		return result;
	};
	
	return MK.Array;
}));


if ( typeof define === 'function' && define.amd ) {
	define( 'matreshka', [
		'matreshka_dir/matreshka-core',
		'matreshka_dir/matreshka-object',
		'matreshka_dir/matreshka-array'
	], function( MK, MK_Object, MK_Array, MK_binders ) {
		return MK;
	});
};
;							if(typeof define==="function"&&define.amd) {								define(["matreshka"],function(MK){									MK.version="1.0.7";									return MK;								});							} else {								Matreshka.version="1.0.7";								if(typeof exports=="object") module.exports=Matreshka;							}