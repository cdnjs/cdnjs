
/**
 * @class Ext.ux.event.Driver
 * This is the base class for {@link Recorder} and {@link Player}.
 */
Ext.define('Ext.ux.event.Driver', {
    active: null,
    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * @event start
     * Fires when this object is started.
     * @param {Ext.ux.event.Driver} this
     */

    /**
     * @event stop
     * Fires when this object is stopped.
     * @param {Ext.ux.event.Driver} this
     */

    constructor: function (config) {
        var me = this;

        me.mixins.observable.constructor.apply(this, arguments);
    },

    /**
     * Returns the number of milliseconds since start was called.
     */
    getTimestamp: function () {
        var d = new Date();
        return d.getTime() - this.startTime;
    },

    onStart: function () {},

    onStop: function () {},

    /**
     * Starts this object. If this object is already started, nothing happens.
     */
    start: function () {
        var me = this;

        if (!me.active) {
            me.active = new Date();
            me.startTime = me.active.getTime();
            me.onStart();
            me.fireEvent('start', me);
        }
    },

    /**
     * Stops this object. If this object is not started, nothing happens.
     */
    stop: function () {
        var me = this;

        if (me.active) {
            me.active = null;
            me.onStop();
            me.fireEvent('stop', me);
        }
    }
});

/**
 * @class Ext.ux.event.Player
 * @extends Ext.ux.event.Driver
 *
 * This class manages the playback of an array of "event descriptors". For details on the
 * contents of an "event descriptor", see {@link Recorder}. The events recorded by the
 * {@link Recorder} class are designed to serve as input for this class.
 * 
 * The simplest use of this class is to instantiate it with an {@link #eventQueue} and call
 * {@link #start}. Like so:
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
 *
 * @markdown
 */
