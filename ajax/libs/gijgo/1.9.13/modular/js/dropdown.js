/*
 * Gijgo DropDown v1.9.13
 * http://gijgo.com/dropdown
 *
 * Copyright 2014, 2019 gijgo.com
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

        /** The maximum height of the dropdown list. When set to auto adjust to the screen height.         */        maxHeight: 'auto',

        /** Placeholder. This label appear only if the value is not set yet.         */        placeholder: undefined,

        fontSize: undefined,

        /** The name of the UI library that is going to be in use.         */        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.         */        iconsLibrary: 'materialicons',

        icons: {
            /** DropDown icon definition.             */            dropdown: '<i class="gj-icon arrow-dropdown" />',

            dropup: '<i class="gj-icon arrow-dropup" />'
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
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-dropdown gj-dropdown-bootstrap gj-dropdown-bootstrap-4 gj-unselectable',
            presenter: 'btn btn-outline-secondary',
            list: 'gj-list gj-list-bootstrap gj-dropdown-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active'
        }
    },

    materialicons: {
        style: {
            expander: 'gj-dropdown-expander-mi'
        }
    },

    fontawesome: {
        icons: {
            dropdown: '<i class="fa fa-caret-down" aria-hidden="true"></i>',
            dropup: '<i class="fa fa-caret-up" aria-hidden="true"></i>'
        },
        style: {
            expander: 'gj-dropdown-expander-fa'
        }
    },

    glyphicons: {
        icons: {
            dropdown: '<span class="caret"></span>',
            dropup: '<span class="dropup"><span class="caret" ></span></span>'
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

    getHTMLConfig: function () {
        var result = gj.widget.prototype.getHTMLConfig.call(this),
            attrs = this[0].attributes;
        if (attrs['placeholder']) {
            result.placeholder = attrs['placeholder'].value;
        }
        return result;
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
                gj.dropdown.methods.close($dropdown, $list);
            } else {
                gj.dropdown.methods.open($dropdown, $list);
            }
        });
        $presenter.on('blur', function (e) {
            setTimeout(function () {
                gj.dropdown.methods.close($dropdown, $list);
            }, 500);
        });
        $presenter.append($display).append($expander);

        $dropdown.hide();
        $dropdown.after($presenter);
        $('body').append($list);
        $list.hide();

        $dropdown.reload();
    },

    setListPosition: function (presenter, list, data) {
        var top, listHeight, presenterHeight, newHeight, listElRect,
            mainElRect = presenter.getBoundingClientRect(),
            scrollY = window.scrollY || window.pageYOffset || 0,
            scrollX = window.scrollX || window.pageXOffset || 0;

        // Reset list size
        list.style.overflow = '';
        list.style.overflowX = '';
        list.style.height = '';

        gj.core.setChildPosition(presenter, list);

        listHeight = gj.core.height(list, true);
        listElRect = list.getBoundingClientRect();
        presenterHeight = gj.core.height(presenter, true);
        if (data.maxHeight === 'auto') {
            if (mainElRect.top < listElRect.top) { // The list is located below the main element
                if (mainElRect.top + listHeight + presenterHeight > window.innerHeight) {
                    newHeight = window.innerHeight - mainElRect.top - presenterHeight - 3;
                }
            } else { // The list is located above the main element                
                if (mainElRect.top - listHeight - 3 > 0) {
                    list.style.top = Math.round(mainElRect.top + scrollY - listHeight - 3) + 'px';
                } else {
                    list.style.top = scrollY + 'px';
                    newHeight = mainElRect.top - 3;
                }
            }
        } else if (!isNaN(data.maxHeight) && data.maxHeight < listHeight) {
            newHeight = data.maxHeight;
        }

        if (newHeight) {
            list.style.overflow = 'scroll';
            list.style.overflowX = 'hidden';
            list.style.height = newHeight + 'px';
        }
    },

    useHtmlDataSource: function ($dropdown, data) {
        var dataSource = [], i, record,
            $options = $dropdown.find('option');
        for (i = 0; i < $options.length; i++) {
            record = {};
            record[data.valueField] = $options[i].value;
            record[data.textField] = $options[i].innerHTML;
            record[data.selectedField] = $dropdown[0].value === $options[i].value;
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
        var selections = [],
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
                    i, $item;

                $item = $('<li value="' + value + '"><div data-role="wrapper"><span data-role="display">' + text + '</span></div></li>');
                $item.addClass(data.style.item);
                $item.on('click', function (e) {
                    gj.dropdown.methods.select($dropdown, value);
                });
                $list.append($item);
                
                $dropdown.append('<option value="' + value + '">' + text + '</option>');

                if (selected) {
                    selections.push(value);
                }
            });
            if (selections.length === 0) {
                $dropdown.prepend('<option value=""></option>');
                $dropdown[0].selectedIndex = 0;
                if (data.placeholder) {
                    $display[0].innerHTML = '<span class="placeholder">' + data.placeholder + '</span>';
                }
            } else {
                for (i = 0; i < selections.length; i++) {
                    gj.dropdown.methods.select($dropdown, selections[i]);
                }
            }
        }

        if (data.width) {
            $parent.css('width', data.width);
            $presenter.css('width', data.width);
        }

        if (data.fontSize) {
            $list.children('li').css('font-size', data.fontSize);
        }

        gj.dropdown.events.dataBound($dropdown);

        return $dropdown;
    },

    open: function ($dropdown, $list) {
        var data = $dropdown.data(),
            $expander = $dropdown.parent().find('[role="expander"]'),
            $presenter = $dropdown.parent().find('[role="presenter"]'),
            scrollParentEl = gj.core.getScrollParent($dropdown[0]);
        $list.css('width', gj.core.width($presenter[0]));
        $list.show();
        gj.dropdown.methods.setListPosition($presenter[0], $list[0], data);
        $expander.html(data.icons.dropup);
        if (scrollParentEl) {
            data.parentScrollHandler = function () {
                gj.dropdown.methods.setListPosition($presenter[0], $list[0], data);
            };
            gj.dropdown.methods.addParentsScrollListener(scrollParentEl, data.parentScrollHandler);
        }
    },

    close: function ($dropdown, $list) {
        var data = $dropdown.data(),
            $expander = $dropdown.parent().find('[role="expander"]'),
            scrollParentEl = gj.core.getScrollParent($dropdown[0]);
        $expander.html(data.icons.dropdown);
        if (scrollParentEl && data.parentScrollHandler) {
            gj.dropdown.methods.removeParentsScrollListener(scrollParentEl, data.parentScrollHandler);
        }
        $list.hide();
    },

    addParentsScrollListener: function (el, handler) {
        var scrollParentEl = gj.core.getScrollParent(el.parentNode);
        el.addEventListener('scroll', handler);
        if (scrollParentEl) {
            gj.dropdown.methods.addParentsScrollListener(scrollParentEl, handler);
        }
    },

    removeParentsScrollListener: function (el, handler) {
        var scrollParentEl = gj.core.getScrollParent(el.parentNode);
        el.removeEventListener('scroll', handler);
        if (scrollParentEl) {
            gj.dropdown.methods.removeParentsScrollListener(scrollParentEl, handler);
        }
    },

    select: function ($dropdown, value) {
        var data = $dropdown.data(),
            $list = $('body').children('[role="list"][guid="' + $dropdown.attr('data-guid') + '"]'),
            $item = $list.children('li[value="' + value + '"]'),
            $display = $dropdown.next('[role="presenter"]').find('[role="display"]'),
            record = gj.dropdown.methods.getRecordByValue($dropdown, value);

        $list.children('li').removeClass(data.style.active);
        if (record) {
            $item.addClass(data.style.active);
            $dropdown[0].value = value;
            $display[0].innerHTML = record[data.textField];
        } else {
            if (data.placeholder) {
                $display[0].innerHTML = '<span class="placeholder">' + data.placeholder + '</span>';
            }
            $dropdown[0].value = '';
        }
        gj.dropdown.events.change($dropdown);
        gj.dropdown.methods.close($dropdown, $list);
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
        return $dropdown;
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

gj.dropdown.widget.prototype.getHTMLConfig = gj.dropdown.methods.getHTMLConfig;

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
