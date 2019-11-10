/**
 * @license jCanvas v15.12.12
 * Copyright 2015 Caleb Evans
 * Released under the MIT license
 */
(function( jQuery, global, factory ) {

	if ( typeof module === 'object' && typeof module.exports === 'object' ) {
		module.exports = function( jQuery, w ) {
			return factory( jQuery, w );
		};
	} else {
		factory( jQuery, global );
	}

// Pass this if window is not defined yet
}( typeof window !== 'undefined' ? window.jQuery : {}, typeof window !== 'undefined' ? window : this, function( $, window ) {

var document = window.document,
    Image = window.Image,
    Array = window.Array,
    getComputedStyle = window.getComputedStyle,
    Math = window.Math,
	Number = window.Number,
    parseFloat = window.parseFloat,
    TRUE = true,
    FALSE = false,
    NULL = null,
	// jshint -W080
    UNDEFINED = undefined;

// Define local aliases to frequently used properties
var defaults,
	// Aliases to jQuery methods
	extendObject = $.extend,
	inArray = $.inArray,
	typeOf = function ( operand ) {
		return Object.prototype.toString.call( operand )
			.slice( 8, -1 ).toLowerCase();
	},
	isFunction = $.isFunction,
	isPlainObject = $.isPlainObject,
	// Math constants and functions
	PI = Math.PI,
	round = Math.round,
	abs = Math.abs,
	sin = Math.sin,
	cos = Math.cos,
	atan2 = Math.atan2,
	// The Array slice() method
	arraySlice = Array.prototype.slice,
	// jQuery's internal event normalization function
	jQueryEventFix = $.event.fix,
	// Object for storing a number of internal property maps
	maps = {},
	// jQuery internal caches
	caches = {
		dataCache: {},
		propCache: {},
		imageCache: {}
	},
	// Base transformations
	baseTransforms = {
		rotate: 0,
		scaleX: 1,
		scaleY: 1,
		translateX: 0,
		translateY: 0,
		// Store all previous masks
		masks: []
	},
	// Object for storing CSS-related properties
	css = {},
	tangibleEvents = [
		'mousedown',
		'mousemove',
		'mouseup',
		'mouseover',
		'mouseout',
		'touchstart',
		'touchmove',
		'touchend'
	];

// Constructor for creating objects that inherit from jCanvas preferences and defaults
function jCanvasObject( args ) {
	var params = this,
		propName;
	// Copy the given parameters into new object
	for ( propName in args ) {
		// Do not merge defaults into parameters
		if ( args.hasOwnProperty( propName ) ) {
			params[ propName ] = args[ propName ];
		}
	}
	return params;
}

// jCanvas object in which global settings are other data are stored
var jCanvas = {
	// Events object for storing jCanvas event initiation functions
	events: {},
	// Object containing all jCanvas event hooks
	eventHooks: {},
	// Settings for enabling future jCanvas features
	future: {}
};

// jCanvas default property values
function jCanvasDefaults() {
	extendObject( this, jCanvasDefaults.baseDefaults );
}
jCanvasDefaults.baseDefaults = {
	align: 'center',
	arrowAngle: 90,
	arrowRadius: 0,
	autosave: TRUE,
	baseline: 'middle',
	bringToFront: FALSE,
	ccw: FALSE,
	closed: FALSE,
	compositing: 'source-over',
	concavity: 0,
	cornerRadius: 0,
	count: 1,
	cropFromCenter: TRUE,
	crossOrigin: NULL,
	cursors: NULL,
	disableEvents: FALSE,
	draggable: FALSE,
	dragGroups: NULL,
	groups: NULL,
	data: NULL,
	dx: NULL,
	dy: NULL,
	end: 360,
	eventX: NULL,
	eventY: NULL,
	fillStyle: 'transparent',
	fontStyle: 'normal',
	fontSize: '12pt',
	fontFamily: 'sans-serif',
	fromCenter: TRUE,
	height: NULL,
	imageSmoothing: TRUE,
	inDegrees: TRUE,
	intangible: FALSE,
	index: NULL,
	letterSpacing: NULL,
	lineHeight: 1,
	layer: FALSE,
	mask: FALSE,
	maxWidth: NULL,
	miterLimit: 10,
	name: NULL,
	opacity: 1,
	r1: NULL,
	r2: NULL,
	radius: 0,
	repeat: 'repeat',
	respectAlign: FALSE,
	restrictDragToAxis: null,
	rotate: 0,
	rounded: FALSE,
	scale: 1,
	scaleX: 1,
	scaleY: 1,
	shadowBlur: 0,
	shadowColor: 'transparent',
	shadowStroke: FALSE,
	shadowX: 0,
	shadowY: 0,
	sHeight: NULL,
	sides: 0,
	source: '',
	spread: 0,
	start: 0,
	strokeCap: 'butt',
	strokeDash: NULL,
	strokeDashOffset: 0,
	strokeJoin: 'miter',
	strokeStyle: 'transparent',
	strokeWidth: 1,
	sWidth: NULL,
	sx: NULL,
	sy: NULL,
	text: '',
	translate: 0,
	translateX: 0,
	translateY: 0,
	type: NULL,
	visible: TRUE,
	width: NULL,
	x: 0,
	y: 0
};
defaults = new jCanvasDefaults();
jCanvasObject.prototype = defaults;

/* Internal helper methods */

// Determines if the given operand is a string
function isString( operand ) {
	return ( typeOf( operand ) === 'string' );
}

// Determines if the given operand is numeric
function isNumeric( operand ) {
	return !isNaN( Number( operand ) ) && !isNaN( parseFloat( operand ) );
}

// Get 2D context for the given canvas
function _getContext( canvas ) {
	return ( canvas && canvas.getContext ? canvas.getContext( '2d' ) : NULL );
}

// Coerce designated number properties from strings to numbers
function _coerceNumericProps( props ) {
	var propName, propType, propValue;
	// Loop through all properties in given property map
	for ( propName in props ) {
		if ( props.hasOwnProperty( propName ) ) {
			propValue = props[ propName ];
			propType = typeOf( propValue );
			// If property is non-empty string and value is numeric
			if ( propType === 'string' && isNumeric( propValue ) && propName !== 'text' ) {
				// Convert value to number
				props[ propName ] = parseFloat( propValue );
			}
		}
	}
	// Ensure value of text property is always a string
	if ( props.text !== undefined ) {
		props.text = String(props.text);
	}
}

// Clone the given transformations object
function _cloneTransforms( transforms ) {
	// Clone the object itself
	transforms = extendObject( {}, transforms );
	// Clone the object's masks array
	transforms.masks = transforms.masks.slice( 0 );
	return transforms;
}

// Save canvas context and update transformation stack
function _saveCanvas( ctx, data ) {
	var transforms;
	ctx.save();
	transforms = _cloneTransforms( data.transforms );
	data.savedTransforms.push( transforms );
}

// Restore canvas context update transformation stack
function _restoreCanvas( ctx, data ) {
	if ( data.savedTransforms.length === 0 ) {
		// Reset transformation state if it can't be restored any more
		data.transforms = _cloneTransforms( baseTransforms );
	} else {
		// Restore canvas context
		ctx.restore();
		// Restore current transform state to the last saved state
		data.transforms = data.savedTransforms.pop();
	}
}

// Set the style with the given name
function _setStyle( canvas, ctx, params, styleName ) {
	if ( params[ styleName ] ) {
		if ( isFunction( params[ styleName ] ) ) {
			// Handle functions
			ctx[ styleName ] = params[ styleName ].call( canvas, params );
		} else {
			// Handle string values
			ctx[ styleName ] = params[ styleName ];
		}
	}
}

// Set canvas context properties
function _setGlobalProps( canvas, ctx, params ) {
	_setStyle( canvas, ctx, params, 'fillStyle' );
	_setStyle( canvas, ctx, params, 'strokeStyle' );
	ctx.lineWidth = params.strokeWidth;
	// Optionally round corners for paths
	if ( params.rounded ) {
		ctx.lineCap = ctx.lineJoin = 'round';
	} else {
		ctx.lineCap = params.strokeCap;
		ctx.lineJoin = params.strokeJoin;
		ctx.miterLimit = params.miterLimit;
	}
	// Reset strokeDash if null
	if ( !params.strokeDash ) {
		params.strokeDash = [];
	}
	// Dashed lines
	if ( ctx.setLineDash ) {
		ctx.setLineDash( params.strokeDash );
	}
	ctx.webkitLineDash = ctx.mozDash = params.strokeDash;
	ctx.lineDashOffset = ctx.webkitLineDashOffset = ctx.mozDashOffset = params.strokeDashOffset;
	// Drop shadow
	ctx.shadowOffsetX = params.shadowX;
	ctx.shadowOffsetY = params.shadowY;
	ctx.shadowBlur = params.shadowBlur;
	ctx.shadowColor = params.shadowColor;
	// Opacity and composite operation
	ctx.globalAlpha = params.opacity;
	ctx.globalCompositeOperation = params.compositing;
	// Support cross-browser toggling of image smoothing
	if ( params.imageSmoothing ) {
		ctx.imageSmoothingEnabled = ctx.mozImageSmoothingEnabled = params.imageSmoothingEnabled;
	}
}

// Optionally enable masking support for this path
function _enableMasking( ctx, data, params ) {
	if ( params.mask ) {
		// If jCanvas autosave is enabled
		if ( params.autosave ) {
			// Automatically save transformation state by default
			_saveCanvas( ctx, data );
		}
		// Clip the current path
		ctx.clip();
		// Keep track of current masks
		data.transforms.masks.push( params._args );
	}
}

// Restore individual shape transformation
function _restoreTransform( ctx, params ) {
	// If shape has been transformed by jCanvas
	if ( params._transformed ) {
		// Restore canvas context
		ctx.restore();
	}
}

// Close current canvas path
function _closePath( canvas, ctx, params ) {
	var data;

	// Optionally close path
	if ( params.closed ) {
		ctx.closePath();
	}

	if ( params.shadowStroke && params.strokeWidth !== 0 ) {
		// Extend the shadow to include the stroke of a drawing

		// Add a stroke shadow by stroking before filling
		ctx.stroke();
		ctx.fill();
		// Ensure the below stroking does not inherit a shadow
		ctx.shadowColor = 'transparent';
		ctx.shadowBlur = 0;
		// Stroke over fill as usual
		ctx.stroke();

	} else {
		// If shadowStroke is not enabled, stroke & fill as usual

		ctx.fill();
		// Prevent extra shadow created by stroke ( but only when fill is present )
		if ( params.fillStyle !== 'transparent' ) {
			ctx.shadowColor = 'transparent';
		}
		if ( params.strokeWidth !== 0 ) {
			// Only stroke if the stroke is not 0
			ctx.stroke();
		}

	}

	// Optionally close path
	if ( !params.closed ) {
		ctx.closePath();
	}

	// Restore individual shape transformation
	_restoreTransform( ctx, params );

	// Mask shape if chosen
	if ( params.mask ) {
		// Retrieve canvas data
		data = _getCanvasData( canvas );
		_enableMasking( ctx, data, params );
	}

}

// Transform ( translate, scale, or rotate ) shape
function _transformShape( canvas, ctx, params, width, height ) {

	// Get conversion factor for radians
	params._toRad = ( params.inDegrees ? ( PI / 180 ) : 1 );

	params._transformed = TRUE;
	ctx.save();

	// Optionally measure ( x, y ) position from top-left corner
	if ( !params.fromCenter && !params._centered && width !== UNDEFINED ) {
		// Always draw from center unless otherwise specified
		if ( height === UNDEFINED ) {
			height = width;
		}
		params.x += width / 2;
		params.y += height / 2;
		params._centered = TRUE;
	}
	// Optionally rotate shape
	if ( params.rotate ) {
		_rotateCanvas( ctx, params, NULL );
	}
	// Optionally scale shape
	if ( params.scale !== 1 || params.scaleX !== 1 || params.scaleY !== 1 ) {
		_scaleCanvas( ctx, params, NULL );
	}
	// Optionally translate shape
	if ( params.translate || params.translateX || params.translateY ) {
		_translateCanvas( ctx, params, NULL );
	}

}

/* Plugin API */

// Extend jCanvas with a user-defined method
jCanvas.extend = function extend( plugin ) {

	// Create plugin
	if ( plugin.name ) {
		// Merge properties with defaults
		if ( plugin.props ) {
			extendObject( defaults, plugin.props );
		}
		// Define plugin method
		$.fn[ plugin.name ] = function self( args ) {
			var $canvases = this, canvas, e, ctx,
				params, layer;

			for ( e = 0; e < $canvases.length; e += 1 ) {
				canvas = $canvases[ e ];
				ctx = _getContext( canvas );
				if ( ctx ) {

					params = new jCanvasObject( args );
					layer = _addLayer( canvas, params, args, self );

					_setGlobalProps( canvas, ctx, params );
					plugin.fn.call( canvas, ctx, params );

				}
			}
			return $canvases;
		};
		// Add drawing type to drawing map
		if ( plugin.type ) {
			maps.drawings[ plugin.type ] = plugin.name;
		}
	}
	return $.fn[ plugin.name ];
};

/* Layer API */

// Retrieved the stored jCanvas data for a canvas element
function _getCanvasData( canvas ) {
	var dataCache = caches.dataCache, data;
	if ( dataCache._canvas === canvas && dataCache._data ) {

		// Retrieve canvas data from cache if possible
		data = dataCache._data;

	} else {

		// Retrieve canvas data from jQuery's internal data storage
		data = $.data( canvas, 'jCanvas' );
		if ( !data ) {

			// Create canvas data object if it does not already exist
			data = {
				// The associated canvas element
				canvas: canvas,
				// Layers array
				layers: [],
				// Layer maps
				layer: {
					names: {},
					groups: {}
				},
				eventHooks: {},
				// All layers that intersect with the event coordinates ( regardless of visibility )
				intersecting: [],
				// The topmost layer whose area contains the event coordinates
				lastIntersected: NULL,
				cursor: $( canvas ).css( 'cursor' ),
				// Properties for the current drag event
				drag: {
					layer: NULL,
					dragging: FALSE
				},
				// Data for the current event
				event: {
					type: NULL,
					x: NULL,
					y: NULL
				},
				// Events which already have been bound to the canvas
				events: {},
				// The canvas's current transformation state
				transforms: _cloneTransforms( baseTransforms ),
				savedTransforms: [],
				// Whether a layer is being animated or not
				animating: FALSE,
				// The layer currently being animated
				animated: NULL,
				// The device pixel ratio
				pixelRatio: 1,
				// Whether pixel ratio transformations have been applied
				scaled: FALSE
			};
			// Use jQuery to store canvas data
			$.data( canvas, 'jCanvas', data );

		}
		// Cache canvas data for faster retrieval
		dataCache._canvas = canvas;
		dataCache._data = data;

	}
	return data;
}

// Initialize all of a layer's associated jCanvas events
function _addLayerEvents( $canvas, data, layer ) {
	var eventName;
	// Determine which jCanvas events need to be bound to this layer
	for ( eventName in jCanvas.events ) {
		if ( jCanvas.events.hasOwnProperty( eventName ) ) {
			// If layer has callback function to complement it
			if ( layer[ eventName ] || ( layer.cursors && layer.cursors[ eventName ] ) ) {
				// Bind event to layer
				_addLayerEvent( $canvas, data, layer, eventName );
			}
		}
	}
	if ( !data.events.mouseout ) {
		$canvas.bind( 'mouseout.jCanvas', function () {
			// Retrieve the layer whose drag event was canceled
			var layer = data.drag.layer, l;
			// If cursor mouses out of canvas while dragging
			if ( layer ) {
				// Cancel drag
				data.drag = {};
				_triggerLayerEvent( $canvas, data, layer, 'dragcancel' );
			}
			// Loop through all layers
			for (l = 0; l < data.layers.length; l += 1) {
				layer = data.layers[l];
				// If layer thinks it's still being moused over
				if ( layer._hovered ) {
					// Trigger mouseout on layer
					$canvas.triggerLayerEvent( data.layers[l], 'mouseout' );
				}
			}
			// Redraw layers
			$canvas.drawLayers();
		} );
		// Indicate that an event handler has been bound
		data.events.mouseout = TRUE;
	}
}

// Initialize the given event on the given layer
function _addLayerEvent( $canvas, data, layer, eventName ) {
	// Use touch events if appropriate
	// eventName = _getMouseEventName( eventName );
	// Bind event to layer
	jCanvas.events[ eventName ]( $canvas, data );
	layer._event = TRUE;
}

// Enable drag support for this layer
function _enableDrag( $canvas, data, layer ) {
	var dragHelperEvents, eventName, i;
	// Only make layer draggable if necessary
	if ( layer.draggable || layer.cursors ) {

		// Organize helper events which enable drag support
		dragHelperEvents = [ 'mousedown', 'mousemove', 'mouseup' ];

		// Bind each helper event to the canvas
		for ( i = 0; i < dragHelperEvents.length; i += 1 ) {
			// Use touch events if appropriate
			eventName = dragHelperEvents[ i ];
			// Bind event
			_addLayerEvent( $canvas, data, layer, eventName );
		}
		// Indicate that this layer has events bound to it
		layer._event = TRUE;

	}
}

// Update a layer property map if property is changed
function _updateLayerName( $canvas, data, layer, props ) {
	var nameMap = data.layer.names;

	// If layer name is being added, not changed
	if ( !props ) {

		props = layer;

	} else {

		// Remove old layer name entry because layer name has changed
		if ( props.name !== UNDEFINED && isString( layer.name ) && layer.name !== props.name ) {
			delete nameMap[ layer.name ];
		}

	}

	// Add new entry to layer name map with new name
	if ( isString( props.name ) ) {
		nameMap[ props.name ] = layer;
	}
}

// Create or update the data map for the given layer and group type
function _updateLayerGroups( $canvas, data, layer, props ) {
	var groupMap = data.layer.groups,
		group, groupName, g,
		index, l;

	// If group name is not changing
	if ( !props ) {

		props = layer;

	} else {

		// Remove layer from all of its associated groups
		if ( props.groups !== UNDEFINED && layer.groups !== NULL ) {
			for ( g = 0; g < layer.groups.length; g += 1 ) {
				groupName = layer.groups[ g ];
				group = groupMap[ groupName ];
				if ( group ) {
					// Remove layer from its old layer group entry
					for ( l = 0; l < group.length; l += 1 ) {
						if ( group[ l ] === layer ) {
							// Keep track of the layer's initial index
							index = l;
							// Remove layer once found
							group.splice( l, 1 );
							break;
						}
					}
					// Remove layer group entry if group is empty
					if ( group.length === 0 ) {
						delete groupMap[ groupName ];
					}
				}
			}
		}

	}

	// Add layer to new group if a new group name is given
	if ( props.groups !== UNDEFINED && props.groups !== NULL ) {

		for ( g = 0; g < props.groups.length; g += 1 ) {

			groupName = props.groups[ g ];

			group = groupMap[ groupName ];
			if ( !group ) {
				// Create new group entry if it doesn't exist
				group = groupMap[ groupName ] = [];
				group.name = groupName;
			}
			if ( index === UNDEFINED ) {
				// Add layer to end of group unless otherwise stated
				index = group.length;
			}
			// Add layer to its new layer group
			group.splice( index, 0, layer );

		}

	}
}

// Get event hooks object for the first selected canvas
$.fn.getEventHooks = function getEventHooks() {
	var $canvases = this, canvas, data,
		eventHooks = {};

	if ( $canvases.length !== 0 ) {
		canvas = $canvases[ 0 ];
		data = _getCanvasData( canvas );
		eventHooks = data.eventHooks;
	}
	return eventHooks;
};

// Set event hooks for the selected canvases
$.fn.setEventHooks = function setEventHooks( eventHooks ) {
	var $canvases = this, $canvas, e,
		data;
	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );
		data = _getCanvasData( $canvases[ e ] );
		extendObject( data.eventHooks, eventHooks );
	}
	return $canvases;
};

// Get jCanvas layers array
$.fn.getLayers = function getLayers( callback ) {
	var $canvases = this, canvas, data,
		layers, layer, l,
		matching = [];

	if ( $canvases.length !== 0 ) {

		canvas = $canvases[ 0 ];
		data = _getCanvasData( canvas );
		// Retrieve layers array for this canvas
		layers = data.layers;

		// If a callback function is given
		if ( isFunction( callback ) ) {

			// Filter the layers array using the callback
			for ( l = 0; l < layers.length; l += 1 ) {
				layer = layers[ l ];
				if ( callback.call( canvas, layer ) ) {
					// Add layer to array of matching layers if test passes
					matching.push( layer );
				}
			}

		} else {
			// Otherwise, get all layers

			matching = layers;

		}

	}
	return matching;
};

// Get a single jCanvas layer object
$.fn.getLayer = function getLayer( layerId ) {
	var $canvases = this, canvas,
		data, layers, layer, l,
		idType;

	if ( $canvases.length !== 0 ) {

		canvas = $canvases[ 0 ];
		data = _getCanvasData( canvas );
		layers = data.layers;
		idType = typeOf( layerId );

		if ( layerId && layerId.layer ) {

			// Return the actual layer object if given
			layer = layerId;

		} else if ( idType === 'number' ) {

			// Retrieve the layer using the given index

			// Allow for negative indices
			if ( layerId < 0 ) {
				layerId = layers.length + layerId;
			}
			// Get layer with the given index
			layer = layers[ layerId ];

		} else if ( idType === 'regexp' ) {

			// Get layer with the name that matches the given regex
			for ( l = 0; l < layers.length; l += 1 ) {
				// Check if layer matches name
				if ( isString( layers[ l ].name ) && layers[ l ].name.match( layerId ) ) {
					layer = layers[ l ];
					break;
				}
			}

		} else {

			// Get layer with the given name
			layer = data.layer.names[ layerId ];

		}

	}
	return layer;
};

// Get all layers in the given group
$.fn.getLayerGroup = function getLayerGroup( groupId ) {
	var $canvases = this, canvas, data,
		groups, groupName, group,
		idType = typeOf( groupId );

	if ( $canvases.length !== 0 ) {

		canvas = $canvases[ 0 ];

		if ( idType === 'array' ) {

			// Return layer group if given
			group = groupId;

		} else if ( idType === 'regexp' ) {

			// Get canvas data
			data = _getCanvasData( canvas );
			groups = data.layer.groups;
			// Loop through all layers groups for this canvas
			for ( groupName in groups ) {
				// Find a group whose name matches the given regex
				if ( groupName.match( groupId ) ) {
					group = groups[ groupName ];
					// Stop after finding the first matching group
					break;
				}
			}

		} else {

			// Find layer group with the given group name
			data = _getCanvasData( canvas );
			group = data.layer.groups[ groupId ];
		}

	}
	return group;
};

// Get index of layer in layers array
$.fn.getLayerIndex = function getLayerIndex( layerId ) {
	var $canvases = this,
		layers = $canvases.getLayers(),
		layer = $canvases.getLayer( layerId );

	return inArray( layer, layers );
};

// Set properties of a layer
$.fn.setLayer = function setLayer( layerId, props ) {
	var $canvases = this, $canvas, e,
		data, layer,
		propName, propValue, propType;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );
		data = _getCanvasData( $canvases[ e ] );

		layer = $( $canvases[ e ] ).getLayer( layerId );
		if ( layer ) {

			// Update layer property maps
			_updateLayerName( $canvas, data, layer, props );
			_updateLayerGroups( $canvas, data, layer, props );

			_coerceNumericProps( props );

			// Merge properties with layer
			for ( propName in props ) {
				if ( props.hasOwnProperty( propName ) ) {
					propValue = props[ propName ];
					propType = typeOf( propValue );
					if ( propType === 'object' && isPlainObject( propValue ) ) {
						// Clone objects
						layer[ propName ] = extendObject( {}, propValue );
						_coerceNumericProps( layer[ propName ] );
					} else if ( propType === 'array' ) {
						// Clone arrays
						layer[ propName ] = propValue.slice( 0 );
					} else if ( propType === 'string' ) {
						if ( propValue.indexOf( '+=' ) === 0 ) {
							// Increment numbers prefixed with +=
							layer[ propName ] += parseFloat( propValue.substr( 2 ) );
						} else if ( propValue.indexOf( '-=' ) === 0 ) {
							// Decrement numbers prefixed with -=
							layer[ propName ] -= parseFloat( propValue.substr( 2 ) );
						} else if ( !isNaN( propValue ) && isNumeric( propValue ) && propName !== 'text' ) {
							// Convert numeric values as strings to numbers
							layer[ propName ] = parseFloat( propValue );
						} else {
							// Otherwise, set given string value
							layer[ propName ] = propValue;
						}
					} else {
						// Otherwise, set given value
						layer[ propName ] = propValue;
					}
				}
			}

			// Update layer events
			_addLayerEvents( $canvas, data, layer );
			_enableDrag( $canvas, data, layer );

			// If layer's properties were changed
			if ( $.isEmptyObject( props ) === FALSE ) {
				_triggerLayerEvent( $canvas, data, layer, 'change', props );
			}

		}
	}
	return $canvases;
};

