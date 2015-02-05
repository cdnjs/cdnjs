/*!
* bootstrap-lightbox.js v0.7.0 
* Copyright 2014 Jason Butz
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/

+function ($) { "use strict";

	// LIGHTBOX CLASS DEFINITION
	// ======================

	var Lightbox = function (element, options)
	{
		this.options   = options
		this.$element  = $(element)
		this.$backdrop = null
		this.isShown   = null

		if (this.options.remote) this.$element.load(this.options.remote)
	}

	// We depend upon Twitter Bootstrap's Modal library to simplify things here
	Lightbox.prototype = $.extend({},$.fn.modal.Constructor.prototype);

	Lightbox.prototype.constructor = Lightbox;

	Lightbox.DEFAULTS = {
		backdrop: true,
		keyboard: true,
		show: true
	}

	Lightbox.prototype.show = function (_relatedTarget) 
	{
		var that = this;
		var e    = $.Event('show.bs.lightbox', { relatedTarget: _relatedTarget });

		this.$element.trigger(e);

		if (this.isShown || e.isDefaultPrevented()) return;

		this.isShown = true;

		this.escape();

		this.$element.on('click.dismiss.lightbox', '[data-dismiss="lightbox"]', $.proxy(this.hide, this));

		// This bit is added since we don't display until we have the size
		//  which prevents image jumping
		this.preloadSize(function()
		{
			that.backdrop(function ()
			{
				var transition = $.support.transition && that.$element.hasClass('fade');

				if (!that.$element.parent().length)
				{
					that.$element.appendTo(document.body); // don't move modals dom position
				}

				that.$element.show();

				if (transition)
				{
					that.$element[0].offsetWidth; // force reflow
				}

				that.$element
					.addClass('in')
					.attr('aria-hidden', false);

				that.enforceFocus();

				var e = $.Event('shown.bs.lightbox', { relatedTarget: _relatedTarget });

				transition ?
					that.$element.find('.lightbox-dialog') // wait for modal to slide in
						.one($.support.transition.end, function ()
						{
							that.$element.focus().trigger(e);
						})
						.emulateTransitionEnd(300) :
					that.$element.focus().trigger(e);
			});
		});
	};

	Lightbox.prototype.hide = function (e, slide)
	{
		if (e) e.preventDefault();

		e = $.Event('hide.bs.lightbox');

		this.$element.trigger(e);

		if (!this.isShown || e.isDefaultPrevented()) return;

		this.isShown = false;

		this.escape();

		$(document).off('focusin.bs.lightbox');

		this.$element
			.removeClass('in')
			.attr('aria-hidden', true)
			.off('click.dismiss.lightbox');

		$.support.transition && this.$element.hasClass('fade') ?
			this.$element
				.one($.support.transition.end, $.proxy(this.hideModal(slide), this))
				.emulateTransitionEnd(300) :
			this.hideModal(slide);
	};

	Lightbox.prototype.enforceFocus = function () {
		$(document)
			.off('focusin.bs.lightbox') // guard against infinite focus loop
			.on('focusin.bs.lightbox', $.proxy(function (e)
			{
				if (this.$element[0] !== e.target && !this.$element.has(e.target).length)
				{
					this.$element.focus();
				}
			}, this));
	};

	Lightbox.prototype.escape = function ()
	{
		if (this.isShown && this.options.keyboard)
		{
			this.$element.on('keyup.dismiss.bs.lightbox', $.proxy(function (e)
			{
				e.which == 27 && this.hide();
			}, this));
		}
		else if (!this.isShown)
		{
			this.$element.off('keyup.dismiss.bs.lightbox');
		}
	}

	Lightbox.prototype.hideModal = function (slide) 
	{
		var that = this;
		this.$element.hide();
		this.backdrop(function ()
		{
			that.removeBackdrop();

			// Don't trigger hidden event if sliding between lightboxes
			if(!slide) that.$element.trigger('hidden.bs.lightbox');
		});
	};

	Lightbox.prototype.backdrop = function (callback)
	{
		var that    = this
		var animate = this.$element.hasClass('fade') ? 'fade' : ''
		if (this.isShown && this.options.backdrop)
		{
			var doAnimate = $.support.transition && animate;

			this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
				.appendTo(document.body);

			this.$element.on('click.dismiss.lightbox', $.proxy(function (e)
			{
				if (e.target !== e.currentTarget) return;
				this.options.backdrop == 'static'
					? this.$element[0].focus.call(this.$element[0])
					: this.hide.call(this);
			}, this));

			if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

			this.$backdrop.addClass('in');

			if (!callback) return;

			doAnimate ?
				this.$backdrop
					.one($.support.transition.end, callback)
					.emulateTransitionEnd(150) :
				callback();

		}
		else if (!this.isShown && this.$backdrop)
		{
			this.$backdrop.removeClass('in');

			$.support.transition && this.$element.hasClass('fade')?
				this.$backdrop
					.one($.support.transition.end, callback)
					.emulateTransitionEnd(150) :
				callback();

		}
		else if (callback)
		{
			callback();
		}
	};

	Lightbox.prototype.preloadSize = function(callback)
	{
		var callbacks = $.Callbacks();
		if(callback) callbacks.add( callback );
		var that = this;

		var windowHeight,
			windowWidth,
			padTop,
			padBottom,
			padLeft,
			padRight,
			$image,
			preloader,
			originalWidth,
			originalHeight;
		// Get the window width and height.
		windowHeight = $(window).height();
		windowWidth  = $(window).width();

		// Get the top, bottom, right, and left padding
		padTop    = parseInt( that.$element.find('.lightbox-content').css('padding-top')    , 10);
		padBottom = parseInt( that.$element.find('.lightbox-content').css('padding-bottom') , 10);
		padLeft   = parseInt( that.$element.find('.lightbox-content').css('padding-left')   , 10);
		padRight  = parseInt( that.$element.find('.lightbox-content').css('padding-right')  , 10);

		// Load the image, we have to do this because if the image isn't already loaded we get a bad size
		$image    = that.$element.find('.lightbox-content').find('img:first');
		if($image.length <= 0) return callbacks.fire();
		preloader = new Image();
		preloader.onload = function()
		{
			//$image.width = preloader.width;
			//$image.height = preloader.height;
			//return _this.sizeContainer(preloader.width, preloader.height);

			// The image could be bigger than the window, that is an issue.
			if( (preloader.width + padLeft + padRight) >= windowWidth)
			{
				originalWidth = preloader.width;
				originalHeight = preloader.height;
				preloader.width = windowWidth - padLeft - padRight;
				preloader.height = originalHeight / originalWidth * preloader.width;
			}

			if( (preloader.height + padTop + padBottom) >= windowHeight)
			{
				originalWidth = preloader.width;
				originalHeight = preloader.height;
				preloader.height = windowHeight - padTop - padBottom;
				preloader.width = originalWidth / originalHeight * preloader.height;
			}
			that.$element.find('.lightbox-dialog').css({
				'position': 'fixed',
				'width': preloader.width + padLeft + padRight,
				'height': preloader.height + padTop + padBottom,
				'top' : (windowHeight / 2) - ( (preloader.height + padTop + padBottom) / 2),
				'left' : '50%',
				'margin-left' : -1 * (preloader.width + padLeft + padRight) / 2
			});
			that.$element.find('.lightbox-content').css({
				'width': preloader.width + padLeft + padRight,
				'height': preloader.height + padTop + padBottom
			});
			$image.css({
				'width': preloader.width,
				'height': preloader.height
			})

			// We have everything sized!
			callbacks.fire();
		};
		preloader.src = $image.attr('src');
	};

	Lightbox.prototype.slide = function(direction)
	{
		var that = this;

		that.hide(that.event, true);

		if (direction == 'next' && that.$element.next('.lightbox').length) {
			that.$element.next('.lightbox').lightbox('show');
		} else if(direction == 'prev' && that.$element.prev('.lightbox').length) {
			that.$element.prev('.lightbox').lightbox('show');
		} else {
			// Trigger hidden event because there is no next / previous slide
			that.$element.trigger('hidden.bs.lightbox');
		}
	}


	// LIGHTBOX PLUGIN DEFINITION
	// =======================

	var old = $.fn.lightbox

	$.fn.lightbox = function (option, _relatedTarget)
	{
		return this.each(function ()
		{
			var $this   = $(this);
			var data    = $this.data('bs.lightbox');
			var options = $.extend({}, Lightbox.DEFAULTS, $this.data(), typeof option == 'object' && option);

			if (!data) $this.data('bs.lightbox', (data = new Lightbox(this, options)));
			if (typeof option == 'string') data[option](_relatedTarget);
			else if (options.show) data.show(_relatedTarget)
		})
	}

	$.fn.lightbox.Constructor = Lightbox;


	// MODAL NO CONFLICT
	// =================

	$.fn.lightbox.noConflict = function ()
	{
		$.fn.lightbox = old;
		return this;
	}


	// MODAL DATA-API
	// ==============

	$(document).on('click.bs.lightbox.data-api', '[data-toggle="lightbox"]', function (e)
	{
		var $this   = $(this);
		var href    = $this.attr('href');
		var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); //strip for ie7
		var option  = $target.data('lightbox') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

		e.preventDefault()

		$target
			.lightbox(option, this)
			.one('hide', function ()
			{
				$this.is(':visible') && $this.focus()
			});
	});

	$(document).on('click', '.lightbox-control', function (e)
	{
		e.preventDefault();

		var $this = $(this);

		$this.parents('.lightbox')
			.lightbox('slide', $(this).data('lightbox-slide'));
	});

	$(document)
		.on('show.bs.lightbox',  '.lightbox', function () { $(document.body).addClass('lightbox-open') })
		.on('hidden.bs.lightbox', '.lightbox', function () { $(document.body).removeClass('lightbox-open') })

}(window.jQuery);
