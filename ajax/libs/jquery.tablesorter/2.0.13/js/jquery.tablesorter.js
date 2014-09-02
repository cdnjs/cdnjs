/*
* TableSorter 2.0 - Client-side table sorting with ease!
* Version 2.0.13
* @requires jQuery v1.2.3
*
* Copyright (c) 2007 Christian Bach
* Examples and docs at: http://tablesorter.com
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* @description Create a sortable table with multi-column sorting capabilities
*
* @example $('table').tablesorter();
* @desc Create a simple tablesorter interface.
*
* @example $('table').tablesorter({ sortList:[[0,0],[1,0]] });
* @desc Create a tablesorter interface and sort on the first and secound column column headers.
*
* @example $('table').tablesorter({ headers: { 0: { sorter: false}, 1: {sorter: false} } });
* @desc Create a tablesorter interface and disableing the first and second  column headers.
*
* @example $('table').tablesorter({ headers: { 0: {sorter:"digit"}, 1: {sorter:"currency"} } });
* @desc Create a tablesorter interface and set a column parser for the first and second column.
*
* @param Object settings An object literal containing key/value pairs to provide optional settings.
*
* @option String cssHeader (optional) A string of the class name to be appended to sortable tr elements in the thead of the table.
*         Default value: "header"
*
* @option String cssAsc (optional) A string of the class name to be appended to sortable tr elements in the thead on a ascending sort.
*         Default value: "headerSortUp"
*
* @option String cssDesc (optional) A string of the class name to be appended to sortable tr elements in the thead on a descending sort.
*         Default value: "headerSortDown"
*
* @option String sortInitialOrder (optional) A string of the inital sorting order can be asc or desc.
*         Default value: "asc"
*
* @option String sortMultisortKey (optional) A string of the multi-column sort key.
*         Default value: "shiftKey"
*
* @option String textExtraction (optional) A string of the text-extraction method to use. For complex html structures inside td
*         cell set this option to "complex", on large tables the complex option can be slow.
*         Default value: "simple"
*
* @option Object headers (optional) An array containing the forces sorting rules. This option let's you specify a default sorting rule.
*         Default value: null
*
* @option Array sortList (optional) An array containing the forces sorting rules. This option let's you specify a default sorting rule.
*         Default value: null
*
* @option Array sortForce (optional) An array containing forced sorting rules. This option let's you specify a default sorting rule,
*         which is prepended to user-selected rules.
*         Default value: null
*
* @option Boolean sortLocaleCompare (optional) Boolean flag indicating whatever to use String.localeCampare method or not.
*         Default set to true.
*
* @option Array sortAppend (optional) An array containing forced sorting rules. This option let's you specify a default sorting rule,
*         which is appended to user-selected rules.
*         Default value: null
*
* @option Boolean widthFixed (optional) Boolean flag indicating if tablesorter should apply fixed widths to the table columns.
*         This is useful when using the pager companion plugin. This options requires the dimension jquery plugin.
*         Default value: false
*
* @option Boolean cancelSelection (optional) Boolean flag indicating if tablesorter should cancel selection of the table headers text.
*         Default value: true
*
* @option Boolean debug (optional) Boolean flag indicating if tablesorter should display debuging information usefull for development.
*
* @type jQuery
* @name tablesorter
* @cat Plugins/Tablesorter
* @author Christian Bach/christian.bach@polyester.se
*/
(function($){
	$.extend({
		tablesorter: new function(){

			var parsers = [], widgets = [], tbl;
			this.defaults = {
				cssHeader: "header",
				cssAsc: "headerSortUp",
				cssDesc: "headerSortDown",
				cssChildRow: "expand-child",
				sortInitialOrder: "asc",
				sortMultiSortKey: "shiftKey",
				sortForce: null,
				sortAppend: null,
				sortLocaleCompare: false,
				textExtraction: "simple",
				parsers: {},
				widgets: [],
				widgetZebra: { css: ["even", "odd"] },
				headers: {},
				widthFixed: false,
				cancelSelection: true,
				sortList: [],
				headerList: [],
				dateFormat: "us",
				onRenderHeader: null,
				selectorHeaders: 'thead th',
				tableClass : 'tablesorter',
				debug: false
			};

			/* debuging utils */
			function log(s) {
				if (typeof console !== "undefined" && typeof console.debug !== "undefined") {
					console.log(s);
				} else {
					alert(s);
				}
			}

			function benchmark(s, d) {
				log(s + "," + (new Date().getTime() - d.getTime()) + "ms");
			}

			this.benchmark = benchmark;

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
						text = te(node);
					} else if (typeof(te) === "object" && te.hasOwnProperty(cellIndex)){
						text = te[cellIndex](node);
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
					if (parsers[i].id.toLowerCase() === name.toLowerCase()) {
						return parsers[i];
					}
				}
				return false;
			}

			function getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex) {
				return rows[rowIndex].cells[cellIndex];
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
						node = getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex);
						nodeValue = trimAndGetNodeText(table.config, node, cellIndex);
						if (table.config.debug) {
							log('Checking if value was empty on row:' + rowIndex);
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
				var rows = table.tBodies[0].rows, list, cells, l, i, p, parsersDebug = "";
				if (rows[0]) {
					list = [];
					cells = rows[0].cells;
					l = cells.length;
					for (i = 0; i < l; i++) {
						p = false;
						if ($.metadata && ($($headers[i]).metadata() && $($headers[i]).metadata().sorter)) {
							p = getParserById($($headers[i]).metadata().sorter);
						} else if ((table.config.headers[i] && table.config.headers[i].sorter)) {
							p = getParserById(table.config.headers[i].sorter);
						} else if ($($headers[i]).attr('class').match('sorter-')){
							// include sorter class name "sorter-text", etc
							p = getParserById($($headers[i]).attr('class').match(/sorter-(\w+)/)[1] || '');
						}
						if (!p) {
							p = detectParserForColumn(table, rows, -1, i);
						}
						if (table.config.debug) {
							parsersDebug += "column:" + i + " parser:" + p.id + "\n";
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
				var totalRows = (table.tBodies[0] && table.tBodies[0].rows.length) || 0,
				totalCells = (table.tBodies[0].rows[0] && table.tBodies[0].rows[0].cells.length) || 0,
				parsers = table.config.parsers,
				cache = {
					row: [],
					normalized: []
				},
				i, j, c, cols, cacheTime;
				if (table.config.debug) {
					cacheTime = new Date();
				}
				for (i = 0; i < totalRows; ++i) {
					/** Add the table data to main data array */
					c = $(table.tBodies[0].rows[i]);
					cols = [];
					// if this is a child row, add it to the last row's children and
					// continue to the next row
					if (c.hasClass(table.config.cssChildRow)) {
						cache.row[cache.row.length - 1] = cache.row[cache.row.length - 1].add(c);
						// go to the next for loop
						continue;
					}
					cache.row.push(c);
					for (j = 0; j < totalCells; ++j) {
						cols.push(parsers[j].format(getElementText(table.config, c[0].cells[j], j), table, c[0].cells[j]));
					}
					cols.push(cache.normalized.length); // add position for rowCache
					cache.normalized.push(cols);
					cols = null;
				}
				if (table.config.debug) {
					benchmark("Building cache for " + totalRows + " rows:", cacheTime);
				}
				return cache;
			}

			function getWidgetById(name) {
				var i, l = widgets.length;
				for (i = 0; i < l; i++) {
					if (widgets[i].id.toLowerCase() === name.toLowerCase()) {
						return widgets[i];
					}
				}
			}

			function applyWidget(table) {
				var c = table.config.widgets,
				i, l = c.length;
				for (i = 0; i < l; i++) {
					getWidgetById(c[i]).format(table);
				}
			}

			function appendToTable(table, cache) {
				if (cache.row.length === 0) { return; }
				var c = cache,
				r = c.row,
				n = c.normalized,
				totalRows = n.length,
				checkCell = (n[0].length - 1),
				tableBody = $(table.tBodies[0]),
				rows = [],
				i, j, l, pos, appendTime;
				if (table.config.debug) {
					appendTime = new Date();
				}
				for (i = 0; i < totalRows; i++) {
					pos = n[i][checkCell];
					rows.push(r[pos]);
					if (!table.config.appender) {
						l = r[pos].length;
						for (j = 0; j < l; j++) {
							tableBody[0].appendChild(r[pos][j]);
						}
					}
				}
				if (table.config.appender) {
					table.config.appender(table, rows);
				}
				rows = null;
				if (table.config.debug) {
					benchmark("Rebuilt table:", appendTime);
				}
				// apply table widgets
				applyWidget(table);
				// trigger sortend
				setTimeout(function () {
					$(table).trigger("sortEnd", table);
				}, 0);
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
				if (typeof(v) !== "number") {
					// look for "d" instead of "desc"
					return (v.toLowerCase().charAt(0) === "d") ? 1 : 0;
				} else {
					return (v === 1) ? 1 : 0;
				}
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
				$th, lock, time, $tableHeaders;
				if (table.config.debug) {
					time = new Date();
				}
				$tableHeaders = $(table.config.selectorHeaders, table)
				.wrapInner("<span/>")
				.each(function (index) {
					this.column = header_index[this.parentNode.rowIndex + "-" + this.cellIndex];
					// this.column = index;
					this.order = formatSortingOrder( checkHeaderOrder(table, index) );
					this.count = this.order;
					if (checkHeaderMetadata(this) || checkHeaderOptions(table, index) || $(this).is('.sorter-false')) { this.sortDisabled = true; }
					this.lockedOrder = false;
					lock = checkHeaderLocked(table, index);
					if (typeof(lock) !== 'undefined' && lock !== false) { this.order = this.lockedOrder = formatSortingOrder(lock); }
					if (!this.sortDisabled) {
						$th = $(this).addClass(table.config.cssHeader);
						if (table.config.onRenderHeader) { table.config.onRenderHeader.apply($th, [index]); }
					}
					// add cell to headerList
					table.config.headerList[index] = this;
				});
				if (table.config.debug) {
					benchmark("Built headers:", time);
					log($tableHeaders);
				}
				return $tableHeaders;
			}

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

			function setHeadersCss(table, $headers, list, css) {
				// remove all header information
				$headers.removeClass(css[0]).removeClass(css[1]);
				var h = [], i, l;
				$headers.each(function (offset) {
					if (!this.sortDisabled) {
						h[this.column] = $(this);
					}
				});
				l = list.length;
				for (i = 0; i < l; i++) {
					h[list[i][0]].addClass(css[list[i][1]]);
				}
			}

			function fixColumnWidth(table, $headers) {
				var c = table.config, colgroup;
				if (c.widthFixed) {
					colgroup = $('<colgroup>');
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
					o.count = s[1];
					o.count++;
				}
			}

			function getCachedSortType(parsers, i) {
				return parsers[i].type;
			}

			/* sorting methods - reverted sorting method back to version 2.0.3 */
			function multisort(table,sortList,cache) {
				if (cache.row.length === 0) { return cache; } // nothing to sort
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
				orgOrderCol = cache.normalized[0].length - 1;
				dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
				for(i=0; i < l; i++) {
					dynamicExp += "}; ";
				}
				dynamicExp += "return 0; ";
				dynamicExp += "}; ";
				eval(dynamicExp);
				cache.normalized.sort(sortWrapper);
				if (tc.debug) { benchmark("Sorting on " + sortList.toString() + " and dir " + order+ " time:", sortTime); }
				return cache;
			}

			// Natural sort modified from: http://www.webdeveloper.com/forum/showthread.php?t=107909
			function sortText(a, b) {
				if ($.data(tbl[0], "tablesorter").sortLocaleCompare) { return a.localeCompare(b); }
				if (a === b) { return 0; }
				try {
					var cnt = 0, ax, t, x = /^(\.)?\d/,
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
				if ($.data(tbl[0], "tablesorter").sortLocaleCompare) { return b.localeCompare(a); }
				return -sortText(a, b);
			}

			// return text string value by adding up ascii value
			// so the text is somewhat sorted when using a digital sort
			// this is NOT an alphanumeric sort
			function getTextValue(a, mx, d){
				if (a === '') { return (d || 0) * Number.MAX_VALUE; }
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
				if (a === '' || isNaN(a)) { a = getTextValue(a, mx, d); }
				if (b === '' || isNaN(b)) { b = getTextValue(b, mx, d); }
				return a - b;
			}

			function sortNumericDesc(a, b, mx, d) {
				if (a === '' || isNaN(a)) { a = getTextValue(a, mx, d); }
				if (b === '' || isNaN(b)) { b = getTextValue(b, mx, d); }
				return b - a;
			}

			/* public methods */
			this.construct = function(settings){
				return this.each(function(){
					// if no thead or tbody quit.
					if (!this.tHead || !this.tBodies) { return; }
					// declare
					var $this, $document, $headers, cache, config, shiftDown = 0,
					sortOrder, sortCSS, totalRows, $cell, i, j, a, s, o;
					// new blank config object
					this.config = {};
					// merge and extend.
					config = $.extend(this.config, $.tablesorter.defaults, settings);
					// store common expression for speed
					tbl = $this = $(this).addClass(this.config.tableClass);
					// save the settings where they read
					$.data(this, "tablesorter", config);
					// build headers
					$headers = buildHeaders(this);
					// try to auto detect column type, and store in tables config
					this.config.parsers = buildParserCache(this, $headers);
					// digit sort text location
					this.config.string = { max: 1, 'max+': 1, 'max-': -1, none: 0 };
					// build the cache for the tbody cells
					cache = buildCache(this);
					// get the css class names, could be done else where.
					sortCSS = [config.cssDesc, config.cssAsc];
					// fixate columns if the users supplies the fixedWidth option
					fixColumnWidth(this);
					// apply event handling to headers
					// this is to big, perhaps break it out?
					$headers
					.click(function(e){
						totalRows = ($this[0].tBodies[0] && $this[0].tBodies[0].rows.length) || 0;
						if (!this.sortDisabled && totalRows > 0) {
							// Only call sortStart if sorting is enabled.
							$this.trigger("sortStart", tbl[0]);
							// store exp, for speed
							$cell = $(this);
							// get current column index
							i = this.column;
							// get current column sort order
							this.order = this.count++ % 2;
							// always sort on the locked order.
							if(typeof(this.lockedOrder) !== "undefined" && this.lockedOrder !== false) { this.order = this.lockedOrder; }
							// user only whants to sort on one column
							if (!e[config.sortMultiSortKey]) {
								// flush the sort list
								config.sortList = [];
								if (config.sortForce !== null) {
									a = config.sortForce;
									for (j = 0; j < a.length; j++) {
										if (a[j][0] !== i) {
											config.sortList.push(a[j]);
										}
									}
								}
								// add column to sort list
								config.sortList.push([i, this.order]);
								// multi column sorting
							} else {
								// the user has clicked on an all
								// ready sortet column.
								if (isValueInArray(i, config.sortList)) {
									// revers the sorting direction
									// for all tables.
									for (j = 0; j < config.sortList.length; j++) {
										s = config.sortList[j];
										o = config.headerList[s[0]];
										if (s[0] === i) {
											o.count = s[1];
											o.count++;
											s[1] = o.count % 2;
										}
									}
								} else {
									// add column to sort list array
									config.sortList.push([i, this.order]);
								}
							}
							if (config.sortAppend !== null) {
								a = config.sortAppend;
								for (j = 0; j < a.length; j++) {
									if (a[j][0] !== i) {
										config.sortList.push(a[j]);
									}
								}
							}
							setTimeout(function () {
								// set css for headers
								setHeadersCss($this[0], $headers, config.sortList, sortCSS);
								appendToTable($this[0], multisort($this[0], config.sortList, cache));
							}, 1);
							// stop normal event by returning false
							return false;
						}
						// cancel selection
					})
					.mousedown(function(){
						if (config.cancelSelection) {
							this.onselectstart = function(){
								return false;
							};
							return false;
						}
					});
					// apply easy methods that trigger binded events
					$this
					.bind("update", function(){
						var me = this;
						setTimeout(function(){
							// rebuild parsers.
							me.config.parsers = buildParserCache(me, $headers);
							// rebuild the cache map
							cache = buildCache(me);
						}, 1);
					})
					.bind("updateCell", function(e, cell) {
						var config = this.config,
						// get position from the dom.
						pos = [(cell.parentNode.rowIndex - 1), cell.cellIndex];
						// update cache
						cache.normalized[pos[0]][pos[1]] = config.parsers[pos[1]].format(getElementText(config, cell, pos[1]), cell);
					})
					.bind("sorton", function(e, list) {
						$(this).trigger("sortStart", tbl[0]);
						config.sortList = list;
						// update and store the sortlist
						var sortList = config.sortList;
						// update header count index
						updateHeaderSortCount(this, sortList);
						// set css for headers
						setHeadersCss(this, $headers, sortList, sortCSS);
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
						config.sortList = $(this).metadata().sortlist;
					}
					// if user has supplied a sort list to constructor.
					if (config.sortList.length > 0) {
						$this.trigger("sorton", [config.sortList]);
					}
					// apply widgets
					applyWidget(this);
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
				var i = parseFloat(s);
				// return the text instead of zero
				return isNaN(i) ? $.trim(s) : i;
			};
			this.isDigit = function(s) {
				// replace all unwanted chars and match.
				return (/^[\-+]?\d*$/).test($.trim(s.replace(/[,.']/g, '')));
			};
			this.clearTableBody = function (table) {
				if ($.browser.msie) {
					var empty = function() {
						while (this.firstChild) {
							this.removeChild(this.firstChild);
						}
					};
					empty.apply(table.tBodies[0]);
				} else {
					table.tBodies[0].innerHTML = "";
				}
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
			return $.tablesorter.isDigit(s.replace(/,/g, ""));
		},
		format: function(s){
			return $.tablesorter.formatFloat(s.replace(/,/g, ""));
		},
		type: "numeric"
	});

	ts.addParser({
		id: "currency",
		is: function(s){
			return (/^[£$€¤¥¢?.]/).test(s);
		},
		format: function(s){
			return $.tablesorter.formatFloat(s.replace(new RegExp(/[^0-9.\-]/g), ""));
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
			return $.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//), ''));
		},
		type: "text"
	});

	ts.addParser({
		id: "isoDate",
		is: function(s) {
			return (/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/).test(s);
		},
		format: function(s) {
			return $.tablesorter.formatFloat((s !== "") ? new Date(s.replace(new RegExp(/-/g), "/")).getTime() : "0");
		},
		type: "numeric"
	});

	ts.addParser({
		id: "percent",
		is: function(s) {
			return (/\%$/).test($.trim(s));
		},
		format: function(s) {
			return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g), ""));
		},
		type: "numeric"
	});

	ts.addParser({
		id: "usLongDate",
		is: function(s) {
			return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));
		},
		format: function(s) {
			return $.tablesorter.formatFloat(new Date(s).getTime());
		},
		type: "numeric"
	});

	ts.addParser({
		id: "shortDate",
		is: function(s) {
			return (/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/).test(s);
		},
		format: function(s, table) {
			var c = table.config;
			s = s.replace(/\-/g, "/");
			if (c.dateFormat === "us") {
				// reformat the string in ISO format
				s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2");
			} else if (c.dateFormat === "uk") {
				// reformat the string in ISO format
				s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1");
			} else if (c.dateFormat === "dd/mm/yy" || c.dateFormat === "dd-mm-yy") {
				s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3");
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
			var $tr, row = -1,
			odd, time;
			if (table.config.debug) {
				time = new Date();
			}
			// loop through the visible rows
			$("tr:visible", table.tBodies[0]).each(function (i) {
				$tr = $(this);
				// style children rows the same way the parent row was styled
				if (!$tr.hasClass(table.config.cssChildRow)) { row++; }
				odd = (row % 2 === 0);
				$tr
				.removeClass(table.config.widgetZebra.css[odd ? 0 : 1])
				.addClass(table.config.widgetZebra.css[odd ? 1 : 0]);
			});
			if (table.config.debug) {
				$.tablesorter.benchmark("Applying Zebra widget", time);
			}
		}
	});

})(jQuery);