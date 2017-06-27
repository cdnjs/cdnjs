!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.selectivity=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
_dereq_(5);_dereq_(6);_dereq_(7);_dereq_(9);_dereq_(10);_dereq_(11);_dereq_(12);_dereq_(13);_dereq_(14);_dereq_(15);_dereq_(16);_dereq_(17);_dereq_(18);_dereq_(19);module.exports=_dereq_(8);
},{"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"5":5,"6":6,"7":7,"8":8,"9":9}],2:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

/**
 * Event Delegator Constructor.
 */
function EventDelegator() {

    this._events = [];

    this.delegateEvents();
}

/**
 * Methods.
 */
$.extend(EventDelegator.prototype, {

    /**
     * Attaches all listeners from the events map to the instance's element.
     *
     * Normally, you should not have to call this method yourself as it's called automatically in
     * the constructor.
     */
    delegateEvents: function() {

        this.undelegateEvents();

        $.each(this.events, function(event, listener) {
            var selector, index = event.indexOf(' ');
            if (index > -1) {
                selector = event.slice(index + 1);
                event = event.slice(0, index);
            }

            if ($.type(listener) === 'string') {
                listener = this[listener];
            }

            listener = listener.bind(this);

            if (selector) {
                this.$el.on(event, selector, listener);
            } else {
                this.$el.on(event, listener);
            }

            this._events.push({ event: event, selector: selector, listener: listener });
        }.bind(this));
    },

    /**
     * Detaches all listeners from the events map from the instance's element.
     */
    undelegateEvents: function() {

        this._events.forEach(function(event) {
            if (event.selector) {
                this.$el.off(event.event, event.selector, event.listener);
            } else {
                this.$el.off(event.event, event.listener);
            }
        }, this);

        this._events = [];
    }

});

module.exports = EventDelegator;

},{"jquery":"jquery"}],3:[function(_dereq_,module,exports){
'use strict';

/**
 * @license
 * lodash 3.3.1 (Custom Build) <https://lodash.com/>
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Gets the number of milliseconds that have elapsed since the Unix epoch
 *  (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @category Date
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => logs the number of milliseconds it took for the deferred function to be invoked
 */
var now = Date.now;

/**
 * Creates a function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time it was invoked.
 *
 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // avoid costly calculations while the window size is in flux
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 */
function debounce(func, wait) {
    var args,
        result,
        stamp,
        timeoutId,
        trailingCall,
        lastCalled = 0;

    wait = wait < 0 ? 0 : (+wait || 0);

    function delayed() {
        var remaining = wait - (now() - stamp);
        if (remaining <= 0 || remaining > wait) {
            var isCalled = trailingCall;
            timeoutId = trailingCall = undefined;
            if (isCalled) {
                lastCalled = now();
                result = func.apply(null, args);
                if (!timeoutId) {
                    args = null;
                }
            }
        } else {
            timeoutId = setTimeout(delayed, remaining);
        }
    }

    function debounced() {
        args = arguments;
        stamp = now();
        trailingCall = true;

        if (!timeoutId) {
            timeoutId = setTimeout(delayed, wait);
        }
        return result;
    }
    return debounced;
}

module.exports = debounce;

},{}],4:[function(_dereq_,module,exports){
'use strict';

/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};

/**
 * Used by `escape` to convert characters to HTML entities.
 *
 * @private
 * @param {string} match The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
function escapeHtmlChar(match) {
    return htmlEscapes[match];
}

var reUnescapedHtml = new RegExp('[' + Object.keys(htmlEscapes).join('') + ']', 'g');

/**
 * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
 * corresponding HTML entities.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @param {string} string The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escape('Fred, Wilma, & Pebbles');
 * // => 'Fred, Wilma, &amp; Pebbles'
 */
function escape(string) {
    return string ? String(string).replace(reUnescapedHtml, escapeHtmlChar) : '';
}

module.exports = escape;

},{}],5:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

var debounce = _dereq_(3);

var Selectivity = _dereq_(8);

_dereq_(13);

/**
 * Option listener that implements a convenience query function for performing AJAX requests.
 */
Selectivity.OptionListeners.unshift(function(selectivity, options) {

    var ajax = options.ajax;
    if (ajax && ajax.url) {
        var formatError = ajax.formatError || Selectivity.Locale.ajaxError;
        var minimumInputLength = ajax.minimumInputLength || 0;
        var params = ajax.params;
        var processItem = ajax.processItem || function(item) { return item; };
        var quietMillis = ajax.quietMillis || 0;
        var resultsCb = ajax.results || function(data) { return { results: data, more: false }; };
        var transport = ajax.transport || $.ajax;

        if (quietMillis) {
            transport = debounce(transport, quietMillis);
        }

        options.query = function(queryOptions) {
            var offset = queryOptions.offset;
            var term = queryOptions.term;
            if (term.length < minimumInputLength) {
                queryOptions.error(
                    Selectivity.Locale.needMoreCharacters(minimumInputLength - term.length)
                );
            } else {
                selectivity.dropdown.showLoading();

                var url = (ajax.url instanceof Function ? ajax.url() : ajax.url);
                if (params) {
                    url += (url.indexOf('?') > -1 ? '&' : '?') + $.param(params(term, offset));
                }

                var success = ajax.success;
                var error = ajax.error;

                transport($.extend({}, ajax, {
                    url: url,
                    success: function(data, textStatus, jqXHR) {
                        if (success) {
                            success(data, textStatus, jqXHR);
                        }

                        var results = resultsCb(data, offset);
                        results.results = results.results.map(processItem);
                        queryOptions.callback(results);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        if (error) {
                            error(jqXHR, textStatus, errorThrown);
                        }

                        queryOptions.error(
                            formatError(term, jqXHR, textStatus, errorThrown),
                            { escape: false }
                        );
                    }
                }));
            }
        };
    }
});

},{"13":13,"3":3,"8":8,"jquery":"jquery"}],6:[function(_dereq_,module,exports){
'use strict';

var Selectivity = _dereq_(8);

var latestQueryNum = 0;

/**
 * Option listener that will discard any callbacks from the query function if another query has
 * been called afterwards. This prevents responses from remote sources arriving out-of-order.
 */
Selectivity.OptionListeners.push(function(selectivity, options) {

    var query = options.query;
    if (query) {
        options.query = function(queryOptions) {
            latestQueryNum++;
            var queryNum = latestQueryNum;

            var callback = queryOptions.callback;
            var error = queryOptions.error;
            queryOptions.callback = function() {
                if (queryNum === latestQueryNum) {
                    callback.apply(null, arguments);
                }
            };
            queryOptions.error = function() {
                if (queryNum === latestQueryNum) {
                    error.apply(null, arguments);
                }
            };
            query(queryOptions);
        };
    }
});

},{"8":8}],7:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

var SelectivityDropdown = _dereq_(10);

/**
 * Methods.
 */
$.extend(SelectivityDropdown.prototype, {

    /**
     * @inherit
     */
    removeCloseHandler: function() {

        if (this._$backdrop && !this.parentMenu) {
            this._$backdrop.remove();
            this._$backdrop = null;
        }
    },

    /**
     * @inherit
     */
    setupCloseHandler: function() {

        var $backdrop;
        if (this.parentMenu) {
            $backdrop = this.parentMenu._$backdrop;
        } else {
            $backdrop = $('<div>').addClass('selectivity-backdrop');

            $('body').append($backdrop);
        }

        $backdrop.on('click', this.close.bind(this));

        this._$backdrop = $backdrop;
    }

});

},{"10":10,"jquery":"jquery"}],8:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

var EventDelegator = _dereq_(2);

/**
 * Create a new Selectivity instance or invoke a method on an instance.
 *
 * @param methodName Optional name of a method to call. If omitted, a Selectivity instance is
 *                   created for each element in the set of matched elements. If an element in the
 *                   set already has a Selectivity instance, the result is the same as if the
 *                   setOptions() method is called.
 * @param options Optional options object to pass to the given method or the constructor. See the
 *                documentation for the respective methods to see which options they accept. In case
 *                a new instance is being created, the following property is used:
 *                inputType - The input type to use. Default input types include 'Multiple' and
 *                            'Single', but you can add custom input types to the InputTypes map or
 *                            just specify one here as a function. The default value is 'Single',
 *                            unless multiple is true in which case it is 'Multiple'.
 *                multiple - Boolean determining whether multiple items may be selected
 *                           (default: false). If true, a MultipleSelectivity instance is created,
 *                           otherwise a SingleSelectivity instance is created.
 *
 * @return If the given method returns a value, this method returns the value of that method
 *         executed on the first element in the set of matched elements.
 */
function selectivity(methodName, options) {
    /* jshint validthis: true */

    var result;

    this.each(function() {
        var instance = this.selectivity;

        if (instance) {
            if ($.type(methodName) !== 'string') {
                options = methodName;
                methodName = 'setOptions';
            }

            if ($.type(instance[methodName]) === 'function') {
                if (result === undefined) {
                    result = instance[methodName].call(instance, options);
                }
            } else {
                throw new Error('Unknown method: ' + methodName);
            }
        } else {
            if ($.type(methodName) === 'string') {
                if (methodName !== 'destroy') {
                    throw new Error('Cannot call method on element without Selectivity instance');
                }
            } else {
                options = $.extend({}, methodName, { element: this });

                // this is a one-time hack to facilitate the selectivity-traditional module, because
                // the module is not able to hook this early into creation of the instance
                var $this = $(this);
                if ($this.is('select') && $this.prop('multiple')) {
                    options.multiple = true;
                }

                var InputTypes = Selectivity.InputTypes;
                var InputType = (options.inputType || (options.multiple ? 'Multiple' : 'Single'));
                if ($.type(InputType) !== 'function') {
                    if (InputTypes[InputType]) {
                        InputType = InputTypes[InputType];
                    } else {
                        throw new Error('Unknown Selectivity input type: ' + InputType);
                    }
                }

                this.selectivity = new InputType(options);
            }
        }
    });

    return (result === undefined ? this : result);
}

/**
 * Selectivity Base Constructor.
 *
 * You will never use this constructor directly. Instead, you use $(selector).selectivity(options)
 * to create an instance of either MultipleSelectivity or SingleSelectivity. This class defines all
 * functionality that is common between both.
 *
 * @param options Options object. Accepts the same options as the setOptions method(), in addition
 *                to the following ones:
 *                data - Initial selection data to set. This should be an array of objects with 'id'
 *                       and 'text' properties. This option is mutually exclusive with 'value'.
 *                element - The DOM element to which to attach the Selectivity instance. This
 *                          property is set automatically by the $.fn.selectivity() function.
 *                value - Initial value to set. This should be an array of IDs. This property is
 *                        mutually exclusive with 'data'.
 */
function Selectivity(options) {

    if (!(this instanceof Selectivity)) {
        return selectivity.apply(this, arguments);
    }

    /**
     * jQuery container for the element to which this instance is attached.
     */
    this.$el = $(options.element);

    /**
     * jQuery container for the search input.
     *
     * May be null as long as there is no visible search input. It is set by initSearchInput().
     */
    this.$searchInput = null;

    /**
     * Reference to the currently open dropdown.
     */
    this.dropdown = null;

    /**
     * Whether the input is enabled.
     *
     * This is false when the option readOnly is false or the option removeOnly is false.
     */
    this.enabled = true;

    /**
     * Boolean whether the browser has touch input.
     */
    this.hasTouch = (typeof window !== 'undefined' && 'ontouchstart' in window);

    /**
     * Boolean whether the browser has a physical keyboard attached to it.
     *
     * Given that there is no way for JavaScript to reliably detect this yet, we just assume it's
     * the opposite of hasTouch for now.
     */
    this.hasKeyboard = !this.hasTouch;

    /**
     * Array of items from which to select. If set, this will be an array of objects with 'id' and
     * 'text' properties.
     *
     * If given, all items are expected to be available locally and all selection operations operate
     * on this local array only. If null, items are not available locally, and a query function
     * should be provided to fetch remote data.
     */
    this.items = null;

    /**
     * The function to be used for matching search results.
     */
    this.matcher = Selectivity.matcher;

    /**
     * Options passed to the Selectivity instance or set through setOptions().
     */
    this.options = {};

    /**
     * Results from a search query.
     */
    this.results = [];

    /**
     * Array of search input listeners.
     *
     * Custom listeners can be specified in the options object.
     */
    this.searchInputListeners = Selectivity.SearchInputListeners;

    /**
     * Mapping of templates.
     *
     * Custom templates can be specified in the options object.
     */
    this.templates = $.extend({}, Selectivity.Templates);

    /**
     * The last used search term.
     */
    this.term = '';

    this.setOptions(options);

    if (options.value) {
        this.value(options.value, { triggerChange: false });
    } else {
        this.data(options.data || null, { triggerChange: false });
    }

    this._$searchInputs = [];

    this.$el.on('selectivity-close', this._closed.bind(this));

    EventDelegator.call(this);
}

/**
 * Methods.
 */
