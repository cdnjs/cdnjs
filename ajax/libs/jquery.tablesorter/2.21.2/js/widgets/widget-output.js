/* Output widget for TableSorter 3/5/2015 (v2.21.0)
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
	regexQuote : /([\n\t\x09\x0d\x0a]|<[^<]+>)/, // test if cell needs wrapping quotes
	regexBR    : /(<br([\s\/])?>|\n)/g, // replace
	regexIMG   : /<img[^>]+alt\s*=\s*['"]([^'"]+)['"][^>]*>/i, // match
	regexHTML  : /<[^<]+>/g, // replace

	replaceCR  : '\x0d\x0a',
	replaceTab : '\x09',

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
			dupe = wo.output_duplicateSpans,
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
						tmpRow[rowIndex + row][cellIndex] = isHeader ? txt : dupe ? txt : '';
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
									wo.output_callbackJSON($this, txt, cellIndex + col) || txt + '(' + (cellIndex + col) + ')' : isHeader ? txt : dupe ? txt : '';
							}
						} else {
							tmpRow[rowIndex][cellIndex + col] = addSpanIndex ?
								wo.output_callbackJSON($this, txt, cellIndex + col) || txt + '(' + (cellIndex + col) + ')' : isHeader ? txt : dupe ? txt : '';
						}
					}
				}

				// don't include hidden columns
				if ( $this.css('display') !== 'none' ) {
					// skip column if already defined
					while (typeof tmpRow[rowIndex][cellIndex] !== 'undefined') { cellIndex++; }
					tmpRow[rowIndex][cellIndex] = tmpRow[rowIndex][cellIndex] ||
						output.formatData( wo, $this.attr(wo.output_dataAttrib) || $this.html(), isHeader );
					cellIndex++;
				}
			});
		});
		return tmpRow;
	},

	ignoreColumns : function(wo, data) {
		// ignore columns -> remove data from built array (because we've already processed any rowspan/colspan)
		$.each( data, function(indx, val){
			data[indx] = $.grep(val, function(v, cellIndx){
				return $.inArray(cellIndx, wo.output_ignoreColumns) < 0;
			});
		});
		return data;
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

		if (wo.output_includeFooter) {
			// clone, to force the tfoot rows to the end of this selection of rows
			// otherwise they appear after the thead (the order in the HTML)
			$rows = $rows.add( $el.children('tfoot').children('tr').clone() );
		}

		// get (f)iltered, (v)isible or all rows (look for the first letter only)
		$rows = /f/.test(wo.output_saveRows) ? $rows.not('.' + (wo.filter_filteredRow || 'filtered') ) :
			/v/.test(wo.output_saveRows) ? $rows.filter(':visible') : $rows;

		// process to array of arrays
		csvData = output.processRow(c, $rows);
		len = headers.length;

		if (wo.output_ignoreColumns.length) {
			headers = output.ignoreColumns(wo, headers);
			csvData = output.ignoreColumns(wo, csvData);
		}

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
		if ($.isFunction(wo.output_callback) && !wo.output_callback(c, mydata)) { return; }

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
		if (!wo.output_trimSpaces) {
			result = result.replace(output.regexBR, output.replaceCR).replace(/\t/g, output.replaceTab);
		} else {
			result = result.replace(output.regexBR, '');
		}
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
	// & http://html5-demos.appspot.com/static/a.download.html
	download : function (wo, data){

		var e, blob, gotBlob,
			nav = window.navigator,
			link = document.createElement('a');

		// iOS devices do not support downloading. We have to inform user about this.
		if (/(iP)/g.test(nav.userAgent)) {
			alert(output.message);
			return false;
		}

		// test for blob support
		try {
			gotBlob = !!new Blob();
		} catch (err) {
			gotBlob = false;
		}

		// Use HTML5 Blob if browser supports it
		if ( gotBlob ) {

			window.URL = window.webkitURL || window.URL;
			blob = new Blob([data], {type: wo.output_encoding});

			if (nav.msSaveBlob) {
				// IE 10+
				nav.msSaveBlob(blob, wo.output_saveFileName);
			} else {
				// all other browsers
				link.href = window.URL.createObjectURL(blob);
				link.download = wo.output_saveFileName;
				// Dispatching click event; using $(link).trigger() won't work
				if (document.createEvent) {
					e = document.createEvent('MouseEvents');
					// event.initMouseEvent(type, canBubble, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget);
					e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
					link.dispatchEvent(e);
				}
			}
			return false;
		}

		// fallback to force file download (whether supported by server).
		// not sure if this actually works in IE9 and older...
		window.open( wo.output_encoding + encodeURIComponent(data) + '?download' , '_self');
		return true;

	},

	remove : function(c) {
		c.$table.off(output.event);
	}

};

ts.addWidget({
	id: "output",
	options: {
		output_separator     : ',',         // set to "json", "array" or any separator
		output_ignoreColumns : [],          // columns to ignore [0, 1,... ] (zero-based index)
		output_includeFooter : false,       // include footer rows in the output
		output_dataAttrib    : 'data-name', // header attrib containing modified header name
		output_headerRows    : false,       // if true, include multiple header rows (JSON only)
		output_delivery      : 'popup',     // popup, download
		output_saveRows      : 'filtered',  // all, visible or filtered
		output_duplicateSpans: true,        // duplicate output data in tbody colspan/rowspan
		output_replaceQuote  : '\u201c;',   // left double quote
		output_includeHTML   : false,
		output_trimSpaces    : true,
		output_wrapQuotes    : false,
		output_popupStyle    : 'width=500,height=300',
		output_saveFileName  : 'mytable.csv',
		// callback executed when processing completes
		// return true to continue download/output
		// return false to stop delivery & do something else with the data
		output_callback      : function(config, data){ return true; },
		// JSON callback executed when a colspan is encountered in the header
		output_callbackJSON  : function($cell, txt, cellIndex) { return txt + '(' + (cellIndex) + ')'; },
		// the need to modify this for Excel no longer exists
		output_encoding      : 'data:application/octet-stream;charset=utf8,'

	},
	init: function(table, thisWidget, c) {
		output.init(c);
	},
	remove: function(table, c){
		output.remove(c);
	}

});

})(jQuery);
