/* tslint:disable */
/* eslint-disable */
(function ($) {
	if (!Array.prototype.find) {
	  Object.defineProperty(Array.prototype, 'find', {
		value: function(predicate) {
		 // 1. Let O be ? ToObject(this value).
		  if (this == null) {
			throw new TypeError('"this" is null or not defined');
		  }

		  var o = Object(this);

		  // 2. Let len be ? ToLength(? Get(O, "length")).
		  var len = o.length >>> 0;

		  // 3. If IsCallable(predicate) is false, throw a TypeError exception.
		  if (typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		  }

		  // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
		  var thisArg = arguments[1];

		  // 5. Let k be 0.
		  var k = 0;

		  // 6. Repeat, while k < len
		  while (k < len) {
			// a. Let Pk be ! ToString(k).
			// b. Let kValue be ? Get(O, Pk).
			// c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
			// d. If testResult is true, return kValue.
			var kValue = o[k];
			if (predicate.call(thisArg, kValue, k, o)) {
			  return kValue;
			}
			// e. Increase k by 1.
			k++;
		  }

		  // 7. Return undefined.
		  return undefined;
		}
	  });
	}
	if (!Array.prototype.findIndex) {
	  Object.defineProperty(Array.prototype, 'findIndex', {
		value: function(predicate) {
		 // 1. Let O be ? ToObject(this value).
		  if (this == null) {
			throw new TypeError('"this" is null or not defined');
		  }

		  var o = Object(this);

		  // 2. Let len be ? ToLength(? Get(O, "length")).
		  var len = o.length >>> 0;

		  // 3. If IsCallable(predicate) is false, throw a TypeError exception.
		  if (typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		  }

		  // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
		  var thisArg = arguments[1];

		  // 5. Let k be 0.
		  var k = 0;

		  // 6. Repeat, while k < len
		  while (k < len) {
			// a. Let Pk be ! ToString(k).
			// b. Let kValue be ? Get(O, Pk).
			// c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
			// d. If testResult is true, return k.
			var kValue = o[k];
			if (predicate.call(thisArg, kValue, k, o)) {
			  return k;
			}
			// e. Increase k by 1.
			k++;
		  }

		  // 7. Return -1.
		  return -1;
		},
		configurable: true,
		writable: true
	  });
	}
	
	$.extend($.jqx._jqxGrid.prototype, {
		_getChartDataFields: function (data) {
			var that = this;
			var record = data[0];
			var stringOnly = true,
				xAxisDataField,
				series = [];

			for (var dataField in record) {
				if (dataField === '$' || dataField === 'uid' || dataField === 'boundindex' || dataField === 'uniqueid' || dataField === 'visibleindex') {
					continue;
				}

				var dataType = that.source._source.dataFields.find(function (gridField) { return gridField.name === dataField }).type;

				if (dataType === 'string') {
					var index = that.columns.records.findIndex(function (col) { return col.datafield === dataField });

					if (index === 0) {
						xAxisDataField = dataField;
					}
				}
				else {
					stringOnly = false;
					series.push({ dataField: dataField, displayText: dataField });
				}
			}

			return { xAxisDataField: xAxisDataField, series: series, stringOnly: stringOnly };
		},

		createChart: function (type, dataSource) {
			var that = this;
			var gridSelection = that.getselection(),
				selectedRows = gridSelection.rows,
				selectedCells = gridSelection.cells,
				chartElement = document.createElement('div'),
				chartData = [],
				seriesGroup = {};
			var rowsToPlot = [],
				columnsToPlot = [],
				series;

			if (selectedCells && selectedCells.length > 1) {
				selectedCells.forEach(function (cell) {
					if (rowsToPlot.indexOf(cell.rowindex) === -1) {
						rowsToPlot.push(cell.rowindex);
					}

					if (columnsToPlot.indexOf(cell.datafield) === -1) {
						columnsToPlot.push(cell.datafield);
					}
				});
			}

			if (selectedRows.length === 0 && selectedCells.length === 0) {
				var dataSource = that.source.records;
			}

			if (dataSource) {
				chartData = chartData.concat(dataSource);
			}
			else {
				var dataSource = that.source.records;

				for (var i = 0; i < dataSource.length; i++) {
					var record = {};

					if (selectedRows.length > 0) {
						if (selectedRows.indexOf(i) === -1) {
							continue;
						}
					}
					else if (selectedCells.length > 0) {
						if (selectedCells.length > 1) {
							if (rowsToPlot.indexOf(i) === -1) {
								continue;
							}

							columnsToPlot.forEach(function (dataField) {
								record[dataField] = dataSource[i][dataField];
							});
							chartData.push(record);
							continue;
						}
					}

					that.columns.records.forEach(function (col) { record[col.datafield] = dataSource[i][col.datafield] });
					chartData.push(record);
				}
			}

			var chartDataFields = that._getChartDataFields(chartData);

			if (chartDataFields.stringOnly) {
				if (that.showheader) {
					var chartIcon = that.element.querySelector('#' + type);

					that.toolbar[0].firstElementChild.classList.add('warning');

					if (chartIcon) {
						chartIcon.classList.add('warning');
					}

					setTimeout(function () {
						that.toolbar[0].firstElementChild.classList.remove('warning');

						if (chartIcon) {
							chartIcon.classList.remove('warning');
						}
					}, 1000);
				}

				return;
			}

			series = chartDataFields.series;

			var chart = {};

			chart.title = '';
			chart.description = '';
			chart.showLegend = true;
			chart.showBorderLine = false;
			chart.padding = { left: 5, top: 10, right: 5, bottom: 5 };
			chart.source = chartData;
			chart.xAxis =
			{
				dataField: chartDataFields.xAxisDataField,
				gridLines: {
					visible: true
				}
			};
			chart.valueAxis =
			{
				displayValueAxis: true,
				description: that.charting.description,
				axisSize: 'auto',
				formatSettings: that.charting.formatSettings
			};
			chart.colorScheme = that.charting.colorScheme;
			chart.seriesGroups = [seriesGroup];

			seriesGroup.formatSettings = that.charting.formatSettings;
			seriesGroup.series = series;

			if (type === 'line') {
				series.forEach(function (serie) {
					serie.symbolSize = 8;
					serie.symbolType = 'square';
				});
			}
			else if (type === 'pie') {
				var pieDataField = series[0].dataField;

				delete seriesGroup.formatSettings;
				seriesGroup.formatFunction = function (value, index) {
					if (isNaN(value)) {
						if (typeof value === 'object') {
							return index;
						}

						return value;
					}

					return value;
				};
				seriesGroup.showLabels = true;
				series.length = 0;
				series.push({
					dataField: pieDataField,
					displayText: chartDataFields.xAxisDataField,
					initialAngle: 0
				});
			}
			else if (type === 'bar') {
				type = 'column';
				seriesGroup.orientation = 'horizontal';
				chart.xAxis.textRotationAngle = 90;
				chart.valueAxis.textRotationAngle = 30;
				chart.valueAxis.flip = true;
			}
			else if (type === 'area') {
				var opacity = 1;

				for (var i = 0; i < series.length; i++) {
					series[i].opacity = opacity;
					opacity -= 0.2;
					opacity = Math.max(0.3, opacity);
				}
			}

			seriesGroup.type = type;

			if (that.charting.ready) {
				that.charting.ready(chart);
			}

			if (that.charting.appendTo) {
				var container = that.charting.appendTo === 'string' ? document.querySelector(that.charting.appendTo) : that.charting.appendTo;

				if (container) {
					var chartInstance = new jqxChart(chartElement, chart);
					container.appendChild(chartElement);
				}
			}
			else {
				that._openChartDialog(chartElement, type, chart);
			}
		},

		_openChartDialog: function (chart, chartType, settings) {
			var that = this;

			if (!that.charting.dialog.enabled) {
				return false;
			}

			var dialogElement = document.createElement('div');

			dialogElement.innerHTML = '<div>' + that.charting.dialog.header + '</div><div style="overflow:hidden;"></div>';

			var chartLabel = chartType.substring(0, 1).toUpperCase() + chartType.substring(1);

			chart.style.width = '100%';
			chart.style.height = '100%';

			var dialog = new jqxWindow(dialogElement, {
				width: that.charting.dialog.width,
				height: that.charting.dialog.height,
				position: that.charting.dialog.position,
				isModal: true
			});

			dialog.open();

			setTimeout(function () {
				dialogElement.querySelector('.jqx-widget-content').appendChild(chart);
				var chartInstance = new jqxChart(chart, settings);
			}, 100);

			dialog.on('close', function () {
				dialog.destroy();
			});
		}
	});
})(jqxBaseFramework);
