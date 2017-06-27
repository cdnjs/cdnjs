/**
 * jQuery Flexdatalist.
 * Autocomplete for input fields, with support for datalists.
 *
 * Version:
 * 1.9.3
 *
 * Depends:
 * jquery.js > 1.8.3
 *
 * Demo and Documentation:
 * http://projects.sergiodinislopes.pt/flexdatalist/
 *
 * Github:
 * https://github.com/sergiodlopes/jquery-flexdatalist/
 *
 */

jQuery.fn.flexdatalist = function (options, value) {
    'use strict';
    var $document = $(document),
        $input = $(this),
        input,
        _this = this;

/**
 * Input processing.
 */
    input = function () {
        var $this = $(this),
            $_this,
            $ulMultiple,
            _cache = {},
            _previousText = '',
            _requestTimeout = null,
            _inputName = $this.attr('name');

        if ($this.hasClass('flexdatalist-set')) {
            _this._destroy($this);
        }

    /**
     * Set options.
     */
        _this._options(
            $this,
            $.extend(
                {
                    url: null,
                    data: [],
                    params: {},
                    relatives: null,
                    chainedRelatives: false,
                    cache: true,
                    minLength: 2,
                    groupBy: false,
                    selectionRequired: false,
                    focusFirstResult: false,
                    textProperty: null,
                    valueProperty: null,
                    visibleProperties: [],
                    searchIn: ['label'],
                    searchContain: false,
                    searchEqual: false,
                    searchByWord: false,
                    searchDisabled: false,
                    normalizeString: null,
                    multiple: $this.is('[multiple]'),
                    maxShownResults: 100,
                    noResultsText: 'No results found for "{keyword}"',
                    toggleSelected: false,
                    allowDuplicateValues: false,
                    requestType: 'get',
                    limitOfValues: 0,
                    _values: []
                },
                $this.data(),
                (typeof options === 'object' ? options : {})
            )
        );

    /**
     * Option management.
     */
        $this._options = function (option, _value) {
            return _this._options($this, option, _value);
        }

        // Handle multiple values
        $_this = $this
            .clone(false)
            .attr({
                'list': null,
                'name': null,
                'id': ($this.attr('id') ? $this.attr('id') + '-flexdatalist' : null)
            })
            .addClass('flexdatalist-alias')
            .removeClass('flexdatalist');
        if ($this._options('multiple')) {
            $ulMultiple = $('<ul>')
                .addClass('flexdatalist-multiple')
                .css({
                    'border-color': $this.css('border-left-color'),
                    'border-width': $this.css('border-left-width'),
                    'border-style': $this.css('border-left-style'),
                    'border-radius': $this.css('border-top-left-radius'),
                    'background-color': $this.css('background-color')
                })
                .insertAfter($this).click(function () {
                    $(this).find('input').focus();
                });
            $('<li class="input-container">')
                .addClass('flexdatalist-multiple-value')
                .append($_this)
                .appendTo($ulMultiple);
        } else {
            $_this.insertAfter($this);
        }

        // Respect autofocus attribute
        if ($_this.attr('autofocus')) {
            $_this.focus();
        }

    /**
     * Initialize.
     */
        $this._init = function () {
            var _options = $this._options();

            // Listen to parent input key presses and state events.
            $_this
            // Keydown
            .on('input keydown', function (event) {
                var val = $this._keyword();
                // Comma separated values
                if ((_this._keyNum(event) === 188 || _this._keyNum(event) === 13)
                    && !_options.selectionRequired
                    && _options.multiple
                    && !$this._resultSelected()) {
                    event.preventDefault();
                    $this._value(val);
                    $this._removeResults();
                // Remove results on tab away
                } else if (_this._keyNum(event) === 9) {
                    $this._removeResults();
                // Check if is to remove previous value on backspace key
                } else if (val.length === 0 && _options.multiple && _this._keyNum(event) === 8) {
                    $_this.data('_remove', $_this.parents('li:eq(0)').prev());
                }

            // Keyup
            }).on('input keyup', function (event) {
                if ($this._changed() && _this._keyNum(event) !== 13) {
                    var keyword = $this._keyword();
                    if (!_options.multiple) {
                        _options._values = [];
                        if (!_options.selectionRequired) {
                            $this._value(keyword);
                        } else {
                            $this._value('');
                        }
                    }
                    if (keyword.length >= _options.minLength) {
                        $this._search(function (matches) {
                            $this._showResults(matches);
                        });
                    } else {
                        $this._removeResults();
                    }
                }
                // Remove previous value on backspace key
                var $remove = $_this.data('_remove');
                if ($remove) {
                    $remove.find('.fdl-remove').click();
                    $_this.data('_remove', null);
                }
                _previousText = $this._keyword();

            // Focus
            }).on('focus', function () {
                var val = $this._keyword();
                if (_options.minLength === 0) {
                    if (val === '') {
                        $this._tdata(function (data) {
                            $this._showResults(data);
                        });
                    }
                // Redo search on focus if not selected yet
                } else if (val.length >= _options.minLength && !$this._selected()) {
                    $this._search(function (matches) {
                        $this._showResults(matches);
                    });
                }

            // Blur
            }).on('blur', function () {
                // Set value user leaves string in field onblur
                if (!$this._resultSelected() && _options.multiple && !_options.selectionRequired) {
                    $this._value($this._keyword());
                }
            })
            .attr('autocomplete', 'off');

            window.onresize = function (event) {
                $this._position();
            };
            $this.addClass('flexdatalist flexdatalist-set').prop('type', 'hidden');
        }

    /**
     * Check search result is selected.
     */
        $this._resultSelected = function () {
            return $('ul.flexdatalist-results').find('li.item.active').length > 0;
        }

    /**
     * Check if field's text has changed.
     */
        $this._changed = function () {
            return _previousText !== $this._keyword();
        }

    /**
     * Check chained relatives.
     */
        $this._chained = function () {
            var _options = $this._options();
            if (!_options.relatives || !_options.chainedRelatives) {
                return;
            }
            var toggle = function (init) {
                _options.relatives.each(function () {
                    var disabled = _this._isEmpty($(this).val()),
                        empty = _this._isEmpty($this.val());
                    $_this.prop('disabled', disabled);
                    if (!init && (disabled || !empty)) {
                        $this._value('');
                        $_this.val('');
                        if (_options.multiple) {
                            $ulMultiple.find('li .fdl-remove').click();
                        }
                    }
                    if ($ulMultiple) {
                        disabled && $ulMultiple ? $ulMultiple.addClass('disabled') : $ulMultiple.removeClass('disabled');
                    }
                });
            }
            _options.relatives.on('change', function () {
                toggle();
                _cache = {};
            });
            toggle(true);
        }

    /**
     * Process value in input on init.
     */
        $this._initValue = function () {
            var value = $this.attr('value');
            if (_this._isEmpty(value)) {
                return;
            }
            $this._options('originalValue', $this.val());
            $this._parseValue(value, function (values) {
                $this.val('', true);
                $_this.val('');
                if (!_this._isEmpty(values)) {
                    $this._values(values, true);
                }
                _previousText = $this._keyword();
            });
        }

    /**
     * Parse initial value.
     */
        $this._parseValue = function (data, callback) {
            var _options = $this._options();
            if ($this._toJSON()) {
                try {
                    callback(JSON.parse(data));
                } catch (e) {}
            } else if ($this._toCSV() || typeof _options.valueProperty === 'string') {
                var values = data.split(',');
                if (typeof _options.valueProperty === 'string') {
                    var _searchIn = _options.searchIn;
                    _options.searchIn = _options.valueProperty.split(',');
                    _options.searchEqual = true;
                    $this._search(function (matches) {
                        if (matches.length > 0) {
                            callback(matches);
                        }
                        _options.searchIn = _searchIn;
                        _options.searchEqual = false;
                    }, values);
                } else {
                    callback(values);
                }
            } else {
                callback(data);
            }
        }

    /**
     * Get data.
     */
        $this._tdata = function (callback) {
            $this.trigger('before:flexdatalist.data');
            $this._url(function (remoteData) {
                $this._data(function (data) {
                    data = data.concat(remoteData);
                    // Check for already set values
                    var values = $this._options('_values');
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        if (values && values.indexOf($this._getText(item)) > -1) {
                            delete data[i];
                        }
                    }
                    $this.trigger('after:flexdatalist.data', [data]);
                    callback(data);
                });
            });
        }

    /**
     * Get static data.
     */
        $this._data = function (callback) {
            var _options = $this._options();
            if (typeof _options.data === 'string') {
                $this._remote({
                    url: _options.data,
                    success: function (data) {
                        var _data = $this._getRemoteData(data);
                        _options.data = _data;
                        callback(_data);
                    }
                });
            } else {
                callback(_options.data);
            }
        }

    /**
     * Get remote data.
     */
        $this._url = function (callback) {
            var _options = $this._options(),
                keyword = $this._keyword(),
                value = $this.val(),
                cacheKey = keyword;

            if (_this._isEmpty(_options.url)) {
                return callback([]);
            }

            clearTimeout(_requestTimeout);
            _requestTimeout = setTimeout(function () {
                if (_options.cache && _options.cache !== 2) {
                    cacheKey = keyword.substring(0, (_options.minLength > 0 ? _options.minLength : 1));
                }

                // Check cache
                var cachedData = $this._cache(cacheKey);
                if (cachedData && _options.cache) {
                    callback(cachedData);
                    return;
                }
               
                var _opts = {};
                if (_options.requestType == 'post') {
                    $.each(_options, function (option, value) {
                        if (option.indexOf('_') == 0) {
                            return;
                        }
                        _opts[option] = value;
                    });
                    delete _opts.relatives;
                }

                $this._remote({
                    url: _options.url,
                    data: $.extend(
                        $this._relativesData(),
                        _options.params,
                        {
                            keyword: keyword,
                            contain: _options.searchContain,
                            selected: value,
                            options: _opts
                        }
                    ),
                    success: function (data) {
                        var _data = $this._getRemoteData(data),
                            _keyword = $this._keyword();
                        if (_keyword.length >= keyword.length) {
                            callback(_data);
                        }
                        $this._cache(cacheKey, _data);
                    }
                });
            }, 200);
        }

    /**
     * AJAX request.
     */
        $this._remote = function (options) {
            // Prevent get data when pressing back button
            if ($this.hasClass('flexdatalist-loading')) {
                return;
            }
            $this.addClass('flexdatalist-loading');
            options = $.extend({
                type: $this._options('requestType'),
                dataType: 'json',
                complete: function () {
                    $this.removeClass('flexdatalist-loading');
                }
            }, options);
            $.ajax(options);
        }

    /**
     * Extract remote data from server response.
     */
        $this._getRemoteData = function (data) {
            var _data = data.results ? data.results : data;
            if (typeof _data === 'string' && _data.indexOf('[{') === 0) {
                _data = JSON.parse(_data);
            }
            if (_data.options) {
                _this._options($this, _data.options);
            }
            if (_this._isObject(_data)) {
                return _data;
            }
            return [];
        }

    /**
     * Get relatives data.
     */
        $this._relativesData = function () {
            var relatives = $this._options('relatives'),
                data = {};
            if (relatives) {
                data['relatives'] = {};
                relatives.each(function () {
                    var $_input = $(this),
                        name = $_input.attr('name')
                            .split('][').join('-')
                            .split(']').join('-')
                            .split('[').join('-')
                            .replace(/^\|+|\-+$/g, '');
                    data['relatives'][name] = $_input.val();
                });
            }
            return data;
        }

    /**
     * Set datalist data, if exists.
     */
        $this._datalist = function () {
            var _options = $this._options(),
                list = $this.attr('list');
            if (!_this._isEmpty(list)) {
                _options.data = [];
                $('#' + list).find('option').each(function () {
                    var $option = $(this),
                        val = $option.val(),
                        label = $option.text();
                    _options.data.push({
                        label: (label.length > 0 ? label : val),
                        value: val
                    });
                });
            }
            return $this;
        }

    /**
     * Cached data.
     */
        $this._cache = function (key, data) {
            if ($this._options('cache')) {
                key = $this._normalizeString(key);
                if (!_this._isDefined(data)) {
                    if (_this._isDefined(_cache, key)) {
                        data = _cache[key];
                    }
                    return data;
                }
                _cache[key] = data;
            }
            return null;
        }

    /**
     * Search for keywords in data and return matches.
     */
        $this._search = function (callback, keywords) {
            $this._tdata(function (data) {
                var matches = [],
                    _options = $this._options();
                // If search disabled, return
                if (_options.searchDisabled) {
                    return callback(data);
                }
                if (!_this._isDefined(keywords)) {
                    keywords = $this._keyword();
                }

                $this.trigger('before:flexdatalist.search', [keywords, data]);
                keywords = $this._split(keywords);
                for (var index = 0; index < data.length; index++) {
                    var item = $this._matches(data[index], keywords);
                    if (item) {
                        matches.push(item);
                    }
                }
                $this.trigger('after:flexdatalist.search', [keywords, data, matches]);
                callback(matches);
            });
        }

    /**
     * Match against searchable properties.
     */
        $this._matches = function (item, keywords) {
            var hasMatches = false,
                _item = $.extend({}, item),
                _options = $this._options(),
                found = [],
                searchIn = _options.searchIn;

            if (keywords.length > 0) {
                for (var index = 0; index < searchIn.length; index++) {
                    var searchProperty = searchIn[index];
                    if (!_this._isDefined(item, searchProperty) || !item[searchProperty]) {
                        continue;
                    }
                    var text = item[searchProperty].toString(),
                        highlight = text,
                        strings = $this._split(text);
                    for (var kwindex = 0; kwindex < keywords.length; kwindex++) {
                        var keyword = keywords[kwindex];
                        if ($this._find(keyword, strings)) {
                            found.push(keyword);
                            highlight = $this._highlight(keyword, highlight);
                        }
                    }
                    if (highlight !== text) {
                        _item[searchProperty + '_highlight'] = $this._highlight(highlight);
                    }
                }
            }
            if (found.length === 0 || (_options.searchByWord && found.length < (keywords.length - 1))) {
                return false;
            }
            return _item;
        }

    /**
     * Wrap found keyword with span.highlight.
     */
        $this._highlight = function (keyword, text) {
            if (text) {
                return text.replace(
                    new RegExp(keyword, ($this._options('searchContain') ? "ig" : "i")),
                    '|:|$&|::|'
                );
            }
            keyword = keyword.split('|:|').join('<span class="highlight">');
            return keyword.split('|::|').join('</span>');
        }

    /**
     * Search for keyword(s) in string.
     */
        $this._find = function (keyword, strings) {
            var _options = $this._options();
            for (var index = 0; index < strings.length; index++) {
                var text = strings[index];
                text = $this._normalizeString(text),
                keyword = $this._normalizeString(keyword);
                if (_options.searchEqual && text == keyword) {
                    return true;
                }
                if ((_options.searchContain ? (text.indexOf(keyword) >= 0) : (text.indexOf(keyword) === 0))) {
                    return true;
                }
            }
            return false;
        }

    /**
     * Split string by words if needed.
     */
        $this._split = function (keywords) {
            if (typeof keywords === 'string') {
                keywords = [$.trim(keywords)];
            }
            var _options = $this._options();
            if (_options.searchByWord) {
                for (var index = 0; index < keywords.length; index++) {
                    var keyword = $.trim(keywords[index]);
                    if (keyword.indexOf(' ') > 0) {
                        var words = keyword.split(' ');
                        $.merge(keywords, words);
                    }
                }
            }
            return keywords;
        }

    /**
     * Show results.
     */
        $this._showResults = function (data) {
            $this._removeResults(true);
            var _options = $this._options();
            if (data.length === 0) {
                $this._noResults(_options.noResultsText);
                return;
            }

            var $ul = $this._getResultsContainer();
            if (!_options.groupBy) {
                $this._items(data, $ul);
            } else {
                data = $this._groupData(data);
                Object.keys(data).forEach(function (groupName, index) {
                    var items = data[groupName],
                        property = _options.groupBy,
                        groupText = $this._getHighlight(items[0], property, groupName);

                    var $li = $('<li>')
                            .addClass('group')
                            .append($('<span>')
                                .addClass('group-name')
                                .html(groupText)
                            )
                            .append($('<span>')
                                .addClass('group-item-count')
                                .text(' ' + items.length)
                            )
                            .appendTo($ul);

                    $this._items(items, $ul);
                });
            }

            var $li = $ul.find('li:not(.group)');
            $li.on('click', function (event) {
                var item = $(this).data('item');
                if (item) {
                    $this._selected(true)._removeResults()._value(item);
                    $this.trigger('select:flexdatalist', [item, _options]);
                }
            }).hover(function () {
                $li.removeClass('active');
                $(this).addClass('active');
            }, function () {
                $(this).removeClass('active');
            });

            if (_options.focusFirstResult) {
                $li.filter(':first').addClass('active');
            }
        }

    /**
     * No results found text.
     */
        $this._noResults = function (text) {
            if (_this._isEmpty(text)) {
                return;
            }
            var $container = $this._getResultsContainer(),
                keyword = $this._keyword();

            text = text.split('{keyword}').join(keyword);
            $('<li>')
                .addClass('item no-results')
                .append(text)
                .appendTo($container)
        }

    /**
     * Group data by property name.
     */
        $this._groupData = function (items) {
            var data = [],
                groupProperty = $this._options('groupBy');
            for (var index = 0; index < items.length; index++) {
                var _data = items[index];
                if (_this._isDefined(_data, groupProperty)) {
                    var propertyValue = _data[groupProperty];
                    if (!_this._isDefined(data, propertyValue)) {
                        data[propertyValue] = [];
                    }
                    data[propertyValue].push(_data);
                }
            }
            return data;
        }

    /**
     * Items iteration.
     */
        $this._items = function (items, $resultsContainer) {
            var max = $this._options('maxShownResults');
            $this.trigger('show:flexdatalist.results', [items]);
            for (var index = 0; index < items.length; index++) {
                if (max > 0 && max === index) {
                    break;
                }
                $this._item(items[index]).appendTo($resultsContainer);
            }
            $this.trigger('shown:flexdatalist.results', [items]);
        }

    /**
     * Result item creation.
     */
        $this._item = function (item) {
            var $li = $('<li>')
                    .data('item', item)
                    .addClass('item'),
                _options = $this._options(),
                visibleProperties = _options.visibleProperties;

            for (var index = 0; index < visibleProperties.length; index++) {
                var visibleProperty = visibleProperties[index];
                if (_options.groupBy && _options.groupBy === visibleProperty || !_this._isDefined(item, visibleProperty)) {
                    continue;
                }
                var $item = {};
                if (visibleProperty === 'thumb') {
                    // Thumbnail image
                    $item = $('<img>')
                        .addClass('item item-' + visibleProperty)
                        .attr('src', item[visibleProperty]);
                } else {
                    var propertyText = $this._getHighlight(item, visibleProperty);
                    // Other text properties
                    $item = $('<span>')
                        .addClass('item item-' + visibleProperty)
                        .html(propertyText + ' ');
                }
                $item.appendTo($li);
            }
            return $li;
        }

    /**
     * Check if highlighted property value exists,
     * if true, return it, if not, fallback to given string
     */
        $this._getHighlight = function (item, property, fallback) {
            if (_this._isDefined(item, property + '_highlight')) {
                return item[property + '_highlight'];
            }
            return (_this._isDefined(item, property) ? item[property] : fallback);
        }

    /**
     * Get/create list container.
     */
        $this._getResultsContainer = function () {
            var $target = $this;
            if ($this._options('multiple')) {
                $target = $ulMultiple;
            }
            var $container = $('ul.flexdatalist-results');
            if ($container.length === 0) {
                $container = $('<ul>')
                    .addClass('flexdatalist-results')
                    .appendTo('body')
                    .css({
                        'border-color': $target.css("border-left-color"),
                        'border-width': '1px',
                        'border-bottom-left-radius': $target.css("border-bottom-left-radius"),
                        'border-bottom-right-radius': $target.css("border-bottom-right-radius")
                    }).data('target', $_this);
                $this._position();
            }
            return $container;
        }

    /**
     * Remove results.
     */
        $this._removeResults = function (itemsOnly) {
            var selector = 'ul.flexdatalist-results';
            if (itemsOnly) {
                selector = 'ul.flexdatalist-results li';
            }
            $(selector).remove();
            return $this;
        }

    /**
     * Check if is selected or set field as selected.
     */
        $this._selected = function (selected) {
            var className = 'flexdatalist-selected';
            if (!_this._isDefined(selected)) {
                return $this.hasClass(className);
            }
            selected ? $this.addClass(className) : $this.removeClass(className);
            return $this;
        }

    /**
     * Set multiple values.
     */
        $this._values = function (values, init) {
            if ($.isArray(values) && !_this._isEmpty(values)) {
                $.each(values, function (i, value) {
                    $this._value(value, init);
                });
                return;
            }
            $this._value(values, init);
        }

    /**
     * Set value on item selection.
     */
        $this._value = function (val, init) {
            var _options = $this._options(),
                text = $this._getText(val),
                value = $this._getValue(val);

            if (text.length > 0 && !_options.allowDuplicateValues) {
                _options._values.push(text);
            }

            if (_options.multiple) {
                if (val === '') {
                    return $this;
                }
                $_this.val('');
                var $inputContainer = $ulMultiple.find('li.input-container'),
                    $li = $('<li>')
                        .addClass('value' + (_options.toggleSelected ? ' toggle' : ''))
                        .append('<span class="text">' + text + '</span>')
                        .append('<span class="fdl-remove">&times;</span>')
                        .insertBefore($inputContainer);
                // Refocus input
                $inputContainer.find('input').focus();
                $li.find('span.fdl-remove').click(function () {
                    var $container = $(this).parent(),
                        index = $container.index();
                    if (!$container.hasClass('disabled') && ($this._toJSON() || $this._toCSV())) {
                        var currentValue = $this._normalizeValue();
                        currentValue.splice(index, 1);
                        _options._values.splice(index, 1);
                        $this._normalizeValue(currentValue);
                        $this._allowValues();
                    }
                    $container.remove();
                });
                // Toggle selected option
                if (_options.toggleSelected) {
                    $li.click(function () {
                        var $clicked = $(this),
                            currentValue = $this._normalizeValue(),
                            index = $clicked.index();
                        if ($clicked.hasClass('disabled')) {
                            var value = $clicked.data('_value');
                            currentValue.splice(index, 0, value);
                            _options._values.splice(index, 0, $this._getText(value));
                            $clicked.removeClass('disabled');
                        } else {
                            var value = currentValue.splice(index, 1);
                            $clicked.data('_value', value[0]);
                            _options._values.splice(index, 1);
                            $clicked.addClass('disabled');
                        }
                        $this._normalizeValue(currentValue, text);
                    });
                }
            } else if (text && text !== $_this.val()) {
                $_this.val(text);
            }
            $this._normalizeValue(value, text, init);
            _previousText = $this._keyword();
            return $this;
        }

    /**
     * Get/Set input value.
     */
        $this._normalizeValue = function (value, text, init) {
            var isJSON = $this._toJSON(),
                _options = $this._options(),
                isCSV = $this._toCSV();

            if (!_this._isDefined(value)) {
                value = $this.val();
                if (value) {
                    if (isJSON) {
                        value = JSON.parse(value);
                    } else if (isCSV) {
                        value = value.split(',');
                    }
                } else if (isJSON || isCSV) {
                    value = [];
                }
                return value;
            }

            $this._allowValues();

            if (_this._isObject(value)) {
                if (isJSON && !_this._isEmpty(value)) {
                    value = JSON.stringify(value);
                } else if (isCSV) {
                    value = value.join(',');
                }
            }
            if (value == $this.val()) {
                return value;
            }
            if (value === '') {
                $this._options('_values', []);
            }
            $this.val(value, true);
            if (!init && $this._changed()) {
                $this.trigger('change:flexdatalist', [value, text, $this._options()]).trigger('change');
            }
            return value;
        }

    /**
     * Get text that will be shown to user on input field.
     */
        $this._getText = function (item) {
            var text = item,
                _options = $this._options();

            if (_this._isObject(item)) {
                text = item[_options.searchIn[0]];
                if (_this._isDefined(item, _options.textProperty)) {
                    text = item[_options.textProperty];
                } else {
                    text = $this._replacePlaceholders(item, _options.textProperty, text);
                }
            }
            return $('<div>').html(text).text();
        }

    /**
     * Get the value that will be added to hidden input.
     * This is the value that eventually will be sent on form submittion.
     */
        $this._getValue = function (item) {
            var value = item,
                _options = $this._options();
            if (_this._isObject(item)) {
                value = item[_options.searchIn[0]];
                if (_options.valueProperty === '*') {
                    value = item;
                } else if (_this._isDefined(item, _options.valueProperty)) {
                    value = item[_options.valueProperty];
                } else if ($this._toJSON()) {
                    var value = {},
                        properties = _options.valueProperty,
                        textProperty = _options.textProperty;

                    // Add placeholder properties to list
                    if (textProperty) {
                        var _properties = textProperty;
                        if (typeof textProperty === 'string') {
                            _properties = $this._parsePlaceholders(textProperty);
                        }
                        if (_this._isObject(_properties)) {
                            $.each(_properties, function (string, property) {
                                properties.push(property);
                            });
                        }
                    } else if (_this._isDefined(item, textProperty)) {
                        properties.push(textProperty);
                    }

                    $.each(properties, function (i, property) {
                        if (_this._isDefined(item, property)) {
                            value[property] = item[property];
                        }
                    });
                }
            }
            if (_options.multiple && ($this._toJSON() || $this._toCSV())) {
                var currentValue = $this._normalizeValue();
                if (!_this._isEmpty(value) && _this._isObject(currentValue)) {
                    currentValue.push(value);
                    value = currentValue;
                }
            }
            return value;
        }

    /**
     * Replace placeholders ('{property_name}') in text
     * with respective property value.
     */
        $this._replacePlaceholders = function (item, pattern, value) {
            if (_this._isObject(item) && typeof pattern === 'string') {
                var properties = $this._parsePlaceholders(pattern);
                if (!_this._isEmpty(item) && properties) {
                    $.each(properties, function (string, property) {
                        if (_this._isDefined(item, property)) {
                            pattern = pattern.replace(string, item[property]);
                        }
                    });
                    return pattern;
                }
            }
            return value;
        }

    /**
     * Extract placeholders property names.
     */
        $this._parsePlaceholders = function (pattern) {
            var matches = pattern.match(/\{.+?\}/g);
            if (matches) {
                var properties = {};
                matches.map(function (string) {
                    properties[string] = string.slice(1, -1);
                });
                return properties;
            }
            return false;
        }

    /**
     * Toggle input visibility in multiple values setup.
     */
        $this._allowValues = function () {
            var _options = $this._options();
            if (_options.limitOfValues > 0 && _options.multiple) {
                var $inputItem = $ulMultiple.find('.flexdatalist-multiple-value');
                (_options._values.length >= _options.limitOfValues ? $inputItem.hide() : $inputItem.show());
            }
        }

    /**
     * Normalize string to a consistent one to perform the search/match.
     */
        $this._normalizeString = function (string) {
            if (typeof string === 'string') {
                var normalizeString = $this._options('normalizeString');
                if (typeof normalizeString === 'function') {
                    string = normalizeString(string);
                }
                return string.toUpperCase();
            }
            return string;
        }

    /**
     * Get keyword with left trim.
     */
        $this._keyword = function () {
            return $_this.val().replace(/^\s+/, "");
        }

    /**
     * Check if input value must be a JSON string.
     */
        $this._toJSON = function () {
            var valueProperty = $this._options('valueProperty');
            return _this._isObject(valueProperty) || valueProperty === '*';
        }

    /**
     * Check if input value must be a CSV string.
     */
        $this._toCSV = function () {
            return (!$this._toJSON() && $this._options('multiple'));
        }

    /**
     * Position results below parent element.
     */
        $this._position = function () {
            var $target = $_this;
            if ($this._options('multiple')) {
                $target = $ulMultiple;
            }
            // Set some required CSS properties
            $('ul.flexdatalist-results').css({
                'width': $target.outerWidth() + 'px',
                'top': (($target.offset().top + $target.outerHeight())) + 'px',
                'left': $target.offset().left + 'px'
            });
        }
        // Initialize
        $this._init();
        // Set datalist data
        $this._datalist();
        // Handle chained fields
        $this._chained();
        // Process default value
        $this._initValue();
    };

