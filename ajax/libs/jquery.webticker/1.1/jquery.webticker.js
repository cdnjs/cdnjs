/*!
 * webTicker 1.1
 * Examples and documentation at: 
 * http://jonmifsud.com
 * 2011 Jonathan Mifsud
 * Version: 1.1.0 (19-JUNE-2011)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires:
 * jQuery v1.4.2 or later
 * 
 */
(function( $ ){

  var globalSettings;
  var moving;

  var methods = {
    init : function( settings ) { // THIS 
		settings = jQuery.extend({
			travelocity: 0.05
		}, settings);
		globalSettings = settings;
		moving = true;
		return this.each(function(){
				var $strip = jQuery(this);
				$strip.addClass("newsticker")
				var stripWidth = 0;
				var $mask = $strip.wrap("<div class='mask'></div>");
				$mask.after("<span class='tickeroverlay-left'>&nbsp;</span><span class='tickeroverlay-right'>&nbsp;</span>")
				var $tickercontainer = $strip.parent().wrap("<div class='tickercontainer'></div>");	
				$strip.find("li").each(function(i){
					stripWidth += jQuery(this, i).outerWidth(true);
				});
				$strip.width(stripWidth+200);//20 used for ie9 fix					
				function scrollnews(spazio, tempo){
					$strip.animate({left: '-='+ spazio}, tempo, "linear", function(){
						$strip.children().last().after($strip.children().first());
						var first = $strip.children().first();
						var width = first.outerWidth(true);
						var defTiming = width/settings.travelocity;
						var tmpleft = $strip.css("left");
						var outWidth = $strip.children().last().outerWidth(true);
						var left = parseInt(tmpleft.replace('px','')) + outWidth;
						$strip.css("left", left);
						scrollnews(width, defTiming);
					});
				}
				
				var first = $strip.children().first();
				var travel = first.outerWidth(true);
				var timing = travel/settings.travelocity;
				scrollnews(travel, timing);				
				$strip.hover(function(){
					jQuery(this).stop();
				},
				function(){
					if (moving){
						var offset = jQuery(this).offset();
						var first = $strip.children().first();
						var width = first.outerWidth(true);
						var residualSpace = offset.left + width;
						var residualTime = residualSpace/settings.travelocity;
						scrollnews(residualSpace, residualTime);
					}
				});			
		});
	},
    stop : function( ) { 
		if (moving){
			moving = false;
			return this.each(function(){
				jQuery(this).stop();
			});
		}
	},
    cont : function( ) { // GOOD 	
		if (!(moving)){
			moving = true;
			var settings = globalSettings;
			return this.each(function(){
				var $strip = jQuery(this);
					function scrollnews(spazio, tempo){
						$strip.animate({left: '-='+ spazio}, tempo, "linear", function(){
							$strip.children().last().after($strip.children().first());
							var first = $strip.children().first();
							var width = first.outerWidth(true);
							var defTiming = width/settings.travelocity;
							var tmpleft = $strip.css("left");
							var outWidth = $strip.children().last().outerWidth(true);
							var left = parseInt(tmpleft.replace('px','')) + outWidth;
							$strip.css("left", left);
							scrollnews(width, defTiming);
						});
					}
						var offset = jQuery(this).offset();
						var first = $strip.children().first();
						var width = first.outerWidth(true);
						var residualSpace = offset.left + width;
						var residualTime = residualSpace/settings.travelocity;
						scrollnews(residualSpace, residualTime);	
							
			});	
		}
	}
  };

  $.fn.webTicker = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.webTicker' );
    }    
  
  };

})( jQuery );