// Set properties of all layers ( optionally filtered by a callback )
$.fn.setLayers = function setLayers( props, callback ) {
	var $canvases = this, $canvas, e,
		layers, l;
	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );

		layers = $canvas.getLayers( callback );
		// Loop through all layers
		for ( l = 0; l < layers.length; l += 1 ) {
			// Set properties of each layer
			$canvas.setLayer( layers[ l ], props );
		}
	}
	return $canvases;
};

// Set properties of all layers in the given group
$.fn.setLayerGroup = function setLayerGroup( groupId, props ) {
	var $canvases = this, $canvas, e,
		group, l;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		// Get layer group
		$canvas = $( $canvases[ e ] );

		group = $canvas.getLayerGroup( groupId );
		// If group exists
		if ( group ) {

			// Loop through layers in group
			for ( l = 0; l < group.length; l += 1 ) {
				// Merge given properties with layer
				$canvas.setLayer( group[ l ], props );
			}

		}
	}
	return $canvases;
};

// Move a layer to the given index in the layers array
$.fn.moveLayer = function moveLayer( layerId, index ) {
	var $canvases = this, $canvas, e,
		data, layers, layer;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );
		data = _getCanvasData( $canvases[ e ] );

		// Retrieve layers array and desired layer
		layers = data.layers;
		layer = $canvas.getLayer( layerId );
		if ( layer ) {

			// Ensure layer index is accurate
			layer.index = inArray( layer, layers );

			// Remove layer from its current placement
			layers.splice( layer.index, 1 );
			// Add layer in its new placement
			layers.splice( index, 0, layer );

			// Handle negative indices
			if ( index < 0 ) {
				index = layers.length + index;
			}
			// Update layer's stored index
			layer.index = index;

			_triggerLayerEvent( $canvas, data, layer, 'move' );

		}
	}
	return $canvases;
};

// Remove a jCanvas layer
$.fn.removeLayer = function removeLayer( layerId ) {
	var $canvases = this, $canvas, e, data,
		layers, layer;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );
		data = _getCanvasData( $canvases[ e ] );

		// Retrieve layers array and desired layer
		layers = $canvas.getLayers();
		layer = $canvas.getLayer( layerId );
		// Remove layer if found
		if ( layer ) {

			// Ensure layer index is accurate
			layer.index = inArray( layer, layers );
			// Remove layer and allow it to be re-added later
			layers.splice( layer.index, 1 );
			delete layer._layer;

			// Update layer name map
			_updateLayerName( $canvas, data, layer, {
				name: NULL
			} );
			// Update layer group map
			_updateLayerGroups( $canvas, data, layer, {
				groups: NULL
			} );

			// Trigger 'remove' event
			_triggerLayerEvent( $canvas, data, layer, 'remove' );

		}
	}
	return $canvases;
};

// Remove all layers
$.fn.removeLayers = function removeLayers( callback ) {
	var $canvases = this, $canvas, e,
		data, layers, layer, l;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );
		data = _getCanvasData( $canvases[ e ] );
		layers = $canvas.getLayers( callback );
		// Remove all layers individually
		for ( l = 0; l < layers.length; l += 1 ) {
			layer = layers[ l ];
			$canvas.removeLayer( layer );
			// Ensure no layer is skipped over
			l -= 1;
		}
		// Update layer maps
		data.layer.names = {};
		data.layer.groups = {};
	}
	return $canvases;
};

// Remove all layers in the group with the given ID
$.fn.removeLayerGroup = function removeLayerGroup( groupId ) {
	var $canvases = this, $canvas, e, data,
		layers, group, l;

	if ( groupId !== UNDEFINED ) {
		for ( e = 0; e < $canvases.length; e += 1 ) {
			$canvas = $( $canvases[ e ] );
			data = _getCanvasData( $canvases[ e ] );

			layers = $canvas.getLayers();
			group = $canvas.getLayerGroup( groupId );
			// Remove layer group using given group name
			if ( group ) {

				// Clone groups array
				group = group.slice( 0 );

				// Loop through layers in group
				for ( l = 0; l < group.length; l += 1 ) {
					$canvas.removeLayer( group[ l ] );
				}

			}
		}
	}
	return $canvases;
};

