/*! noUiSlider - 7.0.9 - 2014-10-08 16:49:44 */

(function(){

	'use strict';

var
/** @const */ FormatOptions = [
	'decimals',
	'thousand',
	'mark',
	'prefix',
	'postfix',
	'encoder',
	'decoder',
	'negativeBefore',
	'negative',
	'edit',
	'undo'
];

// General

	// Reverse a string
	function strReverse ( a ) {
		return a.split('').reverse().join('');
	}

	// Check if a string starts with a specified prefix.
	function strStartsWith ( input, match ) {
		return input.substring(0, match.length) === match;
	}

	// Check is a string ends in a specified postfix.
	function strEndsWith ( input, match ) {
		return input.slice(-1 * match.length) === match;
	}

	// Throw an error if formatting options are incompatible.
	function throwEqualError( F, a, b ) {
		if ( (F[a] || F[b]) && (F[a] === F[b]) ) {
			throw new Error(a);
		}
	}

	// Check if a number is finite and not NaN
	function isValidNumber ( input ) {
		return typeof input === 'number' && isFinite( input );
	}

	// Provide rounding-accurate toFixed method.
	function toFixed ( value, decimals ) {
		var scale = Math.pow(10, decimals);
		return ( Math.round(value * scale) / scale).toFixed( decimals );
	}


// Formatting

	// Accept a number as input, output formatted string.
	function formatTo ( decimals, thousand, mark, prefix, postfix, encoder, decoder, negativeBefore, negative, edit, undo, input ) {

		var originalInput = input, inputIsNegative, inputPieces, inputBase, inputDecimals = '', output = '';

		// Apply user encoder to the input.
		// Expected outcome: number.
		if ( encoder ) {
			input = encoder(input);
		}

		// Stop if no valid number was provided, the number is infinite or NaN.
		if ( !isValidNumber(input) ) {
			return false;
		}

		// Rounding away decimals might cause a value of -0
		// when using very small ranges. Remove those cases.
		if ( decimals && parseFloat(input.toFixed(decimals)) === 0 ) {
			input = 0;
		}

		// Formatting is done on absolute numbers,
		// decorated by an optional negative symbol.
		if ( input < 0 ) {
			inputIsNegative = true;
			input = Math.abs(input);
		}

		// Reduce the number of decimals to the specified option.
		if ( decimals !== false ) {
			input = toFixed( input, decimals );
		}

		// Transform the number into a string, so it can be split.
		input = input.toString();

		// Break the number on the decimal separator.
		if ( input.indexOf('.') !== -1 ) {
			inputPieces = input.split('.');

			inputBase = inputPieces[0];

			if ( mark ) {
				inputDecimals = mark + inputPieces[1];
			}

		} else {

		// If it isn't split, the entire number will do.
			inputBase = input;
		}

		// Group numbers in sets of three.
		if ( thousand ) {
			inputBase = strReverse(inputBase).match(/.{1,3}/g);
			inputBase = strReverse(inputBase.join( strReverse( thousand ) ));
		}

		// If the number is negative, prefix with negation symbol.
		if ( inputIsNegative && negativeBefore ) {
			output += negativeBefore;
		}

		// Prefix the number
		if ( prefix ) {
			output += prefix;
		}

		// Normal negative option comes after the prefix. Defaults to '-'.
		if ( inputIsNegative && negative ) {
			output += negative;
		}

		// Append the actual number.
		output += inputBase;
		output += inputDecimals;

		// Apply the postfix.
		if ( postfix ) {
			output += postfix;
		}

		// Run the output through a user-specified post-formatter.
		if ( edit ) {
			output = edit ( output, originalInput );
		}

		// All done.
		return output;
	}

	// Accept a sting as input, output decoded number.
	function formatFrom ( decimals, thousand, mark, prefix, postfix, encoder, decoder, negativeBefore, negative, edit, undo, input ) {

		var originalInput = input, inputIsNegative, output = '';

		// User defined pre-decoder. Result must be a non empty string.
		if ( undo ) {
			input = undo(input);
		}

		// Test the input. Can't be empty.
		if ( !input || typeof input !== 'string' ) {
			return false;
		}

		// If the string starts with the negativeBefore value: remove it.
		// Remember is was there, the number is negative.
		if ( negativeBefore && strStartsWith(input, negativeBefore) ) {
			input = input.replace(negativeBefore, '');
			inputIsNegative = true;
		}

		// Repeat the same procedure for the prefix.
		if ( prefix && strStartsWith(input, prefix) ) {
			input = input.replace(prefix, '');
		}

		// And again for negative.
		if ( negative && strStartsWith(input, negative) ) {
			input = input.replace(negative, '');
			inputIsNegative = true;
		}

		// Remove the postfix.
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
		if ( postfix && strEndsWith(input, postfix) ) {
			input = input.slice(0, -1 * postfix.length);
		}

		// Remove the thousand grouping.
		if ( thousand ) {
			input = input.split(thousand).join('');
		}

		// Set the decimal separator back to period.
		if ( mark ) {
			input = input.replace(mark, '.');
		}

		// Prepend the negative symbol.
		if ( inputIsNegative ) {
			output += '-';
		}

		// Add the number
		output += input;

		// Trim all non-numeric characters (allow '.' and '-');
		output = output.replace(/[^0-9\.\-.]/g, '');

		// The value contains no parse-able number.
		if ( output === '' ) {
			return false;
		}

		// Covert to number.
		output = Number(output);

		// Run the user-specified post-decoder.
		if ( decoder ) {
			output = decoder(output);
		}

		// Check is the output is valid, otherwise: return false.
		if ( !isValidNumber(output) ) {
			return false;
		}

		return output;
	}


// Framework

	// Validate formatting options
	function validate ( inputOptions ) {

		var i, optionName, optionValue,
			filteredOptions = {};

		for ( i = 0; i < FormatOptions.length; i+=1 ) {

			optionName = FormatOptions[i];
			optionValue = inputOptions[optionName];

			if ( optionValue === undefined ) {

				// Only default if negativeBefore isn't set.
				if ( optionName === 'negative' && !filteredOptions.negativeBefore ) {
					filteredOptions[optionName] = '-';
				// Don't set a default for mark when 'thousand' is set.
				} else if ( optionName === 'mark' && filteredOptions.thousand !== '.' ) {
					filteredOptions[optionName] = '.';
				} else {
					filteredOptions[optionName] = false;
				}

			// Floating points in JS are stable up to 7 decimals.
			} else if ( optionName === 'decimals' ) {
				if ( optionValue >= 0 && optionValue < 8 ) {
					filteredOptions[optionName] = optionValue;
				} else {
					throw new Error(optionName);
				}

			// These options, when provided, must be functions.
			} else if ( optionName === 'encoder' || optionName === 'decoder' || optionName === 'edit' || optionName === 'undo' ) {
				if ( typeof optionValue === 'function' ) {
					filteredOptions[optionName] = optionValue;
				} else {
					throw new Error(optionName);
				}

			// Other options are strings.
			} else {

				if ( typeof optionValue === 'string' ) {
					filteredOptions[optionName] = optionValue;
				} else {
					throw new Error(optionName);
				}
			}
		}

		// Some values can't be extracted from a
		// string if certain combinations are present.
		throwEqualError(filteredOptions, 'mark', 'thousand');
		throwEqualError(filteredOptions, 'prefix', 'negative');
		throwEqualError(filteredOptions, 'prefix', 'negativeBefore');

		return filteredOptions;
	}

	// Pass all options as function arguments
	function passAll ( options, method, input ) {
		var i, args = [];

		// Add all options in order of FormatOptions
		for ( i = 0; i < FormatOptions.length; i+=1 ) {
			args.push(options[FormatOptions[i]]);
		}

		// Append the input, then call the method, presenting all
		// options as arguments.
		args.push(input);
		return method.apply('', args);
	}

	/** @constructor */
	function wNumb ( options ) {

		if ( !(this instanceof wNumb) ) {
			return new wNumb ( options );
		}

		if ( typeof options !== "object" ) {
			return;
		}

		options = validate(options);

		// Call 'formatTo' with proper arguments.
		this.to = function ( input ) {
			return passAll(options, formatTo, input);
		};

		// Call 'formatFrom' with proper arguments.
		this.from = function ( input ) {
			return passAll(options, formatFrom, input);
		};
	}

	/** @export */
	window.wNumb = wNumb;

}());

