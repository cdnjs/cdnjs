/*! tablesorter CSS Sticky Headers widget - updated 10/26/2014 (v2.18.0)
* Requires a modern browser, tablesorter v2.8+
*/
/*jshint jquery:true, unused:false */
;(function($){
	'use strict';

	var ts = $.tablesorter;

	ts.addWidget({
		id: 'cssStickyHeaders',
		priority: 10,
		options: {
			cssStickyHeaders_offset        : 0,
			cssStickyHeaders_addCaption    : false,
			// jQuery selector or object to attach sticky header to
			cssStickyHeaders_attachTo      : null,
			cssStickyHeaders_filteredToTop : true
		},
		init : function(table, thisWidget, c, wo) {
			var isIE = 'ActiveXObject' in window, // target all versions of IE
				$table = c.$table,
				$attach = $(wo.cssStickyHeaders_attachTo),
				namespace = c.namespace + 'cssstickyheader ',
				$thead = $table.children('thead'),
				$caption = $table.children('caption'),
				$win = $attach.length ? $attach : $(window),
				$parent = $table.parent().closest('table.' + ts.css.table),
				$parentThead = $parent.length && ts.hasWidget($parent[0], 'cssStickyHeaders') ? $parent.children('thead') : [];

			$win
			.unbind('scroll resize '.split(' ').join(namespace))
			.bind('scroll resize '.split(' ').join(namespace), function() {
				var top = $attach.length ? $attach.offset().top : $win.scrollTop(),
				// add caption height; include table padding top & border-spacing or text may be above the fold (jQuery UI themes)
				// border-spacing needed in Firefox, but not webkit... not sure if I should account for that
				captionHeight = wo.cssStickyHeaders_addCaption ? ( $caption.outerHeight(true) || 0 ) +
					( parseInt( $table.css('padding-top'), 10 ) || 0 ) + ( parseInt( $table.css('border-spacing'), 10 ) || 0 ) : 0,

				bottom = $table.height() - $thead.height() - ( $table.children('tfoot').height() || 0 ) - captionHeight,
				// get bottom of nested sticky headers
				nestedStickyTop = $parentThead.length ? ( isIE ? $parent.data('cssStickyHeaderTop') : $parentThead.offset().top ) +
					$parentThead.height() - $win.scrollTop() : 0,

				// Detect nested tables - fixes #724
				deltaY = top - $table.offset().top + nestedStickyTop + ( parseInt( $table.css('border-top-width'), 10 ) || 0 ) +
					// Again, I dislike browser sniffing... but I have no idea why I need to include a captionHeight
					// for Firefox here and not for Chrome. Even IE behaves, sorta!
					( wo.cssStickyHeaders_offset || 0 ) + ( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? captionHeight : 0 ),

				finalY = deltaY > 0 && deltaY <= bottom ? deltaY : 0,

				// All IE (even IE11) can only transform header cells - fixes #447 thanks to @gakreol!
				$cells = isIE ? $thead.children().children() : $thead;

				// more crazy IE stuff.. somehow the second nested table is completely ignored
				if (isIE) {
					c.$table.data('cssStickyHeaderTop', finalY - ( $parentThead.length ? $parentThead.height() : 0 ));
					if ($parentThead.length) {
						top = $parent.data('cssStickyHeaderTop') - $parentThead.height();
						finalY = top > 0 && top <= bottom ? top : 0;
					}
				}

				if (wo.cssStickyHeaders_addCaption) {
					$cells = $cells.add($caption);
				}

				$cells.css({
					'transform' : finalY === 0 ? '' : 'translate(0px,' + finalY + 'px)',
					'-ms-transform' : finalY === 0 ? '' : 'translate(0px,' + finalY + 'px)',
					'-webkit-transform' : finalY === 0 ? '' : 'translate(0px,' + finalY + 'px)'
				});
			});
			$table.unbind('filterEnd' + namespace).bind('filterEnd' + namespace, function() {
				if (wo.cssStickyHeaders_filteredToTop) {
					// scroll top of table into view
					window.scrollTo(0, $table.position().top);
				}
			});

		},
		remove: function(table, c, wo){
			var namespace = c.namespace + 'cssstickyheader ';
			$(window).unbind('scroll resize '.split(' ').join(namespace));
			c.$table
				.unbind('filterEnd scroll resize '.split(' ').join(namespace))
				.add( c.$table.children('thead').children().children() )
				.children('thead, caption').css({
					'transform' : '',
					'-ms-transform' : '',
					'-webkit-transform' : ''
				});
		}
	});

})(jQuery);
