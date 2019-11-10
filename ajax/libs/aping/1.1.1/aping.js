/**
    @name: aping 
    @version: 1.1.1 (31-01-2016) 
    @author: Jonathan Hornung <jonathan.hornung@gmail.com> 
    @url: https://github.com/JohnnyTheTank/apiNG 
    @license: MIT
*/
angular.module('jtt_aping', [
  'jtt_aping_jsonloader',
  'jtt_aping_ng_array'
]);;"use strict";
angular.module('jtt_aping')

    .config(['$provide', function ($provide) {

        $provide.value("apingDefaultSettings", {
            apingApiKeys: {}
        });

    }])
    .value("apingResults", {})
    .directive('aping', ['apingResults', 'apingDefaultSettings', 'apingUtilityHelper', '$templateRequest', '$compile', function (apingResults, apingDefaultSettings, apingUtilityHelper, $templateRequest, $compile) {
        return {
            restrict: 'E',
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
                valueName: '@'
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
                    if (angular.isDefined(_templatePath) && _templatePath !== "$NONE") {
                        $templateRequest(_templatePath).then(function (html) {
                            var template = angular.element(html);
                            element.empty().append(template);
                            $compile(template)(scope);
                        });
                    } else {
                        transcludeFn(scope, function (clone, innerScope) {
                            element.append(clone);
                            $compile(clone)(innerScope);
                        });
                    }
                }

            },
            controller: ['$scope', function ($scope) {

                $scope.results = [];
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
                    var valueName;


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

                    return {
                        model: $scope.model || apingDefaultSettings.model || "native",
                        getNativeData: getNativeData,
                        items: items,
                        maxItems: maxItems,
                        orderBy: orderBy,
                        orderReverse: orderReverse,
                        removeDoubles: removeDoubles,
                        valueName: valueName
                    };
                };

                /**
                 * merge current '$scope.results' with '_array' and sorts, limits and filters the data
                 *
                 * @param _array
                 */
                this.concatToResults = function (_array) {
                    $scope.results = $scope.results.concat(_array);

                    var appSettings = this.getAppSettings();

                    //remove doubles
                    if (appSettings.removeDoubles === true || appSettings.removeDoubles === "true") {
                        $scope.results = apingUtilityHelper.removeDuplicateObjectsFromArray($scope.results, (appSettings.orderBy === false || appSettings.orderBy === "false" || appSettings.orderBy === "$NONE"));
                    }

                    //order array
                    if (angular.isDefined(appSettings.orderBy) && appSettings.orderBy !== false && appSettings.orderBy !== "false" && appSettings.orderBy !== "$NONE") {
                        //order random
                        if (appSettings.orderBy === "$RANDOM") {
                            $scope.results = apingUtilityHelper.shuffleArray($scope.results);
                        }
                        //order by attribute
                        else {
                            $scope.results.sort(apingUtilityHelper.sortArrayByProperty(appSettings.orderBy));
                            if (appSettings.orderReverse === true || appSettings.orderReverse === "true") {
                                //order desc
                                $scope.results.reverse();
                            }
                        }
                    }
                    //crop spare
                    if (appSettings.maxItems > -1 && $scope.results.length > appSettings.maxItems) {
                        $scope.results = $scope.results.splice(0, appSettings.maxItems);
                    }

                    if (angular.isDefined(appSettings.valueName)) {
                        apingResults[appSettings.valueName] = $scope.results;
                    }

                    $scope.$broadcast('apiNG.resultMerged');
                };
                this.apply = function () {
                    $scope.$apply();
                };
            }]
        };
    }]);;"use strict";

