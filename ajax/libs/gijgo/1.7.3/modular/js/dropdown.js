/*
 * Gijgo DropDown v1.7.3
 * http://gijgo.com/dropdown
 *
 * Copyright 2014, 2017 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery gj */
/**  */gj.dropdown = {
    plugins: {}
};

gj.dropdown.config = {
    base: {

        /** The data source of dropdown.         */        dataSource: undefined,

        /** Text field name.         */        textField: 'text',

        /** Value field name.         */        valueField: 'value',

        /** Selected field name.         */        selectedField: 'selected',

        /** The width of the dropdown.         */        width: undefined,

        optionsDisplay: 'materialdesign',

        fontSize: undefined,

        /** The name of the UI library that is going to be in use.         */        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.         */        iconsLibrary: 'materialicons',

        icons: {
            /** DropDown icon definition.             */            dropdown: '<i class="gj-icon arrow-dropdown" />'
        },

        style: {
            wrapper: 'gj-dropdown gj-dropdown-md gj-unselectable',
            list: 'gj-list gj-list-md gj-dropdown-list-md',
            active: 'gj-list-md-active'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-dropdown gj-dropdown-bootstrap gj-dropdown-bootstrap-3 gj-unselectable',
            presenter: 'btn btn-default',
            list: 'gj-list gj-list-bootstrap gj-dropdown-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active'
        },
        iconsLibrary: 'glyphicons',
        optionsDisplay: 'standard'
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-dropdown gj-dropdown-bootstrap gj-dropdown-bootstrap-4 gj-unselectable',
            presenter: 'btn btn-outline-secondary',
            list: 'gj-list gj-list-bootstrap gj-dropdown-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active'
        },
        optionsDisplay: 'standard'
    },

    materialicons: {
        style: {
            expander: 'gj-dropdown-expander-mi'
        }
    },

    fontawesome: {
        icons: {
            dropdown: '<i class="fa fa-caret-down" aria-hidden="true"></i>'
        },
        style: {
            expander: 'gj-dropdown-expander-fa'
        }
    },

    glyphicons: {
        icons: {
            dropdown: '<span class="caret"></span>'
        },
        style: {
            expander: 'gj-dropdown-expander-glyphicons'
        }
    }
};

