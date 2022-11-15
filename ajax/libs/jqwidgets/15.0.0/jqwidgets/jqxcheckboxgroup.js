/*
jQWidgets v15.0.0 (2022-Nov)
Copyright (c) 2011-2022 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/* tslint:disable */
/* eslint-disable */
(function ($) {

    $.jqx.jqxWidget("jqxCheckBoxGroup", "", {});

    $.extend($.jqx._jqxCheckBoxGroup.prototype, {
        defineInstance: function () {
            var settings = {
                layout: 'vertical', // possible values - horizontal and vertical
                labelPosition: 'after', // possible values - before and after
                items: [],
                value: '',
                disabled: false,
                change: null,
                rtl: false
            };
            if (this === $.jqx._jqxCheckBoxGroup.prototype) {
                return settings;
            }
            $.extend(true, this, settings);
            return settings;
        },

        createInstance: function (args) {
            var that = this;
            that.render();
        },

        enableAt: function (index) {
            var that = this;
            if (that.groupItems[index]) {
                that.groupItems[index].classList.remove('jqx-fill-state-disabled');
                that.dataItems[index].enabled = true;
            }
        },

        disableAt: function (index) {
            var that = this;

            if (that.groupItems[index]) {
                that.groupItems[index].classList.add('jqx-fill-state-disabled');
                that.dataItems[index].enabled = false;
            }
        },

        getValue: function () {
            var that = this;

            return this.value;
        },

        checkAll: function () {
            var that = this;

            if (!that.checkboxes) {
                return;
            }

            for (var i = 0; i < that.checkboxes.length; i++) {
                that.checkAt(i);
            }
        },

        uncheckAll: function () {
            var that = this;

            if (!that.checkboxes) {
                return;
            }

            for (var i = 0; i < that.checkboxes.length; i++) {
                this.checkboxes[i].uncheck();
            }
        },

        checkValue: function (value) {
            var that = this;

            if (!that.checkboxes) {
                return;
            }

            for (var i = 0; i < that.dataItems.length; i++) {
                if (this.dataItems[i].value === value) {
                    that.checkAt(i);
                }
            }
        },

        uncheckValue: function (value) {
            var that = this;

            if (!that.checkboxes) {
                return;
            }

            for (var i = 0; i < that.dataItems.length; i++) {
                if (this.dataItems[i].value === value) {
                    that.uncheckAt(i);
                }
            }
        },

        checkAt: function (index) {
            var that = this;

            if (!that.checkboxes) {
                return;
            }

            if (that.checkboxes[index]) {
                that.checkboxes[index].check();
            }
        },

        uncheckAt: function (index) {
            var that = this;

            if (!that.checkboxes) {
                return;
            }

            if (that.checkboxes[index]) {
                that.checkboxes[index].uncheck();
            }
        },

        getValueAt: function (index) {
            var that = this;

            if (!that.dataItems) {
                return null
            }

            if (that.dataItems[index]) {
                return that.dataItems[index].value;
            }

            return null;
        },

        enable: function () {
            var that = this;

            that.host.removeClass('jqx-fill-state-disabled');
            for (var i = 0; i < that.checkboxes.length; i++) {
                that.checkboxes[i].enable();
            }
            that.disabled = false;
        },

        disable: function () {
            var that = this;

            that.host.addClass('jqx-fill-state-disabled');
            for (var i = 0; i < that.checkboxes.length; i++) {
                that.checkboxes[i].disable();
            }
            that.disabled = true;
        },

        render: function () {
            this.init = true;
            var that = this;
            this.setSize();
            this.propertyChangeMap['width'] = function (instance, key, oldVal, value) {
                me.setSize();
            };

            this.propertyChangeMap['height'] = function (instance, key, oldVal, value) {
                me.setSize();
            };

            if (!this.width) this.host.css('overflow-x', 'visible');
            if (!this.height) this.host.css('overflow-y', 'visible');

            if (this.disabled) {
                this.disable();
            }

            var items = '<div layout="' + that.layout + '" label-position="' + that.labelPosition + '" class="jqx-container">';
            var dataItems = [];
            for (var i = 0; i < that.items.length; i++) {
                var item = that.items[i];

                if (typeof item === 'string') {
                    item = {
                        label: item,
                        value: item,
                        cssClass: '',
                        enabled: true
                    }
                }

                if (item.enabled === undefined) {
                    item.enabled = true;
                }

                if (item.cssClass === undefined) {
                    item.cssClass = '';
                }

                if (item.label === undefined) {
                    item.label = '' + (1 + i);
                }

                if (item.value === undefined) {
                    item.value = item.label;
                }

                dataItems.push(item);
                var cssClass = item.cssClass || '';
                var label = item.label;
                if (item.encoded) {
                    label = that.escapeHTML(label);
                }
                var disabledClass = item.enabled === false ? 'jqx-fill-state-disabled' : '';
                var htmlItem = '<div value=' + item.value + 'class="jqx-checkbox-group-item ' + cssClass + ' ' + disabledClass + '"><label class="jqx-checkbox-label"> ' + label + '</label><span checkmark class="jqx-checkbox-group-item-check"></span></div>';
                items += htmlItem;
            }

            that.dataItems = dataItems;
            items += '</div>';
            that.element.innerHTML = items;
            var labels = [...that.element.querySelectorAll('label')];
            var checkmarks = [...that.element.querySelectorAll('[checkmark]')];
            var checkboxes = [];
            checkmarks.forEach((checkmark, index) => {
                $(checkmark).jqxCheckBox({ rtl: that.rtl, disabled: that.dataItems[index].enabled === false, theme: that.theme, checked: that.value.includes(that.dataItems[index].value) });

                $(checkmark).on('change', function () {
                    if (that.change && that.dataItems[index] && that.dataItems[index].enabled !== false && that.disabled === false) {
                        var itemData = JSON.parse(JSON.stringify(that.dataItems[index]));
                        that.value = [];
                        for (var i = 0; i < that.checkboxes.length; i++) {
                            if (that.checkboxes[i].checked) {
                                that.value.push(that.dataItems[i].value);
                            }
                        }
                        itemData.checked = that.value.includes(itemData.value);

                        that.change(itemData);
                    }
                });
                checkboxes.push($(checkmark).jqxCheckBox('getInstance'));
            });

            labels.forEach((label, index) => {
                label.onclick = () => {
                    checkboxes[index].toggle();
                }
            });

            that.groupItems = that.element.querySelectorAll('.jqx-checkbox-group-item');
            that.checkboxes = checkboxes;
            that.host.addClass(that.toThemeProperty('jqx-widget jqx-checkbox-group'));
        },

        escapeHTML: function (value) {
            var entityMap = {
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'
            };

            return String(value).replace(/[&<>"'`=\/]/g, function (s) { return entityMap[s] });
        },

        refresh: function (initialRefresh) {
            if (!initialRefresh) {
                this.setSize();
                this._render();
            }
        },

        resize: function (width, height) {
            this.width = width;
            this.height = height;
            this.refresh();
        },

        setSize: function () {
            if (this.width != null && this.width.toString().indexOf("px") != -1) {
                this.host.width(this.width);
            }
            else if (this.width != undefined && !isNaN(this.width)) {
                this.host.width(this.width);
            }
            else if (this.width != null && this.width.toString().indexOf("%") != -1) {
                this.element.style.width = this.width;
            }

            if (this.height != null && this.height.toString().indexOf("px") != -1) {
                this.host.height(this.height);
            }
            else if (this.height != undefined && !isNaN(this.height)) {
                this.host.height(this.height);
            }
            else if (this.height != null && this.height.toString().indexOf("%") != -1) {
                this.element.style.height = this.height;
            }
        },


        val: function (value) {
            if (arguments.length == 0 || (value != null && typeof (value) == "object")) {
                return this.value;
            }

            this.value = value;

            if (typeof value == "string") {
                this.uncheckAll();
                if (that.dataItems) {
                    for (var i = 0; i < this.dataItems.length; i++) {
                        if (this.dataItems[i].value === itemValue) {
                            this.checkAt(i);
                        }
                    }
                }
            }
            else if (Array.isArray(value)) {
                this.uncheckAll();
                value.forEach((itemValue) => {
                    if (that.dataItems) {
                        for (var i = 0; i < this.dataItems.length; i++) {
                            if (this.dataItems[i].value === itemValue) {
                                this.checkAt(i);
                            }
                        }
                    }
                });
            }
            return this.value;
        },

        destroy: function () {
            this.host.remove();
        },

        propertiesChangedHandler: function (object, key, value) {
            if (value.width && value.height && Object.keys(value).length == 2) {
                object.setSize();
            }
        },

        propertyChangedHandler: function (object, key, oldvalue, value) {
            if (this.isInitialized == undefined || this.isInitialized == false)
                return;

            if (object.batchUpdate && object.batchUpdate.width && object.batchUpdate.height && Object.keys(object.batchUpdate).length == 2) {
                return;
            }

            if (key == "rtl") {
                for (var i = 0; i < this.checkboxes.length; i++) {
                    this.checkboxes[i].host.jqxCheckBox({ rtl: value });
                }
            }

            if (key == 'theme') {
                $.jqx.utilities.setTheme(oldvalue, value, object.host);
                for (var i = 0; i < this.checkboxes.length; i++) {
                    this.checkboxes[i].host.jqxCheckBox({ theme: value });
                }
            }

            if (key === "layout" || key === "labelPosition" || key === "items") {
                this.render();
            }

            if (key == 'value') {
                this.uncheckAll();
                for (var i = 0; i < this.dataItems.length; i++) {
                    if (value.includes(this.dataItems[i].value)) {
                        this.checkAt(i);
                    }
                }
            }

            if (key == 'disabled') {
                value ? this.disable() : this.enable();
            }
        }
    });
})(jqxBaseFramework);




