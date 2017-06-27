(function(angular, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['angular'], function(angular) {
            return factory(angular);
        });
    } else {
        return factory(angular);
    }
}(window.angular || null, function(angular) {
    'use strict';

/**
 * ngTable: Table + Angular JS
 *
 * @author Vitalii Savchuk <esvit666@gmail.com>
 * @url https://github.com/esvit/ng-table/
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

/**
 * @ngdoc module
 * @name ngTable
 * @description ngTable: Table + Angular JS
 * @example
 <doc:example>
 <doc:source>
 <script>
 var app = angular.module('myApp', ['ngTable']);
 app.controller('MyCtrl', function($scope) {
                    $scope.users = [
                        {name: "Moroni", age: 50},
                        {name: "Tiancum", age: 43},
                        {name: "Jacob", age: 27},
                        {name: "Nephi", age: 29},
                        {name: "Enos", age: 34}
                    ];
                });
 </script>
 <table ng-table class="table">
 <tr ng-repeat="user in users">
 <td data-title="'Name'">{{user.name}}</td>
 <td data-title="'Age'">{{user.age}}</td>
 </tr>
 </table>
 </doc:source>
 </doc:example>
 */
var app = angular.module('ngTable', []);
/**
 * ngTable: Table + Angular JS
 *
 * @author Vitalii Savchuk <esvit666@gmail.com>
 * @url https://github.com/esvit/ng-table/
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

(function(){
    'use strict';

    angular.module('ngTable')
        .factory('ngTableEventsChannel', ngTableEventsChannel);

    ngTableEventsChannel.$inject = ['$rootScope'];

    /**
     * @ngdoc service
     * @name ngTableEventsChannel
     * @description strongly typed pub/sub for `NgTableParams`
     *
     * Supported events:
     *
     * * afterCreated - raised when a new instance of `NgTableParams` has finished being constructed
     * * afterReloadData - raised when the `reload` event has finished loading new data
     * * datasetChanged - raised when `settings` receives a new data array
     * * pagesChanged - raised when a new pages array has been generated
     */
    function ngTableEventsChannel($rootScope){

        var events = {};
        events = addChangeEvent('afterCreated', events);
        events = addChangeEvent('afterReloadData', events);
        events = addChangeEvent('datasetChanged', events);
        events = addChangeEvent('pagesChanged', events);
        return events;

        //////////

        function addChangeEvent(eventName, target){
            var fnName = eventName.charAt(0).toUpperCase() + eventName.substring(1);
            var event = {};
            event['on' + fnName] = createEventSubscriptionFn(eventName);
            event['publish' + fnName] = createPublishEventFn(eventName);
            return angular.extend(target, event);
        }

        function createEventSubscriptionFn(eventName){

            return function subscription(handler/*[, eventSelector or $scope][, eventSelector]*/){
                var eventSelector = angular.identity;
                var scope = $rootScope;

                if (arguments.length === 2){
                    if (angular.isFunction(arguments[1].$new)) {
                        scope = arguments[1];
                    } else {
                        eventSelector = arguments[1]
                    }
                } else if (arguments.length > 2){
                    scope = arguments[1];
                    eventSelector = arguments[2];
                }

                // shorthand for subscriber to only receive events from a specific publisher instance
                if (angular.isObject(eventSelector)) {
                    var requiredPublisher = eventSelector;
                    eventSelector = function(publisher){
                        return publisher === requiredPublisher;
                    }
                }

                return scope.$on('ngTable:' + eventName, function(event, params/*, ...args*/){
                    // don't send events published by the internal NgTableParams created by ngTableController
                    if (params.isNullInstance) return;

                    var eventArgs = rest(arguments, 2);
                    var fnArgs = [params].concat(eventArgs);
                    if (eventSelector.apply(this, fnArgs)){
                        handler.apply(this, fnArgs);
                    }
                });
            }
        }

        function createPublishEventFn(eventName){
            return function publish(/*args*/){
                var fnArgs = ['ngTable:' + eventName].concat(Array.prototype.slice.call(arguments));
                $rootScope.$broadcast.apply($rootScope, fnArgs);
            }
        }

        function rest(array, n) {
            return Array.prototype.slice.call(array, n == null ? 1 : n);
        }
    }
})();

/**
 * ngTable: Table + Angular JS
 *
 * @author Vitalii Savchuk <esvit666@gmail.com>
 * @url https://github.com/esvit/ng-table/
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

(function(){
    'use strict';

    angular.module('ngTable')
        .provider('ngTableFilterConfig', ngTableFilterConfigProvider);

    ngTableFilterConfigProvider.$inject = [];

    function ngTableFilterConfigProvider(){
        var config;
        var defaultConfig = {
            defaultBaseUrl: 'ng-table/filters/',
            defaultExt: '.html',
            aliasUrls: {}
        };

        this.$get = ngTableFilterConfig;
        this.resetConfigs = resetConfigs;
        this.setConfig = setConfig;

        init();

        /////////

        function init(){
            resetConfigs();
        }

        function resetConfigs(){
            config = defaultConfig;
        }

        function setConfig(customConfig){
            var mergeConfig = angular.extend({}, config, customConfig);
            mergeConfig.aliasUrls = angular.extend({}, config.aliasUrls, customConfig.aliasUrls);
            config = mergeConfig;
        }

        /////////

        ngTableFilterConfig.$inject = [];

        function ngTableFilterConfig(){

            var publicConfig;

            var service = {
                config: publicConfig,
                getTemplateUrl: getTemplateUrl,
                getUrlForAlias: getUrlForAlias
            };
            Object.defineProperty(service, "config", {
                get: function(){
                    return publicConfig = publicConfig || angular.copy(config);
                },
                enumerable: true
            });

            return service;

            /////////

            function getTemplateUrl(filterValue, filterKey){
                if (filterValue.indexOf('/') !== -1){
                    return filterValue;
                }

                return service.getUrlForAlias(filterValue, filterKey);
            }

            function getUrlForAlias(aliasName/*, filterKey*/){
                return config.aliasUrls[aliasName] || config.defaultBaseUrl + aliasName + config.defaultExt;
            }
        }
    }
})();

