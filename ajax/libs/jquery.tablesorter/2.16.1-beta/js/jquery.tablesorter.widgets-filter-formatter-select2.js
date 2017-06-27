/*! Filter widget formatter functions - updated 4/22/2014 (v2.16.1-beta)
 * requires: jQuery 1.7.2+, tableSorter 2.16+, filter widget 2.16+ and select2 v3.4.6+ plugin
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
"use strict";

var ts = $.tablesorter || {};
ts.filterFormatter = ts.filterFormatter || {};

/************************\
 Select2 Filter Formatter
\************************/
ts.filterFormatter.select2 = function($cell, indx, select2Def) {
	var o = $.extend({
		// select2 filter formatter options
		cellText : '', // Text (wrapped in a label element)
		match : true, // adds "filter-match" to header
		// include ANY select2 options below
		multiple : true,
		width : '100%'

	}, select2Def ),
	arry, data,
	c = $cell.closest('table')[0].config,
	wo = c.widgetOptions,
	// Add a hidden input to hold the range values
	$input = $('<input class="filter" type="hidden">')
	.appendTo($cell)
	// hidden filter update namespace trigger by filter widget
	.bind('change' + c.namespace + 'filter', function(){
		var val = this.value;
		val = val.replace(/[/()$]/g, '').split('|');
		updateSelect2(val);
	}),
	$header = c.$headers.filter('[data-column="' + indx + '"]:last'),
	onlyAvail = $header.hasClass(wo.filter_onlyAvail),
	$shcell = [],
	match = o.match ? '' : '$',

	// this function updates the hidden input and adds the current values to the header cell text
	updateSelect2 = function(v, notrigger) {
		v = typeof v === "undefined" || v === '' ? $cell.find('.select2').select2('val') || o.value || '' : v || '';
		$input
		// add equal to the beginning, so we filter exact numbers
		.val( $.isArray(v) && v.length ? '/(' + (v || []).join(match + '|') + match + ')/' : '' )
		.trigger( notrigger ? '' : 'search' ).end()
		.find('.select2').select2('val', v);
		// update sticky header cell
		if ($shcell.length) {
			$shcell
			.find('.select2').select2('val', v);
		}
	},

	// get options from table cell content or filter_selectSource (v2.16)
	updateOptions = function(){
		data = [];
		arry = ts.filter.getOptionSource(c.$table[0], indx, onlyAvail) || [];
		// build select2 data option
		$.each(arry, function(i,v){
			data.push({id: v, text: v});
		});
		o.data = data;
	};

	// get filter-match class from option
	$header.toggleClass('filter-match', o.match);
	if (o.cellText) {
		$cell.prepend('<label>' + o.cellText + '</label>');
	}

	// don't add default in table options if either ajax or
	// data options are already defined
	if (!(o.ajax && !$.isEmptyObject(o.ajax)) && !o.data) {
		updateOptions();
		if (onlyAvail) {
			c.$table.bind('filterEnd', function(){
				updateOptions();
				$cell.add($shcell).find('.select2').select2(o);
			});
		}
	}

	// add a select2 hidden input!
	$('<input class="select2 select2-' + indx + '" type="hidden" />')
	.val(o.value)
	.appendTo($cell)
	.select2(o)
	.bind('change', function(){
		updateSelect2();
	});

	// update select2 from filter hidden input, in case of saved filters
	c.$table.bind('filterFomatterUpdate', function(){
		// value = '/(x$|y$)/' => 'x,y'
		var val = c.$table.data('lastSearch')[indx] || '';
		val = val.replace(/[/()$]/g, '').split('|');
		$cell.find('.select2').select2('val', val);
		updateSelect2(val, true);
	});

	// has sticky headers?
	c.$table.bind('stickyHeadersInit', function(){
		$shcell = c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
		// add a select2!
		$('<input class="select2 select2-' + indx + '" type="hidden">')
		.val(o.value)
		.appendTo($shcell)
		.select2(o)
		.bind('change', function(){
			$cell.find('.select2').select2('val', $shcell.find('.select2').select2('val') );
			updateSelect2();
		});
		if (o.cellText) {
			$shcell.prepend('<label>' + o.cellText + '</label>');
		}

	});

	// on reset
	c.$table.bind('filterReset', function(){
		$cell.find('.select2').select2('val', o.value || '');
		setTimeout(function(){
			updateSelect2();
		}, 0);
	});

	updateSelect2();
	return $input;
};

})(jQuery);
