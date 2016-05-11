/*! politespace - v0.1.2 - 2016-03-27
Politely add spaces to input values to increase readability (credit card numbers, phone numbers, etc).
 * https://github.com/filamentgroup/politespace
 * Copyright (c) 2016 Filament Group (@filamentgroup)
 * MIT License */

(function( w ){
	"use strict";

	var Politespace = function( element ) {
		if( !element ) {
			throw new Error( "Politespace requires an element argument." );
		}

		if( !element.getAttribute ) {
			// Cut the mustard
			return;
		}

		var groupRegMatch;

		this.element = element;
		this.type = this.element.getAttribute( "type" );
		this.delimiter = this.element.getAttribute( "data-delimiter" ) || " ";

		this.groupLength = this.element.getAttribute( "data-grouplength" ) || 3;
		groupRegMatch = this._buildRegexArr( this.groupLength );

		this.groupRegNonUniform = groupRegMatch.length > 1;
		this.groupReg = new RegExp( groupRegMatch.join( '' ), !this.groupRegNonUniform ? 'g' : '' );
	};

	Politespace.prototype._buildRegexArr = function( groupLengths ) {
		var split = ( '' + groupLengths ).split( ',' ),
			str = [];

		for( var j = 0, k = split.length; j<k; j++ ) {
			str.push( '([\\S]{' + ( split[ j ] === '' ? '1,' : split[j] ) + '})' + ( j > 0 ? "?" : "" ) );
		}

		return str;
	};

	Politespace.prototype.format = function( value ) {
		var val = value.replace( /\D/g, '' ),
			match;

		if( this.groupRegNonUniform ) {
			match = val.match( this.groupReg );
			if( match ) {
				match.shift();

				for( var j = 0; j < match.length; j++ ) {
					if( !match[ j ] ) {
						match.splice( j, 1 );
						j--;
					}
				}
			}

			val = ( match || [ val ] ).join( this.delimiter );
		} else {
			val = val.replace( this.groupReg, "$1" + this.delimiter );

			if( val.substr( val.length - 1 ) === this.delimiter ) {
				val = val.substr( 0, val.length - 1 );
			}
		}

		return val;
	};

	Politespace.prototype.val = function() {
		return this.format( this.element.value );
	};

	Politespace.prototype.update = function() {
		var maxlength = this.element.getAttribute( "maxlength" ),
			val = this.val();

		if( maxlength ) {
			val = val.substr( 0, maxlength );
		}

		if( !this.useProxy() ) {
			this.element.value = val;
		}
	};

	Politespace.prototype.unformat = function( value ) {
		return value.replace( /\s/g, '' );
	};

	Politespace.prototype.reset = function() {
		this.element.value = this.unformat( this.element.value );
	};

	Politespace.prototype.useProxy = function() {
		return this.type === "number";
	};

	Politespace.prototype.updateProxy = function() {
		if( this.useProxy() ) {
			this.element.parentNode.firstChild.innerHTML = this.val();
		}
	};

	Politespace.prototype.createProxy = function() {
		if( !this.useProxy() ) {
			return;
		}

		function getStyle( el, prop ) {
			return window.getComputedStyle( el, null ).getPropertyValue( prop );
		}
		function getStyleFloat( el, prop ) {
			return parseFloat( getStyle( el, prop ) );
		}

		var parent = this.element.parentNode;
		var el = document.createElement( "div" );
		var proxy = document.createElement( "div" );
		proxy.innerHTML = this.val();
		proxy.style.fontFamily = getStyle( this.element, "font-family" );
		proxy.style.left = ( getStyleFloat( this.element, "padding-left" ) + getStyleFloat( this.element, "border-left-width" ) ) + "px";
		proxy.style.top = ( getStyleFloat( this.element, "padding-top" ) + getStyleFloat( this.element, "border-top-width" ) ) + "px";

		el.appendChild( proxy );
		el.className = "politespace-proxy active";
		var formEl = parent.replaceChild( el, this.element );
		el.appendChild( formEl );
	};

	w.Politespace = Politespace;

}( this ));

(function( $ ) {
	"use strict";

	// jQuery Plugin

	var componentName = "politespace",
		enhancedAttr = "data-enhanced",
		initSelector = "[data-" + componentName + "]:not([" + enhancedAttr + "])";

	$.fn[ componentName ] = function(){
		return this.each( function(){
			var polite = new Politespace( this );
			if( polite.type === "number" ) {
				polite.createProxy();
			}

			$( this )
				.bind( "input keydown", function() {
					polite.updateProxy();
				})
				.bind( "blur", function() {
					$( this ).closest( ".politespace-proxy" ).addClass( "active" );
					polite.update();
				})
				.bind( "focus", function() {
					$( this ).closest( ".politespace-proxy" ).removeClass( "active" );
					polite.reset();
				})
				.data( componentName, polite );

			polite.update();
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ) {
		var $sel = $( e.target ).is( initSelector ) ? $( e.target ) : $( initSelector, e.target );
		$sel[ componentName ]().attr( enhancedAttr, "true" );
	});

}( jQuery ));