/*jslint browser: true */
/*jslint white: true */

(function( $ ){

	'use strict';

// Helpers

	// Test in an object is an instance of jQuery or Zepto.
	function isInstance ( a ) {
		return a instanceof $ || ( $.zepto && $.zepto.isZ(a) );
	}


// Link types

	function fromPrefix ( target, method ) {

		// If target is a string, a new hidden input will be created.
		if ( typeof target === 'string' && target.indexOf('-inline-') === 0 ) {

			// By default, use the 'html' method.
			this.method = method || 'html';

			// Use jQuery to create the element
			this.target = this.el = $( target.replace('-inline-', '') || '<div/>' );

			return true;
		}
	}

	function fromString ( target ) {

		// If the string doesn't begin with '-', which is reserved, add a new hidden input.
		if ( typeof target === 'string' && target.indexOf('-') !== 0 ) {

			this.method = 'val';

			var element = document.createElement('input');
				element.name = target;
				element.type = 'hidden';
			this.target = this.el = $(element);

			return true;
		}
	}

	function fromFunction ( target ) {

		// The target can also be a function, which will be called.
		if ( typeof target === 'function' ) {
			this.target = false;
			this.method = target;

			return true;
		}
	}

	function fromInstance ( target, method ) {

		if ( isInstance( target ) && !method ) {

		// If a jQuery/Zepto input element is provided, but no method is set,
		// the element can assume it needs to respond to 'change'...
			if ( target.is('input, select, textarea') ) {

				// Default to .val if this is an input element.
				this.method = 'val';

				// Fire the API changehandler when the target changes.
				this.target = target.on('change.liblink', this.changeHandler);

			} else {

				this.target = target;

				// If no method is set, and we are not auto-binding an input, default to 'html'.
				this.method = 'html';
			}

			return true;
		}
	}

	function fromInstanceMethod ( target, method ) {

		// The method must exist on the element.
		if ( isInstance( target ) &&
			(typeof method === 'function' ||
				(typeof method === 'string' && target[method]))
		) {
			this.method = method;
			this.target = target;

			return true;
		}
	}

var
/** @const */
	creationFunctions = [fromPrefix, fromString, fromFunction, fromInstance, fromInstanceMethod];


// Link Instance

/** @constructor */
	function Link ( target, method, format ) {

		var that = this, valid = false;

		// Forward calls within scope.
		this.changeHandler = function ( changeEvent ) {
			var decodedValue = that.formatInstance.from( $(this).val() );

			// If the value is invalid, stop this event, as well as it's propagation.
			if ( decodedValue === false || isNaN(decodedValue) ) {

				// Reset the value.
				$(this).val(that.lastSetValue);
				return false;
			}

			that.changeHandlerMethod.call( '', changeEvent, decodedValue );
		};

		// See if this Link needs individual targets based on its usage.
		// If so, return the element that needs to be copied by the
		// implementing interface.
		// Default the element to false.
		this.el = false;

		// Store the formatter, or use the default.
		this.formatInstance = format;

		// Try all Link types.
		/*jslint unparam: true*/
		$.each(creationFunctions, function(i, fn){
			valid = fn.call(that, target, method);
			return !valid;
		});
		/*jslint unparam: false*/

		// Nothing matched, throw error.
		if ( !valid ) {
			throw new RangeError("(Link) Invalid Link.");
		}
	}

	// Provides external items with the object value.
	Link.prototype.set = function ( value ) {

		// Ignore the value, so only the passed-on arguments remain.
		var args = Array.prototype.slice.call( arguments ),
			additionalArgs = args.slice(1);

		// Store some values. The actual, numerical value,
		// the formatted value and the parameters for use in 'resetValue'.
		// Slice additionalArgs to break the relation.
		this.lastSetValue = this.formatInstance.to( value );

		// Prepend the value to the function arguments.
		additionalArgs.unshift(
			this.lastSetValue
		);

		// When target is undefined, the target was a function.
		// In that case, provided the object as the calling scope.
		// Branch between writing to a function or an object.
		( typeof this.method === 'function' ?
			this.method :
			this.target[ this.method ] ).apply( this.target, additionalArgs );
	};


// Developer API

/** @constructor */
	function LinkAPI ( origin ) {
		this.items = [];
		this.elements = [];
		this.origin = origin;
	}

	LinkAPI.prototype.push = function( item, element ) {
		this.items.push(item);

		// Prevent 'false' elements
		if ( element ) {
			this.elements.push(element);
		}
	};

	LinkAPI.prototype.reconfirm = function ( flag ) {
		var i;
		for ( i = 0; i < this.elements.length; i += 1 ) {
			this.origin.LinkConfirm(flag, this.elements[i]);
		}
	};

	LinkAPI.prototype.remove = function ( flag ) {
		var i;
		for ( i = 0; i < this.items.length; i += 1 ) {
			this.items[i].target.off('.liblink');
		}
		for ( i = 0; i < this.elements.length; i += 1 ) {
			this.elements[i].remove();
		}
	};

	LinkAPI.prototype.change = function ( value ) {

		if ( this.origin.LinkIsEmitting ) {
			return false;
		}

		this.origin.LinkIsEmitting = true;

		var args = Array.prototype.slice.call( arguments, 1 ), i;
		args.unshift( value );

		// Write values to serialization Links.
		// Convert the value to the correct relative representation.
		for ( i = 0; i < this.items.length; i += 1 ) {
			this.items[i].set.apply(this.items[i], args);
		}

		this.origin.LinkIsEmitting = false;
	};


// jQuery plugin

	function binder ( flag, target, method, format ){

		if ( flag === 0 ) {
			flag = this.LinkDefaultFlag;
		}

		// Create a list of API's (if it didn't exist yet);
		if ( !this.linkAPI ) {
			this.linkAPI = {};
		}

		// Add an API point.
		if ( !this.linkAPI[flag] ) {
			this.linkAPI[flag] = new LinkAPI(this);
		}

		var linkInstance = new Link ( target, method, format || this.LinkDefaultFormatter );

		// Default the calling scope to the linked object.
		if ( !linkInstance.target ) {
			linkInstance.target = $(this);
		}

		// If the Link requires creation of a new element,
		// Pass the element and request confirmation to get the changehandler.
		// Set the method to be called when a Link changes.
		linkInstance.changeHandlerMethod = this.LinkConfirm( flag, linkInstance.el );

		// Store the linkInstance in the flagged list.
		this.linkAPI[flag].push( linkInstance, linkInstance.el );

		// Now that Link have been connected, request an update.
		this.LinkUpdate( flag );
	}

	/** @export */
	$.fn.Link = function( flag ){

		var that = this;

		// Delete all linkAPI
		if ( flag === false ) {

			return that.each(function(){

				// .Link(false) can be called on elements without Links.
				// When that happens, the objects can't be looped.
				if ( !this.linkAPI ) {
					return;
				}

				$.map(this.linkAPI, function(api){
					api.remove();
				});

				delete this.linkAPI;
			});
		}

		if ( flag === undefined ) {

			flag = 0;

		} else if ( typeof flag !== 'string') {

			throw new Error("Flag must be string.");
		}

		return {
			to: function( a, b, c ){
				return that.each(function(){
					binder.call(this, flag, a, b, c);
				});
			}
		};
	};

}( window.jQuery || window.Zepto ));

