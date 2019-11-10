/*
 *  Tinacious Design goalProgress jQuery plugin
 *  Plugin URL: https://github.com/tinacious/goalProgress
 *
 *  Christina Holly (Tinacious Design)
 *  http://tinaciousdesign.com
 *
 */
!function($){
	$.fn.extend({
		goalProgress: function(options) {
			var defaults = {
				goalAmount: 100,
				currentAmount: 50,
				speed: 1000,
				textBefore: '',
				textAfter: '',
				milestoneNumber: 70,
				milestoneClass: 'almost-full',
				callback: function() {}
			}

			var options = $.extend(defaults, options);
			return this.each(function(){
				var obj = $(this);
				
				// Collect and sanitize user input
				var goalAmountParsed = parseInt(defaults.goalAmount);
				var currentAmountParsed = parseInt(defaults.currentAmount);

				// Calculate size of the progress bar
				var percentage = (currentAmountParsed / goalAmountParsed) * 100;

				var milestoneNumberClass = (percentage > defaults.milestoneNumber) ? ' ' + defaults.milestoneClass : ''

				// Generate the HTML
 				var progressBar = '<div class="progressBar">' + defaults.textBefore + currentAmountParsed + defaults.textAfter + '</div>';

 				var progressBarWrapped = '<div class="goalProgress' + milestoneNumberClass + '">' + progressBar + '</div>';

				// Append to the target
				obj.append(progressBarWrapped);

				// Ready
				var rendered = obj.find('div.progressBar');

				// Remove Spaces
				rendered.each(function() {
					$(this).html($(this).text().replace(/\s/g, '&nbsp;'));
				});

				// Animate!
				rendered.animate({width: percentage +'%'}, defaults.speed, defaults.callback);

				if(typeof callback == 'function') {
					callback.call(this)
				}
			});
		}
	});
}(window.jQuery);