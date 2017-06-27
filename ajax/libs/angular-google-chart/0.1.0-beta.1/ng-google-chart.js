/*! angular-google-chart 2015-09-04 */
/*
* @description Google Chart Api Directive Module for AngularJS
* @version 0.1.0-beta.1
* @author Nicolas Bouillon <nicolas@bouil.org>
* @author GitHub contributors
* @license MIT
* @year 2013
*/
/* global angular */
(function(){
    angular.module('googlechart', [])
        .run(registerResizeEvent);
        
    registerResizeEvent.$inject = ['$rootScope', '$window'];
    
    function registerResizeEvent($rootScope, $window){
        angular.element($window).bind('resize', function () {
                $rootScope.$emit('resizeMsg');
            });
    }
})();
/* global angular, google */
(function(){
    angular.module('googlechart')
        .factory('FormatManager', formatManagerFactory);
        
        function formatManagerFactory(){
            // Handles the processing of Google Charts API Formats
            function FormatManager(){
                var self = this;
                var oldFormatTemplates = {};
                self.iFormats = {}; // Holds instances of formats (ie. self.iFormats.date[0] = new google.visualization.DateFormat(params))
                self.applyFormats = applyFormats;
                
                // apply formats of type to datatable
                function apply(tFormats, dataTable){
                    var i, formatType;
                    for (formatType in tFormats){
                        if (tFormats.hasOwnProperty(formatType)){
                            for (i = 0; i < self.iFormats[formatType].length; i++) {
                                if (tFormats[formatType][i].columnNum < dataTable.getNumberOfColumns()) {
                                    self.iFormats[formatType][i].format(dataTable, tFormats[formatType][i].columnNum);
                                }
                            }
                        }
                    }
                }
                
                function applyFormat(formatType, FormatClass, tFormats){
                    var i;
                    if (angular.isArray(tFormats[formatType])) {
                        // basic change detection; no need to run if no changes
                        if (!angular.equals(tFormats[formatType], oldFormatTemplates[formatType])) {
                            oldFormatTemplates[formatType] = tFormats[formatType];
                            self.iFormats[formatType] = [];
            
                            if (formatType === 'color') {
                                instantiateColorFormatters(tFormats);
                            } else {
                                for (i = 0; i < tFormats[formatType].length; i++) {
                                    self.iFormats[formatType].push(new FormatClass(
                                        tFormats[formatType][i])
                                    );
                                }
                            }
                        }
                    }
                }
                
                function applyFormats(dataTable, tFormats, customFormatters) {
                    var formatType, FormatClass, requiresHtml = false;
                    if (!angular.isDefined(tFormats) || !angular.isDefined(dataTable)){
                        return { requiresHtml: false };
                    }
                    for (formatType in tFormats){
                        if (tFormats.hasOwnProperty(formatType)){
                            FormatClass = getFormatClass(formatType, customFormatters);
                            if (!angular.isFunction(FormatClass)){
                                // if no class constructor was returned,
                                // there's no point in completing cycle
                                continue;
                            }
                            applyFormat(formatType, FormatClass, tFormats);
                            
                            //Many formatters require HTML tags to display special formatting
                            if (formatType === 'arrow' || formatType === 'bar' || formatType === 'color') {
                                requiresHtml = true;
                            }
                        }
                    }
                    apply(tFormats, dataTable);
                    return { requiresHtml: requiresHtml };
                }
                
                function instantiateColorFormatters(tFormats){
                    var t, colorFormat, i, data, formatType = 'color';
                    for (t = 0; t < tFormats[formatType].length; t++) {
                        colorFormat = new google.visualization.ColorFormat();

                        for (i = 0; i < tFormats[formatType][t].formats.length; i++) {
                            data = tFormats[formatType][t].formats[i];

                            if (typeof (data.fromBgColor) !== 'undefined' && typeof (data.toBgColor) !== 'undefined') {
                                colorFormat.addGradientRange(data.from, data.to, data.color, data.fromBgColor, data.toBgColor);
                            } else {
                                colorFormat.addRange(data.from, data.to, data.color, data.bgcolor);
                            }
                        }

                        self.iFormats[formatType].push(colorFormat);
                    }
                }
                
                function getFormatClass(formatType, customFormatters){
                    var className = formatType.charAt(0).toUpperCase() + formatType.slice(1).toLowerCase() + "Format";
                    if (google.visualization.hasOwnProperty(className)){
                        return google.visualization[className];
                    } else if (angular.isDefined(customFormatters) && customFormatters.hasOwnProperty(formatType)) {
                        return customFormatters[formatType];
                    }
                    return;
                }
            }
            
            return FormatManager;
        }
})();
/* global angular */
(function(){
    angular.module('googlechart')
        .directive('agcOnError', onErrorDirective);
    function onErrorDirective(){
        return{
            restrict: 'A',
            scope: false,
            require: 'googleChart',
            link: function(scope, element, attrs, googleChartController){
                callback.$inject = ['chartWrapper', 'chart', 'args'];
                function callback(chartWrapper, chart, args){
                    var returnValues = {
                        chartWrapper: chartWrapper,
                        chart: chart,
                        args: args,
                        error: args[0],
                        err: args[0],
                        id: args[0].id,
                        message: args[0].message
                    };
                    scope.$apply(function(){
                        scope.$eval(attrs.agcOnError, returnValues);
                    });
                }
                googleChartController.registerWrapperListener('error', callback, this);
            }
        };
    }
})();
/* global angular */

