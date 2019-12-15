/**
 * jQuery Typeahead
 *
 * @author Tom Bertrand
 * @version 1.2.3 (2014-09-10)
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
        order: null,
        offset: false,
        hint: false,
        highlight: true,
        list: false, // @deprecated  options.list
        group: false,
        filter: false,
        backdrop: false,
        cache: false,
        ttl: 3600000,
        compression: false,
        containerClass: "typeahead-search-container",
        fieldClass: "typeahead-search-field",
        groupClass: "typeahead-search-group",
        resultClass: "typeahead-search-result",
        backdropClass: "typeahead-search-backdrop",
        display: "display",
        template: null,
        source: null,
        callback: {
            onInit: null,
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
        order: ["asc", "desc"],
        offset: [true, false],
        highlight: [true, false],
        cache: [true, false],
        compression: [true, false],
        //source: ["data", "url", "ignore"],
        //callback: ["onInit", "onMouseEnter", "onMouseLeave", "onClick", "onSubmit"],
        debug: [true, false]
    };

    /**
     * @private
     * Class selectors to reach class-constructed elements
     */
    var _selector = {
        display: "typeahead-display",
        query: "typeahead-query",
        filter: "typeahead-filter",
        button: "typeahead-button",
        filterValue: "typeahead-filter-value",
        dropdown: "typeahead-dropdown",
        hint: "typeahead-hint"
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
                            'message': 'ERROR - source.list.url or source.list.data is Required'
                        });
                    }
                    // {/debug}

                    for (var list in options[option]) {

                        if (!options[option].hasOwnProperty(list)) {
                            continue;
                        }

                        if (!(options[option][list] instanceof Object) || list === "data") {
                            list = "list";
                            options[option] = {
                                list: options[option]
                            };
                        }

                        // {debug}
                        if (!options[option][list].url && !options[option][list].data) {
                            _options.debug && window.Debug.log({
                                'node': node.selector,
                                'function': 'extendOptions()',
                                'arguments': "{options.source}",
                                'message': 'ERROR - source.list.url or source.list.data is Required'
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

            // Namespace events to avoid conflicts
            var namespace = ".typeahead.input",
                event = [
                    'focus' + namespace,
                    'input' + namespace,
                    'keydown' + namespace
                ];

            $('html').on("click" + namespace, function() {
                reset();
            });

            node.parents('.' + options.containerClass).on("click" + namespace, function(e) {

                e.stopPropagation();

                if (options.filter) {
                    node.parents('.' + options.containerClass)
                        .find('.' + _selector.dropdown)
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
                            buildHintHtml();
                            generate();
                        }
                        break;
                    case "input":
                    default:

                        if (!isGenerated) {
                            return;
                        }

                        query = $(this).val().trim();

                        reset();

                        if (query.length >= options.minLength && query !== "") {
                            search();
                            hint();
                            buildHtml();
                        }
                        break;
                }

            });

        }

        /**
         * Search the source lists to match the search query, build the HTML and bind
         * the callbacks on the result(s) if they are set inside the configuration options.
         */
        function search () {

            if (query === "") {
                return false;
            }

            if (filter && !options.source[filter]) {
                filter = false;
            }

            for (var list in storage) {

                if (!storage.hasOwnProperty(list) || (filter && list !== filter)) {
                    continue;
                }

                for (var i in storage[list]) {

                    if (!storage[list].hasOwnProperty(i)) {
                        continue;
                    }

                    if (result.length >= options.maxItem) {
                        break;
                    }

                    if (storage[list][i][options.display] &&
                        storage[list][i][options.display].toLowerCase().indexOf(query.toLowerCase()) !== -1 && (
                        !options.offset ||
                            storage[list][i][options.display].toLowerCase().indexOf(query.toLowerCase()) === 0
                        ))
                    {
                        if (options.source[list].ignore && ~options.source[list].ignore.indexOf(storage[list][i][options.display])) {
                            continue;
                        }

                        storage[list][i].list = list;
                        result.push(storage[list][i]);
                    }
                }
            }

            if (options.order) {
                result.sort(
                    _sort(
                        options.display,
                        (options.group) ? !(options.order === "asc") : options.order === "asc",
                        function(a){return a.toUpperCase()}
                    )
                );
            }

        }

        /**
         * Builds the search result list html and delegate the callbacks
         */
        function buildHtml () {

            if (result.length !== 0) {

                var match,
                    template = $("<div/>", {
                        "class": options.resultClass,
                        "html": $("<ul/>", {
                            "html": function() {

                                for (var i in result) {

                                    if (!result.hasOwnProperty(i)) {
                                        continue;
                                    }

                                    (function (result, scope) {

                                        if (options.group) {
                                            var _group = result.list;
                                            if (typeof options.group !== "boolean" && result[options.group]) {
                                                _group = result[options.group];
                                            }
                                        }

                                        // @deprecated  options.list
                                        if (options.list) {
                                            var _list = result.list;
                                            if (typeof options.list !== "boolean" && result[options.list]) {
                                                _list = result[options.list];
                                            }
                                        }

                                        if (options.group && !$(scope).find('li[data-search-group="' + _group + '"]')[0]) {
                                            $(scope).append(
                                                $("<li/>", {
                                                    "class": options.groupClass,
                                                    "html":  $("<a/>", {
                                                        "html": _group
                                                    }),
                                                    "data-search-group": _group
                                                })
                                            );
                                        }

                                        match = result[options.display].match(new RegExp(query,"i"));

                                        var li = $("<li/>", {
                                            "html":  $("<a/>", {
                                                "href": "javascript:;",
                                                "data-list": _group,
                                                "html": function () {

                                                    var _display = '<span class="' + _selector.display + '">' +
                                                        result[options.display].replace(
                                                        new RegExp(query,"i"),
                                                        ((options.highlight) ?
                                                            '<strong>' + match[0] + '</strong>' :
                                                            match[0])
                                                    ) + '</span>' +
                                                    ((_list) ? "<small>" + _list + "</small>" : "")

                                                    if (options.template) {
                                                        _display = options.template.replace(/\{\{([a-z0-9_\-]+)\}\}/gi, function (match, index, offset) {
                                                            if (index === options.display) {
                                                                return _display;
                                                            }

                                                            return result[index] || "null";
                                                        });
                                                    }

                                                    $(this).append(_display);

                                                },
                                                "click": ({"result": result}, function (e) {

                                                    e.preventDefault();

                                                    node.val(result[options.display]).focus();

                                                    query = result[options.display];

                                                    reset();

                                                    _executeCallback(options.callback.onClick, [node, this, result, e]);
                                                }),
                                                "mouseenter": function (e) {

                                                    $(this).parents('.' + options.resultClass).find('.active').removeClass('active');

                                                    _executeCallback(options.callback.onMouseEnter, [node, this, result, e]);
                                                },
                                                "mouseleave": function (e) {
                                                    _executeCallback(options.callback.onMouseLeave, [node, this, result, e]);
                                                }

                                            }),
                                            "mouseenter": function () {

                                                $(this).siblings('li.active').removeClass('active');
                                                $(this).addClass('active');

                                            }
                                        });

                                        if (options.group) {
                                            $(li).insertAfter($(scope).find('li[data-search-group="' + _group + '"]'));
                                        } else {
                                            $(scope).append(li);
                                        }

                                    }(result[i], this));
                                }

                            }
                        })
                    });

                node.parents('.' + options.containerClass)
                    .addClass('result')
                    .append(template);
            }

            if (!options.backdrop || query === "") {
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
                options.backdrop
            );

            node.parents('.' + options.containerClass)
                .addClass('backdrop')
                .css({
                    "z-index": css["z-index"] + 1,
                    "position": "relative"
                });


            $("<div/>", {
                "class": options.backdropClass,
                "css": css,
                "click": function () {
                    reset();
                }
            }).insertAfter(node.parents('.' + options.containerClass))

        }

        /**
         * If options.hint is activated, build the disabled hint input
         */
        function buildHintHtml () {

            if (!options.hint) {
                return false;
            }

            node.css({
                "position": "relative",
                "z-index": 2,
                "background-color": "transparent"
            }).parent().css({
                "position": "relative"
            });

            var border = {
                top: node.css("border-top-width"),
                right: node.css("border-right-width"),
                bottom: node.css("border-bottom-width"),
                left: node.css("border-left-width")
            };

            var css = $.extend(
                {
                    border: "none",
                    display: node.css("display"),
                    position: "absolute",
                    top: (parseFloat(border.top)) ? border.top : "auto",
                    left: (parseFloat(border.left)) ? border.left : "auto",
                    "z-index": 1,
                    width: node.outerWidth(true) - (parseFloat(border.right) + parseFloat(border.left)) + "px",
                    height: node.outerHeight(true) - (parseFloat(border.top) + parseFloat(border.bottom)) + "px",
                    "-webkit-text-fill-color": "silver",
                    color: "silver",
                    "background-color": "transparent",
                    "user-select": "none"
                },
                options.hint
            );

            $("<input/>", {
                "class": _selector.hint,
                "readonly": true,
                "tabindex": -1,
                "css": css,
                "type": "search"
            }).insertBefore(node);

        }

        function hint () {

            if (!options.hint || !result[0]) {
                return false;
            }

            var oneResult = result[0];
            if (options.group) {
                oneResult = result[result.length - 1];
            }

            if (oneResult[options.display].toLowerCase().indexOf(query.toLowerCase()) === 0) {
                node.siblings("." + _selector.hint)
                    .val(query + oneResult[options.display].substring(query.length))
                    .show();

                return oneResult[options.display];
            }

        }

        /**
         * Arrow key navigation
         * Top: scroll top, skip "group" item
         * Bottom: scroll bottom, skip "group" item
         * Right: select item
         *
         * @param {object} e Triggered keyup Event object
         */
        function move (e) {

            if (result.length === 0 && e.keyCode !== 13) {
                return false;
            }

            var lis = node.parents('.' + options.containerClass)
                    .find('.' + options.resultClass)
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
                        node.val(hint());
                    }

                    if (li[0]) {
                        li.find('a').click();
                    } else {
                        lis.filter('.active').find('a').click();
                    }

                    query = node.val();

                    reset();
                    return;
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
                    node.siblings("." + _selector.hint).hide();
                } else {
                    node.siblings("." + _selector.hint).show();
                }
            }

            node.val(lis.filter('.active').find('.' + _selector.display).text() || query);

            return true;

        }

        /**
         * Reset Typeahead to it's initial state.
         * Clear filter, result and backdrop
         */
        function reset () {

            result = [];

            var container = node.parents('.' + options.containerClass);

            if (options.filter) {
                container
                    .removeClass('filter')
                    .find('.' + _selector.dropdown)
                    .hide();
            }

            if (options.hint) {
                container
                    .removeClass('hint')
                    .find('.' + _selector.hint)
                    .val("");
            }

            if (options.backdrop) {
                container
                    .removeClass('backdrop')
                    .removeAttr('style')
                    .siblings('.' + options.backdropClass)
                    .remove();
            }

            container
                .removeClass('result')
                .find('.' + options.resultClass)
                .remove();

        }

        /**
         * Depending on the source option format given by the initialization,
         * generates unified source list(s).
         */
        function generate () {

            isGenerated = false;

            if (length === 0) {
                for (var k in options.source) {
                    if (options.source.hasOwnProperty(k)) {
                        ++length;
                    }
                }
            }

            for (var list in options.source) {

                if (!options.source.hasOwnProperty(list)) {
                    continue;
                }

                // Lists are loaded
                if ((storage[list] && storage[list].length !== 0)) {
                    _increment();
                    continue;
                }

                // Lists from localstorage
                if (options.cache) {
                    storage[list] = localStorage.getItem(node.selector + ":" + list);
                    if (storage[list]) {

                        if (options.compression && typeof LZString === "object") {
                            storage[list] = LZString.decompress(storage[list]);
                        }

                        var ls = JSON.parse(storage[list]);

                        if (ls.data && ls.ttl && ls.ttl > new Date().getTime()) {

                            // {debug}
                            options.debug && window.Debug.log({
                                'node': node.selector,
                                'function': 'generate()',
                                'arguments': '{cache: true}',
                                'message': 'OK - List: ' + node.selector + ":" + list + '" found in localStorage.'
                            });
                            window.Debug.print();
                            // {/debug}

                            storage[list] = ls.data;

                            _increment();

                            continue;
                        }
                    }
                }

                if (!options.source[list].data && !options.source[list].url) {
                    options.source[list] = {
                        url: options.source[list]
                    };
                }

                storage[list] = [];

                // Lists from configuration
                if (options.source[list].data && options.source[list].data instanceof Array) {

                    for (var i in options.source[list].data) {

                        if (!options.source[list].data.hasOwnProperty(i)) {
                            continue;
                        }

                        if (options.source[list].data[i] instanceof Object) {
                            break;
                        }

                        var obj = {};
                        obj[options.display] = options.source[list].data[i];
                        options.source[list].data[i] = obj;

                    }

                    storage[list] = storage[list].concat(options.source[list].data);

                    if (!options.source[list].url) {

                        _populateStorage(list);
                        _increment();

                        continue;
                    }
                }

                if (options.source[list].url) {

                    var url = (options.source[list].url instanceof Array && options.source[list].url[0]) || options.source[list].url,
                        path = (options.source[list].url instanceof Array && options.source[list].url[1]) || null,
                        ajaxObj = {};

                    if (typeof url === "object") {
                        ajaxObj = url;
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
                            _request.queue(url, list, path);
                            continue;
                        } else {
                            _populateSource(request, list, path);
                            _increment();
                            continue;
                        }

                        // Same Domain / public API
                        $.ajax($.extend({
                            async: true,
                            url: url,
                            dataType: 'json',
                            ajaxList: list,
                            ajaxPath: path
                        }, ajaxObj)).done( function(data) {

                            _populateSource(data, this.ajaxList, this.ajaxPath);
                            _increment();

                            _request.set(url, data);
                            _request.processQueue(url);

                        }).fail( function () {

                            // {debug}
                            options.debug && window.Debug.log({
                                'node': node.selector,
                                'function': 'generate()',
                                'arguments': '{url: ' + this.url + '}',
                                'message': 'ERROR - Ajax request failed.'
                            });
                            // {/debug}

                            _increment();

                        });

                    }
                }
            }

        }

        /**
         * Builds Html and attach events to the dropdown list when options.filter is activated
         */
        function delegateDropdown () {

            if (!options.filter) {
                return false;
            }

            $('<span/>', {
                "class": _selector.filter,
                "html": function () {

                    $(this).append(
                        $('<button/>', {
                            "type": "button",
                            "html": "<span class='" + _selector.filterValue + "'>" + options.filter + "</span> <span class='caret'></span>",
                            "click": function (e) {

                                e.stopPropagation();

                                var container = $(this).parents('.' + options.containerClass),
                                    filter = container.find('.' + _selector.dropdown);

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
                            "class": _selector.dropdown,
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
                node.parents('.' + options.containerClass).find('.' + _selector.query)
            );

            /**
             * @private
             * Select the filter and rebuild the result list
             *
             * @param {string} [oneFilter]
             */
            function _selectFilter(oneFilter) {

                filter = oneFilter;

                node.parents('.' + options.containerClass)
                    .find('.' + _selector.filterValue)
                    .text(filter || options.filter);

                node.parents('.' + options.containerClass)
                    .find('.' + _selector.dropdown)
                    .hide();

                reset();
                search();
                hint();
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

            if (!data || !data.list) {

                // {debug}
                options.debug && window.Debug.log({
                    'node': node.selector,
                    'function': 'populate()',
                    'message': 'ERROR - Empty data or Missing {data.list} parameter"'
                });

                window.Debug.print();
                // {/debug}

                return false;
            }

            var list = data.list || 'list',
                path = (options.source[list].url instanceof Array) ?
                    options.source[list].url[1] : null;


            _populateSource(data, list, path);

            _increment();

        }

        /**
         * @private
         * Common method to build the JSON lists to be cycled for matched results from data, url or cross domain url.
         *
         * @param {array|object} data Raw data to be formatted
         * @param {string} list List name
         * @param {string} [path] Optional path if the list is not on the data root
         *
         */
        var _populateSource = function (data, list, path) {

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

                storage[list] = storage[list].concat(data);

                _populateStorage(list);
            }

        };

        /**
         * @private
         * Store the data inside localstorage so the urls are not fetched on every page loads
         *
         * @param {string} list
         */
        var _populateStorage = function (list) {

            if (!options.cache) {
                return false;
            }

            var data = {
                ttl: new Date().getTime() + options.ttl,
                data: storage[list]
            }

            data = JSON.stringify(data);

            if (options.compression && typeof LZString === "object") {
                data = LZString.compress(data);
            }

            localStorage.setItem(
                node.selector + ":" + list,
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
            "queue": function (url, list, path) {
                this._queue.push({url: url, list: list, path: path});
            },
            "processQueue": function (url) {
                for (var i in this._queue) {
                    if (this._queue[i].url !== url) {
                        continue;
                    }
                    _populateSource(request[url], this._queue[i].list, this._queue[i].path);
                    _increment();

                    delete this._queue[i];
                }
            }
        };

        /**
         * @private
         * Increment the list count until all the source(s) are found and trigger a "ready" state
         * Note: ajax / jsonp request might have a delay depending on the connectivity
         */
        function _increment () {

            counter++;

            if (counter === length) {
                isGenerated = true;
                delete request;
            }

        }

        // {debug}
        /**
         * @private
         * Validates the node container(s) for class attributes
         */
        function _validateHtml () {

            var container = node.parents('.' + options.containerClass);

            if (!container[0]) {
                options.debug && window.Debug.log({
                    'node': node.selector,
                    'function': 'reset()',
                    'arguments': options.containerClass,
                    'message': 'ERROR - Missing input parent container class: ".' + options.containerClass + '"'
                });
                return false;
            }

            if (!container.find('.' + _selector.query)) {
                options.debug && window.Debug.log({
                    'node': node.selector,
                    'function': 'reset()',
                    'arguments': _selector.query,
                    'message': 'ERROR - Missing input parent class: ".' + _selector.query + '"'
                });
            }
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
        var _sort = function(field, reverse, primer){

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

            return node.each(function () {
                window.Typeahead.source[node.selector] = new Typeahead(node, options);
            });

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

}(window, document, window.jQuery));