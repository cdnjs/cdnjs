/*!
 * jQuery Typeahead
 * Copyright (C) 2015 RunningCoder.org
 * Licensed under the MIT license
 *
 * @author Tom Bertrand
 * @version 2.0.0 (2015-07-19)
 * @link http://www.runningcoder.org/jquerytypeahead/
 */
;
(function(window, document, $, undefined) {

    window.Typeahead = {
        version: '2.0.0'
    };

    "use strict";

    var _options = {
        input: null,
        minLength: 2, // Modified feature, now accepts 0 to search on focus
        maxItem: 8, // Modified feature, now accepts 0 as "Infinity" meaning all the results will be displayed
        dynamic: false,
        delay: 300,
        order: null, // ONLY sorts the first "display" key
        offset: false,
        hint: false, // -> Improved feature, Added support for excessive "space" characters
        accent: false,
        highlight: true,
        group: false, // -> Improved feature, Array second index is a custom group title (html allowed)
        maxItemPerGroup: null, // -> Renamed option
        dropdownFilter: false, // -> Renamed option, true will take group options string will filter on object key
        dynamicFilter: null, // -> New feature, filter the typeahead results based on dynamic value, Ex: Players based on TeamID
        backdrop: false,
        cache: false,
        ttl: 3600000,
        compression: false, // -> Requires LZString library
        suggestion: false, // -> *Coming soon* New feature, save last searches and display suggestion on matched characters
        searchOnFocus: false, // -> New feature, display search results on input focus
        resultContainer: null, // -> New feature, list the results inside any container string or jQuery object
        generateOnLoad: null, // -> New feature, forces the source to be generated on page load even if the input is not focused!
        mustSelectItem: false, // -> New option, the submit function only gets called if an item is selected
        href: null, // -> New feature, String or Function to format the url for right-click & open in new tab on link results
        display: ["display"], // -> Improved feature, allows search in multiple item keys ["display1", "display2"]
        template: null,
        emptyTemplate: false, // -> New feature, display an empty template if no result
        source: null, // -> Modified feature, source.ignore is now a regex; item.group is a reserved word; Ajax callbacks: done, fail, complete, always
        callback: {
            onInit: null,
            onReady: null, // -> New callback, when the Typeahead initial preparation is completed
            onSearch: null, // -> New callback, when data is being fetched & analyzed to give search results
            onResult: null,
            onLayoutBuiltBefore: null, // -> New callback, when the result HTML is build, modify it before it get showed
            onLayoutBuiltAfter: null, // -> New callback, modify the dom right after the results gets inserted in the result container
            onNavigate: null, // -> New callback, when a key is pressed to navigate the results
            onMouseEnter: null,
            onMouseLeave: null,
            onClickBefore: null, // -> Improved feature, possibility to e.preventDefault() to prevent the Typeahead behaviors
            onClickAfter: null, // -> New feature, happens after the default clicked behaviors has been executed
            onSendRequest: null, // -> New callback, gets called when the Ajax request(s) are sent
            onReceiveRequest: null, // -> New callback, gets called when the Ajax request(s) are all received
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

    var _namespace = ".typeahead";

    var _accent = {
        from: "ãàáäâẽèéëêìíïîõòóöôùúüûñç",
        to: "aaaaaeeeeeiiiiooooouuuunc"
    };

    var Typeahead = function(node, options) {

        this.rawQuery = ''; // Unmodified input query
        this.query = ''; // Input query
        this.source = {}; // The generated source kept in memory
        this.isGenerated = null; // Generated results -> null: not generated, false: generating, true generated
        this.generatedGroupCount = 0; // Number of groups generated, if limit reached the search can be done
        this.groupCount = 0; // Number of groups, this value gets counted on the initial source unification
        this.groupBy = "group"; // This option will change according to filtering or custom grouping
        this.result = []; // Results based on Source-query match (only contains the displayed elements)
        this.resultCount = 0; // Total results based on Source-query match
        this.options = options; // Typeahead options (Merged default & user defined)
        this.node = node; // jQuery object of the Typeahead <input>
        this.container = null; // Typeahead container, usually right after <form>
        this.resultContainer = null; // Typeahead result container (html)
        this.item = null; // The selected item
        this.xhr = {}; // Ajax request(s) stack
        this.hintIndex = null; // Numeric value of the hint index in the result list
        this.filters = { // Filter list for searching, dropdown and dynamic(s)
            dropdown: {}, // Dropdown menu if options.dropdownFilter is set
            dynamic: {} // Checkbox / Radio / Select to filter the source data
        };
        this.requests = {}; // Store the group:request instead of generating them every time

        this.backdrop = {}; // The backdrop object
        this.hint = {}; // The hint object

        this.__construct();

    };

    Typeahead.prototype = {

        extendOptions: function() {
            if (this.options.dynamic) {
                this.options.cache = false;
                this.options.compression = false;
            }
            if (this.options.cache) {
                this.options.cache = (function() {
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
                    _debug.log({
                        'node': this.node.selector,
                        'function': 'extendOptions()',
                        'message': 'Missing LZString Library or options.cache, no compression will occur.'
                    });

                    _debug.print();
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
                    _debug.log({
                        'node': this.node.selector,
                        'function': 'extendOptions()',
                        'message': 'Invalid jQuery selector or jQuery Object for "options.resultContainer".'
                    });

                    _debug.print();
                } else {
                    this.resultContainer = this.options.resultContainer;
                }
            }

            if (this.options.group && typeof this.options.group[0] === "string" && this.options.maxItemPerGroup) {
                this.groupBy = this.options.group[0];
            }
            if (this.options.callback && this.options.callback.onClick) {
                this.options.callback.onClickBefore = this.options.callback.onClick;
                delete this.options.callback.onClick;
            }

            this.options = $.extend(
                true, {},
                _options,
                this.options
            );

        },

        unifySourceFormat: function() {

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
                if (typeof this.options.source[group] === "string" || this.options.source[group] instanceof Array) {
                    this.options.source[group] = {
                        url: this.options.source[group]
                    };
                }

                if (!this.options.source[group].data && !this.options.source[group].url) {
                    _debug.log({
                        'node': this.node.selector,
                        'function': 'unifySourceFormat()',
                        'arguments': JSON.stringify(this.options.source),
                        'message': 'Undefined "options.source.' + group + '.[data|url]" is Missing - Typeahead dropped'
                    });

                    _debug.print();

                    return false;
                }

                if (this.options.source[group].display && !(this.options.source[group].display instanceof Array)) {
                    this.options.source[group].display = [this.options.source[group].display];
                }

                if (this.options.source[group].ignore) {
                    if (!(this.options.source[group].ignore instanceof RegExp)) {
                        _debug.log({
                            'node': this.node.selector,
                            'function': 'unifySourceFormat()',
                            'arguments': JSON.stringify(this.options.source[group].ignore),
                            'message': 'Invalid ignore RegExp.'
                        });

                        _debug.print();

                        delete this.options.source[group].ignore;
                    }
                }

                this.groupCount += 1;
            }

            return true;
        },

        init: function() {

            this.helper.executeCallback(this.options.callback.onInit, [this.node]);

            this.container = this.node.closest('.' + this.options.selector.container);
            _debug.log({
                'node': this.node.selector,
                'function': 'init()',
                'message': 'OK - Typeahead activated on ' + this.node.selector
            });

            _debug.print();

        },

        delegateEvents: function() {

            var scope = this,
                events = [
                    'focus' + _namespace,
                    'input' + _namespace,
                    'propertychange' + _namespace,
                    'keydown' + _namespace,
                    'dynamic' + _namespace,
                    'generateOnLoad' + _namespace
                ];

            this.container.off(_namespace).on("click" + _namespace + ' touchstart' + _namespace, function(e) {
                e.stopPropagation();

                if (scope.options.dropdownFilter) {
                    scope.container
                        .find('.' + scope.options.selector.dropdown.replace(" ", "."))
                        .hide();
                }
            });

            this.node.closest('form').on("submit", function(e) {

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
            var preventNextEvent = false;

            this.node.off(_namespace).on(events.join(' '), function(e) {

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
                            if (e.keyCode && ~[13, 27, 38, 39, 40].indexOf(e.keyCode)) {
                                preventNextEvent = true;
                                scope.navigate(e);
                            }
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
                            scope.helper.typeWatch(function() {
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

        generateSource: function() {

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
                if (this.options.cache) {
                    dataInLocalstorage = window.localStorage.getItem(this.node.selector + ":" + group);
                    if (dataInLocalstorage) {
                        if (this.options.compression) {
                            dataInLocalstorage = LZString.decompressFromUTF16(dataInLocalstorage);
                        }
                        isValidStorage = false;
                        try {
                            dataInLocalstorage = JSON.parse(dataInLocalstorage + "");

                            if (dataInLocalstorage.data && dataInLocalstorage.ttl > new Date().getTime()) {
                                this.populateSource(dataInLocalstorage.data, group);
                                isValidStorage = true;
                                _debug.log({
                                    'node': this.node.selector,
                                    'function': 'generateSource()',
                                    'message': 'Source for group "' + group + '" found in localStorage.'
                                });
                                _debug.print();

                            } else {
                                window.localStorage.removeItem(this.node.selector + ":" + group);
                            }
                        } catch (error) {}

                        if (isValidStorage) continue;
                    }
                }
                if (this.options.source[group].data && !this.options.source[group].url) {

                    this.populateSource(
                        typeof this.options.source[group].data === "function" &&
                        this.options.source[group].data() ||
                        this.options.source[group].data,
                        group
                    );
                    continue;
                }
                if (this.options.source[group].url) {
                    if (!this.requests[group]) {
                        this.requests[group] = this.generateRequestObject(group);
                    }
                }
            }

            this.handleRequests();

        },

        generateRequestObject: function(group) {

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

        handleRequests: function() {

            var scope = this,
                requestsCount = Object.keys(this.requests).length;

            if (requestsCount) {
                this.helper.executeCallback(this.options.callback.onSendRequest, [this.node, this.query]);
            }

            for (var group in this.requests) {
                if (!this.requests.hasOwnProperty(group)) continue;
                if (this.requests[group].isDuplicated) continue;

                (function(group, xhrObject) {

                    var _request;

                    if (xhrObject.request.data) {
                        for (var i in xhrObject.request.data) {
                            if (!xhrObject.request.data.hasOwnProperty(i)) continue;
                            if (~String(xhrObject.request.data[i]).indexOf('{{query}}')) {
                                xhrObject = $.extend(true, {}, xhrObject);
                                xhrObject.request.data[i] = xhrObject.request.data[i].replace('{{query}}', scope.query);
                                break;
                            }
                        }
                    }

                    scope.xhr[group] = $.ajax(xhrObject.request).done(function(data, textStatus, jqXHR) {

                        var tmpData;
                        for (var i = 0; i < xhrObject.validForGroup.length; i++) {

                            _request = scope.requests[xhrObject.validForGroup[i]];

                            if (_request.extra.callback.done instanceof Function) {

                                tmpData = _request.extra.callback.done(data, textStatus, jqXHR);
                                data = tmpData instanceof Array && tmpData || data;
                                if (!(tmpData instanceof Array)) {
                                    _debug.log({
                                        'node': scope.node.selector,
                                        'function': 'Ajax.callback.done()',
                                        'message': 'Invalid returned data has to be an Array'
                                    });
                                    _debug.print();
                                }
                            }

                            scope.populateSource(data, _request.extra.group, _request.extra.path);

                            requestsCount -= 1;
                            if (requestsCount === 0) {
                                scope.helper.executeCallback(scope.options.callback.onReceiveRequest, [scope.node, scope.query]);
                            }

                        }

                    }).fail(function(jqXHR, textStatus, errorThrown) {


                        for (var i = 0; i < xhrObject.validForGroup.length; i++) {
                            _request = scope.requests[xhrObject.validForGroup[i]];
                            _request.extra.callback.fail instanceof Function && _request.extra.callback.fail(jqXHR, textStatus, errorThrown);
                        }
                        _debug.log({
                            'node': scope.node.selector,
                            'function': 'Ajax.callback.fail()',
                            'message': 'Request failed'
                        });

                        _debug.print();

                    }).complete(function(jqXHR, textStatus) {

                        for (var i = 0; i < xhrObject.validForGroup.length; i++) {
                            _request = scope.requests[xhrObject.validForGroup[i]];
                            _request.extra.callback.complete instanceof Function && _request.extra.callback.complete(jqXHR, textStatus);
                        }

                    }).always(function(data, textStatus, jqXHR) {

                        for (var i = 0; i < xhrObject.validForGroup.length; i++) {
                            _request = scope.requests[xhrObject.validForGroup[i]];
                            _request.extra.callback.always instanceof Function && _request.extra.callback.always(data, textStatus, jqXHR);
                        }

                    });

                }(group, this.requests[group]));

            }

        },

        populateSource: function(data, group, path) {

            var extraData,
                tmpData;

            if (data && typeof path === "string") {

                var exploded = path.split('.'),
                    splitIndex = 0;

                while (splitIndex < exploded.length) {
                    tmpData = data[exploded[splitIndex++]];

                    if (typeof tmpData !== 'undefined') {
                        data = tmpData;
                    } else {
                        _debug.log({
                            'node': this.node.selector,
                            'function': 'populateSource()',
                            'arguments': path,
                            'message': 'Invalid data path.'
                        });

                        _debug.print();
                        break;
                    }
                }
            }

            if (!(data instanceof Array)) {
                _debug.log({
                    'node': this.node.selector,
                    'function': 'populateSource()',
                    'arguments': JSON.stringify({
                        group: group
                    }),
                    'message': 'Invalid data type, must be Array type.'
                });
                _debug.print();

                data = [];
            }


            extraData = this.options.source[group].url && this.options.source[group].data;

            if (extraData) {
                if (typeof extraData === "function") {
                    extraData = extraData();
                }

                if (extraData instanceof Array) {
                    data = data.concat(extraData);
                } else {
                    _debug.log({
                        'node': this.node.selector,
                        'function': 'populateSource()',
                        'arguments': JSON.stringify(extraData),
                        'message': 'WARNING - this.options.source.' + group + '.data Must be an Array or a function that returns an Array.'
                    });

                    _debug.print();
                }
            }

            var tmpObj,
                display;

            if (this.options.source[group].display) {
                display = this.options.source[group].display[0];
            } else {
                display = this.options.display[0];
            }
            for (var i = 0; i < data.length; i++) {
                if (typeof data[i] === "string") {
                    tmpObj = {};
                    tmpObj[display] = data[i];
                    data[i] = tmpObj;
                }
            }
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

        incrementGeneratedGroup: function() {

            this.generatedGroupCount += 1;

            if (this.groupCount !== this.generatedGroupCount) {
                return;
            }

            this.isGenerated = true;

            this.node.trigger('dynamic' + _namespace);

        },

        navigate: function(e) {

            this.helper.executeCallback(this.options.callback.onNavigate, [this.node, this.query, e]);

            var itemList = this.resultContainer.find('> ul > li:not([data-search-group])'),
                activeItem = itemList.filter('.active'),
                activeItemIndex = activeItem[0] && itemList.index(activeItem) || null;

            if (e.keyCode === 27) {

                e.preventDefault();
                this.hideLayout();

                return;
            }

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

        searchResult: function() {

            this.item = {};

            this.helper.executeCallback(this.options.callback.onSearch, [this.node, this.query]);

            this.result = [];
            this.resultCount = 0;

            var scope = this,
                group,
                item,
                match,
                comparedDisplay,
                comparedQuery = this.query,
                itemPerGroup = {},
                groupBy = this.filters.dropdown && this.filters.dropdown.key || this.groupBy,
                hasDynamicFilters = this.filters.dynamic && !this.helper.isEmpty(this.filters.dynamic),
                displayKeys,
                missingDisplayKey = {},
                filter;

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
                    item.group = group;

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
                                missingDisplayKey[i] = {
                                    display: displayKeys[i],
                                    data: item
                                };
                                continue;
                            }

                            comparedDisplay = comparedDisplay.toString();

                            if (this.options.accent) {
                                comparedDisplay = this.helper.removeAccent(comparedDisplay);
                            }

                            match = comparedDisplay.toLowerCase().indexOf(comparedQuery.toLowerCase()) + 1;

                            if (!match) continue;
                            if (match && this.options.offset && match !== 1) continue;
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
            if (!this.helper.isEmpty(missingDisplayKey)) {
                _debug.log({
                    'node': this.node.selector,
                    'function': 'searchResult()',
                    'arguments': JSON.stringify(missingDisplayKey),
                    'message': 'Missing keys for display, make sure options.display is set properly.'
                });

                _debug.print();
            }

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
                        function(a) {
                            return a.toString().toUpperCase()
                        }
                    )
                );
            }

            this.helper.executeCallback(this.options.callback.onResult, [this.node, this.query, this.result, this.resultCount]);

        },

        buildLayout: function() {

            if (!this.resultContainer) {
                this.resultContainer = $("<div/>", {
                    "class": this.options.selector.result
                });

                this.container.append(this.resultContainer);
            }
            var _query = this.query.toLowerCase();
            if (this.options.accent) {
                _query = this.helper.removeAccent(_query);
            }

            var scope = this,
                resultHtmlList = $("<ul/>", {
                    "class": this.options.selector.list + (scope.helper.isEmpty(scope.result) ? ' empty' : ''),
                    "html": function() {

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

                            (function(index, item, ulScope) {

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
                                    if (scope.options.highlight) {
                                        if (_display[_displayKey]) {
                                            _display[_displayKey] = scope.helper.highlight(_display[_displayKey], _query, scope.options.accent);
                                        } else {

                                            _debug.log({
                                                'node': scope.node.selector,
                                                'function': 'buildLayout()',
                                                'arguments': JSON.stringify(item),
                                                'message': 'WARNING - Missing display key: "' + _displayKey + '"'
                                            });

                                            _debug.print();

                                        }
                                    }
                                }

                                _liHtml = $("<li/>", {
                                    "html": $("<a/>", {
                                        "href": function() {

                                            if (_href) {
                                                if (typeof _href === "string") {
                                                    _href = _href.replace(/\{\{([a-z0-9_\-\.]+)\|?(\w+)?}}/gi, function(match, index, option) {

                                                        var value = scope.helper.namespace(index, item, 'get') || match;
                                                        if (option && option === "raw") {
                                                            return value;
                                                        }
                                                        return value !== match && scope.helper.slugify(value) || value;

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
                                        "html": function() {

                                            _template = (item.group && scope.options.source[item.group].template) || scope.options.template;

                                            if (_template) {
                                                _aHtml = _template.replace(/\{\{([a-z0-9_\-\.]+)\|?(\w+)?}}/gi, function(match, index, option) {

                                                    var value = scope.helper.namespace(index, item, 'get') || match;
                                                    if (option && option === "raw") {
                                                        return value;
                                                    }

                                                    return scope.helper.namespace(index, _display, 'get') || value;

                                                });
                                            } else {
                                                _aHtml = '<span class="' + scope.options.selector.display + '">' + scope.helper.joinObject(_display, " ") + '</span>';
                                            }

                                            $(this).append(_aHtml);

                                        },
                                        "click": ({
                                            "item": item
                                        }, function(e) {

                                            if (scope.options.mustSelectItem && scope.helper.isEmpty(item)) {
                                                e.preventDefault();
                                                return;
                                            }

                                            scope.helper.executeCallback(scope.options.callback.onClickBefore, [scope.node, this, item, e]);

                                            if (e.isDefaultPrevented()) {
                                                return;
                                            }

                                            e.preventDefault();

                                            scope.query = scope.rawQuery = item[item.matchedKey].toString();
                                            scope.node.val(scope.query).focus();

                                            scope.searchResult();
                                            scope.buildLayout();
                                            scope.hideLayout();

                                            scope.item = item;

                                            scope.helper.executeCallback(scope.options.callback.onClickAfter, [scope.node, this, item, e]);

                                        }),
                                        "mouseenter": function(e) {

                                            $(this).closest('ul').find('li.active').removeClass('active');
                                            $(this).closest('li').addClass('active');

                                            scope.helper.executeCallback(scope.options.callback.onMouseEnter, [scope.node, this, item, e]);
                                        },
                                        "mouseleave": function(e) {

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

            if (this.options.callback.onLayoutBuiltBefore) {
                var tmpResultHtmlList = this.helper.executeCallback(this.options.callback.onLayoutBuiltBefore, [this.node, this.query, this.result, resultHtmlList]);

                if (tmpResultHtmlList instanceof jQuery) {
                    resultHtmlList = tmpResultHtmlList;
                } else {
                    _debug.log({
                        'node': this.node.selector,
                        'function': 'callback.onLayoutBuiltBefore()',
                        'message': 'Invalid returned value - You must return resultHtmlList jQuery Object'
                    });

                    _debug.print();
                }
            }

            this.container.addClass('result');

            this.resultContainer
                .html(resultHtmlList);

            if (this.options.callback.onLayoutBuiltAfter) {
                this.helper.executeCallback(this.options.callback.onLayoutBuiltAfter, [this.node, this.query, this.result]);
            }

            if (this.options.backdrop) {

                if (this.backdrop.container) {
                    this.backdrop.container.show();
                } else {
                    this.backdrop.css = $.extend({
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
                        "click": function() {
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
                                'click': function() {
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

                    this.hintIndex = null;

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
        },

        buildDropdownLayout: function() {

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
                "html": function() {

                    $(this).append(
                        $('<button/>', {
                            "type": "button",
                            "class": scope.options.selector.filterButton,
                            "html": "<span class='" + scope.options.selector.filterValue + "'>" + defaultText + "</span> <span class='" + scope.options.selector.dropdownCarret + "'></span>",
                            "click": function(e) {

                                e.stopPropagation();

                                var filterContainer = scope.container.find('.' + scope.options.selector.dropdown.replace(" ", "."));

                                if (!filterContainer.is(':visible')) {
                                    scope.container.addClass('filter');
                                    filterContainer.show();

                                    $('html').off(_namespace + ".dropdownFilter")
                                        .on("click" + _namespace + ".dropdownFilter" + ' touchstart' + _namespace + ".dropdownFilter", function() {
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
                            "html": function() {

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

                                    (function(i, item, ulScope) {

                                        if ((!item.key && item.value !== "*") || !item.value) {
                                            _debug.log({
                                                'node': scope.node.selector,
                                                'function': 'buildDropdownLayout()',
                                                'arguments': JSON.stringify(item),
                                                'message': 'WARNING - Missing key or value, skipping dropdown filter."'
                                            });

                                            _debug.print();

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
                                                    "click": ({
                                                        "item": item
                                                    }, function(e) {
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

            validate: function(item) {

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

            set: function(key, value) {

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
            bind: function() {

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
                        _debug.log({
                            'node': this.node.selector,
                            'function': 'buildDynamicLayout()',
                            'message': 'Invalid jQuery selector or jQuery Object for "filter.selector" or missing filter.key'
                        });

                        _debug.print();
                        continue;
                    }

                    (function(filter) {
                        filter.selector.off(_namespace).on('change' + _namespace, function() {
                            scope.dynamicFilter.set.apply(scope, [filter.key, scope.dynamicFilter.getValue(this)]);
                        }).trigger('change' + _namespace);
                    }(filter));

                }
            },

            getValue: function(tag) {
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

        showLayout: function() {

            var scope = this;

            $('html').off(_namespace).on("click" + _namespace + " touchstart" + _namespace, function() {
                scope.hideLayout();
                $(this).off(_namespace);
            });
            if (!this.result.length && !this.options.emptyTemplate) {
                return;
            }

            this.container.addClass('result hint backdrop');

        },

        hideLayout: function() {

            this.container.removeClass('result hint backdrop filter');

        },

        __construct: function() {
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

            isEmpty: function(obj) {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop))
                        return false;
                }

                return true;
            },

            removeAccent: function(string) {

                if (typeof string !== "string") {
                    return;
                }

                string = string.toLowerCase().replace(new RegExp('[' + _accent.from + ']', 'g'), function(match) {
                    return _accent.to[_accent.from.indexOf(match)];
                });


                return string;
            },

            slugify: function(string) {

                string = this.removeAccent(string);
                string = string.replace(/[^-a-z0-9]+/g, '-').replace(/-+/g, '-').trim('-');

                return string;
            },

            sort: function(field, reverse, primer) {

                var key = function(x) {
                    for (var i = 0; i < field.length; i++) {
                        if (typeof x[field[i]] !== 'undefined') {
                            return primer(x[field[i]])
                        }
                    }
                };

                reverse = [-1, 1][+!!reverse];

                return function(a, b) {
                    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
                }
            },

            replaceAt: function(string, offset, length, replace) {
                return string.substring(0, offset) + replace + string.substring(offset + length);
            },

            highlight: function(string, key, accents) {

                string = String(string);

                var offset = string.toLowerCase().indexOf(key.toLowerCase());
                if (accents) {
                    offset = this.removeAccent(string).indexOf(this.removeAccent(key));
                }

                if (offset === -1 || key.length === 0) {
                    return string;
                }
                return this.replaceAt(
                    string,
                    offset,
                    key.length,
                    "<strong>" + string.substr(offset, key.length) + "</strong>"
                );
            },

            joinObject: function(object, join) {
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

            getCaret: function(element) {
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

            executeCallback: function(callback, extraParams) {

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
                    _callback = this.helper.namespace(callback[0], window, 'get');

                    if (typeof _callback !== "function") {
                        _debug.log({
                            'node': _node.selector,
                            'function': 'executeCallback()',
                            'arguments': JSON.stringify(callback),
                            'message': 'WARNING - Invalid callback function"'
                        });

                        _debug.print();

                        return false;
                    }

                }

                return _callback.apply(this, $.merge(callback[1] || [], (extraParams) ? extraParams : [])) || true;

            },

            namespace: function(namespaceString, objectReference, method, objectValue) {

                if (typeof namespaceString !== "string" || namespaceString === "") {
                    window.debug('window.namespace.' + method + ' - Missing namespaceString.');
                    return false;
                }

                var parts = namespaceString.split('.'),
                    parent = objectReference || window,
                    value = objectValue || {},
                    currentPart = '';

                for (var i = 0, length = parts.length; i < length; i++) {
                    currentPart = parts[i];

                    if (!parent[currentPart]) {
                        if (~['get', 'delete'].indexOf(method)) {
                            return false;
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

            typeWatch: (function() {
                var timer = 0;
                return function(callback, ms) {
                    clearTimeout(timer);
                    timer = setTimeout(callback, ms);
                }
            })()

        }
    };

    $.fn.typeahead = $.typeahead = function(options) {
        return _api.typeahead(this, options);
    };

    var _api = {

        typeahead: function(node, options) {

            if (!options || !options.source || typeof options.source !== 'object') {
                _debug.log({
                    'node': node.selector || options && options.input,
                    'function': '$.typeahead()',
                    'arguments': JSON.stringify(options && options.source || ''),
                    'message': 'Undefined "options" or "options.source" or invalid source type - Typeahead dropped'
                });

                _debug.print();

                return;
            }

            if (typeof node === "function") {
                if (!options.input) {
                    _debug.log({
                        'node': node.selector,
                        'function': '$.typeahead()',
                        'message': 'Undefined "options.input" - Typeahead dropped'
                    });

                    _debug.print();

                    return;
                }

                node = $(options.input);
            }

            if (node.length !== 1) {
                _debug.log({
                    'node': node.selector,
                    'function': '$.typeahead()',
                    'arguments': JSON.stringify(options.input),
                    'message': 'Unable to find jQuery input element OR more than 1 input is found - Typeahead dropped'
                });

                _debug.print();

                return;
            }

            return window.Typeahead[node.selector] = new Typeahead(node, options);

        }

    };
    var _debug = {

        table: {},
        log: function(debugObject) {

            if (!debugObject.message || typeof debugObject.message !== "string") {
                return;
            }

            this.table[debugObject.message] = $.extend({
                'node': '',
                'function': '',
                'arguments': ''
            }, debugObject)

        },
        print: function() {

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
    window.console = window.console || {
        log: function() {}
    };

    if (!('trim' in String.prototype)) {
        String.prototype.trim = function() {
            return this.replace(/^\s+/, '').replace(/\s+$/, '');
        };
    }
    if (!('indexOf' in Array.prototype)) {
        Array.prototype.indexOf = function(find, i) {
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
        Object.keys = function(obj) {
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
