/**
 * @name  patternfly card
 *
 * @description
 *   Card module for patternfly.
 *
 */
angular.module('patternfly.card', []);
;/**
 * @name  patternfly
 *
 * @description
 *   Charts module for patternfly. Must Include d3.js and c3.js to use
 *
 */
angular.module('patternfly.charts', ['patternfly.utils', 'ui.bootstrap', 'ngSanitize']);

;/**
 * @name  patternfly card
 *
 * @description
 *   Filters module for patternfly.
 *
 */
angular.module('patternfly.filters', ['patternfly.select', 'ui.bootstrap']);
;/**
 * @name  patternfly.form
 *
 * @description
 *   Module for formting related functionality, primarily filters.
 */
angular.module('patternfly.form', []);
;/**
 * @name  patternfly notification
 *
 * @description
 *   Notification module for patternfly.
 *
 */
angular.module('patternfly.notification', []);
;/**
 * @name  patternfly
 *
 * @description
 *   Base module for patternfly.
 */
angular.module('patternfly', [
  'patternfly.autofocus',
  'patternfly.card',
  'patternfly.filters',
  'patternfly.form',
  'patternfly.notification',
  'patternfly.select',
  'patternfly.sort',
  'patternfly.toolbars',
  'patternfly.utils',
  'patternfly.validation',
  'patternfly.views'
]);

;/**
 * @name  patternfly card
 *
 * @description
 *   Sort module for patternfly.
 *
 */
angular.module('patternfly.sort', ['ui.bootstrap']);
;/**
 * @name  patternfly toolbars
 *
 * @description
 *   Filters module for patternfly.
 *
 */
angular.module('patternfly.toolbars', [
  'patternfly.utils',
  'patternfly.filters',
  'patternfly.sort',
  'patternfly.views']);
;
angular.module( 'patternfly.utils', [] );
;/**
 * @name  patternfly
 *
 * @description
 *   Views module for patternfly.
 *
 */
angular.module('patternfly.views', ['patternfly.utils', 'patternfly.filters', 'patternfly.sort']);
;/**
 * @ngdoc directive
 * @name patternfly.autofocus:pfFocused
 * @restrict A
 * @element ANY
 * @param {expression=} pfFocused If the expression is true, the element is focused and selected (if possible).
 *
 * @description
 * The focus on element is evaluated from given expression. If the expression provided as an attribute to this directive
 * is evaluated as true, the element is selected (and focused).
 *
 * @example
 <example module="patternfly.autofocus">

 <file name="index.html">
   <div>
   <form class="form-horizontal">

     <div class="form-group">
       <label class="col-sm-2 control-label" for="i1">Focus next input:</label>
       <div class="col-sm-10">
         <input id="i1" ng-model="isFocus" type="checkbox"></input>
       </div>
     </div>

     <div class="form-group">
       <label class="col-sm-2 control-label" for="i2">Focused input:</label>
       <div class="col-sm-10">
         <input class="form-control" id="i1" ng-model="i2" pf-focused="isFocus" placeholder="This will be selected after checking the box above."></input>
       </div>
     </div>

   </form>
   </div>
 </file>

 </example>
 */

angular.module('patternfly.autofocus', []).directive('pfFocused', ["$timeout", function ($timeout) {
  'use strict';

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(attrs.pfFocused, function (newValue) {
        $timeout(function () {
          if (newValue) {
            element[0].focus();
            if (element[0].select) {
              element[0].select();
            }
          }
        });
      });
    }
  };
}]);
;/**
 * @ngdoc directive
 * @name patternfly.card.directive:pfAggregateStatusCard
 * @restrict A
 * @element ANY
 * @param {object} status Status configuration information<br/>
 * <ul style='list-style-type: none'>
 * <li>.title         - the main title of the aggregate status card
 * <li>.count         - the number count of the main statuses
 * <li>.href          - the href to navigate to if one clicks on the title or count
 * <li>.iconClass     - an icon to display to the left of the count
 * <li>.notifications - an array of status icons & counts
 *   <ul style='list-style-type: none'>
 *   <li>.iconClass   - an icon to display to the right of the notification count
 *   <li>.count         - the number count of the notification status
 *   <li>.href          - href to navigate to if one clicks on the notification status icon or count
 *   </ul>
 * </ul>
 * When layout='mini', only one notification can be specified:<br>
 * <ul style='list-style-type: none'>
 * <li>...
 * <li><strong>.notification</strong>  - an <em>object</em> of containing a single notification icon & count
 *   <ul style='list-style-type: none'>
 *   <li>.iconClass   - an icon to display to the right of the notification count
 *   <li>.count         - the number count of the notification status
 *   <li>.href          - href to navigate to if one clicks on the notification status icon or count
 *   </ul>
 * </ul>
 * @param {boolean=} show-top-border Show/hide the top border, true shows top border, false (default) hides top border
 * @param {string=} layout Various alternative layouts the aggregate status card may have:<br/>
 * <ul style='list-style-type: none'>
 * <li>'mini' displays a mini aggregate status card.  Note: when using 'mini' layout, only one notification can be specified in the status object
 * <li>'tall' displays a tall aggregate status card.  This equals the depreciated 'alt-layout' param.</li>
 * </ul>
 * @deprecated {boolean=} alt-layout Display the aggregate status card in a 'alternate tall' layout.  false (default) displays normal layout, true displays tall layout
 *
 * @description
 * Directive for easily displaying status information
 *
 * @example
 <example module="patternfly.card">

 <file name="index.html">
   <div ng-controller="CardDemoCtrl" style="display:inline-block;">
     <div class="col-md-10">
       <label>With Top Border</label>
       <div pf-aggregate-status-card status="status" show-top-border="true"></div>
       <br/>
       <label>No Top Border</label>
       <div pf-aggregate-status-card status="status"></div>
       <br/>
       <label>layout = "mini"</label>
       <div pf-aggregate-status-card status="miniAggStatus" show-top-border="true" layout="mini"></div>
       <div pf-aggregate-status-card status="miniAggStatus2" show-top-border="true" layout="mini"></div>
       <br/>
       <label>layout = "tall"</label>
       <div pf-aggregate-status-card status="aggStatusAlt" show-top-border="true" layout="tall"></div>
       <br/>
       <label>Alternate Layout</label>
       <i>(depreciated, use layout = 'tall' instead)</i>
       </br></br>
       <div pf-aggregate-status-card status="aggStatusAlt" show-top-border="true" alt-layout="true"></div>
     </div>
   </div>
 </file>

 <file name="script.js">
   angular.module( 'patternfly.card' ).controller( 'CardDemoCtrl', function( $scope ) {
    $scope.status = {
      "title":"Nodes",
      "count":793,
      "href":"#",
      "iconClass": "fa fa-shield",
      "notifications":[
        {
          "iconClass":"pficon pficon-error-circle-o",
          "count":4,
          "href":"#"
        },
        {
          "iconClass":"pficon pficon-warning-triangle-o",
          "count":1
        }
      ]
    };

    $scope.aggStatusAlt = {
      "title":"Providers",
      "count":3,
      "notifications":[
        {
          "iconClass":"pficon pficon-openshift",
          "count":1,
          "href":"#"
        },
        {
          "iconClass":"pficon pficon-kubernetes",
          "count":2,
          "href":"#"
        }
      ]
     };

     $scope.miniAggStatus = {
      "iconClass":"pficon pficon-container-node",
      "title":"Nodes",
      "count":52,
      "href":"#",
      "notification": {
          "iconClass":"pficon pficon-error-circle-o",
          "count":3
        }
     };

     $scope.miniAggStatus2 = {
      "iconClass":"pficon pficon-cluster",
      "title":"Adipiscing",
      "count":9,
      "href":"#",
      "notification":{
          "iconClass":"pficon pficon-ok"
        }
     };
   });
 </file>

 </example>
 */

angular.module( 'patternfly.card' ).directive('pfAggregateStatusCard', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      status: '=',
      showTopBorder: '@?',
      altLayout: '@?',
      layout: '@?'
    },
    templateUrl: 'card/aggregate-status/aggregate-status-card.html',
    link: function (scope) {
      scope.shouldShowTopBorder = (scope.showTopBorder === 'true');
      scope.isAltLayout = (scope.altLayout === 'true' || scope.layout === 'tall');
      scope.isMiniLayout = (scope.layout === 'mini');
    }
  };
});
;/**
 * @ngdoc directive
 * @name patternfly.card.directive:pfCard
 * @restrict A
 * @element ANY
 * @param {string} headTitle Title for the card
 * @param {string=} subTitle Sub-Title for the card
 * @param {boolean=} showTopBorder Show/Hide the blue top border. True shows top border, false (default) hides top border
 * @param {boolean=} showTitlesSeparator Show/Hide the grey line between the title and sub-title.
 * True (default) shows the line, false hides the line
 * @param {object=} footer footer configuration properties:<br/>
 * <ul style='list-style-type: none'>
 * <li>.iconClass  - (optional) the icon to show on the bottom left of the footer panel
 * <li>.text       - (optional) the text to show on the bottom left of the footer panel, to the right of the icon
 * <li>.href       - (optional) the href link to navigate to when the footer href is clicked
 * <li>.callBackFn - (optional) user defined function to call when the footer href is clicked
 * </ul>
 * *Note: If a href link and a callBackFn are specified, the href link will be called
 * @param {object=} filter filter configuration properties:<br/>
 * <ul style='list-style-type: none'>
 * <li>.filters    - drop down items for the filter.
 *<pre class=''>
 *  Ex:  'filters' : [{label:'Last 30 Days', value:'30'},
 *                    {label:'Last 15 Days', value:'15'},
 *                    {label:'Today', value:'today'}]</pre>
 * <li>.defaultFilter - integer, 0 based index into the filters array
 * <li>.callBackFn - user defined function to call when a filter is selected
 * </ul>
 * @description
 * Directive for easily displaying a card with html content
 *
 * @example
 <example module="demo">

 <file name="index.html">
   <div ng-controller="ChartCtrl">
     <label class="label-title">Timeframe filter in header</label>
     <div pf-card head-title="Card Title" sub-title="Card Subtitle" show-top-border="true" filter="filterConfigHeader" style="width: 50%">
       Card Contents
     </div>

     <label class="label-title">Footer with Link & Timeframe filter</label>
     <div pf-card head-title="Card Title" sub-title="Card Subtitle" show-top-border="true"
          footer="footerConfig" filter="filterConfig" style="width: 50%">
       Card Contents
     </div>

     <label class="label-title">Card With Single Trend Chart</label>
     <div pf-card head-title="Cluster Utilization" show-top-border="true" footer="footerConfig" filter="filterConfig" style="width: 50%">
       <div pf-trends-chart config="configSingle" chart-data="dataSingle"></div>
     </div>

     <label class="label-title">Card With Multiple Trends</label>
     <div pf-card head-title="Performance" sub-title="Last 30 Days" show-top-border="false"
          show-titles-separator="false" style="width: 65%" footer="actionBarConfig">
       <div pf-trends-chart config="configVirtual" chart-data="dataVirtual"></div>
       <div pf-trends-chart config="configPhysical" chart-data="dataPhysical"></div>
       <div pf-trends-chart config="configMemory" chart-data="dataMemory"></div>
     </div>

     <label class="label-title">Card With Multiple Utilization Bars</label>
     <div pf-card head-title="System Resources" show-top-border="true" style="width: 65%">
       <div pf-utilization-bar-chart chart-data=data2 chart-title=title2 layout=layoutInline units=units2 threshold-error="85" threshold-warning="60"></div>
       <div pf-utilization-bar-chart chart-data=data3 chart-title=title3 layout=layoutInline units=units3 threshold-error="85" threshold-warning="60"></div>
       <div pf-utilization-bar-chart chart-data=data4 chart-title=title4 layout=layoutInline units=units4 threshold-error="85" threshold-warning="60"></div>
       <div pf-utilization-bar-chart chart-data=data5 chart-title=title5 layout=layoutInline units=units5 threshold-error="85" threshold-warning="60"></div>
     </div>

   </div>
 </file>
 <file name="script.js">
 angular.module( 'demo', ['patternfly.charts', 'patternfly.card'] ).controller( 'ChartCtrl', function( $scope ) {

       $scope.footerConfig = {
         'iconClass' : 'fa fa-flag',
         'text'      : 'View All Events',
         'callBackFn': function () {
            alert("Footer Callback Fn Called");
          }
       }

       $scope.filterConfigHeader = {
         'filters' : [{label:'Last 30 Days', value:'30'},
                      {label:'Last 15 Days', value:'15'},
                      {label:'Today', value:'today'}],
         'callBackFn': function (f) {
            alert("Header Filter Callback Fn Called for '" + f.label + "' value = " + f.value);
          },
        'position' : 'header'
       }

       $scope.filterConfig = {
         'filters' : [{label:'Last 30 Days', value:'30'},
                      {label:'Last 15 Days', value:'15'},
                      {label:'Today', value:'today'}],
         'callBackFn': function (f) {
            alert("Filter Callback Fn Called for '" + f.label + "' value = " + f.value);
          },
        'defaultFilter' : '1'
       }

       var today = new Date();
       var dates = ['dates'];
       for (var d = 20 - 1; d >= 0; d--) {
         dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
       }

       $scope.configSingle = {
         'chartId'      : 'example2TrendsChart',
         'title'        : 'Storage Capacity',
         'layout'       : 'compact',
         'valueType'    : 'actual',
         'units'        : 'TB',
         'tooltipType'  : 'percentage'
       };

       $scope.dataSingle = {
         'total': '250',
         'xData': dates,
         'yData': ['used', '90', '20', '30', '20', '20', '10', '14', '20', '25', '68', '44', '56', '78', '56', '67', '88', '76', '65', '87', '76']
       };

       $scope.configVirtual = {
         'chartId'      : 'virtualTrendsChart',
         'layout'       : 'inline',
         'trendLabel'   : 'Virtual Disk I/O',
         'units'        : 'GB',
         'tooltipType'  : 'percentage'
       };

       $scope.dataVirtual = {
         'total': '250',
         'xData': dates,
         'yData': ['used', '90', '20', '30', '20', '20', '10', '14', '20', '25', '68', '44', '56', '78', '56', '67', '88', '76', '65', '87', '76']
       };

       $scope.configPhysical = {
         'chartId'      : 'physicalTrendsChart',
         'layout'       : 'inline',
         'trendLabel'   : 'Physical Disk I/O',
         'units'        : 'MHz',
         'tooltipType'  : 'percentage'
       };

       $scope.dataPhysical = {
         'total': '250',
         'xData': dates,
         'yData': ['used', '20', '20', '35', '20', '20', '87', '14', '20', '25', '28', '44', '56', '78', '56', '67', '88', '76', '65', '87', '16']
       };

       $scope.configMemory = {
         'chartId'      : 'memoryTrendsChart',
         'layout'       : 'inline',
         'trendLabel'   : 'Memory Utilization',
         'units'        : 'GB',
         'tooltipType'  : 'percentage'
       };

       $scope.dataMemory = {
         'total': '250',
         'xData': dates,
         'yData': ['used', '20', '20', '35', '70', '20', '87', '14', '95', '25', '28', '44', '56', '66', '16', '67', '88', '76', '65', '87', '56']
       };

       $scope.actionBarConfig = {
         'iconClass' : 'fa fa-plus-circle',
         'text'      : 'Add New Cluster',
         'callBackFn': function () {
            alert("Footer Callback Fn Called");
          }
       }

       $scope.title2      = 'Memory';
       $scope.units2      = 'GB';

       $scope.data2 = {
         'used': '25',
         'total': '100'
       };

       $scope.title3 = 'CPU Usage';
       $scope.units3 = 'MHz';

       $scope.data3 = {
         'used': '420',
         'total': '500',
       };

       $scope.title4 = 'Disk Usage';
       $scope.units4 = 'TB';
       $scope.data4 = {
         'used': '350',
         'total': '500',
       };

       $scope.title5 = 'Disk I/O';
       $scope.units5 = 'I/Ops';
       $scope.data5 = {
         'used': '450',
         'total': '500',
       };

       $scope.layoutInline = {
         'type': 'inline'
       };
     });
 </file>
 </example>
 */
angular.module('patternfly.card').directive('pfCard', function () {
  'use strict';

  return {
    restrict: 'A',
    transclude: true,
    templateUrl: 'card/basic/card.html',
    scope: {
      headTitle: '@',
      subTitle: '@?',
      showTopBorder: '@?',
      showTitlesSeparator: '@?',
      footer: '=?',
      filter: '=?'
    },
    controller: ["$scope", function ($scope) {
      if ($scope.filter && !$scope.currentFilter) {
        if ($scope.filter.defaultFilter) {
          $scope.currentFilter = $scope.filter.filters[$scope.filter.defaultFilter];
        } else {
          $scope.currentFilter = $scope.filter.filters[0];
        }
      }

      $scope.footerCallBackFn = function () {
        $scope.footerCallBackResult = $scope.footer.callBackFn();
      };

      $scope.filterCallBackFn = function (f) {
        $scope.currentFilter = f;
        if ($scope.filter.callBackFn) {
          $scope.filterCallBackResult = $scope.filter.callBackFn(f);
        }
      };

      $scope.showHeader = function () {
        return ($scope.headTitle || $scope.showFilterInHeader());
      };

      $scope.showFilterInHeader = function () {
        return ($scope.filter && $scope.filter.filters && $scope.filter.position && $scope.filter.position === 'header');
      };

      $scope.showFilterInFooter = function () {
        return ($scope.filter && $scope.filter.filters && (!$scope.filter.position || $scope.filter.position === 'footer'));
      };
    }],
    link: function (scope) {
      scope.shouldShowTitlesSeparator = (!scope.showTitlesSeparator || scope.showTitlesSeparator === 'true');
    }
  };
});
;(function () {
  'use strict';

  var patternflyDefaults = $().c3ChartDefaults();

  angular.module('patternfly.charts').constant('c3ChartDefaults', {
    getDefaultColors: patternflyDefaults.getDefaultColors,
    getDefaultDonut: patternflyDefaults.getDefaultDonut,
    getDefaultDonutSize: patternflyDefaults.getDefaultDonutSize,
    getDefaultDonutColor: patternflyDefaults.getDefaultDonutColors,
    getDefaultDonutLegend: patternflyDefaults.getDefaultDonutLegend,
    getDefaultDonutConfig: patternflyDefaults.getDefaultDonutConfig,
    getDefaultSparklineArea: patternflyDefaults.getDefaultSparklineArea,
    getDefaultSparklineSize: patternflyDefaults.getDefaultSparklineSize,
    getDefaultSparklineAxis: patternflyDefaults.getDefaultSparklineAxis,
    getDefaultSparklineColor: patternflyDefaults.getDefaultColors,
    getDefaultSparklineLegend: patternflyDefaults.getDefaultSparklineLegend,
    getDefaultSparklinePoint: patternflyDefaults.getDefaultSparklinePoint,
    getDefaultSparklineTooltip: patternflyDefaults.getDefaultSparklineTooltip,
    getDefaultSparklineConfig: patternflyDefaults.getDefaultSparklineConfig
  });
})();
;/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfC3Chart
 *
 * @description
 *   Directive for wrapping c3 library
 *
 *   Note: The 'patternfly.charts' module is not a dependency in the default angular 'patternfly' module.
 *   In order to use patternfly charts you must add 'patternfly.charts' as a dependency in your application.
 *
 *
 * @param {string} id the ID of the container that the chart should bind to
 * @param {expression} config the c3 configuration options for the chart
 * @param {function (chart))=} getChartCallback the callback user function to be called once the chart is generated, containing the c3 chart object
 *
 * @example

 <example module="patternfly.charts">
   <file name="index.html">
     <div ng-controller="ChartCtrl">
        <div pf-c3-chart id="chartId" config="chartConfig" get-chart-callback="getChart"></div>

        <form role="form" style="width:300px">
          Total = {{total}}, Used = {{used}}, Available = {{available}}
          <div class="form-group">
            <label>Used</label>
            <input type="text" class="form-control" ng-model="newUsed">
          </div>
          <input type="button" ng-click="submitform(newUsed)" value="Set Used" />
          <input type="button" ng-click="focusUsed()" value="Focus Used" />
        </form>
     </div>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.charts' ).controller( 'ChartCtrl', function( $scope ) {
       $scope.used = 950;
       $scope.total = 1000;
       $scope.available =  $scope.total - $scope.used;

       $scope.chartConfig = $().c3ChartDefaults().getDefaultDonutConfig('MHz Used');
       $scope.chartConfig.data = {
         type: "donut",
         columns: [
           ["Used", $scope.used],
           ["Available", $scope.total - $scope.used]
         ],
         groups: [
           ["used", "available"]
         ],
         order: null
       };

       $scope.getChart = function (chart) {
         $scope.chart = chart;
       }

       $scope.focusUsed = function () {
         $scope.chart.focus("Used");
       }

       $scope.updateAvailable = function (val) {
         $scope.available =  $scope.total - $scope.used;
       }

       $scope.submitform = function (val) {
         $scope.used = val;
         $scope.updateAvailable();
         $scope.chartConfig.data.columns = [["Used",$scope.used],["Available",$scope.available]];
       };
     });
   </file>
 </example>
 */