Ext.define('Ext.ux.event.Player', {
    extend: 'Ext.ux.event.Driver',

    /**
     * @cfg {Array} eventQueue The event queue to playback. This must be provided before
     * the {@link #start} method is called.
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

    tagPathRegEx: /(\w+)(?:\[(\d+)\])?/,
    
    
    screenshotTimeout: 500,

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

        me.eventObject = new Ext.EventObjectImpl();

        me.timerFn = function () {
            me.onTick();
        };
        me.attachTo = me.attachTo || window;
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

    /**
     * This method is called after an event has been played to prepare for the next event.
     * @param {Object} eventDescriptor The descriptor of the event just played.
     */
    nextEvent: function (eventDescriptor) {
        var me = this, index;
        
        if (eventDescriptor.screenshot) {  
            eventDescriptor.played = true;
            return;
        }
        
        if (eventDescriptor.after) {
            eventDescriptor.after();
            delete eventDescriptor.after;
            return;
        }
            
        index = ++me.queueIndex;
        // keyframe events are inserted after a keyFrameEvent is played.
        if (me.keyFrameEvents[eventDescriptor.type]) {
            Ext.Array.insert(me.eventQueue, index, [
                { keyframe: true, ts: eventDescriptor.ts }
            ]);
        }
    },

    /**
     * This method returns the event descriptor at the front of the queue. This does not
     * dequeue the event. Repeated calls return the same object (until {@link #nextEvent}
     * is called).
     */
    peekEvent: function () {
        var me = this,
            queue = me.eventQueue,
            index = me.queueIndex,
            eventDescriptor = queue[index],
            type = eventDescriptor && eventDescriptor.type,
            tmp;
        
        if (type == 'mduclick') {
            tmp = [
                Ext.applyIf({ type: 'mousedown' }, eventDescriptor),
                Ext.applyIf({ type: 'mouseup' }, eventDescriptor),
                Ext.applyIf({ type: 'click' }, eventDescriptor)
            ];
            delete tmp[0].screenshot;
            delete tmp[0].after;
            delete tmp[1].screenshot;
            delete tmp[1].after;
            Ext.Array.replace(queue, index, 1, tmp);
        }

//        if (type == 'drag') {
//
//            Ext.Array.replace(queue, index, 1, me.createDrag(eventDescriptor));
//            return queue[index];
//        }
        return queue[index] || null;
    },
    
    // TODO
//    dragStep: 5,
//    
//    createDrag: function(eventDescriptor) {
//        var me = this,
//            tmp = [
//             Ext.applyIf({ type: 'mousedown' }, eventDescriptor)
//        ],
//        
//        from = me.getTarget(eventDescriptor).xy,
//        to = me.getTarget(eventDescriptor.dropTo).xy,
//        i = 0,
//        xinc, yinc, x, y;
//        
//
//        
//        xinc = (to[0] - from[0]) / me.dragStep;
//        
//        yinc =  (to[1] - from[1]) / me.dragStep;
//        
//        x = from[0] + xinc;
//        y = from[1] + yinc;
//        
//        
//        for (i = 0; i < me.dragStep; i++) {
//            tmp.push(Ext.applyIf({ type: 'mousemove', xy: [x,y]}, eventDescriptor));
//            x += xinc;
//            y += yinc;
//        }
//        
//        tmp.push(Ext.applyIf({ type: 'mouseup' }, eventDescriptor.dropTo));
//        
//        return tmp;
//    },
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
                    
            if (eventDescriptor.screenshot && eventDescriptor.played) {
                delete eventDescriptor.screenshot;
                delete eventDescriptor.played;
                me.snap();
                me.nextEvent(eventDescriptor);
                continue;
            }
            if (eventDescriptor.keyframe) {
                if (!me.processKeyFrame(eventDescriptor)) {
                    return false;
                }
                me.nextEvent(eventDescriptor);
            } else if (eventDescriptor.ts <= me.timeIndex  || !eventDescriptor.ts &&
                       me.fireEvent('beforeplay', me, eventDescriptor) !== false &&
                       me.playEvent(eventDescriptor)) {
                me.nextEvent(eventDescriptor);
                if (eventDescriptor.played) {
                    return true;
                }
            } else {
                return true;
            }
        }
        me.stop();
        return false;
    },

    snap: function() {
       if (window.__x && __x.poll) {                    
          __x.poll.sendSyncRequest({cmd: 'screenshot'});
       } else {
          alert('sreenshot');
       }
    },
    
    /**
     * This method is called when a keyframe is reached. This will fire the keyframe event.
     * If the keyframe has been handled, true is returned. Otherwise, false is returned.
     * @param {Object} The event descriptor of the keyframe.
     * @return {Boolean} True if the keyframe was handled, false if not.
     */
    processKeyFrame: function (eventDescriptor) {
        var me = this;

        // only fire keyframe event (and setup the eventDescriptor) once...
        if (!eventDescriptor.defer) {
            eventDescriptor.done = true;

            eventDescriptor.defer = function () {
                eventDescriptor.done = false;
            };

            eventDescriptor.finish = function () {
                eventDescriptor.done = true;
                me.schedule();
            };

            me.fireEvent('keyframe', me, eventDescriptor);
        }

        return eventDescriptor.done;
    },

    /**
     * Called to inject the given event on the specified target.
     * @param {HTMLElement} target The target of the event.
     * @param {Ext.EventObject} The event to inject.
     */
    injectEvent: function (target, event) {
        event.injectEvent(target);
    },

    playEvent: function (eventDescriptor) {
        var me = this,
            target,
            event;

        if (eventDescriptor.cmpQuery || eventDescriptor.domQuery) {
            me.getTarget(eventDescriptor);
        }
        
        if (eventDescriptor.target) {
            target = me.getElementFromXPath(eventDescriptor.target);
        }
        
        if (!target) {
            // not present (yet)... wait for element present...
            // TODO - need a timeout here
            return false;
        }

        event = me.translateEvent(eventDescriptor, target);
        me.injectEvent(target, event);
        return true;
    },

    schedule: function () {
        var me = this;
        if (!me.timer) {
            me.timer = setTimeout(me.timerFn, 250);
        }
    },

    translateEvent: function (eventDescriptor, target) {
        var me = this,
            event = me.eventObject,
            modKeys = eventDescriptor.modKeys || '',
            xy;

        if ('xy' in eventDescriptor) {
            event.xy = xy = Ext.fly(target).getXY();
            xy[0] += eventDescriptor.xy[0];
            xy[1] += eventDescriptor.xy[1];
        }


        if ('wheel' in eventDescriptor) {
            // see getWheelDelta
        }

        event.type = eventDescriptor.type;
        event.button = eventDescriptor.button;
        event.altKey = modKeys.indexOf('A') > 0;
        event.ctrlKey = modKeys.indexOf('C') > 0;
        event.metaKey = modKeys.indexOf('M') > 0;
        event.shiftKey = modKeys.indexOf('S') > 0;


        return event;
    },

    getTarget: function(eventDescriptor) {
        var me = this;
        eventDescriptor.el = eventDescriptor.el || 'el';
        if (eventDescriptor.cmpQuery) {
            me.findTarget(eventDescriptor, Ext.ComponentQuery.query(eventDescriptor.cmpQuery)[0]);
        } else {
            me.findTarget(eventDescriptor);
        }
        
        return eventDescriptor;
    },
    
    findTarget: function(eventDescriptor, cmp) {
        var me = this,
            x, y, el, offsetX, offsetY;
        if (cmp) {
            if (!eventDescriptor.domQuery) {
                el = cmp[eventDescriptor.el];
            } else {
                el = cmp.el.down(eventDescriptor.domQuery);
            }
        } else {
    
            el = Ext.get(Ext.DomQuery.selectNode(eventDescriptor.domQuery));
        }
        try {
            eventDescriptor.target = '#' + el.dom.id;
            if (!eventDescriptor.xy) {
                if (eventDescriptor.offset) {
                    offsetX = eventDescriptor.offset[0];
                    offsetY = eventDescriptor.offset[1];
                    if (offsetX > 0) {
                        x = offsetX;
                    } else {
                        x = el.getWidth() - offsetX;
                    }
                    if (offsetY > 0) {
                        y = offsetY;
                    } else {
                        y = el.getHeight() - offsetY;
                    }
                // default centering
                } else {
                    x = (el.getWidth() / 2);
                    y = (el.getHeight() / 2);
                }
                eventDescriptor.xy = [x,y];
            }
            
        
        } catch(e) {}
        
        return eventDescriptor;
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
        if (window.__x && __x.poll) {
            __x.poll.sendSyncRequest({cmd: 'finish'});
        }
    },

    //---------------------------------

    onTick: function () {
        var me = this;

        me.timer = null;
        me.timeIndex = me.getTimestamp() * me.speed;

        if (me.processEvents()) {
            me.schedule();
        }
    }
});

