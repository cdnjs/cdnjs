/**
 * jQuery Flexdatalist.
 * Autocomplete input fields, with support for datalists.
 *
 * Version:
 * 2.0.7
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

jQuery.fn.flexdatalist = function (_option, _value) {
    'use strict';

    var destroy = function ($flex) {
        $flex.each(function () {
            var $this = $(this),
                data = $this.data('flexdatalist');
            $this.removeClass('flexdatalist-set')
                .attr('type', 'text')
                .val((data && data.originalValue ? data.originalValue : ''))
                .removeData('flexdatalist')
                .next('.flexdatalist-alias, ul.flexdatalist-multiple')
                .remove();
        });
    }

    // Callable stuff
    if (typeof _option === 'string' && _option !== 'reset') {
        var target = this[0];
        // Set/get value
        if (_option === 'destroy') {
            destroy($(this));
        // Get/Set value
        } else if (_option === 'value') {
            if (typeof _value === 'undefined') {
                return target.fvalue.get();
            }
            target.fvalue.set(_value);
        // Add value
        } else if (_option === 'add') {
            if (typeof _value === 'undefined') {
                return target.debug('Missing value to add!');
            }
            target.fvalue.add(_value);
        // Toggle value
        } else if (_option === 'toggle') {
            if (typeof _value === 'undefined') {
                return target.debug('Missing value to toggle!');
            }
            target.fvalue.toggle(_value);
        // Remove value
        } else if (_option === 'remove') {
            if (typeof _value === 'undefined') {
                return target.debug('Missing value to remove!');
            }
            target.fvalue.remove(_value);
        // Option(s)
        } else if (typeof _option === 'string') {
            if (typeof _value === 'undefined') {
                return target.options.get(_option);
            }
            target.options.set(_option, _value);
        }
        return this;
    }

    // Destroy if already set
    if (this && typeof this[0] !== 'undefined' && typeof this[0].fvalue !== 'undefined') {
        destroy($(this));
    }

    var _options = $.extend({
        url: null,
        data: [],
        params: {},
        relatives: null,
        chainedRelatives: false,
        cache: true,
        cacheLifetime: 60,
        minLength: 2,
        groupBy: false,
        selectionRequired: false,
        focusFirstResult: false,
        textProperty: null,
        valueProperty: null,
        visibleProperties: [],
        iconProperty: 'thumb',
        searchIn: ['label'],
        searchContain: false,
        searchEqual: false,
        searchByWord: false,
        searchDisabled: false,
        searchDelay: 300,
        normalizeString: null,
        multiple: null,
        maxShownResults: 100,
        removeOnBackspace: true,
        noResultsText: 'No results found for "{keyword}"',
        toggleSelected: false,
        allowDuplicateValues: false,
        requestType: 'get',
        requestContentType: 'default',
        resultsProperty: 'results',
        keywordParamName: 'keyword',
        limitOfValues: 0,
        valuesSeparator: ',',
        debug: true
    }, _option);

    return this.each(function (id) {
        var $this = $(this),
            _this = this,
            _searchTimeout = null,
            _values = [],
            fid = 'flex' + id,
            $alias = null,
            $multiple = null;

    /**
     * Initialization
     */
        this.init = function () {
            this.options.init();
            this.set.up();
            this.fvalue.set($this.attr('value'));

            $alias
            // Focusin
            .on('focusin', function (event) {
                _this.action.redoSearchFocus(event);
                _this.action.showAllResults(event);
                if ($multiple) {
                    $multiple.addClass('focus');
                }
            })
            // Keydown
            .on('input keydown', function (event) {
                if (_this.keyNum(event) === 9) {
                    _this.results.remove();
                }
                _this.action.keypressValue(event, 188);
                _this.action.backSpaceKeyRemove(event);
            })
            // Keyup
            .on('input keyup', function (event) {
                _this.action.keypressValue(event, 13);
                _this.action.keypressSearch(event);
                _this.action.copyValue(event);
                _this.action.backSpaceKeyRemove(event);
            })
            // Focusout
            .on('focusout', function () {
                if ($multiple) {
                    $multiple.removeClass('focus');
                }
            });

            window.onresize = function (event) {
                _this.position();
            };            
        }

    /**
     * Handle user actions.
     */
        this.action = {
        /**
         * Add value on comma or enter keypress.
         */
            keypressValue: function (event, keyCode) {
                var key = _this.keyNum(event),
                    val = $alias[0].value,
                    options = _this.options.get();
                if (val.length > 0 && key === keyCode
                    && !options.selectionRequired
                    && options.multiple) {
                        var val = $alias[0].value;
                        event.preventDefault();
                        _this.fvalue.extract(val);
                        _this.results.remove();
                }
            },        
        /**
         * Check if keypress is valid.
         */
            keypressSearch: function (event) {
                var key = _this.keyNum(event),
                    keyword = $alias.val(),
                    length = keyword.length,
                    options = _this.options.get();

                clearTimeout(_searchTimeout);
                if ((length === 0 && options.minLength > 0) || length < options.minLength) {
                    _this.results.remove();
                // Ignore Enter and Directional keys
                } else if (!key || (key !== 13 && (key < 37 || key > 40))) {
                    _this.results.remove();
                    _searchTimeout = setTimeout(function () {
                        if ((options.minLength === 0 && length > 0) || (options.minLength > 0 && length >= options.minLength)) {
                            _this.search.get(function (matches) {
                                _this.results.show(matches);
                            });
                        } else {
                            _this.results.remove();
                        }
                    }, options.searchDelay);
                }
            },
        /**
         * Redo search if input get's back on focus and no value selected.
         */
            redoSearchFocus: function (event) {
                var val = _this.fvalue.get(),
                    options = _this.options.get(),
                    alias = $alias.val();
                if ((alias.length > 0 && options.multiple) || (alias.length > 0 && val.length === 0)) {
                    this.keypressSearch(event);
                }
            },
        /**
         * Copy value from alias to target input.
         */
            copyValue: function (event) {
                if (_this.keyNum(event) !== 13) {
                    var keyword = $alias.val(),
                        options = _this.options.get();
                    if (!options.multiple) {
                        if (!options.selectionRequired) {
                            _this.fvalue.extract(keyword);
                            if (keyword.length === 0) {
                                _values = [];
                            }
                        } else {
                            _this.fvalue.clear();
                        }
                    }
                }
            },
        /**
         * Check if keypress is valid.
         */
            backSpaceKeyRemove: function (event) {
                var options = _this.options.get();
                if (options.removeOnBackspace) {
                    var val = $alias.val(),
                        $remove = $alias.data('_remove');
                    if ($remove) {
                        $remove.find('.fdl-remove').click();
                        $alias.data('_remove', null);
                    } else if (val.length === 0 && options.multiple && _this.keyNum(event) === 8) {
                        $alias.data('_remove', $alias.parents('li:eq(0)').prev());
                    }
                }
            },
        /**
         * Show all results if minLength option is 0.
         */
            showAllResults: function (event) {
                var val = $alias.val();
                val = $.trim(val);
                if (val === '' && _this.options.get('minLength') === 0) {
                    _this.data.load(function (data) {
                        _this.results.show(data);
                    });
                }
            }
        }

    /**
     * Setup input.
     */
        this.set = {
        /**
         * Prepare input replacement.
         */
            up: function () {
                $alias = this.alias();
                if (_this.options.get('multiple')) {
                    $multiple = this.multipleInput($alias);
                } else {
                    $alias.insertAfter($this);
                }
                // Respect autofocus attribute
                if ($alias.attr('autofocus')) {
                    $alias.focus();
                }
                this.chained();
            },
        /**
         * Single value input.
         */
            alias: function () {
                var $alias = $this
                    .clone(false)
                    .attr({
                        'list': null,
                        'name': ($this.attr('name') ? 'flexdatalist-' + $this.attr('name') : null),
                        'id': ($this.attr('id') ? $this.attr('id') + '-flexdatalist' : null),
                        'value': ''
                    })
                    .addClass('flexdatalist-alias')
                    .removeClass('flexdatalist')
                    .attr('autocomplete', 'off');
                $this.addClass('flexdatalist flexdatalist-set').prop('type', 'hidden');
                return $alias;
            },
        /**
         * Multiple values input/list
         */
            multipleInput: function ($alias) {
                $multiple = $('<ul tabindex="1">')
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
                    .append($alias)
                    .appendTo($multiple);

                return $multiple;
            },
        /**
         * Chained inputs handling.
         */
            chained: function () {
                var options = _this.options.get();
                if (!options.relatives || !options.chainedRelatives) {
                    return;
                }
                var toggle = function (init) {
                    options.relatives.each(function () {
                        var disabled = _this.isEmpty($(this).val()),
                            empty = _this.isEmpty($this[0].value);

                        // If disabling, clear all values
                        if (!init && (disabled || !empty)) {
                            _this.fvalue.clear();
                        }
                        if ($multiple) {
                            disabled && $multiple ? $multiple.addClass('disabled') : $multiple.removeClass('disabled');
                        } else {
                            $alias.prop('disabled', disabled);
                        }
                    });
                };

                options.relatives.on('change', function () {
                    toggle();
                });
                toggle(true);
            }
        }

    /**
     * Manipulate input value(s) (where the magic happens).
     */
        this.fvalue = {
        /**
         * Get value(s).
         */
            get: function (asString) {
                var val = _this.value,
                    options = _this.options.get();
                if ((options.multiple || this.isJSON()) && !asString) {
                    return this.toObj(val);
                }
                return this.toStr(val);
            },
        /**
         * Set value.
         * Parse value if necessary.
         */
            set: function (val, append) {
                if (_this.isEmpty(val)) {
                    if (!append) {
                        this.clear(true);
                    }
                } else {
                    var _fvalue = this;
                    this._normalize(val, function (values) {
                        if (!append) {
                            _fvalue.clear(true);
                        }
                        if (!_this.isEmpty(values)) {
                            if ($.isArray(values)) {
                                $.each(values, function (i, value) {
                                    _fvalue.extract(value, true);
                                });
                            } else {
                                _fvalue.extract(values, true);
                            }
                            $this.trigger('change:flexdatalist', [
                                values,
                                null,
                                _this.options.get()
                            ]).trigger('change');
                        }
                    });
                }
                return $this;
            },
        /**
         * Normalize value.
         */
            _normalize: function (data, callback) {
                var options = _this.options.get();
                data = this.toObj(data);
                if (typeof options.valueProperty === 'string' && !this.isJSON(data)) {
                    var _searchIn = options.searchIn,
                        _searchEqual = options.searchEqual;
                    options.searchIn = options.valueProperty.split(',');
                    options.searchEqual = true;
                    _this.search.get(data, function (matches) {
                        callback(matches);
                        options.searchIn = _searchIn;
                        options.searchEqual = _searchEqual;
                    });
                    return;
                }
                callback(data);
            },
        /**
         * Add value.
         */
            extract: function (val, ignoreEvent) {
                var txt = this.text(val),
                    value = this.value(val),
                    current = $this[0].value,
                    options = _this.options.get();

                if (!_this.isEmpty(val)) {
                    if (!value) {
                        return _this.debug('No value found');
                    } else if (!txt) {
                        return _this.debug('No text found');
                    }
                }
                // For allowDuplicateValues
                if (txt) {
                    _values.push(txt);
                }
                if (options.multiple) {
                    this.multiple.add(value, txt);
                } else {
                    this.single(value, txt);
                }
                if (!ignoreEvent) {
                    $this.trigger('change:flexdatalist', [
                        value,
                        txt,
                        options
                    ]).trigger('change');
                }
            },
        /**
         * Default input value.
         */
            single: function (val, txt) {
                if (txt && txt !== $alias.val()) {
                    $alias.val(txt, true);
                }
                $this[0].value = val;
            },
        /**
         * Input with multiple values.
         */
            multiple: {
            /**
             * Add value and item on list.
             */
                add: function (val, txt) {
                    var _multiple = this,
                        $li = this.li(val, txt),
                        options = _this.options.get(),
                        args = [val, txt, options];

                    // Toggle
                    $li.click(function () {
                        _multiple.toggle($(this));
                    // Remove
                    }).find('.fdl-remove').click(function () {
                        _multiple.remove($(this).parent());
                    });

                    $this.trigger('before:flexdatalist.add', args);
                    this.push(val);
                    $alias.val('', true);
                    this.checkLimit();
                    $this.trigger('after:flexdatalist.add', args);
                },
            /**
             * Push value to input.
             */
                push: function (val, index) {
                    var current = _this.fvalue.get();
                    val = _this.fvalue.toObj(val);
                    current.push(val);
                    val = _this.fvalue.toStr(current);
                    $this[0].value = val;
                },
            /**
             * Toggle value.
             */
                toggle: function ($li) {
                    var options = _this.options.get();
                    if (!options.toggleSelected) {
                        return;
                    }
                    $li = this.findLi($li);
                    var index = $li.index(),
                        data = $li.data(),
                        action = $li.hasClass('disabled') ? 'enable' : 'disable',
                        current = _this.fvalue.get(),
                        args = [action, data.value, data.text, options];
                        
                    $this.trigger('before:flexdatalist.toggle', [
                        action,
                        data.value,
                        data.text,
                        options
                    ]);

                    if (action === 'enable') {
                        var value = $li.data('value');
                        current.splice(index, 0, value);
                        $li.removeClass('disabled');
                    } else {
                        current.splice(index, 1);
                        $li.addClass('disabled');
                    }

                    current = _this.fvalue.toStr(current);
                    _this.value = current;

                    $this
                        .trigger('after:flexdatalist.toggle', args)
                        .trigger('change:flexdatalist', args)
                        .trigger('change');
                },
            /**
             * Remove value from input.
             */
                remove: function ($li) {
                    $li = this.findLi($li);
                    var values = _this.fvalue.get(),
                        index = $li.index(),
                        data = $li.data(),
                        options = _this.options.get(),
                        args = [data.value, data.text, options];

                    $this.trigger('before:flexdatalist.remove', args);
                    
                    var val = values.splice(index, 1);
                    values = _this.fvalue.toStr(values);
                    $this[0].value = values;
                    $li.remove();

                    $this
                        .trigger('after:flexdatalist.remove', args)
                        .trigger('change:flexdatalist', args)
                        .trigger('change');

                    // For allowDuplicateValues
                    _values.splice(index, 1);
                    _this.fvalue.multiple.checkLimit();
                },
            /**
             * Remove all.
             */
                removeAll: function () {
                    var values = _this.fvalue.get(),
                        options = _this.options.get();
                    $this.trigger('before:flexdatalist.remove.all', [values, options]);
                    $multiple.find('li:not(.input-container)').remove();
                    $this[0].value = '';
                    _values = [];
                    $this.trigger('after:flexdatalist.remove.all', [values, options]);
                },
            /**
             * Create new item and return it.
             */
                li: function (val, txt) {
                    var $inputContainer = $multiple.find('li.input-container')
                    return $('<li>')
                        .addClass('value' + (_this.options.get('toggleSelected') ? ' toggle' : ''))
                        .append('<span class="text">' + txt + '</span>')
                        .append('<span class="fdl-remove">&times;</span>')
                        .data({
                            'text': txt,
                            'value': val
                        })
                        .insertBefore($inputContainer);
                },
            /**
             * Create new item and return it.
             */
                checkLimit: function () {
                    var limit = _this.options.get('limitOfValues');
                    if (limit > 0) {
                        var $input = $multiple.find('li.input-container'),
                            count = _values.length;
                        (limit == count ? $input.hide() : $input.show());
                    }
                },
            /**
             * Get li item from value.
             */
                findLi: function ($li) {
                    if (typeof $li !== 'object') {
                        var val = $li;
                        $li = null;
                        $multiple.find('li:not(.input-container)').each(function () {
                            var $_li = $(this);
                            if ($_li.data('value') === val) {
                                $li = $_li;
                                return false;
                            }
                        });
                    }
                    return $li;
                },
            /**
             * Get li item from value.
             */
                isEmpty: function () {
                    return this.get().length > 0;
                }
            },
        /**
         * Get value that will be set on input field.
         */
            value: function (item) {
                var value = item,
                    options = _this.options.get();
                if (_this.isObject(item)) {
                    if (this.isJSON() || this.isMixed()) {
                        delete item.name_highlight;
                        value = this.toStr(item);
                    } else if (_this.isDefined(item, options.valueProperty)) {
                        value = item[options.valueProperty];
                    } else if (_this.isDefined(item, options.searchIn[0])) {
                        value = item[options.searchIn[0]];
                    } else {
                        value = null;
                    }
                }
                return value;
            },
        /**
         * Get text that will be shown to user on the alias input field.
         */
            text: function (item) {
                var text = item,
                    options = _this.options.get();
                if (_this.isObject(item)) {
                    text = item[options.searchIn[0]];
                    if (_this.isDefined(item, options.textProperty)) {
                        text = item[options.textProperty];
                    } else {
                        text = this.placeholders.replace(item, options.textProperty, text);
                    }
                }
                return $('<div>').html(text).text();
            },
        /**
         * Text placeholders processing.
         */
            placeholders: {
                replace: function (item, pattern, fallback) {
                    if (_this.isObject(item) && typeof pattern === 'string') {
                        var properties = this.parse(pattern);
                        if (!_this.isEmpty(item) && properties) {
                            $.each(properties, function (string, property) {
                                if (_this.isDefined(item, property)) {
                                    pattern = pattern.replace(string, item[property]);
                                }
                            });
                            return pattern;
                        }
                    }
                    return fallback;
                },
                parse: function (pattern) {
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
            },
        /**
         * Clear input value(s).
         */
            clear: function (alias) {
                var current = $this[0].value,
                    options = _this.options.get();

                if (options.multiple) {
                    this.multiple.removeAll();
                }
                $this[0].value = '';
                if (current !== '') {
                    $this.trigger('change:flexdatalist', [
                        null,
                        null,
                        options
                    ]).trigger('change');
                }
                if (alias) {
                    $alias.val('', true);
                }
                _values = [];
                return $this;
            },
        /**
         * Value to object
         */
            toObj: function (val) {
                if (typeof val === 'string') {
                    var options = _this.options.get();
                    if (_this.isEmpty(val) || !_this.isDefined(val)) {
                        val = options.multiple ? [] : (this.isJSON() ? {} : '');
                    } else if (this.isCSV()) {
                        val = val.toString().split(options.valuesSeparator);
                        val = $.map(val, function (v) {
                            return $.trim(v);
                        });
                    } else if (this.isJSON() || (this.isMixed() && this.isJSON(val))) {
                        val = JSON.parse(val);
                    }
                }
                return val;
            },
        /**
         * Is value expected to be JSON (either object or string).
         */
            toStr: function (val) {
                if (typeof val !== 'string') {
                    if (_this.isEmpty(val) || !_this.isDefined(val)) {
                        val = '';
                    } else if (this.isCSV()) {
                        val = val.join(_this.options.get('valuesSeparator'));
                    } else if (this.isJSON() || this.isMixed()) {
                        val = JSON.stringify(val);
                    }
                }
                return $.trim(val);
            },
        /**
         * If argument is passed, will check if is a valid JSON object/string.
         * otherwise will check if JSON is the value expected for input
         */
            isJSON: function (str) {
                if (typeof str !== 'undefined') {
                    str = _this.isObject(str) ? JSON.stringify(str) : str;
                    return (str.indexOf('{') === 0 || str.indexOf('[{') === 0);
                }
                var options = _this.options.get(),
                    prop = options.valueProperty;                
                return (options.selectionRequired && (_this.isObject(prop) || prop === '*'));
            },
        /**
         * Is value expected to be JSON (either object or string).
         */
            isMixed: function () {
                var options = _this.options.get();                
                return !options.selectionRequired && options.valueProperty === '*';
            },
        /**
         * Is value expected to be CSV?
         */
            isCSV: function () {
                return (!this.isJSON() && _this.options.get('multiple'));
            },
        /**
         * Add value.
         */
            add: function (val) {
                this.set(val, true);
            },
        /**
         * Toggle value.
         */
            toggle: function (val) {
                this.multiple.toggle(val);
                return $this;
            },
        /**
         * Remove value.
         */
            remove: function (val) {
                this.multiple.remove(val);
                return $this;
            }
        }

    /**
     * Data.
     */
        this.data = {
        /**
         * Load data from all sources.
         */
            load: function (callback) {
                var __this = this,
                    data = [];
                $this.trigger('before:flexdatalist.data');
                // Remote data
                this.url(function (remote) {
                    data = data.concat(remote);
                    // Static data
                    __this.static(function (_static) {
                        data = data.concat(_static);
                        // Datalist
                        __this.datalist(function (list) {
                            data = data.concat(list);
                            // Check for already set values
                            if (!_this.options.get('allowDuplicateValues')) {
                                var values = _values;
                                for (var i = 0; i < data.length; i++) {
                                    var item = data[i];
                                    if (values && values.indexOf(_this.fvalue.text(item)) > -1) {
                                        data.splice(i, 1);
                                    }
                                }
                            }
                            $this.trigger('after:flexdatalist.data', [data]);
                            callback(data);
                        });
                    });
                });
            },
        /**
         * Get static data.
         */
            static: function (callback) {
                var __this = this,
                    options = _this.options.get();
                // Remote source
                if (typeof options.data === 'string') {
                    var url = options.data,
                        cache = _this.cache.read(url, true);
                    if (cache) {
                        callback(cache);
                        return;
                    }
                    this.remote({
                        url: url,
                        success: function (data) {
                            options.data = data;
                            callback(data);
                            _this.cache.write(url, data, options.cacheLifetime, true);
                        }
                    });
                } else {
                    if (typeof options.data !== 'object') {
                        options.data = [];
                    }
                    callback(options.data);
                }
            },
        /**
         * Get datalist values.
         */
            datalist: function (callback) {
                var list = $this.attr('list'),
                    datalist = [];
                if (!_this.isEmpty(list)) {
                    $('#' + list).find('option').each(function () {
                        var $option = $(this),
                            val = $option.val(),
                            label = $option.text();
                        datalist.push({
                            label: (label.length > 0 ? label : val),
                            value: val
                        });
                    });
                }
                callback(datalist);
            },
        /**
         * Get remote data.
         */
            url: function (callback) {
                var __this = this,
                    keyword = $alias.val(),
                    options = _this.options.get(),
                    keywordParamName = options.keywordParamName,
                    value = _this.fvalue.get(),
                    relatives = this.relativesData();

                if (_this.isEmpty(options.url)) {
                    return callback([]);
                }

                var _opts = {};
                if (options.requestType === 'post') {
                    $.each(options, function (option, value) {
                        if (option.indexOf('_') == 0 || option == 'data') {
                            return;
                        }
                        _opts[option] = value;
                    });
                    delete _opts.relatives;
                }

                // Cache
                var cacheKey = _this.cache.keyGen({
                        relative: relatives,
                        keyword: keyword.substring(0, (options.minLength > 0 ? options.minLength : 1)),
                        contain: options.searchContain
                    }, options.url),
                    cache = _this.cache.read(cacheKey);
                if (cache) {
                    callback(cache);
                    return;
                }
                
                var data = $.extend(
                    relatives,
                    options.params,
                    {
                        contain: options.searchContain,
                        selected: value,
                        original: options.originalValue,
                        options: _opts
                    }
                );
                data[keywordParamName] = keyword;

                this.remote({
                    url: options.url,
                    data: data,
                    success: function (_data) {
                        var _keyword = $alias.val();
                        // Is this really needed?
                        if (_keyword.length >= keyword.length) {
                            callback(_data);
                        }
                        _this.cache.write(cacheKey, _data, options.cacheLifetime);
                    }
                });
            },
        /**
         * AJAX request.
         */
            remote: function (settings) {
                var __this = this,
                    options = _this.options.get();
                // Prevent get data when pressing backspace button
                if ($this.hasClass('flexdatalist-loading')) {
                    return;
                }
                $this.addClass('flexdatalist-loading');
                var contentType = 'application/x-www-form-urlencoded';
                if (options.requestContentType === 'json') {
                    contentType = 'application/json';
                    settings.data = JSON.stringify(data);
                }
                $.ajax($.extend(
                    {
                        type: options.requestType,
                        dataType: 'json',
                        contentType: contentType + '; charset=UTF-8',
                        complete: function () {
                            $this.removeClass('flexdatalist-loading');
                        }
                    }, settings, {
                        success: function (data) {
                            data = __this.extractRemoteData(data);
                            settings.success(data);
                        }
                    }
                ));
            },
        /**
         * Extract remote data from server response.
         */
            extractRemoteData: function (data) {
                var options = _this.options.get(),
                    _data = _this.isDefined(data, options.resultsProperty) ? data[options.resultsProperty] : data;

                if (typeof _data === 'string' && _data.indexOf('[{') === 0) {
                    _data = JSON.parse(_data);
                }
                if (_data && _data.options) {
                    _this.options.set($.extend({}, options, _data.options));
                }
                if (_this.isObject(_data)) {
                    return _data;
                }
                return [];
            },
        /**
         * Extract remote data from server response.
         */
            relativesData: function () {
                var relatives = _this.options.get('relatives'),
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
        }

    /**
     * Search.
     */
        this.search = {
        /**
         * Search for keywords in data and return matches to given callback.
         */
            get: function (keywords, callback) {
                var __this = this;
                if (_this.options.get('searchDisabled')) {
                    _this.debug('Search is disabled!');
                    return;
                }
                if (typeof keywords === 'function') {
                    callback = keywords;
                    keywords = undefined;
                }
                _this.data.load(function (data) {
                    var matches = false;
                    if (!_this.isDefined(keywords)) {
                        keywords = $alias.val();
                    }
                    
                    var cache = _this.cache.read(keywords);
                    if (cache) {
                        callback(cache);
                        return;
                    }
                    $this.trigger('before:flexdatalist.search', [keywords, data]);
                    if (!_this.isEmpty(keywords)) {
                        matches = [];
                        var words = __this.split(keywords);
                        for (var index = 0; index < data.length; index++) {
                            var item = __this.matches(data[index], words);
                            if (item) {
                                matches.push(item);
                            }
                        }
                    }
                    $this.trigger('after:flexdatalist.search', [keywords, data, matches]);
                    callback(matches);
                    _this.cache.write(keywords, matches, 10);
                });
            },
        /**
         * Match against searchable properties.
         */
            matches: function (item, keywords) {
                var hasMatches = false,
                    _item = $.extend({}, item),
                    found = [],
                    options = _this.options.get(),
                    searchIn = options.searchIn;

                if (keywords.length > 0) {
                    for (var index = 0; index < searchIn.length; index++) {
                        var searchProperty = searchIn[index];
                        if (!_this.isDefined(item, searchProperty) || !item[searchProperty]) {
                            continue;
                        }
                        var text = item[searchProperty].toString(),
                            highlight = text,
                            strings = this.split(text);
                        for (var kwindex = 0; kwindex < keywords.length; kwindex++) {
                            var keyword = keywords[kwindex];
                            if (this.find(keyword, strings)) {
                                found.push(keyword);
                                highlight = this.highlight(keyword, highlight);
                            }
                        }
                        if (highlight !== text) {
                            _item[searchProperty + '_highlight'] = this.highlight(highlight);
                        }
                    }
                }
                if (found.length === 0 || (options.searchByWord && found.length < (keywords.length - 1))) {
                    return false;
                }
                return _item;
            },
        /**
         * Wrap found keyword with span.highlight.
         */
            highlight: function (keyword, text) {
                if (text) {
                    return text.replace(
                        new RegExp(keyword, (_this.options.get('searchContain') ? "ig" : "i")),
                        '|:|$&|::|'
                    );
                }
                keyword = keyword.split('|:|').join('<span class="highlight">');
                return keyword.split('|::|').join('</span>');
            },
        /**
         * Search for keyword(s) in string.
         */
            find: function (keyword, strings) {
                var options = _this.options.get();
                for (var index = 0; index < strings.length; index++) {
                    var text = strings[index];
                    text = this.normalizeString(text),
                    keyword = this.normalizeString(keyword);
                    if (options.searchEqual) {
                        return text == keyword;
                    }
                    if ((options.searchContain ? (text.indexOf(keyword) >= 0) : (text.indexOf(keyword) === 0))) {
                        return true;
                    }
                }
                return false;
            },
        /**
         * Split string by words if needed.
         */
            split: function (keywords) {
                if (typeof keywords === 'string') {
                    keywords = [$.trim(keywords)];
                }
                if (_this.options.get('searchByWord')) {
                    for (var index = 0; index < keywords.length; index++) {
                        var keyword = $.trim(keywords[index]);
                        if (keyword.indexOf(' ') > 0) {
                            var words = keyword.split(' ');
                            $.merge(keywords, words);
                        }
                    }
                }
                return keywords;
            },
        /**
         * Normalize string to a consistent one to perform the search/match.
         */
            normalizeString: function (string) {
                if (typeof string === 'string') {
                    var normalizeString = _this.options.get('normalizeString');
                    if (typeof normalizeString === 'function') {
                        string = normalizeString(string);
                    }
                    return string.toUpperCase();
                }
                return string;
            }
        }

    /**
     * Handle results.
     */
        this.results = {
        /**
         * Save key = value data in local storage (if supported)
         *
         * @param string key Data key string
         */
            show: function (results) {
                var __this = this,
                    options = _this.options.get();

                this.remove(true);

                if (!results) {
                    return;
                } else if(results.length === 0) {
                    this.empty(options.noResultsText);
                    return;
                }

                var $ul = this.container();
                if (!options.groupBy) {
                    this.items(results, $ul);
                } else {
                    results = this.group(results);
                    Object.keys(results).forEach(function (groupName, index) {
                        var items = results[groupName],
                            property = options.groupBy,
                            groupText = _this.results.highlight(items[0], property, groupName);

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

                        __this.items(items, $ul);
                    });
                }

                var $li = $ul.find('li:not(.group)');
                $li.on('click', function (event) {
                    var item = $(this).data('item');
                    if (item) {
                        _this.fvalue.extract(item);
                        __this.remove();
                        $this.trigger('select:flexdatalist', [item, options]);
                    }
                }).hover(function () {
                    $li.removeClass('active');
                    $(this).addClass('active');
                }, function () {
                    $(this).removeClass('active');
                });

                if (options.focusFirstResult) {
                    $li.filter(':first').addClass('active');
                }
            },
        /**
         * Remove results container.
         */
            empty: function (text) {
                if (_this.isEmpty(text)) {
                    return;
                }
                var $container = this.container(),
                    keyword = $alias.val();

                text = text.split('{keyword}').join(keyword);
                $('<li>')
                    .addClass('item no-results')
                    .append(text)
                    .appendTo($container)
            },
        /**
         * Items iteration.
         */
            items: function (items, $resultsContainer) {
                var max = _this.options.get('maxShownResults');
                $this.trigger('show:flexdatalist.results', [items]);
                for (var index = 0; index < items.length; index++) {
                    if (max > 0 && max === index) {
                        break;
                    }
                    this.item(items[index]).appendTo($resultsContainer);
                }
                $this.trigger('shown:flexdatalist.results', [items]);
            },
        /**
         * Result item creation.
         */
            item: function (item) {
                var $li = $('<li>').data('item', item).addClass('item'),
                    options = _this.options.get(),
                    visibleProperties = options.visibleProperties;

                for (var index = 0; index < visibleProperties.length; index++) {
                    var visibleProperty = visibleProperties[index];
                    if (options.groupBy && options.groupBy === visibleProperty || !_this.isDefined(item, visibleProperty)) {
                        continue;
                    }
                    var $item = {};
                    if (visibleProperty === options.iconProperty) {
                        // Icon
                        $item = $('<img>')
                            .addClass('item item-' + visibleProperty)
                            .attr('src', item[visibleProperty]);
                    } else {
                        var propertyText = _this.results.highlight(item, visibleProperty);
                        // Other text properties
                        $item = $('<span>')
                            .addClass('item item-' + visibleProperty)
                            .html(propertyText + ' ');
                    }
                    $item.appendTo($li);
                }
                return $li;
            },
        /**
         * Results container
         */
            container: function () {
                var $target = $this;
                if ($multiple) {
                    $target = $multiple;
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
                        }).data({
                            target: $alias,
                            input: $this
                        });
                    _this.position($alias);
                }
                return $container;
            },
        /**
         * Results container
         */
            group: function (results) {
                var data = [],
                    groupProperty = _this.options.get('groupBy');
                for (var index = 0; index < results.length; index++) {
                    var _data = results[index];
                    if (_this.isDefined(_data, groupProperty)) {
                        var propertyValue = _data[groupProperty];
                        if (!_this.isDefined(data, propertyValue)) {
                            data[propertyValue] = [];
                        }
                        data[propertyValue].push(_data);
                    }
                }
                return data;
            },
        /**
         * Check if highlighted property value exists,
         * if true, return it, if not, fallback to given string
         */
            highlight: function (item, property, fallback) {
                if (_this.isDefined(item, property + '_highlight')) {
                    return item[property + '_highlight'];
                }
                return (_this.isDefined(item, property) ? item[property] : fallback);
            },
        /**
         * Remove results
         */
            remove: function (itemsOnly) {
                var selector = 'ul.flexdatalist-results';
                if (itemsOnly) {
                    selector = 'ul.flexdatalist-results li';
                }
                $(selector).remove();
                $this.trigger('removed:flexdatalist.results');
            }
        }

    /**
    * Interface for localStorage.
    */
        this.cache = {
        /**
         * Save key = value data in local storage (if supported)
         *
         * @param string key Data key string
         * @param mixed value Value to be saved
         * @param int lifetime In Seconds
         * @return mixed
         */
            write: function (key, value, lifetime, global) {
                if (_this.cache.isSupported()) {
                    key = this.keyGen(key, undefined, global);
                    var object = {
                        value: value,
                        // Get current UNIX timestamp
                        timestamp: _this.unixtime(),
                        lifetime: (lifetime ? lifetime : false)
                    };
                    localStorage.setItem(key, JSON.stringify(object));
                }
            },
       /**
        * Read data associated with given key
        *
        * @param string key Data key string
        * @return mixed
        */
            read: function (key, global) {
                if (_this.cache.isSupported()) {
                    key = this.keyGen(key, undefined, global);
                    var data = localStorage.getItem(key);
                    if (data) {
                        var object = JSON.parse(data);
                        if (object.lifetime) {
                            var diff = (_this.unixtime() - object.timestamp);
                            if (object.lifetime > diff) {
                                return object.value;
                            }
                            _this.cache.delete(key);
                            return null;
                        }
                        return object.value;
                    }
                }
                return null;
            },
        /**
         * Remove data associated with given key.
         *
         * @param string key Data key string
         */
            delete: function (key, global) {
                if (_this.cache.isSupported()) {
                    key = this.keyGen(key, undefined, global);
                    localStorage.removeItem(key);
                }
            },
        /**
         * Clear all data.
         */
            clear: function () {
                if (_this.cache.isSupported()) {
                    for (var key in localStorage){
                        if (key.indexOf(fid) > -1 || key.indexOf('global') > -1) {
                            _this.cache.delete(key);
                        }
                    }
                    localStorage.clear();
                }
            },
       /**
        * Check if browser supports localtorage.
        *
        * @return boolean True if supports, false otherwise
        */
            isSupported: function () {
                if (_this.options.get('cache')) {
                    try {
                        return 'localStorage' in window && window['localStorage'] !== null;
                    } catch (e) {
                        return false;
                    }
                }
                return false;
            },
       /**
        * Generate cache key from object or string.
        *
        * @return string Cache key
        */
            keyGen: function (str, seed, global) {
                if (typeof str === 'object') {
                    str = JSON.stringify(str);
                }
                var i, l,
                    hval = (seed === undefined) ? 0x811c9dc5 : seed;

                for (i = 0, l = str.length; i < l; i++) {
                    hval ^= str.charCodeAt(i);
                    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
                }
                return (global ? 'global' : fid) + ("0000000" + (hval >>> 0).toString(16)).substr(-8);
            }
        }

    /**
     * Options handler.
     */
        this.options = {
            init: function () {
                var options = $.extend({},
                    _options,
                    $this.data(),
                    {
                        multiple: (_options.multiple === null ? $this.is('[multiple]') : _options.multiple),
                        originalValue: $this[0].value
                    }
                );
                this.set(options);
            },
            get: function (option) {
                var options = $this.data('flexdatalist');
                if (!option) {
                    return options;
                }
                return _this.isDefined(options, option) ? options[option] : null;
            },
            set: function (option, value) {
                var options = this.get();
                if (_this.isDefined(options, option) && _this.isDefined(value)) {
                    options[option] = value;
                } else if (_this.isObject(option)) {
                    options = this._normalize(option);
                }
                $this.data('flexdatalist', options);
                return $this;
            },
            _normalize: function (options) {
                options.searchIn = _this.csvToArray(options.searchIn);
                options.relatives = options.relatives && $(options.relatives).length > 0 ? $(options.relatives) : null;
                options.textProperty = options.textProperty === null ? options.searchIn[0] : options.textProperty;
                options.visibleProperties = _this.csvToArray(options.visibleProperties, options.searchIn);
                if (options.valueProperty === '*' && options.multiple && !options.selectionRequired) {
                    throw new Error('Selection must be required for multiple, JSON fields!');
                }
                return options;
            }
        }
    
    /**
     * Position results below parent element.
     */
        this.position = function () {
            var $target = $alias;
            if ($multiple) {
                $target = $multiple;
            }
            // Set some required CSS properties
            $('ul.flexdatalist-results').css({
                'width': $target.outerWidth() + 'px',
                'top': (($target.offset().top + $target.outerHeight())) + 'px',
                'left': $target.offset().left + 'px'
            });
        }

    /**
     * Get key code from event.
     */
        this.keyNum = function (event) {
            return event.which || event.keyCode;
        }

    /**
     * Is variable empty.
     */
        this.isEmpty = function (value) {
            if (!_this.isDefined(value)) {
                return true;
            } else if (value === null) {
                return true;
            } else if (value === true) {
                return false;
            } else if (this.length(value) === 0) {
                return true;
            } else if ($.trim(value) === '') {
                return true;
            }
            return false;
        }

    /**
     * Is variable an object.
     */
        this.isObject = function (value) {
            return (value && typeof value === 'object');
        }

    /**
     * Get length of variable.
     */
        this.length = function (value) {
            if (this.isObject(value)) {
                return Object.keys(value).length;
            } else if (typeof value === 'number' || typeof value.length === 'number') {
                return value.toString().length;
            }
            return 0;
        }

    /**
     * Check if variable (and optionally property) is defined.
     */
        this.isDefined = function (variable, property) {
            var _variable = (typeof variable !== 'undefined');
            if (_variable && typeof property !== 'undefined') {
                return (typeof variable[property] !== 'undefined');
            }
            return _variable;
        }

    /**
     * Get unixtime stamp.
     *
     * @return boolean True if supports, false otherwise
     */
        this.unixtime = function (time) {
            var date = new Date();
            if (time) {
                date = new Date(time);
            }
            return Math.round(date.getTime() / 1000);
        }

    /**
     * To array.
     */
        this.csvToArray = function (value, _default) {
            if (value.length === 0) {
                return _default;
            }
            return typeof value === 'string' ? value.split(_this.options.get('valuesSeparator')) : value;
        }

    /**
     * Plugin warnings for debug.
     */
        this.debug = function (msg, data) {
            var options = _this.options.get();
            if (!options.debug) {
                return;
            }
            if (!data) {
                data = {};
            }
            msg = 'Flexdatalist: ' + msg;
            console.warn(msg);
            console.log($.extend({
                inputName: $this.attr('name'),
                options: options
            }, data));
            console.log('--- /flexdatalist ---');
        }

    // Go!
        this.init();
    });
}

jQuery(function ($) {
    var $document = $(document);
    // Handle results selection list keyboard shortcuts and events.
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
                keynum = event.which || event.keyCode;
            
            if (length === 0) {
                return;
            }
            
            // on escape key, remove results
            if (keynum === 27) {
                $ul.remove();
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

    jQuery('input.flexdatalist:not(.flexdatalist-set)').flexdatalist();
});

(function ($) {
    var jVal = $.fn.val;
    $.fn.val = function (value) {
        var isFlex = $(this).hasClass('flexdatalist');
        if (typeof value === 'undefined') {
            return isFlex ? this[0].fvalue.get(true) : jVal.call(this);
        }
        return isFlex ? this[0].fvalue.set(value) : jVal.call(this, value);
    };
})(jQuery);