// Add an existing layer to a layer group
$.fn.addLayerToGroup = function addLayerToGroup( layerId, groupName ) {
	var $canvases = this, $canvas, e,
		layer, groups = [ groupName ];

	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );
		layer = $canvas.getLayer( layerId );

		// If layer is not already in group
		if ( layer.groups ) {
			// Clone groups list
			groups = layer.groups.slice( 0 );
			// If layer is not already in group
			if ( inArray( groupName, layer.groups ) === -1 ) {
				// Add layer to group
				groups.push( groupName );
			}
		}
		// Update layer group maps
		$canvas.setLayer( layer, {
			groups: groups
		} );

	}
	return $canvases;
};

// Remove an existing layer from a layer group
$.fn.removeLayerFromGroup = function removeLayerFromGroup( layerId, groupName ) {
	var $canvases = this, $canvas, e,
		layer, groups = [],
		index;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );
		layer = $canvas.getLayer( layerId );

		if ( layer.groups ) {

			// Find index of layer in group
			index = inArray( groupName, layer.groups );

			// If layer is in group
			if ( index !== -1 ) {

				// Clone groups list
				groups = layer.groups.slice( 0 );

				// Remove layer from group
				groups.splice( index, 1 );

				// Update layer group maps
				$canvas.setLayer( layer, {
					groups: groups
				} );

			}

		}

	}
	return $canvases;
};

// Get topmost layer that intersects with event coordinates
function _getIntersectingLayer( data ) {
	var layer, i,
		mask, m;

	// Store the topmost layer
	layer = NULL;

	// Get the topmost layer whose visible area intersects event coordinates
	for ( i = data.intersecting.length - 1; i >= 0; i -= 1 ) {

		// Get current layer
		layer = data.intersecting[ i ];

		// If layer has previous masks
		if ( layer._masks ) {

			// Search previous masks to ensure
			// layer is visible at event coordinates
			for ( m = layer._masks.length - 1; m >= 0; m -= 1 ) {
				mask = layer._masks[ m ];
				// If mask does not intersect event coordinates
				if ( !mask.intersects ) {
					// Indicate that the mask does not
					// intersect event coordinates
					layer.intersects = FALSE;
					// Stop searching previous masks
					break;
				}

			}

			// If event coordinates intersect all previous masks
			// and layer is not intangible
			if ( layer.intersects && !layer.intangible ) {
				// Stop searching for topmost layer
				break;
			}

		}

	}
	// If resulting layer is intangible
	if ( layer && layer.intangible ) {
		// Cursor does not intersect this layer
		layer = NULL;
	}
	return layer;
}

// Draw individual layer (internal)
function _drawLayer( $canvas, ctx, layer, nextLayerIndex ) {
	if ( layer && layer.visible && layer._method ) {
		if ( nextLayerIndex ) {
			layer._next = nextLayerIndex;
		} else {
			layer._next = NULL;
		}
		// If layer is an object, call its respective method
		layer._method.call( $canvas, layer );
	}
}

// Handle dragging of the currently-dragged layer
function _handleLayerDrag( $canvas, data, eventType ) {
	var layers, layer, l,
		drag, dragGroups,
		group, groupName, g,
		newX, newY;

	drag = data.drag;
	layer = drag.layer;
	dragGroups = ( layer && layer.dragGroups ) || [];
	layers = data.layers;

	if ( eventType === 'mousemove' || eventType === 'touchmove' ) {
		// Detect when user is currently dragging layer

		if ( !drag.dragging ) {
			// Detect when user starts dragging layer

			// Signify that a layer on the canvas is being dragged
			drag.dragging = TRUE;
			layer.dragging = TRUE;

			// Optionally bring layer to front when drag starts
			if ( layer.bringToFront ) {
				// Remove layer from its original position
				layers.splice( layer.index, 1 );
				// Bring layer to front
				// push() returns the new array length
				layer.index = layers.push( layer );
			}

			// Set drag properties for this layer
			layer._startX = layer.x;
			layer._startY = layer.y;
			layer._endX = layer._eventX;
			layer._endY = layer._eventY;

			// Trigger dragstart event
			_triggerLayerEvent( $canvas, data, layer, 'dragstart' );

		}

		if ( drag.dragging ) {

			// Calculate position after drag
			newX = layer._eventX - ( layer._endX - layer._startX );
			newY = layer._eventY - ( layer._endY - layer._startY );
			layer.dx = newX - layer.x;
			layer.dy = newY - layer.y;
			if ( layer.restrictDragToAxis !== 'y' ) {
				layer.x = newX;
			}
			if ( layer.restrictDragToAxis !== 'x' ) {
				layer.y = newY;
			}

			// Trigger drag event
			_triggerLayerEvent( $canvas, data, layer, 'drag' );

			// Move groups with layer on drag
			for ( g = 0; g < dragGroups.length; g += 1 ) {

				groupName = dragGroups[ g ];
				group = data.layer.groups[ groupName ];
				if ( layer.groups && group ) {

					for ( l = 0; l < group.length; l += 1 ) {
						if ( group[ l ] !== layer ) {
							if ( layer.restrictDragToAxis !== 'y' && group[ l ].restrictDragToAxis !== 'y' ) {
								group[ l ].x += layer.dx;
							}
							if ( layer.restrictDragToAxis !== 'x' && group[ l ].restrictDragToAxis !== 'x' ) {
								group[ l ].y += layer.dy;
							}
						}
					}

				}

			}

		}

	} else if ( eventType === 'mouseup' || eventType === 'touchend' ) {
		// Detect when user stops dragging layer

		if ( drag.dragging ) {
			layer.dragging = FALSE;
			drag.dragging = FALSE;
			// Trigger dragstop event
			_triggerLayerEvent( $canvas, data, layer, 'dragstop' );
		}

		// Cancel dragging
		data.drag = {};

	}
}


// List of CSS3 cursors that need to be prefixed
css.cursors = [ 'grab', 'grabbing', 'zoom-in', 'zoom-out' ];

// Function to detect vendor prefix
// Modified version of David Walsh's implementation
// http://davidwalsh.name/vendor-prefix
css.prefix = ( function () {
	var styles = getComputedStyle( document.documentElement, '' ),
		pre = ( arraySlice
			.call( styles )
			.join( '' )
			.match( /-(moz|webkit|ms)-/ ) || ( styles.OLink === '' && [ '', 'o' ] )
		)[ 1 ];
	return '-' + pre + '-';
} )();

// Set cursor on canvas
function _setCursor( $canvas, layer, eventType ) {
	var cursor;
	if ( layer.cursors ) {
		// Retrieve cursor from cursors object if it exists
		cursor = layer.cursors[ eventType ];
	}
	// Prefix any CSS3 cursor
	if ( $.inArray( cursor, css.cursors ) !== -1 ) {
		cursor = css.prefix + cursor;
	}
	// If cursor is defined
	if ( cursor ) {
		// Set canvas cursor
		$canvas.css( {
			cursor: cursor
		} );
	}
}

// Reset cursor on canvas
function _resetCursor( $canvas, data ) {
	$canvas.css( {
		cursor: data.cursor
	} );
}

// Run the given event callback with the given arguments
function _runEventCallback( $canvas, layer, eventType, callbacks, arg ) {
	// Prevent callback from firing recursively
	if ( callbacks[ eventType ] && layer._running && !layer._running[ eventType ] ) {
		// Signify the start of callback execution for this event
		layer._running[ eventType ] = TRUE;
		// Run event callback with the given arguments
		callbacks[ eventType ].call( $canvas[ 0 ], layer, arg );
		// Signify the end of callback execution for this event
		layer._running[ eventType ] = FALSE;
	}
}

// Determine if the given layer can "legally" fire the given event
function _layerCanFireEvent( layer, eventType ) {
	// If events are disable and if
	// layer is tangible or event is not tangible
	return ( !layer.disableEvents &&
		( !layer.intangible || $.inArray( eventType, tangibleEvents ) === -1 ) );
}

// Trigger the given event on the given layer
function _triggerLayerEvent( $canvas, data, layer, eventType, arg ) {
	// If layer can legally fire this event type
	if ( _layerCanFireEvent( layer, eventType ) ) {

		// Do not set a custom cursor on layer mouseout
		if ( eventType !== 'mouseout' ) {
			// Update cursor if one is defined for this event
			_setCursor( $canvas, layer, eventType );
		}

		// Trigger the user-defined event callback
		_runEventCallback( $canvas, layer, eventType, layer, arg );
		// Trigger the canvas-bound event hook
		_runEventCallback( $canvas, layer, eventType, data.eventHooks, arg );
		// Trigger the global event hook
		_runEventCallback( $canvas, layer, eventType, jCanvas.eventHooks, arg );

	}
}

// Manually trigger a layer event
$.fn.triggerLayerEvent = function ( layer, eventType ) {
	var $canvases = this, $canvas, e,
		data;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );
		data = _getCanvasData( $canvases[ e ] );
		layer = $canvas.getLayer( layer );
		if ( layer ) {
			_triggerLayerEvent( $canvas, data, layer, eventType );
		}
	}
	return $canvases;
};

// Draw layer with the given ID
$.fn.drawLayer = function drawLayer( layerId ) {
	var $canvases = this, e, ctx,
		$canvas, layer;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );
		ctx = _getContext( $canvases[ e ] );
		if (ctx) {
			layer = $canvas.getLayer( layerId );
			_drawLayer( $canvas, ctx, layer );
		}
	}
	return $canvases;
};

// Draw all layers ( or, if given, only layers starting at an index )
$.fn.drawLayers = function drawLayers( args ) {
	var $canvases = this, $canvas, e, ctx,
		// Internal parameters for redrawing the canvas
		params = args || {},
		// Other variables
		layers, layer, lastLayer, l, index, lastIndex,
		data, eventCache, eventType, isImageLayer;

	// The layer index from which to start redrawing the canvas
	index = params.index;
	if ( !index ) {
		index = 0;
	}

	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			data = _getCanvasData( $canvases[ e ] );

			// Clear canvas first unless otherwise directed
			if ( params.clear !== FALSE ) {
				$canvas.clearCanvas();
			}

			// Cache the layers array
			layers = data.layers;

			// Draw layers from first to last ( bottom to top )
			for ( l = index; l < layers.length; l += 1 ) {
				layer = layers[ l ];

				// Ensure layer index is up-to-date
				layer.index = l;

				// Prevent any one event from firing excessively
				if ( params.resetFire ) {
					layer._fired = FALSE;
				}
				// Draw layer
				_drawLayer( $canvas, ctx, layer, l + 1 );
				// Store list of previous masks for each layer
				layer._masks = data.transforms.masks.slice( 0 );

				// Allow image layers to load before drawing successive layers
				if ( layer._method === $.fn.drawImage && layer.visible ) {
					isImageLayer = true;
					break;
				}

			}

			// If layer is an image layer
			if ( isImageLayer ) {
				// Stop and wait for drawImage() to resume drawLayers()
				break;
			}

			// Store the latest
			lastIndex = l;

			// Get first layer that intersects with event coordinates
			layer = _getIntersectingLayer( data );

			eventCache = data.event;
			eventType = eventCache.type;

			// If jCanvas has detected a dragstart
			if ( data.drag.layer ) {
				// Handle dragging of layer
				_handleLayerDrag( $canvas, data, eventType );
			}

			// Manage mouseout event
			lastLayer = data.lastIntersected;
			if ( lastLayer !== NULL && layer !== lastLayer && lastLayer._hovered && !lastLayer._fired && !data.drag.dragging ) {

				data.lastIntersected = NULL;
				lastLayer._fired = TRUE;
				lastLayer._hovered = FALSE;
				_triggerLayerEvent( $canvas, data, lastLayer, 'mouseout' );
				_resetCursor( $canvas, data );

			}

			if ( layer ) {

				// Use mouse event callbacks if no touch event callbacks are given
				if ( !layer[ eventType ] ) {
					eventType = _getMouseEventName( eventType );
				}

				// Check events for intersecting layer
				if ( layer._event && layer.intersects ) {

					data.lastIntersected = layer;

					// Detect mouseover events
					if ( ( layer.mouseover || layer.mouseout || layer.cursors ) && !data.drag.dragging ) {

						if ( !layer._hovered && !layer._fired ) {

							// Prevent events from firing excessively
							layer._fired = TRUE;
							layer._hovered = TRUE;
							_triggerLayerEvent( $canvas, data, layer, 'mouseover' );

						}

					}

					// Detect any other mouse event
					if ( !layer._fired ) {

						// Prevent event from firing twice unintentionally
						layer._fired = TRUE;
						eventCache.type = NULL;

						_triggerLayerEvent( $canvas, data, layer, eventType );

					}

					// Use the mousedown event to start drag
					if ( layer.draggable && !layer.disableEvents && ( eventType === 'mousedown' || eventType === 'touchstart' ) ) {

						// Keep track of drag state
						data.drag.layer = layer;

					}

				}

			}

			// If cursor is not intersecting with any layer
			if ( layer === NULL && !data.drag.dragging ) {
				// Reset cursor to previous state
				_resetCursor( $canvas, data );
			}

			// If the last layer has been drawn
			if ( lastIndex === layers.length ) {

				// Reset list of intersecting layers
				data.intersecting.length = 0;
				// Reset transformation stack
				data.transforms = _cloneTransforms( baseTransforms );
				data.savedTransforms.length = 0;

			}

		}
	}
	return $canvases;
};

// Add a jCanvas layer (internal)
function _addLayer( canvas, params, args, method ) {
	var $canvas, data,
		layers, layer = ( params._layer ? args : params );

	// Store arguments object for later use
	params._args = args;

	// Convert all draggable drawings into jCanvas layers
	if ( params.draggable || params.dragGroups ) {
		params.layer = TRUE;
		params.draggable = TRUE;
	}

	// Determine the layer's type using the available information
	if ( !params._method ) {
		if ( method ) {
			params._method = method;
		} else if ( params.method ) {
			params._method = $.fn[ params.method ];
		} else if ( params.type ) {
			params._method = $.fn[ maps.drawings[ params.type ] ];
		} else {
			params._method = function () {};
		}
	}

	// If layer hasn't been added yet
	if ( params.layer && !params._layer ) {
		// Add layer to canvas

		$canvas = $( canvas );

		data = _getCanvasData( canvas );
		layers = data.layers;

		// Do not add duplicate layers of same name
		if ( layer.name === NULL || ( isString( layer.name ) && data.layer.names[ layer.name ] === UNDEFINED ) ) {

			// Convert number properties to numbers
			_coerceNumericProps( params );

			// Ensure layers are unique across canvases by cloning them
			layer = new jCanvasObject( params );
			layer.canvas = canvas;
			// Indicate that this is a layer for future checks
			layer.layer = TRUE;
			layer._layer = TRUE;
			layer._running = {};
			// If layer stores user-defined data
			if ( layer.data !== NULL ) {
				// Clone object
				layer.data = extendObject( {}, layer.data );
			} else {
				// Otherwise, create data object
				layer.data = {};
			}
			// If layer stores a list of associated groups
			if ( layer.groups !== NULL ) {
				// Clone list
				layer.groups = layer.groups.slice( 0 );
			} else {
				// Otherwise, create empty list
				layer.groups = [];
			}

			// Update layer group maps
			_updateLayerName( $canvas, data, layer );
			_updateLayerGroups( $canvas, data, layer );

			// Check for any associated jCanvas events and enable them
			_addLayerEvents( $canvas, data, layer );

			// Optionally enable drag-and-drop support and cursor support
			_enableDrag( $canvas, data, layer );

			// Copy _event property to parameters object
			params._event = layer._event;

			// Calculate width/height for text layers
			if ( layer._method === $.fn.drawText ) {
				$canvas.measureText( layer );
			}

			// Add layer to end of array if no index is specified
			if ( layer.index === NULL ) {
				layer.index = layers.length;
			}

			// Add layer to layers array at specified index
			layers.splice( layer.index, 0, layer );

			// Store layer on parameters object
			params._args = layer;

			// Trigger an 'add' event
			_triggerLayerEvent( $canvas, data, layer, 'add' );

		}

	} else if ( !params.layer ) {
		_coerceNumericProps( params );
	}

	return layer;
}

