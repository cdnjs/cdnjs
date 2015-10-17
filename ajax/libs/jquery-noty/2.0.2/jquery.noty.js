/**
* noty - jQuery Notification Plugin v2.0.2
* Contributors: https://github.com/needim/noty/graphs/contributors
*
* Examples and Documentation - http://needim.github.com/noty/
*
* Licensed under the MIT licenses:
* http://www.opensource.org/licenses/mit-license.php
*
**/

if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		function F() {};
		F.prototype = o;
		return new F();
	};
};

;(function($) {

	var NotyObject = {

		init: function(options) {

			// Mix in the passed in options with the default options
			this.options = $.extend({}, $.noty.defaults, options);

			this.options.layout = (this.options.custom) ? $.noty.layouts['inline'] : $.noty.layouts[this.options.layout];
			this.options.theme = $.noty.themes[this.options.theme];

			delete options.layout, delete options.theme;

			this.options = $.extend({}, this.options, this.options.layout.options);
			this.options.id = 'noty_' + (new Date().getTime() * Math.floor(Math.random()* 1000000));

			this.options = $.extend({}, this.options, options);

			// Build the noty dom initial structure
			this._build();

			// return this so we can chain/use the bridge with less code.
			return this;
		}, // end init

		_build: function() {

			// Generating noty bar
			var $bar = $('<div class="noty_bar"/>').attr('id', this.options.id);
			$bar.append(this.options.template).find('.noty_text').html(this.options.text);

			this.$bar = (this.options.layout.parent.object !== null) ? $(this.options.layout.parent.object).css(this.options.layout.parent.css).append($bar) : $bar;

			// Set buttons if available
			if (this.options.buttons) {

				// If we have button disable closeWith & timeout options
				this.options.closeWith = [], this.options.timeout = false;

				var $buttons = $('<div/>').addClass('noty_buttons');

				(this.options.layout.parent.object !== null) ? this.$bar.find('.noty_bar').append($buttons) : this.$bar.append($buttons);

				var self = this;

				$.each(this.options.buttons, function(i, button) {
					var $button = $('<button/>').addClass((button.addClass) ? button.addClass : 'gray').html(button.text)
					.appendTo(self.$bar.find('.noty_buttons'))
					.bind('click', function(e) { if ($.isFunction(button.onClick)) { button.onClick.call($button, self); } });
				});
			}

			// For easy access
			this.$message = this.$bar.find('.noty_message');
			this.$closeButton = this.$bar.find('.noty_close');
			this.$buttons = this.$bar.find('.noty_buttons');

			$.noty.store[this.options.id] = this; // store noty for api

		}, // end _build

		show: function() {

			var self = this;

			$(self.options.layout.container.selector).append(self.$bar);

			self.options.theme.style.apply(self);

			($.type(self.options.layout.css) === 'function') ? this.options.layout.css.apply(self.$bar) : self.$bar.css(this.options.layout.css || {});

			self.$bar.addClass(self.options.layout.addClass);

			self.options.layout.container.style.apply($(self.options.layout.container.selector));

			self.options.theme.callback.onShow.apply(this);

			if ($.inArray('click', self.options.closeWith) > -1)
				self.$bar.css('cursor', 'pointer').one('click', function() { self.close(); });

			if ($.inArray('hover', self.options.closeWith) > -1)
				self.$bar.one('mouseenter', function() { self.close(); });

			if ($.inArray('button', self.options.closeWith) > -1)
				self.$closeButton.one('click', function() { self.close(); });

			if ($.inArray('button', self.options.closeWith) == -1)
				self.$closeButton.remove();

			if (self.options.callback.onShow)
				self.options.callback.onShow.apply(self);

			self.$bar.animate(
					self.options.animation.open,
					self.options.animation.speed,
					self.options.animation.easing,
					function() { 
						if (self.options.callback.afterShow) self.options.callback.afterShow.apply(self);
						self.shown = true;
					});

			// If noty is have a timeout option
			if (self.options.timeout)
				self.$bar.delay(self.options.timeout).promise().done(function() { self.close(); });

			return this;

		}, // end show

		close: function() {

			if (this.closed) return;

			var self = this;

			if (!this.shown) { // If we are still waiting in the queue just delete from queue
				$.each($.noty.queue, function(i, n) {
					if (n.options.id == self.options.id) {
						$.noty.queue.splice(i, 1);
					}
				});
				return;
			}

			self.$bar.addClass('i-am-closing-now');

			if (self.options.callback.onClose) { self.options.callback.onClose.apply(self); }

			self.$bar.clearQueue().stop().animate(
					self.options.animation.close,
					self.options.animation.speed,
					self.options.animation.easing,
					function() { if (self.options.callback.afterClose) self.options.callback.afterClose.apply(self); })
				.promise().done(function() {

					// Modal Cleaning
					if (self.options.modal) {
						$.notyRenderer.setModalCount(-1);
						if ($.notyRenderer.getModalCount() == 0) $('.noty_modal').fadeOut('fast', function() { $(this).remove(); });
					}

					// Layout Cleaning
					$.notyRenderer.setLayoutCountFor(self, -1);
					if ($.notyRenderer.getLayoutCountFor(self) == 0) $(self.options.layout.container.selector).remove();

					self.$bar.remove();
					self.$bar = null;
					self.closed = true;

					delete $.noty.store[self.options.id]; // deleting noty from store

					self.options.theme.callback.onClose.apply(self);

					if (!self.options.dismissQueue) {
						// Queue render
						$.noty.ontap = true;

						$.notyRenderer.render();
					}

				});

		}, // end close

		setText: function(text) {
			if (!this.closed) {
				this.options.text = text;
				this.$bar.find('.noty_text').html(text);
			}
			return this;
		},

		setType: function(type) {
			if (!this.closed) {
				this.options.type = type;
				this.options.theme.style.apply(this);
				this.options.theme.callback.onShow.apply(this);
			}
			return this;
		},

		closed: false,
		shown: false

	}; // end NotyObject

	$.notyRenderer = {};

	$.notyRenderer.init = function(options) {

		// Renderer creates a new noty
		var notification = Object.create(NotyObject).init(options);

		(notification.options.force) ? $.noty.queue.unshift(notification) : $.noty.queue.push(notification); 

		$.notyRenderer.render();

		return ($.noty.returns == 'object') ? notification : notification.options.id;
	};

	$.notyRenderer.render = function() {

		var instance = $.noty.queue[0];

		if ($.type(instance) === 'object') {
			if (instance.options.dismissQueue) {
				$.notyRenderer.show($.noty.queue.shift());
			} else {
				if ($.noty.ontap) {
					$.notyRenderer.show($.noty.queue.shift());
					$.noty.ontap = false;
				}
			}
		} else {
			$.noty.ontap = true; // Queue is over
		}

	};

	$.notyRenderer.show = function(notification) {

		if (notification.options.modal) {
			$.notyRenderer.createModalFor(notification);
			$.notyRenderer.setModalCount(+1);
		}

		// Where is the container?
		if ($(notification.options.layout.container.selector).length == 0) {
			if (notification.options.custom) {
				notification.options.custom.append($(notification.options.layout.container.object).addClass('i-am-new'));
			} else {
				$('body').append($(notification.options.layout.container.object).addClass('i-am-new'));
			}
		} else {
			$(notification.options.layout.container.selector).removeClass('i-am-new');
		}

		$.notyRenderer.setLayoutCountFor(notification, +1);

		notification.show();
	};

	$.notyRenderer.createModalFor = function(notification) {
		if ($('.noty_modal').length == 0) 
			$('<div/>').addClass('noty_modal').data('noty_modal_count', 0).css(notification.options.theme.modal.css).prependTo($('body')).fadeIn('fast'); 
	};

	$.notyRenderer.getLayoutCountFor = function(notification) {
		return $(notification.options.layout.container.selector).data('noty_layout_count') || 0; 
	};

	$.notyRenderer.setLayoutCountFor = function(notification, arg) {
		return $(notification.options.layout.container.selector).data('noty_layout_count', $.notyRenderer.getLayoutCountFor(notification) + arg); 
	};

	$.notyRenderer.getModalCount = function() {
		return $('.noty_modal').data('noty_modal_count') || 0;
	};

	$.notyRenderer.setModalCount = function(arg) {
		return $('.noty_modal').data('noty_modal_count', $.notyRenderer.getModalCount() + arg); 
	};

	// This is for custom container
	$.fn.noty = function(options) {
		options.custom = $(this);
		return $.notyRenderer.init(options);
	};
	 
	$.noty = {};
	$.noty.queue = [];
	$.noty.ontap = true;
	$.noty.layouts = {};
	$.noty.themes = {};
	$.noty.returns = 'object';
	$.noty.store = {};

	$.noty.get = function(id) {
		return $.noty.store.hasOwnProperty(id) ? $.noty.store[id] : false;
	};

	$.noty.close = function(id) {
		return $.noty.get(id) ? $.noty.get(id).close() : false;
	};

	$.noty.setText = function(id, text) {
		return $.noty.get(id) ? $.noty.get(id).setText(text) : false;
	};

	$.noty.setType = function(id, type) {
		return $.noty.get(id) ? $.noty.get(id).setType(type) : false;
	};

	$.noty.clearQueue = function() {
		$.noty.queue = [];
	};

	$.noty.closeAll = function() {
		$.noty.clearQueue();
		$.each($.noty.store, function(id, noty) {
			noty.close();
		});
	};

	var windowAlert = window.alert;

	$.noty.consumeAlert = function(options) {
		window.alert = function(text) {
			if (options)
				options.text = text;
			else 
				options = {text:text};

			$.notyRenderer.init(options);
		};
	};

	$.noty.stopConsumeAlert = function(){
		window.alert = windowAlert;
	};

	$.noty.defaults = {
		layout: 'top',
		theme: 'default',
		type: 'alert',
		text: '',
		dismissQueue: true,
		template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
		animation: {
			open: {height: 'toggle'},
			close: {height: 'toggle'},
			easing: 'swing',
			speed: 500
		},
		timeout: false,
		force: false,
		modal: false,
		closeWith: ['click'],
		callback: {
			onShow: function() {},
			afterShow: function() {},
			onClose: function() {},
			afterClose: function() {}
		},
		buttons: false
	};

	$(window).resize(function() {
		$.each($.noty.layouts, function(index, layout) {
			layout.container.style.apply($(layout.container.selector));
		});
	});

})(jQuery);

