/* =========================================================
 * bootstrap-lightbox.js v0.4
 *
 * HEAVILY based off bootstrap-modal.js v2.2.1
 * =========================================================
 * Copyright 2012 Jason Butz
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {
	// browser:true, jquery:true, node:true, laxbreak:true
	"use strict"; // jshint ;_;


/* LIGHTBOX CLASS DEFINITION
 * ========================= */

	var Lightbox = function (element, options)
	{
		this.options = options;
		this.$element = $(element)
			.delegate('[data-dismiss="lightbox"]', 'click.dismiss.lightbox', $.proxy(this.hide, this));

		this.options.remote && this.$element.find('.lightbox-body').load(this.options.remote);

		this.cloneSize();
	}

	Lightbox.prototype = {
		constructor: Lightbox,

		toggle: function ()
		{
			return this[!this.isShown ? 'show' : 'hide']();
		},

		show: function ()
		{
			var that = this;
			var e    = $.Event('show')

			this.$element.trigger(e);

			if (this.isShown || e.isDefaultPrevented()) return;


			this.isShown = true;

			this.escape();

			this.backdrop(function ()
			{
				var transition = $.support.transition && that.$element.hasClass('fade');

				if (!that.$element.parent().length)
				{
					that.$element.appendTo(document.body); //don't move modals dom position
				}

				that.$element
					.show();

				if (transition)
				{
					that.$element[0].offsetWidth; // force reflow
				}

				that.$element
					.addClass('in')
					.attr('aria-hidden', false);

				that.enforceFocus();

				transition ?
					that.$element.one($.support.transition.end, function () { that.centerImage(); that.$element.focus().trigger('shown'); }) :
					(function(){ that.centerImage(); that.$element.focus().trigger('shown'); })()

			});
		},
		hide: function (e)
		{
			e && e.preventDefault();

			var that = this;

			e = $.Event('hide');

			this.$element.trigger(e);

			if (!this.isShown || e.isDefaultPrevented()) return;

			this.isShown = false;

			this.escape();

			$(document).off('focusin.lightbox');

			this.$element
				.removeClass('in')
				.attr('aria-hidden', true);

			$.support.transition && this.$element.hasClass('fade') ?
				this.hideWithTransition() :
				this.hideLightbox();
		},
		enforceFocus: function ()
		{
			var that = this;
			$(document).on('focusin.lightbox', function (e)
			{
				if (that.$element[0] !== e.target && !that.$element.has(e.target).length)
				{
					that.$element.focus();
				}
			});
		},
		escape: function ()
		{
			var that = this;
			if (this.isShown && this.options.keyboard)
			{
				this.$element.on('keyup.dismiss.lightbox', function ( e )
				{
					e.which == 27 && that.hide();
				});
			}
			else if (!this.isShown)
			{
				this.$element.off('keyup.dismiss.lightbox');
			}
		},
		hideWithTransition: function ()
		{
			var that = this;
			var timeout = setTimeout(function ()
			{
				that.$element.off($.support.transition.end);
				that.hideLightbox();
			}, 500);

			this.$element.one($.support.transition.end, function ()
			{
				clearTimeout(timeout);
				that.hideLightbox();
			});
		},
		hideLightbox: function (that)
		{
			this.$element
				.hide()
				.trigger('hidden');

			this.backdrop();
		},
		removeBackdrop: function ()
		{
			this.$backdrop.remove();
			this.$backdrop = null;
		},
		backdrop: function (callback)
		{
			var that   = this;
			var animate = this.$element.hasClass('fade') ? 'fade' : '';

			if (this.isShown && this.options.backdrop)
			{
				var doAnimate = $.support.transition && animate;

				this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
					.appendTo(document.body);

				this.$backdrop.click(
					this.options.backdrop == 'static' ?
						$.proxy(this.$element[0].focus, this.$element[0]) :
						$.proxy(this.hide, this)
				);

				if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

				this.$backdrop.addClass('in');

				doAnimate ?
					this.$backdrop.one($.support.transition.end, callback) :
					callback();

			}
			else if (!this.isShown && this.$backdrop)
			{
				this.$backdrop.removeClass('in');

				$.support.transition && this.$element.hasClass('fade')?
					this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) :
					this.removeBackdrop();

			} 
			else if (callback)
			{
				callback();
			}
		},
		centerImage: function()
		{
			var that = this;
			var resizedOffs = 0;
			var $img;

			that.h = that.$element.height();
			that.w = that.$element.width();
			
			if(that.options.resizeToFit)
			{
				
				resizedOffs = 10;
				$img = that.$element.find('.lightbox-content').find('img:first');
				// Save original filesize
				if(!$img.data('osizew')) $img.data('osizew', $img.width());
				if(!$img.data('osizeh')) $img.data('osizeh', $img.height());
				
				var osizew = $img.data('osizew');
				var osizeh = $img.data('osizeh');
				
				// Resize for window dimension < than image
				// Reset previous
				$img.css('max-width', 'none');
				$img.css('max-height', 'none');
				

				var sOffs = 40; // STYLE ?
				if(that.$element.find('.lightbox-header').length > 0) sOffs += 10;
				$img.css('max-width', $(window).width() - sOffs);
				$img.css('max-height', $(window).height() - sOffs);
				
				that.w = $img.width();
				that.h = $img.height();
			}

			that.$element.css({
				"position": "fixed",
				"left": ( $(window).width()  / 2 ) - ( that.w / 2 ),
				"top":  ( $(window).height() / 2 ) - ( that.h / 2 ) - resizedOffs
			});
			that.enforceFocus();
		},
		cloneSize: function() // The cloneSize function is only run once, but it helps keep image jumping down
		{
			var that = this;
			// Clone the element and append it to the body
			//  this allows us to get an idea for the size of the lightbox
			that.$clone = that.$element.filter(':first').clone()
			.css(
			{
				'position': 'absolute',
				'top'     : -2000,
				'display' : 'block',
				'visibility': 'visible',
				'opacity': 100
			})
			.removeClass('fade')
			.appendTo('body');

			that.h = that.$clone.height();
			that.w = that.$clone.width();
			that.$clone.remove();

			// try and center the element based on the
			//  height and width retrieved from the clone
			that.$element.css({
				"position": "fixed",
				"left": ( $(window).width()  / 2 ) - ( that.w / 2 ),
				"top":  ( $(window).height() / 2 ) - ( that.h / 2 )
			});
		}
	}


