/*!
* TableSorter 2.1.13 - Client-side table sorting with ease!
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
!(function($){
	$.extend({
		tablesorter: new function(){

			this.version = "2.1.13";

			var parsers = [], widgets = [], tbl;
			this.defaults = {
				cssHeader: "tablesorter-header",
				cssAsc: "tablesorter-headerSortUp",
				cssDesc: "tablesorter-headerSortDown",
				cssChildRow: "expand-child",
				sortInitialOrder: "asc",
				sortMultiSortKey: "shiftKey",
				sortForce: null,
				sortAppend: null,
				sortLocaleCompare: false,
				sortReset: false,
				sortRestart: false,
				emptyToBottom : true, // sort empty cell to bottom
				textExtraction: "simple",
				parsers: {},
				widgets: [],
				headers: {},
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
						text = te(node, tbl, cellIndex);
					} else if (typeof(te) === "object" && te.hasOwnProperty(cellIndex)){
						text = te[cellIndex](node, tbl, cellIndex);
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

			function buildParserCache(table, $headers) {
				if (table.tBodies.length === 0) { return; } // In the case of empty tables
				var rows = table.tBodies[0].rows, list, cells, l, h, i, p, parsersDebug = "";
				if (rows[0]) {
					list = [];
					cells = rows[0].cells;
					l = cells.length;
					for (i = 0; i < l; i++) {
						p = false;
						h = $($headers[i]);
						if ($.metadata && (h.metadata() && h.metadata().sorter)) {
							p = getParserById(h.metadata().sorter);
						} else if ((table.config.headers[i] && table.config.headers[i].sorter)) {
							p = getParserById(table.config.headers[i].sorter);
						} else if (h.attr('class') && h.attr('class').match('sorter-')){
							// include sorter class name "sorter-text", etc
							p = getParserById(h.attr('class').match(/sorter-(\w+)/)[1] || '');
						}
						if (!p) {
							p = detectParserForColumn(table, rows, -1, i);
						}
						if (table.config.debug) {
							parsersDebug += "column:" + i + "; parser:" + p.id + "\n";
						}
						list.push(p);
					}
				}
				if (table.config.debug) {
					log(parsersDebug);
				}
				return list;
			}

			/* utils */
			function buildCache(table) {
				var b = table.tBodies[0],
				totalRows = (b && b.rows.length) || 0,
				totalCells = (b.rows[0] && b.rows[0].cells.length) || 0,
				parsers = table.config.parsers,
				cache = {
					row: [],
					normalized: []
				},
				t, i, j, c, cols, cacheTime;
				if (table.config.debug) {
					cacheTime = new Date();
				}
				for (i = 0; i < totalRows; ++i) {
					/** Add the table data to main data array */
					c = $(b.rows[i]);
					cols = [];
					// if this is a child row, add it to the last row's children and continue to the next row
					if (c.hasClass(table.config.cssChildRow)) {
						cache.row[cache.row.length - 1] = cache.row[cache.row.length - 1].add(c);
						// go to the next for loop
						continue;
					}
					cache.row.push(c);
					for (j = 0; j < totalCells; ++j) {
						t = trimAndGetNodeText(table.config, c[0].cells[j], j);
						// don't bother parsing if the string is empty - previously parsing would change it to zero
						cols.push( parsers[j].format(t, table, c[0].cells[j], j) );
					}
					cols.push(cache.normalized.length); // add position for rowCache
					cache.normalized.push(cols);
				}
				if (table.config.debug) {
					benchmark("Building cache for " + totalRows + " rows", cacheTime);
				}
				table.config.cache = cache;
				return cache;
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

			function appendToTable(table, cache) {
				var c = table.config,
				r = cache.row,
				n = cache.normalized,
				totalRows = n.length,
				checkCell = totalRows ? (n[0].length - 1) : 0,
				rows = [],
				i, j, l, pos, appendTime;
				if (c.debug) {
					appendTime = new Date();
				}
				for (i = 0; i < totalRows; i++) {
					pos = n[i][checkCell];
					rows.push(r[pos]);
					// removeRows used by the pager plugin
					if (!c.appender || !c.removeRows) {
						l = r[pos].length;
						for (j = 0; j < l; j++) {
							table.tBodies[0].appendChild(r[pos][j]);
						}
					}
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
				.each(function (index) {
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
					$("tr:first td", table.tBodies[0]).each(function () {
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
			function multisort(table,sortList,cache) {
				var dynamicExp = "var sortWrapper = function(a,b) {",
				col, mx = 0, dir = 0, tc = table.config, lc = cache.normalized.length,
				l = sortList.length, sortTime, i, j, c, s, e, order, orgOrderCol;
				if (tc.debug) { sortTime = new Date(); }
				for (i=0; i < l; i++) {
					c = sortList[i][0];
					order = sortList[i][1];
					s = (getCachedSortType(tc.parsers,c) === "text") ? ((order === 0) ? "sortText" : "sortTextDesc") : ((order === 0) ? "sortNumeric" : "sortNumericDesc");
					e = "e" + i;
					// get max column value (ignore sign)
					if (/Numeric/.test(s) && tc.headers[c] && tc.headers[c].string){
						for (j=0; j < lc; j++) {
							col = Math.abs(parseFloat(cache.normalized[j][c]));
							mx = Math.max( mx, isNaN(col) ? 0 : col );
						}
						dir = (tc.headers[c]) ? tc.string[tc.headers[c].string] || 0 : 0;
					}
					dynamicExp += "var " + e + " = " + s + "(a[" + c + "],b[" + c + "]," + mx +  "," + dir + "); ";
					dynamicExp += "if (" + e + ") { return " + e + "; } ";
					dynamicExp += "else { ";
				}
				// if value is the same keep orignal order
				orgOrderCol = (cache.normalized && cache.normalized[0]) ? cache.normalized[0].length - 1 : 0;
				dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
				for(i=0; i < l; i++) {
					dynamicExp += "}; ";
				}
				dynamicExp += "return 0; ";
				dynamicExp += "}; ";
				eval(dynamicExp);
				cache.normalized.sort(sortWrapper); // sort using eval expression
				if (tc.debug) { benchmark("Sorting on " + sortList.toString() + " and dir " + order+ " time", sortTime); }
				return cache;
			}

			// Natural sort modified from: http://www.webdeveloper.com/forum/showthread.php?t=107909
			function sortText(a, b) {
				var c = tbl[0].config, cnt = 0, L, t, x;
				if (a === b) { return 0; }
				if (a === '' && c.emptyToBottom !== null) { return c.emptyToBottom ? 1 : -1; }
				if (b === '' && c.emptyToBottom !== null) { return c.emptyToBottom ? -1 : 1; }
				if (c.sortLocaleCompare) { return a.localeCompare(b); }
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

			function sortTextDesc(a, b){
				var c = tbl[0].config;
				if (a === b) { return 0; }
				if (a === '' && c.emptyToBottom !== null) { return c.emptyToBottom ? 1 : -1; }
				if (b === '' && c.emptyToBottom !== null) { return c.emptyToBottom ? -1 : 1; }
				if (c.sortLocaleCompare) { return b.localeCompare(a); }
				return -sortText(a, b);
			}

			// return text string value by adding up ascii value
			// so the text is somewhat sorted when using a digital sort
			// this is NOT an alphanumeric sort
			function getTextValue(a, mx, d){
				if (mx) {
					// make sure the text value is greater than the max numerical value (mx)
					var i, l = a.length, n = mx + d;
					for (i = 0; i < l; i++){
						n += a.charCodeAt(i);
					}
					return d * n;
				}
				return 0;
			}

			function sortNumeric(a, b, mx, d) {
				var c = tbl[0].config;
				if (a === b) { return 0; }
				if (a === '' && c.emptyToBottom !== null) { return c.emptyToBottom ? 1 : -1; }
				if (b === '' && c.emptyToBottom !== null) { return c.emptyToBottom ? -1 : 1; }
				if (isNaN(a)) { a = getTextValue(a, mx, d); }
				if (isNaN(b)) { b = getTextValue(b, mx, d); }
				return a - b;
			}

			function sortNumericDesc(a, b, mx, d) {
				var c = tbl[0].config;
				if (a === b) { return 0; }
				if (a === '' && c.emptyToBottom !== null) { return c.emptyToBottom ? 1 : -1; }
				if (b === '' && c.emptyToBottom !== null) { return c.emptyToBottom ? -1 : 1; }
				if (isNaN(a)) { a = getTextValue(a, mx, d); }
				if (isNaN(b)) { b = getTextValue(b, mx, d); }
				return b - a;
			}

			/* public methods */
			this.construct = function(settings){
				return this.each(function(){
					// if no thead or tbody quit.
					if (!this.tHead || this.tBodies.length === 0) { return; }
					// declare
					var $this, $headers, cache, config,
					totalRows, $cell, c, i, j, k, a, s, o;
					// new blank config object
					this.config = {};
					// merge and extend.
					c = config = $.extend(true, this.config, $.tablesorter.defaults, settings);
					// store common expression for speed
					tbl = $this = $(this).addClass(this.config.tableClass);
					// save the settings where they read
					$.data(this, "tablesorter", c);
					// build headers
					$headers = buildHeaders(this);
					// try to auto detect column type, and store in tables config
					c.parsers = buildParserCache(this, $headers);
					// digit sort text location
					c.string = { max: 1, 'max+': 1, 'max-': -1, none: 0 };
					// build the cache for the tbody cells
					cache = buildCache(this);
					// fixate columns if the users supplies the fixedWidth option
					fixColumnWidth(this);
					// apply event handling to headers
					// this is to big, perhaps break it out?
					$headers
					.click(function(e){
						totalRows = ($this[0].tBodies[0] && $this[0].tBodies[0].rows.length) || 0;
						if (!this.sortDisabled) {
							// Only call sortStart if sorting is enabled.
							$this.trigger("sortStart", tbl[0]);
							// store exp, for speed
							$cell = $(this);
							k = !e[c.sortMultiSortKey];
							// get current column sort order
							this.count = (this.count + 1) % (c.sortReset ? 3 : 2);
							// reset all sorts on non-current column - issue #30
							if (c.sortRestart) {
								i = this;
								$headers.each(function(){
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
							$this.trigger("sortBegin", tbl[0]);
							// set css for headers
							setHeadersCss($this[0], $headers, c.sortList);
							appendToTable($this[0], multisort($this[0], c.sortList, cache));
							// stop normal event by returning false
							return false;
						}
						// cancel selection
					})
					.mousedown(function(){
						if (c.cancelSelection) {
							this.onselectstart = function(){
								return false;
							};
							return false;
						}
					});
					// apply easy methods that trigger binded events
					$this
					.bind("update", function(){
						var t = this, c = t.config;
						// remove rows/elements before update
						$(c.selectorRemove, t.tBodies[0]).remove();
						// rebuild parsers.
						t.config.parsers = buildParserCache(t, $headers);
						// rebuild the cache map
						cache = buildCache(t);
						$this.trigger("sorton", [t.config.sortList]);
					})
					.bind("updateCell", function(e, cell) {
						// get position from the dom.
						var pos = [(cell.parentNode.rowIndex - 1), cell.cellIndex];
						// update cache - format: function(s, table, cell, cellIndex)
						cache.normalized[pos[0]][pos[1]] = c.parsers[pos[1]].format(getElementText(c, cell, pos[1]), $this, cell, pos[1]);
						c.cache = cache;
						$this.trigger("sorton", [c.sortList]);
					})
					.bind("addRows", function(e, row) {
						var i, rows = row.filter('tr').length,
						dat = [], l = row[0].cells.length;
						// add each row
						for (i = 0; i < rows; i++) {
							// add each cell
							for (j = 0; j < l; j++) {
								dat[j] = c.parsers[j].format(getElementText(c, row[i].cells[j], j), $this, row[i].cells[j], j );
							}
							// add the row index to the end
							dat.push(cache.row.length);
							// update cache
							cache.row.push([row[i]]);
							cache.normalized.push(dat);
							dat = [];
						}
						c.cache = cache;
						// resort using current settings
						$this.trigger("sorton", [c.sortList]);
					})
					.bind("sorton", function(e, list) {
						$(this).trigger("sortStart", tbl[0]);
						c.sortList = list;
						// update and store the sortlist
						var sortList = c.sortList;
						// update header count index
						updateHeaderSortCount(this, sortList);
						// set css for headers
						setHeadersCss(this, $headers, sortList);
						// sort the table and append it to the dom
						appendToTable(this, multisort(this, sortList, cache));
					})
					.bind("appendCache", function () {
						appendToTable(this, cache);
					})
					.bind("applyWidgetId", function (e, id) {
						getWidgetById(id).format(this);
					})
					.bind("applyWidgets", function () {
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
			this.addWidget = function (widget) {
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
			this.clearTableBody = function (table) {
				$(table.tBodies[0]).empty();
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
		is: function(s){
			return true;
		},
		format: function(s) {
			return $.trim(s.toLocaleLowerCase());
		},
		type: "text"
	});

	ts.addParser({
		id: "digit",
		is: function(s){
			return $.tablesorter.isDigit(s);
		},
		format: function(s){
			return $.tablesorter.formatFloat(s.replace(/[^\w,. \-()]/g, ""));
		},
		type: "numeric"
	});

	ts.addParser({
		id: "currency",
		is: function(s){
			return (/^\(?[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]/).test(s); // £$€¤¥¢?.
		},
		format: function(s){
			return $.tablesorter.formatFloat(s.replace(/[^0-9,. \-()]/g, ""));
		},
		type: "numeric"
	});

	ts.addParser({
		id: "ipAddress",
		is: function(s) {
			return (/^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/).test(s);
		},
		format: function(s){
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
			s = s.replace(/\s+/g," ").replace(/[\-|\.|\,|\s]/g, "/");
			if (format === "mmddyyyy") {
				s = s.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, "$3/$1/$2");
			} else if (format === "ddmmyyyy") {
				s = s.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, "$3/$2/$1");
			} else if (format === "yyyymmdd") {
				s = s.replace(/(\d{4})\/(\d{1,2})\/(\d{1,2})/, "$1/$2/$3");
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
			var $tr, row = 0, even, time,
			c = table.config,
			child = c.cssChildRow,
			css = [ "even", "odd" ];
			// maintain backwards compatibility
			css = c.widgetZebra && c.hasOwnProperty('css') ? c.widgetZebra.css :
				(c.widgetOptions && c.widgetOptions.hasOwnProperty('zebra')) ? c.widgetOptions.zebra : css;
			if (table.config.debug) {
				time = new Date();
			}
			// loop through the visible rows
			$("tr:visible", table.tBodies[0]).each(function(){
				$tr = $(this);
				// style children rows the same way the parent row was styled
				if (!$tr.hasClass(child)) { row++; }
				even = (row % 2 === 0);
				$tr
				.removeClass(css[even ? 1 : 0])
				.addClass(css[even ? 0 : 1]);
			});
			if (table.config.debug) {
				$.tablesorter.benchmark("Applying Zebra widget", time);
			}
		}
	});

})(jQuery);