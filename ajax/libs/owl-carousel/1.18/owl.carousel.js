/*
 *	jQuery OwlCarousel v1.18
 *  
 *	Copyright (c) 2013 Bartosz Wojciechowski
 *	http://www.owlgraphic.com/owlcarousel
 *
 *	Licensed under MIT
 *
 */


// Object.create function
if ( typeof Object.create !== 'function' ) {
    Object.create = function( obj ) {
        function F() {};
        F.prototype = obj;
        return new F();
    };
}
(function( $, window, document, undefined ) {
	
	var Carousel = {
		init :function(options, el){
			var base = this;
            base.options = $.extend({}, $.fn.owlCarousel.options, options);
            var elem = el;
            var $elem = $(el);
            base.$elem = $elem;
            base.logIn();
        },

        logIn : function(){
        	var base = this;

            base.baseClass();

            //Hide and get Heights
            base.$elem
            .css({opacity: 0})

            base.checkTouch();
            base.support3d();

            base.wrapperWidth = 0;
            base.currentSlide = 0; //Starting Position

            base.userItems = base.$elem.children();
            base.itemsAmount = base.userItems.length;
            base.wrapItems();

            base.owlItems = base.$elem.find(".owl-item");
            base.owlWrapper = base.$elem.find(".owl-wrapper");

            base.orignalItems = base.options.items;
            base.playDirection = "next";

            base.checkVisible;

            //setTimeout(function(){
	        base.onStartup();
	        //},0);
			base.customEvents();
	        
		},
		
		onStartup : function(){
			var base = this;

			base.updateItems();
			base.calculateAll();
    		base.buildControlls();
    		base.response();
    		base.moveEvents();
    		base.stopOnHover();
    		if(base.options.autoPlay === true){
				base.options.autoPlay = 5000;
			}
    		base.play();
			base.$elem.find(".owl-wrapper").css('display','block')

			if(!base.$elem.is(':visible')){
				base.watchVisibility();
			} else {
				setTimeout(function(){
					base.calculateAll();
					base.$elem.animate({opacity: 1},200);
				},10);
			}
    		base.onstartup = false;
		},

		updateVars : function(){
			var base = this;
			base.watchVisibility();
			base.updateItems();
        	base.calculateAll();
			base.updatePosition();
			base.updatePagination();
			base.checkNavigation();
		},

		reload : function(elements){
			var base = this;
			setTimeout(function(){
				base.updateVars();
			},0)
		},

		watchVisibility : function(){
			var base = this;
			clearInterval(base.checkVisible);
			if(!base.$elem.is(':visible')){
				base.$elem.css({opacity: 0});
				//stop autoplay if not visible
				clearInterval(base.autplaySpeed);
			} else {
				return false;
			}
			base.checkVisible = setInterval(function(){
		        if (base.$elem.is(':visible')) {
		            base.reload();
		            base.$elem.animate({opacity: 1},200);
		            clearInterval(base.checkVisible);
		        }
		    }, 500);

		},

		wrapItems : function(){
			var base = this;
			base.userItems.wrapAll("<div class=\"owl-wrapper\">").wrap("<div class=\"owl-item\"></div>");
			base.$elem.find(".owl-wrapper").wrap("<div class=\"owl-wrapper-outer\">");
			base.$elem.css("display","block");
			
		},

		baseClass : function(){
			var base = this;
			var hasBaseClass = base.$elem.hasClass(base.options.baseClass);
			var hasThemeClass = base.$elem.hasClass(base.options.theme);

			if(!hasBaseClass){
				base.$elem.addClass(base.options.baseClass);
			}

			if(!hasThemeClass){
				base.$elem.addClass(base.options.theme);
			}
		},

		updateItems : function(){
			var base = this;

			if(base.options.responsive === false){
				return false;
			}

			var width = $(window).width();

			if(width > (base.options.itemsDesktop[0] || base.orignalItems) ){
				 base.options.items = base.orignalItems
			} 

			if(width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false){
				base.options.items = base.options.itemsDesktop[1];
			}  

			if(width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false){
				base.options.items = base.options.itemsDesktopSmall[1];
			}  

			if(width <= base.options.itemsTablet[0]  && base.options.itemsTablet !== false){
				base.options.items = base.options.itemsTablet[1];
			} 

			if(width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false){
				base.options.items = base.options.itemsMobile[1];
			}
			
		},
		

		response : function(){
			var base = this,
				smallDelay;
			if(base.options.responsive !== true){
				return false
			}

			$(window).resize(function(){
				if(base.options.autoPlay !== false){
					clearInterval(base.autplaySpeed);
				}
				clearTimeout(smallDelay)
				smallDelay = setTimeout(function(){
					base.updateVars();
				},200);
			})
		},

		updatePosition : function(){
			var base = this;

			if(base.support3d === true){
				if(base.positionsInArray[base.currentSlide] > base.maximumPixels){
					base.transition3d(base.positionsInArray[base.currentSlide]);
				} else {
					base.transition3d(0);
					base.currentSlide = 0 //in array
				}
			} else{
				if(base.positionsInArray[base.currentSlide] > base.maximumPixels){
					base.css2slide(base.positionsInArray[base.currentSlide]);
				} else {
					base.css2slide(0);
					base.currentSlide = 0 //in array
				}
			}
			if(base.options.autoPlay !== false){
				base.checkAp();
			}
		},

		appendItemsSizes : function(){
			var base = this;

			var roundPages = 0;
			var lastItem = base.itemsAmount - base.options.items

			base.owlItems.each(function(index){
				$(this)
				.css({"width": base.itemWidth})
				.data("owl-item",Number(index));

				if(index % base.options.items === 0 || index === lastItem){
					if(!(index > lastItem)){
						roundPages +=1;
					}
				}
				$(this).data("owl-roundPages",roundPages);
			});
		},

		appendWrapperSizes : function(){
			var base = this;
			var width = 0;

			var width = base.owlItems.length * base.itemWidth;

			base.owlWrapper.css({
				"width": width*2,
				"left": 0
			});
			base.appendItemsSizes();
		},

		calculateAll : function(){
			var base = this;
			base.calculateWidth();
			base.appendWrapperSizes();
			base.loops();
			base.max();
		},

		calculateWidth : function(){
			var base = this;
			base.itemWidth = Math.round(base.$elem.width()/base.options.items)
		},

		max : function(){
			var base = this;
			base.maximumSlide = base.itemsAmount - base.options.items;
			var maximum = (base.itemsAmount * base.itemWidth) - base.options.items * base.itemWidth;
				maximum = maximum * -1
			base.maximumPixels = maximum;
			return maximum;
		},

		min : function(){
			return 0;
		},

		loops : function(){
			var base = this;

			base.positionsInArray = [0];
			var elWidth = 0;

			for(var i = 0; i<base.itemsAmount; i++){
				elWidth += base.itemWidth;
				base.positionsInArray.push(-elWidth)
			}
		},

		buildControlls : function(){
			var base = this;

			if(base.options.navigation === true || base.options.pagination === true){
				base.owlControlls = $("<div class=\"owl-controlls\"/>").appendTo(base.$elem)
			}
			if (base.isTouch === false){
				base.owlControlls.addClass("clickable")
			}

			if(base.options.pagination === true){
				base.buildPagination();
			}
			if(base.options.navigation === true){
				base.buildButtons();
			}
	
		},

		buildButtons : function(){
			var base = this;
			var buttonsWrapper = $("<div class=\"owl-buttons\"/>")
			base.owlControlls.append(buttonsWrapper)

			base.buttonPrev = $("<div/>",{
				"class" : "owl-prev",
				"text" : base.options.navigationText[0] || ""
				});

			base.buttonNext = $("<div/>",{
				"class" : "owl-next",
				"text" : base.options.navigationText[1] || ""
				});

			buttonsWrapper
			.append(base.buttonPrev)
			.append(base.buttonNext);

			buttonsWrapper.on( base.getEvent() , "div[class^=\"owl\"]", function(event){
				event.preventDefault();
				if($(this).hasClass('owl-next')){
					base.next();
				} else{
					base.prev();
				} 
			})

			//Add 'disable' class
			base.checkNavigation();
		},

		getEvent : function(){
			var base = this;
			if (base.isTouch === true){
				return "touchstart.owlControlls"
			} else {
				return "click.owlControlls"
			}
		},

		buildPagination : function(){
			var base = this;

			base.paginationWrapper = $("<div class=\"owl-pagination\"/>");
			base.owlControlls.append(base.paginationWrapper);

			base.paginationWrapper.on(base.getEvent(), ".owl-page", function(event){
				event.preventDefault();
				if(Number($(this).data("owl-page")) !== base.currentSlide){
					base.goTo( Number($(this).data("owl-page")), true)
				}
			});
			base.updatePagination();
			
		},

		updatePagination : function(){
			var base = this;
			if(base.options.pagination === false){
				return false;
			}
			base.paginationWrapper.html("");

			var counter = 0;
			var lastPage = base.itemsAmount - base.itemsAmount % base.options.items

			for(var i = 0; i<base.itemsAmount; i++){
				if(i % base.options.items === 0){
					counter +=1
					if(lastPage === i){
						var lastItem = base.itemsAmount - base.options.items
					}
					var paginationButton = $("<div/>",{
						"class" : "owl-page"
						});
					var paginationButtonInner = $("<span></span>",{
						"text": base.options.paginationNumbers === true ? counter : "",
						"class": base.options.paginationNumbers === true ? "owl-numbers" : ""
					});
					paginationButton.append(paginationButtonInner)

					paginationButton.data("owl-page",lastPage === i ? lastItem : i);
					paginationButton.data("owl-roundPages",counter);

					base.paginationWrapper.append(paginationButton)
				}
			}
			base.checkPagination();
		},
		checkPagination : function(arg){
			var base = this;

			base.paginationWrapper.find(".owl-page").each(function(i,v){
				if($(this).data("owl-roundPages") === $(base.owlItems[base.currentSlide]).data("owl-roundPages") ){
				//Subject to discuss
				//if($(this).data("owl-page") == base.currentSlide){
					base.paginationWrapper
					.find(".owl-page")
					.removeClass("active")
					//.removeAttr("disabled", "disabled");
					//$(this).addClass("active").attr("disabled", "disabled");
					$(this).addClass("active");
				} 
			});
		},

		checkNavigation : function(){
			var base = this;

			if(base.options.navigation === false){
				return false;
			}

			if(base.currentSlide === 0){
				base.buttonPrev.addClass('disabled');
				base.buttonNext.removeClass('disabled');

			} else if (base.currentSlide === base.maximumSlide){
				base.buttonPrev.removeClass('disabled');
				base.buttonNext.addClass('disabled');

			} else if(base.currentSlide !== 0 && base.currentSlide !== base.maximumSlide){
				base.buttonPrev.removeClass('disabled');
				base.buttonNext.removeClass('disabled');
			}
		},

		destroyControlls : function(){
			var base = this;
			if(base.owlControlls){
				base.owlControlls.remove();
			}
		},

		next : function(speed){
			var base = this;
			base.currentSlide += 1;
			if(base.currentSlide > base.maximumSlide){
				base.currentSlide = base.maximumSlide;
				return false;
			}
			base.goTo(base.currentSlide,speed);
		},

		prev : function(speed){
			var base = this;
			base.currentSlide -= 1
			if(base.currentSlide < 0){
				base.currentSlide = 0;
				return false;
			}
			base.goTo(base.currentSlide,speed);
		},

		goTo : function(position,pagination){
			var base = this;

			if(position >= base.maximumSlide){
				position = base.maximumSlide
			} 
			else if( position <= 0 ){
				position = 0
			}
			base.currentSlide = position;

			var goToPixel = base.positionsInArray[position];

			if(base.support3d === true){
				base.isCss3Finish = false;

				if(pagination === true){
					base.swapTransitionSpeed("paginationSpeed");
					setTimeout(function() {
    					base.isCss3Finish = true;
    				}, base.options.paginationSpeed);

    			} else if(pagination === "goToFirst" ){
    				base.swapTransitionSpeed(base.options.goToFirstSpeed);
    				setTimeout(function() {
    					base.isCss3Finish = true;
    				}, base.options.goToFirstSpeed);

    			} else {
					base.swapTransitionSpeed("slideSpeed");
					setTimeout(function() {
    					base.isCss3Finish = true;
    				}, base.options.slideSpeed);
				}
				base.transition3d(goToPixel);
			} else {
				if(pagination === true){
					base.css2slide(goToPixel, base.options.paginationSpeed);
				} else if(pagination === "goToFirst" ){
					base.css2slide(goToPixel, base.options.goToFirstSpeed);
				} else {
					base.css2slide(goToPixel, base.options.slideSpeed);
				}
			}

			if(base.options.pagination === true){
				base.checkPagination()
			}
			if(base.options.navigation === true){
				base.checkNavigation()
			}
			if(base.options.autoPlay !== false){
				base.checkAp();
			}
		},

		stop: function(){
			var base = this;
			base.apStatus = "stop";
			clearInterval(base.autplaySpeed);
		},

		checkAp : function(){
			var base = this;
			if(base.apStatus !== "stop"){
				base.play();
			}
		},

		play : function(){
			var base = this;
			base.apStatus = "play";
			if(base.options.autoPlay === false){
				return false;
			}
			clearInterval(base.autplaySpeed);
			base.autplaySpeed = setInterval(function(){
				if(base.currentSlide < base.maximumSlide && base.playDirection === "next"){
					base.next(true);
				} else if(base.currentSlide === base.maximumSlide){
					if(base.options.goToFirst === true){
						base.goTo(0,"goToFirst");
					} else{
						base.playDirection = "prev";
						base.prev(true);
					}
				} else if(base.playDirection === "prev" && base.currentSlide > 0){
					base.prev(true);
				} else if(base.playDirection === "prev" && base.currentSlide === 0){
					base.playDirection = "next";
					base.next(true);
				}
			},base.options.autoPlay)	
		},

		swapTransitionSpeed : function(action){
			var base = this;
			if(action === "slideSpeed"){
				base.owlWrapper.css(base.addTransition(base.options.slideSpeed));
			} else if(action === "paginationSpeed" ){
				base.owlWrapper.css(base.addTransition(base.options.paginationSpeed));
			} else if(typeof action !== "string"){
				base.owlWrapper.css(base.addTransition(action));
			}
		},

        addTransition : function(speed){
        	var base = this;			
        	return {
                "-webkit-transition": "all "+ speed +"ms ease",
				"-moz-transition": "all "+ speed +"ms ease",
				"-o-transition": "all "+ speed +"ms ease",
				"transition": "all "+ speed +"ms ease"
            }
        },
        removeTransition : function(){
			return {
                "-webkit-transition": "",
				"-moz-transition": "",
				"-o-transition": "",
				"transition": ""
            }
        },

        doTranslate : function(pixels){
			return { 
                "-webkit-transform": "translate3d("+pixels+"px, 0px, 0px)",
                "-moz-transform": "translate3d("+pixels+"px, 0px, 0px)",
                "-o-transform": "translate3d("+pixels+"px, 0px, 0px)",
                "-ms-transform": "translate3d("+pixels+"px, 0px, 0px)",
                "transform": "translate3d("+pixels+"px, 0px,0px)"
                };
        },

        transition3d : function(value){
			var base = this;
			base.owlWrapper.css(base.doTranslate(value));
		},
		css2move : function(value){
			var base = this;
			base.owlWrapper.css({"left" : value})
		},
		css2slide : function(value,speed){
			var base = this;

			base.isCssFinish = false;
			base.owlWrapper.stop(true,true).animate({
				"left" : value
			}, {
				duration : speed || base.options.slideSpeed ,
			    complete : function(){
			    	base.isCssFinish = true;
				}
			})
		},

		support3d : function(){
				var base = this;
				
		    	var sTranslate3D = "translate3d(0px, 0px, 0px)";
			    var eTemp = document.createElement("div");
			    eTemp.style.cssText = "  -moz-transform:"    + sTranslate3D +
			                          "; -ms-transform:"     + sTranslate3D +
			                          "; -o-transform:"      + sTranslate3D +
			                          "; -webkit-transform:" + sTranslate3D +
			                          "; transform:"         + sTranslate3D;
			    var rxTranslate = /translate3d\(0px, 0px, 0px\)/g;
			    var asSupport = eTemp.style.cssText.match(rxTranslate);
			    var bHasSupport = (asSupport !== null && asSupport.length === 1);
			    base.support3d = bHasSupport
			    return bHasSupport;
		},
		
		checkTouch : function(){
			var base = this;
			if ("ontouchstart" in document.documentElement)
			{
				base.isTouch = true;
			} else {
				base.isTouch = false;
			}
		},

		//Touch
		moveEvents : function(check){

			var	base = this,
            	offsetX = 0,
            	offsetY = 0,
            	baseElWidth = 0,
            	relativePos = 0,
            	minSwipe,
            	maxSwipe,
            	sliding;

            var links = base.$elem.find('a');

            base.isCssFinish = true;
        
            var start = function(event){
            	if(base.isCssFinish === false){
            		return false;
            	} 
            	if(base.isCss3Finish === false){
            		return false;
            	}

            	var oEvent = event.originalEvent,
                	pos = $(this).position();
                	base.newRelativeX = 0;

                if(base.options.autoPlay !== false){
					clearInterval(base.autplaySpeed);
				}
				$(this)
            	.css(base.removeTransition())

            	base.newX = 0;

                relativePos = pos.left;

                if(base.isTouch === true){
                	offsetX = oEvent.touches[0].pageX - pos.left;
                	offsetY = oEvent.touches[0].pageY - pos.top;
            	} else {
            		$(this).addClass("grabbing");
            		offsetX = event.pageX - pos.left;
            		offsetY = event.pageY - pos.top;
            		$(document).on("mousemove.owl", move);
            		$(document).on("mouseup.owl", end);
            	}

            	sliding = false;
            	if(jQuery._data( base.$elem.get(0), "events" ).touchmove === undefined){
            		base.$elem.on("touchmove.owl", ".owl-wrapper", move);
            	}

            };

            var move = function(event){
            	var oEvent = event.originalEvent;

            	if(base.isTouch === true){
            		base.newX = oEvent.touches[0].pageX - offsetX;
            		base.newY = oEvent.touches[0].pageY - offsetY;

            	} else {
            		base.newX = event.pageX - offsetX;
            	}
            	
           		base.newRelativeX = base.newX - relativePos

            	if(base.newRelativeX > 8 || base.newRelativeX < -8  ){
                	event.preventDefault();
                	sliding = true;
           		}

           		if(  (base.newY > 10 || base.newY < -10) && sliding === false  ){
                	 base.$elem.off("touchmove.owl");
           		}

            	minSwipe = function(){
            		return  base.newRelativeX / 5;
            	}
            	maxSwipe = function(){
            		return  base.maximumPixels + base.newRelativeX / 5;
            	}
            	//Calculate min and max
                base.newX = Math.max(Math.min( base.newX, minSwipe() ), maxSwipe() );
                if(base.support3d === true){
                	base.transition3d(base.newX);
                } else {
                	base.css2move(base.newX);
                }

            };

             var end = function(event){

            	if(base.isTouch === true){
            		var $this = $(this);
            	} else{
            		var $this = base.owlWrapper
            		$this.removeClass("grabbing")
            		$(document).off("mousemove.owl");
            		$(document).off("mouseup.owl");
            	}

            	if(base.newX !== 0){
            		var newPosition = base.getNewPosition();
            		base.goTo(newPosition)
            	} else {
            		if(links.length>0){
            			links.off('click.owlClick');
            		}
            	}
            };


            if(base.isTouch === true){
            	base.$elem.on("touchstart.owl", ".owl-wrapper", start);
	    		base.$elem.on("touchend.owl", ".owl-wrapper", end);
            }else{
            	links.on('click.owlClick', function(event){event.preventDefault();})
            	base.$elem.on("mousedown.owl", ".owl-wrapper", start);            	
			 	base.$elem.on('dragstart.owl',"img", function(event) { event.preventDefault();});
			 	base.$elem.bind('mousedown.disableTextSelect', function() {return false;});
			 }
		},

		clearEvents : function(){
			var base = this;
			base.$elem.off('.owl');
			$(document).off('.owl');
		},

		getNewPosition : function(){
			var base = this,
				newPosition;

			//Calculate new Position
			var newPosition = base.improveClosest();

	    	if(newPosition>base.maximumSlide){
	    		base.currentSlide = base.maximumSlide;
	    		newPosition  = base.maximumSlide;
	    	} else if( base.newX >=0 ){
	    		newPosition = 0;
	    		base.currentSlide = 0;
	    	}
	    	return newPosition;
		},

		improveClosest : function(){
			var base = this;
			var array = base.positionsInArray;
			var goal = base.newX;
			var closest = null;
			$.each(array, function(i,v){
				if( goal - (base.itemWidth/20) > array[i+1] && goal - (base.itemWidth/20)< v && base.moveDirection() === "left") {
					closest = v;
					base.currentSlide = i;
				} 
				else if (goal + (base.itemWidth/20) < v && goal + (base.itemWidth/20) > array[i+1] && base.moveDirection() === "right"){
					closest = array[i+1];
					base.currentSlide = i+1;
				}
			});
			return base.currentSlide;
		},

		moveDirection : function(){
			var base = this,
				direction;
			if(base.newRelativeX < 0 ){
				direction = "right"
				base.playDirection = "next"
			} else {
				direction = "left"
				base.playDirection = "prev"
			}
			return direction
		},
		customEvents : function(){
			var base = this;
			base.$elem.on('owl.next',function(){
				base.next();
			});
			base.$elem.on('owl.prev',function(){
				base.prev();
			});
			base.$elem.on('owl.play',function(){
				base.play();
				base.hoverStatus = "play";
			});
			base.$elem.on('owl.stop',function(){
				base.stop();
				base.hoverStatus = "stop";
			});
		},
		stopOnHover : function(){
			var base = this;
			if(base.options.stopOnHover === true && base.isTouch === false && base.options.autoPlay !== false){
				base.$elem.on('mouseover', function(){
					base.stop();
				});
				base.$elem.on('mouseout', function(){
					if(base.hoverStatus !== "stop"){
						base.play();
					}
				});
			}
		}
    };


    $.fn.owlCarousel = function( options ) {
        return this.each(function() {
            var carousel = Object.create( Carousel );
            carousel.init( options, this );
            $.data( this, 'owlCarousel', carousel );
        });
    };

    $.fn.owlCarousel.options = {
    	slideSpeed : 200,
    	paginationSpeed : 800,

    	autoPlay : false,
    	goToFirst : true,
    	goToFirstSpeed : 1000,
    	stopOnHover : false,

    	navigation : false,
    	navigationText : ["prev","next"],
    	pagination : true,
    	paginationNumbers: false,

    	responsive: true,

    	items : 5,
    	itemsDesktop : [1199,4],
		itemsDesktopSmall : [979,3],
		itemsTablet: [768,2],
		itemsMobile : [479,1],

		baseClass : "owl-carousel",
		theme : "owl-theme"
    };

})( jQuery, window, document );