/**
 * ngTable: Table + Angular JS
 *
 * @author Vitalii Savchuk <esvit666@gmail.com>
 * @url https://github.com/esvit/ng-table/
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

(function(){
    'use strict';


    angular.module('ngTable')
        .provider('ngTableDefaultGetData', ngTableDefaultGetDataProvider);

    ngTableDefaultGetDataProvider.$inject = [];

    /**
     * @ngdoc provider
     * @name ngTableDefaultGetDataProvider
     * @description Allows for the configuration of the {@link ngTable.ngTableDefaultGetData ngTableDefaultGetData}
     * service.
     *
     * Set filterFilterName to the name of a angular filter that knows how to take `NgTableParams.filter()`
     * to restrict an array of data.
     *
     * Set sortingFilterName to the name of a angular filter that knows how to take `NgTableParams.orderBy()`
     * to sort an array of data.
     *
     * Out of the box the `ngTableDefaultGetData` service will be configured to use the angular `filter` and `orderBy`
     * filters respectively
     */
    function ngTableDefaultGetDataProvider(){
        var provider = this;
        provider.$get = ngTableDefaultGetData;
        provider.filterFilterName = 'filter';
        provider.sortingFilterName = 'orderBy';

        ///////////

        ngTableDefaultGetData.$inject = ['$filter'];

        /**
         * @ngdoc service
         * @name ngTableDefaultGetData
         * @description A default implementation of the getData function that will apply the `filter`, `orderBy` and
         * paging values from the `NgTableParams` instance supplied to the data array supplied.
         *
         * The outcome will be to return the resulting array and to assign the total item count after filtering
         * to the `total` of the `NgTableParams` instance supplied
         */
        function ngTableDefaultGetData($filter) {

            return getData;

            function getData(data, params) {
                if (data == null){
                    return [];
                }

                var fData = params.hasFilter() ? $filter(provider.filterFilterName)(data, params.filter(true)) : data;
                var orderBy = params.orderBy();
                var orderedData = orderBy.length ? $filter(provider.sortingFilterName)(fData, orderBy) : fData;
                var pagedData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                params.total(orderedData.length); // set total for recalc pagination
                return pagedData;
            }
        }
    }
})();

/**
 * ngTable: Table + Angular JS
 *
 * @author Vitalii Savchuk <esvit666@gmail.com>
 * @url https://github.com/esvit/ng-table/
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

(function(){
    'use strict';

    // todo: remove shim after an acceptable depreciation period

    angular.module('ngTable')
        .factory('ngTableGetDataBcShim', ngTableGetDataBcShim);

    ngTableGetDataBcShim.$inject = ['$q'];

    function ngTableGetDataBcShim($q){

        return createWrapper;

        function createWrapper(getDataFn){
            return function getDataShim(/*args*/){
                var $defer = $q.defer();
                var pData = getDataFn.apply(this, [$defer].concat(Array.prototype.slice.call(arguments)));
                if (!pData) {
                    // If getData resolved the $defer, and didn't promise us data,
                    //   create a promise from the $defer. We need to return a promise.
                    pData = $defer.promise;
                }
                return pData;
            }
        }
    }
})();

/**
 * ngTable: Table + Angular JS
 *
 * @author Vitalii Savchuk <esvit666@gmail.com>
 * @url https://github.com/esvit/ng-table/
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

/**
 * @ngdoc object
 * @name ngTableDefaultParams
 * @module ngTable
 * @description Default Parameters for ngTable
 */
app.value('ngTableDefaults', {
    params: {},
    settings: {}
});

/**
 * @ngdoc service
 * @name NgTableParams
 * @module ngTable
 * @description Parameters manager for ngTable
 */

