/*

scrollUp v1.0.0
Author: Mark Goodyear - http://www.markgoodyear.com
Git: https://github.com/markgoodyear/scrollup

Copyright 2013 Mark Goodyear
Licensed under the MIT license
http://www.opensource.org/licenses/mit-license.php

Twitter: @markgdyr

*/

;(function ($) {

	$.scrollUp = function (options) {

		// Settings
		var settings = {
			scrollName: 'scrollUp', // Element ID
			topDistance: '300', // Distance from top before showing element (px)
			topSpeed: 300, // Speed back to top (ms)
			animation: 'fade', // Fade, slide, none
			animationInSpeed: 200, // Animation in speed (ms)
			animationOutSpeed: 200, // Animation out speed (ms)
			scrollText: 'Scroll to top', // Text for element
			activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'
		};

		// Load settings
		if (options) {
			var settings = $.extend(settings, options);
		}

		// Shorthand setting names
		var sn = '#' + settings.scrollName,
			an = settings.animation,
			os = settings.animationOutSpeed,
			is = settings.animationInSpeed,
			td = settings.topDistance,
			st = settings.scrollText,
			ts = settings.topSpeed,
			ao = settings.activeOverlay;

		// Create element
		$('<a/>', {
		    id: settings.scrollName,
		    href: '#top',
		    title: st,
		    text: st
		}).appendTo('body');

		// Minium CSS to make the magic happen
		$(sn).css({
			'display':'none',
			'position': 'fixed',
			'z-index': '2147483647'
		})

		// Active point overlay
		if (ao) {
			$("body").append("<div id='"+ settings.scrollName +"-active'></div>");
			$(sn+"-active").css({ 'position': 'absolute', 'top': td+'px', 'width': '100%', 'border-top': '1px dotted '+ao, 'z-index': '2147483647' })
		}

		// Scroll funtion
		$(window).scroll(function(){	

			// Fade animation
			if (an === "fade") {
				$( ($(window).scrollTop() > td) ? $(sn).fadeIn(is) : $(sn).fadeOut(os) );
			}

			// SlideUp animation
			else if (an === "slide") {
				$( ($(window).scrollTop() > td) ? $(sn).slideDown(is) : $(sn).slideUp(os) );
			}

			// No animation
			else {
				$( ($(window).scrollTop() > td) ? $(sn).show(0) : $(sn).hide(0) );
			}

		});

		// Back to the top
		$(sn).click( function(event) {
		  	$('html, body').animate({scrollTop:0}, ts);
	        return false;
		});

	}; // End scrollUp function
}(jQuery));