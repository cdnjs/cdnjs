/**
 * BootstrapValidator (https://github.com/nghuuphuoc/bootstrapvalidator)
 *
 * A jQuery plugin to validate form fields. Use with Bootstrap 3
 *
 * @version     v0.3.2
 * @author      https://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 - 2014 Nguyen Huu Phuoc
 * @license     MIT
 */

(function($) {
    var BootstrapValidator = function(form, options) {
        this.$form   = $(form);
        this.options = $.extend({}, BootstrapValidator.DEFAULT_OPTIONS, options);

        this.dfds    = {};      // Array of deferred
        this.results = {};      // Validating results

        this.invalidField  = null;  // First invalid field
        this.$submitButton = null;  // The submit button which is clicked to submit form

        this._init();

        this.STATUS_NOT_VALIDATED = 'NOT_VALIDATED';
        this.STATUS_VALIDATING    = 'VALIDATING';
        this.STATUS_INVALID       = 'INVALID';
        this.STATUS_VALID         = 'VALID';
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
            valid: null,
            invalid: null,
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
            if (this.options.fields == null) {
                return;
            }

            var that = this;
            this.$form
                // Disable client side validation in HTML 5
                .attr('novalidate', 'novalidate')
                .addClass(this.options.elementClass)
                // Disable the default submission first
                .on('submit.bootstrapValidator', function(e) {
                    e.preventDefault();
                    that.validate();
                })
                .find(this.options.submitButtons)
                    .on('click', function() {
                        that.$submitButton = $(this);
                    });

            for (var field in this.options.fields) {
                this._initField(field);
            }

            this._setLiveValidating();
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

            this.dfds[field]    = {};
            this.results[field] = {};

            var fields = this.getFieldElements(field);

            // We don't need to validate non-existing fields
            if (fields == null) {
                delete this.options.fields[field];
                delete this.dfds[field];
                return;
            }

            fields.attr('data-bv-field', field);

            // Create help block elements for showing the error messages
            var $field   = $(fields[0]),
                $parent  = $field.parents('.form-group'),
                // Allow user to indicate where the error messages are shown
                $message = this.options.fields[field].container ? $parent.find(this.options.fields[field].container) : this._getMessageContainer($field);

            $field.data('bootstrapValidator.messageContainer', $message);
            for (var validatorName in this.options.fields[field].validators) {
                if (!$.fn.bootstrapValidator.validators[validatorName]) {
                    delete this.options.fields[field].validators[validatorName];
                    continue;
                }

                this.results[field][validatorName] = this.STATUS_NOT_VALIDATED;
                $('<small/>')
                    .css('display', 'none')
                    .attr('data-bv-validator', validatorName)
                    .html(this.options.fields[field].validators[validatorName].message || this.options.message)
                    .addClass('help-block')
                    .appendTo($message);
            }

            // Prepare the feedback icons
            // Available from Bootstrap 3.1 (http://getbootstrap.com/css/#forms-control-validation)
            if (this.options.feedbackIcons
                && this.options.feedbackIcons.validating && this.options.feedbackIcons.invalid && this.options.feedbackIcons.valid)
            {
                $parent.addClass('has-feedback');
                var $icon = $('<i/>').css('display', 'none').addClass('form-control-feedback').attr('data-bv-field', field).insertAfter($(fields[fields.length - 1]));
                // The feedback icon does not render correctly if there is no label
                // https://github.com/twbs/bootstrap/issues/12873
                if ($parent.find('label').length == 0) {
                    $icon.css('top', 0);
                }
            }

            if (this.options.fields[field]['enabled'] == null) {
                this.options.fields[field]['enabled'] = true;
            }

            // Whenever the user change the field value, mark it as not validated yet
            var that  = this,
                type  = fields.attr('type'),
                event = ('radio' == type || 'checkbox' == type || 'SELECT' == fields[0].tagName) ? 'change' : 'keyup';
            fields.on(event + '.bootstrapValidator', function() {
                that.updateStatus($field, that.STATUS_NOT_VALIDATED, null);
            });
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
         * Enable live validating
         */
        _setLiveValidating: function() {
            if ('enabled' == this.options.live) {
                var that = this;
                for (var field in this.options.fields) {
                    (function(f) {
                        var fields = that.getFieldElements(f);
                        if (fields) {
                            var type  = fields.attr('type'),
                                event = ('radio' == type || 'checkbox' == type || 'SELECT' == fields[0].tagName) ? 'change' : 'keyup';

                            fields.on(event + '.bootstrapValidator', function() {
                                that.validateField(f);
                            });
                        }
                    })(field);
                }
            }
        },

        /**
         * Disable/Enable submit buttons
         *
         * @param {Boolean} disabled
         */
        _disableSubmitButtons: function(disabled) {
            if (!disabled) {
                this.$form.find(this.options.submitButtons).removeAttr('disabled');
            } else if (this.options.live != 'disabled') {
                // Don't disable if the live validating mode is disabled
                this.$form.find(this.options.submitButtons).attr('disabled', 'disabled');
            }
        },

        /**
         * Called when all validations are completed
         */
        _submit: function() {
            if (!this.isValid()) {
                if ('submitted' == this.options.live) {
                    this.options.live = 'enabled';
                    this._setLiveValidating();
                }

                // Focus to the first invalid field
                if (this.invalidField) {
                    this.getFieldElements(this.invalidField).focus();
                }
                return;
            }

            this._disableSubmitButtons(true);

            // Call the custom submission if enabled
            if (this.options.submitHandler && 'function' == typeof this.options.submitHandler) {
                this.options.submitHandler.call(this, this, this.$form, this.$submitButton);
            } else {
                // Submit form
                this.$form.off('submit.bootstrapValidator').submit();
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
            var fields = this.$form.find(this.options.fields[field].selector || '[name="' + field + '"]');
            return (fields.length == 0) ? null : fields;
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
            this._disableSubmitButtons(true);

            for (var field in this.options.fields) {
                this.validateField(field);
            }

            this._submit();
            return this;
        },

        /**
         * Validate given field
         *
         * @param {String} field The field name
         */
        validateField: function(field) {
            if (!this.options.fields[field]['enabled']) {
                return;
            }

            var that       = this,
                fields     = this.getFieldElements(field),
                $field     = $(fields[0]),
                validators = this.options.fields[field].validators,
                validatorName,
                validateResult;

            // We don't need to validate disabled field
            if (fields.length == 1 && fields.is(':disabled')) {
                delete this.options.fields[field];
                delete this.dfds[field];
                return;
            }

            for (validatorName in validators) {
                if (this.dfds[field][validatorName]) {
                    this.dfds[field][validatorName].reject();
                }

                // Don't validate field if it is already done
                if (this.results[field][validatorName] == this.STATUS_VALID || this.results[field][validatorName] == this.STATUS_INVALID) {
                    continue;
                }

                this.results[field][validatorName] = this.STATUS_VALIDATING;
                validateResult = $.fn.bootstrapValidator.validators[validatorName].validate(this, $field, validators[validatorName]);

                if ('object' == typeof validateResult) {
                    this.updateStatus($field, this.STATUS_VALIDATING, validatorName);
                    this.dfds[field][validatorName] = validateResult;

                    validateResult.done(function(isValid, v) {
                        // v is validator name
                        delete that.dfds[field][v];
                        that.updateStatus($field, isValid ? that.STATUS_VALID : that.STATUS_INVALID, v);

                        if (isValid && 'disabled' == that.options.live) {
                            that._submit();
                        }
                    });
                } else if ('boolean' == typeof validateResult) {
                    this.updateStatus($field, validateResult ? this.STATUS_VALID : this.STATUS_INVALID, validatorName);
                }
            }
        },

        /**
         * Check the form validity
         *
         * @returns {Boolean}
         */
        isValid: function() {
            var field, validatorName;
            for (field in this.results) {
                if (!this.options.fields[field]['enabled']) {
                    continue;
                }

                for (validatorName in this.results[field]) {
                    if (this.results[field][validatorName] == this.STATUS_NOT_VALIDATED || this.results[field][validatorName] == this.STATUS_VALIDATING) {
                        return false;
                    }

                    if (this.results[field][validatorName] == this.STATUS_INVALID) {
                        this.invalidField = field;
                        return false;
                    }
                }
            }

            return true;
        },

        /**
         * Update field status
         *
         * @param {String|jQuery} field The field name or field element
         * @param {String} status The status
         * Can be 'NOT_VALIDATED', 'VALIDATING', 'INVALID' or 'VALID'
         * @param {String|null} validatorName The validator name. If null, the method updates validity result for all validators
         * @return {BootstrapValidator}
         */
        updateStatus: function(field, status, validatorName) {
            var $field   = ('string' == typeof field) ? this.getFieldElements(field) : field,
                that     = this,
                field    = $field.attr('data-bv-field'),
                $parent  = $field.parents('.form-group'),
                $message = $field.data('bootstrapValidator.messageContainer'),
                $errors  = $message.find('.help-block[data-bv-validator]'),
                $icon    = $parent.find('.form-control-feedback[data-bv-field="' + field + '"]');

            // Update status
            if (validatorName) {
                this.results[field][validatorName] = status;
            } else {
                for (var v in this.options.fields[field].validators) {
                    this.results[field][v] = status;
                }
            }

            // Show/hide error elements and feedback icons
            switch (status) {
                case this.STATUS_VALIDATING:
                    this._disableSubmitButtons(true);
                    $parent.removeClass('has-success').removeClass('has-error');
                    // TODO: Show validating message
                    validatorName ? $errors.filter('.help-block[data-bv-validator="' + validatorName + '"]').hide() : $errors.hide();
                    if ($icon) {
                        $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).addClass(this.options.feedbackIcons.validating).show();
                    }
                    break;

                case this.STATUS_INVALID:
                    this._disableSubmitButtons(true);
                    $parent.removeClass('has-success').addClass('has-error');
                    validatorName ? $errors.filter('[data-bv-validator="' + validatorName + '"]').show() : $errors.show();
                    if ($icon) {
                        $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.validating).addClass(this.options.feedbackIcons.invalid).show();
                    }
                    break;

                case this.STATUS_VALID:
                    validatorName ? $errors.filter('[data-bv-validator="' + validatorName + '"]').hide() : $errors.hide();

                    // If the field is valid
                    if ($errors.filter(function() {
                            var display = $(this).css('display'), v = $(this).attr('data-bv-validator');
                            return ('block' == display) || (that.results[field][v] != that.STATUS_VALID);
                        }).length == 0
                    ) {
                        this._disableSubmitButtons(false);
                        $parent.removeClass('has-error').addClass('has-success');
                        if ($icon) {
                            $icon.removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).addClass(this.options.feedbackIcons.valid).show();
                        }
                    }
                    break;

                case this.STATUS_NOT_VALIDATED:
                default:
                    this._disableSubmitButtons(false);
                    $parent.removeClass('has-success').removeClass('has-error');
                    validatorName ? $errors.filter('.help-block[data-bv-validator="' + validatorName + '"]').hide() : $errors.hide();
                    if ($icon) {
                        $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).hide();
                    }
                    break;
            }

            return this;
        },

        // Useful APIs which aren't used internally

        /**
         * Reset the form
         *
         * @param {Boolean} resetFormData Reset current form data
         * @return {BootstrapValidator}
         */
        resetForm: function(resetFormData) {
            var field, $field, type;
            for (field in this.options.fields) {
                this.dfds[field]    = {};
                this.results[field] = {};

                $field = this.getFieldElements(field);
                // Mark field as not validated yet
                this.updateStatus($field, this.STATUS_NOT_VALIDATED, null);

                if (resetFormData) {
                    type = $field.attr('type');
                    ('radio' == type || 'checkbox' == type) ? $field.removeAttr('checked').removeAttr('selected') : $field.val('');
                }
            }

            this.invalidField  = null;
            this.$submitButton = null;

            // Enable submit buttons
            this._disableSubmitButtons(false);

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
                dfd.resolve(options.callback.call(this, value, validator), 'callback');
                return dfd;
            }
            return true;
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.choice = {
        /**
         * Check if the number of checked boxes are less or more than a given number
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of following keys:
         * - min
         * - max
         * At least one of two keys is required
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
        /**
         * Return true if the input value is different with given field's value
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

            if (value != compareWith.val()) {
                validator.updateStatus(compareWith, validator.STATUS_VALID, 'different');
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
    $.fn.bootstrapValidator.validators.hexColor = {
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
    $.fn.bootstrapValidator.validators.identical = {
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
                validator.updateStatus(compareWith, validator.STATUS_VALID, 'identical');
                return true;
            } else {
                return false;
            }
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.ip = {
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
            return (options.inclusive === true) ? (value < options.value) : (value <= options.value);
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
    $.fn.bootstrapValidator.validators.phone = {
        /**
         * Return true if the input value contains a valid US phone number only
         *
         * @param {BootstrapValidator} validator Validate plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - country: The ISO 3166 country code
         *
         * Currently it only supports United State (US) country
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            options.country = options.country || 'US';
            switch (options.country.toUpperCase()) {
                case 'US':
                default:
                    value = value.replace(/\(|\)|\s+/g, '');
                    return (/^(?:1\-?)?(\d{3})[\-\.]?(\d{3})[\-\.]?(\d{4})$/).test(value);
            }
        }
    }
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.regexp = {
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

            return options.regexp.test(value);
        }
    };
}(window.jQuery));
;(function($) {
    $.fn.bootstrapValidator.validators.remote = {
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
                dfd.resolve(response.valid === true || response.valid === 'true', 'remote');
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
    $.fn.bootstrapValidator.validators.stringLength = {
        /**
         * Check if the length of element value is less or more than given number
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consists of following keys:
         * - min
         * - max
         * At least one of two keys is required
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
    $.fn.bootstrapValidator.validators.zipCode = {
        /**
         * Return true if and only if the input value is a valid country zip code
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - country: The ISO 3166 country code
         *
         * Currently it supports the following countries:
         * - US (United State)
         * - DK (Denmark)
         * - SE (Sweden)
         *
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
