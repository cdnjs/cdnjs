/*!
 * dependent-dropdown v1.4.8
 * http://plugins.krajee.com/dependent-dropdown
 *
 * Author: Kartik Visweswaran
 * Copyright: 2014 - 2017, Kartik Visweswaran, Krajee.com
 *
 * Licensed under the BSD 3-Clause
 * https://github.com/kartik-v/dependent-dropdown/blob/master/LICENSE.md
 */
(function (factory) {
    "use strict";
    //noinspection JSUnresolvedVariable
    if (typeof define === 'function' && define.amd) { // jshint ignore:line
        // AMD. Register as an anonymous module.
        define(['jquery'], factory); // jshint ignore:line
    } else { // noinspection JSUnresolvedVariable
        if (typeof module === 'object' && module.exports) { // jshint ignore:line
            // Node/CommonJS
            // noinspection JSUnresolvedVariable
            module.exports = factory(require('jquery')); // jshint ignore:line
        } else {
            // Browser globals
            factory(window.jQuery);
        }
    }
}(function ($) {
    "use strict";

    $.fn.depdropLocales = {};

    var $h, DepDrop;

    // global helper object
    $h = {
        isEmpty: function (value, trim) {
            return value === null || value === undefined || value.length === 0 || (trim && $.trim(value) === '');
        },
        setParams: function (props, vals) {
            var out = {};
            if (props.length === 0) {
                return {};
            }
            $.each(props, function (key, val) {
                out[val] = vals[key];
            });
            return out;
        },
        toStr: function(str) {
            return $h.isEmpty(str) ? str : str.toString();
        }
    };

    DepDrop = function (element, options) {
        var self = this;
        self.$element = $(element);
        $.each(options, function (key, value) {
            self[key] = value;
        });
        self.initData();
        self.init();
    };

    //noinspection JSUnusedGlobalSymbols
    DepDrop.prototype = {
        constructor: DepDrop,
        initData: function () {
            var self = this, $el = self.$element;
            self.initVal = $el.val();
            self.initDisabled = $el.attr('disabled');
            $el.data('url', self.url)
                .data('placeholder', self.placeholder)
                .data('loading', self.loading)
                .data('loadingClass', self.loadingClass)
                .data('loadingText', self.loadingText)
                .data('emptyMsg', self.emptyMsg)
                .data('params', self.params);
        },
        init: function () {
            var self = this, i, depends = self.depends, $el = self.$element, len = depends.length,
                chkOptions = $el.find('option').length, initDepends = self.initDepends || self.depends;
            if (chkOptions === 0 || $el.find('option[value=""]').length === chkOptions) {
                $el.attr('disabled', 'disabled');
            }
            for (i = 0; i < len; i++) {
                self.listen(i, depends, len);
            }
            if (self.initialize === true) {
                for (i = 0; i < initDepends.length; i++) {
                    $('#' + initDepends[i]).trigger('depdrop:change');
                }
            }
            $el.trigger('depdrop:init');
        },
        listen: function (i, depends, len) {
            var self = this;
            $('#' + depends[i]).on('depdrop:change change select2:select krajeeselect2:cleared', function (e) {
                var $select = $(this);
                if (!$h.isEmpty($select.data('select2')) && e.type === 'change') {
                    return;
                }
                self.setDep($select, depends, len);
            });
        },
        setDep: function ($elCurr, depends, len) {
            var self = this, $el, type, j, value = {};
            for (j = 0; j < len; j++) {
                $el = $('#' + depends[j]);
                type = $el.attr('type');
                value[j] = (type === "checkbox" || type === "radio") ? $el.prop('checked') : $el.val();
                if (self.skipDep && (value[j] === self.loadingText || value[j] === '')) {
                    self.$element.html('<option id="">' + self.emptyMsg + '</option>');
                    return;
                }
            }
            self.processDep(self.$element, $elCurr.attr('id'), value, depends);
        },
        processDep: function ($el, vId, vVal, vDep) {
            var self = this, selected, optCount = 0, params = {}, settings, i, ajaxData = {}, vUrl = $el.data('url'),
                paramsMain = $h.setParams(vDep, vVal), paramsOther = {}, key, val, vDefault = $el.data('placeholder'),
                vLoad = $el.data('loading'), vLoadCss = $el.data('loadingClass'), vLoadMsg = $el.data('loadingText'),
                vNullMsg = $el.data('emptyMsg'), vPar = $el.data('params');
            self.ajaxResults = {};
            ajaxData[self.parentParam] = vVal;
            if (!$h.isEmpty(vPar)) {
                for (i = 0; i < vPar.length; i++) {
                    key = vPar[i];
                    val = $('#' + vPar[i]).val();
                    params[i] = val;
                    paramsOther[key] = val;
                }
                ajaxData[self.otherParam] = params;
            }
            ajaxData[self.allParam] = $.extend(true, {}, paramsMain, paramsOther);
            settings = {
                url: vUrl,
                type: 'post',
                data: ajaxData,
                dataType: 'json',
                beforeSend: function (jqXHR) {
                    $el.trigger('depdrop:beforeChange', [vId, $("#" + vId).val(), self.initVal, jqXHR]);
                    $el.find('option[selected]').removeAttr('selected');
                    $el.val('').attr('disabled', 'disabled').html('');
                    if (vLoad) {
                        $el.removeClass(vLoadCss).addClass(vLoadCss).html('<option id="">' + vLoadMsg + '</option>');
                    }
                },
                success: function (data, textStatus, jqXHR) {
                    self.ajaxResults = data;
                    selected = $h.isEmpty(data.selected) ? (self.initVal === false ? null : self.initVal) : data.selected;
                    if ($h.isEmpty(data)) {
                        self.createOption($el, '', vNullMsg, '');
                    } else {
                        self.renderSelect(data.output, vDefault, selected, $el);
                        if ($el.find('optgroup').length > 0) {
                            $el.find('option[value=""]').attr('disabled', 'disabled');
                        }
                        if (data.output && !self.initDisabled) {
                            $el.removeAttr('disabled');
                        }
                    }
                    optCount = $el.find('option').length;
                    if ($el.find('option[value=""]').length > 0) {
                        optCount -= 1;
                    }
                    $el.trigger('depdrop:change', [vId, $("#" + vId).val(), optCount, self.initVal, textStatus, jqXHR]);
                },
                error: function (jqXHR, textStatus, errThrown) {
                    $el.trigger('depdrop:error', [vId, $("#" + vId).val(), self.initVal, jqXHR, textStatus, errThrown]);
                },
                complete: function (jqXHR, textStatus) {
                    if (vLoad) {
                        $el.removeClass(vLoadCss);
                    }
                    $el.trigger('depdrop:afterChange', [vId, $("#" + vId).val(), self.initVal, jqXHR, textStatus]);
                }
            };
            $.extend(true, settings, self.ajaxSettings);
            $.ajax(settings);
        },
        createOption: function ($el, id, name, selected, options) {
            var self = this, settings = {value: id, text: name}, selIds = [], sel = selected, idParam = self.idParam,
                pushId = function(str) { 
                    var s = $h.toStr(str);
                    if (s) {
                        selIds.push(s);
                    }
                };
            if (sel && (sel instanceof Array || sel instanceof Object)) {
                $.each(sel, function (key, val) {
                    if (val instanceof Object) {
                        pushId(val[idParam]);
                    } else {
                        pushId(val);
                    }
                });
            } else {
                pushId(sel);
            }
            $.extend(true, settings, (options || {}));
            if (selIds.length && $.inArray($h.toStr(id), selIds) > -1) {
                settings.selected = "selected";
            }
            $("<option/>", settings).appendTo($el);
        },
        renderSelect: function (data, placeholder, defVal, $select) {
            var self = this, idParam = self.idParam, nameParam = self.nameParam, options;
            $select.empty();
            if (placeholder !== false) {
                self.createOption($select, "", placeholder, defVal);
            }
            if ($h.isEmpty(data)) {
                data = {};
            }
            $.each(data, function (i, groups) {
                if (groups[idParam]) {
                    options = groups[self.optionsParam] || {};
                    self.createOption($select, groups[idParam], groups[nameParam], defVal, options);
                } else {
                    var $group = $('<optgroup>', {label: i});
                    $.each(groups, function (j, option) {
                        options = option[self.optionsParam] || {};
                        self.createOption($group, option[idParam], option[nameParam], defVal, options);
                    });
                    $group.appendTo($select);
                }
            });
        },
        getAjaxResults: function () {
            var self = this;
            return self.ajaxResults;
        }
    };

    $.fn.depdrop = function (option) {
        var args = Array.apply(null, arguments), retvals = [];
        args.shift();
        this.each(function () {
            var self = $(this), data = self.data('depdrop'), options = typeof option === 'object' && option,
                lang = options.language || self.data('language') || 'en', loc = {}, opts = {};

            if (!data) {
                if (lang !== 'en' && !$h.isEmpty($.fn.depdropLocales[lang])) {
                    loc = $.fn.depdropLocales[lang];
                }
                $.extend(true, opts, $.fn.depdrop.defaults, $.fn.depdropLocales.en, loc, options, self.data());
                data = new DepDrop(this, opts);
                self.data('depdrop', data);
            }

            if (typeof option === 'string') {
                retvals.push(data[option].apply(data, args));
            }
        });
        switch (retvals.length) {
            case 0:
                return this;
            case 1:
                return retvals[0];
            default:
                return retvals;
        }
    };

    $.fn.depdrop.defaults = {
        language: 'en',
        depends: '',
        initDepends: '',
        url: '',
        params: {},
        ajaxSettings: {},
        ajaxResults: {},
        initialize: false,
        skipDep: false,
        loading: true,
        loadingClass: 'kv-loading',
        idParam: 'id',
        nameParam: 'name',
        optionsParam: 'options',
        parentParam: 'depdrop_parents',
        otherParam: 'depdrop_params',
        allParam: 'depdrop_all_params'
    };

    $.fn.depdropLocales.en = {
        loadingText: 'Loading ...',
        placeholder: 'Select ...',
        emptyMsg: 'No data found'
    };

    $.fn.depdrop.Constructor = DepDrop;

    /**
     * Convert automatically select with class 'depdrop' into dependent dropdowns.
     */
    $(function () {
        $('select.depdrop').depdrop();
    });
}));