// Add a jCanvas layer
$.fn.addLayer = function addLayer( args ) {
	var $canvases = this, e, ctx,
		params;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			params = new jCanvasObject( args );
			params.layer = TRUE;
			_addLayer( $canvases[ e ], params, args );

		}
	}
	return $canvases;
};

/* Animation API */

// Define properties used in both CSS and jCanvas
css.props = [
	'width',
	'height',
	'opacity',
	'lineHeight'
];
css.propsObj = {};

// Hide/show jCanvas/CSS properties so they can be animated using jQuery
function _showProps( obj ) {
	var cssProp, p;
	for ( p = 0; p < css.props.length; p += 1 ) {
		cssProp = css.props[ p ];
		obj[ cssProp ] = obj[ '_' + cssProp ];
	}
}
function _hideProps( obj, reset ) {
	var cssProp, p;
	for ( p = 0; p < css.props.length; p += 1 ) {
		cssProp = css.props[ p ];
		// Hide property using same name with leading underscore
		if ( obj[ cssProp ] !== UNDEFINED ) {
			obj[ '_' + cssProp ] = obj[ cssProp ];
			css.propsObj[ cssProp ] = TRUE;
			if ( reset ) {
				delete obj[ cssProp ];
			}
		}
	}
}

// Evaluate property values that are functions
function _parseEndValues( canvas, layer, endValues ) {
	var propName, propValue,
		subPropName, subPropValue;
	// Loop through all properties in map of end values
	for ( propName in endValues ) {
		if ( endValues.hasOwnProperty( propName ) ) {
			propValue = endValues[ propName ];
			// If end value is function
			if ( isFunction( propValue ) ) {
				// Call function and use its value as the end value
				endValues[ propName ] = propValue.call( canvas, layer, propName );
			}
			// If end value is an object
			if ( typeOf( propValue ) === 'object' && isPlainObject( propValue ) ) {
				// Prepare to animate properties in object
				for ( subPropName in propValue ) {
					if ( propValue.hasOwnProperty( subPropName ) ) {
						subPropValue = propValue[ subPropName ];
						// Store property's start value at top-level of layer
						if ( layer[ propName ] !== UNDEFINED ) {
							layer[ propName + '.' + subPropName ] = layer[ propName ][ subPropName ];
							// Store property's end value at top-level of end values map
							endValues[ propName + '.' + subPropName ] = subPropValue;
						}
					}
				}
				// Delete sub-property of object as it's no longer needed
				delete endValues[ propName ];
			}
		}
	}
	return endValues;
}

// Remove sub-property aliases from layer object
function _removeSubPropAliases( layer ) {
	var propName;
	for ( propName in layer ) {
		if ( layer.hasOwnProperty( propName ) ) {
			if ( propName.indexOf( '.' ) !== -1 ) {
				delete layer[ propName ];
			}
		}
	}
}

// Convert a color value to an array of RGB values
function _colorToRgbArray( color ) {
	var originalColor, elem,
		rgb = [],
		multiple = 1;

	// Deal with hexadecimal colors and color names
	if ( color.match( /^([a-z]+|#[0-9a-f]+)$/gi ) ) {
		// Deal with complete transparency
		if ( color === 'transparent' ) {
			color = 'rgba(0, 0, 0, 0)';
		}
		elem = document.head;
		originalColor = elem.style.color;
		elem.style.color = color;
		color = $.css( elem, 'color' );
		elem.style.color = originalColor;
	}
	// Parse RGB string
	if ( color.match( /^rgb/gi ) ) {
		rgb = color.match( /(\d+(\.\d+)?)/gi );
		// Deal with RGB percentages
		if ( color.match( /%/gi ) ) {
			multiple = 2.55;
		}
		rgb[ 0 ] *= multiple;
		rgb[ 1 ] *= multiple;
		rgb[ 2 ] *= multiple;
		// Ad alpha channel if given
		if ( rgb[ 3 ] !== UNDEFINED ) {
			rgb[ 3 ] = parseFloat( rgb[ 3 ] );
		} else {
			rgb[ 3 ] = 1;
		}
	}
	return rgb;
}

// Animate a hex or RGB color
function _animateColor( fx ) {
	var n = 3,
		i;
	// Only parse start and end colors once
	if ( typeOf( fx.start ) !== 'array' ) {
		fx.start = _colorToRgbArray( fx.start );
		fx.end = _colorToRgbArray( fx.end );
	}
	fx.now = [];

	// If colors are RGBA, animate transparency
	if ( fx.start[ 3 ] !== 1 || fx.end[ 3 ] !== 1 ) {
		n = 4;
	}

	// Calculate current frame for red, green, blue, and alpha
	for ( i = 0; i < n; i += 1 ) {
		fx.now[ i ] = fx.start[ i ] + ( fx.end[ i ] - fx.start[ i ] ) * fx.pos;
		// Only the red, green, and blue values must be integers
		if ( i < 3 ) {
			fx.now[ i ] = round( fx.now[ i ] );
		}
	}
	if ( fx.start[ 3 ] !== 1 || fx.end[ 3 ] !== 1 ) {
		// Only use RGBA if RGBA colors are given
		fx.now = 'rgba( ' + fx.now.join( ',' ) + ' )';
	} else {
		// Otherwise, animate as solid colors
		fx.now.slice( 0, 3 );
		fx.now = 'rgb( ' + fx.now.join( ',' ) + ' )';
	}
	// Animate colors for both canvas layers and DOM elements
	if ( fx.elem.nodeName ) {
		fx.elem.style[ fx.prop ] = fx.now;
	} else {
		fx.elem[ fx.prop ] = fx.now;
	}
}

// Animate jCanvas layer
$.fn.animateLayer = function animateLayer() {
	var $canvases = this, $canvas, e, ctx,
		args = arraySlice.call( arguments, 0 ),
		data, layer, props;

	// Deal with all cases of argument placement
	/*
		0. layer name/index
		1. properties
		2. duration/options
		3. easing
		4. complete function
		5. step function
	*/

	if ( typeOf( args[ 2 ] ) === 'object' ) {

		// Accept an options object for animation
		args.splice( 2, 0, args[ 2 ].duration || NULL );
		args.splice( 3, 0, args[ 3 ].easing || NULL );
		args.splice( 4, 0, args[ 4 ].complete || NULL );
		args.splice( 5, 0, args[ 5 ].step || NULL );

	} else {

		if ( args[ 2 ] === UNDEFINED ) {
			// If object is the last argument
			args.splice( 2, 0, NULL );
			args.splice( 3, 0, NULL );
			args.splice( 4, 0, NULL );
		} else if ( isFunction( args[ 2 ] ) ) {
			// If callback comes after object
			args.splice( 2, 0, NULL );
			args.splice( 3, 0, NULL );
		}
		if ( args[ 3 ] === UNDEFINED ) {
			// If duration is the last argument
			args[ 3 ] = NULL;
			args.splice( 4, 0, NULL );
		} else if ( isFunction( args[ 3 ] ) ) {
			// If callback comes after duration
			args.splice( 3, 0, NULL );
		}

	}

	// Run callback function when animation completes
	function complete( $canvas, data, layer ) {

		return function () {

			_showProps( layer );
			_removeSubPropAliases( layer );

			// Prevent multiple redraw loops
			if ( !data.animating || data.animated === layer ) {
				// Redraw layers on last frame
				$canvas.drawLayers();
			}

			// Signify the end of an animation loop
			layer._animating = FALSE;
			data.animating = FALSE;
			data.animated = NULL;

			// If callback is defined
			if ( args[ 4 ] ) {
				// Run callback at the end of the animation
				args[ 4 ].call( $canvas[ 0 ], layer );
			}

			_triggerLayerEvent( $canvas, data, layer, 'animateend' );

		};

	}

	// Redraw layers on every frame of the animation
	function step( $canvas, data, layer ) {

		return function ( now, fx ) {
			var parts, propName, subPropName,
				hidden = false;

			// If animated property has been hidden
			if ( fx.prop[ 0 ] === '_' ) {
				hidden = true;
				// Unhide property temporarily
				fx.prop = fx.prop.replace( '_', '' );
				layer[ fx.prop ] = layer[ '_' + fx.prop ];
			}

			// If animating property of sub-object
			if ( fx.prop.indexOf( '.' ) !== -1 ) {
				parts = fx.prop.split( '.' );
				propName = parts[ 0 ];
				subPropName = parts[ 1 ];
				if ( layer[ propName ] ) {
					layer[ propName ][ subPropName ] = fx.now;
				}
			}

			// Throttle animation to improve efficiency
			if ( layer._pos !== fx.pos ) {

				layer._pos = fx.pos;

				// Signify the start of an animation loop
				if ( !layer._animating && !data.animating ) {
					layer._animating = TRUE;
					data.animating = TRUE;
					data.animated = layer;
				}

				// Prevent multiple redraw loops
				if ( !data.animating || data.animated === layer ) {
					// Redraw layers for every frame
					$canvas.drawLayers();
				}

			}

			// If callback is defined
			if ( args[ 5 ] ) {
				// Run callback for each step of animation
				args[ 5 ].call( $canvas[ 0 ], now, fx, layer );
			}

			_triggerLayerEvent( $canvas, data, layer, 'animate', fx );

			// If property should be hidden during animation
			if ( hidden ) {
				// Hide property again
				fx.prop = '_' + fx.prop;
			}

		};

	}

	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			data = _getCanvasData( $canvases[ e ] );

			// If a layer object was passed, use it the layer to be animated
			layer = $canvas.getLayer( args[ 0 ] );

			// Ignore layers that are functions
			if ( layer && layer._method !== $.fn.draw ) {

				// Do not modify original object
				props = extendObject( {}, args[ 1 ] );

				props = _parseEndValues( $canvases[ e ], layer, props );

				// Bypass jQuery CSS Hooks for CSS properties ( width, opacity, etc. )
				_hideProps( props, TRUE );
				_hideProps( layer );

				// Fix for jQuery's vendor prefixing support, which affects how width/height/opacity are animated
				layer.style = css.propsObj;

				// Animate layer
				$( layer ).animate( props, {
					duration: args[ 2 ],
					easing: ( $.easing[ args[ 3 ] ] ? args[ 3 ] : NULL ),
					// When animation completes
					complete: complete( $canvas, data, layer ),
					// Redraw canvas for every animation frame
					step: step( $canvas, data, layer )
				} );
				_triggerLayerEvent( $canvas, data, layer, 'animatestart' );
			}

		}
	}
	return $canvases;
};

// Animate all layers in a layer group
$.fn.animateLayerGroup = function animateLayerGroup( groupId ) {
	var $canvases = this, $canvas, e,
		args = arraySlice.call( arguments, 0 ),
		group, l;
	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );
		group = $canvas.getLayerGroup( groupId );
		if ( group ) {

			// Animate all layers in the group
			for ( l = 0; l < group.length; l += 1 ) {

				// Replace first argument with layer
				args[ 0 ] = group[ l ];
				$canvas.animateLayer.apply( $canvas, args );

			}

		}
	}
	return $canvases;
};

// Delay layer animation by a given number of milliseconds
$.fn.delayLayer = function delayLayer( layerId, duration ) {
	var $canvases = this, $canvas, e,
		data, layer;
	duration = duration || 0;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );
		data = _getCanvasData( $canvases[ e ] );
		layer = $canvas.getLayer( layerId );
		// If layer exists
		if ( layer ) {
			// Delay animation
			$( layer ).delay( duration );
			_triggerLayerEvent( $canvas, data, layer, 'delay' );
		}
	}
	return $canvases;
};

// Delay animation all layers in a layer group
$.fn.delayLayerGroup = function delayLayerGroup( groupId, duration ) {
	var $canvases = this, $canvas, e,
		group, layer, l;
	duration = duration || 0;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );

		group = $canvas.getLayerGroup( groupId );
		// Delay all layers in the group
		if ( group ) {

			for ( l = 0; l < group.length; l += 1 ) {
				// Delay each layer in the group
				layer = group[ l ];
				$canvas.delayLayer( layer, duration );
			}

		}
	}
	return $canvases;
};

// Stop layer animation
$.fn.stopLayer = function stopLayer( layerId, clearQueue ) {
	var $canvases = this, $canvas, e,
		data, layer;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );
		data = _getCanvasData( $canvases[ e ] );
		layer = $canvas.getLayer( layerId );
		// If layer exists
		if ( layer ) {
			// Stop animation
			$( layer ).stop( clearQueue );
			_triggerLayerEvent( $canvas, data, layer, 'stop' );
		}
	}
	return $canvases;
};

// Stop animation of all layers in a layer group
$.fn.stopLayerGroup = function stopLayerGroup( groupId, clearQueue ) {
	var $canvases = this, $canvas, e,
		group, layer, l;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );

		group = $canvas.getLayerGroup( groupId );
		// Stop all layers in the group
		if ( group ) {

			for ( l = 0; l < group.length; l += 1 ) {
				// Stop each layer in the group
				layer = group[ l ];
				$canvas.stopLayer( layer, clearQueue );
			}

		}
	}
	return $canvases;
};

// Enable animation for color properties
function _supportColorProps( props ) {
	var p;
	for ( p = 0; p < props.length; p += 1 ) {
		$.fx.step[ props[ p ] ] = _animateColor;
	}
}

// Enable animation for color properties
_supportColorProps( [
	'color',
	'backgroundColor',
	'borderColor',
	'borderTopColor',
	'borderRightColor',
	'borderBottomColor',
	'borderLeftColor',
	'fillStyle',
	'outlineColor',
	'strokeStyle',
	'shadowColor'
] );

/* Event API */

// Map standard mouse events to touch events
maps.touchEvents = {
	'mousedown': 'touchstart',
	'mouseup': 'touchend',
	'mousemove': 'touchmove'
};
// Map standard touch events to mouse events
maps.mouseEvents = {
	'touchstart': 'mousedown',
	'touchend': 'mouseup',
	'touchmove': 'mousemove'
};

