/**
*
* @author Deux Huit Huit / Solutions Nitriques
*
* Requires: jPlayer 2.1.0+
*
* A simple plugin that extends the jPlayer object with a fadeTo/fadeIn/fadeOut method
* to control the sound.
* 
* It supports a basic method and concurrents call. The latest specified target will always be applied.
*
* You can use it 2 way
* @static
* $.jPlayer.fadeTo(player, // jQuery or DOM
*			duration, // time in ms
*			from, // starting volume ratio
*			to, //	ending volume ratio
*			callback, // @optional, function
*			debug, // @optional, making the plugin verbose in the console
*			);
* @instance
* $(id).jPlayerFade(debug // @optional
*					  ).to(duration, // time in ms
*						from, // starting volume ratio
*						to, // ending volume ratio
*						callback, // @optional, function
*					   );
* N.B. the debug parameter is set in the jPlayerFade function
* 
* fadeIn and fadeOut provide a better interface for dealing with fadeIn/Out
* The from and to couple are optional.
* The values used are 0 and the volume set in the constructor of the jPlayer
* i.e. $(id).jPlayerFade().out(2000); // will reduce to volume from the original volume
*									  // to 0 in 2 seconds. 
**/

(function ($, undefined) {
	
	"use strict";
	
	var
	
	assurePlayerSound = function (player) {
		// assure we have a jQuery object
		player = $(player);
		
		// assure we have the 'normal' volume
		if (isNaN(player.data('org-vol'))) {
			player.data('org-vol', player.jPlayer('option','volume'));
		}
		
		return player;
	},
	
	consoleLog = function (msg, debug) {
		if (!!console && !!console.log && debug) {
			console.log(msg);
		}
	},
	
	setVolume = function (player, v) {
		player.jPlayer('volume', v);
		player.data('volume', v);
	},
	
	fadeToPlayer = function (player, dur, from, to, callback, debug) {
		
		player = assurePlayerSound(player);
		
		// fade in...?
		if (to > from && !isNaN(player.data('volume')) && player.data('volume') > from) {
			// starting ahead
			from = player.data('volume');
		}
		
		// fade out...?
		if (from > to && !isNaN(player.data('volume')) && player.data('volume') < from) {
			// starting much too low
			from = player.data('volume');
		}
		
		// bunch of vars
		var // diffenrence between the to values
			diff = to - from,
			// number of frames
			limit = dur < 1 ? -1 : dur / 100,
			// time interval between each pass
			int = limit < 1  ? 0 : dur / limit,
			// delta
			m = diff / limit,
			// current position in the progress
			x = 0,
		
		// actual fade step
		fade = function () {
			// are we still in the 'anim' zone
			if (x <= limit) {
				var v = from + m*x;
				
				player.data('is-fading', true);
				
				if (isNaN(v)) {
					consoleLog ('[player] #' + player.attr('id') + ' ***NaN', debug);
				} else {
					
					// set the new volume
					setVolume(player, v);
					
					player.data('fadeout', setTimeout(fade, int));
					
					consoleLog ('[player] #' + player.attr('id') + ' volume set to ' + v, debug);
				}
				
				// increment step counter
				x++;
				
			// reach the end
			} else {
				setVolume(player, to);
				
				consoleLog ('[player] #' + player.attr('id') + ' volume set to ' + to + ' -- end', debug);
				
				player.data('is-fading', false);
				
				if ($.isFunction(callback)) {
					callback.call(player);
				}
			}
		};
		
		// do have a diff
		if (diff !== 0 && !isNaN(diff)) {
			
			// clear old fadeout 
			clearTimeout(player.data('fadeout'));
			
			fade();
			
		} else {
			consoleLog ('[player] #' + player.attr('id') + ' fade out skipped', debug);
			
			// assure we call the callback here too
			if ($.isFunction(callback)) {
				callback.call(player);
			}
		}
		
		return player;
	},
	
	// quick fade out
	fadeOutPlayer = function (player, dur, _in, _out, callback, debug) {
		player = assurePlayerSound(player);
		
		_in  = _in  != null && !isNaN(_in)  ? _in : parseFloat(player.data('org-vol'), 10);
		_out = _out != null && !isNaN(_out) ? _out : 0;
		
		return fadeToPlayer(player, dur, _in, _out, callback, debug);
	},
	
	// quick fade in (note, it's inverted fade out, so _in must be less than _out)
	fadeInPlayer = function (player, dur, _in, _out, callback, debug) {
		player = assurePlayerSound(player);
		
		_in  = _in  != null && !isNaN(_in)  ? _in : 0;
		_out = _out != null && !isNaN(_out) ? _out : parseFloat(player.data('org-vol'), 10);
		
		return fadeToPlayer(player, dur, _in, _out, callback, debug);
	},
	
	playerIsFading = function (player) {
		return !!player.data('is-fading');
	};
	
	
	// actual plugin
	if ($.isFunction($.jPlayer) && !$.isFunction($.jPlayer.fadeTo)) {
		// static function, making them public
		$.extend($.jPlayer, {
			fadeTo:     fadeToPlayer,
			fadeOut:    fadeOutPlayer,
			fadeIn:     fadeInPlayer,
			isFading:   playerIsFading
		});
		// add function to a new object JPlayerFade
		if (!$.fn.jPlayerFade) {
			$.extend($.fn, {
				jPlayerFade: function (debug) {
					// capture jQuery object
					var t = $(this);
					return {
						to: function (dur, from, to, callback) {
							return $.jPlayer.fadeTo(t, dur, from, to, callback, debug);
						},
						'in': function (dur, from, to, callback) {
							return $.jPlayer.fadeIn(t, dur, from, to, callback, debug);
						},
						out: function (dur, from, to, callback) {
							return $.jPlayer.fadeOut(t, dur, from, to, callback, debug);
						},
						isFading: function () {
							return playerIsFading(t);
						}
					};
				}
			});
		}
	} // end if
	
	
})(jQuery);