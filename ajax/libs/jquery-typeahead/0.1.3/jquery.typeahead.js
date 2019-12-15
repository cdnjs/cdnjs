/**
 * jQuery Typeahead
 *
 * @author Tom Bertrand
 * @version 0.1.3 Beta (2014-08-26)
 *
 * @copyright
 * Copyright (C) 2014 RunningCoder.
 *
 * @link
 * http://www.runningcoder.org/jquerytypeahead/
 *
 * @license
 * Licensed under the MIT license.
 */
(function (window, document, $, undefined)
{

    window.Typeahead = {
        jsonList: {}
    };

    /**
     * Fail-safe preventExtensions function for older browsers
     */
    if (typeof Object.preventExtensions !== "function") {
        Object.preventExtensions = function (obj) { return obj; }
    }

    // Not using strict to avoid throwing a window error on bad config extend.
    // console.debug is used instead to debug Validation
    //"use strict";

    /**
     * @private
     * Default options
     *
     * @link http://www.runningcoder.org/jquerytypeahead/documentation/
     */
    var _options = {
        settings: {
            jStorage: false,
            compression: false,
            order: null,
            minLength: 2,
            maxItem: 8,
            startCharacter: false,
            group: false,
            list: false,
            ttl: 3600000,
            backdrop: false,
            input: null,
            groupListClass: "typeahead-search-group",
            searchListClass: "typeahead-search",
            backdropListClass: "typeahead-search-backdrop",
            jsonList: {}
        },
        callback: {
            onInit: null,
            onMouseEnter: null,
            onMouseLeave: null,
            onClick: null
        },
        debug: false
    };

    /**
     * @private
     * Limit the supported options on matching keys
     */
    var _supported = {
        settings: {
            jStorage: [true, false],
            compression: [true, false],
            order: [null, 'asc', 'desc'],
            group: [true, false],
            jsonList: ["storage", "pattern", "data", "url"]
        },
        debug: [true, false]
    };

    // =================================================================================================================

    /**
     * @constructor
     * Typeahead Class
     *
     * @param {object} node jQuery input object
     * @param {object} options User defined options
     */
    var Typeahead = function (node, options) {

        var query = "",
            isListGenerated = false,
            storageJsonList = {},
            resultList = [],
            jsonpCallback = "window.Typeahead.jsonList['" + node.selector + "'].populate",
            counter = 0,
            listLength = 0;

        /**
         * Extends user-defined "options" into the default Typeahead "_options".
         * Notes:
         *  - preventExtensions prevents from modifying the Typeahead "_options" object structure
         *  - filter through the "_supported" to delete unsupported "options"
         */
        function extendOptions () {

            if (!(options instanceof Object)) {
                options = {};
            }

            if (!$.jStorage) {
                options.debug && window.Debug.log({
                    'node': node,
                    'function': 'extendOptions()',
                    'arguments': '$.jStorage',
                    'message': 'WARNING - It is strongly recommended to have $.jStorage available on your page to store the result set(s)'
                });
            }

            var tpmOptions = Object.preventExtensions($.extend(true, {}, _options));

            for (var type in options) {
                if (!options.hasOwnProperty(type) || type === "debug") {
                    continue;
                }

                if (typeof _options[type] === "undefined") {

                    options.debug && window.Debug.log({
                        'node': node,
                        'function': 'extendOptions()',
                        'arguments': '{' + type + ': ' + JSON.stringify(options[type]) + '}',
                        'message': 'WARNING - Invalid option: ' + type
                    });

                    delete options[type];

                    break;
                }

                for (var option in options[type]) {
                    if (!options[type].hasOwnProperty(option)) {
                        continue;
                    }

                    if (typeof _options[type][option] === "undefined") {
                        options.debug && window.Debug.log({
                            'node': node,
                            'function': 'extendOptions()',
                            'arguments': '{' + option + ': ' + JSON.stringify(options[type][option]) + '}',
                            'message': 'WARNING - Invalid option: ' + option
                        });

                        delete options[type][option];

                        continue;
                    }

                    if (option === "jsonList" && options[type][option] instanceof Object) {

                        for (var list in options[type][option]) {
                            if (!options[type][option].hasOwnProperty(list)) {
                                continue;
                            }

                            if (!(options[type][option][list] instanceof Object) || list === "data") {
                                list = "list";
                                options[type][option] = {
                                    list: options[type][option]
                                };
                            }

                            for (var listOption in options[type][option][list]) {

                                if (!options[type][option][list].hasOwnProperty(listOption)) {
                                    continue;
                                }

                                if ($.inArray(listOption, _supported[type][option]) === -1) {

                                    options.debug && window.Debug.log({
                                        'node': node,
                                        'function': 'extendOptions()',
                                        'arguments': '{' + listOption + ': ' + JSON.stringify(options[type][option][list][listOption]) + '}',
                                        'message': 'WARNING - Invalid jsonList option: ' + listOption
                                    });

                                    delete options[type][option][list][listOption];

                                    continue;

                                }
                            }
                        }

                    } else if (_supported[type] &&
                        _supported[type][option] &&
                        $.inArray(options[type][option], _supported[type][option]) === -1) {

                        options.debug && window.Debug.log({
                            'node': node,
                            'function': 'extendOptions()',
                            'arguments': "{" + option + ":" + JSON.stringify(options[option]) + "}",
                            'message': 'WARNING - Unsupported option: ' + option
                        });

                        delete options[type][option];

                    }

                }
            }

            options = $.extend(true, tpmOptions, options);

        }

        /**
         * Attach events to the search input to trigger the Typeahead Search
         */
        function delegateTypeahead () {

            _executeCallback(options.callback.onInit, [node]);

            options.debug && window.Debug.log({
                'node': node,
                'function': 'delegateTypeahead()',
                'arguments': JSON.stringify(options),
                'message': 'OK - Typeahead activated on ' + (options.settings.input || '#' + node.id || '[name="' + node.name + '"]')
            });

            var event = [
                'focus.ac',
                //'focusout.ac',
                //'blur.ac',
                'keyup.ac',
                'keypress.ac',
                'keydown.ac'
            ];

            $('html').on("click.wtf", function() {
                reset();
            });

            $(node).parent().on("click.wtf", function(e) {
                e.stopPropagation();
            });

            $(node).on(event.join(' '), function (e) {

                // Simply hide the search on blur
                //if ((e.type === "blur" || e.type === "focusout") && !listBlur) {
                //    reset();
                //    return false;
                //}

                if (e.type === "focus" && !isListGenerated) {
                    generateList();
                }

                var input = this;

                setTimeout( function () {

                    if (!isListGenerated || $(input).val() === query) {
                        return false;
                    }

                    query = $(input).val().toLowerCase().trim();

                    reset();

                    if (query.length >= options.settings.minLength && query !== "") {
                        search();
                        buildHtml();
                    }

                }, 0, e, input);

            });

        }

        /**
         * Search the json lists to match the search query and build the HTML and bind
         * the callbacks on the result(s) if they are set inside the configuration options
         */
        function search () {

            for (var list in storageJsonList) {

                for (var i in storageJsonList[list]) {

                    if (resultList.length >= options.settings.maxItem) {
                        break;
                    }

                    if (storageJsonList[list][i].display &&
                        storageJsonList[list][i].display.toLowerCase().indexOf(query) !== -1 && (
                            !options.settings.startCharacter ||
                            storageJsonList[list][i].display.toLowerCase().indexOf(query) === 0
                        ))
                    {
                        storageJsonList[list][i].list = list;
                        resultList.push(storageJsonList[list][i]);
                    }
                }
            }

            if (options.settings.order) {
                resultList.sort(
                    sort_by(
                        'display',
                        (options.settings.group && !(options.settings.order === "asc")) || !!(options.settings.order === "asc"),
                        function(a){return a.toUpperCase()}
                    )
                );
            }

        }

        /**
         * Builds the search result list html and delegate the callbacks
         */
        function buildHtml () {

            var match,
                template = $("<div/>", {
                "class": options.settings.searchListClass,
                "html": $("<ul/>", {
                    "html": function() {

                        for (var i in resultList) {
                            (function (result, scope) {

                                if (options.settings.group && !$(scope).find('li[data-search-group="' + result.list + '"]')[0]) {
                                    $(scope).append(
                                        $("<li/>", {
                                            "class": options.settings.groupListClass,
                                            "html":  $("<a/>", {
                                                "html": result.list
                                            }),
                                            "data-search-group": result.list
                                        })
                                    );
                                }

                                match = result.display.match(new RegExp(query,"i"));

                                var li = $("<li/>", {
                                    "html":  $("<a/>", {
                                        "href": "javascript:;",
                                        "data-list": result.list,
                                        "html": result.display.replace(new RegExp(query,"i"), '<strong>' + match[0] + '</strong>') +
                                            ((options.settings.list) ? "<small>" + result.list + "</small>" : ""),
                                        "click": ({"result": result}, function (e) {

                                            e.preventDefault();

                                            $(node).val(result.display).focus();

                                            query = result.display;

                                            reset();

                                            _executeCallback(options.callback.onClick, [node, this, result])
                                        }),
                                        "mouseenter": function () { _executeCallback(options.callback.onMouseEnter, [node, this, result]); },
                                        "mouseleave": function () { _executeCallback(options.callback.onMouseLeave, [node, this, result]); }

                                    })
                                });

                                if (options.settings.group) {
                                    $(li).insertAfter($(scope).find('li[data-search-group="' + result.list + '"]'));

                                } else {
                                    $(scope).append(li);
                                }

                            }(resultList[i], this));
                        }

                    }
                })
            });

            $(node).parent().append(template);

            if (!options.settings.backdrop) {
                return;
            }

            var css = $.extend(
                {
                    "opacity": 0.6,
                    "filter": 'alpha(opacity=60)',
                    "position": 'fixed',
                    "top": 0,
                    "right": 0,
                    "bottom": 0,
                    "left": 0,
                    "z-index": 1040,
                    "background-color": "#000"
                },
                options.settings.backdrop
            );

            $(node).parent().children()
                .css({
                    "z-index": css["z-index"] + 1,
                    "position": "relative"
                });

            $(node).parent()
                .append(
                    $("<div/>", {
                        "class": options.settings.backdropListClass,
                        "css": css,
                        "click": function () {
                            reset();
                        }
                    })
                );

        }

        /**
         * Clears the search result list
         */
        function reset () {

            resultList = [];

            $(node).siblings('.' + options.settings.searchListClass).remove();
            $(node).siblings('.' +options.settings.backdropListClass).remove();

        }

        /**
         * Depending on the list format given by the initialization, this method
         * concats (if needed) and build unified json Lists.
         * Supports inline data, same-domain ajax and crossdomain ajax (jsonP)
         */
        function generateList () {

            var jsonList = options.settings.jsonList;

            if (listLength === 0) {
                for (var k in jsonList) {
                    if (jsonList.hasOwnProperty(k)) {
                        ++listLength;
                    }
                }
            }

            for (var list in jsonList) {
                if (!jsonList.hasOwnProperty(list)) {
                    continue;
                }

                // Lists are loaded
                if ((storageJsonList[list] && storageJsonList[list] !== [])) {
                    counter++;
                    continue;
                }

                // Lists from jStorage
                if (options.settings.jStorage && $.jStorage) {
                    storageJsonList[list] = $.jStorage.get(node.selector + ":" + list);
                    if (storageJsonList[list]) {

                        if (options.settings.compression && typeof LZString === "object") {
                            storageJsonList[list] = JSON.parse(LZString.decompress(storageJsonList[list]));
                        }

                        counter++;
                        continue;
                    }
                }

                storageJsonList[list] = [];

                // Lists from configuration
                if (jsonList[list].data && jsonList[list].data instanceof Array) {

                    for (var i in jsonList[list].data) {
                        if (jsonList[list].data[i] instanceof Object) {
                            break;
                        }

                        jsonList[list].data[i] = {
                            display: jsonList[list].data[i]
                        }
                    }

                    storageJsonList[list] = storageJsonList[list].concat(jsonList[list].data);

                    if (!jsonList[list].url) {

                        _populateStorage(list);

                        counter++;
                        continue;
                    }
                }

                if (jsonList[list].url) {

                    var url = (jsonList[list].url instanceof Array && jsonList[list].url[0]) || jsonList[list].url,
                        path = (jsonList[list].url instanceof Array && jsonList[list].url[1]) || null;

                    // Cross Domain
                    if (/https?:\/\//.test(url) && url.indexOf(window.location.host) === -1) {

                        _jsonp.fetch(url.replace("{callback}", encodeURIComponent(jsonpCallback)), function (data) {});

                    } else {
                    // Same Domain

                        $.ajax({
                            async: true,
                            url: url,
                            ajaxList: list,
                            ajaxPath: path
                        }).done( function(data) {

                            _populateJsonList(data, this.ajaxList, this.ajaxPath);

                            counter++;
                            if (counter === length) {
                                isListGenerated = true;
                                console.log('ALL LIST FETCHED (done ajax)')
                            }

                        }).fail( function (response) {

                            counter++;
                            if (counter === length) {
                                isListGenerated = true;
                                console.log('ALL LIST FETCHED (fail ajax)')
                            }
                        });

                    }

                }

            }

            if (counter === listLength) {
                isListGenerated = true;
                console.log('ALL LIST FETCHED (regular function)')
            }
        }

        /**
         * @public
         * This method will be called by the jsonP callback to populate the JSON list
         *
         * @param {object} data JSON response from the jsonP call
         */
        function populate (data) {

            if (!data || !data.list) {

                options.debug && window.Debug.log({
                    'node': node,
                    'function': 'populate()',
                    'message': 'ERROR - Empty data or Missing {data.list} parameter"'
                });

                return false;
            }

            var list = data.list || 'list',
                path = (options.settings.jsonList[list].url instanceof Array) ?
                    options.settings.jsonList[list].url[1] : null;


            _populateJsonList(data, list, path);

            ++counter;

            if (counter === listLength) {
                isListGenerated = true;
                console.log('ALL LIST FETCHED')
            }

        }

        /**
         * @private
         * Common method to build the JSON lists to be cycled for matched results from data, url or cross domain url.
         *
         * @param {array} data Raw data to be formatted
         * @param {string} list List name
         * @param {string} [path] Optional path if the list is not on the data root
         *
         */
        var _populateJsonList = function (data, list, path) {

            var _isValid = true;

            if (path) {

                var _exploded = path.split('.'),
                    _splitIndex = 0;

                while (_splitIndex < _exploded.length) {
                    if (typeof data !== 'undefined') {
                        data = data[_exploded[_splitIndex++]];
                    } else {
                        _isValid = false;
                        break;
                    }
                }
            }

            if (_isValid) {

                for (var i in data) {
                    if (data[i] instanceof Object) {
                        break;
                    }
                    data[i] = {
                        display: data[i]
                    }
                }

                storageJsonList[list] = storageJsonList[list].concat(data);

                _populateStorage(list);
            }

        };

        /**
         * @private
         * Store the data inside jStorage so the urls are not fetched on every pageloads
         *
         * @param {string} list
         */
        var _populateStorage = function (list) {

            if (!options.settings.jStorage || !$.jStorage) {
                return false;
            }

            var data = storageJsonList[list];

            if (options.settings.compression && typeof LZString === "object") {
                data = LZString.compress(JSON.stringify(data));
            }

            //response = base64_encode(RawDeflate.deflate(escape(JSON.stringify(response))));

            $.jStorage.set(
                node.selector + ":" + list,
                data,
                {
                    TTL: options.settings.ttl
                }
            );

        };

        /**
         * @private
         * Sort list of object by key
         *
         * @param field
         * @param reverse
         * @param primer
         *
         * @returns {Function}
         */
        var sort_by = function(field, reverse, primer){

            var key = primer ?
                function(x) {return primer(x[field])} :
                function(x) {return x[field]};

            reverse = [-1, 1][+!!reverse];

            return function (a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
            }
        }

        /**
         * @private
         * Executes an anonymous function or a string reached from the window scope.
         *
         * @example
         * Note: These examples works with every configuration callbacks
         *
         * // An anonymous function inside the "onInit" option
         * onInit: function() { console.log(':D'); };
         *
         * * // myFunction() located on window.coucou scope
         * onInit: 'window.coucou.myFunction'
         *
         * // myFunction(a,b) located on window.coucou scope passing 2 parameters
         * onInit: ['window.coucou.myFunction', [':D', ':)']];
         *
         * // Anonymous function to execute a local function
         * onInit: function () { myFunction(':D'); }
         *
         * @param {string|array} callback The function to be called
         * @param {array} [extraParams] In some cases the function can be called with Extra parameters (onError)
         *
         * @returns {boolean}
         */
        var _executeCallback = function (callback, extraParams) {

            if (!callback) {
                return false;
            }

            var _callback;

            if (typeof callback === "function") {

                _callback = callback;

            } else if (typeof callback === "string" || callback instanceof Array) {

                _callback = window;

                if (typeof callback === "string") {
                    callback = [callback, []];
                }

                var _exploded = callback[0].split('.'),
                    _params = callback[1],
                    _isValid = true,
                    _splitIndex = 0;

                while (_splitIndex < _exploded.length) {

                    if (typeof _callback !== 'undefined') {
                        _callback = _callback[_exploded[_splitIndex++]];
                    } else {
                        _isValid = false;
                        break;
                    }
                }

                if (!_isValid || typeof _callback !== "function") {

                    options.debug && window.Debug.log({
                        'node': node,
                        'function': '_executeCallback()',
                        'arguments': JSON.stringify(callback),
                        'message': 'WARNING - Invalid callback function"'
                    });

                    return false;
                }

            }

            _callback.apply(this, $.merge(_params || [], (extraParams) ? extraParams : []));
            return true;

        };

        /**
         * @private
         * Private function to retrieve data from a cross domain jsonP call
         *
         * @type {{fetch: fetch, evalJSONP: evalJSONP}}
         * @url http://javascriptweblog.wordpress.com/2010/11/29/json-and-jsonp/
         */
        var _jsonp = {
            fetch: function (url, callback) {
                var fn = encodeURIComponent(jsonpCallback);
                window[fn] = this.evalJSONP(callback);
                url = url.replace('=' + jsonpCallback, '=' + fn);

                var scriptTag = document.createElement('SCRIPT');
                scriptTag.src = url;
                document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
            },
            evalJSONP: function (callback) {

                return function (data) {
                    var validJSON = false;
                    if (typeof data === "string") {
                        try { validJSON = JSON.parse(data); } catch (e) {
                            // invalid JSON
                        }
                    } else {
                        validJSON = JSON.parse(JSON.stringify(data));
                    }
                    if (validJSON) {
                        callback(validJSON);
                    } else {
                        throw ("JSONP call returned invalid or empty JSON");
                    }
                };
            }
        };

        /**
         * @private
         * Constructs Typeahead
         */
        this.__construct = function () {

            extendOptions();
            delegateTypeahead();

            window.Debug && window.Debug.print();

        }();

        return {

            /**
             * @public
             * Populate data from jsonp call
             */
            populate: populate

        };

    };


    /**
     * @public
     * jQuery public function to implement the Typeahead on the selected node.
     *
     * @param {object} options To configure the Typeahead class.
     *
     * @return {object} Modified DOM element
     */
    $.fn.typeahead = $.typeahead = function (options) {

        return _api.typeahead(this, options);

    };

    // =================================================================================================================

    /**
     * @private
     * API to handles Enabling the Typeahead via jQuery.
     *
     * @example
     * $.typeahead({})
     *
     * @returns {object} Updated DOM object
     */
    var _api = {

        /**
         * API method to enable the typeahead on the specified input.
         *
         * @param {object} node jQuery object(s)
         * @param {object} options To configure the Typeahead class.
         *
         * @returns {*}
         */
        typeahead: function (node, options) {

            if (typeof node === "function") {

                if (!options.settings.input) {

                    window.Debug.log({
                        'node': node,
                        'function': '$.typeahead()',
                        'arguments': '',
                        'message': 'Undefined property "options.settings.input - Typeahead dropped'
                    });

                    window.Debug.print();
                    return;
                }

                node = $(options.settings.input);

                if (!node[0] || node.length > 1) {
                    window.Debug.log({
                        'node': node,
                        'function': '$.typeahead()',
                        'arguments': JSON.stringify(options.settings.input),
                        'message': 'Unable to find jQuery input element OR more than 1 input is found - Typeahead dropped'
                    });

                    window.Debug.print();
                    return;
                }

            } else if (typeof node[0] === 'undefined' || node.length > 1/* || node[0].nodeName.toLowerCase() !== "input"*/) {

                window.Debug.log({
                    'node': node,
                    'function': '$.typeahead()',
                    'arguments': '$("' + node['selector'] + '").typeahead()',
                    'message': 'Unable to find jQuery input element OR more than 1 input is found - Typeahead dropped'
                });

                window.Debug.print();
                return;
            }

            return node.each(function () {
                window.Typeahead.jsonList[node.selector] = new Typeahead(node, options);
            });

        }


    };

    window.Debug = {

        table: {},
        log: function (debugObject) {

            if (!debugObject.message || typeof debugObject.message !== "string") {
                return false;
            }

            this.table[debugObject.message] = $.extend(
                Object.preventExtensions(
                    {
                        'node': '',
                        'function': '',
                        'arguments': ''
                    }
                ), debugObject
            )

        },
        print: function () {

            if ($.isEmptyObject(this.table)) {
                return false;
            }

            if (console.group !== undefined || console.table !== undefined) {

                console.groupCollapsed('--- jQuery Typeahead Debug ---');

                if (console.table) {
                    console.table(this.table);
                } else {
                    $.each(this.table, function (index, data) {
                        console.log(data['Name'] + ': ' + data['Execution Time']+'ms');
                    });
                }

                console.groupEnd();

            } else {
                console.log('Debug is not available on your current browser, try the most recent version of Chrome or Firefox.');
            }

            this.table = {};

        }

    };

}(window, document, window.jQuery));