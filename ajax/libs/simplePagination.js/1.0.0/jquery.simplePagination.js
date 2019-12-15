/**
* simplePagination.js v1.0.0
* A simple jQuery pagination plugin.
* Author: Flavius Matis - http://flaviusmatis.github.com/
* URL: https://github.com/flaviusmatis/simplePagination.js
*/

(function($){

	var methods = {
		init: function(options) {
			var o = $.extend({
				items: 1,
				itemsOnPage: 1,
				pages: 0,
				displayedPages: 4,
				edges: 2,
				currentPage: 1,
				hrefText: '#page-',
				prevText: 'Prev',
				nextText: 'Next',
				ellipseText: '&hellip;',
				cssStyle: 'light-theme',
				selectOnClick: true,
				onClick: function() {
					return false;
				},
				callback: function() {
					return false;
				}
			}, options || {});

			return this.each(function() {
				o.pages = o.pages ? o.pages : Math.ceil(o.items / o.itemsOnPage) ? Math.ceil(o.items / o.itemsOnPage) : 1;
				o.currentPage = o.currentPage - 1;
				o.halfDisplayed = Math.ceil(o.displayedPages / 2);
				$(this).addClass(o.cssStyle).data('pagination', o);
				methods._draw.call(this);
				o.callback(o.currentPage, this);
			});
		},

		selectPage: function(page) {
			methods._selectPage.call(this, page - 1);
		},

		prevPage: function() {
			var o = $(this).data('pagination');
			if (o.currentPage > 0) {
				methods._selectPage.call(this, o.currentPage - 1);
			}
		},

		nextPage: function() {
			var o = $(this).data('pagination');
			if (o.currentPage < o.pages - 1) {
				methods._selectPage.call(this, o.currentPage + 1);
			}
		},

		_draw: function() {
			var $panel = $(this).empty(),
				o = $panel.data('pagination'),
				interval = methods._getInterval(o);

			// Generate Prev link
			if (o.prevText) {
				methods._appendItem(this, o.currentPage - 1, {text: o.prevText, classes: 'prev'});
			}

			// Generate start edges
			if (interval.start > 0 && o.edges > 0) {
				var end = Math.min(o.edges, interval.start);
				for (var i = 0; i < end; i++) {
					methods._appendItem(this, i);
				}
				if (o.edges < interval.start && o.ellipseText) {
					$panel.append('<span class="ellipse">' + o.ellipseText + '</span>');
				}
			}

			// Generate interval links
			for (var i = interval.start; i < interval.end; i++) {
				methods._appendItem(this, i);
			}

			// Generate end edges
			if (interval.end < o.pages && o.edges > 0) {
				if (o.pages - o.edges > interval.end && o.ellipseText) {
					$panel.append('<span class="ellipse">' + o.ellipseText + '</span>');
				}
				var begin = Math.max(o.pages - o.edges, interval.end);
				for (var i = begin; i < o.pages; i++) {
					methods._appendItem(this, i);
				}
			}

			// Generate Next link
			if (o.nextText) {
				methods._appendItem(this, o.currentPage + 1, {text: o.nextText, classes: 'next'});
			}
		},

		_getInterval: function(o) {
			return {
				start: o.currentPage > o.halfDisplayed ? Math.max(Math.min(o.currentPage - o.halfDisplayed, (o.pages - o.displayedPages)), 0) : 0,
				end: o.currentPage > o.halfDisplayed ? Math.min(o.currentPage + o.halfDisplayed, o.pages) : Math.min(o.displayedPages, o.pages)
			};
		},

		_appendItem: function(panel, pageIndex, opts) {
			var options, $link, o = $(panel).data('pagination');

			pageIndex = pageIndex < 0 ? 0 : (pageIndex < o.pages ? pageIndex : o.pages - 1);

			options = $.extend({
				text: pageIndex + 1,
				classes: ''
			}, opts || {});

			if (pageIndex == o.currentPage) {
				$link = $('<span class="current">' + (options.text) + '</span>');
			} else {
				$link = $('<a href="' + o.hrefText + (pageIndex + 1) + '">' + (options.text) + '</a>');
				$link.click(function(){
					methods._selectPage.call(panel, pageIndex);
					return false;
				});
			}
			if (options.classes) {
				$link.addClass(options.classes);
			}

			$(panel).append($link);
		},

		_selectPage: function(pageIndex) {
			var o = $(this).data('pagination');
			o.currentPage = pageIndex;
			if (o.selectOnClick) {
				o.onClick(pageIndex + 1, $(this));
				methods._draw.call(this);
			} else {
				o.onClick(pageIndex + 1, $(this));
			}
		}

	};
	
	$.fn.pagination = function(method) {

		// Method calling logic
		if (methods[method] && method.charAt(0) != '_') {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.pagination');
		}

	};

})(jQuery);