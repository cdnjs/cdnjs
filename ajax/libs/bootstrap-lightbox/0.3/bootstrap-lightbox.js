/*
/* =========================================================
 * bootstrap-lightbox.js v0.3
 *
 * HEAVILY based off bootstrap-modal.js v2.1.1
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

	"use strict"; // jshint ;_;


 /* LIGHTBOX CLASS DEFINITION
 * ====================== */

var Lightbox = function ( element, options ) {
		this.options = options
		this.$element = $(element)
		.delegate('[data-dismiss="lightbox"]', 'click.dismiss.lightbox', $.proxy(this.hide, this))
		this.options.remote && this.$element.find('.lightbox-body').load(this.options.remote)
	//
	var that = this;
	// Clone the element
	that.$clone = that.$element.filter(':first').clone().css(
	{
		'position': 'absolute',
		'top'     : -2000,
		'display' : 'block',
		'visibility': 'visible',
		'opacity': 100
	}).removeClass('fade').appendTo('body');
	that.$h = that.$clone.height();//this.$element.height();
	that.$w = that.$clone.width();//this.$element.width();
	that.$clone.remove();
	
	that.$element.css({
		"position": "fixed",
		"left": ( $(window).width()  / 2 ) - ( that.$w / 2 ),
		"top":  ( $(window).height() / 2 ) - ( that.$h / 2 )
	});	
	//
}

Lightbox.prototype = {

	constructor: Lightbox

	, toggle: function () {
		return this[!this.isShown ? 'show' : 'hide']()
	}

	, show: function () {
		var that = this
		, e = $.Event('show')

		this.$element.trigger(e)

		if (this.isShown || e.isDefaultPrevented()) return

			$('body').addClass('lightbox-open')

		this.isShown = true

		this.escape()

		this.backdrop(function () {
			var transition = $.support.transition && that.$element.hasClass('fade')

			if (!that.$element.parent().length) {
						that.$element.appendTo(document.body) //don't move modals dom position
					}

					that.$element
					.show()

					that.$h = that.$element.find('.lightbox-content').height();
					that.$w = that.$element.find('.lightbox-content').width();
					var resizedOffs = 0;
					if(that.options.resizeToFit) {
						var myImg = that.$element.find('img:first');
			// Save original filesize
			if(!$(myImg).data('osizew')) $(myImg).data('osizew', $(myImg).width());
			if(!$(myImg).data('osizeh')) $(myImg).data('osizeh', $(myImg).height());
			
			var osizew = $(myImg).data('osizew');
			var osizeh = $(myImg).data('osizeh');
			
			// Resize for window dimension < than image
			// Reset previous any			
			$(myImg).css('max-width', 'none');
			$(myImg).css('max-height', 'none');
			
			var bW = osizew > $(window).width();
			var bH = osizeh > $(window).height();
			
			if(bH || bW) {
				var sOffs = 40; // STYLE ?
				$(myImg).css('max-width', $(window).width() - sOffs);
				$(myImg).css('max-height', $(window).height() - sOffs);
				
				that.$w = $(myImg).width();
				that.$h = $(myImg).height();
				
				resizedOffs = 10;
			}
		}
		
		that.$element.css({
			"position": "fixed",
			"left": ( $(window).width()  / 2 ) - ( that.$w / 2 ),
			"top":  ( $(window).height() / 2 ) - ( that.$h / 2 ) - resizedOffs
		});

		if (transition) {
						that.$element[0].offsetWidth // force reflow
					}

					that.$element
					.addClass('in')
					.attr('aria-hidden', false)
					.focus()

					that.enforceFocus()

					transition ?
					that.$element.one($.support.transition.end, function () { that.$element.trigger('shown') }) :
					that.$element.trigger('shown')

				})
}

, hide: function ( e ) {
	e && e.preventDefault()

	var that = this

	e = $.Event('hide')

	this.$element.trigger(e)

	if (!this.isShown || e.isDefaultPrevented()) return

		this.isShown = false

	$('body').removeClass('lightbox-open')

	this.escape()

	$(document).off('focusin.lightbox')

	this.$element
	.removeClass('in')
	.attr('aria-hidden', true)

	$.support.transition && this.$element.hasClass('fade') ?
	this.hideWithTransition() :
	this.hideModal()
}

, enforceFocus: function () {
	var that = this
	$(document).on('focusin.lightbox', function (e) {
		if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
			that.$element.focus()
		}
	})
}

, escape: function () {
	var that = this

	if (this.isShown && this.options.keyboard) {
		this.$element.on('keyup.dismiss.lightbox', function ( e ) {
			console.log(e);
			e.which == 27 && that.hide()
		})
	} else if (!this.isShown) {
		this.$element.off('keyup.dismiss.lightbox')
	}
}

, hideWithTransition: function () {
	var that = this
	, timeout = setTimeout(function () {
		that.$element.off($.support.transition.end)
		that.hideModal()
	}, 500)

	this.$element.one($.support.transition.end, function () {
		clearTimeout(timeout)
		that.hideModal()
	})
}

, hideModal: function (that) {
	this.$element
	.hide()
	.trigger('hidden')

	this.backdrop()
}

, removeBackdrop: function () {
	this.$backdrop.remove()
	this.$backdrop = null
}

, backdrop: function (callback) {
	var that = this
	, animate = this.$element.hasClass('fade') ? 'fade' : ''

	if (this.isShown && this.options.backdrop) {
		var doAnimate = $.support.transition && animate

		this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
		.appendTo(document.body)

		if (this.options.backdrop != 'static') {
			this.$backdrop.click($.proxy(this.hide, this))
		}

					if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

						this.$backdrop.addClass('in')

					doAnimate ?
					this.$backdrop.one($.support.transition.end, callback) :
					callback()

				} else if (!this.isShown && this.$backdrop) {
					this.$backdrop.removeClass('in')

					$.support.transition && this.$element.hasClass('fade')?
					this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) :
					this.removeBackdrop()

				} else if (callback) {
					callback()
				}
			}
		}


 /* LIGHTBOX PLUGIN DEFINITION
 * ======================= */

$.fn.lightbox = function ( option ) {
		return this.each(function () {
			var $this = $(this)
			, data = $this.data('lightbox')
			, options = $.extend({}, $.fn.lightbox.defaults, $this.data(), typeof option == 'object' && option)
			if (!data) $this.data('lightbox', (data = new Lightbox(this, options)))
				if (typeof option == 'string') data[option]()
					else if (options.show) data.show()
				})
}

$.fn.lightbox.defaults = {
		backdrop: true
		, keyboard: true
		, show: true
		, resizeToFit: true
}

$.fn.lightbox.Constructor = Lightbox


/* LIGHTBOX DATA-API
* ============== */

$(function () {
		$('body').on('click.lightbox.data-api', '[data-toggle="lightbox"]', function ( e ) {
			var $this = $(this), href
				, $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
				, option = $target.data('lightbox') ? 'toggle' : $.extend({}, $target.data(), $this.data())

				e.preventDefault()

				$target
				.lightbox(option)
				.one('hide', function () {
					$this.focus()
				})
			})
})

}(window.jQuery);