(function () {
  'use strict';

  angular.module('patternfly.charts').directive('pfC3Chart', ["$timeout", function ($timeout) {
    return {
      restrict: 'A',
      scope: {
        config: '=',
        getChartCallback: '='
      },
      template: '<div id=""></div>',
      replace: true,
      link: function (scope, element, attrs) {
        scope.$watch('config', function () {
          $timeout(function () {
            // store the chart object
            var chart;
            //generate c3 chart data
            var chartData = scope.config;
            chartData.bindto = '#' + attrs.id;
            chart = c3.generate(chartData);
            if (scope.getChartCallback) {
              scope.getChartCallback(chart);
            }
          });
        }, true);
      }
    };
  }]);
}());
;/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfDonutPctChart
 *
 * @description
 *   Directive for rendering a percentage used donut/radial chart.  The Used Percentage fill starts at 12 o’clock and
 *   moves clockwise.  Whatever portion of the donut not Used, will be represented as Available, and rendered as a
 *   gray fill.
 *   There are three possible fill colors for Used Percentage, dependent on whether or not there are thresholds:<br/>
 *   <ul>
 *   <li>When no thresholds exist, or if the used percentage has not surpassed any thresholds, the indicator is blue.
 *   <li>When the used percentage has surpassed the warning threshold, but not the error threshold, the indicator is orange.
 *   <li>When the used percentage has surpassed the error threshold, the indicator is is red.
 *   </ul>
 *   The directive will calculate the Available Percentage (Total - Used), and display it as a grey radial fill.
 *
 *   <br><br>
 *   See http://c3js.org/reference.html for a full list of C3 chart options.
 *
 * @param {object} config configuration properties for the donut chart:<br/>
 * <ul style='list-style-type: none'>
 * <li>.chartId        - the unique id of the donut chart
 * <li>.units          - unit label for values, ex: 'MHz','GB', etc..
 * <li>.thresholds     - warning and error percentage thresholds used to determine the Usage Percentage fill color (optional)
 * <li>.tooltipFn(d)   - user defined function to customize the tool tip (optional)
 * <li>.centerLabelFn  - user defined function to customize the text of the center label (optional)
 * <li>.onClickFn(d,i) - user defined function to handle when donut arc is clicked upon.
 * </ul>
 *
 * @param {object} data the Total and Used values for the donut chart.  Available is calculated as Total - Used.<br/>
 * <ul style='list-style-type: none'>
 * <li>.used   - number representing the amount used
 * <li>.total  - number representing the total amount
 * </ul>
 *
 * @param {string=} center-label specifies the contents of the donut's center label.<br/>
 * <strong>Values:</strong>
 * <ul style='list-style-type: none'>
 * <li> 'used'      - displays the Used amount in the center label (default)
 * <li> 'available' - displays the Available amount in the center label
 * <li> 'percent'   - displays the Usage Percent of the Total amount in the center label
 * <li> 'none'      - does not display the center label
 * </ul>
 * @example
 <example module="patternfly.charts">
   <file name="index.html">
     <div ng-controller="ChartCtrl">
       <div class="container-fluid">
         <div class="row">
           <div class="col-md-3 text-center">
             <label>Error Threshold</label>
             <div pf-donut-pct-chart config="configErr" data="dataErr"></div>
           </div>
           <div class="col-md-3 text-center"">
             <label>Warning Threshold</label>
             <div pf-donut-pct-chart config="configWarn" data="dataWarn"></div>
           </div>
           <div class="col-md-3 text-center"">
             <label>Ok</label>
             <div pf-donut-pct-chart config="configOk" data="dataOk"></div>
           </div>
           <div class="col-md-3 text-center"">
             <label>No Threshold</label>
             <div pf-donut-pct-chart config="configNoThresh" data="dataNoThresh"></div>
           </div>
         </div>

         <div class="row">
           <div class="col-md-12">
             <hr>
           </div>
         </div>

         <div class="row">
           <div class="col-md-3 text-center">
             <div pf-donut-pct-chart config="usedConfig" data="usedData" center-label="usedLabel"></div>
             <label>center-label = 'used'</label>
           </div>
           <div class="col-md-3 text-center">
             <div pf-donut-pct-chart config="availConfig" data="availData" center-label="availLabel"></div>
             <label>center-label = 'available'</label>
           </div>
           <div class="col-md-3 text-center">
             <div pf-donut-pct-chart config="pctConfig" data="pctData" center-label="pctLabel"></div>
             <label>center-label = 'percent'</label>
           </div>
           <div class="col-md-3 text-center">
             <div pf-donut-pct-chart config="noneConfig" data="noneData" center-label="noLabel"></div>
             <label>center-label = ' none'</label>
           </div>
         </div>

         <div class="row">
           <div class="col-md-12">
             <hr>
           </div>
         </div>

         <div class="row">
           <div class="col-md-12 text-center">
             <label>Custom Tooltip, Legend, Click handling, and Center Label</label><br>
             <label><strong>Click on Donut Arc!</strong></label>
             <div pf-donut-pct-chart config="custConfig" data="custData"></div>
           </div>
         </div>
       </div>
     </div>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.charts' ).controller( 'ChartCtrl', function( $scope ) {
       $scope.configErr = {
         'chartId': 'chartErr',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.dataErr = {
         'used': '950',
         'total': '1000'
       };

       $scope.configWarn = {
         'chartId': 'chartWarn',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.dataWarn = {
         'used': '650',
         'total': '1000'
       };

       $scope.configOk = {
         'chartId': 'chartOk',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.dataOk = {
         'used': '550',
         'total': '1000'
       };

       $scope.configNoThresh = {
         'chartId': 'chartNoThresh',
         'units': 'GB',
       };

       $scope.dataNoThresh = {
         'used': '750',
         'total': '1000'
       };

       $scope.usedConfig = {
         'chartId': 'usedChart',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.usedData = {
         'used': '350',
         'total': '1000'
       };

       $scope.usedLabel = "used";

       $scope.availConfig = {
         'chartId': 'availChart',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.availData = {
           'used': '350',
            'total': '1000'
        };

       $scope.availLabel = "available";

       $scope.pctConfig = {
         'chartId': 'pctChart',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.pctData = {
         'used': '350',
         'total': '1000'
       };

       $scope.pctLabel = "percent";

       $scope.noneConfig = {
         'chartId': 'noneChart',
         'units': 'GB',
         'thresholds':{'warning':'60','error':'90'}
       };

       $scope.noneData = {
         'used': '350',
         'total': '1000'
       };

       $scope.noLabel = "none";

       $scope.custConfig = {
         'chartId': 'custChart',
         'units': 'MHz',
         'thresholds':{'warning':'60','error':'90'},
         "legend":{"show":true},
         'tooltipFn': function (d) {
           return '<span class="donut-tooltip-pf"style="white-space: nowrap;">' +
                    d[0].value + ' ' + d[0].name +
                  '</span>';
           },
         'centerLabelFn': function () {
           return $scope.custData.available + " GB";
           },
         'onClickFn': function (d, i) {
           alert("You Clicked On The Donut!");
           }
         };

       $scope.custData = {
         'used': '670',
         'total': '1000'
       };
     });
   </file>
 </example>
 */
angular.module('patternfly.charts').directive('pfDonutPctChart', ["pfUtils", "$timeout", function (pfUtils, $timeout) {
  'use strict';

  return {
    restrict: 'A',
    scope: {
      config: '=',
      data: '=',
      centerLabel: '=?'
    },
    replace: true,
    templateUrl: 'charts/donut/donut-pct-chart.html',
    controller: ['$scope',
      function ($scope) {
        var donutTooltip;

        $scope.donutChartId = 'donutChart';
        if ($scope.config.chartId) {
          $scope.donutChartId = $scope.config.chartId + $scope.donutChartId;
        }

        $scope.updateAvailable = function () {
          $scope.data.available = $scope.data.total - $scope.data.used;
        };

        if ($scope.data.available === undefined) {
          $scope.updateAvailable();
        }

        $scope.getStatusColor = function (used, thresholds) {
          var color = '#0088CE';

          if (thresholds) {
            color = '#3f9c35';
            if (used >= thresholds.error) {
              color = '#CC0000';
            } else if (used >= thresholds.warning) {
              color = '#EC7A08';
            }
          }

          return color;
        };

        $scope.statusDonutColor = function (scope) {
          var color, percentUsed;

          color = { pattern: [] };
          percentUsed = scope.data.used / scope.data.total * 100.0;
          color.pattern[0] = $scope.getStatusColor(percentUsed, scope.config.thresholds);
          color.pattern[1] = '#D1D1D1';
          return color;
        };

        donutTooltip = function (scope) {
          return {
            contents: function (d) {
              var tooltipHtml;

              if (scope.config.tooltipFn) {
                tooltipHtml = '<span class="donut-tooltip-pf" style="white-space: nowrap;">' +
                                scope.config.tooltipFn(d) +
                             '</span>';
              } else {
                tooltipHtml = '<span class="donut-tooltip-pf" style="white-space: nowrap;">' +
                          Math.round(d[0].ratio * 100) + '%' + ' ' + $scope.config.units + ' ' + d[0].name +
                       '</span>';
              }

              return tooltipHtml;
            }
          };
        };

        $scope.getDonutData = function (scope) {
          return {
            columns: [
              ['Used', scope.data.used],
              ['Available', scope.data.available]
            ],
            type: 'donut',
            donut: {
              label: {
                show: false
              }
            },
            groups: [
              ['used', 'available']
            ],
            order: null
          };
        };

        $scope.getCenterLabelText = function () {
          var centerLabelText;

          // default to 'used' info.
          centerLabelText = { bigText: $scope.data.used,
                              smText:  $scope.config.units + ' Used' };

          if ($scope.config.centerLabelFn) {
            centerLabelText.bigText = $scope.config.centerLabelFn();
            centerLabelText.smText = '';
          } else if ($scope.centerLabel === 'none') {
            centerLabelText.bigText = '';
            centerLabelText.smText = '';
          } else if ($scope.centerLabel === 'available') {
            centerLabelText.bigText = $scope.data.available;
            centerLabelText.smText = $scope.config.units + ' Available';
          } else if ($scope.centerLabel === 'percent') {
            centerLabelText.bigText = Math.round($scope.data.used / $scope.data.total * 100.0) + '%';
            centerLabelText.smText = 'of ' + $scope.data.total + ' ' + $scope.config.units;
          }

          return centerLabelText;
        };

        $scope.updateAll = function (scope) {
          $scope.updateAvailable();
          $scope.config.data = pfUtils.merge($scope.getDonutData($scope), $scope.config.data);
          $scope.config.color = $scope.statusDonutColor($scope);
          $scope.config.tooltip = donutTooltip(scope);
          $scope.config.data.onclick = $scope.config.onClickFn;
        };

        $scope.config = pfUtils.merge($().c3ChartDefaults().getDefaultDonutConfig(), $scope.config);
        $scope.updateAll($scope);
      }
    ],
    link: function (scope, element) {
      var setupDonutChartTitle = function () {
        $timeout(function () {
          var donutChartTitle, centerLabelText;

          donutChartTitle = d3.select(element[0]).select('text.c3-chart-arcs-title');
          if (!donutChartTitle) {
            return;
          }

          centerLabelText = scope.getCenterLabelText();

          // Remove any existing title.
          donutChartTitle.selectAll('*').remove();
          if (centerLabelText.bigText && !centerLabelText.smText) {
            donutChartTitle.text(centerLabelText.bigText);
          } else {
            donutChartTitle.insert('tspan').text(centerLabelText.bigText).classed('donut-title-big-pf', true).attr('dy', 0).attr('x', 0);
            donutChartTitle.insert('tspan').text(centerLabelText.smText).classed('donut-title-small-pf', true).attr('dy', 20).attr('x', 0);
          }
        }, 300);
      };

      scope.$watch('config', function () {
        scope.updateAll(scope);
        setupDonutChartTitle();
      }, true);

      scope.$watch('data', function () {
        scope.updateAll(scope);
        setupDonutChartTitle();
      }, true);

      scope.$watch('centerLabel', function () {
        setupDonutChartTitle();
      });
    }
  };
}]);
;/**
 *
 * @description
 *   Directive for rendering an empty chart. This is used by chart directives when the data
 *   available flag is set to false.
 *
 * @param {string=} chartHeight height of the chart (no units) - default: 40
 */
angular.module('patternfly.charts').directive('pfEmptyChart', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      chartHeight: '=?'
    },
    replace: true,
    templateUrl: 'charts/empty-chart.html',
    controller: ["$scope", function ($scope) {
      $scope.setSizeStyles = function () {
        var height = $scope.chartHeight || 40;
        var topPadding = Math.min(Math.round((height - 40) / 2), 20);
        $scope.sizeStyles = {
          height: height + 'px',
          'padding-top': topPadding + 'px'
        };
      };
      $scope.setSizeStyles();
    }],
    link: function (scope) {
      scope.$watch('chartHeight', function () {
        scope.setSizeStyles();
      });
    }
  };
});
;angular.module('patternfly.charts').directive('pfHeatmapLegend',
  function () {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        legend: '=?',
        legendColors: '=?'
      },
      templateUrl: 'charts/heatmap/heatmap-legend.html',
      controller: ["$scope", function ($scope) {
        var heatmapColorPatternDefaults = ['#d4f0fa', '#F9D67A', '#EC7A08', '#CE0000'];
        var legendLabelDefaults = ['< 70%', '70-80%' ,'80-90%', '> 90%'];

        //Allow overriding of defaults
        if (!$scope.legendColors) {
          $scope.legendColors = heatmapColorPatternDefaults;
        }
        if (!$scope.legend) {
          $scope.legend = legendLabelDefaults;
        }
      }],
      link: function ($scope) {
        var items = [];
        var index;
        for (index = $scope.legend.length - 1; index >= 0; index--) {
          items.push({
            text: $scope.legend[index],
            color: $scope.legendColors[index]
          });
        }
        $scope.legendItems = items;
      }
    };
  }
);
;/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfHeatMap
 *
 * @description
 *   Directive for rendering a heatmap chart.
 *
 * @param {object} data data for the chart:<br/>
 * <ul style='list-style-type: none'>
 * <li>.id            - the id of the measurement
 * <li>.value         - the value of the measurement
 * <li>.tooltip       - message to be displayed on hover
 * </ul>
 *
 * @param {boolean=} chartDataAvailable flag if the chart data is available - default: true
 * @param {number=} height height of the chart (no units) - default: 200
 * @param {string=} chartTitle title of the chart
 * @param {boolean=} showLegend flag to show the legend, defaults to true
 * @param {array=} legendLabels the labels for the legend - defaults: ['< 70%', '70-80%' ,'80-90%', '> 90%']
 * @param {number=} maxBlockSize the maximum size for blocks in the heatmap. Default: 50, Range: 5 - 50
 * @param {number=} blockPadding the padding in pixels between blocks (default: 2)
 * @param {array=} thresholds the threshold values for the heapmap - defaults: [0.7, 0.8, 0.9]
 * @param {array=} heatmapColorPattern the colors that correspond to the various threshold values (lowest to hightest value ex: <70& to >90%) - defaults: ['#d4f0fa', '#F9D67A', '#EC7A08', '#CE0000']
 * @param {function=} clickAction function(block) function to call when a block is clicked on
 * @example
 <example module="patternfly.charts">
   <file name="index.html">
     <div ng-controller="ChartCtrl">
       <div class="row">
         <div class="col-md-5 example-heatmap-container">
           <div pf-heatmap id="id" chart-title="title" data="data" chart-data-available="dataAvailable"
                show-legend="showLegends"></div>
         </div>
         <div class="col-md-5 example-heatmap-container">
           <div pf-heatmap id="id" chart-title="titleAlt" data="data" chart-data-available="dataAvailable"
                show-legend="showLegends" legend-labels="legendLabels"  max-block-size="20" block-padding="5"
                heatmap-color-pattern="heatmapColorPattern" thresholds="thresholds"
                click-action="clickAction"></div>
         </div>
       </div>
       <div class="row">
         <div class="col-md-3">
           <form role="form">
             <div class="form-group">
               <label class="checkbox-inline">
                 <input type="checkbox" ng-model="dataAvailable">Data Available</input>
               </label>
             </div>
           </form>
         </div>
         <div class="col-md-3">
           <form role="form">
             <div class="form-group">
               <label class="checkbox-inline">
                 <input type="checkbox" ng-model="showLegends">Show Legends</input>
               </label>
             </div>
           </form>
         </div>
       </div>
     </div>
   </file>
   <file name="script.js">
     angular.module( 'patternfly.charts' ).controller( 'ChartCtrl', function( $scope) {
       $scope.data = [
       {'id': 9,'value': 0.96,'tooltip': 'Node 8 : My OpenShift Provider<br\>96% : 96 Used of 100 Total<br\>4 Available'},
       {'id': 44, 'value': 0.94, 'tooltip': 'Node 19 : My Kubernetes Provider<br\>94% : 94 Used of 100 Total<br\>6 Available'},
       {'id': 0, 'value': 0.91, 'tooltip': 'Node 9 : My OpenShift Provider<br\>91% : 91 Used of 100 Total<br\>9 Available'},
       {'id': 43, 'value': 0.9, 'tooltip': 'Node 18 : My Kubernetes Provider<br\>90% : 90 Used of 100 Total<br\>10 Available'},
       {'id': 7, 'value': 0.89, 'tooltip': 'Node 12 : My OpenShift Provider<br\>89% : 89 Used of 100 Total<br\>11 Available'},
       {'id': 41, 'value': 0.82, 'tooltip': 'Node 16 : My Kubernetes Provider<br\>82% : 82 Used of 100 Total<br\>18 Available'},
       {'id': 21, 'value': 0.81, 'tooltip': 'Node 21 : My OpenShift Provider<br\>81% : 81 Used of 100 Total<br\>19 Available'},
       {'id': 26, 'value': 0.8, 'tooltip': 'Node 1 : My Kubernetes Provider<br\>80% : 80 Used of 100 Total<br\>20 Available'},
       {'id': 48, 'value': 0.74, 'tooltip': 'Node 23 : My Kubernetes Provider<br\>74% : 74 Used of 100 Total<br\>26 Available'},
       {'id': 27, 'value': 0.72, 'tooltip': 'Node 2 : My Kubernetes Provider<br\>72% : 72 Used of 100 Total<br\>28 Available'},
       {'id': 42, 'value': 0.71, 'tooltip': 'Node 17 : My Kubernetes Provider<br\>71% : 71 Used of 100 Total<br\>29 Available'},
       {'id': 23, 'value': 0.71, 'tooltip': 'Node 23 : My OpenShift Provider<br\>71% : 71 Used of 100 Total<br\>29 Available'},
       {'id': 22, 'value': 0.69, 'tooltip': 'Node 22 : My OpenShift Provider<br\>69% : 69 Used of 100 Total<br\>31 Available'},
       {'id': 2, 'value': 0.66, 'tooltip': 'Node 2 : M8y OpenShift Provider<br\>66% : 66 Used of 100 Total<br\>34 Available'},
       {'id': 39, 'value': 0.66, 'tooltip': 'Node 14 : My Kubernetes Provider<br\>66% : 66 Used of 100 Total<br\>34 Available'},
       {'id': 3, 'value': 0.65, 'tooltip': 'Node 39 : My OpenShift Provider<br\>65% : 65 Used of 100 Total<br\>35 Available'},
       {'id': 29, 'value': 0.65, 'tooltip': 'Node 4 : My Kubernetes Provider<br\>65% : 65 Used of 100 Total<br\>35 Available'},
       {'id': 32, 'value': 0.56, 'tooltip': 'Node 7 : My Kubernetes Provider<br\>56% : 56 Used of 100 Total<br\>44 Available'},
       {'id': 13, 'value': 0.56, 'tooltip': 'Node 13 : My OpenShift Provider<br\>56% : 56 Used of 100 Total<br\>44 Available'},
       {'id': 49, 'value': 0.52, 'tooltip': 'Node 24 : My Kubernetes Provider<br\>52% : 52 Used of 100 Total<br\>48 Available'},
       {'id': 36, 'value': 0.5, 'tooltip': 'Node 11 : My Kubernetes Provider<br\>50% : 50 Used of 100 Total<br\>50 Available'},
       {'id': 6, 'value': 0.5, 'tooltip': 'Node 5 : My OpenShift Provider<br\>50% : 50 Used of 100 Total<br\>50 Available'},
       {'id': 38, 'value': 0.49, 'tooltip': 'Node 13 : My Kubernetes Provider<br\>49% : 49 Used of 100 Total<br\>51 Available'},
       {'id': 15, 'value': 0.48, 'tooltip': 'Node 15 : My OpenShift Provider<br\>48% : 48 Used of 100 Total<br\>52 Available'},
       {'id': 30, 'value': 0.48, 'tooltip': 'Node 5 : My Kubernetes Provider<br\>48% : 48 Used of 100 Total<br\>52 Available'},
       {'id': 11, 'value': 0.47, 'tooltip': 'Node 11 : My OpenShift Provider<br\>47% : 47 Used of 100 Total<br\>53 Available'},
       {'id': 17, 'value': 0.46, 'tooltip': 'Node 17 : My OpenShift Provider<br\>46% : 46 Used of 100 Total<br\>54 Available'},
       {'id': 25, 'value': 0.45, 'tooltip': 'Node 0 : My Kubernetes Provider<br\>45% : 45 Used of 100 Total<br\>55 Available'},
       {'id': 50, 'value': 0.45, 'tooltip': 'Node 25 : My Kubernetes Provider<br\>45% : 45 Used of 100 Total<br\>55 Available'},
       {'id': 46, 'value': 0.45, 'tooltip': 'Node 21 : My Kubernetes Provider<br\>45% : 45 Used of 100 Total<br\>55 Available'},
       {'id': 47, 'value': 0.45, 'tooltip': 'Node 22 : My Kubernetes Provider<br\>45% : 45 Used of 100 Total<br\>55 Available'},
       {'id': 1, 'value': 0.44, 'tooltip': 'Node 1 : My OpenShift Provider<br\>44% : 44 Used of 100 Total<br\>56 Available'},
       {'id': 31, 'value': 0.44, 'tooltip': 'Node 6 : My Kubernetes Provider<br\>44% : 44 Used of 100 Total<br\>56 Available'},
       {'id': 37, 'value': 0.44, 'tooltip': 'Node 12 : My Kubernetes Provider<br\>44% : 44 Used of 100 Total<br\>56 Available'},
       {'id': 24, 'value': 0.44, 'tooltip': 'Node 24 : My OpenShift Provider<br\>44% : 44 Used of 100 Total<br\>56 Available'},
       {'id': 40, 'value': 0.43, 'tooltip': 'Node 40 : My Kubernetes Provider<br\>43% : 43 Used of 100 Total<br\>57 Available'},
       {'id': 20, 'value': 0.39, 'tooltip': 'Node 20 : My OpenShift Provider<br\>39% : 39 Used of 100 Total<br\>61 Available'},
       {'id': 8, 'value': 0.39, 'tooltip': 'Node 8 : My OpenShift Provider<br\>39% : 39 Used of 100 Total<br\>61 Available'},
       {'id': 5, 'value': 0.38, 'tooltip': 'Node 5 : My OpenShift Provider<br\>38% : 38 Used of 100 Total<br\>62 Available'},
       {'id': 45, 'value': 0.37, 'tooltip': 'Node 20 : My Kubernetes Provider<br\>37% : 37 Used of 100 Total<br\>63 Available'},
       {'id': 12, 'value': 0.37, 'tooltip': 'Node 12 : My OpenShift Provider<br\>37% : 37 Used of 100 Total<br\>63 Available'},
       {'id': 34, 'value': 0.37, 'tooltip': 'Node 9 : My Kubernetes Provider<br\>37% : 37 Used of 100 Total<br\>63 Available'},
       {'id': 33, 'value': 0.33, 'tooltip': 'Node 8 : My Kubernetes Provider<br\>33% : 33 Used of 100 Total<br\>67 Available'},
       {'id': 16, 'value': 0.32, 'tooltip': 'Node 16 : My OpenShift Provider<br\>32% : 32 Used of 100 Total<br\>68 Available'},
       {'id': 10, 'value': 0.29, 'tooltip': 'Node 10 : My OpenShift Provider<br\>28% : 29 Used of 100 Total<br\>71 Available'},
       {'id': 35, 'value': 0.28, 'tooltip': 'Node 35 : My Kubernetes Provider<br\>28% : 28 Used of 100 Total<br\>72 Available'},
       {'id': 18, 'value': 0.27, 'tooltip': 'Node 18 : My OpenShift Provider<br\>27% : 27 Used of 100 Total<br\>73 Available'},
       {'id': 4, 'value': 0.26, 'tooltip': 'Node 4 : My OpenShift Provider<br\>26% : 26 Used of 100 Total<br\>74 Available'},
       {'id': 19, 'value': 0.25, 'tooltip': 'Node 19 : My OpenShift Provider<br\>25% : 25 Used of 100 Total<br\>75 Available'},
       {'id': 28, 'value': 0.25, 'tooltip': 'Node 3 : My Kubernetes Provider<br\>25% : 25 Used of 100 Total<br\>75 Available'},
       {'id': 51, 'value': 0.22, 'tooltip': 'Node 26 : My Kubernetes Provider<br\>22% : 22 Used of 100 Total<br\>78 Available'},
       {'id': 14, 'value': 0.2, 'tooltip': 'Node 14 : My OpenShift Provider<br\>20% : 20 Used of 100 Total<br\>80 Available'}];

       $scope.dataAvailable = true;
       $scope.title = 'Utilization - Using Defaults';
       $scope.titleAlt = 'Utilization - Overriding Defaults';
       $scope.legendLabels = ['< 60%','70%', '70-80%' ,'80-90%', '> 90%'];
       $scope.thresholds = [0.6, 0.7, 0.8, 0.9];
       $scope.heatmapColorPattern = ['#d4f0fa', '#F9D67A', '#EC7A08', '#CE0000', '#f00'];

       $scope.showLegends = true;
       var clickAction = function (block) {
          console.log(block);
       };
       $scope.clickAction = clickAction;
     });
   </file>
 </example>
 */
