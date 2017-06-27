/*  5/19/2012
        PikaChoose
    Jquery plugin for photo galleries
    Copyright (C) 2011 Jeremy Fry

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
(function($) {
    /**
     * Creates a slideshow for all matched elements.
     *
     * @example $("#pikame").PikaChoose();
     * @input needed <ul id="pikame"><li><img src="first.jpg"><span>Caption</span></li><li><img src="second.jpg"><span>Caption</span></li></ul>
     *
     * @method PikaChoose
     * @return $
     * @param o {Hash|String} A set of key/value pairs to set as configuration properties or a method name to call on a formerly created instance.
     */
     var defaults = {
		autoPlay: true,
		speed: 5000,
		text: { play: "", stop: "", previous: "Previous", next: "Next", loading: "Loading" },
		transition:[1],
		showCaption: true,
		IESafe: false,
		showTooltips: false,
		carousel: false,
		carouselVertical: false,
		animationFinished: null,
		buildFinished: null,
		bindsFinished: null,
		startOn: 0,
		thumbOpacity: 0.4,
		hoverPause: false,
		animationSpeed: 600,
		fadeThumbsIn: false,
		carouselOptions: {},
		thumbChangeEvent: 'click.pikachoose',
		stopOnClick: false
	};
   
    $.fn.PikaChoose = function(o) {
		return this.each(function() {
			$(this).data('pikachoose', new $pc(this, o));
		});
	};
	
	/**
     * The PikaChoose object.
     *
     * @constructor
     * @class pikachoose
     * @param e {HTMLElement} The element to create the carousel for.
     * @param o {Object} A set of key/value pairs to set as configuration properties.
     * @cat Plugins/PikaChoose
     */
    $.PikaChoose = function(e, o) {
		this.options    = $.extend({}, defaults, o || {});
		this.list       = null;
		this.image      = null;
		this.anchor		= null;
		this.caption	= null;
		this.imgNav		= null;
		this.imgPlay    = null;
		this.imgPrev	= null;
		this.imgNext    = null;
		this.textNext	= null;
		this.textPrev	= null;
		this.previous   = null;
		this.next       = null;
		this.aniWrap	= null;
		this.aniDiv		= null;
		this.aniImg		= null;
		this.thumbs		= null;
		this.transition	= null;
		this.active		= null;
		this.tooltip	= null;
		this.animating	= false;
		this.stillOut   = null;
		this.counter	= null;
		this.timeOut	= null;
        this.pikaStage  = null;
		if(typeof(this.options.data) != "undefined"){
			//user passed a data source
			e = $("<ul></ul>").addClass("jcarousel-skin-pika").appendTo(e);
			$.each(this.options.data,function(){
                var tmp = null;
				if(typeof(this.link) != "undefined"){ 
					tmp = $("<li><a href='"+this.link+"'><img></a></li>").appendTo(e);
					if(typeof(this.title) != "undefined"){ tmp.find('a').attr('title',this.title); }
				}else{
					tmp = $("<li><img></li>").appendTo(e);
				}
				if(typeof(this.caption) != "undefined"){ tmp.append("<span>"+this.caption+"</span>"); }
				if(typeof(this.thumbnail) != "undefined"){ 
					tmp.find('img').attr('ref',this.image); 
					tmp.find('img').attr('src',this.thumbnail); 
				}else{
                    tmp.find('img').attr('src',this.image); 
				}
			});
		}
		if(e instanceof  jQuery || e.nodeName.toUpperCase() == 'UL' || e.nodeName.toUpperCase() == 'OL') {
            this.list = $(e);
            this.build();
            this.bindEvents();
        }else{
            return;
        }
		
		var y = 0;
		var x = 0;
		for(var t = 0; t<25;t++){
			var a = '<div col="'+y+'" row="'+x+'"></div>';
			this.aniDiv.append(a);
			y++;
			if(y == 5){
				x++;
				y=0;
			}
		}

    };//end PikaChoose function(e, o)
    
    var $pc = $.PikaChoose;
        $pc.fn = $pc.prototype = {
        pikachoose: '4.4.8'
    };
	
	$.fn.pikachoose = $.fn.PikaChoose;

    $pc.fn.extend = $pc.extend = $.extend;

    $pc.fn.extend({
        /**
         * Builds the gallery structure.
         *
         * @method build
         * @return undefined
         */
        build: function() {
            this.step = 0; //transition step count
            //create the structure for pikachoose
            if(this.options.pikaStage){
                this.wrap   = this.options.pikaStage;
                this.wrap.addClass('pika-stage');
            }else{
                this.wrap   = $("<div class='pika-stage'></div>").insertBefore(this.list);
            }
			this.image      = $("<img>").appendTo(this.wrap);
			this.imgNav     = $("<div class='pika-imgnav'></div>").insertAfter(this.image);
			this.imgPlay    = $("<a></a>").appendTo(this.imgNav);
			this.counter    = $("<span class='pika-counter'></span>").appendTo(this.imgNav);
			if(this.options.autoPlay){ this.imgPlay.addClass('pause'); }else{ this.imgPlay.addClass('play'); }
			this.imgPrev	= $("<a class='previous'></a>").insertAfter(this.imgPlay);
			this.imgNext	= $("<a class='next'></a>").insertAfter(this.imgPrev);
			this.caption	= $("<div class='caption'></div>").insertAfter(this.imgNav).hide();
			this.tooltip	= $("<div class='pika-tooltip'></div>").insertAfter(this.list).hide();
			this.aniWrap	= $("<div class='pika-aniwrap'></div>").insertAfter(this.caption);
			this.aniImg		= $("<img>").appendTo(this.aniWrap).hide();
			this.aniDiv		= $("<div class='pika-ani'></div>").appendTo(this.aniWrap);
			this.textNav	= $("<div class='pika-textnav'></div>").insertAfter(this.aniWrap);
			this.textPrev	= $("<a class='previous'>"+this.options.text.previous+"</a>").appendTo(this.textNav);
			this.textNext	= $("<a class='next'>"+this.options.text.next+"</a>").appendTo(this.textNav);
			this.list.addClass('pika-thumbs');
			this.thumbs = this.list.find('img');
			this.loader = $("<div class='pika-loader'></div>").appendTo(this.wrap).hide().html(this.options.text.loading);
			this.active		= this.thumbs.eq(this.options.startOn);
			//fill in info for first image
			this.finishAnimating({'index':this.options.startOn,'source':this.active.attr('ref') || this.active.attr('src'),'caption':this.active.parents('li:first').find('span:first').html(), 'clickThrough':this.active.parent().attr('href') || "", 'clickThroughTarget':this.active.parent().attr('target') || "", 'clickThroughTitle':this.active.parent().attr('title') || ""});
			//Set CSS that is a MUST have. All style specific stuff happens in css file
			this.aniDiv.css({position:'relative'});
			
			//process all the thumbnails
			var self = this;
			this.updateThumbs();
			//thubnails must fade in before jcarousel is called or we get that awesome no width/height error
			if(this.options.fadeThumbsIn){
				this.list.fadeIn();
			}
			
			if(this.options.carousel){
				//default options for carousel
				var carouselDefaults = {vertical:this.options.carouselVertical, initCallback: function(carousel){
					jQuery(carousel.list).find('img').click(function(e,x) {
						if(typeof(x) !== 'undefined' && x.how == "auto"){
							if(self.options.autoPlay == false){
								return false;
							}
						}
						var clicked = parseInt(jQuery(this).parents('.jcarousel-item').attr('jcarouselindex'));
						var last = (jQuery(this).parents('ul').find('li:last').attr('jcarouselindex') == clicked-1) ? true : false;
						if(!last){
							clicked = (clicked-2<=0) ? 0 : clicked-2;
						}
						clicked++;
						carousel.scroll(clicked);
					});
				}};
				var carouselOptions = $.extend({}, carouselDefaults, this.options.carouselOptions || {});
				this.list.jcarousel(carouselOptions);
			}
			if(typeof(this.options.buildFinished) == 'function'){
                this.options.buildFinished(this);
            }
		}, //end setup
        /**
         * proccesses thumbnails
         *
         * @method createThumb
         * @return undefined
         */
        createThumb: function(ele) {
            var self = ele;
			var that = this;
			this.thumbs = this.list.find('img');
            if(typeof $.data(ele[0], 'source') !== 'undefined'){ return; }
            ele.parents('li:first').wrapInner("<div class='clip' />");
            self.hide();
			//store all the data with the image
            $.data(ele[0],'clickThrough',self.parent('a').attr('href') || "");
            $.data(ele[0],'clickThroughTarget',self.parent('a').attr('target') || "");
            $.data(ele[0],'clickThroughTitle',self.parent('a').attr('title') || "");
            if(self.parent('a').length > 0){ self.unwrap(); }
            $.data(ele[0],'caption',self.next('span').html() || "");
			self.next('span').remove();
            $.data(ele[0],'source',self.attr('ref') || self.attr('src'));
            $.data(ele[0],'imageTitle',self.attr('title') || "");
            $.data(ele[0],'imageAlt',self.attr('alt') || "");
            $.data(ele[0],'index',this.thumbs.index(ele));
			
			//gets each items index to iterate through them. Thanks to Tushar for the fix.
			$.data(ele[0],'order',self.closest('ul').find('li').index(self.parents('li')));
            //pass data so it can enter the load scope
            var data = $.data(ele[0]);
            $('<img />').bind('load',{data:data},function(){
                if(typeof(that.options.buildThumbStart) == 'function'){
                    that.options.buildThumbStart(that);
                }
                //in this scope self refers to the image
				var img = $(this);
				var w = this.width;
				var h = this.height;
				if(w===0){w = img.attr("width");}
				if(h===0){h = img.attr("height");}
				//grab a ratio for image to user defined settings
				var ph = parseInt(self.parents('.clip').css('height').slice(0,-2));
				var pw = parseInt(self.parents('.clip').css('width').slice(0,-2));
                if(pw === 0){
					//failsafe for IE8
					pw = self.parents('li:first').outerWidth();
				}
				if(ph === 0){
					//failsafe for IE8
					ph = self.parents('li:first').outerHeight();
				}
				var rw = pw/w;
				var rh = ph/h;
				//determine which has the smallest ratio (thus needing
				//to be the side we use to scale so our whole thumb is filled)
				var ratio;
				if(rw<rh){
					//we'll use ratio later to scale and not distort
					self.css({height:'100%'});
				}else{
					self.css({width:'100%'});
				}
				//use those ratios to calculate scale
				self.hover(
					function(e){
						clearTimeout(that.stillOut);
						$(this).stop(true,true).fadeTo(250,1);
						if(!that.options.showTooltips){ return; }
						that.tooltip.show().stop(true,true).html(data.caption).animate({top:$(this).parent().position().top, left:$(this).parent().position().left, opacity: 1.0},'fast');
					},
					function(e){
						if(!$(this).hasClass("active")){$(this).stop(true,true).fadeTo(250,that.options.thumbOpacity);
						that.stillOut = setTimeout(that.hideTooltip,700);
					}}
				);

				
				if(data.order == that.options.startOn){
					self.fadeTo(250,1);
					self.addClass('active');
					self.parents('li').eq(0).addClass('active');
				}else{
					self.fadeTo(250,that.options.thumbOpacity);
				}
                if(typeof(that.options.buildThumbFinish) == 'function'){
                    that.options.buildThumbFinish(that);
                }
            }).attr('src',self.attr('src'));
        },//end createThumb
		/**
         * proccesses thumbnails
         *
         * @method bindEvents
         * @return undefined
         */
        bindEvents: function() {
            this.thumbs.bind(this.options.thumbChangeEvent,{self:this},this.imgClick);
            this.imgNext.bind('click.pikachoose',{self:this},this.nextClick);
            this.textNext.bind('click.pikachoose',{self:this},this.nextClick);
            this.imgPrev.bind('click.pikachoose',{self:this},this.prevClick);
            this.textPrev.bind('click.pikachoose',{self:this},this.prevClick);
            this.imgPlay.unbind('click.pikachoose').bind('click.pikachoose',{self:this},this.playClick);
            this.wrap.unbind('mouseenter.pikachoose').bind('mouseenter.pikachoose',{self:this},function(e){
                e.data.self.imgNav.stop(true,true).fadeTo('slow', 1.0);
                if(e.data.self.options.hoverPause === true){
                    clearTimeout(e.data.self.timeOut);
                }
            });
            this.wrap.unbind('mouseleave.pikachoose').bind('mouseleave.pikachoose',{self:this},function(e){
            e.data.self.imgNav.stop(true,true).fadeTo('slow', 0.0);
                if(e.data.self.options.autoPlay && e.data.self.options.hoverPause){
					e.data.self.timeOut = setTimeout((function(self){
						return function(){ self.nextClick(); };
					})(e.data.self), e.data.self.options.speed);
				}
            });
			this.tooltip.unbind('mouseenter.pikachoose').bind('mouseenter.pikachoose',{self:this},function(e){
				clearTimeout(e.data.self.stillOut);
			});
			this.tooltip.unbind('mouseleave.pikachoose').bind('mouseleave.pikachoose',{self:this},function(e){
				e.data.self.stillOut = setTimeout(e.data.self.hideTooltip,700);
			});
			if(typeof(this.options.bindsFinished) == 'function'){
                this.options.bindsFinished(this);
            }
        },//end bind event
		/**
         * hides tooltip
         *
         * @method hideTooltip
         * @return undefined
         */
		hideTooltip: function (e){
			$(".pika-tooltip").animate({opacity:0.01});
		},
        /**
         * handles gallery after aclick occurs. and sets active classes
         *
         * @method imgClick
         * @return undefined
         */
        imgClick: function(e,x) {
            var self = e.data.self;
			var data = $.data(this);
            if(self.animating){return;}
            if(typeof(x) == 'undefined' || x.how != "auto"){
                    //arrive here if natural click
                if(self.options.autoPlay && self.options.stopOnClick){
                    self.imgPlay.trigger('click');
                }else{
                    clearTimeout(self.timeOut);
                }
			}else{
                if(!self.options.autoPlay){
					return false;
				}
			}
			//check if the src is the same as the current photo or if they're using user thumb
			if($(this).attr('src') !== $.data(this).source){
				self.loader.fadeIn('fast');
			}
			self.caption.fadeOut('slow');
            self.animating = true;
            self.active.fadeTo(300,self.options.thumbOpacity).removeClass('active');
            self.active.parents('.active').eq(0).removeClass('active');
            self.active = $(this);
            self.active.addClass('active').fadeTo(200,1);
            self.active.parents('li').eq(0).addClass('active');
            $('<img />').bind('load', {self:self,data:data}, function(){
                self.loader.fadeOut('fast');
				//in this scope self referes to the PikaChoose object
				self.aniDiv.css({height:self.image.height(),width:self.image.width()}).show();
				self.aniDiv.children('div').css({'width':'20%','height':'20%','float':'left'});
		
				//decide our transition
				var n = 0;
				if(self.options.transition[0] == -1){	
					//random
					n = Math.floor(Math.random()*7)+1;
				}else{
					n = self.options.transition[self.step];
					self.step++;
					if(self.step >= self.options.transition.length){self.step=0;}
				}
				if(self.options.IESafe && $.browser.msie){ n = 1; }
				self.doAnimation(n,data);
				
			}).attr('src',$.data(this).source);//end image preload
        },//end bindEvents
        /**
         * Takes a animation # n and executes it
         *
         * @method doAnimation
         * @return undefined
         */
        doAnimation: function(n,data){
				this.aniWrap.css({position:'absolute',top:this.wrap.css('padding-top'), left:this.wrap.css('padding-left'), width: this.wrap.width()});
                var self = this; //self in this scope refers to PikaChoose object. Needed for callbacks on animations
				self.image.stop(true,false);
				self.caption.stop().fadeOut();
				var aWidth = self.aniDiv.children('div').eq(0).width();
				var aHeight = self.aniDiv.children('div').eq(0).height();
				var img = new Image();
				$(img).attr('src',data.source);
				if(img.height != self.image.height() || img.width != self.image.width()){
					//Your images are not the same height? Well you get limited on transitions
					if(n !== 0 && n !== 1 && n !== 7){
						//n = 1;
					}
				}
				self.aniDiv.css({height:self.image.height(),width:self.image.width()});
				self.aniDiv.children().each(function(){
					//position myself absolutely
					var div = $(this);
					var xOffset = Math.floor(div.parent().width()/5)*div.attr('col');
					var yOffset = Math.floor(div.parent().height()/5)*div.attr('row');
					div.css({
						'background':'url('+data.source+') -'+xOffset+'px -'+yOffset+'px',
						'background-size':div.parent().width()+'px '+div.parent().height()+'px',
						'width':'0px',
						'height':'0px',
						'position':'absolute',
						'top':yOffset+'px',
						'left':xOffset+'px',
						'float':'none'
					});
				});//end ani_divs.children.each
				self.aniDiv.hide();
				self.aniImg.hide();
				
                switch(n){
					case 0:
						//fade out then in
						self.image.stop(true,true).fadeOut(self.options.animationSpeed,function(){
							self.image.attr('src',data.source).fadeIn(self.options.animationSpeed,function(){
								self.finishAnimating(data);
							});
						});
	
						break;
					case 1:
						//full frame fade
						self.aniDiv.hide();
						self.aniImg.height(self.image.height()).hide().attr('src',data.source);
						self.wrap.css({height:self.image.height()});
						$.when(
							self.image.fadeOut(self.options.animationSpeed),
							self.aniImg.eq(0).fadeIn(self.options.animationSpeed)).done(function(){
							self.finishAnimating(data);
						});
	
						break;
					case 2:
						self.aniDiv.show().children().hide().each(function(index){  
							//animate out as blocks 
							var delay = index*30;
							$(this).css({opacity: 0.1}).show().delay(delay).animate({opacity: 1,"width":aWidth,"height":aHeight},200,'linear',function(){
								if(self.aniDiv.find("div").index(this) == 24){
									self.finishAnimating(data);
								}
							});
						});
						break;
					case 3:
						self.aniDiv.show().children("div:lt(5)").hide().each(function(index){
							var delay = $(this).attr('col')*100;
							$(this).css({opacity:0.1,"width":aWidth}).show().delay(delay).animate({opacity:1,"height":self.image.height()},self.options.animationSpeed,'linear',function(){
								if(self.aniDiv.find(" div").index(this) == 4){
									self.finishAnimating(data);
								}
							});
						});
						break;							
					case 4:
						self.aniDiv.show().children().hide().each(function(index){
							if(index>4){ return; }
							var delay = $(this).attr('col')*30;
							var gap = self.gapper($(this), aHeight, aWidth);
							var speed = self.options.animationSpeed * 0.7;
							$(this).css({opacity:0.1,"height":"100%"}).show().delay(delay).animate({opacity:1,"width":gap.width},speed,'linear',function(){
								if(self.aniDiv.find(" div").index(this) == 4){
									self.finishAnimating(data);
								}
							});
						});
						break;
					case 5:
						self.aniDiv.show().children().show().each(function(index){
							var delay = index*Math.floor(Math.random()*5)*7;
							var gap = self.gapper($(this), aHeight, aWidth);
							
							if($(".animation div").index(this) == 24){
								delay = 700;
							}
                            $(this).css({"height":gap.height,"width":gap.width,"opacity":0.01}).delay(delay).animate({"opacity":1},self.options.animationSpeed,function(){
								if(self.aniDiv.find(" div").index(this) == 24){
									self.finishAnimating(data);
								}
							});
						});
						break;
					case 6:
						//full frame slide
						self.aniDiv.height(self.image.height()).hide().css({'background':'url('+data.source+') top left no-repeat'});
						self.aniDiv.children('div').hide();
						self.aniDiv.css({width:0}).show().animate({width:self.image.width()},self.options.animationSpeed,function(){
							self.finishAnimating(data);
							self.aniDiv.css({'background':'transparent'});
						});
						break;
					case 7:
						//side in slide
						self.wrap.css({overflow:'hidden'});
						self.aniImg.height(self.image.height()).hide().attr('src',data.source);
						self.aniDiv.hide();
						self.image.css({position:'relative'}).animate({left:"-"+self.wrap.outerWidth()+"px"});
						self.aniImg.show();
						self.aniWrap.css({left:self.wrap.outerWidth()}).show().animate({left:"0px"},self.options.animationSpeed,function(){
							self.finishAnimating(data);
						});
						break;
				}
        
        },//end doAnimation
        /**
        * Executes after the animation finishes, resets the animation divs
        *
        * @method finishAnimating
        * @return undefined
        */
        finishAnimating: function(data){
            this.animating = false;
			this.image.attr('src',data.source);
            this.image.attr('alt',data.imageAlt);
            this.image.attr('title',data.imageTitle);
			this.image.css({left:"0"});
			this.image.show();
			var self = this;
			$('<img />').bind('load',function(){
				self.aniImg.fadeOut('fast');
				self.aniDiv.fadeOut('fast');
			}).attr('src',data.source);
			var cur = data.index+1;
            var total = this.thumbs.length;	
            this.counter.html(cur+"/"+total);
            if(data.clickThrough !== ""){
                if(this.anchor === null){
					this.anchor	= this.image.wrap("<a>").parent();
				}
				this.anchor.attr('href',data.clickThrough);
				this.anchor.attr('title',data.clickThroughTitle);
                this.anchor.attr('target',data.clickThroughTarget);
			}else{
                if(this.image.parent('a').length > 0){ this.image.unwrap(); }
				this.anchor = null;
			}
            if(this.options.showCaption && data.caption !== "" && data.caption !== null){
                this.caption.html(data.caption).fadeTo('slow',1);
            }
            if(this.options.autoPlay){
                var self = this;
                this.timeOut = setTimeout((function(self){
					return function(){ self.nextClick(); };
				})(this), this.options.speed, this.timeOut);
            }

            if(typeof(this.options.animationFinished) == 'function'){
                this.options.animationFinished(this);
            }
        },//end finishedAnimating
        /**
        * Makes sure the rows and columns are the full width/heigh tof the image
        *
        * @method gapper
        * @return object {height:int,width:int}
        */
        gapper: function(ele, aHeight, aWidth){
            var gap;
			if(ele.attr('row') == 4){
				//last row, check the gap and fix it!
				gap = (this.aniDiv.height()-(aHeight*5))+aHeight;
				aHeight = gap;
			}
			if(ele.attr('col') == 4){
				//last row, check the gap and fix it!
				gap = (this.aniDiv.width()-(aWidth*5))+aWidth;
				aWidth = gap;
			}
				return {height:aHeight, width:aWidth}
        },
        nextClick : function(e){
			var how = "natural";
            var self = null;
            try{
				self = e.data.self;
				if(typeof(e.data.self.options.next) == 'function'){
					e.data.self.options.next(this);
				}
			}catch(err){
                self = this;
				how = "auto";
			}
			var next = self.active.parents('li:first').next().find('img');
			if(next.length === 0){next = self.list.find('img').eq(0);}
            next.trigger('click',{how:how});
        },
        prevClick : function(e){
			if(typeof(e.data.self.options.previous) == 'function'){
                e.data.self.options.previous(this);
            }
			var self = e.data.self;
			var prev = self.active.parents('li:first').prev().find('img');
            if(prev.length === 0){prev = self.list.find('img:last');}
            prev.trigger('click');
		},
		playClick: function(e){
            var self = e.data.self;
            self.options.autoPlay = !self.options.autoPlay;
			self.imgPlay.toggleClass('play').toggleClass('pause');
			if(self.options.autoPlay){ self.nextClick(); }
		},
		Next: function(){
			var e = {data:{self: this}};
			this.nextClick(e);
		},
		Prev: function(){
			var e = {data:{self: this}};
			this.prevClick(e);
		},
        GoTo: function(v){
            var e = {data:{self: this}};
            this.list.find('img').eq(v).trigger('click');
        },
		Play: function(){
			if(this.options.autoPlay){return;}
			var e = {data:{self: this}};
			this.playClick(e);
		},
		Pause: function(){
			if(!this.options.autoPlay){return;}
			var e = {data:{self: this}};
			this.playClick(e);
		},
        /**
        * Re processes the list of images stored in this.list
        * Useful when dynamically adding images to PikaChoose
        *
        * @method finishAnimating
        * @return undefined
        */
        updateThumbs : function(){
            var self = this;
            this.thumbs = this.list.find('img');
            this.thumbs.each(function(){
				self.createThumb($(this),self);
			});
        }
	}); //end extend

})(jQuery);
 