app.factory('NgTableParams', ['$q', '$log', 'ngTableDefaults', 'ngTableGetDataBcShim', 'ngTableDefaultGetData', 'ngTableEventsChannel', function($q, $log, ngTableDefaults, ngTableGetDataBcShim, ngTableDefaultGetData, ngTableEventsChannel) {
    var isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    var NgTableParams = function(baseParameters, baseSettings) {

        // the ngTableController "needs" to create a dummy/null instance and it's important to know whether an instance
        // is one of these
        if (typeof baseParameters === "boolean"){
            this.isNullInstance = true;
        }

        var self = this,
            committedParams,
            isCommittedDataset = false,
            log = function() {
                if (settings.debugMode && $log.debug) {
                    $log.debug.apply(this, arguments);
                }
            };

        this.data = [];

        /**
         * @ngdoc method
         * @name NgTableParams#parameters
         * @description Set new parameters or get current parameters
         *
         * @param {string} newParameters      New parameters
         * @param {string} parseParamsFromUrl Flag if parse parameters like in url
         * @returns {Object} Current parameters or `this`
         */
        this.parameters = function(newParameters, parseParamsFromUrl) {
            parseParamsFromUrl = parseParamsFromUrl || false;
            if (angular.isDefined(newParameters)) {
                for (var key in newParameters) {
                    var value = newParameters[key];
                    if (parseParamsFromUrl && key.indexOf('[') >= 0) {
                        var keys = key.split(/\[(.*)\]/).reverse()
                        var lastKey = '';
                        for (var i = 0, len = keys.length; i < len; i++) {
                            var name = keys[i];
                            if (name !== '') {
                                var v = value;
                                value = {};
                                value[lastKey = name] = (isNumber(v) ? parseFloat(v) : v);
                            }
                        }
                        if (lastKey === 'sorting') {
                            params[lastKey] = {};
                        }
                        params[lastKey] = angular.extend(params[lastKey] || {}, value[lastKey]);
                    } else {
                        params[key] = (isNumber(newParameters[key]) ? parseFloat(newParameters[key]) : newParameters[key]);
                    }
                }
                log('ngTable: set parameters', params);
                return this;
            }
            return params;
        };

        /**
         * @ngdoc method
         * @name NgTableParams#settings
         * @description Set new settings for table
         *
         * @param {string} newSettings New settings or undefined
         * @returns {Object} Current settings or `this`
         */
        this.settings = function(newSettings) {
            if (angular.isDefined(newSettings)) {
                if (angular.isArray(newSettings.data)) {
                    //auto-set the total from passed in data
                    newSettings.total = newSettings.data.length;
                }

                // todo: remove the backwards compatibility shim and the following two if blocks
                if (newSettings.getData && newSettings.getData.length > 1){
                    // support the old getData($defer, params) api
                    newSettings.getDataFnAdaptor = ngTableGetDataBcShim;
                }
                if (newSettings.getGroups && newSettings.getGroups.length > 2){
                    // support the old getGroups($defer, grouping, params) api
                    newSettings.getGroupsFnAdaptor = ngTableGetDataBcShim;
                }

                var originalDataset = settings.data;
                settings = angular.extend(settings, newSettings);

                // note: using != as want null and undefined to be treated the same
                var hasDatasetChanged = newSettings.hasOwnProperty('data') && (newSettings.data != originalDataset);
                if (hasDatasetChanged) {
                    if (isCommittedDataset){
                        this.page(1); // reset page as a new dataset has been supplied
                    }
                    isCommittedDataset = false;
                    ngTableEventsChannel.publishDatasetChanged(this, newSettings.data, originalDataset);
                }
                log('ngTable: set settings', settings);
                return this;
            }
            return settings;
        };

        /**
         * @ngdoc method
         * @name NgTableParams#page
         * @description If parameter page not set return current page else set current page
         *
         * @param {string} page Page number
         * @returns {Object|Number} Current page or `this`
         */
        this.page = function(page) {
            return angular.isDefined(page) ? this.parameters({
                'page': page
            }) : params.page;
        };

        /**
         * @ngdoc method
         * @name NgTableParams#total
         * @description If parameter total not set return current quantity else set quantity
         *
         * @param {string} total Total quantity of items
         * @returns {Object|Number} Current page or `this`
         */
        this.total = function(total) {
            return angular.isDefined(total) ? this.settings({
                'total': total
            }) : settings.total;
        };

        /**
         * @ngdoc method
         * @name NgTableParams#count
         * @description If parameter count not set return current count per page else set count per page
         *
         * @param {string} count Count per number
         * @returns {Object|Number} Count per page or `this`
         */
        this.count = function(count) {
            // reset to first page because can be blank page
            return angular.isDefined(count) ? this.parameters({
                'count': count,
                'page': 1
            }) : params.count;
        };

        /**
         * @ngdoc method
         * @name NgTableParams#filter
         * @description If 'filter' parameter not set return current filter else set current filter
         *
         * Note: when assigning a new filter, {@link NgTableParams#page page} will be set to 1
         *
         * @param {Object|Boolean} filter 'object': new filter to assign or
         * 'true': to return the current filter minus any insignificant values (null,  undefined and empty string); or
         * 'falsey': to return the current filter "as is"
         * @returns {Object} Current filter or `this`
         */
        this.filter = function(filter) {
            if (angular.isDefined(filter) && angular.isObject(filter)) {
                return this.parameters({
                    'filter': filter,
                    'page': 1
                });
            } else if (filter === true){
                var keys = Object.keys(params.filter);
                var significantFilter = {};
                for (var i=0; i < keys.length; i++){
                    var filterValue = params.filter[keys[i]];
                    if (filterValue != null && filterValue !== '') {
                        significantFilter[keys[i]] = filterValue;
                    }
                }
                return significantFilter;
            } else {
                return params.filter;
            }
        };

        /**
         * @ngdoc method
         * @name NgTableParams#sorting
         * @description If 'sorting' parameter is not set, return current sorting. Otherwise set current sorting.
         *
         * @param {string} sorting New sorting
         * @returns {Object} Current sorting or `this`
         */
        this.sorting = function(sorting) {
            if (arguments.length == 2) {
                var sortArray = {};
                sortArray[sorting] = arguments[1];
                this.parameters({
                    'sorting': sortArray
                });
                return this;
            }
            return angular.isDefined(sorting) ? this.parameters({
                'sorting': sorting
            }) : params.sorting;
        };

        /**
         * @ngdoc method
         * @name NgTableParams#isSortBy
         * @description Checks sort field
         *
         * @param {string} field     Field name
         * @param {string} direction Optional direction of sorting ('asc' or 'desc')
         * @returns {Array} Return true if field sorted by direction
         */
        this.isSortBy = function(field, direction) {
            if(direction !== undefined) {
                return angular.isDefined(params.sorting[field]) && params.sorting[field] == direction;
            } else {
                return angular.isDefined(params.sorting[field]);
            }
        };

        /**
         * @ngdoc method
         * @name NgTableParams#orderBy
         * @description Return object of sorting parameters for angular filter
         *
         * @returns {Array} Array like: [ '-name', '+age' ]
         */
        this.orderBy = function() {
            var sorting = [];
            for (var column in params.sorting) {
                sorting.push((params.sorting[column] === "asc" ? "+" : "-") + column);
            }
            return sorting;
        };

        /**
         * @ngdoc method
         * @name NgTableParams#getData
         * @description Called when updated some of parameters for get new data
         *
         * @param {Object} params New parameters
         */
        this.getData = function(params) {
            // note: this === settings
            return ngTableDefaultGetData(this.data, params);
        };

        /**
         * @ngdoc method
         * @name NgTableParams#getGroups
         * @description Return groups for table grouping
         */
        this.getGroups = function(column) {
            return runGetData().then(function(data) {
                var groups = {};
                angular.forEach(data, function(item) {
                    var groupName = angular.isFunction(column) ? column(item) : item[column];

                    groups[groupName] = groups[groupName] || {
                        data: []
                    };
                    groups[groupName]['value'] = groupName;
                    groups[groupName].data.push(item);
                });
                var result = [];
                for (var i in groups) {
                    result.push(groups[i]);
                }
                log('ngTable: refresh groups', result);
                return result;
            });
        };

        /**
         * @ngdoc method
         * @name NgTableParams#generatePagesArray
         * @description Generate array of pages
         *
         * When no arguments supplied, the current parameter state of this `NgTableParams` instance will be used
         *
         * @param {boolean} currentPage which page must be active
         * @param {boolean} totalItems  Total quantity of items
         * @param {boolean} pageSize    Quantity of items on page
         * @param {number} maxBlocks    Quantity of blocks for pagination
         * @returns {Array} Array of pages
         */
        this.generatePagesArray = function(currentPage, totalItems, pageSize, maxBlocks) {
            if (!arguments.length){
                currentPage = this.page();
                totalItems = this.total();
                pageSize = this.count();
            }

            var maxPage, maxPivotPages, minPage, numPages, pages;
            maxBlocks = maxBlocks && maxBlocks < 6 ? 6 : maxBlocks;

            pages = [];
            numPages = Math.ceil(totalItems / pageSize);
            if (numPages > 1) {
                pages.push({
                    type: 'prev',
                    number: Math.max(1, currentPage - 1),
                    active: currentPage > 1
                });
                pages.push({
                    type: 'first',
                    number: 1,
                    active: currentPage > 1,
                    current: currentPage === 1
                });
                maxPivotPages = Math.round((settings.paginationMaxBlocks - settings.paginationMinBlocks) / 2);
                minPage = Math.max(2, currentPage - maxPivotPages);
                maxPage = Math.min(numPages - 1, currentPage + maxPivotPages * 2 - (currentPage - minPage));
                minPage = Math.max(2, minPage - (maxPivotPages * 2 - (maxPage - minPage)));
                var i = minPage;
                while (i <= maxPage) {
                    if ((i === minPage && i !== 2) || (i === maxPage && i !== numPages - 1)) {
                        pages.push({
                            type: 'more',
                            active: false
                        });
                    } else {
                        pages.push({
                            type: 'page',
                            number: i,
                            active: currentPage !== i,
                            current: currentPage === i
                        });
                    }
                    i++;
                }
                pages.push({
                    type: 'last',
                    number: numPages,
                    active: currentPage !== numPages,
                    current: currentPage === numPages
                });
                pages.push({
                    type: 'next',
                    number: Math.min(numPages, currentPage + 1),
                    active: currentPage < numPages
                });
            }
            return pages;
        };

        /**
         * @ngdoc method
         * @name NgTableParams#isDataReloadRequired
         * @description Return true when a change to this `NgTableParams` instance should require the reload method
         * to be run so as to ensure the data presented to the user reflects the `NgTableParams`
         */
        this.isDataReloadRequired = function(){
            // note: using != as want to treat null and undefined the same
            return !isCommittedDataset || !angular.equals(params, committedParams);
        };

        /**
         * @ngdoc method
         * @name NgTableParams#hasFilter
         * @description Determines if NgTableParams#filter has significant filter value(s)
         * (any value except null, undefined, or empty string)
         * @returns {Boolean} true when NgTableParams#filter has at least one significant field value
         */
        this.hasFilter = function(){
            return Object.keys(this.filter(true)).length > 0;
        };

        /**
         * @ngdoc method
         * @name NgTableParams#hasFilterChanges
         * @description Return true when a change to `NgTableParams.filters`require the reload method
         * to be run so as to ensure the data presented to the user reflects these filters
         */
        this.hasFilterChanges = function(){
            return !angular.equals((params && params.filter), (committedParams && committedParams.filter));
        };

        /**
         * @ngdoc method
         * @name NgTableParams#url
         * @description Return groups for table grouping
         *
         * @param {boolean} asString flag indicates return array of string or object
         * @returns {Array} If asString = true will be return array of url string parameters else key-value object
         */
        this.url = function(asString) {
            asString = asString || false;
            var pairs = (asString ? [] : {});
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var item = params[key],
                        name = encodeURIComponent(key);
                    if (typeof item === "object") {
                        for (var subkey in item) {
                            if (!angular.isUndefined(item[subkey]) && item[subkey] !== "") {
                                var pname = name + "[" + encodeURIComponent(subkey) + "]";
                                if (asString) {
                                    pairs.push(pname + "=" + item[subkey]);
                                } else {
                                    pairs[pname] = item[subkey];
                                }
                            }
                        }
                    } else if (!angular.isFunction(item) && !angular.isUndefined(item) && item !== "") {
                        if (asString) {
                            pairs.push(name + "=" + encodeURIComponent(item));
                        } else {
                            pairs[name] = encodeURIComponent(item);
                        }
                    }
                }
            }
            return pairs;
        };

        /**
         * @ngdoc method
         * @name NgTableParams#reload
         * @description Reload table data
         */
        this.reload = function() {
            var self = this,
                pData = null;

            settings.$loading = true;

            committedParams = angular.copy(params);
            isCommittedDataset = true;

            if (settings.groupBy) {
                pData = runInterceptorPipeline(runGetGroups);
            } else {
                pData = runInterceptorPipeline(runGetData);
            }

            log('ngTable: reload data');

            var oldData = self.data;
            return pData.then(function(data) {
                settings.$loading = false;
                self.data = data;
                // note: I think it makes sense to publish this event even when data === oldData
                // subscribers can always set a filter to only receive the event when data !== oldData
                ngTableEventsChannel.publishAfterReloadData(self, data, oldData);
                self.reloadPages();

                // todo: remove after acceptable depreciation period
                if (settings.$scope) {
                    settings.$scope.$emit('ngTableAfterReloadData');
                }

                return data;
            }).catch(function(reason){
                committedParams = null;
                isCommittedDataset = false;
                // "rethrow"
                return $q.reject(reason);
            });
        };

        this.reloadPages = (function() {
            var currentPages;
            return function(){
                var oldPages = currentPages;
                var newPages = self.generatePagesArray(self.page(), self.total(), self.count());
                if (!angular.equals(oldPages, newPages)){
                    currentPages = newPages;
                    ngTableEventsChannel.publishPagesChanged(this, newPages, oldPages);
                }
            }
        })();

        function runGetData(){
            var getDataFn = settings.getDataFnAdaptor(settings.getData);
            return $q.when(getDataFn.call(settings, self));
        }

        function runGetGroups(){
            var getGroupsFn = settings.getGroupsFnAdaptor(settings.getGroups);
            return $q.when(getGroupsFn.call(settings, settings.groupBy, self));
        }

        function runInterceptorPipeline(fetchFn){
            var interceptors = settings.interceptors || [];

            return interceptors.reduce(function(result, interceptor){
                var thenFn = (interceptor.response && interceptor.response.bind(interceptor)) || $q.when;
                var rejectFn = (interceptor.responseError && interceptor.responseError.bind(interceptor)) || $q.reject;
                return result.then(function(data){
                    return thenFn(data, self);
                }, function(reason){
                    return rejectFn(reason, self);
                });
            }, fetchFn());
        }

        var params = {
            page: 1,
            count: 1,
            filter: {},
            sorting: {},
            group: {},
            groupBy: null
        };
        angular.extend(params, ngTableDefaults.params);

        var settings = {
            // todo: remove $scope after acceptable depreciation period as no longer required
            $scope: null, // set by ngTable controller
            $loading: false,
            data: null, //allows data to be set when table is initialized
            total: 0,
            defaultSort: 'desc',
            filterDelay: 750,
            counts: [10, 25, 50, 100],
            interceptors: [],
            paginationMaxBlocks: 11,
            paginationMinBlocks: 5,
            sortingIndicator: 'span',
            getDataFnAdaptor: angular.identity,
            getGroupsFnAdaptor: angular.identity,
            getGroups: this.getGroups,
            getData: this.getData
        };

        this.settings(ngTableDefaults.settings);
        this.settings(baseSettings);
        this.parameters(baseParameters, true);

        ngTableEventsChannel.publishAfterCreated(this);

        return this;
    };
    return NgTableParams;
}]);

