/*! Widget: scroller - updated 4/2/2015 (v2.21.5) *//*
	Copyright (C) 2011 T. Connell & Associates, Inc.

	Dual-licensed under the MIT and GPL licenses

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE	FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	Resizable scroller widget for the jQuery tablesorter plugin

	Version 2.0 - modified by Rob Garrison 4/12/2013; updated 3/5/2015 (v2.21.0)
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
;( function( $, window ) {
'use strict';

var ts = $.tablesorter,
	tscss = ts.css;

$.extend( ts.css, {
	scrollerWrap   : 'tablesorter-scroller',
	scrollerHeader : 'tablesorter-scroller-header',
	scrollerTable  : 'tablesorter-scroller-table',
	scrollerFooter : 'tablesorter-scroller-footer',
	scrollerFixed  : 'tablesorter-scroller-fixed',
	scrollerHasFix : 'tablesorter-scroller-has-fixed-columns',
	scrollerReset  : 'tablesorter-scroller-reset',
	scrollerRtl    : 'tablesorter-scroller-rtl'
});

ts.addWidget({
	id : 'scroller',
	priority : 60, // run after the filter widget
	options : {
		scroller_height : 300,
		scroller_jumpToHeader : true,
		scroller_upAfterSort : true,
		// set number of columns to fix
		scroller_fixedColumns : 0,
		// add hover highlighting to the fixed column (disable if it causes slowing)
		scroller_rowHighlight : 'hover',
		// bar width is now calculated; set a value to override
		scroller_barWidth : null
	},
	format: function( table, c, wo ) {
		if ( !c.isScrolling ) {
			// initialize here instead of in widget init to give the
			// filter widget time to finish building the filter row
			ts.scroller.setup( c, wo );
		}
	},
	remove : function( table, c, wo ) {
		ts.scroller.remove( c, wo );
	}
});

/* Add window resizeEnd event */
ts.window_resize = function() {
	if ( this.resize_timer ) {
		clearTimeout( this.resize_timer );
	}
	this.resize_timer = setTimeout( function() {
		$( this ).trigger( 'resizeEnd' );
	}, 250 );
};

