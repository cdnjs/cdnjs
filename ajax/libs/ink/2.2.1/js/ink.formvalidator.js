/**
 * @module Ink.UI.FormValidator_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.FormValidator', '1', ['Ink.Dom.Css_1','Ink.Util.Validator_1'], function( Css, InkValidator ) {
    'use strict';

    /**
     * @class Ink.UI.FormValidator
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
        _errorClassName: 'tip',

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
         * Check if a form is valid or not
         * 
         * @method validate
         * @param {DOMElement|String} elm DOM form element or form id
         * @param {Object} options Options for
         *      @param {Function} [options.onSuccess] function to run when form is valid
         *      @param {Function} [options.onError] function to run when form is not valid
         *      @param {Array} [options.customFlag] custom flags to use to validate form fields
         * @public
         * @return {Boolean}
         */
        validate: function(elm, options)
        {
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
         * Reset previously generated validation errors
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

            this.elements[this.element.id] = [];
            this.confirmElms[this.element.id] = [];
            //console.log(this.element);
            //console.log(this.element.elements);
            var formElms = this.element.elements;
            var curElm = false;
            for(var i=0, totalElm = formElms.length; i < totalElm; i++) {
                curElm = formElms[i];

                if(curElm.getAttribute('type') !== null && curElm.getAttribute('type').toLowerCase() === 'radio') {
                    if(this.elements[this.element.id].length === 0 ||
                            (
                             curElm.getAttribute('type') !== this.elements[this.element.id][(this.elements[this.element.id].length - 1)].getAttribute('type') &&
                            curElm.getAttribute('name') !== this.elements[this.element.id][(this.elements[this.element.id].length - 1)].getAttribute('name')
                            )) {
                        for(var flag in this._flagMap) {
                            if(Css.hasClassName(curElm, flag)) {
                                this.elements[this.element.id].push(curElm);
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
                            this.elements[this.element.id].push(curElm);
                            break;
                        }
                    }

                    if(Css.hasClassName(curElm, 'ink-fv-confirm')) {
                        this.confirmElms[this.element.id].push(curElm);
                        this.hasConfirm[this.element.id] = true;
                    }

                }
            }
            //debugger;
        },

        /**
         * Runs the validation for each element
         * 
         * @method _validateElements
         * @private
         */
        _validateElements: function()
        {
            var oGroups;
            this._getElements();
            //console.log('HAS CONFIRM', this.hasConfirm);
            if(typeof(this.hasConfirm[this.element.id]) !== 'undefined' && this.hasConfirm[this.element.id] === true) {
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
        _validateConfirmGroups: function(oGroups, errors)
        {
            //console.log(oGroups);
            var curGroup = false;
            for(var i in oGroups) {
                if (oGroups.hasOwnProperty(i)) {
                    curGroup = oGroups[i];
                    if(curGroup.length === 2) {
                        if(curGroup[0].value !== curGroup[1].value) {
                            errors.push({elm:curGroup[1], errors:['ink-fv-confirm']});
                        }
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
        _isValid: function(elm, fieldType)
        {
            switch(fieldType) {
                case 'ink-fv-required':
                    if(elm.nodeName.toLowerCase() === 'select') {
                        if(elm.selectedIndex > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    if(elm.getAttribute('type') !== 'checkbox' && elm.getAttribute('type') !== 'radio') {
                        if(this._trim(elm.value) !== '') {
                            return true;
                        }
                    } else if(elm.getAttribute('type') === 'checkbox') {
                        if(elm.checked === true) {
                            return true;
                        }
                    } else if(elm.getAttribute('type') === 'radio') { // get top radio
                        var aFormRadios = elm.form[elm.name];
                        if(typeof(aFormRadios.length) === 'undefined') {
                            aFormRadios = [aFormRadios];
                        }
                        var isChecked = false;
                        for(var i=0, totalRadio = aFormRadios.length; i < totalRadio; i++) {
                            if(aFormRadios[i].checked === true) {
                                isChecked = true;
                            }
                        }
                        return isChecked;
                    }
                    break;

                case 'ink-fv-email':
                    if(this._trim(elm.value) === '') {
                        if(Css.hasClassName(elm, 'ink-fv-required')) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        if(InkValidator.mail(elm.value)) {
                            return true;
                        }
                    }
                    break;
                case 'ink-fv-url':
                    if(this._trim(elm.value) === '') {
                        if(Css.hasClassName(elm, 'ink-fv-required')) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        if(InkValidator.url(elm.value)) {
                            return true;
                        }
                    }
                    break;
                case 'ink-fv-number':
                    if(this._trim(elm.value) === '') {
                        if(Css.hasClassName(elm, 'ink-fv-required')) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        if(!isNaN(Number(elm.value))) {
                            return true;
                        }
                    }
                    break;
                case 'ink-fv-phone_pt':
                    if(this._trim(elm.value) === '') {
                        if(Css.hasClassName(elm, 'ink-fv-required')) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        if(InkValidator.isPTPhone(elm.value)) {
                            return true;
                        }
                    }
                    break;
                case 'ink-fv-phone_cv':
                    if(this._trim(elm.value) === '') {
                        if(Css.hasClassName(elm, 'ink-fv-required')) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        if(InkValidator.isCVPhone(elm.value)) {
                            return true;
                        }
                    }
                    break;
                case 'ink-fv-phone_ao':
                    if(this._trim(elm.value) === '') {
                        if(Css.hasClassName(elm, 'ink-fv-required')) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        if(InkValidator.isAOPhone(elm.value)) {
                            return true;
                        }
                    }
                    break;
                case 'ink-fv-phone_mz':
                    if(this._trim(elm.value) === '') {
                        if(Css.hasClassName(elm, 'ink-fv-required')) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        if(InkValidator.isMZPhone(elm.value)) {
                            return true;
                        }
                    }
                    break;
                case 'ink-fv-date':
                    if(this._trim(elm.value) === '') {
                        if(Css.hasClassName(elm, 'ink-fv-required')) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        var Element = Ink.getModule('Ink.Dom.Element',1);
                        var dataset = Element.data( elm );
                        var validFormat = 'yyyy-mm-dd';

                        if( Css.hasClassName(elm, 'ink-datepicker') && ("format" in dataset) ){
                            validFormat = dataset.format;
                        } else if( ("validFormat" in dataset) ){
                            validFormat = dataset.validFormat;
                        }

                        if( !(validFormat in InkValidator._dateParsers ) ){
                            var validValues = [];
                            for( var val in InkValidator._dateParsers ){
                                if (InkValidator._dateParsers.hasOwnProperty(val)) {
                                    validValues.push(val);
                                }
                            }
                            throw "The attribute data-valid-format must be one of the following values: " + validValues.join(',');
                        }
                        
                        return InkValidator.isDate( validFormat, elm.value );
                    }
                    break;
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
        _showError: function(formElm, aFail)
        {
            this._clearError(formElm);

            //ink-warning-field

            //console.log(aFail);
            var curElm = false;
            for(var i=0, tFail = aFail.length; i < tFail; i++) {
                curElm = aFail[i].elm;

                if(curElm.getAttribute('type') !== 'radio') {

                    var newLabel = document.createElement('p');
                    //newLabel.setAttribute('for',curElm.id);
                    //newLabel.className = this._errorClassName;
                    //newLabel.className += ' ' + this._errorTypeErrorClassName;
                    Css.addClassName(newLabel, this._errorClassName);
                    Css.addClassName(newLabel, this._errorTypeErrorClassName);
                    if(aFail[i].errors[0] !== 'ink-fv-custom') {
                        newLabel.innerHTML = this._flagMap[aFail[i].errors[0]].msg;
                    } else {
                        newLabel.innerHTML = aFail[i].custom[0].msg;
                    }

                    if(curElm.getAttribute('type') !== 'checkbox') {
                        curElm.nextSibling.parentNode.insertBefore(newLabel, curElm.nextSibling);
                        if(Css.hasClassName(curElm.parentNode, 'control')) {
                            Css.addClassName(curElm.parentNode.parentNode, 'validation');
                            if(aFail[i].errors[0] === 'ink-fv-required') {
                                Css.addClassName(curElm.parentNode.parentNode, 'error');
                            } else {
                                Css.addClassName(curElm.parentNode.parentNode, 'warning');
                            }
                        }
                    } else {
                        /* // TODO checkbox... does not work with this CSS
                        curElm.parentNode.appendChild(newLabel);
                        if(Css.hasClassName(curElm.parentNode.parentNode, 'control-group')) {
                            Css.addClassName(curElm.parentNode.parentNode, 'control');
                            Css.addClassName(curElm.parentNode.parentNode, 'validation');
                            Css.addClassName(curElm.parentNode.parentNode, 'error');
                        }*/
                    }
                } else {
                    if(Css.hasClassName(curElm.parentNode.parentNode, 'control-group')) {
                        Css.addClassName(curElm.parentNode.parentNode, 'validation');
                        Css.addClassName(curElm.parentNode.parentNode, 'error');
                    }
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
        _clearError: function(formElm)
        {
            //return;
            var aErrorLabel = formElm.getElementsByTagName('p');

            var curElm = false;
            for(var i = (aErrorLabel.length - 1); i >= 0; i--) {
                curElm = aErrorLabel[i];
                if(Css.hasClassName(curElm, this._errorClassName)) {
                    if(Css.hasClassName(curElm.parentNode, 'control')) {
                        Css.removeClassName(curElm.parentNode.parentNode, 'validation');
                        Css.removeClassName(curElm.parentNode.parentNode, 'error');
                        Css.removeClassName(curElm.parentNode.parentNode, 'warning');
                    }

                    if(Css.hasClassName(curElm,'tip') && Css.hasClassName(curElm,'error')){
                        curElm.parentNode.removeChild(curElm);
                    }
                }
            }

            var aErrorLabel2 = formElm.getElementsByTagName('ul');
            for(i = (aErrorLabel2.length - 1); i >= 0; i--) {
                curElm = aErrorLabel2[i];
                if(Css.hasClassName(curElm, 'control-group')) {
                    Css.removeClassName(curElm, 'validation');
                    Css.removeClassName(curElm, 'error');
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
