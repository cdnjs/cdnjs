/*!
	Copyright (C) 2011 T. Connell & Associates, Inc.

	Dual-licensed under the MIT and GPL licenses

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
	FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	Resizable scroller widget for the jQuery tablesorter plugin

	Version 2.0 - modified by Rob Garrison 4/12/2013; updated 2/7/2015 (v2.19.0)
	Requires jQuery v1.7+
	Requires the tablesorter plugin, v2.8+, available at http://mottie.github.com/tablesorter/docs/

	Usage:

		$(function() {

			$('table.tablesorter').tablesorter({
				widgets: ['zebra', 'scroller'],
				widgetOptions : {
					scroller_height       : 300,  // height of scroll window
					scroller_barWidth     : 18,   // scroll bar width
					scroller_jumpToHeader : true, // header snap to browser top when scrolling the tbody
				}
			});

		});

	Website: www.tconnell.com
*/
/*jshint browser:true, jquery:true, unused:false */
;(function($, window){
"use strict";

$.fn.hasScrollBar = function(){
	return this.get(0).scrollHeight > this.height();
};
var ts = $.tablesorter;

ts.window_resize = function(){
	if (this.resize_timer) {
		clearTimeout(this.resize_timer);
	}
	this.resize_timer = setTimeout(function(){
		$(this).trigger('resizeEnd');
	}, 250);
};

// Add extra scroller css
$(function(){
	var s = '<style>' +
		'.tablesorter-scrollbar-measure { width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px; } ' +
		'.tablesorter-scroller-reset { width: auto !important; } ' +
		'.tablesorter-scroller { text-align: left; overflow: hidden;  }' +
		'.tablesorter-scroller-header { overflow: hidden; }' +
		'.tablesorter-scroller-header table.tablesorter { margin-bottom: 0; }' +
		'.tablesorter-scroller-table { overflow-y: scroll; }' +
		'.tablesorter-scroller-table table.tablesorter { margin-top: 0; overflow: scroll; } ' +
		'.tablesorter-scroller-table .tablesorter-filter-row, .tablesorter-scroller-table tfoot { display: none; }' +
		'.tablesorter-scroller-table table.tablesorter thead tr.tablesorter-headerRow * {' +
			'line-height:0;height:0;border:none;background-image:none;padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;overflow:hidden;' +
		'}</style>';
	$(s).appendTo('body');
});

ts.addWidget({
	id: 'scroller',
	priority: 60, // run after the filter widget
	options: {
		scroller_height : 300,
		scroller_jumpToHeader: true,
		scroller_upAfterSort: true,
		// bar width is now calculated; set a value to override
		scroller_barWidth : null
	},
	init: function(table, thisWidget, c, wo){
		var $win = $(window),
			namespace = c.namespace + 'tsscroller';
		// Setup window.resizeEnd event
		$win
			.bind('resize' + namespace, ts.window_resize)
			.bind('resizeEnd' + namespace, function() {
				// init is run before format, so scroller_resizeWidth
				// won't be defined within the "c" or "wo" parameters
				if ($.isFunction(table.config.widgetOptions.scroller_resizeWidth)) {
					// IE calls resize when you modify content, so we have to unbind the resize event
					// so we don't end up with an infinite loop. we can rebind after we're done.
					$win.unbind('resize' + namespace, ts.window_resize);
					table.config.widgetOptions.scroller_resizeWidth();
					$win.bind('resize' + namespace, ts.window_resize);
				}
			});
	},
	format: function(table, c, wo) {
		var maxHt, tbHt, $hdr, resize, getBarWidth, $cells,
			// c.namespace contains a unique tablesorter ID, per table
			id = c.namespace.slice(1) + 'tsscroller',
			$win = $(window),
			$tbl = c.$table;

		if (!c.isScrolling) {
			maxHt = wo.scroller_height || 300;
			tbHt = $tbl.children('tbody').height();
			if (tbHt !== 0 && maxHt > tbHt) { maxHt = tbHt + 10; }  // Table is less than h px

			$hdr = $('<table class="' + $tbl.attr('class') + '" cellpadding=0 cellspacing=0>' +
				'<thead>' + $tbl.find('thead:first').html() + '</thead>' +
				'</table>');
			if (c.$extraTables && c.$extraTables.length) {
				c.$extraTables = c.$extraTables.add($hdr);
			} else {
				c.$extraTables = $hdr;
			}
			$tbl
				.wrap('<div id="' + id + '" class="tablesorter-scroller" />')
				.before($hdr)
				// shrink filter row but don't completely hide it because the inputs/selectors may distort the columns
				.find('.tablesorter-filter-row').addClass('hideme');

			$cells = $hdr
				.wrap('<div class="tablesorter-scroller-header" style="width:' + $tbl.width() + ';" />')
				.find('.' + ts.css.header);

			// use max-height, so the height resizes dynamically while filtering
			$tbl.wrap('<div class="tablesorter-scroller-table" style="max-height:' + maxHt + 'px;width:' + $tbl.width() + ';" />');

			// make scroller header sortable
			ts.bindEvents(table, $cells);

			// look for filter widget
			if ($tbl.hasClass('hasFilters')) {
				ts.filter.bindSearch( $tbl, $hdr.find('.' + ts.css.filter) );
			}

			// modified from http://davidwalsh.name/detect-scrollbar-width
			getBarWidth = function(){
				var $scrollDiv = $('<div class="tablesorter-scrollbar-measure">').appendTo('body'),
					div = $scrollDiv[0],
					barWidth = div.offsetWidth - div.clientWidth;
				$scrollDiv.remove();
				return barWidth;
			};

			resize = function(){
				var d, b, $h, $th, w,
					// Hide other scrollers so we can resize
					$div = $('div.tablesorter-scroller[id != "' + id + '"]').hide();

				$tbl.children('thead').show();
				// only remove colgroup if it was added by the plugin
				// the $.tablesorter.fixColumnWidth() function already does this (v2.19.0)
				// but we need to get "accurate" resized measurements here - see issue #680
				$tbl.children('colgroup.tablesorter-colgroup').remove();
				$hdr.children('colgroup').remove();

				// Reset sizes so parent can resize.
				$tbl
					.addClass('tablesorter-scroller-reset')
					.children('thead')
					.find('.tablesorter-header-inner').addClass('tablesorter-scroller-reset').end()
					.find('.tablesorter-filter-row').show();
				d = $tbl.parent();
				d.addClass('tablesorter-scroller-reset');

				d.parent().trigger('resize');

				// include left & right border widths
				b = parseInt( $tbl.css('border-left-width'), 10 ) + parseInt( $tbl.css('border-right-width'), 10 );

				// Shrink a bit to accommodate scrollbar
				w = ( wo.scroller_barWidth || getBarWidth() ) + b;

				d.width( d.parent().innerWidth() - ( d.parent().hasScrollBar() ? w : 0 ) );
				w = d.innerWidth() - ( d.hasScrollBar() ? w : 0 );
				$tbl.width( w );
				$hdr.width( w );
				$hdr.parent().width( w );

				$tbl
					.closest('.tablesorter-scroller')
					.find('.tablesorter-scroller-reset')
					.removeClass('tablesorter-scroller-reset');

				$h = $hdr.find('thead').children().children();

				// adjust cloned header to match original table width - includes wrappers, headers, and header inner div
				$tbl.children('thead').children().children().each(function(i, c){
					$th = $(c).find('.tablesorter-header-inner');
					if ($th.length) {
						// I have no idea why this is in here anymore LOL
						w = parseInt( $th.css('min-width').replace('auto', '0').replace(/(px|em)/, ''), 10 );
						if ( $th.width() < w ) {
							$th.width(w);
						} else {
							w = $th.width();
						}

						$h.eq(i)
							.parent()
							.width( $th.parent().width() - b );
					}
				});

				// refresh colgroup & copy to cloned header
				$.tablesorter.fixColumnWidth( table );
				$h = $tbl.children('colgroup').clone();
				if ($h.length) {
					$hdr.prepend($h);
				}

				// hide filter row because filterEnd event fires
				$tbl.children('thead').find('.tablesorter-filter-row').hide();

				$div.show();
			};

			// Expose to external calls
			wo.scroller_resizeWidth = resize;

			resize();

			$tbl.find('thead').css('visibility', 'hidden');
			c.isScrolling = true;

			tbHt = $tbl.parent().parent().height();

			// The header will always jump into view if scrolling the table body
			$tbl.parent().bind('scroll', function(){
				if (wo.scroller_jumpToHeader) {
					var pos = $win.scrollTop() - $hdr.offset().top;
					if ($(this).scrollTop() !== 0 && pos < tbHt && pos > 0) {
						$win.scrollTop( $hdr.offset().top );
					}
				}
				$hdr.parent().scrollLeft( $(this).scrollLeft() );
			});

		}

		// Sorting, so scroll to top
		if (wo.scroller_upAfterSort) {
			$tbl.parent().animate({ scrollTop: 0 }, 'fast');
		}

	},
	remove : function(table, c){
		var $table = c.$table,
			namespace = c.namespace + 'tsscroller';
		$table.closest('.tablesorter-scroller').find('.tablesorter-scroller-header').remove();
		$table
				.unwrap()
				.find('.tablesorter-filter-row').removeClass('hideme').end()
				.find('thead').show().css('visibility', 'visible');
		$(window).unbind('resize' + namespace + ' resizeEnd' + namespace);
		c.isScrolling = false;
	}
});

})(jQuery, window);
