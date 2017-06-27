/**
    @name: aping 
    @version: 1.2.6 (02-03-2016) 
    @author: Jonathan Hornung <jonathan.hornung@gmail.com> 
    @url: https://github.com/JohnnyTheTank/apiNG 
    @license: MIT
*/
angular.module('jtt_aping', [
    'jtt_aping_jsonloader',
    'jtt_aping_ng_array',
    'jtt_aping_local_storage'
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
                mergeDoubles: '@',
                idBy: '@',
                resultProperty: '@',
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
                    scope.$broadcast('apiNG.templateRendered');
                }

            },
            controller: ['$scope', function ($scope) {

                if (angular.isUndefined($scope.resultProperty)) {
                    $scope.resultProperty = "results";
                }

                $scope[$scope.resultProperty] = [];
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

                    return {
                        model: $scope.model || apingDefaultSettings.model || "native",
                        getNativeData: getNativeData,
                        items: items,
                        maxItems: maxItems,
                        orderBy: orderBy,
                        orderReverse: orderReverse,
                        removeDoubles: removeDoubles,
                        mergeDoubles: mergeDoubles,
                        idBy: idBy,
                        valueName: valueName
                    };
                };

                /**
                 * merge current '$scope.results' with '_array' and sorts, limits and filters the data
                 *
                 * @param _array
                 */
                this.concatToResults = function (_array) {
                    if (angular.isUndefined($scope.resultProperty)) {
                        $scope.resultProperty = "results";
                    }

                    var tempArray = $scope[$scope.resultProperty].concat(_array);

                    var appSettings = this.getAppSettings();

                    if (angular.isDefined(appSettings.idBy)) {
                        tempArray = apingUtilityHelper.createIdByPropertiesForArray(tempArray, appSettings.idBy);
                        if (appSettings.mergeDoubles === true || appSettings.mergeDoubles === "true") {
                            tempArray = apingUtilityHelper.mergeDuplicateObjectsFromArray(
                                tempArray,
                                (appSettings.orderBy === false || appSettings.orderBy === "false" || appSettings.orderBy === "$NONE")
                            );
                        }
                    }

                    //remove doubles
                    if (appSettings.removeDoubles === true || appSettings.removeDoubles === "true") {
                        if (appSettings.mergeDoubles !== true && appSettings.mergeDoubles !== "true") {
                            tempArray = apingUtilityHelper.removeDuplicateObjectsFromArray(
                                tempArray,
                                (appSettings.orderBy === false || appSettings.orderBy === "false" || appSettings.orderBy === "$NONE"),
                                angular.isDefined(appSettings.idBy)
                            );
                        }
                    }

                    //order array
                    if (angular.isDefined(appSettings.orderBy) && appSettings.orderBy !== false && appSettings.orderBy !== "false" && appSettings.orderBy !== "$NONE") {
                        //order random
                        if (appSettings.orderBy === "$RANDOM") {
                            tempArray = apingUtilityHelper.shuffleArray(tempArray);
                        }
                        //order by attribute
                        else {
                            tempArray.sort(apingUtilityHelper.sortArrayByProperty(appSettings.orderBy));
                        }
                    }

                    //order reverse
                    if ((appSettings.orderReverse === true || appSettings.orderReverse === "true") && appSettings.orderBy !== "$RANDOM") {
                        tempArray.reverse();
                    }

                    //crop spare
                    if (appSettings.maxItems > -1 && tempArray.length > appSettings.maxItems) {
                        tempArray = tempArray.splice(0, appSettings.maxItems);
                    }

                    if (angular.isDefined(appSettings.valueName)) {
                        apingResults[appSettings.valueName] = tempArray;
                    }

                    $scope[$scope.resultProperty] = tempArray;

                    $scope.$broadcast('apiNG.resultMerged', {'resultProperty': $scope.resultProperty});
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
                propertyName = "aping_id"
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
            angular.forEach(sortedArray, function (secondValue, secondIndex) {
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
                angular.forEach(reducedArray, function (thirdValue, thirdIndex) {
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
            var propertyName = "aping_id";
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
            angular.forEach(sortedArray, function (secondValue, secondIndex) {
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
                angular.forEach(mergedArray, function (thirdValue, thirdIndex) {
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
                _idString = "aping_id";
            }
            if (angular.isDefined(_array) && angular.isArray(_array)) {
                angular.forEach(_array, function (value, key) {
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
            var idString = "";
            if (angular.isDefined(_object) && angular.isObject(_object)) {
                var properties = [];
                if (_propertiesString.substr(0, 1) === "[") {
                    properties = this.replaceSingleQuotesAndParseJson(_propertiesString);
                } else {
                    properties.push(_propertiesString)
                }
                angular.forEach(properties, function (value, key) {
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
            var _value = "";
            if (angular.isDefined(_object) && angular.isObject(_object)) {
                var parts = _propertyString.split(".");
                var object = _object;
                angular.forEach(parts, function (value, key) {
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
                    /*
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
                    */
                };
                break;

            case "video":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    /*
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
                    */
                };
                break;

            case "image":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    /*
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
                    */
                };
                break;

            case "event":
                model = {
                    platform : _platform, //NAME of platform ( "facebook", "bandsintown" , ...)
                    /*
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
                    */
                };
                break;

            case "repo":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    /*
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
                    */
                };
                break;

            case "weather":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    /*
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
                    */
                };
                break;
        }
        return model;
    };
}]);;"use strict";

angular.module("jtt_aping_jsonloader", [])
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

                        if (angular.isUndefined(request.items)) {
                            request.items = appSettings.items;
                        }

                        if (request.items === 0 || request.items === '0') {
                            return false;
                        }

                        // -1 is "no explicit limit". same for NaN value
                        if (request.items < 0 || isNaN(request.items)) {
                            request.items = undefined;
                        }

                        if (angular.isDefined(request.orderBy) && !angular.isString(request.orderBy)) {
                            request.orderBy = undefined;
                        }

                        if (angular.isDefined(request.orderReverse) && (request.orderReverse === true || request.orderReverse === 'true')) {
                            request.orderReverse = true;
                        }
                        jsonloaderFactory.getJsonData(requestObject)

                            .then(function (_data) {

                                var resultArray = [];
                                if (_data.data) {

                                    var results = _data.data;

                                    if (angular.isDefined(request.resultProperty)) {
                                        //results = _data.data[request.resultProperty];
                                        results = apingUtilityHelper.getValueFromObjectByPropertyString(_data.data, request.resultProperty, false);
                                    }

                                    if (_data.data.constructor !== Array) {
                                        resultArray.push(results);
                                    } else {
                                        angular.extend(resultArray, results);

                                        if (angular.isDefined(request.orderBy)) {
                                            if (request.orderBy === "$RANDOM") {
                                                resultArray = apingUtilityHelper.shuffleArray(resultArray);
                                            } else {
                                                resultArray.sort(apingUtilityHelper.sortArrayByProperty(request.orderBy));
                                            }
                                        }
                                        //order desc
                                        if (angular.isDefined(request.orderReverse) && request.orderReverse === true && request.orderBy !== "$RANDOM") {
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
    }]);;"use strict";

angular.module("jtt_aping_ng_array", [])
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

                        if (angular.isUndefined(request.items)) {
                            request.items = appSettings.items;
                        }
                        if (request.items === 0 || request.items === '0') {
                            return false;
                        }

                        // -1 is "no explicit limit". same for NaN value
                        if (request.items < 0 || isNaN(request.items)) {
                            request.items = undefined;
                        }

                        var resultArray = [];

                        if (scope[request.name].constructor === Array) {
                            resultArray = scope[request.name];
                            if (angular.isDefined(request.orderBy)) {
                                if (request.orderBy === "$RANDOM") {
                                    resultArray = apingUtilityHelper.shuffleArray(resultArray);
                                } else {
                                    resultArray.sort(apingUtilityHelper.sortArrayByProperty(request.orderBy));
                                }
                            }
                            //order desc
                            if (angular.isDefined(request.orderReverse) && request.orderReverse === true && request.orderBy !== "$RANDOM") {
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
                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingLocalStorage, "localStorage", appSettings);

                requests.forEach(function (request) {

                    if (request.key) {
                        if (angular.isUndefined(request.items)) {
                            request.items = appSettings.items;
                        }

                        if (request.items === 0 || request.items === '0') {
                            return false;
                        }

                        // -1 is "no explicit limit". same for NaN value
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
                                            if (request.orderBy === "$RANDOM") {
                                                resultArray = apingUtilityHelper.shuffleArray(resultArray);
                                            } else {
                                                resultArray.sort(apingUtilityHelper.sortArrayByProperty(request.orderBy));
                                            }
                                        }
                                        //order desc
                                        if (angular.isDefined(request.orderReverse) && request.orderReverse === true && request.orderBy !== "$RANDOM") {
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
    }]);