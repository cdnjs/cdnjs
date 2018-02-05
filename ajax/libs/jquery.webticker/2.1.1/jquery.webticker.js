/*!
 * webTicker 2.1.1
 * Examples and documentation at: 
 * http://jonmifsud.com/open-source/jquery/jquery-webticker/
 * 2011 Jonathan Mifsud
 * Version: 2.1.1 (23-MAY-2013)
 * Dual licensed under the Creative Commons and DonationWare licenses:
 * http://creativecommons.org/licenses/by-nc/3.0/
 * https://github.com/jonmifsud/Web-Ticker/blob/master/licence.md
 * Requires:
 * jQuery v1.4.2 or later
 * 
 */
(function( $ ){

	var cssTransitionsSupported = (function() {
	    var s = document.createElement('p').style, 
	        v = ['ms','O','Moz','Webkit']; 

	    if( s['transition'] == '' ) return true; 
	    while( v.length ) 
	        if( v.pop() + 'Transition' in s )
	            return true;
	    return false;
	})();

	function scrollitems($strip,moveFirst){
		var settings = $strip.data('settings');
		if (typeof moveFirst === 'undefined')
			moveFirst = false;
		if (moveFirst){
			moveFirstElement($strip);
		}
		var options = animationSettings($strip);
		$strip.animate(options.css, options.time, "linear", function(){
			$strip.css(settings.direction, '0');
			scrollitems($strip,true);
		});
	}

	function animationSettings($strip){
		var settings = $strip.data('settings');
		var first = $strip.children().first();
		var distance =  Math.abs(-$strip.css(settings.direction).replace('px','').replace('auto','0') - first.outerWidth(true));
		var settings = $strip.data('settings');
		var timeToComplete = distance * 1000 / settings.speed;
		var animationSettings = {};
		animationSettings[settings.direction] = $strip.css(settings.direction).replace('px','').replace('auto','0') - distance;
		return {'css':animationSettings,'time':timeToComplete};
	}

	function moveFirstElement($strip){
		var settings = $strip.data('settings');
		$strip.css('transition-duration','0s').css(settings.direction, '0');
		var $first = $strip.children().first();
		if ($first.hasClass('webticker-init'))
			$first.remove();
		else 
			$strip.children().last().after($first);
	}

	function css3Scroll($strip,moveFirst){
		if (typeof moveFirst === 'undefined')
			moveFirst = false;
		if (moveFirst){
			moveFirstElement($strip);
		}
		var options = animationSettings($strip);
		var time = options.time/1000;
		time += 's'; 
		$strip.css(options.css).css('transition-duration',time);
	}

	function updaterss(rssurl,type,$strip){
		var list;
		$.get(rssurl, function(data) {
		    var $xml = $(data);
		    $xml.find("item").each(function() {
		        var $this = $(this),
		            item = {
		                title: $this.find("title").text(),
		                link: $this.find("link").text()
		        }
		        listItem = "<li><a href='"+item.link+"'>"+item.title+"</a></li>";
		        list += listItem;
		        //Do something with item here...
		    });
			$strip.webTicker('update', list, type);
		});
	}

	function initalize($strip){
		var settings = $strip.data('settings');
		
		$strip.width('auto');
		
		//Find the real width of all li elements
		var stripWidth = 0;
		$strip.children('li').each(function(){
			stripWidth += $(this).outerWidth( true );
		}); 
		
		if(stripWidth < $strip.parent().width() || $strip.children().length == 1){
			//if duplicate items
			if (settings.duplicate){
				//Check how many times to duplicate depending on width.
				itemWidth = Math.max.apply(Math, $strip.children().map(function(){ return $(this).width(); }).get());
				while (stripWidth - itemWidth < $strip.parent().width() || $strip.children().length == 1){
					var listItems = $strip.children().clone();
					$strip.append(listItems);
					stripWidth = 0;
					$strip.children('li').each(function(){
						stripWidth += $(this).outerWidth( true );
					});
					itemWidth = Math.max.apply(Math, $strip.children().map(function(){ return $(this).width(); }).get());
				}
			}else {
				//if fill with empty padding
				var emptySpace = $strip.parent().width() - stripWidth;
				emptySpace += $strip.find("li:first").width();
				var height = $strip.find("li:first").height();

				$strip.append('<li class="ticker-spacer" style="width:'+emptySpace+'px;height:'+height+'px;"></li>');
			}
		}
		if (settings.startEmpty){
			var height = $strip.find("li:first").height();
			$strip.prepend('<li class="webticker-init" style="width:'+$strip.parent().width()+'px;height:'+height+'px;"></li>');
		}
		//extra width to be able to move items without any jumps	$strip.find("li:first").width()	

		stripWidth = 0;
		$strip.children('li').each(function(){
			stripWidth += $(this).outerWidth( true );
		});	
		$strip.width(stripWidth+200);
		widthCompare = 0;
		$strip.children('li').each(function(){
			widthCompare += $(this).outerWidth( true );
		});	
		//loop to find weather the items inside the list are actually bigger then the size of the whole list. Increments in 200px.
		//only required when a single item is bigger then the whole list
		while (widthCompare >= $strip.width()){
			$strip.width($strip.width()+200);
			widthCompare = 0;
			$strip.children('li').each(function(){
				widthCompare += $(this).outerWidth( true );
			});	
		}
	}

  var methods = {
    init : function( settings ) { // THIS 
		settings = jQuery.extend({
			speed: 50, //pixels per second
			direction: "left",
			moving: true,
			startEmpty: true,
			duplicate: false,
			rssurl: false,
			hoverpause: true,
			rssfrequency: 0,
			updatetype: "reset"
		}, settings);
		//set data-ticker a unique ticker identifier if it does not exist
		return this.each(function(){
			jQuery(this).data('settings',settings);

				var $strip = jQuery(this);
				$strip.addClass("newsticker");
				var $mask = $strip.wrap("<div class='mask'></div>");
				$mask.after("<span class='tickeroverlay-left'>&nbsp;</span><span class='tickeroverlay-right'>&nbsp;</span>")
				var $tickercontainer = $strip.parent().wrap("<div class='tickercontainer'></div>");	
				
				initalize($strip);
				
				if (settings.rssurl){
					updaterss(settings.rssurl,settings.type,$strip);
					if (settings.rssfrequency>0){
						window.setInterval(function(){updaterss(settings.rssurl,settings.type,$strip);},settings.rssfrequency*1000*60);
					}
				}

				if (cssTransitionsSupported){
					//fix for firefox not animating default transitions
					$strip.css('transition-duration','0s').css(settings.direction, '0');
					css3Scroll($strip,false);
					$strip.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', function(event) {
						if (!$strip.is(event.target)) {
							return false;
						}
						css3Scroll($(this),true);
					});
				} else {
					scrollitems($(this));
				}

				if (settings.hoverpause){
					$strip.hover(function(){
						if (cssTransitionsSupported){
							var currentPosition = $(this).css(settings.direction);
							$(this).css('transition-duration','0s').css(settings.direction,currentPosition);
						} else 
							jQuery(this).stop();
					},
					function(){
						if (jQuery(this).data('settings').moving){
							if (cssTransitionsSupported){
								css3Scroll($(this),false);
								// $(this).css("-webkit-animation-play-state", "running");
							} else {
								//usual continue stuff
								scrollitems($strip)
							}
						}
					});	
				}
		});
	},
    stop : function( ) { 
    	var settings = $(this).data('settings');
		if (settings.moving){
			settings.moving = false;
			return this.each(function(){
				if (cssTransitionsSupported){
					var currentPosition = $(this).css(settings.direction);
					$(this).css('transition-duration','0s').css(settings.direction,currentPosition);
				} else 
					$(this).stop();
			});
		}
	},
    cont : function( ) {
    	var settings = $(this).data('settings')
		if (!settings.moving){
			settings.moving = true;
			return this.each(function(){
				if (cssTransitionsSupported){
					css3Scroll($(this),false);
				} else {
					scrollitems($(this));
				}
			});	
		}
	},
	update : function( list, type, insert, remove) { 
		type = type || "reset";
		if (typeof insert === 'undefined')
			insert = true;
		if (typeof remove === 'undefined')
			remove = false;
		if( typeof list === 'string' ) {
		    list = $(list);
		}
		var $strip = $(this);
		$strip.webTicker('stop');
		var settings = $(this).data('settings');
		if (type == 'reset'){
			//this does a 'restart of the ticker'
			$strip.html(list);
			$strip.css(settings.direction, '0');
			initalize($strip);
		} else if (type == 'swap'){
			// should the update be a 'hot-swap' or use replacement for IDs (in which case remove new ones)
			$strip.children('li').addClass('old');
			for (var i = 0; i < list.length; i++) {
				id = $(list[i]).data('update');
				match = $strip.find('[data-update="'+id+'"]');//should try find the id or data-attribute.
				if (match.length < 1){
					if (insert){
						//we need to move this item into the dom
						if ($strip.find('.ticker-spacer:first-child').length == 0 && $strip.find('.ticker-spacer').length > 0){
							$strip.children('li.ticker-spacer').before(list[i]);
						}
						else {
							$strip.append(list[i]);
						}
					}
				} else $strip.find('[data-update="'+id+'"]').replaceWith(list[i]);;
			};
			$strip.children('li.webticker-init, li.ticker-spacer').removeClass('old');
			if (remove)
				$strip.children('li').remove('.old');
			stripWidth = 0;
			$strip.children('li').each(function(){
				stripWidth += $(this).outerWidth( true );
			});	
			$strip.width(stripWidth+200);
		}
		
		$strip.webTicker('cont');
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