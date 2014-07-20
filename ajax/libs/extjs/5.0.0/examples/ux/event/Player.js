/**
 * This class manages the playback of an array of "event descriptors". For details on the
 * contents of an "event descriptor", see {@link Ext.ux.event.Recorder}. The events recorded by the
 * {@link Ext.ux.event.Recorder} class are designed to serve as input for this class.
 * 
 * The simplest use of this class is to instantiate it with an {@link #eventQueue} and call
 * {@link #method-start}. Like so:
 *
 *      var player = Ext.create('Ext.ux.event.Player', {
 *          eventQueue: [ ... ],
 *          speed: 2,  // play at 2x speed
 *          listeners: {
 *              stop: function () {
 *                  player = null; // all done
 *              }
 *          }
 *      });
 *
 *      player.start();
 *
 * A more complex use would be to incorporate keyframe generation after playing certain
 * events.
 *
 *      var player = Ext.create('Ext.ux.event.Player', {
 *          eventQueue: [ ... ],
 *          keyFrameEvents: {
 *              click: true
 *          },
 *          listeners: {
 *              stop: function () {
 *                  // play has completed... probably time for another keyframe...
 *                  player = null;
 *              },
 *              keyframe: onKeyFrame
 *          }
 *      });
 *
 *      player.start();
 *
 * If a keyframe can be handled immediately (synchronously), the listener would be:
 *
 *      function onKeyFrame () {
 *          handleKeyFrame();
 *      }
 *
 *  If the keyframe event is always handled asynchronously, then the event listener is only
 *  a bit more:
 *
 *      function onKeyFrame (p, eventDescriptor) {
 *          eventDescriptor.defer(); // pause event playback...
 *
 *          handleKeyFrame(function () {
 *              eventDescriptor.finish(); // ...resume event playback
 *          });
 *      }
 *
 * Finally, if the keyframe could be either handled synchronously or asynchronously (perhaps
 * differently by browser), a slightly more complex listener is required.
 *
 *      function onKeyFrame (p, eventDescriptor) {
 *          var async;
 *
 *          handleKeyFrame(function () {
 *              // either this callback is being called immediately by handleKeyFrame (in
 *              // which case async is undefined) or it is being called later (in which case
 *              // async will be true).
 *
 *              if (async) {
 *                  eventDescriptor.finish();
 *              } else {
 *                  async = false;
 *              }
 *          });
 *
 *          // either the callback was called (and async is now false) or it was not
 *          // called (and async remains undefined).
 *
 *          if (async !== false) {
 *              eventDescriptor.defer();
 *              async = true; // let the callback know that we have gone async
 *          }
 *      }
 */