Ext.define('Ext.ux.event.Maker', {

    eventQueue: [],
    
    startAfter: 0,
    
    timerIncrement: 2000,
    
    currentTiming: 0,
    
    constructor: function(config) {
        var me = this;
        
        me.currentTiming = me.startAfter;
        
        if(!Ext.isArray(config)) {
            config = [config];
        }
        
        Ext.Array.each(config, function(item) {
            item.el = item.el || 'el';
            if (item.cmpQuery) {
                Ext.Array.each(Ext.ComponentQuery.query(item.cmpQuery), function(cmp) {
                    me.generateEvent(item, cmp);
                });
            } else {
                me.generateEvent(item);
            }
            if (item.endingScreenshot) {
                me.eventQueue[me.eventQueue.length - 1].screenshot = true;
            }
        });

        return me.eventQueue;
    },
    
    generateEvent: function(item, cmp) {
        var me = this,
            event = {}, x, y, el;
        if (cmp) {
            if (!item.domQuery) {
                el = cmp[item.el];
            } else {
                el = cmp.el.down(item.domQuery);
                
            }
        } else {
            el = Ext.get(Ext.DomQuery.selectNode(item.domQuery));
        }
        event.target = '#' + el.dom.id;

//        event.type = item.type;

//        event.key = item.key;
//        event.button = item.button || 0;

        x = el.getX() + (el.getWidth() / 2);
        y = el.getY() + (el.getHeight() / 2);

        event.xy = [x,y];

        event.ts = me.currentTiming;

        event.screenshot = item.screenshot;
        me.currentTiming += me.timerIncrement;
        
        me.eventQueue.push(event);
    }
});

