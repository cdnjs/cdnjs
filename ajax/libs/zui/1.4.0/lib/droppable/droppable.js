/*!
 * ZUI - v1.4.0 - 2016-01-26
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2016 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: jquery.extensions.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, window) {
    'use strict';

    /* Check jquery */
    if(typeof($) === 'undefined') throw new Error('ZUI requires jQuery');

    // ZUI shared object
    if(!$.zui) $.zui = function(obj) {
        if($.isPlainObject(obj)) {
            $.extend($.zui, obj);
        }
    };

    var lastUuidAmend = 0;
    $.zui({
        uuid: function() {
            return(new Date()).getTime() * 1000 + (lastUuidAmend++) % 1000;
        },

        callEvent: function(func, event, proxy) {
            if($.isFunction(func)) {
                if(proxy !== undefined) {
                    func = $.proxy(func, proxy);
                }
                var result = func(event);
                if(event) event.result = result;
                return !(result !== undefined && (!result));
            }
            return 1;
        },

        clientLang: function() {
            var lang;
            var config = window.config;
            if(typeof(config) != 'undefined' && config.clientLang) {
                lang = config.clientLang;
            } else {
                var hl = $('html').attr('lang');
                lang = hl ? hl : (navigator.userLanguage || navigator.userLanguage || 'zh_cn');
            }
            return lang.replace('-', '_').toLowerCase();
        }
    });

    $.fn.callEvent = function(name, event, model) {
        var $this = $(this);
        var dotIndex = name.indexOf('.zui.');
        var shortName = name;
        if(dotIndex < 0 && model && model.name) {
            name += '.' + model.name;
        } else {
            shortName = name.substring(0, dotIndex);
        }
        var e = $.Event(name, event);

        if((model === undefined) && dotIndex > 0) {
            model = $this.data(name.substring(dotIndex + 1));
        }

        if(model && model.options) {
            var func = model.options[shortName];
            if($.isFunction(func)) {
                $.zui.callEvent(model.options[shortName], e, model);
            }
        }
        return e;
    };
}(jQuery, window));


