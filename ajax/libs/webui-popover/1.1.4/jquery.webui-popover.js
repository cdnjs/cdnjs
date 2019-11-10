/*
 *  webui popover plugin  - v1.1.3
 *  A lightWeight popover plugin with jquery ,enchance the  popover plugin of bootstrap with some awesome new features. It works well with bootstrap ,but bootstrap is not necessary!
 *  https://github.com/sandywalker/webui-popover
 *
 *  Made by Sandy Duan
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {

		// Create the defaults once
		var pluginName = 'webuiPopover';
		var pluginClass = 'webui-popover';
		var pluginType = 'webui.popover';
		var	defaults = {
					placement:'auto',
					width:'auto',
					height:'auto',
					trigger:'click',
					style:'',
					delay: {
                        show: null,
                        hide: null
                    },
                    async: {
                        before: null, //function(that, xhr){}
                        success: null //function(that, xhr){}
                    },
					cache:true,
					multi:false,
					arrow:true,
					title:'',
					content:'',
					closeable:false,
					padding:true,
					url:'',
					type:'html',
					constrains:null,
					animation:null,
					template:'<div class="webui-popover">'+
								'<div class="arrow"></div>'+
								'<div class="webui-popover-inner">'+
									'<a href="#" class="close">x</a>'+
									'<h3 class="webui-popover-title"></h3>'+
									'<div class="webui-popover-content"><i class="icon-refresh"></i> <p>&nbsp;</p></div>'+
								'</div>'+
							'</div>'
		};

		var _globalIdSeed = 0;


		// The actual plugin constructor
		function WebuiPopover ( element, options ) {
				this.$element = $(element);
                if (options){
	                if($.type(options.delay) === 'string' || $.type(options.delay) === 'number') {
	                    options.delay = {show:options.delay,hide:options.delay}; // bc break fix
	                }
                }
				this.options = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this._targetclick = false;
				this.init();
		}

		WebuiPopover.prototype = {
				//init webui popover
				init: function () {
					//init the event handlers
					if (this.getTrigger()==='click'){
						this.$element.off('click').on('click',$.proxy(this.toggle,this));
					}else if (this.getTrigger()==='hover'){
						this.$element.off('mouseenter mouseleave click')
										.on('mouseenter',$.proxy(this.mouseenterHandler,this))
										.on('mouseleave',$.proxy(this.mouseleaveHandler,this))
										.on('click',function(e){e.stopPropagation();});
					}
					this._poped = false;
					this._inited = true;
					this._idSeed = _globalIdSeed;
					_globalIdSeed++;
				},
				/* api methods and actions */
				destroy:function(){
					this.hide();
					this.$element.data('plugin_'+pluginName,null);
					if (this.getTrigger()==='click'){
						this.$element.off('click');
					}else if (this.getTrigger()==='hover'){
						this.$element.off('mouseenter mouseleave');
					}
					if (this.$target){
						this.$target.remove();
					}
				},
				hide:function(event){
					if (event){
						event.preventDefault();
						event.stopPropagation();
					}
					if (this.xhr){
						this.xhr.abort();
						this.xhr = null;
					}

					var e = $.Event('hide.' + pluginType);
					this.$element.trigger(e);
					if (this.$target){this.$target.removeClass('in').hide();}
					this.$element.trigger('hidden.'+pluginType);

				},
				toggle:function(e){
					if (e) {
						e.preventDefault();
						e.stopPropagation();
					}
					this[this.getTarget().hasClass('in') ? 'hide' : 'show']();
				},
				hideAll:function(){
					$('div.webui-popover').not('.webui-popover-fixed').removeClass('in').hide();
				},
				/*core method ,show popover */
				show:function(){

					var
						$target = this.getTarget().removeClass().addClass(pluginClass);
					if (!this.options.multi){
						this.hideAll();
					}
					// use cache by default, if not cache setted  , reInit the contents 
					if (!this.getCache()||!this._poped){
						this.content = '';
						this.setTitle(this.getTitle());
						if (!this.options.closeable){
							$target.find('.close').off('click').remove();
						}
						if (!this.isAsync()){
							this.setContent(this.getContent());
						}else{
							this.setContentASync(this.options.content);
							this.displayContent();
							return;
						}
						$target.show();
					}
					this.displayContent();
					this.bindBodyEvents();
				},
				displayContent:function(){
					var
						//element postion
						elementPos = this.getElementPosition(),
						//target postion
						$target = this.getTarget().removeClass().addClass(pluginClass),
						//target content
						$targetContent = this.getContentElement(),
						//target Width
					    targetWidth = $target[0].offsetWidth,
					    //target Height
						targetHeight = $target[0].offsetHeight,
						//placement
						placement = 'bottom',
						e = $.Event('show.' + pluginType);
					//if (this.hasContent()){
					this.$element.trigger(e);
					//}
					if (this.options.width!=='auto') {$target.width(this.options.width);}
					if (this.options.height!=='auto'){$targetContent.height(this.options.height);}

					//init the popover and insert into the document body
					if (!this.options.arrow){
						$target.find('.arrow').remove();
					}
					$target.remove().css({ top: -2000, left: -2000, display: 'block' });
					if (this.getAnimation()){
						$target.addClass(this.getAnimation());
					}
					$target.appendTo(document.body);
					targetWidth = $target[0].offsetWidth;
					targetHeight = $target[0].offsetHeight;
					placement = this.getPlacement(elementPos);
					this.initTargetEvents();
				    var postionInfo = this.getTargetPositin(elementPos,placement,targetWidth,targetHeight);
					this.$target.css(postionInfo.position).addClass(placement).addClass('in');

					if (this.options.type==='iframe'){
						var $iframe = $target.find('iframe');
						$iframe.width($target.width()).height($iframe.parent().height());
					}

					if (this.options.style){
						this.$target.addClass(pluginClass+'-'+this.options.style);
					}

					if (!this.options.padding){
						$targetContent.css('height',$targetContent.outerHeight());
						this.$target.addClass('webui-no-padding');
					}
					if (!this.options.arrow){
						this.$target.css({'margin':0});
					}
					if (this.options.arrow){
						var $arrow = this.$target.find('.arrow');
						$arrow.removeAttr('style');
						if (postionInfo.arrowOffset){
							$arrow.css(postionInfo.arrowOffset);
						}
					}
					this._poped = true;
					this.$element.trigger('shown.'+pluginType);


				},

				isTargetLoaded:function(){
					return  this.getTarget().find('i.glyphicon-refresh').length===0;
				},

				/*getter setters */
				getTriggerElement:function(){
					return this.$element;
				},
				getTarget:function(){
					if (!this.$target){
						var id = pluginName+this._idSeed;
						this.$target = $(this.options.template)
							.attr('id',id)
							.data('trigger-element',this.getTriggerElement());
						this.getTriggerElement().attr('data-target',id);
					}
					return this.$target;
				},
				getTitleElement:function(){
					return this.getTarget().find('.'+pluginClass+'-title');
				},
				getContentElement:function(){
					return this.getTarget().find('.'+pluginClass+'-content');
				},
				getTitle:function(){
					return this.$element.attr('data-title')||this.options.title||this.$element.attr('title');
				},
				getUrl:function(){
					return this.$element.attr('data-url')||this.options.url;
				},
                getCache:function(){
                    var dataAttr = this.$element.attr('data-cache');
                    if (typeof(dataAttr) !== 'undefined') {
                        switch(dataAttr.toLowerCase()){
                            case 'true': case 'yes': case '1': return true;
                            case 'false': case 'no': case '0': return false;
                        }
                    }
					return this.options.cache;
				},
                getTrigger:function(){
                    return this.$element.attr('data-trigger')||this.options.trigger;
                },
                getDelayShow:function(){
                    var dataAttr = this.$element.attr('data-delay-show');
                    if (typeof(dataAttr) !== 'undefined') {
                        return dataAttr;
                    }
					return this.options.delay.show===0?0:this.options.delay.show||100;
				},
                getHideDelay:function(){
                    var dataAttr = this.$element.attr('data-delay-hide');
                    if (typeof(dataAttr) !== 'undefined') {
                        return dataAttr;
                    }
					return this.options.delay.hide===0?0:this.options.delay.hide||100;
				},
				getConstrains:function(){
                    var dataAttr = this.$element.attr('data-contrains');
                    if (typeof(dataAttr) !== 'undefined') {
                        return dataAttr;
                    }
					return this.options.constrains;
				},
				getAnimation:function(){
					var dataAttr = this.$element.attr('data-animation');
					return dataAttr||this.options.animation;
				},
				setTitle:function(title){
					var $titleEl = this.getTitleElement();
					if (title){
						$titleEl.html(title);
					}else{
						$titleEl.remove();
					}
				},
				hasContent:function () {
					return this.getContent();
				},
				getContent:function(){
					if (this.getUrl()){
						if (this.options.type==='iframe'){
							this.content = $('<iframe frameborder="0"></iframe>').attr('src',this.getUrl());
						}
					}else if (!this.content){
						var content='';
						if ($.isFunction(this.options.content)){
							content = this.options.content.apply(this.$element[0],arguments);
						}else{
							content = this.options.content;
						}
						this.content = this.$element.attr('data-content')||content;
					}
					return this.content;
				},
				setContent:function(content){
					var $target = this.getTarget();
					this.getContentElement().html(content);
					this.$target = $target;
				},
				isAsync:function(){
					return this.options.type==='async';
				},
				setContentASync:function(content){
					var that = this;
					this.xhr = $.ajax({
						url:this.getUrl(),
						type:'GET',
						cache:this.getCache(),
                        beforeSend:function(xhr) {
							if (that.options.async.before){
								that.options.async.before(that, xhr);
							}
                        },
						success:function(data){
							that.bindBodyEvents();
							if (content&&$.isFunction(content)){
								that.content = content.apply(that.$element[0],[data]);
							}else{
								that.content = data;
							}
							that.setContent(that.content);
							var $targetContent = that.getContentElement();
							$targetContent.removeAttr('style');
							that.displayContent();
							if (that.options.async.success){
								that.options.async.success(that, data);
							}
							this.xhr = null;
						}
					});
				},

				bindBodyEvents:function(){
					$('body').off('keyup.webui-popover').on('keyup.webui-popover',$.proxy(this.escapeHandler,this));
					$('body').off('click.webui-popover').on('click.webui-popover',$.proxy(this.bodyClickHandler,this));
				},

				/* event handlers */
				mouseenterHandler:function(){
					var self = this;
					if (self._timeout){clearTimeout(self._timeout);}
                    self._enterTimeout = setTimeout(function(){
					    if (!self.getTarget().is(':visible')){self.show();}
                    },this.getDelayShow());
				},
				mouseleaveHandler:function(){
					var self = this;
                    clearTimeout(self._enterTimeout);
					//key point, set the _timeout  then use clearTimeout when mouse leave
					self._timeout = setTimeout(function(){
						self.hide();
					},this.getHideDelay());
				},
				escapeHandler:function(e){
					if (e.keyCode===27){
						this.hideAll();
					}
				},
				bodyClickHandler:function(){
					if (this.getTrigger()==='click'){
						if (this._targetclick){
							this._targetclick = false;
						}else{
							this.hideAll();
						}
					}
				},

				targetClickHandler:function(){
					this._targetclick = true;
				},

				//reset and init the target events;
				initTargetEvents:function(){
					if (this.getTrigger()==='hover'){
						this.$target.off('mouseenter mouseleave')
									.on('mouseenter',$.proxy(this.mouseenterHandler,this))
									.on('mouseleave',$.proxy(this.mouseleaveHandler,this));
					}
					this.$target.find('.close').off('click').on('click', $.proxy(this.hide,this));
					this.$target.off('click.webui-popover').on('click.webui-popover',$.proxy(this.targetClickHandler,this));
				},
				/* utils methods */
				//caculate placement of the popover
				getPlacement:function(pos){
					var
						placement,
						de = document.documentElement,
						db = document.body,
						clientWidth = de.clientWidth,
						clientHeight = de.clientHeight,
						scrollTop = Math.max(db.scrollTop,de.scrollTop),
						scrollLeft = Math.max(db.scrollLeft,de.scrollLeft),
						pageX = Math.max(0,pos.left - scrollLeft),
						pageY = Math.max(0,pos.top - scrollTop);
						//arrowSize = 20;

					//if placement equals auto，caculate the placement by element information;
					if (typeof(this.options.placement)==='function'){
						placement = this.options.placement.call(this, this.getTarget()[0], this.$element[0]);
					}else{
						placement = this.$element.data('placement')||this.options.placement;
					}


					if (placement==='auto'){
						var constrainsH = this.getConstrains() === 'horizontal',
							constrainsV = this.getConstrains() === 'vertical';
						if (pageX<clientWidth/3){
							if (pageY<clientHeight/3){
								placement = constrainsH?'right-bottom':'bottom-right';
							}else if (pageY<clientHeight*2/3){
								if (constrainsV){
									placement = pageY<=clientHeight/2?'bottom-right':'top-right';
								}else{
									placement = 'right';
								}
							}else{
								placement =constrainsH?'right-top':'top-right';
							}
							//placement= pageY>targetHeight+arrowSize?'top-right':'bottom-right';
						}else if (pageX<clientWidth*2/3){
							if (pageY<clientHeight/3){
								if (constrainsH){
									placement =pageX<=clientWidth/2?'right-bottom':'left-bottom';
								}else{
									placement ='bottom';
								}
							}else if (pageY<clientHeight*2/3){
								if (constrainsH){
									placement = pageX<=clientWidth/2?'right':'left';
								}else{
									placement = pageY<=clientHeight/2?'bottom':'top';
								}
							}else{
								if (constrainsH){
									placement =pageX<=clientWidth/2?'right-top':'left-top';
								}else{
									placement ='top';
								}
							}
						}else{
							//placement = pageY>targetHeight+arrowSize?'top-left':'bottom-left';
							if (pageY<clientHeight/3){
								placement = constrainsH?'left-bottom':'bottom-left';
							}else if (pageY<clientHeight*2/3){
								if (constrainsV){
									placement = pageY<=clientHeight/2?'bottom-left':'top-left';
								}else{
									placement = 'left';
								}
							}else{
								placement = constrainsH?'left-top':'top-left';
							}
						}
					}else if (placement==='auto-top'){
						if (pageX<clientWidth/3){
							placement='top-right';
						}else if (pageX<clientHeight*2/3){
							placement='top';
						}else{
							placement='top-left';
						}
					}else if (placement==='auto-bottom'){
						if (pageX<clientWidth/3){
							placement='bottom-right';
						}else if (pageX<clientHeight*2/3){
							placement='bottom';
						}else{
							placement='bottom-left';
						}
					}else if (placement==='auto-left'){
						if (pageY<clientHeight/3){
							placement='left-top';
						}else if (pageY<clientHeight*2/3){
							placement='left';
						}else{
							placement='left-bottom';
						}
					}else if (placement==='auto-right'){
						if (pageY<clientHeight/3){
							placement='right-top';
						}else if (pageY<clientHeight*2/3){
							placement='right';
						}else{
							placement='right-bottom';
						}
					}
					return placement;
				},
				getElementPosition:function(){
					return $.extend({},this.$element.offset(), {
				        width: this.$element[0].offsetWidth,
				        height: this.$element[0].offsetHeight
				    });
				},

				getTargetPositin:function(elementPos,placement,targetWidth,targetHeight){
					var pos = elementPos,
						elementW = this.$element.outerWidth(),
						elementH = this.$element.outerHeight(),
						position={},
						arrowOffset=null,
						arrowSize = this.options.arrow?20:0,
						fixedW = elementW<arrowSize+10?arrowSize:0,
						fixedH = elementH<arrowSize+10?arrowSize:0;
					switch (placement) {
			          case 'bottom':
			            position = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - targetWidth / 2};
			            break;
			          case 'top':
			            position = {top: pos.top - targetHeight, left: pos.left + pos.width / 2 - targetWidth / 2};
			            break;
			          case 'left':
			            position = {top: pos.top + pos.height / 2 - targetHeight / 2, left: pos.left - targetWidth};
			            break;
			          case 'right':
			            position = {top: pos.top + pos.height / 2 - targetHeight / 2, left: pos.left + pos.width};
			            break;
			          case 'top-right':
			            position = {top: pos.top - targetHeight, left: pos.left-fixedW};
			            arrowOffset = {left: Math.min(elementW,targetWidth)/2 + fixedW};
			            break;
			          case 'top-left':
			            position = {top: pos.top - targetHeight, left: pos.left -targetWidth +pos.width + fixedW};
			            arrowOffset = {left: targetWidth - Math.min(elementW,targetWidth) /2 -fixedW};
			            break;
			          case 'bottom-right':
			            position = {top: pos.top + pos.height, left: pos.left-fixedW};
			            arrowOffset = {left: Math.min(elementW,targetWidth) /2+fixedW};
			            break;
					  case 'bottom-left':
			            position = {top: pos.top + pos.height, left: pos.left -targetWidth +pos.width+fixedW};
			            arrowOffset = {left: targetWidth- Math.min(elementW,targetWidth) /2 - fixedW};
			            break;
					  case 'right-top':
			            position = {top: pos.top -targetHeight + pos.height + fixedH, left: pos.left + pos.width};
			            arrowOffset = {top: targetHeight - Math.min(elementH,targetHeight)/2 -fixedH};
			            break;
			          case 'right-bottom':
			            position = {top: pos.top - fixedH, left: pos.left + pos.width};
			            arrowOffset = {top: Math.min(elementH,targetHeight) /2 +fixedH };
			            break;
			          case 'left-top':
			            position = {top: pos.top -targetHeight + pos.height+fixedH, left: pos.left - targetWidth};
			            arrowOffset = {top: targetHeight - Math.min(elementH,targetHeight)/2 - fixedH};
			            break;
					  case 'left-bottom':
			            position = {top: pos.top -fixedH , left: pos.left -targetWidth};
			            arrowOffset = {top: Math.min(elementH,targetHeight) /2 + fixedH };
			            break;

			        }
			        return {position:position,arrowOffset:arrowOffset};
				}
		};
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						var webuiPopover = $.data( this, 'plugin_' + pluginName );
						if (!webuiPopover) {
								if (!options){
									webuiPopover = new WebuiPopover( this, null);
								}else if (typeof options ==='string'){
									if (options!=='destroy'){
										webuiPopover = new WebuiPopover( this, null );
										webuiPopover[options]();
									}
								}else if (typeof options ==='object'){
									webuiPopover = new WebuiPopover( this, options );
								}
								$.data( this, 'plugin_' + pluginName, webuiPopover);
						}else{
							if (options==='destroy'){
								webuiPopover.destroy();
							}else if (typeof options ==='string'){
								webuiPopover[options]();
							}
						}
				});
		};

})( jQuery, window, document );


