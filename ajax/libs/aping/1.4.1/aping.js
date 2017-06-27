/**
    @name: aping 
    @version: 1.4.1 (14-10-2016) 
    @author: Jonathan Hornung <jonathan.hornung@gmail.com> 
    @url: https://github.com/JohnnyTheTank/apiNG 
    @license: MIT
*/
angular.module('jtt_aping', [
    'jtt_aping_jsonloader',
    'jtt_aping_xml',
    'jtt_aping_ng_array',
    'jtt_aping_local_storage',
    'jtt_aping_json_string',
]);;'use strict';
angular.module('jtt_aping')
    .config(['$provide', function ($provide) {
        $provide.value('apingDefaultSettings', {
            apingApiKeys: {}
        });
    }])
    .value('apingResults', {})
    .directive('aping', ['apingResults', 'apingDefaultSettings', 'apingUtilityHelper', '$templateRequest', '$compile', function (apingResults, apingDefaultSettings, apingUtilityHelper, $templateRequest, $compile) {
        return {
            restrict: 'EA',
            transclude: true,
            template: '<ng-transclude></ng-transclude>',
            scope: {
                model: '@',
                getNativeData: '@',
                items: '@',
                maxItems: '@',
                orderBy: '@',
                orderReverse: '@',
                templateUrl: '@',
                payloadJson: '@',
                removeDoubles: '@',
                mergeDoubles: '@',
                idBy: '@',
                resultProperty: '@', // legacy
                resultName: '@',
                valueName: '@',
                protocol: '@'
            },
            link: function (scope, element, attrs, controller, transcludeFn) {

                var templatePath = scope.templateUrl;

                scope.$watch('templateUrl', function () {
                    renderTemplate(scope.templateUrl);
                });

                if (angular.isUndefined(templatePath)) {
                    if (angular.isDefined(apingDefaultSettings.templateUrl)) {
                        templatePath = apingDefaultSettings.templateUrl;
                        renderTemplate(templatePath);
                    }
                }

                function renderTemplate(_templatePath) {
                    if (angular.isDefined(_templatePath) && _templatePath !== '$NONE') {
                        $templateRequest(_templatePath).then(function (html) {
                            var template = angular.element(html);
                            element.empty().append(template);
                            $compile(template)(scope);
                        });
                    } else {
                        transcludeFn(scope, function (clone, innerScope) {
                            element.html('');
                            element.append(clone);
                            $compile(clone)(innerScope);
                        });
                    }
                    scope.$broadcast('apiNG.templateRendered');
                }
            },
            controller: ['$scope', function ($scope) {

                if(angular.isUndefined($scope.resultName)) {
                    if (angular.isUndefined($scope.resultProperty)) {
                        $scope.resultName = 'results';
                    } else {
                        $scope.resultName = $scope.resultProperty;
                    }
                }

                $scope[$scope.resultName] = [];
                $scope.payload = $scope.payloadJson ? apingUtilityHelper.replaceSingleQuotesAndParseJson($scope.payloadJson) : {};

                /**
                 * return current appSettings by merging 'apingDefaultSettings' and '$scope params'
                 * @returns {Object}
                 */
                this.getAppSettings = function () {

                    var items;
                    var maxItems;
                    var getNativeData;
                    var orderReverse;
                    var orderBy;
                    var removeDoubles;
                    var mergeDoubles;
                    var valueName;
                    var idBy;
                    var protocol;


                    if (angular.isDefined($scope.valueName)) {
                        valueName = $scope.valueName;
                    } else {
                        valueName = undefined;
                    }

                    if (angular.isDefined($scope.items)) {
                        items = $scope.items;
                    } else if (angular.isDefined(apingDefaultSettings.items)) {
                        items = apingDefaultSettings.items;
                    } else {
                        items = undefined;
                    }

                    if (angular.isDefined($scope.maxItems)) {
                        maxItems = $scope.maxItems;
                    } else if (angular.isDefined(apingDefaultSettings.maxItems)) {
                        maxItems = apingDefaultSettings.maxItems;
                    } else {
                        maxItems = undefined;
                    }

                    if (angular.isDefined($scope.getNativeData)) {
                        getNativeData = $scope.getNativeData;
                    } else if (angular.isDefined(apingDefaultSettings.getNativeData)) {
                        getNativeData = apingDefaultSettings.getNativeData;
                    } else {
                        getNativeData = false;
                    }

                    if (angular.isDefined($scope.maxItems)) {
                        maxItems = $scope.maxItems;
                    } else if (angular.isDefined(apingDefaultSettings.maxItems)) {
                        maxItems = apingDefaultSettings.maxItems;
                    } else {
                        maxItems = undefined;
                    }

                    if (angular.isDefined($scope.orderBy)) {
                        orderBy = $scope.orderBy;
                    } else if (angular.isDefined(apingDefaultSettings.orderBy)) {
                        orderBy = apingDefaultSettings.orderBy;
                    } else {
                        orderBy = undefined;
                    }

                    if (angular.isDefined($scope.orderReverse)) {
                        orderReverse = $scope.orderReverse;
                    } else if (angular.isDefined(apingDefaultSettings.orderReverse)) {
                        orderReverse = apingDefaultSettings.orderReverse;
                    } else {
                        orderReverse = false;
                    }

                    if (angular.isDefined($scope.removeDoubles)) {
                        removeDoubles = $scope.removeDoubles;
                    } else if (angular.isDefined(apingDefaultSettings.removeDoubles)) {
                        removeDoubles = apingDefaultSettings.removeDoubles;
                    } else {
                        removeDoubles = false;
                    }

                    if (angular.isDefined($scope.mergeDoubles)) {
                        mergeDoubles = $scope.mergeDoubles;
                    } else if (angular.isDefined(apingDefaultSettings.mergeDoubles)) {
                        mergeDoubles = apingDefaultSettings.mergeDoubles;
                    } else {
                        mergeDoubles = false;
                    }

                    if (angular.isDefined($scope.idBy)) {
                        idBy = $scope.idBy;
                    } else if (angular.isDefined(apingDefaultSettings.idBy)) {
                        idBy = apingDefaultSettings.idBy;
                    } else {
                        idBy = undefined;
                    }

                    if (angular.isDefined($scope.protocol)) {
                        protocol = $scope.protocol;
                    } else if (angular.isDefined(apingDefaultSettings.protocol)) {
                        protocol = apingDefaultSettings.protocol;
                    } else {
                        protocol = undefined;
                    }

                    return {
                        model: $scope.model || apingDefaultSettings.model || 'native',
                        getNativeData: getNativeData,
                        items: items,
                        maxItems: maxItems,
                        orderBy: orderBy,
                        orderReverse: orderReverse,
                        removeDoubles: removeDoubles,
                        mergeDoubles: mergeDoubles,
                        idBy: idBy,
                        valueName: valueName,
                        protocol: protocol
                    };
                };

                /**
                 * merge current '$scope.results' with '_array' and sorts, limits and filters the data
                 *
                 * @param _array
                 */
                this.concatToResults = function (_array) {
                    if(angular.isUndefined($scope.resultName)) {
                        if (angular.isUndefined($scope.resultProperty)) {
                            $scope.resultName = 'results';
                        } else {
                            $scope.resultName = $scope.resultProperty;
                        }
                    }

                    var tempArray = $scope[$scope.resultName].concat(_array);

                    var appSettings = this.getAppSettings();

                    if (angular.isDefined(appSettings.idBy)) {
                        tempArray = apingUtilityHelper.createIdByPropertiesForArray(tempArray, appSettings.idBy);
                        if (appSettings.mergeDoubles === true || appSettings.mergeDoubles === 'true') {
                            tempArray = apingUtilityHelper.mergeDuplicateObjectsFromArray(
                                tempArray,
                                (appSettings.orderBy === false || appSettings.orderBy === 'false' || appSettings.orderBy === '$NONE')
                            );
                        }
                    }

                    //remove doubles
                    if (appSettings.removeDoubles === true || appSettings.removeDoubles === 'true') {
                        if (appSettings.mergeDoubles !== true && appSettings.mergeDoubles !== 'true') {
                            tempArray = apingUtilityHelper.removeDuplicateObjectsFromArray(
                                tempArray,
                                (appSettings.orderBy === false || appSettings.orderBy === 'false' || appSettings.orderBy === '$NONE'),
                                angular.isDefined(appSettings.idBy)
                            );
                        }
                    }

                    //order array
                    if (angular.isDefined(appSettings.orderBy) && appSettings.orderBy !== false && appSettings.orderBy !== 'false' && appSettings.orderBy !== '$NONE') {
                        //order random
                        if (appSettings.orderBy === '$RANDOM') {
                            tempArray = apingUtilityHelper.shuffleArray(tempArray);
                        }
                        //order by attribute
                        else {
                            tempArray.sort(apingUtilityHelper.sortArrayByProperty(appSettings.orderBy));
                        }
                    }

                    //order reverse
                    if ((appSettings.orderReverse === true || appSettings.orderReverse === 'true') && appSettings.orderBy !== '$RANDOM') {
                        tempArray.reverse();
                    }

                    //crop spare
                    if (appSettings.maxItems > -1 && tempArray.length > appSettings.maxItems) {
                        tempArray = tempArray.splice(0, appSettings.maxItems);
                    }

                    if (angular.isDefined(appSettings.valueName)) {
                        apingResults[appSettings.valueName] = tempArray;
                    }

                    $scope[$scope.resultName] = tempArray;

                    $scope.$broadcast('apiNG.resultMerged', {resultName: $scope.resultName, valueName: $scope.valueName});
                    $scope.$emit('apiNG.resultMerged', {resultName: $scope.resultName, valueName: $scope.valueName});
                };
                this.apply = function () {
                    $scope.$apply();
                };
            }]
        };
    }]);;'use strict';