// Convert mouse event name to a corresponding touch event name ( if possible )
function _getTouchEventName( eventName ) {
	// Detect touch event support
	if ( maps.touchEvents[ eventName ] ) {
		eventName = maps.touchEvents[ eventName ];
	}
	return eventName;
}
// Convert touch event name to a corresponding mouse event name
function _getMouseEventName( eventName ) {
	if ( maps.mouseEvents[ eventName ] ) {
		eventName = maps.mouseEvents[ eventName ];
	}
	return eventName;
}

// Bind event to jCanvas layer using standard jQuery events
function _createEvent( eventName ) {

	jCanvas.events[ eventName ] = function ( $canvas, data ) {
		var helperEventName, touchEventName, eventCache;

		// Retrieve canvas's event cache
		eventCache = data.event;

		// Both mouseover/mouseout events will be managed by a single mousemove event
		helperEventName = ( eventName === 'mouseover' || eventName === 'mouseout' ) ? 'mousemove' : eventName;
		touchEventName = _getTouchEventName( helperEventName );

		function eventCallback( event ) {
			// Cache current mouse position and redraw layers
			eventCache.x = event.offsetX;
			eventCache.y = event.offsetY;
			eventCache.type = helperEventName;
			eventCache.event = event;
			// Redraw layers on every trigger of the event
			$canvas.drawLayers( {
				resetFire: TRUE
			} );
			// Prevent default event behavior
			event.preventDefault();
		}

		// Ensure the event is not bound more than once
		if ( !data.events[ helperEventName ] ) {
			// Bind one canvas event which handles all layer events of that type
			if ( touchEventName !== helperEventName ) {
				$canvas.bind( helperEventName + '.jCanvas ' + touchEventName + '.jCanvas', eventCallback );
			} else {
				$canvas.bind( helperEventName + '.jCanvas', eventCallback );
			}
			// Prevent this event from being bound twice
			data.events[ helperEventName ] = TRUE;
		}
	};
}
function _createEvents( eventNames ) {
	var n;
	for ( n = 0; n < eventNames.length; n += 1 ) {
		_createEvent( eventNames[ n ] );
	}
}
// Populate jCanvas events object with some standard events
_createEvents( [
	'click',
	'dblclick',
	'mousedown',
	'mouseup',
	'mousemove',
	'mouseover',
	'mouseout',
	'touchstart',
	'touchmove',
	'touchend',
	'contextmenu'
] );

// Check if event fires when a drawing is drawn
function _detectEvents( canvas, ctx, params ) {
	var layer, data, eventCache, intersects,
		transforms, x, y, angle;

	// Use the layer object stored by the given parameters object
	layer = params._args;
	// Canvas must have event bindings
	if ( layer ) {

		data = _getCanvasData( canvas );
		eventCache = data.event;
		if ( eventCache.x !== NULL && eventCache.y !== NULL ) {
			// Respect user-defined pixel ratio
			x = eventCache.x * data.pixelRatio;
			y = eventCache.y * data.pixelRatio;
			// Determine if the given coordinates are in the current path
			intersects = ctx.isPointInPath( x, y ) || ( ctx.isPointInStroke && ctx.isPointInStroke( x, y ) );
		}
		transforms = data.transforms;

		// Allow callback functions to retrieve the mouse coordinates
		layer.eventX = eventCache.x;
		layer.eventY = eventCache.y;
		layer.event = eventCache.event;

		// Adjust coordinates to match current canvas transformation

		// Keep track of some transformation values
		angle = data.transforms.rotate;
		x = layer.eventX;
		y = layer.eventY;

		if ( angle !== 0 ) {
			// Rotate coordinates if coordinate space has been rotated
			layer._eventX = ( x * cos( -angle ) ) - ( y * sin( -angle ) );
			layer._eventY = ( y * cos( -angle ) ) + ( x * sin( -angle ) );
		} else {
			// Otherwise, no calculations need to be made
			layer._eventX = x;
			layer._eventY = y;
		}

		// Scale coordinates
		layer._eventX /= transforms.scaleX;
		layer._eventY /= transforms.scaleY;

		// If layer intersects with cursor
		if ( intersects ) {
			// Add it to a list of layers that intersect with cursor
			data.intersecting.push( layer );
		}
		layer.intersects = !!intersects;
	}
}

// Normalize offsetX and offsetY for all browsers
$.event.fix = function ( event ) {
	var offset, originalEvent, touches;

	event = jQueryEventFix.call( $.event, event );
	originalEvent = event.originalEvent;

	// originalEvent does not exist for manually-triggered events
	if ( originalEvent ) {

		touches = originalEvent.changedTouches;

		// If offsetX and offsetY are not supported, define them
		if ( event.pageX !== UNDEFINED && event.offsetX === UNDEFINED ) {
			offset = $( event.currentTarget ).offset();
			if ( offset ) {
				event.offsetX = event.pageX - offset.left;
				event.offsetY = event.pageY - offset.top;
			}
		} else if ( touches ) {
			// Enable offsetX and offsetY for mobile devices
			offset = $( event.currentTarget ).offset();
			if ( offset ) {
				event.offsetX = touches[ 0 ].pageX - offset.left;
				event.offsetY = touches[ 0 ].pageY - offset.top;
			}
		}

	}
	return event;
};

/* Drawing API */

// Map drawing names with their respective method names
maps.drawings = {
	'arc': 'drawArc',
	'bezier': 'drawBezier',
	'ellipse': 'drawEllipse',
	'function': 'draw',
	'image': 'drawImage',
	'line': 'drawLine',
	'path': 'drawPath',
	'polygon': 'drawPolygon',
	'slice': 'drawSlice',
	'quadratic': 'drawQuadratic',
	'rectangle': 'drawRect',
	'text': 'drawText',
	'vector': 'drawVector',
	'save': 'saveCanvas',
	'restore': 'restoreCanvas',
	'rotate': 'rotateCanvas',
	'scale': 'scaleCanvas',
	'translate': 'translateCanvas'
};

// Draws on canvas using a function
$.fn.draw = function draw( args ) {
	var $canvases = this, $canvas, e, ctx,
		params = new jCanvasObject( args ),
		layer;

	// Draw using any other method
	if ( maps.drawings[ params.type ] && params.type !== 'function' ) {

		$canvases[ maps.drawings[ params.type ] ]( args );

	} else {

		for ( e = 0; e < $canvases.length; e += 1 ) {
			$canvas = $( $canvases[ e ] );
			ctx = _getContext( $canvases[ e ] );
			if ( ctx ) {

				params = new jCanvasObject( args );
				layer = _addLayer( $canvases[ e ], params, args, draw );
				if ( params.visible ) {

					if ( params.fn ) {
						// Call the given user-defined function
						params.fn.call( $canvases[ e ], ctx, params );
					}

				}

			}
		}

	}
	return $canvases;
};

// Clears canvas
$.fn.clearCanvas = function clearCanvas( args ) {
	var $canvases = this, e, ctx,
		params = new jCanvasObject( args ),
		layer;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			if ( params.width === NULL || params.height === NULL ) {
				// Clear entire canvas if width/height is not given

				// Reset current transformation temporarily to ensure that the entire canvas is cleared
				ctx.save();
				ctx.setTransform( 1, 0, 0, 1, 0, 0 );
				ctx.clearRect( 0, 0, $canvases[ e ].width, $canvases[ e ].height );
				ctx.restore();

			} else {
				// Otherwise, clear the defined section of the canvas

				// Transform clear rectangle
				layer = _addLayer( $canvases[ e ], params, args, clearCanvas );
				_transformShape( $canvases[ e ], ctx, params, params.width, params.height );
				ctx.clearRect( params.x - ( params.width / 2 ), params.y - ( params.height / 2 ), params.width, params.height );
				// Restore previous transformation
				_restoreTransform( ctx, params );

			}

		}
	}
	return $canvases;
};

/* Transformation API */

// Restores canvas
$.fn.saveCanvas = function saveCanvas( args ) {
	var $canvases = this, e, ctx,
		params, layer,
		data, i;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			data = _getCanvasData( $canvases[ e ] );

			params = new jCanvasObject( args );
			layer = _addLayer( $canvases[ e ], params, args, saveCanvas );

			// Restore a number of times using the given count
			for ( i = 0; i < params.count; i += 1 ) {
				_saveCanvas( ctx, data );
			}

		}
	}
	return $canvases;
};

// Restores canvas
$.fn.restoreCanvas = function restoreCanvas( args ) {
	var $canvases = this, e, ctx,
		params, layer,
		data, i;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			data = _getCanvasData( $canvases[ e ] );

			params = new jCanvasObject( args );
			layer = _addLayer( $canvases[ e ], params, args, restoreCanvas );

			// Restore a number of times using the given count
			for ( i = 0; i < params.count; i += 1 ) {
				_restoreCanvas( ctx, data );
			}

		}
	}
	return $canvases;
};

// Rotates canvas (internal)
function _rotateCanvas( ctx, params, transforms ) {

	// Get conversion factor for radians
	params._toRad = ( params.inDegrees ? ( PI / 180 ) : 1 );

	// Rotate canvas using shape as center of rotation
	ctx.translate( params.x, params.y );
	ctx.rotate( params.rotate * params._toRad );
	ctx.translate( -params.x, -params.y );

	// If transformation data was given
	if ( transforms ) {
		// Update transformation data
		transforms.rotate += ( params.rotate * params._toRad );
	}
}

// Scales canvas (internal)
function _scaleCanvas( ctx, params, transforms ) {

	// Scale both the x- and y- axis using the 'scale' property
	if ( params.scale !== 1 ) {
		params.scaleX = params.scaleY = params.scale;
	}

	// Scale canvas using shape as center of rotation
	ctx.translate( params.x, params.y );
	ctx.scale( params.scaleX, params.scaleY );
	ctx.translate( -params.x, -params.y );

	// If transformation data was given
	if ( transforms ) {
		// Update transformation data
		transforms.scaleX *= params.scaleX;
		transforms.scaleY *= params.scaleY;
	}
}

// Translates canvas (internal)
function _translateCanvas( ctx, params, transforms ) {

	// Translate both the x- and y-axis using the 'translate' property
	if ( params.translate ) {
		params.translateX = params.translateY = params.translate;
	}

	// Translate canvas
	ctx.translate( params.translateX, params.translateY );

	// If transformation data was given
	if ( transforms ) {
		// Update transformation data
		transforms.translateX += params.translateX;
		transforms.translateY += params.translateY;
	}
}

// Rotates canvas
$.fn.rotateCanvas = function rotateCanvas( args ) {
	var $canvases = this, e, ctx,
		params, layer,
		data;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			data = _getCanvasData( $canvases[ e ] );

			params = new jCanvasObject( args );
			layer = _addLayer( $canvases[ e ], params, args, rotateCanvas );

			// Autosave transformation state by default
			if ( params.autosave ) {
				// Automatically save transformation state by default
				_saveCanvas( ctx, data );
			}
			_rotateCanvas( ctx, params, data.transforms );
		}

	}
	return $canvases;
};

// Scales canvas
$.fn.scaleCanvas = function scaleCanvas( args ) {
	var $canvases = this, e, ctx,
		params, layer,
		data;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			data = _getCanvasData( $canvases[ e ] );

			params = new jCanvasObject( args );
			layer = _addLayer( $canvases[ e ], params, args, scaleCanvas );

			// Autosave transformation state by default
			if ( params.autosave ) {
				// Automatically save transformation state by default
				_saveCanvas( ctx, data );
			}
			_scaleCanvas( ctx, params, data.transforms );

		}
	}
	return $canvases;
};

// Translates canvas
$.fn.translateCanvas = function translateCanvas( args ) {
	var $canvases = this, e, ctx,
		params, layer,
		data;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			data = _getCanvasData( $canvases[ e ] );

			params = new jCanvasObject( args );
			layer = _addLayer( $canvases[ e ], params, args, translateCanvas );

			// Autosave transformation state by default
			if ( params.autosave ) {
				// Automatically save transformation state by default
				_saveCanvas( ctx, data );
			}
			_translateCanvas( ctx, params, data.transforms );

		}
	}
	return $canvases;
};

/* Shape API */

// Draws rectangle
$.fn.drawRect = function drawRect( args ) {
	var $canvases = this, e, ctx,
		params, layer,
		x1, y1,
		x2, y2,
		r, temp;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			params = new jCanvasObject( args );
			layer = _addLayer( $canvases[ e ], params, args, drawRect );
			if ( params.visible ) {

				_transformShape( $canvases[ e ], ctx, params, params.width, params.height );
				_setGlobalProps( $canvases[ e ], ctx, params );

				ctx.beginPath();
				if ( params.width && params.height ) {
					x1 = params.x - ( params.width / 2 );
					y1 = params.y - ( params.height / 2 );
					r = abs( params.cornerRadius );
					// If corner radius is defined and is not zero
					if ( r ) {
						// Draw rectangle with rounded corners if cornerRadius is defined

						x2 = params.x + ( params.width / 2 );
						y2 = params.y + ( params.height / 2 );

						// Handle negative width
						if ( params.width < 0 ) {
							temp = x1;
							x1 = x2;
							x2 = temp;
						}
						// Handle negative height
						if ( params.height < 0 ) {
							temp = y1;
							y1 = y2;
							y2 = temp;
						}

						// Prevent over-rounded corners
						if ( ( x2 - x1 ) - ( 2 * r ) < 0 ) {
							r = ( x2 - x1 ) / 2;
						}
						if ( ( y2 - y1 ) - ( 2 * r ) < 0 ) {
							r = ( y2 - y1 ) / 2;
						}

						// Draw rectangle
						ctx.moveTo( x1 + r, y1 );
						ctx.lineTo( x2 - r, y1 );
						ctx.arc( x2 - r, y1 + r, r, 3 * PI / 2, PI * 2, FALSE );
						ctx.lineTo( x2, y2 - r );
						ctx.arc( x2 - r, y2 - r, r, 0, PI / 2, FALSE );
						ctx.lineTo( x1 + r, y2 );
						ctx.arc( x1 + r, y2 - r, r, PI / 2, PI, FALSE );
						ctx.lineTo( x1, y1 + r );
						ctx.arc( x1 + r, y1 + r, r, PI, 3 * PI / 2, FALSE );
						// Always close path
						params.closed = TRUE;

					} else {

						// Otherwise, draw rectangle with square corners
						ctx.rect( x1, y1, params.width, params.height );

					}
				}
				// Check for jCanvas events
				_detectEvents( $canvases[ e ], ctx, params );
				// Close rectangle path
				_closePath( $canvases[ e ], ctx, params );
			}
		}
	}
	return $canvases;
};

// Retrieves a coterminal angle between 0 and 2pi for the given angle
function _getCoterminal( angle ) {
	while ( angle < 0 ) {
		angle += ( 2 * PI );
	}
	return angle;
}

