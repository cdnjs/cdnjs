( function ( $ ) {
	'use strict';

	var selectorTemplate, MutationObserver;

	function IMESelector( element, options ) {
		this.$element = $( element );
		this.options = $.extend( {}, IMESelector.defaults, options );
		this.active = false;
		this.$imeSetting = null;
		this.$menu = null;
		this.inputmethod = null;
		this.timer = null;
		this.init();
		this.listen();
	}

	IMESelector.prototype = {
		constructor: IMESelector,

		init: function () {
			this.prepareSelectorMenu();
			this.position();
			this.$imeSetting.hide();
		},

		prepareSelectorMenu: function () {
			// TODO: In this approach there is a menu for each editable area.
			// With correct event mapping we can probably reduce it to one menu.
			this.$imeSetting = $( selectorTemplate );
			this.$menu = $( '<div class="imeselector-menu" role="menu">' );
			this.$menu.append(
				imeListTitle(),
				imeList(),
				toggleMenuItem(),
				languageListTitle()
			);

			this.prepareLanguageList();
			this.$menu.append( this.helpLink() );

			if ( $.i18n ) {
				this.$menu.i18n();
			}

			this.$imeSetting.append( this.$menu );
			$( 'body' ).append( this.$imeSetting );
		},

		stopTimer: function () {
			if ( this.timer ) {
				clearTimeout( this.timer );
				this.timer = null;
			}

			this.$imeSetting.stop( true, true );
		},

		resetTimer: function () {
			var imeselector = this;

			this.stopTimer();

			this.timer = setTimeout(
				function () {
					imeselector.$imeSetting.animate( {
						opacity: 0,
						marginTop: '-20px'
					}, 500, function () {
						imeselector.$imeSetting.hide();
						// Restore properties for the next time it becomes visible:
						imeselector.$imeSetting.css( 'opacity', 1 );
						imeselector.$imeSetting.css( 'margin-top', 0 );
					} );
				}, this.options.timeout
			);
		},

		focus: function () {
			// Hide all other IME settings and collapse open menus
			$( 'div.imeselector' ).hide();
			$( 'div.imeselector-menu' ).removeClass( 'ime-open' );
			this.$imeSetting.show();
			this.resetTimer();
		},

		show: function () {
			this.$menu.addClass( 'ime-open' );
			this.stopTimer();
			this.$imeSetting.show();

			return false;
		},

		hide: function () {
			this.$menu.removeClass( 'ime-open' );
			this.resetTimer();

			return false;
		},

		toggle: function () {
			if ( this.$menu.hasClass( 'ime-open' ) ) {
				this.hide();
			} else {
				this.show();
			}
		},

		/**
		 * Bind the events and listen
		 */
		listen: function () {
			var imeselector = this;

			imeselector.$imeSetting.on( 'click.ime', function ( e ) {
				var t = $( e.target );

				if ( t.hasClass( 'imeselector-toggle' ) ) {
					imeselector.toggle();
				}

				return false;
			} );

			imeselector.$element.on( 'blur.ime', function () {
				if ( !imeselector.$imeSetting.hasClass( 'ime-onfocus' ) ) {
					imeselector.$imeSetting.hide();
					imeselector.hide();
				}
			} );

			// Hide the menu when clicked outside
			$( 'html' ).click( function () {
				imeselector.hide();
			} );

			// ... but when clicked on window do not propagate it.
			this.$menu.on( 'click', function ( event ) {
				event.stopPropagation();
			} );

			imeselector.$imeSetting.mouseenter( function () {
				// We don't want the selector to disappear
				// while the user is trying to click it
				imeselector.stopTimer();
				imeselector.$imeSetting.addClass( 'ime-onfocus' );
			} ).mouseleave( function () {
				imeselector.resetTimer();
				imeselector.$imeSetting.removeClass( 'ime-onfocus' );
			} );

			imeselector.$menu.on( 'click.ime', 'li', function () {
				imeselector.$element.focus();

				return false;
			} );

			imeselector.$menu.on( 'click.ime', 'li.ime-im', function () {
				imeselector.selectIM( $( this ).data( 'ime-inputmethod' ) );
				imeselector.$element.trigger( 'setim.ime', $( this ).data( 'ime-inputmethod' ) );

				return false;
			} );

			imeselector.$menu.on( 'click.ime', 'li.ime-lang', function () {
				var im = imeselector.selectLanguage( $( this ).attr( 'lang' ) );

				imeselector.$element.trigger( 'setim.ime', im );

				return false;
			} );

			imeselector.$menu.on( 'click.ime', 'div.ime-disable', function () {
				imeselector.disableIM();

				return false;
			} );

			// Just make it work as a regular link
			imeselector.$menu.on( 'click.ime', '.ime-help-link', function ( e ) {
				e.stopPropagation();
			} );

			imeselector.$element.on( 'focus.ime', function ( e ) {
				imeselector.selectLanguage( imeselector.decideLanguage() );
				imeselector.focus();
				e.stopPropagation();
			} );

			imeselector.$element.attrchange( function ( ) {
				if ( imeselector.$element.is( ':hidden' ) ) {
					imeselector.$imeSetting.hide();
				}
			} );

			// Possible resize of textarea
			imeselector.$element.on( 'mouseup.ime', $.proxy( this.position, this ) );
			imeselector.$element.on( 'keydown.ime', $.proxy( this.keydown, this ) );

			// Update IM selector position when the window is resized
			// or the browser window is zoomed in or zoomed out
			$( window ).resize( function () {
				imeselector.position();
			} );
		},

		/**
		 * Keydown event handler. Handles shortcut key presses
		 *
		 * @context {HTMLElement}
		 * @param {jQuery.Event} e
		 */
		keydown: function ( e ) {
			var ime = $( e.target ).data( 'ime' ),
				firstInputmethod,
				previousInputMethods,
				languageCode;

			this.focus(); // shows the trigger in case it is hidden

			if ( isShortcutKey( e ) ) {
				if ( ime.isActive() ) {
					this.disableIM();
					this.$element.trigger( 'setim.ime', 'system' );
				} else {
					if ( this.inputmethod !== null ) {
						this.selectIM( this.inputmethod.id );
						this.$element.trigger( 'setim.ime', this.inputmethod.id );
					} else {
						languageCode = this.decideLanguage();
						this.selectLanguage( languageCode );

						if ( !ime.isActive() && $.ime.languages[ languageCode ] ) {
							// Even after pressing toggle shortcut again, it is still disabled
							// Check if there is a previously used input method.
							previousInputMethods = $.ime.preferences.getPreviousInputMethods();

							if ( previousInputMethods[ 0 ] ) {
								this.selectIM( previousInputMethods[ 0 ] );
							} else {
								// Provide the default input method in this case.
								firstInputmethod = $.ime.languages[ languageCode ].inputmethods[ 0 ];
								this.selectIM( firstInputmethod );
							}
						}
					}
				}

				e.preventDefault();
				e.stopPropagation();

				return false;
			}

			return true;
		},

		/**
		 * Position the im selector relative to the edit area
		 */
		position: function () {
			var menuWidth, menuTop, menuLeft, elementPosition,
				top, left, cssTop, cssLeft, verticalRoom, overflowsOnRight,
				imeSelector = this,
				rtlElement = this.$element.css( 'direction' ) === 'rtl',
				$window = $( window );

			this.focus(); // shows the trigger in case it is hidden

			elementPosition = this.$element.offset();
			top = elementPosition.top + this.$element.outerHeight();
			left = elementPosition.left;

			// RTL element position fix
			if ( !rtlElement ) {
				left = elementPosition.left + this.$element.outerWidth() -
					this.$imeSetting.outerWidth();
			}

			// While determining whether to place the selector above or below the input box,
			// take into account the value of scrollTop, to avoid the selector from always
			// getting placed above the input box since window.height would be less than top
			// if the page has been scrolled.
			verticalRoom = $window.height() + $( document ).scrollTop() - top;

			if ( verticalRoom < this.$imeSetting.outerHeight() ) {
				top = elementPosition.top - this.$imeSetting.outerHeight();
				menuTop = this.$menu.outerHeight() +
					this.$imeSetting.outerHeight();

				// Flip the menu to the top only if it can fit in the space there
				if ( menuTop < top ) {
					this.$menu
						.addClass( 'ime-position-top' )
						.css( 'top', -menuTop );
				}
			}

			cssTop = top;
			cssLeft = left;
			this.$element.parents().each( function () {
				if ( $( this ).css( 'position' ) === 'fixed' ) {
					imeSelector.$imeSetting.css( 'position', 'fixed' );
					cssTop -= $( document ).scrollTop();
					cssLeft -= $( document ).scrollLeft();
					return false;
				}
			} );

			this.$imeSetting.css( {
				top: cssTop,
				left: cssLeft
			} );

			menuWidth = this.$menu.width();
			overflowsOnRight = ( left - $( document ).scrollLeft() + menuWidth ) > $window.width();

			// Adjust horizontal position if there's
			// not enough space on any side
			if ( menuWidth > left ||
				rtlElement && overflowsOnRight
			) {
				if ( rtlElement ) {
					if ( overflowsOnRight ) {
						this.$menu.addClass( 'ime-right' );
						menuLeft = this.$imeSetting.outerWidth() - menuWidth;
					} else {
						menuLeft = 0;
					}
				} else {
					this.$menu.addClass( 'ime-right' );
					menuLeft = elementPosition.left;
				}

				this.$menu.css( 'left', menuLeft );
			}
		},

		/**
		 * Select a language
		 *
		 * @param {string} languageCode
		 * @return {string|bool} Selected input method id or false
		 */
		selectLanguage: function ( languageCode ) {
			var ime, imePref, language;

			// consider language codes case insensitive
			languageCode = languageCode && languageCode.toLowerCase();

			ime = this.$element.data( 'ime' );
			imePref = $.ime.preferences.getIM( languageCode );
			language = $.ime.languages[ languageCode ];

			this.setMenuTitle( this.getAutonym( languageCode ) );

			if ( !language ) {
				return false;
			}

			if ( ime.getLanguage() === languageCode ) {
				// Nothing to do. It is same as the current language,
				// but check whether the input method changed.
				if ( ime.inputmethod && ime.inputmethod.id !== imePref ) {
					this.selectIM( $.ime.preferences.getIM( languageCode ) );
				}

				return $.ime.preferences.getIM( languageCode );
			}

			this.$menu.find( 'li.ime-lang' ).show();
			this.$menu.find( 'li[lang=' + languageCode + ']' ).hide();

			this.prepareInputMethods( languageCode );
			this.hide();
			// And select the default inputmethod
			ime.setLanguage( languageCode );
			this.inputmethod = null;
			this.selectIM( $.ime.preferences.getIM( languageCode ) );

			return $.ime.preferences.getIM( languageCode );
		},

		/**
		 * Get the autonym by language code.
		 *
		 * @param {string} languageCode
		 * @return {string} The autonym
		 */
		getAutonym: function ( languageCode ) {
			return $.ime.languages[ languageCode ]
				&& $.ime.languages[ languageCode ].autonym;
		},

		/**
		 * Set the title of the selector menu.
		 *
		 * @param {string} title
		 */
		setMenuTitle: function ( title ) {
			this.$menu.find( '.ime-list-title' ).text( title );
		},

		/**
		 * Decide on initial language to select
		 */
		decideLanguage: function () {
			if ( $.ime.preferences.getLanguage() ) {
				// There has been an override by the user,
				// so return the language selected by user
				return $.ime.preferences.getLanguage();
			}

			if ( this.$element.attr( 'lang' ) &&
				$.ime.languages[ this.$element.attr( 'lang' ) ]
			) {
				return this.$element.attr( 'lang' );
			}

			// There is either no IMs for the given language attr
			// or there is no lang attr at all.
			return $.ime.preferences.getDefaultLanguage();
		},

		/**
		 * Select an input method
		 *
		 * @param {string} inputmethodId
		 */
		selectIM: function ( inputmethodId ) {
			var imeselector = this,
				ime;

			if ( !inputmethodId ) {
				return;
			}

			this.$menu.find( '.ime-checked' ).removeClass( 'ime-checked' );
			this.$menu.find( 'li[data-ime-inputmethod=' + inputmethodId + ']' )
				.addClass( 'ime-checked' );
			ime = this.$element.data( 'ime' );

			if ( inputmethodId === 'system' ) {
				this.disableIM();

				return;
			}

			ime.load( inputmethodId ).done( function () {
				imeselector.inputmethod = $.ime.inputmethods[ inputmethodId ];
				imeselector.hide();
				ime.enable();
				ime.setIM( inputmethodId );
				imeselector.$imeSetting.find( 'a.ime-name' ).text(
					$.ime.sources[ inputmethodId ].name
				);

				imeselector.position();

				// Save this preference
				$.ime.preferences.save();
			} );
		},

		/**
		 * Disable the inputmethods (Use the system input method)
		 */
		disableIM: function () {
			this.$menu.find( '.ime-checked' ).removeClass( 'ime-checked' );
			this.$menu.find( 'div.ime-disable' ).addClass( 'ime-checked' );
			this.$element.data( 'ime' ).disable();
			this.$imeSetting.find( 'a.ime-name' ).text( '' );
			this.hide();
			this.position();

			// Save this preference
			$.ime.preferences.save();
		},

		/**
		 * Prepare language list
		 */
		prepareLanguageList: function () {
			var languageCodeIndex,
				$languageListWrapper,
				$languageList,
				languageList,
				$languageItem,
				$language,
				languageCode,
				language;

			// Language list can be very long, so we use a container with
			// overflow auto
			$languageListWrapper = $( '<div class="ime-language-list-wrapper">' );
			$languageList = $( '<ul class="ime-language-list">' );

			if ( $.isFunction( this.options.languages ) ) {
				languageList = this.options.languages();
			} else {
				languageList = this.options.languages;
			}

			for ( languageCodeIndex in languageList ) {
				languageCode = languageList[ languageCodeIndex ];
				language = $.ime.languages[ languageCode ];

				if ( !language ) {
					continue;
				}

				$languageItem = $( '<a>' )
					.attr( 'href', '#' )
					.text( this.getAutonym( languageCode ) )
					.addClass( 'selectable-row-item autonym' );
				$language = $( '<li class="ime-lang selectable-row">' ).attr( 'lang', languageCode );
				$language.append( $languageItem );
				$languageList.append( $language );
			}

			$languageListWrapper.append( $languageList );
			this.$menu.append( $languageListWrapper );

			if ( this.options.languageSelector ) {
				this.$menu.append( this.options.languageSelector() );
			}
		},

		/**
		 * Prepare input methods in menu for the given language code
		 *
		 * @param {string} languageCode
		 */
		prepareInputMethods: function ( languageCode ) {
			var language = $.ime.languages[ languageCode ],
				$imeList = this.$menu.find( '.ime-list' ),
				imeSelector = this;

			$imeList.empty();

			$.each( language.inputmethods, function ( index, inputmethod ) {
				var $imeItem, $inputMethod, source, name;

				source = $.ime.sources[ inputmethod ];
				if ( !source ) {
					return;
				}
				name = source.name;

				$imeItem = $( '<a>' )
					.attr( 'href', '#' )
					.text( name )
					.addClass( 'selectable-row-item' );

				$inputMethod = $( '<li>' )
					.attr( 'data-ime-inputmethod', inputmethod )
					.addClass( 'ime-im selectable-row' )
					.append( '<span class="ime-im-check"></span>', $imeItem );

				if ( imeSelector.options.helpHandler ) {
					$inputMethod.append( imeSelector.options.helpHandler.call( imeSelector, inputmethod ) );
				}

				$imeList.append( $inputMethod );
			} );
		},

		/**
		 * Create a help link element.
		 *
		 * @return {jQuery}
		 */
		helpLink: function () {
			return $( '<div class="ime-help-link selectable-row">' )
				.append( $( '<a>' ).text( 'Help' )
					.addClass( 'selectable-row-item' )
					.attr( {
						href: 'http://github.com/wikimedia/jquery.ime',
						target: '_blank',
						'data-i18n': 'jquery-ime-help'
					} )
				);
		}
	};

	IMESelector.defaults = {
		defaultLanguage: 'en',
		timeout: 2500 // Milliseconds after which IME widget hides itself.
	};

	/*
	 * imeselector PLUGIN DEFINITION
	 */

	$.fn.imeselector = function ( options ) {
		return this.each( function () {
			var $this = $( this ),
				data = $this.data( 'imeselector' );

			if ( !data ) {
				$this.data( 'imeselector', ( data = new IMESelector( this, options ) ) );
			}

			if ( typeof options === 'string' ) {
				data[ options ].call( $this );
			}
		} );
	};

	$.fn.imeselector.Constructor = IMESelector;

	function languageListTitle() {
		return $( '<h3>' )
			.addClass( 'ime-lang-title' )
			.attr( 'data-i18n', 'jquery-ime-other-languages' )
			.text( 'Other languages' );
	}

	function imeList() {
		return $( '<ul>' ).addClass( 'ime-list' );
	}

	function imeListTitle() {
		return $( '<h3>' ).addClass( 'ime-list-title autonym' );
	}

	function toggleMenuItem() {
		return $( '<div class="ime-disable selectable-row">' ).append(
			$( '<span>' )
				.attr( {
					'class': 'ime-disable-link',
					'data-i18n': 'jquery-ime-disable-text'
				} )
				.addClass( 'ime-checked' )
				.text( 'System input method' ),
			$( '<span>' )
				.addClass( 'ime-disable-shortcut' )
				.text( 'CTRL+M' )
		);
	}

	selectorTemplate = '<div class="imeselector imeselector-toggle">' +
		'<a class="ime-name imeselector-toggle" href="#"></a>' +
		'<b class="ime-setting-caret imeselector-toggle"></b></div>';

	MutationObserver = window.MutationObserver ||
		window.WebKitMutationObserver ||
		window.MozMutationObserver;

	/**
	 * Check whether a keypress event corresponds to the shortcut key
	 *
	 * @param {event} event
	 * @return {boolean} true if the key is a shortcut key
	 */
	function isShortcutKey( event ) {
		// 77 - The letter M, for Ctrl-M
		return event.ctrlKey && !event.altKey && ( event.which === 77 );
	}

	function isDOMAttrModifiedSupported() {
		var p = document.createElement( 'p' ),
			flag = false;

		if ( p.addEventListener ) {
			p.addEventListener( 'DOMAttrModified', function () {
				flag = true;
			}, false );
		} else if ( p.attachEvent ) {
			p.attachEvent( 'onDOMAttrModified', function () {
				flag = true;
			} );
		} else {
			return false;
		}

		p.setAttribute( 'id', 'target' );

		return flag;
	}

	$.fn.attrchange = function ( callback ) {
		var observer;

		if ( MutationObserver ) {
			observer = new MutationObserver( function ( mutations ) {
				mutations.forEach( function ( e ) {
					callback.call( e.target, e.attributeName );
				} );
			} );

			return this.each( function () {
				observer.observe( this, {
					subtree: false,
					attributes: true
				} );
			} );
		} else if ( isDOMAttrModifiedSupported() ) {
			return this.on( 'DOMAttrModified', function ( e ) {
				callback.call( this, e.originalEvent.attrName );
			} );
		} else if ( 'onpropertychange' in document.body ) {
			return this.on( 'propertychange', function () {
				callback.call( this, window.event.propertyName );
			} );
		}
	};
}( jQuery ) );
