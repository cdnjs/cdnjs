/*!
 * jQuery scrollify
 * Version 0.1.3
 *
 * Requires:
 * - jQuery 1.6 or higher
 *
 * https://github.com/lukehaas/Scrollify
 *
 * Copyright 2014, Luke Haas
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function ($,window,document,undefined) {
	"use strict";
	var heights = [],
		names = [],
		elements = [],
		index = 0,
		currentHash = window.location.hash,
		hasLocation = false,
		timeoutId,
		top = $(window).scrollTop(),
		scrollable = false,
		settings = {
			//section should be an identifier that is the same for each section
			section: "section",
			sectionName: "section-name",
			easing: "easeOutExpo",
			scrollSpeed: 1100,
			offset : 0,
			scrollbars: true,
			axis:"y",
			target:"html,body",
			before:function() {},
			after:function() {}
		};
    	$.scrollify = function(options) {
			
			function animateScroll(index) {
				
				if(names[index]) {
					settings.before(index,elements);
					if(settings.sectionName) {
						window.location.hash = names[index];
					}
					
					$(settings.target).stop().animate({
						scrollTop: heights[index]
					}, settings.scrollSpeed,settings.easing);
					
					$(settings.target).promise().done(function(){settings.after(index,elements);});
				}
			}
			var manualScroll = {
				handleMousedown:function() {
					scrollable = false;
				},
				handleMouseup:function() {
					scrollable = true;
				},
				handleScroll:function() {
					
					if(timeoutId){
						clearTimeout(timeoutId);  
					}
					timeoutId = setTimeout(function(){
							top = $(window).scrollTop();
							if(scrollable==false) {
								return false;
							}
							scrollable = false;
							
							var i =1,
								max = heights.length,
								closest = 0,
								prev = Math.abs(heights[0] - top),
								diff;
							for(;i<max;i++) {
								diff = Math.abs(heights[i] - top);
								
								if(diff < prev) {
									prev = diff;
									closest = i;
								}
							}
							index = closest;
							animateScroll(closest);
					}, 200);
				},
				wheelHandler:function(e,delta) {
					
					e.preventDefault();
					
					delta = delta || -e.originalEvent.detail / 3 || e.originalEvent.wheelDelta / 120;

					if(timeoutId){
						clearTimeout(timeoutId);  
					}
					timeoutId = setTimeout(function(){
						
						//if(!(index==heights.length-1 && ((index-delta) % (heights.length)==0))) {
							//index = (index-delta) % (heights.length);
						//}
						
						if(delta<0) {
							if(index<heights.length-1) {
								index++;
							}
						} else if(delta>0) {
							if(index>0) {
								index--;
							}
						}

						if(index>=0) {
							animateScroll(index);
						} else {
							index = 0;
						}
					},25);
				},
				keyHandler:function(e) {
					e.preventDefault();
					if(e.keyCode==38) {
						if(index>0) {
							index--;
						}
						animateScroll(index);
					} else if(e.keyCode==40) {
						if(index<heights.length-1) {
							index++;
						}
						animateScroll(index);
					}
				},
				init:function() {
					if(settings.scrollbars) {
						$(window).bind('mousedown', manualScroll.handleMousedown);
						$(window).bind('mouseup', manualScroll.handleMouseup);
						$(window).bind('scroll', manualScroll.handleScroll);
					} else {
						$("body").css({"overflow":"hidden"});
					}
					
					$(document).bind('DOMMouseScroll mousewheel',manualScroll.wheelHandler);
					$(document).bind('keyup', manualScroll.keyHandler);
				}
			};
		
			var swipeScroll = {
				touches : {
					"touchstart": {"y":-1}, 
					"touchmove" : {"y":-1},
					"touchend"  : false,
					"direction" : "undetermined"
				},
				options:{
					"distance" : 30,
					"timeGap" : 800,
					"timeStamp" : new Date().getTime()
				},
				touchHandler: function(event) {
					var touch;
					if (typeof event !== 'undefined'){	
						event.preventDefault();
						if (typeof event.touches !== 'undefined') {
							touch = event.touches[0];
							switch (event.type) {
								case 'touchstart':
									swipeScroll.options.timeStamp = new Date().getTime();
									swipeScroll.touches.touchend = false;
								case 'touchmove':
									swipeScroll.touches[event.type].y = touch.pageY;
									if((swipeScroll.options.timeStamp+swipeScroll.options.timeGap)<(new Date().getTime()) && swipeScroll.touches.touchend == false) {
										swipeScroll.touches.touchend = true;
										if (swipeScroll.touches.touchstart.y > -1) {

											if(Math.abs(swipeScroll.touches.touchmove.y-swipeScroll.touches.touchstart.y)>swipeScroll.options.distance) {
											
												if(swipeScroll.touches.touchstart.y < swipeScroll.touches.touchmove.y) {
													if(index>0) {
														index--;
													}
													animateScroll(index);
												} else {
													if(index<heights.length-1) {
														index++;
													}
													animateScroll(index);
												}
											}
										}
									}
									break;
								case 'touchend':
									if(swipeScroll.touches[event.type]==false) {
										swipeScroll.touches[event.type] = true;
										if (swipeScroll.touches.touchstart.y > -1) {

											if(Math.abs(swipeScroll.touches.touchmove.y-swipeScroll.touches.touchstart.y)>swipeScroll.options.distance) {
											
												if(swipeScroll.touches.touchstart.y < swipeScroll.touches.touchmove.y) {
													if(index>0) {
														index--;
													}
													animateScroll(index);
												} else {
													if(index<heights.length-1) {
														index++;
													}
													animateScroll(index);
												}
											}
											
										}
									}
								default:
									break;
							}
						}
					}
				},
				init: function() {
					if (document.addEventListener) {
						document.addEventListener('touchstart', swipeScroll.touchHandler, false);	
						document.addEventListener('touchmove', swipeScroll.touchHandler, false);	
						document.addEventListener('touchend', swipeScroll.touchHandler, false);
					}
				}
			};
			if(typeof options === 'string') {
				var z = names.length;
				for(;z>=0;z--) {
					if(typeof arguments[1] === 'string') {
						if (names[z]==arguments[1]) {
							index = z;
							animateScroll(z);
						}
					} else {
						if(z==arguments[1]) {
							index = z;
							animateScroll(z);
						}
					}


				}
			} else {
				settings = $.extend(settings, options);
				
				$(settings.section).each(function(i){
					if(i>0) {
						heights[i] = $(this).offset().top + settings.offset;
					} else {
						heights[i] = $(this).offset().top;
					}
					if(settings.sectionName && $(this).data(settings.sectionName)) {
						names[i] = "#" + $(this).data(settings.sectionName).replace(/ /g,"-");
					} else {
						names[i] = "#" + (i + 1);
					}
					
					
					elements[i] = $(this);

					if(currentHash==names[i]) {
						index = i;
						hasLocation = true;
						
					}
				});

				
				if(hasLocation==false && settings.sectionName) {
					window.location.hash = names[0];
				} else {
					animateScroll(index);
				}
				
				manualScroll.init();
				swipeScroll.init();
			}
	};

}(jQuery,this,document));