// Retrieves the x-coordinate for the given angle in a circle
function _getArcX( params, angle ) {
	return params.x + ( params.radius * cos( angle ) );
}
// Retrieves the y-coordinate for the given angle in a circle
function _getArcY( params, angle ) {
	return params.y + ( params.radius * sin( angle ) );
}

// Draws arc (internal)
function _drawArc( canvas, ctx, params, path ) {
	var x1, y1, x2, y2,
		x3, y3, x4, y4,
		offsetX, offsetY,
		diff;

	// Determine offset from dragging
	if ( params === path ) {
		offsetX = 0;
		offsetY = 0;
	} else {
		offsetX = params.x;
		offsetY = params.y;
	}

	// Convert default end angle to radians
	if ( !path.inDegrees && path.end === 360 ) {
		path.end = PI * 2;
	}

	// Convert angles to radians
	path.start *= params._toRad;
	path.end *= params._toRad;
	// Consider 0deg due north of arc
	path.start -= ( PI / 2 );
	path.end -= ( PI / 2 );

	// Ensure arrows are pointed correctly for CCW arcs
	diff = PI / 180;
	if ( path.ccw ) {
		diff *= -1;
	}

	// Calculate coordinates for start arrow
	x1 = _getArcX( path, path.start + diff );
	y1 = _getArcY( path, path.start + diff );
	x2 = _getArcX( path, path.start );
	y2 = _getArcY( path, path.start );

	_addStartArrow(
		canvas, ctx,
		params, path,
		x1, y1,
		x2, y2
	);

	// Draw arc
	ctx.arc( path.x + offsetX, path.y + offsetY, path.radius, path.start, path.end, path.ccw );

	// Calculate coordinates for end arrow
	x3 = _getArcX( path, path.end + diff );
	y3 = _getArcY( path, path.end + diff );
	x4 = _getArcX( path, path.end );
	y4 = _getArcY( path, path.end );

	_addEndArrow(
		canvas, ctx,
		params, path,
		x4, y4,
		x3, y3
	);
}

// Draws arc or circle
$.fn.drawArc = function drawArc( args ) {
	var $canvases = this, e, ctx,
		params, layer;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			params = new jCanvasObject( args );
			layer = _addLayer( $canvases[ e ], params, args, drawArc );
			if ( params.visible ) {

				_transformShape( $canvases[ e ], ctx, params, params.radius * 2 );
				_setGlobalProps( $canvases[ e ], ctx, params );

				ctx.beginPath();
				_drawArc( $canvases[ e ], ctx, params, params );
				// Check for jCanvas events
				_detectEvents( $canvases[ e ], ctx, params );
				// Optionally close path
				_closePath( $canvases[ e ], ctx, params );

			}

		}
	}
	return $canvases;
};

// Draws ellipse
$.fn.drawEllipse = function drawEllipse( args ) {
	var $canvases = this, e, ctx,
		params, layer,
		controlW,
		controlH;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			params = new jCanvasObject( args );
			layer = _addLayer( $canvases[ e ], params, args, drawEllipse );
			if ( params.visible ) {

				_transformShape( $canvases[ e ], ctx, params, params.width, params.height );
				_setGlobalProps( $canvases[ e ], ctx, params );

				// Calculate control width and height
				controlW = params.width * ( 4 / 3 );
				controlH = params.height;

				// Create ellipse using curves
				ctx.beginPath();
				ctx.moveTo( params.x, params.y - ( controlH / 2 ) );
				// Left side
				ctx.bezierCurveTo( params.x - ( controlW / 2 ), params.y - ( controlH / 2 ), params.x - ( controlW / 2 ), params.y + ( controlH / 2 ), params.x, params.y + ( controlH / 2 ) );
				// Right side
				ctx.bezierCurveTo( params.x + ( controlW / 2 ), params.y + ( controlH / 2 ), params.x + ( controlW / 2 ), params.y - ( controlH / 2 ), params.x, params.y - ( controlH / 2 ) );
				// Check for jCanvas events
				_detectEvents( $canvases[ e ], ctx, params );
				// Always close path
				params.closed = TRUE;
				_closePath( $canvases[ e ], ctx, params );

			}
		}
	}
	return $canvases;
};

// Draws a regular ( equal-angled ) polygon
$.fn.drawPolygon = function drawPolygon( args ) {
	var $canvases = this, e, ctx,
		params, layer,
		theta, dtheta, hdtheta,
		apothem,
		x, y, i;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			params = new jCanvasObject( args );
			layer = _addLayer( $canvases[ e ], params, args, drawPolygon );
			if ( params.visible ) {

				_transformShape( $canvases[ e ], ctx, params, params.radius * 2 );
				_setGlobalProps( $canvases[ e ], ctx, params );

				// Polygon's central angle
				dtheta = ( 2 * PI ) / params.sides;
				// Half of dtheta
				hdtheta = dtheta / 2;
				// Polygon's starting angle
				theta = hdtheta + ( PI / 2 );
				// Distance from polygon's center to the middle of its side
				apothem = params.radius * cos( hdtheta );

				// Calculate path and draw
				ctx.beginPath();
				for ( i = 0; i < params.sides; i += 1 ) {

					// Draw side of polygon
					x = params.x + ( params.radius * cos( theta ) );
					y = params.y + ( params.radius * sin( theta ) );

					// Plot point on polygon
					ctx.lineTo( x, y );

					// Project side if chosen
					if ( params.concavity ) {
						// Sides are projected from the polygon's apothem
						x = params.x + ( ( apothem + ( -apothem * params.concavity ) ) * cos( theta + hdtheta ) );
						y = params.y + ( ( apothem + ( -apothem * params.concavity ) ) * sin( theta + hdtheta ) );
						ctx.lineTo( x, y );
					}

					// Increment theta by delta theta
					theta += dtheta;

				}
				// Check for jCanvas events
				_detectEvents( $canvases[ e ], ctx, params );
				// Always close path
				params.closed = TRUE;
				_closePath( $canvases[ e ], ctx, params );

			}
		}
	}
	return $canvases;
};

// Draws pie-shaped slice
$.fn.drawSlice = function drawSlice( args ) {
	var $canvases = this, $canvas, e, ctx,
		params, layer,
		angle, dx, dy;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			params = new jCanvasObject( args );
			layer = _addLayer( $canvases[ e ], params, args, drawSlice );
			if ( params.visible ) {

				_transformShape( $canvases[ e ], ctx, params, params.radius * 2 );
				_setGlobalProps( $canvases[ e ], ctx, params );

				// Perform extra calculations

				// Convert angles to radians
				params.start *= params._toRad;
				params.end *= params._toRad;
				// Consider 0deg at north of arc
				params.start -= ( PI / 2 );
				params.end -= ( PI / 2 );

				// Find positive equivalents of angles
				params.start = _getCoterminal( params.start );
				params.end = _getCoterminal( params.end );
				// Ensure start angle is less than end angle
				if ( params.end < params.start ) {
					params.end += ( 2 * PI );
				}

				// Calculate angular position of slice
				angle = ( ( params.start + params.end ) / 2 );

				// Calculate ratios for slice's angle
				dx = ( params.radius * params.spread * cos( angle ) );
				dy = ( params.radius * params.spread * sin( angle ) );

				// Adjust position of slice
				params.x += dx;
				params.y += dy;

				// Draw slice
				ctx.beginPath();
				ctx.arc( params.x, params.y, params.radius, params.start, params.end, params.ccw );
				ctx.lineTo( params.x, params.y );
				// Check for jCanvas events
				_detectEvents( $canvases[ e ], ctx, params );
				// Always close path
				params.closed = TRUE;
				_closePath( $canvases[ e ], ctx, params );

			}

		}
	}
	return $canvases;
};

/* Path API */

// Adds arrow to path using the given properties
function _addArrow( canvas, ctx, params, path, x1, y1, x2, y2 ) {
	var leftX, leftY,
		rightX, rightY,
		offsetX, offsetY,
		angle;

	// If arrow radius is given and path is not closed
	if ( path.arrowRadius && !params.closed ) {

		// Calculate angle
		angle = atan2( ( y2 - y1 ), ( x2 - x1 ) );
		// Adjust angle correctly
		angle -= PI;
		// Calculate offset to place arrow at edge of path
		offsetX = ( params.strokeWidth * cos( angle ) );
		offsetY = ( params.strokeWidth * sin( angle ) );

		// Calculate coordinates for left half of arrow
		leftX = x2 + ( path.arrowRadius * cos( angle + ( path.arrowAngle / 2 ) ) );
		leftY = y2 + ( path.arrowRadius * sin( angle + ( path.arrowAngle / 2 ) ) );
		// Calculate coordinates for right half of arrow
		rightX = x2 + ( path.arrowRadius * cos( angle - ( path.arrowAngle / 2 ) ) );
		rightY = y2 + ( path.arrowRadius * sin( angle - ( path.arrowAngle / 2 ) ) );

		// Draw left half of arrow
		ctx.moveTo( leftX - offsetX, leftY - offsetY );
		ctx.lineTo( x2 - offsetX, y2 - offsetY );
		// Draw right half of arrow
		ctx.lineTo( rightX - offsetX, rightY - offsetY );

		// Visually connect arrow to path
		ctx.moveTo( x2 - offsetX, y2 - offsetY );
		ctx.lineTo( x2 + offsetX, y2 + offsetY );
		// Move back to end of path
		ctx.moveTo( x2, y2 );

	}
}

// Optionally adds arrow to start of path
function _addStartArrow( canvas, ctx, params, path, x1, y1, x2, y2 ) {
	if ( !path._arrowAngleConverted ) {
		path.arrowAngle *= params._toRad;
		path._arrowAngleConverted = TRUE;
	}
	if ( path.startArrow ) {
		_addArrow( canvas, ctx, params, path, x1, y1, x2, y2 );
	}
}

// Optionally adds arrow to end of path
function _addEndArrow( canvas, ctx, params, path, x1, y1, x2, y2 ) {
	if ( !path._arrowAngleConverted ) {
		path.arrowAngle *= params._toRad;
		path._arrowAngleConverted = TRUE;
	}
	if ( path.endArrow ) {
		_addArrow( canvas, ctx, params, path, x1, y1, x2, y2 );
	}
}

// Draws line (internal)
function _drawLine( canvas, ctx, params, path ) {
	var l,
		lx, ly;
	l = 2;
	_addStartArrow(
		canvas, ctx,
		params, path,
		path.x2 + params.x,
		path.y2 + params.y,
		path.x1 + params.x,
		path.y1 + params.y
	);
	if ( path.x1 !== UNDEFINED && path.y1 !== UNDEFINED ) {
		ctx.moveTo( path.x1 + params.x, path.y1 + params.y );
	}
	while ( TRUE ) {
		// Calculate next coordinates
		lx = path[ 'x' + l ];
		ly = path[ 'y' + l ];
		// If coordinates are given
		if ( lx !== UNDEFINED && ly !== UNDEFINED ) {
			// Draw next line
			ctx.lineTo( lx + params.x, ly + params.y );
			l += 1;
		} else {
			// Otherwise, stop drawing
			break;
		}
	}
	l -= 1;
	// Optionally add arrows to path
	_addEndArrow(
		canvas, ctx,
		params,
		path,
		path[ 'x' + ( l - 1 ) ] + params.x,
		path[ 'y' + ( l - 1 ) ] + params.y,
		path[ 'x' + l ] + params.x,
		path[ 'y' + l ] + params.y
	);
}

// Draws line
$.fn.drawLine = function drawLine( args ) {
	var $canvases = this, e, ctx,
		params, layer;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			params = new jCanvasObject( args );
			layer = _addLayer( $canvases[ e ], params, args, drawLine );
			if ( params.visible ) {

				_transformShape( $canvases[ e ], ctx, params );
				_setGlobalProps( $canvases[ e ], ctx, params );

				// Draw each point
				ctx.beginPath();
				_drawLine( $canvases[ e ], ctx, params, params );
				// Check for jCanvas events
				_detectEvents( $canvases[ e ], ctx, params );
				// Optionally close path
				_closePath( $canvases[ e ], ctx, params );

			}

		}
	}
	return $canvases;
};

// Draws quadratic curve (internal)
function _drawQuadratic( canvas, ctx, params, path ) {
	var l,
		lx, ly,
		lcx, lcy;

	l = 2;

	_addStartArrow(
		canvas,
		ctx,
		params,
		path,
		path.cx1 + params.x,
		path.cy1 + params.y,
		path.x1 + params.x,
		path.y1 + params.y
	);

	if ( path.x1 !== UNDEFINED && path.y1 !== UNDEFINED ) {
		ctx.moveTo( path.x1 + params.x, path.y1 + params.y );
	}
	while ( TRUE ) {
		// Calculate next coordinates
		lx = path[ 'x' + l ];
		ly = path[ 'y' + l ];
		lcx = path[ 'cx' + ( l - 1 ) ];
		lcy = path[ 'cy' + ( l - 1 ) ];
		// If coordinates are given
		if ( lx !== UNDEFINED && ly !== UNDEFINED && lcx !== UNDEFINED && lcy !== UNDEFINED ) {
			// Draw next curve
			ctx.quadraticCurveTo( lcx + params.x, lcy + params.y, lx + params.x, ly + params.y );
			l += 1;
		} else {
			// Otherwise, stop drawing
			break;
		}
	}
	l -= 1;
	_addEndArrow(
		canvas,
		ctx,
		params,
		path,
		path[ 'cx' + ( l - 1 ) ] + params.x,
		path[ 'cy' + ( l - 1 ) ] + params.y,
		path[ 'x' + l ] + params.x,
		path[ 'y' + l ] + params.y
	);
}

// Draws quadratic curve
$.fn.drawQuadratic = function drawQuadratic( args ) {
	var $canvases = this, e, ctx,
		params, layer;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			params = new jCanvasObject( args );
			layer = _addLayer( $canvases[ e ], params, args, drawQuadratic );
			if ( params.visible ) {

				_transformShape( $canvases[ e ], ctx, params );
				_setGlobalProps( $canvases[ e ], ctx, params );

				// Draw each point
				ctx.beginPath();
				_drawQuadratic( $canvases[ e ], ctx, params, params );
				// Check for jCanvas events
				_detectEvents( $canvases[ e ], ctx, params );
				// Optionally close path
				_closePath( $canvases[ e ], ctx, params );

			}
		}
	}
	return $canvases;
};