$.extend(Selectivity.prototype, EventDelegator.prototype, {

    /**
     * Convenience shortcut for this.$el.find(selector).
     */
    $: function(selector) {

        return this.$el.find(selector);
    },

    /**
     * Closes the dropdown.
     */
    close: function() {

        if (this.dropdown) {
            this.dropdown.close();
        }
    },

    /**
     * Sets or gets the selection data.
     *
     * The selection data contains both IDs and text labels. If you only want to set or get the IDs,
     * you should use the value() method.
     *
     * @param newData Optional new data to set. For a MultipleSelectivity instance the data must be
     *                an array of objects with 'id' and 'text' properties, for a SingleSelectivity
     *                instance the data must be a single such object or null to indicate no item is
     *                selected.
     * @param options Optional options object. May contain the following property:
     *                triggerChange - Set to false to suppress the "change" event being triggered.
     *
     * @return If newData is omitted, this method returns the current data.
     */
    data: function(newData, options) {

        options = options || {};

        if (newData === undefined) {
            return this._data;
        } else {
            newData = this.validateData(newData);

            this._data = newData;
            this._value = this.getValueForData(newData);

            if (options.triggerChange !== false) {
                this.triggerChange();
            }
        }
    },

    /**
     * Destroys the Selectivity instance.
     */
    destroy: function() {

        this.undelegateEvents();

        var $el = this.$el;
        $el.children().remove();
        $el[0].selectivity = null;
        $el = null;
    },

    /**
     * Filters the results to be displayed in the dropdown.
     *
     * The default implementation simply returns the results unfiltered, but the MultipleSelectivity
     * class overrides this method to filter out any items that have already been selected.
     *
     * @param results Array of items with 'id' and 'text' properties.
     *
     * @return The filtered array.
     */
    filterResults: function(results) {

        return results;
    },

    /**
     * Applies focus to the input.
     */
    focus: function() {

        if (this.$searchInput) {
            this.$searchInput.focus();
        }
    },

    /**
     * Returns the correct item for a given ID.
     *
     * @param id The ID to get the item for.
     *
     * @return The corresponding item. Will be an object with 'id' and 'text' properties or null if
     *         the item cannot be found. Note that if no items are defined, this method assumes the
     *         text labels will be equal to the IDs.
     */
    getItemForId: function(id) {

        var items = this.items;
        if (items) {
            return Selectivity.findNestedById(items, id);
        } else {
            return { id: id, text: '' + id };
        }
    },

    /**
     * Initializes the search input element.
     *
     * Sets the $searchInput property, invokes all search input listeners and attaches the default
     * action of searching when something is typed.
     *
     * @param $input jQuery container for the input element.
     * @param options Optional options object. May contain the following property:
     *                noSearch - If false, no event handlers are setup to initiate searching when
     *                           the user types in the input field. This is useful if you want to
     *                           use the input only to handle keyboard support.
     */
    initSearchInput: function($input, options) {

        this._$searchInputs.push($input);
        this.$searchInput = $input;

        this.searchInputListeners.forEach(function(listener) {
            listener(this, $input);
        }.bind(this));

        if (!options || options.noSearch !== false) {
            $input.on('keyup', function(event) {
                if (!event.isDefaultPrevented()) {
                    this.search();
                }
            }.bind(this));
        }
    },

    /**
     * Loads a follow-up page with results after a search.
     *
     * This method should only be called after a call to search() when the callback has indicated
     * more results are available.
     */
    loadMore: function() {

        this.options.query({
            callback: function(response) {
                if (response && response.results) {
                    this._addResults(
                        Selectivity.processItems(response.results),
                        { hasMore: !!response.more }
                    );
                } else {
                    throw new Error('callback must be passed a response object');
                }
            }.bind(this),
            error: this._addResults.bind(this, []),
            offset: this.results.length,
            selectivity: this,
            term: this.term
        });
    },

    /**
     * Opens the dropdown.
     *
     * @param options Optional options object. May contain the following property:
     *                showSearchInput - Boolean whether a search input should be shown in the
     *                                  dropdown. Default is false.
     */
    open: function(options) {

        options = options || {};

        if (!this.dropdown) {
            if (this.triggerEvent('selectivity-opening')) {
                var Dropdown = this.options.dropdown || Selectivity.Dropdown;
                if (Dropdown) {
                    this.dropdown = new Dropdown({
                        position: this.options.positionDropdown,
                        selectivity: this,
                        showSearchInput: options.showSearchInput
                    });
                }

                this.search('');
            }
        }
    },

    /**
     * (Re-)positions the dropdown.
     */
    positionDropdown: function() {

        if (this.dropdown) {
            this.dropdown.position();
        }
    },

    /**
     * Removes the search input last initialized with initSearchInput().
     */
    removeSearchInput: function() {

        this._$searchInputs.pop();

        this.$searchInput = this._$searchInputs[this._$searchInputs.length - 1] || null;
    },

    /**
     * Searches for results based on the term entered in the search input.
     *
     * If an items array has been passed with the options to the Selectivity instance, a local
     * search will be performed among those items. Otherwise, the query function specified in the
     * options will be used to perform the search. If neither is defined, nothing happens.
     *
     * @param term Optional term to search for. If ommitted, the value of the search input element
     *             is used as term.
     */
    search: function(term) {

        var self = this;
        function setResults(results, resultOptions) {
            self._setResults(results, $.extend({ term: term }, resultOptions));
        }

        if (term === undefined) {
            if (!self.$searchInput) {
                return;
            }

            term = self.$searchInput.val();
        }

        if (self.items) {
            term = Selectivity.transformText(term);
            var matcher = self.matcher;
            setResults(self.items.map(function(item) {
                return matcher(item, term);
            }).filter(function(item) {
                return !!item;
            }));
        } else if (self.options.query) {
            self.options.query({
                callback: function(response) {
                    if (response && response.results) {
                        setResults(
                            Selectivity.processItems(response.results),
                            { hasMore: !!response.more }
                        );
                    } else {
                        throw new Error('callback must be passed a response object');
                    }
                },
                error: self._showError.bind(self),
                offset: 0,
                selectivity: self,
                term: term
            });
        }

        self.term = term;
    },

    /**
     * Sets one or more options on this Selectivity instance.
     *
     * @param options Options object. May contain one or more of the following properties:
     *                closeOnSelect - Set to false to keep the dropdown open after the user has
     *                                selected an item. This is useful if you want to allow the user
     *                                to quickly select multiple items. The default value is true.
     *                dropdown - Custom dropdown implementation to use for this instance.
     *                initSelection - Function to map values by ID to selection data. This function
     *                                receives two arguments, 'value' and 'callback'. The value is
     *                                the current value of the selection, which is an ID or an array
     *                                of IDs depending on the input type. The callback should be
     *                                invoked with an object or array of objects, respectively,
     *                                containing 'id' and 'text' properties.
     *                items - Array of items from which to select. Should be an array of objects
     *                        with 'id' and 'text' properties. As convenience, you may also pass an
     *                        array of strings, in which case the same string is used for both the
     *                        'id' and 'text' properties. If items are given, all items are expected
     *                        to be available locally and all selection operations operate on this
     *                        local array only. If null, items are not available locally, and a
     *                        query function should be provided to fetch remote data.
     *                matcher - Function to determine whether text matches a given search term. Note
     *                          this function is only used if you have specified an array of items.
     *                          Receives two arguments:
     *                          item - The item that should match the search term.
     *                          term - The search term. Note that for performance reasons, the term
     *                                 has always been already processed using
     *                                 Selectivity.transformText().
     *                          The method should return the item if it matches, and null otherwise.
     *                          If the item has a children array, the matcher is expected to filter
     *                          those itself (be sure to only return the filtered array of children
     *                          in the returned item and not to modify the children of the item
     *                          argument).
     *                placeholder - Placeholder text to display when the element has no focus and
     *                              no selected items.
     *                positionDropdown - Function to position the dropdown. Receives two arguments:
     *                                   $dropdownEl - The element to be positioned.
     *                                   $selectEl - The element of the Selectivity instance, that
     *                                               you can position the dropdown to.
     *                                   The default implementation positions the dropdown element
     *                                   under the Selectivity's element and gives it the same
     *                                   width.
     *                query - Function to use for querying items. Receives a single object as
     *                        argument with the following properties:
     *                        callback - Callback to invoke when the results are available. This
     *                                   callback should be passed a single object as argument with
     *                                   the following properties:
     *                                   more - Boolean that can be set to true to indicate there
     *                                          are more results available. Additional results may
     *                                          be fetched by the user through pagination.
     *                                   results - Array of result items. The format for the result
     *                                             items is the same as for passing local items.
     *                        offset - This property is only used for pagination and indicates how
     *                                 many results should be skipped when returning more results.
     *                        selectivity - The Selectivity instance the query function is used on.
     *                        term - The search term the user is searching for. Unlike with the
     *                               matcher function, the term has not been processed using
     *                               Selectivity.transformText().
     *                readOnly - If true, disables any modification of the input.
     *                removeOnly - If true, disables any modification of the input except removing
     *                             of selected items.
     *                searchInputListeners - Array of search input listeners. By default, the global
     *                                       array Selectivity.SearchInputListeners is used.
     *                showDropdown - Set to false if you don't want to use any dropdown (you can
     *                               still open it programmatically using open()).
     *                templates - Object with instance-specific templates to override the global
     *                            templates assigned to Selectivity.Templates.
     */
    setOptions: function(options) {

        options = options || {};

        Selectivity.OptionListeners.forEach(function(listener) {
            listener(this, options);
        }.bind(this));

        $.extend(this.options, options);

        var allowedTypes = $.extend({
            closeOnSelect: 'boolean',
            dropdown: 'function|null',
            initSelection: 'function|null',
            matcher: 'function|null',
            placeholder: 'string',
            positionDropdown: 'function|null',
            query: 'function|null',
            readOnly: 'boolean',
            removeOnly: 'boolean',
            searchInputListeners: 'array'
        }, options.allowedTypes);

        $.each(options, function(key, value) {
            var type = allowedTypes[key];
            if (type && !type.split('|').some(function(type) { return $.type(value) === type; })) {
                throw new Error(key + ' must be of type ' + type);
            }

            switch (key) {
            case 'items':
                this.items = (value === null ? value : Selectivity.processItems(value));
                break;

            case 'matcher':
                this.matcher = value;
                break;

            case 'searchInputListeners':
                this.searchInputListeners = value;
                break;

            case 'templates':
                $.extend(this.templates, value);
                break;
            }
        }.bind(this));

        this.enabled = (!this.options.readOnly && !this.options.removeOnly);
    },

    /**
     * Returns the result of the given template.
     *
     * @param templateName Name of the template to process.
     * @param options Options to pass to the template.
     *
     * @return String containing HTML.
     */
    template: function(templateName, options) {

        var template = this.templates[templateName];
        if (template) {
            if ($.type(template) === 'function') {
                return template(options);
            } else if (template.render) {
                return template.render(options);
            } else {
                return template.toString();
            }
        } else {
            throw new Error('Unknown template: ' + templateName);
        }
    },

    /**
     * Triggers the change event.
     *
     * The event object at least contains the following property:
     * value - The new value of the Selectivity instance.
     *
     * @param Optional additional options added to the event object.
     */
    triggerChange: function(options) {

        this.triggerEvent('change', $.extend({ value: this._value }, options));
    },

    /**
     * Triggers an event on the instance's element.
     *
     * @param Optional event data to be added to the event object.
     *
     * @return Whether the default action of the event may be executed, ie. returns false if
     *         preventDefault() has been called.
     */
    triggerEvent: function(eventName, data) {

        var event = $.Event(eventName, data || {});
        this.$el.trigger(event);
        return !event.isDefaultPrevented();
    },

    /**
     * Shorthand for value().
     */
    val: function(newValue) {

        return this.value(newValue);
    },

    /**
     * Validates a single item. Throws an exception if the item is invalid.
     *
     * @param item The item to validate.
     *
     * @return The validated item. May differ from the input item.
     */
    validateItem: function(item) {

        if (item && Selectivity.isValidId(item.id) && $.type(item.text) === 'string') {
            return item;
        } else {
            throw new Error('Item should have id (number or string) and text (string) properties');
        }
    },

    /**
     * Sets or gets the value of the selection.
     *
     * The value of the selection only concerns the IDs of the selection items. If you are
     * interested in the IDs and the text labels, you should use the data() method.
     *
     * Note that if neither the items option nor the initSelection option have been set, Selectivity
     * will have no way to determine what text labels should be used with the given IDs in which
     * case it will assume the text is equal to the ID. This is useful if you're working with tags,
     * or selecting e-mail addresses for instance, but may not always be what you want.
     *
     * @param newValue Optional new value to set. For a MultipleSelectivity instance the value must be
     *                 an array of IDs, for a SingleSelectivity instance the value must be a single ID
     *                 (a string or a number) or null to indicate no item is selected.
     * @param options Optional options object. May contain the following property:
     *                triggerChange - Set to false to suppress the "change" event being triggered.
     *
     * @return If newValue is omitted, this method returns the current value.
     */
    value: function(newValue, options) {

        options = options || {};

        if (newValue === undefined) {
            return this._value;
        } else {
            newValue = this.validateValue(newValue);

            this._value = newValue;

            if (this.options.initSelection) {
                this.options.initSelection(newValue, function(data) {
                    if (this._value === newValue) {
                        this._data = this.validateData(data);

                        if (options.triggerChange !== false) {
                            this.triggerChange();
                        }
                    }
                }.bind(this));
            } else {
                this._data = this.getDataForValue(newValue);

                if (options.triggerChange !== false) {
                    this.triggerChange();
                }
            }
        }
    },

    /**
     * @private
     */
    _addResults: function(results, options) {

        this.results = this.results.concat(results);

        if (this.dropdown) {
            this.dropdown.showResults(
                this.filterResults(results),
                $.extend({ add: true }, options)
            );
        }
    },

    /**
     * @private
     */
    _closed: function() {

        this.dropdown = null;
    },

    /**
     * @private
     */
    _getItemId: function(elementOrEvent) {

        // returns the item ID related to an element or event target.
        // IDs can be either numbers or strings, but attribute values are always strings, so we
        // will have to find out whether the item ID ought to be a number or string ourselves.
        // $.fn.data() is a bit overzealous for our case, because it returns a number whenever the
        // attribute value can be parsed as a number. however, it is possible an item had an ID
        // which is a string but which is parseable as number, in which case we verify if the ID
        // as number is actually found among the data or results. if it isn't, we assume it was
        // supposed to be a string after all...

        var $element;
        if (elementOrEvent.target) {
            $element = $(elementOrEvent.target).closest('[data-item-id]');
        } else if (elementOrEvent.length) {
            $element = elementOrEvent;
        } else {
            $element = $(elementOrEvent);
        }

        var id = $element.data('item-id');
        if ($.type(id) === 'string') {
            return id;
        } else {
            if (Selectivity.findById(this._data || [], id) ||
                Selectivity.findNestedById(this.results, id)) {
                return id;
            } else {
                return '' + id;
            }
        }
    },

    /**
     * @private
     */
    _setResults: function(results, options) {

        this.results = results;

        if (this.dropdown) {
            this.dropdown.showResults(this.filterResults(results), options || {});
        }
    },

    /**
     * @private
     */
    _showError: function(error, options) {

        this.results = [];

        if (this.dropdown) {
            this.dropdown.showError(error, options);
        }
    }

});

/**
 * Dropdown class to use for displaying dropdowns.
 *
 * The default implementation of a dropdown is defined in the selectivity-dropdown module.
 */
Selectivity.Dropdown = null;

/**
 * Mapping of input types.
 */
Selectivity.InputTypes = {};

/**
 * Array of option listeners.
 *
 * Option listeners are invoked when setOptions() is called. Every listener receives two arguments:
 *
 * selectivity - The Selectivity instance.
 * options - The options that are about to be set. The listener may modify this options object.
 *
 * An example of an option listener is the selectivity-traditional module.
 */
Selectivity.OptionListeners = [];

/**
 * Array of search input listeners.
 *
 * Search input listeners are invoked when initSearchInput() is called (typically right after the
 * search input is created). Every listener receives two arguments:
 *
 * selectivity - The Selectivity instance.
 * $input - jQuery container with the search input.
 *
 * An example of a search input listener is the selectivity-keyboard module.
 */
Selectivity.SearchInputListeners = [];

/**
 * Mapping with templates to use for rendering select boxes and dropdowns. See
 * selectivity-templates.js for a useful set of default templates, as well as for documentation of
 * the individual templates.
 */
Selectivity.Templates = {};

/**
 * Finds an item in the given array with the specified ID.
 *
 * @param array Array to search in.
 * @param id ID to search for.
 *
 * @return The item in the array with the given ID, or null if the item was not found.
 */
Selectivity.findById = function(array, id) {

    var index = Selectivity.findIndexById(array, id);
    return (index > -1 ? array[index] : null);
};

/**
 * Finds the index of an item in the given array with the specified ID.
 *
 * @param array Array to search in.
 * @param id ID to search for.
 *
 * @return The index of the item in the array with the given ID, or -1 if the item was not found.
 */
Selectivity.findIndexById = function(array, id) {

    for (var i = 0, length = array.length; i < length; i++) {
        if (array[i].id === id) {
            return i;
        }
    }
    return -1;
};

/**
 * Finds an item in the given array with the specified ID. Items in the array may contain 'children'
 * properties which in turn will be searched for the item.
 *
 * @param array Array to search in.
 * @param id ID to search for.
 *
 * @return The item in the array with the given ID, or null if the item was not found.
 */
