/*
 * Fuel UX Select
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define(['require','jquery','./util'],function(require) {

    var $ = require('jquery');
	require('./util');

    // SELECT CONSTRUCTOR AND PROTOTYPE

    var Select = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.select.defaults, options);
        this.$element.on('click', 'a', $.proxy(this.itemclicked, this));
        this.$button = this.$element.find('.btn');
        this.$label = this.$element.find('.dropdown-label');
        this.setDefaultSelection();

        if (options.resize === 'auto') {
            this.resize();
        }
    };

    Select.prototype = {

        constructor: Select,

        itemclicked: function (e) {
            this.$selectedItem = $(e.target).parent();
            this.$label.text(this.$selectedItem.text());

            // pass object including text and any data-attributes
            // to onchange event
            var data = this.selectedItem();

            // trigger changed event
            this.$element.trigger('changed', data);

            e.preventDefault();
        },

        resize: function() {
            var el = $('#selectTextSize')[0];

            // create element if it doesn't exist
            // used to calculate the length of the longest string
            if(!el) {
                $('<div/>').attr({id:'selectTextSize'}).appendTo('body');
            }

            var width = 0;
            var newWidth = 0;

            // iterate through each item to find longest string
            this.$element.find('a').each(function () {
                var $this = $(this);
                var txt = $this.text();
                var $txtSize = $('#selectTextSize');
                $txtSize.text(txt);
                newWidth = $txtSize.outerWidth();
                if(newWidth > width) {
                    width = newWidth;
                }
            });

            this.$label.width(width);
        },

        selectedItem: function() {
            var txt = this.$selectedItem.text();
            return $.extend({ text: txt }, this.$selectedItem.data());
        },

        selectByText: function(text) {
            var selector = 'li a:fuelTextExactCI(' + text + ')';
            this.selectBySelector(selector);
        },

        selectByValue: function(value) {
            var selector = 'li[data-value="' + value + '"]';
            this.selectBySelector(selector);
        },

        selectByIndex: function(index) {
            // zero-based index
            var selector = 'li:eq(' + index + ')';
            this.selectBySelector(selector);
        },

        selectBySelector: function(selector) {
            var item = this.$element.find(selector);

            this.$selectedItem = item;
            this.$label.text(this.$selectedItem.text());
        },

        setDefaultSelection: function() {
            var selector = 'li[data-selected=true]:first';
            var item = this.$element.find(selector);
            if(item.length === 0) {
                // select first item
                this.selectByIndex(0);
            }
            else {
                // select by data-attribute
                this.selectBySelector(selector);
                item.removeData('selected');
                item.removeAttr('data-selected');
            }
        },

        enable: function() {
            this.$button.removeClass('disabled');
        },

        disable: function() {
            this.$button.addClass('disabled');
        }

    };


    // SELECT PLUGIN DEFINITION

    $.fn.select = function (option,value) {
        var methodReturn;

        var $set = this.each(function () {
            var $this = $(this);
            var data = $this.data('select');
            var options = typeof option === 'object' && option;

            if (!data) $this.data('select', (data = new Select(this, options)));
            if (typeof option === 'string') methodReturn = data[option](value);
        });

        return (methodReturn === undefined) ? $set : methodReturn;
    };

    $.fn.select.defaults = {};

    $.fn.select.Constructor = Select;


    // SELECT DATA-API

    $(function () {

        $(window).on('load', function () {
            $('.select').each(function () {
                var $this = $(this);
                if ($this.data('select')) return;
                $this.select($this.data());
            });
        });

        $('body').on('mousedown.select.data-api', '.select', function (e) {
            var $this = $(this);
            if ($this.data('select')) return;
            $this.select($this.data());
        });
    });

});