// Draws Bezier curve (internal)
function _drawBezier( canvas, ctx, params, path ) {
	var l, lc,
		lx, ly,
		lcx1, lcy1,
		lcx2, lcy2;

	l = 2;
	lc = 1;

	_addStartArrow(
		canvas,
		ctx,
		params,
		path,
		path.cx1 + params.x,
		path.cy1 + params.y,
		path.x1 + params.x,
		path.y1 + params.y
	);

	if ( path.x1 !== UNDEFINED && path.y1 !== UNDEFINED ) {
		ctx.moveTo( path.x1 + params.x, path.y1 + params.y );
	}
	while ( TRUE ) {
		// Calculate next coordinates
		lx = path[ 'x' + l ];
		ly = path[ 'y' + l ];
		lcx1 = path[ 'cx' + lc ];
		lcy1 = path[ 'cy' + lc ];
		lcx2 = path[ 'cx' + ( lc + 1 ) ];
		lcy2 = path[ 'cy' + ( lc + 1 ) ];
		// If next coordinates are given
		if ( lx !== UNDEFINED && ly !== UNDEFINED && lcx1 !== UNDEFINED && lcy1 !== UNDEFINED && lcx2 !== UNDEFINED && lcy2 !== UNDEFINED ) {
			// Draw next curve
			ctx.bezierCurveTo( lcx1 + params.x, lcy1 + params.y, lcx2 + params.x, lcy2 + params.y, lx + params.x, ly + params.y );
			l += 1;
			lc += 2;
		} else {
			// Otherwise, stop drawing
			break;
		}
	}
	l -= 1;
	lc -= 2;
	_addEndArrow(
		canvas,
		ctx,
		params,
		path,
		path[ 'cx' + ( lc + 1 ) ] + params.x,
		path[ 'cy' + ( lc + 1 ) ] + params.y,
		path[ 'x' + l ] + params.x,
		path[ 'y' + l ] + params.y
	);
}

// Draws Bezier curve
$.fn.drawBezier = function drawBezier( args ) {
	var $canvases = this, e, ctx,
		params, layer;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			params = new jCanvasObject( args );
			layer = _addLayer( $canvases[ e ], params, args, drawBezier );
			if ( params.visible ) {

				_transformShape( $canvases[ e ], ctx, params );
				_setGlobalProps( $canvases[ e ], ctx, params );

				// Draw each point
				ctx.beginPath();
				_drawBezier( $canvases[ e ], ctx, params, params );
				// Check for jCanvas events
				_detectEvents( $canvases[ e ], ctx, params );
				// Optionally close path
				_closePath( $canvases[ e ], ctx, params );

			}
		}
	}
	return $canvases;
};

// Retrieves the x-coordinate for the given vector angle and length
function _getVectorX( params, angle, length ) {
	angle *= params._toRad;
	angle -= ( PI / 2 );
	return ( length * cos( angle ) );
}
// Retrieves the y-coordinate for the given vector angle and length
function _getVectorY( params, angle, length ) {
	angle *= params._toRad;
	angle -= ( PI / 2 );
	return ( length * sin( angle ) );
}

// Draws vector (internal) #2
function _drawVector( canvas, ctx, params, path ) {
	var l, angle, length,
		offsetX, offsetY,
		x, y,
		x2, y2,
		x3, y3,
		x4, y4;

	// Determine offset from dragging
	if ( params === path ) {
		offsetX = 0;
		offsetY = 0;
	} else {
		offsetX = params.x;
		offsetY = params.y;
	}

	l = 1;
	x = x2 = x3 = x4 = path.x + offsetX;
	y = y2 = y3 = y4 = path.y + offsetY;

	_addStartArrow(
		canvas, ctx,
		params, path,
		x + _getVectorX( params, path.a1, path.l1 ),
		y + _getVectorY( params, path.a1, path.l1 ),
		x,
		y
	);

	// The vector starts at the given ( x, y ) coordinates
	if ( path.x !== UNDEFINED && path.y !== UNDEFINED ) {
		ctx.moveTo( x, y );
	}
	while ( TRUE ) {

		angle = path[ 'a' + l ];
		length = path[ 'l' + l ];

		if ( angle !== UNDEFINED && length !== UNDEFINED ) {
			// Convert the angle to radians with 0 degrees starting at north
			// Keep track of last two coordinates
			x3 = x4;
			y3 = y4;
			// Compute ( x, y ) coordinates from angle and length
			x4 += _getVectorX( params, angle, length );
			y4 += _getVectorY( params, angle, length );
			// Store the second point
			if ( l === 1 ) {
				x2 = x4;
				y2 = y4;
			}
			ctx.lineTo( x4, y4 );
			l += 1;
		} else {
			// Otherwise, stop drawing
			break;
		}

	}
	_addEndArrow(
		canvas, ctx,
		params, path,
		x3, y3,
		x4, y4
	);
}

// Draws vector
$.fn.drawVector = function drawVector( args ) {
	var $canvases = this, e, ctx,
		params, layer;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			params = new jCanvasObject( args );
			layer = _addLayer( $canvases[ e ], params, args, drawVector );
			if ( params.visible ) {

				_transformShape( $canvases[ e ], ctx, params );
				_setGlobalProps( $canvases[ e ], ctx, params );

				// Draw each point
				ctx.beginPath();
				_drawVector( $canvases[ e ], ctx, params, params );
				// Check for jCanvas events
				_detectEvents( $canvases[ e ], ctx, params );
				// Optionally close path
				_closePath( $canvases[ e ], ctx, params );

			}
		}
	}
	return $canvases;
};

// Draws a path consisting of one or more subpaths
$.fn.drawPath = function drawPath( args ) {
	var $canvases = this, e, ctx,
		params, layer,
		l, lp;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			params = new jCanvasObject( args );
			layer = _addLayer( $canvases[ e ], params, args, drawPath );
			if ( params.visible ) {

				_transformShape( $canvases[ e ], ctx, params );
				_setGlobalProps( $canvases[ e ], ctx, params );

				ctx.beginPath();
				l = 1;
				while ( TRUE ) {
					lp = params[ 'p' + l ];
					if ( lp !== UNDEFINED ) {
						lp = new jCanvasObject( lp );
						if ( lp.type === 'line' ) {
							_drawLine( $canvases[ e ], ctx, params, lp );
						} else if ( lp.type === 'quadratic' ) {
							_drawQuadratic( $canvases[ e ], ctx, params, lp );
						} else if ( lp.type === 'bezier' ) {
							_drawBezier( $canvases[ e ], ctx, params, lp );
						} else if ( lp.type === 'vector' ) {
							_drawVector( $canvases[ e ], ctx, params, lp );
						} else if ( lp.type === 'arc' ) {
							_drawArc( $canvases[ e ], ctx, params, lp );
						}
						l += 1;
					} else {
						break;
					}
				}

				// Check for jCanvas events
				_detectEvents( $canvases[ e ], ctx, params );
				// Optionally close path
				_closePath( $canvases[ e ], ctx, params );

			}

		}
	}
	return $canvases;
};

/* Text API */

// Calculates font string and set it as the canvas font
function _setCanvasFont( canvas, ctx, params ) {
	// Otherwise, use the given font attributes
	if ( !isNaN( Number( params.fontSize ) ) ) {
		// Give font size units if it doesn't have any
		params.fontSize += 'px';
	}
	// Set font using given font properties
	ctx.font = params.fontStyle + ' ' + params.fontSize + ' ' + params.fontFamily;
}

// Measures canvas text
function _measureText( canvas, ctx, params, lines ) {
	var originalSize, curWidth, l,
		propCache = caches.propCache;

	// Used cached width/height if possible
	if ( propCache.text === params.text && propCache.fontStyle === params.fontStyle && propCache.fontSize === params. fontSize && propCache.fontFamily === params.fontFamily && propCache.maxWidth === params.maxWidth && propCache.lineHeight === params.lineHeight ) {

		params.width = propCache.width;
		params.height = propCache.height;

	} else {
		// Calculate text dimensions only once

		// Calculate width of first line ( for comparison )
		params.width = ctx.measureText( lines[ 0 ] ).width;

		// Get width of longest line
		for ( l = 1; l < lines.length; l += 1 ) {

			curWidth = ctx.measureText( lines[ l ] ).width;
			// Ensure text's width is the width of its longest line
			if ( curWidth > params.width ) {
				params.width = curWidth;
			}

		}

		// Save original font size
		originalSize = canvas.style.fontSize;
		// Temporarily set canvas font size to retrieve size in pixels
		canvas.style.fontSize = params.fontSize;
		// Save text width and height in parameters object
		params.height = parseFloat( $.css( canvas, 'fontSize' ) ) * lines.length * params.lineHeight;
		// Reset font size to original size
		canvas.style.fontSize = originalSize;
	}
}

// Wraps a string of text within a defined width
function _wrapText( ctx, params ) {
	var allText = params.text,
		// Maximum line width ( optional )
		maxWidth = params.maxWidth,
		// Lines created by manual line breaks ( \n )
		manualLines = allText.split( '\n' ),
		// All lines created manually and by wrapping
		allLines = [],
		// Other variables
		lines, line, l,
		text, words, w;

	// Loop through manually-broken lines
	for ( l = 0; l < manualLines.length; l += 1 ) {

		text = manualLines[ l ];
		// Split line into list of words
		words = text.split( ' ' );
		lines = [];
		line = '';

		// If text is short enough initially
		// Or, if the text consists of only one word
		if ( words.length === 1 || ctx.measureText( text ).width < maxWidth ) {

			// No need to wrap text
			lines = [ text ];

		} else {

			// Wrap lines
			for ( w = 0; w < words.length; w += 1 ) {

				// Once line gets too wide, push word to next line
				if ( ctx.measureText( line + words[ w ] ).width > maxWidth ) {
					// This check prevents empty lines from being created
					if ( line !== '' ) {
						lines.push( line );
					}
					// Start new line and repeat process
					line = '';
				}
				// Add words to line until the line is too wide
				line += words[ w ];
				// Do not add a space after the last word
				if ( w !== ( words.length - 1 ) ) {
					line += ' ';
				}
			}
			// The last word should always be pushed
			lines.push( line );

		}
		// Remove extra space at the end of each line
		allLines = allLines.concat(
			lines
			.join( '\n' )
			.replace( /( (\n))|( $)/gi, '$2' )
			.split( '\n' )
		);

	}

	return allLines;
}

// Draws text on canvas
$.fn.drawText = function drawText( args ) {
	var $canvases = this, $canvas, e, ctx,
		params, layer,
		lines, line, l,
		fontSize, constantCloseness = 500,
		nchars, ch, c,
		x, y;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		$canvas = $( $canvases[ e ] );
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			params = new jCanvasObject( args );
			layer = _addLayer( $canvases[ e ], params, args, drawText );
			if ( params.visible ) {

				// Set text-specific properties
				ctx.textBaseline = params.baseline;
				ctx.textAlign = params.align;

				// Set canvas font using given properties
				_setCanvasFont( $canvases[ e ], ctx, params );

				if ( params.maxWidth !== NULL ) {
					// Wrap text using an internal function
					lines = _wrapText( ctx, params );
				} else {
					// Convert string of text to list of lines
					lines = params.text
					.toString()
					.split( '\n' );
				}

				// Calculate text's width and height
				_measureText( $canvases[ e ], ctx, params, lines );

				// If text is a layer
				if ( layer ) {
					// Copy calculated width/height to layer object
					layer.width = params.width;
					layer.height = params.height;
				}

				_transformShape( $canvases[ e ], ctx, params, params.width, params.height );
				_setGlobalProps( $canvases[ e ], ctx, params );

				// Adjust text position to accomodate different horizontal alignments
				x = params.x;
				if ( params.align === 'left' ) {
					if ( params.respectAlign ) {
						// Realign text to the left if chosen
						params.x += params.width / 2;
					} else {
						// Center text block by default
						x -= params.width / 2;
					}
				} else if ( params.align === 'right' ) {
					if ( params.respectAlign ) {
						// Realign text to the right if chosen
						params.x -= params.width / 2;
					} else {
						// Center text block by default
						x += params.width / 2;
					}
				}

				if ( params.radius ) {

					fontSize = parseFloat( params.fontSize );

					// Greater values move clockwise
					if ( params.letterSpacing === NULL ) {
						params.letterSpacing = fontSize / constantCloseness;
					}

					// Loop through each line of text
					for ( l = 0; l < lines.length; l += 1 ) {
						ctx.save();
						ctx.translate( params.x, params.y );
						line = lines[ l ];
						nchars = line.length;
						ctx.rotate( -( PI * params.letterSpacing * ( nchars - 1 ) ) / 2 );
						// Loop through characters on each line
						for ( c = 0; c < nchars; c += 1 ) {
							ch = line[ c ];
							// If character is not the first character
							if ( c !== 0 ) {
								// Rotate character onto arc
								ctx.rotate( PI * params.letterSpacing );
							}
							ctx.save();
							ctx.translate( 0, -params.radius );
							ctx.fillText( ch, 0, 0 );
							ctx.restore();
						}
						params.radius -= fontSize;
						params.letterSpacing += fontSize / ( constantCloseness * 2 * PI );
						ctx.restore();
					}

				} else {

					// Draw each line of text separately
					for ( l = 0; l < lines.length; l += 1 ) {
						line = lines[ l ];
						// Add line offset to center point, but subtract some to center everything
						y = params.y + ( l * params.height / lines.length ) - ( ( lines.length - 1 ) * params.height / lines.length ) / 2;

						ctx.shadowColor = params.shadowColor;

						// Fill & stroke text
						ctx.fillText( line, x, y );
						// Prevent extra shadow created by stroke ( but only when fill is present )
						if ( params.fillStyle !== 'transparent' ) {
							ctx.shadowColor = 'transparent';
						}
						if ( params.strokeWidth !== 0 ) {
							// Only stroke if the stroke is not 0
							ctx.strokeText( line, x, y );
						}

					}

				}

				// Adjust bounding box according to text baseline
				y = 0;
				if ( params.baseline === 'top' ) {
					y += params.height / 2;
				} else if ( params.baseline === 'bottom' ) {
					y -= params.height / 2;
				}

				// Detect jCanvas events
				if ( params._event ) {
					ctx.beginPath();
					ctx.rect(
						params.x - params.width / 2,
						params.y - params.height / 2 + y,
						params.width,
						params.height
					);
					_detectEvents( $canvases[ e ], ctx, params );
					// Close path and configure masking
					ctx.closePath();
				}
				_restoreTransform( ctx, params );

			}
		}
	}
	// Cache jCanvas parameters object for efficiency
	caches.propCache = params;
	return $canvases;
};

// Measures text width/height using the given parameters
$.fn.measureText = function measureText( args ) {
	var $canvases = this, ctx,
		params, lines;

	// Attempt to retrieve layer
	params = $canvases.getLayer( args );
	// If layer does not exist or if returned object is not a jCanvas layer
	if ( !params || ( params && !params._layer ) ) {
		params = new jCanvasObject( args );
	}

	ctx = _getContext( $canvases[ 0 ] );
	if ( ctx ) {

		// Set canvas font using given properties
		_setCanvasFont( $canvases[ 0 ], ctx, params );
		// Calculate width and height of text
		lines = _wrapText( ctx, params );
		_measureText( $canvases[ 0 ], ctx, params, lines );


	}

	return params;
};