// Add extra scroller css
$( function() {
	var style = '<style>' +
		/* measure scroll bar width */
		'.' + tscss.scrollerWrap + 'Measure { width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px; }' +
		/* reset width to get accurate measurements after window resize */
		'.' + tscss.scrollerReset + ' { width: auto !important; min-width: auto !important; max-width: auto !important; }' +
		/* overall wrapper & table section wrappers */
		'.' + tscss.scrollerWrap + ' { position: relative; overflow: hidden; }' +
		'.' + tscss.scrollerHeader + ', .' + tscss.scrollerFooter + ' { overflow: hidden; }' +
		'.' + tscss.scrollerHeader + ' table.' + tscss.table + ' { margin-bottom: 0; }' +
		'.' + tscss.scrollerFooter + ' table.' + tscss.table + ' thead { visibility: hidden, height: 0; overflow: hidden; }' +
		/* always leave the scroll bar visible for tbody, or table overflows into the scrollbar when height < max height (filtering) */
		'.' + tscss.scrollerTable + ' { overflow-y: scroll; }' +
		'.' + tscss.scrollerTable + ' table.' + tscss.table + ' { border-top: 0; margin-top: 0; margin-bottom: 0; overflow-y: scroll; }' +
		/* hide filter row in clones */
		'.' + tscss.scrollerTable + ' .' + ( tscss.filterRow || 'tablesorter-filter-row' ) + ',.' + tscss.scrollerFooter + ' .' +
			( tscss.filterRow || 'tablesorter-filter-row' ) + ',.' + tscss.scrollerTable + ' tfoot { display: none; }' +
		'.' + tscss.scrollerWrap + ' .' + tscss.scrollerFixed + ' { position: absolute; top: 0; z-index: 1; left: 0 } ' +
		'.' + tscss.scrollerWrap + ' .' + tscss.scrollerFixed + '.' + tscss.scrollerRtl + ' { left: auto; right: 0 } ' +
		/* visibly hide header rows in clones, so we can still set a width on it and still effect the rest of the column */
		'.' + tscss.scrollerTable + ' table.' + tscss.table + ' thead tr.' + tscss.headerRow + ' *, .' + tscss.scrollerFooter +
			' table.' + tscss.table + ' thead * { line-height: 0; height: 0; border: none; background-image: none; padding-top: 0;' +
			' padding-bottom: 0; margin-top: 0; margin-bottom: 0; overflow: hidden; }' +

		/*** fixed column ***/
		'.' + tscss.scrollerFixed + ' { pointer-events: none; }' +
		/* add horizontal scroll bar */
		'.' + tscss.scrollerWrap + '.' + tscss.scrollerHasFix + ' > .' + tscss.scrollerTable + ' { overflow-x: scroll; }' +
		/* need to position the tbody & tfoot absolutely to hide the scrollbar & move the footer below the horizontal scrollbar */
		'.' + tscss.scrollerFixed + ' .' + tscss.scrollerFooter + ' { position: absolute; bottom: 0; }' +
		/* hide fixed tbody scrollbar - see http://goo.gl/VsLe6n */
		'.' + tscss.scrollerFixed + ' .' + tscss.scrollerTable + ' { position: relative; left: 0; overflow-x: hidden; overflow-y: scroll; -ms-overflow-style: none; }' +
		'.' + tscss.scrollerFixed + ' .' + tscss.scrollerTable + '::-webkit-scrollbar { display: none; }' +
		/* remove right border of fixed header tables to hide the boundary */
		'.' + tscss.scrollerWrap + ' .' + tscss.scrollerFixed + ' table { border-right-color: transparent; padding-right: 0; }' +
		'.' + tscss.scrollerWrap + ' .' + tscss.scrollerFixed + '.' + tscss.scrollerRtl + ' table { border-left-color: transparent; padding-left: 0; }' +
		'</style>';
	$( style ).appendTo( 'body' );
});

