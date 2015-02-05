/*! input & select parsers for jQuery 1.7+ & tablesorter 2.7.11+
 * Updated 9/15/2014 (v2.17.8)
 * Demo: http://mottie.github.com/tablesorter/docs/example-widget-grouping.html
 */
/*jshint browser: true, jquery:true, unused:false */
;(function($){
"use strict";

	var resort = true, // resort table after update
		updateServer = function(event, $table, $input){
			// do something here to update your server, if needed
			// event = change event object
			// $table = jQuery object of the table that was just updated
			// $input = jQuery object of the input or select that was modified
		};

	// Custom parser for parsing input values
	// updated dynamically using the "change" function below
	$.tablesorter.addParser({
		id: "inputs",
		is: function(){
			return false;
		},
		format: function(s, table, cell) {
			return $(cell).find('input').val() || s;
		},
		parsed : true, // filter widget flag
		type: "text"
	});

	// Custom parser for including checkbox status if using the grouping widget
	// updated dynamically using the "change" function below
	$.tablesorter.addParser({
		id: "checkbox",
		is: function(){
			return false;
		},
		format: function(s, table, cell, cellIndex) {
			var $c = $(cell),
				$input = $c.find('input[type="checkbox"]'),
				isChecked = $input.length ? $input[0].checked : '';
			// adding class to row, indicating that a checkbox is checked; includes
			// a column index in case more than one checkbox happens to be in a row
			$c.closest('tr').toggleClass('checked-' + cellIndex, isChecked);
			// returning plain language here because this is what is shown in the
			// group headers - change it as desired
			return $input.length ? isChecked ? 'checked' : 'unchecked' : s;
		},
		parsed : true, // filter widget flag
		type: "text"
	});

	// Custom parser which returns the currently selected options
	// updated dynamically using the "change" function below
	$.tablesorter.addParser({
		id: "select",
		is: function(){
			return false;
		},
		format: function(s, table, cell) {
			return $(cell).find('select').val() || s;
		},
		parsed : true, // filter widget flag
		type: "text"
	});

	// Select parser to get the selected text
	$.tablesorter.addParser({
		id: "select-text",
		is: function(){
			return false;
		},
		format: function(s, table, cell) {
			var $s = $(cell).find('select');
			return $s.length ? $s.find('option:selected').text() || '' : s;
		},
		parsed : true, // filter widget flag
		type: "text"
	});

	// Custom parser for parsing textarea values
	// updated dynamically using the "change" function below
	$.tablesorter.addParser({
		id: "textarea",
		is: function(){
			return false;
		},
		format: function(s, table, cell) {
			return $(cell).find('textarea').val() || s;
		},
		parsed : true, // filter widget flag
		type: "text"
	});

	// update select and all input types in the tablesorter cache when the change event fires.
	// This method only works with jQuery 1.7+
	// you can change it to use delegate (v1.4.3+) or live (v1.3+) as desired
	// if this code interferes somehow, target the specific table $('#mytable'), instead of $('table')
	$(function(){
		$('table').on('tablesorter-initialized', function(){
			// this flag prevents the updateCell event from being spammed
			// it happens when you modify input text and hit enter
			var focused = false,
				restoreValue = function(isTbody){
					// focused = false; // uncomment this line to prevent auto-accepting changes
					// make sure we restore original values
					// isTbody is needed to prevent the select from closing in IE
					// see https://connect.microsoft.com/IE/feedbackdetail/view/962618/
					if (isTbody) {
						$(':focus').blur();
					}
					return;
				};
			// bind to .tablesorter (default class name)
			$(this).children('tbody')
			.on('mouseleave', function(e){
				restoreValue(e.target.tagName === 'TBODY');
			})
			.on('focus', 'select, input, textarea', function(){
				focused = true;
				$(this).data('ts-original-value', this.value);
			})
			.on('blur', 'input, textarea', function(){
				// restore input value;
				// "change" is triggered before "blur" so this doesn't replace the new update with the original
				this.value = $(this).data('ts-original-value');
			})
			.on('change keyup', 'select, input, textarea', function(e){
				if ( e.which === 27 ) {
					// escape: restore original value
					this.value = $(this).data('ts-original-value');
					return;
				}
				// Update cell cache using... select: change, input: enter or textarea: alt + enter
				if ( ( e.type === 'change' && focused ) ||
					( e.type === 'keyup' && e.which === 13 && ( e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' && e.altKey ) ) ) {
					var $tar = $(e.target),
						$cell = $tar.closest('td'),
						$table = $cell.closest('table'),
						indx = $cell[0].cellIndex,
						c = $table[0].config || false,
						$hdr = c && c.$headers && c.$headers.eq(indx);
					// abort if not a tablesorter table, or
					// don't use updateCell if column is set to "sorter-false" and "filter-false", or column is set to "parser-false"
					if ( !c || ( $hdr && $hdr.length && ( $hdr.hasClass('parser-false') || ( $hdr.hasClass('sorter-false') && $hdr.hasClass('filter-false') ) ) ) ) {
						return restoreValue();
					}
					// ignore change event if nothing changed
					if ($tar.val() !== $tar.data('ts-original-value')) {
						$tar.data('ts-original-value', $tar.val());
						$table.trigger('updateCell', [ $tar.closest('td'), resort, function(){
							updateServer(e, $table, $tar);
							setTimeout(function(){ focused = false; }, 10);
						} ]);
					}
				}
			});
		});
	});

})(jQuery);
