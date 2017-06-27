/** js sequence diagrams
 *  http://bramp.github.io/js-sequence-diagrams/
 *  (c) 2012-2013 Andrew Brampton (bramp.net)
 *  Simplified BSD license.
 */
(function () {
  "use strict";
  /*global Diagram, Raphael, _ */

  // Following the CSS convention
  // Margin is the gap outside the box
  // Padding is the gap inside the box
  // Each object has x/y/width/height properties
  // The x/y should be top left corner
  // width/height is with both margin and padding

  // TODO
  // Image width is wrong, when there is a note in the right hand col
  // Title box could look better
  // Note box could look better

  var DIAGRAM_MARGIN = 10;

  var ACTOR_MARGIN   = 10; // Margin around a actor
  var ACTOR_PADDING  = 10; // Padding inside a actor

  var SIGNAL_MARGIN  = 5; // Margin around a signal
  var SIGNAL_PADDING = 5; // Padding inside a signal

  var NOTE_MARGIN   = 10; // Margin around a note
  var NOTE_PADDING  = 5; // Padding inside a note
  var NOTE_OVERLAP  = 15; // Overlap when using a "note over A,B"

  var TITLE_MARGIN   = 0;
  var TITLE_PADDING  = 5;

  var SELF_SIGNAL_WIDTH = 20; // How far out a self signal goes

  var PLACEMENT = Diagram.PLACEMENT;
  var LINETYPE  = Diagram.LINETYPE;
  var ARROWTYPE = Diagram.ARROWTYPE;

  var LINE = {
    'stroke': '#000',
    'stroke-width': 2
  };

  var RECT = {
    'fill': "#fff"
  };

  function AssertException(message) { this.message = message; }
  AssertException.prototype.toString = function () {
    return 'AssertException: ' + this.message;
  };

  function assert(exp, message) {
    if (!exp) {
      throw new AssertException(message);
    }
  }

  if (!String.prototype.trim) {
    String.prototype.trim=function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }

/******************
 * Drawing extras
 ******************/

  function getCenterX(box) {
    return box.x + box.width / 2;
  }

  function getCenterY(box) {
    return box.y + box.height / 2;
  }

/******************
 * Raphaël extras
 ******************/

  Raphael.fn.line = function(x1, y1, x2, y2) {
    assert(_.all([x1,x2,y1,y2], _.isFinite), "x1,x2,y1,y2 must be numeric");
    return this.path("M{0},{1} L{2},{3}", x1, y1, x2, y2);
  };

  Raphael.fn.wobble = function(x1, y1, x2, y2) {
    assert(_.all([x1,x2,y1,y2], _.isFinite), "x1,x2,y1,y2 must be numeric");

    var wobble = Math.sqrt( (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) / 25;

    // Distance along line
    var r1 = Math.random();
    var r2 = Math.random();

    var xfactor = Math.random() > 0.5 ? wobble : -wobble;
    var yfactor = Math.random() > 0.5 ? wobble : -wobble;

    var p1 = {
      x: (x2 - x1) * r1 + x1 + xfactor,
      y: (y2 - y1) * r1 + y1 + yfactor
    };

    var p2 = {
      x: (x2 - x1) * r2 + x1 - xfactor,
      y: (y2 - y1) * r2 + y1 - yfactor
    };

    return "C" + p1.x + "," + p1.y +
      " " + p2.x + "," + p2.y +
      " " + x2 + "," + y2;
  };

  /**
   * Returns the text's bounding box
   */
  Raphael.fn.text_bbox = function (text, font) {
    var p;
    if (font._obj) {
      p = this.print_center(0, 0, text, font._obj, font['font-size']);
    } else {
      p = this.text(0, 0, text);
      p.attr(font);
    }

    var bb = p.getBBox();
    p.remove();

    return bb;
  };

  /**
   * Draws a wobbly (hand drawn) rect
   */
  Raphael.fn.handRect = function (x, y, w, h) {
    assert(_.all([x, y, w, h], _.isFinite), "x, y, w, h must be numeric");
    return this.path("M" + x + "," + y +
      this.wobble(x, y, x + w, y) +
      this.wobble(x + w, y, x + w, y + h) +
      this.wobble(x + w, y + h, x, y + h) +
      this.wobble(x, y + h, x, y))
      .attr(RECT);
  };

  /**
   * Draws a wobbly (hand drawn) line
   */
  Raphael.fn.handLine = function (x1, y1, x2, y2) {
    assert(_.all([x1,x2,y1,y2], _.isFinite), "x1,x2,y1,y2 must be numeric");
    return this.path("M" + x1 + "," + y1 + this.wobble(x1, y1, x2, y2));
  };

  /**
   * Prints, but aligns text in a similar way to text(...)
   */
  Raphael.fn.print_center = function(x, y, string, font, size, letter_spacing) {
    var path = this.print(x, y, string, font, size, 'baseline', letter_spacing);
    var bb = path.getBBox();

    // Translate the text so it's centered.
    var dx = (x - bb.x) - bb.width / 2;
    var dy = (y - bb.y) - bb.height / 2;

    // Due to an issue in Raphael 2.1.0 (that seems to be fixed later)
    // we remap the path itself, instead of using a transformation matrix
    var m = new Raphael.matrix();
    m.translate(dx, dy);
    return path.attr('path', Raphael.mapPath(path.attr('path'), m));

    // otherwise we would do this:
    //return path.transform("t" + dx + "," + dy);
  };

/******************
 * BaseTheme
 ******************/

  var BaseTheme = function(diagram) {
    this.init(diagram);
  };

  _.extend(BaseTheme.prototype, {
    init : function(diagram) {
      this.diagram = diagram;
      this._paper  = undefined;
      this._font   = undefined;

      this._title  = undefined; // hack - This should be somewhere better

      this._actors_height  = 0;
      this._signals_height = 0;

      var a = this.arrow_types = {};
      a[ARROWTYPE.FILLED] = 'block';
      a[ARROWTYPE.OPEN]   = 'open';

      var l = this.line_types = {};
      l[LINETYPE.SOLID]  = '';
      l[LINETYPE.DOTTED] = '-';
    },

    init_paper : function(container) {
      this._paper = new Raphael(container, 320, 200);
    },

    init_font : function() {},

    draw_line : function(x1, y1, x2, y2) {
      return this._paper.line(x1, y1, x2, y2);
    },

    draw_rect : function(x, y, w, h) {
      return this._paper.rect(x, y, w, h);
    },

    draw : function(container) {
      var diagram = this.diagram;
      this.init_paper(container);
      this.init_font();

      this.layout();

      var title_height = this._title ? this._title.height : 0;

      this._paper.setStart();
      this._paper.setSize(diagram.width, diagram.height);

      var y = DIAGRAM_MARGIN + title_height;

      this.draw_title();
      this.draw_actors(y);
      this.draw_signals(y + this._actors_height);

      this._paper.setFinish();
    },

    layout : function() {
      // Local copies
      var diagram = this.diagram;
      var paper   = this._paper;
      var font    = this._font;
      var actors  = diagram.actors;
      var signals = diagram.signals;

      diagram.width = 0;  // min width
      diagram.height = 0; // min width

      // Setup some layout stuff
      if (diagram.title) {
        var title = this._title = {};
        var bb = paper.text_bbox(diagram.title, font);
        title.text_bb = bb;
        title.message = diagram.title;

        title.width  = bb.width  + (TITLE_PADDING + TITLE_MARGIN) * 2;
        title.height = bb.height + (TITLE_PADDING + TITLE_MARGIN) * 2;
        title.x = DIAGRAM_MARGIN;
        title.y = DIAGRAM_MARGIN;

        diagram.width  += title.width;
        diagram.height += title.height;
      }

      _.each(actors, function(a) {
        var bb = paper.text_bbox(a.name, font);
        a.text_bb = bb;

        //var bb = t.attr("text", a.name).getBBox();
        a.x = 0; a.y = 0;
        a.width  = bb.width  + (ACTOR_PADDING + ACTOR_MARGIN) * 2;
        a.height = bb.height + (ACTOR_PADDING + ACTOR_MARGIN) * 2;

        a.distances = [];
        a.padding_right = 0;
        this._actors_height = Math.max(a.height, this._actors_height);
      }, this);

      function actor_ensure_distance(a, b, d) {
        assert(a < b, "a must be less than or equal to b");

        if (a < 0) {
          // Ensure b has left margin
          b = actors[b];
          b.x = Math.max(d - b.width / 2, b.x);
        } else if (b >= actors.length) {
          // Ensure a has right margin
          a = actors[a];
          a.padding_right = Math.max(d, a.padding_right);
        } else {
          a = actors[a];
          a.distances[b] = Math.max(d, a.distances[b] ? a.distances[b] : 0);
        }
      }

      _.each(signals, function(s) {
        var a, b; // Indexes of the left and right actors involved

        var bb = paper.text_bbox(s.message, font);

        //var bb = t.attr("text", s.message).getBBox();
        s.text_bb = bb;
        s.width   = bb.width;
        s.height  = bb.height;

        var extra_width = 0;

        if (s.type == "Signal") {

          s.width  += (SIGNAL_MARGIN + SIGNAL_PADDING) * 2;
          s.height += (SIGNAL_MARGIN + SIGNAL_PADDING) * 2;

          if (s.isSelf()) {
            a = s.actorA.index;
            b = a + 1;
            s.width += SELF_SIGNAL_WIDTH;
          } else {
            a = Math.min(s.actorA.index, s.actorB.index);
            b = Math.max(s.actorA.index, s.actorB.index);
          }

        } else if (s.type == "Note") {
          s.width  += (NOTE_MARGIN + NOTE_PADDING) * 2;
          s.height += (NOTE_MARGIN + NOTE_PADDING) * 2;

          // HACK lets include the actor's padding
          extra_width = 2 * ACTOR_MARGIN;

          if (s.placement == PLACEMENT.LEFTOF) {
            b = s.actor.index;
            a = b - 1;
          } else if (s.placement == PLACEMENT.RIGHTOF) {
            a = s.actor.index;
            b = a + 1;
          } else if (s.placement == PLACEMENT.OVER && s.hasManyActors()) {
            // Over multiple actors
            a = Math.min(s.actor[0].index, s.actor[1].index);
            b = Math.max(s.actor[0].index, s.actor[1].index);

            // We don't need our padding, and we want to overlap
            extra_width = - (NOTE_PADDING * 2 + NOTE_OVERLAP * 2);

          } else if (s.placement == PLACEMENT.OVER) {
            // Over single actor
            a = s.actor.index;
            actor_ensure_distance(a - 1, a, s.width / 2);
            actor_ensure_distance(a, a + 1, s.width / 2);
            this._signals_height += s.height;

            return; // Bail out early
          }
        } else {
          throw new Error("Unhandled signal type:" + s.type);
        }

        actor_ensure_distance(a, b, s.width + extra_width);
        this._signals_height += s.height;
      }, this);

      // Re-jig the positions
      var actors_x = 0;
      _.each(actors, function(a) {
        a.x = Math.max(actors_x, a.x);

        // TODO This only works if we loop in sequence, 0, 1, 2, etc
        _.each(a.distances, function(distance, b) {
          // lodash (and possibly others) do not like sparse arrays
          // so sometimes they return undefined
          if (typeof distance == "undefined")
            return;

          b = actors[b];
          distance = Math.max(distance, a.width / 2, b.width / 2);
          b.x = Math.max(b.x, a.x + a.width/2 + distance - b.width/2);
        });

        actors_x = a.x + a.width + a.padding_right;
      }, this);

      diagram.width = Math.max(actors_x, diagram.width);

      // TODO Refactor a little
      diagram.width  += 2 * DIAGRAM_MARGIN;
      diagram.height += 2 * DIAGRAM_MARGIN + 2 * this._actors_height + this._signals_height;

      return this;
    },

    draw_title : function() {
      var title = this._title;
      if (title)
        this.draw_text_box(title, title.message, TITLE_MARGIN, TITLE_PADDING, this._font);
    },

    draw_actors : function(offsetY) {
      var y = offsetY;
      _.each(this.diagram.actors, function(a) {
        // Top box
        this.draw_actor(a, y, this._actors_height);

        // Bottom box
        this.draw_actor(a, y + this._actors_height + this._signals_height, this._actors_height);

        // Veritical line
        var aX = getCenterX(a);
        var line = this.draw_line(
          aX, y + this._actors_height - ACTOR_MARGIN,
          aX, y + this._actors_height + ACTOR_MARGIN + this._signals_height);
        line.attr(LINE);
      }, this);
    },

    draw_actor : function (actor, offsetY, height) {
      actor.y      = offsetY;
      actor.height = height;
      this.draw_text_box(actor, actor.name, ACTOR_MARGIN, ACTOR_PADDING, this._font);
    },

    draw_signals : function (offsetY) {
      var y = offsetY;
      _.each(this.diagram.signals, function(s) {
        if (s.type == "Signal") {
          if (s.isSelf()) {
            this.draw_self_signal(s, y);
          } else {
            this.draw_signal(s, y);
          }

        } else if (s.type == "Note") {
          this.draw_note(s, y);
        }

        y += s.height;
      }, this);
    },

    draw_self_signal : function(signal, offsetY) {
      assert(signal.isSelf(), "signal must be a self signal");

      var text_bb = signal.text_bb;
      var aX = getCenterX(signal.actorA);

      var x = aX + SELF_SIGNAL_WIDTH + SIGNAL_PADDING - text_bb.x;
      var y = offsetY + signal.height / 2;

      this.draw_text(x, y, signal.message, this._font);

      var attr = _.extend({}, LINE, {
        'stroke-dasharray': this.line_types[signal.linetype]
      });

      var y1 = offsetY + SIGNAL_MARGIN;
      var y2 = y1 + signal.height - SIGNAL_MARGIN;

      // Draw three lines, the last one with a arrow
      var line;
      line = this.draw_line(aX, y1, aX + SELF_SIGNAL_WIDTH, y1);
      line.attr(attr);

      line = this.draw_line(aX + SELF_SIGNAL_WIDTH, y1, aX + SELF_SIGNAL_WIDTH, y2);
      line.attr(attr);

      line = this.draw_line(aX + SELF_SIGNAL_WIDTH, y2, aX, y2);
      attr['arrow-end'] = this.arrow_types[signal.arrowtype] + '-wide-long';
      line.attr(attr);
    },

    draw_signal : function (signal, offsetY) {
      var aX = getCenterX( signal.actorA );
      var bX = getCenterX( signal.actorB );

      // Mid point between actors
      var x = (bX - aX) / 2 + aX;
      var y = offsetY + SIGNAL_MARGIN + 2*SIGNAL_PADDING;

      // Draw the text in the middle of the signal
      this.draw_text(x, y, signal.message, this._font);

      // Draw the line along the bottom of the signal
      y = offsetY + signal.height - SIGNAL_MARGIN - SIGNAL_PADDING;
      var line = this.draw_line(aX, y, bX, y);
      line.attr(LINE);
      line.attr({
        'arrow-end': this.arrow_types[signal.arrowtype] + '-wide-long',
        'stroke-dasharray': this.line_types[signal.linetype]
      });

      //var ARROW_SIZE = 16;
      //var dir = this.actorA.x < this.actorB.x ? 1 : -1;
      //draw_arrowhead(bX, offsetY, ARROW_SIZE, dir);
    },

    draw_note : function (note, offsetY) {
      note.y = offsetY;
      var actorA = note.hasManyActors() ? note.actor[0] : note.actor;
      var aX = getCenterX( actorA );
      switch (note.placement) {
        case PLACEMENT.RIGHTOF:
          note.x = aX + ACTOR_MARGIN;
          break;
        case PLACEMENT.LEFTOF:
          note.x = aX - ACTOR_MARGIN - note.width;
          break;
        case PLACEMENT.OVER:
          if (note.hasManyActors()) {
            var bX = getCenterX( note.actor[1] );
            var overlap = NOTE_OVERLAP + NOTE_PADDING;
            note.x = aX - overlap;
            note.width = (bX + overlap) - note.x;
          } else {
            note.x = aX - note.width / 2;
          }
          break;
        default:
          throw new Error("Unhandled note placement:" + note.placement);
      }

      this.draw_text_box(note, note.message, NOTE_MARGIN, NOTE_PADDING, this._font);
    },

    /**
     * Draws text with a white background
     * x,y (int) x,y center point for this text
     * TODO Horz center the text when it's multi-line print
     */
    draw_text : function (x, y, text, font) {
      var paper = this._paper;
      var f = font || {};
      var t;
      if (f._obj) {
        t = paper.print_center(x, y, text, f._obj, f['font-size']);
      } else {
        t = paper.text(x, y, text);
        t.attr(f);
      }
      // draw a rect behind it
      var bb = t.getBBox();
      var r = paper.rect(bb.x, bb.y, bb.width, bb.height);
      r.attr({'fill': "#fff", 'stroke': 'none'});

      t.toFront();
    },

    draw_text_box : function (box, text, margin, padding, font) {
      var x = box.x + margin;
      var y = box.y + margin;
      var w = box.width  - 2 * margin;
      var h = box.height - 2 * margin;

      // Draw inner box
      var rect = this.draw_rect(x, y, w, h);
      rect.attr(LINE);

      // Draw text (in the center)
      x = getCenterX(box);
      y = getCenterY(box);

      this.draw_text(x, y, text, font);
    }

    /**
     * Draws a arrow head
     * direction must be -1 for left, or 1 for right
     */
    //function draw_arrowhead(x, y, size, direction) {
    //  var dx = (size/2) * direction;
    //  var dy = (size/2);
    //
    //  y -= dy; x -= dx;
    //  var p = this._paper.path("M" + x + "," + y + "v" + size + "l" + dx + ",-" + (size/2) + "Z");
    //}
  });

/******************
 * RaphaëlTheme
 ******************/

  var RaphaëlTheme = function(diagram) {
    this.init(diagram);
  };

  _.extend(RaphaëlTheme.prototype, BaseTheme.prototype, {

    init_font : function() {
      this._font = {
        'font-size': 16,
        'font-family': 'Andale Mono, monospace'
      };
    }

  });

/******************
 * HandRaphaëlTheme
 ******************/

  var HandRaphaëlTheme = function(diagram) {
    this.init(diagram);
  };

  // Take the standard RaphaëlTheme and make all the lines wobbly
  _.extend(HandRaphaëlTheme.prototype, BaseTheme.prototype, {
    init_font : function() {
      this._font = {
        'font-size': 16,
        'font-family': 'daniel'
      };

      this._font._obj = this._paper.getFont('daniel');
    },

    draw_line : function(x1, y1, x2, y2) {
      return this._paper.handLine(x1, y1, x2, y2);
    },

    draw_rect : function(x, y, w, h) {
      return this._paper.handRect(x, y, w, h);
    }
  });

  var themes = {
    simple : RaphaëlTheme,
    hand  : HandRaphaëlTheme
  };

  Diagram.prototype.drawSVG = function (container, options) {
    var default_options = {
      theme: 'hand'
    };

    options = _.defaults(options || {}, default_options);

    if (!(options.theme in themes))
      throw new Error("Unsupported theme: " + options.theme);

    var drawing = new themes[options.theme](this);
    drawing.draw(container);

  }; // end of drawSVG

}());