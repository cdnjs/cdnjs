/*! politespace - v0.1.7 - 2016-03-27
Politely add spaces to input values to increase readability (credit card numbers, phone numbers, etc).
 * https://github.com/filamentgroup/politespace
 * Copyright (c) 2016 Filament Group (@filamentgroup)
 *  License */

(function( w, $ ){
	"use strict";

	var Politespace = function( element ) {
		if( !element ) {
			throw new Error( "Politespace requires an element argument." );
		}

		if( !element.getAttribute ) {
			// Cut the mustard
			return;
		}

		this.element = element;
		this.$element = $( element );
		this.delimiter = this.$element.attr( "data-delimiter" ) || " ";
		// https://en.wikipedia.org/wiki/Decimal_mark
		this.decimalMark = this.$element.attr( "data-decimal-mark" ) || "";
		this.reverse = this.$element.is( "[data-reverse]" );
		this.groupLength = this.$element.attr( "data-grouplength" ) || 3;

		var proxyAnchorSelector = this.$element.attr( "data-proxy-anchor" );
		this.$proxyAnchor = this.$element;
		this.$proxy = null;

		if( proxyAnchorSelector ) {
			this.$proxyAnchor = this.$element.closest( proxyAnchorSelector );
		}
	};

	Politespace.prototype._divideIntoArray = function( value ) {
		var split = ( '' + this.groupLength ).split( ',' ),
			isUniformSplit = split.length === 1,
			dividedValue = [],
			loopIndex = 0,
			groupLength,
			substrStart,
			useCharCount;

		while( split.length && loopIndex < value.length ) {
			if( isUniformSplit ) {
				groupLength = split[ 0 ];
			} else {
				// use the next split or the rest of the string if open ended, ala "3,3,"
				groupLength = split.shift() || value.length - loopIndex;
			}

			// Use min if we’re at the end of a reversed string
			// (substrStart below grows larger than the string length)
			useCharCount = Math.min( parseInt( groupLength, 10 ), value.length - loopIndex );

			if( this.reverse ) {
				substrStart = -1 * (useCharCount + loopIndex);
			} else {
				substrStart = loopIndex;
			}
			dividedValue.push( value.substr( substrStart, useCharCount ) );
			loopIndex += useCharCount;
		}

		if( this.reverse ) {
			dividedValue.reverse();
		}

		return dividedValue;
	};

	Politespace.prototype.format = function( value ) {
		var split;
		var val = this.unformat( value );
		var suffix = '';

		if( this.decimalMark ) {
			split = val.split( this.decimalMark );
			suffix = split.length > 1 ? this.decimalMark + split[ 1 ] : '';
			val = split[ 0 ];
		}

		return this._divideIntoArray( val ).join( this.delimiter ) + suffix;
	};

	Politespace.prototype.trimMaxlength = function( value ) {
		var maxlength = this.element.getAttribute( "maxlength" );
		// Note input type="number" maxlength does nothing
		if( maxlength ) {
			value = value.substr( 0, maxlength );
		}
		return value;
	};

	Politespace.prototype.getValue = function() {
		return this.trimMaxlength( this.element.value );
	};

	Politespace.prototype.update = function() {
		this.element.value = this.useProxy() || this.$element.attr( "type" ) === "password" ?
			this.getValue() :
			this.format( this.getValue() );
	};

	Politespace.prototype.unformat = function( value ) {
		return value.replace( new RegExp(  this.delimiter, 'g' ), '' );
	};

	Politespace.prototype.reset = function() {
		this.element.value = this.unformat( this.element.value );
	};

	Politespace.prototype.useProxy = function() {
		// this needs to be an attr check and not a prop for `type` toggling (like password)
		return this.$element.attr( "type" ) === "number";
	};

	Politespace.prototype.updateProxy = function() {
		if( this.useProxy() && this.$proxy.length ) {
			this.$proxy.html( this.format( this.getValue() ) );
			this.$proxy.css( "width", this.element.offsetWidth + "px" );
		}
	};

	Politespace.prototype.createProxy = function() {
		if( !this.useProxy() ) {
			return;
		}

		var self = this;
		function sumStyles( el, props ) {
			var total = 0;
			for( var j=0, k=props.length; j<k; j++ ) {
				total += parseFloat( self.$element.css( props[ j ] ) );
			}
			return total;
		}

		var $el = $( "<div>" ).addClass( "politespace-proxy active" );
		var $parent = this.$proxyAnchor.parent();

		this.$proxy = $( "<div>" ).css({
			font: this.$element.css( "font" ),
			"padding-left": sumStyles( this.element, [ "padding-left", "border-left-width" ] ) + "px",
			"padding-right": sumStyles( this.element, [ "padding-right", "border-right-width" ] ) + "px",
			top: sumStyles( this.element, [ "padding-top", "border-top-width", "margin-top" ] ) + "px"
		});
		$el.append( this.$proxy );
		$el.append( this.$proxyAnchor );
		$parent.append( $el );

		this.updateProxy();
	};

	Politespace.prototype.setGroupLength = function( length ) {
		this.groupLength = length;
		this.$element.attr( "data-grouplength", length );
	};

	w.Politespace = Politespace;

}( this, jQuery ));

(function( $ ) {
	"use strict";

	// jQuery Plugin

	$( document ).bind( "politespace-input", function( event ) {
		var $t = $( event.target );
		if( !$t.is( "[data-politespace-creditcard]" ) ) {
			return;
		}
		var pspace = $t.data( "politespace" );
		var firstDigit = parseInt( $t.val().substr( 0, 1 ), 10 );

		switch( firstDigit ) {
			case 3: // AMEX or Diners Club
				pspace.setGroupLength( "4,6," );
				break;
			case 4:
			case 5:
			case 6:
				pspace.setGroupLength( "4" );
				break;
		}
	});

}( jQuery ));

(function( $ ) {
	"use strict";

	// jQuery Plugin

	var componentName = "politespace",
		initSelector = "[data-" + componentName + "]";

	$.fn[ componentName ] = function(){
		return this.each( function(){
			var $t = $( this );
			if( $t.data( componentName ) ) {
				return;
			}

			var polite = new Politespace( this );
			if( polite.useProxy() ) {
				polite.createProxy();
			}


			$( this )
				.bind( "politespace-hide-proxy", function() {
					$( this ).closest( ".politespace-proxy" ).removeClass( "active" );
					polite.update();
				})
				.bind( "politespace-show-proxy", function() {
					$( this ).closest( ".politespace-proxy" ).addClass( "active" );

					polite.update();
					if( polite.useProxy() ) {
						polite.updateProxy();
					}
				})
				.bind( "input keydown", function() {
					$( this ).trigger( "politespace-input" );

					polite.updateProxy();
				})
				.bind( "blur", function() {
					polite.update();

					if( polite.useProxy() ){
						$( this ).trigger( "politespace-show-proxy" );
					}
				})
				.bind( "focus", function() {
					$( this ).trigger( "politespace-hide-proxy" );
					polite.reset();
				})
				.data( componentName, polite );

			polite.update();
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ) {
		var $sel = $( e.target ).is( initSelector ) ? $( e.target ) : $( initSelector, e.target );
		$sel[ componentName ]();
	});

}( jQuery ));
