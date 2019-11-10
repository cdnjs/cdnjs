/*!
 * webTicker 2.2.0
 * Examples and documentation at:
 * http://jonmifsud.com/open-source/jquery/jquery-webticker/
 * 2011 Jonathan Mifsud
 * Version: 2.2.0 (15-FEB-2016)
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

		if( s.transition === '' ){ return true; }
		while( v.length ){
			if( v.pop() + 'Transition' in s ){
				return true;
			}
		}
		return false;
	})();

	function getStripWidth($strip){
		var stripWidth=0;
		$strip.children('li').each(function(){
			stripWidth += $(this).outerWidth( true );
		});
		return stripWidth;
	}

	function getItemWidth($strip){ 
		return Math.max.apply(Math, $strip.children().map(function(){ return $(this).width(); }).get()); 
	}

	function animationSettings($strip){
		var settings = $strip.data('settings') || { direction: 'left', speed: 50 };
		var first = $strip.children().first();
		var distance =  Math.abs(-$strip.css(settings.direction).replace('px','').replace('auto','0') - first.outerWidth(true));
		var timeToComplete = distance * 1000 / settings.speed;
		var animationSettings = {};
		animationSettings[settings.direction] = $strip.css(settings.direction).replace('px','').replace('auto','0') - distance;
		return {'css':animationSettings,'time':timeToComplete};
	}

	function moveFirstElement($strip){
		var settings = $strip.data('settings') || { direction: 'left' };
		$strip.css('transition-duration','0s').css(settings.direction, '0');
		var $first = $strip.children().first();
		if ($first.hasClass('webticker-init')){
			$first.remove();
		}
		else{
			$strip.children().last().after($first);
		}

	}

	function scrollitems($strip,moveFirst){
		var settings = $strip.data('settings') || { direction: 'left' };
		if (typeof moveFirst === 'undefined'){
			moveFirst = false;
		}
		if (moveFirst){
			moveFirstElement($strip);
		}
		var options = animationSettings($strip);
		$strip.animate(options.css, options.time, 'linear', function(){
			$strip.css(settings.direction, '0');
			scrollitems($strip,true);
		});
	}

	function css3Scroll($strip,moveFirst){
		if (typeof moveFirst === 'undefined'){
			moveFirst = false;
		}
		if (moveFirst){
			moveFirstElement($strip);
		}
		var options = animationSettings($strip);
		var time = options.time/1000;
		time += 's';
		$strip.css(options.css).css('transition-duration',time);
	}

	function updaterss(rssurl,type,$strip){
		var list = [];
		$.get(rssurl, function(data) {
			var $xml = $(data);
			$xml.find('item').each(function() {
				var $this = $(this),
					item = {
						title: $this.find('title').text(),
						link: $this.find('link').text()
				};
				var listItem = '<li><a href="'+item.link+'"">'+item.title+'</a></li>';
				list += listItem;
				//Do something with item here...
			});
			$strip.webTicker('update', list, type);
		});
	}

	function initialize($strip, init){
		if ($strip.children('li').length < 1) {
			if (window.console) {
				// console.log('no items to initialize');
			}
			return false;
		}
		var settings = $strip.data('settings');
		settings.duplicateLoops = settings.duplicateLoops || 0;

		$strip.width('auto');

		//Find the real width of all li elements
		var stripWidth = 0;
		$strip.children('li').each(function(){
			stripWidth += $(this).outerWidth( true );
		});

		var height = $strip.find('li:first').height();
		var itemWidth;
		// if(stripWidth < $strip.parent().width() || $strip.children().length == 1){
		//if duplicate items
		if (settings.duplicate){
			//Check how many times to duplicate depending on width.
			itemWidth = getItemWidth($strip);
			var duplicateLoops = 0;
			while (stripWidth - itemWidth < $strip.parent().width() || $strip.children().length === 1 || duplicateLoops < settings.duplicateLoops){
				var listItems = $strip.children().clone();
				$strip.append(listItems);
				stripWidth = 0;
				stripWidth = getStripWidth($strip);
				itemWidth = getItemWidth($strip);
				duplicateLoops++;
			}
			settings.duplicateLoops = duplicateLoops;
		}else {
			//if fill with empty padding
			var emptySpace = $strip.parent().width() - stripWidth;
			emptySpace += $strip.find('li:first').width();

			// $strip.append('<li class="ticker-spacer" style="width:'+emptySpace+'px;height:'+height+'px;"></li>');
			if ($strip.find('.ticker-spacer').length > 0){
				// console.log('test');
				$strip.find('.ticker-spacer').width(emptySpace);
			}
			else{
				// console.log('test2');
				$strip.append('<li class="ticker-spacer" style="float: '+settings.direction+';width:'+emptySpace+'px;height:'+height+'px;"></li>');
			}
		// }
		}

		if (settings.startEmpty && init){
			$strip.prepend('<li class="webticker-init" style="float: '+settings.direction+';width:'+$strip.parent().width()+'px;height:'+height+'px;"></li>');
		}
		//extra width to be able to move items without any jumps	$strip.find("li:first").width()

		stripWidth = 0;
		stripWidth = getStripWidth($strip);
		$strip.width(stripWidth+200);
		var widthCompare = 0;
		widthCompare = getStripWidth($strip);
		//loop to find weather the items inside the list are actually bigger then the size of the whole list. Increments in 200px.
		//only required when a single item is bigger then the whole list
		while (widthCompare >= $strip.width()){
			$strip.width($strip.width()+200);
			widthCompare = 0;
			widthCompare = getStripWidth($strip);
		}
		return true;
	}


  var methods = {
	init : function( settings ) { // THIS
		settings = jQuery.extend({
			speed: 50, //pixels per second
			direction: 'left',
			moving: true,
			startEmpty: true,
			duplicate: false,
			rssurl: false,
			hoverpause: true,
			rssfrequency: 0,
			updatetype: 'reset',
			transition: 'linear',
			height: '30px',
			maskleft: '', // maskleft and maskright require a width setting in your css to work
			maskright: '',
			maskwidth: 0
		}, settings);
		//set data-ticker a unique ticker identifier if it does not exist
		return this.each(function(){
			jQuery(this).data('settings',settings);

				var $strip = jQuery(this);
				var $mask = $strip.wrap('<div class="mask"></div>');
				$mask.after('<span class="tickeroverlay-left">&nbsp;</span><span class="tickeroverlay-right">&nbsp;</span>');
				var $tickercontainer = $strip.parent().wrap('<div class="tickercontainer"></div>');
				var resizeEvt; 
				$(window).resize(function() {
					clearTimeout(resizeEvt);
					resizeEvt = setTimeout(function() {
							console.log('window was resized');
							initialize($strip,false);
					}, 500);
				});

				//adding required css rules
				
				$strip.children('li').css('white-space','nowrap');
				$strip.children('li').css('float',settings.direction);
				$strip.children('li').css('padding','0 7px');
				$strip.children('li').css('line-height',settings.height);

				$mask.css('position','relative');
				$mask.css('overflow','hidden');

				$strip.closest('.tickercontainer').css('height', settings.height);
				$strip.closest('.tickercontainer').css('overflow', 'hidden');

				$strip.css('float',settings.direction);
				$strip.css('position','relative');
				$strip.css('font', 'bold 10px Verdana');
				$strip.css('list-style-type', 'none');
				$strip.css('margin', '0');
				$strip.css('padding', '0');

				if ((settings.maskleft !== '') && (settings.maskright !== '')){
					var backgroundimage='url("'+settings.maskleft+'")';
					$tickercontainer.find('.tickeroverlay-left').css('background-image',backgroundimage);
					$tickercontainer.find('.tickeroverlay-left').css('display','block');
					$tickercontainer.find('.tickeroverlay-left').css('pointer-events','none');
					$tickercontainer.find('.tickeroverlay-left').css('position','absolute');
					$tickercontainer.find('.tickeroverlay-left').css('z-index','30');
					$tickercontainer.find('.tickeroverlay-left').css('height',settings.height);
					$tickercontainer.find('.tickeroverlay-left').css('width',settings.maskwidth);
					$tickercontainer.find('.tickeroverlay-left').css('top','0');
					$tickercontainer.find('.tickeroverlay-left').css('left','-2px');

					backgroundimage='url("'+settings.maskright+'")';
					$tickercontainer.find('.tickeroverlay-right').css('background-image',backgroundimage);
					$tickercontainer.find('.tickeroverlay-right').css('display','block');
					$tickercontainer.find('.tickeroverlay-right').css('pointer-events','none');
					$tickercontainer.find('.tickeroverlay-right').css('position','absolute');
					$tickercontainer.find('.tickeroverlay-right').css('z-index','30');
					$tickercontainer.find('.tickeroverlay-right').css('height',settings.height);
					$tickercontainer.find('.tickeroverlay-right').css('width',settings.maskwidth);
					$tickercontainer.find('.tickeroverlay-right').css('top','0');
					$tickercontainer.find('.tickeroverlay-right').css('right','-2px');
				}
				else{
					$tickercontainer.find('.tickeroverlay-left').css('display','none');
					$tickercontainer.find('.tickeroverlay-right').css('display','none');
				}

				//adding the 'last' class will help for future duplicate functions
				$strip.children('li').last().addClass('last'); 
				var started = initialize($strip,true);

				if (settings.rssurl){
					updaterss(settings.rssurl,settings.type,$strip);
					if (settings.rssfrequency>0){
						window.setInterval(function(){updaterss(settings.rssurl,settings.type,$strip);},settings.rssfrequency*1000*60);
					}
				}

				if (cssTransitionsSupported){
					//fix for firefox not animating default transitions
					$strip.css('transition-timing-function',settings.transition);
					$strip.css('transition-duration','0s').css(settings.direction, '0');


					if (started){
						//if list has items and set up start scrolling
						css3Scroll($strip,false);
					}
					//started or not still bind on the transition end event so it works after update
					$strip.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', function(event) {
						if (!$strip.is(event.target)) {
							return false;
						}
						css3Scroll($(this),true);
					});
				} else {
					if (started){
						//if list has items and set up start scrolling
						scrollitems($(this));
					}
				}

				if (settings.hoverpause){
					$strip.hover(function(){
						if (cssTransitionsSupported){
							var currentPosition = $(this).css(settings.direction);
							$(this).css('transition-duration','0s').css(settings.direction,currentPosition);
						} else{
							jQuery(this).stop();
						}
					},
					function(){
						if (jQuery(this).data('settings').moving){
							if (cssTransitionsSupported){
								css3Scroll($(this),false);
								// $(this).css("-webkit-animation-play-state", "running");
							} else {
								//usual continue stuff
								scrollitems($strip);
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
				} else{
					$(this).stop();
				}
			});
		}
	},
	cont : function( ) {
		var settings = $(this).data('settings');
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
	transition : function(transition){
		var $strip = $(this);
		if (cssTransitionsSupported){
			//fix for firefox not animating default transitions
			$strip.css('transition-timing-function',transition);
		}
},
	update : function( list, type, insert, remove) {
		type = type || 'reset';
		if (typeof insert === 'undefined'){
			insert = true;
		}
		if (typeof remove === 'undefined'){
			remove = false;
		}
		if( typeof list === 'string' ) {
			list = $(list);
		}
		var $strip = $(this);
		$strip.webTicker('stop');
		var settings = $(this).data('settings');

		if (type === 'reset'){
			//this does a 'restart of the ticker'
			$strip.html(list);
			initialize($strip,true);
		} else if (type === 'swap'){
			var id;
			var match;
			var $listItem;
			var stripWidth;
			if (window.console) {
				// console.log('trying to update');
			}
			if ($strip.children('li').length < 1){
				//no <li> items found. Treat as new
				$strip.html(list);
				$strip.css(settings.direction, '0');
				initialize($strip,true);
			} 
			else if (settings.duplicate === true)
			{ 
				// should the update be a 'hot-swap' or use replacement for IDs (in which case remove new ones)
				$strip.children('li').addClass('old');
				for (var i = list.length - 1; i >= 0; i--) {
					id = $(list[i]).data('update');
					match = $strip.find('[data-update="'+id+'"]');//should try find the id or data-attribute.
					if (match.length < 1){
						if (insert){
							//we need to move this item into the dom
							if ($strip.find('.ticker-spacer:first-child').length === 0 && $strip.find('.ticker-spacer').length > 0){
								$strip.children('li.ticker-spacer').before(list[i]);
							}
							else {
								//check for last class ...
								//$strip.append(list[i]));
								$listItem = $(list[i]);
								if(i===list.length-1)
								{
									$listItem.addClass('last');
								}
								$strip.find('last').after($listItem);
								$strip.find('last').removeClass('last');
							}
						}
					} else{ 
					$strip.find('[data-update="'+id+'"]').replaceWith(list[i]);
					}
				}
				$strip.children('li.webticker-init, li.ticker-spacer').removeClass('old');
				if (remove){
					$strip.children('li').remove('.old');
				}
				stripWidth = 0;
				stripWidth = getStripWidth($strip);
				$strip.width(stripWidth+200);

				//resetting $strip so that duplication works according to new width
				
				if ($strip.find('li.webticker-init').length < 1){ // checks if the strip's width is populated and handles the update accordingly
					settings.startEmpty=false;
				}
				$strip.html(list);
				//setting the css rules
				$strip.children('li').css('white-space','nowrap');
				$strip.children('li').css('float',settings.direction);
				$strip.children('li').css('padding','0 7px');
				$strip.children('li').css('line-height',settings.height);
				initialize($strip,true);
			}
			else 
			{ 
				// should the update be a 'hot-swap' or use replacement for IDs (in which case remove new ones)
				$strip.children('li').addClass('old');
				for (var x = 0 ; x < list.length; x++) {
					id = $(list[x]).data('update');
					match = $strip.find('[data-update="'+id+'"]');//should try find the id or data-attribute.
					if (match.length < 1){
						if (insert){
							//we need to move this item into the dom
							if ($strip.find('.ticker-spacer:first-child').length === 0 && $strip.find('.ticker-spacer').length > 0){
								$strip.children('li.ticker-spacer').before(list[x]);
							}
							else {
								//check for last class ...
								//$strip.append(list[i]));
								$listItem = $(list[x]);
								if(x===list.length-1)
								{
									$listItem.addClass('last');
								}
								$strip.find('.old.last').after($listItem);
								$strip.find('.old.last').removeClass('last');
							}
						}
					} else {
					$strip.find('[data-update="'+id+'"]').replaceWith(list[x]);
					}
				}
				$strip.children('li.webticker-init, li.ticker-spacer').removeClass('old');

				//setting the css rules
				$strip.children('li').css('white-space','nowrap');
				$strip.children('li').css('float',settings.direction);
				$strip.children('li').css('padding','0 7px');
				$strip.children('li').css('line-height',settings.height);

				if (remove){
					$strip.children('li').remove('.old');
				}
				stripWidth = 0;
				stripWidth = getStripWidth($strip);
				$strip.width(stripWidth+200);

			}
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