/**
 * @ngdoc service
 * @name ngTableParams
 * @description Backwards compatible shim for lowercase 'n' in NgTableParams
 */
app.factory('ngTableParams', ['NgTableParams', function(NgTableParams) {
    return NgTableParams;
}]);

/**
 * ngTable: Table + Angular JS
 *
 * @author Vitalii Savchuk <esvit666@gmail.com>
 * @url https://github.com/esvit/ng-table/
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

(function(){
    'use strict';

    angular.module('ngTable')
        .controller('ngTableFilterRowController', ngTableFilterRowController);

    ngTableFilterRowController.$inject = ['$scope', 'ngTableFilterConfig'];

    function ngTableFilterRowController($scope, ngTableFilterConfig){

        $scope.config = ngTableFilterConfig;
    }
})();

/**
 * ngTable: Table + Angular JS
 *
 * @author Vitalii Savchuk <esvit666@gmail.com>
 * @url https://github.com/esvit/ng-table/
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

(function(){
    'use strict';

    angular.module('ngTable')
        .controller('ngTableSorterRowController', ngTableSorterRowController);

    ngTableSorterRowController.$inject = ['$scope'];

    function ngTableSorterRowController($scope){

        $scope.sortBy = sortBy;

        ///////////

        function sortBy($column, event) {
            var parsedSortable = $column.sortable && $column.sortable();
            if (!parsedSortable) {
                return;
            }
            var defaultSort = $scope.params.settings().defaultSort;
            var inverseSort = (defaultSort === 'asc' ? 'desc' : 'asc');
            var sorting = $scope.params.sorting() && $scope.params.sorting()[parsedSortable] && ($scope.params.sorting()[parsedSortable] === defaultSort);
            var sortingParams = (event.ctrlKey || event.metaKey) ? $scope.params.sorting() : {};
            sortingParams[parsedSortable] = (sorting ? inverseSort : defaultSort);
            $scope.params.parameters({
                sorting: sortingParams
            });
        }
    }
})();

/**
 * ngTable: Table + Angular JS
 *
 * @author Vitalii Savchuk <esvit666@gmail.com>
 * @url https://github.com/esvit/ng-table/
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

/**
 * @ngdoc object
 * @name ngTableController
 *
 * @description
 * Each {@link ngTable ngTable} directive creates an instance of `ngTableController`
 */
