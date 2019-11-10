/*!
 * miniTip v0.1
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
			var tt_w = $('<div id="miniTip" style="max-width:'+o.maxW+';"><div id="miniTip_t"></div><div id="miniTip_c"></div><div id="miniTip_a"></div></div>');
			$('body').append(tt_w);
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
                    var top = parseInt(el.offset()['top']);
    				var left = parseInt(el.offset()['left']);
                    
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
					var mTop = Math.round(top + anchorH + o.offset);
                    
                    // position of the arrow
					var aLeft = (Math.round(tipW - 16) / 2) - parseInt(tt_w.css('borderLeftWidth'));
                    
                    // figure out if the tooltip will go off of the screen
                    var rightOut = (w + left) < parseInt($(window).scrollLeft());
    				var leftOut = (tipW + left) > parseInt($(window).width());
                    var topOut = (top + anchorH + o.offset + tipH + 8) > parseInt($(window).height() + $(window).scrollTop());
        			var bottomOut = ((top + anchorH) - (o.offset + tipH + 8)) < 0;
                    
                    // default anchor position
                    var anchorPos = o.anchor;
                    
                    // figure out where the anchor should be (left and right)
                    if ((rightOut && w < 0) || (o.anchor == 'right' && !leftOut) || (o.anchor == 'left' && left < (tipW + o.offset + 5))) {
    					anchorPos = 'right';
						aTop = Math.round(tipH - 13) / 2;
						aLeft = -12;
						mLeft = Math.round(left + anchorW + o.offset);
						mTop = Math.round(top + h);
					} else if ((leftOut && w < 0) || (o.anchor == 'left' && !rightOut)) {
						anchorPos = 'left';
						aTop = Math.round(tipH - 13) / 2;
						aLeft =  Math.round(tipW);
						mLeft = Math.round(left - (tipW + o.offset + 5));
						mTop = Math.round(top + h);
					}
					
                    // figure out where the anchor should be (top & bottom)
					if (topOut || (o.anchor == 'bottom' && topOut) || (o.anchor == 'top' && !bottomOut)) {
						if (o.anchor == 'top' || o.anchor == 'bottom') anchorPos = 'top';
						aTop = tipH;
						mTop = Math.round(top - (tipH + o.offset + 5));
					} else if (bottomOut | (o.anchor == 'top' && bottomOut) || (o.anchor == 'bottom' && !topOut)) {
                        if (o.anchor == 'top' || o.anchor == 'bottom') anchorPos = 'bottom';
						aTop = -12;					
						mTop = Math.round(top + anchorH + o.offset);
					}
                    
                    console.log(aTop, aLeft);
                    
                    // position the arrow
                    tt_a.css({'margin-left': aLeft + 'px', 'margin-top': aTop + 'px'}).attr('class', anchorPos);
                    
                    // position the tooltip and show it
    				tt_w.css({"margin-left": mLeft+"px", "margin-top": mTop + 'px'}).stop(true,true).fadeIn(o.fadeIn);
                }
                
                // hide the tooltip
                function hide() {
                    console.log('hide');
                }
            }				
		});
    }
})(jQuery);