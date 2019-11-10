/*!
 * jQuery Typeahead
 * Copyright (C) 2016 RunningCoder.org
 * Licensed under the MIT license
 *
 * @author Tom Bertrand
 * @version 2.6.1 (2016-5-2)
 * @link http://www.runningcoder.org/jquerytypeahead/
 */;
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define('jquery-typeahead', ['jquery'], function (jQuery) {
            return factory(jQuery);
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (jQuery, root) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            return factory(jQuery);
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

    "use strict";

    window.Typeahead = {
        version: '2.6.1'
    };

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
        accent: false,          // -> Improved feature, define a custom replacement object
        highlight: true,        // -> Added "any" to highlight any word in the template, by default true will only highlight display keys
        group: false,           // -> Improved feature, Boolean,string,object(key, template (string, function))
        groupOrder: null,       // -> New feature, order groups "asc", "desc", Array, Function
        maxItemPerGroup: null,  // -> Renamed option
        dropdownFilter: false,  // -> Renamed option, true will take group options string will filter on object key
        dynamicFilter: null,    // -> New feature, filter the typeahead results based on dynamic value, Ex: Players based on TeamID
        backdrop: false,
        backdropOnFocus: false, // -> New feature, display the backdrop option as the Typeahead input is :focused
        cache: false,           // -> Improved option, true OR 'localStorage' OR 'sessionStorage'
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
        groupTemplate: null,    // -> New feature, set a custom template for the groups
        correlativeTemplate: false, // -> New feature, compile display keys, enables multiple key search from the template string
        emptyTemplate: false,   // -> New feature, display an empty template if no result
        cancelButton: true,     // -> New feature, if text is detected in the input, a cancel button will be available to reset the input (pressing ESC also cancels)
        loadingAnimation: true, // -> New feature, will display a loading animation when typeahead is doing request / searching for results
        filter: true,           // -> New feature, set to false or function to bypass Typeahead filtering. WARNING: accent, correlativeTemplate, offset & matcher will not be interpreted
        matcher: null,          // -> New feature, add an extra filtering function after the typeahead functions
        source: null,
        callback: {
            onInit: null,
            onReady: null,              // -> New callback, when the Typeahead initial preparation is completed
            onShowLayout: null,         // -> New callback, called when the layout is shown
            onHideLayout: null,         // -> New callback, called when the layout is hidden
            onSearch: null,             // -> New callback, when data is being fetched & analyzed to give search results
            onResult: null,
            onLayoutBuiltBefore: null,  // -> New callback, when the result HTML is build, modify it before it get showed
            onLayoutBuiltAfter: null,   // -> New callback, modify the dom right after the results gets inserted in the result container
            onNavigateBefore: null,     // -> New callback, when a key is pressed to navigate the results
            onNavigateAfter: null,      // -> New callback, when a key is pressed to navigate the results
            onMouseEnter: null,
            onMouseLeave: null,
            onClickBefore: null,        // -> Improved feature, possibility to e.preventDefault() to prevent the Typeahead behaviors
            onClickAfter: null,         // -> New feature, happens after the default clicked behaviors has been executed
            onSendRequest: null,        // -> New callback, gets called when the Ajax request(s) are sent
            onReceiveRequest: null,     // -> New callback, gets called when the Ajax request(s) are all received
            onPopulateSource: null,     // -> New callback, Perform operation on the source data before it gets in Typeahead data
            onCacheSave: null,          // -> New callback, Perform operation on the source data before it gets in Typeahead cache
            onSubmit: null
        },
        selector: {
            container: "typeahead__container",
            result: "typeahead__result",
            list: "typeahead__list",
            group: "typeahead__group",
            item: "typeahead__item",
            empty: "typeahead__empty",
            display: "typeahead__display",
            query: "typeahead__query",
            filter: "typeahead__filter",
            filterButton: "typeahead__filter-button",
            dropdown: "typeahead__dropdown",
            dropdownItem: "typeahead__dropdown-item",
            button: "typeahead__button",
            backdrop: "typeahead__backdrop",
            hint: "typeahead__hint",
            cancelButton: "typeahead__cancel-button"
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
    var _isIE9 = ~window.navigator.appVersion.indexOf("MSIE 9.");

    // SOURCE GROUP RESERVED WORDS: ajax, data, url
    // SOURCE ITEMS RESERVED KEYS: group, display, data, matchedKey, compiled, href

    /**
     * @constructor
     * Typeahead Class
     *
     * @param {object} node jQuery input object
     * @param {object} options User defined options
     */
    var Typeahead = function (node, options) {

        this.rawQuery = node.val() || '';   // Unmodified input query
        this.query = node.val() || '';      // Input query
        this.namespace = '.' + node.selector + _namespace; // Every Typeahead instance gets its own namespace for events
        this.tmpSource = {};                // Temp var to preserve the source order for the searchResult function
        this.source = {};                   // The generated source kept in memory
        this.isGenerated = null;            // Generated results -> null: not generated, false: generating, true generated
        this.generatedGroupCount = 0;       // Number of groups generated, if limit reached the search can be done
        this.groupCount = 0;                // Number of groups, this value gets counted on the initial source unification
        this.groupBy = "group";             // This option will change according to filtering or custom grouping
        this.groups = [];                   // Array of all the available groups, used to build the groupTemplate
        this.result = {};                   // Results based on Source-query match (only contains the displayed elements)
        this.groupTemplate = '';            // Result template at the {{group}} level
        this.resultHtml = null;             // HTML Results (displayed elements)
        this.resultCount = 0;               // Total results based on Source-query match
        this.resultCountPerGroup = {};      // Total results based on Source-query match per group
        this.options = options;             // Typeahead options (Merged default & user defined)
        this.node = node;                   // jQuery object of the Typeahead <input>
        this.container = null;              // Typeahead container, usually right after <form>
        this.resultContainer = null;        // Typeahead result container (html)
        this.item = null;                   // The selected item
        this.xhr = {};                      // Ajax request(s) stack
        this.hintIndex = null;              // Numeric value of the hint index in the result list
        this.filters = {                    // Filter list for searching, dropdown and dynamic(s)
            dropdown: {},                   // Dropdown menu if options.dropdownFilter is set
            dynamic: {}                     // Checkbox / Radio / Select to filter the source data
        };
        this.dropdownFilter = {
            static: [],                 // Objects that has a value
            dynamic: []
        };
        this.dropdownFilterAll = null;  // The last "all" definition

        this.requests = {};             // Store the group:request instead of generating them every time

        this.backdrop = {};             // The backdrop object
        this.hint = {};                 // The hint object
        this.hasDragged = false;        // Will cancel mouseend events if true
        this.focusOnly = false;         // Focus the input preventing any operations

        this.__construct();

    };

    Typeahead.prototype = {

        extendOptions: function () {

            // If the Typeahead is dynamic, force no cache & no compression
            if (this.options.dynamic) {
                this.options.cache = false;
                this.options.compression = false;
            }

            if (this.options.cache) {
                this.options.cache = (function (cache) {

                    var supportedCache = ['localStorage', 'sessionStorage'],
                        supported;

                    if (cache === true) {
                        cache = 'localStorage';
                    } else if (typeof cache === "string" && !~supportedCache.indexOf(cache)) {
                        // {debug}
                        if (this.options.debug) {
                            _debug.log({
                                'node': this.node.selector,
                                'function': 'extendOptions()',
                                'message': 'Invalid options.cache, possible options are "localStorage" or "sessionStorage"'
                            });

                            _debug.print();
                        }
                        // {/debug}
                        return false;
                    }

                    supported = typeof window[cache] !== "undefined"

                    try {
                        window[cache].setItem("typeahead", "typeahead");
                        window[cache].removeItem("typeahead");
                    } catch (e) {
                        supported = false;
                    }

                    return supported && cache || false;
                }).call(this, this.options.cache);
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

            if (this.options.display && !Array.isArray(this.options.display)) {
                this.options.display = [this.options.display];
            }

            if (this.options.group) {
                if (!Array.isArray(this.options.group)) {
                    if (typeof this.options.group === "string") {
                        this.options.group = {
                            key: this.options.group
                        }
                    } else if (typeof this.options.group === "boolean") {
                        this.options.group = {
                            key: 'group'
                        }
                    }

                    this.options.group.key = this.options.group.key || "group";
                }
                // {debug}
                else {
                    if (this.options.debug) {
                        _debug.log({
                            'node': this.node.selector,
                            'function': 'extendOptions()',
                            'message': 'options.group must be a boolean|string|object as of 2.5.0'
                        });

                        _debug.print();
                    }
                }
                // {/debug}
            }

            if (this.options.highlight && !~["any", true].indexOf(this.options.highlight)) {
                this.options.highlight = false;
            }

            if (this.options.dropdownFilter && this.options.dropdownFilter instanceof Object) {
                if (!Array.isArray(this.options.dropdownFilter)) {
                    this.options.dropdownFilter = [this.options.dropdownFilter];
                }
                for (var i = 0, ii = this.options.dropdownFilter.length; i < ii; ++i) {
                    this.dropdownFilter[this.options.dropdownFilter[i].value ? 'static' : 'dynamic'].push(this.options.dropdownFilter[i]);
                }
            }

            if (this.options.dynamicFilter && !Array.isArray(this.options.dynamicFilter)) {
                this.options.dynamicFilter = [this.options.dynamicFilter]
            }

            if (this.options.accent) {
                if (typeof this.options.accent === "object") {
                    if (this.options.accent.from && this.options.accent.to && this.options.accent.from.length === this.options.accent.to.length) {

                    }
                    // {debug}
                    else {
                        if (this.options.debug) {
                            _debug.log({
                                'node': this.node.selector,
                                'function': 'extendOptions()',
                                'message': 'Invalid "options.accent", from and to must be defined and same length.'
                            });

                            _debug.print();
                        }
                    }
                    // {/debug}
                } else {
                    this.options.accent = _accent;
                }
            }

            if (this.options.groupTemplate) {
                this.groupTemplate = this.options.groupTemplate;
            }

            if (this.options.resultContainer) {
                if (typeof this.options.resultContainer === "string") {
                    this.options.resultContainer = $(this.options.resultContainer);
                }

                if (!(this.options.resultContainer instanceof $) || !this.options.resultContainer[0]) {
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

            if (this.options.maxItemPerGroup && this.options.group && this.options.group.key) {
                this.groupBy = this.options.group.key;
            }

            // Compatibility onClick callback
            if (this.options.callback && this.options.callback.onClick) {
                this.options.callback.onClickBefore = this.options.callback.onClick;
                delete this.options.callback.onClick;
            }

            // Compatibility onNavigate callback
            if (this.options.callback && this.options.callback.onNavigate) {
                this.options.callback.onNavigateBefore = this.options.callback.onNavigate;
                delete this.options.callback.onNavigate;
            }

            this.options = $.extend(
                true,
                {},
                _options,
                this.options
            );

        },

        unifySourceFormat: function () {

            this.groupCount = 0;

            // source: ['item1', 'item2', 'item3']
            if (Array.isArray(this.options.source)) {
                this.options.source = {
                    group: {
                        data: this.options.source
                    }
                };

                this.groupCount = 1;
                return true;
            }

            // source: "http://www.test.com/url.json"
            if (typeof this.options.source === "string") {
                this.options.source = {
                    group: {
                        ajax: {
                            url: this.options.source
                        }
                    }
                };
            }

            if (this.options.source.ajax) {
                this.options.source = {
                    group: {
                        ajax: this.options.source.ajax
                    }
                };
            }


            // source: {data: ['item1', 'item2'], url: "http://www.test.com/url.json"}
            if (this.options.source.url || this.options.source.data) {
                this.options.source = {
                    group: this.options.source
                };
            }

            var group,
                groupSource,
                tmpAjax;

            for (group in this.options.source) {
                if (!this.options.source.hasOwnProperty(group)) continue;

                groupSource = this.options.source[group];

                // source: {group: "http://www.test.com/url.json"}
                if (typeof groupSource === "string") {
                    groupSource = {
                        ajax: {
                            url: groupSource
                        }
                    };
                }

                // source: {group: {url: ["http://www.test.com/url.json", "json.path"]}}
                tmpAjax = groupSource.url || groupSource.ajax;
                if (Array.isArray(tmpAjax)) {
                    groupSource.ajax = typeof tmpAjax[0] === "string" ? {
                        url: tmpAjax[0]
                    } : tmpAjax[0];
                    groupSource.ajax.path = groupSource.ajax.path || tmpAjax[1] || null;
                    delete groupSource.url;
                } else {
                    // source: {group: {url: {url: "http://www.test.com/url.json", method: "GET"}}}
                    // source: {group: {url: "http://www.test.com/url.json", dataType: "jsonp"}}
                    if (typeof groupSource.url === "object") {
                        groupSource.ajax = groupSource.url;
                    } else if (typeof groupSource.url === "string") {
                        groupSource.ajax = {
                            url: groupSource.url
                        };
                    }
                    delete groupSource.url;
                }

                if (!groupSource.data && !groupSource.ajax) {

                    // {debug}
                    if (this.options.debug) {
                        _debug.log({
                            'node': this.node.selector,
                            'function': 'unifySourceFormat()',
                            'arguments': JSON.stringify(this.options.source),
                            'message': 'Undefined "options.source.' + group + '.[data|ajax]" is Missing - Typeahead dropped'
                        });

                        _debug.print();
                    }
                    // {/debug}

                    return false;
                }

                if (groupSource.display && !Array.isArray(groupSource.display)) {
                    groupSource.display = [groupSource.display];
                }

                this.options.source[group] = groupSource;

                this.groupCount++;

            }

            return true;
        },

        init: function () {

            this.helper.executeCallback.call(this, this.options.callback.onInit, [this.node]);

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
                    'focus' + this.namespace,
                    'input' + this.namespace,
                    'propertychange' + this.namespace,  // IE8 Fix
                    'keydown' + this.namespace,
                    'keyup' + this.namespace,           // IE9 Fix
                    'dynamic' + this.namespace,
                    'generate' + this.namespace
                ];

            //#149 - Adding support for Mobiles
            $('html').on("touchmove", function () {
                scope.hasDragged = true;
            }).on("touchstart", function () {
                scope.hasDragged = false;
            });

            this.node.closest('form').on("submit", function (e) {
                if (scope.options.mustSelectItem && scope.helper.isEmpty(scope.item)) {
                    e.preventDefault();
                    return;
                }

                if (!scope.options.backdropOnFocus) {
                    scope.hideLayout();
                }

                if (scope.options.callback.onSubmit) {
                    return scope.helper.executeCallback.call(scope, scope.options.callback.onSubmit, [scope.node, this, scope.item, e]);
                }
            });

            // IE8 fix
            var preventNextEvent = false;

            this.node.off(this.namespace).on(events.join(' '), function (e) {

                switch (e.type) {
                    case "generate":
                        scope.isGenerated = null;
                        scope.generateSource();
                        break;
                    case "focus":
                        if (scope.focusOnly) {
                            scope.focusOnly = false;
                            break;
                        }
                        if (scope.options.backdropOnFocus) {
                            scope.buildBackdropLayout();
                            scope.showLayout();
                        }
                        if (scope.options.searchOnFocus && scope.query.length >= scope.options.minLength) {
                            if (scope.isGenerated) {
                                scope.showLayout();
                            } else if (scope.isGenerated === null) {
                                scope.generateSource();
                            }
                        }
                    case "keydown":
                        if (e.keyCode && ~[9, 13, 27, 38, 39, 40].indexOf(e.keyCode)) {
                            preventNextEvent = true;
                            scope.navigate(e);
                        }
                        break;
                    case "keyup":
                        if (scope.isGenerated === null && !scope.options.dynamic) {
                            scope.generateSource();
                        }
                        if (_isIE9 && scope.node[0].value.replace(/^\s+/, '').toString().length < scope.query.length) {
                            scope.node.trigger('input' + scope.namespace);
                        }
                        break;
                    case "propertychange":
                        if (preventNextEvent) {
                            preventNextEvent = false;
                            break;
                        }
                    case "input":

                        scope.rawQuery = scope.node[0].value.toString();
                        scope.query = scope.rawQuery.replace(/^\s+/, '');

                        scope.options.cancelButton && scope.toggleCancelButton();

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

                        scope.searchResult();
                        scope.buildLayout();

                        if ((scope.result.length > 0 || scope.options.emptyTemplate) &&
                            scope.query.length >= scope.options.minLength
                        ) {
                            scope.showLayout();
                        } else {
                            scope.hideLayout();
                        }

                        break;
                }

            });

            if (this.options.generateOnLoad) {
                this.node.trigger('generate' + this.namespace);
            }

        },

        generateSource: function () {

            if (this.isGenerated && !this.options.dynamic) {
                return;
            }

            this.generatedGroupCount = 0;
            this.isGenerated = false;
            this.options.loadingAnimation && this.container.addClass('loading');

            if (!this.helper.isEmpty(this.xhr)) {
                for (var i in this.xhr) {
                    if (!this.xhr.hasOwnProperty(i)) continue;
                    this.xhr[i].abort();
                }
                this.xhr = {};
            }

            var group,
                groupSource,
                dataInStorage,
                isValidStorage;

            for (group in this.options.source) {
                if (!this.options.source.hasOwnProperty(group)) continue;

                groupSource = this.options.source[group];

                // Get group source from Localstorage
                if (this.options.cache) {

                    dataInStorage = window[this.options.cache].getItem('TYPEAHEAD_' + this.node.selector + ":" + group);

                    if (dataInStorage) {
                        if (this.options.compression) {
                            dataInStorage = LZString.decompressFromUTF16(dataInStorage);
                        }

                        // In case the storage key:value are not readable anymore
                        isValidStorage = false;
                        try {
                            dataInStorage = JSON.parse(dataInStorage + "");

                            if (dataInStorage.data && dataInStorage.ttl > new Date().getTime()) {

                                this.populateSource(dataInStorage.data, group);
                                isValidStorage = true;

                                // {debug}
                                if (this.options.debug) {
                                    _debug.log({
                                        'node': this.node.selector,
                                        'function': 'generateSource()',
                                        'message': 'Source for group "' + group + '" found in ' + this.options.cache
                                    });
                                    _debug.print();
                                }
                                // {/debug}

                            } else {
                                window[this.options.cache].removeItem('TYPEAHEAD_' + this.node.selector + ":" + group);
                            }
                        } catch (error) {
                        }

                        if (isValidStorage) continue;
                    }
                }

                // Get group source from data
                if (groupSource.data && !groupSource.ajax) {
                    this.populateSource(
                        $.extend(true, [], groupSource.data),
                        group
                    );
                    continue;
                }

                // Get group source from Ajax / JsonP
                if (groupSource.ajax) {
                    if (!this.requests[group]) {
                        this.requests[group] = this.generateRequestObject(group);
                    }
                }
            }

            this.handleRequests();

        },

        generateRequestObject: function (group) {

            var scope = this,
                groupSource = this.options.source[group];

            var xhrObject = {
                request: {
                    url: groupSource.ajax.url || null,
                    dataType: 'json',
                    beforeSend: function (jqXHR, options) {
                        // Important to call .abort() in case of dynamic requests
                        scope.xhr[group] = jqXHR;

                        var beforeSend = scope.requests[group].callback.beforeSend || groupSource.ajax.beforeSend;
                        typeof beforeSend === "function" && beforeSend.apply(null, arguments);
                    }
                },
                callback: {
                    beforeSend: null,
                    done: null,
                    fail: null,
                    then: null,
                    always: null
                },
                extra: {
                    path: groupSource.ajax.path || null,
                    group: group
                },
                validForGroup: [group]
            };

            if (typeof groupSource.ajax !== "function") {
                if (groupSource.ajax instanceof Object) {
                    xhrObject = this.extendXhrObject(xhrObject, groupSource.ajax);
                }

                if (Object.keys(this.options.source).length > 1) {
                    for (var _group in this.requests) {
                        if (!this.requests.hasOwnProperty(_group)) continue;
                        if (this.requests[_group].isDuplicated) continue;

                        if (xhrObject.request.url && xhrObject.request.url === this.requests[_group].request.url) {
                            this.requests[_group].validForGroup.push(group);
                            xhrObject.isDuplicated = true;
                            delete xhrObject.validForGroup;
                        }
                    }
                }
            }

            return xhrObject;

        },

        extendXhrObject: function (xhrObject, groupRequest) {

            if (typeof groupRequest.callback === "object") {
                xhrObject.callback = groupRequest.callback;
                delete groupRequest.callback;
            }

            // #132 Fixed beforeSend when using a function as the request object
            if (typeof groupRequest.beforeSend === "function") {
                xhrObject.callback.beforeSend = groupRequest.beforeSend;
                delete groupRequest.beforeSend;
            }

            // Fixes #105 Allow user to define their beforeSend function.
            // Fixes #181 IE8 incompatibility
            xhrObject.request = $.extend(true, xhrObject.request, groupRequest/*, {beforeSend: xhrObject.request.beforeSend}*/);

            // JSONP needs a unique jsonpCallback to run concurrently
            if (xhrObject.request.dataType.toLowerCase() === 'jsonp' && !xhrObject.request.jsonpCallback) {
                xhrObject.request.jsonpCallback = 'callback_' + xhrObject.extra.group;
            }

            return xhrObject;

        },

        handleRequests: function () {

            var scope = this,
                requestsCount = Object.keys(this.requests).length;

            if (this.helper.executeCallback.call(this, this.options.callback.onSendRequest, [this.node, this.query]) === false) {
                this.isGenerated = null;
                return;
            }


            for (var group in this.requests) {
                if (!this.requests.hasOwnProperty(group)) continue;
                if (this.requests[group].isDuplicated) continue;

                (function (group, xhrObject) {

                    if (typeof scope.options.source[group].ajax === "function") {

                        var _groupRequest = scope.options.source[group].ajax.call(scope, scope.query);
                        xhrObject = scope.extendXhrObject(xhrObject, _groupRequest);

                        if (typeof xhrObject.request !== "object" || !xhrObject.request.url) {
                            // {debug}
                            if (scope.options.debug) {
                                _debug.log({
                                    'node': scope.node.selector,
                                    'function': 'handleRequests',
                                    'message': 'Source function must return an object containing ".url" key for group "' + group + '"'
                                });
                                _debug.print();
                            }
                            // {/debug}
                            return;
                        }
                    }

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

                    $.ajax(xhrObject.request).done(function (data, textStatus, jqXHR) {

                        var tmpData;
                        for (var i = 0, ii = xhrObject.validForGroup.length; i < ii; i++) {

                            _request = scope.requests[xhrObject.validForGroup[i]];

                            if (_request.callback.done instanceof Function) {

                                tmpData = _request.callback.done(data, textStatus, jqXHR);
                                data = Array.isArray(tmpData) && tmpData || data;

                                // {debug}
                                if (!Array.isArray(tmpData)) {
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

                            scope.populateSource(data, _request.extra.group, _request.extra.path || _request.request.path);

                            requestsCount -= 1;
                            if (requestsCount === 0) {
                                scope.helper.executeCallback.call(scope, scope.options.callback.onReceiveRequest, [scope.node, scope.query]);
                            }

                        }

                    }).fail(function (jqXHR, textStatus, errorThrown) {

                        for (var i = 0, ii = xhrObject.validForGroup.length; i < ii; i++) {
                            _request = scope.requests[xhrObject.validForGroup[i]];
                            _request.callback.fail instanceof Function && _request.callback.fail(jqXHR, textStatus, errorThrown);
                        }

                        // {debug}
                        if (scope.options.debug) {
                            _debug.log({
                                'node': scope.node.selector,
                                'function': 'Ajax.callback.fail()',
                                'arguments': JSON.stringify(xhrObject.request),
                                'message': textStatus
                            });

                            console.log(errorThrown);

                            _debug.print();
                        }
                        // {/debug}

                    }).always(function (data, textStatus, jqXHR) {

                        for (var i = 0, ii = xhrObject.validForGroup.length; i < ii; i++) {
                            _request = scope.requests[xhrObject.validForGroup[i]];
                            _request.callback.always instanceof Function && _request.callback.always(data, textStatus, jqXHR);
                        }

                    }).then(function (jqXHR, textStatus) {

                        for (var i = 0, ii = xhrObject.validForGroup.length; i < ii; i++) {
                            _request = scope.requests[xhrObject.validForGroup[i]];
                            _request.callback.then instanceof Function && _request.callback.then(jqXHR, textStatus);
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
                groupSource = this.options.source[group],
                extraData = groupSource.ajax && groupSource.data;

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

            if (!Array.isArray(data)) {
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

                if (Array.isArray(extraData)) {
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
                display = groupSource.display ?
                    (groupSource.display[0] === 'compiled' ? groupSource.display[1] : groupSource.display[0]) :
                    (this.options.display[0] === 'compiled' ? this.options.display[1] : this.options.display[0]);

            for (var i = 0, ii = data.length; i < ii; i++) {
                if (typeof data[i] === "string") {
                    tmpObj = {};
                    tmpObj[display] = data[i];
                    data[i] = tmpObj;
                }
                data[i].group = group;
            }

            if (!this.options.dynamic && this.dropdownFilter.dynamic.length) {

                var key,
                    value,
                    tmpValues = {};

                for (var i = 0, ii = data.length; i < ii; i++) {
                    for (var k = 0, kk = this.dropdownFilter.dynamic.length; k < kk; k++) {
                        key = this.dropdownFilter.dynamic[k].key;

                        value = data[i][key];
                        if (!value) continue;
                        if (!this.dropdownFilter.dynamic[k].value) {
                            this.dropdownFilter.dynamic[k].value = [];
                        }
                        if (!tmpValues[key]) {
                            tmpValues[key] = [];
                        }
                        if (!~tmpValues[key].indexOf(value.toLowerCase())) {
                            tmpValues[key].push(value.toLowerCase());
                            this.dropdownFilter.dynamic[k].value.push(value);
                        }
                    }
                }
            }

            if (this.options.correlativeTemplate) {

                var template = groupSource.template || this.options.template,
                    compiledTemplate = "";

                if (typeof template === "function") {
                    template = template();
                }

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

                    // #109 correlativeTemplate can be an array of display keys instead of the complete template
                    if (Array.isArray(this.options.correlativeTemplate)) {
                        for (var i = 0, ii = this.options.correlativeTemplate.length; i < ii; i++) {
                            compiledTemplate += "{{" + this.options.correlativeTemplate[i] + "}} "
                        }
                    } else {
                        compiledTemplate = template
                            .replace(/<.+?>/g, '');
                    }

                    for (var i = 0, ii = data.length; i < ii; i++) {
                        data[i]['compiled'] = compiledTemplate.replace(/\{\{([\w\-\.]+)(?:\|(\w+))?}}/g, function (match, index) {
                                return scope.helper.namespace(index, data[i], 'get', '');
                            }
                        ).trim();
                    }

                    if (groupSource.display) {
                        if (!~groupSource.display.indexOf('compiled')) {
                            groupSource.display.unshift('compiled');
                        }
                    } else if (!~this.options.display.indexOf('compiled')) {
                        this.options.display.unshift('compiled');
                    }

                }
            }

            if (this.options.callback.onPopulateSource) {
                data = this.helper.executeCallback.call(this, this.options.callback.onPopulateSource, [this.node, data, group, path]);

                // {debug}
                if (!data || !Array.isArray(data)) {
                    _debug.log({
                        'node': this.node.selector,
                        'function': 'callback.populateSource()',
                        'message': 'callback.onPopulateSource must return the "data" parameter'
                    });

                    _debug.print();
                }
                // {/debug}
            }

            // Save the data inside a tmpSource var to later have the right order once every request are completed
            this.tmpSource[group] = data;

            if (this.options.cache && !window[this.options.cache].getItem('TYPEAHEAD_' + this.node.selector + ":" + group)) {

                if (this.options.callback.onCacheSave) {
                    data = this.helper.executeCallback.call(this, this.options.callback.onCacheSave, [this.node, data, group, path]);

                    // {debug}
                    if (!data || !Array.isArray(data)) {
                        _debug.log({
                            'node': this.node.selector,
                            'function': 'callback.populateSource()',
                            'message': 'callback.onCacheSave must return the "data" parameter'
                        });

                        _debug.print();
                    }
                    // {/debug}
                }

                var storage = JSON.stringify({
                    data: data,
                    ttl: new Date().getTime() + this.options.ttl
                });

                if (this.options.compression) {
                    storage = LZString.compressToUTF16(storage);
                }

                window[this.options.cache].setItem(
                    'TYPEAHEAD_' + this.node.selector + ":" + group,
                    storage
                );
            }

            this.incrementGeneratedGroup();

        },

        incrementGeneratedGroup: function () {

            this.generatedGroupCount++;

            if (this.groupCount !== this.generatedGroupCount) {
                return;
            }

            this.isGenerated = true;

            this.xhr = {};

            var sourceKeys = Object.keys(this.options.source);

            for (var i = 0, ii = sourceKeys.length; i < ii; i++) {
                this.source[sourceKeys[i]] = this.tmpSource[sourceKeys[i]];
            }

            this.tmpSource = {};

            if (!this.options.dynamic) {
                this.buildDropdownItemLayout('dynamic');
            }

            this.options.loadingAnimation && this.container.removeClass('loading');

            this.node.trigger('dynamic' + this.namespace);

        },

        /**
         * Key Navigation
         * tab 9: @TODO, what should tab do?
         * Up 38: select previous item, skip "group" item
         * Down 40: select next item, skip "group" item
         * Right 39: change charAt, if last char fill hint (if options is true)
         * Esc 27: clears input (is not empty) / blur (if empty)
         * Enter 13: Select item + submit search
         *
         * @param {Object} e Event object
         * @returns {*}
         */
        navigate: function (e) {

            this.helper.executeCallback.call(this, this.options.callback.onNavigateBefore, [this.node, this.query, e]);

            if (e.keyCode === 27) {
                // #166 Different browsers do not have the same behaviors by default, lets enforce what we want instead
                e.preventDefault();
                if (this.query.length) {
                    this.node.val('')
                    this.node.trigger('input' + this.namespace);
                } else {
                    this.node.blur();
                    this.hideLayout();
                }
                return;
            }

            if (!this.isGenerated || !this.result.length) return;

            var itemList = this.resultContainer.find('.' + this.options.selector.item),
                activeItem = itemList.filter('.active'),
                activeItemIndex = activeItem[0] && itemList.index(activeItem) || null,
                newActiveItemIndex = null;

            if (e.keyCode === 13) {
                if (activeItem.length > 0) {
                    // Prevent form submit if an element is selected
                    e.preventDefault();
                    activeItem.find('a:first')[0].click();
                }
                return;
            }

            if (e.keyCode === 39) {
                if (activeItemIndex) {
                    itemList.eq(activeItemIndex).find('a:first')[0].click();
                } else if (this.options.hint &&
                    this.hint.container.val() !== "" &&
                    this.helper.getCaret(this.node[0]) >= this.query.length) {

                    itemList.find('a[data-index="' + this.hintIndex + '"]')[0].click();

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
                        newActiveItemIndex = activeItemIndex - 1;
                        itemList.eq(newActiveItemIndex).addClass('active');
                    }
                } else {
                    newActiveItemIndex = itemList.length - 1;
                    itemList.last().addClass('active');
                }

            } else if (e.keyCode === 40) {

                e.preventDefault();

                if (activeItem.length > 0) {
                    if (activeItemIndex + 1 < itemList.length) {
                        newActiveItemIndex = activeItemIndex + 1;
                        itemList.eq(newActiveItemIndex).addClass('active');
                    }
                } else {
                    newActiveItemIndex = 0;
                    itemList.first().addClass('active');
                }
            }

            // #115 Prevent the input from changing when navigating (arrow up / down) the results
            if (e.preventInputChange && ~[38, 40].indexOf(e.keyCode)) {
                this.buildHintLayout(
                    newActiveItemIndex !== null && newActiveItemIndex < this.result.length ?
                        [this.result[newActiveItemIndex]] :
                        null
                )
            }

            if (this.options.hint && this.hint.container) {
                this.hint.container.css(
                    'color',
                    e.preventInputChange ?
                        this.hint.css.color :
                    newActiveItemIndex === null && this.hint.css.color || this.hint.container.css('background-color') || 'fff'
                )
            }

            this.node.val(
                newActiveItemIndex !== null && !e.preventInputChange ?
                    this.result[newActiveItemIndex][this.result[newActiveItemIndex].matchedKey] :
                    this.rawQuery
            );

            this.helper.executeCallback.call(this, this.options.callback.onNavigateAfter, [
                this.node,
                itemList,
                newActiveItemIndex !== null && itemList.eq(newActiveItemIndex).find('a:first') || undefined,
                newActiveItemIndex !== null && this.result[newActiveItemIndex] || undefined,
                this.query,
                e
            ]);

        },

        searchResult: function (preserveItem) {

            // #54 In case the item is being clicked, we want to preserve it for onSubmit callback
            if (!preserveItem) {
                this.item = {};
            }

            this.resetLayout();

            if (this.helper.executeCallback.call(this, this.options.callback.onSearch, [this.node, this.query]) === false) return;

            if (this.query.length >= this.options.minLength) {
                this.searchResultData();
            }

            this.helper.executeCallback.call(this, this.options.callback.onResult, [this.node, this.query, this.result, this.resultCount, this.resultCountPerGroup]);

        },

        searchResultData: function () {

            var scope = this,
                group,
                groupBy = this.groupBy,
                groupReference = null,
                item,
                match,
                comparedDisplay,
                comparedQuery = this.query.toLowerCase(),
                maxItemPerGroup = this.options.maxItemPerGroup,
                hasDynamicFilters = this.filters.dynamic && !this.helper.isEmpty(this.filters.dynamic),
                displayKeys,
                displayValue,
                missingDisplayKey = {},
                groupFilter,
                groupFilterResult,
                groupMatcher,
                groupMatcherResult,
                matcher = typeof this.options.matcher === "function" && this.options.matcher,
                correlativeMatch,
                correlativeQuery,
                correlativeDisplay;

            if (this.options.accent) {
                comparedQuery = this.helper.removeAccent.call(this, comparedQuery);
            }

            for (group in this.source) {

                if (!this.source.hasOwnProperty(group)) continue;
                // dropdownFilter by source groups
                if (this.filters.dropdown && this.filters.dropdown.key === "group" && this.filters.dropdown.value !== group) continue;

                groupFilter = typeof this.options.source[group].filter !== "undefined" ? this.options.source[group].filter : this.options.filter;
                groupMatcher = typeof this.options.source[group].matcher === "function" && this.options.source[group].matcher || matcher;

                for (var k = 0, kk = this.source[group].length; k < kk; k++) {
                    if (this.result.length >= this.options.maxItem && !this.options.callback.onResult) break;
                    if (hasDynamicFilters && !this.dynamicFilter.validate.apply(this, [this.source[group][k]])) continue;

                    item = this.source[group][k];

                    // dropdownFilter by custom groups
                    if (this.filters.dropdown && (item[this.filters.dropdown.key] || "").toLowerCase() !== (this.filters.dropdown.value || "").toLowerCase()) continue;

                    groupReference = groupBy === "group" ? group : item[groupBy];

                    if (groupReference && !this.result[groupReference]) {
                        this.result[groupReference] = [];
                        this.resultCountPerGroup[groupReference] = 0;
                    }

                    if (maxItemPerGroup) {
                        if (groupBy === "group" && this.result[groupReference].length >= maxItemPerGroup && !this.options.callback.onResult) {
                            break;
                        }
                    }

                    displayKeys = this.options.source[group].display || this.options.display;

                    for (var i = 0, ii = displayKeys.length; i < ii; i++) {

                        // #183 Allow searching for deep source object keys
                        displayValue = /\./.test(displayKeys[i]) ?
                            this.helper.namespace(displayKeys[i], item) :
                            item[displayKeys[i]];

                        // #182 Continue looping if empty or undefined key
                        if (typeof displayValue === 'undefined' || displayValue === '') {
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

                        displayValue = this.helper.cleanStringFromScript(displayValue);

                        if (typeof groupFilter === "function") {
                            groupFilterResult = groupFilter.call(this, item, displayValue);

                            // return undefined to skip to next item
                            // return false to attempt the matching function on the next displayKey
                            // return true to add the item to the result list
                            // return item object to modify the item and add it to the result list

                            if (groupFilterResult === undefined) break;
                            if (!groupFilterResult) continue;
                            if (typeof groupFilterResult === "object") {
                                item = groupFilterResult;
                            }
                        }

                        if (~[undefined, true].indexOf(groupFilter)) {
                            comparedDisplay = displayValue;
                            comparedDisplay = comparedDisplay.toString().toLowerCase();

                            if (this.options.accent) {
                                comparedDisplay = this.helper.removeAccent.call(this, comparedDisplay);
                            }

                            match = comparedDisplay.indexOf(comparedQuery);

                            if (this.options.correlativeTemplate && displayKeys[i] === 'compiled' && match < 0 && /\s/.test(comparedQuery)) {
                                correlativeMatch = true;
                                correlativeQuery = comparedQuery.split(' ');
                                correlativeDisplay = comparedDisplay;
                                for (var x = 0, xx = correlativeQuery.length; x < xx; x++) {
                                    if (correlativeQuery[x] === "") continue;
                                    if (!~correlativeDisplay.indexOf(correlativeQuery[x])) {
                                        correlativeMatch = false;
                                        break;
                                    }
                                    correlativeDisplay = correlativeDisplay.replace(correlativeQuery[x], '');
                                }
                            }

                            if (match < 0 && !correlativeMatch) continue;
                            // @TODO Deprecate these? use matcher instead?
                            if (this.options.offset && match !== 0) continue;

                            if (groupMatcher) {
                                groupMatcherResult = groupMatcher.call(this, item, displayValue);

                                // return undefined to skip to next item
                                // return false to attempt the matching function on the next displayKey
                                // return true to add the item to the result list
                                // return item object to modify the item and add it to the result list

                                if (groupMatcherResult === undefined) break;
                                if (!groupMatcherResult) continue;
                                if (typeof groupMatcherResult === "object") {
                                    item = groupMatcherResult;
                                }
                            }
                        }

                        this.resultCount++;
                        this.resultCountPerGroup[groupReference]++;

                        if (this.resultItemCount < this.options.maxItem) {
                            if (maxItemPerGroup && this.result[groupReference].length >= maxItemPerGroup) {
                                break;
                            }

                            item.matchedKey = displayKeys[i];

                            this.result[groupReference].push(item);
                            this.resultItemCount++;
                        }
                        break;
                    }

                    if (!this.options.callback.onResult) {
                        if (this.resultItemCount >= this.options.maxItem) {
                            break;
                        }
                        if (maxItemPerGroup && this.result[groupReference].length >= maxItemPerGroup) {
                            if (groupBy === "group") {
                                break;
                            }
                        }
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

                for (var group in this.result) {
                    if (!this.result.hasOwnProperty(group)) continue;
                    for (var i = 0, ii = this.result[group].length; i < ii; i++) {
                        displayKey = this.options.source[this.result[group][i].group].display || this.options.display;
                        if (!~displayKeys.indexOf(displayKey[0])) {
                            displayKeys.push(displayKey[0]);
                        }
                    }
                    this.result[group].sort(
                        scope.helper.sort(
                            displayKeys,
                            scope.options.order === "asc",
                            function (a) {
                                return a.toString().toUpperCase()
                            }
                        )
                    );
                }

            }

            var concatResults = [],
                groupOrder;

            if (typeof this.options.groupOrder === "function") {
                groupOrder = this.options.groupOrder.apply(this, [this.node, this.query, this.result, this.resultCount, this.resultCountPerGroup]);
            } else if (Array.isArray(this.options.groupOrder)) {
                groupOrder = this.options.groupOrder;
            } else if (typeof this.options.groupOrder === "string" && ~["asc", "desc"].indexOf(this.options.groupOrder)) {
                groupOrder = Object.keys(this.result).sort(
                    scope.helper.sort(
                        [],
                        scope.options.groupOrder === "asc",
                        function (a) {
                            return a.toString().toUpperCase()
                        }
                    )
                );
            } else {
                groupOrder = Object.keys(this.result);
            }

            this.groups = groupOrder;

            for (var i = 0, ii = groupOrder.length; i < ii; i++) {
                concatResults = concatResults.concat(this.result[groupOrder[i]] || []);
            }

            this.result = concatResults;

        },

        buildLayout: function () {

            this.buildHtmlLayout();

            this.buildBackdropLayout();

            this.buildHintLayout();

            if (this.options.callback.onLayoutBuiltBefore) {
                var tmpResultHtml = this.helper.executeCallback.call(this, this.options.callback.onLayoutBuiltBefore, [this.node, this.query, this.result, this.resultHtml]);

                if (tmpResultHtml instanceof $) {
                    this.resultHtml = tmpResultHtml;
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

            this.resultHtml && this.resultContainer.html(this.resultHtml);

            if (this.options.callback.onLayoutBuiltAfter) {
                this.helper.executeCallback.call(this, this.options.callback.onLayoutBuiltAfter, [this.node, this.query, this.result]);
            }
        },

        buildHtmlLayout: function () {
            // #150 Add the option to have no resultList but still perform the search and trigger the callbacks
            if (this.options.resultContainer === false) return;

            if (!this.resultContainer) {
                this.resultContainer = $("<div/>", {
                    "class": this.options.selector.result
                });

                this.container.append(this.resultContainer);
            }

            var emptyTemplate;
            if (!this.result.length) {
                if (this.options.emptyTemplate) {
                    emptyTemplate = typeof this.options.emptyTemplate === "function" ?
                        this.options.emptyTemplate.call(this, this.query) :
                        this.options.emptyTemplate.replace(/\{\{query}}/gi, this.helper.cleanStringFromScript(this.query));

                } else {
                    return;
                }
            }

            var _query = this.query.toLowerCase();
            if (this.options.accent) {
                _query = this.helper.removeAccent.call(this, _query);
            }

            var scope = this,
                groupTemplate = this.groupTemplate || '<ul></ul>',
                hasEmptyTemplate = false;

            if (this.groupTemplate) {
                groupTemplate = $(groupTemplate.replace(/<([^>]+)>\{\{(.+?)}}<\/[^>]+>/g, function (match, tag, group, offset, string) {
                    var template = '',
                        groups = group === "group" ? scope.groups : [group];

                    if (!scope.result.length) {
                        if (hasEmptyTemplate === true) return '';
                        hasEmptyTemplate = true;

                        return '<' + tag + ' class="' + scope.options.selector.empty + '"><a href="javascript:;">' + emptyTemplate + '</a></' + tag + '>';
                    }

                    for (var i = 0, ii = groups.length; i < ii; ++i) {
                        template += '<' + tag + ' data-group-template="' + groups[i] + '"><ul></ul></' + tag + '>';
                    }

                    return template;
                }));
            } else {
                groupTemplate = $(groupTemplate);
                if (!this.result.length) {
                    groupTemplate.append(
                        emptyTemplate instanceof $ ?
                            emptyTemplate :
                        '<li class="' + scope.options.selector.empty + '"><a href="javascript:;">' + emptyTemplate + '</a></li>'
                    );
                }
            }

            groupTemplate.addClass(this.options.selector.list + (this.helper.isEmpty(this.result) ? ' empty' : ''));

            var _group,
                _groupTemplate,
                _item,
                _href,
                _liHtml,
                _template,
                _aHtml,
                _display,
                _displayKeys,
                _displayValue,
                _unusedGroups = this.groupTemplate && this.result.length && scope.groups || [],
                _tmpIndexOf;

            for (var i = 0, ii = this.result.length; i < ii; ++i) {

                _item = this.result[i];
                _group = _item['group'];
                _href = this.options.source[_item.group].href || this.options.href;
                _display = [];
                _displayKeys = this.options.source[_item.group].display || this.options.display;

                if (this.options.group) {
                    _group = _item[this.options.group.key];
                    if (this.options.group.template) {
                        if (typeof this.options.group.template === "function") {
                            _groupTemplate = this.options.group.template(_item);
                        } else if (typeof this.options.template === "string") {
                            _groupTemplate = this.options.group.template.replace(/\{\{([\w\-\.]+)}}/gi, function (match, index) {
                                return scope.helper.namespace(index, _item, 'get', '');
                            });
                        }
                    }

                    if (!groupTemplate.find('[data-search-group="' + _group + '"]')[0]) {
                        (this.groupTemplate ? groupTemplate.find('[data-group-template="' + _group + '"] ul') : groupTemplate).append(
                            $("<li/>", {
                                "class": scope.options.selector.group,
                                "html": $("<a/>", {
                                    "href": "javascript:;",
                                    "html": _groupTemplate || _group,
                                    "tabindex": -1
                                }),
                                "data-search-group": _group
                            })
                        );
                    }
                }

                if (this.groupTemplate && _unusedGroups.length) {
                    _tmpIndexOf = _unusedGroups.indexOf(_group || _item.group)
                    if (~_tmpIndexOf) {
                        _unusedGroups.splice(_tmpIndexOf, 1)
                    }
                }

                _liHtml = $("<li/>", {
                    "class": scope.options.selector.item,
                    "html": $("<a/>", {
                        // #190 Strange JS-code fragment in href attribute using jQuery version below 1.10
                        "href": (function () {
                            if (_href) {
                                if (typeof _href === "string") {
                                    _href = _href.replace(/\{\{([^\|}]+)(?:\|([^}]+))*}}/gi, function (match, index, options) {

                                        var value = scope.helper.namespace(index, _item, 'get', '');

                                        // #151 Slugify should be an option, not enforced
                                        options = options && options.split("|") || [];
                                        if (~options.indexOf('slugify')) {
                                            value = scope.helper.slugify.call(scope, value);
                                        }

                                        return value;
                                    });
                                } else if (typeof _href === "function") {
                                    _href = _href(_item);
                                }
                                _item.href = _href;
                            }
                            return _href || "javascript:;";
                        }()),
                        "data-group": _group,
                        "data-index": i,
                        "html": function () {

                            _template = (_item.group && scope.options.source[_item.group].template) || scope.options.template;

                            if (_template) {
                                if (typeof _template === "function") {
                                    _template = _template.call(scope, scope.query, _item);
                                }

                                _aHtml = _template.replace(/\{\{([^\|}]+)(?:\|([^}]+))*}}/gi, function (match, index, options) {

                                    var value = scope.helper.cleanStringFromScript(String(scope.helper.namespace(index, _item, 'get', '')));

                                    // #151 Slugify should be an option, not enforced
                                    options = options && options.split("|") || [];
                                    if (~options.indexOf('slugify')) {
                                        value = scope.helper.slugify.call(scope, value);
                                    }

                                    if (!~options.indexOf('raw')) {
                                        if (scope.options.highlight === true && _query && ~_displayKeys.indexOf(index)) {
                                            value = scope.helper.highlight.call(scope, value, _query.split(" "), scope.options.accent)
                                        }
                                    }
                                    return value;
                                });
                            } else {
                                for (var i = 0, ii = _displayKeys.length; i < ii; i++) {
                                    _displayValue = /\./.test(_displayKeys[i]) ?
                                        scope.helper.namespace(_displayKeys[i], _item) :
                                        _item[_displayKeys[i]];

                                    if (typeof _displayValue === 'undefined' || _displayValue === '') continue;

                                    _display.push(_displayValue);
                                }

                                _aHtml = '<span class="' + scope.options.selector.display + '">' + scope.helper.cleanStringFromScript(String(_display.join(" "))) + '</span>';
                            }

                            if ((scope.options.highlight === true && _query && !_template) || scope.options.highlight === "any") {
                                _aHtml = scope.helper.highlight.call(scope, _aHtml, _query.split(" "), scope.options.accent)
                            }

                            $(this).append(_aHtml);

                        }
                    })
                });

                (function (i, item, liHtml) {
                    liHtml.on('click', function (e) {
                        if (scope.options.mustSelectItem && scope.helper.isEmpty(item)) {
                            e.preventDefault();
                            return;
                        }

                        scope.item = item;

                        if (scope.helper.executeCallback.call(scope, scope.options.callback.onClickBefore, [scope.node, $(this), item, e]) === false) return;
                        if ((e.originalEvent && e.originalEvent.defaultPrevented) || e.isDefaultPrevented()) {
                            return;
                        }

                        scope.query = scope.rawQuery = item[item.matchedKey].toString();

                        scope.focusOnly = true;
                        scope.node.val(scope.query).focus();

                        scope.searchResult(true);
                        scope.buildLayout();
                        scope.hideLayout();

                        scope.helper.executeCallback.call(scope, scope.options.callback.onClickAfter, [scope.node, $(this), item, e]);
                    });
                    liHtml.on('mouseenter', function (e) {
                        scope.helper.executeCallback.call(scope, scope.options.callback.onMouseEnter, [scope.node, $(this), item, e]);
                    });
                    liHtml.on('mouseleave', function (e) {
                        scope.helper.executeCallback.call(scope, scope.options.callback.onMouseLeave, [scope.node, $(this), item, e]);
                    });
                }(i, _item, _liHtml));

                (this.groupTemplate ? groupTemplate.find('[data-group-template="' + _group + '"] ul') : groupTemplate).append(_liHtml);
            }

            if (this.result.length && _unusedGroups.length) {
                for (var i = 0, ii = _unusedGroups.length; i < ii; ++i) {
                    groupTemplate.find('[data-group-template="' + _unusedGroups[i] + '"]').remove();
                }
            }

            this.resultHtml = groupTemplate;

        },

        buildBackdropLayout: function () {

            if (!this.options.backdrop) return;

            if (!this.backdrop.container) {
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
                    "css": this.backdrop.css
                }).insertAfter(this.container);

            }
            this.container
                .addClass('backdrop')
                .css({
                    "z-index": this.backdrop.css["z-index"] + 1,
                    "position": "relative"
                });

        },

        buildHintLayout: function (result) {
            if (!this.options.hint) return;
            // #144 hint doesn't overlap with the input when the query is too long
            if (this.node[0].scrollWidth > Math.ceil(this.node.innerWidth())) {
                this.hint.container && this.hint.container.val("");
                return;
            }

            var scope = this,
                hint = "",
                result = result || this.result,
                query = this.query.toLowerCase();

            if (this.options.accent) {
                query = this.helper.removeAccent.call(this, query);
            }

            this.hintIndex = null;

            if (this.query.length >= this.options.minLength) {

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
                        'aria-hidden': 'true',
                        'tabindex': -1,
                        'click': function () {
                            // IE8 Fix
                            scope.node.focus();
                        }
                    }).addClass(this.options.selector.hint)
                        .css(this.hint.css)
                        .insertAfter(this.node)

                    this.node.parent().css({
                        "position": "relative"
                    });
                }

                this.hint.container.css('color', this.hint.css.color)

                // Do not display hint for empty query
                if (query) {
                    var _displayKeys,
                        _group,
                        _comparedValue;

                    for (var i = 0, ii = result.length; i < ii; i++) {

                        _group = result[i].group;
                        _displayKeys = this.options.source[_group].display || this.options.display;

                        for (var k = 0, kk = _displayKeys.length; k < kk; k++) {

                            _comparedValue = String(result[i][_displayKeys[k]]).toLowerCase();
                            if (this.options.accent) {
                                _comparedValue = this.helper.removeAccent.call(this, _comparedValue);
                            }

                            if (_comparedValue.indexOf(query) === 0) {
                                hint = String(result[i][_displayKeys[k]]);
                                this.hintIndex = i;
                                break;
                            }
                        }
                        if (this.hintIndex !== null) {
                            break;
                        }
                    }
                }

                this.hint.container
                    .val(hint.length > 0 && this.rawQuery + hint.substring(this.query.length) || "");

            }

        },

        buildDropdownLayout: function () {

            if (!this.options.dropdownFilter) {
                return;
            }

            var scope = this;

            $('<span/>', {
                "class": this.options.selector.filter,
                "html": function () {

                    $(this).append(
                        $('<button/>', {
                            "type": "button",
                            "class": scope.options.selector.filterButton,
                            "style": "display: none;",
                            "click": function (e) {
                                e.stopPropagation();
                                scope.container.toggleClass('filter');

                                var _ns = scope.namespace + '-dropdown-filter';

                                $('html').off(_ns);

                                if (scope.container.hasClass('filter')) {
                                    $('html').on("click" + _ns + " touchend" + _ns, function (e) {
                                        if ($(e.target).closest('.' + scope.options.selector.filter)[0] || scope.hasDragged) return;
                                        scope.container.removeClass('filter');
                                    });
                                }
                            }
                        })
                    );

                    $(this).append(
                        $('<ul/>', {
                            "class": scope.options.selector.dropdown
                        })
                    );
                }
            }).insertAfter(scope.container.find('.' + scope.options.selector.query));

        },

        buildDropdownItemLayout: function (type) {

            var scope = this,
                template,
                all = typeof this.options.dropdownFilter === 'string' && this.options.dropdownFilter || 'All',
                ulScope = this.container.find('.' + this.options.selector.dropdown),
                filter;

            // Use regular groups defined in options.source
            if (type === 'static' && this.options.dropdownFilter === true || typeof this.options.dropdownFilter === 'string') {
                this.dropdownFilter.static.push({
                    key: 'group',
                    template: '{{group}}',
                    all: all,
                    value: Object.keys(this.options.source)
                });
            }

            for (var i = 0, ii = this.dropdownFilter[type].length; i < ii; i++) {

                filter = this.dropdownFilter[type][i];

                if (!Array.isArray(filter.value)) {
                    filter.value = [filter.value];
                }

                if (filter.all) {
                    this.dropdownFilterAll = filter.all;
                }

                for (var k = 0, kk = filter.value.length; k <= kk; k++) {

                    // Only add "all" at the last filter iteration
                    if (k === kk && (i !== ii - 1)) {
                        continue;
                    } else if (k === kk && (i === ii - 1)) {
                        if (type === 'static' && this.dropdownFilter['dynamic'].length) {
                            continue;
                        }
                    }

                    template = this.dropdownFilterAll || all;
                    if (filter.value[k]) {
                        if (filter.template) {
                            template = filter.template.replace(new RegExp('\{\{' + filter.key + '}}', 'gi'), filter.value[k])
                        } else {
                            template = filter.value[k]
                        }
                    } else {
                        this.container.find('.' + scope.options.selector.filterButton).html(template)
                    }

                    (function (k, filter, template) {

                        ulScope.append(
                            $("<li/>", {
                                "class": scope.options.selector.dropdownItem + ' ' + scope.helper.slugify.call(scope, filter.key + '-' + (filter.value[k] || all)),
                                "html": $("<a/>", {
                                    "href": "javascript:;",
                                    "html": template,
                                    "click": function (e) {
                                        e.preventDefault();
                                        _selectFilter.call(scope, {
                                            key: filter.key,
                                            value: filter.value[k] || '*',
                                            template: template
                                        });
                                    }
                                })
                            })
                        );

                    }(k, filter, template));
                }
            }

            if (this.dropdownFilter[type].length) {
                this.container.find('.' + scope.options.selector.filterButton).removeAttr('style');
            }

            /**
             * @private
             * Select the filter and rebuild the result group
             *
             * @param {object} item
             */
            function _selectFilter(item) {
                if (item.value === "*") {
                    delete this.filters.dropdown;
                } else {
                    this.filters.dropdown = item;
                }

                this.container
                    .removeClass('filter')
                    .find('.' + this.options.selector.filterButton)
                    .html(item.template);

                this.node.trigger('dynamic' + this.namespace);

                this.node.focus();
            }
        },

        dynamicFilter: {
            isEnabled: false,
            init: function () {

                if (!this.options.dynamicFilter) return;

                this.dynamicFilter.bind.call(this);
                this.dynamicFilter.isEnabled = true;

            },

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

                if (this.dynamicFilter.isEnabled) {
                    this.searchResult();
                    this.buildLayout();
                }

            },
            bind: function () {

                var scope = this,
                    filter;

                for (var i = 0, ii = this.options.dynamicFilter.length; i < ii; i++) {

                    filter = this.options.dynamicFilter[i];

                    if (typeof filter.selector === "string") {
                        filter.selector = $(filter.selector);
                    }

                    if (!(filter.selector instanceof $) || !filter.selector[0] || !filter.key) {
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
                        filter.selector.off(scope.namespace).on('change' + scope.namespace, function () {
                            scope.dynamicFilter.set.apply(scope, [filter.key, scope.dynamicFilter.getValue(this)]);
                        }).trigger('change' + scope.namespace);
                    }(filter));

                }
            },

            getValue: function (tag) {
                var value;
                if (tag.tagName === "SELECT") {
                    value = tag.value;
                } else if (tag.tagName === "INPUT") {
                    if (tag.type === "checkbox") {
                        value = tag.checked && tag.getAttribute('value') || tag.checked || null;
                    } else if (tag.type === "radio" && tag.checked) {
                        value = tag.value;
                    }
                }
                return value;
            }
        },

        showLayout: function () {

            // Means the container is already visible
            if (this.container.hasClass('result')) return;

            // Do not add display classes if there are no results
            if (!this.result.length && !this.options.emptyTemplate && !this.options.backdropOnFocus) {
                return;
            }

            var scope = this;

            $('html').off(this.namespace)
                .on("click" + this.namespace + " touchend" + this.namespace, function (e) {
                    if ($(e.target).closest(scope.container)[0] || scope.hasDragged) return;
                    scope.hideLayout();
                });

            this.container.addClass([
                this.result.length || (this.options.emptyTemplate && this.query.length >= this.options.minLength) ? 'result ' : '',
                this.options.hint && this.query.length >= this.options.minLength ? 'hint' : '',
                this.options.backdrop || this.options.backdropOnFocus ? 'backdrop' : ''].join(' ')
            );

            this.helper.executeCallback.call(this, this.options.callback.onShowLayout, [this.node, this.query]);

        },

        hideLayout: function () {

            // Means the container is already hidden
            if (!this.container.hasClass('result') && !this.container.hasClass('backdrop')) return;

            this.container.removeClass('result hint filter' + (this.options.backdropOnFocus && $(this.node).is(':focus') ? '' : ' backdrop'));

            if (this.options.backdropOnFocus && this.container.hasClass('backdrop')) return;

            // Make sure the event gets cleared in case of "ESC"
            $('html').off(this.namespace);

            this.helper.executeCallback.call(this, this.options.callback.onHideLayout, [this.node, this.query]);

        },

        resetLayout: function () {

            this.result = {};
            this.resultCount = 0;
            this.resultCountPerGroup = {};
            this.resultItemCount = 0;
            this.resultHtml = null;

            if (this.options.hint && this.hint.container) {
                this.hint.container.val('')
            }

        },

        buildCancelButtonLayout: function () {
            if (!this.options.cancelButton) return;
            var scope = this;

            $('<span/>', {
                "class": this.options.selector.cancelButton,
                "mousedown": function (e) {
                    // Don't blur the input
                    e.stopImmediatePropagation();
                    e.preventDefault();

                    scope.node.val('');
                    scope.node.trigger('input' + scope.namespace);
                }
            }).insertBefore(this.node);

        },

        toggleCancelButton: function () {
            this.container.toggleClass('cancel', !!this.query.length);
        },

        __construct: function () {
            this.extendOptions();

            if (!this.unifySourceFormat()) {
                return;
            }

            this.dynamicFilter.init.apply(this);

            this.init();
            this.delegateEvents();
            this.buildCancelButtonLayout();
            this.buildDropdownLayout();
            this.buildDropdownItemLayout('static');

            this.helper.executeCallback.call(this, this.options.callback.onReady, [this.node]);
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
                var accent = this.options.accent || _accent;

                string = string.toLowerCase().replace(new RegExp('[' + accent.from + ']', 'g'), function (match) {
                    return accent.to[accent.from.indexOf(match)];
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
                    string = this.helper.removeAccent.call(this, string);
                    string = string.replace(/[^-a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
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
                    for (var i = 0, ii = field.length; i < ii; i++) {
                        if (typeof x[field[i]] !== 'undefined') {
                            return primer(x[field[i]])
                        }
                    }
                    return x;
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

                var searchString = accents && this.helper.removeAccent.call(this, string) || string,
                    matches = [];

                if (!Array.isArray(keys)) {
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
                    string = this.helper.replaceAt(
                        string,
                        matches[i].offset,
                        matches[i].length,
                        "<strong>" + string.substr(matches[i].offset, matches[i].length) + "</strong>"
                    );
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
             * Clean strings from possible XSS (script and iframe tags)
             * @param string
             * @returns {string}
             */
            cleanStringFromScript: function (string) {
                return typeof string === "string" &&
                    string.replace(/<\/?(?:script|iframe)\b[^>]*>/gm, '') ||
                    string;
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
             * @returns {*}
             */
            executeCallback: function (callback, extraParams) {

                if (!callback) {
                    return;
                }

                var _callback;

                if (typeof callback === "function") {

                    _callback = callback;

                } else if (typeof callback === "string" || Array.isArray(callback)) {

                    if (typeof callback === "string") {
                        callback = [callback, []];
                    }

                    _callback = this.helper.namespace(callback[0], window);

                    if (typeof _callback !== "function") {
                        // {debug}
                        if (this.options.debug) {
                            _debug.log({
                                'node': this.selector,
                                'function': 'executeCallback()',
                                'arguments': JSON.stringify(callback),
                                'message': 'WARNING - Invalid callback function"'
                            });

                            _debug.print();
                        }
                        // {/debug}
                        return;
                    }

                }

                return _callback.apply(this, (callback[1] || []).concat(extraParams ? extraParams : []));

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

            if (!node.length || node[0].nodeName !== "INPUT") {

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

            return window.Typeahead[options.input || node.selector] = new Typeahead(node, options);

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

    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

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

    return Typeahead;

}));