Selectivity.findNestedById =  null && function(array, id) {

    for (var i = 0, length = array.length; i < length; i++) {
        var item = array[i];
        if (item.id === id) {
            return item;
        } else if (item.children) {
            var result = Selectivity.findNestedById(item.children, id);
            if (result) {
                return result;
            }
        }
    }
    return null;
};

/**
 * Utility method for inheriting another class.
 *
 * @param SubClass Constructor function of the subclass.
 * @param SuperClass Optional constructor function of the superclass. If omitted, Selectivity is
 *                   used as superclass.
 * @param prototype Object with methods you want to add to the subclass prototype.
 *
 * @return A utility function for calling the methods of the superclass. This function receives two
 *         arguments: The this object on which you want to execute the method and the name of the
 *         method. Any arguments past those are passed to the superclass method.
 */
Selectivity.inherits = function(SubClass, SuperClass, prototype) {

    if (arguments.length === 2) {
        prototype = SuperClass;
        SuperClass = Selectivity;
    }

    SubClass.prototype = $.extend(
        Object.create(SuperClass.prototype),
        { constructor: SubClass },
        prototype
    );

    return function(self, methodName) {
        SuperClass.prototype[methodName].apply(self, Array.prototype.slice.call(arguments, 2));
    };
};

/**
 * Checks whether a value can be used as a valid ID for selection items. Only numbers and strings
 * are accepted to be used as IDs.
 *
 * @param id The value to check whether it is a valid ID.
 *
 * @return true if the value is a valid ID, false otherwise.
 */
Selectivity.isValidId = function(id) {

    var type = $.type(id);
    return type === 'number' || type === 'string';
};

/**
 * Decides whether a given item matches a search term. The default implementation simply
 * checks whether the term is contained within the item's text, after transforming them using
 * transformText().
 *
 * @param item The item that should match the search term.
 * @param term The search term. Note that for performance reasons, the term has always been already
 *             processed using transformText().
 *
 * @return true if the text matches the term, false otherwise.
 */
Selectivity.matcher = function(item, term) {

    var result = null;
    if (Selectivity.transformText(item.text).indexOf(term) > -1) {
        result = item;
    } else if (item.children) {
        var matchingChildren = item.children.map(function(child) {
            return Selectivity.matcher(child, term);
        }).filter(function(child) {
            return !!child;
        });
        if (matchingChildren.length) {
            result = { id: item.id, text: item.text, children: matchingChildren };
        }
    }
    return result;
};

/**
 * Helper function for processing items.
 *
 * @param item The item to process, either as object containing 'id' and 'text' properties or just
 *             as ID. The 'id' property of an item is optional if it has a 'children' property
 *             containing an array of items.
 *
 * @return Object containing 'id' and 'text' properties.
 */
Selectivity.processItem = function(item) {

    if (Selectivity.isValidId(item)) {
        return { id: item, text: '' + item };
    } else if (item &&
               (Selectivity.isValidId(item.id) || item.children) &&
               $.type(item.text) === 'string') {
        if (item.children) {
            item.children = Selectivity.processItems(item.children);
        }

        return item;
    } else {
        throw new Error('invalid item');
    }
};

/**
 * Helper function for processing an array of items.
 *
 * @param items Array of items to process. See processItem() for details about a single item.
 *
 * @return Array with items.
 */
Selectivity.processItems = function(items) {

    if ($.type(items) === 'array') {
        return items.map(Selectivity.processItem);
    } else {
        throw new Error('invalid items');
    }
};

/**
 * Quotes a string so it can be used in a CSS attribute selector. It adds double quotes to the
 * string and escapes all occurrences of the quote character inside the string.
 *
 * @param string The string to quote.
 *
 * @return The quoted string.
 */
Selectivity.quoteCssAttr = function(string) {

    return '"' + ('' + string).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
};

/**
 * Transforms text in order to find matches. The default implementation casts all strings to
 * lower-case so that any matches found will be case-insensitive.
 *
 * @param string The string to transform.
 *
 * @return The transformed string.
 */
Selectivity.transformText = function(string) {

    return string.toLowerCase();
};

