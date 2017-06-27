/* TableSorter 2.0 Widgets */
(function($){
// Add jQuery UI theme widget
// **************************
$.tablesorter.addWidget({
	id: "uitheme",
	format: function(table) {
		var time, klass, rmv, c = table.config,
		// ["up/down arrow (cssHeaders, unsorted)", "down arrow (cssDesc, descending)", "up arrow (cssAsc, ascending)" ]
		icons = ["ui-icon-arrowthick-2-n-s", "ui-icon-arrowthick-1-s", "ui-icon-arrowthick-1-n"];
		if (c.widgetUitheme && c.widgetUitheme.hasOwnProperty('css')) { icons = c.widgetUitheme.css || icons; }
		rmv = icons.join(' ');
		if (c.debug) {
			time = new Date();
		}
		if (!$(table).is('.ui-theme')) {
			$(table).addClass('ui-widget ui-widget-content ui-corner-all ui-theme');
			$.each(c.headerList, function(){
				$(this)
				// using "ui-theme" class in case the user adds their own ui-icon using onRenderHeader
				.addClass('ui-widget-header ui-corner-all')
				.append('<span class="ui-icon"/>')
				.hover(function(){
					$(this).addClass('ui-state-hover');
				}, function(){
					$(this).removeClass('ui-state-hover');
				});
			});
		}
		$.each(c.headerList, function(i){
			if (c.headers[i] && c.headers[i].sorter === false) {
				// no sort arrows for disabled columns!
				$(this).find('span.ui-icon').removeClass(rmv + ' ui-icon');
			} else {
				klass = ($(this).is('.' + c.cssAsc)) ? icons[1] : ($(this).is('.' + c.cssDesc)) ? icons[2] : $(this).is('.' + c.cssHeader) ? icons[0] : '';
				$(this)[klass === icons[0] ? 'removeClass' : 'addClass']('ui-state-active')
					.find('span.ui-icon').removeClass(rmv).addClass(klass);
			}
		});
		if (c.debug) {
			$.tablesorter.benchmark("Applying uitheme widget", time);
		}
	}
});

// Add Column styles widget
// **************************
$.tablesorter.addWidget({
	id: "columns",
	format: function(table) {
		var $td, time, i, last, rmv,
		c = table.config,
		list = c.sortList,
		len = list.length,
		css = [ "primary", "secondary", "tertiary" ];
		if (c.widgetColumns && c.widgetColumns.hasOwnProperty('css')) { css = c.widgetColumns.css || css; }
		last = css.length-1;
		rmv = css.join(' ');
		if (c.debug) {
			time = new Date();
		}
		// check if there is a sort (on initialization there may not be one)
		if (list && list[0]) {
			// loop through the visible rows
			$("tr:visible", table.tBodies[0]).each(function (i) {
				$td = $(this).children().removeClass(rmv);
				// primary sort column class
				$td.eq(list[0][0]).addClass(css[0]);
				if (len > 1) {
					for (i=1; i<len; i++){
						// secondary, tertiary, etc sort column classes
						$td.eq(list[i][0]).addClass( css[i] || css[last] );
					}
				}
			});
		}
		if (c.debug) {
			$.tablesorter.benchmark("Applying Columns widget", time);
		}
	}
});

// Add Filter widget
// ** This widget doesn't work correctly with the pager plugin =( **
// **************************
$.tablesorter.addWidget({
	id: "filter",
	format: function(table) {
		if (!table.config.filtering) {
			var i, v, r, t, $td, c = table.config,
				cols = c.headerList.length,
				tbl = $(table),
				fr = '<tr class="filters">',
				time;
			if (c.debug) {
				time = new Date();
			}
			for (i=0; i < cols; i++){
				fr += '<td><input type="text" class="filter" data-col="' + i + '" style="';
				// use header option - headers: { 1: { filter: false } } OR add class="filter-false"
				fr += ((c.headers[i] && 'filter' in c.headers[i] && c.headers[i].filter === false) || $(c.headerList[i]).is('.filter-false') ) ? 'visibility:hidden' : '';
				fr += '"></td>';
			}
			tbl
				.find('thead').append(fr += '</tr>')
				.find('.filter').bind('keyup', function(e){
					v = tbl.find('.filter').map(function(){ return ($(this).val() || '').toLowerCase(); }).get();
					if (v.join('') === '') {
						tbl.find('tr').show();
					} else {
						tbl.find('tbody').find('tr').each(function(){
							r = true;
							$td = $(this).find('td');
							for (i=0; i < cols; i++){
								if (v[i] !== '' && $td.eq(i).text().toLowerCase().indexOf(v[i]) >= 0) {
									r = (r) ? true : false;
								} else if (v[i] !== '') {
									r = false;
								}
							}
							$(this)[r ? 'show' : 'hide']();
						});
					}
					tbl.trigger('applyWidgets'); // make sure zebra widget is applied
				});
			c.filtering = true;
			if (c.debug) {
				$.tablesorter.benchmark("Applying Filter widget", time);
			}
		}
	}
});

// Sticky header widget
// based on this awesome article:
// http://css-tricks.com/13465-persistent-headers/
// **************************
$.tablesorter.addWidget({
	id: "stickyHeaders",
	format: function(table) {
		if ($(table).find('.stickyHeader').length) { return; }
		var win = $(window),
			header = $(table).find('thead'),
			hdrCells = header.find('tr').children(),
			brdr = parseInt(hdrCells.eq(0).css('border-left-width'),10),
			sticky = header.find('tr').clone()
				.addClass('stickyHeader')
				.css({
					width      : header.outerWidth() + brdr * 2,
					position   : 'fixed',
					top        : 0,
					marginLeft : -brdr,
					visibility : 'hidden'
				}),
			stkyCells = sticky.children();
		// update sticky header class names to match real header
		$(table).bind('sortEnd', function(e,t){
			var th = $(t).find('thead tr'),
				sh = th.filter('.stickyHeader').children();
			th.filter(':not(.stickyHeader)').children().each(function(i){
				sh.eq(i).attr('class', $(this).attr('class'));
			});
		});
		// set sticky header cell width and link clicks to real header
		hdrCells.each(function(i){
			var t = $(this),
			s = stkyCells.eq(i)
			// set cell widths
			.width( t.width() )
			// clicking on sticky will trigger sort
			.bind('click', function(e){
				t.trigger(e);
			})
			// prevent sticky header text selection
			.bind('mousedown', function(){
				this.onselectstart = function(){ return false; };
				return false;
			});
		});
		header.prepend( sticky );
		// make it sticky!
		win
			.scroll(function(){
				var $t = $(table),
					offset = $t.offset(),
					sTop = win.scrollTop(),
					vis = ((sTop > offset.top) && (sTop < offset.top + $t.find('tbody').height())) ? 'visible' : 'hidden';
				sticky.css('visibility', vis);
			})
			.resize(function(){
				sticky.css({ width: header.outerWidth() + brdr * 2 })
				stkyCells.each(function(i){
					$(this).width( hdrCells.eq(i).width() );
				});
			});
	}
});

})(jQuery);