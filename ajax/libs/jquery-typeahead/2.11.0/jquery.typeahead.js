/*!
 * jQuery Typeahead
 * Copyright (C) 2019 RunningCoder.org
 * Licensed under the MIT license
 *
 * @author Tom Bertrand
 * @version 2.11.0 (2019-10-31)
 * @link http://www.runningcoder.org/jquerytypeahead/
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define("jquery-typeahead", ["jquery"], function (jQuery) {
            return factory(jQuery);
        });
    } else if (typeof module === "object" && module.exports) {
        module.exports = (function (jQuery, root) {
            if (jQuery === undefined) {
                if (typeof window !== "undefined") {
                    jQuery = require("jquery");
                } else {
                    jQuery = require("jquery")(root);
                }
            }
            return factory(jQuery);
        })();
    } else {
        factory(jQuery);
    }
})(function ($) {
    "use strict";

    window.Typeahead = {
        version: '2.11.0'
    };

    /**
     * @private
     * Default options
     * @link http://www.runningcoder.org/jquerytypeahead/documentation/
     */
    var _options = {
        input: null,                // *RECOMMENDED*, jQuery selector to reach Typeahead's input for initialization
        minLength: 2,               // Accepts 0 to search on focus, minimum character length to perform a search
        maxLength: false,           // False as "Infinity" will not put character length restriction for searching results
        maxItem: 8,                 // Accepts 0 / false as "Infinity" meaning all the results will be displayed
        dynamic: false,             // When true, Typeahead will get a new dataset from the source option on every key press
        delay: 300,                 // delay in ms when dynamic option is set to true
        order: null,                // "asc" or "desc" to sort results
        offset: false,              // Set to true to match items starting from their first character
        hint: false,                // Added support for excessive "space" characters
        accent: false,              // Will allow to type accent and give letter equivalent results, also can define a custom replacement object
        highlight: true,            // Added "any" to highlight any word in the template, by default true will only highlight display keys
        multiselect: null,          // Multiselect configuration object, see documentation for all options
        group: false,               // Improved feature, Boolean,string,object(key, template (string, function))
        groupOrder: null,           // New feature, order groups "asc", "desc", Array, Function
        maxItemPerGroup: null,      // Maximum number of result per Group
        dropdownFilter: false,      // Take group options string and create a dropdown filter
        dynamicFilter: null,        // Filter the typeahead results based on dynamic value, Ex: Players based on TeamID
        backdrop: false,            // Add a backdrop behind Typeahead results
        backdropOnFocus: false,     // Display the backdrop option as the Typeahead input is :focused
        cache: false,               // Improved option, true OR 'localStorage' OR 'sessionStorage'
        ttl: 3600000,               // Cache time to live in ms
        compression: false,         // Requires LZString library
        searchOnFocus: false,       // Display search results on input focus
        blurOnTab: true,            // Blur Typeahead when Tab key is pressed, if false Tab will go though search results
        resultContainer: null,      // List the results inside any container string or jQuery object
        generateOnLoad: null,       // Forces the source to be generated on page load even if the input is not focused!
        mustSelectItem: false,      // The submit function only gets called if an item is selected
        href: null,                 // String or Function to format the url for right-click & open in new tab on link results
        display: ["display"],       // Allows search in multiple item keys ["display1", "display2"]
        template: null,             // Display template of each of the result list
        templateValue: null,        // Set the input value template when an item is clicked
        groupTemplate: null,        // Set a custom template for the groups
        correlativeTemplate: false, // Compile display keys, enables multiple key search from the template string
        emptyTemplate: false,       // Display an empty template if no result
        cancelButton: true,         // If text is detected in the input, a cancel button will be available to reset the input (pressing ESC also cancels)
        loadingAnimation: true,     // Display a loading animation when typeahead is doing request / searching for results
        asyncResult: false,         // If set to true, the search results will be displayed as they are beging received from the requests / async data function
        filter: true,               // Set to false or function to bypass Typeahead filtering. WARNING: accent, correlativeTemplate, offset & matcher will not be interpreted
        matcher: null,              // Add an extra filtering function after the typeahead functions
        source: null,               // Source of data for Typeahead to filter
        callback: {
            onInit: null,               // When Typeahead is first initialized (happens only once)
            onReady: null,              // When the Typeahead initial preparation is completed
            onShowLayout: null,         // Called when the layout is shown
            onHideLayout: null,         // Called when the layout is hidden
            onSearch: null,             // When data is being fetched & analyzed to give search results
            onResult: null,             // When the result container is displayed
            onLayoutBuiltBefore: null,  // When the result HTML is build, modify it before it get showed
            onLayoutBuiltAfter: null,   // Modify the dom right after the results gets inserted in the result container
            onNavigateBefore: null,     // When a key is pressed to navigate the results, before the navigation happens
            onNavigateAfter: null,      // When a key is pressed to navigate the results
            onEnter: null,              // When an item in the result list is focused
            onLeave: null,              // When an item in the result list is blurred
            onClickBefore: null,        // Possibility to e.preventDefault() to prevent the Typeahead behaviors
            onClickAfter: null,         // Happens after the default clicked behaviors has been executed
            onDropdownFilter: null,     // When the dropdownFilter is changed, trigger this callback
            onSendRequest: null,        // Gets called when the Ajax request(s) are sent
            onReceiveRequest: null,     // Gets called when the Ajax request(s) are all received
            onPopulateSource: null,     // Perform operation on the source data before it gets in Typeahead data
            onCacheSave: null,          // Perform operation on the source data before it gets in Typeahead cache
            onSubmit: null,             // When Typeahead form is submitted
            onCancel: null              // Triggered if the typeahead had text inside and is cleared
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
            labelContainer: "typeahead__label-container",
            label: "typeahead__label",
            button: "typeahead__button",
            backdrop: "typeahead__backdrop",
            hint: "typeahead__hint",
            cancelButton: "typeahead__cancel-button"
        },
        debug: false // Display debug information (RECOMMENDED for dev environment)
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

    /**
     * #193 Clicking on a suggested option does not select it on IE10/11
     * @private
     */
    var _isIE10 = ~window.navigator.appVersion.indexOf("MSIE 10");
    var _isIE11 = ~window.navigator.userAgent.indexOf("Trident")
        ? ~window.navigator.userAgent.indexOf("rv:11")
        : false;

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
        this.rawQuery = node.val() || "";   // Unmodified input query
        this.query = node.val() || "";      // Input query
        this.selector = node[0].selector;   // Typeahead instance selector (to reach from window.Typeahead[SELECTOR])
        this.deferred = null;               // Promise when "input" event in triggered, this.node.triggerHandler('input').then(() => {})
        this.tmpSource = {};                // Temp var to preserve the source order for the searchResult function
        this.source = {};                   // The generated source kept in memory
        this.dynamicGroups = [];            // Store the source groups that are defined as dynamic
        this.hasDynamicGroups = false;      // Boolean if at least one of the groups has a dynamic source
        this.generatedGroupCount = 0;       // Number of groups generated, if limit reached the search can be done
        this.groupBy = "group";             // This option will change according to filtering or custom grouping
        this.groups = [];                   // Array of all the available groups, used to build the groupTemplate
        this.searchGroups = [];             // Array of groups to generate when Typeahead searches data
        this.generateGroups = [];           // Array of groups to generate when Typeahead requests data
        this.requestGroups = [];            // Array of groups to request via Ajax
        this.result = [];                   // Results based on Source-query match (only contains the displayed elements)
        this.tmpResult = {};                // Temporary object of results, before they get passed to the buildLayout function
        this.groupTemplate = "";            // Result template at the {{group}} level
        this.resultHtml = null;             // HTML Results (displayed elements)
        this.resultCount = 0;               // Total results based on Source-query match
        this.resultCountPerGroup = {};      // Total results based on Source-query match per group
        this.options = options;             // Typeahead options (Merged default & user defined)
        this.node = node;                   // jQuery object of the Typeahead <input>
        this.namespace =
            "." +
            this.helper.slugify.call(this, this.selector) +
            _namespace;                     // Every Typeahead instance gets its own namespace for events
        this.isContentEditable = typeof this.node.attr('contenteditable') !== "undefined"
            && this.node.attr('contenteditable') !== "false";
        this.container = null;              // Typeahead container, usually right after <form>
        this.resultContainer = null;        // Typeahead result container (html)
        this.item = null;                   // Selected item
        this.items = null;                  // Multiselect selected items
        this.comparedItems = null;          // Multiselect items stored for comparison
        this.xhr = {};                      // Ajax request(s) stack
        this.hintIndex = null;              // Numeric value of the hint index in the result list
        this.filters = {                    // Filter list for searching, dropdown and dynamic(s)
            dropdown: {},                   // Dropdown menu if options.dropdownFilter is set
            dynamic: {}                     // Checkbox / Radio / Select to filter the source data
        };
        this.dropdownFilter = {
            static: [],                     // Objects that has a value
            dynamic: []
        };
        this.dropdownFilterAll = null;      // The last "all" definition
        this.isDropdownEvent = false;       // If a dropdownFilter is clicked, this will be true to trigger the callback

        this.requests = {};                 // Store the group:request instead of generating them every time

        this.backdrop = {};                 // The backdrop object
        this.hint = {};                     // The hint object
        this.label = {};                    // The label object
        this.hasDragged = false;            // Will cancel mouseend events if true
        this.focusOnly = false;             // Focus the input preventing any operations
        this.displayEmptyTemplate;          // Display the empty template in the result list

        this.__construct();
    };

    Typeahead.prototype = {
        _validateCacheMethod: function (cache) {
            var supportedCache = ["localStorage", "sessionStorage"],
                supported;

            if (cache === true) {
                cache = "localStorage";
            } else if (typeof cache === "string" && !~supportedCache.indexOf(cache)) {
                // {debug}
                if (this.options.debug) {
                    _debug.log({
                        node: this.selector,
                        function: "extendOptions()",
                        message: 'Invalid options.cache, possible options are "localStorage" or "sessionStorage"'
                    });

                    _debug.print();
                }
                // {/debug}
                return false;
            }

            supported = typeof window[cache] !== "undefined";

            try {
                window[cache].setItem("typeahead", "typeahead");
                window[cache].removeItem("typeahead");
            } catch (e) {
                supported = false;
            }

            return (supported && cache) || false;
        },

        extendOptions: function () {
            this.options.cache = this._validateCacheMethod(this.options.cache);

            if (this.options.compression) {
                if (typeof LZString !== "object" || !this.options.cache) {
                    // {debug}
                    if (this.options.debug) {
                        _debug.log({
                            node: this.selector,
                            function: "extendOptions()",
                            message: "Missing LZString Library or options.cache, no compression will occur."
                        });

                        _debug.print();
                    }
                    // {/debug}
                    this.options.compression = false;
                }
            }

            if (!this.options.maxLength || isNaN(this.options.maxLength)) {
                this.options.maxLength = Infinity;
            }

            if (
                typeof this.options.maxItem !== "undefined" && ~[0, false].indexOf(this.options.maxItem)
            ) {
                this.options.maxItem = Infinity;
            }

            if (
                this.options.maxItemPerGroup && !/^\d+$/.test(this.options.maxItemPerGroup)
            ) {
                this.options.maxItemPerGroup = null;
            }

            if (this.options.display && !Array.isArray(this.options.display)) {
                this.options.display = [this.options.display];
            }

            if (this.options.multiselect) {
                this.items = [];
                this.comparedItems = [];
                if (typeof this.options.multiselect.matchOn === "string") {
                    this.options.multiselect.matchOn = [this.options.multiselect.matchOn];
                }
            }

            if (this.options.group) {
                if (!Array.isArray(this.options.group)) {
                    if (typeof this.options.group === "string") {
                        this.options.group = {
                            key: this.options.group
                        };
                    } else if (typeof this.options.group === "boolean") {
                        this.options.group = {
                            key: "group"
                        };
                    }

                    this.options.group.key = this.options.group.key || "group";
                } else {
                    // {debug}
                    if (this.options.debug) {
                        _debug.log({
                            node: this.selector,
                            function: "extendOptions()",
                            message: "options.group must be a boolean|string|object as of 2.5.0"
                        });

                        _debug.print();
                    }
                    // {/debug}
                }
            }

            if (this.options.highlight && !~["any", true].indexOf(this.options.highlight)) {
                this.options.highlight = false;
            }

            if (
                this.options.dropdownFilter &&
                this.options.dropdownFilter instanceof Object
            ) {
                if (!Array.isArray(this.options.dropdownFilter)) {
                    this.options.dropdownFilter = [this.options.dropdownFilter];
                }
                for (var i = 0, ii = this.options.dropdownFilter.length; i < ii; ++i) {
                    this.dropdownFilter[
                        this.options.dropdownFilter[i].value ? "static" : "dynamic"
                        ].push(this.options.dropdownFilter[i]);
                }
            }

            if (this.options.dynamicFilter && !Array.isArray(this.options.dynamicFilter)) {
                this.options.dynamicFilter = [this.options.dynamicFilter];
            }

            if (this.options.accent) {
                if (typeof this.options.accent === "object") {
                    if (
                        this.options.accent.from &&
                        this.options.accent.to &&
                        this.options.accent.from.length !== this.options.accent.to.length
                    ) {
                        // {debug}
                        if (this.options.debug) {
                            _debug.log({
                                node: this.selector,
                                function: "extendOptions()",
                                message: 'Invalid "options.accent", from and to must be defined and same length.'
                            });

                            _debug.print();
                        }
                        // {/debug}
                    }

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

                if (
                    !(this.options.resultContainer instanceof $) || !this.options.resultContainer[0]
                ) {
                    // {debug}
                    if (this.options.debug) {
                        _debug.log({
                            node: this.selector,
                            function: "extendOptions()",
                            message: 'Invalid jQuery selector or jQuery Object for "options.resultContainer".'
                        });

                        _debug.print();
                    }
                    // {/debug}
                } else {
                    this.resultContainer = this.options.resultContainer;
                }
            }

            if (
                this.options.group &&
                this.options.group.key
            ) {
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

            this.options = $.extend(true, {}, _options, this.options);
        },

        unifySourceFormat: function () {
            this.dynamicGroups = [];

            // source: ['item1', 'item2', 'item3']
            if (Array.isArray(this.options.source)) {
                this.options.source = {
                    group: {
                        data: this.options.source
                    }
                };
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

            var group, groupSource, tmpAjax;

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
                    groupSource.ajax =
                        typeof tmpAjax[0] === "string"
                            ? {
                                url: tmpAjax[0]
                            }
                            : tmpAjax[0];
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
                            node: this.selector,
                            function: "unifySourceFormat()",
                            arguments: JSON.stringify(this.options.source),
                            message: 'Undefined "options.source.' +
                            group +
                            '.[data|ajax]" is Missing - Typeahead dropped'
                        });

                        _debug.print();
                    }
                    // {/debug}

                    return false;
                }

                if (groupSource.display && !Array.isArray(groupSource.display)) {
                    groupSource.display = [groupSource.display];
                }

                groupSource.minLength =
                    typeof groupSource.minLength === "number"
                        ? groupSource.minLength
                        : this.options.minLength;
                groupSource.maxLength =
                    typeof groupSource.maxLength === "number"
                        ? groupSource.maxLength
                        : this.options.maxLength;
                groupSource.dynamic =
                    typeof groupSource.dynamic === "boolean" || this.options.dynamic;

                if (groupSource.minLength > groupSource.maxLength) {
                    groupSource.minLength = groupSource.maxLength;
                }
                this.options.source[group] = groupSource;

                if (this.options.source[group].dynamic) {
                    this.dynamicGroups.push(group);
                }

                groupSource.cache =
                    typeof groupSource.cache !== "undefined"
                        ? this._validateCacheMethod(groupSource.cache)
                        : this.options.cache;

                if (groupSource.compression) {
                    if (typeof LZString !== "object" || !groupSource.cache) {
                        // {debug}
                        if (this.options.debug) {
                            _debug.log({
                                node: this.selector,
                                function: "unifySourceFormat()",
                                message: "Missing LZString Library or group.cache, no compression will occur on group: " +
                                group
                            });

                            _debug.print();
                        }
                        // {/debug}
                        groupSource.compression = false;
                    }
                }
            }

            this.hasDynamicGroups =
                this.options.dynamic || !!this.dynamicGroups.length;

            return true;
        },

        init: function () {
            this.helper.executeCallback.call(this, this.options.callback.onInit, [
                this.node
            ]);

            this.container = this.node.closest("." + this.options.selector.container);

            // {debug}
            if (this.options.debug) {
                _debug.log({
                    node: this.selector,
                    function: "init()",
                    //'arguments': JSON.stringify(this.options),
                    message: "OK - Typeahead activated on " + this.selector
                });

                _debug.print();
            }
            // {/debug}
        },

        delegateEvents: function () {
            var scope = this,
                events = [
                    "focus" + this.namespace,
                    "input" + this.namespace,
                    "propertychange" + this.namespace, // IE8 Fix
                    "keydown" + this.namespace,
                    "keyup" + this.namespace, // IE9 Fix
                    "search" + this.namespace,
                    "generate" + this.namespace
                ];

            // #149 - Adding support for Mobiles
            $("html")
                .on("touchmove", function () {
                    scope.hasDragged = true;
                })
                .on("touchstart", function () {
                    scope.hasDragged = false;
                });

            this.node
                .closest("form")
                .on("submit", function (e) {
                    if (
                        scope.options.mustSelectItem &&
                        scope.helper.isEmpty(scope.item)
                    ) {
                        e.preventDefault();
                        return;
                    }

                    if (!scope.options.backdropOnFocus) {
                        scope.hideLayout();
                    }

                    if (scope.options.callback.onSubmit) {
                        return scope.helper.executeCallback.call(
                            scope,
                            scope.options.callback.onSubmit,
                            [scope.node, this, scope.item || scope.items, e]
                        );
                    }
                })
                .on("reset", function () {
                    // #221 - Reset Typeahead on form reset.
                    // setTimeout to re-queue the `input.typeahead` event at the end
                    setTimeout(function () {
                        scope.node.trigger("input" + scope.namespace);
                        // #243 - minLength: 0 opens the Typeahead results
                        scope.hideLayout();
                    });
                });

            // IE8 fix
            var preventNextEvent = false;

            // IE10/11 fix
            if (this.node.attr("placeholder") && (_isIE10 || _isIE11)) {
                var preventInputEvent = true;

                this.node.on("focusin focusout", function () {
                    preventInputEvent = !!(!this.value && this.placeholder);
                });

                this.node.on("input", function (e) {
                    if (preventInputEvent) {
                        e.stopImmediatePropagation();
                        preventInputEvent = false;
                    }
                });
            }

            this.node
                .off(this.namespace)
                .on(events.join(" "), function (e, data) {
                    switch (e.type) {
                        case "generate":
                            scope.generateSource(Object.keys(scope.options.source));
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
                            if (scope.options.searchOnFocus && !scope.item) {
                                scope.deferred = $.Deferred();
                                scope.assignQuery();
                                scope.generateSource();
                            }
                            break;
                        case "keydown":
                            if (e.keyCode === 8
                                && scope.options.multiselect
                                && scope.options.multiselect.cancelOnBackspace
                                && scope.query === ''
                                && scope.items.length
                            ) {
                                scope.cancelMultiselectItem(scope.items.length - 1, null, e);
                            } else if (e.keyCode && ~[9, 13, 27, 38, 39, 40].indexOf(e.keyCode)) {
                                preventNextEvent = true;
                                scope.navigate(e);
                            }
                            break;
                        case "keyup":
                            if (
                                _isIE9 &&
                                scope.node[0].value.replace(/^\s+/, "").toString().length <
                                scope.query.length
                            ) {
                                scope.node.trigger("input" + scope.namespace);
                            }
                            break;
                        case "propertychange":
                            if (preventNextEvent) {
                                preventNextEvent = false;
                                break;
                            }
                        case "input":
                            scope.deferred = $.Deferred();
                            scope.assignQuery();

                            // #195 Trigger an onCancel event if the Typeahead is cleared
                            if (scope.rawQuery === "" && scope.query === "") {
                                e.originalEvent = data || {};
                                scope.helper.executeCallback.call(
                                    scope,
                                    scope.options.callback.onCancel,
                                    [scope.node, scope.item, e]
                                );
                                scope.item = null;
                            }

                            scope.options.cancelButton &&
                            scope.toggleCancelButtonVisibility();

                            if (
                                scope.options.hint &&
                                scope.hint.container &&
                                scope.hint.container.val() !== ""
                            ) {
                                if (scope.hint.container.val().indexOf(scope.rawQuery) !== 0) {
                                    scope.hint.container.val("");
                                    if (scope.isContentEditable) {
                                        scope.hint.container.text("");
                                    }
                                }
                            }

                            if (scope.hasDynamicGroups) {
                                scope.helper.typeWatch(function () {
                                    scope.generateSource();
                                }, scope.options.delay);
                            } else {
                                scope.generateSource();
                            }
                            break;
                        case "search":
                            scope.searchResult();
                            scope.buildLayout();

                            if (scope.result.length ||
                                (scope.searchGroups.length &&
                                scope.displayEmptyTemplate)
                            ) {
                                scope.showLayout();
                            } else {
                                scope.hideLayout();
                            }

                            scope.deferred && scope.deferred.resolve();
                            break;
                    }

                    return scope.deferred && scope.deferred.promise();
                });

            if (this.options.generateOnLoad) {
                this.node.trigger("generate" + this.namespace);
            }
        },

        assignQuery: function () {
            if (this.isContentEditable) {
                this.rawQuery = this.node.text();
            } else {
                this.rawQuery = this.node.val().toString();
            }
            this.rawQuery = this.rawQuery.replace(/^\s+/, "");

            if (this.rawQuery !== this.query) {
                this.query = this.rawQuery;
            }
        },

        filterGenerateSource: function () {
            this.searchGroups = [];
            this.generateGroups = [];

            if (this.focusOnly && !this.options.multiselect) return;

            for (var group in this.options.source) {
                if (!this.options.source.hasOwnProperty(group)) continue;
                if (
                    this.query.length >= this.options.source[group].minLength &&
                    this.query.length <= this.options.source[group].maxLength
                ) {
                    if (
                        this.filters.dropdown &&
                        this.filters.dropdown.key === 'group' &&
                        this.filters.dropdown.value !== group
                    ) {
                        continue;
                    }

                    this.searchGroups.push(group);
                    if (!this.options.source[group].dynamic && this.source[group]) {
                        continue;
                    }
                    this.generateGroups.push(group);
                }
            }
        },

        generateSource: function (generateGroups) {
            this.filterGenerateSource();

            this.generatedGroupCount = 0;

            if (Array.isArray(generateGroups) && generateGroups.length) {
                this.generateGroups = generateGroups;
            } else if (!this.generateGroups.length) {
                this.node.trigger("search" + this.namespace);
                return;
            }

            this.requestGroups = [];
            this.options.loadingAnimation && this.container.addClass("loading");

            if (!this.helper.isEmpty(this.xhr)) {
                for (var i in this.xhr) {
                    if (!this.xhr.hasOwnProperty(i)) continue;
                    this.xhr[i].abort();
                }
                this.xhr = {};
            }

            var scope = this,
                group,
                groupData,
                groupSource,
                cache,
                compression,
                dataInStorage,
                isValidStorage;

            for (var i = 0, ii = this.generateGroups.length; i < ii; ++i) {
                group = this.generateGroups[i];
                groupSource = this.options.source[group];
                cache = groupSource.cache;
                compression = groupSource.compression;

                if (this.options.asyncResult) {
                    delete this.source[group];
                }

                if (cache) {
                    dataInStorage = window[cache].getItem(
                        "TYPEAHEAD_" + this.selector + ":" + group
                    );
                    if (dataInStorage) {
                        if (compression) {
                            dataInStorage = LZString.decompressFromUTF16(dataInStorage);
                        }

                        isValidStorage = false;
                        try {
                            dataInStorage = JSON.parse(dataInStorage + "");

                            if (
                                dataInStorage.data &&
                                dataInStorage.ttl > new Date().getTime()
                            ) {
                                this.populateSource(dataInStorage.data, group);
                                isValidStorage = true;

                                // {debug}
                                if (this.options.debug) {
                                    _debug.log({
                                        node: this.selector,
                                        function: "generateSource()",
                                        message: 'Source for group "' + group + '" found in ' + cache
                                    });
                                    _debug.print();
                                }
                                // {/debug}
                            } else {
                                window[cache].removeItem(
                                    "TYPEAHEAD_" + this.selector + ":" + group
                                );
                            }
                        } catch (error) {
                        }

                        if (isValidStorage) continue;
                    }
                }

                if (groupSource.data && !groupSource.ajax) {
                    // #198 Add support for async data source
                    if (typeof groupSource.data === "function") {
                        groupData = groupSource.data.call(this);
                        if (Array.isArray(groupData)) {
                            scope.populateSource(groupData, group);
                        } else if (typeof groupData.promise === "function") {
                            (function (group) {
                                $.when(groupData).then(function (deferredData) {
                                    if (deferredData && Array.isArray(deferredData)) {
                                        scope.populateSource(deferredData, group);
                                    }
                                });
                            })(group);
                        }
                    } else {
                        this.populateSource($.extend(true, [], groupSource.data), group);
                    }
                    continue;
                }

                if (groupSource.ajax) {
                    if (!this.requests[group]) {
                        this.requests[group] = this.generateRequestObject(group);
                    }
                    this.requestGroups.push(group);
                }
            }

            if (this.requestGroups.length) {
                this.handleRequests();
            }

            if (this.options.asyncResult && this.searchGroups.length !== this.generateGroups) {
                this.node.trigger("search" + this.namespace);
            }

            return !!this.generateGroups.length;
        },

        generateRequestObject: function (group) {
            var scope = this,
                groupSource = this.options.source[group];

            var xhrObject = {
                request: {
                    url: groupSource.ajax.url || null,
                    dataType: "json",
                    beforeSend: function (jqXHR, options) {
                        // Important to call .abort() in case of dynamic requests
                        scope.xhr[group] = jqXHR;

                        var beforeSend =
                            scope.requests[group].callback.beforeSend ||
                            groupSource.ajax.beforeSend;
                        typeof beforeSend === "function" &&
                        beforeSend.apply(null, arguments);
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

                        if (
                            xhrObject.request.url &&
                            xhrObject.request.url === this.requests[_group].request.url
                        ) {
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
            xhrObject.request = $.extend(true, xhrObject.request, groupRequest);

            // JSONP needs a unique jsonpCallback to run concurrently
            if (
                xhrObject.request.dataType.toLowerCase() === "jsonp" && !xhrObject.request.jsonpCallback
            ) {
                xhrObject.request.jsonpCallback = "callback_" + xhrObject.extra.group;
            }

            return xhrObject;
        },

        handleRequests: function () {
            var scope = this,
                group,
                requestsCount = this.requestGroups.length;

            if (
                this.helper.executeCallback.call(
                    this,
                    this.options.callback.onSendRequest,
                    [this.node, this.query]
                ) === false
            ) {
                return;
            }

            for (var i = 0, ii = this.requestGroups.length; i < ii; ++i) {
                group = this.requestGroups[i];
                if (this.requests[group].isDuplicated) continue;

                (function (group, xhrObject) {
                    if (typeof scope.options.source[group].ajax === "function") {
                        var _groupRequest = scope.options.source[group].ajax.call(
                            scope,
                            scope.query
                        );

                        // Fixes #271 Data is cached inside the xhrObject
                        xhrObject = scope.extendXhrObject(
                            scope.generateRequestObject(group),
                            typeof _groupRequest === "object" ? _groupRequest : {}
                        );

                        if (
                            typeof xhrObject.request !== "object" || !xhrObject.request.url
                        ) {
                            // {debug}
                            if (scope.options.debug) {
                                _debug.log({
                                    node: scope.selector,
                                    function: "handleRequests",
                                    message: 'Source function must return an object containing ".url" key for group "' +
                                    group +
                                    '"'
                                });
                                _debug.print();
                            }
                            // {/debug}
                            scope.populateSource([], group);
                            return;
                        }
                        scope.requests[group] = xhrObject;
                    }

                    var _request,
                        _isExtended = false, // Prevent the main request from being changed
                        _groupData = {};

                    if (~xhrObject.request.url.indexOf("{{query}}")) {
                        if (!_isExtended) {
                            xhrObject = $.extend(true, {}, xhrObject);
                            _isExtended = true;
                        }
                        // #184 Invalid encoded characters on dynamic requests for `{{query}}`
                        xhrObject.request.url = xhrObject.request.url.replace(
                            "{{query}}",
                            encodeURIComponent(scope.query)
                        );
                    }

                    if (xhrObject.request.data) {
                        for (var i in xhrObject.request.data) {
                            if (!xhrObject.request.data.hasOwnProperty(i)) continue;
                            if (~String(xhrObject.request.data[i]).indexOf("{{query}}")) {
                                if (!_isExtended) {
                                    xhrObject = $.extend(true, {}, xhrObject);
                                    _isExtended = true;
                                }
                                // jQuery handles encodeURIComponent when the query is inside the data object
                                xhrObject.request.data[i] = xhrObject.request.data[i].replace(
                                    "{{query}}",
                                    scope.query
                                );
                                break;
                            }
                        }
                    }

                    $.ajax(xhrObject.request)
                        .done(function (data, textStatus, jqXHR) {
                            var _group;

                            for (
                                var i = 0, ii = xhrObject.validForGroup.length;
                                i < ii;
                                i++
                            ) {
                                _group = xhrObject.validForGroup[i];
                                _request = scope.requests[_group];

                                if (typeof _request.callback.done === 'function') {
                                    _groupData[_group] = _request.callback.done.call(
                                        scope,
                                        data,
                                        textStatus,
                                        jqXHR
                                    );

                                    // {debug}
                                    if (
                                        !Array.isArray(_groupData[_group]) ||
                                        typeof _groupData[_group] !== "object"
                                    ) {
                                        if (scope.options.debug) {
                                            _debug.log({
                                                node: scope.selector,
                                                function: "Ajax.callback.done()",
                                                message: "Invalid returned data has to be an Array"
                                            });
                                            _debug.print();
                                        }
                                    }
                                    // {/debug}
                                }
                            }
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            for (
                                var i = 0, ii = xhrObject.validForGroup.length;
                                i < ii;
                                i++
                            ) {
                                _request = scope.requests[xhrObject.validForGroup[i]];
                                _request.callback.fail instanceof Function &&
                                _request.callback.fail.call(
                                    scope,
                                    jqXHR,
                                    textStatus,
                                    errorThrown
                                );
                            }

                            // {debug}
                            if (scope.options.debug) {
                                _debug.log({
                                    node: scope.selector,
                                    function: "Ajax.callback.fail()",
                                    arguments: JSON.stringify(xhrObject.request),
                                    message: textStatus
                                });

                                console.log(errorThrown);

                                _debug.print();
                            }
                            // {/debug}
                        })
                        .always(function (data, textStatus, jqXHR) {
                            var _group;
                            for (
                                var i = 0, ii = xhrObject.validForGroup.length;
                                i < ii;
                                i++
                            ) {
                                _group = xhrObject.validForGroup[i];
                                _request = scope.requests[_group];
                                _request.callback.always instanceof Function &&
                                _request.callback.always.call(scope, data, textStatus, jqXHR);

                                // #248, #303 Aborted requests would call populate with invalid data
                                if (textStatus === 'abort') return;

                                // #265 Modified data from ajax.callback.done is not being registered (use of _groupData[_group])
                                scope.populateSource(
                                    (data !== null && typeof data.promise === "function" && []) ||
                                    _groupData[_group] ||
                                    data,
                                    _request.extra.group,
                                    _request.extra.path || _request.request.path
                                );

                                requestsCount -= 1;
                                if (requestsCount === 0) {
                                    scope.helper.executeCallback.call(
                                        scope,
                                        scope.options.callback.onReceiveRequest,
                                        [scope.node, scope.query]
                                    );
                                }
                            }
                        })
                        .then(function (jqXHR, textStatus) {
                            for (
                                var i = 0, ii = xhrObject.validForGroup.length;
                                i < ii;
                                i++
                            ) {
                                _request = scope.requests[xhrObject.validForGroup[i]];
                                _request.callback.then instanceof Function &&
                                _request.callback.then.call(scope, jqXHR, textStatus);
                            }
                        });
                })(group, this.requests[group]);
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

            if (path && typeof path === "string") {
                data = this.helper.namespace.call(this, path, data);
            }

            if (typeof data === "undefined") {
                // {debug}
                if (this.options.debug) {
                    _debug.log({
                        node: this.selector,
                        function: "populateSource()",
                        arguments: path,
                        message: "Invalid data path."
                    });

                    _debug.print();
                }
                // {/debug}
            }

            if (!Array.isArray(data)) {
                // {debug}
                if (this.options.debug) {
                    _debug.log({
                        node: this.selector,
                        function: "populateSource()",
                        arguments: JSON.stringify({group: group}),
                        message: "Invalid data type, must be Array type."
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
                } else {
                    // {debug}
                    if (this.options.debug) {
                        _debug.log({
                            node: this.selector,
                            function: "populateSource()",
                            arguments: JSON.stringify(extraData),
                            message: "WARNING - this.options.source." +
                            group +
                            ".data Must be an Array or a function that returns an Array."
                        });

                        _debug.print();
                    }
                    // {/debug}
                }
            }

            var tmpObj,
                display = groupSource.display
                    ? groupSource.display[0] === "compiled"
                        ? groupSource.display[1]
                        : groupSource.display[0]
                    : this.options.display[0] === "compiled"
                        ? this.options.display[1]
                        : this.options.display[0];

            for (var i = 0, ii = data.length; i < ii; i++) {
                if (data[i] === null || typeof data[i] === "boolean") {
                    // {debug}
                    if (this.options.debug) {
                        _debug.log({
                            node: this.selector,
                            function: "populateSource()",
                            message: "WARNING - NULL/BOOLEAN value inside " +
                            group +
                            "! The data was skipped."
                        });

                        _debug.print();
                    }
                    // {/debug}
                    continue;
                }
                if (typeof data[i] === "string") {
                    tmpObj = {};
                    tmpObj[display] = data[i];
                    data[i] = tmpObj;
                }
                data[i].group = group;
            }

            if (!this.hasDynamicGroups && this.dropdownFilter.dynamic.length) {
                var key,
                    value,
                    tmpValues = {};

                for (var i = 0, ii = data.length; i < ii; i++) {
                    for (
                        var k = 0, kk = this.dropdownFilter.dynamic.length;
                        k < kk;
                        k++
                    ) {
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
                    template = template.call(this, "", {});
                }

                if (!template) {
                    // {debug}
                    if (this.options.debug) {
                        _debug.log({
                            node: this.selector,
                            function: "populateSource()",
                            arguments: String(group),
                            message: "WARNING - this.options.correlativeTemplate is enabled but no template was found."
                        });

                        _debug.print();
                    }
                    // {/debug}
                } else {
                    // #109 correlativeTemplate can be an array of display keys instead of the complete template
                    if (Array.isArray(this.options.correlativeTemplate)) {
                        for (
                            var i = 0, ii = this.options.correlativeTemplate.length;
                            i < ii;
                            i++
                        ) {
                            compiledTemplate +=
                                "{{" + this.options.correlativeTemplate[i] + "}} ";
                        }
                    } else {
                        // Strip down the html tags, #351 if the template needs "<>" use html entities instead &#60;{{email}}&#62;
                        compiledTemplate = template
                            .replace(/<.+?>/g, " ")
                            .replace(/\s{2,}/, " ")
                            .trim();
                    }

                    for (var i = 0, ii = data.length; i < ii; i++) {
                        // Fix #351, convert htmlEntities from the template string
                        data[i].compiled = $("<textarea />")
                            .html(
                                compiledTemplate
                                    .replace(/\{\{([\w\-\.]+)(?:\|(\w+))?}}/g, function (match,
                                                                                         index) {
                                        return scope.helper.namespace.call(
                                            scope,
                                            index,
                                            data[i],
                                            "get",
                                            ""
                                        );
                                    })
                                    .trim()
                            )
                            .text();
                    }

                    if (groupSource.display) {
                        if (!~groupSource.display.indexOf("compiled")) {
                            groupSource.display.unshift("compiled");
                        }
                    } else if (!~this.options.display.indexOf("compiled")) {
                        this.options.display.unshift("compiled");
                    }
                }
            }

            if (this.options.callback.onPopulateSource) {
                data = this.helper.executeCallback.call(
                    this,
                    this.options.callback.onPopulateSource,
                    [this.node, data, group, path]
                );

                // {debug}
                if (this.options.debug) {
                    if (!data || !Array.isArray(data)) {
                        _debug.log({
                            node: this.selector,
                            function: "callback.populateSource()",
                            message: 'callback.onPopulateSource must return the "data" parameter'
                        });

                        _debug.print();
                    }
                }
                // {/debug}
            }

            // Save the data inside tmpSource to re-order once every requests are completed
            this.tmpSource[group] = (Array.isArray(data) && data) || [];

            var cache = this.options.source[group].cache,
                compression = this.options.source[group].compression,
                ttl = this.options.source[group].ttl || this.options.ttl;

            if (
                cache && !window[cache].getItem("TYPEAHEAD_" + this.selector + ":" + group)
            ) {
                if (this.options.callback.onCacheSave) {
                    data = this.helper.executeCallback.call(
                        this,
                        this.options.callback.onCacheSave,
                        [this.node, data, group, path]
                    );

                    // {debug}
                    if (this.options.debug) {
                        if (!data || !Array.isArray(data)) {
                            _debug.log({
                                node: this.selector,
                                function: "callback.populateSource()",
                                message: 'callback.onCacheSave must return the "data" parameter'
                            });

                            _debug.print();
                        }
                    }
                    // {/debug}
                }

                var storage = JSON.stringify({
                    data: data,
                    ttl: new Date().getTime() + ttl
                });

                if (compression) {
                    storage = LZString.compressToUTF16(storage);
                }

                window[cache].setItem(
                    "TYPEAHEAD_" + this.selector + ":" + group,
                    storage
                );
            }

            this.incrementGeneratedGroup(group);
        },

        incrementGeneratedGroup: function (group) {
            this.generatedGroupCount++;
            if (this.generatedGroupCount !== this.generateGroups.length && !this.options.asyncResult) {
                return;
            }

            if (this.xhr && this.xhr[group]) {
                delete this.xhr[group];
            }

            for (var i = 0, ii = this.generateGroups.length; i < ii; i++) {
                this.source[this.generateGroups[i]] = this.tmpSource[
                    this.generateGroups[i]
                ];
            }

            if (!this.hasDynamicGroups) {
                this.buildDropdownItemLayout("dynamic");
            }

            if (this.generatedGroupCount === this.generateGroups.length) {
                this.xhr = {};
                this.options.loadingAnimation && this.container.removeClass("loading");
            }
            this.node.trigger("search" + this.namespace);
        },

        /**
         * Key Navigation
         * tab 9: if option is enabled, blur Typeahead
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
            this.helper.executeCallback.call(
                this,
                this.options.callback.onNavigateBefore,
                [this.node, this.query, e]
            );

            if (e.keyCode === 27) {
                // #166 Different browsers do not have the same behaviors by default, lets enforce what we want instead
                e.preventDefault();
                if (this.query.length) {
                    this.resetInput();
                    this.node.trigger("input" + this.namespace, [e]);
                } else {
                    this.node.blur();
                    this.hideLayout();
                }
                return;
            }

            if (!this.result.length) return;

            var itemList = this.resultContainer
                    .find("." + this.options.selector.item)
                    .not("[disabled]"),
                activeItem = itemList.filter(".active"),
                activeItemIndex = activeItem[0] ? itemList.index(activeItem) : null,
                activeDataIndex = activeItem[0] ? activeItem.attr("data-index") : null,
                newActiveItemIndex = null,
                newActiveDataIndex = null;

            this.clearActiveItem();

            this.helper.executeCallback.call(this, this.options.callback.onLeave, [
                this.node,
                (activeItemIndex !== null && itemList.eq(activeItemIndex)) || undefined,
                (activeDataIndex !== null && this.result[activeDataIndex]) || undefined,
                e
            ]);

            if (e.keyCode === 13) {
                // Chrome needs preventDefault else the input search event is triggered
                e.preventDefault();
                if (activeItem.length > 0) {
                    // #311 When href is defined and "enter" is pressed, it needs to act as a "clicked" link
                    if (activeItem.find("a:first")[0].href === "javascript:;") {
                        activeItem.find("a:first").trigger("click", e);
                    } else {
                        activeItem.find("a:first")[0].click();
                    }
                } else {
                    this.node
                        .closest("form")
                        .trigger("submit");
                }
                return;
            }

            if (e.keyCode === 39) {
                if (activeItemIndex !== null) {
                    itemList
                        .eq(activeItemIndex)
                        .find("a:first")[0]
                        .click();
                } else if (
                    this.options.hint &&
                    this.hint.container.val() !== "" &&
                    this.helper.getCaret(this.node[0]) >= this.query.length
                ) {
                    itemList
                        .filter('[data-index="' + this.hintIndex + '"]')
                        .find("a:first")[0]
                        .click();
                }
                return;
            }

            // #284 Blur Typeahead when "Tab" key is pressed
            // #326 Improve Up / Down / Tab navigation to have only 1 "selected" item
            if (e.keyCode === 9) {
                if (this.options.blurOnTab) {
                    this.hideLayout();
                } else {
                    if (activeItem.length > 0) {
                        if (activeItemIndex + 1 < itemList.length) {
                            e.preventDefault();
                            newActiveItemIndex = activeItemIndex + 1;
                            this.addActiveItem(itemList.eq(newActiveItemIndex));
                        } else {
                            this.hideLayout();
                        }
                    } else {
                        if (itemList.length) {
                            e.preventDefault();
                            newActiveItemIndex = 0;
                            this.addActiveItem(itemList.first());
                        } else {
                            this.hideLayout();
                        }
                    }
                }
            } else if (e.keyCode === 38) {
                e.preventDefault();

                if (activeItem.length > 0) {
                    if (activeItemIndex - 1 >= 0) {
                        newActiveItemIndex = activeItemIndex - 1;
                        this.addActiveItem(itemList.eq(newActiveItemIndex));
                    }
                } else if (itemList.length) {
                    newActiveItemIndex = itemList.length - 1;
                    this.addActiveItem(itemList.last());
                }
            } else if (e.keyCode === 40) {
                e.preventDefault();

                if (activeItem.length > 0) {
                    if (activeItemIndex + 1 < itemList.length) {
                        newActiveItemIndex = activeItemIndex + 1;
                        this.addActiveItem(itemList.eq(newActiveItemIndex));
                    }
                } else if (itemList.length) {
                    newActiveItemIndex = 0;
                    this.addActiveItem(itemList.first());
                }
            }

            newActiveDataIndex =
                newActiveItemIndex !== null
                    ? itemList.eq(newActiveItemIndex).attr("data-index")
                    : null;

            this.helper.executeCallback.call(this, this.options.callback.onEnter, [
                this.node,
                (newActiveItemIndex !== null && itemList.eq(newActiveItemIndex)) ||
                undefined,
                (newActiveDataIndex !== null && this.result[newActiveDataIndex]) ||
                undefined,
                e
            ]);

            // #115 Prevent the input from changing when navigating (arrow up / down) the results
            if (e.preventInputChange && ~[38, 40].indexOf(e.keyCode)) {
                this.buildHintLayout(
                    newActiveDataIndex !== null && newActiveDataIndex < this.result.length
                        ? [this.result[newActiveDataIndex]]
                        : null
                );
            }

            if (this.options.hint && this.hint.container) {
                this.hint.container.css(
                    "color",
                    e.preventInputChange
                        ? this.hint.css.color
                        : (newActiveDataIndex === null && this.hint.css.color) ||
                        this.hint.container.css("background-color") ||
                        "fff"
                );
            }

            var nodeValue =
                newActiveDataIndex === null || e.preventInputChange
                    ? this.rawQuery
                    : this.getTemplateValue.call(this, this.result[newActiveDataIndex]);

            this.node.val(nodeValue);
            if (this.isContentEditable) {
                this.node.text(nodeValue);
            }

            this.helper.executeCallback.call(
                this,
                this.options.callback.onNavigateAfter,
                [
                    this.node,
                    itemList,
                    (newActiveItemIndex !== null &&
                    itemList.eq(newActiveItemIndex).find("a:first")) ||
                    undefined,
                    (newActiveDataIndex !== null && this.result[newActiveDataIndex]) ||
                    undefined,
                    this.query,
                    e
                ]
            );
        },

        getTemplateValue: function (item) {
            if (!item) return;
            var templateValue =
                (item.group && this.options.source[item.group].templateValue) ||
                this.options.templateValue;
            if (typeof templateValue === "function") {
                templateValue = templateValue.call(this);
            }
            if (!templateValue) {
                return this.helper.namespace
                    .call(this, item.matchedKey, item)
                    .toString();
            }
            var scope = this;

            return templateValue.replace(/\{\{([\w\-.]+)}}/gi, function (match, index) {
                return scope.helper.namespace.call(scope, index, item, "get", "");
            });
        },

        clearActiveItem: function () {
            this.resultContainer
                .find("." + this.options.selector.item)
                .removeClass("active");
        },

        addActiveItem: function (item) {
            item.addClass("active");
        },

        searchResult: function () {
            this.resetLayout();

            if (
                this.helper.executeCallback.call(this, this.options.callback.onSearch, [
                    this.node,
                    this.query
                ]) === false
            ) return;

            if (
                this.searchGroups.length && !(
                    this.options.multiselect &&
                    this.options.multiselect.limit &&
                    this.items.length >= this.options.multiselect.limit
                )
            ) {
                this.searchResultData();
            }

            this.helper.executeCallback.call(this, this.options.callback.onResult, [
                this.node,
                this.query,
                this.result,
                this.resultCount,
                this.resultCountPerGroup
            ]);

            if (this.isDropdownEvent) {
                this.helper.executeCallback.call(
                    this,
                    this.options.callback.onDropdownFilter,
                    [this.node, this.query, this.filters.dropdown, this.result]
                );
                this.isDropdownEvent = false;
            }
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
                maxItem = this.options.maxItem,
                maxItemPerGroup = this.options.maxItemPerGroup,
                hasDynamicFilters =
                    this.filters.dynamic && !this.helper.isEmpty(this.filters.dynamic),
                displayKeys,
                displayValue,
                missingDisplayKey = {},
                groupFilter,
                groupFilterResult,
                groupMatcher,
                groupMatcherResult,
                matcher =
                    typeof this.options.matcher === "function" && this.options.matcher,
                correlativeMatch,
                correlativeQuery,
                correlativeDisplay;

            if (this.options.accent) {
                comparedQuery = this.helper.removeAccent.call(this, comparedQuery);
            }

            for (var i = 0, ii = this.searchGroups.length; i < ii; ++i) {
                group = this.searchGroups[i];

                if (
                    this.filters.dropdown &&
                    this.filters.dropdown.key === "group" &&
                    this.filters.dropdown.value !== group
                )
                    continue;

                groupFilter =
                    typeof this.options.source[group].filter !== "undefined"
                        ? this.options.source[group].filter
                        : this.options.filter;
                groupMatcher =
                    (typeof this.options.source[group].matcher === "function" &&
                    this.options.source[group].matcher) ||
                    matcher;

                if (!this.source[group]) continue;

                for (var k = 0, kk = this.source[group].length; k < kk; k++) {
                    if (this.resultItemCount >= maxItem && !this.options.callback.onResult) break;
                    if (hasDynamicFilters && !this.dynamicFilter.validate.apply(this, [this.source[group][k]])) continue;

                    item = this.source[group][k];
                    // Validation over null item
                    if (item === null || typeof item === "boolean") continue;
                    if (this.options.multiselect && !this.isMultiselectUniqueData(item)) continue;

                    // dropdownFilter by custom groups
                    if (
                        this.filters.dropdown &&
                        (item[this.filters.dropdown.key] || "").toLowerCase() !==
                        (this.filters.dropdown.value || "").toLowerCase()
                    ) {
                        continue;
                    }

                    groupReference =
                        groupBy === "group"
                            ? group
                            : item[groupBy] ? item[groupBy] : item.group;

                    if (groupReference && !this.tmpResult[groupReference]) {
                        this.tmpResult[groupReference] = [];
                        this.resultCountPerGroup[groupReference] = 0;
                    }

                    if (maxItemPerGroup) {
                        if (
                            groupBy === "group" &&
                            this.tmpResult[groupReference].length >= maxItemPerGroup && !this.options.callback.onResult
                        ) {
                            break;
                        }
                    }

                    displayKeys = this.options.source[group].display || this.options.display;
                    for (var v = 0, vv = displayKeys.length; v < vv; ++v) {
                        // #286 option.filter: false shouldn't bother about the option.display keys
                        if (groupFilter !== false) {
                            // #183 Allow searching for deep source object keys
                            displayValue = /\./.test(displayKeys[v])
                                ? this.helper.namespace.call(this, displayKeys[v], item)
                                : item[displayKeys[v]];

                            // #182 Continue looping if empty or undefined key
                            if (typeof displayValue === "undefined" || displayValue === "") {
                                // {debug}
                                if (this.options.debug) {
                                    missingDisplayKey[v] = {
                                        display: displayKeys[v],
                                        data: item
                                    };
                                }
                                // {/debug}
                                continue;
                            }

                            displayValue = this.helper.cleanStringFromScript(displayValue);
                        }

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
                            if (displayValue === null) continue;

                            comparedDisplay = displayValue;
                            comparedDisplay = comparedDisplay.toString().toLowerCase();

                            if (this.options.accent) {
                                comparedDisplay = this.helper.removeAccent.call(
                                    this,
                                    comparedDisplay
                                );
                            }

                            match = comparedDisplay.indexOf(comparedQuery);

                            if (
                                this.options.correlativeTemplate &&
                                displayKeys[v] === "compiled" &&
                                match < 0 &&
                                /\s/.test(comparedQuery)
                            ) {
                                correlativeMatch = true;
                                correlativeQuery = comparedQuery.split(" ");
                                correlativeDisplay = comparedDisplay;
                                for (var x = 0, xx = correlativeQuery.length; x < xx; x++) {
                                    if (correlativeQuery[x] === "") continue;
                                    if (!~correlativeDisplay.indexOf(correlativeQuery[x])) {
                                        correlativeMatch = false;
                                        break;
                                    }
                                    correlativeDisplay = correlativeDisplay.replace(
                                        correlativeQuery[x],
                                        ""
                                    );
                                }
                            }

                            if (match < 0 && !correlativeMatch) continue;
                            if (this.options.offset && match !== 0) continue;

                            if (groupMatcher) {
                                groupMatcherResult = groupMatcher.call(
                                    this,
                                    item,
                                    displayValue
                                );

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

                        if (this.resultItemCount < maxItem) {
                            if (
                                maxItemPerGroup &&
                                this.tmpResult[groupReference].length >= maxItemPerGroup
                            ) {
                                break;
                            }

                            this.tmpResult[groupReference].push(
                                $.extend(true, {matchedKey: displayKeys[v]}, item)
                            );
                            this.resultItemCount++;
                        }
                        break;
                    }

                    if (!this.options.callback.onResult) {
                        if (this.resultItemCount >= maxItem) {
                            break;
                        }
                        if (
                            maxItemPerGroup &&
                            this.tmpResult[groupReference].length >= maxItemPerGroup
                        ) {
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
                        node: this.selector,
                        function: "searchResult()",
                        arguments: JSON.stringify(missingDisplayKey),
                        message: "Missing keys for display, make sure options.display is set properly."
                    });

                    _debug.print();
                }
            }
            // {/debug}

            if (this.options.order) {
                var displayKeys = [],
                    displayKey;

                for (var group in this.tmpResult) {
                    if (!this.tmpResult.hasOwnProperty(group)) continue;
                    for (var i = 0, ii = this.tmpResult[group].length; i < ii; i++) {
                        displayKey =
                            this.options.source[this.tmpResult[group][i].group].display ||
                            this.options.display;
                        if (!~displayKeys.indexOf(displayKey[0])) {
                            displayKeys.push(displayKey[0]);
                        }
                    }
                    this.tmpResult[group].sort(
                        scope.helper.sort(
                            displayKeys,
                            scope.options.order === "asc",
                            function (a) {
                                if (a) {
                                    return a.toString().toUpperCase();
                                } else {
                                    return "";
                                }
                            }
                        )
                    );
                }
            }

            var concatResults = [],
                groupOrder = [];

            if (typeof this.options.groupOrder === "function") {
                groupOrder = this.options.groupOrder.apply(this, [
                    this.node,
                    this.query,
                    this.tmpResult,
                    this.resultCount,
                    this.resultCountPerGroup
                ]);
            } else if (Array.isArray(this.options.groupOrder)) {
                groupOrder = this.options.groupOrder;
            } else if (
                typeof this.options.groupOrder === "string" && ~["asc", "desc"].indexOf(this.options.groupOrder)
            ) {
                groupOrder = Object.keys(this.tmpResult).sort(
                    scope.helper.sort([], scope.options.groupOrder === "asc", function (a) {
                        return a.toString().toUpperCase();
                    })
                );
            } else {
                groupOrder = Object.keys(this.tmpResult);
            }

            for (var i = 0, ii = groupOrder.length; i < ii; i++) {
                concatResults = concatResults.concat(this.tmpResult[groupOrder[i]] || []);
            }

            // #286 groupTemplate option was deleting group reference Array
            this.groups = JSON.parse(JSON.stringify(groupOrder));

            this.result = concatResults;
        },

        buildLayout: function () {
            this.buildHtmlLayout();

            this.buildBackdropLayout();

            this.buildHintLayout();

            if (this.options.callback.onLayoutBuiltBefore) {
                this.tmpResultHtml = this.helper.executeCallback.call(
                    this,
                    this.options.callback.onLayoutBuiltBefore,
                    [this.node, this.query, this.result, this.resultHtml]
                );
            }

            if (this.tmpResultHtml instanceof $) {
                this.resultContainer.html(this.tmpResultHtml);
            } else if (this.resultHtml instanceof $) {
                this.resultContainer.html(this.resultHtml);
            }

            if (this.options.callback.onLayoutBuiltAfter) {
                this.helper.executeCallback.call(
                    this,
                    this.options.callback.onLayoutBuiltAfter,
                    [this.node, this.query, this.result]
                );
            }
        },

        buildHtmlLayout: function () {
            // #150 Add the option to have no resultList but still perform the search and trigger the callbacks
            if (this.options.resultContainer === false) return;

            if (!this.resultContainer) {
                this.resultContainer = $("<div/>", {
                    class: this.options.selector.result
                });

                this.container.append(this.resultContainer);
            }

            var emptyTemplate;
            if (!this.result.length && this.generatedGroupCount === this.generateGroups.length) {
                if (
                    this.options.multiselect &&
                    this.options.multiselect.limit &&
                    this.items.length >= this.options.multiselect.limit
                ) {
                    if (this.options.multiselect.limitTemplate) {
                        emptyTemplate =
                            typeof this.options.multiselect.limitTemplate === "function"
                                ? this.options.multiselect.limitTemplate.call(this, this.query)
                                : this.options.multiselect.limitTemplate.replace(
                                    /\{\{query}}/gi,
                                    $("<div>")
                                        .text(this.helper.cleanStringFromScript(this.query))
                                        .html()
                                );
                    } else {
                        emptyTemplate =
                            "Can't select more than " + this.items.length + " items.";
                    }
                } else if (this.options.emptyTemplate && this.query !== "") {
                    emptyTemplate =
                        typeof this.options.emptyTemplate === "function"
                            ? this.options.emptyTemplate.call(this, this.query)
                            : this.options.emptyTemplate.replace(
                                /\{\{query}}/gi,
                                $("<div>")
                                    .text(this.helper.cleanStringFromScript(this.query))
                                    .html()
                            );
                } else {
                    return;
                }
            }
            this.displayEmptyTemplate = !!emptyTemplate;

            var _query = this.query.toLowerCase();
            if (this.options.accent) {
                _query = this.helper.removeAccent.call(this, _query);
            }

            var scope = this,
                groupTemplate = this.groupTemplate || "<ul></ul>",
                hasEmptyTemplate = false;

            if (this.groupTemplate) {
                groupTemplate = $(
                    groupTemplate.replace(
                        /<([^>]+)>\{\{(.+?)}}<\/[^>]+>/g,
                        function (match, tag, group, offset, string) {
                            var template = "",
                                groups = group === "group" ? scope.groups : [group];

                            if (!scope.result.length) {
                                if (hasEmptyTemplate === true) return "";
                                hasEmptyTemplate = true;

                                return (
                                    "<" + tag + ' class="' + scope.options.selector.empty + '">' + emptyTemplate + "</" + tag + ">"
                                );
                            }

                            for (var i = 0, ii = groups.length; i < ii; ++i) {
                                template += "<" + tag + ' data-group-template="' + groups[i] + '"><ul></ul></' + tag + ">";
                            }

                            return template;
                        }
                    )
                );
            } else {
                groupTemplate = $(groupTemplate);
                if (!this.result.length) {
                    groupTemplate.append(
                        emptyTemplate instanceof $
                            ? emptyTemplate
                            : '<li class="' +
                            scope.options.selector.empty +
                            '">' +
                            emptyTemplate +
                            "</li>"
                    );
                }
            }

            groupTemplate.addClass(
                this.options.selector.list +
                (this.helper.isEmpty(this.result) ? " empty" : "")
            );

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
                _unusedGroups =
                    (this.groupTemplate && this.result.length && scope.groups) || [],
                _tmpIndexOf;

            for (var i = 0, ii = this.result.length; i < ii; ++i) {
                _item = this.result[i];
                _group = _item.group;
                _href =
                    (!this.options.multiselect &&
                    this.options.source[_item.group].href) ||
                    this.options.href;
                _display = [];
                _displayKeys =
                    this.options.source[_item.group].display || this.options.display;

                if (this.options.group) {
                    _group = _item[this.options.group.key];
                    if (this.options.group.template) {
                        if (typeof this.options.group.template === "function") {
                            _groupTemplate = this.options.group.template.call(this, _item);
                        } else if (typeof this.options.group.template === "string") {
                            _groupTemplate = this.options.group.template.replace(
                                /\{\{([\w\-\.]+)}}/gi,
                                function (match, index) {
                                    return scope.helper.namespace.call(
                                        scope,
                                        index,
                                        _item,
                                        "get",
                                        ""
                                    );
                                }
                            );
                        }
                    }

                    if (!groupTemplate.find('[data-search-group="' + _group + '"]')[0]) {
                        (this.groupTemplate
                            ? groupTemplate.find('[data-group-template="' + _group + '"] ul')
                            : groupTemplate).append(
                            $("<li/>", {
                                class: scope.options.selector.group,
                                html: $("<a/>", {
                                    href: "javascript:;",
                                    html: _groupTemplate || _group,
                                    tabindex: -1
                                }),
                                "data-search-group": _group
                            })
                        );
                    }
                }

                if (this.groupTemplate && _unusedGroups.length) {
                    _tmpIndexOf = _unusedGroups.indexOf(_group || _item.group);
                    if (~_tmpIndexOf) {
                        _unusedGroups.splice(_tmpIndexOf, 1);
                    }
                }

                _liHtml = $("<li/>", {
                    class: scope.options.selector.item + " " + scope.options.selector.group + "-" + this.helper.slugify.call(this, _group),
                    disabled: _item.disabled ? true : false,
                    "data-group": _group,
                    "data-index": i,
                    html: $("<a/>", {
                        href: _href && !_item.disabled
                            ? (function (href, item) {
                                return item.href = scope.generateHref.call(
                                    scope,
                                    href,
                                    item
                                );
                            })(_href, _item)
                            : "javascript:;",
                        html: function () {
                            _template =
                                (_item.group && scope.options.source[_item.group].template) ||
                                scope.options.template;

                            if (_template) {
                                if (typeof _template === "function") {
                                    _template = _template.call(scope, scope.query, _item);
                                }

                                _aHtml = _template.replace(
                                    /\{\{([^\|}]+)(?:\|([^}]+))*}}/gi,
                                    function (match, index, options) {
                                        var value = scope.helper.cleanStringFromScript(
                                            String(
                                                scope.helper.namespace.call(
                                                    scope,
                                                    index,
                                                    _item,
                                                    "get",
                                                    ""
                                                )
                                            )
                                        );

                                        // #151 Slugify should be an option, not enforced
                                        options = (options && options.split("|")) || [];
                                        if (~options.indexOf("slugify")) {
                                            value = scope.helper.slugify.call(scope, value);
                                        }

                                        if (!~options.indexOf("raw")) {
                                            if (
                                                scope.options.highlight === true &&
                                                _query && ~_displayKeys.indexOf(index)
                                            ) {
                                                value = scope.helper.highlight.call(
                                                    scope,
                                                    value,
                                                    _query.split(" "),
                                                    scope.options.accent
                                                );
                                            }
                                        }
                                        return value;
                                    }
                                );
                            } else {
                                for (var i = 0, ii = _displayKeys.length; i < ii; i++) {
                                    _displayValue = /\./.test(_displayKeys[i])
                                        ? scope.helper.namespace.call(
                                            scope,
                                            _displayKeys[i],
                                            _item,
                                            "get",
                                            ""
                                        )
                                        : _item[_displayKeys[i]];

                                    if (
                                        typeof _displayValue === "undefined" ||
                                        _displayValue === ""
                                    )
                                        continue;

                                    _display.push(_displayValue);
                                }

                                _aHtml =
                                    '<span class="' +
                                    scope.options.selector.display +
                                    '">' +
                                    scope.helper.cleanStringFromScript(
                                        String(_display.join(" "))
                                    ) +
                                    "</span>";
                            }

                            if (
                                (scope.options.highlight === true && _query && !_template) ||
                                scope.options.highlight === "any"
                            ) {
                                _aHtml = scope.helper.highlight.call(
                                    scope,
                                    _aHtml,
                                    _query.split(" "),
                                    scope.options.accent
                                );
                            }

                            $(this).append(_aHtml);
                        }
                    })
                });

                (function (i, item, liHtml) {
                    liHtml.on("click", function (e, originalEvent) {
                        if (item.disabled) {
                            e.preventDefault();
                            return;
                        }

                        // #208 - Attach "keyboard Enter" original event
                        if (originalEvent && typeof originalEvent === "object") {
                            e.originalEvent = originalEvent;
                        }

                        if (scope.options.mustSelectItem && scope.helper.isEmpty(item)) {
                            e.preventDefault();
                            return;
                        }

                        if (!scope.options.multiselect) {
                            scope.item = item;
                        }

                        if (
                            scope.helper.executeCallback.call(
                                scope,
                                scope.options.callback.onClickBefore,
                                [scope.node, $(this), item, e]
                            ) === false
                        ) return;

                        if (
                            (e.originalEvent && e.originalEvent.defaultPrevented) ||
                            e.isDefaultPrevented()
                        ) return;

                        if (scope.options.multiselect) {
                            scope.query = scope.rawQuery = "";
                            scope.addMultiselectItemLayout(item);
                        } else {
                            scope.focusOnly = true;
                            scope.query = scope.rawQuery = scope.getTemplateValue.call(scope, item);;
                            if (scope.isContentEditable) {
                                scope.node.text(scope.query);
                                scope.helper.setCaretAtEnd(scope.node[0]);
                            }
                        }

                        scope.hideLayout();

                        scope.node
                            .val(scope.query)
                            .focus();

                        scope.options.cancelButton &&
                            scope.toggleCancelButtonVisibility();

                        scope.helper.executeCallback.call(
                            scope,
                            scope.options.callback.onClickAfter,
                            [scope.node, $(this), item, e]
                        );
                    });
                    liHtml.on("mouseenter", function (e) {
                        if (!item.disabled) {
                            scope.clearActiveItem();
                            scope.addActiveItem($(this));
                        }
                        scope.helper.executeCallback.call(
                            scope,
                            scope.options.callback.onEnter,
                            [scope.node, $(this), item, e]
                        );
                    });
                    liHtml.on("mouseleave", function (e) {
                        if (!item.disabled) {
                            scope.clearActiveItem();
                        }
                        scope.helper.executeCallback.call(
                            scope,
                            scope.options.callback.onLeave,
                            [scope.node, $(this), item, e]
                        );
                    });
                })(i, _item, _liHtml);

                (this.groupTemplate
                    ? groupTemplate.find('[data-group-template="' + _group + '"] ul')
                    : groupTemplate).append(_liHtml);
            }

            if (this.result.length && _unusedGroups.length) {
                for (var i = 0, ii = _unusedGroups.length; i < ii; ++i) {
                    groupTemplate
                        .find('[data-group-template="' + _unusedGroups[i] + '"]')
                        .remove();
                }
            }

            this.resultHtml = groupTemplate;
        },

        generateHref: function (href, item) {
            var scope = this;

            if (typeof href === "string") {
                href = href.replace(
                    /\{\{([^\|}]+)(?:\|([^}]+))*}}/gi,
                    function (match, index, options) {
                        var value = scope.helper.namespace.call(
                            scope,
                            index,
                            item,
                            "get",
                            ""
                        );

                        // #151 Slugify should be an option, not enforced
                        options = (options && options.split("|")) || [];
                        if (~options.indexOf("slugify")) {
                            value = scope.helper.slugify.call(scope, value);
                        }

                        return value;
                    }
                );
            } else if (typeof href === "function") {
                href = href.call(this, item);
            }

            return href;
        },

        getMultiselectComparedData: function (item) {
            var uniqueComparedItem = "";
            if (Array.isArray(this.options.multiselect.matchOn)) {
                for (
                    var i = 0, ii = this.options.multiselect.matchOn.length;
                    i < ii;
                    ++i
                ) {
                    uniqueComparedItem +=
                        typeof item[this.options.multiselect.matchOn[i]] !== "undefined"
                            ? item[this.options.multiselect.matchOn[i]]
                            : "";
                }
            } else {
                var tmpItem = JSON.parse(JSON.stringify(item)),
                    extraKeys = ["group", "matchedKey", "compiled", "href"];

                for (var i = 0, ii = extraKeys.length; i < ii; ++i) {
                    delete tmpItem[extraKeys[i]];
                }
                uniqueComparedItem = JSON.stringify(tmpItem);
            }
            return uniqueComparedItem;
        },

        buildBackdropLayout: function () {
            if (!this.options.backdrop) return;

            if (!this.backdrop.container) {
                this.backdrop.css = $.extend(
                    {
                        opacity: 0.6,
                        filter: "alpha(opacity=60)",
                        position: "fixed",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        "z-index": 1040,
                        "background-color": "#000"
                    },
                    this.options.backdrop
                );

                this.backdrop.container = $("<div/>", {
                    class: this.options.selector.backdrop,
                    css: this.backdrop.css
                }).insertAfter(this.container);
            }
            this.container.addClass("backdrop").css({
                "z-index": this.backdrop.css["z-index"] + 1,
                position: "relative"
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

            if (this.searchGroups.length) {
                if (!this.hint.container) {
                    this.hint.css = $.extend(
                        {
                            "border-color": "transparent",
                            position: "absolute",
                            top: 0,
                            display: "inline",
                            "z-index": -1,
                            float: "none",
                            color: "silver",
                            "box-shadow": "none",
                            cursor: "default",
                            "-webkit-user-select": "none",
                            "-moz-user-select": "none",
                            "-ms-user-select": "none",
                            "user-select": "none"
                        },
                        this.options.hint
                    );

                    this.hint.container = $("<" + this.node[0].nodeName + "/>", {
                        type: this.node.attr("type"),
                        class: this.node.attr("class"),
                        readonly: true,
                        unselectable: "on",
                        "aria-hidden": "true",
                        tabindex: -1,
                        click: function () {
                            // IE8 Fix
                            scope.node.focus();
                        }
                    })
                        .addClass(this.options.selector.hint)
                        .css(this.hint.css)
                        .insertAfter(this.node);

                    this.node.parent().css({
                        position: "relative"
                    });
                }

                this.hint.container.css("color", this.hint.css.color);

                // Do not display hint for empty query
                if (query) {
                    var _displayKeys, _group, _comparedValue;

                    for (var i = 0, ii = result.length; i < ii; i++) {
                        if (result[i].disabled) continue;

                        _group = result[i].group;
                        _displayKeys =
                            this.options.source[_group].display || this.options.display;

                        for (var k = 0, kk = _displayKeys.length; k < kk; k++) {
                            _comparedValue = String(result[i][_displayKeys[k]]).toLowerCase();
                            if (this.options.accent) {
                                _comparedValue = this.helper.removeAccent.call(
                                    this,
                                    _comparedValue
                                );
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

                var hintValue =
                    (hint.length > 0 &&
                    this.rawQuery + hint.substring(this.query.length)) ||
                    "";
                this.hint.container.val(hintValue);

                if (this.isContentEditable) {
                    this.hint.container.text(hintValue);
                }
            }
        },

        buildDropdownLayout: function () {
            if (!this.options.dropdownFilter) return;

            var scope = this;

            $("<span/>", {
                class: this.options.selector.filter,
                html: function () {
                    $(this).append(
                        $("<button/>", {
                            type: "button",
                            class: scope.options.selector.filterButton,
                            style: "display: none;",
                            click: function () {
                                scope.container.toggleClass("filter");

                                var _ns = scope.namespace + "-dropdown-filter";

                                $("html").off(_ns);

                                if (scope.container.hasClass("filter")) {
                                    $("html").on("click" + _ns + " touchend" + _ns, function (e) {
                                        if (
                                            ($(e.target).closest(
                                                "." + scope.options.selector.filter
                                            )[0] &&
                                            $(e.target).closest(scope.container)[0]) ||
                                            scope.hasDragged
                                        )
                                            return;
                                        scope.container.removeClass("filter");

                                        $("html").off(_ns);
                                    });
                                }
                            }
                        })
                    );

                    $(this).append(
                        $("<ul/>", {
                            class: scope.options.selector.dropdown
                        })
                    );
                }
            }).insertAfter(scope.container.find("." + scope.options.selector.query));
        },

        buildDropdownItemLayout: function (type) {
            if (!this.options.dropdownFilter) return;

            var scope = this,
                template,
                all =
                    (typeof this.options.dropdownFilter === "string" &&
                    this.options.dropdownFilter) ||
                    "All",
                ulScope = this.container.find("." + this.options.selector.dropdown),
                filter;

            // Use regular groups defined in options.source
            if (
                type === "static" &&
                (this.options.dropdownFilter === true ||
                typeof this.options.dropdownFilter === "string")
            ) {
                this.dropdownFilter.static.push({
                    key: "group",
                    template: "{{group}}",
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
                    if (k === kk && i !== ii - 1) {
                        continue;
                    } else if (k === kk && i === ii - 1) {
                        if (type === "static" && this.dropdownFilter.dynamic.length) {
                            continue;
                        }
                    }

                    template = this.dropdownFilterAll || all;
                    if (filter.value[k]) {
                        if (filter.template) {
                            template = filter.template.replace(
                                new RegExp("{{" + filter.key + "}}", "gi"),
                                filter.value[k]
                            );
                        } else {
                            template = filter.value[k];
                        }
                    } else {
                        this.container
                            .find("." + scope.options.selector.filterButton)
                            .html(template);
                    }

                    (function (k, filter, template) {
                        ulScope.append(
                            $("<li/>", {
                                class: scope.options.selector.dropdownItem +
                                " " +
                                scope.helper.slugify.call(
                                    scope,
                                    filter.key + "-" + (filter.value[k] || all)
                                ),
                                html: $("<a/>", {
                                    href: "javascript:;",
                                    html: template,
                                    click: function (e) {
                                        e.preventDefault();
                                        _selectFilter.call(scope, {
                                            key: filter.key,
                                            value: filter.value[k] || "*",
                                            template: template
                                        });
                                    }
                                })
                            })
                        );
                    })(k, filter, template);
                }
            }

            if (this.dropdownFilter[type].length) {
                this.container
                    .find("." + scope.options.selector.filterButton)
                    .removeAttr("style");
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
                    .removeClass("filter")
                    .find("." + this.options.selector.filterButton)
                    .html(item.template);

                this.isDropdownEvent = true;
                this.node.trigger("input" + this.namespace);

                if (this.options.multiselect) {
                    this.adjustInputSize();
                }

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
                    if (!!~key.indexOf(".")) {
                        itemValue = this.helper.namespace.call(this, key, item, "get");
                    } else {
                        itemValue = item[key];
                    }

                    if (this.filters.dynamic[key].modifier === "|" && !softValid) {
                        softValid = itemValue == this.filters.dynamic[key].value || false;
                    }

                    if (this.filters.dynamic[key].modifier === "&") {
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
                        modifier: matches[1] || "|",
                        value: value
                    };
                }

                if (this.dynamicFilter.isEnabled) {
                    this.generateSource();
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

                    if (
                        !(filter.selector instanceof $) || !filter.selector[0] || !filter.key
                    ) {
                        // {debug}
                        if (this.options.debug) {
                            _debug.log({
                                node: this.selector,
                                function: "buildDynamicLayout()",
                                message: 'Invalid jQuery selector or jQuery Object for "filter.selector" or missing filter.key'
                            });

                            _debug.print();
                        }
                        // {/debug}
                        continue;
                    }

                    (function (filter) {
                        filter.selector
                            .off(scope.namespace)
                            .on("change" + scope.namespace, function () {
                                scope.dynamicFilter.set.apply(scope, [
                                    filter.key,
                                    scope.dynamicFilter.getValue(this)
                                ]);
                            })
                            .trigger("change" + scope.namespace);
                    })(filter);
                }
            },

            getValue: function (tag) {
                var value;
                if (tag.tagName === "SELECT") {
                    value = tag.value;
                } else if (tag.tagName === "INPUT") {
                    if (tag.type === "checkbox") {
                        value =
                            (tag.checked && tag.getAttribute("value")) || tag.checked || null;
                    } else if (tag.type === "radio" && tag.checked) {
                        value = tag.value;
                    }
                }
                return value;
            }
        },

        buildMultiselectLayout: function () {
            if (!this.options.multiselect) return;
            var scope = this;
            var multiselectData;

            this.label.container = $("<span/>", {
                class: this.options.selector.labelContainer,
                "data-padding-left": parseFloat(this.node.css("padding-left")) || 0,
                "data-padding-right": parseFloat(this.node.css("padding-right")) || 0,
                "data-padding-top": parseFloat(this.node.css("padding-top")) || 0,
                click: function (e) {
                    if ($(e.target).hasClass(scope.options.selector.labelContainer)) {
                        scope.node.focus();
                    }
                }
            });

            this.node
                .closest("." + this.options.selector.query)
                .prepend(this.label.container);

            if (!this.options.multiselect.data) return;

            if (Array.isArray(this.options.multiselect.data)) {
                this.populateMultiselectData(this.options.multiselect.data);
            } else if (typeof this.options.multiselect.data === 'function') {
                multiselectData = this.options.multiselect.data.call(this);
                if (Array.isArray(multiselectData)) {
                    this.populateMultiselectData(multiselectData);
                } else if (typeof multiselectData.promise === "function") {
                    $.when(multiselectData).then(function (deferredData) {
                        if (deferredData && Array.isArray(deferredData)) {
                            scope.populateMultiselectData(deferredData);
                        }
                    });
                }
            }
        },

        isMultiselectUniqueData: function (data) {
            var isUniqueData = true;
            for (var x = 0, xx = this.comparedItems.length; x < xx; ++x) {
                if (
                    this.comparedItems[x] ===
                    this.getMultiselectComparedData(data)
                ) {
                    isUniqueData = false;
                    break;
                }
            }
            return isUniqueData;
        },

        populateMultiselectData: function (data) {
            for (var i = 0, ii = data.length; i < ii; ++i) {
                this.addMultiselectItemLayout(data[i]);
            }

            this.node.trigger("search" + this.namespace, { origin: 'populateMultiselectData' });
        },

        addMultiselectItemLayout: function (item) {
            if (!this.isMultiselectUniqueData(item)) return;

            this.items.push(item);
            this.comparedItems.push(
                this.getMultiselectComparedData(item)
            );

            var templateValue = this.getTemplateValue(item);

            var scope = this,
                htmlTag = this.options.multiselect.href ? "a" : "span";

            var label = $("<span/>", {
                class: this.options.selector.label,
                html: $("<" + htmlTag + "/>", {
                    text: templateValue,
                    click: function (e) {
                        var currentLabel = $(this).closest(
                                "." + scope.options.selector.label
                            ),
                            index = scope.label.container
                                .find("." + scope.options.selector.label)
                                .index(currentLabel);

                        scope.options.multiselect.callback && scope.helper.executeCallback.call(
                            scope,
                            scope.options.multiselect.callback.onClick,
                            [scope.node, scope.items[index], e]
                        );
                    },
                    href: this.options.multiselect.href
                        ? (function (item) {
                            return scope.generateHref.call(
                                scope,
                                scope.options.multiselect.href,
                                item
                            );
                        })(scope.items[scope.items.length - 1])
                        : null
                })
            });

            label.append(
                $("<span/>", {
                    class: this.options.selector.cancelButton,
                    html: "×",
                    click: function (e) {
                        var label = $(this).closest(
                                "." + scope.options.selector.label
                            ),
                            index = scope.label.container
                                .find("." + scope.options.selector.label)
                                .index(label);

                        scope.cancelMultiselectItem(index, label, e);
                    }
                })
            );

            this.label.container.append(label);
            this.adjustInputSize();

            return true;
        },

        cancelMultiselectItem: function (index, label, e) {
            var item = this.items[index];

            label = label
                || this.label.container
                    .find('.' + this.options.selector.label)
                    .eq(index);

            label.remove();

            this.items.splice(index, 1);
            this.comparedItems.splice(index, 1);

            this.options.multiselect.callback && this.helper.executeCallback.call(
                this,
                this.options.multiselect.callback.onCancel,
                [this.node, item, e]
            );

            this.adjustInputSize();

            this.focusOnly = true;
            this.node.focus().trigger('input' + this.namespace, { origin: 'cancelMultiselectItem' });
        },

        adjustInputSize: function () {
            var nodeWidth =
                this.node[0].getBoundingClientRect().width -
                (parseFloat(this.label.container.data("padding-right")) || 0) -
                (parseFloat(this.label.container.css("padding-left")) || 0);

            var labelOuterWidth = 0,
                numberOfRows = 0,
                currentRowWidth = 0,
                isRowAdded = false,
                labelOuterHeight = 0;

            this.label.container
                .find("." + this.options.selector.label)
                .filter(function (i, v) {
                    if (i === 0) {
                        labelOuterHeight =
                            $(v)[0].getBoundingClientRect().height +
                            parseFloat($(v).css("margin-bottom") || 0);
                    }

                    // labelOuterWidth = Math.round($(v)[0].getBoundingClientRect().width * 100) / 100 + parseFloat($(v).css('margin-right'));
                    labelOuterWidth =
                        $(v)[0].getBoundingClientRect().width +
                        parseFloat($(v).css("margin-right") || 0);

                    if (
                        currentRowWidth + labelOuterWidth > nodeWidth * 0.7 && !isRowAdded
                    ) {
                        numberOfRows++;
                        isRowAdded = true;
                    }

                    if (currentRowWidth + labelOuterWidth < nodeWidth) {
                        currentRowWidth += labelOuterWidth;
                    } else {
                        isRowAdded = false;
                        currentRowWidth = labelOuterWidth;
                    }
                });

            var paddingLeft =
                parseFloat(this.label.container.data("padding-left") || 0) +
                (isRowAdded ? 0 : currentRowWidth);
            var paddingTop =
                numberOfRows * labelOuterHeight +
                parseFloat(this.label.container.data("padding-top") || 0);

            this.container
                .find("." + this.options.selector.query)
                .find("input, textarea, [contenteditable], .typeahead__hint")
                .css({
                    paddingLeft: paddingLeft,
                    paddingTop: paddingTop
                });
        },

        showLayout: function () {
            if (this.container.hasClass("result") ||
                (
                    !this.result.length && !this.displayEmptyTemplate && !this.options.backdropOnFocus
                )
            ) return;

            _addHtmlListeners.call(this);

            this.container.addClass(
                [
                    this.result.length ||
                    (this.searchGroups.length &&
                    this.displayEmptyTemplate)
                        ? "result "
                        : "",
                    this.options.hint && this.searchGroups.length ? "hint" : "",
                    this.options.backdrop || this.options.backdropOnFocus
                        ? "backdrop"
                        : ""
                ].join(" ")
            );

            this.helper.executeCallback.call(
                this,
                this.options.callback.onShowLayout,
                [this.node, this.query]
            );

            function _addHtmlListeners() {
                var scope = this;

                // If Typeahead is blured by pressing the "Tab" Key, hide the results
                $("html")
                    .off("keydown" + this.namespace)
                    .on("keydown" + this.namespace, function (e) {
                        if (!e.keyCode || e.keyCode !== 9) return;
                        setTimeout(function () {
                            if (
                                !$(":focus")
                                    .closest(scope.container)
                                    .find(scope.node)[0]
                            ) {
                                scope.hideLayout();
                            }
                        }, 0);
                    });

                // If Typeahead is blured by clicking outside, hide the results
                $("html")
                    .off("click" + this.namespace + " touchend" + this.namespace)
                    .on("click" + this.namespace + " touchend" + this.namespace, function (e) {
                        if ($(e.target).closest(scope.container)[0] ||
                            $(e.target).closest('.' + scope.options.selector.item)[0] ||
                            e.target.className === scope.options.selector.cancelButton ||
                            scope.hasDragged
                        ) return;

                        scope.hideLayout();
                    });
            }
        },

        hideLayout: function () {
            // Means the container is already hidden
            if (!this.container.hasClass("result") && !this.container.hasClass("backdrop")) return;

            this.container.removeClass(
                "result hint filter" +
                (this.options.backdropOnFocus && $(this.node).is(":focus")
                    ? ""
                    : " backdrop")
            );

            if (this.options.backdropOnFocus && this.container.hasClass("backdrop"))
                return;

            // Make sure the event HTML gets cleared
            $("html").off(this.namespace);

            this.helper.executeCallback.call(
                this,
                this.options.callback.onHideLayout,
                [this.node, this.query]
            );
        },

        resetLayout: function () {
            this.result = [];
            this.tmpResult = {};
            this.groups = [];
            this.resultCount = 0;
            this.resultCountPerGroup = {};
            this.resultItemCount = 0;
            this.resultHtml = null;

            if (this.options.hint && this.hint.container) {
                this.hint.container.val("");
                if (this.isContentEditable) {
                    this.hint.container.text("");
                }
            }
        },

        resetInput: function () {
            this.node.val("");
            if (this.isContentEditable) {
                this.node.text("");
            }
            this.query = "";
            this.rawQuery = "";
        },

        buildCancelButtonLayout: function () {
            if (!this.options.cancelButton) return;
            var scope = this;

            $("<span/>", {
                class: this.options.selector.cancelButton,
                html: "×",
                mousedown: function (e) {
                    // Don't blur the input
                    e.stopImmediatePropagation();
                    e.preventDefault();

                    scope.resetInput();
                    scope.node.trigger("input" + scope.namespace, [e]);
                }
            }).insertBefore(this.node);
        },

        toggleCancelButtonVisibility: function () {
            this.container.toggleClass("cancel", !!this.query.length);
        },

        __construct: function () {
            this.extendOptions();

            if (!this.unifySourceFormat()) {
                return;
            }

            this.dynamicFilter.init.apply(this);

            this.init();
            this.buildDropdownLayout();
            this.buildDropdownItemLayout("static");

            this.buildMultiselectLayout();

            this.delegateEvents();
            this.buildCancelButtonLayout();

            this.helper.executeCallback.call(this, this.options.callback.onReady, [
                this.node
            ]);
        },

        helper: {
            isEmpty: function (obj) {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) return false;
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

                var accent = _accent;

                if (typeof this.options.accent === "object") {
                    accent = this.options.accent;
                }

                string = string
                    .toLowerCase()
                    .replace(new RegExp("[" + accent.from + "]", "g"), function (match) {
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
                    string = string
                        .replace(/[^-a-z0-9]+/g, "-")
                        .replace(/-+/g, "-")
                        .replace(/^-|-$/g, "");
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
                        if (typeof x[field[i]] !== "undefined") {
                            return primer(x[field[i]]);
                        }
                    }
                    return x;
                };

                reverse = [-1, 1][+!!reverse];

                return function (a, b) {
                    return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
                };
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
                return (
                    string.substring(0, offset) +
                    replace +
                    string.substring(offset + length)
                );
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

                var searchString =
                        (accents && this.helper.removeAccent.call(this, string)) || string,
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
                    keys[i] = keys[i].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                }

                searchString.replace(
                    new RegExp("(?:" + keys.join("|") + ")(?!([^<]+)?>)", "gi"),
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
                        "<strong>" +
                        string.substr(matches[i].offset, matches[i].length) +
                        "</strong>"
                    );
                }

                return string;
            },

            /**
             * Get caret position, used for right arrow navigation
             * when hint option is enabled
             * @param {Node} element
             * @returns {Number} Caret position
             */
            getCaret: function (element) {
                var caretPos = 0;

                if (element.selectionStart) {
                    // Input & Textarea
                    return element.selectionStart;
                } else if (document.selection) {
                    var r = document.selection.createRange();
                    if (r === null) {
                        return caretPos;
                    }

                    var re = element.createTextRange(),
                        rc = re.duplicate();
                    re.moveToBookmark(r.getBookmark());
                    rc.setEndPoint("EndToStart", re);

                    caretPos = rc.text.length;
                } else if (window.getSelection) {
                    // Contenteditable
                    var sel = window.getSelection();
                    if (sel.rangeCount) {
                        var range = sel.getRangeAt(0);
                        if (range.commonAncestorContainer.parentNode == element) {
                            caretPos = range.endOffset;
                        }
                    }
                }
                return caretPos;
            },

            /**
             * For [contenteditable] typeahead node only,
             * when an item is clicked set the cursor at the end
             * @param {Node} element
             */
            setCaretAtEnd: function (element) {
                if (
                    typeof window.getSelection !== "undefined" &&
                    typeof document.createRange !== "undefined"
                ) {
                    var range = document.createRange();
                    range.selectNodeContents(element);
                    range.collapse(false);
                    var sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (typeof document.body.createTextRange !== "undefined") {
                    var textRange = document.body.createTextRange();
                    textRange.moveToElementText(element);
                    textRange.collapse(false);
                    textRange.select();
                }
            },

            /**
             * Clean strings from possible XSS (script and iframe tags)
             * @param string
             * @returns {string}
             */
            cleanStringFromScript: function (string) {
                return (
                    (typeof string === "string" &&
                    string.replace(/<\/?(?:script|iframe)\b[^>]*>/gm, "")) ||
                    string
                );
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

                    _callback = this.helper.namespace.call(this, callback[0], window);

                    if (typeof _callback !== "function") {
                        // {debug}
                        if (this.options.debug) {
                            _debug.log({
                                node: this.selector,
                                function: "executeCallback()",
                                arguments: JSON.stringify(callback),
                                message: 'WARNING - Invalid callback function"'
                            });

                            _debug.print();
                        }
                        // {/debug}
                        return;
                    }
                }

                return _callback.apply(
                    this,
                    (callback[1] || []).concat(extraParams ? extraParams : [])
                );
            },

            namespace: function (string, object, method, defaultValue) {
                if (typeof string !== "string" || string === "") {
                    // {debug}
                    if (this.options.debug) {
                        _debug.log({
                            node: this.options.input || this.selector,
                            function: "helper.namespace()",
                            arguments: string,
                            message: 'ERROR - Missing string"'
                        });

                        _debug.print();
                    }
                    // {/debug}
                    return false;
                }

                var value = typeof defaultValue !== "undefined"
                    ? defaultValue
                    : undefined;

                // Exit before looping if the string doesn't contain an object reference
                if (!~string.indexOf(".")) {
                    return object[string] || value;
                }

                var parts = string.split("."),
                    parent = object || window,
                    method = method || "get",
                    currentPart = "";

                for (var i = 0, length = parts.length; i < length; i++) {
                    currentPart = parts[i];

                    if (typeof parent[currentPart] === "undefined") {
                        if (~["get", "delete"].indexOf(method)) {
                            return typeof defaultValue !== "undefined"
                                ? defaultValue
                                : undefined;
                        }
                        parent[currentPart] = {};
                    }

                    if (~["set", "create", "delete"].indexOf(method)) {
                        if (i === length - 1) {
                            if (method === "set" || method === "create") {
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
                };
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
            if (!options || !options.source || typeof options.source !== "object") {
                // {debug}
                _debug.log({
                    node: node.selector || (options && options.input),
                    function: "$.typeahead()",
                    arguments: JSON.stringify((options && options.source) || ""),
                    message: 'Undefined "options" or "options.source" or invalid source type - Typeahead dropped'
                });

                _debug.print();
                // {/debug}

                return;
            }

            if (typeof node === "function") {
                if (!options.input) {
                    // {debug}
                    _debug.log({
                        node: node.selector,
                        function: "$.typeahead()",
                        //'arguments': JSON.stringify(options),
                        message: 'Undefined "options.input" - Typeahead dropped'
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
                    node: node.selector,
                    function: "$.typeahead()",
                    arguments: JSON.stringify(options.input),
                    message: "Unable to find jQuery input element - Typeahead dropped"
                });

                _debug.print();
                // {/debug}

                return;
            }
            if (typeof node[0].value === "undefined") {
                node[0].value = node.text();
            }

            // #270 Forcing node.selector, the property was deleted from jQuery3
            // In case of multiple init, each of the instances needs it's own selector!
            if (node.length === 1) {
                node[0].selector =
                    node.selector || options.input || node[0].nodeName.toLowerCase();

                /*jshint boss:true */
                return (window.Typeahead[node[0].selector] = new Typeahead(node, options));
            } else {
                var instances = {},
                    instanceName;

                for (var i = 0, ii = node.length; i < ii; ++i) {
                    instanceName = node[i].nodeName.toLowerCase();
                    if (typeof instances[instanceName] !== "undefined") {
                        instanceName += i;
                    }
                    node[i].selector = instanceName;

                    window.Typeahead[instanceName] = instances[instanceName] = new Typeahead(node.eq(i), options);
                }

                return instances;
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

            this.table[debugObject.message] = $.extend(
                {
                    node: "",
                    function: "",
                    arguments: ""
                },
                debugObject
            );
        },
        print: function () {
            if (
                Typeahead.prototype.helper.isEmpty(this.table) || !console || !console.table
            ) {
                return;
            }

            if (console.group !== undefined || console.table !== undefined) {
                console.groupCollapsed("--- jQuery Typeahead Debug ---");
                console.table(this.table);
                console.groupEnd();
            }

            this.table = {};
        }
    };
    _debug.log({
        message: "WARNING - You are using the DEBUG version. Use /dist/jquery.typeahead.min.js in production."
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
            return Object.prototype.toString.call(arg) === "[object Array]";
        };
    }

    if (!("trim" in String.prototype)) {
        String.prototype.trim = function () {
            return this.replace(/^\s+/, "").replace(/\s+$/, "");
        };
    }
    if (!("indexOf" in Array.prototype)) {
        Array.prototype.indexOf = function (find, i /*opt*/) {
            if (i === undefined) i = 0;
            if (i < 0) i += this.length;
            if (i < 0) i = 0;
            for (var n = this.length; i < n; i++)
                if (i in this && this[i] === find) return i;
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
});