module.exports = $.fn.selectivity = Selectivity;

},{"2":2,"jquery":"jquery"}],9:[function(_dereq_,module,exports){
'use strict';

var DIACRITICS = {
    '\u24B6': 'A',
    '\uFF21': 'A',
    '\u00C0': 'A',
    '\u00C1': 'A',
    '\u00C2': 'A',
    '\u1EA6': 'A',
    '\u1EA4': 'A',
    '\u1EAA': 'A',
    '\u1EA8': 'A',
    '\u00C3': 'A',
    '\u0100': 'A',
    '\u0102': 'A',
    '\u1EB0': 'A',
    '\u1EAE': 'A',
    '\u1EB4': 'A',
    '\u1EB2': 'A',
    '\u0226': 'A',
    '\u01E0': 'A',
    '\u00C4': 'A',
    '\u01DE': 'A',
    '\u1EA2': 'A',
    '\u00C5': 'A',
    '\u01FA': 'A',
    '\u01CD': 'A',
    '\u0200': 'A',
    '\u0202': 'A',
    '\u1EA0': 'A',
    '\u1EAC': 'A',
    '\u1EB6': 'A',
    '\u1E00': 'A',
    '\u0104': 'A',
    '\u023A': 'A',
    '\u2C6F': 'A',
    '\uA732': 'AA',
    '\u00C6': 'AE',
    '\u01FC': 'AE',
    '\u01E2': 'AE',
    '\uA734': 'AO',
    '\uA736': 'AU',
    '\uA738': 'AV',
    '\uA73A': 'AV',
    '\uA73C': 'AY',
    '\u24B7': 'B',
    '\uFF22': 'B',
    '\u1E02': 'B',
    '\u1E04': 'B',
    '\u1E06': 'B',
    '\u0243': 'B',
    '\u0182': 'B',
    '\u0181': 'B',
    '\u24B8': 'C',
    '\uFF23': 'C',
    '\u0106': 'C',
    '\u0108': 'C',
    '\u010A': 'C',
    '\u010C': 'C',
    '\u00C7': 'C',
    '\u1E08': 'C',
    '\u0187': 'C',
    '\u023B': 'C',
    '\uA73E': 'C',
    '\u24B9': 'D',
    '\uFF24': 'D',
    '\u1E0A': 'D',
    '\u010E': 'D',
    '\u1E0C': 'D',
    '\u1E10': 'D',
    '\u1E12': 'D',
    '\u1E0E': 'D',
    '\u0110': 'D',
    '\u018B': 'D',
    '\u018A': 'D',
    '\u0189': 'D',
    '\uA779': 'D',
    '\u01F1': 'DZ',
    '\u01C4': 'DZ',
    '\u01F2': 'Dz',
    '\u01C5': 'Dz',
    '\u24BA': 'E',
    '\uFF25': 'E',
    '\u00C8': 'E',
    '\u00C9': 'E',
    '\u00CA': 'E',
    '\u1EC0': 'E',
    '\u1EBE': 'E',
    '\u1EC4': 'E',
    '\u1EC2': 'E',
    '\u1EBC': 'E',
    '\u0112': 'E',
    '\u1E14': 'E',
    '\u1E16': 'E',
    '\u0114': 'E',
    '\u0116': 'E',
    '\u00CB': 'E',
    '\u1EBA': 'E',
    '\u011A': 'E',
    '\u0204': 'E',
    '\u0206': 'E',
    '\u1EB8': 'E',
    '\u1EC6': 'E',
    '\u0228': 'E',
    '\u1E1C': 'E',
    '\u0118': 'E',
    '\u1E18': 'E',
    '\u1E1A': 'E',
    '\u0190': 'E',
    '\u018E': 'E',
    '\u24BB': 'F',
    '\uFF26': 'F',
    '\u1E1E': 'F',
    '\u0191': 'F',
    '\uA77B': 'F',
    '\u24BC': 'G',
    '\uFF27': 'G',
    '\u01F4': 'G',
    '\u011C': 'G',
    '\u1E20': 'G',
    '\u011E': 'G',
    '\u0120': 'G',
    '\u01E6': 'G',
    '\u0122': 'G',
    '\u01E4': 'G',
    '\u0193': 'G',
    '\uA7A0': 'G',
    '\uA77D': 'G',
    '\uA77E': 'G',
    '\u24BD': 'H',
    '\uFF28': 'H',
    '\u0124': 'H',
    '\u1E22': 'H',
    '\u1E26': 'H',
    '\u021E': 'H',
    '\u1E24': 'H',
    '\u1E28': 'H',
    '\u1E2A': 'H',
    '\u0126': 'H',
    '\u2C67': 'H',
    '\u2C75': 'H',
    '\uA78D': 'H',
    '\u24BE': 'I',
    '\uFF29': 'I',
    '\u00CC': 'I',
    '\u00CD': 'I',
    '\u00CE': 'I',
    '\u0128': 'I',
    '\u012A': 'I',
    '\u012C': 'I',
    '\u0130': 'I',
    '\u00CF': 'I',
    '\u1E2E': 'I',
    '\u1EC8': 'I',
    '\u01CF': 'I',
    '\u0208': 'I',
    '\u020A': 'I',
    '\u1ECA': 'I',
    '\u012E': 'I',
    '\u1E2C': 'I',
    '\u0197': 'I',
    '\u24BF': 'J',
    '\uFF2A': 'J',
    '\u0134': 'J',
    '\u0248': 'J',
    '\u24C0': 'K',
    '\uFF2B': 'K',
    '\u1E30': 'K',
    '\u01E8': 'K',
    '\u1E32': 'K',
    '\u0136': 'K',
    '\u1E34': 'K',
    '\u0198': 'K',
    '\u2C69': 'K',
    '\uA740': 'K',
    '\uA742': 'K',
    '\uA744': 'K',
    '\uA7A2': 'K',
    '\u24C1': 'L',
    '\uFF2C': 'L',
    '\u013F': 'L',
    '\u0139': 'L',
    '\u013D': 'L',
    '\u1E36': 'L',
    '\u1E38': 'L',
    '\u013B': 'L',
    '\u1E3C': 'L',
    '\u1E3A': 'L',
    '\u0141': 'L',
    '\u023D': 'L',
    '\u2C62': 'L',
    '\u2C60': 'L',
    '\uA748': 'L',
    '\uA746': 'L',
    '\uA780': 'L',
    '\u01C7': 'LJ',
    '\u01C8': 'Lj',
    '\u24C2': 'M',
    '\uFF2D': 'M',
    '\u1E3E': 'M',
    '\u1E40': 'M',
    '\u1E42': 'M',
    '\u2C6E': 'M',
    '\u019C': 'M',
    '\u24C3': 'N',
    '\uFF2E': 'N',
    '\u01F8': 'N',
    '\u0143': 'N',
    '\u00D1': 'N',
    '\u1E44': 'N',
    '\u0147': 'N',
    '\u1E46': 'N',
    '\u0145': 'N',
    '\u1E4A': 'N',
    '\u1E48': 'N',
    '\u0220': 'N',
    '\u019D': 'N',
    '\uA790': 'N',
    '\uA7A4': 'N',
    '\u01CA': 'NJ',
    '\u01CB': 'Nj',
    '\u24C4': 'O',
    '\uFF2F': 'O',
    '\u00D2': 'O',
    '\u00D3': 'O',
    '\u00D4': 'O',
    '\u1ED2': 'O',
    '\u1ED0': 'O',
    '\u1ED6': 'O',
    '\u1ED4': 'O',
    '\u00D5': 'O',
    '\u1E4C': 'O',
    '\u022C': 'O',
    '\u1E4E': 'O',
    '\u014C': 'O',
    '\u1E50': 'O',
    '\u1E52': 'O',
    '\u014E': 'O',
    '\u022E': 'O',
    '\u0230': 'O',
    '\u00D6': 'O',
    '\u022A': 'O',
    '\u1ECE': 'O',
    '\u0150': 'O',
    '\u01D1': 'O',
    '\u020C': 'O',
    '\u020E': 'O',
    '\u01A0': 'O',
    '\u1EDC': 'O',
    '\u1EDA': 'O',
    '\u1EE0': 'O',
    '\u1EDE': 'O',
    '\u1EE2': 'O',
    '\u1ECC': 'O',
    '\u1ED8': 'O',
    '\u01EA': 'O',
    '\u01EC': 'O',
    '\u00D8': 'O',
    '\u01FE': 'O',
    '\u0186': 'O',
    '\u019F': 'O',
    '\uA74A': 'O',
    '\uA74C': 'O',
    '\u01A2': 'OI',
    '\uA74E': 'OO',
    '\u0222': 'OU',
    '\u24C5': 'P',
    '\uFF30': 'P',
    '\u1E54': 'P',
    '\u1E56': 'P',
    '\u01A4': 'P',
    '\u2C63': 'P',
    '\uA750': 'P',
    '\uA752': 'P',
    '\uA754': 'P',
    '\u24C6': 'Q',
    '\uFF31': 'Q',
    '\uA756': 'Q',
    '\uA758': 'Q',
    '\u024A': 'Q',
    '\u24C7': 'R',
    '\uFF32': 'R',
    '\u0154': 'R',
    '\u1E58': 'R',
    '\u0158': 'R',
    '\u0210': 'R',
    '\u0212': 'R',
    '\u1E5A': 'R',
    '\u1E5C': 'R',
    '\u0156': 'R',
    '\u1E5E': 'R',
    '\u024C': 'R',
    '\u2C64': 'R',
    '\uA75A': 'R',
    '\uA7A6': 'R',
    '\uA782': 'R',
    '\u24C8': 'S',
    '\uFF33': 'S',
    '\u1E9E': 'S',
    '\u015A': 'S',
    '\u1E64': 'S',
    '\u015C': 'S',
    '\u1E60': 'S',
    '\u0160': 'S',
    '\u1E66': 'S',
    '\u1E62': 'S',
    '\u1E68': 'S',
    '\u0218': 'S',
    '\u015E': 'S',
    '\u2C7E': 'S',
    '\uA7A8': 'S',
    '\uA784': 'S',
    '\u24C9': 'T',
    '\uFF34': 'T',
    '\u1E6A': 'T',
    '\u0164': 'T',
    '\u1E6C': 'T',
    '\u021A': 'T',
    '\u0162': 'T',
    '\u1E70': 'T',
    '\u1E6E': 'T',
    '\u0166': 'T',
    '\u01AC': 'T',
    '\u01AE': 'T',
    '\u023E': 'T',
    '\uA786': 'T',
    '\uA728': 'TZ',
    '\u24CA': 'U',
    '\uFF35': 'U',
    '\u00D9': 'U',
    '\u00DA': 'U',
    '\u00DB': 'U',
    '\u0168': 'U',
    '\u1E78': 'U',
    '\u016A': 'U',
    '\u1E7A': 'U',
    '\u016C': 'U',
    '\u00DC': 'U',
    '\u01DB': 'U',
    '\u01D7': 'U',
    '\u01D5': 'U',
    '\u01D9': 'U',
    '\u1EE6': 'U',
    '\u016E': 'U',
    '\u0170': 'U',
    '\u01D3': 'U',
    '\u0214': 'U',
    '\u0216': 'U',
    '\u01AF': 'U',
    '\u1EEA': 'U',
    '\u1EE8': 'U',
    '\u1EEE': 'U',
    '\u1EEC': 'U',
    '\u1EF0': 'U',
    '\u1EE4': 'U',
    '\u1E72': 'U',
    '\u0172': 'U',
    '\u1E76': 'U',
    '\u1E74': 'U',
    '\u0244': 'U',
    '\u24CB': 'V',
    '\uFF36': 'V',
    '\u1E7C': 'V',
    '\u1E7E': 'V',
    '\u01B2': 'V',
    '\uA75E': 'V',
    '\u0245': 'V',
    '\uA760': 'VY',
    '\u24CC': 'W',
    '\uFF37': 'W',
    '\u1E80': 'W',
    '\u1E82': 'W',
    '\u0174': 'W',
    '\u1E86': 'W',
    '\u1E84': 'W',
    '\u1E88': 'W',
    '\u2C72': 'W',
    '\u24CD': 'X',
    '\uFF38': 'X',
    '\u1E8A': 'X',
    '\u1E8C': 'X',
    '\u24CE': 'Y',
    '\uFF39': 'Y',
    '\u1EF2': 'Y',
    '\u00DD': 'Y',
    '\u0176': 'Y',
    '\u1EF8': 'Y',
    '\u0232': 'Y',
    '\u1E8E': 'Y',
    '\u0178': 'Y',
    '\u1EF6': 'Y',
    '\u1EF4': 'Y',
    '\u01B3': 'Y',
    '\u024E': 'Y',
    '\u1EFE': 'Y',
    '\u24CF': 'Z',
    '\uFF3A': 'Z',
    '\u0179': 'Z',
    '\u1E90': 'Z',
    '\u017B': 'Z',
    '\u017D': 'Z',
    '\u1E92': 'Z',
    '\u1E94': 'Z',
    '\u01B5': 'Z',
    '\u0224': 'Z',
    '\u2C7F': 'Z',
    '\u2C6B': 'Z',
    '\uA762': 'Z',
    '\u24D0': 'a',
    '\uFF41': 'a',
    '\u1E9A': 'a',
    '\u00E0': 'a',
    '\u00E1': 'a',
    '\u00E2': 'a',
    '\u1EA7': 'a',
    '\u1EA5': 'a',
    '\u1EAB': 'a',
    '\u1EA9': 'a',
    '\u00E3': 'a',
    '\u0101': 'a',
    '\u0103': 'a',
    '\u1EB1': 'a',
    '\u1EAF': 'a',
    '\u1EB5': 'a',
    '\u1EB3': 'a',
    '\u0227': 'a',
    '\u01E1': 'a',
    '\u00E4': 'a',
    '\u01DF': 'a',
    '\u1EA3': 'a',
    '\u00E5': 'a',
    '\u01FB': 'a',
    '\u01CE': 'a',
    '\u0201': 'a',
    '\u0203': 'a',
    '\u1EA1': 'a',
    '\u1EAD': 'a',
    '\u1EB7': 'a',
    '\u1E01': 'a',
    '\u0105': 'a',
    '\u2C65': 'a',
    '\u0250': 'a',
    '\uA733': 'aa',
    '\u00E6': 'ae',
    '\u01FD': 'ae',
    '\u01E3': 'ae',
    '\uA735': 'ao',
    '\uA737': 'au',
    '\uA739': 'av',
    '\uA73B': 'av',
    '\uA73D': 'ay',
    '\u24D1': 'b',
    '\uFF42': 'b',
    '\u1E03': 'b',
    '\u1E05': 'b',
    '\u1E07': 'b',
    '\u0180': 'b',
    '\u0183': 'b',
    '\u0253': 'b',
    '\u24D2': 'c',
    '\uFF43': 'c',
    '\u0107': 'c',
    '\u0109': 'c',
    '\u010B': 'c',
    '\u010D': 'c',
    '\u00E7': 'c',
    '\u1E09': 'c',
    '\u0188': 'c',
    '\u023C': 'c',
    '\uA73F': 'c',
    '\u2184': 'c',
    '\u24D3': 'd',
    '\uFF44': 'd',
    '\u1E0B': 'd',
    '\u010F': 'd',
    '\u1E0D': 'd',
    '\u1E11': 'd',
    '\u1E13': 'd',
    '\u1E0F': 'd',
    '\u0111': 'd',
    '\u018C': 'd',
    '\u0256': 'd',
    '\u0257': 'd',
    '\uA77A': 'd',
    '\u01F3': 'dz',
    '\u01C6': 'dz',
    '\u24D4': 'e',
    '\uFF45': 'e',
    '\u00E8': 'e',
    '\u00E9': 'e',
    '\u00EA': 'e',
    '\u1EC1': 'e',
    '\u1EBF': 'e',
    '\u1EC5': 'e',
    '\u1EC3': 'e',
    '\u1EBD': 'e',
    '\u0113': 'e',
    '\u1E15': 'e',
    '\u1E17': 'e',
    '\u0115': 'e',
    '\u0117': 'e',
    '\u00EB': 'e',
    '\u1EBB': 'e',
    '\u011B': 'e',
    '\u0205': 'e',
    '\u0207': 'e',
    '\u1EB9': 'e',
    '\u1EC7': 'e',
    '\u0229': 'e',
    '\u1E1D': 'e',
    '\u0119': 'e',
    '\u1E19': 'e',
    '\u1E1B': 'e',
    '\u0247': 'e',
    '\u025B': 'e',
    '\u01DD': 'e',
    '\u24D5': 'f',
    '\uFF46': 'f',
    '\u1E1F': 'f',
    '\u0192': 'f',
    '\uA77C': 'f',
    '\u24D6': 'g',
    '\uFF47': 'g',
    '\u01F5': 'g',
    '\u011D': 'g',
    '\u1E21': 'g',
    '\u011F': 'g',
    '\u0121': 'g',
    '\u01E7': 'g',
    '\u0123': 'g',
    '\u01E5': 'g',
    '\u0260': 'g',
    '\uA7A1': 'g',
    '\u1D79': 'g',
    '\uA77F': 'g',
    '\u24D7': 'h',
    '\uFF48': 'h',
    '\u0125': 'h',
    '\u1E23': 'h',
    '\u1E27': 'h',
    '\u021F': 'h',
    '\u1E25': 'h',
    '\u1E29': 'h',
    '\u1E2B': 'h',
    '\u1E96': 'h',
    '\u0127': 'h',
    '\u2C68': 'h',
    '\u2C76': 'h',
    '\u0265': 'h',
    '\u0195': 'hv',
    '\u24D8': 'i',
    '\uFF49': 'i',
    '\u00EC': 'i',
    '\u00ED': 'i',
    '\u00EE': 'i',
    '\u0129': 'i',
    '\u012B': 'i',
    '\u012D': 'i',
    '\u00EF': 'i',
    '\u1E2F': 'i',
    '\u1EC9': 'i',
    '\u01D0': 'i',
    '\u0209': 'i',
    '\u020B': 'i',
    '\u1ECB': 'i',
    '\u012F': 'i',
    '\u1E2D': 'i',
    '\u0268': 'i',
    '\u0131': 'i',
    '\u24D9': 'j',
    '\uFF4A': 'j',
    '\u0135': 'j',
    '\u01F0': 'j',
    '\u0249': 'j',
    '\u24DA': 'k',
    '\uFF4B': 'k',
    '\u1E31': 'k',
    '\u01E9': 'k',
    '\u1E33': 'k',
    '\u0137': 'k',
    '\u1E35': 'k',
    '\u0199': 'k',
    '\u2C6A': 'k',
    '\uA741': 'k',
    '\uA743': 'k',
    '\uA745': 'k',
    '\uA7A3': 'k',
    '\u24DB': 'l',
    '\uFF4C': 'l',
    '\u0140': 'l',
    '\u013A': 'l',
    '\u013E': 'l',
    '\u1E37': 'l',
    '\u1E39': 'l',
    '\u013C': 'l',
    '\u1E3D': 'l',
    '\u1E3B': 'l',
    '\u017F': 'l',
    '\u0142': 'l',
    '\u019A': 'l',
    '\u026B': 'l',
    '\u2C61': 'l',
    '\uA749': 'l',
    '\uA781': 'l',
    '\uA747': 'l',
    '\u01C9': 'lj',
    '\u24DC': 'm',
    '\uFF4D': 'm',
    '\u1E3F': 'm',
    '\u1E41': 'm',
    '\u1E43': 'm',
    '\u0271': 'm',
    '\u026F': 'm',
    '\u24DD': 'n',
    '\uFF4E': 'n',
    '\u01F9': 'n',
    '\u0144': 'n',
    '\u00F1': 'n',
    '\u1E45': 'n',
    '\u0148': 'n',
    '\u1E47': 'n',
    '\u0146': 'n',
    '\u1E4B': 'n',
    '\u1E49': 'n',
    '\u019E': 'n',
    '\u0272': 'n',
    '\u0149': 'n',
    '\uA791': 'n',
    '\uA7A5': 'n',
    '\u01CC': 'nj',
    '\u24DE': 'o',
    '\uFF4F': 'o',
    '\u00F2': 'o',
    '\u00F3': 'o',
    '\u00F4': 'o',
    '\u1ED3': 'o',
    '\u1ED1': 'o',
    '\u1ED7': 'o',
    '\u1ED5': 'o',
    '\u00F5': 'o',
    '\u1E4D': 'o',
    '\u022D': 'o',
    '\u1E4F': 'o',
    '\u014D': 'o',
    '\u1E51': 'o',
    '\u1E53': 'o',
    '\u014F': 'o',
    '\u022F': 'o',
    '\u0231': 'o',
    '\u00F6': 'o',
    '\u022B': 'o',
    '\u1ECF': 'o',
    '\u0151': 'o',
    '\u01D2': 'o',
    '\u020D': 'o',
    '\u020F': 'o',
    '\u01A1': 'o',
    '\u1EDD': 'o',
    '\u1EDB': 'o',
    '\u1EE1': 'o',
    '\u1EDF': 'o',
    '\u1EE3': 'o',
    '\u1ECD': 'o',
    '\u1ED9': 'o',
    '\u01EB': 'o',
    '\u01ED': 'o',
    '\u00F8': 'o',
    '\u01FF': 'o',
    '\u0254': 'o',
    '\uA74B': 'o',
    '\uA74D': 'o',
    '\u0275': 'o',
    '\u01A3': 'oi',
    '\u0223': 'ou',
    '\uA74F': 'oo',
    '\u24DF': 'p',
    '\uFF50': 'p',
    '\u1E55': 'p',
    '\u1E57': 'p',
    '\u01A5': 'p',
    '\u1D7D': 'p',
    '\uA751': 'p',
    '\uA753': 'p',
    '\uA755': 'p',
    '\u24E0': 'q',
    '\uFF51': 'q',
    '\u024B': 'q',
    '\uA757': 'q',
    '\uA759': 'q',
    '\u24E1': 'r',
    '\uFF52': 'r',
    '\u0155': 'r',
    '\u1E59': 'r',
    '\u0159': 'r',
    '\u0211': 'r',
    '\u0213': 'r',
    '\u1E5B': 'r',
    '\u1E5D': 'r',
    '\u0157': 'r',
    '\u1E5F': 'r',
    '\u024D': 'r',
    '\u027D': 'r',
    '\uA75B': 'r',
    '\uA7A7': 'r',
    '\uA783': 'r',
    '\u24E2': 's',
    '\uFF53': 's',
    '\u00DF': 's',
    '\u015B': 's',
    '\u1E65': 's',
    '\u015D': 's',
    '\u1E61': 's',
    '\u0161': 's',
    '\u1E67': 's',
    '\u1E63': 's',
    '\u1E69': 's',
    '\u0219': 's',
    '\u015F': 's',
    '\u023F': 's',
    '\uA7A9': 's',
    '\uA785': 's',
    '\u1E9B': 's',
    '\u24E3': 't',
    '\uFF54': 't',
    '\u1E6B': 't',
    '\u1E97': 't',
    '\u0165': 't',
    '\u1E6D': 't',
    '\u021B': 't',
    '\u0163': 't',
    '\u1E71': 't',
    '\u1E6F': 't',
    '\u0167': 't',
    '\u01AD': 't',
    '\u0288': 't',
    '\u2C66': 't',
    '\uA787': 't',
    '\uA729': 'tz',
    '\u24E4': 'u',
    '\uFF55': 'u',
    '\u00F9': 'u',
    '\u00FA': 'u',
    '\u00FB': 'u',
    '\u0169': 'u',
    '\u1E79': 'u',
    '\u016B': 'u',
    '\u1E7B': 'u',
    '\u016D': 'u',
    '\u00FC': 'u',
    '\u01DC': 'u',
    '\u01D8': 'u',
    '\u01D6': 'u',
    '\u01DA': 'u',
    '\u1EE7': 'u',
    '\u016F': 'u',
    '\u0171': 'u',
    '\u01D4': 'u',
    '\u0215': 'u',
    '\u0217': 'u',
    '\u01B0': 'u',
    '\u1EEB': 'u',
    '\u1EE9': 'u',
    '\u1EEF': 'u',
    '\u1EED': 'u',
    '\u1EF1': 'u',
    '\u1EE5': 'u',
    '\u1E73': 'u',
    '\u0173': 'u',
    '\u1E77': 'u',
    '\u1E75': 'u',
    '\u0289': 'u',
    '\u24E5': 'v',
    '\uFF56': 'v',
    '\u1E7D': 'v',
    '\u1E7F': 'v',
    '\u028B': 'v',
    '\uA75F': 'v',
    '\u028C': 'v',
    '\uA761': 'vy',
    '\u24E6': 'w',
    '\uFF57': 'w',
    '\u1E81': 'w',
    '\u1E83': 'w',
    '\u0175': 'w',
    '\u1E87': 'w',
    '\u1E85': 'w',
    '\u1E98': 'w',
    '\u1E89': 'w',
    '\u2C73': 'w',
    '\u24E7': 'x',
    '\uFF58': 'x',
    '\u1E8B': 'x',
    '\u1E8D': 'x',
    '\u24E8': 'y',
    '\uFF59': 'y',
    '\u1EF3': 'y',
    '\u00FD': 'y',
    '\u0177': 'y',
    '\u1EF9': 'y',
    '\u0233': 'y',
    '\u1E8F': 'y',
    '\u00FF': 'y',
    '\u1EF7': 'y',
    '\u1E99': 'y',
    '\u1EF5': 'y',
    '\u01B4': 'y',
    '\u024F': 'y',
    '\u1EFF': 'y',
    '\u24E9': 'z',
    '\uFF5A': 'z',
    '\u017A': 'z',
    '\u1E91': 'z',
    '\u017C': 'z',
    '\u017E': 'z',
    '\u1E93': 'z',
    '\u1E95': 'z',
    '\u01B6': 'z',
    '\u0225': 'z',
    '\u0240': 'z',
    '\u2C6C': 'z',
    '\uA763': 'z',
    '\u0386': '\u0391',
    '\u0388': '\u0395',
    '\u0389': '\u0397',
    '\u038A': '\u0399',
    '\u03AA': '\u0399',
    '\u038C': '\u039F',
    '\u038E': '\u03A5',
    '\u03AB': '\u03A5',
    '\u038F': '\u03A9',
    '\u03AC': '\u03B1',
    '\u03AD': '\u03B5',
    '\u03AE': '\u03B7',
    '\u03AF': '\u03B9',
    '\u03CA': '\u03B9',
    '\u0390': '\u03B9',
    '\u03CC': '\u03BF',
    '\u03CD': '\u03C5',
    '\u03CB': '\u03C5',
    '\u03B0': '\u03C5',
    '\u03C9': '\u03C9',
    '\u03C2': '\u03C3'
};

var Selectivity = _dereq_(8);
var previousTransform = Selectivity.transformText;

/**
 * Extended version of the transformText() function that simplifies diacritics to their latin1
 * counterparts.
 *
 * Note that if all query functions fetch their results from a remote server, you may not need this
 * function, because it makes sense to remove diacritics server-side in such cases.
 */
Selectivity.transformText = function(string) {
    var result = '';
    for (var i = 0, length = string.length; i < length; i++) {
        var character = string[i];
        result += DIACRITICS[character] || character;
    }
    return previousTransform(result);
};

},{"8":8}],10:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