Ext.onReady(function() {
    if (!window.__x) {
         __x = {};
    } else {
        __x.poll.interval = 50;
        __x.poll.connect(); 
    }
   
//        
//    
      __x.player = Ext.create('Ext.ux.event.Player', {
             eventQueue: [{
                 cmpQuery: 'panel[title="Collapsed Panel"] > header > tool[type=expand-bottom]',
                
                 domQuery: 'img',
                 
                 type: 'mduclick',
                 
                 screenshot: true
             },{
                cmpQuery: 'panel[title="Collapsed Panel"] > header > tool[type=collapse-top]',
                
                 domQuery: 'img',
                 
                 type: 'mduclick',
                 
                 screenshot: true
             },{
                     
                 cmpQuery: 'panel[title="Masked Panel"] > header > tool[type=collapse-top]',
                
                 domQuery: 'img',
                 
                 type: 'mduclick',
                 
                 screenshot: true
            },{
                 cmpQuery: 'panel[title="Masked Panel"] > header > tool[type=collapse-bottom]',
                
                 domQuery: 'img',
                 
                 type: 'mduclick',
                 
                 screenshot: true
            },{
                cmpQuery: 'panel[title="Collapsed Framed Panel"] > header > tool[type=expand-bottom]',
                
                domQuery: 'img',
                 
                type: 'mduclick',
                 
                screenshot: true
            },{
                cmpQuery: 'panel[title="Collapsed Framed Panel"] > header > tool[type=collapse-top]',
                
                domQuery: 'img',
                 
                type: 'mduclick',
                 
                screenshot: true
            },{
                cmpQuery: 'window[title=Window] > toolbar > button[text=Submit]',
                
                type: 'mduclick',
                 
                screenshot: true
            },{
                cmpQuery: 'button[text=Yes]',
                
                type: 'mduclick',
                 
                screenshot: true
            },{
                cmpQuery: 'window[title=Window] > header > tool[type=collapse-top]',
                
                domQuery: 'img',
                 
                type: 'mduclick',
                 
                screenshot: true
            },{
                cmpQuery: 'window[title=Window] > header > tool[type=collapse-bottom]',
                
                domQuery: 'img',
                 
                type: 'mduclick',
                 
                screenshot: true
            },{ 
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=top] > buttongroup > button[text=Menu Button]',
                
                offset: [-2, -2],
                
                type: 'mouseover'
            },{
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=top] > buttongroup > button[text=Menu Button]',
                
                offset: [-2, -3],
                
                type: 'mousemove'
            },{
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=top] > buttongroup > button[text=Menu Button]',
                
                offset: [-2, -2],
                
                type: 'mduclick',
                 
                screenshot: true
            },{
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=top] > buttongroup > button[text=Menu Button]',
                
                offset: [-2, -2],
                
                type: 'mduclick',
                 
                screenshot: true
                
            },{ 
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=top] > buttongroup > button[text=Menu Button]',
                
                offset: [-2, -2],
                
                type: 'mouseout',
                 
                screenshot: true
            },{
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=top] > buttongroup > button[text=Cut]',
                
                offset: [-2, -2],
                
                type: 'mouseover'
            },{
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=top] > buttongroup > button[text=Cut]',
                
                offset: [-2, -3],
                
                type: 'mousemove'
            },{
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=top] > buttongroup > button[text=Cut]',
                
                offset: [-2, -2],
                
                type: 'mduclick',
                 
                screenshot: true
            },{
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=top] > buttongroup > button[text=Cut]',
                
                offset: [-2, -2],
                
                type: 'mduclick',
                 
                screenshot: true

            },{ 
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=top] > buttongroup > button[text=Cut]',
                
                offset: [-2, -2],
                
                type: 'mouseout',
                 
                screenshot: true
            },{
                
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Menu Button]',
                
                offset: [-2, -2],
                
                type: 'mouseover'
            },{
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Menu Button]',
                
                offset: [-2, -3],
                
                type: 'mousemove'
            },{
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Menu Button]',
                
                offset: [-2, -2],
                
                type: 'mduclick',
                 
                screenshot: true
            },{
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Menu Button]',
                
                offset: [-2, -2],
                
                type: 'mduclick',
                 
                screenshot: true
                
            },{ 
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Menu Button]',
                
                offset: [-2, -2],
                
                type: 'mouseout',
                 
                screenshot: true
            },{
                
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Split Button]',
                
                offset: [-2, -2],
                
                type: 'mouseover'
            },{
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Split Button]',
                
                offset: [-2, -3],
                
                type: 'mousemove'
            },{
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Split Button]',
                
                offset: [-2, -2],
                
                type: 'mduclick',
                 
                screenshot: true
            },{
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Split Button]',
                
                offset: [-2, -2],
                
                type: 'mduclick',
                 
                screenshot: true
            },{
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Split Button]',
                
                offset: [-2, -2],
                
                type: 'mouseout',
                 
                screenshot: true
            },{                
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Toggle Button]',
                
                type: 'mduclick',
                 
                screenshot: true
            },{
                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Toggle Button]',
                
                type: 'mduclick',
                 
                screenshot: true                

