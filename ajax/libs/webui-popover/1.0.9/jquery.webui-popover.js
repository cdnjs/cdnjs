/*
 *  webui popover plugin  - v1.0.5
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
					template:'<div class="webui-popover">'+
								'<div class="arrow"></div>'+
								'<div class="webui-popover-inner">'+
									'<a href="#" class="close">x</a>'+
									'<h3 class="webui-popover-title"></h3>'+
									'<div class="webui-popover-content"><i class="icon-refresh"></i> <p>&nbsp;</p></div>'+
								'</div>'+
							'</div>'
		};


		// The actual plugin constructor
		function WebuiPopover ( element, options ) {
				this.$element = $(element);
                if($.type(options.delay) === 'string' || $.type(options.delay) === 'number') {
                    options.delay = {show:null,hide:options.delay}; // bc break fix
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
					if (this.options.trigger==='click'){
						this.$element.off('click').on('click',$.proxy(this.toggle,this));
					}else{
						this.$element.off('mouseenter mouseleave')
										.on('mouseenter',$.proxy(this.mouseenterHandler,this))
										.on('mouseleave',$.proxy(this.mouseleaveHandler,this));
					}
					this._poped = false;
					this._inited = true;
				},
				/* api methods and actions */
				destroy:function(){
					this.hide();
					this.$element.data('plugin_'+pluginName,null);
					if (this.options.trigger==='click'){
						this.$element.off('click');
					}else{
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
					if (!this.options.cache||!this._poped){
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
					$target.remove().css({ top: -1000, left: -1000, display: 'block' }).appendTo(document.body);
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
				getTarget:function(){
					if (!this.$target){
						this.$target = $(this.options.template);
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
					return this.options.title||this.$element.attr('data-title')||this.$element.attr('title');
				},
				getUrl:function(){
					return this.options.url||this.$element.attr('data-url');
				},
                getDelayShow:function(){
					return this.options.delay.show||this.$element.attr('data-delay-show')||0;
				},
                getHideDelay:function(){
					return this.options.delay.hide||this.$element.attr('data-delay-hide')||300;
				},
				getConstrains:function(){
					return this.options.constrains||this.$element.attr('data-contrains');
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
					$.ajax({
						url:this.getUrl(),
						type:'GET',
						cache:this.options.cache,
                        beforeSend:function(xhr) {
							if (that.options.async.before){
								that.options.async.before(that, xhr);
							}
                        },
						success:function(data){
							if (content&&$.isFunction(content)){
								that.content = content.apply(that.$element[0],[data]);
							}else{
								that.content = data;
							}
							that.setContent(that.content);
							var $targetContent = that.getContentElement();
							$targetContent.removeAttr('style');
							that.displayContent();
							if (that.options.async.before){
								that.options.async.success(that, data);
							}
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
					if (this._targetclick){
						this._targetclick = false;
					}else{
						this.hideAll();
					}
				},

				targetClickHandler:function(){
					this._targetclick = true;
				},

				//reset and init the target events;
				initTargetEvents:function(){
					if (this.options.trigger!=='click'){
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
			            arrowOffset = {left: elementW/2 + fixedW};
			            break;
			          case 'top-left':
			            position = {top: pos.top - targetHeight, left: pos.left -targetWidth +pos.width + fixedW};
			            arrowOffset = {left: targetWidth - elementW /2 -fixedW};
			            break;
			          case 'bottom-right':
			            position = {top: pos.top + pos.height, left: pos.left-fixedW};
			            arrowOffset = {left: elementW /2+fixedW};
			            break;
					  case 'bottom-left':
			            position = {top: pos.top + pos.height, left: pos.left -targetWidth +pos.width+fixedW};
			            arrowOffset = {left: targetWidth- elementW /2 - fixedW};
			            break;
					  case 'right-top':
			            position = {top: pos.top -targetHeight + pos.height + fixedH, left: pos.left + pos.width};
			            arrowOffset = {top: targetHeight - elementH/2 -fixedH};
			            break;
			          case 'right-bottom':
			            position = {top: pos.top - fixedH, left: pos.left + pos.width};
			            arrowOffset = {top: elementH /2 +fixedH };
			            break;
			          case 'left-top':
			            position = {top: pos.top -targetHeight + pos.height+fixedH, left: pos.left - targetWidth};
			            arrowOffset = {top: targetHeight - elementH/2 - fixedH};
			            break;
					  case 'left-bottom':
			            position = {top: pos.top , left: pos.left -targetWidth};
			            arrowOffset = {top: elementH /2 };
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