var debounce = _dereq_(3);

var EventDelegator = _dereq_(2);

var Selectivity = _dereq_(8);

/**
 * selectivity Dropdown Constructor.
 *
 * @param options Options object. Should have the following properties:
 *                selectivity - Selectivity instance to show the dropdown for.
 *                showSearchInput - Boolean whether a search input should be shown.
 */
function SelectivityDropdown(options) {

    var selectivity = options.selectivity;

    this.$el = $(selectivity.template('dropdown', {
        dropdownCssClass: selectivity.options.dropdownCssClass,
        searchInputPlaceholder: selectivity.options.searchInputPlaceholder,
        showSearchInput: options.showSearchInput
    }));

    /**
     * jQuery container to add the results to.
     */
    this.$results = this.$('.selectivity-results-container');

    /**
     * Boolean indicating whether more results are available than currently displayed in the
     * dropdown.
     */
    this.hasMore = false;

    /**
     * The currently highlighted result item.
     */
    this.highlightedResult = null;

    /**
     * Boolean whether the load more link is currently highlighted.
     */
    this.loadMoreHighlighted = false;

    /**
     * Options passed to the dropdown constructor.
     */
    this.options = options;

    /**
     * The results displayed in the dropdown.
     */
    this.results = [];

    /**
     * Selectivity instance.
     */
    this.selectivity = selectivity;

    this._closeProxy = this.close.bind(this);
    if (selectivity.options.closeOnSelect !== false) {
        selectivity.$el.on('selectivity-selecting', this._closeProxy);
    }

    this._lastMousePosition = {};

    this.addToDom();
    this.position();
    this.setupCloseHandler();

    this._suppressMouseWheel();

    if (options.showSearchInput) {
        selectivity.initSearchInput(this.$('.selectivity-search-input'));
        selectivity.focus();
    }

    EventDelegator.call(this);

    this.$results.on('scroll touchmove touchend', debounce(this._scrolled.bind(this), 50));

    this.showLoading();

    setTimeout(this.triggerOpen.bind(this), 1);
}

/**
 * Methods.
 */
$.extend(SelectivityDropdown.prototype, EventDelegator.prototype, {

    /**
     * Convenience shortcut for this.$el.find(selector).
     */
    $: function(selector) {

        return this.$el.find(selector);
    },

    /**
     * Adds the dropdown to the DOM.
     */
    addToDom: function() {

        var $next;
        var $anchor = this.selectivity.$el;
        while (($next = $anchor.next('.selectivity-dropdown')).length) {
            $anchor = $next;
        }
        this.$el.insertAfter($anchor);
    },

    /**
     * Closes the dropdown.
     */
    close: function() {

        if (this.options.showSearchInput) {
            this.selectivity.removeSearchInput();
        }

        this.$el.remove();

        this.removeCloseHandler();

        this.selectivity.$el.off('selectivity-selecting', this._closeProxy);

        this.triggerClose();
    },

    /**
     * Events map.
     *
     * Follows the same format as Backbone: http://backbonejs.org/#View-delegateEvents
     */
    events: {
        'click .selectivity-load-more': '_loadMoreClicked',
        'click .selectivity-result-item': '_resultClicked',
        'mouseenter .selectivity-load-more': '_loadMoreHovered',
        'mouseenter .selectivity-result-item': '_resultHovered',
        'mousemove': '_recordMousePosition'
    },

    /**
     * Highlights a result item.
     *
     * @param item The item to highlight.
     */
    highlight: function(item) {

        if (this.loadMoreHighlighted) {
            this.$('.selectivity-load-more').removeClass('highlight');
        }

        this.$('.selectivity-result-item').removeClass('highlight')
            .filter('[data-item-id=' + Selectivity.quoteCssAttr(item.id) + ']')
            .addClass('highlight');

        this.highlightedResult = item;
        this.loadMoreHighlighted = false;

        this.selectivity.triggerEvent('selectivity-highlight', { item: item, id: item.id });
    },

    /**
     * Highlights the load more link.
     *
     * @param item The item to highlight.
     */
    highlightLoadMore: function() {

        this.$('.selectivity-result-item').removeClass('highlight');

        this.$('.selectivity-load-more').addClass('highlight');

        this.highlightedResult = null;
        this.loadMoreHighlighted = true;
    },

    /**
     * Positions the dropdown inside the DOM.
     */
    position: function() {

        var position = this.options.position;
        if (position) {
            position(this.$el, this.selectivity.$el);
        }

        this._scrolled();
    },

    /**
     * Removes the event handler to close the dropdown.
     */
    removeCloseHandler: function() {

        $('body').off('click', this._closeProxy);
    },

    /**
     * Renders an array of result items.
     *
     * @param items Array of result items.
     *
     * @return HTML-formatted string to display the result items.
     */
    renderItems: function(items) {

        var selectivity = this.selectivity;
        return items.map(function(item) {
            var result = selectivity.template(item.id ? 'resultItem' : 'resultLabel', item);
            if (item.children) {
                result += selectivity.template('resultChildren', {
                    childrenHtml: this.renderItems(item.children)
                });
            }
            return result;
        }, this).join('');
    },

    /**
     * Selects the highlighted item.
     */
    selectHighlight: function() {

        if (this.highlightedResult) {
            this.selectItem(this.highlightedResult.id);
        } else if (this.loadMoreHighlighted) {
            this._loadMoreClicked();
        }
    },

    /**
     * Selects the item with the given ID.
     *
     * @param id ID of the item to select.
     */
    selectItem: function(id) {

        var selectivity = this.selectivity;
        var item = Selectivity.findNestedById(selectivity.results, id);
        if (item) {
            var options = { id: id, item: item };
            if (selectivity.triggerEvent('selectivity-selecting', options)) {
                selectivity.triggerEvent('selectivity-selected', options);
            }
        }
    },

    /**
     * Sets up an event handler that will close the dropdown when the Selectivity control loses
     * focus.
     */
    setupCloseHandler: function() {

        $('body').on('click', this._closeProxy);
    },

    /**
     * Shows an error message.
     *
     * @param message Error message to display.
     * @param options Options object. May contain the following property:
     *                escape - Set to false to disable HTML-escaping of the message. Useful if you
     *                         want to set raw HTML as the message, but may open you up to XSS
     *                         attacks if you're not careful with escaping user input.
     */
    showError: function(message, options) {

        options = options || {};

        this.$results.html(this.selectivity.template('error', {
            escape: options.escape !== false,
            message: message
        }));

        this.hasMore = false;
        this.results = [];

        this.highlightedResult = null;
        this.loadMoreHighlighted = false;

        this.position();
    },

    /**
     * Shows a loading indicator in the dropdown.
     */
    showLoading: function() {

        this.$results.html(this.selectivity.template('loading'));

        this.hasMore = false;
        this.results = [];

        this.highlightedResult = null;
        this.loadMoreHighlighted = false;

        this.position();
    },

    /**
     * Shows the results from a search query.
     *
     * @param results Array of result items.
     * @param options Options object. May contain the following properties:
     *                add - True if the results should be added to any already shown results.
     *                hasMore - Boolean whether more results can be fetched using the query()
     *                          function.
     *                term - The search term for which the results are displayed.
     */
    showResults: function(results, options) {

        var resultsHtml = this.renderItems(results);
        if (options.hasMore) {
            resultsHtml += this.selectivity.template('loadMore');
        } else {
            if (!resultsHtml && !options.add) {
                resultsHtml = this.selectivity.template('noResults', { term: options.term });
            }
        }

        if (options.add) {
            this.$('.selectivity-loading').replaceWith(resultsHtml);

            this.results = this.results.concat(results);
        } else {
            this.$results.html(resultsHtml);

            this.results = results;
        }

        this.hasMore = options.hasMore;

        if (!options.add || this.loadMoreHighlighted) {
            this._highlightFirstItem(results);
        }

        this.position();
    },

    /**
     * Triggers the 'selectivity-close' event.
     */
    triggerClose: function() {

        this.selectivity.$el.trigger('selectivity-close');
    },

    /**
     * Triggers the 'selectivity-open' event.
     */
    triggerOpen: function() {

        this.selectivity.$el.trigger('selectivity-open');
    },

    /**
     * @private
     */
    _highlightFirstItem: function(results) {

        function findFirstItem(results) {
            for (var i = 0, length = results.length; i < length; i++) {
                var result = results[i];
                if (result.id) {
                    return result;
                } else if (result.children) {
                    var item = findFirstItem(result.children);
                    if (item) {
                        return item;
                    }
                }
            }
        }

        var firstItem = findFirstItem(results);
        if (firstItem) {
            this.highlight(firstItem);
        } else {
            this.highlightedResult = null;
            this.loadMoreHighlighted = false;
        }
    },

    /**
     * @private
     */
    _loadMoreClicked: function() {

        this.$('.selectivity-load-more').replaceWith(this.selectivity.template('loading'));

        this.selectivity.loadMore();

        this.selectivity.focus();

        return false;
    },

    /**
     * @private
     */
    _loadMoreHovered: function(event) {

        if (event.screenX === undefined || event.screenX !== this._lastMousePosition.x ||
            event.screenY === undefined || event.screenY !== this._lastMousePosition.y) {
            this.highlightLoadMore();

            this._recordMousePosition(event);
        }
    },

    /**
     * @private
     */
    _recordMousePosition: function(event) {

        this._lastMousePosition = { x: event.screenX, y: event.screenY };
    },

    /**
     * @private
     */
    _resultClicked: function(event) {

        this.selectItem(this.selectivity._getItemId(event));

        return false;
    },

    /**
     * @private
     */
    _resultHovered: function(event) {

        if (event.screenX === undefined || event.screenX !== this._lastMousePosition.x ||
            event.screenY === undefined || event.screenY !== this._lastMousePosition.y) {
            var id = this.selectivity._getItemId(event);
            var item = Selectivity.findNestedById(this.results, id);
            if (item) {
                this.highlight(item);
            }

            this._recordMousePosition(event);
        }
    },

    /**
     * @private
     */
    _scrolled: function() {

        var $loadMore = this.$('.selectivity-load-more');
        if ($loadMore.length) {
            if ($loadMore[0].offsetTop - this.$results[0].scrollTop < this.$el.height()) {
                this._loadMoreClicked();
            }
        }
    },

    /**
     * @private
     */
    _suppressMouseWheel: function() {

        var suppressMouseWheelSelector = this.selectivity.options.suppressMouseWheelSelector;
        if (suppressMouseWheelSelector === null) {
            return;
        }

        var selector = suppressMouseWheelSelector || '.selectivity-results-container';
        this.$el.on('DOMMouseScroll mousewheel', selector, function(event) {

            // Thanks to Troy Alford:
            // http://stackoverflow.com/questions/5802467/prevent-scrolling-of-parent-element

            var $el = $(this),
                scrollTop = this.scrollTop,
                scrollHeight = this.scrollHeight,
                height = $el.height(),
                originalEvent = event.originalEvent,
                delta = (event.type === 'DOMMouseScroll' ? originalEvent.detail * -40
                                                         : originalEvent.wheelDelta),
                up = delta > 0;

            function prevent() {
                event.stopPropagation();
                event.preventDefault();
                event.returnValue = false;
                return false;
            }

            if (scrollHeight > height) {
                if (!up && -delta > scrollHeight - height - scrollTop) {
                    // Scrolling down, but this will take us past the bottom.
                    $el.scrollTop(scrollHeight);
                    return prevent();
                } else if (up && delta > scrollTop) {
                    // Scrolling up, but this will take us past the top.
                    $el.scrollTop(0);
                    return prevent();
                }
            }
        });
    }

});

module.exports = Selectivity.Dropdown = SelectivityDropdown;

},{"2":2,"3":3,"8":8,"jquery":"jquery"}],11:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

var Selectivity = _dereq_(8);
var MultipleSelectivity = _dereq_(14);

function isValidEmail(email) {

    var atIndex = email.indexOf('@');
    var dotIndex = email.lastIndexOf('.');
    var spaceIndex = email.indexOf(' ');
    return (atIndex > 0 && dotIndex > atIndex + 1 &&
            dotIndex < email.length - 2 && spaceIndex === -1);
}

function lastWord(token, length) {

    length = (length === undefined ? token.length : length);
    for (var i = length - 1; i >= 0; i--) {
        if ((/\s/).test(token[i])) {
            return token.slice(i + 1, length);
        }
    }
    return token.slice(0, length);
}

function stripEnclosure(token, enclosure) {

    if (token.slice(0, 1) === enclosure[0] && token.slice(-1) === enclosure[1]) {
        return token.slice(1, -1).trim();
    } else {
        return token.trim();
    }
}

function createEmailItem(token) {

    var email = lastWord(token);
    var name = token.slice(0, -email.length).trim();
    if (isValidEmail(email)) {
        email = stripEnclosure(stripEnclosure(email, '()'), '<>');
        name = stripEnclosure(name, '""').trim() || email;
        return { id: email, text: name };
    } else {
        return (token.trim() ? { id: token, text: token } : null);
    }
}

function emailTokenizer(input, selection, createToken) {

    function hasToken(input) {
        if (input) {
            for (var i = 0, length = input.length; i < length; i++) {
                switch (input[i]) {
                case ';':
                case ',':
                case '\n':
                    return true;
                case ' ':
                case '\t':
                    if (isValidEmail(lastWord(input, i))) {
                        return true;
                    }
                    break;
                case '"':
                    do { i++; } while(i < length && input[i] !== '"');
                    break;
                default:
                    continue;
                }
            }
        }
        return false;
    }

    function takeToken(input) {
        for (var i = 0, length = input.length; i < length; i++) {
            switch (input[i]) {
            case ';':
            case ',':
            case '\n':
                return { term: input.slice(0, i), input: input.slice(i + 1) };
            case ' ':
            case '\t':
                if (isValidEmail(lastWord(input, i))) {
                    return { term: input.slice(0, i), input: input.slice(i + 1) };
                }
                break;
            case '"':
                do { i++; } while(i < length && input[i] !== '"');
                break;
            default:
                continue;
            }
        }
        return {};
    }

    while (hasToken(input)) {
        var token = takeToken(input);
        if (token.term) {
            var item = createEmailItem(token.term);
            if (item && !(item.id && Selectivity.findById(selection, item.id))) {
                createToken(item);
            }
        }
        input = token.input;
    }

    return input;
}