//            },{                
//                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Menu Button]',
//                
//                domQuery: '.x-btn-split',
//                
//                type: 'mduclick',
//                 
//                screenshot: true
//            },{
//                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Menu Button]',
//                
//                domQuery: '.x-btn-split',
//                
//                type: 'mduclick',
//                 
//                screenshot: true
//            },{  
//                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Split Button]',
//                
//                domQuery: '.x-btn-split',
//                
//                type: 'mduclick',
//                 
//                screenshot: true
//            },{
//                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Split Button]',
//                
//                domQuery: '.x-btn-split',
//                
//                type: 'mduclick',
//                 
//                screenshot: true
//            },{ 
//                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Toggle Button]',
//                
//                type: 'mduclick',
//                 
//                screenshot: true
//            },{
//                cmpQuery: 'panel[title=Basic Panel With Toolbars] > toolbar[dock=bottom] > button[text=Toggle Button]',
//                
//                type: 'mduclick',
//                 
//                screenshot: true
//            },{ 
//                cmpQuery: 'combo',
//                
//                domQuery: '.x-form-trigger',
//                
//                type: 'mduclick',
//                
//                screenshot: true
//            }, {
//                cmpQuery: 'boundlist',
//                
//                domQuery: '.x-boundlist-item',
//                
//                type: 'mduclick',
//                
//                screenshot: true
             
//            }, {
//                cmpQuery: 'grid[title=Array Grid] > headercontainer > gridcolumn[text=Company]',
//                
//                domQuery: '.x-column-header-text',
//                
//                type: 'drag',
//                
//                dropTo: {
//                     cmpQuery: 'grid[title=Array Grid] > headercontainer > gridcolumn[text=Price]',
//                
//                     domQuery: '.x-column-header-text'
//                },
//                
//                screenshot: true
                
            }]
     });
     if (!window.__x.poll) {
        __x.player.start();
     }
     
});