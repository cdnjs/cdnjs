/* Output widget (beta) for TableSorter 5/5/2014 (v2.16.4)
 * Requires tablesorter v2.8+ and jQuery 1.7+
 * Modified from:
 * HTML Table to CSV: http://www.kunalbabre.com/projects/table2CSV.php (License unknown?)
 * Download-File-JS: https://github.com/PixelsCommander/Download-File-JS (http://www.apache.org/licenses/LICENSE-2.0)
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
"use strict";

var ts = $.tablesorter,

output = ts.output = {

	event      : 'outputTable',

	// wrap line breaks & tabs in quotes
	regexQuote : /([\n\t]|<[^<]+>)/,    // test
	regexBR    : /(<br([\s\/])?>|\n)/g, // replace
	regexIMG   : /<img[^>]+alt\s*=\s*['"]([^'"]+)['"][^>]*>/i, // match
	regexHTML  : /<[^<]+>/g, // replace
	
	replaceCR  : '\\n',
	replaceTab : '\\t',

	popupTitle : 'Output',
	popupStyle : 'width:100%;height:100%;', // for textarea
	message    : 'Your device does not support downloading. Please try again in desktop browser.',

	init : function(c) {
		c.$table
			.off(output.event)
			.on(output.event, function(){
				// explicitly use table.config.widgetOptions because we want
				// the most up-to-date values; not the "wo" from initialization
				output.process(c, c.widgetOptions);
			});
	},

	processRow: function(c, $rows, isHeader, isJSON) {
		var $this, row, col, rowlen, collen, txt,
			wo = c.widgetOptions,
			tmpRow = [],
			addSpanIndex = isHeader && isJSON && wo.output_headerRows && $.isFunction(wo.output_callbackJSON),
			cellIndex = 0;
		$rows.each(function(rowIndex) {
			if (!tmpRow[rowIndex]) { tmpRow[rowIndex] = []; }
			cellIndex = 0;
			$(this).children().each(function(){
				$this = $(this);
				// process rowspans
				if ($this.filter('[rowspan]').length) {
					rowlen = parseInt( $this.attr('rowspan'), 10) - 1;
					txt = output.formatData( wo, $this.attr(wo.output_dataAttrib) || $this.html(), isHeader );
					for (row = 1; row <= rowlen; row++) {
						if (!tmpRow[rowIndex + row]) { tmpRow[rowIndex + row] = []; }
						tmpRow[rowIndex + row][cellIndex] = txt;
					}
				}
				// process colspans
				if ($this.filter('[colspan]').length) {
					collen = parseInt( $this.attr('colspan'), 10) - 1;
					txt = output.formatData( wo, $this.attr(wo.output_dataAttrib) || $this.html(), isHeader );
					for (col = 1; col <= collen; col++) {
						// if we're processing the header & making JSON, the header names need to be unique
						if ($this.filter('[rowspan]').length) {
							rowlen = parseInt( $this.attr('rowspan'), 10);
							for (row = 0; row < rowlen; row++) {
								if (!tmpRow[rowIndex + row]) { tmpRow[rowIndex + row] = []; }
								tmpRow[rowIndex + row][cellIndex + col] = addSpanIndex ?
									wo.output_callbackJSON($this, txt, cellIndex + col) || txt + '(' + (cellIndex + col) + ')' : txt;
							}
						} else {
							tmpRow[rowIndex][cellIndex + col] = addSpanIndex ?
								wo.output_callbackJSON($this, txt, cellIndex + col) || txt + '(' + (cellIndex + col) + ')' : txt;
						}
					}
				}

				// don't include hidden columns
				if ( $this.css('display') !== 'none' ) {
					// skip column if already defined
					while (tmpRow[rowIndex][cellIndex]) { cellIndex++; }
					tmpRow[rowIndex][cellIndex] = tmpRow[rowIndex][cellIndex] ||
						output.formatData( wo, $this.attr(wo.output_dataAttrib) || $this.html(), isHeader );
					cellIndex++;
				}
			});
		});
		return tmpRow;
	},

	process : function(c, wo) {
		var mydata, $this, $rows, headers, csvData, len,
			hasStringify = window.JSON && JSON.hasOwnProperty('stringify'),
			indx = 0,
			tmpData = (wo.output_separator || ',').toLowerCase(),
			outputJSON = tmpData === 'json',
			outputArray = tmpData === 'array',
			separator = outputJSON || outputArray ? ',' : wo.output_separator,
			$el = c.$table;
		// regex to look for the set separator or HTML
		wo.output_regex = new RegExp('(' + (/\\/.test(separator) ? '\\' : '' ) + separator + ')' );

		// get header cells
		$this = $el.find('thead tr:visible').not('.' + (ts.css.filterRow || 'tablesorter-filter-row') );
		headers = output.processRow(c, $this, true, outputJSON);

		// all tbody rows
		$rows = $el.children('tbody').children('tr');
		// get (f)iltered, (v)isible or all rows (look for the first letter only)
		$rows = /f/.test(wo.output_saveRows) ? $rows.not('.' + (wo.filter_filteredRow || 'filtered') ) :
			/v/.test(wo.output_saveRows) ? $rows.filter(':visible') : $rows;

		// process to array of arrays
		csvData = output.processRow(c, $rows);
		len = headers.length;

		if (outputJSON) {
			tmpData = [];
			$.each( csvData, function(indx, val){
				// multiple header rows & output_headerRows = true, pick the last row...
				tmpData.push( output.row2Hash( headers[ (len > 1 && wo.output_headerRows) ? indx % len : len - 1], val ) );
			});
			// requires JSON stringify; if it doesn't exist, the output will show [object Object],... in the output window
			mydata = hasStringify ? JSON.stringify(tmpData) : tmpData;
		} else {
			tmpData = output.row2CSV(wo, wo.output_headerRows ? headers : [ headers[ (len > 1 && wo.output_headerRows) ? indx % len : len - 1] ], outputArray)
				.concat( output.row2CSV(wo, csvData, outputArray) );
			// stringify the array; if stringify doesn't exist the array will be flattened
			mydata = outputArray && hasStringify ? JSON.stringify(tmpData) : tmpData.join('\n');
		}

		// callback; if true returned, continue processing
		if (!wo.output_callback(mydata)) { return; }

		if ( /p/.test( (wo.output_delivery || '').toLowerCase() ) ) {
			output.popup(mydata, wo.output_popupStyle, outputJSON || outputArray);
		} else {
			output.download(wo, mydata);
		}

	}, // end process

	row2CSV : function(wo, tmpRow, outputArray) {
		var tmp, rowIndex,
			csvData = [],
			rowLen = tmpRow.length;
		for (rowIndex = 0; rowIndex < rowLen; rowIndex++) {
			// remove any blank rows
			tmp = tmpRow[rowIndex].join('').replace(/\"/g,'');
			if (tmpRow[rowIndex].length > 0 && tmp !== '') {
				csvData[csvData.length] = outputArray ? tmpRow[rowIndex] : tmpRow[rowIndex].join(wo.output_separator);
			}
		}
		return csvData;
	},

	row2Hash : function(keys, values) {
		var json = {};
		$.each(values, function(indx, val) {
			if ( indx < keys.length ) {
				json[ keys[indx] ] = val;
			}
		});
		return json;
	},

	formatData : function(wo, input, isHeader) {
		var txt,
			quotes = (wo.output_separator || ',').toLowerCase(),
			separator = quotes === 'json' || quotes === 'array',
			// replace " with “ if undefined
			result = input.replace(/\"/g, wo.output_replaceQuote || '\u201c');
		// replace line breaks with \\n & tabs with \\t
		result = result.replace(output.regexBR, output.replaceCR).replace(/\t/g, output.replaceTab);
		// extract img alt text
		txt = result.match(output.regexIMG);
		if (!wo.output_includeHTML && txt !== null) {
			result = txt[1];
		}
		// replace/remove html
		result = wo.output_includeHTML && !isHeader ? result : result.replace(output.regexHTML, '');
		result = wo.output_trimSpaces || isHeader ? $.trim(result) : result;
		// JSON & array outputs don't need quotes
		quotes = separator ? false : wo.output_wrapQuotes || wo.output_regex.test(result) || output.regexQuote.test(result);
		return quotes ? '"' + result + '"' : result;
	},

	popup : function(data, style, wrap) {
		var generator = window.open('', output.popupTitle, style);
		generator.document.write(
			'<html><head><title>' + output.popupTitle + '</title></head><body>' +
			'<textarea wrap="' + (wrap ? 'on' : 'off') + '" style="' + output.popupStyle + '">' + data + '\n</textarea>' +
			'</body></html>'
		);
		generator.document.close();
		generator.focus();
		// select all text and focus within the textarea in the popup
		// $(generator.document).find('textarea').select().focus();
		return true;
	},

	// modified from https://github.com/PixelsCommander/Download-File-JS
	download : function (wo, data){
		var e, link,
			processedData = wo.output_encoding + encodeURIComponent(data);

		// iOS devices do not support downloading. We have to inform user about this.
		if (/(iP)/g.test(navigator.userAgent)) {
			alert(output.message);
			return false;
		}
		// If in Chrome or Safari - download via virtual link click
		if ( /(chrome|safari)/.test(navigator.userAgent.toLowerCase()) ) {
			// Creating new link node.
			link = document.createElement('a');
			link.href = processedData;
			link.download = wo.output_saveFileName;
			// Dispatching click event.
			if (document.createEvent) {
				e = document.createEvent('MouseEvents');
				e.initEvent('click', true, true);
				link.dispatchEvent(e);
				return true;
			}
		}
		// Force file download (whether supported by server).
		processedData += '?download';
		window.open(processedData, '_self');
		return true;
	},

	remove : function(c) {
		c.$table.off(output.event);
	}

};

ts.addWidget({
	id: "output",
	options: {
		output_separator    : ',',         // set to "json", "array" or any separator
		output_dataAttrib   : 'data-name', // header attrib containing modified header name
		output_headerRows   : false,       // if true, include multiple header rows (JSON only)
		output_delivery     : 'popup',     // popup, download
		output_saveRows     : 'filtered',  // all, visible or filtered
		output_replaceQuote : '\u201c;',   // left double quote
		output_includeHTML  : false,
		output_trimSpaces   : true,
		output_wrapQuotes   : false,
		output_popupStyle   : 'width=500,height=300',
		output_saveFileName : 'mytable.csv',
		// callback executed when processing completes
		// return true to continue download/output
		// return false to stop delivery & do something else with the data
		output_callback     : function(data){ return true; },
		// JSON callback executed when a colspan is encountered in the header
		output_callbackJSON : function($cell, txt, cellIndex) { return txt + '(' + (cellIndex) + ')'; },
		// output data type (with BOM or Windows-1252 is needed for excel)
		// NO BOM   : 'data:text/csv;charset=utf8,'
		// With BOM : 'data:text/csv;charset=utf8,%EF%BB%BF'
		// WIN 1252 : 'data:text/csv;charset=windows-1252'
		output_encoding     : 'data:text/csv;charset=utf8,'
	},
	init: function(table, thisWidget, c) {
		output.init(c);
	},
	remove: function(table, c){
		output.remove(c);
	}

});

})(jQuery);
