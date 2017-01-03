/**
 * @extends Ext.ux.event.Driver
 * Event recorder.
 */
Ext.define('Ext.ux.event.Recorder', function (Recorder) {
    function apply () {
        var a = arguments,
            n = a.length,
            obj = { kind: 'other' },
            i;

        for (i = 0; i < n; ++i) {
            Ext.apply(obj, arguments[i]);
        }

        if (obj.alt && !obj.event) {
            obj.event = obj.alt;
        }
        return obj;
    }

    function key (extra) {
        return apply({
                kind: 'keyboard',
                modKeys: true,
                key: true
            }, extra);
    }

    function mouse (extra) {
        return apply({
                kind: 'mouse',
                button: true,
                modKeys: true,
                xy: true
            }, extra);
    }

    var eventsToRecord = {
            keydown: key(),
            keypress: key(),
            keyup: key(),

            dragmove: mouse({ alt: 'mousemove', pageCoords: true, whileDrag: true }),
            mousemove: mouse({ pageCoords: true }),
            mouseover: mouse(),
            mouseout: mouse(),
            click: mouse(),
            wheel: mouse({ wheel: true }),
            mousedown: mouse({ press: true }),
            mouseup: mouse({ release: true }),

            scroll: apply({ listen: false }),
            focus: apply(),
            blur: apply()
        };

    for (var key in eventsToRecord) {
        if (!eventsToRecord[key].event) {
            eventsToRecord[key].event = key;
        }
    }

    eventsToRecord.wheel.event = null; // must detect later

    return {
        extend: 'Ext.ux.event.Driver',

        /**
         * @event add
         * Fires when an event is added to the recording.
         * @param {Ext.ux.event.Recorder} this
         * @param {Object} eventDescriptor The event descriptor.
         */

        /**
         * @event coalesce
         * Fires when an event is coalesced. This edits the tail of the recorded
         * event list.
         * @param {Ext.ux.event.Recorder} this
         * @param {Object} eventDescriptor The event descriptor that was coalesced.
         */

        eventsToRecord: eventsToRecord,

        ignoreIdRegEx: /ext-gen(?:\d+)/,

        inputRe: /^(input|textarea)$/i,

        constructor: function (config) {
            var me = this,
                events = config && config.eventsToRecord;

            if (events) {
                me.eventsToRecord = Ext.apply(Ext.apply({}, me.eventsToRecord), // duplicate
                                        events); // and merge
                delete config.eventsToRecord; // don't smash
            }

            me.callParent(arguments);

            me.clear();
            me.modKeys = [];
            me.attachTo = me.attachTo || window;
        },

        clear: function () {
            this.eventsRecorded = [];
        },

        listenToEvent: function (event) {
            var me = this,
                el = me.attachTo.document.body,
                fn = function () {
                    return me.onEvent.apply(me, arguments);
                },
                cleaner = {};

            if (el.attachEvent && el.ownerDocument.documentMode < 10) {
                event = 'on' + event;
                el.attachEvent(event, fn);

                cleaner.destroy = function () {
                    if (fn) {
                        el.detachEvent(event, fn);
                        fn = null;
                    }
                };
            } else {
                el.addEventListener(event, fn, true);

                cleaner.destroy = function () {
                    if (fn) {
                        el.removeEventListener(event, fn, true);
                        fn = null;
                    }
                };
            }

            return cleaner;
        },

        coalesce: function (rec, ev) {
            var me = this,
                events = me.eventsRecorded,
                length = events.length,
                tail = length && events[length-1],
                tail2 = (length > 1) && events[length-2],
                tail3 = (length > 2) && events[length-3];

            if (!tail) {
                return false;
            }

            if (rec.type === 'mousemove') {
                if (tail.type === 'mousemove' && rec.ts - tail.ts < 200) {
                    rec.ts = tail.ts;
                    events[length-1] = rec;
                    return true;
                }
            } else if (rec.type === 'click') {
                if (tail2 && tail.type === 'mouseup' && tail2.type === 'mousedown') {
                    if (rec.button == tail.button && rec.button == tail2.button &&
                            rec.target == tail.target && rec.target == tail2.target &&
                            me.samePt(rec, tail) && me.samePt(rec, tail2) ) {
                        events.pop(); // remove mouseup
                        tail2.type = 'mduclick';
                        return true;
                    }
                }
            } else if (rec.type === 'keyup') {
                // tail3 = { type: "type",     text: "..." },
                // tail2 = { type: "keydown",  charCode: 65, keyCode: 65 },
                // tail  = { type: "keypress", charCode: 97, keyCode: 97 },
                // rec   = { type: "keyup",    charCode: 65, keyCode: 65 },
                if (tail2 && tail.type === 'keypress' && tail2.type === 'keydown') {
                    if (rec.target === tail.target && rec.target === tail2.target) {
                        events.pop(); // remove keypress
                        tail2.type = 'type';
                        tail2.text = String.fromCharCode(tail.charCode);
                        delete tail2.charCode;
                        delete tail2.keyCode;

                        if (tail3 && tail3.type === 'type') {
                            if (tail3.text && tail3.target === tail2.target) {
                                tail3.text += tail2.text;
                                events.pop();
                            }
                        }
                        return true;
                    }
                }
                // tail = { type: "keydown", charCode: 40, keyCode: 40 },
                // rec  = { type: "keyup",   charCode: 40, keyCode: 40 },
                else if (me.completeKeyStroke(tail, rec)) {
                    tail.type = 'type';
                    me.completeSpecialKeyStroke(ev.target, tail, rec);
                    return true;
                }
                // tail2 = { type: "keydown", charCode: 40, keyCode: 40 },
                // tail  = { type: "scroll",  ... },
                // rec   = { type: "keyup",   charCode: 40, keyCode: 40 },
                else if (tail.type === 'scroll' && me.completeKeyStroke(tail2, rec)) {
                    tail2.type = 'type';
                    me.completeSpecialKeyStroke(ev.target, tail2, rec);
                    // swap the order of type and scroll events
                    events.pop();
                    events.pop();
                    events.push(tail, tail2);
                    return true;
                }
            }

            return false;
        },

        completeKeyStroke: function (down, up) {
            if (down && down.type === 'keydown' && down.keyCode === up.keyCode) {
                delete down.charCode;
                return true;
            }
            return false;
        },

        completeSpecialKeyStroke: function (target, down, up) {
            var key = this.specialKeysByCode[up.keyCode];

            if (key && this.inputRe.test(target.tagName)) {
                // home,end,arrow keys + shift get crazy, so encode selection/caret
                delete down.keyCode;
                down.key = key;
                down.selection = this.getTextSelection(target);

                if (down.selection[0] === down.selection[1]) {
                    down.caret = down.selection[0];
                    delete down.selection;
                }

                return true;
            }

            return false;
        },

        getElementXPath: function (el) {
            var me = this,
                good = false,
                xpath = [],
                count,
                sibling,
                t,
                tag;

            for (t = el; t; t = t.parentNode) {
                if (t == me.attachTo.document.body) {
                    xpath.unshift('~');
                    good = true;
                    break;
                }
                if (t.id && !me.ignoreIdRegEx.test(t.id)) {
                    xpath.unshift('#' + t.id);
                    good = true;
                    break;
                }

                for (count = 1, sibling = t; !!(sibling = sibling.previousSibling); ) {
                    if (sibling.tagName == t.tagName) {
                        ++count;
                    }
                }

                tag = t.tagName.toLowerCase();
                if (count < 2) {
                    xpath.unshift(tag);
                } else {
                    xpath.unshift(tag + '[' + count + ']');
                }
            }

            return good ? xpath.join('/') : null;
        },

        getRecordedEvents: function () {
            return this.eventsRecorded;
        },

        onEvent: function (ev) {
            var me = this,
                e = Ext.EventObject.setEvent(ev),
                info = me.eventsToRecord[e.type],
                root,
                modKeys, elXY,
                rec = {
                    type: e.type,
                    ts: me.getTimestamp(),
                    target: me.getElementXPath(e.target)
                },
                xy;

            if (!info || !rec.target) {
                return;
            }
            root = e.target.ownerDocument;
            root = root.defaultView || root.parentWindow; // Standards || IE
            if (root !== me.attachTo) {
                return;
            }

            if (me.eventsToRecord.scroll) {
                me.syncScroll(e.target);
            }
            if (info.xy) {
                xy = e.getXY();

                if (info.pageCoords || !rec.target) {
                    rec.px = xy[0];
                    rec.py = xy[1];
                } else {
                    elXY = Ext.fly(e.getTarget()).getXY();
                    xy[0] -= elXY[0];
                    xy[1] -= elXY[1];

                    rec.x = xy[0];
                    rec.y = xy[1];
                }
            }

            if (info.button) {
                if ('buttons' in ev) {
                    rec.button = ev.buttons; // LEFT=1, RIGHT=2, MIDDLE=4, etc.
                } else if (ev.which == null) {
                    // IE case
                    rec.button = (ev.button < 2) ? 1 : ((ev.button == 4) ? 4 : 2);
                } else if (ev.which) {
                    // All others
                    rec.button = (ev.which < 2) ? 1 : ((ev.which == 2) ? 4 : 2);
                } else {
                    rec.button = 0;
                }

                if (!rec.button && info.whileDrag) {
                    return;
                }
            }

            if (info.wheel) {
                rec.type = 'wheel';

                if (info.event === 'wheel') {
                    // Current FireFox (technically IE9+ if we use addEventListener but
                    // checking document.onwheel does not detect this)
                    rec.dx = ev.deltaX;
                    rec.dy = ev.deltaY;
                } else if (typeof ev.wheelDeltaX === 'number') {
                    // new WebKit has both X & Y
                    rec.dx = -1/40 * ev.wheelDeltaX;
                    rec.dy = -1/40 * ev.wheelDeltaY;
                } else if (ev.wheelDelta) {
                    // old WebKit and IE
                    rec.dy = -1/40 * ev.wheelDelta;
                } else if (ev.detail) {
                    // Old Gecko
                    rec.dy = ev.detail;
                }
            }

            if (info.modKeys) {
                me.modKeys[0] = e.altKey ? 'A' : '';
                me.modKeys[1] = e.ctrlKey ? 'C' : '';
                me.modKeys[2] = e.metaKey ? 'M' : '';
                me.modKeys[3] = e.shiftKey ? 'S' : '';

                modKeys = me.modKeys.join('');
                if (modKeys) {
                    rec.modKeys = modKeys;
                }
            }

            if (info.key) {
                rec.charCode = e.getCharCode();
                rec.keyCode = e.getKey();
            }

            if (me.coalesce(rec, e)) {
                me.fireEvent('coalesce', me, rec);
            } else {
                me.eventsRecorded.push(rec);
                me.fireEvent('add', me, rec);
            }
        },

        onStart: function () {
            var me = this,
                ddm = me.attachTo.Ext.dd.DragDropManager,
                evproto = me.attachTo.Ext.EventObjectImpl.prototype,
                special = [];

            // FireFox does not support the 'mousewheel' event but does support the
            // 'wheel' event instead.
            Recorder.prototype.eventsToRecord.wheel.event =
                    ('onwheel' in me.attachTo.document) ? 'wheel' : 'mousewheel';

            me.listeners = [];
            Ext.Object.each(me.eventsToRecord, function (name, value) {
                if (value && value.listen !== false) {
                    if (!value.event) {
                        value.event = name;
                    }
                    if (value.alt && value.alt !== name) {
                        // The 'drag' event is just mousemove while buttons are pressed,
                        // so if there is a mousemove entry as well, ignore the drag
                        if (!me.eventsToRecord[value.alt]) {
                            special.push(value);
                        }
                    } else {
                        me.listeners.push(me.listenToEvent(value.event));
                    }
                }
            });

            Ext.each(special, function (info) {
                me.eventsToRecord[info.alt] = info;
                me.listeners.push(me.listenToEvent(info.alt));
            });

            me.ddmStopEvent = ddm.stopEvent;
            ddm.stopEvent = Ext.Function.createSequence(ddm.stopEvent, function (e) {
                me.onEvent(e);
            });
            me.evStopEvent = evproto.stopEvent;
            evproto.stopEvent = Ext.Function.createSequence(evproto.stopEvent, function () {
                me.onEvent(this);
            });
        },

        onStop: function () {
            var me = this;

            Ext.destroy(me.listeners);
            me.listeners = null;

            me.attachTo.Ext.dd.DragDropManager.stopEvent = me.ddmStopEvent;
            me.attachTo.Ext.EventObjectImpl.prototype.stopEvent = me.evStopEvent;
        },

        samePt: function (pt1, pt2) {
            return pt1.x == pt2.x && pt1.y == pt2.y;
        },

        syncScroll: function (el) {
            var me = this,
                ts = me.getTimestamp(),
                oldX, oldY, x, y, scrolled, rec;

            for (var p = el; p; p = p.parentNode) {
                oldX = p.$lastScrollLeft;
                oldY = p.$lastScrollTop;
                x = p.scrollLeft;
                y = p.scrollTop;
                scrolled = false;

                if (oldX !== x) {
                    if (x) {
                        scrolled = true;
                    }
                    p.$lastScrollLeft = x;
                }
                if (oldY !== y) {
                    if (y) {
                        scrolled = true;
                    }
                    p.$lastScrollTop = y;
                }

                if (scrolled) {
                    //console.log('scroll x:' + x + ' y:' + y, p);
                    me.eventsRecorded.push(rec = {
                        type: 'scroll',
                        target: me.getElementXPath(p),
                        ts: ts,
                        pos: [ x, y ]
                    });
                    me.fireEvent('add', me, rec);
                }

                if (p.tagName === 'BODY') {
                    break;
                }
            }
        }
    };
});
