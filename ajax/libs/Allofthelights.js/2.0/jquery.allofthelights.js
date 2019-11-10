/*
* Allofthelights.js
* Version: 2.0
* Description: jQuery plugin to turn off the light and enjoy your videos !
* Licence: MIT
* Infos: http://www.megaptery.com/allofthelights/
* Author: Pierre VION - http://www.pierrevion.fr/
*/

(function ($) {

    $.fn.allofthelights = function (options) {

        var defaults = {
		color: 'black',
		opacity: '0.9',
		z_index: '10',
		switch_selector: 'switch',
		delay_turn_on: 400,
		delay_turn_off: 400,
		scrolling: true,
		is_responsive: true,
		custom_player: null
        };

		var options = $.extend(defaults, options);
		var $body = $('body');
		var $elements = [];
		var switch_selector = '#'+options.switch_selector+', .'+options.switch_selector;

		this.each(function() {
			var $this = $(this);
			$elements.push($this);
		});

		if (options.is_responsive) {

			var selectors = [
				"iframe[src*='player.vimeo.com']",
				"iframe[src*='www.youtube.com']",
				"iframe[src*='www.dailymotion.com']",
				"iframe[src*='www.kickstarter.com']",
				"object",
				"embed"
			];
			
			if (options.custom_player) {
				selectors.push(options.custom_player);
			}

			var $all_videos = $(this).parent().find(selectors.join(','));
			
			var style = 
			'<style type="text/css">			\
				.fluid_width_video_wrapper {		\
					width: 100%;			\
					position: relative;		\
					padding: 0;			\
				}					\
				.fluid_width_video_wrapper iframe,	\
				.fluid_width_video_wrapper object,	\
				.fluid_width_video_wrapper embed {	\
					position: absolute;		\
					top: 0;				\
					left: 0;			\
					width: 100%;			\
					height: 100%;			\
				}					\
			</style>';

			$body.append(style);

			$all_videos.each(function(){
				var $this = $(this);
				if (this.tagName.toLowerCase() == 'embed' && $this.parent('object').length || $this.parent('.fluid_width_video_wrapper').length) { return; }
				var height = ( this.tagName.toLowerCase() == 'object' || $this.attr('height') ) ? $this.attr('height') : $this.height(),
				width = $this.attr('width') ? $this.attr('width') : $this.width(),
				aspectRatio = height / width;
				if(!$this.attr('id')){
					var videoID = 'fitvid' + Math.floor(Math.random()*999999);
					$this.attr('id', videoID);
				}
				$this.wrap('<div class="fluid_width_video_wrapper"></div>').parent('.fluid_width_video_wrapper').css('padding-top', (aspectRatio * 100)+"%");
				$this.removeAttr('height').removeAttr('width');
			});
		}

		var style = 
		'<style type="text/css">			\
			.allofthelights_bg {			\
				position: absolute;		\
				display: none;			\
				background: '+options.color+';	\
				opacity: '+options.opacity+';	\
				z-index: '+options.z_index+';	\
			}					\
		</style>';
		$body.append(style);

		$body.on('click', '.allofthelights_bg', function() {
			var callback_turn_on = true;
			$('.allofthelights_bg').fadeOut(+options.delay_turn_on, function() {
				if (!options.scrolling) {
					$body.css('overflow', 'auto');
				}
				if (callback_turn_on && $.isFunction(options.callback_turn_on)) {
					options.callback_turn_on.call(this);
					callback_turn_on = false;
				}
			});			
		}).on('click', switch_selector, function() {
			if (!options.scrolling) {
				$body.css('overflow', 'hidden');
			}
			calculating();
		});

		$(window).on('resize', function() {
			if ($('div.allofthelights_bg').is(':visible')) {
				$('div.allofthelights_bg').remove();
				calculating();
			}
		});

		function calculating() {

			var x = [];
			var y = [];
			var id = 1;
			var callback_turn_off = true;

			x.push(0.0);
			x.push($(document).width());
			y.push(0.0);
			y.push($(document).height());
					
			for (var i = 0 ; i < $elements.length ; ++i) {
				var $video = $elements[i];
				var offset = $video.offset();
				var height = $video.height();
				var width = $video.width();
				x.push(offset.left); x.push(offset.left + width);
				y.push(offset.top); y.push(offset.top + height);
			}
			
			x.sort(function(a,b){return a-b});
			y.sort(function(a,b){return a-b});
			
			for (var i = 0 ; i < x.length - 1 ; ++i) {

				for (var j = 0 ; j < y.length - 1 ; ++j) {

					var ax = x[i];
					var ay = y[j]; 
					var bx = x[i + 1];
					var by = y[j + 1];                      
					var to_display = true;
					
					for (var k = 0 ; k < $elements.length ; ++k) {

						var $video = $elements[k];
						var offset = $video.offset();
						var height = $video.height();
						var width = $video.width();
						var vax = offset.left;
						var vay = offset.top; 
						var vbx = offset.left + width;
						var vby = offset.top + height;  
						
						if (ax >= vax && ay >= vay && bx <= vbx && by <= vby) {
							to_display = false;
							break;
						}					
					}
						
					if (to_display) {

						if (!$('#allofthelights_bg' + id).length > 0) {
							var div = "<div id='allofthelights_bg"+ id +"' class='allofthelights_bg'></div>";
							$body.append(div);
						}
						
						$('#allofthelights_bg' + id).css({
							top: ay,
							left: ax,
							right: '0',
							height: by - ay,
							width: bx - ax
						});

						id++;

					}
				}
			}

			if (!$('div.allofthelights_bg').is(':visible')) {
				$('.allofthelights_bg').fadeIn(+options.delay_turn_off, function() {
					if (callback_turn_off && $.isFunction(options.callback_turn_off)) {
						options.callback_turn_off.call(this);
						callback_turn_off = false;
					}
				});
			}
			
		}
	}
})(jQuery);
