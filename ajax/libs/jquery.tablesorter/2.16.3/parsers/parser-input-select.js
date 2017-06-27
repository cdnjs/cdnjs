/*! input & select parsers for jQuery 1.7+ & tablesorter 2.7.11+
 * Updated 4/27/2014 (v2.16.2)
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

	// update select and all input types in the tablesorter cache when the change event fires.
	// This method only works with jQuery 1.7+
	// you can change it to use delegate (v1.4.3+) or live (v1.3+) as desired
	// if this code interferes somehow, target the specific table $('#mytable'), instead of $('table')
	$(window).load(function(){
		// this flag prevents the updateCell event from being spammed
		// it happens when you modify input text and hit enter
		var alreadyUpdating = false;
		$('table').find('tbody').on('change', 'select, input', function(e){
			if (!alreadyUpdating) {
				var $tar = $(e.target),
					$cell = $tar.closest('td'),
					$table = $cell.closest('table'),
					indx = $cell[0].cellIndex,
					c = $table[0].config,
					$hdr = c && c.$headers && c.$headers.eq(indx);
				// don't use updateCell if column is set to "sorter-false" and "filter-false"
				if ($hdr.length && $hdr.hasClass('sorter-false') && $hdr.hasClass('filter-false')){
					return false;
				}
				alreadyUpdating = true;
				$table.trigger('updateCell', [ $tar.closest('td'), resort ]);
				updateServer(e, $table, $tar);
				setTimeout(function(){ alreadyUpdating = false; }, 10);
			}
		});
	});

})(jQuery);
