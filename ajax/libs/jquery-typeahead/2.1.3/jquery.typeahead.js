/*!
 * jQuery Typeahead
 * Copyright (C) 2015 RunningCoder.org
 * Licensed under the MIT license
 *
 * @author Tom Bertrand
 * @version 2.1.3 (2015-10-21)
 * @link http://www.runningcoder.org/jquerytypeahead/
*/
;
(function (window, document, $, undefined) {

    window.Typeahead = {
        version: '2.1.3'
    };

    "use strict";

    /**
     * @private
     * Default options
     *
     * @link http://www.runningcoder.org/jquerytypeahead/documentation/
     */
    var _options = {
        input: null,
        minLength: 2,           // Modified feature, now accepts 0 to search on focus
        maxItem: 8,             // Modified feature, now accepts 0 as "Infinity" meaning all the results will be displayed
        dynamic: false,
        delay: 300,
        order: null,            // ONLY sorts the first "display" key
        offset: false,
        hint: false,            // -> Improved feature, Added support for excessive "space" characters
        accent: false,
        highlight: true,
        group: false,           // -> Improved feature, Array second index is a custom group title (html allowed)
        maxItemPerGroup: null,  // -> Renamed option
        dropdownFilter: false,  // -> Renamed option, true will take group options string will filter on object key
        dynamicFilter: null,    // -> New feature, filter the typeahead results based on dynamic value, Ex: Players based on TeamID
        backdrop: false,
        cache: false,
        ttl: 3600000,
        compression: false,     // -> Requires LZString library
        suggestion: false,      // -> *Coming soon* New feature, save last searches and display suggestion on matched characters
        searchOnFocus: false,   // -> New feature, display search results on input focus
        resultContainer: null,  // -> New feature, list the results inside any container string or jQuery object
        generateOnLoad: null,   // -> New feature, forces the source to be generated on page load even if the input is not focused!
        mustSelectItem: false,  // -> New option, the submit function only gets called if an item is selected
        href: null,             // -> New feature, String or Function to format the url for right-click & open in new tab on link results
        display: ["display"],   // -> Improved feature, allows search in multiple item keys ["display1", "display2"]
        template: null,
        correlativeTemplate: false, // -> New feature, compile display keys, enables multiple key search from the template string
        emptyTemplate: false,   // -> New feature, display an empty template if no result
        source: null,           // -> Modified feature, source.ignore is now a regex; item.group is a reserved word; Ajax callbacks: done, fail, complete, always
        callback: {
            onInit: null,
            onReady: null,      // -> New callback, when the Typeahead initial preparation is completed
            onSearch: null,     // -> New callback, when data is being fetched & analyzed to give search results
            onResult: null,
            onLayoutBuiltBefore: null,  // -> New callback, when the result HTML is build, modify it before it get showed
            onLayoutBuiltAfter: null,   // -> New callback, modify the dom right after the results gets inserted in the result container
            onNavigate: null,   // -> New callback, when a key is pressed to navigate the results
            onMouseEnter: null,
            onMouseLeave: null,
            onClickBefore: null,// -> Improved feature, possibility to e.preventDefault() to prevent the Typeahead behaviors
            onClickAfter: null, // -> New feature, happens after the default clicked behaviors has been executed
            onSendRequest: null,// -> New callback, gets called when the Ajax request(s) are sent
            onReceiveRequest: null,     // -> New callback, gets called when the Ajax request(s) are all received
            onSubmit: null
        },
        selector: {
            container: "typeahead-container",
            group: "typeahead-group",
            result: "typeahead-result",
            list: "typeahead-list",
            display: "typeahead-display",
            query: "typeahead-query",
            filter: "typeahead-filter",
            filterButton: "typeahead-filter-button",
            filterValue: "typeahead-filter-value",
            dropdown: "typeahead-dropdown",
            dropdownCarret: "typeahead-caret",
            button: "typeahead-button",
            backdrop: "typeahead-backdrop",
            hint: "typeahead-hint"
        },
        debug: false
    };

    /**
     * @private
     * Event namespace
     */
    var _namespace = ".typeahead";

    /**
     * @private
     * Accent equivalents
     */
    var _accent = {
        from: "ãàáäâẽèéëêìíïîõòóöôùúüûñç",
        to: "aaaaaeeeeeiiiiooooouuuunc"
    };

    /**
     * #62 IE9 doesn't trigger "input" event when text gets removed (backspace, ctrl+x, etc)
     * @private
     */
    var _isIE9 = ~navigator.appVersion.indexOf("MSIE 9.");

    // SOURCE ITEMS RESERVED KEYS: group, display, data, matchedKey, compiled, href

    /**
     * @constructor
     * Typeahead Class
     *
     * @param {object} node jQuery input object
     * @param {object} options User defined options
     */
    var Typeahead = function (node, options) {

        this.rawQuery = '';             // Unmodified input query
        this.query = '';                // Input query
        this.source = {};               // The generated source kept in memory
        this.isGenerated = null;        // Generated results -> null: not generated, false: generating, true generated
        this.generatedGroupCount = 0;   // Number of groups generated, if limit reached the search can be done
        this.groupCount = 0;            // Number of groups, this value gets counted on the initial source unification
        this.groupBy = "group";         // This option will change according to filtering or custom grouping
        this.result = [];               // Results based on Source-query match (only contains the displayed elements)
        this.resultCount = 0;           // Total results based on Source-query match
        this.options = options;         // Typeahead options (Merged default & user defined)
        this.node = node;               // jQuery object of the Typeahead <input>
        this.container = null;          // Typeahead container, usually right after <form>
        this.resultContainer = null;    // Typeahead result container (html)
        this.item = null;               // The selected item
        this.xhr = {};                  // Ajax request(s) stack
        this.hintIndex = null;          // Numeric value of the hint index in the result list
        this.filters = {                // Filter list for searching, dropdown and dynamic(s)
            dropdown: {},               // Dropdown menu if options.dropdownFilter is set
            dynamic: {}                 // Checkbox / Radio / Select to filter the source data
        };
        this.requests = {};             // Store the group:request instead of generating them every time

        this.backdrop = {};             // The backdrop object
        this.hint = {};                 // The hint object

        this.__construct();

    };

    Typeahead.prototype = {

        extendOptions: function () {

            // If the Typeahead is dynamic, force no cache & no compression
            if (this.options.dynamic) {
                this.options.cache = false;
                this.options.compression = false;
            }

            // Ensure Localstorage is available
            if (this.options.cache) {
                this.options.cache = (function () {
                    var supported = typeof window.localStorage !== "undefined";
                    if (supported) {
                        try {
                            window.localStorage.setItem("typeahead", "typeahead");
                            window.localStorage.removeItem("typeahead");
                        } catch (e) {
                            supported = false;
                        }
                    }
                    return supported;
                })();
            }

            if (this.options.compression) {
                if (typeof LZString !== 'object' || !this.options.cache) {
                    // {debug}
                    if (this.options.debug) {
                        _debug.log({
                            'node': this.node.selector,
                            'function': 'extendOptions()',
                            'message': 'Missing LZString Library or options.cache, no compression will occur.'
                        });

                        _debug.print();
                    }
                    // {/debug}
                    this.options.compression = false;
                }
            }

            if (typeof this.options.maxItem !== "undefined" && (!/^\d+$/.test(this.options.maxItem) || this.options.maxItem === 0)) {
                this.options.maxItem = Infinity;
            }

            if (this.options.maxItemPerGroup && !/^\d+$/.test(this.options.maxItemPerGroup)) {
                this.options.maxItemPerGroup = null;
            }

            if (this.options.display && !(this.options.display instanceof Array)) {
                this.options.display = [this.options.display];
            }

            if (this.options.group && !(this.options.group instanceof Array)) {
                this.options.group = [this.options.group];
            }

            if (this.options.dynamicFilter && !(this.options.dynamicFilter instanceof Array)) {
                this.options.dynamicFilter = [this.options.dynamicFilter]
            }

            if (this.options.resultContainer) {
                if (typeof this.options.resultContainer === "string") {
                    this.options.resultContainer = $(this.options.resultContainer);
                }

                if (!(this.options.resultContainer instanceof jQuery) || !this.options.resultContainer[0]) {
                    // {debug}
                    if (this.options.debug) {
                        _debug.log({
                            'node': this.node.selector,
                            'function': 'extendOptions()',
                            'message': 'Invalid jQuery selector or jQuery Object for "options.resultContainer".'
                        });

                        _debug.print();
                    }
                    // {/debug}
                } else {
                    this.resultContainer = this.options.resultContainer;
                }
            }

            if (this.options.group && typeof this.options.group[0] === "string" && this.options.maxItemPerGroup) {
                this.groupBy = this.options.group[0];
            }

            // Compatibility onClick callback
            if (this.options.callback && this.options.callback.onClick) {
                this.options.callback.onClickBefore = this.options.callback.onClick;
                delete this.options.callback.onClick;
            }

            this.options = $.extend(
                true,
                {},
                _options,
                this.options
            );

        },

        unifySourceFormat: function () {

            if (this.options.source instanceof Array) {
                this.options.source = {
                    group: {
                        data: this.options.source
                    }
                };

                this.groupCount += 1;
                return true;
            }

            if (typeof this.options.source.data !== 'undefined' || typeof this.options.source.url !== 'undefined') {
                this.options.source = {
                    group: this.options.source
                };
            }

            for (var group in this.options.source) {
                if (!this.options.source.hasOwnProperty(group)) continue;

                // Backward compatibility for source.url declaration
                if (typeof this.options.source[group] === "string" || this.options.source[group] instanceof Array) {
                    this.options.source[group] = {
                        url: this.options.source[group]
                    };
                }

                if (!this.options.source[group].data && !this.options.source[group].url) {

                    // {debug}
                    if (this.options.debug) {
                        _debug.log({
                            'node': this.node.selector,
                            'function': 'unifySourceFormat()',
                            'arguments': JSON.stringify(this.options.source),
                            'message': 'Undefined "options.source.' + group + '.[data|url]" is Missing - Typeahead dropped'
                        });

                        _debug.print();
                    }
                    // {/debug}

                    return false;
                }

                if (this.options.source[group].display && !(this.options.source[group].display instanceof Array)) {
                    this.options.source[group].display = [this.options.source[group].display];
                }

                if (this.options.source[group].ignore) {
                    if (!(this.options.source[group].ignore instanceof RegExp)) {

                        // {debug}
                        if (this.options.debug) {
                            _debug.log({
                                'node': this.node.selector,
                                'function': 'unifySourceFormat()',
                                'arguments': JSON.stringify(this.options.source[group].ignore),
                                'message': 'Invalid ignore RegExp.'
                            });

                            _debug.print();
                        }
                        // {/debug}

                        delete this.options.source[group].ignore;
                    }
                }

                this.groupCount += 1;
            }

            return true;
        },

        init: function () {

            this.helper.executeCallback(this.options.callback.onInit, [this.node]);

            this.container = this.node.closest('.' + this.options.selector.container);

            // {debug}
            if (this.options.debug) {
                _debug.log({
                    'node': this.node.selector,
                    'function': 'init()',
                    //'arguments': JSON.stringify(this.options),
                    'message': 'OK - Typeahead activated on ' + this.node.selector
                });

                _debug.print();
            }
            // {/debug}

        },

        delegateEvents: function () {

            var scope = this,
                events = [
                    'focus' + _namespace,
                    'input' + _namespace,
                    'propertychange' + _namespace,  // IE8 Fix
                    'keydown' + _namespace,
                    'keyup' + _namespace,           // IE9 Fix
                    'dynamic' + _namespace,
                    'generateOnLoad' + _namespace
                ];

            this.container.off(_namespace).on("click" + _namespace + ' touchstart' + _namespace, function (e) {
                e.stopPropagation();

                if (scope.options.dropdownFilter) {
                    scope.container
                        .find('.' + scope.options.selector.dropdown.replace(" ", "."))
                        .hide();
                }
            });

            this.node.closest('form').on("submit", function (e) {

                if (scope.options.mustSelectItem && scope.helper.isEmpty(scope.item)) {
                    e.preventDefault();
                    return;
                }

                scope.hideLayout();

                scope.rawQuery = '';
                scope.query = '';

                if (scope.helper.executeCallback(scope.options.callback.onSubmit, [scope.node, this, scope.item, e])) {
                    return false;
                }
            });

            // IE8 fix
            var preventNextEvent = false;

            this.node.off(_namespace).on(events.join(' '), function (e) {

                switch (e.type) {
                    case "generateOnLoad":
                    case "focus":
                        if (scope.isGenerated && scope.options.searchOnFocus && scope.query.length >= scope.options.minLength) {
                            scope.showLayout();
                        }
                        if (scope.isGenerated === null && !scope.options.dynamic) {
                            scope.generateSource();
                        }
                        break;
                    case "keydown":
                        if (scope.isGenerated && scope.result.length) {
                            if (e.keyCode && ~[9, 13, 27, 38, 39, 40].indexOf(e.keyCode)) {
                                preventNextEvent = true;
                                scope.navigate(e);
                            }
                        }
                        break;
                    case "keyup":
                        if (_isIE9 && scope.node[0].value.replace(/^\s+/, '').toString().length < scope.query.length) {
                            scope.node.trigger('input' + _namespace);
                        }
                        break;
                    case "propertychange":
                        if (preventNextEvent) {
                            preventNextEvent = false;
                            break;
                        }
                    case "input":
                        scope.rawQuery = scope.node[0].value.toString();
                        scope.query = scope.node[0].value.replace(/^\s+/, '').toString();

                        if (scope.options.hint && scope.hint.container && scope.hint.container.val() !== '') {
                            if (scope.hint.container.val().indexOf(scope.rawQuery) !== 0) {
                                scope.hint.container.val('')
                            }
                        }
                        if (scope.options.dynamic) {
                            scope.isGenerated = null;
                            scope.helper.typeWatch(function () {
                                if (scope.query.length >= scope.options.minLength) {
                                    scope.generateSource();
                                } else {
                                    scope.hideLayout();
                                }
                            }, scope.options.delay);
                            return;
                        }
                    case "dynamic":
                        if (!scope.isGenerated) {
                            break;
                        }
                        if (scope.query.length < scope.options.minLength) {
                            scope.hideLayout();
                            break;
                        }

                        scope.searchResult();
                        scope.buildLayout();

                        if (scope.result.length > 0 || scope.options.emptyTemplate) {
                            scope.showLayout();
                        } else {
                            scope.hideLayout();
                        }

                        break;
                }

            });

            if (this.options.generateOnLoad) {
                this.node.trigger('generateOnLoad' + _namespace);
            }

        },

        generateSource: function () {

            if (this.isGenerated && !this.options.dynamic) {
                return;
            }

            this.generatedGroupCount = 0;
            this.isGenerated = false;

            if (!this.helper.isEmpty(this.xhr)) {
                for (var i in this.xhr) {
                    if (!this.xhr.hasOwnProperty(i)) continue;
                    this.xhr[i].abort();
                }
                this.xhr = {};
            }

            var group,
                dataInLocalstorage,
                isValidStorage;

            for (group in this.options.source) {
                if (!this.options.source.hasOwnProperty(group)) continue;

                // Get group source from Localstorage
                if (this.options.cache) {
                    dataInLocalstorage = window.localStorage.getItem(this.node.selector + ":" + group);
                    if (dataInLocalstorage) {
                        if (this.options.compression) {
                            dataInLocalstorage = LZString.decompressFromUTF16(dataInLocalstorage);
                        }

                        // In case the storage key:value are not readable anymore
                        isValidStorage = false;
                        try {
                            dataInLocalstorage = JSON.parse(dataInLocalstorage + "");

                            if (dataInLocalstorage.data && dataInLocalstorage.ttl > new Date().getTime()) {
                                this.populateSource(dataInLocalstorage.data, group);
                                isValidStorage = true;

                                // {debug}
                                if (this.options.debug) {
                                    _debug.log({
                                        'node': this.node.selector,
                                        'function': 'generateSource()',
                                        'message': 'Source for group "' + group + '" found in localStorage.'
                                    });
                                    _debug.print();
                                }
                                // {/debug}

                            } else {
                                window.localStorage.removeItem(this.node.selector + ":" + group);
                            }
                        } catch (error) {
                        }

                        if (isValidStorage) continue;
                    }
                }

                // Get group source from data
                if (this.options.source[group].data && !this.options.source[group].url) {

                    this.populateSource(
                        typeof this.options.source[group].data === "function" &&
                            this.options.source[group].data() ||
                            this.options.source[group].data,
                        group
                    );
                    continue;
                }

                // Get group source from Ajax / JsonP
                if (this.options.source[group].url) {
                    if (!this.requests[group]) {
                        this.requests[group] = this.generateRequestObject(group);
                    }
                }
            }

            this.handleRequests();

        },

        generateRequestObject: function (group) {

            var xhrObject = {
                request: {
                    url: null,
                    dataType: 'json'
                },
                extra: {
                    path: null,
                    group: group,
                    callback: {
                        done: null,
                        fail: null,
                        complete: null,
                        always: null
                    }
                },
                validForGroup: [group]
            };

            if (!(this.options.source[group].url instanceof Array) && this.options.source[group].url instanceof Object) {
                this.options.source[group].url = [this.options.source[group].url];
            }

            if (this.options.source[group].url instanceof Array) {
                if (this.options.source[group].url[0] instanceof Object) {

                    if (this.options.source[group].url[0].callback) {
                        xhrObject.extra.callback = this.options.source[group].url[0].callback;
                        delete this.options.source[group].url[0].callback;
                    }

                    xhrObject.request = $.extend(true, xhrObject.request, this.options.source[group].url[0]);

                } else if (typeof this.options.source[group].url[0] === "string") {
                    xhrObject.request.url = this.options.source[group].url[0];
                }
                if (this.options.source[group].url[1] && typeof this.options.source[group].url[1] === "string") {
                    xhrObject.extra.path = this.options.source[group].url[1];
                }
            } else if (typeof this.options.source[group].url === "string") {
                xhrObject.request.url = this.options.source[group].url;
            }

            if (xhrObject.request.dataType.toLowerCase() === 'jsonp') {
                // JSONP needs unique jsonpCallback name to run concurrently
                xhrObject.request.jsonpCallback = 'callback_' + group;
            }

            var stringRequest;

            for (var _group in this.requests) {
                if (!this.requests.hasOwnProperty(_group)) continue;

                stringRequest = JSON.stringify(this.requests[_group].request);

                if (stringRequest === JSON.stringify(xhrObject.request)) {
                    this.requests[_group].validForGroup.push(group);
                    xhrObject.isDuplicated = true;
                    delete xhrObject.validForGroup;
                    break;
                }
            }

            return xhrObject;

        },

        handleRequests: function () {

            var scope = this,
                requestsCount = Object.keys(this.requests).length;

            if (requestsCount) {
                this.helper.executeCallback(this.options.callback.onSendRequest, [this.node, this.query]);
            }

            for (var group in this.requests) {
                if (!this.requests.hasOwnProperty(group)) continue;
                if (this.requests[group].isDuplicated) continue;

                (function (group, xhrObject) {

                    var _request,
                        _isExtended = false; // Prevent the main request from being changed

                    if (~xhrObject.request.url.indexOf('{{query}}')) {
                        if (!_isExtended) {
                            xhrObject = $.extend(true, {}, xhrObject);
                            _isExtended = true;
                        }
                        xhrObject.request.url = xhrObject.request.url.replace('{{query}}', scope.query);
                    }

                    if (xhrObject.request.data) {
                        for (var i in xhrObject.request.data) {
                            if (!xhrObject.request.data.hasOwnProperty(i)) continue;
                            if (~String(xhrObject.request.data[i]).indexOf('{{query}}')) {
                                if (!_isExtended) {
                                    xhrObject = $.extend(true, {}, xhrObject);
                                    _isExtended = true;
                                }
                                xhrObject.request.data[i] = xhrObject.request.data[i].replace('{{query}}', scope.query);
                                break;
                            }
                        }
                    }

                    scope.xhr[group] = $.ajax(xhrObject.request).done(function (data, textStatus, jqXHR) {

                        var tmpData;
                        for (var i = 0; i < xhrObject.validForGroup.length; i++) {

                            _request = scope.requests[xhrObject.validForGroup[i]];

                            if (_request.extra.callback.done instanceof Function) {

                                tmpData = _request.extra.callback.done(data, textStatus, jqXHR);
                                data = tmpData instanceof Array && tmpData || data;

                                // {debug}
                                if (!(tmpData instanceof Array)) {
                                    if (scope.options.debug) {
                                        _debug.log({
                                            'node': scope.node.selector,
                                            'function': 'Ajax.callback.done()',
                                            'message': 'Invalid returned data has to be an Array'
                                        });
                                        _debug.print();
                                    }
                                }
                                // {/debug}
                            }

                            scope.populateSource(data, _request.extra.group, _request.extra.path);

                            requestsCount -= 1;
                            if (requestsCount === 0) {
                                scope.helper.executeCallback(scope.options.callback.onReceiveRequest, [scope.node, scope.query]);
                            }

                        }

                    }).fail(function (jqXHR, textStatus, errorThrown) {


                        for (var i = 0; i < xhrObject.validForGroup.length; i++) {
                            _request = scope.requests[xhrObject.validForGroup[i]];
                            _request.extra.callback.fail instanceof Function && _request.extra.callback.fail(jqXHR, textStatus, errorThrown);
                        }

                        // {debug}
                        if (scope.options.debug) {
                            _debug.log({
                                'node': scope.node.selector,
                                'function': 'Ajax.callback.fail()',
                                'message': 'Request failed'
                            });

                            _debug.print();
                        }
                        // {/debug}

                    }).then(function (jqXHR, textStatus) {

                        for (var i = 0; i < xhrObject.validForGroup.length; i++) {
                            _request = scope.requests[xhrObject.validForGroup[i]];
                            _request.extra.callback.then instanceof Function && _request.extra.callback.then(jqXHR, textStatus);
                        }

                    }).always(function (data, textStatus, jqXHR) {

                        for (var i = 0; i < xhrObject.validForGroup.length; i++) {
                            _request = scope.requests[xhrObject.validForGroup[i]];
                            _request.extra.callback.always instanceof Function && _request.extra.callback.always(data, textStatus, jqXHR);
                        }

                    });

                }(group, this.requests[group]));

            }

        },

        /**
         * Build the source groups to be cycled for matched results
         *
         * @param {Array} data Array of Strings or Array of Objects
         * @param {String} group
         * @param {String} [path]
         * @return {*}
         */
        populateSource: function (data, group, path) {

            var scope = this,
                extraData = this.options.source[group].url && this.options.source[group].data;

            data = typeof path === "string" ? this.helper.namespace(path, data) : data;

            if (typeof data === 'undefined') {
                // {debug}
                if (this.options.debug) {
                    _debug.log({
                        'node': this.node.selector,
                        'function': 'populateSource()',
                        'arguments': path,
                        'message': 'Invalid data path.'
                    });

                    _debug.print();
                }
                // {/debug}
            }

            if (!(data instanceof Array)) {
                // {debug}
                if (this.options.debug) {
                    _debug.log({
                        'node': this.node.selector,
                        'function': 'populateSource()',
                        'arguments': JSON.stringify({group: group}),
                        'message': 'Invalid data type, must be Array type.'
                    });
                    _debug.print();
                }
                // {/debug}
                data = [];
            }

            if (extraData) {
                if (typeof extraData === "function") {
                    extraData = extraData();
                }

                if (extraData instanceof Array) {
                    data = data.concat(extraData);
                }
                // {debug}
                else {
                    if (this.options.debug) {
                        _debug.log({
                            'node': this.node.selector,
                            'function': 'populateSource()',
                            'arguments': JSON.stringify(extraData),
                            'message': 'WARNING - this.options.source.' + group + '.data Must be an Array or a function that returns an Array.'
                        });

                        _debug.print();
                    }
                }
                // {/debug}
            }

            var tmpObj,
                display = this.options.source[group].display ?
                    (this.options.source[group].display[0] === 'compiled' ? this.options.source[group].display[1] : this.options.source[group].display[0]) :
                    (this.options.display[0] === 'compiled' ? this.options.display[1] : this.options.display[0]);

            // @TODO: possibly optimize this?
            for (var i = 0; i < data.length; i++) {
                if (typeof data[i] === "string") {
                    tmpObj = {};
                    tmpObj[display] = data[i];
                    data[i] = tmpObj;
                }
                data[i].group = group;
            }

            if (this.options.correlativeTemplate) {

                var template = this.options.source[group].template ||
                    this.options.template;

                if (!template) {
                    // {debug}
                    if (this.options.debug) {
                        _debug.log({
                            'node': this.node.selector,
                            'function': 'populateSource()',
                            'arguments': JSON.stringify(group),
                            'message': 'WARNING - this.options.correlativeTemplate is enabled but no template was found.'
                        });

                        _debug.print();
                    }
                    // {/debug}
                } else {

                    template = template
                        .replace(/<.+?>/g, '');

                    for (var i = 0; i < data.length; i++) {
                        data[i]['compiled'] = template.replace(/\{\{([\w\-\.]+)(?:\|(\w+))?}}/g,function (match, index) {
                                return scope.helper.namespace(index, data[i], 'get', '');
                            }
                        ).trim();
                    }

                    if (this.options.source[group].display) {
                        if (!~this.options.source[group].display.indexOf('compiled')) {
                            this.options.source[group].display.unshift('compiled');
                        }
                    } else if (!~this.options.display.indexOf('compiled')) {
                        this.options.display.unshift('compiled');
                    }

                }
            }

            // @TODO: find a way to save the order from options.source so it appears correctly?
            this.source[group] = data;

            if (this.options.cache && !localStorage.getItem(this.node.selector + ":" + group)) {

                var storage = JSON.stringify({
                    data: data,
                    ttl: new Date().getTime() + this.options.ttl
                });

                if (this.options.compression) {
                    storage = LZString.compressToUTF16(storage);
                }

                localStorage.setItem(
                    this.node.selector + ":" + group,
                    storage
                );
            }

            this.incrementGeneratedGroup();

        },

        incrementGeneratedGroup: function () {

            this.generatedGroupCount += 1;

            if (this.groupCount !== this.generatedGroupCount) {
                return;
            }

            this.isGenerated = true;

            this.xhr = {};

            this.node.trigger('dynamic' + _namespace);

        },

        /**
         * Key Navigation
         * tab 9: dismiss typeahead results
         * Up 38: select previous item, skip "group" item
         * Down 40: select next item, skip "group" item
         * Right 39: change charAt, if last char fill hint (if options is true)
         * Esc 27: hideLayout
         * Enter 13: Select item + submit search
         *
         * @param {Object} e Event object
         * @returns {*}
         */
        navigate: function (e) {

            this.helper.executeCallback(this.options.callback.onNavigate, [this.node, this.query, e]);

            if (e.keyCode === 27 || e.keyCode === 9) {
                // #57 ESC should not preventDefault if Typeahead is not opened
                if (this.container.hasClass('result')) {
                    e.preventDefault();
                    this.hideLayout();
                }
                return;
            }

            var itemList = this.resultContainer.find('> ul > li:not([data-search-group])'),
                activeItem = itemList.filter('.active'),
                activeItemIndex = activeItem[0] && itemList.index(activeItem) || null;

            if (e.keyCode === 13) {

                if (activeItem.length > 0) {
                    e.preventDefault();
                    e.stopPropagation();

                    activeItem.find('a:first').trigger('click');

                    return;

                } else {

                    if (this.options.mustSelectItem && this.helper.isEmpty(this.item)) {
                        return;
                    }

                    this.hideLayout();
                    return;
                }
            }

            if (e.keyCode === 39) {
                if (activeItemIndex) {
                    itemList.eq(activeItemIndex).find('a:first').trigger('click');
                } else if (this.options.hint &&
                    this.hint.container.val() !== "" &&
                    this.helper.getCaret(this.node[0]) >= this.query.length) {

                    itemList.find('a[data-index="' + this.hintIndex + '"]').trigger('click');

                }
                return;
            }

            if (itemList.length > 0) {
                activeItem.removeClass('active');
            }

            if (e.keyCode === 38) {

                e.preventDefault();

                if (activeItem.length > 0) {
                    if (activeItemIndex - 1 >= 0) {
                        itemList.eq(activeItemIndex - 1).addClass('active');
                    }
                } else {
                    itemList.last().addClass('active');
                }

            } else if (e.keyCode === 40) {

                e.preventDefault();

                if (activeItem.length > 0) {
                    if (activeItemIndex + 1 < itemList.length) {
                        itemList.eq(activeItemIndex + 1).addClass('active');
                    }
                } else {
                    itemList.first().addClass('active');
                }

            }

            activeItem = itemList.filter('.active');

            if (this.options.hint && this.hint.container) {
                if (activeItem.length > 0) {
                    this.hint.container.css('color', this.hint.container.css('background-color') || 'fff');
                } else {
                    this.hint.container.css('color', this.hint.css.color)
                }
            }

            if (activeItem.length > 0) {

                var itemIndex = activeItem.find('a:first').attr('data-index');

                itemIndex && this.node.val(this.result[itemIndex][this.result[itemIndex].matchedKey]);

            } else {
                this.node.val(this.rawQuery);
            }

        },

        searchResult: function (preserveItem) {

            // #54 In case the item is being clicked, we want to preserve it for onSubmit callback
            if (!preserveItem) {
                this.item = {};
            }

            this.helper.executeCallback(this.options.callback.onSearch, [this.node, this.query]);

            this.result = [];
            this.resultCount = 0;

            var scope = this,
                group,
                item,
                match,
                comparedDisplay,
                comparedQuery = this.query.toLowerCase(),
                itemPerGroup = {},
                groupBy = this.filters.dropdown && this.filters.dropdown.key || this.groupBy,
                hasDynamicFilters = this.filters.dynamic && !this.helper.isEmpty(this.filters.dynamic),
                displayKeys,
                missingDisplayKey = {},
                filter,
                correlativeMatch,
                correlativeQuery,
                correlativeDisplay;

            if (this.options.accent) {
                comparedQuery = this.helper.removeAccent(comparedQuery);
            }

            for (group in this.source) {
                if (!this.source.hasOwnProperty(group)) continue;
                if (this.filters.dropdown && this.filters.dropdown.key === "group" && this.filters.dropdown.value !== group) continue; // @TODO, verify this

                if (this.options.maxItemPerGroup && groupBy === "group") {
                    if (!itemPerGroup[group]) {
                        itemPerGroup[group] = 0;
                    } else if (itemPerGroup[group] >= this.options.maxItemPerGroup && !this.options.callback.onResult) {
                        break;
                    }
                }

                filter = typeof this.options.source[group].filter === "undefined" || this.options.source[group].filter === true;

                for (var k = 0; k < this.source[group].length; k++) {
                    if (this.result.length >= this.options.maxItem && !this.options.callback.onResult) break;
                    if (hasDynamicFilters && !this.dynamicFilter.validate.apply(this, [this.source[group][k]])) continue;

                    item = this.source[group][k];

                    if (this.options.maxItemPerGroup && groupBy !== "group") {
                        if (!itemPerGroup[item[groupBy]]) {
                            itemPerGroup[item[groupBy]] = 0;
                        } else if (itemPerGroup[item[groupBy]] >= this.options.maxItemPerGroup && !this.options.callback.onResult) {
                            continue;
                        }
                    }

                    displayKeys = this.options.source[group].display || this.options.display;

                    for (var i = 0; i < displayKeys.length; i++) {

                        if (filter) {
                            comparedDisplay = item[displayKeys[i]];

                            if (!comparedDisplay) {
                                // {debug}
                                if (this.options.debug) {
                                    missingDisplayKey[i] = {
                                        display: displayKeys[i],
                                        data: item
                                    };
                                }
                                // {/debug}
                                continue;
                            }

                            comparedDisplay = comparedDisplay.toString().toLowerCase();

                            if (this.options.accent) {
                                comparedDisplay = this.helper.removeAccent(comparedDisplay);
                            }

                            match = comparedDisplay.indexOf(comparedQuery);

                            if (this.options.correlativeTemplate && displayKeys[i] === 'compiled' && match < 0 && /\s/.test(comparedQuery)) {
                                correlativeMatch = true;
                                correlativeQuery = comparedQuery.split(' ');
                                correlativeDisplay = comparedDisplay;
                                for (var x = 0; x < correlativeQuery.length; x++) {
                                    if (correlativeQuery[x] === "") continue;
                                    if (!~correlativeDisplay.indexOf(correlativeQuery[x])) {
                                        correlativeMatch = false;
                                        break;
                                    }
                                    correlativeDisplay = correlativeDisplay.replace(correlativeQuery[x], '');
                                }
                            }

                            if (match < 0 && !correlativeMatch) continue;
                            if (this.options.offset && match !== 0) continue;
                            if (this.options.source[group].ignore && this.options.source[group].ignore.test(comparedDisplay)) continue;
                        }

                        if (this.filters.dropdown) {
                            if (this.filters.dropdown.value != item[this.filters.dropdown.key]) continue;
                        }

                        this.resultCount += 1;

                        if ((this.options.callback.onResult && this.result.length >= this.options.maxItem) ||
                            this.options.maxItemPerGroup && itemPerGroup[item[groupBy]] >= this.options.maxItemPerGroup
                            ) {
                            break;
                        }

                        item.matchedKey = displayKeys[i];

                        this.result.push(item);

                        if (this.options.maxItemPerGroup) {
                            itemPerGroup[item[groupBy]] += 1;
                        }

                        break;
                    }
                }
            }

            // {debug}
            if (this.options.debug) {
                if (!this.helper.isEmpty(missingDisplayKey)) {
                    _debug.log({
                        'node': this.node.selector,
                        'function': 'searchResult()',
                        'arguments': JSON.stringify(missingDisplayKey),
                        'message': 'Missing keys for display, make sure options.display is set properly.'
                    });

                    _debug.print();
                }
            }
            // {/debug}

            if (this.options.order) {

                var displayKeys = [],
                    displayKey;

                for (var i = 0; i < this.result.length; i++) {
                    displayKey = this.options.source[this.result[i].group].display || this.options.display;
                    if (!~displayKeys.indexOf(displayKey[0])) {
                        displayKeys.push(displayKey[0]);
                    }
                }

                this.result.sort(
                    scope.helper.sort(
                        displayKeys,
                        scope.options.order === "asc",
                        function (a) {
                            return a.toString().toUpperCase()
                        }
                    )
                );
            }

            this.helper.executeCallback(this.options.callback.onResult, [this.node, this.query, this.result, this.resultCount]);

        },

        buildLayout: function () {

            if (!this.resultContainer) {
                this.resultContainer = $("<div/>", {
                    "class": this.options.selector.result
                });

                this.container.append(this.resultContainer);
            }

            // Reused..
            var _query = this.query.toLowerCase();
            if (this.options.accent) {
                _query = this.helper.removeAccent(_query);
            }

            var scope = this,
                resultHtmlList = $("<ul/>", {
                    "class": this.options.selector.list + (scope.helper.isEmpty(scope.result) ? ' empty' : ''),
                    "html": function () {

                        if (scope.options.emptyTemplate && scope.helper.isEmpty(scope.result)) {
                            return $("<li/>", {
                                "html": $("<a/>", {
                                    "href": "javascript:;",
                                    "html": typeof scope.options.emptyTemplate === "function" && scope.options.emptyTemplate(scope.query) || scope.options.emptyTemplate.replace(/\{\{query}}/gi, scope.query)
                                })
                            });
                        }

                        for (var i in scope.result) {
                            if (!scope.result.hasOwnProperty(i)) continue;

                            (function (index, item, ulScope) {

                                var _group = item.group,
                                    _liHtml,
                                    _aHtml,
                                    _display = {},
                                    _displayKeys = scope.options.source[item.group].display || scope.options.display,
                                    _href = scope.options.source[item.group].href || scope.options.href,
                                    _displayKey,
                                    _handle,
                                    _template;

                                if (scope.options.group) {
                                    if (typeof scope.options.group[0] !== "boolean" && item[scope.options.group[0]]) {
                                        _group = item[scope.options.group[0]];
                                    }
                                    if (!$(ulScope).find('li[data-search-group="' + _group + '"]')[0]) {
                                        $(ulScope).append(
                                            $("<li/>", {
                                                "class": scope.options.selector.group,
                                                "html": $("<a/>", {
                                                    "href": "javascript:;",
                                                    "html": scope.options.group[1] && scope.options.group[1].replace(/(\{\{group}})/gi, item[scope.options.group[0]] || _group) || _group
                                                }),
                                                "data-search-group": _group
                                            })
                                        );
                                    }
                                }

                                for (var i = 0; i < _displayKeys.length; i++) {
                                    _displayKey = _displayKeys[i];
                                    _display[_displayKey] = item[_displayKey];
                                }

                                _liHtml = $("<li/>", {
                                    "html": $("<a/>", {
                                        "href": function () {

                                            if (_href) {
                                                if (typeof _href === "string") {
                                                    _href = _href.replace(/\{\{([\w\-\.]+)(?:\|(\w+))?}}/g, function (match, index, option) {

                                                        var value = scope.helper.namespace(index, item, 'get', '');
                                                        if (option && option === "raw") {
                                                            return value;
                                                        }
                                                        return scope.helper.slugify(value);

                                                    });
                                                } else if (typeof _href === "function") {
                                                    _href = _href(item);
                                                }
                                                item['href'] = _href;
                                            }

                                            return _href || "javascript:;";

                                        },
                                        "data-group": _group,
                                        "data-index": index,
                                        "html": function () {

                                            _template = (item.group && scope.options.source[item.group].template) || scope.options.template;

                                            if (_template) {
                                                _aHtml = _template.replace(/\{\{([\w\-\.]+)(?:\|(\w+))?}}/g, function (match, index, option) {

                                                    var value = scope.helper.namespace(index, item, 'get', '');
                                                    if (option && option === "raw") {
                                                        return value;
                                                    }
                                                    return scope.helper.namespace(index, _display, 'get', '') || value;

                                                });
                                            } else {
                                                _aHtml = '<span class="' + scope.options.selector.display + '">' + scope.helper.joinObject(_display, " ") + '</span>';
                                            }

                                            if (scope.options.highlight) {
                                                _aHtml = scope.helper.highlight(_aHtml, _query.split(" "), scope.options.accent)
                                            }

                                            $(this).append(_aHtml);

                                        },
                                        "click": ({"item": item}, function (e) {

                                            if (scope.options.mustSelectItem && scope.helper.isEmpty(item)) {
                                                e.preventDefault();
                                                return;
                                            }

                                            scope.item = item;

                                            scope.helper.executeCallback(scope.options.callback.onClickBefore, [scope.node, this, item, e]);

                                            if (e.isDefaultPrevented()) {
                                                return;
                                            }

                                            e.preventDefault();

                                            scope.query = scope.rawQuery = item[item.matchedKey].toString();
                                            scope.node.val(scope.query).focus();

                                            scope.searchResult(true);
                                            scope.buildLayout();
                                            scope.hideLayout();

                                            scope.helper.executeCallback(scope.options.callback.onClickAfter, [scope.node, this, item, e]);

                                        }),
                                        "mouseenter": function (e) {

                                            $(this).closest('ul').find('li.active').removeClass('active');
                                            $(this).closest('li').addClass('active');

                                            scope.helper.executeCallback(scope.options.callback.onMouseEnter, [scope.node, this, item, e]);
                                        },
                                        "mouseleave": function (e) {

                                            $(this).closest('li').removeClass('active');

                                            scope.helper.executeCallback(scope.options.callback.onMouseLeave, [scope.node, this, item, e]);
                                        }
                                    })
                                });

                                if (scope.options.group) {

                                    _handle = $(ulScope).find('a[data-group="' + _group + '"]:last').closest('li');
                                    if (!_handle[0]) {
                                        _handle = $(ulScope).find('li[data-search-group="' + _group + '"]');
                                    }
                                    $(_liHtml).insertAfter(_handle);

                                } else {
                                    $(ulScope).append(_liHtml);
                                }

                            }(i, scope.result[i], this));
                        }

                    }
                });

            if (this.options.backdrop) {

                if (this.backdrop.container) {
                    this.backdrop.container.show();
                } else {
                    this.backdrop.css = $.extend(
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
                        this.options.backdrop
                    );

                    this.backdrop.container = $("<div/>", {
                        "class": this.options.selector.backdrop,
                        "css": this.backdrop.css,
                        "click": function () {
                            scope.hideLayout();
                        }
                    }).insertAfter(this.container);

                }
                this.container
                    .addClass('backdrop')
                    .css({
                        "z-index": this.backdrop.css["z-index"] + 1,
                        "position": "relative"
                    });

            }

            if (this.options.hint) {

                var _hint = "";

                this.hintIndex = null;

                if (this.result.length > 0 && this.query.length > 0) {

                    if (!this.hint.container) {

                        this.hint.css = $.extend({
                                "border-color": "transparent",
                                "position": "absolute",
                                "top": 0,
                                "display": "inline",
                                "z-index": -1,
                                "float": "none",
                                "color": "silver",
                                "box-shadow": "none",
                                "cursor": "default",
                                "-webkit-user-select": "none",
                                "-moz-user-select": "none",
                                "-ms-user-select": "none",
                                "user-select": "none"
                            },
                            this.options.hint
                        );

                        this.hint.container = $('<input/>', {
                            'type': this.node.attr('type'),
                            'class': this.node.attr('class'),
                            'readonly': true,
                            'unselectable': 'on',
                            'tabindex': -1,
                            'click': function () {
                                // IE8 Fix
                                scope.node.focus();
                            }
                        }).addClass(_options.selector.hint)
                            .css(this.hint.css)
                            .insertAfter(this.node)

                        this.node.parent().css({
                            "position": "relative"
                        });
                    }

                    this.hint.container.css('color', this.hint.css.color)

                    var _displayKeys,
                        _group,
                        _comparedValue;

                    for (var i = 0; i < this.result.length; i++) {
                        _group = this.result[i].group;
                        _displayKeys = scope.options.source[_group].display || scope.options.display;

                        for (var k = 0; k < _displayKeys.length; k++) {

                            _comparedValue = String(this.result[i][_displayKeys[k]]).toLowerCase();
                            if (this.options.accent) {
                                _comparedValue = this.helper.removeAccent(_comparedValue);
                            }

                            if (_comparedValue.indexOf(_query) === 0) {
                                _hint = String(this.result[i][_displayKeys[k]]);
                                this.hintIndex = i;
                                break;
                            }
                        }
                        if (this.hintIndex !== null) {
                            break;
                        }
                    }
                }

                if (this.hint.container) {
                    this.hint.container
                        .val(_hint.length > 0 && this.rawQuery + _hint.substring(this.query.length) || "")
                        .show();
                }
            }

            if (this.options.callback.onLayoutBuiltBefore) {
                var tmpResultHtmlList = this.helper.executeCallback(this.options.callback.onLayoutBuiltBefore, [this.node, this.query, this.result, resultHtmlList]);

                if (tmpResultHtmlList instanceof jQuery) {
                    resultHtmlList = tmpResultHtmlList;
                }
                // {debug}
                else {
                    if (this.options.debug) {
                        _debug.log({
                            'node': this.node.selector,
                            'function': 'callback.onLayoutBuiltBefore()',
                            'message': 'Invalid returned value - You must return resultHtmlList jQuery Object'
                        });

                        _debug.print();
                    }
                }
                // {/debug}
            }

            this.container.addClass('result');

            this.resultContainer
                .html(resultHtmlList);

            if (this.options.callback.onLayoutBuiltAfter) {
                this.helper.executeCallback(this.options.callback.onLayoutBuiltAfter, [this.node, this.query, this.result]);
            }
        },

        buildDropdownLayout: function () {

            if (!this.options.dropdownFilter) {
                return;
            }

            var scope = this,
                defaultText;

            if (typeof this.options.dropdownFilter === "boolean") {
                defaultText = "all";
            } else if (typeof this.options.dropdownFilter === "string") {
                defaultText = this.options.dropdownFilter
            } else if (this.options.dropdownFilter instanceof Array) {
                for (var i = 0; i < this.options.dropdownFilter.length; i++) {
                    if (this.options.dropdownFilter[i].value === "*" && this.options.dropdownFilter[i].display) {
                        defaultText = this.options.dropdownFilter[i].display;
                        break;
                    }
                }
            }

            $('<span/>', {
                "class": this.options.selector.filter,
                "html": function () {

                    $(this).append(
                        $('<button/>', {
                            "type": "button",
                            "class": scope.options.selector.filterButton,
                            "html": "<span class='" + scope.options.selector.filterValue + "'>" + defaultText + "</span> <span class='" + scope.options.selector.dropdownCarret + "'></span>",
                            "click": function (e) {

                                e.stopPropagation();

                                var filterContainer = scope.container.find('.' + scope.options.selector.dropdown.replace(" ", "."));

                                if (!filterContainer.is(':visible')) {
                                    scope.container.addClass('filter');
                                    filterContainer.show();

                                    $('html').off(_namespace + ".dropdownFilter")
                                        .on("click" + _namespace + ".dropdownFilter" + ' touchstart' + _namespace + ".dropdownFilter", function () {
                                            scope.container.removeClass('filter');
                                            filterContainer.hide();
                                            $(this).off(_namespace + ".dropdownFilter");
                                        });

                                } else {
                                    scope.container.removeClass('filter');
                                    filterContainer.hide();

                                    $('html').off(_namespace + ".dropdownFilter");
                                }

                            }
                        })
                    );

                    $(this).append(
                        $('<ul/>', {
                            "class": scope.options.selector.dropdown,
                            "html": function () {

                                var items = scope.options.dropdownFilter;

                                if (~['string', 'boolean'].indexOf(typeof scope.options.dropdownFilter)) {

                                    items = [];
                                    for (var group in scope.options.source) {
                                        if (!scope.options.source.hasOwnProperty(group)) continue;
                                        items.push({
                                            key: 'group',
                                            value: group
                                        });
                                    }

                                    items.push({
                                        key: 'group',
                                        value: '*',
                                        display: typeof scope.options.dropdownFilter === "string" && scope.options.dropdownFilter || 'All'
                                    });
                                }

                                for (var i = 0; i < items.length; i++) {

                                    (function (i, item, ulScope) {

                                        if ((!item.key && item.value !== "*") || !item.value) {

                                            // {debug}
                                            if (scope.options.debug) {
                                                _debug.log({
                                                    'node': scope.node.selector,
                                                    'function': 'buildDropdownLayout()',
                                                    'arguments': JSON.stringify(item),
                                                    'message': 'WARNING - Missing key or value, skipping dropdown filter."'
                                                });

                                                _debug.print();
                                            }
                                            // {/debug}

                                            return;
                                        }

                                        if (item.value === '*') {
                                            $(ulScope).append(
                                                $("<li/>", {
                                                    "class": "divider"
                                                })
                                            );
                                        }

                                        $(ulScope).append(
                                            $("<li/>", {
                                                "html": $("<a/>", {
                                                    "href": "javascript:;",
                                                    "html": item.display || item.value,
                                                    "click": ({"item": item}, function (e) {
                                                        e.preventDefault();
                                                        _selectFilter.apply(scope, [item]);
                                                    })
                                                })
                                            })
                                        );

                                    }(i, items[i], this));

                                }
                            }
                        })
                    );
                }
            }).insertAfter(scope.container.find('.' + scope.options.selector.query));

            /**
             * @private
             * Select the filter and rebuild the result group
             *
             * @param {string} item
             */
            function _selectFilter(item) {

                if (item.value === "*") {
                    delete this.filters.dropdown;
                } else {
                    this.filters.dropdown = item;
                }

                this.container
                    .removeClass('filter')
                    .find('.' + this.options.selector.filterValue)
                    .html(item.display || item.value);

                this.node.trigger('dynamic' + _namespace);

                this.node.focus();

            }

        },

        dynamicFilter: {

            validate: function (item) {

                var isValid,
                    softValid = null,
                    hardValid = null,
                    itemValue;

                for (var key in this.filters.dynamic) {
                    if (!this.filters.dynamic.hasOwnProperty(key)) continue;
                    if (!!~key.indexOf('.')) {
                        itemValue = this.helper.namespace(key, item, 'get');
                    } else {
                        itemValue = item[key];
                    }

                    if (this.filters.dynamic[key].modifier === '|' && !softValid) {
                        softValid = itemValue == this.filters.dynamic[key].value || false;
                    }

                    if (this.filters.dynamic[key].modifier === '&') {
                        // Leaving "==" in case of comparing number with string
                        if (itemValue == this.filters.dynamic[key].value) {
                            hardValid = true;
                        } else {
                            hardValid = false;
                            break;
                        }
                    }
                }

                isValid = softValid;
                if (hardValid !== null) {
                    isValid = hardValid;
                    if (hardValid === true && softValid !== null) {
                        isValid = softValid;
                    }
                }

                return !!isValid;

            },

            set: function (key, value) {

                var matches = key.match(/^([|&])?(.+)/);

                if (!value) {
                    delete this.filters.dynamic[matches[2]];
                } else {
                    this.filters.dynamic[matches[2]] = {
                        modifier: matches[1] || '|',
                        value: value
                    };
                }

                this.searchResult();
                this.buildLayout();

            },
            bind: function () {

                if (!this.options.dynamicFilter) {
                    return;
                }

                var scope = this;

                var filter;
                for (var i = 0; i < this.options.dynamicFilter.length; i++) {

                    filter = this.options.dynamicFilter[i];

                    if (typeof filter.selector === "string") {
                        filter.selector = $(filter.selector);
                    }

                    if (!(filter.selector instanceof jQuery) || !filter.selector[0] || !filter.key) {
                        // {debug}
                        if (this.options.debug) {
                            _debug.log({
                                'node': this.node.selector,
                                'function': 'buildDynamicLayout()',
                                'message': 'Invalid jQuery selector or jQuery Object for "filter.selector" or missing filter.key'
                            });

                            _debug.print();
                        }
                        // {/debug}
                        continue;
                    }

                    (function (filter) {
                        filter.selector.off(_namespace).on('change' + _namespace,function () {
                            scope.dynamicFilter.set.apply(scope, [filter.key, scope.dynamicFilter.getValue(this)]);
                        }).trigger('change' + _namespace);
                    }(filter));

                }
            },

            getValue: function (tag) {
                var value;
                if (tag.tagName === "SELECT") {
                    value = tag.value;
                } else if (tag.tagName === "INPUT") {
                    if (tag.type === "checkbox") {
                        value = tag.checked || null;
                    } else if (tag.type === "radio" && tag.checked) {
                        value = tag.value;
                    }
                }
                return value;
            }
        },

        showLayout: function () {

            var scope = this;

            $('html').off(_namespace).on("click" + _namespace + " touchstart" + _namespace, function () {
                scope.hideLayout();
                $(this).off(_namespace);
            });

            // Do not add display classes if there are no results
            if (!this.result.length && !this.options.emptyTemplate) {
                return;
            }

            this.container.addClass('result hint backdrop');

        },

        hideLayout: function () {

            this.container.removeClass('result hint backdrop filter');

        },

        __construct: function () {
            this.extendOptions();

            if (!this.unifySourceFormat()) {
                return;
            }

            this.init();
            this.delegateEvents();
            this.buildDropdownLayout();
            this.dynamicFilter.bind.apply(this);

            this.helper.executeCallback(this.options.callback.onReady, [this.node]);
        },

        helper: {

            isEmpty: function (obj) {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop))
                        return false;
                }

                return true;
            },

            /**
             * Remove every accent(s) from a string
             *
             * @param {String} string
             * @returns {*}
             */
            removeAccent: function (string) {

                if (typeof string !== "string") {
                    return;
                }

                string = string.toLowerCase().replace(new RegExp('[' + _accent.from + ']', 'g'), function (match) {
                    return _accent.to[_accent.from.indexOf(match)];
                });

                return string;
            },

            /**
             * Creates a valid url from string
             *
             * @param {String} string
             * @returns {string}
             */
            slugify: function (string) {

                string = String(string);

                if (string !== "") {
                    string = this.removeAccent(string);
                    string = string.replace(/[^-a-z0-9]+/g, '-').replace(/-+/g, '-').trim('-');
                }

                return string;
            },

            /**
             * Sort list of object by key
             *
             * @param {String|Array} field
             * @param {Boolean} reverse
             * @param {Function} primer
             * @returns {Function}
             */
            sort: function (field, reverse, primer) {

                var key = function (x) {
                    for (var i = 0; i < field.length; i++) {
                        if (typeof x[field[i]] !== 'undefined') {
                            return primer(x[field[i]])
                        }
                    }
                };

                reverse = [-1, 1][+!!reverse];

                return function (a, b) {
                    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
                }
            },

            /**
             * Replace a string from-to index
             *
             * @param {String} string The complete string to replace into
             * @param {Number} offset The cursor position to start replacing from
             * @param {Number} length The length of the replacing string
             * @param {String} replace The replacing string
             * @returns {String}
             */
            replaceAt: function (string, offset, length, replace) {
                return string.substring(0, offset) + replace + string.substring(offset + length);
            },

            /**
             * Adds <strong> html around a matched string
             *
             * @param {String} string The complete string to match from
             * @param {String} key
             * @param {Boolean} [accents]
             * @returns {*}
             */
            highlight: function (string, keys, accents) {

                string = String(string);

                var searchString = accents && this.removeAccent(string) || string,
                    matches = [];

                if (!(keys instanceof Array)) {
                    keys = [keys];
                }

                keys.sort(function (a, b) {
                    return b.length - a.length;
                });

                // Make sure the '|' join will be safe!
                for (var i = keys.length - 1; i >= 0; i--) {
                    if (keys[i].trim() === "") {
                        keys.splice(i, 1);
                        continue;
                    }
                    keys[i] = keys[i].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
                }

                searchString.replace(
                    new RegExp('(?:' + keys.join('|') + ')(?!([^<]+)?>)', 'gi'),
                    function (match, index, offset) {
                        matches.push({
                            offset: offset,
                            length: match.length
                        });
                    }
                );

                for (var i = matches.length - 1; i >= 0; i--) {
                    string = this.replaceAt(
                        string,
                        matches[i].offset,
                        matches[i].length,
                        "<strong>" + string.substr(matches[i].offset, matches[i].length) + "</strong>"
                    );
                }

                return string;
            },

            joinObject: function (object, join) {
                var string = "",
                    iteration = 0;

                for (var i in object) {
                    if (!object.hasOwnProperty(i)) continue;

                    if (iteration !== 0) {
                        string += join;
                    }

                    string += object[i];

                    iteration++;
                }

                return string;
            },

            /**
             * Get carret position, mainly used for right arrow navigation
             * @param element
             * @returns {*}
             */
            getCaret: function (element) {
                if (element.selectionStart) {
                    return element.selectionStart;
                } else if (document.selection) {
                    element.focus();

                    var r = document.selection.createRange();
                    if (r == null) {
                        return 0;
                    }

                    var re = element.createTextRange(),
                        rc = re.duplicate();
                    re.moveToBookmark(r.getBookmark());
                    rc.setEndPoint('EndToStart', re);

                    return rc.text.length;
                }
                return 0;
            },

            /**
             * Executes an anonymous function or a string reached from the window scope.
             *
             * @example
             * Note: These examples works with every configuration callbacks
             *
             * // An anonymous function inside the "onInit" option
             * onInit: function() { console.log(':D'); };
             *
             * // myFunction() located on window.coucou scope
             * onInit: 'window.coucou.myFunction'
             *
             * // myFunction(a,b) located on window.coucou scope passing 2 parameters
             * onInit: ['window.coucou.myFunction', [':D', ':)']];
             *
             * // Anonymous function to execute a local function
             * onInit: function () { myFunction(':D'); }
             *
             * @param {String|Array} callback The function to be called
             * @param {Array} [extraParams] In some cases the function can be called with Extra parameters (onError)
             * @returns {Boolean}
             */
            executeCallback: function (callback, extraParams) {

                if (!callback) {
                    return false;
                }

                var _callback,
                    _node = extraParams[0];

                if (typeof callback === "function") {

                    _callback = callback;

                } else if (typeof callback === "string" || callback instanceof Array) {

                    if (typeof callback === "string") {
                        callback = [callback, []];
                    }
                    _callback = this.helper.namespace(callback[0], window);

                    if (typeof _callback !== "function") {

                        // {debug}
                        if (this.options.debug) {
                            _debug.log({
                                'node': _node.selector,
                                'function': 'executeCallback()',
                                'arguments': JSON.stringify(callback),
                                'message': 'WARNING - Invalid callback function"'
                            });

                            _debug.print();
                        }
                        // {/debug}

                        return false;
                    }

                }

                return _callback.apply(this, $.merge(callback[1] || [], (extraParams) ? extraParams : [])) || true;

            },

            namespace: function (namespaceString, objectReference, method, objectValue) {

                if (typeof namespaceString !== "string" || namespaceString === "") {
                    // {debug}
                    if (this.options.debug) {
                        _debug.log({
                            'node': _node.selector,
                            'function': 'namespace()',
                            'arguments': namespaceString,
                            'message': 'ERROR - Missing namespaceString"'
                        });

                        _debug.print();
                    }
                    // {/debug}
                    return false;
                }

                var parts = namespaceString.split('.'),
                    parent = objectReference || window,
                    method = method || 'get',
                    value = objectValue || {},
                    currentPart = '';

                for (var i = 0, length = parts.length; i < length; i++) {
                    currentPart = parts[i];

                    if (typeof parent[currentPart] === "undefined") {
                        if (~['get', 'delete'].indexOf(method)) {
                            return typeof objectValue !== "undefined" ? objectValue : undefined;
                        }
                        parent[currentPart] = {};
                    }

                    if (~['set', 'create', 'delete'].indexOf(method)) {
                        if (i === length - 1) {
                            if (method === 'set' || method === 'create') {
                                parent[currentPart] = value;
                            } else {

                                delete parent[currentPart];
                                return true;
                            }
                        }
                    }

                    parent = parent[currentPart];

                }
                return parent;
            },

            typeWatch: (function () {
                var timer = 0;
                return function (callback, ms) {
                    clearTimeout(timer);
                    timer = setTimeout(callback, ms);
                }
            })()

        }
    };

    /**
     * @public
     * Implement Typeahead on the selected input node.
     *
     * @param {Object} options
     * @return {Object} Modified DOM element
     */
    $.fn.typeahead = $.typeahead = function (options) {
        return _api.typeahead(this, options);
    };

    /**
     * @private
     * API to handles Typeahead methods via jQuery.
     */
    var _api = {

        /**
         * Enable Typeahead
         *
         * @param {Object} node
         * @param {Object} options
         * @returns {*}
         */
        typeahead: function (node, options) {

            if (!options || !options.source || typeof options.source !== 'object') {

                // {debug}
                _debug.log({
                    'node': node.selector || options && options.input,
                    'function': '$.typeahead()',
                    'arguments': JSON.stringify(options && options.source || ''),
                    'message': 'Undefined "options" or "options.source" or invalid source type - Typeahead dropped'
                });

                _debug.print();
                // {/debug}

                return;
            }

            if (typeof node === "function") {
                if (!options.input) {

                    // {debug}
                    _debug.log({
                        'node': node.selector,
                        'function': '$.typeahead()',
                        //'arguments': JSON.stringify(options),
                        'message': 'Undefined "options.input" - Typeahead dropped'
                    });

                    _debug.print();
                    // {/debug}

                    return;
                }

                node = $(options.input);
            }

            if (!node.length) {

                // {debug}
                _debug.log({
                    'node': node.selector,
                    'function': '$.typeahead()',
                    'arguments': JSON.stringify(options.input),
                    'message': 'Unable to find jQuery input element - Typeahead dropped'
                });

                _debug.print();
                // {/debug}

                return;
            }

            var initNode;
            for (var i = 0; i < node.length; i++) {
                initNode = node.length === 1 ? node : $(node.selector.split(',')[i].trim());
                window.Typeahead[initNode.selector] = new Typeahead(initNode, options);
            }
        }

    };

