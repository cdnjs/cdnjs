/**
 * BootstrapValidator (http://bootstrapvalidator.com)
 *
 * A jQuery plugin to validate form fields. Use with Bootstrap 3
 *
 * @version     v0.4.1
 * @author      https://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 - 2014 Nguyen Huu Phuoc
 * @license     MIT
 */

(function($) {
    var BootstrapValidator = function(form, options) {
        this.$form   = $(form);
        this.options = $.extend({}, BootstrapValidator.DEFAULT_OPTIONS, options);

        this.$invalidField = null;  // First invalid field
        this.$submitButton = null;  // The submit button which is clicked to submit form

        // Validating status
        this.STATUS_NOT_VALIDATED = 'NOT_VALIDATED';
        this.STATUS_VALIDATING    = 'VALIDATING';
        this.STATUS_INVALID       = 'INVALID';
        this.STATUS_VALID         = 'VALID';

        // Determine the event that is fired when user change the field value
        // Most modern browsers supports input event except IE 7, 8.
        // IE 9 supports input event but the event is still not fired if I press the backspace key.
        // In that case I will use the keydown event
        var el = document.createElement('div');
        this._changeEvent = ('oninput' in el) ? 'input' : 'keydown';

        // The flag to indicate that the form is ready to submit when a remote/callback validator returns
        this._submitIfValid = null;

        this._init();
    };

    // The default options
    BootstrapValidator.DEFAULT_OPTIONS = {
        // The form CSS class
        elementClass: 'bootstrap-validator-form',

        // Default invalid message
        message: 'This value is not valid',

        // Shows ok/error/loading icons based on the field validity.
        // This feature requires Bootstrap v3.1.0 or later (http://getbootstrap.com/css/#forms-control-validation).
        // Since Bootstrap doesn't provide any methods to know its version, this option cannot be on/off automatically.
        // In other word, to use this feature you have to upgrade your Bootstrap to v3.1.0 or later.
        //
        // Examples:
        // - Use Glyphicons icons:
        //  feedbackIcons: {
        //      valid: 'glyphicon glyphicon-ok',
        //      invalid: 'glyphicon glyphicon-remove',
        //      validating: 'glyphicon glyphicon-refresh'
        //  }
        // - Use FontAwesome icons:
        //  feedbackIcons: {
        //      valid: 'fa fa-check',
        //      invalid: 'fa fa-times',
        //      validating: 'fa fa-refresh'
        //  }
        feedbackIcons: {
            valid:      null,
            invalid:    null,
            validating: null
        },

        // The submit buttons selector
        // These buttons will be disabled to prevent the valid form from multiple submissions
        submitButtons: 'button[type="submit"]',

        // The custom submit handler
        // It will prevent the form from the default submission
        //
        //  submitHandler: function(validator, form) {
        //      - validator is the BootstrapValidator instance
        //      - form is the jQuery object present the current form
        //  }
        submitHandler: null,

        // Live validating option
        // Can be one of 3 values:
        // - enabled: The plugin validates fields as soon as they are changed
        // - disabled: Disable the live validating. The error messages are only shown after the form is submitted
        // - submitted: The live validating is enabled after the form is submitted
        live: 'enabled',

        // Map the field name with validator rules
        fields: null
    };

    BootstrapValidator.prototype = {
        constructor: BootstrapValidator,

        /**
         * Init form
         */
        _init: function() {
            var that    = this,
                options = {
                    trigger:        this.$form.attr('data-bv-trigger'),
                    message:        this.$form.attr('data-bv-message'),
                    submitButtons:  this.$form.attr('data-bv-submitbuttons'),
                    live:           this.$form.attr('data-bv-live'),
                    fields:         {},
                    feedbackIcons: {
                        valid:      this.$form.attr('data-bv-feedbackicons-valid'),
                        invalid:    this.$form.attr('data-bv-feedbackicons-invalid'),
                        validating: this.$form.attr('data-bv-feedbackicons-validating')
                    }
                },
                validator,
                v,          // Validator name
                enabled,
                optionName,
                optionValue,
                html5AttrName,
                html5Attrs;

            this.$form
                // Disable client side validation in HTML 5
                .attr('novalidate', 'novalidate')
                .addClass(this.options.elementClass)
                // Disable the default submission first
                .on('submit.bv', function(e) {
                    e.preventDefault();
                    that.validate();
                })
                .on('click', this.options.submitButtons, function() {
                    that.$submitButton  = $(this);
					// The user just click the submit button
					that._submitIfValid = true;
                })
                // Find all fields which have either "name" or "data-bv-field" attribute
                .find('[name], [data-bv-field]').each(function() {
                    var $field = $(this);
                    // Don't initialize hidden input
                    if ('hidden' == $field.attr('type')) {
                        return;
                    }

                    var field  = $field.attr('name') || $field.attr('data-bv-field');
                    $field.attr('data-bv-field', field);

                    options.fields[field] = $.extend({}, {
                        trigger:    $field.attr('data-bv-trigger'),
                        message:    $field.attr('data-bv-message'),
                        container:  $field.attr('data-bv-container'),
                        selector:   $field.attr('data-bv-selector'),
                        validators: {}
                    }, options.fields[field]);

                    for (v in $.fn.bootstrapValidator.validators) {
                        validator  = $.fn.bootstrapValidator.validators[v];
                        enabled    = $field.attr('data-bv-' + v.toLowerCase()) + '';
                        html5Attrs = ('function' == typeof validator.enableByHtml5) ? validator.enableByHtml5($(this)) : null;

                        if ((html5Attrs && enabled != 'false')
                            || (html5Attrs !== true && ('' == enabled || 'true' == enabled)))
                        {
                            // Try to parse the options via attributes
                            validator.html5Attributes = validator.html5Attributes || { message: 'message' };
                            options.fields[field]['validators'][v] = $.extend({}, html5Attrs == true ? {} : html5Attrs, options.fields[field]['validators'][v]);

                            for (html5AttrName in validator.html5Attributes) {
                                optionName  = validator.html5Attributes[html5AttrName];
                                optionValue = $field.attr('data-bv-' + v.toLowerCase() + '-' + html5AttrName);
                                if (optionValue) {
                                    if ('true' == optionValue) {
                                        optionValue = true;
                                    } else if ('false' == optionValue) {
                                        optionValue = false;
                                    }
                                    options.fields[field]['validators'][v][optionName] = optionValue;
                                }
                            }
                        }
                    }
                });

            this.options = $.extend(true, this.options, options);

            for (var field in this.options.fields) {
                this._initField(field);
            }

            this.setLiveMode(this.options.live);
        },

        /**
         * Init field
         *
         * @param {String} field The field name
         */
        _initField: function(field) {
            if (this.options.fields[field] == null || this.options.fields[field].validators == null) {
                return;
            }

            var fields = this.getFieldElements(field);

            // We don't need to validate non-existing fields
            if (fields == null) {
                delete this.options.fields[field];
                return;
            }
            for (var validatorName in this.options.fields[field].validators) {
                if (!$.fn.bootstrapValidator.validators[validatorName]) {
                    delete this.options.fields[field].validators[validatorName];
                }
            }

            var that      = this,
                type      = fields.attr('type'),
                event     = ('radio' == type || 'checkbox' == type || 'file' == type || 'SELECT' == fields[0].tagName) ? 'change' : that._changeEvent,
                total     = fields.length,
                updateAll = (total == 1) || ('radio' == type) || ('checkbox' == type);

            for (var i = 0; i < total; i++) {
                var $field   = $(fields[i]),
                    $parent  = $field.parents('.form-group'),
                    // Allow user to indicate where the error messages are shown
                    $message = this.options.fields[field].container ? $parent.find(this.options.fields[field].container) : this._getMessageContainer($field);

                // Set the attribute to indicate the fields which are defined by selector
                if (!$field.attr('data-bv-field')) {
                    $field.attr('data-bv-field', field);
                }

                // Whenever the user change the field value, mark it as not validated yet
                $field.on(event + '.update.bv', function() {
                    // Reset the flag
                    that._submitIfValid = false;
                    updateAll ? that.updateStatus(field, that.STATUS_NOT_VALIDATED, null)
                              : that.updateElementStatus($(this), that.STATUS_NOT_VALIDATED, null);
                });

                // Create help block elements for showing the error messages
                $field.data('bv.messages', $message);
                for (validatorName in this.options.fields[field].validators) {
                    $field.data('bv.result.' + validatorName, this.STATUS_NOT_VALIDATED);

                    if (!updateAll || i == total - 1) {
                        $('<small/>')
                            .css('display', 'none')
                            .attr('data-bv-validator', validatorName)
                            .html(this.options.fields[field].validators[validatorName].message || this.options.fields[field].message || this.options.message)
                            .addClass('help-block')
                            .appendTo($message);
                    }
                }

                // Prepare the feedback icons
                // Available from Bootstrap 3.1 (http://getbootstrap.com/css/#forms-control-validation)
                if (this.options.feedbackIcons
                    && this.options.feedbackIcons.validating && this.options.feedbackIcons.invalid && this.options.feedbackIcons.valid
                    && (!updateAll || i == total - 1))
                {
                    $parent.addClass('has-feedback');
                    var $icon = $('<i/>').css('display', 'none').addClass('form-control-feedback').attr('data-bv-field', field).insertAfter($field);
                    // The feedback icon does not render correctly if there is no label
                    // https://github.com/twbs/bootstrap/issues/12873
                    if ($parent.find('label').length == 0) {
                        $icon.css('top', 0);
                    }
                }
            }

            if (this.options.fields[field]['enabled'] == null) {
                this.options.fields[field]['enabled'] = true;
            }
        },

        /**
         * Get the element to place the error messages
         *
         * @param {jQuery} $field The field element
         * @returns {jQuery}
         */
        _getMessageContainer: function($field) {
            var $parent = $field.parent();
            if ($parent.hasClass('form-group')) {
                return $parent;
            }

            var cssClasses = $parent.attr('class');
            if (!cssClasses) {
                return this._getMessageContainer($parent);
            }

            cssClasses = cssClasses.split(' ');
            var n = cssClasses.length;
            for (var i = 0; i < n; i++) {
                if (/^col-(xs|sm|md|lg)-\d+$/.test(cssClasses[i]) || /^col-(xs|sm|md|lg)-offset-\d+$/.test(cssClasses[i])) {
                    return $parent;
                }
            }

            return this._getMessageContainer($parent);
        },

        /**
         * Called when all validations are completed
         */
        _submit: function() {
            if (!this.isValid()) {
                if ('submitted' == this.options.live) {
                    this.setLiveMode('enabled');
                }

                // Focus to the first invalid field
                if (this.$invalidField) {
                    this.$invalidField.focus();
                }
                return;
            }

            // Call the custom submission if enabled
            if (this.options.submitHandler && 'function' == typeof this.options.submitHandler) {
                // If you want to submit the form inside your submit handler, please call defaultSubmit() method
                this.options.submitHandler.call(this, this, this.$form, this.$submitButton);
            } else {
                this.disableSubmitButtons(true).defaultSubmit();
            }
        },

        // --- Public methods ---

        /**
         * Retrieve the field elements by given name
         *
         * @param {String} field The field name
         * @returns {null|jQuery[]}
         */
        getFieldElements: function(field) {
            var fields = this.options.fields[field].selector ? $(this.options.fields[field].selector) : this.$form.find('[name="' + field + '"]');
            return (fields.length == 0) ? null : fields;
        },

        /**
         * Set live validating mode
         *
         * @param {String} mode Live validating mode. Can be 'enabled', 'disabled', 'submitted'
         * @returns {BootstrapValidator}
         */
        setLiveMode: function(mode) {
            this.options.live = mode;
            if ('submitted' == mode) {
                return this;
            }

            var that = this;
            for (var field in this.options.fields) {
                (function(f) {
                    var fields = that.getFieldElements(f);
                    if (fields) {
                        var type      = fields.attr('type'),
                            total     = fields.length,
                            updateAll = (total == 1) || ('radio' == type) || ('checkbox' == type),
                            trigger   = that.options.fields[field].trigger
                                        || that.options.trigger
                                        || (('radio' == type || 'checkbox' == type || 'file' == type || 'SELECT' == fields[0].tagName) ? 'change' : that._changeEvent),
                            events    = $.map(trigger.split(' '), function(item) {
                                return item + '.live.bv';
                            }).join(' ');

                        for (var i = 0; i < total; i++) {
                            ('enabled' == mode)
                                ? $(fields[i]).on(events, function() {
                                    updateAll ? that.validateField(f) : that.validateFieldElement($(this), false);
                                })
                                : $(fields[i]).off(events);
                        }
                    }
                })(field);
            }

            return this;
        },

        /**
         * Disable/enable submit buttons
         *
         * @param {Boolean} disabled Can be true or false
         * @returns {BootstrapValidator}
         */
        disableSubmitButtons: function(disabled) {
            if (!disabled) {
                this.$form.find(this.options.submitButtons).removeAttr('disabled');
            } else if (this.options.live != 'disabled') {
                // Don't disable if the live validating mode is disabled
                this.$form.find(this.options.submitButtons).attr('disabled', 'disabled');
            }

            return this;
        },

        /**
         * Validate the form
         *
         * @return {BootstrapValidator}
         */
        validate: function() {
            if (!this.options.fields) {
                return this;
            }
            this.disableSubmitButtons(true);

            for (var field in this.options.fields) {
                this.validateField(field);
            }

            // Check if whether the submit button is clicked
            if (this.$submitButton) {
                this._submit();
            }

            return this;
        },

        /**
         * Validate given field
         *
         * @param {String} field The field name
         * @returns {BootstrapValidator}
         */
        validateField: function(field) {
            var fields = this.getFieldElements(field),
                type   = fields.attr('type'),
                n      = (('radio' == type) || ('checkbox' == type)) ? 1 : fields.length;

            for (var i = 0; i < n; i++) {
                this.validateFieldElement($(fields[i]), (n == 1));
            }

            return this;
        },

        /**
         * Validate field element
         *
         * @param {jQuery} $field The field element
         * @param {Boolean} updateAll If true, update status of all elements which have the same name
         * @returns {BootstrapValidator}
         */
        validateFieldElement: function($field, updateAll) {
            var that       = this,
                field      = $field.attr('data-bv-field'),
                validators = this.options.fields[field].validators,
                validatorName,
                validateResult;

            // We don't need to validate disabled, hidden field
            if ($field.is(':disabled') || $field.is(':hidden') || !$field.is(':visible')) {
                return this;
            }

            for (validatorName in validators) {
                if ($field.data('bv.dfs.' + validatorName)) {
                    $field.data('bv.dfs.' + validatorName).reject();
                }

                // Don't validate field if it is already done
                var result = $field.data('bv.result.' + validatorName);
                if (result == this.STATUS_VALID || result == this.STATUS_INVALID) {
                    continue;
                }

                $field.data('bv.result.' + validatorName, this.STATUS_VALIDATING);
                validateResult = $.fn.bootstrapValidator.validators[validatorName].validate(this, $field, validators[validatorName]);

                if ('object' == typeof validateResult) {
                    updateAll ? this.updateStatus(field, this.STATUS_VALIDATING, validatorName)
                              : this.updateElementStatus($field, this.STATUS_VALIDATING, validatorName);
                    $field.data('bv.dfs.' + validatorName, validateResult);

                    validateResult.done(function($f, v, isValid) {
                        // v is validator name
                        $f.removeData('bv.dfs.' + v);
                        updateAll ? that.updateStatus($f.attr('data-bv-field'), isValid ? that.STATUS_VALID : that.STATUS_INVALID, v)
                                  : that.updateElementStatus($f, isValid ? that.STATUS_VALID : that.STATUS_INVALID, v);

                        if (isValid && that._submitIfValid == true) {
						    // If a remote validator returns true and the form is ready to submit, then do it
							that._submit();
						}
                    });
                } else if ('boolean' == typeof validateResult) {
                    updateAll ? this.updateStatus(field, validateResult ? this.STATUS_VALID : this.STATUS_INVALID, validatorName)
                              : this.updateElementStatus($field, validateResult ? this.STATUS_VALID : this.STATUS_INVALID, validatorName);
                }
            }

            return this;
        },

        /**
         * Update all validating results of elements which have the same field name
         *
         * @param {String} field The field name
         * @param {String} status The status. Can be 'NOT_VALIDATED', 'VALIDATING', 'INVALID' or 'VALID'
         * @param {String} [validatorName] The validator name. If null, the method updates validity result for all validators
         * @return {BootstrapValidator}
         */
        updateStatus: function(field, status, validatorName) {
            var fields = this.getFieldElements(field),
                type   = fields.attr('type'),
                n      = (('radio' == type) || ('checkbox' == type)) ? 1 : fields.length;

            for (var i = 0; i < n; i++) {
                this.updateElementStatus($(fields[i]), status, validatorName);
            }

            return this;
        },

        /**
         * Update validating result of given element
         *
         * @param {jQuery} $field The field element
         * @param {String} status The status. Can be 'NOT_VALIDATED', 'VALIDATING', 'INVALID' or 'VALID'
         * @param {String} [validatorName] The validator name. If null, the method updates validity result for all validators
         * @return {BootstrapValidator}
         */
        updateElementStatus: function($field, status, validatorName) {
            var that       = this,
                field      = $field.attr('data-bv-field'),
                $parent    = $field.parents('.form-group'),
                $message   = $field.data('bv.messages'),
                $rowErrors = $parent.find('.help-block[data-bv-validator]'),
                $errors    = $message.find('.help-block[data-bv-validator]'),
                $icon      = $parent.find('.form-control-feedback[data-bv-field="' + field + '"]');

            // Update status
            if (validatorName) {
                $field.data('bv.result.' + validatorName, status);
            } else {
                for (var v in this.options.fields[field].validators) {
                    $field.data('bv.result.' + v, status);
                }
            }

            // Show/hide error elements and feedback icons
            switch (status) {
                case this.STATUS_VALIDATING:
                    this.disableSubmitButtons(true);
                    $parent.removeClass('has-success').removeClass('has-error');
                    // TODO: Show validating message
                    validatorName ? $errors.filter('.help-block[data-bv-validator="' + validatorName + '"]').hide() : $errors.hide();
                    if ($icon) {
                        $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).addClass(this.options.feedbackIcons.validating).show();
                    }
                    break;

                case this.STATUS_INVALID:
                    this.disableSubmitButtons(true);
                    $parent.removeClass('has-success').addClass('has-error');
                    validatorName ? $errors.filter('[data-bv-validator="' + validatorName + '"]').show() : $errors.show();
                    if ($icon) {
                        $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.validating).addClass(this.options.feedbackIcons.invalid).show();
                    }
                    break;

                case this.STATUS_VALID:
                    validatorName ? $errors.filter('[data-bv-validator="' + validatorName + '"]').hide() : $errors.hide();

                    // If the field is valid (passes all validators)
                    var validField = ($errors.filter(function() {
                                        var display = $(this).css('display'), v = $(this).attr('data-bv-validator');
                                        return ('block' == display) || ($field.data('bv.result.' + v) != that.STATUS_VALID);
                                    }).length == 0);
                    this.disableSubmitButtons(validField ? false : true);
                    if ($icon) {
                        $icon
                            .removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).removeClass(this.options.feedbackIcons.valid)
                            .addClass(validField ? this.options.feedbackIcons.valid : this.options.feedbackIcons.invalid)
                            .show();
                    }

                    // Check if all fields in the same row are valid
                    var validRow = ($rowErrors.filter(function() {
                                        var display = $(this).css('display'), v = $(this).attr('data-bv-validator');
                                        return ('block' == display) || ($field.data('bv.result.' + v) != that.STATUS_VALID);
                                    }).length == 0);
                    $parent.removeClass('has-error has-success').addClass(validRow ? 'has-success' : 'has-error');
                    break;

                case this.STATUS_NOT_VALIDATED:
                default:
                    this.disableSubmitButtons(false);
                    $parent.removeClass('has-success').removeClass('has-error');
                    validatorName ? $errors.filter('.help-block[data-bv-validator="' + validatorName + '"]').hide() : $errors.hide();
                    if ($icon) {
                        $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).hide();
                    }
                    break;
            }

            return this;
        },

        /**
         * Check the form validity
         *
         * @returns {Boolean}
         */
        isValid: function() {
            var fields, field, $field,
                type, status, validatorName,
                n, i;
            for (field in this.options.fields) {
                if (this.options.fields[field] == null || !this.options.fields[field]['enabled']) {
                    continue;
                }

                fields = this.getFieldElements(field);
                type   = fields.attr('type');
                n      = (('radio' == type) || ('checkbox' == type)) ? 1 : fields.length;

                for (i = 0; i < n; i++) {
                    $field = $(fields[i]);
                    if ($field.is(':disabled') || $field.is(':hidden') || !$field.is(':visible')) {
                        continue;
                    }

                    for (validatorName in this.options.fields[field].validators) {
                        status = $field.data('bv.result.' + validatorName);
                        if (status == this.STATUS_NOT_VALIDATED || status == this.STATUS_VALIDATING) {
                            return false;
                        }

                        if (status == this.STATUS_INVALID) {
                            this.$invalidField = $field;
                            return false;
                        }
                    }
                }
            }

            return true;
        },

        /**
         * Submit the form using default submission.
         * It also does not perform any validations when submitting the form
         *
         * It might be used when you want to submit the form right inside the submitHandler()
         */
        defaultSubmit: function() {
            this.$form.off('submit.bv').submit();
        },

        // Useful APIs which aren't used internally

        /**
         * Reset the form
         *
         * @param {Boolean} resetFormData Reset current form data
         * @return {BootstrapValidator}
         */
        resetForm: function(resetFormData) {
            var field, fields, total, type, validator;
            for (field in this.options.fields) {
                fields = this.getFieldElements(field);
                total  = fields.length;

                for (var i = 0; i < total; i++) {
                    for (validator in this.options.fields[field].validators) {
                        $(fields[i]).removeData('bv.dfs.' + validator);
                    }
                }

                // Mark field as not validated yet
                this.updateStatus(field, this.STATUS_NOT_VALIDATED, null);

                if (resetFormData) {
                    type = fields.attr('type');
                    ('radio' == type || 'checkbox' == type) ? fields.removeAttr('checked').removeAttr('selected') : fields.val('');
                }
            }

            this.$invalidField = null;
            this.$submitButton = null;

            // Enable submit buttons
            this.disableSubmitButtons(false);

            return this;
        },

        /**
         * Enable/Disable all validators to given field
         *
         * @param {String} field The field name
         * @param {Boolean} enabled Enable/Disable field validators
         * @return {BootstrapValidator}
         */
        enableFieldValidators: function(field, enabled) {
            this.options.fields[field]['enabled'] = enabled;
            this.updateStatus(field, this.STATUS_NOT_VALIDATED, null);

            return this;
        }
    };

    // Plugin definition
    $.fn.bootstrapValidator = function(options) {
        return this.each(function() {
            var $this = $(this), data = $this.data('bootstrapValidator');
            if (!data) {
                $this.data('bootstrapValidator', (data = new BootstrapValidator(this, options)));
            }
            if ('string' == typeof options) {
                data[options]();
            }
        });
    };

    // Available validators
    $.fn.bootstrapValidator.validators = {};

    $.fn.bootstrapValidator.Constructor = BootstrapValidator;
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.base64 = {
        /**
         * Return true if the input value is a base 64 encoded string.
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(value);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.between = {
        html5Attributes: {
            message: 'message',
            min: 'min',
            max: 'max',
            inclusive: 'inclusive'
        },

        enableByHtml5: function($field) {
            if ('range' == $field.attr('type')) {
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
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - min
         * - max
         * - inclusive [optional]: Can be true or false. Default is true
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            value = parseFloat(value);
            return (options.inclusive === true)
                        ? (value > options.min && value < options.max)
                        : (value >= options.min && value <= options.max);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.callback = {
        /**
         * Return result from the callback method
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - callback: The callback method that passes 2 parameters:
         *      callback: function(fieldValue, validator) {
         *          // fieldValue is the value of field
         *          // validator is instance of BootstrapValidator
         *      }
         * - message: The invalid message
         * @returns {Boolean|Deferred}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (options.callback && 'function' == typeof options.callback) {
                var dfd = new $.Deferred();
                dfd.resolve($field, 'callback', options.callback.call(this, value, validator));
                return dfd;
            }
            return true;
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.choice = {
        html5Attributes: {
            message: 'message',
            min: 'min',
            max: 'max'
        },

        /**
         * Check if the number of checked boxes are less or more than a given number
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of following keys:
         * - min
         * - max
         * At least one of two keys is required
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var numChoices = validator
                                    .getFieldElements($field.attr('data-bv-field'))
                                    .filter(':checked')
                                    .length;
            if ((options.min && numChoices < options.min) || (options.max && numChoices > options.max)) {
                return false;
            }

            return true;
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.creditCard = {
        /**
         * Return true if the input value is valid credit card number
         * Based on https://gist.github.com/DiegoSalazar/4075533
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following key:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            // Accept only digits, dashes or spaces
            if (/[^0-9-\s]+/.test(value)) {
                return false;
            }
            value = value.replace(/\D/g, '');

            // Validate the check sum
            // The Luhn Algorithm
            // http://en.wikipedia.org/wiki/Luhn
            var check = 0, digit = 0, even = false, length = value.length;

            for (var n = length - 1; n >= 0; n--) {
                digit = parseInt(value.charAt(n), 10);

                if (even) {
                    if ((digit *= 2) > 9) {
                        digit -= 9;
                    }
                }

                check += digit;
                even = !even;
            }

            if ((check % 10) != 0) {
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
                    prefix: ['3528', '3529', '353', '354', '355', '356', '357', '358']
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
                for (i in cards[type]['prefix']) {
                    if (value.substr(0, cards[type]['prefix'][i].length) == cards[type]['prefix'][i]    // Check the prefix
                        && cards[type]['length'].indexOf(value.length) != -1)                           // and length
                    {
                        return true;
                    }
                }
            }

            return false;
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.cvv = {
        html5Attributes: {
            message: 'message',
            ccfield: 'creditCardField'
        },

        /**
         * Return true if the input value is a valid CVV number.
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - creditCardField: The credit card number field. It can be null
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
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
            if (creditCard == '') {
                return true;
            }

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
                    prefix: ['3528', '3529', '353', '354', '355', '356', '357', '358']
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
                for (i in cards[type]['prefix']) {
                    if (creditCard.substr(0, cards[type]['prefix'][i].length) == cards[type]['prefix'][i]   // Check the prefix
                        && cards[type]['length'].indexOf(creditCard.length) != -1)                          // and length
                    {
                        creditCardType = type;
                        break;
                    }
                }
            }

            return (creditCardType == null)
                        ? false
                        : (('AMERICAN_EXPRESS' == creditCardType) ? (value.length == 4) : (value.length == 3));
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.date = {
        html5Attributes: {
            message: 'message',
            format: 'format'
        },

        /**
         * Return true if the input value is valid date
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - format: The date format. Default is MM/DD/YYYY
         * Support the following formats:
         *      YYYY/DD/MM
         *      YYYY/DD/MM h:m A
         *      YYYY/MM/DD
         *      YYYY/MM/DD h:m A
         *
         *      YYYY-DD-MM
         *      YYYY-DD-MM h:m A
         *      YYYY-MM-DD
         *      YYYY-MM-DD h:m A
         *
         *      MM/DD/YYYY
         *      MM/DD/YYYY h:m A
         *      DD/MM/YYYY
         *      DD/MM/YYYY h:m A
         *
         *      MM-DD-YYYY
         *      MM-DD-YYYY h:m A
         *      DD-MM-YYYY
         *      DD-MM-YYYY h:m A
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }
            // Determine the separator
            options.format = options.format || 'MM/DD/YYYY';
            var separator = (options.format.indexOf('/') != -1)
                            ? '/'
                            : ((options.format.indexOf('-') != -1) ? '-' : null);
            if (separator == null) {
                return false;
            }

            var month, day, year, minutes = null, hours = null, matches;
            switch (true) {
                case (separator == '/' && (matches = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/i)) && options.format == 'YYYY/DD/MM'):
                case (separator == '-' && (matches = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/i)) && options.format == 'YYYY-DD-MM'):
                    year = matches[1]; day = matches[2]; month = matches[3];
                    break;

                case (separator == '/' && (matches = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/i)) && options.format == 'DD/MM/YYYY'):
                case (separator == '-' && (matches = value.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/i)) && options.format == 'DD-MM-YYYY'):
                    day = matches[1]; month = matches[2]; year = matches[3];
                    break;

                case (separator == '/' && (matches = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/i)) && options.format == 'YYYY/MM/DD'):
                case (separator == '-' && (matches = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/i)) && options.format == 'YYYY-MM-DD'):
                    year = matches[1]; month = matches[2]; day = matches[3];
                    break;

                case (separator == '/' && (matches = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/i)) && options.format == 'MM/DD/YYYY'):
                case (separator == '-' && (matches = value.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/i)) && options.format == 'MM-DD-YYYY'):
                    month = matches[1]; day = matches[2]; year = matches[3];
                    break;

                case (separator == '/' && (matches = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{1,2})\s+(AM|PM)$/i)) && options.format == 'YYYY/DD/MM h:m A'):
                case (separator == '-' && (matches = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{1,2})\s+(AM|PM)$/i)) && options.format == 'YYYY-DD-MM h:m A'):
                    year = matches[1]; day = matches[2]; month = matches[3]; hours = matches[4]; minutes = matches[5];
                    break;

                case (separator == '/' && (matches = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{1,2})\s+(AM|PM)$/i)) && options.format == 'DD/MM/YYYY h:m A'):
                case (separator == '-' && (matches = value.match(/^(\d{1,2})-(\d{1,2})-(\d{4})\s+(\d{1,2}):(\d{1,2})\s+(AM|PM)$/i)) && options.format == 'DD-MM-YYYY h:m A'):
                    day = matches[1]; month = matches[2]; year = matches[3]; hours = matches[4]; minutes = matches[5];
                    break;

                case (separator == '/' && (matches = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{1,2})\s+(AM|PM)$/i)) && options.format == 'YYYY/MM/DD h:m A'):
                case (separator == '-' && (matches = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{1,2})\s+(AM|PM)$/i)) && options.format == 'YYYY-MM-DD h:m A'):
                    year = matches[1]; month = matches[2]; day = matches[3]; hours = matches[4]; minutes = matches[5];
                    break;

                case (separator == '/' && (matches = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{1,2})\s+(AM|PM)$/i)) && options.format == 'MM/DD/YYYY h:m A'):
                case (separator == '-' && (matches = value.match(/^(\d{1,2})-(\d{1,2})-(\d{4})\s+(\d{1,2}):(\d{1,2})\s+(AM|PM)$/i)) && options.format == 'MM-DD-YYYY h:m A'):
                    month = matches[1]; day = matches[2]; year = matches[3]; hours = matches[4]; minutes = matches[5];
                    break;

                default:
                    return false;
            }

            // Validate hours and minutes
            if (hours && minutes) {
                hours   = parseInt(hours, 10);
                minutes = parseInt(minutes, 10);
                if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
                    return false;
                }
            }

            // Validate day, month, and year
            day   = parseInt(day, 10);
            month = parseInt(month, 10);
            year  = parseInt(year, 10);

            if (year < 1000 || year > 9999 || month == 0 || month > 12) {
                return false;
            }

            var numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            // Update the number of days in Feb of leap year
            if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
                numDays[1] = 29;
            }

            // Check the day
            return (day > 0 && day <= numDays[month - 1]);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.different = {
        html5Attributes: {
            message: 'message',
            field: 'field'
        },

        /**
         * Return true if the input value is different with given field's value
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of the following key:
         * - field: The name of field that will be used to compare with current one
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            var compareWith = validator.getFieldElements(options.field);
            if (compareWith == null) {
                return true;
            }

            if (value != compareWith.val()) {
                validator.updateStatus(options.field, validator.STATUS_VALID, 'different');
                return true;
            } else {
                return false;
            }
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.digits = {
        /**
         * Return true if the input value contains digits only
         *
         * @param {BootstrapValidator} validator Validate plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            return /^\d+$/.test(value);
        }
    }
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.emailAddress = {
        enableByHtml5: function($field) {
            return ('email' == $field.attr('type'));
        },

        /**
         * Return true if and only if the input value is a valid email address
         *
         * @param {BootstrapValidator} validator Validate plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            // Email address regular expression
            // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
            var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegExp.test(value);
        }
    }
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.greaterThan = {
        html5Attributes: {
            message: 'message',
            value: 'value',
            inclusive: 'inclusive'
        },

        enableByHtml5: function($field) {
            var min = $field.attr('min');
            if (min) {
                return {
                    value: min
                };
            }

            return false;
        },

        /**
         * Return true if the input value is greater than or equals to given number
         *
         * @param {BootstrapValidator} validator Validate plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - value: The number used to compare to
         * - inclusive [optional]: Can be true or false. Default is true
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }
            value = parseFloat(value);
            return (options.inclusive === true) ? (value > options.value) : (value >= options.value);
        }
    }
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.hex = {
        /**
         * Return true if and only if the input value is a valid hexadecimal number
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            return /^[0-9a-fA-F]+$/.test(value);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.hexColor = {
        enableByHtml5: function($field) {
            return ('color' == $field.attr('type'));
        },

        /**
         * Return true if the input value is a valid hex color
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.iban = {
        html5Attributes: {
            message: 'message',
            country: 'country'
        },

        /**
         * Validate an International Bank Account Number (IBAN)
         * To test it, take the sample IBAN from
         * http://www.nordea.com/Our+services/International+products+and+services/Cash+Management/IBAN+countries/908462.html
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * - country: The ISO 3166-1 country code
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            // See
            // http://www.swift.com/dsp/resources/documents/IBAN_Registry.pdf
            // http://en.wikipedia.org/wiki/International_Bank_Account_Number#IBAN_formats_by_country
            var ibanRegex = {
                'AD': 'AD[0-9]{2}[0-9]{4}[0-9]{4}[A-Z0-9]{12}',                     // Andorra
                'AE': 'AE[0-9]{2}[0-9]{3}[0-9]{16}',                                // United Arab Emirates
                'AL': 'AL[0-9]{2}[0-9]{8}[A-Z0-9]{16}',                             // Albania
                'AO': 'AO[0-9]{2}[0-9]{21}',                                        // Angola
                'AT': 'AT[0-9]{2}[0-9]{5}[0-9]{11}',                                // Austria
                'AZ': 'AZ[0-9]{2}[A-Z]{4}[A-Z0-9]{20}',                             // Azerbaijan
                'BA': 'BA[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{8}[0-9]{2}',                 // Bosnia and Herzegovina
                'BE': 'BE[0-9]{2}[0-9]{3}[0-9]{7}[0-9]{2}',                         // Belgium
                'BF': 'BF[0-9]{2}[0-9]{23}',                                        // Burkina Faso
                'BG': 'BG[0-9]{2}[A-Z]{4}[0-9]{4}[0-9]{2}[A-Z0-9]{8}',              // Bulgaria
                'BH': 'BH[0-9]{2}[A-Z]{4}[A-Z0-9]{14}',                             // Bahrain
                'BI': 'BI[0-9]{2}[0-9]{12}',                                        // Burundi
                'BJ': 'BJ[0-9]{2}[A-Z]{1}[0-9]{23}',                                // Benin
                'BR': 'BR[0-9]{2}[0-9]{8}[0-9]{5}[0-9]{10}[A-Z][A-Z0-9]',           // Brazil
                'CH': 'CH[0-9]{2}[0-9]{5}[A-Z0-9]{12}',                             // Switzerland
                'CI': 'CI[0-9]{2}[A-Z]{1}[0-9]{23}',                                // Ivory Coast
                'CM': 'CM[0-9]{2}[0-9]{23}',                                        // Cameroon
                'CR': 'CR[0-9]{2}[0-9]{3}[0-9]{14}',                                // Costa Rica
                'CV': 'CV[0-9]{2}[0-9]{21}',                                        // Cape Verde
                'CY': 'CY[0-9]{2}[0-9]{3}[0-9]{5}[A-Z0-9]{16}',                     // Cyprus
                'CZ': 'CZ[0-9]{2}[0-9]{20}',                                        // Czech Republic
                'DE': 'DE[0-9]{2}[0-9]{8}[0-9]{10}',                                // Germany
                'DK': 'DK[0-9]{2}[0-9]{14}',                                        // Denmark
                'DO': 'DO[0-9]{2}[A-Z0-9]{4}[0-9]{20}',                             // Dominican Republic
                'DZ': 'DZ[0-9]{2}[0-9]{20}',                                        // Algeria
                'EE': 'EE[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{11}[0-9]{1}',                // Estonia
                'ES': 'ES[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{1}[0-9]{1}[0-9]{10}',        // Spain
                'FI': 'FI[0-9]{2}[0-9]{6}[0-9]{7}[0-9]{1}',                         // Finland
                'FO': 'FO[0-9]{2}[0-9]{4}[0-9]{9}[0-9]{1}',                         // Faroe Islands
                'FR': 'FR[0-9]{2}[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}',             // France
                'GB': 'GB[0-9]{2}[A-Z]{4}[0-9]{6}[0-9]{8}',                         // United Kingdom
                'GE': 'GE[0-9]{2}[A-Z]{2}[0-9]{16}',                                // Georgia
                'GI': 'GI[0-9]{2}[A-Z]{4}[A-Z0-9]{15}',                             // Gibraltar
                'GL': 'GL[0-9]{2}[0-9]{4}[0-9]{9}[0-9]{1}',                         // Greenland[
                'GR': 'GR[0-9]{2}[0-9]{3}[0-9]{4}[A-Z0-9]{16}',                     // Greece
                'GT': 'GT[0-9]{2}[A-Z0-9]{4}[A-Z0-9]{20}',                          // Guatemala
                'HR': 'HR[0-9]{2}[0-9]{7}[0-9]{10}',                                // Croatia
                'HU': 'HU[0-9]{2}[0-9]{3}[0-9]{4}[0-9]{1}[0-9]{15}[0-9]{1}',        // Hungary
                'IE': 'IE[0-9]{2}[A-Z]{4}[0-9]{6}[0-9]{8}',                         // Ireland
                'IL': 'IL[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{13}',                        // Israel
                'IR': 'IR[0-9]{2}[0-9]{22}',                                        // Iran
                'IS': 'IS[0-9]{2}[0-9]{4}[0-9]{2}[0-9]{6}[0-9]{10}',                // Iceland
                'IT': 'IT[0-9]{2}[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}',             // Italy
                'JO': 'JO[0-9]{2}[A-Z]{4}[0-9]{4}[0]{8}[A-Z0-9]{10}',               // Jordan
                'KW': 'KW[0-9]{2}[A-Z]{4}[0-9]{22}',                                // Kuwait
                'KZ': 'KZ[0-9]{2}[0-9]{3}[A-Z0-9]{13}',                             // Kazakhstan
                'LB': 'LB[0-9]{2}[0-9]{4}[A-Z0-9]{20}',                             // Lebanon
                'LI': 'LI[0-9]{2}[0-9]{5}[A-Z0-9]{12}',                             // Liechtenstein
                'LT': 'LT[0-9]{2}[0-9]{5}[0-9]{11}',                                // Lithuania
                'LU': 'LU[0-9]{2}[0-9]{3}[A-Z0-9]{13}',                             // Luxembourg
                'LV': 'LV[0-9]{2}[A-Z]{4}[A-Z0-9]{13}',                             // Latvia
                'MC': 'MC[0-9]{2}[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}',             // Monaco
                'MD': 'MD[0-9]{2}[A-Z0-9]{20}',                                     // Moldova
                'ME': 'ME[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}',                        // Montenegro
                'MG': 'MG[0-9]{2}[0-9]{23}',                                        // Madagascar
                'MK': 'MK[0-9]{2}[0-9]{3}[A-Z0-9]{10}[0-9]{2}',                     // Macedonia
                'ML': 'ML[0-9]{2}[A-Z]{1}[0-9]{23}',                                // Mali
                'MR': 'MR13[0-9]{5}[0-9]{5}[0-9]{11}[0-9]{2}',                      // Mauritania
                'MT': 'MT[0-9]{2}[A-Z]{4}[0-9]{5}[A-Z0-9]{18}',                     // Malta
                'MU': 'MU[0-9]{2}[A-Z]{4}[0-9]{2}[0-9]{2}[0-9]{12}[0-9]{3}[A-Z]{3}',// Mauritius
                'MZ': 'MZ[0-9]{2}[0-9]{21}',                                        // Mozambique
                'NL': 'NL[0-9]{2}[A-Z]{4}[0-9]{10}',                                // Netherlands
                'NO': 'NO[0-9]{2}[0-9]{4}[0-9]{6}[0-9]{1}',                         // Norway
                'PK': 'PK[0-9]{2}[A-Z]{4}[A-Z0-9]{16}',                             // Pakistan
                'PL': 'PL[0-9]{2}[0-9]{8}[0-9]{16}',                                // Poland
                'PS': 'PS[0-9]{2}[A-Z]{4}[A-Z0-9]{21}',                             // Palestinian
                'PT': 'PT[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{11}[0-9]{2}',                // Portugal
                'QA': 'QA[0-9]{2}[A-Z]{4}[A-Z0-9]{21}',                             // Qatar
                'RO': 'RO[0-9]{2}[A-Z]{4}[A-Z0-9]{16}',                             // Romania
                'RS': 'RS[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}',                        // Serbia
                'SA': 'SA[0-9]{2}[0-9]{2}[A-Z0-9]{18}',                             // Saudi Arabia
                'SE': 'SE[0-9]{2}[0-9]{3}[0-9]{16}[0-9]{1}',                        // Sweden
                'SI': 'SI[0-9]{2}[0-9]{5}[0-9]{8}[0-9]{2}',                         // Slovenia
                'SK': 'SK[0-9]{2}[0-9]{4}[0-9]{6}[0-9]{10}',                        // Slovakia
                'SM': 'SM[0-9]{2}[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}',             // San Marino
                'SN': 'SN[0-9]{2}[A-Z]{1}[0-9]{23}',                                // Senegal
                'TN': 'TN59[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}',                      // Tunisia
                'TR': 'TR[0-9]{2}[0-9]{5}[A-Z0-9]{1}[A-Z0-9]{16}',                  // Turkey
                'VG': 'VG[0-9]{2}[A-Z]{4}[0-9]{16}'                                 // Virgin Islands, British
            };
            value = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            var country = options.country || value.substr(0, 2);
            if (!ibanRegex[country]) {
                return false;
            }
            if (!(new RegExp('^' + ibanRegex[country] + '$')).test(value)) {
                return false;
            }

            value = value.substr(4) + value.substr(0, 4);
            value = value.split('').map(function(n) {
                var code = n.charCodeAt(0);
                return (code >= 'A'.charCodeAt(0) && code <= 'Z'.charCodeAt(0))
                    // Replace A, B, C, ..., Z with 10, 11, ..., 35
                    ? (code - 'A'.charCodeAt(0) + 10)
                    : n;
            }).join('');

            var temp   = parseInt(value.substr(0, 1), 10),
                length = value.length;
            for (var i = 1; i < length; ++i) {
                temp = (temp * 10 + parseInt(value.substr(i, 1), 10)) % 97;
            }
            return (temp == 1);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.identical = {
        html5Attributes: {
            message: 'message',
            field: 'field'
        },

        /**
         * Check if input value equals to value of particular one
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of the following key:
         * - field: The name of field that will be used to compare with current one
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            var compareWith = validator.getFieldElements(options.field);
            if (compareWith == null) {
                return true;
            }

            if (value == compareWith.val()) {
                validator.updateStatus(options.field, validator.STATUS_VALID, 'identical');
                return true;
            } else {
                return false;
            }
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.integer = {
        enableByHtml5: function($field) {
            return ('number' == $field.attr('type'));
        },

        /**
         * Return true if the input value is an integer
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following key:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }
            return /^(?:-?(?:0|[1-9][0-9]*))$/.test(value);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.ip = {
        html5Attributes: {
            message: 'message',
            ipv4: 'ipv4',
            ipv6: 'ipv6'
        },

        /**
         * Return true if the input value is a IP address.
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - ipv4: Enable IPv4 validator, default to true
         * - ipv6: Enable IPv6 validator, default to true
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }
            options = $.extend({}, { ipv4: true, ipv6: true }, options);

            if (options.ipv4) {
                return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
            } else if (options.ipv6) {
                return /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(str);
            }
            return false;
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.isbn = {
        /**
         * Return true if the input value is a valid ISBN 10 or ISBN 13 number
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            // Replace all special characters except digits and X
            value = value.replace(/[^\dX]/gi, '');
            var chars = value.split(''),
                sum   = 0,
                checksum;

            // See http://en.wikipedia.org/wiki/International_Standard_Book_Number
            switch (chars.length) {
                // ISBN 10
                case 10:
                    sum = 0;
                    for (var i = 0; i < 9; i++) {
                        sum += ((10 - i) * parseInt(chars[i]));
                    }
                    checksum = 11 - (sum % 11);
                    if (checksum == 11) {
                        checksum = 0;
                    } else if (checksum == 10) {
                        checksum = 'X';
                    }
                    return (checksum == chars[9]);

                // ISBN 13
                case 13:
                    sum = 0;
                    for (var i = 0; i < 12; i++) {
                        sum += ((i % 2 == 0) ? parseInt(chars[i]) : (parseInt(chars[i]) * 3));
                    }
                    checksum = 10 - (sum % 10);
                    if (checksum == 10) {
                        checksum = '0';
                    }
                    return (checksum == chars[12]);

                default:
                    return false;
            }
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.lessThan = {
        html5Attributes: {
            message: 'message',
            value: 'value',
            inclusive: 'inclusive'
        },

        enableByHtml5: function($field) {
            var max = $field.attr('max');
            if (max) {
                return {
                    value: max
                };
            }

            return false;
        },

        /**
         * Return true if the input value is less than or equal to given number
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - value: The number used to compare to
         * - inclusive [optional]: Can be true or false. Default is true
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }
            value = parseFloat(value);
            return (options.inclusive === false) ? (value <= options.value) : (value < options.value);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.mac = {
        /**
         * Return true if the input value is a MAC address.
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            return /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(value);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.notEmpty = {
        enableByHtml5: function($field) {
            var required = $field.attr('required') + '';
            return ('required' == required || 'true' == required);
        },

        /**
         * Check if input value is empty or not
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var type = $field.attr('type');
            if ('radio' == type || 'checkbox' == type) {
                return validator
                            .getFieldElements($field.attr('data-bv-field'))
                            .filter(':checked')
                            .length > 0;
            }

            return $.trim($field.val()) != '';
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.numeric = {
        /**
         * Validate decimal number
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            return !isNaN(parseFloat(value)) && isFinite(value);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.phone = {
        html5Attributes: {
            message: 'message',
            country: 'country'
        },

        /**
         * Return true if the input value contains a valid US phone number only
         *
         * @param {BootstrapValidator} validator Validate plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * - country: The ISO 3166 country code
         * Currently it only supports United State (US) country
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            var country = (options.country || 'US').toUpperCase();
            switch (country) {
                case 'US':
                default:
                    // Make sure US phone numbers have 10 digits
                    value = value.replace(/\(|\)|\s+/g, '');
                    return (/^(?:1\-?)?(\d{3})[\-\.]?(\d{3})[\-\.]?(\d{4})$/).test(value) && (value.length == 10);
            }
        }
    }
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.regexp = {
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
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of the following key:
         * - regexp: The regular expression you need to check
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            var regexp = ('string' == typeof options.regexp) ? new RegExp(options.regexp) : options.regexp;
            return regexp.test(value);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.remote = {
        html5Attributes: {
            message: 'message',
            url: 'url'
        },

        /**
         * Request a remote server to check the input value
         *
         * @param {BootstrapValidator} validator Plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - url
         * - data [optional]: By default, it will take the value
         *  {
         *      <fieldName>: <fieldValue>
         *  }
         * - message: The invalid message
         * @returns {Boolean|Deferred}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            var name = $field.attr('data-bv-field'), data = options.data;
            if (data == null) {
                data = {};
            }
            // Support dynamic data
            if ('function' == typeof data) {
                data = data.call(this, validator);
            }
            data[name] = value;

            var dfd = new $.Deferred();
            var xhr = $.ajax({
                type: 'POST',
                url: options.url,
                dataType: 'json',
                data: data
            });
            xhr.then(function(response) {
                dfd.resolve($field, 'remote', response.valid === true || response.valid === 'true');
            });

            dfd.fail(function() {
                xhr.abort();
            });

            return dfd;
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.step = {
        html5Attributes: {
            message: 'message',
            base: 'baseValue',
            step: 'step'
        },

        /**
         * Return true if the input value is valid step one
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - baseValue: The base value
         * - step: The step
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            options = $.extend({}, { baseValue: 0, step: 1 }, options);
            value   = parseFloat(value);
            if (isNaN(value) || !isFinite(value)) {
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
                    if (y == 0.0) {
                        return 1.0;
                    }
                    var dotX      = (x + '').split('.'),
                        dotY      = (y + '').split('.'),
                        precision = ((dotX.length == 1) ? 0 : dotX[1].length) + ((dotY.length == 1) ? 0 : dotY[1].length);
                    return round(x - y * Math.floor(x / y), precision);
                };

            var mod = floatMod(value - options.baseValue, options.step);
            return (mod == 0.0 || mod == options.step);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.stringCase = {
        html5Attributes: {
            message: 'message',
            'case': 'case'
        },

        /**
         * Check if a string is a lower or upper case one
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * - case: Can be 'lower' (default) or 'upper'
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            var stringCase = (options['case'] || 'lower').toLowerCase();
            switch (stringCase) {
                case 'upper':
                    return value === value.toUpperCase();
                case 'lower':
                default:
                    return value === value.toLowerCase();
            }
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.stringLength = {
        html5Attributes: {
            message: 'message',
            min: 'min',
            max: 'max'
        },

        enableByHtml5: function($field) {
            var maxLength = $field.attr('maxlength');
            if (maxLength) {
                return {
                    max: parseInt(maxLength, 10)
                };
            }

            return false;
        },

        /**
         * Check if the length of element value is less or more than given number
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of following keys:
         * - min
         * - max
         * At least one of two keys is required
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            var length = $.trim(value).length;
            if ((options.min && length < options.min) || (options.max && length > options.max)) {
                return false;
            }

            return true;
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.uri = {
        enableByHtml5: function($field) {
            return ('url' == $field.attr('type'));
        },

        /**
         * Return true if the input value is a valid URL
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
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
            // - TLDs have been made mandatory so single names like "localhost" fails
            // - protocols have been restricted to ftp, http and https only as requested
            //
            // Changes:
            //
            // - IP address dotted notation validation, range: 1.0.0.0 - 223.255.255.255
            //   first and last IP address of each class is considered invalid
            //   (since they are broadcast/network addresses)
            //
            // - Added exclusion of private, reserved and/or local networks ranges
            //
            // Compressed one-line versions:
            //
            // Javascript version
            //
            // /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i
            //
            // PHP version
            //
            // _^(?:(?:https?|ftp)://)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}-\x{ffff}0-9]+-?)*[a-z\x{00a1}-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}-\x{ffff}0-9]+-?)*[a-z\x{00a1}-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}-\x{ffff}]{2,})))(?::\d{2,5})?(?:/[^\s]*)?$_iuS
            var urlExp = new RegExp(
                "^" +
                // protocol identifier
                "(?:(?:https?|ftp)://)" +
                // user:pass authentication
                "(?:\\S+(?::\\S*)?@)?" +
                "(?:" +
                // IP address exclusion
                // private & local networks
                "(?!10(?:\\.\\d{1,3}){3})" +
                "(?!127(?:\\.\\d{1,3}){3})" +
                "(?!169\\.254(?:\\.\\d{1,3}){2})" +
                "(?!192\\.168(?:\\.\\d{1,3}){2})" +
                "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
                // IP address dotted notation octets
                // excludes loopback network 0.0.0.0
                // excludes reserved space >= 224.0.0.0
                // excludes network & broacast addresses
                // (first & last IP address of each class)
                "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
                "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
                "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
                "|" +
                // host name
                "(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)" +
                // domain name
                "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*" +
                // TLD identifier
                "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
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
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.uuid = {
        html5Attributes: {
            message: 'message',
            version: 'version'
        },

        /**
         * Return true if and only if the input value is a valid UUID string
         *
         * @see http://en.wikipedia.org/wiki/Universally_unique_identifier
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * - version: Can be 3, 4, 5, null
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            // See the format at http://en.wikipedia.org/wiki/Universally_unique_identifier#Variants_and_versions
            var patterns = {
                    '3': /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
                    '4': /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
                    '5': /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
                    all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
                },
                version = options.version ? (options.version + '') : 'all';
            return (null == patterns[version]) ? true : patterns[version].test(value);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.zipCode = {
        html5Attributes: {
            message: 'message',
            country: 'country'
        },

        /**
         * Return true if and only if the input value is a valid country zip code
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * - country: The ISO 3166 country code
         *
         * Currently it supports the following countries:
         * - US (United State)
         * - DK (Denmark)
         * - SE (Sweden)
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '' || !options.country) {
                return true;
            }

            options.country = options.country || 'US';
            switch (options.country.toUpperCase()) {
                case 'DK':
                    return /^(DK(-|\s)?)?\d{4}$/i.test(value);
                case 'SE':
                    return /^(S-)?\d{3}\s?\d{2}$/i.test(value);
                case 'US':
                default:
                    return /^\d{5}([\-]\d{4})?$/.test(value);
            }
        }
    };
}(window.jQuery));