/*jslint browser: true */
/*jslint white: true */

(function( $ ){

	'use strict';


	// Removes duplicates from an array.
	function unique(array) {
		return $.grep(array, function(el, index) {
			return index === $.inArray(el, array);
		});
	}

	// Round a value to the closest 'to'.
	function closest ( value, to ) {
		return Math.round(value / to) * to;
	}

	// Checks whether a value is numerical.
	function isNumeric ( a ) {
		return typeof a === 'number' && !isNaN( a ) && isFinite( a );
	}

	// Rounds a number to 7 supported decimals.
	function accurateNumber( number ) {
		var p = Math.pow(10, 7);
		return Number((Math.round(number*p)/p).toFixed(7));
	}

	// Sets a class and removes it after [duration] ms.
	function addClassFor ( element, className, duration ) {
		element.addClass(className);
		setTimeout(function(){
			element.removeClass(className);
		}, duration);
	}

	// Limits a value to 0 - 100
	function limit ( a ) {
		return Math.max(Math.min(a, 100), 0);
	}

	// Wraps a variable as an array, if it isn't one yet.
	function asArray ( a ) {
		return $.isArray(a) ? a : [a];
	}


	var
	// Cache the document selector;
	/** @const */
	doc = $(document),
	// Make a backup of the original jQuery/Zepto .val() method.
	/** @const */
	$val = $.fn.val,
	// Namespace for binding and unbinding slider events;
	/** @const */
	namespace = '.nui',
	// Determine the events to bind. IE11 implements pointerEvents without
	// a prefix, which breaks compatibility with the IE10 implementation.
	/** @const */
	actions = window.navigator.pointerEnabled ? {
		start: 'pointerdown',
		move: 'pointermove',
		end: 'pointerup'
	} : window.navigator.msPointerEnabled ? {
		start: 'MSPointerDown',
		move: 'MSPointerMove',
		end: 'MSPointerUp'
	} : {
		start: 'mousedown touchstart',
		move: 'mousemove touchmove',
		end: 'mouseup touchend'
	},
	// Re-usable list of classes;
	/** @const */
	Classes = [
/*  0 */  'noUi-target'
/*  1 */ ,'noUi-base'
/*  2 */ ,'noUi-origin'
/*  3 */ ,'noUi-handle'
/*  4 */ ,'noUi-horizontal'
/*  5 */ ,'noUi-vertical'
/*  6 */ ,'noUi-background'
/*  7 */ ,'noUi-connect'
/*  8 */ ,'noUi-ltr'
/*  9 */ ,'noUi-rtl'
/* 10 */ ,'noUi-dragable'
/* 11 */ ,''
/* 12 */ ,'noUi-state-drag'
/* 13 */ ,''
/* 14 */ ,'noUi-state-tap'
/* 15 */ ,'noUi-active'
/* 16 */ ,''
/* 17 */ ,'noUi-stacking'
	];


// Value calculation

	// Determine the size of a sub-range in relation to a full range.
	function subRangeRatio ( pa, pb ) {
		return (100 / (pb - pa));
	}

	// (percentage) How many percent is this value of this range?
	function fromPercentage ( range, value ) {
		return (value * 100) / ( range[1] - range[0] );
	}

	// (percentage) Where is this value on this range?
	function toPercentage ( range, value ) {
		return fromPercentage( range, range[0] < 0 ?
			value + Math.abs(range[0]) :
				value - range[0] );
	}

	// (value) How much is this percentage on this range?
	function isPercentage ( range, value ) {
		return ((value * ( range[1] - range[0] )) / 100) + range[0];
	}


// Range conversion

	function getJ ( value, arr ) {

		var j = 1;

		while ( value >= arr[j] ){
			j += 1;
		}

		return j;
	}

	// (percentage) Input a value, find where, on a scale of 0-100, it applies.
	function toStepping ( xVal, xPct, value ) {

		if ( value >= xVal.slice(-1)[0] ){
			return 100;
		}

		var j = getJ( value, xVal ), va, vb, pa, pb;

		va = xVal[j-1];
		vb = xVal[j];
		pa = xPct[j-1];
		pb = xPct[j];

		return pa + (toPercentage([va, vb], value) / subRangeRatio (pa, pb));
	}

	// (value) Input a percentage, find where it is on the specified range.
	function fromStepping ( xVal, xPct, value ) {

		// There is no range group that fits 100
		if ( value >= 100 ){
			return xVal.slice(-1)[0];
		}

		var j = getJ( value, xPct ), va, vb, pa, pb;

		va = xVal[j-1];
		vb = xVal[j];
		pa = xPct[j-1];
		pb = xPct[j];

		return isPercentage([va, vb], (value - pa) * subRangeRatio (pa, pb));
	}

	// (percentage) Get the step that applies at a certain value.
	function getStep ( xPct, xSteps, snap, value ) {

		if ( value === 100 ) {
			return value;
		}

		var j = getJ( value, xPct ), a, b;

		// If 'snap' is set, steps are used as fixed points on the slider.
		if ( snap ) {

			a = xPct[j-1];
			b = xPct[j];

			// Find the closest position, a or b.
			if ((value - a) > ((b-a)/2)){
				return b;
			}

			return a;
		}

		if ( !xSteps[j-1] ){
			return value;
		}

		return xPct[j-1] + closest(
			value - xPct[j-1],
			xSteps[j-1]
		);
	}


// Entry parsing

	function handleEntryPoint ( index, value, that ) {

		var percentage;

		// Wrap numerical input in an array.
		if ( typeof value === "number" ) {
			value = [value];
		}

		// Reject any invalid input, by testing whether value is an array.
		if ( Object.prototype.toString.call( value ) !== '[object Array]' ){
			throw new Error("noUiSlider: 'range' contains invalid value.");
		}

		// Covert min/max syntax to 0 and 100.
		if ( index === 'min' ) {
			percentage = 0;
		} else if ( index === 'max' ) {
			percentage = 100;
		} else {
			percentage = parseFloat( index );
		}

		// Check for correct input.
		if ( !isNumeric( percentage ) || !isNumeric( value[0] ) ) {
			throw new Error("noUiSlider: 'range' value isn't numeric.");
		}

		// Store values.
		that.xPct.push( percentage );
		that.xVal.push( value[0] );

		// NaN will evaluate to false too, but to keep
		// logging clear, set step explicitly. Make sure
		// not to override the 'step' setting with false.
		if ( !percentage ) {
			if ( !isNaN( value[1] ) ) {
				that.xSteps[0] = value[1];
			}
		} else {
			that.xSteps.push( isNaN(value[1]) ? false : value[1] );
		}
	}

	function handleStepPoint ( i, n, that ) {

		// Ignore 'false' stepping.
		if ( !n ) {
			return true;
		}

		// Factor to range ratio
		that.xSteps[i] = fromPercentage([
			 that.xVal[i]
			,that.xVal[i+1]
		], n) / subRangeRatio (
			that.xPct[i],
			that.xPct[i+1] );
	}


// Interface

	// The interface to Spectrum handles all direction-based
	// conversions, so the above values are unaware.

	function Spectrum ( entry, snap, direction, singleStep ) {

		this.xPct = [];
		this.xVal = [];
		this.xSteps = [ singleStep || false ];
		this.xNumSteps = [ false ];

		this.snap = snap;
		this.direction = direction;

		var that = this, index;

		// Loop all entries.
		for ( index in entry ) {
			if ( entry.hasOwnProperty(index) ) {
				handleEntryPoint(index, entry[index], that);
			}
		}

		// Store the actual step values.
		that.xNumSteps = that.xSteps.slice(0);

		for ( index in that.xNumSteps ) {
			if ( that.xNumSteps.hasOwnProperty(index) ) {
				handleStepPoint(Number(index), that.xNumSteps[index], that);
			}
		}
	}

	Spectrum.prototype.getMargin = function ( value ) {
		return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
	};

	Spectrum.prototype.toStepping = function ( value ) {

		value = toStepping( this.xVal, this.xPct, value );

		// Invert the value if this is a right-to-left slider.
		if ( this.direction ) {
			value = 100 - value;
		}

		return value;
	};

	Spectrum.prototype.fromStepping = function ( value ) {

		// Invert the value if this is a right-to-left slider.
		if ( this.direction ) {
			value = 100 - value;
		}

		return accurateNumber(fromStepping( this.xVal, this.xPct, value ));
	};

	Spectrum.prototype.getStep = function ( value ) {

		// Find the proper step for rtl sliders by search in inverse direction.
		// Fixes issue #262.
		if ( this.direction ) {
			value = 100 - value;
		}

		value = getStep(this.xPct, this.xSteps, this.snap, value );

		if ( this.direction ) {
			value = 100 - value;
		}

		return value;
	};

	Spectrum.prototype.getApplicableStep = function ( value ) {

		// If the value is 100%, return the negative step twice.
		var j = getJ(value, this.xPct), offset = value === 100 ? 2 : 1;
		return [this.xNumSteps[j-2], this.xVal[j-offset], this.xNumSteps[j-offset]];
	};

	// Outside testing
	Spectrum.prototype.convert = function ( value ) {
		return this.getStep(this.toStepping(value));
	};

/*	Every input option is tested and parsed. This'll prevent
	endless validation in internal methods. These tests are
	structured with an item for every option available. An
	option can be marked as required by setting the 'r' flag.
	The testing function is provided with three arguments:
		- The provided value for the option;
		- A reference to the options object;
		- The name for the option;

	The testing function returns false when an error is detected,
	or true when everything is OK. It can also modify the option
	object, to make sure all values can be correctly looped elsewhere. */

	/** @const */
	var defaultFormatter = { 'to': function( value ){
		return value.toFixed(2);
	}, 'from': Number };

	function testStep ( parsed, entry ) {

		if ( !isNumeric( entry ) ) {
			throw new Error("noUiSlider: 'step' is not numeric.");
		}

		// The step option can still be used to set stepping
		// for linear sliders. Overwritten if set in 'range'.
		parsed.singleStep = entry;
	}

	function testRange ( parsed, entry ) {

		// Filter incorrect input.
		if ( typeof entry !== 'object' || $.isArray(entry) ) {
			throw new Error("noUiSlider: 'range' is not an object.");
		}

		// Catch missing start or end.
		if ( entry.min === undefined || entry.max === undefined ) {
			throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
		}

		parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.dir, parsed.singleStep);
	}

	function testStart ( parsed, entry ) {

		entry = asArray(entry);

		// Validate input. Values aren't tested, as the public .val method
		// will always provide a valid location.
		if ( !$.isArray( entry ) || !entry.length || entry.length > 2 ) {
			throw new Error("noUiSlider: 'start' option is incorrect.");
		}

		// Store the number of handles.
		parsed.handles = entry.length;

		// When the slider is initialized, the .val method will
		// be called with the start options.
		parsed.start = entry;
	}

	function testSnap ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.snap = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider: 'snap' option must be a boolean.");
		}
	}

	function testAnimate ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.animate = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider: 'animate' option must be a boolean.");
		}
	}

	function testConnect ( parsed, entry ) {

		if ( entry === 'lower' && parsed.handles === 1 ) {
			parsed.connect = 1;
		} else if ( entry === 'upper' && parsed.handles === 1 ) {
			parsed.connect = 2;
		} else if ( entry === true && parsed.handles === 2 ) {
			parsed.connect = 3;
		} else if ( entry === false ) {
			parsed.connect = 0;
		} else {
			throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
		}
	}

	function testOrientation ( parsed, entry ) {

		// Set orientation to an a numerical value for easy
		// array selection.
		switch ( entry ){
		  case 'horizontal':
			parsed.ort = 0;
			break;
		  case 'vertical':
			parsed.ort = 1;
			break;
		  default:
			throw new Error("noUiSlider: 'orientation' option is invalid.");
		}
	}

	function testMargin ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider: 'margin' option must be numeric.");
		}

		parsed.margin = parsed.spectrum.getMargin(entry);

		if ( !parsed.margin ) {
			throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.");
		}
	}

	function testLimit ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider: 'limit' option must be numeric.");
		}

		parsed.limit = parsed.spectrum.getMargin(entry);

		if ( !parsed.limit ) {
			throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.");
		}
	}

	function testDirection ( parsed, entry ) {

		// Set direction as a numerical value for easy parsing.
		// Invert connection for RTL sliders, so that the proper
		// handles get the connect/background classes.
		switch ( entry ) {
		  case 'ltr':
			parsed.dir = 0;
			break;
		  case 'rtl':
			parsed.dir = 1;
			parsed.connect = [0,2,1,3][parsed.connect];
			break;
		  default:
			throw new Error("noUiSlider: 'direction' option was not recognized.");
		}
	}

	function testBehaviour ( parsed, entry ) {

		// Make sure the input is a string.
		if ( typeof entry !== 'string' ) {
			throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
		}

		// Check if the string contains any keywords.
		// None are required.
		var tap = entry.indexOf('tap') >= 0,
			drag = entry.indexOf('drag') >= 0,
			fixed = entry.indexOf('fixed') >= 0,
			snap = entry.indexOf('snap') >= 0;

		parsed.events = {
			tap: tap || snap,
			drag: drag,
			fixed: fixed,
			snap: snap
		};
	}

	function testFormat ( parsed, entry ) {

		parsed.format = entry;

		// Any object with a to and from method is supported.
		if ( typeof entry.to === 'function' && typeof entry.from === 'function' ) {
			return true;
		}

		throw new Error( "noUiSlider: 'format' requires 'to' and 'from' methods.");
	}

	// Test all developer settings and parse to assumption-safe values.
	function testOptions ( options ) {

		var parsed = {
			margin: 0,
			limit: 0,
			animate: true,
			format: defaultFormatter
		}, tests;

		// Tests are executed in the order they are presented here.
		tests = {
			'step': { r: false, t: testStep },
			'start': { r: true, t: testStart },
			'connect': { r: true, t: testConnect },
			'direction': { r: true, t: testDirection },
			'snap': { r: false, t: testSnap },
			'animate': { r: false, t: testAnimate },
			'range': { r: true, t: testRange },
			'orientation': { r: false, t: testOrientation },
			'margin': { r: false, t: testMargin },
			'limit': { r: false, t: testLimit },
			'behaviour': { r: true, t: testBehaviour },
			'format': { r: false, t: testFormat }
		};

		// Set defaults where applicable.
		options = $.extend({
			'connect': false,
			'direction': 'ltr',
			'behaviour': 'tap',
			'orientation': 'horizontal'
		}, options);

		// Run all options through a testing mechanism to ensure correct
		// input. It should be noted that options might get modified to
		// be handled properly. E.g. wrapping integers in arrays.
		$.each( tests, function( name, test ){

			// If the option isn't set, but it is required, throw an error.
			if ( options[name] === undefined ) {

				if ( test.r ) {
					throw new Error("noUiSlider: '" + name + "' is required.");
				}

				return true;
			}

			test.t( parsed, options[name] );
		});

		// Pre-define the styles.
		parsed.style = parsed.ort ? 'top' : 'left';

		return parsed;
	}

