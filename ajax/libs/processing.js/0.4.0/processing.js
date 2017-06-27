/*

    P R O C E S S I N G - 0 . 4 . J S
    a port of the Processing visualization language
    
    License       : MIT 
    Developer     : John Resig: http://ejohn.org
    Web Site      : http://processingjs.org  
    Java Version  : http://processing.org
    Github Repo.  : http://github.com/jeresig/processing-js
    Bug Tracking  : http://processing-js.lighthouseapp.com
    Mozilla POW!  : http://wiki.Mozilla.org/Education/Projects/ProcessingForTheWeb
    Maintained by : Seneca: http://zenit.senecac.on.ca/wiki/index.php/Processing.js
                    Hyper-Metrix: http://hyper-metrix.com/#Processing

  */

(function () {

  this.Processing = function Processing(aElement, aCode) {

    // Get the DOM element if string was passed
    if (typeof aElement === "string") {
      aElement = document.getElementById(aElement);
    }

    // Build an Processing functions and env. vars into 'p'  
    var p = Processing.build(aElement);

    // Send aCode Processing syntax to be converted to JavaScript
    if (aCode) {
      p.init(aCode);
    }

    return p;

  };

  // Share lib space
  Processing.lib = {};

  // IE Unfriendly AJAX Method
  var ajax = function (url) {
    var AJAX = new window.XMLHttpRequest();
    if (AJAX) {
      AJAX.open("GET", url + "?t=" + new Date().getTime(), false);
      AJAX.send(null);
      return AJAX.responseText;
    } else {
      return false;
    }
  };

  // Automatic Initialization Method
  var init = function () {
    var canvas = document.getElementsByTagName('canvas');

    for (var i = 0, l = canvas.length; i < l; i++) {
      var datasrc = canvas[i].getAttribute('datasrc');
      if (datasrc) {
        Processing(canvas[i], ajax(datasrc));
      }
    }

  };

  document.addEventListener('DOMContentLoaded', function () {
    init();
  },
  false);

  // Place-holder for debugging function
  Processing.debug = function (e) {
  };

  // Parse Processing (Java-like) syntax to JavaScript syntax with Regex
  Processing.parse = function parse(aCode, p) {
    // Remove end-of-line comments
    aCode = aCode.replace(/\/\/ .*\n/g, "\n");

    // Weird parsing errors with %
    aCode = aCode.replace(/([^\s])%([^\s])/g, "$1 % $2");

    // Since frameRate() and frameRate are different things,
    // we need to differentiate them somehow. So when we parse
    // the Processing.js source, replace frameRate so it isn't
    // confused with frameRate().
    aCode = aCode.replace(/(\s*=\s*|\(*\s*)frameRate(\s*\)+?|\s*;)/, "$1p.FRAME_RATE$2");

    // Simple convert a function-like thing to function
    aCode = aCode.replace(/(?:static )?(\w+(?:\[\])* )(\w+)\s*(\([^\)]*\)\s*\{)/g, function (all, type, name, args) {
      if (name === "if" || name === "for" || name === "while") {
        return all;
      } else {
        return "Processing." + name + " = function " + name + args;
      }
    });

    // Attach import() to p{} bypassing JS command, allowing for extrernal library loading
    aCode = aCode.replace(/import \(|import\(/g, "p.Import(");

    // Force .length() to be .length
    aCode = aCode.replace(/\.length\(\)/g, ".length");

    // foo( int foo, float bar )
    aCode = aCode.replace(/([\(,]\s*)(\w+)((?:\[\])+| )\s*(\w+\s*[\),])/g, "$1$4");
    aCode = aCode.replace(/([\(,]\s*)(\w+)((?:\[\])+| )\s*(\w+\s*[\),])/g, "$1$4");

    // float[] foo = new float[5];
    aCode = aCode.replace(/new (\w+)((?:\[([^\]]*)\])+)/g, function (all, name, args) {
      return "new ArrayList(" + args.replace(/\[\]/g, "[0]").slice(1, -1).split("][").join(", ") + ")";
      //return "new ArrayList(" + args.slice(1, -1).split("][").join(", ") + ")";
    });

    // What does this do? This does the same thing as "Fix Array[] foo = {...} to [...]" below
    aCode = aCode.replace(/(?:static )?\w+\[\]\s*(\w+)\[?\]?\s*=\s*\{.*?\};/g, function (all) {
      return all.replace(/\{/g, "[").replace(/\}/g, "]");
    });

    // int|float foo;
    var intFloat = /(\n\s*(?:int|float)(?!\[\])*(?:\s*|[^\(;]*?,\s*))([a-zA-Z]\w*)\s*(,|;)/i;
    while (intFloat.test(aCode)) {
      aCode = aCode.replace(new RegExp(intFloat), function (all, type, name, sep) {
        return type + " " + name + " = 0" + sep;
      });
    }

    // float foo = 5;
    aCode = aCode.replace(/(?:static\s+)?(?:final\s+)?(\w+)((?:\[\])+| ) *(\w+)\[?\]?(\s*[=,;])/g, function (all, type, arr, name, sep) {
      if (type === "return") {
        return all;
      } else {
        return "var " + name + sep;
      }
    });

    // Fix Array[] foo = {...} to [...]
    aCode = aCode.replace(/\=\s*\{((.|\s)*?)\};/g, function (all, data) {
      return "= [" + data.replace(/\{/g, "[").replace(/\}/g, "]") + "]";
    });

    // super() is a reserved word
    aCode = aCode.replace(/super\(/g, "superMethod(");

    var classes = ["int", "float", "boolean", "String", "byte", "double", "long"];

    var classReplace = function (all, name, extend, vars, last) {
      classes.push(name);

      var staticVar = "";

      vars = vars.replace(/final\s+var\s+(\w+\s*=\s*.*?;)/g, function (all, set) {
        staticVar += " " + name + "." + set;
        return "";
      });


      // Move arguments up from constructor and wrap contents with
      // a with(this), and unwrap constructor
      return "function " + name + "() {with(this){\n " + (extend ? "var __self=this;function superMethod(){extendClass(__self,arguments," + extend + ");}\n" : "") +
      // Replace var foo = 0; with this.foo = 0;
      // and force var foo; to become this.foo = null;
      vars.replace(/\s*,\s*/g, ";\n  this.").replace(/\b(var |final |public )+\s*/g, "this.").replace(/\b(var |final |public )+\s*/g, "this.").replace(/this\.(\w+);/g, "this.$1 = null;") + (extend ? "extendClass(this, " + extend + ");\n" : "") + "<CLASS " + name + " " + staticVar + ">" + (typeof last === "string" ? last : name + "(");

    };

    var nextBrace = function (right) {
      var rest = right,
        position = 0,
        leftCount = 1,
        rightCount = 0;

      while (leftCount !== rightCount) {
        var nextLeft = rest.indexOf("{"),
          nextRight = rest.indexOf("}");

        if (nextLeft < nextRight && nextLeft !== -1) {
          leftCount++;
          rest = rest.slice(nextLeft + 1);
          position += nextLeft + 1;
        } else {
          rightCount++;
          rest = rest.slice(nextRight + 1);
          position += nextRight + 1;
        }
      }

      return right.slice(0, position - 1);
    };

    var matchClasses = /(?:public |abstract |static )*class (\w+)\s*(?:extends\s*(\w+)\s*)?\{\s*((?:.|\n)*?)\b\1\s*\(/g;
    var matchNoCon = /(?:public |abstract |static )*class (\w+)\s*(?:extends\s*(\w+)\s*)?\{\s*((?:.|\n)*?)(Processing)/g;

    aCode = aCode.replace(matchClasses, classReplace);
    aCode = aCode.replace(matchNoCon, classReplace);

    var matchClass = /<CLASS (\w+) (.*?)>/,
      m;

    while ((m = aCode.match(matchClass))) {
      var left = RegExp.leftContext,
        allRest = RegExp.rightContext,
        rest = nextBrace(allRest),
        className = m[1],
        staticVars = m[2] || "";

      allRest = allRest.slice(rest.length + 1);

      rest = rest.replace(new RegExp("\\b" + className + "\\(([^\\)]*?)\\)\\s*{", "g"), function (all, args) {
        args = args.split(/,\s*?/);

        if (args[0].match(/^\s*$/)) {
          args.shift();
        }

        var fn = "if ( arguments.length === " + args.length + " ) {\n";

        for (var i = 0; i < args.length; i++) {
          fn += " var " + args[i] + " = arguments[" + i + "];\n";
        }

        return fn;
      });

      // Fix class method names
      // this.collide = function() { ... }
      // and add closing } for with(this) ...
      rest = rest.replace(/(?:public )?Processing.\w+ = function (\w+)\((.*?)\)/g, function (all, name, args) {
        return "ADDMETHOD(this, '" + name + "', function(" + args + ")";
      });

      var matchMethod = /ADDMETHOD([\s\S]*?\{)/,
        mc;
      var methods = "";

      while ((mc = rest.match(matchMethod))) {
        var prev = RegExp.leftContext,
          allNext = RegExp.rightContext,
          next = nextBrace(allNext);

        methods += "addMethod" + mc[1] + next + "});";

        rest = prev + allNext.slice(next.length + 1);
      }

      rest = methods + rest;

      aCode = left + rest + "\n}}" + staticVars + allRest;
    }

    // Do some tidying up, where necessary
    aCode = aCode.replace(/Processing.\w+ = function addMethod/g, "addMethod");


    // Check if 3D context is invoked -- this is not the best way to do this.
    if (aCode.match(/size\((?:.+),(?:.+),\s*OPENGL\);/)) {
      p.use3DContext = true;
    }

    // Handle (int) Casting
    aCode = aCode.replace(/\(int\)/g, "0|");

    // Remove Casting
    aCode = aCode.replace(new RegExp("\\((" + classes.join("|") + ")(\\[\\])*\\)", "g"), "");

    // Force numbers to exist //
    //aCode = aCode.replace(/([^.])(\w+)\s*\+=/g, "$1$2 = ($2||0) +");
    //! // Force characters-as-bytes to work --> Ping: Andor
    aCode = aCode.replace(/('[a-zA-Z0-9]')/g, "$1.charCodeAt(0)");

    var toNumbers = function (str) {
      var ret = [];

      str.replace(/(..)/g, function (str) {
        ret.push(parseInt(str, 16));
      });

      return ret;
    };

    // Convert #aaaaaa into color
    aCode = aCode.replace(/#([a-f0-9]{6})/ig, function (m, hex) {
      var num = toNumbers(hex);
      return "DefaultColor(" + num[0] + "," + num[1] + "," + num[2] + ")";
    });

    // Convert 3.0f to just 3.0
    aCode = aCode.replace(/(\d+)f/g, "$1");

    return aCode;
  };

  // Attach Processing functions to 'p'
  Processing.build = function buildProcessing(curElement) {

    // Create the 'p' object
    var p = {};
    var curElement = curElement;
    var curContext;

    p.use3DContext = false; // default '2d' canvas context
    
    for (var i in Processing.lib) {
      if (1) {
        p[i] = window.Processing.lib[i];
      }
    }

    // Set Processing defaults / environment variables
    p.name = 'Processing.js Instance';
    p.PI = Math.PI;
    p.TWO_PI = 2 * p.PI;
    p.HALF_PI = p.PI / 2;
    p.MAX_FLOAT = 3.4028235e+38;
    p.MIN_FLOAT = -3.4028235e+38;
    p.MAX_INT = 2147483647;
    p.MIN_INT = -2147483648;
    p.P3D = 3;
    p.CORNER = 0;
    p.RADIUS = 1;
    p.CENTER_RADIUS = 1;
    p.CENTER = 2;
    p.POLYGON = 2;
    p.QUADS = 5;
    p.TRIANGLES = 6;
    p.POINTS = 7;
    p.LINES = 8;
    p.TRIANGLE_STRIP = 9;
    p.TRIANGLE_FAN = 4;
    p.QUAD_STRIP = 3;
    p.CORNERS = 10;
    p.CLOSE = true;
    p.RGB = 1;
    p.HSB = 2;
    p.OPENGL = 'OPENGL';
    p.FRAME_RATE = 0;
    p.focused = true;
    p.ARROW = 'default';
    p.CROSS = 'crosshair';
    p.HAND = 'pointer';
    p.MOVE = 'move';
    p.TEXT = 'text';
    p.WAIT = 'wait';
    p.NOCURSOR = "url('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='), auto";
    p.ALPHA_MASK = 0xff000000;
    p.RED_MASK = 0x00ff0000;
    p.GREEN_MASK = 0x0000ff00;
    p.BLUE_MASK = 0x000000ff;
    p.REPLACE = 0;
    p.BLEND = 1 << 0;
    p.ADD = 1 << 1;
    p.SUBTRACT = 1 << 2;
    p.LIGHTEST = 1 << 3;
    p.DARKEST = 1 << 4;
    p.DIFFERENCE = 1 << 5;
    p.EXCLUSION = 1 << 6;
    p.MULTIPLY = 1 << 7;
    p.SCREEN = 1 << 8;
    p.OVERLAY = 1 << 9;
    p.HARD_LIGHT = 1 << 10;
    p.SOFT_LIGHT = 1 << 11;
    p.DODGE = 1 << 12;
    p.BURN = 1 << 13;
    p.PRECISIONB = 15; // fixed point precision is limited to 15 bits!! 
    p.PRECISIONF = 1 << p.PRECISIONB;
    p.PREC_MAXVAL = p.PRECISIONF - 1;
    p.PREC_ALPHA_SHIFT = 24 - p.PRECISIONB;
    p.PREC_RED_SHIFT = 16 - p.PRECISIONB;
    p.ROUND = 'round'; // Used by both cap and join.
    p.SQUARE = 'butt'; // Used by cap.
    p.PROJECT = 'square'; // Used by cap.
    p.MITER = 'miter'; // Used by join.
    p.BEVEL = 'bevel'; // Used by join.
    // KeyCode Table
    p.CENTER = 88888880;
    p.CODED = 88888888;
    p.UP = 88888870;
    p.RIGHT = 88888871;
    p.DOWN = 88888872;
    p.LEFT = 88888869;

    //! // Description required...
    p.codedKeys = [69, 70, 71, 72];


    // "Private" variables used to maintain state
    var online = true,
      doFill = true,
      doStroke = true,
      loopStarted = false,
      hasBackground = false,
      doLoop = true,
      looping = 0,
      curRectMode = p.CORNER,
      curEllipseMode = p.CENTER,
      inSetup = false,
      inDraw = false,
      curBackground = "rgba( 204, 204, 204, 1 )",
      curFrameRate = 1000,
      curCursor = p.ARROW,
      oldCursor = document.body.style.cursor,
      curMsPerFrame = 1,
      curShape = p.POLYGON,
      curShapeCount = 0,
      curvePoints = [],
      curTightness = 0,
      opacityRange = 255,
      redRange = 255,
      greenRange = 255,
      blueRange = 255,
      pathOpen = false,
      mousePressed = false,
      keyPressed = false,
      curColorMode = p.RGB,
      curTint = -1,
      curTextSize = 12,
      curTextFont = "Arial",
      getLoaded = false,
      start = new Date().getTime(),
      timeSinceLastFPS = start,
      framesSinceLastFPS = 0;

    var firstX, firstY, secondX, secondY, prevX, prevY;

    // Stores states for pushStyle() and popStyle().
    var styleArray = new Array(0);

    // Store a line for println(), print() handline
    p.ln = "";

    // Glyph path storage for textFonts
    p.glyphTable = {};

    // Global vars for tracking mouse position
    p.pmouseX = 0;
    p.pmouseY = 0;
    p.mouseX = 0;
    p.mouseY = 0;
    p.mouseButton = 0;
    p.mouseDown = false;

    // Undefined event handlers to be replaced by user when needed
    p.mouseClicked = undefined;
    p.mouseDragged = undefined;
    p.mouseMoved = undefined;
    p.mousePressed = undefined;
    p.mouseReleased = undefined;
    p.keyPressed = undefined;
    p.keyReleased = undefined;
    p.draw = undefined;
    p.setup = undefined;

    // The height/width of the canvas
    p.width = curElement.width - 0;
    p.height = curElement.height - 0;

    // The current animation frame
    p.frameCount = 0;



    ////////////////////////////////////////////////////////////////////////////
    // Array handling
    ////////////////////////////////////////////////////////////////////////////    
    p.split = function (str, delim) {
      return str.split(delim);
    };

    p.splitTokens = function (str, tokens) {
      if (arguments.length === 1) {
        tokens = "\n\t\r\f ";
      }

      tokens = "[" + tokens + "]";

      var ary = new Array(0);
      var index = 0;
      var pos = str.search(tokens);

      while (pos >= 0) {
        if (pos === 0) {
          str = str.substring(1);
        } else {
          ary[index] = str.substring(0, pos);
          index++;
          str = str.substring(pos);
        }
        pos = str.search(tokens);
      }

      if (str.length > 0) {
        ary[index] = str;
      }

      if (ary.length === 0) {
        ary = undefined;
      }

      return ary;
    };

    p.append = function (array, element) {
      array[array.length] = element;
      return array;
    };

    p.concat = function concat(array1, array2) {
      return array1.concat(array2);
    };

    p.splice = function (array, value, index) {
      if (array.length === 0 && value.length === 0) {
        return array;
      }

      if (value instanceof Array) {
        for (var i = 0, j = index; i < value.length; j++, i++) {
          array.splice(j, 0, value[i]);
        }
      } else {
        array.splice(index, 0, value);
      }

      return array;
    };

    p.subset = function (array, offset, length) {
      if (arguments.length === 2) {
        return p.subset(array, offset, array.length - offset);
      } else if (arguments.length === 3) {
        return array.slice(offset, offset + length);
      }
    };

    p.join = function join(array, seperator) {
      return array.join(seperator);
    };

    p.shorten = function (ary) {

      var newary = new Array(0);

      // copy array into new array
      var len = ary.length;
      for (var i = 0; i < len; i++) {
        newary[i] = ary[i];
      }

      newary.pop();

      return newary;
    };


    p.expand = function (ary, newSize) {

      var newary = new Array(0);

      var len = ary.length;
      for (var i = 0; i < len; i++) {
        newary[i] = ary[i];
      }

      if (arguments.length === 1) {

        // double size of array
        newary.length *= 2;

      } else if (arguments.length === 2) {

        // size is newSize
        newary.length = newSize;

      }

      return newary;
    };



    p.ArrayList = function ArrayList(size, size2, size3) {

      var array = new Array(0 | size);

      if (size2) {

        for (var i = 0; i < size; i++) {

          array[i] = [];

          for (var j = 0; j < size2; j++) {
            var a = array[i][j] = size3 ? new Array(size3) : 0;
            for (var k = 0; k < size3; k++) {
              a[k] = 0;
            }
          }

        }

      } else {

        for (var l = 0; l < size; l++) {
          array[l] = 0;
        }
      }

      array.get = function (i) {
        return this[i];
      };
      array.add = function (item) {
        return this.push(item);
      };
      array.size = function () {
        return this.length;
      };
      array.clear = function () {
        this.length = 0;
      };
      array.remove = function (i) {
        return this.splice(i, 1);
      };
      array.isEmpty = function () {
        return !this.length;
      };
      array.clone = function () {
        var a = new ArrayList(size);
        for (var i = 0; i < size; i++) {
          a[i] = this[i];
        }
        return a;
      };

      return array;
    };

    p.reverse = function (array) {
      return array.reverse();
    };



    ////////////////////////////////////////////////////////////////////////////
    // Color functions
    ////////////////////////////////////////////////////////////////////////////
    // convert rgba color strings to integer
    p.rgbaToInt = function (color) {
      var rgbaAry = /\(([^\)]+)\)/.exec(color).slice(1, 2)[0].split(',');
      return ((rgbaAry[3] * 255) << 24) | (rgbaAry[0] << 16) | (rgbaAry[1] << 8) | (rgbaAry[2]);
    };

    // helper functions for internal blending modes
    p.mix = function (a, b, f) {
      return a + (((b - a) * f) >> 8);
    };

    p.peg = function (n) {
      return (n < 0) ? 0 : ((n > 255) ? 255 : n);
    };

    // blending modes
    p.modes = {
      replace: function (a, b) {
        return p.rgbaToInt(b);
      },
      blend: function (a, b) {
        var c1 = p.rgbaToInt(a);
        var c2 = p.rgbaToInt(b);
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | p.mix(c1 & p.RED_MASK, c2 & p.RED_MASK, f) & p.RED_MASK | p.mix(c1 & p.GREEN_MASK, c2 & p.GREEN_MASK, f) & p.GREEN_MASK | p.mix(c1 & p.BLUE_MASK, c2 & p.BLUE_MASK, f));
      },
      add: function (a, b) {
        var c1 = p.rgbaToInt(a);
        var c2 = p.rgbaToInt(b);
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | Math.min(((c1 & p.RED_MASK) + ((c2 & p.RED_MASK) >> 8) * f), p.RED_MASK) & p.RED_MASK | Math.min(((c1 & p.GREEN_MASK) + ((c2 & p.GREEN_MASK) >> 8) * f), p.GREEN_MASK) & p.GREEN_MASK | Math.min((c1 & p.BLUE_MASK) + (((c2 & p.BLUE_MASK) * f) >> 8), p.BLUE_MASK));
      },
      subtract: function (a, b) {
        var c1 = p.rgbaToInt(a);
        var c2 = p.rgbaToInt(b);
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | Math.max(((c1 & p.RED_MASK) - ((c2 & p.RED_MASK) >> 8) * f), p.GREEN_MASK) & p.RED_MASK | Math.max(((c1 & p.GREEN_MASK) - ((c2 & p.GREEN_MASK) >> 8) * f), p.BLUE_MASK) & p.GREEN_MASK | Math.max((c1 & p.BLUE_MASK) - (((c2 & p.BLUE_MASK) * f) >> 8), 0));
      },
      lightest: function (a, b) {
        var c1 = p.rgbaToInt(a);
        var c2 = p.rgbaToInt(b);
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | Math.max(c1 & p.RED_MASK, ((c2 & p.RED_MASK) >> 8) * f) & p.RED_MASK | Math.max(c1 & p.GREEN_MASK, ((c2 & p.GREEN_MASK) >> 8) * f) & p.GREEN_MASK | Math.max(c1 & p.BLUE_MASK, ((c2 & p.BLUE_MASK) * f) >> 8));
      },
      darkest: function (a, b) {
        var c1 = p.rgbaToInt(a);
        var c2 = p.rgbaToInt(b);
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | p.mix(c1 & p.RED_MASK, Math.min(c1 & p.RED_MASK, ((c2 & p.RED_MASK) >> 8) * f), f) & p.RED_MASK | p.mix(c1 & p.GREEN_MASK, Math.min(c1 & p.GREEN_MASK, ((c2 & p.GREEN_MASK) >> 8) * f), f) & p.GREEN_MASK | p.mix(c1 & p.BLUE_MASK, Math.min(c1 & p.BLUE_MASK, ((c2 & p.BLUE_MASK) * f) >> 8), f));

      },
      difference: function (a, b) {
        var c1 = p.rgbaToInt(a);
        var c2 = p.rgbaToInt(b);
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        var ar = (c1 & p.RED_MASK) >> 16;
        var ag = (c1 & p.GREEN_MASK) >> 8;
        var ab = (c1 & p.BLUE_MASK);
        var br = (c2 & p.RED_MASK) >> 16;
        var bg = (c2 & p.GREEN_MASK) >> 8;
        var bb = (c2 & p.BLUE_MASK);
        // formula:
        var cr = (ar > br) ? (ar - br) : (br - ar);
        var cg = (ag > bg) ? (ag - bg) : (bg - ag);
        var cb = (ab > bb) ? (ab - bb) : (bb - ab);
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) | (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) | (p.peg(ab + (((cb - ab) * f) >> 8))));
      },
      exclusion: function (a, b) {
        var c1 = p.rgbaToInt(a);
        var c2 = p.rgbaToInt(b);
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        var ar = (c1 & p.RED_MASK) >> 16;
        var ag = (c1 & p.GREEN_MASK) >> 8;
        var ab = (c1 & p.BLUE_MASK);
        var br = (c2 & p.RED_MASK) >> 16;
        var bg = (c2 & p.GREEN_MASK) >> 8;
        var bb = (c2 & p.BLUE_MASK);
        // formula:
        var cr = ar + br - ((ar * br) >> 7);
        var cg = ag + bg - ((ag * bg) >> 7);
        var cb = ab + bb - ((ab * bb) >> 7);
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) | (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) | (p.peg(ab + (((cb - ab) * f) >> 8))));
      },
      multiply: function (a, b) {
        var c1 = p.rgbaToInt(a);
        var c2 = p.rgbaToInt(b);
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        var ar = (c1 & p.RED_MASK) >> 16;
        var ag = (c1 & p.GREEN_MASK) >> 8;
        var ab = (c1 & p.BLUE_MASK);
        var br = (c2 & p.RED_MASK) >> 16;
        var bg = (c2 & p.GREEN_MASK) >> 8;
        var bb = (c2 & p.BLUE_MASK);
        // formula:
        var cr = (ar * br) >> 8;
        var cg = (ag * bg) >> 8;
        var cb = (ab * bb) >> 8;
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) | (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) | (p.peg(ab + (((cb - ab) * f) >> 8))));
      },
      screen: function (a, b) {
        var c1 = p.rgbaToInt(a);
        var c2 = p.rgbaToInt(b);
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        var ar = (c1 & p.RED_MASK) >> 16;
        var ag = (c1 & p.GREEN_MASK) >> 8;
        var ab = (c1 & p.BLUE_MASK);
        var br = (c2 & p.RED_MASK) >> 16;
        var bg = (c2 & p.GREEN_MASK) >> 8;
        var bb = (c2 & p.BLUE_MASK);
        // formula:
        var cr = 255 - (((255 - ar) * (255 - br)) >> 8);
        var cg = 255 - (((255 - ag) * (255 - bg)) >> 8);
        var cb = 255 - (((255 - ab) * (255 - bb)) >> 8);
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) | (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) | (p.peg(ab + (((cb - ab) * f) >> 8))));
      },
      hard_light: function (a, b) {
        var c1 = p.rgbaToInt(a);
        var c2 = p.rgbaToInt(b);
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        var ar = (c1 & p.RED_MASK) >> 16;
        var ag = (c1 & p.GREEN_MASK) >> 8;
        var ab = (c1 & p.BLUE_MASK);
        var br = (c2 & p.RED_MASK) >> 16;
        var bg = (c2 & p.GREEN_MASK) >> 8;
        var bb = (c2 & p.BLUE_MASK);
        // formula:
        var cr = (br < 128) ? ((ar * br) >> 7) : (255 - (((255 - ar) * (255 - br)) >> 7));
        var cg = (bg < 128) ? ((ag * bg) >> 7) : (255 - (((255 - ag) * (255 - bg)) >> 7));
        var cb = (bb < 128) ? ((ab * bb) >> 7) : (255 - (((255 - ab) * (255 - bb)) >> 7));
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) | (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) | (p.peg(ab + (((cb - ab) * f) >> 8))));
      },
      soft_light: function (a, b) {
        var c1 = p.rgbaToInt(a);
        var c2 = p.rgbaToInt(b);
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        var ar = (c1 & p.RED_MASK) >> 16;
        var ag = (c1 & p.GREEN_MASK) >> 8;
        var ab = (c1 & p.BLUE_MASK);
        var br = (c2 & p.RED_MASK) >> 16;
        var bg = (c2 & p.GREEN_MASK) >> 8;
        var bb = (c2 & p.BLUE_MASK);
        // formula:
        var cr = ((ar * br) >> 7) + ((ar * ar) >> 8) - ((ar * ar * br) >> 15);
        var cg = ((ag * bg) >> 7) + ((ag * ag) >> 8) - ((ag * ag * bg) >> 15);
        var cb = ((ab * bb) >> 7) + ((ab * ab) >> 8) - ((ab * ab * bb) >> 15);
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) | (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) | (p.peg(ab + (((cb - ab) * f) >> 8))));
      },
      overlay: function (a, b) {
        var c1 = p.rgbaToInt(a);
        var c2 = p.rgbaToInt(b);
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        var ar = (c1 & p.RED_MASK) >> 16;
        var ag = (c1 & p.GREEN_MASK) >> 8;
        var ab = (c1 & p.BLUE_MASK);
        var br = (c2 & p.RED_MASK) >> 16;
        var bg = (c2 & p.GREEN_MASK) >> 8;
        var bb = (c2 & p.BLUE_MASK);
        // formula:
        var cr = (ar < 128) ? ((ar * br) >> 7) : (255 - (((255 - ar) * (255 - br)) >> 7));
        var cg = (ag < 128) ? ((ag * bg) >> 7) : (255 - (((255 - ag) * (255 - bg)) >> 7));
        var cb = (ab < 128) ? ((ab * bb) >> 7) : (255 - (((255 - ab) * (255 - bb)) >> 7));
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) | (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) | (p.peg(ab + (((cb - ab) * f) >> 8))));
      },
      dodge: function (a, b) {
        var c1 = p.rgbaToInt(a);
        var c2 = p.rgbaToInt(b);
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        var ar = (c1 & p.RED_MASK) >> 16;
        var ag = (c1 & p.GREEN_MASK) >> 8;
        var ab = (c1 & p.BLUE_MASK);
        var br = (c2 & p.RED_MASK) >> 16;
        var bg = (c2 & p.GREEN_MASK) >> 8;
        var bb = (c2 & p.BLUE_MASK);
        // formula:
        var cr = (br === 255) ? 255 : p.peg((ar << 8) / (255 - br)); // division requires pre-peg()-ing
        var cg = (bg === 255) ? 255 : p.peg((ag << 8) / (255 - bg)); // "
        var cb = (bb === 255) ? 255 : p.peg((ab << 8) / (255 - bb)); // "
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) | (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) | (p.peg(ab + (((cb - ab) * f) >> 8))));
      },
      burn: function (a, b) {
        var c1 = p.rgbaToInt(a);
        var c2 = p.rgbaToInt(b);
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        var ar = (c1 & p.RED_MASK) >> 16;
        var ag = (c1 & p.GREEN_MASK) >> 8;
        var ab = (c1 & p.BLUE_MASK);
        var br = (c2 & p.RED_MASK) >> 16;
        var bg = (c2 & p.GREEN_MASK) >> 8;
        var bb = (c2 & p.BLUE_MASK);
        // formula:
        var cr = (br === 0) ? 0 : 255 - p.peg(((255 - ar) << 8) / br); // division requires pre-peg()-ing
        var cg = (bg === 0) ? 0 : 255 - p.peg(((255 - ag) << 8) / bg); // "
        var cb = (bb === 0) ? 0 : 255 - p.peg(((255 - ab) << 8) / bb); // "
        // alpha blend (this portion will always be the same)
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | (p.peg(ar + (((cr - ar) * f) >> 8)) << 16) | (p.peg(ag + (((cg - ag) * f) >> 8)) << 8) | (p.peg(ab + (((cb - ab) * f) >> 8))));
      }
    };

    // In case I ever need to do HSV conversion:
    // http://srufaculty.sru.edu/david.dailey/javascript/js/5rml.js
    p.color = function color(aValue1, aValue2, aValue3, aValue4) {

      var r, g, b, rgb, aColor;

      // HSB conversion function from Mootools, MIT Licensed

      function HSBtoRGB(h, s, b) {
        h = (h / redRange) * 360;
        s = (s / greenRange) * 100;
        b = (b / blueRange) * 100;
        var br = Math.round(b / 100 * 255);
        if (s === 0) {
          return [br, br, br];
        } else {
          var hue = h % 360;
          var f = hue % 60;
          var p = Math.round((b * (100 - s)) / 10000 * 255);
          var q = Math.round((b * (6000 - s * f)) / 600000 * 255);
          var t = Math.round((b * (6000 - s * (60 - f))) / 600000 * 255);
          switch (Math.floor(hue / 60)) {
          case 0:
            return [br, t, p];
          case 1:
            return [q, br, p];
          case 2:
            return [p, br, t];
          case 3:
            return [p, q, br];
          case 4:
            return [t, p, br];
          case 5:
            return [br, p, q];
          }
        }
      }

      function getColor(aValue, range) {
        return Math.round(255 * (aValue / range));
      }

      if (arguments.length === 3) {
        aColor = p.color(aValue1, aValue2, aValue3, opacityRange);
      } else if (arguments.length === 4) {
        var a = aValue4 / opacityRange;
        a = isNaN(a) ? 1 : a;
        if (curColorMode === p.HSB) {
          rgb = HSBtoRGB(aValue1, aValue2, aValue3);
          r = rgb[0];
          g = rgb[1];
          b = rgb[2];
        } else {
          r = getColor(aValue1, redRange);
          g = getColor(aValue2, greenRange);
          b = getColor(aValue3, blueRange);
        }
        aColor = "rgba(" + r + "," + g + "," + b + "," + a + ")";
      } else if (typeof aValue1 === "string") {
        aColor = aValue1;
        if (arguments.length === 2) {
          var c = aColor.split(",");
          c[3] = (aValue2 / opacityRange) + ")";
          aColor = c.join(",");
        }
      } else if (arguments.length === 2) {
        aColor = p.color(aValue1, aValue1, aValue1, aValue2);
      } else if (typeof aValue1 === "number" && aValue1 < 256 && aValue1 >= 0) {
        aColor = p.color(aValue1, aValue1, aValue1, opacityRange);
      } else if (typeof aValue1 === "number") {
        var intcolor = 0;
        if (aValue1 < 0) {
          intcolor = 4294967296 - (aValue1 * -1);
        } else {
          intcolor = aValue1;
        }
        var ac = Math.floor((intcolor % 4294967296) / 16777216);
        var rc = Math.floor((intcolor % 16777216) / 65536);
        var gc = Math.floor((intcolor % 65536) / 256);
        var bc = intcolor % 256;
        aColor = p.color(rc, gc, bc, ac);
      } else {
        aColor = p.color(redRange, greenRange, blueRange, opacityRange);
      }
      return aColor;
    };

    var verifyChannel = function verifyChannel(aColor) {
      if (aColor.constructor === Array) {
        return aColor;
      } else {
        return p.color(aColor);
      }
    };

    p.red = function (aColor) {
      return parseInt(verifyChannel(aColor).slice(5), 10);
    };
    p.green = function (aColor) {
      return parseInt(verifyChannel(aColor).split(",")[1], 10);
    };
    p.blue = function (aColor) {
      return parseInt(verifyChannel(aColor).split(",")[2], 10);
    };
    p.alpha = function (aColor) {
      return parseInt(parseFloat(verifyChannel(aColor).split(",")[3]) * 255, 10);
    };

    p.lerpColor = function lerpColor(c1, c2, amt) {

      // Get RGBA values for Color 1 to floats
      var colors1 = p.color(c1).split(",");
      var r1 = parseInt(colors1[0].split("(")[1], 10);
      var g1 = parseInt(colors1[1], 10);
      var b1 = parseInt(colors1[2], 10);
      var a1 = parseFloat(colors1[3].split(")")[0], 10);

      // Get RGBA values for Color 2 to floats
      var colors2 = p.color(c2).split(",");
      var r2 = parseInt(colors2[0].split("(")[1], 10);
      var g2 = parseInt(colors2[1], 10);
      var b2 = parseInt(colors2[2], 10);
      var a2 = parseFloat(colors2[3].split(")")[0], 10);

      // Return lerp value for each channel, INT for color, Float for Alpha-range
      var r = parseInt(p.lerp(r1, r2, amt), 10);
      var g = parseInt(p.lerp(g1, g2, amt), 10);
      var b = parseInt(p.lerp(b1, b2, amt), 10);
      var a = parseFloat(p.lerp(a1, a2, amt), 10);

      var aColor = "rgba(" + r + "," + g + "," + b + "," + a + ")";

      return aColor;
    };

    // Forced default color mode for #aaaaaa style
    p.DefaultColor = function (aValue1, aValue2, aValue3) {
      var tmpColorMode = curColorMode;
      curColorMode = p.RGB;
      var c = p.color(aValue1 / 255 * redRange, aValue2 / 255 * greenRange, aValue3 / 255 * blueRange);
      curColorMode = tmpColorMode;
      return c;
    };

    p.colorMode = function colorMode(mode, range1, range2, range3, range4) {
      curColorMode = mode;
      if (arguments.length >= 4) {
        redRange = range1;
        greenRange = range2;
        blueRange = range3;
      }
      if (arguments.length === 5) {
        opacityRange = range4;
      }
      if (arguments.length === 2) {
        p.colorMode(mode, range1, range1, range1, range1);
      }
    };

    p.blendColor = function (c1, c2, mode) {
      var color = 0;
      switch (mode) {
      case p.REPLACE:
        color = p.modes.replace(c1, c2);
        break;
      case p.BLEND:
        color = p.modes.blend(c1, c2);
        break;
      case p.ADD:
        color = p.modes.add(c1, c2);
        break;
      case p.SUBTRACT:
        color = p.modes.subtract(c1, c2);
        break;
      case p.LIGHTEST:
        color = p.modes.lightest(c1, c2);
        break;
      case p.DARKEST:
        color = p.modes.darkest(c1, c2);
        break;
      case p.DIFFERENCE:
        color = p.modes.difference(c1, c2);
        break;
      case p.EXCLUSION:
        color = p.modes.exclusion(c1, c2);
        break;
      case p.MULTIPLY:
        color = p.modes.multiply(c1, c2);
        break;
      case p.SCREEN:
        color = p.modes.screen(c1, c2);
        break;
      case p.HARD_LIGHT:
        color = p.modes.hard_light(c1, c2);
        break;
      case p.SOFT_LIGHT:
        color = p.modes.soft_light(c1, c2);
        break;
      case p.OVERLAY:
        color = p.modes.overlay(c1, c2);
        break;
      case p.DODGE:
        color = p.modes.dodge(c1, c2);
        break;
      case p.BURN:
        color = p.modes.burn(c1, c2);
        break;
      }
      return color;
    };

    ////////////////////////////////////////////////////////////////////////////
    // Canvas-Matrix manipulation
    ////////////////////////////////////////////////////////////////////////////
    p.translate = function translate(x, y) {
      curContext.translate(x, y);
    };
    p.scale = function scale(x, y) {
      curContext.scale(x, y || x);
    };
    p.rotate = function rotate(aAngle) {
      curContext.rotate(aAngle);
    };
    p.pushMatrix = function pushMatrix() {
      curContext.save();
    };
    p.popMatrix = function popMatrix() {
      curContext.restore();
    };
    p.ortho = function ortho() {};

    p.pushStyle = function pushStyle() {
      // Save the canvas state.
      curContext.save();

      p.pushMatrix();

      var newState = {
        'doFill': doFill,
        'doStroke': doStroke,
        'curTint': curTint,
        'curRectMode': curRectMode,
        'curColorMode': curColorMode,
        'redRange': redRange,
        'blueRange': blueRange,
        'greenRange': greenRange,
        'opacityRange': opacityRange,
        'curTextFont': curTextFont,
        'curTextSize': curTextSize
      };

      styleArray.push(newState);
    };

    p.popStyle = function popStyle() {
      var oldState = styleArray.pop();

      if (oldState) {
        curContext.restore();

        p.popMatrix();

        doFill = oldState.doFill;
        doStroke = oldState.doStroke;
        curTint = oldState.curTint;
        curRectMode = oldState.curRectmode;
        curColorMode = oldState.curColorMode;
        redRange = oldState.redRange;
        blueRange = oldState.blueRange;
        greenRange = oldState.greenRange;
        opacityRange = oldState.opacityRange;
        curTextFont = oldState.curTextFont;
        curTextSize = oldState.curTextSize;
      } else {
        throw "Too many popStyle() without enough pushStyle()";
      }
    };


    ////////////////////////////////////////////////////////////////////////////
    //Time based functions
    ////////////////////////////////////////////////////////////////////////////
    p.year = function year() {
      return new Date().getYear() + 1900;
    };
    p.month = function month() {
      return new Date().getMonth();
    };
    p.day = function day() {
      return new Date().getDay();
    };
    p.hour = function hour() {
      return new Date().getHours();
    };
    p.minute = function minute() {
      return new Date().getMinutes();
    };
    p.second = function second() {
      return new Date().getSeconds();
    };
    p.millis = function millis() {
      return new Date().getTime() - start;
    };

    p.noLoop = function noLoop() {
      doLoop = false;
    };

    p.redraw = function redraw() {
      if (hasBackground) {
        p.background();
      }

      var sec = (new Date().getTime() - timeSinceLastFPS) / 1000;
      framesSinceLastFPS++;
      var fps = framesSinceLastFPS / sec;

      // recalculate FPS every half second for better accuracy.
      if (sec > 0.5) {
        timeSinceLastFPS = new Date().getTime();
        framesSinceLastFPS = 0;
        p.FRAME_RATE = fps;
      }

      p.frameCount++;

      inDraw = true;

      if (p.use3DContext) {
        curContext.clear(curContext.COLOR_BUFFER_BIT);
        p.draw();
      } else {
        p.pushMatrix();
        p.draw();
        p.popMatrix();
      }

      inDraw = false;
    };

    p.loop = function loop() {

      if (loopStarted) {
        return;
      }

      looping = window.setInterval(function () {

        try {
          try {
            p.focused = document.hasFocus();
          } catch(e) {}
          p.redraw();
        }
        catch(e_loop) {
          window.clearInterval(looping);
          throw e_loop;
        }
      },
      curMsPerFrame);

      loopStarted = true;

    };

    p.frameRate = function frameRate(aRate) {
      curFrameRate = aRate;
      curMsPerFrame = 1000 / curFrameRate;
    };

    p.exit = function exit() {
      window.clearInterval(looping);
    };



    ////////////////////////////////////////////////////////////////////////////
    // MISC functions
    ////////////////////////////////////////////////////////////////////////////
    p.cursor = function cursor(mode) {
      curCursor = document.body.style.cursor = mode;
    };

    p.noCursor = function noCursor() {
      curCursor = document.body.style.cursor = p.NOCURSOR;
    };

    p.link = function (href, target) {
      window.location = href;
    };
    p.beginDraw = function beginDraw() {};
    p.endDraw = function endDraw() {};

    // Imports an external Processing.js library
    p.Import = function Import(lib) {
      // Replace evil-eval method with a DOM <script> tag insert method that
      // binds new lib code to the Processing.lib names-space and the current
      // p context. -F1LT3R 
    };

    var contextMenu = function (e) {
      e.preventDefault();
      e.stopPropagation();
    };
    
    p.disableContextMenu = function disableContextMenu() {
      curElement.addEventListener('contextmenu', contextMenu, false);
    };

    p.enableContextMenu = function enableContextMenu() {
      curElement.removeEventListener('contextmenu', contextMenu, false);
    };



    ////////////////////////////////////////////////////////////////////////////
    // Binary Functions
    ////////////////////////////////////////////////////////////////////////////
    p.unbinary = function unbinary(binaryString) {
      var binaryPattern = new RegExp("^[0|1]{8}$");
      var addUp = 0;

      if (isNaN(binaryString)) {
        throw "NaN_Err";
      } else {
        if (arguments.length === 1 || binaryString.length === 8) {
          if (binaryPattern.test(binaryString)) {
            for (i = 0; i < 8; i++) {
              addUp += (Math.pow(2, i) * parseInt(binaryString.charAt(7 - i), 10));
            }
            return addUp + "";
          } else {
            throw "notBinary: the value passed into unbinary was not an 8 bit binary number";
          }
        } else {
          throw "longErr";
        }
      }
      return addUp;
    };

    p.nfs = function (num, left, right) {
      var str, len;
      // array handling
      if (typeof num === "object") {
        str = new Array(0);
        len = num.length;
        for (var i = 0; i < len; i++) {
          str[i] = p.nfs(num[i], left, right);
        }
      } else if (arguments.length === 3) {
        var negative = false;
        if (num < 0) {
          negative = true;
        }

        str = "" + Math.abs(num);
        var digits = ("" + Math.floor(Math.abs(num))).length;
        var count = left - digits;
        while (count > 0) {
          str = "0" + str;
          count--;
        }
        // get the number of decimal places, if none will be -1
        var decimals = ("" + Math.abs(num)).length - digits - 1;
        if (decimals === -1 && right > 0) {
          str = str + ".";
        }

        if (decimals !== -1) {
          count = right - decimals;
        } else if (decimals === -1 && right > 0) {
          count = right;
        } else {
          count = 0;
        }
        while (count > 0) {
          str = str + "0";
          count--;
        }
        str = (negative ? "-" : " ") + str;
      } else if (arguments.length === 2) {
        str = p.nfs(num, left, 0);
      }
      return str;
    };

    p.nfc = function (num, right) {
      var str;
      var decimals = right >= 0 ? right : 0;
      if (typeof num === "object") {
        str = new Array(0);
        for (var i = 0; i < num.length; i++) {
          str[i] = p.nfc(num[i], decimals);
        }
      } else if (arguments.length === 2) {
        var rawStr = p.nfs(num, 0, decimals);
        var ary = new Array(0);
        ary = rawStr.split('.');
        // ary[0] contains left of decimal, ary[1] contains decimal places if they exist
        // insert commas now, then append ary[1] if it exists
        var leftStr = ary[0];
        var rightStr = ary.length > 1 ? '.' + ary[1] : '';
        var commas = /(\d+)(\d{3})/;
        while (commas.test(leftStr)) {
          leftStr = leftStr.replace(commas, '$1' + ',' + '$2');
        }
        str = leftStr + rightStr;
      } else if (arguments.length === 1) {
        str = p.nfc(num, 0);
      }
      return str;
    };

    //function i use to convert decimals to a padded hex value
    p.decimalToHex = function decimalToHex(d, padding) {
      //if there is no padding value added, default padding to 8  else  go into while statement.
      padding = typeof(padding) === "undefined" || padding === null ? padding = 8 : padding;
      var hex = Number(d).toString(16);

      while (hex.length < padding) {
        hex = "0" + hex;
      }
      return hex;
    };

    //regExp i made to pattern match rgba and extract it's values
    p.colorRGB = function colorRGB(col) {
      var patt = /^rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3}),?(\d{0,3})\)$/i; //grouped \d{1,3} with ( ) so they can be referenced w\ $1-$4
      // What's up with the crazy variable names? -F1LT3R
      var al = col.replace(patt, "$4");
      var reD = col.replace(patt, "$1");
      var gree = col.replace(patt, "$2");
      var blu = col.replace(patt, "$3");

      return ("" + Number(al).toString(16) + Number(reD).toString(16) + Number(gree).toString(16) + Number(blu).toString(16)).toUpperCase();
    };

    p.hex = function hex(decimal, len) {
      var hexadecimal = "";

      var patternRGBa = /^rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3}),?(\d{0,3})\)$/i; //match rgba(20,20,20,0) or rgba(20,20,20)
      var patternDigits = /^\d+$/;
      //**************************   dealing with 2 parameters   *************************************************
      if (arguments.length === 2) {
        if (patternDigits.test(decimal)) {
          hexadecimal = p.decimalToHex(decimal, len);
        } else if (patternRGBa.test(decimal)) //check to see if it's an rgba color
        {
          hexadecimal = p.colorRGB(decimal);
          hexadecimal = hexadecimal.substring(hexadecimal.length - len, hexadecimal.length);
        }
      } else if (arguments.length === 1) //****************   dealing with 1 parameter  ********************************
      {
        if (patternDigits.test(decimal)) { //check to see if it's a decimal
          hexadecimal = p.decimalToHex(decimal);
        } else if (patternRGBa.test(decimal)) //check to see if it's an rgba color
        {
          hexadecimal = p.colorRGB(decimal);
        }
        else if (decimal.indexOf("#") === 0) //check to see if it's hex color in format #ffffff
        {
          if (decimal.length < 7) {
            throw "Not Hex format: the value passed into hex was not in the format #FFFFFF";
          } else {
            decimal = (decimal.slice(1)).toUpperCase();
            while (decimal.length < 8) {
              decimal = "FF" + decimal;
            }
            hexadecimal = decimal;
          }
        }
      }
      return hexadecimal;
    };

    p.unhex = function (str) {
      var value = 0,
        multiplier = 1,
        num = 0;

      var len = str.length - 1;
      for (var i = len; i >= 0; i--) {
        try {
          switch (str[i]) {
          case "0":
            num = 0;
            break;
          case "1":
            num = 1;
            break;
          case "2":
            num = 2;
            break;
          case "3":
            num = 3;
            break;
          case "4":
            num = 4;
            break;
          case "5":
            num = 5;
            break;
          case "6":
            num = 6;
            break;
          case "7":
            num = 7;
            break;
          case "8":
            num = 8;
            break;
          case "9":
            num = 9;
            break;
          case "A":
          case "a":
            num = 10;
            break;
          case "B":
          case "b":
            num = 11;
            break;
          case "C":
          case "c":
            num = 12;
            break;
          case "D":
          case "d":
            num = 13;
            break;
          case "E":
          case "e":
            num = 14;
            break;
          case "F":
          case "f":
            num = 15;
            break;
          default:
            return 0;
          }
          value += num * multiplier;
          multiplier *= 16;
        } catch(e) {
          Processing.debug(e);
        }
        // correct for int overflow java expectation
        if (value > 2147483647) {
          value -= 4294967296;
        }
      }
      return value;
    };


    // Load a file or URL into strings     
    p.loadStrings = function loadStrings(url) {
      return ajax(url).split("\n");
    };

    // nf() should return an array when being called on an array, at the moment it only returns strings. -F1LT3R
    // This breaks the join() ref-test. The Processing.org documentation says String or String[].
    p.nf = function (num, pad) {
      var str = "" + num;
      for (var i = pad - str.length; i > 0; i--) {
        str = "0" + str;
      }
      return str;
    };

    p.nfp = function nfp(Value, pad, right) {
      var str = String(Value);

      if (arguments.length < 3) { //check if it's 2 arguments
        if (Value > 0) {
          while (str.length < pad) {
            str = "0" + str;
          }
          str = "+" + str;
          return str;
        } else {
          str = str.slice(1); //used to remove the '-' infront of the original number.
          while (str.length < pad) {
            str = "0" + str;
          }
          str = "-" + str;
          return str;
        }
      } else if (arguments.length === 3) { //check if it's 3 arguments 
        var decimalPos = str.indexOf('.'),
          strL, strR;
        if (Value > 0) {
          strL = str.slice(0, decimalPos); //store #'s to left of decimal into strL
          strR = str.slice(decimalPos + 1, str.length); //store #'s to right of decimal into strR
          while (strL.length < pad) { //pad to left of decimal on positive #'s
            strL = "0" + strL;
          }
          strL = "+" + strL;

          while (strR.length < right) { //pad to right of decimal on positive #'s
            strR = strR + "0";
          }
          return strL + "." + strR;
        } else {
          strL = str.slice(1, decimalPos); //store #'s to left of decimal into strL
          strR = str.slice(decimalPos + 1, str.length); //store #'s to right of decimal into strR
          while (strL.length < pad) { //pad to left of decimal on negative #'s
            strL = "0" + strL;
          }
          strL = "-" + strL;

          while (strR.length < right) { //pad to right of decimal on negative #'s
            strR = strR + "0";
          }
          return strL + "." + strR;
        }
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // String Functions
    ////////////////////////////////////////////////////////////////////////////
    // I have updated this to lint, we should check it still performs faster than the other option -F1LT3R
    p.matchAll = function matchAll(aString, aRegExp) {
      var i = 0,
        results = [],
        latest, regexp = new RegExp(aRegExp, "g");
      latest = results[i] = regexp.exec(aString);
      while (latest) {
        i++;
        latest = results[i] = regexp.exec(aString);
      }
      return results.slice(0, i);
    };

    String.prototype.replaceAll = function (re, replace) {
      return this.replace(new RegExp(re, "g"), replace);
    };

    p.match = function (str, regexp) {
      return str.match(regexp);
    };

    // Returns a line to lnPrinted() for user handling 
    p.lnPrinted = function lnPrinted() {};
    p.printed = function printed() {};

    // Event to send output to user control function print()/println()
    p.println = function println() {
      // Not working on Safari :( find work around!
      if (arguments.callee.caller) {
        var Caller = arguments.callee.caller.name.toString();
        if (arguments.length > 1) {
          p.ln = Caller !== "print" ? arguments : arguments[0];
        } else {
          p.ln = arguments[0];
        }
        //Returns a line to lnPrinted() for user error handling/debugging
        if (Caller === "print") {
          p.printed(arguments);
        } else {
          p.lnPrinted();
        }
      }

    };

    p.str = function str(aNumber) {
      return aNumber + '';
    };

    p.print = function print() {
      p.println(arguments[0]);
    };

    p.char = function (key) {
      return key;
    };



    ////////////////////////////////////////////////////////////////////////////
    // Math functions
    ////////////////////////////////////////////////////////////////////////////
    p.sq = function sq(aNumber) {
      return aNumber * aNumber;
    };
    p.sqrt = function sqrt(aNumber) {
      return Math.sqrt(aNumber);
    };

    p.int = function (aNumber) {
      return Math.floor(aNumber);
    };

    p.min = function min(aNumber, aNumber2) {
      return Math.min(aNumber, aNumber2);
    };
    p.max = function max(aNumber, aNumber2) {
      return Math.max(aNumber, aNumber2);
    };
    p.floor = function floor(aNumber) {
      return Math.floor(aNumber);
    };

    p.float = function (aNumber) {
      return parseFloat(aNumber);
    };

    p.ceil = function ceil(aNumber) {
      return Math.ceil(aNumber);
    };
    p.round = function round(aNumber) {
      return Math.round(aNumber);
    };
    p.lerp = function lerp(value1, value2, amt) {
      return ((value2 - value1) * amt) + value1;
    };
    p.abs = function abs(aNumber) {
      return Math.abs(aNumber);
    };
    p.cos = function cos(aNumber) {
      return Math.cos(aNumber);
    };
    p.sin = function sin(aNumber) {
      return Math.sin(aNumber);
    };
    p.pow = function pow(aNumber, aExponent) {
      return Math.pow(aNumber, aExponent);
    };
    p.sqrt = function sqrt(aNumber) {
      return Math.sqrt(aNumber);
    };
    p.tan = function tan(aNumber) {
      return Math.tan(aNumber);
    };
    p.atan = function atan(aNumber) {
      return Math.atan(aNumber);
    };
    p.atan2 = function atan2(aNumber, aNumber2) {
      return Math.atan2(aNumber, aNumber2);
    };
    p.radians = function radians(aAngle) {
      return (aAngle / 180) * p.PI;
    };
    p.log = function log(aNumber) {
      return Math.log(aNumber);
    };
    p.exp = function exp(aNumber) {
      return Math.exp(aNumber);
    };
    p.asin = function asin(aNumber) {
      return Math.asin(aNumber);
    };
    p.acos = function acos(aNumber) {
      return Math.acos(aNumber);
    };

    p.boolean = function (val) {
      var ret = false;

      if (val && typeof val === 'number' && val !== 0) {
        ret = true;
      } else if (val && typeof val === 'boolean' && val === true) {
        ret = true;
      } else if (val && typeof val === 'string' && val.toLowerCase() === 'true') {
        ret = true;
      } else if (val && typeof val === 'object' && val.constructor === Array) {
        ret = new Array(val.length);

        for (var i = 0; i < val.length; i++) {
          ret[i] = p.boolean(val[i]);
        }
      }

      return ret;
    };

    p.dist = function dist(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    p.map = function map(value, istart, istop, ostart, ostop) {
      return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
    };

    p.mag = function (a, b, c) {
      if (arguments.length === 2) {
        return Math.sqrt(a * a + b * b);
      } else if (arguments.length === 3) {
        return Math.sqrt(a * a + b * b + c * c);
      }
    };

    p.Random = function () {

      var haveNextNextGaussian = false,
        nextNextGaussian;

      this.nextGaussian = function () {

        if (haveNextNextGaussian) {

          haveNextNextGaussian = false;
          return nextNextGaussian;

        } else {

          var v1, v2, s;
          do {
            v1 = 2 * p.random(1) - 1; // between -1.0 and 1.0
            v2 = 2 * p.random(1) - 1; // between -1.0 and 1.0
            s = v1 * v1 + v2 * v2;
          }
          while (s >= 1 || s === 0);

          var multiplier = Math.sqrt(-2 * Math.log(s) / s);
          nextNextGaussian = v2 * multiplier;
          haveNextNextGaussian = true;

          return v1 * multiplier;

        }

      };

    };

    //! This can't be right... right?
    p.byte = function (aNumber) {
      return aNumber || 0;
    };

    p.norm = function norm(aNumber, low, high) {
      var range = high - low;
      return ((1 / range) * aNumber) - ((1 / range) * low);
    };

    p.random = function random(aMin, aMax) {
      return arguments.length === 2 ? aMin + (Math.random() * (aMax - aMin)) : Math.random() * aMin;
    };

    var noiseGen = function noiseGen(x, y) {
      var n = x + y * 57;
      n = (n << 13) ^ n;
      return Math.abs(1.0 - (((n * ((n * n * 15731) + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0));
    };

    var smoothedNoise = function smoothedNoise(x, y) {
      var corners = (noiseGen(x - 1, y - 1) + noiseGen(x + 1, y - 1) + noiseGen(x - 1, y + 1) + noiseGen(x + 1, y + 1)) / 16,
        sides = (noiseGen(x - 1, y) + noiseGen(x + 1, y) + noiseGen(x, y - 1) + noiseGen(x, y + 1)) / 8,
        center = noiseGen(x, y) / 4;
      return corners + sides + center;
    };

    var interpolate = function interpolate(a, b, x) {
      var ft = x * p.PI;
      var f = (1 - Math.cos(ft)) * 0.5;
      return a * (1 - f) + b * f;
    };

    var interpolatedNoise = function interpolatedNoise(x, y) {
      var integer_X = Math.floor(x);
      var fractional_X = x - integer_X;
      var integer_Y = Math.floor(y);
      var fractional_Y = y - integer_Y;
      var v1 = smoothedNoise(integer_X, integer_Y),
        v2 = smoothedNoise(integer_X + 1, integer_Y),
        v3 = smoothedNoise(integer_X, integer_Y + 1),
        v4 = smoothedNoise(integer_X + 1, integer_Y + 1);
      var i1 = interpolate(v1, v2, fractional_X),
        i2 = interpolate(v3, v4, fractional_X);
      return interpolate(i1, i2, fractional_Y);
    };

    var perlinNoise_2D = function perlinNoise_2D(x, y) {
      var total = 0,
        p = 0.25,
        n = 3;
      for (var i = 0; i <= n; i++) {
        var frequency = Math.pow(2, i);
        var amplitude = Math.pow(p, i);
        total += interpolatedNoise(x * frequency, y * frequency) * amplitude;
      }

      return total;
    };

    // Add Thomas Saunders 3D noiseGen code here....
    var perlinNoise_3D = function perlinNoise_3D() {
      return 0;
    };

    // From: http://freespace.virgin.net/hugo.elias/models/m_perlin.htm
    p.noise = function (x, y, z) {
      switch (arguments.length) {
      case 2:
        return perlinNoise_2D(x, y);
      case 3:
        return perlinNoise_3D(x, y, z);
      case 1:
        return perlinNoise_2D(x, x);
      }
    };

    p.constrain = function constrain(aNumber, aMin, aMax) {
      return Math.min(Math.max(aNumber, aMin), aMax);
    };

    p.degrees = function degrees(aAngle) {
      aAngle = (aAngle * 180) / p.PI;
      if (aAngle < 0) {
        aAngle = 360 + aAngle;
      }
      return aAngle;
    };

    // Changes the size of the Canvas ( this resets context properties like 'lineCap', etc.
    p.size = function size(aWidth, aHeight, aMode) {
      if (aMode && aMode === "OPENGL") {
        // get the 3D rendering context
        try {
          if (!curContext) {
            curContext = curElement.getContext("experimental-webgl");
          }
        } catch(e_size) {
          Processing.debug(e_size);
        }

        if (!curContext) {
          throw "OPENGL 3D context is not supported on this browser.";
        }

        p.stroke(0);
        p.fill(255);
      } else {
        if (typeof curContext === "undefined") {
          // size() was called without p.init() default context, ie. p.createGraphics()
          curContext = curElement.getContext("2d");
        }
      }

      // The default 2d context has already been created in the p.init() stage if 
      // a 3d context was not specified. This is so that a 2d context will be 
      // available if size() was not called.

      var props = {
        fillStyle: curContext.fillStyle,
        strokeStyle: curContext.strokeStyle,
        lineCap: curContext.lineCap,
        lineJoin: curContext.lineJoin
      };
      curElement.width = p.width = aWidth;
      curElement.height = p.height = aHeight;

      for (var i in props) {
        if (props) {
          curContext[i] = props[i];
        }
      }

    };


    ////////////////////////////////////////////////////////////////////////////
    // PVector
    ////////////////////////////////////////////////////////////////////////////
    var PVector = function (x, y, z) {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
    },
      createPVectorMethod = function (method) {
      return function (v1, v2) {
        var v = v1.get();
        v[method](v2);
        return v;
      };
    },
      createSimplePVectorMethod = function (method) {
      return function (v1, v2) {
        return v1[method](v2);
      };
    },
      simplePVMethods = "dist dot cross".split(" "),
      method = simplePVMethods.length;

    PVector.angleBetween = function (v1, v2) {
      return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
    };

    // Common vector operations for PVector
    PVector.prototype = {
      set: function (v, y, z) {
        if (arguments.length === 1) {
          this.set(v.x || v[0], v.y || v[1], v.z || v[2]);
        } else {
          this.x = v;
          this.y = y;
          this.z = z;
        }
      },
      get: function () {
        return new PVector(this.x, this.y, this.z);
      },
      mag: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      },
      add: function (v, y, z) {
        if (arguments.length === 3) {
          this.x += v;
          this.y += y;
          this.z += z;
        } else if (arguments.length === 1) {
          this.x += v.x;
          this.y += v.y;
          this.z += v.z;
        }
      },
      sub: function (v, y, z) {
        if (arguments.length === 3) {
          this.x -= v;
          this.y -= y;
          this.z -= z;
        } else if (arguments.length === 1) {
          this.x -= v.x;
          this.y -= v.y;
          this.z -= v.z;
        }
      },
      mult: function (v) {
        if (typeof v === 'number') {
          this.x *= v;
          this.y *= v;
          this.z *= v;
        } else if (typeof v === 'object') {
          this.x *= v.x;
          this.y *= v.y;
          this.z *= v.z;
        }
      },
      div: function (v) {
        if (typeof v === 'number') {
          this.x /= v;
          this.y /= v;
          this.z /= v;
        } else if (typeof v === 'object') {
          this.x /= v.x;
          this.y /= v.y;
          this.z /= v.z;
        }
      },
      dist: function (v) {
        var dx = this.x - v.x,
          dy = this.y - v.y,
          dz = this.z - v.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
      },
      dot: function (v, y, z) {
        var num;
        if (arguments.length === 3) {
          num = this.x * v + this.y * y + this.z * z;
        } else if (arguments.length === 1) {
          num = this.x * v.x + this.y * v.y + this.z * v.z;
        }
        return num;
      },
      cross: function (v) {
        var
        crossX = this.y * v.z - v.y * this.z,
          crossY = this.z * v.x - v.z * this.x,
          crossZ = this.x * v.y - v.x * this.y;
        return new PVector(crossX, crossY, crossZ);
      },
      normalize: function () {
        var m = this.mag();
        if (m > 0) {
          this.div(m);
        }
      },
      limit: function (high) {
        if (this.mag() > high) {
          this.normalize();
          this.mult(high);
        }
      },
      heading2D: function () {
        var angle = Math.atan2(-this.y, this.x);
        return -angle;
      },
      toString: function () {
        return "[" + this.x + ", " + this.y + ", " + this.z + "]";
      },
      array: function () {
        return [this.x, this.y, this.z];
      }
    };

    while (method--) {
      PVector[simplePVMethods[method]] = createSimplePVectorMethod(simplePVMethods[method]);
    }

    for (method in PVector.prototype) {
      if (PVector.prototype.hasOwnProperty(method) && !PVector.hasOwnProperty(method)) {
        PVector[method] = createPVectorMethod(method);
      }
    }

    p.PVector = PVector;


    ////////////////////////////////////////////////////////////////////////////
    // Style functions
    ////////////////////////////////////////////////////////////////////////////
    p.noStroke = function noStroke() {
      doStroke = false;
    };
    p.noFill = function noFill() {
      doFill = false;
    };
    p.smooth = function smooth() {};
    p.noSmooth = function noSmooth() {};

    p.fill = function fill() {
      doFill = true;
      curContext.fillStyle = p.color.apply(this, arguments);
    };

    p.stroke = function stroke() {
      doStroke = true;
      curContext.strokeStyle = p.color.apply(this, arguments);
    };

    p.strokeWeight = function strokeWeight(w) {
      curContext.lineWidth = w;
    };

    p.strokeCap = function strokeCap(set) {
      curContext.lineCap = set;
    };

    p.strokeJoin = function strokeJoin(set) {
      curContext.lineJoin = set;
    };

    ////////////////////////////////////////////////////////////////////////////
    // Vector drawing functions
    ////////////////////////////////////////////////////////////////////////////    
    p.Point = function Point(x, y) {
      this.x = x;
      this.y = y;
      this.copy = function () {
        return new Point(x, y);
      };
    };

    p.point = function point(x, y) {
      var oldFill = curContext.fillStyle;
      curContext.fillStyle = curContext.strokeStyle;
      curContext.fillRect(Math.round(x), Math.round(y), 1, 1);
      curContext.fillStyle = oldFill;
    };

    p.beginShape = function beginShape(type) {
      curShape = type;
      curShapeCount = 0;
      curvePoints = [];
    };

    p.endShape = function endShape(close) {

      if (curShapeCount !== 0) {

        if (close || doFill) {
          curContext.lineTo(firstX, firstY);
        }
        if (doFill) {
          curContext.fill();
        }
        if (doStroke) {
          curContext.stroke();
        }

        curContext.closePath();
        curShapeCount = 0;
        pathOpen = false;

      }

      if (pathOpen) {

        if (doFill) {
          curContext.fill();
        }
        if (doStroke) {
          curContext.stroke();
        }

        curContext.closePath();
        curShapeCount = 0;
        pathOpen = false;

      }

    };

    p.vertex = function vertex(x, y, x2, y2, x3, y3) {

      if (curShapeCount === 0 && curShape !== p.POINTS) {

        pathOpen = true;
        curContext.beginPath();
        curContext.moveTo(x, y);
        firstX = x;
        firstY = y;

      } else {

        if (curShape === p.POINTS) {

          p.point(x, y);

        } else if (arguments.length === 2) {

          if (curShape !== p.QUAD_STRIP || curShapeCount !== 2) {

            curContext.lineTo(x, y);

          }

          if (curShape === p.TRIANGLE_STRIP) {

            if (curShapeCount === 2) {

              // finish shape
              p.endShape(p.CLOSE);
              pathOpen = true;
              curContext.beginPath();

              // redraw last line to start next shape
              curContext.moveTo(prevX, prevY);
              curContext.lineTo(x, y);
              curShapeCount = 1;

            }

            firstX = prevX;
            firstY = prevY;

          }

          if (curShape === p.TRIANGLE_FAN && curShapeCount === 2) {

            // finish shape
            p.endShape(p.CLOSE);
            pathOpen = true;
            curContext.beginPath();

            // redraw last line to start next shape
            curContext.moveTo(firstX, firstY);
            curContext.lineTo(x, y);
            curShapeCount = 1;

          }

          if (curShape === p.QUAD_STRIP && curShapeCount === 3) {

            // finish shape
            curContext.lineTo(prevX, prevY);
            p.endShape(p.CLOSE);
            pathOpen = true;
            curContext.beginPath();

            // redraw lines to start next shape
            curContext.moveTo(prevX, prevY);
            curContext.lineTo(x, y);
            curShapeCount = 1;

          }

          if (curShape === p.QUAD_STRIP) {

            firstX = secondX;
            firstY = secondY;
            secondX = prevX;
            secondY = prevY;

          }

        } else if (arguments.length === 4) {

          if (curShapeCount > 1) {

            curContext.moveTo(prevX, prevY);
            curContext.quadraticCurveTo(firstX, firstY, x, y);
            curShapeCount = 1;

          }

        } else if (arguments.length === 6) {

          curContext.bezierCurveTo(x, y, x2, y2, x3, y3);

        }
      }

      prevX = x;
      prevY = y;
      curShapeCount++;

      if (curShape === p.LINES && curShapeCount === 2 || (curShape === p.TRIANGLES) && curShapeCount === 3 || (curShape === p.QUADS) && curShapeCount === 4) {
        p.endShape(p.CLOSE);
      }

    };

    p.curveVertex = function (x, y, x2, y2) {

      if (curvePoints.length < 3) {

        curvePoints.push([x, y]);

      } else {

        var b = [],
          s = 1 - curTightness;

        /*
           * Matrix to convert from Catmull-Rom to cubic Bezier
           * where t = curTightness
           * |0         1          0         0       |
           * |(t-1)/6   1          (1-t)/6   0       |
           * |0         (1-t)/6    1         (t-1)/6 |
           * |0         0          0         0       |
           */

        curvePoints.push([x, y]);

        b[0] = [curvePoints[1][0], curvePoints[1][1]];
        b[1] = [curvePoints[1][0] + (s * curvePoints[2][0] - s * curvePoints[0][0]) / 6, curvePoints[1][1] + (s * curvePoints[2][1] - s * curvePoints[0][1]) / 6];
        b[2] = [curvePoints[2][0] + (s * curvePoints[1][0] - s * curvePoints[3][0]) / 6, curvePoints[2][1] + (s * curvePoints[1][1] - s * curvePoints[3][1]) / 6];
        b[3] = [curvePoints[2][0], curvePoints[2][1]];

        if (!pathOpen) {
          p.vertex(b[0][0], b[0][1]);
        } else {
          curShapeCount = 1;
        }

        p.vertex(
        b[1][0], b[1][1], b[2][0], b[2][1], b[3][0], b[3][1]);

        curvePoints.shift();
      }

    };

    p.curveTightness = function (tightness) {
      curTightness = tightness;
    };

    p.bezierVertex = p.vertex;

    p.rectMode = function rectMode(aRectMode) {
      curRectMode = aRectMode;
    };
    p.imageMode = function () {};
    p.ellipseMode = function ellipseMode(aEllipseMode) {
      curEllipseMode = aEllipseMode;
    };

    p.arc = function arc(x, y, width, height, start, stop) {

      if (width <= 0) {
        return;
      }

      if (curEllipseMode === p.CORNER) {
        x += width / 2;
        y += height / 2;
      }

      curContext.moveTo(x, y);
      curContext.beginPath();
      curContext.arc(x, y, curEllipseMode === p.CENTER_RADIUS ? width : width / 2, start, stop, false);

      if (doStroke) {
        curContext.stroke();
      }
      curContext.lineTo(x, y);

      if (doFill) {
        curContext.fill();
      }
      curContext.closePath();

    };

    p.line = function line(x1, y1, x2, y2) {
      curContext.beginPath();
      curContext.moveTo(x1 || 0, y1 || 0);
      curContext.lineTo(x2 || 0, y2 || 0);
      curContext.stroke();
      curContext.closePath();
    };

    p.bezier = function bezier(x1, y1, x2, y2, x3, y3, x4, y4) {
      curContext.beginPath();
      curContext.moveTo(x1, y1);
      curContext.bezierCurveTo(x2, y2, x3, y3, x4, y4);
      curContext.stroke();
      curContext.closePath();
    };

    p.bezierPoint = function bezierPoint(a, b, c, d, t) {
      return (1 - t) * (1 - t) * (1 - t) * a + 3 * (1 - t) * (1 - t) * t * b + 3 * (1 - t) * t * t * c + t * t * t * d;
    };

    p.curvePoint = function curvePoint(a, b, c, d, t) {
      return 0.5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
    };

    p.curveTangent = function curveTangent(a, b, c, d, t) {
      return 0.5 * ((-a + c) + 2 * (2 * a - 5 * b + 4 * c - d) * t + 3 * (-a + 3 * b - 3 * c + d) * t * t);
    };

    p.triangle = function triangle(x1, y1, x2, y2, x3, y3) {
      p.beginShape();
      p.vertex(x1, y1);
      p.vertex(x2, y2);
      p.vertex(x3, y3);
      p.endShape();
    };

    p.quad = function quad(x1, y1, x2, y2, x3, y3, x4, y4) {
      curContext.lineCap = "square";
      p.beginShape();
      p.vertex(x1, y1);
      p.vertex(x2, y2);
      p.vertex(x3, y3);
      p.vertex(x4, y4);
      p.endShape();
    };

    p.rect = function rect(x, y, width, height) {

      if (!width && !height) {
        return;
      }

      curContext.beginPath();

      var offsetStart = 0;
      var offsetEnd = 0;

      if (curRectMode === p.CORNERS) {
        width -= x;
        height -= y;
      }

      if (curRectMode === p.RADIUS) {
        width *= 2;
        height *= 2;
      }

      if (curRectMode === p.CENTER || curRectMode === p.RADIUS) {
        x -= width / 2;
        y -= height / 2;
      }

      curContext.rect(
      Math.round(x) - offsetStart, Math.round(y) - offsetStart, Math.round(width) + offsetEnd, Math.round(height) + offsetEnd);

      if (doFill) {
        curContext.fill();
      }
      if (doStroke) {
        curContext.stroke();
      }

      curContext.closePath();

    };

    p.ellipse = function ellipse(x, y, width, height) {

      x = x || 0;
      y = y || 0;

      if (width <= 0 && height <= 0) {
        return;
      }

      curContext.beginPath();

      if (curEllipseMode === p.RADIUS) {
        width *= 2;
        height *= 2;
      }

      var offsetStart = 0;

      // Shortcut for drawing a circle
      if (width === height) {

        curContext.arc(x - offsetStart, y - offsetStart, width / 2, 0, p.TWO_PI, false);

      } else {

        var w = width / 2,
          h = height / 2,
          C = 0.5522847498307933;
        var c_x = C * w,
          c_y = C * h;

        //!      Do we still need this? I hope the Canvas arc() more capable by now?
        curContext.moveTo(x + w, y);
        curContext.bezierCurveTo(x + w, y - c_y, x + c_x, y - h, x, y - h);
        curContext.bezierCurveTo(x - c_x, y - h, x - w, y - c_y, x - w, y);
        curContext.bezierCurveTo(x - w, y + c_y, x - c_x, y + h, x, y + h);
        curContext.bezierCurveTo(x + c_x, y + h, x + w, y + c_y, x + w, y);

      }

      if (doFill) {
        curContext.fill();
      }
      if (doStroke) {
        curContext.stroke();
      }

      curContext.closePath();

    };



    ////////////////////////////////////////////////////////////////////////////
    // Raster drawing functions
    ////////////////////////////////////////////////////////////////////////////
    p.save = function save(file) {};

    var buildImageObject = function buildImageObject(obj) {

      var pixels = obj.data;
      var data = p.createImage(obj.width, obj.height);

      if (data.__defineGetter__ && data.__lookupGetter__ && !data.__lookupGetter__("pixels")) {

        var pixelsDone;

        data.__defineGetter__("pixels", function () {

          if (pixelsDone) {
            return pixelsDone;
          }
          pixelsDone = [];

          for (var i = 0; i < pixels.length; i += 4) {
            pixelsDone.push(
            p.color(
            pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]));
          }

          return pixelsDone;

        });

      } else {

        data.pixels = [];

        for (var i = 0; i < pixels.length; i += 4) {
          data.pixels.push(p.color(
          pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]));
        }

      }

      return data;
    };

    // Loads an image for display. Type is unused. Callback is fired on load.
    p.loadImage = function loadImage(file, type, callback) {

      var img = document.createElement('img');
      img.src = file;
      img.loaded = false;
      img.mask = function () {}; // I don't think image mask was ever implemented? -F1LT3R
      img.onload = function () {

        var h = this.height,
          w = this.width;

        var canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        var context = canvas.getContext("2d");

        context.drawImage(this, 0, 0);
        this.data = buildImageObject(context.getImageData(0, 0, w, h));
        this.data.img = img;

        this.get = this.data.get;
        this.pixels = this.data.pixels;

        this.loaded = true;

        if (callback) {
          callback();
        }
      };

      return img;

    };

    // Gets a single pixel or block of pixels from the current Canvas Context
    p.get = function get(x, y) {

      if (!arguments.length) {
        var c = p.createGraphics(p.width, p.height);
        c.image(curContext, 0, 0);
        return c;
      }

      if (!getLoaded) {
        getLoaded = buildImageObject(curContext.getImageData(0, 0, p.width, p.height));
      }

      return getLoaded.get(x, y);

    };

    // Creates a new Processing instance and passes it back for... processing
    p.createGraphics = function createGraphics(w, h) {

      var canvas = document.createElement("canvas");
      var ret = Processing.build(canvas);
      ret.size(w, h);
      ret.canvas = canvas;
      return ret;

    };

    // Paints a pixel array into the canvas
    p.set = function set(x, y, obj) {

      if (obj && obj.img) {

        p.image(obj, x, y);

      } else {

        var oldFill = curContext.fillStyle,
          color = obj;

        curContext.fillStyle = color;
        curContext.fillRect(Math.round(x), Math.round(y), 1, 1);
        curContext.fillStyle = oldFill;

      }

    };

    // Gets a 1-Dimensional pixel array from Canvas
    p.loadPixels = function () {
      p.pixels = buildImageObject(curContext.getImageData(0, 0, p.width, p.height)).pixels;
    };

    // Draws a 1-Dimensional pixel array to Canvas
    p.updatePixels = function () {

      var colors = /(\d+),(\d+),(\d+),(\d+)/,
        pixels = {};

      pixels.width = p.width;
      pixels.height = p.height;
      pixels.data = [];

      if (curContext.createImageData) {
        pixels = curContext.createImageData(p.width, p.height);
      }

      var data = pixels.data,
        pos = 0;

      for (var i = 0, l = p.pixels.length; i < l; i++) {

        var c = (p.pixels[i] || "rgba(0,0,0,1)").match(colors);

        data[pos + 0] = parseInt(c[1], 10);
        data[pos + 1] = parseInt(c[2], 10);
        data[pos + 2] = parseInt(c[3], 10);
        data[pos + 3] = parseFloat(c[4]) * 255;

        pos += 4;

      }

      curContext.putImageData(pixels, 0, 0);

    };

    // Draw an image or a color to the background
    p.background = function background(img) {
      var c, a;
      if (p.use3DContext) {
        // create alias
        var col = arguments;

        // if user passes in 1 argument, they either want
        // a shade of gray or 
        // it is a color object or
        // it's a hex value
        if (arguments.length === 1) {
          // type passed in was color()
          if (typeof arguments[0] === "string") {
            c = arguments[0].slice(5, -1).split(",");

            // if 3 component color was passed in, alpha will be 1
            // otherwise it will already be normalized.
            curContext.clearColor(c[0] / 255, c[1] / 255, c[2] / 255, c[3]);
          }

          // user passes in value which ranges from 0-255, but opengl
          // wants a normalized value.
          else if (typeof arguments[0] === "number") {
            curContext.clearColor(col[0] / 255, col[0] / 255, col[0] / 255, 1.0);
          }
        } else if (arguments.length === 2) {
          if (typeof arguments[0] === "string") {
            c = arguments[0].slice(5, -1).split(",");
            // Processing is ignoring alpha
            // var a = arguments[0]/255;
            curContext.clearColor(c[0] / 255, c[1] / 255, c[2] / 255, 1.0);
          }
          // first value is shade of gray, second is alpha
          // background(0,255);
          else if (typeof arguments[0] === "number") {
            c = arguments[0] / 255;

            // Processing is ignoring alpha
            // var a = arguments[0]/255;
            a = 1.0;
            curContext.clearColor(c, c, c, a);
          }
        }

        // background(255,0,0) or background(0,255,0,255);
        else if (arguments.length === 3 || arguments.length === 4) {
          // Processing seems to ignore this value, so just use 1.0 instead.
          //var a = arguments.length === 3? 1.0: arguments[3]/255;
          curContext.clearColor(col[0] / 255, col[1] / 255, col[2] / 255, 1.0);
        }
      } else { // 2d context
        if (arguments.length) {
          if (img.data && img.data.img) {
            curBackground = img.data;
          } else {
            curBackground = p.color.apply(this, arguments);
          }
        }

        if (curBackground.img) {
          p.image(img, 0, 0);
        } else {
          var oldFill = curContext.fillStyle;
          curContext.fillStyle = curBackground + "";
          curContext.fillRect(0, 0, p.width, p.height);
          curContext.fillStyle = oldFill;
        }
      }
    };

    // Depreciating "getImage_old" from PJS - currently here to support AniSprite
    var getImage_old = function getImage_old(img) {
      if (typeof img === "string") {
        return document.getElementById(img);
      }
      if (img.img || img.canvas) {
        return img.img || img.canvas;
      }
      for (var i = 0, l = img.pixels.length; i < l; i++) {
        var pos = i * 4;
        var c = (img.pixels[i] || "rgba(0,0,0,1)").slice(5, -1).split(",");
        img.data[pos + 0] = parseInt(c[0], 10);
        img.data[pos + 1] = parseInt(c[1], 10);
        img.data[pos + 2] = parseInt(c[2], 10);
        img.data[pos + 3] = parseFloat(c[3]) * 100;
      }
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var context = canvas.getContext("2d");
      context.putImageData(img, 0, 0);
      img.canvas = canvas;
      return canvas;
    };

    p.AniSprite = function (prefix, frames) {
      this.images = [];
      this.pos = 0;

      for (var i = 0; i < frames; i++) {
        this.images.push(prefix + p.nf(i, ("" + frames).length) + ".gif");
      }

      this.display = function (x, y) {
        p.image_old(this.images[this.pos], x, y);

        if (++this.pos >= frames) {
          this.pos = 0;
        }
      };

      this.getWidth = function () {
        return getImage_old(this.images[0]).width;
      };
      this.getHeight = function () {
        return getImage_old(this.images[0]).height;
      };
    };

    p.createImage = function createImage(w, h, mode) {

      var data = {};
      data.width = w;
      data.height = h;
      data.data = [];

      if (curContext.createImageData) {
        data = curContext.createImageData(w, h);
      }

      data.pixels = new Array(w * h);

      data.get = function (x, y) {
        return this.pixels[w * y + x];
      };

      data._mask = null;

      data.mask = function (img) {
        this._mask = img;
      };

      data.loadPixels = function () {};
      data.updatePixels = function () {};

      return data;

    };

    function getImage(img) {

      if (typeof img === "string") {
        return document.getElementById(img);
      }

      if (img.img) {

        return img.img;

      } else if (img.getContext || img.canvas) {
        if(img.getContext('2d').createImageData) {
          img.pixels = img.getContext('2d').createImageData(img.width, img.height) ;
        } else {
          img.pixels = img.getContext('2d').getImageData(0, 0, img.width, img.height) ;
        }
      }

      for (var i = 0, l = img.pixels.length; i < l; i++) {

        var pos = i * 4;
        var c = (img.pixels[i] || "rgba(0,0,0,1)").slice(5, -1).split(",");

        img.data[pos + 0] = parseInt(c[0], 10);
        img.data[pos + 1] = parseInt(c[1], 10);
        img.data[pos + 2] = parseInt(c[2], 10);
        img.data[pos + 3] = parseFloat(c[3]) * 100;

      }

      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var context = canvas.getContext("2d");
      context.putImageData(img.pixels, 0, 0);

      img.canvas = canvas;

      return img;
    }

    // Depreciating "getImage_old" from PJS - currently here to support AniSprite
    p.image_old = function image_old(img, x, y, w, h) {
      x = x || 0;
      y = y || 0;
      var obj = getImage(img),
        oldAlpha;
      if (curTint >= 0) {
        oldAlpha = curContext.globalAlpha;
        curContext.globalAlpha = curTint / opacityRange;
      }
      if (arguments.length === 3) {
        curContext.drawImage(obj, x, y);
      } else {
        curContext.drawImage(obj, x, y, w, h);
      }
      if (curTint >= 0) {
        curContext.globalAlpha = oldAlpha;
      }
      if (img._mask) {
        var oldComposite = curContext.globalCompositeOperation;
        curContext.globalCompositeOperation = "darker";
        p.image(img._mask, x, y);
        curContext.globalCompositeOperation = oldComposite;
      }
    };

    // Draws an image to the Canvas
    p.image = function image(img, x, y, w, h) {

      if (img.data || img.canvas) {

        x = x || 0;
        y = y || 0;

        var obj = getImage(img.data || img.canvas),
          oldAlpha;

        if (curTint >= 0) {
          oldAlpha = curContext.globalAlpha;
          curContext.globalAlpha = curTint / opacityRange;
        }

        if (arguments.length === 3) {
          curContext.drawImage(obj, x, y);
        } else {
          curContext.drawImage(obj, x, y, w, h);
        }

        if (curTint >= 0) {
          curContext.globalAlpha = oldAlpha;
        }

        if (img._mask) {
          var oldComposite = curContext.globalCompositeOperation;
          curContext.globalCompositeOperation = "darker";
          p.image(img._mask, x, y);
          curContext.globalCompositeOperation = oldComposite;
        }

      }

      if (typeof img === 'string') {

      }

    };

    // Clears a rectangle in the Canvas element or the whole Canvas
    p.clear = function clear(x, y, width, height) {
      if (arguments.length === 0) {
        curContext.clearRect(0, 0, p.width, p.height);
      } else {
        curContext.clearRect(x, y, width, height);
      }
    };

    p.tint = function tint(rgb, a) {
      curTint = a;
    };



    ////////////////////////////////////////////////////////////////////////////
    // Font handling
    ////////////////////////////////////////////////////////////////////////////
    // Loads a font from an SVG or Canvas API
    p.loadFont = function loadFont(name) {

      if (name.indexOf(".svg") === -1) {

        return {
          name: name,
          width: function (str) {
            if (curContext.mozMeasureText) {
              return curContext.mozMeasureText(
              typeof str === "number" ? String.fromCharCode(str) : str) / curTextSize;
            } else {
              return 0;
            }
          }
        };

      } else {

        // If the font is a glyph, calculate by SVG table     
        var font = p.loadGlyphs(name);

        return {
          name: name,
          glyph: true,
          units_per_em: font.units_per_em,
          horiz_adv_x: 1 / font.units_per_em * font.horiz_adv_x,
          ascent: font.ascent,
          descent: font.descent,
          width: function (str) {
            var width = 0;
            var len = str.length;
            for (var i = 0; i < len; i++) {
              try {
                width += parseFloat(p.glyphLook(p.glyphTable[name], str[i]).horiz_adv_x);
              }
              catch(e) {
                Processing.debug(e);
              }
            }
            return width / p.glyphTable[name].units_per_em;
          }
        };

      }

    };

    // Sets a 'current font' for use
    p.textFont = function textFont(name, size) {
      curTextFont = name;
      p.textSize(size);
    };

    // Sets the font size
    p.textSize = function textSize(size) {
      //!   Was this meant to return textSize value if no arguments were passed?
      if (size) {
        curTextSize = size;
      }
    };

    p.textAlign = function textAlign() {};

    // A lookup table for characters that can not be referenced by Object 
    p.glyphLook = function glyphLook(font, chr) {

      try {
        switch (chr) {
        case "1":
          return font.one;
        case "2":
          return font.two;
        case "3":
          return font.three;
        case "4":
          return font.four;
        case "5":
          return font.five;
        case "6":
          return font.six;
        case "7":
          return font.seven;
        case "8":
          return font.eight;
        case "9":
          return font.nine;
        case "0":
          return font.zero;
        case " ":
          return font.space;
        case "$":
          return font.dollar;
        case "!":
          return font.exclam;
        case '"':
          return font.quotedbl;
        case "#":
          return font.numbersign;
        case "%":
          return font.percent;
        case "&":
          return font.ampersand;
        case "'":
          return font.quotesingle;
        case "(":
          return font.parenleft;
        case ")":
          return font.parenright;
        case "*":
          return font.asterisk;
        case "+":
          return font.plus;
        case ",":
          return font.comma;
        case "-":
          return font.hyphen;
        case ".":
          return font.period;
        case "/":
          return font.slash;
        case "_":
          return font.underscore;
        case ":":
          return font.colon;
        case ";":
          return font.semicolon;
        case "<":
          return font.less;
        case "=":
          return font.equal;
        case ">":
          return font.greater;
        case "?":
          return font.question;
        case "@":
          return font.at;
        case "[":
          return font.bracketleft;
        case "\\":
          return font.backslash;
        case "]":
          return font.bracketright;
        case "^":
          return font.asciicircum;
        case "`":
          return font.grave;
        case "{":
          return font.braceleft;
        case "|":
          return font.bar;
        case "}":
          return font.braceright;
        case "~":
          return font.asciitilde;
          // If the character is not 'special', access it by object reference
        default:
          return font[chr];
        }
      } catch(e) {
        Processing.debug(e);
      }

    };

    // Print some text to the Canvas
    p.text = function text(str, x, y) {

      // If the font is a standard Canvas font...
      if (!curTextFont.glyph) {

        if (str && curContext.mozDrawText) {

          curContext.save();
          curContext.mozTextStyle = curTextSize + "px " + curTextFont.name;
          curContext.translate(x, y);
          curContext.mozDrawText(
          typeof str === "number" ? String.fromCharCode(str) : str);
          curContext.restore();

        }

      } else {

        // If the font is a Batik SVG font...
        var font = p.glyphTable[curTextFont.name];
        curContext.save();
        curContext.translate(x, y + curTextSize);

        var upem = font.units_per_em,
          newScale = 1 / upem * curTextSize;

        curContext.scale(newScale, newScale);

        var len = str.length;

        for (var i = 0; i < len; i++) {
          // Test character against glyph table
          try {
            p.glyphLook(font, str[i]).draw();
          }
          catch(e) {
            Processing.debug(e);
          }
        }

        curContext.restore();
      }

    };

    // Load Batik SVG Fonts and parse to pre-def objects for quick rendering 
    p.loadGlyphs = function loadGlyph(url) {

      var x, y, cx, cy, nx, ny, d, a, lastCom, lenC, horiz_adv_x, getXY = '[0-9\\-]+',
        path;

      // Return arrays of SVG commands and coords
      // get this to use p.matchAll() - will need to work around the lack of null return
      var regex = function regex(needle, hay) {
        var i = 0,
          results = [],
          latest, regexp = new RegExp(needle, "g");
        latest = results[i] = regexp.exec(hay);
        while (latest) {
          i++;
          latest = results[i] = regexp.exec(hay);
        }
        return results;
      };

      var buildPath = function buildPath(d) {
        var c = regex("[A-Za-z][0-9\\- ]+|Z", d);

        // Begin storing path object 
        path = "var path={draw:function(){curContext.beginPath();curContext.save();";

        x = 0;
        y = 0;
        cx = 0;
        cy = 0;
        nx = 0;
        ny = 0;
        d = 0;
        a = 0;
        lastCom = "";
        lenC = c.length - 1;

        // Loop through SVG commands translating to canvas eqivs functions in path object
        for (var j = 0; j < lenC; j++) {

          var com = c[j][0],
            xy = regex(getXY, com);

          switch (com[0]) {

          case "M":
            //curContext.moveTo(x,-y);
            x = parseFloat(xy[0][0]);
            y = parseFloat(xy[1][0]);
            //!                 Brackets needed on (-y)?
            path += "curContext.moveTo(" + x + "," + (-y) + ");";
            break;

          case "L":
            //curContext.lineTo(x,-y);
            x = parseFloat(xy[0][0]);
            y = parseFloat(xy[1][0]);
            path += "curContext.lineTo(" + x + "," + (-y) + ");";
            break;

          case "H":
            //curContext.lineTo(x,-y)
            x = parseFloat(xy[0][0]);
            path += "curContext.lineTo(" + x + "," + (-y) + ");";
            break;

          case "V":
            //curContext.lineTo(x,-y);
            y = parseFloat(xy[0][0]);
            path += "curContext.lineTo(" + x + "," + (-y) + ");";
            break;

          case "T":
            //curContext.quadraticCurveTo(cx,-cy,nx,-ny);
            nx = parseFloat(xy[0][0]);
            ny = parseFloat(xy[1][0]);

            if (lastCom === "Q" || lastCom === "T") {

              d = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(cy - y, 2));
              a = Math.PI + Math.atan2(cx - x, cy - y);
              cx = x + (Math.sin(a) * (d));
              cy = y + (Math.cos(a) * (d));

            } else {
              cx = x;
              cy = y;
            }

            path += "curContext.quadraticCurveTo(" + cx + "," + (-cy) + "," + nx + "," + (-ny) + ");";
            x = nx;
            y = ny;
            break;

          case "Q":
            //curContext.quadraticCurveTo(cx,-cy,nx,-ny);
            cx = parseFloat(xy[0][0]);
            cy = parseFloat(xy[1][0]);
            nx = parseFloat(xy[2][0]);
            ny = parseFloat(xy[3][0]);
            path += "curContext.quadraticCurveTo(" + cx + "," + (-cy) + "," + nx + "," + (-ny) + ");";
            x = nx;
            y = ny;
            break;

          case "Z":
            //curContext.closePath();
            path += "curContext.closePath();";
            break;
          }
          lastCom = com[0];
        }

        path += "doStroke?curContext.stroke():0;";
        path += "doFill?curContext.fill():0;";
        path += "curContext.restore();";
        path += "curContext.translate(" + horiz_adv_x + ",0);";
        path += "}}";

        return path;
      };


      // Parse SVG font-file into block of Canvas commands
      var parseSVGFont = function parseSVGFontse(svg) {

        // Store font attributes
        var font = svg.getElementsByTagName("font");
        p.glyphTable[url].horiz_adv_x = font[0].getAttribute("horiz-adv-x");

        var font_face = svg.getElementsByTagName("font-face")[0];
        p.glyphTable[url].units_per_em = parseFloat(font_face.getAttribute("units-per-em"));
        p.glyphTable[url].ascent = parseFloat(font_face.getAttribute("ascent"));
        p.glyphTable[url].descent = parseFloat(font_face.getAttribute("descent"));

        var glyph = svg.getElementsByTagName("glyph"),
          len = glyph.length;

        // Loop through each glyph in the SVG
        for (var i = 0; i < len; i++) {
          // Store attributes for this glyph
          var unicode = glyph[i].getAttribute("unicode");
          var name = glyph[i].getAttribute("glyph-name");
          horiz_adv_x = glyph[i].getAttribute("horiz-adv-x");
          if (horiz_adv_x === null) {
            horiz_adv_x = p.glyphTable[url].horiz_adv_x;
          }
          d = glyph[i].getAttribute("d");
          // Split path commands in glpyh 
          if (d !== undefined) {
            path = buildPath(d);
            eval(path);
            // Store glyph data to table object
            p.glyphTable[url][name] = {
              name: name,
              unicode: unicode,
              horiz_adv_x: horiz_adv_x,
              draw: path.draw
            };
          }
        } // finished adding glyphs to table            
      };

      // Load and parse Batik SVG font as XML into a Processing Glyph object
      var loadXML = function loadXML() {
        var xmlDoc;

        try {
          xmlDoc = document.implementation.createDocument("", "", null);
        }
        catch(e_fx_op) {
          Processing.debug(e_fx_op.message);
          return;
        }

        try {
          xmlDoc.async = false;
          xmlDoc.load(url);
          parseSVGFont(xmlDoc.getElementsByTagName("svg")[0]);
        }
        catch(e_sf_ch) {
          // Google Chrome, Safari etc.
          Processing.debug(e_sf_ch);
          try {

            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET", url, false);
            xmlhttp.send(null);
            parseSVGFont(xmlhttp.responseXML.documentElement);
          }
          catch(e) {
            Processing.debug(e_sf_ch);
          }
        }
      };

      // Create a new object in glyphTable to store this font
      p.glyphTable[url] = {};

      // Begin loading the Batik SVG font... 
      loadXML(url);

      // Return the loaded font for attribute grabbing
      return p.glyphTable[url];
    };



    ////////////////////////////////////////////////////////////////////////////
    // Class methods
    ////////////////////////////////////////////////////////////////////////////
    p.extendClass = function extendClass(obj, args, fn) {
      if (arguments.length === 3) {
        fn.apply(obj, args);
      } else {
        args.call(obj);
      }
    };

    p.addMethod = function addMethod(object, name, fn) {
      if (object[name]) {
        var args = fn.length,
          oldfn = object[name];

        object[name] = function () {
          if (arguments.length === args) {
            return fn.apply(this, arguments);
          } else {
            return oldfn.apply(this, arguments);
          }
        };
      } else {
        object[name] = fn;
      }
    };


    ////////////////////////////////////////////////////////////////////////////
    // Set up environment
    ////////////////////////////////////////////////////////////////////////////
    p.init = function init(code) {

      if (code) {
        (function (Processing) {

          with(p) {
            var parsedCode = this.Processing.parse(code, p);

            if (!p.use3DContext) {
              // Setup default 2d canvas context. 
              curContext = curElement.getContext('2d');

              // Canvas has trouble rendering single pixel stuff on whole-pixel
              // counts, so we slightly offset it (this is super lame).
              curContext.translate(0.5, 0.5);

              curContext.lineCap = 'round';

              // Set default stroke and fill color
              p.stroke(0);
              p.fill(255);

              p.disableContextMenu();
              
            }

            eval(parsedCode);
          }

        })(p);

      }

      // Run void setup()
      if (p.setup) {
        inSetup = true;
        p.setup();
      }

      inSetup = false;

      if (p.draw) {
        if (!doLoop) {
          p.redraw();
        } else {
          p.loop();
        }
      }


      //////////////////////////////////////////////////////////////////////////
      // Event handling
      //////////////////////////////////////////////////////////////////////////

      function attach(elem, type, fn) {
        if (elem.addEventListener) {
          elem.addEventListener(type, fn, false);
        } else {
          elem.attachEvent("on" + type, fn);
        }
      }

      attach(curElement, "mousemove", function (e) {

        p.pmouseX = p.mouseX;
        p.pmouseY = p.mouseY;

        var scrollX = (window.scrollX !== null && typeof window.scrollX !== 'undefined') ? window.scrollX : window.pageXOffset;
        var scrollY = (window.scrollY !== null && typeof window.scrollY !== 'undefined') ? window.scrollY : window.pageYOffset;

        p.mouseX = e.clientX - curElement.offsetLeft + scrollX;
        p.mouseY = e.clientY - curElement.offsetTop + scrollY;
        p.cursor(curCursor);

        if (p.mouseMoved) {
          p.mouseMoved();
        }
        if (mousePressed && p.mouseDragged) {
          p.mouseDragged();
        }
      });

      attach(curElement, "mouseout", function (e) {
        document.body.style.cursor = oldCursor;
      });

      attach(curElement, "mousedown", function (e) {
        mousePressed = true;
        switch (e.which) {
        case 1:
          p.mouseButton = p.LEFT;
          break;
        case 2:
          p.mouseButton = p.CENTER;
          break;
        case 3:
          p.mouseButton = p.RIGHT;
          break;
        }
        p.mouseDown = true;
        if (typeof p.mousePressed === "function") {
          p.mousePressed();
        } else {
          p.mousePressed = true;
        }
      });

      attach(curElement, "mouseup", function (e) {
        mousePressed = false;
        if (p.mouseClicked) {
          p.mouseClicked();
        }
        if (typeof p.mousePressed !== "function") {
          p.mousePressed = false;
        }
        if (p.mouseReleased) {
          p.mouseReleased();
        }
      });

      attach(document, "keydown", function (e) {
        keyPressed = true;
        p.key = e.keyCode + 32;
        var wasCoded = false;
        for (var i = 0, l = p.codedKeys.length; i < l; i++) {
          if (p.key === p.codedKeys[i]) {
            wasCoded = true;
            switch (p.key) {
            case 70:
              p.keyCode = p.UP;
              break;
            case 71:
              keyCode = p.RIGHT;
              break;
            case 72:
              p.keyCode = p.DOWN;
              break;
            case 69:
              p.keyCode = p.LEFT;
              break;
            }
            p.key = p.CODED;
          }
        }
        if (!wasCoded){ p.keyCode = null; }
        if (e.shiftKey) {
          p.key = String.fromCharCode(p.key).toUpperCase().charCodeAt(0);
        }
        if (typeof p.keyPressed === "function") {
          p.keyPressed();
        } else {
          p.keyPressed = true;
        }
      });
      
      attach(document, "keyup", function (e) {
        keyPressed = false;
        if (typeof p.keyPressed !== "function") {
          p.keyPressed = false;
        }
        if (p.keyReleased) {
          p.keyReleased();
        }
      });

    };

    return p;

  };

})();
