/*! Ractive - v0.3.7 - 2013-10-08
* Next-generation DOM manipulation

* http://ractivejs.org
* Copyright (c) 2013 Rich Harris; Licensed MIT */

(function ( global ) {

'use strict';

var Ractive,

// current version
VERSION = '0.3.7',

doc = global.document || null,

// Ractive prototype
proto = {},

// properties of the public Ractive object
adaptors = {},
eventDefinitions = {},
easing,
extend,
parse,
interpolate,
interpolators,
transitions = {},


// internal utils - instance-specific
teardown,
clearCache,
registerDependant,
unregisterDependant,
notifyDependants,
notifyMultipleDependants,
notifyDependantsByPriority,
resolveRef,
processDeferredUpdates,


// internal utils
toString,
isArray,
isObject,
isNumeric,
isEqual,
getEl,
insertHtml,
reassignFragments,
executeTransition,
getPartialDescriptor,
getComponentConstructor,
isStringFragmentSimple,
makeTransitionManager,
requestAnimationFrame,
defineProperty,
defineProperties,
create,
createFromNull,
hasOwn = {}.hasOwnProperty,
noop = function () {},
addEventProxies,
addEventProxy,
appendElementChildren,
bindElement,
createElementAttributes,
getElementNamespace,
updateAttribute,
bindAttribute,
console = global.console || { log: noop, warn: noop },


// internally used constructors
DomFragment,
DomElement,
DomAttribute,
DomPartial,
DomComponent,
DomInterpolator,
DomTriple,
DomSection,
DomText,

StringFragment,
StringInterpolator,
StringSection,
StringText,

ExpressionResolver,
Evaluator,
Animation,


// internally used regexes
leadingWhitespace = /^\s+/,
trailingWhitespace = /\s+$/,


// other bits and pieces
render,

initMustache,
updateMustache,
resolveMustache,

initFragment,
updateSection,

animationCollection,


// array modification
registerKeypathToArray,
unregisterKeypathFromArray,


// parser and tokenizer
getFragmentStubFromTokens,
getToken,
tokenize,
stripCommentTokens,
stripHtmlComments,
stripStandalones,


// error messages
missingParser = 'Missing Ractive.parse - cannot parse template. Either preparse or use the version that includes the parser',


// constants
TEXT              = 1,
INTERPOLATOR      = 2,
TRIPLE            = 3,
SECTION           = 4,
INVERTED          = 5,
CLOSING           = 6,
ELEMENT           = 7,
PARTIAL           = 8,
COMMENT           = 9,
DELIMCHANGE       = 10,
MUSTACHE          = 11,
TAG               = 12,

COMPONENT         = 15,

NUMBER_LITERAL    = 20,
STRING_LITERAL    = 21,
ARRAY_LITERAL     = 22,
OBJECT_LITERAL    = 23,
BOOLEAN_LITERAL   = 24,

GLOBAL            = 26,
KEY_VALUE_PAIR    = 27,


REFERENCE         = 30,
REFINEMENT        = 31,
MEMBER            = 32,
PREFIX_OPERATOR   = 33,
BRACKETED         = 34,
CONDITIONAL       = 35,
INFIX_OPERATOR    = 36,

INVOCATION        = 40,

testDiv = ( doc ? doc.createElement( 'div' ) : null ),
noMagic,


// namespaces
namespaces = {
	html:   'http://www.w3.org/1999/xhtml',
	mathml: 'http://www.w3.org/1998/Math/MathML',
	svg:    'http://www.w3.org/2000/svg',
	xlink:  'http://www.w3.org/1999/xlink',
	xml:    'http://www.w3.org/XML/1998/namespace',
	xmlns:  'http://www.w3.org/2000/xmlns/'
};



// we're creating a defineProperty function here - we don't want to add
// this to _legacy.js since it's not a polyfill. It won't allow us to set
// non-enumerable properties. That shouldn't be a problem, unless you're
// using for...in on a (modified) array, in which case you deserve what's
// coming anyway
try {
	try {
		Object.defineProperty({}, 'test', { value: 0 });
		Object.defineProperties({}, { test: { value: 0 } });
	} catch ( err ) {
		noMagic = true;
		throw err;
	}

	if ( doc ) {
		Object.defineProperty( testDiv, 'test', { value: 0 });
		Object.defineProperties( testDiv, { test: { value: 0 } });
	}

	defineProperty = Object.defineProperty;
	defineProperties = Object.defineProperties;
} catch ( err ) {
	// Object.defineProperty doesn't exist, or we're in IE8 where you can
	// only use it with DOM objects (what the fuck were you smoking, MSFT?)
	defineProperty = function ( obj, prop, desc ) {
		obj[ prop ] = desc.value;
	};

	defineProperties = function ( obj, props ) {
		var prop;

		for ( prop in props ) {
			if ( props.hasOwnProperty( prop ) ) {
				defineProperty( obj, prop, props[ prop ] );
			}
		}
	};
}


try {
	Object.create( null );

	create = Object.create;

	createFromNull = function () {
		return Object.create( null );
	};
} catch ( err ) {
	// sigh
	create = (function () {
		var F = function () {};

		return function ( proto, props ) {
			var obj;

			F.prototype = proto;
			obj = new F();

			if ( props ) {
				Object.defineProperties( obj, props );
			}

			return obj;
		};
	}());

	createFromNull = function () {
		return {}; // hope you're not modifying the Object prototype
	};
}



var hyphenate = function ( str ) {
	return str.replace( /[A-Z]/g, function ( match ) {
		return '-' + match.toLowerCase();
	});
};

// determine some facts about our environment
var cssTransitionsEnabled, transition, transitionend;

(function () {

	if ( !doc ) {
		return;
	}

	if ( testDiv.style.transition !== undefined ) {
		transition = 'transition';
		transitionend = 'transitionend';
		cssTransitionsEnabled = true;
	} else if ( testDiv.style.webkitTransition !== undefined ) {
		transition = 'webkitTransition';
		transitionend = 'webkitTransitionEnd';
		cssTransitionsEnabled = true;
	} else {
		cssTransitionsEnabled = false;
	}

}());


// Internet Explorer derp. Methods that should be attached to Node.prototype
// are instead attached to HTMLElement.prototype, which means SVG elements
// can't use them. Remember kids, friends don't let friends use IE.
if ( global.Node && !global.Node.prototype.contains && global.HTMLElement && global.HTMLElement.prototype.contains ) {
	global.Node.prototype.contains = global.HTMLElement.prototype.contains;
}
(function () {

	var getInterpolator,
		updateModel,
		getBinding,
		inheritProperties,
		MultipleSelectBinding,
		SelectBinding,
		RadioNameBinding,
		CheckboxNameBinding,
		CheckedBinding,
		FileListBinding,
		GenericBinding;

	bindAttribute = function () {
		var node = this.parentNode, interpolator, binding, bindings;

		if ( !this.fragment ) {
			return false; // report failure
		}

		interpolator = getInterpolator( this );

		if ( !interpolator ) {
			return false; // report failure
		}

		this.interpolator = interpolator;

		// Hmmm. Not sure if this is the best way to handle this ambiguity...
		//
		// Let's say we were given `value="{{bar}}"`. If the context stack was
		// context stack was `["foo"]`, and `foo.bar` *wasn't* `undefined`, the
		// keypath would be `foo.bar`. Then, any user input would result in
		// `foo.bar` being updated.
		//
		// If, however, `foo.bar` *was* undefined, and so was `bar`, we would be
		// left with an unresolved partial keypath - so we are forced to make an
		// assumption. That assumption is that the input in question should
		// be forced to resolve to `bar`, and any user input would affect `bar`
		// and not `foo.bar`.
		//
		// Did that make any sense? No? Oh. Sorry. Well the moral of the story is
		// be explicit when using two-way data-binding about what keypath you're
		// updating. Using it in lists is probably a recipe for confusion...
		this.keypath = interpolator.keypath || interpolator.descriptor.r;

		binding = getBinding( this );

		if ( !binding ) {
			return false;
		}

		node._ractive.binding = binding;
		this.twoway = true;

		// register this with the root, so that we can force an update later
		bindings = this.root._twowayBindings[ this.keypath ] || ( this.root._twowayBindings[ this.keypath ] = [] );
		bindings[ bindings.length ] = binding;

		return true;
	};


	// This is the handler for DOM events that would lead to a change in the model
	// (i.e. change, sometimes, input, and occasionally click and keyup)
	updateModel = function () {
		this._ractive.binding.update();
	};

	getInterpolator = function ( attribute ) {
		var item;

		// TODO refactor this? Couldn't the interpolator have got a keypath via an expression?
		// Check this is a suitable candidate for two-way binding - i.e. it is
		// a single interpolator, which isn't an expression
		if ( attribute.fragment.items.length !== 1 ) {
			return null;
		}

		item = attribute.fragment.items[0];
			
		if ( item.type !== INTERPOLATOR ) {
			return null;
		}

		if ( !item.keypath && !item.ref ) {
			return null;
		}

		return item;
	};

	getBinding = function ( attribute ) {
		var node = attribute.parentNode;

		if ( node.tagName === 'SELECT' ) {
			return ( node.multiple ? new MultipleSelectBinding( attribute, node ) : new SelectBinding( attribute, node ) );
		}

		if ( node.type === 'checkbox' || node.type === 'radio' ) {
			if ( attribute.propertyName === 'name' ) {
				if ( node.type === 'checkbox' ) {
					return new CheckboxNameBinding( attribute, node );
				}

				if ( node.type === 'radio' ) {
					return new RadioNameBinding( attribute, node );
				}
			}

			if ( attribute.propertyName === 'checked' ) {
				return new CheckedBinding( attribute, node );
			}

			return null;
		}

		if ( attribute.propertyName !== 'value' ) {
			console.warn( 'This is... odd' );
		}

		if ( attribute.parentNode.type === 'file' ) {
			return new FileListBinding( attribute, node );
		}

		return new GenericBinding( attribute, node );
	};

	MultipleSelectBinding = function ( attribute, node ) {
		var valueFromModel;

		inheritProperties( this, attribute, node );
		node.addEventListener( 'change', updateModel, false );

		valueFromModel = this.root.get( this.keypath );

		if ( valueFromModel === undefined ) {
			// get value from DOM, if possible
			this.update();
		}
	};

	MultipleSelectBinding.prototype = {
		value: function () {
			var value, options, i, len;

			value = [];
			options = this.node.options;
			len = options.length;
			
			for ( i=0; i<len; i+=1 ) {
				if ( options[i].selected ) {
					value[ value.length ] = options[i]._ractive.value;
				}
			}

			return value;
		},

		update: function () {
			var attribute, previousValue, value;

			attribute = this.attr;
			previousValue = attribute.value;

			value = this.value();
			
			if ( previousValue === undefined || !arrayContentsMatch( value, previousValue ) ) {
				// either length or contents have changed, so we update the model
				attribute.receiving = true;
				attribute.value = value;
				this.root.set( this.keypath, value );
				attribute.receiving = false;
			}
		},

		teardown: function () {
			this.node.removeEventListener( 'change', updateModel, false );
		}
	};

	SelectBinding = function ( attribute, node ) {
		var valueFromModel;

		inheritProperties( this, attribute, node );
		node.addEventListener( 'change', updateModel, false );

		valueFromModel = this.root.get( this.keypath );

		if ( valueFromModel === undefined ) {
			// get value from DOM, if possible
			this.update();
		}
	};

	SelectBinding.prototype = {
		value: function () {
			var options, i, len;

			options = this.node.options;
			len = options.length;

			for ( i=0; i<len; i+=1 ) {
				if ( options[i].selected ) {
					return options[i]._ractive.value;
				}
			}
		},

		update: function () {
			var value = this.value();

			this.attr.receiving = true;
			this.attr.value = value;
			this.root.set( this.keypath, value );
			this.attr.receiving = false;
		},

		teardown: function () {
			this.node.removeEventListener( 'change', updateModel, false );
		}
	};

	RadioNameBinding = function ( attribute, node ) {
		var valueFromModel;

		this.radioName = true; // so that updateModel knows what to do with this

		inheritProperties( this, attribute, node );

		node.name = '{{' + attribute.keypath + '}}';

		node.addEventListener( 'change', updateModel, false );

		if ( node.attachEvent ) {
			node.addEventListener( 'click', updateModel, false );
		}

		valueFromModel = this.root.get( this.keypath );
		if ( valueFromModel !== undefined ) {
			node.checked = ( valueFromModel === node._ractive.value );
		} else {
			this.root._defRadios[ this.root._defRadios.length ] = this;
		}
	};

	RadioNameBinding.prototype = {
		value: function () {
			return this.node._ractive ? this.node._ractive.value : this.node.value;
		},

		update: function () {
			var node = this.node;

			if ( node.checked ) {
				this.attr.receiving = true;
				this.root.set( this.keypath, this.value() );
				this.attr.receiving = false;
			}
		},

		teardown: function () {
			this.node.removeEventListener( 'change', updateModel, false );
			this.node.removeEventListener( 'click', updateModel, false );
		}
	};

	CheckboxNameBinding = function ( attribute, node ) {
		var valueFromModel, checked;

		this.checkboxName = true; // so that updateModel knows what to do with this

		inheritProperties( this, attribute, node );

		node.name = '{{' + this.keypath + '}}';

		node.addEventListener( 'change', updateModel, false );

		// in case of IE emergency, bind to click event as well
		if ( node.attachEvent ) {
			node.addEventListener( 'click', updateModel, false );
		}

		valueFromModel = this.root.get( this.keypath );

		// if the model already specifies this value, check/uncheck accordingly
		if ( valueFromModel !== undefined ) {
			checked = valueFromModel.indexOf( node._ractive.value ) !== -1;
			node.checked = checked;
		}

		// otherwise make a note that we will need to update the model later
		else {
			if ( this.root._defCheckboxes.indexOf( this.keypath ) === -1 ) {
				this.root._defCheckboxes[ this.root._defCheckboxes.length ] = this.keypath;
			}
		}
	};

	CheckboxNameBinding.prototype = {
		changed: function () {
			return this.node.checked !== !!this.checked;
		},

		update: function () {
			this.checked = this.node.checked;

			this.attr.receiving = true;
			this.root.set( this.keypath, getValueFromCheckboxes( this.root, this.keypath ) );
			this.attr.receiving = false;
		},

		teardown: function () {
			this.node.removeEventListener( 'change', updateModel, false );
			this.node.removeEventListener( 'click', updateModel, false );
		}
	};

	CheckedBinding = function ( attribute, node ) {
		inheritProperties( this, attribute, node );

		node.addEventListener( 'change', updateModel, false );

		if ( node.attachEvent ) {
			node.addEventListener( 'click', updateModel, false );
		}
	};

	CheckedBinding.prototype = {
		value: function () {
			return this.node.checked;
		},

		update: function () {
			this.attr.receiving = true;
			this.root.set( this.keypath, this.value() );
			this.attr.receiving = false;
		},

		teardown: function () {
			this.node.removeEventListener( 'change', updateModel, false );
			this.node.removeEventListener( 'click', updateModel, false );
		}
	};

	FileListBinding = function ( attribute, node ) {
		inheritProperties( this, attribute, node );

		node.addEventListener( 'change', updateModel, false );
	};

	FileListBinding.prototype = {
		value: function () {
			return this.attr.parentNode.files;
		},

		update: function () {
			this.attr.root.set( this.attr.keypath, this.value() );
		},

		teardown: function () {
			this.node.removeEventListener( 'change', updateModel, false );
		}
	};

	GenericBinding = function ( attribute, node ) {
		inheritProperties( this, attribute, node );

		node.addEventListener( 'change', updateModel, false );

		if ( !this.root.lazy ) {
			node.addEventListener( 'input', updateModel, false );

			if ( node.attachEvent ) {
				node.addEventListener( 'keyup', updateModel, false );
			}
		}
	};

	GenericBinding.prototype = {
		value: function () {
			var value = this.attr.parentNode.value;

			// if the value is numeric, treat it as a number. otherwise don't
			if ( ( +value + '' === value ) && value.indexOf( 'e' ) === -1 ) {
				value = +value;
			}

			return value;
		},

		update: function () {
			var attribute = this.attr, value = this.value();

			attribute.receiving = true;
			attribute.root.set( attribute.keypath, value );
			attribute.receiving = false;
		},

		teardown: function () {
			this.node.removeEventListener( 'change', updateModel, false );
			this.node.removeEventListener( 'input', updateModel, false );
			this.node.removeEventListener( 'keyup', updateModel, false );
		}
	};

	inheritProperties = function ( binding, attribute, node ) {
		binding.attr = attribute;
		binding.node = node;
		binding.root = attribute.root;
		binding.keypath = attribute.keypath;
	};

}());
(function () {

	var updateFileInputValue, deferSelect, initSelect, updateSelect, updateMultipleSelect, updateRadioName, updateCheckboxName, updateEverythingElse;

	// There are a few special cases when it comes to updating attributes. For this reason,
	// the prototype .update() method points to updateAttribute, which waits until the
	// attribute has finished initialising, then replaces the prototype method with a more
	// suitable one. That way, we save ourselves doing a bunch of tests on each call
	updateAttribute = function () {
		var node;

		if ( !this.ready ) {
			return this; // avoid items bubbling to the surface when we're still initialising
		}

		node = this.parentNode;

		// special case - selects
		if ( node.tagName === 'SELECT' && this.name === 'value' ) {
			this.update = deferSelect;
			this.deferredUpdate = initSelect; // we don't know yet if it's a select-one or select-multiple

			return this.update();
		}

		// special case - <input type='file' value='{{fileList}}'>
		if ( this.isFileInputValue ) {
			this.update = updateFileInputValue; // save ourselves the trouble next time
			return this;
		}

		// special case - <input type='radio' name='{{twoway}}' value='foo'>
		if ( this.twoway && this.name === 'name' ) {
			if ( node.type === 'radio' ) {
				this.update = updateRadioName;
				return this.update();
			}

			if ( node.type === 'checkbox' ) {
				this.update = updateCheckboxName;
				return this.update();
			}
		}

		this.update = updateEverythingElse;
		return this.update();
	};

	updateFileInputValue = function () {
		return this; // noop - file inputs are readonly
	};

	initSelect = function () {
		// we're now in a position to decide whether this is a select-one or select-multiple
		this.deferredUpdate = ( this.parentNode.multiple ? updateMultipleSelect : updateSelect );
		this.deferredUpdate();
	};

	deferSelect = function () {
		// because select values depend partly on the values of their children, and their
		// children may be entering and leaving the DOM, we wait until updates are
		// complete before updating
		this.root._defSelectValues.push( this );
		return this;
	};

	updateSelect = function () {
		var value = this.fragment.getValue(), options, option, i;

		this.value = value;

		options = this.parentNode.options;
		i = options.length;

		while ( i-- ) {
			option = options[i];

			if ( option._ractive.value === value ) {
				option.selected = true;
				return this;
			}
		}

		// if we're still here, it means the new value didn't match any of the options...
		// TODO figure out what to do in this situation
		
		return this;
	};

	updateMultipleSelect = function () {
		var value = this.fragment.getValue(), options, i;

		if ( !isArray( value ) ) {
			value = [ value ];
		}

		options = this.parentNode.options;
		i = options.length;

		while ( i-- ) {
			options[i].selected = ( value.indexOf( options[i]._ractive.value ) !== -1 );
		}

		this.value = value;

		return this;
	};

	updateRadioName = function () {
		var node, value;

		node = this.parentNode;
		value = this.fragment.getValue();

		node.checked = ( value === node._ractive.value );

		return this;
	};

	updateCheckboxName = function () {
		var node, value;

		node = this.parentNode;
		value = this.fragment.getValue();

		if ( !isArray( value ) ) {
			node.checked = ( value === node._ractive.value );
			return this;
		}

		node.checked = ( value.indexOf( node._ractive.value ) !== -1 );

		return this;
	};

	updateEverythingElse = function () {
		var node, value;

		node = this.parentNode;
		value = this.fragment.getValue();

		// store actual value, so it doesn't get coerced to a string
		if ( this.isValueAttribute ) {
			node._ractive.value = value;
		}

		if ( value === undefined ) {
			value = '';
		}

		if ( value !== this.value ) {
			if ( this.useProperty ) {

				// with two-way binding, only update if the change wasn't initiated by the user
				// otherwise the cursor will often be sent to the wrong place
				if ( !this.receiving ) {
					node[ this.propertyName ] = value;
				}
				
				this.value = value;

				return this;
			}

			if ( this.namespace ) {
				node.setAttributeNS( this.namespace, this.name, value );
				this.value = value;

				return this;
			}

			if ( this.name === 'id' ) {
				if ( this.value !== undefined ) {
					this.root.nodes[ this.value ] = undefined;
				}

				this.root.nodes[ value ] = node;
			}

			node.setAttribute( this.name, value );

			this.value = value;
		}

		return this;
	};

}());
addEventProxies = function ( element, proxies ) {
	var i, eventName, eventNames;

	for ( eventName in proxies ) {
		if ( hasOwn.call( proxies, eventName ) ) {
			eventNames = eventName.split( '-' );
			i = eventNames.length;

			while ( i-- ) {
				addEventProxy( element, eventNames[i], proxies[ eventName ], element.parentFragment.contextStack );
			}
		}
	}
};
(function () {

	var MasterEventHandler,
		ProxyEvent,
		firePlainEvent,
		fireEventWithArgs,
		fireEventWithDynamicArgs,
		customHandlers,
		genericHandler,
		getCustomHandler;

	addEventProxy = function ( element, triggerEventName, proxyDescriptor, contextStack, indexRefs ) {
		var events, master;

		events = element.ractify().events;
		master = events[ triggerEventName ] || ( events[ triggerEventName ] = new MasterEventHandler( element, triggerEventName, contextStack, indexRefs ) );

		master.add( proxyDescriptor );
	};

	MasterEventHandler = function ( element, eventName, contextStack ) {
		var definition;

		this.element = element;
		this.root = element.root;
		this.node = element.node;
		this.name = eventName;
		this.contextStack = contextStack; // TODO do we need to pass contextStack down everywhere? Doesn't it belong to the parentFragment?
		this.proxies = [];

		if ( definition = ( this.root.eventDefinitions[ eventName ] || Ractive.eventDefinitions[ eventName ] ) ) {
			this.custom = definition( this.node, getCustomHandler( eventName ) );
		} else {
			this.node.addEventListener( eventName, genericHandler, false );
		}
	};

	MasterEventHandler.prototype = {
		add: function ( proxy ) {
			this.proxies[ this.proxies.length ] = new ProxyEvent( this.element, this.root, proxy, this.contextStack );
		},

		// TODO teardown when element torn down
		teardown: function () {
			var i;

			if ( this.custom ) {
				this.custom.teardown();
			} else {
				this.node.removeEventListener( this.name, genericHandler, false );
			}

			i = this.proxies.length;
			while ( i-- ) {
				this.proxies[i].teardown();
			}
		},

		fire: function ( event ) {
			var i = this.proxies.length;

			while ( i-- ) {
				this.proxies[i].fire( event );
			}
		}
	};

	ProxyEvent = function ( element, ractive, descriptor, contextStack ) {
		var name;

		this.root = ractive;

		name = descriptor.n || descriptor;

		if ( typeof name === 'string' ) {
			this.n = name;
		} else {
			this.n = new StringFragment({
				descriptor:   descriptor.n,
				root:         this.root,
				owner:        element,
				contextStack: contextStack
			});
		}

		if ( descriptor.a ) {
			this.a = descriptor.a;
			this.fire = fireEventWithArgs;
			return;
		}

		if ( descriptor.d ) {
			this.d = new StringFragment({
				descriptor:   descriptor.d,
				root:         this.root,
				owner:        element,
				contextStack: contextStack
			});
			this.fire = fireEventWithDynamicArgs;
			return;
		}

		this.fire = firePlainEvent;
	};

	ProxyEvent.prototype = {
		teardown: function () {
			if ( this.n.teardown) {
				this.n.teardown();
			}

			if ( this.d ) {
				this.d.teardown();
			}
		},

		bubble: noop // TODO can we get rid of this?
	};

	// the ProxyEvent instance fire method could be any of these
	firePlainEvent = function ( event ) {
		this.root.fire( this.n.toString(), event );
	};

	fireEventWithArgs = function ( event ) {
		this.root.fire( this.n.toString(), event, this.a );
	};

	fireEventWithDynamicArgs = function ( event ) {
		this.root.fire( this.n.toString(), event, this.d.toJSON() );
	};

	// all native DOM events dealt with by Ractive share a single handler
	genericHandler = function ( event ) {
		var storage = this._ractive;

		storage.events[ event.type ].fire({
			node: this,
			original: event,
			index: storage.index,
			keypath: storage.keypath,
			context: storage.root.get( storage.keypath )
		});
	};

	customHandlers = {};

	getCustomHandler = function ( eventName ) {
		if ( customHandlers[ eventName ] ) {
			return customHandlers[ eventName ];
		}

		return customHandlers[ eventName ] = function ( event ) {
			var storage = event.node._ractive;

			event.index = storage.index;
			event.keypath = storage.keypath;
			event.context = storage.root.get( storage.keypath );

			storage.events[ eventName ].fire( event );
		};
	};

}());
appendElementChildren = function ( element, node, descriptor, docFrag ) {
	if ( typeof descriptor.f === 'string' && ( !node || ( !node.namespaceURI || node.namespaceURI === namespaces.html ) ) ) {
		// great! we can use innerHTML
		element.html = descriptor.f;

		if ( docFrag ) {
			node.innerHTML = element.html;
		}
	}

	else {
		// once again, everyone has to suffer because of IE bloody 8
		if ( descriptor.e === 'style' && node.styleSheet !== undefined ) {
			element.fragment = new StringFragment({
				descriptor:   descriptor.f,
				root:         element.root,
				contextStack: element.parentFragment.contextStack,
				owner:        element
			});

			if ( docFrag ) {
				element.bubble = function () {
					node.styleSheet.cssText = element.fragment.toString();
				};
			}
		}

		else {
			element.fragment = new DomFragment({
				descriptor:   descriptor.f,
				root:         element.root,
				parentNode:   node,
				contextStack: element.parentFragment.contextStack,
				owner:        element
			});

			if ( docFrag ) {
				node.appendChild( element.fragment.docFrag );
			}
		}
	}
};
bindElement = function ( element, attributes ) {
	element.ractify();

	// an element can only have one two-way attribute
	switch ( element.descriptor.e ) {
		case 'select':
		case 'textarea':
		if ( attributes.value ) {
			attributes.value.bind();
		}
		return;

		case 'input':

		if ( element.node.type === 'radio' || element.node.type === 'checkbox' ) {
			// we can either bind the name attribute, or the checked attribute - not both
			if ( attributes.name && attributes.name.bind() ) {
				return;
			}

			if ( attributes.checked && attributes.checked.bind() ) {
				return;
			}
		}

		if ( attributes.value && attributes.value.bind() ) {
			return;
		}
	}
};
createElementAttributes = function ( element, attributes ) {
	var attrName, attrValue, attr;

	element.attributes = [];

	for ( attrName in attributes ) {
		if ( hasOwn.call( attributes, attrName ) ) {
			attrValue = attributes[ attrName ];

			attr = new DomAttribute({
				element:      element,
				name:         attrName,
				value:        attrValue,
				root:         element.root,
				parentNode:   element.node,
				contextStack: element.parentFragment.contextStack
			});

			element.attributes[ element.attributes.length ] = attr;

			// name, value and checked attributes are potentially bindable
			if ( attrName === 'value' || attrName === 'name' || attrName === 'checked' ) {
				element.attributes[ attrName ] = attr;
			}

			// The name attribute is a special case - it is the only two-way attribute that updates
			// the viewmodel based on the value of another attribute. For that reason it must wait
			// until the node has been initialised, and the viewmodel has had its first two-way
			// update, before updating itself (otherwise it may disable a checkbox or radio that
			// was enabled in the template)
			if ( attrName !== 'name' ) {
				attr.update();
			}
		}
	}

	return element.attributes;
};
getElementNamespace = function ( descriptor, parentNode ) {
	// if the element has an xmlns attribute, use that
	if ( descriptor.a && descriptor.a.xmlns ) {
		return descriptor.a.xmlns;
	}

	// otherwise, use the svg namespace if this is an svg element, or inherit namespace from parent
	return ( descriptor.e.toLowerCase() === 'svg' ? namespaces.svg : parentNode.namespaceURI );
};
executeTransition = function ( descriptor, root, owner, contextStack, isIntro ) {
	var transitionName, transitionParams, fragment, transitionManager, transition;

	if ( !root.transitionsEnabled ) {
		return;
	}

	if ( typeof descriptor === 'string' ) {
		transitionName = descriptor;
	} else {
		transitionName = descriptor.n;

		if ( descriptor.a ) {
			transitionParams = descriptor.a;
		} else if ( descriptor.d ) {
			fragment = new StringFragment({
				descriptor:   descriptor.d,
				root:         root,
				owner:        owner,
				contextStack: owner.parentFragment.contextStack
			});

			transitionParams = fragment.toJSON();
			fragment.teardown();
		}
	}

	transition = root.transitions[ transitionName ] || Ractive.transitions[ transitionName ];

	if ( transition ) {
		transitionManager = root._transitionManager;

		transitionManager.push( owner.node );
		transition.call( root, owner.node, function () {
			transitionManager.pop( owner.node );
		}, transitionParams, isIntro );
	}
};
getComponentConstructor = function ( root, name ) {
	// TODO... write this properly!
	return root.components[ name ];
};
(function () {

	var elementCache = {};

	insertHtml = function ( html, tagName, docFrag ) {
		var container, nodes = [];

		container = elementCache[ tagName ] || ( elementCache[ tagName ] = doc.createElement( tagName ) );
		container.innerHTML = html;

		while ( container.firstChild ) {
			nodes[ nodes.length ] = container.firstChild;
			docFrag.appendChild( container.firstChild );
		}

		return nodes;
	};

}());
(function () {

	var reassignFragment, reassignElement, reassignMustache;

	reassignFragments = function ( root, section, start, end, by ) {
		var i, fragment, indexRef, oldIndex, newIndex, oldKeypath, newKeypath;

		indexRef = section.descriptor.i;

		for ( i=start; i<end; i+=1 ) {
			fragment = section.fragments[i];

			oldIndex = i - by;
			newIndex = i;

			oldKeypath = section.keypath + '.' + ( i - by );
			newKeypath = section.keypath + '.' + i;

			// change the fragment index
			fragment.index += by;

			reassignFragment( fragment, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath );
		}

		processDeferredUpdates( root );
	};

	reassignFragment = function ( fragment, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath ) {
		var i, item, context;

		if ( fragment.indexRefs && fragment.indexRefs[ indexRef ] !== undefined ) {
			fragment.indexRefs[ indexRef ] = newIndex;
		}

		// fix context stack
		i = fragment.contextStack.length;
		while ( i-- ) {
			context = fragment.contextStack[i];
			if ( context.substr( 0, oldKeypath.length ) === oldKeypath ) {
				fragment.contextStack[i] = context.replace( oldKeypath, newKeypath );
			}
		}

		i = fragment.items.length;
		while ( i-- ) {
			item = fragment.items[i];

			switch ( item.type ) {
				case ELEMENT:
				reassignElement( item, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath );
				break;

				case PARTIAL:
				reassignFragment( item.fragment, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath );
				break;

				case SECTION:
				case INTERPOLATOR:
				case TRIPLE:
				reassignMustache( item, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath );
				break;
			}
		}
	};

	reassignElement = function ( element, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath ) {
		var i, attribute, storage, masterEventName, proxies, proxy;

		i = element.attributes.length;
		while ( i-- ) {
			attribute = element.attributes[i];

			if ( attribute.fragment ) {
				reassignFragment( attribute.fragment, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath );

				if ( attribute.twoway ) {
					attribute.updateBindings();
				}
			}
		}

		if ( storage = element.node._ractive ) {
			if ( storage.keypath.substr( 0, oldKeypath.length ) === oldKeypath ) {
				storage.keypath = storage.keypath.replace( oldKeypath, newKeypath );
			}

			if ( indexRef !== undefined ) {
				storage.index[ indexRef ] = newIndex;
			}

			for ( masterEventName in storage.events ) {
				proxies = storage.events[ masterEventName ].proxies;
				i = proxies.length;

				while ( i-- ) {
					proxy = proxies[i];

					if ( typeof proxy.n === 'object' ) {
						reassignFragment( proxy.a, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath );
					}

					if ( proxy.d ) {
						reassignFragment( proxy.d, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath );
					}
				}
			}

			if ( storage.binding ) {
				if ( storage.binding.keypath.substr( 0, oldKeypath.length ) === oldKeypath ) {
					storage.binding.keypath = storage.binding.keypath.replace( oldKeypath, newKeypath );
				}
			}
		}

		// reassign children
		if ( element.fragment ) {
			reassignFragment( element.fragment, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath );
		}
	};

	reassignMustache = function ( mustache, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath ) {
		var i;

		// expression mustache?
		if ( mustache.descriptor.x ) {
			if ( mustache.keypath ) {
				unregisterDependant( mustache );
			}
			
			if ( mustache.expressionResolver ) {
				mustache.expressionResolver.teardown();
			}

			mustache.expressionResolver = new ExpressionResolver( mustache );
		}

		// normal keypath mustache?
		if ( mustache.keypath ) {
			if ( mustache.keypath.substr( 0, oldKeypath.length ) === oldKeypath ) {
				mustache.resolve( mustache.keypath.replace( oldKeypath, newKeypath ) );
			}
		}

		// index ref mustache?
		else if ( mustache.indexRef === indexRef ) {
			mustache.value = newIndex;
			mustache.render( newIndex );
		}

		// otherwise, it's an unresolved reference. the context stack has been updated
		// so it will take care of itself

		// if it's a section mustache, we need to go through any children
		if ( mustache.fragments ) {
			i = mustache.fragments.length;
			while ( i-- ) {
				reassignFragment( mustache.fragments[i], indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath );
			}
		}
	};

}());
(function ( cache ) {

	var Reference, SoftReference, getFunctionFromString, thisPattern, wrapFunction;

	Evaluator = function ( root, keypath, functionStr, args, priority ) {
		var i, arg;

		this.root = root;
		this.keypath = keypath;
		this.priority = priority;

		this.dependants = 0;

		this.fn = getFunctionFromString( functionStr, args.length );
		this.values = [];
		this.refs = [];

		i = args.length;
		while ( i-- ) {
			if ( arg = args[i] ) {
				if ( arg[0] ) {
					// this is an index ref... we don't need to register a dependant
					this.values[i] = arg[1];
				}

				else {
					this.refs[ this.refs.length ] = new Reference( root, arg[1], this, i, priority );
				}
			}
			
			else {
				this.values[i] = undefined;
			}
		}

		this.selfUpdating = ( this.refs.length <= 1 );
	};

	Evaluator.prototype = {
		wake: function () {
			this.awake = true;
			this.update();
		},

		sleep: function () {
			this.awake = false;
		},

		bubble: function () {
			if ( !this.awake ) {
				return;
			}

			// If we only have one reference, we can update immediately...
			if ( this.selfUpdating ) {
				this.update();
			}

			// ...otherwise we want to register it as a deferred item, to be
			// updated once all the information is in, to prevent unnecessary
			// cascading. Only if we're already resolved, obviously
			else if ( !this.deferred ) {
				this.root._defEvals[ this.root._defEvals.length ] = this;
				this.deferred = true;
			}
		},

		update: function () {
			var value;

			// prevent infinite loops
			if ( this.evaluating ) {
				return this;
			}

			this.evaluating = true;
				
			try {
				value = this.fn.apply( null, this.values );
			} catch ( err ) {
				if ( this.root.debug ) {
					throw err;
				} else {
					value = undefined;
				}
			}

			if ( !isEqual( value, this.value ) ) {
				clearCache( this.root, this.keypath );
				this.root._cache[ this.keypath ] = value;
				notifyDependants( this.root, this.keypath );

				this.value = value;
			}

			this.evaluating = false;

			return this;
		},

		// TODO should evaluators ever get torn down? At present, they don't...
		teardown: function () {
			while ( this.refs.length ) {
				this.refs.pop().teardown();
			}

			clearCache( this.root, this.keypath );
			this.root._evaluators[ this.keypath ] = null;
		},

		// This method forces the evaluator to sync with the current model
		// in the case of a smart update
		refresh: function () {
			if ( !this.selfUpdating ) {
				this.deferred = true;
			}

			var i = this.refs.length;
			while ( i-- ) {
				this.refs[i].update();
			}

			if ( this.deferred ) {
				this.update();
				this.deferred = false;
			}
		},

		updateSoftDependencies: function ( softDeps ) {
			var i, keypath, ref;

			if ( !this.softRefs ) {
				this.softRefs = [];
			}

			// teardown any references that are no longer relevant
			i = this.softRefs.length;
			while ( i-- ) {
				ref = this.softRefs[i];
				if ( !softDeps[ ref.keypath ] ) {
					this.softRefs.splice( i, 1 );
					this.softRefs[ ref.keypath ] = false;
					ref.teardown();
				}
			}

			// add references for any new soft dependencies
			i = softDeps.length;
			while ( i-- ) {
				keypath = softDeps[i];
				if ( !this.softRefs[ keypath ] ) {
					ref = new SoftReference( this.root, keypath, this );
					this.softRefs[ this.softRefs.length ] = ref;
					this.softRefs[ keypath ] = true;
				}
			}

			this.selfUpdating = ( this.refs.length + this.softRefs.length <= 1 );
		}
	};


	Reference = function ( root, keypath, evaluator, argNum, priority ) {
		var value;

		this.evaluator = evaluator;
		this.keypath = keypath;
		this.root = root;
		this.argNum = argNum;
		this.type = REFERENCE;
		this.priority = priority;

		value = root.get( keypath );

		if ( typeof value === 'function' ) {
			value = value._wrapped || wrapFunction( value, root, evaluator );
		}

		this.value = evaluator.values[ argNum ] = value;

		registerDependant( this );
	};

	Reference.prototype = {
		update: function () {
			var value = this.root.get( this.keypath );

			if ( typeof value === 'function' && !value._nowrap ) {
				value = value[ '_' + this.root._guid ] || wrapFunction( value, this.root, this.evaluator );
			}

			if ( !isEqual( value, this.value ) ) {
				this.evaluator.values[ this.argNum ] = value;
				this.evaluator.bubble();

				this.value = value;
			}
		},

		teardown: function () {
			unregisterDependant( this );
		}
	};

	SoftReference = function ( root, keypath, evaluator ) {
		this.root = root;
		this.keypath = keypath;
		this.priority = evaluator.priority;

		this.evaluator = evaluator;

		registerDependant( this );
	};

	SoftReference.prototype = {
		update: function () {
			var value = this.root.get( this.keypath );

			if ( !isEqual( value, this.value ) ) {
				this.evaluator.bubble();
				this.value = value;
			}
		},

		teardown: function () {
			unregisterDependant( this );
		}
	};


	getFunctionFromString = function ( str, i ) {
		var fn, args;

		str = str.replace( /\$\{([0-9]+)\}/g, '_$1' );

		if ( cache[ str ] ) {
			return cache[ str ];
		}

		args = [];
		while ( i-- ) {
			args[i] = '_' + i;
		}

		fn = new Function( args.join( ',' ), 'return(' + str + ')' );

		cache[ str ] = fn;
		return fn;
	};

	thisPattern = /this/;

	wrapFunction = function ( fn, ractive, evaluator ) {
		var prop;

		// if the function doesn't refer to `this`, we don't need
		// to set the context
		if ( !thisPattern.test( fn.toString() ) ) {
			defineProperty( fn, '_nowrap', { // no point doing this every time
				value: true
			});
			return fn;
		}

		// otherwise, we do
		defineProperty( fn, '_' + ractive._guid, {
			value: function () {
				var originalGet, result, softDependencies;

				originalGet = ractive.get;
				ractive.get = function ( keypath ) {
					if ( !softDependencies ) {
						softDependencies = [];
					}

					if ( !softDependencies[ keypath ] ) {
						softDependencies[ softDependencies.length ] = keypath;
						softDependencies[ keypath ] = true;
					}
					
					return originalGet.call( ractive, keypath );
				};
				
				result = fn.apply( ractive, arguments );
				
				if ( softDependencies ) {
					evaluator.updateSoftDependencies( softDependencies );
				}

				// reset
				ractive.get = originalGet;
				
				return result;
			},
			writable: true
		});

		for ( prop in fn ) {
			if ( hasOwn.call( fn, prop ) ) {
				fn[ '_' + ractive._guid ][ prop ] = fn[ prop ];
			}
		}

		return fn[ '_' + ractive._guid ];
	};

}({}));
(function () {

	var ReferenceScout, getKeypath;

	ExpressionResolver = function ( mustache ) {

		var expression, i, len, ref, indexRefs;

		this.root = mustache.root;
		this.mustache = mustache;
		this.args = [];
		this.scouts = [];

		expression = mustache.descriptor.x;
		indexRefs = mustache.parentFragment.indexRefs;

		this.str = expression.s;

		// send out scouts for each reference
		len = this.unresolved = this.args.length = ( expression.r ? expression.r.length : 0 );

		if ( !len ) {
			this.resolved = this.ready = true;
			this.bubble(); // some expressions don't have references. edge case, but, yeah.
			return;
		}

		for ( i=0; i<len; i+=1 ) {
			ref = expression.r[i];
			
			// is this an index ref?
			if ( indexRefs && indexRefs[ ref ] !== undefined ) {
				this.resolveRef( i, true, indexRefs[ ref ] );
			}

			else {
				this.scouts[ this.scouts.length ] = new ReferenceScout( this, ref, mustache.contextStack, i );
			}
		}

		this.ready = true;
		this.bubble();
	};

	ExpressionResolver.prototype = {
		bubble: function () {
			if ( !this.ready ) {
				return;
			}
			
			this.keypath = getKeypath( this.str, this.args );
			this.createEvaluator();

			this.mustache.resolve( this.keypath );
		},

		teardown: function () {
			while ( this.scouts.length ) {
				this.scouts.pop().teardown();
			}
		},

		resolveRef: function ( argNum, isIndexRef, value ) {
			this.args[ argNum ] = [ isIndexRef, value ];
			this.bubble();

			// when all references have been resolved, we can flag the entire expression
			// as having been resolved
			this.resolved = !( --this.unresolved );
		},

		createEvaluator: function () {
			// only if it doesn't exist yet!
			if ( !this.root._evaluators[ this.keypath ] ) {
				this.root._evaluators[ this.keypath ] = new Evaluator( this.root, this.keypath, this.str, this.args, this.mustache.priority );
			}

			else {
				// we need to trigger a refresh of the evaluator, since it
				// will have become de-synced from the model if we're in a
				// reassignment cycle
				this.root._evaluators[ this.keypath ].refresh();
			}
		}
	};


	ReferenceScout = function ( resolver, ref, contextStack, argNum ) {
		var keypath, root;

		root = this.root = resolver.root;

		keypath = resolveRef( root, ref, contextStack );
		if ( keypath ) {
			resolver.resolveRef( argNum, false, keypath );
		} else {
			this.ref = ref;
			this.argNum = argNum;
			this.resolver = resolver;
			this.contextStack = contextStack;

			root._pendingResolution[ root._pendingResolution.length ] = this;
		}
	};

	ReferenceScout.prototype = {
		resolve: function ( keypath ) {
			this.keypath = keypath;
			this.resolver.resolveRef( this.argNum, false, keypath );
		},

		teardown: function () {
			// if we haven't found a keypath yet, we can
			// stop the search now
			if ( !this.keypath ) {
				teardown( this );
			}
		}
	};

	getKeypath = function ( str, args ) {
		var unique;

		// get string that is unique to this expression
		unique = str.replace( /\$\{([0-9]+)\}/g, function ( match, $1 ) {
			return args[ $1 ] ? args[ $1 ][1] : 'undefined';
		});

		// then sanitize by removing any periods or square brackets. Otherwise
		// we can't split the keypath into keys!
		return '(' + unique.replace( /[\.\[\]]/g, '-' ) + ')';
	};

}());
(function () {

	var getPartialFromRegistry, unpack;

	getPartialDescriptor = function ( root, name ) {
		var el, partial;

		// If the partial was specified on this instance, great
		if ( partial = getPartialFromRegistry( root, name ) ) {
			return partial;
		}

		// If not, is it a global partial?
		if ( partial = getPartialFromRegistry( Ractive, name ) ) {
			return partial;
		}

		// Does it exist on the page as a script tag?
		if ( doc ) {
			el = doc.getElementById( name );
			if ( el && el.tagName === 'SCRIPT' ) {
				if ( !Ractive.parse ) {
					throw new Error( missingParser );
				}

				Ractive.partials[ name ] = Ractive.parse( el.innerHTML );
			}
		}

		partial = Ractive.partials[ name ];

		// No match? Return an empty array
		if ( !partial ) {
			if ( root.debug && console && console.warn ) {
				console.warn( 'Could not find descriptor for partial "' + name + '"' );
			}

			return [];
		}

		return unpack( partial );
	};

	getPartialFromRegistry = function ( registry, name ) {
		var partial, key;

		if ( registry.partials[ name ] ) {
			
			// If this was added manually to the registry, but hasn't been parsed,
			// parse it now
			if ( typeof registry.partials[ name ] === 'string' ) {
				if ( !Ractive.parse ) {
					throw new Error( missingParser );
				}

				partial = Ractive.parse( registry.partials[ name ], registry.parseOptions );

				if ( isObject( partial ) ) {
					registry.partials[ name ] = partial.main;

					for ( key in partial.partials ) {
						if ( partial.partials.hasOwnProperty( key ) ) {
							registry.partials[ key ] = partial.partials[ key ];
						}
					}
				} else {
					registry.partials[ name ] = partial;
				}
			}

			return unpack( registry.partials[ name ] );
		}
	};

	unpack = function ( partial ) {
		// Unpack string, if necessary
		if ( partial.length === 1 && typeof partial[0] === 'string' ) {
			return partial[0];
		}

		return partial;
	};

}());
initFragment = function ( fragment, options ) {

	var numItems, i, parentFragment, parentRefs, ref;

	// The item that owns this fragment - an element, section, partial, or attribute
	fragment.owner = options.owner;
	parentFragment = fragment.owner.parentFragment;

	// inherited properties
	fragment.root = options.root;
	fragment.parentNode = options.parentNode;
	fragment.contextStack = options.contextStack || [];

	// If parent item is a section, this may not be the only fragment
	// that belongs to it - we need to make a note of the index
	if ( fragment.owner.type === SECTION ) {
		fragment.index = options.index;
	}

	// index references (the 'i' in {{#section:i}}<!-- -->{{/section}}) need to cascade
	// down the tree
	if ( parentFragment ) {
		parentRefs = parentFragment.indexRefs;

		if ( parentRefs ) {
			fragment.indexRefs = createFromNull(); // avoids need for hasOwnProperty

			for ( ref in parentRefs ) {
				fragment.indexRefs[ ref ] = parentRefs[ ref ];
			}
		}
	}

	// inherit priority
	fragment.priority = ( parentFragment ? parentFragment.priority + 1 : 1 );

	if ( options.indexRef ) {
		if ( !fragment.indexRefs ) {
			fragment.indexRefs = {};
		}

		fragment.indexRefs[ options.indexRef ] = options.index;
	}

	// Time to create this fragment's child items;
	fragment.items = [];

	numItems = ( options.descriptor ? options.descriptor.length : 0 );
	for ( i=0; i<numItems; i+=1 ) {
		fragment.items[ fragment.items.length ] = fragment.createItem({
			parentFragment: fragment,
			descriptor: options.descriptor[i],
			index: i
		});
	}

};
isStringFragmentSimple = function ( fragment ) {
	var i, item, containsInterpolator;

	i = fragment.items.length;
	while ( i-- ) {
		item = fragment.items[i];
		if ( item.type === TEXT ) {
			continue;
		}

		// we can only have one interpolator and still be self-updating
		if ( item.type === INTERPOLATOR ) {
			if ( containsInterpolator ) {
				return false;
			} else {
				containsInterpolator = true;
				continue;
			}
		}

		// anything that isn't text or an interpolator (i.e. a section)
		// and we can't self-update
		return false;
	}

	return true;
};
initMustache = function ( mustache, options ) {

	var keypath, indexRef, parentFragment;

	parentFragment = mustache.parentFragment = options.parentFragment;

	mustache.root           = parentFragment.root;
	mustache.contextStack   = parentFragment.contextStack;
	
	mustache.descriptor     = options.descriptor;
	mustache.index          = options.index || 0;
	mustache.priority       = parentFragment.priority;

	// DOM only
	if ( parentFragment.parentNode ) {
		mustache.parentNode = parentFragment.parentNode;
	}

	mustache.type = options.descriptor.t;


	// if this is a simple mustache, with a reference, we just need to resolve
	// the reference to a keypath
	if ( options.descriptor.r ) {
		if ( parentFragment.indexRefs && parentFragment.indexRefs[ options.descriptor.r ] !== undefined ) {
			indexRef = parentFragment.indexRefs[ options.descriptor.r ];

			mustache.indexRef = options.descriptor.r;
			mustache.value = indexRef;
			mustache.render( mustache.value );
		}

		else {
			keypath = resolveRef( mustache.root, options.descriptor.r, mustache.contextStack );
			if ( keypath ) {
				mustache.resolve( keypath );
			} else {
				mustache.ref = options.descriptor.r;
				mustache.root._pendingResolution[ mustache.root._pendingResolution.length ] = mustache;

				// inverted section? initialise
				if ( mustache.descriptor.n ) {
					mustache.render( false );
				}
			}
		}
	}

	// if it's an expression, we have a bit more work to do
	if ( options.descriptor.x ) {
		mustache.expressionResolver = new ExpressionResolver( mustache );
	}

};


// methods to add to individual mustache prototypes
updateMustache = function () {
	var value = this.root.get( this.keypath, true );

	if ( !isEqual( value, this.value ) ) {
		this.render( value );
		this.value = value;
	}
};

resolveMustache = function ( keypath ) {
	// if we resolved previously, we need to unregister
	if ( this.resolved ) {
		unregisterDependant( this );
	}

	this.keypath = keypath;
	registerDependant( this );
	
	this.update();

	// TODO is there any need for this?
	if ( this.expressionResolver && this.expressionResolver.resolved ) {
		this.expressionResolver = null;
	}

	this.resolved = true;
};
(function () {

	var updateListSection, updateListObjectSection, updateContextSection, updateConditionalSection;

	updateSection = function ( section, value ) {
		var fragmentOptions;

		fragmentOptions = {
			descriptor: section.descriptor.f,
			root:       section.root,
			parentNode: section.parentNode,
			owner:      section
		};

		// if section is inverted, only check for truthiness/falsiness
		if ( section.descriptor.n ) {
			updateConditionalSection( section, value, true, fragmentOptions );
			return;
		}

		// otherwise we need to work out what sort of section we're dealing with

		// if value is an array, or an object with an index reference, iterate through
		if ( isArray( value ) ) {
			updateListSection( section, value, fragmentOptions );
		}


		// if value is a hash...
		else if ( isObject( value ) ) {
			if ( section.descriptor.i ) {
				updateListObjectSection( section, value, fragmentOptions );
			} else {
				updateContextSection( section, fragmentOptions );
			}
		}


		// otherwise render if value is truthy, unrender if falsy
		else {
			updateConditionalSection( section, value, false, fragmentOptions );
		}
	};

	updateListSection = function ( section, value, fragmentOptions ) {
		var i, length, fragmentsToRemove;

		length = value.length;

		// if the array is shorter than it was previously, remove items
		if ( length < section.length ) {
			fragmentsToRemove = section.fragments.splice( length, section.length - length );

			while ( fragmentsToRemove.length ) {
				fragmentsToRemove.pop().teardown( true );
			}
		}

		// otherwise...
		else {

			if ( length > section.length ) {
				// add any new ones
				for ( i=section.length; i<length; i+=1 ) {
					// append list item to context stack
					fragmentOptions.contextStack = section.contextStack.concat( section.keypath + '.' + i );
					fragmentOptions.index = i;

					if ( section.descriptor.i ) {
						fragmentOptions.indexRef = section.descriptor.i;
					}

					section.fragments[i] = section.createFragment( fragmentOptions );
				}
			}
		}

		section.length = length;
	};

	updateListObjectSection = function ( section, value, fragmentOptions ) {
		var id, fragmentsById;

		fragmentsById = section.fragmentsById || ( section.fragmentsById = createFromNull() );

		// remove any fragments that should no longer exist
		for ( id in fragmentsById ) {
			if ( value[ id ] === undefined && fragmentsById[ id ] ) {
				fragmentsById[ id ].teardown( true );
				fragmentsById[ id ] = null;
			}
		}

		// add any that haven't been created yet
		for ( id in value ) {
			if ( value[ id ] !== undefined && !fragmentsById[ id ] ) {
				fragmentOptions.contextStack = section.contextStack.concat( section.keypath + '.' + id );
				fragmentOptions.index = id;

				if ( section.descriptor.i ) {
					fragmentOptions.indexRef = section.descriptor.i;
				}

				fragmentsById[ id ] = section.createFragment( fragmentOptions );
			}
		}
	};

	updateContextSection = function ( section, fragmentOptions ) {
		// ...then if it isn't rendered, render it, adding section.keypath to the context stack
		// (if it is already rendered, then any children dependent on the context stack
		// will update themselves without any prompting)
		if ( !section.length ) {
			// append this section to the context stack
			fragmentOptions.contextStack = section.contextStack.concat( section.keypath );
			fragmentOptions.index = 0;

			section.fragments[0] = section.createFragment( fragmentOptions );
			section.length = 1;
		}
	};

	updateConditionalSection = function ( section, value, inverted, fragmentOptions ) {
		var doRender, emptyArray, fragmentsToRemove;

		emptyArray = ( isArray( value ) && value.length === 0 );

		if ( inverted ) {
			doRender = emptyArray || !value;
		} else {
			doRender = value && !emptyArray;
		}

		if ( doRender ) {
			if ( !section.length ) {
				// no change to context stack
				fragmentOptions.contextStack = section.contextStack;
				fragmentOptions.index = 0;

				section.fragments[0] = section.createFragment( fragmentOptions );
				section.length = 1;
			}

			if ( section.length > 1 ) {
				fragmentsToRemove = section.fragments.splice( 1 );
				
				while ( fragmentsToRemove.length ) {
					fragmentsToRemove.pop().teardown( true );
				}
			}
		}

		else if ( section.length ) {
			section.teardownFragments( true );
			section.length = 0;
		}
	};

}());
var getItem;

(function () {

	var getText, getMustache, getElement;

	getItem = function ( parser, preserveWhitespace ) {
		if ( !parser.next() ) {
			return null;
		}

		return getText( parser, preserveWhitespace )
		    || getMustache( parser, preserveWhitespace )
		    || getElement( parser, preserveWhitespace );
	};

	getText = function ( parser, preserveWhitespace ) {
		var next = parser.next();

		if ( next.type === TEXT ) {
			parser.pos += 1;
			return new TextStub( next, preserveWhitespace );
		}

		return null;
	};

	getMustache = function ( parser, preserveWhitespace ) {
		var next = parser.next();

		if ( next.type === MUSTACHE || next.type === TRIPLE ) {
			if ( next.mustacheType === SECTION || next.mustacheType === INVERTED ) {
				return new SectionStub( next, parser, preserveWhitespace );				
			}

			return new MustacheStub( next, parser );
		}

		return null;
	};

	getElement = function ( parser, preserveWhitespace ) {
		var next = parser.next(), stub;

		if ( next.type === TAG ) {
			stub = new ElementStub( next, parser, preserveWhitespace );

			// sanitize			
			if ( parser.options.sanitize && parser.options.sanitize.elements ) {
				if ( parser.options.sanitize.elements.indexOf( stub.lcTag ) !== -1 ) {
					return null;
				}
			}

			return stub;
		}

		return null;
	};

}());
var jsonifyStubs = function ( items, noStringify ) {
	var str, json;

	if ( !noStringify ) {
		str = stringifyStubs( items );
		if ( str !== false ) {
			return str;
		}
	}

	json = items.map( function ( item ) {
		return item.toJSON( noStringify );
	});

	return json;
};
var stringifyStubs = function ( items ) {
	var str = '', itemStr, i, len;

	if ( !items ) {
		return '';
	}

	for ( i=0, len=items.length; i<len; i+=1 ) {
		itemStr = items[i].toString();
		
		if ( itemStr === false ) {
			return false;
		}

		str += itemStr;
	}

	return str;
};
var allowWhitespace = function ( tokenizer ) {
	var match = leadingWhitespace.exec( tokenizer.str.substring( tokenizer.pos ) );

	if ( !match ) {
		return null;
	}

	tokenizer.pos += match[0].length;
	return match[0];
};
// TODO give this a less conflicty name
var fail = function ( tokenizer, expected ) {
	var remaining = tokenizer.remaining().substr( 0, 40 );
	if ( remaining.length === 40 ) {
		remaining += '...';
	}
	throw new Error( 'Tokenizer failed: unexpected string "' + remaining + '" (expected ' + expected + ')' );
};
var getRegexMatcher = function ( regex ) {
	return function ( tokenizer ) {
		var match = regex.exec( tokenizer.str.substring( tokenizer.pos ) );

		if ( !match ) {
			return null;
		}

		tokenizer.pos += match[0].length;
		return match[1] || match[0];
	};
};
var getStringMatch = function ( tokenizer, string ) {
	var substr;

	substr = tokenizer.str.substr( tokenizer.pos, string.length );

	if ( substr === string ) {
		tokenizer.pos += string.length;
		return string;
	}

	return null;
};
stripCommentTokens = function ( tokens ) {
	var i, current, previous, next;

	for ( i=0; i<tokens.length; i+=1 ) {
		current = tokens[i];
		previous = tokens[i-1];
		next = tokens[i+1];

		// if the current token is a comment or a delimiter change, remove it...
		if ( current.mustacheType === COMMENT || current.mustacheType === DELIMCHANGE ) {
			
			tokens.splice( i, 1 ); // remove comment token

			// ... and see if it has text nodes either side, in which case
			// they can be concatenated
			if ( previous && next ) {
				if ( previous.type === TEXT && next.type === TEXT ) {
					previous.value += next.value;
					
					tokens.splice( i, 1 ); // remove next token
				}
			}

			i -= 1; // decrement i to account for the splice(s)
		}
	}

	return tokens;
};
stripHtmlComments = function ( html ) {
	var commentStart, commentEnd, processed;

	processed = '';

	while ( html.length ) {
		commentStart = html.indexOf( '<!--' );
		commentEnd = html.indexOf( '-->' );

		// no comments? great
		if ( commentStart === -1 && commentEnd === -1 ) {
			processed += html;
			break;
		}

		// comment start but no comment end
		if ( commentStart !== -1 && commentEnd === -1 ) {
			throw 'Illegal HTML - expected closing comment sequence (\'-->\')';
		}

		// comment end but no comment start, or comment end before comment start
		if ( ( commentEnd !== -1 && commentStart === -1 ) || ( commentEnd < commentStart ) ) {
			throw 'Illegal HTML - unexpected closing comment sequence (\'-->\')';
		}

		processed += html.substr( 0, commentStart );
		html = html.substring( commentEnd + 3 );
	}

	return processed;
};
stripStandalones = function ( tokens ) {
	var i, current, backOne, backTwo, leadingLinebreak, trailingLinebreak;

	leadingLinebreak = /^\s*\r?\n/;
	trailingLinebreak = /\r?\n\s*$/;

	for ( i=2; i<tokens.length; i+=1 ) {
		current = tokens[i];
		backOne = tokens[i-1];
		backTwo = tokens[i-2];

		// if we're at the end of a [text][mustache][text] sequence...
		if ( current.type === TEXT && ( backOne.type === MUSTACHE ) && backTwo.type === TEXT ) {

			// ... and the mustache is a standalone (i.e. line breaks either side)...
			if ( trailingLinebreak.test( backTwo.value ) && leadingLinebreak.test( current.value ) ) {

				// ... then we want to remove the whitespace after the first line break
				// if the mustache wasn't a triple or interpolator or partial
				if ( backOne.mustacheType !== INTERPOLATOR && backOne.mustacheType !== TRIPLE ) {
					backTwo.value = backTwo.value.replace( trailingLinebreak, '\n' );
				}

				// and the leading line break of the second text token
				current.value = current.value.replace( leadingLinebreak, '' );

				// if that means the current token is now empty, we should remove it
				if ( current.value === '' ) {
					tokens.splice( i--, 1 ); // splice and decrement
				}
			}
		}
	}

	return tokens;
};
(function ( proto ) {

	var add = function ( root, keypath, d ) {
		var value;

		if ( typeof keypath !== 'string' || !isNumeric( d ) ) {
			if ( root.debug ) {
				throw new Error( 'Bad arguments' );
			}
			return;
		}

		value = root.get( keypath );

		if ( value === undefined ) {
			value = 0;
		}

		if ( !isNumeric( value ) ) {
			if ( root.debug ) {
				throw new Error( 'Cannot add to a non-numeric value' );
			}
			return;
		}

		root.set( keypath, value + d );
	};

	proto.add = function ( keypath, d ) {
		add( this, keypath, ( d === undefined ? 1 : d ) );
	};

	proto.subtract = function ( keypath, d ) {
		add( this, keypath, ( d === undefined ? -1 : -d ) );
	};

	proto.toggle = function ( keypath ) {
		var value;

		if ( typeof keypath !== 'string' ) {
			if ( this.debug ) {
				throw new Error( 'Bad arguments' );
			}
			return;
		}

		value = this.get( keypath );
		this.set( keypath, !value );
	};

}( proto ));
(function ( proto ) {

	var animate, noAnimation;

	proto.animate = function ( keypath, to, options ) {
		
		var k, animation, animations;

		// animate multiple keypaths
		if ( typeof keypath === 'object' ) {
			options = to || {};
			animations = [];

			for ( k in keypath ) {
				if ( hasOwn.call( keypath, k ) ) {
					animations[ animations.length ] = animate( this, k, keypath[k], options );
				}
			}

			return {
				stop: function () {
					while ( animations.length ) {
						animations.pop().stop();
					}
				}
			};
		}

		// animate a single keypath
		options = options || {};

		animation = animate( this, keypath, to, options );

		return {
			stop: function () {
				animation.stop();
			}
		};
	};

	noAnimation = {
		stop: noop
	};

	animate = function ( root, keypath, to, options ) {
		var easing, duration, animation, i, from;

		from = root.get( keypath );
		
		// cancel any existing animation
		// TODO what about upstream/downstream keypaths?
		i = animationCollection.animations.length;
		while ( i-- ) {
			animation = animationCollection.animations[i];

			if ( animation.root === root && animation.keypath === keypath ) {
				animation.stop();
			}
		}

		// don't bother animating values that stay the same
		if ( isEqual( from, to ) ) {
			if ( options.complete ) {
				options.complete( 1, options.to );
			}

			return noAnimation;
		}

		// easing function
		if ( options.easing ) {
			if ( typeof options.easing === 'function' ) {
				easing = options.easing;
			}

			else {
				if ( root.easing && root.easing[ options.easing ] ) {
					// use instance easing function first
					easing = root.easing[ options.easing ];
				} else {
					// fallback to global easing functions
					easing = Ractive.easing[ options.easing ];
				}
			}

			if ( typeof easing !== 'function' ) {
				easing = null;
			}
		}

		// duration
		duration = ( options.duration === undefined ? 400 : options.duration );

		// TODO store keys, use an internal set method
		animation = new Animation({
			keypath: keypath,
			from: from,
			to: to,
			root: root,
			duration: duration,
			easing: easing,
			step: options.step,
			complete: options.complete
		});

		animationCollection.push( animation );
		root._animations[ root._animations.length ] = animation;

		return animation;
	};

}( proto ));
proto.cancelFullscreen = function () {
	Ractive.cancelFullscreen( this.el );
};
proto.find = function ( selector ) {
	if ( !this.el ) {
		return null;
	}

	return this.el.querySelector( selector );
};
(function () {

	var tagSelector, classSelector;

	proto.findAll = function ( selector, live ) {
		var errorMessage;

		if ( !this.el ) {
			return [];
		}

		// If the selector is a tag name or a class name, we can (optionally)
		// return a live nodelist (querySelector returns a static list)
		if ( live ) {
			if ( tagSelector.test( selector ) ) {
				return this.el.getElementsByTagName( selector );
			}

			if ( classSelector.test( selector ) ) {
				return this.el.getElementsByClassName( selector.substring( 1 ) );
			}

			errorMessage = 'Could not generate live nodelist from "' + selector + '" selector';

			if ( this.debug ) {
				throw new Error( errorMessage );
			} else if ( console && console.warn ) {
				console.warn( errorMessage );
			}
		}

		return this.el.querySelectorAll( selector );
	};

	tagSelector = /^[a-zA-Z][a-zA-Z0-9\-]*$/;
	classSelector = /^\.[^\s]+$/g;

}());
proto.fire = function ( eventName ) {
	var args, i, len, subscribers = this._subs[ eventName ];

	if ( !subscribers ) {
		return;
	}

	args = Array.prototype.slice.call( arguments, 1 );

	for ( i=0, len=subscribers.length; i<len; i+=1 ) {
		subscribers[i].apply( this, args );
	}
};
(function ( proto ) {

	var get,
		prefix,
		getPrefixer,
		prefixers = {},
		adaptIfNecessary;

	proto.get = function ( keypath ) {
		var cache,
			cached,
			value,
			wrapped,
			evaluator;

		// Normalise the keypath (i.e. list[0].foo -> list.0.foo)
		keypath = normaliseKeypath( keypath || '' );

		cache = this._cache;

		if ( ( cached = cache[ keypath ] ) !== undefined ) {
			return cached;
		}

		// Is this a wrapped property?
		if ( wrapped = this._wrapped[ keypath ] ) {
			value = wrapped.value;
		}

		// Is it the root?
		else if ( !keypath ) {
			adaptIfNecessary( this, '', this.data );
			value = this.data;
		}

		// Is this an uncached evaluator value?
		else if ( evaluator = this._evaluators[ keypath ] ) {
			value = evaluator.value;
		}

		// No? Then we need to retrieve the value one key at a time
		else {
			value = get( this, keypath );
		}
		
		cache[ keypath ] = value;
		return value;
	};



	get = function ( ractive, keypath ) {
		var keys, key, parentKeypath, parentValue, cacheMap, value, adaptor, wrapped;

		keys = keypath.split( '.' );
		key = keys.pop();
		parentKeypath = keys.join( '.' );

		parentValue = ractive.get( parentKeypath );

		if ( wrapped = ractive._wrapped[ parentKeypath ] ) {
			parentValue = wrapped.get();
		}

		if ( parentValue === null || parentValue === undefined ) {
			return;
		}

		// update cache map
		if ( !( cacheMap = ractive._cacheMap[ parentKeypath ] ) ) {
			ractive._cacheMap[ parentKeypath ] = [ keypath ];
		} else {
			if ( cacheMap.indexOf( keypath ) === -1 ) {
				cacheMap[ cacheMap.length ] = keypath;
			}
		}


		value = parentValue[ key ];


		// Do we have an adaptor for this value?
		if ( adaptIfNecessary( ractive, keypath, value ) ) {
			return value;
		}


		// If we're in 'magic' mode, wrap this object
		if ( ractive.magic ) {
			ractive._wrapped[ keypath ] = Ractive.adaptors.magic.wrap( ractive, value, keypath );
		}

		// Should we use the in-built adaptor for plain arrays?
		if ( ractive.modifyArrays ) {
			adaptor = Ractive.adaptors.array;

			if ( adaptor.filter( ractive, value, keypath ) ) {
				ractive._wrapped[ keypath ] = adaptor.wrap( ractive, value, keypath );
			}
		}

		// Update cache
		ractive._cache[ keypath ] = value;
		return value;
	};
	

	prefix = function ( obj, prefix ) {
		var prefixed = {}, key;

		if ( !prefix ) {
			return obj;
		}

		prefix += '.';

		for ( key in obj ) {
			if ( hasOwn.call( obj, key ) ) {
				prefixed[ prefix + key ] = obj[ key ];
			}
		}

		return prefixed;
	};

	getPrefixer = function ( rootKeypath ) {
		var rootDot;

		if ( !prefixers[ rootKeypath ] ) {
			rootDot = rootKeypath ? rootKeypath + '.' : '';

			prefixers[ rootKeypath ] = function ( relativeKeypath, value ) {
				var obj;

				if ( typeof relativeKeypath === 'string' ) {
					obj = {};
					obj[ rootDot + relativeKeypath ] = value;
					return obj;
				}

				if ( typeof relativeKeypath === 'object' ) {
					// 'relativeKeypath' is in fact a hash, not a keypath
					return rootDot ? prefix( relativeKeypath, rootKeypath ) : relativeKeypath;
				}
			};
		}

		return prefixers[ rootKeypath ];
	};

	adaptIfNecessary = function ( ractive, keypath, value ) {
		var i, adaptor, wrapped;

		// Do we have an adaptor for this value?
		i = ractive.adaptors.length;
		while ( i-- ) {
			adaptor = ractive.adaptors[i];
			
			// Adaptors can be specified as e.g. [ 'Backbone.Model', 'Backbone.Collection' ] -
			// we need to get the actual adaptor if that's the case
			if ( typeof adaptor === 'string' ) {
				if ( !Ractive.adaptors[ adaptor ] ) {
					throw new Error( 'Missing adaptor "' + adaptor + '"' );
				}
				adaptor = ractive.adaptors[i] = Ractive.adaptors[ adaptor ];
			}

			if ( adaptor.filter( value, keypath, ractive ) ) {
				wrapped = ractive._wrapped[ keypath ] = adaptor.wrap( ractive, value, keypath, getPrefixer( keypath ) );
				ractive._cache[ keypath ] = value;

				return true;
			}
		}
	};

}( proto ));
var attemptKeypathResolution = function ( root ) {
	var i, unresolved, keypath;

	// See if we can resolve any of the unresolved keypaths (if such there be)
	i = root._pendingResolution.length;
	while ( i-- ) { // Work backwards, so we don't go in circles!
		unresolved = root._pendingResolution.splice( i, 1 )[0];

		keypath = resolveRef( root, unresolved.ref, unresolved.contextStack );
		if ( keypath !== undefined ) {
			// If we've resolved the keypath, we can initialise this item
			unresolved.resolve( keypath );

		} else {
			// If we can't resolve the reference, add to the back of
			// the queue (this is why we're working backwards)
			root._pendingResolution[ root._pendingResolution.length ] = unresolved;
		}
	}
};
clearCache = function ( ractive, keypath ) {
	var cacheMap, wrappedProperty;

	// Is there a wrapped property at this keypath?
	if ( wrappedProperty = ractive._wrapped[ keypath ] ) {
		// Did we unwrap it?
		if ( wrappedProperty.teardown() !== false ) {
			ractive._wrapped[ keypath ] = null;
		}
	}
	
	ractive._cache[ keypath ] = undefined;

	if ( cacheMap = ractive._cacheMap[ keypath ] ) {
		while ( cacheMap.length ) {
			clearCache( ractive, cacheMap.pop() );
		}
	}
};
var getValueFromCheckboxes = function ( ractive, keypath ) {
	var value, checkboxes, checkbox, len, i, rootEl;

	value = [];

	// TODO in edge cases involving components with inputs bound to the same keypath, this
	// could get messy
	
	// if we're still in the initial render, we need to find the inputs from the as-yet off-DOM
	// document fragment. otherwise, the root element
	rootEl = ractive.rendered ? ractive.el : ractive.fragment.docFrag;
	checkboxes = rootEl.querySelectorAll( 'input[type="checkbox"][name="{{' + keypath + '}}"]' );
	
	len = checkboxes.length;

	for ( i=0; i<len; i+=1 ) {
		checkbox = checkboxes[i];

		if ( checkbox.hasAttribute( 'checked' ) || checkbox.checked ) {
			value[ value.length ] = checkbox._ractive.value;
		}
	}

	return value;
};
notifyDependants = function ( ractive, keypath, onlyDirect ) {
	var i;

	for ( i=0; i<ractive._deps.length; i+=1 ) { // can't cache ractive._deps.length, it may change
		notifyDependantsByPriority( ractive, keypath, i, onlyDirect );
	}
};
notifyDependantsByPriority = function ( ractive, keypath, priority, onlyDirect ) {
	var depsByKeypath, deps, i, childDeps;

	depsByKeypath = ractive._deps[ priority ];

	if ( !depsByKeypath ) {
		return;
	}

	deps = depsByKeypath[ keypath ];

	if ( deps ) {
		i = deps.length;
		while ( i-- ) {
			deps[i].update();
		}
	}

	// If we're only notifying direct dependants, not dependants
	// of downstream keypaths, then YOU SHALL NOT PASS
	if ( onlyDirect ) {
		return;
	}
	

	// cascade
	childDeps = ractive._depsMap[ keypath ];
	
	if ( childDeps ) {
		i = childDeps.length;
		while ( i-- ) {
			notifyDependantsByPriority( ractive, childDeps[i], priority );
		}
	}
};
notifyMultipleDependants = function ( ractive, keypaths, onlyDirect ) {
	var  i, j, len;

	len = keypaths.length;

	for ( i=0; i<ractive._deps.length; i+=1 ) {
		if ( ractive._deps[i] ) {
			j = len;
			while ( j-- ) {
				notifyDependantsByPriority( ractive, keypaths[j], i, onlyDirect );
			}
		}
	}
};
processDeferredUpdates = function ( ractive ) {
	var evaluator, attribute, keypath;

	while ( ractive._defEvals.length ) {
		 evaluator = ractive._defEvals.pop();
		 evaluator.update().deferred = false;
	}

	while ( ractive._defAttrs.length ) {
		attribute = ractive._defAttrs.pop();
		attribute.update().deferred = false;
	}

	while ( ractive._defSelectValues.length ) {
		ractive._defSelectValues.pop().deferredUpdate();
	}

	while ( ractive._defCheckboxes.length ) {
		keypath = ractive._defCheckboxes.pop();
		ractive.set( keypath, getValueFromCheckboxes( ractive, keypath ) );
	}

	while ( ractive._defRadios.length ) {
		ractive._defRadios.pop().update();
	}

	while ( ractive._defObservers.length ) {
		ractive._defObservers.pop().update( true );
	}
};
registerDependant = function ( dependant ) {
	var depsByKeypath, deps, keys, parentKeypath, map, ractive, keypath, priority, evaluator;

	ractive = dependant.root;
	keypath = dependant.keypath;
	priority = dependant.priority;

	depsByKeypath = ractive._deps[ priority ] || ( ractive._deps[ priority ] = {} );
	deps = depsByKeypath[ keypath ] || ( depsByKeypath[ keypath ] = [] );

	deps[ deps.length ] = dependant;

	// If this keypath is an evaluator, note the dependency. If the evaluator didn't
	// previously exist, or it used to have dependants, then didn't, and now does again,
	// we can wake it up
	if ( evaluator = ractive._evaluators[ keypath ] ) {
		if ( !evaluator.dependants ) {
			evaluator.wake();
		}

		evaluator.dependants += 1;
	}

	// update dependants map
	keys = keypath.split( '.' );
	
	while ( keys.length ) {
		keys.pop();
		parentKeypath = keys.join( '.' );
	
		map = ractive._depsMap[ parentKeypath ] || ( ractive._depsMap[ parentKeypath ] = [] );

		if ( map[ keypath ] === undefined ) {
			map[ keypath ] = 0;
			map[ map.length ] = keypath;
		}

		map[ keypath ] += 1;

		keypath = parentKeypath;
	}
};
// Render instance to element specified here or at initialization
render = function ( ractive, options ) {
	var el, transitionManager;

	el = ( options.el ? getEl( options.el ) : ractive.el );

	// Clear the element, unless `append` is `true`
	if ( el && !options.append ) {
		el.innerHTML = '';
	}

	ractive._transitionManager = transitionManager = makeTransitionManager( ractive, options.complete );

	// Render our *root fragment*
	ractive.fragment = new DomFragment({
		descriptor: ractive.template,
		root: ractive,
		owner: ractive, // saves doing `if ( ractive.parent ) { /*...*/ }` later on
		parentNode: el
	});

	processDeferredUpdates( ractive );

	if ( el ) {
		el.appendChild( ractive.fragment.docFrag );
	}

	// transition manager has finished its work
	ractive._transitionManager = null;
	transitionManager.ready();

	ractive.rendered = true;
};
// Resolve a full keypath from `ref` within the given `contextStack` (e.g.
// `'bar.baz'` within the context stack `['foo']` might resolve to `'foo.bar.baz'`
resolveRef = function ( ractive, ref, contextStack ) {

	var keys, lastKey, contextKeys, innerMostContext, postfix, parentKeypath, parentValue, wrapped, keypath, context, ancestorErrorMessage;

	ancestorErrorMessage = 'Could not resolve reference - too many "../" prefixes';

	// Implicit iterators - i.e. {{.}} - are a special case
	if ( ref === '.' ) {
		if ( !contextStack.length ) {
			return '';
		}

		return contextStack[ contextStack.length - 1 ];
	}

	// If a reference begins with '.', it's either a restricted reference or
	// an ancestor reference...
	if ( ref.charAt( 0 ) === '.' ) {
		
		// ...either way we need to get the innermost context
		context = contextStack[ contextStack.length - 1 ];
		contextKeys = context ? context.split( '.' ) : [];

		// ancestor references (starting "../") go up the tree
		if ( ref.substr( 0, 3 ) === '../' ) {
			while ( ref.substr( 0, 3 ) === '../' ) {
				if ( !contextKeys.length ) {
					throw new Error( ancestorErrorMessage );
				}

				contextKeys.pop();
				ref = ref.substring( 3 );
			}

			contextKeys.push( ref );
			return contextKeys.join( '.' );
		}

		// not an ancestor reference - must be a restricted reference (prepended with ".")
		if ( !context ) {
			return ref.substring( 1 );
		}
		
		return context + ref;
	}

	keys = ref.split( '.' );
	lastKey = keys.pop();
	postfix = keys.length ? '.' + keys.join( '.' ) : '';

	// Clone the context stack, so we don't mutate the original
	contextStack = contextStack.concat();

	// Take each context from the stack, working backwards from the innermost context
	while ( contextStack.length ) {

		innerMostContext = contextStack.pop();
		parentKeypath = innerMostContext + postfix;

		parentValue = ractive.get( parentKeypath );

		if ( wrapped = ractive._wrapped[ parentKeypath ] ) {
			parentValue = wrapped.get();
		}

		if ( typeof parentValue === 'object' && parentValue !== null && hasOwn.call( parentValue, lastKey ) ) {
			keypath = innerMostContext + '.' + ref;
			break;
		}
	}

	if ( !keypath && ractive.get( ref ) !== undefined ) {
		keypath = ref;
	}

	return keypath;
};
teardown = function ( thing ) {
	if ( !thing.keypath ) {
		// this was on the 'unresolved' list, we need to remove it
		var index = thing.root._pendingResolution.indexOf( thing );

		if ( index !== -1 ) {
			thing.root._pendingResolution.splice( index, 1 );
		}

	} else {
		// this was registered as a dependant
		unregisterDependant( thing );
	}
};
unregisterDependant = function ( dependant ) {
	var deps, keys, parentKeypath, map, ractive, keypath, priority, evaluator;

	ractive = dependant.root;
	keypath = dependant.keypath;
	priority = dependant.priority;

	deps = ractive._deps[ priority ][ keypath ];
	deps.splice( deps.indexOf( dependant ), 1 );

	// update dependants map
	keys = keypath.split( '.' );

	// If this keypath is an evaluator, decrement its dependants property.
	// That way, if an evaluator doesn't have any remaining dependants (temporarily
	// or permanently) we can put it to sleep, preventing unnecessary work
	if ( evaluator = ractive._evaluators[ keypath ] ) {
		evaluator.dependants -= 1;
		
		if ( !evaluator.dependants ) {
			evaluator.sleep();
		}
	}
	
	while ( keys.length ) {
		keys.pop();
		parentKeypath = keys.join( '.' );
	
		map = ractive._depsMap[ parentKeypath ];

		map[ keypath ] -= 1;

		if ( !map[ keypath ] ) {
			// remove from parent deps map
			map.splice( map.indexOf( keypath ), 1 );
			map[ keypath ] = undefined;
		}

		keypath = parentKeypath;
	}
};
proto.link = function ( keypath ) {
	var self = this;

	return function ( value ) {
		self.set( keypath, value );
	};
};
(function ( proto ) {

	var observe, Observer;

	proto.observe = function ( keypath, callback, options ) {

		var observers = [], k;

		if ( typeof keypath === 'object' ) {
			options = callback;

			for ( k in keypath ) {
				if ( hasOwn.call( keypath, k ) ) {
					callback = keypath[k];
					observers[ observers.length ] = observe( this, k, callback, options );
				}
			}

			return {
				cancel: function () {
					while ( observers.length ) {
						observers.pop().cancel();
					}
				}
			};
		}

		return observe( this, keypath, callback, options );
	};

	observe = function ( root, keypath, callback, options ) {
		var observer;

		observer = new Observer( root, keypath, callback, options );

		if ( !options || options.init !== false ) {
			observer.update();
		}

		observer.ready = true;
		registerDependant( observer );

		return {
			cancel: function () {
				unregisterDependant( observer );
			}
		};
	};

	Observer = function ( root, keypath, callback, options ) {
		this.root = root;
		this.keypath = keypath;
		this.callback = callback;
		this.defer = options.defer;
		
		// Observers are notified before any DOM changes take place (though
		// they can defer execution until afterwards)
		this.priority = 0;

		// default to root as context, but allow it to be overridden
		this.context = ( options && options.context ? options.context : root );
	};

	Observer.prototype = {
		update: function ( deferred ) {
			var value;

			if ( this.defer && !deferred && this.ready ) {
				this.root._defObservers.push( this );
				return;
			}

			// Prevent infinite loops
			if ( this.updating ) {
				return;
			}

			this.updating = true;

			// TODO create, and use, an internal get method instead - we can skip checks
			value = this.root.get( this.keypath, true );

			if ( !isEqual( value, this.value ) || !this.ready ) {
				// wrap the callback in a try-catch block, and only throw error in
				// debug mode
				try {
					this.callback.call( this.context, value, this.value );
				} catch ( err ) {
					if ( this.root.debug ) {
						throw err;
					}
				}
				this.value = value;
			}

			this.updating = false;
		}
	};

}( proto ));


proto.off = function ( eventName, callback ) {
	var subscribers, index;

	// if no callback specified, remove all callbacks
	if ( !callback ) {
		// if no event name specified, remove all callbacks for all events
		if ( !eventName ) {
			this._subs = {};
		} else {
			this._subs[ eventName ] = [];
		}
	}

	subscribers = this._subs[ eventName ];

	if ( subscribers ) {
		index = subscribers.indexOf( callback );
		if ( index !== -1 ) {
			subscribers.splice( index, 1 );
		}
	}
};
proto.on = function ( eventName, callback ) {
	var self = this, listeners, n;

	// allow mutliple listeners to be bound in one go
	if ( typeof eventName === 'object' ) {
		listeners = [];

		for ( n in eventName ) {
			if ( hasOwn.call( eventName, n ) ) {
				listeners[ listeners.length ] = this.on( n, eventName[ n ] );
			}
		}

		return {
			cancel: function () {
				while ( listeners.length ) {
					listeners.pop().cancel();
				}
			}
		};
	}

	if ( !this._subs[ eventName ] ) {
		this._subs[ eventName ] = [ callback ];
	} else {
		this._subs[ eventName ].push( callback );
	}

	return {
		cancel: function () {
			self.off( eventName, callback );
		}
	};
};
proto.renderHTML = function () {
	return this.fragment.toString();
};
proto.requestFullscreen = function () {
	Ractive.requestFullscreen( this.el );
};
proto.reset = function ( data, complete ) {
	var transitionManager, previousTransitionManager;

	if ( typeof data === 'function' ) {
		complete = data;
		data = {};
	}

	if ( data !== undefined && typeof data !== 'object' ) {
		throw new Error( 'The reset method takes either no arguments, or an object containing new data' );
	}

	// Manage transitions
	previousTransitionManager = this._transitionManager;
	this._transitionManager = transitionManager = makeTransitionManager( this, complete );

	this.data = data || {};

	// Attempt to resolve any unresolved keypaths...
	if ( this._pendingResolution.length ) {
		attemptKeypathResolution( this );
	}

	clearCache( this, '' );
	notifyDependants( this, '' );

	this.fire( 'reset', data );

	// transition manager has finished its work
	this._transitionManager = previousTransitionManager;
	transitionManager.ready();
};
(function ( proto ) {

	var set, getUpstreamChanges, resetWrapped;

	proto.set = function ( keypath, value, complete ) {
		var map, changes, upstreamChanges, previousTransitionManager, transitionManager, i, changeHash;

		changes = [];

		if ( isObject( keypath ) ) {
			map = keypath;
			complete = value;
		}

		// Set multiple keypaths in one go
		if ( map ) {
			for ( keypath in map ) {
				if ( hasOwn.call( map, keypath) ) {
					value = map[ keypath ];
					keypath = normaliseKeypath( keypath );

					set( this, keypath, value, changes );
				}
			}
		}

		// Set a single keypath
		else {
			keypath = normaliseKeypath( keypath );
			set( this, keypath, value, changes );
		}

		if ( !changes.length ) {
			return;
		}

		// Manage transitions
		previousTransitionManager = this._transitionManager;
		this._transitionManager = transitionManager = makeTransitionManager( this, complete );

		// ...and notify dependants
		upstreamChanges = getUpstreamChanges( changes );
		if ( upstreamChanges.length ) {
			notifyMultipleDependants( this, upstreamChanges, true );
		}

		notifyMultipleDependants( this, changes );

		// Attempt to resolve any unresolved keypaths...
		if ( this._pendingResolution.length ) {
			attemptKeypathResolution( this );
		}

		// Attributes don't reflect changes automatically if there is a possibility
		// that they will need to change again before the .set() cycle is complete
		// - they defer their updates until all values have been set
		processDeferredUpdates( this );

		// transition manager has finished its work
		this._transitionManager = previousTransitionManager;
		transitionManager.ready();

		// Fire a change event
		if ( !this.firingChangeEvent ) {
			this.firingChangeEvent = true; // short-circuit any potential infinite loops
			
			changeHash = {};

			i = changes.length;
			while ( i-- ) {
				changeHash[ changes[i] ] = this.get( changes[i] );
			}

			this.fire( 'change', changeHash );

			this.firingChangeEvent = false;
		}

		return this;
	};


	set = function ( ractive, keypath, value, changes ) {
		var cached, keys, previous, key, obj, accumulated, currentKeypath, keypathToClear, wrapped;

		if ( ( wrapped = ractive._wrapped[ keypath ] ) && wrapped.reset ) {
			if ( resetWrapped( ractive, keypath, value, wrapped, changes ) !== false ) {
				return;
			}
		}

		cached = ractive._cache[ keypath ];
		previous = ractive.get( keypath );

		keys = keypath.split( '.' );
		accumulated = [];

		// update the model, if necessary
		if ( previous !== value ) {
			
			// Get the root object
			if ( wrapped = ractive._wrapped[ '' ] ) {
				if ( wrapped.set ) {
					// Root object is wrapped, so we need to use the wrapper's
					// set() method
					wrapped.set( keys.join( '.' ), value );
				}

				obj = wrapped.get();
			} else {
				obj = ractive.data;
			}

			
			while ( keys.length > 1 ) {
				key = accumulated[ accumulated.length ] = keys.shift();
				currentKeypath = accumulated.join( '.' );

				if ( wrapped = ractive._wrapped[ currentKeypath ] ) {
					if ( wrapped.set ) {
						wrapped.set( keys.join( '.' ), value );
					}

					obj = wrapped.get();
				}

				else {
					// If this branch doesn't exist yet, create a new one - if the next
					// key matches /^\s*[0-9]+\s*$/, assume we want an array branch rather
					// than an object
					if ( !obj[ key ] ) {
						
						// if we're creating a new branch, we may need to clear the upstream
						// keypath
						if ( !keypathToClear ) {
							keypathToClear = currentKeypath;
						}

						obj[ key ] = ( /^\s*[0-9]+\s*$/.test( keys[0] ) ? [] : {} );
					}

					obj = obj[ key ];
				}
			}

			key = keys[0];
			obj[ key ] = value;
		}

		else {
			// if the value is the same as the cached value AND the value is a primitive,
			// we don't need to do anything else
			if ( value === cached && typeof value !== 'object' ) {
				return;
			}
		}


		// Clear cache
		clearCache( ractive, keypathToClear || keypath );

		// add this keypath to the list of changes
		changes[ changes.length ] = keypath;
	};

	getUpstreamChanges = function ( changes ) {
		var upstreamChanges = [ '' ], i, keypath, keys, upstreamKeypath;

		i = changes.length;
		while ( i-- ) {
			keypath = changes[i];
			keys = keypath.split( '.' );

			while ( keys.length > 1 ) {
				keys.pop();
				upstreamKeypath = keys.join( '.' );

				if ( !upstreamChanges[ upstreamKeypath ] ) {
					upstreamChanges[ upstreamChanges.length ] = upstreamKeypath;
					upstreamChanges[ upstreamKeypath ] = true;
				}
			}
		}

		return upstreamChanges;
	};


	resetWrapped = function ( ractive, keypath, value, wrapped, changes ) {
		var previous, cached, cacheMap, i;

		previous = wrapped.get();

		if ( !isEqual( previous, value ) ) {
			if ( wrapped.reset( value ) === false ) {
				return false;
			}
		}

		value = wrapped.get();
		cached = ractive._cache[ keypath ];

		if ( !isEqual( cached, value ) ) {
			ractive._cache[ keypath ] = value;

			// Clear downstream keypaths only. Otherwise this wrapper will be torn down!
			// TODO is there a way to intelligently detect whether a wrapper should be
			// torn down?
			cacheMap = ractive._cacheMap[ keypath ];

			if ( cacheMap ) {
				i = cacheMap.length;
				while ( i-- ) {
					clearCache( ractive, cacheMap[i] );
				}
			}

			changes[ changes.length ] = keypath;
		}
	};

}( proto ));
// Teardown. This goes through the root fragment and all its children, removing observers
// and generally cleaning up after itself
proto.teardown = function ( complete ) {
	var keypath, transitionManager, previousTransitionManager;

	this.fire( 'teardown' );

	previousTransitionManager = this._transitionManager;
	this._transitionManager = transitionManager = makeTransitionManager( this, complete );

	this.fragment.teardown( true );

	// Cancel any animations in progress
	while ( this._animations[0] ) {
		this._animations[0].stop(); // it will remove itself from the index
	}

	// Clear cache - this has the side-effect of unregistering keypaths from modified arrays.
	for ( keypath in this._cache ) {
		clearCache( this, keypath );
	}

	// transition manager has finished its work
	this._transitionManager = previousTransitionManager;
	transitionManager.ready();
};
proto.toggleFullscreen = function () {
	if ( Ractive.isFullscreen( this.el ) ) {
		this.cancelFullscreen();
	} else {
		this.requestFullscreen();
	}
};
proto.update = function ( keypath, complete ) {
	var transitionManager, previousTransitionManager;

	if ( typeof keypath === 'function' ) {
		complete = keypath;
		keypath = '';
	}

	// if we're using update, it's possible that we've introduced new values, and
	// some unresolved references can be dealt with
	attemptKeypathResolution( this );

	// manage transitions
	previousTransitionManager = this._transitionManager;
	this._transitionManager = transitionManager = makeTransitionManager( this, complete );

	clearCache( this, keypath || '' );
	notifyDependants( this, keypath || '' );

	processDeferredUpdates( this );

	// transition manager has finished its work
	this._transitionManager = previousTransitionManager;
	transitionManager.ready();

	if ( typeof keypath === 'string' ) {
		this.fire( 'update', keypath );
	} else {
		this.fire( 'update' );
	}

	return this;
};
(function ( proto ) {

	var consolidateChangedValues;

	proto.updateModel = function ( keypath, cascade ) {
		var values, deferredCheckboxes, i;

		if ( typeof keypath !== 'string' ) {
			keypath = '';
			cascade = true;
		}

		consolidateChangedValues( this, keypath, values = {}, deferredCheckboxes = [], cascade );

		if ( i = deferredCheckboxes.length ) {
			while ( i-- ) {
				keypath = deferredCheckboxes[i];
				values[ keypath ] = getValueFromCheckboxes( this, keypath );
			}
		}

		this.set( values );
	};

	consolidateChangedValues = function ( ractive, keypath, values, deferredCheckboxes, cascade ) {
		var bindings, childDeps, i, binding, oldValue, newValue;

		bindings = ractive._twowayBindings[ keypath ];

		if ( bindings ) {
			i = bindings.length;
			while ( i-- ) {
				binding = bindings[i];

				// special case - radio name bindings
				if ( binding.radioName && !binding.node.checked ) {
					continue;
				}

				// special case - checkbox name bindings
				if ( binding.checkboxName ) {
					if ( binding.changed() && !deferredCheckboxes[ keypath ] ) {
						// we will need to see which checkboxes with the same name are checked,
						// but we only want to do so once
						deferredCheckboxes[ keypath ] = true; // for quick lookup without indexOf
						deferredCheckboxes[ deferredCheckboxes.length ] = keypath;
					}
					
					continue;
				}

				oldValue = binding.attr.value;
				newValue = binding.value();

				if ( arrayContentsMatch( oldValue, newValue ) ) {
					continue;
				}

				if ( !isEqual( oldValue, newValue ) ) {
					values[ keypath ] = newValue;
				}
			}
		}

		if ( !cascade ) {
			return;
		}

		// cascade
		childDeps = ractive._depsMap[ keypath ];
		
		if ( childDeps ) {
			i = childDeps.length;
			while ( i-- ) {
				consolidateChangedValues( ractive, childDeps[i], values, deferredCheckboxes, cascade );
			}
		}
	};

}( proto ));
(function () {

	var notifyArrayDependants,

		ArrayWrapper,
		wrapArray,
		unwrapArray,
		WrappedArrayProto,
		testObj,
		mutatorMethods;

	// TODO use the wrapper properly, i.e. having a list of wrappers on each array, rather than
	// a set of ractives and keypaths

	adaptors.array = {
		filter: function ( ractive, object, keypath ) {
			// wrap the array if a) it's not generated by an evaluator, b) it's an array, and
			// c) either it hasn't been wrapped already, or the array didn't trigger the get() itself
			return ( keypath.charAt( 0 ) !== '(' ) && isArray( object ) && ( !object._ractive || !object._ractive.setting );
		},
		wrap: function ( ractive, array, keypath ) {
			return new ArrayWrapper( ractive, array, keypath );
		}
	};

	ArrayWrapper = function ( ractive, array, keypath ) {
		this.root = ractive;
		this.value = array;
		this.keypath = keypath;

		registerKeypathToArray( array, keypath, ractive );
	};

	ArrayWrapper.prototype = {
		get: function () {
			return this.value;
		},
		teardown: function () {
			// if teardown() was invoked because we're clearing the cache as a result of
			// a change that the array itself triggered, we can save ourselves the teardown
			// and immediate setup
			if ( this.value._ractive.setting ) {
				return false; // so that we don't remove it from this.root._wrapped
			}

			unregisterKeypathFromArray( this.value, this.keypath, this.root );
		}
	};





	// Register a keypath to this array. When any of this array's mutator methods are called,
	// it will `set` that keypath on the given Ractive instance
	registerKeypathToArray = function ( array, keypath, root ) {
		var roots, keypathsByGuid, keypaths;

		// If this array hasn't been wrapped, we need to wrap it
		if ( !array._ractive ) {
			defineProperty( array, '_ractive', {
				value: {
					roots: [ root ], // there may be more than one Ractive instance depending on this
					keypathsByGuid: {}
				},
				configurable: true
			});

			array._ractive.keypathsByGuid[ root._guid ] = [ keypath ];

			wrapArray( array );
		}

		else {
			roots = array._ractive.roots;
			keypathsByGuid = array._ractive.keypathsByGuid;

			// Does this Ractive instance currently depend on this array?
			// If not, associate them
			if ( !keypathsByGuid[ root._guid ] ) {
				roots[ roots.length ] = root;
				keypathsByGuid[ root._guid ] = [];
			}

			keypaths = keypathsByGuid[ root._guid ];

			// If the current keypath isn't among them, add it
			if ( keypaths.indexOf( keypath ) === -1 ) {
				keypaths[ keypaths.length ] = keypath;
			}
		}
	};


	// Unregister keypath from array
	unregisterKeypathFromArray = function ( array, keypath, root ) {
		var roots, keypathsByGuid, keypaths, keypathIndex;

		if ( !array._ractive ) {
			throw new Error( 'Attempted to remove keypath from non-wrapped array. This error is unexpected - please send a bug report to @rich_harris' );
		}

		roots = array._ractive.roots;
		keypathsByGuid = array._ractive.keypathsByGuid;

		if ( !keypathsByGuid[ root._guid ] ) {
			throw new Error( 'Ractive instance was not listed as a dependent of this array. This error is unexpected - please send a bug report to @rich_harris' );
		}

		keypaths = keypathsByGuid[ root._guid ];
		keypathIndex = keypaths.indexOf( keypath );

		if ( keypathIndex === -1 ) {
			throw new Error( 'Attempted to unlink non-linked keypath from array. This error is unexpected - please send a bug report to @rich_harris' );
		}

		keypaths.splice( keypathIndex, 1 );

		if ( !keypaths.length ) {
			roots.splice( roots.indexOf( root ), 1 );
			keypathsByGuid[ root._guid ] = null;
		}

		if ( !roots.length ) {
			unwrapArray( array ); // It's good to clean up after ourselves
		}
	};


	notifyArrayDependants = function ( array, methodName, args ) {
		var processRoots,
			processRoot,
			processKeypaths,
			processKeypath,
			queueDependants,
			keypathsByGuid;

		keypathsByGuid = array._ractive.keypathsByGuid;

		processRoots = function ( roots ) {
			var i = roots.length;
			while ( i-- ) {
				processRoot( roots[i] );
			}
		};

		processRoot = function ( root ) {
			var previousTransitionManager = root._transitionManager, transitionManager;

			root._transitionManager = transitionManager = makeTransitionManager( root, noop );
			processKeypaths( root, keypathsByGuid[ root._guid ] );
			root._transitionManager = previousTransitionManager;

			transitionManager.ready();
		};

		processKeypaths = function ( root, keypaths ) {
			var i = keypaths.length;
			while ( i-- ) {
				processKeypath( root, keypaths[i] );
			}
		};

		processKeypath = function ( root, keypath ) {
			var depsByKeypath, deps, keys, upstreamQueue, smartUpdateQueue, dumbUpdateQueue, i, changed, start, end, childKeypath, lengthUnchanged;

			// If this is a sort or reverse, we just do root.set()...
			if ( methodName === 'sort' || methodName === 'reverse' ) {
				root.set( keypath, array );
				return;
			}

			// otherwise we do a smart update whereby elements are added/removed
			// in the right place. But we do need to clear the cache
			clearCache( root, keypath );

			// find dependants. If any are DOM sections, we do a smart update
			// rather than a ractive.set() blunderbuss
			smartUpdateQueue = [];
			dumbUpdateQueue = [];

			for ( i=0; i<root._deps.length; i+=1 ) { // we can't cache root._deps.length as it may change!
				depsByKeypath = root._deps[i];

				if ( !depsByKeypath ) {
					continue;
				}

				deps = depsByKeypath[ keypath ];
				
				if ( deps ) {
					queueDependants( root, keypath, deps, smartUpdateQueue, dumbUpdateQueue );

					// we may have some deferred evaluators to process
					processDeferredUpdates( root );

					while ( smartUpdateQueue.length ) {
						smartUpdateQueue.pop().smartUpdate( methodName, args );
					}

					while ( dumbUpdateQueue.length ) {
						dumbUpdateQueue.pop().update();
					}
				}
			}

			// if we're removing old items and adding new ones, simultaneously, we need to force an update
			if ( methodName === 'splice' && ( args.length > 2 ) && args[1] ) {
				changed = Math.min( args[1], args.length - 2 );
				start = args[0];
				end = start + changed;

				if ( args[1] === ( args.length - 2 ) ) {
					lengthUnchanged = true;
				}

				for ( i=start; i<end; i+=1 ) {
					childKeypath = keypath + '.' + i;
					notifyDependants( root, childKeypath );
				}
			}

			// we may have some deferred attributes to process
			processDeferredUpdates( root );

			// Finally, notify direct dependants of upstream keypaths...
			upstreamQueue = [];

			keys = keypath.split( '.' );
			while ( keys.length ) {
				keys.pop();
				upstreamQueue[ upstreamQueue.length ] = keys.join( '.' );
			}

			notifyMultipleDependants( root, upstreamQueue, true );

			// length property has changed - notify dependants
			// TODO in some cases (e.g. todo list example, when marking all as complete, then
			// adding a new item (which should deactivate the 'all complete' checkbox
			// but doesn't) this needs to happen before other updates. But doing so causes
			// other mental problems. not sure what's going on...
			if ( !lengthUnchanged ) {
				notifyDependants( root, keypath + '.length', true );
			}
		};

		// TODO can we get rid of this whole queueing nonsense?
		queueDependants = function ( root, keypath, deps, smartUpdateQueue, dumbUpdateQueue ) {
			var k, dependant;

			k = deps.length;
			while ( k-- ) {
				dependant = deps[k];

				// references need to get processed before mustaches
				if ( dependant.type === REFERENCE ) {
					dependant.update();
					//dumbUpdateQueue[ dumbUpdateQueue.length ] = dependant;
				}

				// is this a DOM section?
				else if ( dependant.keypath === keypath && dependant.type === SECTION && dependant.parentNode ) {
					smartUpdateQueue[ smartUpdateQueue.length ] = dependant;

				} else {
					dumbUpdateQueue[ dumbUpdateQueue.length ] = dependant;
				}
			}
		};

		processRoots( array._ractive.roots );
	};





		
	WrappedArrayProto = [];
	mutatorMethods = [ 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift' ];

	mutatorMethods.forEach( function ( methodName ) {
		var method = function () {
			var result = Array.prototype[ methodName ].apply( this, arguments );

			this._ractive.setting = true;
			notifyArrayDependants( this, methodName, arguments );
			this._ractive.setting = false;

			return result;
		};

		defineProperty( WrappedArrayProto, methodName, {
			value: method
		});
	});

	
	// can we use prototype chain injection?
	// http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/#wrappers_prototype_chain_injection
	testObj = {};
	if ( testObj.__proto__ ) {
		// yes, we can
		wrapArray = function ( array ) {
			array.__proto__ = WrappedArrayProto;
		};

		unwrapArray = function ( array ) {
			delete array._ractive;
			array.__proto__ = Array.prototype;
		};
	}

	else {
		// no, we can't
		wrapArray = function ( array ) {
			var i, methodName;

			i = mutatorMethods.length;
			while ( i-- ) {
				methodName = mutatorMethods[i];
				defineProperty( array, methodName, {
					value: WrappedArrayProto[ methodName ],
					configurable: true
				});
			}
		};

		unwrapArray = function ( array ) {
			var i;

			i = mutatorMethods.length;
			while ( i-- ) {
				delete array[ mutatorMethods[i] ];
			}

			delete array._ractive;
		};
	}

}());
(function () {

	var MagicWrapper;

	adaptors.magic = {
		wrap: function ( ractive, object, keypath ) {
			return new MagicWrapper( ractive, object, keypath );
		}
	};

	MagicWrapper = function ( ractive, object, keypath ) {
		var wrapper = this, keys, prop, objKeypath, descriptor, wrappers, oldGet, oldSet, get, set;

		this.ractive = ractive;
		this.keypath = keypath;

		keys = keypath.split( '.' );
		
		this.prop = keys.pop();
		
		objKeypath = keys.join( '.' );
		this.obj = ractive.get( objKeypath );

		descriptor = this.originalDescriptor = Object.getOwnPropertyDescriptor( this.obj, this.prop );

		// Has this property already been wrapped?
		if ( descriptor && descriptor.set && ( wrappers = descriptor.set._ractiveWrappers ) ) {
		
			// Yes. Register this wrapper to this property, if it hasn't been already
			if ( wrappers.indexOf( this ) === -1 ) {
				wrappers[ wrappers.length ] = this;
			}

			return; // already wrapped
		}


		// No, it hasn't been wrapped. Is this descriptor configurable?
		if ( descriptor && !descriptor.configurable ) {
			throw new Error( 'Cannot use magic mode with property "' + prop + '" - object is not configurable' );
		}


		// Time to wrap this property
		if ( descriptor ) {
			this.value = descriptor.value;

			oldGet = descriptor.get;
			oldSet = descriptor.set;
		}
		
		get = oldGet || function () {
			return wrapper.value; // whichever wrapper got there first!
		};

		set = function ( value ) {
			var wrappers, wrapper, i;

			if ( oldSet ) {
				oldSet( value );
			}

			wrappers = set._ractiveWrappers;

			i = wrappers.length;
			while ( i-- ) {
				wrapper = wrappers[i];
				
				if ( !wrapper.resetting ) {
					wrapper.ractive.set( wrapper.keypath, value );
				}
			}
		};

		// Create an array of wrappers, in case other keypaths/ractives depend on this property.
		// Handily, we can store them as a property of the set function. Yay JavaScript.
		set._ractiveWrappers = [ this ];

		Object.defineProperty( this.obj, this.prop, { get: get, set: set, enumerable: true, configurable: true });
	};

	MagicWrapper.prototype = {
		get: function () {
			return this.value;
		},
		reset: function ( value ) {
			this.resetting = true;
			this.value = value;
			this.obj[ this.prop ] = value;
			this.resetting = false;
		},
		teardown: function () {
			var descriptor, set, value, wrappers;

			descriptor = Object.getOwnPropertyDescriptor( this.obj, this.prop );
			set = descriptor.set;
			wrappers = set._ractiveWrappers;

			wrappers.splice( wrappers.indexOf( this ), 1 );

			// Last one out, turn off the lights
			if ( !wrappers.length ) {
				value = this.obj[ this.prop ];

				Object.defineProperty( this.obj, this.prop, this.originalDescriptor );
				this.obj[ this.prop ] = value;
			}
		}
	};

}());
// These are a subset of the easing equations found at
// https://raw.github.com/danro/easing-js - license info
// follows:

// --------------------------------------------------
// easing.js v0.5.4
// Generic set of easing functions with AMD support
// https://github.com/danro/easing-js
// This code may be freely distributed under the MIT license
// http://danro.mit-license.org/
// --------------------------------------------------
// All functions adapted from Thomas Fuchs & Jeremy Kahn
// Easing Equations (c) 2003 Robert Penner, BSD license
// https://raw.github.com/danro/easing-js/master/LICENSE
// --------------------------------------------------

// In that library, the functions named easeIn, easeOut, and
// easeInOut below are named easeInCubic, easeOutCubic, and
// (you guessed it) easeInOutCubic.
//
// You can add additional easing functions to this list, and they
// will be globally available.

easing = {
	linear: function ( pos ) { return pos; },
	easeIn: function ( pos ) { return Math.pow( pos, 3 ); },
	easeOut: function ( pos ) { return ( Math.pow( ( pos - 1 ), 3 ) + 1 ); },
	easeInOut: function ( pos ) {
		if ( ( pos /= 0.5 ) < 1 ) { return ( 0.5 * Math.pow( pos, 3 ) ); }
		return ( 0.5 * ( Math.pow( ( pos - 2 ), 3 ) + 2 ) );
	}
};
eventDefinitions.hover = function ( node, fire ) {
	var mouseoverHandler, mouseoutHandler;

	mouseoverHandler = function ( event ) {
		if ( node.contains( event.relatedTarget ) ) {
			return;
		}

		fire({
			node: node,
			original: event,
			hover: true
		});
	};

	mouseoutHandler = function ( event ) {
		if ( node.contains( event.relatedTarget ) ) {
			return;
		}
		
		fire({
			node: node,
			original: event,
			hover: false
		});
	};

	node.addEventListener( 'mouseover', mouseoverHandler, false );
	node.addEventListener( 'mouseout', mouseoutHandler, false );

	return {
		teardown: function () {
			node.removeEventListener( 'mouseover', mouseoverHandler, false );
			node.removeEventListener( 'mouseout', mouseoutHandler, false );
		}
	};
};
(function () {

	var makeKeyDefinition = function ( code ) {
		return function ( node, fire ) {
			var keydownHandler;

			node.addEventListener( 'keydown', keydownHandler = function ( event ) {
				var which = event.which || event.keyCode;

				if ( which === code ) {
					event.preventDefault();

					fire({
						node: node,
						original: event
					});
				}
			}, false );

			return {
				teardown: function () {
					node.removeEventListener( 'keydown', keydownHandler, false );
				}
			};
		};
	};

	eventDefinitions.enter = makeKeyDefinition( 13 );
	eventDefinitions.tab = makeKeyDefinition( 9 );
	eventDefinitions.escape = makeKeyDefinition( 27 );
	eventDefinitions.space = makeKeyDefinition( 32 );

	eventDefinitions.leftarrow = makeKeyDefinition( 37 );
	eventDefinitions.rightarrow = makeKeyDefinition( 39 );
	eventDefinitions.downarrow = makeKeyDefinition( 40 );
	eventDefinitions.uparrow = makeKeyDefinition( 38 );

}());
eventDefinitions.tap = function ( node, fire ) {
	var mousedown, touchstart, focusHandler, distanceThreshold, timeThreshold;

	distanceThreshold = 5; // maximum pixels pointer can move before cancel
	timeThreshold = 400;   // maximum milliseconds between down and up before cancel

	mousedown = function ( event ) {
		var currentTarget, x, y, pointerId, up, move, cancel;

		if ( event.which !== undefined && event.which !== 1 ) {
			return;
		}

		x = event.clientX;
		y = event.clientY;
		currentTarget = this;
		// This will be null for mouse events.
		pointerId = event.pointerId;

		up = function ( event ) {
			if ( event.pointerId != pointerId ) {
				return;
			}

			fire({
				node: currentTarget,
				original: event
			});

			cancel();
		};

		move = function ( event ) {
			if ( event.pointerId != pointerId ) {
				return;
			}

			if ( ( Math.abs( event.clientX - x ) >= distanceThreshold ) || ( Math.abs( event.clientY - y ) >= distanceThreshold ) ) {
				cancel();
			}
		};

		cancel = function () {
			node.removeEventListener( 'MSPointerUp', up, false );
			doc.removeEventListener( 'MSPointerMove', move, false );
			doc.removeEventListener( 'MSPointerCancel', cancel, false );
			node.removeEventListener( 'pointerup', up, false );
			doc.removeEventListener( 'pointermove', move, false );
			doc.removeEventListener( 'pointercancel', cancel, false );
			node.removeEventListener( 'click', up, false );
			doc.removeEventListener( 'mousemove', move, false );
		};

		if ( window.navigator.pointerEnabled ) {
			node.addEventListener( 'pointerup', up, false );
			doc.addEventListener( 'pointermove', move, false );
			doc.addEventListener( 'pointercancel', cancel, false );
		} else if ( window.navigator.msPointerEnabled ) {
			node.addEventListener( 'MSPointerUp', up, false );
			doc.addEventListener( 'MSPointerMove', move, false );
			doc.addEventListener( 'MSPointerCancel', cancel, false );
		} else {
			node.addEventListener( 'click', up, false );
			doc.addEventListener( 'mousemove', move, false );
		}

		setTimeout( cancel, timeThreshold );
	};

	if ( window.navigator.pointerEnabled ) {
		node.addEventListener( 'pointerdown', mousedown, false );
	} else if ( window.navigator.msPointerEnabled ) {
		node.addEventListener( 'MSPointerDown', mousedown, false );
	} else {
		node.addEventListener( 'mousedown', mousedown, false );
	}


	touchstart = function ( event ) {
		var currentTarget, x, y, touch, finger, move, up, cancel;

		if ( event.touches.length !== 1 ) {
			return;
		}

		touch = event.touches[0];

		x = touch.clientX;
		y = touch.clientY;
		currentTarget = this;

		finger = touch.identifier;

		up = function ( event ) {
			var touch;

			touch = event.changedTouches[0];
			if ( touch.identifier !== finger ) {
				cancel();
			}

			event.preventDefault();  // prevent compatibility mouse event
			fire({
				node: currentTarget,
				original: event
			});
			
			cancel();
		};

		move = function ( event ) {
			var touch;

			if ( event.touches.length !== 1 || event.touches[0].identifier !== finger ) {
				cancel();
			}

			touch = event.touches[0];
			if ( ( Math.abs( touch.clientX - x ) >= distanceThreshold ) || ( Math.abs( touch.clientY - y ) >= distanceThreshold ) ) {
				cancel();
			}
		};

		cancel = function () {
			node.removeEventListener( 'touchend', up, false );
			window.removeEventListener( 'touchmove', move, false );
			window.removeEventListener( 'touchcancel', cancel, false );
		};

		node.addEventListener( 'touchend', up, false );
		window.addEventListener( 'touchmove', move, false );
		window.addEventListener( 'touchcancel', cancel, false );

		setTimeout( cancel, timeThreshold );
	};

	node.addEventListener( 'touchstart', touchstart, false );


	// native buttons, and <input type='button'> elements, should fire a tap event
	// when the space key is pressed
	if ( node.tagName === 'BUTTON' || node.type === 'button' ) {
		focusHandler = function () {
			var blurHandler, keydownHandler;

			keydownHandler = function ( event ) {
				if ( event.which === 32 ) { // space key
					fire({
						node: node,
						original: event
					});
				}
			};

			blurHandler = function () {
				node.removeEventListener( 'keydown', keydownHandler, false );
				node.removeEventListener( 'blur', blurHandler, false );
			};

			node.addEventListener( 'keydown', keydownHandler, false );
			node.addEventListener( 'blur', blurHandler, false );
		};

		node.addEventListener( 'focus', focusHandler, false );
	}


	return {
		teardown: function () {
			node.removeEventListener( 'pointerdown', mousedown, false );
			node.removeEventListener( 'MSPointerDown', mousedown, false );
			node.removeEventListener( 'mousedown', mousedown, false );
			node.removeEventListener( 'touchstart', touchstart, false );
			node.removeEventListener( 'focus', focusHandler, false );
		}
	};
};

(function () {

	var fillGaps,
		clone,
		augment,

		inheritFromParent,
		wrapMethod,
		inheritFromChildProps,
		conditionallyParseTemplate,
		extractInlinePartials,
		conditionallyParsePartials,
		initChildInstance,

		extendable,
		inheritable,
		blacklist;

	extend = function ( childProps ) {

		var Parent = this, Child;

		// create Child constructor
		Child = function ( options ) {
			initChildInstance( this, Child, options || {});
		};

		Child.prototype = create( Parent.prototype );

		// inherit options from parent, if we're extending a subclass
		if ( Parent !== Ractive ) {
			inheritFromParent( Child, Parent );
		}

		// apply childProps
		inheritFromChildProps( Child, childProps );

		// parse template and any partials that need it
		conditionallyParseTemplate( Child );
		extractInlinePartials( Child, childProps );
		conditionallyParsePartials( Child );
		
		Child.extend = Parent.extend;

		return Child;
	};

	extendable = [ 'data', 'partials', 'transitions', 'eventDefinitions', 'components' ];
	inheritable = [ 'el', 'template', 'complete', 'modifyArrays', 'twoway', 'lazy', 'append', 'preserveWhitespace', 'sanitize', 'noIntro', 'transitionsEnabled' ];
	blacklist = extendable.concat( inheritable );

	inheritFromParent = function ( Child, Parent ) {
		extendable.forEach( function ( property ) {
			if ( Parent[ property ] ) {
				Child[ property ] = clone( Parent[ property ] );
			}
		});

		inheritable.forEach( function ( property ) {
			if ( Parent[ property ] !== undefined ) {
				Child[ property ] = Parent[ property ];
			}
		});
	};

	wrapMethod = function ( method, superMethod ) {
		if ( /_super/.test( method ) ) {
			return function () {
				var _super = this._super, result;
				this._super = superMethod;

				result = method.apply( this, arguments );

				this._super = _super;
				return result;
			};
		}

		else {
			return method;
		}
	};

	inheritFromChildProps = function ( Child, childProps ) {
		var key, member;

		extendable.forEach( function ( property ) {
			var value = childProps[ property ];

			if ( value ) {
				if ( Child[ property ] ) {
					augment( Child[ property ], value );
				}

				else {
					Child[ property ] = value;
				}
			}
		});

		inheritable.forEach( function ( property ) {
			if ( childProps[ property ] !== undefined ) {
				Child[ property ] = childProps[ property ];
			}
		});

		// Blacklisted properties don't extend the child, as they are part of the initialisation options
		for ( key in childProps ) {
			if ( hasOwn.call( childProps, key ) && !hasOwn.call( Child.prototype, key ) && blacklist.indexOf( key ) === -1 ) {
				member = childProps[ key ];

				// if this is a method that overwrites a prototype method, we may need
				// to wrap it
				if ( typeof member === 'function' && typeof Child.prototype[ key ] === 'function' ) {
					Child.prototype[ key ] = wrapMethod( member, Child.prototype[ key ] );
				} else {
					Child.prototype[ key ] = member;
				}
			}
		}
	};

	conditionallyParseTemplate = function ( Child ) {
		var templateEl;

		if ( typeof Child.template === 'string' ) {
			if ( !Ractive.parse ) {
				throw new Error( missingParser );
			}

			if ( Child.template.charAt( 0 ) === '#' && doc ) {
				templateEl = doc.getElementById( Child.template.substring( 1 ) );
				if ( templateEl && templateEl.tagName === 'SCRIPT' ) {
					Child.template = Ractive.parse( templateEl.innerHTML, Child );
				} else {
					throw new Error( 'Could not find template element (' + Child.template + ')' );
				}
			} else {
				Child.template = Ractive.parse( Child.template, Child ); // all the relevant options are on Child
			}
		}
	};

	extractInlinePartials = function ( Child, childProps ) {
		// does our template contain inline partials?
		if ( isObject( Child.template ) ) {
			if ( !Child.partials ) {
				Child.partials = {};
			}

			// get those inline partials
			augment( Child.partials, Child.template.partials );

			// but we also need to ensure that any explicit partials override inline ones
			if ( childProps.partials ) {
				augment( Child.partials, childProps.partials );
			}

			// move template to where it belongs
			Child.template = Child.template.main;
		}
	};

	conditionallyParsePartials = function ( Child ) {
		var key, partial;

		// Parse partials, if necessary
		if ( Child.partials ) {
			for ( key in Child.partials ) {
				if ( hasOwn.call( Child.partials, key ) ) {
					if ( typeof Child.partials[ key ] === 'string' ) {
						if ( !Ractive.parse ) {
							throw new Error( missingParser );
						}

						partial = Ractive.parse( Child.partials[ key ], Child );
					} else {
						partial = Child.partials[ key ];
					}

					Child.partials[ key ] = partial;
				}
			}
		}
	};

	initChildInstance = function ( child, Child, options ) {
		
		// Add template to options, if necessary
		if ( !options.template && Child.template ) {
			options.template = Child.template;
		}

		extendable.forEach( function ( property ) {
			if ( !options[ property ] ) {
				if ( Child[ property ] ) {
					options[ property ] = clone( Child[ property ] );
				}
			} else {
				fillGaps( options[ property ], Child[ property ] );
			}
		});
		
		inheritable.forEach( function ( property ) {
			if ( options[ property ] === undefined && Child[ property ] !== undefined ) {
				options[ property ] = Child[ property ];
			}
		});

		if ( child.beforeInit ) {
			child.beforeInit.call( child, options );
		}

		Ractive.call( child, options );

		if ( child.init ) {
			child.init.call( child, options );
		}
	};

	fillGaps = function ( target, source ) {
		var key;

		for ( key in source ) {
			if ( hasOwn.call( source, key ) && !hasOwn.call( target, key ) ) {
				target[ key ] = source[ key ];
			}
		}
	};

	clone = function ( source ) {
		var target = {}, key;

		for ( key in source ) {
			if ( hasOwn.call( source, key ) ) {
				target[ key ] = source[ key ];
			}
		}

		return target;
	};

	augment = function ( target, source ) {
		var key;

		for ( key in source ) {
			if ( hasOwn.call( source, key ) ) {
				target[ key ] = source[ key ];
			}
		}
	};

}());
// TODO short circuit values that stay the same
interpolate = function ( from, to ) {
	if ( isNumeric( from ) && isNumeric( to ) ) {
		return Ractive.interpolators.number( +from, +to );
	}

	if ( isArray( from ) && isArray( to ) ) {
		return Ractive.interpolators.array( from, to );
	}

	if ( isObject( from ) && isObject( to ) ) {
		return Ractive.interpolators.object( from, to );
	}

	return function () { return to; };
};
interpolators = {
	number: function ( from, to ) {
		var delta = to - from;

		if ( !delta ) {
			return function () { return from; };
		}

		return function ( t ) {
			return from + ( t * delta );
		};
	},

	array: function ( from, to ) {
		var intermediate, interpolators, len, i;

		intermediate = [];
		interpolators = [];

		i = len = Math.min( from.length, to.length );
		while ( i-- ) {
			interpolators[i] = Ractive.interpolate( from[i], to[i] );
		}

		// surplus values - don't interpolate, but don't exclude them either
		for ( i=len; i<from.length; i+=1 ) {
			intermediate[i] = from[i];
		}

		for ( i=len; i<to.length; i+=1 ) {
			intermediate[i] = to[i];
		}

		return function ( t ) {
			var i = len;

			while ( i-- ) {
				intermediate[i] = interpolators[i]( t );
			}

			return intermediate;
		};
	},

	object: function ( from, to ) {
		var properties = [], len, interpolators, intermediate, prop;

		intermediate = {};
		interpolators = {};

		for ( prop in from ) {
			if ( hasOwn.call( from, prop ) ) {
				if ( hasOwn.call( to, prop ) ) {
					properties[ properties.length ] = prop;
					interpolators[ prop ] = Ractive.interpolate( from[ prop ], to[ prop ] );
				}

				else {
					intermediate[ prop ] = from[ prop ];
				}
			}
		}

		for ( prop in to ) {
			if ( hasOwn.call( to, prop ) && !hasOwn.call( from, prop ) ) {
				intermediate[ prop ] = to[ prop ];
			}
		}

		len = properties.length;

		return function ( t ) {
			var i = len, prop;

			while ( i-- ) {
				prop = properties[i];

				intermediate[ prop ] = interpolators[ prop ]( t );
			}

			return intermediate;
		};
	}
};
var defaultOptions = createFromNull(), getObject, getArray;

getObject = function () { return {}; };
getArray = function () { return []; };

defineProperties( defaultOptions, {
	preserveWhitespace: { enumerable: true, value: false     },
	append:             { enumerable: true, value: false     },
	twoway:             { enumerable: true, value: true      },
	modifyArrays:       { enumerable: true, value: true      },
	data:               { enumerable: true, value: getObject },
	lazy:               { enumerable: true, value: false     },
	debug:              { enumerable: true, value: false     },
	transitions:        { enumerable: true, value: getObject },
	eventDefinitions:   { enumerable: true, value: getObject },
	noIntro:            { enumerable: true, value: false     },
	transitionsEnabled: { enumerable: true, value: true      },
	magic:              { enumerable: true, value: false     },
	adaptors:           { enumerable: true, value: getArray  }
});

Ractive = function ( options ) {

	var key, template, templateEl, parsedTemplate;

	// Options
	// -------
	for ( key in defaultOptions ) {
		if ( options[ key ] === undefined ) {
			options[ key ] = ( typeof defaultOptions[ key ] === 'function' ? defaultOptions[ key ]() : defaultOptions[ key ] );
		}
	}


	// Initialization
	// --------------

	// We use Object.defineProperties (where possible) as these should be read-only
	defineProperties( this, {
		// Generate a unique identifier, for places where you'd use a weak map if it
		// existed
		_guid: {
			value: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r, v;

				r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
				return v.toString(16);
			})
		},

		// events
		_subs: { value: createFromNull() },

		// cache
		_cache: { value: {} }, // we need to be able to use hasOwnProperty, so can't inherit from null
		_cacheMap: { value: createFromNull() },

		// dependency graph
		_deps: { value: [] },
		_depsMap: { value: createFromNull() },

		// unresolved dependants
		_pendingResolution: { value: [] },

		// Create arrays for deferred attributes and evaluators
		_defAttrs: { value: [] },
		_defEvals: { value: [] },
		_defSelectValues: { value: [] },
		_defCheckboxes: { value: [] },
		_defRadios: { value: [] },
		_defObservers: { value: [] },

		// Keep a list of used evaluators, so we don't duplicate them
		_evaluators: { value: createFromNull() },

		// two-way bindings
		_twowayBindings: { value: {} },

		// transition manager
		_transitionManager: { value: null, writable: true },

		// animations (so we can stop any in progress at teardown)
		_animations: { value: [] },

		// nodes registry
		nodes: { value: {} },

		// property wrappers
		_wrapped: { value: createFromNull() }
	});

	// options
	this.modifyArrays = options.modifyArrays;
	this.magic = options.magic;
	this.twoway = options.twoway;
	this.lazy = options.lazy;
	this.debug = options.debug;

	if ( this.magic && noMagic ) {
		throw new Error( 'Getters and setters (magic mode) are not supported in this browser' );
	}

	if ( options.el ) {
		this.el = getEl( options.el );
		if ( !this.el && this.debug ) {
			throw new Error( 'Could not find container element' );
		}
	}


	this.data = options.data;
	

	// Components registry
	this.components = options.components || {};

	// Transition registry
	this.transitions = options.transitions;

	// Instance-specific event definitions registry
	this.eventDefinitions = options.eventDefinitions;

	// Adaptors
	this.adaptors = options.adaptors;


	// Parse template, if necessary
	template = options.template;

	
	if ( typeof template === 'string' ) {
		if ( !Ractive.parse ) {
			throw new Error( missingParser );
		}

		if ( template.charAt( 0 ) === '#' && doc ) {
			// assume this is an ID of a <script type='text/ractive'> tag
			templateEl = doc.getElementById( template.substring( 1 ) );
			if ( templateEl ) {
				parsedTemplate = Ractive.parse( templateEl.innerHTML, options );
			}

			else {
				throw new Error( 'Could not find template element (' + template + ')' );
			}
		}

		else {
			parsedTemplate = Ractive.parse( template, options );
		}
	} else {
		parsedTemplate = template;
	}

	// deal with compound template
	if ( isObject( parsedTemplate ) ) {
		this.partials = parsedTemplate.partials;
		parsedTemplate = parsedTemplate.main;
	} else {
		this.partials = {};
	}

	// If the template was an array with a single string member, that means
	// we can use innerHTML - we just need to unpack it
	if ( parsedTemplate && ( parsedTemplate.length === 1 ) && ( typeof parsedTemplate[0] === 'string' ) ) {
		parsedTemplate = parsedTemplate[0];
	}

	this.template = parsedTemplate;

	// Add partials to our registry
	if ( options.partials ) {
		for ( key in options.partials ) {
			if ( hasOwn.call( options.partials, key ) ) {
				this.partials[ key ] = options.partials[ key ];
			}
		}
	}

	this.parseOptions = {
		preserveWhitespace: options.preserveWhitespace,
		sanitize: options.sanitize
	};


	
	// temporarily disable transitions, if noIntro flag is set
	this.transitionsEnabled = ( options.noIntro ? false : options.transitionsEnabled );

	render( this, { el: this.el, append: options.append, complete: options.complete });

	// reset transitionsEnabled
	this.transitionsEnabled = options.transitionsEnabled;
};

(function () {

	var getOriginalComputedStyles, setStyle, augment, makeTransition;

	// no point executing this code on the server
	if ( !doc ) {
		return;
	}

	getOriginalComputedStyles = function ( computedStyle, properties ) {
		var original = {}, i;

		i = properties.length;
		while ( i-- ) {
			original[ properties[i] ] = computedStyle[ properties[i] ];
		}

		return original;
	};

	setStyle = function ( node, properties, map, params ) {
		var i = properties.length, prop;

		while ( i-- ) {
			prop = properties[i];
			if ( map && map[ prop ] ) {
				if ( typeof map[ prop ] === 'function' ) {
					node.style[ prop ] = map[ prop ]( params );
				} else {
					node.style[ prop ] = map[ prop ];
				}
			}

			else {
				node.style[ prop ] = 0;
			}
		}
	};

	augment = function ( target, source ) {
		var key;

		if ( !source ) {
			return target;
		}

		for ( key in source ) {
			if ( hasOwn.call( source, key ) ) {
				target[ key ] = source[ key ];
			}
		}

		return target;
	};

	if ( cssTransitionsEnabled ) {
		makeTransition = function ( properties, defaults, outside, inside ) {
			if ( typeof properties === 'string' ) {
				properties = [ properties ];
			}

			return function ( node, complete, params, isIntro ) {
				var transitionEndHandler,
					computedStyle,
					originalComputedStyles,
					startTransition,
					originalStyle,
					duration,
					delay,
					start,
					end,
					positionStyle,
					visibilityStyle;

				params = parseTransitionParams( params );
				
				duration = params.duration || defaults.duration;
				easing = hyphenate( params.easing || defaults.easing );
				delay = params.delay || 0;

				start = ( isIntro ? outside : inside );
				end = ( isIntro ? inside : outside );

				computedStyle = window.getComputedStyle( node );
				originalStyle = node.getAttribute( 'style' );

				// if this is an intro, we need to transition TO the original styles
				if ( isIntro ) {
					// hide, to avoid flashes
					positionStyle = node.style.position;
					visibilityStyle = node.style.visibility;
					node.style.position = 'absolute';
					node.style.visibility = 'hidden';

					// we need to wait a beat before we can actually get values from computedStyle.
					// Yeah, I know, WTF browsers
					setTimeout( function () {
						originalComputedStyles = getOriginalComputedStyles( computedStyle, properties );
						
						start = outside;
						end = augment( originalComputedStyles, inside );

						// starting style
						node.style.position = positionStyle;
						node.style.visibility = visibilityStyle;
						
						setStyle( node, properties, start, params );

						setTimeout( startTransition, 0 );
					}, delay );
				}

				// otherwise we need to transition FROM them
				else {
					setTimeout( function () {
						originalComputedStyles = getOriginalComputedStyles( computedStyle, properties );

						start = augment( originalComputedStyles, inside );
						end = outside;

						// ending style
						setStyle( node, properties, start, params );

						setTimeout( startTransition, 0 );
					}, delay );
				}

				startTransition = function () {
					node.style[ transition + 'Duration' ] = ( duration / 1000 ) + 's';
					node.style[ transition + 'Properties' ] = properties.map( hyphenate ).join( ',' );
					node.style[ transition + 'TimingFunction' ] = easing;

					transitionEndHandler = function () {
						node.removeEventListener( transitionend, transitionEndHandler, false );

						if ( isIntro ) {
							node.setAttribute( 'style', originalStyle || '' );
						}

						complete();
					};
					
					node.addEventListener( transitionend, transitionEndHandler, false );

					setStyle( node, properties, end, params );
				};
			};
		};

		transitions.slide = makeTransition([
			'height',
			'borderTopWidth',
			'borderBottomWidth',
			'paddingTop',
			'paddingBottom',
			'overflowY'
		], { duration: 400, easing: 'easeInOut' }, { overflowY: 'hidden' }, { overflowY: 'hidden' });

		transitions.fade = makeTransition( 'opacity', {
			duration: 300,
			easing: 'linear'
		});

		transitions.fly = makeTransition([ 'opacity', 'left', 'position' ], {
			duration: 400, easing: 'easeOut'
		}, { position: 'relative', left: '-500px' }, { position: 'relative', left: 0 });
	}

	

}());
var parseTransitionParams = function ( params ) {
	if ( params === 'fast' ) {
		return { duration: 200 };
	}

	if ( params === 'slow' ) {
		return { duration: 600 };
	}

	if ( isNumeric( params ) ) {
		return { duration: +params };
	}

	return params || {};
};
(function ( transitions ) {

	var typewriter, typewriteNode, typewriteTextNode;

	if ( !doc ) {
		return;
	}

	typewriteNode = function ( node, complete, interval ) {
		var children, next;

		if ( node.nodeType === 1 ) {
			node.style.display = node._display;
		}

		if ( node.nodeType === 3 ) {
			typewriteTextNode( node, complete, interval );
			return;
		}

		children = Array.prototype.slice.call( node.childNodes );

		next = function () {
			if ( !children.length ) {
				if ( node.nodeType === 1 ) {
					node.setAttribute( 'style', node._style || '' );
				}

				complete();
				return;
			}

			typewriteNode( children.shift(), next, interval );
		};

		next();
	};

	typewriteTextNode = function ( node, complete, interval ) {
		var str, len, loop, i;

		// text node
		str = node._hiddenData;
		len = str.length;

		if ( !len ) {
			complete();
			return;
		}

		i = 0;

		loop = setInterval( function () {
			var substr, remaining, match, remainingNonWhitespace, filler;

			substr = str.substr( 0, i );
			remaining = str.substring( i );

			match = /^\w+/.exec( remaining );
			remainingNonWhitespace = ( match ? match[0].length : 0 );

			// add some non-breaking whitespace corresponding to the remaining length of the
			// current word (only really works with monospace fonts, but better than nothing)
			filler = new Array( remainingNonWhitespace + 1 ).join( '\u00a0' );

			node.data = substr + filler;
			if ( i === len ) {
				clearInterval( loop );
				delete node._hiddenData;
				complete();
			}

			i += 1;
		}, interval );
	};

	// TODO differentiate between intro and outro
	typewriter = function ( node, complete, params ) {
		var interval, style, computedStyle, hide;

		params = parseTransitionParams( params );

		interval = params.interval || ( params.speed ? 1000 / params.speed : ( params.duration ? node.textContent.length / params.duration : 4 ) );
		
		style = node.getAttribute( 'style' );
		computedStyle = window.getComputedStyle( node );

		node.style.visibility = 'hidden';

		setTimeout( function () {
			var computedHeight, computedWidth, computedVisibility;

			computedWidth = computedStyle.width;
			computedHeight = computedStyle.height;
			computedVisibility = computedStyle.visibility;

			hide( node );

			setTimeout( function () {
				node.style.width = computedWidth;
				node.style.height = computedHeight;
				node.style.visibility = 'visible';

				typewriteNode( node, function () {
					node.setAttribute( 'style', style || '' );
					complete();
				}, interval );
			}, params.delay || 0 );
		});

		hide = function ( node ) {
			var children, i;

			if ( node.nodeType === 1 ) {
				node._style = node.getAttribute( 'style' );
				node._display = window.getComputedStyle( node ).display;

				node.style.display = 'none';
			}

			if ( node.nodeType === 3 ) {
				node._hiddenData = '' + node.data;
				node.data = '';
				
				return;
			}

			children = Array.prototype.slice.call( node.childNodes );
			i = children.length;
			while ( i-- ) {
				hide( children[i] );
			}
		};
	};

	transitions.typewriter = typewriter;

}( transitions ));
(function ( Ractive ) {

	var requestFullscreen, cancelFullscreen, fullscreenElement;

	if ( !doc ) {
		return;
	}

	Ractive.fullscreenEnabled = doc.fullscreenEnabled || doc.mozFullScreenEnabled || doc.webkitFullscreenEnabled;

	if ( !Ractive.fullscreenEnabled ) {
		Ractive.requestFullscreen = Ractive.cancelFullscreen = noop;
		Ractive.isFullscreen = function () { return false; };
		return;
	}

	// get prefixed name of requestFullscreen method
	if ( testDiv.requestFullscreen ) {
		requestFullscreen = 'requestFullscreen';
	} else if ( testDiv.mozRequestFullScreen ) {
		requestFullscreen = 'mozRequestFullScreen';
	} else if ( testDiv.webkitRequestFullscreen ) {
		requestFullscreen = 'webkitRequestFullscreen';
	}

	Ractive.requestFullscreen = function ( el ) {
		if ( el[ requestFullscreen ] ) {
			el[ requestFullscreen ]();
		}
	};

	// get prefixed name of cancelFullscreen method
	if ( doc.cancelFullscreen ) {
		cancelFullscreen = 'cancelFullscreen';
	} else if ( doc.mozCancelFullScreen ) {
		cancelFullscreen = 'mozCancelFullScreen';
	} else if ( doc.webkitCancelFullScreen ) {
		cancelFullscreen = 'webkitCancelFullScreen';
	}

	Ractive.cancelFullscreen = function () {
		doc[ cancelFullscreen ]();
	};

	// get prefixed name of fullscreenElement property
	if ( doc.fullscreenElement !== undefined ) {
		fullscreenElement = 'fullscreenElement';
	} else if ( doc.mozFullScreenElement !== undefined ) {
		fullscreenElement = 'mozFullScreenElement';
	} else if ( doc.webkitFullscreenElement !== undefined ) {
		fullscreenElement = 'webkitFullscreenElement';
	}

	Ractive.isFullscreen = function ( el ) {
		return el === doc[ fullscreenElement ];
	};

}( Ractive ));
Animation = function ( options ) {
	var key;

	this.startTime = Date.now();

	// from and to
	for ( key in options ) {
		if ( hasOwn.call( options, key ) ) {
			this[ key ] = options[ key ];
		}
	}

	this.interpolator = Ractive.interpolate( this.from, this.to );
	this.running = true;
};

Animation.prototype = {
	tick: function () {
		var elapsed, t, value, timeNow, index;

		if ( this.running ) {
			timeNow = Date.now();
			elapsed = timeNow - this.startTime;

			if ( elapsed >= this.duration ) {
				this.root.set( this.keypath, this.to );

				if ( this.step ) {
					this.step( 1, this.to );
				}

				if ( this.complete ) {
					this.complete( 1, this.to );
				}

				index = this.root._animations.indexOf( this );

				// TODO remove this check, once we're satisifed this never happens!
				if ( index === -1 && console && console.warn ) {
					console.warn( 'Animation was not found' );
				}

				this.root._animations.splice( index, 1 );

				this.running = false;
				return false;
			}

			t = this.easing ? this.easing ( elapsed / this.duration ) : ( elapsed / this.duration );
			value = this.interpolator( t );

			this.root.set( this.keypath, value );

			if ( this.step ) {
				this.step( t, value );
			}

			return true;
		}

		return false;
	},

	stop: function () {
		var index;

		this.running = false;

		index = this.root._animations.indexOf( this );

		// TODO remove this check, once we're satisifed this never happens!
		if ( index === -1 && console && console.warn ) {
			console.warn( 'Animation was not found' );
		}

		this.root._animations.splice( index, 1 );
	}
};
animationCollection = {
	animations: [],

	tick: function () {
		var i, animation;

		for ( i=0; i<this.animations.length; i+=1 ) {
			animation = this.animations[i];

			if ( !animation.tick() ) {
				// animation is complete, remove it from the stack, and decrement i so we don't miss one
				this.animations.splice( i--, 1 );
			}
		}

		if ( this.animations.length ) {
			requestAnimationFrame( this.boundTick );
		} else {
			this.running = false;
		}
	},

	// bind method to animationCollection
	boundTick: function () {
		animationCollection.tick();
	},

	push: function ( animation ) {
		this.animations[ this.animations.length ] = animation;

		if ( !this.running ) {
			this.running = true;
			this.tick();
		}
	}
};
// https://gist.github.com/paulirish/1579671
(function( vendors, lastTime, global ) {
	
	var x, setTimeout;

	if ( global.requestAnimationFrame ) {
		requestAnimationFrame = global.requestAnimationFrame;
		return;
	}

	for ( x = 0; x < vendors.length && !requestAnimationFrame; ++x ) {
		requestAnimationFrame = global[vendors[x]+'RequestAnimationFrame'];
	}

	if ( !requestAnimationFrame ) {
		setTimeout = global.setTimeout;

		requestAnimationFrame = function(callback) {
			var currTime, timeToCall, id;
			
			currTime = Date.now();
			timeToCall = Math.max( 0, 16 - (currTime - lastTime ) );
			id = setTimeout( function() { callback(currTime + timeToCall); }, timeToCall );
			
			lastTime = currTime + timeToCall;
			return id;
		};
	}
	
}( ['ms', 'moz', 'webkit', 'o'], 0, global ));
var arrayContentsMatch = function ( a, b ) {
	var i;

	if ( !isArray( a ) || !isArray( b ) ) {
		return false;
	}

	if ( a.length !== b.length ) {
		return false;
	}

	i = a.length;
	while ( i-- ) {
		if ( a[i] !== b[i] ) {
			return false;
		}
	}

	return true;
};
(function () {

	var propertyNames, determineNameAndNamespace, setStaticAttribute, determinePropertyName;

	// the property name equivalents for element attributes, where they differ
	// from the lowercased attribute name
	propertyNames = {
		'accept-charset': 'acceptCharset',
		accesskey: 'accessKey',
		bgcolor: 'bgColor',
		'class': 'className',
		codebase: 'codeBase',
		colspan: 'colSpan',
		contenteditable: 'contentEditable',
		datetime: 'dateTime',
		dirname: 'dirName',
		'for': 'htmlFor',
		'http-equiv': 'httpEquiv',
		ismap: 'isMap',
		maxlength: 'maxLength',
		novalidate: 'noValidate',
		pubdate: 'pubDate',
		readonly: 'readOnly',
		rowspan: 'rowSpan',
		tabindex: 'tabIndex',
		usemap: 'useMap'
	};

	// Attribute
	DomAttribute = function ( options ) {

		this.element = options.element;
		determineNameAndNamespace( this, options.name );

		// if it's an empty attribute, or just a straight key-value pair, with no
		// mustache shenanigans, set the attribute accordingly and go home
		if ( options.value === null || typeof options.value === 'string' ) {
			setStaticAttribute( this, options );
			return;
		}

		// otherwise we need to do some work
		this.root = options.root;
		this.parentNode = options.parentNode;

		// share parentFragment with parent element
		this.parentFragment = this.element.parentFragment;

		this.fragment = new StringFragment({
			descriptor:   options.value,
			root:         this.root,
			owner:        this,
			contextStack: options.contextStack
		});


		// if we're not rendering (i.e. we're just stringifying), we can stop here
		if ( !this.parentNode ) {
			return;
		}

		// special cases
		if ( this.name === 'value' ) {
			
			// in some cases we will need to store the node's intended value, as node.value
			// is always a string. For that, we need to add a place to store it
			options.element.ractify();

			this.isValueAttribute = true;

			// TODO need to wait until afterwards to determine type, in case we
			// haven't initialised that attribute yet
			// <input type='file' value='{{value}}'>
			if ( this.parentNode.tagName === 'INPUT' && this.parentNode.type === 'file' ) {
				this.isFileInputValue = true;
			}
		} 
		

		// can we establish this attribute's property name equivalent?
		determinePropertyName( this, options );
		
		// determine whether this attribute can be marked as self-updating
		this.selfUpdating = isStringFragmentSimple( this.fragment );

		// mark as ready
		this.ready = true;
	};

	DomAttribute.prototype = {
		bind: bindAttribute,
		update: updateAttribute,

		updateBindings: function () {
			// if the fragment this attribute belongs to gets reassigned (as a result of
			// as section being updated via an array shift, unshift or splice), this
			// attribute needs to recognise that its keypath has changed
			this.keypath = this.interpolator.keypath || this.interpolator.r; // TODO is this right? .r?

			// if we encounter the special case described above, update the name attribute
			if ( this.propertyName === 'name' ) {
				// replace actual name attribute
				this.parentNode.name = '{{' + this.keypath + '}}';
			}
		},

		teardown: function () {
			var i;

			if ( this.boundEvents ) {
				i = this.boundEvents.length;

				while ( i-- ) {
					this.parentNode.removeEventListener( this.boundEvents[i], this.updateModel, false );
				}
			}

			// ignore non-dynamic attributes
			if ( this.fragment ) {
				this.fragment.teardown();
			}
		},

		bubble: function () {
			// If an attribute's text fragment contains a single item, we can
			// update the DOM immediately...
			if ( this.selfUpdating ) {
				this.update();
			}

			// otherwise we want to register it as a deferred attribute, to be
			// updated once all the information is in, to prevent unnecessary
			// DOM manipulation
			else if ( !this.deferred && this.ready ) {
				this.root._defAttrs[ this.root._defAttrs.length ] = this;
				this.deferred = true;
			}
		},

		toString: function () {
			var str;

			if ( this.value === null ) {
				return this.name;
			}

			// TODO don't use JSON.stringify?

			if ( !this.fragment ) {
				return this.name + '=' + JSON.stringify( this.value );
			}

			// TODO deal with boolean attributes correctly
			str = this.fragment.toString();
			
			return this.name + '=' + JSON.stringify( str );
		}
	};


	// Helper functions
	determineNameAndNamespace = function ( attribute, name ) {
		var colonIndex, namespacePrefix;

		// are we dealing with a namespaced attribute, e.g. xlink:href?
		colonIndex = name.indexOf( ':' );
		if ( colonIndex !== -1 ) {

			// looks like we are, yes...
			namespacePrefix = name.substr( 0, colonIndex );

			// ...unless it's a namespace *declaration*, which we ignore (on the assumption
			// that only valid namespaces will be used)
			if ( namespacePrefix !== 'xmlns' ) {
				name = name.substring( colonIndex + 1 );

				attribute.name = name;
				attribute.namespace = namespaces[ namespacePrefix ];

				if ( !attribute.namespace ) {
					throw 'Unknown namespace ("' + namespacePrefix + '")';
				}

				return;
			}
		}

		attribute.name = name;
	};

	setStaticAttribute = function ( attribute, options ) {
		var value = ( options.value === null ? '' : options.value );

		if ( options.parentNode ) {
			if ( attribute.namespace ) {
				options.parentNode.setAttributeNS( attribute.namespace, options.name, value );
			} else {
				options.parentNode.setAttribute( options.name, value );
			}

			if ( attribute.name === 'id' ) {
				options.root.nodes[ options.value ] = options.parentNode;
			}

			if ( attribute.name === 'value' ) {
				attribute.element.ractify().value = options.value;
			}
		}

		attribute.value = options.value;
	};

	determinePropertyName = function ( attribute, options ) {
		var propertyName;

		if ( attribute.parentNode && !attribute.namespace && ( !options.parentNode.namespaceURI || options.parentNode.namespaceURI === namespaces.html ) ) {
			propertyName = propertyNames[ attribute.name ] || attribute.name;

			if ( options.parentNode[ propertyName ] !== undefined ) {
				attribute.propertyName = propertyName;
			}

			// is attribute a boolean attribute or 'value'? If so we're better off doing e.g.
			// node.selected = true rather than node.setAttribute( 'selected', '' )
			if ( typeof options.parentNode[ propertyName ] === 'boolean' || propertyName === 'value' ) {
				attribute.useProperty = true;
			}
		}
	};

}());
(function () {

	var ComponentParameter;

	// TODO support server environments
	DomComponent = function ( options, docFrag ) {
		var self = this,
			parentFragment = this.parentFragment = options.parentFragment,
			root,
			Component,
			twoway,
			partials,
			instance,
			keypath,
			data,
			mappings,
			i,
			pair,
			observeParent,
			observeChild,
			settingParent,
			settingChild,
			key,
			initFalse,
			processKeyValuePair,
			eventName,
			propagateEvent,
			items;

		root = parentFragment.root;

		this.type = COMPONENT;
		this.name = options.descriptor.r;

		Component = getComponentConstructor( parentFragment.root, options.descriptor.e );

		if ( !Component ) {
			throw new Error( 'Component "' + options.descriptor.e + '" not found' );
		}

		twoway = ( Component.twoway !== false );

		data = {};
		mappings = [];

		this.complexParameters = [];

		processKeyValuePair = function ( key, value ) {
			var parameter;

			// if this is a static value, great
			if ( typeof value === 'string' ) {
				try {
					data[ key ] = JSON.parse( value );
				} catch ( err ) {
					data[ key ] = value;
				}
				return;
			}

			// if null, we treat it as a boolean attribute (i.e. true)
			if ( value === null ) {
				data[ key ] = true;
				return;
			}

			// if a regular interpolator, we bind to it
			if ( value.length === 1 && value[0].t === INTERPOLATOR && value[0].r ) {
				
				// is it an index reference?
				if ( parentFragment.indexRefs && parentFragment.indexRefs[ value[0].r ] !== undefined ) {
					data[ key ] = parentFragment.indexRefs[ value[0].r ];
					return;
				}

				keypath = resolveRef( root, value[0].r, parentFragment.contextStack ) || value[0].r;

				data[ key ] = root.get( keypath );
				mappings[ mappings.length ] = [ key, keypath ];
				return;
			}

			parameter = new ComponentParameter( root, self, key, value, parentFragment.contextStack );
			self.complexParameters[ self.complexParameters.length ] = parameter;

			data[ key ] = parameter.value;
		};

		if ( options.descriptor.a ) {
			for ( key in options.descriptor.a ) {
				if ( options.descriptor.a.hasOwnProperty( key ) ) {
					processKeyValuePair( key, options.descriptor.a[ key ] );
				}
			}
		}

		partials = {};
		if ( options.descriptor.f ) {
			partials.content = options.descriptor.f;
		}

		// TODO don't clone parent node - instead use a document fragment (and pass in the namespaceURI
		// of the parent node, for SVG purposes) and insert contents that way?
		instance = this.instance = new Component({
			el: parentFragment.parentNode.cloneNode( false ), // to ensure correct namespaceURL
			data: data,
			partials: partials
		});

		while ( instance.el.firstChild ) {
			docFrag.appendChild( instance.el.firstChild );
		}

		// reset node references...
		// TODO this is a filthy hack! Need to come up with a neater solution
		instance.el = parentFragment.parentNode;
		items = instance.fragment.items;
		if ( items ) {
			i = items.length;
			while ( i-- ) {
				if ( items[i].parentNode ) {
					items[i].parentNode = parentFragment.parentNode;
				}
			}
		}

		self.observers = [];
		initFalse = { init: false };

		observeParent = function ( pair ) {
			var observer = root.observe( pair[1], function ( value ) {
				if ( !settingParent ) {
					settingChild = true;
					instance.set( pair[0], value );
					settingChild = false;
				}
			}, initFalse );

			self.observers[ self.observers.length ] = observer;
		};

		if ( twoway ) {
			observeChild = function ( pair ) {
				var observer = instance.observe( pair[0], function ( value ) {
					if ( !settingChild ) {
						settingParent = true;
						root.set( pair[1], value );
						settingParent = false;
					}
				}, initFalse );

				self.observers[ self.observers.length ] = observer;

				// initialise
				root.set( pair[1], instance.get( pair[0] ) );
			};
		}
		

		i = mappings.length;
		while ( i-- ) {
			pair = mappings[i];

			observeParent( pair );

			if ( twoway ) {
				observeChild( pair );
			}
		}


		// proxy events
		propagateEvent = function ( eventName, proxy ) {
			instance.on( eventName, function () {
				var args = Array.prototype.slice.call( arguments );
				args.unshift( proxy );

				root.fire.apply( root, args );
			});
		};

		if ( options.descriptor.v ) {
			for ( eventName in options.descriptor.v ) {
				if ( options.descriptor.v.hasOwnProperty( eventName ) ) {
					propagateEvent( eventName, options.descriptor.v[ eventName ] );
				}
			}
		}
	};

	DomComponent.prototype = {
		firstNode: function () {
			return this.instance.fragment.firstNode();
		},

		findNextNode: function () {
			return this.parentFragment.findNextNode( this );
		},

		teardown: function () {
			while ( this.complexParameters.length ) {
				this.complexParameters.pop().teardown();
			}

			while ( this.observers.length ) {
				this.observers.pop().cancel();
			}
			
			this.instance.teardown();
		},

		toString: function () {
			return this.instance.fragment.toString();
		}
	};


	ComponentParameter = function ( root, component, key, value, contextStack ) {
		
		this.parentFragment = component.parentFragment;
		this.component = component;
		this.key = key;

		this.fragment = new StringFragment({
			descriptor:   value,
			root:         root,
			owner:        this,
			contextStack: contextStack
		});

		this.selfUpdating = isStringFragmentSimple( this.fragment );
		this.value = this.fragment.getValue();
	};

	ComponentParameter.prototype = {
		bubble: function () {
			// If there's a single item, we can update the component immediately...
			if ( this.selfUpdating ) {
				this.update();
			}

			// otherwise we want to register it as a deferred component, to be
			// updated once all the information is in, to prevent unnecessary
			// DOM manipulation
			else if ( !this.deferred && this.ready ) {
				this.root._defAttrs[ this.root._defAttrs.length ] = this;
				this.deferred = true;
			}
		},

		update: function () {
			var value = this.fragment.getValue();

			this.component.set( this.key, value );
			this.value = value;
		}
	};


}());
// Element
DomElement = function ( options, docFrag ) {

	var parentFragment,
		descriptor,
		namespace,
		attributes,
		root;

	this.type = ELEMENT;

	// stuff we'll need later
	parentFragment = this.parentFragment = options.parentFragment;
	descriptor = this.descriptor = options.descriptor;

	this.root = root = parentFragment.root;
	this.parentNode = parentFragment.parentNode;
	this.index = options.index;

	this.eventListeners = [];
	this.customEventListeners = [];

	// get namespace, if we're actually rendering (not server-side stringifying)
	if ( this.parentNode ) {
		namespace = getElementNamespace( descriptor, this.parentNode );

		// create the DOM node
		this.node = doc.createElementNS( namespace, descriptor.e );
	}


	// set attributes
	attributes = createElementAttributes( this, descriptor.a );


	// append children, if there are any
	if ( descriptor.f ) {
		appendElementChildren( this, this.node, descriptor, docFrag );
	}


	// create event proxies
	if ( docFrag && descriptor.v ) {
		addEventProxies( this, descriptor.v );
	}

	// if we're actually rendering (i.e. not server-side stringifying), proceed
	if ( docFrag ) {
		// deal with two-way bindings
		if ( root.twoway ) {
			bindElement( this, attributes );
		}

		// name attributes are deferred, because they're a special case - if two-way
		// binding is involved they need to update later. But if it turns out they're
		// not two-way we can update them now
		if ( attributes.name && !attributes.name.twoway ) {
			attributes.name.update();
		}

		docFrag.appendChild( this.node );

		// trigger intro transition
		if ( descriptor.t1 ) {
			executeTransition( descriptor.t1, root, this, parentFragment.contextStack, true );
		}
	}
};

DomElement.prototype = {
	teardown: function ( detach ) {
		var eventName, binding, bindings;

		// Children first. that way, any transitions on child elements will be
		// handled by the current transitionManager
		if ( this.fragment ) {
			this.fragment.teardown( false );
		}

		while ( this.attributes.length ) {
			this.attributes.pop().teardown();
		}

		if ( this.node._ractive ) {
			for ( eventName in this.node._ractive.events ) {
				this.node._ractive.events[ eventName ].teardown();
			}

			// tear down two-way binding, if such there be
			if ( binding = this.node._ractive.binding ) {
				binding.teardown();

				bindings = this.root._twowayBindings[ binding.attr.keypath ];
				bindings.splice( bindings.indexOf( binding ), 1 );
			}
		}

		if ( this.descriptor.t2 ) {
			executeTransition( this.descriptor.t2, this.root, this, this.parentFragment.contextStack, false );
		}

		if ( detach ) {
			this.root._transitionManager.detachWhenReady( this.node );
		}
	},

	firstNode: function () {
		return this.node;
	},

	findNextNode: function () {
		return null;
	},

	// TODO can we get rid of this?
	bubble: noop, // just so event proxy and transition fragments have something to call!

	toString: function () {
		var str, i, len;

		// TODO void tags
		str = '' +
			'<' + this.descriptor.e;

		len = this.attributes.length;
		for ( i=0; i<len; i+=1 ) {
			str += ' ' + this.attributes[i].toString();
		}

		str += '>';

		if ( this.html ) {
			str += this.html;
		} else if ( this.fragment ) {
			str += this.fragment.toString();
		}

		str += '</' + this.descriptor.e + '>';

		return str;
	},

	ractify: function () {
		var contextStack = this.parentFragment.contextStack;

		if ( !this.node._ractive ) {
			defineProperty( this.node, '_ractive', {
				value: {
					keypath: ( contextStack.length ? contextStack[ contextStack.length - 1 ] : '' ),
					index: this.parentFragment.indexRefs,
					events: createFromNull(),
					root: this.root
				}
			});
		}

		return this.node._ractive;
	}
};
DomFragment = function ( options ) {
	if ( options.parentNode ) {
		this.docFrag = doc.createDocumentFragment();
	}

	// if we have an HTML string, our job is easy.
	if ( typeof options.descriptor === 'string' ) {
		this.html = options.descriptor;

		if ( this.docFrag ) {
			this.nodes = insertHtml( options.descriptor, options.parentNode.tagName, this.docFrag );
		}
		
		return; // prevent the rest of the init sequence
	}

	// otherwise we need to make a proper fragment
	initFragment( this, options );
};

DomFragment.prototype = {
	createItem: function ( options ) {
		if ( typeof options.descriptor === 'string' ) {
			return new DomText( options, this.docFrag );
		}

		switch ( options.descriptor.t ) {
			case INTERPOLATOR: return new DomInterpolator( options, this.docFrag );
			case SECTION:      return new DomSection( options, this.docFrag );
			case TRIPLE:       return new DomTriple( options, this.docFrag );

			case ELEMENT:      return new DomElement( options, this.docFrag );
			case PARTIAL:      return new DomPartial( options, this.docFrag );
			case COMPONENT:    return new DomComponent( options, this.docFrag );

			default: throw new Error( 'WTF? not sure what happened here...' );
		}
	},

	teardown: function ( detach ) {
		var node;

		// if this was built from HTML, we just need to remove the nodes
		if ( detach && this.nodes ) {
			while ( this.nodes.length ) {
				node = this.nodes.pop();
				node.parentNode.removeChild( node );
			}
			return;
		}

		// otherwise we need to do a proper teardown
		if ( !this.items ) {
			return;
		}

		while ( this.items.length ) {
			this.items.pop().teardown( detach );
		}
	},

	firstNode: function () {
		if ( this.items && this.items[0] ) {
			return this.items[0].firstNode();
		} else if ( this.nodes ) {
			return this.nodes[0] || null;
		}

		return null;
	},

	findNextNode: function ( item ) {
		var index = item.index;

		if ( this.items[ index + 1 ] ) {
			return this.items[ index + 1 ].firstNode();
		}

		// if this is the root fragment, and there are no more items,
		// it means we're at the end
		if ( this.owner === this.root ) {
			return null;
		}

		return this.owner.findNextNode( this );
	},

	toString: function () {
		var html, i, len, item;
		
		if ( this.html ) {
			return this.html;
		}

		html = '';

		if ( !this.items ) {
			return html;
		}

		len = this.items.length;

		for ( i=0; i<len; i+=1 ) {
			item = this.items[i];
			html += item.toString();
		}

		return html;
	}
};
// Interpolator
DomInterpolator = function ( options, docFrag ) {
	this.type = INTERPOLATOR;

	if ( docFrag ) {
		this.node = doc.createTextNode( '' );
		docFrag.appendChild( this.node );
	}

	// extend Mustache
	initMustache( this, options );
};

DomInterpolator.prototype = {
	update: updateMustache,
	resolve: resolveMustache,

	teardown: function ( detach ) {
		teardown( this );
		
		if ( detach ) {
			this.node.parentNode.removeChild( this.node );
		}
	},

	render: function ( value ) {
		if ( this.node ) {
			this.node.data = ( value === undefined ? '' : value );
		}
	},

	firstNode: function () {
		return this.node;
	},

	toString: function () {
		var value = ( this.value !== undefined ? '' + this.value : '' );
		return value.replace( '<', '&lt;' ).replace( '>', '&gt;' );
	}
};
// Partials
DomPartial = function ( options, docFrag ) {
	var parentFragment = this.parentFragment = options.parentFragment, descriptor;

	this.type = PARTIAL;
	this.name = options.descriptor.r;

	descriptor = getPartialDescriptor( parentFragment.root, options.descriptor.r );

	this.fragment = new DomFragment({
		descriptor:   descriptor,
		root:         parentFragment.root,
		parentNode:   parentFragment.parentNode,
		contextStack: parentFragment.contextStack,
		owner:        this
	});

	if ( docFrag ) {
		docFrag.appendChild( this.fragment.docFrag );
	}
};

DomPartial.prototype = {
	firstNode: function () {
		return this.fragment.firstNode();
	},

	findNextNode: function () {
		return this.parentFragment.findNextNode( this );
	},

	teardown: function ( detach ) {
		this.fragment.teardown( detach );
	},

	toString: function () {
		return this.fragment.toString();
	}
};
// Section
DomSection = function ( options, docFrag ) {
	this.type = SECTION;

	this.fragments = [];
	this.length = 0; // number of times this section is rendered

	if ( docFrag ) {
		this.docFrag = doc.createDocumentFragment();
	}
	
	this.initialising = true;
	initMustache( this, options );

	if ( docFrag ) {
		docFrag.appendChild( this.docFrag );
	}

	this.initialising = false;
};

DomSection.prototype = {
	update: updateMustache,
	resolve: resolveMustache,

	smartUpdate: function ( methodName, args ) {
		var fragmentOptions;

		if ( methodName === 'push' || methodName === 'unshift' || methodName === 'splice' ) {
			fragmentOptions = {
				descriptor: this.descriptor.f,
				root:       this.root,
				parentNode: this.parentNode,
				owner:      this
			};

			if ( this.descriptor.i ) {
				fragmentOptions.indexRef = this.descriptor.i;
			}
		}

		if ( this[ methodName ] ) { // if not, it's sort or reverse, which doesn't affect us (i.e. our length)
			this[ methodName ]( fragmentOptions, args );
		}
	},

	pop: function () {
		// teardown last fragment
		if ( this.length ) {
			this.fragments.pop().teardown( true );
			this.length -= 1;
		}
	},

	push: function ( fragmentOptions, args ) {
		var start, end, i;

		// append list item to context stack
		start = this.length;
		end = start + args.length;

		for ( i=start; i<end; i+=1 ) {
			fragmentOptions.contextStack = this.contextStack.concat( this.keypath + '.' + i );
			fragmentOptions.index = i;

			this.fragments[i] = this.createFragment( fragmentOptions );
		}
		
		this.length += args.length;

		// append docfrag in front of next node
		this.parentNode.insertBefore( this.docFrag, this.parentFragment.findNextNode( this ) );
	},

	shift: function () {
		this.splice( null, [ 0, 1 ] );
	},

	unshift: function ( fragmentOptions, args ) {
		this.splice( fragmentOptions, [ 0, 0 ].concat( new Array( args.length ) ) );
	},

	splice: function ( fragmentOptions, args ) {
		var insertionPoint, addedItems, removedItems, balance, i, start, end, spliceArgs, reassignStart;

		if ( !args.length ) {
			return;
		}

		// figure out where the changes started...
		start = +( args[0] < 0 ? this.length + args[0] : args[0] );

		// ...and how many items were added to or removed from the array
		addedItems = Math.max( 0, args.length - 2 );
		removedItems = ( args[1] !== undefined ? args[1] : this.length - start );

		balance = addedItems - removedItems;

		if ( !balance ) {
			// The array length hasn't changed - we don't need to add or remove anything
			return;
		}

		// If more items were removed than added, we need to remove some things from the DOM
		if ( balance < 0 ) {
			end = start - balance;

			for ( i=start; i<end; i+=1 ) {
				this.fragments[i].teardown( true );
			}

			// Keep in sync
			this.fragments.splice( start, -balance );
		}

		// Otherwise we need to add some things to the DOM
		else {
			end = start + balance;

			// Figure out where these new nodes need to be inserted
			insertionPoint = ( this.fragments[ start ] ? this.fragments[ start ].firstNode() : this.parentFragment.findNextNode( this ) );

			// Make room for the new fragments. (Just trust me, this works...)
			spliceArgs = [ start, 0 ].concat( new Array( balance ) );
			this.fragments.splice.apply( this.fragments, spliceArgs );

			for ( i=start; i<end; i+=1 ) {
				fragmentOptions.contextStack = this.contextStack.concat( this.keypath + '.' + i );
				fragmentOptions.index = i;

				this.fragments[i] = this.createFragment( fragmentOptions );
			}

			// Append docfrag in front of insertion point
			this.parentNode.insertBefore( this.docFrag, insertionPoint );
		}

		this.length += balance;


		// Now we need to reassign existing fragments (e.g. items.4 -> items.3 - the keypaths,
		// context stacks and index refs will have changed)
		reassignStart = ( start + addedItems );

		reassignFragments( this.root, this, reassignStart, this.length, balance );
	},

	teardown: function ( detach ) {
		this.teardownFragments( detach );

		teardown( this );
	},

	firstNode: function () {
		if ( this.fragments[0] ) {
			return this.fragments[0].firstNode();
		}

		return this.parentFragment.findNextNode( this );
	},

	findNextNode: function ( fragment ) {
		if ( this.fragments[ fragment.index + 1 ] ) {
			return this.fragments[ fragment.index + 1 ].firstNode();
		}

		return this.parentFragment.findNextNode( this );
	},

	teardownFragments: function ( detach ) {
		var id;

		while ( this.fragments.length ) {
			this.fragments.shift().teardown( detach );
		}

		if ( this.fragmentsById ) {
			for ( id in this.fragmentsById ) {
				if ( this.fragments[ id ] ) {
					this.fragmentsById[ id ].teardown();
					this.fragmentsById[ id ] = null;
				}
			}
		}
	},

	render: function ( value ) {
		var next, wrapped;

		// with sections, we need to get the fake value if we have a wrapped object
		if ( wrapped = this.root._wrapped[ this.keypath ] ) {
			value = wrapped.get();
		}

		// prevent sections from rendering multiple times (happens if
		// evaluators evaluate while update is happening)
		if ( this.rendering ) {
			return;
		}

		this.rendering = true;
		updateSection( this, value );
		this.rendering = false;

		// if we have no new nodes to insert (i.e. the section length stayed the
		// same, or shrank), we don't need to go any further
		if ( this.docFrag && !this.docFrag.childNodes.length ) {
			return;
		}

		// if this isn't the initial render, we need to insert any new nodes in
		// the right place
		if ( !this.initialising ) {
			
			// Normally this is just a case of finding the next node, and inserting
			// items before it...
			next = this.parentFragment.findNextNode( this );

			if ( next && ( next.parentNode === this.parentNode ) ) {
				this.parentNode.insertBefore( this.docFrag, next );
			}

			// ...but in some edge cases the next node will not have been attached to
			// the DOM yet, in which case we append to the end of the parent node
			else {
				// TODO could there be a situation in which later nodes could have
				// been attached to the parent node, i.e. we need to find a sibling
				// to insert before?
				this.parentNode.appendChild( this.docFrag );
			}
		}
	},

	createFragment: function ( options ) {
		var fragment = new DomFragment( options );
		
		if ( this.docFrag ) {
			this.docFrag.appendChild( fragment.docFrag );
		}

		return fragment;
	},

	toString: function () {
		var str, i, len;

		str = '';

		i = 0;
		len = this.length;

		for ( i=0; i<len; i+=1 ) {
			str += this.fragments[i].toString();
		}

		return str;
	}
};
// Plain text
DomText = function ( options, docFrag ) {
	this.type = TEXT;
	this.descriptor = options.descriptor;

	if ( docFrag ) {
		this.node = doc.createTextNode( options.descriptor );
		this.parentNode = options.parentFragment.parentNode;

		docFrag.appendChild( this.node );
	}
};

DomText.prototype = {
	teardown: function ( detach ) {
		if ( detach ) {
			this.node.parentNode.removeChild( this.node );
		}
	},

	firstNode: function () {
		return this.node;
	},

	toString: function () {
		return ( '' + this.descriptor ).replace( '<', '&lt;' ).replace( '>', '&gt;' );
	}
};
// Triple
DomTriple = function ( options, docFrag ) {
	this.type = TRIPLE;

	if ( docFrag ) {
		this.nodes = [];
		this.docFrag = doc.createDocumentFragment();
	}

	this.initialising = true;
	initMustache( this, options );
	if ( docFrag ) {
		docFrag.appendChild( this.docFrag );
	}
	this.initialising = false;
};

DomTriple.prototype = {
	update: updateMustache,
	resolve: resolveMustache,

	teardown: function ( detach ) {
		var node;

		// remove child nodes from DOM
		if ( detach ) {
			while ( this.nodes.length ) {
				node = this.nodes.pop();
				node.parentNode.removeChild( node );
			}
		}

		teardown( this );
	},

	firstNode: function () {
		if ( this.nodes[0] ) {
			return this.nodes[0];
		}

		return this.parentFragment.findNextNode( this );
	},

	render: function ( html ) {
		var node;

		if ( !this.nodes ) {
			// looks like we're in a server environment...
			// nothing to see here, move along
			return;
		}

		// remove existing nodes
		while ( this.nodes.length ) {
			node = this.nodes.pop();
			node.parentNode.removeChild( node );
		}

		if ( html === undefined ) {
			this.nodes = [];
			return;
		}

		// get new nodes
		this.nodes = insertHtml( html, this.parentNode.tagName, this.docFrag );

		if ( !this.initialising ) {
			this.parentNode.insertBefore( this.docFrag, this.parentFragment.findNextNode( this ) );
		}
	},

	toString: function () {
		return ( this.value !== undefined ? this.value : '' );
	}
};
StringFragment = function ( options ) {
	initFragment( this, options );
};

StringFragment.prototype = {
	createItem: function ( options ) {
		if ( typeof options.descriptor === 'string' ) {
			return new StringText( options.descriptor );
		}

		switch ( options.descriptor.t ) {
			case INTERPOLATOR: return new StringInterpolator( options );
			case TRIPLE: return new StringInterpolator( options );
			case SECTION: return new StringSection( options );

			default: throw 'Something went wrong in a rather interesting way';
		}
	},


	bubble: function () {
		this.owner.bubble();
	},

	teardown: function () {
		var numItems, i;

		numItems = this.items.length;
		for ( i=0; i<numItems; i+=1 ) {
			this.items[i].teardown();
		}
	},

	getValue: function () {
		var value;
		
		// Accommodate boolean attributes
		if ( this.items.length === 1 && this.items[0].type === INTERPOLATOR ) {
			value = this.items[0].value;
			if ( value !== undefined ) {
				return value;
			}
		}
		
		return this.toString();
	},

	toString: function () {
		return this.items.join( '' );
	},

	toJSON: function () {
		var value = this.getValue();

		if ( typeof value === 'string' ) {
			try {
				value = JSON.parse( value );
			} catch ( err ) {
				// value = value
			}
		}

		return value;
	}
};
// Interpolator or Triple
StringInterpolator = function ( options ) {
	this.type = INTERPOLATOR;
	initMustache( this, options );
};

StringInterpolator.prototype = {
	update: updateMustache,
	resolve: resolveMustache,

	render: function ( value ) {
		this.value = value;
		this.parentFragment.bubble();
	},

	teardown: function () {
		teardown( this );
	},

	toString: function () {
		return ( this.value === undefined ? '' : this.value );
	}
};
// Section
StringSection = function ( options ) {
	this.type = SECTION;
	this.fragments = [];
	this.length = 0;

	initMustache( this, options );
};

StringSection.prototype = {
	update: updateMustache,
	resolve: resolveMustache,

	teardown: function () {
		this.teardownFragments();

		teardown( this );
	},

	teardownFragments: function () {
		while ( this.fragments.length ) {
			this.fragments.shift().teardown();
		}
		this.length = 0;
	},

	bubble: function () {
		this.value = this.fragments.join( '' );
		this.parentFragment.bubble();
	},

	render: function ( value ) {
		var wrapped;

		// with sections, we need to get the fake value if we have a wrapped object
		if ( wrapped = this.root._wrapped[ this.keypath ] ) {
			value = wrapped.get();
		}

		updateSection( this, value );
		this.parentFragment.bubble();
	},

	createFragment: function ( options ) {
		return new StringFragment( options );
	},

	toString: function () {
		return this.fragments.join( '' );
	}
};
// Plain text
StringText = function ( text ) {
	this.type = TEXT;
	this.text = text;
};

StringText.prototype = {
	toString: function () {
		return this.text;
	},

	teardown: function () {} // no-op
};
getEl = function ( input ) {
	var output;

	if ( typeof window === 'undefined' || !doc || !input ) {
		return null;
	}

	// We already have a DOM node - no work to do. (Duck typing alert!)
	if ( input.nodeType ) {
		return input;
	}

	// Get node from string
	if ( typeof input === 'string' ) {
		// try ID first
		output = doc.getElementById( input );

		// then as selector, if possible
		if ( !output && doc.querySelector ) {
			output = doc.querySelector( input );
		}

		// did it work?
		if ( output.nodeType ) {
			return output;
		}
	}

	// If we've been given a collection (jQuery, Zepto etc), extract the first item
	if ( input[0] && input[0].nodeType ) {
		return input[0];
	}

	return null;
};
toString = Object.prototype.toString;

// thanks, http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
isArray = function ( obj ) {
	return toString.call( obj ) === '[object Array]';
};

isEqual = function ( a, b ) {
	if ( a === null && b === null ) {
		return true;
	}

	if ( typeof a === 'object' || typeof b === 'object' ) {
		return false;
	}

	return a === b;
};

// http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
isNumeric = function ( n ) {
	return !isNaN( parseFloat( n ) ) && isFinite( n );
};

isObject = function ( obj ) {
	return ( typeof obj === 'object' && toString.call( obj ) === '[object Object]' );
};
// We're not using a constructor here because it's convenient (and more
// efficient) to pass e.g. transitionManager.pop as a callback, rather
// than wrapping a prototype method in an anonymous function each time
makeTransitionManager = function ( root, callback ) {
	var transitionManager, nodesToDetach, detachNodes, nodeHasNoTransitioningChildren;

	nodesToDetach = [];

	// detach any nodes which a) need to be detached and b) have no child nodes
	// which are actively transitioning. This will be called each time a
	// transition completes
	detachNodes = function () {
		var i, node;

		i = nodesToDetach.length;
		while ( i-- ) {
			node = nodesToDetach[i];

			// see if this node can be detached yet
			if ( nodeHasNoTransitioningChildren( node ) ) {
				node.parentNode.removeChild( node );
				nodesToDetach.splice( i, 1 );
			}
		}
	};

	nodeHasNoTransitioningChildren = function ( node ) {
		var i, candidate;

		i = transitionManager.active.length;
		while ( i-- ) {
			candidate = transitionManager.active[i];

			if ( node.contains( candidate ) ) {
				// fail as soon as possible
				return false;
			}
		}

		return true;
	};

	transitionManager = {
		active: [],
		push: function ( node ) {
			transitionManager.active[ transitionManager.active.length ] = node;
		},
		pop: function ( node ) {
			transitionManager.active.splice( transitionManager.active.indexOf( node ), 1 );
			
			detachNodes();

			if ( !transitionManager.active.length && transitionManager._ready ) {
				transitionManager.complete();
			}
		},
		complete: function () {
			if ( callback ) {
				callback.call( root );
			}
		},
		ready: function () {
			detachNodes();

			transitionManager._ready = true;
			if ( !transitionManager.active.length ) {
				transitionManager.complete();
			}
		},
		detachWhenReady: function ( node ) {
			nodesToDetach[ nodesToDetach.length ] = node;
		}
	};

	return transitionManager;
};
var normaliseKeypath;

(function () {

	var pattern = /\[\s*([0-9]|[1-9][0-9]+)\s*\]/g;

	normaliseKeypath = function ( keypath ) {
		return keypath.replace( pattern, '.$1' );
	};

}());

var ElementStub;

(function () {

	var voidElementNames,
		allElementNames,
		mapToLowerCase,
		svgCamelCaseElements,
		svgCamelCaseElementsMap,
		svgCamelCaseAttributes,
		svgCamelCaseAttributesMap,
		closedByParentClose,
		siblingsByTagName,
		onPattern,
		sanitize,
		filterAttrs,
		getFrag,
		processProxy,
		jsonifyProxy,
		camelCase;

	ElementStub = function ( firstToken, parser, preserveWhitespace ) {
		var next, attrs, filtered, proxies, item, i, attr;

		this.lcTag = firstToken.name.toLowerCase();

		parser.pos += 1;

		// TODO is this the right way to deal with component naming?
		if ( this.lcTag.substr( 0, 3 ) === 'rv-' ) {
			this.component = camelCase( firstToken.name.substring( 3 ) );

			if ( firstToken.attrs ) {
				this.attributes = [];
				i = firstToken.attrs.length;
				while ( i-- ) {
					attr = firstToken.attrs[i];

					this.attributes[i] = {
						name: attr.name,
						value: attr.value ? getFragmentStubFromTokens( attr.value ) : null
					};
				}
			}
		}

		else {
			// enforce lower case tag names by default. HTML doesn't care. SVG does, so if we see an SVG tag
			// that should be camelcased, camelcase it
			this.tag = ( svgCamelCaseElementsMap[ this.lcTag ] ? svgCamelCaseElementsMap[ this.lcTag ] : this.lcTag );

			// if this is a <pre> element, preserve whitespace within
			preserveWhitespace = ( preserveWhitespace || this.lcTag === 'pre' );

			if ( firstToken.attrs ) {
				filtered = filterAttrs( firstToken.attrs );
				
				attrs = filtered.attrs;
				proxies = filtered.proxies;

				// remove event attributes (e.g. onclick='doSomething()') if we're sanitizing
				if ( parser.options.sanitize && parser.options.sanitize.eventAttributes ) {
					attrs = attrs.filter( sanitize );
				}

				if ( attrs.length ) {
					this.attributes = attrs.map( getFrag );
				}

				if ( proxies.length ) {
					this.proxies = proxies.map( processProxy );
				}

				// TODO rename this helper function
				if ( filtered.intro ) {
					this.intro = processProxy( filtered.intro );
				}

				if ( filtered.outro ) {
					this.outro = processProxy( filtered.outro );
				}
			}
		}
		

		if ( firstToken.selfClosing ) {
			this.selfClosing = true;
		}

		if ( voidElementNames.indexOf( this.lcTag ) !== -1 ) {
			this.isVoid = true;
		}

		// if self-closing or a void element, close
		if ( this.selfClosing || this.isVoid ) {
			return;
		}

		this.siblings = siblingsByTagName[ this.lcTag ];

		this.items = [];

		next = parser.next();
		while ( next ) {

			// section closing mustache should also close this element, e.g.
			// <ul>{{#items}}<li>{{content}}{{/items}}</ul>
			if ( next.mustacheType === CLOSING ) {
				break;
			}
			
			if ( next.type === TAG ) {

				// closing tag
				if ( next.closing ) {
					// it's a closing tag, which means this element is closed...
					if ( next.name.toLowerCase() === this.lcTag ) {
						parser.pos += 1;
					}

					break;
				}

				// sibling element, which closes this element implicitly
				else if ( this.siblings && ( this.siblings.indexOf( next.name.toLowerCase() ) !== -1 ) ) {
					break;
				}
				
			}

			this.items[ this.items.length ] = getItem( parser );

			next = parser.next();
		}


		// if we're not preserving whitespace, we can eliminate inner leading and trailing whitespace
		if ( !preserveWhitespace ) {
			item = this.items[0];
			if ( item && item.type === TEXT ) {
				item.text = item.text.replace( leadingWhitespace, '' );
				if ( !item.text ) {
					this.items.shift();
				}
			}

			item = this.items[ this.items.length - 1 ];
			if ( item && item.type === TEXT ) {
				item.text = item.text.replace( trailingWhitespace, '' );
				if ( !item.text ) {
					this.items.pop();
				}
			}
		}
	};

	ElementStub.prototype = {
		toJSON: function ( noStringify ) {
			var json, name, value, proxy, i, len;

			if ( this[ 'json_' + noStringify ] ) {
				return this[ 'json_' + noStringify ];
			}

			if ( this.component ) {
				json = {
					t: COMPONENT,
					e: this.component
				};
			} else {
				json = {
					t: ELEMENT,
					e: this.tag
				};
			}

			if ( this.attributes && this.attributes.length ) {
				json.a = {};

				len = this.attributes.length;
				for ( i=0; i<len; i+=1 ) {
					name = this.attributes[i].name;

					if ( json.a[ name ] ) {
						throw new Error( 'You cannot have multiple attributes with the same name' );
					}

					// empty attributes (e.g. autoplay, checked)
					if( this.attributes[i].value === null ) {
						value = null;
					} else {
						value = jsonifyStubs( this.attributes[i].value.items, noStringify );	
					}

					json.a[ name ] = value;
				}
			}

			if ( this.items && this.items.length ) {
				json.f = jsonifyStubs( this.items, noStringify );
			}

			if ( this.proxies && this.proxies.length ) {
				json.v = {};

				len = this.proxies.length;
				for ( i=0; i<len; i+=1 ) {
					proxy = this.proxies[i];

					json.v[ proxy.domEventName ] = jsonifyProxy( proxy );
				}
			}

			if ( this.intro ) {
				if ( this.intro.args ) {
					json.t1 = {
						n: this.intro.name,
						a: this.intro.args
					};
				} else if ( this.intro.dynamicArgs ) {
					json.t1 = {
						n: this.intro.name,
						d: jsonifyStubs( this.intro.dynamicArgs.items, noStringify )
					};
				} else {
					json.t1 = this.intro.name;
				}
			}

			if ( this.outro ) {
				if ( this.outro.args ) {
					json.t2 = {
						n: this.outro.name,
						a: this.outro.args
					};
				} else if ( this.outro.dynamicArgs ) {
					json.t2 = {
						n: this.outro.name,
						d: jsonifyStubs( this.outro.dynamicArgs.items, noStringify )
					};
				} else {
					json.t2 = this.outro.name;
				}
			}

			this[ 'json_' + noStringify ] = json;
			return json;
		},

		toString: function () {
			var str, i, len, attrStr, name, attrValueStr, fragStr, isVoid;

			if ( this.str !== undefined ) {
				return this.str;
			}

			// components can't be stringified
			if ( this.component ) {
				return ( this.str = false );
			}

			// if this isn't an HTML element, it can't be stringified (since the only reason to stringify an
			// element is to use with innerHTML, and SVG doesn't support that method.
			// Note: table elements and select children are excluded from this, because IE (of course)
			// fucks up when you use innerHTML with them
			if ( allElementNames.indexOf( this.tag.toLowerCase() ) === -1 ) {
				return ( this.str = false );
			}

			// do we have proxies or transitions? if so we can't use innerHTML
			if ( this.proxies || this.intro || this.outro ) {
				return ( this.str = false );
			}

			// see if children can be stringified (i.e. don't contain mustaches)
			fragStr = stringifyStubs( this.items );
			if ( fragStr === false ) {
				return ( this.str = false );
			}

			// is this a void element?
			isVoid = ( voidElementNames.indexOf( this.tag.toLowerCase() ) !== -1 );

			str = '<' + this.tag;
			
			if ( this.attributes ) {
				for ( i=0, len=this.attributes.length; i<len; i+=1 ) {

					name = this.attributes[i].name;
					
					// does this look like a namespaced attribute? if so we can't stringify it
					if ( name.indexOf( ':' ) !== -1 ) {
						return ( this.str = false );
					}

					// if this element has an id attribute, it can't be stringified (since references are stored
					// in ractive.nodes). Similarly, intro and outro transitions
					if ( name === 'id' || name === 'intro' || name === 'outro' ) {
						return ( this.str = false );
					}

					attrStr = ' ' + name;

					// empty attributes
					if ( this.attributes[i].value !== null ) {
						attrValueStr = this.attributes[i].value.toString();

						if ( attrValueStr === false ) {
							return ( this.str = false );
						}

						if ( attrValueStr !== '' ) {
							attrStr += '=';

							// does it need to be quoted?
							if ( /[\s"'=<>`]/.test( attrValueStr ) ) {
								attrStr += '"' + attrValueStr.replace( /"/g, '&quot;' ) + '"';
							} else {
								attrStr += attrValueStr;
							}
						}
					}

					str += attrStr;
				}
			}

			// if this isn't a void tag, but is self-closing, add a solidus. Aaaaand, we're done
			if ( this.selfClosing && !isVoid ) {
				str += '/>';
				return ( this.str = str );
			}

			str += '>';

			// void element? we're done
			if ( isVoid ) {
				return ( this.str = str );
			}

			// if this has children, add them
			str += fragStr;

			str += '</' + this.tag + '>';
			return ( this.str = str );
		}
	};


	voidElementNames = 'area base br col command embed hr img input keygen link meta param source track wbr'.split( ' ' );
	allElementNames = 'a abbr acronym address applet area b base basefont bdo big blockquote body br button caption center cite code col colgroup dd del dfn dir div dl dt em fieldset font form frame frameset h1 h2 h3 h4 h5 h6 head hr html i iframe img input ins isindex kbd label legend li link map menu meta noframes noscript object ol p param pre q s samp script select small span strike strong style sub sup textarea title tt u ul var article aside audio bdi canvas command data datagrid datalist details embed eventsource figcaption figure footer header hgroup keygen mark meter nav output progress ruby rp rt section source summary time track video wbr'.split( ' ' );
	closedByParentClose = 'li dd rt rp optgroup option tbody tfoot tr td th'.split( ' ' );

	svgCamelCaseElements = 'altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath vkern'.split( ' ' );
	svgCamelCaseAttributes = 'attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits contentScriptType contentStyleType diffuseConstant edgeMode externalResourcesRequired filterRes filterUnits glyphRef glyphRef gradientTransform gradientTransform gradientUnits gradientUnits kernelMatrix kernelUnitLength kernelUnitLength kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent specularExponent spreadMethod spreadMethod startOffset stdDeviation stitchTiles surfaceScale surfaceScale systemLanguage tableValues targetX targetY textLength textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan'.split( ' ' );
	
	mapToLowerCase = function ( items ) {
		var map = {}, i = items.length;
		while ( i-- ) {
			map[ items[i].toLowerCase() ] = items[i];
		}
		return map;
	};

	svgCamelCaseElementsMap = mapToLowerCase( svgCamelCaseElements );
	svgCamelCaseAttributesMap = mapToLowerCase( svgCamelCaseAttributes );

	siblingsByTagName = {
		li: [ 'li' ],
		dt: [ 'dt', 'dd' ],
		dd: [ 'dt', 'dd' ],
		p: 'address article aside blockquote dir div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hgroup hr menu nav ol p pre section table ul'.split( ' ' ),
		rt: [ 'rt', 'rp' ],
		rp: [ 'rp', 'rt' ],
		optgroup: [ 'optgroup' ],
		option: [ 'option', 'optgroup' ],
		thead: [ 'tbody', 'tfoot' ],
		tbody: [ 'tbody', 'tfoot' ],
		tr: [ 'tr' ],
		td: [ 'td', 'th' ],
		th: [ 'td', 'th' ]
	};

	onPattern = /^on[a-zA-Z]/;

	sanitize = function ( attr ) {
		var valid = !onPattern.test( attr.name );
		return valid;
	};

	filterAttrs = function ( items ) {
		var attrs, proxies, filtered, i, len, item;

		filtered = {};
		attrs = [];
		proxies = [];

		len = items.length;
		for ( i=0; i<len; i+=1 ) {
			item = items[i];

			// Transition?
			if ( item.name === 'intro' ) {
				if ( filtered.intro ) {
					throw new Error( 'An element can only have one intro transition' );
				}

				filtered.intro = item;
			} else if ( item.name === 'outro' ) {
				if ( filtered.outro ) {
					throw new Error( 'An element can only have one outro transition' );
				}

				filtered.outro = item;
			}

			// Proxy?
			else if ( item.name.substr( 0, 6 ) === 'proxy-' ) {
				item.name = item.name.substring( 6 );
				proxies[ proxies.length ] = item;
			}

			else if ( item.name.substr( 0, 3 ) === 'on-' ) {
				item.name = item.name.substring( 3 );
				proxies[ proxies.length ] = item;
			}

			// Attribute?
			else {
				attrs[ attrs.length ] = item;
			}
		}

		filtered.attrs = attrs;
		filtered.proxies = proxies;

		return filtered;
	};

	getFrag = function ( attr ) {
		var lcName = attr.name.toLowerCase();

		return {
			name: ( svgCamelCaseAttributesMap[ lcName ] ? svgCamelCaseAttributesMap[ lcName ] : lcName ),
			value: attr.value ? getFragmentStubFromTokens( attr.value ) : null
		};
	};

	processProxy = function ( proxy ) {
		var processed, tokens, token, colonIndex, throwError, proxyName, proxyArgs;

		throwError = function () {
			throw new Error( 'Illegal proxy event' );
		};

		if ( !proxy.name || !proxy.value ) {
			throwError();
		}

		processed = { domEventName: proxy.name };

		tokens = proxy.value;

		proxyName = [];
		proxyArgs = [];

		while ( tokens.length ) {
			token = tokens.shift();

			if ( token.type === TEXT ) {
				colonIndex = token.value.indexOf( ':' );
				
				if ( colonIndex === -1 ) {
					proxyName[ proxyName.length ] = token;
				} else {
					
					// is the colon the first character?
					if ( colonIndex ) {
						// no
						proxyName[ proxyName.length ] = {
							type: TEXT,
							value: token.value.substr( 0, colonIndex )
						};
					}

					// if there is anything after the colon in this token, treat
					// it as the first token of the proxyArgs fragment
					if ( token.value.length > colonIndex + 1 ) {
						proxyArgs[0] = {
							type: TEXT,
							value: token.value.substring( colonIndex + 1 )
						};
					}

					break;
				}
			}

			else {
				proxyName[ proxyName.length ] = token;
			}
		}

		proxyArgs = proxyArgs.concat( tokens );

		if ( proxyName.length === 1 && proxyName[0].type === TEXT ) {
			processed.name = proxyName[0].value;
		} else {
			processed.name = proxyName;
		}

		if ( proxyArgs.length ) {
			if ( proxyArgs.length === 1 && proxyArgs[0].type === TEXT ) {
				try {
					processed.args = JSON.parse( proxyArgs[0].value );
				} catch ( err ) {
					processed.args = proxyArgs[0].value;
				}
			}

			else {
				processed.dynamicArgs = proxyArgs;
			}
		}

		return processed;
	};

	jsonifyProxy = function ( proxy ) {
		var result, name;

		if ( typeof proxy.name === 'string' ) {
			if ( !proxy.args && !proxy.dynamicArgs ) {
				return proxy.name;
			}

			name = proxy.name;
		} else {
			name = getFragmentStubFromTokens( proxy.name ).toJSON();
		}

		result = { n: name };

		if ( proxy.args ) {
			result.a = proxy.args;
			return result;
		}

		if ( proxy.dynamicArgs ) {
			result.d = getFragmentStubFromTokens( proxy.dynamicArgs ).toJSON();
		}

		return result;
	};

	camelCase = function ( hyphenatedStr ) {
		return hyphenatedStr.replace( /-([a-zA-Z])/g, function ( match, $1 ) {
			return $1.toUpperCase();
		});
	};


}());
var ExpressionStub;

(function () {

	var getRefs, stringify, stringifyKey, identifier;

	ExpressionStub = function ( token ) {
		this.refs = [];

		getRefs( token, this.refs );
		this.str = stringify( token, this.refs );
	};

	ExpressionStub.prototype = {
		toJSON: function () {
			if ( this.json ) {
				return this.json;
			}
			
			this.json = {
				r: this.refs,
				s: this.str
			};

			return this.json;
		}
	};


	// TODO maybe refactor this?
	getRefs = function ( token, refs ) {
		var i, list;

		if ( token.t === REFERENCE ) {
			if ( refs.indexOf( token.n ) === -1 ) {
				refs.unshift( token.n );
			}
		}

		list = token.o || token.m;
		if ( list ) {
			if ( isObject( list ) ) {
				getRefs( list, refs );
			} else {
				i = list.length;
				while ( i-- ) {
					getRefs( list[i], refs );
				}
			}
		}

		if ( token.x ) {
			getRefs( token.x, refs );
		}

		if ( token.r ) {
			getRefs( token.r, refs );
		}

		if ( token.v ) {
			getRefs( token.v, refs );
		}
	};


	stringify = function ( token, refs ) {
		var map = function ( item ) {
			return stringify( item, refs );
		};

		switch ( token.t ) {
			case BOOLEAN_LITERAL:
			case GLOBAL:
			case NUMBER_LITERAL:
			return token.v;

			case STRING_LITERAL:
			return "'" + token.v.replace( /'/g, "\\'" ) + "'";

			case ARRAY_LITERAL:
			return '[' + ( token.m ? token.m.map( map ).join( ',' ) : '' ) + ']';

			case OBJECT_LITERAL:
			return '{' + ( token.m ? token.m.map( map ).join( ',' ) : '' ) + '}';

			case KEY_VALUE_PAIR:
			return stringifyKey( token.k ) + ':' + stringify( token.v, refs );

			case PREFIX_OPERATOR:
			return ( token.s === 'typeof' ? 'typeof ' : token.s ) + stringify( token.o, refs );

			case INFIX_OPERATOR:
			return stringify( token.o[0], refs ) + ( token.s.substr( 0, 2 ) === 'in' ? ' ' + token.s + ' ' : token.s ) + stringify( token.o[1], refs );

			case INVOCATION:
			return stringify( token.x, refs ) + '(' + ( token.o ? token.o.map( map ).join( ',' ) : '' ) + ')';

			case BRACKETED:
			return '(' + stringify( token.x, refs ) + ')';

			case MEMBER:
			return stringify( token.x, refs ) + stringify( token.r, refs );

			case REFINEMENT:
			return ( token.n ? '.' + token.n : '[' + stringify( token.x, refs ) + ']' );

			case CONDITIONAL:
			return stringify( token.o[0], refs ) + '?' + stringify( token.o[1], refs ) + ':' + stringify( token.o[2], refs );

			case REFERENCE:
			return '${' + refs.indexOf( token.n ) + '}';

			default:
			console.log( token );
			throw new Error( 'Could not stringify expression token. This error is unexpected' );
		}
	};

	stringifyKey = function ( key ) {
		if ( key.t === STRING_LITERAL ) {
			return identifier.test( key.v ) ? key.v : '"' + key.v.replace( /"/g, '\\"' ) + '"';
		}

		if ( key.t === NUMBER_LITERAL ) {
			return key.v;
		}

		return key;
	};

	identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;

}());
var FragmentStub = function ( parser, preserveWhitespace ) {
	var items, item;

	items = this.items = [];

	item = getItem( parser, preserveWhitespace );
	while ( item !== null ) {
		items[ items.length ] = item;
		item = getItem( parser, preserveWhitespace );
	}
};

FragmentStub.prototype = {
	toJSON: function ( noStringify ) {
		var json;

		if ( this[ 'json_' + noStringify ] ) {
			return this[ 'json_' + noStringify ];
		}

		json = this[ 'json_' + noStringify ] = jsonifyStubs( this.items, noStringify );
		return json;
	},

	toString: function () {
		if ( this.str !== undefined ) {
			return this.str;
		}

		this.str = stringifyStubs( this.items );
		return this.str;
	}
};
var MustacheStub = function ( token, parser ) {
	this.type = ( token.type === TRIPLE ? TRIPLE : token.mustacheType );

	if ( token.ref ) {
		this.ref = token.ref;
	}
	
	if ( token.expression ) {
		this.expr = new ExpressionStub( token.expression );
	}

	parser.pos += 1;
};

MustacheStub.prototype = {
	toJSON: function () {
		var json;

		if ( this.json ) {
			return this.json;
		}

		json = {
			t: this.type
		};

		if ( this.ref ) {
			json.r = this.ref;
		}

		if ( this.expr ) {
			json.x = this.expr.toJSON();
		}

		this.json = json;
		return json;
	},

	toString: function () {
		// mustaches cannot be stringified
		return false;
	}
};
var SectionStub = function ( firstToken, parser, preserveWhitespace ) {
	var next;

	this.ref = firstToken.ref;
	this.indexRef = firstToken.indexRef;

	this.inverted = ( firstToken.mustacheType === INVERTED );

	if ( firstToken.expression ) {
		this.expr = new ExpressionStub( firstToken.expression );
	}

	parser.pos += 1;

	this.items = [];
	next = parser.next();

	while ( next ) {
		if ( next.mustacheType === CLOSING ) {
			if ( ( next.ref.trim() === this.ref ) || this.expr ) {
				parser.pos += 1;
				break;
			}

			else {
				throw new Error( 'Could not parse template: Illegal closing section' );
			}
		}

		this.items[ this.items.length ] = getItem( parser, preserveWhitespace );
		next = parser.next();
	}
};

SectionStub.prototype = {
	toJSON: function ( noStringify ) {
		var json;

		if ( this.json ) {
			return this.json;
		}

		json = { t: SECTION };

		if ( this.ref ) {
			json.r = this.ref;
		}

		if ( this.indexRef ) {
			json.i = this.indexRef;
		}

		if ( this.inverted ) {
			json.n = true;
		}

		if ( this.expr ) {
			json.x = this.expr.toJSON();
		}

		if ( this.items.length ) {
			json.f = jsonifyStubs( this.items, noStringify );
		}

		this.json = json;
		return json;
	},

	toString: function () {
		// sections cannot be stringified
		return false;
	}
};
var TextStub;

(function () {
	
	var htmlEntities, controlCharacters, namedEntityPattern, hexEntityPattern, decimalEntityPattern, validateCode, decodeCharacterReferences, whitespace;

	TextStub = function ( token, preserveWhitespace ) {
		this.type = TEXT;
		this.text = ( preserveWhitespace ? token.value : token.value.replace( whitespace, ' ' ) );
	};

	TextStub.prototype = {
		toJSON: function () {
			// this will be used within HTML, so we need to decode things like &amp;
			return this.decoded || ( this.decoded = decodeCharacterReferences( this.text) );
		},

		toString: function () {
			// this will be used as straight text
			return this.text;
		}
	};

	htmlEntities = { quot: 34, amp: 38, apos: 39, lt: 60, gt: 62, nbsp: 160, iexcl: 161, cent: 162, pound: 163, curren: 164, yen: 165, brvbar: 166, sect: 167, uml: 168, copy: 169, ordf: 170, laquo: 171, not: 172, shy: 173, reg: 174, macr: 175, deg: 176, plusmn: 177, sup2: 178, sup3: 179, acute: 180, micro: 181, para: 182, middot: 183, cedil: 184, sup1: 185, ordm: 186, raquo: 187, frac14: 188, frac12: 189, frac34: 190, iquest: 191, Agrave: 192, Aacute: 193, Acirc: 194, Atilde: 195, Auml: 196, Aring: 197, AElig: 198, Ccedil: 199, Egrave: 200, Eacute: 201, Ecirc: 202, Euml: 203, Igrave: 204, Iacute: 205, Icirc: 206, Iuml: 207, ETH: 208, Ntilde: 209, Ograve: 210, Oacute: 211, Ocirc: 212, Otilde: 213, Ouml: 214, times: 215, Oslash: 216, Ugrave: 217, Uacute: 218, Ucirc: 219, Uuml: 220, Yacute: 221, THORN: 222, szlig: 223, agrave: 224, aacute: 225, acirc: 226, atilde: 227, auml: 228, aring: 229, aelig: 230, ccedil: 231, egrave: 232, eacute: 233, ecirc: 234, euml: 235, igrave: 236, iacute: 237, icirc: 238, iuml: 239, eth: 240, ntilde: 241, ograve: 242, oacute: 243, ocirc: 244, otilde: 245, ouml: 246, divide: 247, oslash: 248, ugrave: 249, uacute: 250, ucirc: 251, uuml: 252, yacute: 253, thorn: 254, yuml: 255, OElig: 338, oelig: 339, Scaron: 352, scaron: 353, Yuml: 376, fnof: 402, circ: 710, tilde: 732, Alpha: 913, Beta: 914, Gamma: 915, Delta: 916, Epsilon: 917, Zeta: 918, Eta: 919, Theta: 920, Iota: 921, Kappa: 922, Lambda: 923, Mu: 924, Nu: 925, Xi: 926, Omicron: 927, Pi: 928, Rho: 929, Sigma: 931, Tau: 932, Upsilon: 933, Phi: 934, Chi: 935, Psi: 936, Omega: 937, alpha: 945, beta: 946, gamma: 947, delta: 948, epsilon: 949, zeta: 950, eta: 951, theta: 952, iota: 953, kappa: 954, lambda: 955, mu: 956, nu: 957, xi: 958, omicron: 959, pi: 960, rho: 961, sigmaf: 962, sigma: 963, tau: 964, upsilon: 965, phi: 966, chi: 967, psi: 968, omega: 969, thetasym: 977, upsih: 978, piv: 982, ensp: 8194, emsp: 8195, thinsp: 8201, zwnj: 8204, zwj: 8205, lrm: 8206, rlm: 8207, ndash: 8211, mdash: 8212, lsquo: 8216, rsquo: 8217, sbquo: 8218, ldquo: 8220, rdquo: 8221, bdquo: 8222, dagger: 8224, Dagger: 8225, bull: 8226, hellip: 8230, permil: 8240, prime: 8242, Prime: 8243, lsaquo: 8249, rsaquo: 8250, oline: 8254, frasl: 8260, euro: 8364, image: 8465, weierp: 8472, real: 8476, trade: 8482, alefsym: 8501, larr: 8592, uarr: 8593, rarr: 8594, darr: 8595, harr: 8596, crarr: 8629, lArr: 8656, uArr: 8657, rArr: 8658, dArr: 8659, hArr: 8660, forall: 8704, part: 8706, exist: 8707, empty: 8709, nabla: 8711, isin: 8712, notin: 8713, ni: 8715, prod: 8719, sum: 8721, minus: 8722, lowast: 8727, radic: 8730, prop: 8733, infin: 8734, ang: 8736, and: 8743, or: 8744, cap: 8745, cup: 8746, 'int': 8747, there4: 8756, sim: 8764, cong: 8773, asymp: 8776, ne: 8800, equiv: 8801, le: 8804, ge: 8805, sub: 8834, sup: 8835, nsub: 8836, sube: 8838, supe: 8839, oplus: 8853, otimes: 8855, perp: 8869, sdot: 8901, lceil: 8968, rceil: 8969, lfloor: 8970, rfloor: 8971, lang: 9001, rang: 9002, loz: 9674, spades: 9824, clubs: 9827, hearts: 9829, diams: 9830	};
	controlCharacters = [8364, 129, 8218, 402, 8222, 8230, 8224, 8225, 710, 8240, 352, 8249, 338, 141, 381, 143, 144, 8216, 8217, 8220, 8221, 8226, 8211, 8212, 732, 8482, 353, 8250, 339, 157, 382, 376];

	namedEntityPattern = new RegExp( '&(' + Object.keys( htmlEntities ).join( '|' ) + ');?', 'g' );
	hexEntityPattern     = /&#x([0-9]+);?/g;
	decimalEntityPattern = /&#([0-9]+);?/g;

	// some code points are verboten. If we were inserting HTML, the browser would replace the illegal
	// code points with alternatives in some cases - since we're bypassing that mechanism, we need
	// to replace them ourselves
	//
	// Source: http://en.wikipedia.org/wiki/Character_encodings_in_HTML#Illegal_characters
	validateCode = function ( code ) {
		if ( !code ) {
			return 65533;
		}

		// line feed becomes generic whitespace
		if ( code === 10 ) {
			return 32;
		}

		// ASCII range. (Why someone would use HTML entities for ASCII characters I don't know, but...)
		if ( code < 128 ) {
			return code;
		}

		// code points 128-159 are dealt with leniently by browsers, but they're incorrect. We need
		// to correct the mistake or we'll end up with missing € signs and so on
		if ( code <= 159 ) {
			return controlCharacters[ code - 128 ];
		}

		// basic multilingual plane
		if ( code < 55296 ) {
			return code;
		}

		// UTF-16 surrogate halves
		if ( code <= 57343 ) {
			return 65533;
		}

		// rest of the basic multilingual plane
		if ( code <= 65535 ) {
			return code;
		}

		// TODO it's... not exactly clear what should happen with code points over this value. The
		// following seems to work. But I can't guarantee it works in China!
		return 65533;
	};

	decodeCharacterReferences = function ( html ) {
		var result;

		// named entities
		result = html.replace( namedEntityPattern, function ( match, name ) {
			if ( htmlEntities[ name ] ) {
				return String.fromCharCode( htmlEntities[ name ] );
			}

			return match;
		});

		// hex references
		result = result.replace( hexEntityPattern, function ( match, hex ) {
			return String.fromCharCode( validateCode( parseInt( hex, 16 ) ) );
		});

		// decimal references
		result = result.replace( decimalEntityPattern, function ( match, charCode ) {
			return String.fromCharCode( validateCode( charCode ) );
		});

		return result;
	};

	whitespace = /\s+/g;

}());
getFragmentStubFromTokens = function ( tokens, options, preserveWhitespace ) {
	var parser, stub;

	parser = {
		pos: 0,
		tokens: tokens || [],
		next: function () {
			return parser.tokens[ parser.pos ];
		},
		options: options
	};

	stub = new FragmentStub( parser, preserveWhitespace );

	return stub;
};
var getExpression;

// expression
(function () {
	var getExpressionList,
	makePrefixSequenceMatcher,
	makeInfixSequenceMatcher,
	getBracketedExpression,
	getPrimary,
	getMemberOrInvocation,
	getTypeOf,
	getLogicalOr,
	getConditional,
	
	getDigits,
	getExponent,
	getFraction,
	getInteger,
	
	getReference,
	getRefinement,

	getLiteral,
	getArrayLiteral,
	getBooleanLiteral,
	getNumberLiteral,
	getStringLiteral,
	getObjectLiteral,

	getKeyValuePairs,
	getKeyValuePair,
	getKey,

	getName,

	getDotRefinement,
	getArrayRefinement,
	getArrayMember,

	globals;

	getExpression = function ( tokenizer ) {
		// The conditional operator is the lowest precedence operator (except yield,
		// assignment operators, and commas, none of which are supported), so we
		// start there. If it doesn't match, it 'falls through' to progressively
		// higher precedence operators, until it eventually matches (or fails to
		// match) a 'primary' - a literal or a reference. This way, the abstract syntax
		// tree has everything in its proper place, i.e. 2 + 3 * 4 === 14, not 20.
		return getConditional( tokenizer );
	};

	getExpressionList = function ( tokenizer ) {
		var start, expressions, expr, next;

		start = tokenizer.pos;

		allowWhitespace( tokenizer );

		expr = getExpression( tokenizer );

		if ( expr === null ) {
			return null;
		}

		expressions = [ expr ];

		// allow whitespace between expression and ','
		allowWhitespace( tokenizer );

		if ( getStringMatch( tokenizer, ',' ) ) {
			next = getExpressionList( tokenizer );
			if ( next === null ) {
				tokenizer.pos = start;
				return null;
			}

			expressions = expressions.concat( next );
		}

		return expressions;
	};

	getBracketedExpression = function ( tokenizer ) {
		var start, expr;

		start = tokenizer.pos;

		if ( !getStringMatch( tokenizer, '(' ) ) {
			return null;
		}

		allowWhitespace( tokenizer );

		expr = getExpression( tokenizer );
		if ( !expr ) {
			tokenizer.pos = start;
			return null;
		}

		allowWhitespace( tokenizer );

		if ( !getStringMatch( tokenizer, ')' ) ) {
			tokenizer.pos = start;
			return null;
		}

		return {
			t: BRACKETED,
			x: expr
		};
	};

	getPrimary = function ( tokenizer ) {
		return getLiteral( tokenizer )
		    || getReference( tokenizer )
		    || getBracketedExpression( tokenizer );
	};

	getMemberOrInvocation = function ( tokenizer ) {
		var current, expression, refinement, expressionList;

		expression = getPrimary( tokenizer );

		if ( !expression ) {
			return null;
		}

		while ( expression ) {
			current = tokenizer.pos;

			if ( refinement = getRefinement( tokenizer ) ) {
				expression = {
					t: MEMBER,
					x: expression,
					r: refinement
				};
			}

			else if ( getStringMatch( tokenizer, '(' ) ) {
				allowWhitespace( tokenizer );
				expressionList = getExpressionList( tokenizer );

				allowWhitespace( tokenizer );

				if ( !getStringMatch( tokenizer, ')' ) ) {
					tokenizer.pos = current;
					break;
				}

				expression = {
					t: INVOCATION,
					x: expression
				};

				if ( expressionList ) {
					expression.o = expressionList;
				}
			}

			else {
				break;
			}
		}

		return expression;
	};

	// right-to-left
	makePrefixSequenceMatcher = function ( symbol, fallthrough ) {
		return function ( tokenizer ) {
			var start, expression;

			if ( !getStringMatch( tokenizer, symbol ) ) {
				return fallthrough( tokenizer );
			}

			start = tokenizer.pos;

			allowWhitespace( tokenizer );

			expression = getExpression( tokenizer );
			if ( !expression ) {
				fail( tokenizer, 'an expression' );
			}

			return {
				s: symbol,
				o: expression,
				t: PREFIX_OPERATOR
			};
		};
	};

	// create all prefix sequence matchers
	(function () {
		var i, len, matcher, prefixOperators, fallthrough;

		prefixOperators = '! ~ + - typeof'.split( ' ' );

		// An invocation refinement is higher precedence than logical-not
		//fallthrough = getInvocationRefinement;
		fallthrough = getMemberOrInvocation;
		for ( i=0, len=prefixOperators.length; i<len; i+=1 ) {
			matcher = makePrefixSequenceMatcher( prefixOperators[i], fallthrough );
			fallthrough = matcher;
		}

		// typeof operator is higher precedence than multiplication, so provides the
		// fallthrough for the multiplication sequence matcher we're about to create
		// (we're skipping void and delete)
		getTypeOf = fallthrough;
	}());


	makeInfixSequenceMatcher = function ( symbol, fallthrough ) {
		return function ( tokenizer ) {
			var start, left, right;

			left = fallthrough( tokenizer );
			if ( !left ) {
				return null;
			}

			start = tokenizer.pos;

			allowWhitespace( tokenizer );

			if ( !getStringMatch( tokenizer, symbol ) ) {
				tokenizer.pos = start;
				return left;
			}

			// special case - in operator must not be followed by [a-zA-Z_$0-9]
			if ( symbol === 'in' && /[a-zA-Z_$0-9]/.test( tokenizer.remaining().charAt( 0 ) ) ) {
				tokenizer.pos = start;
				return left;
			}

			allowWhitespace( tokenizer );

			right = getExpression( tokenizer );
			if ( !right ) {
				tokenizer.pos = start;
				return left;
			}

			return {
				t: INFIX_OPERATOR,
				s: symbol,
				o: [ left, right ]
			};
		};
	};

	// create all infix sequence matchers
	(function () {
		var i, len, matcher, infixOperators, fallthrough;

		// All the infix operators on order of precedence (source: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Operator_Precedence)
		// Each sequence matcher will initially fall through to its higher precedence
		// neighbour, and only attempt to match if one of the higher precedence operators
		// (or, ultimately, a literal, reference, or bracketed expression) already matched
		infixOperators = '* / % + - << >> >>> < <= > >= in instanceof == != === !== & ^ | && ||'.split( ' ' );

		// A typeof operator is higher precedence than multiplication
		fallthrough = getTypeOf;
		for ( i=0, len=infixOperators.length; i<len; i+=1 ) {
			matcher = makeInfixSequenceMatcher( infixOperators[i], fallthrough );
			fallthrough = matcher;
		}

		// Logical OR is the fallthrough for the conditional matcher
		getLogicalOr = fallthrough;
	}());
	

	// The conditional operator is the lowest precedence operator, so we start here
	getConditional = function ( tokenizer ) {
		var start, expression, ifTrue, ifFalse;

		expression = getLogicalOr( tokenizer );
		if ( !expression ) {
			return null;
		}

		start = tokenizer.pos;

		allowWhitespace( tokenizer );

		if ( !getStringMatch( tokenizer, '?' ) ) {
			tokenizer.pos = start;
			return expression;
		}

		allowWhitespace( tokenizer );

		ifTrue = getExpression( tokenizer );
		if ( !ifTrue ) {
			tokenizer.pos = start;
			return expression;
		}

		allowWhitespace( tokenizer );

		if ( !getStringMatch( tokenizer, ':' ) ) {
			tokenizer.pos = start;
			return expression;
		}

		allowWhitespace( tokenizer );

		ifFalse = getExpression( tokenizer );
		if ( !ifFalse ) {
			tokenizer.pos = start;
			return expression;
		}

		return {
			t: CONDITIONAL,
			o: [ expression, ifTrue, ifFalse ]
		};
	};
	


	getDigits = getRegexMatcher( /^[0-9]+/ );
	getExponent = getRegexMatcher( /^[eE][\-+]?[0-9]+/ );
	getFraction = getRegexMatcher( /^\.[0-9]+/ );
	getInteger = getRegexMatcher( /^(0|[1-9][0-9]*)/ );


	// if a reference is a browser global, we don't deference it later, so it needs special treatment
	globals = /^(?:Array|Date|RegExp|decodeURIComponent|decodeURI|encodeURIComponent|encodeURI|isFinite|isNaN|parseFloat|parseInt|JSON|Math|NaN|undefined|null)$/;

	getReference = function ( tokenizer ) {
		var startPos, ancestor, name, dot, combo, refinement, lastDotIndex;

		startPos = tokenizer.pos;

		// we might have ancestor refs...
		ancestor = '';
		while ( getStringMatch( tokenizer, '../' ) ) {
			ancestor += '../';
		}

		if ( !ancestor ) {
			// we might have an implicit iterator or a restricted reference
			dot = getStringMatch( tokenizer, '.' ) || '';
		}

		name = getName( tokenizer ) || '';

		// if this is a browser global, stop here
		if ( !ancestor && !dot && globals.test( name ) ) {
			return {
				t: GLOBAL,
				v: name
			};
		}

		// allow the use of `this`
		if ( name === 'this' && !ancestor && !dot ) {
			name = '.';
			startPos += 3; // horrible hack to allow method invocations with `this` by ensuring combo.length is right!
		}

		combo = ( ancestor || dot ) + name;

		if ( !combo ) {
			return null;
		}

		while ( refinement = getDotRefinement( tokenizer ) || getArrayRefinement( tokenizer ) ) {
			combo += refinement;
		}

		if ( getStringMatch( tokenizer, '(' ) ) {
			
			// if this is a method invocation (as opposed to a function) we need
			// to strip the method name from the reference combo, else the context
			// will be wrong
			lastDotIndex = combo.lastIndexOf( '.' );
			if ( lastDotIndex !== -1 ) {
				combo = combo.substr( 0, lastDotIndex );
				tokenizer.pos = startPos + combo.length;
			} else {
				tokenizer.pos -= 1;
			}
		}

		return {
			t: REFERENCE,
			n: combo
		};
	};

	getRefinement = function ( tokenizer ) {
		var start, name, expr;

		start = tokenizer.pos;

		allowWhitespace( tokenizer );

		// "." name
		if ( getStringMatch( tokenizer, '.' ) ) {
			allowWhitespace( tokenizer );

			if ( name = getName( tokenizer ) ) {
				return {
					t: REFINEMENT,
					n: name
				};
			}

			fail( tokenizer, 'a property name' );
		}

		// "[" expression "]"
		if ( getStringMatch( tokenizer, '[' ) ) {
			allowWhitespace( tokenizer );

			expr = getExpression( tokenizer );
			if ( !expr ) {
				fail( tokenizer, 'an expression' );
			}

			allowWhitespace( tokenizer );

			if ( !getStringMatch( tokenizer, ']' ) ) {
				fail( tokenizer, '"]"' );
			}

			return {
				t: REFINEMENT,
				x: expr
			};
		}

		return null;
	};

	// Any literal except function and regexp literals, which aren't supported (yet?)
	getLiteral = function ( tokenizer ) {
		var literal = getNumberLiteral( tokenizer )   ||
		              getBooleanLiteral( tokenizer )  ||
		              getStringLiteral( tokenizer )   ||
		              getObjectLiteral( tokenizer )   ||
		              getArrayLiteral( tokenizer );

		return literal;
	};

	getArrayLiteral = function ( tokenizer ) {
		var start, expressionList;

		start = tokenizer.pos;

		// allow whitespace before '['
		allowWhitespace( tokenizer );

		if ( !getStringMatch( tokenizer, '[' ) ) {
			tokenizer.pos = start;
			return null;
		}

		expressionList = getExpressionList( tokenizer );

		if ( !getStringMatch( tokenizer, ']' ) ) {
			tokenizer.pos = start;
			return null;
		}

		return {
			t: ARRAY_LITERAL,
			m: expressionList
		};
	};

	getBooleanLiteral = function ( tokenizer ) {
		var remaining = tokenizer.remaining();

		if ( remaining.substr( 0, 4 ) === 'true' ) {
			tokenizer.pos += 4;
			return {
				t: BOOLEAN_LITERAL,
				v: 'true'
			};
		}

		if ( remaining.substr( 0, 5 ) === 'false' ) {
			tokenizer.pos += 5;
			return {
				t: BOOLEAN_LITERAL,
				v: 'false'
			};
		}

		return null;
	};

	getNumberLiteral = function ( tokenizer ) {
		var start, result;

		start = tokenizer.pos;

		// special case - we may have a decimal without a literal zero (because
		// some programmers are plonkers)
		if ( result = getFraction( tokenizer ) ) {
			return {
				t: NUMBER_LITERAL,
				v: result
			};
		}

		result = getInteger( tokenizer );
		if ( result === null ) {
			return null;
		}

		result += getFraction( tokenizer ) || '';
		result += getExponent( tokenizer ) || '';

		return {
			t: NUMBER_LITERAL,
			v: result
		};
	};

	getObjectLiteral = function ( tokenizer ) {
		var start, keyValuePairs;

		start = tokenizer.pos;

		// allow whitespace
		allowWhitespace( tokenizer );

		if ( !getStringMatch( tokenizer, '{' ) ) {
			tokenizer.pos = start;
			return null;
		}

		keyValuePairs = getKeyValuePairs( tokenizer );

		// allow whitespace between final value and '}'
		allowWhitespace( tokenizer );

		if ( !getStringMatch( tokenizer, '}' ) ) {
			tokenizer.pos = start;
			return null;
		}

		return {
			t: OBJECT_LITERAL,
			m: keyValuePairs
		};
	};

	getKeyValuePairs = function ( tokenizer ) {
		var start, pairs, pair, keyValuePairs;

		start = tokenizer.pos;

		pair = getKeyValuePair( tokenizer );
		if ( pair === null ) {
			return null;
		}

		pairs = [ pair ];

		if ( getStringMatch( tokenizer, ',' ) ) {
			keyValuePairs = getKeyValuePairs( tokenizer );

			if ( !keyValuePairs ) {
				tokenizer.pos = start;
				return null;
			}

			return pairs.concat( keyValuePairs );
		}

		return pairs;
	};

	getKeyValuePair = function ( tokenizer ) {
		var start, key, value;

		start = tokenizer.pos;

		// allow whitespace between '{' and key
		allowWhitespace( tokenizer );

		key = getKey( tokenizer );
		if ( key === null ) {
			tokenizer.pos = start;
			return null;
		}

		// allow whitespace between key and ':'
		allowWhitespace( tokenizer );

		// next character must be ':'
		if ( !getStringMatch( tokenizer, ':' ) ) {
			tokenizer.pos = start;
			return null;
		}

		// allow whitespace between ':' and value
		allowWhitespace( tokenizer );

		// next expression must be a, well... expression
		value = getExpression( tokenizer );
		if ( value === null ) {
			tokenizer.pos = start;
			return null;
		}

		return {
			t: KEY_VALUE_PAIR,
			k: key,
			v: value
		};
	};

	// http://mathiasbynens.be/notes/javascript-properties
	// can be any name, string literal, or number literal
	getKey = function ( tokenizer ) {
		return getName( tokenizer ) || getStringLiteral( tokenizer ) || getNumberLiteral( tokenizer );
	};

	getStringLiteral = function ( tokenizer ) {
		var start, string;

		start = tokenizer.pos;

		if ( getStringMatch( tokenizer, '"' ) ) {
			string = getDoubleQuotedString( tokenizer );
		
			if ( !getStringMatch( tokenizer, '"' ) ) {
				tokenizer.pos = start;
				return null;
			}

			return {
				t: STRING_LITERAL,
				v: string
			};
		}

		if ( getStringMatch( tokenizer, "'" ) ) {
			string = getSingleQuotedString( tokenizer );

			if ( !getStringMatch( tokenizer, "'" ) ) {
				tokenizer.pos = start;
				return null;
			}

			return {
				t: STRING_LITERAL,
				v: string
			};
		}

		return null;
	};

	getName = getRegexMatcher( /^[a-zA-Z_$][a-zA-Z_$0-9]*/ );

	getDotRefinement = getRegexMatcher( /^\.[a-zA-Z_$0-9]+/ );

	getArrayRefinement = function ( tokenizer ) {
		var num = getArrayMember( tokenizer );

		if ( num ) {
			return '.' + num;
		}

		return null;
	};

	getArrayMember = getRegexMatcher( /^\[(0|[1-9][0-9]*)\]/ );
	
}());
var getMustacheOrTriple;

// mustache / triple
(function () {
	var getMustache,
		getTriple,
		getMustacheContent,
		getMustacheType,
		getIndexRef,
		mustacheTypes,
		getDelimiter,
		getDelimiterChange;

	getMustacheOrTriple = function ( tokenizer ) {
		// if the triple delimiter (e.g. '{{{') is longer than the regular mustache
		// delimiter (e.g. '{{') then we need to try and find a triple first. Otherwise
		// we will get a false positive if the mustache delimiter is a substring of the
		// triple delimiter, as in the default case
		if ( tokenizer.tripleDelimiters[0].length > tokenizer.delimiters[0].length ) {
			return getTriple( tokenizer ) || getMustache( tokenizer );
		}

		return getMustache( tokenizer ) || getTriple( tokenizer );
	};

	getMustache = function ( tokenizer ) {
		var start = tokenizer.pos, content;

		if ( !getStringMatch( tokenizer, tokenizer.delimiters[0] ) ) {
			return null;
		}

		// delimiter change?
		content = getDelimiterChange( tokenizer );
		if ( content ) {
			// find closing delimiter or abort...
			if ( !getStringMatch( tokenizer, tokenizer.delimiters[1] ) ) {
				tokenizer.pos = start;
				return null;
			}

			// ...then make the switch
			tokenizer.delimiters = content;
			return { type: MUSTACHE, mustacheType: DELIMCHANGE };
		}

		content = getMustacheContent( tokenizer );

		if ( content === null ) {
			tokenizer.pos = start;
			return null;
		}

		// allow whitespace before closing delimiter
		allowWhitespace( tokenizer );

		if ( !getStringMatch( tokenizer, tokenizer.delimiters[1] ) ) {
			fail( tokenizer, '"' + tokenizer.delimiters[1] + '"' );
		}

		return content;
	};

	getTriple = function ( tokenizer ) {
		var start = tokenizer.pos, content;

		if ( !getStringMatch( tokenizer, tokenizer.tripleDelimiters[0] ) ) {
			return null;
		}

		// delimiter change?
		content = getDelimiterChange( tokenizer );
		if ( content ) {
			// find closing delimiter or abort...
			if ( !getStringMatch( tokenizer, tokenizer.tripleDelimiters[1] ) ) {
				tokenizer.pos = start;
				return null;
			}

			// ...then make the switch
			tokenizer.tripleDelimiters = content;
			return { type: MUSTACHE, mustacheType: DELIMCHANGE };
		}

		// allow whitespace between opening delimiter and reference
		allowWhitespace( tokenizer );

		content = getMustacheContent( tokenizer, true );

		if ( content === null ) {
			tokenizer.pos = start;
			return null;
		}

		// allow whitespace between reference and closing delimiter
		allowWhitespace( tokenizer );

		if ( !getStringMatch( tokenizer, tokenizer.tripleDelimiters[1] ) ) {
			tokenizer.pos = start;
			return null;
		}

		return content;
	};

	getMustacheContent = function ( tokenizer, isTriple ) {
		var start, mustache, type, expr, i, remaining, index;

		start = tokenizer.pos;

		mustache = { type: isTriple ? TRIPLE : MUSTACHE };

		// mustache type
		if ( !isTriple ) {
			type = getMustacheType( tokenizer );
			mustache.mustacheType = type || INTERPOLATOR; // default

			// if it's a comment or a section closer, allow any contents except '}}'
			if ( type === COMMENT || type === CLOSING ) {
				remaining = tokenizer.remaining();
				index = remaining.indexOf( tokenizer.delimiters[1] );

				if ( index !== -1 ) {
					mustache.ref = remaining.substr( 0, index );
					tokenizer.pos += index;
					return mustache;
				}
			}
		}

		// allow whitespace
		allowWhitespace( tokenizer );

		// get expression
		expr = getExpression( tokenizer );

		while ( expr.t === BRACKETED && expr.x ) {
			expr = expr.x;
		}

		if ( expr.t === REFERENCE ) {
			mustache.ref = expr.n;
		} else {
			mustache.expression = expr;
		}

		// optional index reference
		i = getIndexRef( tokenizer );
		if ( i !== null ) {
			mustache.indexRef = i;
		}

		return mustache;
	};

	mustacheTypes = {
		'#': SECTION,
		'^': INVERTED,
		'/': CLOSING,
		'>': PARTIAL,
		'!': COMMENT,
		'&': INTERPOLATOR
	};

	getMustacheType = function ( tokenizer ) {
		var type = mustacheTypes[ tokenizer.str.charAt( tokenizer.pos ) ];

		if ( !type ) {
			return null;
		}

		tokenizer.pos += 1;
		return type;
	};

	getIndexRef = getRegexMatcher( /^\s*:\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/ );

	getDelimiter = getRegexMatcher( /^[^\s=]+/ );

	getDelimiterChange = function ( tokenizer ) {
		var start, opening, closing;

		if ( !getStringMatch( tokenizer, '=' ) ) {
			return null;
		}

		start = tokenizer.pos;

		// allow whitespace before new opening delimiter
		allowWhitespace( tokenizer );

		opening = getDelimiter( tokenizer );
		if ( !opening ) {
			tokenizer.pos = start;
			return null;
		}

		// allow whitespace (in fact, it's necessary...)
		allowWhitespace( tokenizer );

		closing = getDelimiter( tokenizer );
		if ( !closing ) {
			tokenizer.pos = start;
			return null;
		}

		// allow whitespace before closing '='
		allowWhitespace( tokenizer );

		if ( !getStringMatch( tokenizer, '=' ) ) {
			tokenizer.pos = start;
			return null;
		}

		return [ opening, closing ];
	};

}());
var getTag;

(function () {
	var getOpeningTag,
	getClosingTag,
	getTagName,
	getAttributes,
	getAttribute,
	getAttributeName,
	getAttributeValue,
	getUnquotedAttributeValue,
	getUnquotedAttributeValueToken,
	getUnquotedAttributeValueText,
	getQuotedStringToken,
	getQuotedAttributeValue;

	getTag = function ( tokenizer ) {
		return getOpeningTag( tokenizer ) || getClosingTag( tokenizer );
	};

	getOpeningTag = function ( tokenizer ) {
		var start, tag, attrs;

		start = tokenizer.pos;

		if ( !getStringMatch( tokenizer, '<' ) ) {
			return null;
		}

		tag = {
			type: TAG
		};

		// tag name
		tag.name = getTagName( tokenizer );
		if ( !tag.name ) {
			tokenizer.pos = start;
			return null;
		}

		// attributes
		attrs = getAttributes( tokenizer );
		if ( attrs ) {
			tag.attrs = attrs;
		}

		// allow whitespace before closing solidus
		allowWhitespace( tokenizer );

		// self-closing solidus?
		if ( getStringMatch( tokenizer, '/' ) ) {
			tag.selfClosing = true;
		}

		// closing angle bracket
		if ( !getStringMatch( tokenizer, '>' ) ) {
			tokenizer.pos = start;
			return null;
		}

		return tag;
	};

	getClosingTag = function ( tokenizer ) {
		var start, tag;

		start = tokenizer.pos;

		if ( !getStringMatch( tokenizer, '<' ) ) {
			return null;
		}

		tag = { type: TAG, closing: true };

		// closing solidus
		if ( !getStringMatch( tokenizer, '/' ) ) {
			throw new Error( 'Unexpected character ' + tokenizer.remaining().charAt( 0 ) + ' (expected "/")' );
		}

		// tag name
		tag.name = getTagName( tokenizer );
		if ( !tag.name ) {
			throw new Error( 'Unexpected character ' + tokenizer.remaining().charAt( 0 ) + ' (expected tag name)' );
		}

		// closing angle bracket
		if ( !getStringMatch( tokenizer, '>' ) ) {
			throw new Error( 'Unexpected character ' + tokenizer.remaining().charAt( 0 ) + ' (expected ">")' );
		}

		return tag;
	};

	getTagName = getRegexMatcher( /^[a-zA-Z][a-zA-Z0-9\-]*/ );

	getAttributes = function ( tokenizer ) {
		var start, attrs, attr;

		start = tokenizer.pos;

		allowWhitespace( tokenizer );

		attr = getAttribute( tokenizer );

		if ( !attr ) {
			tokenizer.pos = start;
			return null;
		}

		attrs = [];

		while ( attr !== null ) {
			attrs[ attrs.length ] = attr;

			allowWhitespace( tokenizer );
			attr = getAttribute( tokenizer );
		}

		return attrs;
	};

	getAttribute = function ( tokenizer ) {
		var attr, name, value;

		name = getAttributeName( tokenizer );
		if ( !name ) {
			return null;
		}

		attr = {
			name: name
		};

		value = getAttributeValue( tokenizer );
		if ( value ) {
			attr.value = value;
		}

		return attr;
	};

	getAttributeName = getRegexMatcher( /^[^\s"'>\/=]+/ );

	

	getAttributeValue = function ( tokenizer ) {
		var start, value;

		start = tokenizer.pos;

		allowWhitespace( tokenizer );

		if ( !getStringMatch( tokenizer, '=' ) ) {
			tokenizer.pos = start;
			return null;
		}

		allowWhitespace( tokenizer );

		value = getQuotedAttributeValue( tokenizer, "'" ) ||
		        getQuotedAttributeValue( tokenizer, '"' ) ||
		        getUnquotedAttributeValue( tokenizer );
		
		if ( value === null ) {
			tokenizer.pos = start;
			return null;
		}

		return value;
	};

	getUnquotedAttributeValueText = getRegexMatcher( /^[^\s"'=<>`]+/ );

	getUnquotedAttributeValueToken = function ( tokenizer ) {
		var start, text, index;

		start = tokenizer.pos;

		text = getUnquotedAttributeValueText( tokenizer );

		if ( !text ) {
			return null;
		}

		if ( ( index = text.indexOf( tokenizer.delimiters[0] ) ) !== -1 ) {
			text = text.substr( 0, index );
			tokenizer.pos = start + text.length;
		}

		return {
			type: TEXT,
			value: text
		};
	};

	getUnquotedAttributeValue = function ( tokenizer ) {
		var tokens, token;

		tokens = [];

		token = getMustacheOrTriple( tokenizer ) || getUnquotedAttributeValueToken( tokenizer );
		while ( token !== null ) {
			tokens[ tokens.length ] = token;
			token = getMustacheOrTriple( tokenizer ) || getUnquotedAttributeValueToken( tokenizer );
		}

		if ( !tokens.length ) {
			return null;
		}

		return tokens;
	};

	getQuotedAttributeValue = function ( tokenizer, quoteMark ) {
		var start, tokens, token;

		start = tokenizer.pos;

		if ( !getStringMatch( tokenizer, quoteMark ) ) {
			return null;
		}

		tokens = [];

		token = getMustacheOrTriple( tokenizer ) || getQuotedStringToken( tokenizer, quoteMark );
		while ( token !== null ) {
			tokens[ tokens.length ] = token;
			token = getMustacheOrTriple( tokenizer ) || getQuotedStringToken( tokenizer, quoteMark );
		}

		if ( !getStringMatch( tokenizer, quoteMark ) ) {
			tokenizer.pos = start;
			return null;
		}

		return tokens;
	};

	getQuotedStringToken = function ( tokenizer, quoteMark ) {
		var start, index, remaining;

		start = tokenizer.pos;
		remaining = tokenizer.remaining();

		index = getLowestIndex( remaining, [ quoteMark, tokenizer.delimiters[0], tokenizer.delimiters[1] ] );

		if ( index === -1 ) {
			throw new Error( 'Quoted attribute value must have a closing quote' );
		}

		if ( !index ) {
			return null;
		}

		tokenizer.pos += index;

		return {
			type: TEXT,
			value: remaining.substr( 0, index )
		};
	};

}());
var getText = function ( tokenizer ) {
	var index, remaining;

	remaining = tokenizer.remaining();

	index = getLowestIndex( remaining, [ '<', tokenizer.delimiters[0], tokenizer.tripleDelimiters[0] ] );

	if ( !index ) {
		return null;
	}

	if ( index === -1 ) {
		index = remaining.length;
	}

	tokenizer.pos += index;
	return {
		type: TEXT,
		value: remaining.substr( 0, index )
	};
};
getToken = function ( tokenizer ) {
	var token = getMustacheOrTriple( tokenizer ) ||
	        getTag( tokenizer ) ||
	        getText( tokenizer );

	return token;
};
// TODO establish whether we actually need this (and siblings)
var getDoubleQuotedString = function ( tokenizer ) {
	var start, string, escaped, unescaped, next;

	start = tokenizer.pos;

	string = '';

	escaped = getEscapedChars( tokenizer );
	if ( escaped ) {
		string += escaped;
	}

	unescaped = getUnescapedDoubleQuotedChars( tokenizer );
	if ( unescaped ) {
		string += unescaped;
	}

	if ( !string ) {
		return '';
	}

	next = getDoubleQuotedString( tokenizer );
	while ( next !== '' ) {
		string += next;
	}

	return string;
};

var getUnescapedDoubleQuotedChars = getRegexMatcher( /^[^\\"]+/ );
var getEscapedChar = function ( tokenizer ) {
	var character;

	if ( !getStringMatch( tokenizer, '\\' ) ) {
		return null;
	}

	character = tokenizer.str.charAt( tokenizer.pos );
	tokenizer.pos += 1;

	return character;
};
var getEscapedChars = function ( tokenizer ) {
	var chars = '', character;

	character = getEscapedChar( tokenizer );
	while ( character ) {
		chars += character;
		character = getEscapedChar( tokenizer );
	}

	return chars || null;
};
var getLowestIndex = function ( haystack, needles ) {
	var i, index, lowest;

	i = needles.length;
	while ( i-- ) {
		index = haystack.indexOf( needles[i] );
		
		// short circuit
		if ( !index ) {
			return 0;
		}

		if ( index === -1 ) {
			continue;
		}
		
		if ( !lowest || ( index < lowest ) ) {
			lowest = index;
		}
	}

	return lowest || -1;
};
var getSingleQuotedString = function ( tokenizer ) {
	var start, string, escaped, unescaped, next;

	start = tokenizer.pos;

	string = '';

	escaped = getEscapedChars( tokenizer );
	if ( escaped ) {
		string += escaped;
	}

	unescaped = getUnescapedSingleQuotedChars( tokenizer );
	if ( unescaped ) {
		string += unescaped;
	}
	if ( string ) {
		next = getSingleQuotedString( tokenizer );
		while ( next ) {
			string += next;
			next = getSingleQuotedString( tokenizer );
		}
	}

	return string;
};

var getUnescapedSingleQuotedChars = getRegexMatcher( /^[^\\']+/ );
// Ractive.parse
// ===============
//
// Takes in a string, and returns an object representing the parsed template.
// A parsed template is an array of 1 or more 'descriptors', which in some
// cases have children.
//
// The format is optimised for size, not readability, however for reference the
// keys for each descriptor are as follows:
//
// * r - Reference, e.g. 'mustache' in {{mustache}}
// * t - Type code (e.g. 1 is text, 2 is interpolator...)
// * f - Fragment. Contains a descriptor's children
// * e - Element name
// * a - map of element Attributes, or proxy event/transition Arguments
// * d - Dynamic proxy event/transition arguments
// * n - indicates an iNverted section
// * i - Index reference, e.g. 'num' in {{#section:num}}content{{/section}}
// * v - eVent proxies (i.e. when user e.g. clicks on a node, fire proxy event)
// * c - Conditionals (e.g. ['yes', 'no'] in {{condition ? yes : no}})
// * x - eXpressions
// * t1 - intro Transition
// * t2 - outro Transition

(function () {

	var onlyWhitespace, inlinePartialStart, inlinePartialEnd, parseCompoundTemplate;

	onlyWhitespace = /^\s*$/;

	inlinePartialStart = /<!--\s*\{\{\s*>\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}\}\s*-->/;
	inlinePartialEnd = /<!--\s*\{\{\s*\/\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}\}\s*-->/;

	parse = function ( template, options ) {
		var tokens, fragmentStub, json, token;

		options = options || {};

		// does this template include inline partials?
		if ( inlinePartialStart.test( template ) ) {
			return parseCompoundTemplate( template, options );
		}


		if ( options.sanitize === true ) {
			options.sanitize = {
				// blacklist from https://code.google.com/p/google-caja/source/browse/trunk/src/com/google/caja/lang/html/html4-elements-whitelist.json
				elements: 'applet base basefont body frame frameset head html isindex link meta noframes noscript object param script style title'.split( ' ' ),
				eventAttributes: true
			};
		}

		tokens = tokenize( template, options );

		if ( !options.preserveWhitespace ) {
			// remove first token if it only contains whitespace
			token = tokens[0];
			if ( token && ( token.type === TEXT ) && onlyWhitespace.test( token.value ) ) {
				tokens.shift();
			}

			// ditto last token
			token = tokens[ tokens.length - 1 ];
			if ( token && ( token.type === TEXT ) && onlyWhitespace.test( token.value ) ) {
				tokens.pop();
			}
		}
		
		fragmentStub = getFragmentStubFromTokens( tokens, options, options.preserveWhitespace );
		
		json = fragmentStub.toJSON();

		if ( typeof json === 'string' ) {
			// If we return it as a string, Ractive will attempt to reparse it!
			// Instead we wrap it in an array. Ractive knows what to do then
			return [ json ];
		}

		return json;
	};

	
	parseCompoundTemplate = function ( template, options ) {
		var mainTemplate, remaining, partials, name, startMatch, endMatch;

		partials = {};

		mainTemplate = '';
		remaining = template;

		while ( startMatch = inlinePartialStart.exec( remaining ) ) {
			name = startMatch[1];

			mainTemplate += remaining.substr( 0, startMatch.index );
			remaining = remaining.substring( startMatch.index + startMatch[0].length );

			endMatch = inlinePartialEnd.exec( remaining );

			if ( !endMatch || endMatch[1] !== name ) {
				throw new Error( 'Inline partials must have a closing delimiter, and cannot be nested' );
			}

			partials[ name ] = parse( remaining.substr( 0, endMatch.index ), options );

			remaining = remaining.substring( endMatch.index + endMatch[0].length );
		}

		return {
			main: parse( mainTemplate, options ),
			partials: partials
		};
	};

}());
tokenize = function ( template, options ) {
	var tokenizer, tokens, token, last20, next20;

	options = options || {};

	tokenizer = {
		str: stripHtmlComments( template ),
		pos: 0,
		delimiters: options.delimiters || Ractive.delimiters,
		tripleDelimiters: options.tripleDelimiters || Ractive.tripleDelimiters,
		remaining: function () {
			return tokenizer.str.substring( tokenizer.pos );
		}
	};

	tokens = [];

	while ( tokenizer.pos < tokenizer.str.length ) {
		token = getToken( tokenizer );

		if ( token === null && tokenizer.remaining() ) {
			last20 = tokenizer.str.substr( 0, tokenizer.pos ).substr( -20 );
			if ( last20.length === 20 ) {
				last20 = '...' + last20;
			}

			next20 = tokenizer.remaining().substr( 0, 20 );
			if ( next20.length === 20 ) {
				next20 = next20 + '...';
			}

			throw new Error( 'Could not parse template: ' + ( last20 ? last20 + '<- ' : '' ) + 'failed at character ' + tokenizer.pos + ' ->' + next20 );
		}

		tokens[ tokens.length ] = token;
	}

	stripStandalones( tokens );
	stripCommentTokens( tokens );

	return tokens;
};
Ractive.prototype = proto;

// Shared properties
Ractive.partials = {};
Ractive.delimiters = [ '{{', '}}' ];
Ractive.tripleDelimiters = [ '{{{', '}}}' ];

// Plugins
Ractive.adaptors = adaptors;
Ractive.eventDefinitions = eventDefinitions;
Ractive.easing = easing;
Ractive.transitions = transitions;

// Static methods
Ractive.extend = extend;
Ractive.interpolate = interpolate;
Ractive.interpolators = interpolators;
Ractive.parse = parse;

Ractive.VERSION = VERSION;


// export as Common JS module...
if ( typeof module !== "undefined" && module.exports ) {
	module.exports = Ractive;
}

// ... or as AMD module
else if ( typeof define === "function" && define.amd ) {
	define( function () {
		return Ractive;
	});
}

// ... or as browser global
else {
	global.Ractive = Ractive;
}

}( typeof window !== 'undefined' ? window : this ));