/*!
 * ZUI: 排序 - v1.5.0 - 2016-09-06
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2016 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: sortable.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


+ function($, window, document, Math) {
    'use strict';

    if(!$.fn.droppable) {
        console.error('Sortable requires droppable.js');
        return;
    }

    var Sortable = function(element, options) {
        this.$ = $(element);
        this.options = this.getOptions(options);

        this.init();
    };

    Sortable.DEFAULTS = {
        selector: 'li, div',
        dragCssClass: 'invisible'
    }; // default options

    Sortable.prototype.getOptions = function(options) {
        options = $.extend({}, Sortable.DEFAULTS, this.$.data(), options);
        return options;
    };

    Sortable.prototype.init = function() {
        this.bindEventToList(this.$.children(this.options.selector));
    };

    Sortable.prototype.reset = function() {
        var that = this,
            order = 0;
        var $list = this.$.children(this.options.selector).not('.drag-shadow');

        $list.each(function() {
            var $this = $(this);
            if($this.data('zui.droppable')) {
                $this.data('zui.droppable').options.target = $list;
                $this.droppable('reset');
            } else {
                that.bindEventToList($list);
                return false;
            }
        });
    };

    Sortable.prototype.bindEventToList = function($list) {
        var self = this.$,
            options = this.options;
        var isReverse = options.reverse;

        markOrders($list);
        $list.droppable({
            trigger: options.trigger,
            target: self.children(options.selector),
            container: self,
            always: options.always,
            flex: true,
            before: options.before,
            start: function(e) {
                if(options.dragCssClass) e.element.addClass(options.dragCssClass);
                $.zui.callEvent(options['start']);
            },
            drag: function(e) {
                self.addClass('sortable-sorting');
                if(e.isIn) {
                    var $ele = e.element,
                        $target = e.target;
                    var eleOrder = $ele.attr('data-order'),
                        targetOrder = $target.attr('data-order');
                    if(eleOrder == targetOrder) return;
                    else if(eleOrder > targetOrder) {
                        $target[isReverse ? 'after' : 'before']($ele);
                    } else {
                        $target[isReverse ? 'before' : 'after']($ele);
                    }
                    var list = self.children(options.selector).not('.drag-shadow');
                    markOrders(list);
                    $.zui.callEvent(options['order'], {
                        list: list,
                        element: $ele
                    });
                }
            },
            finish: function(e) {
                if(options.dragCssClass && e.element) e.element.removeClass(options.dragCssClass);
                $.zui.callEvent(options['finish'], {
                    list: self.children(options.selector),
                    element: e.element
                });
                self.removeClass('sortable-sorting');
            }
        });

        function markOrders(list) {
            var orders = [];
            list.each(function() {
                var thisOrder = $(this).data('order');
                if(typeof thisOrder === 'number') {
                    orders.push(thisOrder);
                }
            });
            orders.sort(function(a, b) {
                return a - b;
            });

            var listSize = list.length;
            while(orders.length < listSize) {
                orders.push(orders.length ? (orders[orders.length - 1] + 1) : 0);
            }

            if(isReverse) {
                orders.reverse();
            }

            var listIndex = 0
            list.each(function() {
                $(this).attr('data-order', orders[listIndex++]);
            });
        }
    };

    $.fn.sortable = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('zui.sortable');
            var options = typeof option == 'object' && option;

            if(!data) $this.data('zui.sortable', (data = new Sortable(this, options)));
            else if(typeof option == 'object') data.reset();

            if(typeof option == 'string') data[option]();
        })
    };

    $.fn.sortable.Constructor = Sortable;
}(jQuery, window, document, Math);

