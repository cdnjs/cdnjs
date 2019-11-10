/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2014
 * @version 1.4.0
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
            var settings = (id === sel && sel !== null) ? {value: id, text: name, selected: "selected"} : {
                value: id,
                text: name
            };
            $("<option/>", settings).appendTo($el);
        },
        getSelect = function (data, placeholder, defVal) {
            var $select = $("<select>");
            if (placeholder !== false) {
                addOption($select, "", placeholder, defVal);
            }
            $.each(data, function (i, groups) {
                if (groups.id) {
                    addOption($select, groups.id, groups.name, defVal);
                }
                else {
                    var $group = $('<optgroup>', {label: i});
                    $.each(groups, function (j, option) {
                        addOption($group, option.id, option.name, defVal);
                    });
                    $group.appendTo($select);
                }
            });
            return $select.html();
        },
        processDep = function ($el, vUrl, vId, vVal, vDef, vLoad, vLoadCss, vLoadMsg, vNullMsg, vInit, vFunc, vPar) {
            var selected, optCount = 0, ajaxData = {depdrop_parents: vVal}, params = {}, settings;
            if (!isEmpty(vPar)) {
                for (var i = 0; i < vPar.length; i++) {
                    params[i] = $('#' + vPar[i]).val();
                }
                ajaxData = {depdrop_parents: vVal, depdrop_params: params};
            }
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
                        $el.html(getSelect(data.output, vDef, selected));
                        if ($el.find('optgroup').length > 0) {
                            $el.find('option[value=""]').attr('disabled', 'disabled');
                        }
                        if (data.output.length !== 0) {
                            $el.val(selected);
                            $el.removeAttr('disabled');
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
                $el.attr('disabled', 'disabled');
                $el.html('');
                if (vLoad) {
                    $el.addClass(vLoadCss);
                    $el.html('<option id="">' + vLoadMsg + '</option>');
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
        initDep = function (j, depends, preset) {
            var value = {}, $id, i, initVal = preset[j + 1],
                $el = $('#' + depends[j + 1]), len = depends.length;
            for (i = 0; i <= j; i++) {
                $id = $('#' + depends[i]);
                value[i] = $id.val();
            }
            if (j < len - 1) {
                processDep(
                    $el,
                    $el.data('url'),
                    $el.attr('id'),
                    value,
                    $el.data('placeholder'),
                    $el.data('loading'),
                    $el.data('loadingClass'),
                    $el.data('loadingText'),
                    $el.data('emptyMsg'),
                    initVal,
                    function () {
                        initDep(j + 1, depends, preset);
                    },
                    $el.data('params')
                );
            }
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
            var self = this;
            self.$element.data('url', self.url);
            self.$element.data('depends', self.depends);
            self.$element.data('placeholder', self.placeholder);
            self.$element.data('loading', self.loading);
            self.$element.data('loadingClass', self.loadingClass);
            self.$element.data('loadingText', self.loadingText);
            self.$element.data('emptyMsg', self.emptyMsg);
            self.$element.data('initialize', self.initialize);
            self.$element.data('params', self.params);
        },
        init: function () {
            var self = this, depends = self.depends, $id, $el = self.$element, len = depends.length,
                pValue = {}, chkOptions = $el.find('option').length,
                handler = function ($elem) {
                    return function () {
                        self.setDep($elem, depends, len, false);
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
                    initDep(0, depends, pValue);
                });
            }

            $el.trigger('depdrop.init');
        },
        setDep: function ($elem, depends, len, vInit) {
            var self = this, $el, typ, value = {}, initVal = vInit,
                callBack = function () {
                    self.$element.trigger('change');
                };
            for (var j = 0; j < len; j++) {
                $el = $('#' + depends[j]);
                typ = $el.attr('type');
                value[j] = (typ === "checkbox" || typ === "radio") ? $el.prop('checked') : $el.val();
            }
            processDep(
                self.$element,
                self.url,
                $elem.attr('id'),
                value,
                self.placeholder,
                self.loading,
                self.loadingClass,
                self.loadingText,
                self.emptyMsg,
                initVal,
                callBack,
                self.params
            );
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
                $this.data('depdrop',
                    (data = new DepDrop(this, $.extend({}, $.fn.depdrop.defaults, options, $(this).data()))));
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