/**
 * Emailselectivity Constructor.
 *
 * @param options Options object. Accepts all options from the MultipleSelectivity Constructor.
 */
function Emailselectivity(options) {

    MultipleSelectivity.call(this, options);
}

/**
 * Methods.
 */
var callSuper = Selectivity.inherits(Emailselectivity, MultipleSelectivity, {

    /**
     * @inherit
     */
    initSearchInput: function($input) {

        callSuper(this, 'initSearchInput', $input);

        $input.on('blur', function() {
            var term = $input.val();
            if (isValidEmail(lastWord(term))) {
                this.add(createEmailItem(term));
            }
        }.bind(this));
    },

    /**
     * @inherit
     *
     * Note that for the Email input type the option showDropdown is set to false and the tokenizer
     * option is set to a tokenizer specialized for email addresses.
     */
    setOptions: function(options) {

        options = $.extend({
            createTokenItem: createEmailItem,
            showDropdown: false,
            tokenizer: emailTokenizer
        }, options);

        callSuper(this, 'setOptions', options);
    }

});

module.exports = Selectivity.InputTypes.Email = Emailselectivity;

},{"14":14,"8":8,"jquery":"jquery"}],12:[function(_dereq_,module,exports){
'use strict';

var Selectivity = _dereq_(8);

var KEY_BACKSPACE = 8;
var KEY_DOWN_ARROW = 40;
var KEY_ENTER = 13;
var KEY_ESCAPE = 27;
var KEY_TAB = 9;
var KEY_UP_ARROW = 38;

/**
 * Search input listener providing keyboard support for navigating the dropdown.
 */
function listener(selectivity, $input) {

    var keydownCanceled = false;
    var closeSubmenu = null;

    /**
     * Moves a dropdown's highlight to the next or previous result item.
     *
     * @param delta Either 1 to move to the next item, or -1 to move to the previous item.
     */
    function moveHighlight(dropdown, delta) {

        function findElementIndex($elements, selector) {
            for (var i = 0, length = $elements.length; i < length; i++) {
                if ($elements.eq(i).is(selector)) {
                    return i;
                }
            }
            return -1;
        }

        function scrollToHighlight() {
            var $el;
            if (dropdown.highlightedResult) {
                var quotedId = Selectivity.quoteCssAttr(dropdown.highlightedResult.id);
                $el = dropdown.$('.selectivity-result-item[data-item-id=' + quotedId + ']');
            } else if (dropdown.loadMoreHighlighted) {
                $el = dropdown.$('.selectivity-load-more');
            } else {
                return; // no highlight to scroll to
            }

            var position = $el.position();
            if (!position) {
                return;
            }

            var top = position.top;
            var elHeight = $el.height();
            var resultsHeight = dropdown.$results.height();
            if (top < 0 || top > resultsHeight - elHeight) {
                top += dropdown.$results.scrollTop();
                dropdown.$results.scrollTop(delta < 0 ? top : top - resultsHeight + elHeight);
            }
        }

        if (dropdown.submenu) {
            moveHighlight(dropdown.submenu, delta);
            return;
        }

        var results = dropdown.results;
        if (results.length) {
            var $results = dropdown.$('.selectivity-result-item');
            var defaultIndex = (delta > 0 ? 0 : $results.length - 1);
            var index = defaultIndex;
            var highlightedResult = dropdown.highlightedResult;
            if (highlightedResult) {
                var quotedId = Selectivity.quoteCssAttr(highlightedResult.id);
                index = findElementIndex($results, '[data-item-id=' + quotedId + ']') + delta;
                if (delta > 0 ? index >= $results.length : index < 0) {
                    if (dropdown.hasMore) {
                        dropdown.highlightLoadMore();
                        scrollToHighlight();
                        return;
                    } else {
                        index = defaultIndex;
                    }
                }
            }

            var result = Selectivity.findNestedById(results,
                                                    selectivity._getItemId($results[index]));
            if (result) {
                dropdown.highlight(result, { delay: !!result.submenu });
                scrollToHighlight();
            }
        }
    }

    function keyHeld(event) {

        var dropdown = selectivity.dropdown;
        if (dropdown) {
            if (event.keyCode === KEY_BACKSPACE) {
                if (!$input.val()) {
                    if (dropdown.submenu) {
                        var submenu = dropdown.submenu;
                        while (submenu.submenu) {
                            submenu = submenu.submenu;
                        }
                        closeSubmenu = submenu;
                    }

                    event.preventDefault();
                    keydownCanceled = true;
                }
            } else if (event.keyCode === KEY_DOWN_ARROW) {
                moveHighlight(dropdown, 1);
            } else if (event.keyCode === KEY_UP_ARROW) {
                moveHighlight(dropdown, -1);
            } else if (event.keyCode === KEY_TAB) {
                setTimeout(function() {
                    selectivity.close({ keepFocus: false });
                }, 1);
            }
        }
    }

    function keyReleased(event) {

        function open() {
            if (selectivity.options.showDropdown !== false) {
                selectivity.open();
            }
        }

        var dropdown = selectivity.dropdown;
        if (keydownCanceled) {
            event.preventDefault();
            keydownCanceled = false;

            if (closeSubmenu) {
                closeSubmenu.close();
                selectivity.focus();
                closeSubmenu = null;
            }
        } else if (event.keyCode === KEY_BACKSPACE) {
            if (!dropdown && selectivity.options.allowClear) {
                selectivity.clear();
            }
        } else if (event.keyCode === KEY_ENTER && !event.ctrlKey) {
            if (dropdown) {
                dropdown.selectHighlight();
            } else if (selectivity.options.showDropdown !== false) {
                open();
            }

            event.preventDefault();
        } else if (event.keyCode === KEY_ESCAPE) {
            selectivity.close();

            event.preventDefault();
        } else if (event.keyCode === KEY_DOWN_ARROW || event.keyCode === KEY_UP_ARROW) {
            // handled in keyHeld() because the response feels faster and it works with repeated
            // events if the user holds the key for a longer period
            // still, we issue an open() call here in case the dropdown was not yet open...
            open();

            event.preventDefault();
        } else {
            open();
        }
    }

    $input.on('keydown', keyHeld).on('keyup', keyReleased);
}

Selectivity.SearchInputListeners.push(listener);

},{"8":8}],13:[function(_dereq_,module,exports){
'use strict';

var escape = _dereq_(4);
var Selectivity = _dereq_(8);

/**
 * Localizable elements of the Selectivity Templates.
 *
 * Be aware that these strings are added straight to the HTML output of the templates, so any
 * non-safe strings should be escaped.
 */
Selectivity.Locale = {

    ajaxError: function(term) { return 'Failed to fetch results for <b>' + escape(term) + '</b>'; },
    loading: 'Loading...',
    loadMore: 'Load more...',
    needMoreCharacters: function(numCharacters) {
        return 'Enter ' + numCharacters + ' more characters to search';
    },
    noResults: 'No results found',
    noResultsForTerm: function(term) { return 'No results for <b>' + escape(term) + '</b>'; }

};

},{"4":4,"8":8}],14:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

var Selectivity = _dereq_(8);

var KEY_BACKSPACE = 8;
var KEY_DELETE = 46;
var KEY_ENTER = 13;

/**
 * MultipleSelectivity Constructor.
 *
 * @param options Options object. Accepts all options from the Selectivity Base Constructor in
 *                addition to those accepted by MultipleSelectivity.setOptions().
 */
function MultipleSelectivity(options) {

    Selectivity.call(this, options);

    this.$el.html(this.template('multipleSelectInput', { enabled: this.enabled }))
            .trigger('selectivity-init', 'multiple');

    this._highlightedItemId = null;

    this.initSearchInput(this.$('.selectivity-multiple-input:not(.selectivity-width-detector)'));

    this._rerenderSelection();

    if (!options.positionDropdown) {
        // dropdowns for multiple-value inputs should open below the select box,
        // unless there is not enough space below, but there is space enough above, then it should
        // open upwards
        this.options.positionDropdown = function($el, $selectEl) {
            var position = $selectEl.position(),
                dropdownHeight = $el.height(),
                selectHeight = $selectEl.height(),
                top = $selectEl[0].getBoundingClientRect().top,
                bottom = top + selectHeight + dropdownHeight,
                openUpwards = (typeof window !== 'undefined' && bottom > $(window).height() &&
                               top - dropdownHeight > 0);

            var width = $selectEl.outerWidth ? $selectEl.outerWidth() : $selectEl.width();
            $el.css({
                left: position.left + 'px',
                top: position.top + (openUpwards ? -dropdownHeight : selectHeight) + 'px'
            }).width(width);
        };
    }
}

/**
 * Methods.
 */
var callSuper = Selectivity.inherits(MultipleSelectivity, {

    /**
     * Adds an item to the selection, if it's not selected yet.
     *
     * @param item The item to add. May be an item with 'id' and 'text' properties or just an ID.
     */
    add: function(item) {

        var itemIsId = Selectivity.isValidId(item);
        var id = (itemIsId ? item : this.validateItem(item) && item.id);

        if (this._value.indexOf(id) === -1) {
            this._value.push(id);

            if (itemIsId && this.options.initSelection) {
                this.options.initSelection([id], function(data) {
                    if (this._value.indexOf(id) > -1) {
                        item = this.validateItem(data[0]);
                        this._data.push(item);

                        this.triggerChange({ added: item });
                    }
                }.bind(this));
            } else {
                if (itemIsId) {
                    item = this.getItemForId(id);
                }
                this._data.push(item);

                this.triggerChange({ added: item });
            }
        }

        this.$searchInput.val('');
    },

    /**
     * Clears the data and value.
     */
    clear: function() {

        this.data([]);
    },

    /**
     * Events map.
     *
     * Follows the same format as Backbone: http://backbonejs.org/#View-delegateEvents
     */
    events: {
        'change': '_rerenderSelection',
        'change .selectivity-multiple-input': function() { return false; },
        'click': '_clicked',
        'click .selectivity-multiple-selected-item': '_itemClicked',
        'keydown .selectivity-multiple-input': '_keyHeld',
        'keyup .selectivity-multiple-input': '_keyReleased',
        'paste .selectivity-multiple-input': '_onPaste',
        'selectivity-selected': '_resultSelected'
    },

    /**
     * @inherit
     */
    filterResults: function(results) {

        return results.filter(function(item) {
            return !Selectivity.findById(this._data, item.id);
        }, this);
    },

    /**
     * Returns the correct data for a given value.
     *
     * @param value The value to get the data for. Should be an array of IDs.
     *
     * @return The corresponding data. Will be an array of objects with 'id' and 'text' properties.
     *         Note that if no items are defined, this method assumes the text labels will be equal
     *         to the IDs.
     */
    getDataForValue: function(value) {

        return value.map(this.getItemForId.bind(this)).filter(function(item) { return !!item; });
    },

    /**
     * Returns the correct value for the given data.
     *
     * @param data The data to get the value for. Should be an array of objects with 'id' and 'text'
     *             properties.
     *
     * @return The corresponding value. Will be an array of IDs.
     */
    getValueForData: function(data) {

        return data.map(function(item) { return item.id; });
    },

    /**
     * Removes an item from the selection, if it is selected.
     *
     * @param item The item to remove. May be an item with 'id' and 'text' properties or just an ID.
     */
    remove: function(item) {

        var id = ($.type(item) === 'object' ? item.id : item);

        var removedItem;
        var index = Selectivity.findIndexById(this._data, id);
        if (index > -1) {
            removedItem = this._data[index];
            this._data.splice(index, 1);
        }

        if (this._value[index] !== id) {
            index = this._value.indexOf(id);
        }
        if (index > -1) {
            this._value.splice(index, 1);
        }

        if (removedItem) {
            this.triggerChange({ removed: removedItem });
        }

        if (id === this._highlightedItemId) {
            this._highlightedItemId = null;
        }
    },

    /**
     * @inherit
     */
    search: function() {

        var term = this.$searchInput.val();

        if (this.options.tokenizer) {
            term = this.options.tokenizer(term, this._data, this.add.bind(this), this.options);

            if ($.type(term) === 'string') {
                this.$searchInput.val(term);
            } else {
                term = '';
            }
        }

        if (this.dropdown) {
            callSuper(this, 'search');
        }
    },

    /**
     * @inherit
     *
     * @param options Options object. In addition to the options supported in the base
     *                implementation, this may contain the following properties:
     *                backspaceHighlightsBeforeDelete - If set to true, when the user enters a
     *                                                  backspace while there is no text in the
     *                                                  search field but there are selected items,
     *                                                  the last selected item will be highlighted
     *                                                  and when a second backspace is entered the
     *                                                  item is deleted. If false, the item gets
     *                                                  deleted on the first backspace. The default
     *                                                  value is true on devices that have touch
     *                                                  input and false on devices that don't.
     *                createTokenItem - Function to create a new item from a user's search term.
     *                                  This is used to turn the term into an item when dropdowns
     *                                  are disabled and the user presses Enter. It is also used by
     *                                  the default tokenizer to create items for individual tokens.
     *                                  The function receives a 'token' parameter which is the
     *                                  search term (or part of a search term) to create an item for
     *                                  and must return an item object with 'id' and 'text'
     *                                  properties or null if no token can be created from the term.
     *                                  The default is a function that returns an item where the id
     *                                  and text both match the token for any non-empty string and
     *                                  which returns null otherwise.
     *                tokenizer - Function for tokenizing search terms. Will receive the following
     *                            parameters:
     *                            input - The input string to tokenize.
     *                            selection - The current selection data.
     *                            createToken - Callback to create a token from the search terms.
     *                                          Should be passed an item object with 'id' and 'text'
     *                                          properties.
     *                            options - The options set on the Selectivity instance.
     *                            Any string returned by the tokenizer function is treated as the
     *                            remainder of untokenized input.
     */
    setOptions: function(options) {

        options = options || {};

        var backspaceHighlightsBeforeDelete = 'backspaceHighlightsBeforeDelete';
        if (options[backspaceHighlightsBeforeDelete] === undefined) {
            options[backspaceHighlightsBeforeDelete] = this.hasTouch;
        }

        options.allowedTypes = options.allowedTypes || {};
        options.allowedTypes[backspaceHighlightsBeforeDelete] = 'boolean';

        callSuper(this, 'setOptions', options);
    },

    /**
     * Validates data to set. Throws an exception if the data is invalid.
     *
     * @param data The data to validate. Should be an array of objects with 'id' and 'text'
     *             properties.
     *
     * @return The validated data. This may differ from the input data.
     */
    validateData: function(data) {

        if (data === null) {
            return [];
        } else if ($.type(data) === 'array') {
            return data.map(this.validateItem.bind(this));
        } else {
            throw new Error('Data for MultiSelectivity instance should be array');
        }
    },

    /**
     * Validates a value to set. Throws an exception if the value is invalid.
     *
     * @param value The value to validate. Should be an array of IDs.
     *
     * @return The validated value. This may differ from the input value.
     */
    validateValue: function(value) {

        if (value === null) {
            return [];
        } else if ($.type(value) === 'array') {
            if (value.every(Selectivity.isValidId)) {
                return value;
            } else {
                throw new Error('Value contains invalid IDs');
            }
        } else {
            throw new Error('Value for MultiSelectivity instance should be an array');
        }
    },

    /**
     * @private
     */
    _backspacePressed: function() {

        if (this.options.backspaceHighlightsBeforeDelete) {
            if (this._highlightedItemId) {
                this._deletePressed();
            } else if (this._value.length) {
                this._highlightItem(this._value.slice(-1)[0]);
            }
        } else if (this._value.length) {
            this.remove(this._value.slice(-1)[0]);
        }
    },

    /**
     * @private
     */
    _clicked: function() {

        if (this.enabled) {
            this.focus();

            this._open();

            return false;
        }
    },

    /**
     * @private
     */
    _createToken: function() {

        var term = this.$searchInput.val();
        var createTokenItem = this.options.createTokenItem;

        if (term && createTokenItem) {
            var item = createTokenItem(term);
            if (item) {
                this.add(item);
            }
        }
    },

    /**
     * @private
     */
    _deletePressed: function() {

        if (this._highlightedItemId) {
            this.remove(this._highlightedItemId);
        }
    },

    /**
     * @private
     */
    _highlightItem: function(id) {

        this._highlightedItemId = id;
        this.$('.selectivity-multiple-selected-item').removeClass('highlighted')
            .filter('[data-item-id=' + Selectivity.quoteCssAttr(id) + ']').addClass('highlighted');

        if (this.hasKeyboard) {
            this.focus();
        }
    },

    /**
     * @private
     */
    _itemClicked: function(event) {

        if (this.enabled) {
            this._highlightItem(this._getItemId(event));
        }
    },

    /**
     * @private
     */
    _itemRemoveClicked: function(event) {

        this.remove(this._getItemId(event));

        this._updateInputWidth();

        return false;
    },

    /**
     * @private
     */
    _keyHeld: function(event) {

        this._originalValue = this.$searchInput.val();

        if (event.keyCode === KEY_ENTER && !event.ctrlKey) {
            event.preventDefault();
        }
    },

    /**
     * @private
     */
    _keyReleased: function(event) {

        var inputHadText = !!this._originalValue;

        if (event.keyCode === KEY_ENTER && !event.ctrlKey) {
            if (this.options.createTokenItem) {
                this._createToken();
            }
        } else if (event.keyCode === KEY_BACKSPACE && !inputHadText) {
            this._backspacePressed();
        } else if (event.keyCode === KEY_DELETE && !inputHadText) {
            this._deletePressed();
        }

        this._updateInputWidth();
    },

    /**
     * @private
     */
    _onPaste: function() {

        setTimeout(function() {
            this.search();

            if (this.options.createTokenItem) {
                this._createToken();
            }
        }.bind(this), 10);
    },

    /**
     * @private
     */
    _open: function() {

        if (this.options.showDropdown !== false) {
            this.open();
        }
    },

    _renderSelectedItem: function(item) {

        this.$searchInput.before(this.template('multipleSelectedItem', $.extend({
            highlighted: (item.id === this._highlightedItemId),
            removable: !this.options.readOnly
        }, item)));

        var quotedId = Selectivity.quoteCssAttr(item.id);
        this.$('.selectivity-multiple-selected-item[data-item-id=' + quotedId + ']')
            .find('.selectivity-multiple-selected-item-remove')
            .on('click', this._itemRemoveClicked.bind(this));
    },

    /**
     * @private
     */
    _rerenderSelection: function(event) {

        event = event || {};

        if (event.added) {
            this._renderSelectedItem(event.added);

            this._scrollToBottom();
        } else if (event.removed) {
            var quotedId = Selectivity.quoteCssAttr(event.removed.id);
            this.$('.selectivity-multiple-selected-item[data-item-id=' + quotedId + ']').remove();
        } else {
            this.$('.selectivity-multiple-selected-item').remove();

            this._data.forEach(this._renderSelectedItem, this);

            this._updateInputWidth();
        }

        if (event.added || event.removed) {
            if (this.dropdown) {
                this.dropdown.showResults(this.filterResults(this.results), {
                    hasMore: this.dropdown.hasMore
                });
            }

            if (this.hasKeyboard) {
                this.focus();
            }
        }

        this.positionDropdown();

        this._updatePlaceholder();
    },

    /**
     * @private
     */
    _resultSelected: function(event) {

        if (this._value.indexOf(event.id) === -1) {
            this.add(event.item);
        } else {
            this.remove(event.item);
        }
    },

    /**
     * @private
     */
    _scrollToBottom: function() {

        var $inputContainer = this.$('.selectivity-multiple-input-container');
        $inputContainer.scrollTop($inputContainer.height());
    },

    /**
     * @private
     */
    _updateInputWidth: function() {

        if (this.enabled) {
            var $input = this.$searchInput, $widthDetector = this.$('.selectivity-width-detector');
            $widthDetector.text($input.val() ||
                                !this._data.length && this.options.placeholder ||
                                '');
            $input.width($widthDetector.width() + 20);

            this.positionDropdown();
        }
    },

    /**
     * @private
     */
    _updatePlaceholder: function() {

        var placeholder = this._data.length ? '' : this.options.placeholder;
        if (this.enabled) {
            this.$searchInput.attr('placeholder', placeholder);
        } else {
            this.$('.selectivity-placeholder').text(placeholder);
        }
    }

});

