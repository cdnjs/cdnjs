/*!
 * webTicker 1.3
 * Examples and documentation at: 
 * http://jonmifsud.com
 * 2011 Jonathan Mifsud
 * Version: 1.2 (26-JUNE-2011)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires:
 * jQuery v1.4.2 or later
 * 
 */
(function( $ ){

  var globalSettings = new Array();

  var methods = {
    init : function( settings ) { // THIS 
		settings = jQuery.extend({
			travelocity: 0.05,
			direction: 1,
			moving: true
		}, settings);
		globalSettings[jQuery(this).attr('id')] = settings;
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
					if (settings.direction == 1)
						$strip.animate({left: '-='+ spazio}, tempo, "linear", function(){
							$strip.children().last().after($strip.children().first());
							var first = $strip.children().first();
							var width = first.outerWidth(true);
							var defTiming = width/settings.travelocity;
						//$strip.css("left", left);
							$strip.css("left", '0');
							scrollnews(width, defTiming);
						});
					else
						$strip.animate({right: '-='+ spazio}, tempo, "linear", function(){
							$strip.children().last().after($strip.children().first());
							var first = $strip.children().first();
							var width = first.outerWidth(true);
							var defTiming = width/settings.travelocity;
							//$strip.css("left", left);
							$strip.css("right", '0');
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
					if (globalSettings[jQuery(this).attr('id')].moving){
						var offset = jQuery(this).offset();
						var first = $strip.children().first();
						var width = first.outerWidth(true);
						var residualSpace;
						if (settings.direction == 1) residualSpace = parseInt(jQuery(this).css('left').replace('px',''))+ width;
						else residualSpace = parseInt(jQuery(this).css('right').replace('px',''))+ width;
						var residualTime = residualSpace/settings.travelocity;
						scrollnews(residualSpace, residualTime);						
					}
				});			
		});
	},
    stop : function( ) { 
		if (globalSettings[jQuery(this).attr('id')].moving){
			globalSettings[jQuery(this).attr('id')].moving = false;
			return this.each(function(){
				jQuery(this).stop();
			});
		}
	},
    cont : function( ) { // GOOD 	
		if (!(globalSettings[jQuery(this).attr('id')].moving)){
			globalSettings[jQuery(this).attr('id')].moving = true;
			var settings = globalSettings[jQuery(this).attr('id')];
			return this.each(function(){
				var $strip = jQuery(this);
					function scrollnews(spazio, tempo){
							if (settings.direction == 1)
								$strip.animate({left: '-='+ spazio}, tempo, "linear", function(){
									$strip.children().last().after($strip.children().first());
									var first = $strip.children().first();
									var width = first.outerWidth(true);
									var defTiming = width/settings.travelocity;
								//$strip.css("left", left);
									$strip.css("left", '0');
									scrollnews(width, defTiming);
								});
							else
								$strip.animate({right: '-='+ spazio}, tempo, "linear", function(){
									$strip.children().last().after($strip.children().first());
									var first = $strip.children().first();
									var width = first.outerWidth(true);
									var defTiming = width/settings.travelocity;
									//$strip.css("left", left);
									$strip.css("right", '0');
									scrollnews(width, defTiming);
								});
						
					}
						var offset = jQuery(this).offset();
						var first = $strip.children().first();
						var width = first.outerWidth(true);
						var residualSpace;
						if (settings.direction == 1) residualSpace = parseInt(jQuery(this).css('left').replace('px',''))+ width;
						else residualSpace = parseInt(jQuery(this).css('right').replace('px',''))+ width;
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