gj.dropdown.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'dropdown');
        this.attr('data-dropdown', 'true');
        gj.dropdown.methods.initialize(this);
        return this;
    },

    initialize: function ($dropdown) {
        var $item,
            data = $dropdown.data(),
            $wrapper = $dropdown.parent('div[role="wrapper"]'),
            $display = $('<span role="display"></span>'),
            $expander = $('<span role="expander">' + data.icons.dropdown + '</span>').addClass(data.style.expander),
            $presenter = $('<button role="presenter" type="button"></button>').addClass(data.style.presenter),
            $list = $('<ul role="list" class="' + data.style.list + '"></ul>').attr('guid', $dropdown.attr('data-guid'));

        if ($wrapper.length === 0) {
            $wrapper = $('<div role="wrapper" />').addClass(data.style.wrapper); // The css class needs to be added before the wrapping, otherwise doesn't work.
            $dropdown.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }

        if (data.fontSize) {
            $presenter.css('font-size', data.fontSize);
        }

        $presenter.on('click', function (e) {
            if ($list.is(':visible')) {
                $list.hide();
            } else {
                gj.dropdown.methods.setListPosition($presenter, $list, data);
                $list.show();
                gj.dropdown.methods.setListPosition($presenter, $list, data);
            }
        });
        $presenter.on('blur', function (e) {
            setTimeout(function () {
                $list.hide();
            }, 500);
        });
        $presenter.append($display).append($expander);

        $dropdown.hide();
        $dropdown.after($presenter);
        $('body').append($list);
        $list.hide();

        $dropdown.reload();
    },

    setListPosition: function ($presenter, $list, data) {
        var offset = $presenter.offset();
        $list.css('left', offset.left).css('width', $presenter.outerWidth(true));
        if (data.optionsDisplay === 'standard') {
            $list.css('top', offset.top + $presenter.outerHeight(true) + 2);
        } else {
            $list.css('top', offset.top);
        }
    },

    useHtmlDataSource: function ($dropdown, data) {
        var dataSource = [], i, $option, record,
            $options = $dropdown.find('option');
        for (i = 0; i < $options.length; i++) {
            $option = $($options[i]);
            record = {};
            record[data.valueField] = $option.val();
            record[data.textField] = $option.html();
            record[data.selectedField] = $option.prop('selected');
            dataSource.push(record);
        }
        data.dataSource = dataSource;
    },

    filter: function ($dropdown) {
        var i, record, data = $dropdown.data();
        if (!data.dataSource)
        {
            data.dataSource = [];
        } else if (typeof data.dataSource[0] === 'string') {
            for (i = 0; i < data.dataSource.length; i++) {
                record = {};
                record[data.valueField] = data.dataSource[i];
                record[data.textField] = data.dataSource[i];
                data.dataSource[i] = record;
            }
        }
        return data.dataSource;
    },

    render: function ($dropdown, response) {
        var selectedInd = false,
            data = $dropdown.data(),
            $parent = $dropdown.parent(),
            $list = $('body').children('[role="list"][guid="' + $dropdown.attr('data-guid') + '"]'),
            $presenter = $parent.children('[role="presenter"]'),
            $expander = $presenter.children('[role="expander"]'),
            $display = $presenter.children('[role="display"]');

        $dropdown.data('records', response);
        $dropdown.empty();
        $list.empty();

        if (response && response.length) {
            $.each(response, function () {
                var value = this[data.valueField],
                    text = this[data.textField],
                    selected = this[data.selectedField] && this[data.selectedField].toString().toLowerCase() === 'true',
                    $item, $option;

                $item = $('<li value="' + value + '"><div data-role="wrapper"><span data-role="display">' + text + '</span></div></li>');
                $item.addClass(data.style.item);
                $item.on('click', function (e) {
                    gj.dropdown.methods.select($dropdown, value);
                    gj.dropdown.events.change($dropdown);
                });
                $list.append($item);

                $option = $('<option value="' + value + '">' + text + '</option>');
                $dropdown.append($option);

                if (selected) {
                    gj.dropdown.methods.select($dropdown, value);
                    selectedInd = true;
                }
            });
            if (selectedInd === false) {
                gj.dropdown.methods.select($dropdown, response[0][data.valueField]);
            }
        }

        if (data.width) {
            $parent.css('width', data.width);
            $list.css('width', data.width);
            $presenter.css('width', data.width);
            //$display.css('width', $presenter.outerWidth(true) - $expander.outerWidth(true));
        }

        if (data.fontSize) {
            $list.children('li').css('font-size', data.fontSize);
        }

        gj.dropdown.events.dataBound($dropdown);

        return $dropdown;
    },

    select: function ($dropdown, value) {
        var data = $dropdown.data(),
            $list = $('body').children('[role="list"][guid="' + $dropdown.attr('data-guid') + '"]'),
            $item = $list.children('li[value="' + value + '"]'),
            record = gj.dropdown.methods.getRecordByValue($dropdown, value);
        $list.children('li').removeClass(data.style.active);
        $item.addClass(data.style.active);
        $dropdown.val(value);
        $dropdown.next('[role="presenter"]').find('[role="display"]').html(record[data.textField]);
        $list.hide();
        return $dropdown;
    },

    getRecordByValue: function ($dropdown, value) {
        var data = $dropdown.data(),
            i, result = undefined;

        for (i = 0; i < data.records.length; i++) {
            if (data.records[i][data.valueField] === value) {
                result = data.records[i];
                break;
            }
        }

        return result;
    },

    value: function ($dropdown, value) {
        if (typeof (value) === "undefined") {
            return $dropdown.val();
        } else {
            gj.dropdown.methods.select($dropdown, value);
            gj.dropdown.events.change($dropdown);
            return $dropdown;
        }
    },

    destroy: function ($dropdown) {
        var data = $dropdown.data(),
            $parent = $dropdown.parent('div[role="wrapper"]');
        if (data) {
            $dropdown.xhr && $dropdown.xhr.abort();
            $dropdown.off();
            $dropdown.removeData();
            $dropdown.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-dropdown');
            $dropdown.removeClass();
            if ($parent.length > 0) {
                $parent.children('[role="presenter"]').remove();
                $parent.children('[role="list"]').remove();
                $dropdown.unwrap();
            }
            $dropdown.show();
        }
        return $tree;
    }
};

gj.dropdown.events = {
    /**
     * Triggered when the dropdown value is changed.
     *     */    change: function ($dropdown) {
        return $dropdown.triggerHandler('change');
    },

    /**
     * Event fires after the loading of the data in the dropdown.     */    dataBound: function ($dropdown) {
        return $dropdown.triggerHandler('dataBound');
    }
};

gj.dropdown.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.dropdown.methods;

    /** Gets or sets the value of the DropDown.     */    self.value = function (value) {
        return methods.value(this, value);
    };

    self.enable = function () {
        return methods.enable(this);
    };

    self.disable = function () {
        return methods.disable(this);
    };

    /** Remove dropdown functionality from the element.     */    self.destroy = function () {
        return methods.destroy(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-dropdown')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.dropdown.widget.prototype = new gj.widget();
gj.dropdown.widget.constructor = gj.dropdown.widget;

(function ($) {
    $.fn.dropdown = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.dropdown.widget(this, method);
            } else {
                $widget = new gj.dropdown.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