// Helpers
function noty(options) {

	// This is for BC  -  Will be deleted on v2.2.0
	var using_old = 0
	,	old_to_new = {
		'animateOpen': 'animation.open',
		'animateClose': 'animation.close',
		'easing': 'animation.easing',
		'speed': 'animation.speed',
		'onShow': 'callback.onShow',
		'onShown': 'callback.afterShow',
		'onClose': 'callback.onClose',
		'onClosed': 'callback.afterClose'
	}

	$.each(options, function(key, value) {
		if (old_to_new[key]) {
			using_old++;
			var _new = old_to_new[key].split('.');

			if (!options[_new[0]]) options[_new[0]] = {};

			options[_new[0]][_new[1]] = (value) ? value : function() {};
			delete options[key];
		}
	});

	if (!options.closeWith) {
		options.closeWith = $.noty.defaults.closeWith;
	}

	if (options.hasOwnProperty('closeButton')) {
		using_old++;
		if (options.closeButton) options.closeWith.push('button');
		delete options.closeButton;
	}

	if (options.hasOwnProperty('closeOnSelfClick')) {
		using_old++;
		if (options.closeOnSelfClick) options.closeWith.push('click');
		delete options.closeOnSelfClick;
	}

	if (options.hasOwnProperty('closeOnSelfOver')) {
		using_old++;
		if (options.closeOnSelfOver) options.closeWith.push('hover');
		delete options.closeOnSelfOver;
	}

	if (options.hasOwnProperty('custom')) {
		using_old++;
		if (options.custom.container != 'null') options.custom = options.custom.container;
	}

	if (options.hasOwnProperty('cssPrefix')) {
		using_old++;
		delete options.cssPrefix;
	}

	if (options.theme == 'noty_theme_default') {
		using_old++;
		options.theme = 'default';
	}

	if (!options.hasOwnProperty('dismissQueue')) {
		if (options.layout == 'topLeft'
			|| options.layout == 'topRight' 
			|| options.layout == 'bottomLeft'
			|| options.layout == 'bottomRight') {
			options.dismissQueue = true;
		} else {
			options.dismissQueue = false;
		}
	}

	if (options.buttons) {
		$.each(options.buttons, function(i, button) {
			if (button.click) {
				using_old++;
				button.onClick = button.click;
				delete button.click;
			}
			if (button.type) {
				using_old++;
				button.addClass = button.type;
				delete button.type;
			}
		});
	}

	if (using_old) console.warn('You are using noty v2 with v1.x.x options. @deprecated until v2.2.0 - Please update your options.');

	// console.log(options);
	// End of the BC

	return jQuery.notyRenderer.init(options);
}