app.controller('ngTableController', ['$scope', 'NgTableParams', '$timeout', '$parse', '$compile', '$attrs', '$element',
    'ngTableColumn', 'ngTableEventsChannel',
function($scope, NgTableParams, $timeout, $parse, $compile, $attrs, $element, ngTableColumn, ngTableEventsChannel) {
    var isFirstTimeLoad = true;
    $scope.$filterRow = {};
    $scope.$loading = false;

    // until such times as the directive uses an isolated scope, we need to ensure that the check for
    // the params field only consults the "own properties" of the $scope. This is to avoid seeing the params
    // field on a $scope higher up in the prototype chain
    if (!$scope.hasOwnProperty("params")) {
        $scope.params = new NgTableParams(true);
    }
    $scope.params.settings().$scope = $scope;

    var delayFilter = (function() {
        var timer = 0;
        return function(callback, ms) {
            $timeout.cancel(timer);
            timer = $timeout(callback, ms);
        };
    })();

    function onDataReloadStatusChange (newStatus/*, oldStatus*/) {
        if (!newStatus) {
            return;
        }

        $scope.params.settings().$scope = $scope;

        var currentParams = $scope.params;

        if (currentParams.hasFilterChanges()) {
            var applyFilter = function () {
                currentParams.page(1);
                currentParams.reload();
            };
            if (currentParams.settings().filterDelay) {
                delayFilter(applyFilter, currentParams.settings().filterDelay);
            } else {
                applyFilter();
            }
        } else {
            currentParams.reload();
        }
    }

    // watch for when a new NgTableParams is bound to the scope
    // CRITICAL: the watch must be for reference and NOT value equality; this is because NgTableParams maintains
    // the current data page as a field. Checking this for value equality would be terrible for performance
    // and potentially cause an error if the items in that array has circular references
    $scope.$watch('params', function(newParams, oldParams){
        if (newParams === oldParams || !newParams) {
            return;
        }

        newParams.reload();
    }, false);

    $scope.$watch('params.isDataReloadRequired()', onDataReloadStatusChange);

    this.compileDirectiveTemplates = function () {
        if (!$element.hasClass('ng-table')) {
            $scope.templates = {
                header: ($attrs.templateHeader ? $attrs.templateHeader : 'ng-table/header.html'),
                pagination: ($attrs.templatePagination ? $attrs.templatePagination : 'ng-table/pager.html')
            };
            $element.addClass('ng-table');
            var headerTemplate = null;

            // $element.find('> thead').length === 0 doesn't work on jqlite
            var theadFound = false;
            angular.forEach($element.children(), function(e) {
                if (e.tagName === 'THEAD') {
                    theadFound = true;
                }
            });
            if (!theadFound) {
                headerTemplate = angular.element(document.createElement('thead')).attr('ng-include', 'templates.header');
                $element.prepend(headerTemplate);
            }
            var paginationTemplate = angular.element(document.createElement('div')).attr({
                'ng-table-pagination': 'params',
                'template-url': 'templates.pagination'
            });
            $element.after(paginationTemplate);
            if (headerTemplate) {
                $compile(headerTemplate)($scope);
            }
            $compile(paginationTemplate)($scope);
        }
    };

    this.loadFilterData = function ($columns) {
        angular.forEach($columns, function ($column) {
            var def;
            def = $column.filterData($scope, {
                $column: $column
            });
            if (!def) {
                delete $column.filterData;
                return;
            }

            // if we're working with a deferred object, let's wait for the promise
            if ((angular.isObject(def) && angular.isObject(def.promise))) {
                delete $column.filterData;
                return def.promise.then(function(data) {
                    // our deferred can eventually return arrays, functions and objects
                    if (!angular.isArray(data) && !angular.isFunction(data) && !angular.isObject(data)) {
                        // if none of the above was found - we just want an empty array
                        data = [];
                    } else if (angular.isArray(data)) {
                        data.unshift({
                            title: '',
                            id: ''
                        });
                    }
                    $column.data = data;
                });
            }
            // otherwise, we just return what the user gave us. It could be a function, array, object, whatever
            else {
                return $column.data = def;
            }
        });
    };

    this.buildColumns = function (columns) {
        return columns.map(function(col){
            return ngTableColumn.buildColumn(col, $scope)
        })
    };

    this.parseNgTableDynamicExpr = function (attr) {
        if (!attr || attr.indexOf(" with ") > -1) {
            var parts = attr.split(/\s+with\s+/);
            return {
                tableParams: parts[0],
                columns: parts[1]
            };
        } else {
            throw new Error('Parse error (expected example: ng-table-dynamic=\'tableParams with cols\')');
        }
    };

    this.setupBindingsToInternalScope = function(tableParamsExpr){

        // note: this we're setting up watches to simulate angular's isolated scope bindings

        // note: is REALLY important to watch for a change to the ngTableParams *reference* rather than
        // $watch for value equivalence. This is because ngTableParams references the current page of data as
        // a field and it's important not to watch this
        var tableParamsGetter = $parse(tableParamsExpr);
        $scope.$watch(tableParamsGetter, (function (params) {
            if (angular.isUndefined(params)) {
                return;
            }
            $scope.paramsModel = tableParamsGetter;
            $scope.params = params;
        }), false);

        if ($attrs.showFilter) {
            $scope.$parent.$watch($attrs.showFilter, function(value) {
                $scope.show_filter = value;
            });
        }
        if ($attrs.disableFilter) {
            $scope.$parent.$watch($attrs.disableFilter, function(value) {
                $scope.$filterRow.disabled = value;
            });
        }
    };



    function commonInit(){
        ngTableEventsChannel.onAfterReloadData(bindDataToScope, $scope, isMyPublisher);
        ngTableEventsChannel.onPagesChanged(bindPagesToScope, $scope, isMyPublisher);

        function bindDataToScope(params, newDatapage){
            if (params.settings().groupBy) {
                $scope.$groups = newDatapage;
            } else {
                $scope.$data = newDatapage;
            }
        }

        function bindPagesToScope(params, newPages){
            $scope.pages = newPages
        }

        function isMyPublisher(publisher){
            return $scope.params === publisher;
        }
    }

    commonInit();
}]);


