/*
 * Gijgo ColorPicker v1.9.13
 * http://gijgo.com/colorpicker
 *
 * Copyright 2014, 2019 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery gj */
/**  */gj.colorpicker = {
    plugins: {},
    messages: {
        'en-us': {
        }
    }
};

gj.colorpicker.config = {
    base: {

        /** The name of the UI library that is going to be in use.         */        uiLibrary: 'materialdesign',

        /** The initial colorpicker value.         */        value: undefined,

        icons: {
            rightIcon: '<i class="gj-icon">event</i>'
        },

        style: {
            modal: 'gj-modal',
            wrapper: 'gj-colorpicker gj-colorpicker-md gj-unselectable',
            input: 'gj-textbox-md',
            picker: 'gj-picker gj-picker-md colorpicker gj-unselectable',
            footer: '',
            button: 'gj-button-md'
        }
    },

    bootstrap: {
        style: {}
    },

    bootstrap4: {
        style: {}
    }
};

gj.colorpicker.methods = {
    init: function (jsConfig) {
        gj.picker.widget.prototype.init.call(this, jsConfig, 'colorpicker');
        gj.colorpicker.methods.initialize(this);
        return this;
    },

    initialize: function ($colorpicker) {
    },

    createPicker: function ($input, data) {
        var $picker = $('<div role="picker" />').addClass(data.style.picker).attr('guid', $input.attr('data-guid'));

        $picker.html('test');

        $picker.hide();
        $('body').append($picker);

        return $picker;
    },

    open: function ($input) {
        if ($input.val()) {
            $input.value($input.val());
        }
        return gj.picker.widget.prototype.open.call($input, 'colorpicker');
    }
};

gj.colorpicker.events = {
    /**
     * Fires when the colorpicker value changes as a result of selecting a new value with the drag handle, buttons or keyboard.
     *     */    change: function ($colorpicker) {
        return $colorpicker.triggerHandler('change');
    },

    /**
     * Fires as a new color is displayed in the drop-down picker.     */    select: function ($colorpicker) {
        return $colorpicker.triggerHandler('select');
    },

    /**
     * Fires when the picker popup is opening.     */    open: function ($colorpicker) {
        return $colorpicker.triggerHandler('open');
    },

    /**
     * Fires when the picker popup is closing.     */    close: function ($colorpicker) {
        return $colorpicker.triggerHandler('close');
    }
};

gj.colorpicker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.colorpicker.methods;

    /** Gets or sets the value of the colorpicker.     */    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove colorpicker functionality from the element.     */    self.destroy = function () {
        return gj.picker.widget.prototype.destroy.call(this, 'colorpicker');
    };

    /** Opens the popup element with the color selector.     */    self.open = function () {
        return methods.open(this);
    };

    /** Close the popup element with the color selector.     */    self.close = function () {
        return gj.picker.widget.prototype.close.call(this, 'colorpicker');
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-colorpicker')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.colorpicker.widget.prototype = new gj.picker.widget();
gj.colorpicker.widget.constructor = gj.colorpicker.widget;

(function ($) {
    $.fn.colorpicker = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.colorpicker.widget(this, method);
            } else {
                $widget = new gj.colorpicker.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
