/*!
 * ZUI: 排序 - v1.6.0 - 2017-03-16
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2017 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: sortable.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


+ function($, window, document) {
    'use strict';

    if(!$.fn.droppable) {
        console.error('Sortable requires droppable.js');
        return;
    }

    var NAME     = 'zui.sortable',
        DEFAULTS = {
            selector     : 'li,div',
            dragCssClass : 'invisible',
            sortingClass : 'sortable-sorting'
        },
        STR_ORDER = 'order';

    var Sortable = function(element, options) {
        var that     = this;
        that.$       = $(element);
        that.options = $.extend({}, DEFAULTS, that.$.data(), options);
        that.init();
    };

    Sortable.DEFAULTS = DEFAULTS;
    Sortable.NAME     = NAME;

    Sortable.prototype.init = function($list) {
        var that         = this,
            $root        = that.$,
            options      = that.options,
            selector     = options.selector,
            sortingClass = options.sortingClass,
            dragCssClass = options.dragCssClass,
            isReverse    = options.reverse;

        var markOrders = function($items) {
            $items = $items || that.getItems(1);
            var orders = [];

            $items.each(function() {
                var order = $(this).data(STR_ORDER);
                if(typeof order === 'number') {
                    orders.push(order);
                }
            });

            orders.sort(function(a, b) {
                return a - b;
            });

            var itemsCount = $items.length;
            while(orders.length < itemsCount) {
                orders.push(orders.length ? (orders[orders.length - 1] + 1) : 0);
            }

            if(isReverse) {
                orders.reverse();
            }

            $items.each(function(idx) {
                $(this).data(STR_ORDER, orders[idx]).attr('data-' + STR_ORDER, orders[idx]);
            });
        };

        markOrders();

        $root.droppable({
            handle   : options.trigger,
            target   : selector,
            selector : selector,
            container: $root,
            always   : options.always,
            flex     : true,
            before   : options.before,
            start: function(e) {
                if(dragCssClass) e.element.addClass(dragCssClass);
                that.trigger('start');
            },
            drag: function(e) {
                $root.addClass(sortingClass);
                if(e.isIn) {
                    var $ele        = e.element,
                        $target     = e.target,
                        eleOrder    = $ele.data(STR_ORDER),
                        targetOrder = $target.data(STR_ORDER);
                    if(eleOrder == targetOrder) return;
                    else if(eleOrder > targetOrder) {
                        $target[isReverse ? 'after' : 'before']($ele);
                    } else {
                        $target[isReverse ? 'before' : 'after']($ele);
                    }
                    var $items = that.getItems(1);
                    markOrders($items);
                    that.trigger(STR_ORDER, {
                        list: $items,
                        element: $ele
                    });
                }
            },
            finish: function(e) {
                if(dragCssClass && e.element) e.element.removeClass(dragCssClass);
                $root.removeClass(sortingClass);
                that.trigger('finish', {
                    list: that.getItems(1),
                    element: e.element
                });
            }
        });
    };

    Sortable.prototype.destroy = function() {
        that.$.droppable('destroy');
    };

    Sortable.prototype.getItems = function(onlyElements) {
        var $items = this.$.children(this.options.selector).not('.drag-shadow');
        if(!onlyElements) {
            return $items.map(function() {
                var $item = $(this);
                return {
                    item: $item,
                    order: $item.data('order')
                };
            });
        }
        return $items;
    };

    Sortable.prototype.trigger = function(name, params) {
        return $.zui.callEvent(this.options[name], params, this);
    };

    $.fn.sortable = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(NAME);
            var options = typeof option == 'object' && option;

            if(!data) $this.data(NAME, (data = new Sortable(this, options)));
            else if(typeof option == 'object') data.reset();

            if(typeof option == 'string') data[option]();
        });
    };

    $.fn.sortable.Constructor = Sortable;
}(jQuery, window, document);