/**
 * @ngdoc service
 * @name ngTableColumn
 * @module ngTable
 * @description
 * Service to construct a $column definition used by {@link ngTable ngTable} directive
 */
app.factory('ngTableColumn', [function () {

    var defaults = {
        'class': function(){ return ''; },
        filter: function(){ return false; },
        filterData: angular.noop,
        headerTemplateURL: function(){ return false; },
        headerTitle: function(){ return ''; },
        sortable: function(){ return false; },
        show: function(){ return true; },
        title: function(){ return ''; },
        titleAlt: function(){ return ''; }
    };

    /**
     * @ngdoc method
     * @name ngTableColumn#buildColumn
     * @description Creates a $column for use within a header template
     *
     * @param {Object} column an existing $column or simple column data object
     * @param {Scope} defaultScope the $scope to supply to the $column getter methods when not supplied by caller
     * @returns {Object} a $column object
     */
    function buildColumn(column, defaultScope){
        // note: we're not modifying the original column object. This helps to avoid unintended side affects
        var extendedCol = Object.create(column);
        for (var prop in defaults) {
            if (extendedCol[prop] === undefined) {
                extendedCol[prop] = defaults[prop];
            }
            if(!angular.isFunction(extendedCol[prop])){
                // wrap raw field values with "getter" functions
                // - this is to ensure consistency with how ngTable.compile builds columns
                // - note that the original column object is being "proxied"; this is important
                //   as it ensure that any changes to the original object will be returned by the "getter"
                (function(prop1){
                    extendedCol[prop1] = function(){
                        return column[prop1];
                    };
                })(prop);
            }
            (function(prop1){
                // satisfy the arguments expected by the function returned by parsedAttribute in the ngTable directive
                var getterFn = extendedCol[prop1];
                extendedCol[prop1] = function(){
                    if (arguments.length === 0){
                        return getterFn.call(column, defaultScope);
                    } else {
                        return getterFn.apply(column, arguments);
                    }
                };
            })(prop);
        }
        return extendedCol;
    }

    return {
        buildColumn: buildColumn
    };
}]);

