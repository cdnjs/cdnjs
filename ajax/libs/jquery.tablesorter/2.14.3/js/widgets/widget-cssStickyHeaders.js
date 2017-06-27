/*! tablesorter CSS Sticky Headers widget (beta) - updated 12/2/2013 (v2.14.3)
* Requires a modern browser, tablesorter v2.8+ and jQuery 1.7+
*/
/*global jQuery: false */
;(function($){
	"use strict";

	$.tablesorter.addWidget({
		id: "cssStickyHeaders",
		priority: 10,
		options: {
			cssStickyHeaders_offsetX : 0,
			cssStickyHeaders_offsetY : 0
		},
		init : function(table, thisWidget, c, wo) {
			var offset, bottom,
				namespace = '.cssstickyheader',
				$win = $(window),
				$thead = c.$table.children('thead'),
				left = 0;
			$win
				.bind('scroll resize '.split(' ').join(namespace + ' '), function() {
					var offset = c.$table.offset(),
						bottom = c.$table.height() - $thead.height() - (c.$table.find('tfoot').height() || 0),
						deltaY = $win.scrollTop() - offset.top - 1, // subtract out top border
						deltaX = $win.scrollLeft() + offset.left;
					// IE can only transform header cells - fixes #447 thanks to @gakreol!
					$thead.children().children().css({
						// this non-prefixed transform has cross-browser support in jQuery 1.8+
						"transform": "translate(" +
							(deltaX > 0 && deltaX <= left ? deltaX - wo.cssStickyHeaders_offsetX : 0) + "px," +
							(deltaY > 0 && deltaY <= bottom ? deltaY - wo.cssStickyHeaders_offsetY : 0) + "px)"
					});
				});
		},
		remove: function(table, c, wo){
			var namespace = '.cssstickyheader';
			$(window).unbind('scroll resize '.split(' ').join(namespace + ' '));
			c.$table
				.unbind('update updateAll '.split(' ').join(namespace + ' '))
				.children('thead').css({ "transform": "translate(0px, 0px)" });
		}
	});

})(jQuery);