// Class handling

	// Delimit proposed values for handle positions.
	function getPositions ( a, b, delimit ) {

		// Add movement to current position.
		var c = a + b[0], d = a + b[1];

		// Only alter the other position on drag,
		// not on standard sliding.
		if ( delimit ) {
			if ( c < 0 ) {
				d += Math.abs(c);
			}
			if ( d > 100 ) {
				c -= ( d - 100 );
			}

			// Limit values to 0 and 100.
			return [limit(c), limit(d)];
		}

		return [c,d];
	}


// Event handling

	// Provide a clean event with standardized offset values.
	function fixEvent ( e ) {

		// Prevent scrolling and panning on touch events, while
		// attempting to slide. The tap event also depends on this.
		e.preventDefault();

		// Filter the event to register the type, which can be
		// touch, mouse or pointer. Offset changes need to be
		// made on an event specific basis.
		var  touch = e.type.indexOf('touch') === 0
			,mouse = e.type.indexOf('mouse') === 0
			,pointer = e.type.indexOf('pointer') === 0
			,x,y, event = e;

		// IE10 implemented pointer events with a prefix;
		if ( e.type.indexOf('MSPointer') === 0 ) {
			pointer = true;
		}

		// Get the originalEvent, if the event has been wrapped
		// by jQuery. Zepto doesn't wrap the event.
		if ( e.originalEvent ) {
			e = e.originalEvent;
		}

		if ( touch ) {
			// noUiSlider supports one movement at a time,
			// so we can select the first 'changedTouch'.
			x = e.changedTouches[0].pageX;
			y = e.changedTouches[0].pageY;
		}

		if ( mouse || pointer ) {

			// Polyfill the pageXOffset and pageYOffset
			// variables for IE7 and IE8;
			if( !pointer && window.pageXOffset === undefined ){
				window.pageXOffset = document.documentElement.scrollLeft;
				window.pageYOffset = document.documentElement.scrollTop;
			}

			x = e.clientX + window.pageXOffset;
			y = e.clientY + window.pageYOffset;
		}

		event.points = [x, y];
		event.cursor = mouse;

		return event;
	}


