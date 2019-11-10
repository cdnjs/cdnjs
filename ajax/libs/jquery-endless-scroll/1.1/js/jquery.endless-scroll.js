/**
 * Endless Scroll plugin for jQuery v1.1
 *
 * Copyright (c) 2008 Fred Wu
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

/**
 * Configuration options:
 *
 * bottomPixels integer    the number of pixels from the bottom of the page that triggers the event
 * fireOnce     boolean    only fire once until the execution of the current event is completed
 * fireDelay    integer    delay the subsequent firing, in milliseconds. 0 or false to disable delay.
 * loader       string     HTML loader
 * data         string     plain HTML data
 * insertAfter  string     jQuery selector syntax: where to put the loader as well as the plain HTML data
 * callback     function   callback function, accepets one argument: fire sequence (the number of times the event triggered during the current page session)
 *
 * Usage tips:
 *
 * The plugin is more useful when used with the callback function, which can then make AJAX calls to retrieve content.
 * The fire sequence argument (for the callback function) is useful for 'pagination'-like features.
 */

(function($){
	
	$.fn.endlessScroll = function(options){
		
		var defaults = {
			bottomPixels: 50,
			fireOnce: true,
			fireDelay: 150,
			loader: "<br />Loading...<br />",
			data: "",
			insertAfter: "div:last",
			callback: function(fs){ return true; }
		};
		
		var options = $.extend(defaults, options);
		
		var fired = false;
		var fireSequence = 0;
		
		$(window).scroll(function(){
			if ($(document).height() - $(window).height() <= $(window).scrollTop() + options.bottomPixels)
			{
				if ((options.fireOnce == false || options.fireOnce == true && fired != true))
				{
					fired = true;
					fireSequence++;
					
					$(options.insertAfter).after("<div id=\"endless_scroll_loader\">" + options.loader + "</div>");
					
					if (typeof options.data == 'function')
					{
						data = options.data.apply();
					}
					else
					{
						data = options.data;
					}
					
					if (data !== false)
					{
						$("div#endless_scroll_loader").remove();
						$(options.insertAfter).after("<div id=\"endless_scroll_data\">" + data + "</div>");
						$("div#endless_scroll_data").hide().fadeIn();
						$("div#endless_scroll_data").removeAttr("id");
						
						var args = new Array();
						args[0] = fireSequence;
						options.callback.apply(this, args);
						
						if (options.fireDelay !== false || options.fireDelay !== 0)
						{
							// slight delay for preventing event firing twice
							$(options.insertAfter).after("<div id=\"endless_scroll_marker\"></div>");
							$("div#endless_scroll_marker").fadeTo(options.fireDelay, 1, function(){
								$(this).remove();
								fired = false;
							});
						}
						else
						{
							fired = false;
						}
					}
				}
			}
		});
	};
	
})(jQuery);