module.exports = Selectivity.InputTypes.Multiple = MultipleSelectivity;

},{"8":8,"jquery":"jquery"}],15:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

var Selectivity = _dereq_(8);

/**
 * SingleSelectivity Constructor.
 *
 * @param options Options object. Accepts all options from the Selectivity Base Constructor in
 *                addition to those accepted by SingleSelectivity.setOptions().
 */
function SingleSelectivity(options) {

    Selectivity.call(this, options);

    this.$el.html(this.template('singleSelectInput', this.options))
            .trigger('selectivity-init', 'single');

    this._rerenderSelection();

    if (!options.positionDropdown) {
        // dropdowns for single-value inputs should open below the select box,
        // unless there is not enough space below, in which case the dropdown should be moved up
        // just enough so it fits in the window, but never so much that it reaches above the top
        this.options.positionDropdown = function($el, $selectEl) {
            var position = $selectEl.position(),
                dropdownHeight = $el.height(),
                selectHeight = $selectEl.height(),
                top = $selectEl[0].getBoundingClientRect().top,
                bottom = top + selectHeight + dropdownHeight,
                deltaUp = 0;

            if (typeof window !== 'undefined') {
                deltaUp = Math.min(Math.max(bottom - $(window).height(), 0), top + selectHeight);
            }

            var width = $selectEl.outerWidth ? $selectEl.outerWidth() : $selectEl.width();
            $el.css({
                left: position.left + 'px',
                top: (position.top + selectHeight - deltaUp) + 'px'
            }).width(width);
        };
    }

    if (options.showSearchInputInDropdown === false) {
        this.initSearchInput(this.$('.selectivity-single-select-input'), { noSearch: true });
    }
}

/**
 * Methods.
 */
var callSuper = Selectivity.inherits(SingleSelectivity, {

    /**
     * Events map.
     *
     * Follows the same format as Backbone: http://backbonejs.org/#View-delegateEvents
     */
    events: {
        'change': '_rerenderSelection',
        'click': '_clicked',
        'focus .selectivity-single-select-input': '_focused',
        'selectivity-selected': '_resultSelected'
    },

    /**
     * Clears the data and value.
     */
    clear: function() {

        this.data(null);
    },

    /**
     * @inherit
     *
     * @param options Optional options object. May contain the following property:
     *                keepFocus - If false, the focus won't remain on the input.
     */
    close: function(options) {

        this._closing = true;

        callSuper(this, 'close');

        var $input = this.$('.selectivity-single-select-input');
        if (!this.$searchInput) {
            this.initSearchInput($input, { noSearch: true });
        }

        if (!options || options.keepFocus !== false) {
            $input.focus();
        }

        this._closing = false;
    },

    /**
     * Returns the correct data for a given value.
     *
     * @param value The value to get the data for. Should be an ID.
     *
     * @return The corresponding data. Will be an object with 'id' and 'text' properties. Note that
     *         if no items are defined, this method assumes the text label will be equal to the ID.
     */
    getDataForValue: function(value) {

        return this.getItemForId(value);
    },

    /**
     * Returns the correct value for the given data.
     *
     * @param data The data to get the value for. Should be an object with 'id' and 'text'
     *             properties or null.
     *
     * @return The corresponding value. Will be an ID or null.
     */
    getValueForData: function(data) {

        return (data ? data.id : null);
    },

    /**
     * @inherit
     */
    open: function(options) {

        var showSearchInput = (this.options.showSearchInputInDropdown !== false);

        callSuper(this, 'open', $.extend({ showSearchInput: showSearchInput }, options));

        if (!showSearchInput) {
            this.focus();
        }
    },

    /**
     * @inherit
     *
     * @param options Options object. In addition to the options supported in the base
     *                implementation, this may contain the following properties:
     *                allowClear - Boolean whether the selected item may be removed.
     *                showSearchInputInDropdown - Set to false to remove the search input used in
     *                                            dropdowns. The default is true.
     */
    setOptions: function(options) {

        options = options || {};

        options.allowedTypes = $.extend(options.allowedTypes || {}, {
            allowClear: 'boolean',
            showSearchInputInDropdown: 'boolean'
        });

        callSuper(this, 'setOptions', options);
    },

    /**
     * Validates data to set. Throws an exception if the data is invalid.
     *
     * @param data The data to validate. Should be an object with 'id' and 'text' properties or null
     *             to indicate no item is selected.
     *
     * @return The validated data. This may differ from the input data.
     */
    validateData: function(data) {

        return (data === null ? data : this.validateItem(data));
    },

    /**
     * Validates a value to set. Throws an exception if the value is invalid.
     *
     * @param value The value to validate. Should be null or a valid ID.
     *
     * @return The validated value. This may differ from the input value.
     */
    validateValue: function(value) {

        if (value === null || Selectivity.isValidId(value)) {
            return value;
        } else {
            throw new Error('Value for SingleSelectivity instance should be a valid ID or null');
        }
    },

    /**
     * @private
     */
    _clicked: function() {

        if (this.enabled) {
            if (this.dropdown) {
                this.close();
            } else if (this.options.showDropdown !== false) {
                this.open();
            }

            return false;
        }
    },

    /**
     * @private
     */
    _focused: function() {

        if (this.enabled && !this._closing && this.options.showDropdown !== false) {
            this.open();
        }
    },

    /**
     * @private
     */
    _itemRemoveClicked: function() {

        this.data(null);

        return false;
    },

    /**
     * @private
     */
    _rerenderSelection: function() {

        var $container = this.$('.selectivity-single-result-container');
        if (this._data) {
            $container.html(
                this.template('singleSelectedItem', $.extend({
                    removable: this.options.allowClear && !this.options.readOnly
                }, this._data))
            );

            $container.find('.selectivity-single-selected-item-remove')
                      .on('click', this._itemRemoveClicked.bind(this));
        } else {
            $container.html(
                this.template('singleSelectPlaceholder', { placeholder: this.options.placeholder })
            );
        }
    },

    /**
     * @private
     */
    _resultSelected: function(event) {

        this.data(event.item);

        this.close();
    }

});

