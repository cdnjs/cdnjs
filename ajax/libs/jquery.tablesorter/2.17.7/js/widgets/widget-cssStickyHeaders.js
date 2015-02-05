/*! tablesorter CSS Sticky Headers widget - updated 5/5/2014 (v2.16.4)
* Requires a modern browser, tablesorter v2.8+
*/
/*jshint jquery:true, unused:false */
;(function($){
	"use strict";

	$.tablesorter.addWidget({
		id: "cssStickyHeaders",
		priority: 10,
		options: {
			cssStickyHeaders_offset        : 0,
			cssStickyHeaders_addCaption    : false,
			cssStickyHeaders_attachTo      : null,
			cssStickyHeaders_filteredToTop : true,
			cssStickyHeaders_zIndex        : 10
		},
		init : function(table, thisWidget, c, wo) {
			var $attach = $(wo.cssStickyHeaders_attachTo),
				namespace = '.cssstickyheader',
				$thead = c.$table.children('thead'),
				$caption = c.$table.find('caption'),
				$win = $attach.length ? $attach : $(window);
			$win.bind('scroll resize '.split(' ').join(namespace + ' '), function() {
				var top = $attach.length ? $attach.offset().top : $win.scrollTop(),
				// add caption height; include table padding top & border-spacing or text may be above the fold (jQuery UI themes)
				// border-spacing needed in Firefox, but not webkit... not sure if I should account for that
				captionTop = wo.cssStickyHeaders_addCaption ? $caption.outerHeight(true) +
					(parseInt(c.$table.css('padding-top'), 10) || 0) + (parseInt(c.$table.css('border-spacing'), 10) || 0) : 0,
				bottom = c.$table.height() - $thead.height() - (c.$table.find('tfoot').height() || 0) - captionTop,
				deltaY = top - $thead.offset().top + (parseInt(c.$table.css('border-top-width'), 10) || 0) +
					(wo.cssStickyHeaders_offset || 0) + captionTop,
				finalY = (deltaY > 0 && deltaY <= bottom ? deltaY : 0),
				// IE can only transform header cells - fixes #447 thanks to @gakreol!
				$cells = $thead.children().children();
				if (wo.cssStickyHeaders_addCaption) {
					$cells = $cells.add($caption);
				}
				$cells.css({
					"position" : "relative",
					"z-index" : wo.cssStickyHeaders_zIndex,
					"transform" : finalY === 0 ? "" : "translate(0px," + finalY + "px)",
					"-ms-transform" : finalY === 0 ? "" : "translate(0px," + finalY + "px)",
					"-webkit-transform" : finalY === 0 ? "" : "translate(0px," + finalY + "px)"
				});
			});
			c.$table.bind('filterEnd', function() {
				if (wo.cssStickyHeaders_filteredToTop) {
					// scroll top of table into view
					window.scrollTo(0, c.$table.position().top);
				}
			});

		},
		remove: function(table, c, wo){
			var namespace = '.cssstickyheader';
			$(window).unbind('scroll resize '.split(' ').join(namespace + ' '));
			c.$table
				.unbind('update updateAll '.split(' ').join(namespace + ' '))
				.children('thead, caption').css({
					"position" : "",
					"z-index" : "",
					"transform" : "",
					"-ms-transform" : "",
					"-webkit-transform" : ""
				});
		}
	});

})(jQuery);