/**
 * ngTable: Table + Angular JS
 *
 * @author Vitalii Savchuk <esvit666@gmail.com>
 * @url https://github.com/esvit/ng-table/
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

/**
 * @ngdoc directive
 * @name ngTable
 * @module ngTable
 * @restrict A
 *
 * @description
 * Directive that instantiates {@link ngTableController ngTableController}.
 */
app.directive('ngTable', ['$q', '$parse',
    function($q, $parse) {
        'use strict';

        return {
            restrict: 'A',
            priority: 1001,
            scope: true,
            controller: 'ngTableController',
            compile: function(element) {
                var columns = [],
                    i = 0,
                    row = null;

                // IE 8 fix :not(.ng-table-group) selector
                angular.forEach(angular.element(element.find('tr')), function(tr) {
                    tr = angular.element(tr);
                    if (!tr.hasClass('ng-table-group') && !row) {
                        row = tr;
                    }
                });
                if (!row) {
                    return;
                }
                angular.forEach(row.find('td'), function(item) {
                    var el = angular.element(item);
                    if (el.attr('ignore-cell') && 'true' === el.attr('ignore-cell')) {
                        return;
                    }

                    var getAttrValue = function(attr){
                        return el.attr('x-data-' + attr) || el.attr('data-' + attr) || el.attr(attr);
                    };

                    var parsedAttribute = function(attr) {
                        var expr = getAttrValue(attr);
                        if (!expr){
                            return undefined;
                        }
                        return function(scope, locals) {
                            return $parse(expr)(scope, angular.extend(locals || {}, {
                                $columns: columns
                            }));
                        };
                    };

                    var titleExpr = getAttrValue('title-alt') || getAttrValue('title');
                    if (titleExpr){
                        el.attr('data-title-text', '{{' + titleExpr + '}}'); // this used in responsive table
                    }
                    // NOTE TO MAINTAINERS: if you add extra fields to a $column be sure to extend ngTableColumn with
                    // a corresponding "safe" default
                    columns.push({
                        id: i++,
                        title: parsedAttribute('title'),
                        titleAlt: parsedAttribute('title-alt'),
                        headerTitle: parsedAttribute('header-title'),
                        sortable: parsedAttribute('sortable'),
                        'class': parsedAttribute('header-class'),
                        filter: parsedAttribute('filter'),
                        headerTemplateURL: parsedAttribute('header'),
                        filterData: parsedAttribute('filter-data'),
                        show: (el.attr("ng-if") ? function (scope) {
                            return $parse(el.attr("ng-if"))(scope);
                        } : undefined)
                    });
                });
                return function(scope, element, attrs, controller) {
                    scope.$columns = columns = controller.buildColumns(columns);

                    controller.setupBindingsToInternalScope(attrs.ngTable);
                    controller.loadFilterData(columns);
                    controller.compileDirectiveTemplates();
                };
            }
        }
    }
]);

/**
 * @ngdoc directive
 * @name ngTableDynamic
 * @module ngTable
 * @restrict A
 *
 * @description
 * A dynamic version of the {@link ngTable ngTable} directive that accepts a dynamic list of columns
 * definitions to render
 */