angular.module('patternfly.charts').directive('pfHeatmap', ["$compile", function ($compile) {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      data: '=',
      chartDataAvailable: '=?',
      height: '=?',
      chartTitle: '=?',
      showLegend: '=?',
      legendLabels: '=?',
      maxBlockSize: '@',
      blockPadding: '@',
      thresholds: '=?',
      heatmapColorPattern: '=?',
      clickAction: '=?'
    },
    templateUrl: 'charts/heatmap/heatmap.html',
    controller: ["$scope", function ($scope) {
      var thresholdDefaults = [0.7, 0.8, 0.9];
      var heatmapColorPatternDefaults = ['#d4f0fa', '#F9D67A', '#EC7A08', '#CE0000'];
      var legendLabelDefaults = ['< 70%', '70-80%' ,'80-90%', '> 90%'];
      var heightDefault = 200;

      //Allow overriding of defaults
      if ($scope.maxBlockSize === undefined || isNaN($scope.maxBlockSize)) {
        $scope.maxSize = 64;
      } else {
        $scope.maxSize = parseInt($scope.maxBlockSize);
        if ($scope.maxSize < 5) {
          $scope.maxSize = 5;
        } else if ($scope.maxSize > 50) {
          $scope.maxSize = 50;
        }
      }

      if ($scope.blockPadding === undefined || isNaN($scope.blockPadding)) {
        $scope.padding = 2;
      } else {
        $scope.padding = parseInt($scope.blockPadding);
      }

      if (!$scope.thresholds) {
        $scope.thresholds = thresholdDefaults;
      }

      if (!$scope.heatmapColorPattern) {
        $scope.heatmapColorPattern = heatmapColorPatternDefaults;
      }

      if (!$scope.legendLabels) {
        $scope.legendLabels = legendLabelDefaults;
      }
      $scope.height = $scope.height || heightDefault;
      $scope.showLegend = $scope.showLegend || ($scope.showLegend === undefined);
      $scope.loadingDone = false;
    }],
    link: function (scope, element, attrs) {
      var thisComponent = element[0].querySelector('.heatmap-pf-svg');
      var containerWidth, containerHeight, blockSize, numberOfRows;

      var setStyles = function () {
        scope.containerStyles = {
          height: scope.height + 'px',
          display: scope.chartDataAvailable === false ? 'none' : 'block'
        };
      };

      var setSizes = function () {
        var parentContainer = element[0].querySelector('.heatmap-container');
        containerWidth = parentContainer.clientWidth;
        containerHeight = parentContainer.clientHeight;
        blockSize = determineBlockSize();

        if ((blockSize - scope.padding) > scope.maxSize) {
          blockSize = scope.padding + scope.maxSize;

          // Attempt to square off the area, check if square fits
          numberOfRows = Math.ceil(Math.sqrt(scope.data.length));
          if (blockSize * numberOfRows > containerWidth ||
              blockSize * numberOfRows > containerHeight) {
            numberOfRows = (blockSize === 0) ? 0 : Math.floor(containerHeight / blockSize);
          }

        } else {
          numberOfRows = (blockSize === 0) ? 0 : Math.floor(containerHeight / blockSize);
        }
      };

      var determineBlockSize = function () {
        var x = containerWidth;
        var y = containerHeight;
        var n = scope.data ? scope.data.length : 0;
        var px = Math.ceil(Math.sqrt(n * x / y));
        var py = Math.ceil(Math.sqrt(n * y / x));
        var sx, sy;

        if (Math.floor(px * y / x) * px < n) {
          sx = y / Math.ceil(px * y / x);
        } else {
          sx = x / px;
        }

        if (Math.floor(py * x / y) * py < n) {
          sy = x / Math.ceil(x * py / y);
        } else {
          sy = y / py;
        }
        return Math.max(sx, sy);
      };

      var redraw = function () {
        var data = scope.data;
        var color = d3.scale.threshold().domain(scope.thresholds).range(scope.heatmapColorPattern);
        var blocks;
        var fillSize = blockSize - scope.padding;
        var highlightBlock = function (block, active) {
          block.style('fill-opacity', active ? 1 : 0.4);
        };
        var svg = window.d3.select(thisComponent);
        svg.selectAll('*').remove();

        blocks = svg.selectAll('rect').data(data).enter().append('rect');
        blocks.attr('x', function (d, i) {
          return Math.floor(i / numberOfRows) * blockSize;
        }).attr('y', function (d, i) {
          return i % numberOfRows * blockSize;
        }).attr('width', fillSize).attr('height', fillSize).style('fill', function (d) {
          return color(d.value);
        }).attr('tooltip-html-unsafe', function (d, i) { //tooltip-html is throwing an exception
          return d.tooltip;
        }).attr('tooltip-append-to-body', function (d, i) {
          return true;
        }).attr('tooltip-animation', function (d, i) {
          return false;
        });

        //Adding events
        blocks.on('mouseover', function () {
          blocks.call(highlightBlock, false);
          d3.select(this).call(highlightBlock, true);
        });
        blocks.on('click', function (d) {
          if (scope.clickAction) {
            scope.clickAction(d);
          }
        });

        //Compiles the tooltips
        angular.forEach(angular.element(blocks), function (block) {
          var el = angular.element(block);
          $compile(el)(scope);
        });

        svg.on('mouseleave', function () {
          blocks.call(highlightBlock, true);
        });
      };

      scope.$watch('data', function (newVal, oldVal) {
        if (typeof(newVal) !== 'undefined') {
          scope.loadingDone = true;
          setStyles();
          if (scope.chartDataAvailable !== false) {
            setSizes();
            redraw();
          }
        }
      });
      scope.$watch('chartDataAvailable', function () {
        if (scope.chartDataAvailable === false) {
          scope.loadingDone = true;
        }
        setStyles();
      });
    }
  };
}]);
;/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfSparklineChart
 *
 * @description
 *   Directive for rendering a sparkline chart.
 *   <br><br>
 *   See http://c3js.org/reference.html for a full list of C3 chart options.
 *
 * @param {object} config configuration settings for the sparkline chart:<br/>
 * <ul style='list-style-type: none'>
 * <li>.chartId            - the ID of the container that the chart should bind to
 * <li>.units              - unit label for values, ex: 'MHz','GB', etc..
 * <li>.tooltipType        - (optional) set the type of tooltip, valid values:
 * <ul style='list-style-type: none'>
 * <li>'default'           - show the data point value and the data point name.
 * <li>'usagePerDay'       - show the date, percent used, and used value for the data point.
 * <li>'valuePerDay'       - show the date and value for the data point.
 * <li>'percentage'        - show the current data point as a percentage.
 * </ul>
 * <li>.tooltipFn          - (optional) override the tooltip contents generation functions. Should take a data point and
 *                           return HTML markup for the tooltip contents. Setting this overrides the tooltipType value.
 * <li>.area               - (optional) overrides the default Area properties of the C3 chart
 * <li>.size               - (optional) overrides the default Size properties of the C3 chart
 * <li>.axis               - (optional) overrides the default Axis properties of the C3 chart
 * <li>.color              - (optional) overrides the default Color properties of the C3 chart
 * <li>.legend             - (optional) overrides the default Legend properties of the C3 chart
 * <li>.point              - (optional) overrides the default Point properties of the C3 chart
 * </ul>
 *
 * @param {object} chartData the data to be shown as an area chart<br/>
 * <ul style='list-style-type: none'>
 * <li>.xData      - Array, X values for the data points, first element must be the name of the data
 * <li>.yData      - Array, Y Values for the data points, first element must be the name of the data
 * <li>.total      - (optional) The Total amount, used when determining percentages
 * </ul>
 *
 * @param {int=} chartHeight   height of the sparkline chart
 * @param {boolean=} showXAxis override config settings for showing the X Axis
 * @param {boolean=} showYAxis override config settings for showing the Y Axis

 * @example
 <example module="patternfly.charts">
   <file name="index.html">
     <div ng-controller="ChartCtrl" class="row" style="display:inline-block; width: 100%;">
       <div class="col-md-12">
         <div pf-sparkline-chart config="config" chart-data="data" chart-height="custChartHeight" show-x-axis="custShowXAxis" show-y-axis="custShowYAxis"></div>
       </div>
       <hr class="col-md-12">
       <div class="col-md-12">
         <form role="form">
           <div class="form-group">
             <label>Tooltip Type</label>
             </br>
             <label class="radio-inline">
               <input type="radio" ng-model="config.tooltipType" value="default">Default</input>
             </label>
             <label class="radio-inline">
               <input type="radio" ng-model="config.tooltipType" value="usagePerDay">Usage Per Day</input>
             </label>
             <label class="radio-inline">
               <input type="radio" ng-model="config.tooltipType" value="valuePerDay">Value Per Day</input>
             </label>
             <label class="radio-inline">
               <input type="radio" ng-model="config.tooltipType" value="percentage">Percentage</input>
             </label>
           </div>
         </form>
         <div class="row">
           <div class="col-md-6">
             <form role="form"">
               <div class="form-group">
                 <label>Show</label>
                 </br>
                 <label class="checkbox-inline">
                   <input type="checkbox" ng-model="custShowXAxis">X Axis</input>
                 </label>
                 <label class="checkbox-inline">
                   <input type="checkbox" ng-model="custShowYAxis">Y Axis</input>
                 </label>
               </div>
             </form>
           </div>
           <div class="col-md-3">
             <form role="form" >
               <div class="form-group">
                 <label>Chart Height</label>
                 </br>
                 <input style="height:25px; width:60px;" type="number" ng-model="custChartHeight"></input>
               </div>
             </form>
           </div>
           <div class="col-md-3">
                 <button ng-click="addDataPoint()">Add Data Point</button>
           </div>
         </div>
       </div>
     </div>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.charts' ).controller( 'ChartCtrl', function( $scope ) {

       $scope.config = {
         chartId: 'exampleSparkline',
         tooltipType: 'default'
       };

       var today = new Date();
       var dates = ['dates'];
       for (var d = 20 - 1; d >= 0; d--) {
         dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
       }

       $scope.data = {
         total: 100,
         xData: dates,
         yData: ['used', 10, 20, 30, 20, 30, 10, 14, 20, 25, 68, 54, 56, 78, 56, 67, 88, 76, 65, 87, 76]
       };

       $scope.custShowXAxis = false;
       $scope.custShowYAxis = false;
       $scope.custChartHeight = 60;

       $scope.addDataPoint = function () {
         $scope.data.xData.push(new Date($scope.data.xData[$scope.data.xData.length - 1].getTime() + (24 * 60 * 60 * 1000)));
         $scope.data.yData.push(Math.round(Math.random() * 100));
       };
     });
   </file>
 </example>
 */
angular.module('patternfly.charts').directive('pfSparklineChart', ["pfUtils", function (pfUtils) {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      config: '=',
      chartData: '=',
      chartHeight: '=?',
      showXAxis: '=?',
      showYAxis: '=?'
    },
    replace: true,
    templateUrl: 'charts/sparkline/sparkline-chart.html',
    controller: ['$scope',
      function ($scope) {

        // Create an ID for the chart based on the chartId in the config if given
        $scope.sparklineChartId = 'sparklineChart';
        if ($scope.config.chartId) {
          $scope.sparklineChartId = $scope.config.chartId + $scope.sparklineChartId;
        }

        /*
         * Convert the config data to C3 Data
         */
        $scope.getSparklineData = function (chartData) {
          var sparklineData  = {
            type: 'area'
          };

          if (chartData && chartData.dataAvailable !== false && chartData.xData && chartData.yData) {
            sparklineData.x = chartData.xData[0];
            sparklineData.columns = [
              chartData.xData,
              chartData.yData
            ];
          }

          return sparklineData;
        };

        $scope.getTooltipTableHTML = function (tipRows) {
          return '<div class="module-triangle-bottom">' +
            '  <table class="c3-tooltip">' +
            '    <tbody>' +
            tipRows +
            '    </tbody>' +
            '  </table>' +
            '</div>';
        };

        $scope.sparklineTooltip = function () {
          return {
            contents: function (d) {
              var tipRows;
              var percentUsed = 0;

              if ($scope.config.tooltipFn) {
                tipRows = $scope.config.tooltipFn(d);
              } else {
                switch ($scope.config.tooltipType) {
                case 'usagePerDay':
                  if ($scope.chartData.dataAvailable !== false && $scope.chartData.total > 0) {
                    percentUsed = Math.round(d[0].value / $scope.chartData.total * 100.0);
                  }
                  tipRows =
                    '<tr>' +
                    '  <th colspan="2">' + d[0].x.toLocaleDateString() + '</th>' +
                    '</tr>' +
                    '<tr>' +
                    '  <td class="name">' + percentUsed + '%:' + '</td>' +
                    '  <td class="value text-nowrap">' + d[0].value + ' ' +  ($scope.config.units ? $scope.config.units + ' ' : '') + d[0].name + '</td>' +
                    '</tr>';
                  break;
                case 'valuePerDay':
                  tipRows =
                    '<tr>' +
                    '  <td class="value">' +  d[0].x.toLocaleDateString() + '</td>' +
                    '  <td class="value text-nowrap">' +  d[0].value + ' ' + d[0].name + '</td>' +
                    '</tr>';
                  break;
                case 'percentage':
                  percentUsed = Math.round(d[0].value / $scope.chartData.total * 100.0);
                  tipRows =
                    '<tr>' +
                    '  <td class="name">' + percentUsed + '%' + '</td>' +
                    '</tr>';
                  break;
                default:
                  tipRows = $().c3ChartDefaults().getDefaultSparklineTooltip().contents(d);
                }
              }
              return $scope.getTooltipTableHTML(tipRows);
            },
            position: function (data, width, height, element) {
              var center;
              var top;
              var chartBox;
              var graphOffsetX;
              var x;

              try {
                center = parseInt(element.getAttribute('x'));
                top = parseInt(element.getAttribute('y'));
                chartBox = document.querySelector('#' + $scope.sparklineChartId).getBoundingClientRect();
                graphOffsetX = document.querySelector('#' + $scope.sparklineChartId + ' g.c3-axis-y').getBoundingClientRect().right;
                x = Math.max(0, center + graphOffsetX - chartBox.left - Math.floor(width / 2));

                return {
                  top: top - height,
                  left: Math.min(x, chartBox.width - width)
                };
              } catch (e) {
              }
            }
          };
        };

        /*
         * Setup Axis options. Default is to not show either axis. This can be overridden in two ways:
         *   1) in the config, setting showAxis to true will show both axes
         *   2) in the attributes showXAxis and showYAxis will override the config if set
         *
         * By default only line and the tick marks are shown, no labels. This is a sparkline and should be used
         * only to show a brief idea of trending. This can be overridden by setting the config.axis options per C3
         */

        if ($scope.showXAxis === undefined) {
          $scope.showXAxis = ($scope.config.showAxis !== undefined) && $scope.config.showAxis;
        }

        if ($scope.showYAxis === undefined) {
          $scope.showYAxis = ($scope.config.showAxis !== undefined) && $scope.config.showAxis;
        }

        $scope.defaultConfig = $().c3ChartDefaults().getDefaultSparklineConfig();
        $scope.defaultConfig.axis = {
          x: {
            show: $scope.showXAxis === true,
            type: 'timeseries',
            tick: {
              format: function () {
                return '';
              }
            }
          },
          y: {
            show: $scope.showYAxis === true,
            tick: {
              format: function () {
                return '';
              }
            }
          }
        };

        // Setup the default configuration
        $scope.defaultConfig.tooltip = $scope.sparklineTooltip();
        if ($scope.chartHeight) {
          $scope.defaultConfig.size.height = $scope.chartHeight;
        }
        $scope.defaultConfig.units = '';

        // Convert the given data to C3 chart format
        $scope.config.data = pfUtils.merge($scope.config.data, $scope.getSparklineData($scope.chartData));

        // Override defaults with callers specifications
        $scope.chartConfig = pfUtils.merge($scope.config, $scope.defaultConfig);
      }
    ],

    link: function (scope) {
      scope.$watch('config', function () {
        scope.config.data = pfUtils.merge(scope.config.data, scope.getSparklineData(scope.chartData));
        scope.chartConfig = pfUtils.merge(scope.config, scope.defaultConfig);
      }, true);
      scope.$watch('chartHeight', function () {
        if (scope.chartHeight) {
          scope.chartConfig.size.height = scope.chartHeight;
        }
      });
      scope.$watch('showXAxis', function () {
        scope.chartConfig.axis.x.show = scope.showXAxis === true;
      });
      scope.$watch('showYAxis', function () {
        scope.chartConfig.axis.y.show = scope.showYAxis === true;
      });
      scope.$watch('chartData', function () {
        scope.chartConfig.data = pfUtils.merge(scope.chartConfig.data, scope.getSparklineData(scope.chartData));
      }, true);
    }
  };
}]
);
;/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfTrendsChart
 *
 * @description
 *   Directive for rendering a trend chart. The trend chart combines overall data with a
 *   pfSparklineChart.
 *   <br><br>
 *   See http://c3js.org/reference.html for a full list of C3 chart options.<br>
 *   See also: {@link patternfly.charts.directive:pfSparklineChart}
 *
 * @param {object} config configuration settings for the trends chart:<br/>
 * <ul style='list-style-type: none'>
 * <li>.chartId    - the unique id of this trends chart
 * <li>.title      - (optional) title of the Trends chart
 * <li>.layout     - (optional) the layout and sizes of titles and chart. Values are 'large' (default), 'small', 'compact', and 'inline'
 * <li>.trendLabel - (optional) the trend label used in the 'inline' layout
 * <li>.timeFrame  - (optional) the time frame for the data in the pfSparklineChart, ex: 'Last 30 Days'
 * <li>.units      - unit label for values, ex: 'MHz','GB', etc..
 * <li>.valueType  - (optional) the format of the latest data point which is shown in the title. Values are 'actual'(default) or 'percentage'
 * </ul>
 *
 * @param {object} chartData the data to be shown in the sparkline charts<br/>
 * <ul style='list-style-type: none'>
 * <li>.total  - number representing the total amount
 * <li>.xData  - Array, X values for the data points, first element must be the name of the data
 * <li>.yData  - Array, Y Values for the data points, first element must be the name of the data
 * <li>.dataAvailable - Flag if there is data available - default: true
 * </ul>
 *
 * @param {int=} chartHeight   height of the sparkline chart
 * @param {boolean=} showXAxis override sparkline config settings for showing the X Axis
 * @param {boolean=} showYAxis override sparkline config settings for showing the Y Axis
 * @example
 <example module="demo">
 <file name="index.html">
   <div ng-controller="ChartCtrl" class="row" style="display:inline-block; width: 100%;">
     <div class="col-md-12">
       <div pf-trends-chart config="config" chart-data="data"
            show-x-axis="custShowXAxis" show-y-axis="custShowYAxis"></div>
     </div>
     <hr class="col-md-12">
     <div class="col-md-12">
       <div class="row">
         <div class="col-md-4">
           <form role="form"">
             <div class="form-group">
               <label>Show</label></br>
               <label class="checkbox-inline">
                 <input type="checkbox" ng-model="custShowXAxis">X Axis</input>
               </label>
               <label class="checkbox-inline">
                 <input type="checkbox" ng-model="custShowYAxis">Y Axis</input>
               </label>
             </div>
           </form>
         </div>
         <div class="col-md-3">
           <form role="form" >
             <div class="form-group">
               <label>Layout</label></br>
               <select pf-select class="pf-select-sm" ng-model="layout" id="layout">
                 <option value="large" ng-selected="true" selected>Large</option>
                 <option value="small">Small</option>
                 <option value="compact">Compact</option>
                 <option value="inline">Inline</option>
               </select>
             </div>
           </form>
         </div>
         <div class="col-md-3">
           <form role="form" ng-hide="layout == 'inline'">
             <div class="form-group">
               <label>Title Value Type</label></br>
               <select pf-select class="pf-select-sm" ng-model="valueType" id="valueType">
                 <option value="actual" ng-selected="true" selected>Actual</option>
                 <option value="percentage">Percentage</option>
               </select>
             </div>
           </form>
         </div>
         <div class="col-md-2">
           <button ng-click="addDataPoint()">Add Data Point</button>
         </div>
       </div>
       <div class="row">
         <div class="col-md-6">
           <form role="form"">
             <div class="form-group">
               <label class="checkbox-inline">
                 <input type="checkbox" ng-model="data.dataAvailable">Data Available</input>
               </label>
             </div>
           </form>
         </div>
       </div>
     </div>
   </div>
 </file>
 <file name="script.js">
 angular.module( 'demo', ['patternfly.charts', 'patternfly.card'] ).controller( 'ChartCtrl', function( $scope ) {

       $scope.config = {
         chartId      : 'exampleTrendsChart',
         title        : 'Network Utilization Trends',
         layout       : 'large',
         trendLabel   : 'Virtual Disk I/O',
         valueType    : 'actual',
         timeFrame    : 'Last 15 Minutes',
         units        : 'MHz',
         tooltipType  : 'percentage'
       };

       $scope.footerConfig = {
         iconClass : 'fa fa-plus-circle',
         text      : 'Add New Cluster',
         callBackFn: function () {
            alert("Footer Callback Fn Called");
          }
       }

       $scope.filterConfig = {
         filters : [{label:'Last 30 Days', value:'30'},
                      {label:'Last 15 Days', value:'15'},
                      {label:'Today', value:'today'}],
         callBackFn: function (f) {
            alert("Filter Callback Fn Called for '" + f.label + "' value = " + f.value);
          }
       }

      var today = new Date();
      var dates = ['dates'];
      for (var d = 20 - 1; d >= 0; d--) {
          dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
      }

       $scope.data = {
           dataAvailable: true,
           total: 250,
           xData: dates,
           yData: ['used', 10, 20, 30, 20, 30, 10, 14, 20, 25, 68, 54, 56, 78, 56, 67, 88, 76, 65, 87, 76]
       };

       $scope.custShowXAxis = false;
       $scope.custShowYAxis = false;

       $scope.addDataPoint = function () {
         $scope.data.xData.push(new Date($scope.data.xData[$scope.data.xData.length - 1].getTime() + (24 * 60 * 60 * 1000)));
         $scope.data.yData.push(Math.round(Math.random() * 100));
       };

       $scope.$watch('valueType', function (newValue) {
         $scope.config.valueType = newValue;
       });

       $scope.$watch('layout', function (newValue) {
         $scope.config.layout = newValue;
       });

     });
 </file>
 </example>
 */
angular.module('patternfly.charts').directive('pfTrendsChart', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      config: '=',
      chartData: '=',
      chartHeight: '=?',
      showXAxis: '=?',
      showYAxis: '=?'
    },
    replace: true,
    templateUrl: 'charts/trends/trends-chart.html',
    controller: ["$scope", function ($scope) {
      var SMALL = 30, LARGE = 60;

      $scope.getPercentageValue = function () {
        var pctValue = 0;

        if ($scope.chartData.dataAvailable !== false && $scope.chartData.total > 0) {
          pctValue = Math.round($scope.getLatestValue() / $scope.chartData.total * 100.0);
        }
        return pctValue;
      };
      $scope.getLatestValue = function () {
        var latestValue = 0;
        if ($scope.chartData.yData && $scope.chartData.yData.length > 0) {
          latestValue = $scope.chartData.yData[$scope.chartData.yData.length - 1];
        }
        return latestValue;
      };
      $scope.getChartHeight = function () {
        var retValue = LARGE;
        if ($scope.chartHeight) {
          retValue = $scope.chartHeight;
        } else if ($scope.config.layout === 'small') {
          retValue = SMALL;
        }
        return retValue;
      };
    }],
    link: function (scope) {
      scope.$watch('config', function () {
        scope.showLargeCardLayout = (!scope.config.layout || scope.config.layout === 'large');
        scope.showSmallCardLayout = (scope.config.layout === 'small');
        scope.showActualValue = (!scope.config.valueType || scope.config.valueType === 'actual');
        scope.showPercentageValue = (scope.config.valueType === 'percentage');
      }, true);
    }
  };
});
;/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfUtilizationBarChart
 *
 * @description
 *   Directive for rendering a utilization bar chart
 *   There are three possible fill colors for Used Percentage, dependent on whether or not there are thresholds:<br/>
 *   <ul>
 *   <li>When no thresholds exist, or if the used percentage has not surpassed any thresholds, the indicator is blue.
 *   <li>When the used percentage has surpassed the warning threshold, but not the error threshold, the indicator is orange.
 *   <li>When the used percentage has surpassed the error threshold, the indicator is is red.
 *   </ul>
 *
 * @param {object} chartData the data to be shown in the utilization bar chart<br/>
 * <ul style='list-style-type: none'>
 * <li>.used   - number representing the amount used
 * <li>.total  - number representing the total amount
 * </ul>
 *
 * @param {object=} chart-title The title displayed on the left-hand side of the chart
 * @param {object=} chart-footer The label displayed on the right-hand side of the chart.  If chart-footer is not
 * specified, the automatic footer-label-format will be used.
 * @param {object=} layout Various alternative layouts the utilization bar chart may have:<br/>
 * <ul style='list-style-type: none'>
 * <li>.type - The type of layout to use.  Valid values are 'regular' (default) displays the standard chart layout,
 * and 'inline' displays a smaller, inline layout.</li>
 * <li>.titleLabelWidth - Width of the left-hand title label when using 'inline' layout. Example values are "120px", "20%", "10em", etc..</li>
 * <li>.footerLabelWidth - Width of the right-hand used label when using 'inline' layout. Example values are "120px", "20%", "10em", etc..</li>
 * </ul>
 * @param {string=} footer-label-format The auto-format of the label on the right side of the bar chart when chart-footer
 * has not been specified. Values may be:<br/>
 * <ul style='list-style-type: none'>
 * <li>'actual' - (default) displays the standard label of '(n) of (m) (units) Used'.
 * <li>'percent' - displays a percentage label of '(n)% Used'.</li>
 * </ul>
 * @param {object=} units to be displayed on the chart. Examples: "GB", "MHz", "I/Ops", etc...
 * @param {string=} threshold-error The percentage used, when reached, denotes an error.  Valid values are 1-100. When the error threshold
 * has been reached, the used donut arc will be red.
 * @param {string=} threshold-warning The percentage usage, when reached, denotes a warning.  Valid values are 1-100. When the warning threshold
 * has been reached, the used donut arc will be orange.
 *
 * @example
 <example module="patternfly.example">
   <file name="index.html">
     <div ng-controller="ChartCtrl">

       <label class="label-title">Default Layout, no Thresholds</label>
       <div pf-utilization-bar-chart chart-data=data1 chart-title=title1 units=units1></div>
       <br>
       <label class="label-title">Inline Layouts with Error, Warning, and Ok Thresholds</label>
       <div pf-utilization-bar-chart chart-data=data5 chart-title=title5 layout=layoutInline units=units5 threshold-error="85" threshold-warning="60"></div>
       <div pf-utilization-bar-chart chart-data=data3 chart-title=title3 layout=layoutInline units=units3 threshold-error="85" threshold-warning="60"></div>
       <div pf-utilization-bar-chart chart-data=data2 chart-title=title2 layout=layoutInline units=units2 threshold-error="85" threshold-warning="60"></div>
       <br>
       <label class="label-title">layout='inline', footer-label-format='percent', and custom chart-footer labels</label>
       <div pf-utilization-bar-chart chart-data=data2 chart-title=title2 layout=layoutInline footer-label-format='percent' units=units2 threshold-error="85" threshold-warning="60"></div>
       <div pf-utilization-bar-chart chart-data=data3 chart-title=title3 layout=layoutInline footer-label-format='percent' units=units3 threshold-error="85" threshold-warning="60"></div>
       <div pf-utilization-bar-chart chart-data=data4 chart-title=title4 chart-footer=footer1 layout=layoutInline units=units4 threshold-error="85" threshold-warning="60"></div>
       <div pf-utilization-bar-chart chart-data=data5 chart-title=title5 chart-footer=footer2 layout=layoutInline units=units5 threshold-error="85" threshold-warning="60"></div>
     </div>
   </file>

   <file name="script.js">
   angular.module( 'patternfly.example', ['patternfly.charts', 'patternfly.card']);

   angular.module( 'patternfly.example' ).controller( 'ChartCtrl', function( $scope ) {

    $scope.title1 = 'RAM Usage';
    $scope.units1 = 'MB';

    $scope.data1 = {
      'used': '8',
      'total': '24'
    };

    $scope.title2      = 'Memory';
    $scope.units2      = 'GB';

    $scope.data2 = {
      'used': '25',
      'total': '100'
    };

    $scope.title3 = 'CPU Usage';
    $scope.units3 = 'MHz';

    $scope.data3 = {
      'used': '420',
      'total': '500',
    };

    $scope.title4 = 'Disk Usage';
    $scope.units4 = 'TB';
    $scope.data4 = {
      'used': '350',
      'total': '500',
    };

    $scope.title5 = 'Disk I/O';
    $scope.units5 = 'I/Ops';
    $scope.data5 = {
      'used': '450',
      'total': '500',
    };

    $scope.layoutInline = {
      'type': 'inline'
    };

    $scope.footer1 = '<strong>500 TB</strong> Total';
    $scope.footer2 = '<strong>450 of 500</strong> Total';

   });
   </file>
 </example>
