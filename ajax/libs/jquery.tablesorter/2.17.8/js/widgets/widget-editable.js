/*! tablesorter Editable Content widget - updated 9/15/2014 (core v2.17.8)
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
			editable_wrapContent   : '<div>', // wrap the cell content... makes this widget work in IE, and with autocomplete
			editable_trimContent   : true,    // trim content inside of contenteditable (remove tabs & carriage returns)
			editable_validate      : null,    // function(text, originalText){ return text; }
			editable_focused       : null,    // function(text, columnIndex, $element) {}
			editable_blur          : null,    // function(text, columnIndex, $element) { }
			editable_selectAll     : false,   // true/false or function(text, columnIndex, $element) { return true; }
			editable_noEdit        : 'no-edit',
			editable_editComplete  : 'editComplete'
		},
		init: function(table, thisWidget, c, wo){
			if ( !wo.editable_columns.length ) { return; }
			var indx, tmp, $t,
				cols = [],
				editComplete = function($cell, refocus){
					$cell
						.removeClass('tseditable-last-edited-cell')
						.trigger( wo.editable_editComplete, [c] );
					// restore focus last cell after updating
					if (refocus) {
						setTimeout(function(){
							$cell.focus();
						}, 50);
					}
				},
				selectAll = function(cell){
					setTimeout(function(){
						// select all text in contenteditable
						// see http://stackoverflow.com/a/6150060/145346
						var range = document.createRange();
						range.selectNodeContents(cell);
						var sel = window.getSelection();
						sel.removeAllRanges();
						sel.addRange(range);
					}, 100);
				};

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
			tmp = $('<div>').wrapInner(wo.editable_wrapContent).children().length || $.isFunction(wo.editable_wrapContent);
			// IE does not allow making TR/TH/TD cells directly editable (issue #404)
			// so add a div or span inside ( it's faster than using wrapInner() )
			c.$tbodies.find( cols.join(',') ).not( '.' + wo.editable_noEdit ).each(function(){
				// test for children, if they exist, then make the children editable
				$t = $(this);

				if (tmp && $t.children().length === 0) {
					$t.wrapInner( wo.editable_wrapContent );
				}
				if ($t.children().length) {
					// make all children content editable
					$t.children().not('.' + wo.editable_noEdit).each(function(){
						var $this = $(this);
						if (wo.editable_trimContent) {
							$this.text(function(i, txt){
								return $.trim(txt);
							});
						}
						$this.prop( 'contenteditable', true );
					});
				} else {
					if (wo.editable_trimContent) {
						$t.text(function(i, txt){
							return $.trim(txt);
						});
					}
					$t.prop( 'contenteditable', true );
				}
			});
			c.$tbodies
				.on('mouseleave.tseditable', function(){
					if ( c.$table.data('contentFocused') ) {
						// change to "true" instead of element to allow focusout to process
						c.$table.data( 'contentFocused', true );
						$(':focus').trigger('focusout');
					}
				})
				.on('focus.tseditable', '[contenteditable]', function(e){
					clearTimeout( $(this).data('timer') );
					c.$table.data( 'contentFocused', e.target );
					var $this = $(this),
						selAll = wo.editable_selectAll,
						column = $this.closest('td').index(),
						txt = $.trim( $this.text() );
					if (wo.editable_enterToAccept) {
						// prevent enter from adding into the content
						$this.on('keydown.tseditable', function(e){
							if ( e.which === 13 ) {
								e.preventDefault();
							}
						});
					}
					$this.data({ before : txt, original: txt });

					if (typeof wo.editable_focused === 'function') {
						wo.editable_focused( txt, column, $this );
					}

					if (selAll) {
						if (typeof selAll === 'function') {
							if ( selAll( txt, column, $this ) ) {
								selectAll($this[0]);
							}
						} else {
							selectAll($this[0]);
						}
					}
				})
				.on('blur focusout keydown '.split(' ').join('.tseditable '), '[contenteditable]', function(e){
					if ( !c.$table.data('contentFocused') ) { return; }
					var t, validate,
						valid = false,
						$this = $(e.target),
						txt = $.trim( $this.text() ),
						column = $this.closest('td').index();
					if ( e.which === 27 ) {
						// user cancelled
						$this.html( $.trim( $this.data('original') ) ).trigger('blur.tseditable');
						c.$table.data( 'contentFocused', false );
						return false;
					}
					// accept on enter (if set), alt-enter (always) or if autoAccept is set and element is blurred or unfocused
					t = e.which === 13 && ( wo.editable_enterToAccept || e.altKey ) || wo.editable_autoAccept && e.type !== 'keydown';
					// change if new or user hits enter (if option set)
					if ( t && $this.data('before') !== txt ) {

						validate = wo.editable_validate;
						valid = txt;

						if (typeof(validate) === "function") {
							valid = validate( txt, $this.data('original'), column, $this );
						} else if (typeof (validate = $.tablesorter.getColumnData( table, validate, column )) === 'function') {
							valid = validate( txt, $this.data('original'), column, $this );
						}

						if ( t && valid !== false ) {
							c.$table.find('.tseditable-last-edited-cell').removeClass('tseditable-last-edited-cell');
							$this
								.addClass('tseditable-last-edited-cell')
								.html( $.trim( valid ) )
								.data('before', valid)
								.data('original', valid)
								.trigger('change');
							c.$table.trigger('updateCell', [ $this.closest('td'), false, function(){
								if (wo.editable_autoResort) {
									setTimeout(function(){
										c.$table.trigger("sorton", [ c.sortList, function(){
											editComplete(c.$table.find('.tseditable-last-edited-cell'), true);
										}, true ]);
									}, 10);
								} else {
									editComplete(c.$table.find('.tseditable-last-edited-cell'));
								}
							} ]);
							return false;
						}
					} else if ( !valid && e.type !== 'keydown' ) {
						clearTimeout( $this.data('timer') );
						$this.data('timer', setTimeout(function(){
							if ($.isFunction(wo.editable_blur)) {
								wo.editable_blur( $.trim( $this.text() ), column, $this );
							}
						}, 100));
						// restore original content on blur
						$this.html( $.trim( $this.data('original') ) );
					}
				});
		}
	});

})(jQuery);