(function(){
    angular.module('googlechart')
        .directive('agcOnMouseout', agcOnMouseoutDirective);
    
    function agcOnMouseoutDirective(){
        return {
            restrict: 'A',
            scope: false,
            require: 'googleChart',
            link: function(scope, element, attrs, googleChartController){
                callback.$inject = ['args', 'chart', 'chartWrapper'];
                function callback(args, chart, chartWrapper){
                    var returnParams = {
                        chartWrapper: chartWrapper,
                        chart: chart,
                        args: args,
                        column: args[0].column,
                        row: args[0].row
                    };
                    scope.$apply(function () {
                        scope.$eval(attrs.agcOnMouseout, returnParams);
                    });
                }
                googleChartController.registerChartListener('onmouseout', callback, this);
            }
        };
    }
})();
/* global angular */

(function(){
    angular.module('googlechart')
        .directive('agcOnMouseover', agcOnMouseoverDirective);
    
    function agcOnMouseoverDirective(){
        return {
            restrict: 'A',
            scope: false,
            require: 'googleChart',
            link: function(scope, element, attrs, googleChartController){
                callback.$inject = ['args', 'chart', 'chartWrapper'];
                function callback(args, chart, chartWrapper){
                    var returnParams = {
                        chartWrapper: chartWrapper,
                        chart: chart,
                        args: args,
                        column: args[0].column,
                        row: args[0].row
                    };
                    scope.$apply(function () {
                        scope.$eval(attrs.agcOnMouseover, returnParams);
                    });
                }
                googleChartController.registerChartListener('onmouseover', callback, this);
            }
        };
    }
})();
/* global angular */
(function(){
    angular.module('googlechart')
        .directive('agcOnReady', onReadyDirective);
        
    function onReadyDirective(){
        return {
            restrict: 'A',
            scope: false,
            require: 'googleChart',
            link: function(scope, element, attrs, googleChartController){
                callback.$inject=['chartWrapper'];
                function callback(chartWrapper){
                    scope.$apply(function (){
                        scope.$eval(attrs.agcOnReady, {chartWrapper: chartWrapper});
                    });
                }
                googleChartController.registerWrapperListener('ready', callback, this);
            }
        };
    }
})();
/* global angular */
(function(){
    angular.module('googlechart')
        .directive('agcOnSelect', onSelectDirective);
        
    function onSelectDirective(){
        return {
            restrict: 'A',
            scope: false,
            require: 'googleChart',
            link: function(scope, element, attrs, googleChartController){
                callback.$inject = ['chartWrapper', 'chart'];
                function callback(chartWrapper, chart){
                    var selectEventRetParams = { selectedItems: chart.getSelection() };
                    // This is for backwards compatibility for people using 'selectedItem' that only wanted the first selection.
                    selectEventRetParams.selectedItem = selectEventRetParams.selectedItems[0];
                    selectEventRetParams.chartWrapper = chartWrapper;
                    selectEventRetParams.chart = chart;
                    scope.$apply(function () {
                        scope.$eval(attrs.agcOnSelect, selectEventRetParams);
                    });
                }
                googleChartController.registerWrapperListener('select', callback, this);
            }
        };
    }
})();
/* global angular, google */
/* jshint -W072 */
(function(){
    angular.module('googlechart')
        .directive('googleChart', googleChartDirective);
        
    googleChartDirective.$inject = ['$timeout', '$window', '$rootScope', 'googleChartApiPromise'];
        
    function googleChartDirective($timeout, $window, $rootScope, googleChartApiPromise) {

        GoogleChartController.$inject = ['$scope', '$element', '$attrs', '$injector', 'FormatManager'];

        function GoogleChartController($scope, $element, $attrs, $injector, FormatManager){
            var self = this;
            var resizeHandler, wrapperListeners = {}, formatManager,
                chartListeners = {}, innerVisualization = null;
            self.registerChartListener = registerChartListener;
            self.registerWrapperListener = registerWrapperListener;

            init();

            function cleanup(){
                resizeHandler();
            }

            function draw() {
                if (!draw.triggered && (self.chart !== undefined)) {
                    draw.triggered = true;
                    $timeout(setupAndDraw, 0, true);
                } else if (self.chart !== undefined) {
                    $timeout.cancel(draw.recallTimeout);
                    draw.recallTimeout = $timeout(draw, 10);
                }
            }

            function drawAsync() {
                googleChartApiPromise.then(function () {
                    draw();
                });
            }

            function drawChartWrapper(){
                $scope.$eval($attrs.beforeDraw, { chartWrapper: $scope.chartWrapper });
                self.chartWrapper.draw();
                draw.triggered = false;
            }

            handleError.$inject = ['args'];
            function handleError(args) {
                var error = args[0];
                console.log("Chart not displayed due to error: '" + error.message + "' Full error object follows.");
                console.log(error);
            }

            function handleReady() {
                self.chart.displayed = true;
                if (innerVisualization !== self.chartWrapper.getChart()){
                    innerVisualization = self.chartWrapper.getChart();
                    registerListenersWithGoogle(innerVisualization, chartListeners);
                }
            }

            function init(){
                /* Watches, to refresh the chart when its data, formatters, options, view,
                or type change. All other values intentionally disregarded to avoid double
                calls to the draw function. Please avoid making changes to these objects
                directly from this directive.*/
                $scope.$watch(watchValue, watchHandler, true); // true is for deep object equality checking

                // Redraw the chart if the window is resized
                resizeHandler = $rootScope.$on('resizeMsg', function () {
                    $timeout(function () {
                        // Not always defined yet in IE so check
                        if (self.chartWrapper) {
                            drawAsync();
                        }
                    });
                });

                //Cleanup resize handler.
                $scope.$on('$destroy', cleanup);

                registerWrapperListener('error', handleError, self);
                registerWrapperListener('ready', handleReady, self);
            }

            function setupAndDraw(){
                if (typeof (self.chartWrapper) === 'undefined') {
                    var chartWrapperArgs = {
                        chartType: self.chart.type,
                        dataTable: self.chart.data,
                        view: self.chart.view,
                        options: self.chart.options,
                        containerId: $element[0]
                    };

                    self.chartWrapper = new google.visualization.ChartWrapper(chartWrapperArgs);
                    registerListenersWithGoogle(self.chartWrapper, wrapperListeners);
                } else {
                    self.chartWrapper.setChartType(self.chart.type);
                    self.chartWrapper.setDataTable(self.chart.data);
                    self.chartWrapper.setView(self.chart.view);
                    self.chartWrapper.setOptions(self.chart.options);
                }

                if (!formatManager){
                    formatManager = new FormatManager();
                }
                    
                if (formatManager.applyFormats(self.chartWrapper.getDataTable(),
                    self.chart.formatters, self.chart.customFormatters).requiresHtml){
                    self.chartWrapper.setOption('allowHtml', true);
                }
                    
                $timeout(drawChartWrapper);
            }

            function watchHandler(){
                self.chart = $scope.$eval($attrs.chart);
                drawAsync();
            }

            function watchValue(){
                var chartObject = $scope.$eval($attrs.chart);
                if (angular.isDefined(chartObject) && angular.isObject(chartObject)){
                    return {
                        customFormatters: chartObject.customFormatters,
                        data: chartObject.data,
                        formatters: chartObject.formatters,
                        options: chartObject.options,
                        type: chartObject.type,
                        view: chartObject.view
                    };
                }
            }

            // This function was written to genericize listener registration
            // because I plan to implement different collections of listeners
            // for events on the underlying chart object, and for
            // directive-level events (ie. beforeDraw).
            function registerListener(listenerCollection, eventName, listenerFn, listenerObject){
                // This is the function that will be invoked by the charts API.
                // Passing the wrapper function allows the use of DI for
                // for the called function.
                var listenerWrapper = function (){
                    var locals = {
                        chartWrapper: self.chartWrapper,
                        chart: self.chartWrapper.getChart(),
                        args: arguments
                    };
                    $injector.invoke(listenerFn, listenerObject || this, locals);
                };

                if (angular.isDefined(listenerCollection) && angular.isObject(listenerCollection)){
                    if (!angular.isArray(listenerCollection[eventName])){
                        listenerCollection[eventName] = [];
                    }
                    listenerCollection[eventName].push(listenerWrapper);
                    return function (){
                        if (angular.isDefined(listenerWrapper.googleListenerHandle)){
                            google.visualization.events.removeListener(listenerWrapper.googleListenerHandle);
                        }
                        var fnIndex = listenerCollection[eventName].indexOf(listenerWrapper);
                        listenerCollection[eventName].splice(fnIndex,1);
                        if (listenerCollection[eventName].length === 0){
                            listenerCollection[eventName] = undefined;
                        }
                    };
                }
            }

            function registerListenersWithGoogle(eventSource, listenerCollection){
                for (var eventName in listenerCollection){
                    if (listenerCollection.hasOwnProperty(eventName) && angular.isArray(listenerCollection[eventName])){
                        for (var fnIterator = 0; fnIterator < listenerCollection[eventName].length; fnIterator++){
                            if (angular.isFunction(listenerCollection[eventName][fnIterator])){
                                listenerCollection[eventName][fnIterator].googleListenerHandle =
                                google.visualization.events.addListener(eventSource, eventName, listenerCollection[eventName][fnIterator]);
                            }
                        }
                    }
                }
            }

            function registerChartListener(eventName, listenerFn, listenerObject){
                return registerListener(chartListeners, eventName, listenerFn, listenerObject);
            }

            function registerWrapperListener(eventName, listenerFn, listenerObject){
                return registerListener(wrapperListeners, eventName, listenerFn, listenerObject);
            }
        }

        return {
            restrict: 'A',
            scope: false,
            controller: GoogleChartController
        };
    }
})();

