/*! tablesorter Editable Content widget - updated 4/12/2013
 * Requires tablesorter v2.8+ and jQuery 1.7+
 * by Rob Garrison
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
	"use strict";

	$.tablesorter.addWidget({
		id: 'editable',
		options : {
			editable_columns       : [],
			editable_enterToAccept : true,
			editable_autoResort    : false,
			editable_noEdit        : 'no-edit',
			editable_editComplete  : 'editComplete'
		},
		init: function(table, thisWidget, c, wo){
			if (!wo.editable_columns.length) { return; }
			var $t, cols = [];
			$.each(wo.editable_columns, function(i, col){
				cols.push('td:nth-child(' + (col + 1) + ')');
			});
			// IE does not allow making TR/TH/TD cells directly editable (issue #404)
			// so add a div or span inside ( it's faster than using wrapInner() )
			c.$tbodies.find( cols.join(',') ).not('.' + wo.editable_noEdit).each(function(){
				// test for children, if they exist, then make the children editable
				$t = $(this);
				( $t.children().length ? $t.children() : $t ).prop('contenteditable', true);
			});
			c.$tbodies
				.on('mouseleave.tseditable', function(){
					if (c.$table.data('contentFocused')) {
						$(':focus').trigger('blur');
					}
				})
				.on('focus.tseditable', '[contenteditable]', function(){
					c.$table.data('contentFocused', true);
					var $this = $(this), v = $this.html();
					if (wo.editable_enterToAccept) {
						// prevent enter from adding into the content
						$this.on('keydown.tseditable', function(e){
							if (e.which === 13) {
								e.preventDefault();
							}
						});
					}
					$this.data({ before : v, original: v });
				})
				.on('blur focusout keyup '.split(' ').join('.tseditable '), '[contenteditable]', function(e){
					if (!c.$table.data('contentFocused')) { return; }
					var $this = $(e.target), t;
					if (e.which === 27) {
						// user cancelled
						$this.html( $this.data('original') ).trigger('blur.tseditable');
						c.$table.data('contentFocused', false);
						return false;
					}
					t = e.type !== 'keyup' || (wo.editable_enterToAccept && e.which === 13);
					// change if new or user hits enter (if option set)
					if ($this.data('before') !== $this.html() || t) {
						$this.data('before', $this.html()).trigger('change');
						if (t) {
							c.$table
								.data('contentFocused', false)
								.trigger('updateCell', [ $this.closest('td'), wo.editable_autoResort, function(table){
									$this.trigger( wo.editable_editComplete );
								} ]);
							$this.trigger('blur.tseditable');
						}
					}
				});
		}
	});

})(jQuery);