/* LIGHTBOX PLUGIN DEFINITION
 * ======================= */

	$.fn.lightbox = function (option)
	{
		return this.each(function ()
		{
			var $this   = $(this);
			var data    = $this.data('lightbox');
			var options = $.extend({}, $.fn.lightbox.defaults, $this.data(), typeof option == 'object' && option);
			if (!data) $this.data('lightbox', (data = new Lightbox(this, options)));

			if (typeof option == 'string')
				data[option]()
			else if (options.show)
				data.show()
		});
	};

	$.fn.lightbox.defaults = {
		backdrop: true,
		keyboard: true,
		show: true,
		resizeToFit: true
	};

	$.fn.lightbox.Constructor = Lightbox;


/* LIGHTBOX DATA-API
 * ================== */

	$(document).on('click.lightbox.data-api', '[data-toggle="lightbox"]', function (e)
	{
		var $this = $(this);
		var href  = $this.attr('href');
		var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); //strip for ie7
		var option = $target.data('lightbox') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data());
		var img    = $this.attr('data-image') || false;
		var $imgElem;

		e.preventDefault();

		if(img)
		{
			$target.data('original-content', $target.find('.lightbox-content').html());
			$target.find('.lightbox-content').html('<img border="0" src="'+img+'" />');
		}

		$target
			.lightbox(option)
			.one('hide', function () 
			{
				$this.focus()
			})
			.one('hidden',function ()
			{
				if( img )
				{
					$target.find('.lightbox-content').html( $target.data('original-content') );
					img = undefined;
				}
			});
	})

}(window.jQuery);