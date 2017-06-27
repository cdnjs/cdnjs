/**
 * BootstrapValidator (http://bootstrapvalidator.com)
 *
 * A jQuery plugin to validate form fields. Use with Bootstrap 3
 *
 * @version     v0.4.4
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
        // Get IE version
        // https://gist.github.com/padolsey/527683/#comment-7595
        var ieVersion = (function() {
            var v = 3, div = document.createElement('div'), a = div.all || [];
            while (div.innerHTML = '<!--[if gt IE '+(++v)+']><br><![endif]-->', a[0]);
            return v > 4 ? v : !v;
        }());

        var el = document.createElement('div');
        this._changeEvent = (ieVersion === 9 || !('oninput' in el)) ? 'keyup' : 'input';

        // The flag to indicate that the form is ready to submit when a remote/callback validator returns
        this._submitIfValid = null;

        this._init();
    };

    // The default options
    BootstrapValidator.DEFAULT_OPTIONS = {
        // The form CSS class
        elementClass: 'bv-form',

        // Default invalid message
        message: 'This value is not valid',

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
                    excluded:       this.$form.attr('data-bv-excluded'),
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
            if ('string' == typeof this.options.excluded) {
                this.options.excluded = $.map(this.options.excluded.split(','), function(item) {
                    // Trim the spaces
                    return $.trim(item);
                });
            }

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
                if (this.options.fields[field].selector) {
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
                            .attr('data-bv-validator-for', field)
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
                    // Activate the tab containing the invalid field if exists
                    var $tab = this.$invalidField.parents('.tab-pane'),
                        tabId;
                    if ($tab && (tabId = $tab.attr('id'))) {
                        $('a[href="#' + tabId + '"][data-toggle="tab"]').trigger('click.bs.tab.data-api');
                    }

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

        /**
         * Check if the field is excluded.
         * Returning true means that the field will not be validated
         *
         * @param {jQuery} $field The field element
         * @return {Boolean}
         */
        _isExcluded: function($field) {
            if (this.options.excluded) {
                for (var i in this.options.excluded) {
                    if (('string' == typeof this.options.excluded[i] && $field.is(this.options.excluded[i]))
                        || ('function' == typeof this.options.excluded[i] && this.options.excluded[i].call(this, $field, this) == true))
                    {
                        return true;
                    }
                }
            }

            return false;
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

            if (!this.options.fields[field]['enabled'] || this._isExcluded($field)) {
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
            var that     = this,
                field    = $field.attr('data-bv-field'),
                $parent  = $field.parents('.form-group'),
                $message = $field.data('bv.messages'),
                $errors  = $message.find('.help-block[data-bv-validator]'),
                $icon    = $parent.find('.form-control-feedback[data-bv-field="' + field + '"]');

            // Update status
            if (validatorName) {
                $field.data('bv.result.' + validatorName, status);
            } else {
                for (var v in this.options.fields[field].validators) {
                    $field.data('bv.result.' + v, status);
                }
            }

            // Determine the tab containing the element
            var $tabPane = $field.parents('.tab-pane'),
                tabId,
                $tab;
            if ($tabPane && (tabId = $tabPane.attr('id'))) {
                $tab = $('a[href="#' + tabId + '"][data-toggle="tab"]').parent();
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
                    if ($tab) {
                        $tab.removeClass('bv-tab-success').removeClass('bv-tab-error');
                    }
                    break;

                case this.STATUS_INVALID:
                    this.disableSubmitButtons(true);
                    $parent.removeClass('has-success').addClass('has-error');
                    validatorName ? $errors.filter('[data-bv-validator="' + validatorName + '"]').show() : $errors.show();
                    if ($icon) {
                        $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.validating).addClass(this.options.feedbackIcons.invalid).show();
                    }
                    if ($tab) {
                        $tab.removeClass('bv-tab-success').addClass('bv-tab-error');
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

                    // Check if all elements in given container are valid
                    var isValidContainer = function($container) {
                        return $container
                                    .find('.help-block[data-bv-validator]')
                                    .filter(function() {
                                        var display = $(this).css('display'), v = $(this).attr('data-bv-validator');
                                        return ('block' == display) || ($field.data('bv.result.' + v) && $field.data('bv.result.' + v) != that.STATUS_VALID);
                                    })
                                    .length == 0;
                    };
                    $parent.removeClass('has-error has-success').addClass(isValidContainer($parent) ? 'has-success' : 'has-error');
                    if ($tab) {
                        $tab.removeClass('bv-tab-success').removeClass('bv-tab-error').addClass(isValidContainer($tabPane) ? 'bv-tab-success' : 'bv-tab-error');
                    }
                    break;

                case this.STATUS_NOT_VALIDATED:
                default:
                    this.disableSubmitButtons(false);
                    $parent.removeClass('has-success').removeClass('has-error');
                    validatorName ? $errors.filter('.help-block[data-bv-validator="' + validatorName + '"]').hide() : $errors.hide();
                    if ($icon) {
                        $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).hide();
                    }
                    if ($tab) {
                        $tab.removeClass('bv-tab-success').removeClass('bv-tab-error');
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
                    if (this._isExcluded($field)) {
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
    $.fn.bootstrapValidator = function(option, params) {
        return this.each(function() {
            var $this   = $(this),
                data    = $this.data('bootstrapValidator'),
                options = 'object' == typeof option && option;
            if (!data) {
                data = new BootstrapValidator(this, options);
                $this.data('bootstrapValidator', data);
            }

            // Allow to call plugin method
            if ('string' == typeof option) {
                data[option](params);
            }
        });
    };

    // Available validators
    $.fn.bootstrapValidator.validators = {};

    $.fn.bootstrapValidator.Constructor = BootstrapValidator;

    // Helper methods, which can be used in validator class
    $.fn.bootstrapValidator.helpers = {
        /**
         * Implement Luhn validation algorithm ((http://en.wikipedia.org/wiki/Luhn))
         * Credit to https://gist.github.com/ShirtlessKirk/2134376
         *
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
        mod_11_10: function(value) {
            var check  = 5,
                length = value.length;
            for (var i = 0; i < length; i++) {
                check = (((check || 10) * 2) % 11 + parseInt(value.charAt(i), 10)) % 10;
            }
            return (check == 1);
        },

        /**
         * Implements Mod 37, 36 (ISO 7064) algorithm
         * Usages:
         * mod_37_36('A12425GABC1234002M')
         * mod_37_36('002006673085', '0123456789')
         *
         * @param {String} value
         * @param {String} alphabet
         * @returns {Boolean}
         */
        mod_37_36: function(value, alphabet) {
            alphabet = alphabet || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var modulus = alphabet.length,
                length  = value.length,
                check   = Math.floor(modulus / 2);
            for (var i = 0; i < length; i++) {
                check = (((check || modulus) * 2) % (modulus + 1) + alphabet.indexOf(value.charAt(i))) % modulus;
            }
            return (check == 1);
        }
    };
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
            var numChoices = $field.is('select')
                            ? validator.getFieldElements($field.attr('data-bv-field')).find('option').filter(':selected').length
                            : validator.getFieldElements($field.attr('data-bv-field')).filter(':checked').length;
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

            if (!$.fn.bootstrapValidator.helpers.luhn(value)) {
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
         * - message: The invalid message
         * - format: The date format. Default is MM/DD/YYYY
         * The format can be:
         *
         * i) date: Consist of DD, MM, YYYY parts which are separated by /
         * ii) date and time:
         * The time can consist of h, m, s parts which are separated by :
         * ii) date, time and A (indicating AM or PM)
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            options.format = options.format || 'MM/DD/YYYY';

            var formats    = options.format.split(' '),
                dateFormat = formats[0],
                timeFormat = (formats.length > 1) ? formats[1] : null,
                amOrPm     = (formats.length > 2) ? formats[2] : null,
                sections   = value.split(' '),
                date       = sections[0],
                time       = (sections.length > 1) ? sections[1] : null;

            if (formats.length != sections.length) {
                return false;
            }

            // Determine the separator
            var separator = (date.indexOf('/') != -1) ? '/' : ((date.indexOf('-') != -1) ? '-' : null);
            if (separator == null) {
                return false;
            }

            // Determine the date
            date       = date.split(separator);
            dateFormat = dateFormat.split(separator);
            var year  = date[dateFormat.indexOf('YYYY')],
                month = date[dateFormat.indexOf('MM')],
                day   = date[dateFormat.indexOf('DD')];

            // Determine the time
            var minutes = null, hours = null, seconds = null;
            if (timeFormat) {
                timeFormat = timeFormat.split(':'),
                time       = time.split(':');

                if (timeFormat.length != time.length) {
                    return false;
                }

                hours   = time.length > 0 ? time[0] : null;
                minutes = time.length > 1 ? time[1] : null;
                seconds = time.length > 2 ? time[2] : null;

                // Validate seconds
                if (seconds) {
                    seconds = parseInt(seconds, 10);
                    if (seconds < 0 || seconds > 60) {
                        return false;
                    }
                }

                // Validate hours
                if (hours) {
                    hours = parseInt(hours, 10);
                    if (hours < 0 || hours >= 24 || (amOrPm && hours > 12)) {
                        return false;
                    }
                }

                // Validate minutes
                if (minutes) {
                    minutes = parseInt(minutes, 10);
                    if (minutes < 0 || minutes > 59) {
                        return false;
                    }
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
    $.fn.bootstrapValidator.validators.ean = {
        /**
         * Validate EAN (International Article Number)
         * Examples:
         * - Valid: 73513537, 9780471117094, 4006381333931
         * - Invalid: 73513536
         *
         * @see http://en.wikipedia.org/wiki/European_Article_Number
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

            if (!/^(\d{8}|\d{12}|\d{13})$/.test(value)) {
                return false;
            }

            var length = value.length,
                sum    = 0,
                weight = (length == 8) ? [3, 1] : [1, 3];
            for (var i = 0; i < length - 1; i++) {
                sum += parseInt(value.charAt(i)) * weight[i % 2];
            }
            sum = 10 - sum % 10;
            return (sum == value.charAt(length - 1));
        }
    };
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
    $.fn.bootstrapValidator.validators.file = {
        html5Attributes: {
            extension: 'extension',
            maxsize: 'maxSize',
            message: 'message',
            type: 'type'
        },

        /**
         * Validate upload file. Use HTML 5 API if the browser supports
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - extension: The allowed extensions, separated by a comma
         * - maxSize: The maximum size in bytes
         * - message: The invalid message
         * - type: The allowed MIME type, separated by a comma
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            var ext,
                extensions = options.extension ? options.extension.split(',') : null,
                types      = options.type      ? options.type.split(',')      : null,
                html5      = (window.File && window.FileList && window.FileReader);

            if (html5) {
                // Get FileList instance
                var files = $field.get(0).files,
                    total = files.length;
                for (var i = 0; i < total; i++) {
                    // Check file size
                    if (options.maxSize && files[i].size > parseInt(options.maxSize)) {
                        return false;
                    }

                    // Check file extension
                    ext = files[i].name.substr(files[i].name.lastIndexOf('.') + 1);
                    if (extensions && extensions.indexOf(ext) == -1) {
                        return false;
                    }

                    // Check file type
                    if (types && types.indexOf(files[i].type) == -1) {
                        return false;
                    }
                }
            } else {
                // Check file extension
                ext = value.substr(value.lastIndexOf('.') + 1);
                if (extensions && extensions.indexOf(ext) == -1) {
                    return false;
                }
            }

            return true;
        }
    };
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
    $.fn.bootstrapValidator.validators.grid = {
        /**
         * Validate GRId (Global Release Identifier)
         * Examples:
         * - Valid: A12425GABC1234002M, A1-2425G-ABC1234002-M, A1 2425G ABC1234002 M, Grid:A1-2425G-ABC1234002-M
         * - Invalid: A1-2425G-ABC1234002-Q
         *
         * @see http://en.wikipedia.org/wiki/Global_Release_Identifier
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

            value = value.toUpperCase();
            if (!/^[GRID:]*([0-9A-Z]{2})[-\s]*([0-9A-Z]{5})[-\s]*([0-9A-Z]{10})[-\s]*([0-9A-Z]{1})$/g.test(value)) {
                return false;
            }
            value = value.replace(/\s/g, '').replace(/-/g, '');
            if ('GRID:' == value.substr(0, 5)) {
                value = value.substr(5);
            }
            return $.fn.bootstrapValidator.helpers.mod_37_36(value);
        }
    };
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
    $.fn.bootstrapValidator.validators.imei = {
        /**
         * Validate IMEI (International Mobile Station Equipment Identity)
         * Examples:
         * - Valid: 35-209900-176148-1, 35-209900-176148-23, 3568680000414120, 490154203237518
         * - Invalid: 490154203237517
         *
         * @see http://en.wikipedia.org/wiki/International_Mobile_Station_Equipment_Identity
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

            switch (true) {
                case /^\d{15}$/.test(value):
                case /^\d{2}-\d{6}-\d{6}-\d{1}$/.test(value):
                case /^\d{2}\s\d{6}\s\d{6}\s\d{1}$/.test(value):
                    value = value.replace(/[^0-9]/g, '');
                    return $.fn.bootstrapValidator.helpers.luhn(value);
                    break;

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
         * Examples:
         * - Valid:
         * ISBN 10: 99921-58-10-7, 9971-5-0210-0, 960-425-059-0, 80-902734-1-6, 85-359-0277-5, 1-84356-028-3, 0-684-84328-5, 0-8044-2957-X, 0-85131-041-9, 0-943396-04-2, 0-9752298-0-X
         * ISBN 13: 978-0-306-40615-7
         * - Invalid:
         * ISBN 10: 99921-58-10-6
         * ISBN 13: 978-0-306-40615-6
         *
         * @see http://en.wikipedia.org/wiki/International_Standard_Book_Number
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

            // http://en.wikipedia.org/wiki/International_Standard_Book_Number#Overview
            // Groups are separated by a hyphen or a space
            var type;
            switch (true) {
                case /^\d{9}[\dX]$/.test(value):
                case (value.length == 13 && /^(\d+)-(\d+)-(\d+)-([\dX])$/.test(value)):
                case (value.length == 13 && /^(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(value)):
                    type = 'ISBN10';
                    break;
                case /^(978|979)\d{9}[\dX]$/.test(value):
                case (value.length == 17 && /^(978|979)-(\d+)-(\d+)-(\d+)-([\dX])$/.test(value)):
                case (value.length == 17 && /^(978|979)\s(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(value)):
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
                checksum;

            switch (type) {
                case 'ISBN10':
                    sum = 0;
                    for (var i = 0; i < length - 1; i++) {
                        sum += ((10 - i) * parseInt(chars[i]));
                    }
                    checksum = 11 - (sum % 11);
                    if (checksum == 11) {
                        checksum = 0;
                    } else if (checksum == 10) {
                        checksum = 'X';
                    }
                    return (checksum + '' == chars[length - 1]);

                case 'ISBN13':
                    sum = 0;
                    for (var i = 0; i < length - 1; i++) {
                        sum += ((i % 2 == 0) ? parseInt(chars[i]) : (parseInt(chars[i]) * 3));
                    }
                    checksum = 10 - (sum % 10);
                    if (checksum == 10) {
                        checksum = '0';
                    }
                    return (checksum + '' == chars[length - 1]);

                default:
                    return false;
            }
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.ismn = {
        /**
         * Validate ISMN (International Standard Music Number)
         * Examples:
         * - Valid: M230671187, 979-0-0601-1561-5, 979 0 3452 4680 5, 9790060115615
         * - Invalid: 9790060115614
         *
         * @see http://en.wikipedia.org/wiki/International_Standard_Music_Number
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

            if ('ISMN10' == type) {
                value = '9790' + value.substr(1);
            }

            // Replace all special characters except digits
            value = value.replace(/[^0-9]/gi, '');
            var length = value.length,
                sum    = 0,
                weight = [1, 3];
            for (var i = 0; i < length - 1; i++) {
                sum += parseInt(value.charAt(i)) * weight[i % 2];
            }
            sum = 10 - sum % 10;
            return (sum == value.charAt(length - 1));
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.issn = {
        /**
         * Validate ISSN (International Standard Serial Number)
         * Examples:
         * - Valid: 0378-5955, 0024-9319, 0032-1478
         * - Invalid: 0032-147X
         *
         * @see http://en.wikipedia.org/wiki/International_Standard_Serial_Number
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

            // Groups are separated by a hyphen or a space
            if (!/^\d{4}\-\d{3}[\dX]$/.test(value)) {
                return false;
            }

            // Replace all special characters except digits and X
            value = value.replace(/[^0-9X]/gi, '');
            var chars  = value.split(''),
                length = chars.length,
                sum    = 0;

            if (chars[7] == 'X') {
                chars[7] = 10;
            }
            for (var i = 0; i < length; i++) {
                sum += ((8 - i) * parseInt(chars[i]));
            }
            return (sum % 11 == 0);
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
                    // May start with 1, +1, or 1-; should discard
                    // Area code may be delimited with (), & sections may be delimited with . or -
                    // Test: http://regexr.com/38mqi
                    value = value.replace(/\D/g, '');
                    return (/^(?:(1\-?)|(\+1 ?))?\(?(\d{3})[\)\-\.]?(\d{3})[\-\.]?(\d{4})$/).test(value) && (value.length == 10);
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
;(function ($) {
    $.fn.bootstrapValidator.validators.remote = {
        html5Attributes: {
            message: 'message',
            url: 'url',
            name: 'name'
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
         * - name [optional]: Override the field name for the request.
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
            data[options.name || name] = value;

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
	$.fn.bootstrapValidator.validators.siren = {
		/**
		 * Check if a string is a siren number
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

            if (!/^\d{9}$/.test(value)) {
                return false;
            }
            return $.fn.bootstrapValidator.helpers.luhn(value);
		}
	};
}(window.jQuery));
;(function($) {
	$.fn.bootstrapValidator.validators.siret = {
        /**
         * Check if a string is a siret number
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

			var sum    = 0,
                length = value.length,
                tmp;
			for (var i = 0; i < length; i++) {
                tmp = parseInt(value.charAt(i), 10);
				if ((i % 2) == 0) {
					tmp = tmp * 2;
					if (tmp > 9) {
						tmp -= 9;
					}
				}
				sum += tmp;
			}
			return (sum % 10 == 0);
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
    $.fn.bootstrapValidator.validators.vat = {
        html5Attributes: {
            message: 'message',
            country: 'country'
        },

        /**
         * Validate an European VAT number
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * - country: The ISO 3166-1 country code
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            var country = options.country || value.substr(0, 2),
                method  = ['_', country.toLowerCase()].join('');
            if (this[method] && 'function' == typeof this[method]) {
                return this[method](value);
            }

            return true;
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
            if (!/^ATU[0-9]{8}$/.test(value)) {
                return false;
            }

            value = value.substr(3);
            var sum    = 0,
                weight = [1, 2, 1, 2, 1, 2, 1],
                temp   = 0;

            for (var i = 0; i < 7; i++) {
                temp = parseInt(value.charAt(i)) * weight[i];
                if (temp > 9) {
                    temp = Math.floor(temp / 10) + temp % 10;
                }
                sum += temp;
            }

            sum = 10 - (sum + 4) % 10;
            if (sum == 10) {
                sum = 0;
            }

            return (sum == value.substr(7, 1));
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
            if (!/^BE[0]{0,1}[0-9]{9}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            if (value.length == 9) {
                value = '0' + value;
            }

            if (value.substr(1, 1) == 0) {
                return false;
            }

            var sum = parseInt(value.substr(0, 8), 10) + parseInt(value.substr(8, 2), 10);
            return (sum % 97 == 0);
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
            if (!/^BG[0-9]{9,10}$/.test(value)) {
                return false;
            }

            value = value.substr(2);

            var total = 0, sum = 0, weight = [], i = 0;

            // Legal entities
            if (value.length == 9) {
                for (i = 0; i < 8; i++) {
                    sum += parseInt(value.charAt(i)) * (i + 1);
                }
                sum = sum % 11;
                if (sum == 10) {
                    sum = 0;
                    for (i = 0; i < 8; i++) {
                        sum += parseInt(value.charAt(i)) * (i + 3);
                    }
                }
                sum = sum % 10;
                return (sum == value.substr(8));
            }
            // Physical persons, foreigners and others
            else if (value.length == 10) {
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

                        try {
                            var d = new Date(year, month, day);
                        } catch (ex) {
                            return false;
                        }

                        var sum    = 0,
                            weight = [2, 4, 8, 5, 10, 9, 7, 3, 6];
                        for (var i = 0; i < 9; i++) {
                            sum += parseInt(value.charAt(i)) * weight[i];
                        }
                        sum = (sum % 11) % 10;
                        return (sum == value.substr(9, 1));
                    },
                    // Validate Bulgarian personal number of a foreigner
                    pnf = function(value) {
                        var sum    = 0,
                            weight = [21, 19, 17, 13, 11, 9, 7, 3, 1];
                        for (var i = 0; i < 9; i++) {
                            sum += parseInt(value.charAt(i)) * weight[i];
                        }
                        sum = sum % 10;
                        return (sum == value.substr(9, 1));
                    },
                    // Finally, consider it as a VAT number
                    vat = function(value) {
                        var sum    = 0,
                            weight = [4, 3, 2, 7, 6, 5, 4, 3, 2];
                        for (var i = 0; i < 9; i++) {
                            sum += parseInt(value.charAt(i)) * weight[i];
                        }
                        sum = 11 - sum % 11;
                        if (sum == 10) {
                            return false;
                        }
                        if (sum == 11) {
                            sum = 0;
                        }
                        return (sum == value.substr(9, 1));
                    };
                return (egn(value) || pnf(value) || vat(value));
            }

            return false;
        },

        /**
         * Validate Swiss VAT number
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _ch: function(value) {
            if (!/^CHE[0-9]{9}(MWST)?$/.test(value)) {
                return false;
            }

            value = value.substr(3);
            var sum    = 0,
                weight = [5, 4, 3, 2, 7, 6, 5, 4];
            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }

            sum = 11 - sum % 11;
            if (sum == 10) {
                return false;
            }
            if (sum == 11) {
                sum = 0;
            }

            return (sum == value.substr(8, 1));
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
            if (!/^CY[0-5|9]{1}[0-9]{7}[A-Z]{1}$/.test(value)) {
                return false;
            }

            value = value.substr(2);

            // Do not allow to start with "12"
            if (value.substr(0, 2) == '12') {
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
                if (i % 2 == 0) {
                    temp = translation[temp + ''];
                }
                sum += temp;
            }

            sum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[sum % 26];
            return (sum == value.substr(8, 1));
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
            if (!/^CZ[0-9]{8,10}$/.test(value)) {
                return false;
            }

            value = value.substr(2);

            var sum = 0,
                i   = 0;
            if (value.length == 8) {
                // Do not allow to start with '9'
                if (value.charAt(0) + '' == '9') {
                    return false;
                }

                sum = 0;
                for (i = 0; i < 7; i++) {
                    sum += parseInt(value.charAt(i), 10) * (8 - i);
                }
                sum = 11 - sum % 11;
                if (sum == 10) {
                    sum = 0;
                }
                if (sum == 11) {
                    sum = 1;
                }

                return (sum == value.substr(7, 1));
            } else if (value.length == 9 && (value.charAt(0) + '' == '6')) {
                sum = 0;
                // Skip the first (which is 6)
                for (i = 0; i < 7; i++) {
                    sum += parseInt(value.charAt(i + 1), 10) * (8 - i);
                }
                sum = 11 - sum % 11;
                if (sum == 10) {
                    sum = 0;
                }
                if (sum == 11) {
                    sum = 1;
                }
                sum = [8, 7, 6, 5, 4, 3, 2, 1, 0, 9, 10][sum - 1];
                return (sum == value.substr(8, 1));
            } else if (value.length == 9 || value.length == 10) {
                // Validate Czech birth number (Rodné číslo), which is also national identifier
                var year  = 1900 + parseInt(value.substr(0, 2)),
                    month = parseInt(value.substr(2, 2)) % 50 % 20,
                    day   = parseInt(value.substr(4, 2));
                if (value.length == 9) {
                    if (year >= 1980) {
                        year -= 100;
                    }
                    if (year > 1953) {
                        return false;
                    }
                } else if (year < 1954) {
                    year += 100;
                }

                try {
                    var d = new Date(year, month, day);
                } catch (ex) {
                    return false;
                }

                // Check that the birth date is not in the future
                if (value.length == 10) {
                    var check = parseInt(value.substr(0, 9), 10) % 11;
                    if (year < 1985) {
                        check = check % 10;
                    }
                    return (check == value.substr(9, 1));
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
            if (!/^DE[0-9]{9}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            return $.fn.bootstrapValidator.helpers.mod_11_10(value);
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
            if (!/^DK[0-9]{8}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var sum    = 0,
                weight = [2, 7, 6, 5, 4, 3, 2, 1];
            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i), 10) * weight[i];
            }

            return (sum % 11 == 0);
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
            if (!/^EE[0-9]{9}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var sum    = 0,
                weight = [3, 7, 1, 3, 7, 1, 3, 7, 1];

            for (var i = 0; i < 9; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }

            return (sum % 10 == 0);
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
            if (!/^ES[0-9A-Z][0-9]{7}[0-9A-Z]$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var dni = function(value) {
                    var check = parseInt(value.substr(0, 8), 10);
                    check = 'TRWAGMYFPDXBNJZSQVHLCKE'[check % 23];
                    return (check == value.substr(8, 1));
                },
                nie = function(value) {
                    var check = ['XYZ'.indexOf(value.charAt(0)), value.substr(1)].join('');
                    check = parseInt(check, 10);
                    check = 'TRWAGMYFPDXBNJZSQVHLCKE'[check % 23];
                    return (check == value.substr(8, 1));
                },
                cif = function(value) {
                    var first = value.charAt(0), check;
                    if ('KLM'.indexOf(first) != -1) {
                        // K: Spanish younger than 14 year old
                        // L: Spanish living outside Spain without DNI
                        // M: Granted the tax to foreigners who have no NIE
                        check = parseInt(value.substr(1, 8), 10);
                        check = 'TRWAGMYFPDXBNJZSQVHLCKE'[check % 23];
                        return (check == value.substr(8, 1));
                    } else if ('ABCDEFGHJNPQRSUVW'.indexOf(first) != -1) {
                        var sum    = 0,
                            weight = [2, 1, 2, 1, 2, 1, 2],
                            temp   = 0;

                        for (var i = 0; i < 7; i++) {
                            temp = parseInt(value.charAt(i + 1)) * weight[i];
                            if (temp > 9) {
                                temp = Math.floor(temp / 10) + temp % 10;
                            }
                            sum += temp;
                        }
                        sum = 10 - sum % 10;
                        return (sum == value.substr(8, 1) || 'JABCDEFGHI'[sum] == value.substr(8, 1));
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
            if (!/^FI[0-9]{8}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var sum    = 0,
                weight = [7, 9, 10, 5, 8, 4, 2, 1];

            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }

            return (sum % 11 == 0);
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
            if (!/^FR[0-9A-Z]{2}[0-9]{9}$/.test(value)) {
                return false;
            }

            value = value.substr(2);

			if (!$.fn.bootstrapValidator.helpers.luhn(value.substr(2))) {
                return false;
            }

            if (/^[0-9]{2}$/.test(value.substr(0, 2))) {
                // First two characters are digits
                return value.substr(0, 2) == (parseInt(value.substr(2) + '12', 10) % 97);
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
                return ((parseInt(value.substr(2), 10) + 1 + Math.floor(check / 11)) % 11) == (check % 11);
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
            if (!/^GB[0-9]{9}$/.test(value)             // Standard
                && !/^GB[0-9]{12}$/.test(value)         // Branches
                && !/^GBGD[0-9]{3}$/.test(value)        // Government department
                && !/^GBHA[0-9]{3}$/.test(value)        // Health authority
                && !/^GB(GD|HA)8888[0-9]{5}$/.test(value))
            {
                return false;
            }

            value = value.substr(2);
            var length = value.length;
            if (length == 5) {
                var firstTwo  = value.substr(0, 2),
                    lastThree = parseInt(value.substr(2));
                return ('GD' == firstTwo && lastThree < 500) || ('HA' == firstTwo && lastThree >= 500);
            } else if (length == 11 && ('GD8888' == value.substr(0, 6) || 'HA8888' == value.substr(0, 6))) {
                if (('GD' == value.substr(0, 2) && parseInt(value.substr(6, 3)) >= 500)
                    || ('HA' == value.substr(0, 2) && parseInt(value.substr(6, 3)) < 500))
                {
                    return false;
                }
                return (parseInt(value.substr(6, 3)) % 97 == parseInt(value.substr(9, 2)));
            } else if (length == 9 || length == 12) {
                var sum    = 0,
                    weight = [8, 7, 6, 5, 4, 3, 2, 10, 1];
                for (var i = 0; i < 9; i++) {
                    sum += parseInt(value.charAt(i)) * weight[i];
                }
                sum = sum % 97;

                if (parseInt(value.substr(0, 3)) >= 100) {
                    return (sum == 0 || sum == 42 || sum == 55);
                } else {
                    return (sum == 0);
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
            if (!/^GR[0-9]{9}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            if (value.length == 8) {
                value = '0' + value;
            }

            var sum    = 0,
                weight = [256, 128, 64, 32, 16, 8, 4, 2];
            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }
            sum = (sum % 11) % 10;

            return (sum == value.substr(8, 1));
        },

        // EL is traditionally prefix of Greek VAT numbers
        _el: function(value) {
            if (!/^EL[0-9]{9}$/.test(value)) {
                return false;
            }

            value = 'GR' + value.substr(2);
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
            if (!/^HU[0-9]{8}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var sum    = 0,
                weight = [9, 7, 3, 1, 9, 7, 3, 1];

            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }

            return (sum % 10 == 0);
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
            if (!/^HR[0-9]{11}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            return $.fn.bootstrapValidator.helpers.mod_11_10(value);
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
            if (!/^IE[0-9]{1}[0-9A-Z\*\+]{1}[0-9]{5}[A-Z]{1,2}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var getCheckDigit = function(value) {
                while (value.length < 7) {
                    value = '0' + value;
                }
                var alphabet = 'WABCDEFGHIJKLMNOPQRSTUV',
                    sum      = 0;
                for (var i = 0; i < 7; i++) {
                    sum += parseInt(value.charAt(i)) * (8 - i);
                }
                sum += 9 * alphabet.indexOf(value.substr(7));
                return alphabet[sum % 23];
            };

            // The first 7 characters are digits
            if (/^[0-9]+$/.test(value.substr(0, 7))) {
                // New system
                return value.charAt(7) == getCheckDigit(value.substr(0, 7) + value.substr(8) + '');
            } else if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ+*'.indexOf(value.charAt(1)) != -1) {
                // Old system
                return value.charAt(7) == getCheckDigit(value.substr(2, 5) + value.substr(0, 1) + '');
            }

            return true;
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
            if (!/^IT[0-9]{11}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            if (parseInt(value.substr(0, 7)) == 0) {
                return false;
            }

            var lastThree = parseInt(value.substr(7, 3));
            if ((lastThree < 1) || (lastThree > 201) && lastThree != 999 && lastThree != 888) {
                return false;
            }

            return $.fn.bootstrapValidator.helpers.luhn(value);
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
            if (!/^LT([0-9]{7}1[0-9]{1}|[0-9]{10}1[0-9]{1})$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var length = value.length,
                sum    = 0;
            for (var i = 0; i < length - 1; i++) {
                sum += parseInt(value.charAt(i)) * (1 + i % 9);
            }
            var check = sum % 11;
            if (check == 10) {
                sum = 0;
                for (var i = 0; i < length - 1; i++) {
                    sum += parseInt(value.charAt(i)) * (1 + (i + 2) % 9);
                }
            }
            check = check % 11 % 10;
            return (check == value.charAt(length - 1));
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
            if (!/^LU[0-9]{8}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            return (value.substr(0, 6) % 89 == value.substr(6, 2));
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
            if (!/^LV[0-9]{11}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var first  = parseInt(value.charAt(0)),
                sum    = 0,
                weight = [],
                i      = 0,
                length = value.length;
            if (first > 3) {
                // Legal entity
                sum    = 0;
                weight = [9, 1, 4, 8, 3, 10, 2, 5, 7, 6, 1];
                for (i = 0; i < length; i++) {
                    sum += parseInt(value.charAt(i)) * weight[i];
                }
                sum = sum % 11;
                return (sum == 3);
            } else {
                // Check birth date
                var day   = parseInt(value.substr(0, 2)),
                    month = parseInt(value.substr(2, 2)),
                    year  = parseInt(value.substr(4, 2));
                year = year + 1800 + parseInt(value.charAt(6)) * 100;

                try {
                    var d = new Date(year, month, day);
                } catch (ex) {
                    return false;
                }

                // Check personal code
                sum    = 0;
                weight = [10, 5, 8, 4, 2, 1, 6, 3, 7, 9];
                for (i = 0; i < length - 1; i++) {
                    sum += parseInt(value.charAt(i)) * weight[i];
                }
                sum = (sum + 1) % 11 % 10;
                return (sum == value.charAt(length - 1));
            }

            return true;
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
            if (!/^MT[0-9]{8}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var sum    = 0,
                weight = [3, 4, 6, 7, 8, 9, 10, 1];

            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }

            return (sum % 37 == 0);
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
            if (!/^NL[0-9]{9}B[0-9]{2}$/.test(value)) {
               return false;
            }
            value = value.substr(2);
            var sum    = 0,
                weight = [9, 8, 7, 6, 5, 4, 3, 2];
            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }

            sum = sum % 11;
            if (sum > 9) {
                sum = 0;
            }
            return (sum == value.substr(8, 1));
        },

        /**
         * Validate Norwegian VAT number
         *
         * @see http://www.brreg.no/english/coordination/number.html
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _no: function(value) {
            if (!/^NO[0-9]{9}$/.test(value)) {
               return false;
            }
            value = value.substr(2);
            var sum    = 0,
                weight = [3, 2, 7, 6, 5, 4, 3, 2];
            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }

            sum = 11 - sum % 11;
            if (sum == 11) {
                sum = 0;
            }
            return (sum == value.substr(8, 1));
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
            if (!/^PL[0-9]{10}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var sum    = 0,
                weight = [6, 5, 7, 2, 3, 4, 5, 6, 7, -1];

            for (var i = 0; i < 10; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }

            return (sum % 11 == 0);
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
            if (!/^PT[0-9]{9}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var sum    = 0,
                weight = [9, 8, 7, 6, 5, 4, 3, 2];

            for (var i = 0; i < 8; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }
            sum = 11 - sum % 11;
            if (sum > 9) {
                sum = 0;
            }
            return (sum == value.substr(8, 1));
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
            if (!/^RO[1-9][0-9]{1,9}$/.test(value)) {
                return false;
            }
            value = value.substr(2);

            var length = value.length,
                weight = [7, 5, 3, 2, 1, 7, 5, 3, 2].slice(10 - length),
                sum    = 0;
            for (var i = 0; i < length - 1; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }

            sum = (10 * sum) % 11 % 10;
            return (sum == value.substr(length - 1, 1));
        },

        /**
         * Validate Russian VAT number (Taxpayer Identification Number - INN)
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _ru: function(value) {
            if (!/^RU([0-9]{9}|[0-9]{12})$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            if (value.length == 10) {
                var sum    = 0,
                    weight = [2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
                for (var i = 0; i < 10; i++) {
                    sum += parseInt(value.charAt(i)) * weight[i];
                }
                sum = sum % 11;
                if (sum > 9) {
                    sum = sum % 10;
                }

                return (sum == value.substr(9, 1));
            } else if (value.length == 12) {
                var sum1    = 0,
                    weight1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0],
                    sum2    = 0,
                    weight2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0];

                for (var i = 0; i < 11; i++) {
                    sum1 += parseInt(value.charAt(i)) * weight1[i];
                    sum2 += parseInt(value.charAt(i)) * weight2[i];
                }
                sum1 = sum1 % 11;
                if (sum1 > 9) {
                    sum1 = sum1 % 10;
                }
                sum2 = sum2 % 11;
                if (sum2 > 9) {
                    sum2 = sum2 % 10;
                }

                return (sum1 == value.substr(10, 1) && sum2 == value.substr(11, 1));
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
            if (!/^RS[0-9]{9}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var sum  = 10,
                temp = 0;
            for (var i = 0; i < 8; i++) {
                temp = (parseInt(value.charAt(i)) + sum) % 10;
                if (temp == 0) {
                    temp = 10;
                }
                sum = (2 * temp) % 11;
            }

            return ((sum + parseInt(value.substr(8, 1))) % 10 == 1);
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
            if (!/^SE[0-9]{10}01$/.test(value)) {
                return false;
            }

            value = value.substr(2, 10);
            return $.fn.bootstrapValidator.helpers.luhn(value);
        },

        /**
         * Validate Slovenian VAT number
         * Examples:
         * - Valid: SI50223054
         * - Invalid: SI50223055
         *
         * @param {String} value VAT number
         * @returns {Boolean}
         */
        _si: function(value) {
            if (!/^SI[0-9]{8}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            var sum    = 0,
                weight = [8, 7, 6, 5, 4, 3, 2];

            for (var i = 0; i < 7; i++) {
                sum += parseInt(value.charAt(i)) * weight[i];
            }
            sum = 11 - sum % 11;
            if (sum == 10) {
                sum = 0;
            }
            return (sum == value.substr(7, 1));
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
            if (!/^SK[1-9][0-9][(2-4)|(6-9)][0-9]{7}$/.test(value)) {
                return false;
            }

            value = value.substr(2);
            return (value % 11 == 0);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.vin = {
        /**
         * Validate an US VIN (Vehicle Identification Number)
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
            if (reminder == 10) {
                reminder = 'X';
            }

            return reminder == value.charAt(8);
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
         * - CA (Canada)
         * - DK (Denmark)
         * - GB (United Kingdom)
         * - SE (Sweden)
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '' || !options.country) {
                return true;
            }

            var country = (options.country || 'US').toUpperCase();
            switch (country) {
                case 'CA':
                    return /(?:A|B|C|E|G|J|K|L|M|N|P|R|S|T|V|X|Y){1}[0-9]{1}(?:A|B|C|E|G|J|K|L|M|N|P|R|S|T|V|X|Y){1}\s?[0-9]{1}(?:A|B|C|E|G|J|K|L|M|N|P|R|S|T|V|X|Y){1}[0-9]{1}/i.test(value);
                case 'DK':
                    return /^(DK(-|\s)?)?\d{4}$/i.test(value);
                case 'GB':
                    return this._gb(value);
                case 'SE':
                    return /^(S-)?\d{3}\s?\d{2}$/i.test(value);
                case 'US':
                default:
                    return /^\d{4,5}([\-]\d{4})?$/.test(value);
            }
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
                fouthChar  = '[ABEHMNPRVWXY]',
                fifthChar  = '[ABDEFGHJLNPQRSTUWXYZ]',
                regexps = [
                    // AN NAA, ANN NAA, AAN NAA, AANN NAA format
                    new RegExp('^(' + firstChar + '{1}' + secondChar + '?[0-9]{1,2})(\\s*)([0-9]{1}' + fifthChar + '{2})$', 'i'),
                    // ANA NAA
                    new RegExp('^(' + firstChar + '{1}[0-9]{1}' + thirdChar + '{1})(\\s*)([0-9]{1}' + fifthChar + '{2})$', 'i'),
                    // AANA NAA
                    new RegExp('^(' + firstChar + '{1}' + secondChar + '{1}?[0-9]{1}' + fouthChar + '{1})(\\s*)([0-9]{1}' + fifthChar + '{2})$', 'i'),

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
}(window.jQuery));