angular.module('jtt_aping')
    .service('apingTimeHelper', function () {

        /**
         * parse Timestamp from DateString and do some math
         *
         * @param _string {String}
         * @param _multiplier {number}
         * @param _add {number}
         * @returns {Number}
         */
        this.getTimestampFromDateString = function (_string, _multiplier, _add) {
            if (angular.isUndefined(_multiplier) || isNaN(_multiplier)) {
                _multiplier = 1;
            }
            if (angular.isUndefined(_add) || isNaN(_add)) {
                _add = 0;
            }
            if (typeof _string === 'string') {
                var a = _string.split(/[^0-9]/);
                try {
                    return parseInt(Math.round(new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]) / 1000 * _multiplier) + _add, 10);
                } catch (e) {
                    return 0;
                }
            }
            return 0;
        };
    })
    .service('apingUtilityHelper', ['apingInputObjects', 'apingDefaultSettings', function (apingInputObjects, apingDefaultSettings) {

        /**
         * return random matching API Key from apingDefaultSettings property 'apingApiKeys'. If there is no matching API Key, the function returns 'false'
         *
         * @param _platform {String}
         * @param _keyName {String}
         * @returns {String}
         */
        this.getApiCredentials = function (_platform, _keyName) {

            if (apingDefaultSettings.apingApiKeys) {
                if (apingDefaultSettings.apingApiKeys[_platform]) {
                    return apingDefaultSettings.apingApiKeys[_platform][Math.floor(Math.random() * apingDefaultSettings.apingApiKeys[_platform].length)][_keyName];
                }
            }
            return false;
        };

        /**
         * legacy function for this.parseRequestsFromAttributes()
         *
         * @param _string {String}
         * @param _platform {String}
         * @param _appSettings {Object}
         * @returns {Array}
         */
        this.parseJsonFromAttributes = function (_string, _platform, _appSettings) {
            return this.parseRequestsFromAttributes(_string, _platform, _appSettings);
        };

        /**
         * returns the difference between two integers
         *
         * @param _int1 {number}
         * @param _int2 {number}
         * @returns {number}
         */
        this.getDifference = function (_int1, _int2) {
            if (_int1 > _int2) {
                return _int1 - _int2;
            } else {
                return _int2 - _int1;
            }
        };

        /**
         * Parse JSON from Attributes and create requests
         *
         * @param _string {String}
         * @param _platform {String}
         * @param _appSettings {Object}
         * @returns {Array}
         */
        this.parseRequestsFromAttributes = function (_string, _platform, _appSettings) {
            if (!(typeof _string === 'string' && _string)) {
                return [];
            }
            var requests = [];
            var tempArray = this.replaceSingleQuotesAndParseJson(_string);
            if (tempArray.constructor === Array) {
                angular.forEach(tempArray, function (value) {
                    value.platform = _platform;
                    if (_appSettings) {
                        if (angular.isUndefined(value.items) && angular.isDefined(_appSettings.items)) {
                            value.items = _appSettings.items;
                        }
                        if (angular.isUndefined(value.model) && angular.isDefined(_appSettings.model)) {
                            value.model = _appSettings.model;
                        }
                    }
                    var request = apingInputObjects.getNew('request', value);
                    requests.push(request);
                });
            } else {
                requests.push(tempArray);
            }
            return requests;
        };

        /**
         * replace single quotes in string and parse JSON
         *
         * @param _string {String}
         * @returns {Array/Object}
         */
        this.replaceSingleQuotesAndParseJson = function (_string) {
            return angular.fromJson(_string.replace(/'/g, '"'));
        };

        /**
         * filter function to sort an array by a property
         *
         * @param _property {Function}
         * @returns {Function}
         */
        this.sortArrayByProperty = function (_property) {
            var sortOrder = 1;
            if (_property[0] === '-') {
                sortOrder = -1;
                _property = _property.substr(1);
            }
            return function (a, b) {
                var result = (a[_property] < b[_property]) ? -1 : (a[_property] > b[_property]) ? 1 : 0;
                return result * sortOrder;
            }
        };

        /**
         * shuffle array
         *
         * @param _array {Array}
         * @returns {Array}
         */
        this.shuffleArray = function (_array) {
            for (var i = _array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = _array[i];
                _array[i] = _array[j];
                _array[j] = temp;
            }
            return _array;
        };
        this.removeNullIn = function (prop, obj) {
            var pr = obj[prop];
            if (pr === null || pr === undefined) delete obj[prop];
            else if (typeof pr === 'object') for (var i in pr) this.removeNullIn(i, pr);
        };
        this.removeNull = function (obj) {
            for (var i in obj) {
                this.removeNullIn(i, obj);
            }
        };

        /**
         * remove double objects from array
         *
         * @param _array {Array}
         * @param _keepOrder {Boolean}
         * @param _useApingId {Boolean}
         * @returns {Array}
         */
        this.removeDuplicateObjectsFromArray = function (_array, _keepOrder, _useApingId) {
            var sortedArray = [];
            var propertyName;
            if (_useApingId) {
                propertyName = 'aping_id'
            } else {
                propertyName = 'apingStringified';
            }
            var orderPropertyName = 'apingTempOrder';
            if (_array.length === 1) {
                return _array;
            }
            angular.forEach(_array, function (firstValue, firstIndex) {
                if (!_useApingId) {
                    firstValue['$$hashKey'] = undefined;
                    firstValue[propertyName] = JSON.stringify(firstValue);
                }
                if (_keepOrder === true) {
                    firstValue[orderPropertyName] = firstIndex;
                }
                sortedArray.push(firstValue);
            });
            sortedArray.sort(this.sortArrayByProperty(propertyName));
            var lastValue;
            var reducedArray = [];
            angular.forEach(sortedArray, function (secondValue) {
                if (angular.isDefined(lastValue)) {
                    if (angular.isDefined(secondValue[propertyName]) && secondValue[propertyName] !== lastValue) {
                        reducedArray.push(secondValue);
                    }
                } else {
                    reducedArray.push(secondValue);
                }
                lastValue = secondValue[propertyName];
                if (!_useApingId) {
                    secondValue[propertyName] = undefined;
                }
            });
            if (_keepOrder === true) {
                reducedArray.sort(this.sortArrayByProperty(orderPropertyName));
                angular.forEach(reducedArray, function (thirdValue) {
                    thirdValue[orderPropertyName] = undefined;
                });
            }
            return reducedArray;
        };


        /**
         * merge duplicate objects from array
         *
         * @param _array {Array}
         * @param _keepOrder {Boolean}
         * @returns {Array}
         */
        this.mergeDuplicateObjectsFromArray = function (_array, _keepOrder) {
            var that = this;
            var sortedArray = [];
            var propertyName = 'aping_id';
            var orderPropertyName = 'apingTempOrder';
            if (_array.length === 1) {
                return _array;
            }
            angular.forEach(_array, function (firstValue, firstIndex) {
                if (_keepOrder === true) {
                    firstValue[orderPropertyName] = firstIndex;
                }
                sortedArray.push(firstValue);
            });
            sortedArray.sort(this.sortArrayByProperty(propertyName));
            var lastValue;
            var mergedArray = [];
            angular.forEach(sortedArray, function (secondValue) {
                that.removeNull(secondValue);
                if (angular.isDefined(lastValue)) {
                    if (angular.isDefined(secondValue[propertyName]) && secondValue[propertyName] !== lastValue) {
                        mergedArray.push(secondValue);
                    } else {
                        mergedArray[mergedArray.length - 1] = angular.merge(mergedArray[mergedArray.length - 1], mergedArray[mergedArray.length - 1], secondValue);
                    }
                } else {
                    mergedArray.push(secondValue);
                }
                lastValue = secondValue[propertyName];
            });
            if (_keepOrder === true) {
                mergedArray.sort(this.sortArrayByProperty(orderPropertyName));
                angular.forEach(mergedArray, function (thirdValue) {
                    thirdValue[orderPropertyName] = undefined;
                });
            }
            return mergedArray;
        };

        /**
         * Transforms html string to plain text
         *
         * @param _string {String}
         * @returns {String}
         */
        this.getTextFromHtml = function (_string) {
            _string = _string.replace(/&lt;br ?\/\>|&lt;br ?\/&rt;|\<br ?\/\>/g, ' ');
            _string = _string.replace(/<(?:.|\n)*?>/gm, '');
            return _string;
        };

        /**
         * Parses first image from html string
         *
         * @param _string
         * @returns {Array}
         */
        this.getFirstImageFromHtml = function (_string) {
            var re = /<img[^>]+src="([^">]+)/g;
            return re.exec(_string);
        };

        /**
         * Parses URL Parameters from URL (string)
         *
         * @param _string {String}
         * @returns {Object}
         */
        this.parseParametersFromUrl = function (_string) {
            var result = {};
            if (typeof _string === 'string') {
                result = JSON.parse('{"' + decodeURI(_string.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');
            }
            return result;
        };

        /**
         * Create ID property for each item in array by properties
         *
         * @param _array {Array}
         * @param _propertiesString {String}
         * @param _idString {String}
         * @returns {Array}
         */
        this.createIdByPropertiesForArray = function (_array, _propertiesString, _idString) {
            var that = this;
            if (angular.isUndefined(_idString) || !angular.isString(_idString)) {
                _idString = 'aping_id';
            }
            if (angular.isDefined(_array) && angular.isArray(_array)) {
                angular.forEach(_array, function (value) {
                    value[_idString] = that.getIdByPropertiesForObject(value, _propertiesString);
                });
            }
            return _array;
        };

        /**
         * Get ID by properties (for object)
         *
         * @param _object {Object}
         * @param _propertiesString {String}
         * @returns {String}
         */
        this.getIdByPropertiesForObject = function (_object, _propertiesString) {
            var that = this;
            var idString = '';
            if (angular.isDefined(_object) && angular.isObject(_object)) {
                var properties = [];
                if (_propertiesString.substr(0, 1) === '[') {
                    properties = this.replaceSingleQuotesAndParseJson(_propertiesString);
                } else {
                    properties.push(_propertiesString)
                }
                angular.forEach(properties, function (value) {
                    idString += that.getValueFromObjectByPropertyString(_object, value);
                });
            }
            return idString;
        };

        /**
         * Get value from object by property by string
         *
         * @param _object {Object}
         * @param _propertyString {String}
         * @param _resultObjectToString {String}
         * @returns {String}
         */
        this.getValueFromObjectByPropertyString = function (_object, _propertyString, _resultObjectToString) {
            var _value = '';
            if (angular.isDefined(_object) && angular.isObject(_object)) {
                var parts = _propertyString.split('.');
                var object = _object;
                angular.forEach(parts, function (value) {
                    if (angular.isDefined(object[value])) {
                        object = object[value];
                    }
                });
                if (angular.isDefined(object)) {
                    if (_resultObjectToString && angular.isObject(object)) {
                        _value = JSON.stringify(object);
                    } else {
                        _value = object;
                    }
                }
            }
            return _value;
        };

    }]);;'use strict';

angular.module('jtt_aping').service('apingInputObjects', ['apingDefaultSettings', function (apingDefaultSettings) {

    /**
     * * return new clean apiNG input object by _type and _params
     *
     * @param _type {String}
     * @param _params {Object}
     * @returns {Object}
     */
    this.getNew = function (_type, _params) {

        var inputObject = {};

        switch (_type) {
            case 'request':
                inputObject = angular.extend({
                    model: apingDefaultSettings.model
                }, _params);
                break;

            default:
                break;
        }

        return inputObject;
    }
}]);;'use strict';
angular.module('jtt_aping').service('apingModels', [function () {
    /**
     * return new clean apiNG model object by _model and _platform
     *
     * @param _model {String}
     * @param _platform {String}
     * @returns {Object}
     */
    this.getNew = function(_model, _platform) {
        //find apiNG models here: https://github.com/search?utf8=%E2%9C%93&q=apiNG-model
        var model = {
            platform : _platform,
            model: _model,
        };
        return model;
    };
}]);;'use strict';

angular.module('jtt_aping_jsonloader', [])
    .directive('apingJsonloader', ['apingUtilityHelper', 'jsonloaderFactory', function (apingUtilityHelper, jsonloaderFactory) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();
                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingJsonloader, 'jsonloader', appSettings);

                requests.forEach(function (request) {
                    if (request.path) {
                        //create requestObject for factory function call
                        var requestObject = {
                            path: request.path,
                        };

                        if (!request.format || request.format.toLowerCase() !== 'jsonp') {
                            requestObject.format = 'json';
                        } else {
                            requestObject.format = 'jsonp';
                        }

                        if (angular.isUndefined(request.items)) {
                            request.items = appSettings.items;
                        }

                        if (request.items === 0 || request.items === '0') {
                            return false;
                        }

                        // -1 is 'no explicit limit'. same for NaN value
                        if (request.items < 0 || isNaN(request.items)) {
                            request.items = undefined;
                        }

                        if (angular.isDefined(request.orderBy) && !angular.isString(request.orderBy)) {
                            request.orderBy = undefined;
                        }

                        if (angular.isDefined(request.orderReverse) && (request.orderReverse === true || request.orderReverse === 'true')) {
                            request.orderReverse = true;
                        }

                        if (angular.isDefined(request.xAuthToken)) {
                            requestObject.xAuthToken = request.xAuthToken;
                        }
                        jsonloaderFactory.getJsonData(requestObject)
                            .then(function (_data) {
                                var resultArray = [];
                                if (_data.data) {

                                    var results = _data.data;

                                    if (angular.isDefined(request.resultProperty)) {
                                        results = apingUtilityHelper.getValueFromObjectByPropertyString(results, request.resultProperty, false);
                                    }

                                    if (results.constructor !== Array) {
                                        resultArray.push(results);
                                    } else {
                                        angular.extend(resultArray, results);

                                        if (angular.isDefined(request.orderBy)) {
                                            if (request.orderBy === '$RANDOM') {
                                                resultArray = apingUtilityHelper.shuffleArray(resultArray);
                                            } else {
                                                resultArray.sort(apingUtilityHelper.sortArrayByProperty(request.orderBy));
                                            }
                                        }
                                        //order desc
                                        if (angular.isDefined(request.orderReverse) && request.orderReverse === true && request.orderBy !== '$RANDOM') {
                                            resultArray.reverse();
                                        }

                                        if (angular.isUndefined(request.items)) {
                                            resultArray = results;
                                        } else {
                                            //crop spare
                                            if (request.items > 0 && resultArray.length > request.items) {
                                                resultArray = resultArray.splice(0, request.items);
                                            }
                                        }
                                    }
                                }
                                apingController.concatToResults(resultArray);
                            });
                    }
                });
            }
        }
    }])
    .factory('jsonloaderFactory', ['$http', function ($http) {
        var jsonloaderFactory = {};

        jsonloaderFactory.getJsonData = function (_requestObject) {
            var params = {};

            if (_requestObject.format === 'jsonp') {

                var httpObject = {
                    method: 'GET',
                    params: {callback: 'JSON_CALLBACK'},
                };

                if (angular.isDefined(_requestObject.xAuthToken)) {
                    httpObject.headers = {
                        'X-Auth-Token': _requestObject.xAuthToken
                    }
                }

                return $http.jsonp(
                    _requestObject.path,
                    httpObject
                );

                /*
                 return $http({
                 method: 'JSONP',
                 url: _requestObject.path,
                 params: {callback: 'JSON_CALLBACK'},
                 });
                 */

            } else {

                var httpObject = {
                    method: 'GET',
                    url: _requestObject.path,
                    params: params,
                };

                if (angular.isDefined(_requestObject.xAuthToken)) {
                    httpObject.headers = {
                        'X-Auth-Token': _requestObject.xAuthToken
                    }
                }

                return $http(httpObject);
            }
        };
        return jsonloaderFactory;
    }]);;'use strict';

