/* Hammer-time - v0.3.0
 * http://github.com/hammerjs/hammer-time
 *
 * Copyright Alexander Schmitz and other contributors
 * Released under the MIT license
 *
 * Expiramental fastclick based on a partial polyfill of
 * touch-action: none; CSS property
 */

( function() {

	// Detect support for necessary features;
	var MO = window.MutationObserver || window.WebKitMutationObserver;
	var touchevents = ( "ontouchstart" in window ) ||
	                  ( window.DocumentTouch && document instanceof DocumentTouch );
	var nativeTouchAction = document.documentElement.style[ "touch-action" ] !== undefined ||
			                            document.documentElement.style[ "-ms-touch-action" ];

// If there is native touch action bail the hammer has already dropped
if ( nativeTouchAction || !touchevents || !MO ) {
	return;
}

//Check if a global Hammer object already exists
window.Hammer = window.Hammer || {};

// We need to save the last touch start in iOS 8 if it is more then 150ms
// it will trigger native fast click which cant ne stoped even with all the might
// of thors hammer and a return false
var touchMatchNone = /touch-action[:][\s]*(none)[^;'"]*/;
var touchMatchManipulation = /touch-action[:][\s]*(manipulation)[^;'"]*/;
var touchMatch = /touch-action/;
var timeTouch = /(iP(ad|hone|od))/.test( navigator.userAgent ) && ( "indexedDB" in window || !!window.performance );

window.Hammer.time = {

	// Check if an element has touch action none in its style attribute and thusly should
	// be hammered upon
	getTouchAction: function( element ) {
		return this.checkStyleString( element.getAttribute( "style" ) );
	},
	checkStyleString: function( style ) {
		if ( !touchMatch.test( style ) ) {
			return undefined;
		}
		if ( touchMatchNone.test( style ) ) {
			return "none";
		}
		if ( touchMatchManipulation.test( style ) ) {
			return "manipulation";
		}
		return true;
	},
	shouldHammer: function( e ) {
		var parentAction = e.target.hasParent;
		return ( parentAction && ( !timeTouch || Date.now() - e.target.lastStart < 125 ) ) ?
				parentAction : false;
	},
	touchHandler: function( e ) {
		var hammerType = this.shouldHammer( e );

		// Check both if we should trigger fast click and the time to avoid a double trigger with
		// native fast click
		if ( hammerType === "none" ) {
			this.dropHammer( e );
		} else if ( hammerType === "manipulation" ) {
			var pos = e.target.getBoundingClientRect();
			var scrolled = pos.top !== this.pos.top || pos.left !== this.pos.left;
			!scrolled && this.dropHammer( e );
		}
		this.scrolled = false;
		delete e.target.lastStart;
		delete e.target.hasParent;
	},
	dropHammer: function( e ) {
		if ( e.type === "touchend" ) {
			e.target.focus();

			// Wait for next tic so events fire in proper order
			setTimeout( function() {
				e.target.click();
			}, 0 );
		}

		// Prevent the click which will come after this otherwise but with a 300ms delay
		e.preventDefault();
	},
	touchStart: function( e ) {
		this.pos = e.target.getBoundingClientRect();
		e.target.hasParent = this.hasParent( e.target );
		if ( timeTouch && e.target.hasParent ) {
			e.target.lastStart = Date.now();
		}
	},
	styleWatcher: function( mutations ) {
		mutations.forEach( this.styleUpdater, this );
	},
	styleUpdater: function( mutation ) {

		// We just caused this update bail
		if ( mutation.target.updateNext ) {
			mutation.target.updateNext = false;
			return;
		}

		var touchAction = this.getTouchAction( mutation.target );

		if ( touchAction ) {
			if ( touchAction !== "none" ) {
				mutation.target.hadTouchNone = false;
			}
			return;
		}
		if ( !touchAction &&
				(
					( mutation.oldValue && this.checkStyleString( mutation.oldValue ) ) ||
					mutation.target.hadTouchNone
				)
			) {

			// We save this because during animations which update the style in quick succession
			// style tag can update quicker then the mutation observer fires so we lose the oldValue
			// property which contains our refrence to the original which contained touch-action.
			mutation.target.hadTouchNone = true;

			// Save the fact that we caused the next update
			mutation.target.updateNext = false;

			// Add touch action back to the style attribute
			mutation.target
				.setAttribute( "style",
					mutation.target.getAttribute( "style" ) + " touch-action: none;"
				);

		}
	},
	hasParent: function( node ) {
		var touchAction;
		for ( var cur = node; cur && cur.parentNode; cur = cur.parentNode ) {
			touchAction = this.getTouchAction( cur );
			if ( touchAction ) {
				return touchAction;
			}
		}
		return false;
	},
	installStartEvents: function() {
		document.addEventListener( "touchstart", this.touchStart.bind( this ) );
		document.addEventListener( "mousedown", this.touchStart.bind( this ) );
	},
	installEndEvents: function() {
		document.addEventListener( "touchend", this.touchHandler.bind( this ), true );
		document.addEventListener( "mouseup", this.touchHandler.bind( this ), true );
	},
	installObserver: function() {

		// We need to observe changes to style attributes because if something updates the style
		// attribute it will remove the touch-action property because browsers santitize the style
		// attribute when its properties are updated.
		this.observer = new MO( this.styleWatcher.bind( this ) ).observe( document, {
			subtree: true,
			attributes: true,
			attributeOldValue: true,
			attributeFilter: [ "style" ]
		} );
	},
	install: function() {
		this.installEndEvents();
		this.installStartEvents();
		this.installObserver();
	}
};

window.Hammer.time.install();

} )();
