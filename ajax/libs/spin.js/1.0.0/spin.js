// https://fgnass.github.com/spin.js
(function(document, undefined) {

/**
 * Copyright (c) 2011 Felix Gnass [fgnass at neteye dot de]
 * Licensed under the MIT license
 *
 * Unfortunately uglify.js doesn't provide an option to de-duplicate strings
 * or to use string-based property access. Hence we have to manually define
 * some string constants in order to keep file-size below our 3K limit, as
 * one of the design goals was to create a script that is smaller than an
 * animated GIF.
 */

  // Supported options
  var width = 'width';
  var length = 'length';
  var radius = 'radius';
  var lines = 'lines';
  var trail = 'trail';
  var color = 'color';
  var opacity = 'opacity';
  var speed = 'speed';
  var shadow = 'shadow';

  var style = 'style';
  var height = 'height';
  var left = 'left';
  var top = 'top';
  var px = 'px';
  var childNodes = 'childNodes';
  var firstChild = 'firstChild';
  var parentNode = 'parentNode';
  var position = 'position';
  var relative = 'relative';
  var absolute = 'absolute';
  var animation = 'animation';
  var transform = 'transform';
  var Origin = 'Origin';
  var coord = 'coord';
  var black = '#000';

  /* Vendor prefixes, separated by zeros */
  var prefixes = "webkit0Moz0ms0O".split(0);

  /* Dynamic animation rules keyed by their name */
  var animations = {};
  var useCssAnimations;

  /**
   * 
   */
  function eachPair(args, it) {
    var end = ~~((args[length]-1)/2);
    for (var i = 1; i <= end; i++) {
      it(args[i*2-1], args[i*2]);
    }
  }

  /**
   * Utility function to create elements. If no tag name is given, a DIV is created.
   */
  function createEl(tag) {
    var el = document.createElement(tag || 'div');
    eachPair(arguments, function(prop, val) {
      el[prop] = val;
    });
    return el;
  }

  function ins(parent, child1, child2) {
    if(child2 && !child2[parentNode]) ins(parent, child2);
    parent.insertBefore(child1, child2||null);
    return parent;
  }

  function styleSheet() {
    var sheets = document.styleSheets;
    if (!sheets[length]) {
      ins(document.documentElement[firstChild], createEl(style));
    }
    return sheets[0];
  }

  /**
   * Creates an opacity keyframe animation rule.
   */
  function addAnimation(to, end) {
    var name = [opacity, end, ~~(to*100)].join('-');
    if (!animations[name]) {
      var sheet = styleSheet();
      var dest = '{' + opacity + ':' + to + '}';
      var i;
      for (i=0; i<prefixes[length]; i++) {
        try {
          sheet.insertRule('@' +
            (prefixes[i] && '-'+prefixes[i].toLowerCase() +'-' || '') +
            'keyframes ' + name + '{0%{' + opacity + ':1}' +
            end + '%' + dest + 'to' + dest + '}', sheet.cssRules[length]);
        }
        catch (err) {
        }
      }
      animations[name] = 1;
    }
    return name;
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   **/
  function vendor(el, prop) {
    var s = el[style];
    if(s[prop] !== undefined) return prop;
    prop = prop.charAt(0).toUpperCase() + prop.slice(1);
    for(var i=0; i<prefixes[length]; i++) {
      var pp = prefixes[i]+prop;
      if(s[pp] !== undefined) return pp;
    }
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el) {
    eachPair(arguments, function(n, val) {
      el[style][vendor(el, n)||n] = val;
    });
    return el;
  }

  /**
   * 
   */
  function defaults(obj) {
    eachPair(arguments, function(prop, val) {
      if (obj[prop] === undefined) obj[prop] = val;
    });
    return obj;
  }

  /** The constructor */
  var Spinner = function Spinner(o) {
    this.el = this[lines](this.opts = defaults(o || {},
      lines, 12,
      trail, 100,
      length, 7,
      width, 5,
      radius, 10,
      color, black,
      opacity, 1/4,
      speed, 1));
  };
  var proto = Spinner.prototype = {
    spin: function(target) {
      var self = this;
      var el = self.el;
      if (target) {
        ins(target, css(el,
          left, ~~(target.offsetWidth/2) + px,
          top, ~~(target.offsetHeight/2) + px
        ), target[firstChild]);
      }
      self.on = 1;
      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var o = self.opts;
        var i = 0;
        var f = 20/o[speed];
        var ostep = (1-o[opacity])/(f*o[trail] / 100);
        var astep = f/o[lines];
        (function anim() {
          i++;
          for (var s=o[lines]; s; s--) {
            var alpha = Math.max(1-(i+s*astep)%f * ostep, o[opacity]);
            self[opacity](el, o[lines]-s, alpha, o);
          }
          if (self.on) setTimeout(anim, 50);
        })();
      }
      return self;
    },
    stop: function() {
      var self = this;
      var el = self.el;

      self.on = 0;
      if (el[parentNode]) el[parentNode].removeChild(el);
      return self;
    }
  };
  proto[lines] = function(o) {
    var el = css(createEl(), position, relative);
    var animationName = addAnimation(o[opacity], o[trail]);
    var i = 0;
    function fill(color, shadow) {
      return css(createEl(),
        position, absolute,
        width, (o[length]+o[width]) + px, 
        height, o[width] + px,
        'background', color,
        'boxShadow', shadow,
        transform + Origin, left,
        transform, 'rotate(' + ~~(360/o[lines]*i) + 'deg) translate(' + o[radius]+px +',0)',
        'borderRadius', '100em'
      );
    }
    for (; i < o[lines]; i++) {
      var seg = css(createEl(), 
        position, absolute, 
        top, 1+~(o[width]/2) + px,
        transform, 'translate3d(0,0,0)',
        animation, animationName + ' ' + 1/o[speed] + 's linear infinite ' + (-1+1/o[lines]* i / o[speed]) + 's'
      );
      if (o[shadow]) ins(seg, css(fill(black, '0 0 4px ' + black), top, 2+px));
      ins(el, ins(seg, fill(o[color], '0 0 1px rgba(0,0,0,.1)')));
    }
    return el;
  };
  proto[opacity] = function(el, i, val) {
    el[childNodes][i][style][opacity] = val;
  };

  ///////////////////////////////////////////////////////////////////////////////
  // VML rendering for IE
  ///////////////////////////////////////////////////////////////////////////////

  var behavior = 'behavior';
  var URL_VML = 'url(#default#VML)';
  var tag = 'group0roundrect0fill0stroke'.split(0);

  /** 
   * Check and init VML support
   */
  (function() {
    var s = css(createEl(tag[0]), behavior, URL_VML);
    if (!vendor(s, transform) && s.adj) {
      // VML support detected. Insert CSS rules for group, shape and stroke.
      var sheet = styleSheet();
      var i;
      for (i=0; i < tag[length]; i++) {
        sheet.addRule(tag[i], behavior + ':' + URL_VML);
      }
      proto[lines] = function() {
        var o = this.opts;
        var r = o[length]+o[width];
        var s = 2*r;

        function grp() {
          return css(createEl(tag[0], coord+'size', s +' '+s, coord+Origin, -r + ' ' + -r), width, s, height, s);
        }

        var g = grp();
        var margin = ~(o[length]+o[radius]+o[width])+px;
        var i;

        function seg(i, dx, filter) {
          ins(g,
            ins(css(grp(), 'rotation', 360 / o[lines] * i + 'deg', left, ~~dx), 
              ins(css(createEl(tag[1], 'arcsize', 1), width, r, height, o[width], left, o[radius], top, -o[width]/2, 'filter', filter),
                createEl(tag[2], color, o[color], opacity, o[opacity]),
                createEl(tag[3], opacity, 0) // transparent stroke to fix color bleeding upon opacity change
              )
            )
          );
        }

        if (o[shadow]) {
          for (i = 1; i <= o[lines]; i++) {
            seg(i, -2, 'progid:DXImage'+transform+'.Microsoft.Blur(pixel'+radius+'=2,make'+shadow+'=1,'+shadow+opacity+'=.3)');
          }
        }
        for (i = 1; i <= o[lines]; i++) {
          seg(i);
        }
        return ins(css(createEl(),
          'margin', margin + ' 0 0 ' + margin,
          position, relative
        ), g);
      };
      proto[opacity] = function(el, i, val, o) {
        o = o[shadow] && o[lines] || 0;
        el[firstChild][childNodes][i+o][firstChild][firstChild][opacity] = val;
      };
    }
    else {
      useCssAnimations = vendor(s, animation);
    }
  })();

  window.Spinner = Spinner;

})(document);