/**
 * Destroy.
 */
    this._destroy = function ($_input) {
        if (!$_input) {
            $_input = $input;
        }
        $_input.each(function () {
            var data = $(this).data('flexdatalist');
            $(this).removeClass('flexdatalist-set')
                .attr('type', 'text')
                .val((data && data.originalValue ? data.originalValue : ''))
                .removeData('flexdatalist')
                .next('.flexdatalist-alias, ul.flexdatalist-multiple')
                .remove();
        });
    }

/**
 * Reset.
 */
    this._reset = function () {
        this._destroy();
    }

/**
 * Change value.
 */
    this._setValue = function (value) {
        $input.each(function () {
            var $_input = $(this);
            var _data = $_input.data('flexdatalist');
            if (_this._isDefined(_data)) {
                _data['originalValue'] = value;
                if (value == '') {
                    $_input
                        .val(value, true);
                    if (_data.multiple) {
                        $_input
                            .next('ul.flexdatalist-multiple')
                            .find('li.value')
                            .remove();
                    }
                    return;
                }
                _this._destroy();
            }
        });
    }

/**
 * Get key code from event.
 */
    this._keyNum = function (event) {
        return event.which || event.keyCode;
    }

    // Handle selection list keyboard shortcuts and events.
    if (!$document.data('flexdatalist')) {
        // Remove results on outside click
        $(document).mouseup(function (event) {
            var $container = $('.flexdatalist-results'),
                $target = $container.data('target');
            if ((!$target || !$target.is(':focus')) && !$container.is(event.target) && $container.has(event.target).length === 0) {
                $container.remove();
            }
        // Keyboard navigation
        }).keydown(function (event) {
            var $ul = $('.flexdatalist-results'),
                $li = $ul.find('li'),
                $active = $li.filter('.active'),
                index = $active.index(),
                length = $li.length,
                keynum = _this._keyNum(event);

            if (length === 0) {
                return;
            }

            // on escape key, remove results
            if (_this._keyNum(event) === 27) {
                return $ul.remove();
            }

            // Enter key
            if (keynum === 13) {
                event.preventDefault();
                $active.click();
            // Up/Down key
            } else if (keynum === 40 || keynum === 38) {
                event.preventDefault();
                // Down key
                if (keynum === 40) {
                    if (index < length && $active.nextAll('.item').first().length > 0) {
                        $active = $active.removeClass('active').nextAll('.item').first().addClass('active');
                    } else {
                        $active = $li.removeClass('active').filter('.item:first').addClass('active');
                    }
                // Up key
                } else if (keynum === 38) {
                    if (index > 0 && $active.prevAll('.item').first().length > 0) {
                        $active = $active.removeClass('active').prevAll('.item').first().addClass('active');
                    } else {
                        $active = $li.removeClass('active').filter('.item:last').addClass('active');
                    }
                }

                // Scroll to
                var position = ($active.prev().length === 0 ? $active : $active.prev()).position().top;
                $ul.animate({
                    scrollTop: position + $ul.scrollTop()
                }, 100);
            }
        }).data('flexdatalist', true);
    }

