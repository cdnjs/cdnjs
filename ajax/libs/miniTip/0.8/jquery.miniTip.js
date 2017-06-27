/*!
 * miniTip v0.8
 *
 * Updated: July 20, 2011
 * Requires: jQuery v1.3+
 *
 * (c) 2011, James Simpson
 * http://goldfirestudios.com
 *
 * Dual licensed under the MIT and GPL
 *
 * Documentation found at:
 * http://goldfirestudios.com/blog/
*/

(function($){
    $.fn.miniTip = function(opts) {
		// define the default option values
		var d = {
			title:		'', // if left blank, no title bar will show
			content:	false, // the content of the tooltip
			delay:		300, // how long to wait before showing and hiding the tooltip (ms)
			anchor:		'n', // n (top), s (bottom), e (right), w (left)
			event:		'hover', // can be 'hover' or 'click'
			fadeIn:		200, // speed of fade in animation (ms)
			fadeOut:	200, // speed of fade out animation (ms)
			aHide:		true, // set to false to only hide when the mouse moves away from the anchor and tooltip
			maxW:		'250px', // max width of tooltip
			offset:		5, // offset in pixels of stem from anchor
			show:		function(){}, // custom funciton to be called when the tooltip is shown
			hide:		function(){} // custom funciton to be called when the tooltip is hidden
		};
		
		// merge the defaults with the user defined options
		var o = $.extend(d, opts);
		
		// add the tip elements to the DOM
		if ($('#miniTip').length <= 0) {
			var tip = $('<div id="miniTip" style="max-width:'+o.maxW+';"><div id="miniTip_t"></div><div id="miniTip_c"></div><div id="miniTip_a"></div></div>');
			$('body').append(tip);
		}
		
		// define the containers
		var tt_w = $('#miniTip');
		var tt_t = $('#miniTip_t');
		var tt_c = $('#miniTip_c');
		var tt_a = $('#miniTip_a');
		
		// initialize the tooltip
		return this.each(function(){
			// if content is set to false, use the title attribute
			var cont = (o.content) ? o.content : $(this).attr('title');
			
			// if the tooltip isn't empty
			if (cont != '') {
				// make sure the anchor element can be referred to below
				var el = $(this);
				
				// define the delay
				var delay = false;
				
				// define variable that checks if the mouse is still on the tooltip
				var tHov = false;
				var aHov = true;
				
				// if you are using the title attribute, remove it from the anchor
				if (!o.content) {
					el.removeAttr('title');
				}
				
				if (o.event == 'hover') {
					// add the hover event
					el.hover(
						function(){
							// make sure we know this wasn't activated by click
							tt_w.removeAttr('click');
							
							// show the tooltip
							aHov = true;
							show();
						},
						function(){
							aHov = false;
							hide();
						}
					);
					
					// add a hover event for the tooltip if aHide is false
					if (!o.aHide) {
						tt_w.hover(
							function() {
								tHov = true;
							},
							function() {
								tHov = false;
								window.setTimeout(function(){if (!aHov && !tt_w.attr('click')) hide()}, 200);
							}
						);
					}
				} else if (o.event == 'click') {
					// make sure auto hide is set to false automatically
					o.aHide = true;
				
					// add the click event to the anchor
					el.click(function(){
						// make sure we know this was activated by click
						tt_w.attr('click', 't');
						
						// show the tooltip, unless it is already showing, then close it
						if (tt_w.css('display') == 'none') show(); else hide();
						return false;
					});
					
					// clear the tooltip if anywhere but the tooltip itself is clicked
					$('body').click(function(e){
						if ($.inArray(e.target.id, ['miniTip', 'miniTip_c', 'miniTip_a', 'miniTip_t']) < 0) hide();
					});
				}
				
				// show the tooltip
				function show() {
					// call the show callback function
					o.show.call(this);
					
					// add in the content
					tt_c.html(cont);
					
					// insert the title (or hide if none is set)
					if (o.title != '') {
						tt_t.html(o.title);
						tt_t.show();
					} else {
						tt_t.hide();
					}
					
					// reset arrow position
					tt_a.removeAttr('class');
					
					// get position of anchor element
					var top = parseInt(el.offset().top);
					var left = parseInt(el.offset().left);
					
					// get width and height of the anchor element
					var elW = parseInt(el.outerWidth());
					var elH = parseInt(el.outerHeight());
					
					// get width and height of the tooltip
					var tipW = tt_w.outerWidth();
					var tipH = tt_w.outerHeight();
					
					// calculate the difference between anchor and tooltip
					var w = Math.round((elW - tipW) / 2);
					var h = Math.round((elH - tipH) / 2);
					
					// calculate position for tooltip
					var mLeft = Math.round(left + w);
					var mTop = Math.round(top + elH + o.offset + 8);
					
					// position of the arrow
					var aLeft = (Math.round(tipW - 16) / 2) - parseInt(tt_w.css('borderLeftWidth'));
					
					// figure out if the tooltip will go off of the screen
					var eOut = (left + elW + tipW + o.offset + 8) > parseInt($(window).width());
					var wOut = (tipW + o.offset + 8) > left;
					var nOut = (tipH + o.offset + 8) > top;
					var sOut = (top + elH + tipH + o.offset + 8) > parseInt($(window).height() + $(window).scrollTop());
					
					// default anchor position
					var anchorPos = o.anchor;
					
					// calculate where the anchor should be (east & west)
					if (wOut || o.anchor == 'e' && !eOut) {
						if (o.anchor == 'w' || o.anchor == 'e') {
							anchorPos = 'e';
							aTop = Math.round((tipH / 2) - 8 - parseInt(tt_w.css('borderRightWidth')));
							aLeft = -8 - parseInt(tt_w.css('borderRightWidth'));
							mLeft = left + elW + o.offset + 8;
							mTop = Math.round((top + elH / 2) - (tipH / 2));
						}
					} else if (eOut || o.anchor == 'w' && !wOut) {
						if (o.anchor == 'w' || o.anchor == 'e') {
							anchorPos = 'w';
							aTop = Math.round((tipH / 2) - 8 - parseInt(tt_w.css('borderLeftWidth')));
							aLeft = tipW - parseInt(tt_w.css('borderLeftWidth'));
							mLeft = left - tipW - o.offset - 8;
							mTop = Math.round((top + elH / 2) - (tipH / 2));
						}
					}
					
					// calculate where the anchor should be (north & south)
					if (sOut || o.anchor == 'n' && !nOut) {
						if (o.anchor == 'n' || o.anchor == 's') {
							anchorPos = 'n';
							aTop = tipH - parseInt(tt_w.css('borderTopWidth'));
							mTop = top - (tipH + o.offset + 8);
						}
					} else if (nOut || o.anchor == 's' && !sOut) {
						if (o.anchor == 'n' || o.anchor == 's') {
							anchorPos = 's';
							aTop = -8 - parseInt(tt_w.css('borderBottomWidth'));					
							mTop = top + elH + o.offset + 8;
						}
					}
					
					// position the arrow
					tt_a.css({'margin-left': aLeft + 'px', 'margin-top': aTop + 'px'}).attr('class', anchorPos);
					
					// clear delay timer if exists
					if (delay) clearTimeout(delay);
					
					// position the tooltip and show it
					delay = window.setTimeout(function(){ tt_w.css({"margin-left": mLeft+"px", "margin-top": mTop + 'px'}).stop(true,true).fadeIn(o.fadeIn); }, o.delay);
				}
		
				// hide the tooltip
				function hide() {
					console.log(el.html());
					if (!o.aHide && !tHov || o.aHide) {
						// clear delay timer if exists
						if (delay) clearTimeout(delay);
						
						// fade out the tooltip
						delay = window.setTimeout(function(){hide2()}, o.delay);
					}
				}
				
				// make a second hide function if the tooltip is set to not auto hide
				function hide2() {
					console.log('hide2');
					// if the mouse isn't on the tooltip or the anchor, hide it, otherwise loop back through
					if (!o.aHide && !tHov || o.aHide) {
						// fade out the tooltip
						tt_w.stop(true,true).fadeOut(o.fadeOut);
						
						// call the show callback function
						o.hide.call(this);
					} else
						window.setTimeout(function(){hide()}, 200);
				}
			}
		});
	}
})(jQuery);