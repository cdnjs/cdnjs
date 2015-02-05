/*! tablesorter Editable Content widget - updated 8/1/2014 (core v2.17.6)
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
			editable_autoAccept    : true,
			editable_autoResort    : false,
			editable_validate      : null, // function(text, originalText){ return text; }
			editable_noEdit        : 'no-edit',
			editable_editComplete  : 'editComplete'
		},
		init: function(table, thisWidget, c, wo){
			if ( !wo.editable_columns.length ) { return; }
			var indx, tmp, $t,
				cols = [];
			if ( $.type(wo.editable_columns) === "string" && wo.editable_columns.indexOf('-') >= 0 ) {
				// editable_columns can contain a range string (i.e. "2-4" )
				tmp = wo.editable_columns.split('-');
				indx = parseInt(tmp[0],10) || 0;
				tmp = parseInt(tmp[1],10) || (c.columns - 1);
				if ( tmp > c.columns ) { tmp = c.columns - 1; }
				for ( ; indx <= tmp; indx++ ) {
					cols.push('td:nth-child(' + (indx + 1) + ')');
				}
			} else if ( $.isArray(wo.editable_columns) ) {
				$.each(wo.editable_columns, function(i, col){
					if ( col < c.columns ) {
						cols.push('td:nth-child(' + (col + 1) + ')');
					}
				});
			}
			// IE does not allow making TR/TH/TD cells directly editable (issue #404)
			// so add a div or span inside ( it's faster than using wrapInner() )
			c.$tbodies.find( cols.join(',') ).not( '.' + wo.editable_noEdit ).each(function(){
				// test for children, if they exist, then make the children editable
				$t = $(this);
				( $t.children().length ? $t.children() : $t ).prop( 'contenteditable', true );
			});
			c.$tbodies
				.on('mouseleave.tseditable', function(){
					if ( c.$table.data('contentFocused') ) {
						// change to "true" instead of element to allow focusout to process
						c.$table.data( 'contentFocused', true );
						$(':focus').trigger('blur');
					}
				})
				.on('focus.tseditable', '[contenteditable]', function(e){
					c.$table.data( 'contentFocused', e.target );
					var $this = $(this),
						v = $this.html();
					if (wo.editable_enterToAccept) {
						// prevent enter from adding into the content
						$this.on('keydown.tseditable', function(e){
							if ( e.which === 13 ) {
								e.preventDefault();
							}
						});
					}
					$this.data({ before : v, original: v });
				})
				.on('blur focusout keydown '.split(' ').join('.tseditable '), '[contenteditable]', function(e){
					if ( !c.$table.data('contentFocused') ) { return; }
					var t,
						valid = false,
						$this = $(e.target);
					if ( e.which === 27 ) {
						// user cancelled
						$this.html( $this.data('original') ).trigger('blur.tseditable');
						c.$table.data( 'contentFocused', false );
						return false;
					}
					t = e.which === 13 && ( wo.editable_enterToAccept || e.altKey ) || wo.editable_autoAccept && e.type !== 'keydown';
					// change if new or user hits enter (if option set)
					if ( t && $this.data('before') !== $this.html() ) {
						valid = $.isFunction(wo.editable_validate) ? wo.editable_validate( $this.html(), $this.data('original') ) : $this.html();
						if ( t && valid !== false ) {
							$this
								.html( valid )
								.data('before', valid)
								.trigger('change');
							c.$table.trigger('updateCell', [ $this.closest('td'), wo.editable_autoResort, function(table){
								$this.trigger( wo.editable_editComplete, [c] );
								$this.data( 'original', $this.html() );
								if ( wo.editable_autoResort && c.sortList.length ) {
									c.$table.trigger('applyWidgets');
								}
								// restore focus last cell after updating
								setTimeout(function(){
									var t = c.$table.data('contentFocused');
									if ( t instanceof HTMLElement ) { t.focus(); }
								}, 50);
							} ]);
							return false;
						}
					}
					if ( !valid && e.type !== 'keydown' ) {
						// restore original content on blur
						$this.html( $this.data('original') );
					}
				});
		}
	});

})(jQuery);
