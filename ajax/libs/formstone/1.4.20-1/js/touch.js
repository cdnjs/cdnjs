/*! formstone v1.4.20-1 [touch.js] 2021-01-29 | GPL-3.0 License | formstone.it */
/* global define */

(function(factory) {
    if (typeof define === "function" && define.amd) {
      define([
        "jquery",
        "./core"
      ], factory);
    } else {
      factory(jQuery, Formstone);
    }
  }(function($, Formstone) {

    "use strict";

    /**
     * @method private
     * @name construct
     * @description Builds instance.
     * @param data [object] "Instance data"
     */

    function construct(data) {
      data.touches = [];
      data.touching = false;

      this.on(Events.dragStart, Functions.killEvent);

      if (data.swipe) {
        data.pan = true;
      }

      if (data.scale) {
        data.axis = false;
      }

      data.axisX = data.axis === "x";
      data.axisY = data.axis === "y";

      if (Formstone.support.pointer) {
        var action = "";

        if (!data.axis || (data.axisX && data.axisY)) {
          action = "none";
        } else {
          if (data.axisX) {
            action += " pan-y";
          }
          if (data.axisY) {
            action += " pan-x";
          }
        }

        touchAction(this, action);

        this.on(Events.pointerDown, data, onTouch);
      } else {
        this.on(Events.touchStart, data, onTouch)
          .on(Events.mouseDown, data, onPointerStart);
      }
    }

    /**
     * @method private
     * @name destruct
     * @description Tears down instance.
     * @param data [object] "Instance data"
     */

    function destruct(data) {
      this.off(Events.namespace);

      touchAction(this, "");
    }

    /**
     * @method private
     * @name onTouch
     * @description Delegates touch events.
     * @param e [object] "Event data"
     */

    function onTouch(e) {
      // Stop panning and zooming
      if (e.preventManipulation) {
        e.preventManipulation();
      }

      var data = e.data,
        oe = e.originalEvent;

      if (oe.type.match(/(up|end|cancel)$/i)) {
        onPointerEnd(e);
        return;
      }

      if (oe.pointerId) {
        // Normalize MS pointer events back to standard touches
        var activeTouch = false;
        for (var i in data.touches) {
          if (data.touches[i].id === oe.pointerId) {
            activeTouch = true;
            data.touches[i].pageX = oe.pageX;
            data.touches[i].pageY = oe.pageY;
          }
        }
        if (!activeTouch) {
          data.touches.push({
            id: oe.pointerId,
            pageX: oe.pageX,
            pageY: oe.pageY
          });
        }
      } else {
        // Alias normal touches
        data.touches = oe.touches;
      }

      // Delegate touch actions
      if (oe.type.match(/(down|start)$/i)) {
        onPointerStart(e);
      } else if (oe.type.match(/move$/i)) {
        onPointerMove(e);
      }
    }

    /**
     * @method private
     * @name onPointerStart
     * @description Handles pointer start.
     * @param e [object] "Event data"
     */

    function onPointerStart(e) {
      var data = e.data,
        touch = (typeof data.touches !== "undefined" && data.touches.length) ? data.touches[0] : null;

      if (touch) {
        data.$el.off(Events.mouseDown);
      }

      if (!data.touching) {
        data.startE = e.originalEvent;
        data.startX = (touch) ? touch.pageX : e.pageX;
        data.startY = (touch) ? touch.pageY : e.pageY;
        data.startT = new Date().getTime();
        data.scaleD = 1;
        data.passedAxis = false;
      }

      // Clear old click events

      if (data.$links) {
        data.$links.off(Events.click);
      }

      // Pan / Scale

      var newE = buildEvent(data.scale ? Events.scaleStart : Events.panStart, e, data.startX, data.startY, data.scaleD, 0, 0, "", "");

      if (data.scale && data.touches && data.touches.length >= 2) {
        var t = data.touches;

        data.pinch = {
          startX: midpoint(t[0].pageX, t[1].pageX),
          startY: midpoint(t[0].pageY, t[1].pageY),
          startD: pythagorus((t[1].pageX - t[0].pageX), (t[1].pageY - t[0].pageY))
        };

        newE.pageX = data.startX = data.pinch.startX;
        newE.pageY = data.startY = data.pinch.startY;
      }

      // Only bind at first touch
      if (!data.touching) {
        data.touching = true;

        if (data.pan && !touch) {
          $Window.on(Events.mouseMove, data, onPointerMove)
            .on(Events.mouseUp, data, onPointerEnd);
        }

        if (Formstone.support.pointer) {
          $Window.on([
            Events.pointerMove,
            Events.pointerUp,
            Events.pointerCancel
          ].join(" "), data, onTouch);
        } else {
          $Window.on([
            Events.touchMove,
            Events.touchEnd,
            Events.touchCancel
          ].join(" "), data, onTouch);
        }

        data.$el.trigger(newE);
      }
    }

    /**
     * @method private
     * @name onPointerMove
     * @description Handles pointer move.
     * @param e [object] "Event data"
     */

    function onPointerMove(e) {
      var data = e.data,
        touch = (typeof data.touches !== "undefined" && data.touches.length) ? data.touches[0] : null,
        newX = (touch) ? touch.pageX : e.pageX,
        newY = (touch) ? touch.pageY : e.pageY,
        deltaX = newX - data.startX,
        deltaY = newY - data.startY,
        dirX = (deltaX > 0) ? "right" : "left",
        dirY = (deltaY > 0) ? "down" : "up",
        movedX = Math.abs(deltaX) > data.threshold,
        movedY = Math.abs(deltaY) > data.threshold;

      if (!data.passedAxis && data.axis && ((data.axisX && movedY) || (data.axisY && movedX))) {
        // if axis and moved in opposite direction
        onPointerEnd(e);
      } else {
        if (!data.passedAxis && (!data.axis || (data.axis && (data.axisX && movedX) || (data.axisY && movedY)))) {
          // if has axis and moved in same direction
          data.passedAxis = true;
        }

        if (data.passedAxis) {
          Functions.killEvent(e);
          Functions.killEvent(data.startE);
        }

        // Pan / Scale

        var fire = true,
          newE = buildEvent(data.scale ? Events.scale : Events.pan, e, newX, newY, data.scaleD, deltaX, deltaY, dirX, dirY);

        if (data.scale) {
          if (data.touches && data.touches.length >= 2) {
            var t = data.touches;

            data.pinch.endX = midpoint(t[0].pageX, t[1].pageX);
            data.pinch.endY = midpoint(t[0].pageY, t[1].pageY);
            data.pinch.endD = pythagorus((t[1].pageX - t[0].pageX), (t[1].pageY - t[0].pageY));
            data.scaleD = (data.pinch.endD / data.pinch.startD);
            newE.pageX = data.pinch.endX;
            newE.pageY = data.pinch.endY;
            newE.scale = data.scaleD;
            newE.deltaX = data.pinch.endX - data.pinch.startX;
            newE.deltaY = data.pinch.endY - data.pinch.startY;
          } else if (!data.pan) {
            fire = false;
          }
        }

        if (fire) {
          data.$el.trigger(newE);
        }
      }
    }

    /**
     * @method private
     * @name onPointerEnd
     * @description Handles pointer end / cancel.
     * @param e [object] "Event data"
     */

    function onPointerEnd(e) {
      var data = e.data;

      // Pan / Swipe / Scale

      var touch = (typeof data.touches !== "undefined" && data.touches.length) ? data.touches[0] : null,
        newX = (touch) ? touch.pageX : e.pageX,
        newY = (touch) ? touch.pageY : e.pageY,
        deltaX = newX - data.startX,
        deltaY = newY - data.startY,
        endT = new Date().getTime(),
        eType = data.scale ? Events.scaleEnd : Events.panEnd,
        dirX = (deltaX > 0) ? "right" : "left",
        dirY = (deltaY > 0) ? "down" : "up",
        movedX = Math.abs(deltaX) > 1,
        movedY = Math.abs(deltaY) > 1;

      // Swipe
      if ( data.swipe && (endT - data.startT) < data.time && Math.abs(deltaX) > data.threshold) {
        eType = Events.swipe;
      }

      // Kill clicks to internal links

      if ((data.axis && ((data.axisX && movedY) || (data.axisY && movedX))) || (movedX || movedY)) {
        data.$links = data.$el.find("a");

        for (var i = 0, count = data.$links.length; i < count; i++) {
          bindLink(data.$links.eq(i), data);
        }
      }

      var newE = buildEvent(eType, e, newX, newY, data.scaleD, deltaX, deltaY, dirX, dirY);

      $Window.off([
        Events.touchMove,
        Events.touchEnd,
        Events.touchCancel,
        Events.mouseMove,
        Events.mouseUp,
        Events.pointerMove,
        Events.pointerUp,
        Events.pointerCancel
      ].join(" "));

      data.$el.trigger(newE);

      data.touches = [];

      if (data.scale) {
        /*
        if (e.originalEvent.pointerId) {
          for (var i in data.touches) {
            if (data.touches[i].id === e.originalEvent.pointerId) {
              data.touches.splice(i, 1);
            }
          }
        } else {
          data.touches = e.originalEvent.touches;
        }
        */

        /*
        if (data.touches.length) {
          onPointerStart($.extend(e, {
            data: data,
            originalEvent: {
              touches: data.touches
            }
          }));
        }
        */
      }

      if (touch) {
        data.touchTimer = Functions.startTimer(data.touchTimer, 5, function() {
          data.$el.on(Events.mouseDown, data, onPointerStart);
        });
      }

      data.touching = false;
    }

    /**
     * @method private
     * @name bindLink
     * @description Bind events to internal links
     * @param $link [object] "Object to bind"
     * @param data [object] "Instance data"
     */

    function bindLink($link, data) {
      $link.on(Events.click, data, onLinkClick);

      // http://www.elijahmanor.com/how-to-access-jquerys-internal-data/
      var events = $._data($link[0], "events")["click"];
      events.unshift(events.pop());
    }

    /**
     * @method private
     * @name onLinkClick
     * @description Handles clicks to internal links
     * @param e [object] "Event data"
     */

    function onLinkClick(e) {
      Functions.killEvent(e, true);
      e.data.$links.off(Events.click);
    }

    /**
     * @method private
     * @name buildEvents
     * @description Builds new event.
     * @param type [type] "Event type"
     * @param oe [object] "Original event"
     * @param x [int] "X value"
     * @param y [int] "Y value"
     * @param scale [float] "Scale value"
     * @param dx [float] "Delta X value"
     * @param dy [float] "Delta Y value"
     */

    function buildEvent(type, oe, px, py, s, dx, dy, dirx, diry) {
      return $.Event(type, {
        originalEvent: oe,
        bubbles: true,
        pageX: px,
        pageY: py,
        scale: s,
        deltaX: dx,
        deltaY: dy,
        directionX: dirx,
        directionY: diry
      });
    }

    /**
     * @method private
     * @name midpoint
     * @description Calculates midpoint.
     * @param a [float] "Value 1"
     * @param b [float] "Value 2"
     */

    function midpoint(a, b) {
      return (a + b) / 2.0;
    }

    /**
     * @method private
     * @name pythagorus
     * @description Pythagorean theorem.
     * @param a [float] "Value 1"
     * @param b [float] "Value 2"
     */

    function pythagorus(a, b) {
      return Math.sqrt((a * a) + (b * b));
    }

    /**
     * @method private
     * @name touchAction
     * @description Set ms touch action on target.
     * @param action [string] "Touch action value"
     */

    function touchAction($target, action) {
      $target.css({
        "-ms-touch-action": action,
        "touch-action": action
      });
    }

    /**
     * @plugin
     * @name Touch
     * @description A jQuery plugin for multi-touch events.
     * @type widget
     * @main touch.js
     * @dependency jQuery
     * @dependency core.js
     */

    var legacyPointer = !(Formstone.window.PointerEvent),
      Plugin = Formstone.Plugin("touch", {
        widget: true,

        /**
         * @options
         * @param axis [string] <null> "Limit axis for pan and swipe; 'x' or 'y'"
         * @param pan [boolean] <false> "Pan events"
         * @param scale [boolean] <false> "Scale events"
         * @param swipe [boolean] <false> "Swipe events"
         * @param threshold [int] <10> "Touch threshold for single axis"
         * @param time [int] <50> "Touch time limit for single axis"
         */

        defaults: {
          axis: false,
          pan: false,
          scale: false,
          swipe: false,
          threshold: 10,
          time: 50
        },

        methods: {
          _construct: construct,
          _destruct: destruct
        },

        events: {
          pointerDown: legacyPointer ? "MSPointerDown" : "pointerdown",
          pointerUp: legacyPointer ? "MSPointerUp" : "pointerup",
          pointerMove: legacyPointer ? "MSPointerMove" : "pointermove",
          pointerCancel: legacyPointer ? "MSPointerCancel" : "pointercancel"
        }
      }),

      // Localize References

      Events = Plugin.events,
      Functions = Plugin.functions,

      // Local

      $Window = Formstone.$window;

    /**
     * @events
     * @event panstart "Panning started"
     * @event pan "Panning"
     * @event panend "Panning ended"
     * @event scalestart "Scaling started"
     * @event scale "Scaling"
     * @event scaleend "Scaling ended"
     * @event swipe "Swipe"
     */

    Events.pan = "pan";
    Events.panStart = "panstart";
    Events.panEnd = "panend";
    Events.scale = "scale";
    Events.scaleStart = "scalestart";
    Events.scaleEnd = "scaleend";
    Events.swipe = "swipe";

  })

);