// DOM additions

	// Append a handle to the base.
	function addHandle ( direction, index ) {

		var handle = $('<div><div/></div>').addClass( Classes[2] ),
			additions = [ '-lower', '-upper' ];

		if ( direction ) {
			additions.reverse();
		}

		handle.children().addClass(
			Classes[3] + " " + Classes[3]+additions[index]
		);

		return handle;
	}

	// Add the proper connection classes.
	function addConnection ( connect, target, handles ) {

		// Apply the required connection classes to the elements
		// that need them. Some classes are made up for several
		// segments listed in the class list, to allow easy
		// renaming and provide a minor compression benefit.
		switch ( connect ) {
			case 1:	target.addClass( Classes[7] );
					handles[0].addClass( Classes[6] );
					break;
			case 3: handles[1].addClass( Classes[6] );
					/* falls through */
			case 2: handles[0].addClass( Classes[7] );
					/* falls through */
			case 0: target.addClass(Classes[6]);
					break;
		}
	}

	// Add handles to the slider base.
	function addHandles ( nrHandles, direction, base ) {

		var index, handles = [];

		// Append handles.
		for ( index = 0; index < nrHandles; index += 1 ) {

			// Keep a list of all added handles.
			handles.push( addHandle( direction, index ).appendTo(base) );
		}

		return handles;
	}

	// Initialize a single slider.
	function addSlider ( direction, orientation, target ) {

		// Apply classes and data to the target.
		target.addClass([
			Classes[0],
			Classes[8 + direction],
			Classes[4 + orientation]
		].join(' '));

		return $('<div/>').appendTo(target).addClass( Classes[1] );
	}