module.exports = Selectivity.InputTypes.Single = SingleSelectivity;

},{"8":8,"jquery":"jquery"}],16:[function(_dereq_,module,exports){
'use strict';

var Selectivity = _dereq_(8);
var SelectivityDropdown = _dereq_(10);

/**
 * Extended dropdown that supports submenus.
 */
function SelectivitySubmenu(options) {

    /**
     * Optional parent dropdown menu from which this dropdown was opened.
     */
    this.parentMenu = options.parentMenu;

    SelectivityDropdown.call(this, options);

    this._closeSubmenuTimeout = 0;

    this._openSubmenuTimeout = 0;
}

var callSuper = Selectivity.inherits(SelectivitySubmenu, SelectivityDropdown, {

    /**
     * @inherit
     */
    close: function() {

        if (this.options.restoreOptions) {
            this.selectivity.setOptions(this.options.restoreOptions);
        }
        if (this.options.restoreResults) {
            this.selectivity.results = this.options.restoreResults;
        }

        if (this.submenu) {
            this.submenu.close();
        }

        callSuper(this, 'close');

        if (this.parentMenu) {
            this.parentMenu.submenu = null;
            this.parentMenu = null;
        }

        clearTimeout(this._closeSubmenuTimeout);
        clearTimeout(this._openSubmenuTimeout);
    },

    /**
     * @inherit
     *
     * @param options Optional options object. May contain the following property:
     *                delay - If true, indicates any submenu should not be opened until after some
     *                        delay.
     */
    highlight: function(item, options) {

        if (options && options.delay) {
            callSuper(this, 'highlight', item);

            clearTimeout(this._openSubmenuTimeout);
            this._openSubmenuTimeout = setTimeout(this._doHighlight.bind(this, item), 300);
        } else if (this.submenu) {
            if (this.highlightedResult && this.highlightedResult.id === item.id) {
                this._doHighlight(item);
            } else {
                clearTimeout(this._closeSubmenuTimeout);
                this._closeSubmenuTimeout = setTimeout(
                    this._closeSubmenuAndHighlight.bind(this, item), 100
                );
            }
        } else {
            if (this.parentMenu && this.parentMenu._closeSubmenuTimeout) {
                clearTimeout(this.parentMenu._closeSubmenuTimeout);
                this.parentMenu._closeSubmenuTimeout = 0;
            }

            this._doHighlight(item);
        }
    },

    /**
     * @inherit
     */
    selectHighlight: function() {

        if (this.submenu) {
            this.submenu.selectHighlight();
        } else {
            callSuper(this, 'selectHighlight');
        }
    },

    /**
     * @inherit
     */
    selectItem: function(id) {

        var selectivity = this.selectivity;
        var item = Selectivity.findNestedById(selectivity.results, id);
        if (item && !item.submenu) {
            var options = { id: id, item: item };
            if (selectivity.triggerEvent('selectivity-selecting', options)) {
                selectivity.triggerEvent('selectivity-selected', options);
            }
        }
    },

    /**
     * @inherit
     */
    showResults: function(results, options) {

        if (this.submenu) {
            this.submenu.showResults(results, options);
        } else {
            callSuper(this, 'showResults', results, options);
        }
    },

    /**
     * @inherit
     */
    triggerClose: function() {

        if (this.parentMenu) {
            this.selectivity.$el.trigger('selectivity-close-submenu');
        } else {
            callSuper(this, 'triggerClose');
        }
    },

    /**
     * @inherit
     */
    triggerOpen: function() {

        if (this.parentMenu) {
            this.selectivity.$el.trigger('selectivity-open-submenu');
        } else {
            callSuper(this, 'triggerOpen');
        }
    },

    /**
     * @private
     */
    _closeSubmenuAndHighlight: function(item) {

        if (this.submenu) {
            this.submenu.close();
        }

        this._doHighlight(item);
    },

    /**
     * @private
     */
    _doHighlight: function(item) {

        callSuper(this, 'highlight', item);

        if (item.submenu && !this.submenu) {
            var selectivity = this.selectivity;
            var Dropdown = selectivity.options.dropdown || Selectivity.Dropdown;
            if (Dropdown) {
                var quotedId = Selectivity.quoteCssAttr(item.id);
                var $item = this.$('.selectivity-result-item[data-item-id=' + quotedId + ']');
                var $dropdownEl = this.$el;

                this.submenu = new Dropdown({
                    parentMenu: this,
                    position: item.submenu.positionDropdown || function($el) {
                        var dropdownPosition = $dropdownEl.position();
                        var width = $dropdownEl.width();
                        $el.css({
                            left: dropdownPosition.left + width + 'px',
                            top: $item.position().top + dropdownPosition.top + 'px'
                        }).width(width);
                    },
                    restoreOptions: {
                        items: selectivity.items,
                        query: selectivity.options.query || null
                    },
                    restoreResults: selectivity.results,
                    selectivity: selectivity,
                    showSearchInput: item.submenu.showSearchInput
                });

                selectivity.setOptions({
                    items: item.submenu.items || null,
                    query: item.submenu.query || null
                });

                selectivity.search('');
            }
        }
    }

});

Selectivity.Dropdown = SelectivitySubmenu;

Selectivity.findNestedById = function(array, id) {

    for (var i = 0, length = array.length; i < length; i++) {
        var item = array[i], result;
        if (item.id === id) {
            result = item;
        } else if (item.children) {
            result = Selectivity.findNestedById(item.children, id);
        } else if (item.submenu && item.submenu.items) {
            result = Selectivity.findNestedById(item.submenu.items, id);
        }
        if (result) {
            return result;
        }
    }
    return null;
};

module.exports = SelectivitySubmenu;

},{"10":10,"8":8}],17:[function(_dereq_,module,exports){
'use strict';

var escape = _dereq_(4);

var Selectivity = _dereq_(8);

_dereq_(13);

/**
 * Default set of templates to use with Selectivity.js.
 *
 * Note that every template can be defined as either a string, a function returning a string (like
 * Handlebars templates, for instance) or as an object containing a render function (like Hogan.js
 * templates, for instance).
 */
Selectivity.Templates = {

    /**
     * Renders the dropdown.
     *
     * The template is expected to have at least one element with the class
     * 'selectivity-results-container', which is where all results will be added to.
     *
     * @param options Options object containing the following properties:
     *                dropdownCssClass - Optional CSS class to add to the top-level element.
     *                searchInputPlaceholder - Optional placeholder text to display in the search
     *                                         input in the dropdown.
     *                showSearchInput - Boolean whether a search input should be shown. If true,
     *                                  an input element with the 'selectivity-search-input' is
     *                                  expected.
     */
    dropdown: function(options) {
        var extraClass = (options.dropdownCssClass ? ' ' + options.dropdownCssClass : ''),
            searchInput = '';
        if (options.showSearchInput) {
            extraClass += ' has-search-input';

            var placeholder = options.searchInputPlaceholder;
            searchInput = (
                '<div class="selectivity-search-input-container">' +
                    '<input type="text" class="selectivity-search-input"' +
                            (placeholder ? ' placeholder="' + escape(placeholder) + '"'
                                         : '') + '>' +
                '</div>'
            );
        }
        return (
            '<div class="selectivity-dropdown' + extraClass + '">' +
                searchInput +
                '<div class="selectivity-results-container"></div>' +
            '</div>'
        );
    },

    /**
     * Renders an error message in the dropdown.
     *
     * @param options Options object containing the following properties:
     *                escape - Boolean whether the message should be HTML-escaped.
     *                message - The message to display.
     */
    error: function(options) {
        return (
            '<div class="selectivity-error">' +
                (options.escape ? escape(options.message) : options.message) +
            '</div>'
        );
    },

    /**
     * Renders a loading indicator in the dropdown.
     *
     * This template is expected to have an element with a 'selectivity-loading' class which may be
     * replaced with actual results.
     */
    loading: function() {
        return '<div class="selectivity-loading">' + Selectivity.Locale.loading + '</div>';
    },

    /**
     * Load more indicator.
     *
     * This template is expected to have an element with a 'selectivity-load-more' class which, when
     * clicked, will load more results.
     */
    loadMore: function() {
        return '<div class="selectivity-load-more">' + Selectivity.Locale.loadMore + '</div>';
    },

    /**
     * Renders multi-selection input boxes.
     *
     * The template is expected to have at least have elements with the following classes:
     * 'selectivity-multiple-input-container' - The element containing all the selected items and
     *                                          the input for selecting additional items.
     * 'selectivity-multiple-input' - The actual input element that allows the user to type to
     *                                search for more items. When selected items are added, they are
     *                                inserted right before this element.
     * 'selectivity-width-detector' - This element is optional, but important to make sure the
     *                                '.selectivity-multiple-input' element will fit in the
     *                                container. The width detector also has the
     *                                'select2-multiple-input' class on purpose to be able to detect
     *                                the width of text entered in the input element.
     *
     * @param options Options object containing the following property:
     *                enabled - Boolean whether the input is enabled.
     */
    multipleSelectInput: function(options) {
        return (
            '<div class="selectivity-multiple-input-container">' +
                (options.enabled ? '<input type="text" autocomplete="off" autocorrect="off" ' +
                                          'autocapitalize="off" ' +
                                          'class="selectivity-multiple-input">' +
                                   '<span class="selectivity-multiple-input ' +
                                                'selectivity-width-detector"></span>'
                                 : '<div class="selectivity-multiple-input ' +
                                               'selectivity-placeholder"></div>') +
                '<div class="selectivity-clearfix"></div>' +
            '</div>'
        );
    },

    /**
     * Renders a selected item in multi-selection input boxes.
     *
     * The template is expected to have a top-level element with the class
     * 'selectivity-multiple-selected-item'. This element is also required to have a 'data-item-id'
     * attribute with the ID set to that passed through the options object.
     *
     * An element with the class 'selectivity-multiple-selected-item-remove' should be present
     * which, when clicked, will cause the element to be removed.
     *
     * @param options Options object containing the following properties:
     *                highlighted - Boolean whether this item is currently highlighted.
     *                id - Identifier for the item.
     *                removable - Boolean whether a remove icon should be displayed.
     *                text - Text label which the user sees.
     */
    multipleSelectedItem: function(options) {
        var extraClass = (options.highlighted ? ' highlighted' : '');
        return (
            '<span class="selectivity-multiple-selected-item' + extraClass + '" ' +
                  'data-item-id="' + escape(options.id) + '">' +
                (options.removable ? '<a class="selectivity-multiple-selected-item-remove">' +
                                         '<i class="fa fa-remove"></i>' +
                                     '</a>'
                                   : '') +
                escape(options.text) +
            '</span>'
        );
    },

    /**
     * Renders a message there are no results for the given query.
     *
     * @param options Options object containing the following property:
     *                term - Search term the user is searching for.
     */
    noResults: function(options) {
        var Locale = Selectivity.Locale;
        return (
            '<div class="selectivity-error">' +
                (options.term ? Locale.noResultsForTerm(options.term) : Locale.noResults) +
            '</div>'
        );
    },

    /**
     * Renders a container for item children.
     *
     * The template is expected to have an element with the class 'selectivity-result-children'.
     *
     * @param options Options object containing the following property:
     *                childrenHtml - Rendered HTML for the children.
     */
    resultChildren: function(options) {
        return '<div class="selectivity-result-children">' + options.childrenHtml + '</div>';
    },

    /**
     * Render a result item in the dropdown.
     *
     * The template is expected to have a top-level element with the class
     * 'selectivity-result-item'. This element is also required to have a 'data-item-id' attribute
     * with the ID set to that passed through the options object.
     *
     * @param options Options object containing the following properties:
     *                id - Identifier for the item.
     *                text - Text label which the user sees.
     *                submenu - Truthy if the result item has a menu with subresults.
     */
    resultItem: function(options) {
        return (
            '<div class="selectivity-result-item" data-item-id="' + escape(options.id) + '">' +
                escape(options.text) +
                (options.submenu ? '<i class="selectivity-submenu-icon fa fa-chevron-right"></i>'
                                 : '') +
            '</div>'
        );
    },

    /**
     * Render a result label in the dropdown.
     *
     * The template is expected to have a top-level element with the class
     * 'selectivity-result-label'.
     *
     * @param options Options object containing the following properties:
     *                text - Text label.
     */
    resultLabel: function(options) {
        return '<div class="selectivity-result-label">' + escape(options.text) + '</div>';
    },

    /**
     * Renders single-select input boxes.
     *
     * The template is expected to have at least one element with the class
     * 'selectivity-single-result-container' which is the element containing the selected item or
     * the placeholder.
     */
    singleSelectInput: (
        '<div class="selectivity-single-select">' +
            '<input type="text" class="selectivity-single-select-input">' +
            '<div class="selectivity-single-result-container"></div>' +
            '<i class="fa fa-sort-desc selectivity-caret"></i>' +
        '</div>'
    ),

    /**
     * Renders the placeholder for single-select input boxes.
     *
     * The template is expected to have a top-level element with the class
     * 'selectivity-placeholder'.
     *
     * @param options Options object containing the following property:
     *                placeholder - The placeholder text.
     */
    singleSelectPlaceholder: function(options) {
        return (
            '<div class="selectivity-placeholder">' +
                escape(options.placeholder) +
            '</div>'
        );
    },

    /**
     * Renders the selected item in single-select input boxes.
     *
     * The template is expected to have a top-level element with the class
     * 'selectivity-single-selected-item'. This element is also required to have a 'data-item-id'
     * attribute with the ID set to that passed through the options object.
     *
     * @param options Options object containing the following properties:
     *                id - Identifier for the item.
     *                removable - Boolean whether a remove icon should be displayed.
     *                text - Text label which the user sees.
     */
    singleSelectedItem: function(options) {
        return (
            '<span class="selectivity-single-selected-item" ' +
                  'data-item-id="' + escape(options.id) + '">' +
                (options.removable ? '<a class="selectivity-single-selected-item-remove">' +
                                         '<i class="fa fa-remove"></i>' +
                                     '</a>'
                                   : '') +
                escape(options.text) +
            '</span>'
        );
    },

    /**
     * Renders select-box inside single-select input that was initialized on
     * traditional <select> element.
     *
     * @param options Options object containing the following properties:
     *                name - Name of the <select> element.
     *                mode - Mode in which select exists, single or multiple.
     */
    selectCompliance: function(options) {
        if (options.mode === 'multiple' && options.name.slice(-2) !== '[]') {
            options.name += '[]';
        }
        return ('<select name="' + options.name + '"' + (options.mode === 'multiple' ? ' multiple' : '') + '></select>');
    },

    /**
     * Renders the selected item in compliance <select> element as <option>.
     *
     * @param options Options object containing the following properties
     *                id - Identifier for the item.
     *                text - Text label which the user sees.
     */
    selectOptionCompliance: function(options) {
        return (
            '<option value="' + escape(options.id) + '" selected>' +
                escape(options.text) +
            '</option>'
        );
    }

};

},{"13":13,"4":4,"8":8}],18:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

var Selectivity = _dereq_(8);

function defaultTokenizer(input, selection, createToken, options) {

    var createTokenItem = options.createTokenItem || function(token) {
        return token ? { id: token, text: token } : null;
    };

    var separators = options.tokenSeparators;

    function hasToken(input) {
        return input ? separators.some(function(separator) {
            return input.indexOf(separator) > -1;
        }) : false;
    }

    function takeToken(input) {
        for (var i = 0, length = input.length; i < length; i++) {
            if (separators.indexOf(input[i]) > -1) {
                return { term: input.slice(0, i), input: input.slice(i + 1) };
            }
        }
        return {};
    }

    while (hasToken(input)) {
        var token = takeToken(input);
        if (token.term) {
            var item = createTokenItem(token.term);
            if (item && !Selectivity.findById(selection, item.id)) {
                createToken(item);
            }
        }
        input = token.input;
    }

    return input;
}

/**
 * Option listener that provides a default tokenizer which is used when the tokenSeparators option
 * is specified.
 *
 * @param options Options object. In addition to the options supported in the multi-input
 *                implementation, this may contain the following property:
 *                tokenSeparators - Array of string separators which are used to separate the search
 *                                  string into tokens. If specified and the tokenizer property is
 *                                  not set, the tokenizer property will be set to a function which
 *                                  splits the search term into tokens separated by any of the given
 *                                  separators. The tokens will be converted into selectable items
 *                                  using the 'createTokenItem' function. The default tokenizer also
 *                                  filters out already selected items.
 */
Selectivity.OptionListeners.push(function(selectivity, options) {

    if (options.tokenSeparators) {
        options.allowedTypes = $.extend({ tokenSeparators: 'array' }, options.allowedTypes);

        options.tokenizer = options.tokenizer || defaultTokenizer;
    }
});

},{"8":8,"jquery":"jquery"}],19:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

var Selectivity = _dereq_(8);

function replaceSelectElement($el, options) {

    var data = (options.multiple ? [] : null);

    var mapOptions = function() {
        var $this = $(this);
        if ($this.is('option')) {
            var text = $this.text();
            var id = $this.attr('value') || text;
            if ($this.prop('selected')) {
                var item = { id: id, text: text };
                if (options.multiple) {
                    data.push(item);
                } else {
                    data = item;
                }
            }

            return {
                id: id,
                text: $this.attr('label') || text
            };
        } else {
            return {
                text: $this.attr('label'),
                children: $this.children('option,optgroup').map(mapOptions).get()
            };
        }
    };

    options.allowClear = ('allowClear' in options ? options.allowClear : !$el.prop('required'));

    var items = $el.children('option,optgroup').map(mapOptions).get();
    options.items = (options.query ? null : items);

    options.placeholder = options.placeholder || $el.data('placeholder') || '';

    options.data = data;

    var classes = ($el.attr('class') || 'selectivity-input').split(' ');
    if (classes.indexOf('selectivity-input') === -1) {
        classes.push('selectivity-input');
    }

    var $div = $('<div>').attr({
        'id': $el.attr('id'),
        'class': classes.join(' '),
        'style': $el.attr('style'),
        'data-name': $el.attr('name')
    });
    $el.replaceWith($div);
    return $div;
}

function bindTraditionalSelectEvents(selectivity) {

    var $el = selectivity.$el;

    $el.on('selectivity-init', function(event, mode) {

            $el.append(selectivity.template('selectCompliance', {name: $el.attr('data-name'), mode: mode}))
              .removeAttr('data-name');
        })
        .on('selectivity-init change', function() {
            var data = selectivity._data;
            var $select = $el.find('select');

            if (data instanceof Array) {
                $select.empty();

                data.forEach(function(item) {
                    $select.append(selectivity.template('selectOptionCompliance', item));
                });
            } else {
                if (data) {
                    $select.html(selectivity.template('selectOptionCompliance', data));
                } else {
                    $select.empty();
                }
            }
        });
}

/**
 * Option listener providing support for converting traditional <select> boxes into Selectivity
 * instances.
 */
Selectivity.OptionListeners.push(function(selectivity, options) {

    var $el = selectivity.$el;
    if ($el.is('select')) {
        if ($el.attr('autofocus')) {
            setTimeout(function() {
                selectivity.focus();
            }, 1);
        }

        selectivity.$el = replaceSelectElement($el, options);
        selectivity.$el[0].selectivity = selectivity;

        bindTraditionalSelectEvents(selectivity);
    }
});

},{"8":8,"jquery":"jquery"}]},{},[1])(1)
});