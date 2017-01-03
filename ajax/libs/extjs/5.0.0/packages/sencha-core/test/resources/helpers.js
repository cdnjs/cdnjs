Ext.testHelper = {
    defaultTarget: document.createElement('div'),

    createTouchList: function(touches) {
        var touchList = [],
            i, ln, touch;

        for (i = 0, ln = touches.length; i < ln; i++) {
            touch = touches[i];

            touchList.push(this.createTouch(touch));
        }

        return touchList;
    },

    createTouch: function(touch) {
        return Ext.merge({
            target: this.defaultTarget,
            timeStamp: Ext.Date.now(),
            time: Ext.Date.now(),
            pageX: 0,
            pageY: 0,
            identifier: 0,
            point: new Ext.util.Point(touch.pageX || 0, touch.pageY || 0)
        }, touch || {});
    },

    createTouchEvent: function(event) {
        var touchEvent = Ext.merge({
            type: 'touchstart',
            target: this.defaultTarget,
            timeStamp: Ext.Date.now(),
            time: Ext.Date.now(),
            touches: [],
            changedTouches: [],
            targetTouches: [],
            pageX: 0,
            pageY: 0
        }, event || {});

        touchEvent.touches = this.createTouchList(touchEvent.touches);
        touchEvent.changedTouches = this.createTouchList(touchEvent.changedTouches);
        touchEvent.targetTouches = this.createTouchList(touchEvent.targetTouches);

        return touchEvent;
    },

    createTouchEvents: function(events) {
        var ret = [],
            i, ln, event;

        for (i = 0, ln = events.length; i < ln; i++) {
            event = events[i];

            ret.push(this.createTouchEvent(event));
        }

        return ret;
    },

    recognize: function(recognizer, events) {
        var currentTouchesCount = 0,
            i, ln, e;

        events = this.createTouchEvents(events);

        mainLoop: for (i = 0, ln = events.length; i < ln; i++) {
            e = events[i];

            switch (e.type) {
                case 'touchstart':
                    var changedTouchesCount = e.changedTouches.length,
                        isStarted = currentTouchesCount > 0;

                    currentTouchesCount += changedTouchesCount;

                    if (!isStarted) {
                        if (recognizer.onStart(e) === false) {
                            break mainLoop;
                        }
                    }

                    if (recognizer.onTouchStart(e) === false) {
                        break mainLoop;
                    }

                    break;

                case 'touchmove':
                    if (recognizer.onTouchMove(e) === false) {
                        break mainLoop;
                    }
                    break;

                case 'touchend':
                    changedTouchesCount = e.changedTouches.length;

                    currentTouchesCount -= changedTouchesCount;

                    if (recognizer.onTouchEnd(e) === false) {
                        break mainLoop;
                    }

                    if (this.currentTouchesCount === 0) {
                        if (recognizer.onEnd(e) === false) {
                            break mainLoop;
                        }
                    }
                    break;
            }
        }

        return events;
    },

    events:  (Ext.supports.PointerEvents) ?
        {
            start: 'pointerdown',
            move: 'pointermove',
            end: 'pointerup',
            cancel: 'pointercancel'
        }
        : (Ext.supports.MSPointerEvents) ?
        {
            start: 'MSPointerDown',
            move: 'MSPointerMove',
            end: 'MSPointerUp',
            cancel: 'MSPointerCancel'
        }
        : (Ext.supports.TouchEvents) ?
        {
            start: 'touchstart',
            move: 'touchmove',
            end: 'touchend',
            cancel: 'touchcancel'
        }
        :
        {
            start: 'mousedown',
            move: 'mousemove',
            end: 'mouseup'
        },

    fireEvent: function(type, target, cfg) {
        var eventType = this.events[type],
            activeTouches = {},
            touch, id, touches;

        if (Ext.supports.PointerEvents || Ext.supports.MSPointerEvents) {
            jasmine.firePointerEvent(
                target,
                eventType,
                cfg.id,
                cfg.x,
                cfg.y,
                cfg.button || 0
            );
        } else if (Ext.supports.TouchEvents) {
            touch = activeTouches[cfg.id] = {
                identifier: cfg.id,
                pageX: cfg.x,
                pageY: cfg.y
            };

            if (eventType === 'touchend' || eventType === 'touchcancel') {
                delete activeTouches[cfg.id];
            }

            touches = [];

            for (id in activeTouches) {
                touches.push(activeTouches[id]);
            }

            jasmine.fireTouchEvent(
                target,
                eventType,
                touches,
                [touch]
            );
        } else {
            jasmine.fireMouseEvent(
                target,
                eventType,
                cfg.x,
                cfg.y,
                cfg.button ? cfg.button : 0
            );
        }
    },

    touchStart: function(target, cfg) {
        this.fireEvent('start', target, cfg);
    },

    touchMove: function(target, cfg) {
        this.fireEvent('move', target, cfg);
    },

    touchEnd: function(target, cfg) {
        this.fireEvent('end', target, cfg);
    },

    touchCancel: function(target, cfg) {
        this.fireEvent('cancel', target, cfg);
    }
};