*/

angular.module('patternfly.charts').directive('pfUtilizationBarChart', ["$timeout", function ($timeout) {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      chartData: '=',
      chartTitle: '=',
      chartFooter: '=',
      units: '=',
      thresholdError: '=?',
      thresholdWarning: '=?',
      footerLabelFormat: '@?',
      layout: '=?'
    },
    templateUrl: 'charts/utilization-bar/utilization-bar-chart.html',
    link: function (scope) {
      scope.$watch('chartData', function (newVal, oldVal) {
        if (typeof(newVal) !== 'undefined') {
          //Calculate the percentage used
          scope.chartData.percentageUsed = Math.round(100 * (scope.chartData.used / scope.chartData.total));

          if (scope.thresholdError || scope.thresholdWarning) {
            scope.isError = (scope.chartData.percentageUsed > scope.thresholdError);
            scope.isWarn  = (scope.chartData.percentageUsed > scope.thresholdWarning &&
                             scope.chartData.percentageUsed < scope.thresholdError);
            scope.isOk    = (scope.chartData.percentageUsed < scope.thresholdWarning);
          }

          //Animate in the chart load.
          scope.animate = true;
          $timeout(function () {
            scope.animate = false;
          }, 0);
        }
      });


    }
  };
}]);
;/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfUtilizationTrendChart
 *
 * @description
 *   Directive for rendering a utilization trend chart. The utilization trend chart combines overall
 *   data with a pfDonutPctChart and a pfSparklineChart. Add the options for the pfDonutChart via
 *   the donutConfig parameter. Add the options for the pfSparklineChart via the sparklineConfig
 *   parameter.
 *   <br><br>
 *   See http://c3js.org/reference.html for a full list of C3 chart options.
 *
 * @param {object} config configuration settings for the utilization trend chart:<br/>
 * <ul style='list-style-type: none'>
 * <li>.title        - title of the Utilization chart
 * <li>.units        - unit label for values, ex: 'MHz','GB', etc..
 * </ul>
 *
 * @param {object} donutConfig configuration settings for the donut pct chart, see pfDonutPctChart for specifics<br/>
 * @param {object} sparklineConfig configuration settings for the sparkline chart, see pfSparklineChart for specifics<br/>
 *
 * @param {object} chartData the data to be shown in the donut and sparkline charts<br/>
 * <ul style='list-style-type: none'>
 * <li>.used   - number representing the amount used
 * <li>.total  - number representing the total amount
 * <li>.xData  - Array, X values for the data points, first element must be the name of the data
 * <li>.yData  - Array, Y Values for the data points, first element must be the name of the data
 * <li>.dataAvailable - Flag if there is data available - default: true
 * </ul>
 *
 * @param {string=} donutCenterLabel specifies the contents of the donut's center label.<br/>
 * <strong>Values:</strong>
 * <ul style='list-style-type: none'>
 * <li> 'used'      - displays the Used amount in the center label (default)
 * <li> 'available' - displays the Available amount in the center label
 * <li> 'percent'   - displays the Usage Percent of the Total amount in the center label
 * <li> 'none'      - does not display the center label
 * </ul>
 * @param {int=} sparklineChartHeight   height of the sparkline chart
 * @param {boolean=} showSparklineXAxis override sparkline config settings for showing the X Axis
 * @param {boolean=} showSparklineYAxis override sparkline config settings for showing the Y Axis

 * @example
 <example module="patternfly.charts">
   <file name="index.html">
     <div ng-controller="ChartCtrl" class="row" style="display:inline-block; width: 100%;">
       <div class="col-md-12">
         <div pf-utilization-trend-chart config="config"
              chart-data="data" center-label="centerLabel"
              donut-config="donutConfig" sparkline-config="sparklineConfig"
              sparkline-chart-height="custChartHeight"
              show-sparkline-x-axis="custShowXAxis"
              show-sparkline-y-axis="custShowYAxis">
         </div>
       </div>
       <hr class="col-md-12">
       <div class="col-md-12">
         <form role="form">
           <div class="form-group">
           <label>Donut Center Label Type</label>
           </br>
           <label class="radio-inline">
             <input type="radio" ng-model="centerLabel" value="used">Used</input>
           </label>
           <label class="radio-inline">
             <input type="radio" ng-model="centerLabel" value="available">Available</input>
           </label>
           <label class="radio-inline">
             <input type="radio" ng-model="centerLabel" value="percent">Percent</input>
           </label>
           <label class="radio-inline">
             <input type="radio" ng-model="centerLabel" value="none">None</input>
           </label>
           </div>
         </form>
         <form role="form">
           <div class="form-group">
             <label>Sparkline Tooltip Type</label>
               </br>
             <label class="radio-inline">
               <input type="radio" ng-model="sparklineConfig.tooltipType" value="default">Default</input>
             </label>
             <label class="radio-inline">
               <input type="radio" ng-model="sparklineConfig.tooltipType" value="usagePerDay">Usage Per Day</input>
             </label>
             <label class="radio-inline">
               <input type="radio" ng-model="sparklineConfig.tooltipType" value="valuePerDay">Value Per Day</input>
             </label>
             <label class="radio-inline">
               <input type="radio" ng-model="sparklineConfig.tooltipType" value="percentage">Percentage</input>
             </label>
           </div>
         </form>
         <div class="row">
           <div class="col-md-6">
             <form role="form"">
               <div class="form-group">
                 <label>Show</label>
                 </br>
                 <label class="checkbox-inline">
                   <input type="checkbox" ng-model="custShowXAxis">Sparkline X Axis</input>
                 </label>
                 <label class="checkbox-inline">
                   <input type="checkbox" ng-model="custShowYAxis">Sparkline Y Axis</input>
                 </label>
               </div>
             </form>
           </div>
           <div class="col-md-3">
           <form role="form" >
             <div class="form-group">
               <label>Chart Height</label>
               </br>
               <input style="height:25px; width:60px;" type="number" ng-model="custChartHeight"></input>
             </div>
           </form>
           </div>
           <div class="col-md-3">
             <button ng-click="addDataPoint()">Add Data Point</button>
           </div>
         </div>
         <div class="row">
           <div class="col-md-6">
             <form role="form"">
               <div class="form-group">
                 <label class="checkbox-inline">
                   <input type="checkbox" ng-model="data.dataAvailable" ng-change="updateDataAvailable()">Data Available</input>
                 </label>
               </div>
             </form>
         </div>
       </div>
     </div>
   </file>

   <file name="script.js">
   angular.module( 'patternfly.charts' ).controller( 'ChartCtrl', function( $scope ) {
     $scope.config = {
       title: 'Memory',
       units: 'GB'
     };
     $scope.donutConfig = {
       chartId: 'chartA',
       thresholds: {'warning':'60','error':'90'}
     };
     $scope.sparklineConfig = {
       'chartId': 'exampleSparkline',
       'tooltipType': 'default',
       'units': 'GB'
     };

    var today = new Date();
    var dates = ['dates'];
    for (var d = 20 - 1; d >= 0; d--) {
        dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
    }

     $scope.data = {
         dataAvailable: true,
         used: 76,
         total: 100,
         xData: dates,
         yData: ['used', '10', '20', '30', '20', '30', '10', '14', '20', '25', '68', '54', '56', '78', '56', '67', '88', '76', '65', '87', '76']
     };

     $scope.centerLabel = 'used';

     $scope.custShowXAxis = false;
     $scope.custShowYAxis = false;
     $scope.custChartHeight = 60;

     $scope.addDataPoint = function () {
       var newData = Math.round(Math.random() * 100);
       var newDate = new Date($scope.data.xData[$scope.data.xData.length - 1].getTime() + (24 * 60 * 60 * 1000));

       $scope.data.used = newData;
       $scope.data.xData.push(newDate);
       $scope.data.yData.push(newData);
     };
   });
   </file>
 </example>
 */
angular.module('patternfly.charts').directive('pfUtilizationTrendChart', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      chartData: '=',
      config: '=',
      centerLabel: '=?',
      donutConfig: '=',
      sparklineConfig: '=',
      sparklineChartHeight: '=?',
      showSparklineXAxis: '=?',
      showSparklineYAxis: '=?'
    },
    replace: true,
    templateUrl: 'charts/utilization-trend/utilization-trend-chart.html',
    controller: ['$scope',
      function ($scope) {
        if ($scope.centerLabel === undefined) {
          $scope.centerLabel = 'used';

        }
        if ($scope.donutConfig.units === undefined) {
          $scope.donutConfig.units = $scope.config.units;
        }
        if ($scope.chartData.available === undefined) {
          $scope.chartData.available = $scope.chartData.total - $scope.chartData.used;
        }
        $scope.config.units = $scope.config.units || $scope.units;
      }
    ],
    link: function (scope, element) {
      var setupCurrentValues = function () {
        if (scope.centerLabel === 'available') {
          scope.currentValue = scope.chartData.used;
          scope.currentText = 'Used';
        } else {
          scope.currentValue = scope.chartData.total - scope.chartData.used;
          scope.currentText = 'Available';
        }
      };
      scope.$watchGroup(['centerLabel', 'chartData.used', 'chartData.available', 'chartData.total'], function () {
        setupCurrentValues();
      });
    }
  };
});
;/**
 * @ngdoc directive
 * @name patternfly.filters.directive:pfFilter
 *
 * @description
 *   Directive for a filter bar
 *   <br><br>
 *
 * @param {object} config configuration settings for the filters:<br/>
 * <ul style='list-style-type: none'>
 * <li>.fields          - (Array) List of filterable fields containing:
 * <ul style='list-style-type: none'>
 * <li>.id          - (String) Optional unique Id for the filter field, useful for comparisons
 * <li>.title       - (String) The title to display for the filter field
 * <li>.placeholder - (String) Text to display when no filter value has been entered
 * <li>.filterType  - (String) The filter input field type (any html input type, or 'select' for a single select box)
 * <li>.filterValues - (Array) List of valid select values used when filterType is 'select'
 * </ul>
 * <li>.appliedFilters - (Array) List of the currently applied filters
 * <li>.resultsCount   - (int) The number of results returned after the current applied filters have been applied
 * <li>.onFilterChange - ( function(array of filters) ) Function to call when the applied filters list changes
 * </ul>
 *
 * @example
<example module="patternfly.filters" deps="patternfly.select">
  <file name="index.html">
    <div ng-controller="ViewCtrl" class="row example-container">
      <div class="col-md-12">
        <div pf-filter id="exampleFilter" config="filterConfig"></div>
      </div>
      <hr class="col-md-12">
      <div class="col-md-12">
        <label class="events-label">Valid Items: </label>
      </div>
      <div class="col-md-12">
        <div ng-repeat="item in items" class="col-md-12 cfme-row-column">
          <div class="row">
            <div class="col-md-3">
              <span>{{item.name}}</span>
            </div>
            <div class="col-md-7">
              <span>{{item.address}}</span>
            </div>
            <div class="col-md-2">
              <span>{{item.birthMonth}}</span>
            </div>
          </div>
        </div>
      </div>
      </br></br>
      <div class="col-md-12">
        <label class="events-label">Current Filters: </label>
      </div>
      <div class="col-md-12">
        <textarea rows="5" class="col-md-12">{{filtersText}}</textarea>
      </div>
    </div>
  </file>

  <file name="script.js">
    angular.module('patternfly.filters').controller('ViewCtrl', ['$scope',
      function ($scope) {
        $scope.filtersText = '';

        $scope.allItems = [
          {
            name: "Fred Flintstone",
            address: "20 Dinosaur Way, Bedrock, Washingstone",
            birthMonth: 'February'
          },
          {
            name: "John Smith",
            address: "415 East Main Street, Norfolk, Virginia",
            birthMonth: 'October'
          },
          {
            name: "Frank Livingston",
            address: "234 Elm Street, Pittsburgh, Pennsylvania",
            birthMonth: 'March'
          },
          {
            name: "Judy Green",
            address: "2 Apple Boulevard, Cincinatti, Ohio",
            birthMonth: 'December'
          },
          {
            name: "Pat Thomas",
            address: "50 Second Street, New York, New York",
            birthMonth: 'February'
          }
        ];
        $scope.items = $scope.allItems;

        var matchesFilter = function (item, filter) {
          var match = true;

          if (filter.id === 'name') {
            match = item.name.match(filter.value) !== null;
          } else if (filter.id === 'address') {
            match = item.address.match(filter.value) !== null;
          } else if (filter.id === 'birthMonth') {
            match = item.birthMonth === filter.value;
          }
          return match;
        };

        var matchesFilters = function (item, filters) {
          var matches = true;

          filters.forEach(function(filter) {
            if (!matchesFilter(item, filter)) {
              matches = false;
              return false;
            }
          });
          return matches;
        };

        var applyFilters = function (filters) {
          $scope.items = [];
          if (filters && filters.length > 0) {
            $scope.allItems.forEach(function (item) {
              if (matchesFilters(item, filters)) {
                $scope.items.push(item);
              }
            });
          } else {
            $scope.items = $scope.allItems;
          }
          $scope.filterConfig.resultsCount = $scope.items.length;
        };

        var filterChange = function (filters) {
        $scope.filtersText = "";
          filters.forEach(function (filter) {
            $scope.filtersText += filter.title + " : " + filter.value + "\n";
          });
          applyFilters(filters);
        };

        $scope.filterConfig = {
          fields: [
            {
              id: 'name',
              title:  'Name',
              placeholder: 'Filter by Name',
              filterType: 'text'
            },
            {
              id: 'address',
              title:  'Address',
              placeholder: 'Filter by Address',
              filterType: 'text'
            },
            {
              id: 'birthMonth',
              title:  'Birth Month',
              placeholder: 'Filter by Birth Month',
              filterType: 'select',
              filterValues: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            }
          ],
          resultsCount: $scope.items.length,
          appliedFilters: [],
          onFilterChange: filterChange
        };
      }
    ]);
  </file>
</example>
 */
angular.module('patternfly.filters').directive('pfFilter', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      config: '='
    },
    templateUrl: 'filters/filter.html',
    controller: ["$scope", function ($scope) {
      $scope.filterExists = function (filter) {
        var foundFilter = _.findWhere($scope.config.appliedFilters, {title: filter.title, value: filter.value});
        return foundFilter !== undefined;
      };

      $scope.enforceSingleSelect = function (filter) {
        _.remove($scope.config.appliedFilters, {title: filter.title});
      };

      $scope.addFilter = function (field, value) {
        var newFilter = {
          id: field.id,
          title: field.title,
          type: field.filterType,
          value: value
        };
        if (!$scope.filterExists(newFilter)) {

          if (newFilter.type === 'select') {
            $scope.enforceSingleSelect(newFilter);
          }

          $scope.config.appliedFilters.push(newFilter);

          if ($scope.config.onFilterChange) {
            $scope.config.onFilterChange($scope.config.appliedFilters);
          }
        }
      };
    }]
  };
});
;/**
 * @ngdoc directive
 * @name patternfly.filters.directive:pfFilterFields
 *
 * @description
 *   Directive for the filter bar's filter entry components
 *   <br><br>
 *
 * @param {object} config configuration settings for the filters:<br/>
 * <ul style='list-style-type: none'>
 * <li>.fields          - (Array) List of filterable fields containing:
 * <ul style='list-style-type: none'>
 * <li>.id          - (String) Optional unique Id for the filter field, useful for comparisons
 * <li>.title       - (String) The title to display for the filter field
 * <li>.placeholder - (String) Text to display when no filter value has been entered
 * <li>.filterType  - (String) The filter input field type (any html input type, or 'select' for a select box)
 * <li>.filterValues - (Array) List of valid select values used when filterType is 'select'
 * </ul>
 * <li>.appliedFilters - (Array) List of the currently applied filters
 * </ul>
 *
 */
angular.module('patternfly.filters').directive('pfFilterFields', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      config: '=',
      addFilterFn: '='
    },
    templateUrl: 'filters/filter-fields.html',
    controller: ["$scope", function ($scope) {
      $scope.setupConfig = function () {
        if ($scope.fields === undefined) {
          $scope.fields = [];
        }
        if (!$scope.currentField) {
          $scope.currentField = $scope.config.fields[0];
          $scope.config.currentValue = null;
        }

        if ($scope.config.currentValue === undefined) {
          $scope.config.currentValue = null;
        }
      };

      $scope.$watch('config', function () {
        $scope.setupConfig();
      }, true);
    }],

    link: function (scope, element, attrs) {
      scope.selectField = function (item) {
        scope.currentField = item;
        scope.config.currentValue = null;
      };

      scope.selectValue = function (filterValue) {
        scope.addFilterFn(scope.currentField, filterValue);
        scope.config.currentValue = null;
      };

      scope.onValueKeyPress = function (keyEvent) {
        if (keyEvent.which === 13) {
          scope.addFilterFn(scope.currentField, scope.config.currentValue);
          scope.config.currentValue = undefined;
        }
      };
    }
  };
});
;/**
 * @ngdoc directive
 * @name patternfly.filters.directive:pfFilterResults
 *
 * @description
 *   Directive for the filter results components
 *   <br><br>
 *
 * @param {object} config configuration settings for the filter results:<br/>
 * <ul style='list-style-type: none'>
 * <li>.fields          - (Array) List of filterable fields containing:
 * <ul style='list-style-type: none'>
 * <li>.id          - (String) Optional unique Id for the filter field, useful for comparisons
 * <li>.title       - (String) The title to display for the filter field
 * <li>.placeholder - (String) Text to display when no filter value has been entered
 * <li>.filterType  - (String) The filter input field type (any html input type, or 'select' for a select box)
 * <li>.filterValues - (Array) List of valid select values used when filterType is 'select'
 * </ul>
 * <li>.appliedFilters - (Array) List of the currently applied filters
 * <li>.resultsCount   - (int) The number of results returned after the current applied filters have been applied
 * <li>.onFilterChange - ( function(array of filters) ) Function to call when the applied filters list changes
 * </ul>
 *
 */
angular.module('patternfly.filters').directive('pfFilterResults', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      config: '='
    },
    templateUrl: 'filters/filter-results.html',
    controller: ["$scope", function ($scope) {
      $scope.setupConfig = function () {
        if (!$scope.config.appliedFilters) {
          $scope.config.appliedFilters = [];
        }
        if ($scope.config.resultsCount === undefined) {
          $scope.config.resultsCount = 0;
        }
      };

      $scope.$watch('config', function () {
        $scope.setupConfig();
      }, true);
    }],
    link: function (scope, element, attrs) {
      scope.clearFilter = function (item) {
        var newFilters = [];
        scope.config.appliedFilters.forEach(function (filter) {
          if (item.title !== filter.title || item.value !== filter.value) {
            newFilters.push(filter);
          }
        });
        scope.config.appliedFilters = newFilters;

        if (scope.config.onFilterChange) {
          scope.config.onFilterChange(scope.config.appliedFilters);
        }
      };

      scope.clearAllFilters = function () {
        scope.config.appliedFilters = [];

        if (scope.config.onFilterChange) {
          scope.config.onFilterChange(scope.config.appliedFilters);
        }
      };
    }
  };
});
;/**
 * @ngdoc directive
 * @name patternfly.form.directive:pfDatepicker
 *
 * @description
 *  Angular directive to wrap the bootstrap datepicker http://bootstrap-datepicker.readthedocs.org/en/latest/
 *
 * @param {string} date the date model
 * @param {string} options the configuration options for the date picker
 *
 * @example
 <example module="patternfly.form">
   <file name="index.html">
     <form class="form-horizontal" ng-controller="FormDemoCtrl">
     <div>
       <button ng-click=setToday()>Set Today in Angular Model</button>
      </div>
      Date: <span ng-bind="date | date:'MM/dd/yyyy'"></span>
      <div pf-datepicker options="options" date="date"></div>
     </form>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.form' ).controller( 'FormDemoCtrl', function( $scope ) {
       $scope.setToday = function () {
         $scope.date = new Date();
       }

       $scope.options = {
         autoclose: true,
         todayBtn: 'linked',
         todayHighlight: true
       };
     });
   </file>
 </example>
 */
angular.module('patternfly.form').directive('pfDatepicker', function () {
  'use strict';

  return {
    replace: true,
    restrict: 'A',
    require: '^form',
    templateUrl: 'form/datepicker/datepicker.html',
    scope: {
      options: '=',
      date: '='
    },
    link: function ($scope, element) {

      //Make sure the date picker is set with the correct options
      element.datepicker($scope.options);

      //Set the initial value of the date picker
      element.datepicker('update', $scope.date);

      //Change happened on the date picker side. Update the underlying date model
      element.datepicker($scope.date).on('changeDate', function (elem) {
        $scope.$apply(function () {
          $scope.date = elem.date;
        });
      });

      //Update the date picker if there is a change on the date model
      $scope.$watch('date', function (newValue, oldValue) {
        if (oldValue !== newValue) {
          element.datepicker('update', newValue);
        }
      });
    }
  };
});
;/**
 * @ngdoc directive
 * @name patternfly.form.directive:pfFormButtons
 *
 * @description
 *   Encapsulates the standard structure and styling for create and cancel buttons
 *   when used with a form.
 *
 *   This directive creates new scope.
 *
 * @param {function} pfHandleCancel function to call when the user clicks cancel.
 * @param {function} pfHandleSave function to call when the user clicks save.
 * @param {expression} pfWorking the model to store the working status in.
 * @param {string} pfButtonClass the class of the button container.
 *
 * @example
 <example module="patternfly.form">

   <file name="index.html">
     <div ng-controller="FormButtonCtrl">
       <p>Saved?</p>
       <p>{{ status }}</p>
       <form>
         <div class="form-group>
           <label class="control-label col-sm-2">Input</label>
           <input class="form-control col-sm-5" name="item" ng-model="input" type="text">
         </div>
         <div pf-form-buttons pf-on-cancel="cancel()" pf-on-save="save(item)" pf-working="working"></div>
       </form>
     </div>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.form' ).controller( 'FormButtonCtrl', function( $scope, $timeout ) {
       $scope.status = 'Not yet Saved'
       $scope.working = false;

       $scope.save = function (item) {
         $scope.status = 'saved';
         $scope.working = true;

         $timeout(function () {
           $scope.working = false;
         }, 1000);
       };

       $scope.cancel = function () {
         $scope.status = 'cancelled';
         $scope.input = null;
       };
     });
   </file>
 </example>
 */
angular.module('patternfly.form').directive('pfFormButtons', function () {
  'use strict';

  return {
    replace: true,
    require: '^form',
    templateUrl: 'form/form-buttons/form-buttons.html',
    scope: {
      pfHandleCancel: '&pfOnCancel',
      pfHandleSave: '&pfOnSave',
      pfWorking: '=',
      pfButtonContainerClass: '@'
    },
    link: function (scope, iElement, iAttrs, controller) {
      if (scope.pfWorking === undefined) {
        scope.pfWorking = false;
      }

      scope.isInvalid = function () {
        var invalid = controller.$invalid;

        angular.forEach(controller, function (value) {
          if (value && value.$error) {
            if (value.$error.server) {
              invalid = false;
            }
          }
        });

        return invalid;
      };
    }
  };
});
;/**
 * @ngdoc directive
 * @name patternfly.form.directive:pfFormGroup
 *
 * @description
 *  Encapsulates the structure and styling for a label + input used within a
 *  Bootstrap3 based form.
 *
 *  This directive creates new scope.
 *
 * @param {string} pfLabel the text for the <label> element.
 * @param {string} pfFieldId the id of the form field. Default value is id of the form field element.
 * @param {string} pfLabelClass the class of the label element. Default value is "col-sm-2".
 * @param {string} pfInputClass the class of the input element. Default value is "col-sm-5".
 *
 * @example
 <example module="patternfly.form">

   <file name="index.html">
     <form class="form-horizontal" ng-controller="FormDemoCtrl">

       <p>Name: {{ item.name }}</p>
       <p>Description: {{ item.description }}</p>
       <div pf-form-group pf-label="Name" required>
         <input id="name" name="name"
                ng-model="item.name" type="text" required/>
       </div>

       <div pf-form-group pf-input-class="col-sm-9" pf-label="Description">
         <textarea id="description" name="description" ng-model="item.description">
           {{ item.description }}
         </textarea>
       </div>
     </form>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.form' ).controller( 'FormDemoCtrl', function( $scope ) {
       $scope.item = {
         name: 'Homer Simpson',
         description: 'I like donuts and Duff.  Doh!'
       };
     });
   </file>
 </example>
 */