/* ========================================================================
 * ZUI: droppable.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, document, Math) {
    'use strict';

    var Droppable = function(element, options) {
        this.$ = $(element);
        this.options = this.getOptions(options);

        this.init();
    };

    Droppable.DEFAULTS = {
        container: 'body',
        // flex: false,
        // nested: false,
        deviation: 5,
        sensorOffsetX: 0,
        sensorOffsetY: 0
    };

    Droppable.prototype.getOptions = function(options) {
        options = $.extend({}, Droppable.DEFAULTS, this.$.data(), options);
        return options;
    };

    Droppable.prototype.callEvent = function(name, params) {
        return $.zui.callEvent(this.options[name], params, this);
    };

    Droppable.prototype.init = function() {
        this.handleMouseEvents();
    };

    Droppable.prototype.handleMouseEvents = function() {
        var $e = this.$,
            self = this,
            setting = this.options,
            BEFORE = 'before';

        this.$triggerTarget = (setting.trigger ? ($.isFunction(setting.trigger) ? setting.trigger($e) : $e.find(setting.trigger)).first() : $e);

        this.$triggerTarget.on('mousedown', function(event) {
            if(setting.hasOwnProperty(BEFORE) && $.isFunction(setting[BEFORE])) {
                var isSure = setting[BEFORE]({
                    event: event,
                    element: $e
                });
                if(isSure !== undefined && (!isSure)) return;
            }

            var $targets = $.isFunction(setting.target) ? setting.target($e) : $(setting.target),
                target = null,
                shadow = null,
                $container = $(setting.container).first(),
                isIn = false,
                isSelf = true,
                oldCssPosition,
                startOffset = $e.offset(),
                startMouseOffset = {
                    left: event.pageX,
                    top: event.pageY
                };
            var containerOffset = $container.offset();
            var clickOffset = {
                left: startMouseOffset.left - startOffset.left,
                top: startMouseOffset.top - startOffset.top
            };
            var lastMouseOffset = {
                left: startMouseOffset.left,
                top: startMouseOffset.top
            };

            $e.addClass('drag-from');
            $(document).bind('mousemove', mouseMove).bind('mouseup', mouseUp);
            event.preventDefault();

            function mouseMove(event) {
                var mouseOffset = {
                    left: event.pageX,
                    top: event.pageY
                };

                // ignore small move
                if(Math.abs(mouseOffset.left - startMouseOffset.left) < setting.deviation && Math.abs(mouseOffset.top - startMouseOffset.top) < setting.deviation) return;

                if(shadow === null) // create shadow
                {
                    var cssPosition = $container.css('position');
                    if(cssPosition != 'absolute' && cssPosition != 'relative' && cssPosition != 'fixed') {
                        oldCssPosition = cssPosition;
                        $container.css('position', 'relative');
                    }

                    shadow = $e.clone().removeClass('drag-from').addClass('drag-shadow').css({
                        position: 'absolute',
                        width: $e.outerWidth(),
                        transition: 'none'
                    }).appendTo($container);
                    $e.addClass('dragging');

                    self.callEvent('start', {
                        event: event,
                        element: $e
                    });
                }

                var offset = {
                    left: mouseOffset.left - clickOffset.left,
                    top: mouseOffset.top - clickOffset.top
                };
                var position = {
                    left: offset.left - containerOffset.left,
                    top: offset.top - containerOffset.top
                };
                shadow.css(position);
                lastMouseOffset.left = mouseOffset.left;
                lastMouseOffset.top = mouseOffset.top;

                var isNew = false;
                isIn = false;

                if(!setting.flex) {
                    $targets.removeClass('drop-to');
                }

                var newTarget = null;
                $targets.each(function() {
                    var t = $(this);
                    var tPos = t.offset();
                    var tW = t.outerWidth(),
                        tH = t.outerHeight(),
                        tX = tPos.left + setting.sensorOffsetX,
                        tY = tPos.top + setting.sensorOffsetY;

                    if(mouseOffset.left > tX && mouseOffset.top > tY && mouseOffset.left < (tX + tW) && mouseOffset.top < (tY + tH)) {
                        if(newTarget) newTarget.removeClass('drop-to');
                        newTarget = t;
                        if(!setting.nested) return false;
                    }
                });

                if(newTarget) {
                    isIn = true;
                    var id = newTarget.data('id');
                    if($e.data('id') != id) isSelf = false;
                    if(target === null || (target.data('id') !== id && (!isSelf))) isNew = true;
                    target = newTarget;
                    if(setting.flex) {
                        $targets.removeClass('drop-to');
                    }
                    target.addClass('drop-to');
                }

                if(!setting.flex) {
                    $e.toggleClass('drop-in', isIn);
                    shadow.toggleClass('drop-in', isIn);
                } else if(target !== null && target.length) {
                    isIn = true;
                }

                self.callEvent('drag', {
                    event: event,
                    isIn: isIn,
                    target: target,
                    element: $e,
                    isNew: isNew,
                    selfTarget: isSelf,
                    clickOffset: clickOffset,
                    offset: offset,
                    position: {
                        left: offset.left - containerOffset.left,
                        top: offset.top - containerOffset.top
                    },
                    mouseOffset: mouseOffset
                });
                event.preventDefault();
            }

            function mouseUp(event) {
                if(oldCssPosition) {
                    $container.css('position', oldCssPosition);
                }

                if(shadow === null) {
                    $e.removeClass('drag-from');
                    $(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
                    self.callEvent('always', {
                        event: event,
                        cancel: true
                    });
                    return;
                }

                if(!isIn) target = null;
                var isSure = true,
                    mouseOffset = {
                        left: event.pageX,
                        top: event.pageY
                    };
                var offset = {
                    left: mouseOffset.left - clickOffset.left,
                    top: mouseOffset.top - clickOffset.top
                };
                var moveOffset = {
                    left: mouseOffset.left - lastMouseOffset.left,
                    top: mouseOffset.top - lastMouseOffset.top
                };
                lastMouseOffset.left = mouseOffset.left;
                lastMouseOffset.top = mouseOffset.top;
                var eventOptions = {
                    event: event,
                    isIn: isIn,
                    target: target,
                    element: $e,
                    isNew: (!isSelf) && target !== null,
                    selfTarget: isSelf,
                    offset: offset,
                    mouseOffset: mouseOffset,
                    position: {
                        left: offset.left - containerOffset.left,
                        top: offset.top - containerOffset.top
                    },
                    lastMouseOffset: lastMouseOffset,
                    moveOffset: moveOffset
                };

                isSure = self.callEvent('beforeDrop', eventOptions);

                if(isSure && isIn) {
                    self.callEvent('drop', eventOptions);
                }

                $(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
                $targets.removeClass('drop-to');
                $e.removeClass('dragging').removeClass('drag-from');
                shadow.remove();

                self.callEvent('finish', eventOptions);
                self.callEvent('always', eventOptions);

                event.preventDefault();
            }
        });

    };

    Droppable.prototype.reset = function() {
        this.$triggerTarget.off('mousedown');
        this.handleMouseEvents();
    };

    $.fn.droppable = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('zui.droppable');
            var options = typeof option == 'object' && option;

            if(!data) $this.data('zui.droppable', (data = new Droppable(this, options)));

            if(typeof option == 'string') data[option]();
        });
    };

    $.fn.droppable.Constructor = Droppable;
}(jQuery, document, Math));