angular.module('jtt_aping_json_string', [])
    .directive('apingJsonString', ['apingUtilityHelper', function (apingUtilityHelper) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();
                var request = apingUtilityHelper.parseJsonFromAttributes(attrs.apingJsonString, 'apingJsonString', appSettings);

                var resultArray = [];

                if (request) {
                    if (request.constructor === Array) {
                        resultArray = request;
                    } else {
                        resultArray.push(request);
                    }
                    if (resultArray.length > 0) {
                        apingController.concatToResults(resultArray);
                    }
                }
            }
        }
    }]);;'use strict';

angular.module('jtt_aping_ng_array', [])
    .directive('apingNgArray', ['apingUtilityHelper', function (apingUtilityHelper) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();
                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingNgArray, 'ngArray', appSettings);

                requests.forEach(function (request) {

                    if (request.name && scope[request.name]) {

                        if (angular.isUndefined(request.items)) {
                            request.items = appSettings.items;
                        }
                        if (request.items === 0 || request.items === '0') {
                            return false;
                        }

                        // -1 is 'no explicit limit'. same for NaN value
                        if (request.items < 0 || isNaN(request.items)) {
                            request.items = undefined;
                        }

                        var resultArray = [];

                        if (scope[request.name].constructor === Array) {
                            resultArray = scope[request.name];
                            if (angular.isDefined(request.orderBy)) {
                                if (request.orderBy === '$RANDOM') {
                                    resultArray = apingUtilityHelper.shuffleArray(resultArray);
                                } else {
                                    resultArray.sort(apingUtilityHelper.sortArrayByProperty(request.orderBy));
                                }
                            }
                            //order desc
                            if (angular.isDefined(request.orderReverse) && request.orderReverse === true && request.orderBy !== '$RANDOM') {
                                resultArray.reverse();
                            }

                            if (angular.isDefined(request.items)) {
                                //crop spare
                                if (request.items > 0 && resultArray.length > request.items) {
                                    resultArray = resultArray.splice(0, request.items);
                                }
                            }

                        } else if (typeof scope[request.name] === 'object' && scope[request.name] !== null) {
                            resultArray.push(scope[request.name]);
                        }

                        if (resultArray.length > 0) {
                            apingController.concatToResults(resultArray);
                        }
                    }
                });
            }
        }
    }]);;angular.module('jtt_aping_local_storage', [])
    .directive('apingLocalStorage', ['apingUtilityHelper', 'apingLocalStorage', function (apingUtilityHelper, apingLocalStorage) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();
                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingLocalStorage, 'localStorage', appSettings);

                requests.forEach(function (request) {

                    if (request.key) {
                        if (angular.isUndefined(request.items)) {
                            request.items = appSettings.items;
                        }

                        if (request.items === 0 || request.items === '0') {
                            return false;
                        }

                        // -1 is 'no explicit limit'. same for NaN value
                        if (request.items < 0 || isNaN(request.items)) {
                            request.items = undefined;
                        }

                        if (angular.isDefined(request.orderBy) && !angular.isString(request.orderBy)) {
                            request.orderBy = undefined;
                        }

                        if (angular.isDefined(request.orderReverse) && (request.orderReverse === true || request.orderReverse === 'true')) {
                            request.orderReverse = true;
                        }
                        apingLocalStorage.get(request.key)

                            .then(function (_data) {
                                var resultArray = [];
                                if (_data) {

                                    var results = _data;

                                    if (angular.isDefined(request.resultProperty)) {
                                        //results = _data.data[request.resultProperty];
                                        results = apingUtilityHelper.getValueFromObjectByPropertyString(_data, request.resultProperty, false);
                                    }

                                    if (!angular.isArray(_data)) {
                                        resultArray.push(results);
                                    } else {
                                        resultArray = results;

                                        if (angular.isDefined(request.orderBy)) {
                                            if (request.orderBy === '$RANDOM') {
                                                resultArray = apingUtilityHelper.shuffleArray(resultArray);
                                            } else {
                                                resultArray.sort(apingUtilityHelper.sortArrayByProperty(request.orderBy));
                                            }
                                        }
                                        //order desc
                                        if (angular.isDefined(request.orderReverse) && request.orderReverse === true && request.orderBy !== '$RANDOM') {
                                            resultArray.reverse();
                                        }

                                        if (angular.isUndefined(request.items)) {
                                            resultArray = results;
                                        } else {
                                            //crop spare
                                            if (request.items > 0 && resultArray.length > request.items) {
                                                resultArray = resultArray.splice(0, request.items);
                                            }
                                        }
                                    }
                                }
                                apingController.concatToResults(resultArray);
                            });
                    }
                });
            }
        }
    }])
    .factory('apingLocalStorage', ['$window', '$q', function ($window, $q) {

        var set = function (key, value) {
            var deferred = $q.defer();

            deferred.resolve($window.localStorage && $window.localStorage.setItem(key, angular.toJson(value)));

            return deferred.promise;
        };

        var get = function (key) {
            var deferred = $q.defer();

            deferred.resolve($window.localStorage && angular.fromJson($window.localStorage.getItem(key)));

            return deferred.promise;
        };

        return {
            set: set,
            get: get
        };
    }]);;'use strict';

