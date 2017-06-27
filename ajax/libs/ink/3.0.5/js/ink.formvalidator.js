/**
 * Form Validation
 * @module Ink.UI.FormValidator_1
 * @version 1
 **/

Ink.createModule('Ink.UI.FormValidator', '1', ['Ink.Dom.Element_1', 'Ink.Dom.Css_1','Ink.Util.Validator_1','Ink.Dom.Selector_1'], function( InkElement, Css, InkValidator , Selector) {
    'use strict';

    function elementsWithSameName(elm) {
        if (!elm.name) { return []; }
        if (!elm.form) {
            return Selector.select('name="' + elm.name + '"');
        }
        var ret = elm.form[elm.name];
        if(typeof(ret.length) === 'undefined') {
            ret = [ret];
        }
        return ret;
    }
    /**
     * @namespace Ink.UI.FormValidator
     * @version 1
     */
    var FormValidator = {

        /**
         * Specifies the version of the component
         *
         * @property version
         * @type {String}
         * @readOnly
         * @public
         */
        version: '1',

        /**
         * Available flags to use in the validation process.
         * The keys are the 'rules', and their values are objects with the key 'msg', determining
         * what is the error message.
         *
         * @property _flagMap
         * @type {Object}
         * @readOnly
         * @private
         */
        _flagMap: {
            //'ink-fv-required': {msg: 'Campo obrigat&oacute;rio'},
            'ink-fv-required': {msg: 'Required field'},
            //'ink-fv-email': {msg: 'E-mail inv&aacute;lido'},
            'ink-fv-email': {msg: 'Invalid e-mail address'},
            //'ink-fv-url': {msg: 'URL inv&aacute;lido'},
            'ink-fv-url': {msg: 'Invalid URL'},
            //'ink-fv-number': {msg: 'N&uacute;mero inv&aacute;lido'},
            'ink-fv-number': {msg: 'Invalid number'},
            //'ink-fv-phone_pt': {msg: 'N&uacute;mero de telefone inv&aacute;lido'},
            'ink-fv-phone_pt': {msg: 'Invalid phone number'},
            //'ink-fv-phone_cv': {msg: 'N&uacute;mero de telefone inv&aacute;lido'},
            'ink-fv-phone_cv': {msg: 'Invalid phone number'},
            //'ink-fv-phone_mz': {msg: 'N&uacute;mero de telefone inv&aacute;lido'},
            'ink-fv-phone_mz': {msg: 'Invalid phone number'},
            //'ink-fv-phone_ao': {msg: 'N&uacute;mero de telefone inv&aacute;lido'},
            'ink-fv-phone_ao': {msg: 'Invalid phone number'},
            //'ink-fv-date': {msg: 'Data inv&aacute;lida'},
            'ink-fv-date': {msg: 'Invalid date'},
            //'ink-fv-confirm': {msg: 'Confirma&ccedil;&atilde;o inv&aacute;lida'},
            'ink-fv-confirm': {msg: 'Confirmation does not match'},
            'ink-fv-custom': {msg: ''}
        },

        /**
         * This property holds all form elements for later validation
         *
         * @property elements
         * @type {Object}
         * @public
         */
        elements: {},

        /**
         * This property holds the objects needed to cross-check for the 'confirm' rule
         *
         * @property confirmElms
         * @type {Object}
         * @public
         */
        confirmElms: {},

        /**
         * This property holds the previous elements in the confirmElms property, but with a
         * true/false specifying if it has the class ink-fv-confirm.
         *
         * @property hasConfirm
         * @type {Object}
         */
        hasConfirm: {},

        /**
         * Defined class name to use in error messages label
         *
         * @property _errorClassName
         * @type {String}
         * @readOnly
         * @private
         */
        _errorClassName: 'tip error',

        /**
         * @property _errorValidationClassName
         * @type {String}
         * @readOnly
         * @private
         */
        _errorValidationClassName: 'validaton',

        /**
         * @property _errorTypeWarningClassName
         * @type {String}
         * @readOnly
         * @private
         */
        _errorTypeWarningClassName: 'warning',

        /**
         * @property _errorTypeErrorClassName
         * @type {String}
         * @readOnly
         * @private
         */
        _errorTypeErrorClassName: 'error',

        /**
         * Checks if a form is valid
         * 
         * @method validate
         * @param {DOMElement|String}   elm                     DOM form element or form id
         * @param {Object}              options                 Configuration options
         * @param {Function}            [options.onSuccess]     Callback to run when form is valid
         * @param {Function}            [options.onError]       Callback to run when form is not valid
         * @param {Array}               [options.customFlag]    Custom flags to use to validate form fields
         * @public
         * @return {Boolean} Whether the form is deemed valid or not.
         *
         * @sample Ink_UI_FormValidator_1.html
         */
        validate: function(elm, options) {
            this._free();

            options = Ink.extendObj({
                onSuccess: false,
                onError: false,
                customFlag: false,
                confirmGroup: []
            }, options || {});

            if(typeof(elm) === 'string') {
                elm = document.getElementById(elm);
            }
            if(elm === null){
                return false;
            }
            this.element = elm;

            if(typeof(this.element.id) === 'undefined' || this.element.id === null || this.element.id === '') {
                // generate a random ID
                // TODO ugly and potentially problematic, and you know Murphy's law.
                this.element.id = 'ink-fv_randomid_'+(Math.round(Math.random() * 99999));
            }

            this.custom = options.customFlag;

            this.confirmGroup = options.confirmGroup;

            var fail = this._validateElements();

            if(fail.length > 0) {
                if(options.onError) {
                    options.onError(fail);
                } else {
                    this._showError(elm, fail);
                }
                return false;
            } else {
                if(!options.onError) {
                    this._clearError(elm);
                }
                this._clearCache();
                if(options.onSuccess) {
                    options.onSuccess();
                }
                return true;
            }

        },

        /**
         * Resets previously generated validation errors
         * 
         * @method reset
         * @public
         */
        reset: function()
        {
            this._clearError();
            this._clearCache();
        },

        /**
         * Cleans the object
         * 
         * @method _free
         * @private
         */
        _free: function()
        {
            this.element = null;
            //this.elements = [];
            this.custom = false;
            this.confirmGroup = false;
        },

        /**
         * Cleans the properties responsible for caching
         * 
         * @method _clearCache
         * @private
         */
        _clearCache: function()
        {
            this.element = null;
            this.elements = [];
            this.custom = false;
            this.confirmGroup = false;
        },

        /**
         * Gets the form elements and stores them in the caching properties
         * 
         * @method _getElements
         * @private
         */
        _getElements: function()
        {
            //this.elements = [];
            // if(typeof(this.elements[this.element.id]) !== 'undefined') {
            //     return;
            // }

            var elements = this.elements[this.element.id] = [];
            this.confirmElms[this.element.id] = [];
            //console.log(this.element);
            //console.log(this.element.elements);
            var formElms = Selector.select(':input', this.element);
            var curElm = false;
            for(var i=0, totalElm = formElms.length; i < totalElm; i++) {
                curElm = formElms[i];
                var type = (curElm.getAttribute('type') + '').toLowerCase();

                if (type === 'radio' || type === 'checkbox') {
                    if(elements.length === 0 ||
                            (
                             curElm.getAttribute('type') !== elements[elements.length - 1].getAttribute('type') &&
                            curElm.getAttribute('name') !== elements[elements.length - 1].getAttribute('name')
                            )) {
                        for(var flag in this._flagMap) {
                            if(Css.hasClassName(curElm, flag)) {
                                elements.push(curElm);
                                break;
                            }
                        }
                    }
                } else {
                    for(var flag2 in this._flagMap) {
                        if(Css.hasClassName(curElm, flag2) && flag2 !== 'ink-fv-confirm') {
                            /*if(flag2 == 'ink-fv-confirm') {
                                this.confirmElms[this.element.id].push(curElm);
                                this.hasConfirm[this.element.id] = true;
                            }*/
                            elements.push(curElm);
                            break;
                        }
                    }

                    if(Css.hasClassName(curElm, 'ink-fv-confirm')) {
                        this.confirmElms[this.element.id].push(curElm);
                        this.hasConfirm[this.element.id] = true;
                    }

                }
            }
        },

        /**
         * Runs the validation for each element
         * 
         * @method _validateElements
         * @private
         */
        _validateElements: function() {
            var oGroups;
            this._getElements();
            if(this.hasConfirm[this.element.id] === true) {
                oGroups = this._makeConfirmGroups();
            }

            var errors = [];

            var curElm = false;
            var customErrors = false;
            var inArray;
            for(var i=0, totalElm = this.elements[this.element.id].length; i < totalElm; i++) {
                inArray = false;
                curElm = this.elements[this.element.id][i];

                if(!curElm.disabled) {
                    for(var flag in this._flagMap) {
                        if(Css.hasClassName(curElm, flag)) {
                            if(flag !== 'ink-fv-custom' && flag !== 'ink-fv-confirm') {
                                if(!this._isValid(curElm, flag)) {
                                    if(!inArray) {
                                        errors.push({elm: curElm, errors:[flag]});
                                        inArray = true;
                                    } else {
                                        errors[(errors.length - 1)].errors.push(flag);
                                    }
                                }
                            } else if(flag !== 'ink-fv-confirm'){
                                customErrors = this._isCustomValid(curElm);
                                if(customErrors.length > 0) {
                                    errors.push({elm: curElm, errors:[flag], custom: customErrors});
                                }
                            } else if(flag === 'ink-fv-confirm'){
                                continue;
                            }
                        }
                    }
                }
            }
            errors = this._validateConfirmGroups(oGroups, errors);
            //console.log(InkDumper.returnDump(errors));
            return errors;
        },

        /**
         * Runs the 'confirm' validation for each group of elements
         * 
         * @method _validateConfirmGroups
         * @param {Array} oGroups Array/Object that contains the group of confirm objects
         * @param {Array} errors Array that will store the errors
         * @private
         * @return {Array} Array of errors that was passed as 2nd parameter (either changed, or not, depending if errors were found).
         */
        _validateConfirmGroups: function(oGroups, errors) {
            //console.log(oGroups);
            var curGroup = false;
            for(var i in oGroups) if (oGroups.hasOwnProperty(i)) {
                curGroup = oGroups[i];
                if(curGroup.length === 2) {
                    if(curGroup[0].value !== curGroup[1].value) {
                        errors.push({elm:curGroup[1], errors:['ink-fv-confirm']});
                    }
                }
            }
            return errors;
        },

        /**
         * Creates the groups of 'confirm' objects
         * 
         * @method _makeConfirmGroups
         * @private
         * @return {Array|Boolean} Returns the array of confirm elements or false on error.
         */
        _makeConfirmGroups: function()
        {
            var oGroups;
            if(this.confirmGroup && this.confirmGroup.length > 0) {
                oGroups = {};
                var curElm = false;
                var curGroup = false;
                //this.confirmElms[this.element.id];
                for(var i=0, total=this.confirmElms[this.element.id].length; i < total; i++) {
                    curElm = this.confirmElms[this.element.id][i];
                    for(var j=0, totalG=this.confirmGroup.length; j < totalG; j++) {
                        curGroup =  this.confirmGroup[j];
                        if(Css.hasClassName(curElm, curGroup)) {
                            if(typeof(oGroups[curGroup]) === 'undefined') {
                                oGroups[curGroup] = [curElm];
                            } else {
                                oGroups[curGroup].push(curElm);
                            }
                        }
                    }
                }
                return oGroups;
            } else {
                if(this.confirmElms[this.element.id].length === 2) {
                    oGroups = {
                        "ink-fv-confirm": [
                            this.confirmElms[this.element.id][0],
                            this.confirmElms[this.element.id][1]
                        ]
                    };
                }
                return oGroups;
            }
            return false;
        },

        /**
         * Validates an element with a custom validation
         * 
         * @method _isCustomValid
         * @param {DOMElemenmt} elm Element to be validated
         * @private
         * @return {Array} Array of errors. If no errors are found, results in an empty array.
         */
        _isCustomValid: function(elm)
        {
            var customErrors = [];
            var curFlag = false;
            for(var i=0, tCustom = this.custom.length; i < tCustom; i++) {
                curFlag = this.custom[i];
                if(Css.hasClassName(elm, curFlag.flag)) {
                    if(!curFlag.callback(elm, curFlag.msg)) {
                        customErrors.push({flag: curFlag.flag, msg: curFlag.msg});
                    }
                }
            }
            return customErrors;
        },

        /**
         * Runs the normal validation functions for a specific element
         * 
         * @method _isValid
         * @param {DOMElement} elm DOMElement that will be validated
         * @param {String} fieldType Rule to be validated. This must be one of the keys present in the _flagMap property.
         * @private
         * @return {Boolean} The result of the validation.
         */
        _isValid: function(elm, fieldType) {
            var nodeName = elm.nodeName.toLowerCase();
            var inputType = (elm.getAttribute('type') || '').toLowerCase();
            var value = this._trim(elm.value);

            // When we're analyzing emails, telephones, etc, and the field is
            // empty, we check if it is required. If not required, it's valid.
            if (fieldType !== 'ink-fv-required' &&
                    inputType !== 'checkbox' && inputType !== 'radio' &&
                    value === '') {
                return !Css.hasClassName(elm, 'ink-fv-required');
            }

            switch(fieldType) {
                case 'ink-fv-required':
                    if(nodeName === 'select') {
                        if(elm.selectedIndex > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    if(inputType !== 'checkbox' && inputType !== 'radio' &&
                            value !== '') {
                        return true;  // A input type=text,email,etc.
                    } else if(inputType === 'checkbox' || inputType === 'radio') {
                        var aFormRadios = elementsWithSameName(elm);
                        var isChecked = false;
                        // check if any input of the radio is checked
                        for(var i=0, totalRadio = aFormRadios.length; i < totalRadio; i++) {
                            if(aFormRadios[i].checked === true) {
                                isChecked = true;
                                break;
                            }
                        }
                        return isChecked;
                    }
                    return false;

                case 'ink-fv-email':
                    return InkValidator.mail(elm.value);

                case 'ink-fv-url':
                    return InkValidator.url(elm.value);

                case 'ink-fv-number':
                    return !isNaN(Number(elm.value)) && isFinite(Number(elm.value));

                case 'ink-fv-phone_pt':
                    return InkValidator.isPTPhone(elm.value);

                case 'ink-fv-phone_cv':
                    return InkValidator.isCVPhone(elm.value);

                case 'ink-fv-phone_ao':
                    return InkValidator.isAOPhone(elm.value);

                case 'ink-fv-phone_mz':
                    return InkValidator.isMZPhone(elm.value);

                case 'ink-fv-date':
                    var Element = Ink.getModule('Ink.Dom.Element',1);
                    var dataset = Element.data( elm );
                    var validFormat = 'yyyy-mm-dd';

                    if( Css.hasClassName(elm, 'ink-datepicker') && ('format' in dataset) ){
                        validFormat = dataset.format;
                    } else if( ('validFormat' in dataset) ){
                        validFormat = dataset.validFormat;
                    }

                    if( !(validFormat in InkValidator._dateParsers ) ){
                        var validValues = [];
                        for( var val in InkValidator._dateParsers ){
                            if (InkValidator._dateParsers.hasOwnProperty(val)) {
                                validValues.push(val);
                            }
                        }
                        throw new Error(
                            'The attribute data-valid-format must be one of ' +
                            'the following values: ' + validValues.join(', '));
                    }
                    
                    return InkValidator.isDate( validFormat, elm.value );
                case 'ink-fv-custom':
                    break;
            }

            return false;
        },

        /**
         * Makes the necessary changes to the markup to show the errors of a given element
         * 
         * @method _showError
         * @param {DOMElement} formElm The form element to be changed to show the errors
         * @param {Array} aFail An array with the errors found.
         * @private
         */
        _showError: function(formElm, aFail) {
            this._clearError(formElm);

            //ink-warning-field

            //console.log(aFail);
            var curElm = false;
            for(var i=0, tFail = aFail.length; i < tFail; i++) {
                curElm = aFail[i].elm;
                if (curElm) {
                    this._showAnErrorOnElement(curElm, aFail[i]);
                }
            }
        },

        _showAnErrorOnElement: function (curElm, error) {
            /* jshint noempty:false */

            var controlGroupElm = InkElement.findUpwardsByClass(
                    curElm, 'control-group');
            var controlElm = InkElement.findUpwardsByClass(
                    curElm, 'control');

            var errorClasses = [
                this._errorClassName,
                this._errorTypeClassName].join(' ');

            var errorMsg = InkElement.create('p', {
                className: errorClasses
            });

            if(error.errors[0] !== 'ink-fv-custom') {
                errorMsg.innerHTML = this._flagMap[error.errors[0]].msg;
            } else {
                errorMsg.innerHTML = error.custom[0].msg;
            }

            var target = (controlElm || controlGroupElm);
            if (target) {
                target.appendChild(errorMsg);
            } else {
                InkElement.insertAfter(errorMsg, curElm);
            }

            if (controlElm) {
                if(error.errors[0] === 'ink-fv-required') {
                    Css.addClassName(controlGroupElm, 'validation error');
                } else {
                    Css.addClassName(controlGroupElm, 'validation warning');
                }
            }
        },

        /**
         * Clears the error of a given element. Normally executed before any validation, for all elements, as a reset.
         * 
         * @method _clearErrors
         * @param {DOMElement} formElm Form element to be cleared.
         * @private
         */
        _clearError: function(formElm) {
            //return;
            var aErrorLabel = formElm.getElementsByTagName('p');

            var curElm;
            var control;

            for(var i = (aErrorLabel.length - 1); i >= 0; i--) {
                curElm = aErrorLabel[i];
                if(Css.hasClassName(curElm, this._errorClassName)) {
                    control = InkElement.findUpwardsBySelector(curElm, '.control-group');
                    if (control) {
                        Css.removeClassName(control, ['validation', 'error', 'warning']);
                    }

                    if(Css.hasClassName(curElm, this._errorClassName, true /*both*/)) {
                        InkElement.remove(curElm);
                    }
                }
            }

            var aErrorLabel2 = formElm.getElementsByTagName('ul');
            for(i = (aErrorLabel2.length - 1); i >= 0; i--) {
                curElm = aErrorLabel2[i];
                if(Css.hasClassName(curElm, 'control-group')) {
                    Css.removeClassName(curElm, 'validation error');
                }
            }
        },

        /**
         * Removes unnecessary spaces to the left or right of a string
         * 
         * @method _trim
         * @param {String} stri String to be trimmed
         * @private
         * @return {String|undefined} String trimmed.
         */
        _trim: function(str)
        {
            if(typeof(str) === 'string')
            {
                return str.replace(/^\s+|\s+$|\n+$/g, '');
            }
        }
    };

    return FormValidator;

});