ts.scroller = {

	// Ugh.. Firefox misbehaves, so it needs to be detected
	isFirefox : navigator.userAgent.toLowerCase().indexOf( 'firefox' ) > -1,

	hasScrollBar : function( $target ) {
		return $target.get(0).scrollHeight > $target.height();
	},

	setWidth : function( $el, width ) {
		$el.css({
			'width' : width,
			'min-width' : width,
			'max-width' : width
		});
	},

	// modified from http://davidwalsh.name/detect-scrollbar-width
	getBarWidth : function() {
		var $scrollDiv = $( '<div class="' + tscss.scrollerWrap + 'Measure">' ).appendTo( 'body' ),
			div = $scrollDiv[ 0 ],
			barWidth = div.offsetWidth - div.clientWidth;
		$scrollDiv.remove();
		return barWidth;
	},

	setup : function( c, wo ) {
		var maxHt, tbHt, $hdr, $t, $hCells, $fCells, $tableWrap,
			$win = $( window ),
			namespace = c.namespace + 'tsscroller',
			$foot = $(),
			// c.namespace contains a unique tablesorter ID, per table
			id = c.namespace.slice( 1 ) + 'tsscroller',
			$table = c.$table;

		// force developer to set fixedWidth to maintain column widths
		c.widthFixed = true;
		maxHt = wo.scroller_height || 300;
		tbHt = $table.children( 'tbody' ).height();
		if ( tbHt !== 0 && maxHt > tbHt ) { maxHt = tbHt + 10; }  // Table is less than h px

		wo.scroller_$header = $hdr = $( '<table class="' + $table.attr( 'class' ) + '" cellpadding=0 cellspacing=0>' +
			$table.children( 'thead' )[0].outerHTML +
			'</table>' )
			.addClass( c.namespace.slice(1) + '_extra_table' );

		$t = $table.children( 'tfoot' );
		if ( $t.length ) {
			$foot = $( '<table class="' + $table.attr('class') + '" cellpadding=0 cellspacing=0 style="margin-top:0"></table>' )
				.addClass( c.namespace.slice(1) + '_extra_table' )
				.append( $t.clone( true ) ) // maintain any bindings on the tfoot cells
				.append( $table.children( 'thead' )[ 0 ].outerHTML )
				.wrap( '<div class="' + tscss.scrollerFooter + '"/>' );
			$fCells = $foot.children( 'tfoot' ).eq( 0 ).children( 'tr' ).children();
		}
		wo.scroller_$footer = $foot;

		$table
			.wrap( '<div id="' + id + '" class="' + tscss.scrollerWrap + '" />' )
			.before( $hdr )
			// shrink filter row but don't completely hide it because the inputs/selectors may distort the columns
			.find( '.' + tscss.filterRow ).addClass( tscss.filterRowHide );

		wo.scroller_$container = $table.parent();

		if ( $foot.length ) {
			// $foot.parent() to include <div> wrapper
			$table.after( $foot.parent() );
		}

		$hCells = $hdr
			.wrap( '<div class="' + tscss.scrollerHeader + '" />' )
			.find( '.' + tscss.header );

		// use max-height, so the height resizes dynamically while filtering
		$table.wrap( '<div class="' + tscss.scrollerTable + '" style="max-height:' + maxHt + 'px;" />' );
		$tableWrap = $table.parent();

		// make scroller header sortable
		ts.bindEvents( c.table, $hCells );

		// look for filter widget
		if ( $table.hasClass( 'hasFilters' ) ) {
			ts.filter.bindSearch( $table, $hdr.find('.' + tscss.filter) );
		}

		// remove any previous fixed columns ( in case we're updating )
		wo.scroller_$container.find( '.' + tscss.scrollerFixed ).remove();

		if ( wo.scroller_fixedColumns > 0 ) {
			ts.scroller.setupFixed( c, wo );
		}

		ts.scroller.resize( c, wo );

		$table.find( 'thead' ).css( 'visibility', 'hidden' );

		tbHt = $tableWrap.parent().height();

		// The header will always jump into view if scrolling the table body
		$tableWrap
			.off( 'scroll' + namespace )
			.on( 'scroll' + namespace, function() {
				if ( wo.scroller_jumpToHeader ) {
					var pos = $win.scrollTop() - $hdr.offset().top;
					if ( $( this ).scrollTop() !== 0 && pos < tbHt && pos > 0 ) {
						$win.scrollTop( $hdr.offset().top );
					}
				}
				$hdr.parent().add( $foot.parent() ).scrollLeft( $( this ).scrollLeft() );
			});

		// Sorting, so scroll to top
		$table
			.off( 'sortEnd' + namespace + ' setFixedColumnSize' + namespace )
			.on( 'sortEnd' + namespace, function() {
				if ( wo.scroller_upAfterSort ) {
					$table.parent().animate({ scrollTop: 0 }, 'fast' );
				}
			})
			.on( 'setFixedColumnSize' + namespace, function( event, size ) {
				if ( typeof size !== 'undefined' && !isNaN( size ) ) {
					wo.scroller_fixedColumns = parseInt( size, 10 );
				}
				// remove fixed columns
				wo.scroller_$container.find( '.' + tscss.scrollerFixed ).remove();
				if ( size > 0 && size < c.columns - 1 ) {
					ts.scroller.setupFixed( c, wo );
				} else {
					wo.scroller_$container.removeClass( tscss.scrollerHasFix );
				}
			});

		// Setup window.resizeEnd event
		$win
			.off( 'resize resizeEnd '.split( ' ' ).join( namespace + ' ' ) )
			.on( 'resize' + namespace, ts.window_resize )
			.on( 'resizeEnd' + namespace, function() {
				// IE calls resize when you modify content, so we have to unbind the resize event
				// so we don't end up with an infinite loop. we can rebind after we're done.
				$win.off( 'resize' + namespace, ts.window_resize );
				ts.scroller.resize( c, wo );
				$win.on( 'resize' + namespace, ts.window_resize );
			});

		// initialization flag
		c.isScrolling = true;

	},

	resize : function( c, wo ) {
		var index, borderWidth, setWidth, $hCells, $bCells, $fCells, $headers, $this,
			$table = c.$table,
			$tableWrap = $table.parent(),
			$hdr = wo.scroller_$header,
			$foot = wo.scroller_$footer,
			id = c.namespace.slice( 1 ) + 'tsscroller',
			// Hide other scrollers so we can resize
			$div = $( 'div.' + tscss.scrollerWrap + '[id != "' + id + '"]' ).hide();

		$table.children( 'thead' ).show();
		// only remove colgroup if it was added by the plugin
		// the $.tablesorter.fixColumnWidth() function already does this (v2.19.0)
		// but we need to get "accurate" resized measurements here - see issue #680
		$table.add( $hdr ).add( $foot ).children( 'colgroup' ).remove();

		// Reset sizes so parent can resize.
		$table
			.addClass( tscss.scrollerReset )
			.children( 'thead' )
			.find( '.' + tscss.headerIn ).addClass( tscss.scrollerReset ).end()
			.find( '.' + tscss.filterRow ).show();
		$tableWrap.addClass( tscss.scrollerReset );

		// include left & right border widths
		borderWidth = parseInt( $table.css( 'border-left-width' ), 10 );

		// Shrink a bit to accommodate scrollbar
		wo.scroller_barSetWidth = ( wo.scroller_barWidth || ts.scroller.getBarWidth() || 18 ) + borderWidth;

		$tableWrap.width( $tableWrap.parent().innerWidth() - ( ts.scroller.hasScrollBar( $tableWrap.parent() ) ? wo.scroller_barSetWidth : 0 ) );
		setWidth = $tableWrap.innerWidth() - ( ts.scroller.hasScrollBar( $tableWrap ) ? wo.scroller_barSetWidth : 0 ) + borderWidth;
		$hdr.parent().add( $foot.parent() ).width( setWidth );

		$hCells = $hdr.children( 'thead' ).children().children( 'th, td' ).filter( ':visible' );
		$bCells = $table.children('tbody').eq( 0 ).children().eq( 0 ).children( 'th, td' ).filter( ':visible' );
		$fCells = $foot.children( 'tfoot' ).children().children( 'th, td' ).filter( ':visible' );

		ts.scroller.setWidth( $hCells.add( $bCells ).add( $fCells ), '' );
		$headers = $table.children( 'thead' ).children().eq( 0 ).children( 'th, td' );
		for ( index = 0; index < $headers.length; index++ ) {
			$this = $headers.eq( index );
			// code from https://github.com/jmosbech/StickyTableHeaders
			if ( $this.css( 'box-sizing' ) === 'border-box' ) {
				setWidth = $this.outerWidth();
			} else {
				if ( $hCells.eq( index ).css( 'border-collapse' ) === 'collapse' ) {
					if ( $this.length && window.getComputedStyle ) {
						setWidth = parseFloat( window.getComputedStyle( $this[0], null ).width );
					} else {
						// ie8 only
						borderWidth = parseFloat( $this.css( 'border-width' ) ) || 0;
						setWidth = $this.outerWidth() - parseFloat( $this.css( 'padding-left' ) ) - parseFloat( $this.css( 'padding-right' ) ) - borderWidth;
					}
				} else {
					setWidth = $this.width();
				}
			}
			ts.scroller.setWidth( $hCells.eq( index ).add( $bCells.eq( index ) ).add( $fCells.eq( index ) ), setWidth );
		}

		wo.scroller_$container
			.find( '.' + tscss.scrollerReset )
			.removeClass( tscss.scrollerReset );

		// refresh colgroup & copy to cloned header
		ts.fixColumnWidth( c.table );

		// add colgroup to all clones
		$hCells = $table.children( 'colgroup' );
		if ( $hCells.length ) {
			$bCells = $hCells[0].outerHTML;
			$hdr.prepend( $bCells );
			if ( $foot.length ) {
				$foot.prepend( $bCells );
			}
		}

		// update fixed column sizes
		if ( wo.scroller_fixedColumns > 0 ) {
			ts.scroller.updateFixed( c, wo, true );
		}

		// hide filter row because filterEnd event fires
		$table.children( 'thead' ).find( '.' + tscss.filterRow ).hide();

		$div.show();

	},

	// Add fixed (frozen) columns
	setupFixed : function( c, wo ) {
		var index, index2, $el, len, temp, $fixedColumn, $fixedTbody, $fixedContainer,
			$table = c.$table,
			namespace = c.namespace + 'tsscrollerFixed',
			$wrapper = wo.scroller_$container,
			fixedColumns = wo.scroller_fixedColumns;

		$fixedColumn = $wrapper
			.addClass( tscss.scrollerHasFix )
			.clone()
			.addClass( tscss.scrollerFixed )
			.removeClass( tscss.scrollerWrap )
			.attr( 'id', '' );
		$fixedTbody = $fixedColumn.find( '.' + tscss.scrollerTable );
		$fixedTbody.find( 'table' )
			.addClass( c.namespace.slice(1) + '_extra_table' )
			.attr( 'id', '' );
		$fixedContainer = $fixedTbody.find( 'tbody' );

		wo.scroller_$fixedColumns = $fixedColumn;

		// RTL support (fixes column on right)
		if ( $table.hasClass( tscss.scrollerRtl ) ) {
			$fixedColumn.addClass( tscss.scrollerRtl );
		}

		$el = $fixedColumn.find( 'tr' );
		len = $el.length;
		for ( index = 0; index < len; index++ ) {
			$el.eq( index ).children( ':gt(' + ( fixedColumns - 1 ) + ')' ).remove();
		}
		$fixedColumn.hide().prependTo( $wrapper );

		// look for filter widget
		if ( c.$table.hasClass( 'hasFilters' ) ) {
			ts.filter.bindSearch( $table, $fixedColumn.find( '.' + tscss.filter ) );
			// disable/enable filters behind fixed column
			$el = $wrapper.children( '.' + tscss.scrollerHeader ).find( '.' + tscss.filter );
			len = $el.length;
			for ( index = 0; index < len; index++ ) {
				// previously disabled filter; don't mess with it! filterDisabled class added by filter widget
				if ( !$el.eq( index ).hasClass( tscss.filterDisabled || 'disabled' ) ) {
					// disable filters behind fixed column; don't disable visible filters
					$el.eq( index ).prop( 'disabled', index < fixedColumns );
				}
			}
			// enable visible fixed column filters
			$fixedColumn.children( '.' + tscss.scrollerHeader ).find( '.' + tscss.filter ).css( 'pointer-events', 'all' );
		}

		// disable/enable tab indexes behind fixed column
		c.$table.children( 'thead' ).children( 'tr.' + tscss.headerRow ).children().attr( 'tabindex', -1 );
		$el = wo.scroller_$header
			.add( $fixedColumn.find( '.' + tscss.scrollerTable + ' table, .' + tscss.scrollerFooter + ' table' ) )
			.children( 'thead' ).children( 'tr.' + tscss.headerRow );
		len = $el.length;
		for ( index = 0; index < len; index++ ) {
			temp = $el.eq( index ).children();
			for ( index2 = 0; index2 < temp.length; index2++ ) {
				temp.eq( index2 ).attr( 'tabindex', index2 < fixedColumns ? -1 : 0 );
			}
		}

		ts.bindEvents( c.table, $fixedColumn.find( '.' + tscss.header ) );

		// update thead & tbody in fixed column
		temp = ( 'tablesorter-initialized sortEnd filterEnd ' ).split( ' ' ).join( namespace + ' ' );
		c.$table
			.off( temp )
			.on( temp, function( event, size ) {
				ts.scroller.updateFixed( c, wo, false );
			})
			.parent()
			// *** SCROLL *** scroll fixed column along with main
			.off( 'scroll' + namespace )
			.on( 'scroll' + namespace, function() {
				$fixedTbody.scrollTop( $( this ).scrollTop() );
			});
		// scroll main along with fixed column
		$fixedTbody
			.off( 'scroll' + namespace )
			.on( 'scroll' + namespace, function() {
				c.$table.parent().scrollTop( $fixedTbody.scrollTop() );
			})
			.scroll();

		// *** ROW HIGHLIGHT ***
		if ( wo.scroller_rowHighlight !== '' ) {
			temp = 'mouseover mouseleave '.split( ' ' ).join( namespace + ' ' );
			c.$table
				.off( temp, 'tr' )
				.on( temp, 'tr', function( event ) {
					var indx = $( this ).index();
					$fixedContainer.children().eq( indx )
						.add( this )
						.toggleClass( wo.scroller_rowHighlight, event.type === 'mouseover' );
				});
			$fixedTbody.find( 'table' )
				.off( temp, 'tr' )
				.on( temp, 'tr', function( event ) {
					var indx = $( this ).index();
					c.$tbodies.children().eq( indx )
						.add( this )
						.toggleClass( wo.scroller_rowHighlight, event.type === 'mouseover' );
				});
		}

		/*** STUPID FIREFOX HACK! Since we can't hide the scrollbar with css ***/
		if ( ts.scroller.isFirefox ) {
			$fixedTbody.wrap( '<div class="scroller-firefox-hack" style="overflow:hidden;">' );
		}

		ts.scroller.updateFixed( c, wo, true );

	},

	updateFixed : function( c, wo ) {
		if ( !c.isScrolling ) { return; }

		// no idea why this happens, but sometimes the main table wrapper gets the scrollbar width
		// subtracted from it on load and on theme change - it can be very sporatic; this fixes it.
		c.$table.parent().width( wo.scroller_$container.width() );

		// scroller_fixedColumns
		var index, tbodyIndex, rowIndex, $tbody, $adjCol, $fb, totalRows, widths,
			$table = c.$table,
			$wrapper = wo.scroller_$container,

			// source cells for measurement
			$mainTbodies = wo.scroller_$container.children( '.' + tscss.scrollerTable ).children( 'table' ).children( 'tbody' ),
			$rows =  wo.scroller_$header.children( 'thead' ).children( '.' + tscss.headerRow ), // variable gets redefined

			// hide fixed column during resize, or we get a FOUC
			$fixedColumn = wo.scroller_$fixedColumns.hide(),

			// target cells
			$fixedTbodiesTable = $fixedColumn.find( '.' + tscss.scrollerTable ).children( 'table' ),
			$fixedTbodies = $fixedTbodiesTable.children( 'tbody' ),
			$fixedHeader = $fixedColumn.find( '.' + tscss.scrollerHeader ).children( 'table' ).children( 'thead' ),
			// variables
			isFirefox = ts.scroller.isFirefox,
			scrollBarWidth = wo.scroller_barSetWidth,
			fixedColumns = wo.scroller_fixedColumns,
			// get dimensions
			$temp = $table.find( 'tbody td' ),
			borderRightWidth = parseInt( $temp.css( 'border-right-width' ), 10 ) || 1,
			borderBottomWidth = parseInt( $temp.css( 'border-bottom-width' ), 10 ) || 1,
			borderSpacing = parseInt( $temp.css( 'border-spacing' ).split( /\s/ )[ 0 ], 10 ) / 2 || 0,
			totalWidth = parseInt( $table.css( 'padding-left' ), 10 ) +  parseInt( $table.css( 'padding-right' ), 10 ) - borderRightWidth;

		// fixed header cell height
		$temp = $fixedHeader.children( '.' + tscss.headerRow );
		for ( index = 0; index < $temp.length; index++ ) {
			$temp.eq( index ).height( $rows.eq( index ).outerHeight() );
		}

		// body cell dimensions seem to be more accurate *shrug*
		$rows = ( c.filteredRows > 0 ? c.$tbodies : $table.children( 'thead' ) ).children( 'tr:visible' );
		// recalculate widths
		widths = $rows.children( ':lt(' + fixedColumns + ')' ).map( function() {
			totalWidth += $( this ).outerWidth() + borderSpacing;
			return $( this ).outerWidth();
		}).get();

		// set fixed column width
		ts.scroller.setWidth( $fixedColumn.add( $fixedColumn.children() ), totalWidth + borderRightWidth * 2 - borderSpacing );
		ts.scroller.setWidth( $fixedColumn.find( 'table' ), totalWidth + borderRightWidth );

		// set fixed column height ( changes with filtering )
		$fixedColumn.height( $wrapper.height() );

		if ( wo.scroller_$footer.length ) {
			// adjust footer row heights (text could wrap on resize)
			$temp = $wrapper.children( '.' + tscss.scrollerFooter ).find( 'tfoot tr' );
			$rows = $fixedColumn.find( '.' + tscss.scrollerFooter + ' tfoot tr' );
			for ( index = 0; index < $rows.length; index++ ) {
				$rows.eq( index ).height( $temp.eq( index ).height() );
			}
		}
		// leave a gap under the tbody for the horizontal scrollbar
		$fixedColumn.find( '.' + tscss.scrollerTable )
			.height( $table.parent().height() - scrollBarWidth + borderBottomWidth );

		// update fixed column tbody content, set row height & set cell widths for first row
		for ( tbodyIndex = 0; tbodyIndex < c.$tbodies.length; tbodyIndex++ ) {
			$tbody = $mainTbodies.eq( tbodyIndex );
			if ( $tbody.length ) {
				// get tbody
				$rows = $tbody.children();
				totalRows = $rows.length;
				$fb = ts.processTbody( $fixedTbodiesTable, $fixedTbodies.eq( tbodyIndex ), true);
				$fb.empty();
				// update tbody cells after sort/filtering
				for ( rowIndex = 0; rowIndex < totalRows; rowIndex++ ) {
					$adjCol = $( $rows[ rowIndex ].outerHTML );
					$adjCol.children( 'td, th' ).slice( fixedColumns ).remove();
					// set row height
					$adjCol.children().eq( 0 ).height( $rows.eq( rowIndex ).outerHeight() - ( isFirefox ? borderBottomWidth * 2 : 0 ) );
					// still need to adjust tbody cell widths ( the previous row may now be filtered )
					if ( rowIndex === 0 ) {
						ts.scroller.setWidth( $adjCol.children().eq( 0 ), widths[ 0 ] );
					}
					$fb.append( $adjCol );
				}

				// adjust fixed header cell widths
				$temp = $fixedColumn.find( 'thead' ).children( 'tr.' + tscss.headerRow );
				for ( index = 0; index < fixedColumns; index++ ) {
					ts.scroller.setWidth( $temp.children( ':eq(' + index + ')' ), widths[ index ] );
				}

				// restore tbody
				ts.processTbody( $fixedTbodiesTable, $fb, false );
			}
		}

		/*** STUPID FIREFOX HACK! Since we can't hide the scrollbar with css ***/
		if ( isFirefox ) {
			$fixedTbodiesTable.parent().css({
				'width' : totalWidth + scrollBarWidth + borderRightWidth
			});
		}

		$fixedColumn.show();

	},

	remove : function( c, wo ) {
		var $wrap = wo.scroller_$container,
			namespace = c.namespace + 'tsscroller';
		c.$table
			.off( namespace )
			.insertBefore( $wrap )
			.find( 'thead' ).show().css( 'visibility', 'visible' )
			.children( 'tr.' + tscss.headerRow + ' > *' ).attr( 'tabindex', 0 )
			.end()
			.find( '.' + tscss.filterRow ).show().removeClass( tscss.filterRowHide );
		$wrap.remove();
		$( window ).off( namespace );
		c.isScrolling = false;
	}

};

})( jQuery, window );