angular.module('patternfly.form').directive('pfFormGroup', function () {
  'use strict';

  function getInput (element) {
    // table is used for bootstrap3 date/time pickers
    var input = element.find('table');

    if (input.length === 0) {
      input = element.find('input');

      if (input.length === 0) {
        input = element.find('select');

        if (input.length === 0) {
          input = element.find('textarea');
        }
      }
    }
    return input;
  }

  return {
    transclude: true,
    replace: true,
    require: '^form',
    templateUrl: 'form/form-group/form-group.html',
    scope: {
      'pfLabel': '@',
      'pfField': '@',
      'pfLabelClass': '@',
      'pfInputClass': '@'
    },
    link: function (scope, iElement, iAttrs, controller) {
      var input = getInput(iElement),
        type = input.attr('type'),
        field;

      if (!iAttrs.pfLabelClass) {
        iAttrs.pfLabelClass = 'col-sm-2';
      }

      if (!iAttrs.pfInputClass) {
        iAttrs.pfInputClass = 'col-sm-5';
      }

      if (!scope.pfField) {
        scope.pfField = input.attr('id');
      }
      field = scope.pfField;

      if (['checkbox', 'radio', 'time'].indexOf(type) === -1) {
        input.addClass('form-control');
      }

      if (input.attr('required')) {
        iElement.addClass('required');
      }

      if (controller[field]) {
        scope.error = controller[field].$error;
      }

      scope.hasErrors = function () {
        return controller[field] && controller[field].$invalid && controller[field].$dirty;
      };
    }
  };
});
;/**
 * @ngdoc directive
 * @name patternfly.form.directive:pfRemainingCharsCount
 *
 * @description
 *   Directive for showing a characters remaining count and triggering warning and error</br>
 *   behavior when passing specified thresholds.  When the <code>chars-warn-remaining</code> threshold is passed, </br>
 *   the <code>chars-warn-remaining-pf</code> css class is applied to the <code>count-fld</code>, which by default, turns </br>
 *   the remaining count number <font color='red'>red</font>.</br>
 *   By default, characters may be entered into the text field after the <code>chars-max-limit</code> limit has been reached,</br>
 *   the remaining count number will become a negative value. Setting the <code>blockInputAtMaxLimit</code> to <em>true</em>,</br>
 *   will block additional input into the text field after the max has been reached; additionally a right-click 'paste' will only </br>
 *   paste characters until the maximum character limit is reached.
 *
 * @param {string} ng-model The scope model variable which contains the initial text for the text field.  Required, but</br>
 * can be an emptly string ("").
 * @param {string} count-fld The id of the field to display the 'characters-remaining' count.
 * @param {string} chars-max-limit Number representing the maximum number of characters to allow before dispatching a<br/>
 * 'overCharsMaxLimit' event.   When the number of characters falls below <code>chars-max-limit</code>, a 'underCharsMaxLimit'<br/>
 * event is dispatched.
 * @param {string} chars-warn-remaining Number of remaining characters to warn upon.  The 'chars-warn-remaining-pf'<br/>
 * class will be applied to the <code>count-fld</code> when the remaining characters is less than the<br/>
 * <code>chars-warn-remaining</code> threshold.  When/if the number of remaining characters becomes greater than the<br/>
 * <code>chars-warn-remaining</code> threshold, the 'chars-warn-remaining-pf' class is removed from the <code>count-fld</code> field.
 * @param {boolean=} block-input-at-max-limit If true, no more characters can be entered into the text field when the<br/>
 * <code>chars-max-limit</code> has been reached.  If false (the default), characters may be entered into the text field after the<br/>
 * max. limit has been reached, but these additional characters will trigger the 'overCharsMaxLimit' event to be<br/>
 * dispatched.  When <code>blockInputAtMaxLimit</code> is <em>true</em>, a right-click 'paste' will only paste<br/>
 * characters until the maximum character limit is reached.
 *
 * @example
 <example module="patternfly.example">
   <file name="index.html">
     <div ng-controller="DemoCtrl" style="display:inline-block; width: 100%;">

     <style>
       textarea {
         resize: none;
       }
     </style>

     <div class="container">
       <strong>Max limit: 20, warn when 5 or less remaining, disable button after max limit</strong>
       <div class="row">
         <div class="col-md-4">

           <form>
             <div class="form-group">
               <label for="messageArea"></label>
               <textarea class="form-control" pf-remaining-chars-count id="messageArea_1" ng-model="messageArea1text" chars-max-limit="20" chars-warn-remaining="5"
                         count-fld="charRemainingCntFld_1" name="text" placeholder="Type in your message" rows="5"></textarea>
             </div>
             <span class="pull-right chars-remaining-pf">
               <span id="charRemainingCntFld_1"></span>
               <button id="postBtn_1" ng-disabled="charsMaxLimitExceeded" type="submit" class="btn btn-default">Post New Message</button>
             </span>
           </form>

         </div>
       </div>
       <br>
       <strong>Max limit: 10, warn when 2 or less remaining, block input after max limit</strong>
       <div class="row">
         <div class="col-md-4">
          <form>
             <div class="form-group">
               <label for="messageArea"></label>
               <textarea class="form-control" pf-remaining-chars-count id="messageArea_2" ng-model="messageArea2text" chars-max-limit="10" chars-warn-remaining="2"
                         block-input-at-max-limit="true" count-fld="charRemainingCntFld_2" name="text"
                         placeholder="Type in your message" rows="5"></textarea>
             </div>
             <span class="pull-left">
               <button id="postBtn_2" type="submit" class="btn btn-default">Submit</button>
             </span>
             <span class="pull-right chars-remaining-pf">
               <span id="charRemainingCntFld_2"></span>
             </span>
           </form>
         </div>
       </div>
       <br>
       <strong>Max limit: 10, warn when 5 or less remaining, block input after max limit</strong>
       <div class="row">
         <div class="col-md-4">
           <input id="input_3" pf-remaining-chars-count chars-max-limit="10" ng-model="messageInput3text" chars-warn-remaining="5" count-fld="charRemainingCntFld_3"
             block-input-at-max-limit="true"/>
             <span class="chars-remaining-pf"><span id="charRemainingCntFld_3" style="padding-left: 5px"></span>Remaining</span>
         </div>
       </div>
     </div>
   </file>

   <file name="script.js">
   angular.module( 'patternfly.example', ['patternfly.form']);

   angular.module( 'patternfly.example' ).controller( 'DemoCtrl', function( $scope ) {
     $scope.messageArea1text = "Initial Text";
     $scope.messageArea2text = "";
     $scope.messageInput3text = "";

     $scope.charsMaxLimitExceeded = false;

     // 'tfId' will equal the id of the text area/input field which
     // triggered the event
     $scope.$on('overCharsMaxLimit', function (event, tfId) {
         if(!$scope.charsMaxLimitExceeded){
           $scope.charsMaxLimitExceeded = true;
         }
     });

     // 'tfId' will equal the id of the text area/input field which
     // triggered the event
     $scope.$on('underCharsMaxLimit', function (event, tfId) {
         if($scope.charsMaxLimitExceeded){
           $scope.charsMaxLimitExceeded = false;
         }
     });

   });

   </file>
 </example>
*/

angular.module('patternfly.form').directive('pfRemainingCharsCount', ["$timeout", function ($timeout) {
  'use strict';
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      ngModel: "="
    },
    link: function ($scope, $element, $attributes) {
      var charsMaxLimit = $attributes.charsMaxLimit;
      var charsWarnRemaining = $attributes.charsWarnRemaining;
      var countRemainingFld = angular.element(document.getElementById($attributes.countFld));
      var blockInputAtMaxLimit = ($attributes.blockInputAtMaxLimit === 'true');
      var checkCharactersRemaining = function () {
        var charsLength = $scope.ngModel.length;
        var remainingChars = charsMaxLimit - charsLength;

        // trim if blockInputAtMaxLimit and over limit
        if (blockInputAtMaxLimit && charsLength > charsMaxLimit) {
          $scope.ngModel = $scope.ngModel.substring(0, charsMaxLimit);
          charsLength = $scope.ngModel.length;
          remainingChars = charsMaxLimit - charsLength;
        }

        // creating scope vars for unit testing
        $scope.remainingChars = remainingChars;
        $scope.remainingCharsWarning = (remainingChars <= charsWarnRemaining ? true : false);

        countRemainingFld.text(remainingChars);
        countRemainingFld.toggleClass('chars-warn-remaining-pf', remainingChars <= charsWarnRemaining);

        if (remainingChars < 0) {
          $scope.$emit('overCharsMaxLimit', $attributes.id);
        } else {
          $scope.$emit('underCharsMaxLimit', $attributes.id);
        }
      };

      $scope.$watch('ngModel', function () {
        checkCharactersRemaining();
      });

      $element.bind('keypress', function (event) {
        // Once the charsMaxLimit has been met or exceeded, prevent all keypresses from working
        if (blockInputAtMaxLimit && $element.val().length >= charsMaxLimit) {
          // Except backspace
          if (event.keyCode !== 8) {
            event.preventDefault();
          }
        }
      });
    }
  };
}]);
;/**
 * @ngdoc directive
 * @name patternfly.notification.directive:pfInlineNotification
 * @restrict E
 * @scope
 *
 * @param {expression=} pfNotificationType The type of the notification message. Allowed value is one of these: 'success','info','danger', 'warning'.
 * @param {expression=} pfNotificationMessage The main text message of the notification.
 * @param {expression=} pfNotificationHeader The header text of the notification.
 * @param {expression=} pfNotificationPersistent The notification won't disappear after delay timeout, but has to be closed manually with the close button.
 *
 * @description
 * The main visual element of the notification message.
 *
 * @example
 <example module="patternfly.notification">

   <file name="index.html">
     <div ng-controller="NotificationDemoCtrl">

       <pf-inline-notification pf-notification-type="type"
                        pf-notification-header="header"
                        pf-notification-message="message"
                        pf-notification-persistent="isPersistent">
       </pf-inline-notification>

       <form class="form-horizontal">
         <div class="form-group">
           <label class="col-sm-2 control-label" for="header">Header:</label>
           <div class="col-sm-10">
            <input type="text" class="form-control" ng-model="header" id="header"/>
           </div>
         </div>
         <div class="form-group">
           <label class="col-sm-2 control-label" for="message">Message:</label>
           <div class="col-sm-10">
            <input type="text" class="form-control" ng-model="message" id="message"/>
           </div>
         </div>
         <div class="form-group">
           <label class="col-sm-2 control-label" for="type">Type:</label>
           <div class="col-sm-10">
            <select pf-select ng-model="type" id="type" ng-options="o as o for o in types"></select>
           </div>
         </div>
         <div class="form-group">
           <label class="col-sm-2 control-label" for="type">Persistent:</label>
           <div class="col-sm-10">
            <input type="checkbox" ng-model="isPersistent"></input>
           </div>
         </div>
       </form>
     </div>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.notification' ).controller( 'NotificationDemoCtrl', function( $scope, Notifications ) {
       $scope.types = ['success','info','danger', 'warning'];
       $scope.type = $scope.types[0];
       $scope.isPersistent = false;

       $scope.header = 'Default Header.';
       $scope.message = 'Default Message.';
     });
   </file>

 </example>
 */
angular.module( 'patternfly.notification' ).directive('pfInlineNotification', function () {
  'use strict';

  return {
    scope: {
      'pfNotificationType': '=',
      'pfNotificationMessage': '=',
      'pfNotificationHeader': '=',
      'pfNotificationPersistent': '=',
      'pfNotificationIndex': '='
    },
    restrict: 'E',
    templateUrl: 'notification/inline-notification.html'
  };
});
;/**
 * @ngdoc service
 * @name patternfly.notification.Notification
 * @requires $rootScope
 *
 * @description
 * Notification service used to notify user about important events in the application.
 *
 * ## Configuring the service
 *
 * You can configure the service with: setDelay, setVerbose and setPersist.
 *
 * ### Notifications.setDelay
 * Set the delay after which the notification is dismissed. The argument of this method expects miliseconds. Default
 * delay is 5000 ms.
 *
 * ### Notifications.setVerbose
 * Set the verbose mode to on (default) or off. During the verbose mode, each notification is printed in the console,
 * too. This is done using the default angular.js $log service.
 *
 * ### Notifications.setPersist
 * Sets persist option for particular modes. Notification with persistent mode won't be dismissed after delay, but has
 * to be closed manually with the close button. By default, the "error" and "httpError" modes are set to persistent.
 * The input is an object in format {mode: persistValue}.
 *
 * ## Configuration Example
 * ```js
 * angular.module('myApp', []).config(function (NotificationsProvider) {
 *   NotificationsProvider.setDelay(10000).setVerbose(false).setPersist({'error': true, 'httpError': true, 'warn': true});
 * });
 * ```
 * @example
 <example module="patternfly.notification">

   <file name="index.html">
     <div ng-controller="NotificationDemoCtrl">
       <pf-notification-list></pf-notification-list>

       <form class="form-horizontal">
         <div class="form-group">
           <label class="col-sm-2 control-label" for="message">Message:</label>
           <div class="col-sm-10">
            <input type="text" class="form-control" ng-model="message" id="message"/>
           </div>
         </div>
         <div class="form-group">
           <label class="col-sm-2 control-label" for="type">Type:</label>
           <div class="col-sm-10">
            <select pf-select ng-model="type" id="type" ng-options="o as o for o in types"></select>
           </div>
         </div>
         <div class="form-group">
           <div class="col-sm-12">
            <button ng-click="notify()">Add notification</button>
           </div>
         </div>
       </form>
     </div>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.notification' ).controller( 'NotificationDemoCtrl', function( $scope, Notifications ) {

       var typeMap = { 'Info': Notifications.info,
                       'Success': Notifications.success,
                       'Warning': Notifications.warn,
                       'Danger': Notifications.error };

       $scope.types = Object.keys(typeMap);

       $scope.type = $scope.types[0];
       $scope.message = 'Default notification message.';

       $scope.notify = function () {
         typeMap[$scope.type]($scope.message);
       }
     });
   </file>

 </example>
 */
angular.module('patternfly.notification').provider('Notifications', function () {
  'use strict';

  // time (in ms) the notifications are shown
  this.delay = 5000;
  this.verbose = true;
  this.notifications = {};
  this.persist = {'error': true, 'httpError': true};

  this.setDelay = function (delay) {
    this.delay = delay;
    return this;
  };

  this.setVerbose = function (verbose) {
    this.verbose = verbose;
    return this;
  };

  this.setPersist = function (persist) {
    this.persist = persist;
  };

  this.$get = ['$rootScope', '$timeout', '$log', function ($rootScope, $timeout, $log) {
    var delay = this.delay;
    var notifications = this.notifications;
    var verbose = this.verbose;
    var persist = this.persist;

    var scheduleMessagePop = function () {
      $timeout(function () {
        var i;

        for (i = 0; i < $rootScope.notifications.data.length; i++) {
          if (!$rootScope.notifications.data[i].isPersistent) {
            $rootScope.notifications.data.splice(i, 1);
          }
        }
      }, delay);
    };

    var modes = {
      info: { type: 'info', header: 'Info!', log: 'info'},
      success: { type: 'success', header: 'Success!', log: 'info'},
      error: { type: 'danger', header: 'Error!', log: 'error'},
      warn: { type: 'warning', header: 'Warning!', log: 'warn'}
    };

    $rootScope.notifications = {};
    $rootScope.notifications.data = [];

    $rootScope.notifications.remove = function (index) {
      $rootScope.notifications.data.splice(index, 1);
    };

    if (!$rootScope.notifications) {
      $rootScope.notifications.data = [];
    }

    notifications.message = function (type, header, message, isPersistent) {
      $rootScope.notifications.data.push({
        type : type,
        header: header,
        message : message,
        isPersistent: isPersistent
      });

      scheduleMessagePop();
    };


    function createNotifyMethod (mode) {
      return function (message) {
        notifications.message(modes[mode].type, modes[mode].header, message, persist[mode]);
        if (verbose) {
          $log[modes[mode].log](message);
        }
      };
    }

    angular.forEach(modes, function (mode, index) {
      notifications[index] = createNotifyMethod(index);
    });


    notifications.httpError = function (message, httpResponse) {
      message += ' (' + (httpResponse.data.message || httpResponse.data.cause || httpResponse.data.cause || httpResponse.data.errorMessage) + ')';
      notifications.message('danger', 'Error!', message, persist.httpError);
      if (verbose) {
        $log.error(message);
      }
    };

    return notifications;
  }];

});

/**
 * @ngdoc directive
 * @name patternfly.notification.directive:pfNotificationList
 * @restrict E
 *
 * @description
 * Using this directive automatically creates a list of notifications generated by the {@link api/patternfly.notification.Notification notification} service.
 *
 * @example
 <example module="patternfly.notification">

   <file name="index.html">
     <div ng-controller="NotificationDemoCtrl">

       <pf-notification-list></pf-notification-list>

       <form class="form-horizontal">
         <div class="form-group">
           <label class="col-sm-2 control-label" for="type">Type:</label>
           <div class="col-sm-10">
            <select pf-select ng-model="type" id="type" ng-options="o as o for o in types"></select>
           </div>
         </div>
         <div class="form-group">
           <label class="col-sm-2 control-label" for="message">Message:</label>
           <div class="col-sm-10">
            <input type="text" class="form-control" ng-model="message" id="message"/>
           </div>
         </div>
         <div class="form-group">
           <div class="col-sm-12">
            <button ng-click="notify()">Add notification - Click me several times</button>
           </div>
         </div>
       </form>
     </div>
   </file>

   <file name="script.js">
     angular.module('patternfly.notification').controller( 'NotificationDemoCtrl', function( $scope, Notifications ) {
       $scope.message = 'Default Message.';

       var typeMap = { 'Info': Notifications.info,
                       'Success': Notifications.success,
                       'Warning': Notifications.warn,
                       'Danger': Notifications.error };

       $scope.types = Object.keys(typeMap);

       $scope.type = $scope.types[0];
       $scope.message = 'Default notification message.';

       $scope.notify = function () {
         typeMap[$scope.type]($scope.message);
       }
     });
   </file>

 </example>
 */
angular.module('patternfly.notification').directive('pfNotificationList', function () {
  'use strict';

  NotificationListController.$inject = ["$scope", "$rootScope"];
  return {
    restrict: 'E',
    controller: NotificationListController,
    templateUrl: 'notification/notification-list.html'
  };

  function NotificationListController ($scope, $rootScope) {
    $scope.notifications = $rootScope.notifications;
  }
});
;/**
 * @ngdoc directive
 * @name patternfly.select:pfSelect
 * @element select
 *
 * @param {string} ngModel Model binding using the {@link https://docs.angularjs.org/api/ng/type/ngModel.NgModelController/ NgModelController} is mandatory.
 * @param {string=} ngOptions The `{@link https://docs.angularjs.org/api/ng/directive/select/ ngOptions}` attribute can be used to dynamically generate a list of `<option>`
 * elements for the `<select>` element.
 *
 * @description
 * An AngularJS wrapper for the {@link http://silviomoreto.github.io/bootstrap-select/ Bootstrap-select} jQuery plugin which is used
 * as a default select decorator in {@link https://www.patternfly.org/widgets/#bootstrap-select Patternfly}.
 *
 * @example
 <example module="patternfly.select">

   <file name="index.html">
     <div ng-controller="SelectDemoCtrl">

     <form class="form-horizontal">
       <div class="form-group">
         <label class="col-sm-2 control-label" for="pet">Preferred pet:</label>
         <div class="col-sm-10">
          <select pf-select ng-model="pet" id="pet" ng-options="o as o for o in pets"></select>
         </div>
       </div>

       <div class="form-group">
         <label class="col-sm-2 control-label" for="fruit">Preferred fruit:</label>
         <div class="col-sm-10">
           <select pf-select ng-model="fruit" id="fruit">
             <option value="orange">Orange</option>
             <option value="apple" ng-selected="true" selected>Apple</option>
             <option value="banana">Banana</option>
           </select>
         </div>
       </div>

       <div class="form-group">
         <label class="col-sm-2 control-label" for="drink">Preferred drink:</label>
         <div class="col-sm-10">
           <select pf-select="{ noneSelectedText: 'None' }" ng-model="drink" id="drink" ng-options="o as o for o in drinks">
             <option value="">No drink selected</option>
           </select>
         </div>
       </div>

     </form>

     <p>Your preferred pet is {{pet}}.</p>

     </div>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.select' ).controller( 'SelectDemoCtrl', function( $scope ) {
       $scope.drinks = ['tea', 'coffee', 'water'];
       $scope.pets = ['Dog', 'Cat', 'Chicken'];
       $scope.pet = $scope.pets[0];
       $scope.fruit = 'orange';
     });
   </file>

 </example>
 */
angular.module('patternfly.select', []).directive('pfSelect', ["$timeout", function ($timeout) {
  'use strict';

  return {
    restrict: 'A',
    require: '?ngModel',
    scope: {
      selectPickerOptions: '=pfSelect'
    },
    link: function (scope, element, attrs, ngModel) {
      var optionCollectionList, optionCollection, $render = ngModel.$render;

      var selectpickerRefresh = function (argument) {
        scope.$applyAsync(function () {
          element.selectpicker('refresh');
        });
      };

      element.selectpicker(scope.selectPickerOptions);

      ngModel.$render = function () {
        $render.apply(this, arguments);
        selectpickerRefresh();
      };

      if (attrs.ngOptions) {
        optionCollectionList = attrs.ngOptions.split('in ');
        optionCollection = optionCollectionList[optionCollectionList.length - 1];

        scope.$parent.$watchCollection(optionCollection, selectpickerRefresh);
      }

      if (attrs.ngModel) {
        scope.$parent.$watch(attrs.ngModel, selectpickerRefresh);
      }

      attrs.$observe('disabled', selectpickerRefresh);
    }
  };
}]);
;/**
 * @ngdoc directive
 * @name patternfly.sort.directive:pfSort
 *
 * @description
 *   Directive for a  sort component
 *   <br><br>
 *
 * @param {object} config configuration settings for the sort:<br/>
 * <ul style='list-style-type: none'>
 * <li>.fields          - (Array) List of sortable fields containing:
 * <ul style='list-style-type: none'>
 * <li>.id          - (String) Unique Id for the sort field
 * <li>.title       - (String) The title to display for the sort field
 * <li>.sortType    - (String) The sort type, 'alpha' or 'numeric'
 * </ul>
 * <li>.sortId   - (Object) Id of the current sort field
 * <li>.isAscending - (boolean) Current sort direction is ascending. True for ascending, False for descending
 * <li>.onSortChange - ( function(sortId, sortDirection ) Function to call when the current sort params change
 * </ul>
 *
 * @example
<example module="patternfly.sort">
  <file name="index.html">
    <div ng-controller="ViewCtrl" class="row example-container">
      <div class="col-md-12">
        <div pf-sort id="exampleSort" config="sortConfig"></div>
      </div>
      <hr class="col-md-12">
      <div class="col-md-12">
        <label class="events-label">Items: </label>
      </div>
      <div class="col-md-12">
        <div ng-repeat="item in items" class="col-md-12 cfme-row-column">
          <div class="row">
            <div class="col-md-3">
              <span>{{item.name}}</span>
            </div>
            <div class="col-md-3">
              <span>{{item.count}}</span>
            </div>
            <div class="col-md-3">
              <span>{{item.description}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </file>

  <file name="script.js">
    angular.module('patternfly.sort').controller('ViewCtrl', ['$scope',
      function ($scope) {
        $scope.items = [
          {
            name: "Item 7",
            count: 432,
            description: 'Very nice item'
          },
          {
            name: "Item 6",
            count: 22,
            description: 'It lasts forever'
          },
          {
            name: "Item 3",
            count: 632,
            description: 'Good stuff cheap'
          },
          {
            name: "Item 2",
            count: 12,
            description: 'Fantastic'
          },
          {
            name: "Item 9",
            count: 99,
            description: 'It does alright'
          },
          {
            name: "Item 4",
            count: 442,
            description: 'Horrible'
          },
          {
            name: "Item 1",
            count: 42,
            description: 'Most excellent'
          },
          {
            name: "Item 8",
            count: 2,
            description: 'Get it while it lasts'
          },
          {
            name: "Item 5",
            count: 321,
            description: 'Beautiful style'
          }
        ];

        var compareFn = function(item1, item2) {
          var compValue = 0;
          if ($scope.sortConfig.currentField.id === 'name') {
            compValue = item1.name.localeCompare(item2.name);
          } else if ($scope.sortConfig.currentField.id === 'count') {
              compValue = item1.count - item2.count;
          } else if ($scope.sortConfig.currentField.id === 'description') {
            compValue = item1.description.localeCompare(item2.description);
          }

          if (!$scope.sortConfig.isAscending) {
            compValue = compValue * -1;
          }

          return compValue;
        };

        var sortChange = function (sortId, isAscending) {
          $scope.items.sort(compareFn);
        };

        $scope.sortConfig = {
          fields: [
            {
              id: 'name',
              title:  'Name',
              sortType: 'alpha'
            },
            {
              id: 'count',
              title:  'Count',
              sortType: 'numeric'
            },
            {
              id: 'description',
              title:  'Description',
              sortType: 'alpha'
            }
          ],
          onSortChange: sortChange
        };
      }
    ]);
  </file>
</example>
 */
