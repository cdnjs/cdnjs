/*
 * Fuel UX Intelligent Bootstrap Dropdowns
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2013 ExactTarget
 * Licensed under the MIT license.
 */

define([ "jquery", "fuelux/all"], function($) {

	$(function() {
		$(document.body).on("click", "[data-toggle=dropdown][data-direction]", function( event ) {

			var dataDirection = $(this).data().direction;

			// if data-direction is not auto or up, default to bootstraps dropdown
			if( dataDirection === "auto" || dataDirection === "up" ) {
				// only changing css positioning if position is set to static
				// if this doesn"t happen, dropUp will not be correct
				// works correctly for absolute, relative, and fixed positioning
				if( $(this).parent().css("position") === "static" ) {
					$(this).parent().css({ position: "relative"});
				}

				// only continue into this function if the click came from a user
				if( event.hasOwnProperty("originalEvent") ) {
					// stopping bootstrap event propagation
					event.stopPropagation();

					// deciding what to do based on data-direction attribute
					if( dataDirection === "auto" ) {
						// have the drop down intelligently decide where to place itself
						forceAutoDropDown( $(this) );
					} else if ( dataDirection === "up" ) {
						forceDropUp( $(this) );
					}
				}
			}

		});

		function forceDropUp( element ) {
			var dropDown      = element.next();
			var dropUpPadding = 5;
			var topPosition;

			$(dropDown).addClass("dropUp");
			topPosition = ( ( dropDown.outerHeight() + dropUpPadding ) * -1 ) + "px";

			dropDown.css({
				visibility: "visible",
				top: topPosition
			});
			element.click();
		}

		function forceAutoDropDown( element ) {
			var dropDown      = element.next();
			var dropUpPadding = 5;
			var topPosition;

			// setting this so I can get height of dropDown without it being shown
			dropDown.css({ visibility: "hidden" });

			// deciding where to put menu
			if( dropUpCheck( dropDown ) ) {
				$(dropDown).addClass("dropUp");
				topPosition = ( ( dropDown.outerHeight() + dropUpPadding ) * -1 ) + "px";
			} else {
				$(dropDown).removeClass("dropUp");
				topPosition = "auto";
			}

			dropDown.css({
				visibility: "visible",
				top: topPosition
			});
			element.click();
		}

		function dropUpCheck( element ) {
			// caching container
			var $container = getContainer( element );

			// building object with measurementsances for later use
			var measurements                = {};
			measurements.parentHeight       = element.parent().outerHeight();
			measurements.parentOffsetTop    = element.parent().offset().top;
			measurements.dropdownHeight     = element.outerHeight();
			measurements.containerHeight    = $container.overflowElement.outerHeight();

			// this needs to be different if the window is the container or another element is
			measurements.containerOffsetTop = ( !! $container.isWindow ) ? $container.overflowElement.scrollTop() : $container.overflowElement.offset().top;

			// doing the calculations
			measurements.fromTop    = measurements.parentOffsetTop - measurements.containerOffsetTop;
			measurements.fromBottom = measurements.containerHeight - measurements.parentHeight - ( measurements.parentOffsetTop - measurements.containerOffsetTop );

			// actual determination of where to put menu
			// false = drop down
			// true = drop up
			if( measurements.dropdownHeight < measurements.fromBottom ) {
				return false;
			} else if ( measurements.dropdownHeight < measurements.fromTop ) {
				return true;
			} else if ( measurements.dropdownHeight >= measurements.fromTop && measurements.dropdownHeight >= measurements.fromBottom ) {
				// decide which one is bigger and put it there
				if( measurements.fromTop >= measurements.fromBottom ) {
					return true;
				} else {
					return false;
				}
			}
		}

		function getContainer( element ) {
			var containerElement = window;
			var isWindow         = true;
			$.each( element.parents(), function(index, value) {
				if( $(value).css('overflow') !== 'visible' ) {
					containerElement = value;
					isWindow         = false;
					return false;
				}
			});
			return {
				overflowElement: $( containerElement ),
				isWindow: isWindow
			};
		}
	});
});