/**
 * jQuery Typeahead
 *
 * @author Tom Bertrand
 * @version 0.1.0 Beta (2014-08-1)
 *
 * @copyright
 * Copyright (C) 2014 Tom Bertrand.
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
     * HTML5 data attributes
     */
    var _data = {
        searchList: 'data-search-list'
    };

    /**
     * @private
     * Default options
     *
     * @link http://www.runningcoder.org/jquerytypeahead/documentation/
     */
    var _options = {
        settings: {
            compression: false,
            order: null,
            minCharacter: 2,
            maxItem: 8,
            startCharacter: false,
            group: false,
            list: false,
            ttl: 3600,
            backdrop: false,
            input: null,
            trigger: "change",
            action: "click",
            searchListClass: "typeahead-search",
            jsonList: {}
        },
        callback: {
            onInit: null,
            onHover: null,
            onHoverOut: null,
            onClick: null/*,
            onBeforeSubmit: null,
            onSubmit: null*/
        },
        debug: false
    };

    /**
     * @private
     * Limit the supported options on matching keys
     */
    var _supported = {
        settings: {
            compression: [true, false],
            order: [null, 'asc', 'desc'],
            group: [true, false],
            backdrop: [true, false],
            //trigger: ["keypress", "keydown", "keyup"], // onChange?
            action: ["click", "dblclick", "mousedown", "mouseup"],
            jsonList: ["storage", "pattern", "data", "url"]
        },
        debug: [true, false]
    };

    // =================================================================================================================

    /**
     * @constructor
     * Typeahead Class
     *
     * @param {object} node jQuery form object
     * @param {object} options User defined options
     */
    var Typeahead = function (node, options) {

        var query = "",
            isListGenerated = false,
            storageJsonList = {},
            jsonpCallback = "window.Typeahead.jsonList['" + '#search_v1-game' + "'].populate",
            counter = 0,
            listLength = 0;

        /**
         * Extends user-defined "options" into the default Validation "_options".
         * Notes:
         *  - preventExtensions prevents from modifying the Validation "_options" object structure
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
                'blur.ac',
                'keyup.ac',
                'keypress.ac',
                'keydown.ac'
            ];


            $(node).on(event.join(' '), function (e) {

                // Simply hide the search on blur
                if (e.type === "blur") {
                    return false;
                }

                if (e.type === "focus" && !isListGenerated) {
                    generateList();
                }

                var input = this;

                // Namespaced events need a setTimeout function ...
                // @TODO: investigate this weird behavior
                setTimeout( function () {

                    if ($(input).val() === query) {
                        return false;
                    }

                    query = $(input).val();

                    resetSearch();

                    if (query.length >= options.settings.minCharacter) {
                        search();
                    }

                }, 0, e, input);

            });



        }

        function search () {

            if (query.trim() === "") {
                return false;
            }


            var sort_by = function(field, reverse, primer){

                var key = primer ?
                    function(x) {return primer(x[field])} :
                    function(x) {return x[field]};

                reverse = [-1, 1][+!!reverse];

                return function (a, b) {
                    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
                }
            }


            var foundItems = [],
                html = '<div class="' + options.settings.searchListClass + '" ' + _data.searchList + '><ul></ul></div>',
                itemsHtml = "",
                match;

            for (var list in storageJsonList) {

                for (var i in storageJsonList[list]) {

                    if (foundItems.length >= options.settings.maxItem) {
                        break;
                    }

                    if (storageJsonList[list][i].display &&
                        storageJsonList[list][i].display.toLowerCase().indexOf(query.toLowerCase()) !== -1 && (
                            !options.settings.startCharacter || storageJsonList[list][i].display.toLowerCase().indexOf(query.toLowerCase()) === 0
                        ))
                    {




                        storageJsonList[list][i].list = list;

                        foundItems.push(storageJsonList[list][i]);

                        //console.log("list")
                        //console.log(list)
                        //console.log("object")
                        //console.log(storageJsonList[list][i])

                    }
                }
            }

            if (options.settings.order) {
                foundItems.sort(sort_by('display', (options.settings.order === "desc") ? false : true, function(a){return a.toUpperCase()}))
            }

            for (var i in foundItems) {

                match = foundItems[i].display.match(new RegExp(query,"i"));

                itemsHtml += "<li>" +
                    "<a href='javascript:;' data-list='" + foundItems[i].list + "'>" +
                        foundItems[i].display.replace(new RegExp(query,"i"), '<strong>' + match[0] + '</strong>') +
                        ((options.settings.list) ? "<small>" + foundItems[i].list + "</small>" : "") +
                    "</a></li>";
            }

            var searchContainer = $(node).parent(),
                object;


            searchContainer.append(html).find("ul").html(itemsHtml);

            searchContainer.find('[' + _data.searchList + '] a').hover(function () {

                object = foundItems[
                        $(
                            $(this).closest('[' + _data.searchList + ']').find('li')
                        ).index($(this).parent())
                    ] || {};

                _executeCallback(options.callback.onHover, [node, this, object]);
            }, function () {
                _executeCallback(options.callback.onHoverOut, [node, this, object]);
            });




            searchContainer.find('[' + _data.searchList + '] a').on("click", function (e) {

                e.preventDefault();

                object = foundItems[
                    $(
                        $(this).closest('[' + _data.searchList + ']').find('li')
                    ).index($(this).parent())
                    ] || {};

                $(node).val(object.display);

                resetSearch();

                if (!_executeCallback(options.callback.onClick, [node, this, object])) {
                    //console.log('no callback set')
                }


            });






        }

        function resetSearch () {

            $(node).parent().find('[' + _data.searchList + ']').remove();


        }




        /**
         *
         */
        function generateList () {

            var jsonList = options.settings.jsonList,
                url,
                path,
                data;

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

                if ((storageJsonList[list] && storageJsonList[list] !== {}) || (jsonList[list].storage && $.jStorage.get(jsonList[list].storage))) {
                    console.log(list + ': already stored')
                    continue;
                }

                storageJsonList[list] = [];

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
                        counter++;
                    }
                }

                if (jsonList[list].url) {

                    url = (jsonList[list].url instanceof Array && jsonList[list].url[0]) || jsonList[list].url;
                    path = (jsonList[list].url instanceof Array && jsonList[list].url[1]) || null;

                    // Cross Domain
                    if (/https?:\/\//.test(url) && url.indexOf(window.location.host) === -1) {

                        _jsonp.fetch(url + "/" + encodeURIComponent(jsonpCallback) + "/", function (data) {});

                    } else {
                    // Same Domain

                        $.ajax({
                            async: true,
                            url: url,
                            ajaxList: list,
                            ajaxPath: path
                        }).done( function(data) {


                            _populateJsonList(data, this.ajaxList, this.ajaxPath);



                            //storageJsonList[list] = storageJsonList[list].concat(jsonList[list].data);

                            //console.log('coucou :D')
/*
                            // Status in not needed anymore
                            delete response.status;

                            window.log(_class.name + '._ajax - Populating storage with type: ' + this.ajaxI);

                            _class.urlPattern[this.ajaxI] = response.urlPattern;

                            if (_class.options.compression) {
                                window.time('compression');
                                response = base64_encode(RawDeflate.deflate(escape(JSON.stringify(response))));
                                window.timeEnd('compression');
                                window.log(_class.name + '._ajax - Compressed response.');
                            }

                            $.jStorage.set(jsonList[this.ajaxI].storage, response);
                            $.jStorage.setTTL(jsonList[this.ajaxI].storage, _class.options.ttl);
*/

                            counter++;
                            if (counter === length) {
                                //_class._object.properties._overrideTypeahead(jsonList);
                            }

                        }).fail( function (response) {
                            //window.debug(_class.name + '._ajax - Error in ajax response for url ' + jsonList[this.ajaxI].url + ' ignoring type: ' + this.ajaxI);
                            counter++;
                            //if (counter === length) {
                            //    _class._object.properties._overrideTypeahead(jsonList);
                            //}
                        });


                    }

                    //

                }

            }

            if (counter === listLength) {
                isListGenerated = true;
                console.log('ALL LIST FETCHED')
            }
        }

        /**
         * Submits the form once it succeeded the validation process.
         * Note: This function will be overridden if "options.submit.settings.onSubmit" is defined
         */
        function submitForm () {

            node.submit();

        }


        var _populateJsonList = function (data, list, path) {

            //console.log(data)
            //console.log(list)
            //console.log(path)


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

            }

        };

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
         * Private function to retreive data from a crossdomain jsonP call
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

        function populate (data) {

            var list = data.list || 'list',
                path = (options.settings.jsonList[list].url instanceof Array) ?
                    options.settings.jsonList[list].url[1] : null;


            _populateJsonList(data, list, path);

            /*
            if (!data) {
                return false;
            }

            var list = data.list || 'list';

            if (storageJsonList[list]) {

                if (options.settings.jsonList[list].url instanceof Array) {

                    var jsonPath = options.settings.jsonList[list].url[1];

                    if (jsonPath) {

                        var _exploded = jsonPath.split('.'),
                            _splitIndex = 0,
                            _isValid = true;

                        while (_splitIndex < _exploded.length) {
                            if (typeof data !== 'undefined') {
                                data = data[_exploded[_splitIndex++]];
                            } else {
                                _isValid = false;
                                break;
                            }
                        }

                        if (_isValid) {
                            storageJsonList[list] = storageJsonList[list].concat(data);
                        }
                    }
                }

            }
            */

            ++counter;

            if (counter === listLength) {
                isListGenerated = true;
                console.log('ALL LIST FETCHED')
            }

        }

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
                window.Typeahead.jsonList[node.selector] = new Typeahead(this, options);
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