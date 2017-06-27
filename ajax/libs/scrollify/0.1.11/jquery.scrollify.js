/*!
 * jQuery Scrollify
 * Version 0.1.11
 *
 * Requires:
 * - jQuery 1.6 or higher
 *
 * https://github.com/lukehaas/Scrollify
 *
 * Copyright 2015, Luke Haas
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
		overflow = [],
		index = 0,
		interstitialIndex = 1,
		currentHash = window.location.hash,
		hasLocation = false,
		timeoutId,
		timeoutId2,
		top = $(window).scrollTop(),
		scrollable = false,
		locked = false,
		scrolled = false,
		manualScroll,
		swipeScroll,
		util,
		disabled = false,
		scrollSamples = [],
		scrollTime = new Date().getTime(),
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
			after:function() {},
			afterResize:function() {}
		};
	function animateScroll(index,instant) {
		if(disabled===true) {
			return true;
		}
		if(names[index]) {
			settings.before(index,elements);
			interstitialIndex = 1;
			if(settings.sectionName) {
				window.location.hash = names[index];
			}
			if(instant) {
				$(settings.target).stop().scrollTop(heights[index]);
				settings.after(index,elements);
			} else {
				$(settings.target).stop().animate({
					scrollTop: heights[index]
				}, settings.scrollSpeed,settings.easing);
				
				$(settings.target).promise().done(function(){locked = false;settings.after(index,elements);});
			}

		}
	}

	function isAccelerating(samples) {

        if(samples<4) {
        	return false;
        }
        var limit = 20,sum = 0,i = samples.length-1,l;
        if(samples.length<limit*2) {
        	limit = Math.floor(samples.length/2);
        }
        l = samples.length-limit;
        for(;i>=l;i--) {
        	sum = sum+samples[i];
        }
        var average1 = sum/limit;

        sum = 0;
        i = samples.length-limit-1;
        l = samples.length-(limit*2);
        for(;i>=l;i--) {
        	sum = sum+samples[i];
        }
        var average2 = sum/limit;

        if(average1>=average2) {
        	return true;
        } else {
        	return false;
        }
	}
	$.scrollify = function(options) {
		$.easing['easeOutExpo'] = function(x, t, b, c, d) {
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		};
		

		manualScroll = {
			handleMousedown:function() {
				if(disabled===true) {
					return true;
				}
				scrollable = false;
				scrolled = false;
			},
			handleMouseup:function() {
				if(disabled===true) {
					return true;
				}
				scrollable = true;
				if(scrolled) {
					manualScroll.calculateNearest();
				}
			},
			handleScroll:function() {
				if(disabled===true) {
					return true;
				}
				if(timeoutId){
					clearTimeout(timeoutId);  
				}
				timeoutId = setTimeout(function(){
						
					scrolled = true;
					if(scrollable===false) {
						return false;
					}
					scrollable = false;
					manualScroll.calculateNearest();

				}, 200);
			},
			calculateNearest:function() {
				top = $(window).scrollTop();
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
				if(atBottom() || atTop()) {
					index = closest;
					animateScroll(closest,false);
				}
			},
			wheelHandler:function(e,delta) {
				if(disabled===true) {
					return true;
				}
				if(!overflow[index]) {
					e.preventDefault();
				}
				var currentScrollTime = new Date().getTime();
				delta = delta || -e.originalEvent.detail / 3 || e.originalEvent.wheelDelta / 120;

				
				if((currentScrollTime-scrollTime) > 1300){
					scrollSamples = [];
				}
				scrollTime = currentScrollTime;

				if(scrollSamples.length >= 35){
					scrollSamples.shift();
				}
				scrollSamples.push(Math.abs(delta*10));

				if(locked) {
					return false;
				}

				if(delta<0) {
					if(index<heights.length-1) {
						if(atBottom()) {
							if(isAccelerating(scrollSamples)) {
								e.preventDefault();
								index++;
								locked = true;
								animateScroll(index,false);
							} else {
								return false;
							}
						}
					}
				} else if(delta>0) {
					if(index>0) {
						if(atTop()) {
							if(isAccelerating(scrollSamples)) {
								e.preventDefault();
								index--;
								locked = true;
								animateScroll(index,false);
							} else {
								return false
							}
						}
					}
				}

			},
			keyHandler:function(e) {
				if(disabled===true) {
					return true;
				}
				if(e.keyCode==38) {
					if(index>0) {
						if(atTop()) {
							index--;
							animateScroll(index,false);
						}
					}
				} else if(e.keyCode==40) {
					if(index<heights.length-1) {
						if(atBottom()) {
							index++;
							animateScroll(index,false);
						}
					}
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
				$(document).bind('keydown', manualScroll.keyHandler);
			}
		};
		
		swipeScroll = {
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
				if(disabled===true) {
					return true;
				}
				var touch;
				if (typeof event !== 'undefined'){	
					if (typeof event.touches !== 'undefined') {
						touch = event.touches[0];
						switch (event.type) {
							case 'touchstart':
								swipeScroll.touches.touchstart.y = touch.pageY;
								swipeScroll.touches.touchmove.y = -1;

								swipeScroll.options.timeStamp = new Date().getTime();
								swipeScroll.touches.touchend = false;
							case 'touchmove':
								swipeScroll.touches.touchmove.y = touch.pageY;
								if(swipeScroll.touches.touchstart.y!==swipeScroll.touches.touchmove.y) {
									//if(!overflow[index]) {
										event.preventDefault();
									//}
									if((swipeScroll.options.timeStamp+swipeScroll.options.timeGap)<(new Date().getTime()) && swipeScroll.touches.touchend == false) {
										
										swipeScroll.touches.touchend = true;
										if (swipeScroll.touches.touchstart.y > -1) {

											if(Math.abs(swipeScroll.touches.touchmove.y-swipeScroll.touches.touchstart.y)>swipeScroll.options.distance) {
												if(swipeScroll.touches.touchstart.y < swipeScroll.touches.touchmove.y) {
													
													swipeScroll.up();

												} else {
													swipeScroll.down();
													
												}
											}
										}
									}
								}
								break;
							case 'touchend':
								if(swipeScroll.touches[event.type]===false) {
									swipeScroll.touches[event.type] = true;
									if (swipeScroll.touches.touchstart.y > -1 && swipeScroll.touches.touchmove.y > -1) {

										if(Math.abs(swipeScroll.touches.touchmove.y-swipeScroll.touches.touchstart.y)>swipeScroll.options.distance) {
											if(swipeScroll.touches.touchstart.y < swipeScroll.touches.touchmove.y) {
												swipeScroll.up();
												
											} else {
												swipeScroll.down();
												
											}
										}
										swipeScroll.touches.touchstart.y = -1;
									}
								}
							default:
								break;
						}
					}
				}
			},
			down: function() {
				if(index<=heights.length-1) {
					if(atBottom() && index<heights.length-1) {
						
						index++;
						animateScroll(index,false);
					} else {
						if(Math.floor(elements[index].height()/$(window).height())>interstitialIndex) {

							interstitialScroll(parseInt(heights[index])+($(window).height()*interstitialIndex));
							interstitialIndex += 1;

						} else {
							interstitialScroll(parseInt(heights[index])+(elements[index].height()-$(window).height()));
						}
						
					}
				}
			},
			up: function() {
				if(index>=0) {
					if(atTop() && index>0) {
						
						index--;
						animateScroll(index,false);
					} else {
						
						if(interstitialIndex>2) {

							interstitialIndex -= 1;
							interstitialScroll(parseInt(heights[index])+($(window).height()*interstitialIndex));
							
						} else {

							interstitialIndex = 1;
							interstitialScroll(parseInt(heights[index]));
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


		util = {
			handleResize:function() {
				clearTimeout(timeoutId2);
				timeoutId2 = setTimeout(function() {
					sizePanels();
					calculatePositions(true);
					settings.afterResize();
				},50);
			}
		};

		settings = $.extend(settings, options);
		
		sizePanels();

		calculatePositions(false);


		if(hasLocation===false && settings.sectionName) {
			window.location.hash = names[0];
		} else {
			animateScroll(index,false);
		}
		
		manualScroll.init();
		swipeScroll.init();

		$(window).bind("resize",util.handleResize);
		window.addEventListener("orientationchange", util.handleResize, false);

		function interstitialScroll(pos) {
			$(settings.target).stop().animate({
				scrollTop: pos
			}, settings.scrollSpeed,settings.easing);
		}

		function sizePanels() {
			$(settings.section).each(function(i) {
				if($(this).css("height","auto").outerHeight()<$(window).height()) {
					$(this).css({"height":$(window).height()});
					overflow[i] = false;
				} else {
					$(this).css({"height":$(this).height()});
					overflow[i] = true;
				}
			});
		}
		function calculatePositions(resize) {
			$(settings.section).each(function(i){
				if(i>0) {
					heights[i] = parseInt($(this).offset().top) + settings.offset;
				} else {
					heights[i] = parseInt($(this).offset().top);
				}
				if(settings.sectionName && $(this).data(settings.sectionName)) {
					names[i] = "#" + $(this).data(settings.sectionName).replace(/ /g,"-");
				} else {
					names[i] = "#" + (i + 1);
				}
				
				
				elements[i] = $(this);

				if(window.location.hash===names[i]) {
					index = i;
					hasLocation = true;
					
				}
			});
			

			if(true===resize) {
				animateScroll(index,false);
			}
		}

		function atTop() {
			top = $(window).scrollTop();
			if(top>parseInt(heights[index])) {
				return false;
			} else {
				return true;
			}
		}
		function atBottom() {
			top = $(window).scrollTop();
			if(top<parseInt(heights[index])+(elements[index].height()-$(window).height())) {
				return false;
			} else {
				return true;
			}
		}
	}

	function move(panel,instant) {
		var z = names.length;
		for(;z>=0;z--) {
			if(typeof panel === 'string') {
				if (names[z]===panel) {
					index = z;
					animateScroll(z,instant);
				}
			} else {
				if(z===panel) {
					index = z;
					animateScroll(z,instant);
				}
			}
		}
	}
	$.scrollify.move = function(panel) {
		if(panel===undefined) {
			return false;
		}
		move(panel,false);
	};
	$.scrollify.instantMove = function(panel) {
		if(panel===undefined) {
			return false;
		}
		move(panel,true);
	};
	$.scrollify.next = function() {
		if(index<names.length) {
			index += 1;
			animateScroll(index,false);
		}
	};
	$.scrollify.previous = function() {
		if(index>0) {
			index -= 1;
			animateScroll(index,false);
		}
	};
	$.scrollify.instantNext = function() {
		if(index<names.length) {
			index += 1;
			animateScroll(index,true);
		}
	};
	$.scrollify.instantPrevious = function() {
		if(index>0) {
			index -= 1;
			animateScroll(index,true);
		}
	};
	$.scrollify.destroy = function() {
		$(settings.section).each(function() {
			$(this).css("height","auto");
		});
		$(window).unbind("resize",util.handleResize);
		if(settings.scrollbars) {
			$(window).unbind('mousedown', manualScroll.handleMousedown);
			$(window).unbind('mouseup', manualScroll.handleMouseup);
			$(window).unbind('scroll', manualScroll.handleScroll);
		}
		$(document).unbind('DOMMouseScroll mousewheel',manualScroll.wheelHandler);
		$(document).unbind('keydown', manualScroll.keyHandler);

		if (document.addEventListener) {
			document.removeEventListener('touchstart', swipeScroll.touchHandler, false);	
			document.removeEventListener('touchmove', swipeScroll.touchHandler, false);	
			document.removeEventListener('touchend', swipeScroll.touchHandler, false);
		}
		heights = [];
		names = [];
		elements = [];
		overflow = [];
	};
	$.scrollify.update = function() {
		util.handleResize();
	};
	$.scrollify.current = function() {
		return elements[index];
	};
	$.scrollify.disable = function() {
		disabled = true;
	};
	$.scrollify.enable = function() {
		disabled = false;
	};
	$.scrollify.isDisabled = function() {
		return disabled;
	};
}(jQuery,this,document));