angular.module('jtt_aping').service('apingTimeHelper', function () {

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

            if (typeof _string === "string") {
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
         * return random matching API Key from apingDefaultSettings property "apingApiKeys". If there is no matching API Key, the function returns 'false'
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

            if (!(typeof _string === "string" && _string)) {
                return [];
            }

            var requests = [];

            var tempArray = this.replaceSingleQuotesAndParseJson(_string);

            angular.forEach(tempArray, function (value, key) {

                value.platform = _platform;

                if (_appSettings) {
                    if (angular.isUndefined(value.items) && angular.isDefined(_appSettings.items)) {
                        value.items = _appSettings.items;
                    }
                    if (angular.isUndefined(value.model) && angular.isDefined(_appSettings.model)) {
                        value.model = _appSettings.model;
                    }
                }

                var request = apingInputObjects.getNew("request", value);
                requests.push(request);

            });

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
            if (_property[0] === "-") {
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


        /**
         * remove double objects from array
         *
         * @param _array {Array}
         * @param _keepOrder {Boolean}
         * @returns {Array}
         */
        this.removeDuplicateObjectsFromArray = function (_array, _keepOrder) {
            var sortedArray = [];

            var stringifyPropertyName = 'apingStringified';
            var orderPropertyName = 'apingTempOrder';

            if (_array.length === 1) {
                return _array;
            }

            angular.forEach(_array, function (firstValue, firstIndex) {
                firstValue['$$hashKey'] = undefined;
                firstValue[stringifyPropertyName] = JSON.stringify(firstValue);

                if (_keepOrder === true) {
                    firstValue[orderPropertyName] = firstIndex;
                }
                sortedArray.push(firstValue);
            });

            sortedArray.sort(this.sortArrayByProperty(stringifyPropertyName));

            var lastValue;

            var reducedArray = [];

            angular.forEach(sortedArray, function (secondValue, secondIndex) {
                if (angular.isDefined(lastValue)) {
                    if (angular.isDefined(secondValue[stringifyPropertyName]) && secondValue[stringifyPropertyName] !== lastValue) {
                        reducedArray.push(secondValue);
                    }
                } else {
                    reducedArray.push(secondValue);
                }
                lastValue = secondValue[stringifyPropertyName];
                secondValue[stringifyPropertyName] = undefined;
            });


            if (_keepOrder === true) {
                sortedArray.sort(this.sortArrayByProperty(orderPropertyName));

                angular.forEach(sortedArray, function (thirdValue, thirdIndex) {
                    thirdValue[orderPropertyName] = undefined;
                });
            }

            return reducedArray;
        };

        /**
         * Transforms html string to plain text
         *
         * @param _string {String}
         * @returns {String}
         */
        this.getTextFromHtml = function(_string) {
            _string = _string.replace(/&lt;br ?\/\>|&lt;br ?\/&rt;|\<br ?\/\>/g, " ");
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

            if(typeof _string === 'string') {
                result = JSON.parse('{"' + decodeURI(_string.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
            }

            return result;
        }
    }]);;"use strict";

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
            case "request":
                inputObject = angular.extend({
                    model: apingDefaultSettings.model
                }, _params);
                break;

            default:
                break;
        }

        return inputObject;
    }
}]);;"use strict";
angular.module('jtt_aping').service('apingModels', [function () {
    /**
     * return new clean apiNG model object by _model and _platform
     *
     * @param _model {String}
     * @param _platform {String}
     * @returns {Object}
     */
    this.getNew = function(_model, _platform) {
        var model = {};
        switch(_model) { 
            case "social":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    blog_name : undefined, //NAME of blog (channel / youtube uploader / facebook page, instagram account, ..)
                    blog_id : undefined, //ID of channel / page / account, ...
                    blog_link : undefined, //link to channel / uploader / page / account, ...
                    type : undefined, //"video", "image", "post", "audio", "link", "event", ...
                    timestamp : undefined,
                    date_time: undefined,
                    post_url : undefined, //URL to the post / video / tweet ...
                    intern_id : undefined, // INTERN ID of post / video / tweet / ... (facebook id, youtube id, ...)
                    text : undefined,
                    caption : undefined,
                    img_url : undefined, // preview image url (best case 700px)
                    thumb_url : undefined, // best case 200px (min)
                    native_url: undefined, // native image url
                    source : undefined, //
                    likes: undefined,
                    shares: undefined,
                    comments: undefined,
                    position: undefined
                };
                break;

            case "video":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    blog_name : undefined, //NAME of blog (channel / page / instagram account / ..)
                    blog_id : undefined, //ID of channel / page / account, ...
                    blog_link : undefined, //link to channel / uploader / page / account, ...
                    timestamp : undefined, //timestamp of created_at
                    date_time: undefined, //datetime of created_at
                    post_url : undefined, //URL to the post / video / tweet ...
                    intern_id : undefined, // INTERN ID of video (facebook id, youtube id, ...)
                    caption : undefined, // video title
                    text : undefined, // video description
                    img_url : undefined, // preview image url (best case 700px)
                    thumb_url : undefined, // best case 200px (min)
                    native_url: undefined, // native image url
                    source : undefined, // url to .mp4 file
                    markup: undefined, // markup to embed video
                    duration: undefined, // in seconds
                    width: undefined, // width in pixels
                    height: undefined, // height in pixels
                    comments: undefined, // comments_count
                    likes: undefined, // likes_count
                    shares: undefined, // shares_count
                    position: undefined // position in playlist
                };
                break;

            case "image":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    blog_name : undefined, //NAME of blog (channel / youtube uploader / facebook page, instagram account, ..)
                    blog_id : undefined, //ID of channel / page / account, ...
                    blog_link : undefined, //link to channel / uploader / page / account, ...
                    timestamp : undefined,
                    date_time: undefined,
                    post_url : undefined, //URL to the post / video / tweet ...
                    intern_id : undefined, // INTERN ID of image (facebook id, instagram id, ...)
                    text : undefined,
                    caption : undefined,
                    thumb_url : undefined, // best case 200px (min)
                    thumb_width: undefined,
                    thumb_height: undefined,
                    img_url : undefined, // best case 700px
                    img_width: undefined,
                    img_height: undefined,
                    native_url: undefined,
                    native_width: undefined,
                    native_height: undefined,
                    source : undefined, //
                    likes: undefined,
                    shares: undefined,
                    comments: undefined,
                    position: undefined
                };
                break;

            case "event":
                model = {
                    platform : _platform, //NAME of platform ( "facebook", "bandsintown" , ...)
                    artist_name : undefined,
                    artist_id : undefined,
                    artist_link : undefined,
                    start_timestamp : undefined,
                    start_date_time: undefined,
                    end_timestamp: undefined,
                    end_date_time: undefined,
                    event_url : undefined, //URL to the event
                    ticket_url : undefined, //URL to the ticket
                    sold_out : undefined,
                    intern_id : undefined, // INTERN ID of event (facebook id, instagram id, ...)
                    text : undefined,
                    caption : undefined,
                    img_url : undefined,
                    place_name : undefined,
                    city: undefined,
                    country: undefined,
                    latitude: undefined,
                    longitude : undefined,
                    street: undefined,
                    zip : undefined,
                    source : undefined
                };
                break;

            case "repo":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    owner_name : undefined,
                    owner_id : undefined,
                    owner_link : undefined,
                    owner_img_url : undefined,
                    name : undefined,
                    id: undefined,
                    fullname: undefined,
                    description : undefined,
                    url : undefined,
                    homepage : undefined,
                    language : undefined,
                    clone_url : undefined,
                    git_url : undefined,
                    ssh_url : undefined,
                    svn_url : undefined,
                    isFork : undefined,
                    openIssues : undefined,
                    watchers : undefined,
                    stargazers : undefined,
                    forks : undefined,
                    created_timestamp : undefined,
                    created_date_time: undefined,
                    updated_timestamp: undefined,
                    updated_date_time: undefined,
                    pushed_timestamp: undefined,
                    pushed_date_time: undefined
                };
                break;

            case "weather":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    weather_code: undefined,
                    weather_caption: undefined, //rain
                    weather_text : undefined, //light rain
                    weather_icon_name: undefined,
                    weather_icon_url: undefined,

                    temp: undefined,
                    pressure: undefined,
                    humidity: undefined,
                    temp_min: undefined,
                    temp_max: undefined,
                    sea_level: undefined,
                    grnd_level: undefined,
                    wind_speed: undefined,
                    wind_deg: undefined,
                    rain_duration: undefined,
                    rain_volume: undefined,
                    clouds: undefined,

                    timestamp: undefined,
                    date_time: undefined,

                    sunrise_timestamp : undefined,
                    sunrise_date_time : undefined,
                    sunset_timestamp : undefined,
                    sunset_date_time : undefined,

                    loc_city : undefined,
                    loc_city_id: undefined,
                    loc_country : undefined,
                    loc_lat : undefined,
                    loc_lng : undefined,
                    loc_zip : undefined
                };
                break;

            default:
                break;
        }
        return model;
    };
}]);;angular.module("jtt_aping_jsonloader", []);"use strict";