/**
 * Is variable empty.
 */
    this._isEmpty = function (value) {
        if (!_this._isDefined(value)) {
            return true;
        } else if (value === null) {
            return true;
        } else if (value === true) {
            return false;
        } else if (this._length(value) === 0) {
            return true;
        } else if ($.trim(value) === '') {
            return true;
        }
        return false;
    }

/**
 * Is variable an object.
 */
    this._isObject = function (value) {
        return (value && typeof value === 'object');
    }

/**
 * To array.
 */
    this._csvToArray = function (value, _default) {
        if (value.length === 0) {
            return _default;
        }
        return typeof value === 'string' ? value.split(',') : value;
    }

/**
 * Get length of variable.
 */
    this._length = function (value) {
        if (this._isObject(value)) {
            return Object.keys(value).length;
        } else if (typeof value.length === 'number') {
            return value.length;
        }
        return 0;
    }
/**
 * Check if variable (and optionally property) is defined.
 */
    this._isDefined = function (variable, property) {
        var _variable = (typeof variable !== 'undefined');
        if (_variable && typeof property !== 'undefined') {
            return (typeof variable[property] !== 'undefined');
        }
        return _variable;
    }

/**
 * Option management.
 */
    this._options = function ($target, option, _value) {
        var _targetOpts = $target.data('flexdatalist');
        if (_this._isDefined(option)) {
            if (_this._isDefined(_value)) {
                _targetOpts[option] = _value;
            } else if (!_this._isObject(option)) {
                return (_this._isDefined(_targetOpts, option) ? _targetOpts[option] : null);
            } else {
                _targetOpts = option;
            }
            // normalize options
            _targetOpts.searchIn = _this._csvToArray(_targetOpts.searchIn);
            _targetOpts.relatives = _targetOpts.relatives && $(_targetOpts.relatives).length > 0 ? $(_targetOpts.relatives) : null;
            _targetOpts.textProperty = _targetOpts.textProperty === null ? _targetOpts.searchIn[0] : _targetOpts.textProperty;
            _targetOpts.visibleProperties = _this._csvToArray(_targetOpts.visibleProperties, _targetOpts.searchIn);
            $target.data('flexdatalist', _targetOpts);
        }
        return _targetOpts;
    }

/**
 * Handle options.
 */
    if (typeof options === 'string') {
        if (typeof this['_' + options] === 'function') {
            if (!this['_' + options]()) {
                return this;
            }
        // set value programmatically
        } else if (options === 'value') {
            this._setValue(value);
        } else if (!value) {
            return _this._options($input, options);
        } else {
            _this._options($input, options, value);
            return this;
        }
    }

    return this.each(input);
}

var _defaultValFunc = jQuery.fn.val;
jQuery.fn.val = function (value, _flexdatalist) {
    if (!_flexdatalist && $(this).hasClass('flexdatalist-set') && typeof value !== 'undefined') {
        $(this).flexdatalist('value', value);
    }
    return _defaultValFunc.apply(this, arguments);
};

$(function () {
    $('input.flexdatalist:not(.flexdatalist-set)').flexdatalist();
});