/*!
 * miniTip v0.3
 *
 * Updated: July 20, 2011
 * Requires: jQuery v1.5+
 *
 * Copyright 2011, James Simpson
 * http://goldfirestudios.com
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Documentation found at http://goldfirestudios.com/
 *
*/

(function($){
    $.fn.miniTip = function(opts) {
        // define the default option values
        var d = {
            title:      '',         // if left blank, no title bar will show
            content:    false,      // the content of the tooltip
            delay:      300,        // how long to wait before showing and hiding the tooltip
            anchor:     'top',      // top, right, bottom, left
            fadeIn:     200,        // speed of fade in animation
            fadeOut:    200,        // speed of fade out animation
            aHide:      false,      // set to true to only hide when the mouse moves away from the anchor and tooltip
            maxW:       '250px',    // max width of tooltip
            offset:     5          // offset in pixels of stem from anchor
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
                
                // if you are using the title attribute, remove it from the anchor
                if (!o.content) {
                    el.removeAttr('title');
                }
                
                // add the hover event
                el.hover(
                    function(){
                        show();
                    },
                    function(){
                        hide();
                        /////////////
                        ///////////// ADD THE CODE THAT KEEPS IT FROM HIDING IF AHIDE IS TRUE
                        /////////////
                    }
                );
                
                // show the tooltip
                function show() {
                    // add in the content
                    tt_c.html(cont);
                    
                    // insert the title
                    tt_t.html(o.title);
                    
                    // reset arrow position
                    tt_a.removeAttr('class');
                    
                    // get position of anchor element
                    var top = parseInt(el.offset().top);
    				var left = parseInt(el.offset().left);
                    
                    // get width and height of the anchor
					var anchorW = parseInt(el.outerWidth());
					var anchorH = parseInt(el.outerHeight());
                    
                    // get width and height of the tooltip
					var tipW = tt_w.outerWidth();
					var tipH = tt_w.outerHeight();
                    
                    // calculate the difference between anchor and tooltip
					var w = Math.round((anchorW - tipW) / 2);
					var h = Math.round((anchorH - tipH) / 2);
                    
                    // calculate position for tooltip
					var mLeft = Math.round(left + w);
					var mTop = Math.round(top + anchorH + o.offset + 8);
                    
                    // position of the arrow
					var aLeft = (Math.round(tipW - 16) / 2) - parseInt(tt_w.css('borderLeftWidth'));
                    
                    // figure out if the tooltip will go off of the screen
                    var rightOut = (left + anchorW + tipW + o.offset + 8) > parseInt($(window).width());
                    var leftOut = (tipW + o.offset + 8) > left;
                    var topOut = (tipH + o.offset + 8) > top;
                    var bottomOut = (top + anchorH + tipH + o.offset + 8) > parseInt($(window).height() + $(window).scrollTop());
                    
                    // default anchor position
                    var anchorPos = o.anchor;
                    
                    // figure out where the anchor should be (left and right)
                    if (leftOut || o.anchor == 'right' && !rightOut) {
                        if (o.anchor == 'left' || o.anchor == 'right') {
                            anchorPos = 'right';
                            aTop = Math.round((tipH / 2) - 8 - parseInt(tt_w.css('borderLeftWidth')));
    					    aLeft = -12;
						    mLeft = left + anchorW + o.offset + 8;
                            mTop = Math.round((top + anchorH / 2) - (tipH / 2));
                        }
                    } else if (rightOut || o.anchor == 'left' && !leftOut) {
                        if (o.anchor == 'left' || o.anchor == 'right') {
                            anchorPos = 'left';
                            aTop = Math.round((tipH / 2) - 8 - parseInt(tt_w.css('borderLeftWidth')));
        				    aLeft = tipW - parseInt(tt_w.css('borderLeftWidth'));
						    mLeft = left - tipW - o.offset - 8;
                            mTop = Math.round((top + anchorH / 2) - (tipH / 2));
                        }
                    }
					
                    // figure out where the anchor should be (top & bottom)
                    if (bottomOut || o.anchor == 'top' && !topOut) {
                        if (o.anchor == 'top' || o.anchor == 'bottom') {
                            anchorPos = 'top';
    					    aTop = tipH - 4;
						    mTop = top - (tipH + o.offset + 8);
                        }
                    } else if (topOut || o.anchor == 'bottom' && !bottomOut) {
                        if (o.anchor == 'top' || o.anchor == 'bottom') {
                            anchorPos = 'bottom';
    					    aTop = -12;					
						    mTop = top + anchorH + o.offset + 8;
                        }
                    }
                    
                    // position the arrow
                    tt_a.css({'margin-left': aLeft + 'px', 'margin-top': aTop + 'px'}).attr('class', anchorPos);
                    
                    // position the tooltip and show it
    				tt_w.css({"margin-left": mLeft+"px", "margin-top": mTop + 'px'}).stop(true,true).fadeIn(o.fadeIn);
                    /////////////
                    ///////////// ADD THE CODE THAT FOR DELAY
                    /////////////
                }
                
                // hide the tooltip
                function hide() {
                    console.log('hide');
                }
            }				
		});
    }
})(jQuery);