/*!
 Ridiculously Responsive Social Sharing Buttons
 Team: @dbox, @joshuatuscan
 Site: http://www.kurtnoble.com/labs/rrssb
 Twitter: @therealkni

        ___           ___
       /__/|         /__/\        ___
      |  |:|         \  \:\      /  /\
      |  |:|          \  \:\    /  /:/
    __|  |:|      _____\__\:\  /__/::\
   /__/\_|:|____ /__/::::::::\ \__\/\:\__
   \  \:\/:::::/ \  \:\~~\~~\/    \  \:\/\
    \  \::/~~~~   \  \:\  ~~~      \__\::/
     \  \:\        \  \:\          /__/:/
      \  \:\        \  \:\         \__\/
       \__\/         \__\/
*/

+(function(window, $, undefined) {
	'use strict';

	var support = {
		calc : false
	};

	/*
	 * Public Function
	 */

	 $.fn.rrssb = function( options ) {

		// Settings that $.rrssb() will accept.
		var settings = $.extend({
			description: undefined,
			emailAddress: undefined,
			emailBody: undefined,
			emailSubject: undefined,
			image: undefined,
			title: undefined,
			url: undefined
		}, options );

		// Return the encoded strings if the settings have been changed.
		for (var key in settings) {
			if (settings.hasOwnProperty(key) && settings[key] !== undefined) {
				settings[key] = encodeString(settings[key]);
			}
		};

		if (settings.url !== undefined) {
			$(this).find('.rrssb-facebook a').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + settings.url);
			$(this).find('.rrssb-tumblr a').attr('href', 'http://tumblr.com/share/link?url=' + settings.url + (settings.title !== undefined ? '&name=' + settings.title : '')  + (settings.description !== undefined ? '&description=' + settings.description : ''));
			$(this).find('.rrssb-linkedin a').attr('href', 'http://www.linkedin.com/shareArticle?mini=true&url=' + settings.url + (settings.title !== undefined ? '&title=' + settings.title : '') + (settings.description !== undefined ? '&summary=' + settings.description : ''));
			$(this).find('.rrssb-twitter a').attr('href', 'http://twitter.com/home?status=' + (settings.description !== undefined ? settings.description : '') + '%20' + settings.url);
			$(this).find('.rrssb-hackernews a').attr('href', 'https://news.ycombinator.com/submitlink?u=' + settings.url + (settings.title !== undefined ? '&text=' + settings.title : ''));
			$(this).find('.rrssb-reddit a').attr('href', 'http://www.reddit.com/submit?url=' + settings.url + (settings.description !== undefined ? '&text=' + settings.description : '') + (settings.title !== undefined ? '&title=' + settings.title : ''));
			$(this).find('.rrssb-googleplus a').attr('href', 'https://plus.google.com/share?url=' + (settings.description !== undefined ? settings.description : '') + '%20' + settings.url);
			$(this).find('.rrssb-pinterest a').attr('href', 'http://pinterest.com/pin/create/button/?url=' + settings.url + ((settings.image !== undefined) ? '&amp;media=' + settings.image : '') + (settings.description !== undefined ? '&amp;description=' + settings.description : ''));
			$(this).find('.rrssb-pocket a').attr('href', 'https://getpocket.com/save?url=' + settings.url);
			$(this).find('.rrssb-github a').attr('href', settings.url);
		}

		if (settings.emailAddress !== undefined) {
			$(this).find('.rrssb-email a').attr('href', 'mailto:' + settings.emailAddress + '?' + (settings.emailSubject !== undefined ? 'subject=' + settings.emailSubject : '') + (settings.emailBody !== undefined ? '&amp;body=' + settings.emailBody : ''));
		}

	};

	/*
	 * Utility functions
	 */
	var detectCalcSupport = function(){
		//detect if calc is natively supported.
		var el = $('<div>');
		var calcProps = [
			'calc',
			'-webkit-calc',
			'-moz-calc'
		];

		$('body').append(el);

		for (var i=0; i < calcProps.length; i++) {
			el.css('width', calcProps[i] + '(1px)');
			if(el.width() === 1){
				support.calc = calcProps[i];
				break;
			}
		}

		el.remove();
	};

	var encodeString = function(string) {
		// Recursively decode string first to ensure we aren't double encoding.
		if (string !== undefined && string !== null) {
			if (string.match(/%[0-9a-f]{2}/i) !== null) {
				string = decodeURIComponent(string);
				encodeString(string);
			} else {
				return encodeURIComponent(string);
			}
		}
	};

	var setPercentBtns = function() {
		// loop through each instance of buttons
		$('.rrssb-buttons').each(function(index) {
			var self = $(this);
			var buttons = $('li:visible', self);
			var numOfButtons = buttons.length;
			var initBtnWidth = 100 / numOfButtons;

			// set initial width of buttons
			buttons.css('width', initBtnWidth + '%').attr('data-initwidth',initBtnWidth);
		});
	};

	var makeExtremityBtns = function() {
		// loop through each instance of buttons
		$('.rrssb-buttons').each(function(index) {
			var self = $(this);
			//get button width
			var containerWidth = self.width();
			var buttonWidth = $('li', self).not('.small').first().width();

			// enlarge buttons if they get wide enough
			if (buttonWidth > 170 && $('li.small', self).length < 1) {
				self.addClass('large-format');
			} else {
				self.removeClass('large-format');
			}

			if (containerWidth < 200) {
				self.removeClass('small-format').addClass('tiny-format');
			} else {
				self.removeClass('tiny-format');
			}
		});
	};

	var backUpFromSmall = function() {
		// loop through each instance of buttons
		$('.rrssb-buttons').each(function(index) {
			var self = $(this);

			var buttons = $('li', self);
			var smallButtons = buttons.filter('.small');
			var totalBtnSze = 0;
			var totalTxtSze = 0;
			var upCandidate = smallButtons.first();
			var nextBackUp = parseFloat(upCandidate.attr('data-size')) + 55;
			var smallBtnCount = smallButtons.length;

			if (smallBtnCount === buttons.length) {
				var btnCalc = smallBtnCount * 42;
				var containerWidth = self.width();

				if ((btnCalc + nextBackUp) < containerWidth) {
					self.removeClass('small-format');
					smallButtons.first().removeClass('small');

					sizeSmallBtns();
				}

			} else {
				buttons.not('.small').each(function(index) {
					var button = $(this);
					var txtWidth = parseFloat(button.attr('data-size')) + 55;
					var btnWidth = parseFloat(button.width());

					totalBtnSze = totalBtnSze + btnWidth;
					totalTxtSze = totalTxtSze + txtWidth;
				});

				var spaceLeft = totalBtnSze - totalTxtSze;

				if (nextBackUp < spaceLeft) {
					upCandidate.removeClass('small');
					sizeSmallBtns();
				}
			}
		});
	};

	var checkSize = function(init) {
		// loop through each instance of buttons
		$('.rrssb-buttons').each(function(index) {

			var self = $(this);
			var buttons = $('li', self);

			// get buttons in reverse order and loop through each
			$(buttons.get().reverse()).each(function(index, count) {

				var button = $(this);

				if (button.hasClass('small') === false) {
					var txtWidth = parseFloat(button.attr('data-size')) + 55;
					var btnWidth = parseFloat(button.width());

					if (txtWidth > btnWidth) {
						var btn2small = buttons.not('.small').last();
						$(btn2small).addClass('small');
						sizeSmallBtns();
					}
				}

				if (!--count) backUpFromSmall();
			});
		});

		// if first time running, put it through the magic layout
		if (init === true) {
			rrssbMagicLayout(sizeSmallBtns);
		}
	};

	var sizeSmallBtns = function() {
		// loop through each instance of buttons
		$('.rrssb-buttons').each(function(index) {
			var self = $(this);
			var regButtonCount;
			var regPercent;
			var pixelsOff;
			var magicWidth;
			var smallBtnFraction;
			var buttons = $('li', self);
			var smallButtons = buttons.filter('.small');

			// readjust buttons for small display
			var smallBtnCount = smallButtons.length;

			// make sure there are small buttons
			if (smallBtnCount > 0 && smallBtnCount !== buttons.length) {
				self.removeClass('small-format');

				//make sure small buttons are square when not all small
				smallButtons.css('width','42px');
				pixelsOff = smallBtnCount * 42;
				regButtonCount = buttons.not('.small').length;
				regPercent = 100 / regButtonCount;
				smallBtnFraction = pixelsOff / regButtonCount;

				// if calc is not supported. calculate the width on the fly.
				if (support.calc === false) {
					magicWidth = ((self.innerWidth()-1) / regButtonCount) - smallBtnFraction;
					magicWidth = Math.floor(magicWidth*1000) / 1000;
					magicWidth += 'px';
				} else {
					magicWidth = support.calc+'('+regPercent+'% - '+smallBtnFraction+'px)';
				}

				buttons.not('.small').css('width', magicWidth);

			} else if (smallBtnCount === buttons.length) {
				// if all buttons are small, change back to percentage
				self.addClass('small-format');
				setPercentBtns();
			} else {
				self.removeClass('small-format');
				setPercentBtns();
			}
		}); //end loop

		makeExtremityBtns();
	};

	var rrssbInit = function() {
		$('.rrssb-buttons').each(function(index) {
			$(this).addClass('rrssb-'+(index + 1));
		});

		detectCalcSupport();

		setPercentBtns();

		// grab initial text width of each button and add as data attr
		$('.rrssb-buttons li .rrssb-text').each(function(index) {
			var buttonTxt = $(this);
			var txtWdth = buttonTxt.width();
			buttonTxt.closest('li').attr('data-size', txtWdth);
		});

		checkSize(true);
	};

	var rrssbMagicLayout = function(callback) {
		//remove small buttons before each conversion try
		$('.rrssb-buttons li.small').removeClass('small');

		checkSize();

		callback();
	};

	var popupCenter = function(url, title, w, h) {
		// Fixes dual-screen position                         Most browsers      Firefox
		var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
		var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

		var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

		var left = ((width / 2) - (w / 2)) + dualScreenLeft;
		var top = ((height / 3) - (h / 3)) + dualScreenTop;

		var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

		// Puts focus on the newWindow
		if (window.focus) {
			newWindow.focus();
		}
	};

	var waitForFinalEvent = (function () {
		var timers = {};
		return function (callback, ms, uniqueId) {
			if (!uniqueId) {
				uniqueId = "Don't call this twice without a uniqueId";
			}
			if (timers[uniqueId]) {
				clearTimeout (timers[uniqueId]);
			}
			timers[uniqueId] = setTimeout(callback, ms);
		};
	})();

	// init load
	$(document).ready(function(){
		/*
		 * Event listners
		 */

		$('.rrssb-buttons a.popup').on('click', function(e){
			var self = $(this);
			popupCenter(self.attr('href'), self.find('.rrssb-text').html(), 580, 470);
			e.preventDefault();
		});

		// resize function
		$(window).resize(function () {

			rrssbMagicLayout(sizeSmallBtns);

			waitForFinalEvent(function(){
				rrssbMagicLayout(sizeSmallBtns);
			}, 200, "finished resizing");
		});

		rrssbInit();
	});

	// Make global
	window.rrssbInit = rrssbInit;

})(window, jQuery);
