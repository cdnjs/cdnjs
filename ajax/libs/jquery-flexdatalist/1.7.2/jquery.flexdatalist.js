/**
 * jQuery Flexdatalist.
 * Autocomplete for input fields with support for datalists.
 *
 * Version:
 * 1.7.2
 *
 * Depends:
 * jquery.js 1.7+
 *
 * Demo and Documentation:
 * http://projects.sergiodinislopes.pt/flexdatalist/
 *
 * Github:
 * https://github.com/sergiodlopes/jquery-flexdatalist/
 *
 */

jQuery.fn.flexdatalist = function(options, value) {
    'use strict';
    var $document = $(document),
        $input = $(this),
        input,
        _this = this;

/**
 * Each iteration.
 */
    input = function() {
        var $this = $(this),
            _cache = {},
            _previousText = '',
            _requestTimeout = null,
            _inputName = $this.attr('name');

        if ($this.hasClass('flexdatalist-set')) {
            _this._destroy($this);
        }

    /**
     * Option management.
     */
        $this._options = function (option, value) {
            var _options = $this.data('flexdatalist');
            if (!_this._isDefined(option)) {
                return $this.data('flexdatalist');
            } else if (_this._isDefined(value)) {
                _options[option] = value;
            } else if (!_this._isObject(option)) {
                return (_this._isDefined(_options, option) ? _options[option] : null);
            } else {
                _options = option;
            }

            _options.searchIn = _this._csvToArray(_options.searchIn);
            _options.relatives = _options.relatives && $(_options.relatives).length > 0 ? $(_options.relatives) : null;
            _options.textProperty = _options.textProperty === null ? _options.searchIn[0] : _options.textProperty;
            _options.visibleProperties = _this._csvToArray(_options.visibleProperties, _options.searchIn);
            $this.data('flexdatalist', _options);
            return $this;
        }

        $this._options($.extend({
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
                searchDisabled: false, // New
                normalizeString: null,
                multiple: $this.attr('multiple'),
                maxShownResults: 100,
                toggleSelected: false, // New
                _values: []
            }, options, $this.data())
        );

        // Handle multiple values
        var $_this = $this
                .clone(false)
                .attr({'list': null, 'name': null})
                .addClass('flexdatalist-alias')
                .removeClass('flexdatalist');
        if ($this._options('multiple')) {
            var $ulMultiple = $('<ul>')
                .addClass('flexdatalist-multiple')
                .css({
                    'background-color': $this.css('background-color'),
                    'border-color': $this.css('border-left-color'),
                    'border-width': $this.css('border-left-width'),
                    'border-style': $this.css('border-left-style'),
                    'border-radius': $this.css('border-top-left-radius')
                })
                .insertAfter($this).click(function () {
                    $(this).find('input').focus();
                });
            var $li = $('<li class="input-container">')
                .addClass('flexdatalist-multiple-value')
                .append($_this)
                .appendTo($ulMultiple);
        } else {
            $_this.insertAfter($this);
        }
        $this.addClass('flexdatalist').attr('type', 'hidden');

    /**
     * Initialize.
     */
        $this._init = function () {
            var _options = $this._options();
            // Listen to parent input key presses and state events.
            $_this.on('input keydown', function (event) {
                var val = $this._keyword();
                // Comma separated values
                if (_this._keyNum(event) === 188 && !_options.selectionRequired && _options.multiple) {
                    event.preventDefault();
                    $this._value(val);
                    $this._removeResults();
                // Remove results on tab away
                } else if (_this._keyNum(event) === 9) {
                    $this._removeResults();
                }
            }).on('input keyup', function (event) {
                if ($this._changed() && _this._keyNum(event) !== 13) {
                    var val = $this._keyword();
                    if (!_options.multiple && !_options.selectionRequired) {
                        $this._value(val);
                    }
                    if (val.length >= _options.minLength) {
                        $this._search(function (matches) {
                            $this._showResults(matches);
                        });
                    } else {
                        $this._removeResults();
                    }
                    if (!_options.multiple && (val.length === 0 || val.length < _options.minLength)) {
                        $this._value('');
                    }
                }
                _previousText = $this._keyword();
            }).focus(function () {
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
            })
            .attr('autocomplete', 'off');

            // Respect autofocus attribute
            if ($_this.attr('autofocus')) {
                $_this.focus();
            }
            window.onresize = function(event) {
                $this._position();
            };
            $this.addClass('flexdatalist-set');
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
                            $ulMultiple.find('li .remove').click();
                        }
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
            $this.val('');
            $_this.val('');
            $this._parseValue(value, function (values) {
                if (!_this._isEmpty(values)) {
                    $this._values(values);
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
            // Prevent get data when pressing back button
            if ($this.hasClass('flexdatalist-loading')) {
                return;
            }
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
            var _options = $this._options(),
                keyword = $this._keyword();

            if (typeof _options.data === 'string') {
                $this._remote({
                    url: _options.data,
                    success: function (data) {
                        var _data = $this._remoteData(data);
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
                cacheKey = keyword;

            if (_this._isEmpty(_options.url) || (_options.minLength > keyword.length)) {
                return callback([]);
            }

            clearTimeout(_requestTimeout);
            _requestTimeout = setTimeout(function () {
                if (_options.cache && _options.cache !== 2) {
                    cacheKey = keyword.substring(0, (_options.minLength > 0 ? _options.minLength : 1));
                }

                // Check cache
                var cachedData = $this._cache(cacheKey);
                if (cachedData) {
                    callback(cachedData);
                    return;
                }

                $this._remote({
                    url: _options.url,
                    data: $.extend($this._relativesData(), _options.params, {
                            keyword: keyword,
                            contain: _options.searchContain,
                            selected: $this.val()
                        }
                    ),
                    success: function (data) {
                        $this.removeClass('flexdatalist-loading');
                        var _data = $this._remoteData(data),
                            _keyword = $this._keyword();
                        if (_keyword.length > keyword.length) {
                            $this._search(function (matches) {
                                $this._showResults(matches);
                            });                            
                        } else if (_keyword.length >= _options.minLength) {
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
            $this.addClass('flexdatalist-loading');
            options = $.extend({
                type: 'post',
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
        $this._remoteData = function (data) {
            var _data = data.results ? data.results : data;
            if (typeof _data === 'string' && _data.indexOf('[{') === 0) {
                _data = JSON.parse(_data);
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
                    var $input = $(this);
                    data['relatives'][$input.attr('name')] = $input.val();
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
                $('#' + list).find('option').each(function() {
                    var val = $(this).val();
                    _options.data.push({
                        label: val,
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
                if (typeof keywords === 'string') {
                    keywords = [keywords];
                }
                $this.trigger('before:flexdatalist.search', [keywords, data]);
                for (var kwindex = 0; kwindex < keywords.length; kwindex++) {
                    var keyword = keywords[kwindex];
                    for (var index = 0; index < data.length; index++) {
                        var _data = $this._matches(data[index], keyword, _options.values);
                        if (!_data) {
                            continue;
                        }
                        matches.push(_data);
                    }
                }
                $this.trigger('after:flexdatalist.search', [keywords, data, matches]);
                callback(matches);
            });
        }

    /**
     * Match against searchable properties.
     */
        $this._matches = function (item, keyword, values) {
            var hasMatches = false,
                _item = $.extend({}, item),
                _options = $this._options(),
                searchIn = _options.searchIn;

            for (var index = 0; index < searchIn.length; index++) {
                var searchProperty = searchIn[index];
                if (!_this._isDefined(item, searchProperty)) {
                    continue;
                }
                var text = item[searchProperty].toString();
                if ($this._find(keyword, text)) {
                    _item[searchProperty + '_highlight'] = $this._highlight(keyword, text);
                    hasMatches = true;
                }
            }
            return hasMatches ? _item : null;
        }

    /**
     * Wrap found keyword with span.highlight.
     */
        $this._highlight = function (keyword, text) {
            return text.replace(
                new RegExp(keyword, ($this._options('searchContain') ? "ig" : "i")),
                '<span class="highlight">$&</span>'
            );
        }

    /**
     * Search for keyword in string.
     */
        $this._find = function (keyword, text) {
            var _options = $this._options();
            text = $this._normalizeString(text),
            keyword = $this._normalizeString(keyword);
            if (_options.searchEqual) {
                return text == keyword;
            }
            return (_options.searchContain ? (text.indexOf(keyword) >= 0) : (text.indexOf(keyword) === 0));
        }

    /**
     * Show results.
     */
        $this._showResults = function (data) {
            $this._removeResults();
            var $ul = $this._getResultsContainer(),
                _options = $this._options();

            if (data.length === 0) {
                return;
            } else if (!_options.groupBy) {
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
            }).hover(function() {
                $li.removeClass('active');
                $(this).addClass('active');
            }, function() {
                $(this).removeClass('active');
            });

            if (_options.focusFirstResult) {
                $li.filter(':first').addClass('active');
            }

            $this._position();
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
        $this._items = function (items, $ul) {
            var max = $this._options('maxShownResults');
            $this.trigger('show:flexdatalist.results', [items]);
            for (var index = 0; index < items.length; index++) {
                if (max > 0 && max === index) {
                    break;
                }
                $this._item(items[index]).appendTo($ul);
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
            }
            return $container;
        }

    /**
     * Remove results.
     */
        $this._removeResults = function () {
            $('ul.flexdatalist-results').remove();
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
        $this._values = function (values) {
            if ($.isArray(values) && !_this._isEmpty(values)) {
                $.each(values, function (i, value) {
                    $this._value(value);
                });
                return;
            }
            $this._value(values);
        }

    /**
     * Set value on item selection.
     */
        $this._value = function (val) {
            var _options = $this._options(),
                text = $this._getText(val),
                value = $this._getValue(val);

            if (text.length > 0) {
                _options._values.push(text);
            }

            if (_options.multiple) {
                if (val === '') {
                    return $this;
                }
                $_this.val('');
                var $li = $('<li>')
                        .addClass('value' + (_options.toggleSelected ? ' toggle' : ''))
                        .append('<span class="text">' + text + '</span>')
                        .append('<span class="fdl-remove">&times;</span>')
                        .insertBefore($ulMultiple.find('li.input-container'));

                $li.find('span.fdl-remove').click(function () {
                    var $container = $(this).parent(),
                        index = $container.index();
                    if (!$container.hasClass('disabled') && ($this._toJSON() || $this._toCSV())) {
                        var currentValue = $this._inputValue();
                        currentValue.splice(index, 1);
                        _options._values.splice(index, 1);
                        $this._inputValue(currentValue);
                    }
                    $container.remove();
                });
                // Toggle selected option
                if (_options.toggleSelected) {
                    $li.click(function () {
                        var $clicked = $(this),
                            currentValue = $this._inputValue(),
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
                        $this._inputValue(currentValue);
                    });
                }
            } else if (text && text !== $_this.val()) {
                $_this.val(text);
            }
            $this._inputValue(value, text);
            _previousText = $this._keyword();
            return $this;
        }

    /**
     * Get/Set input value.
     */
        $this._inputValue = function (value, text) {
            var isJSON = $this._toJSON(),
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

            if (_this._isObject(value)) {
                if (isJSON && !_this._isEmpty(value)) {
                    value = JSON.stringify(value);
                } else if (isCSV) {
                    value = value.join(',');
                }
            }
            if (value === '') {
                $this._options('_values', []);
            }
            $this.val(value);
            $this.trigger('change:flexdatalist', [value, text, $this._options()]).trigger('change');
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
                var currentValue = $this._inputValue();
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
                'left': $target.offset().left + 'px',
                'z-index': ($target.css('z-index') + 1)
            });
        }

        // Set datalist data
        $this._datalist();
        // Initialize
        $this._init();
        // Process default value
        $this._initValue();
        // Handle chained fields
        $this._chained();
        _previousText = $this._keyword();
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
                .off()
                .attr('type', 'text')
                .val((data && data.originalValue ? data.originalValue : ''))
                .data('flexdatalist', null)
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
 * Handle options.
 */
    if (typeof options === 'string') {
        if (typeof this['_' + options] === 'function') {
            if (!this['_' + options]()) {
                return this;
            }
        } else if (!value) {
            var _data = $input.data('flexdatalist');
            return _data[options];
        } else if (value) {
            var _data = $input.data('flexdatalist');
            _data[options] = value;
            $input.data('flexdatalist', _data);
            return this;
        }
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

    return this.each(input);
}
$(function () {
    $('input.flexdatalist').flexdatalist();
});