// {debug}
    var _debug = {

        table: {},
        log: function (debugObject) {

            if (!debugObject.message || typeof debugObject.message !== "string") {
                return;
            }

            this.table[debugObject.message] = $.extend({
                'node': '',
                'function': '',
                'arguments': ''
            }, debugObject)

        },
        print: function () {

            if (Typeahead.prototype.helper.isEmpty(this.table) || !console || !console.table) {
                return;
            }

            if (console.group !== undefined || console.table !== undefined) {
                console.groupCollapsed('--- jQuery Typeahead Debug ---');
                console.table(this.table);
                console.groupEnd();
            }

            this.table = {};

        }

    };
    _debug.log({
        'message': 'WARNING - You are using the DEBUG version. Use /dist/jquery.typeahead.min.js in production.'
    });

    _debug.print();
// {/debug}

// IE8 Shims
    window.console = window.console || {
        log: function () {
        }
    };

    if (!('trim' in String.prototype)) {
        String.prototype.trim = function () {
            return this.replace(/^\s+/, '').replace(/\s+$/, '');
        };
    }
    if (!('indexOf' in Array.prototype)) {
        Array.prototype.indexOf = function (find, i /*opt*/) {
            if (i === undefined) i = 0;
            if (i < 0) i += this.length;
            if (i < 0) i = 0;
            for (var n = this.length; i < n; i++)
                if (i in this && this[i] === find)
                    return i;
            return -1;
        };
    }
    if (!Object.keys) {
        Object.keys = function (obj) {
            var keys = [],
                k;
            for (k in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, k)) {
                    keys.push(k);
                }
            }
            return keys;
        };
    }

}(window, document, window.jQuery));
