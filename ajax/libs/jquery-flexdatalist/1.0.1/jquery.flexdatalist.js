/**
 * jQuery Flexdatalist.
 * Autocomplete alike to input fields with support for datalists.
 *
 * Depends:
 * jquery.js 1.7+
 *
 * Demo and Documentation:
 * http://projects.sergiodinislopes.pt/flexdatalist/
 *
 * Github:
 * https://github.com/sergiodlopes/jquery-flexdatalist/
 */
(function($) {
    $.fn.flexdatalist = function(options) {
        var $document = $(document),
            _this = this;

        // Handle selection list keyboard shortcuts and events.
        if (!$document.data('flexdatalist')) {
            // Remove items on click outside
            $(document).mouseup(function (event) {
                var $container = $('.flexdatalist-results');
                if (!$container.is(event.target) && $container.has(event.target).length === 0) {
                    $container.remove();
                }
            // Keyboard navigation
            }).keydown(function (event) {
                var $ul = $('.flexdatalist-results'),
                    $li = $ul.find('li'),
                    $active = $li.filter('.active'),
                    index = $active.index(),
                    length = $li.length,
                    keynum = event.keyCode || event.which;

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
                    _this._scrollTo($ul, $active);
                }
            }).data('flexdatalist', true);
        }

    /**
     * Simple scrollto element utility function.
     */
        this._scrollTo = function ($ul, $active) {
            var position = ($active.prev().length === 0 ? $active : $active.prev()).position().top;
            $ul.animate({
                scrollTop: position + $ul.scrollTop()
            }, 100);
        }

    /**
     * Get key code from event.
     */
        this._keyNum = function (event) {
            return event.which || event.keyCode;
        }

    /**
     * Position results below parent element.
     */
        this._ignoreKey = function (event) {
            var keynum = _this._keyNum(event);
            return keynum === 0 || keynum === 13 || keynum === 38 || keynum === 40;
        }

    /**
     * Is variable empty.
     */
        this._isEmpty = function (value) {
            if (!_this._isDefined(value)) {
                return true;
            } else if (value === null) {
                return true;
            } else if (this._isObject(value) && Object.keys(value).length === 0) {
                return true;
            } else if (value === '') {
                return true;
            }
            return false;
        }

    /**
     * Is variable an object.
     */
        this._isObject = function (value) {
            return (value && typeof value === 'object')
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
     * Each element iteration.
     */
        return this.each(function() {
            var $this = $(this),
                _cache = {},
                _inputName = $this.attr('name');

            if ($this.hasClass('flexdatalist-set')) {
                return;
            }

            var options = $.extend({
                url: null,
                data: null,
                cache: true,
                searchContain: false,
                minLength: 2,
                groupBy: false,
                selectionRequired: false,
                focusFirstResult: false,
                textProperty: null,
                valueProperty: null,
                visibleProperties: [],
                searchIn: ['label']
            }, options, $this.data());

            options.searchIn = typeof options.searchIn === 'string' ? options.searchIn.split(',') : options.searchIn;
            options.visibleProperties = options.visibleProperties.length === 0 ? options.searchIn : options.visibleProperties;
            options.multiple = $this.attr('multiple');

            // Handle multiple values
            var $_this = $this
                    .clone(true)
                    .attr('name', null)
                    .removeClass('flexdatalist');
            if (options.multiple) {
                var $ulMultiple = $('<ul>')
                    .addClass('flexdatalist-multiple')
                    .css({
                        'background-color': $this.css("background-color"),
                        'border-color': $this.css("border-left-color"),
                        'border-width': $this.css("border-left-width"),
                        'border-style': $this.css("border-left-style"),
                        'border-radius': $this.css("border-top-left-radius")
                    })
                    .insertAfter($this);
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
                // Set datalist data
                $this._datalist();
                // Listen to parent input key presses and state events.
                $_this.on('input keyup', function (event) {
                    var val = $this._keyword();
                    if (_this._ignoreKey(event)) {
                        return;
                    }
                    if (val.length >= options.minLength) {
                        $this._search(val, function (results) {
                            $this._showResults(results);
                        });
                    } else {
                        $this._removeResults();
                    }
                    if (!options.multiple) {
                        if (!options.selectionRequired) {
                            $this._value(val);
                        } else if (val.length === 0 || !$this._selected()) {
                            $this._value('');
                        }
                    }
                }).on('input keydown', function (event) {
                    if (_this._keyNum(event) === 188 && !options.selectionRequired && options.multiple) {
                        event.preventDefault();
                        $this._value($this._keyword());
                    }
                }).blur(function () {
                    if (options.selectionRequired && !$this._selected()) {
                        $this._value('');
                    }
                })
                .attr('autocomplete', 'off');

                $this
                    .addClass('flexdatalist-set')
                    .trigger('init:flexdatalist', [options]);

                window.onresize = function(event) {
                    $this._position();
                };
            }

        /**
         * Set value on load.
         */
            $this._initValue = function () {
                var value = $this.attr('value');
                if (_this._isEmpty(value)) {
                    return;
                }

                $this._parseValue(value, function (values) {
                    if (!_this._isEmpty(values)) {
                        $this.val('');
                        $this._values(values);
                    }
                });
            }

        /**
         * Parse initial value.
         */
            $this._parseValue = function (data, callback) {
                if ($this._toJSON()) {
                    try {
                        callback(JSON.parse(data));
                    } catch (e) {}
                } else if ($this._toCSV()) {
                    callback(data.split(','));
                } else if (typeof options.valueProperty === 'string') {
                    var _searchIn = options.searchIn;
                    options.searchIn = options.valueProperty.split(',');
                    $this._search(data, function (results, matches) {
                        options.searchIn = _searchIn;
                        $this._values(matches);
                    });
                } else {
                    callback(data);
                }
            }

        /**
         * Get data.
         */
            $this._data = function (callback) {
                if (_this._isObject(options.data)) {
                    callback(options.data);
                    return;
                } else if (typeof options.data === 'string') {
                    options.url = options.data;
                } else if (!options.url && !options.data) {
                    return;
                }

                var keyword = $this._keyword(),
                    keywordTruncated = keyword.substring(0, options.minLength),
                    cachedData = $this._cache(keywordTruncated);

                // Check cache
                if (cachedData) {
                    callback(cachedData);
                    return;
                }

                if ($this.hasClass('flexdatalist-loading')) {
                    return;
                }
                $this.addClass('flexdatalist-loading');

                $.ajax({
                    url: options.url,
                    data: {keyword: keywordTruncated, contain: options.searchContain},
                    type: 'post',
                    dataType: 'json',
                    success: function (data) {
                        $this.removeClass('flexdatalist-loading');
                        var _data = data.results ? data.results : data;
                        if (typeof _data === 'string' && _data.indexOf('[{') === 0) {
                            _data = JSON.parse(_data);
                        }
                        if (_this._isObject(_data)) {
                            callback(_data);
                            if (typeof options.data === 'string') {
                                options.data = data;
                            } else if (options.url) {
                                $this._cache(keywordTruncated, _data);
                            }
                        }
                    }
                });
            }

        /**
         * Set datalist data, if exists.
         */
            $this._datalist = function () {
                var list = $this.attr('list');
                if (list) {
                    $_this.attr('list', null);
                    if (!options.data) {
                        options.data = [];
                    }
                    $('#' + list).find('option').each(function() {
                        var val = $(this).val();
                        options.data.push({
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
                if (options.cache) {
                    key = $this.normalizeString(key);
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
         * Position results below parent element.
         */
            $this._search = function (keyword, callback) {
                $this._data(function (data) {
                    var results = [],
                        matches = [];                    
                    var groupProperty = options.groupBy;
                    for (var index = 0; index < data.length; index++) {
                        var _data = $this._matches(data[index], keyword);
                        if (!_data) {
                            continue;
                        }
                        matches.push(_data);
                        if (groupProperty) {
                            if (_this._isDefined(_data, groupProperty)) {
                                var propertyValue = _data[groupProperty];
                                if (!_this._isDefined(results, propertyValue)) {
                                    results[propertyValue] = [];
                                }
                                results[propertyValue].push(_data);
                            }
                        } else {
                            results.push(_data);
                        }
                    }
                    if (matches && matches.length > 0) {
                        callback(results, matches);
                    }
                });
            }

        /**
         * Match against searchable properties.
         */
            $this._matches = function (data, keyword) {
                var matches = false;
                for (var si = 0; si < options.searchIn.length; si++) {
                    var searchProperty = options.searchIn[si];
                    if (!_this._isDefined(data, searchProperty)) {
                        continue;
                    }
                    var propertyValue = data[searchProperty];
                    if ($this._find(propertyValue, keyword)) {
                        data[searchProperty + '_highlight'] = $this._highlight(propertyValue, keyword);
                        matches = true;
                    }
                }
                return matches ? data : null;
            }

        /**
         * Wrap found keyword with span.highlight
         */
            $this._highlight = function (text, keyword) {
                return text.replace(
                    new RegExp(keyword, (options.searchContain ? "ig" : "i")),
                    '<span class="highlight">$&</span>'
                );
            }

        /**
         * Search for keyword in string.
         */
            $this._find = function (text, keyword) {
                text = $this.normalizeString(text),
                keyword = $this.normalizeString(keyword);
                return (options.searchContain ? (text.indexOf(keyword) >= 0) : (text.indexOf(keyword) === 0));
            }

        /**
         * Show results.
         */
            $this._showResults = function (data) {
                $this._removeResults();

                var $ul = $this._getResultsContainer();
                if ($this._selected()) {
                    $this._selected(false)._value('');
                }
                if (!options.groupBy) {
                    $this._items(data, $ul);
                } else {
                    Object.keys(data).forEach(function (groupName, index) {
                        var items = data[groupName],
                            property = options.groupBy,
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
                        $this.trigger('select:flexdatalist', [item, options]);
                    }
                }).hover(function() {
                    $li.removeClass('active');
                    $(this).addClass('active');
                }, function() {
                    $(this).removeClass('active');
                });

                if (options.focusFirstResult) {
                    $li.filter(':first').addClass('active');
                }

                $this._position();
            }

        /**
         * Get/create list container.
         */
            $this._getResultsContainer = function () {
                var $target = $this;
                if (options.multiple) {
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
                        });
                }
                return $container;
            }

        /**
         * Items iteration.
         */
            $this._items = function (items, $ul) {
                for (var index = 0; index < items.length; index++) {
                    $this._item(items[index]).appendTo($ul);
                }
            }

        /**
         * Result item creation.
         */
            $this._item = function (item) {
                var $li = $('<li>')
                    .data('item', item)
                    .addClass('item');

                for (var index = 0; index < options.visibleProperties.length; index++) {
                    var property = options.visibleProperties[index];
                    if (options.groupBy && options.groupBy === property || !_this._isDefined(item, property)) {
                        continue;
                    }
                    var $item = {};
                    if (property === 'thumb') {
                        // Thumbnail image
                        $item = $('<img>')
                            .addClass('item item-' + property)
                            .attr('src', item[property]);
                    } else {
                        var propertyText = $this._getHighlight(item, property);
                        // Other text properties
                        $item = $('<span>')
                            .addClass('item item-' + property)
                            .html(propertyText + ' ');
                    }
                    $item.appendTo($li);
                }
                return $li;
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
                if (_this._isObject(values) && _this._isDefined(values) && values.length > 0) {
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
                var text = $this._getText(val);
                var value = $this._getValue(val);
                
                if (options.multiple) {
                    if (val === '') {
                        return $this;
                    }
                    $_this.val('');
                    var $li = $('<li>')
                        .addClass('value')
                        .append('<span class="text">' + text + '</span>')
                        .append('<span class="remove">&times;</span>')
                        .insertBefore($ulMultiple.find('li.input-container'));

                    $li.find('span.remove').click(function () {
                        var $container = $(this).parent();
                        if ($this._toJSON() || $this._toCSV()) {
                            var currentValue = $this._inputValue();
                            currentValue.splice($container.index(), 1);
                            $this._inputValue(currentValue);
                        }
                        $container.remove();
                    });
                } else if (text) {
                    $_this.val(text);
                }
                $this._inputValue(value, text);
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
                $this.val(value);
                $this.trigger('change:flexdatalist', [value, text, options]);
                return value;
            }

        /**
         * Get text that will be shown to user on input field.
         */
            $this._getText = function (item) {
                var text = item;
                if (_this._isObject(item)) {
                    text = item[options.searchIn[0]];
                    if (_this._isDefined(item, options.textProperty)) {
                        text = item[options.textProperty];
                    } else {
                        text = $this._replacePlaceholders(item, options.textProperty, text);
                    }
                }
                return text;
            }

        /**
         * Get the value that will be added to hidden input.
         * This is the value that will go with the form submittion.
         */
            $this._getValue = function (item) {
                var value = item;
                if (_this._isObject(item)) {
                    value = item[options.searchIn[0]];
                    if (options.valueProperty === '*') {
                        value = item;
                    } else if (_this._isDefined(item, options.valueProperty)) {
                        value = item[options.valueProperty];
                    } else if ($this._toJSON()) {
                        var value = {},
                            properties = options.valueProperty,
                            textProperties = options.textProperty;

                        // Add placeholder properties to list
                        if (textProperties) {
                            var _properties = textProperties;
                            if (typeof textProperties === 'string') {
                                _properties = $this._parsePlaceholders(textProperties);
                            }
                            if (_this._isObject(_properties)) {
                                $.each(_properties, function (string, property) {
                                    properties.push(property);
                                });
                            }
                        } else if (_this._isDefined(item, textProperties)) {
                            properties.push(textProperties);
                        }

                        $.each(properties, function (i, property) {
                            if (_this._isDefined(item, property)) {
                                value[property] = item[property];
                            }
                        });
                    }
                }
                if (options.multiple && ($this._toJSON() || $this._toCSV())) {
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
         * Normalize string to a consistent one.
         */
            $this.normalizeString = function (string) {
                return string.toUpperCase();
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
                return _this._isObject(options.valueProperty) || options.valueProperty === '*';
            }

        /**
         * Check if input value must be a CSV string.
         */
            $this._toCSV = function () {
                return (!$this._toJSON() && options.multiple);
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
         * Position results below parent element.
         */
            $this._position = function () {
                var $target = $_this;
                if (options.multiple) {
                    $target = $ulMultiple;
                }
                // Set some required CSS propities
                $('ul.flexdatalist-results').css({
                    'width': $target.outerWidth() + 'px',
                    'top': (($target.offset().top + $target.outerHeight())) + 'px',
                    'left': $target.offset().left + 'px',
                    'z-index': ($target.css('z-index') + 1)
                });
            }
            $this._init();
            $this._initValue();
        });
    }
    $('.flexdatalist').flexdatalist();
})(jQuery);