angular.module('patternfly.sort').directive('pfSort', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      config: '='
    },
    templateUrl: 'sort/sort.html',
    controller: ["$scope", function ($scope) {

      $scope.setupConfig = function () {
        var updated = false;

        if ($scope.config.fields === undefined) {
          $scope.config.fields = [];
        }

        if ($scope.config.fields.length > 0) {
          if ($scope.config.currentField === undefined) {
            $scope.config.currentField = $scope.config.fields[0];
            updated = true;
          }
          if ($scope.config.isAscending === undefined) {
            $scope.config.isAscending = true;
            updated = true;
          }
        }

        if (updated === true && $scope.config.onSortChange) {
          $scope.config.onSortChange($scope.config.currentField, $scope.config.isAscending);
        }
      };

      $scope.selectField = function (field) {
        $scope.config.currentField = field;

        if ($scope.config.onSortChange) {
          $scope.config.onSortChange($scope.config.currentField, $scope.config.isAscending);
        }
      };

      $scope.changeDirection = function () {
        $scope.config.isAscending = !$scope.config.isAscending;

        if ($scope.config.onSortChange) {
          $scope.config.onSortChange($scope.config.currentField, $scope.config.isAscending);
        }
      };

      $scope.getSortIconClass = function () {
        var iconClass;

        if ($scope.config.currentField.sortType === 'numeric') {
          if ($scope.config.isAscending) {
            iconClass = 'fa fa-sort-numeric-asc';
          } else {
            iconClass = 'fa fa-sort-numeric-desc';
          }
        } else {
          if ($scope.config.isAscending) {
            iconClass = 'fa fa-sort-alpha-asc';
          } else {
            iconClass = 'fa fa-sort-alpha-desc';
          }
        }

        return iconClass;
      };

      $scope.setupConfig();
    }],

    link: function (scope, element, attrs) {
      scope.$watch('config', function () {
        scope.setupConfig();
      }, true);
    }
  };
});
;/**
 * @ngdoc directive
 * @name patternfly.toolbars.directive:pfToolbar
 *
 * @description
 *   Directive for standard toolbar. Includes filtering and view selection capabilities
 *   <br><br>
 *
 * @param {object} config configuration settings for the toolbar:<br/>
 *   <ul style='list-style-type: none'>
 *     <li>.filterConfig  - (Object) Optional filter config. If undefined, no filtering capabilities are shown.
 *                          See pfSimpleFilter for filter config options.
 *     <li>.sortConfig  - (Object) Optional sort config. If undefined, no sort capabilities are shown.
 *                          See pfSort for sort config options.
 *     <li>.viewsConfig  - (Object) Optional configuration settings for view type selection
 *       <ul style='list-style-type: none'>
 *         <li>.views       - (Array) List of available views for selection. See pfViewUtils for standard available views
 *           <ul style='list-style-type: none'>
 *             <li>.id - (String) Unique id for the view, used for comparisons
 *             <li>.title - (String) Optional title, uses as a tooltip for the view selector
 *             <li>.iconClass - (String) Icon class to use for the view selector
 *           </ul>
 *         <li>.onViewSelect - ( function(view) ) Function to call when a view is selected
 *         <li>.currentView - the id of the currently selected view
 *       </ul>
 *     <li>.actionsConfig  - (Object) Optional configuration settings for toolbar actions
 *       <ul style='list-style-type: none'>
 *         <li>.primaryActions  - (Array) List of primary actions to display on the toolbar
 *           <ul style='list-style-type: none'>
 *             <li>.name - (String) The name of the action, displayed on the button
 *             <li>.title - (String) Optional title, used for the tooltip
 *             <li>.actionFn - (function(action)) Function to invoke when the action selected
 *             <li>.isDisabled - (Boolean) set to true to disable the action
 *           </ul>
 *         <li>.moreActions  - (Array) List of secondary actions to display on the toolbar action pulldown menu
 *           <ul style='list-style-type: none'>
 *             <li>.name - (String) The name of the action, displayed on the button
 *             <li>.title - (String) Optional title, used for the tooltip
 *             <li>.actionFn - (function(action)) Function to invoke when the action selected
 *             <li>.isDisabled - (Boolean) set to true to disable the action
 *             <li>.isSeparator - (Boolean) set to true if this is a placehodler for a separator rather than an action
 *           </ul>
 *       </ul>
 *   </ul>
 *
 * @example
<example module="patternfly.toolbars" deps="patternfly.filters, patternfly.sort, patternfly.views">
  <file name="index.html">
    <div ng-controller="ViewCtrl" class="row example-container">
      <div class="col-md-12">
        <div pf-toolbar id="exampleToolbar" config="toolbarConfig"></div>
      </div>
      <hr class="col-md-12">
      <div class="col-md-12">
        <label class="events-label">Valid Items: </label>
      </div>
      <div class="col-md-12 list-view-container" ng-if="viewType == 'listView'">
        <div pf-list-view config="listConfig" items="items">
          <div class="list-view-pf-description">
            <div class="list-group-item-heading">
              {{item.name}}
            </div>
            <div class="list-group-item-text">
              {{item.address}}
            </div>
          </div>
          <div class="list-view-pf-additional-info">
            <div class="list-view-pf-additional-info-item">
              {{item.age}}
            </div>
            <div class="list-view-pf-additional-info-item">
              {{item.birthMonth}}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 card-view-container" ng-if="viewType == 'cardView'">
        <div pf-card-view config="vm.listConfig" items="items">
          <div class="col-md-12">
            <span>{{item.name}}</span>
          </div>
          <div class="col-md-12">
            <span>{{item.address}}</span>
          </div>
          <div class="col-md-12">
            <span>{{item.birthMonth}}</span>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <label class="events-label">Current Filters: </label>
      </div>
      <div class="col-md-12">
        <textarea rows="5" class="col-md-12">{{filtersText}}</textarea>
      </div>
      <div class="col-md-12">
        <label class="actions-label">Actions: </label>
      </div>
      <div class="col-md-12">
        <textarea rows="3" class="col-md-12">{{actionsText}}</textarea>
      </div>
    </div>
  </file>

  <file name="script.js">
  angular.module('patternfly.toolbars').controller('ViewCtrl', ['$scope', 'pfViewUtils',
    function ($scope, pfViewUtils) {
      $scope.filtersText = '';

      $scope.allItems = [
        {
          name: "Fred Flintstone",
          age: 57,
          address: "20 Dinosaur Way, Bedrock, Washingstone",
          birthMonth: 'February'
        },
        {
          name: "John Smith",
          age: 23,
          address: "415 East Main Street, Norfolk, Virginia",
          birthMonth: 'October'
        },
        {
          name: "Frank Livingston",
          age: 71,
          address: "234 Elm Street, Pittsburgh, Pennsylvania",
          birthMonth: 'March'
        },
        {
          name: "Judy Green",
          age: 21,
          address: "2 Apple Boulevard, Cincinatti, Ohio",
          birthMonth: 'December'
        },
        {
          name: "Pat Thomas",
          age: 19,
          address: "50 Second Street, New York, New York",
          birthMonth: 'February'
        }
      ];
      $scope.items = $scope.allItems;

      var matchesFilter = function (item, filter) {
        var match = true;

        if (filter.id === 'name') {
          match = item.name.match(filter.value) !== null;
        } else if (filter.id === 'age') {
          match = item.age === parseInt(filter.value);
        } else if (filter.id === 'address') {
          match = item.address.match(filter.value) !== null;
        } else if (filter.id === 'birthMonth') {
          match = item.birthMonth === filter.value;
        }
        return match;
      };

      var matchesFilters = function (item, filters) {
        var matches = true;

        filters.forEach(function(filter) {
          if (!matchesFilter(item, filter)) {
            matches = false;
            return false;
          }
        });
        return matches;
      };

      var applyFilters = function (filters) {
        $scope.items = [];
        if (filters && filters.length > 0) {
          $scope.allItems.forEach(function (item) {
            if (matchesFilters(item, filters)) {
              $scope.items.push(item);
            }
          });
        } else {
          $scope.items = $scope.allItems;
        }
      };

      var filterChange = function (filters) {
      $scope.filtersText = "";
        filters.forEach(function (filter) {
          $scope.filtersText += filter.title + " : " + filter.value + "\n";
        });
        applyFilters(filters);
        $scope.toolbarConfig.filterConfig.resultsCount = $scope.items.length;
      };

      $scope.filterConfig = {
        fields: [
          {
            id: 'name',
            title:  'Name',
            placeholder: 'Filter by Name...',
            filterType: 'text'
          },
          {
            id: 'age',
            title:  'Age',
            placeholder: 'Filter by Age...',
            filterType: 'text'
          },
          {
            id: 'address',
            title:  'Address',
            placeholder: 'Filter by Address...',
            filterType: 'text'
          },
          {
            id: 'birthMonth',
            title:  'Birth Month',
            placeholder: 'Filter by Birth Month...',
            filterType: 'select',
            filterValues: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          }
        ],
        resultsCount: $scope.items.length,
        appliedFilters: [],
        onFilterChange: filterChange
      };

      var viewSelected = function(viewId) {
        $scope.viewType = viewId
      };

      $scope.viewsConfig = {
        views: [pfViewUtils.getListView(), pfViewUtils.getCardView()],
        onViewSelect: viewSelected
      };
      $scope.viewsConfig.currentView = $scope.viewsConfig.views[0].id;
      $scope.viewType = $scope.viewsConfig.currentView;

      var monthVals = {
        'January': 1,
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,
        'June': 6,
        'July': 7,
        'August': 8,
        'September': 9,
        'October': 10,
        'November': 11,
        'December': 12
      };
      var compareFn = function(item1, item2) {
        var compValue = 0;
        if ($scope.sortConfig.currentField.id === 'name') {
          compValue = item1.name.localeCompare(item2.name);
        } else if ($scope.sortConfig.currentField.id === 'age') {
            compValue = item1.age - item2.age;
        } else if ($scope.sortConfig.currentField.id === 'address') {
          compValue = item1.address.localeCompare(item2.address);
        } else if ($scope.sortConfig.currentField.id === 'birthMonth') {
          compValue = monthVals[item1.birthMonth] - monthVals[item2.birthMonth];
        }

        if (!$scope.sortConfig.isAscending) {
          compValue = compValue * -1;
        }

        return compValue;
      };

      var sortChange = function (sortId, isAscending) {
        $scope.items.sort(compareFn);
      };

      $scope.sortConfig = {
        fields: [
          {
            id: 'name',
            title:  'Name',
            sortType: 'alpha'
          },
          {
            id: 'age',
            title:  'Age',
            sortType: 'numeric'
          },
          {
            id: 'address',
            title:  'Address',
            sortType: 'alpha'
          },
          {
            id: 'birthMonth',
            title:  'Birth Month',
            sortType: 'alpha'
          }
        ],
        onSortChange: sortChange
      };

      $scope.actionsText = "";
      var performAction = function (action) {
        $scope.actionsText = action.name + "\n" + $scope.actionsText;
      };

      $scope.actionsConfig = {
        primaryActions: [
          {
            name: 'Action 1',
            title: 'Do the first thing',
            actionFn: performAction
          },
          {
            name: 'Action 2',
            title: 'Do something else',
            actionFn: performAction
          }
        ],
        moreActions: [
          {
            name: 'Action',
            title: 'Perform an action',
            actionFn: performAction
          },
          {
            name: 'Another Action',
            title: 'Do something else',
            actionFn: performAction
          },
          {
            name: 'Disabled Action',
            title: 'Unavailable action',
            actionFn: performAction,
            isDisabled: true
          },
          {
            name: 'Something Else',
            title: '',
            actionFn: performAction
          },
          {
            isSeparator: true
          },
          {
            name: 'Grouped Action 1',
            title: 'Do something',
            actionFn: performAction
          },
          {
            name: 'Grouped Action 2',
            title: 'Do something similar',
            actionFn: performAction
          }
        ]
      };

      $scope.toolbarConfig = {
        viewsConfig: $scope.viewsConfig,
        filterConfig: $scope.filterConfig,
        sortConfig: $scope.sortConfig,
        actionsConfig: $scope.actionsConfig
      };

      $scope.listConfig = {
        selectionMatchProp: 'name',
        checkDisabled: false
      };
    }
  ]);
  </file>
</example>
 */
angular.module('patternfly.toolbars').directive('pfToolbar', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      config: '='
    },
    replace: true,
    transclude: false,
    templateUrl: 'toolbars/toolbar.html',
    controller: ["$scope", function ($scope) {
      $scope.viewSelected = function (viewId) {
        $scope.config.viewsConfig.currentView = viewId;
        if ($scope.config.viewsConfig.onViewSelect && !$scope.checkViewDisabled(viewId)) {
          $scope.config.viewsConfig.onViewSelect(viewId);
        }
      };

      $scope.isViewSelected = function (viewId) {
        return $scope.config.viewsConfig && ($scope.config.viewsConfig.currentView === viewId);
      };

      $scope.checkViewDisabled = function (view) {
        return $scope.config.viewsConfig.checkViewDisabled && $scope.config.viewsConfig.checkViewDisabled(view);
      };

      $scope.filterExists = function (filter) {
        var foundFilter = _.findWhere($scope.config.filterConfig.appliedFilters, {title: filter.title, value: filter.value});
        return foundFilter !== undefined;
      };

      $scope.addFilter = function (field, value) {
        var newFilter = {
          id: field.id,
          title: field.title,
          value: value
        };
        if (!$scope.filterExists(newFilter)) {
          $scope.config.filterConfig.appliedFilters.push(newFilter);

          if ($scope.config.filterConfig.onFilterChange) {
            $scope.config.filterConfig.onFilterChange($scope.config.filterConfig.appliedFilters);
          }
        }
      };

      $scope.handleAction = function (action) {
        if (action && action.actionFn && (action.isDisabled !== true)) {
          action.actionFn(action);
        }
      };
    }],

    link: function (scope, element, attrs) {
      scope.$watch('config', function () {
        if (scope.config && scope.config.viewsConfig && scope.config.viewsConfig.views) {
          scope.config.viewsConfig.viewsList = angular.copy(scope.config.viewsConfig.views);

          if (!scope.config.viewsConfig.currentView) {
            scope.config.viewsConfig.currentView = scope.config.viewsConfig.viewsList[0];
          }
        }
      }, true);
    }
  };
});
;
/**
 * @ngdoc directive
 * @name patternfly.utils.directive:pfTransclude
 * @restrict A
 * @element ANY
 * @param {string} pfTransclude specifies the type of transclusion to use.<br/>
 * <strong>Values:</strong>
 * <ul style='list-style-type: none'>
 * <li> 'sibling' - The transcluded contents scope is a sibling one to the element where transclusion happens (default)
 * <li> 'parent'  - The transcluded contents scope is that of the element where transclusion happens.
 * <li> 'child'   - The transcluded contents scope is child scope to the scope of the element where transclusion happens.
 * </ul>
 *
 * @description
 *   Directive for transcluding in directives and setting up scope of children of parent directives. This is a workaround
 *   for https://github.com/angular/angular.js/issues/5489
 *
 * @example
<example module="patternfly.utils">
  <file name="index.html">
    <div ng-controller="UtilCtrl" class="row pf-transclude-example" style="display:inline-block; width: 100%;">
      <span>Here the scope id is: <id>{{$id}}</id></span>

      <transclude-sibling class="pf-transclude-example">
        <pre>This content was transcluded using <b>pf-transclude</b> or <b>pf-transclude="sibling"</b>.</pre><pre>Its scope is: <id>{{$id}}</id> the parent of which is <id>{{$parent.$id}}</id></pre>
      </transclude-sibling>

      <transclude-parent>
        <pre>This content was transcluded using <b>pf-transclude="parent"</b>.</pre><pre>Its scope is: <id>{{$id}}</id> the parent of which is <id>{{$parent.$id}}</id></pre>
      </transclude-parent>

      <transclude-child>
        <pre>This content was transcluded using <b>pf-transclude="child"</b>.</pre><pre>Its scope is: <id>{{$id}}</id> the parent of which is <id>{{$parent.$id}}</id></pre>
      </transclude-child>
    </div>
  </file>

  <file name="script.js">
    angular.module('patternfly.utils')
      .controller( 'UtilCtrl', function($scope) {

      })

      .config(function($provide){
          $provide.decorator('ngTranscludeDirective', ['$delegate', function($delegate) {
              // Remove the original directive
              $delegate.shift();
              return $delegate;
          }]);
      })

      .directive( 'transcludeSibling', function() {
        return {
          restrict: 'E',
          transclude: true,
          scope: {},
          template:
            '<div>' +
              '<p>I am a directive with scope <id>{{$id}}</id></p>' +
              '<span pf-transclude></span>' +
            '</div>'
        }
      })

      .directive( 'transcludeParent', function() {
        return {
          restrict: 'E',
          transclude: true,
          scope: {},
          template:
            '<div>' +
              '<p>I am a directive with scope <id>{{$id}}</id></p>' +
              '<span pf-transclude="parent"></span>' +
            '</div>'
        }
      })

      .directive( 'transcludeChild', function() {
        return {
          restrict: 'E',
          transclude: true,
          scope: {},
          template:
            '<div>' +
              '<p>I am a directive with scope <id>{{$id}}</id></p>' +
              '<span pf-transclude="child"></span>' +
            '</div>'
        }
      })
    ;
  </file>
</example>
 */
angular
  .module('patternfly.utils').directive('pfTransclude', function () {
    'use strict';
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs, controller, $transclude) {
        var iChildScope;
        var iScopeType;

        if (!$transclude) {
          throw new Error('pfTransclude - ' +
          'Illegal use of pfTransclude directive in the template! ' +
          'No parent directive that requires a transclusion found. ' +
          'Element: {0}');
        }

        iScopeType = $attrs.pfTransclude || 'sibling';

        switch (iScopeType) {
        case 'sibling':
          $transclude(function (clone) {
            $element.empty();
            $element.append(clone);
          });
          break;
        case 'parent':
          $transclude($scope, function (clone) {
            $element.empty();
            $element.append( clone );
          });
          break;
        case 'child':
          iChildScope = $scope.$new();
          $transclude( iChildScope, function (clone) {
            $element.empty();
            $element.append( clone );
            $element.on( '$destroy', function () {
              iChildScope.$destroy();
            });
          });
          break;
        }
      }
    };
  });
;(function () {
  'use strict';

  angular.module('patternfly.utils').constant('pfUtils', {
    merge: function (source1, source2) {
      var retValue;

      if (typeof angular.merge === 'function') {
        retValue = this.angularMerge(source1, source2);
      } else if (typeof _.merge === 'function') {
        retValue = this._merge(source1, source2);
      } else if (typeof $.extend === 'function') {
        retValue = this.$extend(source1, source2);
      } else {
        retValue = this.mergeDeep(source1, source2);
      }

      return retValue;
    },
    angularMerge: function (source1, source2) {
      return angular.merge({}, source1, source2);
    },
    _merge: function (source1, source2) {
      return _.merge({}, source1, source2);
    },
    $extend: function (source1, source2) {
      return $.extend(true, angular.copy(source1), source2);
    },
    mergeDeep: function (source1, source2) {
      return mergeDeep({}, angular.copy(source1), angular.copy(source2));
    }
  });
})();

/* This function does not merge/concat Arrays.
 * It replaces the earlier Array with any latter Array.
 */
function mergeDeep (dst) {
  'use strict';
  angular.forEach(arguments, function (obj) {
    if (obj !== dst) {
      angular.forEach(obj, function (value, key) {
        if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
          mergeDeep(dst[key], value);
        } else {
          dst[key] = value;
        }
      });
    }
  });
  return dst;
}
;/**
 * @ngdoc directive
 * @name patternfly.validation:pfValidation
 * @restrict E
 * @element INPUT
 * @scope
 *
 * @description
 * Directive used for input validation based on custom function.
 *
 * @param {expression=} pfValidationDisabled If true, the validation is disabled, it is enabled otherwise.
 *
 * @example
 <example module="patternfly.validation">

   <file name="index.html">
     <div ng-controller="ValidationDemoCtrl">
     <form class="form-horizontal">

       <div class="form-group">
         <label class="col-sm-2 control-label" for="message">Initially valid:</label>
         <div class="col-sm-10">
           <input class="form-control" type="text" ng-model="myValueValid" pf-validation="isNumber(input)"/>
           <span class="help-block">The value you typed is not a number.</span>
         </div>
       </div>

       <div class="form-group">
         <label class="col-sm-2 control-label" for="message">Fixed Number:</label>
         <div class="col-sm-10">
           <input class="form-control" type="text" ng-model="myValue" pf-validation="isNumber(input)"/>
           <span class="help-block">The value you typed is not a number.</span>
         </div>
       </div>

       <div class="form-group">
         <label class="col-sm-2 control-label" for="message">Number:</label>
         <div class="col-sm-10">
           <input class="form-control" type="text" ng-model="myValue" pf-validation="isNumber(input)" pf-validation-disabled="isValidationDisabled"/>
           <span class="help-block">The value you typed is not a number.</span>
         </div>
       </div>

       <div class="form-group">
         <label class="col-sm-2 control-label" for="message">Validation disabled:</label>
         <div class="col-sm-10">
           <input class="form-control" type="checkbox" ng-model="isValidationDisabled"/>
         </div>
       </div>
     </form>
     </div>
   </file>

   <file name="script.js">
     angular.module( 'patternfly.validation' ).controller( 'ValidationDemoCtrl', function( $scope ) {
       $scope.myValue = "Change this value to be a number";
       $scope.myValueValid = 42;
       $scope.isValidationDisabled = false;

       $scope.isNumber = function (value) {
         if (isNaN(value)) {
           return false;
         }

         return true;
       }
     });
   </file>

 </example>
 */
