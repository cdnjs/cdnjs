/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2013 - 2015
 * @version 1.4.4
 *
 * A multi level dependent dropdown JQuery plugin. The plugin allows nested and combined dependencies.
 * 
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
(function (factory) {
    "use strict";
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

    var isEmpty, createOption, setParams, DepDrop;

    isEmpty = function (value, trim) {
        return value === null || value === undefined || value.length === 0 || (trim && $.trim(value) === '');
    };

    createOption = function ($el, id, name, sel, opts) {
        var settings = {value: id, text: name};
        opts = opts || {};
        settings = $.extend(settings, opts);
        if (sel !== null && sel.length && id.toString() === sel) {
            settings.selected = "selected";
        }
        $("<option/>", settings).appendTo($el);
    };

    setParams = function (props, vals) {
        var out = {};
        if (props.length === 0) {
            return {};
        }
        $.each(props, function (key, val) {
            out[val] = vals[key];
        });
        return out;
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

    DepDrop.prototype = {
        constructor: DepDrop,
        initData: function () {
            var self = this, $el = self.$element;
            self.initVal = $el.val();
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
                    $('#' + initDepends[i]).trigger('depdrop.change');
                }
            }
            $el.trigger('depdrop.init');
        },
        listen: function (i, depends, len) {
            var self = this;
            $('#' + depends[i]).on('depdrop.change change select2:select krajeeselect2:cleared', function (e) {
                var $select = $(this);
                if (!isEmpty($select.data('select2')) && e.type === 'change') {
                    return;
                }
                self.setDep($select, depends, len);
            });
        },
        setDep: function ($elCurr, depends, len) {
            var self = this, $elInit = self.$element, $el, typ, value = {};
            for (var j = 0; j < len; j++) {
                $el = $('#' + depends[j]);
                typ = $el.attr('type');
                value[j] = (typ === "checkbox" || typ === "radio") ? $el.prop('checked') : $el.val();
            }
            self.processDep($elInit, $elCurr.attr('id'), value, depends);
        },
        processDep: function ($el, vId, vVal, vDep) {
            var self = this, selected, optCount = 0, params = {}, settings, i, ajaxData = {}, vUrl = $el.data('url'),
                paramsMain = setParams(vDep, vVal), paramsOther = {}, key, val, vDefault = $el.data('placeholder'),
                vLoad = $el.data('loading'), vLoadCss = $el.data('loadingClass'), vLoadMsg = $el.data('loadingText'),
                vNullMsg = $el.data('emptyMsg'), vPar = $el.data('params');
            ajaxData[self.parentParam] = vVal;
            if (!isEmpty(vPar)) {
                for (i = 0; i < vPar.length; i++) {
                    key = vPar[i];
                    val = $('#' + vPar[i]).val();
                    params[i] = val;
                    paramsOther[key] = val;
                }
                ajaxData[self.otherParam] = params;
            }
            ajaxData[self.allParam] = $.extend(paramsMain, paramsOther);
            settings = {
                url: vUrl,
                type: 'post',
                data: ajaxData,
                dataType: 'json',
                beforeSend: function () {
                    $el.trigger('depdrop.beforeChange', [vId, $("#" + vId).val(), self.initVal]);
                    $el.find('option[selected]').removeAttr('selected');
                    $el.val('').attr('disabled', 'disabled').html('');
                    if (vLoad) {
                        $el.removeClass(vLoadCss).addClass(vLoadCss).html('<option id="">' + vLoadMsg + '</option>');
                    }
                },
                success: function (data) {
                    selected = isEmpty(data.selected) ? (self.initVal === false ? null : self.initVal) : data.selected;
                    if (isEmpty(data)) {
                        createOption($el, '', vNullMsg, '');
                    }
                    else {
                        $el.html(self.getSelect(data.output, vDefault, selected));
                        if ($el.find('optgroup').length > 0) {
                            $el.find('option[value=""]').attr('disabled', 'disabled');
                        }
                        if (data.output) {
                            $el.removeAttr('disabled');
                        }
                    }
                    optCount = $el.find('option').length;
                    if ($el.find('option[value=""]').length > 0) {
                        optCount -= 1;
                    }
                    $el.trigger('depdrop.change', [vId, $("#" + vId).val(), optCount, self.initVal]);
                },
                error: function () {
                    $el.trigger('depdrop.error', [vId, $("#" + vId).val(), self.initVal]);
                },
                complete: function () {
                    if (vLoad) {
                        $el.removeClass(vLoadCss);
                    }
                    $el.trigger('depdrop.afterChange', [vId, $("#" + vId).val(), self.initVal]);
                }
            };
            settings = $.extend(settings, self.ajaxSettings);
            $.ajax(settings);
        },
        getSelect: function (data, placeholder, defVal) {
            var self = this, $select = $("<select>"), idParam = self.idParam, nameParam = self.nameParam, options;
            if (placeholder !== false) {
                createOption($select, "", placeholder, defVal);
            }
            if (isEmpty(data)) {
                data = {};
            }
            $.each(data, function (i, groups) {
                if (groups[idParam]) {
                    options = groups[self.optionsParam] || {};
                    createOption($select, groups[idParam], groups[nameParam], defVal, options);
                }
                else {
                    var $group = $('<optgroup>', {label: i});
                    $.each(groups, function (j, option) {
                        options = option[self.optionsParam] || {};
                        createOption($group, option[idParam], option[nameParam], defVal, options);
                    });
                    $group.appendTo($select);
                }
            });
            return $select.html();
        }
    };

    $.fn.depdrop = function (option) {
        var args = Array.apply(null, arguments), retvals = [];
        args.shift();
        this.each(function () {
            var self = $(this), data = self.data('depdrop'), options = typeof option === 'object' && option,
                lang = options.language || self.data('language') || 'en', config = $.fn.depdrop.defaults;

            if (!data) {
                if (lang !== 'en' && !isEmpty($.fn.depdropLocales[lang])) {
                    $.extend(config, $.fn.depdropLocales[lang]);
                }
                data = new DepDrop(this, $.extend(config, options, self.data()));
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
        url: '',
        depends: '',
        initDepends: '',
        loading: true,
        loadingClass: 'kv-loading',
        initialize: false,
        idParam: 'id',
        nameParam: 'name',
        optionsParam: 'options',
        parentParam: 'depdrop_parents',
        otherParam: 'depdrop_params',
        allParam: 'depdrop_all_params',
        params: {},
        ajaxSettings: {}
    };

    $.fn.depdropLocales.en = {
        loadingText: 'Loading ...',
        placeholder: 'Select ...',
        emptyMsg: 'No data found'
    };

    $.extend($.fn.depdrop.defaults, $.fn.depdropLocales.en);

    $.fn.depdrop.Constructor = DepDrop;

    /**
     * Convert automatically select with class 'depdrop' into dependent dropdowns.
     */
    $(function () {
        $('select.depdrop').depdrop();
    });
}));