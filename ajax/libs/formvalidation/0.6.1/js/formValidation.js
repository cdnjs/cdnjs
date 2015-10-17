/*!
 * FormValidation (http://formvalidation.io)
 * The best jQuery plugin to validate form fields. Support Bootstrap, Foundation, Pure, SemanticUI, UIKit and custom frameworks
 *
 * @version     v0.6.1, built on 2015-02-24 10:14:10 PM
 * @author      https://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 - 2015 Nguyen Huu Phuoc
 * @license     http://formvalidation.io/license/
 */
// Register the namespace
window.FormValidation = {
    AddOn:     {},  // Add-ons
    Framework: {},  // Supported frameworks
    I18n:      {},  // i18n
    Validator: {}   // Available validators
};

if (typeof jQuery === 'undefined') {
    throw new Error('FormValidation requires jQuery');
}

(function($) {
    var version = $.fn.jquery.split(' ')[0].split('.');
    if ((+version[0] < 2 && +version[1] < 9) || (+version[0] === 1 && +version[1] === 9 && +version[2] < 1)) {
        throw new Error('FormValidation requires jQuery version 1.9.1 or higher');
    }
}(jQuery));

(function($) {
    // TODO: Remove backward compatibility in v0.7.0
    /**
     * Constructor
     *
     * @param {jQuery|String} form The form element or selector
     * @param {Object} options The options
     * @param {String} [namespace] The optional namespace which is used for data-{namespace}-xxx attributes and internal data.
     * Currently, it's used to support backward version
     * @constructor
     */
    FormValidation.Base = function(form, options, namespace) {
        this.$form      = $(form);
        this.options    = $.extend({}, $.fn.formValidation.DEFAULT_OPTIONS, options);
        this._namespace = namespace || 'fv';

        this.$invalidFields = $([]);    // Array of invalid fields
        this.$submitButton  = null;     // The submit button which is clicked to submit form
        this.$hiddenButton  = null;

        // Validating status
        this.STATUS_NOT_VALIDATED = 'NOT_VALIDATED';
        this.STATUS_VALIDATING    = 'VALIDATING';
        this.STATUS_INVALID       = 'INVALID';
        this.STATUS_VALID         = 'VALID';

        // Determine the event that is fired when user change the field value
        // Most modern browsers supports input event except IE 7, 8.
        // IE 9 supports input event but the event is still not fired if I press the backspace key.
        // Get IE version
        // https://gist.github.com/padolsey/527683/#comment-7595
        var ieVersion = (function() {
            var v = 3, div = document.createElement('div'), a = div.all || [];
            while (div.innerHTML = '<!--[if gt IE '+(++v)+']><br><![endif]-->', a[0]) {}
            return v > 4 ? v : !v;
        }());

        var el = document.createElement('div');
        this._changeEvent = (ieVersion === 9 || !('oninput' in el)) ? 'keyup' : 'input';

        // The flag to indicate that the form is ready to submit when a remote/callback validator returns
        this._submitIfValid = null;

        // Field elements
        this._cacheFields = {};

        this._init();
    };

    FormValidation.Base.prototype = {
        constructor: FormValidation.Base,

        /**
         * Check if the number of characters of field value exceed the threshold or not
         *
         * @param {jQuery} $field The field element
         * @returns {Boolean}
         */
        _exceedThreshold: function($field) {
            var ns        = this._namespace,
                field     = $field.attr('data-' + ns + '-field'),
                threshold = this.options.fields[field].threshold || this.options.threshold;
            if (!threshold) {
                return true;
            }
            var cannotType = $.inArray($field.attr('type'), ['button', 'checkbox', 'file', 'hidden', 'image', 'radio', 'reset', 'submit']) !== -1;
            return (cannotType || $field.val().length >= threshold);
        },

        /**
         * Init form
         */
        _init: function() {
            var that    = this,
                ns      = this._namespace,
                options = {
                    addOns:         {},
                    autoFocus:      this.$form.attr('data-' + ns + '-autofocus'),
                    button: {
                        selector: this.$form.attr('data-' + ns + '-button-selector') || this.$form.attr('data-' + ns + '-submitbuttons'), // Support backward
                        disabled: this.$form.attr('data-' + ns + '-button-disabled')
                    },
                    control: {
                        valid:   this.$form.attr('data-' + ns + '-control-valid'),
                        invalid: this.$form.attr('data-' + ns + '-control-invalid')
                    },
                    err: {
                        clazz:     this.$form.attr('data-' + ns + '-err-clazz'),
                        container: this.$form.attr('data-' + ns + '-err-container') || this.$form.attr('data-' + ns + '-container'), // Support backward
                        parent:    this.$form.attr('data-' + ns + '-err-parent')
                    },
                    events: {
                        formInit:         this.$form.attr('data-' + ns + '-events-form-init'),
                        formError:        this.$form.attr('data-' + ns + '-events-form-error'),
                        formSuccess:      this.$form.attr('data-' + ns + '-events-form-success'),
                        fieldAdded:       this.$form.attr('data-' + ns + '-events-field-added'),
                        fieldRemoved:     this.$form.attr('data-' + ns + '-events-field-removed'),
                        fieldInit:        this.$form.attr('data-' + ns + '-events-field-init'),
                        fieldError:       this.$form.attr('data-' + ns + '-events-field-error'),
                        fieldSuccess:     this.$form.attr('data-' + ns + '-events-field-success'),
                        fieldStatus:      this.$form.attr('data-' + ns + '-events-field-status'),
                        localeChanged:    this.$form.attr('data-' + ns + '-events-locale-changed'),
                        validatorError:   this.$form.attr('data-' + ns + '-events-validator-error'),
                        validatorSuccess: this.$form.attr('data-' + ns + '-events-validator-success')
                    },
                    excluded:      this.$form.attr('data-' + ns + '-excluded'),
                    icon: {
                        valid:      this.$form.attr('data-' + ns + '-icon-valid')      || this.$form.attr('data-' + ns + '-feedbackicons-valid'),      // Support backward
                        invalid:    this.$form.attr('data-' + ns + '-icon-invalid')    || this.$form.attr('data-' + ns + '-feedbackicons-invalid'),    // Support backward
                        validating: this.$form.attr('data-' + ns + '-icon-validating') || this.$form.attr('data-' + ns + '-feedbackicons-validating'), // Support backward
                        feedback:   this.$form.attr('data-' + ns + '-icon-feedback')
                    },
                    live:          this.$form.attr('data-' + ns + '-live'),
                    locale:        this.$form.attr('data-' + ns + '-locale'),
                    message:       this.$form.attr('data-' + ns + '-message'),
                    onError:       this.$form.attr('data-' + ns + '-onerror'),
                    onSuccess:     this.$form.attr('data-' + ns + '-onsuccess'),
                    row: {
                        selector: this.$form.attr('data-' + ns + '-row-selector') || this.$form.attr('data-' + ns + '-group'), // Support backward
                        valid:    this.$form.attr('data-' + ns + '-row-valid'),
                        invalid:  this.$form.attr('data-' + ns + '-row-invalid'),
                        feedback: this.$form.attr('data-' + ns + '-row-feedback')
                    },
                    threshold:     this.$form.attr('data-' + ns + '-threshold'),
                    trigger:       this.$form.attr('data-' + ns + '-trigger'),
                    verbose:       this.$form.attr('data-' + ns + '-verbose'),
                    fields:        {}
                };

            this.$form
                // Disable client side validation in HTML 5
                .attr('novalidate', 'novalidate')
                .addClass(this.options.elementClass)
                // Disable the default submission first
                .on('submit.' + ns, function(e) {
                    e.preventDefault();
                    that.validate();
                })
                .on('click.' + ns, this.options.button.selector, function() {
                    that.$submitButton  = $(this);
                    // The user just click the submit button
                    that._submitIfValid = true;
                });

            if (this.options.declarative === true || this.options.declarative === 'true') {
                // Find all fields which have either "name" or "data-{namespace}-field" attribute
                this.$form
                    .find('[name], [data-' + ns + '-field]')
                    .each(function () {
                        var $field = $(this),
                            field  = $field.attr('name') || $field.attr('data-' + ns + '-field'),
                            opts   = that._parseOptions($field);
                        if (opts) {
                            $field.attr('data-' + ns + '-field', field);
                            options.fields[field] = $.extend({}, opts, options.fields[field]);
                        }
                    });
            }

            this.options = $.extend(true, this.options, options);

            // Normalize the err.parent option
            if ('string' === typeof this.options.err.parent) {
                this.options.err.parent = new RegExp(this.options.err.parent);
            }

            // Support backward
            if (this.options.container) {
                this.options.err.container = this.options.container;
                delete this.options.container;
            }
            if (this.options.feedbackIcons) {
                this.options.icon = $.extend(true, this.options.icon, this.options.feedbackIcons);
                delete this.options.feedbackIcons;
            }
            if (this.options.group) {
                this.options.row.selector = this.options.group;
                delete this.options.group;
            }
            if (this.options.submitButtons) {
                this.options.button.selector = this.options.submitButtons;
                delete this.options.submitButtons;
            }

            // If the locale is not found, reset it to default one
            if (!FormValidation.I18n[this.options.locale]) {
                this.options.locale = $.fn.formValidation.DEFAULT_OPTIONS.locale;
            }

            // Parse the add-on options from HTML attributes
            if (this.options.declarative === true || this.options.declarative === 'true') {
                this.options = $.extend(true, this.options, { addOns: this._parseAddOnOptions() });
            }

            // When pressing Enter on any field in the form, the first submit button will do its job.
            // The form then will be submitted.
            // I create a first hidden submit button
            this.$hiddenButton = $('<button/>')
                                    .attr('type', 'submit')
                                    .prependTo(this.$form)
                                    .addClass('fv-hidden-submit')
                                    .css({ display: 'none', width: 0, height: 0 });

            this.$form
                .on('click.' +  this._namespace, '[type="submit"]', function(e) {
                    // #746: Check if the button click handler returns false
                    if (!e.isDefaultPrevented()) {
                        var $target = $(e.target),
                            // The button might contain HTML tag
                            $button = $target.is('[type="submit"]') ? $target.eq(0) : $target.parent('[type="submit"]').eq(0);

                        // Don't perform validation when clicking on the submit button/input
                        // which aren't defined by the 'button.selector' option
                        if (that.options.button.selector && !$button.is(that.options.button.selector) && !$button.is(that.$hiddenButton)) {
                            that.$form.off('submit.' + that._namespace).submit();
                        }
                    }
                });

            for (var field in this.options.fields) {
                this._initField(field);
            }

            // Init the add-ons
            for (var addOn in this.options.addOns) {
                if ('function' === typeof FormValidation.AddOn[addOn].init) {
                    FormValidation.AddOn[addOn].init(this, this.options.addOns[addOn]);
                }
            }

            this.$form.trigger($.Event(this.options.events.formInit), {
                bv: this,   // Support backward
                fv: this,
                options: this.options
            });

            // Prepare the events
            if (this.options.onSuccess) {
                this.$form.on(this.options.events.formSuccess, function(e) {
                    FormValidation.Helper.call(that.options.onSuccess, [e]);
                });
            }
            if (this.options.onError) {
                this.$form.on(this.options.events.formError, function(e) {
                    FormValidation.Helper.call(that.options.onError, [e]);
                });
            }
        },

        /**
         * Init field
         *
         * @param {String|jQuery} field The field name or field element
         */
        _initField: function(field) {
            var ns     = this._namespace,
                fields = $([]);
            switch (typeof field) {
                case 'object':
                    fields = field;
                    field  = field.attr('data-' + ns + '-field');
                    break;
                case 'string':
                    fields = this.getFieldElements(field);
                    fields.attr('data-' + ns + '-field', field);
                    break;
                default:
                    break;
            }

            // We don't need to validate non-existing fields
            if (fields.length === 0) {
                return;
            }

            if (this.options.fields[field] === null || this.options.fields[field].validators === null) {
                return;
            }

            var validatorName;
            for (validatorName in this.options.fields[field].validators) {
                if (!FormValidation.Validator[validatorName]) {
                    delete this.options.fields[field].validators[validatorName];
                }
            }
            if (this.options.fields[field].enabled === null) {
                this.options.fields[field].enabled = true;
            }

            var that      = this,
                total     = fields.length,
                type      = fields.attr('type'),
                updateAll = (total === 1) || ('radio' === type) || ('checkbox' === type),
                trigger   = this._getFieldTrigger(fields.eq(0)),
                events    = $.map(trigger, function(item) {
                    return item + '.update.' + ns;
                }).join(' ');

            for (var i = 0; i < total; i++) {
                var $field    = fields.eq(i),
                    row       = this.options.fields[field].row || this.options.row.selector,
                    $parent   = $field.closest(row),
                    // Allow user to indicate where the error messages are shown
                    // Support backward
                    container = ('function' === typeof (this.options.fields[field].container || this.options.fields[field].err || this.options.err.container))
                                ? (this.options.fields[field].container || this.options.fields[field].err || this.options.err.container).call(this, $field, this)
                                : (this.options.fields[field].container || this.options.fields[field].err || this.options.err.container),
                    $message  = (container && container !== 'tooltip' && container !== 'popover') ? $(container) : this._getMessageContainer($field, row);

                if (container && container !== 'tooltip' && container !== 'popover') {
                    $message.addClass(this.options.err.clazz);
                }

                // Remove all error messages and feedback icons
                $message.find('.' + this.options.err.clazz.split(' ').join('.') + '[data-' + ns + '-validator][data-' + ns + '-for="' + field + '"]').remove();
                $parent.find('i[data-' + ns + '-icon-for="' + field + '"]').remove();

                // Whenever the user change the field value, mark it as not validated yet
                $field.off(events).on(events, function() {
                    that.updateStatus($(this), that.STATUS_NOT_VALIDATED);
                });

                // Create help block elements for showing the error messages
                $field.data(ns + '.messages', $message);
                for (validatorName in this.options.fields[field].validators) {
                    $field.data(ns + '.result.' + validatorName, this.STATUS_NOT_VALIDATED);

                    if (!updateAll || i === total - 1) {
                        $('<small/>')
                            .css('display', 'none')
                            .addClass(this.options.err.clazz)
                            .attr('data-' + ns + '-validator', validatorName)
                            .attr('data-' + ns + '-for', field)
                            .attr('data-' + ns + '-result', this.STATUS_NOT_VALIDATED)
                            .html(this._getMessage(field, validatorName))
                            .appendTo($message);
                    }

                    // Init the validator
                    if ('function' === typeof FormValidation.Validator[validatorName].init) {
                        FormValidation.Validator[validatorName].init(this, $field, this.options.fields[field].validators[validatorName]);
                    }
                }

                // Prepare the feedback icons
                // Available from Bootstrap 3.1 (http://getbootstrap.com/css/#forms-control-validation)
                if (this.options.fields[field].icon !== false && this.options.fields[field].icon !== 'false'
                    && this.options.icon
                    && this.options.icon.valid && this.options.icon.invalid && this.options.icon.validating
                    && (!updateAll || i === total - 1))
                {
                    // $parent.removeClass(this.options.row.valid).removeClass(this.options.row.invalid).addClass(this.options.row.feedback);
                    // Keep error messages which are populated from back-end
                    $parent.addClass(this.options.row.feedback);
                    var $icon = $('<i/>')
                                    .css('display', 'none')
                                    .addClass(this.options.icon.feedback)
                                    .attr('data-' + ns + '-icon-for', field)
                                    .insertAfter($field);

                    // Store the icon as a data of field element
                    (!updateAll ? $field : fields).data(ns + '.icon', $icon);

                    if ('tooltip' === container || 'popover' === container) {
                        (!updateAll ? $field : fields)
                            .on(this.options.events.fieldError, function() {
                                $parent.addClass('fv-has-tooltip');
                            })
                            .on(this.options.events.fieldSuccess, function() {
                                $parent.removeClass('fv-has-tooltip');
                            });

                        $field
                            // Show tooltip/popover message when field gets focus
                            .off('focus.container.' + ns)
                            .on('focus.container.' + ns, function() {
                                that._showTooltip($field, container);
                            })
                            // and hide them when losing focus
                            .off('blur.container.' + ns)
                            .on('blur.container.' + ns, function() {
                                that._hideTooltip($field, container);
                            });
                    }

                    if ('string' === typeof this.options.fields[field].icon && this.options.fields[field].icon !== 'true') {
                        $icon.appendTo($(this.options.fields[field].icon));
                    } else {
                        this._fixIcon($field, $icon);
                    }
                }
            }

            // Prepare the events
            fields
                .on(this.options.events.fieldSuccess, function(e, data) {
                    var onSuccess = that.getOptions(data.field, null, 'onSuccess');
                    if (onSuccess) {
                        FormValidation.Helper.call(onSuccess, [e, data]);
                    }
                })
                .on(this.options.events.fieldError, function(e, data) {
                    var onError = that.getOptions(data.field, null, 'onError');
                    if (onError) {
                        FormValidation.Helper.call(onError, [e, data]);
                    }
                })
                .on(this.options.events.fieldStatus, function(e, data) {
                    var onStatus = that.getOptions(data.field, null, 'onStatus');
                    if (onStatus) {
                        FormValidation.Helper.call(onStatus, [e, data]);
                    }
                })
                .on(this.options.events.validatorError, function(e, data) {
                    var onError = that.getOptions(data.field, data.validator, 'onError');
                    if (onError) {
                        FormValidation.Helper.call(onError, [e, data]);
                    }
                })
                .on(this.options.events.validatorSuccess, function(e, data) {
                    var onSuccess = that.getOptions(data.field, data.validator, 'onSuccess');
                    if (onSuccess) {
                        FormValidation.Helper.call(onSuccess, [e, data]);
                    }
                });

            // Set live mode
            this.onLiveChange(fields, 'live', function() {
                if (that._exceedThreshold($(this))) {
                    that.validateField($(this));
                }
            });

            fields.trigger($.Event(this.options.events.fieldInit), {
                bv: this,   // Support backward
                fv: this,
                field: field,
                element: fields
            });
        },

        /**
         * Check if the field is excluded.
         * Returning true means that the field will not be validated
         *
         * @param {jQuery} $field The field element
         * @returns {Boolean}
         */
        _isExcluded: function($field) {
            var ns           = this._namespace,
                excludedAttr = $field.attr('data-' + ns + '-excluded'),
                // I still need to check the 'name' attribute while initializing the field
                field        = $field.attr('data-' + ns + '-field') || $field.attr('name');

            switch (true) {
                case (!!field && this.options.fields && this.options.fields[field] && (this.options.fields[field].excluded === 'true' || this.options.fields[field].excluded === true)):
                case (excludedAttr === 'true'):
                case (excludedAttr === ''):
                    return true;

                case (!!field && this.options.fields && this.options.fields[field] && (this.options.fields[field].excluded === 'false' || this.options.fields[field].excluded === false)):
                case (excludedAttr === 'false'):
                    return false;

                default:
                    if (this.options.excluded) {
                        // Convert to array first
                        if ('string' === typeof this.options.excluded) {
                            this.options.excluded = $.map(this.options.excluded.split(','), function(item) {
                                // Trim the spaces
                                return $.trim(item);
                            });
                        }

                        var length = this.options.excluded.length;
                        for (var i = 0; i < length; i++) {
                            if (('string' === typeof this.options.excluded[i] && $field.is(this.options.excluded[i]))
                                || ('function' === typeof this.options.excluded[i] && this.options.excluded[i].call(this, $field, this) === true))
                            {
                                return true;
                            }
                        }
                    }
                    return false;
            }
        },

        /**
         * Get a field changed trigger event
         *
         * @param {jQuery} $field The field element
         * @returns {String[]} The event names triggered on field change
         */
        _getFieldTrigger: function($field) {
            var ns      = this._namespace,
                trigger = $field.data(ns + '.trigger');
            if (trigger) {
                return trigger;
            }

            var type  = $field.attr('type'),
                name  = $field.attr('data-' + ns + '-field'),
                event = ('radio' === type || 'checkbox' === type || 'file' === type || 'SELECT' === $field.get(0).tagName) ? 'change' : this._changeEvent;
            trigger   = ((this.options.fields[name] ? this.options.fields[name].trigger : null) || this.options.trigger || event).split(' ');

            // Since the trigger data is used many times, I need to cache it to use later
            $field.data(ns + '.trigger', trigger);

            return trigger;
        },

        /**
         * Get the error message for given field and validator
         *
         * @param {String} field The field name
         * @param {String} validatorName The validator name
         * @returns {String}
         */
        _getMessage: function(field, validatorName) {
            if (!this.options.fields[field] || !FormValidation.Validator[validatorName]
                || !this.options.fields[field].validators || !this.options.fields[field].validators[validatorName])
            {
                return '';
            }

            switch (true) {
                case !!this.options.fields[field].validators[validatorName].message:
                    return this.options.fields[field].validators[validatorName].message;
                case !!this.options.fields[field].message:
                    return this.options.fields[field].message;
                case (!!FormValidation.I18n[this.options.locale] && !!FormValidation.I18n[this.options.locale][validatorName] && !!FormValidation.I18n[this.options.locale][validatorName]['default']):
                    return FormValidation.I18n[this.options.locale][validatorName]['default'];
                default:
                    return this.options.message;
            }
        },

        /**
         * Get the element to place the error messages
         *
         * @param {jQuery} $field The field element
         * @param {String} row
         * @returns {jQuery}
         */
        _getMessageContainer: function($field, row) {
            if (!this.options.err.parent) {
                throw new Error('The err.parent option is not defined');
            }

            var $parent = $field.parent();
            if ($parent.is(row)) {
                return $parent;
            }

            var cssClasses = $parent.attr('class');
            if (!cssClasses) {
                return this._getMessageContainer($parent, row);
            }

            if (this.options.err.parent.test(cssClasses)) {
                return $parent;
            }

            return this._getMessageContainer($parent, row);
        },

        /**
         * Parse the add-on options from HTML attributes
         *
         * @returns {Object}
         */
        _parseAddOnOptions: function() {
            var ns     = this._namespace,
                names  = this.$form.attr('data-' + ns + '-addons'),
                addOns = this.options.addOns || {};

            if (names) {
                names = names.replace(/\s/g, '').split(',');
                for (var i = 0; i < names.length; i++) {
                    if (!addOns[names[i]]) {
                        addOns[names[i]] = {};
                    }
                }
            }

            // Try to parse each add-on options
            var addOn, attrMap, attr, option;
            for (addOn in addOns) {
                if (!FormValidation.AddOn[addOn]) {
                    // Add-on is not found
                    delete addOns[addOn];
                    continue;
                }

                attrMap = FormValidation.AddOn[addOn].html5Attributes;
                if (attrMap) {
                    for (attr in attrMap) {
                        option = this.$form.attr('data-' + ns + '-addons-' + addOn.toLowerCase() + '-' + attr.toLowerCase());
                        if (option) {
                            addOns[addOn][attrMap[attr]] = option;
                        }
                    }
                }
            }

            return addOns;
        },

        /**
         * Parse the validator options from HTML attributes
         *
         * @param {jQuery} $field The field element
         * @returns {Object}
         */
        _parseOptions: function($field) {
            var ns         = this._namespace,
                field      = $field.attr('name') || $field.attr('data-' + ns + '-field'),
                validators = {},
                validator,
                v,          // Validator name
                attrName,
                enabled,
                optionName,
                optionAttrName,
                optionValue,
                html5AttrName,
                html5AttrMap;

            for (v in FormValidation.Validator) {
                validator    = FormValidation.Validator[v];
                attrName     = 'data-' + ns + '-' + v.toLowerCase(),
                enabled      = $field.attr(attrName) + '';
                html5AttrMap = ('function' === typeof validator.enableByHtml5) ? validator.enableByHtml5($field) : null;

                if ((html5AttrMap && enabled !== 'false')
                    || (html5AttrMap !== true && ('' === enabled || 'true' === enabled || attrName === enabled.toLowerCase())))
                {
                    // Try to parse the options via attributes
                    validator.html5Attributes = $.extend({}, {
                                                    message: 'message',
                                                    onerror: 'onError',
                                                    onsuccess: 'onSuccess',
                                                    transformer: 'transformer'
                                                }, validator.html5Attributes);
                    validators[v] = $.extend({}, html5AttrMap === true ? {} : html5AttrMap, validators[v]);

                    for (html5AttrName in validator.html5Attributes) {
                        optionName  = validator.html5Attributes[html5AttrName];
                        optionAttrName = 'data-' + ns + '-' + v.toLowerCase() + '-' + html5AttrName,
                        optionValue = $field.attr(optionAttrName);
                        if (optionValue) {
                            if ('true' === optionValue || optionAttrName === optionValue.toLowerCase()) {
                                optionValue = true;
                            } else if ('false' === optionValue) {
                                optionValue = false;
                            }
                            validators[v][optionName] = optionValue;
                        }
                    }
                }
            }

            var opts = {
                    autoFocus:   $field.attr('data-' + ns + '-autofocus'),
                    err:         $field.attr('data-' + ns + '-err-container') || $field.attr('data-' + ns + '-container'), // Support backward
                    excluded:    $field.attr('data-' + ns + '-excluded'),
                    icon:        $field.attr('data-' + ns + '-icon') || $field.attr('data-' + ns + '-feedbackicons') || (this.options.fields && this.options.fields[field] ? this.options.fields[field].feedbackIcons : null), // Support backward
                    message:     $field.attr('data-' + ns + '-message'),
                    onError:     $field.attr('data-' + ns + '-onerror'),
                    onStatus:    $field.attr('data-' + ns + '-onstatus'),
                    onSuccess:   $field.attr('data-' + ns + '-onsuccess'),
                    row:         $field.attr('data-' + ns + '-row') || $field.attr('data-' + ns + '-group') || (this.options.fields && this.options.fields[field] ? this.options.fields[field].group : null), // Support backward
                    selector:    $field.attr('data-' + ns + '-selector'),
                    threshold:   $field.attr('data-' + ns + '-threshold'),
                    transformer: $field.attr('data-' + ns + '-transformer'),
                    trigger:     $field.attr('data-' + ns + '-trigger'),
                    verbose:     $field.attr('data-' + ns + '-verbose'),
                    validators:  validators
                },
                emptyOptions    = $.isEmptyObject(opts),        // Check if the field options are set using HTML attributes
                emptyValidators = $.isEmptyObject(validators);  // Check if the field validators are set using HTML attributes

            if (!emptyValidators || (!emptyOptions && this.options.fields && this.options.fields[field])) {
                opts.validators = validators;
                return opts;
            } else {
                return null;
            }
        },

        /**
         * Called when all validations are completed
         */
        _submit: function() {
            var isValid = this.isValid();
            if (isValid === null) {
                return;
            }

            var eventType = isValid ? this.options.events.formSuccess : this.options.events.formError,
                e         = $.Event(eventType);

            this.$form.trigger(e);

            // Call default handler
            // Check if whether the submit button is clicked
            if (this.$submitButton) {
                isValid ? this._onSuccess(e) : this._onError(e);
            }
        },

        // ~~~~~~
        // Events
        // ~~~~~~

        /**
         * The default handler of error.form.fv event.
         * It will be called when there is a invalid field
         *
         * @param {jQuery.Event} e The jQuery event object
         */
        _onError: function(e) {
            if (e.isDefaultPrevented()) {
                return;
            }

            if ('submitted' === this.options.live) {
                // Enable live mode
                this.options.live = 'enabled';

                var that = this;
                for (var field in this.options.fields) {
                    (function(f) {
                        var fields  = that.getFieldElements(f);
                        if (fields.length) {
                            that.onLiveChange(fields, 'live', function() {
                                if (that._exceedThreshold($(this))) {
                                    that.validateField($(this));
                                }
                            });
                        }
                    })(field);
                }
            }

            // Determined the first invalid field which will be focused on automatically
            var ns = this._namespace;
            for (var i = 0; i < this.$invalidFields.length; i++) {
                var $field    = this.$invalidFields.eq(i),
                    autoFocus = this.isOptionEnabled($field.attr('data-' + ns + '-field'), 'autoFocus');
                if (autoFocus) {
                    // Focus the field
                    $field.focus();
                    break;
                }
            }
        },

        /**
         * Called after validating a field element
         *
         * @param {jQuery} $field The field element
         * @param {String} [validatorName] The validator name
         */
        _onFieldValidated: function($field, validatorName) {
            var ns            = this._namespace,
                field         = $field.attr('data-' + ns + '-field'),
                validators    = this.options.fields[field].validators,
                counter       = {},
                numValidators = 0,
                data          = {
                    bv: this,   // Support backward
                    fv: this,
                    field: field,
                    element: $field,
                    validator: validatorName,
                    result: $field.data(ns + '.response.' + validatorName)
                };

            // Trigger an event after given validator completes
            if (validatorName) {
                switch ($field.data(ns + '.result.' + validatorName)) {
                    case this.STATUS_INVALID:
                        $field.trigger($.Event(this.options.events.validatorError), data);
                        break;
                    case this.STATUS_VALID:
                        $field.trigger($.Event(this.options.events.validatorSuccess), data);
                        break;
                    default:
                        break;
                }
            }

            counter[this.STATUS_NOT_VALIDATED] = 0;
            counter[this.STATUS_VALIDATING]    = 0;
            counter[this.STATUS_INVALID]       = 0;
            counter[this.STATUS_VALID]         = 0;

            for (var v in validators) {
                if (validators[v].enabled === false) {
                    continue;
                }

                numValidators++;
                var result = $field.data(ns + '.result.' + v);
                if (result) {
                    counter[result]++;
                }
            }

            if (counter[this.STATUS_VALID] === numValidators) {
                // Remove from the list of invalid fields
                this.$invalidFields = this.$invalidFields.not($field);

                $field.trigger($.Event(this.options.events.fieldSuccess), data);
            }
            // If all validators are completed and there is at least one validator which doesn't pass
            else if ((counter[this.STATUS_NOT_VALIDATED] === 0 || !this.isOptionEnabled(field, 'verbose')) && counter[this.STATUS_VALIDATING] === 0 && counter[this.STATUS_INVALID] > 0) {
                // Add to the list of invalid fields
                this.$invalidFields = this.$invalidFields.add($field);

                $field.trigger($.Event(this.options.events.fieldError), data);
            }
        },

        /**
         * The default handler of success.form.fv event.
         * It will be called when all the fields are valid
         *
         * @param {jQuery.Event} e The jQuery event object
         */
        _onSuccess: function(e) {
            if (e.isDefaultPrevented()) {
                return;
            }

            // Submit the form
            this.disableSubmitButtons(true).defaultSubmit();
        },

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Abstract methods
        // Need to be implemented by sub-class that supports specific framework
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        /**
         * Specific framework might need to adjust the icon position
         *
         * @param {jQuery} $field The field element
         * @param {jQuery} $icon The icon element
         */
        _fixIcon: function($field, $icon) {
        },

        /**
         * Create a tooltip or popover
         * It will be shown when focusing on the field
         *
         * @param {jQuery} $field The field element
         * @param {String} message The message
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _createTooltip: function($field, message, type) {
        },

        /**
         * Destroy the tooltip or popover
         *
         * @param {jQuery} $field The field element
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _destroyTooltip: function($field, type) {
        },

        /**
         * Hide a tooltip or popover
         *
         * @param {jQuery} $field The field element
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _hideTooltip: function($field, type) {
        },

        /**
         * Show a tooltip or popover
         *
         * @param {jQuery} $field The field element
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _showTooltip: function($field, type) {
        },

        // ~~~~~~~~~~~~~~
        // Public methods
        // ~~~~~~~~~~~~~~

        /**
         * Submit the form using default submission.
         * It also does not perform any validations when submitting the form
         */
        defaultSubmit: function() {
            var ns = this._namespace;
            if (this.$submitButton) {
                // Create hidden input to send the submit buttons
                $('<input/>')
                    .attr({
                        'type': 'hidden',
                        name: this.$submitButton.attr('name')
                    })
                    .attr('data-' + ns + '-submit-hidden', '')
                    .val(this.$submitButton.val())
                    .appendTo(this.$form);
            }

            // Submit form
            this.$form.off('submit.' + ns).submit();
        },

        /**
         * Disable/enable submit buttons
         *
         * @param {Boolean} disabled Can be true or false
         * @returns {FormValidation.Base}
         */
        disableSubmitButtons: function(disabled) {
            if (!disabled) {
                this.$form
                    .find(this.options.button.selector)
                        .removeAttr('disabled')
                        .removeClass(this.options.button.disabled);
            } else if (this.options.live !== 'disabled') {
                // Don't disable if the live validating mode is disabled
                this.$form
                    .find(this.options.button.selector)
                        .attr('disabled', 'disabled')
                        .addClass(this.options.button.disabled);
            }

            return this;
        },

        /**
         * Retrieve the field elements by given name
         *
         * @param {String} field The field name
         * @returns {null|jQuery[]}
         */
        getFieldElements: function(field) {
            if (!this._cacheFields[field]) {
                if (this.options.fields[field] && this.options.fields[field].selector) {
                    // Look for the field inside the form first
                    var f = this.$form.find(this.options.fields[field].selector);
                    // If not found, search in entire document
                    this._cacheFields[field] = f.length ? f : $(this.options.fields[field].selector);
                } else {
                    this._cacheFields[field] = this.$form.find('[name="' + field + '"]');
                }
            }

            return this._cacheFields[field];
        },

        /**
         * Get the field value after applying transformer
         *
         * @param {String|jQuery} field The field name or field element
         * @param {String} validatorName The validator name
         * @returns {String}
         */
        getFieldValue: function(field, validatorName) {
            var $field, ns = this._namespace;
            if ('string' === typeof field) {
                $field = this.getFieldElements(field);
                if ($field.length === 0) {
                    return null;
                }
            } else {
                $field = field;
                field  = $field.attr('data-' + ns + '-field');
            }

            if (!field || !this.options.fields[field]) {
                return $field.val();
            }

            var transformer = (this.options.fields[field].validators && this.options.fields[field].validators[validatorName]
                                ? this.options.fields[field].validators[validatorName].transformer : null)
                                || this.options.fields[field].transformer;
            return transformer ? FormValidation.Helper.call(transformer, [$field, validatorName, this]) : $field.val();
        },

        /**
         * Get the namespace
         *
         * @returns {String}
         */
        getNamespace: function() {
            return this._namespace;
        },

        /**
         * Get the field options
         *
         * @param {String|jQuery} [field] The field name or field element. If it is not set, the method returns the form options
         * @param {String} [validator] The name of validator. It null, the method returns form options
         * @param {String} [option] The option name
         * @return {String|Object}
         */
        getOptions: function(field, validator, option) {
            var ns = this._namespace;
            if (!field) {
                return option ? this.options[option] : this.options;
            }
            if ('object' === typeof field) {
                field = field.attr('data-' + ns + '-field');
            }
            if (!this.options.fields[field]) {
                return null;
            }

            var options = this.options.fields[field];
            if (!validator) {
                return option ? options[option] : options;
            }
            if (!options.validators || !options.validators[validator]) {
                return null;
            }

            return option ? options.validators[validator][option] : options.validators[validator];
        },

        /**
         * Get the validating result of field
         *
         * @param {String|jQuery} field The field name or field element
         * @param {String} validatorName The validator name
         * @returns {String} The status. Can be 'NOT_VALIDATED', 'VALIDATING', 'INVALID' or 'VALID'
         */
        getStatus: function(field, validatorName) {
            var ns = this._namespace;
            switch (typeof field) {
                case 'object':
                    return field.data(ns + '.result.' + validatorName);
                case 'string':
                /* falls through */
                default:
                    return this.getFieldElements(field).eq(0).data(ns + '.result.' + validatorName);
            }
        },

        /**
         * Check whether or not a field option is enabled
         *
         * @param {String} field The field name
         * @param {String} option The option name, "verbose", "autoFocus", for example
         * @returns {Boolean}
         */
        isOptionEnabled: function(field, option) {
            if (this.options.fields[field] && (this.options.fields[field][option] === 'true' || this.options.fields[field][option] === true)) {
                return true;
            }
            if (this.options.fields[field] && (this.options.fields[field][option] === 'false' || this.options.fields[field][option] === false)) {
                return false;
            }
            return this.options[option] === 'true' || this.options[option] === true;
        },

        /**
         * Check the form validity
         *
         * @returns {Boolean|null} Returns one of three values
         * - true, if all fields are valid
         * - false, if there is one invalid field
         * - null, if there is at least one field which is not validated yet or being validated
         */
        isValid: function() {
            for (var field in this.options.fields) {
                var isValidField = this.isValidField(field);
                if (isValidField === null) {
                    return null;
                }
                if (isValidField === false) {
                    return false;
                }
            }

            return true;
        },

        /**
         * Check if all fields inside a given container are valid.
         * It's useful when working with a wizard-like such as tab, collapse
         *
         * @param {String|jQuery} container The container selector or element
         * @returns {Boolean|null} Returns one of three values
         * - true, if all fields inside the container are valid
         * - false, if there is one invalid field inside the container
         * - null, if the container consists of at least one field which is not validated yet or being validated
         */
        isValidContainer: function(container) {
            var that       = this,
                ns         = this._namespace,
                fields     = [],
                $container = ('string' === typeof container) ? $(container) : container;
            if ($container.length === 0) {
                return true;
            }

            $container.find('[data-' + ns + '-field]').each(function() {
                var $field = $(this);
                if (!that._isExcluded($field)) {
                    fields.push($field);
                }
            });

            var total = fields.length;
            for (var i = 0; i < total; i++) {
                var $f      = fields[i],
                    field   = $f.attr('data-' + ns + '-field'),
                    $errors = $f.data(ns + '.messages')
                                .find('.' + this.options.err.clazz.split(' ').join('.') + '[data-' + ns + '-validator][data-' + ns + '-for="' + field + '"]');

                if ($errors.filter('[data-' + ns + '-result="' + this.STATUS_INVALID + '"]').length > 0) {
                    return false;
                }

                // If the field is not validated
                if ($errors.filter('[data-' + ns + '-result="' + this.STATUS_NOT_VALIDATED + '"]').length > 0
                    || $errors.filter('[data-' + ns + '-result="' + this.STATUS_VALIDATING + '"]').length > 0)
                {
                    return null;
                }
            }

            return true;
        },

        /**
         * Check if the field is valid or not
         *
         * @param {String|jQuery} field The field name or field element
         * @returns {Boolean|null} Returns one of three values
         * - true, if the field passes all validators
         * - false, if the field doesn't pass any validator
         * - null, if there is at least one validator which isn't validated yet or being validated
         */
        isValidField: function(field) {
            var ns     = this._namespace,
                fields = $([]);
            switch (typeof field) {
                case 'object':
                    fields = field;
                    field  = field.attr('data-' + ns + '-field');
                    break;
                case 'string':
                    fields = this.getFieldElements(field);
                    break;
                default:
                    break;
            }
            if (fields.length === 0 || !this.options.fields[field] || this.options.fields[field].enabled === false) {
                return true;
            }

            var type  = fields.attr('type'),
                total = ('radio' === type || 'checkbox' === type) ? 1 : fields.length,
                $field, validatorName, status;
            for (var i = 0; i < total; i++) {
                $field = fields.eq(i);
                if (this._isExcluded($field)) {
                    continue;
                }

                for (validatorName in this.options.fields[field].validators) {
                    if (this.options.fields[field].validators[validatorName].enabled === false) {
                        continue;
                    }

                    status = $field.data(ns + '.result.' + validatorName);
                    if (status === this.STATUS_VALIDATING || status === this.STATUS_NOT_VALIDATED) {
                        return null;
                    } else if (status === this.STATUS_INVALID) {
                        return false;
                    }
                }
            }

            return true;
        },

        /**
         * Detach a handler function for a field live change event
         *
         * @param {jQuery[]} $fields The field elements
         * @param {String} namespace The event namespace
         * @returns {FormValidation.Base}
         */
        offLiveChange: function($fields, namespace) {
            if ($fields === null || $fields.length === 0) {
                return this;
            }

            var ns      = this._namespace,
                trigger = this._getFieldTrigger($fields.eq(0)),
                events  = $.map(trigger, function(item) {
                    return item + '.' + namespace + '.' + ns;
                }).join(' ');

            $fields.off(events);
            return this;
        },

        /**
         * Attach a handler function for a field live change event
         *
         * @param {jQuery[]} $fields The field elements
         * @param {String} namespace The event namespace
         * @param {Function} handler The handler function
         * @returns {FormValidation.Base}
         */
        onLiveChange: function($fields, namespace, handler) {
            if ($fields === null || $fields.length === 0) {
                return this;
            }

            var ns      = this._namespace,
                trigger = this._getFieldTrigger($fields.eq(0)),
                events  = $.map(trigger, function(item) {
                    return item + '.' + namespace + '.' + ns;
                }).join(' ');

            switch (this.options.live) {
                case 'submitted':
                    break;
                case 'disabled':
                    $fields.off(events);
                    break;
                case 'enabled':
                /* falls through */
                default:
                    $fields.off(events).on(events, function(e) {
                        handler.apply(this, arguments);
                    });
                    break;
            }

            return this;
        },

        /**
         * Update the error message
         *
         * @param {String|jQuery} field The field name or field element
         * @param {String} validator The validator name
         * @param {String} message The message
         * @returns {FormValidation.Base}
         */
        updateMessage: function(field, validator, message) {
            var that    = this,
                ns      = this._namespace,
                $fields = $([]);
            switch (typeof field) {
                case 'object':
                    $fields = field;
                    field   = field.attr('data-' + ns + '-field');
                    break;
                case 'string':
                    $fields = this.getFieldElements(field);
                    break;
                default:
                    break;
            }

            $fields.each(function() {
                $(this)
                    .data(ns + '.messages')
                    .find('.' + that.options.err.clazz + '[data-' + ns + '-validator="' + validator + '"][data-' + ns + '-for="' + field + '"]').html(message);
            });
        },

        /**
         * Update all validating results of field
         *
         * @param {String|jQuery} field The field name or field element
         * @param {String} status The status. Can be 'NOT_VALIDATED', 'VALIDATING', 'INVALID' or 'VALID'
         * @param {String} [validatorName] The validator name. If null, the method updates validity result for all validators
         * @returns {FormValidation.Base}
         */
        updateStatus: function(field, status, validatorName) {
            var ns     = this._namespace,
                fields = $([]);
            switch (typeof field) {
                case 'object':
                    fields = field;
                    field  = field.attr('data-' + ns + '-field');
                    break;
                case 'string':
                    fields = this.getFieldElements(field);
                    break;
                default:
                    break;
            }

            if (!field || !this.options.fields[field]) {
                return this;
            }

            if (status === this.STATUS_NOT_VALIDATED) {
                // Reset the flag
                // To prevent the form from doing submit when a deferred validator returns true while typing
                this._submitIfValid = false;
            }

            var that  = this,
                type  = fields.attr('type'),
                row   = this.options.fields[field].row || this.options.row.selector,
                total = ('radio' === type || 'checkbox' === type) ? 1 : fields.length;

            for (var i = 0; i < total; i++) {
                var $field       = fields.eq(i);
                if (this._isExcluded($field)) {
                    continue;
                }

                var $parent      = $field.closest(row),
                    $message     = $field.data(ns + '.messages'),
                    $allErrors   = $message.find('.' + this.options.err.clazz.split(' ').join('.') + '[data-' + ns + '-validator][data-' + ns + '-for="' + field + '"]'),
                    $errors      = validatorName ? $allErrors.filter('[data-' + ns + '-validator="' + validatorName + '"]') : $allErrors,
                    $icon        = $field.data(ns + '.icon'),
                    // Support backward
                    container    = ('function' === typeof (this.options.fields[field].container || this.options.fields[field].err || this.options.err.container))
                                    ? (this.options.fields[field].container || this.options.fields[field].err || this.options.err.container).call(this, $field, this)
                                    : (this.options.fields[field].container || this.options.fields[field].err || this.options.err.container),
                    isValidField = null;

                // Update status
                if (validatorName) {
                    $field.data(ns + '.result.' + validatorName, status);
                } else {
                    for (var v in this.options.fields[field].validators) {
                        $field.data(ns + '.result.' + v, status);
                    }
                }

                // Show/hide error elements and feedback icons
                $errors.attr('data-' + ns + '-result', status);

                switch (status) {
                    case this.STATUS_VALIDATING:
                        isValidField = null;
                        this.disableSubmitButtons(true);
                        $field.removeClass(this.options.control.valid).removeClass(this.options.control.invalid);
                        $parent.removeClass(this.options.row.valid).removeClass(this.options.row.invalid);
                        if ($icon) {
                            $icon.removeClass(this.options.icon.valid).removeClass(this.options.icon.invalid).addClass(this.options.icon.validating).show();
                        }
                        break;

                    case this.STATUS_INVALID:
                        isValidField = false;
                        this.disableSubmitButtons(true);
                        $field.removeClass(this.options.control.valid).addClass(this.options.control.invalid);
                        $parent.removeClass(this.options.row.valid).addClass(this.options.row.invalid);
                        if ($icon) {
                            $icon.removeClass(this.options.icon.valid).removeClass(this.options.icon.validating).addClass(this.options.icon.invalid).show();
                        }
                        break;

                    case this.STATUS_VALID:
                        var isValidating   = ($allErrors.filter('[data-' + ns + '-result="' + this.STATUS_VALIDATING +'"]').length > 0),
                            isNotValidated = ($allErrors.filter('[data-' + ns + '-result="' + this.STATUS_NOT_VALIDATED +'"]').length > 0);

                        // If the field is valid (passes all validators)
                        isValidField = (isValidating || isNotValidated)     // There are some validators that have not done
                                     ? null
                                     : ($allErrors.filter('[data-' + ns + '-result="' + this.STATUS_VALID +'"]').length === $allErrors.length); // All validators are completed

                        $field.removeClass(this.options.control.valid).removeClass(this.options.control.invalid);

                        if (isValidField === true) {
                            this.disableSubmitButtons(this.isValid() === false);
                            $field.addClass(this.options.control.valid);
                        } else if (isValidField === false) {
                            this.disableSubmitButtons(true);
                            $field.addClass(this.options.control.invalid);
                        }

                        if ($icon) {
                            $icon
                                .removeClass(this.options.icon.invalid).removeClass(this.options.icon.validating).removeClass(this.options.icon.valid)
                                .addClass(isValidField === null ? '' : (isValidField ? this.options.icon.valid
                                                                                     : (isValidating ? this.options.icon.validating : this.options.icon.invalid)))
                                .show();
                        }

                        var isValidContainer = this.isValidContainer($parent);
                        if (isValidContainer !== null) {
                            $parent.removeClass(this.options.row.valid).removeClass(this.options.row.invalid).addClass(isValidContainer ? this.options.row.valid : this.options.row.invalid);
                        }
                        break;

                    case this.STATUS_NOT_VALIDATED:
                    /* falls through */
                    default:
                        isValidField = null;
                        this.disableSubmitButtons(false);
                        $field.removeClass(this.options.control.valid).removeClass(this.options.control.invalid);
                        $parent.removeClass(this.options.row.valid).removeClass(this.options.row.invalid);
                        if ($icon) {
                            $icon.removeClass(this.options.icon.valid).removeClass(this.options.icon.invalid).removeClass(this.options.icon.validating).hide();
                        }
                        break;
                }

                if ($icon && ('tooltip' === container || 'popover' === container)) {
                    (isValidField === false)
                        // Only show the first error message
                        ? this._createTooltip($field, $allErrors.filter('[data-' + ns + '-result="' + that.STATUS_INVALID + '"]').eq(0).html(), container)
                        : this._destroyTooltip($field, container);
                } else {
                    (status === this.STATUS_INVALID) ? $errors.show() : $errors.hide();
                }

                // Trigger an event
                $field.trigger($.Event(this.options.events.fieldStatus), {
                    bv: this,   // Support backward
                    fv: this,
                    field: field,
                    element: $field,
                    status: status
                });
                this._onFieldValidated($field, validatorName);
            }

            return this;
        },

        /**
         * Validate the form
         *
         * @returns {FormValidation.Base}
         */
        validate: function() {
            if ($.isEmptyObject(this.options.fields)) {
                this._submit();
                return this;
            }
            this.disableSubmitButtons(true);

            this._submitIfValid = false;
            for (var field in this.options.fields) {
                this.validateField(field);
            }

            this._submit();
            this._submitIfValid = true;

            return this;
        },

        /**
         * Validate given field
         *
         * @param {String|jQuery} field The field name or field element
         * @returns {FormValidation.Base}
         */
        validateField: function(field) {
            var ns     = this._namespace,
                fields = $([]);
            switch (typeof field) {
                case 'object':
                    fields = field;
                    field  = field.attr('data-' + ns + '-field');
                    break;
                case 'string':
                    fields = this.getFieldElements(field);
                    break;
                default:
                    break;
            }

            if (fields.length === 0 || !this.options.fields[field] || this.options.fields[field].enabled === false) {
                return this;
            }

            var that       = this,
                type       = fields.attr('type'),
                total      = ('radio' === type || 'checkbox' === type) ? 1 : fields.length,
                updateAll  = ('radio' === type || 'checkbox' === type),
                validators = this.options.fields[field].validators,
                verbose    = this.isOptionEnabled(field, 'verbose'),
                validatorName,
                validateResult;

            for (var i = 0; i < total; i++) {
                var $field = fields.eq(i);
                if (this._isExcluded($field)) {
                    continue;
                }

                var stop = false;
                for (validatorName in validators) {
                    if ($field.data(ns + '.dfs.' + validatorName)) {
                        $field.data(ns + '.dfs.' + validatorName).reject();
                    }
                    if (stop) {
                        break;
                    }

                    // Don't validate field if it is already done
                    var result = $field.data(ns + '.result.' + validatorName);
                    if (result === this.STATUS_VALID || result === this.STATUS_INVALID) {
                        this._onFieldValidated($field, validatorName);
                        continue;
                    } else if (validators[validatorName].enabled === false) {
                        this.updateStatus(updateAll ? field : $field, this.STATUS_VALID, validatorName);
                        continue;
                    }

                    $field.data(ns + '.result.' + validatorName, this.STATUS_VALIDATING);
                    validateResult = FormValidation.Validator[validatorName].validate(this, $field, validators[validatorName]);

                    // validateResult can be a $.Deferred object ...
                    if ('object' === typeof validateResult && validateResult.resolve) {
                        this.updateStatus(updateAll ? field : $field, this.STATUS_VALIDATING, validatorName);
                        $field.data(ns + '.dfs.' + validatorName, validateResult);

                        validateResult.done(function($f, v, response) {
                            // v is validator name
                            $f.removeData(ns + '.dfs.' + v).data(ns + '.response.' + v, response);
                            if (response.message) {
                                that.updateMessage($f, v, response.message);
                            }

                            that.updateStatus(updateAll ? $f.attr('data-' + ns + '-field') : $f, response.valid ? that.STATUS_VALID : that.STATUS_INVALID, v);

                            if (response.valid && that._submitIfValid === true) {
                                // If a remote validator returns true and the form is ready to submit, then do it
                                that._submit();
                            } else if (!response.valid && !verbose) {
                                stop = true;
                            }
                        });
                    }
                    // ... or object { valid: true/false, message: 'dynamic message', otherKey: value, ... }
                    else if ('object' === typeof validateResult && validateResult.valid !== undefined) {
                        $field.data(ns + '.response.' + validatorName, validateResult);
                        if (validateResult.message) {
                            this.updateMessage(updateAll ? field : $field, validatorName, validateResult.message);
                        }
                        this.updateStatus(updateAll ? field : $field, validateResult.valid ? this.STATUS_VALID : this.STATUS_INVALID, validatorName);
                        if (!validateResult.valid && !verbose) {
                            break;
                        }
                    }
                    // ... or a boolean value
                    else if ('boolean' === typeof validateResult) {
                        $field.data(ns + '.response.' + validatorName, validateResult);
                        this.updateStatus(updateAll ? field : $field, validateResult ? this.STATUS_VALID : this.STATUS_INVALID, validatorName);
                        if (!validateResult && !verbose) {
                            break;
                        }
                    }
                }
            }

            return this;
        },

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Useful APIs which aren't used internally
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        /**
         * Add a new field
         *
         * @param {String|jQuery} field The field name or field element
         * @param {Object} [options] The validator rules
         * @returns {FormValidation.Base}
         */
        addField: function(field, options) {
            var ns     = this._namespace,
                fields = $([]);
            switch (typeof field) {
                case 'object':
                    fields = field;
                    field  = field.attr('data-' + ns + '-field') || field.attr('name');
                    break;
                case 'string':
                    delete this._cacheFields[field];
                    fields = this.getFieldElements(field);
                    break;
                default:
                    break;
            }

            fields.attr('data-' + ns + '-field', field);

            var type  = fields.attr('type'),
                total = ('radio' === type || 'checkbox' === type) ? 1 : fields.length;

            for (var i = 0; i < total; i++) {
                var $field = fields.eq(i);

                // Try to parse the options from HTML attributes
                var opts = this._parseOptions($field);
                opts = (opts === null) ? options : $.extend(true, options, opts);

                this.options.fields[field] = $.extend(true, this.options.fields[field], opts);

                // Update the cache
                this._cacheFields[field] = this._cacheFields[field] ? this._cacheFields[field].add($field) : $field;

                // Init the element
                this._initField(('checkbox' === type || 'radio' === type) ? field : $field);
            }

            this.disableSubmitButtons(false);
            // Trigger an event
            this.$form.trigger($.Event(this.options.events.fieldAdded), {
                field: field,
                element: fields,
                options: this.options.fields[field]
            });

            return this;
        },

        /**
         * Destroy the plugin
         * It will remove all error messages, feedback icons and turn off the events
         */
        destroy: function() {
            var ns = this._namespace, i, field, fields, $field, validator, $icon, row;

            // Destroy the validators first
            for (field in this.options.fields) {
                fields = this.getFieldElements(field);
                for (i = 0; i < fields.length; i++) {
                    $field = fields.eq(i);
                    for (validator in this.options.fields[field].validators) {
                        if ($field.data(ns + '.dfs.' + validator)) {
                            $field.data(ns + '.dfs.' + validator).reject();
                        }
                        $field.removeData(ns + '.result.' + validator)
                              .removeData(ns + '.response.' + validator)
                              .removeData(ns + '.dfs.' + validator);

                        // Destroy the validator
                        if ('function' === typeof FormValidation.Validator[validator].destroy) {
                            FormValidation.Validator[validator].destroy(this, $field, this.options.fields[field].validators[validator]);
                        }
                    }
                }
            }

            // Remove messages and icons
            for (field in this.options.fields) {
                fields = this.getFieldElements(field);
                row    = this.options.fields[field].row || this.options.row.selector;
                for (i = 0; i < fields.length; i++) {
                    $field = fields.eq(i);
                    $field
                        // Remove all error messages
                        .data(ns + '.messages')
                            .find('.' + this.options.err.clazz.split(' ').join('.') + '[data-' + ns + '-validator][data-' + ns + '-for="' + field + '"]').remove().end()
                            .end()
                        .removeData(ns + '.messages')
                        // Remove feedback classes
                        .closest(row)
                            .removeClass(this.options.row.valid)
                            .removeClass(this.options.row.invalid)
                            .removeClass(this.options.row.feedback)
                            .end()
                        // Turn off events
                        .off('.' + ns)
                        .removeAttr('data-' + ns + '-field');

                    // Remove feedback icons, tooltip/popover container
                    // Support backward
                    var container = ('function' === typeof (this.options.fields[field].container || this.options.fields[field].err || this.options.err.container))
                                    ? (this.options.fields[field].container || this.options.fields[field].err || this.options.err.container).call(this, $field, this)
                                    : (this.options.fields[field].container || this.options.fields[field].err || this.options.err.container);
                    if ('tooltip' === container || 'popover' === container) {
                        this._destroyTooltip($field, container);
                    }

                    $icon = $field.data(ns + '.icon');
                    if ($icon) {
                        $icon.remove();
                    }
                    $field.removeData(ns + '.icon')
                          // It's safe to remove trigger data here, because it might be used when destroying the validator
                          .removeData(ns + '.trigger');
                }
            }

            // Destroy the add-ons
            for (var addOn in this.options.addOns) {
                if ('function' === typeof FormValidation.AddOn[addOn].destroy) {
                    FormValidation.AddOn[addOn].destroy(this, this.options.addOns[addOn]);
                }
            }

            this.disableSubmitButtons(false);   // Enable submit buttons
            this.$hiddenButton.remove();        // Remove the hidden button

            this.$form
                .removeClass(this.options.elementClass)
                .off('.' + ns)
                .removeData('bootstrapValidator')   // Support backward
                .removeData('formValidation')
                // Remove generated hidden elements
                .find('[data-' + ns + '-submit-hidden]').remove().end()
                .find('[type="submit"]')
                    .off('click.' + ns);
        },

        /**
         * Enable/Disable all validators to given field
         *
         * @param {String} field The field name
         * @param {Boolean} enabled Enable/Disable field validators
         * @param {String} [validatorName] The validator name. If null, all validators will be enabled/disabled
         * @returns {FormValidation.Base}
         */
        enableFieldValidators: function(field, enabled, validatorName) {
            var validators = this.options.fields[field].validators;

            // Enable/disable particular validator
            if (validatorName
                && validators
                && validators[validatorName] && validators[validatorName].enabled !== enabled)
            {
                this.options.fields[field].validators[validatorName].enabled = enabled;
                this.updateStatus(field, this.STATUS_NOT_VALIDATED, validatorName);
            }
            // Enable/disable all validators
            else if (!validatorName && this.options.fields[field].enabled !== enabled) {
                this.options.fields[field].enabled = enabled;
                for (var v in validators) {
                    this.enableFieldValidators(field, enabled, v);
                }
            }

            return this;
        },

        /**
         * Some validators have option which its value is dynamic.
         * For example, the zipCode validator has the country option which might be changed dynamically by a select element.
         *
         * @param {jQuery|String} field The field name or element
         * @param {String|Function} option The option which can be determined by:
         * - a string
         * - name of field which defines the value
         * - name of function which returns the value
         * - a function returns the value
         *
         * The callback function has the format of
         *      callback: function(value, validator, $field) {
         *          // value is the value of field
         *          // validator is the BootstrapValidator instance
         *          // $field is the field element
         *      }
         *
         * @returns {String}
         */
        getDynamicOption: function(field, option) {
            var $field = ('string' === typeof field) ? this.getFieldElements(field) : field,
                value  = $field.val();

            // Option can be determined by
            // ... a function
            if ('function' === typeof option) {
                return FormValidation.Helper.call(option, [value, this, $field]);
            }
            // ... value of other field
            else if ('string' === typeof option) {
                var $f = this.getFieldElements(option);
                if ($f.length) {
                    return $f.val();
                }
                // ... return value of callback
                else {
                    return FormValidation.Helper.call(option, [value, this, $field]) || option;
                }
            }

            return null;
        },

        /**
         * Get the form element
         *
         * @returns {jQuery}
         */
        getForm: function() {
            return this.$form;
        },

        /**
         * Get the list of invalid fields
         *
         * @returns {jQuery[]}
         */
        getInvalidFields: function() {
            return this.$invalidFields;
        },

        /**
         * Get the current locale
         *
         * @return {String}
         */
        getLocale: function() {
            return this.options.locale;
        },

        /**
         * Get the error messages
         *
         * @param {String|jQuery} [field] The field name or field element
         * If the field is not defined, the method returns all error messages of all fields
         * @param {String} [validator] The name of validator
         * If the validator is not defined, the method returns error messages of all validators
         * @returns {String[]}
         */
        getMessages: function(field, validator) {
            var that     = this,
                ns       = this._namespace,
                messages = [],
                $fields  = $([]);

            switch (true) {
                case (field && 'object' === typeof field):
                    $fields = field;
                    break;
                case (field && 'string' === typeof field):
                    var f = this.getFieldElements(field);
                    if (f.length > 0) {
                        var type = f.attr('type');
                        $fields = ('radio' === type || 'checkbox' === type) ? f.eq(0) : f;
                    }
                    break;
                default:
                    $fields = this.$invalidFields;
                    break;
            }

            var filter = validator ? '[data-' + ns + '-validator="' + validator + '"]' : '';
            $fields.each(function() {
                messages = messages.concat(
                    $(this)
                        .data(ns + '.messages')
                        .find('.' + that.options.err.clazz + '[data-' + ns + '-for="' + $(this).attr('data-' + ns + '-field') + '"][data-' + ns + '-result="' + that.STATUS_INVALID + '"]' + filter)
                        .map(function() {
                            var v = $(this).attr('data-' + ns + '-validator'),
                                f = $(this).attr('data-' + ns + '-for');
                            return (that.options.fields[f].validators[v].enabled === false) ? '' : $(this).html();
                        })
                        .get()
                );
            });

            return messages;
        },

        /**
         * Returns the clicked submit button
         *
         * @returns {jQuery}
         */
        getSubmitButton: function() {
            return this.$submitButton;
        },

        /**
         * Remove a given field
         *
         * @param {String|jQuery} field The field name or field element
         * @returns {FormValidation.Base}
         */
        removeField: function(field) {
            var ns     = this._namespace,
                fields = $([]);
            switch (typeof field) {
                case 'object':
                    fields = field;
                    field  = field.attr('data-' + ns + '-field') || field.attr('name');
                    fields.attr('data-' + ns + '-field', field);
                    break;
                case 'string':
                    fields = this.getFieldElements(field);
                    break;
                default:
                    break;
            }

            if (fields.length === 0) {
                return this;
            }

            var type  = fields.attr('type'),
                total = ('radio' === type || 'checkbox' === type) ? 1 : fields.length;

            for (var i = 0; i < total; i++) {
                var $field = fields.eq(i);

                // Remove from the list of invalid fields
                this.$invalidFields = this.$invalidFields.not($field);

                // Update the cache
                this._cacheFields[field] = this._cacheFields[field].not($field);
            }

            if (!this._cacheFields[field] || this._cacheFields[field].length === 0) {
                delete this.options.fields[field];
            }
            if ('checkbox' === type || 'radio' === type) {
                this._initField(field);
            }

            this.disableSubmitButtons(false);
            // Trigger an event
            this.$form.trigger($.Event(this.options.events.fieldRemoved), {
                field: field,
                element: fields
            });

            return this;
        },

        /**
         * Reset given field
         *
         * @param {String|jQuery} field The field name or field element
         * @param {Boolean} [resetValue] If true, the method resets field value to empty or remove checked/selected attribute (for radio/checkbox)
         * @returns {FormValidation.Base}
         */
        resetField: function(field, resetValue) {
            var ns      = this._namespace,
                $fields = $([]);
            switch (typeof field) {
                case 'object':
                    $fields = field;
                    field   = field.attr('data-' + ns + '-field');
                    break;
                case 'string':
                    $fields = this.getFieldElements(field);
                    break;
                default:
                    break;
            }

            var total = $fields.length;
            if (this.options.fields[field]) {
                for (var i = 0; i < total; i++) {
                    for (var validator in this.options.fields[field].validators) {
                        $fields.eq(i).removeData(ns + '.dfs.' + validator);
                    }
                }
            }

            // Mark field as not validated yet
            this.updateStatus(field, this.STATUS_NOT_VALIDATED);

            if (resetValue) {
                var type = $fields.attr('type');
                ('radio' === type || 'checkbox' === type) ? $fields.prop('checked', false).removeAttr('selected') : $fields.val('');
            }

            return this;
        },

        /**
         * Reset the form
         *
         * @param {Boolean} [resetValue] If true, the method resets field value to empty or remove checked/selected attribute (for radio/checkbox)
         * @returns {FormValidation.Base}
         */
        resetForm: function(resetValue) {
            for (var field in this.options.fields) {
                this.resetField(field, resetValue);
            }

            this.$invalidFields = $([]);
            this.$submitButton  = null;

            // Enable submit buttons
            this.disableSubmitButtons(false);

            return this;
        },

        /**
         * Revalidate given field
         * It's used when you need to revalidate the field which its value is updated by other plugin
         *
         * @param {String|jQuery} field The field name of field element
         * @returns {FormValidation.Base}
         */
        revalidateField: function(field) {
            this.updateStatus(field, this.STATUS_NOT_VALIDATED)
                .validateField(field);

            return this;
        },

        /**
         * Set the locale
         *
         * @param {String} locale The locale in format of countrycode_LANGUAGECODE
         * @returns {FormValidation.Base}
         */
        setLocale: function(locale) {
            this.options.locale = locale;
            this.$form.trigger($.Event(this.options.events.localeChanged), {
                locale: locale,
                bv: this,   // Support backward
                fv: this
            });

            return this;
        },

        /**
         * Update the option of a specific validator
         *
         * @param {String|jQuery} field The field name or field element
         * @param {String} validator The validator name
         * @param {String} option The option name
         * @param {String} value The value to set
         * @returns {FormValidation.Base}
         */
        updateOption: function(field, validator, option, value) {
            var ns = this._namespace;
            if ('object' === typeof field) {
                field = field.attr('data-' + ns + '-field');
            }
            if (this.options.fields[field] && this.options.fields[field].validators[validator]) {
                this.options.fields[field].validators[validator][option] = value;
                this.updateStatus(field, this.STATUS_NOT_VALIDATED, validator);
            }

            return this;
        },

        /**
         * Validate given container
         * It can be used with isValidContainer() when you want to work with wizard form
         *
         * @param {String|jQuery} container The container selector or element
         * @returns {FormValidation.Base}
         */
        validateContainer: function(container) {
            var that       = this,
                ns         = this._namespace,
                fields     = [],
                $container = ('string' === typeof container) ? $(container) : container;
            if ($container.length === 0) {
                return this;
            }

            $container.find('[data-' + ns + '-field]').each(function() {
                var $field = $(this);
                if (!that._isExcluded($field)) {
                    fields.push($field);
                }
            });

            var total = fields.length;
            for (var i = 0; i < total; i++) {
                this.validateField(fields[i]);
            }

            return this;
        }
    };

    // Plugin definition
    $.fn.formValidation = function(option) {
        var params = arguments;
        return this.each(function() {
            var $this   = $(this),
                data    = $this.data('formValidation'),
                options = 'object' === typeof option && option;
            if (!data) {
                var framework = (options.framework || $this.attr('data-fv-framework') || 'bootstrap').toLowerCase(),
                    clazz     = framework.substr(0, 1).toUpperCase() + framework.substr(1);

                if (typeof FormValidation.Framework[clazz] === 'undefined') {
                    throw new Error('The class FormValidation.Framework.' + clazz + ' is not implemented');
                }

                data = new FormValidation.Framework[clazz](this, options);
                $this.addClass('fv-form-' + framework)
                     .data('formValidation', data);
            }

            // Allow to call plugin method
            if ('string' === typeof option) {
                data[option].apply(data, Array.prototype.slice.call(params, 1));
            }
        });
    };

    $.fn.formValidation.Constructor = FormValidation.Base;

    // The default options
    // Sorted in alphabetical order
    $.fn.formValidation.DEFAULT_OPTIONS = {
        // The first invalid field will be focused automatically
        autoFocus: true,

        // Support declarative usage (setting options via HTML 5 attributes)
        // Setting to false can improve the performance
        declarative: true,

        // The form CSS class
        elementClass: 'fv-form',

        // Use custom event name to avoid window.onerror being invoked by jQuery
        // See #630
        events: {
            // Support backward
            formInit: 'init.form.fv',
            formError: 'err.form.fv',
            formSuccess: 'success.form.fv',
            fieldAdded: 'added.field.fv',
            fieldRemoved: 'removed.field.fv',
            fieldInit: 'init.field.fv',
            fieldError: 'err.field.fv',
            fieldSuccess: 'success.field.fv',
            fieldStatus: 'status.field.fv',
            localeChanged: 'changed.locale.fv',
            validatorError: 'err.validator.fv',
            validatorSuccess: 'success.validator.fv'
        },

        // Indicate fields which won't be validated
        // By default, the plugin will not validate the following kind of fields:
        // - disabled
        // - hidden
        // - invisible
        //
        // The setting consists of jQuery filters. Accept 3 formats:
        // - A string. Use a comma to separate filter
        // - An array. Each element is a filter
        // - An array. Each element can be a callback function
        //      function($field, validator) {
        //          $field is jQuery object representing the field element
        //          validator is the BootstrapValidator instance
        //          return true or false;
        //      }
        //
        // The 3 following settings are equivalent:
        //
        // 1) ':disabled, :hidden, :not(:visible)'
        // 2) [':disabled', ':hidden', ':not(:visible)']
        // 3) [':disabled', ':hidden', function($field) {
        //        return !$field.is(':visible');
        //    }]
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        // Map the field name with validator rules
        fields: null,

        // Live validating option
        // Can be one of 3 values:
        // - enabled: The plugin validates fields as soon as they are changed
        // - disabled: Disable the live validating. The error messages are only shown after the form is submitted
        // - submitted: The live validating is enabled after the form is submitted
        live: 'enabled',

        // Locale in the format of languagecode_COUNTRYCODE
        locale: 'en_US',

        // Default invalid message
        message: 'This value is not valid',

        // The field will not be live validated if its length is less than this number of characters
        threshold: null,

        // Whether to be verbose when validating a field or not.
        // Possible values:
        // - true:  when a field has multiple validators, all of them will be checked, and respectively - if errors occur in
        //          multiple validators, all of them will be displayed to the user
        // - false: when a field has multiple validators, validation for this field will be terminated upon the first encountered error.
        //          Thus, only the very first error message related to this field will be displayed to the user
        verbose: true,

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // These options mostly are overridden by specific framework
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        button: {
            // The submit buttons selector
            // These buttons will be disabled to prevent the valid form from multiple submissions
            selector: '[type="submit"]',

            // The disabled class
            disabled: ''
        },

        control: {
            // The CSS class for valid control
            valid: '',

            // The CSS class for invalid control
            invalid: ''
        },

        err: {
            // The CSS class of each message element
            clazz: '',

            // The error messages container. It can be:
            // - 'tooltip' if you want to use Bootstrap tooltip to show error messages
            // - 'popover' if you want to use Bootstrap popover to show error messages
            // - a CSS selector indicating the container
            // In the first two cases, since the tooltip/popover should be small enough, the plugin only shows only one error message
            // You also can define the message container for particular field
            container: null,

            // Used to determine where the messages are placed
            parent: null
        },

        // Shows ok/error/loading icons based on the field validity.
        icon: {
            valid: null,
            invalid: null,
            validating: null,
            feedback: ''
        },

        row: {
            // The CSS selector for indicating the element consists of the field
            // You should adjust this option if your form group consists of many fields which not all of them need to be validated
            selector: null,
            valid: '',
            invalid: '',
            feedback: ''
        }
    };
}(jQuery));
;(function($) {
    // Helper methods, which can be used in validator class
    FormValidation.Helper = {
        /**
         * Execute a callback function
         *
         * @param {String|Function} functionName Can be
         * - name of global function
         * - name of namespace function (such as A.B.C)
         * - a function
         * @param {Array} args The callback arguments
         */
        call: function(functionName, args) {
            if ('function' === typeof functionName) {
                return functionName.apply(this, args);
            } else if ('string' === typeof functionName) {
                if ('()' === functionName.substring(functionName.length - 2)) {
                    functionName = functionName.substring(0, functionName.length - 2);
                }
                var ns      = functionName.split('.'),
                    func    = ns.pop(),
                    context = window;
                for (var i = 0; i < ns.length; i++) {
                    context = context[ns[i]];
                }

                return (typeof context[func] === 'undefined') ? null : context[func].apply(this, args);
            }
        },

        /**
         * Validate a date
         *
         * @param {Number} year The full year in 4 digits
         * @param {Number} month The month number
         * @param {Number} day The day number
         * @param {Boolean} [notInFuture] If true, the date must not be in the future
         * @returns {Boolean}
         */
        date: function(year, month, day, notInFuture) {
            if (isNaN(year) || isNaN(month) || isNaN(day)) {
                return false;
            }
            if (day.length > 2 || month.length > 2 || year.length > 4) {
                return false;
            }

            day   = parseInt(day, 10);
            month = parseInt(month, 10);
            year  = parseInt(year, 10);

            if (year < 1000 || year > 9999 || month <= 0 || month > 12) {
                return false;
            }
            var numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            // Update the number of days in Feb of leap year
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                numDays[1] = 29;
            }

            // Check the day
            if (day <= 0 || day > numDays[month - 1]) {
                return false;
            }

            if (notInFuture === true) {
                var currentDate  = new Date(),
                    currentYear  = currentDate.getFullYear(),
                    currentMonth = currentDate.getMonth(),
                    currentDay   = currentDate.getDate();
                return (year < currentYear
                || (year === currentYear && month - 1 < currentMonth)
                || (year === currentYear && month - 1 === currentMonth && day < currentDay));
            }

            return true;
        },

        /**
         * Format a string
         * It's used to format the error message
         * format('The field must between %s and %s', [10, 20]) = 'The field must between 10 and 20'
         *
         * @param {String} message
         * @param {Array} parameters
         * @returns {String}
         */
        format: function(message, parameters) {
            if (!$.isArray(parameters)) {
                parameters = [parameters];
            }

            for (var i in parameters) {
                message = message.replace('%s', parameters[i]);
            }

            return message;
        },

        /**
         * Implement Luhn validation algorithm
         * Credit to https://gist.github.com/ShirtlessKirk/2134376
         *
         * @see http://en.wikipedia.org/wiki/Luhn
         * @param {String} value
         * @returns {Boolean}
         */
        luhn: function(value) {
            var length  = value.length,
                mul     = 0,
                prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
                sum     = 0;

            while (length--) {
                sum += prodArr[mul][parseInt(value.charAt(length), 10)];
                mul ^= 1;
            }

            return (sum % 10 === 0 && sum > 0);
        },

        /**
         * Implement modulus 11, 10 (ISO 7064) algorithm
         *
         * @param {String} value
         * @returns {Boolean}
         */
        mod11And10: function(value) {
            var check  = 5,
                length = value.length;
            for (var i = 0; i < length; i++) {
                check = (((check || 10) * 2) % 11 + parseInt(value.charAt(i), 10)) % 10;
            }
            return (check === 1);
        },

        /**
         * Implements Mod 37, 36 (ISO 7064) algorithm
         * Usages:
         * mod37And36('A12425GABC1234002M')
         * mod37And36('002006673085', '0123456789')
         *
         * @param {String} value
         * @param {String} [alphabet]
         * @returns {Boolean}
         */
        mod37And36: function(value, alphabet) {
            alphabet = alphabet || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var modulus = alphabet.length,
                length  = value.length,
                check   = Math.floor(modulus / 2);
            for (var i = 0; i < length; i++) {
                check = (((check || modulus) * 2) % (modulus + 1) + alphabet.indexOf(value.charAt(i))) % modulus;
            }
            return (check === 1);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            base64: {
                'default': 'Please enter a valid base 64 encoded'
            }
        }
    });

    FormValidation.Validator.base64 = {
        /**
         * Return true if the input value is a base 64 encoded string.
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'base64');
            if (value === '') {
                return true;
            }

            return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(value);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            between: {
                'default': 'Please enter a value between %s and %s',
                notInclusive: 'Please enter a value between %s and %s strictly'
            }
        }
    });

    FormValidation.Validator.between = {
        html5Attributes: {
            message: 'message',
            min: 'min',
            max: 'max',
            inclusive: 'inclusive'
        },

        enableByHtml5: function($field) {
            if ('range' === $field.attr('type')) {
                return {
                    min: $field.attr('min'),
                    max: $field.attr('max')
                };
            }

            return false;
        },

        /**
         * Return true if the input value is between (strictly or not) two given numbers
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - min
         * - max
         *
         * The min, max keys define the number which the field value compares to. min, max can be
         *      - A number
         *      - Name of field which its value defines the number
         *      - Name of callback function that returns the number
         *      - A callback function that returns the number
         *
         * - inclusive [optional]: Can be true or false. Default is true
         * - message: The invalid message
         * @returns {Boolean|Object}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'between');
            if (value === '') {
                return true;
            }

			value = this._format(value);
            if (!$.isNumeric(value)) {
                return false;
            }

            var locale   = validator.getLocale(),
                min      = $.isNumeric(options.min) ? options.min : validator.getDynamicOption($field, options.min),
                max      = $.isNumeric(options.max) ? options.max : validator.getDynamicOption($field, options.max),
                minValue = this._format(min),
                maxValue = this._format(max);

            value = parseFloat(value);
			return (options.inclusive === true || options.inclusive === undefined)
                    ? {
                        valid: value >= minValue && value <= maxValue,
                        message: FormValidation.Helper.format(options.message || FormValidation.I18n[locale].between['default'], [min, max])
                    }
                    : {
                        valid: value > minValue  && value <  maxValue,
                        message: FormValidation.Helper.format(options.message || FormValidation.I18n[locale].between.notInclusive, [min, max])
                    };
        },

        _format: function(value) {
            return (value + '').replace(',', '.');
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            bic: {
                'default': 'Please enter a valid BIC number'
            }
        }
    });

    FormValidation.Validator.bic = {
        /**
         * Validate an Business Identifier Code (BIC), also known as ISO 9362, SWIFT-BIC, SWIFT ID or SWIFT code
         *
         * For more information see http://en.wikipedia.org/wiki/ISO_9362
         *
         * @todo The 5 and 6 characters are an ISO 3166-1 country code, this could also be validated
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Object}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'bic');
            if (value === '') {
                return true;
            }
            return /^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$/.test(value);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.Validator.blank = {
        /**
         * Placeholder validator that can be used to display a custom validation message
         * returned from the server
         * Example:
         *
         * (1) a "blank" validator is applied to an input field.
         * (2) data is entered via the UI that is unable to be validated client-side.
         * (3) server returns a 400 with JSON data that contains the field that failed
         *     validation and an associated message.
         * (4) ajax 400 call handler does the following:
         *
         *      bv.updateMessage(field, 'blank', errorMessage);
         *      bv.updateStatus(field, 'INVALID');
         *
         * @see https://github.com/formvalidation/formvalidation/issues/542
         * @see https://github.com/formvalidation/formvalidation/pull/666
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            return true;
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            callback: {
                'default': 'Please enter a valid value'
            }
        }
    });

    FormValidation.Validator.callback = {
        html5Attributes: {
            message: 'message',
            callback: 'callback'
        },

        /**
         * Return result from the callback method
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - callback: The callback method that passes 2 parameters:
         *      callback: function(fieldValue, validator, $field) {
         *          // fieldValue is the value of field
         *          // validator is instance of BootstrapValidator
         *          // $field is the field element
         *      }
         * - message: The invalid message
         * @returns {Deferred}
         */
        validate: function(validator, $field, options) {
            var value  = validator.getFieldValue($field, 'callback'),
                dfd    = new $.Deferred(),
                result = { valid: true };

            if (options.callback) {
                var response = FormValidation.Helper.call(options.callback, [value, validator, $field]);
                result = ('boolean' === typeof response) ? { valid: response } : response;
            }

            dfd.resolve($field, 'callback', result);
            return dfd;
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            choice: {
                'default': 'Please enter a valid value',
                less: 'Please choose %s options at minimum',
                more: 'Please choose %s options at maximum',
                between: 'Please choose %s - %s options'
            }
        }
    });

    FormValidation.Validator.choice = {
        html5Attributes: {
            message: 'message',
            min: 'min',
            max: 'max'
        },

        /**
         * Check if the number of checked boxes are less or more than a given number
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of following keys:
         * - min
         * - max
         *
         * At least one of two keys is required
         * The min, max keys define the number which the field value compares to. min, max can be
         *      - A number
         *      - Name of field which its value defines the number
         *      - Name of callback function that returns the number
         *      - A callback function that returns the number
         *
         * - message: The invalid message
         * @returns {Object}
         */
        validate: function(validator, $field, options) {
            var locale     = validator.getLocale(),
                ns         = validator.getNamespace(),
                numChoices = $field.is('select')
                            ? validator.getFieldElements($field.attr('data-' + ns + '-field')).find('option').filter(':selected').length
                            : validator.getFieldElements($field.attr('data-' + ns + '-field')).filter(':checked').length,
                min        = options.min ? ($.isNumeric(options.min) ? options.min : validator.getDynamicOption($field, options.min)) : null,
                max        = options.max ? ($.isNumeric(options.max) ? options.max : validator.getDynamicOption($field, options.max)) : null,
                isValid    = true,
                message    = options.message || FormValidation.I18n[locale].choice['default'];

            if ((min && numChoices < parseInt(min, 10)) || (max && numChoices > parseInt(max, 10))) {
                isValid = false;
            }

            switch (true) {
                case (!!min && !!max):
                    message = FormValidation.Helper.format(options.message || FormValidation.I18n[locale].choice.between, [parseInt(min, 10), parseInt(max, 10)]);
                    break;

                case (!!min):
                    message = FormValidation.Helper.format(options.message || FormValidation.I18n[locale].choice.less, parseInt(min, 10));
                    break;

                case (!!max):
                    message = FormValidation.Helper.format(options.message || FormValidation.I18n[locale].choice.more, parseInt(max, 10));
                    break;

                default:
                    break;
            }

            return { valid: isValid, message: message };
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            color: {
                'default': 'Please enter a valid color'
            }
        }
    });

    FormValidation.Validator.color = {
        html5Attributes: {
            message: 'message',
            type: 'type'
        },

        enableByHtml5: function($field) {
            return ('color' === $field.attr('type'));
        },

        SUPPORTED_TYPES: [
            'hex', 'rgb', 'rgba', 'hsl', 'hsla', 'keyword'
        ],

        KEYWORD_COLORS: [
            // Colors start with A
            'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure',
            // B
            'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood',
            // C
            'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan',
            // D
            'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta',
            'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue',
            'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray',
            'dimgrey', 'dodgerblue',
            // F
            'firebrick', 'floralwhite', 'forestgreen', 'fuchsia',
            // G
            'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey',
            // H
            'honeydew', 'hotpink',
            // I
            'indianred', 'indigo', 'ivory',
            // K
            'khaki',
            // L
            'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan',
            'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen',
            'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen',
            'linen',
            // M
            'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen',
            'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream',
            'mistyrose', 'moccasin',
            // N
            'navajowhite', 'navy',
            // O
            'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid',
            // P
            'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink',
            'plum', 'powderblue', 'purple',
            // R
            'red', 'rosybrown', 'royalblue',
            // S
            'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue',
            'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue',
            // T
            'tan', 'teal', 'thistle', 'tomato', 'transparent', 'turquoise',
            // V
            'violet',
            // W
            'wheat', 'white', 'whitesmoke',
            // Y
            'yellow', 'yellowgreen'
        ],

        /**
         * Return true if the input value is a valid color
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * - type: The array of valid color types
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'color');
            if (value === '') {
                return true;
            }

            // Only accept 6 hex character values due to the HTML 5 spec
            // See http://www.w3.org/TR/html-markup/input.color.html#input.color.attrs.value
            if (this.enableByHtml5($field)) {
                return /^#[0-9A-F]{6}$/i.test(value);
            }

            var types = options.type || this.SUPPORTED_TYPES;
            if (!$.isArray(types)) {
                types = types.replace(/s/g, '').split(',');
            }

            var method,
                type,
                isValid = false;

            for (var i = 0; i < types.length; i++) {
                type    = types[i];
                method  = '_' + type.toLowerCase();
                isValid = isValid || this[method](value);
                if (isValid) {
                    return true;
                }
            }

            return false;
        },

        _hex: function(value) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value);
        },

        _hsl: function(value) {
            return /^hsl\((\s*(-?\d+)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*)\)$/.test(value);
        },

        _hsla: function(value) {
            return /^hsla\((\s*(-?\d+)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*,){2}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/.test(value);
        },

        _keyword: function(value) {
            return $.inArray(value, this.KEYWORD_COLORS) >= 0;
        },

        _rgb: function(value) {
            var regexInteger = /^rgb\((\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*,){2}(\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*)\)$/,
                regexPercent = /^rgb\((\s*(\b(0?\d{1,2}|100)\b%)\s*,){2}(\s*(\b(0?\d{1,2}|100)\b%)\s*)\)$/;
            return regexInteger.test(value) || regexPercent.test(value);
        },

        _rgba: function(value) {
            var regexInteger = /^rgba\((\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*,){3}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/,
                regexPercent = /^rgba\((\s*(\b(0?\d{1,2}|100)\b%)\s*,){3}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/;
            return regexInteger.test(value) || regexPercent.test(value);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            creditCard: {
                'default': 'Please enter a valid credit card number'
            }
        }
    });

    FormValidation.Validator.creditCard = {
        /**
         * Return true if the input value is valid credit card number
         * Based on https://gist.github.com/DiegoSalazar/4075533
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} [options] Can consist of the following key:
         * - message: The invalid message
         * @returns {Boolean|Object}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'creditCard');
            if (value === '') {
                return true;
            }

            // Accept only digits, dashes or spaces
            if (/[^0-9-\s]+/.test(value)) {
                return false;
            }
            value = value.replace(/\D/g, '');

            if (!FormValidation.Helper.luhn(value)) {
                return false;
            }

            // Validate the card number based on prefix (IIN ranges) and length
            var cards = {
                AMERICAN_EXPRESS: {
                    length: [15],
                    prefix: ['34', '37']
                },
                DINERS_CLUB: {
                    length: [14],
                    prefix: ['300', '301', '302', '303', '304', '305', '36']
                },
                DINERS_CLUB_US: {
                    length: [16],
                    prefix: ['54', '55']
                },
                DISCOVER: {
                    length: [16],
                    prefix: ['6011', '622126', '622127', '622128', '622129', '62213',
                             '62214', '62215', '62216', '62217', '62218', '62219',
                             '6222', '6223', '6224', '6225', '6226', '6227', '6228',
                             '62290', '62291', '622920', '622921', '622922', '622923',
                             '622924', '622925', '644', '645', '646', '647', '648',
                             '649', '65']
                },
                JCB: {
                    length: [16],
                    prefix: ['3528', '3529', '353', '354', '355', '356', '357', '358']
                },
                LASER: {
                    length: [16, 17, 18, 19],
                    prefix: ['6304', '6706', '6771', '6709']
                },
                MAESTRO: {
                    length: [12, 13, 14, 15, 16, 17, 18, 19],
                    prefix: ['5018', '5020', '5038', '6304', '6759', '6761', '6762', '6763', '6764', '6765', '6766']
                },
                MASTERCARD: {
                    length: [16],
                    prefix: ['51', '52', '53', '54', '55']
                },
                SOLO: {
                    length: [16, 18, 19],
                    prefix: ['6334', '6767']
                },
                UNIONPAY: {
                    length: [16, 17, 18, 19],
                    prefix: ['622126', '622127', '622128', '622129', '62213', '62214',
                             '62215', '62216', '62217', '62218', '62219', '6222', '6223',
                             '6224', '6225', '6226', '6227', '6228', '62290', '62291',
                             '622920', '622921', '622922', '622923', '622924', '622925']
                },
                VISA: {
                    length: [16],
                    prefix: ['4']
                }
            };

            var type, i;
            for (type in cards) {
                for (i in cards[type].prefix) {
                    if (value.substr(0, cards[type].prefix[i].length) === cards[type].prefix[i]     // Check the prefix
                        && $.inArray(value.length, cards[type].length) !== -1)                      // and length
                    {
                        return {
                            valid: true,
                            type: type
                        };
                    }
                }
            }

            return false;
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            cusip: {
                'default': 'Please enter a valid CUSIP number'
            }
        }
    });

    FormValidation.Validator.cusip = {
        /**
         * Validate a CUSIP number
         * Examples:
         * - Valid: 037833100, 931142103, 14149YAR8, 126650BG6
         * - Invalid: 31430F200, 022615AC2
         *
         * @see http://en.wikipedia.org/wiki/CUSIP
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} [options] Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'cusip');
            if (value === '') {
                return true;
            }

            value = value.toUpperCase();
            if (!/^[0-9A-Z]{9}$/.test(value)) {
                return false;
            }

            var converted = $.map(value.split(''), function(item) {
                                var code = item.charCodeAt(0);
                                return (code >= 'A'.charCodeAt(0) && code <= 'Z'.charCodeAt(0))
                                            // Replace A, B, C, ..., Z with 10, 11, ..., 35
                                            ? (code - 'A'.charCodeAt(0) + 10)
                                            : item;
                            }),
                length    = converted.length,
                sum       = 0;
            for (var i = 0; i < length - 1; i++) {
                var num = parseInt(converted[i], 10);
                if (i % 2 !== 0) {
                    num *= 2;
                }
                if (num > 9) {
                    num -= 9;
                }
                sum += num;
            }

            sum = (10 - (sum % 10)) % 10;
            return sum === parseInt(converted[length - 1], 10);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            cvv: {
                'default': 'Please enter a valid CVV number'
            }
        }
    });

    FormValidation.Validator.cvv = {
        html5Attributes: {
            message: 'message',
            ccfield: 'creditCardField'
        },

        /**
         * Bind the validator on the live change of the credit card field
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of the following key:
         * - creditCardField: The credit card number field
         */
        init: function(validator, $field, options) {
            if (options.creditCardField) {
                var creditCardField = validator.getFieldElements(options.creditCardField);
                validator.onLiveChange(creditCardField, 'live_cvv', function() {
                    var status = validator.getStatus($field, 'cvv');
                    if (status !== validator.STATUS_NOT_VALIDATED) {
                        validator.revalidateField($field);
                    }
                });
            }
        },

        /**
         * Unbind the validator on the live change of the credit card field
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of the following key:
         * - creditCardField: The credit card number field
         */
        destroy: function(validator, $field, options) {
            if (options.creditCardField) {
                var creditCardField = validator.getFieldElements(options.creditCardField);
                validator.offLiveChange(creditCardField, 'live_cvv');
            }
        },

        /**
         * Return true if the input value is a valid CVV number.
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - creditCardField: The credit card number field. It can be null
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'cvv');
            if (value === '') {
                return true;
            }

            if (!/^[0-9]{3,4}$/.test(value)) {
                return false;
            }

            if (!options.creditCardField) {
                return true;
            }

            // Get the credit card number
            var creditCard = validator.getFieldElements(options.creditCardField).val();
            if (creditCard === '') {
                return true;
            }
            
            creditCard = creditCard.replace(/\D/g, '');

            // Supported credit card types
            var cards = {
                AMERICAN_EXPRESS: {
                    length: [15],
                    prefix: ['34', '37']
                },
                DINERS_CLUB: {
                    length: [14],
                    prefix: ['300', '301', '302', '303', '304', '305', '36']
                },
                DINERS_CLUB_US: {
                    length: [16],
                    prefix: ['54', '55']
                },
                DISCOVER: {
                    length: [16],
                    prefix: ['6011', '622126', '622127', '622128', '622129', '62213',
                             '62214', '62215', '62216', '62217', '62218', '62219',
                             '6222', '6223', '6224', '6225', '6226', '6227', '6228',
                             '62290', '62291', '622920', '622921', '622922', '622923',
                             '622924', '622925', '644', '645', '646', '647', '648',
                             '649', '65']
                },
                JCB: {
                    length: [16],
                    prefix: ['3528', '3529', '353', '354', '355', '356', '357', '358']
                },
                LASER: {
                    length: [16, 17, 18, 19],
                    prefix: ['6304', '6706', '6771', '6709']
                },
                MAESTRO: {
                    length: [12, 13, 14, 15, 16, 17, 18, 19],
                    prefix: ['5018', '5020', '5038', '6304', '6759', '6761', '6762', '6763', '6764', '6765', '6766']
                },
                MASTERCARD: {
                    length: [16],
                    prefix: ['51', '52', '53', '54', '55']
                },
                SOLO: {
                    length: [16, 18, 19],
                    prefix: ['6334', '6767']
                },
                UNIONPAY: {
                    length: [16, 17, 18, 19],
                    prefix: ['622126', '622127', '622128', '622129', '62213', '62214',
                             '62215', '62216', '62217', '62218', '62219', '6222', '6223',
                             '6224', '6225', '6226', '6227', '6228', '62290', '62291',
                             '622920', '622921', '622922', '622923', '622924', '622925']
                },
                VISA: {
                    length: [16],
                    prefix: ['4']
                }
            };
            var type, i, creditCardType = null;
            for (type in cards) {
                for (i in cards[type].prefix) {
                    if (creditCard.substr(0, cards[type].prefix[i].length) === cards[type].prefix[i]    // Check the prefix
                        && $.inArray(creditCard.length, cards[type].length) !== -1)                     // and length
                    {
                        creditCardType = type;
                        break;
                    }
                }
            }

            return (creditCardType === null)
                        ? false
                        : (('AMERICAN_EXPRESS' === creditCardType) ? (value.length === 4) : (value.length === 3));
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            date: {
                'default': 'Please enter a valid date',
                min: 'Please enter a date after %s',
                max: 'Please enter a date before %s',
                range: 'Please enter a date in the range %s - %s'
            }
        }
    });

    FormValidation.Validator.date = {
        html5Attributes: {
            message: 'message',
            format: 'format',
            min: 'min',
            max: 'max',
            separator: 'separator'
        },

        /**
         * Return true if the input value is valid date
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * - min: the minimum date
         * - max: the maximum date
         * - separator: Use to separate the date, month, and year.
         * By default, it is /
         * - format: The date format. Default is MM/DD/YYYY
         * The format can be:
         *
         * i) date: Consist of DD, MM, YYYY parts which are separated by the separator option
         * ii) date and time:
         * The time can consist of h, m, s parts which are separated by :
         * ii) date, time and A (indicating AM or PM)
         * @returns {Boolean|Object}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'date');
            if (value === '') {
                return true;
            }

            options.format = options.format || 'MM/DD/YYYY';

            // #683: Force the format to YYYY-MM-DD as the default browser behaviour when using type="date" attribute
            if ($field.attr('type') === 'date') {
                options.format = 'YYYY-MM-DD';
            }

            var locale     = validator.getLocale(),
                message    = options.message || FormValidation.I18n[locale].date['default'],
                formats    = options.format.split(' '),
                dateFormat = formats[0],
                timeFormat = (formats.length > 1) ? formats[1] : null,
                amOrPm     = (formats.length > 2) ? formats[2] : null,
                sections   = value.split(' '),
                date       = sections[0],
                time       = (sections.length > 1) ? sections[1] : null;

            if (formats.length !== sections.length) {
                return {
                    valid: false,
                    message: message
                };
            }

            // Determine the separator
            var separator = options.separator;
            if (!separator) {
                separator = (date.indexOf('/') !== -1) ? '/' : ((date.indexOf('-') !== -1) ? '-' : null);
            }
            if (separator === null || date.indexOf(separator) === -1) {
                return {
                    valid: false,
                    message: message
                };
            }

            // Determine the date
            date       = date.split(separator);
            dateFormat = dateFormat.split(separator);
            if (date.length !== dateFormat.length) {
                return {
                    valid: false,
                    message: message
                };
            }

            var year  = date[$.inArray('YYYY', dateFormat)],
                month = date[$.inArray('MM', dateFormat)],
                day   = date[$.inArray('DD', dateFormat)];

            if (!year || !month || !day || year.length !== 4) {
                return {
                    valid: false,
                    message: message
                };
            }

            // Determine the time
            var minutes = null, hours = null, seconds = null;
            if (timeFormat) {
                timeFormat = timeFormat.split(':');
                time       = time.split(':');

                if (timeFormat.length !== time.length) {
                    return {
                        valid: false,
                        message: message
                    };
                }

                hours   = time.length > 0 ? time[0] : null;
                minutes = time.length > 1 ? time[1] : null;
                seconds = time.length > 2 ? time[2] : null;

                if (hours === '' || minutes === '' || seconds === '') {
                    return {
                        valid: false,
                        message: message
                    };
                }

                // Validate seconds
                if (seconds) {
                    if (isNaN(seconds) || seconds.length > 2) {
                        return {
                            valid: false,
                            message: message
                        };
                    }
                    seconds = parseInt(seconds, 10);
                    if (seconds < 0 || seconds > 60) {
                        return {
                            valid: false,
                            message: message
                        };
                    }
                }

                // Validate hours
                if (hours) {
                    if (isNaN(hours) || hours.length > 2) {
                        return {
                            valid: false,
                            message: message
                        };
                    }
                    hours = parseInt(hours, 10);
                    if (hours < 0 || hours >= 24 || (amOrPm && hours > 12)) {
                        return {
                            valid: false,
                            message: message
                        };
                    }
                }

                // Validate minutes
                if (minutes) {
                    if (isNaN(minutes) || minutes.length > 2) {
                        return {
                            valid: false,
                            message: message
                        };
                    }
                    minutes = parseInt(minutes, 10);
                    if (minutes < 0 || minutes > 59) {
                        return {
                            valid: false,
                            message: message
                        };
                    }
                }
            }

            // Validate day, month, and year
            var valid     = FormValidation.Helper.date(year, month, day),
                // declare the date, min and max objects
                min       = null,
                max       = null,
                minOption = options.min,
                maxOption = options.max;

            if (minOption) {
                if (isNaN(Date.parse(minOption))) {
                    minOption = validator.getDynamicOption($field, minOption);
                }

                min       = minOption instanceof Date ? minOption : this._parseDate(minOption, dateFormat, separator);
                // In order to avoid displaying a date string like "Mon Dec 08 2014 19:14:12 GMT+0000 (WET)"
                minOption = minOption instanceof Date ? this._formatDate(minOption, options.format) : minOption;
            }

            if (maxOption) {
                if (isNaN(Date.parse(maxOption))) {
                    maxOption = validator.getDynamicOption($field, maxOption);
                }

                max       = maxOption instanceof Date ? maxOption : this._parseDate(maxOption, dateFormat, separator);
                // In order to avoid displaying a date string like "Mon Dec 08 2014 19:14:12 GMT+0000 (WET)"
                maxOption = maxOption instanceof Date ? this._formatDate(maxOption, options.format) : maxOption;
            }

            date = new Date(year, month -1, day, hours, minutes, seconds);

            switch (true) {
                case (minOption && !maxOption && valid):
                    valid   = date.getTime() >= min.getTime();
                    message = options.message || FormValidation.Helper.format(FormValidation.I18n[locale].date.min, minOption);
                    break;

                case (maxOption && !minOption && valid):
                    valid   = date.getTime() <= max.getTime();
                    message = options.message || FormValidation.Helper.format(FormValidation.I18n[locale].date.max, maxOption);
                    break;

                case (maxOption && minOption && valid):
                    valid   = date.getTime() <= max.getTime() && date.getTime() >= min.getTime();
                    message = options.message || FormValidation.Helper.format(FormValidation.I18n[locale].date.range, [minOption, maxOption]);
                    break;

                default:
                    break;
            }

            return {
                valid: valid,
                message: message
            };
        },

        /**
         * Return a date object after parsing the date string
         *
         * @param {String} date   The date string to parse
         * @param {String} format The date format
         * The format can be:
         *   - date: Consist of DD, MM, YYYY parts which are separated by the separator option
         *   - date and time:
         *     The time can consist of h, m, s parts which are separated by :
         * @param {String} separator The separator used to separate the date, month, and year
         * @returns {Date}
         */
        _parseDate: function(date, format, separator) {
            var minutes     = 0, hours = 0, seconds = 0,
                sections    = date.split(' '),
                dateSection = sections[0],
                timeSection = (sections.length > 1) ? sections[1] : null;

            dateSection = dateSection.split(separator);
            var year  = dateSection[$.inArray('YYYY', format)],
                month = dateSection[$.inArray('MM', format)],
                day   = dateSection[$.inArray('DD', format)];
            if (timeSection) {
                timeSection = timeSection.split(':');
                hours       = timeSection.length > 0 ? timeSection[0] : null;
                minutes     = timeSection.length > 1 ? timeSection[1] : null;
                seconds     = timeSection.length > 2 ? timeSection[2] : null;
            }

            return new Date(year, month -1, day, hours, minutes, seconds);
        },

        /**
         * Format date
         *
         * @param {Date} date The date object to format
         * @param {String} format The date format
         * The format can consist of the following tokens:
         *      d       Day of the month without leading zeros (1 through 31)
         *      dd      Day of the month with leading zeros (01 through 31)
         *      m       Month without leading zeros (1 through 12)
         *      mm      Month with leading zeros (01 through 12)
         *      yy      Last two digits of year (for example: 14)
         *      yyyy    Full four digits of year (for example: 2014)
         *      h       Hours without leading zeros (1 through 12)
         *      hh      Hours with leading zeros (01 through 12)
         *      H       Hours without leading zeros (0 through 23)
         *      HH      Hours with leading zeros (00 through 23)
         *      M       Minutes without leading zeros (0 through 59)
         *      MM      Minutes with leading zeros (00 through 59)
         *      s       Seconds without leading zeros (0 through 59)
         *      ss      Seconds with leading zeros (00 through 59)
         * @returns {String}
         */
        _formatDate: function(date, format) {
            format = format
                        .replace(/Y/g, 'y')
                        .replace(/M/g, 'm')
                        .replace(/D/g, 'd')
                        .replace(/:m/g, ':M')
                        .replace(/:mm/g, ':MM')
                        .replace(/:S/, ':s')
                        .replace(/:SS/, ':ss');

            var replacer = {
                d: function(date) {
                    return date.getDate();
                },
                dd: function(date) {
                    var d = date.getDate();
                    return (d < 10) ? '0' + d : d;
                },
                m: function(date) {
                    return date.getMonth() + 1;
                },
                mm: function(date) {
                    var m = date.getMonth() + 1;
                    return m < 10 ? '0' + m : m;
                },
                yy: function(date) {
                    return ('' + date.getFullYear()).substr(2);
                },
                yyyy: function(date) {
                    return date.getFullYear();
                },
                h: function(date) {
                    return date.getHours() % 12 || 12;
                },
                hh: function(date) {
                    var h = date.getHours() % 12 || 12;
                    return h < 10 ? '0' + h : h;
                },
                H: function(date) {
                    return date.getHours();
                },
                HH: function(date) {
                    var H = date.getHours();
                    return H < 10 ? '0' + H : H;
                },
                M: function(date) {
                    return date.getMinutes();
                },
                MM: function(date) {
                    var M = date.getMinutes();
                    return M < 10 ? '0' + M : M;
                },
                s: function(date) {
                    return date.getSeconds();
                },
                ss: function(date) {
                    var s = date.getSeconds();
                    return s < 10 ? '0' + s : s;
                }
            };

            return format.replace(/d{1,4}|m{1,4}|yy(?:yy)?|([HhMs])\1?|"[^"]*"|'[^']*'/g, function(match) {
                return replacer[match] ? replacer[match](date) : match.slice(1, match.length - 1);
            });
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            different: {
                'default': 'Please enter a different value'
            }
        }
    });

    FormValidation.Validator.different = {
        html5Attributes: {
            message: 'message',
            field: 'field'
        },

        /**
         * Bind the validator on the live change of the field to compare with current one
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of the following key:
         * - field: The name of field that will be used to compare with current one
         */
        init: function(validator, $field, options) {
            var fields = options.field.split(',');
            for (var i = 0; i < fields.length; i++) {
                var compareWith = validator.getFieldElements(fields[i]);
                validator.onLiveChange(compareWith, 'live_different', function() {
                    var status = validator.getStatus($field, 'different');
                    if (status !== validator.STATUS_NOT_VALIDATED) {
                        validator.revalidateField($field);
                    }
                });
            }
        },

        /**
         * Unbind the validator on the live change of the field to compare with current one
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of the following key:
         * - field: The name of field that will be used to compare with current one
         */
        destroy: function(validator, $field, options) {
            var fields = options.field.split(',');
            for (var i = 0; i < fields.length; i++) {
                var compareWith = validator.getFieldElements(fields[i]);
                validator.offLiveChange(compareWith, 'live_different');
            }
        },

        /**
         * Return true if the input value is different with given field's value
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of the following key:
         * - field: The name of field that will be used to compare with current one
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'different');
            if (value === '') {
                return true;
            }

            var fields  = options.field.split(','),
                isValid = true;

            for (var i = 0; i < fields.length; i++) {
                var compareWith = validator.getFieldElements(fields[i]);
                if (compareWith == null || compareWith.length === 0) {
                    continue;
                }

                var compareValue = validator.getFieldValue(compareWith, 'different');
                if (value === compareValue) {
                    isValid = false;
                } else if (compareValue !== '') {
                    validator.updateStatus(compareWith, validator.STATUS_VALID, 'different');
                }
            }

            return isValid;
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            digits: {
                'default': 'Please enter only digits'
            }
        }
    });

    FormValidation.Validator.digits = {
        /**
         * Return true if the input value contains digits only
         *
         * @param {FormValidation.Base} validator Validate plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} [options]
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'digits');
            if (value === '') {
                return true;
            }

            return /^\d+$/.test(value);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            ean: {
                'default': 'Please enter a valid EAN number'
            }
        }
    });

    FormValidation.Validator.ean = {
        /**
         * Validate EAN (International Article Number)
         * Examples:
         * - Valid: 73513537, 9780471117094, 4006381333931
         * - Invalid: 73513536
         *
         * @see http://en.wikipedia.org/wiki/European_Article_Number
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'ean');
            if (value === '') {
                return true;
            }

            if (!/^(\d{8}|\d{12}|\d{13})$/.test(value)) {
                return false;
            }

            var length = value.length,
                sum    = 0,
                weight = (length === 8) ? [3, 1] : [1, 3];
            for (var i = 0; i < length - 1; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i % 2];
            }
            sum = (10 - sum % 10) % 10;
            return (sum + '' === value.charAt(length - 1));
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            ein: {
                'default': 'Please enter a valid EIN number'
            }
        }
    });

    FormValidation.Validator.ein = {
        // The first two digits are called campus
        // See http://en.wikipedia.org/wiki/Employer_Identification_Number
        // http://www.irs.gov/Businesses/Small-Businesses-&-Self-Employed/How-EINs-are-Assigned-and-Valid-EIN-Prefixes
        CAMPUS: {
            ANDOVER: ['10', '12'],
            ATLANTA: ['60', '67'],
            AUSTIN: ['50', '53'],
            BROOKHAVEN: ['01', '02', '03', '04', '05', '06', '11', '13', '14', '16', '21', '22', '23', '25', '34', '51', '52', '54', '55', '56', '57', '58', '59', '65'],
            CINCINNATI: ['30', '32', '35', '36', '37', '38', '61'],
            FRESNO: ['15', '24'],
            KANSAS_CITY: ['40', '44'],
            MEMPHIS: ['94', '95'],
            OGDEN: ['80', '90'],
            PHILADELPHIA: ['33', '39', '41', '42', '43', '46', '48', '62', '63', '64', '66', '68', '71', '72', '73', '74', '75', '76', '77', '81', '82', '83', '84', '85', '86', '87', '88', '91', '92', '93', '98', '99'],
            INTERNET: ['20', '26', '27', '45', '46'],
            SMALL_BUSINESS_ADMINISTRATION: ['31']
        },

        /**
         * Validate EIN (Employer Identification Number) which is also known as
         * Federal Employer Identification Number (FEIN) or Federal Tax Identification Number
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Object|Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'ein');
            if (value === '') {
                return true;
            }

            if (!/^[0-9]{2}-?[0-9]{7}$/.test(value)) {
                return false;
            }
            // Check the first two digits
            var campus = value.substr(0, 2) + '';
            for (var key in this.CAMPUS) {
                if ($.inArray(campus, this.CAMPUS[key]) !== -1) {
                    return {
                        valid: true,
                        campus: key
                    };
                }
            }

            return false;
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            emailAddress: {
                'default': 'Please enter a valid email address'
            }
        }
    });

    FormValidation.Validator.emailAddress = {
        html5Attributes: {
            message: 'message',
            multiple: 'multiple',
            separator: 'separator'
        },

        enableByHtml5: function($field) {
            return ('email' === $field.attr('type'));
        },

        /**
         * Return true if and only if the input value is a valid email address
         *
         * @param {FormValidation.Base} validator Validate plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} [options]
         * - multiple: Allow multiple email addresses, separated by a comma or semicolon; default is false.
         * - separator: Regex for character or characters expected as separator between addresses; default is comma /[,;]/, i.e. comma or semicolon.
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'emailAddress');
            if (value === '') {
                return true;
            }

            // Email address regular expression
            // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
            var emailRegExp   = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                allowMultiple = options.multiple === true || options.multiple === 'true';

            if (allowMultiple) {
                var separator = options.separator || /[,;]/,
                    addresses = this._splitEmailAddresses(value, separator);

                for (var i = 0; i < addresses.length; i++) {
                    if (!emailRegExp.test(addresses[i])) {
                        return false;
                    }
                }

                return true;
            } else {
                return emailRegExp.test(value);
            }
        },

        _splitEmailAddresses: function(emailAddresses, separator) {
            var quotedFragments     = emailAddresses.split(/"/),
                quotedFragmentCount = quotedFragments.length,
                emailAddressArray   = [],
                nextEmailAddress    = '';

            for (var i = 0; i < quotedFragmentCount; i++) {
                if (i % 2 === 0) {
                    var splitEmailAddressFragments     = quotedFragments[i].split(separator),
                        splitEmailAddressFragmentCount = splitEmailAddressFragments.length;

                    if (splitEmailAddressFragmentCount === 1) {
                        nextEmailAddress += splitEmailAddressFragments[0];
                    } else {
                        emailAddressArray.push(nextEmailAddress + splitEmailAddressFragments[0]);

                        for (var j = 1; j < splitEmailAddressFragmentCount - 1; j++) {
                            emailAddressArray.push(splitEmailAddressFragments[j]);
                        }
                        nextEmailAddress = splitEmailAddressFragments[splitEmailAddressFragmentCount - 1];
                    }
                } else {
                    nextEmailAddress += '"' + quotedFragments[i];
                    if (i < quotedFragmentCount - 1) {
                        nextEmailAddress += '"';
                    }
                }
            }

            emailAddressArray.push(nextEmailAddress);
            return emailAddressArray;
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            file: {
                'default': 'Please choose a valid file'
            }
        }
    });

    FormValidation.Validator.file = {
        html5Attributes: {
            extension: 'extension',
            maxfiles: 'maxFiles',
            minfiles: 'minFiles',
            maxsize: 'maxSize',
            minsize: 'minSize',
            maxtotalsize: 'maxTotalSize',
            mintotalsize: 'minTotalSize',
            message: 'message',
            type: 'type'
        },

        /**
         * Validate upload file. Use HTML 5 API if the browser supports
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - extension: The allowed extensions, separated by a comma
         * - maxFiles: The maximum number of files
         * - minFiles: The minimum number of files
         * - maxSize: The maximum size in bytes
         * - minSize: The minimum size in bytes
         * - maxTotalSize: The maximum size in bytes for all files
         * - minTotalSize: The minimum size in bytes for all files
         * - message: The invalid message
         * - type: The allowed MIME type, separated by a comma
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'file');
            if (value === '') {
                return true;
            }

            var ext,
                extensions = options.extension ? options.extension.toLowerCase().split(',') : null,
                types      = options.type      ? options.type.toLowerCase().split(',')      : null,
                html5      = (window.File && window.FileList && window.FileReader);

            if (html5) {
                // Get FileList instance
                var files     = $field.get(0).files,
                    total     = files.length,
                    totalSize = 0;

                if ((options.maxFiles && total > parseInt(options.maxFiles, 10))        // Check the maxFiles
                    || (options.minFiles && total < parseInt(options.minFiles, 10)))    // Check the minFiles
                {
                    return false;
                }

                for (var i = 0; i < total; i++) {
                    totalSize += files[i].size;
                    ext        = files[i].name.substr(files[i].name.lastIndexOf('.') + 1);

                    if ((options.minSize && files[i].size < parseInt(options.minSize, 10))                      // Check the minSize
                        || (options.maxSize && files[i].size > parseInt(options.maxSize, 10))                   // Check the maxSize
                        || (extensions && $.inArray(ext.toLowerCase(), extensions) === -1)                      // Check file extension
                        || (files[i].type && types && $.inArray(files[i].type.toLowerCase(), types) === -1))    // Check file type
                    {
                        return false;
                    }
                }

                if ((options.maxTotalSize && totalSize > parseInt(options.maxTotalSize, 10))        // Check the maxTotalSize
                    || (options.minTotalSize && totalSize < parseInt(options.minTotalSize, 10)))    // Check the minTotalSize
                {
                    return false;
                }
            } else {
                // Check file extension
                ext = value.substr(value.lastIndexOf('.') + 1);
                if (extensions && $.inArray(ext.toLowerCase(), extensions) === -1) {
                    return false;
                }
            }

            return true;
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            greaterThan: {
                'default': 'Please enter a value greater than or equal to %s',
                notInclusive: 'Please enter a value greater than %s'
            }
        }
    });

    FormValidation.Validator.greaterThan = {
        html5Attributes: {
            message: 'message',
            value: 'value',
            inclusive: 'inclusive'
        },

        enableByHtml5: function($field) {
            var type = $field.attr('type'),
                min  = $field.attr('min');
            if (min && type !== 'date') {
                return {
                    value: min
                };
            }

            return false;
        },

        /**
         * Return true if the input value is greater than or equals to given number
         *
         * @param {FormValidation.Base} validator Validate plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - value: Define the number to compare with. It can be
         *      - A number
         *      - Name of field which its value defines the number
         *      - Name of callback function that returns the number
         *      - A callback function that returns the number
         *
         * - inclusive [optional]: Can be true or false. Default is true
         * - message: The invalid message
         * @returns {Boolean|Object}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'greaterThan');
            if (value === '') {
                return true;
            }
            
            value = this._format(value);
            if (!$.isNumeric(value)) {
                return false;
            }

            var locale         = validator.getLocale(),
                compareTo      = $.isNumeric(options.value) ? options.value : validator.getDynamicOption($field, options.value),
                compareToValue = this._format(compareTo);

            value = parseFloat(value);
			return (options.inclusive === true || options.inclusive === undefined)
                    ? {
                        valid: value >= compareToValue,
                        message: FormValidation.Helper.format(options.message || FormValidation.I18n[locale].greaterThan['default'], compareTo)
                    }
                    : {
                        valid: value > compareToValue,
                        message: FormValidation.Helper.format(options.message || FormValidation.I18n[locale].greaterThan.notInclusive, compareTo)
                    };
        },

        _format: function(value) {
            return (value + '').replace(',', '.');
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            grid: {
                'default': 'Please enter a valid GRId number'
            }
        }
    });

    FormValidation.Validator.grid = {
        /**
         * Validate GRId (Global Release Identifier)
         * Examples:
         * - Valid: A12425GABC1234002M, A1-2425G-ABC1234002-M, A1 2425G ABC1234002 M, Grid:A1-2425G-ABC1234002-M
         * - Invalid: A1-2425G-ABC1234002-Q
         *
         * @see http://en.wikipedia.org/wiki/Global_Release_Identifier
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'grid');
            if (value === '') {
                return true;
            }

            value = value.toUpperCase();
            if (!/^[GRID:]*([0-9A-Z]{2})[-\s]*([0-9A-Z]{5})[-\s]*([0-9A-Z]{10})[-\s]*([0-9A-Z]{1})$/g.test(value)) {
                return false;
            }
            value = value.replace(/\s/g, '').replace(/-/g, '');
            if ('GRID:' === value.substr(0, 5)) {
                value = value.substr(5);
            }
            return FormValidation.Helper.mod37And36(value);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            hex: {
                'default': 'Please enter a valid hexadecimal number'
            }
        }
    });

    FormValidation.Validator.hex = {
        /**
         * Return true if and only if the input value is a valid hexadecimal number
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'hex');
            if (value === '') {
                return true;
            }

            return /^[0-9a-fA-F]+$/.test(value);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            iban: {
                'default': 'Please enter a valid IBAN number',
                country: 'Please enter a valid IBAN number in %s',
                countries: {
                    AD: 'Andorra',
                    AE: 'United Arab Emirates',
                    AL: 'Albania',
                    AO: 'Angola',
                    AT: 'Austria',
                    AZ: 'Azerbaijan',
                    BA: 'Bosnia and Herzegovina',
                    BE: 'Belgium',
                    BF: 'Burkina Faso',
                    BG: 'Bulgaria',
                    BH: 'Bahrain',
                    BI: 'Burundi',
                    BJ: 'Benin',
                    BR: 'Brazil',
                    CH: 'Switzerland',
                    CI: 'Ivory Coast',
                    CM: 'Cameroon',
                    CR: 'Costa Rica',
                    CV: 'Cape Verde',
                    CY: 'Cyprus',
                    CZ: 'Czech Republic',
                    DE: 'Germany',
                    DK: 'Denmark',
                    DO: 'Dominican Republic',
                    DZ: 'Algeria',
                    EE: 'Estonia',
                    ES: 'Spain',
                    FI: 'Finland',
                    FO: 'Faroe Islands',
                    FR: 'France',
                    GB: 'United Kingdom',
                    GE: 'Georgia',
                    GI: 'Gibraltar',
                    GL: 'Greenland',
                    GR: 'Greece',
                    GT: 'Guatemala',
                    HR: 'Croatia',
                    HU: 'Hungary',
                    IE: 'Ireland',
                    IL: 'Israel',
                    IR: 'Iran',
                    IS: 'Iceland',
                    IT: 'Italy',
                    JO: 'Jordan',
                    KW: 'Kuwait',
                    KZ: 'Kazakhstan',
                    LB: 'Lebanon',
                    LI: 'Liechtenstein',
                    LT: 'Lithuania',
                    LU: 'Luxembourg',
                    LV: 'Latvia',
                    MC: 'Monaco',
                    MD: 'Moldova',
                    ME: 'Montenegro',
                    MG: 'Madagascar',
                    MK: 'Macedonia',
                    ML: 'Mali',
                    MR: 'Mauritania',
                    MT: 'Malta',
                    MU: 'Mauritius',
                    MZ: 'Mozambique',
                    NL: 'Netherlands',
                    NO: 'Norway',
                    PK: 'Pakistan',
                    PL: 'Poland',
                    PS: 'Palestine',
                    PT: 'Portugal',
                    QA: 'Qatar',
                    RO: 'Romania',
                    RS: 'Serbia',
                    SA: 'Saudi Arabia',
                    SE: 'Sweden',
                    SI: 'Slovenia',
                    SK: 'Slovakia',
                    SM: 'San Marino',
                    SN: 'Senegal',
                    TN: 'Tunisia',
                    TR: 'Turkey',
                    VG: 'Virgin Islands, British'
                }
            }
        }
    });

    FormValidation.Validator.iban = {
        html5Attributes: {
            message: 'message',
            country: 'country'
        },

        // http://www.swift.com/dsp/resources/documents/IBAN_Registry.pdf
        // http://en.wikipedia.org/wiki/International_Bank_Account_Number#IBAN_formats_by_country
        REGEX: {
            AD: 'AD[0-9]{2}[0-9]{4}[0-9]{4}[A-Z0-9]{12}',                       // Andorra
            AE: 'AE[0-9]{2}[0-9]{3}[0-9]{16}',                                  // United Arab Emirates
            AL: 'AL[0-9]{2}[0-9]{8}[A-Z0-9]{16}',                               // Albania
            AO: 'AO[0-9]{2}[0-9]{21}',                                          // Angola
            AT: 'AT[0-9]{2}[0-9]{5}[0-9]{11}',                                  // Austria
            AZ: 'AZ[0-9]{2}[A-Z]{4}[A-Z0-9]{20}',                               // Azerbaijan
            BA: 'BA[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{8}[0-9]{2}',                   // Bosnia and Herzegovina
            BE: 'BE[0-9]{2}[0-9]{3}[0-9]{7}[0-9]{2}',                           // Belgium
            BF: 'BF[0-9]{2}[0-9]{23}',                                          // Burkina Faso
            BG: 'BG[0-9]{2}[A-Z]{4}[0-9]{4}[0-9]{2}[A-Z0-9]{8}',                // Bulgaria
            BH: 'BH[0-9]{2}[A-Z]{4}[A-Z0-9]{14}',                               // Bahrain
            BI: 'BI[0-9]{2}[0-9]{12}',                                          // Burundi
            BJ: 'BJ[0-9]{2}[A-Z]{1}[0-9]{23}',                                  // Benin
            BR: 'BR[0-9]{2}[0-9]{8}[0-9]{5}[0-9]{10}[A-Z][A-Z0-9]',             // Brazil
            CH: 'CH[0-9]{2}[0-9]{5}[A-Z0-9]{12}',                               // Switzerland
            CI: 'CI[0-9]{2}[A-Z]{1}[0-9]{23}',                                  // Ivory Coast
            CM: 'CM[0-9]{2}[0-9]{23}',                                          // Cameroon
            CR: 'CR[0-9]{2}[0-9]{3}[0-9]{14}',                                  // Costa Rica
            CV: 'CV[0-9]{2}[0-9]{21}',                                          // Cape Verde
            CY: 'CY[0-9]{2}[0-9]{3}[0-9]{5}[A-Z0-9]{16}',                       // Cyprus
            CZ: 'CZ[0-9]{2}[0-9]{20}',                                          // Czech Republic
            DE: 'DE[0-9]{2}[0-9]{8}[0-9]{10}',                                  // Germany
            DK: 'DK[0-9]{2}[0-9]{14}',                                          // Denmark
            DO: 'DO[0-9]{2}[A-Z0-9]{4}[0-9]{20}',                               // Dominican Republic
            DZ: 'DZ[0-9]{2}[0-9]{20}',                                          // Algeria
            EE: 'EE[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{11}[0-9]{1}',                  // Estonia
            ES: 'ES[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{1}[0-9]{1}[0-9]{10}',          // Spain
            FI: 'FI[0-9]{2}[0-9]{6}[0-9]{7}[0-9]{1}',                           // Finland
            FO: 'FO[0-9]{2}[0-9]{4}[0-9]{9}[0-9]{1}',                           // Faroe Islands
            FR: 'FR[0-9]{2}[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}',               // France
            GB: 'GB[0-9]{2}[A-Z]{4}[0-9]{6}[0-9]{8}',                           // United Kingdom
            GE: 'GE[0-9]{2}[A-Z]{2}[0-9]{16}',                                  // Georgia
            GI: 'GI[0-9]{2}[A-Z]{4}[A-Z0-9]{15}',                               // Gibraltar
            GL: 'GL[0-9]{2}[0-9]{4}[0-9]{9}[0-9]{1}',                           // Greenland
            GR: 'GR[0-9]{2}[0-9]{3}[0-9]{4}[A-Z0-9]{16}',                       // Greece
            GT: 'GT[0-9]{2}[A-Z0-9]{4}[A-Z0-9]{20}',                            // Guatemala
            HR: 'HR[0-9]{2}[0-9]{7}[0-9]{10}',                                  // Croatia
            HU: 'HU[0-9]{2}[0-9]{3}[0-9]{4}[0-9]{1}[0-9]{15}[0-9]{1}',          // Hungary
            IE: 'IE[0-9]{2}[A-Z]{4}[0-9]{6}[0-9]{8}',                           // Ireland
            IL: 'IL[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{13}',                          // Israel
            IR: 'IR[0-9]{2}[0-9]{22}',                                          // Iran
            IS: 'IS[0-9]{2}[0-9]{4}[0-9]{2}[0-9]{6}[0-9]{10}',                  // Iceland
            IT: 'IT[0-9]{2}[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}',               // Italy
            JO: 'JO[0-9]{2}[A-Z]{4}[0-9]{4}[0]{8}[A-Z0-9]{10}',                 // Jordan
            KW: 'KW[0-9]{2}[A-Z]{4}[0-9]{22}',                                  // Kuwait
            KZ: 'KZ[0-9]{2}[0-9]{3}[A-Z0-9]{13}',                               // Kazakhstan
            LB: 'LB[0-9]{2}[0-9]{4}[A-Z0-9]{20}',                               // Lebanon
            LI: 'LI[0-9]{2}[0-9]{5}[A-Z0-9]{12}',                               // Liechtenstein
            LT: 'LT[0-9]{2}[0-9]{5}[0-9]{11}',                                  // Lithuania
            LU: 'LU[0-9]{2}[0-9]{3}[A-Z0-9]{13}',                               // Luxembourg
            LV: 'LV[0-9]{2}[A-Z]{4}[A-Z0-9]{13}',                               // Latvia
            MC: 'MC[0-9]{2}[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}',               // Monaco
            MD: 'MD[0-9]{2}[A-Z0-9]{20}',                                       // Moldova
            ME: 'ME[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}',                          // Montenegro
            MG: 'MG[0-9]{2}[0-9]{23}',                                          // Madagascar
            MK: 'MK[0-9]{2}[0-9]{3}[A-Z0-9]{10}[0-9]{2}',                       // Macedonia
            ML: 'ML[0-9]{2}[A-Z]{1}[0-9]{23}',                                  // Mali
            MR: 'MR13[0-9]{5}[0-9]{5}[0-9]{11}[0-9]{2}',                        // Mauritania
            MT: 'MT[0-9]{2}[A-Z]{4}[0-9]{5}[A-Z0-9]{18}',                       // Malta
            MU: 'MU[0-9]{2}[A-Z]{4}[0-9]{2}[0-9]{2}[0-9]{12}[0-9]{3}[A-Z]{3}',  // Mauritius
            MZ: 'MZ[0-9]{2}[0-9]{21}',                                          // Mozambique
            NL: 'NL[0-9]{2}[A-Z]{4}[0-9]{10}',                                  // Netherlands
            NO: 'NO[0-9]{2}[0-9]{4}[0-9]{6}[0-9]{1}',                           // Norway
            PK: 'PK[0-9]{2}[A-Z]{4}[A-Z0-9]{16}',                               // Pakistan
            PL: 'PL[0-9]{2}[0-9]{8}[0-9]{16}',                                  // Poland
            PS: 'PS[0-9]{2}[A-Z]{4}[A-Z0-9]{21}',                               // Palestinian
            PT: 'PT[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{11}[0-9]{2}',                  // Portugal
            QA: 'QA[0-9]{2}[A-Z]{4}[A-Z0-9]{21}',                               // Qatar
            RO: 'RO[0-9]{2}[A-Z]{4}[A-Z0-9]{16}',                               // Romania
            RS: 'RS[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}',                          // Serbia
            SA: 'SA[0-9]{2}[0-9]{2}[A-Z0-9]{18}',                               // Saudi Arabia
            SE: 'SE[0-9]{2}[0-9]{3}[0-9]{16}[0-9]{1}',                          // Sweden
            SI: 'SI[0-9]{2}[0-9]{5}[0-9]{8}[0-9]{2}',                           // Slovenia
            SK: 'SK[0-9]{2}[0-9]{4}[0-9]{6}[0-9]{10}',                          // Slovakia
            SM: 'SM[0-9]{2}[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}',               // San Marino
            SN: 'SN[0-9]{2}[A-Z]{1}[0-9]{23}',                                  // Senegal
            TN: 'TN59[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}',                        // Tunisia
            TR: 'TR[0-9]{2}[0-9]{5}[A-Z0-9]{1}[A-Z0-9]{16}',                    // Turkey
            VG: 'VG[0-9]{2}[A-Z]{4}[0-9]{16}'                                   // Virgin Islands, British
        },

        /**
         * Validate an International Bank Account Number (IBAN)
         * To test it, take the sample IBAN from
         * http://www.nordea.com/Our+services/International+products+and+services/Cash+Management/IBAN+countries/908462.html
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * - country: The ISO 3166-1 country code. It can be
         *      - A country code
         *      - Name of field which its value defines the country code
         *      - Name of callback function that returns the country code
         *      - A callback function that returns the country code
         * @returns {Boolean|Object}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'iban');
            if (value === '') {
                return true;
            }

            value = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            var country = options.country;
            if (!country) {
                country = value.substr(0, 2);
            } else if (typeof country !== 'string' || !this.REGEX[country]) {
                // Determine the country code
                country = validator.getDynamicOption($field, country);
            }

            var locale = validator.getLocale();
            if (!this.REGEX[country]) {
                return true;
            }

            if (!(new RegExp('^' + this.REGEX[country] + '$')).test(value)) {
                return {
                    valid: false,
                    message: FormValidation.Helper.format(options.message || FormValidation.I18n[locale].iban.country, FormValidation.I18n[locale].iban.countries[country])
                };
            }

            value = value.substr(4) + value.substr(0, 4);
            value = $.map(value.split(''), function(n) {
                var code = n.charCodeAt(0);
                return (code >= 'A'.charCodeAt(0) && code <= 'Z'.charCodeAt(0))
                        // Replace A, B, C, ..., Z with 10, 11, ..., 35
                        ? (code - 'A'.charCodeAt(0) + 10)
                        : n;
            });
            value = value.join('');

            var temp   = parseInt(value.substr(0, 1), 10),
                length = value.length;
            for (var i = 1; i < length; ++i) {
                temp = (temp * 10 + parseInt(value.substr(i, 1), 10)) % 97;
            }

            return {
                valid: (temp === 1),
                message: FormValidation.Helper.format(options.message || FormValidation.I18n[locale].iban.country, FormValidation.I18n[locale].iban.countries[country])
            };
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            id: {
                'default': 'Please enter a valid identification number',
                country: 'Please enter a valid identification number in %s',
                countries: {
                    BA: 'Bosnia and Herzegovina',
                    BG: 'Bulgaria',
                    BR: 'Brazil',
                    CH: 'Switzerland',
                    CL: 'Chile',
                    CN: 'China',
                    CZ: 'Czech Republic',
                    DK: 'Denmark',
                    EE: 'Estonia',
                    ES: 'Spain',
                    FI: 'Finland',
                    HR: 'Croatia',
                    IE: 'Ireland',
                    IS: 'Iceland',
                    LT: 'Lithuania',
                    LV: 'Latvia',
                    ME: 'Montenegro',
                    MK: 'Macedonia',
                    NL: 'Netherlands',
                    PL: 'Poland',
                    RO: 'Romania',
                    RS: 'Serbia',
                    SE: 'Sweden',
                    SI: 'Slovenia',
                    SK: 'Slovakia',
                    SM: 'San Marino',
                    TH: 'Thailand',
                    ZA: 'South Africa'
                }
            }
        }
    });

    FormValidation.Validator.id = {
        html5Attributes: {
            message: 'message',
            country: 'country'
        },

        // Supported country codes
        COUNTRY_CODES: [
            'BA', 'BG', 'BR', 'CH', 'CL', 'CN', 'CZ', 'DK', 'EE', 'ES', 'FI', 'HR', 'IE', 'IS', 'LT', 'LV', 'ME', 'MK', 'NL',
            'PL', 'RO', 'RS', 'SE', 'SI', 'SK', 'SM', 'TH', 'ZA'
        ],

        /**
         * Validate identification number in different countries
         *
         * @see http://en.wikipedia.org/wiki/National_identification_number
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * - country: The ISO 3166-1 country code. It can be
         *      - One of country code defined in COUNTRY_CODES
         *      - Name of field which its value defines the country code
         *      - Name of callback function that returns the country code
         *      - A callback function that returns the country code
         * @returns {Boolean|Object}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'id');
            if (value === '') {
                return true;
            }

            var locale  = validator.getLocale(),
                country = options.country;
            if (!country) {
                country = value.substr(0, 2);
            } else if (typeof country !== 'string' || $.inArray(country.toUpperCase(), this.COUNTRY_CODES) === -1) {
                // Determine the country code
                country = validator.getDynamicOption($field, country);
            }

            if ($.inArray(country, this.COUNTRY_CODES) === -1) {
                return true;
            }

            var method  = ['_', country.toLowerCase()].join('');
            return this[method](value)
                    ? true
                    : {
                        valid: false,
                        message: FormValidation.Helper.format(options.message || FormValidation.I18n[locale].id.country, FormValidation.I18n[locale].id.countries[country.toUpperCase()])
                    };
        },

        /**
         * Validate Unique Master Citizen Number which uses in
         * - Bosnia and Herzegovina (country code: BA)
         * - Macedonia (MK)
         * - Montenegro (ME)
         * - Serbia (RS)
         * - Slovenia (SI)
         *
         * @see http://en.wikipedia.org/wiki/Unique_Master_Citizen_Number
         * @param {String} value The ID
         * @param {String} countryCode The ISO country code, can be BA, MK, ME, RS, SI
         * @returns {Boolean}
         */
        _validateJMBG: function(value, countryCode) {
            if (!/^\d{13}$/.test(value)) {
                return false;
            }
            var day   = parseInt(value.substr(0, 2), 10),
                month = parseInt(value.substr(2, 2), 10),
                year  = parseInt(value.substr(4, 3), 10),
                rr    = parseInt(value.substr(7, 2), 10),
                k     = parseInt(value.substr(12, 1), 10);

            // Validate date of birth
            // FIXME: Validate the year of birth
            if (day > 31 || month > 12) {
                return false;
            }

            // Validate checksum
            var sum = 0;
            for (var i = 0; i < 6; i++) {
                sum += (7 - i) * (parseInt(value.charAt(i), 10) + parseInt(value.charAt(i + 6), 10));
            }
            sum = 11 - sum % 11;
            if (sum === 10 || sum === 11) {
                sum = 0;
            }
            if (sum !== k) {
                return false;
            }

            // Validate political region
            // rr is the political region of birth, which can be in ranges:
            // 10-19: Bosnia and Herzegovina
            // 20-29: Montenegro
            // 30-39: Croatia (not used anymore)
            // 41-49: Macedonia
            // 50-59: Slovenia (only 50 is used)
            // 70-79: Central Serbia
            // 80-89: Serbian province of Vojvodina
            // 90-99: Kosovo
            switch (countryCode.toUpperCase()) {
                case 'BA':
                    return (10 <= rr && rr <= 19);
                case 'MK':
                    return (41 <= rr && rr <= 49);
                case 'ME':
                    return (20 <= rr && rr <= 29);
                case 'RS':
                    return (70 <= rr && rr <= 99);
                case 'SI':
                    return (50 <= rr && rr <= 59);
                default:
                    return true;
            }
        },

        _ba: function(value) {
            return this._validateJMBG(value, 'BA');
        },
        _mk: function(value) {
            return this._validateJMBG(value, 'MK');
        },
        _me: function(value) {
            return this._validateJMBG(value, 'ME');
        },
        _rs: function(value) {
            return this._validateJMBG(value, 'RS');
        },

        /**
         * Examples: 0101006500006
         */
        _si: function(value) {
            return this._validateJMBG(value, 'SI');
        },

        /**
         * Validate Bulgarian national identification number (EGN)
         * Examples:
         * - Valid: 7523169263, 8032056031, 803205 603 1, 8001010008, 7501020018, 7552010005, 7542011030
         * - Invalid: 8019010008
         *
         * @see http://en.wikipedia.org/wiki/Uniform_civil_number
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _bg: function(value) {
            if (!/^\d{10}$/.test(value) && !/^\d{6}\s\d{3}\s\d{1}$/.test(value)) {
                return false;
            }
            value = value.replace(/\s/g, '');
            // Check the birth date
            var year  = parseInt(value.substr(0, 2), 10) + 1900,
                month = parseInt(value.substr(2, 2), 10),
                day   = parseInt(value.substr(4, 2), 10);
            if (month > 40) {
                year += 100;
                month -= 40;
            } else if (month > 20) {
                year -= 100;
                month -= 20;
            }

            if (!FormValidation.Helper.date(year, month, day)) {
                return false;
            }

            var sum    = 0,
                weight = [2, 4, 8, 5, 10, 9, 7, 3, 6];
            for (var i = 0; i < 9; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }
            sum = (sum % 11) % 10;
            return (sum + '' === value.substr(9, 1));
        },

        /**
         * Validate Brazilian national identification number (CPF)
         * Examples:
         * - Valid: 39053344705, 390.533.447-05, 111.444.777-35
         * - Invalid: 231.002.999-00
         *
         * @see http://en.wikipedia.org/wiki/Cadastro_de_Pessoas_F%C3%ADsicas
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _br: function(value) {
            value = value.replace(/\D/g, '');

            if (/^1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}|0{11}$/.test(value)) {
                return false;
            }

            var d1 = 0;
            for (var i = 0; i < 9; i++) {
                d1 += (10 - i) * parseInt(value.charAt(i), 10);
            }
            d1 = 11 - d1 % 11;
            if (d1 === 10 || d1 === 11) {
                d1 = 0;
            }
            if (d1 + '' !== value.charAt(9)) {
                return false;
            }

            var d2 = 0;
            for (i = 0; i < 10; i++) {
                d2 += (11 - i) * parseInt(value.charAt(i), 10);
            }
            d2 = 11 - d2 % 11;
            if (d2 === 10 || d2 === 11) {
                d2 = 0;
            }

            return (d2 + '' === value.charAt(10));
        },

        /**
         * Validate Swiss Social Security Number (AHV-Nr/No AVS)
         * Examples:
         * - Valid: 756.1234.5678.95, 7561234567895
         *
         * @see http://en.wikipedia.org/wiki/National_identification_number#Switzerland
         * @see http://www.bsv.admin.ch/themen/ahv/00011/02185/index.html?lang=de
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _ch: function(value) {
            if (!/^756[\.]{0,1}[0-9]{4}[\.]{0,1}[0-9]{4}[\.]{0,1}[0-9]{2}$/.test(value)) {
                return false;
            }
            value = value.replace(/\D/g, '').substr(3);
            var length = value.length,
                sum    = 0,
                weight = (length === 8) ? [3, 1] : [1, 3];
            for (var i = 0; i < length - 1; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i % 2];
            }
            sum = 10 - sum % 10;
            return (sum + '' === value.charAt(length - 1));
        },

        /**
         * Validate Chilean national identification number (RUN/RUT)
         * Examples:
         * - Valid: 76086428-5, 22060449-7, 12531909-2
         *
         * @see http://en.wikipedia.org/wiki/National_identification_number#Chile
         * @see https://palena.sii.cl/cvc/dte/ee_empresas_emisoras.html for samples
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _cl: function(value) {
            if (!/^\d{7,8}[-]{0,1}[0-9K]$/i.test(value)) {
                return false;
            }
            value = value.replace(/\-/g, '');
            while (value.length < 9) {
                value = '0' + value;
            }
            var sum    = 0,
                weight = [3, 2, 7, 6, 5, 4, 3, 2];
            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }
            sum = 11 - sum % 11;
            if (sum === 11) {
                sum = 0;
            } else if (sum === 10) {
                sum = 'K';
            }
            return sum + '' === value.charAt(8).toUpperCase();
        },

        /**
         * Validate Chinese citizen identification number
         *
         * Rules:
         * - For current 18-digit system (since 1st Oct 1999, defined by GB11643—1999 national standard):
         *     - Digit 0-5: Must be a valid administrative division code of China PR.
         *     - Digit 6-13: Must be a valid YYYYMMDD date of birth. A future date is tolerated.
         *     - Digit 14-16: Order code, any integer.
         *     - Digit 17: An ISO 7064:1983, MOD 11-2 checksum.
         *       Both upper/lower case of X are tolerated.
         * - For deprecated 15-digit system:
         *     - Digit 0-5: Must be a valid administrative division code of China PR.
         *     - Digit 6-11: Must be a valid YYMMDD date of birth, indicating the year of 19XX.
         *     - Digit 12-14: Order code, any integer.
         * Lists of valid administrative division codes of China PR can be seen here:
         * <http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/>
         * Published and maintained by National Bureau of Statistics of China PR.
         * NOTE: Current and deprecated codes MUST BOTH be considered valid.
         * Many Chinese citizens born in once existed administrative divisions!
         *
         * @see http://en.wikipedia.org/wiki/Resident_Identity_Card#Identity_card_number
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _cn: function(value) {
            // Basic format check (18 or 15 digits, considering X in checksum)
            value = value.trim();
            if (!/^\d{15}$/.test(value) && !/^\d{17}[\dXx]{1}$/.test(value)) {
                return false;
            }
            
            // Check China PR Administrative division code
            var adminDivisionCodes = {
                11: {
                    0: [0],
                    1: [[0, 9], [11, 17]],
                    2: [0, 28, 29]
                },
                12: {
                    0: [0],
                    1: [[0, 16]],
                    2: [0, 21, 23, 25]
                },
                13: {
                    0: [0],
                    1: [[0, 5], 7, 8, 21, [23, 33], [81, 85]],
                    2: [[0, 5], [7, 9], [23, 25], 27, 29, 30, 81, 83],
                    3: [[0, 4], [21, 24]],
                    4: [[0, 4], 6, 21, [23, 35], 81],
                    5: [[0, 3], [21, 35], 81, 82],
                    6: [[0, 4], [21, 38], [81, 84]],
                    7: [[0, 3], 5, 6, [21, 33]],
                    8: [[0, 4], [21, 28]],
                    9: [[0, 3], [21, 30], [81, 84]],
                    10: [[0, 3], [22, 26], 28, 81, 82],
                    11: [[0, 2], [21, 28], 81, 82]
                },
                14: {
                    0: [0],
                    1: [0, 1, [5, 10], [21, 23], 81],
                    2: [[0, 3], 11, 12, [21, 27]],
                    3: [[0, 3], 11, 21, 22],
                    4: [[0, 2], 11, 21, [23, 31], 81],
                    5: [[0, 2], 21, 22, 24, 25, 81],
                    6: [[0, 3], [21, 24]],
                    7: [[0, 2], [21, 29], 81],
                    8: [[0, 2], [21, 30], 81, 82],
                    9: [[0, 2], [21, 32], 81],
                    10: [[0, 2], [21, 34], 81, 82],
                    11: [[0, 2], [21, 30], 81, 82],
                    23: [[0, 3], 22, 23, [25, 30], 32, 33]
                },
                15: {
                    0: [0],
                    1: [[0, 5], [21, 25]],
                    2: [[0, 7], [21, 23]],
                    3: [[0, 4]],
                    4: [[0, 4], [21, 26], [28, 30]],
                    5: [[0, 2], [21, 26], 81],
                    6: [[0, 2], [21, 27]],
                    7: [[0, 3], [21, 27], [81, 85]],
                    8: [[0, 2], [21, 26]],
                    9: [[0, 2], [21, 29], 81],
                    22: [[0, 2], [21, 24]],
                    25: [[0, 2], [22, 31]],
                    26: [[0, 2], [24, 27], [29, 32], 34],
                    28: [0, 1, [22, 27]],
                    29: [0, [21, 23]]
                },
                21: {
                    0: [0],
                    1: [[0, 6], [11, 14], [22, 24], 81],
                    2: [[0, 4], [11, 13], 24, [81, 83]],
                    3: [[0, 4], 11, 21, 23, 81],
                    4: [[0, 4], 11, [21, 23]],
                    5: [[0, 5], 21, 22],
                    6: [[0, 4], 24, 81, 82],
                    7: [[0, 3], 11, 26, 27, 81, 82],
                    8: [[0, 4], 11, 81, 82],
                    9: [[0, 5], 11, 21, 22],
                    10: [[0, 5], 11, 21, 81],
                    11: [[0, 3], 21, 22],
                    12: [[0, 2], 4, 21, 23, 24, 81, 82],
                    13: [[0, 3], 21, 22, 24, 81, 82],
                    14: [[0, 4], 21, 22, 81]
                },
                22: {
                    0: [0],
                    1: [[0, 6], 12, 22, [81, 83]],
                    2: [[0, 4], 11, 21, [81, 84]],
                    3: [[0, 3], 22, 23, 81, 82],
                    4: [[0, 3], 21, 22],
                    5: [[0, 3], 21, 23, 24, 81, 82],
                    6: [[0, 2], 4, 5, [21, 23], 25, 81],
                    7: [[0, 2], [21, 24], 81],
                    8: [[0, 2], 21, 22, 81, 82],
                    24: [[0, 6], 24, 26]
                },
                23: {
                    0: [0],
                    1: [[0, 12], 21, [23, 29], [81, 84]],
                    2: [[0, 8], 21, [23, 25], 27, [29, 31], 81],
                    3: [[0, 7], 21, 81, 82],
                    4: [[0, 7], 21, 22],
                    5: [[0, 3], 5, 6, [21, 24]],
                    6: [[0, 6], [21, 24]],
                    7: [[0, 16], 22, 81],
                    8: [[0, 5], 11, 22, 26, 28, 33, 81, 82],
                    9: [[0, 4], 21],
                    10: [[0, 5], 24, 25, 81, [83, 85]],
                    11: [[0, 2], 21, 23, 24, 81, 82],
                    12: [[0, 2], [21, 26], [81, 83]],
                    27: [[0, 4], [21, 23]]
                },
                31: {
                    0: [0],
                    1: [0, 1, [3, 10], [12, 20]],
                    2: [0, 30]
                },
                32: {
                    0: [0],
                    1: [[0, 7], 11, [13, 18], 24, 25],
                    2: [[0, 6], 11, 81, 82],
                    3: [[0, 5], 11, 12, [21, 24], 81, 82],
                    4: [[0, 2], 4, 5, 11, 12, 81, 82],
                    5: [[0, 9], [81, 85]],
                    6: [[0, 2], 11, 12, 21, 23, [81, 84]],
                    7: [0, 1, 3, 5, 6, [21, 24]],
                    8: [[0, 4], 11, 26, [29, 31]],
                    9: [[0, 3], [21, 25], 28, 81, 82],
                    10: [[0, 3], 11, 12, 23, 81, 84, 88],
                    11: [[0, 2], 11, 12, [81, 83]],
                    12: [[0, 4], [81, 84]],
                    13: [[0, 2], 11, [21, 24]]
                },
                33: {
                    0: [0],
                    1: [[0, 6], [8, 10], 22, 27, 82, 83, 85],
                    2: [0, 1, [3, 6], 11, 12, 25, 26, [81, 83]],
                    3: [[0, 4], 22, 24, [26, 29], 81, 82],
                    4: [[0, 2], 11, 21, 24, [81, 83]],
                    5: [[0, 3], [21, 23]],
                    6: [[0, 2], 21, 24, [81, 83]],
                    7: [[0, 3], 23, 26, 27, [81, 84]],
                    8: [[0, 3], 22, 24, 25, 81],
                    9: [[0, 3], 21, 22],
                    10: [[0, 4], [21, 24], 81, 82],
                    11: [[0, 2], [21, 27], 81]
                },
                34: {
                    0: [0],
                    1: [[0, 4], 11, [21, 24], 81],
                    2: [[0, 4], 7, 8, [21, 23], 25],
                    3: [[0, 4], 11, [21, 23]],
                    4: [[0, 6], 21],
                    5: [[0, 4], 6, [21, 23]],
                    6: [[0, 4], 21],
                    7: [[0, 3], 11, 21],
                    8: [[0, 3], 11, [22, 28], 81],
                    10: [[0, 4], [21, 24]],
                    11: [[0, 3], 22, [24, 26], 81, 82],
                    12: [[0, 4], 21, 22, 25, 26, 82],
                    13: [[0, 2], [21, 24]],
                    14: [[0, 2], [21, 24]],
                    15: [[0, 3], [21, 25]],
                    16: [[0, 2], [21, 23]],
                    17: [[0, 2], [21, 23]],
                    18: [[0, 2], [21, 25], 81]
                },
                35: {
                    0: [0],
                    1: [[0, 5], 11, [21, 25], 28, 81, 82],
                    2: [[0, 6], [11, 13]],
                    3: [[0, 5], 22],
                    4: [[0, 3], 21, [23, 30], 81],
                    5: [[0, 5], 21, [24, 27], [81, 83]],
                    6: [[0, 3], [22, 29], 81],
                    7: [[0, 2], [21, 25], [81, 84]],
                    8: [[0, 2], [21, 25], 81],
                    9: [[0, 2], [21, 26], 81, 82]
                },
                36: {
                    0: [0],
                    1: [[0, 5], 11, [21, 24]],
                    2: [[0, 3], 22, 81],
                    3: [[0, 2], 13, [21, 23]],
                    4: [[0, 3], 21, [23, 30], 81, 82],
                    5: [[0, 2], 21],
                    6: [[0, 2], 22, 81],
                    7: [[0, 2], [21, 35], 81, 82],
                    8: [[0, 3], [21, 30], 81],
                    9: [[0, 2], [21, 26], [81, 83]],
                    10: [[0, 2], [21, 30]],
                    11: [[0, 2], [21, 30], 81]
                },
                37: {
                    0: [0],
                    1: [[0, 5], 12, 13, [24, 26], 81],
                    2: [[0, 3], 5, [11, 14], [81, 85]],
                    3: [[0, 6], [21, 23]],
                    4: [[0, 6], 81],
                    5: [[0, 3], [21, 23]],
                    6: [[0, 2], [11, 13], 34, [81, 87]],
                    7: [[0, 5], 24, 25, [81, 86]],
                    8: [[0, 2], 11, [26, 32], [81, 83]],
                    9: [[0, 3], 11, 21, 23, 82, 83],
                    10: [[0, 2], [81, 83]],
                    11: [[0, 3], 21, 22],
                    12: [[0, 3]],
                    13: [[0, 2], 11, 12, [21, 29]],
                    14: [[0, 2], [21, 28], 81, 82],
                    15: [[0, 2], [21, 26], 81],
                    16: [[0, 2], [21, 26]],
                    17: [[0, 2], [21, 28]]
                },
                41: {
                    0: [0],
                    1: [[0, 6], 8, 22, [81, 85]],
                    2: [[0, 5], 11, [21, 25]],
                    3: [[0, 7], 11, [22, 29], 81],
                    4: [[0, 4], 11, [21, 23], 25, 81, 82],
                    5: [[0, 3], 5, 6, 22, 23, 26, 27, 81],
                    6: [[0, 3], 11, 21, 22],
                    7: [[0, 4], 11, 21, [24, 28], 81, 82],
                    8: [[0, 4], 11, [21, 23], 25, [81, 83]],
                    9: [[0, 2], 22, 23, [26, 28]],
                    10: [[0, 2], [23, 25], 81, 82],
                    11: [[0, 4], [21, 23]],
                    12: [[0, 2], 21, 22, 24, 81, 82],
                    13: [[0, 3], [21, 30], 81],
                    14: [[0, 3], [21, 26], 81],
                    15: [[0, 3], [21, 28]],
                    16: [[0, 2], [21, 28], 81],
                    17: [[0, 2], [21, 29]],
                    90: [0, 1]
                },
                42: {
                    0: [0],
                    1: [[0, 7], [11, 17]],
                    2: [[0, 5], 22, 81],
                    3: [[0, 3], [21, 25], 81],
                    5: [[0, 6], [25, 29], [81, 83]],
                    6: [[0, 2], 6, 7, [24, 26], [82, 84]],
                    7: [[0, 4]],
                    8: [[0, 2], 4, 21, 22, 81],
                    9: [[0, 2], [21, 23], 81, 82, 84],
                    10: [[0, 3], [22, 24], 81, 83, 87],
                    11: [[0, 2], [21, 27], 81, 82],
                    12: [[0, 2], [21, 24], 81],
                    13: [[0, 3], 21, 81],
                    28: [[0, 2], 22, 23, [25, 28]],
                    90: [0, [4, 6], 21]
                },
                43: {
                    0: [0],
                    1: [[0, 5], 11, 12, 21, 22, 24, 81],
                    2: [[0, 4], 11, 21, [23, 25], 81],
                    3: [[0, 2], 4, 21, 81, 82],
                    4: [0, 1, [5, 8], 12, [21, 24], 26, 81, 82],
                    5: [[0, 3], 11, [21, 25], [27, 29], 81],
                    6: [[0, 3], 11, 21, 23, 24, 26, 81, 82],
                    7: [[0, 3], [21, 26], 81],
                    8: [[0, 2], 11, 21, 22],
                    9: [[0, 3], [21, 23], 81],
                    10: [[0, 3], [21, 28], 81],
                    11: [[0, 3], [21, 29]],
                    12: [[0, 2], [21, 30], 81],
                    13: [[0, 2], 21, 22, 81, 82],
                    31: [0, 1, [22, 27], 30]
                },
                44: {
                    0: [0],
                    1: [[0, 7], [11, 16], 83, 84],
                    2: [[0, 5], 21, 22, 24, 29, 32, 33, 81, 82],
                    3: [0, 1, [3, 8]],
                    4: [[0, 4]],
                    5: [0, 1, [6, 15], 23, 82, 83],
                    6: [0, 1, [4, 8]],
                    7: [0, 1, [3, 5], 81, [83, 85]],
                    8: [[0, 4], 11, 23, 25, [81, 83]],
                    9: [[0, 3], 23, [81, 83]],
                    12: [[0, 3], [23, 26], 83, 84],
                    13: [[0, 3], [22, 24], 81],
                    14: [[0, 2], [21, 24], 26, 27, 81],
                    15: [[0, 2], 21, 23, 81],
                    16: [[0, 2], [21, 25]],
                    17: [[0, 2], 21, 23, 81],
                    18: [[0, 3], 21, 23, [25, 27], 81, 82],
                    19: [0],
                    20: [0],
                    51: [[0, 3], 21, 22],
                    52: [[0, 3], 21, 22, 24, 81],
                    53: [[0, 2], [21, 23], 81]
                },
                45: {
                    0: [0],
                    1: [[0, 9], [21, 27]],
                    2: [[0, 5], [21, 26]],
                    3: [[0, 5], 11, 12, [21, 32]],
                    4: [0, 1, [3, 6], 11, [21, 23], 81],
                    5: [[0, 3], 12, 21],
                    6: [[0, 3], 21, 81],
                    7: [[0, 3], 21, 22],
                    8: [[0, 4], 21, 81],
                    9: [[0, 3], [21, 24], 81],
                    10: [[0, 2], [21, 31]],
                    11: [[0, 2], [21, 23]],
                    12: [[0, 2], [21, 29], 81],
                    13: [[0, 2], [21, 24], 81],
                    14: [[0, 2], [21, 25], 81]
                },
                46: {
                    0: [0],
                    1: [0, 1, [5, 8]],
                    2: [0, 1],
                    3: [0, [21, 23]],
                    90: [[0, 3], [5, 7], [21, 39]]
                },
                50: {
                    0: [0],
                    1: [[0, 19]],
                    2: [0, [22, 38], [40, 43]],
                    3: [0, [81, 84]]
                },
                51: {
                    0: [0],
                    1: [0, 1, [4, 8], [12, 15], [21, 24], 29, 31, 32, [81, 84]],
                    3: [[0, 4], 11, 21, 22],
                    4: [[0, 3], 11, 21, 22],
                    5: [[0, 4], 21, 22, 24, 25],
                    6: [0, 1, 3, 23, 26, [81, 83]],
                    7: [0, 1, 3, 4, [22, 27], 81],
                    8: [[0, 2], 11, 12, [21, 24]],
                    9: [[0, 4], [21, 23]],
                    10: [[0, 2], 11, 24, 25, 28],
                    11: [[0, 2], [11, 13], 23, 24, 26, 29, 32, 33, 81],
                    13: [[0, 4], [21, 25], 81],
                    14: [[0, 2], [21, 25]],
                    15: [[0, 3], [21, 29]],
                    16: [[0, 3], [21, 23], 81],
                    17: [[0, 3], [21, 25], 81],
                    18: [[0, 3], [21, 27]],
                    19: [[0, 3], [21, 23]],
                    20: [[0, 2], 21, 22, 81],
                    32: [0, [21, 33]],
                    33: [0, [21, 38]],
                    34: [0, 1, [22, 37]]
                },
                52: {
                    0: [0],
                    1: [[0, 3], [11, 15], [21, 23], 81],
                    2: [0, 1, 3, 21, 22],
                    3: [[0, 3], [21, 30], 81, 82],
                    4: [[0, 2], [21, 25]],
                    5: [[0, 2], [21, 27]],
                    6: [[0, 3], [21, 28]],
                    22: [0, 1, [22, 30]],
                    23: [0, 1, [22, 28]],
                    24: [0, 1, [22, 28]],
                    26: [0, 1, [22, 36]],
                    27: [[0, 2], 22, 23, [25, 32]]
                },
                53: {
                    0: [0],
                    1: [[0, 3], [11, 14], 21, 22, [24, 29], 81],
                    3: [[0, 2], [21, 26], 28, 81],
                    4: [[0, 2], [21, 28]],
                    5: [[0, 2], [21, 24]],
                    6: [[0, 2], [21, 30]],
                    7: [[0, 2], [21, 24]],
                    8: [[0, 2], [21, 29]],
                    9: [[0, 2], [21, 27]],
                    23: [0, 1, [22, 29], 31],
                    25: [[0, 4], [22, 32]],
                    26: [0, 1, [21, 28]],
                    27: [0, 1, [22, 30]], 28: [0, 1, 22, 23],
                    29: [0, 1, [22, 32]],
                    31: [0, 2, 3, [22, 24]],
                    34: [0, [21, 23]],
                    33: [0, 21, [23, 25]],
                    35: [0, [21, 28]]
                },
                54: {
                    0: [0],
                    1: [[0, 2], [21, 27]],
                    21: [0, [21, 29], 32, 33],
                    22: [0, [21, 29], [31, 33]],
                    23: [0, 1, [22, 38]],
                    24: [0, [21, 31]],
                    25: [0, [21, 27]],
                    26: [0, [21, 27]]
                },
                61: {
                    0: [0],
                    1: [[0, 4], [11, 16], 22, [24, 26]],
                    2: [[0, 4], 22],
                    3: [[0, 4], [21, 24], [26, 31]],
                    4: [[0, 4], [22, 31], 81],
                    5: [[0, 2], [21, 28], 81, 82],
                    6: [[0, 2], [21, 32]],
                    7: [[0, 2], [21, 30]],
                    8: [[0, 2], [21, 31]],
                    9: [[0, 2], [21, 29]],
                    10: [[0, 2], [21, 26]]
                },
                62: {
                    0: [0],
                    1: [[0, 5], 11, [21, 23]],
                    2: [0, 1],
                    3: [[0, 2], 21],
                    4: [[0, 3], [21, 23]],
                    5: [[0, 3], [21, 25]],
                    6: [[0, 2], [21, 23]],
                    7: [[0, 2], [21, 25]],
                    8: [[0, 2], [21, 26]],
                    9: [[0, 2], [21, 24], 81, 82],
                    10: [[0, 2], [21, 27]],
                    11: [[0, 2], [21, 26]],
                    12: [[0, 2], [21, 28]],
                    24: [0, 21, [24, 29]],
                    26: [0, 21, [23, 30]],
                    29: [0, 1, [21, 27]],
                    30: [0, 1, [21, 27]]
                },
                63: {
                    0: [0],
                    1: [[0, 5], [21, 23]],
                    2: [0, 2, [21, 25]],
                    21: [0, [21, 23], [26, 28]],
                    22: [0, [21, 24]],
                    23: [0, [21, 24]],
                    25: [0, [21, 25]],
                    26: [0, [21, 26]],
                    27: [0, 1, [21, 26]],
                    28: [[0, 2], [21, 23]]
                },
                64: {
                    0: [0],
                    1: [0, 1, [4, 6], 21, 22, 81],
                    2: [[0, 3], 5, [21, 23]],
                    3: [[0, 3], [21, 24], 81],
                    4: [[0, 2], [21, 25]],
                    5: [[0, 2], 21, 22]
                },
                65: {
                    0: [0],
                    1: [[0, 9], 21],
                    2: [[0, 5]],
                    21: [0, 1, 22, 23],
                    22: [0, 1, 22, 23],
                    23: [[0, 3], [23, 25], 27, 28],
                    28: [0, 1, [22, 29]],
                    29: [0, 1, [22, 29]],
                    30: [0, 1, [22, 24]], 31: [0, 1, [21, 31]],
                    32: [0, 1, [21, 27]],
                    40: [0, 2, 3, [21, 28]],
                    42: [[0, 2], 21, [23, 26]],
                    43: [0, 1, [21, 26]],
                    90: [[0, 4]], 27: [[0, 2], 22, 23]
                },
                71: { 0: [0] },
                81: { 0: [0] },
                82: { 0: [0] }
            };
            
            var provincial  = parseInt(value.substr(0, 2), 10),
                prefectural = parseInt(value.substr(2, 2), 10),
                county      = parseInt(value.substr(4, 2), 10);
            
            if (!adminDivisionCodes[provincial] || !adminDivisionCodes[provincial][prefectural]) {
                return false;
            }
            var inRange  = false,
                rangeDef = adminDivisionCodes[provincial][prefectural];
            for (var i = 0; i < rangeDef.length; i++) {
                if (($.isArray(rangeDef[i]) && rangeDef[i][0] <= county && county <= rangeDef[i][1])
                    || (!$.isArray(rangeDef[i]) && county === rangeDef[i]))
                {
                    inRange = true;
                    break;
                }
            }

            if (!inRange) {
                return false;
            }
            
            // Check date of birth
            var dob;
            if (value.length === 18) {
                dob = value.substr(6, 8);
            } else /* length == 15 */ { 
                dob = '19' + value.substr(6, 6);
            }
            var year  = parseInt(dob.substr(0, 4), 10),
                month = parseInt(dob.substr(4, 2), 10),
                day   = parseInt(dob.substr(6, 2), 10);
            if (!FormValidation.Helper.date(year, month, day)) {
                return false;
            }
            
            // Check checksum (18-digit system only)
            if (value.length === 18) {
                var sum    = 0,
                    weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                for (i = 0; i < 17; i++) {
                    sum += parseInt(value.charAt(i), 10) * weight[i];
                }
                sum = (12 - (sum % 11)) % 11;
                var checksum = (value.charAt(17).toUpperCase() !== 'X') ? parseInt(value.charAt(17), 10) : 10;
                return checksum === sum;
            }
            
            return true;
        },
        
        /**
         * Validate Czech national identification number (RC)
         * Examples:
         * - Valid: 7103192745, 991231123
         * - Invalid: 1103492745, 590312123
         *
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _cz: function(value) {
            if (!/^\d{9,10}$/.test(value)) {
                return false;
            }
            var year  = 1900 + parseInt(value.substr(0, 2), 10),
                month = parseInt(value.substr(2, 2), 10) % 50 % 20,
                day   = parseInt(value.substr(4, 2), 10);
            if (value.length === 9) {
                if (year >= 1980) {
                    year -= 100;
                }
                if (year > 1953) {
                    return false;
                }
            } else if (year < 1954) {
                year += 100;
            }

            if (!FormValidation.Helper.date(year, month, day)) {
                return false;
            }

            // Check that the birth date is not in the future
            if (value.length === 10) {
                var check = parseInt(value.substr(0, 9), 10) % 11;
                if (year < 1985) {
                    check = check % 10;
                }
                return (check + '' === value.substr(9, 1));
            }

            return true;
        },

        /**
         * Validate Danish Personal Identification number (CPR)
         * Examples:
         * - Valid: 2110625629, 211062-5629
         * - Invalid: 511062-5629
         *
         * @see https://en.wikipedia.org/wiki/Personal_identification_number_(Denmark)
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _dk: function(value) {
            if (!/^[0-9]{6}[-]{0,1}[0-9]{4}$/.test(value)) {
                return false;
            }
            value = value.replace(/-/g, '');
            var day   = parseInt(value.substr(0, 2), 10),
                month = parseInt(value.substr(2, 2), 10),
                year  = parseInt(value.substr(4, 2), 10);

            switch (true) {
                case ('5678'.indexOf(value.charAt(6)) !== -1 && year >= 58):
                    year += 1800;
                    break;
                case ('0123'.indexOf(value.charAt(6)) !== -1):
                case ('49'.indexOf(value.charAt(6)) !== -1 && year >= 37):
                    year += 1900;
                    break;
                default:
                    year += 2000;
                    break;
            }

            return FormValidation.Helper.date(year, month, day);
        },

        /**
         * Validate Estonian Personal Identification Code (isikukood)
         * Examples:
         * - Valid: 37605030299
         *
         * @see http://et.wikipedia.org/wiki/Isikukood
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _ee: function(value) {
            // Use the same format as Lithuanian Personal Code
            return this._lt(value);
        },

        /**
         * Validate Spanish personal identity code (DNI)
         * Support i) DNI (for Spanish citizens), ii) NIE (for foreign people)
         * and iii) CIF (for legal entities)
         *
         * Examples:
         * - Valid:
         *      i) 54362315K, 54362315-K
         *      ii) X2482300W, X-2482300W, X-2482300-W
         *      iii) A58818501, A-58818501
         * - Invalid:
         *      i) 54362315Z
         *      ii) X-2482300A
         *      iii) K58818501, G58818507
         *
         * @see https://en.wikipedia.org/wiki/National_identification_number#Spain
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _es: function(value) {
            var isDNI = /^[0-9]{8}[-]{0,1}[A-HJ-NP-TV-Z]$/.test(value),
                isNIE = /^[XYZ][-]{0,1}[0-9]{7}[-]{0,1}[A-HJ-NP-TV-Z]$/.test(value),
                isCIF = /^[A-HNPQS][-]{0,1}[0-9]{7}[-]{0,1}[0-9A-J]$/.test(value);
            if (!isDNI && !isNIE && !isCIF) {
                return false;
            }

            value = value.replace(/-/g, '');
            var check;
            if (isDNI || isNIE) {
                var index = 'XYZ'.indexOf(value.charAt(0));
                if (index !== -1) {
                    // It is NIE number
                    value = index + value.substr(1) + '';
                }

                check = parseInt(value.substr(0, 8), 10);
                check = 'TRWAGMYFPDXBNJZSQVHLCKE'[check % 23];
                return (check === value.substr(8, 1));
            } else {
                check = value.substr(1, 7);
                var letter  = value[0],
                    control = value.substr(-1),
                    sum     = 0;

                // The digits in the even positions are added to the sum directly.
                // The ones in the odd positions are multiplied by 2 and then added to the sum.
                // If the result of multiplying by 2 is 10 or higher, add the two digits
                // together and add that to the sum instead
                for (var i = 0; i < check.length; i++) {
                    if (i % 2 !== 0) {
                        sum += parseInt(check[i], 10);
                    } else {
                        var tmp = '' + (parseInt(check[i], 10) * 2);
                        sum += parseInt(tmp[0], 10);
                        if (tmp.length === 2) {
                            sum += parseInt(tmp[1], 10);
                        }
                    }
                }

                // The control digit is calculated from the last digit of the sum.
                // If that last digit is not 0, subtract it from 10
                var lastDigit = sum - (Math.floor(sum / 10) * 10);
                if (lastDigit !== 0) {
                    lastDigit = 10 - lastDigit;
                }
                
                if ('KQS'.indexOf(letter) !== -1) {
                    // If the CIF starts with a K, Q or S, the control digit must be a letter
                    return (control === 'JABCDEFGHI'[lastDigit]);
                } else if ('ABEH'.indexOf(letter) !== -1) {
                    // If it starts with A, B, E or H, it has to be a number
                    return (control === ('' + lastDigit));
                } else {
                    // In any other case, it doesn't matter
                    return (control === ('' + lastDigit) || control === 'JABCDEFGHI'[lastDigit]);
                }
            }
        },

        /**
         * Validate Finnish Personal Identity Code (HETU)
         * Examples:
         * - Valid: 311280-888Y, 131052-308T
         * - Invalid: 131052-308U, 310252-308Y
         *
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _fi: function(value) {
            if (!/^[0-9]{6}[-+A][0-9]{3}[0-9ABCDEFHJKLMNPRSTUVWXY]$/.test(value)) {
                return false;
            }
            var day       = parseInt(value.substr(0, 2), 10),
                month     = parseInt(value.substr(2, 2), 10),
                year      = parseInt(value.substr(4, 2), 10),
                centuries = {
                    '+': 1800,
                    '-': 1900,
                    'A': 2000
                };
            year = centuries[value.charAt(6)] + year;

            if (!FormValidation.Helper.date(year, month, day)) {
                return false;
            }

            var individual = parseInt(value.substr(7, 3), 10);
            if (individual < 2) {
                return false;
            }
            var n = value.substr(0, 6) + value.substr(7, 3) + '';
            n = parseInt(n, 10);
            return '0123456789ABCDEFHJKLMNPRSTUVWXY'.charAt(n % 31) === value.charAt(10);
        },

        /**
         * Validate Croatian personal identification number (OIB)
         * Examples:
         * - Valid: 33392005961
         * - Invalid: 33392005962
         *
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _hr: function(value) {
            if (!/^[0-9]{11}$/.test(value)) {
                return false;
            }
            return FormValidation.Helper.mod11And10(value);
        },

        /**
         * Validate Irish Personal Public Service Number (PPS)
         * Examples:
         * - Valid: 6433435F, 6433435FT, 6433435FW, 6433435OA, 6433435IH, 1234567TW, 1234567FA
         * - Invalid: 6433435E, 6433435VH
         *
         * @see https://en.wikipedia.org/wiki/Personal_Public_Service_Number
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _ie: function(value) {
            if (!/^\d{7}[A-W][AHWTX]?$/.test(value)) {
                return false;
            }

            var getCheckDigit = function(value) {
                while (value.length < 7) {
                    value = '0' + value;
                }
                var alphabet = 'WABCDEFGHIJKLMNOPQRSTUV',
                    sum      = 0;
                for (var i = 0; i < 7; i++) {
                    sum += parseInt(value.charAt(i), 10) * (8 - i);
                }
                sum += 9 * alphabet.indexOf(value.substr(7));
                return alphabet[sum % 23];
            };

            // 2013 format
            if (value.length === 9 && ('A' === value.charAt(8) || 'H' === value.charAt(8))) {
                return value.charAt(7) === getCheckDigit(value.substr(0, 7) + value.substr(8) + '');
            }
            // The old format
            else {
                return value.charAt(7) === getCheckDigit(value.substr(0, 7));
            }
        },

        /**
         * Validate Iceland national identification number (Kennitala)
         * Examples:
         * - Valid: 120174-3399, 1201743399, 0902862349
         *
         * @see http://en.wikipedia.org/wiki/Kennitala
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _is: function(value) {
            if (!/^[0-9]{6}[-]{0,1}[0-9]{4}$/.test(value)) {
                return false;
            }
            value = value.replace(/-/g, '');
            var day     = parseInt(value.substr(0, 2), 10),
                month   = parseInt(value.substr(2, 2), 10),
                year    = parseInt(value.substr(4, 2), 10),
                century = parseInt(value.charAt(9), 10);

            year = (century === 9) ? (1900 + year) : ((20 + century) * 100 + year);
            if (!FormValidation.Helper.date(year, month, day, true)) {
                return false;
            }
            // Validate the check digit
            var sum    = 0,
                weight = [3, 2, 7, 6, 5, 4, 3, 2];
            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }
            sum = 11 - sum % 11;
            return (sum + '' === value.charAt(8));
        },

        /**
         * Validate Lithuanian Personal Code (Asmens kodas)
         * Examples:
         * - Valid: 38703181745
         * - Invalid: 38703181746, 78703181745, 38703421745
         *
         * @see http://en.wikipedia.org/wiki/National_identification_number#Lithuania
         * @see http://www.adomas.org/midi2007/pcode.html
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _lt: function(value) {
            if (!/^[0-9]{11}$/.test(value)) {
                return false;
            }
            var gender  = parseInt(value.charAt(0), 10),
                year    = parseInt(value.substr(1, 2), 10),
                month   = parseInt(value.substr(3, 2), 10),
                day     = parseInt(value.substr(5, 2), 10),
                century = (gender % 2 === 0) ? (17 + gender / 2) : (17 + (gender + 1) / 2);
            year = century * 100 + year;
            if (!FormValidation.Helper.date(year, month, day, true)) {
                return false;
            }

            // Validate the check digit
            var sum    = 0,
                weight = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
            for (var i = 0; i < 10; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }
            sum = sum % 11;
            if (sum !== 10) {
                return sum + '' === value.charAt(10);
            }

            // Re-calculate the check digit
            sum    = 0;
            weight = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3];
            for (i = 0; i < 10; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }
            sum = sum % 11;
            if (sum === 10) {
                sum = 0;
            }
            return (sum + '' === value.charAt(10));
        },

        /**
         * Validate Latvian Personal Code (Personas kods)
         * Examples:
         * - Valid: 161175-19997, 16117519997
         * - Invalid: 161375-19997
         *
         * @see http://laacz.lv/2006/11/25/pk-parbaudes-algoritms/
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _lv: function(value) {
            if (!/^[0-9]{6}[-]{0,1}[0-9]{5}$/.test(value)) {
                return false;
            }
            value = value.replace(/\D/g, '');
            // Check birth date
            var day   = parseInt(value.substr(0, 2), 10),
                month = parseInt(value.substr(2, 2), 10),
                year  = parseInt(value.substr(4, 2), 10);
            year = year + 1800 + parseInt(value.charAt(6), 10) * 100;

            if (!FormValidation.Helper.date(year, month, day, true)) {
                return false;
            }

            // Check personal code
            var sum    = 0,
                weight = [10, 5, 8, 4, 2, 1, 6, 3, 7, 9];
            for (var i = 0; i < 10; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }
            sum = (sum + 1) % 11 % 10;
            return (sum + '' === value.charAt(10));
        },

        /**
         * Validate Dutch national identification number (BSN)
         * Examples:
         * - Valid: 111222333, 941331490, 9413.31.490
         * - Invalid: 111252333
         *
         * @see https://nl.wikipedia.org/wiki/Burgerservicenummer
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _nl: function(value) {
            while (value.length < 9) {
                value = '0' + value;
            }
            if (!/^[0-9]{4}[.]{0,1}[0-9]{2}[.]{0,1}[0-9]{3}$/.test(value)) {
                return false;
            }
            value = value.replace(/\./g, '');
            if (parseInt(value, 10) === 0) {
                return false;
            }
            var sum    = 0,
                length = value.length;
            for (var i = 0; i < length - 1; i++) {
                sum += (9 - i) * parseInt(value.charAt(i), 10);
            }
            sum = sum % 11;
            if (sum === 10) {
                sum = 0;
            }
            return (sum + '' === value.charAt(length - 1));
        },
        
        /**
         * Validate Poland citizen number (PESEL)
         * 
         * @see http://en.wikipedia.org/wiki/National_identification_number#Poland
         * @see http://en.wikipedia.org/wiki/PESEL
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _pl: function(value) {
            if (!/^[0-9]{11}$/.test(value)) {
                return false;
            }

            var sum    = 0,
                length = value.length,
                weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3, 7];

            for (var i = 0; i < length - 1; i++) {
                sum += weight[i] * parseInt(value.charAt(i), 10);
            }
            sum = sum % 10;
            if (sum === 0) {
                sum = 10;
            }
            sum = 10 - sum;

            return (sum + '' === value.charAt(length - 1));
        },

        /**
         * Validate Romanian numerical personal code (CNP)
         * Examples:
         * - Valid: 1630615123457, 1800101221144
         * - Invalid: 8800101221144, 1632215123457, 1630615123458
         *
         * @see http://en.wikipedia.org/wiki/National_identification_number#Romania
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _ro: function(value) {
            if (!/^[0-9]{13}$/.test(value)) {
                return false;
            }
            var gender = parseInt(value.charAt(0), 10);
            if (gender === 0 || gender === 7 || gender === 8) {
                return false;
            }

            // Determine the date of birth
            var year      = parseInt(value.substr(1, 2), 10),
                month     = parseInt(value.substr(3, 2), 10),
                day       = parseInt(value.substr(5, 2), 10),
                // The year of date is determined base on the gender
                centuries = {
                    '1': 1900,  // Male born between 1900 and 1999
                    '2': 1900,  // Female born between 1900 and 1999
                    '3': 1800,  // Male born between 1800 and 1899
                    '4': 1800,  // Female born between 1800 and 1899
                    '5': 2000,  // Male born after 2000
                    '6': 2000   // Female born after 2000
                };
            if (day > 31 && month > 12) {
                return false;
            }
            if (gender !== 9) {
                year = centuries[gender + ''] + year;
                if (!FormValidation.Helper.date(year, month, day)) {
                    return false;
                }
            }

            // Validate the check digit
            var sum    = 0,
                weight = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9],
                length = value.length;
            for (var i = 0; i < length - 1; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }
            sum = sum % 11;
            if (sum === 10) {
                sum = 1;
            }
            return (sum + '' === value.charAt(length - 1));
        },

        /**
         * Validate Swedish personal identity number (personnummer)
         * Examples:
         * - Valid: 8112289874, 811228-9874, 811228+9874
         * - Invalid: 811228-9873
         *
         * @see http://en.wikipedia.org/wiki/Personal_identity_number_(Sweden)
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _se: function(value) {
            if (!/^[0-9]{10}$/.test(value) && !/^[0-9]{6}[-|+][0-9]{4}$/.test(value)) {
                return false;
            }
            value = value.replace(/[^0-9]/g, '');

            var year  = parseInt(value.substr(0, 2), 10) + 1900,
                month = parseInt(value.substr(2, 2), 10),
                day   = parseInt(value.substr(4, 2), 10);
            if (!FormValidation.Helper.date(year, month, day)) {
                return false;
            }

            // Validate the last check digit
            return FormValidation.Helper.luhn(value);
        },

        /**
         * Validate Slovak national identifier number (RC)
         * Examples:
         * - Valid: 7103192745, 991231123
         * - Invalid: 7103192746, 1103492745
         *
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _sk: function(value) {
            // Slovakia uses the same format as Czech Republic
            return this._cz(value);
        },

        /**
         * Validate San Marino citizen number
         *
         * @see http://en.wikipedia.org/wiki/National_identification_number#San_Marino
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _sm: function(value) {
            return /^\d{5}$/.test(value);
        },

        /**
         * Validate Thailand citizen number
         * Examples:
         * - Valid: 7145620509547, 3688699975685, 2368719339716
         * - Invalid: 1100800092310
         *
         * @see http://en.wikipedia.org/wiki/National_identification_number#Thailand
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _th: function(value) {
            if (value.length !== 13) {
                return false;
            }

            var sum = 0;
            for (var i = 0; i < 12; i++) {
                sum += parseInt(value.charAt(i), 10) * (13 - i);
            }

            return (11 - sum % 11) % 10 === parseInt(value.charAt(12), 10);
        },

        /**
         * Validate South African ID
         * Example:
         * - Valid: 8001015009087
         * - Invalid: 8001015009287, 8001015009086
         *
         * @see http://en.wikipedia.org/wiki/National_identification_number#South_Africa
         * @param {String} value The ID
         * @returns {Boolean}
         */
        _za: function(value) {
            if (!/^[0-9]{10}[0|1][8|9][0-9]$/.test(value)) {
                return false;
            }
            var year        = parseInt(value.substr(0, 2), 10),
                currentYear = new Date().getFullYear() % 100,
                month       = parseInt(value.substr(2, 2), 10),
                day         = parseInt(value.substr(4, 2), 10);
            year = (year >= currentYear) ? (year + 1900) : (year + 2000);

            if (!FormValidation.Helper.date(year, month, day)) {
                return false;
            }

            // Validate the last check digit
            return FormValidation.Helper.luhn(value);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            identical: {
                'default': 'Please enter the same value'
            }
        }
    });

    FormValidation.Validator.identical = {
        html5Attributes: {
            message: 'message',
            field: 'field'
        },

        /**
         * Bind the validator on the live change of the field to compare with current one
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of the following key:
         * - field: The name of field that will be used to compare with current one
         */
        init: function(validator, $field, options) {
            var compareWith = validator.getFieldElements(options.field);
            validator.onLiveChange(compareWith, 'live_identical', function() {
                var status = validator.getStatus($field, 'identical');
                if (status !== validator.STATUS_NOT_VALIDATED) {
                    validator.revalidateField($field);
                }
            });
        },

        /**
         * Unbind the validator on the live change of the field to compare with current one
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of the following key:
         * - field: The name of field that will be used to compare with current one
         */
        destroy: function(validator, $field, options) {
            var compareWith = validator.getFieldElements(options.field);
            validator.offLiveChange(compareWith, 'live_identical');
        },

        /**
         * Check if input value equals to value of particular one
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of the following key:
         * - field: The name of field that will be used to compare with current one
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value       = validator.getFieldValue($field, 'identical'),
                compareWith = validator.getFieldElements(options.field);
            if (compareWith === null || compareWith.length === 0) {
                return true;
            }

            var compareValue = validator.getFieldValue(compareWith, 'identical');
            if (value === compareValue) {
                validator.updateStatus(compareWith, validator.STATUS_VALID, 'identical');
                return true;
            }

            return false;
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            imei: {
                'default': 'Please enter a valid IMEI number'
            }
        }
    });

    FormValidation.Validator.imei = {
        /**
         * Validate IMEI (International Mobile Station Equipment Identity)
         * Examples:
         * - Valid: 35-209900-176148-1, 35-209900-176148-23, 3568680000414120, 490154203237518
         * - Invalid: 490154203237517
         *
         * @see http://en.wikipedia.org/wiki/International_Mobile_Station_Equipment_Identity
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'imei');
            if (value === '') {
                return true;
            }

            switch (true) {
                case /^\d{15}$/.test(value):
                case /^\d{2}-\d{6}-\d{6}-\d{1}$/.test(value):
                case /^\d{2}\s\d{6}\s\d{6}\s\d{1}$/.test(value):
                    value = value.replace(/[^0-9]/g, '');
                    return FormValidation.Helper.luhn(value);

                case /^\d{14}$/.test(value):
                case /^\d{16}$/.test(value):
                case /^\d{2}-\d{6}-\d{6}(|-\d{2})$/.test(value):
                case /^\d{2}\s\d{6}\s\d{6}(|\s\d{2})$/.test(value):
                    return true;

                default:
                    return false;
            }
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            imo: {
                'default': 'Please enter a valid IMO number'
            }
        }
    });

    FormValidation.Validator.imo = {
        /**
         * Validate IMO (International Maritime Organization)
         * Examples:
         * - Valid: IMO 8814275, IMO 9176187
         * - Invalid: IMO 8814274
         *
         * @see http://en.wikipedia.org/wiki/IMO_Number
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'imo');
            if (value === '') {
                return true;
            }

            if (!/^IMO \d{7}$/i.test(value)) {
                return false;
            }
            
            // Grab just the digits
            var sum    = 0,
                digits = value.replace(/^.*(\d{7})$/, '$1');
            
            // Go over each char, multiplying by the inverse of it's position
            // IMO 9176187
            // (9 * 7) + (1 * 6) + (7 * 5) + (6 * 4) + (1 * 3) + (8 * 2) = 147
            // Take the last digit of that, that's the check digit (7)
            for (var i = 6; i >= 1; i--) {
                sum += (digits.slice((6 - i), -i) * (i + 1));
            }

            return sum % 10 === parseInt(digits.charAt(6), 10);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            integer: {
                'default': 'Please enter a valid number'
            }
        }
    });

    FormValidation.Validator.integer = {
        enableByHtml5: function($field) {
            return ('number' === $field.attr('type')) && ($field.attr('step') === undefined || $field.attr('step') % 1 === 0);
        },

        /**
         * Return true if the input value is an integer
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following key:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            if (this.enableByHtml5($field) && $field.get(0).validity && $field.get(0).validity.badInput === true) {
                return false;
            }

            var value = validator.getFieldValue($field, 'integer');
            if (value === '') {
                return true;
            }
            return /^(?:-?(?:0|[1-9][0-9]*))$/.test(value);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            ip: {
                'default': 'Please enter a valid IP address',
                ipv4: 'Please enter a valid IPv4 address',
                ipv6: 'Please enter a valid IPv6 address'
            }
        }
    });

    FormValidation.Validator.ip = {
        html5Attributes: {
            message: 'message',
            ipv4: 'ipv4',
            ipv6: 'ipv6'
        },

        /**
         * Return true if the input value is a IP address.
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - ipv4: Enable IPv4 validator, default to true
         * - ipv6: Enable IPv6 validator, default to true
         * - message: The invalid message
         * @returns {Boolean|Object}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'ip');
            if (value === '') {
                return true;
            }
            options = $.extend({}, { ipv4: true, ipv6: true }, options);

            var locale    = validator.getLocale(),
                ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                ipv6Regex = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
                valid     = false,
                message;

            switch (true) {
                case (options.ipv4 && !options.ipv6):
                    valid   = ipv4Regex.test(value);
                    message = options.message || FormValidation.I18n[locale].ip.ipv4;
                    break;

                case (!options.ipv4 && options.ipv6):
                    valid   = ipv6Regex.test(value);
                    message = options.message || FormValidation.I18n[locale].ip.ipv6;
                    break;

                case (options.ipv4 && options.ipv6):
                /* falls through */
                default:
                    valid   = ipv4Regex.test(value) || ipv6Regex.test(value);
                    message = options.message || FormValidation.I18n[locale].ip['default'];
                    break;
            }

            return {
                valid: valid,
                message: message
            };
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            isbn: {
                'default': 'Please enter a valid ISBN number'
            }
        }
    });

    FormValidation.Validator.isbn = {
        /**
         * Return true if the input value is a valid ISBN 10 or ISBN 13 number
         * Examples:
         * - Valid:
         * ISBN 10: 99921-58-10-7, 9971-5-0210-0, 960-425-059-0, 80-902734-1-6, 85-359-0277-5, 1-84356-028-3, 0-684-84328-5, 0-8044-2957-X, 0-85131-041-9, 0-943396-04-2, 0-9752298-0-X
         * ISBN 13: 978-0-306-40615-7
         * - Invalid:
         * ISBN 10: 99921-58-10-6
         * ISBN 13: 978-0-306-40615-6
         *
         * @see http://en.wikipedia.org/wiki/International_Standard_Book_Number
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} [options] Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'isbn');
            if (value === '') {
                return true;
            }

            // http://en.wikipedia.org/wiki/International_Standard_Book_Number#Overview
            // Groups are separated by a hyphen or a space
            var type;
            switch (true) {
                case /^\d{9}[\dX]$/.test(value):
                case (value.length === 13 && /^(\d+)-(\d+)-(\d+)-([\dX])$/.test(value)):
                case (value.length === 13 && /^(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(value)):
                    type = 'ISBN10';
                    break;
                case /^(978|979)\d{9}[\dX]$/.test(value):
                case (value.length === 17 && /^(978|979)-(\d+)-(\d+)-(\d+)-([\dX])$/.test(value)):
                case (value.length === 17 && /^(978|979)\s(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(value)):
                    type = 'ISBN13';
                    break;
                default:
                    return false;
            }

            // Replace all special characters except digits and X
            value = value.replace(/[^0-9X]/gi, '');
            var chars  = value.split(''),
                length = chars.length,
                sum    = 0,
                i,
                checksum;

            switch (type) {
                case 'ISBN10':
                    sum = 0;
                    for (i = 0; i < length - 1; i++) {
                        sum += parseInt(chars[i], 10) * (10 - i);
                    }
                    checksum = 11 - (sum % 11);
                    if (checksum === 11) {
                        checksum = 0;
                    } else if (checksum === 10) {
                        checksum = 'X';
                    }
                    return (checksum + '' === chars[length - 1]);

                case 'ISBN13':
                    sum = 0;
                    for (i = 0; i < length - 1; i++) {
                        sum += ((i % 2 === 0) ? parseInt(chars[i], 10) : (parseInt(chars[i], 10) * 3));
                    }
                    checksum = 10 - (sum % 10);
                    if (checksum === 10) {
                        checksum = '0';
                    }
                    return (checksum + '' === chars[length - 1]);

                default:
                    return false;
            }
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            isin: {
                'default': 'Please enter a valid ISIN number'
            }
        }
    });

    FormValidation.Validator.isin = {
        // Available country codes
        // See http://isin.net/country-codes/
        COUNTRY_CODES: 'AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW',

        /**
         * Validate an ISIN (International Securities Identification Number)
         * Examples:
         * - Valid: US0378331005, AU0000XVGZA3, GB0002634946
         * - Invalid: US0378331004, AA0000XVGZA3
         *
         * @see http://en.wikipedia.org/wiki/International_Securities_Identifying_Number
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'isin');
            if (value === '') {
                return true;
            }

            value = value.toUpperCase();
            var regex = new RegExp('^(' + this.COUNTRY_CODES + ')[0-9A-Z]{10}$');
            if (!regex.test(value)) {
                return false;
            }

            var converted = '',
                length    = value.length;
            // Convert letters to number
            for (var i = 0; i < length - 1; i++) {
                var c = value.charCodeAt(i);
                converted += ((c > 57) ? (c - 55).toString() : value.charAt(i));
            }

            var digits = '',
                n      = converted.length,
                group  = (n % 2 !== 0) ? 0 : 1;
            for (i = 0; i < n; i++) {
                digits += (parseInt(converted[i], 10) * ((i % 2) === group ? 2 : 1) + '');
            }

            var sum = 0;
            for (i = 0; i < digits.length; i++) {
                sum += parseInt(digits.charAt(i), 10);
            }
            sum = (10 - (sum % 10)) % 10;
            return sum + '' === value.charAt(length - 1);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            ismn: {
                'default': 'Please enter a valid ISMN number'
            }
        }
    });

    FormValidation.Validator.ismn = {
        /**
         * Validate ISMN (International Standard Music Number)
         * Examples:
         * - Valid: M230671187, 979-0-0601-1561-5, 979 0 3452 4680 5, 9790060115615
         * - Invalid: 9790060115614
         *
         * @see http://en.wikipedia.org/wiki/International_Standard_Music_Number
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'ismn');
            if (value === '') {
                return true;
            }

            // Groups are separated by a hyphen or a space
            var type;
            switch (true) {
                case /^M\d{9}$/.test(value):
                case /^M-\d{4}-\d{4}-\d{1}$/.test(value):
                case /^M\s\d{4}\s\d{4}\s\d{1}$/.test(value):
                    type = 'ISMN10';
                    break;
                case /^9790\d{9}$/.test(value):
                case /^979-0-\d{4}-\d{4}-\d{1}$/.test(value):
                case /^979\s0\s\d{4}\s\d{4}\s\d{1}$/.test(value):
                    type = 'ISMN13';
                    break;
                default:
                    return false;
            }

            if ('ISMN10' === type) {
                value = '9790' + value.substr(1);
            }

            // Replace all special characters except digits
            value = value.replace(/[^0-9]/gi, '');
            var length = value.length,
                sum    = 0,
                weight = [1, 3];
            for (var i = 0; i < length - 1; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i % 2];
            }
            sum = 10 - sum % 10;
            return (sum + '' === value.charAt(length - 1));
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            issn: {
                'default': 'Please enter a valid ISSN number'
            }
        }
    });

    FormValidation.Validator.issn = {
        /**
         * Validate ISSN (International Standard Serial Number)
         * Examples:
         * - Valid: 0378-5955, 0024-9319, 0032-1478
         * - Invalid: 0032-147X
         *
         * @see http://en.wikipedia.org/wiki/International_Standard_Serial_Number
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'issn');
            if (value === '') {
                return true;
            }

            // Groups are separated by a hyphen or a space
            if (!/^\d{4}\-\d{3}[\dX]$/.test(value)) {
                return false;
            }

            // Replace all special characters except digits and X
            value = value.replace(/[^0-9X]/gi, '');
            var chars  = value.split(''),
                length = chars.length,
                sum    = 0;

            if (chars[7] === 'X') {
                chars[7] = 10;
            }
            for (var i = 0; i < length; i++) {
                sum += parseInt(chars[i], 10) * (8 - i);
            }
            return (sum % 11 === 0);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            lessThan: {
                'default': 'Please enter a value less than or equal to %s',
                notInclusive: 'Please enter a value less than %s'
            }
        }
    });

    FormValidation.Validator.lessThan = {
        html5Attributes: {
            message: 'message',
            value: 'value',
            inclusive: 'inclusive'
        },

        enableByHtml5: function($field) {
            var type = $field.attr('type'),
                max  = $field.attr('max');
            if (max && type !== 'date') {
                return {
                    value: max
                };
            }

            return false;
        },

        /**
         * Return true if the input value is less than or equal to given number
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - value: The number used to compare to. It can be
         *      - A number
         *      - Name of field which its value defines the number
         *      - Name of callback function that returns the number
         *      - A callback function that returns the number
         *
         * - inclusive [optional]: Can be true or false. Default is true
         * - message: The invalid message
         * @returns {Boolean|Object}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'lessThan');
            if (value === '') {
                return true;
            }
            
			value = this._format(value);
            if (!$.isNumeric(value)) {
                return false;
            }

            var locale         = validator.getLocale(),
                compareTo      = $.isNumeric(options.value) ? options.value : validator.getDynamicOption($field, options.value),
                compareToValue = this._format(compareTo);

            value = parseFloat(value);
            return (options.inclusive === true || options.inclusive === undefined)
                    ? {
                        valid: value <= compareToValue,
                        message: FormValidation.Helper.format(options.message || FormValidation.I18n[locale].lessThan['default'], compareTo)
                    }
                    : {
                        valid: value < compareToValue,
                        message: FormValidation.Helper.format(options.message || FormValidation.I18n[locale].lessThan.notInclusive, compareTo)
                    };
        },

        _format: function(value) {
            return (value + '').replace(',', '.');
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            mac: {
                'default': 'Please enter a valid MAC address'
            }
        }
    });

    FormValidation.Validator.mac = {
        /**
         * Return true if the input value is a MAC address.
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'mac');
            if (value === '') {
                return true;
            }

            return /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(value);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            meid: {
                'default': 'Please enter a valid MEID number'
            }
        }
    });

    FormValidation.Validator.meid = {
        /**
         * Validate MEID (Mobile Equipment Identifier)
         * Examples:
         * - Valid: 293608736500703710, 29360-87365-0070-3710, AF0123450ABCDE, AF-012345-0ABCDE
         * - Invalid: 2936087365007037101
         *
         * @see http://en.wikipedia.org/wiki/Mobile_equipment_identifier
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'meid');
            if (value === '') {
                return true;
            }

            switch (true) {
                // 14 digit hex representation (no check digit)
                case /^[0-9A-F]{15}$/i.test(value):
                // 14 digit hex representation + dashes or spaces (no check digit)
                case /^[0-9A-F]{2}[- ][0-9A-F]{6}[- ][0-9A-F]{6}[- ][0-9A-F]$/i.test(value):
                // 18 digit decimal representation (no check digit)
                case /^\d{19}$/.test(value):
                // 18 digit decimal representation + dashes or spaces (no check digit)
                case /^\d{5}[- ]\d{5}[- ]\d{4}[- ]\d{4}[- ]\d$/.test(value):
                    // Grab the check digit
                    var cd = value.charAt(value.length - 1);

                    // Strip any non-hex chars
                    value = value.replace(/[- ]/g, '');

                    // If it's all digits, luhn base 10 is used
                    if (value.match(/^\d*$/i)) {
                        return FormValidation.Helper.luhn(value);
                    }

                    // Strip the check digit
                    value = value.slice(0, -1);

                    // Get every other char, and double it
                    var cdCalc = '';
                    for (var i = 1; i <= 13; i += 2) {
                        cdCalc += (parseInt(value.charAt(i), 16) * 2).toString(16);
                    }

                    // Get the sum of each char in the string
                    var sum = 0;
                    for (i = 0; i < cdCalc.length; i++) {
                        sum += parseInt(cdCalc.charAt(i), 16);
                    }

                    // If the last digit of the calc is 0, the check digit is 0
                    return (sum % 10 === 0)
                            ? (cd === '0')
                            // Subtract it from the next highest 10s number (64 goes to 70) and subtract the sum
                            // Double it and turn it into a hex char
                            : (cd === ((Math.floor((sum + 10) / 10) * 10 - sum) * 2).toString(16));

                // 14 digit hex representation (no check digit)
                case /^[0-9A-F]{14}$/i.test(value):
                // 14 digit hex representation + dashes or spaces (no check digit)
                case /^[0-9A-F]{2}[- ][0-9A-F]{6}[- ][0-9A-F]{6}$/i.test(value):
                // 18 digit decimal representation (no check digit)
                case /^\d{18}$/.test(value):
                // 18 digit decimal representation + dashes or spaces (no check digit)
                case /^\d{5}[- ]\d{5}[- ]\d{4}[- ]\d{4}$/.test(value):
                    return true;

                default:
                    return false;
            }
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            notEmpty: {
                'default': 'Please enter a value'
            }
        }
    });

    FormValidation.Validator.notEmpty = {
        enableByHtml5: function($field) {
            var required = $field.attr('required') + '';
            return ('required' === required || 'true' === required);
        },

        /**
         * Check if input value is empty or not
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var type = $field.attr('type');
            if ('radio' === type || 'checkbox' === type) {
                var ns = validator.getNamespace();
                return validator
                            .getFieldElements($field.attr('data-' + ns + '-field'))
                            .filter(':checked')
                            .length > 0;
            }

            if ('number' === type && $field.get(0).validity && $field.get(0).validity.badInput === true) {
                return true;
            }

            var value = validator.getFieldValue($field, 'notEmpty');
            return $.trim(value) !== '';
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            numeric: {
                'default': 'Please enter a valid float number'
            }
        }
    });

    FormValidation.Validator.numeric = {
        html5Attributes: {
            message: 'message',
            separator: 'separator'
        },

        enableByHtml5: function($field) {
            return ('number' === $field.attr('type')) && ($field.attr('step') !== undefined) && ($field.attr('step') % 1 !== 0);
        },

        /**
         * Validate decimal number
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * - separator: The decimal separator. Can be "." (default), ","
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            if (this.enableByHtml5($field) && $field.get(0).validity && $field.get(0).validity.badInput === true) {
                return false;
            }

            var value = validator.getFieldValue($field, 'numeric');
            if (value === '') {
                return true;
            }
            var separator = options.separator || '.';
            if (separator !== '.') {
                value = value.replace(separator, '.');
            }

            return !isNaN(parseFloat(value)) && isFinite(value);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            phone: {
                'default': 'Please enter a valid phone number',
                country: 'Please enter a valid phone number in %s',
                countries: {
                    AE: 'United Arab Emirates',
                    BG: 'Bulgaria',
                    BR: 'Brazil',
                    CN: 'China',
                    CZ: 'Czech Republic',
                    DE: 'Germany',
                    DK: 'Denmark',
                    ES: 'Spain',
                    FR: 'France',
                    GB: 'United Kingdom',
                    IN: 'India',
                    MA: 'Morocco',
                    NL: 'Netherlands',
                    PK: 'Pakistan',
                    RO: 'Romania',
                    RU: 'Russia',
                    SK: 'Slovakia',
                    TH: 'Thailand',
                    US: 'USA',
                    VE: 'Venezuela'
                }
            }
        }
    });

    FormValidation.Validator.phone = {
        html5Attributes: {
            message: 'message',
            country: 'country'
        },

        // The supported countries
        COUNTRY_CODES: ['AE', 'BG', 'BR', 'CN', 'CZ', 'DE', 'DK', 'ES', 'FR', 'GB', 'IN', 'MA', 'NL', 'PK', 'RO', 'RU', 'SK', 'TH', 'US', 'VE'],

        /**
         * Return true if the input value contains a valid phone number for the country
         * selected in the options
         *
         * @param {FormValidation.Base} validator Validate plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * - country: The ISO-3166 country code. It can be
         *      - A country code
         *      - Name of field which its value defines the country code
         *      - Name of callback function that returns the country code
         *      - A callback function that returns the country code
         *
         * @returns {Boolean|Object}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'phone');
            if (value === '') {
                return true;
            }

            var locale  = validator.getLocale(),
                country = options.country;
            if (typeof country !== 'string' || $.inArray(country, this.COUNTRY_CODES) === -1) {
                // Try to determine the country
                country = validator.getDynamicOption($field, country);
            }

            if (!country || $.inArray(country.toUpperCase(), this.COUNTRY_CODES) === -1) {
                return true;
            }

            var isValid = true;
            switch (country.toUpperCase()) {
                case 'AE':
                    // http://regexr.com/39tak
                    value   = $.trim(value);
                    isValid = (/^(((\+|00)?971[\s\.-]?(\(0\)[\s\.-]?)?|0)(\(5(0|2|5|6)\)|5(0|2|5|6)|2|3|4|6|7|9)|60)([\s\.-]?[0-9]){7}$/).test(value);
                    break;
                    
                case 'BG':
                    // https://regex101.com/r/yE6vN4/1
                    // See http://en.wikipedia.org/wiki/Telephone_numbers_in_Bulgaria
                    value   = value.replace(/\+|\s|-|\/|\(|\)/gi,'');
                    isValid = (/^(0|359|00)(((700|900)[0-9]{5}|((800)[0-9]{5}|(800)[0-9]{4}))|(87|88|89)([0-9]{7})|((2[0-9]{7})|(([3-9][0-9])(([0-9]{6})|([0-9]{5})))))$/).test(value);
                    break;

                case 'BR':
                    // http://regexr.com/399m1
                    value   = $.trim(value);
                    isValid = (/^(([\d]{4}[-.\s]{1}[\d]{2,3}[-.\s]{1}[\d]{2}[-.\s]{1}[\d]{2})|([\d]{4}[-.\s]{1}[\d]{3}[-.\s]{1}[\d]{4})|((\(?\+?[0-9]{2}\)?\s?)?(\(?\d{2}\)?\s?)?\d{4,5}[-.\s]?\d{4}))$/).test(value);
                    break;

                case 'CN':
                    // http://regexr.com/39dq4
                    value   = $.trim(value);
                    isValid = (/^((00|\+)?(86(?:-| )))?((\d{11})|(\d{3}[- ]{1}\d{4}[- ]{1}\d{4})|((\d{2,4}[- ]){1}(\d{7,8}|(\d{3,4}[- ]{1}\d{4}))([- ]{1}\d{1,4})?))$/).test(value);
                    break;

                case 'CZ':
                    // http://regexr.com/39hhl
                    isValid = /^(((00)([- ]?)|\+)(420)([- ]?))?((\d{3})([- ]?)){2}(\d{3})$/.test(value);
                    break;

                case 'DE':
                    // http://regexr.com/39pkg
                    value   = $.trim(value);
                    isValid = (/^(((((((00|\+)49[ \-/]?)|0)[1-9][0-9]{1,4})[ \-/]?)|((((00|\+)49\()|\(0)[1-9][0-9]{1,4}\)[ \-/]?))[0-9]{1,7}([ \-/]?[0-9]{1,5})?)$/).test(value);
                    break;

                case 'DK':
                    // Mathing DK phone numbers with country code in 1 of 3 formats and an
                    // 8 digit phone number not starting with a 0 or 1. Can have 1 space
                    // between each character except inside the country code.
                    // http://regex101.com/r/sS8fO4/1
                    value   = $.trim(value);
                    isValid = (/^(\+45|0045|\(45\))?\s?[2-9](\s?\d){7}$/).test(value);
                    break;

                case 'ES':
                    // http://regex101.com/r/rB9mA9/1
                    // Telephone numbers in Spain go like this:
                    //     9: Landline phones and special prefixes.
                    //     6, 7: Mobile phones.
                    //     5: VoIP lines.
                    //     8: Premium-rate services.
                    // There are also special 5-digit and 3-digit numbers, but
                    // maybe it would be overkill to include them all.
                    value   = $.trim(value);
                    isValid = (/^(?:(?:(?:\+|00)34\D?))?(?:5|6|7|8|9)(?:\d\D?){8}$/).test(value);
                    break;

                case 'FR':
                    // http://regexr.com/39a2p
                    value   = $.trim(value);
                    isValid = (/^(?:(?:(?:\+|00)33[ ]?(?:\(0\)[ ]?)?)|0){1}[1-9]{1}([ .-]?)(?:\d{2}\1?){3}\d{2}$/).test(value);
                    break;

            	case 'GB':
                    // http://aa-asterisk.org.uk/index.php/Regular_Expressions_for_Validating_and_Formatting_GB_Telephone_Numbers#Match_GB_telephone_number_in_any_format
                    // http://regexr.com/38uhv
                    value   = $.trim(value);
                    isValid = (/^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}|\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}|\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3})|\d{5}\)?[\s-]?\d{4,5}|8(?:00[\s-]?11[\s-]?11|45[\s-]?46[\s-]?4\d))(?:(?:[\s-]?(?:x|ext\.?\s?|\#)\d+)?)$/).test(value);
                    break;
            
                case 'IN':
                    // http://stackoverflow.com/questions/18351553/regular-expression-validation-for-indian-phone-number-and-mobile-number
                    // http://regex101.com/r/qL6eZ5/1
                    // May begin with +91. Supports mobile and land line numbers
                    value   = $.trim(value);
                    isValid = (/((\+?)((0[ -]+)*|(91 )*)(\d{12}|\d{10}))|\d{5}([- ]*)\d{6}/).test(value);
                    break;
                    
                case 'MA':
                    // http://en.wikipedia.org/wiki/Telephone_numbers_in_Morocco
                    // http://regexr.com/399n8
                    value   = $.trim(value);
                    isValid = (/^(?:(?:(?:\+|00)212[\s]?(?:[\s]?\(0\)[\s]?)?)|0){1}(?:5[\s.-]?[2-3]|6[\s.-]?[13-9]){1}[0-9]{1}(?:[\s.-]?\d{2}){3}$/).test(value);
                    break;
                
                case 'NL':
                    // http://en.wikipedia.org/wiki/Telephone_numbers_in_the_Netherlands
                    // http://regexr.com/3aevr
                    value   = $.trim(value);
                    isValid = (/^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9])((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]$/gm).test(value);
                    break;
                
                case 'PK':
                    // http://regex101.com/r/yH8aV9/2
                    value   = $.trim(value);
                    isValid = (/^0?3[0-9]{2}[0-9]{7}$/).test(value);
                    break;

                case 'RO':
                    // All mobile network and land line
                    // http://regexr.com/39fv1
                    isValid = (/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/g).test(value);
                    break;

                case 'RU':
                    // http://regex101.com/r/gW7yT5/5
                    isValid = (/^((8|\+7|007)[\-\.\/ ]?)?([\(\/\.]?\d{3}[\)\/\.]?[\-\.\/ ]?)?[\d\-\.\/ ]{7,10}$/g).test(value);
                    break;

                case 'SK':
                    // http://regexr.com/3a95f
                    isValid = /^(((00)([- ]?)|\+)(421)([- ]?))?((\d{3})([- ]?)){2}(\d{3})$/.test(value);
                    break;

                case 'TH':
                    // http://regex101.com/r/vM5mZ4/2
                    isValid = (/^0\(?([6|8-9]{2})*-([0-9]{3})*-([0-9]{4})$/).test(value);
                    break;

                case 'VE':
                    // http://regex101.com/r/eM2yY0/6
                    value   = $.trim(value);
                    isValid = (/^0(?:2(?:12|4[0-9]|5[1-9]|6[0-9]|7[0-8]|8[1-35-8]|9[1-5]|3[45789])|4(?:1[246]|2[46]))\d{7}$/).test(value);
                    break;
  
                case 'US':
                /* falls through */
                default:
                    // Make sure US phone numbers have 10 digits
                    // May start with 1, +1, or 1-; should discard
                    // Area code may be delimited with (), & sections may be delimited with . or -
                    // http://regexr.com/38mqi
                    isValid = (/^(?:(1\-?)|(\+1 ?))?\(?(\d{3})[\)\-\.]?(\d{3})[\-\.]?(\d{4})$/).test(value);
                    break;
            }

            return {
                valid: isValid,
                message: FormValidation.Helper.format(options.message || FormValidation.I18n[locale].phone.country, FormValidation.I18n[locale].phone.countries[country])
            };
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            regexp: {
                'default': 'Please enter a value matching the pattern'
            }
        }
    });

    FormValidation.Validator.regexp = {
        html5Attributes: {
            message: 'message',
            regexp: 'regexp'
        },

        enableByHtml5: function($field) {
            var pattern = $field.attr('pattern');
            if (pattern) {
                return {
                    regexp: pattern
                };
            }

            return false;
        },

        /**
         * Check if the element value matches given regular expression
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of the following key:
         * - regexp: The regular expression you need to check
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'regexp');
            if (value === '') {
                return true;
            }

            var regexp = ('string' === typeof options.regexp) ? new RegExp(options.regexp) : options.regexp;
            return regexp.test(value);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            remote: {
                'default': 'Please enter a valid value'
            }
        }
    });

    FormValidation.Validator.remote = {
        html5Attributes: {
            crossdomain: 'crossDomain',
            data: 'data',
            datatype: 'dataType',
            delay: 'delay',
            message: 'message',
            name: 'name',
            type: 'type',
            url: 'url',
            validkey: 'validKey'
        },

        /**
         * Destroy the timer when destroying the FormValidation (using validator.destroy() method)
         */
        destroy: function(validator, $field, options) {
            var ns    = validator.getNamespace(),
                timer = $field.data(ns + '.remote.timer');
            if (timer) {
                clearTimeout(timer);
                $field.removeData(ns + '.remote.timer');
            }
        },

        /**
         * Request a remote server to check the input value
         *
         * @param {FormValidation.Base} validator Plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - crossDomain {Boolean} [optional]
         * - data {Object|Function} [optional]: By default, it will take the value
         *  {
         *      <fieldName>: <fieldValue>
         *  }
         * - dataType {String} [optional]: The type of data which is returned by remote server.
         * It can be json (default), text, script
         * - delay {Number} [optional]
         * - headers {String[]} [optional]: Additional headers
         * - message {String} [optional]: The invalid message
         * - name {String} [optional]: Override the field name for the request.
         * - type {String} [optional] Can be GET or POST (default)
         * - url {String|Function}
         * - validKey {String} [optional]: The valid key. It's "valid" by default
         * This is useful when connecting to external remote server or APIs provided by 3rd parties
         * @returns {Deferred}
         */
        validate: function(validator, $field, options) {
            var ns    = validator.getNamespace(),
                value = validator.getFieldValue($field, 'remote'),
                dfd   = new $.Deferred();
            if (value === '') {
                dfd.resolve($field, 'remote', { valid: true });
                return dfd;
            }
            var name     = $field.attr('data-' + ns + '-field'),
                data     = options.data || {},
                url      = options.url,
                validKey = options.validKey || 'valid';

            // Support dynamic data
            if ('function' === typeof data) {
                data = data.call(this, validator);
            }

            // Parse string data from HTML5 attribute
            if ('string' === typeof data) {
                data = JSON.parse(data);
            }

            // Support dynamic url
            if ('function' === typeof url) {
                url = url.call(this, validator);
            }

            data[options.name || name] = value;

            var ajaxOptions = {
                data: data,
                dataType: options.dataType || 'json',
                headers: options.headers || {},
                type: options.type || 'GET',
                url: url
            };
            if (options.crossDomain !== null) {
                ajaxOptions.crossDomain = (options.crossDomain === true || options.crossDomain === 'true');
            }

            function runCallback() {
                var xhr = $.ajax(ajaxOptions);

                xhr
                    .success(function(response) {
                        response.valid = response[validKey] === true || response[validKey] === 'true';
                        dfd.resolve($field, 'remote', response);
                    })
                    .error(function(response) {
                        dfd.resolve($field, 'remote', {
                            valid: false
                        });
                    });

                dfd.fail(function() {
                    xhr.abort();
                });

                return dfd;
            }
            
            if (options.delay) {
                // Since the form might have multiple fields with the same name
                // I have to attach the timer to the field element
                if ($field.data(ns + '.remote.timer')) {
                    clearTimeout($field.data(ns + '.remote.timer'));
                }

                $field.data(ns + '.remote.timer', setTimeout(runCallback, options.delay));
                return dfd;
            } else {
                return runCallback();
            }
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            rtn: {
                'default': 'Please enter a valid RTN number'
            }
        }
    });

    FormValidation.Validator.rtn = {
        /**
         * Validate a RTN (Routing transit number)
         * Examples:
         * - Valid: 021200025, 789456124
         *
         * @see http://en.wikipedia.org/wiki/Routing_transit_number
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'rtn');
            if (value === '') {
                return true;
            }

            if (!/^\d{9}$/.test(value)) {
                return false;
            }

            var sum = 0;
            for (var i = 0; i < value.length; i += 3) {
                sum += parseInt(value.charAt(i),     10) * 3
                    +  parseInt(value.charAt(i + 1), 10) * 7
                    +  parseInt(value.charAt(i + 2), 10);
            }
            return (sum !== 0 && sum % 10 === 0);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            sedol: {
                'default': 'Please enter a valid SEDOL number'
            }
        }
    });

    FormValidation.Validator.sedol = {
        /**
         * Validate a SEDOL (Stock Exchange Daily Official List)
         * Examples:
         * - Valid: 0263494, B0WNLY7
         *
         * @see http://en.wikipedia.org/wiki/SEDOL
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'sedol');
            if (value === '') {
                return true;
            }

            value = value.toUpperCase();
            if (!/^[0-9A-Z]{7}$/.test(value)) {
                return false;
            }

            var sum    = 0,
                weight = [1, 3, 1, 7, 3, 9, 1],
                length = value.length;
            for (var i = 0; i < length - 1; i++) {
	            sum += weight[i] * parseInt(value.charAt(i), 36);
	        }
	        sum = (10 - sum % 10) % 10;
            return sum + '' === value.charAt(length - 1);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
		'en_US': {
			siren: {
				'default': 'Please enter a valid SIREN number'
			}
		}
    });

	FormValidation.Validator.siren = {
		/**
		 * Check if a string is a siren number
		 *
		 * @param {FormValidation.Base} validator The validator plugin instance
		 * @param {jQuery} $field Field element
		 * @param {Object} options Consist of key:
         * - message: The invalid message
		 * @returns {Boolean}
		 */
		validate: function(validator, $field, options) {
			var value = validator.getFieldValue($field, 'siren');
			if (value === '') {
				return true;
			}

            if (!/^\d{9}$/.test(value)) {
                return false;
            }
            return FormValidation.Helper.luhn(value);
		}
	};
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
		'en_US': {
			siret: {
				'default': 'Please enter a valid SIRET number'
			}
		}
    });

	FormValidation.Validator.siret = {
        /**
         * Check if a string is a siret number
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * @returns {Boolean}
         */
		validate: function(validator, $field, options) {
			var value = validator.getFieldValue($field, 'siret');
			if (value === '') {
				return true;
			}

			var sum    = 0,
                length = value.length,
                tmp;
			for (var i = 0; i < length; i++) {
                tmp = parseInt(value.charAt(i), 10);
				if ((i % 2) === 0) {
					tmp = tmp * 2;
					if (tmp > 9) {
						tmp -= 9;
					}
				}
				sum += tmp;
			}
			return (sum % 10 === 0);
		}
	};
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            step: {
                'default': 'Please enter a valid step of %s'
            }
        }
    });

    FormValidation.Validator.step = {
        html5Attributes: {
            message: 'message',
            base: 'baseValue',
            step: 'step'
        },

        /**
         * Return true if the input value is valid step one
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - baseValue: The base value
         * - step: The step
         * - message: The invalid message
         * @returns {Boolean|Object}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'step');
            if (value === '') {
                return true;
            }

            options = $.extend({}, { baseValue: 0, step: 1 }, options);
            value   = parseFloat(value);
            if (!$.isNumeric(value)) {
                return false;
            }

            var round = function(x, precision) {
                    var m = Math.pow(10, precision);
                    x = x * m;
                    var sign   = (x > 0) | -(x < 0),
                        isHalf = (x % 1 === 0.5 * sign);
                    if (isHalf) {
                        return (Math.floor(x) + (sign > 0)) / m;
                    } else {
                        return Math.round(x) / m;
                    }
                },
                floatMod = function(x, y) {
                    if (y === 0.0) {
                        return 1.0;
                    }
                    var dotX      = (x + '').split('.'),
                        dotY      = (y + '').split('.'),
                        precision = ((dotX.length === 1) ? 0 : dotX[1].length) + ((dotY.length === 1) ? 0 : dotY[1].length);
                    return round(x - y * Math.floor(x / y), precision);
                };

            var locale = validator.getLocale(),
                mod    = floatMod(value - options.baseValue, options.step);
            return {
                valid: mod === 0.0 || mod === options.step,
                message: FormValidation.Helper.format(options.message || FormValidation.I18n[locale].step['default'], [options.step])
            };
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            stringCase: {
                'default': 'Please enter only lowercase characters',
                upper: 'Please enter only uppercase characters'
            }
        }
    });

    FormValidation.Validator.stringCase = {
        html5Attributes: {
            message: 'message',
            'case': 'case'
        },

        /**
         * Check if a string is a lower or upper case one
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * - case: Can be 'lower' (default) or 'upper'
         * @returns {Object}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'stringCase');
            if (value === '') {
                return true;
            }

            var locale     = validator.getLocale(),
                stringCase = (options['case'] || 'lower').toLowerCase();
            return {
                valid: ('upper' === stringCase) ? value === value.toUpperCase() : value === value.toLowerCase(),
                message: options.message || (('upper' === stringCase) ? FormValidation.I18n[locale].stringCase.upper : FormValidation.I18n[locale].stringCase['default'])
            };
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            stringLength: {
                'default': 'Please enter a value with valid length',
                less: 'Please enter less than %s characters',
                more: 'Please enter more than %s characters',
                between: 'Please enter value between %s and %s characters long'
            }
        }
    });

    FormValidation.Validator.stringLength = {
        html5Attributes: {
            message: 'message',
            min: 'min',
            max: 'max',
            trim: 'trim',
            utf8bytes: 'utf8Bytes'
        },

        enableByHtml5: function($field) {
            var options   = {},
                maxLength = $field.attr('maxlength'),
                minLength = $field.attr('minlength');
            if (maxLength) {
                options.max = parseInt(maxLength, 10);
            }
            if (minLength) {
                options.min = parseInt(minLength, 10);
            }

            return $.isEmptyObject(options) ? false : options;
        },

        /**
         * Check if the length of element value is less or more than given number
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of following keys:
         * - min
         * - max
         * At least one of two keys is required
         * The min, max keys define the number which the field value compares to. min, max can be
         *      - A number
         *      - Name of field which its value defines the number
         *      - Name of callback function that returns the number
         *      - A callback function that returns the number
         *
         * - message: The invalid message
         * - trim: Indicate the length will be calculated after trimming the value or not. It is false, by default
         * - utf8bytes: Evaluate string length in UTF-8 bytes, default to false
         * @returns {Object}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'stringLength');
            if (options.trim === true || options.trim === 'true') {
                value = $.trim(value);
            }

            if (value === '') {
                return true;
            }

            var locale     = validator.getLocale(),
                min        = $.isNumeric(options.min) ? options.min : validator.getDynamicOption($field, options.min),
                max        = $.isNumeric(options.max) ? options.max : validator.getDynamicOption($field, options.max),
                // Credit to http://stackoverflow.com/a/23329386 (@lovasoa) for UTF-8 byte length code
                utf8Length = function(str) {
                                 var s = str.length;
                                 for (var i = str.length - 1; i >= 0; i--) {
                                     var code = str.charCodeAt(i);
                                     if (code > 0x7f && code <= 0x7ff) {
                                         s++;
                                     } else if (code > 0x7ff && code <= 0xffff) {
                                         s += 2;
                                     }
                                     if (code >= 0xDC00 && code <= 0xDFFF) {
                                         i--;
                                     }
                                 }
                                 return s;
                             },
                length     = options.utf8Bytes ? utf8Length(value) : value.length,
                isValid    = true,
                message    = options.message || FormValidation.I18n[locale].stringLength['default'];

            if ((min && length < parseInt(min, 10)) || (max && length > parseInt(max, 10))) {
                isValid = false;
            }

            switch (true) {
                case (!!min && !!max):
                    message = FormValidation.Helper.format(options.message || FormValidation.I18n[locale].stringLength.between, [parseInt(min, 10), parseInt(max, 10)]);
                    break;

                case (!!min):
                    message = FormValidation.Helper.format(options.message || FormValidation.I18n[locale].stringLength.more, parseInt(min, 10));
                    break;

                case (!!max):
                    message = FormValidation.Helper.format(options.message || FormValidation.I18n[locale].stringLength.less, parseInt(max, 10));
                    break;

                default:
                    break;
            }

            return {
                valid: isValid,
                message: message
            };
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            uri: {
                'default': 'Please enter a valid URI'
            }
        }
    });

    FormValidation.Validator.uri = {
        html5Attributes: {
            message: 'message',
            allowlocal: 'allowLocal',
            allowemptyprotocol: 'allowEmptyProtocol',
            protocol: 'protocol'
        },

        enableByHtml5: function($field) {
            return ('url' === $field.attr('type'));
        },

        /**
         * Return true if the input value is a valid URL
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options
         * - message: The error message
         * - allowLocal: Allow the private and local network IP. Default to false
         * - allowEmptyProtocol: Allow the URI without protocol. Default to false
         * - protocol: The protocols, separated by a comma. Default to "http, https, ftp"
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'uri');
            if (value === '') {
                return true;
            }

            // Credit to https://gist.github.com/dperini/729294
            //
            // Regular Expression for URL validation
            //
            // Author: Diego Perini
            // Updated: 2010/12/05
            //
            // the regular expression composed & commented
            // could be easily tweaked for RFC compliance,
            // it was expressly modified to fit & satisfy
            // these test for an URL shortener:
            //
            //   http://mathiasbynens.be/demo/url-regex
            //
            // Notes on possible differences from a standard/generic validation:
            //
            // - utf-8 char class take in consideration the full Unicode range
            // - TLDs are mandatory unless `allowLocal` is true
            // - protocols have been restricted to ftp, http and https only as requested
            //
            // Changes:
            //
            // - IP address dotted notation validation, range: 1.0.0.0 - 223.255.255.255
            //   first and last IP address of each class is considered invalid
            //   (since they are broadcast/network addresses)
            //
            // - Added exclusion of private, reserved and/or local networks ranges
            //   unless `allowLocal` is true
            //
            // - Added possibility of choosing a custom protocol
            //
            // - Add option to validate without protocol
            //
            var allowLocal         = options.allowLocal === true || options.allowLocal === 'true',
                allowEmptyProtocol = options.allowEmptyProtocol === true || options.allowEmptyProtocol === 'true',
                protocol           = (options.protocol || 'http, https, ftp').split(',').join('|').replace(/\s/g, ''),
                urlExp             = new RegExp(
                    "^" +
                    // protocol identifier
                    "(?:(?:" + protocol + ")://)" +
                    // allow empty protocol
                    (allowEmptyProtocol ? '?' : '') +
                    // user:pass authentication
                    "(?:\\S+(?::\\S*)?@)?" +
                    "(?:" +
                    // IP address exclusion
                    // private & local networks
                    (allowLocal
                        ? ''
                        : ("(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
                           "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
                           "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})")) +
                    // IP address dotted notation octets
                    // excludes loopback network 0.0.0.0
                    // excludes reserved space >= 224.0.0.0
                    // excludes network & broadcast addresses
                    // (first & last IP address of each class)
                    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
                    "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
                    "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
                    "|" +
                    // host name
                    "(?:(?:[a-z\\u00a1-\\uffff0-9]-?)*[a-z\\u00a1-\\uffff0-9]+)" +
                    // domain name
                    "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-?)*[a-z\\u00a1-\\uffff0-9])*" +
                    // TLD identifier
                    "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
                    // Allow intranet sites (no TLD) if `allowLocal` is true
                    (allowLocal ? '?' : '') +
                    ")" +
                    // port number
                    "(?::\\d{2,5})?" +
                    // resource path
                    "(?:/[^\\s]*)?" +
                    "$", "i"
                );

            return urlExp.test(value);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            uuid: {
                'default': 'Please enter a valid UUID number',
                version: 'Please enter a valid UUID version %s number'
            }
        }
    });

    FormValidation.Validator.uuid = {
        html5Attributes: {
            message: 'message',
            version: 'version'
        },

        /**
         * Return true if and only if the input value is a valid UUID string
         *
         * @see http://en.wikipedia.org/wiki/Universally_unique_identifier
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * - version: Can be 3, 4, 5, null
         * @returns {Boolean|Object}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'uuid');
            if (value === '') {
                return true;
            }

            // See the format at http://en.wikipedia.org/wiki/Universally_unique_identifier#Variants_and_versions
            var locale   = validator.getLocale(),
                patterns = {
                    '3': /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
                    '4': /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
                    '5': /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
                    all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
                },
                version = options.version ? (options.version + '') : 'all';
            return {
                valid: (null === patterns[version]) ? true : patterns[version].test(value),
                message: options.version
                            ? FormValidation.Helper.format(options.message || FormValidation.I18n[locale].uuid.version, options.version)
                            : (options.message || FormValidation.I18n[locale].uuid['default'])
            };
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            vat: {
                'default': 'Please enter a valid VAT number',
                country: 'Please enter a valid VAT number in %s',
                countries: {
                    AT: 'Austria',
                    BE: 'Belgium',
                    BG: 'Bulgaria',
                    BR: 'Brazil',
                    CH: 'Switzerland',
                    CY: 'Cyprus',
                    CZ: 'Czech Republic',
                    DE: 'Germany',
                    DK: 'Denmark',
                    EE: 'Estonia',
                    ES: 'Spain',
                    FI: 'Finland',
                    FR: 'France',
                    GB: 'United Kingdom',
                    GR: 'Greek',
                    EL: 'Greek',
                    HU: 'Hungary',
                    HR: 'Croatia',
                    IE: 'Ireland',
                    IS: 'Iceland',
                    IT: 'Italy',
                    LT: 'Lithuania',
                    LU: 'Luxembourg',
                    LV: 'Latvia',
                    MT: 'Malta',
                    NL: 'Netherlands',
                    NO: 'Norway',
                    PL: 'Poland',
                    PT: 'Portugal',
                    RO: 'Romania',
                    RU: 'Russia',
                    RS: 'Serbia',
                    SE: 'Sweden',
                    SI: 'Slovenia',
                    SK: 'Slovakia',
                    VE: 'Venezuela',
                    ZA: 'South Africa'
                }
            }
        }
    });

    FormValidation.Validator.vat = {
        html5Attributes: {
            message: 'message',
            country: 'country'
        },

        // Supported country codes
        COUNTRY_CODES: [
            'AT', 'BE', 'BG', 'BR', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'EL', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR', 'HU',
            'IE', 'IS', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'RU', 'RS', 'SE', 'SK', 'SI', 'VE',
            'ZA'
        ],

        /**
         * Validate an European VAT number
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * - country: The ISO 3166-1 country code. It can be
         *      - One of country code defined in COUNTRY_CODES
         *      - Name of field which its value defines the country code
         *      - Name of callback function that returns the country code
         *      - A callback function that returns the country code
         * @returns {Boolean|Object}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'vat');
            if (value === '') {
                return true;
            }

            var locale  = validator.getLocale(),
                country = options.country;
            if (!country) {
                country = value.substr(0, 2);
            } else if (typeof country !== 'string' || $.inArray(country.toUpperCase(), this.COUNTRY_CODES) === -1) {
                // Determine the country code
                country = validator.getDynamicOption($field, country);
            }

            if ($.inArray(country, this.COUNTRY_CODES) === -1) {
                return true;
            }

            var method  = ['_', country.toLowerCase()].join('');
            return this[method](value)
                ? true
                : {
                    valid: false,
                    message: FormValidation.Helper.format(options.message || FormValidation.I18n[locale].vat.country, FormValidation.I18n[locale].vat.countries[country.toUpperCase()])
                };
        },

        // VAT validators

        /**
         * Validate Austrian VAT number
         * Example:
         * - Valid: ATU13585627
         * - Invalid: ATU13585626
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _at: function(value) {
            if (/^ATU[0-9]{8}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^U[0-9]{8}$/.test(value)) {
                return false;
            }

            value = value.substr(1);
            var sum    = 0,
                weight = [1, 2, 1, 2, 1, 2, 1],
                temp   = 0;
            for (var i = 0; i < 7; i++) {
                temp = parseInt(value.charAt(i), 10) * weight[i];
                if (temp > 9) {
                    temp = Math.floor(temp / 10) + temp % 10;
                }
                sum += temp;
            }

            sum = 10 - (sum + 4) % 10;
            if (sum === 10) {
                sum = 0;
            }

            return (sum + '' === value.substr(7, 1));
        },

        /**
         * Validate Belgian VAT number
         * Example:
         * - Valid: BE0428759497
         * - Invalid: BE431150351
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _be: function(value) {
            if (/^BE[0]{0,1}[0-9]{9}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0]{0,1}[0-9]{9}$/.test(value)) {
                return false;
            }

            if (value.length === 9) {
                value = '0' + value;
            }
            if (value.substr(1, 1) === '0') {
                return false;
            }

            var sum = parseInt(value.substr(0, 8), 10) + parseInt(value.substr(8, 2), 10);
            return (sum % 97 === 0);
        },

        /**
         * Validate Bulgarian VAT number
         * Example:
         * - Valid: BG175074752,
         * BG7523169263, BG8032056031,
         * BG7542011030,
         * BG7111042925
         * - Invalid: BG175074753, BG7552A10004, BG7111042922
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _bg: function(value) {
            if (/^BG[0-9]{9,10}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{9,10}$/.test(value)) {
                return false;
            }

            var sum = 0, i = 0;

            // Legal entities
            if (value.length === 9) {
                for (i = 0; i < 8; i++) {
                    sum += parseInt(value.charAt(i), 10) * (i + 1);
                }
                sum = sum % 11;
                if (sum === 10) {
                    sum = 0;
                    for (i = 0; i < 8; i++) {
                        sum += parseInt(value.charAt(i), 10) * (i + 3);
                    }
                }
                sum = sum % 10;
                return (sum + '' === value.substr(8));
            }
            // Physical persons, foreigners and others
            else if (value.length === 10) {
                // Validate Bulgarian national identification numbers
                var egn = function(value) {
                        // Check the birth date
                        var year  = parseInt(value.substr(0, 2), 10) + 1900,
                            month = parseInt(value.substr(2, 2), 10),
                            day   = parseInt(value.substr(4, 2), 10);
                        if (month > 40) {
                            year += 100;
                            month -= 40;
                        } else if (month > 20) {
                            year -= 100;
                            month -= 20;
                        }

                        if (!FormValidation.Helper.date(year, month, day)) {
                            return false;
                        }

                        var sum    = 0,
                            weight = [2, 4, 8, 5, 10, 9, 7, 3, 6];
                        for (var i = 0; i < 9; i++) {
                            sum += parseInt(value.charAt(i), 10) * weight[i];
                        }
                        sum = (sum % 11) % 10;
                        return (sum + '' === value.substr(9, 1));
                    },
                    // Validate Bulgarian personal number of a foreigner
                    pnf = function(value) {
                        var sum    = 0,
                            weight = [21, 19, 17, 13, 11, 9, 7, 3, 1];
                        for (var i = 0; i < 9; i++) {
                            sum += parseInt(value.charAt(i), 10) * weight[i];
                        }
                        sum = sum % 10;
                        return (sum + '' === value.substr(9, 1));
                    },
                    // Finally, consider it as a VAT number
                    vat = function(value) {
                        var sum    = 0,
                            weight = [4, 3, 2, 7, 6, 5, 4, 3, 2];
                        for (var i = 0; i < 9; i++) {
                            sum += parseInt(value.charAt(i), 10) * weight[i];
                        }
                        sum = 11 - sum % 11;
                        if (sum === 10) {
                            return false;
                        }
                        if (sum === 11) {
                            sum = 0;
                        }
                        return (sum + '' === value.substr(9, 1));
                    };
                return (egn(value) || pnf(value) || vat(value));
            }

            return false;
        },
        
        /**
         * Validate Brazilian VAT number (CNPJ)
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _br: function(value) {
            if (value === '') {
                return true;
            }
            var cnpj = value.replace(/[^\d]+/g, '');
            if (cnpj === '' || cnpj.length !== 14) {
                return false;
            }

            // Remove invalids CNPJs
            if (cnpj === '00000000000000' || cnpj === '11111111111111' || cnpj === '22222222222222' ||
                cnpj === '33333333333333' || cnpj === '44444444444444' || cnpj === '55555555555555' ||
                cnpj === '66666666666666' || cnpj === '77777777777777' || cnpj === '88888888888888' ||
                cnpj === '99999999999999')
            {
                return false;
            }

            // Validate verification digits
            var length  = cnpj.length - 2,
                numbers = cnpj.substring(0, length),
                digits  = cnpj.substring(length),
                sum     = 0,
                pos     = length - 7;

            for (var i = length; i >= 1; i--) {
                sum += parseInt(numbers.charAt(length - i), 10) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }

            var result = sum % 11 < 2 ? 0 : 11 - sum % 11;
            if (result !== parseInt(digits.charAt(0), 10)) {
                return false;
            }

            length  = length + 1;
            numbers = cnpj.substring(0, length);
            sum     = 0;
            pos     = length - 7;
            for (i = length; i >= 1; i--) {
                sum += parseInt(numbers.charAt(length - i), 10) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }

            result = sum % 11 < 2 ? 0 : 11 - sum % 11;
            return (result === parseInt(digits.charAt(1), 10));
        },

        /**
         * Validate Swiss VAT number
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _ch: function(value) {
            if (/^CHE[0-9]{9}(MWST)?$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^E[0-9]{9}(MWST)?$/.test(value)) {
                return false;
            }

            value = value.substr(1);
            var sum    = 0,
                weight = [5, 4, 3, 2, 7, 6, 5, 4];
            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }

            sum = 11 - sum % 11;
            if (sum === 10) {
                return false;
            }
            if (sum === 11) {
                sum = 0;
            }

            return (sum + '' === value.substr(8, 1));
        },

        /**
         * Validate Cypriot VAT number
         * Examples:
         * - Valid: CY10259033P
         * - Invalid: CY10259033Z
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _cy: function(value) {
            if (/^CY[0-5|9]{1}[0-9]{7}[A-Z]{1}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-5|9]{1}[0-9]{7}[A-Z]{1}$/.test(value)) {
                return false;
            }

            // Do not allow to start with "12"
            if (value.substr(0, 2) === '12') {
                return false;
            }

            // Extract the next digit and multiply by the counter.
            var sum         = 0,
                translation = {
                    '0': 1,  '1': 0,  '2': 5,  '3': 7,  '4': 9,
                    '5': 13, '6': 15, '7': 17, '8': 19, '9': 21
                };
            for (var i = 0; i < 8; i++) {
                var temp = parseInt(value.charAt(i), 10);
                if (i % 2 === 0) {
                    temp = translation[temp + ''];
                }
                sum += temp;
            }

            sum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[sum % 26];
            return (sum + '' === value.substr(8, 1));
        },

        /**
         * Validate Czech Republic VAT number
         * Can be:
         * i) Legal entities (8 digit numbers)
         * ii) Individuals with a RC (the 9 or 10 digit Czech birth number)
         * iii) Individuals without a RC (9 digit numbers beginning with 6)
         *
         * Examples:
         * - Valid: i) CZ25123891; ii) CZ7103192745, CZ991231123; iii) CZ640903926
         * - Invalid: i) CZ25123890; ii) CZ1103492745, CZ590312123
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _cz: function(value) {
            if (/^CZ[0-9]{8,10}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{8,10}$/.test(value)) {
                return false;
            }

            var sum = 0,
                i   = 0;
            if (value.length === 8) {
                // Do not allow to start with '9'
                if (value.charAt(0) + '' === '9') {
                    return false;
                }

                sum = 0;
                for (i = 0; i < 7; i++) {
                    sum += parseInt(value.charAt(i), 10) * (8 - i);
                }
                sum = 11 - sum % 11;
                if (sum === 10) {
                    sum = 0;
                }
                if (sum === 11) {
                    sum = 1;
                }

                return (sum + '' === value.substr(7, 1));
            } else if (value.length === 9 && (value.charAt(0) + '' === '6')) {
                sum = 0;
                // Skip the first (which is 6)
                for (i = 0; i < 7; i++) {
                    sum += parseInt(value.charAt(i + 1), 10) * (8 - i);
                }
                sum = 11 - sum % 11;
                if (sum === 10) {
                    sum = 0;
                }
                if (sum === 11) {
                    sum = 1;
                }
                sum = [8, 7, 6, 5, 4, 3, 2, 1, 0, 9, 10][sum - 1];
                return (sum + '' === value.substr(8, 1));
            } else if (value.length === 9 || value.length === 10) {
                // Validate Czech birth number (Rodné číslo), which is also national identifier
                var year  = 1900 + parseInt(value.substr(0, 2), 10),
                    month = parseInt(value.substr(2, 2), 10) % 50 % 20,
                    day   = parseInt(value.substr(4, 2), 10);
                if (value.length === 9) {
                    if (year >= 1980) {
                        year -= 100;
                    }
                    if (year > 1953) {
                        return false;
                    }
                } else if (year < 1954) {
                    year += 100;
                }

                if (!FormValidation.Helper.date(year, month, day)) {
                    return false;
                }

                // Check that the birth date is not in the future
                if (value.length === 10) {
                    var check = parseInt(value.substr(0, 9), 10) % 11;
                    if (year < 1985) {
                        check = check % 10;
                    }
                    return (check + '' === value.substr(9, 1));
                }

                return true;
            }

            return false;
        },

        /**
         * Validate German VAT number
         * Examples:
         * - Valid: DE136695976
         * - Invalid: DE136695978
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _de: function(value) {
            if (/^DE[0-9]{9}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{9}$/.test(value)) {
                return false;
            }

            return FormValidation.Helper.mod11And10(value);
        },

        /**
         * Validate Danish VAT number
         * Example:
         * - Valid: DK13585628
         * - Invalid: DK13585627
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _dk: function(value) {
            if (/^DK[0-9]{8}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{8}$/.test(value)) {
                return false;
            }

            var sum    = 0,
                weight = [2, 7, 6, 5, 4, 3, 2, 1];
            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }

            return (sum % 11 === 0);
        },

        /**
         * Validate Estonian VAT number
         * Examples:
         * - Valid: EE100931558, EE100594102
         * - Invalid: EE100594103
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _ee: function(value) {
            if (/^EE[0-9]{9}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{9}$/.test(value)) {
                return false;
            }

            var sum    = 0,
                weight = [3, 7, 1, 3, 7, 1, 3, 7, 1];
            for (var i = 0; i < 9; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }

            return (sum % 10 === 0);
        },

        /**
         * Validate Spanish VAT number (NIF - Número de Identificación Fiscal)
         * Can be:
         * i) DNI (Documento nacional de identidad), for Spaniards
         * ii) NIE (Número de Identificación de Extranjeros), for foreigners
         * iii) CIF (Certificado de Identificación Fiscal), for legal entities and others
         *
         * Examples:
         * - Valid: i) ES54362315K; ii) ESX2482300W, ESX5253868R; iii) ESM1234567L, ESJ99216582, ESB58378431, ESB64717838
         * - Invalid: i) ES54362315Z; ii) ESX2482300A; iii) ESJ99216583
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _es: function(value) {
            if (/^ES[0-9A-Z][0-9]{7}[0-9A-Z]$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9A-Z][0-9]{7}[0-9A-Z]$/.test(value)) {
                return false;
            }

            var dni = function(value) {
                    var check = parseInt(value.substr(0, 8), 10);
                    check = 'TRWAGMYFPDXBNJZSQVHLCKE'[check % 23];
                    return (check + '' === value.substr(8, 1));
                },
                nie = function(value) {
                    var check = ['XYZ'.indexOf(value.charAt(0)), value.substr(1)].join('');
                    check = parseInt(check, 10);
                    check = 'TRWAGMYFPDXBNJZSQVHLCKE'[check % 23];
                    return (check + '' === value.substr(8, 1));
                },
                cif = function(value) {
                    var first = value.charAt(0), check;
                    if ('KLM'.indexOf(first) !== -1) {
                        // K: Spanish younger than 14 year old
                        // L: Spanish living outside Spain without DNI
                        // M: Granted the tax to foreigners who have no NIE
                        check = parseInt(value.substr(1, 8), 10);
                        check = 'TRWAGMYFPDXBNJZSQVHLCKE'[check % 23];
                        return (check + '' === value.substr(8, 1));
                    } else if ('ABCDEFGHJNPQRSUVW'.indexOf(first) !== -1) {
                        var sum    = 0,
                            weight = [2, 1, 2, 1, 2, 1, 2],
                            temp   = 0;

                        for (var i = 0; i < 7; i++) {
                            temp = parseInt(value.charAt(i + 1), 10) * weight[i];
                            if (temp > 9) {
                                temp = Math.floor(temp / 10) + temp % 10;
                            }
                            sum += temp;
                        }
                        sum = 10 - sum % 10;
                        return (sum + '' === value.substr(8, 1) || 'JABCDEFGHI'[sum] === value.substr(8, 1));
                    }

                    return false;
                };

            var first = value.charAt(0);
            if (/^[0-9]$/.test(first)) {
                return dni(value);
            } else if (/^[XYZ]$/.test(first)) {
                return nie(value);
            } else {
                return cif(value);
            }
        },

        /**
         * Validate Finnish VAT number
         * Examples:
         * - Valid: FI20774740
         * - Invalid: FI20774741
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _fi: function(value) {
            if (/^FI[0-9]{8}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{8}$/.test(value)) {
                return false;
            }

            var sum    = 0,
                weight = [7, 9, 10, 5, 8, 4, 2, 1];
            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }

            return (sum % 11 === 0);
        },

        /**
         * Validate French VAT number (TVA - taxe sur la valeur ajoutée)
         * It's constructed by a SIREN number, prefixed by two characters.
         *
         * Examples:
         * - Valid: FR40303265045, FR23334175221, FRK7399859412, FR4Z123456782
         * - Invalid: FR84323140391
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _fr: function(value) {
            if (/^FR[0-9A-Z]{2}[0-9]{9}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9A-Z]{2}[0-9]{9}$/.test(value)) {
                return false;
            }

            if (!FormValidation.Helper.luhn(value.substr(2))) {
                return false;
            }

            if (/^[0-9]{2}$/.test(value.substr(0, 2))) {
                // First two characters are digits
                return value.substr(0, 2) === (parseInt(value.substr(2) + '12', 10) % 97 + '');
            } else {
                // The first characters cann't be O and I
                var alphabet = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ',
                    check;
                // First one is digit
                if (/^[0-9]{1}$/.test(value.charAt(0))) {
                    check = alphabet.indexOf(value.charAt(0)) * 24 + alphabet.indexOf(value.charAt(1)) - 10;
                } else {
                    check = alphabet.indexOf(value.charAt(0)) * 34 + alphabet.indexOf(value.charAt(1)) - 100;
                }
                return ((parseInt(value.substr(2), 10) + 1 + Math.floor(check / 11)) % 11) === (check % 11);
            }
        },

        /**
         * Validate United Kingdom VAT number
         * Example:
         * - Valid: GB980780684
         * - Invalid: GB802311781
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _gb: function(value) {
            if (/^GB[0-9]{9}$/.test(value)             /* Standard */
                || /^GB[0-9]{12}$/.test(value)         /* Branches */
                || /^GBGD[0-9]{3}$/.test(value)        /* Government department */
                || /^GBHA[0-9]{3}$/.test(value)        /* Health authority */
                || /^GB(GD|HA)8888[0-9]{5}$/.test(value))
            {
                value = value.substr(2);
            }
            if (!/^[0-9]{9}$/.test(value)
                && !/^[0-9]{12}$/.test(value)
                && !/^GD[0-9]{3}$/.test(value)
                && !/^HA[0-9]{3}$/.test(value)
                && !/^(GD|HA)8888[0-9]{5}$/.test(value))
            {
                return false;
            }

            var length = value.length;
            if (length === 5) {
                var firstTwo  = value.substr(0, 2),
                    lastThree = parseInt(value.substr(2), 10);
                return ('GD' === firstTwo && lastThree < 500) || ('HA' === firstTwo && lastThree >= 500);
            } else if (length === 11 && ('GD8888' === value.substr(0, 6) || 'HA8888' === value.substr(0, 6))) {
                if (('GD' === value.substr(0, 2) && parseInt(value.substr(6, 3), 10) >= 500)
                    || ('HA' === value.substr(0, 2) && parseInt(value.substr(6, 3), 10) < 500))
                {
                    return false;
                }
                return (parseInt(value.substr(6, 3), 10) % 97 === parseInt(value.substr(9, 2), 10));
            } else if (length === 9 || length === 12) {
                var sum    = 0,
                    weight = [8, 7, 6, 5, 4, 3, 2, 10, 1];
                for (var i = 0; i < 9; i++) {
                    sum += parseInt(value.charAt(i), 10) * weight[i];
                }
                sum = sum % 97;

                if (parseInt(value.substr(0, 3), 10) >= 100) {
                    return (sum === 0 || sum === 42 || sum === 55);
                } else {
                    return (sum === 0);
                }
            }

            return true;
        },

        /**
         * Validate Greek VAT number
         * Examples:
         * - Valid: GR023456780, EL094259216
         * - Invalid: EL123456781
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _gr: function(value) {
            if (/^(GR|EL)[0-9]{9}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{9}$/.test(value)) {
                return false;
            }

            if (value.length === 8) {
                value = '0' + value;
            }

            var sum    = 0,
                weight = [256, 128, 64, 32, 16, 8, 4, 2];
            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }
            sum = (sum % 11) % 10;

            return (sum + '' === value.substr(8, 1));
        },

        // EL is traditionally prefix of Greek VAT numbers
        _el: function(value) {
            return this._gr(value);
        },

        /**
         * Validate Hungarian VAT number
         * Examples:
         * - Valid: HU12892312
         * - Invalid: HU12892313
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _hu: function(value) {
            if (/^HU[0-9]{8}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{8}$/.test(value)) {
                return false;
            }

            var sum    = 0,
                weight = [9, 7, 3, 1, 9, 7, 3, 1];

            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }

            return (sum % 10 === 0);
        },

        /**
         * Validate Croatian VAT number
         * Examples:
         * - Valid: HR33392005961
         * - Invalid: HR33392005962
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _hr: function(value) {
            if (/^HR[0-9]{11}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{11}$/.test(value)) {
                return false;
            }

            return FormValidation.Helper.mod11And10(value);
        },

        /**
         * Validate Irish VAT number
         * Examples:
         * - Valid: IE6433435F, IE6433435OA, IE8D79739I
         * - Invalid: IE8D79738J
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _ie: function(value) {
            if (/^IE[0-9]{1}[0-9A-Z\*\+]{1}[0-9]{5}[A-Z]{1,2}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{1}[0-9A-Z\*\+]{1}[0-9]{5}[A-Z]{1,2}$/.test(value)) {
                return false;
            }

            var getCheckDigit = function(value) {
                while (value.length < 7) {
                    value = '0' + value;
                }
                var alphabet = 'WABCDEFGHIJKLMNOPQRSTUV',
                    sum      = 0;
                for (var i = 0; i < 7; i++) {
                    sum += parseInt(value.charAt(i), 10) * (8 - i);
                }
                sum += 9 * alphabet.indexOf(value.substr(7));
                return alphabet[sum % 23];
            };

            // The first 7 characters are digits
            if (/^[0-9]+$/.test(value.substr(0, 7))) {
                // New system
                return value.charAt(7) === getCheckDigit(value.substr(0, 7) + value.substr(8) + '');
            } else if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ+*'.indexOf(value.charAt(1)) !== -1) {
                // Old system
                return value.charAt(7) === getCheckDigit(value.substr(2, 5) + value.substr(0, 1) + '');
            }

            return true;
        },

        /**
         * Validate Icelandic VAT (VSK) number
         * Examples:
         * - Valid: 12345, 123456
         * - Invalid: 1234567
         *
         * @params {String} value VAT number
         * @returns {Boolean}
         */
        _is: function(value) {
            if (/^IS[0-9]{5,6}$/.test(value)) {
                value = value.substr(2);
            }
            return /^[0-9]{5,6}$/.test(value);
        },

        /**
         * Validate Italian VAT number, which consists of 11 digits.
         * - First 7 digits are a company identifier
         * - Next 3 are the province of residence
         * - The last one is a check digit
         *
         * Examples:
         * - Valid: IT00743110157
         * - Invalid: IT00743110158
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _it: function(value) {
            if (/^IT[0-9]{11}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{11}$/.test(value)) {
                return false;
            }

            if (parseInt(value.substr(0, 7), 10) === 0) {
                return false;
            }

            var lastThree = parseInt(value.substr(7, 3), 10);
            if ((lastThree < 1) || (lastThree > 201) && lastThree !== 999 && lastThree !== 888) {
                return false;
            }

            return FormValidation.Helper.luhn(value);
        },

        /**
         * Validate Lithuanian VAT number
         * It can be:
         * - 9 digits, for legal entities
         * - 12 digits, for temporarily registered taxpayers
         *
         * Examples:
         * - Valid: LT119511515, LT100001919017, LT100004801610
         * - Invalid: LT100001919018
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _lt: function(value) {
            if (/^LT([0-9]{7}1[0-9]{1}|[0-9]{10}1[0-9]{1})$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^([0-9]{7}1[0-9]{1}|[0-9]{10}1[0-9]{1})$/.test(value)) {
                return false;
            }

            var length = value.length,
                sum    = 0,
                i;
            for (i = 0; i < length - 1; i++) {
                sum += parseInt(value.charAt(i), 10) * (1 + i % 9);
            }
            var check = sum % 11;
            if (check === 10) {
                sum = 0;
                for (i = 0; i < length - 1; i++) {
                    sum += parseInt(value.charAt(i), 10) * (1 + (i + 2) % 9);
                }
            }
            check = check % 11 % 10;
            return (check + '' === value.charAt(length - 1));
        },

        /**
         * Validate Luxembourg VAT number
         * Examples:
         * - Valid: LU15027442
         * - Invalid: LU15027443
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _lu: function(value) {
            if (/^LU[0-9]{8}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{8}$/.test(value)) {
                return false;
            }

            return ((parseInt(value.substr(0, 6), 10) % 89) + '' === value.substr(6, 2));
        },

        /**
         * Validate Latvian VAT number
         * Examples:
         * - Valid: LV40003521600, LV16117519997
         * - Invalid: LV40003521601, LV16137519997
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _lv: function(value) {
            if (/^LV[0-9]{11}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{11}$/.test(value)) {
                return false;
            }

            var first  = parseInt(value.charAt(0), 10),
                sum    = 0,
                weight = [],
                i,
                length = value.length;
            if (first > 3) {
                // Legal entity
                sum    = 0;
                weight = [9, 1, 4, 8, 3, 10, 2, 5, 7, 6, 1];
                for (i = 0; i < length; i++) {
                    sum += parseInt(value.charAt(i), 10) * weight[i];
                }
                sum = sum % 11;
                return (sum === 3);
            } else {
                // Check birth date
                var day   = parseInt(value.substr(0, 2), 10),
                    month = parseInt(value.substr(2, 2), 10),
                    year  = parseInt(value.substr(4, 2), 10);
                year = year + 1800 + parseInt(value.charAt(6), 10) * 100;

                if (!FormValidation.Helper.date(year, month, day)) {
                    return false;
                }

                // Check personal code
                sum    = 0;
                weight = [10, 5, 8, 4, 2, 1, 6, 3, 7, 9];
                for (i = 0; i < length - 1; i++) {
                    sum += parseInt(value.charAt(i), 10) * weight[i];
                }
                sum = (sum + 1) % 11 % 10;
                return (sum + '' === value.charAt(length - 1));
            }
        },

        /**
         * Validate Maltese VAT number
         * Examples:
         * - Valid: MT11679112
         * - Invalid: MT11679113
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _mt: function(value) {
            if (/^MT[0-9]{8}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{8}$/.test(value)) {
                return false;
            }

            var sum    = 0,
                weight = [3, 4, 6, 7, 8, 9, 10, 1];

            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }

            return (sum % 37 === 0);
        },

        /**
         * Validate Dutch VAT number
         * Examples:
         * - Valid: NL004495445B01
         * - Invalid: NL123456789B90
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _nl: function(value) {
            if (/^NL[0-9]{9}B[0-9]{2}$/.test(value)) {
               value = value.substr(2);
            }
            if (!/^[0-9]{9}B[0-9]{2}$/.test(value)) {
               return false;
            }

            var sum    = 0,
                weight = [9, 8, 7, 6, 5, 4, 3, 2];
            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }

            sum = sum % 11;
            if (sum > 9) {
                sum = 0;
            }
            return (sum + '' === value.substr(8, 1));
        },

        /**
         * Validate Norwegian VAT number
         *
         * @see http://www.brreg.no/english/coordination/number.html
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _no: function(value) {
            if (/^NO[0-9]{9}$/.test(value)) {
               value = value.substr(2);
            }
            if (!/^[0-9]{9}$/.test(value)) {
               return false;
            }

            var sum    = 0,
                weight = [3, 2, 7, 6, 5, 4, 3, 2];
            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }

            sum = 11 - sum % 11;
            if (sum === 11) {
                sum = 0;
            }
            return (sum + '' === value.substr(8, 1));
        },

        /**
         * Validate Polish VAT number
         * Examples:
         * - Valid: PL8567346215
         * - Invalid: PL8567346216
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _pl: function(value) {
            if (/^PL[0-9]{10}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{10}$/.test(value)) {
                return false;
            }

            var sum    = 0,
                weight = [6, 5, 7, 2, 3, 4, 5, 6, 7, -1];

            for (var i = 0; i < 10; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }

            return (sum % 11 === 0);
        },

        /**
         * Validate Portuguese VAT number
         * Examples:
         * - Valid: PT501964843
         * - Invalid: PT501964842
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _pt: function(value) {
            if (/^PT[0-9]{9}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{9}$/.test(value)) {
                return false;
            }

            var sum    = 0,
                weight = [9, 8, 7, 6, 5, 4, 3, 2];

            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }
            sum = 11 - sum % 11;
            if (sum > 9) {
                sum = 0;
            }
            return (sum + '' === value.substr(8, 1));
        },

        /**
         * Validate Romanian VAT number
         * Examples:
         * - Valid: RO18547290
         * - Invalid: RO18547291
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _ro: function(value) {
            if (/^RO[1-9][0-9]{1,9}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[1-9][0-9]{1,9}$/.test(value)) {
                return false;
            }

            var length = value.length,
                weight = [7, 5, 3, 2, 1, 7, 5, 3, 2].slice(10 - length),
                sum    = 0;
            for (var i = 0; i < length - 1; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }

            sum = (10 * sum) % 11 % 10;
            return (sum + '' === value.substr(length - 1, 1));
        },

        /**
         * Validate Russian VAT number (Taxpayer Identification Number - INN)
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _ru: function(value) {
            if (/^RU([0-9]{10}|[0-9]{12})$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^([0-9]{10}|[0-9]{12})$/.test(value)) {
                return false;
            }

            var i = 0;
            if (value.length === 10) {
                var sum    = 0,
                    weight = [2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
                for (i = 0; i < 10; i++) {
                    sum += parseInt(value.charAt(i), 10) * weight[i];
                }
                sum = sum % 11;
                if (sum > 9) {
                    sum = sum % 10;
                }

                return (sum + '' === value.substr(9, 1));
            } else if (value.length === 12) {
                var sum1    = 0,
                    weight1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0],
                    sum2    = 0,
                    weight2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0];

                for (i = 0; i < 11; i++) {
                    sum1 += parseInt(value.charAt(i), 10) * weight1[i];
                    sum2 += parseInt(value.charAt(i), 10) * weight2[i];
                }
                sum1 = sum1 % 11;
                if (sum1 > 9) {
                    sum1 = sum1 % 10;
                }
                sum2 = sum2 % 11;
                if (sum2 > 9) {
                    sum2 = sum2 % 10;
                }

                return (sum1 + '' === value.substr(10, 1) && sum2 + '' === value.substr(11, 1));
            }

            return false;
        },

        /**
         * Validate Serbian VAT number
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _rs: function(value) {
            if (/^RS[0-9]{9}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{9}$/.test(value)) {
                return false;
            }

            var sum  = 10,
                temp = 0;
            for (var i = 0; i < 8; i++) {
                temp = (parseInt(value.charAt(i), 10) + sum) % 10;
                if (temp === 0) {
                    temp = 10;
                }
                sum = (2 * temp) % 11;
            }

            return ((sum + parseInt(value.substr(8, 1), 10)) % 10 === 1);
        },

        /**
         * Validate Swedish VAT number
         * Examples:
         * - Valid: SE123456789701
         * - Invalid: SE123456789101
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _se: function(value) {
            if (/^SE[0-9]{10}01$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[0-9]{10}01$/.test(value)) {
                return false;
            }

            value = value.substr(0, 10);
            return FormValidation.Helper.luhn(value);
        },

        /**
         * Validate Slovenian VAT number
         * Examples:
         * - Valid: SI50223054
         * - Invalid: SI50223055
         * - Invalid: SI09999990
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _si: function(value) {
            // The Slovenian VAT numbers don't start with zero
            var res = value.match(/^(SI)?([1-9][0-9]{7})$/);
            if (!res) {
                return false;
            }
            if (res[1]) {
                value = value.substr(2);
            }

            var sum    = 0,
                weight = [8, 7, 6, 5, 4, 3, 2];

            for (var i = 0; i < 7; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }
            sum = 11 - sum % 11;
            if (sum === 10) {
                sum = 0;
            }
            return (sum + '' === value.substr(7, 1));
        },

        /**
         * Validate Slovak VAT number
         * Examples:
         * - Valid: SK2022749619
         * - Invalid: SK2022749618
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _sk: function(value) {
            if (/^SK[1-9][0-9][(2-4)|(6-9)][0-9]{7}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[1-9][0-9][(2-4)|(6-9)][0-9]{7}$/.test(value)) {
                return false;
            }

            return (parseInt(value, 10) % 11 === 0);
        },

        /**
         * Validate Venezuelan VAT number (RIF)
         * Examples:
         * - Valid: VEJ309272292, VEV242818101, VEJ000126518, VEJ000458324, J309272292, V242818101, J000126518, J000458324
         * - Invalid: VEJ309272293, VEV242818100, J000126519, J000458323
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _ve: function(value) {
            if (/^VE[VEJPG][0-9]{9}$/.test(value)) {
                value = value.substr(2);
            }
            if (!/^[VEJPG][0-9]{9}$/.test(value)) {
                return false;
            }

            var types  = {
                    'V': 4,
                    'E': 8,
                    'J': 12,
                    'P': 16,
                    'G': 20
                },
                sum    = types[value.charAt(0)],
                weight = [3, 2, 7, 6, 5, 4, 3, 2];

            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i + 1), 10) * weight[i];
            }

            sum = 11 - sum % 11;
            if (sum === 11 || sum === 10) {
                sum = 0;
            }
            return (sum + '' === value.substr(9, 1));
        },

        /**
         * Validate South African VAT number
         * Examples:
         * - Valid: 4012345678
         * - Invalid: 40123456789, 3012345678
         *
         * @params {String} value VAT number
         * @returns {Boolean}
         */
         _za: function(value) {
            if (/^ZA4[0-9]{9}$/.test(value)) {
                value = value.substr(2);
            }

            return /^4[0-9]{9}$/.test(value);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            vin: {
                'default': 'Please enter a valid VIN number'
            }
        }
    });

    FormValidation.Validator.vin = {
        /**
         * Validate an US VIN (Vehicle Identification Number)
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'vin');
            if (value === '') {
                return true;
            }

            // Don't accept I, O, Q characters
            if (!/^[a-hj-npr-z0-9]{8}[0-9xX][a-hj-npr-z0-9]{8}$/i.test(value)) {
                return false;
            }

            value = value.toUpperCase();
            var chars   = {
                    A: 1,   B: 2,   C: 3,   D: 4,   E: 5,   F: 6,   G: 7,   H: 8,
                    J: 1,   K: 2,   L: 3,   M: 4,   N: 5,           P: 7,           R: 9,
                            S: 2,   T: 3,   U: 4,   V: 5,   W: 6,   X: 7,   Y: 8,   Z: 9,
                    '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '0': 0
                },
                weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2],
                sum     = 0,
                length  = value.length;
            for (var i = 0; i < length; i++) {
                sum += chars[value.charAt(i) + ''] * weights[i];
            }

            var reminder = sum % 11;
            if (reminder === 10) {
                reminder = 'X';
            }

            return (reminder + '') === value.charAt(8);
        }
    };
}(jQuery));
;(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n || {}, {
        'en_US': {
            zipCode: {
                'default': 'Please enter a valid postal code',
                country: 'Please enter a valid postal code in %s',
                countries: {
                    AT: 'Austria',
                    BG: 'Bulgaria',
                    BR: 'Brazil',
                    CA: 'Canada',
                    CH: 'Switzerland',
                    CZ: 'Czech Republic',
                    DE: 'Germany',
                    DK: 'Denmark',
                    ES: 'Spain',
                    FR: 'France',
                    GB: 'United Kingdom',
                    IE: 'Ireland',
                    IN: 'India',
                    IT: 'Italy',
                    MA: 'Morocco',
                    NL: 'Netherlands',
                    PL: 'Poland',
                    PT: 'Portugal',
                    RO: 'Romania',
                    RU: 'Russia',
                    SE: 'Sweden',
                    SG: 'Singapore',
                    SK: 'Slovakia',
                    US: 'USA'
                }
            }
        }
    });

    FormValidation.Validator.zipCode = {
        html5Attributes: {
            message: 'message',
            country: 'country'
        },

        COUNTRY_CODES: ['AT', 'BG', 'BR', 'CA', 'CH', 'CZ', 'DE', 'DK', 'ES', 'FR', 'GB', 'IE', 'IN', 'IT', 'MA', 'NL', 'PL', 'PT', 'RO', 'RU', 'SE', 'SG', 'SK', 'US'],

        /**
         * Return true if and only if the input value is a valid country zip code
         *
         * @param {FormValidation.Base} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * - country: The country
         *
         * The country can be defined by:
         * - An ISO 3166 country code
         * - Name of field which its value defines the country code
         * - Name of callback function that returns the country code
         * - A callback function that returns the country code
         *
         *  callback: function(value, validator, $field) {
         *      // value is the value of field
         *      // validator is the BootstrapValidator instance
         *      // $field is jQuery element representing the field
         *  }
         *
         * @returns {Boolean|Object}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'zipCode');
            if (value === '' || !options.country) {
                return true;
            }

            var locale  = validator.getLocale(),
                country = options.country;
            if (typeof country !== 'string' || $.inArray(country, this.COUNTRY_CODES) === -1) {
                // Try to determine the country
                country = validator.getDynamicOption($field, country);
            }

            if (!country || $.inArray(country.toUpperCase(), this.COUNTRY_CODES) === -1) {
                return true;
            }

            var isValid = false;
            country = country.toUpperCase();
            switch (country) {
                // http://en.wikipedia.org/wiki/List_of_postal_codes_in_Austria
                case 'AT':
                    isValid = /^([1-9]{1})(\d{3})$/.test(value);
                    break;

                case 'BG':
                    isValid = /^([1-9]{1}[0-9]{3})$/.test($.trim(value));
                    break;

                case 'BR':
                    isValid = /^(\d{2})([\.]?)(\d{3})([\-]?)(\d{3})$/.test(value);
                    break;

                case 'CA':
                    isValid = /^(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|X|Y){1}[0-9]{1}(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|W|X|Y|Z){1}\s?[0-9]{1}(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|W|X|Y|Z){1}[0-9]{1}$/i.test(value);
                    break;

                case 'CH':
                    isValid = /^([1-9]{1})(\d{3})$/.test(value);
                    break;

                case 'CZ':
                    // Test: http://regexr.com/39hhr
                    isValid = /^(\d{3})([ ]?)(\d{2})$/.test(value);
                    break;

                // http://stackoverflow.com/questions/7926687/regular-expression-german-zip-codes
                case 'DE':
                    isValid = /^(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})$/.test(value);
                    break;

                case 'DK':
                    isValid = /^(DK(-|\s)?)?\d{4}$/i.test(value);
                    break;

                // Zip codes in Spain go from 01XXX to 52XXX.
                // Test: http://refiddle.com/1ufo
                case 'ES':
                    isValid = /^(?:0[1-9]|[1-4][0-9]|5[0-2])\d{3}$/.test(value);
                    break;

                // http://en.wikipedia.org/wiki/Postal_codes_in_France
                case 'FR':
                    isValid = /^[0-9]{5}$/i.test(value);
                    break;

                case 'GB':
                    isValid = this._gb(value);
                    break;

                // Indian PIN (Postal Index Number) validation
                // http://en.wikipedia.org/wiki/Postal_Index_Number
                // Test: http://regex101.com/r/kV0vH3/1
                case 'IN':
                    isValid = /^\d{3}\s?\d{3}$/.test(value);
                    break;

                // http://www.eircode.ie/docs/default-source/Common/prepare-your-business-for-eircode---published-v2.pdf?sfvrsn=2
                // Test: http://refiddle.com/1kpl
                case 'IE':
                    isValid = /^(D6W|[ACDEFHKNPRTVWXY]\d{2})\s[0-9ACDEFHKNPRTVWXY]{4}$/.test(value);
                    break;

                // http://en.wikipedia.org/wiki/List_of_postal_codes_in_Italy
                case 'IT':
                    isValid = /^(I-|IT-)?\d{5}$/i.test(value);
                    break;

                // http://en.wikipedia.org/wiki/List_of_postal_codes_in_Morocco
                case 'MA':
                    isValid = /^[1-9][0-9]{4}$/i.test(value);
                    break;

                // http://en.wikipedia.org/wiki/Postal_codes_in_the_Netherlands
                case 'NL':
                    isValid = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i.test(value);
                    break;

                // http://en.wikipedia.org/wiki/List_of_postal_codes_in_Poland
                case 'PL':
                    isValid = /^[0-9]{2}\-[0-9]{3}$/.test(value);
                    break;

                // Test: http://refiddle.com/1l2t
                case 'PT':
                    isValid = /^[1-9]\d{3}-\d{3}$/.test(value);
                    break;

                case 'RO':
                    isValid = /^(0[1-8]{1}|[1-9]{1}[0-5]{1})?[0-9]{4}$/i.test(value);
                    break;

                case 'RU':
                    isValid = /^[0-9]{6}$/i.test(value);
                    break;

                case 'SE':
                    isValid = /^(S-)?\d{3}\s?\d{2}$/i.test(value);
                    break;

                case 'SG':
                    isValid = /^([0][1-9]|[1-6][0-9]|[7]([0-3]|[5-9])|[8][0-2])(\d{4})$/i.test(value);
                    break;

                case 'SK':
                    // Test: http://regexr.com/39hhr
                    isValid = /^(\d{3})([ ]?)(\d{2})$/.test(value);
                    break;

                case 'US':
                /* falls through */
                default:
                    isValid = /^\d{4,5}([\-]?\d{4})?$/.test(value);
                    break;
            }

            return {
                valid: isValid,
                message: FormValidation.Helper.format(options.message || FormValidation.I18n[locale].zipCode.country, FormValidation.I18n[locale].zipCode.countries[country])
            };
        },

        /**
         * Validate United Kingdom postcode
         * Examples:
         * - Standard: EC1A 1BB, W1A 1HQ, M1 1AA, B33 8TH, CR2 6XH, DN55 1PT
         * - Special cases:
         * AI-2640, ASCN 1ZZ, GIR 0AA
         *
         * @see http://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom
         * @param {String} value The postcode
         * @returns {Boolean}
         */
        _gb: function(value) {
            var firstChar  = '[ABCDEFGHIJKLMNOPRSTUWYZ]',     // Does not accept QVX
                secondChar = '[ABCDEFGHKLMNOPQRSTUVWXY]',     // Does not accept IJZ
                thirdChar  = '[ABCDEFGHJKPMNRSTUVWXY]',
                fourthChar = '[ABEHMNPRVWXY]',
                fifthChar  = '[ABDEFGHJLNPQRSTUWXYZ]',
                regexps    = [
                    // AN NAA, ANN NAA, AAN NAA, AANN NAA format
                    new RegExp('^(' + firstChar + '{1}' + secondChar + '?[0-9]{1,2})(\\s*)([0-9]{1}' + fifthChar + '{2})$', 'i'),
                    // ANA NAA
                    new RegExp('^(' + firstChar + '{1}[0-9]{1}' + thirdChar + '{1})(\\s*)([0-9]{1}' + fifthChar + '{2})$', 'i'),
                    // AANA NAA
                    new RegExp('^(' + firstChar + '{1}' + secondChar + '{1}?[0-9]{1}' + fourthChar + '{1})(\\s*)([0-9]{1}' + fifthChar + '{2})$', 'i'),

                    new RegExp('^(BF1)(\\s*)([0-6]{1}[ABDEFGHJLNPQRST]{1}[ABDEFGHJLNPQRSTUWZYZ]{1})$', 'i'),        // BFPO postcodes
                    /^(GIR)(\s*)(0AA)$/i,                       // Special postcode GIR 0AA
                    /^(BFPO)(\s*)([0-9]{1,4})$/i,               // Standard BFPO numbers
                    /^(BFPO)(\s*)(c\/o\s*[0-9]{1,3})$/i,        // c/o BFPO numbers
                    /^([A-Z]{4})(\s*)(1ZZ)$/i,                  // Overseas Territories
                    /^(AI-2640)$/i                              // Anguilla
                ];
            for (var i = 0; i < regexps.length; i++) {
                if (regexps[i].test(value)) {
                    return true;
                }
            }

            return false;
        }
    };
}(jQuery));
