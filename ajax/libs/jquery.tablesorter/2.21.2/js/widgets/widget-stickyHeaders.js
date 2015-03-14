/*! Widget: stickyHeaders - updated 3/5/2015 (v2.21.0) *//*
 * Requires tablesorter v2.8+ and jQuery 1.4.3+
 * by Rob Garrison
 */
;(function ($, window) {
'use strict';
var ts = $.tablesorter = $.tablesorter || {};

$.extend(ts.css, {
	sticky    : 'tablesorter-stickyHeader', // stickyHeader
	stickyVis : 'tablesorter-sticky-visible',
	stickyHide: 'tablesorter-sticky-hidden',
	stickyWrap: 'tablesorter-sticky-wrapper'
});

// Add a resize event to table headers
ts.addHeaderResizeEvent = function(table, disable, settings) {
	table = $(table)[0]; // make sure we're using a dom element
	var headers,
		defaults = {
			timer : 250
		},
		options = $.extend({}, defaults, settings),
		c = table.config,
		wo = c.widgetOptions,
		checkSizes = function(triggerEvent) {
			wo.resize_flag = true;
			headers = [];
			c.$headers.each(function() {
				var $header = $(this),
					sizes = $header.data('savedSizes') || [0,0], // fixes #394
					width = this.offsetWidth,
					height = this.offsetHeight;
				if (width !== sizes[0] || height !== sizes[1]) {
					$header.data('savedSizes', [ width, height ]);
					headers.push(this);
				}
			});
			if (headers.length && triggerEvent !== false) {
				c.$table.trigger('resize', [ headers ]);
			}
			wo.resize_flag = false;
		};
	checkSizes(false);
	clearInterval(wo.resize_timer);
	if (disable) {
		wo.resize_flag = false;
		return false;
	}
	wo.resize_timer = setInterval(function() {
		if (wo.resize_flag) { return; }
		checkSizes();
	}, options.timer);
};

// Sticky headers based on this awesome article:
// http://css-tricks.com/13465-persistent-headers/
// and https://github.com/jmosbech/StickyTableHeaders by Jonas Mosbech
// **************************
ts.addWidget({
	id: "stickyHeaders",
	priority: 60, // sticky widget must be initialized after the filter widget!
	options: {
		stickyHeaders : '',       // extra class name added to the sticky header row
		stickyHeaders_attachTo : null, // jQuery selector or object to attach sticky header to
		stickyHeaders_xScroll : null, // jQuery selector or object to monitor horizontal scroll position (defaults: xScroll > attachTo > window)
		stickyHeaders_yScroll : null, // jQuery selector or object to monitor vertical scroll position (defaults: yScroll > attachTo > window)
		stickyHeaders_offset : 0, // number or jquery selector targeting the position:fixed element
		stickyHeaders_filteredToTop: true, // scroll table top into view after filtering
		stickyHeaders_cloneId : '-sticky', // added to table ID, if it exists
		stickyHeaders_addResizeEvent : true, // trigger "resize" event on headers
		stickyHeaders_includeCaption : true, // if false and a caption exist, it won't be included in the sticky header
		stickyHeaders_zIndex : 2 // The zIndex of the stickyHeaders, allows the user to adjust this to their needs
	},
	format: function(table, c, wo) {
		// filter widget doesn't initialize on an empty table. Fixes #449
		if ( c.$table.hasClass('hasStickyHeaders') || ($.inArray('filter', c.widgets) >= 0 && !c.$table.hasClass('hasFilters')) ) {
			return;
		}
		var $table = c.$table,
			// add position: relative to attach element, hopefully it won't cause trouble.
			$attach = $(wo.stickyHeaders_attachTo),
			namespace = c.namespace + 'stickyheaders ',
			// element to watch for the scroll event
			$yScroll = $(wo.stickyHeaders_yScroll || wo.stickyHeaders_attachTo || window),
			$xScroll = $(wo.stickyHeaders_xScroll || wo.stickyHeaders_attachTo || window),
			$thead = $table.children('thead:first'),
			$header = $thead.children('tr').not('.sticky-false').children(),
			$tfoot = $table.children('tfoot'),
			$stickyOffset = isNaN(wo.stickyHeaders_offset) ? $(wo.stickyHeaders_offset) : '',
			stickyOffset = $stickyOffset.length ? $stickyOffset.height() || 0 : parseInt(wo.stickyHeaders_offset, 10) || 0,
			// is this table nested? If so, find parent sticky header wrapper (div, not table)
			$nestedSticky = $table.parent().closest('.' + ts.css.table).hasClass('hasStickyHeaders') ?
				$table.parent().closest('table.tablesorter')[0].config.widgetOptions.$sticky.parent() : [],
			nestedStickyTop = $nestedSticky.length ? $nestedSticky.height() : 0,
			// clone table, then wrap to make sticky header
			$stickyTable = wo.$sticky = $table.clone()
				.addClass('containsStickyHeaders ' + ts.css.sticky + ' ' + wo.stickyHeaders)
				.wrap('<div class="' + ts.css.stickyWrap + '">'),
			$stickyWrap = $stickyTable.parent()
				.addClass(ts.css.stickyHide)
				.css({
					position   : $attach.length ? 'absolute' : 'fixed',
					padding    : parseInt( $stickyTable.parent().parent().css('padding-left'), 10 ),
					top        : stickyOffset + nestedStickyTop,
					left       : 0,
					visibility : 'hidden',
					zIndex     : wo.stickyHeaders_zIndex || 2
				}),
			$stickyThead = $stickyTable.children('thead:first'),
			$stickyCells,
			laststate = '',
			spacing = 0,
			setWidth = function($orig, $clone){
				$orig.filter(':visible').each(function(i) {
					var width, border,
						$cell = $clone.filter(':visible').eq(i),
						$this = $(this);
					// code from https://github.com/jmosbech/StickyTableHeaders
					if ($this.css('box-sizing') === 'border-box') {
						width = $this.outerWidth();
					} else {
						if ($cell.css('border-collapse') === 'collapse') {
							if (window.getComputedStyle) {
								width = parseFloat( window.getComputedStyle(this, null).width );
							} else {
								// ie8 only
								border = parseFloat( $this.css('border-width') );
								width = $this.outerWidth() - parseFloat( $this.css('padding-left') ) - parseFloat( $this.css('padding-right') ) - border;
							}
						} else {
							width = $this.width();
						}
					}
					$cell.css({
						'min-width': width,
						'max-width': width
					});
				});
			},
			resizeHeader = function() {
				stickyOffset = $stickyOffset.length ? $stickyOffset.height() || 0 : parseInt(wo.stickyHeaders_offset, 10) || 0;
				spacing = 0;
				$stickyWrap.css({
					left : $attach.length ? parseInt($attach.css('padding-left'), 10) || 0 :
							$table.offset().left - parseInt($table.css('margin-left'), 10) - $xScroll.scrollLeft() - spacing,
					width: $table.outerWidth()
				});
				setWidth( $table, $stickyTable );
				setWidth( $header, $stickyCells );
			};
		// only add a position relative if a position isn't already defined
		if ($attach.length && !$attach.css('position')) {
			$attach.css('position', 'relative');
		}
		// save stickyTable element to config
		// it is also saved to wo.$sticky
		if (c.$extraTables && c.$extraTables.length) {
			c.$extraTables.add($stickyTable);
		} else {
			c.$extraTables = $stickyTable;
		}
		// fix clone ID, if it exists - fixes #271
		if ($stickyTable.attr('id')) { $stickyTable[0].id += wo.stickyHeaders_cloneId; }
		// clear out cloned table, except for sticky header
		// include caption & filter row (fixes #126 & #249) - don't remove cells to get correct cell indexing
		$stickyTable.find('thead:gt(0), tr.sticky-false').hide();
		$stickyTable.find('tbody, tfoot').remove();
		$stickyTable.find('caption').toggle(wo.stickyHeaders_includeCaption);
		// issue #172 - find td/th in sticky header
		$stickyCells = $stickyThead.children().children();
		$stickyTable.css({ height:0, width:0, margin: 0 });
		// remove resizable block
		$stickyCells.find('.' + ts.css.resizer).remove();
		// update sticky header class names to match real header after sorting
		$table
			.addClass('hasStickyHeaders')
			.bind('pagerComplete' + namespace, function() {
				resizeHeader();
			});

		ts.bindEvents(table, $stickyThead.children().children('.tablesorter-header'));

		// add stickyheaders AFTER the table. If the table is selected by ID, the original one (first) will be returned.
		$table.after( $stickyWrap );

		// onRenderHeader is defined, we need to do something about it (fixes #641)
		if (c.onRenderHeader) {
			$stickyThead.children('tr').children().each(function(index){
				// send second parameter
				c.onRenderHeader.apply( $(this), [ index, c, $stickyTable ] );
			});
		}

		// make it sticky!
		$xScroll.add($yScroll)
		.unbind( ('scroll resize '.split(' ').join( namespace )).replace(/\s+/g, ' ') )
		.bind('scroll resize '.split(' ').join( namespace ), function(event) {
			if (!$table.is(':visible')) { return; } // fixes #278
			// Detect nested tables - fixes #724
			nestedStickyTop = $nestedSticky.length ? $nestedSticky.offset().top - $yScroll.scrollTop() + $nestedSticky.height() : 0;
			var offset = $table.offset(),
				yWindow = $.isWindow( $yScroll[0] ), // $.isWindow needs jQuery 1.4.3
				xWindow = $.isWindow( $xScroll[0] ),
				// scrollTop = ( $attach.length ? $attach.offset().top : $yScroll.scrollTop() ) + stickyOffset + nestedStickyTop,
				scrollTop = ( $attach.length ? ( yWindow ? $yScroll.scrollTop() : $yScroll.offset().top ) : $yScroll.scrollTop() ) + stickyOffset + nestedStickyTop,
				tableHeight = $table.height() - ($stickyWrap.height() + ($tfoot.height() || 0)),
				isVisible = ( scrollTop > offset.top ) && ( scrollTop < offset.top + tableHeight ) ? 'visible' : 'hidden',
				cssSettings = { visibility : isVisible };

			if ($attach.length) {
				cssSettings.top = yWindow ? scrollTop - $attach.offset().top : $attach.scrollTop();
			}
			if (xWindow) {
				// adjust when scrolling horizontally - fixes issue #143
				cssSettings.left = $table.offset().left - parseInt($table.css('margin-left'), 10) - $xScroll.scrollLeft() - spacing;
			}
			if ($nestedSticky.length) {
				cssSettings.top = ( cssSettings.top || 0 ) + stickyOffset + nestedStickyTop;
			}
			$stickyWrap
				.removeClass( ts.css.stickyVis + ' ' + ts.css.stickyHide )
				.addClass( isVisible === 'visible' ? ts.css.stickyVis : ts.css.stickyHide )
				.css(cssSettings);
			if (isVisible !== laststate || event.type === 'resize') {
				// make sure the column widths match
				resizeHeader();
				laststate = isVisible;
			}
		});
		if (wo.stickyHeaders_addResizeEvent) {
			ts.addHeaderResizeEvent(table);
		}

		// look for filter widget
		if ($table.hasClass('hasFilters') && wo.filter_columnFilters) {
			// scroll table into view after filtering, if sticky header is active - #482
			$table.bind('filterEnd' + namespace, function() {
				// $(':focus') needs jQuery 1.6+
				var $td = $(document.activeElement).closest('td'),
					column = $td.parent().children().index($td);
				// only scroll if sticky header is active
				if ($stickyWrap.hasClass(ts.css.stickyVis) && wo.stickyHeaders_filteredToTop) {
					// scroll to original table (not sticky clone)
					window.scrollTo(0, $table.position().top);
					// give same input/select focus; check if c.$filters exists; fixes #594
					if (column >= 0 && c.$filters) {
						c.$filters.eq(column).find('a, select, input').filter(':visible').focus();
					}
				}
			});
			ts.filter.bindSearch( $table, $stickyCells.find('.' + ts.css.filter) );
			// support hideFilters
			if (wo.filter_hideFilters) {
				ts.filter.hideFilters($stickyTable, c);
			}
		}

		$table.trigger('stickyHeadersInit');

	},
	remove: function(table, c, wo) {
		var namespace = c.namespace + 'stickyheaders ';
		c.$table
			.removeClass('hasStickyHeaders')
			.unbind( ('pagerComplete filterEnd '.split(' ').join(namespace)).replace(/\s+/g, ' ') )
			.next('.' + ts.css.stickyWrap).remove();
		if (wo.$sticky && wo.$sticky.length) { wo.$sticky.remove(); } // remove cloned table
		$(window)
			.add(wo.stickyHeaders_xScroll)
			.add(wo.stickyHeaders_yScroll)
			.add(wo.stickyHeaders_attachTo)
			.unbind( ('scroll resize '.split(' ').join(namespace)).replace(/\s+/g, ' ') );
		ts.addHeaderResizeEvent(table, false);
	}
});

})(jQuery, window);
