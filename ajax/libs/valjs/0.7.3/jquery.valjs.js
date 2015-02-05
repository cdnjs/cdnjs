/*! ValJS v0.7.3 (2015-01-03) | (c) 2014 | www.valjs.io */
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
    /** @global $ */
    var dataNameValJsInstance = 'vjs-i',
        ValJS = function (elm, options) {
            this.valjsv = '0.7.2';
            this.context = elm;
            this.jqContext = $(elm);
            this.jqContext.data(dataNameValJsInstance, this);
            this.options = options;
            this.metadata = this.jqContext.data('valjs');
            this.$form = null;

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
        msgValJSNotFound = "ValJS not found",
        dataNameValJsValueCache = 'vjs-vc',
        dataNameValJsHash = 'vjs-h',
        dataNameValJsContext = 'vjs-ct',
        dataNameValJsIsValid = 'vjs-v',
        dataNameValJsFormContext = 'vjs-fct',
        dataNameValJsBound = 'vjs-b',
        dataNameValjsConfig = 'vjs-cfg',
        dataNameValjsElementMsg = 'vjs-msge',

        dataNameValjsValidationStatus = 'vjs-vs',

        keyNameDefault = "error",
        eventNamespace = '.valjs',

        rulesUsingMinMax = ['week', 'date', 'datetime', 'number', 'listmax', 'filemin', 'filemax'],

        clickEvent = 'click',
        changeEvent = 'change',
        keyupEvent = 'keyup',
        keydownEvent = 'keydown',
        blurEvent = 'blur';

    /**
     * Wrapper function for jQuerys extend
     * http://api.jquery.com/jquery.extend/
     * 
     * @return {object} The merged object
     */
    function valjsExtend() {
        var args = Array.prototype.slice.call(arguments);
        return $.extend.apply($, args);
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
        if (!valjsIsUndefined(o) && o !== null && !valjsIsUndefined(o.length)) {
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

        if (valjsIsString(existingObject)) {
            existingObject = {
                'error' : existingObject
            };
        }
        if (valjsIsFunction(msgObject)) {
            msgObject = {
                'error' : msgObject
            };
        }

        if (valjsIsString(msgObject)) {
            if (valjsIsUndefined(existingObject)) {
                msgObject = { 'error' : msgObject };
            } else {
                msgObject = valjsExtend(trueValue, { 'error' : msgObject }, existingObject);
            }
        } else if (valjsIsUndefined(msgObject)) {
            msgObject = existingObject;
        } else if (typeof msgObject === "object") {
            msgObject = valjsExtend(trueValue, {}, msgObject, existingObject);
        } else {
            if (console && console.error) {
                console.error("valjsGetMsgConfig", msgObject, existingObject);
            }
        }

        return msgObject;
    }


    /**
     * Internal method for adding a rule (available for public as well)
     * @param  {string} name        The rule name
     * @param  {object} ruleConfig  The rule definition
     */
    function valjsAddRule(name, ruleConfig) {
        var options = ruleConfig.options;

        if (!/^[a-z]+$/.test(name)) {
            $.error('Bad rule name');
            return;
        }

        if (!valjsIsUndefined(options)) {
            if (!valjsIsUndefined(options.msg)) {
                options.msg = valjsGetMsgConfig(options.msg);
            }
        }
        if (valjsIsUndefined(ruleConfig.value)) {
            ruleConfig.value = trueValue;
        }
        ruleConfig = valjsExtend(trueValue, {}, ValJS.ruleDefaults, {name: name}, ruleConfig);
        wj.rules.k.push(name);
        wj.rules[name] = ruleConfig;
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
            return null;
        }
        cfg = $elm.data(dataNameValjsConfig);
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

        // We cache this check
        if (!valjsIsUndefined($elm.data(dElmType))) {
            return $elm.data(dElmType);
        }

        var type = $elm.prop('tagName').toLowerCase(),
            result = {
                type: null
            },

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

        $elm.data(dElmType, result);
        return result;
    }

    /**
     * Helper function to extract the value for an element
     * @param  {object} $elm  jQuery element
     * @param  {[type]} event Event triggering that we want a value
     * @return {object}       Object contining properties with the element value
     */
    function valjsGetElementValue($elm, event) {
        var et = valjsGetElementType($elm),
            originalValue = $elm.data(dataNameValJsValueCache),
            value = null,
            ret = {
                value: null,
                upd: trueValue // true if the value has changed since last time
            };

        if (et.type === 'submit') {
            return ret;
        }
        switch (et.type) {
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

        if (!valjsIsUndefined(originalValue)) {
            if (originalValue === value) {
                ret.upd = falseValue;
            }
        } else {
            if (!valjsIsUndefined(event) && event.type === 'click') {
                ret.upd = falseValue;
            }
        }

        if (ret.value === null) {
            ret.value = value;
        }

        $elm.data(dataNameValJsValueCache, value);

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
            cfgFields = valjsExtend(trueValue, {}, cfgContext.fields),
            cfgRules = cfgContext.rules;


        if (!valjsIsUndefined(cfgRules)) {
            if (!valjsIsUndefined(cfgRules[ruleName])) {
                resolvedConfiguration = valjsExtend(resolvedConfiguration, cfgRules[ruleName]);
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
                        resolvedConfiguration = valjsExtend(trueValue, resolvedConfiguration, cfgFields[fieldNameSelector][ruleName]);
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

        while (match !== null) {
            newValue = newValue.replace(match[0], String(match[1].toUpperCase()));
            match = myRegexp.exec(value);
        }

        return newValue;
    }

    function valjsGetElementConfigFromAttributes(valjs, $elm, rule, jsConfig) {
        var resolvedConfiguration = { },
            ruleName = rule.name,
            attrName = "data-" + valjs.config.attrPrefix + ruleName,
            attrValue = valjsGetAttr($elm, attrName),
            binding = null,
            tmp,
            customBindResult,
            attrs,
            attrData,
            attribute_name,
            attr_index,
            local_string,
            already_bound = !valjsIsUndefined(jsConfig.elmRules) && !valjsIsUndefined(jsConfig.elmRules[rule.name]);

        // If there is no data- attribute, try the customBind call:
        if (!already_bound) {
            if (valjsIsUndefined(attrValue)) {
                if (valjs.config.allowRuleInitialization === trueValue) {
                    customBindResult = rule.testElement({ form : valjs.$form, context : valjs.jqContext, rule: rule, element: $elm, valjs: valjs });
                    if (typeof customBindResult === 'object') {
                        if (!valjsIsUndefined(customBindResult[ruleName])) {
                            binding = { data: {} };
                            resolvedConfiguration.elmRules = {};
                            resolvedConfiguration.elmRules[rule.name] = 'custombind';
                        } else {
                            binding = { data : customBindResult };
                        }
                    } else {
                        if (typeof customBindResult === 'boolean' && customBindResult === trueValue) {
                            binding = { data: {} };
                            resolvedConfiguration.elmRules = {};
                            resolvedConfiguration.elmRules[rule.name] = 'bind';
                        }
                    }
                }
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

            if (binding !== null) {
                attrs = $elm[0].attributes;

                // Find the rest of the related attributes
                for (attr_index = 0; attr_index < valjsLength(attrs); attr_index += 1) {
                    attribute_name = attrs[attr_index].name;
                    if (attribute_name.indexOf(attrName + '-') === 0 && attribute_name.length > attrName.length) {
                        tmp = valjsAttributeNameToOptionName(attribute_name.substr(valjsLength(attrName) + 1));
                        if (!attrs[attr_index].value) {
                            // No value 
                            attrData[tmp] = '';
                            if (!valjsIsUndefined(rule.options)) {
                                if (!valjsIsUndefined(rule.options[tmp])) {
                                    if (typeof rule.options[tmp] === "boolean") {
                                        attrData[tmp] = trueValue;
                                    }
                                }
                            }
                        } else {
                            attrValue = attrs[attr_index].value;
                            if (!valjsIsUndefined(rule.options)) {
                                if (!valjsIsUndefined(rule.options[tmp])) {
                                    if (typeof rule.options[tmp] === "boolean") {
                                        if (attrValue.toLowerCase() === "true") {
                                            attrValue = trueValue;
                                        } else if (attrValue.toLowerCase() === "false") {
                                            attrValue = falseValue;
                                        }
                                    }
                                }
                            }

                            // is it a msg?
                            local_string = attrName + '-msg';
                            if (attribute_name.indexOf(local_string) === 0) {
                                if (attribute_name === local_string) {
                                    attrData.msg = attrData.msg || {};
                                    attrData.msg[keyNameDefault] = attrValue;
                                } else if (attribute_name.indexOf(local_string + '-') !== -1) {
                                    attrData.msg = attrData.msg || {};
                                    attrData.msg[valjsAttributeNameToOptionName(attribute_name.substr((local_string + '-').length))] = attrValue;
                                }
                            } else {
                                attrData[valjsAttributeNameToOptionName(attribute_name.substr(valjsLength(attrName) + 1))] = attrValue;
                            }
                        }
                    }
                }
            }

            resolvedConfiguration = valjsExtend(trueValue, {}, resolvedConfiguration, binding.data, attrData);
            if (!valjsIsUndefined(resolvedConfiguration.msg)) {
                resolvedConfiguration.msg = valjsGetMsgConfig(resolvedConfiguration.msg);
            }
        }

        return resolvedConfiguration;
    }


    /**
     * [valjsInitializeElementRules description]
     * @param  {*} valjs [description]
     * @param  {*} $elm  [description]
     * @return {*}       [description]
     */
    function valjsInitializeElementRules(valjs, $elm) {
        var rules = wj.rules,
            e,
            /** @type {string} */
            rule_index,    // Iterator

            // Global configuration
            cfgGlobalFindFunctions,

            // Instance configuration
            cfgInstanceGlobal = {},     // From config when you initialize valjs
            cfgInstanceFieldRule,

            // Field level configuration
            cfgFieldGlobal = {},
            cfgFieldAttr = {},
            elmConfig = {},
            ruleOptions,

            allFieldRules = {}; // will contain extra attributes/data for the rule

        // Instance global rule
        if (!valjsIsUndefined(valjs.config.msg)) {
            cfgInstanceGlobal.msg = valjsGetMsgConfig(valjs.config.msg);
        }
        cfgGlobalFindFunctions = valjsExtend({
            findMsg : valjs.config.findMsg,
            findLabel : valjs.config.findLabel
        }, valjsGetElementFindFunctions($elm, valjs.config));

        allFieldRules = { ruleNames : [], rulesField : $elm.attr('id')};
        rule_index = valjsGetAttr($elm, "data-" + valjs.config.attrPrefix + 'msg');
        if (rule_index) {
            cfgFieldGlobal = {
                msg : valjsGetMsgConfig(rule_index)
            };
        }

        for (rule_index = 0; rule_index < valjsLength(rules.k); rule_index += 1) {
            elmConfig = {};
            ruleOptions = !valjsIsUndefined(rules[rules.k[rule_index]].options) ? rules[rules.k[rule_index]].options : {};
            cfgInstanceFieldRule = valjsGetElementConfig($elm, rules.k[rule_index], valjs.config, falseValue);
            elmConfig = valjsExtend(trueValue, {}, ruleOptions, cfgInstanceGlobal, cfgInstanceFieldRule, cfgFieldGlobal);
            cfgFieldAttr = valjsGetElementConfigFromAttributes(valjs, $elm, rules[rules.k[rule_index]], elmConfig);
            elmConfig = valjsExtend(trueValue,  elmConfig, cfgFieldAttr);
            elmConfig.msg = elmConfig.msg || {};
            //elmConfig.msg[keyNameDefault] = elmConfig.msg[keyNameDefault] || '';

            if (!valjsIsUndefined(elmConfig.elmRules)) {
                delete elmConfig.elmRules;
                allFieldRules.ruleNames.push(rules.k[rule_index]);
                allFieldRules[rules.k[rule_index]] = elmConfig;
            }
        }

        allFieldRules.iFindMsgFn = cfgGlobalFindFunctions.findMsg;
        allFieldRules.iFindLabelFn = cfgGlobalFindFunctions.findLabel;

        // Sort field rules by rule priority
        allFieldRules.ruleNames.sort(function (a, b) {
            a = rules[a].prio;
            b = rules[b].prio;
            return a < b ? -1 : (a > b ? 1 : 0);
        });

        e = {
            valjs: valjs,
            elm : $elm,
            config: allFieldRules
        };

        if (valjs.config.setupField !== $.noop) {
            valjs.config.setupField(e);
        }

        return e.config;
    }

    function valjsGetFilteredJ5Object(valjs) {
        return {
            config: valjs.config,
            context: valjs.jqContext,
            form: valjs.$form
        };
    }


    function valjsGetUniqueId() {
        ValJS.idCounter += 1;
        return ValJS.idCounter;
    }


    function valjsFindLabelElement($elm, valjs) {
        var labelElement = valjsSelectElements("label[for='" + $elm.attr('id') + "']", valjs.jqContext);
        if (labelElement.length === 0) {
            if ($elm.parent().get(0).nodeName === 'LABEL') {
                labelElement = $elm.parent();
            }
        }
        return labelElement;
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
        valjsRemoveClass($elm, dElmType);
        valjsRemoveClass($elm, dataNameValJsInstance);
        valjsRemoveClass($elm, dataNameValjsConfig);
        valjsRemoveClass($elm, dataNameValJsContext);
        valjsRemoveClass($elm, dataNameValJsHash);
        valjsRemoveClass($elm, dataNameValJsIsValid);
        valjsRemoveClass($elm, dataNameValjsValidationStatus);
        valjsRemoveClass($elm, dataNameValJsValueCache);
    }

    /**
     * [valjsBindElementRules description]
     * @param  {*} valjs [description]
     * @param  {*} elm   [description]
     * @return {boolean}       [description]
     */
    function valjsBindElementRules(valjs, elm) {
        var $elm = $(elm),
            identifiedRules = valjsInitializeElementRules(valjs, $elm),
            allRules = wj.rules,
            currentRule,
            bindResult,
            i_index,
            ruleNames = identifiedRules.ruleNames;

        // Clear the rule names. We set them back when they're bound
        identifiedRules.ruleNames = [];

        if (valjsLength(ruleNames) === 0) {
            return;
        }

        $elm.data(dataNameValjsConfig, identifiedRules);

        for (i_index = 0; i_index < valjsLength(ruleNames); i_index += 1) {
            currentRule = allRules[ruleNames[i_index]];
            if (currentRule.bind === null || valjsIsUndefined(currentRule.bind) || currentRule.bind === $.noop) {
                bindResult = trueValue;
            } else {
                bindResult = currentRule.bind(valjsExtend(valjsGetFilteredJ5Object(valjs),
                    {
                        valjs : valjs,
                        element: $elm,
                        field : valjsGetElementType($elm),
                        config : identifiedRules[currentRule.name],
                        rule : currentRule
                    }));
            }

            if (bindResult !== falseValue) {
                if (typeof bindResult === "object") {
                    identifiedRules[currentRule.name] = valjsExtend(trueValue, {}, identifiedRules[currentRule.name], bindResult);
                }
                identifiedRules.ruleNames.push(ruleNames[i_index]);
            } else {
                delete identifiedRules[ruleNames[i_index]];
            }
        }

        delete identifiedRules.rulesField;

        identifiedRules.fieldType = valjsGetElementType($elm);

        if (identifiedRules.ruleNames.length > 0) {
            // This is where the element rules are all initialized
            // and we can setup the field

            identifiedRules.uid = valjsGetUniqueId();

            i_index = $elm.data(dataNameValJsContext) ? '' : 'unknown';
            valjsJsAddClass($elm, valjsGetClass(valjs, 'field', i_index))
                .data(dataNameValJsContext, valjs)          // Make sure the field has contact with the valjs context
                .data(dataNameValjsConfig, identifiedRules) // Attach the rules for this field
                .data(valjs.vars.off, 0);                   // Validation not disabled

            valjsSetClass(valjsFindLabelElement($elm, valjs), valjs, 'label', i_index);
            return trueValue;
        }
        valjsCleanupElement($elm, valjs);

        return falseValue;
    }

    function valjsGetElementBoundRules($elm) {
        var rules = $elm.data(dataNameValjsConfig);
        return rules;
    }

    function valjsStringChecksum(str) {
        var hash = 5381, i, c;
        for (i = 0; i < valjsLength(str); i += 1) {
            c = str.charCodeAt(i);
            hash = ((hash << 5) + hash) + c;
        }
        return hash;
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
     * [valjsFindMsgElement description]
     * @param  { { nextAll : function(string) : {insertAfter : function(*)} } | * } $elm   [description]
     * @param  {*} valjs  [description]
     * @param  {boolean} create [description]
     * @return {*}        [description]
     */
    function valjsFindMsgElement(options) {
        var $elm = options.element,
            valjs = options.valjs,
            create = options.create,
            $after = null,
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
            elmConfig = $elm.data(dataNameValjsConfig),
            state = refresh.state,
            message = refresh.message,
            modifers = null,
            hasMsg = message !== "",
            createMsg = hasMsg && status === 'invalid',
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
                modifers = ['invalid', state];
                hideMsg = falseValue;
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
            $elm.data(dataNameValjsElementMsg, $msg);
            valjsSetClass($msg, valjs, 'msg', modifers);
        }

        valjsSetClass($elm, valjs, 'field', modifers);
        if (valjsLength($lbl) === 1) {
            valjsSetClass($lbl, valjs, 'label', modifers);
        }
        return $elm;
    }

    function valjsTestIsElementReadyForValidation($elm) {
        return $elm.is(':visible') && !$elm.is(':disabled');
    }

    function valjsResetElementStatus($elm, valjs) {
        valjsRemoveData($elm, dataNameValJsHash);
        valjsRemoveData($elm, dataNameValJsIsValid);
        valjsRemoveData($elm, dataNameValjsValidationStatus);

        var refreshData = { status: 'unknown' },
            e = valjsInvokeEvent($elm, 'refreshfield', {
                valjs: valjsExtend(refreshData, { context : valjs.jqContext, form : valjs.$form, element : $elm})
            });

        if (!e.isDefaultPrevented()) {
            valjsRefreshField(valjs, $elm, refreshData);
        }
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
        if (valjsIsFunction(config.msg)) {
            message = config.msg(execParameters);
        } else if (!valjsIsUndefined(config.msg) && !valjsIsUndefined(config.msg[namedMessage])) {
            if (valjsIsFunction(config.msg[namedMessage])) {
                message = config.msg[namedMessage](execParameters);
            } else if (valjsIsString(namedMessage)) {
                message = config.msg[namedMessage];
            }
        }
        return message;
    }

    function valjsParseRuleResult(result, execParameters) {
        var resultObject,
            returnValue = { ok : trueValue, result : null },
            rule = execParameters.rule;

        if (result !== trueValue && (typeof result !== "object" || result.msg)) {
            execParameters.msgName = valjsGetNamedMessageFromRuleResult(result);

            if (typeof result === "object") {
                resultObject = valjsExtend(trueValue, {}, result);
                delete resultObject.msg;
                execParameters.result = resultObject;
            }

            // it should be used if it's been specified otherwhere
            if (rule.options && rule.options.msg && rule.options.msg[keyNameDefault] === null) {
                if (execParameters.config.msg[keyNameDefault] !== null) {
                    execParameters.msgName = keyNameDefault;
                }
            }
            result = valjsGetValidationMessage(execParameters, execParameters.config, result);
            returnValue.ok = falseValue;
            returnValue.result = result;

        } else {
            returnValue.result = result;
        }
        return returnValue;
    }

    function valjsRuleRun(valjs, $elm, elementValue, event, rule, config) {

        var execParameters = {
                'event': event,
                'config': config,
                'valjs': valjs,
                'element' : $elm,
                'field': valjsExtend({ value: elementValue.value }, valjsGetElementType($elm))
            },
            result = rule.run(execParameters, $elm);

        return valjsParseRuleResult(result,  {
            valjs: valjs,
            config : config,
            rule : rule,
            element : $elm,
            msgName : null
        });
    }


    function valjsInvokeElementValidation($elm, valjs, event, elementValue, submit) { // , valjs, event
        if (valjs.config.liveValidation === falseValue && !submit) {
            return;
        }
        if (!valjsTestIsElementReadyForValidation($elm)) {
            if ($elm.data(dataNameValJsHash)) {
                valjsResetElementStatus($elm, valjs);
            }
            return;
        }

        var rules = valjsGetElementBoundRules($elm),
            ruleNames = rules ? rules.ruleNames : null,
            rule_index,
            currentRule,
            config,
            result,
            label,
            validations = { fail: [], success: [] },
            e,
            refreshData = {},
            statusHash = [],
            hashString = "",
            previousHash = $elm.data(dataNameValJsHash);

        if (valjsIsUndefined(submit)) {
            submit = falseValue;
        }

        if (valjsIsUndefined(elementValue)) {
            elementValue = valjsGetElementValue($elm, event);
        }

        for (rule_index = 0; rule_index < valjsLength(ruleNames); rule_index += 1) {
            currentRule = wj.rules[ruleNames[rule_index]];
            config = rules[ruleNames[rule_index]];
            result = valjsRuleRun(valjs, $elm, elementValue, event, currentRule, config);

            if (result.ok === false) {
                statusHash.push(currentRule.name + result.result);
                validations.fail.push(valjsExtend(true, {}, { msg : result.result }, { rule : currentRule.name}));
            } else {
                validations.success.push(valjsExtend(true, {}, result.result, { rule : currentRule.name}));
            }
        }

        //
        // Create a hash based on status
        // Only raise events when things have actually changed
        //
        hashString = valjsStringChecksum((submit ? '1' : '0') + statusHash.join('|'));
        if (submit) {
            // Submit, then we always check
            hashString = (new Date());
        }

        if (previousHash === hashString && valjs.config.alwaysTriggerFieldEvents === falseValue) {

            return $elm.data(dataNameValjsValidationStatus);
        }
        $elm.data(dataNameValJsHash, hashString);

        // The event listeners can clear the validation
        // details entirely, we take that as a "the field is valid!"
        if (!valjsIsUndefined(valjs) && valjsLength(validations.fail) > 0) {
            refreshData = {
                status: 'invalid',
                state: submit ? 'error' : 'warning',
                message: validations.fail[0].msg,
                rule: validations.fail[0].rule
            };
            label = valjsFindLabelElement($elm, valjs);
            if (label) {
                refreshData.label = label.text();
            }
            $elm.data(dataNameValJsIsValid, -1);
        } else {
            refreshData = { status: 'valid' };
            $elm.data(dataNameValJsIsValid, 1);
        }

        $elm.data(dataNameValjsValidationStatus, refreshData);

        e = valjsInvokeEvent($elm, 'refreshfield', {
            valjs: valjsExtend(refreshData, { context : valjs.jqContext, form : valjs.$form, element : $elm})
        });

        if (!e.isDefaultPrevented()) {
            valjsRefreshField(valjs, $elm, refreshData);
        }

        return $elm.data(dataNameValJsIsValid) === 1 ? trueValue : refreshData;

    }

    function valjsTestElementIsBound($elm) {
        return $elm.data(dataNameValjsConfig) ? trueValue : falseValue;
    }

    function valjsTestElementChange(e) {
        /*jshint validthis:true */
        if (!valjsTestElementIsBound($(this))) {
            return;
        }

        /*jshint validthis:true */
        var valueInfo = valjsGetElementValue($(this), e);
        // has the value been updated since last time?

        if (valueInfo.upd === trueValue) { //|| e.type === 'focusout'
            /*jshint validthis:true */
            valjsInvokeElementValidation($(this), e.data.valjs, e, valueInfo);
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
                form.data(dataNameValJsFormContext, valjs);
                if (valjsLength(valjs.s) > 0) {
                    e.preventDefault();
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


    function valjsValidateForm(valjs, e, submit) {
        var i, valueInfo, field, validationResult, ret = { invalid: [] },
            len = valjsLength(valjs.e);
        for (i = 0; i < len; i += 1) {
            field = $(valjs.e[i]);
            valueInfo = valjsGetElementValue(field, e);
            validationResult = valjsInvokeElementValidation(field, valjs, e, valueInfo, submit === trueValue ? trueValue : falseValue);
            if (!valjsIsUndefined(validationResult) && validationResult !== trueValue && validationResult.status === 'invalid') {
                ret.invalid.push(validationResult);
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
        var valjs = $(this).data(dataNameValJsFormContext),
            result = null,
            submitEvent,
            eventContext;

        if (!valjs) {
            // No current context, then do nothing by triggering an event that says that ValJS is done
            e.preventDefault();
            /*jshint validthis:true */
            $(this).trigger('submit', { valjsDone: trueValue });
            return trueValue;
        }

        eventContext = valjs.jqContext;
        /*jshint validthis:true */
        $(this).removeData(dataNameValJsFormContext);

        // We have a ValJS context. Let's validate it!
        result = valjsValidateForm(valjs, e, trueValue);

        // Any invalid results?
        if (valjsLength(result.invalid) === 0) {
            // Validation succeeded. Trigger the submitform event
            submitEvent = valjsInvokeEvent(eventContext, 'submitform',
                {
                    currentTarget : valjs.context,
                    target: valjs.$form[0],
                    valjs: valjsExtend({}, { form : valjs.$form[0], context : valjs.context, formData : valjsFormSerialize(valjs.jqContext)})
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
        valjsInvokeEvent(eventContext, 'invalidform',
            {
                target: valjs.context,
                valjs: valjsExtend({}, result, { form : valjs.$form[0], context : valjs.context })
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

        if (!valjs.$form.data(dataNameValJsBound)) {
            valjs.$form.data(dataNameValJsBound, 1);
            valjs.$form.on(valjsGetEventNames(['submit']), { valjs: valjs }, valjsFormSubmit);
        }

        valjs.jqContext
            //.off( eventNamespace)
            .on(valjsGetEventNames([clickEvent, changeEvent, keyupEvent, blurEvent]), textElements, { valjs: valjs }, valjsTestElementChange)
            .on(valjsGetEventNames([keydownEvent]), { valjs: valjs }, valjsSetFormContext)
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
        var elm = null;
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
            if (valjsBindElementRules(valjs, elms[element_index])) {
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

            modifierSeparator : null,

            attrPrefix : '',

            findMsg : valjsFindMsgElement,
            findLabel : valjsFindLabelElement,

            allowRuleInitialization : trueValue,

            setupField : $.noop,

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
                'warning': 'valjs-warning'
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

        /**
         * Reset a field to its unknown status
         * @return {[type]} [description]
         */
        resetField: function () {
            var valjs = $(this).data(dataNameValJsContext);
            valjsResetElementStatus($(this), valjs);
        },

        validateField: function () {
            var valjs = $(this).data(dataNameValJsContext),
                value = valjsGetElementValue($(this));
            return valjsInvokeElementValidation($(this), valjs, value);
        },

        validateForm: function () {
            var valjs = $(this).data(dataNameValJsInstance);
            return valjsValidateForm(valjs, jQuery.Event('validateForm'), false);
        },

        getFieldStatus: function () {
            var status = $(this).data(dataNameValJsIsValid);
            if (valjsIsUndefined(status)) {
                return 0;
            }
            return status;
        },

        getFieldType : function () {
            return valjsGetElementType($(this));
        },

        updateBindings : function () {
            valjsRefreshElementBindings($(this).data(dataNameValJsInstance));
        },

        getRuleMessages : function () {
            valjsRefreshElementBindings($(this).data(dataNameValJsInstance));
        },

        init: function () {

            this.config = valjsExtend(trueValue, {}, this.defaults, superglobals, ValJS.global, this.options);
            var self = this,    // so we can initialize valjs asyncronosly
                cssSelectors = this.config.selector;

            // Cache classnames to easily clear an element from statuses
            this.vars = valjsInitializeModifierShortcuts(this.config);

            if (this.jqContext.prop('tagName') === 'FORM') {
                this.$form = this.jqContext;
            } else {
                this.$form = this.jqContext.closest('form');
                if (this.$form.data(dataNameValJsInstance)) {
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

        /**
         * Check if the element has the specified rule
         * @param  {string} ruleName The name of the rule
         * @return {boolean}          True if the rule exists for this field
         */
        hasRule: function (ruleName) {

            if (valjsIsString(ruleName)) {
                ruleName = [ruleName];
            }

            var cfg = $(this).data(dataNameValjsConfig),
                i;
            if (cfg) {
                for (i = 0; i < ruleName.length; i += 1) {
                    if (cfg.hasOwnProperty(ruleName[i])) {
                        return trueValue;
                    }
                }
            } else {
                $.error(msgValJSNotFound, $(this));
            }
            return falseValue;
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
                elements.data(this.vars.off, 1);
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
        return ValJS.prototype[o].apply($(i), args);
    }

    /**
    * Hook it up as a jQuery Plugin
    */
    $.fn.valjs = function (options) {
        if (ValJS.prototype[options]) {
            // only call methods on created objects
            if ($(this).data(dataNameValJsInstance)) {

                return ValJS.prototype[options]
                    .apply($(this), Array.prototype.slice.call(arguments, 1));
            }
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
                if ($(this).data(dataNameValJsInstance)) {
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

    function valjsExtractDateParts(dateString, format, macros) {

        if (dateString === 'now') {
            return {date: new Date()};
        }
        var i, n = 0,
            macroPositions = [],
            indexes = {},
            pattern = '',
            find,
            replace,
            isDate,
            isDateTime,
            isWeek,
            isDateRelated,
            matches,
            ret = null,
            d,
            re;

        for (i = 0; i < valjsLength(macros); i += 1) {
            macroPositions.push([macros[i], valjsIndexOf(format, '%' + macros[i])]);
            if (macros[i] === 'm') {
                isDate = trueValue;
            } else if (macros[i] === 'H') {
                // One macro is hour, so it's a datetime
                isDateTime = trueValue;
            } else if (macros[i] === 'w') {
                isWeek = trueValue;
            }
        }

        isDateRelated = isDate || isDateTime;
        isDate = !isWeek && !isDateTime;

        macroPositions.sort(function (a, b) {
            a = a[1];
            b = b[1];
            return a < b ? -1 : (a > b ? 1 : 0);
        });

        for (i = 0; i < macroPositions.length; i += 1) {
            if (macroPositions[i][1] !== -1) {
                indexes[macroPositions[i][0]] = n;
                n += 1;
            }
        }
        pattern = format.replace('.', '\\.').replace('(', '\\(').replace(')', '\\)').replace(/\\/g, '\\\\');

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
            pattern = pattern.replace(find, replace);
        }
        re = new RegExp("^" + pattern + "$");
        if (re) {
            matches = re.exec(dateString);
            if (matches) {
                find = {};
                for (i = 1; i < matches.length; i += 1) {
                    find[macroPositions[i - 1][0]] = valjsParseIntBase10(matches[i]);
                }

                if (isDateRelated) {
                    find.m -= 1;
                    if (isDate) {
                        d = new Date(find.y, find.m, find.d);
                    } else {
                        d = new Date(find.y, find.m, find.d, find.H, find.M);
                    }
                    if (d.getFullYear() === find.y) {
                        if (d.getMonth() === find.m) {
                            if (d.getDate() === find.d) {
                                if (isDateTime) {
                                    if (d.getHours() === find.H && d.getMinutes() === find.M) {
                                        ret = valjsExtend(trueValue, {}, find, {'date' : d});
                                    }
                                } else {
                                    ret = valjsExtend(trueValue, {}, find, {'date' : d});
                                }
                            }
                        }
                    }
                } else {
                    d = getDateOfISOWeek(find.y, find.w);
                    if (find.w === 1) {
                        if (valjsGetWeekYear(d) === find.y - 1) {
                            ret = valjsExtend(trueValue, {}, find, {'date' : d});
                        }
                    }
                    if (d.getFullYear() === valjsGetWeekYear(d) && d.getFullYear() === find.y) {
                        ret = valjsExtend(trueValue, {}, find, {'date' : d});
                    }
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
    valjsAddRule('date', {
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

    valjsAddRule('week', {
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

    valjsAddRule('number', {
        options : {
            msg : {
                'error' : 'Not a number',
                'max' : 'Value too high',
                'min' : 'Value too low'
            },
            separator : '.',
            step : null
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
            var element = valjsArgs.element;

            // We do not want to bind if the other rules that use min or max
            // are bound to this element
            if (element.valjs('hasRule', rulesUsingMinMax)) {
                return falseValue;
            }

            // Make sure the value is an integer when we bind the rule
            return valjsExtend(trueValue, valjsArgs.config, {
                value : valjsParseIntBase10(valjsArgs.config.value)
            });
        },
        run: function (valjsArgs) {
            var value = valjsArgs.field.value;
            if (value) {
                if (valjsLength(value) > valjsArgs.config.value) {
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
            var element = valjsArgs.element;

            // We do not want to bind if the other rules that use min or max
            // are bound to this element
            if (element.valjs('hasRule', rulesUsingMinMax)) {
                return falseValue;
            }

            // Make sure the value is an integer when we bind the rule
            return valjsExtend(trueValue, valjsArgs.config, {
                value : valjsParseIntBase10(valjsArgs.config.value)
            });
        },
        run: function (valjsArgs) {
            var value = valjsArgs.field.value;
            if (value) {
                if (valjsLength(value) < valjsArgs.config.value) {
                    return falseValue;
                }
            }
            return trueValue;
        }
    });

    valjsAddRule('filemax', {
        options : {
            msg : {
                'error' : null,
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
            // Make sure the value is an integer when we bind the rule
            return valjsExtend(trueValue, valjsArgs.config, {
                value : valjsParseIntBase10(valjsArgs.config.value)
            });
        },

        run: function (valjsArgs) {
            var max = valjsArgs.config.value,
                singleFileSize,
                f = valjsArgs.element[0].files,
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

    valjsAddRule('filemin', {
        options : {
            msg : {
                'error' : null,
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
            // Make sure the value is an integer when we bind the rule
            return valjsExtend(trueValue, valjsArgs.config, {
                value : valjsParseIntBase10(valjsArgs.config.value)
            });
        },

        run : function (valjsArgs) {
            var min = valjsArgs.config.value,
                singleFileSize,
                f = valjsArgs.element[0].files,
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
            var v = valjsRunArgs.field.value,
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
                    if (localLen < 1 || localLen > 64) {
                        // local part length exceeded
                        isValid = falseValue;
                    } else if (domainLen < 1 || domainLen > 255) {
                        // domain part length exceeded
                        isValid = falseValue;
                    } else if (local[0] === '.' || local[localLen - 1] === '.') {
                        // local part starts or ends with '.'
                        isValid = falseValue;
                    } else if (/\.\./.test(local)) {
                        // local part has two consecutive dots
                        isValid = falseValue;
                    } else if (!/^[åäöA-Za-z0-9\\-\\.]+$/.test(domain)) {
                        // character not valid in domain part
                        isValid = falseValue;
                    } else if (!/^[åäöA-Za-z0-9\\-\\.]+$/.test(domain)) {
                        // character not valid in domain part
                        isValid = falseValue;
                    } else if (/\.\./.test(domain)) {
                        // domain part has two consecutive dots
                        isValid = falseValue;
                    } else if (!/^(\.|[A-Za-z0-9!#%&`_=\/$\'*+?\^{}|~.\-])+$/.test(local.replace("\\\\", ""))) {
                        // character not valid in local part unless 
                        // local part is quoted
                        if (!/^"(\\\\"|[^"])+"$/.test(local.replace("\\\\", ""))) {
                            isValid = falseValue;
                        }
                    }

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
            if (valjsBindArgs.type === 'select' && valjsIsUndefined(valjsBindArgs.element.attr('multiple'))) {
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
            if (!valjsTestIsElementReadyForValidation(valjsArgs.config.celm)) {
                return trueValue;
            }
            if (valjsArgs.config.celm.valjs('getFieldStatus') === 0) {
                valjsArgs.config.celm.valjs('validateField');
            }
            if (valjsArgs.config.celm.valjs('getFieldStatus') === -1) {
                return 'invalidSource';
            }
            return valjsArgs.config.celm.val() === valjsArgs.element.val() ? trueValue : falseValue;
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
            var options = (valjsArgs.config.ignoreCase ? 'i' : ''),
                re = new RegExp(valjsArgs.config.value, options),
                isMatch,
                val = valjsArgs.field.value;
            if (val) {
                if (re) {
                    isMatch = re.test(valjsArgs.field.value);
                    if (isMatch) {
                        if (valjsArgs.config.invert) {
                            return falseValue;
                        }
                        return trueValue;
                    }
                    if (valjsArgs.config.invert) {
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
            value : 'ost',
            msg : {
                'error' : "Invalid URL"
            }
        },
        testElement: function (valjsArgs) {
            return valjsGetAttr(valjsArgs.element, 'type') === 'url';
        },
        run: function (valjsArgs) {
            if (valjsArgs.field.value) {
                return (/^(https?|s?ftp|wss?):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i).test(valjsArgs.field.value);
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
            var specials = '!@#$%^&*()_+|~-=â€˜{}[]:";â€™<>?,./',
                value = valjsArgs.field.value,
                rules = valjsArgs.config.value,
                match = valjsArgs.config.match,
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
    return ValJS;
}(window, jQuery));

/*
    var ret = {
        rules : {}
    };
for( var i = 0; i < ValJS.rules.k.length; i++ ) {
    var o = ValJS.rules[ValJS.rules.k[i]].options;
    if (o && o.msg) {
        ret.rules[ValJS.rules.k[i]] = {
            msg : o.msg
        }
    }


//    console.warn(ValJS.rules.k[i], ValJS.rules[ValJS.rules.k[i]]);
}
console.warn(JSON.stringify(ret));
*/