Ext.define('Ext.ux.event.Player', function (Player) {
var defaults    = {},
    mouseEvents = {},
    keyEvents   = {},
    doc,
    
    //HTML events supported
    uiEvents  = {},
    
    //events that bubble by default
    bubbleEvents = {
        //scroll:     1,
        resize:     1,
        reset:      1,
        submit:     1,
        change:     1,
        select:     1,
        error:      1,
        abort:      1
    };

Ext.each([ 'click', 'dblclick', 'mouseover', 'mouseout', 'mousedown', 'mouseup', 'mousemove' ],
    function (type) {
        bubbleEvents[type] = defaults[type] = mouseEvents[type] = {
            bubbles: true,
            cancelable: (type != "mousemove"), // mousemove cannot be cancelled
            detail: 1,
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            button: 0
        };
    });

Ext.each([ 'keydown', 'keyup', 'keypress' ],
    function (type) {
        bubbleEvents[type] = defaults[type] = keyEvents[type] = {
            bubbles: true,
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: 0,
            charCode: 0
        };
    });

Ext.each([ 'blur', 'change', 'focus', 'resize', 'scroll', 'select' ],
    function (type) {
        defaults[type] = uiEvents[type] = {
            bubbles: (type in bubbleEvents),
            cancelable: false,
            detail: 1
        };
    });

var inputSpecialKeys = {
        8: function (target, start, end) { // backspace: 8,
            if (start < end) {
                target.value = target.value.substring(0, start) +
                               target.value.substring(end);
            } else if (start > 0) {
                target.value = target.value.substring(0, --start) +
                               target.value.substring(end);
            }
            this.setTextSelection(target, start, start);
        },
        46: function (target, start, end) { // delete: 46
            if (start < end) {
                target.value = target.value.substring(0, start) +
                               target.value.substring(end);
            } else if (start < target.value.length - 1) {
                target.value = target.value.substring(0, start) +
                               target.value.substring(start+1);
            }
            this.setTextSelection(target, start, start);
        }
    };

return {
    extend: 'Ext.ux.event.Driver',

    /**
     * @cfg {Array} eventQueue The event queue to playback. This must be provided before
     * the {@link #method-start} method is called.
     */

    /**
     * @cfg {Object} keyFrameEvents An object that describes the events that should generate
     * keyframe events. For example, `{ click: true }` would generate keyframe events after
     * each `click` event.
     */
    keyFrameEvents: {
        click: true
    },

    /**
     * @cfg {Boolean} pauseForAnimations True to pause event playback during animations, false
     * to ignore animations. Default is true.
     */
    pauseForAnimations: true,

    /**
     * @cfg {Number} speed The playback speed multiplier. Default is 1.0 (to playback at the
     * recorded speed). A value of 2 would playback at 2x speed.
     */
    speed: 1.0,

    stallTime: 0,
    
    _inputSpecialKeys: {
        INPUT: inputSpecialKeys,

        TEXTAREA: Ext.apply({
            //13: function (target, start, end) { // enter: 8,
                //TODO ?
            //}
        }, inputSpecialKeys)
    },

    tagPathRegEx: /(\w+)(?:\[(\d+)\])?/,
    
    /**
     * @event beforeplay
     * Fires before an event is played.
     * @param {Ext.ux.event.Player} this
     * @param {Object} eventDescriptor The event descriptor about to be played.
     */

    /**
     * @event keyframe
     * Fires when this player reaches a keyframe. Typically, this is after events
     * like `click` are injected and any resulting animations have been completed.
     * @param {Ext.ux.event.Player} this
     * @param {Object} eventDescriptor The keyframe event descriptor.
     */

    constructor: function (config) {
        var me = this;
        
        me.callParent(arguments);

        me.timerFn = function () {
            me.onTick();
        };
        me.attachTo = me.attachTo || window;

        doc = me.attachTo.document;
    },

    /**
     * Returns the element given is XPath-like description.
     * @param {String} xpath The XPath-like description of the element.
     * @return {HTMLElement}
     */
    getElementFromXPath: function (xpath) {
        var me = this,
            parts = xpath.split('/'),
            regex = me.tagPathRegEx,
            i, n, m, count, tag, child,
            el = me.attachTo.document;

        el = (parts[0] == '~') ? el.body
                    : el.getElementById(parts[0].substring(1)); // remove '#'

        for (i = 1, n = parts.length; el && i < n; ++i) {
            m = regex.exec(parts[i]);
            count = m[2] ? parseInt(m[2], 10) : 1;
            tag = m[1].toUpperCase();

            for (child = el.firstChild; child; child = child.nextSibling) {
                if (child.tagName == tag) {
                    if (count == 1) {
                        break;
                    }
                    --count;
                }
            }

            el = child;
        }

        return el;
    },

    // Moving across a line break only counts as moving one character in a TextRange, whereas a line break in
    // the textarea value is two characters. This function corrects for that by converting a text offset into a
    // range character offset by subtracting one character for every line break in the textarea prior to the
    // offset
    offsetToRangeCharacterMove: function(el, offset) {
        return offset - (el.value.slice(0, offset).split("\r\n").length - 1);
    },

    setTextSelection: function (el, startOffset, endOffset) {
        // See https://code.google.com/p/rangyinputs/source/browse/trunk/rangyinputs_jquery.js
        if (startOffset < 0) {
            startOffset += el.value.length;
        }
        if (endOffset == null) {
            endOffset = startOffset;
        }
        if (endOffset < 0) {
            endOffset += el.value.length;
        }

        if (typeof el.selectionStart === "number") {
            el.selectionStart = startOffset;
            el.selectionEnd = endOffset;
        } else {
            var range = el.createTextRange();
            var startCharMove = this.offsetToRangeCharacterMove(el, startOffset);

            range.collapse(true);

            if (startOffset == endOffset) {
                range.move("character", startCharMove);
            } else {
                range.moveEnd("character", this.offsetToRangeCharacterMove(el, endOffset));
                range.moveStart("character", startCharMove);
            }

            range.select();
        }
    },

    getTimeIndex: function () {
        var t = this.getTimestamp() - this.stallTime;
        return t * this.speed;
    },

    makeToken: function (eventDescriptor, signal) {
        var me = this,
            t0;

        eventDescriptor[signal] = true;

        eventDescriptor.defer = function () {
            eventDescriptor[signal] = false;
            t0 = me.getTime();
        };

        eventDescriptor.finish = function () {
            eventDescriptor[signal] = true;
            me.stallTime += me.getTime() - t0;

            me.schedule();
        };
    },

    /**
     * This method is called after an event has been played to prepare for the next event.
     * @param {Object} eventDescriptor The descriptor of the event just played.
     */
    nextEvent: function (eventDescriptor) {
        var me = this,
            index = ++me.queueIndex;

        // keyframe events are inserted after a keyFrameEvent is played.
        if (me.keyFrameEvents[eventDescriptor.type]) {
            Ext.Array.insert(me.eventQueue, index, [
                {keyframe: true, ts: eventDescriptor.ts}
            ]);
        }
    },

    /**
     * This method returns the event descriptor at the front of the queue. This does not
     * dequeue the event. Repeated calls return the same object (until {@link #nextEvent}
     * is called).
     */
    peekEvent: function () {
        return this.eventQueue[this.queueIndex] || null;
    },

    /**
     * Replaces an event in the queue with an array of events. This is often used to roll
     * up a multi-step pseudo-event and expand it just-in-time to be played. The process
     * for doing this in a derived class would be this:
     * 
     *      Ext.define('My.Player', {
     *          extend: 'Ext.ux.event.Player',
     *
     *          peekEvent: function () {
     *              var event = this.callParent();
     *
     *              if (event.multiStepSpecial) {
     *                  this.replaceEvent(null, [
     *                      ... expand to actual events
     *                  ]);
     *
     *                  event = this.callParent(); // get the new next event
     *              }
     *
     *              return event;
     *          }
     *      });
     * 
     * This method ensures that the `beforeplay` hook (if any) from the replaced event is
     * placed on the first new event and the `afterplay` hook (if any) is placed on the
     * last new event.
     * 
     * @param {Number} index The queue index to replace. Pass `null` to replace the event
     * at the current `queueIndex`.
     * @param {Event[]} events The array of events with which to replace the specified
     * event.
     */
    replaceEvent: function (index, events) {
        for (var t, i = 0, n = events.length; i < n; ++i) {
            if (i) {
                t = events[i-1];
                delete t.afterplay;
                delete t.screenshot;

                delete events[i].beforeplay;
            }
        }

        Ext.Array.replace(this.eventQueue, (index == null) ? this.queueIndex : index,
                          1, events);
    },

    /**
     * This method dequeues and injects events until it has arrived at the time index. If
     * no events are ready (based on the time index), this method does nothing.
     * @return {Boolean} True if there is more to do; false if not (at least for now).
     */
    processEvents: function () {
        var me = this,
            animations = me.pauseForAnimations && me.attachTo.Ext.fx.Manager.items,
            eventDescriptor;

        while ((eventDescriptor = me.peekEvent()) !== null) {
            if (animations && animations.getCount()) {
                return true;
            }
            
            if (eventDescriptor.keyframe) {
                if (!me.processKeyFrame(eventDescriptor)) {
                    return false;
                }
                me.nextEvent(eventDescriptor);
            } else if (eventDescriptor.ts <= me.getTimeIndex() &&
                       me.fireEvent('beforeplay', me, eventDescriptor) !== false &&
                       me.playEvent(eventDescriptor)) {
                me.nextEvent(eventDescriptor);
            } else {
                return true;
            }
        }

        me.stop();
        return false;
    },

    /**
     * This method is called when a keyframe is reached. This will fire the keyframe event.
     * If the keyframe has been handled, true is returned. Otherwise, false is returned.
     * @param {Object} eventDescriptor The event descriptor of the keyframe.
     * @return {Boolean} True if the keyframe was handled, false if not.
     */
    processKeyFrame: function (eventDescriptor) {
        var me = this;

        // only fire keyframe event (and setup the eventDescriptor) once...
        if (!eventDescriptor.defer) {
            me.makeToken(eventDescriptor, 'done');
            me.fireEvent('keyframe', me, eventDescriptor);
        }

        return eventDescriptor.done;
    },

    /**
     * Called to inject the given event on the specified target.
     * @param {HTMLElement} target The target of the event.
     * @param {Object} event The event to inject. The properties of this object should be
     * those of standard DOM events but vary based on the `type` property. For details on
     * event types and their properties, see the class documentation.
     */
    injectEvent: function (target, event) {
        var me = this,
            type = event.type,
            options = Ext.apply({}, event, defaults[type]),
            handler;

        if (type === 'type') {
            handler = me._inputSpecialKeys[target.tagName];
            if (handler) {
                return me.injectTypeInputEvent(target, event, handler);
            }
            return me.injectTypeEvent(target, event);
        }
        if (type === 'focus' && target.focus) {
            target.focus();
            return true;
        }
        if (type === 'blur' && target.blur) {
            target.blur();
            return true;
        }
        if (type === 'scroll') {
            target.scrollLeft = event.pos[0];
            target.scrollTop = event.pos[1];
            return true;
        }
        if (type === 'mduclick') {
            return me.injectEvent(target, Ext.applyIf({ type: 'mousedown' }, event)) &&
                   me.injectEvent(target, Ext.applyIf({ type: 'mouseup' }, event)) &&
                   me.injectEvent(target, Ext.applyIf({ type: 'click' }, event));
        }

        if (mouseEvents[type]){
            return Player.injectMouseEvent(target, options, me.attachTo);
        }

        if (keyEvents[type]){
            return Player.injectKeyEvent(target, options, me.attachTo);
        }

        if (uiEvents[type]){
            return Player.injectUIEvent(target, type,
                options.bubbles,
                options.cancelable,
                options.view || me.attachTo,
                options.detail);
        }

        return false;
    },

    injectTypeEvent: function (target, event) {
        var me = this,
            text = event.text,
            xlat = [],
            ch, chUp, i, n, sel, upper, isInput;

        if (text) {
            delete event.text;
            upper = text.toUpperCase();

            for (i = 0, n = text.length; i < n; ++i) {
                ch = text.charCodeAt(i);
                chUp = upper.charCodeAt(i);

                xlat.push(
                    Ext.applyIf({type: 'keydown', charCode: chUp, keyCode: chUp}, event),
                    Ext.applyIf({type: 'keypress', charCode: ch, keyCode: ch},    event),
                    Ext.applyIf({type: 'keyup', charCode: chUp, keyCode: chUp},   event)
                );
            }
        } else {
            xlat.push(
                Ext.applyIf({type: 'keydown', charCode: event.keyCode}, event),
                Ext.applyIf({type: 'keyup',   charCode: event.keyCode}, event)
            );
        }

        for (i = 0, n = xlat.length; i < n; ++i) {
            me.injectEvent(target, xlat[i]);
        }

        return true;
    },

    injectTypeInputEvent: function (target, event, handler) {
        var me = this,
            text = event.text,
            sel, n;

        if (handler) {
            sel = me.getTextSelection(target);

            if (text) {
                n = sel[0];
                target.value = target.value.substring(0, n) + text +
                               target.value.substring(sel[1]);
                n += text.length;
                me.setTextSelection(target, n, n);
            } else {
                if (!(handler = handler[event.keyCode])) {
                    // no handler for the special key for this element
                    if ('caret' in event) {
                        me.setTextSelection(target, event.caret, event.caret);
                    } else if (event.selection) {
                        me.setTextSelection(target, event.selection[0], event.selection[1]);
                    }
                    return me.injectTypeEvent(target, event);
                }
                handler.call(this, target, sel[0], sel[1]);
                return true;
            }
        }

        return true;
    },

    playEvent: function (eventDescriptor) {
        var me = this,
            target = me.getElementFromXPath(eventDescriptor.target),
            event;

        if (!target) {
            // not present (yet)... wait for element present...
            // TODO - need a timeout here
            return false;
        }

        if (!me.playEventHook(eventDescriptor, 'beforeplay')) {
            return false;
        }

        if (!eventDescriptor.injected) {
            eventDescriptor.injected = true;
            event = me.translateEvent(eventDescriptor, target);
            me.injectEvent(target, event);
        }

        return me.playEventHook(eventDescriptor, 'afterplay');
    },

    playEventHook: function (eventDescriptor, hookName) {
        var me = this,
            doneName = hookName + '.done',
            firedName = hookName + '.fired',
            hook = eventDescriptor[hookName];

        if (hook && !eventDescriptor[doneName]) {
            if (!eventDescriptor[firedName]) {
                eventDescriptor[firedName] = true;
                me.makeToken(eventDescriptor, doneName);

                if (me.eventScope && Ext.isString(hook)) {
                    hook = me.eventScope[hook];
                }

                if (hook) {
                    hook.call(me.eventScope || me, eventDescriptor);
                }
            }
            return false;
        }

        return true;
    },

    schedule: function () {
        var me = this;
        if (!me.timer) {
            me.timer = setTimeout(me.timerFn, 10);
        }
    },

    _translateAcross: [
        'type',
        'button',
        'charCode',
        'keyCode',
        'caret',
        'pos',
        'text',
        'selection'
    ],

    translateEvent: function (eventDescriptor, target) {
        var me = this,
            event = {},
            modKeys = eventDescriptor.modKeys || '',
            names = me._translateAcross,
            i = names.length,
            name, xy;

        while (i--) {
            name = names[i];
            if (name in eventDescriptor) {
                event[name] = eventDescriptor[name];
            }
        }

        event.altKey = modKeys.indexOf('A') > 0;
        event.ctrlKey = modKeys.indexOf('C') > 0;
        event.metaKey = modKeys.indexOf('M') > 0;
        event.shiftKey = modKeys.indexOf('S') > 0;

        if (target && 'x' in eventDescriptor) {
            xy = Ext.fly(target).getXY();
            xy[0] += eventDescriptor.x;
            xy[1] += eventDescriptor.y;
        } else if ('x' in eventDescriptor) {
            xy = [ eventDescriptor.x, eventDescriptor.y ];
        } else if ('px' in eventDescriptor) {
            xy = [ eventDescriptor.px, eventDescriptor.py ];
        }

        if (xy) {
            event.clientX = event.screenX = xy[0];
            event.clientY = event.screenY = xy[1];
        }

        if (eventDescriptor.key) {
            event.keyCode = me.specialKeysByName[eventDescriptor.key];
        }

        if (eventDescriptor.type === 'wheel') {
            if ('onwheel' in me.attachTo.document) {
                event.wheelX = eventDescriptor.dx;
                event.wheelY = eventDescriptor.dy;
            } else {
                event.type = 'mousewheel';
                event.wheelDeltaX = -40 * eventDescriptor.dx;
                event.wheelDeltaY = event.wheelDelta = -40 * eventDescriptor.dy;
            }
        }
    
        return event;
    },

    //---------------------------------
    // Driver overrides

    onStart: function () {
        var me = this;

        me.queueIndex = 0;
        me.schedule();
    },

    onStop: function () {
        var me = this;

        if (me.timer) {
            clearTimeout(me.timer);
            me.timer = null;
        }
    },

    //---------------------------------

    onTick: function () {
        var me = this;

        me.timer = null;

        if (me.processEvents()) {
            me.schedule();
        }
    },

    statics: {
        ieButtonCodeMap: {
            0: 1,
            1: 4,
            2: 2
        },

        /*
         * Injects a key event using the given event information to populate the event
         * object.
         * 
         * **Note:** `keydown` causes Safari 2.x to crash.
         * 
         * @param {HTMLElement} target The target of the given event.
         * @param {Object} options Object object containing all of the event injection
         * options.
         * @param {String} options.type The type of event to fire. This can be any one of
         * the following: `keyup`, `keydown` and `keypress`.
         * @param {Boolean} [options.bubbles=true] `tru` if the event can be bubbled up.
         * DOM Level 3 specifies that all key events bubble by default.
         * @param {Boolean} [options.cancelable=true] `true` if the event can be canceled
         * using `preventDefault`. DOM Level 3 specifies that all key events can be
         * cancelled.
         * @param {Boolean} [options.ctrlKey=false] `true` if one of the CTRL keys is
         * pressed while the event is firing.
         * @param {Boolean} [options.altKey=false] `true` if one of the ALT keys is
         * pressed while the event is firing.
         * @param {Boolean} [options.shiftKey=false] `true` if one of the SHIFT keys is
         * pressed while the event is firing.
         * @param {Boolean} [options.metaKey=false] `true` if one of the META keys is
         * pressed while the event is firing.
         * @param {int} [options.keyCode=0] The code for the key that is in use.
         * @param {int} [options.charCode=0] The Unicode code for the character associated
         * with the key being used.
         * @param {Window} [view=window] The view containing the target. This is typically
         * the window object.
         * @private
         */
        injectKeyEvent: function (target, options, view) {
            var type = options.type,
                customEvent = null;

            if (type === 'textevent') {
                type = 'keypress';
            }
            view = view || window;

            //check for DOM-compliant browsers first
            if (doc.createEvent){
                try {
                    customEvent = doc.createEvent("KeyEvents");

                    // Interesting problem: Firefox implemented a non-standard
                    // version of initKeyEvent() based on DOM Level 2 specs.
                    // Key event was removed from DOM Level 2 and re-introduced
                    // in DOM Level 3 with a different interface. Firefox is the
                    // only browser with any implementation of Key Events, so for
                    // now, assume it's Firefox if the above line doesn't error.

                    // @TODO: Decipher between Firefox's implementation and a correct one.
                    customEvent.initKeyEvent(type, options.bubbles, options.cancelable,
                            view, options.ctrlKey, options.altKey, options.shiftKey,
                            options.metaKey, options.keyCode, options.charCode);

                } catch (ex) {
                    // If it got here, that means key events aren't officially supported. 
                    // Safari/WebKit is a real problem now. WebKit 522 won't let you
                    // set keyCode, charCode, or other properties if you use a
                    // UIEvent, so we first must try to create a generic event. The
                    // fun part is that this will throw an error on Safari 2.x. The
                    // end result is that we need another try...catch statement just to
                    // deal with this mess.

                    try {
                        //try to create generic event - will fail in Safari 2.x
                        customEvent = doc.createEvent("Events");

                    } catch (uierror) {
                        //the above failed, so create a UIEvent for Safari 2.x
                        customEvent = doc.createEvent("UIEvents");

                    } finally {
                        customEvent.initEvent(type, options.bubbles, options.cancelable);

                        customEvent.view = view;
                        customEvent.altKey = options.altKey;
                        customEvent.ctrlKey = options.ctrlKey;
                        customEvent.shiftKey = options.shiftKey;
                        customEvent.metaKey = options.metaKey;
                        customEvent.keyCode = options.keyCode;
                        customEvent.charCode = options.charCode;
                    }          
                }

                target.dispatchEvent(customEvent);

            } else if (doc.createEventObject) { //IE
                customEvent = doc.createEventObject();

                customEvent.bubbles = options.bubbles;
                customEvent.cancelable = options.cancelable;
                customEvent.view = view;
                customEvent.ctrlKey = options.ctrlKey;
                customEvent.altKey = options.altKey;
                customEvent.shiftKey = options.shiftKey;
                customEvent.metaKey = options.metaKey;

                // IE doesn't support charCode explicitly. CharCode should
                // take precedence over any keyCode value for accurate
                // representation.

                customEvent.keyCode = (options.charCode > 0) ? options.charCode : options.keyCode;

                target.fireEvent("on" + type, customEvent);  

            } else {
                return false;
            }

            return true;
        },

        /*
         * Injects a mouse event using the given event information to populate the event
         * object.
         *
         * @param {HTMLElement} target The target of the given event.
         * @param {Object} options Object object containing all of the event injection
         * options.
         * @param {String} options.type The type of event to fire. This can be any one of
         * the following: `click`, `dblclick`, `mousedown`, `mouseup`, `mouseout`,
         * `mouseover` and `mousemove`.
         * @param {Boolean} [options.bubbles=true] `tru` if the event can be bubbled up.
         * DOM Level 2 specifies that all mouse events bubble by default.
         * @param {Boolean} [options.cancelable=true] `true` if the event can be canceled
         * using `preventDefault`. DOM Level 2 specifies that all mouse events except
         * `mousemove` can be cancelled. This defaults to `false` for `mousemove`.
         * @param {Boolean} [options.ctrlKey=false] `true` if one of the CTRL keys is
         * pressed while the event is firing.
         * @param {Boolean} [options.altKey=false] `true` if one of the ALT keys is
         * pressed while the event is firing.
         * @param {Boolean} [options.shiftKey=false] `true` if one of the SHIFT keys is
         * pressed while the event is firing.
         * @param {Boolean} [options.metaKey=false] `true` if one of the META keys is
         * pressed while the event is firing.
         * @param {int} [options.detail=1] The number of times the mouse button has been
         * used.
         * @param {int} [options.screenX=0] The x-coordinate on the screen at which point
         * the event occured.
         * @param {int} [options.screenY=0] The y-coordinate on the screen at which point
         * the event occured.
         * @param {int} [options.clientX=0] The x-coordinate on the client at which point
         * the event occured.
         * @param {int} [options.clientY=0] The y-coordinate on the client at which point
         * the event occured.
         * @param {int} [options.button=0] The button being pressed while the event is
         * executing. The value should be 0 for the primary mouse button (typically the
         * left button), 1 for the terciary mouse button (typically the middle button),
         * and 2 for the secondary mouse button (typically the right button).
         * @param {HTMLElement} [options.relatedTarget=null] For `mouseout` events, this
         * is the element that the mouse has moved to. For `mouseover` events, this is
         * the element that the mouse has moved from. This argument is ignored for all
         * other events.
         * @param {Window} [view=window] The view containing the target. This is typically
         * the window object.
         * @private
         */
        injectMouseEvent: function (target, options, view) {
            var type = options.type,
                customEvent = null;

            view = view || window;

            //check for DOM-compliant browsers first
            if (doc.createEvent){
                customEvent = doc.createEvent("MouseEvents");

                //Safari 2.x (WebKit 418) still doesn't implement initMouseEvent()
                if (customEvent.initMouseEvent){
                    customEvent.initMouseEvent(type, options.bubbles, options.cancelable,
                            view, options.detail, options.screenX, options.screenY,
                            options.clientX, options.clientY, options.ctrlKey,
                            options.altKey, options.shiftKey, options.metaKey,
                            options.button, options.relatedTarget);
                } else { //Safari
                    //the closest thing available in Safari 2.x is UIEvents
                    customEvent = doc.createEvent("UIEvents");

                    customEvent.initEvent(type, options.bubbles, options.cancelable);

                    customEvent.view = view;
                    customEvent.detail = options.detail;
                    customEvent.screenX = options.screenX;
                    customEvent.screenY = options.screenY;
                    customEvent.clientX = options.clientX;
                    customEvent.clientY = options.clientY;
                    customEvent.ctrlKey = options.ctrlKey;
                    customEvent.altKey = options.altKey;
                    customEvent.metaKey = options.metaKey;
                    customEvent.shiftKey = options.shiftKey;
                    customEvent.button = options.button;
                    customEvent.relatedTarget = options.relatedTarget;
                }

                /*
                 * Check to see if relatedTarget has been assigned. Firefox
                 * versions less than 2.0 don't allow it to be assigned via
                 * initMouseEvent() and the property is readonly after event
                 * creation, so in order to keep YAHOO.util.getRelatedTarget()
                 * working, assign to the IE proprietary toElement property
                 * for mouseout event and fromElement property for mouseover
                 * event.
                 */
                if (options.relatedTarget && !customEvent.relatedTarget){
                    if (type == "mouseout"){
                        customEvent.toElement = options.relatedTarget;
                    } else if (type == "mouseover"){
                        customEvent.fromElement = options.relatedTarget;
                    }
                }

                target.dispatchEvent(customEvent);

            } else if (doc.createEventObject) { //IE
                customEvent = doc.createEventObject();

                customEvent.bubbles = options.bubbles;
                customEvent.cancelable = options.cancelable;
                customEvent.view = view;
                customEvent.detail = options.detail;
                customEvent.screenX = options.screenX;
                customEvent.screenY = options.screenY;
                customEvent.clientX = options.clientX;
                customEvent.clientY = options.clientY;
                customEvent.ctrlKey = options.ctrlKey;
                customEvent.altKey = options.altKey;
                customEvent.metaKey = options.metaKey;
                customEvent.shiftKey = options.shiftKey;
                customEvent.button = Player.ieButtonCodeMap[options.button] || 0;

                /*
                 * Have to use relatedTarget because IE won't allow assignment
                 * to toElement or fromElement on generic events. This keeps
                 * YAHOO.util.customEvent.getRelatedTarget() functional.
                 */
                customEvent.relatedTarget = options.relatedTarget;

                target.fireEvent('on' + type, customEvent);
            } else {
                return false;
            }

            return true;
        },

        /*
         * Injects a UI event using the given event information to populate the event
         * object.
         * 
         * @param {HTMLElement} target The target of the given event.
         * @param {String} options.type The type of event to fire. This can be any one of
         * the following: `click`, `dblclick`, `mousedown`, `mouseup`, `mouseout`,
         * `mouseover` and `mousemove`.
         * @param {Boolean} [options.bubbles=true] `tru` if the event can be bubbled up.
         * DOM Level 2 specifies that all mouse events bubble by default.
         * @param {Boolean} [options.cancelable=true] `true` if the event can be canceled
         * using `preventDefault`. DOM Level 2 specifies that all mouse events except
         * `mousemove` can be cancelled. This defaults to `false` for `mousemove`.
         * @param {int} [options.detail=1] The number of times the mouse button has been
         * used.
         * @param {Window} [view=window] The view containing the target. This is typically
         * the window object.
         * @private
         */
        injectUIEvent: function (target, options, view) {
            var customEvent = null;    

            view = view || window;

            //check for DOM-compliant browsers first
            if (doc.createEvent){
                //just a generic UI Event object is needed
                customEvent = doc.createEvent("UIEvents");

                customEvent.initUIEvent(options.type, options.bubbles, options.cancelable,
                        view, options.detail);

                target.dispatchEvent(customEvent);

            } else if (doc.createEventObject){ //IE
                customEvent = doc.createEventObject();

                customEvent.bubbles = options.bubbles;
                customEvent.cancelable = options.cancelable;
                customEvent.view = view;
                customEvent.detail = options.detail;

                target.fireEvent("on" + options.type, customEvent);

            } else {
                return false;
            }

            return true;
        }
    } // statics
};
});
