/*!
 * ZUI: 排序 - v1.9.0 - 2019-03-04
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2019 cnezsoft.com; Licensed MIT
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

    Sortable.prototype.init = function() {
        var that         = this,
            $root        = that.$,
            options      = that.options,
            selector     = options.selector,
            containerSelector = options.containerSelector,
            sortingClass = options.sortingClass,
            dragCssClass = options.dragCssClass,
            targetSelector = options.targetSelector,
            isReverse    = options.reverse,
            orderChanged;

        var markOrders = function($items) {
            $items = $items || that.getItems(1);
            var itemsCount = $items.length;
            if (itemsCount) {
                $items.each(function(itemIndex) {
                    var itemOrder = isReverse ? itemsCount - itemIndex : itemIndex;
                    $(this).attr('data-' + STR_ORDER, itemOrder).data(STR_ORDER, itemOrder);
                });
            }
        };

        markOrders();

        $root.droppable({
            handle      : options.trigger,
            target      : targetSelector ? targetSelector : (containerSelector ? (selector + ',' + containerSelector) : selector),
            selector    : selector,
            container   : $root,
            always      : options.always,
            flex        : true,
            lazy        : options.lazy,
            canMoveHere : options.canMoveHere,
            dropToClass : options.dropToClass,
            before      : options.before,
            nested      : !!containerSelector,
            mouseButton : options.mouseButton,
            stopPropagation : options.stopPropagation,
            start: function(e) {
                if(dragCssClass) e.element.addClass(dragCssClass);
                orderChanged = false;
                that.trigger('start', e);
            },
            drag: function(e) {
                $root.addClass(sortingClass);
                if(e.isIn) {
                    var $ele        = e.element,
                        $target     = e.target,
                        isContainer = containerSelector && $target.is(containerSelector);

                    if (isContainer) {
                        if (!$target.children(selector).filter('.dragging').length) {
                            $target.append($ele);
                            var $items = that.getItems(1);
                            markOrders($items);
                            that.trigger(STR_ORDER, {
                                list: $items,
                                element: $ele
                            });
                        }
                        return;
                    }

                    var eleOrder    = $ele.data(STR_ORDER),
                        targetOrder = $target.data(STR_ORDER);
                    if(eleOrder === targetOrder) return markOrders($items);
                    else if(eleOrder > targetOrder) {
                        $target[isReverse ? 'after' : 'before']($ele);
                    } else {
                        $target[isReverse ? 'before' : 'after']($ele);
                    }
                    orderChanged = true;
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
                    list: that.getItems(),
                    element: e.element,
                    changed: orderChanged
                });
            }
        });
    };

    Sortable.prototype.destroy = function() {
        this.$.droppable('destroy');
        this.$.data(NAME, null);
    };

    Sortable.prototype.reset = function() {
        this.destroy();
        this.init();
    };

    Sortable.prototype.getItems = function(onlyElements) {
        var $items = this.$.find(this.options.selector).not('.drag-shadow');
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

