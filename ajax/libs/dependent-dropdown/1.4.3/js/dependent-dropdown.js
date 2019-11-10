/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2013 - 2015
 * @version 1.4.3
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
        addOption = function ($el, id, name, sel, opts) {
            var settings = {value: id, text: name};
            opts = opts || {};
            settings = $.extend(settings, opts);
            if (sel !== null && sel.length && id.toString() === sel) {
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
            self.initVal = $el.val();
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
                pValue = {}, chkOptions = $el.find('option').length, initDepends = self.initDepends || self.depends;
            if (chkOptions === 0 || $el.find('option[value=""]').length === chkOptions) {
                $el.attr('disabled', 'disabled');
            }
            for (var i = 0; i < len; i++) {
                $id = $('#' + depends[i]);
                $id.on('depdrop.change change select2:select krajeeselect2:cleared', function (e) {
                    if (!isEmpty($id.data('select2')) && e.type === 'change') {
                        return;
                    }
                    self.setDep($id, depends, len);
                });
            }
            if (self.initialize === true) {
                for (var i = 0; i < initDepends.length; i++) {
                    $('#' + initDepends[i]).trigger('depdrop.change');
                }
            }            
            $el.trigger('depdrop.init');
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
                beforeSend: function () {
                    $el.trigger('depdrop.beforeChange', [vId, $("#" + vId).val(), self.initVal]);
                    $el.find('option[selected]').removeAttr('selected');
                    $el.val('').attr('disabled', 'disabled').html('');
                    if (vLoad) {
                        $el.removeClass(vLoadCss).addClass(vLoadCss).html('<option id="">' + vLoadMsg + '</option>');
                    }
                },
                success: function (data) {
                    selected = isEmpty(data.selected) ? (self.initVal === false ? null : self.initVal): data.selected;
                    if (isEmpty(data)) {
                        addOption($el, '', vNullMsg, '');
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
            $.ajax(settings);
        },
        getSelect: function (data, placeholder, defVal) {
            var self = this, $select = $("<select>"), idParam = self.idParam, nameParam = self.nameParam, options;
            if (placeholder !== false) {
                addOption($select, "", placeholder, defVal);
            }
            if (isEmpty(data)) {
                data = {};
            }
            $.each(data, function (i, groups) {
                if (groups[idParam]) {
                    options = groups.options || {};
                    addOption($select, groups[idParam], groups[nameParam], defVal, options);
                }
                else {
                    var $group = $('<optgroup>', {label: i});
                    $.each(groups, function (j, option) {
                        options = option.options || {};
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