( function ( $ ) {
	'use strict';
	var TextEntryFactory, TextEntry, FormWidgetEntry, ContentEditableEntry,
		defaultInputMethod;

	// rangy is defined in the rangy library
	/*global rangy */

	/**
	 * Just initializes an empty static object.
	 * Similar to initClass in https://www.mediawiki.org/wiki/OOjs
	 *
	 * @param {Function} fn
	 */
	function initClass( fn ) {
		fn.static = fn.static || {};
	}

	/**
	 * Inheritance. Uses pattern similar to OOjs (https://www.mediawiki.org/wiki/OOjs).
	 * Extend prototype and static methods and properties of child constructor from
	 * a parent constructor.
	 *
	 * @param {Function} targetFn
	 * @param {Function} originFn
	 */
	function inheritClass( targetFn, originFn ) {
		targetFn.parent = originFn;
		targetFn.prototype = $.extend( {}, originFn.prototype );
		targetFn.prototype.constructor = originFn.constructor;
		targetFn.static = $.extend( {}, originFn.static );
	}

	/**
	 * IME Class
	 *
	 * @class
	 * @constructor
	 * @param {HTMLElement} element Element on which to listen for events
	 * @param {TextEntry} textEntry Text entry object to use to get/set text
	 * @param {Object} [options]
	 * @param {Function} [options.helpHandler] Called for each input method row in the selector
	 * @param {Object} [options.helpHandler.imeSelector]
	 * @param {string} [options.helpHandler.ime] Id of the input method
	 */
	function IME( element, textEntry, options ) {
		this.$element = $( element );
		this.textEntry = textEntry;
		// This needs to be delayed here since extending language list happens at DOM ready
		$.ime.defaults.languages = arrayKeys( $.ime.languages );
		this.options = $.extend( {}, $.ime.defaults, options );
		if ( this.options.imePath ) {
			// Set the global IME path from the one specified to the instance
			// TODO: remove this functionality and force clients to set the global
			// IME path
			$.ime.path = this.options.imePath;
		}
		this.active = false;
		this.shifted = false;
		this.inputmethod = null;
		this.language = null;
		this.context = '';
		if ( this.options.showSelector ) {
			this.selector = this.$element.imeselector( this.options );
		}
		this.listen();
	}

	IME.prototype = {
		constructor: IME,

		/**
		 * Listen for events and bind to handlers
		 */
		listen: function () {
			this.$element.on( 'keypress.ime', $.proxy( this.keypress, this ) );
			this.$element.on( 'keyup.ime', $.proxy( this.keyup, this ) );
			this.$element.on( 'keydown.ime', $.proxy( this.keydown, this ) );
			this.$element.on( 'destroy.ime', $.proxy( this.destroy, this ) );
			this.$element.on( 'enable.ime', $.proxy( this.enable, this ) );
			this.$element.on( 'disable.ime', $.proxy( this.disable, this ) );
		},

		/**
		 * Return a list of available language codes
		 *
		 * @return {string[]} Available language codes
		 */
		getLanguageCodes: function () {
			return $.ime.defaults.languages;
		},

		/**
		 * Return the autonym for an available language code
		 *
		 * @param {string} languageCode The language code
		 * @return {string} The autonym
		 */
		getAutonym: function ( languageCode ) {
			return $.ime.languages[ languageCode ].autonym;
		},

		/**
		 * Return a list of available input method ids for a language
		 *
		 * @param {string} languageCode An available language code
		 * @return {string[]} Available input method ids for that language
		 */
		getInputMethodIds: function ( languageCode ) {
			return $.ime.languages[ languageCode ].inputmethods;
		},

		/**
		 * Return the name of an input method
		 *
		 * @param {string} inputMethodId The id of an input method
		 * @return {string} The input method's name
		 * @see IME#load
		 */
		getInputMethodName: function ( inputMethodId ) {
			return $.ime.sources[ inputMethodId ].name;
		},

		/**
		 * Return a list of input method info { id: ..., name: ... } for a language.
		 *
		 * @param {string} languageCode An available language code
		 * @return {Object[]} Info object for each available input method
		 */
		getInputMethods: function ( languageCode ) {
			return this.getInputMethodIds( languageCode ).map( function ( inputMethodId ) {
				return {
					id: inputMethodId,
					name: $.ime.sources[ inputMethodId ].name
				};
			} );
		},

		/**
		 * Transliterate a given string input based on context and input method definition.
		 * If there are no matching rules defined, returns the original string.
		 *
		 * @param {string} input
		 * @param {string} context
		 * @param {boolean} altGr whether altGr key is pressed or not
		 * @return {Object} Transliteration object
		 * @return {boolean} return.noop Whether to consider input processed or passed through.
		 * @return {string} return.output The transliterated input or input unmodified.
		 */
		transliterate: function ( input, context, altGr ) {
			var patterns, regex, rule, replacement, i, retval;

			if ( altGr ) {
				patterns = this.inputmethod.patterns_x || [];
			} else {
				patterns = this.inputmethod.patterns || [];
			}

			if ( this.shifted ) {
				// if shift is pressed give priority for the patterns_shift
				// if exists.
				// Example: Shift+space where shift does not alter the keycode
				patterns = ( this.inputmethod.patterns_shift || [] )
					.concat( patterns );
			}

			if ( $.isFunction( patterns ) ) {
				// For backwards compatibility, allow the rule functions to return plain
				// string. Determine noop by checking whether input is different from
				// output. If the rule function returns object, just return it as-is.
				retval = patterns.call( this, input, context );
				if ( typeof retval === 'string' ) {
					return { noop: input === retval, output: retval };
				}

				return retval;
			}

			for ( i = 0; i < patterns.length; i++ ) {
				rule = patterns[ i ];
				regex = new RegExp( rule[ 0 ] + '$' );

				// Last item in the rules.
				// It can also be a function, because the replace
				// method can have a function as the second argument.
				replacement = rule.slice( -1 )[ 0 ];

				// Input string match test
				if ( regex.test( input ) ) {
					// Context test required?
					if ( rule.length === 3 ) {
						if ( new RegExp( rule[ 1 ] + '$' ).test( context ) ) {
							return { noop: false, output: input.replace( regex, replacement ) };
						}
					} else {
						return { noop: false, output: input.replace( regex, replacement ) };
					}
				}
			}

			// No matches, return the input
			return { noop: true, output: input };
		},

		keyup: function ( e ) {
			if ( e.which === 16 ) { // shift key
				this.shifted = false;
			}
		},

		keydown: function ( e ) {
			if ( e.which === 16 ) { // shift key
				this.shifted = true;
			}
		},

		/**
		 * Keypress handler
		 *
		 * @param {jQuery.Event} e Event
		 * @return {boolean}
		 */
		keypress: function ( e ) {
			var altGr = false,
				c, input, replacement;

			if ( !this.active ) {
				return true;
			}

			if ( !this.inputmethod ) {
				return true;
			}

			// handle backspace
			if ( e.which === 8 ) {
				// Blank the context
				this.context = '';
				return true;
			}

			if ( e.altKey || e.altGraphKey ) {
				altGr = true;
			}

			// Don't process ASCII control characters except linefeed,
			// as well as anything involving Ctrl, Meta and Alt,
			// but do process extended keymaps
			if ( ( e.which < 32 && e.which !== 13 && !altGr ) || e.ctrlKey || e.metaKey ) {
				// Blank the context
				this.context = '';

				return true;
			}

			c = String.fromCharCode( e.which );

			// Append the character being typed to the preceding few characters,
			// to provide context for the transliteration regexes.
			input = this.textEntry.getTextBeforeSelection( this.inputmethod.maxKeyLength );
			replacement = this.transliterate( input + c, this.context, altGr );

			// Update the context
			this.context += c;

			if ( this.context.length > this.inputmethod.contextLength ) {
				// The buffer is longer than needed, truncate it at the front
				this.context = this.context.substring(
					this.context.length - this.inputmethod.contextLength
				);
			}

			// Allow rules to explicitly define whether we match something.
			// Otherwise we cannot distinguish between no matching rule and
			// rule that provides identical output but consumes the event
			// to prevent normal behavior. See Udmurt layout which uses
			// altgr rules to allow typing the original character.
			if ( replacement.noop ) {
				return true;
			}

			this.textEntry.replaceTextAtSelection( input.length, replacement.output );

			e.stopPropagation();

			return false;
		},

		/**
		 * Check whether the input method is active or not
		 *
		 * @return {boolean}
		 */
		isActive: function () {
			return this.active;
		},

		/**
		 * Disable the input method
		 */
		disable: function () {
			this.active = false;
			$.ime.preferences.setIM( 'system' );
		},

		/**
		 * Enable the input method
		 */
		enable: function () {
			this.active = true;
		},

		/**
		 * Toggle the active state of input method
		 */
		toggle: function () {
			this.active = !this.active;
		},

		/**
		 * Destroy the binding of ime to the editable element
		 */
		destroy: function () {
			$( 'body' ).off( '.ime' );
			this.$element.off( '.ime' ).removeData( 'ime' ).removeData( 'imeselector' );
		},

		/**
		 * Get the current input method
		 *
		 * @return {string} Current input method id
		 */
		getIM: function () {
			return this.inputmethod;
		},

		/**
		 * Set the current input method
		 *
		 * @param {string} inputmethodId
		 * @fires imeLanguageChange
		 */
		setIM: function ( inputmethodId ) {
			this.inputmethod = $.ime.inputmethods[ inputmethodId ];
			$.ime.preferences.setIM( inputmethodId );
			this.$element.trigger( 'imeMethodChange' );
		},

		/**
		 * Set the current Language
		 *
		 * @param {string} languageCode
		 * @fires imeLanguageChange
		 * @return {boolean}
		 */
		setLanguage: function ( languageCode ) {
			if ( !$.ime.languages[ languageCode ] ) {
				debug( 'Language ' + languageCode + ' is not known to jquery.ime.' );

				return false;
			}

			this.language = languageCode;
			$.ime.preferences.setLanguage( languageCode );
			this.$element.trigger( 'imeLanguageChange' );
			return true;
		},

		/**
		 * Get current language
		 *
		 * @return {string}
		 */
		getLanguage: function () {
			return this.language;
		},

		/**
		 * load an input method by given id
		 *
		 * @param {string} inputmethodId
		 * @return {jQuery.Promise}
		 */
		load: function ( inputmethodId ) {
			return $.ime.load( inputmethodId );
		}
	};

	/**
	 * TextEntry factory
	 *
	 * @class
	 * @constructor
	 */
	TextEntryFactory = function IMETextEntryFactory() {
		this.TextEntryClasses = [];
	};

	/* Inheritance */

	initClass( TextEntryFactory );

	/* Methods */

	/**
	 * Register a TextEntry class, with priority over previous registrations
	 *
	 * @param {TextEntry} TextEntryClass Class to register
	 */
	TextEntryFactory.prototype.register = function ( TextEntryClass ) {
		this.TextEntryClasses.unshift( TextEntryClass );
	};

	/**
	 * Wrap an editable element with the appropriate TextEntry class
	 *
	 * @param {jQuery} $element The element to wrap
	 * @return {TextEntry|undefined} A TextEntry, or undefined if no match
	 */
	TextEntryFactory.prototype.wrap = function ( $element ) {
		var i, len, TextEntryClass;
		for ( i = 0, len = this.TextEntryClasses.length; i < len; i++ ) {
			TextEntryClass = this.TextEntryClasses[ i ];
			if ( TextEntryClass.static.canWrap( $element ) ) {
				return new TextEntryClass( $element );
			}
		}
		return undefined;
	};

	/* Initialization */

	TextEntryFactory.static.singleton = new TextEntryFactory();

	/**
	 * Generic text entry
	 *
	 * @class
	 * @abstract
	 */
	TextEntry = function IMETextEntry() {
	};

	/* Inheritance */

	initClass( TextEntry );

	/* Static methods */

	/**
	 * Test whether can wrap this type of element
	 *
	 * @param {jQuery} $element The element to wrap
	 * @return {boolean} Whether the element can be wrapped
	 */
	TextEntry.static.canWrap = function () {
		return false;
	};

	/* Abstract methods */

	/**
	 * Get text immediately before the current selection start.
	 *
	 * This SHOULD return the empty string for non-collapsed selections.
	 *
	 * @param {number} maxLength Maximum number of chars (code units) to return
	 * @return {string} Up to maxLength of text
	 */
	TextEntry.prototype.getTextBeforeSelection = null;

	/**
	 * Replace the currently selected text and/or text before the selection
	 *
	 * @param {number} precedingCharCount Number of chars before selection to replace
	 * @param {string} newText Replacement text
	 */
	TextEntry.prototype.replaceTextAtSelection = null;

	/**
	 * TextEntry class for input/textarea widgets
	 *
	 * @class
	 * @constructor
	 * @param {jQuery} $element The element to wrap
	 */
	FormWidgetEntry = function IMEFormWidgetEntry( $element ) {
		this.$element = $element;
	};

	/* Inheritance */

	inheritClass( FormWidgetEntry, TextEntry );

	/* Static methods */

	/**
	 * @inheritdoc TextEntry
	 */
	FormWidgetEntry.static.canWrap = function ( $element ) {
		return $element.is( 'input:not([type]), input[type=text], input[type=search], textarea' ) &&
			!$element.prop( 'readonly' ) &&
			!$element.prop( 'disabled' ) &&
			!$element.hasClass( 'noime' );
	};

	/* Instance methods */

	/**
	 * @inheritdoc TextEntry
	 */
	FormWidgetEntry.prototype.getTextBeforeSelection = function ( maxLength ) {
		var pos = this.getCaretPosition();
		return this.$element.val().substring(
			Math.max( 0, pos.start - maxLength ),
			pos.start
		);
	};

	/**
	 * @inheritdoc TextEntry
	 */
	FormWidgetEntry.prototype.replaceTextAtSelection = function ( precedingCharCount, newText ) {
		var selection,
			length,
			newLines,
			start,
			scrollTop,
			pos,
			element = this.$element.get( 0 );

		if ( typeof element.selectionStart === 'number' && typeof element.selectionEnd === 'number' ) {
			// IE9+ and all other browsers
			start = element.selectionStart;
			scrollTop = element.scrollTop;

			// Replace the whole text of the text area:
			// text before + newText + text after.
			// This could be made better if range selection worked on browsers.
			// But for complex scripts, browsers place cursor in unexpected places
			// and it's not possible to fix cursor programmatically.
			// Ref Bug https://bugs.webkit.org/show_bug.cgi?id=66630
			element.value = element.value.substring( 0, start - precedingCharCount ) +
				newText +
				element.value.substring( element.selectionEnd, element.value.length );

			// restore scroll
			element.scrollTop = scrollTop;
			// set selection
			element.selectionStart = element.selectionEnd = start - precedingCharCount + newText.length;
		} else {
			// IE8 and lower
			pos = this.getCaretPosition();
			selection = element.createTextRange();
			length = element.value.length;
			// IE doesn't count \n when computing the offset, so we won't either
			newLines = element.value.match( /\n/g );

			if ( newLines ) {
				length = length - newLines.length;
			}

			selection.moveStart( 'character', pos.start - precedingCharCount );
			selection.moveEnd( 'character', pos.end - length );

			selection.text = newText;
			selection.collapse( false );
			selection.select();
		}
	};

	/**
	 * Get the current selection offsets inside the widget
	 *
	 * @return {Object} return Offsets in chars (0 means first offset *or* no selection in widget)
	 * @return {number} return.start Selection start
	 * @return {number} return.end Selection end
	 */
	FormWidgetEntry.prototype.getCaretPosition = function () {
		var el = this.$element.get( 0 ),
			start = 0,
			end = 0,
			normalizedValue,
			range,
			textInputRange,
			len,
			newLines,
			endRange;

		if ( typeof el.selectionStart === 'number' && typeof el.selectionEnd === 'number' ) {
			start = el.selectionStart;
			end = el.selectionEnd;
		} else {
			// IE
			range = document.selection.createRange();

			if ( range && range.parentElement() === el ) {
				len = el.value.length;
				normalizedValue = el.value.replace( /\r\n/g, '\n' );
				newLines = normalizedValue.match( /\n/g );

				// Create a working TextRange that lives only in the input
				textInputRange = el.createTextRange();
				textInputRange.moveToBookmark( range.getBookmark() );

				// Check if the start and end of the selection are at the very end
				// of the input, since moveStart/moveEnd doesn't return what we want
				// in those cases
				endRange = el.createTextRange();
				endRange.collapse( false );

				if ( textInputRange.compareEndPoints( 'StartToEnd', endRange ) > -1 ) {
					if ( newLines ) {
						start = end = len - newLines.length;
					} else {
						start = end = len;
					}
				} else {
					start = -textInputRange.moveStart( 'character', -len );

					if ( textInputRange.compareEndPoints( 'EndToEnd', endRange ) > -1 ) {
						end = len;
					} else {
						end = -textInputRange.moveEnd( 'character', -len );
					}
				}
			}
		}
		return { start: start, end: end };
	};

	TextEntryFactory.static.singleton.register( FormWidgetEntry );

	/**
	 * TextEntry class for ContentEditable
	 *
	 * @class
	 * @constructor
	 * @param {jQuery} $element The element to wrap
	 */
	ContentEditableEntry = function IMEContentEditableEntry( $element ) {
		this.$element = $element;
	};

	/* Inheritance */

	inheritClass( ContentEditableEntry, TextEntry );

	/* Static methods */

	/**
	 * @inheritdoc TextEntry
	 */
	ContentEditableEntry.static.canWrap = function ( $element ) {
		return $element.is( '[contenteditable]' ) && !$element.hasClass( 'noime' );
	};

	/* Instance methods */

	/**
	 * @inheritdoc TextEntry
	 */
	ContentEditableEntry.prototype.getTextBeforeSelection = function ( maxLength ) {
		var range = this.getSelectedRange();
		if ( !range || !range.collapsed || range.startContainer.nodeType !== Node.TEXT_NODE ) {
			return '';
		}
		return range.startContainer.nodeValue.substring(
			Math.max( 0, range.startOffset - maxLength ),
			range.startOffset
		);
	};

	/**
	 * @inheritdoc SelectionWrapper
	 */
	ContentEditableEntry.prototype.replaceTextAtSelection = function ( precedingCharCount, newText ) {
		var range, textNode, textOffset, newOffset, newRange;

		if ( !this.getSelectedRange() ) {
			return;
		}

		// Trigger any externally registered jQuery compositionstart event listeners.
		// TODO: Try node.dispatchEvent( new CompositionEvent(...) ) so listeners not
		// registered using jQuery will also get triggered, then fallback gracefully for
		// browsers that do not support it.
		this.$element.trigger( 'compositionstart' );

		range = this.getSelectedRange();

		if ( !range.collapsed ) {
			range.deleteContents();
		}

		if ( range.startContainer.nodeType === Node.TEXT_NODE ) {
			// Alter this text node's content and move the cursor
			textNode = range.startContainer;
			textOffset = range.startOffset;
			textNode.nodeValue =
				textNode.nodeValue.substr( 0, textOffset - precedingCharCount ) +
				newText +
				textNode.nodeValue.substr( textOffset );
			newOffset = textOffset - precedingCharCount + newText.length;
			newRange = rangy.createRange();
			newRange.setStart( range.startContainer, newOffset );
			newRange.setEnd( range.startContainer, newOffset );
			rangy.getSelection().setSingleRange( newRange );
		} else {
			// XXX assert precedingCharCount === 0
			// Insert a new text node with the new text
			textNode = document.createTextNode( newText );
			range.startContainer.insertBefore(
				textNode,
				range.startContainer.childNodes[ range.startOffset ]
			);
			newRange = rangy.createRange();
			newRange.setStart( textNode, textNode.length );
			newRange.setEnd( textNode, textNode.length );
			rangy.getSelection().setSingleRange( newRange );
		}

		// Trigger any externally registered jQuery compositionend / input event listeners.
		// TODO: Try node.dispatchEvent( new CompositionEvent(...) ) so listeners not
		// registered using jQuery will also get triggered, then fallback gracefully for
		// browsers that do not support it.
		this.$element.trigger( 'compositionend' );
		this.$element.trigger( 'input' );
	};

	/**
	 * Get the selection range inside the wrapped element, or null
	 *
	 * @return {Range|null} The selection range
	 */
	ContentEditableEntry.prototype.getSelectedRange = function () {
		var sel, range;
		rangy.init();
		sel = rangy.getSelection();
		if ( sel.rangeCount === 0 ) {
			return null;
		}
		range = sel.getRangeAt( 0 );
		if ( !this.$element[ 0 ].contains( range.commonAncestorContainer ) ) {
			return null;
		}
		return range;
	};

	TextEntryFactory.static.singleton.register( ContentEditableEntry );

	/* Exports */

	/**
	 * jQuery plugin ime
	 *
	 * @param {Object} option
	 */
	$.fn.ime = function ( option ) {
		return this.each( function () {
			var data, textEntry,
				$this = $( this ),
				options = typeof option === 'object' && option;

			data = $this.data( 'ime' );
			if ( !data ) {
				textEntry = TextEntryFactory.static.singleton.wrap( $this );
				if ( textEntry === undefined ) {
					return;
				}
				data = new IME( this, textEntry, options );
				$this.data( 'ime', data );
			}

			if ( typeof option === 'string' ) {
				data[ option ]();
			}
		} );
	};

	$.ime = {};
	$.ime.inputmethods = {};
	$.ime.sources = {};
	$.ime.preferences = {};
	$.ime.languages = {};

	/**
	 * @property {string} Relative/absolute path for the rules folder of jquery.ime
	 */
	$.ime.path = '../';
	$.ime.textEntryFactory = TextEntryFactory.static.singleton;
	$.ime.TextEntry = TextEntry;
	$.ime.inheritClass = inheritClass;

	defaultInputMethod = {
		contextLength: 0,
		maxKeyLength: 1
	};

	/**
	 * load an input method by given id
	 *
	 * @param {string} inputmethodId
	 * @return {jQuery.Promise}
	 */
	$.ime.load = function ( inputmethodId ) {
		var dependency,
			deferred = $.Deferred();

		if ( $.ime.inputmethods[ inputmethodId ] ) {
			return deferred.resolve();
		}

		// Validate the input method id.
		if ( !$.ime.sources[ inputmethodId ] ) {
			return deferred.reject();
		}

		dependency = $.ime.sources[ inputmethodId ].depends;
		if ( dependency && !$.ime.inputmethods[ dependency ] ) {
			$.ime.load( dependency ).done( function () {
				$.ime.load( inputmethodId ).done( function () {
					deferred.resolve();
				} );
			} );

			return deferred;
		}

		debug( 'Loading ' + inputmethodId );
		deferred = $.ajax( {
			url: $.ime.path + $.ime.sources[ inputmethodId ].source,
			dataType: 'script',
			cache: true
		} ).done( function () {
			debug( inputmethodId + ' loaded' );
		} ).fail( function ( jqxhr, settings, exception ) {
			debug( 'Error in loading inputmethod ' + inputmethodId + ' Exception: ' + exception );
		} );

		return deferred.promise();
	};

	$.ime.register = function ( inputMethod ) {
		$.ime.inputmethods[ inputMethod.id ] = $.extend( {}, defaultInputMethod, inputMethod );
	};

	/**
	 * Set the relative/absolute path to rules/ (for loading input methods)
	 *
	 * @param {string} path The relative/absolute path in which rules/ lies
	 */
	$.ime.setPath = function ( path ) {
		$.ime.path = path;
	};

	// default options
	$.ime.defaults = {
		languages: [], // Languages to be used- by default all languages
		helpHandler: null, // Called for each ime option in the menu
		showSelector: true
	};

	/**
	 * private function for debugging
	 */
	function debug( $obj ) {
		if ( window.console && window.console.log ) {
			window.console.log( $obj );
		}
	}

	function arrayKeys( obj ) {
		return $.map( obj, function ( element, index ) {
			return index;
		} );
	}
}( jQuery ) );