angular.module('patternfly.validation', []).directive('pfValidation', ["$timeout", function ($timeout) {
  'use strict';

  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      pfValidation: '&',
      pfValidationDisabled: '='
    },
    link: function (scope, element, attrs, ctrl) {

      scope.inputCtrl = ctrl;
      scope.valEnabled = !attrs.pfValidationDisabled;

      scope.$watch('pfValidationDisabled', function (newVal) {
        scope.valEnabled = !newVal;
        if (newVal) {
          scope.inputCtrl.$setValidity('pfValidation', true);
          toggleErrorClass(false);
        } else {
          validate();
        }
      });

      // If validation function is set
      if (attrs.pfValidation) {
        // using $timeout(0) to get the actual $modelValue
        $timeout(function () {
          validate();
        }, 0);
      } else if (!scope.inputCtrl.$valid && scope.inputCtrl.$dirty) {
        toggleErrorClass(true);
      }

      scope.$watch('inputCtrl.$valid', function (isValid) {
        if (isValid) {
          toggleErrorClass(false);
        } else {
          toggleErrorClass(true);
        }
      });

      scope.$watch('inputCtrl.$modelValue', function () {
        validate();
      });

      function validate () {
        var valid;

        var val = scope.inputCtrl.$modelValue;

        var valFunc = scope.pfValidation({'input': val});

        if (!attrs.pfValidation) {
          valFunc = true;
        }

        valid = !val || valFunc  || val === '';

        if (scope.valEnabled && !valid) {
          toggleErrorClass(true);
        } else {
          toggleErrorClass(false);
        }
      }

      function toggleErrorClass (add) {
        var messageElement = element.next();
        var parentElement = element.parent();
        var hasErrorM = parentElement.hasClass('has-error');
        var wasHidden = messageElement.hasClass('ng-hide');

        scope.inputCtrl.$setValidity('pf-validation', !add);

        if (add) {
          if (!hasErrorM) {
            parentElement.addClass('has-error');
          }
          if (wasHidden) {
            messageElement.removeClass('ng-hide');
          }
        }

        if (!add) {
          if (hasErrorM) {
            parentElement.removeClass('has-error');
          }
          if (!wasHidden) {
            messageElement.addClass('ng-hide');
          }
        }
      }
    }
  };
}]);
;/**
 * @ngdoc directive
 * @name patternfly.views.directive:pfCardView
 *
 * @description
 *   Directive for rendering cards in a view
 *   <br><br>
 *
 * @param {object} config configuration settings for the cards:<br/>
 * <ul style='list-style-type: none'>
 * <li>.showSelectBox          - (boolean) Show item selection boxes for each item, default is true
 * <li>.selectItems            - (boolean) Allow card selection, default is false
 * <li>.dlbClick               - (boolean) Handle double clicking (item remains selected on a double click). Default is false.
 * <li>.multiSelect            - (boolean) Allow multiple card selections, selectItems must also be set, not applicable when dblClick is true. Default is false
 * <li>.selectionMatchProp     - (string) Property of the items to use for determining matching, default is 'uuid'
 * <li>.selectedItems          - (array) Current set of selected items
 * <li>.checkDisabled          - ( function(item) ) Function to call to determine if an item is disabled, default is none
 * <li>.onCheckBoxChange       - ( function(item) ) Called to notify when a checkbox selection changes, default is none
 * <li>.onSelect               - ( function(item, event) ) Called to notify of item selection, default is none
 * <li>.onSelectionChange      - ( function(items) ) Called to notify when item selections change, default is none
 * <li>.onClick                - ( function(item, event) ) Called to notify when an item is clicked, default is none
 * <li>.onDblClick             - ( function(item, event) ) Called to notify when an item is double clicked, default is none
 * </ul>
 *
 * @param {Array} items the data to be shown in the cards<br/>
 *
 * @example
 <example module="patternfly.views" deps="patternfly.utils">
 <file name="index.html">
   <style>
     hr {
      display: block;
      height: 10px;
      border: 0;
      border-top: 1px solid #525252;
      margin: 1em 0;
      padding: 0;
     }
   </style>
   <div ng-controller="ViewCtrl" class="row" style="display:inline-block; width: 100%;">
     <div class="col-md-12">
       <div pf-card-view id="exampleCardView" config="config" items="items">
         <div class="col-md-12">
           <span>{{item.name}}</span>
         </div>
         <div class="col-md-12">
           <span>{{item.address}}</span>
         </div>
         <div class="col-md-12">
           <span>{{item.city}}, {{item.state}}</span>
         </div>
       </div>
     </div>
     <hr class="col-md-12">
     <div class="col-md-12">
       <form role="form">
         <div class="form-group">
           <label>Selection</label>
           </br>
           <label class="radio-inline">
             <input type="radio" ng-model="selectType" value="checkbox" ng-change="updateSelectionType()">Checkbox</input>
           </label>
           <label class="radio-inline">
             <input type="radio" ng-model="selectType" value="card" ng-change="updateSelectionType()">Card</input>
           </label>
           <label class="radio-inline">
             <input type="radio" ng-model="selectType" value="none" ng-change="updateSelectionType()">None</input>
           </label>
         </div>
       </form>
     </div>
     <div class="col-md-12">
       <form role="form">
         <div class="form-group">
           <label class="checkbox-inline">
             <input type="checkbox" ng-model="config.dblClick" ng-disabled="!config.selectItems">Double Click</input>
           </label>
           <label class="checkbox-inline">
             <input type="checkbox" ng-model="config.multiSelect" ng-disabled="config.dblClick || !config.selectItems">Multi Select</input>
           </label>
         </div>
       </form>
     </div>
     <div class="col-md-12">
       <form role="form">
         <div class="form-group">
           <label class="checkbox-inline">
             <input type="checkbox" ng-model="showDisabled">Show Disabled Cards</input>
           </label>
         </div>
       </form>
     </div>
     <div class="col-md-12">
       <label class="events-label">Events: </label>
     </div>
     <div class="col-md-12">
       <textarea rows="10" class="col-md-12">{{eventText}}</textarea>
     </div>
   </div>
 </file>

 <file name="script.js">
 angular.module('patternfly.views').controller('ViewCtrl', ['$scope',
 function ($scope) {
        $scope.eventText = '';
        var handleSelect = function (item, e) {
          $scope.eventText = item.name + ' selected\n' + $scope.eventText;
        };
        var handleSelectionChange = function (selectedItems, e) {
          $scope.eventText = selectedItems.length + ' items selected\n' + $scope.eventText;
        };
        var handleClick = function (item, e) {
          $scope.eventText = item.name + ' clicked\n' + $scope.eventText;
        };
        var handleDblClick = function (item, e) {
          $scope.eventText = item.name + ' double clicked\n' + $scope.eventText;
        };
        var handleCheckBoxChange = function (item, selected, e) {
          $scope.eventText = item.name + ' checked: ' + item.selected + '\n' + $scope.eventText;
        };

        var checkDisabledItem = function(item) {
          return $scope.showDisabled && (item.name === "John Smith");
        };

        $scope.selectType = 'checkbox';
        $scope.updateSelectionType = function() {
          if ($scope.selectType === 'checkbox') {
            $scope.config.selectItems = false;
            $scope.config.showSelectBox = true;
          } else if ($scope.selectType === 'card') {
            $scope.config.selectItems = true;
            $scope.config.showSelectBox = false;
          } else {
            $scope.config.selectItems = false
            $scope.config.showSelectBox = false;
          }
        };

        $scope.showDisabled = false;

        $scope.config = {
         selectItems: false,
         multiSelect: false,
         dblClick: false,
         selectionMatchProp: 'name',
         selectedItems: [],
         checkDisabled: checkDisabledItem,
         showSelectBox: true,
         onSelect: handleSelect,
         onSelectionChange: handleSelectionChange,
         onCheckBoxChange: handleCheckBoxChange,
         onClick: handleClick,
         onDblClick: handleDblClick
        };

        $scope.items = [
          {
            name: "Fred Flintstone",
            address: "20 Dinosaur Way",
            city: "Bedrock",
            state: "Washingstone"
          },
          {
            name: "John Smith",
            address: "415 East Main Street",
            city: "Norfolk",
            state: "Virginia"
          },
          {
            name: "Frank Livingston",
            address: "234 Elm Street",
            city: "Pittsburgh",
            state: "Pennsylvania"
          },
          {
            name: "Judy Green",
            address: "2 Apple Boulevard",
            city: "Cincinatti",
            state: "Ohio"
          },
          {
            name: "Pat Thomas",
            address: "50 Second Street",
            city: "New York",
            state: "New York"
          },
        ]
      }
 ]);
 </file>
 </example>
 */
angular.module('patternfly.views').directive('pfCardView', ["pfUtils", function (pfUtils) {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      config: '=?',
      items: '=',
      eventId: '@id'
    },
    transclude: true,
    templateUrl: 'views/cardview/card-view.html',
    controller: ["$scope", function ($scope) {
      $scope.defaultConfig = {
        selectItems: false,
        multiSelect: false,
        dblClick: false,
        selectionMatchProp: 'uuid',
        selectedItems: [],
        checkDisabled: false,
        showSelectBox: true,
        onSelect: null,
        onSelectionChange: null,
        onCheckBoxChange: null,
        onClick: null,
        onDblClick: null
      };

      $scope.config = pfUtils.merge($scope.defaultConfig, $scope.config);
      if ($scope.config.selectItems && $scope.config.showSelectBox) {
        throw new Error('pfCardView - ' +
        'Illegal use of pfCardView directive! ' +
        'Cannot allow both select box and click selection in the same card view.');
      }
    }],
    link: function (scope, element, attrs) {
      attrs.$observe('config', function () {
        scope.config = pfUtils.merge(scope.defaultConfig, scope.config);
        if (!scope.config.selectItems) {
          scope.config.selectedItems = [];
        }
        if (!scope.config.multiSelect && scope.config.selectedItems && scope.config.selectedItems.length > 0) {
          scope.config.selectedItems = [scope.config.selectedItems[0]];
        }
      });

      scope.itemClick = function (e, item) {
        var alreadySelected;
        var selectionChanged = false;
        var continueEvent = true;

        // Ignore disabled item clicks completely
        if (scope.checkDisabled(item)) {
          return continueEvent;
        }

        if (scope.config && scope.config.selectItems && item) {
          if (scope.config.multiSelect && !scope.config.dblClick) {

            alreadySelected = _.find(scope.config.selectedItems, function (itemObj) {
              return itemObj === item;
            });

            if (alreadySelected) {
              // already selected so deselect
              scope.config.selectedItems = _.without(scope.config.selectedItems, item);
            } else {
              // add the item to the selected items
              scope.config.selectedItems.push(item);
              selectionChanged = true;
            }
          } else {
            if (scope.config.selectedItems[0] === item) {
              if (!scope.config.dblClick) {
                scope.config.selectedItems = [];
                selectionChanged = true;
              }
              continueEvent = false;
            } else {
              scope.config.selectedItems = [item];
              selectionChanged = true;
            }
          }

          if (selectionChanged && scope.config.onSelect) {
            scope.config.onSelect(item, e);
          }
          if (selectionChanged && scope.config.onSelectionChange) {
            scope.config.onSelectionChange(scope.config.selectedItems, e);
          }
        }
        if (scope.config.onClick) {
          scope.config.onClick(item, e);
        }

        return continueEvent;
      };

      scope.dblClick = function (e, item) {
        if (scope.config.onDblClick) {
          scope.config.onDblClick(item, e);
        }
      };

      scope.checkBoxChange = function (item) {
        if (scope.config.onCheckBoxChange) {
          scope.config.onCheckBoxChange(item);
        }
      };

      scope.isSelected = function (item) {
        var matchProp = scope.config.selectionMatchProp;
        var selected = false;

        if (scope.config.showSelectBox) {
          selected = item.selected;
        } else {
          if (scope.config.selectedItems.length) {
            return _.find(scope.config.selectedItems, function (itemObj) {
              return itemObj[matchProp] === item[matchProp];
            });
          }
        }
        return selected;
      };

      scope.checkDisabled = function (item) {
        return scope.config.checkDisabled && scope.config.checkDisabled(item);
      };
    }
  };
}]);
;/**
 * @ngdoc directive
 * @name patternfly.views.directive:pfListView
 *
 * @description
 *   Directive for rendering a list view.
 *   <br><br>
 *
 * @param {array} items Array of items to display in the list view
 * @param {object} config Configuration settings for the list view:
 * <ul style='list-style-type: none'>
 * <li>.showSelectBox          - (boolean) Show item selection boxes for each item, default is true
 * <li>.selectItems            - (boolean) Allow row selection, default is false
 * <li>.dlbClick               - (boolean) Handle double clicking (item remains selected on a double click). Default is false.
 * <li>.multiSelect            - (boolean) Allow multiple row selections, selectItems must also be set, not applicable when dblClick is true. Default is false
 * <li>.selectionMatchProp     - (string) Property of the items to use for determining matching, default is 'uuid'
 * <li>.selectedItems          - (array) Current set of selected items
 * <li>.checkDisabled          - ( function(item) ) Function to call to determine if an item is disabled, default is none
 * <li>.onCheckBoxChange       - ( function(item) ) Called to notify when a checkbox selection changes, default is none
 * <li>.onSelect               - ( function(item, event) ) Called to notify of item selection, default is none
 * <li>.onSelectionChange      - ( function(items) ) Called to notify when item selections change, default is none
 * <li>.onClick                - ( function(item, event) ) Called to notify when an item is clicked, default is none
 * <li>.onDblClick             - ( function(item, event) ) Called to notify when an item is double clicked, default is none
 * </ul>
 * @param {array} actionButtons List of action buttons in each row
 *   <ul style='list-style-type: none'>
 *     <li>.name - (String) The name of the action, displayed on the button
 *     <li>.title - (String) Optional title, used for the tooltip
 *     <li>.actionFn - (function(action)) Function to invoke when the action selected
 *   </ul>
 * @param {function (action, item))} enableButtonForItemFn function(action, item) Used to enabled/disable an action button based on the current item
 * @param {array} menuActions List of actions for dropdown menu in each row
 *   <ul style='list-style-type: none'>
 *     <li>.name - (String) The name of the action, displayed on the button
 *     <li>.title - (String) Optional title, used for the tooltip
 *     <li>.actionFn - (function(action)) Function to invoke when the action selected
 *     <li>.isVisible - (Boolean) set to false to hide the action
 *     <li>.isDisabled - (Boolean) set to true to disable the action
 *     <li>.isSeparator - (Boolean) set to true if this is a placeholder for a separator rather than an action
 *   </ul>
 * @param {function (action, item))} updateMenuActionForItemFn function(action, item) Used to update a menu action based on the current item
 * @example
<example module="patternfly.views" deps="patternfly.utils">
  <file name="index.html">
    <div ng-controller="ViewCtrl" class="row example-container">
      <div class="col-md-12 list-view-container">
        <div pf-list-view class="example-list-view" id="exampleListView"
                          config="config" items="items"
                          action-buttons="actionButtons"
                          enable-button-for-item-fn="enableButtonForItemFn"
                          menu-actions="menuActions"
                          update-menu-action-for-item-fn="updateMenuActionForItemFn">
          <div class="list-view-pf-description">
            <div class="list-group-item-heading">
              {{item.name}}
            </div>
            <div class="list-group-item-text">
              {{item.address}}
            </div>
          </div>
          <div class="list-view-pf-additional-info">
            <div class="list-view-pf-additional-info-item">
              {{item.city}}
            </div>
            <div class="list-view-pf-additional-info-item">
              {{item.state}}
            </div>
          </div>
        </div>
      </div>
      <hr class="col-md-12">
      <div class="col-md-12">
        <form role="form">
          <div class="form-group">
            <label>Selection</label>
            </br>
            <label class="radio-inline">
              <input type="radio" ng-model="selectType" value="checkbox" ng-change="updateSelectionType()">Checkbox</input>
            </label>
            <label class="radio-inline">
              <input type="radio" ng-model="selectType" value="row" ng-change="updateSelectionType()">Row</input>
            </label>
            <label class="radio-inline">
              <input type="radio" ng-model="selectType" value="none" ng-change="updateSelectionType()">None</input>
            </label>
          </div>
        </form>
      </div>
      <div class="col-md-12">
        <form role="form">
          <div class="form-group">
            <label class="checkbox-inline">
              <input type="checkbox" ng-model="config.dblClick">Double Click</input>
            </label>
            <label class="checkbox-inline">
              <input type="checkbox" ng-model="config.multiSelect" ng-disabled="config.dblClick">Multi Select</input>
            </label>
          </div>
        </form>
      </div>
      <div class="col-md-12">
        <form role="form">
          <div class="form-group">
            <label class="checkbox-inline">
              <input type="checkbox" ng-model="showDisabled">Show Disabled Rows</input>
            </label>
          </div>
        </form>
      </div>
      <div class="col-md-12">
        <label style="font-weight:normal;vertical-align:center;">Events: </label>
      </div>
      <div class="col-md-12">
        <textarea rows="10" class="col-md-12">{{eventText}}</textarea>
      </div>
    </div>
  </file>

  <file name="script.js">
 angular.module('patternfly.views').controller('ViewCtrl', ['$scope',
      function ($scope) {
        $scope.eventText = '';
        var handleSelect = function (item, e) {
          $scope.eventText = item.name + ' selected\r\n' + $scope.eventText;
        };
        var handleSelectionChange = function (selectedItems, e) {
          $scope.eventText = selectedItems.length + ' items selected\r\n' + $scope.eventText;
        };
        var handleClick = function (item, e) {
          $scope.eventText = item.name + ' clicked\r\n' + $scope.eventText;
        };
        var handleDblClick = function (item, e) {
          $scope.eventText = item.name + ' double clicked\r\n' + $scope.eventText;
        };
        var handleCheckBoxChange = function (item, selected, e) {
          $scope.eventText = item.name + ' checked: ' + item.selected + '\r\n' + $scope.eventText;
        };

        var checkDisabledItem = function(item) {
          return $scope.showDisabled && (item.name === "John Smith");
        };

        $scope.enableButtonForItemFn = function(action, item) {
          return (action.name !=='Action 2') || (item.name !== "Frank Livingston");
        };

        $scope.updateMenuActionForItemFn = function(action, item) {
          if (action.name === 'Another Action') {
            action.isVisible = (item.name !== "John Smith");
          }
        };

        $scope.selectType = 'checkbox';
        $scope.updateSelectionType = function() {
          if ($scope.selectType === 'checkbox') {
            $scope.config.selectItems = false;
            $scope.config.showSelectBox = true;
          } else if ($scope.selectType === 'row') {
            $scope.config.selectItems = true;
            $scope.config.showSelectBox = false;
          } else {
            $scope.config.selectItems = false
            $scope.config.showSelectBox = false;
          }
        };

        $scope.showDisabled = false;

        $scope.config = {
         selectItems: false,
         multiSelect: false,
         dblClick: false,
         selectionMatchProp: 'name',
         selectedItems: [],
         checkDisabled: checkDisabledItem,
         showSelectBox: true,
         onSelect: handleSelect,
         onSelectionChange: handleSelectionChange,
         onCheckBoxChange: handleCheckBoxChange,
         onClick: handleClick,
         onDblClick: handleDblClick
        };

        $scope.items = [
          {
            name: "Fred Flintstone",
            address: "20 Dinosaur Way",
            city: "Bedrock",
            state: "Washingstone"
          },
          {
            name: "John Smith",
            address: "415 East Main Street",
            city: "Norfolk",
            state: "Virginia"
          },
          {
            name: "Frank Livingston",
            address: "234 Elm Street",
            city: "Pittsburgh",
            state: "Pennsylvania"
          },
          {
            name: "Linda McGovern",
            address: "22 Oak Street",
            city: "Denver",
            state: "Colorado"
          },
          {
            name: "Jim Beam",
            address: "72 Bourbon Way",
            city: "Nashville",
            state: "Tennessee"
          },
          {
            name: "Holly Nichols",
            address: "21 Jump Street",
            city: "Hollywood",
            state: "California"
          },
          {
            name: "Marie Edwards",
            address: "17 Cross Street",
            city: "Boston",
            state: "Massachusetts"
          },
          {
            name: "Pat Thomas",
            address: "50 Second Street",
            city: "New York",
            state: "New York"
          },
        ];

        var performAction = function (action, item) {
          $scope.eventText = item.name + " : " + action.name + "\r\n" + $scope.eventText;
        };

        $scope.actionButtons = [
          {
            name: 'Action 1',
            title: 'Perform an action',
            actionFn: performAction
          },
          {
            name: 'Action 2',
            title: 'Do something else',
            actionFn: performAction
          }
        ];
        $scope.menuActions = [
          {
            name: 'Action',
            title: 'Perform an action',
            actionFn: performAction
          },
          {
            name: 'Another Action',
            title: 'Do something else',
            actionFn: performAction
          },
          {
            name: 'Disabled Action',
            title: 'Unavailable action',
            actionFn: performAction,
            isDisabled: true
          },
          {
            name: 'Something Else',
            title: '',
            actionFn: performAction
          },
          {
            isSeparator: true
          },
          {
            name: 'Grouped Action 1',
            title: 'Do something',
            actionFn: performAction
          },
          {
            name: 'Grouped Action 2',
            title: 'Do something similar',
            actionFn: performAction
          }
        ];
      }
    ]);
  </file>
</example>
 */
