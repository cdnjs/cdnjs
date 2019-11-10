;

(function($) {
  $.fn.highchartTable = function() {
    
    var allowedGraphTypes = ['column', 'line', 'area', 'spline', 'pie'];

    var getCallable = function (table, attribute) {
      var callback = $(table).data(attribute);
      if (typeof callback != 'undefined') {
        var infosCallback = callback.split('.');
        var callable      = window[infosCallback[0]];
        for(var i = 1, infosCallbackLength = infosCallback.length; i < infosCallbackLength; i++) {
          callable = callable[infosCallback[i]];
        }
        return callable;
      }
    };

    this.each(function() {
      var table = $(this);
      var $table = $(table);
      var nbYaxis = 1;

      // Retrieve graph title from the table caption
      var captions   = $('caption', table);
      var graphTitle = captions.length ? $(captions[0]).text() : '';

      var graphContainer;
      if ($table.data('graph-container-before') != 1) {
        // Retrieve where the graph must be displayed from the graph-container attribute
        var graphContainerSelector = $table.data('graph-container');
        if (!graphContainerSelector) {
          throw "graph-container data attribute is mandatory";
        }

        if (graphContainerSelector[0] === '#' || graphContainerSelector.indexOf('..')===-1) {
          // Absolute selector path
          graphContainer = $(graphContainerSelector);
        } else {
          var referenceNode                 = table;
          var currentGraphContainerSelector = graphContainerSelector;

          while (currentGraphContainerSelector.indexOf('..')!==-1) {
            currentGraphContainerSelector = currentGraphContainerSelector.replace(/^.. /, '');
            referenceNode = referenceNode.parent();
          }

          graphContainer = $(currentGraphContainerSelector, referenceNode);
        }
        if (graphContainer.length !== 1) {
          throw "graph-container is not available in this DOM or available multiple times";
        }
        graphContainer = graphContainer[0];
      } else {
        $table.before('<div></div>');
        graphContainer = $table.prev();
        graphContainer = graphContainer[0];
      }

      // Retrieve graph type from graph-type attribute
      var globalGraphType = $table.data('graph-type');
      if (!globalGraphType) {
        throw "graph-type data attribute is mandatory";
      }
      if ($.inArray(globalGraphType, allowedGraphTypes) == -1) {
        throw "graph-container data attribute must be one of " + allowedGraphTypes.join(', ');
      }

      var stackingType = $table.data('graph-stacking');
      if (!stackingType) {
        stackingType = 'normal';
      }

      var dataLabelsEnabled = $table.data('graph-datalabels-enabled');
      var isGraphInverted   = $table.data('graph-inverted') == 1;

      // Retrieve series titles
      var ths            = $('thead th', table);
      var columns        = [];
      var vlines         = [];
      var skippedColumns = 0;
      var graphIsStacked = false;
      ths.each(function(indexTh, th) {
        var $th = $(th);
        var columnScale = $th.data('graph-value-scale');

        var serieGraphType = $th.data('graph-type');
        if($.inArray(serieGraphType, allowedGraphTypes) == -1) {
          serieGraphType = globalGraphType;
        }

        var serieStackGroup = $th.data('graph-stack-group');
        if(serieStackGroup) {
          graphIsStacked = true;
       }

        var serieDataLabelsEnabled = $th.data('graph-datalabels-enabled');
        if (typeof serieDataLabelsEnabled == 'undefined') {
          serieDataLabelsEnabled = dataLabelsEnabled;
        }

        var yaxis = $th.data('graph-yaxis');

        if (typeof yaxis != 'undefined' && yaxis == '1') {
          nbYaxis = 2;
        }

        var isColumnSkipped = $th.data('graph-skip') == 1;
        if (isColumnSkipped)
        {
          skippedColumns = skippedColumns + 1;
        }

        var thGraphConfig = {
          libelle:           $th.text(),
          skip:              isColumnSkipped,
          indexTd:           indexTh - skippedColumns - 1,
          color:             $th.data('graph-color'),
          visible:           !$th.data('graph-hidden'),
          yAxis:             typeof yaxis != 'undefined' ? yaxis : 0,
          dashStyle:         $th.data('graph-dash-style') || 'solid',
          dataLabelsEnabled: serieDataLabelsEnabled == 1,
          dataLabelsColor:   $th.data('graph-datalabels-color') ||  $table.data('graph-datalabels-color')

        };

        var vlinex = $th.data('graph-vline-x');
        if (typeof vlinex == 'undefined') {
          thGraphConfig.scale     = typeof columnScale != 'undefined' ? parseFloat(columnScale) : 1;
          thGraphConfig.graphType = serieGraphType == 'column' && isGraphInverted ? 'bar' : serieGraphType;
          thGraphConfig.stack     = serieStackGroup;
          thGraphConfig.unit      = $th.data('graph-unit');
          columns[indexTh]        = thGraphConfig;
        } else {
          thGraphConfig.x      = vlinex;
          thGraphConfig.height = $th.data('graph-vline-height');
          thGraphConfig.name   = $th.data('graph-vline-name');
          vlines[indexTh]      = thGraphConfig;
        }
      });
      
      var series = [];
      $(columns).each(function(indexColumn, column) {
        if(indexColumn!=0 && !column.skip) {

          var serieConfig = {
            name:      column.libelle + (column.unit ? ' (' + column.unit + ')' : ''),
            data:      [],
            type:      column.graphType,
            stack:     column.stack,
            color:     column.color,
            visible:   column.visible,
            yAxis:     column.yAxis,
            dashStyle: column.dashStyle,
            marker: {
                enabled: false
            },
            dataLabels: {
              enabled: column.dataLabelsEnabled,
              color:   column.dataLabelsColor,
              align:   $table.data('graph-datalabels-align') || (globalGraphType == 'column' && isGraphInverted == 1 ? undefined : 'center')
            }
          };

          if(column.dataLabelsEnabled) {
            var callableSerieDataLabelsFormatter = getCallable(table, 'graph-datalabels-formatter');
            if (callableSerieDataLabelsFormatter) {
              serieConfig.dataLabels.formatter = function () {
                return callableSerieDataLabelsFormatter(this.y);
              };
            }
          }
          series.push(serieConfig);
        }
      });

      $(vlines).each(function(indexColumn, vline) {
        if (typeof vline != 'undefined' && !vline.skip) {
          series.push({
            name:    vline.libelle,
            data:    [{x: vline.x, y:0, name: vline.name}, {x:vline.x, y:vline.height, name: vline.name}],
            type:    'spline',
            color:   vline.color,
            visible: vline.visible,
            marker: {
              enabled: false
            }
          });
        }
      });

      var xValues         = [];
      var callablePoint   = getCallable(table, 'graph-point-callback');
      var isGraphDatetime = $table.data('graph-xaxis-type') == 'datetime';
      
      var rows            = $('tbody:first tr', table);
      rows.each(function(indexRow, row) {
        if (!!$(row).data('graph-skip')) {
          return;
        }

        var tds = $('td', row);
        tds.each(function(indexTd, td) {
          var cellValue;
          var column = columns[indexTd];

          if (column.skip) {
            return;
          }
          var $td = $(td);
          if (indexTd==0) {
            cellValue = $td.text();
            xValues.push(cellValue);
          } else {
            var rawCellValue = $td.text();
            var serie  = series[column.indexTd];

            if (rawCellValue.length==0) {
              if (!isGraphDatetime) {
                serie.data.push(null);
              }
            } else {
              var cleanedCellValue = rawCellValue.replace(/\s/g, '').replace(/,/, '.');
              cellValue = Math.round(parseFloat(cleanedCellValue) * column.scale * 100) / 100;

                var dataGraphX = $td.data('graph-x');

                if (isGraphDatetime) {
                  dataGraphX    = $('td', $(row)).first().text();
                  var date      = parseDate(dataGraphX);
                  dataGraphX    = date.getTime() - date.getTimezoneOffset()*60*1000;
                }

                var tdGraphName = $td.data('graph-name');
                var serieDataItem = {
                  name:   typeof tdGraphName != 'undefined' ? tdGraphName : rawCellValue,
                  y:      cellValue,
                  x:      dataGraphX //undefined if no x defined in table
                };

                if (callablePoint) {
                  serieDataItem.events = {
                    click: function () {
                        return callablePoint(this);
                      }
                  };
                }

                if (column.graphType === 'pie') {
                  if ($td.data('graph-item-highlight')) {
                    serieDataItem.sliced = 1;
                  }
                }

                var tdGraphItemColor = $td.data('graph-item-color');
                if (typeof tdGraphItemColor != 'undefined') {
                  serieDataItem.color =  tdGraphItemColor;
                }

              serie.data.push(serieDataItem);
            }
          }
        });

      });

      var yAxisConfig = [];
      var yAxisNum;
      for (yAxisNum=1 ; yAxisNum <= nbYaxis ; yAxisNum++) {
        var yAxisConfigCurrentAxis = {
          title: {
            text: typeof $table.data('graph-yaxis-'+yAxisNum+'-title-text') != 'undefined'  ? $table.data('graph-yaxis-'+yAxisNum+'-title-text') : null
          },
          max:          typeof $table.data('graph-yaxis-'+yAxisNum+'-max') != 'undefined' ? $table.data('graph-yaxis-'+yAxisNum+'-max') : null,
          min:          typeof $table.data('graph-yaxis-'+yAxisNum+'-min') != 'undefined' ? $table.data('graph-yaxis-'+yAxisNum+'-min') : null,
          reversed:     $table.data('graph-yaxis-'+yAxisNum+'-reversed') == '1',
          opposite:     $table.data('graph-yaxis-'+yAxisNum+'-opposite') == '1',
          tickInterval: $table.data('graph-yaxis-'+yAxisNum+'-tick-interval') || null,
          labels: {
            rotation: $table.data('graph-yaxis-'+yAxisNum+'-rotation') || 0
          },
          startOnTick: $table.data('graph-yaxis-'+yAxisNum+'-start-on-tick') !== "0",
          endOnTick:   $table.data('graph-yaxis-'+yAxisNum+'-end-on-tick') !== "0",
          stackLabels : {
            enabled: $table.data('graph-yaxis-'+yAxisNum+'-stacklabels-enabled') == '1'
          },
          gridLineInterpolation: $table.data('graph-yaxis-'+yAxisNum+'-grid-line-interpolation') || null
        };

        var callableYAxisFormatter = getCallable(table, 'graph-yaxis-'+yAxisNum+'-formatter-callback');
        if (callableYAxisFormatter) {
          yAxisConfigCurrentAxis.labels.formatter = function () {
              return callableYAxisFormatter(this.value);
          };
        }

        yAxisConfig.push(yAxisConfigCurrentAxis);
      }

      var defaultColors = [
        '#4572A7',
        '#AA4643',
        '#89A54E',
        '#80699B',
        '#3D96AE',
        '#DB843D',
        '#92A8CD',
        '#A47D7C',
        '#B5CA92'
      ];
      var colors = [];

      var themeColors = typeof Highcharts.theme != 'undefined' && typeof Highcharts.theme.colors != 'undefined' ? Highcharts.theme.colors : [];
      var lineShadow  = $table.data('graph-line-shadow');
      var lineWidth   = $table.data('graph-line-width') || 2;

      var nbOfColors = Math.max(defaultColors.length, themeColors.length);
      for(var i=0; i < nbOfColors; i++) {
        var dataname = 'graph-color-' + (i+1);
        colors.push(typeof $table.data(dataname) != 'undefined' ? $table.data(dataname) : typeof themeColors[i] != 'undefined' ? themeColors[i] : defaultColors[i]);
      }

      var marginTop    = $table.data('graph-margin-top');
      var marginRight  = $table.data('graph-margin-right');
      var marginBottom = $table.data('graph-margin-bottom');
      var marginLeft   = $table.data('graph-margin-left');
      
      var xAxisLabelsEnabled = $table.data('graph-xaxis-labels-enabled');

      var xAxisLabelStyle = {};
      var xAxisLabelFontSize = $table.data('graph-xaxis-labels-font-size');
      
      if (typeof xAxisLabelFontSize != 'undefined')
      {
        xAxisLabelStyle.fontSize = xAxisLabelFontSize; 
      }

      var highChartConfig = {
        colors: colors,
        chart: {
          renderTo:     graphContainer,
          inverted:     isGraphInverted,
          marginTop:    typeof marginTop != 'undefined' ? marginTop : null,
          marginRight:  typeof marginRight != 'undefined' ? marginRight : null,
          marginBottom: typeof marginBottom != 'undefined' ? marginBottom : null,
          marginLeft:   typeof marginLeft != 'undefined' ? marginLeft : null,
          spacingTop:   $table.data('graph-spacing-top') || 10,
          height:       $table.data('graph-height') || null,
          zoomType:     $table.data('graph-zoom-type') || null,
          polar:        $table.data('graph-polar') || null
        },
        title: {
          text: graphTitle
        },
        subtitle: {
          text: $table.data('graph-subtitle-text') || ''
        },
        legend: {
          enabled:     $table.data('graph-legend-disabled') != '1',
          layout:      $table.data('graph-legend-layout') || 'horizontal',
          symbolWidth: $table.data('graph-legend-width') || 30,
          x:           $table.data('graph-legend-x') || 15,
          y:           $table.data('graph-legend-y') || 0
        },
        xAxis: {
          categories:             ($table.data('graph-xaxis-type') != 'datetime') ? xValues : undefined,
          type:                   ($table.data('graph-xaxis-type') == 'datetime') ? 'datetime' :  undefined,
          reversed:               $table.data('graph-xaxis-reversed') == '1',
          opposite:               $table.data('graph-xaxis-opposite') == '1',
          showLastLabel:          typeof $table.data('graph-xaxis-show-last-label') != 'undefined' ? $table.data('graph-xaxis-show-last-label') : true,
          tickInterval:           $table.data('graph-xaxis-tick-interval') || null,
          dateTimeLabelFormats:   { //by default, we display the day and month on the datetime graphs
            second: '%e. %b',
            minute: '%e. %b',
            hour:   '%e. %b',
            day:    '%e. %b',
            week:   '%e. %b',
            month:  '%e. %b',
            year:   '%e. %b'
          },
          labels:
          {
            rotation: $table.data('graph-xaxis-rotation') || 0,
            align:    $table.data('graph-xaxis-align') || 'center', 
            enabled:  typeof xAxisLabelsEnabled != 'undefined' ? xAxisLabelsEnabled : true,
            style:    xAxisLabelStyle
          },
          startOnTick: $table.data('graph-xaxis-start-on-tick'),
          endOnTick:   $table.data('graph-xaxis-end-on-tick'),
          min: getXAxisMinMax(table, 'min'),
          max: getXAxisMinMax(table, 'max'),
          alternateGridColor: $table.data('graph-xaxis-alternateGridColor') || null,
          title: {
            text: $table.data('graph-xaxis-title-text') || null
          },
          gridLineWidth:     $table.data('graph-xaxis-gridLine-width') || 0,
          gridLineDashStyle: $table.data('graph-xaxis-gridLine-style') || 'ShortDot',
          tickmarkPlacement: $table.data('graph-xaxis-tickmark-placement') || 'between',
          lineWidth:         $table.data('graph-xaxis-line-width') || 0
        },
        yAxis: yAxisConfig,
        tooltip: {
            formatter: function() {
              if ($table.data('graph-xaxis-type') == 'datetime') {
                return '<b>'+ this.series.name +'</b><br/>'+  Highcharts.dateFormat('%e. %b', this.x) +' : '+ this.y;
              } else {
                var xValue = typeof xValues[this.point.x] != 'undefined' ? xValues[this.point.x] : this.point.x;
                if (globalGraphType === 'pie') {
                  return '<strong>' + this.series.name + '</strong><br />' + xValue + ' : '  + this.point.y;
                }
                return '<strong>' + this.series.name + '</strong><br />' + xValue + ' : '  + this.point.name;
              }
            }
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            },
            lineWidth: lineWidth
          },
          area: {
            lineWidth:   lineWidth,
            shadow:      typeof lineShadow != 'undefined' ? lineShadow : true,
            fillOpacity: $table.data('graph-area-fillOpacity') || 0.75
          },
          pie: {
            allowPointSelect: true,
            dataLabels: {
              enabled: true
            },
            showInLegend: $table.data('graph-pie-show-in-legend') == '1',
            size:         '80%'
          },
          series: {
            animation:       false,
            stickyTracking : false,
            stacking:        graphIsStacked ? stackingType : null,
            groupPadding:    $table.data('graph-group-padding') || 0
          }
        },
        series: series,
        exporting: {
            filename: graphTitle.replace(/ /g, '_'),
            buttons: {
              exportButton: {
                menuItems: null,
                onclick: function() {
                  this.exportChart();
                }
              }
            }
          }
      };

      $table.trigger('highchartTable.beforeRender', highChartConfig);
      new Highcharts.Chart(highChartConfig);

    });
    //for fluent api
    return this;
  };
  
  var getXAxisMinMax = function(table, minOrMax) {
    var value = $(table).data('graph-xaxis-'+minOrMax);
    if (typeof value != 'undefined') {
      if ($(table).data('graph-xaxis-type') == 'datetime') {
        var date      = parseDate(value);
        return date.getTime() - date.getTimezoneOffset()*60*1000;
      }
      return value;
    }
    return null;
  };

  var parseDate = function(datetime) {
    var calculatedateInfos  = datetime.split(' ');
    var dateDayInfos        = calculatedateInfos[0].split('-');
    var min                 = null;
    var hour                = null;
    // If hour and minute are available in the datetime string
    if(calculatedateInfos[1]) {
      var dateHourInfos = calculatedateInfos[1].split(':');
      min               =  parseInt(dateHourInfos[0], 10);
      hour              = parseInt(dateHourInfos[1], 10);
    }
    return new Date(parseInt(dateDayInfos[0], 10), parseInt(dateDayInfos[1], 10)-1, parseInt(dateDayInfos[2], 10), min, hour);
  };
  
})(jQuery);
