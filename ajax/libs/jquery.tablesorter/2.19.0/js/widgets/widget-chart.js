/* Chart widget (beta) for TableSorter 2/7/2015 (v2.19.0)
 * Requires tablesorter v2.8+ and jQuery 1.7+
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
	'use strict';

	var ts = $.tablesorter,

	// temp variables
	chart_cols = [],
	chart_headers = [],
	// google charts
	chart_rows = [],
	chart_data = [],
	// highcharts
	chart_categories = [],
	chart_series = [],
	// fusioncharts
	chart_category = [],
	chart_dataset = [],

	chart = ts.chart = {

		// regex used to strip out non-digit values before sending
		// the string to the $.tablesorter.formatFloat function
		nonDigit : /[^\d,.\-()]/g,

		init: function(c, wo) {
			c.$table
				.off(wo.chart_event)
				.on(wo.chart_event, function() {
					if (this.hasInitialized) {
						// refresh "c" variable in case options are updated dynamically
						var c = this.config;
						chart.getCols(c, c.widgetOptions);
						chart.getData(c, c.widgetOptions);
					}
				});
		},

		getCols: function(c, wo) {
			var i;
			chart_cols = [];
			chart_series = [];
			chart_dataset = [];

			for ( i = 0; i < c.columns; i++ ) {
				if ( wo.chart_useSelector && ts.hasWidget( c.table, 'columnSelector' ) && !c.selector.auto ) {
					if ( ( c.selector.states[i] && $.inArray(i, wo.chart_ignoreColumns) < 0 ) ||
						i === wo.chart_labelCol || i === wo.chart_sort[0][0] ) {
						chart_cols.push(i);
					}
				} else {
					if ( $.inArray(i, wo.chart_ignoreColumns) < 0 || i === wo.chart_labelCol || i === wo.chart_sort[0][0] ) {
						chart_cols.push(i);
					}
				}
			}
		},

		getData: function(c, wo) {
			chart.getHeaders(c, wo);
			chart.getRows(c, wo);

			/* == Google data ==
			array of arrays (Google charts)
			[
				[ "Year", "Sales", "Expenses" ],
				[ "2004", 1000, 400  ],
				[ "2005", 1170, 460  ],
				[ "2006", 660,  1120 ],
				[ "2007", 1030, 540  ]
			]

			== Highcharts ==
			categories -> [ '2004', '2005', '2006', '2007' ]
			series -> [{
				name: 'Sales',
				data: [ 1000, 1170, 660, 1030 ]
			}, {
				name: 'Expenses',
				data: [ 400, 460, 1120, 540 ]
			}]

			== Fusioncharts
			"categories": [{
				"category": [
					{"label": "2004"},
					{"label": "2005"},
					{"label": "2006"},
					{"label": "2007"}
				]
			}],
			"dataset": [
				{
					"seriesname": "Sales",
					"data": [
						{"value": "1000"},
						{"value": "1170"},
						{"value": "660"},
						{"value": "1030"}
					]
				},{
					"seriesname": "Expenses",
					"data": [
						{"value": "400"},
						{"value": "600"},
						{"value": "1120"},
						{"value": "540"}
					]
				}
			]
			*/

			chart_data = [ chart_headers ];
			$.each(chart_rows, function(k, row) {
				chart_data.push(row);
			});

			c.chart = {
				// google
				data: chart_data,
				// highcharts
				categories: chart_categories,
				series: chart_series,
				// FusionCharts
				category: chart_category,
				dataset: chart_dataset
			};
		},

		getHeaders: function(c, wo) {
			var text;
			chart_headers = [];
			chart_series = [];
			chart_dataset = [];
			chart_headers.push( c.headerContent[wo.chart_labelCol] );
			$.each(chart_cols, function(k, col) {
				if (col === wo.chart_labelCol) {
					return true;
				}
				text = c.headerContent[col];
				chart_headers.push( text );
				chart_series.push( { name: text, data: [] } );
				chart_dataset.push( { seriesname: text, data: [] } );
			});
		},

		getRows: function(c, wo) {
			// the cache may not have a zero index if there are any "info-only" tbodies above the main tbody
			var cache = c.cache[0].normalized,
				rows = [];
			chart_rows = [];
			chart_categories = [];
			chart_category = [];

			$.each(cache, function(indx, rowVal) {
				var i, txt,
					$tr = rowVal[c.columns].$row,
					$cells = $tr.children('th,td'),
					row = [];
				if (
					(/v/i.test(wo.chart_incRows) && $tr.is(':visible')) ||
					(/f/i.test(wo.chart_incRows) && !$tr.hasClass(wo.filter_filteredRow || 'filtered')) ||
					(!/(v|f)/i.test(wo.chart_incRows))
					) {
					// Add all cols (don't mess up indx for sorting)
					for (i = 0; i < c.columns; i++) {
						if ( $.inArray(indx, wo.chart_parsed) >= 0 ) {
							row.push( rowVal[i] );
						} else {
							txt = $cells[i].getAttribute( c.textAttribute ) || $cells[i].textContent || $cells.eq(i).text();
							row.push( $.trim( txt ) );
						}
					}
					rows.push(row);
				}
			});

			// sort based on chart_sort
			rows.sort(function(a, b) {
				if ( wo.chart_sort[0][1] === 1 ) {
					return ts.sortNatural( b[wo.chart_sort[0][0]], a[wo.chart_sort[0][0]] );
				}
				return ts.sortNatural( a[wo.chart_sort[0][0]], b[wo.chart_sort[0][0]] );
			});

			$.each(rows, function(i, rowVal) {
				var value,
					objIndex = 0,
					row = [],
					label = rowVal[wo.chart_labelCol];

				row.push( '' + label );

				$.each(rowVal, function(indx, cellValue) {
					var tempVal;
					if (indx === wo.chart_labelCol) {
						chart_categories.push( cellValue );
						chart_category.push({ 'label': cellValue });
						return true;
					}
					value = false;
					if ( wo.chart_useSelector && ts.hasWidget( c.table, 'columnSelector' ) && !c.selector.auto ) {
						if ( c.selector.states[indx] && $.inArray(indx, wo.chart_ignoreColumns) < 0 ) {
							value = '' + cellValue;
						}
					} else {
						if ($.inArray(indx, wo.chart_ignoreColumns) < 0) {
							value = '' + cellValue;
						}
					}

					if (value !== false) {
						if ( /s/i.test( '' + wo.chart_layout[row.length] ) ) {
							row.push( value );
							chart_series[objIndex].data.push( value );
							chart_dataset[objIndex].data.push( value );
						} else {
							// using format float, after stripping out all non-digit values
							tempVal = ts.formatFloat( value.replace( chart.nonDigit, '' ), c.table );
							tempVal = isNaN(tempVal) ? value : tempVal;
							// if tempVal ends up being an empty string, fall back to value
							row.push( tempVal );
							chart_series[objIndex].data.push( tempVal );
							chart_dataset[objIndex].data.push( { value : tempVal } );
						}
						objIndex++;
					}
				});
				chart_rows.push(row);
			});
		},

		remove: function(c) {
			c.$table.off(chart.event);
		}

	};

	ts.addWidget({
		id: 'chart',
		options: {
			// (a)ll, (v)isible or (f)iltered - only the first letter is needed
			chart_incRows: 'filtered',
			// prefer columnSelector for ignoreColumns
			chart_useSelector: false,
			// columns to ignore [0, 1,... ] (zero-based index)
			chart_ignoreColumns: [],
			// Use parsed data instead of cell.text()
			chart_parsed: [],
			// data output layout, float is default
			chart_layout: {
				// first element is a string, all others will be float
				0: 'string'
			},
			// Set the label column
			chart_labelCol: 0,
			// data sort, should always be first row, might want [[0,1]]
			chart_sort: [[0,0]],
			// event to trigger get updated data
			chart_event: 'chartData'
		},

		init: function(table, thisWidget, c, wo) {
			chart.init(c, wo);
		},

		remove: function(table, c, wo) {
			chart.remove(c);
		}
	});

})(jQuery);