/* global angular */
(function(){
    angular.module('googlechart')
        .value('googleChartApiConfig', {
            version: '1',
            optionalSettings: {
                packages: ['corechart']
            }
        });
})();
/* global angular */
(function(){
    angular.module('googlechart')
        .factory('googleChartApiPromise', googleChartApiPromiseFactory);
        
    googleChartApiPromiseFactory.$inject = ['$rootScope', '$q', 'googleChartApiConfig', 'googleJsapiUrl'];
        
    function googleChartApiPromiseFactory($rootScope, $q, apiConfig, googleJsapiUrl) {
        var apiReady = $q.defer();
        var onLoad = function () {
            // override callback function
            var settings = {
                callback: function () {
                    var oldCb = apiConfig.optionalSettings.callback;
                    $rootScope.$apply(function () {
                        apiReady.resolve();
                    });

                    if (angular.isFunction(oldCb)) {
                        oldCb.call(this);
                    }
                }
            };

            settings = angular.extend({}, apiConfig.optionalSettings, settings);

            window.google.load('visualization', apiConfig.version, settings);
        };
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');

        script.setAttribute('type', 'text/javascript');
        script.src = googleJsapiUrl;

        if (script.addEventListener) { // Standard browsers (including IE9+)
            script.addEventListener('load', onLoad, false);
        } else { // IE8 and below
            script.onreadystatechange = function () {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    onLoad();
                }
            };
        }
        head.appendChild(script);

        return apiReady.promise;
    }
})();
/* global angular */
(function(){
    angular.module('googlechart')
        .provider('googleJsapiUrl', googleJsapiUrlProvider);
        
    function googleJsapiUrlProvider() {
        var protocol = 'https:';
        var url = '//www.google.com/jsapi';
        
        this.setProtocol = function (newProtocol) {
            protocol = newProtocol;
        };

        this.setUrl = function (newUrl) {
            url = newUrl;
        };

        this.$get = function () {
            return (protocol ? protocol : '') + url;
        };
    }
})();