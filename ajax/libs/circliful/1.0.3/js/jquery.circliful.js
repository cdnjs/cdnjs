"use strict";

(function ($) {

	$.fn.circliful = function (options, callback) {

		var settings = $.extend({
			// These are the defaults.
			foregroundColor: "#3498DB",
			backgroundColor: "#ccc",
			pointColor: "none",
			fillColor: 'none',
			foregroundBorderWidth: 15,
			backgroundBorderWidth: 15,
			pointSize: 28.5,
			fontColor: '#aaa',
			percent: 75,
			animation: 1,
			animationStep: 5,
			icon: 'none',
			iconSize: '30',
			iconColor: '#ccc',
			iconPosition: 'top',
			target: 0,
			start: 0,
			showPercent: 1,
			percentageTextSize: 22,
			percentageX: 100,
			percentageY: 113,
			textAdditionalCss: '',
			targetPercent: 0,
			targetTextSize: 17,
			targetColor: '#2980B9',
			text: null,
			textStyle: null,
			textColor: '#666',
			textY: null,
			textX: null,
			multiPercentage: 0,
			percentages: null,
			textBelow: false,
			noPercentageSign: false,
			replacePercentageByText: null,
			halfCircle: false,
			animateInView: false,
			decimals: 0,
			alwaysDecimals: false,
			title: 'Circle Chart',
			description: ''
		}, options);

		return this.each(function () {
			var circleContainer = $(this);

			mergeDataAttributes(settings, circleContainer.data());

			var percent = settings.percent;
			var iconY = 83;
			var iconX = 100;
			var percentageY = settings.percentageY;
			var percentageX = settings.percentageX;
			var additionalCss;
			var elements;
			var icon;
			var backgroundBorderWidth = settings.backgroundBorderWidth;

			if (settings.halfCircle) {
				if (settings.iconPosition == 'left') {
					iconX = 80;
					iconY = 100;
					percentageX = 117;
					percentageY = 100;
				} else if (settings.halfCircle) {
					iconY = 80;
					percentageY = 100;
				}
			} else {
				if (settings.iconPosition == 'bottom') {
					iconY = 124;
					percentageY = 95;
				} else if (settings.iconPosition == 'left') {
					iconX = 80;
					iconY = 110;
					percentageX = 117;
				} else if (settings.iconPosition == 'middle') {
					if (settings.multiPercentage == 1) {
						if (typeof settings.percentages == "object") {
							backgroundBorderWidth = 30;
						} else {
							iconY = 110;
							elements = '<g stroke="' + (settings.backgroundColor != 'none' ? settings.backgroundColor : '#ccc') + '" ><line x1="133" y1="50" x2="140" y2="40" stroke-width="2"  /></g>';
							elements += '<g stroke="' + (settings.backgroundColor != 'none' ? settings.backgroundColor : '#ccc') + '" ><line x1="140" y1="40" x2="200" y2="40" stroke-width="2"  /></g>';
							percentageX = 228;
							percentageY = 47;
						}
					} else {
						iconY = 110;
						elements = '<g stroke="' + (settings.backgroundColor != 'none' ? settings.backgroundColor : '#ccc') + '" ><line x1="133" y1="50" x2="140" y2="40" stroke-width="2"  /></g>';
						elements += '<g stroke="' + (settings.backgroundColor != 'none' ? settings.backgroundColor : '#ccc') + '" ><line x1="140" y1="40" x2="200" y2="40" stroke-width="2"  /></g>';
						percentageX = 170; // To center the percentage exactly in the center.
						percentageY = 35;
					}
				} else if (settings.iconPosition == 'right') {
					iconX = 120;
					iconY = 110;
					percentageX = 80;
				} else if (settings.iconPosition == 'top' && settings.icon != 'none') {
					percentageY = 120;
				}
			}

			if (settings.targetPercent > 0 && settings.halfCircle != true) {
				percentageY = 95;
				elements = '<g stroke="' + (settings.backgroundColor != 'none' ? settings.backgroundColor : '#ccc') + '" ><line x1="75" y1="101" x2="125" y2="101" stroke-width="1"  /></g>';
				elements += '<text text-anchor="middle" x="' + percentageX + '" y="120" style="font-size: ' + settings.targetTextSize + 'px;" fill="' + settings.targetColor + '">' + settings.targetPercent + (settings.noPercentageSign && settings.replacePercentageByText == null ? '' : '%') + '</text>';
				elements += '<circle cx="100" cy="100" r="69" fill="none" stroke="' + settings.backgroundColor + '" stroke-width="3" stroke-dasharray="450" transform="rotate(-90,100,100)" />';
				elements += '<circle cx="100" cy="100" r="69" fill="none" stroke="' + settings.targetColor + '" stroke-width="3" stroke-dasharray="' + (435 / 100 * settings.targetPercent) + ', 20000" transform="rotate(-90,100,100)" />';
			}

			if (settings.text != null) {
				if (settings.halfCircle) {
					if (settings.textBelow) {
						elements += '<text text-anchor="middle" x="' + (settings.textX != null ? settings.textX : '100') + '" y="' + (settings.textY != null ? settings.textY : '64%') + '" style="' + settings.textStyle + '" fill="' + settings.textColor + '">' + settings.text + '</text>';
					}
					else if (settings.multiPercentage == 0) {
						elements += '<text text-anchor="middle" x="' + (settings.textX != null ? settings.textX : '100' ) + '" y="' + (settings.textY != null ? settings.textY : '115') + '" style="' + settings.textStyle + '" fill="' + settings.textColor + '">' + settings.text + '</text>';
					}
					else if (settings.multiPercentage == 1) {
						elements += '<text text-anchor="middle" x="' + (settings.textX != null ? settings.textX : '228' ) + '" y="' + (settings.textY != null ? settings.textY : '65') + '" style="' + settings.textStyle + '" fill="' + settings.textColor + '">' + settings.text + '</text>';
					}
				} else {
					if (settings.textBelow) {
						elements += '<text text-anchor="middle" x="' + (settings.textX != null ? settings.textX : '100' ) + '" y="' + (settings.textY != null ? settings.textY : '99%') + '" style="' + settings.textStyle + '" fill="' + settings.textColor + '">' + settings.text + '</text>';
					}
					else if (settings.multiPercentage == 0) {
						elements += '<text text-anchor="middle" x="' + (settings.textX != null ? settings.textX : '100' ) + '" y="' + (settings.textY != null ? settings.textY : '115') + '" style="' + settings.textStyle + '" fill="' + settings.textColor + '">' + settings.text + '</text>';
					}
					else if (settings.multiPercentage == 1) {
						elements += '<text text-anchor="middle" x="' + (settings.textX != null ? settings.textX : '228' ) + '" y="' + (settings.textY != null ? settings.textY : '65') + '" style="' + settings.textStyle + '" fill="' + settings.textColor + '">' + settings.text + '</text>';
					}
				}
			}

			if (settings.icon != 'none') {
				icon = '<text text-anchor="middle" x="' + iconX + '" y="' + iconY + '" class="icon" style="font-size: ' + settings.iconSize + 'px" fill="' + settings.iconColor + '">&#x' + settings.icon + '</text>';
			}

			if (settings.halfCircle) {
				var rotate = 'transform="rotate(-180,100,100)"';
				circleContainer
					.addClass('svg-container')
					.append(
						$('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 194 186" class="circliful">' +
							elements +
							'<clipPath id="cut-off-bottom"> <rect x="100" y="0" width="100" height="200" /> </clipPath>' +
							'<circle cx="100" cy="100" r="57" class="border" fill="' + settings.fillColor + '" stroke="' + settings.backgroundColor + '" stroke-width="' + backgroundBorderWidth + '" stroke-dasharray="360" clip-path="url(#cut-off-bottom)" transform="rotate(-90,100,100)" />' +
							'<circle class="circle" cx="100" cy="100" r="57" class="border" fill="none" stroke="' + settings.foregroundColor + '" stroke-width="' + settings.foregroundBorderWidth + '" stroke-dasharray="0,20000" ' + rotate + ' />' +
							'<circle cx="100" cy="100" r="' + settings.pointSize + '" fill="' + settings.pointColor + '" clip-path="url(#cut-off-bottom)" transform="rotate(-90,100,100)" />' +
							icon +
							'<text class="timer" text-anchor="middle" x="' + percentageX + '" y="' + percentageY + '" style="font-size: ' + settings.percentageTextSize + 'px; ' + additionalCss + ';' + settings.textAdditionalCss + '" fill="' + settings.fontColor + '"><tspan class="number">' + (settings.replacePercentageByText == null ? 0 : settings.replacePercentageByText) + '</tspan><tspan class="percent">' + (settings.noPercentageSign || settings.replacePercentageByText != null ? '' : '%') + '</tspan></text>')
					);
			} else {
				circleContainer
					.addClass('svg-container')
					.append(
						$('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 194 186" class="circliful">' +
							elements +
							'<circle cx="100" cy="100" r="57" class="border" fill="' + settings.fillColor + '" stroke="' + settings.backgroundColor + '" stroke-width="' + backgroundBorderWidth + '" stroke-dasharray="360" transform="rotate(-90,100,100)" />' +
							'<circle class="circle" cx="100" cy="100" r="57" class="border" fill="none" stroke="' + settings.foregroundColor + '" stroke-width="' + settings.foregroundBorderWidth + '" stroke-dasharray="0,20000" transform="rotate(-90,100,100)" />' +
							'<circle cx="100" cy="100" r="' + settings.pointSize + '" fill="' + settings.pointColor + '" />' +
							icon +
							'<text class="timer" text-anchor="middle" x="' + percentageX + '" y="' + percentageY + '" style="font-size: ' + settings.percentageTextSize + 'px; ' + additionalCss + ';' + settings.textAdditionalCss + '" fill="' + settings.fontColor + '"><tspan class="number">' + (settings.replacePercentageByText == null ? 0 : settings.replacePercentageByText) + '</tspan><tspan class="percent">' + (settings.noPercentageSign || settings.replacePercentageByText != null ? '' : '%') + '</tspan></text>')
					);
			}

			var circle = circleContainer.find('.circle');
			var myTimer = circleContainer.find('.timer');
			var interval = 30;
			var angle = 0;
			var angleIncrement = settings.animationStep;
			var last = 0;
			var summary = 0;
			var oneStep = 0;
			var text = percent;
			var calculateFill = (360 / 100 * percent);

			if (settings.halfCircle) {
				calculateFill = (360 / 100 * percent) / 2;
			}

			if (settings.replacePercentageByText != null) {
				text = settings.replacePercentageByText;
			}

			if (settings.start > 0 && settings.target > 0) {
				percent = settings.start / (settings.target / 100);
				oneStep = settings.target / 100;
			}

			if (settings.animation == 1) {
				if (settings.animateInView) {
					$(window).scroll(function () {
						checkAnimation();
					});
				} else {
					animate();
				}
			} else {
				circle
					.attr("stroke-dasharray", calculateFill + ", 20000");

				if (settings.showPercent == 1) {
					myTimer
						.find('.number')
						.text(text);
				} else {
					myTimer
						.find('.number')
						.text(settings.target);
					myTimer
						.find('.percent')
						.text('');
				}
			}

			function animate() {
				var timer = window.setInterval(function () {
					if ((angle) >= calculateFill) {
						window.clearInterval(timer);
						last = 1;
						if (typeof callback == 'function') {
							callback.call(this);
						}
					} else {
						angle += angleIncrement;
						summary += oneStep;
					}

					if (angle / 3.6 >= percent && last == 1) {
						angle = 3.6 * percent;
					}

					if (summary > settings.target && last == 1) {
						summary = settings.target;
					}

					if (settings.replacePercentageByText == null) {
						if (settings.halfCircle) {
							text = parseFloat((100 * angle / 360) * 2);
						} else {
							text = parseFloat((100 * angle / 360));
						}
						text = text.toFixed(settings.decimals);
						if (!settings.alwaysDecimals && (percent == 0 || (percent > 1 && last != 1))) {
							text = parseInt(text);
						}
					}

					circle
						.attr("stroke-dasharray", angle + ", 20000");

					if (settings.showPercent == 1) {
						myTimer
							.find('.number')
							.text(text);
					} else {
						myTimer
							.find('.number')
							.text(summary);
						myTimer
							.find('.percent')
							.text('');
					}
				}.bind(circle), interval);
			}

			function isElementInViewport() {
				// Get the scroll position of the page.
				var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
				var viewportTop = $(scrollElem).scrollTop();
				var viewportBottom = viewportTop + $(window).height();

				// Get the position of the element on the page.
				var elemTop = Math.round(circle.offset().top);
				var elemBottom = elemTop + circle.height();

				return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
			}

			function checkAnimation() {
				// If the animation has already been started
				if (circle.hasClass('start')) return;

				if (isElementInViewport(circle)) {
					// Start the animation
					circle.addClass('start');
					setTimeout(animate, 250)
				}
			}

			function mergeDataAttributes(settings, dataAttributes) {
				$.each(settings, function(key, value) {
					if(key.toLowerCase() in dataAttributes) {
						settings[key] = dataAttributes[key.toLowerCase()];
					}
				});
			}
		});
	}
}(jQuery));
