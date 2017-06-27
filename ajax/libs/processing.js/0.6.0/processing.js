/*

    P R O C E S S I N G . J S - 0 . 6
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
                    BuildingSky: http://weare.buildingsky.net/pages/processing-js

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
      // Get data-src instead of datasrc
      var datasrc = canvas[i].getAttribute('data-src');
      if(datasrc===null){
        // Temporary fallback for datasrc
        datasrc = canvas[i].getAttribute('datasrc');
      }
      if (datasrc) {
        Processing(canvas[i], ajax(datasrc));
      }
    }
  };
  
	/*
    Andor Salga
    asalga.wordpress.com
    Compatibility wrapper for older browsers
  */
  var newWebGLArray = function(data)
  {
    var WebGLFloatArrayExists = false;

    try{
      WebGLFloatArray;
      WebGLFloatArrayExists = true;
    }
    catch(e){}     

    return WebGLFloatArrayExists === true ? new WebGLFloatArray(data) : new CanvasFloatArray(data);    
  };

  var programObject;

  var boxVerts = [0.5,0.5,-0.5,0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,0.5,-0.5, 0.5, 0.5,-0.5, 0.5, 0.5, 0.5,-0.5, 0.5, 0.5,-0.5,-0.5, 0.5,-0.5,-0.5, 0.5, 0.5,-0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,-0.5,0.5,0.5,0.5,0.5,-0.5,0.5,0.5,-0.5,0.5,0.5,-0.5,-0.5,0.5,0.5,-0.5,0.5,-0.5,-0.5,0.5,-0.5,0.5,-0.5,-0.5,0.5,-0.5,-0.5,0.5,-0.5,-0.5,-0.5,0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,0.5,-0.5,0.5,0.5,-0.5,0.5,0.5,-0.5,0.5,-0.5,-0.5,-0.5,-0.5,0.5,0.5, 0.5, 0.5, 0.5,-0.5,-0.5, 0.5,-0.5,-0.5, 0.5,-0.5,-0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
  var boxOutlineVerts = [0.5, 0.5, 0.5, 0.5,-0.5, 0.5, 0.5, 0.5,-0.5, 0.5,-0.5,-0.5,-0.5, 0.5,-0.5,-0.5,-0.5,-0.5,-0.5, 0.5, 0.5,-0.5,-0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,-0.5, 0.5, 0.5,-0.5,-0.5,0.5,-0.5,-0.5, 0.5,-0.5,-0.5, 0.5, 0.5,-0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,-0.5, 0.5, 0.5,-0.5,-0.5, 0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5, 0.5,-0.5,-0.5,0.5, 0.5,-0.5,0.5];
  
  var boxBuffer;
  var boxOutlineBuffer;
	
	var sphereBuffer;

  var lineBuffer;

  var pointBuffer;
  
  var vertexShaderSource = 
  "attribute vec3 Vertex;" +
  
  "uniform vec4 color;" +

  "uniform mat4 model;" +
  "uniform mat4 view;" +
  "uniform mat4 projection;" +

  "void main(void){" +
  "  gl_FrontColor = color;" +
  "  gl_Position = projection * view * model * vec4(Vertex, 1.0);" +
  "}";

  var fragmentShaderSource = 
  "void main(void){" +
  "  gl_FragColor = gl_Color;" +
  "}";

  document.addEventListener('DOMContentLoaded', function () {
    init();
  },
  false);

  // Place-holder for debugging function
  Processing.debug = function (e) {
  };

  // Parse Processing (Java-like) syntax to JavaScript syntax with Regex
  Processing.parse = function parse(aCode, p) {

    // Force characters-as-bytes to work.
    aCode = aCode.replace(/('(.){1}')/g, "$1.charCodeAt(0)");

    // Saves all strings into an array
    // masks all strings into <STRING n>
    // to be replaced with the array strings after parsing is finishes
    var strings = [];
    aCode = aCode.replace(/(["'])(\\\1|.)*?(\1)/g, function(all) {
      strings.push(all);
      return "<STRING " + (strings.length -1) + ">";
    });

    // Remove end-of-line comments
    aCode = aCode.replace(/\/\/.*\n/g, "\n");

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
        return "processing." + name + " = function " + name + args;
      }
    });

    // Attach import() to p{} bypassing JS command, allowing for extrernal library loading
    //aCode = aCode.replace(/import \(|import\(/g, "p.Import(");

    // Delete import statements, ie. import processing.video.*;
    // https://processing-js.lighthouseapp.com/projects/41284/tickets/235-fix-parsing-of-java-import-statement
    aCode = aCode.replace(/import\s+(.+);/g, "");

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

    var classes = ["int", "float", "boolean", "String", "byte", "double", "long", "ArrayList"];

    var classReplace = function (all, name, extend, vars, last) {
      classes.push(name);

      var staticVar = "";

      vars = vars.replace(/final\s+var\s+(\w+\s*=\s*.*?;)/g, function (all, setting) {
        staticVar += " " + name + "." + setting;
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
    var matchNoCon = /(?:public |abstract |static )*class (\w+)\s*(?:extends\s*(\w+)\s*)?\{\s*((?:.|\n)*?)(processing)/g;

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
      rest = rest.replace(/(?:public )?processing.\w+ = function (\w+)\((.*?)\)/g, function (all, name, args) {
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
    aCode = aCode.replace(/processing.\w+ = function addMethod/g, "addMethod");


    // Check if 3D context is invoked -- this is not the best way to do this.
    if (aCode.match(/size\((?:.+),(?:.+),\s*(OPENGL|P3D)\s*\);/)) {
      p.use3DContext = true;
    }

    // Handle (int) Casting
    aCode = aCode.replace(/\(int\)/g, "0|");

    // Remove Casting
    aCode = aCode.replace(new RegExp("\\((" + classes.join("|") + ")(\\[\\])*\\)", "g"), "");

    // Force numbers to exist //
    //aCode = aCode.replace(/([^.])(\w+)\s*\+=/g, "$1$2 = ($2||0) +");

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

    // replaces all masked strings from <STRING n> to the appropriate string contained in the strings array
    for( var i = 0; i < strings.length; i++ ) {
      aCode = aCode.replace(new RegExp("(.*)(<STRING " + i + ">)(.*)", "g"), function(all, quoteStart, match, quoteEnd){
        var returnString = all, notString = true, quoteType = "", escape = false;

        for (var x = 0; x < quoteStart.length; x++) {
          if (notString) {
            if (quoteStart.charAt(x) === "\"" || quoteStart.charAt(x) === "'") {
              quoteType = quoteStart.charAt(x);
              notString = false;
            }
          } else {
            if (!escape) {
              if (quoteStart.charAt(x) === "\\") {
                escape = true;
              } else if (quoteStart.charAt(x) === quoteType) {
                notString = true;
                quoteType = "";
              }
            } else { 
              escape = false; 
            }
          }
        }

        if (notString) { // Match is not inside a string
          returnString = quoteStart + strings[i] + quoteEnd;
        }

        return returnString;
      });
    }

    return aCode;
  };

  // Attach Processing functions to 'p'
  Processing.build = function buildProcessing(curElement) {

    // Create the 'p' object
    var p = {};
    var curContext;
    p.use3DContext = false; // default '2d' canvas context

    // Set Processing defaults / environment variables
    p.name = 'Processing.js Instance';
    p.PI = Math.PI;
    p.TWO_PI = 2 * p.PI;
    p.HALF_PI = p.PI / 2;
		p.SINCOS_LENGTH = parseInt(360/0.5, 10);
    p.MAX_FLOAT = 3.4028235e+38;
    p.MIN_FLOAT = -3.4028235e+38;
    p.MAX_INT = 2147483647;
    p.MIN_INT = -2147483648;
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
    p.P3D = 'P3D';
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
    p.CENTER = 88888880;
    p.NORMAL_MODE_AUTO = 0;
    p.NORMAL_MODE_SHAPE = 1;
    p.NORMAL_MODE_VERTEX = 2;
		
    // Key Constants
    // both key and keyCode will be equal to these values
    p.BACKSPACE = 8;
    p.TAB       = 9;
    p.ENTER     = 10;
    p.RETURN    = 13;
    p.ESC       = 27;
    p.DELETE    = 127;

    p.CODED = 0xffff; 
    // key will be CODED and keyCode will be this value
    p.SHIFT     = 16;
    p.CONTROL   = 17;
    p.ALT       = 18;
    p.UP        = 38;
    p.RIGHT     = 39;
    p.DOWN      = 40;
    p.LEFT      = 37;

    var codedKeys = [p.SHIFT, p.CONTROL, p.ALT, p.UP, p.RIGHT, p.DOWN, p.LEFT];

    // "Private" variables used to maintain state
    var online = true,
      doFill = true,
      fillStyle = "rgba( 255, 255, 255, 1 )",
      doStroke = true,
      strokeStyle = "rgba( 204, 204, 204, 1 )",
      lineWidth = 1,
      loopStarted = false,
      hasBackground = false,
      doLoop = true,
      looping = 0,
      curRectMode = p.CORNER,
      curEllipseMode = p.CENTER,
      normalX = 0,
      normalY = 0,
      normalZ = 0,
      normalMode = p.NORMAL_MODE_AUTO,
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
      mouseDragging = false,
      keyPressed = false,
      curColorMode = p.RGB,
      curTint = -1,
      curTextSize = 12,
      curTextFont = "Arial",
      getLoaded = false,
      start = new Date().getTime(),
      timeSinceLastFPS = start,
      framesSinceLastFPS = 0;
		
		//sphere stuff
		var sphereDetailV = 0,
        sphereDetailU = 0,
        sphereX     = [],
        sphereY     = [],
        sphereZ     = [],
        sinLUT      = new Array( p.SINCOS_LENGTH ),
        cosLUT      = new Array( p.SINCOS_LENGTH ),
        sphereVerts,
        sphereNorms;
    
		// Camera defaults and settings
    var cam,
      cameraInv,
      forwardTransform,
      modelView,
      modelViewInv,
      userMatrixStack,
      inverseCopy,
      projection,
      frustumMode = false,
      cameraFOV = 60 * (Math.PI / 180),
      cameraX = curElement.width / 2,
      cameraY = curElement.height / 2,
      cameraZ = cameraY / Math.tan(cameraFOV / 2),
      cameraNear = cameraZ / 10,
      cameraFar = cameraZ * 10,
      cameraAspect = curElement.width / curElement.height;

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
		
		p.sort = function(array, numElem){
			var ret = [];

			// depending on the type used (int, float) or string
			// we'll need to use a different compare function
			if(array.length > 0){
				// copy since we need to return another array
				var elemsToCopy = numElem > 0 ? numElem : array.length;
				for(var i=0; i < elemsToCopy; i++){
					ret.push(array[i]);
				}
				if(typeof array[0] === "string"){  
					ret.sort();
				}
				// int or float
				else{
					ret.sort(function(a,b){return a-b;});
				}
						
				// copy on the rest of the elements that were not sorted in case the user
				// only wanted a subset of an array to be sorted.
				if(numElem > 0){
					for(var j = ret.length; j < array.length; j++){
						ret.push(array[j]);
					}
				}
			}
			return ret;
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
      function toRGB(h, s, b) {
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
          rgb = toRGB(aValue1, aValue2, aValue3);
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
    p.translate = function translate(x, y, z) {
      if (p.use3DContext) {
        forwardTransform.translate(x, y, z);
      } else {
        curContext.translate(x, y);
      }
    };
    p.scale = function scale( x, y, z ) {
      if ( p.use3DContext ) {
        forwardTransform.scale( x, y, z );
      } else {
        curContext.scale( x, y || x );
      }
    };
    p.pushMatrix = function pushMatrix() {
      if (p.use3DContext) {
        userMatrixStack.load(modelView);
      } else {
        curContext.save();
      }
    };

    p.popMatrix = function popMatrix() {
      if (p.use3DContext) {
        modelView.set(userMatrixStack.pop());
      } else {
        curContext.restore();
      }
    };

    p.resetMatrix = function resetMatrix() {
      forwardTransform.reset();
    };
    
    p.applyMatrix = function applyMatrix(){
      var a = arguments;
      if( !p.use3DContext ) {
        for( var cnt = a.length; cnt < 16; cnt++ ) {
          a[cnt] = 0;
        }

        a[ 10 ] = a [ 15 ] = 1;
      }

      forwardTransform.apply( a[0],	 a[1],  a[2],	 a[3],
                              a[4],	 a[5],  a[6],  a[7],
                              a[8],	 a[9],  a[10], a[11],
                              a[12], a[13], a[14], a[15] );
    };
    
    p.rotateX = function( angleInRadians ) {
      forwardTransform.rotateX( angleInRadians );
    };
    
    p.rotateZ = function( angleInRadians ) {
      forwardTransform.rotateZ( angleInRadians );
    };

    p.rotateY = function( angleInRadians ) {
      forwardTransform.rotateY( angleInRadians );
    };
		
		p.rotate = function rotate( angleInRadians ) {
      if (p.use3DContext) {  
				forwardTransform.rotateZ( angleInRadians );
			}else { curContext.rotate( angleInRadians ); }
    };
		
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
      loopStarted = false;
      clearInterval(looping);
    };

    p.redraw = function redraw() {
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
        curContext.clear(curContext.COLOR_BUFFER_BIT | curContext.DEPTH_BUFFER_BIT);
        p.camera();
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

      doLoop = true;
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
    function decToBin(value, numBitsInValue) {
			var mask = 1;
			mask = mask << (numBitsInValue-1);

			var str = "";
			for(var i=0; i < numBitsInValue ;i++) {
				str += (mask & value) ? "1" : "0";
				mask = mask >>> 1; 
			}
			return str;
		}

		p.binary = function(num, numBits) {
			var numBitsInValue = 32;
				
			// color
			if(typeof num === "string" && num.length > 1) {
				var c = num.slice(5,-1).split(",");
						
				// if all components are zero, a single "0" is returned for some reason
        // [0] alpha is normalized, [1] r, [2] g, [3] b
				var sbin = [
				decToBin(c[3]*255,8),
				decToBin(c[0],8),
				decToBin(c[1],8),
				decToBin(c[2],8)
				];
						
				var s = sbin[0]+sbin[1]+sbin[2]+sbin[3];
						
				if(numBits) { 
					s = s.substr(-numBits);
				}
				// if the user didn't specify number of bits,
				// trim leading zeros.
				else {
					s = s.replace(/^0+$/g,"0");
					s = s.replace(/^0{1,}1/g,"1");
				}
				return s;
			}
				
			// char
			if(typeof num === "string") {
				num = num.charCodeAt(0);
						
				if(numBits) {
					numBitsInValue = 32;
				}
				else {
					numBitsInValue = 16;
				}
			}
				
			var str = decToBin(num, numBitsInValue);
				
			// trim string if user wanted less chars
			if(numBits) {
				str = str.substr(-numBits);
			}    
			return str;
		};  

    p.unbinary = function unbinary(binaryString) {
      var binaryPattern = new RegExp("^[0|1]{8}$");
      var addUp = 0;

      if (isNaN(binaryString)) {
        throw "NaN_Err";
      } else {
        if (arguments.length === 1 || binaryString.length === 8) {
          if (binaryPattern.test(binaryString)) {
            for (var i = 0; i < 8; i++) {
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
      var str, len, formatLength, rounded;

      // array handling
      if (typeof num === "object" && num.constructor === Array) {
        str = new Array(0);
        len = num.length;
        for (var i = 0; i < len; i++) {
          str[i] = p.nfs(num[i], left, right);
        }
      } else if (arguments.length === 3) {
        var negative = num < 0 ? true : false;

        // Make it work exactly like p5 for right = 0
        if ( right === 0 ) {
          right = 1;
        }
        
        if ( right < 0 ) {
          rounded = Math.round(num);
        } else {
          // round to 'right' decimal places
          rounded = Math.round(num * Math.pow(10,right)) / Math.pow(10,right);
        }

        // split number into whole and fractional components
        var splitNum = Math.abs(rounded).toString().split("."); // [0] whole number, [1] fractional number

        // format whole part
        formatLength = left - splitNum[0].length;
        for(; formatLength > 0; formatLength--) {
          splitNum[0] = "0" + splitNum[0];
        }

        // format fractional part
        if ( splitNum.length === 2 || right > 0 ) {
          splitNum[1] = splitNum.length === 2 ? splitNum[1] : "";
          formatLength = right - splitNum[1].length;
          for(; formatLength > 0; formatLength--) {
            splitNum[1] += "0";
          }
          str = splitNum.join(".");
        } else {
          str = splitNum[0]; 
        }

        str = (negative ? "-" : " ") + str;
      } else if (arguments.length === 2) {
        str = p.nfs(num, left, -1);
      }
      return str;
    };

    p.nfp = function (num, left, right) {
      var str, len, formatLength, rounded;

      // array handling
      if (typeof num === "object" && num.constructor === Array) {
        str = new Array(0);
        len = num.length;
        for (var i = 0; i < len; i++) {
          str[i] = p.nfp(num[i], left, right);
        }
      } else if (arguments.length === 3) {
        var negative = num < 0 ? true : false;

        // Make it work exactly like p5 for right = 0
        if ( right === 0 ) {
          right = 1;
        }
        
        if ( right < 0 ) {
          rounded = Math.round(num);
        } else {
          // round to 'right' decimal places
          rounded = Math.round(num * Math.pow(10,right)) / Math.pow(10,right);
        }

        // split number into whole and fractional components
        var splitNum = Math.abs(rounded).toString().split("."); // [0] whole number, [1] fractional number

        // format whole part
        formatLength = left - splitNum[0].length;
        for(; formatLength > 0; formatLength--) {
          splitNum[0] = "0" + splitNum[0];
        }

        // format fractional part
        if ( splitNum.length === 2 || right > 0 ) {
          splitNum[1] = splitNum.length === 2 ? splitNum[1] : "";
          formatLength = right - splitNum[1].length;
          for(; formatLength > 0; formatLength--) {
            splitNum[1] += "0";
          }
          str = splitNum.join(".");
        } else {
          str = splitNum[0]; 
        }

        str = (negative ? "-" : "+") + str;
      } else if (arguments.length === 2) {
        str = p.nfp(num, left, -1);
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

    var decimalToHex = function decimalToHex(d, padding) {
      //if there is no padding value added, default padding to 8 else go into while statement.
      padding = typeof(padding) === "undefined" || padding === null ? padding = 8 : padding;
      if (d < 0) {
        d = 0xFFFFFFFF + d + 1;
      }
      var hex = Number(d).toString(16).toUpperCase();
      while (hex.length < padding) {
        hex = "0" + hex;
      }
      if (hex.length >= padding){
        hex = hex.substring(hex.length - padding, hex.length);
      }
      return hex;
    };
    // note: since we cannot keep track of byte, char, and int types by default the returned string is 8 chars long
    // if no 2nd argument is passed.  closest compromise we can use to match java implementation Feb 5 2010
    // also the char parser has issues with chars that are not digits or letters IE: !@#$%^&*
    p.hex = function hex(value, len) {
      var hexstring = "";
      var patternRGBa = /^rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,\d?\.?\d*)?\)$/i; //match rgba(20,20,20,0) or rgba(20,20,20)
      if (arguments.length === 1) {
        hexstring = hex(value, 8);
      } else {
        if (patternRGBa.test(value)) {
          // its a color
          hexstring = decimalToHex(p.rgbaToInt(value),len);
        } else {
          // its a byte, char, or int
          hexstring = decimalToHex(value, len);
        }
      }
      return hexstring;
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
    // This breaks the join() ref-test. The Processing.org documentation says String or String[]. SHOULD BE FIXED NOW
		p.nf = function() {
      var str, num, pad, arr, left, right, isNegative, test, i;

      if ( arguments.length === 2 && typeof arguments[0] === 'number' && typeof arguments[1] === 'number' && (arguments[0]+"").indexOf('.') === -1 ) {
        num = arguments[0];
        pad = arguments[1];

        isNegative = num < 0;

        if ( isNegative ) {
          num = Math.abs(num);
        }

        str = "" + num;
        for ( i = pad - str.length; i > 0; i-- ) {
          str = "0" + str;
        }

        if ( isNegative ) {
          str = "-" + str;
        }
      } else if ( arguments.length === 2 && typeof arguments[0] === 'object' && arguments[0].constructor === Array && typeof arguments[1] === 'number' ) {
        arr = arguments[0];
        pad = arguments[1];

        str = new Array( arr.length );

        for ( i = 0; i < arr.length && str !== undefined; i++ ) {
          test = this.nf( arr[i], pad );
          if ( test === undefined ) {
            str = undefined;
          } else {
            str[i] = test;
          }
        }
      } else if ( arguments.length === 3 && typeof arguments[0] === 'number' && typeof arguments[1] === 'number' && typeof arguments[2] === 'number' && (arguments[0]+"").indexOf( '.' ) >= 0 ) {
        num = arguments[0];
        left = arguments[1];
        right = arguments[2];

        isNegative = num < 0;

        if ( isNegative ) {
          num = Math.abs(num);
        }

        // Change the way the number is 'floored' based on whether it is odd or even.
        if ( right < 0 && Math.floor( num ) % 2 === 1 ) {
          // Make sure 1.49 rounds to 1, but 1.5 rounds to 2.
          if ( (num) - Math.floor( num ) >= 0.5 ) {
            num = num + 1;
          }
        }

        str = "" + num;

        for ( i = left - str.indexOf( '.' ); i > 0; i-- ) {
          str = "0" + str;  
        }

        var numDec = str.length - str.indexOf( '.' ) - 1;
        if ( numDec <= right ) {
          for ( i = right - ( str.length - str.indexOf( '.' ) - 1 ); i > 0; i-- ) {
            str = str + "0";  
          }
        } else if ( right > 0 ) {
          str = str.substring( 0, str.length - ( numDec - right ) );
        } else if ( right < 0 ) {

          str = str.substring( 0, str.indexOf( '.' ) );
        }

        if ( isNegative ) {
          str = "-" + str;
        }
      } else if ( arguments.length === 3 && typeof arguments[0] === 'object' && arguments[0].constructor === Array && typeof arguments[1] === 'number' && typeof arguments[2] === 'number' ) {
        arr = arguments[0];
        left = arguments[1];
        right = arguments[2];

        str = new Array( arr.length );

        for ( i = 0; i < arr.length && str !== undefined; i++ ) {
          test = this.nf( arr[i], left, right );
          if ( test === undefined ) {
            str = undefined;
          } else {
            str[i] = test;
          }
        }
      }

      return str;
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
		
		String.prototype.equals = function equals( str ) {
      var ret = true;

      if ( this.length === str.length ) {
        for ( var i = 0; i < this.length; i++) {
          if ( this.charAt( i ) !== str.charAt( i ) ) {
            ret = false;
            break;
          }
        }
      } else {
        ret = false;
      }

      return ret;
    };
		
    p.match = function (str, regexp) {
      return str.match(regexp);
    };

    // tinylog lite JavaScript library
    // http://purl.eligrey.com/tinylog/lite
        var tinylogLite = (function () {
      "use strict";

      var tinylogLite = {},
      undef           = "undefined",
      func            = "function",
      False           = !1,
      True            = !0,
      log             = "log";
  
      if (typeof tinylog !== undef && typeof tinylog[log] === func) {
        // pre-existing tinylog present
        tinylogLite[log] = tinylog[log];
      } else if (typeof document !== undef && !document.fake) { (function () {
        // DOM document
        var doc = document,
    
        $div   = "div",
        $style = "style",
        $title = "title",
    
        containerStyles = {
          zIndex: 10000,
          position: "fixed",
          bottom: "0px",
          width: "100%",
          height: "15%",
          fontFamily: "sans-serif",
          color: "black",
          backgroundColor: "white"
        },
        outputStyles = {
          position: "relative",
          fontFamily: "monospace",
          overflow: "auto",
          height: "100%"
        },
        resizerStyles = {
          height: "5px",
          marginTop: "-5px",
          cursor: "n-resize",
          backgroundColor: "darkgrey"
        },
        closeButtonStyles = {
          position: "absolute",
          top: "0px",
          right: "15px",
          border: "1px solid black",
          borderTop: "none",
          cursor: "pointer",
          fontWeight: "bold",
          textAlign: "center",
          padding: "1px 5px",
          backgroundColor: "#eb0000"
        },
        entryStyles = {
          borderBottom: "1px solid #d3d3d3",
          minHeight: "16px"
        },
        entryTextStyles = {
          fontSize: "12px",
          margin: "0 5px 0 5px",
          maxWidth: "100%",
          whiteSpace: "pre-wrap",
          overflow: "auto"
        },
    
        view         = doc.defaultView,
        docElem      = doc.documentElement,
        docElemStyle = docElem[$style],
    
        setStyles = function () {
          var i = arguments.length,
          elemStyle, styles, style;
      
          while (i--) {
            styles    = arguments[i--];
            elemStyle = arguments[i][$style];
      
            for (style in styles) {
              if (styles.hasOwnProperty(style)) {
                elemStyle[style] = styles[style];
              }
            }
          }
        },
    
        observer = function (obj, event, handler) {
          if (obj.addEventListener) {
            obj.addEventListener(event, handler, False);
          } else if (obj.attachEvent) {
            obj.attachEvent("on" + event, handler);
          }
          return [obj, event, handler];
        },
        unobserve = function (obj, event, handler) {
          if (obj.removeEventListener) {
            obj.removeEventListener(event, handler, False);
          } else if (obj.detachEvent) {
            obj.detachEvent("on" + event, handler);
          }
        },
        clearChildren = function (node) {
          var children = node.childNodes,
          child = children.length;
    
          while (child--) {
            node.removeChild(children.item(0));
          }
        },
        append = function (to, elem) {
          return to.appendChild(elem);
        },
        createElement = function (localName) {
          return doc.createElement(localName);
        },
        createTextNode = function (text) {
          return doc.createTextNode(text);
        },
    
        createLog = tinylogLite[log] = function (message) {
        // don't show output log until called once
    
        var 
        uninit,
        originalPadding   = docElemStyle.paddingBottom,
        container         = createElement($div),
        containerStyle    = container[$style],
        resizer           = append(container, createElement($div)),
        output            = append(container, createElement($div)),
        closeButton       = append(container, createElement($div)),
        resizingLog       = False,
        previousHeight    = False,
        previousScrollTop = False,
    
        updateSafetyMargin = function () {
          // have a blank space large enough to fit the output box at the page bottom
          docElemStyle.paddingBottom = container.clientHeight + "px";
        },
        setContainerHeight = function (height) {
          var viewHeight = view.innerHeight,
          resizerHeight  = resizer.clientHeight;
    
          // constrain the container inside the viewport's dimensions
          if (height < 0) {
            height = 0;
          } else if (height + resizerHeight > viewHeight) {
            height = viewHeight - resizerHeight;
          }
      
          containerStyle.height = height / viewHeight * 100 + "%";
    
          updateSafetyMargin();
        },
        observers = [
      
          observer(doc, "mousemove", function (evt) {
            if (resizingLog) {
              setContainerHeight(view.innerHeight - evt.clientY);
              output.scrollTop = previousScrollTop;
            }
          }),
    
          observer(doc, "mouseup", function () {
            if (resizingLog) {
              resizingLog = previousScrollTop = False;
            }
          }),
      
          observer(resizer, "dblclick", function (evt) {
            evt.preventDefault();
        
            if (previousHeight) {
              setContainerHeight(previousHeight);
              previousHeight = False;
            } else {
              previousHeight = container.clientHeight;
              containerStyle.height = "0px";
            }
          }),
      
          observer(resizer, "mousedown", function (evt) {
            evt.preventDefault();
            resizingLog = True;
            previousScrollTop = output.scrollTop;
          }),
      
          observer(resizer, "contextmenu", function () {
            resizingLog = False;
          }),
    
          observer(closeButton, "click", function () {
            uninit();
          })
    
        ];
    
        uninit = function () {
          // remove observers
          var i = observers.length;
      
          while (i--) {
            unobserve.apply(tinylogLite, observers[i]);
          }
      
          // remove tinylog lite from the DOM
      
          docElem.removeChild(container);
          docElemStyle.paddingBottom = originalPadding;
      
          clearChildren(output);
          clearChildren(container);
      
          tinylogLite[log] = createLog;
        };
    
        setStyles(
          container,   containerStyles,
          output,      outputStyles,
          resizer,     resizerStyles,
          closeButton, closeButtonStyles
        );
    
        closeButton[$title] = "Close Log";
        append(closeButton, createTextNode("X"));
    
        resizer[$title] = "Double-click to toggle log minimization";
    
        docElem.insertBefore(container, docElem.firstChild);
    
        tinylogLite[log] = function (message) {
          var entry = append(output, createElement($div)),
          entryText = append(entry, createElement($div));
      
          entry[$title] = (new Date()).toLocaleTimeString();
      
          setStyles(
            entry,     entryStyles,
            entryText, entryTextStyles
          );
      
          append(entryText, createTextNode(message));
          output.scrollTop = output.scrollHeight;
        };
    
        tinylogLite[log](message);
    
      };
  
      }());
  
      } else if (typeof print === func) { // JS shell
        tinylogLite[log] = print;
      }
  
      return tinylogLite;
    }()),
    
    logBuffer = [];
    
    p.console = window.console || tinylogLite;

    p.println = function println(message) {
      var bufferLen = logBuffer.length;
      if (bufferLen) {
        tinylogLite.log(logBuffer.join(""));
        logBuffer.length = 0; // clear log buffer
      }
      
      if (arguments.length === 0 && bufferLen === 0) {
        tinylogLite.log("");
      } else if (arguments.length !== 0) {
        tinylogLite.log(message);
      }
    };
    
    p.print = function print(message) {
      logBuffer.push(message);
    };

    // Alphanumeric chars arguments automatically converted to numbers when
    // passed in, and will come out as numbers. 
    p.str = function str( val ) {
      var ret;

      if ( arguments.length === 1 ) {

        if ( typeof val === "string" && val.length === 1 ) {
          // No strings allowed.
          ret = val;
        } else if ( typeof val === "object" && val.constructor === Array ) {
          ret = new Array(0);
          
          for ( var i = 0; i < val.length; i++ ) {
              ret[i] = str( val[i] );
          }
        } else {
          ret = val + "";
        }
      }
      
      return ret;
    };

    p.char = function char( key ) {
      var ret;

      if ( arguments.length === 1 && typeof key === "number" && (key + "").indexOf( '.' ) === -1 ) {
        ret = String.fromCharCode( key );
      } else if ( arguments.length === 1 && typeof key === "object" && key.constructor === Array ) {
        ret = new Array(0);
        
        for ( var i = 0; i < key.length; i++ ) {
          ret[i] = char( key[i] );
        }
      } else {
        throw "char() may receive only one argument of type int, byte, int[], or byte[].";
      }
      
      return ret;
    };

    p.trim = function( str ) {
      var newstr;
      if (typeof str === "object" && str.constructor === Array) {
        newstr = new Array(0);
        for (var i = 0; i < str.length; i++) {
          newstr[i] = p.trim(str[i]);
        }
      } else {
        // if str is not an array then remove all whitespace, tabs, and returns
        newstr = str.replace(/^\s*/,'').replace(/\s*$/,'').replace(/\r*$/,''); 
      }
      return newstr; 
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

    p.int = function int( val ) {
      var ret;

      if ( ( val || val === 0 ) && arguments.length === 1 ) {
        if ( typeof val === 'number' ) {
          var isNegative = val < 0;
          if ( isNegative ) {
            val = Math.abs( val );
          }

          ret = Math.floor( val );

          if ( isNegative ) {
            ret = -ret;
          }
        } else if ( typeof val === 'boolean' ) {
          if ( val === true ) {
            ret = 1;
          } else {
            ret = 0;
          }
        } else if ( typeof val === 'string' ) {
          if ( val.indexOf(' ') > -1 ) {
            ret = 0;
          } else if ( val.length === 1 ) {

            ret = val.charCodeAt( 0 );
          } else {
            ret = parseInt( val, 10 ); // Force decimal radix. Don't convert hex or octal (just like p5)

            if ( isNaN( ret ) ) {
              ret = 0;
            }
          }
        } else if ( typeof val === 'object' && val.constructor === Array ) {
          ret = new Array( val.length );

          for ( var i = 0; i < val.length; i++) {
            if ( typeof val[i] === 'string' && val[i].indexOf('.') > -1 ) {
              ret[i] = 0;
            } else {
              ret[i] = p.int( val[i] );
            }
          }
        }
      }

      return ret;
    };
		
		//Determines the smallest value in a sequence of numbers.
		//Can accept more than 2 parameters or an array
		//Undefined if passed in an array and a scalar; or if a non number was passed in
    p.min = function() {
      var numbers;

      if (arguments.length === 1 && typeof arguments[0] === 'object' && arguments[0].constructor === Array ) {
        numbers = arguments[0];
      } else {
        numbers = arguments;
      }

      // Scan for illegal non-numbers
      for ( var i = 0; i < numbers.length; i++ ) {
        if ( typeof numbers[i] !== 'number' ) {
          //throw "Value sent to min is not a number.";
          return undefined;
        }
      }
      
      return Math.min.apply(this, numbers);
    };

		//Determines the biggest value in a sequence of numbers.
		//Can accept more than 2 parameters or an array
		//Undefined if passed in an array and a scalar; or if a non number was passed in 
    p.max = function() {
      var numbers;

      if (arguments.length === 1 && typeof arguments[0] === 'object' && arguments[0].constructor === Array ) {
        numbers = arguments[0];
      } else {
        numbers = arguments;
      }

      // Scan for illegal non-numbers
      for ( var i = 0; i < numbers.length; i++ ) {
        if ( typeof numbers[i] !== 'number' ) {
          //throw "Value sent to max is not a number.";
          return undefined;
        }
      }
      
      return Math.max.apply(this, numbers);
    };

    p.floor = function floor(aNumber) {
      return Math.floor(aNumber);
    };

    // Processing doc claims good argument types are: int, char, byte, boolean,
    // String, int[], char[], byte[], boolean[], String[].
    // floats should not work. However, floats with only zeroes right of the
    // decimal will work because JS converts those to int.
    p.float = function float( val ) {
      var ret;

      if ( arguments.length === 1 ) {

        if ( typeof val === 'number' ) {
          // float() not allowed to handle floats.
          if ( ( val + "" ).indexOf( '.' ) > -1 ) {
            throw "float() may not accept float arguments.";
          } else {
            ret = val.toFixed(1);
          }
        } else if ( typeof val === 'boolean' ) {

          if ( val === true ) {
            ret = 1.0;
          } else {
            ret = 0.0;
          }
          ret = ret.toFixed(1);
        } else if ( typeof val === 'string' ) {

          if ( val.indexOf(' ') > -1 ) {
            ret = NaN;
          } else if ( val.length === 1 ) {
            // Need this to convert chars like @ properly.
            ret = val.charCodeAt( 0 );
            ret = ret.toFixed(1);
          } else {
            ret = parseFloat( val );
          }
        } else if ( typeof val === 'object' && val.constructor === Array ) {

          ret = new Array( val.length );

          for ( var i = 0; i < val.length; i++) {
              ret[i] = p.float( val[i] );
          }
        }
      }

      return ret;
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
      if (aMode && (aMode === "OPENGL" || aMode === "P3D" ) ) {
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
        } else {
					for (var i = 0; i < p.SINCOS_LENGTH; i++) {
						sinLUT[i] = p.sin(i * (p.PI/180) * 0.5);
						cosLUT[i] = p.cos(i * (p.PI/180) * 0.5);
          }
          curContext.viewport(0,0,curElement.width, curElement.height);
          curContext.clearColor(204/255, 204/255, 204/255, 1.0);
          curContext.enable(curContext.DEPTH_TEST);
          curContext.enable(curContext.BLEND);
          curContext.blendFunc(curContext.SRC_ALPHA, curContext.ONE_MINUS_SRC_ALPHA);

          var vertexShaderObject = curContext.createShader(curContext.VERTEX_SHADER);
          curContext.shaderSource(vertexShaderObject, vertexShaderSource);
          curContext.compileShader(vertexShaderObject);

          if(!curContext.getShaderParameter(vertexShaderObject, curContext.COMPILE_STATUS)){
            throw curContext.getShaderInfoLog(vertexShaderObject);
          }

          var fragmentShaderObject = curContext.createShader(curContext.FRAGMENT_SHADER);
          curContext.shaderSource(fragmentShaderObject, fragmentShaderSource);
          curContext.compileShader(fragmentShaderObject);
          if(!curContext.getShaderParameter(fragmentShaderObject, curContext.COMPILE_STATUS)){
            throw curContext.getShaderInfoLog(fragmentShaderObject);
          }

          programObject = curContext.createProgram();
          curContext.attachShader(programObject, vertexShaderObject);
          curContext.attachShader(programObject, fragmentShaderObject);
          curContext.linkProgram(programObject);

          if(!curContext.getProgramParameter(programObject, curContext.LINK_STATUS)){
            throw "Error linking shaders.";
          } else{
            curContext.useProgram(programObject);
          }

          // Create buffers for 3D primitives
          boxBuffer = curContext.createBuffer();
          curContext.bindBuffer(curContext.ARRAY_BUFFER, boxBuffer);
          curContext.bufferData(curContext.ARRAY_BUFFER, newWebGLArray(boxVerts),curContext.DYNAMIC_DRAW);

          boxOutlineBuffer = curContext.createBuffer();
          curContext.bindBuffer(curContext.ARRAY_BUFFER, boxOutlineBuffer);
          curContext.bufferData(curContext.ARRAY_BUFFER, newWebGLArray(boxOutlineVerts),curContext.DYNAMIC_DRAW);
					
					sphereBuffer = curContext.createBuffer();
          curContext.bindBuffer(curContext.ARRAY_BUFFER, sphereBuffer);
          
          lineBuffer = curContext.createBuffer();
          curContext.bindBuffer(curContext.ARRAY_BUFFER, lineBuffer);

          pointBuffer = curContext.createBuffer();
          curContext.bindBuffer(curContext.ARRAY_BUFFER, pointBuffer);
          curContext.bufferData(curContext.ARRAY_BUFFER, newWebGLArray([0, 0, 0]), curContext.STATIC_DRAW);

          p.camera();
          p.perspective();

          userMatrixStack = new PMatrix3DStack();
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

      for (var j in props) {
        if (props) {
          curContext[j] = props[j];
        }
      }

      // redraw the background if background was called before size
      if (hasBackground) {
        p.background();
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

    /*
      When a matrix is created, it is set to an identity matrix
    */
    var PMatrix3D = function(){
      this.reset();
    };

    PMatrix3D.prototype = {
      set: function(){
        if( arguments.length === 16 ){
          var a = arguments;
          this.set([a[0], a[1], a[2], a[3],
                    a[4], a[5], a[6], a[7],
                    a[8], a[9], a[10],a[11],
                    a[12],a[13],a[14],a[15]]);
        }else if( arguments.length === 1 && arguments[0] instanceof PMatrix3D ){
          this.elements = arguments[0].array();
        }else if( arguments.length === 1 && arguments[0] instanceof Array ){
          this.elements = arguments[0].slice();
        }
      },
      get: function(){
        var outgoing = new PMatrix3D();
        outgoing.set( this.elements );
        return outgoing;
      },
      reset: function(){
        this.set([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
      },
      /*
        Returns a copy of the element values.
      */
      array: function array(){
        return this.elements.slice();
      },
      translate: function( tx, ty, tz ){
        if( typeof tz === 'undefined' )
        {
          tx = 0;
        }
                              
				this.elements[ 3] += tx*this.elements[ 0] + ty*this.elements[ 1] + tz*this.elements[ 2];
				this.elements[ 7] += tx*this.elements[ 4] + ty*this.elements[ 5] + tz*this.elements[ 6];
				this.elements[11] += tx*this.elements[ 8] + ty*this.elements[ 9] + tz*this.elements[10];
				this.elements[15] += tx*this.elements[12] + ty*this.elements[13] + tz*this.elements[14];
      },
      transpose: function(){
        var temp = this.elements.slice();
        this.elements[0] = temp[0];
        this.elements[1] = temp[4];
        this.elements[2] = temp[8];
        this.elements[3] = temp[12];
        this.elements[4] = temp[1];
        this.elements[5] = temp[5];
        this.elements[6] = temp[9];
        this.elements[7] = temp[13];
        this.elements[8] = temp[2];
        this.elements[9] = temp[6];
        this.elements[10] = temp[10];
        this.elements[11] = temp[14];
        this.elements[12] = temp[3];
        this.elements[13] = temp[7];
        this.elements[14] = temp[11];
        this.elements[15] = temp[15];
      },
      /*
        You must either pass in two PVectors or two arrays,
        don't mix between types. You may also omit a second
        argument and simply read the result from the return.
      */
      mult: function( source, target ){
        var x, y, z, w;
        if( source instanceof PVector )
        {
          x = source.x;
          y = source.y;
          z = source.z;
          w = 1;
          if(!target)
          {
            target = new PVector();
          }
        }
        else if( source instanceof Array )
        {
          x = source[0];
          y = source[1];
          z = source[2];
          w = source[3] || 1;

         if (!target || target.length !== 3 && target.length !== 4){
            target = [0,0,0];
          }
        }
        
        if(target instanceof Array)
        {
          if(target.length === 3)
          {
            target[0] = this.elements[0] * x + this.elements[1] * y + this.elements[ 2] * z + this.elements[ 3];
            target[1] = this.elements[4] * x + this.elements[5] * y + this.elements[ 6] * z + this.elements[ 7];
            target[2] = this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11];
          }
          else if(target.length === 4)
          {
            target[0] = this.elements[ 0] * x + this.elements[ 1] * y + this.elements[ 2] * z + this.elements[ 3] * w;
            target[1] = this.elements[ 4] * x + this.elements[ 5] * y + this.elements[ 6] * z + this.elements[ 7] * w;
            target[2] = this.elements[ 8] * x + this.elements[ 9] * y + this.elements[10] * z + this.elements[11] * w;
            target[3] = this.elements[12] * x + this.elements[13] * y + this.elements[14] * z + this.elements[15] * w;
          }
        }
        if(target instanceof PVector)
        {
          target.x = this.elements[0] * x + this.elements[1] * y + this.elements[ 2] * z + this.elements[ 3];
          target.y = this.elements[4] * x + this.elements[5] * y + this.elements[ 6] * z + this.elements[ 7];
          target.z = this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11];
        }
        return target;
      },
      preApply: function(){
        if( arguments.length === 1 && arguments[0] instanceof PMatrix3D ){
          this.preApply(arguments[0].array());
        }
        else if( arguments.length === 16 ){
          var a = arguments;
          this.preApply([a[0], a[1], a[2], a[3],
                         a[4], a[5], a[6], a[7],
                         a[8], a[9], a[10],a[11],
                         a[12],a[13],a[14],a[15]]);
        }
        else if( arguments.length === 1 && arguments[0] instanceof Array ){
          var source = arguments[0];

          var result = [0, 0, 0, 0,
                        0, 0, 0, 0,
                        0, 0, 0, 0,
                        0, 0, 0, 0];
          var e = 0;
          for( var row = 0; row < 4; row++ ){
            for( var col = 0; col < 4; col++, e++ ){
              result[e] += this.elements[col +  0] * source[row *4 + 0] +
                           this.elements[col +  4] * source[row *4 + 1] +
                           this.elements[col +  8] * source[row *4 + 2] +
                           this.elements[col + 12] * source[row *4 + 3];

            }
          }
          this.elements = result.slice();
        }
      },
      apply: function(){
        if( arguments.length === 1 && arguments[0] instanceof PMatrix3D ){
          this.apply( arguments[0].array() );
        }
        else if( arguments.length === 16){
          var a = arguments;
          this.apply([a[0], a[1], a[2], a[3],
                      a[4], a[5], a[6], a[7],
                      a[8], a[9], a[10],a[11],
                      a[12],a[13],a[14],a[15]]);
        }
        else if( arguments.length === 1 && arguments[0] instanceof Array ){
          var source = arguments[0];

          var result = [0, 0, 0, 0,
                        0, 0, 0, 0,
                        0, 0, 0, 0,
                        0, 0, 0, 0];
          var e = 0;
          for(var row = 0; row < 4; row++){
            for(var col = 0; col < 4; col++, e++){
              result[e] += this.elements[row *4 + 0] * source[col + 0] +
                           this.elements[row *4 + 1] * source[col + 4] +
                           this.elements[row *4 + 2] * source[col + 8] +
                           this.elements[row *4 + 3] * source[col + 12];

            }
          }
          this.elements = result.slice();
        }
      },
      rotate: function( angle, v0, v1, v2 ) {
        if( !v1 ) {
          this.rotateZ( angle );
        }
        else {
          // TODO should make sure this vector is normalized

          var c = p.cos( angle );
          var s = p.sin( angle );
          var t = 1.0 - c;

          this.apply( (t*v0*v0) + c, (t*v0*v1) - (s*v2), (t*v0*v2) + (s*v1), 0,
                      (t*v0*v1) + (s*v2), (t*v1*v1) + c, (t*v1*v2) - (s*v0), 0,
                      (t*v0*v2) - (s*v1), (t*v1*v2) + (s*v0), (t*v2*v2) + c, 0,
                      0, 0, 0, 1);
        }
      },
      invApply: function() {
       if ( typeof inverseCopy === "undefined" ) {
          inverseCopy = new PMatrix3D();
        }
        var a = arguments;
        inverseCopy.set( a[0],  a[1],  a[2],  a[3],
                         a[4],  a[5],  a[6],  a[7], 
                         a[8],  a[9],  a[10], a[11], 
                         a[12], a[13], a[14], a[15] );
          
        if ( !inverseCopy.invert() ) {
          return false;
        }
        this.preApply( inverseCopy );
        return true;
      },
      rotateX: function( angle ){
        var c = p.cos( angle );
        var s = p.sin( angle );
        this.apply([1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1]);
      },
      rotateY: function( angle ){
        var c = p.cos( angle );
        var s = p.sin( angle );
        this.apply([c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1]);
      },
      rotateZ: function( angle ){
        var c = Math.cos( angle );
        var s = Math.sin( angle );
        this.apply([c, -s, 0, 0,  s, c, 0, 0,  0, 0, 1, 0,  0, 0, 0, 1]);
      },
      /*
        Uniform scaling if only one value passed in
      */
      scale: function( sx, sy, sz ){
        if( sx && !sy && !sz )
        {
          sy = sz = sx;
        }
        else if( sx && sy && !sz )
        {
          sz = 1;
        }

        if ( sx && sy && sz ){
          this.elements[0] *= sx;
          this.elements[1] *= sy;
          this.elements[2] *= sz;
          this.elements[4] *= sx;
          this.elements[5] *= sy;
          this.elements[6] *= sz;
          this.elements[8] *= sx;
          this.elements[9] *= sy;
          this.elements[10] *= sz;
          this.elements[12] *= sx;
          this.elements[13] *= sy;
          this.elements[14] *= sz;
        }
      },
      skewX: function( angle ) {
        var t = p.tan( angle );
        this.apply( 1, t, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1);
      },
      skewY: function( angle ) {
        var t = Math.tan( angle );
        this.apply( 1, 0, 0, 0,
                    t, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1);
      },
      multX: function( x, y, z, w ) {
        if( !z ) {
          return this.elements[0] * x + this.elements[1] * y + this.elements[3];
        }
        else if ( !w ) {
          return this.elements[0] * x + this.elements[1] * y + this.elements[2] * z + this.elements[3];
        }
        else {
          return this.elements[0] * x + this.elements[1] * y + this.elements[2] * z + this.elements[3] * w;
        }
      },
      multY: function( x, y, z, w ) {
        if( !z ) {
          return this.elements[4] * x + this.elements[5] * y + this.elements[7];
        }
        else if ( !w ) {
          return this.elements[4] * x + this.elements[5] * y + this.elements[6] * z + this.elements[7];
        }
        else {
          return this.elements[4] * x + this.elements[5] * y + this.elements[6] * z + this.elements[7] * w;
        }
      },
      multZ: function( x, y, z, w ) {
        if( !w ) {
          return this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11];
        }
        else {
          return this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11] * w;
        }
      },
      multW: function( x, y, z, w ) {
        if( !w ) {
          return this.elements[12] * x + this.elements[13] * y + this.elements[14] * z + this.elements[15];
        }
        else {
          return this.elements[12] * x + this.elements[13] * y + this.elements[14] * z + this.elements[15] * w;
        }
      },
      invert: function(){
        var kInv = [];
        var fA0 = this.elements[ 0] * this.elements[ 5] - this.elements[ 1] * this.elements[ 4];
        var fA1 = this.elements[ 0] * this.elements[ 6] - this.elements[ 2] * this.elements[ 4];
        var fA2 = this.elements[ 0] * this.elements[ 7] - this.elements[ 3] * this.elements[ 4];
        var fA3 = this.elements[ 1] * this.elements[ 6] - this.elements[ 2] * this.elements[ 5];
        var fA4 = this.elements[ 1] * this.elements[ 7] - this.elements[ 3] * this.elements[ 5];
        var fA5 = this.elements[ 2] * this.elements[ 7] - this.elements[ 3] * this.elements[ 6];
        var fB0 = this.elements[ 8] * this.elements[13] - this.elements[ 9] * this.elements[12];
        var fB1 = this.elements[ 8] * this.elements[14] - this.elements[10] * this.elements[12];
        var fB2 = this.elements[ 8] * this.elements[15] - this.elements[11] * this.elements[12];
        var fB3 = this.elements[ 9] * this.elements[14] - this.elements[10] * this.elements[13];
        var fB4 = this.elements[ 9] * this.elements[15] - this.elements[11] * this.elements[13];
        var fB5 = this.elements[10] * this.elements[15] - this.elements[11] * this.elements[14];

        // Determinant
        var fDet = fA0 * fB5 - fA1 * fB4 + fA2 * fB3 + fA3 * fB2 - fA4 * fB1 + fA5 * fB0;
        
        // Account for a very small value
        // return false if not successful.
        if ( Math.abs( fDet ) <= 1e-9 )
        {
          return false;
        }

        kInv[ 0] = + this.elements[ 5] * fB5 - this.elements[ 6] * fB4 + this.elements[ 7] * fB3;
        kInv[ 4] = - this.elements[ 4] * fB5 + this.elements[ 6] * fB2 - this.elements[ 7] * fB1;
        kInv[ 8] = + this.elements[ 4] * fB4 - this.elements[ 5] * fB2 + this.elements[ 7] * fB0;
        kInv[12] = - this.elements[ 4] * fB3 + this.elements[ 5] * fB1 - this.elements[ 6] * fB0;
        kInv[ 1] = - this.elements[ 1] * fB5 + this.elements[ 2] * fB4 - this.elements[ 3] * fB3;
        kInv[ 5] = + this.elements[ 0] * fB5 - this.elements[ 2] * fB2 + this.elements[ 3] * fB1;
        kInv[ 9] = - this.elements[ 0] * fB4 + this.elements[ 1] * fB2 - this.elements[ 3] * fB0;
        kInv[13] = + this.elements[ 0] * fB3 - this.elements[ 1] * fB1 + this.elements[ 2] * fB0;
        kInv[ 2] = + this.elements[13] * fA5 - this.elements[14] * fA4 + this.elements[15] * fA3;
        kInv[ 6] = - this.elements[12] * fA5 + this.elements[14] * fA2 - this.elements[15] * fA1;
        kInv[10] = + this.elements[12] * fA4 - this.elements[13] * fA2 + this.elements[15] * fA0;
        kInv[14] = - this.elements[12] * fA3 + this.elements[13] * fA1 - this.elements[14] * fA0;
        kInv[ 3] = - this.elements[ 9] * fA5 + this.elements[10] * fA4 - this.elements[11] * fA3;
        kInv[ 7] = + this.elements[ 8] * fA5 - this.elements[10] * fA2 + this.elements[11] * fA1;
        kInv[11] = - this.elements[ 8] * fA4 + this.elements[ 9] * fA2 - this.elements[11] * fA0;
        kInv[15] = + this.elements[ 8] * fA3 - this.elements[ 9] * fA1 + this.elements[10] * fA0;

        // Inverse using Determinant
        var fInvDet = 1.0 / fDet;
        kInv[ 0] *= fInvDet;
        kInv[ 1] *= fInvDet;
        kInv[ 2] *= fInvDet;
        kInv[ 3] *= fInvDet;
        kInv[ 4] *= fInvDet;
        kInv[ 5] *= fInvDet;
        kInv[ 6] *= fInvDet;
        kInv[ 7] *= fInvDet;
        kInv[ 8] *= fInvDet;
        kInv[ 9] *= fInvDet;
        kInv[10] *= fInvDet;
        kInv[11] *= fInvDet;
        kInv[12] *= fInvDet;
        kInv[13] *= fInvDet;
        kInv[14] *= fInvDet;
        kInv[15] *= fInvDet;

        this.elements = kInv.slice();
        return true;
      },
      toString: function()
      {
        var str = "";
        for( var i = 0; i < 15; i++ )
        {
          str += this.elements[i] + ", ";
        }
        str += this.elements[15];
        return str;
      },
      print: function() {
        var output = "", digits = 3;
        output += p.nfs(this.elements[0], digits, 4) + " " +
          p.nfs(this.elements[1], digits, 4) + " " +
          p.nfs(this.elements[2], digits, 4) + " " +
          p.nfs(this.elements[3], digits, 4) + "\n";

        output += p.nfs(this.elements[4], digits, 4) + " " +
          p.nfs(this.elements[5], digits, 4) + " " +
          p.nfs(this.elements[6], digits, 4) + " " +
          p.nfs(this.elements[7], digits, 4) + "\n";

        output += p.nfs(this.elements[8], digits, 4) + " " +
          p.nfs(this.elements[9], digits, 4) + " " +
          p.nfs(this.elements[10], digits, 4) + " " +
          p.nfs(this.elements[11], digits, 4) + "\n";

        output += p.nfs(this.elements[12], digits, 4) + " " +
          p.nfs(this.elements[13], digits, 4) + " " +
          p.nfs(this.elements[14], digits, 4) + " " +
          p.nfs(this.elements[15], digits, 4) + "\n";

        p.println(output);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // Matrix Stack
    ////////////////////////////////////////////////////////////////////////////

    var PMatrix3DStack = function PMatrix3DStack() {
      this.matrixStack = [];
    };

    PMatrix3DStack.prototype.load = function load() {
      var tmpMatrix = new PMatrix3D();
      if ( arguments.length === 1 ) {
        tmpMatrix.set( arguments[0] );
      } else {
        tmpMatrix.set( arguments );
      }
      this.matrixStack.push( tmpMatrix );
    };

    PMatrix3DStack.prototype.push = function push() {
      this.matrixStack.push( this.peek() );
    };

    PMatrix3DStack.prototype.pop = function pop() {
      return this.matrixStack.pop();
    };

    PMatrix3DStack.prototype.peek = function peek() {
      var tmpMatrix = new PMatrix3D();
      tmpMatrix.set( this.matrixStack[this.matrixStack.length - 1] );
      return tmpMatrix;
    };

    PMatrix3DStack.prototype.mult = function mult( matrix ){
      this.matrixStack[this.matrixStack.length - 1].apply( matrix );
    };

    ////////////////////////////////////////////////////////////////////////////
    // 3D Functions
    ////////////////////////////////////////////////////////////////////////////

    /*
      Sets the uniform variable 'varName' to the value specified by 'value'.
      Before calling this function, make sure the correct program object 
      has been installed as part of the current rendering state.

      On some systems, if the variable exists in the shader but isn't used,
      the compiler will optimize it out and this function will fail.
    */
    function uniformf(programObj, varName, varValue) {
      var varLocation = curContext.getUniformLocation(programObj, varName);
      // the variable won't be found if it was optimized out.
      if (varLocation !== -1) {
        if      (varValue.length === 4) {curContext.uniform4fv(varLocation, varValue);}
        else if (varValue.length === 3) {curContext.uniform3fv(varLocation, varValue);}
        else if (varValue.length === 2) {curContext.uniform2fv(varLocation, varValue);}
        else                            {curContext.uniform1f (varLocation, varValue);}
      }
    }

    function uniformi(programObj, varName, varValue) {
      var varLocation = curContext.getUniformLocation(programObj, varName);
      // the variable won't be found if it was optimized out.
      if (varLocation !== -1) {
        if      (varValue.length === 4) {curContext.uniform4iv(varLocation, varValue);}
        else if (varValue.length === 3) {curContext.uniform3iv(varLocation, varValue);}
        else if (varValue.length === 2) {curContext.uniform2iv(varLocation, varValue);}
        else                            {curContext.uniform1i (varLocation, varValue);}
      }
    }
		
    function vertexAttribPointer(programObj, varName, size, VBO) {
      var varLocation = curContext.getAttribLocation(programObj, varName);
      if(varLocation !== -1) {
        curContext.bindBuffer(curContext.ARRAY_BUFFER, VBO);
        curContext.vertexAttribPointer(varLocation, size, curContext.FLOAT, false, 0, 0);
        curContext.enableVertexAttribArray(varLocation);
      }
    }
		
    function uniformMatrix( programObj, varName, transpose, matrix ) {
      var varLocation = curContext.getUniformLocation(programObj, varName);
      // the variable won't be found if it was optimized out.
      if ( varLocation !== -1) {
        if      (matrix.length === 16) {curContext.uniformMatrix4fv(varLocation, transpose, matrix);}
        else if (matrix.length ===  9) {curContext.uniformMatrix3fv(varLocation, transpose, matrix);}
        else                           {curContext.uniformMatrix2fv(varLocation, transpose, matrix);}
      }
    }
		
		////////////////////////////////////////////////////////////////////////////
    // Camera functions
    ////////////////////////////////////////////////////////////////////////////
    
		p.camera = function camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
			if( arguments.length === 0 ){
				//in case canvas is resized
				cameraX = curElement.width / 2;
				cameraY = curElement.height / 2;
				cameraZ = cameraY / Math.tan( cameraFOV / 2 );
				p.camera( cameraX, cameraY, cameraZ,
							    cameraX, cameraY, 0,
							    0 , 1 , 0 );
			}
			else{
				var z = new p.PVector( eyeX - centerX, eyeY - centerY, eyeZ - centerZ );
				var y = new p.PVector( upX, upY, upZ);
				var transX, transY, transZ;            
				z.normalize();            
				var x = p.PVector.cross( y, z );        
				y = p.PVector.cross( z, x );            
				x.normalize();
				y.normalize();

				cam = new PMatrix3D();
				cam.set(x.x, x.y, x.z, 0,
				        y.x, y.y, y.z, 0,
				        z.x, z.y, z.z, 0,
				        0,   0,   0,   1);
				
        cam.translate( -eyeX, -eyeY, -eyeZ );

				cameraInv = new PMatrix3D();
				cameraInv.invApply(x.x, x.y, x.z, 0,
				                   y.x, y.y, y.z, 0,
				                   z.x, z.y, z.z, 0,
				                   0,   0,   0,   1);

				cameraInv.translate( eyeX, eyeY, eyeZ );

        modelView = new PMatrix3D();
				modelView.set( cam );

        forwardTransform = modelView;        

				modelViewInv = new PMatrix3D();
				modelViewInv.set( cameraInv );
			}
		};

		p.perspective = function perspective(fov, aspect, near, far) {
			if ( arguments.length === 0 ) {
				//in case canvas is resized
				cameraY         = curElement.height / 2;
				cameraZ         = cameraY / Math.tan( cameraFOV / 2 );
				cameraNear      = cameraZ / 10;
				cameraFar       = cameraZ * 10;
				cameraAspect    = curElement.width / curElement.height;
				p.perspective( cameraFOV, cameraAspect, cameraNear, cameraFar );
			} else {        
				var a = arguments;
				var yMax, yMin, xMax, xMin;            
				yMax = near * Math.tan( fov / 2 );
				yMin = -yMax;            
				xMax = yMax * aspect;
				xMin = yMin * aspect;            
				p.frustum( xMin, xMax, yMin, yMax, near, far );        
			}
		};

    p.frustum = function frustum( left, right, bottom, top, near, far ) {
      frustumMode = true;
      projection = new PMatrix3D();
      projection.set( (2*near)/(right-left), 0, (right+left)/(right-left), 0,
                      0, (2*near)/(top-bottom), (top+bottom)/(top-bottom), 0,
                      0, 0, -(far+near)/(far-near), -(2*far*near)/(far-near),
                      0, 0, -1, 0 );
    };

    p.ortho = function ortho(left, right, bottom, top, near, far) {
      if ( arguments.length === 0 ) {
        p.ortho( 0, p.width, 0, p.height, -10, 10 );
      } else {
        var x =  2 / ( right - left );
        var y =  2 / ( top - bottom );
        var z = -2 / ( far - near );

        var tx = -( right + left ) / ( right - left );
        var ty = -( top + bottom ) / ( top - bottom );
        var tz = -( far + near ) / ( far - near );
        
        projection = new PMatrix3D();
        projection.set( x, 0, 0, tx,
                        0, y, 0, ty,
                        0, 0, z, tz,
                        0, 0, 0, 1 );

        frustumMode = false;
      }
    };	

    p.printProjection = function() {
      projection.print();
    };

    p.printCamera = function() {
      cam.print();
    };
		
		////////////////////////////////////////////////////////////////////////////
    // Shapes
    ////////////////////////////////////////////////////////////////////////////

    p.box = function( w, h, d ) {
      var c;

      if(curContext)
      {
        // user can uniformly scale the box by  
        // passing in only one argument.
        if(!h || !d)
        {
          h = d = w;
        }

        // Modeling transformation
        var model = new PMatrix3D();
        model.scale( w, h, d );

        // viewing transformation needs to have Y flipped
        // becuase that's what Processing does.
        var view = new PMatrix3D();
        view.scale( 1, -1 , 1 );
        view.apply( modelView.array() );

        uniformMatrix( programObject , "model" , true,  model.array() );
        uniformMatrix( programObject , "view" , true , view.array() );
        uniformMatrix( programObject , "projection" , true , projection.array() );

        if( doFill === true ) {
          // fix stitching problems. (lines get occluded by triangles
          // since they share the same depth values). This is not entirely
          // working, but it's a start for drawing the outline. So
          // developers can start playing around with styles. 
          curContext.enable( curContext.POLYGON_OFFSET_FILL );
          curContext.polygonOffset( 1, 1 );
          c = fillStyle.slice( 5, -1 ).split( "," );
          uniformf(programObject, "color", [ c[0]/255, c[1]/255, c[2]/255, c[3] ] );
          vertexAttribPointer( programObject, "Vertex", 3 , boxBuffer );
          curContext.drawArrays( curContext.TRIANGLES, 0 , boxVerts.length/3 );
          curContext.disable( curContext.POLYGON_OFFSET_FILL );
        }

        if( lineWidth > 0 && doStroke ) {
          // eventually need to make this more efficient.
          c = strokeStyle.slice( 5, -1 ).split( "," );
          uniformf(programObject, "color", [ c[0]/255, c[1]/255, c[2]/255, c[3] ] );
          curContext.lineWidth( lineWidth );
          vertexAttribPointer( programObject , "Vertex", 3 , boxOutlineBuffer );
          curContext.drawArrays( curContext.LINES, 0 , boxOutlineVerts.length/3 );
        }
      }
    };

		var initSphere = function() {
      var i;
			sphereVerts = [];
			sphereNorms = [];

			for (i = 0; i < sphereDetailU; i++) {
				sphereNorms.push(0);
				sphereNorms.push(-1);
				sphereNorms.push(0);
				sphereVerts.push(0);
				sphereVerts.push(-1);
				sphereVerts.push(0);
				sphereNorms.push( sphereX[i] );
				sphereNorms.push( sphereY[i] );
				sphereNorms.push( sphereZ[i] );
				sphereVerts.push( sphereX[i] );
				sphereVerts.push( sphereY[i] );
				sphereVerts.push( sphereZ[i] );
			}
			sphereVerts.push(0);
			sphereVerts.push(-1);
			sphereVerts.push(0);
			sphereNorms.push( sphereX[0] );
			sphereNorms.push( sphereY[0] );
			sphereNorms.push( sphereZ[0] );
			sphereVerts.push( sphereX[0] );
			sphereVerts.push( sphereY[0] );
			sphereVerts.push( sphereZ[0] );

			var v1,v11,v2;

			// middle rings
			var voff = 0;
			for (i = 2; i < sphereDetailV; i++) {
				v1 = v11 = voff;
				voff += sphereDetailU;
				v2 = voff;
				for (var j = 0; j < sphereDetailU; j++) {
					sphereNorms.push( parseFloat( sphereX[v1] ) );
					sphereNorms.push( parseFloat( sphereY[v1] ) );
					sphereNorms.push( parseFloat( sphereZ[v1] ) );
					// verts
					sphereVerts.push( parseFloat( sphereX[v1] ) );
					sphereVerts.push( parseFloat( sphereY[v1] ) );
					sphereVerts.push( parseFloat( sphereZ[v1++] ) );
					// normals
					sphereNorms.push( parseFloat( sphereX[v2] ) );
					sphereNorms.push( parseFloat( sphereY[v2] ) );
					sphereNorms.push( parseFloat( sphereZ[v2] ) );
					// verts
					sphereVerts.push( parseFloat( sphereX[v2] ) );
					sphereVerts.push( parseFloat( sphereY[v2] ) );
					sphereVerts.push( parseFloat( sphereZ[v2++] ) );
				}

				// close each ring
				v1 = v11;
				v2 = voff;
				sphereNorms.push( parseFloat( sphereX[v1] ) );
				sphereNorms.push( parseFloat( sphereY[v1] ) );
				sphereNorms.push( parseFloat( sphereZ[v1] ) );
				// verts
				sphereVerts.push( parseFloat( sphereX[v1] ) );
				sphereVerts.push( parseFloat( sphereY[v1] ) );
				sphereVerts.push( parseFloat( sphereZ[v1] ) );
				// norms
				sphereNorms.push( parseFloat( sphereX[v2] ) );
				sphereNorms.push( parseFloat( sphereY[v2] ) );
				sphereNorms.push( parseFloat( sphereZ[v2] ) );
				// verts
				sphereVerts.push( parseFloat( sphereX[v2] ) );
				sphereVerts.push( parseFloat( sphereY[v2] ) );
				sphereVerts.push( parseFloat( sphereZ[v2] ) );
			}

			// add the northern cap
			for (i = 0; i < sphereDetailU; i++) {
				v2 = voff + i;
				// norms
				sphereNorms.push( parseFloat( sphereX[v2] ) );
				sphereNorms.push( parseFloat( sphereY[v2] ) );
				sphereNorms.push( parseFloat( sphereZ[v2] ) );
				// verts
				sphereVerts.push( parseFloat( sphereX[v2] ) );
				sphereVerts.push( parseFloat( sphereY[v2] ) );
				sphereVerts.push( parseFloat( sphereZ[v2] ) );
				// norms
				sphereNorms.push( 0 );
				sphereNorms.push( 1 );
				sphereNorms.push( 0 );
				// verts
				sphereVerts.push( 0 );
				sphereVerts.push( 1 );
				sphereVerts.push( 0 );
			}

			sphereNorms.push( parseFloat( sphereX[voff] ) );
			sphereNorms.push( parseFloat( sphereY[voff] ) );
			sphereNorms.push( parseFloat( sphereZ[voff] ) );
			// verts
			sphereVerts.push( parseFloat( sphereX[voff] ) );
			sphereVerts.push( parseFloat( sphereY[voff] ) );
			sphereVerts.push( parseFloat( sphereZ[voff] ) );
			// norms
			sphereNorms.push(0);
			sphereNorms.push(1);
			sphereNorms.push(0);
			// verts
			sphereVerts.push(0);
			sphereVerts.push(1);
			sphereVerts.push(0);
			
			vertexAttribPointer( programObject, "Vertex", 3 , sphereBuffer );
			//set the buffer data
			curContext.bufferData(curContext.ARRAY_BUFFER, newWebGLArray(sphereVerts),curContext.STATIC_DRAW);
		};

		// sphere and sphereDetail
		// Taken and revised from:
		// git://github.com/omouse/ohprocessing.git/core/src/processing/core/PGraphics.java
		// UNDER :License: LGPL Java
		p.sphereDetail =  function sphereDetail(ures, vres) {
      var i;

			if(arguments.length === 1) {
				ures = vres = arguments[0];
			}

			if ( ures < 3 ) { ures = 3; } // force a minimum res
			if ( vres < 2 ) { vres = 2; } // force a minimum res

			// if it hasn't changed do nothing
			if (( ures === sphereDetailU ) && ( vres === sphereDetailV )) { return; }

			var delta = p.SINCOS_LENGTH/ures;
			var cx = new Array(ures);
			var cz = new Array(ures);
			// calc unit circle in XZ plane
			for (i = 0; i < ures; i++) {
			  cx[i] = cosLUT[ parseInt(( i * delta ) % p.SINCOS_LENGTH, 10 )];
			  cz[i] = sinLUT[ parseInt(( i * delta ) % p.SINCOS_LENGTH, 10 )];
			}

			// computing vertexlist
			// vertexlist starts at south pole
			var vertCount = ures * ( vres - 1 ) + 2;
			var currVert = 0;

			// re-init arrays to store vertices
			sphereX = new Array( vertCount );
			sphereY = new Array( vertCount );
			sphereZ = new Array( vertCount );

			var angle_step = (p.SINCOS_LENGTH *0.5)/vres;
			var angle = angle_step;

			// step along Y axis
			for (i = 1; i < vres; i++) {
				var curradius = sinLUT[ parseInt( angle % p.SINCOS_LENGTH, 10 )];
				var currY     = -cosLUT[ parseInt( angle % p.SINCOS_LENGTH, 10 )];
				for ( var j = 0; j < ures; j++ ) {
					sphereX[currVert]   = cx[j] * curradius;
					sphereY[currVert]   = currY;
					sphereZ[currVert++] = cz[j] * curradius;
				}
			  angle += angle_step;
			}
			sphereDetailU = ures;
			sphereDetailV = vres;

			// make the sphere verts and norms
			initSphere();
		};


		p.sphere = function() {
			if(p.use3DContext) {
				var sRad = arguments[0], c;
				
				if (( sphereDetailU < 3 ) || ( sphereDetailV < 2 )) {
					p.sphereDetail(30);
				}
				
				// Modeling transformation
        var model = new PMatrix3D();
        model.scale( sRad , sRad, sRad );

        // viewing transformation needs to have Y flipped
        // becuase that's what Processing does.
        var view = new PMatrix3D();
        view.scale( 1, -1 , 1 );
        view.apply( modelView.array() );

				uniformMatrix( programObject , "model" , true,  model.array() );
        uniformMatrix( programObject , "view" , true , view.array() );
        uniformMatrix( programObject , "projection" , true , projection.array() );

        vertexAttribPointer( programObject, "Vertex", 3 , sphereBuffer );

        if( doFill === true ) {
          // fix stitching problems. (lines get occluded by triangles
          // since they share the same depth values). This is not entirely
          // working, but it's a start for drawing the outline. So
          // developers can start playing around with styles. 
          curContext.enable( curContext.POLYGON_OFFSET_FILL );
          curContext.polygonOffset( 1, 1 );
          c = fillStyle.slice( 5, -1 ).split( "," );
          uniformf(programObject, "color", [ c[0]/255, c[1]/255, c[2]/255, c[3] ] );

          curContext.drawArrays( curContext.TRIANGLE_STRIP, 0 , sphereVerts.length/3 );
          curContext.disable( curContext.POLYGON_OFFSET_FILL );
        }

        if( lineWidth > 0 && doStroke ) {
          // eventually need to make this more efficient.
          c = strokeStyle.slice( 5, -1 ).split( "," );
          uniformf(programObject, "color", [ c[0]/255, c[1]/255, c[2]/255, c[3] ] );

          curContext.lineWidth( lineWidth );
          curContext.drawArrays( curContext.LINE_STRIP, 0 , sphereVerts.length/3 );
        }
			}
		};

		////////////////////////////////////////////////////////////////////////////
    // Coordinates
    ////////////////////////////////////////////////////////////////////////////
    p.modelX = function modelX( x, y, z ) {
      var mv = modelView.array();
      var ci = cameraInv.array();

      var ax = mv[ 0]*x + mv[ 1]*y + mv[ 2]*z + mv[ 3];
      var ay = mv[ 4]*x + mv[ 5]*y + mv[ 6]*z + mv[ 7];
      var az = mv[ 8]*x + mv[ 9]*y + mv[10]*z + mv[11];
      var aw = mv[12]*x + mv[13]*y + mv[14]*z + mv[15]; 

      var ox = ci[ 0]*ax + ci[ 1]*ay + ci[ 2]*az + ci[ 3]*aw;
      var ow = ci[12]*ax + ci[13]*ay + ci[14]*az + ci[15]*aw;      

      return ( ow !== 0 ) ? ox / ow : ox;
    };

    p.modelY = function modelY( x, y, z ) {
      var mv = modelView.array();
      var ci = cameraInv.array();
      
      var ax = mv[ 0]*x + mv[ 1]*y + mv[ 2]*z + mv[ 3];
      var ay = mv[ 4]*x + mv[ 5]*y + mv[ 6]*z + mv[ 7];
      var az = mv[ 8]*x + mv[ 9]*y + mv[10]*z + mv[11];
      var aw = mv[12]*x + mv[13]*y + mv[14]*z + mv[15]; 

      var oy = ci[ 4]*ax + ci[ 5]*ay + ci[ 6]*az + ci[ 7]*aw;
      var ow = ci[12]*ax + ci[13]*ay + ci[14]*az + ci[15]*aw;

      return ( ow !== 0 ) ? oy / ow : oy;
    };

    p.modelZ = function modelZ(x, y, z) {
      var mv = modelView.array();
      var ci = cameraInv.array();
      
      var ax = mv[ 0]*x + mv[ 1]*y + mv[ 2]*z + mv[ 3];
      var ay = mv[ 4]*x + mv[ 5]*y + mv[ 6]*z + mv[ 7];
      var az = mv[ 8]*x + mv[ 9]*y + mv[10]*z + mv[11];
      var aw = mv[12]*x + mv[13]*y + mv[14]*z + mv[15]; 

      var oz = ci[ 8]*ax + ci[ 9]*ay + ci[10]*az + ci[11]*aw;
      var ow = ci[12]*ax + ci[13]*ay + ci[14]*az + ci[15]*aw;

      return ( ow !== 0 ) ? oz / ow : oz;
    };

    ////////////////////////////////////////////////////////////////////////////
    // Style functions
    ////////////////////////////////////////////////////////////////////////////

    p.fill = function fill() {
      doFill = true;
      if( p.use3DContext ) {
        fillStyle = p.color.apply(this, arguments);
      }
      else {
        curContext.fillStyle = p.color.apply(this, arguments);
      }
    };

    p.noFill = function noFill() {
      doFill = false;
    };

    p.stroke = function stroke() {
      doStroke = true;
      if( p.use3DContext ) {
        strokeStyle = p.color.apply(this, arguments);
      }
      else {
        curContext.strokeStyle = p.color.apply(this, arguments);
      }
    };

    p.noStroke = function noStroke() {
      doStroke = false;
    };

    p.strokeWeight = function strokeWeight(w) {
      if( p.use3DContext ) {
        lineWidth = w;
      }
      else {
        curContext.lineWidth = w;
      }
    };

    p.strokeCap = function strokeCap(value) {
      curContext.lineCap = value;
    };

    p.strokeJoin = function strokeJoin(value) {
      curContext.lineJoin = value;
    };

    p.smooth = function() {
      //curElement.style.setProperty("image-rendering", "optimizeQuality", "important");
      //curContext.mozImageSmoothingEnabled = true;
    };

    p.noSmooth = function() {
      //curElement.style.setProperty("image-rendering", "optimizeSpeed", "important");
      //curContext.mozImageSmoothingEnabled = false;
    };

    //p.noSmooth(); // default to noSmooth // Corban: turning this on breaks 3D context

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

    p.point = function point(x, y, z) {
      if (p.use3DContext) {
        var model = new PMatrix3D();

        // move point to position
        model.translate(x, y, z || 0);

        var view = new PMatrix3D();
        view.scale(1, -1 , 1);
        view.apply(modelView.array());

        uniformMatrix(programObject , "model" , true,  model.array());
        uniformMatrix(programObject , "view" , true , view.array());
        uniformMatrix(programObject , "projection" , true , projection.array());

        if( lineWidth > 0 && doStroke ) {
          // this will be replaced with the new bit shifting color code
          var c = strokeStyle.slice(5, -1).split(",");
          uniformf(programObject, "color", [c[0]/255, c[1]/255, c[2]/255, c[3]]);

          vertexAttribPointer(programObject, "Vertex", 3, pointBuffer);
          curContext.drawArrays(curContext.POINTS, 0, 1);
        }
      } else {
        var oldFill = curContext.fillStyle;
        curContext.fillStyle = curContext.strokeStyle;
        curContext.fillRect(Math.round(x), Math.round(y), 1, 1);
        curContext.fillStyle = oldFill;
      }
    };

    p.beginShape = function beginShape(type) {
      curShape = type;
      curShapeCount = 0;
      curvePoints = [];
    };

    p.endShape = function endShape(close) {

      if (curShapeCount !== 0) {

        if (close && doFill) {
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

    p.curve = function curve(x1, y1, x2, y2, x3, y3, x4, y4) {
      p.beginShape();
        p.curveVertex(x1, y1);
        p.curveVertex(x2, y2);
        p.curveVertex(x3, y3);
        p.curveVertex(x4, y4);
      p.endShape();
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

    p.line = function line() {
      var x1, y1, z1, x2, y2, z2;

      if (p.use3DContext) {
        if ( arguments.length === 6 ) {
          x1 = arguments[0];
          y1 = arguments[1];
          z1 = arguments[2];
          x2 = arguments[3];
          y2 = arguments[4];
          z2 = arguments[5];
        } else if ( arguments.length === 4 ) {
          x1 = arguments[0]; 
          y1 = arguments[1]; 
          z1 = 0;
          x2 = arguments[2]; 
          y2 = arguments[3];
          z2 = 0;
        }

        var lineVerts = [x1,y1,z1,x2,y2,z2];

        var model = new PMatrix3D();
        //model.scale(w, h, d);

        var view = new PMatrix3D();
        view.scale(1, -1 , 1);
        view.apply(modelView.array());

        uniformMatrix(programObject , "model" , true,  model.array());
        uniformMatrix(programObject , "view" , true , view.array());
        uniformMatrix(programObject , "projection" , true , projection.array());

        if( lineWidth > 0 && doStroke ) {
          // this will be replaced with the new bit shifting color code
          var c = strokeStyle.slice(5, -1).split(",");
          uniformf(programObject, "color", [c[0]/255, c[1]/255, c[2]/255, c[3]]);

          curContext.lineWidth(lineWidth);

          vertexAttribPointer(programObject, "Vertex", 3, lineBuffer);
          curContext.bufferData(curContext.ARRAY_BUFFER, newWebGLArray(lineVerts),curContext.STREAM_DRAW);
          curContext.drawArrays(curContext.LINES, 0, 2);
        }
      } else {
        x1 = arguments[0]; 
        y1 = arguments[1];
        x2 = arguments[2]; 
        y2 = arguments[3];

        curContext.beginPath();
        curContext.moveTo(x1 || 0, y1 || 0);
        curContext.lineTo(x2 || 0, y2 || 0);
        curContext.stroke();
        curContext.closePath();
      }
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

    p.bezierTangent = function bezierTangent(a, b, c, d, t) {
      return ( 3 * t * t * ( -a + 3 * b -3 * c + d ) +6 *t * ( a - 2 * b + c ) + 3 * ( -a + b ) );
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

      if ( curEllipseMode === p.CORNERS ) {
        width = width-x;
        height = height-y;
      }

      if ( curEllipseMode === p.CORNER || curEllipseMode === p.CORNERS ) {
        x += width/2;
        y += height/2;
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


    p.normal = function normal( nx, ny, nz ) {
      
      if ( arguments.length !== 3 || !( typeof nx === "number" && typeof ny === "number" && typeof nz === "number" ) ) {
        throw "normal() requires three numeric arguments.";
      }
      
      normalX = nx;
      normalY = ny;
      normalZ = nz;

      if ( curShape !== 0 ) {
        if ( normalMode === p.NORMAL_MODE_AUTO ) {
          normalMode = p.NORMAL_MODE_SHAPE;
        } else if ( normalMode === p.NORMAL_MODE_SHAPE ) {
          normalMode = p.NORMAL_MODE_VERTEX;
        }
      }
    };
    
    ////////////////////////////////////////////////////////////////////////////
    // Raster drawing functions
    ////////////////////////////////////////////////////////////////////////////
    p.save = function save(file) {};

    var buildImageObject = function (obj) {
      var pixels = obj.data,
        data = p.createImage(obj.width, obj.height),
        len = pixels.length;

      if ( ( // ECMAScript 5
        Object.defineProperty &&
        Object.getOwnPropertyDescriptor &&
        !Object.getOwnPropertyDescriptor( data, "pixels" ).get
      ) || ( // Legacy JavaScript
          data.__defineGetter__ &&
          data.__lookupGetter__ &&
          !data.__lookupGetter__( "pixels" )
      ) ) {
        var pixelsDone, pixelsGetter = function () {
          if (pixelsDone) {
            return pixelsDone;
          }

          pixelsDone = [];

          for (var i = 0; i < len; i += 4) {
            pixelsDone.push(
              p.color(
                pixels[i],
                pixels[i + 1],
                pixels[i + 2],
                pixels[i + 3]
              )
            );
          }

          return pixelsDone;
        };

        if (Object.defineProperty) {
          Object.defineProperty(data, "pixels", {
            get: pixelsGetter
          });
        } else if (data.__defineGetter__) {
          data.__defineGetter__("pixels", pixelsGetter);
        }
      } else {
        data.pixels = [];

        for (var i = 0; i < len; i += 4) {
          data.pixels.push(
            p.color(
              pixels[i],
              pixels[i + 1],
              pixels[i + 2],
              pixels[i + 3]
            )
          );
        }
      }

      return data;
    };

    // Loads an image for display. Type is unused. Callback is fired on load.
    p.loadImage = function loadImage(file, type, callback) {
      var img = document.createElement('img');
      img.loaded = false;
      img.mask = function () {}; // I don't think image mask was ever implemented? -F1LT3R
      img.onload = function () {
        var h = this.height, w = this.width;
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

      img.src = file; // needs to be called after the img.onload function is declared or it wont work in opera

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
            curContext.clearColor(col[0] / 255, col[0] / 255, col[0] / 255, 1.0 );
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
          curContext.clearColor(col[0] / 255, col[1] / 255, col[2] / 255, 1);
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
      hasBackground = true;
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

    p.createFont = function(name, size) {};

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
      if ( typeof str === 'number' && (str+"").indexOf('.') >= 0 ) {
        // Make sure .15 rounds to .1, but .151 rounds to .2.
        if ( ( str * 1000 ) - Math.floor( str * 1000 ) === 0.5 ) {
          str = str - 0.0001;
        }
        str = str.toFixed(3);
      } else if ( str === 0 ) {
        str = str.toString();
      }

      // If the font is a standard Canvas font...
      if (!curTextFont.glyph) {
        if (str && (curContext.fillText || curContext.mozDrawText)) {
          curContext.save();
          curContext.font = curContext.mozTextStyle = curTextSize + "px " + curTextFont.name;

          if (curContext.fillText) {
            curContext.fillText(str, x, y);
          } else if (curContext.mozDrawText) {
            curContext.translate(x, y);
            curContext.mozDrawText(str);
          }
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
        var parsedCode = Processing.parse(code, p);

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

        // Step through the libraries that were attached at doc load...
        for (var i in Processing.lib) {
          if (Processing.lib) {                
            // Init the libraries in the context of this p_instance
            Processing.lib[i].call(p);
          }
        }

        // The parser adds custom methods to the processing context
        // this renames p to processing so these methods will run
        (function (processing) {
          with(processing) {
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

        if (p.mouseMoved && !mousePressed) {
          p.mouseMoved();
        }
        if (mousePressed && p.mouseDragged) {
          p.mouseDragged();
          p.mouseDragging = true;
        }
      });

      attach(curElement, "mouseout", function (e) {
        document.body.style.cursor = oldCursor;
      });

      attach(curElement, "mousedown", function (e) {
        mousePressed = true;
        p.mouseDragging = false;
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
        if (p.mouseClicked && !p.mouseDragging) {
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
        p.keyCode = null;
        p.key = e.keyCode;

        // Letters
        if ( e.keyCode >= 65 && e.keyCode <= 90 ) { // A-Z
          // Keys return ASCII for upcased letters.
          // Convert to downcase if shiftKey is not pressed.
          if ( !e.shiftKey ) { 
            p.key += 32; 
          }
        } 

        // Numbers and their shift-symbols 
        else if ( e.keyCode >= 48 && e.keyCode <= 57 ) { // 0-9
          if ( e.shiftKey ) {
            switch ( e.keyCode ) {
              case 49: p.key = 33; break; // !
              case 50: p.key = 64; break; // @
              case 51: p.key = 35; break; // #
              case 52: p.key = 36; break; // $
              case 53: p.key = 37; break; // %
              case 54: p.key = 94; break; // ^
              case 55: p.key = 38; break; // &
              case 56: p.key = 42; break; // *
              case 57: p.key = 40; break; // (
              case 48: p.key = 41; break; // )
            }
          }
        }

        // Coded keys
        else if ( codedKeys.indexOf(e.keyCode) >= 0 ) { // SHIFT, CONTROL, ALT, LEFT, RIGHT, UP, DOWN
          p.key = p.CODED;
          p.keyCode = e.keyCode;
        }
        
        // Symbols and their shift-symbols
        else {
          if ( e.shiftKey ) {
            switch( e.keyCode ) {
              case 107: p.key = 43;  break; // +
              case 219: p.key = 123; break; // { 
              case 221: p.key = 125; break; // } 
              case 222: p.key = 34;  break; // "
            }
          } else {
            switch( e.keyCode ) {
              case 188: p.key = 44; break; // , 
              case 109: p.key = 45; break; // - 
              case 190: p.key = 46; break; // . 
              case 191: p.key = 47; break; // / 
              case 192: p.key = 96; break; // ~ 
              case 219: p.key = 91; break; // [ 
              case 220: p.key = 92; break; // \
              case 221: p.key = 93; break; // ] 
              case 222: p.key = 39; break; // '
            }
          }
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