function closure ( target, options, originalOptions ){

// Internal variables

	// All variables local to 'closure' are marked $.
	var $Target = $(target),
		$Locations = [-1, -1],
		$Base,
		$Handles,
		$Spectrum = options.spectrum,
		$Values = [],
	// libLink. For rtl sliders, 'lower' and 'upper' should not be inverted
	// for one-handle sliders, so trim 'upper' it that case.
		triggerPos = ['lower', 'upper'].slice(0, options.handles);

	// Invert the libLink connection for rtl sliders.
	if ( options.dir ) {
		triggerPos.reverse();
	}

// Helpers

	// Shorthand for base dimensions.
	function baseSize ( ) {
		return $Base[['width', 'height'][options.ort]]();
	}

	// External event handling
	function fireEvents ( events ) {

		// Use the external api to get the values.
		// Wrap the values in an array, as .trigger takes
		// only one additional argument.
		var index, values = [ $Target.val() ];

		for ( index = 0; index < events.length; index += 1 ){
			$Target.trigger(events[index], values);
		}
	}

	// Returns the input array, respecting the slider direction configuration.
	function inSliderOrder ( values ) {

		// If only one handle is used, return a single value.
		if ( values.length === 1 ){
			return values[0];
		}

		if ( options.dir ) {
			return values.reverse();
		}

		return values;
	}

// libLink integration

	// Create a new function which calls .val on input change.
	function createChangeHandler ( trigger ) {
		return function ( ignore, value ){
			// Determine which array position to 'null' based on 'trigger'.
			$Target.val( [ trigger ? null : value, trigger ? value : null ], true );
		};
	}

	// Called by libLink when it wants a set of links updated.
	function linkUpdate ( flag ) {

		var trigger = $.inArray(flag, triggerPos);

		// The API might not have been set yet.
		if ( $Target[0].linkAPI && $Target[0].linkAPI[flag] ) {
			$Target[0].linkAPI[flag].change(
				$Values[trigger],
				$Handles[trigger].children(),
				$Target
			);
		}
	}

	// Called by libLink to append an element to the slider.
	function linkConfirm ( flag, element ) {

		// Find the trigger for the passed flag.
		var trigger = $.inArray(flag, triggerPos);

		// If set, append the element to the handle it belongs to.
		if ( element ) {
			element.appendTo( $Handles[trigger].children() );
		}

		// The public API is reversed for rtl sliders, so the changeHandler
		// should not be aware of the inverted trigger positions.
		// On rtl slider with one handle, 'lower' should be used.
		if ( options.dir && options.handles > 1 ) {
			trigger = trigger === 1 ? 0 : 1;
		}

		return createChangeHandler( trigger );
	}

	// Place elements back on the slider.
	function reAppendLink ( ) {

		var i, flag;

		// The API keeps a list of elements: we can re-append them on rebuild.
		for ( i = 0; i < triggerPos.length; i += 1 ) {
			if ( this.linkAPI && this.linkAPI[(flag = triggerPos[i])] ) {
				this.linkAPI[flag].reconfirm(flag);
			}
		}
	}

	target.LinkUpdate = linkUpdate;
	target.LinkConfirm = linkConfirm;
	target.LinkDefaultFormatter = options.format;
	target.LinkDefaultFlag = 'lower';

	target.reappend = reAppendLink;


	// Handler for attaching events trough a proxy.
	function attach ( events, element, callback, data ) {

		// This function can be used to 'filter' events to the slider.

		// Add the noUiSlider namespace to all events.
		events = events.replace( /\s/g, namespace + ' ' ) + namespace;

		// Bind a closure on the target.
		return element.on( events, function( e ){

			// jQuery and Zepto (1) handle unset attributes differently,
			// but always falsy; #208
			if ( !!$Target.attr('disabled') ) {
				return false;
			}

			// Stop if an active 'tap' transition is taking place.
			if ( $Target.hasClass( Classes[14] ) ) {
				return false;
			}

			e = fixEvent(e);
			e.calcPoint = e.points[ options.ort ];

			// Call the event handler with the event [ and additional data ].
			callback ( e, data );
		});
	}

	// Handle movement on document for handle and range drag.
	function move ( event, data ) {

		var handles = data.handles || $Handles, positions, state = false,
			proposal = ((event.calcPoint - data.start) * 100) / baseSize(),
			h = handles[0][0] !== $Handles[0][0] ? 1 : 0;

		// Calculate relative positions for the handles.
		positions = getPositions( proposal, data.positions, handles.length > 1);

		state = setHandle ( handles[0], positions[h], handles.length === 1 );

		if ( handles.length > 1 ) {
			state = setHandle ( handles[1], positions[h?0:1], false ) || state;
		}

		// Fire the 'slide' event if any handle moved.
		if ( state ) {
			fireEvents(['slide']);
		}
	}

	// Unbind move events on document, call callbacks.
	function end ( event ) {

		// The handle is no longer active, so remove the class.
		$('.' + Classes[15]).removeClass(Classes[15]);

		// Remove cursor styles and text-selection events bound to the body.
		if ( event.cursor ) {
			$('body').css('cursor', '').off( namespace );
		}

		// Unbind the move and end events, which are added on 'start'.
		doc.off( namespace );

		// Remove dragging class.
		$Target.removeClass(Classes[12]);

		// Fire the change and set events.
		fireEvents(['set', 'change']);
	}

	// Bind move events on document.
	function start ( event, data ) {

		// Mark the handle as 'active' so it can be styled.
		if( data.handles.length === 1 ) {
			data.handles[0].children().addClass(Classes[15]);
		}

		// A drag should never propagate up to the 'tap' event.
		event.stopPropagation();

		// Attach the move event.
		attach ( actions.move, doc, move, {
			start: event.calcPoint,
			handles: data.handles,
			positions: [
				$Locations[0],
				$Locations[$Handles.length - 1]
			]
		});

		// Unbind all movement when the drag ends.
		attach ( actions.end, doc, end, null );

		// Text selection isn't an issue on touch devices,
		// so adding cursor styles can be skipped.
		if ( event.cursor ) {

			// Prevent the 'I' cursor and extend the range-drag cursor.
			$('body').css('cursor', $(event.target).css('cursor'));

			// Mark the target with a dragging state.
			if ( $Handles.length > 1 ) {
				$Target.addClass(Classes[12]);
			}

			// Prevent text selection when dragging the handles.
			$('body').on('selectstart' + namespace, false);
		}
	}

	// Move closest handle to tapped location.
	function tap ( event ) {

		var location = event.calcPoint, total = 0, to;

		// The tap event shouldn't propagate up and cause 'edge' to run.
		event.stopPropagation();

		// Add up the handle offsets.
		$.each( $Handles, function(){
			total += this.offset()[ options.style ];
		});

		// Find the handle closest to the tapped position.
		total = ( location < total/2 || $Handles.length === 1 ) ? 0 : 1;

		location -= $Base.offset()[ options.style ];

		// Calculate the new position.
		to = ( location * 100 ) / baseSize();

		if ( !options.events.snap ) {
			// Flag the slider as it is now in a transitional state.
			// Transition takes 300 ms, so re-enable the slider afterwards.
			addClassFor( $Target, Classes[14], 300 );
		}

		// Find the closest handle and calculate the tapped point.
		// The set handle to the new position.
		setHandle( $Handles[total], to );

		fireEvents(['slide', 'set', 'change']);

		if ( options.events.snap ) {
			start(event, { handles: [$Handles[total]] });
		}
	}

	// Attach events to several slider parts.
	function events ( behaviour ) {

		var i, drag;

		// Attach the standard drag event to the handles.
		if ( !behaviour.fixed ) {

			for ( i = 0; i < $Handles.length; i += 1 ) {

				// These events are only bound to the visual handle
				// element, not the 'real' origin element.
				attach ( actions.start, $Handles[i].children(), start, {
					handles: [ $Handles[i] ]
				});
			}
		}

		// Attach the tap event to the slider base.
		if ( behaviour.tap ) {

			attach ( actions.start, $Base, tap, {
				handles: $Handles
			});
		}

		// Make the range dragable.
		if ( behaviour.drag ){

			drag = $Base.find( '.' + Classes[7] ).addClass( Classes[10] );

			// When the range is fixed, the entire range can
			// be dragged by the handles. The handle in the first
			// origin will propagate the start event upward,
			// but it needs to be bound manually on the other.
			if ( behaviour.fixed ) {
				drag = drag.add($Base.children().not( drag ).children());
			}

			attach ( actions.start, drag, start, {
				handles: $Handles
			});
		}
	}


	// Test suggested values and apply margin, step.
	function setHandle ( handle, to, noLimitOption ) {

		var trigger = handle[0] !== $Handles[0][0] ? 1 : 0,
			lowerMargin = $Locations[0] + options.margin,
			upperMargin = $Locations[1] - options.margin,
			lowerLimit = $Locations[0] + options.limit,
			upperLimit = $Locations[1] - options.limit;

		// For sliders with multiple handles,
		// limit movement to the other handle.
		// Apply the margin option by adding it to the handle positions.
		if ( $Handles.length > 1 ) {
			to = trigger ? Math.max( to, lowerMargin ) : Math.min( to, upperMargin );
		}

		// The limit option has the opposite effect, limiting handles to a
		// maximum distance from another. Limit must be > 0, as otherwise
		// handles would be unmoveable. 'noLimitOption' is set to 'false'
		// for the .val() method, except for pass 4/4.
		if ( noLimitOption !== false && options.limit && $Handles.length > 1 ) {
			to = trigger ? Math.min ( to, lowerLimit ) : Math.max( to, upperLimit );
		}

		// Handle the step option.
		to = $Spectrum.getStep( to );

		// Limit to 0/100 for .val input, trim anything beyond 7 digits, as
		// JavaScript has some issues in its floating point implementation.
		to = limit(parseFloat(to.toFixed(7)));

		// Return false if handle can't move.
		if ( to === $Locations[trigger] ) {
			return false;
		}

		// Set the handle to the new position.
		handle.css( options.style, to + '%' );

		// Force proper handle stacking
		if ( handle.is(':first-child') ) {
			handle.toggleClass(Classes[17], to > 50 );
		}

		// Update locations.
		$Locations[trigger] = to;

		// Convert the value to the slider stepping/range.
		$Values[trigger] = $Spectrum.fromStepping( to );

		linkUpdate(triggerPos[trigger]);

		return true;
	}

	// Loop values from value method and apply them.
	function setValues ( count, values ) {

		var i, trigger, to;

		// With the limit option, we'll need another limiting pass.
		if ( options.limit ) {
			count += 1;
		}

		// If there are multiple handles to be set run the setting
		// mechanism twice for the first handle, to make sure it
		// can be bounced of the second one properly.
		for ( i = 0; i < count; i += 1 ) {

			trigger = i%2;

			// Get the current argument from the array.
			to = values[trigger];

			// Setting with null indicates an 'ignore'.
			// Inputting 'false' is invalid.
			if ( to !== null && to !== false ) {

				// If a formatted number was passed, attemt to decode it.
				if ( typeof to === 'number' ) {
					to = String(to);
				}

				to = options.format.from( to );

				// Request an update for all links if the value was invalid.
				// Do so too if setting the handle fails.
				if ( to === false || isNaN(to) || setHandle( $Handles[trigger], $Spectrum.toStepping( to ), i === (3 - options.dir) ) === false ) {

					linkUpdate(triggerPos[trigger]);
				}
			}
		}
	}

	// Set the slider value.
	function valueSet ( input ) {

		// LibLink: don't accept new values when currently emitting changes.
		if ( $Target[0].LinkIsEmitting ) {
			return this;
		}

		var count, values = asArray( input );

		// The RTL settings is implemented by reversing the front-end,
		// internal mechanisms are the same.
		if ( options.dir && options.handles > 1 ) {
			values.reverse();
		}

		// Animation is optional.
		// Make sure the initial values where set before using animated
		// placement. (no report, unit testing);
		if ( options.animate && $Locations[0] !== -1 ) {
			addClassFor( $Target, Classes[14], 300 );
		}

		// Determine how often to set the handles.
		count = $Handles.length > 1 ? 3 : 1;

		if ( values.length === 1 ) {
			count = 1;
		}

		setValues ( count, values );

		// Fire the 'set' event. As of noUiSlider 7,
		// this is no longer optional.
		fireEvents(['set']);

		return this;
	}

	// Get the slider value.
	function valueGet ( ) {

		var i, retour = [];

		// Get the value from all handles.
		for ( i = 0; i < options.handles; i += 1 ){
			retour[i] = options.format.to( $Values[i] );
		}

		return inSliderOrder( retour );
	}

	// Destroy the slider and unbind all events.
	function destroyTarget ( ) {

		// Unbind events on the slider, remove all classes and child elements.
		$(this).off(namespace)
			.removeClass(Classes.join(' '))
			.empty();

		delete this.LinkUpdate;
		delete this.LinkConfirm;
		delete this.LinkDefaultFormatter;
		delete this.LinkDefaultFlag;
		delete this.reappend;
		delete this.vGet;
		delete this.vSet;
		delete this.getCurrentStep;
		delete this.getInfo;
		delete this.destroy;

		// Return the original options from the closure.
		return originalOptions;
	}

	// Get the current step size for the slider.
	function getCurrentStep ( ) {

		// Check all locations, map them to their stepping point.
		// Get the step point, then find it in the input list.
		var retour = $.map($Locations, function( location, index ){

			var step = $Spectrum.getApplicableStep( location ),
				value = $Values[index],
				increment = step[2],
				decrement = (value - step[2]) >= step[1] ? step[2] : step[0];

			return [[decrement, increment]];
		});

		// Return values in the proper order.
		return inSliderOrder( retour );
	}

	// Get the original set of options.
	function getOriginalOptions ( ) {
		return originalOptions;
	}


// Initialize slider

	// Throw an error if the slider was already initialized.
	if ( $Target.hasClass(Classes[0]) ) {
		throw new Error('Slider was already initialized.');
	}

	// Create the base element, initialise HTML and set classes.
	// Add handles and links.
	$Base = addSlider( options.dir, options.ort, $Target );
	$Handles = addHandles( options.handles, options.dir, $Base );

	// Set the connect classes.
	addConnection ( options.connect, $Target, $Handles );

	// Attach user events.
	events( options.events );

// Methods

	target.vSet = valueSet;
	target.vGet = valueGet;
	target.destroy = destroyTarget;

	target.getCurrentStep = getCurrentStep;
	target.getOriginalOptions = getOriginalOptions;

	target.getInfo = function(){
		return [
			$Spectrum,
			options.style,
			options.ort
		];
	};

	// Use the public value method to set the start values.
	$Target.val( options.start );

}


	// Run the standard initializer
	function initialize ( originalOptions ) {

		// Throw error if group is empty.
		if ( !this.length ){
			throw new Error("noUiSlider: Can't initialize slider on empty selection.");
		}

		// Test the options once, not for every slider.
		var options = testOptions( originalOptions, this );

		// Loop all items, and provide a new closed-scope environment.
		return this.each(function(){
			closure(this, options, originalOptions);
		});
	}

	// Destroy the slider, then re-enter initialization.
	function rebuild ( options ) {

		return this.each(function(){

			// The rebuild flag can be used if the slider wasn't initialized yet.
			if ( !this.destroy ) {
				$(this).noUiSlider( options );
				return;
			}

			// Get the current values from the slider,
			// including the initialization options.
			var values = $(this).val(), originalOptions = this.destroy(),

				// Extend the previous options with the newly provided ones.
				newOptions = $.extend( {}, originalOptions, options );

			// Run the standard initializer.
			$(this).noUiSlider( newOptions );

			// Place Link elements back.
			this.reappend();

			// If the start option hasn't changed,
			// reset the previous values.
			if ( originalOptions.start === newOptions.start ) {
				$(this).val(values);
			}
		});
	}

	// Access the internal getting and setting methods based on argument count.
	function value ( ) {
		return this[0][ !arguments.length ? 'vGet' : 'vSet' ].apply(this[0], arguments);
	}

	// Override the .val() method. Test every element. Is it a slider? Go to
	// the slider value handling. No? Use the standard method.
	// Note how $.fn.val expects 'this' to be an instance of $. For convenience,
	// the above 'value' function does too.
	$.fn.val = function ( arg ) {

		// this === instanceof $

		function valMethod( a ){
			return a.hasClass(Classes[0]) ? value : $val;
		}

		// If no value is passed, this is 'get'.
		if ( arg === undefined ) {
			var first = $(this[0]);
			return valMethod(first).call(first);
		}

		var isFunction = $.isFunction(arg);

		// Return the set so it remains chainable. Make sure not to break
		// jQuery's .val(function( index, value ){}) signature.
		return this.each(function( i ){

			var val = arg, $t = $(this);

			if ( isFunction ) {
				val = arg.call(this, i, $t.val());
			}

			valMethod($t).call($t, val);
		});
	};

