/**
 * Form Validation
 * @module Ink.UI.FormValidator_2
 * @version 2
 */

Ink.createModule('Ink.UI.FormValidator', '2', [ 'Ink.UI.Common_1','Ink.Dom.Element_1','Ink.Dom.Event_1','Ink.Dom.Selector_1','Ink.Dom.Css_1','Ink.Util.Array_1','Ink.Util.I18n_1','Ink.Util.Validator_1'], function( Common, Element, Event, Selector, Css, InkArray, I18n, InkValidator ) {
    'use strict';

    function getValue(element) {
        // TODO this is already implemented in FormSerialize.
        switch(element.nodeName.toLowerCase()){
            case 'select':
                var checkedOpt = Ink.s('option:checked', element);
                if (checkedOpt) { return checkedOpt.value; }
                return '';
            case 'textarea':
                return element.value;
            case 'input':
                if( "type" in element ){
                    if( (element.type === 'radio') || (element.type === 'checkbox') ){
                        if( element.checked ){
                            return element.value;
                        }
                    } else if( element.type !== 'file' ){
                        return element.value;
                    }
                } else {
                    return element.value;
                }
                return;
            default:
                return element.innerHTML;
        }
    }

    /**
     * Validation Functions used in the rules (data-rules) option to FormValidator_2.
     *
     * This option is a string with a special syntax: `function_name|function2_name|...`. Optionally you can pass parameters to these methods using square brackets (`[]`)
     *
     * For instance:
     *
     *     data-rules="required|numeric[.,2]|max_length[8]"
     *
     * Meaning:
     * - Required field;
     * - Number in which the decimal separator is a dot (.) and has at most 2 decimal places;
     * - Field with at most 8 characters;
     *
     * @class FormValidator.validationFunctions
     * @static
     */
    var validationFunctions = {
        /**
         * Checks if a value is defined and not empty
         * @method required
         * @return {Boolean}       True case is defined, false if it's empty or not defined.
         * @public
         */
        'required': function( value ){
            return ( (typeof value !== 'undefined') && ( !(/^\s*$/).test(value) ) );
        },

        /**
         * Checks if a value has a minimum length
         *
         * @method min_length
         * @param  {String|Number}  minSize Minimum number of characters.
         * @return {Boolean}                True if the length of value is equal or bigger than the minimum chars defined. False if not.
         */
        'min_length': function( value, minSize ){
            return ( (typeof value === 'string') && ( value.length >= parseInt(minSize,10) ) );
        },

        /**
         * Checks if a value has a maximum length
         *
         * @method max_length
         * @param  {String|Number}  maxSize Maximum number of characters.
         * @return {Boolean}         True if the length of value is equal or smaller than the maximum chars defined. False if not.
         */
        'max_length': function( value, maxSize ){
            return ( (typeof value === 'string') && ( value.length <= parseInt(maxSize,10) ) );
        },

        /**
         * Checks if a value has an exact length
         *
         * @method exact_length
         * @param  {String|Number}  exactSize   Exact number of characters.
         * @return {Boolean}                    True if the length of value is equal to the size defined. False if not.
         */
        'exact_length': function( value, exactSize ){
            return ( (typeof value === 'string') && ( value.length === parseInt(exactSize,10) ) );
        },

        /**
         * Checks if a value is a valid email address
         *
         * @method email
         * @return {Boolean}         True if the value is a valid email address. False if not.
         */
        'email': function( value ){
            return ( ( typeof value === 'string' ) && InkValidator.mail( value ) );
        },

        /**
         * Checks if a value has a valid URL
         *
         * @method url
         * @param  {Boolean} fullCheck  Flag to validate a full url (with the protocol).
         * @return {Boolean}            True if the URL is considered valid. False if not.
         */
        'url': function( value, fullCheck ){
            fullCheck = fullCheck || false;
            return ( (typeof value === 'string') && InkValidator.url( value, fullCheck ) );
        },

        /**
         * Checks if a value is a valid IP. Supports ipv4 and ipv6
         *
         * @method ip
         * @param  {String} ipType Type of IP to be validated. The values are: ipv4, ipv6. By default is ipv4.
         * @return {Boolean}         True if the value is a valid IP address. False if not.
         */
        'ip': function( value, ipType ){
            if( typeof value !== 'string' ){
                return false;
            }

            return InkValidator.isIP(value, ipType);
        },

        /**
         * Checks if a value is a valid phone number.
         * Supports several countries, based in the Ink.Util.Validator class.
         *
         * @method phone
         * @param  {String} phoneType Country's initials to specify the type of phone number to be validated. Ex: 'AO'.
         * @return {Boolean}         True if it's a valid phone number. False if not.
         */
        'phone': function( value, phoneType ){
            if( typeof value !== 'string' ){
                return false;
            }

            var countryCode = phoneType ? phoneType.toUpperCase() : '';

            return InkValidator['is' + countryCode + 'Phone'](value);
        },

        /**
         * Checks if a value is a valid credit card.
         *
         * @method credit_card
         * @param  {String} cardType Type of credit card to be validated. The card types available are in the Ink.Util.Validator class.
         * @return {Boolean}         True if the value is a valid credit card number. False if not.
         */
        'credit_card': function( value, cardType ){
            if( typeof value !== 'string' ){
                return false;
            }

            return InkValidator.isCreditCard( value, cardType || 'default' );
        },

        /**
         * Checks if a value is a valid date.
         *
         * @method date
         * @param  {String} format Specific format of the date.
         * @return {Boolean}         True if the value is a valid date. False if not.
         */
        'date': function( value, format ){
            return ( (typeof value === 'string' ) && InkValidator.isDate(format, value) );
        },

        /**
         * Checks if a value only contains alphabetical values.
         *
         * @method alpha
         * @param  {Boolean} supportSpaces  Allow whitespace
         * @return {Boolean}                True if the value is alphabetical-only. False if not.
         */
        'alpha': function( value, supportSpaces ){
            return InkValidator.ascii(value, {singleLineWhitespace: supportSpaces});
        },

        /*
         * Checks if a value contains only printable BMP unicode characters
         * Optionally allow punctuation and whitespace
         *
         * @method text
         * @param  {Boolean} [whitespace=false] Allow whitespace
         * @param  {Boolean} [punctuation=false] Allow punctuation
         * @return {Boolean}        Whether the value only contains printable text characters
         **/
        'text': function (value, whitespace, punctuation) {
            return InkValidator.unicode(value, {
                singleLineWhitespace: whitespace,
                numbers: true,
                unicodePunctuation: punctuation });
        },

        /*
         * Checks if a value contains only printable latin-1 text characters.
         * Optionally allow punctuation and whitespace.
         *
         * @method text
         * @param  {Boolean} [whitespace=false] Allow whitespace
         * @param  {Boolean} [punctuation=false] Allow punctuation
         * @return {Boolean}        Whether the value only contains printable text characters
         **/
        'latin': function (value, punctuation, whitespace) {
            if ( typeof value !== 'string') { return false; }
            return InkValidator.latin1(value, {
                latin1Punctuation: punctuation,
                singleLineWhitespace: whitespace,
                numbers: true });
        },

        /**
         * Checks if a value contains only alphabetical or numerical characters.
         *
         * @method alpha_numeric
         * @return {Boolean}         True if the value is a valid alphanumerical. False if not.
         */
        'alpha_numeric': function( value ){
            return InkValidator.ascii(value, {numbers: true});
        },

        /**
         * Checks if a value contains only alphabetical, dash or underscore characteres.
         *
         * @method alpha_dash
         * @return {Boolean}         True if the value is a valid. False if not.
         */
        'alpha_dash': function( value ){
            return InkValidator.ascii(value, {dash: true, underscore: true});
        },

        /**
         * Checks if a value is a single digit.
         *
         * @method digit
         * @return {Boolean}         True if the value is a valid digit. False if not.
         */
        'digit': function( value ){
            return ((typeof value === 'string') && /^[0-9]{1}$/.test(value));
        },

        /**
         * Checks if a value is a valid integer.
         *
         * @method integer
         * @param  {String} positive Flag that specifies if the integer is must be positive (unsigned).
         * @return {Boolean}         True if the value is a valid integer. False if not.
         */
        'integer': function( value, positive ){
            return InkValidator.number(value, {
                negative: !positive,
                decimalPlaces: 0
            });
        },

        /**
         * Checks if a value is a valid decimal number.
         *
         * @method decimal
         * @param  {String} decimalSeparator Character that splits the integer part from the decimal one. By default is '.'.
         * @param  {String} [decimalPlaces] Maximum number of digits that the decimal part must have.
         * @param  {String} [leftDigits] Maximum number of digits that the integer part must have, when provided.
         * @return {Boolean}         True if the value is a valid decimal number. False if not.
         */
        'decimal': function( value, decimalSeparator, decimalPlaces, leftDigits ){
            return InkValidator.number(value, {
                decimalSep: decimalSeparator || '.',
                decimalPlaces: +decimalPlaces || null,
                maxDigits: +leftDigits
            });
        },

        /**
         * Checks if a value is a numeric value.
         *
         * @method numeric
         * @param  {String} decimalSeparator    Checks if it's a valid decimal. Otherwise checks if it's a valid integer.
         * @param  {String} [decimalPlaces]     Maximum number of digits the decimal part must have.
         * @param  {String} [leftDigits]        Maximum number of digits the integer part must have, when provided.
         * @return {Boolean}         True if the value is numeric. False if not.
         */
        'numeric': function( value, decimalSeparator, decimalPlaces, leftDigits ){
            decimalSeparator = decimalSeparator || '.';
            if( value.indexOf(decimalSeparator) !== -1  ){
                return validationFunctions.decimal( value, decimalSeparator, decimalPlaces, leftDigits );
            } else {
                return validationFunctions.integer( value );
            }
        },

        /**
         * Checks if a value is in a specific range of values.
         * The parameters after the first one are used to specify the range, and are similar in function to python's range() function.
         *
         * @method range
         * @param  {String} minValue        Left limit of the range.
         * @param  {String} maxValue        Right limit of the range.
         * @param  {String} [multipleOf]    In case you want numbers that are only multiples of another number.
         * @return {Boolean}                True if the value is within the range. False if not.
         */
        'range': function( value, minValue, maxValue, multipleOf ){
            value = +value;
            minValue = +minValue;
            maxValue = +maxValue;

            if (isNaN(value) || isNaN(minValue) || isNaN(maxValue)) {
                return false;
            }

            if( value < minValue || value > maxValue ){
                return false;
            }

            if (multipleOf) {
                return (value - minValue) % multipleOf === 0;
            } else {
                return true;
            }
        },

        /**
         * Checks if a value is a valid color.
         *
         * @method color
         * @return {Boolean}         True if the value is a valid color. False if not.
         */
        'color': function( value ){
            return InkValidator.isColor(value);
        },

        /**
         * Checks if a value matches the value of a different field.
         *
         * @method matches
         * @param  {String} fieldToCompare  Name or ID of the field to compare.
         * @return {Boolean}         True if the values match. False if not.
         */
        'matches': function( value, fieldToCompare ){
            // Find the other field in the FormValidator.
            var otherField = this.getFormElements()[fieldToCompare];

            if (!otherField) {
                // It's in the actual <form>, not in the FormValidator's fields
                var possibleFields = Ink.ss('input, select, textarea, .control-group', this._options.form._element);
                for (var i = 0; i < possibleFields.length; i++) {
                    if ((possibleFields[i].name || possibleFields[i].id) === fieldToCompare) {
                        return getValue(possibleFields[i]) === value;
                    }
                }
                return false;
            } else {
                otherField = otherField[0];
            }

            var otherFieldValue = otherField.getValue();
            if (otherField._rules.required) {
                if (otherFieldValue === '') {
                    return false;
                }
            }
            return value === otherFieldValue;
        },

        /**
         * Validates an [EAN barcode](https://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29)
         *
         * @method ean
         * @return {Boolean} True if the given value is an EAN. False if not.
         */
        'ean': function (value) {
            return InkValidator.isEAN(value.replace(/[^\d]/g, ''), 'ean-13');
        }
    };

    /**
     * Error messages for the validation functions above
     * @private
     * @static
     */
    var validationMessages = new I18n({
        en_US: {
            'formvalidator.generic_error' : '{field} is invalid',
            'formvalidator.required' : 'Filling {field} is mandatory',
            'formvalidator.min_length': 'The {field} must have a minimum size of {param1} characters',
            'formvalidator.max_length': 'The {field} must have a maximum size of {param1} characters',
            'formvalidator.exact_length': 'The {field} must have an exact size of {param1} characters',
            'formvalidator.email': 'The {field} must have a valid e-mail address',
            'formvalidator.url': 'The {field} must have a valid URL',
            'formvalidator.ip': 'The {field} does not contain a valid {param1} IP address',
            'formvalidator.phone': 'The {field} does not contain a valid {param1} phone number',
            'formvalidator.credit_card': 'The {field} does not contain a valid {param1} credit card',
            'formvalidator.date': 'The {field} should contain a date in the {param1} format',
            'formvalidator.alpha': 'The {field} should only contain letters',
            'formvalidator.text': 'The {field} should only contain alphabetic characters',
            'formvalidator.latin': 'The {field} should only contain alphabetic characters',
            'formvalidator.alpha_numeric': 'The {field} should only contain letters or numbers',
            'formvalidator.alpha_dash': 'The {field} should only contain letters or dashes',
            'formvalidator.digit': 'The {field} should only contain a digit',
            'formvalidator.integer': 'The {field} should only contain an integer',
            'formvalidator.decimal': 'The {field} should contain a valid decimal number',
            'formvalidator.numeric': 'The {field} should contain a number',
            'formvalidator.range': 'The {field} should contain a number between {param1} and {param2}',
            'formvalidator.color': 'The {field} should contain a valid color',
            'formvalidator.matches': 'The {field} should match the field {param1}'
        },
        pt_PT: {
            'formvalidator.generic_error' : '{field} inválido',
            'formvalidator.required' : 'Preencher {field} é obrigatório',
            'formvalidator.min_length': '{field} deve ter no mínimo {param1} caracteres',
            'formvalidator.max_length': '{field} tem um tamanho máximo de {param1} caracteres',
            'formvalidator.exact_length': '{field} devia ter exactamente {param1} caracteres',
            'formvalidator.email': '{field} deve ser um e-mail válido',
            'formvalidator.url': 'O {field} deve ser um URL válido',
            'formvalidator.ip': '{field} não tem um endereço IP {param1} válido',
            'formvalidator.phone': '{field} deve ser preenchido com um número de telefone {param1} válido.',
            'formvalidator.credit_card': '{field} não tem um cartão de crédito {param1} válido',
            'formvalidator.date': '{field} deve conter uma data no formato {param1}',
            'formvalidator.alpha': 'O campo {field} deve conter apenas caracteres alfabéticos',
            'formvalidator.text': 'O campo {field} deve conter apenas caracteres alfabéticos',
            'formvalidator.latin': 'O campo {field} deve conter apenas caracteres alfabéticos',
            'formvalidator.alpha_numeric': '{field} deve conter apenas letras e números',
            'formvalidator.alpha_dash': '{field} deve conter apenas letras e traços',
            'formvalidator.digit': '{field} destina-se a ser preenchido com apenas um dígito',
            'formvalidator.integer': '{field} deve conter um número inteiro',
            'formvalidator.decimal': '{field} deve conter um número válido',
            'formvalidator.numeric': '{field} deve conter um número válido',
            'formvalidator.range': '{field} deve conter um número entre {param1} e {param2}',
            'formvalidator.color': '{field} deve conter uma cor válida',
            'formvalidator.matches': '{field} deve corresponder ao campo {param1}'
        }
    }, 'en_US');

    /**
     * A FormElement represents a single form element to be validated.
     *
     * It is constructed with a DOM form element, and options.
     *
     * This class contains methods to parse rules and apply them to its element,
     * and also formats the error messages to be displayed in case of an error.
     *
     * You don't normally call "new FormElement" yourself. This is done
     * internally.
     *
     * @class FormValidator.FormElement
     * @constructor
     * @param  {Element} element DOM Element
     * @param  {Object} options Object with configuration options
     * @param  {String} [options.label] Label for this element. It is used in the error message. If not specified, the text in the `label` tag in the control-group is used.
     * @param  {String} [options.rules] Rules string to be parsed.
     * @param  {String} [options.error] Error message to show in case of error
     * @param  {Boolean} [options.autoReparse] Set to `true` to reparse data-rules every time this is submitted.
     * @param  {FormValidator} options.form FormValidator instance.
     */
    function FormElement(){
        Common.BaseUIComponent.apply(this, arguments);
    }

    FormElement._name = 'FormElement_1';

    FormElement._optionDefinition = {
        label: ['String', null],
        rules: ['String', null],  // The rules to apply
        error: ['String', null],  // Error message
        autoReparse: ['Boolean', false],
        form: ['Object']
    };

    /**
     * FormElement's prototype
     */
    FormElement.prototype = {
        _init: function () {
            this._errors = {};
            this._rules = {};
            this._value = null;
            this._forceInvalid = null;
            this._forceValid = null;
            this._errorParagraph = null;

            if (this._options.label === null) {
                this._options.label = this._getLabel();
            }

            // Mostly true, whether the element has an attribute named "data-rules".
            // Used only if options.autoReparse is true.
            this._elementHadDataRules = this._element.hasAttribute('data-rules');
        },

        /**
         * Function to get the label that identifies the field.
         * If it can't find one, it will use the name or the id
         * (depending on what is defined)
         *
         * @method _getLabel
         * @return {String} Label to be used in the error messages
         * @private
         */
        _getLabel: function(){
            var label = Element.findUpwardsBySelector(this._element,'.control-group label');

            if( label ){
                return Element.textContent(label);
            } else {
                return this._element.name || this._element.id || '';
            }
        },

        /**
         * Function to parse a rules' string.
         * Ex: required|number|max_length[30]
         *
         * @method _parseRules
         * @param  {String} rules String with the rules
         * @private
         */
        _parseRules: function( rules ){
            this._rules = {};
            rules = rules.split("|");
            var i, rulesLength = rules.length, rule, params, paramStartPos ;
            if( rulesLength > 0 ){
                for( i = 0; i < rulesLength; i++ ){
                    rule = rules[i];
                    if( !rule ){
                        continue;
                    }

                    if( ( paramStartPos = rule.indexOf('[') ) !== -1 ){
                        params = rule.substr( paramStartPos+1 );
                        params = params.split(']');
                        params = params[0];
                        params = params.split(',');
                        for (var p = 0, len = params.length; p < len; p++) {
                            params[p] =
                                params[p] === 'true' ? true :
                                params[p] === 'false' ? false :
                                params[p];
                        }
                        params.splice(0,0,this.getValue());

                        rule = rule.substr(0,paramStartPos);

                        this._rules[rule] = params;
                    } else {
                        this._rules[rule] = [this.getValue()];
                    }
                }
            }
        },

        /**
         * Function to add an error to the FormElement's 'errors' object.
         * It basically receives the rule where the error occurred, the parameters passed to it (if any)
         * and the error message.
         * Then it replaces some tokens in the message for a more 'custom' reading
         *
         * @method _addError
         * @param  {Object} opt Options object, containing either `rule` or `message`, below:
         * @param  {String} [rule] The rule that called for this error. Used to find a message.
         * @param  {String} [messag] The raw error message.
         * @private
         * @static
         */
        _addError: function(opt){
            if (typeof opt === 'string') { opt = { rule: opt }; }
            var rule = opt.rule;
            var message = opt.message;

            if (!message && !rule) { throw new Error('FormElement#_addError: Please pass an error message, or a rule that was broken'); }

            if (!message) {
                var params = this._rules[rule] || [];

                var paramObj = {
                    field: this._options.label,
                    value: this.getValue()
                };

                for( var i = 1; i < params.length; i++ ){
                    paramObj['param' + i] = params[i];
                }

                var i18nKey = 'formvalidator.' + rule;

                if (this._options.error) {
                    message = this._options.error;
                } else {
                    message = this._options.form.getI18n().text(i18nKey, paramObj);

                    if (message === i18nKey) {
                        message = '[Validation message not found for rule ]' + rule;
                    }
                }
            }

            this._errors[rule] = message;
        },

        /**
         * Gets an element's value
         *
         * @method getValue
         * @return {mixed} The DOM Element's value
         * @public
         */
        getValue: function(){
            return getValue(this._element);
        },

        /**
         * Gets this FormElement's display label, as passed to the error messages.
         *
         * @method getLabel
         * @return {String} The label string, from the name, id or data-label
         **/
        getLabel: function () {
            return this._options.label;
        },

        /**
         * Gets the constructed errors' object.
         *
         * @method getErrors
         * @return {Object} Errors' object
         * @public
         */
        getErrors: function(){
            return this._errors;
        },

        /**
         * Gets the DOM element related to the instance.
         *
         * @method getElement
         * @return {Object} DOM Element
         * @public
         */
        getElement: function(){
            return this._element;
        },

        /**
         * Gets other elements in the same form.
         *
         * @method getFormElements
         * @return {Object} A mapping of keys to other elements in this form.
         * @public
         */
        getFormElements: function () {
            return this._options.form._formElements;
        },

        /**
         * Sets the rules string (just as passed in data-rules) of this FormElement.
         *
         * Use this if a form's rules need to be dynamically modified.
         *
         * @method setRules
         * @param {String} rulesStr String with rules
         * @return {void}
         * @public
         **/
        setRules: function (rulesStr) {
            this._options.rules = rulesStr;
        },

        /**
         * Forcefully mark this FormElement as invalid. Use unsetInvalid() to remove this forced invalidation.
         *
         * @method forceInvalid
         * @param {String} [message='(a generic error string)'] The error message to show.
         **/
        forceInvalid: function (message) {
            this._forceInvalid = message ?
                message :
                this._options.form.getI18n().text('formvalidator.generic_error', { field: this.getLabel() });
        },

        /**
         * Undo a forceInvalid() call on this FormElement.
         *
         * @method unforceInvalid
         * @return {void}
         * @public
         **/
        unforceInvalid: function () {
            this._forceInvalid = null;
        },

        /**
         * Forcefully mark this FormElement as valid
         *
         * @method forceValid
         * @return {void}
         * @public
         *
         **/
        forceValid: function() {
            this._forceValid = true;
        },

        /**
         * Undo a forceValid() call
         *
         * @method unforceValid
         * @return {void}
         * @public
         **/
        unforceValid: function() {
            this._forceValid = false;
        },

        /**
         * Returns the element which gets the .validation.error classes. Might not exist.
         *
         * @method getControlGroup
         * @return {Element|void}
         * @public
         **/
        getControlGroup: function () {
            if( Css.hasClassName(this._element, 'control-group') ){
                return this._element;
            } else {
                return Element.findUpwardsByClass(this._element, 'control-group');
            }
        },

        /**
         * Returns the .control element. Might not exist
         *
         * @method getControl
         * @return {Element|void}
         * @public
         **/
        getControl: function () {
            if( Css.hasClassName(this._element, 'control-group') ){
                return Ink.s('.control', this._element) || undefined;
            } else {
                return Element.findUpwardsByClass(this._element, 'control');
            }
        },

        /**
         * Remove error marking and any error paragraphs
         *
         * @method removeErrors
         * @return {void}
         * @public
         **/
        removeErrors: function() {
            var controlGroup = this.getControlGroup();
            if (controlGroup) {
                Css.removeClassName(controlGroup, ['validation', 'error']);
            }
            if (this._errorParagraph) {
                Element.remove(this._errorParagraph);
            }
        },

        /**
         * Displays error messages and marks as invalid, if this is invalid.
         *
         * @method displayErrors
         * @return {void}
         * @public
         **/
        displayErrors: function() {
            this.validate();
            this.removeErrors();

            var errors = this.getErrors();
            var errorArr = [];
            for (var k in errors) {
                if (errors.hasOwnProperty(k)) {
                    errorArr.push(errors[k]);
                }
            }

            if (!errorArr.length) { return; }

            var controlGroupElement = this.getControlGroup();
            var controlElement = this.getControl();

            if(controlGroupElement) {
                Css.addClassName( controlGroupElement, ['validation', 'error'] );
            }

            var paragraph = document.createElement('p');
            Css.addClassName(paragraph, 'tip');
            if (controlElement || controlGroupElement) {
                (controlElement || controlGroupElement).appendChild(paragraph);
            } else {
                Element.insertAfter(paragraph, this._element);
            }

            paragraph.innerHTML = errorArr.join('<br/>');
            this._errorParagraph = paragraph;
        },

        /**
         * Validates the element based on the rules defined.
         * It parses the rules defined in the _options.rules property.
         *
         * @method validate
         * @return {Boolean} True if every rule was valid. False if one fails.
         * @public
         */
        validate: function(){
            if (this._forceValid) {
                /* The user says it's valid */
                this._errors = {};
                return true;
            }

            if (this._element.disabled) {
                return true;
            }

            if (this._forceInvalid) {
                /* The user says it's invalid */
                this._addError({ message: this._forceInvalid });
                return false;
            }

            this._errors = {};

            if (this._options.autoReparse) {
                var rules = this._element.getAttribute('data-rules');
                if (rules) {
                    this._options.rules = rules;
                } else if (this._elementHadDataRules && !this._element.hasAttribute('data-rules')) {
                    // Element had [data-rules], but it was removed.
                    // Which means it is actually valid.
                    return true;
                }
            }

            this._parseRules( this._options.rules );

            // We want to validate this field only if it's not empty
            // "" is not an invalid number.
            var doValidate = this.getValue() !== '' ||
                // If it's required it will be validated anyway.
                ("required" in this._rules) ||
                // If it has a "matches" rule it will also be validated because "" is not a valid password confirmation.
                ("matches" in this._rules);

            if (doValidate) {
                for(var rule in this._rules) {
                    if (this._rules.hasOwnProperty(rule)) {
                        if( (typeof validationFunctions[rule] === 'function') ){
                            if( validationFunctions[rule].apply(this, this._rules[rule] ) === false ){
                                this._addError({ rule: rule });
                                return false;
                            }

                        } else {
                            Ink.warn('Rule "' + rule + '" not found. Used in element:', this._element);
                            this._addError({
                                message: this._options.form.getI18n().text('formvalidator.generic_error', { field: this.getLabel() })
                            });
                            return false;
                        }
                    }
                }
            }

            return true;

        }
    };

    Common.createUIComponent(FormElement);


    /**
     * @class FormValidator_2
     * @constructor
     * @param {String|Element}      selector                        Either a CSS Selector string, or the form's Element
     * @param {Object}              [options]                       Options object, containing the following options:
     * @param {String}              [options.lang]                  Set the language of the error messages. This internally sets the lang of our Ink.Util.I18n instance. pt_PT and en_US are available, but using getI18n().append({ lang_CODE: {...} }) you can create your own language.
     * @param {String}              [options.eventTrigger]          Event that will trigger the validation. Defaults to 'submit'.
     * @param {Boolean}             [options.neverSubmit]           Flag to cancel the submit event. Use this to avoid submitting the form.
     * @param {Selector}            [options.searchFor]             Selector containing the validation data-attributes. Defaults to 'input, select, textarea, .control-group'.
     * @param {Function}            [options.beforeValidation]      Callback to be executed before validating the form. Takes { validator (this FormValidator), elements (Object containing arrays of FormElement) } as an argument. Use this callback to preemptively mark fields as invalid or valid using forceInvalid or forceValid.
     * @param {Boolean}             [options.autoReparse]           Set to `true` to reparse data-rules in input elements every time this is submitted.
     * @param {Function}            [options.extraValidation]       Use this callback to perform extra validation on the form. Useful for cross-validation of several fields, for example. Takes { validator (this FormValidator), elements (Object containing arrays of FormElement), errorCount (errors the form had before calling the function) } as an argument, and is called at the end of validate(). Return false to force the form to be invalid. You are responsible for showing any visual feedback to the user for now. This might change later.
     * @param {Function}            [options.onError]               Validation error callback
     * @param {Function}            [options.onSuccess]             Validation success callback
     *
     * @sample Ink_UI_FormValidator_2.html
     */
    function FormValidator(){
        Common.BaseUIComponent.apply(this, arguments);
    }

    FormValidator._name = 'FormValidator_1';

    FormValidator._optionDefinition = {
        lang: ['String', null],
        eventTrigger: ['String', 'submit'],
        neverSubmit: ['Boolean', false],
        autoReparse: ['Boolean', false],
        searchFor: ['String', 'input, select, textarea, .control-group'],
        beforeValidation: ['Function', undefined],
        onError: ['Function', undefined],
        onSuccess: ['Function', undefined],
        extraValidation: ['Function', undefined]
    };

    /**
     * Sets or modifies validation functions
     *
     * @method setRule
     * @param {String}   name         Name of the function. E.g. 'required'
     * @param {String}   errorMessage Error message to be displayed in case of returning false. E.g. 'Oops, you passed {param1} as parameter1, lorem ipsum dolor...'
     * @param {Function} cb           Function to be executed when calling this rule
     * @return {void}
     * @public
     * @static
     */
    FormValidator.setRule = function( name, errorMessage, cb ){
        validationFunctions[ name ] = cb;
        if (validationMessages.getKey('formvalidator.' + name) !== errorMessage) {
            var langObj = {}; langObj['formvalidator.' + name] = errorMessage;
            var dictObj = {}; dictObj[validationMessages.lang()] = langObj;
            validationMessages.append(dictObj);
        }
    };

    /**
     * Gets the i18n object in charge of the error messages
     *
     * @method getI18n
     * @static
     * @return {Ink.Util.I18n} The i18n object the FormValidator is using.
     * @public
     */
    FormValidator.getI18n = function () {
        return validationMessages;
    };

    /**
     * Sets the I18n object for validation error messages
     *
     * @method setI18n
     * @static
     * @param {Ink.Util.I18n} i18n  The I18n object.
     * @return {void}
     * @public
     */
    FormValidator.setI18n = function (i18n) {
        validationMessages = i18n;
    };

   /**
     * Add to the I18n dictionary.
     * See `Ink.Util.I18n.append()` documentation.
     *
     * @method appendI18n
     * @return {void}
     * @static
     * @public
     */
    FormValidator.appendI18n = function () {
        validationMessages.append.apply(validationMessages, [].slice.call(arguments));
    };

    /**
     * Sets the language of the error messages.
     * pt_PT and en_US are available, but you can add new languages by using append()
     *
     * See the `Ink.Util.I18n.lang()` setter
     *
     * @method setLanguage
     * @param {Ink.Util.I18n} language The language to set i18n to.
     * @return {void}
     * @static
     * @public
     */
    FormValidator.setLanguage = function (language) {
        validationMessages.lang(language);
    };

    /**
     * Method used to get the existing defined validation functions
     *
     * @method getRules
     * @return {Object} Object with the rules defined
     * @public
     * @static
     */
    FormValidator.getRules = function(){
        return validationFunctions;
    };

    FormValidator.prototype = {
        _init: function(){
            /**
             * Element of the form being validated
             *
             * @property _rootElement
             * @type {Element}
             */
            this._rootElement = this._element;

            /**
             * Object that will gather the form elements by name
             *
             * @property _formElements
             * @type {Object}
             */
            this._formElements = {};

            /**
             * Error message Elements
             * 
             * @property _errorMessages
             */
            this._errorMessages = [];

            /**
             * Array of FormElements marked with validation errors
             *
             * @property _markedErrorElements
             */
            this._markedErrorElements = [];

            // Sets an event listener for a specific event in the form, if defined.
            // By default is the 'submit' event.
            if( typeof this._options.eventTrigger === 'string' ){
                Event.observe(
                    this._rootElement,
                    this._options.eventTrigger,
                    Ink.bindEvent(this.validate,this) );
            }

            if (this._options.lang) {
                this.setLanguage(this._options.lang);
            }
        },

        /**
         * Searches for the elements in the form.
         * This method is based in the this._options.searchFor configuration.
         *
         * Returns an object mapping names of object to arrays of FormElement instances.
         *
         * @method getElements
         * @return {Object} An object with the elements in the form, indexed by name/id
         * @public
         */
        getElements: function(){
            if (!this._formElements) {
                this._formElements = {};
            }
            var i;
            for (var k in this._formElements) if (this._formElements.hasOwnProperty(k)) {
                i = this._formElements[k].length;
                while (i--) {
                    if (!Element.isAncestorOf(document.documentElement,
                            this._formElements[k][i]._element)) {
                        // Element was detached from DOM, remove its formElement from our roster.
                        this._formElements[k][i].removeErrors();
                        this._formElements[k].splice(i, 1);
                    }
                }
                // Check if formElement was removed.
                if (this._formElements[k].length === 0) {
                    delete this._formElements[k];
                }
            }
            var formElements = Selector.select( this._options.searchFor, this._rootElement );

            for(i=0; i<formElements.length; i+=1 ){
                var element = formElements[i];

                var dataAttrs = Element.data( element );

                if( !("rules" in dataAttrs) ){
                    continue;
                }

                var options = {
                    form: this
                };

                var key;
                if( ("name" in element) && element.name ){
                    key = element.name;
                } else if( ("id" in element) && element.id ){
                    key = element.id;
                } else {
                    key = 'element_' + Math.floor(Math.random()*100);
                    element.id = key;
                }

                if( !(key in this._formElements) ){
                    this._formElements[key] = [];
                }

                var formElement = this._getOrCreateFormElementInstance(key, element, options);

                if (formElement) {
                    this._formElements[key].push(formElement);
                }
            }

            return this._formElements;
        },

        _getOrCreateFormElementInstance: function (key, element, options) {
            for (var j = 0; j < this._formElements[key].length; j++) {
                if (this._formElements[key][j].getElement() === element) {
                    return null;
                }
            }
            if (!element.getAttribute('data-auto-reparse')) {
                options.autoReparse = this._options.autoReparse;
            }
            return new FormElement(element, options);
        },

        /**
         * Set my I18n instance with the validation messages.
         * @method setI18n
         * @param {Ink.Util.I18n_1} i18n I18n instance
         **/
        setI18n: function (i18n) {
            if (i18n.clone) {
                // New function, added safety
                i18n = i18n.clone();
            }
            this.i18n = i18n;
        },

        /**
         * Get my I18n instance with the validation messages.
         * @method getI18n
         * @return {Ink.Util.I18n_1} I18n instance
         **/
        getI18n: function () {
            return this.i18n || validationMessages;
        },

        /**
         * Set the language of this form validator to the given language code
         * If we don't have an i18n instance, create one which is a copy of the global one.
         * @method setLanguage
         * @param {String} language Language code (ex: en_US, pt_PT)
         * @return {void}
         * @public
         **/
        setLanguage: function (language) {
            if (!this.i18n) {
                this.setI18n(validationMessages);
            }
            this.i18n.lang(language);
        },

        /**
         * Gets the language code string (pt_PT or en_US for example) currently in use by this formvalidator.
         * May be global
         *
         * @method getLanguage
         * @public
         * @return {String} Language code.
         **/
        getLanguage: function () {
            return this.i18n ? this.i18n.lang() : validationMessages.lang();
        },

        /**
         * Validates every registered FormElement 
         * This method looks inside the this._formElements object for validation targets.
         * Also, based on the this._options.beforeValidation, this._options.onError, and this._options.onSuccess, this callbacks are executed when defined.
         *
         * @method validate
         * @param  {Event} event    Window.event object
         * @return {Boolean} Whether the form is considered valid
         * @public
         */
        validate: function( event ) {

            if(this._options.neverSubmit && event) {
                Event.stopDefault(event);
            }

            this.getElements();

            if( typeof this._options.beforeValidation === 'function' ){
                this._options.beforeValidation.call(this, {
                    event: event,
                    validator: this,
                    elements: this._formElements
                });
            }

            Css.removeClassName(this._element, 'form-error');

            var errorElements = [];

            for( var key in this._formElements ){
                if( this._formElements.hasOwnProperty(key) ){
                    for( var counter = 0; counter < this._formElements[key].length; counter+=1 ){
                        this._formElements[key][counter].removeErrors();
                        if( !this._formElements[key][counter].validate() ) {
                            errorElements.push(this._formElements[key][counter]);
                        }
                    }
                }
            }

            var isValid = errorElements.length === 0;

            if (typeof this._options.extraValidation === 'function') {
                var param = {
                    event: event,
                    validator: this,
                    elements: this._formElements,
                    errorCount: errorElements.length
                };
                var result = this._options.extraValidation.call(this, param);
                if (result === false) { isValid = false; }
            }
            
            if( isValid ){
                if( typeof this._options.onSuccess === 'function' ){
                    this._options.onSuccess();
                }
            } else {
                if(event) {
                    Event.stopDefault(event);
                }

                if( typeof this._options.onError === 'function' ){
                    this._options.onError( errorElements );
                }

                this._invalid(errorElements);
            }

            return isValid;
        },

        _invalid: function (errorElements) {
            errorElements = errorElements || [];
            this._errorMessages = [];

            Css.addClassName(this._element, 'form-error');

            for (var i = 0; i < errorElements.length; i++) {
                errorElements[i].displayErrors();
            }
        }
    };

    Common.createUIComponent(FormValidator);

    FormValidator.FormElement = FormElement;  // Export FormElement too, for testing.
    FormValidator.validationFunctions = validationFunctions;  // Export the raw validation functions too, for fiddling.

    return FormValidator;

});
