/*!
 * ZUI: 拖拽选择 - v1.10.0 - 2021-11-04
 * http://openzui.com
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2021 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: selectable.js [1.5.0+]
 * http://openzui.com
 * ========================================================================
 * Copyright (c) 2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($) {
    'use strict';

    var name = 'zui.selectable'; // module name

    // The selectable modal class
    var Selectable = function(element, options) {
        this.name = name;
        this.$ = $(element);
        this.id = $.zui.uuid();
        this.selectOrder = 1;
        this.selections = {};

        this.getOptions(options);
        this._init();
    };

    var isPointInner = function(x, y, a) {
        return x >= a.left && x <= (a.left + a.width) && y >= a.top && y <= (a.top + a.height);
    };

    var isIntersectArea = function(a, b) {
        var x1 = Math.max(a.left, b.left),
            y1 = Math.max(a.top, b.top),
            x2 = Math.min(a.left + a.width, b.left + b.width),
            y2 = Math.min(a.top + a.height, b.top + b.height);

        return isPointInner(x1, y1, a) && isPointInner(x2, y2, a) && isPointInner(x1, y1, b) && isPointInner(x2, y2, b);
    };

    // default options
    Selectable.DEFAULTS = {
        selector: 'li,tr,div',
        trigger: '',
        selectClass: 'active',
        rangeStyle: {
            border: '1px solid ' + ($.zui.colorset ? $.zui.colorset.primary : '#3280fc'),
            backgroundColor: $.zui.colorset ? (new $.zui.Color($.zui.colorset.primary).fade(20).toCssStr()) : 'rgba(50, 128, 252, 0.2)'
        },
        clickBehavior: 'toggle',
        ignoreVal: 3,
        listenClick: true
        // mouseButton: -1 // 0, 1, 2, -1, all, left,  right, middle
    };

    // Get and init options
    Selectable.prototype.getOptions = function(options) {
        this.options = $.extend({}, Selectable.DEFAULTS, this.$.data(), options);
    };

    Selectable.prototype.select = function(elementOrid) {
        this.toggle(elementOrid, true);
    };

    Selectable.prototype.unselect = function(elementOrid) {
        this.toggle(elementOrid, false);
    };

    Selectable.prototype.toggle = function(elementOrid, isSelect, handle) {
        var $element, id, selector = this.options.selector, that = this;
        if(elementOrid === undefined) {
            this.$.find(selector).each(function() {
                that.toggle(this, isSelect);
            });
            return;
        } else if(typeof elementOrid === 'object') {
            $element = $(elementOrid).closest(selector);
            id = $element.data('id');
        } else {
            id = elementOrid;
            $element = that.$.find('.slectable-item[data-id="' + id + '"]');
        }
        if($element && $element.length) {
            if(!id) {
                id = $.zui.uuid();
                $element.attr('data-id', id);
            }
            if(isSelect === undefined || isSelect === null) {
                isSelect = !that.selections[id];
            }
            if(!!isSelect !== !!that.selections[id]) {
                var handleResult;
                if(typeof handle === 'function') {
                    handleResult = handle(isSelect);
                }
                if(handleResult !== true) {
                    that.selections[id] = isSelect ? that.selectOrder++ : false;
                    that.callEvent(isSelect ? 'select' : 'unselect', {id: id, selections: that.selections, target: $element, selected: that.getSelectedArray()}, that);
                }
            }
            if (that.options.selectClass) {
                $element.toggleClass(that.options.selectClass, isSelect);
            }
        }
    };

    Selectable.prototype.getSelectedArray = function() {
        var selected = [];
        $.each(this.selections, function(thisId, thisIsSelected) {
            if(thisIsSelected) selected.push(thisId);
        });
        return selected;
    };

    Selectable.prototype.syncSelectionsFromClass = function() {
        var that = this;
        var $children = that.$children = that.$.find(that.options.selector);
        that.selections = {};
        $children.each(function() {
            var $item = $(this);
            that.selections[$item.data('id')] = $item.hasClass(that.options.selectClass);
        });
    };

    Selectable.prototype._init = function() {
        var options = this.options, that = this;
        var ignoreVal = options.ignoreVal;
        var isIgnoreMove = true;
        var eventNamespace = '.' + this.name + '.' + this.id;
        var startX, startY, $range, range, x, y, checkRangeCall;
        var checkFunc = typeof options.checkFunc === 'function' ? options.checkFunc : null;
        var rangeFunc = typeof options.rangeFunc === 'function' ? options.rangeFunc : null;
        var isMouseDown    = false;
        var mouseDownBackEventCall = null;
        var mouseDownEventName = 'mousedown' + eventNamespace;

        var checkRange = function() {
            if(!range) return;
            that.$children.each(function() {
                var $item = $(this);
                var offset = $item.offset();
                offset.width = $item.outerWidth();
                offset.height = $item.outerHeight();
                var isIntersect = rangeFunc ? rangeFunc.call(this, range, offset) : isIntersectArea(range, offset);
                if(checkFunc) {
                    var result = checkFunc.call(that, {
                        intersect: isIntersect,
                        target: $item,
                        range: range,
                        targetRange: offset
                    });
                    if(result === true) {
                        that.select($item);
                    } else if(result === false) {
                        that.unselect($item);
                    }
                } else {
                    if(isIntersect) {
                        that.select($item);
                    } else if(!that.multiKey) {
                        that.unselect($item);
                    }
                }
            });
        };

        var mousemove = function(e) {
            if(!isMouseDown) return;
            x = e.pageX;
            y = e.pageY;
            range = {
                width: Math.abs(x - startX),
                height: Math.abs(y - startY),
                left: x > startX ? startX : x,
                top: y > startY ? startY : y
            };

            if(isIgnoreMove && range.width < ignoreVal && range.height < ignoreVal) return;
            if(!$range) {
                $range = $('.selectable-range[data-id="' + that.id + '"]');
                if(!$range.length) {
                    $range = $('<div class="selectable-range" data-id="' + that.id + '"></div>')
                        .css($.extend({
                            zIndex: 1060,
                            position: 'absolute',
                            top: startX,
                            left: startY,
                            pointerEvents: 'none',
                        }, that.options.rangeStyle))
                        .appendTo($('body'));
                }
            }
            $range.css(range);
            clearTimeout(checkRangeCall);
            checkRangeCall = setTimeout(checkRange, 10);
            isIgnoreMove = false;
        };

        var mouseup = function(e) {
            $(document).off(eventNamespace);
            clearTimeout(mouseDownBackEventCall);
            if(!isMouseDown) return;
            isMouseDown = false;
            if($range) $range.remove();
            if(!isIgnoreMove)
            {
                if(range) {
                    clearTimeout(checkRangeCall);
                    checkRange();
                    range = null;
                }
            }
            that.callEvent('finish', {selections: that.selections, selected: that.getSelectedArray()});
            e.preventDefault();
        };

        var mousedown = function(e) {
            if(isMouseDown) {
                return mouseup(e);
            }

            var mouseButton = $.zui.getMouseButtonCode(options.mouseButton);
            if(mouseButton > -1 && e.button !== mouseButton) {
                return;
            }

            if(that.altKey || e.which === 3 || that.callEvent('start', e) === false) {
                return;
            }

            var $children = that.$children = that.$.find(options.selector);
            $children.addClass('slectable-item');

            var clickBehavior = that.multiKey ? 'multi' : options.clickBehavior;
            if(clickBehavior === 'single') {
                that.unselect();
            }
            if (options.listenClick) {
                if(clickBehavior === 'multi') {
                    that.toggle(e.target);
                } else if(clickBehavior === 'single') {
                    that.select(e.target);
                } else if(clickBehavior === 'toggle') {
                    that.toggle(e.target, null, function(isSelect) {
                        that.unselect();
                    });
                }
            }

            if(that.callEvent('startDrag', e) === false) {
                that.callEvent('finish', {selections: that.selections, selected: that.getSelectedArray()});
                return;
            }

            startX = e.pageX;
            startY = e.pageY;

            $range = null;
            isIgnoreMove = true;
            isMouseDown = true;

            $(document).on('mousemove' + eventNamespace, mousemove).on('mouseup' + eventNamespace, mouseup);
            mouseDownBackEventCall = setTimeout(function() {
                $(document).on(mouseDownEventName, mouseup);
            }, 10);
            e.preventDefault();
        };

        var $container = options.container && options.container !== 'default' ? $(options.container) : this.$;
        if(options.trigger) {
            $container.on(mouseDownEventName, options.trigger, mousedown);
        } else {
            $container.on(mouseDownEventName, mousedown);
        }

        $(document).on('keydown', function(e) {
            var code = e.keyCode;
            if(code === 17 || code == 91) that.multiKey = code;
            else if(code === 18) that.altKey = true;
        }).on('keyup', function(e) {
            that.multiKey = false;
            that.altKey = false;
        });
    };

    // Call event helper
    Selectable.prototype.callEvent = function(name, params) {
        var event = $.Event(name + '.' + this.name);
        this.$.trigger(event, params);
        var result = event.result;
        var callback = this.options[name];
        if(typeof callback === 'function') {
            result = callback.apply(this, Array.isArray(params) ? params : [params]);
        }
        return result;
    };

    // Extense jquery element
    $.fn.selectable = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(name);
            var options = typeof option == 'object' && option;

            if(!data) $this.data(name, (data = new Selectable(this, options)));

            if(typeof option == 'string') data[option]();
        });
    };

    $.fn.selectable.Constructor = Selectable;

    // Auto call selectable after document load complete
    $(function() {
        $('[data-ride="selectable"]').selectable();
    });
}(jQuery));
