/*!
* TableSorter 2.2.1 - Client-side table sorting with ease!
* @requires jQuery v1.2.6+
*
* Copyright (c) 2007 Christian Bach
* Examples and docs at: http://tablesorter.com
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* @type jQuery
* @name tablesorter
* @cat Plugins/Tablesorter
* @author Christian Bach/christian.bach@polyester.se
* @contributor Rob Garrison/https://github.com/Mottie/tablesorter
*/
!(function($) {
	$.extend({
		tablesorter: new function() {

			this.version = "2.2.1";

			var parsers = [], widgets = [], tbl;
			this.defaults = {
				cssHeader: "tablesorter-header",
				cssAsc: "tablesorter-headerSortUp",
				cssDesc: "tablesorter-headerSortDown",
				cssChildRow: "expand-child",
				cssInfoBlock: "tablesorter-infoOnly",
				sortInitialOrder: "asc",
				sortMultiSortKey: "shiftKey",
				sortForce: null,
				sortAppend: null,
				sortLocaleCompare: false,
				sortReset: false,
				sortRestart: false,
				emptyTo: "bottom", // sort empty cell to bottom
				stringTo: "max",  // sort strings in numerical column as max value
				textExtraction: "simple",
				textSorter: null, // use custom text sorter
				ignoreCase: true,
				parsers: {},
				widgets: [],
				headers: {},
				empties: {},
				strings: {},
				widthFixed: false,
				cancelSelection: true,
				sortList: [],
				headerList: [],
				dateFormat: "mmddyyyy", // other options: "ddmmyyy" or "yyyymmdd"
				usNumberFormat: true, // false for German "1.234.567,89" or French "1 234 567,89"
				onRenderHeader: null,
				selectorHeaders: 'thead th',
				selectorRemove: "tr.remove-me",
				tableClass : 'tablesorter',
				debug: false,

				widgetOptions : {
					zebra : [ "even", "odd" ]
				}

				// deprecated; but retained for backwards compatibility
				// widgetZebra: { css: ["even", "odd"] }

			};

			/* debuging utils */
			function log(s) {
				if (typeof console !== "undefined" && typeof console.log !== "undefined") {
					console.log(s);
				} else {
					alert(s);
				}
			}

			function benchmark(s, d) {
				log(s + " (" + (new Date().getTime() - d.getTime()) + "ms)");
			}

			this.benchmark = benchmark;
			this.hasInitialized = false;

			function getElementText(config, node, cellIndex) {
				var text = "", te = config.textExtraction;
				if (!node) { return ""; }
				if (!config.supportsTextContent) { config.supportsTextContent = node.textContent || false; }
				if (te === "simple") {
					if (config.supportsTextContent) {
						text = node.textContent;
					} else {
						if (node.childNodes[0] && node.childNodes[0].hasChildNodes()) {
							text = node.childNodes[0].innerHTML;
						} else {
							text = node.innerHTML;
						}
					}
				} else {
					if (typeof(te) === "function") {
						text = te(node, tbl[0], cellIndex);
					} else if (typeof(te) === "object" && te.hasOwnProperty(cellIndex)) {
						text = te[cellIndex](node, tbl[0], cellIndex);
					} else {
						text = $(node).text();
					}
				}
				return text;
			}

			/* parsers utils */
			function getParserById(name) {
				var i, l = parsers.length;
				for (i = 0; i < l; i++) {
					if (parsers[i].id.toLowerCase() === (name.toString()).toLowerCase()) {
						return parsers[i];
					}
				}
				return false;
			}

			function trimAndGetNodeText(config, node, cellIndex) {
				return $.trim(getElementText(config, node, cellIndex));
			}

			function detectParserForColumn(table, rows, rowIndex, cellIndex) {
				var i, l = parsers.length,
				node = false,
				nodeValue = '',
				keepLooking = true;
				while (nodeValue === '' && keepLooking) {
					rowIndex++;
					if (rows[rowIndex]) {
						node = rows[rowIndex].cells[cellIndex];
						nodeValue = trimAndGetNodeText(table.config, node, cellIndex);
						if (table.config.debug) {
							log('Checking if value was empty on row ' + rowIndex + ', column:' + cellIndex + ": " + nodeValue);
						}
					} else {
						keepLooking = false;
					}
				}
				for (i = 1; i < l; i++) {
					if (parsers[i].is(nodeValue, table, node)) {
						return parsers[i];
					}
				}
				// 0 is always the generic parser (text)
				return parsers[0];
			}

			// get sorter, string and empty options for each column from
			// metadata, header option or header class name ("sorter-false")
			// priority = meta > headers option > header class name
			function getData(m, ch, cl, key) {
				var val = '';
				if (m && m[key]) {
					val = m[key];
				} else if (ch && ch[key]) {
					val = ch[key];
				} else if (cl && cl.match(key + '-')) {
					// include sorter class name "sorter-text", etc
					val = cl.match( new RegExp(key + '-(\\w+)') )[1] || '';
				}
				return $.trim(val);
			}

			function buildParserCache(table, $headers) {
				if (table.tBodies.length === 0) { return; } // In the case of empty tables
				var c = table.config, rows = table.tBodies[0].rows,
					list, l, i, h, m, ch, cl, p, parsersDebug = "";
				if (rows[0]) {
					list = [];
					l = rows[0].cells.length;
					for (i = 0; i < l; i++) {
						h = $($headers[i]);
						m = $.metadata ? h.metadata() : false;
						ch = c.headers[i];
						cl = h.attr('class') || '';
						// get column parser
						p = getParserById( getData(m, ch ,cl, 'sorter') );
						// empty cells behaviour - keeping emptyToBottom for backwards compatibility.
						c.empties[i] = getData(m, ch ,cl, 'empty') || c.emptyTo || (c.emptyToBottom ? 'bottom' : 'top' );
						// text strings behaviour in numerical sorts
						c.strings[i] = getData(m, ch ,cl, 'string') || c.stringTo || 'max';
						if (!p) {
							p = detectParserForColumn(table, rows, -1, i);
						}
						if (c.debug) {
							parsersDebug += "column:" + i + "; parser:" + p.id + "; string:" + c.strings[i] + '; empty: ' + c.empties[i] + "\n";
						}
						list.push(p);
					}
				}
				if (c.debug) {
					log(parsersDebug);
				}
				return list;
			}

			/* utils */
			function buildRegex(){
				var a, acc = '[', t = $.tablesorter,
					reg = t.characterEquivalents;
				t.characterRegexArray = {};
				for (a in reg) {
					if (typeof a === 'string') {
						acc += reg[a];
						t.characterRegexArray[a] = new RegExp('[' + reg[a] + ']', 'g');
					}
				}
				t.characterRegex = new RegExp(acc + ']');
			}

			function buildCache(table) {
				var b = table.tBodies,
				tc = table.config,
				totalRows,
				totalCells,
				parsers = tc.parsers,
				t, i, j, k, c, cols, cacheTime;
				tc.cache = {};
				if (tc.debug) {
					cacheTime = new Date();
				}
				for (k = 0; k < b.length; k++) {
					tc.cache[k] = { row: [], normalized: [] };
					totalRows = (b[k] && b[k].rows.length) || 0;
					totalCells = (b[k].rows[0] && b[k].rows[0].cells.length) || 0;

					for (i = 0; i < totalRows; ++i) {
						/** Add the table data to main data array */
						c = $(b[k].rows[i]);
						cols = [];
						// if this is a child row, add it to the last row's children and continue to the next row
						if (c.hasClass(tc.cssChildRow)) {
							tc.cache[k].row[tc.cache[k].row.length - 1] = tc.cache[k].row[tc.cache[k].row.length - 1].add(c);
							// go to the next for loop
							continue;
						}
						tc.cache[k].row.push(c);
						for (j = 0; j < totalCells; ++j) {
							t = trimAndGetNodeText(tc, c[0].cells[j], j);
							// don't bother parsing if the string is empty - previously parsing would change it to zero
							cols.push( parsers[j].format(t, table, c[0].cells[j], j) );
						}
						cols.push(tc.cache[k].normalized.length); // add position for rowCache
						tc.cache[k].normalized.push(cols);
					}
				}
				if (tc.debug) {
					benchmark("Building cache for " + totalRows + " rows", cacheTime);
				}
			}

			function getWidgetById(name) {
				var i, w, l = widgets.length;
				for (i = 0; i < l; i++) {
					w = widgets[i];
					if (w && w.hasOwnProperty('id') && w.id.toLowerCase() === name.toLowerCase()) {
						return w;
					}
				}
			}

			function applyWidget(table, init) {
				var c = table.config.widgets,
				i, w, l = c.length;
				for (i = 0; i < l; i++) {
					w = getWidgetById(c[i]);
					if ( w ) {
						if (init && w.hasOwnProperty('init')) {
							w.init(table, widgets, w);
						} else if (!init && w.hasOwnProperty('format')) {
							w.format(table);
						}
					}
				}
			}

			function appendToTable(table) {
				var c = table.config,
				b = table.tBodies,
				rows = [],
				r, n, totalRows, checkCell,
				f, i, j, k, l, pos, appendTime;
				if (c.debug) {
					appendTime = new Date();
				}
				for (k = 0; k < b.length; k++) {
					f = document.createDocumentFragment();
					r = c.cache[k].row;
					n = c.cache[k].normalized;
					totalRows = n.length;
					checkCell = totalRows ? (n[0].length - 1) : 0;
					for (i = 0; i < totalRows; i++) {
						pos = n[i][checkCell];
						rows.push(r[pos]);
						// removeRows used by the pager plugin
						if (!c.appender || !c.removeRows) {
							l = r[pos].length;
							for (j = 0; j < l; j++) {
								f.appendChild(r[pos][j]);
							}
						}
					}
					table.tBodies[k].appendChild(f);
				}
				if (c.appender) {
					c.appender(table, rows);
				}
				if (c.debug) {
					benchmark("Rebuilt table", appendTime);
				}
				// apply table widgets
				applyWidget(table);
				// trigger sortend
				$(table).trigger("sortEnd", table);
			}

			// from:
			// http://www.javascripttoolbox.com/lib/table/examples.php
			// http://www.javascripttoolbox.com/temp/table_cellindex.html
			function computeTableHeaderCellIndexes(t) {
				var matrix = [],
				lookup = {},
				thead = t.getElementsByTagName('THEAD')[0],
				trs = thead.getElementsByTagName('TR'),
				i, j, k, l, c, cells, rowIndex, cellId, rowSpan, colSpan, firstAvailCol, matrixrow;
				for (i = 0; i < trs.length; i++) {
					cells = trs[i].cells;
					for (j = 0; j < cells.length; j++) {
						c = cells[j];
						rowIndex = c.parentNode.rowIndex;
						cellId = rowIndex + "-" + c.cellIndex;
						rowSpan = c.rowSpan || 1;
						colSpan = c.colSpan || 1;
						if (typeof(matrix[rowIndex]) === "undefined") {
							matrix[rowIndex] = [];
						}
						// Find first available column in the first row
						for (k = 0; k < matrix[rowIndex].length + 1; k++) {
							if (typeof(matrix[rowIndex][k]) === "undefined") {
								firstAvailCol = k;
								break;
							}
						}
						lookup[cellId] = firstAvailCol;
						for (k = rowIndex; k < rowIndex + rowSpan; k++) {
							if (typeof(matrix[k]) === "undefined") {
								matrix[k] = [];
							}
							matrixrow = matrix[k];
							for (l = firstAvailCol; l < firstAvailCol + colSpan; l++) {
								matrixrow[l] = "x";
							}
						}
					}
				}
				return lookup;
			}

			function formatSortingOrder(v) {
				// look for "d" in "desc" order; return true
				return (/^d/i.test(v) || v === 1);
			}

			function checkHeaderMetadata(cell) {
				return (($.metadata) && ($(cell).metadata().sorter === false));
			}

			function checkHeaderOptions(table, i) {
				return ((table.config.headers[i]) && (table.config.headers[i].sorter === false));
			}

			function checkHeaderLocked(table, i) {
				if ((table.config.headers[i]) && (table.config.headers[i].lockedOrder !== null)) { return table.config.headers[i].lockedOrder; }
				return false;
			}

			function checkHeaderOrder(table, i) {
				if ((table.config.headers[i]) && (table.config.headers[i].sortInitialOrder)) { return table.config.headers[i].sortInitialOrder; }
				return table.config.sortInitialOrder;
			}

			function buildHeaders(table) {
				var meta = ($.metadata) ? true : false,
				header_index = computeTableHeaderCellIndexes(table),
				$th, lock, time, $tableHeaders, c = table.config;
				c.headerList = [];
				if (c.debug) {
					time = new Date();
				}
				$tableHeaders = $(c.selectorHeaders, table)
				.wrapInner("<div class='tablesorter-header-inner' />")
				.each(function(index) {
					this.column = header_index[this.parentNode.rowIndex + "-" + this.cellIndex];
					this.order = formatSortingOrder( checkHeaderOrder(table, index) ) ? [1,0,2] : [0,1,2];
					this.count = -1; // set to -1 because clicking on the header automatically adds one
					if (checkHeaderMetadata(this) || checkHeaderOptions(table, index) || $(this).hasClass('sorter-false')) { this.sortDisabled = true; }
					this.lockedOrder = false;
					lock = checkHeaderLocked(table, index);
					if (typeof(lock) !== 'undefined' && lock !== false) {
						this.order = this.lockedOrder = formatSortingOrder(lock) ? [1,1,1] : [0,0,0];
					}
					if (!this.sortDisabled) {
						$th = $(this).addClass(c.cssHeader);
						if (c.onRenderHeader) { c.onRenderHeader.apply($th, [index]); }
					}
					// add cell to headerList
					c.headerList[index] = this;
					$(this).parent().addClass(c.cssHeader);
				});
				if (c.debug) {
					benchmark("Built headers", time);
					log($tableHeaders);
				}
				return $tableHeaders;
			}

			// Part of original tablesorter - not even called.
			function checkCellColSpan(table, rows, row) {
				var i, cell, arr = [],
				r = table.tHead.rows,
				c = r[row].cells;
				for (i = 0; i < c.length; i++) {
					cell = c[i];
					if (cell.colSpan > 1) {
						arr = arr.concat(checkCellColSpan(table, rows, row++)); // what is headerArr?
					} else {
						if (table.tHead.length === 1 || (cell.rowSpan > 1 || !r[row + 1])) {
							arr.push(cell);
						}
					}
				}
				return arr;
			}

			function isValueInArray(v, a) {
				var i, l = a.length;
				for (i = 0; i < l; i++) {
					if (a[i][0] === v) {
						return true;
					}
				}
				return false;
			}

			function setHeadersCss(table, $headers, list) {
				var h = [], i, l, css = [table.config.cssDesc, table.config.cssAsc];
				// remove all header information
				$headers.removeClass(css[0]).removeClass(css[1]);
				$headers.each(function() {
					if (!this.sortDisabled) {
						h[this.column] = $(this);
					}
				});
				l = list.length;
				for (i = 0; i < l; i++) {
					if (list[i][1] === 2) { continue; } // direction = 2 means reset!
					h[list[i][0]].addClass(css[list[i][1]]);
				}
			}

			function fixColumnWidth(table) {
				if (table.config.widthFixed) {
					var colgroup = $('<colgroup>');
					$("tr:first td", table.tBodies[0]).each(function() {
						colgroup.append($('<col>').css('width', $(this).width()));
					});
					$(table).prepend(colgroup);
				}
			}

			function updateHeaderSortCount(table, sortList) {
				var i, s, o, c = table.config,
				l = sortList.length;
				for (i = 0; i < l; i++) {
					s = sortList[i];
					o = c.headerList[s[0]];
					o.count = s[1] % (c.sortReset ? 3 : 2);
				}
			}

			function getCachedSortType(parsers, i) {
				return (parsers) ? parsers[i].type : '';
			}

			/* sorting methods - reverted sorting method back to version 2.0.3 */
			function multisort(table, sortList) {
				var dynamicExp, col, mx = 0, dir = 0, tc = table.config,
				l = sortList.length, bl = table.tBodies.length,
				sortTime, i, j, k, c, cache, lc, s, e, order, orgOrderCol;
				if (tc.debug) { sortTime = new Date(); }
				for (k = 0; k < bl; k++) {
					dynamicExp = "var sortWrapper = function(a,b) {";
					cache = tc.cache[k];
					lc = cache.normalized.length;
					for (i = 0; i < l; i++) {
						c = sortList[i][0];
						order = sortList[i][1];
						s = getCachedSortType(tc.parsers,c) === "text" ? "Text" : "Numeric";
						s += order === 0 ? "" : "Desc";
						e = "e" + i;
						// get max column value (ignore sign)
						if (/Numeric/.test(s) && tc.strings[c]) {
							for (j = 0; j < lc; j++) {
								col = Math.abs(parseFloat(cache.normalized[j][c]));
								mx = Math.max( mx, isNaN(col) ? 0 : col );
							}
							// sort strings in numerical columns
							if (typeof(tc.string[tc.strings[c]]) === 'boolean') {
								dir = (order === 0 ? 1 : -1) * (tc.string[tc.strings[c]] ? -1 : 1);
							} else {
								dir = (tc.strings[c]) ? tc.string[tc.strings[c]] || 0 : 0;
							}
						}
						dynamicExp += "var " + e + " = sort" + s + "(a[" + c + "],b[" + c + "]," + c + "," + mx +  "," + dir + "); ";
						dynamicExp += "if (" + e + ") { return " + e + "; } ";
						dynamicExp += "else { ";
					}
					// if value is the same keep orignal order
					orgOrderCol = (cache.normalized && cache.normalized[0]) ? cache.normalized[0].length - 1 : 0;
					dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
					for (i=0; i < l; i++) {
						dynamicExp += "}; ";
					}
					dynamicExp += "return 0; ";
					dynamicExp += "}; ";
					eval(dynamicExp);
					cache.normalized.sort(sortWrapper); // sort using eval expression
				}
				if (tc.debug) { benchmark("Sorting on " + sortList.toString() + " and dir " + order+ " time", sortTime); }
			}

			// Natural sort modified from: http://www.webdeveloper.com/forum/showthread.php?t=107909
			function sortText(a, b, col) {
				if (a === b) { return 0; }
				var c = tbl[0].config, cnt = 0, L, t, x, e = c.string[ (c.empties[col] || c.emptyTo ) ];
				if (a === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? -1 : 1) : -e || -1; }
				if (b === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? 1 : -1) : e || 1; }
				if (typeof c.textSorter === 'function') { return c.textSorter(a, b); }
				// if (c.sortLocaleCompare) { return a.localeCompare(b); }
				try {
					x = /^(\.)?\d/;
					L = Math.min(a.length, b.length) + 1;
					while (cnt < L && a.charAt(cnt) === b.charAt(cnt) && x.test(b.substring(cnt)) === false && x.test(a.substring(cnt)) === false) { cnt++; }
					a = a.substring(cnt);
					b = b.substring(cnt);
					if (x.test(a) || x.test(b)) {
						if (x.test(a) === false) {
							return (a) ? 1 : -1;
						} else if (x.test(b) === false) {
							return (b) ? -1 : 1;
						} else {
							t = parseFloat(a) - parseFloat(b);
							if (t !== 0) { return t; } else { t = a.search(/[^\.\d]/); }
							if (t === -1) { t = b.search(/[^\.\d]/); }
							a = a.substring(t);
							b = b.substring(t);
						}
					}
					return (a > b) ? 1 : -1;
				} catch (er) {
					return 0;
				}
			}

			function sortTextDesc(a, b, col) {
				if (a === b) { return 0; }
				var c = tbl[0].config, e = c.string[ (c.empties[col] || c.emptyTo ) ];
				if (a === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? -1 : 1) : e || 1; }
				if (b === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? 1 : -1) : -e || -1; }
				if (typeof c.textSorter === 'function') { return c.textSorter(b, a); }
				// if (c.sortLocaleCompare) { return b.localeCompare(a); }
				return sortText(b, a);
			}

			// return text string value by adding up ascii value
			// so the text is somewhat sorted when using a digital sort
			// this is NOT an alphanumeric sort
			function getTextValue(a, mx, d) {
				if (mx) {
					// make sure the text value is greater than the max numerical value (mx)
					var i, l = a.length, n = mx + d;
					for (i = 0; i < l; i++) {
						n += a.charCodeAt(i);
					}
					return d * n;
				}
				return 0;
			}

			function sortNumeric(a, b, col, mx, d) {
				if (a === b) { return 0; }
				var c = tbl[0].config, e = c.string[ (c.empties[col] || c.emptyTo ) ];
				if (a === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? -1 : 1) : -e || -1; }
				if (b === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? 1 : -1) : e || 1; }
				if (isNaN(a)) { a = getTextValue(a, mx, d); }
				if (isNaN(b)) { b = getTextValue(b, mx, d); }
				return a - b;
			}

			function sortNumericDesc(a, b, col, mx, d) {
				if (a === b) { return 0; }
				var c = tbl[0].config, e = c.string[ (c.empties[col] || c.emptyTo ) ];
				if (a === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? -1 : 1) : e || 1; }
				if (b === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? 1 : -1) : -e || -1; }
				if (isNaN(a)) { a = getTextValue(a, mx, d); }
				if (isNaN(b)) { b = getTextValue(b, mx, d); }
				return b - a;
			}

			/* public methods */
			this.construct = function(settings) {
				return this.each(function() {
					// if no thead or tbody quit.
					if (!this.tHead || this.tBodies.length === 0) { return; }
					// declare
					var $headers, $cell, totalRows, $this,
						config, c, i, j, k, a, s, o;
					// new blank config object
					this.config = {};
					// merge and extend.
					c = config = $.extend(true, this.config, $.tablesorter.defaults, settings);
					// store common expression for speed
					tbl = $this = $(this).addClass(c.tableClass);
					// save the settings where they read
					$.data(this, "tablesorter", c);
					// build up character equivalent cross-reference
					buildRegex();
					// digit sort text location; keeping max+/- for backwards compatibility
					c.string = { 'max': 1, 'min': -1, 'max+': 1, 'max-': -1, 'zero': 0, 'none': 0, 'null': 0, 'top': true, 'bottom': false };
					// build headers
					$headers = buildHeaders(this);
					// try to auto detect column type, and store in tables config
					c.parsers = buildParserCache(this, $headers);
					// build the cache for the tbody cells
					buildCache(this);
					// fixate columns if the users supplies the fixedWidth option
					fixColumnWidth(this);
					// apply event handling to headers
					// this is to big, perhaps break it out?
					$headers
					.click(function(e) {
						if (!this.sortDisabled) {
							// Only call sortStart if sorting is enabled.
							$this.trigger("sortStart", $this[0]);
							// store exp, for speed
							$cell = $(this);
							k = !e[c.sortMultiSortKey];
							// get current column sort order
							this.count = (this.count + 1) % (c.sortReset ? 3 : 2);
							// reset all sorts on non-current column - issue #30
							if (c.sortRestart) {
								i = this;
								$headers.each(function() {
									// only reset counts on columns that weren't just clicked on and if not included in a multisort
									if (this !== i && (k || !$(this).is('.' + c.cssDesc + ',.' + c.cssAsc))) {
										this.count = -1;
									}
								});
							}
							// get current column index
							i = this.column;
							// user only wants to sort on one column
							if (k) {
								// flush the sort list
								c.sortList = [];
								if (c.sortForce !== null) {
									a = c.sortForce;
									for (j = 0; j < a.length; j++) {
										if (a[j][0] !== i) {
											c.sortList.push(a[j]);
										}
									}
								}
								// add column to sort list
								if (this.order[this.count] < 2) { c.sortList.push([i, this.order[this.count]]); }
								// multi column sorting
							} else {
								// the user has clicked on an already sorted column.
								if (isValueInArray(i, c.sortList)) {
									// reverse the sorting direction for all tables.
									for (j = 0; j < c.sortList.length; j++) {
										s = c.sortList[j];
										o = c.headerList[s[0]];
										if (s[0] === i) {
											s[1] = o.order[o.count];
											if (s[1] === 2) {
												c.sortList.splice(j,1);
												o.count = -1;
											}
										}
									}
								} else {
									// add column to sort list array
									if (this.order[this.count] < 2) { c.sortList.push([i, this.order[this.count]]); }
								}
							}
							if (c.sortAppend !== null) {
								a = c.sortAppend;
								for (j = 0; j < a.length; j++) {
									if (a[j][0] !== i) {
										c.sortList.push(a[j]);
									}
								}
							}
							// sortBegin event triggered immediately before the sort
							$this.trigger("sortBegin", $this[0]);
							// set css for headers
							setHeadersCss($this[0], $headers, c.sortList);
							appendToTable($this[0], multisort($this[0], c.sortList));
							// stop normal event by returning false
							return false;
						}
						// cancel selection
					})
					.mousedown(function() {
						if (c.cancelSelection) {
							this.onselectstart = function() {
								return false;
							};
							return false;
						}
					});
					// apply easy methods that trigger binded events
					$this
					.bind("update", function(e, resort) {
						// remove rows/elements before update
						$(c.selectorRemove, this).remove();
						// rebuild parsers.
						c.parsers = buildParserCache(this, $headers);
						// rebuild the cache map
						buildCache(this);
						if (resort !== false) { $this.trigger("sorton", [c.sortList]); }
					})
					.bind("updateCell", function(e, cell, resort) {
						// get position from the dom.
						var pos = [(cell.parentNode.rowIndex - 1), cell.cellIndex],
						// update cache - format: function(s, table, cell, cellIndex)
						tbodyindex = $this.find('tbody').index( $(cell).closest('tbody') );
						$this[0].config.cache[tbodyindex].normalized[pos[0]][pos[1]] = c.parsers[pos[1]].format(getElementText(c, cell, pos[1]), $this[0], cell, pos[1]);
						if (resort !== false) { $this.trigger("sorton", [c.sortList]); }
					})
					.bind("addRows", function(e, $row, resort) {
						var i, rows = $row.filter('tr').length,
						dat = [], l = $row[0].cells.length,
						tbodyindex = $this.find('tbody').index( $row.closest('tbody') );
						// add each row
						for (i = 0; i < rows; i++) {
							// add each cell
							for (j = 0; j < l; j++) {
								dat[j] = c.parsers[j].format( getElementText(c, $row[i].cells[j], j), $this[0], $row[i].cells[j], j );
							}
							// add the row index to the end
							dat.push(c.cache[tbodyindex].row.length);
							// update cache
							c.cache[tbodyindex].row.push([$row[i]]);
							c.cache[tbodyindex].normalized.push(dat);
							dat = [];
						}
						// resort using current settings
						if (resort !== false) { $this.trigger("sorton", [c.sortList]); }
					})
					.bind("sorton", function(e, list) {
						$this.trigger("sortStart", $this[0]);
						c.sortList = list;
						// update and store the sortlist
						var sortList = c.sortList;
						// update header count index
						updateHeaderSortCount(this, sortList);
						// set css for headers
						setHeadersCss(this, $headers, sortList);
						// sort the table and append it to the dom
						appendToTable(this, multisort(this, sortList));
					})
					.bind("appendCache", function() {
						appendToTable(this);
					})
					.bind("applyWidgetId", function(e, id) {
						getWidgetById(id).format(this);
					})
					.bind("applyWidgets", function() {
						// apply widgets
						applyWidget(this);
					});
					if ($.metadata && ($(this).metadata() && $(this).metadata().sortlist)) {
						c.sortList = $(this).metadata().sortlist;
					}
					// apply widget init code
					applyWidget(this, true);
					// if user has supplied a sort list to constructor.
					if (c.sortList.length > 0) {
						$this.trigger("sorton", [c.sortList]);
					} else {
						// apply widget format
						applyWidget(this);
					}
					this.hasInitialized = true;
					$this.trigger('tablesorter-initialized', this);
					if (typeof c.initialized === 'function') { c.initialized(this); }
				});
			};
			this.addParser = function(parser) {
				var i, l = parsers.length, a = true;
				for (i = 0; i < l; i++) {
					if (parsers[i].id.toLowerCase() === parser.id.toLowerCase()) {
						a = false;
					}
				}
				if (a) {
					parsers.push(parser);
				}
			};
			this.addWidget = function(widget) {
				widgets.push(widget);
			};
			this.formatFloat = function(s) {
				if (typeof(s) !== 'string') { return s; }
				if (tbl[0].config.usNumberFormat) {
					// US Format - 1,234,567.89 -> 1234567.89
					s = s.replace(/,/g,'');
				} else {
					// German Format = 1.234.567,89 -> 1234567.89
					// French Format = 1 234 567,89 -> 1234567.89
					s = s.replace(/[\s|\.]/g,'').replace(/,/g,'.');
				}
				if(/^\s*\([.\d]+\)/.test(s)) {
					s = s.replace(/^\s*\(/,'-').replace(/\)/,'');
				}
				var i = parseFloat(s);
				// return the text instead of zero
				return isNaN(i) ? $.trim(s) : i;
			};
			this.isDigit = function(s) {
				// replace all unwanted chars and match.
				return (/^[\-+(]?\d*[)]?$/).test($.trim(s.replace(/[,.'\s]/g, '')));
			};
			// used when replacing accented characters during sorting
			this.characterEquivalents = {
				"a" : "\u00e1\u00e0\u00e2\u00e3\u00e4", // áàâãä
				"A" : "\u00c1\u00c0\u00c2\u00c3\u00c4", // ÁÀÂÃÄ
				"c" : "\u00e7", // ç
				"C" : "\u00c7", // Ç
				"e" : "\u00e9\u00e8\u00ea\u00eb", // éèêë
				"E" : "\u00c9\u00c8\u00ca\u00cb", // ÉÈÊË
				"i" : "\u00ed\u00ec\u0130\u00ee\u00ef", // íìİîï
				"I" : "\u00cd\u00cc\u0130\u00ce\u00cf", // ÍÌİÎÏ
				"o" : "\u00f3\u00f2\u00f4\u00f5\u00f6", // óòôõö
				"O" : "\u00d3\u00d2\u00d4\u00d5\u00d6", // ÓÒÔÕÖ
				"S" : "\u00df", // ß
				"u" : "\u00fa\u00f9\u00fb\u00fc", // úùûü
				"U" : "\u00da\u00d9\u00db\u00dc" // ÚÙÛÜ
			};
			this.replaceAccents = function(s) {
				if (this.characterRegex.test(s)) {
					var a, eq = this.characterEquivalents;
					for (a in eq) {
						if (typeof a === 'string') {
							s = s.replace( this.characterRegexArray[a], a );
						}
					}
				}
				return s;
			};
			this.clearTableBody = function(table) {
				$(table.tBodies).filter(':not(.' + table.config.cssInfoBlock + ')').empty();
			};

		}
	})();

	// extend plugin scope
	$.fn.extend({
		tablesorter: $.tablesorter.construct
	});

	// make shortcut
	var ts = $.tablesorter;

	// add default parsers
	ts.addParser({
		id: "text",
		is: function(s) {
			return true;
		},
		format: function(s, table) {
			var c = table.config;
			s = $.trim( c.ignoreCase ? s.toLocaleLowerCase() : s );
			return c.sortLocaleCompare ? $.tablesorter.replaceAccents(s) : s;
		},
		type: "text"
	});

	ts.addParser({
		id: "digit",
		is: function(s) {
			return $.tablesorter.isDigit(s);
		},
		format: function(s) {
			return $.tablesorter.formatFloat(s.replace(/[^\w,. \-()]/g, ""));
		},
		type: "numeric"
	});

	ts.addParser({
		id: "currency",
		is: function(s) {
			return (/^\(?[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]/).test(s); // #$ $%"?.
		},
		format: function(s) {
			return $.tablesorter.formatFloat(s.replace(/[^0-9,. \-()]/g, ""));
		},
		type: "numeric"
	});

	ts.addParser({
		id: "ipAddress",
		is: function(s) {
			return (/^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/).test(s);
		},
		format: function(s) {
			var i, item, a = s.split("."),
			r = "",
			l = a.length;
			for (i = 0; i < l; i++) {
				item = a[i];
				if (item.length === 2) {
					r += "0" + item;
				} else {
					r += item;
				}
			}
			return $.tablesorter.formatFloat(r);
		},
		type: "numeric"
	});

	ts.addParser({
		id: "url",
		is: function(s) {
			return (/^(https?|ftp|file):\/\/$/).test(s);
		},
		format: function(s) {
			return $.trim(s.replace(/(https?|ftp|file):\/\//, ''));
		},
		type: "text"
	});

	ts.addParser({
		id: "isoDate",
		is: function(s) {
			return (/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/).test(s);
		},
		format: function(s) {
			return $.tablesorter.formatFloat((s !== "") ? new Date(s.replace(/-/g, "/")).getTime() : "");
		},
		type: "numeric"
	});

	ts.addParser({
		id: "percent",
		is: function(s) {
			return (/\%\)?$/).test($.trim(s));
		},
		format: function(s) {
			return $.tablesorter.formatFloat(s.replace(/%/g, ""));
		},
		type: "numeric"
	});

	ts.addParser({
		id: "usLongDate",
		is: function(s) {
			return s.match(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/);
		},
		format: function(s) {
			return $.tablesorter.formatFloat(new Date(s).getTime());
		},
		type: "numeric"
	});

	ts.addParser({
		id: "shortDate", // "mmddyyyy", "ddmmyyyy" or "yyyymmdd"
		is: function(s) {
			// testing for ####-####-#### - so it's not perfect
			return (/\d{1,4}[\/\-\,\.\s+]\d{1,4}[\/\-\.\,\s+]\d{1,4}/).test(s);
		},
		format: function(s, table, cell, cellIndex) {
			var c = table.config,
				format = (c.headers && c.headers[cellIndex]) ? c.headers[cellIndex].dateFormat || c.dateFormat : c.dateFormat; // get dateFormat from header or config
			s = s.replace(/\s+/g," ").replace(/[\-|\.|\,]/g, "/");
			if (format === "mmddyyyy") {
				s = s.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$1/$2");
			} else if (format === "ddmmyyyy") {
				s = s.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$2/$1");
			} else if (format === "yyyymmdd") {
				s = s.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/, "$1/$2/$3");
			}
			return $.tablesorter.formatFloat(new Date(s).getTime());
		},
		type: "numeric"
	});

	ts.addParser({
		id: "time",
		is: function(s) {
			return (/^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/).test(s);
		},
		format: function(s) {
			return $.tablesorter.formatFloat(new Date("2000/01/01 " + s).getTime());
		},
		type: "numeric"
	});

	ts.addParser({
		id: "metadata",
		is: function(s) {
			return false;
		},
		format: function(s, table, cell) {
			var c = table.config,
			p = (!c.parserMetadataName) ? 'sortValue' : c.parserMetadataName;
			return $(cell).metadata()[p];
		},
		type: "numeric"
	});

	// add default widgets
	ts.addWidget({
		id: "zebra",
		format: function(table) {
			var $tr, row, even, time, k,
			c = table.config,
			child = c.cssChildRow,
			b = table.tBodies,
			css = [ "even", "odd" ];
			// maintain backwards compatibility
			css = c.widgetZebra && c.hasOwnProperty('css') ? c.widgetZebra.css :
				(c.widgetOptions && c.widgetOptions.hasOwnProperty('zebra')) ? c.widgetOptions.zebra : css;
			if (table.config.debug) {
				time = new Date();
			}
			for (k = 0; k < b.length; k++ ) {
				row = 0;
				// loop through the visible rows
				$tr = $(b[k]).filter(':not(' + c.cssInfoBlock + ')').find('tr:visible:not(.' + c.cssInfoBlock + ')');
				if ($tr.length > 1) {
					$tr.each(function() {
						$tr = $(this);
						// style children rows the same way the parent row was styled
						if (!$tr.hasClass(child)) { row++; }
						even = (row % 2 === 0);
						$tr
						.removeClass(css[even ? 1 : 0])
						.addClass(css[even ? 0 : 1]);
					});
				}
			}
			if (table.config.debug) {
				$.tablesorter.benchmark("Applying Zebra widget", time);
			}
		}
	});

})(jQuery);