angular.module('jtt_aping_xml', [])
    .directive('apingXml', ['apingUtilityHelper', 'xmlFactory', 'xmlService', function (apingUtilityHelper, xmlFactory, xmlService) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();
                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingXml, 'xml', appSettings);

                requests.forEach(function (request) {

                    if (request.path) {
                        //create requestObject for factory function call
                        var requestObject = {
                            path: request.path,
                        };

                        if (angular.isUndefined(request.items)) {
                            request.items = appSettings.items;
                        }

                        if (request.items === 0 || request.items === '0') {
                            return false;
                        }

                        // -1 is 'no explicit limit'. same for NaN value
                        if (request.items < 0 || isNaN(request.items)) {
                            request.items = undefined;
                        }

                        if (angular.isDefined(request.orderBy) && !angular.isString(request.orderBy)) {
                            request.orderBy = undefined;
                        }

                        if (angular.isDefined(request.orderReverse) && (request.orderReverse === true || request.orderReverse === 'true')) {
                            request.orderReverse = true;
                        }

                        xmlFactory.getData(requestObject)
                            .then(function (_data) {

                                var resultArray = [];
                                if (_data.data) {
                                    var results = xmlService.xml2json(_data.data);

                                    if (angular.isDefined(request.resultProperty)) {
                                        results = apingUtilityHelper.getValueFromObjectByPropertyString(results, request.resultProperty, false);
                                    }

                                    if (results.constructor !== Array) {
                                        resultArray.push(results);
                                    } else {
                                        angular.extend(resultArray, results);

                                        if (angular.isDefined(request.orderBy)) {
                                            if (request.orderBy === '$RANDOM') {
                                                resultArray = apingUtilityHelper.shuffleArray(resultArray);
                                            } else {
                                                resultArray.sort(apingUtilityHelper.sortArrayByProperty(request.orderBy));
                                            }
                                        }
                                        //order desc
                                        if (angular.isDefined(request.orderReverse) && request.orderReverse === true && request.orderBy !== '$RANDOM') {
                                            resultArray.reverse();
                                        }

                                        if (angular.isUndefined(request.items)) {
                                            resultArray = results;
                                        } else {
                                            //crop spare
                                            if (request.items > 0 && resultArray.length > request.items) {
                                                resultArray = resultArray.splice(0, request.items);
                                            }
                                        }
                                    }
                                }
                                apingController.concatToResults(resultArray);
                            });
                    }
                });
            }
        }
    }])
    .factory('xmlFactory', ['$http', function ($http) {
        var xmlFactory = {};

        xmlFactory.getData = function (_requestObject) {
            var params = {};

            return $http({
                method: 'GET',
                url: _requestObject.path,
                params: params
            });
        };
        return xmlFactory;
    }])
    .service('xmlService', function () {

        var _this = this;

        /**
         * Removes some characters that would break the recursive function.
         *
         * @param xmlStr
         * @returns {*}
         */
        this.cleanXML = function (xmlStr) {

            xmlStr = xmlStr.replace(/\n|\t|\r/g, ''); //replace special characters
            xmlStr = xmlStr.replace(/ {1,}<|\t{1,}</g, '<'); //replace leading spaces and tabs
            xmlStr = xmlStr.replace(/> {1,}|>\t{1,}/g, '>'); //replace trailing spaces and tabs
            xmlStr = xmlStr.replace(/<\?[^>]*\?>/g, ''); //delete docType tags

            xmlStr = _this.replaceSelfClosingTags(xmlStr); //replace self closing tags
            xmlStr = _this.replaceAloneValues(xmlStr); //replace the alone tags values
            xmlStr = _this.replaceAttributes(xmlStr); //replace attributes

            return xmlStr;
        };

        /**
         * Replaces all the self closing tags with attributes with another tag containing its attribute as a property.
         * The function works if the tag contains multiple attributes.
         * Example : '<tagName attrName="attrValue" />' becomes
         *           '<tagName><attrName>attrValue</attrName></tagName>'
         */
        this.replaceSelfClosingTags = function (xmlStr) {

            var selfClosingTags = xmlStr.match(/<[^/][^>]*\/>/g);

            if (selfClosingTags) {
                for (var i = 0; i < selfClosingTags.length; i++) {

                    var oldTag = selfClosingTags[i];
                    var tempTag = oldTag.substring(0, oldTag.length - 2);
                    tempTag += '>';

                    var tagName = oldTag.match(/[^<][\w+$]*/)[0];
                    var closingTag = '</' + tagName + '>';
                    var newTag = '<' + tagName + '>';

                    var attrs = tempTag.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g);

                    if (attrs) {
                        for (var j = 0; j < attrs.length; j++) {
                            var attr = attrs[j];
                            var attrName = attr.substring(0, attr.indexOf('='));
                            var attrValue = attr.substring(attr.indexOf('"') + 1, attr.lastIndexOf('"'));

                            newTag += '<' + attrName + '>' + attrValue + '</' + attrName + '>';
                        }
                    }

                    newTag += closingTag;

                    xmlStr = xmlStr.replace(oldTag, newTag);
                }
            }

            return xmlStr;
        };

        /**
         * Replaces all the tags with attributes and a value with a new tag.
         * Example : '<tagName attrName="attrValue">tagValue</tagName>' becomes
         *           '<tagName><attrName>attrValue</attrName><_@attribute>tagValue</_@attribute></tagName>'
         * @param xmlStr
         * @returns {*}
         */
        this.replaceAloneValues = function(xmlStr) {

            var tagsWithAttributesAndValue = xmlStr.match(/<[^\/][^>][^<]+\s+.[^<]+[=][^<]+>{1}([^<]+)/g);

            if (tagsWithAttributesAndValue) {
                for (var i = 0; i < tagsWithAttributesAndValue.length; i++) {

                    var oldTag = tagsWithAttributesAndValue[i];
                    var oldTagName = oldTag.substring(0, oldTag.indexOf('>') + 1);
                    var oldTagValue = oldTag.substring(oldTag.indexOf('>') + 1);

                    var newTag = oldTagName + '<_@ttribute>' + oldTagValue + '</_@ttribute>';

                    xmlStr = xmlStr.replace(oldTag, newTag);
                }
            }

            return xmlStr;
        };

        /**
         * Replaces all the tags with attributes with another tag containing its attribute as a property.
         * The function works if the tag contains multiple attributes.
         *
         * Example : '<tagName attrName="attrValue"></tagName>' becomes '<tagName><attrName>attrValue</attrName></tagName>'
         */
        this.replaceAttributes = function(xmlStr) {

            var tagsWithAttributes = xmlStr.match(/<[^\/][^>][^<]+\s+.[^<]+[=][^<]+>/g);

            if (tagsWithAttributes) {
                for (var i = 0; i < tagsWithAttributes.length; i++) {

                    var oldTag = tagsWithAttributes[i];
                    var tagName = oldTag.match(/[^<][\w+$]*/)[0];
                    var newTag = '<' + tagName + '>';
                    var attrs = oldTag.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g);

                    if (attrs) {
                        for (var j = 0; j < attrs.length; j++) {

                            var attr = attrs[j];
                            var attrName = attr.substring(0, attr.indexOf('='));
                            var attrValue = attr.substring(attr.indexOf('"') + 1, attr.lastIndexOf('"'));

                            newTag += '<' + attrName + '>' + attrValue + '</' + attrName + '>';
                        }
                    }

                    xmlStr = xmlStr.replace(oldTag, newTag);
                }
            }

            return xmlStr;
        }

        /**
         * Recursive function that creates a JSON object with a given XML string.
         */
        this.xml2json = function(xmlStr) {

            xmlStr = this.cleanXML(xmlStr);

            var obj = {},
                tagName, indexClosingTag, inner_substring, tempVal, openingTag;

            while (xmlStr.match(/<[^\/][^>]*>/)) {
                openingTag = xmlStr.match(/<[^\/][^>]*>/)[0];
                tagName = openingTag.substring(1, openingTag.length - 1);
                indexClosingTag = xmlStr.indexOf(openingTag.replace('<', '</'));

                // account for case where additional information in the openning tag
                if (indexClosingTag == -1) {

                    tagName = openingTag.match(/[^<][\w+$]*/)[0];
                    indexClosingTag = xmlStr.indexOf('</' + tagName);
                    if (indexClosingTag == -1) {
                        indexClosingTag = xmlStr.indexOf('<\\/' + tagName);
                    }
                }
                inner_substring = xmlStr.substring(openingTag.length, indexClosingTag);
                if (inner_substring.match(/<[^\/][^>]*>/)) {
                    tempVal = _this.xml2json(inner_substring);
                }
                else {
                    tempVal = inner_substring;
                }
                // account for array or obj //
                if (obj[tagName] === undefined) {
                    obj[tagName] = tempVal;
                }
                else if (Array.isArray(obj[tagName])) {
                    obj[tagName].push(tempVal);
                }
                else {
                    obj[tagName] = [obj[tagName], tempVal];
                }

                xmlStr = xmlStr.substring(openingTag.length * 2 + 1 + inner_substring.length);
            }

            return obj;
        }
    });