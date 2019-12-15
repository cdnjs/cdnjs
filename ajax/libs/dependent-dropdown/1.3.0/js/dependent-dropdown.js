/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2014
 * @version 1.3.0
 *
 * A multi level dependent dropdown JQuery plugin. The plugin
 * allows nested and combined dependencies.
 * 
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
(function ($) {
    var isEmpty = function (value, trim) {
        return typeof value === 'undefined' || value === null || value === undefined || value == []
            || value === '' || trim && $.trim(value) === '';
    };
    var addOption = function ($el, id, name, sel) {
        var settings = (id == sel && sel !== null) ? {value: id, text: name, selected: "selected"} : {value: id, text: name};
        $("<option/>", settings).appendTo($el);
    };
    var getSelect = function (data, placeholder, defVal) {
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
    };
    var getSettings = function ($element, vUrl, vId, vVal, vPlaceholder, vLoading, vLoadingClass, vLoadingText, vEmptyMsg, vInitVal, vCallback, vParams) {
        var $el = $element, url = vUrl, id = vId, val = vVal, placeholder = vPlaceholder, optCount = 0, emptyMsg = vEmptyMsg,
            initVal = vInitVal, callBack = vCallback, ajaxData = {depdrop_parents: val};
        if (!isEmpty(vParams)) {
            var params = {};
            for (var i = 0; i < vParams.length; i++) {
                params[i] = $('#' + vParams[i]).val();
            }
            ajaxData = {depdrop_parents: val, depdrop_params: params};
        }
        var settings = {
            url: url,
            type: 'post',
            data: ajaxData,
            dataType: 'json',
            success: function (data) {
                var selected = (initVal === false) ? (isEmpty(data.selected) ? null : data.selected) : initVal;
                if (data == null || data.length === 0) {
                    addOption($el, '', emptyMsg, '');
                }
                else {
                    $el.html(getSelect(data.output, placeholder, selected));
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
                    optCount--;
                }
                $el.trigger('depdrop.change', [id, $("#" + id).val(), optCount, initVal]);
            }
        };
        settings['beforeSend'] = function () {
            $el.trigger('depdrop.beforeChange', [id, $("#" + id).val(), initVal]);
            $el.attr('disabled', 'disabled');
            $el.html('');
            if (vLoading) {
                $el.addClass(vLoadingClass);
                $el.html('<option id="">' + vLoadingText + '</option>');
            }
        };
        settings['error'] = function () {
            $el.trigger('depdrop.error', [id, $("#" + id).val(), initVal]);
        };
        settings['complete'] = function () {
            $el.trigger('depdrop.afterChange', [id, $("#" + id).val(), initVal]);
            callBack();
            if (vLoading) {
                $el.removeClass(vLoadingClass);
            }
        };
        return settings;
    };
    var initDependency = function (j, depends, preset) {
        var $el = $('#' + depends[j]), value = {}, $id,
            $elNew = $('#' + depends[j + 1]), len = depends.length;
        for (i = 0; i <= j; i++) {
            $id = $('#' + depends[i]);
            value[i] = $id.val();
        }
        var initVal = preset[j + 1];
        if (j < len - 1) {
            $.ajax(getSettings($elNew,
                $elNew.data('url'),
                $elNew.attr('id'),
                value,
                $elNew.data('placeholder'),
                $elNew.data('loading'),
                $elNew.data('loadingClass'),
                $elNew.data('loadingText'),
                $elNew.data('emptyMsg'),
                initVal,
                function () {
                    initDependency(j + 1, depends, preset);
                },
                $elNew.data('params')
            ));
        }
    };
    // DepDrop public class definition
    var DepDrop = function (element, options) {
        this.$element = $(element);
        this.url = options.url;
        this.depends = options.depends;
        this.loading = options.loading;
        this.loadingClass = options.loadingClass;
        this.loadingText = options.loadingText;
        this.placeholder = options.placeholder;
        this.emptyMsg = options.emptyMsg;
        this.initialize = options.initialize;
        this.params = options.params;
        this.initData();
        this.init();
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
            var self = this, depends = self.depends, $id, $el, $elNew = null, len = depends.length, val = self.$element.val(), pValue = {},
                chkOptions = self.$element.find('option').length;
            if (chkOptions == 0 || self.$element.find('option[value=""]').length == chkOptions) {
                self.$element.attr('disabled', 'disabled');
            }
            for (var i = 0; i < len; i++) {
                $id = $('#' + depends[i]);
                $id.on('change', function () {
                    self.setDependency($id, depends, len, false);
                });
            }
            if (self.initialize === true) {
                for (var j = 0; j < len; j++) {
                    if (j > 0) {
                        pValue[j] = $('#' + depends[j]).val();
                    }
                }
                depends[len] = self.$element.attr('id');
                pValue[len] = self.$element.val();
                var a = depends.join(), b = '';
                $(document).ready(function () {
                    initDependency(0, depends, pValue);
                });
            }

            self.$element.trigger('depdrop.init');
        },
        setDependency: function ($id, depends, len, vInitVal) {
            var self = this, value = {}, initVal = vInitVal, callBack = function () {
                self.$element.trigger('change');
            };
            for (var j = 0; j < len; j++) {
                var $el = $('#' + depends[j]);
                value[j] = $el.val();
            }
            $.ajax(getSettings(self.$element, self.url, $id.attr('id'), value,
                self.placeholder, self.loading, self.loadingClass, self.loadingText, self.emptyMsg, initVal, callBack, self.params));
        }
    };

    //Dependent dropdown plugin definition
    $.fn.depdrop = function (option) {
        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function () {
            var $this = $(this),
                data = $this.data('depdrop'),
                options = typeof option === 'object' && option;

            if (!data) {
                $this.data('depdrop', (data = new DepDrop(this, $.extend({}, $.fn.depdrop.defaults, options, $(this).data()))));
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

    /**
     * Convert automatically select with class 'depdrop'
     * into dependent dropdowns.
     */
    $(function () {
        $('select.depdrop').depdrop();
    });
}(jQuery));