angular.module("jtt_aping_jsonloader")
    .directive('apingJsonloader', ['apingUtilityHelper', 'jsonloaderFactory', function (apingUtilityHelper, jsonloaderFactory) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();
                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingJsonloader, "jsonloader", appSettings);

                requests.forEach(function (request) {

                    if (request.path) {
                        //create requestObject for factory function call
                        var requestObject = {
                            path: request.path,
                        };

                        if (!request.format || request.format.toLowerCase() !== "jsonp") {
                            requestObject.format = "json";
                        } else {
                            requestObject.format = "jsonp";
                        }

                        if (angular.isDefined(request.items)) {
                            requestObject.count = request.items;
                        } else {
                            requestObject.count = appSettings.items;
                        }

                        if (requestObject.count === 0 || requestObject.count === '0') {
                            return false;
                        }

                        // -1 is "no explicit limit". same for NaN value
                        if (requestObject.count < 0 || isNaN(requestObject.count)) {
                            requestObject.count = undefined;
                        }

                        jsonloaderFactory.getJsonData(requestObject)

                            .then(function (_data) {

                                var resultArray = [];
                                if (_data.data) {

                                    var results = _data.data;

                                    if (angular.isDefined(request.resultProperty)) {
                                        results = _data.data[request.resultProperty];
                                    }

                                    if (_data.data.constructor !== Array) {
                                        resultArray.push(results);
                                    } else {
                                        if (request.items < 0 || angular.isUndefined(request.items)) {
                                            resultArray = results;
                                        } else {
                                            angular.forEach(results, function (value, key) {
                                                if (key < request.items) {
                                                    resultArray.push(value);
                                                }
                                            });
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

            if (_requestObject.format === "jsonp") {

                return $http.jsonp(
                    _requestObject.path,
                    {
                        method: 'GET',
                        params: {callback: "JSON_CALLBACK"},
                    }
                );

                /*
                return $http({
                    method: 'JSONP',
                    url: _requestObject.path,
                    params: {callback: "JSON_CALLBACK"'},
                });
                */

            } else {
                return $http({
                    method: 'GET',
                    url: _requestObject.path,
                    params: params
                });
            }
        };
        return jsonloaderFactory;
    }]);;angular.module("jtt_aping_ng_array", []);"use strict";

angular.module("jtt_aping_ng_array")
    .directive('apingNgArray', ['apingUtilityHelper', function (apingUtilityHelper) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();
                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingNgArray, "ngArray", appSettings);

                requests.forEach(function (request) {

                    if (request.name && scope[request.name]) {

                        var requestObject = {};

                        if(angular.isDefined(request.items)) {
                            requestObject.count = request.items;
                        } else {
                            requestObject.count = appSettings.items;
                        }

                        if(requestObject.count === 0 || requestObject.count === '0') {
                            return false;
                        }

                        // -1 is "no explicit limit". same for NaN value
                        if(requestObject.count < 0 || isNaN(requestObject.count)) {
                            requestObject.count = undefined;
                        }

                        var resultArray = [];

                        if (scope[request.name].constructor === Array) {
                            if (requestObject.items < 0 || angular.isUndefined(requestObject.items)) {
                                resultArray = scope[request.name];
                            } else {
                                angular.forEach(scope[request.name], function (value, key) {
                                    if (key < request.items) {
                                        resultArray.push(value);
                                    }
                                });
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
    }]);