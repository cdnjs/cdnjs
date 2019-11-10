webshim.register('sticky', function($, webshim, window, document, undefined, featureOptions){

	"use strict";

	var uid = 0;
	var stickys = 0;
	var $window = $(window);

	function getCssValue(property, value, noPrefixes) {
		var prop = property + ':',
			el = document.createElement('test'),
			mStyle = el.style;

		if (!noPrefixes) {
			mStyle.cssText = prop + [ '-webkit-', '-moz-', '-ms-', '-o-', '' ].join(value + ';' + prop) + value + ';';
		} else {
			mStyle.cssText = prop + value;
		}

		return mStyle[ property ];
	}

	function getPos() {
		return {
			top: $.css(this, 'top'),
			bottom: $.css(this, 'bottom')
		};
	}

	var getWinScroll = (function () {
		var docElem;
		var prop = 'pageYOffset';

		return (prop in window) ?
			function () {
				return window[ prop ];
			} :
			((docElem = document.documentElement), function () {
				return docElem.scrollTop;
			})
			;
	})();
	var isTouch = 'ontouchstart' in window || window.matchMedia('(max-device-width: 721px)').matches;
	var support = {
		fixed: getCssValue('position', 'fixed', true),
		sticky: getCssValue('position', 'sticky')
	};

	var stickyMixin = {
		getPosition: function () {

			if(!this.isSticky){
				this.position = {
					top: this.$el.css('top'),
					bottom: this.$el.css('bottom')
				};

				if (((
					(this.position.top != 'auto' && this.position.bottom != 'auto') ||
						this.position.top == 'auto' && this.position.bottom == 'auto')) && this.$el.css('position') == 'static') {
					this.position = $.swap(this.$el[0], {position: 'absolute'}, getPos);
				}

				if (this.position.top !== 'auto') {
					this.ankered = 'top';
				} else if (this.position.bottom !== 'auto') {
					this.ankered = 'bottom';
				}

				if(this.ankered == 'top'){
					this.position.top = parseFloat(this.position.top, 10) || 0;
				} else if(this.ankered == 'bottom'){
					this.position.bottom = parseFloat(this.position.bottom, 10) || 0;
				}

			}
		},
		update: function (full) {
			if (!this.disabled && this.$el[0].offsetWidth) {
				if (full) {
					if(this.isSticky){
						this.removeSticky();
					}
					this.getPosition();
				}
				this.updateDimension();
			}
		},
		setTdWidth: function(){
			if(this.isTable){
				this.$el.find('td, th').each(this._setInlineWidth);
			}
		},
		_setInlineWidth: function(){
			$.data(this, 'inlineWidth', this.style.width);
			$(this).innerWidth($(this).innerWidth());
		},
		_restoreInlineWidth: function(){
			this.style.width = $.data(this, 'inlineWidth') || '';
			$.removeData(this, 'inlineWidth');
		},
		removeSticky: function(){
			this.$el.removeClass('ws-sticky-on');
			this.$el.css(this.stickyData.inline);
			this.$placeholder.detach();
			this.isSticky = false;

			if(this.isTable){
				this.$el.find('td, th').each(this._restoreInlineWidth);
			}
		},
		commonAddEvents: function(){
			var enableDisable;
			var that = this;
			var update = function() {
				that.update();
			};

			var stickyMedia = this.$el.data('stickymedia');
			var media = window.matchMedia && stickyMedia ? matchMedia(stickyMedia) : false;
			$window.one('load', update);
			$(document).on('updateshadowdom' + this.evtid, update);


			this.$el.on('updatesticky'+ this.evtid, function(e){
				that.update(true);
				e.stopPropagation();
			});

			this.$el.on('disablesticky'+ this.evtid, function(e){
				that.disable(true);
				e.stopPropagation();
			});

			this.$el.on('enablesticky'+ this.evtid, function(e){
				that.disable(false);
				e.stopPropagation();
			});

			this.$el.on('remove'+ this.evtid+' destroysticky'+ this.evtid, function(e) {

				$window.off(that.evtid);
				$(document).off(that.evtid);
				that.$el.off(that.evtid);
				that.$parent.off(that.evtid);
				that.$el.removeData('wsSticky').removeClass('ws-sticky');
				if (that.$placeholder) {
					that.$el.removeClass('ws-sticky-on');
					that.$placeholder.remove();
				}
				stickys--;
				e.stopPropagation();
			});

			if(media && media.addListener){
				enableDisable = function(){
					that.disable(!media.matches);
				};
				media.addListener(enableDisable);
				enableDisable();
			}
		},
		disable: function(disable){
			if(!arguments.length){
				return this.disabled;
			}
			if(this.disabled != disable){
				this.disabled = !!disable;
				if(this.disabled){
					if(this.isSticky){
						this.removeSticky();
					}
				} else {
					this.update(true);
				}
			}
		},
		setSticky: function(){

			if (!this.$placeholder) {
				this.$placeholder =  this.isTable ? $(this.$el[0].cloneNode(true)) : $(document.createElement(this.$el[0].nodeName || 'div'));
				this.$placeholder.addClass('ws-fixedsticky-placeholder').removeClass('ws-sticky');
			}

			this.setTdWidth();

			this.$placeholder
				.insertAfter(this.$el)
				.outerHeight(this.stickyData.outerHeight, true)
				.outerWidth(this.stickyData.outerWidth)
			;

			this.isSticky = true;
			this.$el.addClass('ws-sticky-on');

			if(!this.isTable){
				if( this.stickyData.width != this.$el.width()){
					this.$el.width(this.stickyData.width);
				}
			}
		},
		getCommonStickyData: function(){
			var marginTop = (parseFloat(this.$el.css('marginTop'), 10) || 0);

			this.stickyData.scrollTop = this.stickyData.top - marginTop;

			this.stickyData.outerHeight = this.$el.outerHeight(true);

			this.stickyData.bottom = this.stickyData.top + this.stickyData.outerHeight - marginTop;

			this.stickyData.width = this.$el.width();
			this.stickyData.outerWidth = this.$el.outerWidth();

			this.stickyData.marginLeft = parseFloat(this.$el.css('marginLeft'), 10) || 0;
			this.stickyData.offsetLeft = this.$el[0].offsetLeft;

			this.stickyData.inline.width = this.elStyle.width;
			this.stickyData.inline.marginLeft = this.elStyle.marginLeft;

			if(this.ankered == 'top'){
				this.stickyData.inline.top = this.elStyle.top;
			} else if(this.ankered == 'bottom'){
				this.stickyData.inline.bottom = this.elStyle.bottom;
			}
		},
		getCommonParentData: function(){
			this.parentData.paddingTop = (parseFloat(this.$parent.css('paddingTop'), 10) || 0);

			this.parentData.offsetTop = this.$parent.offset().top;
			this.parentData.top = this.parentData.offsetTop + (parseFloat(this.$parent.css('borderTopWidth'), 10) || 0) + this.parentData.paddingTop;

			this.parentData.height = this.$parent.height();
			this.parentData.bottom = this.parentData.top + this.parentData.height;
		}
	};

	if(isTouch && featureOptions.touchStrategy == 'disable'){return;}


	function Sticky(dom) {

		uid++;
		stickys++;

		this.evtid = '.wsstickyid' + uid;
		this.$el = $(dom).data('wsSticky', this);
		this.isTable = this.$el.is('thead, tbody, tfoot');
		this.$parent = this.$el.parent();
		this.elStyle = dom.style;


		this.ankered = '';
		this.isSticky = false;
		this.$placeholder = null;

		this.stickyData = {inline: {}};
		this.parentData = {};

		this.getParentData = this.getCommonParentData;


		this.addEvents();
		this.update(true);
	}

	$.extend(Sticky.prototype, stickyMixin, {
		addEvents: function () {
			var that = this;

			this.commonAddEvents();

			$window
				.on('scroll' + this.evtid, function () {
					if (!that.disabled && that.ankered && that.$el[0].offsetWidth) {
						that.updatePos();
					}
				})
			;
		},

		getStickyData: function(){
			this.stickyData.top = this.$el.offset().top;

			this.getCommonStickyData();
		},

		updateDimension: function(fromPos){
			if(this.isSticky){
				this.removeSticky();
			}
			this.getParentData();
			this.getStickyData();

			if (this.ankered == 'bottom') {
				this.viewportBottomAnker = $window.height() - this.position.bottom;
			}

			if(!fromPos && this.ankered){
				this.updatePos(true);
			}
		},
		updatePos: function(fromDimension){
			var offset, shouldSticky, shouldMoveWith;
			var scroll = getWinScroll();

			if (this.ankered == 'top') {
				offset = scroll + this.position.top;
				if(this.stickyData.scrollTop < offset && scroll - 9 <= this.parentData.bottom){
					shouldMoveWith = ((offset + this.stickyData.outerHeight) - this.parentData.bottom) * -1;

					shouldSticky =  true;
				}
			} else if (this.ankered == 'bottom') {
				offset = scroll + this.viewportBottomAnker;

				if(this.stickyData.bottom > offset &&
					offset + 9 >= this.parentData.top){
					shouldSticky =  true;

					shouldMoveWith = offset - this.parentData.top - this.stickyData.outerHeight;
				}
			}

			if (shouldSticky) {
				if (!this.isSticky) {

					//updateDimension before layout trashing
					if(!fromDimension){
						this.updateDimension(true);
					}

					this.setSticky();
				}


				if(shouldMoveWith < 0){
					if(this.ankered == 'top'){
						this.elStyle.top = this.position.top + shouldMoveWith +'px';
					} else if(this.ankered == 'bottom'){
						this.elStyle.bottom = this.position.bottom + shouldMoveWith +'px';
					}
				}
			} else if (this.isSticky) {
				this.removeSticky();
			}
		}
	});


	function StickyParent(dom) {

		uid++;
		stickys++;

		this.evtid = '.wsstickyid' + uid;
		this.$el = $(dom).data('wsSticky', this);
		this.isTable = this.$el.is('thead, tbody, tfoot');
		this.$parent = this.$el.parent();
		this.elStyle = dom.style;


		this.ankered = '';
		this.isSticky = false;
		this.$placeholder = null;

		this.stickyData = {inline: {}};
		this.parentData = {};

		if(this.$parent.css('position') == 'static'){
			this.$parent.css('position', 'relative');
		}

		this.updatePos2 = this.updatePos2.bind(this);

		this.addEvents();
		this.update(true);

	}

	$.extend(StickyParent.prototype, stickyMixin, {
		addEvents: function () {
			var that = this;

			this.commonAddEvents();

			this.$parent
				.on('scroll' + this.evtid, function () {
					if (that.ankered && that.$el[0].offsetWidth) {
						that.updatePos();
					}
				})
			;
		},
		getStickyData: function(){
			this.stickyData.top = this.$el[0].offsetTop;

			this.getCommonStickyData();
		},
		getParentData: function(){
			this.getCommonParentData();

			this.parentData.offsetBottom = this.parentData.top + this.$parent.outerHeight();
		},
		updateDimension: function(fromPos){
			var add;
			if(this.isSticky){
				this.removeSticky();
			}
			this.getParentData();
			this.getStickyData();

			this.viewport = $window.height();

			if(this.ankered == 'top'){
				add = Math.abs(this.position.top) + 9;
			} else if(this.ankered == 'bottom') {
				add = Math.abs(this.position.bottom) + 9;
				this.viewportBottomAnker = this.viewport - this.parentData.bottom;
				this.compareBottom = this.stickyData.bottom + this.position.bottom;

				this.addBottom = (this.parentData.bottom - this.parentData.paddingTop) - this.viewport;
			}

			this.viewPortMax = this.parentData.offsetBottom + add + 10;
			this.viewPortMin = this.parentData.offsetTop - add - this.viewport;

			if(!fromPos){
				this.updatePos(true);
			}
		},
		updatePos: function(fromDimension){
			var offset, shouldSticky;
			var scroll = this.$parent[0].scrollTop;

			if (this.ankered == 'top') {
				offset = scroll + this.position.top ;
				if(this.stickyData.scrollTop - this.parentData.paddingTop < offset){
					shouldSticky =  true;
				}
			} else if (this.ankered == 'bottom') {
				if(scroll + this.parentData.height < this.compareBottom){
					shouldSticky =  true;
				}
			}

			if (shouldSticky) {
				if (!this.isSticky) {

					//updateDimension before layout trashing
					if(!fromDimension){
						this.updateDimension(true);
					}

					this.setSticky();

					$window
						.off('scroll' + this.evtid, this.updatePos2)
						.on('scroll' + this.evtid, this.updatePos2)
					;
					this.updatePos2(true);
				}
			} else if (this.isSticky) {
				this.removeSticky();
				$window.off('scroll' + this.evtid, this.updatePos2);
			}
		},
		updatePos2: function(init){
			var scrollTop = getWinScroll();

			if(init === true || (this.viewPortMax > scrollTop && scrollTop > this.viewPortMin)){

				if(this.ankered == 'top'){
					if(init === true || (this.viewPortMax > scrollTop && scrollTop > this.viewPortMin)){
						this.elStyle.top = this.position.top + this.parentData.top - scrollTop +'px';
					}
				} else if(this.ankered == 'bottom'){
					this.elStyle.bottom = this.position.bottom + (scrollTop - this.addBottom) +'px';
				}
			}
		}
	});

	var loadDomSupport = function(){
		loadDomSupport = $.noop;
		webshim.ready('WINDOWLOAD', function(){
			webshim.loader.loadList(['dom-extend']);
			webshim.ready('dom-extend', function(){
				webshim.addShadowDom();
			});
		});
	};

	var addSticky = function(){
		var stickyData = $.data(this, 'wsSticky');
		if(!stickyData){
			var $parent = $(this).parent();
			$(this).addClass('ws-sticky');
			if(($parent.css('overflowY') || $parent.css('overflow') || 'visible') == 'visible'){
				new Sticky(this);
			} else {
				//webshim.warn('currently not supported');
				new StickyParent(this);
			}
			loadDomSupport();
		} else if(stickyData.disable) {
			stickyData.disable(false);
		}
	};

	if (!support.sticky && support.fixed) {
		var selectors = {};
		var createUpdateDomSearch = function(media, sels){
			var i, created, elems;

			var updated = [];

			if(!selectors[media]){
				selectors[media] = {sels: {}, string: '',
					fn: function(context, insertedElement){
						var elems = $(selectors[media].string, context).add(insertedElement.filter(selectors[media].string));
						if(media){
							elems.data('stickymedia', media);
						}
						elems.each(addSticky);
					}
				};
				created = true;
			}

			for(i = 0; i < sels.length; i++){
				if(!selectors[media].sels[sels[i]]){
					selectors[media].sels[sels[i]] = true;
					updated.push(sels[i]);
				}
			}

			if(!created && !updated.length){return;}

			selectors[media].string = Object.keys(selectors[media].sels).join(', ');

			if(created){
				$(function(){
					webshim.addReady(selectors[media].fn);
				});
			} else if($.isReady){
				elems = $(updated.join(', '));
				if(media){
					elems.data('stickymedia', media);
				}
				elems.each(addSticky);
			}
		};
		createUpdateDomSearch('', ['.ws-sticky']);

		$(function(){
			$(document).on('wssticky', function(e){
				addSticky.call(e.target);
			});
		});


		if(featureOptions.parseCSS){
			if(window.Polyfill && Polyfill.prototype && Polyfill.prototype.doMatched){
				var onEnableRule = function(rule){
					var curSelectors = rule.getSelectors().split(/\,\s*/g);
					var media = (!rule._rule.media || !rule._rule.media.length) ? '' : rule.getMedia();
					createUpdateDomSearch(media || '', curSelectors);
				};

				Polyfill({declarations:["position:sticky"]})
					.doMatched(function(rules){
						rules.each(onEnableRule);
					})
				;

			} else {
				webshim.warn('Polyfill for CSS polyfilling made easy has to be included');
			}
		}
	}

	if(document.readyState == 'complete'){
		webshim.isReady('WINDOWLOAD', true);
	}
});
