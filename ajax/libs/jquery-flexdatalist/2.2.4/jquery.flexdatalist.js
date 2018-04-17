/**
 * jQuery Flexdatalist.
 * Autocomplete input fields, with support for datalists.
 *
 * Version:
 * 2.2.4
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

    var destroy = function ($flex, clear) {
        $flex.each(function () {
            var $this = $(this),
                data = $this.data(),
                options = data.flexdatalist,
                $aliascontainer = data.aliascontainer;

            if ($aliascontainer) {
                $this.removeClass('flexdatalist-set')
                    .attr({'style': null, 'tabindex': null})
                    .val((options && options.originalValue && !clear ? options.originalValue : ''))
                    .removeData('flexdatalist')
                    .removeData('aliascontainer')
                    .off();
                $aliascontainer.remove();
            }
        });
    }

    // Callable stuff
    if (typeof _option === 'string' && _option !== 'reset') {
        if (typeof this[0].fvalue !== 'undefined') {
            var target = this[0];
            if (_option === 'destroy') {
                destroy(this, _value);
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
            // Disabled/enabled
            } else if (_option === 'disabled') {
                if (typeof _value === 'undefined') {
                    return target.fdisabled();
                }
                target.fdisabled(_value);
            // Option(s)
            } else if (typeof _option === 'string') {
                if (typeof _value === 'undefined') {
                    return target.options.get(_option);
                }
                target.options.set(_option, _value);
            }
            return this;
        }
        _option = {_option: _value};
    }

    // Destroy if already set
    if (this.length > 0 && typeof this[0].fvalue !== 'undefined') {
        destroy(this);
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
        disabled: null,
        maxShownResults: 100,
        removeOnBackspace: true,
        noResultsText: 'No results found for "{keyword}"',
        toggleSelected: false,
        allowDuplicateValues: false,
        redoSearchOnFocus: true,
        requestType: 'get',
        requestContentType: 'x-www-form-urlencoded',
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
            _selectedValues = [], 
            fid = 'flex' + id,
            $alias = null,
            $multiple = null;

    /**
     * Initialization
     */
        this.init = function () {
            var options = this.options.init();
            this.set.up();

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
                _this.action.showAllResults(event);
                _this.action.clearValue(event);
                _this.action.removeResults(event);
                _this.action.inputWidth(event);
            })
            // Focusout
            .on('focusout', function (event) {
                if ($multiple) {
                    $multiple.removeClass('focus');
                }
                _this.action.clearText(event);
                _this.action.clearValue(event);
            });

            window.onresize = function (event) {
                _this.position();
            };

            // Run garbage collector
            this.cache.gc();

            if (options.selectionRequired) {
                _this.fvalue.clear(true, true);
            }
            this.fvalue._load(options.originalValue, function (values, matches) {
                _this.fdisabled(options.disabled);
                $this.trigger('init:flexdatalist', [options]);
            }, true);
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
                if (val.length > 0
                    && key === keyCode
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
                if (!key || (key !== 13 && (key < 37 || key > 40))) {
                    _searchTimeout = setTimeout(function () {
                        if ((options.minLength === 0 && length > 0) || (options.minLength > 0 && length >= options.minLength)) {
                            _this.data.load(function (data) {
                                _this.search.get(keyword, data, function (matches) {
                                    _this.results.show(matches);
                                });
                            });
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
                if (options.redoSearchOnFocus && ((alias.length > 0 && options.multiple) || (alias.length > 0 && val.length === 0))) {
                    this.keypressSearch(event);
                }
            },
        /**
         * Copy value from alias to target input.
         */
            copyValue: function (event) {
                if (_this.keyNum(event) !== 13) {
                    var keyword = $alias.val(),
                        val = _this.fvalue.get(true),
                        options = _this.options.get();
                    if (!options.multiple && !options.selectionRequired && keyword.length !== val.length) {
                        _this.fvalue.extract(keyword);
                    }
                }
            },
        /**
         * Remove value on backspace key (multiple input only).
         */
            backSpaceKeyRemove: function (event) {
                var options = _this.options.get();
                if (options.removeOnBackspace && options.multiple) {
                    var val = $alias.val(),
                        $remove = $alias.data('_remove');
                    if (_this.keyNum(event) === 8) {
                        if (val.length === 0) {
                            if ($remove) {
                                _this.fvalue.remove($remove);
                                $alias.data('_remove', null);
                            } else {
                                console.log('remove!');
                                $alias.data('_remove', $alias.parents('li:eq(0)').prev());
                            }
                        } else {
                            $alias.data('_remove', null);
                        }
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
            },
        /**
         * Calculate input width by number of characters.
         */
            inputWidth: function (event) {
                var options = _this.options.get();
                if (options.multiple) {
                    var keyword = $alias.val(),
                        fontSize = parseInt($alias.css('fontSize').replace('px', '')),
                        minWidth = 40,
                        maxWidth = $this.innerWidth(),
                        width = ((keyword.length + 1) * fontSize);

                    if (width >= minWidth && width <= maxWidth) {
                        $alias[0].style.width = width + 'px';
                    }
                }
            },
        /**
         * Clear text/alias input when criteria is met.
         */
            clearText: function (event) {
                var val = _this.fvalue.get(),
                    options = _this.options.get();

                if (!options.multiple && options.selectionRequired && val.length === 0) {
                    $alias[0].value = '';
                }
            },
        /**
         * Clear value when criteria is met.
         */
            clearValue: function (event) {
                var val = _this.fvalue.get(),
                    keyword = $alias.val(),
                    options = _this.options.get();

                if (!options.multiple && options.selectionRequired && keyword.length <= options.minLength) {
                    _this.fvalue.clear();
                }
            },
        /**
         * Remove results when criteria is met.
         */
            removeResults: function (event) {
                var val = _this.fvalue.get(),
                    keyword = $alias.val(),
                    options = _this.options.get();
                if (options.minLength > 0 && keyword.length < options.minLength) {
                    _this.results.remove();
                }
            }
        }

    /**
     * Setup flex.
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
                if ($this.attr('autofocus')) {
                    $alias.focus();
                }

                $this.data('aliascontainer', ($multiple ? $multiple : $alias)).addClass('flexdatalist flexdatalist-set').css({
                    'position': 'absolute',
                    'top': -14000,
                    'left': -14000
                }).attr('tabindex', -1);

                // update input label with alias id
                var inputId = $this.attr('id'),
                    aliasId = $alias.attr('id');
                $('label[for="' + inputId + '"]').attr('for', aliasId);

                this.chained();
            },
        /**
         * Single value input.
         */
            alias: function () {
                var aliasid = ($this.attr('id') ? $this.attr('id') + '-flexdatalist' : fid);
                var $alias = $('<input type="text">')
                    .attr({
                        'class': $this.attr('class'),
                        'name': ($this.attr('name') ? 'flexdatalist-' + $this.attr('name') : null),
                        'id': aliasid,
                        'placeholder': $this.attr('placeholder')
                    })
                    .addClass('flexdatalist-alias ' + aliasid)
                    .removeClass('flexdatalist')
                    .attr('autocomplete', 'off');
                return $alias;
            },
        /**
         * Multiple values input/list
         */
            multipleInput: function ($alias) {
                $multiple = $('<ul tabindex="1">')
                    .addClass('flexdatalist-multiple ' + fid)
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
                if (options.relatives && options.chainedRelatives) {
                    var toggle = function (init) {
                        options.relatives.each(function () {
                            var emptyRelative = _this.isEmpty($(this).val()),
                                empty = _this.isEmpty(_this.value);
                            // If disabling, clear all values
                            if (emptyRelative || !empty) {
                                _this.fvalue.clear();
                            }
                            _this.fdisabled(emptyRelative);
                        });
                    };
                    options.relatives.on('change', function () {
                        toggle();
                    });
                    toggle(true);
                }
            }
        }

    /**
     * Process input value(s) (where the magic happens).
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
                return val;
            },
        /**
         * Set value.
         * Parse value if necessary.
         */
            set: function (val, append) {
                if (!_this.fdisabled()) {
                    if (!append) {
                        this.clear(true);
                    }
                    this._load(val);
                }
                return $this;
            },
        /**
         * Add value.
         */
            add: function (val) {
                if (_this.options.get('multiple')) {
                    this.set(val, true);
                }
                return this;
            },
        /**
         * Toggle value.
         */
            toggle: function (val) {
                if (!_this.fdisabled()) {
                    this.multiple.toggle(val);
                }
                return this;
            },
        /**
         * Remove value.
         */
            remove: function (val) {
                if (!_this.fdisabled()) {
                    val = this.toObj(val);
                    $this.trigger('before:flexdatalist.remove', [val]);
                    var result = [];
                    if ($.isArray(val)) {
                        $.each(val, function (i, value) {
                            var removed = _this.fvalue.multiple.remove(value);
                            if (removed) {
                                result.push(removed);
                            }
                        });
                    } else {
                        var _result = this.multiple.remove(val);
                        if (_result) {
                            result.push(_result);
                        }
                    }
                    $this
                        .trigger('after:flexdatalist.remove', [val, result])
                        .trigger('change:flexdatalist', [result, _this.options.get()])
                        .trigger('change');
                }
                return this;
            },
        /**
         * Load (remote?) value(s).
         */
            _load: function (values, callback, init) {
                var options = _this.options.get(),
                    valueProp = options.valueProperty,
                    _values = this.toStr(values),
                    _val = this.get(true);

                callback = (callback ? callback : $.noop);

                // If nothing changes, return
                if (_values.length == 0 && _val.length == 0) {
                    callback(values);
                    return;
                }

                values = this.toObj(values);

                if (!_this.isEmpty(values) && !_this.isEmpty(valueProp) && valueProp !== '*') {
                    if (!_this.isObject(valueProp)) {
                        valueProp = valueProp.split(',');
                    }
                    // Load data
                    _this.data.load(function (data) {
                        if (!_this.isObject(values)) {
                            values = values.split(',');
                        } else if (!$.isArray(values)) {
                            values = [values];
                        }
                        var found = [];
                        for (var idxv = 0; idxv < values.length; idxv++) {
                            var value = values[idxv];
                            for (var i = 0; i < data.length; i++) {
                                var item = data[i];
                                for (var idx = 0; idx < valueProp.length; idx++) {
                                    var prop = valueProp[idx],
                                    value = _this.isDefined(value, prop) ? value[prop] : value;
                                    if (_this.isDefined(item, prop) && value === item[prop]) {
                                        found.push(item);
                                    }
                                }
                            }
                        }
                        if (found.length > 0) {
                            _this.fvalue.extract(found, true);
                        }
                        callback(values);
                    }, values);
                    return;
                }
                callback(values);
                _this.fvalue.extract(values, init);
            },
        /**
         * Extract value and text.
         */
            extract: function (values, init) {
                var options = _this.options.get(),
                    result = [];

                if (!init) {
                    $this.trigger('before:flexdatalist.value', [values, options]);
                }

                if ($.isArray(values)) {
                    $.each(values, function (i, value) {
                        result.push(_this.fvalue._extract(value));
                    });
                } else {
                    result = _this.fvalue._extract(values);
                }

                if (!init) {
                    $this
                        .trigger('after:flexdatalist.value', [result, options])
                        .trigger('change:flexdatalist', [result, options])
                        .trigger('change');
                }
            },
        /**
         * @inherited.
         */
            _extract: function (val) {
                var txt = this.text(val),
                    value = this.value(val),
                    current = _this.value,
                    options = _this.options.get();

                if (options.multiple) {
                    // For allowDuplicateValues
                    if (!_this.isEmpty(value)) {
                        if (_this.isDup(value)) {
                            return;
                        }

                        _selectedValues.push(value);
                        this.multiple.add(value, txt);
                    }
                } else {
                    this.single(value, txt);
                }
                return {value: value, text: txt};
            },
        /**
         * Default input value.
         */
            single: function (val, txt) {
                if (txt && txt !== $alias.val()) {
                    $alias[0].value = txt;
                }
                _this.value = val;
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
                        options = _this.options.get();

                    // Toggle
                    $li.click(function () {
                        _multiple.toggle($(this));
                    // Remove
                    }).find('.fdl-remove').click(function () {
                        _this.fvalue.remove($(this).parent());
                    });

                    this.push(val);
                    $alias[0].value = '';
                    this.checkLimit();
                },
            /**
             * Push value to input.
             */
                push: function (val, index) {
                    var current = _this.fvalue.get();
                    val = _this.fvalue.toObj(val);
                    current.push(val);
                    val = _this.fvalue.toStr(current);
                    _this.value = val;
                },
            /**
             * Toggle value.
             */
                toggle: function (val) {
                    var options = _this.options.get();
                    if (!options.toggleSelected) {
                        return;
                    }
                    var $li = this.findLi(val);
                    if ($li) {
                        var index = $li.index(),
                            data = $li.data(),
                            action = $li.hasClass('disabled') ? 'enable' : 'disable',
                            current = _this.fvalue.get(),
                            args = [{value: data.value, text: data.text, action: action}, options];

                        $this.trigger('before:flexdatalist.toggle', args);

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
                    }
                },
            /**
             * Remove value from input.
             */
                remove: function (val) {
                    var $li = this.findLi(val);
                    if ($li) {
                        var values = _this.fvalue.get(),
                            index = $li.index(),
                            data = $li.data(),
                            options = _this.options.get(),
                            arg = {value: data.value, text: data.text};

                        values.splice(index, 1);
                        values = _this.fvalue.toStr(values);
                        _this.value = values;
                        $li.remove();
                        _this.fvalue.multiple.checkLimit();

                        // For allowDuplicateValues
                        _selectedValues.splice(index, 1);

                        return arg;
                    }
                },
            /**
             * Remove all.
             */
                removeAll: function () {
                    var values = _this.fvalue.get(),
                        options = _this.options.get();
                    $this.trigger('before:flexdatalist.remove.all', [values, options]);
                    $multiple.find('li:not(.input-container)').remove();
                    _this.value = '';
                    _selectedValues = [];
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
                            'value': _this.fvalue.toObj(val)
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
                            count = _selectedValues.length;
                        (limit == count ? $input.hide() : $input.show());
                    }
                },
            /**
             * Get li item from value.
             */
                findLi: function ($li) {
                    if (!($li instanceof jQuery)) {
                        var val = $li;
                        $li = null;
                        $multiple.find('li:not(.input-container)').each(function () {
                            var $_li = $(this);
                            if ($_li.data('value') === val) {
                                $li = $_li;
                                return false;
                            }
                        });
                    } else if ($li.length === 0) {
                        $li = null;
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
                    options = _this.options.get(),
                    valueProperty = options.valueProperty;

                if (_this.isObject(item)) {
                    if (this.isJSON() || this.isMixed()) {
                        delete item.name_highlight;
                        if ($.isArray(valueProperty)) {
                            var _value = {};
                            for (var i = 0; i < valueProperty.length; i++) {
                                if (_this.isDefined(item, valueProperty[i])) {
                                    _value[valueProperty[i]] = item[valueProperty[i]];
                                }
                            }
                            value = this.toStr(_value);
                        } else {
                            value = this.toStr(item);
                        }
                    } else if (_this.isDefined(item, valueProperty)) {
                        value = item[valueProperty];
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
            clear: function (alias, init) {
                var current = _this.value,
                    options = _this.options.get();

                if (options.multiple) {
                    this.multiple.removeAll();
                }
                _this.value = '';
                if (current !== '' && !init) {
                    $this.trigger('change:flexdatalist', [{value: '', text: ''}, options]).trigger('change');
                }
                if (alias) {
                    $alias[0].value = '';
                }
                _selectedValues = [];
                return this;
            },
        /**
         * Value to object.
         */
            toObj: function (val) {
                if (typeof val !== 'object') {
                    var options = _this.options.get();
                    if (_this.isEmpty(val) || !_this.isDefined(val)) {
                        val = options.multiple ? [] : (this.isJSON() ? {} : '');
                    } else if (this.isCSV()) {
                        val = val.toString().split(options.valuesSeparator);
                        val = $.map(val, function (v) {
                            return $.trim(v);
                        });
                    } else if ((this.isMixed() || this.isJSON()) && this.isJSON(val)) {
                        val = JSON.parse(val);
                    } else if (typeof val === 'number') {
                        val = val.toString();
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
                    } else if (typeof val === 'number') {
                        val = val.toString();
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
                    if (_this.isObject(str)) {
                        str = JSON.stringify(str);
                    } else if (typeof str !== 'string') {
                        return false;
                    }
                    return (str.indexOf('{') === 0 || str.indexOf('[{') === 0);
                }
                var options = _this.options.get(),
                    prop = options.valueProperty;
                return (_this.isObject(prop) || prop === '*');
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
            }
        }

    /**
     * Data.
     */
        this.data = {
        /**
         * Load data from all sources.
         */
            load: function (callback, load) {
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

                            $this.trigger('after:flexdatalist.data', [data]);
                            callback(data);
                        });
                    });
                }, load);
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
            url: function (callback, load) {
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
                        load: load,
                        keyword: keyword,
                        contain: options.searchContain
                    }, options.url),
                    cache = _this.cache.read(cacheKey, true);
                if (cache) {
                    callback(cache);
                    return;
                }

                var data = $.extend(
                    relatives,
                    options.params,
                    {
                        load: load,
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
                        _this.cache.write(cacheKey, _data, options.cacheLifetime, true);
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
                if (options.requestContentType === 'json') {
                    settings.data = JSON.stringify(settings.data);
                }
                $.ajax($.extend(
                    {
                        type: options.requestType,
                        dataType: 'json',
                        contentType: 'application/' + options.requestContentType + '; charset=UTF-8',
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
            get: function (keywords, data, callback) {
                var __this = this,
                    options = _this.options.get();

                if (!options.searchDisabled) {
                    var matches = _this.cache.read(keywords);
                    if (!matches) {
                        $this.trigger('before:flexdatalist.search', [keywords, data]);
                        if (!_this.isEmpty(keywords)) {
                            matches = [];
                            var words = __this.split(keywords);
                            for (var index = 0; index < data.length; index++) {
                                var item = data[index];
                                if (_this.isDup(item)) {
                                    continue;
                                }
                                item = __this.matches(item, words);
                                if (item) {
                                    matches.push(item);
                                }
                            }
                        }
                        _this.cache.write(keywords, matches, 2);
                        $this.trigger('after:flexdatalist.search', [keywords, data, matches]);
                    }
                } else {
                    matches = data;
                }
                callback(matches);
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
            find: function (keyword, splitted) {
                var options = _this.options.get();
                for (var index = 0; index < splitted.length; index++) {
                    var text = splitted[index];
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
                    $(this).addClass('active').trigger('active:flexdatalist.results', [$(this).data('item')]);
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

                    if (visibleProperty.indexOf('{') > -1) {
                        var str = _this.fvalue.placeholders.replace(item, visibleProperty),
                            parsed = _this.fvalue.placeholders.parse(visibleProperty);
                        $item = $('<span>')
                            .addClass('item item-' + Object.values(parsed).join('-'))
                            .html(str + ' ').appendTo($li);
                    } else {
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
                        .addClass('flexdatalist-results ')
                        .appendTo('body')
                        .attr('id', $alias.attr('id') + '-results')
                        .css({
                            'border-color': $target.css("border-left-color"),
                            'border-width': '1px',
                            'border-bottom-left-radius': $target.css("border-bottom-left-radius"),
                            'border-bottom-right-radius': $target.css("border-bottom-right-radius")
                        }).data({
                            target: ($multiple ? $multiple : $alias),
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
                $this.trigger('remove:flexdatalist.results');
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
                        if (!this.expired(object)) {
                            return object.value;
                        }
                        localStorage.removeItem(key);
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
                            localStorage.removeItem(key);
                        }
                    }
                    localStorage.clear();
                }
            },
       /**
        * Run cache garbage collector to prevent using all localStorage's
        * available space.
        */
            gc: function () {
                if (_this.cache.isSupported()) {
                    for (var key in localStorage){
                        if (key.indexOf(fid) > -1 || key.indexOf('global') > -1) {
                            var data = localStorage.getItem(key);
                            data = JSON.parse(data);
                            if (this.expired(data)) {
                                localStorage.removeItem(key);
                            }
                        }
                    }
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
        * Check if cache data as expired.
        *
        * @param object object Data to check
        * @return boolean True if expired, false otherwise
        */
            expired: function (object) {
                if (object.lifetime) {
                    var diff = (_this.unixtime() - object.timestamp);
                    return object.lifetime <= diff;
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
                        disabled: (_options.disabled === null ? $this.is('[disabled]') : _options.disabled),
                        originalValue: _this.value
                    }
                );
                this.set(options);
                return options;
            },
            get: function (option) {
                var options = $this.data('flexdatalist');
                if (!option) {
                    return options ? options : {};
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
            var $results = $('ul.flexdatalist-results'),
                $target = $results.data('target');
            if ($results.length > 0) {
                // Set some required CSS properties
                $results.css({
                    'width': $target.outerWidth() + 'px',
                    'top': (($target.offset().top + $target.outerHeight())) + 'px',
                    'left': $target.offset().left + 'px'
                });
            }
        }

    /**
     * Handle disabled state.
     */
        this.fdisabled = function (disabled) {
            if (this.isDefined(disabled)) {
                $this.prop('disabled', disabled);
                $alias.prop('disabled', disabled);
                if ($multiple) {
                    $multiple.css('background-color', $this.css('background-color'));
                    var $btns = $multiple.find('li .fdl-remove'),
                        $input = $multiple.find('li.input-container');
                    if (disabled) {
                        $multiple.addClass('disabled');
                        if ($btns.length > 0) {
                            $input.hide();
                        }
                        $btns.hide();
                    } else {
                        $multiple.removeClass('disabled');
                        $input.show();
                        $btns.show();
                    }
                }
                this.options.set('disabled', disabled);
            }
            return this.options.get('disabled');
        }

    /**
     * Check for dup values.
     */
        this.isDup = function (val) {
            if (!this.options.get('allowDuplicateValues')) {
                return _selectedValues.length > 0 && _selectedValues.indexOf(this.fvalue.value(val)) > -1;
            }
            return false;
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

            // Enter/tab key
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

                $active.trigger('active:flexdatalist.results', [$active.data('item')]);

                // Scroll to
                var position = ($active.prev().length === 0 ? $active : $active.prev()).position().top;
                $ul.animate({
                    scrollTop: position + $ul.scrollTop()
                }, 100);
            }
        }).data('flexdatalist', true);
    }

    jQuery('input.flexdatalist:not(.flexdatalist-set):not(.autodiscover-disabled)').flexdatalist();
});

(function ($) {
    var jVal = $.fn.val;
    $.fn.val = function (value) {
        var isFlex = this.length > 0 && typeof this[0].fvalue !== 'undefined';
        if (typeof value === 'undefined') {
            return isFlex ? this[0].fvalue.get(true) : jVal.call(this);
        }
        return isFlex ? this[0].fvalue.set(value) : jVal.call(this, value);
    };
})(jQuery);