// Extend jQuery/Zepto with the noUiSlider method.
	$.fn.noUiSlider = function ( options, rebuildFlag ) {

		switch ( options ) {
			case 'step': return this[0].getCurrentStep();
			case 'options': return this[0].getOriginalOptions();
		}

		return ( rebuildFlag ? rebuild : initialize ).call(this, options);
	};

	function getGroup ( $Spectrum, mode, values, stepped ) {

		// Use the range.
		if ( mode === 'range' || mode === 'steps' ) {
			return $Spectrum.xVal;
		}

		if ( mode === 'count' ) {

			// Divide 0 - 100 in 'count' parts.
			var spread = ( 100 / (values-1) ), v, i = 0;
			values = [];

			// List these parts and have them handled as 'positions'.
			while ((v=i++*spread) <= 100 ) {
				values.push(v);
			}

			mode = 'positions';
		}

		if ( mode === 'positions' ) {

			// Map all percentages to on-range values.
			return $.map(values, function( value ){
				return $Spectrum.fromStepping( stepped ? $Spectrum.getStep( value ) : value );
			});
		}

		if ( mode === 'values' ) {

			// If the value must be stepped, it needs to be converted to a percentage first.
			if ( stepped ) {

				return $.map(values, function( value ){

					// Convert to percentage, apply step, return to value.
					return $Spectrum.fromStepping( $Spectrum.getStep( $Spectrum.toStepping( value ) ) );
				});

			}

			// Otherwise, we can simply use the values.
			return values;
		}
	}

	function generateSpread ( $Spectrum, density, mode, group ) {

		var originalSpectrumDirection = $Spectrum.direction,
			indexes = {},
			firstInRange = $Spectrum.xVal[0],
			lastInRange = $Spectrum.xVal[$Spectrum.xVal.length-1],
			ignoreFirst = false,
			ignoreLast = false,
			prevPct = 0;

		// This function loops the spectrum in an ltr linear fashion,
		// while the toStepping method is direction aware. Trick it into
		// believing it is ltr.
		$Spectrum.direction = 0;

		// Create a copy of the group, sort it and filter away all duplicates.
		group = unique(group.slice().sort(function(a, b){ return a - b; }));

		// Make sure the range starts with the first element.
		if ( group[0] !== firstInRange ) {
			group.unshift(firstInRange);
			ignoreFirst = true;
		}

		// Likewise for the last one.
		if ( group[group.length - 1] !== lastInRange ) {
			group.push(lastInRange);
			ignoreLast = true;
		}

		$.each(group, function ( index ) {

			// Get the current step and the lower + upper positions.
			var step, i, q,
				low = group[index],
				high = group[index+1],
				newPct, pctDifference, pctPos, type,
				steps, realSteps, stepsize;

			// When using 'steps' mode, use the provided steps.
			// Otherwise, we'll step on to the next subrange.
			if ( mode === 'steps' ) {
				step = $Spectrum.xNumSteps[ index ];
			}

			// Default to a 'full' step.
			if ( !step ) {
				step = high-low;
			}

			// Low can be 0, so test for false. If high is undefined,
			// we are at the last subrange. Index 0 is already handled.
			if ( low === false || high === undefined ) {
				return;
			}

			// Find all steps in the subrange.
			for ( i = low; i <= high; i += step ) {

				// Get the percentage value for the current step,
				// calculate the size for the subrange.
				newPct = $Spectrum.toStepping( i );
				pctDifference = newPct - prevPct;

				steps = pctDifference / density;
				realSteps = Math.round(steps);

				// This ratio represents the ammount of percentage-space a point indicates.
				// For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
				// Round the percentage offset to an even number, then divide by two
				// to spread the offset on both sides of the range.
				stepsize = pctDifference/realSteps;

				// Divide all points evenly, adding the correct number to this subrange.
				// Run up to <= so that 100% gets a point, event if ignoreLast is set.
				for ( q = 1; q <= realSteps; q += 1 ) {

					// The ratio between the rounded value and the actual size might be ~1% off.
					// Correct the percentage offset by the number of points
					// per subrange. density = 1 will result in 100 points on the
					// full range, 2 for 50, 4 for 25, etc.
					pctPos = prevPct + ( q * stepsize );
					indexes[pctPos.toFixed(5)] = ['x', 0];
				}

				// Determine the point type.
				type = ($.inArray(i, group) > -1) ? 1 : ( mode === 'steps' ? 2 : 0 );

				// Enforce the 'ignoreFirst' option by overwriting the type for 0.
				if ( !index && ignoreFirst ) {
					type = 0;
				}

				if ( !(i === high && ignoreLast)) {
					// Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
					indexes[newPct.toFixed(5)] = [i, type];
				}

				// Update the percentage count.
				prevPct = newPct;
			}
		});

		// Reset the spectrum.
		$Spectrum.direction = originalSpectrumDirection;

		return indexes;
	}

	function addMarking ( CSSstyle, orientation, direction, spread, filterFunc, formatter ) {

		var style = ['horizontal', 'vertical'][orientation],
			element = $('<div/>');

		element.addClass('noUi-pips noUi-pips-'+style);

		function getSize( type, value ){
			return [ '-normal', '-large', '-sub' ][(type&&filterFunc) ? filterFunc(value, type) : type];
		}
		function getTags( offset, source, values ) {
			return 'class="' + source + ' ' +
				source + '-' + style + ' ' +
				source + getSize(values[1], values[0]) +
				'" style="' + CSSstyle + ': ' + offset + '%"';
		}
		function addSpread ( offset, values ){

			if ( direction ) {
				offset = 100 - offset;
			}

			// Add a marker for every point
			element.append('<div '+getTags(offset, 'noUi-marker', values)+'></div>');

			// Values are only appended for points marked '1' or '2'.
			if ( values[1] ) {
				element.append('<div '+getTags(offset, 'noUi-value', values)+'>' + formatter.to(values[0]) + '</div>');
			}
		}

		// Append all points.
		$.each(spread, addSpread);

		return element;
	}

	$.fn.noUiSlider_pips = function ( grid ) {

	var mode = grid.mode,
		density = grid.density || 1,
		filter = grid.filter || false,
		values = grid.values || false,
		format = grid.format || {
			to: Math.round
		},
		stepped = grid.stepped || false;

		return this.each(function(){

		var info = this.getInfo(),
			group = getGroup( info[0], mode, values, stepped ),
			spread = generateSpread( info[0], density, mode, group );

			return $(this).append(addMarking(
				info[1],
				info[2],
				info[0].direction,
				spread,
				filter,
				format
			));
		});
	};

}( window.jQuery || window.Zepto ));
