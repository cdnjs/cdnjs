/*!
  * Morpheus - A Brilliant Animator
  * https://github.com/ded/morpheus - (c) Dustin Diaz 2011
  * License MIT
  */
!function (context, doc, win) {

  var html = doc.documentElement,
      rgbOhex = /^rgb\(|#/,
      relVal = /^([+\-])=([\d\.]+)/,
      numUnit = /^(?:[\+\-]=)?\d+(?:\.\d+)?(%|in|cm|mm|em|ex|pt|pc|px)$/,
      // does this browser support the opacity property?
      opasity = function () {
        return typeof doc.createElement('a').style.opacity !== 'undefined';
      }(),
      // these elements do not require 'px'
      unitless = { lineHeight: 1, zoom: 1, zIndex: 1, opacity: 1 },

      // initial style is determined by the elements themselves
      getStyle = doc.defaultView && doc.defaultView.getComputedStyle ?
        function (el, property) {
          var value = null;
          var computed = doc.defaultView.getComputedStyle(el, '');
          computed && (value = computed[camelize(property)]);
          return el.style[property] || value;
        } : html.currentStyle ?

        function (el, property) {
          property = camelize(property);

          if (property == 'opacity') {
            var val = 100;
            try {
              val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity;
            } catch (e1) {
              try {
                val = el.filters('alpha').opacity;
              } catch (e2) {}
            }
            return val / 100;
          }
          var value = el.currentStyle ? el.currentStyle[property] : null;
          return el.style[property] || value;
        } :

        function (el, property) {
          return el.style[camelize(property)];
        },

      rgb = function (r, g, b) {
        return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
      },

      // convert rgb and short hex to long hex
      toHex = function (c) {
        var m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c);
        return (m ? rgb(m[1], m[2], m[3]) : c)
        .replace(/#(\w)(\w)(\w)$/, '#$1$1$2$2$3$3'); // short to long
      },

      // change font-size => fontSize etc.
      camelize = function (s) {
        return s.replace(/-(.)/g, function (m, m1) {
          return m1.toUpperCase();
        });
      },

      fun = function (f) {
        return typeof f == 'function';
      },

      frame = function () {
        // native animation frames
        // http://webstuff.nfshost.com/anim-timing/Overview.html
        // http://dev.chromium.org/developers/design-documents/requestanimationframe-implementation
        return win.requestAnimationFrame  ||
          win.webkitRequestAnimationFrame ||
          win.mozRequestAnimationFrame    ||
          win.oRequestAnimationFrame      ||
          win.msRequestAnimationFrame     ||
          function (callback) {
            win.setTimeout(function () {
              callback(+new Date());
            }, 10);
          };
      }();

  /**
    * Core tween method that requests each frame
    * @param duration: time in milliseconds. defaults to 1000
    * @param fn: tween frame callback function receiving 'position'
    * @param done {optional}: complete callback function
    * @param ease {optional}: easing method. defaults to easeOut
    * @param from {optional}: integer to start from
    * @param to {optional}: integer to end at
    * @returns method to stop the animation
    */
  function tween(duration, fn, done, ease, from, to) {
    ease = ease || function (t) {
      // default to a pleasant-to-the-eye easeOut (like native animations)
      return Math.sin(t * Math.PI / 2)
    };
    var time = duration || 1000,
        diff = to - from,
        start = +new Date(),
        stop = 0,
        end = 0;
    frame(run);

    function run(t) {
      var delta = t - start;
      if (delta > time || stop) {
        to = isFinite(to) ? to : 1;
        stop ? end && fn(to) : fn(to);
        done && done();
        return;
      }
      // if you don't specify a 'to' you can use tween as a generic delta tweener
      // cool, eh?
      isFinite(to) ?
        fn((diff * ease(delta / time)) + from) :
        fn(ease(delta / time));
      frame(run);
    }
    return {
      stop: function (jump) {
        stop = 1;
        end = jump; // jump to end of animation?
      }
    }
  }

  /**
    * generic bezier method for animating x|y coordinates
    * minimum of 2 points required (start and end).
    * first point start, last point end
    * additional control points are optional (but why else would you use this anyway ;)
    * @param points: array containing control points
       [[0, 0], [100, 200], [200, 100]]
    * @param pos: current be(tween) position represented as float  0 - 1
    * @return [x, y]
    */
  function bezier(points, pos) {
    var n = points.length, r = [], i, j;
    for (i = 0; i < n; ++i) {
      r[i] = [points[i][0], points[i][1]];
    }
    for (j = 1; j < n; ++j) {
      for (i = 0; i < n - j; ++i) {
        r[i][0] = (1 - pos) * r[i][0] + pos * r[parseInt(i + 1, 10)][0];
        r[i][1] = (1 - pos) * r[i][1] + pos * r[parseInt(i + 1, 10)][1];
      }
    }
    return [r[0][0], r[0][1]];
  }

  // this gets you the next hex in line according to a 'position'
  function nextColor(pos, start, finish) {
    var r = [], i, e;
    for (i = 0; i < 6; i++) {
      from = Math.min(15, parseInt(start.charAt(i),  16));
      to   = Math.min(15, parseInt(finish.charAt(i), 16));
      e = Math.floor((to - from) * pos + from);
      e = e > 15 ? 15 : e < 0 ? 0 : e;
      r[i] = e.toString(16);
    }
    return '#' + r.join('');
  }

  // this retreives the frame value within a sequence
  function getTweenVal(pos, units, begin, end, k, i, v) {
    if (typeof begin[i][k] == 'string') {
      return nextColor(pos, begin[i][k], end[i][k]);
    } else {
      // round so we don't get crazy long floats
      v = Math.round(((end[i][k] - begin[i][k]) * pos + begin[i][k]) * 1000) / 1000;
      // some css properties don't require a unit (like zIndex, lineHeight, opacity)
      !(k in unitless) && (v += units[i][k] || 'px');
      return v;
    }
  }

  // support for relative movement via '+=n' or '-=n'
  function by(val, start, m, r, i) {
    return (m = relVal.exec(val)) ?
      (i = parseFloat(m[2])) && (r = (start + i)) && m[1] == '+' ?
      r : start - i :
      parseFloat(val);
  }

  /**
    * morpheus:
    * @param element(s): HTMLElement(s)
    * @param options: mixed bag between CSS Style properties & animation options
    *  - {n} CSS properties|values
    *     - value can be strings, integers,
    *     - or callback function that receives element to be animated. method must return value to be tweened
    *     - relative animations start with += or -= followed by integer
    *  - duration: time in ms - defaults to 1000(ms)
    *  - easing: a transition method - defaults to an 'easeOut' algorithm
    *  - complete: a callback method for when all elements have finished
    *  - bezier: array of arrays containing x|y coordinates that define the bezier points. defaults to none
    *     - this may also be a function that receives element to be animated. it must return a value
    */
  function morpheus(elements, options) {
    var els = elements ? (els = isFinite(elements.length) ? elements : [elements]) : [], i,
        complete = options.complete,
        duration = options.duration,
        ease = options.easing,
        points = options.bezier,
        begin = [],
        end = [],
        units = [],
        bez = [],
        originalLeft,
        originalTop;

    delete options.complete;
    delete options.duration;
    delete options.easing;
    delete options.bezier;

    if (points) {
      // remember the original values for top|left
      originalLeft = options.left;
      originalTop = options.top;
      delete options.right;
      delete options.bottom;
      delete options.left;
      delete options.top;
    }

    for (i = els.length; i--;) {

      // record beginning and end states to calculate positions
      begin[i] = {};
      end[i] = {};
      units[i] = {};

      // are we 'moving'?
      if (points) {

        var left = getStyle(els[i], 'left'),
            top = getStyle(els[i], 'top'),
            xy = [by(fun(originalLeft) ? originalLeft(els[i]) : originalLeft || 0, parseFloat(left)),
                  by(fun(originalTop) ? originalTop(els[i]) : originalTop || 0, parseFloat(top))];

        bez[i] = fun(points) ? points(els[i], xy) : points;
        bez[i].push(xy);
        bez[i].unshift([
          parseInt(left, 10),
          parseInt(top, 10)
        ]);
      }

      for (var k in options) {
        var v = getStyle(els[i], k), unit,
            tmp = fun(options[k]) ? options[k](els[i]) : options[k]
        if (typeof tmp == 'string' &&
            rgbOhex.test(tmp) &&
            !rgbOhex.test(v)) {
          delete options[k]; // remove key :(
          continue; // cannot animate colors like 'orange' or 'transparent'
                    // only #xxx, #xxxxxx, rgb(n,n,n)
        }

        begin[i][k] = typeof tmp == 'string' && rgbOhex.test(tmp) ?
          toHex(v).slice(1) :
          parseFloat(v);
        end[i][k] = typeof tmp == 'string' && tmp.charAt(0) == '#' ?
          toHex(tmp).slice(1) :
          by(tmp, parseFloat(v));
        // record original unit
        typeof tmp == 'string' && (unit = tmp.match(numUnit)) && (units[i][k] = unit[1]);
      }
    }
    // ONE TWEEN TO RULE THEM ALL
    return tween(duration, function (pos, v, xy) {
      // normally not a fan of optimizing for() loops, but we want something
      // fast for animating
      for (i = els.length; i--;) {
        if (points) {
          xy = bezier(bez[i], pos);
          els[i].style.left = xy[0] + 'px';
          els[i].style.top = xy[1] + 'px';
        }
        for (var k in options) {
          v = getTweenVal(pos, units, begin, end, k, i);
          k == 'opacity' && !opasity ?
            (els[i].style.filter = 'alpha(opacity=' + (v * 100) + ')') :
            (els[i].style[camelize(k)] = v);
        }
      }
    }, complete, ease);
  }

  // expose useful methods
  morpheus.tween = tween;
  morpheus.getStyle = getStyle;
  morpheus.bezier = bezier;

  typeof module !== 'undefined' && module.exports &&
    (module.exports = morpheus);
  context['morpheus'] = morpheus;

}(this, document, window);