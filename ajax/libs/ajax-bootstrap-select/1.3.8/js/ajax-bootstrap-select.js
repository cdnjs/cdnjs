/*!
 * Ajax Bootstrap Select
 *
 * Extends existing [Bootstrap Select] implementations by adding the ability to search via AJAX requests as you type. Originally for CROSCON.
 *
 * @version 1.3.8
 * @author Adam Heim - https://github.com/truckingsim
 * @link https://github.com/truckingsim/Ajax-Bootstrap-Select
 * @copyright 2016 Adam Heim
 * @license Released under the MIT license.
 *
 * Contributors:
 *   Mark Carver - https://github.com/markcarver
 *
 * Last build: 2016-11-18 3:06:30 PM EST
 */
!(function ($, window) {

/**
 * @class AjaxBootstrapSelect
 *
 * @param {jQuery|HTMLElement} element
 *   The select element this plugin is to affect.
 * @param {Object} [options={}]
 *   The options used to affect the desired functionality of this plugin.
 *
 * @return {AjaxBootstrapSelect|null}
 *   A new instance of this class or null if unable to instantiate.
 */
var AjaxBootstrapSelect = function (element, options) {
    var i, l, plugin = this;
    options = options || {};

    /**
     * The select element this plugin is being attached to.
     * @type {jQuery}
     */
    this.$element = $(element);

    /**
     * The merged default and passed options.
     * @type {Object}
     */
    this.options = $.extend(true, {}, $.fn.ajaxSelectPicker.defaults, options);

    /**
     * Used for logging error messages.
     * @type {Number}
     */
    this.LOG_ERROR = 1;

    /**
     * Used for logging warning messages.
     * @type {Number}
     */
    this.LOG_WARNING = 2;

    /**
     * Used for logging informational messages.
     * @type {Number}
     */
    this.LOG_INFO = 3;

    /**
     * Used for logging debug messages.
     * @type {Number}
     */
    this.LOG_DEBUG = 4;

    /**
     * The jqXHR object of the last request, false if there was none.
     * @type {jqXHR|Boolean}
     */
    this.lastRequest = false;

    /**
     * The previous query that was requested.
     * @type {String}
     */
    this.previousQuery = '';

    /**
     * The current query being requested.
     * @type {String}
     */
    this.query = '';

    /**
     * The jqXHR object of the current request, false if there is none.
     * @type {jqXHR|Boolean}
     */
    this.request = false;

    // Maps deprecated options to new ones between releases.
    var deprecatedOptionsMap = [
        // @todo Remove these options in next minor release.
        {
            from: 'ajaxResultsPreHook',
            to: 'preprocessData'
        },
        {
            from: 'ajaxSearchUrl',
            to: {
                ajax: {
                    url: '{{{value}}}'
                }
            }
        },
        {
            from: 'ajaxOptions',
            to: 'ajax'
        },
        {
            from: 'debug',
            to: function (map) {
                var _options = {};
                _options.log = Boolean(plugin.options[map.from]) ? plugin.LOG_DEBUG : 0;
                plugin.options = $.extend(true, {}, plugin.options, _options);
                delete plugin.options[map.from];
                plugin.log(plugin.LOG_WARNING, 'Deprecated option "' + map.from + '". Update code to use:', _options);
            }
        },
        {
            from: 'mixWithCurrents',
            to: 'preserveSelected'
        },
        {
            from: 'placeHolderOption',
            to: {
                locale: {
                    emptyTitle: '{{{value}}}'
                }
            }
        }
    ];
    if (deprecatedOptionsMap.length) {
        $.map(deprecatedOptionsMap, function (map) {
            // Depreciated option detected.
            if (plugin.options[map.from]) {
                // Map with an object. Use "{{{value}}}" anywhere in the object to
                // replace it with the passed value.
                if ($.isPlainObject(map.to)) {
                    plugin.replaceValue(map.to, '{{{value}}}', plugin.options[map.from]);
                    plugin.options = $.extend(true, {}, plugin.options, map.to);
                    plugin.log(plugin.LOG_WARNING, 'Deprecated option "' + map.from + '". Update code to use:', map.to);
                    delete plugin.options[map.from];
                }
                // Map with a function. Functions are silos. They are responsible
                // for deleting the original option and displaying debug info.
                else if ($.isFunction(map.to)) {
                    map.to.apply(plugin, [map]);
                }
                // Map normally.
                else {
                    var _options = {};
                    _options[map.to] = plugin.options[map.from];
                    plugin.options = $.extend(true, {}, plugin.options, _options);
                    plugin.log(plugin.LOG_WARNING, 'Deprecated option "' + map.from + '". Update code to use:', _options);
                    delete plugin.options[map.from];
                }
            }
        });
    }

    // Retrieve the element data attributes.
    var data = this.$element.data();

    // @todo Deprecated. Remove this in the next minor release.
    if (data['searchUrl']) {
        plugin.log(plugin.LOG_WARNING, 'Deprecated attribute name: "data-search-url". Update markup to use: \' data-abs-ajax-url="' + data['searchUrl'] + '" \'');
        this.options.ajax.url = data['searchUrl'];
    }

    // Helper functions.
    var matchToLowerCase = function (match, p1) { return p1.toLowerCase(); };
    var expandObject = function (keys, value, obj) {
        var k = [].concat(keys), l = k.length, o = obj || {};
        if (l) { var key = k.shift(); o[key] = expandObject(k, value, o[key]); }
        return l ? o : value;
    };

    // Filter out only the data attributes prefixed with 'data-abs-'.
    var dataKeys = Object.keys(data).filter(/./.test.bind(new RegExp('^abs[A-Z]')));

    // Map the data attributes to their respective place in the options object.
    if (dataKeys.length) {
        // Object containing the data attribute options.
        var dataOptions = {};
        var flattenedOptions = ['locale'];
        for (i = 0, l = dataKeys.length; i < l; i++) {
            var name = dataKeys[i].replace(/^abs([A-Z])/, matchToLowerCase).replace(/([A-Z])/g, '-$1').toLowerCase();
            var keys = name.split('-');

            // Certain options should be flattened to a single object
            // and not fully expanded (such as Locale).
            if (keys[0] && keys.length > 1 && flattenedOptions.indexOf(keys[0]) !== -1) {
                var newKeys = [keys.shift()];
                var property = '';
                // Combine the remaining keys as a single property.
                for (var ii = 0; ii < keys.length; ii++) {
                    property += (ii === 0 ? keys[ii] : keys[ii].charAt(0).toUpperCase() + keys[ii].slice(1));
                }
                newKeys.push(property);
                keys = newKeys;
            }
            this.log(this.LOG_DEBUG, 'Processing data attribute "data-abs-' + name + '":', data[dataKeys[i]]);
            expandObject(keys, data[dataKeys[i]], dataOptions);
        }
        this.options = $.extend(true, {}, this.options, dataOptions);
        this.log(this.LOG_DEBUG, 'Merged in the data attribute options: ', dataOptions, this.options);
    }

    /**
     * Reference to the selectpicker instance.
     * @type {Selectpicker}
     */
    this.selectpicker = data['selectpicker'];
    if (!this.selectpicker) {
        this.log(this.LOG_ERROR, 'Cannot instantiate an AjaxBootstrapSelect instance without selectpicker first being initialized!');
        return null;
    }

    // Ensure there is a URL.
    if (!this.options.ajax.url) {
        this.log(this.LOG_ERROR, 'Option "ajax.url" must be set! Options:', this.options);
        return null;
    }

    // Initialize the locale strings.
    this.locale = $.extend(true, {}, $.fn.ajaxSelectPicker.locale);

    // Ensure the langCode is properly set.
    this.options.langCode = this.options.langCode || window.navigator.userLanguage || window.navigator.language || 'en';
    if (!this.locale[this.options.langCode]) {
        var langCode = this.options.langCode;

        // Reset the language code.
        this.options.langCode = 'en';

        // Check for both the two and four character language codes, using
        // the later first.
        var langCodeArray = langCode.split('-');
        for (i = 0, l = langCodeArray.length; i < l; i++) {
            var code = langCodeArray.join('-');
            if (code.length && this.locale[code]) {
                this.options.langCode = code;
                break;
            }
            langCodeArray.pop();
        }
        this.log(this.LOG_WARNING, 'Unknown langCode option: "' + langCode + '". Using the following langCode instead: "' + this.options.langCode + '".');
    }

    // Allow options to override locale specific strings.
    this.locale[this.options.langCode] = $.extend(true, {}, this.locale[this.options.langCode], this.options.locale);

    /**
     * The select list.
     * @type {AjaxBootstrapSelectList}
     */
    this.list = new window.AjaxBootstrapSelectList(this);
    this.list.refresh();

    // We need for selectpicker to be attached first. Putting the init in a
    // setTimeout is the easiest way to ensure this.
    // @todo Figure out a better way to do this (hopefully listen for an event).
    setTimeout(function () {
        plugin.init();
    }, 500);
};

/**
 * Initializes this plugin on a selectpicker instance.
 */
AjaxBootstrapSelect.prototype.init = function () {
    var requestDelayTimer, plugin = this;

    // Rebind select/deselect to process preserved selections.
    if (this.options.preserveSelected) {
        this.selectpicker.$menu.off('click', '.actions-btn').on('click', '.actions-btn', function (e) {
            if (plugin.selectpicker.options.liveSearch) {
                plugin.selectpicker.$searchbox.focus();
            }
            else {
                plugin.selectpicker.$button.focus();
            }
            e.preventDefault();
            e.stopPropagation();
            if ($(this).is('.bs-select-all')) {
                if (plugin.selectpicker.$lis === null) {
                    plugin.selectpicker.$lis = plugin.selectpicker.$menu.find('li');
                }
                plugin.$element.find('option:enabled').prop('selected', true);
                $(plugin.selectpicker.$lis).not('.disabled').addClass('selected');
                plugin.selectpicker.render();
            }
            else {
                if (plugin.selectpicker.$lis === null) {
                    plugin.selectpicker.$lis = plugin.selectpicker.$menu.find('li');
                }
                plugin.$element.find('option:enabled').prop('selected', false);
                $(plugin.selectpicker.$lis).not('.disabled').removeClass('selected');
                plugin.selectpicker.render();
            }
            plugin.selectpicker.$element.change();
        });
    }

    // Add placeholder text to the search input.
    this.selectpicker.$searchbox
        .attr('placeholder', this.t('searchPlaceholder'))
        // Remove selectpicker events on the search input.
        .off('input propertychange');

    // Bind this plugin's event.
    this.selectpicker.$searchbox.on(this.options.bindEvent, function (e) {
        var query = plugin.selectpicker.$searchbox.val();

        plugin.log(plugin.LOG_DEBUG, 'Bind event fired: "' + plugin.options.bindEvent + '", keyCode:', e.keyCode, e);

        // Dynamically ignore the "enter" key (13) so it doesn't
        // create an additional request if the "cache" option has
        // been disabled.
        if (!plugin.options.cache) {
            plugin.options.ignoredKeys[13] = 'enter';
        }

        // Don't process ignored keys.
        if (plugin.options.ignoredKeys[e.keyCode]) {
            plugin.log(plugin.LOG_DEBUG, 'Key ignored.');
            return;
        }

        // Clear out any existing timer.
        clearTimeout(requestDelayTimer);

        // Process empty search value.
        if (!query.length) {
            // Clear the select list.
            if (plugin.options.clearOnEmpty) {
                plugin.list.destroy();
            }

            // Don't invoke a request.
            if (!plugin.options.emptyRequest) {
                return;
            }
        }

        // Store the query.
        plugin.previousQuery = plugin.query;
        plugin.query = query;

        // Return the cached results, if any.
        if (plugin.options.cache && e.keyCode !== 13) {
            var cache = plugin.list.cacheGet(plugin.query);
            if (cache) {
                plugin.list.setStatus(!cache.length ? plugin.t('statusNoResults') : '');
                plugin.list.replaceOptions(cache);
                plugin.log(plugin.LOG_INFO, 'Rebuilt options from cached data.');
                return;
            }
        }

        requestDelayTimer = setTimeout(function () {
            // Abort any previous requests.
            if (plugin.lastRequest && plugin.lastRequest.jqXHR && $.isFunction(plugin.lastRequest.jqXHR.abort)) {
                plugin.lastRequest.jqXHR.abort();
            }

            // Create a new request.
            plugin.request = new window.AjaxBootstrapSelectRequest(plugin);

            // Store as the previous request once finished.
            plugin.request.jqXHR.always(function () {
                plugin.lastRequest = plugin.request;
                plugin.request = false;
            });
        }, plugin.options.requestDelay || 300);
    });
};

/**
 * Wrapper function for logging messages to window.console.
 *
 * @param  {Number} type
 * The type of message to log. Must be one of:
 *
 * - AjaxBootstrapSelect.LOG_ERROR
 * - AjaxBootstrapSelect.LOG_WARNING
 * - AjaxBootstrapSelect.LOG_INFO
 * - AjaxBootstrapSelect.LOG_DEBUG
 *
 * @param {String|Object|*...} message
 *   The message(s) to log. Multiple arguments can be passed.
 *
 * @return {void}
 */
AjaxBootstrapSelect.prototype.log = function (type, message) {
    if (window.console && this.options.log) {
        // Ensure the logging level is always an integer.
        if (typeof this.options.log !== 'number') {
            if (typeof this.options.log === 'string') {
                this.options.log = this.options.log.toLowerCase();
            }
            switch (this.options.log) {
                case true:
                case 'debug':
                    this.options.log = this.LOG_DEBUG;
                    break;

                case 'info':
                    this.options.log = this.LOG_INFO;
                    break;

                case 'warn':
                case 'warning':
                    this.options.log = this.LOG_WARNING;
                    break;

                default:
                case false:
                case 'error':
                    this.options.log = this.LOG_ERROR;
                    break;
            }
        }
        if (type <= this.options.log) {
            var args = [].slice.apply(arguments, [2]);

            // Determine the correct console method to use.
            switch (type) {
                case this.LOG_DEBUG:
                    type = 'debug';
                    break;
                case this.LOG_INFO:
                    type = 'info';
                    break;
                case this.LOG_WARNING:
                    type = 'warn';
                    break;
                default:
                case this.LOG_ERROR:
                    type = 'error';
                    break;
            }

            // Prefix the message.
            var prefix = '[' + type.toUpperCase() + '] AjaxBootstrapSelect:';
            if (typeof message === 'string') {
                args.unshift(prefix + ' ' + message);
            }
            else {
                args.unshift(message);
                args.unshift(prefix);
            }

            // Display the message(s).
            window.console[type].apply(window.console, args);
        }
    }
};

/**
 * Replaces an old value in an object or array with a new value.
 *
 * @param {Object|Array} obj
 *   The object (or array) to iterate over.
 * @param {*} needle
 *   The value to search for.
 * @param {*} value
 *   The value to replace with.
 * @param {Object} [options]
 *   Additional options for restricting replacement:
 *     - recursive: {boolean} Whether or not to iterate over the entire
 *       object or array, defaults to true.
 *     - depth: {int} The number of level this method is to search
 *       down into child elements, defaults to false (no limit).
 *     - limit: {int} The number of times a replacement should happen,
 *       defaults to false (no limit).
 *
 * @return {void}
 */
AjaxBootstrapSelect.prototype.replaceValue = function (obj, needle, value, options) {
    var plugin = this;
    options = $.extend({
        recursive: true,
        depth: false,
        limit: false
    }, options);
    // The use of $.each() opposed to native loops here is beneficial
    // since obj can be either an array or an object. This helps reduce
    // the amount of duplicate code needed.
    $.each(obj, function (k, v) {
        if (options.limit !== false && typeof options.limit === 'number' && options.limit <= 0) {
            return false;
        }
        if ($.isArray(obj[k]) || $.isPlainObject(obj[k])) {
            if ((options.recursive && options.depth === false) || (options.recursive && typeof options.depth === 'number' && options.depth > 0)) {
                plugin.replaceValue(obj[k], needle, value, options);
            }
        }
        else {
            if (v === needle) {
                if (options.limit !== false && typeof options.limit === 'number') {
                    options.limit--;
                }
                obj[k] = value;
            }
        }
    });
};

/**
 * Generates a translated {@link $.fn.ajaxSelectPicker.locale locale string} for a given locale key.
 *
 * @param {String} key
 *   The translation key to use.
 * @param {String} [langCode]
 *   Overrides the currently set {@link $.fn.ajaxSelectPicker.defaults#langCode langCode} option.
 *
 * @return
 *   The translated string.
 */
AjaxBootstrapSelect.prototype.t = function (key, langCode) {
    langCode = langCode || this.options.langCode;
    if (this.locale[langCode] && this.locale[langCode].hasOwnProperty(key)) {
        return this.locale[langCode][key];
    }
    this.log(this.LOG_WARNING, 'Unknown translation key:', key);
    return key;
};

/**
 * Use an existing definition in the Window object or create a new one.
 *
 * Note: This must be the last statement of this file.
 *
 * @type {AjaxBootstrapSelect}
 * @ignore
 */
window.AjaxBootstrapSelect = window.AjaxBootstrapSelect || AjaxBootstrapSelect;

/**
 * @class AjaxBootstrapSelectList
 *   Maintains the select options and selectpicker menu.
 *
 * @param {AjaxBootstrapSelect} plugin
 *   The plugin instance.
 *
 * @return {AjaxBootstrapSelectList}
 *   A new instance of this class.
 */
var AjaxBootstrapSelectList = function (plugin) {
    var that = this;

    /**
     * DOM element used for updating the status of requests and list counts.
     * @type {jQuery}
     */
    this.$status = $(plugin.options.templates.status).hide().appendTo(plugin.selectpicker.$menu);
    var statusInitialized = plugin.t('statusInitialized');
    if (statusInitialized && statusInitialized.length) {
        this.setStatus(statusInitialized);
    }

    /**
     * Container for cached data.
     * @type {Object}
     */
    this.cache = {};

    /**
     * Reference the plugin for internal use.
     * @type {AjaxBootstrapSelect}
     */
    this.plugin = plugin;

    /**
     * Container for current selections.
     * @type {Array}
     */
    this.selected = [];

    /**
     * Containers for previous titles.
     */
    this.title = null;
    this.selectedTextFormat = plugin.selectpicker.options.selectedTextFormat;

    // Save initial options
    var initial_options = [];
    plugin.$element.find('option').each(function() {
        var $option = $(this);
        var value = $option.attr('value');
        initial_options.push({
            value: value,
            text: $option.text(),
            'class': $option.attr('class') || '',
            data: $option.data() || {},
            preserved: plugin.options.preserveSelected,
            selected: !!$option.attr('selected')
        });
    });
    this.cacheSet(/*query=*/'', initial_options);

    // Preserve selected options.
    if (plugin.options.preserveSelected) {
        that.selected = initial_options;
        plugin.$element.on('change.abs.preserveSelected', function (e) {
            var $selected = plugin.$element.find(':selected');
            that.selected = [];
            // If select does not have multiple selection, ensure that only the
            // last selected option is preserved.
            if (!plugin.selectpicker.multiple) {
                $selected = $selected.last();
            }
            $selected.each(function () {
                var $option = $(this);
                var value = $option.attr('value');
                that.selected.push({
                    value: value,
                    text: $option.text(),
                    'class': $option.attr('class') || '',
                    data: $option.data() || {},
                    preserved: true,
                    selected: true
                });
            });
            that.replaceOptions(that.cacheGet(that.plugin.query));
        });
    }
};

/**
 * Builds the options for placing into the element.
 *
 * @param {Array} data
 *   The data to use when building options for the select list. Each
 *   array item must be an Object structured as follows:
 *     - {int|string} value: Required, a unique value identifying the
 *       item. Optionally not required if divider is passed instead.
 *     - {boolean} [divider]: Optional, if passed all other values are
 *       ignored and this item becomes a divider.
 *     - {string} [text]: Optional, the text to display for the item.
 *       If none is provided, the value will be used.
 *     - {String} [class]: Optional, the classes to apply to the option.
 *     - {boolean} [disabled]: Optional, flag that determines if the
 *       option is disabled.
 *     - {boolean} [selected]: Optional, flag that determines if the
 *       option is selected. Useful only for select lists that have the
 *       "multiple" attribute. If it is a single select list, each item
 *       that passes this property as true will void the previous one.
 *     - {Object} [data]: Optional, the additional data attributes to
 *       attach to the option element. These are processed by the
 *       bootstrap-select plugin.
 *
 * @return {String}
 *   HTML containing the <option> elements to place in the element.
 */
AjaxBootstrapSelectList.prototype.build = function (data) {
    var a, i, l = data.length;
    var $select = $('<select/>');
    var $preserved = $('<optgroup/>').attr('label', this.plugin.t('currentlySelected'));

    this.plugin.log(this.plugin.LOG_DEBUG, 'Building the select list options from data:', data);

    for (i = 0; i < l; i++) {
        var item = data[i];
        var $option = $('<option/>').appendTo(item.preserved ? $preserved : $select);

        // Detect dividers.
        if (item.hasOwnProperty('divider')) {
            $option.attr('data-divider', 'true');
            continue;
        }

        // Set various properties.
        $option.val(item.value).text(item.text);
        if (item['class'].length) {
            $option.attr('class', item['class']);
        }
        if (item.disabled) {
            $option.attr('disabled', true);
        }

        // Remove previous selections, if necessary.
        if (item.selected && !this.plugin.selectpicker.multiple) {
            $select.find(':selected').prop('selected', false);
        }

        // Set this option's selected state.
        if (item.selected) {
            $option.attr('selected', true);
        }

        // Add data attributes.
        for (a in item.data) {
            if (item.data.hasOwnProperty(a)) {
                $option.attr('data-' + a, item.data[a]);
            }
        }
    }

    // Append the preserved selections.
    if ($preserved.find('option').length) {
        $preserved[this.plugin.options.preserveSelectedPosition === 'before' ? 'prependTo' : 'appendTo']($select);
    }

    var options = $select.html();
    this.plugin.log(this.plugin.LOG_DEBUG, options);
    return options;
};

/**
 * Retrieve data from the cache.
 *
 * @param {string} key
 *   The identifier name of the data to retrieve.
 * @param {*} [defaultValue]
 *   The default value to return if no cache data is available.
 *
 * @return {*}
 *   The cached data or defaultValue.
 */
AjaxBootstrapSelectList.prototype.cacheGet = function (key, defaultValue) {
    var value = this.cache[key] || defaultValue;
    this.plugin.log(this.LOG_DEBUG, 'Retrieving cache:', key, value);
    return value;
};

/**
 * Save data to the cache.
 *
 * @param {string} key
 *   The identifier name of the data to store.
 * @param {*} value
 *   The value of the data to store.
 *
 * @return {void}
 */
AjaxBootstrapSelectList.prototype.cacheSet = function (key, value) {
    this.cache[key] = value;
    this.plugin.log(this.LOG_DEBUG, 'Saving to cache:', key, value);
};

/**
 * Destroys the select list.
 */
AjaxBootstrapSelectList.prototype.destroy = function () {
    this.replaceOptions();
    this.plugin.list.setStatus();
    this.plugin.log(this.plugin.LOG_DEBUG, 'Destroyed select list.');
};

/**
 * Refreshes the select list.
 */
AjaxBootstrapSelectList.prototype.refresh = function (triggerChange) {
    // Remove unnecessary "min-height" from selectpicker.
    this.plugin.selectpicker.$menu.css('minHeight', 0);
    this.plugin.selectpicker.$menu.find('> .inner').css('minHeight', 0);
    var emptyTitle = this.plugin.t('emptyTitle');
    if (!this.plugin.$element.find('option').length && emptyTitle && emptyTitle.length) {
        this.setTitle(emptyTitle);
    }
    else if (this.title) {
        this.restoreTitle();
    }
    this.plugin.selectpicker.refresh();
    // The "refresh" method sets the $lis property to null, it must be rebuilt.
    this.plugin.selectpicker.findLis();

    // Only trigger change event when specified.
    if(triggerChange){
      this.plugin.log(this.plugin.LOG_DEBUG, 'Triggering Change');
      this.plugin.$element.trigger('change.$');
    }
    this.plugin.log(this.plugin.LOG_DEBUG, 'Refreshed select list.');
};

/**
 * Replaces the select list options with provided data.
 *
 * It will also inject any preserved selections if the preserveSelected
 * option is enabled.
 *
 * @param {Array} data
 *   The data array to process.
 *
 * @returns {void}
 */
AjaxBootstrapSelectList.prototype.replaceOptions = function (data) {
    var i, l, item, output = '', processedData = [], selected = [], seenValues = [];
    data = data || [];

    // Merge in selected options from the previous state (cannot be cached).
    if (this.selected && this.selected.length) {
        this.plugin.log(this.plugin.LOG_INFO, 'Processing preserved selections:', this.selected);
        selected = [].concat(this.selected, data);
        l = selected.length;
        for (i = 0; i < l; i++) {
            item = selected[i];
            // Typecast the value for the seenValues array. Array indexOf
            // searches are type sensitive.
            if (item.hasOwnProperty('value') && seenValues.indexOf(item.value + '') === -1) {
                seenValues.push(item.value + '');
                processedData.push(item);
            }
            else {
                this.plugin.log(this.plugin.LOG_DEBUG, 'Duplicate item found, ignoring.');
            }
        }
        data = processedData;
    }

    // Build the option output.
    if (data.length) {
        output = this.plugin.list.build(data);
    }

    // Replace the options.
    this.plugin.$element.html(output);
    this.refresh();
    this.plugin.log(this.plugin.LOG_DEBUG, 'Replaced options with data:', data);
};

/**
 * Restores the select list to the last saved state.
 *
 * @return {boolean}
 *   Return true if successful or false if no states are present.
 */
AjaxBootstrapSelectList.prototype.restore = function () {
    var cache = this.plugin.list.cacheGet(this.plugin.previousQuery);
    if (cache && this.plugin.list.replaceOptions(cache)) {
        this.plugin.log(this.plugin.LOG_DEBUG, 'Restored select list to the previous query: ', this.plugin.previousQuery);
    }
    this.plugin.log(this.plugin.LOG_DEBUG, 'Unable to restore select list to the previous query:', this.plugin.previousQuery);
    return false;
};

/**
 * Restores the previous title of the select element.
 *
 * @return {void}
 */
AjaxBootstrapSelectList.prototype.restoreTitle = function () {
    if (!this.plugin.request) {
        this.plugin.selectpicker.options.selectedTextFormat = this.selectedTextFormat;
        if (this.title) {
            this.plugin.$element.attr('title', this.title);
        }
        else {
            this.plugin.$element.removeAttr('title');
        }
        this.title = null;
    }
};

/**
 * Sets a new title on the select element.
 *
 * @param {String} title
 *
 * @return {void}
 */
AjaxBootstrapSelectList.prototype.setTitle = function (title) {
    if (!this.plugin.request) {
        this.title = this.plugin.$element.attr('title');
        this.plugin.selectpicker.options.selectedTextFormat = 'static';
        this.plugin.$element.attr('title', title);
    }
};

/**
 * Sets a new status on the AjaxBootstrapSelectList.$status DOM element.
 *
 * @param {String} [status]
 *   The new status to set, if empty it will hide it.
 *
 * @return {void}
 */
AjaxBootstrapSelectList.prototype.setStatus = function (status) {
    status = status || '';
    if (status.length) {
        this.$status.html(status).show();
    }
    else {
        this.$status.html('').hide();
    }
};

/**
 * Use an existing definition in the Window object or create a new one.
 *
 * Note: This must be the last statement of this file.
 *
 * @type {AjaxBootstrapSelectList}
 * @ignore
 */
window.AjaxBootstrapSelectList = window.AjaxBootstrapSelectList || AjaxBootstrapSelectList;

/**
 * @class AjaxBootstrapSelectRequest
 *   Instantiates a new jQuery.ajax request for the current query.
 *
 * @param {AjaxBootstrapSelect} plugin
 *   The plugin instance.
 *
 * @return {AjaxBootstrapSelectRequest}
 *   A new instance of this class.
 */
var AjaxBootstrapSelectRequest = function (plugin) {
    var that = this;
    var ajaxCallback = function (event) {
        return function () {
            that.plugin.log(that.plugin.LOG_INFO, 'Invoking AjaxBootstrapSelectRequest.' + event + ' callback:', arguments);
            that[event].apply(that, arguments);
            if (that.callbacks[event]) {
                that.plugin.log(that.plugin.LOG_INFO, 'Invoking ajax.' + event + ' callback:', arguments);
                that.callbacks[event].apply(that, arguments);
            }
        };
    };
    var events = ['beforeSend', 'success', 'error', 'complete'];
    var i, l = events.length;

    // Reference the existing plugin.
    this.plugin = plugin;

    // Clone the default ajax options.
    this.options = $.extend(true, {}, plugin.options.ajax);

    // Save any existing callbacks provided in the options and replace it with
    // the relevant method callback. The provided callback will be invoked
    // after this plugin has executed.
    this.callbacks = {};
    for (i = 0; i < l; i++) {
        var event = events[i];
        if (this.options[event] && $.isFunction(this.options[event])) {
            this.callbacks[event] = this.options[event];
        }
        this.options[event] = ajaxCallback(event);
    }

    // Allow the data option to be dynamically generated.
    if (this.options.data && $.isFunction(this.options.data)) {
        this.options.data = this.options.data.apply(this) || {
            q: '{{{q}}}'
        };
    }

    // Replace all data values that contain "{{{q}}}" with the value of the
    // current search query.
    this.plugin.replaceValue(this.options.data, '{{{q}}}', this.plugin.query);

    // Invoke the AJAX request.
    this.jqXHR = $.ajax(this.options);
};

/**
 * @event
 * A callback that can be used to modify the jqXHR object before it is sent.
 *
 * Use this to set custom headers, etc. Returning false will cancel the request.
 * To modify the options being sent, use this.options.
 *
 * @param {jqXHR} jqXHR
 *   The jQuery wrapped XMLHttpRequest object.
 *
 * @return {void}
 */
AjaxBootstrapSelectRequest.prototype.beforeSend = function (jqXHR) {
    // Destroy the list currently there.
    this.plugin.list.destroy();

    // Set the status accordingly.
    this.plugin.list.setStatus(this.plugin.t('statusSearching'));

    //this.plugin.list.refresh();
};

/**
 * @event
 * The "complete" callback for the request.
 *
 * @param {jqXHR} jqXHR
 *   The jQuery wrapped XMLHttpRequest object.
 * @param {String} status
 *   A string categorizing the status of the request: "success", "notmodified",
 *   "error", "timeout", "abort", or "parsererror".
 *
 * @return {void}
 */
AjaxBootstrapSelectRequest.prototype.complete = function (jqXHR, status) {
    // Only continue if actual results and not an aborted state.
    if (status !== 'abort') {
        var cache = this.plugin.list.cacheGet(this.plugin.query);
        if (cache) {
            if (cache.length) {
                this.plugin.list.setStatus();
            }
            else {
                this.plugin.list.destroy();
                this.plugin.list.setStatus(this.plugin.t('statusNoResults'));
                this.plugin.log(this.plugin.LOG_INFO, 'No results were returned.');
                return;
            }
        }
        this.plugin.list.refresh(true);
    }
};

/**
 * @event
 * The "error" callback for the request.
 *
 * @param {jqXHR} jqXHR
 *   The jQuery wrapped XMLHttpRequest object.
 * @param {String} status
 *   A string describing the type of error that occurred. Possible values for
 *   the second argument (besides null) are "timeout", "error", "abort", and
 *   "parsererror".
 * @param {String|Object} error
 *   An optional exception object, if one occurred. When an HTTP error occurs,
 *   error receives the textual portion of the HTTP status, such as "Not Found"
 *   or "Internal Server Error."
 *
 * @return {void}
 */
AjaxBootstrapSelectRequest.prototype.error = function (jqXHR, status, error) {
    if (status !== 'abort') {
        // Cache the result data.
        this.plugin.list.cacheSet(this.plugin.query);

        // Clear the list.
        if (this.plugin.options.clearOnError) {
            this.plugin.list.destroy();
        }

        // Set the status after the list has cleared and before the restore.
        this.plugin.list.setStatus(this.plugin.t('errorText'));

        // Restore previous request.
        if (this.plugin.options.restoreOnError) {
            this.plugin.list.restore();
            this.plugin.list.setStatus();
        }
    }
};

/**
 * Process incoming data.
 *
 * This method ensures that the incoming data has unique values and
 * is in the proper format that is utilized by this plugin. It also
 * adds in the existing selects if the option is enabled. If the
 * preprocessData and processData functions were defined in the plugin
 * options, they are invoked here.
 *
 * @param {Array|Object} data
 *   The JSON data to process.
 *
 * @return {Array|Boolean}
 *   The processed data array or false if an error occurred.
 */
AjaxBootstrapSelectRequest.prototype.process = function (data) {
    var i, l, callbackResult, item, preprocessedData, processedData;
    var filteredData = [], seenValues = [];

    this.plugin.log(this.plugin.LOG_INFO, 'Processing raw data for:', this.plugin.query, data);

    // Invoke the preprocessData option callback.
    preprocessedData = data;
    if ($.isFunction(this.plugin.options.preprocessData)) {
        this.plugin.log(this.plugin.LOG_DEBUG, 'Invoking preprocessData callback:', this.plugin.options.processData);
        callbackResult = this.plugin.options.preprocessData.apply(this, [preprocessedData]);
        if (typeof callbackResult !== 'undefined' && callbackResult !== null && callbackResult !== false) {
            preprocessedData = callbackResult;
        }
    }

    // Ensure the data is an array.
    if (!$.isArray(preprocessedData)) {
        this.plugin.log(this.plugin.LOG_ERROR, 'The data returned is not an Array. Use the "preprocessData" callback option to parse the results and construct a proper array for this plugin.', preprocessedData);
        return false;
    }

    // Filter preprocessedData.
    l = preprocessedData.length;
    for (i = 0; i < l; i++) {
        item = preprocessedData[i];
        this.plugin.log(this.plugin.LOG_DEBUG, 'Processing item:', item);
        if ($.isPlainObject(item)) {
            // Check if item is a divider. If so, ignore all other data.
            if (item.hasOwnProperty('divider') || (item.hasOwnProperty('data') && $.isPlainObject(item.data) && item.data.divider)) {
                this.plugin.log(this.plugin.LOG_DEBUG, 'Item is a divider, ignoring provided data.');
                filteredData.push({divider: true});
            }
            // Ensure item has a "value" and is unique.
            else {
                if (item.hasOwnProperty('value')) {
                    // Typecast the value for the seenValues array. Array
                    // indexOf searches are type sensitive.
                    if (seenValues.indexOf(item.value + '') === -1) {
                        seenValues.push(item.value + '');
                        // Provide default items to ensure expected structure.
                        item = $.extend({
                            text: item.value,
                            'class': '',
                            data: {},
                            disabled: false,
                            selected: false
                        }, item);
                        filteredData.push(item);
                    }
                    else {
                        this.plugin.log(this.plugin.LOG_DEBUG, 'Duplicate item found, ignoring.');
                    }
                }
                else {
                    this.plugin.log(this.plugin.LOG_DEBUG, 'Data item must have a "value" property, skipping.');
                }
            }
        }
    }

    // Invoke the processData option callback.
    processedData = [].concat(filteredData);
    if ($.isFunction(this.plugin.options.processData)) {
        this.plugin.log(this.plugin.LOG_DEBUG, 'Invoking processData callback:', this.plugin.options.processData);
        callbackResult = this.plugin.options.processData.apply(this, [processedData]);
        if (typeof callbackResult !== 'undefined' && callbackResult !== null && callbackResult !== false) {
            if ($.isArray(callbackResult)) {
                processedData = callbackResult;
            }
            else {
                this.plugin.log(this.plugin.LOG_ERROR, 'The processData callback did not return an array.', callbackResult);
                return false;
            }
        }
    }

    // Cache the processed data.
    this.plugin.list.cacheSet(this.plugin.query, processedData);

    this.plugin.log(this.plugin.LOG_INFO, 'Processed data:', processedData);
    return processedData;
};

/**
 * @event
 * The "success" callback for the request.
 *
 * @param {Object} data
 *   The data returned from the server, formatted according to the dataType
 *   option.
 * @param {String} status
 *   A string describing the status.
 * @param {jqXHR} jqXHR
 *   The jQuery wrapped XMLHttpRequest object.
 *
 * @return {void}
 */
AjaxBootstrapSelectRequest.prototype.success = function (data, status, jqXHR) {
    // Only process data if an Array or Object.
    if (!$.isArray(data) && !$.isPlainObject(data)) {
        this.plugin.log(this.plugin.LOG_ERROR, 'Request did not return a JSON Array or Object.', data);
        this.plugin.list.destroy();
        return;
    }

    // Process the data.
    var processedData = this.process(data);
    this.plugin.list.replaceOptions(processedData);
};

/**
 * Use an existing definition in the Window object or create a new one.
 *
 * Note: This must be the last statement of this file.
 *
 * @type {AjaxBootstrapSelectRequest}
 * @ignore
 */
window.AjaxBootstrapSelectRequest = window.AjaxBootstrapSelectRequest || AjaxBootstrapSelectRequest;

/**
 * @class $.fn.ajaxSelectPicker
 * @chainable
 *
 * The jQuery plugin definition.
 *
 * This initializes a new AjaxBootstrapSelect class for each element in the jQuery chain.
 *
 * @param {Object} options
 *   The {@link $.fn.ajaxSelectPicker.defaults options} to pass to the plugin.
 *
 * @returns {jQuery}
 */
$.fn.ajaxSelectPicker = function (options) {
    return this.each(function () {
        if (!$(this).data('AjaxBootstrapSelect')) {
            $(this).data('AjaxBootstrapSelect', new window.AjaxBootstrapSelect(this, options));
        }
    });
};

/**
 * The locale object containing string translations.
 *
 * See: {@link $.fn.ajaxSelectPicker.locale}
 * @type {Object}
 */
$.fn.ajaxSelectPicker.locale = {};

/**
 * The default options the plugin will use if none are provided.
 *
 * See: {@link $.fn.ajaxSelectPicker.defaults}
 *
 * @member $.fn.ajaxSelectPicker
 * @property {Object} defaults
 */
$.fn.ajaxSelectPicker.defaults = {
    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @deprecated Since version `1.2.0`, see: {@link $.fn.ajaxSelectPicker.defaults#preprocessData}.
     * @cfg {Function} ajaxResultsPreHook
     */

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {Object} ajax (required)
     * @markdown
     * The options to pass to the jQuery AJAX request.
     *
     * ```js
     * {
     *     url: null, // Required.
     *     type: 'POST',
     *     dataType: 'json',
     *     data: {
     *         q: '{{{q}}}'
     *     }
     * }
     * ```
     */
    ajax: {
        url: null,
        type: 'POST',
        dataType: 'json',
        data: {
            q: '{{{q}}}'
        }
    },

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {String} ajaxSearchUrl
     * @deprecated Since version `1.2.0`, see: {@link $.fn.ajaxSelectPicker.defaults#ajax}.
     */

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {String} bindEvent = "keyup"
     * @markdown
     * The event to bind on the search input element to fire a request.
     */
    bindEvent: 'keyup',

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {Boolean} cache = true
     * @markdown
     * Cache previous requests. If enabled, the "enter" key (13) is enabled to
     * allow users to force a refresh of the request.
     */
    cache: true,

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {Boolean} clearOnEmpty = true
     * @markdown
     * Clears the previous results when the search input has no value.
     */
    clearOnEmpty: true,

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {Boolean} clearOnError = true
     * @markdown
     * Clears the select list when the request returned with an error.
     */
    clearOnError: true,

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {Boolean} debug
     * @deprecated Since version `1.2.0`, see: {@link $.fn.ajaxSelectPicker.defaults#log}.
     */

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {Boolean} emptyRequest = false
     * @markdown
     * Invoke a request for empty search values.
     */
    emptyRequest: false,

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {Object} ignoredKeys
     * @markdown
     * Key codes to ignore so a request is not invoked with bindEvent. The
     * "enter" key (13) will always be dynamically added to any list provided
     * unless the "cache" option above is set to "true".
     *
     * ```js
     * {
     *     9: "tab",
     *     16: "shift",
     *     17: "ctrl",
     *     18: "alt",
     *     27: "esc",
     *     37: "left",
     *     39: "right",
     *     38: "up",
     *     40: "down",
     *     91: "meta"
     * }
     * ```
     */
    ignoredKeys: {
        9: "tab",
        16: "shift",
        17: "ctrl",
        18: "alt",
        27: "esc",
        37: "left",
        39: "right",
        38: "up",
        40: "down",
        91: "meta"
    },

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {String} langCode = null
     * @markdown
     * The language code to use for string translation. By default this value
     * is determined by the browser, however it is not entirely reliable. If
     * you encounter inconsistencies, you may need to manually set this option.
     */
    langCode: null,

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {Object} locale = null
     * @markdown
     * Provide specific overrides for {@link $.fn.ajaxSelectPicker.locale locale string} translations. Values
     * set here will cause the plugin to completely ignore defined locale string
     * translations provided by the set language code. This is useful when
     * needing to change a single value or when being used in a system that
     * provides its own translations, like a CMS.
     *
     * ```js
     * locale: {
     *     searchPlaceholder: Drupal.t('Find...')
     * }
     * ```
     */
    locale: null,

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {String|Number|Number} log = 'error'
     * @markdown
     * Determines the amount of logging that is displayed:
     *
     * - __0, false:__ Display no information from the plugin.
     * - __1, 'error':__ Fatal errors that prevent the plugin from working.
     * - __2, 'warn':__ Warnings that may impact the display of request data, but does not prevent the plugin from functioning.
     * - __3, 'info':__ Provides additional information, generally regarding the from request data and callbacks.
     * - __4, true, 'debug':__ Display all possible information. This will likely be highly verbose and is only recommended for development purposes or tracing an error with a request.
     */
    log: 'error',

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {Boolean} mixWithCurrents
     * @deprecated Since version `1.2.0`, see: {@link $.fn.ajaxSelectPicker.defaults#preserveSelected}.
     */

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg placeHolderOption
     * @deprecated Since version `1.2.0`, see: {@link $.fn.ajaxSelectPicker.locale#emptyTitle}.
     */

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {Function|null} preprocessData = function(){}
     * @markdown
     * Process the raw data returned from a request.
     *
     * The following arguments are passed to this callback:
     *
     * - __data__ - `Array` The raw data returned from the request, passed by reference.
     *
     * This callback must return one of the following:
     *
     * - `Array` - A new array of items. This will replace the passed data.
     * - `undefined|null|false` - Stops the callback and will use whatever modifications have been made to data.
     *
     * ```js
     * function (data) {
     *     var new = [], old = [], other = [];
     *     for (var i = 0; i < data.length; i++) {
     *         // Add items flagged as "new" to the correct array.
     *         if (data[i].new) {
     *             new.push(data[i]);
     *         }
     *         // Add items flagged as "old" to the correct array.
     *         else if (data[i].old) {
     *             old.push(data[i]);
     *         }
     *         // Something out of the ordinary happened, put these last.
     *         else {
     *             other.push(data[i]);
     *         }
     *     }
     *     // Sort the data according to the order of these arrays.
     *     return [].concat(new, old, other).
     * }
     * ```
     */
    preprocessData: function(){},

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {Boolean} preserveSelected = true
     * @markdown
     * Preserve selected items(s) between requests. When enabled, they will be
     * placed in an `<optgroup>` with the label `Currently Selected`. Disable
     * this option if you send your currently selected items along with your
     * request and let the server handle this responsibility.
     */
    preserveSelected: true,

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {String} preserveSelectedPosition = 'after'
     * @markdown
     * Place the currently selected options `'before'` or `'after'` the options
     * returned from the request.
     */
    preserveSelectedPosition: 'after',

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {Function|null} processData = function(){}
     * @markdown
     * Process the data returned after this plugin, but before the list is built.
     */
    processData: function(){},

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {Number} requestDelay = 300
     * @markdown
     * The amount of time, in milliseconds, that must pass before a request
     * is initiated. Each time the {@link $.fn.ajaxSelectPicker.defaults#bindEvent bindEvent} is fired, it will cancel the
     * current delayed request and start a new one.
     */
    requestDelay: 300,

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {Boolean} restoreOnError = false
     * @markdown
     * Restores the select list with the previous results when the request
     * returns with an error.
     */
    restoreOnError: false,

    /**
     * @member $.fn.ajaxSelectPicker.defaults
     * @cfg {Object} templates
     * @markdown
     * The DOM templates used in this plugin.
     *
     * ```js
     * templates: {
     *     // The placeholder for status updates pertaining to the list and request.
     *     status: '<div class="status"></div>',
     * }
     * ```
     */
    templates: {
        status: '<div class="status"></div>'
    }
};

/*
 * Note: You do not have to load this translation file. English is the
 * default language of this plugin and is compiled into it automatically.
 *
 * This file is just to serve as the default string mappings and as a
 * template for future translations.
 * @see: ./src/js/locale/en-US.js
 *
 * Four character language codes are supported ("en-US") and will always
 * take precedence over two character language codes ("en") if present.
 *
 * When copying this file, remove all comments except the one above the
 * definition objection giving credit to the translation author.
 */

/*!
 * English translation for the "en-US" and "en" language codes.
 * Mark Carver <mark.carver@me.com>
 */
$.fn.ajaxSelectPicker.locale['en-US'] = {
    /**
     * @member $.fn.ajaxSelectPicker.locale
     * @cfg {String} currentlySelected = 'Currently Selected'
     * @markdown
     * The text to use for the label of the option group when currently selected options are preserved.
     */
    currentlySelected: 'Currently Selected',

    /**
     * @member $.fn.ajaxSelectPicker.locale
     * @cfg {String} emptyTitle = 'Select and begin typing'
     * @markdown
     * The text to use as the title for the select element when there are no items to display.
     */
    emptyTitle: 'Select and begin typing',

    /**
     * @member $.fn.ajaxSelectPicker.locale
     * @cfg {String} errorText = ''Unable to retrieve results'
     * @markdown
     * The text to use in the status container when a request returns with an error.
     */
    errorText: 'Unable to retrieve results',

    /**
     * @member $.fn.ajaxSelectPicker.locale
     * @cfg {String} searchPlaceholder = 'Search...'
     * @markdown
     * The text to use for the search input placeholder attribute.
     */
    searchPlaceholder: 'Search...',

    /**
     * @member $.fn.ajaxSelectPicker.locale
     * @cfg {String} statusInitialized = 'Start typing a search query'
     * @markdown
     * The text used in the status container when it is initialized.
     */
    statusInitialized: 'Start typing a search query',

    /**
     * @member $.fn.ajaxSelectPicker.locale
     * @cfg {String} statusNoResults = 'No Results'
     * @markdown
     * The text used in the status container when the request returns no results.
     */
    statusNoResults: 'No Results',

    /**
     * @member $.fn.ajaxSelectPicker.locale
     * @cfg {String} statusSearching = 'Searching...'
     * @markdown
     * The text to use in the status container when a request is being initiated.
     */
    statusSearching: 'Searching...'
};
$.fn.ajaxSelectPicker.locale.en = $.fn.ajaxSelectPicker.locale['en-US'];

})(jQuery, window);
