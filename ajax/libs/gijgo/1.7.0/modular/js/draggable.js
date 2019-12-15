/*
 * Gijgo Draggable v1.7.0
 * http://gijgo.com/draggable
 *
 * Copyright 2014, 2017 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery */
/**  */gj.draggable = {
    plugins: {}
};

gj.draggable.config = {
    base: {
        /** If specified, restricts dragging from starting unless the mousedown occurs on the specified element.
         * Only elements that descend from the draggable element are permitted.         */        handle: undefined,

        /** If set to false, restricts dragging on vertical direction.         */        vertical: true,

        /** If set to false, restricts dragging on horizontal direction.         */        horizontal: true
    }
};

gj.draggable.methods = {
    init: function (jsConfig) {
        var $handleEl, $dragEl = this;

        gj.widget.prototype.init.call(this, jsConfig, 'draggable');
        $dragEl.attr('data-draggable', 'true');

        $handleEl = gj.draggable.methods.getHandleElement($dragEl);

        $handleEl.on('touchstart mousedown', function (e) {
            $dragEl.attr('data-draggable-dragging', true);
            $dragEl.removeAttr('data-draggable-x').removeAttr('data-draggable-y');
            $dragEl.css('position', 'absolute');
            gj.documentManager.subscribeForEvent('touchmove', $dragEl.data('guid'), gj.draggable.methods.createMoveHandler($dragEl));
            gj.documentManager.subscribeForEvent('mousemove', $dragEl.data('guid'), gj.draggable.methods.createMoveHandler($dragEl));
        });

        gj.documentManager.subscribeForEvent('mouseup', $dragEl.data('guid'), gj.draggable.methods.createUpHandler($dragEl));
        gj.documentManager.subscribeForEvent('touchend', $dragEl.data('guid'), gj.draggable.methods.createUpHandler($dragEl));
        gj.documentManager.subscribeForEvent('touchcancel', $dragEl.data('guid'), gj.draggable.methods.createUpHandler($dragEl));

        return $dragEl;
    },

    getHandleElement: function ($dragEl) {
        var $handle = $dragEl.data('handle');
        return ($handle && $handle.length) ? $handle : $dragEl;
    },

    createUpHandler: function ($dragEl) {
        return function (e) {
            if ($dragEl.attr('data-draggable-dragging') === 'true') {
                $dragEl.attr('data-draggable-dragging', false);
                gj.documentManager.unsubscribeForEvent('mousemove', $dragEl.data('guid'));
                gj.documentManager.unsubscribeForEvent('touchmove', $dragEl.data('guid'));
                gj.draggable.events.stop($dragEl, { left: $dragEl.mouseX(e), top: $dragEl.mouseY(e) });
            }
        };
    },

    createMoveHandler: function ($dragEl) {
        return function (e) {
            var x, y, offsetX, offsetY, prevX, prevY;
            if ($dragEl.attr('data-draggable-dragging') === 'true') {
                x = $dragEl.mouseX(e);
                y = $dragEl.mouseY(e);
                prevX = $dragEl.attr('data-draggable-x');
                prevY = $dragEl.attr('data-draggable-y');
                if (prevX && prevY) {                
                    offsetX = $dragEl.data('horizontal') ? x - parseInt(prevX, 10) : 0;
                    offsetY = $dragEl.data('vertical') ? y - parseInt(prevY, 10) : 0;
                    if (false !== gj.draggable.events.drag($dragEl, offsetX, offsetY, x, y)) {
                        gj.draggable.methods.move($dragEl, offsetX, offsetY);
                    }
                } else {
                    gj.draggable.events.start($dragEl, x, y);
                }
                $dragEl.attr('data-draggable-x', x);
                $dragEl.attr('data-draggable-y', y);
            }
        }
    },

    move: function ($dragEl, offsetX, offsetY) {
        var target = $dragEl.get(0),
            top = target.style.top ? parseInt(target.style.top) : $dragEl.position().top,
            left = target.style.left ? parseInt(target.style.left) : $dragEl.position().left;
        target.style.top = (top + offsetY) + 'px';
        target.style.left = (left + offsetX) + 'px';
    },

    destroy: function ($dragEl) {
        if ($dragEl.attr('data-draggable') === 'true') {
            gj.documentManager.unsubscribeForEvent('mouseup', $dragEl.data('guid'));
            $dragEl.removeData();
            $dragEl.removeAttr('data-guid');
            $dragEl.removeAttr('data-draggable');
            $dragEl.off('drag').off('start').off('stop');
            gj.draggable.methods.getHandleElement($dragEl).off('mousedown');
        }
        return $dragEl;
    }
};

gj.draggable.events = {
    /**
     * Triggered while the mouse is moved during the dragging, immediately before the current move happens.
     *     */    drag: function ($dragEl, offsetX, offsetY, mouseX, mouseY) {
        return $dragEl.triggerHandler('drag', [{ top: offsetY, left: offsetX }, { top: mouseY, left: mouseX }]);
    },

    /**
     * Triggered when dragging starts.
     *     */    start: function ($dragEl, mouseX, mouseY) {
        $dragEl.triggerHandler('start', [{ top: mouseY, left: mouseX }]);
    },

    /**
     * Triggered when dragging stops.
     *     */    stop: function ($dragEl, mousePosition) {
        $dragEl.triggerHandler('stop', [mousePosition]);
    }
};

gj.draggable.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.draggable.methods;

    if (!$element.destroy) {
        /** Remove draggable functionality from the element.         */        self.destroy = function () {
            return methods.destroy(this);
        };
    }

    $.extend($element, self);
    if ('true' !== $element.attr('data-draggable')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.draggable.widget.prototype = new gj.widget();
gj.draggable.widget.constructor = gj.draggable.widget;

(function ($) {
    $.fn.draggable = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.draggable.widget(this, method);
            } else {
                $widget = new gj.draggable.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
