/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2014 - 2015
 * @version 1.4.1
 *
 * A multi level dependent dropdown JQuery plugin. The plugin
 * allows nested and combined dependencies.
 * 
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
(function ($) {
    "use strict";
    var isEmpty = function (value, trim) {
            return value === null || value === undefined || value.length === 0 || (trim && $.trim(value) === '');
        },
        addOption = function ($el, id, name, sel) {
            var settings = {value: id, text: name};
            if (id === sel && sel !== null) {
                settings.selected = "selected";
            }
            $("<option/>", settings).appendTo($el);
        },
        setParams = function (props, vals) {
            var out = {}, i, key, val;
            if (props.length === 0) {
                return {};
            }
            for (i = 0; i < props.length; i++) {
                key = props[i];
                val = vals[i];
                out[key] = val;
            }
            return out;
        },
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
            $el.data('url', self.url)
                .data('depends', self.depends)
                .data('placeholder', self.placeholder)
                .data('loading', self.loading)
                .data('loadingClass', self.loadingClass)
                .data('loadingText', self.loadingText)
                .data('emptyMsg', self.emptyMsg)
                .data('initialize', self.initialize)
                .data('params', self.params);
        },
        init: function () {
            var self = this, depends = self.depends, $id, $el = self.$element, len = depends.length,
                pValue = {}, chkOptions = $el.find('option').length,
                handler = function ($elCurr) {
                    return function () {
                        self.setDep($elCurr, depends, len, false);
                    };
                };
            if (chkOptions === 0 || $el.find('option[value=""]').length === chkOptions) {
                $el.attr('disabled', 'disabled');
            }
            for (var i = 0; i < len; i++) {
                $id = $('#' + depends[i]);
                $id.on('change', handler($id));
            }
            if (self.initialize === true) {
                for (var j = 0; j < len; j++) {
                    if (j > 0) {
                        pValue[j] = $('#' + depends[j]).val();
                    }
                }
                depends[len] = $el.attr('id');
                pValue[len] = $el.val();
                $(document).ready(function () {
                    self.initDep(0, depends, pValue);
                });
            }

            $el.trigger('depdrop.init');
        },
        setDep: function ($elCurr, depends, len, vInit) {
            var self = this, $elInit = self.$element, $el, typ, value = {}, initVal = vInit,
                callBack = function () {
                    $elInit.trigger('change');
                };
            for (var j = 0; j < len; j++) {
                $el = $('#' + depends[j]);
                typ = $el.attr('type');
                value[j] = (typ === "checkbox" || typ === "radio") ? $el.prop('checked') : $el.val();
            }
            self.processDep($elInit, $elCurr.attr('id'), value, initVal, callBack, depends);
        },
        initDep: function (j, depends, preset) {
            var self = this, value = {}, i, initVal = preset[j + 1], 
                $el = $('#' + depends[j + 1]), id = $el.attr('id'),
                len = depends.length, callBack = function () {
                    self.initDep(j + 1, depends, preset);
                };
            for (i = 0; i <= j; i++) {
                value[i] = $('#' + depends[i]).val();
            }
            if (j < len - 1) {
                self.processDep($el, id, value, initVal, callBack, depends);
            }
        },
        processDep: function ($el, vId, vVal, vInit, vFunc, vDep) {
            var self = this, selected, optCount = 0, params = {}, settings, i, ajaxData = {depdrop_parents: vVal},
                paramsMain = setParams(vDep, vVal), paramsOther = {}, key, val, vUrl = $el.data('url'),
                vDefault = $el.data('placeholder'), vLoad = $el.data('loading'), vLoadCss = $el.data('loadingClass'),
                vLoadMsg = $el.data('loadingText'), vNullMsg = $el.data('emptyMsg'), vPar = $el.data('params');
            if (!isEmpty(vPar)) {
                for (i = 0; i < vPar.length; i++) {
                    key = vPar[i];
                    val = $('#' + vPar[i]).val();
                    params[i] = val;
                    paramsOther[key] = val;
                }
                ajaxData = {depdrop_parents: vVal, depdrop_params: params};
            }
            ajaxData.depdrop_all_params = $.extend(paramsMain, paramsOther);
            settings = {
                url: vUrl,
                type: 'post',
                data: ajaxData,
                dataType: 'json',
                success: function (data) {
                    selected = (vInit === false) ? (isEmpty(data.selected) ? null : data.selected) : vInit;
                    if (isEmpty(data)) {
                        addOption($el, '', vNullMsg, '');
                    }
                    else {
                        $el.html(self.getSelect(data.output, vDefault, selected));
                        if ($el.find('optgroup').length > 0) {
                            $el.find('option[value=""]').attr('disabled', 'disabled');
                        }
                        if (data.output.length !== 0) {
                            $el.val(selected).removeAttr('disabled');
                        }
                    }
                    optCount = $el.find('option').length;
                    if ($el.find('option[value=""]').length > 0) {
                        optCount -= 1;
                    }
                    $el.trigger('depdrop.change', [vId, $("#" + vId).val(), optCount, vInit]);
                }
            };
            settings.beforeSend = function () {
                $el.trigger('depdrop.beforeChange', [vId, $("#" + vId).val(), vInit]);
                $el.attr('disabled', 'disabled').html('');
                if (vLoad) {
                    $el.removeClass(vLoadCss).addClass(vLoadCss).html('<option id="">' + vLoadMsg + '</option>');
                }
            };
            settings.error = function () {
                $el.trigger('depdrop.error', [vId, $("#" + vId).val(), vInit]);
            };
            settings.complete = function () {
                vFunc();
                if (vLoad) {
                    $el.removeClass(vLoadCss);
                }
                $el.trigger('depdrop.afterChange', [vId, $("#" + vId).val(), vInit]);
            };
            $.ajax(settings);
        },
        getSelect: function (data, placeholder, defVal) {
            var self = this, $select = $("<select>"), idParam = self.idParam, nameParam = self.nameParam;
            if (placeholder !== false) {
                addOption($select, "", placeholder, defVal);
            }
            if (isEmpty(data)) {
                data = {};
            }
            $.each(data, function (i, groups) {
                if (groups[idParam]) {
                    addOption($select, groups[idParam], groups[nameParam], defVal);
                }
                else {
                    var $group = $('<optgroup>', {label: i});
                    $.each(groups, function (j, option) {
                        addOption($group, option[idParam], option[nameParam], defVal);
                    });
                    $group.appendTo($select);
                }
            });
            return $select.html();
        }
    };

    $.fn.depdrop = function (option) {
        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function () {
            var $this = $(this),
                data = $this.data('depdrop'),
                options = typeof option === 'object' && option;

            if (!data) {
                data = new DepDrop(this, $.extend({}, $.fn.depdrop.defaults, options, $(this).data()));
                $this.data('depdrop', data);
            }

            if (typeof option === 'string') {
                data[option].apply(data, args);
            }
        });
    };

    $.fn.depdrop.defaults = {
        url: '',
        loading: true,
        loadingClass: 'kv-loading',
        loadingText: 'Loading ...',
        placeholder: 'Select ...',
        emptyMsg: 'No data found',
        initialize: false,
        idParam: 'id',
        nameParam: 'name',
        params: {}
    };

    $.fn.depdrop.Constructor = DepDrop;

    /**
     * Convert automatically select with class 'depdrop'
     * into dependent dropdowns.
     */
    $(function () {
        $('select.depdrop').depdrop();
    });
}(window.jQuery));