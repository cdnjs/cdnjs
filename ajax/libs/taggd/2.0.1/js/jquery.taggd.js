/*!
 * jQuery Taggd
 * A helpful plugin that helps you adding 'tags' on images.
 *
 * License: MIT
 */

(function($) {
	'use strict';
	
	var defaults = {
		align: {
			x: 'center',
			y: 'center'
		},

		handlers: {},

		offset: {
			left: 0,
			top: 0
		}
	};
	
	var methods = {
		show: function() {
			var $this = $(this);
			
			$this.addClass('active');
			$this.next().addClass('show');
		},
		
		hide: function() {
			var $this = $(this);
			
			$this.removeClass('active');
			$this.next().removeClass('show');
		},
		
		toggle: function() {
			var $hover = $(this).next();
			
			if($hover.hasClass('show')) {
				methods.hide.call(this);
			} else {
				methods.show.call(this);
			}
		}
	};
	
	
	/****************************************************************
	 * TAGGD
	 ****************************************************************/
	
	var Taggd = function(element, options, data) {
		var _this = this;
		
		this.element = $(element);
		this.options = $.extend(true, {}, defaults, options);
		this.data = data;
		this.initialized = false;
		
		if(!this.element.height() || !this.element.width()) {
			this.element.on('load', _this.initialize.bind(this));
		} else this.initialize();
	};
	
	
	/****************************************************************
	 * INITIALISATION
	 ****************************************************************/
	
	Taggd.prototype.initialize = function() {
		var _this = this;
		
		this.initialized = true;
		
		this.initWrapper();
		this.addDOM();
		this.updateDOM();
		
		$(window).resize(function() {
			_this.updateDOM();
		});
	};
	
	Taggd.prototype.initWrapper = function() {
		var wrapper = $('<div class="taggd-wrapper" />');
		this.element.wrap(wrapper);
		
		this.wrapper = this.element.parent('.taggd-wrapper');
	};
	
	
	/****************************************************************
	 * DATA MANAGEMENT
	 ****************************************************************/
	
	Taggd.prototype.addData = function(data) {
		if($.isArray(data)) {
			this.data = $.merge(this.data, data);
		} else {
			this.data.push(data);
		}
		
		if(this.initialized) {
			this.addDOM();
			this.updateDOM();
		}
	};
	
	Taggd.prototype.setData = function(data) {
		this.data = data;
		
		if(this.initialized) {
			this.addDOM();
			this.updateDOM();
		}
	};
	
	Taggd.prototype.clear = function() {
		if(!this.initialized) return;
		this.wrapper.find('.taggd-item, .taggd-item-hover').remove();
	};
	
	
	/****************************************************************
	 * TAGS MANAGEMENT
	 ****************************************************************/
	
	Taggd.prototype.iterateTags = function(a, yep) {
		var func;
		
		if($.isNumeric(a)) {
			func = function(i, e) { return a === i; };
		} else if(typeof a === 'string') {
			func = function(i, e) { return $(e).is(a); }
		} else if($.isArray(a)) {
			func = function(i, e) {
				var $e = $(e);
				var result = false;
				
				$.each(a, function(ai, ae) {
					if(
						i === ai ||
						e === ae ||
						$e.is(ae)
					) {
						result = true;
						return false;
					}
				});
				
				return result;
			}
		} else if(typeof a === 'object') {
			func = function(i, e) {
				var $e = $(e);
				return $e.is(a);
			};
		} else if($.isFunction(a)) {
			func = a;
		} else if(!a) {
			func = function() { return true; }
		} else return this;
		
		this.wrapper.find('.taggd-item').each(function(i, e) {
			if(typeof yep === 'function' && func.call(this, i, e)) {
				yep.call(this, i, e);
			}
		});
		
		return this;
	};
	
	Taggd.prototype.show = function(a) {
		return this.iterateTags(a, methods.show);
	};
	
	Taggd.prototype.hide = function(a) {
		return this.iterateTags(a, methods.hide);
	};
	
	Taggd.prototype.toggle = function(a) {
		return this.iterateTags(a, methods.toggle);
	};
	
	/****************************************************************
	 * CLEANING UP
	 ****************************************************************/
	
	Taggd.prototype.dispose = function() {
		this.clear();
		this.element.unwrap(this.wrapper);
	};
	
	
	/****************************************************************
	 * SEMI-PRIVATE
	 ****************************************************************/
	
	Taggd.prototype.addDOM = function() {
		var _this = this;
		
		this.clear();
		this.element.css({ height: 'auto', width: 'auto' });
		
		var height = this.element.height();
		var width = this.element.width();
		
		$.each(this.data, function(i, v) {
			var $item = $('<span />');
			var $hover;
			
			if(
				v.x > 1 && v.x % 1 === 0 &&
				v.y > 1 && v.y % 1 === 0
			) {
				v.x = v.x / width;
				v.y = v.y / height;
			}
			
			if(typeof v.attributes === 'object') {
				$item.attr(v.attributes);
			}
			
			$item.attr({
				'data-x': v.x,
				'data-y': v.y
			});
			
			$item.css('position', 'absolute');
			$item.addClass('taggd-item');
			
			_this.wrapper.append($item);
			
			if(typeof v.text === 'string' && v.text.length > 0) {
				$hover = $('<span class="taggd-item-hover" style="position: absolute;" />').html(v.text);
				
				$hover.attr({
					'data-x': v.x,
					'data-y': v.y
				});
				
				_this.wrapper.append($hover);
			}
			
			if(typeof _this.options.handlers === 'object') {
				$.each(_this.options.handlers, function(event, func) {
					var handler;
					
					if(typeof func === 'string' && methods[func]) {
						handler = methods[func];
					} else if(typeof func === 'function') {
						handler = func;
					}
					
					$item.on(event, function(e) {
						if(!handler) return;
						handler.call($item, e, _this.data[i]);
					});
				});
			}
		});
		
		this.element.removeAttr('style');
	};
	
	Taggd.prototype.updateDOM = function() {
		var _this = this;
		
		this.wrapper.removeAttr('style').css({
			height: this.element.height(),
			width: this.element.width()
		});
		
		this.wrapper.find('span').each(function(i, e) {
			var $el = $(e);
			
			var left = $el.attr('data-x') * _this.element.width();
			var top = $el.attr('data-y') * _this.element.height();
			
			if($el.hasClass('taggd-item')) {
				$el.css({
					left: left - $el.outerWidth(true) / 2,
					top: top - $el.outerHeight(true) / 2
				});
			} else if($el.hasClass('taggd-item-hover')) {
				if(_this.options.align.x === 'center') {
					left -= $el.outerWidth(true) / 2;
				} else if(_this.options.align.x === 'right') {
					left -= $el.outerWidth(true);
				}
				
				if(_this.options.align.y === 'center') {
					top -= $el.outerHeight(true) / 2;
				} else if(_this.options.align.y === 'bottom') {
					top -= $el.outerHeight(true);
				}
				
				$el.attr('data-align', $el.outerWidth(true));
				
				$el.css({
					left: left + _this.options.offset.left,
					top: top + _this.options.offset.top
				});
			}
		});
	};
	
	
	/****************************************************************
	 * JQUERY LINK
	 ****************************************************************/
	
	$.fn.taggd = function(options, data) {
		return new Taggd(this, options, data);
	};
})(jQuery);