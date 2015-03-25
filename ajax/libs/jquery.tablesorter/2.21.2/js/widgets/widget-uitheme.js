/*! Widget: uitheme */
;(function ($) {
'use strict';
var ts = $.tablesorter = $.tablesorter || {};

ts.themes = {
	'bootstrap' : {
		table        : 'table table-bordered table-striped',
		caption      : 'caption',
		// header class names
		header       : 'bootstrap-header', // give the header a gradient background (theme.bootstrap_2.css)
		sortNone     : '',
		sortAsc      : '',
		sortDesc     : '',
		active       : '', // applied when column is sorted
		hover        : '', // custom css required - a defined bootstrap style may not override other classes
		// icon class names
		icons        : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
		iconSortNone : 'bootstrap-icon-unsorted', // class name added to icon when column is not sorted
		iconSortAsc  : 'icon-chevron-up glyphicon glyphicon-chevron-up', // class name added to icon when column has ascending sort
		iconSortDesc : 'icon-chevron-down glyphicon glyphicon-chevron-down', // class name added to icon when column has descending sort
		filterRow    : '', // filter row class
		footerRow    : '',
		footerCells  : '',
		even         : '', // even row zebra striping
		odd          : ''  // odd row zebra striping
	},
	'jui' : {
		table        : 'ui-widget ui-widget-content ui-corner-all', // table classes
		caption      : 'ui-widget-content',
		// header class names
		header       : 'ui-widget-header ui-corner-all ui-state-default', // header classes
		sortNone     : '',
		sortAsc      : '',
		sortDesc     : '',
		active       : 'ui-state-active', // applied when column is sorted
		hover        : 'ui-state-hover',  // hover class
		// icon class names
		icons        : 'ui-icon', // icon class added to the <i> in the header
		iconSortNone : 'ui-icon-carat-2-n-s', // class name added to icon when column is not sorted
		iconSortAsc  : 'ui-icon-carat-1-n', // class name added to icon when column has ascending sort
		iconSortDesc : 'ui-icon-carat-1-s', // class name added to icon when column has descending sort
		filterRow    : '',
		footerRow    : '',
		footerCells  : '',
		even         : 'ui-widget-content', // even row zebra striping
		odd          : 'ui-state-default'   // odd row zebra striping
	}
};

$.extend(ts.css, {
	wrapper : 'tablesorter-wrapper' // ui theme & resizable
});

ts.addWidget({
	id: "uitheme",
	priority: 10,
	format: function(table, c, wo) {
		var i, hdr, icon, time, $header, $icon, $tfoot, $h, oldtheme, oldremove, oldIconRmv, hasOldTheme,
			themesAll = ts.themes,
			$table = c.$table.add( c.$extraTables ),
			$headers = c.$headers.add( c.$extraHeaders ),
			theme = c.theme || 'jui',
			themes = themesAll[theme] || {},
			remove = $.trim( [ themes.sortNone, themes.sortDesc, themes.sortAsc, themes.active ].join( ' ' ) ),
			iconRmv = $.trim( [ themes.iconSortNone, themes.iconSortDesc, themes.iconSortAsc ].join( ' ' ) );
		if (c.debug) { time = new Date(); }
		// initialization code - run once
		if (!$table.hasClass('tablesorter-' + theme) || c.theme !== c.appliedTheme || !wo.uitheme_applied) {
			wo.uitheme_applied = true;
			oldtheme = themesAll[c.appliedTheme] || {};
			hasOldTheme = !$.isEmptyObject(oldtheme);
			oldremove =  hasOldTheme ? [ oldtheme.sortNone, oldtheme.sortDesc, oldtheme.sortAsc, oldtheme.active ].join( ' ' ) : '';
			oldIconRmv = hasOldTheme ? [ oldtheme.iconSortNone, oldtheme.iconSortDesc, oldtheme.iconSortAsc ].join( ' ' ) : '';
			if (hasOldTheme) {
				wo.zebra[0] = $.trim( ' ' + wo.zebra[0].replace(' ' + oldtheme.even, '') );
				wo.zebra[1] = $.trim( ' ' + wo.zebra[1].replace(' ' + oldtheme.odd, '') );
				c.$tbodies.children().removeClass( [oldtheme.even, oldtheme.odd].join(' ') );
			}
			// update zebra stripes
			if (themes.even) { wo.zebra[0] += ' ' + themes.even; }
			if (themes.odd) { wo.zebra[1] += ' ' + themes.odd; }
			// add caption style
			$table.children('caption')
				.removeClass(oldtheme.caption || '')
				.addClass(themes.caption);
			// add table/footer class names
			$tfoot = $table
				// remove other selected themes
				.removeClass( (c.appliedTheme ? 'tablesorter-' + (c.appliedTheme || '') : '') + ' ' + (oldtheme.table || '') )
				.addClass('tablesorter-' + theme + ' ' + (themes.table || '')) // add theme widget class name
				.children('tfoot');
			c.appliedTheme = c.theme;

			if ($tfoot.length) {
				$tfoot
					// if oldtheme.footerRow or oldtheme.footerCells are undefined, all class names are removed
					.children('tr').removeClass(oldtheme.footerRow || '').addClass(themes.footerRow)
					.children('th, td').removeClass(oldtheme.footerCells || '').addClass(themes.footerCells);
			}
			// update header classes
			$headers
				.removeClass( (hasOldTheme ? [oldtheme.header, oldtheme.hover, oldremove].join(' ') : '') || '' )
				.addClass(themes.header)
				.not('.sorter-false')
				.unbind('mouseenter.tsuitheme mouseleave.tsuitheme')
				.bind('mouseenter.tsuitheme mouseleave.tsuitheme', function(event) {
					// toggleClass with switch added in jQuery 1.3
					$(this)[ event.type === 'mouseenter' ? 'addClass' : 'removeClass' ](themes.hover || '');
				});

			$headers.each(function(){
				var $this = $(this);
				if (!$this.find('.' + ts.css.wrapper).length) {
					// Firefox needs this inner div to position the icon & resizer correctly
					$this.wrapInner('<div class="' + ts.css.wrapper + '" style="position:relative;height:100%;width:100%"></div>');
				}
			});
			if (c.cssIcon) {
				// if c.cssIcon is '', then no <i> is added to the header
				$headers
					.find('.' + ts.css.icon)
					.removeClass(hasOldTheme ? [oldtheme.icons, oldIconRmv].join(' ') : '')
					.addClass(themes.icons || '');
			}
			if ($table.hasClass('hasFilters')) {
				$table.children('thead').children('.' + ts.css.filterRow)
					.removeClass(hasOldTheme ? oldtheme.filterRow || '' : '')
					.addClass(themes.filterRow || '');
			}
		}
		for (i = 0; i < c.columns; i++) {
			$header = c.$headers.add(c.$extraHeaders).not('.sorter-false').filter('[data-column="' + i + '"]');
			$icon = (ts.css.icon) ? $header.find('.' + ts.css.icon) : $();
			$h = $headers.not('.sorter-false').filter('[data-column="' + i + '"]:last');
			if ($h.length) {
				$header.removeClass(remove);
				$icon.removeClass(iconRmv);
				if ($h[0].sortDisabled) {
					// no sort arrows for disabled columns!
					$icon.removeClass(themes.icons || '');
				} else {
					hdr = themes.sortNone;
					icon = themes.iconSortNone;
					if ($h.hasClass(ts.css.sortAsc)) {
						hdr = [themes.sortAsc, themes.active].join(' ');
						icon = themes.iconSortAsc;
					} else if ($h.hasClass(ts.css.sortDesc)) {
						hdr = [themes.sortDesc, themes.active].join(' ');
						icon = themes.iconSortDesc;
					}
					$header.addClass(hdr);
					$icon.addClass(icon || '');
				}
			}
		}
		if (c.debug) {
			ts.benchmark("Applying " + theme + " theme", time);
		}
	},
	remove: function(table, c, wo, refreshing) {
		if (!wo.uitheme_applied) { return; }
		var $table = c.$table,
			theme = c.appliedTheme || 'jui',
			themes = ts.themes[ theme ] || ts.themes.jui,
			$headers = $table.children('thead').children(),
			remove = themes.sortNone + ' ' + themes.sortDesc + ' ' + themes.sortAsc,
			iconRmv = themes.iconSortNone + ' ' + themes.iconSortDesc + ' ' + themes.iconSortAsc;
		$table.removeClass('tablesorter-' + theme + ' ' + themes.table);
		wo.uitheme_applied = false;
		if (refreshing) { return; }
		$table.find(ts.css.header).removeClass(themes.header);
		$headers
			.unbind('mouseenter.tsuitheme mouseleave.tsuitheme') // remove hover
			.removeClass(themes.hover + ' ' + remove + ' ' + themes.active)
			.filter('.' + ts.css.filterRow)
			.removeClass(themes.filterRow);
		$headers.find('.' + ts.css.icon).removeClass(themes.icons + ' ' + iconRmv);
	}
});

})(jQuery);