angular.module('patternfly.views').directive('pfListView', ["$timeout", "$window", "pfUtils", function ($timeout, $window, pfUtils) {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      config: '=?',
      items: '=',
      actionButtons: '=?',
      enableButtonForItemFn: '=?',
      menuActions: '=?',
      updateMenuActionForItemFn: '=?',
      actions: '=?',
      updateActionForItemFn: '=?'
    },
    transclude: true,
    templateUrl: 'views/listview/list-view.html',
    controller:
      ["$scope", "$element", function ($scope, $element) {
        var setDropMenuLocation = function (parentDiv) {
          var dropButton = parentDiv.querySelector('.dropdown-toggle');
          var dropMenu =  parentDiv.querySelector('.dropdown-menu');
          var parentRect = $element[0].getBoundingClientRect();
          var buttonRect = dropButton.getBoundingClientRect();
          var menuRect = dropMenu.getBoundingClientRect();
          var menuTop = buttonRect.top - menuRect.height;
          var menuBottom = buttonRect.top + buttonRect.height + menuRect.height;

          if ((menuBottom <= parentRect.top + parentRect.height) || (menuTop < parentRect.top)) {
            $scope.dropdownClass = 'dropdown';
          } else {
            $scope.dropdownClass = 'dropup';
          }
        };

        $scope.defaultConfig = {
          selectItems: false,
          multiSelect: false,
          dblClick: false,
          selectionMatchProp: 'uuid',
          selectedItems: [],
          checkDisabled: false,
          showSelectBox: true,
          onSelect: null,
          onSelectionChange: null,
          onCheckBoxChange: null,
          onClick: null,
          onDblClick: null
        };

        $scope.config = pfUtils.merge($scope.defaultConfig, $scope.config);
        if ($scope.config.selectItems && $scope.config.showSelectBox) {
          throw new Error('pfListView - ' +
          'Illegal use of pListView directive! ' +
          'Cannot allow both select box and click selection in the same list view.');
        }
        $scope.dropdownClass = 'dropdown';

        $scope.handleButtonAction = function (action, item) {
          if (!$scope.checkDisabled(item) && action && action.actionFn && $scope.enableButtonForItem(action, item)) {
            action.actionFn(action, item);
          }
        };

        $scope.handleMenuAction = function (action, item) {
          if (!$scope.checkDisabled(item) && action && action.actionFn && (action.isDisabled !== true)) {
            action.actionFn(action, item);
          }
        };

        $scope.enableButtonForItem = function (action, item) {
          var enable = true;
          if (typeof $scope.enableButtonForItemFn === 'function') {
            return $scope.enableButtonForItemFn(action, item);
          }
          return enable;
        };

        $scope.updateActions = function (item) {
          if (typeof $scope.updateMenuActionForItemFn === 'function') {
            $scope.menuActions.forEach(function (action) {
              $scope.updateMenuActionForItemFn(action, item);
            });
          }
        };

        $scope.setupActions = function (item, event) {
          // Ignore disabled items completely
          if ($scope.checkDisabled(item)) {
            return;
          }

          // update the actions based on the current item
          $scope.updateActions(item);

          $timeout(function () {
            var parentDiv = undefined;
            var nextElement;

            nextElement = event.target;
            while (nextElement && !parentDiv) {
              if (nextElement.className.indexOf('dropdown-kebab-pf') !== -1) {
                parentDiv = nextElement;
                if (nextElement.className.indexOf('open') !== -1) {
                  setDropMenuLocation (parentDiv);
                }
              }
              nextElement = nextElement.parentElement;
            }
          });
        };
      }],

    link: function (scope, element, attrs) {
      attrs.$observe('config', function () {
        scope.config = pfUtils.merge(scope.defaultConfig, scope.config);
        if (!scope.config.selectItems) {
          scope.config.selectedItems = [];
        }
        if (!scope.config.multiSelect && scope.config.selectedItems && scope.config.selectedItems.length > 0) {
          scope.config.selectedItems = [scope.config.selectedItems[0]];
        }
      });

      scope.itemClick = function (e, item) {
        var alreadySelected;
        var selectionChanged = false;
        var continueEvent = true;

        // Ignore disabled item clicks completely
        if (scope.checkDisabled(item)) {
          return continueEvent;
        }

        if (scope.config && scope.config.selectItems && item) {
          if (scope.config.multiSelect && !scope.config.dblClick) {

            alreadySelected = _.find(scope.config.selectedItems, function (itemObj) {
              return itemObj === item;
            });

            if (alreadySelected) {
              // already selected so deselect
              scope.config.selectedItems = _.without(scope.config.selectedItems, item);
            } else {
              // add the item to the selected items
              scope.config.selectedItems.push(item);
              selectionChanged = true;
            }
          } else {
            if (scope.config.selectedItems[0] === item) {
              if (!scope.config.dblClick) {
                scope.config.selectedItems = [];
                selectionChanged = true;
              }
              continueEvent = false;
            } else {
              scope.config.selectedItems = [item];
              selectionChanged = true;
            }
          }

          if (selectionChanged && scope.config.onSelect) {
            scope.config.onSelect(item, e);
          }
          if (selectionChanged && scope.config.onSelectionChange) {
            scope.config.onSelectionChange(scope.config.selectedItems, e);
          }
        }
        if (scope.config.onClick) {
          scope.config.onClick(item, e);
        }

        return continueEvent;
      };

      scope.dblClick = function (e, item) {
        // Ignore disabled item clicks completely
        if (scope.checkDisabled(item)) {
          return continueEvent;
        }

        if (scope.config.onDblClick) {
          scope.config.onDblClick(item, e);
        }
      };

      scope.checkBoxChange = function (item) {
        if (scope.config.onCheckBoxChange) {
          scope.config.onCheckBoxChange(item);
        }
      };

      scope.isSelected = function (item) {
        var matchProp = scope.config.selectionMatchProp;
        var selected = false;

        if (scope.config.showSelectBox) {
          selected = item.selected;
        } else if (scope.config.selectItems && scope.config.selectedItems.length) {
          selected = _.find(scope.config.selectedItems, function (itemObj) {
            return itemObj[matchProp] === item[matchProp];
          });
        }
        return selected;
      };

      scope.checkDisabled = function (item) {
        return scope.config.checkDisabled && scope.config.checkDisabled(item);
      };
    }
  };
}]);
;(function () {
  'use strict';

  angular.module('patternfly.views').constant('pfViewUtils', {
    getDashboardView: function (title) {
      return {
        id: 'dashboardView',
        title: title || 'Dashboard View',
        iconClass: 'fa fa-dashboard'
      };
    },
    getCardView: function (title) {
      return {
        id: 'cardView',
        title: title || 'Card View',
        iconClass: 'fa fa-th'
      };
    },
    getListView: function (title) {
      return {
        id: 'listView',
        title: title || 'List View',
        iconClass: 'fa fa-th-list'
      };
    },
    getTableView: function (title) {
      return {
        id: 'tableView',
        title: title || 'Table View',
        iconClass: 'fa fa-table'
      };
    },
    getTopologyView: function (title) {
      return {
        id: 'topologyView',
        title: title || 'Topology View',
        iconClass: 'fa fa-sitemap'
      };
    }
  });
})();
;angular.module('patternfly.card').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('card/aggregate-status/aggregate-status-card.html',
    "<div ng-if=!isMiniLayout class=\"card-pf card-pf-aggregate-status\" ng-class=\"{'card-pf-accented': shouldShowTopBorder, 'card-pf-aggregate-status-alt': isAltLayout}\"><h2 class=card-pf-title><a href={{status.href}} ng-if=status.href><span class={{status.iconClass}}></span> <span class=card-pf-aggregate-status-count>{{status.count}}</span> <span class=card-pf-aggregate-status-title>{{status.title}}</span></a> <span ng-if=!status.href><span class={{status.iconClass}}></span> <span class=card-pf-aggregate-status-count>{{status.count}}</span> <span class=card-pf-aggregate-status-title>{{status.title}}</span></span></h2><div class=card-pf-body><p class=card-pf-aggregate-status-notifications><span class=card-pf-aggregate-status-notification ng-repeat=\"notification in status.notifications\"><a href={{notification.href}} ng-if=notification.href><span class={{notification.iconClass}}></span>{{ notification.count }}</a> <span ng-if=!notification.href><span class={{notification.iconClass}}></span>{{ notification.count }}</span></span></p></div></div><div ng-if=isMiniLayout class=\"card-pf card-pf-aggregate-status card-pf-aggregate-status-mini\" ng-class=\"{'card-pf-accented': shouldShowTopBorder}\"><h2 class=card-pf-title><span ng-if=status.iconClass class={{status.iconClass}}></span> <a ng-if=status.href href={{status.href}}><span class=card-pf-aggregate-status-count>{{status.count}}</span> {{status.title}}</a> <span ng-if=!status.href><span class=card-pf-aggregate-status-count>{{status.count}}</span> {{status.title}}</span></h2><div class=card-pf-body><p ng-if=\"status.notification.iconClass || status.notification.count\" class=card-pf-aggregate-status-notifications><span class=card-pf-aggregate-status-notification><a ng-if=status.notification.href href={{status.notification.href}}><span ng-if=status.notification.iconClass class={{status.notification.iconClass}}></span><span ng-if=status.notification.count>{{status.notification.count}}</span></a> <span ng-if=!status.notification.href><span ng-if=status.notification.iconClass class={{status.notification.iconClass}}></span><span ng-if=status.notification.count>{{status.notification.count}}</span></span></span></p></div></div>"
  );


  $templateCache.put('card/basic/card-filter.html',
    "<button type=button class=\"btn btn-default dropdown-toggle\" data-toggle=dropdown aria-haspopup=true aria-expanded=false>{{currentFilter.label}} <span class=caret></span></button><ul class=\"dropdown-menu dropdown-menu-right\" role=menu><li ng-repeat=\"item in filter.filters\" ng-class=\"{'selected': item === currentFilter}\"><a role=menuitem tabindex=-1 ng-click=filterCallBackFn(item)>{{item.label}}</a></li></ul>"
  );


  $templateCache.put('card/basic/card.html',
    "<div ng-class=\"showTopBorder === 'true' ? 'card-pf card-pf-accented' : 'card-pf'\"><div ng-if=showHeader() ng-class=\"shouldShowTitlesSeparator ? 'card-pf-heading' : 'card-pf-heading-no-bottom'\"><div ng-if=showFilterInHeader() class=\"dropdown card-pf-time-frame-filter\"><div ng-include=\"'card/basic/card-filter.html'\"></div></div><h2 class=card-pf-title>{{headTitle}}</h2></div><span ng-if=subTitle class=card-pf-subtitle>{{subTitle}}</span><div class=card-pf-body><div ng-transclude></div></div><div ng-if=footer class=card-pf-footer><div ng-if=showFilterInFooter() class=\"dropdown card-pf-time-frame-filter\"><div ng-include=\"'card/basic/card-filter.html'\"></div></div><p><a ng-if=footer.href href={{footer.href}} ng-class=\"{'card-pf-link-with-icon':footer.iconClass,'card-pf-link':!footer.iconClass}\"><span ng-if=footer.iconClass class=\"{{footer.iconClass}} card-pf-footer-text\"></span> <span ng-if=footer.text class=card-pf-footer-text>{{footer.text}}</span></a> <a ng-if=\"footer.callBackFn && !footer.href\" ng-click=footerCallBackFn() ng-class=\"{'card-pf-link-with-icon':footer.iconClass,'card-pf-link':!footer.iconClass}\"><span class=\"{{footer.iconClass}} card-pf-footer-text\" ng-if=footer.iconClass></span> <span class=card-pf-footer-text ng-if=footer.text>{{footer.text}}</span></a> <span ng-if=\"!footer.href && !footer.callBackFn\"><span ng-if=footer.iconClass class=\"{{footer.iconClass}} card-pf-footer-text\" ng-class=\"{'card-pf-link-with-icon':footer.iconClass,'card-pf-link':!footer.iconClass}\"></span> <span ng-if=footer.text class=card-pf-footer-text>{{footer.text}}</span></span></p></div></div>"
  );

}]);
;angular.module('patternfly.charts').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('charts/donut/donut-pct-chart.html',
    "<span><div pf-c3-chart id={{donutChartId}} config=config></div></span>"
  );


  $templateCache.put('charts/empty-chart.html',
    "<div class=empty-chart-content ng-style=sizeStyles><span class=\"pficon pficon-info\"></span> <span>No data available</span></div>"
  );


  $templateCache.put('charts/heatmap/heatmap-legend.html',
    "<ul class=heatmap-pf-legend-container><li ng-repeat=\"item in legendItems\" class=heatmap-pf-legend-items><span class=legend-pf-color-box ng-style=\"{background: item.color}\"></span> <span class=legend-pf-text>{{item.text}}</span></li></ul>"
  );


  $templateCache.put('charts/heatmap/heatmap.html',
    "<div class=heatmap-pf-container><h3>{{chartTitle}}</h3><div class=heatmap-container ng-style=containerStyles><svg class=heatmap-pf-svg></svg></div><div pf-empty-chart ng-if=\"chartDataAvailable === false\" chart-height=height></div><div ng-if=!loadingDone class=\"spinner spinner-lg loading\"></div><div ng-if=showLegend pf-heatmap-legend legend=legendLabels legend-colors=heatmapColorPattern></div></div>"
  );


  $templateCache.put('charts/sparkline/sparkline-chart.html',
    "<span><div pf-c3-chart id={{sparklineChartId}} config=chartConfig></div></span>"
  );


  $templateCache.put('charts/trends/trends-chart.html',
    "<span ng-switch on=config.layout ng-class=\"{'data-unavailable-pf': chartData.dataAvailable === false}\"><div ng-switch-default ng-class=\"{'trend-card-large-pf': showLargeCardLayout,'trend-card-small-pf': showSmallCardLayout}\"><span class=trend-header-pf ng-if=config.title>{{config.title}}</span> <span ng-if=showActualValue><span class=trend-title-big-pf>{{getLatestValue()}}</span> <span class=trend-title-small-pf>{{config.units}}</span></span> <span ng-if=showPercentageValue><span class=trend-title-big-pf>{{getPercentageValue() + '%'}}</span> <span class=trend-title-small-pf>of {{chartData.total + ' ' + config.units}}</span></span><div pf-sparkline-chart ng-if=\"chartData.dataAvailable !== false\" config=config chart-data=chartData chart-height=getChartHeight() show-x-axis=showXAxis show-y-axis=showYAxis></div><div pf-empty-chart ng-if=\"chartData.dataAvailable === false\" chart-height=getChartHeight()></div><span class=trend-footer-pf ng-if=config.timeFrame>{{config.timeFrame}}</span></div><div ng-switch-when=compact class=trend-card-compact-pf><div class=\"row trend-row\"><div class=\"col-sm-4 col-md-4\"><div class=trend-compact-details><span ng-if=showActualValue><span class=trend-title-compact-big-pf>{{getLatestValue()}}</span> <span class=trend-title-compact-small-pf>{{config.units}}</span></span> <span ng-if=showPercentageValue><span class=trend-title-compact-big-pf>{{getPercentageValue() + '%'}}</span> <span class=trend-title-compact-small-pf>of {{chartData.total + ' ' + config.units}}</span></span> <span class=trend-header-compact-pf ng-if=config.title>{{config.title}}</span></div></div><div class=\"col-sm-8 col-md-8\"><div pf-sparkline-chart ng-if=\"chartData.dataAvailable !== false\" config=config chart-data=chartData chart-height=getChartHeight() show-x-axis=showXAxis show-y-axis=showYAxis></div><div pf-empty-chart ng-if=\"chartData.dataAvailable === false\" chart-height=getChartHeight()></div></div></div></div><div ng-switch-when=inline class=trend-card-inline-pf><div class=\"row trend-row\"><div class=\"col-sm-8 col-md-8 trend-flat-col\"><div pf-sparkline-chart ng-if=\"chartData.dataAvailable !== false\" config=config chart-data=chartData chart-height=getChartHeight() show-x-axis=showXAxis show-y-axis=showYAxis></div><div pf-empty-chart ng-if=\"chartData.dataAvailable === false\" chart-height=getChartHeight()></div></div><div class=\"col-sm-4 col-md-4 trend-flat-col\"><div class=trend-flat-details><div class=trend-flat-details-cell><span class=trend-title-flat-big-pf>{{getPercentageValue() + '%'}}</span></div><div class=trend-flat-details-cell><span class=trend-label-flat-strong-pf>{{config.trendLabel}}</span> <span class=trend-label-flat-pf>{{getLatestValue()}} of {{chartData.total + ' ' + config.units}}</span></div></div></div></div></div></span>"
  );


  $templateCache.put('charts/utilization-bar/utilization-bar-chart.html',
    "<div class=utilization-bar-chart-pf><span ng-if=\"!layout || layout.type === 'regular'\"><div ng-if=chartTitle class=progress-description>{{chartTitle}}</div><div class=\"progress progress-label-top-right\"><div class=progress-bar role=progressbar ng-class=\"{'animate': animate,\n" +
    "           'progress-bar-success': isOk, 'progress-bar-danger': isError, 'progress-bar-warning': isWarn}\" ng-style=\"{width:chartData.percentageUsed + '%'}\" tooltip=\"{{chartData.percentageUsed}}% Used\"><span ng-if=chartFooter ng-bind-html=chartFooter></span> <span ng-if=\"!chartFooter && (!footerLabelFormat || footerLabelFormat === 'actual')\"><strong>{{chartData.used}} of {{chartData.total}} {{units}}</strong> Used</span> <span ng-if=\"!chartFooter && footerLabelFormat === 'percent'\"><strong>{{chartData.percentageUsed}}%</strong> Used</span></div><div class=\"progress-bar progress-bar-remaining\" role=progressbar aria-valuenow=5 aria-valuemin=0 aria-valuemax=100 ng-style=\"{width:(100 - chartData.percentageUsed) + '%'}\" tooltip=\"{{100 - chartData.percentageUsed}}% Available\"></div></div></span> <span ng-if=\"layout && layout.type === 'inline'\"><div class=\"progress-container progress-description-left progress-label-right\" ng-style=\"{'padding-left':layout.titleLabelWidth, 'padding-right':layout.footerLabelWidth}\"><div ng-if=chartTitle class=progress-description ng-style=\"{'max-width':layout.titleLabelWidth}\">{{chartTitle}}</div><div class=progress><div class=progress-bar role=progressbar aria-valuenow=25 aria-valuemin=0 aria-valuemax=100 ng-class=\"{'animate': animate, 'progress-bar-success': isOk, 'progress-bar-danger': isError, 'progress-bar-warning': isWarn}\" ng-style=\"{width:chartData.percentageUsed + '%'}\" tooltip=\"{{chartData.percentageUsed}}% Used\"><span ng-if=chartFooter ng-bind-html=chartFooter></span> <span ng-if=\"(!chartFooter) && (!footerLabelFormat || footerLabelFormat === 'actual')\" ng-style=\"{'max-width':layout.footerLabelWidth}\"><strong>{{chartData.used}} {{units}}</strong> Used</span> <span ng-if=\"(!chartFooter) && footerLabelFormat === 'percent'\" ng-style=\"{'max-width':layout.footerLabelWidth}\"><strong>{{chartData.percentageUsed}}%</strong> Used</span></div><div class=\"progress-bar progress-bar-remaining\" role=progressbar aria-valuenow=75 aria-valuemin=0 aria-valuemax=100 ng-style=\"{width:(100 - chartData.percentageUsed) + '%'}\" tooltip=\"{{100 - chartData.percentageUsed}}% Available\"></div></div></div></span></div>"
  );


  $templateCache.put('charts/utilization-trend/utilization-trend-chart.html',
    "<div class=utilization-trend-chart-pf ng-class=\"{'data-unavailable-pf': chartData.dataAvailable === false}\"><h3>{{config.title}}</h3><div class=current-values><h1 class=\"available-count pull-left\">{{currentValue}}</h1><div class=\"available-text pull-left\"><div><span>{{currentText}}</span></div><div><span>of {{chartData.total}} {{config.units}}</span></div></div></div><div class=donut-chart-pf><div pf-donut-pct-chart ng-if=\"chartData.dataAvailable !== false\" config=donutConfig data=chartData center-label=centerLabel></div><div pf-empty-chart ng-if=\"chartData.dataAvailable === false\" chart-height=231></div></div><div ng-if=\"chartData.dataAvailable !== false\" class=sparkline-chart><div pf-sparkline-chart config=sparklineConfig chart-data=chartData chart-height=sparklineChartHeight show-x-axis=showSparklineXAxis show-y-axis=showSparklineYAxis></div></div><span class=\"pull-left legend-text\">{{legendLeftText}}</span> <span class=\"pull-right legend-text\">{{legendRightText}}</span></div>"
  );

}]);
;angular.module('patternfly.filters').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('filters/filter-fields.html',
    "<div class=\"filter-pf filter-fields\"><form><div class=\"form-group toolbar-pf-filter\"><div class=input-group><div dropdown class=input-group-btn><button dropdown-toggle type=button class=\"btn btn-default dropdown-toggle filter-fields\" aria-haspopup=true aria-expanded=false tooltip=\"Filter by\" tooltip-placement=top>{{currentField.title}} <span class=caret></span></button><ul class=dropdown-menu><li ng-repeat=\"item in config.fields\"><a class=filter-field role=menuitem tabindex=-1 ng-click=selectField(item)>{{item.title}}</a></li></ul></div><div ng-if=\"currentField.filterType !== 'select'\"><input class=form-control type={{currentField.filterType}} ng-model=config.currentValue placeholder={{currentField.placeholder}} ng-keypress=\"onValueKeyPress($event)\"></div><div ng-if=\"currentField.filterType === 'select'\"><select pf-select class=\"form-control filter-select\" id=currentValue ng-model=config.currentValue ng-options=\"filterValue for filterValue in currentField.filterValues\" ng-change=selectValue(config.currentValue)><option value=\"\">{{currentField.placeholder}}</option></select></div></div></div></form></div>"
  );


  $templateCache.put('filters/filter-results.html',
    "<div class=filter-pf><div class=\"row toolbar-pf-results\"><div class=col-sm-12><h5>{{config.resultsCount}} Results</h5><p ng-if=\"config.appliedFilters.length > 0\">Active filters:</p><ul class=list-inline><li ng-repeat=\"filter in config.appliedFilters\"><span class=\"active-filter label label-info\">{{filter.title}}: {{filter.value}} <a><span class=\"pficon pficon-close\" ng-click=clearFilter(filter)></span></a></span></li></ul><p><a class=clear-filters ng-click=clearAllFilters() ng-if=\"config.appliedFilters.length > 0\">Clear All Filters</a></p></div><!-- /col --></div><!-- /row --></div>"
  );


  $templateCache.put('filters/filter.html',
    "<div class=filter-pf><div pf-filter-fields config=config add-filter-fn=addFilter></div><div pf-filter-results config=config></div></div>"
  );

}]);
;angular.module('patternfly.form').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('form/datepicker/datepicker.html',
    "<div class=\"input-group date\"><input class=\"form-control\"> <span class=input-group-addon><span class=\"fa fa-calendar\"></span></span></div>"
  );


  $templateCache.put('form/form-buttons/form-buttons.html',
    "<div class=form-group><div class=\"{{ pfButtonContainerClass }}\"><div class=\"control-group buttons\"><button class=\"btn btn-default\" type=button ng-click=pfHandleCancel() ng-disabled=pfWorking translate>Cancel</button> <button class=\"btn btn-primary\" ng-click=\"pfHandleSave(); pfWorking = true\" ng-disabled=\"isInvalid() || pfWorking\"><i class=\"icon-spinner icon-spin\" ng-show=pfWorking></i> <span ng-show=pfWorking translate>Saving...</span> <span ng-hide=pfWorking translate>Save</span></button></div></div></div>"
  );


  $templateCache.put('form/form-group/form-group.html',
    "<div class=form-group ng-class=\"{ 'has-error' : hasErrors() }\"><label for=\"{{ pfField }}\" class=\"control-label {{ pfLabelClass }}\">{{ pfLabel }}</label><div class=\"{{ pfInputClass }}\"><span ng-transclude></span> <span class=help-block ng-show=error.messages><ul><li ng-repeat=\"message in error.messages\">{{ message }}</li></ul></span></div></div>"
  );

}]);
;angular.module('patternfly.notification').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('notification/inline-notification.html',
    "<div class=\"alert alert-{{pfNotificationType}}\" ng-class=\"{'alert-dismissable': pfNotificationPersistent === true}\"><button ng-show=pfNotificationPersistent ng-click=$parent.notifications.remove($index) type=button class=close data-dismiss=alert aria-hidden=true><span class=\"pficon pficon-close\"></span></button> <span class=\"pficon pficon-ok\" ng-show=\"pfNotificationType === 'success'\"></span> <span class=\"pficon pficon-info\" ng-show=\"pfNotificationType === 'info'\"></span> <span class=\"pficon pficon-error-circle-o\" ng-show=\"pfNotificationType === 'danger'\"></span> <span class=\"pficon pficon-warning-triangle-o\" ng-show=\"pfNotificationType === 'warning'\"></span> <strong>{{pfNotificationHeader}}</strong> {{pfNotificationMessage}}</div>"
  );


  $templateCache.put('notification/notification-list.html',
    "<div data-ng-show=\"notifications.data.length > 0\"><div ng-repeat=\"notification in notifications.data\"><pf-inline-notification pf-notification-type=notification.type pf-notification-header=notification.header pf-notification-message=notification.message pf-notification-persistent=notification.isPersistent pf-notification-index=$index></pf-inline-notification></div></div>"
  );


  $templateCache.put('notification/notification.html',
    "<div class=\"alert alert-{{pfNotificationType}}\"><button ng-show=pfNotificationPersistent type=button class=close ng-click=$parent.notifications.remove($index)><span aria-hidden=true>&times;</span><span class=sr-only>Close</span></button> <span class=\"pficon pficon-ok\" ng-show=\"pfNotificationType === 'success'\"></span> <span class=\"pficon pficon-info\" ng-show=\"pfNotificationType === 'info'\"></span> <span class=\"pficon pficon-error-circle-o\" ng-show=\"pfNotificationType === 'danger'\"></span> <span class=\"pficon pficon-warning-triangle-o\" ng-show=\"pfNotificationType === 'warning'\"></span> <strong>{{pfNotificationHeader}}</strong> {{pfNotificationMessage}}</div>"
  );

}]);
;angular.module('patternfly.sort').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('sort/sort.html',
    "<div class=sort-pf><form><div class=form-group><div class=\"dropdown btn-group\"><button type=button class=\"btn btn-default dropdown-toggle\" data-toggle=dropdown aria-haspopup=true aria-expanded=false tooltip=\"Sort by\" tooltip-placement=bottom>{{config.currentField.title}} <span class=caret></span></button><ul class=dropdown-menu><li ng-repeat=\"item in config.fields\" ng-class=\"{'selected': item === config.currentField}\"><a class=sort-field role=menuitem tabindex=-1 ng-click=selectField(item)>{{item.title}}</a></li></ul></div><button class=\"btn btn-link\" type=button ng-click=changeDirection()><span class=sort-direction ng-class=getSortIconClass()></span></button></div></form></div>"
  );

}]);
;angular.module('patternfly.toolbars').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('toolbars/toolbar.html',
    "<div class=container-fluid><div class=\"row toolbar-pf\"><div class=col-sm-12><form class=toolbar-pf-actions ng-class=\"{'no-filter-results': !config.filterConfig}\"><div pf-filter-fields id={{filterDomId}}_fields config=config.filterConfig ng-if=config.filterConfig add-filter-fn=addFilter></div><div pf-sort id={{sortDomId}} config=config.sortConfig ng-if=config.sortConfig></div><div class=\"form-group toolbar-actions\" ng-if=\"config.actionsConfig &&\n" +
    "                   ((config.actionsConfig.primaryActions && config.actionsConfig.primaryActions.length > 0) ||\n" +
    "                    (config.actionsConfig.moreActions && config.actionsConfig.moreActions.length > 0))\"><button class=\"btn btn-default primary-action\" type=button ng-repeat=\"action in config.actionsConfig.primaryActions\" title={{action.title}} ng-click=handleAction(action) ng-disabled=\"action.isDisabled === true\">{{action.name}}</button><div class=\"dropdown dropdown-kebab-pf\" ng-if=\"config.actionsConfig.moreActions && config.actionsConfig.moreActions.length > 0\"><button class=\"btn btn-link dropdown-toggle\" type=button id={{filterDomId}}_kebab data-toggle=dropdown aria-haspopup=true aria-expanded=true><span class=\"fa fa-ellipsis-v\"></span></button><ul class=dropdown-menu aria-labelledby=dropdownKebab><li ng-repeat=\"action in config.actionsConfig.moreActions\" role=\"{{action.isSeparator === true ? 'separator' : 'menuitem'}}\" ng-class=\"{'divider': action.isSeparator === true, 'disabled': action.isDisabled === true}\"><a ng-if=\"action.isSeparator !== true\" class=secondary-action title={{action.title}} ng-click=handleAction(action)>{{action.name}}</a></li></ul></div></div><div class=\"toolbar-pf-view-selector pull-right\" ng-if=\"config.viewsConfig && config.viewsConfig.views\"><ul class=list-inline><li ng-repeat=\"view in config.viewsConfig.viewsList\" ng-class=\"{'active': isViewSelected(view.id), 'disabled': checkViewDisabled(view)}\" title={{view.title}}><a><i class=\"view-selector {{view.iconClass}}\" ng-click=viewSelected(view.id)></i></a></li></ul></div></form><div pf-filter-results id={{filterDomId}_results} config=config.filterConfig ng-if=config.filterConfig></div></div><!-- /col --></div><!-- /row --></div><!-- /container -->"
  );

}]);
;angular.module('patternfly.views').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/cardview/card-view.html',
    "<div class=card-view-pf><div class=card ng-repeat=\"item in items\" ng-class=\"{'pf-selectable': selectItems, 'active': isSelected(item), 'disabled': checkDisabled(item)}\"><div class=card-content ng-click=\"itemClick($event, item)\" ng-dblclick=\"dblClick($event, item)\"><div pf-transclude=parent></div></div><div class=card-check-box ng-if=config.showSelectBox><input type=checkbox value=item.selected ng-model=item.selected ng-disabled=checkDisabled(item) ng-change=\"checkBoxChange(item)\"></div></div></div>"
  );


  $templateCache.put('views/listview/list-view.html',
    "<div class=list-view-pf><div class=list-group-item ng-repeat=\"item in items track by $index\" ng-class=\"{'pf-selectable': selectItems, 'active': isSelected(item), 'disabled': checkDisabled(item)}\"><div class=list-view-pf-checkbox ng-if=config.showSelectBox><input type=checkbox value=item.selected ng-model=item.selected ng-disabled=checkDisabled(item) ng-change=\"checkBoxChange(item)\"></div><div class=list-view-pf-actions ng-if=\"(actionButtons && actionButtons.length > 0) || (menuActions && menuActions.length > 0)\"><button class=\"btn btn-default\" ng-repeat=\"actionButton in actionButtons\" title=actionButton.title ng-class=\"{'disabled' : checkDisabled(item) || !enableButtonForItem(actionButton, item)}\" ng-click=\"handleButtonAction(actionButton, item)\">{{actionButton.name}}</button><div class=\"{{dropdownClass}} pull-right dropdown-kebab-pf\" id=kebab_{{$index}} ng-if=\"menuActions && menuActions.length > 0\"><button class=\"btn btn-link dropdown-toggle\" type=button id=dropdownKebabRight_{{$index}} ng-class=\"{'disabled': checkDisabled(item)}\" ng-click=\"setupActions(item, $event)\" data-toggle=dropdown aria-haspopup=true aria-expanded=true><span class=\"fa fa-ellipsis-v\"></span></button><ul class=\"dropdown-menu dropdown-menu-right {{$index}}\" aria-labelledby=dropdownKebabRight_{{$index}}><li ng-repeat=\"menuAction in menuActions\" ng-if=\"menuAction.isVisible !== false\" role=\"{{menuAction.isSeparator === true ? 'separator' : 'menuitem'}}\" ng-class=\"{'divider': (menuAction.isSeparator === true), 'disabled': (menuAction.isDisabled === true)}\"><a ng-if=\"menuAction.isSeparator !== true\" title={{menuAction.title}} ng-click=\"handleMenuAction(menuAction, item)\">{{menuAction.name}}</a></li></ul></div></div><div pf-transclude=parent class=list-view-pf-main-info ng-click=\"itemClick($event, item)\" ng-dblclick=\"dblClick($event, item)\"></div></div></div>"
  );

}]);