/* Image API */

// Draws image on canvas
$.fn.drawImage = function drawImage( args ) {
	var $canvases = this, canvas, e, ctx, data,
		params, layer,
		img, imgCtx, source,
		imageCache = caches.imageCache;

	// Draw image function
	function draw( canvas, ctx, data, params, layer ) {

		// If width and sWidth are not defined, use image width
		if ( params.width === NULL && params.sWidth === NULL ) {
			params.width = params.sWidth = img.width;
		}
		// If width and sHeight are not defined, use image height
		if ( params.height === NULL && params.sHeight === NULL ) {
			params.height = params.sHeight = img.height;
		}

		// Ensure image layer's width and height are accurate
		if ( layer ) {
			layer.width = params.width;
			layer.height = params.height;
		}

		// Only crop image if all cropping properties are given
		if ( params.sWidth !== NULL && params.sHeight !== NULL && params.sx !== NULL && params.sy !== NULL ) {

			// If width is not defined, use the given sWidth
			if ( params.width === NULL ) {
				params.width = params.sWidth;
			}
			// If height is not defined, use the given sHeight
			if ( params.height === NULL ) {
				params.height = params.sHeight;
			}

			// Optionally crop from top-left corner of region
			if ( params.cropFromCenter ) {
				params.sx += params.sWidth / 2;
				params.sy += params.sHeight / 2;
			}

			// Ensure cropped region does not escape image boundaries

			// Top
			if ( ( params.sy - ( params.sHeight / 2 ) ) < 0 ) {
				params.sy = ( params.sHeight / 2 );
			}
			// Bottom
			if ( ( params.sy + ( params.sHeight / 2 ) ) > img.height ) {
				params.sy = img.height - ( params.sHeight / 2 );
			}
			// Left
			if ( ( params.sx - ( params.sWidth / 2 ) ) < 0 ) {
				params.sx = ( params.sWidth / 2 );
			}
			// Right
			if ( ( params.sx + ( params.sWidth / 2 ) ) > img.width ) {
				params.sx = img.width - ( params.sWidth / 2 );
			}

			_transformShape( canvas, ctx, params, params.width, params.height );
			_setGlobalProps( canvas, ctx, params );

			// Draw image
			ctx.drawImage(
				img,
				params.sx - params.sWidth / 2,
				params.sy - params.sHeight / 2,
				params.sWidth,
				params.sHeight,
				params.x - params.width / 2,
				params.y - params.height / 2,
				params.width,
				params.height
			);

		} else {
			// Show entire image if no crop region is defined

			_transformShape( canvas, ctx, params, params.width, params.height );
			_setGlobalProps( canvas, ctx, params );

			// Draw image on canvas
			ctx.drawImage(
				img,
				params.x - params.width / 2,
				params.y - params.height / 2,
				params.width,
				params.height
			);

		}

		// Draw invisible rectangle to allow for events and masking
		ctx.beginPath();
		ctx.rect(
			params.x - params.width / 2,
			params.y - params.height / 2,
			params.width,
			params.height
		);
		// Check for jCanvas events
		_detectEvents( canvas, ctx, params );
		// Close path and configure masking
		ctx.closePath();
		_restoreTransform( ctx, params );
		_enableMasking( ctx, data, params );
	}
	// On load function
	function onload( canvas, ctx, data, params, layer ) {
		return function () {
			var $canvas = $( canvas );
			draw( canvas, ctx, data, params, layer );
			if ( params.layer ) {
				// Trigger 'load' event for layers
				_triggerLayerEvent( $canvas, data, layer, 'load' );
			} else if ( params.load ) {
				// Run 'load' callback for non-layers
				params.load.call( $canvas[ 0 ], layer );
			}
			// Continue drawing successive layers after this image layer has loaded
			if ( params.layer ) {
				// Store list of previous masks for each layer
				layer._masks = data.transforms.masks.slice( 0 );
				if ( params._next ) {
					// Draw successive layers
					$canvas.drawLayers( {
						clear: FALSE,
						resetFire: TRUE,
						index: params._next
					} );
				}
			}
		};
	}
	for ( e = 0; e < $canvases.length; e += 1 ) {
		canvas = $canvases[ e ];
		ctx = _getContext( $canvases[ e ] );
		if ( ctx ) {

			data = _getCanvasData( $canvases[ e ] );
			params = new jCanvasObject( args );
			layer = _addLayer( $canvases[ e ], params, args, drawImage );
			if ( params.visible ) {

				// Cache the given source
				source = params.source;

				imgCtx = source.getContext;
				if ( source.src || imgCtx ) {
					// Use image or canvas element if given
					img = source;
				} else if ( source ) {
					if ( imageCache[ source ] && imageCache[ source ].complete ) {
						// Get the image element from the cache if possible
						img = imageCache[ source ];
					} else {
						// Otherwise, get the image from the given source URL
						img = new Image();
						// If source URL is not a data URL
						if ( ! source.match( /^data:/i ) ) {
							// Set crossOrigin for this image
							img.crossOrigin = params.crossOrigin;
						}
						img.src = source;
						// Save image in cache for improved performance
						imageCache[ source ] = img;
					}
				}

				if ( img ) {
					if ( img.complete || imgCtx ) {
						// Draw image if already loaded
						onload( canvas, ctx, data, params, layer )();
					} else {
						// Otherwise, draw image when it loads
						img.onload = onload( canvas, ctx, data, params, layer );
						// Fix onload() bug in IE9
						img.src = img.src;
					}
				}

			}
		}
	}
	return $canvases;
};

// Creates a canvas pattern object
$.fn.createPattern = function createPattern( args ) {
	var $canvases = this, ctx,
		params,
		img, imgCtx,
		pattern, source;

	// Function to be called when pattern loads
	function onload() {
		// Create pattern
		pattern = ctx.createPattern( img, params.repeat );
		// Run callback function if defined
		if ( params.load ) {
			params.load.call( $canvases[ 0 ], pattern );
		}
	}

	ctx = _getContext( $canvases[ 0 ] );
	if ( ctx ) {

		params = new jCanvasObject( args );

		// Cache the given source
		source = params.source;

		// Draw when image is loaded ( if load() callback function is defined )

		if ( isFunction( source ) ) {
			// Draw pattern using function if given

			img = $( '<canvas />' )[ 0 ];
			img.width = params.width;
			img.height = params.height;
			imgCtx = _getContext( img );
			source.call( img, imgCtx );
			onload();

		} else {
			// Otherwise, draw pattern using source image

			imgCtx = source.getContext;
			if ( source.src || imgCtx ) {
				// Use image element if given
				img = source;
			} else {
				// Use URL if given to get the image
				img = new Image();
				// If source URL is not a data URL
				if ( ! source.match( /^data:/i ) ) {
					// Set crossOrigin for this image
					img.crossOrigin = params.crossOrigin;
				}
				img.src = source;
			}

			// Create pattern if already loaded
			if ( img.complete || imgCtx ) {
				onload();
			} else {
				img.onload = onload;
				// Fix onload() bug in IE9
				img.src = img.src;
			}

		}

	} else {

		pattern = NULL;

	}
	return pattern;
};

// Creates a canvas gradient object
$.fn.createGradient = function createGradient( args ) {
	var $canvases = this, ctx,
		params,
		gradient,
		stops = [], nstops,
		start, end,
		i, a, n, p;

	params = new jCanvasObject( args );
	ctx = _getContext( $canvases[ 0 ] );
	if ( ctx ) {

		// Gradient coordinates must be defined
		params.x1 = params.x1 || 0;
		params.y1 = params.y1 || 0;
		params.x2 = params.x2 || 0;
		params.y2 = params.y2 || 0;

		if ( params.r1 !== NULL && params.r2 !== NULL ) {
			// Create radial gradient if chosen
			gradient = ctx.createRadialGradient( params.x1, params.y1, params.r1, params.x2, params.y2, params.r2 );
		} else {
			// Otherwise, create a linear gradient by default
			gradient = ctx.createLinearGradient( params.x1, params.y1, params.x2, params.y2 );
		}

		// Count number of color stops
		for ( i = 1; params[ 'c' + i ] !== UNDEFINED; i += 1 ) {
			if ( params[ 's' + i ] !== UNDEFINED ) {
				stops.push( params[ 's' + i ] );
			} else {
				stops.push( NULL );
			}
		}
		nstops = stops.length;

		// Define start stop if not already defined
		if ( stops[ 0 ] === NULL ) {
			stops[ 0 ] = 0;
		}
		// Define end stop if not already defined
		if ( stops[ nstops - 1 ] === NULL ) {
			stops[ nstops - 1 ] = 1;
		}

		// Loop through color stops to fill in the blanks
		for ( i = 0; i < nstops; i += 1 ) {
			// A progression, in this context, is defined as all of the color stops between and including two known color stops

			if ( stops[ i ] !== NULL ) {
				// Start a new progression if stop is a number

				// Number of stops in current progression
				n = 1;
				// Current iteration in current progression
				p = 0;
				start = stops[ i ];

				// Look ahead to find end stop
				for ( a = ( i + 1 ); a < nstops; a += 1 ) {
					if ( stops[ a ] !== NULL ) {
						// If this future stop is a number, make it the end stop for this progression
						end = stops[ a ];
						break;
					} else {
						// Otherwise, keep looking ahead
						n += 1;
					}
				}

				// Ensure start stop is not greater than end stop
				if ( start > end ) {
					stops[ a ] = stops[ i ];
				}

			} else if ( stops[ i ] === NULL ) {
				// Calculate stop if not initially given
				p += 1;
				stops[ i ] = start + ( p * ( ( end - start ) / n ) );
			}
			// Add color stop to gradient object
			gradient.addColorStop( stops[ i ], params[ 'c' + ( i + 1 ) ] );
		}

	} else {
		gradient = NULL;
	}
	return gradient;
};

// Manipulates pixels on the canvas
$.fn.setPixels = function setPixels( args ) {
	var $canvases = this,
		canvas, e, ctx,
		params, layer,
		px,
		imgData, data, i, len;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		canvas = $canvases[ e ];
		ctx = _getContext( canvas );
		if ( ctx ) {

			params = new jCanvasObject( args );
			layer = _addLayer( canvas, params, args, setPixels );
			_transformShape( $canvases[ e ], ctx, params, params.width, params.height );

			// Use entire canvas of x, y, width, or height is not defined
			if ( params.width === NULL || params.height === NULL ) {
				params.width = canvas.width;
				params.height = canvas.height;
				params.x = params.width / 2;
				params.y = params.height / 2;
			}

			if ( params.width !== 0 && params.height !== 0 ) {
				// Only set pixels if width and height are not zero

				imgData = ctx.getImageData( params.x - ( params.width / 2 ), params.y - ( params.height / 2 ), params.width, params.height );
				data = imgData.data;
				len = data.length;

				// Loop through pixels with the "each" callback function
				if ( params.each ) {
					for ( i = 0; i < len; i += 4 ) {
						px = {
							r: data[ i ],
							g: data[ i + 1 ],
							b: data[ i + 2 ],
							a: data[ i + 3 ]
						};
						params.each.call( canvas, px, params );
						data[ i ] = px.r;
						data[ i + 1 ] = px.g;
						data[ i + 2 ] = px.b;
						data[ i + 3 ] = px.a;
					}
				}
				// Put pixels on canvas
				ctx.putImageData( imgData, params.x - ( params.width / 2 ), params.y - ( params.height / 2 ) );
				// Restore transformation
				ctx.restore();

			}

		}
	}
	return $canvases;
};

// Retrieves canvas image as data URL
$.fn.getCanvasImage = function getCanvasImage( type, quality ) {
	var $canvases = this, canvas,
		dataURL = NULL;
	if ( $canvases.length !== 0 ) {
		canvas = $canvases[ 0 ];
		if ( canvas.toDataURL ) {
			// JPEG quality defaults to 1
			if ( quality === UNDEFINED ) {
				quality = 1;
			}
			dataURL = canvas.toDataURL( 'image/' + type, quality );
		}
	}
	return dataURL;
};

// Scales canvas based on the device's pixel ratio
$.fn.detectPixelRatio = function detectPixelRatio( callback ) {
	var $canvases = this,
		$canvas, canvas, e, ctx,
		devicePixelRatio, backingStoreRatio, ratio,
		oldWidth, oldHeight,
		data;

	for ( e = 0; e < $canvases.length; e += 1 ) {
		// Get canvas and its associated data
		canvas = $canvases[ e ];
		$canvas = $( $canvases[ e ] );
		ctx = _getContext( canvas );
		data = _getCanvasData( $canvases[ e ] );

		// If canvas has not already been scaled with this method
		if ( !data.scaled ) {

			// Determine device pixel ratios
			devicePixelRatio = window.devicePixelRatio || 1;
			backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
				ctx.mozBackingStorePixelRatio ||
				ctx.msBackingStorePixelRatio ||
				ctx.oBackingStorePixelRatio ||
				ctx.backingStorePixelRatio || 1;

			// Calculate general ratio based on the two given ratios
			ratio = devicePixelRatio / backingStoreRatio;

			if ( ratio !== 1 ) {
				// Scale canvas relative to ratio

				// Get the current canvas dimensions for future use
				oldWidth = canvas.width;
				oldHeight = canvas.height;

				// Resize canvas relative to the determined ratio
				canvas.width = oldWidth * ratio;
				canvas.height = oldHeight * ratio;

				// Scale canvas back to original dimensions via CSS
				canvas.style.width = oldWidth + 'px';
				canvas.style.height = oldHeight + 'px';

				// Scale context to counter the manual scaling of canvas
				ctx.scale( ratio, ratio );

			}

			// Set pixel ratio on canvas data object
			data.pixelRatio = ratio;
			// Ensure that this method can only be called once for any given canvas
			data.scaled = TRUE;

			// Call the given callback function with the ratio as its only argument
			if ( callback ) {
				callback.call( canvas, ratio );
			}

		}

	}
	return $canvases;
};

// Clears the jCanvas cache
jCanvas.clearCache = function clearCache() {
	var cacheName;
	for ( cacheName in caches ) {
		if ( caches.hasOwnProperty( cacheName ) ) {
			caches[ cacheName ] = {};
		}
	}
};

// Enable canvas feature detection with $.support
$.support.canvas = ( $( '<canvas />' )[ 0 ].getContext !== UNDEFINED );

// Export jCanvas functions
extendObject( jCanvas, {
	defaults: defaults,
	setGlobalProps: _setGlobalProps,
	transformShape: _transformShape,
	detectEvents: _detectEvents,
	closePath: _closePath,
	setCanvasFont: _setCanvasFont,
	measureText: _measureText
} );
$.jCanvas = jCanvas;
$.jCanvasObject = jCanvasObject;

}));