app.directive('ngTableDynamic', ['$parse', function ($parse){

    return {
        restrict: 'A',
        priority: 1001,
        scope: true,
        controller: 'ngTableController',
        compile: function(tElement) {
            var row;

            // IE 8 fix :not(.ng-table-group) selector
            angular.forEach(angular.element(tElement.find('tr')), function(tr) {
                tr = angular.element(tr);
                if (!tr.hasClass('ng-table-group') && !row) {
                    row = tr;
                }
            });
            if (!row) {
                return;
            }

            angular.forEach(row.find('td'), function(item) {
                var el = angular.element(item);
                var getAttrValue = function(attr){
                    return el.attr('x-data-' + attr) || el.attr('data-' + attr) || el.attr(attr);
                };

                // this used in responsive table
                var titleExpr = getAttrValue('title');
                if (!titleExpr){
                    el.attr('data-title-text', '{{$columns[$index].titleAlt(this) || $columns[$index].title(this)}}');
                }
                var showExpr = el.attr('ng-if');
                if (!showExpr){
                    el.attr('ng-if', '$columns[$index].show(this)');
                }
            });
            return function (scope, element, attrs, controller) {
                var expr = controller.parseNgTableDynamicExpr(attrs.ngTableDynamic);

                controller.setupBindingsToInternalScope(expr.tableParams);
                controller.compileDirectiveTemplates();

                scope.$watchCollection(expr.columns, function (newCols/*, oldCols*/) {
                    scope.$columns = controller.buildColumns(newCols);
                    controller.loadFilterData(scope.$columns);
                });
            };
        }
    };
}]);

(function(){
    'use strict';

    angular.module('ngTable')
        .directive('ngTableFilterRow', ngTableFilterRow);

    ngTableFilterRow.$inject = [];

    function ngTableFilterRow(){
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'ng-table/filterRow.html',
            scope: true,
            controller: 'ngTableFilterRowController'
        };
        return directive;
    }
})();

(function(){
    'use strict';

    angular.module('ngTable')
        .directive('ngTableSorterRow', ngTableSorterRow);

    ngTableSorterRow.$inject = [];

    function ngTableSorterRow(){
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'ng-table/sorterRow.html',
            scope: true,
            controller: 'ngTableSorterRowController'
        };
        return directive;
    }
})();

/**
 * ngTable: Table + Angular JS
 *
 * @author Vitalii Savchuk <esvit666@gmail.com>
 * @url https://github.com/esvit/ng-table/
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

/**
 * @ngdoc directive
 * @name ngTablePagination
 * @module ngTable
 * @restrict A
 */
app.directive('ngTablePagination', ['$compile', 'ngTableEventsChannel',
    function($compile, ngTableEventsChannel) {
        'use strict';

        return {
            restrict: 'A',
            scope: {
                'params': '=ngTablePagination',
                'templateUrl': '='
            },
            replace: false,
            link: function(scope, element/*, attrs*/) {

                ngTableEventsChannel.onAfterReloadData(function(pubParams) {
                    scope.pages = pubParams.generatePagesArray();
                }, scope, function(pubParams){
                    return pubParams === scope.params;
                });

                scope.$watch('templateUrl', function(templateUrl) {
                    if (angular.isUndefined(templateUrl)) {
                        return;
                    }
                    var template = angular.element(document.createElement('div'));
                    template.attr({
                        'ng-include': 'templateUrl'
                    });
                    element.append(template);
                    $compile(template)(scope);
                });
            }
        };
    }
]);

angular.module('ngTable').run(['$templateCache', function ($templateCache) {
	$templateCache.put('ng-table/filterRow.html', '<tr ng-show="show_filter" class="ng-table-filters"> <th data-title-text="{{$column.titleAlt(this) || $column.title(this)}}" ng-repeat="$column in $columns" ng-if="$column.show(this)" class="filter"> <div ng-repeat="(name, filter) in $column.filter(this)"> <div ng-include="config.getTemplateUrl(filter)"></div> </div> </th> </tr> ');
	$templateCache.put('ng-table/filters/number.html', '<input type="number" name="{{name}}" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="input-filter form-control"/> ');
	$templateCache.put('ng-table/filters/select-multiple.html', '<select ng-options="data.id as data.title for data in $column.data" ng-disabled="$filterRow.disabled" multiple ng-multiple="true" ng-model="params.filter()[name]" class="filter filter-select-multiple form-control" name="{{name}}"> </select> ');
	$templateCache.put('ng-table/filters/select.html', '<select ng-options="data.id as data.title for data in $column.data" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="filter filter-select form-control" name="{{name}}"> <option style="display:none" value=""></option> </select> ');
	$templateCache.put('ng-table/filters/text.html', '<input type="text" name="{{name}}" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="input-filter form-control"/> ');
	$templateCache.put('ng-table/header.html', '<ng-table-sorter-row></ng-table-sorter-row> <ng-table-filter-row></ng-table-filter-row> ');
	$templateCache.put('ng-table/pager.html', '<div class="ng-cloak ng-table-pager" ng-if="params.data.length"> <div ng-if="params.settings().counts.length" class="ng-table-counts btn-group pull-right"> <button ng-repeat="count in params.settings().counts" type="button" ng-class="{\'active\':params.count()==count}" ng-click="params.count(count)" class="btn btn-default"> <span ng-bind="count"></span> </button> </div> <ul class="pagination ng-table-pagination"> <li ng-class="{\'disabled\': !page.active && !page.current, \'active\': page.current}" ng-repeat="page in pages" ng-switch="page.type"> <a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a> <a ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a> <a ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a> </li> </ul> </div> ');
	$templateCache.put('ng-table/sorterRow.html', '<tr> <th title="{{$column.headerTitle(this)}}" ng-repeat="$column in $columns" ng-class="{ \'sortable\': $column.sortable(this), \'sort-asc\': params.sorting()[$column.sortable(this)]==\'asc\', \'sort-desc\': params.sorting()[$column.sortable(this)]==\'desc\' }" ng-click="sortBy($column, $event)" ng-if="$column.show(this)" ng-init="template=$column.headerTemplateURL(this)" class="header {{$column.class(this)}}"> <div ng-if="!template" class="ng-table-header" ng-class="{\'sort-indicator\': params.settings().sortingIndicator==\'div\'}"> <span ng-bind="$column.title(this)" ng-class="{\'sort-indicator\': params.settings().sortingIndicator==\'span\'}"></span> </div> <div ng-if="template" ng-include="template"></div> </th> </tr> ');
}]);
    return app;
}));