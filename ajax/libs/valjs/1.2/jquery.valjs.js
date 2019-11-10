/*! ValJS v1.2 (2015-10-09) | (c) 2015 | www.valjs.io */
/*global window, jQuery, console, setTimeout */
/*jslint bitwise: true, regexp: true */
/*Compiled via http://closure-compiler.appspot.com/home*/
/**
 * [description]
 * @param  {[type]} window [description]
 * @param  {{inArray : function()}} $      [description]
 * @return {[type]}        [description]
 */
window.ValJS = (function (window, $) {
    'use strict';

/*$.extend( $.expr[':'], 
 {
  'valjs-field' : function (a) {
   return $(a).data(dataNameValjsBinding);
  },
  'valjs-valid' : function (a) {
   return $(a).data(dataNameValjsBinding);
  },
  'valjs-invalid' : function (a) {
   var b = $(a).data(dataNameValjsBinding);
   if (b) {
    return !    b.isValid();
   }
  }
 }
);*/

    function ValjSWorker() {
        var workerCount = 0,
            callback = null;

        this.add = function () {
            workerCount += 1;
        };

        this.stopWaiting = function () {
            callback = null;
        };

        this.remove = function () {
            workerCount -= 1;
            if (workerCount < 0) {
                workerCount = 0;
            }
        };

        this.commitRemove = function () {
            if (workerCount === 0) {
                if (callback) {
                    callback();
                    // Just wait once...
                    callback = null;
                }
            }
        };

        this.wait = function (callbackFunction) {
            callback = callbackFunction;
        };

    }

    function valjsWaitForIt(fn) {
        this.vars.wfi = fn;
    }

    /** @global $ */
    var nullValue = null,
        dataNameValJsInstance = 'vjs-i',
        ValJS = function (elm, options) {
            this.valjsv = '1.1';
            this.context = elm;
            this.jqContext = $(elm);
            this.jqContext.data(dataNameValJsInstance, this);
            this.options = options;
            this.metadata = this.jqContext.data('valjs');
            this.$form = nullValue;
            this.workers = new ValjSWorker();
            this.elementUpdated = valjsElementUpdated;
            this.waitForIt = valjsWaitForIt;

            this.vars = {
                off: 'valjs__off', // data()-variable set on fields with validation disabled
                clean: {}         // will contain combinations of elements and modifiers so we can quickly clear them all
            };

            this.e = []; // Will contain bound elements, not all found elements
            this.s = [];  // Will contain submit button(s)
        },
        superglobals = (window.ValJS && window.ValJS.global) ? window.ValJS.global : {},
        dElmType = 'valjs-ty',
        wj = ValJS,

        trueValue = true,
        falseValue = false,
        submitQuery = 'input[type="submit"],button[type="submit"],button:not([type]),input[type="image"]',
        selectTypeName = 'select',

        // Stored in Binding object from 0.7.6
        dataNameValJsValueCache = 'c',
        dataNameValJsHash = 'h',
        dataNameValJsIsValid = 'v',
        dataNameValjsValidationStatus = 's',


        dataNameValJsFormContext = 'vjsf',
        dataNameValJsBound = 'vjs-b',
        dataNameValjsBinding = 'vjs-bn',
        keyNameDefault = "error",
        eventNamespace = '.valjs',

        ruleNameWeek = 'week',
        ruleNameDate = 'date',
        ruleNameDateTime = 'datetime',
        rulenameNumber = 'number',
        ruleNameListMax = 'listmax',
        ruleNameListMin = 'listmin',
        ruleNameFileMin = 'filemin',
        ruleNameFileMax = 'filemax',

        rulesUsingMinMax = [ruleNameWeek, ruleNameDate, ruleNameDateTime, rulenameNumber, ruleNameListMax, ruleNameListMin, ruleNameFileMin, ruleNameFileMax],

        clickEvent = 'click',
        changeEvent = 'change',
        keyupEvent = 'keyup',
        keydownEvent = 'keydown';



    function valjsElementUpdated(binding) {
        var i,
            validFields = 0,
            busyFields = 0,
            failedFields = 0,
            waitingFields = 0,
            s;

        for (i = 0; i < this.e.length; i += 1) {
            binding = $(this.e[i]).data(dataNameValjsBinding);
            s = binding.getResults();
            if (!valjsIsUndefined(s)) {
                if (s.fail.length === 0 && s.busy.length  === 0) {
                    if (!binding.waitingRules()) {
                        validFields += 1;
                    } else {
                        waitingFields += 1;
                    }
                } else if (s.fail.length > 0) {
                    failedFields += 1;
                } else if (s.busy.length > 0) {
                    busyFields += 1;
                }
            }
        }

        if (failedFields) {
                    valjsInvokeEvent(this.jqContext, 'refreshform', {
                valjs: $.extend({ status : "invalid", binding : binding, context : this.jqContext, form : this.$form})
            });
        } else if(!failedFields && !waitingFields && !busyFields) {
                    valjsInvokeEvent(this.jqContext, 'refreshform', {
                valjs: $.extend({ status : "valid", binding : binding, context : this.jqContext, form : this.$form})
            });
        }


        if (this.vars.wfi) {
            if (!failedFields && !waitingFields && !busyFields) {
                this.vars.wfi();
                delete this.vars.wfi;
            } else if (failedFields) {
                delete this.vars.wfi;
            }
        }
    }


    function valjsData(jqElement) {
        var args = Array.prototype.slice.call(arguments, 1);
        return $.prototype.data.apply(jqElement, args);
    }

    /**
     * Help function to check for undefined variables
     * @param  {object} object The variable to check
     * @return {boolean}       True if the object is undefined
     */
    function valjsIsUndefined(object) {
        return object === undefined;
    }

    /**
     * Help function to check if a variable is of type string
     * @param  {object} object The value to check
     * @return {boolean        True of the value is a string
     */
    function valjsIsString(object) {
        return typeof object === "string";
    }

    /**
     * Wrapper function for jQuerys removeClass function
     * @param  {object} $elm      jQuery element(s)
     * @param  {string} className Classes to add
     */
    function valjsRemoveClass($elm, className) {
        $elm.removeClass(className);
    }

    /**
     * Wrapper function for jQuerys removeData function
     * @param  {object} $elm     jQuery element(s)
     * @param  {string} dataName Name of data property
     */
    function valjsRemoveData($elm, dataName) {
        $elm.removeData(dataName);
    }

    /**
     * Utility method to clear all modifiers on an element
     * @param  {object} $elm        jQuery element(s)
     * @param  {string} elementType Name of element type
     * @param  {object} valjs       ValJS instance
     */
    function valjsClearModifiers($elm, elementType, valjs) {
        /** @type {{removeClass:function(string, boolean) : *}} */
        var d = valjsRemoveClass($elm, valjs.vars[elementType]);
        return d;
    }

    /**
     * Utility method to get the length of an object or 0 if undefined
     * @param @type {{length:number}} o [description]  [varname] [description]
     * @return {number}   [description]
     */
    function valjsLength(o) {
        /** */
        if (!valjsIsUndefined(o) && o !== nullValue && !valjsIsUndefined(o.length)) {
            return o.length;
        }
        return 0;
    }

    /**
     * Wrapper function find elements below an element
     * @param  {string} selector jQuery selector
     * @param  {object} element  Element to find children for
     * @return {array}          List of elements
     */
    function valjsSelectElements(selector, element) {
        return $(element).find(selector);
    }

    /**
     * Check if an object is a function
     * @param  {*} object [description]
     * @return {boolean}        [description]
     */
    function valjsIsFunction(object) {
        /** @type {{isFunction:function(*) : boolean}} $ */
        var jQuery = $;
        return jQuery.isFunction(object);
    }

    /**
     * [valjsInArray description]
     * @param  {*} value [description]
     * @param  {Array} array [description]
     * @return {number}       [description]
     */
    function valjsInArray(value, array) {
        /** @type {{inArray:function(*, Array) : number}} $ */
        var jQuery = $;
        return jQuery.inArray(value, array);
    }

    /**
     * Evaluate a msg setting and normalize it
     * @param  {object} msgObject      string, object or function to evaluate
     * @param  {object} existingObject Existing object to concider
     * @return {object}                The normalized object
     */
    function valjsGetMsgConfig(msgObject, existingObject) {
        //console.error(msgObject, existingObject);
        var tmpMsgObject = { 'error' : msgObject };

        if (valjsIsString(existingObject)) {
            existingObject = {
                'error' : existingObject
            };
        }
        if (valjsIsFunction(msgObject)) {
            msgObject = tmpMsgObject;
        }

        if (valjsIsString(msgObject)) {
            if (valjsIsUndefined(existingObject)) {
                msgObject = tmpMsgObject;
            } else {
                msgObject = $.extend(trueValue, tmpMsgObject, existingObject);
            }
        } else if (valjsIsUndefined(msgObject)) {
            msgObject = existingObject;
        } else if (typeof msgObject === "object") {
            msgObject = $.extend(trueValue, {}, msgObject, existingObject);
        }
        return msgObject;
    }


    function ValJSRule(name, ruleConfig) {
        var options = ruleConfig.options,
            jqDeferred;

        if (!valjsIsUndefined(options)) {
            if (!valjsIsUndefined(options.msg)) {
                options.msg = valjsGetMsgConfig(options.msg);
            }
        }
        if (valjsIsUndefined(ruleConfig.value)) {
            ruleConfig.value = trueValue;
        }
        ruleConfig = $.extend(trueValue, {}, ValJS.ruleDefaults, {name: name}, ruleConfig);
        this.name = name;
        this.options = ruleConfig.options;
        this.bind = ruleConfig.bind;
        this.testElement = ruleConfig.testElement;
        this.run = ruleConfig.run;
        this.async = ruleConfig.async;
        this.prio = ruleConfig.prio;
        this.events = ruleConfig.events;
        this.checkEvent = ruleConfig.checkEvent;

        // If this rule is async we need a deferred object
        if (ruleConfig.async) {
            this.makePromise = function() {
                jqDeferred = $.Deferred();
                return jqDeferred.promise();
            };
            this.reject = function() {
                jqDeferred.reject.apply(jqDeferred, Array.prototype.slice.call(arguments));
            }
            this.resolve = function() {
                jqDeferred.resolve.apply(jqDeferred, Array.prototype.slice.call(arguments));
            }
            this.abort = ruleConfig.abort;
        }


    }

    /**
     * Internal method for adding a rule (available for public as well)
     * @param  {string} name        The rule name
     * @param  {object} ruleConfig  The rule definition
     */
    function valjsAddRule(name, ruleConfig) {
        if (!/^[a-z][a-z0-9]*$/.test(name)) {
            $.error('Bad rule name');
            return;
        }

        wj.rules.k.push(name);
        wj.rules[name] = new ValJSRule(name, ruleConfig);
    }

    /**
     * Get classes for an element type based on valjs configuration and element type
     * @param  {object} valjs       The ValJS instance
     * @param  {string} elementType The element type
     * @param  {...string} modifiers   List of modifiers to set
     * @return {string}             The complete class name
     */
    function valjsGetClass(valjs, elementType, modifiers) {
        var cn = valjs.config.elements,
            mcf = valjs.config.modifiers || {},
            ret = cn && cn[elementType] ? [cn[elementType]] : [],
            modifier_index,
            prefix = '';

        // No modifiers? Just exit then
        if (!modifiers) {
            return ret[0];
        }

        if (valjs.config.modifierSeparator && cn[elementType]) {
            prefix = cn[elementType] + valjs.config.modifierSeparator;
        }

        // If it's a string we just add it
        if (valjsIsString(modifiers)) {
            ret.push(!valjsIsUndefined(prefix + (mcf[modifiers])) ? mcf[modifiers] : '');
        } else if (valjsLength(modifiers)) {
            for (modifier_index = 0; modifier_index < valjsLength(modifiers); modifier_index += 1) {
                ret.push(!valjsIsUndefined(prefix + (mcf[modifiers[modifier_index]])) ? mcf[modifiers[modifier_index]] : '');
            }
        }

        return ret.join(' ');
    }


    /**
     * Method to invoke the findMsg-method for an element
     * @param  {object} options Object containing the element property
     * @return {object}         The msg element
     */
    function invokeElementFindMsgFunction(options) {
        var $elm = options.element, cfg;
        if (!$elm) {
            return nullValue;
        }
        cfg = valjsData($elm, dataNameValjsBinding).getCfg();
        return cfg.iFindMsgFn(options);
    }

    /**
     * Wrapper function for jQuerys addClass
     * @param  {object} $elm      jQuery element(s)
     * @param  {string} className The class to add
     * @return {object}           The element
     */
    function valjsJsAddClass($elm, className) {
        return $elm.addClass(className);
    }

    /**
     * Utility function set the class on an element
     * @param  {{addClass:function(string)}} $elm        [description]
     * @param  {*} valjs       [description]
     * @param  {string} elementType [description]
     * @param  {...string|string} modifiers   [description]
     * @return {*}             [description]
     */
    function valjsSetClass($elm, valjs, elementType, modifiers) {
        if (!$elm) {
            return;
        }
        valjsClearModifiers($elm, elementType, valjs);
        valjsJsAddClass($elm, valjsGetClass(valjs, elementType, modifiers));
        return $elm;
    }


    /**
     * [valjsGetAttr description]
     * @param  { { attr : function(string) : string } | * } $elm     [description]
     * @param  {string} attrName [description]
     * @return {string}          [description]
     */
    function valjsGetAttr($elm, attrName) {
        return $elm.attr(attrName);
    }

    /**
     * Utility method to get the element type
     * @param {{prop:function(string)}|*} $elm [description]
     * @return {*}      [description]
     */
    function valjsGetElementType($elm) {
        var elmType = valjsData($elm, dElmType),
            type,
            result,
            allowedTypes;
        // We cache this check
        if (!valjsIsUndefined(elmType)) {
            return valjsData($elm, dElmType);
        }

        type = $elm.prop('tagName').toLowerCase();
        result = {
            type: nullValue
        };

        // allowedTypes can be returned as "type"
        allowedTypes = ['text', 'checkbox', 'file', 'radio', 'submit'];

        if (type === 'input') {
            type = $elm.prop('type').toLowerCase();
            if (!valjsIsUndefined(type)) {
                if (valjsInArray(type, allowedTypes) === -1) {
                    result[type] = trueValue;
                    result.type = 'text';
                } else {
                    result.type = type;
                }
            } else {
                type = 'text';  // fallback on text
            }
        } else {
            if (type === selectTypeName) {
                result.type = type;
                result.isMultiple = valjsIsUndefined(valjsGetAttr($elm, 'multiple')) ? falseValue : trueValue;
            } else if (type === 'textarea') {
                result.type = type;
            }
        }

        valjsData($elm, dElmType, result);
        return result;
    }

    /**
     * Helper function to extract the value for an element
     * @param  {object} $elm  jQuery element
     * @param  {[type]} event Event triggering that we want a value
     * @return {object}       Object contining properties with the element value
     */
    function valjsGetElementValue($elm) {
        var elementType = valjsGetElementType($elm).type,
            binding = valjsData($elm, dataNameValjsBinding),
            originalValue = binding ? binding.g(dataNameValJsValueCache) : nullValue,
            value = nullValue,
            ret = {
                value: nullValue,
                upd: trueValue // true if the value has changed since last time
            };

        if (elementType === 'submit') {
            return ret;
        }
        switch (elementType) {
        case 'checkbox':
        case 'radio':
            value = $elm.prop('checked');
            break;
        case selectTypeName:
            ret.value = $.map($elm.find('option'), function (n) {
                /** @type {{ is : function(string) : boolean, val : function() : string, text : function() : string}} */
                var $n = $(n);
                if ($n.is(':selected')) {
                    return !valjsIsUndefined($n.val()) ? $n.val() : $n.text();
                }
            });

            value = ret.value.join(',');
            if (value === "" && valjsLength(ret.value) > 0) {
                value = " ";
            }
            break;
        default:
            value = $elm.val();
        }

        originalValue = valjsIsUndefined(originalValue) ? '' : originalValue;

        if (originalValue === value) {
            ret.upd = falseValue;
        } else {
            binding.resetRuleStatus();
            // if (!valjsIsUndefined(event) && event.type === 'click') {
            //     ret.upd = falseValue;
            // }
        }

        // Reset the rule statuses if the value has changed

        if (ret.value === nullValue) {
            ret.value = value;
        }

        if (binding) {
            binding.s(dataNameValJsValueCache, value);
        }

        return ret;

    }

    /**
     * Get the functions used to find message and label elements
     * @param  {object} $elm       jQuery element
     * @param  {object} cfgContext Configuration
     * @return {object}            Object containing findMsg and findLabel functions
     */
    function valjsGetElementFindFunctions($elm, cfgContext) {
        var resolvedConfiguration = { },
            fieldNameSelector = valjsGetAttr($elm, 'name');
            //fieldIdSelector = valjsGetAttr($elm, 'id');

        if (fieldNameSelector) {
            if (!valjsIsUndefined(cfgContext[fieldNameSelector])) {
                if (!valjsIsUndefined(cfgContext[fieldNameSelector].findMsg)) {
                    resolvedConfiguration.findMsg = cfgContext[fieldNameSelector].findMsg;
                }
                if (!valjsIsUndefined(cfgContext[fieldNameSelector].findLabel)) {
                    resolvedConfiguration.findLabel = cfgContext[fieldNameSelector].findLabel;
                }
            }
        }
        return resolvedConfiguration;
    }


    function valjsGetElementConfig($elm, ruleName, cfgContext, bindRule) {
        var resolvedConfiguration = { },
            fieldNameSelector = valjsGetAttr($elm, 'name'),
            //fieldIdSelector = valjsGetAttr($elm, 'id'),
            cfgFields = $.extend(trueValue, {}, cfgContext.fields),
            cfgRules = cfgContext.rules;


        if (!valjsIsUndefined(cfgRules)) {
            if (!valjsIsUndefined(cfgRules[ruleName])) {
                resolvedConfiguration = $.extend(resolvedConfiguration, cfgRules[ruleName]);
                if (bindRule !== falseValue) {
                    resolvedConfiguration.elmRules = {};
                    resolvedConfiguration.elmRules[ruleName] = 1;
                }
                if (!valjsIsUndefined(cfgRules[ruleName].msg)) {
                    resolvedConfiguration.msg = valjsGetMsgConfig(cfgRules[ruleName].msg);
                }
            }
        }

        if (cfgFields) {
            //if (fieldIdSelector) {

           // }
            if (fieldNameSelector) {
                if (!valjsIsUndefined(cfgFields[fieldNameSelector])) {

                    if (!valjsIsUndefined(cfgFields[fieldNameSelector].msg)) {
                        resolvedConfiguration.msg = valjsGetMsgConfig(cfgFields[fieldNameSelector].msg, resolvedConfiguration.msg);
                    }

                    if (!valjsIsUndefined(cfgFields[fieldNameSelector][ruleName])) {
                        resolvedConfiguration.elmRules = {};
                        resolvedConfiguration.elmRules[ruleName] = 'instance.name';
                        if (!valjsIsUndefined(cfgFields[fieldNameSelector][ruleName].msg)) {
                            resolvedConfiguration.msg = valjsGetMsgConfig(resolvedConfiguration.msg, cfgFields[fieldNameSelector][ruleName].msg);
                            delete cfgFields[fieldNameSelector][ruleName].msg;
                        }
                        resolvedConfiguration = $.extend(trueValue, resolvedConfiguration, cfgFields[fieldNameSelector][ruleName]);
                    }
                }
            }
        }

        return resolvedConfiguration;
    }

    function valjsAttributeNameToOptionName(value) {
        var myRegexp = /-([a-z0-9])/g,
            match = myRegexp.exec(value),
            newValue = String(value);

        while (match !== nullValue) {
            newValue = newValue.replace(match[0], String(match[1].toUpperCase()));
            match = myRegexp.exec(value);
        }

        return newValue;
    }

    function valjsRuleCustomBind(valjs, rule, $elm) {
        var ret = { binding : nullValue, elmRules : undefined},
            customBindResult,
            ruleName = rule.name;
        if (valjs.config.allowRuleInitialization === trueValue) {
            customBindResult = rule.testElement({ form : valjs.$form, context : valjs.jqContext, rule: rule, element: $elm, valjs: valjs });
            if (typeof customBindResult === 'object') {
                if (!valjsIsUndefined(customBindResult[ruleName])) {
                    ret.binding = { data: {} };
                    ret.elmRules = {};
                    ret.elmRules[ruleName] = trueValue;
                } else {
                    ret.binding = { data : customBindResult };
                }
            } else {
                if (typeof customBindResult === 'boolean' && customBindResult === trueValue) {
                    ret.binding = { data: {} };
                    ret.elmRules = {};
                    ret.elmRules[ruleName] = trueValue;
                }
            }
        }
        return ret;
    }

    function valjsParseEmptyRuleAttr(rule, optionName) {
        var ret = {};
        if (!valjsIsUndefined(rule.options)) {
            if (!valjsIsUndefined(rule.options[optionName])) {
                if (typeof rule.options[optionName] === "boolean") {
                    return trueValue;
                }
            }
        }
        return ret;
    }


    function valjsGetUniqueId() {
        ValJS.idCounter += 1;
        return ValJS.idCounter;
    }


    function valjsParseRuleAttrValue(rule, attrName, attrValue) {
        if (!valjsIsUndefined(rule.options)) {
            if (!valjsIsUndefined(rule.options[attrName])) {
                if (typeof rule.options[attrName] === "boolean") {
                    if (attrValue.toLowerCase() === "true") {
                        attrValue = trueValue;
                    } else if (attrValue.toLowerCase() === "false") {
                        attrValue = falseValue;
                    }
                }
            }
        }
        return attrValue;
    }

    function valjsRuleParseElementAttributeAsMessage(attribute_name, local_string, attrValue, attrData) {
        if (attribute_name.indexOf(local_string) === 0) {
            if (attribute_name === local_string) {
                attrData.msg = attrData.msg || {};
                attrData.msg[keyNameDefault] = attrValue;
            } else if (attribute_name.indexOf(local_string + '-') !== -1) {
                attrData.msg = attrData.msg || {};
                attrData.msg[valjsAttributeNameToOptionName(attribute_name.substr((local_string + '-').length))] = attrValue;
            }
        } else {
            return attrValue;
        }
        return attrData;
    }

    function valjsRuleParseElementAttributes(attrName, $elm, rule) {
        var attrs = $elm[0].attributes,
            attr_index,
            attrData = {},
            attribute_name,
            tmp,
            attrValue;

        for (attr_index = 0; attr_index < valjsLength(attrs); attr_index += 1) {
            attribute_name = attrs[attr_index].name;
            if (attribute_name.indexOf(attrName + '-') === 0 && attribute_name.length > attrName.length) {
                tmp = valjsAttributeNameToOptionName(attribute_name.substr(valjsLength(attrName) + 1));
                if (!attrs[attr_index].value) {
                    attrData[tmp] = valjsParseEmptyRuleAttr(rule, tmp);
                } else {
                    attrValue = valjsParseRuleAttrValue(rule, tmp, attrs[attr_index].value);
                    attrData = valjsRuleParseElementAttributeAsMessage(attribute_name, attrName + '-msg', attrValue, attrData);
                    if (attrData === attrValue) {
                        attrData = {};
                        attrData[tmp] = attrValue;
                    }
                }
            }
        }
        return attrData;
    }

    function valjsGetElementConfigFromAttributes(valjs, $elm, rule, jsConfig) {
        var resolvedConfiguration = { },
            ruleName = rule.name,
            attrName = "data-" + valjs.config.attrPrefix + ruleName,
            attrValue = valjsGetAttr($elm, attrName),
            binding = nullValue,
            tmp,
            attrData,
            already_bound = !valjsIsUndefined(jsConfig.elmRules) && !valjsIsUndefined(jsConfig.elmRules[rule.name]);

        // If there is no data- attribute, try the customBind call:
        if (!already_bound) {
            if (valjsIsUndefined(attrValue)) {
                tmp = valjsRuleCustomBind(valjs, rule, $elm);
                binding = tmp.binding;
                resolvedConfiguration.elmRules = tmp.elmRules;
            } else {
                resolvedConfiguration.elmRules = {};
                resolvedConfiguration.elmRules[rule.name] = 'attribute';
            }
        } else {
            binding = {data : {}};
        }

        if (!valjsIsUndefined(attrValue)) {
            binding = { data: {} };
            // If the value is empty we'll use the default value from the rule, if available
            if (attrValue === "") {
                if (!valjsIsUndefined(rule.options) && !valjsIsUndefined(rule.options.value)) {
                    attrValue = rule.options.value;
                }
            }
            binding.data.value = attrValue;
        }

        if (binding || already_bound) {
            resolvedConfiguration.elmRules = {};
            resolvedConfiguration.elmRules[rule.name] = 1;
            attrData = {};

            if (binding !== nullValue) {
                attrData = valjsRuleParseElementAttributes(attrName, $elm, rule);
            }

            resolvedConfiguration = $.extend(trueValue, {}, resolvedConfiguration, binding.data, attrData);
            if (!valjsIsUndefined(resolvedConfiguration.msg)) {
                resolvedConfiguration.msg = valjsGetMsgConfig(resolvedConfiguration.msg);
            }
        }

        return resolvedConfiguration;
    }



    function valjsGetFilteredJ5Object(valjs) {
        return {
            config: valjs.config,
            context: valjs.jqContext,
            form: valjs.$form
        };
    }



    function valjsFindLabelElement($elm, valjs) {
        var id = $elm.attr('id'),
            labelElement = (id ? valjsSelectElements("label[for='" + $elm.attr('id') + "']", valjs.jqContext) : nullValue);
        if (!id || valjsLength(labelElement) === 0) {
            if ($elm.parent().get(0).nodeName === 'LABEL') {
                labelElement = $elm.parent();
            }
        }
        return labelElement;
    }

    /**
     * [valjsInvokeEvent description]
     * @param  {{trigger : function(*)}} target  [description]
     * @param  {string} name    [description]
     * @param  {*} options [description]
     * @return {*}         [description]
     */
    function valjsInvokeEvent(target, name, options) {
        var newEvent = jQuery.Event(name + eventNamespace, options);
        target.trigger(newEvent);
        return newEvent;
    }


    /**
     * [valjsRefreshField description]
     * @param  {*} valjs   [description]
     * @param  {*} $elm    [description]
     * @param  {*} refresh [description]
     * @return {*}         [description]
     */
    function valjsRefreshField(valjs, $elm, refresh) {
        /** @type { {hide : function()} | * } */
        var $msg,
            status = refresh.status,
            elmConfig = valjsData($elm, dataNameValjsBinding).getCfg(),
            state = refresh.state,
            message = refresh.message,
            modifers = nullValue,
            hasMsg = message !== "",
            createMsg = hasMsg && status !== 'valid',
            $lbl,
            hideMsg = falseValue;

        $lbl = valjsFindLabelElement($elm, valjs);

        if (status === 'valid') {
            modifers = 'valid';
            hideMsg = trueValue;
        } else {
            if (status === 'unknown') {
                modifers = 'unknown';
                hideMsg = trueValue;
            } else {
                modifers = [status, state];
                if (status === "busy") {
                    hideMsg = falseValue;
                }
            }
        }

        refresh.ruleConfig = elmConfig[refresh.rule];

        $msg = invokeElementFindMsgFunction({
            element : $elm,
            valjs : valjs,
            create : createMsg,
            validation : refresh
        });

        if (valjsLength($msg) === 1) {
            if (hideMsg) {
                $msg.html('').hide();
            } else {
                $msg.html(message);
            }
            valjsSetClass($msg, valjs, 'msg', modifers);
        }

        valjsSetClass($elm, valjs, 'field', modifers);
        if (valjsLength($lbl) === 1) {
            valjsSetClass($lbl, valjs, 'label', modifers);
        }
        return $elm;
    }

    function valjsResetElementStatus($elm, valjs) {
        var binding = valjsData($elm, dataNameValjsBinding),
            refreshData,
            e;
        binding.r(dataNameValjsValidationStatus);

        refreshData = { status: 'unknown' };
        e = valjsInvokeEvent($elm, 'refreshfield', {
            valjs: $.extend(refreshData, { binding : binding, context : valjs.jqContext, form : valjs.$form, element : $elm})
        });



        if (!e.isDefaultPrevented()) {
            valjsRefreshField(valjs, $elm, refreshData);
        }
    }

    function valjsCleanupElement($elm, valjs) {
        var $msg = invokeElementFindMsgFunction($elm, valjs, falseValue),
            $label = valjsFindLabelElement($elm, valjs);
        if ($msg) {
            $msg.hide();
        }
        valjsRemoveClass($elm, valjsGetClass(valjs, 'field'));
        valjsRemoveClass($elm, valjs.vars.field);
        if ($label) {
            valjsRemoveClass($label, valjsGetClass(valjs, 'label'));
            valjsRemoveClass($label, valjs.vars.label);
        }
        valjsRemoveData($elm, dataNameValjsBinding);
        valjsRemoveData($elm, dElmType);
        valjsRemoveData($elm, dataNameValJsInstance);
        valjsRemoveData($elm, dataNameValJsValueCache);
    }

    function valjsTestIsElementReadyForValidation($elm, includeHidden) {
        return (includeHidden === true || $elm.is(':visible')) && !$elm.is(':disabled');
    }

    function valjsGetElementBoundRules($elm) {
        var rules = valjsData($elm, dataNameValjsBinding).getCfg();
        return rules;
    }


    function valjsGetNamedMessageFromRuleResult(result) {
        var namedMessage;
        if (typeof result === "boolean") {
            namedMessage = keyNameDefault;
        } else if (typeof result === "object") {
            namedMessage = result.msg;
        } else if (valjsIsString(result)) {
            namedMessage = result;
        }
        return namedMessage;
    }

    function valjsGetValidationMessage(execParameters, config, originalValue) {
        var message = originalValue,
            namedMessage = execParameters.msgName;
        //console.warn("config", config);
        if (valjsIsFunction(config.msg)) {
            message = config.msg(execParameters);
        } else if (!valjsIsUndefined(config.msg) && !valjsIsUndefined(config.msg[namedMessage])) {
            if (valjsIsFunction(config.msg[namedMessage])) {
                message = config.msg[namedMessage](execParameters);
            } else if (valjsIsString(namedMessage)) {
                message = config.msg[namedMessage];
            }
        } else {
            message = execParameters.msgName;
        }
        return message;
    }

    function valjsParseRuleResult(result, execParameters) {
        var resultObject,
            returnValue = { ok : trueValue, result : nullValue },
            rule = execParameters.rule,
            message = "";

        if (result !== trueValue && (typeof result !== "object" || result.msg)) {
            execParameters.msgName = valjsGetNamedMessageFromRuleResult(result);
            resultObject = result;
            if (typeof result === "object") {
               // console.warn("message name", execParameters.msgName);
                resultObject = $.extend(trueValue, {}, result);
                //delete resultObject.msg;
                execParameters.result = resultObject;
                //console.warn(resultObject);
            }

            // it should be used if it's been specified otherwhere
            if (rule.options && rule.options.msg && rule.options.msg[keyNameDefault] === nullValue) {
                if (execParameters.config.msg[keyNameDefault] !== nullValue) {
                    execParameters.msgName = keyNameDefault;
                }
            }
            //console.warn(rule.name, execParameters.msgName);
            message = valjsGetValidationMessage(execParameters, execParameters.config, result);
            if (result !== false) {
                if (typeof result === "object") {
                    result = $.extend(true, {}, result, {msg : message});
                } else {
                    result = {
                        msg : message
                    };
                }
            } else {
                result = {
                    msg : message
                };
            }

            returnValue.ok = falseValue;
            returnValue.result = result;
            //console.warn("result", returnValue.result.msg)

        } else {
            returnValue.result = result;
        }
        return returnValue;
    }


    function valjsTriggerElementValidationEvent(valjs, $elm, elementValidationResult, submit) {
        var refreshData, label, e, isValid = -1,
            binding = valjsData($elm, dataNameValjsBinding),
            isUndefined = valjsIsUndefined(valjs);

        if (!isUndefined && valjsLength(elementValidationResult.fail) > 0) {
            binding.setRuleContext(elementValidationResult.fail[0].rule);
            refreshData = {
                status: 'invalid',
                state: submit ? 'error' : 'warning',
                message: elementValidationResult.fail[0].msg,
                rule: elementValidationResult.fail[0].rule
            };
            label = valjsFindLabelElement($elm, valjs);
            if (label) {
                refreshData.label = label.text();
            }
        } else {
            refreshData = { status: 'valid' };
            isValid = 1;
        }

        // Anything busy?
        if (!isUndefined && isValid === 1 && valjsLength(elementValidationResult.busy) > 0) {
            refreshData.status = "busy";
            refreshData.message = elementValidationResult.busy[0].msg;
            isValid = 0;
        }

        binding.s(dataNameValJsIsValid, isValid);

        binding.s(dataNameValjsValidationStatus, refreshData);

        e = valjsInvokeEvent($elm, 'refreshfield', {
            currentTarget : $elm.get(0),
            valjs: $.extend(refreshData, {
                binding : binding,
                context : valjs.jqContext,
                form : valjs.$form,
                element : $elm
            })
        });


        if (!e.isDefaultPrevented()) {
            valjsRefreshField(valjs, $elm, refreshData);
        }
        binding.setRuleContext(nullValue);
        return isValid === 1 ? isValid : refreshData;
    }


    function valjsRuleRun(valjs, $elm, elementValue, event, rule, config) {

        var execParameters = {
                'binding' : valjsData($elm, dataNameValjsBinding),
                'event': event,
                'config': config,
                'valjs': valjs,
                'element' : $elm,
                'field': $.extend({ value: elementValue.value }, valjsGetElementType($elm))
            },
            result;

        execParameters.binding.setRuleContext(rule.name);
        result = rule.run(execParameters, $elm);
        execParameters.binding.setRuleContext(nullValue);

        if (rule.async) {
            // This must be a $.Deferred object
            return result;
        }

        return valjsParseRuleResult(result, {
            valjs: valjs,
            config : config,
            rule : rule,
            element : $elm,
            msgName : nullValue
        });
    }


    function valjsStringChecksum(str) {
        var hash = 5381, i, c;
        for (i = 0; i < valjsLength(str); i += 1) {
            c = str.charCodeAt(i);
            hash = ((hash << 5) + hash) + c;
        }
        return hash;
    }



    function valjsRunRulesForElement(valjs, ruleNames, $elm, elementValue, submit, event) {
        var rule_index,
            rules = valjsGetElementBoundRules($elm),
            binding = $elm.data(dataNameValjsBinding),
            currentRule,
            busy,
            config,
            asyncFailed,
            ret = {
                hash : [],
                fail : [],
                busy : [],
                success : [],
                unresolved : []
            },
            asyncId,
            result,
            ruleStatus,
            isAsync,
            shouldRun = false;

        for (rule_index = 0; rule_index < valjsLength(ruleNames); rule_index += 1) {
            currentRule = wj.rules[ruleNames[rule_index]];
            config = rules[ruleNames[rule_index]];
            isAsync = currentRule.async;
            ruleStatus = binding.getRuleStatus(currentRule.name);
            result = null;
            if (ruleStatus.status === true) {
                result = ruleStatus.result;
                if (result.ok === falseValue) {
                    ret.hash.push(currentRule.name + result.result);
                    ret.fail.push(result.result);
                } else {
                    ret.success.push($.extend(trueValue, {}, result, { rule : currentRule.name}));
                }
            } else {
                busy = binding.g(ruleNames[rule_index] + '_busy');
                if (busy) {
                    valjs.workers.remove(busy.asyncId);
                    if (currentRule.abort) {
                        currentRule.abort();
                    }
                }

                // if deferred, only run if there are no failed rules
                if (isAsync && ret.fail.length !== 0) {
                    binding.setRuleStatus(currentRule.name, false);
                    ret.hash.push(currentRule.name);
                } else {

                    busy = binding.g(ruleNames[rule_index] + '_resolved');
                    asyncFailed = binding.g(ruleNames[rule_index] + '_asyncfail');

                    if (!valjsIsUndefined(busy)) {
                        result = busy;
                        binding.r(ruleNames[rule_index] + '_resolved');
                        valjs.workers.remove(result.asyncId);
                        binding.setRuleStatus(currentRule.name, true, result);
                    } else if (!valjsIsUndefined(asyncFailed)) {
                        result = asyncFailed;
                        valjs.workers.remove(result.asyncId);
                        binding.r(ruleNames[rule_index] + '_asyncfail');
                        if (config.allowFailed === true) {
                            binding.setRuleStatus(currentRule.name, true, true);
                            result = { ok : true, result : true};
                        }
                    } else {
                        shouldRun = true;
                        if (!submit && currentRule.checkEvent) {
                            // Test if the rule should run
                            // But for submit it should always run
                            shouldRun = currentRule.checkEvent(event);
                            binding.setRuleStatus(currentRule.name, false);
                        }
                        if (shouldRun) {
                            result = valjsRuleRun(valjs, $elm, elementValue, event, currentRule, config);
                            ret.hash.push(currentRule.name + "_hash");
                            if (isAsync) {
                                asyncId = currentRule.name + ((new Date().getTime() / 1000));
                                valjs.workers.add(asyncId);
                                busy = $.extend(trueValue, {}, { rule : currentRule.name, asyncId : asyncId});
                                busy.msg = valjsGetValidationMessage({
                                    valjs: valjs,
                                    config : config,
                                    rule : currentRule,
                                    element : $elm,
                                    msgName : 'busy'
                                }, config );
                                
                                ret.busy.push(busy);
                                binding.s(ruleNames[rule_index] + '_busy', busy);

                                result
                                    .fail(function (result) {
                                        result = valjsParseRuleResult(result, {
                                            valjs: valjs,
                                            config : config,
                                            rule : currentRule,
                                            element : $elm,
                                            msgName : nullValue,
                                            asyncId : asyncId
                                        });
                                        result.asyncId = asyncId;
                                        binding.s(currentRule.name + '_asyncfail', result);
                                        binding.r(currentRule.name + '_busy');
                                        $elm.valjs('validateField', {
                                            force : true,
                                            submit : submit
                                        });
                                    })
                                    .done(function (result) {
                                        result = valjsParseRuleResult(result, {
                                            valjs: valjs,
                                            config : config,
                                            rule : currentRule,
                                            element : $elm,
                                            msgName : nullValue
                                        });
                                        result.asyncId = asyncId;
                                        binding.s(currentRule.name + '_resolved', result);
                                        binding.r(currentRule.name + '_busy');
                                        $elm.valjs('validateField', {
                                            force : true,
                                            submit : submit
                                        });
                                    });
                            } else {
                                binding.setRuleStatus(currentRule.name, true, result);
                            }
                        }
                    }
                }

                if (result) {
                    
                    if (result.ok === falseValue) {
                        ret.hash.push(currentRule.name + result.result.msg);
                        ret.fail.push($.extend(trueValue, {}, result.result, { rule : currentRule.name}));
                    } else {
                        ret.success.push($.extend(trueValue, {}, "success", { rule : currentRule.name}));
                    }
                }

            }

        }

            valjs.workers.commitRemove();

        ret.hash = valjsStringChecksum((submit ? '1' : '0') + ret.hash.join('|'));
        //elementValidationResult.hash = (new Date());

        return ret;
    }


    function valjsInvokeElementValidation($elm, valjs, event, elementValue, submit, force, includeHidden) { // , valjs, event
        var binding = valjsData($elm, dataNameValjsBinding),
            rules = valjsGetElementBoundRules($elm),
            ruleNames = rules ? rules.ruleNames : nullValue,
            isValid,
            previousHash = binding.g(dataNameValJsHash),
            elementValidationResult;


        if (valjs.config.liveValidation === falseValue  && !submit && !force) {
            return;
        }

        if (!valjsTestIsElementReadyForValidation($elm, includeHidden)) {
            if (binding.g(dataNameValJsHash)) {
                valjsResetElementStatus($elm, valjs);
            }
            return;
        }

        if (valjsIsUndefined(submit)) {
            submit = falseValue;
        }

        if (valjsIsUndefined(elementValue)) {
            elementValue = valjsGetElementValue($elm, event);
        }

        // Get validation results and make sure hash is updatd
        elementValidationResult = valjsRunRulesForElement(valjs, ruleNames, $elm, elementValue, submit, event);
        binding.updateResults(elementValidationResult);
//        console.warn(elementValidationResult);
        //console.warn( previousHash, elementValidationResult );
        if (previousHash === elementValidationResult.hash && valjs.config.alwaysTriggerFieldEvents === falseValue) {
            return binding.g(dataNameValjsValidationStatus);
        }

        binding.s(dataNameValJsHash, elementValidationResult.hash);
        

        isValid = valjsTriggerElementValidationEvent(valjs, $elm, elementValidationResult, submit);
        return isValid;
    }

    function ValJSBindingBase() { return; }
    ValJSBindingBase.prototype.hasRule = $.noop;
    ValJSBindingBase.prototype.getFieldType = $.noop;
    ValJSBindingBase.prototype.getRules = $.noop;
    ValJSBindingBase.prototype.resetField = $.noop;
    ValJSBindingBase.prototype.validateField = $.noop;
    ValJSBindingBase.prototype.getContext = $.noop;
    ValJSBindingBase.prototype.getForm = $.noop;
    ValJSBindingBase.prototype.isValid = $.noop;
    ValJSBindingBase.prototype.getRule = $.noop;
    ValJSBindingBase.prototype.getFieldValue = $.noop;
    ValJSBindingBase.prototype.getFieldStatus = $.noop;



    /**
     * Class responsible for identifying and extracting rules and configuration for a field
     * @param {[type]} valjs     [description]
     * @param {[type]} jqElement [description]
     */
    function ValjsElementBinding(valjsInstance, jqElement) {
        var rules =  wj.rules,
            fieldRules = nullValue,
            self = this,
            ruleContext = nullValue,
            data = {},
            ruleStatus = {};

        this.s = function (key, val) {
            data[key] = val;
        };
        this.g = function (key) {
            return data[key];
        };
        this.r = function (key) {
            delete data[key];
        };

        this.updateResults = function(validationresult) {
            var g = this.getResults();
            if (g) {
                if(validationresult.hash === g.hash) {
                    return;
                }
            }
            self.s('elementStatus', validationresult);
            self.s('elementStatusT', (new Date()));
            valjsInstance.elementUpdated(self);
        };

        this.getResults = function() {
            return self.g('elementStatus');
        };

        this.setRuleStatus = function (name, status, result) {
            ruleStatus[name] = { status : status, result : result };
        };
        this.getRuleStatus = function (name) {
            return ruleStatus[name] || { status : falseValue};
        };
        this.resetRuleStatus = function () {
            ruleStatus = {};
        };
        this.waitingRules = function () {
            var name, i;
            for (i = 0; i < fieldRules.ruleNames.length; i += 1) {
                name = fieldRules.ruleNames[i];
                if (self.getRuleStatus(name).status === false) {
                    return true;
                }
            }
            return false;
        };

        function extractFieldRules(cfgFieldGlobal, cfgInstanceGlobal) {
            var elmConfig,
                rule_index = 0,
                ruleOptions,
                cfgFieldAttr,
                cfgInstanceFieldRule,
                extractedRules = { ruleNames : []};

            for (rule_index = 0; rule_index < valjsLength(rules.k); rule_index += 1) {
                elmConfig = {};
                ruleOptions = !valjsIsUndefined(rules[rules.k[rule_index]].options) ? rules[rules.k[rule_index]].options : {};
                cfgInstanceFieldRule = valjsGetElementConfig(jqElement, rules.k[rule_index], valjsInstance.config, falseValue);
                elmConfig = $.extend(trueValue, {}, ruleOptions, cfgInstanceGlobal, cfgInstanceFieldRule, cfgFieldGlobal);
                cfgFieldAttr = valjsGetElementConfigFromAttributes(valjsInstance, jqElement, rules[rules.k[rule_index]], elmConfig);
                elmConfig = $.extend(trueValue,  elmConfig, cfgFieldAttr);
                elmConfig.msg = elmConfig.msg || {};

                if (!valjsIsUndefined(elmConfig.elmRules)) {
                    delete elmConfig.elmRules;
                    extractedRules.ruleNames.push(rules.k[rule_index]);
                    extractedRules[rules.k[rule_index]] = elmConfig;
                }

            }
            return extractedRules;
        }

        this.isValid = function () {
            return self.g(dataNameValJsIsValid) === 1;
        };

        /*function getValjs() {
            return valjsInstance;
        }*/

        function getInstanceGlobalMessage() {
            return valjsIsUndefined(valjsInstance.config.msg) ? {} : { msg : valjsGetMsgConfig(valjsInstance.config.msg) };
        }

        function getFieldGlobalMessage() {
            var msgAttribute = valjsGetAttr(jqElement, "data-" + valjsInstance.config.attrPrefix + 'msg');
            if (msgAttribute) {
                return {
                    msg : valjsGetMsgConfig(msgAttribute)
                };
            }
            return {};
        }

        function getInstanceFindFunctions() {
            return $.extend({
                findMsg : valjsInstance.config.findMsg,
                findLabel : valjsInstance.config.findLabel
            }, valjsGetElementFindFunctions(jqElement, valjsInstance.config));
        }

        function triggerSetupFieldCallback() {
            var e = {
                valjs: valjsInstance,
                elm : jqElement,
                config: fieldRules
            };

            if (valjsInstance.config.setupField !== $.noop) {
                valjsInstance.config.setupField(e);
            }
            fieldRules = e.config;
        }

        function sortFieldRules() {
            // Sort field rules by rule priority
            fieldRules.ruleNames.sort(function (a, b) {
                a = rules[a].prio;
                b = rules[b].prio;
                return a < b ? -1 : (a > b ? 1 : 0);
            });
        }


        function finalizeElementBinding() {

            if (fieldRules.ruleNames.length === 0) {
                return;
            }

            var state;
            fieldRules.fieldType = valjsGetElementType(jqElement);

            fieldRules.uid = valjsGetUniqueId();

            state = valjsData(jqElement, dataNameValjsBinding) ? '' : 'unknown';
            valjsJsAddClass(jqElement, valjsGetClass(valjsInstance, 'field', state))
                .data(valjsInstance.vars.off, 0);                   // Validation not disabled
            valjsSetClass(valjsFindLabelElement(jqElement, valjsInstance), valjsInstance, 'label', state);

        }

        function bind() {
            var ruleNames = fieldRules.ruleNames.slice(0),
                i_index,
                currentRule,
                bindResult;

            if (fieldRules.ruleNames.length === 0) {
                valjsCleanupElement(jqElement, valjsInstance);
                return;
            }


            fieldRules.ruleNames = [];
            if (valjsLength(ruleNames) === 0) {
                return;
            }

            for (i_index = 0; i_index < valjsLength(ruleNames); i_index += 1) {
                currentRule = rules[ruleNames[i_index]];
                if (currentRule.bind === nullValue || valjsIsUndefined(currentRule.bind) || currentRule.bind === $.noop) {
                    bindResult = trueValue;
                } else {
                    self.setRuleContext(currentRule.name);
                    bindResult = currentRule.bind($.extend(valjsGetFilteredJ5Object(valjsInstance),
                        {
                            binding : self,
                            valjs : valjsInstance,
                            element: jqElement,
                            field : valjsGetElementType(jqElement),
                            config : fieldRules[currentRule.name],
                            rule : currentRule
                        }));
                    self.setRuleContext(nullValue);
                }

                if (bindResult !== falseValue) {
                    if (typeof bindResult === "object") {
                        fieldRules[currentRule.name] = $.extend(trueValue, {}, fieldRules[currentRule.name], bindResult);
                    }
                    fieldRules.ruleNames.push(ruleNames[i_index]);

                    if (currentRule.async) {
                        self.s('hasAsync', true);
                    }

                } else {
                    delete fieldRules[ruleNames[i_index]];
                }
            }

            finalizeElementBinding();

            return this;
        }

        this.setRuleContext = function (name) {
            ruleContext = name;
        };

        /**
         * Here follows the public methods that can be 
         * called for e
         */

        this.getCfg = function () {
            return fieldRules;
        };

        this.getContext = function () {
            return valjsInstance.jqContext;
        };

        this.getElement = function () {
            return jqElement;
        };

        this.getFieldStatus = function () {
            var status = self.g(dataNameValJsIsValid);
            if (valjsIsUndefined(status)) {
                return 0;
            }
            return status;
        };

        this.getForm = function () {
            return valjsInstance.$form;
        };

        this.getRules = function () {
            return fieldRules.ruleNames;
        };

        this.getRule = function (options) {

            if (valjsIsUndefined(options)) {
                if (ruleContext) {
                    options = ruleContext;
                }
            }

            if (valjsIsString(options)) {
                if (this.hasRule(options)) {
                    return fieldRules[options];
                }
            }
            return nullValue;
        };

        this.hasRule = function (name) {
            var i = 0;
            if (Object.prototype.toString.call(name) === '[object Array]') {
                for (i = 0; i < name.length; i += 1) {
                    if (fieldRules.hasOwnProperty(name[i])) {
                        return trueValue;
                    }
                }
                return falseValue;
            }
            return fieldRules.hasOwnProperty(name);
        };

        this.getFieldType = function () {
            return valjsGetElementType(jqElement);
        };

        this.resetField = function () {
            valjsResetElementStatus(jqElement, valjsInstance);
            return jqElement;
        };

        this.getFieldValue = function () {
            return valjsGetElementValue(jqElement);
        };

        this.validateField = function (options) {
            var value = valjsGetElementValue(jqElement),
                submit = options ? options.submit : false;
                           // $elm, valjs, event, elementValue, submit, force
            return valjsInvokeElementValidation(jqElement, valjsInstance, undefined, value, submit, true);
        };

        function init() {
            var instanceGlobal = getInstanceGlobalMessage(),
                cfgGlobalFindFunctions = getInstanceFindFunctions(),
                cfgFieldGlobal = getFieldGlobalMessage();

            // Bind this object to the element
            // it will be removed later if no rules were bound
            valjsData(jqElement, dataNameValjsBinding, self);

            fieldRules = extractFieldRules(cfgFieldGlobal, instanceGlobal);
            fieldRules.iFindMsgFn = cfgGlobalFindFunctions.findMsg;
            fieldRules.iFindLabelFn = cfgGlobalFindFunctions.findLabel;

            sortFieldRules();

            triggerSetupFieldCallback();
            return this;
        }

        this.isBound = function () {
            return fieldRules.ruleNames.length > 0;
        };

        init();
        bind();

    }

    ValjsElementBinding.prototype = new ValJSBindingBase();

    function startRuleBindingCycle(valjs, element) {

        // New from 0.7.5
        return (new ValjsElementBinding(valjs, $(element)))

            // Exit with the status
            .isBound();
    }

    /**
     * [valjsFindMsgElementd escription]
     * @param  { { nextAll : function(string) : {insertAfter : function(*)} } | * } $elm   [description]
     * @param  {*} valjs  [description]
     * @param  {boolean} create [description]
     * @return {*}        [description]
     */
    function valjsFindMsgElement(options) {
        var $elm = options.element,
            valjs = options.valjs,
            create = options.create,
            $after = nullValue,
            $msg = valjs.jqContext.find("[data-msg-for='" + $elm.attr('id') + "']");

        if (valjs.config.elements && valjs.config.elements.msg && valjsLength($msg) === 0) {
            $after = $elm.parent().prop('tagName') === 'LABEL' ? $elm.parent() : $elm;
            $msg = $after.next('.' + valjs.config.elements.msg);
        }

        if (valjsLength($msg) === 0 && create) {
            if (valjs.config.createMsg) {
                $msg = $('<span>');
                $msg = $msg.insertAfter($after);
            }
        }

        if (create) {
            $msg.show();
        }
        return $msg;
    }

    function valjsTestElementChange(e) {
        var binding = valjsData($(this), dataNameValjsBinding),
            force = false,
            valueInfo;

        /*jshint validthis:true */
        if (!binding) {
            return;
        }

        // has the value been updated since last time?
        /*jshint validthis:true */
        valueInfo = valjsGetElementValue($(this), e);

        if (e.data.valjs.config.liveValidation === false) {
            if (e.type === "focusout") {
                valueInfo.upd = trueValue;
                force = true;
            }
        }

        if (e.type && e.type === "change" && valueInfo.upd === false && binding.waitingRules(e)) {
            valueInfo.upd = trueValue; 
        }

        if (valueInfo.upd === trueValue) { //|| e.type === 'focusout'
            /*jshint validthis:true */
            valjsInvokeElementValidation($(this), e.data.valjs, e, valueInfo, false, force);
        }
    }

    /**
     * This will reference the current valjs context
     * in the form-element before it is submitted via
     * hitting the Enter key in a field, or clicking the
     * submit button for the context in question
     * @return {[type]} [description]
     */
    function valjsSetFormContext(e) {
        var valjs = e.data.valjs,
            form = valjs.$form;

        if ($(e.target).prop('tagName') === 'TEXTAREA') {
            return;
        }

        form.data(dataNameValJsFormContext, valjs);
        if (e.type === 'keydown') {
            if (e.keyCode === 13) {
                valjsData(form, dataNameValJsFormContext, valjs);
                if (valjsLength(valjs.s) > 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    $(valjs.s).first().trigger('click');
                } else {
                    if (valjsLength(form.find(submitQuery)) === 0) {
                        e.preventDefault();
                        form.trigger('submit');
                        return;
                    }
                }
            }
        }

    }


    function valjsValidateForm(valjs, e, submit, options) {
        var i, valueInfo, field, validationResult, ret = { invalid: [], busy : [] },
            len = valjsLength(valjs.e),
            options = $.extend({includeHidden : false}, options);
        
        for (i = 0; i < len; i += 1) {
            field = $(valjs.e[i]);
            valueInfo = valjsGetElementValue(field, e);
            validationResult = valjsInvokeElementValidation(field, valjs, e, valueInfo, submit === trueValue ? trueValue : falseValue, false, options.includeHidden === true);
            if (!valjsIsUndefined(validationResult) && validationResult !== trueValue) {
                if (validationResult.status === 'invalid') {
                    ret.invalid.push(validationResult);
                } else if (validationResult.status === 'busy') {
                    ret.busy.push(validationResult);
                }
            }
        }
        
        return ret;
    }

    /**
     * Serialize a form or part of a form into a key-value object
     * @param  object $elm The jQuery element
     * @return object      The final object
     */
    function valjsFormSerialize($elm) {
        var serializedArray = $elm.find('input,select,textarea,button').serializeArray(),
            returnObject = {},
            tmp,
            i;
        for (i = 0; i < valjsLength(serializedArray); i += 1) {
            if (returnObject[serializedArray[i].name]) {
                if (valjsIsString(returnObject[serializedArray[i].name])) {
                    tmp = String(returnObject[serializedArray[i].name]);
                    returnObject[serializedArray[i].name] = [tmp];
                }
                returnObject[serializedArray[i].name].push(serializedArray[i].value);
            } else {
                returnObject[serializedArray[i].name] = serializedArray[i].value;
            }
        }
        return returnObject;
    }

    function valjsFormSubmit(e, options) {

        if (options && options.valjsDone === trueValue) {
            // If ValJS's work is done, then we'll let the event go through
            return trueValue;
        }

        /*jshint validthis:true */
        var valjs = valjsData($(this), dataNameValJsFormContext),
            result = nullValue,
            self = $(this),
            submitEvent,
            eventContext;

        //console.warn("[ValJS]" + e.isDefaultPrevented());
        if (!valjs) {
//            console.warn("no context");
            // No current context, then do nothing by triggering an event that says that ValJS is done
            //e.preventDefault();
            /*jshint validthis:true */
            //$(this).trigger('submit', $.extend(true, { valjsDone: trueValue }, e));
            return trueValue;
        }

        valjs.workers.stopWaiting();

        eventContext = valjs.jqContext;
        /*jshint validthis:true */
        $(this).removeData(dataNameValJsFormContext);


        // We have a ValJS context. Let's validate it!
        result = valjsValidateForm(valjs, e, trueValue);

        // Any invalid results?
        if (valjsLength(result.invalid) === 0) {

            // Any busy async validations?
            if (valjsLength(result.busy) === 0) {

                // Validation succeeded. Trigger the submitform event
                submitEvent = valjsInvokeEvent(eventContext, 'submitform',
                    {
                        currentTarget : valjs.context,
                        target: valjs.$form[0],
                        valjs: $.extend({}, { form : valjs.$form[0], context : valjs.context, formData : valjsFormSerialize(valjs.jqContext)})
                    });
                if (submitEvent.isDefaultPrevented()) {
                    // If the submit is stopped from the ValJS Event
                    e.preventDefault();
                } else {
                    // otherwise submit the form
                    $(this).trigger('submit', { valjsDone: trueValue });
                }
                return;
            }

            valjs.waitForIt(function() {
                self.submit();
            });

            /*valjs.workers.wait(function () {
                valjsData(self, dataNameValJsFormContext, valjs);
                var val = valjsValidateForm(valjs, null, false);
                console.warn("wait is over. submit again", val);
//                self.submit();//trigger('submit');
  //              valjs.workers.stopWaiting();
            });*/
        }
        valjsInvokeEvent(eventContext, 'invalidform',
            {
                target: valjs.context,
                valjs: $.extend({}, result, { form : valjs.$form[0], context : valjs.context })
            });
        $(this).removeData(dataNameValJsFormContext);
        e.preventDefault();
        return false;
    }

    function valjsGetEventNames(names) {
        var ret = [], i;
        for (i = 0; i < valjsLength(names); i += 1) {
            ret.push(names[i] + eventNamespace);
        }
        return ret.join(' ');
    }

    function valjsBindElementEvents(valjs) {
        //var t = valjsGetElementType($elm);

        var textElements = 'textarea, ' +
            'input:not([type=checkbox], [type=radio], [type=submit], [type=button])',
            listElements = selectTypeName,
            cbxElements = 'input[type=checkbox], input[type=radio]';

        if (!valjsData(valjs.$form, dataNameValJsBound)) {
            valjsData(valjs.$form, dataNameValJsBound, 1);
            valjs.$form.on(valjsGetEventNames(['submit']), { valjs: valjs }, valjsFormSubmit);
        }

        valjs.jqContext
            //.off( eventNamespace)
            .on(valjsGetEventNames([keydownEvent, keyupEvent]), { valjs: valjs }, valjsSetFormContext)
            .on(valjsGetEventNames([clickEvent, changeEvent, keyupEvent]), textElements, { valjs: valjs }, valjsTestElementChange)
            .on(valjsGetEventNames([clickEvent, changeEvent]), listElements, { valjs: valjs }, valjsTestElementChange)
            .on(valjsGetEventNames([clickEvent, changeEvent]), cbxElements, { valjs: valjs }, valjsTestElementChange);

        $(valjs.s)
            //.off(eventNamespace)
            .on(valjsGetEventNames([clickEvent]), { valjsSubmit: trueValue, valjs: valjs }, valjsSetFormContext);



    }

    function valjsIndexOf(haystack, needle) {
        if (valjsIsUndefined(haystack)) {
            return -1;
        }
        return haystack.indexOf(needle);
    }

    function valjsInitializeModifierShortcuts(config) {
        var elementTypes = config.elements,
            suffixes = config.modifiers || {},
            modifiers = [],
            clean,
            type_index,
            suffix_index,
            i_index,
            result = {};

        for (suffix_index in suffixes) {
            if (suffixes.hasOwnProperty(suffix_index)) {
                modifiers.push(suffix_index);
            }
        }

        for (type_index in elementTypes) {
            if (elementTypes.hasOwnProperty(type_index)) {
                clean = [];
                for (i_index = 0; i_index < valjsLength(modifiers); i_index += 1) {
                    clean.push((config.modifierSeparator ? elementTypes[type_index] + config.modifierSeparator : '') + suffixes[modifiers[i_index]]);
                }
                result[type_index] = clean.join(' ');
            }
        }
        return result;
    }

    function valjsFindInputByNameOrSelector($target, name) {
        var elm = nullValue;
        if (valjsIndexOf(name, '#') === 0) {
            return $(name);
        }
        elm = $target.find('[name="' + name + '"]');
        if (valjsLength(elm) === 0) {
            elm = $target.find(name).first();
        }
        return elm;
    }

    function valjsRefreshElementBindings(valjs) {
        var cssSelectors = valjs.config.selector,
            elms,
            element_index;

        valjs.e = [];

        // 
        // Identify and bind validation rules for the elements
        //
        elms = valjsSelectElements(cssSelectors.elements, valjs.context);
        for (element_index = 0; element_index < valjsLength(elms); element_index += 1) {
            if (startRuleBindingCycle(valjs, elms[element_index])) {
                valjs.e.push(elms[element_index]);
            }
        }

        // 
        // Attach event listeners for any elements with rules
        //
        valjsBindElementEvents(valjs);
    }


    function valjsParseIntBase10(val) {
        return parseInt(val, 10);
    }

    /**
     * Get the file length in a human readable format
     * @param  {[type]} bytes [description]
     * @return {[type]}       [description]
     *
     * Slightly modified version of
     * https://forrst.com/posts/vaScript_nice_file_size_bytes_to_human_read-tQ3
     */
    function valjsFormatBytes(bytes) {
        if (bytes === 0) {
            return 'n/a';
        }
        var sizes = ' KMGTPEZY',
            i = valjsParseIntBase10(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + (i > 0 ? ' ' : '') + (i > 0 ? sizes[i] + 'iB' : ' bytes');
    }

    ValJS.prototype = {
        // Default settings
        defaults: {
            'elements': {
                'submit': 'valjs__submit',
                'field': 'valjs__field',    // Base class for fields
                'form': 'valjs__form',      // Base class for forms
                'label': 'valjs__label',    // Base class for labels
                'msg': 'valjs__msg',        // base class for messages
                'context': 'valjs__context' // Base class for context
            }, // /modifierClassSuffix

            //
            // Set to true to check for new input elements even
            // if valjs was already active for the specified context
            // 
            alwaysTriggerFieldEvents: falseValue,

            liveValidation : trueValue,

            createMsg : trueValue, // Set to false to never create new message elements 

            modifierSeparator : nullValue,

            attrPrefix : '',

            findMsg : valjsFindMsgElement,
            findLabel : valjsFindLabelElement,

            allowRuleInitialization : trueValue,

            setupField : $.noop,

            autoEnableButtons : true,

            /**
            * Modifiers
            * These are always used in combination with elementClassNames.
            *
            * Example:
            *  A field will get the class: 'valjs__field valjs__field--unknown' when it's created
            *  When it's validated will have 'valjs__field valjs__field--valid'
            *  When not validated it will have 'valjs__field valjs__field--invalid' - plus a valjs__field--error OR valjs__field--warning
            */
            'modifiers': {
                'valid': 'valjs-valid',
                'invalid': 'valjs-invalid',
                'unknown': 'valjs-unknown',
                'error': 'valjs-error',
                'warning': 'valjs-warning',

                // For async rules
                'busy' : 'valjs-busy',
                'failed' : 'valjs-failed' 
            }, // /modifierClassSuffix

            'selector': {
                'elements': 'input:not([type=submit], [type=button]),select,textarea',
                'submit': submitQuery
            },

            'submitform' : $.noop
        }, // /defaults

        ruleDefaults: {
            /**
             * If the rule is not found by ValJS for an element then testElement is called to
             * let the rule itself have an extra look to decide weather or not to bind it
             * It can also return default settings that can be configurable via attributes
             * 
             * @type {[type]}
             */
            testElement: $.noop,

            /**
             * The bind function binds the rule to the element. Return false if
             * the binding should not be bound
             * @type {[type]}
             */
            bind: $.noop,

            /**
             * The rules will be sorted by priority before executed
             * @type {Number}
             */
            prio : 100,

            /**
             * Run the rule in the validation process
             * @type {[type]}
             */
            run: $.noop,
            options : { value : trueValue },

            findMsg : $.noop
        },

        validateForm: function (options) {
            var valjs = valjsData($(this), dataNameValJsInstance),
                options = $.extend({
                    includeHidden : false 
                }, options);

            return valjsValidateForm(valjs, jQuery.Event('validateForm'), false, options);
        },


/*        getFieldType : function () {
            return valjsGetElementType($(this));
        },*/

        updateBindings : function () {
            valjsRefreshElementBindings(valjsData($(this), dataNameValJsInstance));
        },

        getRuleMessages : function () {
            valjsRefreshElementBindings(valjsData($(this), dataNameValJsInstance));
        },

        init: function () {

            this.config = $.extend(trueValue, {}, this.defaults, superglobals, ValJS.global, this.options);
            var self = this,    // so we can initialize valjs asyncronosly
                cssSelectors = this.config.selector;

            // Cache classnames to easily clear an element from statuses
            this.vars = valjsInitializeModifierShortcuts(this.config);

            if (this.jqContext.prop('tagName') === 'FORM') {
                this.$form = this.jqContext;
            } else {
                this.$form = this.jqContext.closest('form');
                if (valjsData(this.$form, dataNameValJsInstance)) {
                    //                        window.console && window.console.warn(this.jqContext);
                    throw "valjs: form/context conflict";
                }
            }

            valjsJsAddClass(this.jqContext, valjsGetClass(this, 'context'));
            valjsJsAddClass(this.$form.attr('novalidate', ''), valjsGetClass(this, 'form'));
            // Find all submit buttons
            this.s = $(valjsSelectElements(cssSelectors.submit, this.jqContext));
            valjsJsAddClass(this.s, valjsGetClass(this, 'submit'));

            if (this.config.submitform) {
                if (this.config.submitform !== $.noop) {
                    this.jqContext.on('submitform.valjs', this.config.submitform);
                }
            }

            // Run initialization async if init is a function
            if (valjsIsFunction(this.config.init)) {
                setTimeout(function () {
                    valjsRefreshElementBindings(self);
                    self.config.init(self);
                }, 1);
            } else {
                valjsRefreshElementBindings(self);
            }

            return this;
        },

        /**
         * Make sure potentially new elements are also
         * included.
         * @return {[type]} [description]
         */
        refresh: function () {
            valjsRefreshElementBindings(this);
        },

        isElementBound : function () {
            return valjsData($(this), dataNameValjsBinding) ? trueValue : falseValue;
        },

        /**
         * To disable validation for elements matching the selector
         * @param  {[type]} selector
         * @return {[type]}
         */
        disable: function (selector) {
            if (this.valjsv) {
                // find was faster than filter...
                var elements = this.$elm.find(selector);
                valjsData(elements, this.vars.off, 1);
            }
        }
    };

    /*function _callByChildElement(method, obj, args, index) {
        console.warn(method);
        console.warn(obj);
        console.warn(args);
        $(obj).addClass('valjs__field--off')
        return this;
    }*/

    ValJS.idCounter = 0;
    ValJS.ruleDefaults = ValJS.prototype.ruleDefaults;
    ValJS.global =  {};
    ValJS.addRule = valjsAddRule;
    ValJS.rules = { k: [] };

    function valjsCallByChildElement(o, i, args) {
        if (ValJS.prototype[o]) {
            return ValJS.prototype[o].apply($(i), args);
        }
        var binding = valjsData($(i), dataNameValjsBinding);
        if (binding) {
            return binding[o].apply(binding, args);
        }
        return {};
    }

    /**
    * Hook it up as a jQuery Plugin
    */
    $.fn.valjs = function (options) {
        if (ValJS.prototype[options]) {
            return ValJS.prototype[options]
                .apply($(this), Array.prototype.slice.call(arguments, 1));
        }
        if (ValjsElementBinding.prototype[options] && valjsData($(this), dataNameValjsBinding)) {
            // Call element-level function
            var args = Array.prototype.slice.call(arguments, 1),
                ret = this.map(function (i) {
                    return valjsCallByChildElement(options, this, args, i);
                });
            if (ret.length === 1) {
                return ret[0];
            }
            return ret;
        }
        if (typeof options === 'object' || !options) {
            return this.each(function () {
                if (valjsData($(this), dataNameValJsInstance)) {
                    $(this).valjs('updateBindings');
                    return this;
                }
                new ValJS(this, options || {}).init();
            });
        }
        $.error('No ValJS method ' + options);
    };

    /*
     * Here are the built in rules
     * 
     * 
     */

     // http://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number#answer-16591175
    /**
     * Calculate date from a given week and year
     * @param  {Number} w [description]
     * @param  {Number} y [description]
     * @return {Date}   [description]
     */
    function getDateOfISOWeek(y, w) {
        var simple = new Date(y, 0, 1 + (w - 1) * 7),
            dow = simple.getDay(),
            ISOweekStart = simple;
        if (dow <= 4) {
            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        } else {
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        }
        return ISOweekStart;
    }

    function valjsGetWeekYear(date) {
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        return date.getFullYear();
    }

/*    function valjsDateWeek(date) {
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    }*/

    function valjsGetDatePattern(format, macros) {
        var i, indexes = {}, n = 0, find, replace,
            ret = {
                isDate : falseValue,
                isWeek : falseValue,
                isDateRelated : falseValue,
                pattern : '',
                macroPositions : []
            };

        for (i = 0; i < valjsLength(macros); i += 1) {
            ret.macroPositions.push([macros[i], valjsIndexOf(format, '%' + macros[i])]);
            if (macros[i] === 'm') {
                ret.isDate = trueValue;
            } else if (macros[i] === 'H') {
                // One macro is hour, so it's a datetime
                ret.isDateTime = trueValue;
            } else if (macros[i] === 'w') {
                ret.isWeek = trueValue;
            }
        }

        ret.isDateRelated = ret.isDate || ret.isDateTime;
        ret.isDate = !ret.isWeek && !ret.isDateTime;

        ret.macroPositions.sort(function (a, b) {
            a = a[1];
            b = b[1];
            return a < b ? -1 : (a > b ? 1 : 0);
        });

        for (i = 0; i < ret.macroPositions.length; i += 1) {
            if (ret.macroPositions[i][1] !== -1) {
                indexes[ret.macroPositions[i][0]] = n;
                n += 1;
            }
        }
        ret.pattern = format.replace('.', '\\.').replace('(', '\\(').replace(')', '\\)').replace(/\\/g, '\\\\');

        for (i = 0; i < valjsLength(macros); i += 1) {
            find = '%' + macros[i];
            switch (macros[i]) {
            case 'y':
                replace = "(\\d{4})";
                break;
            default:
                replace = "(\\d{1,2})";
                break;
            }
            ret.pattern = ret.pattern.replace(find, replace);
        }
        return ret;
    }

    function valjsMapDateRelatedDateParts(data, find) {
        var d, ret;
        find.m -= 1;
        if (data.isDate) {
            d = new Date(find.y, find.m, find.d);
        } else {
            d = new Date(find.y, find.m, find.d, find.H, find.M);
        }
        if (d.getFullYear() === find.y) {
            if (d.getMonth() === find.m) {
                if (d.getDate() === find.d) {
                    if (data.isDateTime) {
                        if (d.getHours() === find.H && d.getMinutes() === find.M) {
                            ret = $.extend(trueValue, {}, find, {'date' : d});
                        }
                    } else {
                        ret = $.extend(trueValue, {}, find, {'date' : d});
                    }
                }
            }
        }
        return ret;
    }

    function valjsMapWeekDateParts(find) {
        var d, ret;
        d = getDateOfISOWeek(find.y, find.w);
        if (find.w === 1) {
            if (valjsGetWeekYear(d) === find.y - 1) {
                ret = $.extend(trueValue, {}, find, {'date' : d});
            }
        }
        if (d.getFullYear() === valjsGetWeekYear(d) && d.getFullYear() === find.y) {
            ret = $.extend(trueValue, {}, find, {'date' : d});
        }
        return ret;
    }

    function valjsExtractDateParts(dateString, format, macros) {

        if (dateString === 'now') {
            return {date: new Date()};
        }
        var i,
            data,
            find,
            matches,
            ret = nullValue,
            re;

        data = valjsGetDatePattern(format, macros);

        re = new RegExp("^" + data.pattern + "$");
        if (re) {
            matches = re.exec(dateString);
            if (matches) {
                find = {};
                for (i = 1; i < matches.length; i += 1) {
                    find[data.macroPositions[i - 1][0]] = valjsParseIntBase10(matches[i]);
                }
                if (data.isDateRelated) {
                    ret = valjsMapDateRelatedDateParts(data, find);
                } else {
                    ret = valjsMapWeekDateParts(find);
                }

            }
        }
        return ret;
    }

    function valjsDateMinMax(valjsArgs, date, format, macros) {
        var max = valjsExtractDateParts(valjsArgs.config.max, format, macros),
            min = valjsExtractDateParts(valjsArgs.config.min, format, macros);
        if (min && date < min.date) {
            return 'min';
        }
        if (max && date > max.date) {
            return 'max';
        }
        return trueValue;
    }

    function valjsWeekMinMax(valjsArgs, data, format, macros) {
        var max = valjsExtractDateParts(valjsArgs.config.max, format, macros),
            min = valjsExtractDateParts(valjsArgs.config.min, format, macros);
        if (min && data.date < min.date) {
            return 'min';
        }
        if (max && data.date > max.date) {
            return 'max';
        }
        return trueValue;
    }

    function valjsTryParseDate(valjsArgs, type) {
        var datestring = valjsArgs.field.value,
            format = valjsArgs.config.format,
            parsed;

        if (type === "d") {
            parsed = valjsExtractDateParts(datestring, format, ['y', 'm', 'd']);
            if (parsed) {
                return valjsDateMinMax(valjsArgs, parsed.date, '%y-%m-%d', ['y', 'm', 'd']);
            }
        } else if (type === "dt") {
            parsed = valjsExtractDateParts(datestring, format, ['y', 'm', 'd', 'H', 'M']);
            if (parsed) {
                return valjsDateMinMax(valjsArgs, parsed.date, '%y-%m-%d %H:%M', ['y', 'm', 'd', 'H', 'M']);
            }
        } else if (type === "w") {
            parsed = valjsExtractDateParts(datestring, format, ['y', 'w']);
            if (parsed) {
                return valjsWeekMinMax(valjsArgs, parsed, '%y-W%w', ['y', 'w']);
            }
        }
        return falseValue;
    }

    function valjsGetMinMaxIfMultiselect(element, getAttr) {
        var elm = element.valjs('getFieldType'),
            val = valjsGetAttr(element, getAttr);

        if (elm.type === 'select' && elm.isMultiple === trueValue) {
            return !valjsIsUndefined(val) ? { value : val } : falseValue;
        }
        return falseValue;
    }

    /**
     * Require a minimum number of items to be selected in a
     * multiple select list
     *
     *  data-listmin-min="2" or min="2"
     */
    valjsAddRule('listmin', {
        options : {
            msg : 'Select more items'
        },
        testElement: function (valjsArgs) {
            return valjsGetMinMaxIfMultiselect(valjsArgs.element, 'min');
        },
        run: function (valjsArgs) {
            var value = valjsArgs.config.value,
                selectedElements = valjsLength(valjsSelectElements('option:selected', valjsArgs.element));
            return selectedElements >= value;
        },
        bind: function (valjsArgs) {
            return {
                value: valjsParseIntBase10(valjsArgs.config.value)
            };
        }
    });

    valjsAddRule('listmax', {
        options : {
            msg : 'Too many items selected'
        },
        testElement: function (valjsArgs) {
            return valjsGetMinMaxIfMultiselect(valjsArgs.element, 'max');
        },
        run: function (valjsArgs) {
            var value = valjsArgs.config.value,
                selectedElements = valjsLength(valjsSelectElements('option:selected', valjsArgs.element));
            return selectedElements <= value;
        },
        bind: function (valjsArgs) {
            return {
                value : valjsParseIntBase10(valjsArgs.config.value)
            };
        }
    });

    /**
     * Require a field to contain a date in a specific pattern
     *
     *  type="date" or data-date
     */
    valjsAddRule(ruleNameDate, {
        options : {
            msg : {
                'error' : 'Invalid date',
                'max' : 'Enter an earlier date',
                'min' : 'Enter a later date'
            },
            format : '%y-%m-%d'
        },

        testElement: function (valjsArgs) {
            return valjsArgs.element.attr('type') === valjsArgs.rule.name;
        },
        bind: function (valjsArgs) {
            var element = valjsArgs.element,
                attrValue,
                ret = {};

            attrValue = valjsGetAttr(element, 'min');
            if (attrValue) {
                ret.min = attrValue;
            }
            attrValue = valjsGetAttr(element, 'max');
            if (attrValue) {
                ret.max = attrValue;
            }
            return ret;
        },
        run: function (valjsArgs) {
            var d;
            if (valjsLength(valjsArgs.field.value) === 0) {
                return trueValue;
            }
            d = valjsTryParseDate(valjsArgs, 'd');
            return d;
        }
    });

    valjsAddRule('datetime', {
        options : {
            msg : {
                'error' : 'Invalid date',
                'max' : 'Enter an earlier date',
                'min' : 'Enter a later date'
            },
            format : '%y-%m-%d %H:%M'
        },
        testElement: function (valjsArgs) {
            return valjsArgs.element.attr('type') === valjsArgs.rule.name;
        },
        bind: function (valjsArgs) {
            var element = valjsArgs.element,
                attrValue,
                ret = {};

            attrValue = valjsGetAttr(element, 'min');
            if (attrValue) {
                ret.min = attrValue;
            }
            attrValue = valjsGetAttr(element, 'max');
            if (attrValue) {
                ret.max = attrValue;
            }
            return ret;
        },
        run: function (valjsArgs) {
            if (valjsLength(valjsArgs.field.value) === 0) {
                return trueValue;
            }
            return valjsTryParseDate(valjsArgs, 'dt');
        }
    });

    valjsAddRule(ruleNameWeek, {
        options : {
            msg : {
                'error' : 'Invalid week',
                'max' : 'Enter an earlier week',
                'min' : 'Enter a later week'
            },
            format : '%y-W%w'
        },
        testElement: function (valjsArgs) {
            return valjsArgs.element.attr('type') === valjsArgs.rule.name;
        },
        bind: function (valjsArgs) {
            var element = valjsArgs.element,
                attrValue,
                ret = {};

            attrValue = valjsGetAttr(element, 'min');
            if (attrValue) {
                ret.min = attrValue;
            }
            attrValue = valjsGetAttr(element, 'max');
            if (attrValue) {
                ret.max = attrValue;
            }
            return ret;
        },
        run: function (valjsArgs) {
            if (valjsLength(valjsArgs.field.value) === 0) {
                return trueValue;
            }
            return valjsTryParseDate(valjsArgs, 'w');
        }
    });

    valjsAddRule('required', {
        options : {
            msg : 'Required',
            trim : falseValue,           // True if text fields should be 
            emptyIndex : undefined,      // (Lists) the value that should count as "not selected"
            emptyValue : undefined       // (Lists) the index that should count as "not selected"
        },

        // We want the required rule to execute first
        prio : 10,

        testElement: function (valjsArgs) {
            return !valjsIsUndefined(valjsArgs.element.attr(valjsArgs.rule.name));
        },
        run: function (valjsArgs) {
            var $elm = valjsArgs.element,
                type = valjsArgs.field.type,
                val = valjsArgs.field.value,
                idx = 0;
            if (type === 'text' || type === 'textarea' || type === "file") {
                val = valjsArgs.config.trim === trueValue ? $.trim(valjsArgs.field.value) : val;
                if (valjsLength(val) === 0) {
                    return keyNameDefault;
                }
            } else {
                if (type === selectTypeName) {
                    if (valjsIsUndefined($elm.attr('multiple'))) {
                        if (!valjsIsUndefined(valjsArgs.config.emptyIndex)) {
                            idx = valjsParseIntBase10(valjsArgs.config.emptyIndex);
                            val = valjsSelectElements('option:selected', $elm).index();
                            if (val === idx) {
                                return keyNameDefault;
                            }
                            return trueValue;
                        }
                        if (!valjsIsUndefined(valjsArgs.config.emptyValue)) {
                            if (val[0] === valjsArgs.config.emptyValue) {
                                return keyNameDefault;
                            }
                            return trueValue;
                        }
                        if (valjsLength(val[0]) === 0) {
                            return keyNameDefault;
                        }
                    } else {
                        if (valjsLength(val) === 0) {
                            return keyNameDefault;
                        }
                    }
                } else {
                    if (type === 'checkbox' || type === "radio") {
                        if (val === falseValue) {
                            return keyNameDefault;
                        }
                    }
                }
            }
            return trueValue;
        }
    });


    function valjsParseNumber(val, separator, decimal) {
        var parsed;
        if (!val) {
            return NaN;
        }
        if (separator !== '.') {
            val = val.replace('.', '=-=!');
        }
        val = val.replace(separator, '.');
        val = val.replace(/^0+(\d)/, "$1");
        if (decimal) {
            val = val.replace(/\.0+$/, "");
            if (val.indexOf('.') !== -1) {
                val = val.replace(/\.([0-9]+?)(0+)$/, ".$1");
            }
        }
        parsed = decimal ? parseFloat(val) : valjsParseIntBase10(val);
        if (String(parsed) === String(val)) {
            return parsed;
        }
        return NaN;
    }

    valjsAddRule(rulenameNumber, {
        options : {
            msg : {
                'error' : 'Not a number',
                'max' : 'Value too high',
                'min' : 'Value too low'
            },
            separator : '.',
            step : nullValue
        },

        testElement: function (valjsArgs) {
            return valjsArgs.element.attr("type") === "number";
        },

        run: function (valjsArgs) {
            var val = valjsArgs.field.value,
                decimal = valjsArgs.config.step === 'any',
                max = valjsParseNumber(valjsArgs.config.max, '.', decimal),
                min = valjsParseNumber(valjsArgs.config.min, '.', decimal),
                parsed = val;

            if (valjsLength(val) !== 0) {
                parsed = valjsParseNumber(val, valjsArgs.config.separator, decimal);

                if (isNaN(parsed)) {
                    return falseValue;
                }

                if (!isNaN(min)) {
                    if (parsed < min) {
                        return 'min';
                    }
                }

                if (!isNaN(max)) {
                    if (parsed > max) {
                        return 'max';
                    }
                }

                return trueValue;
            }

            return trueValue;
        },

        bind: function (valjsArgs) {
            return {
                step : valjsGetAttr(valjsArgs.element, 'step'),
                min : valjsGetAttr(valjsArgs.element, 'min'),
                max : valjsGetAttr(valjsArgs.element, 'max')
            };
        }
    });

    function valjsTestBindTextLength(fieldType) {
        if (fieldType.type === "text" || fieldType.type === "textarea") {
            if (!fieldType.date && !fieldType.number && !fieldType.week && !fieldType.datetime) {
                return trueValue;
            }
        }
    }


    function ruleHelperGetFieldValue(valjsArgs) {
        return valjsArgs.binding.getFieldValue().value;
    }

    function ruleHelperGetRuleConfig(valjsArgs) {
        return valjsArgs.binding.getRule();
    }

    function ruleHelperGetElement(valjsArgs) {
        return valjsArgs.binding.getElement();
    }

    function ruleHelperGetFieldType(valjsArgs) {
        return valjsArgs.binding.getFieldType();
    }

    function ruleHelperHasRules(valjsArgs, name) {
        return valjsArgs.binding.hasRule(name);
    }

    valjsAddRule('textmax', {
        options : {
            msg : {
                'error' : 'Text too long'
            }
        },

        prio : 150,

        testElement: function (valjsArgs) {
            var fieldType = valjsArgs.element.valjs('getFieldType'),
                val = valjsGetAttr(valjsArgs.element, 'max');
            if (val) {
                if (valjsTestBindTextLength(fieldType)) {
                    return {
                        value : val
                    };
                }
            }
        },
        bind : function (valjsArgs) {
            var config = ruleHelperGetRuleConfig(valjsArgs);

            // We do not want to bind if the other rules that use min or max
            // are bound to this element
            if (ruleHelperHasRules(valjsArgs, rulesUsingMinMax)) {
                return falseValue;
            }

            // Make sure the value is an integer when we bind the rule
            return $.extend(trueValue, config, {
                value : valjsParseIntBase10(config.value)
            });
        },
        run: function (valjsArgs) {
            var value = ruleHelperGetFieldValue(valjsArgs),
                config = ruleHelperGetRuleConfig(valjsArgs);
            if (value) {
                if (valjsLength(value) > config.value) {
                    return falseValue;
                }
            }
            return trueValue;
        }
    });

    valjsAddRule('textmin', {
        options : {
            msg : {
                'error' : 'Text too short'
            }
        },

        prio : 150,

        testElement: function (valjsArgs) {
            var fieldType = valjsArgs.element.valjs('getFieldType'),
                val = valjsGetAttr(valjsArgs.element, 'min');
            if (val) {
                if (valjsTestBindTextLength(fieldType)) {
                    return {
                        value : val
                    };
                }
            }
        },

        bind: function (valjsArgs) {
            var config = ruleHelperGetRuleConfig(valjsArgs);
            // We do not want to bind if the other rules that use min or max
            // are bound to this element
            if (ruleHelperHasRules(valjsArgs, rulesUsingMinMax)) {
                return falseValue;
            }

            // Make sure the value is an integer when we bind the rule
            return $.extend(trueValue, config, {
                value : valjsParseIntBase10(config.value)
            });
        },
        run: function (valjsArgs) {
            var value = ruleHelperGetFieldValue(valjsArgs);
            if (value) {
                if (valjsLength(value) < ruleHelperGetRuleConfig(valjsArgs).value) {
                    return falseValue;
                }
            }
            return trueValue;
        }
    });

    valjsAddRule(ruleNameFileMax, {
        options : {
            msg : {
                'error' : nullValue,
                'one' : 'File too large',
                'all' : 'Total size too large'
            }
        },

        testElement: function (valjsArgs) {
            var fieldType = valjsArgs.element.valjs('getFieldType'),
                val = valjsGetAttr(valjsArgs.element, 'max');

            if (fieldType.type === "file" && val) {
                return {
                    value : val
                };
            }
        },

        bind: function (valjsArgs) {
            var config = ruleHelperGetRuleConfig(valjsArgs);

            // Make sure the value is an integer when we bind the rule
            return $.extend(trueValue, config, {
                value : valjsParseIntBase10(config.value)
            });
        },

        run: function (valjsArgs) {
            var max = ruleHelperGetRuleConfig(valjsArgs).value,
                element = ruleHelperGetElement(valjsArgs),
                singleFileSize,
                f = element[0].files,
                flen = valjsLength(f),
                file_index,
                file_size = 0;

            if (flen > 0) {
                for (file_index = 0; file_index < flen; file_index += 1) {
                    singleFileSize = f[file_index].size;
                    file_size += singleFileSize;
                    if (singleFileSize > max) {
                        return {
                            msg : 'one',
                            maxKiB : max,
                            maxsize: valjsFormatBytes(max),
                            filename : f[file_index].name,
                            fileKiB : singleFileSize,
                            filesize : valjsFormatBytes(singleFileSize)
                        };
                    }
                }

                if (file_size > max) {
                    return {
                        msg : 'all',
                        totalKiB : file_size,
                        totalsize : valjsFormatBytes(file_size),
                        maxsize : valjsFormatBytes(max),
                        maxKiB : max
                    };
                }
            }
            return trueValue;
        }
    });

    valjsAddRule(ruleNameFileMin, {
        options : {
            msg : {
                'error' : nullValue,
                'one' : 'File too small',
                'all' : 'Total size too small'
            }
        },

        testElement: function (valjsArgs) {
            var fieldType = valjsArgs.element.valjs('getFieldType'),
                val = valjsGetAttr(valjsArgs.element, 'min');

            if (fieldType.type === "file" && val) {
                return {
                    value : val
                };
            }
        },

        bind: function (valjsArgs) {
            var config = ruleHelperGetRuleConfig(valjsArgs);
            // Make sure the value is an integer when we bind the rule
            return $.extend(trueValue, config, {
                value : valjsParseIntBase10(config.value)
            });
        },

        run : function (valjsArgs) {
            var min = ruleHelperGetRuleConfig(valjsArgs).value,
                element = ruleHelperGetElement(valjsArgs),
                singleFileSize,
                f = element[0].files,
                flen = valjsLength(f),
                file_index,
                file_size = 0;

            if (flen > 0) {
                for (file_index = 0; file_index < flen; file_index += 1) {
                    singleFileSize = f[file_index].size;
                    file_size += singleFileSize;
                    if (singleFileSize < min) {
                        return {
                            msg : 'one',
                            minbytes : min,
                            minsize: valjsFormatBytes(min),
                            filename : f[file_index].name,
                            filebytes :  singleFileSize,
                            filesize : valjsFormatBytes(singleFileSize)
                        };
                    }
                }

                if (file_size < min) {
                    return {
                        msg : 'all',
                        totalbytes : file_size,
                        totalsize : valjsFormatBytes(file_size),
                        minsize : valjsFormatBytes(min),
                        minbytes : min
                    };
                }
            }
            return trueValue;
        }
    });

    function valjsValidateDomain(domain, domainLen, local, localLen) {
        if (localLen < 1 || localLen > 64) {
            // local part length exceeded
            return false;
        }
        if (domainLen < 1 || domainLen > 255) {
            // domain part length exceeded
            return false;
        }
        if (local[0] === '.' || local[localLen - 1] === '.') {
            // local part starts or ends with '.'
            return false;
        }
        if (/\.\./.test(local)) {
            // local part has two consecutive dots
            return false;
        }
        if (!/^[åäöA-Za-z0-9\\-\\.]+$/.test(domain)) {
            // character not valid in domain part
            return false;
        }
        if (!/^[åäöA-Za-z0-9\\-\\.]+$/.test(domain)) {
            // character not valid in domain part
            return false;
        }
        if (/\.\./.test(domain)) {
            // domain part has two consecutive dots
            return false;
        }
        if (!/^(\.|[A-Za-z0-9!#%&`_=\/$\'*+?\^{}|~.\-])+$/.test(local.replace("\\\\", ""))) {
            // character not valid in local part unless 
            // local part is quoted
            if (!/^"(\\\\"|[^"])+"$/.test(local.replace("\\\\", ""))) {
                return false;
            }
        }
        return trueValue;

    }

    valjsAddRule('email', {

        options : {
            msg : {
                'error' : 'Invalid e-mail'
            },
            domain : trueValue
        },

        testElement: function (valjsTestArgs) {
            return valjsTestArgs.element.attr('type') === valjsTestArgs.rule.name;
        },

        run: function (valjsRunArgs) {
            var v = ruleHelperGetFieldValue(valjsRunArgs),
                atIndex,
                isValid = trueValue,
                domain,
                local,
                localLen,
                domainLen;

            if (valjsLength(v) > 0) {
                if (!valjsIsString(v)) {
                    v  = v[0];
                }
                atIndex = v.indexOf('@');
                if (atIndex === -1) {
                    isValid = falseValue;
                } else {
                    domain = v.substr(atIndex + 1);
                    local = v.substr(0, atIndex);
                    localLen = local.length;
                    domainLen = domain.length;
                    isValid = valjsValidateDomain(domain, domainLen, local, localLen);
                    if (valjsRunArgs.config.domain) {
                        if (!/\.[a-z]{2,4}$/.test(v)) {
                            isValid = falseValue;
                        }
                    }
                }
                // return false to show the default msg
                return isValid ? trueValue : falseValue;
            }
            return trueValue;
        },

        bind: function (valjsBindArgs) {
            var type = ruleHelperGetFieldType(valjsBindArgs).type,
                element = ruleHelperGetElement(valjsBindArgs);
            if (type === 'select' && !valjsIsUndefined(element.attr('multiple'))) {
                return falseValue;
            }
            return trueValue;
        }
    });

    valjsAddRule('confirm', {

        options : {
            msg : {
                'error' : "Fields don't match",
                'invalidSource' : 'Source field invalid'
            }
        },

        run: function (valjsArgs) {
            var element = ruleHelperGetElement(valjsArgs),
                otherElement = ruleHelperGetRuleConfig(valjsArgs).celm;

            if (otherElement.valjs('isElementBound')) {
                if (!valjsTestIsElementReadyForValidation(otherElement)) {
                    return trueValue;
                }
                if (otherElement.valjs('getFieldStatus') === 0) {
                    otherElement.valjs('validateField');
                }
                if (otherElement.valjs('getFieldStatus') === -1) {
                    return 'invalidSource';
                }
            }
            return otherElement.val() === element.val() ? trueValue : falseValue;
        },

        bind: function (valjsBindRuleArgs) {
            var e = valjsFindInputByNameOrSelector(valjsBindRuleArgs.context, valjsBindRuleArgs.config.value);
            if (!valjsIsUndefined(e)) {
                if (valjsBindRuleArgs.valjs.config.liveValidation) {
                    e.on('keydown keyup change blur', function () {
                        valjsBindRuleArgs.element.valjs('validateField');
                    })
                        .on('validfield.valjs', function () {
                            valjsBindRuleArgs.element.valjs('validateField');
                        });
                }
                return {
                    celm: e
                };
            }
        }
    });

    valjsAddRule('pattern', {
        options : {
            ignoreCase : falseValue,
            invert : falseValue,
            msg : {
                'error' : "Incorrect format"
            }
        },

        testElement: function (valjsArgs) {
            var val = valjsGetAttr(valjsArgs.element, 'pattern');
            if (val) {
                return {
                    value : val
                };
            }
        },

        run: function (valjsArgs) {
            var config = ruleHelperGetRuleConfig(valjsArgs),
                options = (config.ignoreCase ? 'i' : ''),
                invert = config.invert,
                re = new RegExp(config.value, options),
                isMatch,
                val = ruleHelperGetFieldValue(valjsArgs);
            if (val) {
                if (re) {
                    isMatch = re.test(val);
                    if (isMatch) {
                        if (invert) {
                            return falseValue;
                        }
                        return trueValue;
                    }
                    if (invert) {
                        return trueValue;
                    }
                }
                return falseValue;
            }
            return trueValue;
        }
    });

    valjsAddRule('url', {
        options : {
            value : '',
            msg : {
                'error' : "Invalid URL"
            }
        },
        testElement: function (valjsArgs) {
            return valjsGetAttr(valjsArgs.element, 'type') === 'url';
        },
        run: function (valjsArgs) {
            var fieldValue = ruleHelperGetFieldValue(valjsArgs);
            if (fieldValue) {
                return (/^(https?|s?ftp|wss?):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i).test(fieldValue);
            }
            return trueValue;
        }
    });

    valjsAddRule('security', {
        options : {
            value : 'luns',
            match: 2,
            msg : {
                'error' : "Requirements not met"
            }
        },
        bind: function (valjsArgs) {
            return {
                match : valjsParseIntBase10(valjsArgs.config.match)
            };
        },
        run: function (valjsArgs) {
            var cfg = ruleHelperGetRuleConfig(valjsArgs),
                specials = '!@#$%^&*()_+|~-=â€˜{}[]:";â€™<>?,./',
                value = ruleHelperGetFieldValue(valjsArgs),
                rules = cfg.value,
                match = cfg.match,
                count = 0,
                re;

            if (match > rules.length) {
                match = rules.length;
            }

            if (valjsIndexOf(rules, 'l') !== -1) {
                count += (value.match(/[a-z]/) ? 1 : 0);
            }

            if (valjsIndexOf(rules, 'u') !== -1) {
                count += (value.match(/[A-Z]/) ? 1 : 0);
            }

            if (valjsIndexOf(rules, 'n') !== -1) {
                count += (value.match(/\d/) ? 1 : 0);
            }

            if (valjsIndexOf(rules, 's') !== -1) {
                re = new RegExp("[" + specials.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + "]");
                if (value.match(re)) {
                    count += 1;
                }
            }
            return count >= match ? trueValue : falseValue;
        }
    });

    valjsAddRule('remote', {
        async : 1000,
        prio : 1500, // Should be the last thing to run
        
        // Only run this event on change
        checkEvent : function(e) {
            return e && e.type === "change";
        },

        options : {
            allowFailed : false,
            prepare : function(valjsArgs) {
                return {
                    field : valjsArgs.element.attr('name'),
                    value : valjsArgs.field.value
                };
            },
            msg : {
                'error' : "Invalid entry",
                'fail' : 'Unable to validate',
                'busy' : 'Validating...'
            },
            ajax : {
                method : 'post',
                dataType : 'json',
                success : function(jSend) {
                    if (valjsIsString(jSend)) {
                        return this.reject('fail');
                    }
                    if (jSend.status && jSend.status === "success") {
                        this.resolve(true);
                    } else {
                        this.resolve(jSend.data); 
                    }
                },
                error : function(a,b,c) {
                    if (b !== "abort") { 
                        this.reject("fail");
                    }
                }
            }
        },

        abort : function() {
            if (this._timer) {
                clearTimeout(this._timer);
            }
            if (this._ajax) {
                this._ajax.abort();
                this._ajax = null;
            }
        },

        run : function(valjsArgs) {
            var  data = {},
            self = this,
            cfg = valjsArgs.binding.getRule(),
            data = cfg.prepare(valjsArgs);
            
            if (this._timer) {
                clearTimeout(this._timer);
            }

            this._timer = setTimeout(function() {
                self._ajax = $.ajax($.extend(true, {
                    url : cfg.value,
                    data : data
                }, cfg.ajax, {
                    context : self
                }));
            }, 300);
            
            return this.makePromise();
        }
    });

    return ValJS;
}(window, jQuery));
