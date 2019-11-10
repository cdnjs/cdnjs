/**
 * jQuery Typeahead
 *
 * @author Tom Bertrand
 * @version 1.7.2 (2014-11-15)
 *
 * @copyright
 * Copyright (C) 2014 RunningCoder.
 *
 * @link
 * http://www.runningcoder.org/jquerytypeahead/
 *
 * @license
 * Licensed under the MIT license.
 *
 * @note
 * Remove debug code: //\s?\{debug\}[\s\S]*?\{/debug\}
 */
;(function (window, document, $, undefined)
{

    window.Typeahead = {
        source: {}
    };

    /**
     * Fail-safe preventExtensions function for older browsers
     */
    if (typeof Object.preventExtensions !== "function") {
        Object.preventExtensions = function (obj) { return obj; }
    }

    // Not using strict to avoid throwing a window error on bad config extend.
    // window.Debug function is used instead
    //"use strict";

    /**
     * @private
     * Default options
     *
     * @link http://www.runningcoder.org/jquerytypeahead/documentation/
     */
    var _options = {
        input: null,
        minLength: 2,
        maxItem: 8,
        dynamic: false,
        delay: 300,
        order: null,
        offset: false,
        hint: false,
        accent: false,
        highlight: true,
        list: false,
        group: false,
        groupMaxItem: false,
        filter: false,
        backdrop: false,
        cache: false,
        ttl: 3600000,
        compression: false,
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
            button: "typeahead-button",
            backdrop: "typeahead-backdrop",
            hint: "typeahead-hint"
        },
        display: "display",
        template: null,
        source: null,
        callback: {
            onInit: null,
            onResult: null,
            onMouseEnter: null,
            onMouseLeave: null,
            onClick: null,
            onSubmit: null
        },
        debug: false
    };

    /**
     * @private
     * Limit the supported options on matching keys
     */
    var _supported = {
        dynamic: [true, false],
        order: ["asc", "desc"],
        offset: [true, false],
        accent: [true, false],
        highlight: [true, false],
        cache: [true, false],
        compression: [true, false],
        debug: [true, false]
    };

    var _eventNamespace = ".typeahead.input";

    /**
     * @private
     * Accent equivalents
     */
    var _accent = {
        from:   "ãàáäâẽèéëêìíïîõòóöôùúüûñç",
        to:     "aaaaaeeeeeiiiiooooouuuunc"
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

        var query = "",         // user query
            isGenerated = null, // null: not yet generating, false: generating, true generated
            request = [],       // store the ajax requests / responses
            storage = [],       // generated source
            result = [],        // matched result(s) (source vs query)
            filter,             // matched result(s) (source vs query)
            container,          // the typeahead container
            backdrop = {},      // the backdrop object if enabled
            hint = {},          // the hint object if enabled
            timestamp = null,   // dynamic option timestamp
            jsonpCallback = "window.Typeahead.source['" + node.selector + "'].populate",
            counter = 0,        // generated source counter
            length = 0;         // source length

        /**
         * Extends user-defined "options" into the default Typeahead "_options".
         * Notes:
         *  - preventExtensions prevents from modifying the Typeahead "_options" object structure
         *  - filter through the "_supported" to delete unsupported "options"
         */
        function extendOptions () {

            for (var option in options) {
                if (!options.hasOwnProperty(option)) {
                    continue;
                }

                if (option === "source") {

                    // {debug}
                    if (JSON.stringify(options[option]) === "{}") {
                        options.debug && window.Debug.log({
                            'node': node.selector,
                            'function': 'extendOptions()',
                            'arguments': "{options.source}",
                            'message': 'ERROR - source.group.url or source.group.data is Required'
                        });
                    }
                    // {/debug}

                    for (var group in options[option]) {

                        if (!options[option].hasOwnProperty(group)) {
                            continue;
                        }

                        if (!(options[option][group] instanceof Object) || group === "data") {
                            group = "group";
                            options[option] = {
                                group: options[option]
                            };
                        }

                        // {debug}
                        if (!options[option][group].url && !options[option][group].data) {
                            _options.debug && window.Debug.log({
                                'node': node.selector,
                                'function': 'extendOptions()',
                                'arguments': "{options.source}",
                                'message': 'ERROR - source.group.url or source.group.data is Required'
                            });
                        }
                        // {/debug}
                    }

                } else if (_supported[option] && $.inArray(options[option], _supported[option]) === -1) {

                    // {debug}
                    options.debug && window.Debug.log({
                        'node': node.selector,
                        'function': 'extendOptions()',
                        'arguments': "{" + option + ":" + JSON.stringify(options[option]) + "}",
                        'message': 'WARNING - Unsupported option: ' + option
                    });
                    // {/debug}

                    delete options[option];

                }
            }

            // If the Typeahead is dynamic, force no cache & no compression
            if (options.dynamic) {
                options.cache = false;
                options.compression = false;
            }

            // Ensure Localstorage is available
            if (options.cache) {
                options.cache = (function () {
                    var supported = typeof window.localStorage !== "undefined";
                    if (supported) {
                        try {
                            localStorage.setItem("typeahead", "typeahead");
                            localStorage.removeItem("typeahead");
                        } catch (e) {
                            supported = false;
                        }
                    }
                    return supported;
                })();
            }

            options = $.extend(
                true,
                Object.preventExtensions(
                    $.extend(
                        true,
                        {},
                        _options
                    )
                ),
                options
            );

        }

        /**
         * Attach events to the search input to trigger the Typeahead Search
         */
        function delegateTypeahead () {

            _executeCallback(options.callback.onInit, [node]);

            // {debug}
            options.debug && window.Debug.log({
                'node': node.selector,
                'function': 'delegateTypeahead()',
                'arguments': JSON.stringify(options),
                'message': 'OK - Typeahead activated on ' + node.selector
            });
            // {/debug}

            container = node.parents('.' + options.selector.container);

            // Namespace events to avoid conflicts
            var event = [
                'focus' + _eventNamespace,
                'input' + _eventNamespace,
                'propertychange' + _eventNamespace, //propertychange IE <9
                'keydown' + _eventNamespace,
                'dynamic' + _eventNamespace
            ];

            $('html').on("click" + _eventNamespace, function(e) {
                reset();
            });

            container.on("click" + _eventNamespace, function(e) {

                e.stopPropagation();

                if (options.filter) {
                    container
                        .find('.' + options.selector.dropdown.replace(" ", "."))
                        .hide();
                }
            });

            node.parents('form').on("submit", function (e) {
                if (_executeCallback(options.callback.onSubmit, [node, this, e])) {
                    return false;
                }
            });
            node.on(event.join(' '), function (e) {

                switch (e.type) {
                    case "keydown":
                        if (e.keyCode && ~[9,13,27,38,39,40].indexOf(e.keyCode)) {
                            move(e);
                        }
                        break;
                    case "focus":
                        if (isGenerated === null) {
                            if (!options.dynamic) {
                                generate();
                            }
                        }
                        break;
                    case "input":
                    case "propertychange":
                        if (!isGenerated) {
                            if (options.dynamic) {

                                query = $(this).val().trim();

                                _typeWatch(function () {
                                    if (query.length >= options.minLength && query !== "") {
                                        generate();
                                    }
                                }, options.delay);
                            }
                            return;
                        }
                    case "dynamic":
                    default:

                        query = $(this).val().trim();

                        reset();

                        if (query.length >= options.minLength && query !== "") {
                            search();
                            buildHtml();
                        }
                        if (e.type === "dynamic" && options.dynamic) {
                            isGenerated = false;
                            counter = 0;
                        }
                        break;
                }

            });

        }

        /**
         * Search the source lists to match the search query, build the HTML and bind
         * the callbacks on the result(s) if they are set inside the configuration options.
         *
         * @returns {boolean}
         */
        function search () {

            if (query === "") {
                return false;
            }

            if (filter && !options.source[filter]) {
                filter = false;
            }

            var _display,
                _query = query,
                _resultCounter = 0,
                _groupMaxItem = /\d/.test(options.groupMaxItem) && options.groupMaxItem,
                _groupCounter;

            if (options.accent) {
                _query = _removeAccent(query);
            }

            for (var group in storage) {

                if (!storage.hasOwnProperty(group) || (filter && group !== filter)) {
                    continue;
                }

                if (_groupMaxItem) {
                    _groupCounter = 0;
                }

                for (var i in storage[group]) {

                    if (!storage[group].hasOwnProperty(i)) {
                        continue;
                    }

                    if ((result.length >= options.maxItem || (_groupMaxItem && _groupCounter >= _groupMaxItem)) && !options.callback.onResult) {
                        break;
                    }

                    if (options.source[group] &&
                        options.source[group].display) {

                        storage[group][i].display = storage[group][i][options.source[group].display];
                    } else {
                        storage[group][i].display = storage[group][i][options.display];
                    }

                    _display = storage[group][i].display;

                    if (!_display) {

                        // {debug}
                        options.debug && window.Debug.log({
                            'node': node.selector,
                            'function': 'search()',
                            'arguments': '{display: "' + options.display + '"}',
                            'message': 'WARNING - unable to find display: "' + options.display + '" inside ' + JSON.stringify(storage[group][i])
                        });
                        // {/debug}

                        continue;
                    }

                    if (options.accent) {
                        _display = _removeAccent(_display);
                    }

                    if (_display.toLowerCase().indexOf(_query.toLowerCase()) !== -1 && (
                        !options.offset ||
                        _display.toLowerCase().indexOf(_query.toLowerCase()) === 0
                        ))
                    {
                        if (options.source[group].ignore && ~options.source[group].ignore.indexOf(_display)) {
                            continue;
                        }

                        _resultCounter++;

                        if (options.callback.onResult && (result.length >= options.maxItem || (_groupMaxItem && _groupCounter >= _groupMaxItem))) {
                            continue;
                        }

                        storage[group][i].group = group;
                        result.push(storage[group][i]);



                        if (_groupMaxItem) {
                            _groupCounter++;
                        }
                    }
                }
            }

            // {debug}
            window.Debug.print();
            // {/debug}

            if (options.order) {
                result.sort(
                    _sort(
                        "display",
                        options.order === "asc",
                        function(a){return a.toUpperCase()}
                    )
                );
            }

            if (options.group) {

                var tmpResult = [];

                for (var group in storage) {
                    for (var k in result) {
                        if (result[k].group === group) {
                            tmpResult.push(result[k]);
                        }
                    }
                }

                result = tmpResult;

            }

            _executeCallback(options.callback.onResult, [node, query, result, _resultCounter]);

            return true;
        }

        /**
         * Builds the search result group html and delegate the callbacks
         *
         * @returns {boolean}
         */
        function buildHtml () {

            if (query === "" || result.length === 0) {
                return false;
            }

            var template = $("<div/>", {
                "class": options.selector.result,
                "html": $("<ul/>", {
                    "class": options.selector.list,
                    "html": function() {

                        for (var i in result) {

                            if (!result.hasOwnProperty(i)) {
                                continue;
                            }

                            (function (result, scope) {

                                var _group,
                                    _list,
                                    _liHtml,
                                    _aHtml,
                                    _display,
                                    _displayKey,
                                    _query,
                                    _offset,
                                    _match,
                                    _handle,
                                    _template;

                                if (options.group) {
                                    _group = result.group;
                                    if (typeof options.group !== "boolean" && result[options.group]) {
                                        _group = result[options.group];
                                    }
                                }

                                if (options.list) {
                                    _list = result.group;
                                    if (typeof options.list !== "boolean" && result[options.list]) {
                                        _list = result[options.list];
                                    }
                                }

                                if (options.group && !$(scope).find('li[data-search-group="' + _group + '"]')[0]) {
                                    $(scope).append(
                                        $("<li/>", {
                                            "class": options.selector.group,
                                            "html":  $("<a/>", {
                                                "html": _group
                                            }),
                                            "data-search-group": _group
                                        })
                                    );
                                }

                                _display = result.display.toLowerCase();
                                _query = query.toLowerCase();

                                if (options.accent) {
                                    _display = _removeAccent(_display);
                                    _query = _removeAccent(_query);
                                }

                                _offset = _display.indexOf(_query);
                                _match = result.display.substr(_offset, _query.length);

                                if (options.highlight) {
                                    _match = "<strong>" + _match + "</strong>";
                                }

                                _display = _replaceAt(result.display, _offset, _query.length, _match);

                                _liHtml = $("<li/>", {
                                    "html":  $("<a/>", {
                                        "href": "javascript:;",
                                        "data-group": _group,
                                        "html": function () {

                                            _template = (result.group && options.source[result.group].template) || options.template;

                                            if (_template) {

                                                _displayKey = (options.source[result.group] && options.source[result.group].display) || options.display;
                                                _aHtml = _template.replace(/\{\{([a-z0-9_\-]+)\}\}/gi, function (match, index, offset) {
                                                    if (index === _displayKey) {
                                                        return _display;
                                                    }
                                                    return result[index] || "null";
                                                });
                                            } else {
                                                _aHtml = '<span class="' + options.selector.display + '">' + _display + '</span>' +
                                                ((_list) ? "<small>" + _list + "</small>" : "");
                                            }

                                            $(this).append(_aHtml);

                                        },
                                        "click": ({"result": result}, function (e) {

                                            e.preventDefault();

                                            query = result.display;
                                            node.val(query).focus();
                                            reset();

                                            _executeCallback(options.callback.onClick, [node, this, result, e]);
                                        }),
                                        "mouseenter": function (e) {

                                            $(this).parent().siblings('li.active').removeClass('active');
                                            $(this).parent().addClass('active');

                                            _executeCallback(options.callback.onMouseEnter, [node, this, result, e]);
                                        },
                                        "mouseleave": function (e) {

                                            $(this).parent().removeClass('active');

                                            _executeCallback(options.callback.onMouseLeave, [node, this, result, e]);
                                        }
                                    })
                                });

                                if (options.group) {

                                    _handle = $(scope).find('a[data-group="' + _group + '"]:last').closest('li');
                                    if (!_handle[0]) {
                                        _handle = $(scope).find('li[data-search-group="' + _group + '"]');
                                    }
                                    $(_liHtml).insertAfter(_handle);

                                } else {
                                    $(scope).append(_liHtml);
                                }

                            }(result[i], this));
                        }

                    }
                })
            });

            container
                .addClass('result')
                .append(template);

            if (options.backdrop) {

                if (backdrop.container) {
                    backdrop.container.show();
                } else {
                    backdrop.css = $.extend(
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
                        options.backdrop
                    );

                    backdrop.container = $("<div/>", {
                        "class": options.selector.backdrop,
                        "css": backdrop.css,
                        "click": function () {
                            reset();
                        }
                    }).insertAfter(container);

                }
                container
                    .addClass('backdrop')
                    .css({
                        "z-index": backdrop.css["z-index"] + 1,
                        "position": "relative"
                    });

            }

            if (options.hint) {

                if (!hint.container) {

                    hint.css = $.extend(
                        {
                            "border-color": "transparent",
                            "position": "absolute",
                            "z-index": 1,
                            "-webkit-text-fill-color": "silver",
                            "color": "silver",
                            "background-color": "transparent",
                            "user-select": "none",
                            "box-shadow": "none"
                        },
                        options.hint
                    );

                    hint.container = node.clone(true).attr({
                        "class": options.selector.hint,
                        "readonly": true,
                        "tabindex": -1
                    }).removeAttr("id placeholder name").css(hint.css).insertBefore(node);

                    node.css({
                        "position": "relative",
                        "z-index": 2,
                        "background-color": "transparent"
                    }).parent().css({
                        "position": "relative"
                    });
                }

                var _hint,
                    _group = (typeof options.group === "string" && result[0][options.group]) || result[0].group;

                for (var k in result) {
                    if (!result.hasOwnProperty(k)) {
                        continue;
                    }
                    if (result[k].group !== _group) {
                        if (!_hint) {
                            _group = result[k].group;
                        } else {
                            break;
                        }
                    }
                    if (result[k].display.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                        _hint = result[k].display;
                        break;
                    }
                }

                if (_hint) {
                    hint.container
                        .val(query + _hint.substring(query.length))
                        .show();
                }

            }

            return true;
        }

        /**
         * Arrow key navigation
         * Top: scroll top, skip "group" item
         * Bottom: scroll bottom, skip "group" item
         * Right: select item
         *
         * @param {object} e Triggered keyup Event object
         *
         * @returns {boolean}
         */
        function move (e) {

            if (result.length === 0 && e.keyCode !== 13) {
                return false;
            }

            var lis = container
                    .find('.' + options.selector.result)
                    .find('li:not([data-search-group])'),
                li = lis.siblings('.active');

            if (e.keyCode === 13) {

                if (lis.filter('.active')[0]) {

                    e.preventDefault();
                    e.stopPropagation();

                    lis.filter('.active').find('a').click();

                }

                reset();

            } else {

                e.preventDefault();

                if (lis.length > 1) {
                    li.removeClass('active');
                }

                if (e.keyCode === 40) {

                    if (li[0]) {
                        li.next().addClass('active')
                    } else {
                        $(lis[0]).toggleClass('active')
                    }

                } else if (e.keyCode === 38) {

                    if (li[0]) {
                        li.prev().addClass('active')
                    } else {
                        $(lis[result.length - 1]).toggleClass('active')
                    }

                } else if (e.keyCode === 39) {

                    if (options.hint && !li[0]) {
                        node.val(hint.container.val());
                    }

                    if (li[0]) {
                        li.find('a').click();
                    } else {
                        lis.filter('.active').find('a').click();
                    }

                    query = node.val();

                    reset();

                    return true;
                }

                if (options.group) {

                    var tmpLi = lis.siblings('.active');
                    if (tmpLi.attr('data-search-group')) {

                        tmpLi.removeClass('active');

                        if (e.keyCode === 40) {
                            tmpLi.next().addClass('active')
                        } else if (e.keyCode === 38) {
                            tmpLi.prev().addClass('active')
                        }
                    }
                }
            }

            if (options.hint) {
                if (lis.filter('.active')[0]) {
                    hint.container.hide();
                } else {
                    hint.container.show();
                }
            }

            node.val(lis.filter('.active').find('.' + options.selector.display).text() || query);

            return true;
        }

        /**
         * Reset Typeahead to it's initial state.
         * Clear filter, result and backdrop
         */
        function reset () {

            result = [];

            if (options.filter) {
                container
                    .removeClass('filter')
                    .find('.' + options.selector.dropdown.replace(" ", "."))
                    .hide();
            }

            if (options.hint) {
                container
                    .removeClass('hint');
                if (hint.container) {
                    hint.container
                        .val("");
                }
            }

            if (options.backdrop || query === "") {
                container
                    .removeClass('backdrop')
                    .removeAttr('style');
                if (backdrop.container) {
                    backdrop.container
                        .hide();
                }
            }

            container
                .removeClass('result')
                .find('.' + options.selector.result)
                .remove();

            _executeCallback(options.callback.onResult, [node, "", [], 0]);

        }

        /**
         * Depending on the source option format given by the initialization,
         * generates unified source list(s).
         */
        function generate () {

            isGenerated = false;
            timestamp = (new Date()).getTime();

            if (length === 0) {
                for (var k in options.source) {
                    if (options.source.hasOwnProperty(k)) {
                        ++length;
                    }
                }
            }

            var ls;
            for (var group in options.source) {

                if (!options.source.hasOwnProperty(group)) {
                    continue;
                }

                // Lists are loaded
                if (!options.dynamic && (storage[group] && storage[group].length !== 0)) {
                    _increment();
                    continue;
                }

                // Lists from localstorage
                if (options.cache) {
                    storage[group] = localStorage.getItem(node.selector + ":" + group);
                    if (storage[group]) {

                        if (options.compression) {
                            storage[group] = lzw_decode(storage[group]);
                        }

                        ls = JSON.parse(storage[group]);

                        if (ls && ls.data && ls.ttl && ls.ttl > new Date().getTime()) {

                            // {debug}
                            options.debug && window.Debug.log({
                                'node': node.selector,
                                'function': 'generate()',
                                'arguments': '{cache: true}',
                                'message': 'OK - List: ' + node.selector + ":" + group + '" found in localStorage.'
                            });
                            window.Debug.print();
                            // {/debug}

                            storage[group] = ls.data;

                            _increment();

                            continue;
                        }
                    }
                }

                if (!options.source[group].data && !options.source[group].url) {
                    options.source[group] = {
                        url: options.source[group]
                    };
                }

                storage[group] = [];

                // Lists from configuration
                if (options.source[group].data && options.source[group].data instanceof Array) {

                    for (var i in options.source[group].data) {

                        if (!options.source[group].data.hasOwnProperty(i)) {
                            continue;
                        }

                        if (options.source[group].data[i] instanceof Object) {
                            break;
                        }

                        var obj = {};
                        obj[options.display] = options.source[group].data[i];
                        options.source[group].data[i] = obj;

                    }

                    storage[group] = storage[group].concat(options.source[group].data);

                    if (!options.source[group].url) {

                        _populateStorage(group);
                        _increment();

                        continue;
                    }
                }

                if (options.source[group].url) {

                    var url = (options.source[group].url instanceof Array && options.source[group].url[0]) || options.source[group].url,
                        path = (options.source[group].url instanceof Array && options.source[group].url[1]) || null,
                        ajaxObj = {};

                    if (typeof url === "object") {
                        ajaxObj = $.extend(true, {}, url);
                        url = JSON.stringify(url);
                    }

                    var request = _request.get(url);

                    // Cross Domain
                    if (/https?:\/\//.test(url) &&
                        !~url.indexOf(window.location.host) &&
                        !!~url.indexOf('{callback}')) {

                        _jsonp.fetch(url.replace("{callback}", encodeURIComponent(jsonpCallback)), function (data) {});

                    } else {

                        if (typeof request === "undefined") {
                            _request.set(url, []);
                        } else if (request instanceof Array && request.length === 0) {
                            _request.queue(url, group, path);
                            continue;
                        } else {
                            _populateSource(request, group, path);
                            _increment();
                            continue;
                        }

                        // Pass the query to the request if {{query}} is specified
                        if (ajaxObj && ajaxObj.data) {
                            for (var x in ajaxObj.data) {
                                if (ajaxObj.data[x] === "{{query}}") {
                                    ajaxObj.data[x] = query;
                                    break;
                                }
                            }
                        }

                        // Same Domain / public API
                        $.ajax($.extend({
                            async: true,
                            url: url,
                            dataType: 'json',
                            ajaxGroup: group,
                            ajaxPath: path,
                            ajaxTimestamp: timestamp
                        }, ajaxObj)).done( function(data) {

                            if (this.ajaxTimestamp !== timestamp) {
                                return false;
                            }

                            _request.set(url, data);
                            _request.processQueue(url);

                            _populateSource(data, this.ajaxGroup, this.ajaxPath);

                        }).fail( function () {

                            // {debug}
                            options.debug && window.Debug.log({
                                'node': node.selector,
                                'function': 'generate()',
                                'arguments': '{url: ' + this.url + '}',
                                'message': 'ERROR - Ajax request failed.'
                            });
                            // {/debug}

                        }).complete( function () {
                            if (this.ajaxTimestamp === timestamp) {
                                _increment();
                            }
                        });

                    }
                }
            }

        }

        /**
         * Builds Html and attach events to the dropdown group when options.filter is activated
         */
        function delegateDropdown () {

            if (!options.filter) {
                return false;
            }

            $('<span/>', {
                "class": options.selector.filter,
                "html": function () {

                    $(this).append(
                        $('<button/>', {
                            "type": "button",
                            "class": options.selector.filterButton,
                            "html": "<span class='" + options.selector.filterValue + "'>" + options.filter + "</span> <span class='caret'></span>",
                            "click": function (e) {

                                e.stopPropagation();

                                var filter = container.find('.' + options.selector.dropdown.replace(" ", "."));

                                if (!filter.is(':visible')) {
                                    container.addClass('filter');
                                    filter.show();
                                } else {
                                    container.removeClass('filter');
                                    filter.hide();
                                }

                            }
                        })
                    );

                    $(this).append(
                        $('<ul/>', {
                            "class": options.selector.dropdown,
                            "html": function () {

                                for (var i in options.source) {

                                    if (!options.source.hasOwnProperty(i)) {
                                        continue;
                                    }

                                    (function (i, scope) {

                                        var li = $("<li/>", {
                                            "html":  $("<a/>", {
                                                "href": "javascript:;",
                                                "html": i,
                                                "click": ({"i": i}, function (e) {
                                                    e.preventDefault();
                                                    _selectFilter(i);
                                                })

                                            })
                                        });
                                        $(scope).append(li);
                                    }(i, this));
                                }

                                $(this).append(
                                    $("<li/>", {
                                        "class": "divider"
                                    })
                                );

                                $(this).append(
                                    $("<li/>", {
                                        "html":  $("<a/>", {
                                            "href": "javascript:;",
                                            "html": options.filter,
                                            "click": function (e) {
                                                e.preventDefault();
                                                _selectFilter();
                                            }
                                        })
                                    })
                                );
                            }
                        })
                    );
                }
            }).insertAfter(
                container.find('.' + options.selector.query)
            );

            /**
             * @private
             * Select the filter and rebuild the result group
             *
             * @param {string} [oneFilter]
             */
            function _selectFilter(oneFilter) {

                filter = oneFilter;

                container
                    .find('.' + options.selector.filterValue)
                    .text(filter || options.filter);

                container
                    .find('.' + options.selector.dropdown.replace(" ", "."))
                    .hide();

                reset();
                search();
                buildHtml();

                node.focus();

            }

        }

        /**
         * @public
         * This method will be called by the jsonP callback to populate the JSON list
         *
         * @param {array|object} data JSON response from the jsonP call
         */
        function populate (data) {

            if (!data || !data.group) {

                // {debug}
                options.debug && window.Debug.log({
                    'node': node.selector,
                    'function': 'populate()',
                    'message': 'ERROR - Empty data or Missing {data.group} parameter"'
                });

                window.Debug.print();
                // {/debug}

                return false;
            }

            var group = data.group || 'group',
                path = (options.source[group].url instanceof Array) ?
                    options.source[group].url[1] : null;


            _populateSource(data, group, path);

            _increment();

        }

        /**
         * @private
         * Common method to build the JSON groups to be cycled for matched results from data, url or cross domain url.
         *
         * @param {array|object} data Raw data to be formatted
         * @param {string} group Group name
         * @param {string} [path] Optional path if the group is not on the data root
         *
         */
        var _populateSource = function (data, group, path) {

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
                    if (!data.hasOwnProperty(i)) {
                        continue;
                    }
                    if (data[i] instanceof Object) {
                        break;
                    }

                    var obj = {};
                    obj[options.display] = data[i];
                    data[i] = obj;
                }

                storage[group] = storage[group].concat(data);

                _populateStorage(group);
            }

        };

        /**
         * @private
         * Store the data inside localstorage so the urls are not fetched on every page loads
         *
         * @param {string} group
         */
        var _populateStorage = function (group) {

            if (!options.cache) {
                return false;
            }

            var data = {
                ttl: new Date().getTime() + options.ttl,
                data: storage[group]
            };

            data = JSON.stringify(data);

            if (options.compression) {
                data = lzw_encode(data);
            }

            localStorage.setItem(
                node.selector + ":" + group,
                data
            );

        };



        /**
         * @private
         * Namespace to temporary save the ajax request url and response to avoid doing multiple calls.
         *
         * @see http://www.runningcoder.org/jquerytypeahead/demo/#form-beer_v1
         */
        var _request = {
            _queue: [],
            "get": function (url) {
                return request[url];
            },
            "set": function (url, data) {
                request[url] = data;
            },
            "queue": function (url, group, path) {
                this._queue.push({url: url, group: group, path: path});
            },
            "processQueue": function (url) {
                for (var i in this._queue) {
                    if (this._queue[i].url !== url) {
                        continue;
                    }
                    _populateSource(request[url], this._queue[i].group, this._queue[i].path);
                    _increment();

                    delete this._queue[i];
                }
            }
        };

        /**
         * @private
         * Increment the group count until all the source(s) are found and trigger a "ready" state
         * Note: ajax / jsonp request might have a delay depending on the connectivity
         */
        function _increment () {

            counter++;

            if (counter === length) {

                isGenerated = true;
                request = [];

                if (options.dynamic) {
                    node.trigger('dynamic.typeahead.input');
                }

            }

        }

        // {debug}
        /**
         * @private
         * Validates the node container(s) for class attributes
         */
        function _validateHtml () {

            if (!container[0]) {
                options.debug && window.Debug.log({
                    'node': node.selector,
                    'function': '_validateHtml()',
                    'arguments': options.selector.container,
                    'message': 'ERROR - Missing input parent container class: ".' + options.selector.container + '"'
                });
                return false;
            }

            $.each([
                options.selector.query,
                options.selector.button
            ], function (i, v) {

                if (!container.find('.' + v)[0]) {
                    options.debug && window.Debug.log({
                        'node': node.selector,
                        'function': '_validateHtml()',
                        'arguments': options.selector.query,
                        'message': 'ERROR - Missing container with class: ".' + v + '"'
                    });
                }

            });

        }
        // {/debug}

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
        var _sort = function (field, reverse, primer){

            var key = primer ?
                function(x) {return primer(x[field])} :
                function(x) {return x[field]};

            reverse = [-1, 1][+!!reverse];

            return function (a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
            }
        };

        /**
         * @private
         * Remove every accent(s) from a string
         *
         * @param {string} string
         *
         * @returns {string}
         */
        var _removeAccent = function (string) {

            if (!string || typeof string !== "string") {
                return false;
            }

            string = string.toLowerCase();

            for (var i=0, l=_accent.from.length ; i<l ; i++) {
                string = string.replace(new RegExp(_accent.from.charAt(i), 'g'), _accent.to.charAt(i));
            }

            return string;
        };

        /**
         * @private
         * Replace a string from-to index
         *
         * @param {string} string The complete string to replace into
         * @param {number} offset The cursor position to start replacing from
         * @param {number} length The length of the replacing string
         * @param {string} replace The replacing string
         *
         * @returns {string}
         */
        var _replaceAt = function (string, offset, length, replace) {
            return string.substring(0, offset) + replace + string.substring(offset + length);
        };

        /**
         * @private
         * Execute function once the timer is reached.
         * If the function is recalled before the timer ends, the first call will be canceled.
         */
        var _typeWatch = (function(){
            var timer = 0;
            return function(callback, ms){
                clearTimeout (timer);
                timer = setTimeout(callback, ms);
            }
        })();

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

                    // {debug}
                    options.debug && window.Debug.log({
                        'node': node.selector,
                        'function': '_executeCallback()',
                        'arguments': JSON.stringify(callback),
                        'message': 'WARNING - Invalid callback function"'
                    });
                    // {/debug}

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
         *
         * @param {string} s String to encode
         *
         * @returns {string}
         */
        var lzw_encode = function(s) {
            var dict = {},
                data = (s + "").split(""),
                out = [],
                currChar,
                phrase = data[0],
                code = 256;
            for (var i=1; i<data.length; i++) {
                currChar=data[i];
                if (dict[phrase + currChar] != null) {
                    phrase += currChar;
                }
                else {
                    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
                    dict[phrase + currChar] = code;
                    code++;
                    phrase=currChar;
                }
            }
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            for (var i=0; i<out.length; i++) {
                out[i] = String.fromCharCode(out[i]);
            }
            return out.join("");
        };

        /**
         * @private
         *
         * @param {string} s String to decode
         *
         * @returns {string}
         */
        var lzw_decode = function(s) {
            var dict = {},
                data = (s + "").split(""),
                currChar = data[0],
                oldPhrase = currChar,
                out = [currChar],
                code = 256,
                phrase;
            for (var i=1; i<data.length; i++) {
                var currCode = data[i].charCodeAt(0);
                if (currCode < 256) {
                    phrase = data[i];
                }
                else {
                    phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
                }
                out.push(phrase);
                currChar = phrase.charAt(0);
                dict[code] = oldPhrase + currChar;
                code++;
                oldPhrase = phrase;
            }
            return out.join("");
        };

        /**
         * @private
         * Constructs Typeahead
         */
        this.__construct = function () {

            extendOptions();
            delegateTypeahead();
            delegateDropdown();

            // {debug}
            _validateHtml();
            window.Debug && window.Debug.print();
            // {/debug}

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
     * $("#myInput").typeahead({
     *     maxItem: 10,
     *     order: "asc",
     *     source: {
     *         data: ["country1", "country2", "country3"]
     *     }
     * })
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

            if (!options || !options.source) {

                // {debug}
                window.Debug.log({
                    'node': node.selector,
                    'function': '$.typeahead()',
                    'arguments': '',
                    'message': 'Missing source option - Typeahead dropped'
                });

                window.Debug.print();
                // {/debug}

                return;
            }

            if (typeof node === "function") {

                if (!options.input) {

                    // {debug}
                    window.Debug.log({
                        'node': node.selector,
                        'function': '$.typeahead()',
                        'arguments': '',
                        'message': 'Undefined property "options.input - Typeahead dropped'
                    });

                    window.Debug.print();
                    // {/debug}

                    return;
                }

                node = $(options.input);

                if (!node[0] || node.length > 1) {

                    // {debug}
                    window.Debug.log({
                        'node': node.selector,
                        'function': '$.typeahead()',
                        'arguments': JSON.stringify(options.input),
                        'message': 'Unable to find jQuery input element OR more than 1 input is found - Typeahead dropped'
                    });

                    window.Debug.print();
                    // {/debug}

                    return;
                }

            } else if (typeof node[0] === 'undefined' || node.length > 1) {

                // {debug}
                window.Debug.log({
                    'node': node.selector,
                    'function': '$.typeahead()',
                    'arguments': '$("' + node['selector'] + '").typeahead()',
                    'message': 'Unable to find jQuery input element OR more than 1 input is found - Typeahead dropped'
                });

                window.Debug.print();
                // {/debug}

                return;
            }

            return window.Typeahead.source[node.selector] = new Typeahead(node, options);

        }

    };

    // {debug}
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
    // {/debug}

    /**
     * Array.indexof compatibility for older browsers
     */
    if (!Array.prototype.indexOf)
    {
        Array.prototype.indexOf = function(elt /*, from*/)
        {
            var len = this.length >>> 0;

            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                ? Math.ceil(from)
                : Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++)
            {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }

}(window, document, window.jQuery));