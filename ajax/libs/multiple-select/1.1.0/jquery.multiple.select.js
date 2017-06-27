/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @version 1.1.0
 * 
 * http://wenzhixin.net.cn/p/multiple-select/
 */

(function($) {

    'use strict';

    function MultipleSelect($el, options) {
        var that = this,
            name = $el.attr('name') || options.name || '',
            elWidth = $el.width();

        this.$el = $el.hide();
        this.options = options;

        this.$parent = $('<div class="ms-parent"></div>');
        this.$choice = $('<button type="button" class="ms-choice"><span class="placeholder">' +
            options.placeholder + '</span><div></div></button>');
        this.$drop = $('<div class="ms-drop ' + options.position + '"></div>');
        this.$el.after(this.$parent);
        this.$parent.append(this.$choice);
        this.$parent.append(this.$drop);

        if (this.$el.prop('disabled')) {
            this.$choice.addClass('disabled');
        }
        this.$choice.css('width', elWidth + 'px');
        this.$drop.css({
            width: (options.width || elWidth) + 'px'
        });

        if (!this.options.keepOpen) {
            $('body').click(function(e) {
                if ($(e.target)[0] === that.$choice[0] ||
                    $(e.target).parents('.ms-choice')[0] === that.$choice[0]) {
                    return;
                }
                if (($(e.target)[0] === that.$drop[0] ||
                    $(e.target).parents('.ms-drop')[0] !== that.$drop[0]) &&
                    that.options.isOpen) {
                    that.close();
                }
            });
        }

        this.selectAllName = 'name="selectAll' + name + '"';
        this.selectGroupName = 'name="selectGroup' + name + '"';
        this.selectItemName = 'name="selectItem' + name + '"';
    }

    MultipleSelect.prototype = {
        constructor : MultipleSelect,

        init: function() {
            var that = this,
                html = [];
            if (this.options.filter) {
                html.push(
                    '<div class="ms-search">',
                        '<input type="text" autocomplete="off" autocorrect="off" autocapitilize="off" spellcheck="false">',
                    '</div>'
                );
            }
            html.push('<ul>');
            if (this.options.selectAll && !this.options.single) {
                html.push(
                    '<li>',
                        '<label>',
                            '<input type="checkbox" ' + this.selectAllName + ' /> ',
                            '[' + this.options.selectAllText + ']',
                        '</label>',
                    '</li>'
                );
            }
            $.each(this.$el.children(), function(i, elm) {
                html.push(that.optionToHtml(i, elm));
            });
            html.push('<li class="ms-no-results">No matches found</li>');
            html.push('</ul>');
            this.$drop.html(html.join(''));
            this.$drop.find('ul').css('max-height', this.options.maxHeight + 'px');
            this.$drop.find('.multiple').css('width', this.options.multipleWidth + 'px');

            this.$searchInput = this.$drop.find('.ms-search input');
            this.$selectAll = this.$drop.find('input[' + this.selectAllName + ']');
            this.$selectGroups = this.$drop.find('input[' + this.selectGroupName + ']');
            this.$selectItems = this.$drop.find('input[' + this.selectItemName + ']:enabled');
            this.$disableItems = this.$drop.find('input[' + this.selectItemName + ']:disabled');
            this.$noResults = this.$drop.find('.ms-no-results');
            this.events();
            this.update();

            if (this.options.isOpen) {
                this.open();
            }
        },

        optionToHtml: function(i, elm, group, groupDisabled) {
            var that = this,
                $elm = $(elm),
                html = [],
                multiple = this.options.multiple,
                disabled,
                type = this.options.single ? 'radio' : 'checkbox';

            if ($elm.is('option')) {
                var value = $elm.val(),
                    text = $elm.text(),
                    selected = $elm.prop('selected'),
                    style = this.options.styler(value) ? ' style="' + this.options.styler(value) + '"' : '';

                disabled = groupDisabled || $elm.prop('disabled');
                html.push(
                    '<li' + (multiple ? ' class="multiple"' : '') + style + '>',
                        '<label' + (disabled ? ' class="disabled"' : '') + '>',
                            '<input type="' + type + '" ' + this.selectItemName + ' value="' + value + '"' +
                                (selected ? ' checked="checked"' : '') +
                                (disabled ? ' disabled="disabled"' : '') +
                                (group ? ' data-group="' + group + '"' : '') +
                                '/> ',
                            text,
                        '</label>',
                    '</li>'
                );
            } else if (!group && $elm.is('optgroup')) {
                var _group = 'group_' + i,
                    label = $elm.attr('label');

                disabled = $elm.prop('disabled');
                html.push(
                    '<li class="group">',
                        '<label class="optgroup' + (disabled ? ' disabled' : '') + '" data-group="' + _group + '">',
                            '<input type="checkbox" ' + this.selectGroupName +
                                (disabled ? ' disabled="disabled"' : '') + ' /> ',
                            label,
                        '</label>',
                    '</li>');
                $.each($elm.children(), function(i, elm) {
                    html.push(that.optionToHtml(i, elm, _group, disabled));
                });
            }
            return html.join('');
        },

        events: function() {
            var that = this;
            this.$choice.off('click').on('click', function(e) {
                e.preventDefault();
                that[that.options.isOpen ? 'close' : 'open']();
            })
                .off('focus').on('focus', this.options.onFocus)
                .off('blur').on('blur', this.options.onBlur);

            this.$parent.off('keydown').on('keydown', function(e) {
                switch (e.which) {
                    case 27: // esc key
                        that.close();
                        that.$choice.focus();
                        break;
                }
            });
            this.$searchInput.off('keyup').on('keyup', function() {
                that.filter();
            });
            this.$selectAll.off('click').on('click', function() {
                var checked = $(this).prop('checked'),
                    $items = that.$selectItems.filter(':visible');
                if ($items.length === that.$selectItems.length) {
                    that[checked ? 'checkAll' : 'uncheckAll']();
                } else { // when the filter option is true
                    that.$selectGroups.prop('checked', checked);
                    $items.prop('checked', checked);
                    that.options[checked ? 'onCheckAll' : 'onUncheckAll']();
                    that.update();
                }
            });
            this.$selectGroups.off('click').on('click', function() {
                var group = $(this).parent().attr('data-group'),
                    $items = that.$selectItems.filter(':visible'),
                    $children = $items.filter('[data-group="' + group + '"]'),
                    checked = $children.length !== $children.filter(':checked').length;
                $children.prop('checked', checked);
                that.updateSelectAll();
                that.update();
                that.options.onOptgroupClick({
                    label: $(this).parent().text(),
                    checked: checked,
                    children: $children.get()
                });
            });
            this.$selectItems.off('click').on('click', function() {
                that.updateSelectAll();
                that.update();
                that.updateOptGroupSelect();
                that.options.onClick({
                    label: $(this).parent().text(),
                    value: $(this).val(),
                    checked: $(this).prop('checked')
                });
            });
        },

        open: function() {
            if (this.$choice.hasClass('disabled')) {
                return;
            }
            this.options.isOpen = true;
            this.$choice.find('>div').addClass('open');
            this.$drop.show();
            if (this.options.container) {
                var offset = this.$drop.offset();
                this.$drop.appendTo($(this.options.container));
                this.$drop.offset({ top: offset.top, left: offset.left });
            }
            if (this.options.filter) {
                this.$searchInput.val('');
                this.filter();
            }
            this.options.onOpen();
        },

        close: function() {
            this.options.isOpen = false;
            this.$choice.find('>div').removeClass('open');
            this.$drop.hide();
            if (this.options.container) {
                this.$parent.append(this.$drop);
                this.$drop.css({
                    'top': 'auto',
                    'left': 'auto'
                })
            }
            this.options.onClose();
        },

        update: function() {
            var selects = this.getSelects('text'),
                $span = this.$choice.find('>span');
            if (selects.length === this.$selectItems.length + this.$disableItems.length && this.options.allSelected) {
                $span.removeClass('placeholder').html(this.options.allSelected);
            } else if (selects.length > this.options.minumimCountSelected && this.options.countSelected) {
                $span.removeClass('placeholder').html(this.options.countSelected
                    .replace('#', selects.length)
                    .replace('%', this.$selectItems.length + this.$disableItems.length));
            } else if (selects.length) {
                $span.removeClass('placeholder').html(selects.join(', '));
            } else {
                $span.addClass('placeholder').html(this.options.placeholder);
            }
            // set selects to select
            this.$el.val(this.getSelects());
        },

        updateSelectAll: function() {
            var $items = this.$selectItems.filter(':visible');
            this.$selectAll.prop('checked', $items.length &&
                $items.length === $items.filter(':checked').length);
            if (this.$selectAll.prop('checked')) {
                this.options.onCheckAll();
            }
        },

        updateOptGroupSelect: function() {
            var $items = this.$selectItems.filter(':visible');
            $.each(this.$selectGroups, function(i, val) {
                var group = $(val).parent().attr('data-group'),
                    $children = $items.filter('[data-group="' + group + '"]');
                $(val).prop('checked', $children.length &&
                    $children.length === $children.filter(':checked').length);
            });
        },

        //value or text, default: 'value'
        getSelects: function(type) {
            var that = this,
                texts = [],
                values = [];
            this.$drop.find('input[' + this.selectItemName + ']:checked').each(function() {
                texts.push($(this).parent().text());
                values.push($(this).val());
            });

            if (type === 'text' && this.$selectGroups.length) {
                texts = [];
                this.$selectGroups.each(function() {
                    var html = [],
                        text = $.trim($(this).parent().text()),
                        group = $(this).parent().data('group'),
                        $children = that.$drop.find('[' + that.selectItemName + '][data-group="' + group + '"]'),
                        $selected = $children.filter(':checked');

                    if ($selected.length === 0) {
                        return;
                    }

                    html.push('[');
                    html.push(text);
                    if ($children.length > $selected.length) {
                        var list = [];
                        $selected.each(function() {
                            list.push($(this).parent().text());
                        });
                        html.push(': ' + list.join(', '));
                    }
                    html.push(']');
                    texts.push(html.join(''));
                });
            }
            return type === 'text' ? texts : values;
        },

        setSelects: function(values) {
            var that = this;
            this.$selectItems.prop('checked', false);
            $.each(values, function(i, value) {
                that.$selectItems.filter('[value="' + value + '"]').prop('checked', true);
            });
            this.$selectAll.prop('checked', this.$selectItems.length ===
                this.$selectItems.filter(':checked').length);
            this.update();
        },

        enable: function() {
            this.$choice.removeClass('disabled');
        },

        disable: function() {
            this.$choice.addClass('disabled');
        },

        checkAll: function() {
            this.$selectItems.prop('checked', true);
            this.$selectGroups.prop('checked', true);
            this.$selectAll.prop('checked', true);
            this.update();
            this.options.onCheckAll();
        },

        uncheckAll: function() {
            this.$selectItems.prop('checked', false);
            this.$selectGroups.prop('checked', false);
            this.$selectAll.prop('checked', false);
            this.update();
            this.options.onUncheckAll();
        },

        focus: function() {
            this.$choice.focus();
            this.options.onFocus();
        },

        blur: function() {
            this.$choice.blur();
            this.options.onBlur();
        },

        refresh: function() {
            this.init();
        },

        filter: function() {
            var that = this,
                text = $.trim(this.$searchInput.val()).toLowerCase();
            if (text.length === 0) {
                this.$selectItems.parent().show();
                this.$disableItems.parent().show();
                this.$selectGroups.parent().show();
            } else {
                this.$selectItems.each(function() {
                    var $parent = $(this).parent();
                    $parent[$parent.text().toLowerCase().indexOf(text) < 0 ? 'hide' : 'show']();
                });
                this.$disableItems.parent().hide();
                this.$selectGroups.each(function() {
                    var $parent = $(this).parent();
                    var group = $parent.attr('data-group'),
                        $items = that.$selectItems.filter(':visible');
                    $parent[$items.filter('[data-group="' + group + '"]').length === 0 ? 'hide' : 'show']();
                });

                //Check if no matches found
                if (this.$selectItems.filter(':visible').length) {
                    this.$selectAll.parent().show();
                    this.$noResults.hide();
                } else {
                    this.$selectAll.parent().hide();
                    this.$noResults.show();
                }
            }
            this.updateOptGroupSelect();
            this.updateSelectAll();
        }
    };

    $.fn.multipleSelect = function() {
        var option = arguments[0],
            args = arguments,

            value,
            allowedMethods = [
                'getSelects', 'setSelects',
                'enable', 'disable',
                'checkAll', 'uncheckAll',
                'focus', 'blur',
                'refresh'
            ];

        this.each(function() {
            var $this = $(this),
                data = $this.data('multipleSelect'),
                options = $.extend({}, $.fn.multipleSelect.defaults,
                    $this.data(), typeof option === 'object' && option);

            if (!data) {
                data = new MultipleSelect($this, options);
                $this.data('multipleSelect', data);
            }

            if (typeof option === 'string') {
                if ($.inArray(option, allowedMethods) < 0) {
                    throw "Unknown method: " + option;
                }
                value = data[option](args[1]);
            } else {
                data.init();
            }
        });

        return value ? value : this;
    };

    $.fn.multipleSelect.defaults = {
        name: '',
        isOpen: false,
        placeholder: '',
        selectAll: true,
        selectAllText: 'Select all',
        allSelected: 'All selected',
        minumimCountSelected: 3,
        countSelected: '# of % selected',
        multiple: false,
        multipleWidth: 80,
        single: false,
        filter: false,
        width: undefined,
        maxHeight: 250,
        container: null,
        position: 'bottom',
        keepOpen: false,

        styler: function() {return false;},

        onOpen: function() {return false;},
        onClose: function() {return false;},
        onCheckAll: function() {return false;},
        onUncheckAll: function() {return false;},
        onFocus: function() {return false;},
        onBlur: function() {return false;},
        onOptgroupClick: function() {return false;},
        onClick: function() {return false;}
    };
})(jQuery);
