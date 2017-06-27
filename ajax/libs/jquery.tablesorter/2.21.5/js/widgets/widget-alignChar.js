/*! Widget: alignChar - updated 2/7/2015 (v2.19.0) *//*
 * Align Characters, Requires tablesorter v2.8+ and jQuery 1.7+
 * by Rob Garrison
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
"use strict";
var ts = $.tablesorter;

ts.alignChar = {

	init : function(table, c, wo) {
		c.$headers.filter('[' + wo.alignChar_charAttrib + ']').each(function(){
			var $this = $(this),
			vars = {
				column     : this.column,
				align      : $this.attr(wo.alignChar_charAttrib),
				alignIndex : parseInt( $this.attr(wo.alignChar_indexAttrib) || 0, 10),
				adjust     : parseFloat($this.attr(wo.alignChar_adjustAttrib)) || 0,
			};
			vars.regex = new RegExp('\\' + vars.align, 'g');
			if (typeof vars.align !== 'undefined') {
				wo.alignChar_savedVars[this.column] = vars;
				ts.alignChar.setup(table, c, wo, vars);
			}
		});
	},

	setup: function(table, c, wo, v){
		// do nothing for empty tables
		if ($.isEmptyObject(c.cache)) { return; }
		var tbodyIndex, rowIndex, start, end, last, index, rows, val, count,
			len, wLeft, wRight, alignChar, $row,
			left = [],
			right = [];
		for (tbodyIndex = 0; tbodyIndex < c.$tbodies.length; tbodyIndex++){
			rows = c.cache[tbodyIndex];
			len = rows.normalized.length;
			for (rowIndex = 0; rowIndex < len; rowIndex++) {
				// set up to work with modified cache v2.16.0+
				$row = rows.row ? rows.row[rowIndex] : rows.normalized[rowIndex][c.columns].$row;
				val = $row.find('td').eq(v.column).text().replace(/[ ]/g, "\u00a0");
				// count how many "align" characters are in the string
				count = (val.match( v.regex ) || []).length;
				// set alignment @ alignIndex (one-based index)
				if (count > 0 && v.alignIndex > 0) {
					end = Math.min(v.alignIndex, count);
					start = 0;
					index = 0;
					last = 0;
					// find index of nth align character based on alignIndex (data-align-index)
					while (start++ < end) {
						last = val.indexOf(v.align, last + 1);
						index = last < 0 ? index : last;
					}
				} else {
					index = val.indexOf(v.align);
				}
				if ( index >= 0 ) {
					left.push( val.substring(0, index) || '' );
					right.push( val.substring(index, val.length) || '' );
				} else {
					// no align character found!
					// put val in right or left based on the align index
					left.push( (count >= 1 && v.alignIndex >= count) ? '' : val || '' );
					right.push( (count >= 1 && v.alignIndex >= count) ? val || '' : '' );
				}
			}
		}

		// find widest segments
		wLeft = ($.extend([], left)).sort(function(a,b){ return b.length - a.length; })[0];
		wRight = ($.extend([], right)).sort(function(a,b){ return b.length - a.length; })[0];
		// calculate percentage widths
		v.width = v.width || ( Math.floor(wLeft.length / (wLeft.length + wRight.length) * 100) + v.adjust );
		wLeft = 'min-width:' + v.width + '%';
		wRight = 'min-width:' + (100 - v.width)  + '%';

		for (tbodyIndex = 0; tbodyIndex < c.$tbodies.length; tbodyIndex++){
			rows = c.cache[tbodyIndex];
			len = rows.normalized.length;
			for (rowIndex = 0; rowIndex < len; rowIndex++) {
				alignChar = $(wo.alignChar_wrap).length ? $(wo.alignChar_wrap).html(v.align)[0].outerHTML : v.align;
				$row = rows.row ? rows.row[rowIndex] : rows.normalized[rowIndex][c.columns].$row;
				last = right[rowIndex].slice(v.align.length);
				$row.find('td').eq(v.column).html(
					'<span class="ts-align-wrap"><span class="ts-align-left" style="' + wLeft + '">' + left[rowIndex] + '</span>' +
					'<span class="ts-align-right" style="' + wRight + '">' + ( last.length ? alignChar + last : '' ) + '</span></span>'
				);
			}
		}
		wo.alignChar_initialized = true;

	},
	remove: function(table, c, column){
		if ($.isEmptyObject(c.cache)) { return; }
		var tbodyIndex, rowIndex, len, rows, $row, $cell;
		for (tbodyIndex = 0; tbodyIndex < c.$tbodies.length; tbodyIndex++){
			rows = c.cache[tbodyIndex];
			len = rows.normalized.length;
			for (rowIndex = 0; rowIndex < len; rowIndex++) {
				$row = rows.row ? rows.row[rowIndex] : rows.normalized[rowIndex][c.columns].$row;
				$cell = $row.find('td').eq(column);
				$cell.html( $cell.text().replace(/\s/g, ' ') );
			}
		}
	}
};

ts.addWidget({
	id: 'alignChar',
	priority: 100,
	options: {
		alignChar_wrap         : '',
		alignChar_charAttrib   : 'data-align-char',
		alignChar_indexAttrib  : 'data-align-index',
		alignChar_adjustAttrib : 'data-align-adjust' // percentage width adjustments
	},
	init: function(table, thisWidget, c, wo){
		wo.alignChar_initialized = false;
		wo.alignChar_savedVars = [];
		ts.alignChar.init(table, c, wo);
		c.$table.on('pagerEnd refreshAlign', function(){
			c.$headers.filter('[' + wo.alignChar_charAttrib + ']').each(function(){
				ts.alignChar.remove(table, c, this.column);
			});
			ts.alignChar.init(table, c, wo);
		});
	},
	format : function(table, c, wo){
		// reinitialize in case table is empty when first initialized
		if (!wo.alignChar_initialized) {
			c.$table.trigger('refreshAlign');
		}
	},
	remove : function(table, c, wo, refreshing){
		if (refreshing) { return; }
		c.$headers.filter('[' + wo.alignChar_charAttrib + ']').each(function(){
			ts.alignChar.remove(table, c, this.column);
		});
		wo.alignChar_initialized = false;
	}
});

})(jQuery);