/*

    P R O C E S S I N G . J S - @VERSION@
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

(function() {

  var Processing = this.Processing = function Processing(curElement, aCode) {

    var p = this;

    p.pjs = {
       imageCache: {
         pending: 0
       }
    }; // by default we have an empty imageCache, no more.

    p.name = 'Processing.js Instance'; // Set Processing defaults / environment variables
    p.use3DContext = false; // default '2d' canvas context
    p.canvas = curElement;

    // Glyph path storage for textFonts
    p.glyphTable = {};

    // Global vars for tracking mouse position
    p.pmouseX = 0;
    p.pmouseY = 0;
    p.mouseX = 0;
    p.mouseY = 0;
    p.mouseButton = 0;
    p.mouseDown = false;
    p.mouseScroll = 0;

    // Undefined event handlers to be replaced by user when needed
    p.mouseClicked = undefined;
    p.mouseDragged = undefined;
    p.mouseMoved = undefined;
    p.mousePressed = undefined;
    p.mouseReleased = undefined;
    p.mouseScrolled = undefined;
    p.key = undefined;
    p.keyPressed = undefined;
    p.keyReleased = undefined;
    p.keyTyped = undefined;
    p.draw = undefined;
    p.setup = undefined;

    // The height/width of the canvas
    p.width = curElement.width - 0;
    p.height = curElement.height - 0;

    // The current animation frame
    p.frameCount = 0;

    // Color modes
    p.RGB   = 1;
    p.ARGB  = 2;
    p.HSB   = 3;
    p.ALPHA = 4;
    p.CMYK  = 5;

    // Renderers
    p.P2D    = 1;
    p.JAVA2D = 1;
    p.WEBGL  = 2;
    p.P3D    = 2;
    p.OPENGL = 2;
    p.EPSILON = 0.0001;
    p.MAX_FLOAT   = 3.4028235e+38;
    p.MIN_FLOAT   = -3.4028235e+38;
    p.MAX_INT     = 2147483647;
    p.MIN_INT     = -2147483648;
    p.PI          = Math.PI;
    p.TWO_PI      = 2 * p.PI;
    p.HALF_PI     = p.PI / 2;
    p.THIRD_PI    = p.PI / 3;
    p.QUARTER_PI  = p.PI / 4;
    p.DEG_TO_RAD  = p.PI / 180;
    p.RAD_TO_DEG  = 180 / p.PI;
    p.WHITESPACE  = " \t\n\r\f\u00A0";

    // Filter/convert types
    p.BLUR      = 11;
    p.GRAY      = 12;
    p.INVERT    = 13;
    p.OPAQUE    = 14;
    p.POSTERIZE = 15;
    p.THRESHOLD = 16;
    p.ERODE     = 17;
    p.DILATE    = 18;

    // Blend modes
    p.REPLACE    = 0;
    p.BLEND      = 1 << 0;
    p.ADD        = 1 << 1;
    p.SUBTRACT   = 1 << 2;
    p.LIGHTEST   = 1 << 3;
    p.DARKEST    = 1 << 4;
    p.DIFFERENCE = 1 << 5;
    p.EXCLUSION  = 1 << 6;
    p.MULTIPLY   = 1 << 7;
    p.SCREEN     = 1 << 8;
    p.OVERLAY    = 1 << 9;
    p.HARD_LIGHT = 1 << 10;
    p.SOFT_LIGHT = 1 << 11;
    p.DODGE      = 1 << 12;
    p.BURN       = 1 << 13;

    // Color component bit masks
    p.ALPHA_MASK = 0xff000000;
    p.RED_MASK   = 0x00ff0000;
    p.GREEN_MASK = 0x0000ff00;
    p.BLUE_MASK  = 0x000000ff;

    // Projection matrices
    p.CUSTOM       = 0;
    p.ORTHOGRAPHIC = 2;
    p.PERSPECTIVE  = 3;

    // Shapes
    p.POINT          = 2;
    p.POINTS         = 2;
    p.LINE           = 4;
    p.LINES          = 4;
    p.TRIANGLE       = 8;
    p.TRIANGLES      = 9;
    p.TRIANGLE_STRIP = 10;
    p.TRIANGLE_FAN   = 11;
    p.QUAD           = 16;
    p.QUADS          = 16;
    p.QUAD_STRIP     = 17;
    p.POLYGON        = 20;
    p.PATH           = 21;
    p.RECT           = 30;
    p.ELLIPSE        = 31;
    p.ARC            = 32;
    p.SPHERE         = 40;
    p.BOX            = 41;

    // Shape closing modes
    p.OPEN  = 1;
    p.CLOSE = 2;

    // Shape drawing modes
    p.CORNER          = 0; // Draw mode convention to use (x, y) to (width, height)
    p.CORNERS         = 1; // Draw mode convention to use (x1, y1) to (x2, y2) coordinates
    p.RADIUS          = 2; // Draw mode from the center, and using the radius
    p.CENTER_RADIUS   = 2; // Deprecated! Use RADIUS instead
    p.CENTER          = 3; // Draw from the center, using second pair of values as the diameter
    p.DIAMETER        = 3; // Synonym for the CENTER constant. Draw from the center
    p.CENTER_DIAMETER = 3; // Deprecated! Use DIAMETER instead

    // Text vertical alignment modes
    p.BASELINE = 0;   // Default vertical alignment for text placement
    p.TOP      = 101; // Align text to the top
    p.BOTTOM   = 102; // Align text from the bottom, using the baseline

    // UV Texture coordinate modes
    p.NORMAL    = 1;
    p.NORMALIZE = 1;
    p.IMAGE     = 2;

    // Text placement modes
    p.MODEL = 4;
    p.SHAPE = 5;

    // Stroke modes
    p.SQUARE  = 'butt';
    p.ROUND   = 'round';
    p.PROJECT = 'square';
    p.MITER   = 'miter';
    p.BEVEL   = 'bevel';

    // Lighting modes
    p.AMBIENT     = 0;
    p.DIRECTIONAL = 1;
    //POINT       = 2; Shared with Shape constant
    p.SPOT        = 3;

    // Key constants

    // Both key and keyCode will be equal to these values
    p.BACKSPACE = 8;
    p.TAB       = 9;
    p.ENTER     = 10;
    p.RETURN    = 13;
    p.ESC       = 27;
    p.DELETE    = 127;
    p.CODED     = 0xffff;

    // p.key will be CODED and p.keyCode will be this value
    p.SHIFT     = 16;
    p.CONTROL   = 17;
    p.ALT       = 18;
    p.UP        = 38;
    p.RIGHT     = 39;
    p.DOWN      = 40;
    p.LEFT      = 37;

    var codedKeys = [p.SHIFT, p.CONTROL, p.ALT, p.UP, p.RIGHT, p.DOWN, p.LEFT];

    // Cursor types
    p.ARROW    = 'default';
    p.CROSS    = 'crosshair';
    p.HAND     = 'pointer';
    p.MOVE     = 'move';
    p.TEXT     = 'text';
    p.WAIT     = 'wait';
    p.NOCURSOR = "url('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='), auto";

    // Hints
    p.DISABLE_OPENGL_2X_SMOOTH    =  1;
    p.ENABLE_OPENGL_2X_SMOOTH     = -1;
    p.ENABLE_OPENGL_4X_SMOOTH     =  2;
    p.ENABLE_NATIVE_FONTS         =  3;
    p.DISABLE_DEPTH_TEST          =  4;
    p.ENABLE_DEPTH_TEST           = -4;
    p.ENABLE_DEPTH_SORT           =  5;
    p.DISABLE_DEPTH_SORT          = -5;
    p.DISABLE_OPENGL_ERROR_REPORT =  6;
    p.ENABLE_OPENGL_ERROR_REPORT  = -6;
    p.ENABLE_ACCURATE_TEXTURES    =  7;
    p.DISABLE_ACCURATE_TEXTURES   = -7;
    p.HINT_COUNT                  = 10;

    // PJS defined constants
    p.SINCOS_LENGTH      = parseInt(360 / 0.5, 10);
    p.FRAME_RATE         = 0;
    p.focused            = true;
    p.PRECISIONB         = 15; // fixed point precision is limited to 15 bits!!
    p.PRECISIONF         = 1 << p.PRECISIONB;
    p.PREC_MAXVAL        = p.PRECISIONF - 1;
    p.PREC_ALPHA_SHIFT   = 24 - p.PRECISIONB;
    p.PREC_RED_SHIFT     = 16 - p.PRECISIONB;
    p.NORMAL_MODE_AUTO   = 0;
    p.NORMAL_MODE_SHAPE  = 1;
    p.NORMAL_MODE_VERTEX = 2;
    p.MAX_LIGHTS         = 8;

    // "Private" variables used to maintain state
    var curContext,
        online = true,
        doFill = true,
        fillStyle = "rgba( 255, 255, 255, 1 )",
        doStroke = true,
        strokeStyle = "rgba( 204, 204, 204, 1 )",
        lineWidth = 1,
        loopStarted = false,
        refreshBackground = function() {},
        doLoop = true,
        looping = 0,
        curRectMode = p.CORNER,
        curEllipseMode = p.CENTER,
        normalX = 0,
        normalY = 0,
        normalZ = 0,
        normalMode = p.NORMAL_MODE_AUTO,
        inDraw = false,
        curBackground = "rgba( 204, 204, 204, 1 )",
        curFrameRate = 60,
        curCursor = p.ARROW,
        oldCursor = curElement.style.cursor,
        curMsPerFrame = 1,
        curShape = p.POLYGON,
        curShapeCount = 0,
        curvePoints = [],
        curTightness = 0,
        curveDetail = 20,
        curveInited = false,
        colorModeA = 255,
        colorModeX = 255,
        colorModeY = 255,
        colorModeZ = 255,
        pathOpen = false,
        mousePressed = false,
        mouseDragging = false,
        keyPressed = false,
        curColorMode = p.RGB,
        curTint = function() {},
        curTextSize = 12,
        curTextFont = "Arial",
        getLoaded = false,
        start = new Date().getTime(),
        timeSinceLastFPS = start,
        framesSinceLastFPS = 0,
        lastTextPos = [0, 0, 0],
        curveBasisMatrix,
        curveToBezierMatrix,
        curveDrawMatrix,
        bezierBasisInverse,
        bezierBasisMatrix,
        programObject3D,
        programObject2D,
        boxBuffer,
        boxNormBuffer,
        boxOutlineBuffer,
        sphereBuffer,
        lineBuffer,
        fillBuffer,
        pointBuffer;

    // User can only have MAX_LIGHTS lights
    var lightCount = 0;

    //sphere stuff
    var sphereDetailV = 0,
        sphereDetailU = 0,
        sphereX = [],
        sphereY = [],
        sphereZ = [],
        sinLUT = new Array(p.SINCOS_LENGTH),
        cosLUT = new Array(p.SINCOS_LENGTH),
        sphereVerts,
        sphereNorms;

    // Camera defaults and settings
    var cam,
        cameraInv,
        forwardTransform,
        reverseTransform,
        modelView,
        modelViewInv,
        userMatrixStack,
        inverseCopy,
        projection,
        manipulatingCamera = false,
        frustumMode = false,
        cameraFOV = 60 * (Math.PI / 180),
        cameraX = curElement.width / 2,
        cameraY = curElement.height / 2,
        cameraZ = cameraY / Math.tan(cameraFOV / 2),
        cameraNear = cameraZ / 10,
        cameraFar = cameraZ * 10,
        cameraAspect = curElement.width / curElement.height;

    var vertArray = [],
        isCurve = false,
        isBezier = false,
        firstVert = true;

    // Stores states for pushStyle() and popStyle().
    var styleArray = new Array(0);

    // Vertices are specified in a counter-clockwise order
    // triangles are in this order: back, front, right, bottom, left, top
    var boxVerts = [0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5,
                   -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5,
                   -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5,
                    0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5,
                    0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5,
                   -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5,
                   -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5,
                   -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5,
                   -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5];

    var boxNorms = [0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
                    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
                    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
                    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
                    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];

    var boxOutlineVerts = [0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5,
                          -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5,
                           0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5,
                          -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
                           0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5,
                          -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5];

    // Vertex shader for points and lines
    var vertexShaderSource2D =
      "attribute vec3 Vertex;" +
      "uniform vec4 color;" +

      "uniform mat4 model;" +
      "uniform mat4 view;" +
      "uniform mat4 projection;" +

      "void main(void) {" +
      "  gl_FrontColor = color;" +
      "  gl_Position = projection * view * model * vec4(Vertex, 1.0);" +
      "}";

    var fragmentShaderSource2D =
      "void main(void){" +
      "  gl_FragColor = gl_Color;" +
      "}";

    // Vertex shader for boxes and spheres
    var vertexShaderSource3D =
      "attribute vec3 Vertex;" +
      "attribute vec3 Normal;" +

      "uniform vec4 color;" +

      "uniform bool usingMat;" +
      "uniform vec3 specular;" +
      "uniform vec3 mat_emissive;" +
      "uniform vec3 mat_ambient;" +
      "uniform vec3 mat_specular;" +
      "uniform float shininess;" +

      "uniform mat4 model;" +
      "uniform mat4 view;" +
      "uniform mat4 projection;" +
      "uniform mat4 normalTransform;" +

      "uniform int lightCount;" +
      "uniform vec3 falloff;" +

      "struct Light {" +
      "  bool dummy;" +
      "   int type;" +
      "   vec3 color;" +
      "   vec3 position;" +
      "  vec3 direction;" +
      "  float angle;" +
      "  vec3 halfVector;" +
      "  float concentration;" +
      "};" +
      "uniform Light lights[8];" +

      "void AmbientLight( inout vec3 totalAmbient, in vec3 ecPos, in Light light ) {" +
      // Get the vector from the light to the vertex
      // Get the distance from the current vector to the light position
      "  float d = length( light.position - ecPos );" +
      "  float attenuation = 1.0 / ( falloff[0] + ( falloff[1] * d ) + ( falloff[2] * d * d ));" + "  totalAmbient += light.color * attenuation;" +
      "}" +

      "void DirectionalLight( inout vec3 col, in vec3 ecPos, inout vec3 spec, in vec3 vertNormal, in Light light ) {" +
      "  float powerfactor = 0.0;" +
      "  float nDotVP = max(0.0, dot( vertNormal, light.position ));" +
      "  float nDotVH = max(0.0, dot( vertNormal, normalize( light.position-ecPos )));" +

      "  if( nDotVP != 0.0 ){" +
      "    powerfactor = pow( nDotVH, shininess );" +
      "  }" +

      "  col += light.color * nDotVP;" +
      "  spec += specular * powerfactor;" +
      "}" +

      "void PointLight( inout vec3 col, inout vec3 spec, in vec3 vertNormal, in vec3 ecPos, in vec3 eye, in Light light ) {" +
      "  float powerfactor;" +

      // Get the vector from the light to the vertex
      "   vec3 VP = light.position - ecPos;" +

      // Get the distance from the current vector to the light position
      "  float d = length( VP ); " +

      // Normalize the light ray so it can be used in the dot product operation.
      "  VP = normalize( VP );" +

      "  float attenuation = 1.0 / ( falloff[0] + ( falloff[1] * d ) + ( falloff[2] * d * d ));" +

      "  float nDotVP = max( 0.0, dot( vertNormal, VP ));" +
      "  vec3 halfVector = normalize( VP + eye );" +
      "  float nDotHV = max( 0.0, dot( vertNormal, halfVector ));" +

      "  if( nDotVP == 0.0) {" +
      "    powerfactor = 0.0;" +
      "  }" +
      "  else{" +
      "    powerfactor = pow( nDotHV, shininess );" +
      "  }" +

      "  spec += specular * powerfactor * attenuation;" +
      "  col += light.color * nDotVP * attenuation;" +
      "}" +

      /*
      */
      "void SpotLight( inout vec3 col, inout vec3 spec, in vec3 vertNormal, in vec3 ecPos, in vec3 eye, in Light light ) {" +
      "  float spotAttenuation;" +
      "  float powerfactor;" +

      // calculate the vector from the current vertex to the light.
      "  vec3 VP = light.position - ecPos; " +
      "  vec3 ldir = normalize( light.direction );" +

      // get the distance from the spotlight and the vertex
      "  float d = length( VP );" +
      "  VP = normalize( VP );" +

      "  float attenuation = 1.0 / ( falloff[0] + ( falloff[1] * d ) + ( falloff[2] * d * d ) );" +

      // dot product of the vector from vertex to light and light direction.
      "  float spotDot = dot( VP, ldir );" +

      // if the vertex falls inside the cone
      "  if( spotDot < cos( light.angle ) ) {" +
      "    spotAttenuation = pow( spotDot, light.concentration );" +
      "  }" +
      "  else{" +
      "    spotAttenuation = 1.0;" +
      "  }" +
      "  attenuation *= spotAttenuation;" +

      "  float nDotVP = max( 0.0, dot( vertNormal, VP ));" +
      "  vec3 halfVector = normalize( VP + eye );" +
      "  float nDotHV = max( 0.0, dot( vertNormal, halfVector ));" +

      "  if( nDotVP == 0.0 ) {" +
      "    powerfactor = 0.0;" +
      "  }" +
      "  else {" +
      "    powerfactor = pow( nDotHV, shininess );" +
      "  }" +

      "  spec += specular * powerfactor * attenuation;" +
      "  col += light.color * nDotVP * attenuation;" +
      "}" +

      "void main(void) {" +
      "  vec3 finalAmbient = vec3( 0.0, 0.0, 0.0 );" +
      "  vec3 finalDiffuse = vec3( 0.0, 0.0, 0.0 );" +
      "  vec3 finalSpecular = vec3( 0.0, 0.0, 0.0 );" +

      "  vec3 norm = vec3( normalTransform * vec4( Normal, 0.0 ) );" +

      "  vec4 ecPos4 = view * model * vec4(Vertex,1.0);" +
      "  vec3 ecPos = (vec3(ecPos4))/ecPos4.w;" +
      "  vec3 eye = vec3( 0.0, 0.0, 1.0 );" +

      // If there were no lights this draw call, just use the
      // assigned fill color of the shape and the specular value
      "  if( lightCount == 0 ) {" +
      "    gl_FrontColor = color + vec4(mat_specular,1.0);" +
      "  }" +
      "  else {" +
      "    for( int i = 0; i < lightCount; i++ ) {" +
      "      if( lights[i].type == 0 ) {" +
      "        AmbientLight( finalAmbient, ecPos, lights[i] );" +
      "      }" +
      "      else if( lights[i].type == 1 ) {" +
      "        DirectionalLight( finalDiffuse,ecPos, finalSpecular, norm, lights[i] );" +
      "      }" +
      "      else if( lights[i].type == 2 ) {" +
      "        PointLight( finalDiffuse, finalSpecular, norm, ecPos, eye, lights[i] );" +
      "      }" +
      "      else if( lights[i].type == 3 ) {" +
      "        SpotLight( finalDiffuse, finalSpecular, norm, ecPos, eye, lights[i] );" +
      "      }" +
      "    }" +

      "   if( usingMat == false ) {" +
      "    gl_FrontColor = vec4(  " +
      "      vec3(color) * finalAmbient +" +
      "      vec3(color) * finalDiffuse +" +
      "      vec3(color) * finalSpecular," +
      "      color[3] );" +
      "   }" +
      "   else{" +
      "     gl_FrontColor = vec4( " +
      "       mat_emissive + " +
      "       (vec3(color) * mat_ambient * finalAmbient) + " +
      "       (vec3(color) * finalDiffuse) + " +
      "       (mat_specular * finalSpecular), " +
      "       color[3] );" +
      "    }" +
      "  }" +
      "  gl_Position = projection * view * model * vec4( Vertex, 1.0 );" +
      "}";

    var fragmentShaderSource3D =
      "void main(void){" +
      "  gl_FragColor = gl_Color;" +
      "}";

    // Wrapper to easily deal with array names changes.
    var newWebGLArray = function(data) {
      return new WebGLFloatArray(data);
    };

    var imageModeCorner = function imageModeCorner(x, y, w, h, whAreSizes) {
      return {
        x: x,
        y: y,
        w: w,
        h: h
      };
    };
    var imageModeConvert = imageModeCorner;

    var imageModeCorners = function imageModeCorners(x, y, w, h, whAreSizes) {
      return {
        x: x,
        y: y,
        w: whAreSizes ? w : w - x,
        h: whAreSizes ? h : h - y
      };
    };

    var imageModeCenter = function imageModeCenter(x, y, w, h, whAreSizes) {
      return {
        x: x - w / 2,
        y: y - h / 2,
        w: w,
        h: h
      };
    };

    var createProgramObject = function(curContext, vetexShaderSource, fragmentShaderSource) {
      var vertexShaderObject = curContext.createShader(curContext.VERTEX_SHADER);
      curContext.shaderSource(vertexShaderObject, vetexShaderSource);
      curContext.compileShader(vertexShaderObject);
      if (!curContext.getShaderParameter(vertexShaderObject, curContext.COMPILE_STATUS)) {
        throw curContext.getShaderInfoLog(vertexShaderObject);
      }

      var fragmentShaderObject = curContext.createShader(curContext.FRAGMENT_SHADER);
      curContext.shaderSource(fragmentShaderObject, fragmentShaderSource);
      curContext.compileShader(fragmentShaderObject);
      if (!curContext.getShaderParameter(fragmentShaderObject, curContext.COMPILE_STATUS)) {
        throw curContext.getShaderInfoLog(fragmentShaderObject);
      }

      var programObject = curContext.createProgram();
      curContext.attachShader(programObject, vertexShaderObject);
      curContext.attachShader(programObject, fragmentShaderObject);
      curContext.linkProgram(programObject);
      if (!curContext.getProgramParameter(programObject, curContext.LINK_STATUS)) {
        throw "Error linking shaders.";
      }

      return programObject;
    };

    ////////////////////////////////////////////////////////////////////////////
    // Char handling
    ////////////////////////////////////////////////////////////////////////////
    var charMap = {};

    var Char = function Char(chr) {
      if (typeof chr === 'string' && chr.length === 1) {
        this.code = chr.charCodeAt(0);
      } else {
        this.code = NaN;
      }

      return (typeof charMap[this.code] === 'undefined') ? charMap[this.code] = this : charMap[this.code];
    };

    Char.prototype.toString = function() {
      return String.fromCharCode(this.code);
    };

    Char.prototype.valueOf = function() {
      return this.code;
    };

    ////////////////////////////////////////////////////////////////////////////
    // PVector
    ////////////////////////////////////////////////////////////////////////////
    var PVector = function(x, y, z) {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
    },
    createPVectorMethod = function(method) {
      return function(v1, v2) {
        var v = v1.get();
        v[method](v2);
        return v;
      };
    },
    createSimplePVectorMethod = function(method) {
      return function(v1, v2) {
        return v1[method](v2);
      };
    },
    simplePVMethods = "dist dot cross".split(" "),
    method = simplePVMethods.length;

    PVector.angleBetween = function(v1, v2) {
      return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
    };

    // Common vector operations for PVector
    PVector.prototype = {
      set: function(v, y, z) {
        if (arguments.length === 1) {
          this.set(v.x || v[0], v.y || v[1], v.z || v[2]);
        } else {
          this.x = v;
          this.y = y;
          this.z = z;
        }
      },
      get: function() {
        return new PVector(this.x, this.y, this.z);
      },
      mag: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      },
      add: function(v, y, z) {
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
      sub: function(v, y, z) {
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
      mult: function(v) {
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
      div: function(v) {
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
      dist: function(v) {
        var dx = this.x - v.x,
          dy = this.y - v.y,
          dz = this.z - v.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
      },
      dot: function(v, y, z) {
        var num;
        if (arguments.length === 3) {
          num = this.x * v + this.y * y + this.z * z;
        } else if (arguments.length === 1) {
          num = this.x * v.x + this.y * v.y + this.z * v.z;
        }
        return num;
      },
      cross: function(v) {
        var
        crossX = this.y * v.z - v.y * this.z,
          crossY = this.z * v.x - v.z * this.x,
          crossZ = this.x * v.y - v.x * this.y;
        return new PVector(crossX, crossY, crossZ);
      },
      normalize: function() {
        var m = this.mag();
        if (m > 0) {
          this.div(m);
        }
      },
      limit: function(high) {
        if (this.mag() > high) {
          this.normalize();
          this.mult(high);
        }
      },
      heading2D: function() {
        var angle = Math.atan2(-this.y, this.x);
        return -angle;
      },
      toString: function() {
        return "[" + this.x + ", " + this.y + ", " + this.z + "]";
      },
      array: function() {
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
    // 2D Matrix
    ////////////////////////////////////////////////////////////////////////////

    /*
      Helper function for printMatrix(). Finds the largest scalar
      in the matrix, then number of digits left of the decimal.
      Call from PMatrix2D and PMatrix3D's print() function.
    */
    var printMatrixHelper = function printMatrixHelper(elements) {
      var big = 0;
      for (var i = 0; i < elements.length; i++) {

        if (i !== 0) {
          big = Math.max(big, Math.abs(elements[i]));
        } else {
          big = Math.abs(elements[i]);
        }
      }

      var digits = (big + "").indexOf(".");
      if (digits === 0) {
        digits = 1;
      } else if (digits === -1) {
        digits = (big + "").length;
      }

      return digits;
    };

    var PMatrix2D = function() {
      if (arguments.length === 0) {
        this.reset();
      } else if (arguments.length === 1 && arguments[0] instanceof PMatrix2D) {
        this.set(arguments[0].array());
      } else if (arguments.length === 6) {
        this.set(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
      }
    };

    PMatrix2D.prototype = {
      set: function() {
        if (arguments.length === 6) {
          var a = arguments;
          this.set([a[0], a[1], a[2],
                    a[3], a[4], a[5]]);
        } else if (arguments.length === 1 && arguments[0] instanceof PMatrix2D) {
          this.elements = arguments[0].array();
        } else if (arguments.length === 1 && arguments[0] instanceof Array) {
          this.elements = arguments[0].slice();
        }
      },
      get: function() {
        var outgoing = new PMatrix2D();
        outgoing.set(this.elements);
        return outgoing;
      },
      reset: function() {
        this.set([1, 0, 0, 0, 1, 0]);
      },
      // Returns a copy of the element values.
      array: function array() {
        return this.elements.slice();
      },
      translate: function(tx, ty) {
        this.elements[2] = tx * this.elements[0] + ty * this.elements[1] + this.elements[2];
        this.elements[5] = tx * this.elements[3] + ty * this.elements[4] + this.elements[5];
      },
      // Does nothing in Processing.
      transpose: function() {
      },
      mult: function(source, target) {
        var x, y;
        if (source instanceof PVector) {
          x = source.x;
          y = source.y;
          if (!target) {
            target = new PVector();
          }
        } else if (source instanceof Array) {
          x = source[0];
          y = source[1];
          if (!target) {
            target = [];
          }
        }
        if (target instanceof Array) {
          target[0] = this.elements[0] * x + this.elements[1] * y + this.elements[2];
          target[1] = this.elements[3] * x + this.elements[4] * y + this.elements[5];
        } else if (target instanceof PVector) {
          target.x = this.elements[0] * x + this.elements[1] * y + this.elements[2];
          target.y = this.elements[3] * x + this.elements[4] * y + this.elements[5];
          target.z = 0;
        }
        return target;
      },
      multX: function(x, y) {
        return x * this.elements[0] + y * this.elements[1] + this.elements[2];
      },
      multY: function(x, y) {
        return x * this.elements[3] + y * this.elements[4] + this.elements[5];
      },
      skewX: function(angle) {
        this.apply(1, 0, 1, angle, 0, 0);
      },
      skewY: function(angle) {
        this.apply(1, 0, 1, 0, angle, 0);
      },
      determinant: function() {
        return this.elements[0] * this.elements[4] - this.elements[1] * this.elements[3];
      },
      invert: function() {
        var d = this.determinant();
        if ( Math.abs( d ) > p.FLOAT_MIN ) {
          var old00 = this.elements[0];
          var old01 = this.elements[1];
          var old02 = this.elements[2];
          var old10 = this.elements[3];
          var old11 = this.elements[4];
          var old12 = this.elements[5];
          this.elements[0] =  old11 / d;
          this.elements[3] = -old10 / d;
          this.elements[1] = -old01 / d;
          this.elements[1] =  old00 / d;
          this.elements[2] = (old01 * old12 - old11 * old02) / d;
          this.elements[5] = (old10 * old02 - old00 * old12) / d;
          return true;
        }
        return false;
      },
      scale: function(sx, sy) {
        if (sx && !sy) {
          sy = sx;
        }
        if (sx && sy) {
          this.elements[0] *= sx;
          this.elements[1] *= sy;
          this.elements[3] *= sx;
          this.elements[4] *= sy;
        }
      },
      apply: function() {
        if (arguments.length === 1 && arguments[0] instanceof PMatrix2D) {
          this.apply(arguments[0].array());
        } else if (arguments.length === 6) {
          var a = arguments;
          this.apply([a[0], a[1], a[2],
                      a[3], a[4], a[5]]);
        } else if (arguments.length === 1 && arguments[0] instanceof Array) {
          var source = arguments[0];
          var result = [0, 0, this.elements[2],
                        0, 0, this.elements[5]];
          var e = 0;
          for (var row = 0; row < 2; row++) {
            for (var col = 0; col < 3; col++, e++) {
              result[e] += this.elements[row * 3 + 0] * source[col + 0] + this.elements[row * 3 + 1] * source[col + 3];
            }
          }
          this.elements = result.slice();
        }
      },
      preApply: function() {
        if (arguments.length === 1 && arguments[0] instanceof PMatrix2D) {
          this.preApply(arguments[0].array());
        } else if (arguments.length === 6) {
          var a = arguments;
          this.preApply([a[0], a[1], a[2],
                         a[3], a[4], a[5]]);
        } else if (arguments.length === 1 && arguments[0] instanceof Array) {
          var source = arguments[0];
          var result = [0, 0, source[2],
                        0, 0, source[5]];
          result[2]= source[2] + this.elements[2] * source[0] + this.elements[5] * source[1];
          result[5]= source[5] + this.elements[2] * source[3] + this.elements[5] * source[4];
          result[0] = this.elements[0] * source[0] + this.elements[3] * source[1];
          result[3] = this.elements[0] * source[3] + this.elements[3] * source[4];
          result[1] = this.elements[1] * source[0] + this.elements[4] * source[1];
          result[4] = this.elements[1] * source[3] + this.elements[4] * source[4];
          this.elements = result.slice();
        }
      },
      rotate: function(angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var temp1 = this.elements[0];
        var temp2 = this.elements[1];
        this.elements[0] =  c * temp1 + s * temp2;
        this.elements[1] = -s * temp1 + c * temp2;
        temp1 = this.elements[3];
        temp2 = this.elements[4];
        this.elements[3] =  c * temp1 + s * temp2;
        this.elements[4] = -s * temp1 + c * temp2;
      },
      rotateZ: function(angle) {
        this.rotate(angle);
      },
      print: function() {
        var digits = printMatrixHelper(this.elements);
        var output = "";
        output += p.nfs(this.elements[0], digits, 4) + " " + p.nfs(this.elements[1], digits, 4) + " " + p.nfs(this.elements[2], digits, 4) + "\n";
        output += p.nfs(this.elements[3], digits, 4) + " " + p.nfs(this.elements[4], digits, 4) + " " + p.nfs(this.elements[5], digits, 4) + "\n\n";
        p.println(output);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // PMatrix3D
    ////////////////////////////////////////////////////////////////////////////
    var PMatrix3D = function PMatrix3D() {
      //When a matrix is created, it is set to an identity matrix
      this.reset();
    };

    PMatrix3D.prototype = {
      set: function() {
        if (arguments.length === 16) {
          var a = arguments;
          this.set([a[0], a[1], a[2], a[3],
                    a[4], a[5], a[6], a[7],
                    a[8], a[9], a[10], a[11],
                    a[12], a[13], a[14], a[15]]);
        } else if (arguments.length === 1 && arguments[0] instanceof PMatrix3D) {
          this.elements = arguments[0].array();
        } else if (arguments.length === 1 && arguments[0] instanceof Array) {
          this.elements = arguments[0].slice();
        }
      },
      get: function() {
        var outgoing = new PMatrix3D();
        outgoing.set(this.elements);
        return outgoing;
      },
      reset: function() {
        this.set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
      },
      // Returns a copy of the element values.
      array: function array() {
        return this.elements.slice();
      },
      translate: function(tx, ty, tz) {
        if (typeof tz === 'undefined') {
          tx = 0;
        }

        this.elements[3] += tx * this.elements[0] + ty * this.elements[1] + tz * this.elements[2];
        this.elements[7] += tx * this.elements[4] + ty * this.elements[5] + tz * this.elements[6];
        this.elements[11] += tx * this.elements[8] + ty * this.elements[9] + tz * this.elements[10];
        this.elements[15] += tx * this.elements[12] + ty * this.elements[13] + tz * this.elements[14];
      },
      transpose: function() {
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
      mult: function(source, target) {
        var x, y, z, w;
        if (source instanceof PVector) {
          x = source.x;
          y = source.y;
          z = source.z;
          w = 1;
          if (!target) {
            target = new PVector();
          }
        } else if (source instanceof Array) {
          x = source[0];
          y = source[1];
          z = source[2];
          w = source[3] || 1;

          if (!target || target.length !== 3 && target.length !== 4) {
            target = [0, 0, 0];
          }
        }

        if (target instanceof Array) {
          if (target.length === 3) {
            target[0] = this.elements[0] * x + this.elements[1] * y + this.elements[2] * z + this.elements[3];
            target[1] = this.elements[4] * x + this.elements[5] * y + this.elements[6] * z + this.elements[7];
            target[2] = this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11];
          } else if (target.length === 4) {
            target[0] = this.elements[0] * x + this.elements[1] * y + this.elements[2] * z + this.elements[3] * w;
            target[1] = this.elements[4] * x + this.elements[5] * y + this.elements[6] * z + this.elements[7] * w;
            target[2] = this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11] * w;
            target[3] = this.elements[12] * x + this.elements[13] * y + this.elements[14] * z + this.elements[15] * w;
          }
        }
        if (target instanceof PVector) {
          target.x = this.elements[0] * x + this.elements[1] * y + this.elements[2] * z + this.elements[3];
          target.y = this.elements[4] * x + this.elements[5] * y + this.elements[6] * z + this.elements[7];
          target.z = this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11];
        }
        return target;
      },
      preApply: function() {
        if (arguments.length === 1 && arguments[0] instanceof PMatrix3D) {
          this.preApply(arguments[0].array());
        } else if (arguments.length === 16) {
          var a = arguments;
          this.preApply([a[0], a[1], a[2], a[3],
                         a[4], a[5], a[6], a[7],
                         a[8], a[9], a[10], a[11],
                         a[12], a[13], a[14], a[15]]);
        } else if (arguments.length === 1 && arguments[0] instanceof Array) {
          var source = arguments[0];

          var result = [0, 0, 0, 0,
                        0, 0, 0, 0,
                        0, 0, 0, 0,
                        0, 0, 0, 0];
          var e = 0;
          for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++, e++) {
              result[e] += this.elements[col + 0] * source[row * 4 + 0] + this.elements[col + 4] * source[row * 4 + 1] + this.elements[col + 8] * source[row * 4 + 2] + this.elements[col + 12] * source[row * 4 + 3];
            }
          }
          this.elements = result.slice();
        }
      },
      apply: function() {
        if (arguments.length === 1 && arguments[0] instanceof PMatrix3D) {
          this.apply(arguments[0].array());
        } else if (arguments.length === 16) {
          var a = arguments;
          this.apply([a[0], a[1], a[2], a[3],
                      a[4], a[5], a[6], a[7],
                      a[8], a[9], a[10], a[11],
                      a[12], a[13], a[14], a[15]]);
        } else if (arguments.length === 1 && arguments[0] instanceof Array) {
          var source = arguments[0];

          var result = [0, 0, 0, 0,
                        0, 0, 0, 0,
                        0, 0, 0, 0,
                        0, 0, 0, 0];
          var e = 0;
          for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++, e++) {
              result[e] += this.elements[row * 4 + 0] * source[col + 0] + this.elements[row * 4 + 1] * source[col + 4] + this.elements[row * 4 + 2] * source[col + 8] + this.elements[row * 4 + 3] * source[col + 12];
            }
          }
          this.elements = result.slice();
        }
      },
      rotate: function(angle, v0, v1, v2) {
        if (!v1) {
          this.rotateZ(angle);
        } else {
          // TODO should make sure this vector is normalized
          var c = p.cos(angle);
          var s = p.sin(angle);
          var t = 1.0 - c;

          this.apply((t * v0 * v0) + c, (t * v0 * v1) - (s * v2), (t * v0 * v2) + (s * v1), 0, (t * v0 * v1) + (s * v2), (t * v1 * v1) + c, (t * v1 * v2) - (s * v0), 0, (t * v0 * v2) - (s * v1), (t * v1 * v2) + (s * v0), (t * v2 * v2) + c, 0, 0, 0, 0, 1);
        }
      },
      invApply: function() {
        if (typeof inverseCopy === "undefined") {
          inverseCopy = new PMatrix3D();
        }
        var a = arguments;
        inverseCopy.set(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);

        if (!inverseCopy.invert()) {
          return false;
        }
        this.preApply(inverseCopy);
        return true;
      },
      rotateX: function(angle) {
        var c = p.cos(angle);
        var s = p.sin(angle);
        this.apply([1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1]);
      },

      rotateY: function(angle) {
        var c = p.cos(angle);
        var s = p.sin(angle);
        this.apply([c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1]);
      },
      rotateZ: function(angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        this.apply([c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
      },
      // Uniform scaling if only one value passed in
      scale: function(sx, sy, sz) {
        if (sx && !sy && !sz) {
          sy = sz = sx;
        } else if (sx && sy && !sz) {
          sz = 1;
        }

        if (sx && sy && sz) {
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
      skewX: function(angle) {
        var t = p.tan(angle);
        this.apply(1, t, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      },
      skewY: function(angle) {
        var t = Math.tan(angle);
        this.apply(1, 0, 0, 0, t, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      },
      multX: function(x, y, z, w) {
        if (!z) {
          return this.elements[0] * x + this.elements[1] * y + this.elements[3];
        } else if (!w) {
          return this.elements[0] * x + this.elements[1] * y + this.elements[2] * z + this.elements[3];
        } else {
          return this.elements[0] * x + this.elements[1] * y + this.elements[2] * z + this.elements[3] * w;
        }
      },
      multY: function(x, y, z, w) {
        if (!z) {
          return this.elements[4] * x + this.elements[5] * y + this.elements[7];
        } else if (!w) {
          return this.elements[4] * x + this.elements[5] * y + this.elements[6] * z + this.elements[7];
        } else {
          return this.elements[4] * x + this.elements[5] * y + this.elements[6] * z + this.elements[7] * w;
        }
      },
      multZ: function(x, y, z, w) {
        if (!w) {
          return this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11];
        } else {
          return this.elements[8] * x + this.elements[9] * y + this.elements[10] * z + this.elements[11] * w;
        }
      },
      multW: function(x, y, z, w) {
        if (!w) {
          return this.elements[12] * x + this.elements[13] * y + this.elements[14] * z + this.elements[15];
        } else {
          return this.elements[12] * x + this.elements[13] * y + this.elements[14] * z + this.elements[15] * w;
        }
      },
      invert: function() {
        var kInv = [];
        var fA0 = this.elements[0] * this.elements[5] - this.elements[1] * this.elements[4];
        var fA1 = this.elements[0] * this.elements[6] - this.elements[2] * this.elements[4];
        var fA2 = this.elements[0] * this.elements[7] - this.elements[3] * this.elements[4];
        var fA3 = this.elements[1] * this.elements[6] - this.elements[2] * this.elements[5];
        var fA4 = this.elements[1] * this.elements[7] - this.elements[3] * this.elements[5];
        var fA5 = this.elements[2] * this.elements[7] - this.elements[3] * this.elements[6];
        var fB0 = this.elements[8] * this.elements[13] - this.elements[9] * this.elements[12];
        var fB1 = this.elements[8] * this.elements[14] - this.elements[10] * this.elements[12];
        var fB2 = this.elements[8] * this.elements[15] - this.elements[11] * this.elements[12];
        var fB3 = this.elements[9] * this.elements[14] - this.elements[10] * this.elements[13];
        var fB4 = this.elements[9] * this.elements[15] - this.elements[11] * this.elements[13];
        var fB5 = this.elements[10] * this.elements[15] - this.elements[11] * this.elements[14];

        // Determinant
        var fDet = fA0 * fB5 - fA1 * fB4 + fA2 * fB3 + fA3 * fB2 - fA4 * fB1 + fA5 * fB0;

        // Account for a very small value
        // return false if not successful.
        if (Math.abs(fDet) <= 1e-9) {
          return false;
        }

        kInv[0] = +this.elements[5] * fB5 - this.elements[6] * fB4 + this.elements[7] * fB3;
        kInv[4] = -this.elements[4] * fB5 + this.elements[6] * fB2 - this.elements[7] * fB1;
        kInv[8] = +this.elements[4] * fB4 - this.elements[5] * fB2 + this.elements[7] * fB0;
        kInv[12] = -this.elements[4] * fB3 + this.elements[5] * fB1 - this.elements[6] * fB0;
        kInv[1] = -this.elements[1] * fB5 + this.elements[2] * fB4 - this.elements[3] * fB3;
        kInv[5] = +this.elements[0] * fB5 - this.elements[2] * fB2 + this.elements[3] * fB1;
        kInv[9] = -this.elements[0] * fB4 + this.elements[1] * fB2 - this.elements[3] * fB0;
        kInv[13] = +this.elements[0] * fB3 - this.elements[1] * fB1 + this.elements[2] * fB0;
        kInv[2] = +this.elements[13] * fA5 - this.elements[14] * fA4 + this.elements[15] * fA3;
        kInv[6] = -this.elements[12] * fA5 + this.elements[14] * fA2 - this.elements[15] * fA1;
        kInv[10] = +this.elements[12] * fA4 - this.elements[13] * fA2 + this.elements[15] * fA0;
        kInv[14] = -this.elements[12] * fA3 + this.elements[13] * fA1 - this.elements[14] * fA0;
        kInv[3] = -this.elements[9] * fA5 + this.elements[10] * fA4 - this.elements[11] * fA3;
        kInv[7] = +this.elements[8] * fA5 - this.elements[10] * fA2 + this.elements[11] * fA1;
        kInv[11] = -this.elements[8] * fA4 + this.elements[9] * fA2 - this.elements[11] * fA0;
        kInv[15] = +this.elements[8] * fA3 - this.elements[9] * fA1 + this.elements[10] * fA0;

        // Inverse using Determinant
        var fInvDet = 1.0 / fDet;
        kInv[0] *= fInvDet;
        kInv[1] *= fInvDet;
        kInv[2] *= fInvDet;
        kInv[3] *= fInvDet;
        kInv[4] *= fInvDet;
        kInv[5] *= fInvDet;
        kInv[6] *= fInvDet;
        kInv[7] *= fInvDet;
        kInv[8] *= fInvDet;
        kInv[9] *= fInvDet;
        kInv[10] *= fInvDet;
        kInv[11] *= fInvDet;
        kInv[12] *= fInvDet;
        kInv[13] *= fInvDet;
        kInv[14] *= fInvDet;
        kInv[15] *= fInvDet;

        this.elements = kInv.slice();
        return true;
      },
      toString: function() {
        var str = "";
        for (var i = 0; i < 15; i++) {
          str += this.elements[i] + ", ";
        }
        str += this.elements[15];
        return str;
      },
      print: function() {
        var digits = printMatrixHelper(this.elements);

        var output = "";
        output += p.nfs(this.elements[0], digits, 4) + " " + p.nfs(this.elements[1], digits, 4) + " " + p.nfs(this.elements[2], digits, 4) + " " + p.nfs(this.elements[3], digits, 4) + "\n";
        output += p.nfs(this.elements[4], digits, 4) + " " + p.nfs(this.elements[5], digits, 4) + " " + p.nfs(this.elements[6], digits, 4) + " " + p.nfs(this.elements[7], digits, 4) + "\n";
        output += p.nfs(this.elements[8], digits, 4) + " " + p.nfs(this.elements[9], digits, 4) + " " + p.nfs(this.elements[10], digits, 4) + " " + p.nfs(this.elements[11], digits, 4) + "\n";
        output += p.nfs(this.elements[12], digits, 4) + " " + p.nfs(this.elements[13], digits, 4) + " " + p.nfs(this.elements[14], digits, 4) + " " + p.nfs(this.elements[15], digits, 4) + "\n\n";

        p.println(output);
      },
      invTranslate: function(tx, ty, tz) {
        this.preApply(1, 0, 0, -tx, 0, 1, 0, -ty, 0, 0, 1, -tz, 0, 0, 0, 1);
      },
      invRotateX: function(angle) {
        var c = p.cos(-angle);
        var s = p.sin(-angle);
        this.preApply([1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1]);
      },
      invRotateY: function(angle) {
        var c = p.cos(-angle);
        var s = p.sin(-angle);
        this.preApply([c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1]);
      },
      invRotateZ: function(angle) {
        var c = p.cos(-angle);
        var s = p.sin(-angle);
        this.preApply([c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
      },
      invScale: function(x, y, z) {
        this.preApply([1 / x, 0, 0, 0, 0, 1 / y, 0, 0, 0, 0, 1 / z, 0, 0, 0, 0, 1]);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // Matrix Stack
    ////////////////////////////////////////////////////////////////////////////
    var PMatrixStack = function PMatrixStack() {
      this.matrixStack = [];
    };

    PMatrixStack.prototype.load = function load() {
      var tmpMatrix;
      if (p.use3DContext) {
        tmpMatrix = new PMatrix3D();
      } else {
        tmpMatrix = new PMatrix2D();
      }

      if (arguments.length === 1) {
        tmpMatrix.set(arguments[0]);
      } else {
        tmpMatrix.set(arguments);
      }
      this.matrixStack.push(tmpMatrix);
    };

    PMatrixStack.prototype.push = function push() {
      this.matrixStack.push(this.peek());
    };

    PMatrixStack.prototype.pop = function pop() {
      return this.matrixStack.pop();
    };

    PMatrixStack.prototype.peek = function peek() {
      var tmpMatrix;
      if (p.use3DContext) {
        tmpMatrix = new PMatrix3D();
      } else {
        tmpMatrix = new PMatrix2D();
      }

      tmpMatrix.set(this.matrixStack[this.matrixStack.length - 1]);
      return tmpMatrix;
    };

    PMatrixStack.prototype.mult = function mult(matrix) {
      this.matrixStack[this.matrixStack.length - 1].apply(matrix);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Array handling
    ////////////////////////////////////////////////////////////////////////////
    p.split = function(str, delim) {
      return str.split(delim);
    };

    p.splitTokens = function(str, tokens) {
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

    p.append = function(array, element) {
      array[array.length] = element;
      return array;
    };

    p.concat = function(array1, array2) {
      return array1.concat(array2);
    };

    p.sort = function(array, numElem) {
      var ret = [];

      // depending on the type used (int, float) or string
      // we'll need to use a different compare function
      if (array.length > 0) {
        // copy since we need to return another array
        var elemsToCopy = numElem > 0 ? numElem : array.length;
        for (var i = 0; i < elemsToCopy; i++) {
          ret.push(array[i]);
        }
        if (typeof array[0] === "string") {
          ret.sort();
        }
        // int or float
        else {
          ret.sort(function(a, b) {
            return a - b;
          });
        }

        // copy on the rest of the elements that were not sorted in case the user
        // only wanted a subset of an array to be sorted.
        if (numElem > 0) {
          for (var j = ret.length; j < array.length; j++) {
            ret.push(array[j]);
          }
        }
      }
      return ret;
    };

    p.splice = function(array, value, index) {
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

    p.subset = function(array, offset, length) {
      if (arguments.length === 2) {
        return p.subset(array, offset, array.length - offset);
      } else if (arguments.length === 3) {
        return array.slice(offset, offset + length);
      }
    };

    p.join = function(array, seperator) {
      return array.join(seperator);
    };

    p.shorten = function(ary) {
      var newary = new Array(0);

      // copy array into new array
      var len = ary.length;
      for (var i = 0; i < len; i++) {
        newary[i] = ary[i];
      }
      newary.pop();

      return newary;
    };

    p.expand = function(ary, newSize) {
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

    p.arrayCopy = function(src, srcPos, dest, destPos, length) {
      if (arguments.length === 2) {
        // recall itself and copy src to dest from start index 0 to 0 of src.length
        p.arrayCopy(src, 0, srcPos, 0, src.length);
      } else if (arguments.length === 3) {
        // recall itself and copy src to dest from start index 0 to 0 of length
        p.arrayCopy(src, 0, srcPos, 0, dest);
      } else if (arguments.length === 5) {
        // copy src to dest from index srcPos to index destPos of length recursivly on objects
        for (var i = srcPos, j = destPos; i < length + srcPos; i++, j++) {
          if (src[i] && typeof src[i] === "object") {
            // src[i] is not null and is another object or array. go recursive
            p.arrayCopy(src[i], 0, dest[j], 0, src[i].length);
          } else {
            // standard type, just copy
            dest[j] = src[i];
          }
        }
      }
    };

    p.ArrayList = function() {
      var createArrayList = function(args){
        var array = [];
        for (var i = 0; i < args[0]; i++){
          array[i] = (args.length > 1 ? createArrayList(args.slice(1)) : 0 );
        }

        array.get = function(i) {
          return this[i];
        };
        array.contains = function(item) {
          return this.indexOf(item) !== -1;
        };
        array.add = function(item) {
          return this.push(item);
        };
        array.size = function() {
          return this.length;
        };
        array.clear = function() {
          this.length = 0;
        };
        array.remove = function(i) {
          return this.splice(i, 1)[0];
        };
        array.isEmpty = function() {
          return !this.length;
        };
        array.clone = function() {
          var size = this.length;
          var a = new p.ArrayList(size);
          for (var i = 0; i < size; i++) {
            a[i] = this[i];
          }
          return a;
        };

        return array;
      };
      return createArrayList(Array.prototype.slice.call(arguments));
    };

    p.reverse = function(array) {
      return array.reverse();
    };

    ////////////////////////////////////////////////////////////////////////////
    // HashMap
    ////////////////////////////////////////////////////////////////////////////

    var virtHashCode = function virtHashCode(obj) {
      if (obj.constructor === String) {
        var hash = 0;
        for (var i = 0; i < obj.length; ++i) {
          hash = (hash * 31 + obj.charCodeAt(i)) & 0xFFFFFFFF;
        }
        return hash;
      } else if (typeof(obj) !== "object") {
        return obj & 0xFFFFFFFF;
      } else if ("hashCode" in obj) {
        return obj.hashCode.call(obj);
      } else {
        if (obj.$id === undefined) {
          obj.$id = ((Math.floor(Math.random() * 0x10000) - 0x8000) << 16) | Math.floor(Math.random() * 0x10000);
        }
        return obj.$id;
      }
    };

    var virtEquals = function virtEquals(obj, other) {
      if (obj === null || other === null) {
        return (obj === null) && (other === null);
      } else if (obj.constructor === String) {
        return obj === other;
      } else if (typeof(obj) !== "object") {
        return obj === other;
      } else if ("equals" in obj) {
        return obj.equals.call(obj, other);
      } else {
        return obj === other;
      }
    };

    p.HashMap = function HashMap() {
      if (arguments.length === 1 && arguments[0].constructor === HashMap) {
        return arguments[0].clone();
      }

      var initialCapacity = arguments.length > 0 ? arguments[0] : 16;
      var loadFactor = arguments.length > 1 ? arguments[1] : 0.75;

      var buckets = new Array(initialCapacity);
      var count = 0;
      var hashMap = this;

      function ensureLoad() {
        if (count <= loadFactor * buckets.length) {
          return;
        }
        var allEntries = [];
        for (var i = 0; i < buckets.length; ++i) {
          if (buckets[i] !== undefined) {
            allEntries = allEntries.concat(buckets[i]);
          }
        }
        buckets = new Array(buckets.length * 2);
        for (var j = 0; j < allEntries.length; ++j) {
          var index = virtHashCode(allEntries[j].key) % buckets.length;
          var bucket = buckets[index];
          if (bucket === undefined) {
            buckets[index] = bucket = [];
          }
          bucket.push(allEntries[j]);
        }
      }

      function Iterator(conversion, removeItem) {
        var bucketIndex = 0;
        var itemIndex = -1;
        var endOfBuckets = false;

        function findNext() {
          while (!endOfBuckets) {
            ++itemIndex;
            if (bucketIndex >= buckets.length) {
              endOfBuckets = true;
            } else if (typeof(buckets[bucketIndex]) === 'undefined' || itemIndex >= buckets[bucketIndex].length) {
              itemIndex = -1;
              ++bucketIndex;
            } else {
              return;
            }
          }
        }

        this.hasNext = function() {
          return !endOfBuckets;
        };
        this.next = function() {
          var result = conversion(buckets[bucketIndex][itemIndex]);
          findNext();
          return result;
        };
        this.remove = function() {
          removeItem(this.next());
          --itemIndex;
        };

        findNext();
      }

      function Set(conversion, isIn, removeItem) {
        this.clear = function() {
          hashMap.clear();
        };
        this.contains = function(o) {
          return isIn(o);
        };
        this.containsAll = function(o) {
          var it = o.iterator();
          while (it.hasNext()) {
            if (!this.contains(it.next())) {
              return false;
            }
          }
          return true;
        };
        this.isEmpty = function() {
          return hashMap.isEmpty();
        };
        this.iterator = function() {
          return new Iterator(conversion, removeItem);
        };
        this.remove = function(o) {
          if (this.contains(o)) {
            removeItem(o);
            return true;
          }
          return false;
        };
        this.removeAll = function(c) {
          var it = c.iterator();
          var changed = false;
          while (it.hasNext()) {
            var item = it.next();
            if (this.contains(item)) {
              removeItem(item);
              changed = true;
            }
          }
          return true;
        };
        this.retainAll = function(c) {
          var it = this.iterator();
          var toRemove = [];
          while (it.hasNext()) {
            var entry = it.next();
            if (!c.contains(entry)) {
              toRemove.push(entry);
            }
          }
          for (var i = 0; i < toRemove.length; ++i) {
            removeItem(toRemove[i]);
          }
          return toRemove.length > 0;
        };
        this.size = function() {
          return hashMap.size();
        };
        this.toArray = function() {
          var result = new p.ArrayList(0);
          var it = this.iterator();
          while (it.hasNext()) {
            result.push(it.next());
          }
          return result;
        };
      }

      function Entry(pair) {
        this._isIn = function(map) {
          return map === hashMap && (typeof(pair.removed) === 'undefined');
        };
        this.equals = function(o) {
          return virtEquals(pair.key, o.getKey());
        };
        this.getKey = function() {
          return pair.key;
        };
        this.getValue = function() {
          return pair.value;
        };
        this.hashCode = function(o) {
          return virtHashCode(pair.key);
        };
        this.setValue = function(value) {
          var old = pair.value;
          pair.value = value;
          return old;
        };
      }

      this.clear = function() {
        count = 0;
        buckets = new Array(initialCapacity);
      };
      this.clone = function() {
        var map = new p.HashMap();
        map.putAll(this);
        return map;
      };
      this.containsKey = function(key) {
        var index = virtHashCode(key) % buckets.length;
        var bucket = buckets[index];
        if (bucket === undefined) {
          return false;
        }
        for (var i = 0; i < bucket.length; ++i) {
          if (virtEquals(bucket[i].key, key)) {
            return true;
          }
        }
        return false;
      };
      this.containsValue = function(value) {
        for (var i = 0; i < buckets.length; ++i) {
          var bucket = buckets[i];
          if (bucket === undefined) {
            continue;
          }
          for (var j = 0; j < bucket.length; ++j) {
            if (virtEquals(bucket[j].value, value)) {
              return true;
            }
          }
        }
        return false;
      };
      this.entrySet = function() {
        return new Set(

        function(pair) {
          return new Entry(pair);
        },

        function(pair) {
          return pair.constructor === Entry && pair._isIn(hashMap);
        },

        function(pair) {
          return hashMap.remove(pair.getKey());
        });
      };
      this.get = function(key) {
        var index = virtHashCode(key) % buckets.length;
        var bucket = buckets[index];
        if (bucket === undefined) {
          return null;
        }
        for (var i = 0; i < bucket.length; ++i) {
          if (virtEquals(bucket[i].key, key)) {
            return bucket[i].value;
          }
        }
        return null;
      };
      this.isEmpty = function() {
        return count === 0;
      };
      this.keySet = function() {
        return new Set(

        function(pair) {
          return pair.key;
        },

        function(key) {
          return hashMap.containsKey(key);
        },

        function(key) {
          return hashMap.remove(key);
        });
      };
      this.put = function(key, value) {
        var index = virtHashCode(key) % buckets.length;
        var bucket = buckets[index];
        if (bucket === undefined) {
          ++count;
          buckets[index] = [{
            key: key,
            value: value
          }];
          ensureLoad();
          return null;
        }
        for (var i = 0; i < bucket.length; ++i) {
          if (virtEquals(bucket[i].key, key)) {
            var previous = bucket[i].value;
            bucket[i].value = value;
            return previous;
          }
        }++count;
        bucket.push({
          key: key,
          value: value
        });
        ensureLoad();
        return null;
      };
      this.putAll = function(m) {
        var it = m.entrySet().iterator();
        while (it.hasNext()) {
          var entry = it.next();
          this.put(entry.getKey(), entry.getValue());
        }
      };
      this.remove = function(key) {
        var index = virtHashCode(key) % buckets.length;
        var bucket = buckets[index];
        if (bucket === undefined) {
          return null;
        }
        for (var i = 0; i < bucket.length; ++i) {
          if (virtEquals(bucket[i].key, key)) {
            --count;
            var previous = bucket[i].value;
            bucket[i].removed = true;
            if (bucket.length > 1) {
              bucket.splice(i, 1);
            } else {
              buckets[index] = undefined;
            }
            return previous;
          }
        }
        return null;
      };
      this.size = function() {
        return count;
      };
      this.values = function() {
        var result = new p.ArrayList(0);
        var it = this.entrySet().iterator();
        while (it.hasNext()) {
          var entry = it.next();
          result.push(entry.getValue());
        }
        return result;
      };
    };

    ////////////////////////////////////////////////////////////////////////////
    // Color functions
    ////////////////////////////////////////////////////////////////////////////

    // helper functions for internal blending modes
    p.mix = function(a, b, f) {
      return a + (((b - a) * f) >> 8);
    };

    p.peg = function(n) {
      return (n < 0) ? 0 : ((n > 255) ? 255 : n);
    };

    // blending modes
    p.modes = {
      replace: function(c1, c2) {
        return c2;
      },
      blend: function(c1, c2) {
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | p.mix(c1 & p.RED_MASK, c2 & p.RED_MASK, f) & p.RED_MASK | p.mix(c1 & p.GREEN_MASK, c2 & p.GREEN_MASK, f) & p.GREEN_MASK | p.mix(c1 & p.BLUE_MASK, c2 & p.BLUE_MASK, f));
      },
      add: function(c1, c2) {
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | Math.min(((c1 & p.RED_MASK) + ((c2 & p.RED_MASK) >> 8) * f), p.RED_MASK) & p.RED_MASK | Math.min(((c1 & p.GREEN_MASK) + ((c2 & p.GREEN_MASK) >> 8) * f), p.GREEN_MASK) & p.GREEN_MASK | Math.min((c1 & p.BLUE_MASK) + (((c2 & p.BLUE_MASK) * f) >> 8), p.BLUE_MASK));
      },
      subtract: function(c1, c2) {
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | Math.max(((c1 & p.RED_MASK) - ((c2 & p.RED_MASK) >> 8) * f), p.GREEN_MASK) & p.RED_MASK | Math.max(((c1 & p.GREEN_MASK) - ((c2 & p.GREEN_MASK) >> 8) * f), p.BLUE_MASK) & p.GREEN_MASK | Math.max((c1 & p.BLUE_MASK) - (((c2 & p.BLUE_MASK) * f) >> 8), 0));
      },
      lightest: function(c1, c2) {
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | Math.max(c1 & p.RED_MASK, ((c2 & p.RED_MASK) >> 8) * f) & p.RED_MASK | Math.max(c1 & p.GREEN_MASK, ((c2 & p.GREEN_MASK) >> 8) * f) & p.GREEN_MASK | Math.max(c1 & p.BLUE_MASK, ((c2 & p.BLUE_MASK) * f) >> 8));
      },
      darkest: function(c1, c2) {
        var f = (c2 & p.ALPHA_MASK) >>> 24;
        return (Math.min(((c1 & p.ALPHA_MASK) >>> 24) + f, 0xff) << 24 | p.mix(c1 & p.RED_MASK, Math.min(c1 & p.RED_MASK, ((c2 & p.RED_MASK) >> 8) * f), f) & p.RED_MASK | p.mix(c1 & p.GREEN_MASK, Math.min(c1 & p.GREEN_MASK, ((c2 & p.GREEN_MASK) >> 8) * f), f) & p.GREEN_MASK | p.mix(c1 & p.BLUE_MASK, Math.min(c1 & p.BLUE_MASK, ((c2 & p.BLUE_MASK) * f) >> 8), f));
      },
      difference: function(c1, c2) {
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
      exclusion: function(c1, c2) {
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
      multiply: function(c1, c2) {
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
      screen: function(c1, c2) {
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
      hard_light: function(c1, c2) {
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
      soft_light: function(c1, c2) {
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
      overlay: function(c1, c2) {
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
      dodge: function(c1, c2) {
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
      burn: function(c1, c2) {
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

    p.color = function color(aValue1, aValue2, aValue3, aValue4) {
      var r, g, b, a, rgb, aColor;

      // 4 arguments: (R, G, B, A) or (H, S, B, A)
      if (aValue1 != null && aValue2 != null && aValue3 != null && aValue4 != null) {
        if (curColorMode === p.HSB) {
          rgb = p.color.toRGB(aValue1, aValue2, aValue3);
          r = rgb[0];
          g = rgb[1];
          b = rgb[2];
        } else {
          r = Math.round(255 * (aValue1 / colorModeX));
          g = Math.round(255 * (aValue2 / colorModeY));
          b = Math.round(255 * (aValue3 / colorModeZ));
        }

        a = Math.round(255 * (aValue4 / colorModeA));

        // Limit values greater than 255
        r = (r > 255) ? 255 : r;
        g = (g > 255) ? 255 : g;
        b = (b > 255) ? 255 : b;
        a = (a > 255) ? 255 : a;

        // Create color int
        aColor = (a << 24) & p.ALPHA_MASK | (r << 16) & p.RED_MASK | (g << 8) & p.GREEN_MASK | b & p.BLUE_MASK;
      }

      // 3 arguments: (R, G, B) or (H, S, B)
      else if (aValue1 != null && aValue2 != null && aValue3 != null) {
        aColor = p.color(aValue1, aValue2, aValue3, colorModeA);
      }

      // 2 arguments: (Color, A) or (Grayscale, A)
      else if (aValue1 != null && aValue2 != null) {
        // Color int and alpha
        if (aValue1 & p.ALPHA_MASK) {
          a = Math.round(255 * (aValue2 / colorModeA));
          a = (a > 255) ? 255 : a;

          aColor = aValue1 - (aValue1 & p.ALPHA_MASK) + ((a << 24) & p.ALPHA_MASK);
        }
        // Grayscale and alpha
        else {
          switch(curColorMode) {
            case p.RGB: aColor = p.color(aValue1, aValue1, aValue1, aValue2); break;
            case p.HSB: aColor = p.color(0, 0, (aValue1 / colorModeX) * colorModeZ, aValue2); break;
          }
        }
      }

      // 1 argument: (Grayscale) or (Color)
      else if (typeof aValue1 === "number") {
        // Grayscale
        if (aValue1 <= colorModeX && aValue1 >= 0) {
          switch(curColorMode) {
            case p.RGB: aColor = p.color(aValue1, aValue1, aValue1, colorModeA); break;
            case p.HSB: aColor = p.color(0, 0, (aValue1 / colorModeX) * colorModeZ, colorModeA); break;
          }
        }
        // Color int
        else if (aValue1) {
          aColor = aValue1;
        }
      }

      // Default
      else {
        aColor = p.color(colorModeX, colorModeY, colorModeZ, colorModeA);
      }

      return aColor;
    };

    // Ease of use function to extract the colour bits into a string
    p.color.toString = function(colorInt) {
      return "rgba(" + ((colorInt & p.RED_MASK) >>> 16) + "," + ((colorInt & p.GREEN_MASK) >>> 8) + "," + ((colorInt & p.BLUE_MASK)) + "," + ((colorInt & p.ALPHA_MASK) >>> 24) / 255 + ")";
    };

    // Easy of use function to pack rgba values into a single bit-shifted color int.
    p.color.toInt = function(r, g, b, a) {
      return (a << 24) & p.ALPHA_MASK | (r << 16) & p.RED_MASK | (g << 8) & p.GREEN_MASK | b & p.BLUE_MASK;
    };

    // Creates a simple array in [R, G, B, A] format, [255, 255, 255, 255]
    p.color.toArray = function(colorInt) {
      return [(colorInt & p.RED_MASK) >>> 16, (colorInt & p.GREEN_MASK) >>> 8, colorInt & p.BLUE_MASK, (colorInt & p.ALPHA_MASK) >>> 24];
    };

    // Creates a WebGL color array in [R, G, B, A] format. WebGL wants the color ranges between 0 and 1, [1, 1, 1, 1]
    p.color.toGLArray = function(colorInt) {
      return [((colorInt & p.RED_MASK) >>> 16) / 255, ((colorInt & p.GREEN_MASK) >>> 8) / 255, (colorInt & p.BLUE_MASK) / 255, ((colorInt & p.ALPHA_MASK) >>> 24) / 255];
    };

    // HSB conversion function from Mootools, MIT Licensed
    p.color.toRGB = function(h, s, b) {
      // Limit values greater than range
      h = (h > colorModeX)   ? colorModeX   : h;
      s = (s > colorModeY) ? colorModeY : s;
      b = (b > colorModeZ)  ? colorModeZ  : b;

      h = (h / colorModeX) * 360;
      s = (s / colorModeY) * 100;
      b = (b / colorModeZ) * 100;

      var br = Math.round(b / 100 * 255);

      if (s === 0) { // Grayscale
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
    };

    p.color.toHSB = function( colorInt ) {
      var red, green, blue;

      red = ((colorInt & p.RED_MASK) >>> 16) / 255;
      green = ((colorInt & p.GREEN_MASK) >>> 8) / 255;
      blue = (colorInt & p.BLUE_MASK) / 255;

      var max = p.max(p.max(red,green), blue),
          min = p.min(p.min(red,green), blue),
          hue, saturation;

      if (min === max) {
        return [0, 0, max];
      } else {
        saturation = (max - min) / max;

        if (red === max) {
          hue = (green - blue) / (max - min);
        } else if (green === max) {
          hue = 2 + ((blue - red) / (max - min));
        } else {
          hue = 4 + ((red - green) / (max - min));
        }

        hue /= 6;

        if (hue < 0) {
          hue += 1;
        } else if (hue > 1) {
          hue -= 1;
        }
      }
      return [hue*colorModeX, saturation*colorModeY, max*colorModeZ];
    };

    p.brightness = function(colInt){
      return  p.color.toHSB(colInt)[2];
    };

    p.saturation = function(colInt){
      return  p.color.toHSB(colInt)[1];
    };

    p.hue = function(colInt){
      return  p.color.toHSB(colInt)[0];
    };

    var verifyChannel = function verifyChannel(aColor) {
      if (aColor.constructor === Array) {
        return aColor;
      } else {
        return p.color(aColor);
      }
    };

    p.red = function(aColor) {
      return ((aColor & p.RED_MASK) >>> 16) / 255 * colorModeX;
    };

    p.green = function(aColor) {
      return ((aColor & p.GREEN_MASK) >>> 8) / 255 * colorModeY;
    };

    p.blue = function(aColor) {
      return (aColor & p.BLUE_MASK) / 255 * colorModeZ;
    };

    p.alpha = function(aColor) {
      return ((aColor & p.ALPHA_MASK) >>> 24) / 255 * colorModeA;
    };

    p.lerpColor = function lerpColor(c1, c2, amt) {
      // Get RGBA values for Color 1 to floats
      var colorBits1 = p.color(c1);
      var r1 = (colorBits1 & p.RED_MASK) >>> 16;
      var g1 = (colorBits1 & p.GREEN_MASK) >>> 8;
      var b1 = (colorBits1 & p.BLUE_MASK);
      var a1 = ((colorBits1 & p.ALPHA_MASK) >>> 24) / colorModeA;

      // Get RGBA values for Color 2 to floats
      var colorBits2 = p.color(c2);
      var r2 = (colorBits2 & p.RED_MASK) >>> 16;
      var g2 = (colorBits2 & p.GREEN_MASK) >>> 8;
      var b2 = (colorBits2 & p.BLUE_MASK);
      var a2 = ((colorBits2 & p.ALPHA_MASK) >>> 24) / colorModeA;

      // Return lerp value for each channel, INT for color, Float for Alpha-range
      var r = parseInt(p.lerp(r1, r2, amt), 10);
      var g = parseInt(p.lerp(g1, g2, amt), 10);
      var b = parseInt(p.lerp(b1, b2, amt), 10);
      var a = parseFloat(p.lerp(a1, a2, amt) * colorModeA, 10);

      return p.color.toInt(r, g, b, a);
    };

    // Forced default color mode for #aaaaaa style
    p.defaultColor = function(aValue1, aValue2, aValue3) {
      var tmpColorMode = curColorMode;
      curColorMode = p.RGB;
      var c = p.color(aValue1 / 255 * colorModeX, aValue2 / 255 * colorModeY, aValue3 / 255 * colorModeZ);
      curColorMode = tmpColorMode;
      return c;
    };

    p.colorMode = function colorMode(mode, range1, range2, range3, range4) {
      curColorMode = mode;
      if (arguments.length >= 4) {
        colorModeX = range1;
        colorModeY = range2;
        colorModeZ = range3;
      }
      if (arguments.length === 5) {
        colorModeA = range4;
      }
      if (arguments.length === 2) {
        p.colorMode(mode, range1, range1, range1, range1);
      }
    };

    p.blendColor = function(c1, c2, mode) {
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

    p.printMatrix = function printMatrix() {
      modelView.print();
    };

    p.translate = function translate(x, y, z) {
      if (p.use3DContext) {
        forwardTransform.translate(x, y, z);
        reverseTransform.invTranslate(x, y, z);
      } else {
        curContext.translate(x, y);
      }
    };

    p.scale = function scale(x, y, z) {
      if (p.use3DContext) {
        forwardTransform.scale(x, y, z);
        reverseTransform.invScale(x, y, z);
      } else {
        curContext.scale(x, y || x);
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
      reverseTransform.reset();
    };

    p.applyMatrix = function applyMatrix() {
      var a = arguments;
      if (!p.use3DContext) {
        for (var cnt = a.length; cnt < 16; cnt++) {
          a[cnt] = 0;
        }
        a[10] = a[15] = 1;
      }

      forwardTransform.apply(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
      reverseTransform.invApply(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
    };

    p.rotateX = function(angleInRadians) {
      forwardTransform.rotateX(angleInRadians);
      reverseTransform.invRotateX(angleInRadians);
    };

    p.rotateZ = function(angleInRadians) {
      forwardTransform.rotateZ(angleInRadians);
      reverseTransform.invRotateZ(angleInRadians);
    };

    p.rotateY = function(angleInRadians) {
      forwardTransform.rotateY(angleInRadians);
      reverseTransform.invRotateY(angleInRadians);
    };

    p.rotate = function rotate(angleInRadians) {
      if (p.use3DContext) {
        forwardTransform.rotateZ(angleInRadians);
        reverseTransform.invRotateZ(angleInRadians);
      } else {
        curContext.rotate(angleInRadians);
      }
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
        'colorModeX': colorModeX,
        'colorModeZ': colorModeZ,
        'colorModeY': colorModeY,
        'colorModeA': colorModeA,
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
        colorModeX = oldState.colorModeX;
        colorModeZ = oldState.colorModeZ;
        colorModeY = oldState.colorModeY;
        colorModeA = oldState.colorModeA;
        curTextFont = oldState.curTextFont;
        curTextSize = oldState.curTextSize;
      } else {
        throw "Too many popStyle() without enough pushStyle()";
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // Time based functions
    ////////////////////////////////////////////////////////////////////////////

    p.year = function year() {
      return new Date().getFullYear();
    };
    p.month = function month() {
      return new Date().getMonth() + 1;
    };
    p.day = function day() {
      return new Date().getDate();
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
        // Delete all the lighting states and the materials the
        // user set in the last draw() call.
        p.noLights();
        p.lightFalloff(1, 0, 0);
        p.shininess(1);
        p.ambient(255, 255, 255);
        p.specular(0, 0, 0);
        p.camera();
        p.draw();
      } else {
        curContext.save();
        p.draw();
        curContext.restore();
      }

      inDraw = false;
    };

    p.loop = function loop() {
      if (loopStarted) {
        return;
      }

      looping = window.setInterval(function() {
        try {
          try {
            p.focused = document.hasFocus();
          } catch(e) {}
          p.redraw();
        } catch(e_loop) {
          window.clearInterval(looping);
          throw e_loop;
        }
      }, curMsPerFrame);

      doLoop = true;
      loopStarted = true;
    };

    p.frameRate = function frameRate(aRate) {
      curFrameRate = aRate;
      curMsPerFrame = 1000 / curFrameRate;
    };

    p.exit = function exit() {
      window.clearInterval(looping);

      for (var i=0, ehl=p.pjs.eventHandlers.length; i<ehl; i++) {
        var elem = p.pjs.eventHandlers[i][0],
            type = p.pjs.eventHandlers[i][1],
            fn   = p.pjs.eventHandlers[i][2];

        if (elem.removeEventListener) {
          elem.removeEventListener(type, fn, false);
        } else if (elem.detachEvent) {
          elem.detachEvent("on" + type, fn);
        }
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // MISC functions
    ////////////////////////////////////////////////////////////////////////////

    p.cursor = function cursor() {
      if (arguments.length > 1 || (arguments.length === 1 && arguments[0] instanceof p.PImage)) {
        var image = arguments[0],
          x, y;
        if (arguments.length >= 3) {
          x = arguments[1];
          y = arguments[2];
          if (x < 0 || y < 0 || y >= image.height || x >= image.width) {
            throw "x and y must be non-negative and less than the dimensions of the image";
          }
        } else {
          x = image.width >>> 1;
          y = image.height >>> 1;
        }

        // see https://developer.mozilla.org/en/Using_URL_values_for_the_cursor_property
        var imageDataURL = image.toDataURL();
        var style = "url(\"" + imageDataURL + "\") " + x + " " + y + ", default";
        curCursor = curElement.style.cursor = style;
      } else if (arguments.length === 1) {
        var mode = arguments[0];
        curCursor = curElement.style.cursor = mode;
      } else {
        curCursor = curElement.style.cursor = oldCursor;
      }
    };

    p.noCursor = function noCursor() {
      curCursor = curElement.style.cursor = p.NOCURSOR;
    };

    p.link = function(href, target) {
      if (typeof target !== 'undefined') {
        window.open(href, target);
      } else {
        window.location = href;
      }
    };

    // PGraphics methods
    // TODO: These functions are suppose to be called before any operations are called on the
    //       PGraphics object. They currently do nothing.
    p.beginDraw = function beginDraw() {};
    p.endDraw = function endDraw() {};

    // Imports an external Processing.js library
    p.Import = function Import(lib) {
      // Replace evil-eval method with a DOM <script> tag insert method that
      // binds new lib code to the Processing.lib names-space and the current
      // p context. -F1LT3R
    };

    var contextMenu = function(e) {
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
      mask = mask << (numBitsInValue - 1);

      var str = "";
      for (var i = 0; i < numBitsInValue; i++) {
        str += (mask & value) ? "1" : "0";
        mask = mask >>> 1;
      }
      return str;
    }

    p.binary = function(num, numBits) {
      var numBitsInValue = 32;

      // color
      if (typeof num === "string" && num.length > 1) {
        var c = num.slice(5, -1).split(",");

        // if all components are zero, a single "0" is returned for some reason
        // [0] alpha is normalized, [1] r, [2] g, [3] b
        var sbin = [
          decToBin(c[3] * 255, 8),
          decToBin(c[0], 8),
          decToBin(c[1], 8),
          decToBin(c[2], 8)
          ];

        var s = sbin[0] + sbin[1] + sbin[2] + sbin[3];

        if (numBits) {
          s = s.substr(-numBits);
        }
        // if the user didn't specify number of bits,
        // trim leading zeros.
        else {
          s = s.replace(/^0+$/g, "0");
          s = s.replace(/^0{1,}1/g, "1");
        }
        return s;
      }

      // char
      if (typeof num === "string" || num instanceof Char) {

        if (num instanceof Char) {
          num = num.toString().charCodeAt(0);
        } else {
          num = num.charCodeAt(0);
        }

        if (numBits) {
          numBitsInValue = 32;
        } else {
          numBitsInValue = 16;
        }
      }

      var str = decToBin(num, numBitsInValue);

      // trim string if user wanted less chars
      if (numBits) {
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
    };

    p.nfs = function(num, left, right) {
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
        if (right === 0) {
          right = 1;
        }

        if (right < 0) {
          rounded = Math.round(num);
        } else {
          // round to 'right' decimal places
          rounded = Math.round(num * Math.pow(10, right)) / Math.pow(10, right);
        }

        // split number into whole and fractional components
        var splitNum = Math.abs(rounded).toString().split("."); // [0] whole number, [1] fractional number
        // format whole part
        formatLength = left - splitNum[0].length;
        for (; formatLength > 0; formatLength--) {
          splitNum[0] = "0" + splitNum[0];
        }

        // format fractional part
        if (splitNum.length === 2 || right > 0) {
          splitNum[1] = splitNum.length === 2 ? splitNum[1] : "";
          formatLength = right - splitNum[1].length;
          for (; formatLength > 0; formatLength--) {
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

    p.nfp = function(num, left, right) {
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
        if (right === 0) {
          right = 1;
        }

        if (right < 0) {
          rounded = Math.round(num);
        } else {
          // round to 'right' decimal places
          rounded = Math.round(num * Math.pow(10, right)) / Math.pow(10, right);
        }

        // split number into whole and fractional components
        var splitNum = Math.abs(rounded).toString().split("."); // [0] whole number, [1] fractional number
        // format whole part
        formatLength = left - splitNum[0].length;
        for (; formatLength > 0; formatLength--) {
          splitNum[0] = "0" + splitNum[0];
        }

        // format fractional part
        if (splitNum.length === 2 || right > 0) {
          splitNum[1] = splitNum.length === 2 ? splitNum[1] : "";
          formatLength = right - splitNum[1].length;
          for (; formatLength > 0; formatLength--) {
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

    p.nfc = function(num, right) {
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
      if (hex.length >= padding) {
        hex = hex.substring(hex.length - padding, hex.length);
      }
      return hex;
    };

    // note: since we cannot keep track of byte, int types by default the returned string is 8 chars long
    // if no 2nd argument is passed.  closest compromise we can use to match java implementation Feb 5 2010
    // also the char parser has issues with chars that are not digits or letters IE: !@#$%^&*
    p.hex = function hex(value, len) {
      var hexstring = "";
      if (arguments.length === 1) {
        if (value instanceof Char) {
          hexstring = hex(value, 4);
        } else { // int or byte, indistinguishable at the moment, default to 8
          hexstring = hex(value, 8);
        }
      } else { // pad to specified length
        hexstring = decimalToHex(value, len);
      }
      return hexstring;
    };

    p.unhex = function(str) {
      var value = 0, multiplier = 1, num = 0;

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

    p.loadBytes = function loadBytes(url) {
      var string = ajax(url);
      var ret = new Array(string.length);

      for (var i = 0; i < string.length; i++) {
        ret[i] = string.charCodeAt(i);
      }

      return ret;
    };

    // nf() should return an array when being called on an array, at the moment it only returns strings. -F1LT3R
    // This breaks the join() ref-test. The Processing.org documentation says String or String[]. SHOULD BE FIXED NOW
    p.nf = function() {
      var str, num, pad, arr, left, right, isNegative, test, i;

      if (arguments.length === 2 && typeof arguments[0] === 'number' && typeof arguments[1] === 'number' && (arguments[0] + "").indexOf('.') === -1) {
        num = arguments[0];
        pad = arguments[1];

        isNegative = num < 0;

        if (isNegative) {
          num = Math.abs(num);
        }

        str = "" + num;
        for (i = pad - str.length; i > 0; i--) {
          str = "0" + str;
        }

        if (isNegative) {
          str = "-" + str;
        }
      } else if (arguments.length === 2 && typeof arguments[0] === 'object' && arguments[0].constructor === Array && typeof arguments[1] === 'number') {
        arr = arguments[0];
        pad = arguments[1];

        str = new Array(arr.length);

        for (i = 0; i < arr.length && str !== undefined; i++) {
          test = p.nf(arr[i], pad);
          if (test === undefined) {
            str = undefined;
          } else {
            str[i] = test;
          }
        }
      } else if (arguments.length === 3 && typeof arguments[0] === 'number' && typeof arguments[1] === 'number' && typeof arguments[2] === 'number' && (arguments[0] + "").indexOf('.') >= 0) {
        num = arguments[0];
        left = arguments[1];
        right = arguments[2];

        isNegative = num < 0;

        if (isNegative) {
          num = Math.abs(num);
        }

        // Change the way the number is 'floored' based on whether it is odd or even.
        if (right < 0 && Math.floor(num) % 2 === 1) {
          // Make sure 1.49 rounds to 1, but 1.5 rounds to 2.
          if ((num) - Math.floor(num) >= 0.5) {
            num = num + 1;
          }
        }

        str = "" + num;

        for (i = left - str.indexOf('.'); i > 0; i--) {
          str = "0" + str;
        }

        var numDec = str.length - str.indexOf('.') - 1;
        if (numDec <= right) {
          for (i = right - (str.length - str.indexOf('.') - 1); i > 0; i--) {
            str = str + "0";
          }
        } else if (right > 0) {
          str = str.substring(0, str.length - (numDec - right));
        } else if (right < 0) {

          str = str.substring(0, str.indexOf('.'));
        }

        if (isNegative) {
          str = "-" + str;
        }
      } else if (arguments.length === 3 && typeof arguments[0] === 'object' && arguments[0].constructor === Array && typeof arguments[1] === 'number' && typeof arguments[2] === 'number') {
        arr = arguments[0];
        left = arguments[1];
        right = arguments[2];

        str = new Array(arr.length);

        for (i = 0; i < arr.length && str !== undefined; i++) {
          test = p.nf(arr[i], left, right);
          if (test === undefined) {
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

    p.matchAll = function matchAll(aString, aRegExp) {
      var results = [],
        latest;
      var regexp = new RegExp(aRegExp, "g");
      while ((latest = regexp.exec(aString)) !== null) {
        results.push(latest);
        if (latest[0].length === 0) {
          ++regexp.lastIndex;
        }
      }
      return results.length > 0 ? results : null;
    };

    String.prototype.replaceAll = function(re, replace) {
      return this.replace(new RegExp(re, "g"), replace);
    };

    String.prototype.equals = function equals(str) {
      return this.valueOf() === str.valueOf();
    };

    String.prototype.toCharArray = function() {
      var chars = this.split("");
      for (var i = chars.length - 1; i >= 0; i--) {
        chars[i] = new Char(chars[i]);
      }
      return chars;
    };

    p.match = function(str, regexp) {
      return str.match(regexp);
    };

    // tinylog lite JavaScript library
    /*global tinylog,print*/
    var tinylogLite = (function() {
      "use strict";

      var tinylogLite = {},
        undef = "undefined",
        func = "function",
        False = !1,
        True = !0,
        log = "log";

      if (typeof tinylog !== undef && typeof tinylog[log] === func) {
        // pre-existing tinylog present
        tinylogLite[log] = tinylog[log];
      } else if (typeof document !== undef && !document.fake) {
        (function() {
          // DOM document
          var doc = document,

          $div = "div",
          $style = "style",
          $title = "title",

          containerStyles = {
            zIndex: 10000,
            position: "fixed",
            bottom: "0px",
            width: "100%",
            height: "15%",
            fontFamily: "sans-serif",
            color: "#ccc",
            backgroundColor: "black"
          },
          outputStyles = {
            position: "relative",
            fontFamily: "monospace",
            overflow: "auto",
            height: "100%",
            paddingTop: "5px"
          },
          resizerStyles = {
            height: "5px",
            marginTop: "-5px",
            cursor: "n-resize",
            backgroundColor: "darkgrey"
          },
          closeButtonStyles = {
            position: "absolute",
            top: "5px",
            right: "20px",
            color: "#111",
            MozBorderRadius: "4px",
            webkitBorderRadius: "4px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "normal",
            textAlign: "center",
            padding: "3px 5px",
            backgroundColor: "#333",
            fontSize: "12px"
          },
          entryStyles = {
            //borderBottom: "1px solid #d3d3d3",
            minHeight: "16px"
          },
          entryTextStyles = {
            fontSize: "12px",
            margin: "0 8px 0 8px",
            maxWidth: "100%",
            whiteSpace: "pre-wrap",
            overflow: "auto"
          },

          view = doc.defaultView,
            docElem = doc.documentElement,
            docElemStyle = docElem[$style],

          setStyles = function() {
            var i = arguments.length,
              elemStyle, styles, style;

            while (i--) {
              styles = arguments[i--];
              elemStyle = arguments[i][$style];

              for (style in styles) {
                if (styles.hasOwnProperty(style)) {
                  elemStyle[style] = styles[style];
                }
              }
            }
          },

          observer = function(obj, event, handler) {
            if (obj.addEventListener) {
              obj.addEventListener(event, handler, False);
            } else if (obj.attachEvent) {
              obj.attachEvent("on" + event, handler);
            }
            return [obj, event, handler];
          },
          unobserve = function(obj, event, handler) {
            if (obj.removeEventListener) {
              obj.removeEventListener(event, handler, False);
            } else if (obj.detachEvent) {
              obj.detachEvent("on" + event, handler);
            }
          },
          clearChildren = function(node) {
            var children = node.childNodes,
              child = children.length;

            while (child--) {
              node.removeChild(children.item(0));
            }
          },
          append = function(to, elem) {
            return to.appendChild(elem);
          },
          createElement = function(localName) {
            return doc.createElement(localName);
          },
          createTextNode = function(text) {
            return doc.createTextNode(text);
          },

          createLog = tinylogLite[log] = function(message) {
            // don't show output log until called once
            var uninit,
              originalPadding = docElemStyle.paddingBottom,
              container = createElement($div),
              containerStyle = container[$style],
              resizer = append(container, createElement($div)),
              output = append(container, createElement($div)),
              closeButton = append(container, createElement($div)),
              resizingLog = False,
              previousHeight = False,
              previousScrollTop = False,

              updateSafetyMargin = function() {
                // have a blank space large enough to fit the output box at the page bottom
                docElemStyle.paddingBottom = container.clientHeight + "px";
              },
              setContainerHeight = function(height) {
                var viewHeight = view.innerHeight,
                  resizerHeight = resizer.clientHeight;

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
                observer(doc, "mousemove", function(evt) {
                  if (resizingLog) {
                    setContainerHeight(view.innerHeight - evt.clientY);
                    output.scrollTop = previousScrollTop;
                  }
                }),

                observer(doc, "mouseup", function() {
                  if (resizingLog) {
                    resizingLog = previousScrollTop = False;
                  }
                }),

                observer(resizer, "dblclick", function(evt) {
                  evt.preventDefault();

                  if (previousHeight) {
                    setContainerHeight(previousHeight);
                    previousHeight = False;
                  } else {
                    previousHeight = container.clientHeight;
                    containerStyle.height = "0px";
                  }
                }),

                observer(resizer, "mousedown", function(evt) {
                  evt.preventDefault();
                  resizingLog = True;
                  previousScrollTop = output.scrollTop;
                }),

                observer(resizer, "contextmenu", function() {
                  resizingLog = False;
                }),

                observer(closeButton, "click", function() {
                  uninit();
                })
              ];

            uninit = function() {
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
            container, containerStyles, output, outputStyles, resizer, resizerStyles, closeButton, closeButtonStyles);

            closeButton[$title] = "Close Log";
            append(closeButton, createTextNode("\u2716"));

            resizer[$title] = "Double-click to toggle log minimization";

            docElem.insertBefore(container, docElem.firstChild);

            tinylogLite[log] = function(message) {
              var entry = append(output, createElement($div)),
                entryText = append(entry, createElement($div));

              entry[$title] = (new Date()).toLocaleTimeString();

              setStyles(
              entry, entryStyles, entryText, entryTextStyles);

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
    p.str = function str(val) {
      var ret;

      if (arguments.length === 1) {
        if (typeof val === "string" && val.length === 1) {
          // No strings allowed.
          ret = val;
        } else if (typeof val === "object" && val.constructor === Array) {
          ret = new Array(0);

          for (var i = 0; i < val.length; i++) {
            ret[i] = str(val[i]);
          }
        } else {
          ret = val + "";
        }
      }

      return ret;
    };

    p.trim = function(str) {
      var newstr;
      if (typeof str === "object" && str.constructor === Array) {
        newstr = new Array(0);
        for (var i = 0; i < str.length; i++) {
          newstr[i] = p.trim(str[i]);
        }
      } else {
        // if str is not an array then remove all whitespace, tabs, and returns
        newstr = str.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\r*$/, '');
      }
      return newstr;
    };

    // Conversion
    p['boolean'] = function(val) {
      if (typeof val === 'number') {
        return val !== 0;
      } else if (typeof val === 'boolean') {
        return val;
      } else if (typeof val === 'string') {
        return val.toLowerCase() === 'true';
      } else if (val instanceof Char) {
        // 1, T or t
        return val.code === 49 || val.code === 84 || val.code === 116;
      } else if (typeof val === 'object' && val.constructor === Array) {
        var ret = new Array(val.length);
        for (var i = 0; i < val.length; i++) {
          ret[i] = p['boolean'](val[i]);
        }
        return ret;
      }
    };

    // a byte is a number between -128 and 127
    p['byte'] = function(aNumber) {
      if (typeof aNumber === 'object' && aNumber.constructor === Array) {
        var bytes = [];
        for (var i = 0; i < aNumber.length; i++) {
          bytes[i] = p['byte'](aNumber[i]);
        }
        return bytes;
      } else {
        return (0 - (aNumber & 0x80)) | (aNumber & 0x7F);
      }
    };

    p['char'] = function(key) {
      if (arguments.length === 1 && typeof key === "number") {
        return new Char(String.fromCharCode(key & 0xFFFF));
      } else if (arguments.length === 1 && typeof key === "object" && key.constructor === Array) {
        var ret = new Array(key.length);
        for (var i = 0; i < key.length; i++) {
          ret[i] = p['char'](key[i]);
        }
        return ret;
      } else {
        throw "char() may receive only one argument of type int, byte, int[], or byte[].";
      }
    };

    // Processing doc claims good argument types are: int, char, byte, boolean,
    // String, int[], char[], byte[], boolean[], String[].
    // floats should not work. However, floats with only zeroes right of the
    // decimal will work because JS converts those to int.
    p['float'] = function(val) {
      if (arguments.length === 1) {
        if (typeof val === 'number') {
          return val;
        } else if (typeof val === 'boolean') {
          return val ? 1 : 0;
        } else if (typeof val === 'string') {
          return parseFloat(val);
        } else if (val instanceof Char) {
          return val.code;
        } else if (typeof val === 'object' && val.constructor === Array) {
          var ret = new Array(val.length);
          for (var i = 0; i < val.length; i++) {
            ret[i] = p['float'](val[i]);
          }
          return ret;
        }
      }
    };

    p['int'] = function(val) {
      if (typeof val === 'number') {
        return val & 0xFFFFFFFF;
      } else if (typeof val === 'boolean') {
        return val ? 1 : 0;
      } else if (typeof val === 'string') {
        var number = parseInt(val, 10); // Force decimal radix. Don't convert hex or octal (just like p5)
        return number & 0xFFFFFFFF;
      } else if (val instanceof Char) {
        return val.code;
      } else if (typeof val === 'object' && val.constructor === Array) {
        var ret = new Array(val.length);
        for (var i = 0; i < val.length; i++) {
          if (typeof val[i] === 'string' && !/^\s*[+\-]?\d+\s*$/.test(val[i])) {
            ret[i] = 0;
          } else {
            ret[i] = p['int'](val[i]);
          }
        }
        return ret;
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // Math functions
    ////////////////////////////////////////////////////////////////////////////

    // Calculation
    p.abs = Math.abs;

    p.ceil = Math.ceil;

    p.constrain = function(aNumber, aMin, aMax) {
      return aNumber > aMax ? aMax : aNumber < aMin ? aMin : aNumber;
    };

    p.dist = function() {
      var dx, dy, dz;
      if (arguments.length === 4) {
        dx = arguments[0] - arguments[2];
        dy = arguments[1] - arguments[3];
        return Math.sqrt(dx * dx + dy * dy);
      } else if (arguments.length === 6) {
        dx = arguments[0] - arguments[3];
        dy = arguments[1] - arguments[4];
        dz = arguments[2] - arguments[5];
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
      }
    };

    p.exp = Math.exp;

    p.floor = Math.floor;

    p.lerp = function(value1, value2, amt) {
      return ((value2 - value1) * amt) + value1;
    };

    p.log = Math.log;

    p.mag = function(a, b, c) {
      if (arguments.length === 2) {
        return Math.sqrt(a * a + b * b);
      } else if (arguments.length === 3) {
        return Math.sqrt(a * a + b * b + c * c);
      }
    };

    p.map = function(value, istart, istop, ostart, ostop) {
      return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
    };

    p.max = function() {
      if (arguments.length === 2) {
        return arguments[0] < arguments[1] ? arguments[1] : arguments[0];
      } else {
        var numbers = arguments.length === 1 ? arguments[0] : arguments; // if single argument, array is used
        if (! ("length" in numbers && numbers.length > 0)) {
          throw "Non-empty array is expected";
        }
        var max = numbers[0],
          count = numbers.length;
        for (var i = 1; i < count; ++i) {
          if (max < numbers[i]) {
            max = numbers[i];
          }
        }
        return max;
      }
    };

    p.min = function() {
      if (arguments.length === 2) {
        return arguments[0] < arguments[1] ? arguments[0] : arguments[1];
      } else {
        var numbers = arguments.length === 1 ? arguments[0] : arguments; // if single argument, array is used
        if (! ("length" in numbers && numbers.length > 0)) {
          throw "Non-empty array is expected";
        }
        var min = numbers[0],
          count = numbers.length;
        for (var i = 1; i < count; ++i) {
          if (min > numbers[i]) {
            min = numbers[i];
          }
        }
        return min;
      }
    };

    p.norm = function(aNumber, low, high) {
      return (aNumber - low) / (high - low);
    };

    p.pow = Math.pow;

    p.round = Math.round;

    p.sq = function(aNumber) {
      return aNumber * aNumber;
    };

    p.sqrt = Math.sqrt;

    // Trigonometry
    p.acos = Math.acos;

    p.asin = Math.asin;

    p.atan = Math.atan;

    p.atan2 = Math.atan2;

    p.cos = Math.cos;

    p.degrees = function(aAngle) {
      return (aAngle * 180) / Math.PI;
    };

    p.radians = function(aAngle) {
      return (aAngle / 180) * Math.PI;
    };

    p.sin = Math.sin;

    p.tan = Math.tan;

    var currentRandom = Math.random;

    p.random = function random() {
      if(arguments.length === 0) {
        return currentRandom();
      } else if(arguments.length === 1) {
        return currentRandom() * arguments[0];
      } else {
        var aMin = arguments[0], aMax = arguments[1];
        return currentRandom() * (aMax - aMin) + aMin;
      }
    };

    // Pseudo-random generator
    function Marsaglia(i1, i2) {
      // from http://www.math.uni-bielefeld.de/~sillke/ALGORITHMS/random/marsaglia-c
      var z=i1 || 362436069, w= i2 || 521288629;
      var nextInt = function() {
        z=(36969*(z&65535)+(z>>>16)) & 0xFFFFFFFF;
        w=(18000*(w&65535)+(w>>>16)) & 0xFFFFFFFF;
        return (((z&0xFFFF)<<16) | (w&0xFFFF)) & 0xFFFFFFFF;
      };

      this.nextDouble = function() {
        var i = nextInt() / 4294967296;
        return i < 0 ? 1 + i : i;
      };
      this.nextInt = nextInt;
    }
    Marsaglia.createRandomized = function() {
      var now = new Date();
      return new Marsaglia((now / 60000) & 0xFFFFFFFF, now & 0xFFFFFFFF);
    };

    p.randomSeed = function(seed) {
      currentRandom = (new Marsaglia(seed)).nextDouble;
    };

    // Random
    p.Random = function(seed) {
      var haveNextNextGaussian = false, nextNextGaussian, random;

      this.nextGaussian = function() {
        if (haveNextNextGaussian) {
          haveNextNextGaussian = false;
          return nextNextGaussian;
        } else {
          var v1, v2, s;
          do {
            v1 = 2 * random() - 1; // between -1.0 and 1.0
            v2 = 2 * random() - 1; // between -1.0 and 1.0
            s = v1 * v1 + v2 * v2;
          }
          while (s >= 1 || s === 0);

          var multiplier = Math.sqrt(-2 * Math.log(s) / s);
          nextNextGaussian = v2 * multiplier;
          haveNextNextGaussian = true;

          return v1 * multiplier;
        }
      };

      // by default use standard random, otherwise seeded
      random = seed === undefined ? Math.random : (new Marsaglia(seed)).nextDouble;
    };

    // Noise functions and helpers
    function PerlinNoise(seed) {
      var rnd = seed !== undefined ? new Marsaglia(seed) : Marsaglia.createRandomized();
      var i, j;
      // http://www.noisemachine.com/talk1/17b.html
      // http://mrl.nyu.edu/~perlin/noise/
      // generate permutation
      var p = new Array(512);
      for(i=0;i<256;++i) { p[i] = i; }
      for(i=0;i<256;++i) { var t = p[j = rnd.nextInt() & 0xFF]; p[j] = p[i]; p[i] = t; }
      // copy to avoid taking mod in p[0];
      for(i=0;i<256;++i) { p[i + 256] = p[i]; }

      function grad3d(i,x,y,z) {
        var h = i & 15; // convert into 12 gradient directions
        var u = h<8 ? x : y,
            v = h<4 ? y : h===12||h===14 ? x : z;
        return ((h&1) === 0 ? u : -u) + ((h&2) === 0 ? v : -v);
      }

      function grad2d(i,x,y) {
        var v = (i & 1) === 0 ? x : y;
        return (i&2) === 0 ? -v : v;
      }

      function grad1d(i,x) {
        return (i&1) === 0 ? -x : x;
      }

      function lerp(t,a,b) { return a + t * (b - a); }

      this.noise3d = function(x, y, z) {
        var X = Math.floor(x)&255, Y = Math.floor(y)&255, Z = Math.floor(z)&255;
        x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
        var fx = (3-2*x)*x*x, fy = (3-2*y)*y*y, fz = (3-2*z)*z*z;
        var p0 = p[X]+Y, p00 = p[p0] + Z, p01 = p[p0 + 1] + Z, p1  = p[X + 1] + Y, p10 = p[p1] + Z, p11 = p[p1 + 1] + Z;
        return lerp(fz,
          lerp(fy, lerp(fx, grad3d(p[p00], x, y, z), grad3d(p[p10], x-1, y, z)),
                   lerp(fx, grad3d(p[p01], x, y-1, z), grad3d(p[p11], x-1, y-1,z))),
          lerp(fy, lerp(fx, grad3d(p[p00 + 1], x, y, z-1), grad3d(p[p10 + 1], x-1, y, z-1)),
                   lerp(fx, grad3d(p[p01 + 1], x, y-1, z-1), grad3d(p[p11 + 1], x-1, y-1,z-1))));
      };

      this.noise2d = function(x, y) {
        var X = Math.floor(x)&255, Y = Math.floor(y)&255;
        x -= Math.floor(x); y -= Math.floor(y);
        var fx = (3-2*x)*x*x, fy = (3-2*y)*y*y;
        var p0 = p[X]+Y, p1  = p[X + 1] + Y;
        return lerp(fy,
          lerp(fx, grad2d(p[p0], x, y), grad2d(p[p1], x-1, y)),
          lerp(fx, grad2d(p[p0 + 1], x, y-1), grad2d(p[p1 + 1], x-1, y-1)));
      };

      this.noise1d = function(x) {
        var X = Math.floor(x)&255;
        x -= Math.floor(x);
        var fx = (3-2*x)*x*x;
        return lerp(fx, grad1d(p[X], x), grad1d(p[X+1], x-1));
      };
    }

    // processing defaults
    var noiseProfile = { generator: undefined, octaves: 4, fallout: 0.5, seed: undefined};

    p.noise = function(x, y, z) {
      if(noiseProfile.generator === undefined) {
        // caching
        noiseProfile.generator = new PerlinNoise(noiseProfile.seed);
      }
      var generator = noiseProfile.generator;
      var effect = 1, k = 1, sum = 0;
      for(var i=0; i<noiseProfile.octaves; ++i) {
        effect *= noiseProfile.fallout;
        switch (arguments.length) {
        case 1:
          sum += effect * (1 + generator.noise1d(k*x))/2; break;
        case 2:
          sum += effect * (1 + generator.noise2d(k*x, k*y))/2; break;
        case 3:
          sum += effect * (1 + generator.noise3d(k*x, k*y, k*z))/2; break;
        }
        k *= 2;
      }
      return sum;
    };

    p.noiseDetail = function(octaves, fallout) {
      noiseProfile.octaves = octaves;
      if(fallout !== undefined) {
        noiseProfile.fallout = fallout;
      }
    };

    p.noiseSeed = function(seed) {
      noiseProfile.seed = seed;
      noiseProfile.generator = undefined;
    };

    // Changes the size of the Canvas ( this resets context properties like 'lineCap', etc.
    p.size = function size(aWidth, aHeight, aMode) {
      if (aMode && (aMode === p.WEBGL)) {
        // get the 3D rendering context
        try {
          // If the HTML <canvas> dimensions differ from the
          // dimensions specified in the size() call in the sketch, for
          // 3D sketches, browsers will either not render or render the
          // scene incorrectly. To fix this, we need to adjust the
          // width and height attributes of the canvas.
          if (curElement.width !== aWidth || curElement.height !== aHeight) {
            curElement.setAttribute("width", aWidth);
            curElement.setAttribute("height", aHeight);
          }
          curContext = curElement.getContext("experimental-webgl");
        } catch(e_size) {
          p.debug(e_size);
        }

        if (!curContext) {
          throw "OPENGL 3D context is not supported on this browser.";
        } else {
          for (var i = 0; i < p.SINCOS_LENGTH; i++) {
            sinLUT[i] = p.sin(i * (p.PI / 180) * 0.5);
            cosLUT[i] = p.cos(i * (p.PI / 180) * 0.5);
          }
          // Set defaults
          curContext.viewport(0, 0, curElement.width, curElement.height);
          curContext.clearColor(204 / 255, 204 / 255, 204 / 255, 1.0);
          curContext.clear(curContext.COLOR_BUFFER_BIT);
          curContext.enable(curContext.DEPTH_TEST);
          curContext.enable(curContext.BLEND);
          curContext.blendFunc(curContext.SRC_ALPHA, curContext.ONE_MINUS_SRC_ALPHA);

          // Create the program objects to render 2D (points, lines) and
          // 3D (spheres, boxes) shapes. Because 2D shapes are not lit,
          // lighting calculations could be ommitted from that program object.
          programObject2D = createProgramObject(curContext, vertexShaderSource2D, fragmentShaderSource2D);
          programObject3D = createProgramObject(curContext, vertexShaderSource3D, fragmentShaderSource3D);

          // Now that the programs have been compiled, we can set the default
          // states for the lights.
          curContext.useProgram(programObject3D);
          p.lightFalloff(1, 0, 0);
          p.shininess(1);
          p.ambient(255, 255, 255);
          p.specular(0, 0, 0);

          // Create buffers for 3D primitives
          boxBuffer = curContext.createBuffer();
          curContext.bindBuffer(curContext.ARRAY_BUFFER, boxBuffer);
          curContext.bufferData(curContext.ARRAY_BUFFER, newWebGLArray(boxVerts), curContext.STATIC_DRAW);

          boxNormBuffer = curContext.createBuffer();
          curContext.bindBuffer(curContext.ARRAY_BUFFER, boxNormBuffer);
          curContext.bufferData(curContext.ARRAY_BUFFER, newWebGLArray(boxNorms), curContext.STATIC_DRAW);

          boxOutlineBuffer = curContext.createBuffer();
          curContext.bindBuffer(curContext.ARRAY_BUFFER, boxOutlineBuffer);
          curContext.bufferData(curContext.ARRAY_BUFFER, newWebGLArray(boxOutlineVerts), curContext.STATIC_DRAW);

          // The sphere vertices are specified dynamically since the user
          // can change the level of detail. Everytime the user does that
          // using sphereDetail(), the new vertices are calculated.
          sphereBuffer = curContext.createBuffer();

          lineBuffer = curContext.createBuffer();
          curContext.bindBuffer(curContext.ARRAY_BUFFER, lineBuffer);

          fillBuffer = curContext.createBuffer();
          curContext.bindBuffer(curContext.ARRAY_BUFFER, fillBuffer);

          pointBuffer = curContext.createBuffer();
          curContext.bindBuffer(curContext.ARRAY_BUFFER, pointBuffer);
          curContext.bufferData(curContext.ARRAY_BUFFER, newWebGLArray([0, 0, 0]), curContext.STATIC_DRAW);

          cam = new PMatrix3D();
          cameraInv = new PMatrix3D();
          forwardTransform = new PMatrix3D();
          reverseTransform = new PMatrix3D();
          modelView = new PMatrix3D();
          modelViewInv = new PMatrix3D();
          projection = new PMatrix3D();
          p.camera();
          p.perspective();
          forwardTransform = modelView;
          reverseTransform = modelViewInv;

          userMatrixStack = new PMatrixStack();
          // used by both curve and bezier, so just init here
          curveBasisMatrix = new PMatrix3D();
          curveToBezierMatrix = new PMatrix3D();
          curveDrawMatrix = new PMatrix3D();
          bezierBasisInverse = new PMatrix3D();
          bezierBasisMatrix = new PMatrix3D();
          bezierBasisMatrix.set(-1, 3, -3, 1, 3, -6, 3, 0, -3, 3, 0, 0, 1, 0, 0, 0);
        }
        p.stroke(0);
        p.fill(255);
      } else {
        if (typeof curContext === "undefined") {
          // size() was called without p.init() default context, ie. p.createGraphics()
          curContext = curElement.getContext("2d");
          userMatrixStack = new PMatrixStack();
          modelView = new PMatrix2D();
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
      refreshBackground();

      p.context = curContext; // added for createGraphics
      p.toImageData = function() {
        return curContext.getImageData(0, 0, this.width, this.height);
      };
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
        if (varValue.length === 4) {
          curContext.uniform4fv(varLocation, varValue);
        } else if (varValue.length === 3) {
          curContext.uniform3fv(varLocation, varValue);
        } else if (varValue.length === 2) {
          curContext.uniform2fv(varLocation, varValue);
        } else {
          curContext.uniform1f(varLocation, varValue);
        }
      }
    }

    function uniformi(programObj, varName, varValue) {
      var varLocation = curContext.getUniformLocation(programObj, varName);
      // the variable won't be found if it was optimized out.
      if (varLocation !== -1) {
        if (varValue.length === 4) {
          curContext.uniform4iv(varLocation, varValue);
        } else if (varValue.length === 3) {
          curContext.uniform3iv(varLocation, varValue);
        } else if (varValue.length === 2) {
          curContext.uniform2iv(varLocation, varValue);
        } else {
          curContext.uniform1i(varLocation, varValue);
        }
      }
    }

    function vertexAttribPointer(programObj, varName, size, VBO) {
      var varLocation = curContext.getAttribLocation(programObj, varName);
      if (varLocation !== -1) {
        curContext.bindBuffer(curContext.ARRAY_BUFFER, VBO);
        curContext.vertexAttribPointer(varLocation, size, curContext.FLOAT, false, 0, 0);
        curContext.enableVertexAttribArray(varLocation);
      }
    }

    function uniformMatrix(programObj, varName, transpose, matrix) {
      var varLocation = curContext.getUniformLocation(programObj, varName);
      // the variable won't be found if it was optimized out.
      if (varLocation !== -1) {
        if (matrix.length === 16) {
          curContext.uniformMatrix4fv(varLocation, transpose, matrix);
        } else if (matrix.length === 9) {
          curContext.uniformMatrix3fv(varLocation, transpose, matrix);
        } else {
          curContext.uniformMatrix2fv(varLocation, transpose, matrix);
        }
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Lights
    ////////////////////////////////////////////////////////////////////////////

    p.ambientLight = function(r, g, b, x, y, z) {
      if (p.use3DContext) {
        if (lightCount === p.MAX_LIGHTS) {
          throw "can only create " + p.MAX_LIGHTS + " lights";
        }

        var pos = new PVector(x, y, z);
        var view = new PMatrix3D();
        view.scale(1, -1, 1);
        view.apply(modelView.array());
        view.mult(pos, pos);

        curContext.useProgram(programObject3D);
        uniformf(programObject3D, "lights[" + lightCount + "].color", [r / 255, g / 255, b / 255]);
        uniformf(programObject3D, "lights[" + lightCount + "].position", pos.array());
        uniformi(programObject3D, "lights[" + lightCount + "].type", 0);
        uniformi(programObject3D, "lightCount", ++lightCount);
      }
    };

    p.directionalLight = function(r, g, b, nx, ny, nz) {
      if (p.use3DContext) {
        if (lightCount === p.MAX_LIGHTS) {
          throw "can only create " + p.MAX_LIGHTS + " lights";
        }

        curContext.useProgram(programObject3D);

        // Less code than manually multiplying, but I'll fix
        // this when I have more time.
        var dir = [nx, ny, nz, 0.0000001];

        var view = new PMatrix3D();
        view.scale(1, -1, 1);
        view.apply(modelView.array());
        view.mult(dir, dir);

        uniformf(programObject3D, "lights[" + lightCount + "].color", [r / 255, g / 255, b / 255]);
        uniformf(programObject3D, "lights[" + lightCount + "].position", [-dir[0], -dir[1], -dir[2]]);
        uniformi(programObject3D, "lights[" + lightCount + "].type", 1);
        uniformi(programObject3D, "lightCount", ++lightCount);
      }
    };

    p.lightFalloff = function lightFalloff(constant, linear, quadratic) {
      if (p.use3DContext) {
        curContext.useProgram(programObject3D);
        uniformf(programObject3D, "falloff", [constant, linear, quadratic]);
      }
    };

    p.lightSpecular = function lightSpecular(r, g, b) {
      if (p.use3DContext) {
        curContext.useProgram(programObject3D);
        uniformf(programObject3D, "specular", [r / 255, g / 255, b / 255]);
      }
    };

    /*
      Sets the default ambient light, directional light,
      falloff, and specular values. P5 Documentation says specular()
      is set, but the code calls lightSpecular().
    */
    p.lights = function lights() {
      p.ambientLight(128, 128, 128);
      p.directionalLight(128, 128, 128, 0, 0, -1);
      p.lightFalloff(1, 0, 0);
      p.lightSpecular(0, 0, 0);
    };

    p.pointLight = function(r, g, b, x, y, z) {
      if (p.use3DContext) {
        if (lightCount === p.MAX_LIGHTS) {
          throw "can only create " + p.MAX_LIGHTS + " lights";
        }

        // place the point in view space once instead of once per vertex
        // in the shader.
        var pos = new PVector(x, y, z);
        var view = new PMatrix3D();
        view.scale(1, -1, 1);
        view.apply(modelView.array());
        view.mult(pos, pos);

        curContext.useProgram(programObject3D);
        uniformf(programObject3D, "lights[" + lightCount + "].color", [r / 255, g / 255, b / 255]);
        uniformf(programObject3D, "lights[" + lightCount + "].position", pos.array());
        uniformi(programObject3D, "lights[" + lightCount + "].type", 2);
        uniformi(programObject3D, "lightCount", ++lightCount);
      }
    };

    /*
      Disables lighting so the all shapes drawn after this
      will not be lit.
    */
    p.noLights = function noLights() {
      if (p.use3DContext) {
        lightCount = 0;
        curContext.useProgram(programObject3D);
        uniformi(programObject3D, "lightCount", lightCount);
      }
    };

    /*
      r,g,b - Color of the light
      x,y,z - position of the light in modeling space
      nx,ny,nz - direction of the spotlight
      angle - in radians
      concentration -
    */
    p.spotLight = function spotLight(r, g, b, x, y, z, nx, ny, nz, angle, concentration) {
      if (p.use3DContext) {
        if (lightCount === p.MAX_LIGHTS) {
          throw "can only create " + p.MAX_LIGHTS + " lights";
        }

        curContext.useProgram(programObject3D);

        // place the point in view space once instead of once per vertex
        // in the shader.
        var pos = new PVector(x, y, z);
        var view = new PMatrix3D();
        view.scale(1, -1, 1);
        view.apply(modelView.array());
        view.mult(pos, pos);

        // transform the spotlight's direction
        // need to find a solution for this one. Maybe manual mult?
        var dir = [nx, ny, nz, 0.0000001];
        view = new PMatrix3D();
        view.scale(1, -1, 1);
        view.apply(modelView.array());
        view.mult(dir, dir);

        uniformf(programObject3D, "lights[" + lightCount + "].color", [r / 255, g / 255, b / 255]);
        uniformf(programObject3D, "lights[" + lightCount + "].position", pos.array());
        uniformf(programObject3D, "lights[" + lightCount + "].direction", [dir[0], dir[1], dir[2]]);
        uniformf(programObject3D, "lights[" + lightCount + "].concentration", concentration);
        uniformf(programObject3D, "lights[" + lightCount + "].angle", angle);
        uniformi(programObject3D, "lights[" + lightCount + "].type", 3);
        uniformi(programObject3D, "lightCount", ++lightCount);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // Camera functions
    ////////////////////////////////////////////////////////////////////////////

    p.beginCamera = function beginCamera() {
      if (manipulatingCamera) {
        throw ("You cannot call beginCamera() again before calling endCamera()");
      } else {
        manipulatingCamera = true;
        forwardTransform = cameraInv;
        reverseTransform = cam;
      }
    };

    p.endCamera = function endCamera() {
      if (!manipulatingCamera) {
        throw ("You cannot call endCamera() before calling beginCamera()");
      } else {
        modelView.set(cam);
        modelViewInv.set(cameraInv);
        forwardTransform = modelView;
        reverseTransform = modelViewInv;
        manipulatingCamera = false;
      }
    };

    p.camera = function camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
      if (arguments.length === 0) {
        //in case canvas is resized
        cameraX = curElement.width / 2;
        cameraY = curElement.height / 2;
        cameraZ = cameraY / Math.tan(cameraFOV / 2);
        p.camera(cameraX, cameraY, cameraZ, cameraX, cameraY, 0, 0, 1, 0);
      } else {
        var z = new p.PVector(eyeX - centerX, eyeY - centerY, eyeZ - centerZ);
        var y = new p.PVector(upX, upY, upZ);
        var transX, transY, transZ;
        z.normalize();
        var x = p.PVector.cross(y, z);
        y = p.PVector.cross(z, x);
        x.normalize();
        y.normalize();

        cam.set(x.x, x.y, x.z, 0, y.x, y.y, y.z, 0, z.x, z.y, z.z, 0, 0, 0, 0, 1);

        cam.translate(-eyeX, -eyeY, -eyeZ);

        cameraInv.reset();
        cameraInv.invApply(x.x, x.y, x.z, 0, y.x, y.y, y.z, 0, z.x, z.y, z.z, 0, 0, 0, 0, 1);

        cameraInv.translate(eyeX, eyeY, eyeZ);

        modelView.set(cam);
        modelViewInv.set(cameraInv);
      }
    };

    p.perspective = function perspective(fov, aspect, near, far) {
      if (arguments.length === 0) {
        //in case canvas is resized
        cameraY = curElement.height / 2;
        cameraZ = cameraY / Math.tan(cameraFOV / 2);
        cameraNear = cameraZ / 10;
        cameraFar = cameraZ * 10;
        cameraAspect = curElement.width / curElement.height;
        p.perspective(cameraFOV, cameraAspect, cameraNear, cameraFar);
      } else {
        var a = arguments;
        var yMax, yMin, xMax, xMin;
        yMax = near * Math.tan(fov / 2);
        yMin = -yMax;
        xMax = yMax * aspect;
        xMin = yMin * aspect;
        p.frustum(xMin, xMax, yMin, yMax, near, far);
      }
    };

    p.frustum = function frustum(left, right, bottom, top, near, far) {
      frustumMode = true;
      projection = new PMatrix3D();
      projection.set((2 * near) / (right - left), 0, (right + left) / (right - left), 0, 0, (2 * near) / (top - bottom), (top + bottom) / (top - bottom), 0, 0, 0, -(far + near) / (far - near), -(2 * far * near) / (far - near), 0, 0, -1, 0);
    };

    p.ortho = function ortho(left, right, bottom, top, near, far) {
      if (arguments.length === 0) {
        p.ortho(0, p.width, 0, p.height, -10, 10);
      } else {
        var x = 2 / (right - left);
        var y = 2 / (top - bottom);
        var z = -2 / (far - near);

        var tx = -(right + left) / (right - left);
        var ty = -(top + bottom) / (top - bottom);
        var tz = -(far + near) / (far - near);

        projection = new PMatrix3D();
        projection.set(x, 0, 0, tx, 0, y, 0, ty, 0, 0, z, tz, 0, 0, 0, 1);

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

    p.box = function(w, h, d) {
      if (p.use3DContext) {
        // user can uniformly scale the box by
        // passing in only one argument.
        if (!h || !d) {
          h = d = w;
        }

        // Modeling transformation
        var model = new PMatrix3D();
        model.scale(w, h, d);

        // viewing transformation needs to have Y flipped
        // becuase that's what Processing does.
        var view = new PMatrix3D();
        view.scale(1, -1, 1);
        view.apply(modelView.array());

        curContext.useProgram(programObject3D);
        uniformMatrix(programObject3D, "model", true, model.array());
        uniformMatrix(programObject3D, "view", true, view.array());
        uniformMatrix(programObject3D, "projection", true, projection.array());

        if (doFill === true) {
          // fix stitching problems. (lines get occluded by triangles
          // since they share the same depth values). This is not entirely
          // working, but it's a start for drawing the outline. So
          // developers can start playing around with styles.
          curContext.enable(curContext.POLYGON_OFFSET_FILL);
          curContext.polygonOffset(1, 1);
          uniformf(programObject3D, "color", fillStyle);

          var v = new PMatrix3D();
          v.set(view);

          var m = new PMatrix3D();
          m.set(model);

          v.mult(m);

          var normalMatrix = new PMatrix3D();
          normalMatrix.set(v);
          normalMatrix.invert();

          uniformMatrix(programObject3D, "normalTransform", false, normalMatrix.array());

          vertexAttribPointer(programObject3D, "Vertex", 3, boxBuffer);
          vertexAttribPointer(programObject3D, "Normal", 3, boxNormBuffer);

          curContext.drawArrays(curContext.TRIANGLES, 0, boxVerts.length / 3);
          curContext.disable(curContext.POLYGON_OFFSET_FILL);
        }

        if (lineWidth > 0 && doStroke) {
          curContext.useProgram(programObject3D);
          uniformMatrix(programObject3D, "model", true, model.array());
          uniformMatrix(programObject3D, "view", true, view.array());
          uniformMatrix(programObject3D, "projection", true, projection.array());

          uniformf(programObject3D, "color", strokeStyle);
          curContext.lineWidth(lineWidth);
          vertexAttribPointer(programObject3D, "Vertex", 3, boxOutlineBuffer);
          curContext.drawArrays(curContext.LINES, 0, boxOutlineVerts.length / 3);
        }
      }
    };

    var initSphere = function() {
      var i;
      sphereVerts = [];

      for (i = 0; i < sphereDetailU; i++) {
        sphereVerts.push(0);
        sphereVerts.push(-1);
        sphereVerts.push(0);
        sphereVerts.push(sphereX[i]);
        sphereVerts.push(sphereY[i]);
        sphereVerts.push(sphereZ[i]);
      }
      sphereVerts.push(0);
      sphereVerts.push(-1);
      sphereVerts.push(0);
      sphereVerts.push(sphereX[0]);
      sphereVerts.push(sphereY[0]);
      sphereVerts.push(sphereZ[0]);

      var v1, v11, v2;

      // middle rings
      var voff = 0;
      for (i = 2; i < sphereDetailV; i++) {
        v1 = v11 = voff;
        voff += sphereDetailU;
        v2 = voff;
        for (var j = 0; j < sphereDetailU; j++) {
          sphereVerts.push(parseFloat(sphereX[v1]));
          sphereVerts.push(parseFloat(sphereY[v1]));
          sphereVerts.push(parseFloat(sphereZ[v1++]));
          sphereVerts.push(parseFloat(sphereX[v2]));
          sphereVerts.push(parseFloat(sphereY[v2]));
          sphereVerts.push(parseFloat(sphereZ[v2++]));
        }

        // close each ring
        v1 = v11;
        v2 = voff;

        sphereVerts.push(parseFloat(sphereX[v1]));
        sphereVerts.push(parseFloat(sphereY[v1]));
        sphereVerts.push(parseFloat(sphereZ[v1]));
        sphereVerts.push(parseFloat(sphereX[v2]));
        sphereVerts.push(parseFloat(sphereY[v2]));
        sphereVerts.push(parseFloat(sphereZ[v2]));
      }

      // add the northern cap
      for (i = 0; i < sphereDetailU; i++) {
        v2 = voff + i;

        sphereVerts.push(parseFloat(sphereX[v2]));
        sphereVerts.push(parseFloat(sphereY[v2]));
        sphereVerts.push(parseFloat(sphereZ[v2]));
        sphereVerts.push(0);
        sphereVerts.push(1);
        sphereVerts.push(0);
      }

      sphereVerts.push(parseFloat(sphereX[voff]));
      sphereVerts.push(parseFloat(sphereY[voff]));
      sphereVerts.push(parseFloat(sphereZ[voff]));
      sphereVerts.push(0);
      sphereVerts.push(1);
      sphereVerts.push(0);

      //set the buffer data
      curContext.bindBuffer(curContext.ARRAY_BUFFER, sphereBuffer);
      curContext.bufferData(curContext.ARRAY_BUFFER, newWebGLArray(sphereVerts), curContext.STATIC_DRAW);
    };

    p.sphereDetail = function sphereDetail(ures, vres) {
      var i;

      if (arguments.length === 1) {
        ures = vres = arguments[0];
      }

      if (ures < 3) {
        ures = 3;
      } // force a minimum res
      if (vres < 2) {
        vres = 2;
      } // force a minimum res
      // if it hasn't changed do nothing
      if ((ures === sphereDetailU) && (vres === sphereDetailV)) {
        return;
      }

      var delta = p.SINCOS_LENGTH / ures;
      var cx = new Array(ures);
      var cz = new Array(ures);
      // calc unit circle in XZ plane
      for (i = 0; i < ures; i++) {
        cx[i] = cosLUT[parseInt((i * delta) % p.SINCOS_LENGTH, 10)];
        cz[i] = sinLUT[parseInt((i * delta) % p.SINCOS_LENGTH, 10)];
      }

      // computing vertexlist
      // vertexlist starts at south pole
      var vertCount = ures * (vres - 1) + 2;
      var currVert = 0;

      // re-init arrays to store vertices
      sphereX = new Array(vertCount);
      sphereY = new Array(vertCount);
      sphereZ = new Array(vertCount);

      var angle_step = (p.SINCOS_LENGTH * 0.5) / vres;
      var angle = angle_step;

      // step along Y axis
      for (i = 1; i < vres; i++) {
        var curradius = sinLUT[parseInt(angle % p.SINCOS_LENGTH, 10)];
        var currY = -cosLUT[parseInt(angle % p.SINCOS_LENGTH, 10)];
        for (var j = 0; j < ures; j++) {
          sphereX[currVert] = cx[j] * curradius;
          sphereY[currVert] = currY;
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
      if (p.use3DContext) {
        var sRad = arguments[0], c;

        if ((sphereDetailU < 3) || (sphereDetailV < 2)) {
          p.sphereDetail(30);
        }

        // Modeling transformation
        var model = new PMatrix3D();
        model.scale(sRad, sRad, sRad);

        // viewing transformation needs to have Y flipped
        // becuase that's what Processing does.
        var view = new PMatrix3D();
        view.scale(1, -1, 1);
        view.apply(modelView.array());

        curContext.useProgram(programObject3D);

        uniformMatrix(programObject3D, "model", true, model.array());
        uniformMatrix(programObject3D, "view", true, view.array());
        uniformMatrix(programObject3D, "projection", true, projection.array());

        var v = new PMatrix3D();
        v.set(view);

        var m = new PMatrix3D();
        m.set(model);

        v.mult(m);

        var normalMatrix = new PMatrix3D();
        normalMatrix.set(v);
        normalMatrix.invert();

        uniformMatrix(programObject3D, "normalTransform", false, normalMatrix.array());

        vertexAttribPointer(programObject3D, "Vertex", 3, sphereBuffer);
        vertexAttribPointer(programObject3D, "Normal", 3, sphereBuffer);

        if (doFill === true) {
          // fix stitching problems. (lines get occluded by triangles
          // since they share the same depth values). This is not entirely
          // working, but it's a start for drawing the outline. So
          // developers can start playing around with styles.
          curContext.enable(curContext.POLYGON_OFFSET_FILL);
          curContext.polygonOffset(1, 1);

          uniformf(programObject3D, "color", fillStyle);

          curContext.drawArrays(curContext.TRIANGLE_STRIP, 0, sphereVerts.length / 3);
          curContext.disable(curContext.POLYGON_OFFSET_FILL);
        }

        if (lineWidth > 0 && doStroke) {
          curContext.useProgram(programObject3D);
          vertexAttribPointer(programObject3D, "Vertex", 3, sphereBuffer);

          uniformMatrix(programObject3D, "model", true, model.array());
          uniformMatrix(programObject3D, "view", true, view.array());
          uniformMatrix(programObject3D, "projection", true, projection.array());

          uniformf(programObject3D, "color", strokeStyle);

          curContext.lineWidth(lineWidth);
          curContext.drawArrays(curContext.LINE_STRIP, 0, sphereVerts.length / 3);
        }
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // Coordinates
    ////////////////////////////////////////////////////////////////////////////

    p.modelX = function modelX(x, y, z) {
      var mv = modelView.array();
      var ci = cameraInv.array();

      var ax = mv[0] * x + mv[1] * y + mv[2] * z + mv[3];
      var ay = mv[4] * x + mv[5] * y + mv[6] * z + mv[7];
      var az = mv[8] * x + mv[9] * y + mv[10] * z + mv[11];
      var aw = mv[12] * x + mv[13] * y + mv[14] * z + mv[15];

      var ox = ci[0] * ax + ci[1] * ay + ci[2] * az + ci[3] * aw;
      var ow = ci[12] * ax + ci[13] * ay + ci[14] * az + ci[15] * aw;

      return (ow !== 0) ? ox / ow : ox;
    };

    p.modelY = function modelY(x, y, z) {
      var mv = modelView.array();
      var ci = cameraInv.array();

      var ax = mv[0] * x + mv[1] * y + mv[2] * z + mv[3];
      var ay = mv[4] * x + mv[5] * y + mv[6] * z + mv[7];
      var az = mv[8] * x + mv[9] * y + mv[10] * z + mv[11];
      var aw = mv[12] * x + mv[13] * y + mv[14] * z + mv[15];

      var oy = ci[4] * ax + ci[5] * ay + ci[6] * az + ci[7] * aw;
      var ow = ci[12] * ax + ci[13] * ay + ci[14] * az + ci[15] * aw;

      return (ow !== 0) ? oy / ow : oy;
    };

    p.modelZ = function modelZ(x, y, z) {
      var mv = modelView.array();
      var ci = cameraInv.array();

      var ax = mv[0] * x + mv[1] * y + mv[2] * z + mv[3];
      var ay = mv[4] * x + mv[5] * y + mv[6] * z + mv[7];
      var az = mv[8] * x + mv[9] * y + mv[10] * z + mv[11];
      var aw = mv[12] * x + mv[13] * y + mv[14] * z + mv[15];

      var oz = ci[8] * ax + ci[9] * ay + ci[10] * az + ci[11] * aw;
      var ow = ci[12] * ax + ci[13] * ay + ci[14] * az + ci[15] * aw;

      return (ow !== 0) ? oz / ow : oz;
    };

    ////////////////////////////////////////////////////////////////////////////
    // Material Properties
    ////////////////////////////////////////////////////////////////////////////

    p.ambient = function ambient() {
      // create an alias to shorten code
      var a = arguments;

      // either a shade of gray or a 'color' object.
      if (p.use3DContext) {
        curContext.useProgram(programObject3D);
        uniformi(programObject3D, "usingMat", true);

        if (a.length === 1) {
          // color object was passed in
          if (typeof a[0] === "string") {
            var c = a[0].slice(5, -1).split(",");
            uniformf(programObject3D, "mat_ambient", [c[0] / 255, c[1] / 255, c[2] / 255]);
          }
          // else a single number was passed in for gray shade
          else {
            uniformf(programObject3D, "mat_ambient", [a[0] / 255, a[0] / 255, a[0] / 255]);
          }
        }
        // Otherwise three values were provided (r,g,b)
        else {
          uniformf(programObject3D, "mat_ambient", [a[0] / 255, a[1] / 255, a[2] / 255]);
        }
      }
    };

    p.emissive = function emissive() {
      // create an alias to shorten code
      var a = arguments;

      if (p.use3DContext) {
        curContext.useProgram(programObject3D);
        uniformi(programObject3D, "usingMat", true);

        // If only one argument was provided, the user either gave us a
        // shade of gray or a 'color' object.
        if (a.length === 1) {
          // color object was passed in
          if (typeof a[0] === "string") {
            var c = a[0].slice(5, -1).split(",");
            uniformf(programObject3D, "mat_emissive", [c[0] / 255, c[1] / 255, c[2] / 255]);
          }
          // else a regular number was passed in for gray shade
          else {
            uniformf(programObject3D, "mat_emissive", [a[0] / 255, a[0] / 255, a[0] / 255]);
          }
        }
        // Otherwise three values were provided (r,g,b)
        else {
          uniformf(programObject3D, "mat_emissive", [a[0] / 255, a[1] / 255, a[2] / 255]);
        }
      }
    };

    p.shininess = function shininess(shine) {
      if (p.use3DContext) {
        curContext.useProgram(programObject3D);
        uniformi(programObject3D, "usingMat", true);
        uniformf(programObject3D, "shininess", shine);
      }
    };

    /*
      Documentation says the following calls are valid, but the
      Processing throws exceptions:
      specular(gray, alpha)
      specular(v1, v2, v3, alpha)
      So we don't support them either
      <corban> I dont think this matters so much, let us let color handle it. alpha values are not sent anyways.
    */
    p.specular = function specular() {
      var c = p.color.apply(this, arguments);

      if (p.use3DContext) {
        curContext.useProgram(programObject3D);
        uniformi(programObject3D, "usingMat", true);
        uniformf(programObject3D, "mat_specular", p.color.toGLArray(c).slice(0, 3));
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // Coordinates
    ////////////////////////////////////////////////////////////////////////////
    p.screenX = function screenX( x, y, z ) {
      var mv = modelView.array();
      var pj = projection.array();

      var ax = mv[ 0]*x + mv[ 1]*y + mv[ 2]*z + mv[ 3];
      var ay = mv[ 4]*x + mv[ 5]*y + mv[ 6]*z + mv[ 7];
      var az = mv[ 8]*x + mv[ 9]*y + mv[10]*z + mv[11];
      var aw = mv[12]*x + mv[13]*y + mv[14]*z + mv[15];

      var ox = pj[ 0]*ax + pj[ 1]*ay + pj[ 2]*az + pj[ 3]*aw;
      var ow = pj[12]*ax + pj[13]*ay + pj[14]*az + pj[15]*aw;

      if ( ow !== 0 ){
        ox /= ow;
      }
      return p.width * ( 1 + ox ) / 2.0;
    };

    p.screenY = function screenY( x, y, z ) {
      var mv = modelView.array();
      var pj = projection.array();

      var ax = mv[ 0]*x + mv[ 1]*y + mv[ 2]*z + mv[ 3];
      var ay = mv[ 4]*x + mv[ 5]*y + mv[ 6]*z + mv[ 7];
      var az = mv[ 8]*x + mv[ 9]*y + mv[10]*z + mv[11];
      var aw = mv[12]*x + mv[13]*y + mv[14]*z + mv[15];

      var oy = pj[ 4]*ax + pj[ 5]*ay + pj[ 6]*az + pj[ 7]*aw;
      var ow = pj[12]*ax + pj[13]*ay + pj[14]*az + pj[15]*aw;

      if ( ow !== 0 ){
        oy /= ow;
      }
      return p.height * ( 1 + oy ) / 2.0;
    };

    p.screenZ = function screenZ( x, y, z ) {
      var mv = modelView.array();
      var pj = projection.array();

      var ax = mv[ 0]*x + mv[ 1]*y + mv[ 2]*z + mv[ 3];
      var ay = mv[ 4]*x + mv[ 5]*y + mv[ 6]*z + mv[ 7];
      var az = mv[ 8]*x + mv[ 9]*y + mv[10]*z + mv[11];
      var aw = mv[12]*x + mv[13]*y + mv[14]*z + mv[15];

      var oz = pj[ 8]*ax + pj[ 9]*ay + pj[10]*az + pj[11]*aw;
      var ow = pj[12]*ax + pj[13]*ay + pj[14]*az + pj[15]*aw;

      if ( ow !== 0 ) {
        oz /= ow;
      }
      return ( oz + 1 ) / 2.0;
    };

    ////////////////////////////////////////////////////////////////////////////
    // Style functions
    ////////////////////////////////////////////////////////////////////////////

    p.fill = function fill() {
      doFill = true;
      var color = p.color(arguments[0], arguments[1], arguments[2], arguments[3]);

      if (p.use3DContext) {
        fillStyle = p.color.toGLArray(color);
      } else {
        curContext.fillStyle = p.color.toString(color);
      }
    };

    p.noFill = function noFill() {
      doFill = false;
    };

    p.stroke = function stroke() {
      doStroke = true;
      var color = p.color(arguments[0], arguments[1], arguments[2], arguments[3]);

      if (p.use3DContext) {
        strokeStyle = p.color.toGLArray(color);
      } else {
        curContext.strokeStyle = p.color.toString(color);
      }
    };

    p.noStroke = function noStroke() {
      doStroke = false;
    };

    p.strokeWeight = function strokeWeight(w) {
      if (p.use3DContext) {
        lineWidth = w;
      } else {
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
      if (!p.use3DContext) {
        curElement.style.setProperty("image-rendering", "optimizeQuality", "important");
        curContext.mozImageSmoothingEnabled = true;
      }
    };

    p.noSmooth = function() {
      if (!p.use3DContext) {
        curElement.style.setProperty("image-rendering", "optimizeSpeed", "important");
        curContext.mozImageSmoothingEnabled = false;
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // Vector drawing functions
    ////////////////////////////////////////////////////////////////////////////

    p.Point = function Point(x, y) {
      this.x = x;
      this.y = y;
      this.copy = function() {
        return new Point(x, y);
      };
    };

    p.point = function point(x, y, z) {
      if (p.use3DContext) {
        var model = new PMatrix3D();

        // move point to position
        model.translate(x, y, z || 0);

        var view = new PMatrix3D();
        view.scale(1, -1, 1);
        view.apply(modelView.array());

        curContext.useProgram(programObject2D);
        uniformMatrix(programObject2D, "model", true, model.array());
        uniformMatrix(programObject2D, "view", true, view.array());
        uniformMatrix(programObject2D, "projection", true, projection.array());

        if (lineWidth > 0 && doStroke) {
          // this will be replaced with the new bit shifting color code
          uniformf(programObject2D, "color", strokeStyle);

          vertexAttribPointer(programObject2D, "Vertex", 3, pointBuffer);
          curContext.drawArrays(curContext.POINTS, 0, 1);
        }
      } else {
        if (doStroke) {
          var oldFill = curContext.fillStyle;
          curContext.fillStyle = curContext.strokeStyle;
          curContext.fillRect(Math.round(x), Math.round(y), 1, 1);
          curContext.fillStyle = oldFill;
        }
      }
    };

    p.beginShape = function beginShape(type) {
      curShape = type;
      curShapeCount = 0;
      curvePoints = [];
      //textureImage = null;
      vertArray = [];
      if(p.use3DContext)
      {
        //normalMode = NORMAL_MODE_AUTO;
      }
    };

    p.vertex = function vertex() {
      if(firstVert){ firstVert = false; }
      var vert = [];
      if(arguments.length === 4){ //x, y, u, v
        vert[0] = arguments[0];
        vert[1] = arguments[1];
        vert[2] = 0;
        vert[3] = arguments[2];
        vert[4] = arguments[3];
      }
      else{ // x, y, z, u, v
        vert[0] = arguments[0];
        vert[1] = arguments[1];
        vert[2] = arguments[2] || 0;
        vert[3] = arguments[3] || 0;
        vert[4] = arguments[4] || 0;
      }
      // fill rgba
      vert[5] = fillStyle[0];
      vert[6] = fillStyle[1];
      vert[7] = fillStyle[2];
      vert[8] = fillStyle[3];
      // stroke rgba
      vert[9] = strokeStyle[0];
      vert[10] = strokeStyle[1];
      vert[11] = strokeStyle[2];
      vert[12] = strokeStyle[3];
      //normals
      vert[13] = normalX;
      vert[14] = normalY;
      vert[15] = normalZ;

      vertArray.push(vert);
    };

    var point2D = function point2D(vArray){
      var model = new PMatrix3D();
      var view = new PMatrix3D();
      view.scale(1, -1, 1);
      view.apply(modelView.array());

      curContext.useProgram(programObject2D);
      uniformMatrix(programObject2D, "model", true, model.array());
      uniformMatrix(programObject2D, "view", true, view.array());
      uniformMatrix(programObject2D, "projection", true, projection.array());

      uniformf(programObject2D, "color", strokeStyle);
      vertexAttribPointer(programObject2D, "Vertex", 3, pointBuffer);
      curContext.bufferData(curContext.ARRAY_BUFFER, newWebGLArray(vArray), curContext.STREAM_DRAW);
      curContext.drawArrays(curContext.POINTS, 0, vArray.length/3);
    };

    var line2D = function line2D(vArray, mode){
      var ctxMode;
      if (mode === "LINES"){
        ctxMode = curContext.LINES;
      }
      else if(mode === "LINE_LOOP"){
        ctxMode = curContext.LINE_LOOP;
      }
      else{
        ctxMode = curContext.LINE_STRIP;
      }
      var model = new PMatrix3D();
      var view = new PMatrix3D();
      view.scale(1, -1, 1);
      view.apply(modelView.array());

      curContext.useProgram(programObject2D);
      uniformMatrix(programObject2D, "model", true, model.array());
      uniformMatrix(programObject2D, "view", true, view.array());
      uniformMatrix(programObject2D, "projection", true, projection.array());

      uniformf(programObject2D, "color", strokeStyle);
      vertexAttribPointer(programObject2D, "Vertex", 3, lineBuffer);
      curContext.bufferData(curContext.ARRAY_BUFFER, newWebGLArray(vArray), curContext.STREAM_DRAW);
      curContext.drawArrays(ctxMode, 0, vArray.length/3);
    };

    var fill2D = function fill2D(vArray, mode){
      var ctxMode;
      if(mode === "TRIANGLES"){
        ctxMode = curContext.TRIANGLES;
      }
      else if(mode === "TRIANGLE_FAN"){
        ctxMode = curContext.TRIANGLE_FAN;
      }
      else{
        ctxMode = curContext.TRIANGLE_STRIP;
      }

      var model = new PMatrix3D();
      var view = new PMatrix3D();
      view.scale(1, -1, 1);
      view.apply(modelView.array());

      curContext.useProgram( programObject2D );
      uniformMatrix( programObject2D, "model", true,  model.array() );
      uniformMatrix( programObject2D, "view", true, view.array() );
      uniformMatrix( programObject2D, "projection", true, projection.array() );

      curContext.enable( curContext.POLYGON_OFFSET_FILL );
      curContext.polygonOffset( 1, 1 );
      uniformf( programObject2D, "color", fillStyle);

      vertexAttribPointer(programObject2D, "Vertex", 3, fillBuffer);
      curContext.bufferData(curContext.ARRAY_BUFFER, newWebGLArray(vArray), curContext.STREAM_DRAW);

      curContext.drawArrays( ctxMode, 0, vArray.length/3 );
      curContext.disable( curContext.POLYGON_OFFSET_FILL );
    };

    p.endShape = function endShape(close){
      firstVert = true;
      var i, j, k;
      var last = vertArray.length - 1;
      if(!close){
        p.CLOSE = false;
      }
      else{
        p.CLOSE = true;
      }
      if(isCurve && curShape === p.POLYGON || isCurve && curShape === undefined){
        if(vertArray.length > 3){
          if(p.use3DContext){
          }
          else{
            var b = [],
                s = 1 - curTightness;
            curContext.beginPath();
            curContext.moveTo(vertArray[1][0], vertArray[1][1]);
              /*
              * Matrix to convert from Catmull-Rom to cubic Bezier
              * where t = curTightness
              * |0         1          0         0       |
              * |(t-1)/6   1          (1-t)/6   0       |
              * |0         (1-t)/6    1         (t-1)/6 |
              * |0         0          0         0       |
              */
            for(i = 1; (i+2) < vertArray.length; i++){
              b[0] = [vertArray[i][0], vertArray[i][1]];
              b[1] = [vertArray[i][0] + (s * vertArray[i+1][0] - s * vertArray[i-1][0]) / 6, vertArray[i][1] + (s * vertArray[i+1][1] - s * vertArray[i-1][1]) / 6];
              b[2] = [vertArray[i+1][0] + (s * vertArray[i][0] - s * vertArray[i+2][0]) / 6, vertArray[i+1][1] + (s * vertArray[i][1] - s * vertArray[i+2][1]) / 6];
              b[3] = [vertArray[i+1][0], vertArray[i+1][1]];
              curContext.bezierCurveTo(b[1][0], b[1][1], b[2][0], b[2][1], b[3][0], b[3][1]);
            }
            if(doFill){
              curContext.fill();
            }
            if(doStroke){
              curContext.stroke();
            }
            curContext.closePath();
          }
        }
      }
      else if(isBezier && curShape === p.POLYGON || isBezier && curShape === undefined){
        curContext.beginPath();
        curContext.moveTo(vertArray[0][0], vertArray[0][1]);
        for(i = 1; i < vertArray.length; i++){
          curContext.bezierCurveTo(vertArray[i][0], vertArray[i][1], vertArray[i][2], vertArray[i][3], vertArray[i][4], vertArray[i][5]);
        }
        if(doFill){
          curContext.fill();
        }
        if(doStroke){
          curContext.stroke();
        }
        curContext.closePath();
      }
      else{
        if(p.use3DContext){ // 3D context
          var lineVertArray = [];
          var fillVertArray = [];
          for(i = 0; i < vertArray.length; i++){
            for(j = 0; j < 3; j++){
              fillVertArray.push(vertArray[i][j]);
            }
          }

          fillVertArray.push(vertArray[0][0]);
          fillVertArray.push(vertArray[0][1]);
          fillVertArray.push(vertArray[0][2]);

          if (curShape === p.POINTS){
            for(i = 0; i < vertArray.length; i++){
              for(j = 0; j < 3; j++){
                lineVertArray.push(vertArray[i][j]);
              }
            }
            point2D(lineVertArray);
          }
          else if(curShape === p.LINES){
            for(i = 0; i < vertArray.length; i++){
              for(j = 0; j < 3; j++){
                lineVertArray.push(vertArray[i][j]);
              }
            }
            line2D(lineVertArray, "LINES");
          }
          else if(curShape === p.TRIANGLES){
            if(vertArray.length > 2){
              for(i = 0; (i+2) < vertArray.length; i+=3){
                fillVertArray = [];
                lineVertArray = [];
                for(j = 0; j < 3; j++){
                  for(k = 0; k < 3; k++){
                    lineVertArray.push(vertArray[i+j][k]);
                    fillVertArray.push(vertArray[i+j][k]);
                  }
                }
                if(doStroke){
                  line2D(lineVertArray, "LINE_LOOP");
                }
                if(doFill){
                  fill2D(fillVertArray, "TRIANGLES");
                }
              }
            }
          }
          else if(curShape === p.TRIANGLE_STRIP){
            if(vertArray.length > 2){
              for(i = 0; (i+2) < vertArray.length; i++){
                lineVertArray = [];
                fillVertArray = [];
                for(j = 0; j < 3; j++){
                  for(k = 0; k < 3; k++){
                    lineVertArray.push(vertArray[i+j][k]);
                    fillVertArray.push(vertArray[i+j][k]);
                  }
                }
                if(doFill){
                  fill2D(fillVertArray);
                }
                if(doStroke){
                  line2D(lineVertArray, "LINE_LOOP");
                }
              }
            }
          }
          else if(curShape === p.TRIANGLE_FAN){
            if(vertArray.length > 2){
              for(i = 0; i < 3; i++){
                for(j = 0; j < 3; j++){
                  lineVertArray.push(vertArray[i][j]);
                }
              }
              if(doStroke){
                line2D(lineVertArray, "LINE_LOOP");
              }
              for(i = 2; (i+1) < vertArray.length; i++){
                lineVertArray = [];
                lineVertArray.push(vertArray[0][0]);
                lineVertArray.push(vertArray[0][1]);
                lineVertArray.push(vertArray[0][2]);
                for(j = 0; j < 2; j++){
                  for(k = 0; k < 3; k++){
                    lineVertArray.push(vertArray[i+j][k]);
                  }
                }
                if(doStroke){
                  line2D(lineVertArray, "LINE_STRIP");
                }
              }
              if(doFill){
                fill2D(fillVertArray, "TRIANGLE_FAN");
              }
            }
          }
          else if(curShape === p.QUADS){
            for(i = 0; (i + 3) < vertArray.length; i+=4){
              lineVertArray = [];
              for(j = 0; j < 4; j++){
                for(k = 0; k < 3; k++){
                  lineVertArray.push(vertArray[i+j][k]);
                }
              }
              if(doStroke){
                line2D(lineVertArray, "LINE_LOOP");
              }

              if(doFill){
                fillVertArray = [];
                for(j = 0; j < 3; j++){
                  fillVertArray.push(vertArray[i][j]);
                }
                for(j = 0; j < 3; j++){
                  fillVertArray.push(vertArray[i+1][j]);
                }
                for(j = 0; j < 3; j++){
                  fillVertArray.push(vertArray[i+3][j]);
                }
                for(j = 0; j < 3; j++){
                  fillVertArray.push(vertArray[i+2][j]);
                }
                fill2D(fillVertArray, "TRIANGLE_STRIP");
              }
            }
          }
          else if(curShape === p.QUAD_STRIP){
            var tempArray = [];
            if(vertArray.length > 3){
              for(i = 0; i < 2; i++){
                for(j = 0; j < 3; j++){
                  lineVertArray.push(vertArray[i][j]);
                }
              }
              line2D(lineVertArray, "LINE_STRIP");
              if(vertArray.length > 4 && vertArray.length % 2 > 0){
                tempArray = fillVertArray.splice(fillVertArray.length - 6);
                vertArray.pop();
              }
              for(i = 0; (i+3) < vertArray.length; i+=2){
                lineVertArray = [];
                for(j = 0; j < 3; j++){
                  lineVertArray.push(vertArray[i+1][j]);
                }
                for(j = 0; j < 3; j++){
                  lineVertArray.push(vertArray[i+3][j]);
                }
                for(j = 0; j < 3; j++){
                  lineVertArray.push(vertArray[i+2][j]);
                }
                for(j = 0; j < 3; j++){
                  lineVertArray.push(vertArray[i+0][j]);
                }
                line2D(lineVertArray, "LINE_STRIP");
              }
              if(doFill){
                fill2D(fillVertArray);
              }
            }
          }
          else{
            if(vertArray.length === 1){
              for(j = 0; j < 3; j++){
                lineVertArray.push(vertArray[0][j]);
              }
              point2D(lineVertArray);
            }
            else{
              for(i = 0; i < vertArray.length; i++){
                for(j = 0; j < 3; j++){
                  lineVertArray.push(vertArray[i][j]);
                }
              }
              if(p.CLOSE){
                line2D(lineVertArray, "LINE_LOOP");
              }
              else{
                line2D(lineVertArray, "LINE_STRIP");
              }
              if(doFill){
                fill2D(fillVertArray);
              }
            }
          }
        }
        // 2D context
        else{
          if (curShape === p.POINTS){
            for(i = 0; i < vertArray.length; i++){
              p.point(vertArray[i][0], vertArray[i][1]);
            }
          }
          else if(curShape === p.LINES){
            for(i = 0; (i + 1) < vertArray.length; i+=2){
              p.line(vertArray[i][0], vertArray[i][1], vertArray[i+1][0], vertArray[i+1][1]);
            }
          }
          else if(curShape === p.TRIANGLES){
            for(i = 0; (i + 2) < vertArray.length; i+=3){
              curContext.beginPath();
              curContext.moveTo(vertArray[i][0], vertArray[i][1]);
              curContext.lineTo(vertArray[i+1][0], vertArray[i+1][1]);
              curContext.lineTo(vertArray[i+2][0], vertArray[i+2][1]);
              curContext.lineTo(vertArray[i][0], vertArray[i][1]);
              if(doFill){
                curContext.fill();
              }
              if(doStroke){
                curContext.stroke();
              }
              curContext.closePath();
            }
          }
          else if(curShape === p.TRIANGLE_STRIP){
            if(vertArray.length > 2){
              curContext.beginPath();
              curContext.moveTo(vertArray[0][0], vertArray[0][1]);
              curContext.lineTo(vertArray[1][0], vertArray[1][1]);
              for(i = 2; i < vertArray.length; i++){
                curContext.lineTo(vertArray[i][0], vertArray[i][1]);
                curContext.lineTo(vertArray[i-2][0], vertArray[i-2][1]);
                if(doFill){
                  curContext.fill();
                }
                if(doStroke){
                  curContext.stroke();
                }
                curContext.moveTo(vertArray[i][0],vertArray[i][1]);
              }
            }
          }
          else if(curShape === p.TRIANGLE_FAN){
            if(vertArray.length > 2){
              curContext.beginPath();
              curContext.moveTo(vertArray[0][0], vertArray[0][1]);
              curContext.lineTo(vertArray[1][0], vertArray[1][1]);
              curContext.lineTo(vertArray[2][0], vertArray[2][1]);
              if(doFill){
                  curContext.fill();
                }
              if(doStroke){
                  curContext.stroke();
                }
              for(i = 3; i < vertArray.length; i++){
                curContext.moveTo(vertArray[0][0], vertArray[0][1]);
                curContext.lineTo(vertArray[i-1][0], vertArray[i-1][1]);
                curContext.lineTo(vertArray[i][0], vertArray[i][1]);
                if(doFill){
                  curContext.fill();
                }
                if(doStroke){
                  curContext.stroke();
                }
              }
            }
          }
          else if(curShape === p.QUADS){
            for(i = 0; (i + 3) < vertArray.length; i+=4){
              curContext.beginPath();
              curContext.moveTo(vertArray[i][0], vertArray[i][1]);
              for(j = 1; j < 4; j++){
                curContext.lineTo(vertArray[i+j][0], vertArray[i+j][1]);
              }
              curContext.lineTo(vertArray[i][0], vertArray[i][1]);
              if(doFill){
                curContext.fill();
              }
              if(doStroke){
                curContext.stroke();
              }
              curContext.closePath();
            }
          }
          else if(curShape === p.QUAD_STRIP){
            if(vertArray.length > 3){
              curContext.beginPath();
              curContext.moveTo(vertArray[0][0], vertArray[0][1]);
              curContext.lineTo(vertArray[1][0], vertArray[1][1]);
              for(i = 2; (i+1) < vertArray.length; i++){
                if((i % 2) === 0){
                  curContext.moveTo(vertArray[i-2][0], vertArray[i-2][1]);
                  curContext.lineTo(vertArray[i][0], vertArray[i][1]);
                  curContext.lineTo(vertArray[i+1][0], vertArray[i+1][1]);
                  curContext.lineTo(vertArray[i-1][0], vertArray[i-1][1]);
                  if(doFill){
                    curContext.fill();
                  }
                  if(doStroke){
                    curContext.stroke();
                  }
                }
              }
            }
          }
          else{
            curContext.beginPath();
            curContext.moveTo(vertArray[0][0], vertArray[0][1]);
            for(i = 1; i < vertArray.length; i++){
              curContext.lineTo(vertArray[i][0], vertArray[i][1]);
            }
            if(p.CLOSE){
              curContext.lineTo(vertArray[0][0], vertArray[0][1]);
            }
            if(doFill){
              curContext.fill();
            }
            if(doStroke){
              curContext.stroke();
            }
          }
          curContext.closePath();
        }
      }
      isCurve = false;
      isBezier = false;
    };

    p.bezierVertex = function(){
      isBezier = true;
      var vert = [];
      if(firstVert){
        throw ("vertex() must be used at least once before calling bezierVertex()");
      }
      else{
        if(arguments.length === 6){
          for(var i = 0; i < arguments.length; i++){ vert[i] = arguments[i]; }
        }
        else{ //for 9 arguments (3d)
        }
        vertArray.push(vert);
      }
    };

    p.curveVertex = function(x, y, z) {
      isCurve = true;
      p.vertex(x, y, z);
    };

    p.curveVertexSegment = function(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4) {
      var x0 = x2;
      var y0 = y2;
      var z0 = z2;

      var draw = curveDrawMatrix.array();

      var xplot1 = draw[4] * x1 + draw[5] * x2 + draw[6] * x3 + draw[7] * x4;
      var xplot2 = draw[8] * x1 + draw[9] * x2 + draw[10] * x3 + draw[11] * x4;
      var xplot3 = draw[12] * x1 + draw[13] * x2 + draw[14] * x3 + draw[15] * x4;

      var yplot1 = draw[4] * y1 + draw[5] * y2 + draw[6] * y3 + draw[7] * y4;
      var yplot2 = draw[8] * y1 + draw[9] * y2 + draw[10] * y3 + draw[11] * y4;
      var yplot3 = draw[12] * y1 + draw[13] * y2 + draw[14] * y3 + draw[15] * y4;

      var zplot1 = draw[4] * z1 + draw[5] * z2 + draw[6] * z3 + draw[7] * z4;
      var zplot2 = draw[8] * z1 + draw[9] * z2 + draw[10] * z3 + draw[11] * z4;
      var zplot3 = draw[12] * z1 + draw[13] * z2 + draw[14] * z3 + draw[15] * z4;

      p.vertex(x0, y0, z0);
      for (var j = 0; j < curveDetail; j++) {
        x0 += xplot1;
        xplot1 += xplot2;
        xplot2 += xplot3;
        y0 += yplot1;
        yplot1 += yplot2;
        yplot2 += yplot3;
        z0 += zplot1;
        zplot1 += zplot2;
        zplot2 += zplot3;
        p.vertex(x0, y0, z0);
      }
    };

    p.curve = function curve() {
      if (arguments.length === 8) // curve(x1, y1, x2, y2, x3, y3, x4, y4)
      {
        p.beginShape();
        p.curveVertex(arguments[0], arguments[1]);
        p.curveVertex(arguments[2], arguments[3]);
        p.curveVertex(arguments[4], arguments[5]);
        p.curveVertex(arguments[6], arguments[7]);
        p.endShape();
      } else { // curve( x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4);
        if (p.use3DContext) {
          p.beginShape();
          p.curveVertex(arguments[0], arguments[1], arguments[2]);
          p.curveVertex(arguments[3], arguments[4], arguments[5]);
          p.curveVertex(arguments[6], arguments[7], arguments[8]);
          p.curveVertex(arguments[9], arguments[10], arguments[11]);
          p.endShape();
        }
      }
    };

    p.curveTightness = function(tightness) {
      curTightness = tightness;
    };

    //used by both curveDetail and bezierDetail
    var splineForward = function(segments, matrix) {
      var f = 1.0 / segments;
      var ff = f * f;
      var fff = ff * f;

      matrix.set(0, 0, 0, 1, fff, ff, f, 0, 6 * fff, 2 * ff, 0, 0, 6 * fff, 0, 0, 0);
    };

    //internal curveInit
    //used by curveDetail, curveTightness
    var curveInit = function() {
      // allocate only if/when used to save startup time
      if (!curveDrawMatrix) {
        curveBasisMatrix = new PMatrix3D();
        curveDrawMatrix = new PMatrix3D();
        curveInited = true;
      }

      var s = curTightness;
      curveBasisMatrix.set(((s - 1) / 2).toFixed(2), ((s + 3) / 2).toFixed(2), ((-3 - s) / 2).toFixed(2), ((1 - s) / 2).toFixed(2), (1 - s), ((-5 - s) / 2).toFixed(2), (s + 2), ((s - 1) / 2).toFixed(2), ((s - 1) / 2).toFixed(2), 0, ((1 - s) / 2).toFixed(2), 0, 0, 1, 0, 0);

      splineForward(curveDetail, curveDrawMatrix);

      if (!bezierBasisInverse) {
        //bezierBasisInverse = bezierBasisMatrix.get();
        //bezierBasisInverse.invert();
        curveToBezierMatrix = new PMatrix3D();
      }

      // TODO only needed for PGraphicsJava2D? if so, move it there
      // actually, it's generally useful for other renderers, so keep it
      // or hide the implementation elsewhere.
      curveToBezierMatrix.set(curveBasisMatrix);
      curveToBezierMatrix.preApply(bezierBasisInverse);

      // multiply the basis and forward diff matrices together
      // saves much time since this needn't be done for each curve
      curveDrawMatrix.apply(curveBasisMatrix);
    };

    p.curveDetail = function curveDetail() {
      curveDetail = arguments[0];
      curveInit();
    };

    p.rectMode = function rectMode(aRectMode) {
      curRectMode = aRectMode;
    };

    p.imageMode = function(mode) {
      switch (mode) {
      case p.CORNER:
        imageModeConvert = imageModeCorner;
        break;
      case p.CORNERS:
        imageModeConvert = imageModeCorners;
        break;
      case p.CENTER:
        imageModeConvert = imageModeCenter;
        break;
      default:
        throw "Invalid imageMode";
      }
    };

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
        if (arguments.length === 6) {
          x1 = arguments[0];
          y1 = arguments[1];
          z1 = arguments[2];
          x2 = arguments[3];
          y2 = arguments[4];
          z2 = arguments[5];
        } else if (arguments.length === 4) {
          x1 = arguments[0];
          y1 = arguments[1];
          z1 = 0;
          x2 = arguments[2];
          y2 = arguments[3];
          z2 = 0;
        }

        var lineVerts = [x1, y1, z1, x2, y2, z2];

        var model = new PMatrix3D();
        //model.scale(w, h, d);
        var view = new PMatrix3D();
        view.scale(1, -1, 1);
        view.apply(modelView.array());

        curContext.useProgram(programObject2D);
        uniformMatrix(programObject2D, "model", true, model.array());
        uniformMatrix(programObject2D, "view", true, view.array());
        uniformMatrix(programObject2D, "projection", true, projection.array());

        if (lineWidth > 0 && doStroke) {
          curContext.useProgram(programObject2D);

          uniformf(programObject2D, "color", strokeStyle);

          curContext.lineWidth(lineWidth);

          vertexAttribPointer(programObject2D, "Vertex", 3, lineBuffer);
          curContext.bufferData(curContext.ARRAY_BUFFER, newWebGLArray(lineVerts), curContext.STREAM_DRAW);
          curContext.drawArrays(curContext.LINES, 0, 2);
        }
      } else {
        x1 = arguments[0];
        y1 = arguments[1];
        x2 = arguments[2];
        y2 = arguments[3];

        if (doStroke) {
          curContext.beginPath();
          curContext.moveTo(x1 || 0, y1 || 0);
          curContext.lineTo(x2 || 0, y2 || 0);
          curContext.stroke();
          curContext.closePath();
        }
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
      return (3 * t * t * (-a + 3 * b - 3 * c + d) + 6 * t * (a - 2 * b + c) + 3 * (-a + b));
    };

    p.curvePoint = function curvePoint(a, b, c, d, t) {
      return 0.5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
    };

    p.curveTangent = function curveTangent(a, b, c, d, t) {
      return 0.5 * ((-a + c) + 2 * (2 * a - 5 * b + 4 * c - d) * t + 3 * (-a + 3 * b - 3 * c + d) * t * t);
    };

    p.triangle = function triangle(x1, y1, x2, y2, x3, y3) {
      p.beginShape(p.TRIANGLES);
      p.vertex(x1, y1, 0);
      p.vertex(x2, y2, 0);
      p.vertex(x3, y3, 0);
      p.endShape();
    };

    p.quad = function quad(x1, y1, x2, y2, x3, y3, x4, y4) {
      p.beginShape(p.QUADS);
      p.vertex(x1, y1, 0);
      p.vertex(x2, y2, 0);
      p.vertex(x3, y3, 0);
      p.vertex(x4, y4, 0);
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

      if (curEllipseMode === p.CORNERS) {
        width = width - x;
        height = height - y;
      }

      if (curEllipseMode === p.CORNER || curEllipseMode === p.CORNERS) {
        x += width / 2;
        y += height / 2;
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

        // TODO: Audit
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

    p.normal = function normal(nx, ny, nz) {
      if (arguments.length !== 3 || !(typeof nx === "number" && typeof ny === "number" && typeof nz === "number")) {
        throw "normal() requires three numeric arguments.";
      }

      normalX = nx;
      normalY = ny;
      normalZ = nz;

      if (curShape !== 0) {
        if (normalMode === p.NORMAL_MODE_AUTO) {
          normalMode = p.NORMAL_MODE_SHAPE;
        } else if (normalMode === p.NORMAL_MODE_SHAPE) {
          normalMode = p.NORMAL_MODE_VERTEX;
        }
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // Raster drawing functions
    ////////////////////////////////////////////////////////////////////////////

    // TODO: function incomplete
    p.save = function save(file) {};

    var Temporary2DContext = document.createElement('canvas').getContext('2d');

    var PImage = function PImage(aWidth, aHeight, aFormat) {
      this.get = function(x, y, w, h) {
        if (!arguments.length) {
          return p.get(this);
        } else if (arguments.length === 2) {
          return p.get(x, y, this);
        } else if (arguments.length === 4) {
          return p.get(x, y, w, h, this);
        }
      };

      this.set = function(x, y, c) {
        p.set(x, y, c, this);
      };

      this.blend = function(srcImg, x, y, width, height, dx, dy, dwidth, dheight, MODE) {
        if (arguments.length === 9) {
          p.blend(this, srcImg, x, y, width, height, dx, dy, dwidth, dheight, this);
        } else if (arguments.length === 10) {
          p.blend(srcImg, x, y, width, height, dx, dy, dwidth, dheight, MODE, this);
        }
      };

      this.copy = function(srcImg, sx, sy, swidth, sheight, dx, dy, dwidth, dheight) {
        if (arguments.length === 8) {
          p.blend(this, srcImg, sx, sy, swidth, sheight, dx, dy, dwidth, p.REPLACE, this);
        } else if (arguments.length === 9) {
          p.blend(srcImg, sx, sy, swidth, sheight, dx, dy, dwidth, dheight, p.REPLACE, this);
        }
      };

      this.resize = function(w, h) {
        if (this.width !== 0 || this.height !== 0) {
          // make aspect ratio if w or h is 0
          if (w === 0 && h !== 0) {
            w = this.width / this.height * h;
          } else if (h === 0 && w !== 0) {
            h = w / (this.width / this.height);
          }
          // put 'this.imageData' into a new canvas
          var canvas = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;
          // changed for 0.9 slightly this one line
          canvas.getContext('2d').putImageData(this.imageData, 0, 0);
          // pass new canvas to drawimage with w,h
          var canvasResized = document.createElement('canvas');
          canvasResized.width = w;
          canvasResized.height = h;
          canvasResized.getContext('2d').drawImage(canvas, 0, 0, w, h);
          // pull imageData object out of canvas into ImageData object
          var imageData = canvasResized.getContext('2d').getImageData(0, 0, w, h);
          // set this as new pimage
          this.fromImageData(imageData);
        }
      };

      this.mask = function(mask) {
        this._mask = undefined;

        if (mask instanceof PImage) {
          if (mask.width === this.width && mask.height === this.height) {
            this._mask = mask;
          } else {
            throw "mask must have the same dimensions as PImage.";
          }
        } else if (typeof mask === "object" && mask.constructor === Array) { // this is a pixel array
          // mask pixel array needs to be the same length as this.pixels
          // how do we update this for 0.9 this.imageData holding pixels ^^
          // mask.constructor ? and this.pixels.length = this.imageData.data.length instead ?
          if (this.pixels.length === mask.length) {
            this._mask = mask;
          } else {
            throw "mask array must be the same length as PImage pixels array.";
          }
        }
      };

      // handle the sketch code for pixels[] and pixels.length
      // parser code converts pixels[] to getPixels()
      // or setPixels(), .length becomes getLength()
      this.pixels = {
        getLength: (function(aImg) {
          return function() {
            return aImg.imageData.data.length ? aImg.imageData.data.length/4 : 0;
          };
        }(this)),
        getPixel: (function(aImg) {
          return function(i) {
            var offset = i*4;
            return p.color.toInt(aImg.imageData.data[offset], aImg.imageData.data[offset+1],
                                 aImg.imageData.data[offset+2], aImg.imageData.data[offset+3]);
          };
        }(this)),
        setPixel: (function(aImg) {
          return function(i,c) {
            if(c && typeof c === "number") {
              var offset = i*4;
              // split c into array
              var c2 = p.color.toArray(c);
              // change pixel to c
              aImg.imageData.data[offset] = c2[0];
              aImg.imageData.data[offset+1] = c2[1];
              aImg.imageData.data[offset+2] = c2[2];
              aImg.imageData.data[offset+3] = c2[3];
            }
          };
        }(this))
      };

      // These are intentionally left blank for PImages, we work live with pixels and draw as necessary
      this.loadPixels = function() {};

      this.updatePixels = function() {};

      this.toImageData = function() {
        // changed for 0.9
        var canvas = document.createElement('canvas');
        canvas.height = this.height;
        canvas.width = this.width;
        var ctx = canvas.getContext('2d');
        ctx.putImageData(this.imageData, 0, 0);
        return ctx.getImageData(0, 0, this.width, this.height);
      };

      this.toDataURL = function() {
        var canvas = document.createElement('canvas');
        canvas.height = this.height;
        canvas.width = this.width;
        var ctx = canvas.getContext('2d');
        var imgData = ctx.createImageData(this.width, this.height);
        // changed for 0.9
        ctx.putImageData(this.imageData, 0, 0);
        return canvas.toDataURL();
      };

      this.fromImageData = function(canvasImg) {
        this.width = canvasImg.width;
        this.height = canvasImg.height;
        this.imageData = canvasImg;
        // changed for 0.9
        this.format = p.ARGB;
        // changed for 0.9
      };

      this.fromHTMLImageData = function(htmlImg) {
        // convert an <img> to a PImage
        var canvas = document.createElement("canvas");
        canvas.width = htmlImg.width;
        canvas.height = htmlImg.height;
        var context = canvas.getContext("2d");
        context.drawImage(htmlImg, 0, 0);
        var imageData = context.getImageData(0, 0, htmlImg.width, htmlImg.height);
        this.fromImageData(imageData);
      };

      if (arguments.length === 1) {
        // convert an <img> to a PImage
        this.fromHTMLImageData(arguments[0]);
      } else if (arguments.length === 2 || arguments.length === 3) {
        this.width = aWidth || 1;
        this.height = aHeight || 1;
        // changed for 0.9
        this.imageData = curContext.createImageData(this.width, this.height);
        this.format = (aFormat === p.ARGB || aFormat === p.ALPHA) ? aFormat : p.RGB;
      }
    };

    p.PImage = PImage;

    try {
      // Opera createImageData fix
      if (! ("createImageData" in CanvasRenderingContext2D.prototype)) {
        CanvasRenderingContext2D.prototype.createImageData = function(sw, sh) {
          return this.getImageData(0, 0, sw, sh);
        };
      }
    } catch(e) {}

    p.createImage = function createImage(w, h, mode) {
      // changed for 0.9
      return new PImage(w,h,mode);
    };

    // Loads an image for display. Type is an extension. Callback is fired on load.
    p.loadImage = function loadImage(file, type, callback) {
      // if type is specified add it with a . to file to make the filename
      if (type) {
        file = file + "." + type;
      }
      // if image is in the preloader cache return a new PImage
      if (p.pjs.imageCache[file]) {
        return new PImage(p.pjs.imageCache[file]);
      }
      // else aysnc load it
      else {
        var pimg = new PImage(0, 0, p.ARGB);
        var img = document.createElement('img');

        pimg.sourceImg = img;

        img.onload = (function(aImage, aPImage, aCallback) {
          var image = aImage;
          var pimg = aPImage;
          var callback = aCallback;
          return function() {
            // change the <img> object into a PImage now that its loaded
            pimg.fromHTMLImageData(image);
            pimg.loaded = true;
            if (callback) {
              callback();
            }
          };
        }(img, pimg, callback));

        img.src = file; // needs to be called after the img.onload function is declared or it wont work in opera
        return pimg;
      }
    };

    // async loading of large images, same functionality as loadImage above
    p.requestImage = p.loadImage;

    // Gets a single pixel or block of pixels from the current Canvas Context or a PImage
    p.get = function get(x, y, w, h, img) {
      var c;
      // for 0 2 and 4 arguments use curContext, otherwise PImage.get was called
      if (!arguments.length) {
        //return a PImage of curContext
        c = new PImage(p.width, p.height, p.RGB);
        c.fromImageData(curContext.getImageData(0, 0, p.width, p.height));
        return c;
      } else if (arguments.length === 5) {
        // PImage.get(x,y,w,h) was called, return x,y,w,h PImage of img
        // changed for 0.9, offset start point needs to be *4
        var start = y * img.width * 4 + (x*4);
        var end = (y + h) * img.width * 4 + ((x + w) * 4);
        c = new PImage(w, h, p.RGB);
        for (var i = start, j = 0; i < end; i++, j++) {
          // changed in 0.9
          c.imageData.data[j] = img.imageData.data[i];
          if (j*4 + 1 % w === 0) {
            //completed one line, increment i by offset
            i += (img.width - w) * 4;
          }
        }
        return c;
      } else if (arguments.length === 4) {
        // return a PImage of w and h from cood x,y of curContext
        c = new PImage(w, h, p.RGB);
        c.fromImageData(curContext.getImageData(x, y, w, h));
        return c;
      } else if (arguments.length === 3) {
        // PImage.get(x,y) was called, return the color (int) at x,y of img
        // changed in 0.9
        var offset = y * w.width * 4 + (x * 4);
        return p.color.toInt(w.imageData.data[offset],
                           w.imageData.data[offset + 1],
                           w.imageData.data[offset + 2],
                           w.imageData.data[offset + 3]);
      } else if (arguments.length === 2) {
        // return the color at x,y (int) of curContext
        // create a PImage object of size 1x1 and return the int of the pixels array element 0
        if (x < p.width && x >= 0 && y >= 0 && y < p.height) {
          // x,y is inside canvas space
          c = new PImage(1, 1, p.RGB);
          c.fromImageData(curContext.getImageData(x, y, 1, 1));
          // changed for 0.9
          return p.color.toInt(c.imageData.data[0],
                               c.imageData.data[1],
                               c.imageData.data[2],
                               c.imageData.data[3]);
        } else {
          // x,y is outside image return transparent black
          return 0;
        }
      } else if (arguments.length === 1) {
        // PImage.get() was called, return the PImage
        return x;
      }
    };

    // Creates a new Processing instance and passes it back for... processing
    p.createGraphics = function createGraphics(w, h) {
      var canvas = document.createElement("canvas");
      var ret = new Processing(canvas);
      ret.size(w, h);
      ret.canvas = canvas;
      return ret;
    };

    // Paints a pixel array into the canvas
    p.set = function set(x, y, obj, img) {
      var color, oldFill;
      // PImage.set(x,y,c) was called, set coordinate x,y color to c of img
      if (arguments.length === 4) {
        // changed in 0.9
        var c = p.color.toArray(obj);
        var offset = y * img.width * 4 + (x*4);
        img.imageData.data[offset] = c[0];
        img.imageData.data[offset+1] = c[1];
        img.imageData.data[offset+2] = c[2];
        img.imageData.data[offset+3] = c[3];
      } else if (arguments.length === 3) {
        // called p.set(), was it with a color or a img ?
        if (typeof obj === "number") {
          oldFill = curContext.fillStyle;
          color = obj;
          curContext.fillStyle = p.color.toString(color);
          curContext.fillRect(Math.round(x), Math.round(y), 1, 1);
          curContext.fillStyle = oldFill;
        } else if (obj instanceof PImage) {
          p.image(obj, x, y);
        }
      }
    };
    p.imageData = {};

    // handle the sketch code for pixels[]
    // parser code converts pixels[] to getPixels()
    // or setPixels(), .length becomes getLength()
    p.pixels = {
      getLength: function() { return p.imageData.data.length ? p.imageData.data.length/4 : 0; },
      getPixel: function(i) {
        var offset = i*4;
        return p.color.toInt(p.imageData.data[offset], p.imageData.data[offset+1],
                             p.imageData.data[offset+2], p.imageData.data[offset+3]);
      },
      setPixel: function(i,c) {
        if(c && typeof c === "number") {
          var offset = i*4;
          // split c into array
          var c2 = p.color.toArray(c);
          // change pixel to c
          p.imageData.data[offset] = c2[0];
          p.imageData.data[offset+1] = c2[1];
          p.imageData.data[offset+2] = c2[2];
          p.imageData.data[offset+3] = c2[3];
        }
      }
    };

    // Gets a 1-Dimensional pixel array from Canvas
    p.loadPixels = function() {
      // changed in 0.9
      p.imageData = p.get(0, 0, p.width, p.height).imageData;
    };

    // Draws a 1-Dimensional pixel array to Canvas
    p.updatePixels = function() {
      // changed in 0.9
      if (p.imageData) {
        curContext.putImageData(p.imageData, 0, 0);
      }
    };

    // Draw an image or a color to the background
    p.background = function background() {
      var color, a, img;

      // background params are either a color or a PImage
      if (typeof arguments[0] === 'number') {
        color = p.color.apply(this, arguments);
        // override alpha value, processing ignores the alpha for background color
        color = color | p.ALPHA_MASK;
      } else if (arguments.length === 1 && arguments[0] instanceof PImage) {
        img = arguments[0];

        if (!img.pixels || img.width !== p.width || img.height !== p.height) {
          throw "Background image must be the same dimensions as the canvas.";
        }
      } else {
        throw "Incorrect background parameters.";
      }

      if (p.use3DContext) {
        if (typeof color !== 'undefined') {
          var c = p.color.toGLArray(color);
          refreshBackground = function() {
            curContext.clearColor(c[0], c[1], c[2], c[3]);
            curContext.clear(curContext.COLOR_BUFFER_BIT | curContext.DEPTH_BUFFER_BIT);
          };
        } else {
          // Handle image background for 3d context. not done yet.
          refreshBackground = function() {};
        }
      } else { // 2d context
        if (typeof color !== 'undefined') {
          refreshBackground = function() {
            var oldFill = curContext.fillStyle;
            curContext.fillStyle = p.color.toString(color);
            curContext.fillRect(0, 0, p.width, p.height);
            curContext.fillStyle = oldFill;
          };
        } else {
          refreshBackground = function() {
            p.image(img, 0, 0);
          };
        }
      }
      refreshBackground();
    };

    // Draws an image to the Canvas
    p.image = function image(img, x, y, w, h) {
      if (img.width > 0) {
        var bounds = imageModeConvert(x || 0, y || 0, w || img.width, h || img.height, arguments.length < 4);
        var obj = img.toImageData();

        if (img._mask) {
          var j, size;
          if (img._mask instanceof PImage) {
            var objMask = img._mask.toImageData();
            for (j = 2, size = img.width * img.height * 4; j < size; j += 4) {
              // using it as an alpha channel
              obj.data[j + 1] = objMask.data[j];
              // but only the blue color channel
            }
          } else {
            for (j = 0, size = img._mask.length; j < size; ++j) {
              obj.data[(j << 2) + 3] = img._mask[j];
            }
          }
        }

        // draw the image
        //curContext.putImageData(obj, x, y); // this causes error if data overflows the canvas dimensions
        curTint(obj);

        var c = document.createElement('canvas');
        c.width = obj.width;
        c.height = obj.height;
        var ctx = c.getContext('2d');
        ctx.putImageData(obj, 0, 0);

        curContext.drawImage(c, 0, 0, img.width, img.height, bounds.x, bounds.y, bounds.w, bounds.h);
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

    p.tint = function tint() {
      var tintColor = p.color.apply(this, arguments);
      var r = p.red(tintColor) / colorModeX;
      var g = p.green(tintColor) / colorModeY;
      var b = p.blue(tintColor) / colorModeZ;
      var a = p.alpha(tintColor) / colorModeA;

      curTint = function(obj) {
        var data = obj.data,
          length = 4 * obj.width * obj.height;
        for (var i = 0; i < length;) {
          data[i++] *= r;
          data[i++] *= g;
          data[i++] *= b;
          data[i++] *= a;
        }
      };
    };

    p.noTint = function noTint() {
      curTint = function() {};
    };

    p.copy = function copy(src, sx, sy, sw, sh, dx, dy, dw, dh) {
      if (arguments.length === 8) {
        p.copy(p, src, sx, sy, sw, sh, dx, dy, dw);
        return;
      }
      p.blend(src, sx, sy, sw, sh, dx, dy, dw, dh, p.REPLACE);
    };

    p.blend = function blend(src, sx, sy, sw, sh, dx, dy, dw, dh, mode, pimgdest) {
      if (arguments.length === 9) {
        p.blend(p, src, sx, sy, sw, sh, dx, dy, dw, dh);
      } else if (arguments.length === 10 || arguments.length === 11) {
        var sx2 = sx + sw;
        var sy2 = sy + sh;
        var dx2 = dx + dw;
        var dy2 = dy + dh;
        var dest;
        // check if pimgdest is there and pixels, if so this was a call from pimg.blend
        if (arguments.length === 10) {
          p.loadPixels();
          dest = p;
        } else if (arguments.length === 11 && pimgdest && pimgdest.imageData) {
          dest = pimgdest;
        }
        if (src === p) {
          if (p.intersect(sx, sy, sx2, sy2, dx, dy, dx2, dy2)) {
            p.blit_resize(p.get(sx, sy, sx2 - sx, sy2 - sy), 0, 0, sx2 - sx - 1, sy2 - sy - 1, dest.imageData.data, dest.width, dest.height, dx, dy, dx2, dy2, mode);
          } else {
            // same as below, except skip the loadPixels() because it'd be redundant
            p.blit_resize(src, sx, sy, sx2, sy2, dest.imageData.data, dest.width, dest.height, dx, dy, dx2, dy2, mode);
          }
        } else {
          src.loadPixels();
          p.blit_resize(src, sx, sy, sx2, sy2, dest.imageData.data, dest.width, dest.height, dx, dy, dx2, dy2, mode);
        }
        if (arguments.length === 10) {
          p.updatePixels();
        }
      }
    };

    // shared variables for blit_resize(), filter_new_scanline(), filter_bilinear()
    // change this in the future to not be exposed to p
    p.shared = {
      fracU: 0,
      ifU: 0,
      fracV: 0,
      ifV: 0,
      u1: 0,
      u2: 0,
      v1: 0,
      v2: 0,
      sX: 0,
      sY: 0,
      iw: 0,
      iw1: 0,
      ih1: 0,
      ul: 0,
      ll: 0,
      ur: 0,
      lr: 0,
      cUL: 0,
      cLL: 0,
      cUR: 0,
      cLR: 0,
      srcXOffset: 0,
      srcYOffset: 0,
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      srcBuffer: null
    };

    p.intersect = function intersect(sx1, sy1, sx2, sy2, dx1, dy1, dx2, dy2) {
      var sw = sx2 - sx1 + 1;
      var sh = sy2 - sy1 + 1;
      var dw = dx2 - dx1 + 1;
      var dh = dy2 - dy1 + 1;
      if (dx1 < sx1) {
        dw += dx1 - sx1;
        if (dw > sw) {
          dw = sw;
        }
      } else {
        var w = sw + sx1 - dx1;
        if (dw > w) {
          dw = w;
        }
      }
      if (dy1 < sy1) {
        dh += dy1 - sy1;
        if (dh > sh) {
          dh = sh;
        }
      } else {
        var h = sh + sy1 - dy1;
        if (dh > h) {
          dh = h;
        }
      }
      return ! (dw <= 0 || dh <= 0);
    };

    p.filter_new_scanline = function filter_new_scanline() {
      p.shared.sX = p.shared.srcXOffset;
      p.shared.fracV = p.shared.srcYOffset & p.PREC_MAXVAL;
      p.shared.ifV = p.PREC_MAXVAL - p.shared.fracV;
      p.shared.v1 = (p.shared.srcYOffset >> p.PRECISIONB) * p.shared.iw;
      p.shared.v2 = Math.min((p.shared.srcYOffset >> p.PRECISIONB) + 1, p.shared.ih1) * p.shared.iw;
    };

    p.filter_bilinear = function filter_bilinear() {
      p.shared.fracU = p.shared.sX & p.PREC_MAXVAL;
      p.shared.ifU = p.PREC_MAXVAL - p.shared.fracU;
      p.shared.ul = (p.shared.ifU * p.shared.ifV) >> p.PRECISIONB;
      p.shared.ll = (p.shared.ifU * p.shared.fracV) >> p.PRECISIONB;
      p.shared.ur = (p.shared.fracU * p.shared.ifV) >> p.PRECISIONB;
      p.shared.lr = (p.shared.fracU * p.shared.fracV) >> p.PRECISIONB;
      p.shared.u1 = (p.shared.sX >> p.PRECISIONB);
      p.shared.u2 = Math.min(p.shared.u1 + 1, p.shared.iw1);
      // get color values of the 4 neighbouring texels
      // changed for 0.9
      var cULoffset = (p.shared.v1 + p.shared.u1) * 4;
      var cURoffset = (p.shared.v1 + p.shared.u2) * 4;
      var cLLoffset = (p.shared.v2 + p.shared.u1) * 4;
      var cLRoffset = (p.shared.v2 + p.shared.u2) * 4;
      p.shared.cUL = p.color.toInt(p.shared.srcBuffer[cULoffset], p.shared.srcBuffer[cULoffset+1], p.shared.srcBuffer[cULoffset+2], p.shared.srcBuffer[cULoffset+3]);
      p.shared.cUR = p.color.toInt(p.shared.srcBuffer[cURoffset], p.shared.srcBuffer[cURoffset+1], p.shared.srcBuffer[cURoffset+2], p.shared.srcBuffer[cURoffset+3]);
      p.shared.cLL = p.color.toInt(p.shared.srcBuffer[cLLoffset], p.shared.srcBuffer[cLLoffset+1], p.shared.srcBuffer[cLLoffset+2], p.shared.srcBuffer[cLLoffset+3]);
      p.shared.cLR = p.color.toInt(p.shared.srcBuffer[cLRoffset], p.shared.srcBuffer[cLRoffset+1], p.shared.srcBuffer[cLRoffset+2], p.shared.srcBuffer[cLRoffset+3]);
      p.shared.r = ((p.shared.ul * ((p.shared.cUL & p.RED_MASK) >> 16) + p.shared.ll * ((p.shared.cLL & p.RED_MASK) >> 16) + p.shared.ur * ((p.shared.cUR & p.RED_MASK) >> 16) + p.shared.lr * ((p.shared.cLR & p.RED_MASK) >> 16)) << p.PREC_RED_SHIFT) & p.RED_MASK;
      p.shared.g = ((p.shared.ul * (p.shared.cUL & p.GREEN_MASK) + p.shared.ll * (p.shared.cLL & p.GREEN_MASK) + p.shared.ur * (p.shared.cUR & p.GREEN_MASK) + p.shared.lr * (p.shared.cLR & p.GREEN_MASK)) >>> p.PRECISIONB) & p.GREEN_MASK;
      p.shared.b = (p.shared.ul * (p.shared.cUL & p.BLUE_MASK) + p.shared.ll * (p.shared.cLL & p.BLUE_MASK) + p.shared.ur * (p.shared.cUR & p.BLUE_MASK) + p.shared.lr * (p.shared.cLR & p.BLUE_MASK)) >>> p.PRECISIONB;
      p.shared.a = ((p.shared.ul * ((p.shared.cUL & p.ALPHA_MASK) >>> 24) + p.shared.ll * ((p.shared.cLL & p.ALPHA_MASK) >>> 24) + p.shared.ur * ((p.shared.cUR & p.ALPHA_MASK) >>> 24) + p.shared.lr * ((p.shared.cLR & p.ALPHA_MASK) >>> 24)) << p.PREC_ALPHA_SHIFT) & p.ALPHA_MASK;
      return p.shared.a | p.shared.r | p.shared.g | p.shared.b;
    };

    p.blit_resize = function blit_resize(img, srcX1, srcY1, srcX2, srcY2, destPixels, screenW, screenH, destX1, destY1, destX2, destY2, mode) {
      var x, y; // iterator vars
      if (srcX1 < 0) {
        srcX1 = 0;
      }
      if (srcY1 < 0) {
        srcY1 = 0;
      }
      if (srcX2 >= img.width) {
        srcX2 = img.width - 1;
      }
      if (srcY2 >= img.height) {
        srcY2 = img.height - 1;
      }
      var srcW = srcX2 - srcX1;
      var srcH = srcY2 - srcY1;
      var destW = destX2 - destX1;
      var destH = destY2 - destY1;
      var smooth = true; // may as well go with the smoothing these days
      if (!smooth) {
        srcW++;
        srcH++;
      }
      if (destW <= 0 || destH <= 0 || srcW <= 0 || srcH <= 0 || destX1 >= screenW || destY1 >= screenH || srcX1 >= img.width || srcY1 >= img.height) {
        return;
      }
      var dx = Math.floor(srcW / destW * p.PRECISIONF);
      var dy = Math.floor(srcH / destH * p.PRECISIONF);
      p.shared.srcXOffset = Math.floor(destX1 < 0 ? -destX1 * dx : srcX1 * p.PRECISIONF);
      p.shared.srcYOffset = Math.floor(destY1 < 0 ? -destY1 * dy : srcY1 * p.PRECISIONF);
      if (destX1 < 0) {
        destW += destX1;
        destX1 = 0;
      }
      if (destY1 < 0) {
        destH += destY1;
        destY1 = 0;
      }
      destW = Math.min(destW, screenW - destX1);
      destH = Math.min(destH, screenH - destY1);
      // changed in 0.9, TODO
      var destOffset = destY1 * screenW + destX1;
      var destColor;
      p.shared.srcBuffer = img.imageData.data;
      if (smooth) {
        // use bilinear filtering
        p.shared.iw = img.width;
        p.shared.iw1 = img.width - 1;
        p.shared.ih1 = img.height - 1;
        switch (mode) {
        case p.BLEND:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4], destPixels[((destOffset + x) * 4) + 1], destPixels[((destOffset + x) * 4) + 2], destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.blend(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.blend(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case p.ADD:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4], destPixels[((destOffset + x) * 4) + 1], destPixels[((destOffset + x) * 4) + 2], destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.add(destColor, p.filter_bilinear()));
              destColor = p.color.toArray(p.modes.add(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.add(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case p.SUBTRACT:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4], destPixels[((destOffset + x) * 4) + 1], destPixels[((destOffset + x) * 4) + 2], destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.subtract(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.subtract(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case p.LIGHTEST:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4], destPixels[((destOffset + x) * 4) + 1], destPixels[((destOffset + x) * 4) + 2], destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.lightest(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.lightest(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case p.DARKEST:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4], destPixels[((destOffset + x) * 4) + 1], destPixels[((destOffset + x) * 4) + 2], destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.darkest(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.darkest(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case p.REPLACE:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4], destPixels[((destOffset + x) * 4) + 1], destPixels[((destOffset + x) * 4) + 2], destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.filter_bilinear());
              //destPixels[destOffset + x] = p.filter_bilinear();
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case p.DIFFERENCE:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4], destPixels[((destOffset + x) * 4) + 1], destPixels[((destOffset + x) * 4) + 2], destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.difference(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.difference(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case p.EXCLUSION:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4], destPixels[((destOffset + x) * 4) + 1], destPixels[((destOffset + x) * 4) + 2], destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.exclusion(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.exclusion(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case p.MULTIPLY:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4], destPixels[((destOffset + x) * 4) + 1], destPixels[((destOffset + x) * 4) + 2], destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.multiply(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.multiply(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case p.SCREEN:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4], destPixels[((destOffset + x) * 4) + 1], destPixels[((destOffset + x) * 4) + 2], destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.screen(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.screen(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case p.OVERLAY:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4], destPixels[((destOffset + x) * 4) + 1], destPixels[((destOffset + x) * 4) + 2], destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.overlay(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.overlay(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case p.HARD_LIGHT:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4], destPixels[((destOffset + x) * 4) + 1], destPixels[((destOffset + x) * 4) + 2], destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.hard_light(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.hard_light(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case p.SOFT_LIGHT:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4], destPixels[((destOffset + x) * 4) + 1], destPixels[((destOffset + x) * 4) + 2], destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.soft_light(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.soft_light(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case p.DODGE:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4], destPixels[((destOffset + x) * 4) + 1], destPixels[((destOffset + x) * 4) + 2], destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.dodge(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.dodge(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        case p.BURN:
          for (y = 0; y < destH; y++) {
            p.filter_new_scanline();
            for (x = 0; x < destW; x++) {
              // changed for 0.9
              destColor = p.color.toInt(destPixels[(destOffset + x) * 4], destPixels[((destOffset + x) * 4) + 1], destPixels[((destOffset + x) * 4) + 2], destPixels[((destOffset + x) * 4) + 3]);
              destColor = p.color.toArray(p.modes.burn(destColor, p.filter_bilinear()));
              //destPixels[destOffset + x] = p.modes.burn(destPixels[destOffset + x], p.filter_bilinear());
              destPixels[(destOffset + x) * 4] = destColor[0];
              destPixels[(destOffset + x) * 4 + 1] = destColor[1];
              destPixels[(destOffset + x) * 4 + 2] = destColor[2];
              destPixels[(destOffset + x) * 4 + 3] = destColor[3];
              p.shared.sX += dx;
            }
            destOffset += screenW;
            p.shared.srcYOffset += dy;
          }
          break;
        }
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // Font handling
    ////////////////////////////////////////////////////////////////////////////

    // Loads a font from an SVG or Canvas API
    p.loadFont = function loadFont(name) {
      if (name.indexOf(".svg") === -1) {
        return {
          name: name,
          width: function(str) {
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
          width: function(str) {
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
    p.text = function text() {
      if (typeof arguments[0] !== 'undefined') {
        var str = arguments[0],
          x, y, z, pos, width, height;

        if (typeof str === 'number' && (str + "").indexOf('.') >= 0) {
          // Make sure .15 rounds to .1, but .151 rounds to .2.
          if ((str * 1000) - Math.floor(str * 1000) === 0.5) {
            str = str - 0.0001;
          }
          str = str.toFixed(3);
        }

        str = str.toString();

        if (arguments.length === 1) { // for text( str )
          p.text(str, lastTextPos[0], lastTextPos[1]);
        } else if (arguments.length === 3) { // for text( str, x, y)
          text(str, arguments[1], arguments[2], 0);
        } else if (arguments.length === 4) { // for text( str, x, y, z)
          x = arguments[1];
          y = arguments[2];
          z = arguments[3];

          do {
            pos = str.indexOf("\n");
            if (pos !== -1) {
              if (pos !== 0) {
                text(str.substring(0, pos));
              }
              y += curTextSize;
              str = str.substring(pos + 1, str.length);
            }
          } while (pos !== -1);

          // TODO: handle case for 3d text
          if (p.use3DContext) {
          }

          width = 0;

          // If the font is a standard Canvas font...
          if (!curTextFont.glyph) {
            if (str && (curContext.fillText || curContext.mozDrawText)) {
              curContext.save();
              curContext.font = curContext.mozTextStyle = curTextSize + "px " + curTextFont.name;

              if (curContext.fillText) {
                curContext.fillText(str, x, y);
                width = curContext.measureText(str).width;
              } else if (curContext.mozDrawText) {
                curContext.translate(x, y);
                curContext.mozDrawText(str);
                width = curContext.mozMeasureText(str);
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
              } catch(e) {
                Processing.debug(e);
              }
            }
            curContext.restore();
          }

          // TODO: Handle case for 3d text
          if (p.use3DContext) {
          }

          lastTextPos[0] = x + width;
          lastTextPos[1] = y;
          lastTextPos[2] = z;
        } else if (arguments.length === 5) { // for text( str, x, y , width, height)
          text(str, arguments[1], arguments[2], arguments[3], arguments[4], 0);
        } else if (arguments.length === 6) { // for text( stringdata, x, y , width, height, z)
          x = arguments[1];
          y = arguments[2];
          width = arguments[3];
          height = arguments[4];
          z = arguments[5];

          if (str.length > 0) {
            if (curTextSize > height) {
              return;
            }
            var spaceMark = -1;
            var start = 0;
            var lineWidth = 0;
            var letterWidth = 0;
            var textboxWidth = width;

            lastTextPos[0] = x;
            lastTextPos[1] = y - 0.4 * curTextSize;

            curContext.font = curTextSize + "px " + curTextFont.name;

            for (var j = 0; j < str.length; j++) {
              if (curContext.fillText) {
                letterWidth = curContext.measureText(str[j]).width;
              } else if (curContext.mozDrawText) {
                letterWidth = curContext.mozMeasureText(str[j]);
              }
              if (str[j] !== "\n" && (str[j] === " " || (str[j - 1] !== " " && str[j + 1] === " ") || lineWidth + 2 * letterWidth < textboxWidth)) { // check a line of text
                if (str[j] === " ") {
                  spaceMark = j;
                }
                lineWidth += letterWidth;
              } else { // draw a line of text
                if (start === spaceMark + 1) { // in case a whole line without a space
                  spaceMark = j;
                }

                lastTextPos[0] = x;
                lastTextPos[1] = lastTextPos[1] + curTextSize;
                if (str[j] === "\n") {
                  text(str.substring(start, j));
                  start = j + 1;
                } else {
                  text(str.substring(start, spaceMark + 1));
                  start = spaceMark + 1;
                }

                lineWidth = 0;
                if (lastTextPos[1] + 2 * curTextSize > y + height + 0.6 * curTextSize) { // stop if no enough space for one more line draw
                  return;
                }
                j = start - 1;
              }
            }

            if (start !== str.length) { // draw the last line
              lastTextPos[0] = x;
              lastTextPos[1] = lastTextPos[1] + curTextSize;
              for (; start < str.length; start++) {
                text(str[start]);
              }
            }

          } // end str != ""
        } // end arguments.length == 6
      }
    };

    // Load Batik SVG Fonts and parse to pre-def objects for quick rendering
    p.loadGlyphs = function loadGlyph(url) {
      var x, y, cx, cy, nx, ny, d, a, lastCom, lenC, horiz_adv_x, getXY = '[0-9\\-]+', path;

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
          var com = c[j][0], xy = regex(getXY, com);

          switch (com[0]) {
            case "M":
              //curContext.moveTo(x,-y);
              x = parseFloat(xy[0][0]);
              y = parseFloat(xy[1][0]);
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

        object[name] = function() {
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

    //////////////////////////////////////////////////////////////////////////
    // Event handling
    //////////////////////////////////////////////////////////////////////////

    p.pjs.eventHandlers = [];

    function attach(elem, type, fn) {
      if (elem.addEventListener) {
        elem.addEventListener(type, fn, false);
      } else {
        elem.attachEvent("on" + type, fn);
      }
      p.pjs.eventHandlers.push([elem, type, fn]);
    }

    attach(curElement, "mousemove", function(e) {
      var element = curElement, offsetX = 0, offsetY = 0;

      p.pmouseX = p.mouseX;
      p.pmouseY = p.mouseY;

      if (element.offsetParent) {
        do {
          offsetX += element.offsetLeft;
          offsetY += element.offsetTop;
        } while (element = element.offsetParent);
      }

      // Dropping support for IE clientX and clientY, switching to pageX and pageY so we don't have to calculate scroll offset.
      // Removed in ticket #184. See rev: 2f106d1c7017fed92d045ba918db47d28e5c16f4
      p.mouseX = e.pageX - offsetX;
      p.mouseY = e.pageY - offsetY;

      if (p.mouseMoved && !mousePressed) {
        p.mouseMoved();
      }
      if (mousePressed && p.mouseDragged) {
        p.mouseDragged();
        p.mouseDragging = true;
      }
    });

    attach(curElement, "mouseout", function(e) {
    });

    attach(curElement, "mousedown", function(e) {
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

    attach(curElement, "mouseup", function(e) {
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

    var mouseWheelHandler = function(e) {
      var delta = 0;

      if (e.wheelDelta) {
        delta = e.wheelDelta / 120;
        if (window.opera) {
          delta = -delta;
        }
      } else if (e.detail) {
        delta = -e.detail / 3;
      }

      p.mouseScroll = delta;

      if (delta && typeof p.mouseScrolled === 'function') {
        p.mouseScrolled();
      }
    };

    // Support Gecko and non-Gecko scroll events
    attach(document, 'DOMMouseScroll', mouseWheelHandler);
    attach(document, 'mousewheel', mouseWheelHandler);

    attach(document, "keydown", function(e) {
      keyPressed = true;
      p.keyCode = null;
      p.key = e.keyCode;

      // Letters
      if (e.keyCode >= 65 && e.keyCode <= 90) { // A-Z
        // Keys return ASCII for upcased letters.
        // Convert to downcase if shiftKey is not pressed.
        if (!e.shiftKey) {
          p.key += 32;
        }
      }

      // Numbers and their shift-symbols
      else if (e.keyCode >= 48 && e.keyCode <= 57) { // 0-9
        if (e.shiftKey) {
          switch (e.keyCode) {
          case 49:
            p.key = 33;
            break; // !
          case 50:
            p.key = 64;
            break; // @
          case 51:
            p.key = 35;
            break; // #
          case 52:
            p.key = 36;
            break; // $
          case 53:
            p.key = 37;
            break; // %
          case 54:
            p.key = 94;
            break; // ^
          case 55:
            p.key = 38;
            break; // &
          case 56:
            p.key = 42;
            break; // *
          case 57:
            p.key = 40;
            break; // (
          case 48:
            p.key = 41;
            break; // )
          }
        }
      }

      // Coded keys
      else if (codedKeys.indexOf(e.keyCode) >= 0) { // SHIFT, CONTROL, ALT, LEFT, RIGHT, UP, DOWN
        p.key = p.CODED;
        p.keyCode = e.keyCode;
      }

      // Symbols and their shift-symbols
      else {
        if (e.shiftKey) {
          switch (e.keyCode) {
          case 107:
            p.key = 43;
            break; // +
          case 219:
            p.key = 123;
            break; // {
          case 221:
            p.key = 125;
            break; // }
          case 222:
            p.key = 34;
            break; // "
          }
        } else {
          switch (e.keyCode) {
          case 188:
            p.key = 44;
            break; // ,
          case 109:
            p.key = 45;
            break; // -
          case 190:
            p.key = 46;
            break; // .
          case 191:
            p.key = 47;
            break; // /
          case 192:
            p.key = 96;
            break; // ~
          case 219:
            p.key = 91;
            break; // [
          case 220:
            p.key = 92;
            break; // \
          case 221:
            p.key = 93;
            break; // ]
          case 222:
            p.key = 39;
            break; // '
          }
        }
      }

      if (typeof p.keyPressed === "function") {
        p.keyPressed();
      } else {
        p.keyPressed = true;
      }
    });

    attach(document, "keyup", function(e) {
      keyPressed = false;
      if (typeof p.keyPressed !== "function") {
        p.keyPressed = false;
      }
      if (p.keyReleased) {
        p.keyReleased();
      }
    });

    attach(document, "keypress", function (e) {
      if (p.keyTyped) {
        p.keyTyped();
      }
    });

    // Place-holder for debugging function
    p.debug = function(e) {};

    // Get the DOM element if string was passed
    if (typeof curElement === "string") {
      curElement = document.getElementById(curElement);
    }

    // Send aCode Processing syntax to be converted to JavaScript
    if (aCode) {
      var parsedCode = typeof aCode === "function" ? undefined : Processing.parse(aCode, p);

      if (!this.use3DContext) {
        // Setup default 2d canvas context.
        curContext = curElement.getContext('2d');

        modelView = new PMatrix2D();

        // Canvas has trouble rendering single pixel stuff on whole-pixel
        // counts, so we slightly offset it (this is super lame).
        curContext.translate(0.5, 0.5);

        curContext.lineCap = 'round';

        // Set default stroke and fill color
        p.stroke(0);
        p.fill(255);
        p.noSmooth();
        p.disableContextMenu();
      }

      // Step through the libraries that were attached at doc load...
      for (var i in Processing.lib) {
        if (Processing.lib) {
          // Init the libraries in the context of this p_instance
          Processing.lib[i].call(this);
        }
      }

      var localizedProperties = "";
      for (var propertyName in p) {
        localizedProperties += "var " + propertyName + "=__p__." + propertyName + ";";
        if (typeof p[propertyName] !== "function" || typeof p[propertyName] !== "object") {
          localizedProperties += "__p__.__defineGetter__('" + propertyName + "',function(){return " + propertyName + ";});" +
                                 "__p__.__defineSetter__('" + propertyName + "',function(v){" + propertyName + "=v;});";
        }
      }

      var executeSketch = function() {
          // Don't start until all specified images in the cache are preloaded
          if (!p.pjs.imageCache.pending) {
            if(typeof aCode === "function") {
              aCode(p);
            } else {
              eval (" (function(__p__) { " +
                        localizedProperties +
                        parsedCode +
                    "   if (setup) {" +
                    "     __p__.setup = setup;" +
                    "     setup();" +
                    "   }" +
                    "   if (draw) {" +
                    "     __p__.draw = draw;" +
                    "     if (!doLoop) {" +
                    "       redraw();" +
                    "     } else {" +
                    "       loop();" +
                    "     }" +
                    "   }" +
                    " })(p);"
              );
            }
          } else {
            window.setTimeout(executeSketch, 10);
          }
      };

      // The parser adds custom methods to the processing context
      executeSketch();
    }
  };

  // Share lib space
  Processing.lib = {};

  // Parse Processing (Java-like) syntax to JavaScript syntax with Regex
  Processing.parse = function parse(aCode, p) {

    // Function to grab all code in the opening and closing of two characters
    var nextBrace = function(right, openChar, closeChar) {
      var rest = right,
          position = 0,
          leftCount = 1,
          rightCount = 0;

      while (leftCount !== rightCount) {
        var nextLeft = rest.indexOf(openChar),
            nextRight = rest.indexOf(closeChar);

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

    // Force characters-as-bytes to work.
    //aCode = aCode.replace(/('(.){1}')/g, "$1.charCodeAt(0)");
    aCode = aCode.replace(/'.{1}'/g, function(all) {
      return "(new Char(" + all + "))";
    });

    // Parse out @pjs directive, if any.
    var dm = /\/\*\s*@pjs\s+((?:[^\*]|\*+[^\*\/])*)\*\//g.exec(aCode);
    if (dm && dm.length === 2) {
      var directives = dm.splice(1, 2)[0].replace('\n', '').replace('\r', '').split(';');

      // We'll L/RTrim, and also remove any surrounding double quotes (e.g., just take string contents)
      var clean = function(s) {
        return s.replace(/^\s*\"?/, '').replace(/\"?\s*$/, '');
      };

      for (var i = 0, dl = directives.length; i < dl; i++) {
        var pair = directives[i].split('=');
        if (pair && pair.length === 2) {
          var key = clean(pair[0]);
          var value = clean(pair[1]);

          // A few directives require work beyond storying key/value pairings
          if (key === "preload") {
            var list = value.split(',');
            // All pre-loaded images will get put in imageCache, keyed on filename
            for (var j = 0, ll = list.length; j < ll; j++) {
              var imageName = clean(list[j]);
              var img = new Image();
              img.onload = (function() {
                return function() {
                  p.pjs.imageCache.pending--;
                };
              }());
              p.pjs.imageCache.pending++;
              p.pjs.imageCache[imageName] = img;
              img.src = imageName;
            }
          } else if (key === "opaque") {
            p.canvas.mozOpaque = value === "true";
          } else {
            p.pjs[key] = value;
          }
        }
      }
      aCode = aCode.replace(dm[0], '');
    }

    // Saves all strings into an array
    // masks all strings into <STRING n>
    // to be replaced with the array strings after parsing is finished
    var strings = [];
    aCode = aCode.replace(/(["'])(\\\1|.)*?(\1)/g, function(all) {
      strings.push(all);
      return "<STRING " + (strings.length - 1) + ">";
    });

    // Windows newlines cause problems:
    aCode = aCode.replace(/\r\n?/g, "\n");

    // Remove multi-line comments
    aCode = aCode.replace(/\/\*[\s\S]*?\*\//g, "");

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
    aCode = aCode.replace(/(?:static )?(\w+(?:\[\])*\s+)(\w+)\s*(\([^\)]*\)\s*\{)/g, function(all, type, name, args) {
      if (name === "if" || name === "for" || name === "while" || type === "public ") {
        return all;
      } else {
        return "PROCESSING." + name + " = function " + name + args;
      }
    });

    var matchMethod = /PROCESSING\.(\w+ = function \w+\([^\)]*\)\s*\{)/, mc;

    while ((mc = aCode.match(matchMethod))) {
      var prev = RegExp.leftContext,
        allNext = RegExp.rightContext,
        next = nextBrace(allNext, "{", "}");

        aCode = prev + "processing." + mc[1] + next + "};" + allNext.slice(next.length + 1);
    }

    // Delete import statements, ie. import processing.video.*;
    // https://processing-js.lighthouseapp.com/projects/41284/tickets/235-fix-parsing-of-java-import-statement
    aCode = aCode.replace(/import\s+(.+);/g, "");

    //replace  catch (IOException e) to catch (e)
    aCode = aCode.replace(/catch\s*\(\W*\w*\s+(\w*)\W*\)/g, "catch ($1)");

    //delete  the multiple catch block
    var catchBlock = /(catch[^\}]*\})\W*catch[^\}]*\}/;

    while (catchBlock.test(aCode)) {
      aCode = aCode.replace(new RegExp(catchBlock), "$1");
    }

    Error.prototype.printStackTrace = function() {
      this.toString();
    };

    // changes pixels[n] into pixels.getPixels(n)
    // and pixels[n] = n2 into pixels.setPixels(n, n2)
    var matchPixels = /pixels\s*\[/,
        mp;

    while ((mp = aCode.match(matchPixels))) {
      var left = RegExp.leftContext,
          allRest = RegExp.rightContext,
          rest = nextBrace(allRest, "[", "]"),
          getOrSet = "getPixel";

      allRest = allRest.slice(rest.length + 1);

      allRest = (function(){
        return allRest.replace(/^\s*=([^;]*)([;])/, function(all, middle, end){
          rest += ", " + middle;
          getOrSet = "setPixel";
          return end;
        });
      }());

      aCode = left + "pixels." + getOrSet + "(" + rest + ")" + allRest;
    }

    // changes pixel.length to pixels.getLength()
    aCode = aCode.replace(/pixels.length/g, "pixels.getLength()");

    // Force .length() to be .length
    aCode = aCode.replace(/\.length\(\)/g, ".length");

    // foo( int foo, float bar )
    aCode = aCode.replace(/([\(,]\s*)(\w+)((?:\[\])+|\s+)\s*(\w+\s*[\),])/g, "$1$4");
    aCode = aCode.replace(/([\(,]\s*)(\w+)((?:\[\])+|\s+)\s*(\w+\s*[\),])/g, "$1$4");

    // float[] foo = new float[5];
    aCode = aCode.replace(/new\s+(\w+)\s*((?:\[(?:[^\]]*)\])+)\s*(\{[^;]*\}\s*;)*/g, function(all, name, args, initVars) {
      if (initVars) {
        return initVars.replace(/\{/g, "[").replace(/\}/g, "]");
      } else {
        return "new ArrayList(" + args.replace(/\[\]/g, "[0]").slice(1, -1).split("][").join(", ") + ");";
      }
    });

    // What does this do? This does the same thing as "Fix Array[] foo = {...} to [...]" below
    aCode = aCode.replace(/(?:static\s+)?\w+\[\]\s*(\w+)\[?\]?\s*=\s*\{.*?\};/g, function(all) {
      return all.replace(/\{/g, "[").replace(/\}/g, "]");
    });

    // int|float foo;
    var intFloat = /(\s*(?:int|float)\s+(?!\[\])*(?:\s*|[^\(;]*?,\s*))([a-zA-Z]\w*)\s*(,|;)/i;
    while (intFloat.test(aCode)) {
      aCode = (function() {
        return aCode.replace(new RegExp(intFloat), function(all, type, name, sep) {
          return type + " " + name + " = 0" + sep;
        });
      }());
    }

    // float foo = 5;
    aCode = aCode.replace(/(?:final\s+)?(\w+)((?:\[\s*\])+|\s)\s*(\w+)\[?\]?(\s*[=,;])/g, function(all, type, arr, name, sep) {
      if (type === "return" || type === "else") {
        return all;
      } else {
        return "var " + name + sep;
      }
    });

    // Fix Array[] foo = {...} to [...]
    aCode = aCode.replace(/\=\s*\{((.|\s)*?\};)/g, function(all, data) {
      return "= [" + data.replace(/\{/g, "[").replace(/\}/g, "]");
    });

    // super() is a reserved word
    aCode = aCode.replace(/super\(/g, "superMethod(");

    // Stores the variables and mathods of a single class
    var SuperClass = function(name){
      return {
        className: name,
        classVariables: "",
        classFunctions: []
      };
    };
    var arrayOfSuperClasses = [];

    // implements Int1, Int2
    aCode = aCode.replace(/implements\s+(\w+\s*(,\s*\w+\s*)*)\s*\{/g, function(all, interfaces) {
      var names = interfaces.replace(/\s+/g, "").split(",");
      return "{ var __psj_interfaces = new ArrayList([\"" + names.join("\", \"") + "\"]);";
    });

    // Simply turns an interface into a class
    aCode = aCode.replace(/interface/g, "class");

    var classes = ["int", "float", "boolean", "String", "byte", "double", "long", "ArrayList"];

    var classReplace = function(all, name, extend) {
      classes.push(name);

      // Move arguments up from constructor
      return "function " + name + "() {\n " +
              (extend ? "var __self=this;function superMethod(){extendClass(__self,arguments," + extend + ");}\n" : "") +
              (extend ? "extendClass(this, " + extend + ");\n" : "") +
              "<CLASS " + name + " " + extend + ">";
    };

    var matchClasses = /(?:public\s+|abstract\s+|static\s+)*class\s+?(\w+)\s*(?:extends\s*(\w+)\s*)?\{/g;

    aCode = aCode.replace(matchClasses, classReplace);

    var matchClass = /<CLASS (\w+) (\w+)?>/,
        m;

    while ((m = aCode.match(matchClass))) {
      var left = RegExp.leftContext,
          allRest = RegExp.rightContext,
          rest = nextBrace(allRest, "{", "}"),
          className = m[1],
          thisSuperClass = new SuperClass(className),
          extendingClass = m[2];

      allRest = allRest.slice(rest.length + 1);

      // Fix class method names
      // this.collide = function() { ... }
      rest = (function() {
        return rest.replace(/(?:public\s+)?processing.\w+ = function (\w+)\(([^\)]*?)\)/g, function(all, name, args) {
          thisSuperClass.classFunctions.push(name + "|");
          return "ADDMETHOD(this, '" + name + "', (function(public) { return function(" + args + ")";
        });
      }());

      var matchMethod = /ADDMETHOD([^,]+, \s*?')([^']*)('[\s\S]*?\{[^\{]*?\{)/,
          mc,
          methods = "",
          publicVars  = "",
          methodsArray = [];

      while ((mc = rest.match(matchMethod))) {
        var prev = RegExp.leftContext,
            allNext = RegExp.rightContext,
            next = nextBrace(allNext, "{", "}");

        methodsArray.push("addMethod" + mc[1] + mc[2] + mc[3] + next + "};})(this));\n");
        publicVars += mc[2] + "|";

        if (extendingClass){
          for (var i = 0, aLength = arrayOfSuperClasses.length; i < aLength; i++){
            if (extendingClass === arrayOfSuperClasses[i].className){
              publicVars += arrayOfSuperClasses[i].classVariables;
              for (var x = 0, fLength = arrayOfSuperClasses[i].classFunctions.length; x < fLength; x++){
                publicVars += arrayOfSuperClasses[i].classFunctions[x];
              }
            }
          }
        }

        rest = prev + allNext.slice(next.length + 1);
      }

      var matchConstructor = new RegExp("\\b" + className + "\\s*\\(([^\\)]*?)\\)\\s*{"),
          c,
          constructor = "",
          constructorsArray = [];

      // Extract all constructors and put them into the variable "constructors"
      while ((c = rest.match(matchConstructor))) {
        var prev = RegExp.leftContext,
            allNext = RegExp.rightContext,
            next = nextBrace(allNext, "{", "}"),
            args = c[1];

          args = args.split(/,\s*?/);

        if (args[0].match(/^\s*$/)) {
          args.shift();
        }

        constructor = "if ( arguments.length === " + args.length + " ) {\n";

        for (var i = 0, aLength = args.length; i < aLength; i++) {
          constructor += " var " + args[i] + " = arguments[" + i + "];\n";
        }

        constructor += next + "}\n";

        constructorsArray.push(constructor);
        rest = prev + allNext.slice(next.length + 1);
      }

      var vars = "",
          staticVars = "",
          localStaticVars = [];

      // Put all member variables into "vars"
      // and keep a list of all public variables
      rest = (function(){
        rest.replace(/(?:final|private|public)?\s*?(?:(static)\s+)?var\s+([^;]*?;)/g, function(all, staticVar, variable) {
          variable = "this." + variable.replace(/,\s*/g, ";\nthis.")
            .replace(/this.(\w+);/g, "this.$1 = null;") + '\n';

          publicVars += variable.replace(/\s*this\.(\w+)\s*(;|=).*\s?/g, "$1|");
          thisSuperClass.classVariables += variable.replace(/\s*this\.(\w+)\s*(;|=).*\s?/g, "$1|");

          if (staticVar === "static"){
            // Fix static methods
            variable = variable.replace(/this\.(\w+)\s*=\s*([^;]*?;)/g, function(all, sVariable, value){
              localStaticVars.push(sVariable);
              value = value.replace(new RegExp("(" + localStaticVars.join("|") + ")", "g"), className + ".$1");
              staticVars += className + "." + sVariable + " = " + value;
              return "if (typeof " + className + "." + sVariable + " === 'undefined'){ " + className + "." + sVariable + " = " + value + " }\n" +
                "this.__defineGetter__('" + sVariable + "', function(){ return "+ className + "." + sVariable + "; });\n" +
                "this.__defineSetter__('" + sVariable + "', function(val){ " + className + "." + sVariable + " = val; });\n";
            });
          }
          vars += variable;
          return "";
        });
      }());


      // add this. to public variables used inside member functions, and constructors
      if (publicVars) {
        // Search functions for public variables
        for (var i = 0, aLength = methodsArray.length; i < aLength; i++){
          methodsArray[i] = (function(){
            return methodsArray[i].replace(/(addMethod.*?\{ return function\((.*?)\)\s*\{)([\s\S]*?)(\};\}\)\(this\)\);)/g, function(all, header, localParams, body, footer) {
              body = body.replace(/this\./g, "public.");
              localParams = localParams.replace(/\s*,\s*/g, "|");
              return header + body.replace(new RegExp("(var\\s+?|\\.)?\\b(" + publicVars.substr(0, publicVars.length-1) + ")\\b", "g"), function (all, first, variable) {
                if (first === ".") {
                  return all;
                } else if (/var\s*?$/.test(first)) {
                  localParams += "|" + variable;
                  return all;
                } else if (localParams && new RegExp("\\b(" + localParams + ")\\b").test(variable)){
                  return all;
                } else {
                  return "public." + variable;
                }
              }) + footer;
            });
          }());
        }
        // Search constructors for public variables
        for (var i = 0, localParameters = "", aLength = constructorsArray.length; i < aLength; i++){
          localParameters = "";
          (function(){
            constructorsArray[i].replace(/var\s+(\w+) = arguments\[[^\]]\];/g, function(all, localParam){
              localParameters += localParam + "|";
            });
          }());
          (function(){
            constructorsArray[i] = constructorsArray[i].replace(new RegExp("(var\\s+?|\\.)?\\b(" + publicVars.substr(0, publicVars.length-1) + ")\\b", "g"), function (all, first, variable) {
              if (first === ".") {
                return all;
              } else if (/var\s*?$/.test(first)) {
                localParameters += variable + "|";
                return all;
              } else if (localParameters && new RegExp("\\b(" + localParameters.substr(0, localParameters.length-1) + ")\\b").test(variable)){
                return all;
              } else {
                return "this." + variable;
              }
            });
          }());
        }
      }

      var constructors = "";

      for (var i = 0, aLength = methodsArray.length; i < aLength; i++){
        methods += methodsArray[i];
      }
      for (var i = 0, aLength = constructorsArray.length; i < aLength; i++){
        constructors += constructorsArray[i];
      }
      arrayOfSuperClasses.push(thisSuperClass);
      rest = vars + "\n" + methods + "\n" + constructors;
      aCode = left + rest + "\n}" + staticVars + allRest;
    }

    // Do some tidying up, where necessary
    aCode = aCode.replace(/processing.\w+ = function addMethod/g, "addMethod");

    // Remove processing. from leftover functions
    aCode = aCode.replace(/processing\.((\w+) = function)/g, "$1");

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
    var toNumbers = function(str) {
      var ret = [];

      str.replace(/(..)/g, function(str) {
        ret.push(parseInt(str, 16));
      });

      return ret;
    };

    // Convert #aaaaaa into color
    aCode = aCode.replace(/#([a-f0-9]{6})/ig, function(m, hex) {
      var num = toNumbers(hex);
      return "defaultColor(" + num[0] + "," + num[1] + "," + num[2] + ")";
    });

    // Convert 3.0f to just 3.0
    aCode = aCode.replace(/(\d+)f/g, "$1");

    // replaces all masked strings from <STRING n> to the appropriate string contained in the strings array
    for (var n = 0, sl = strings.length; n < sl; n++) {
      aCode = (function() {
        return aCode.replace(new RegExp("(.*)(<STRING " + n + ">)(.*)", "g"), function(all, quoteStart, match, quoteEnd) {
          var returnString = all,
            notString = true,
            quoteType = "",
            escape = false;

          for (var x = 0, ql = quoteStart.length; x < ql; x++) {
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
            returnString = quoteStart + strings[n] + quoteEnd;
          }

          return returnString;
        });
      }());
    }
    return aCode;
  };

  // IE Unfriendly AJAX Method
  var ajax = function(url) {
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
  var init = function() {
    var canvas = document.getElementsByTagName('canvas');

    for (var i = 0, l = canvas.length; i < l; i++) {
      // datasrc and data-src are deprecated.
      var processingSources = canvas[i].getAttribute('data-processing-sources');
      if (processingSources === null) {
        // Temporary fallback for datasrc and data-src
        processingSources = canvas[i].getAttribute('data-src');
        if (processingSources === null) {
          processingSources = canvas[i].getAttribute('datasrc');
        }
      }
      if (processingSources) {
        // The problem: if the HTML canvas dimensions differ from the
        // dimensions specified in the size() call in the sketch, for
        // 3D sketches, browsers will either not render or render the
        // scene incorrectly. To fix this, we need to adjust the attributes
        // of the canvas width and height.
        // Get the source, we'll need to find what the user has used in size()
        var filenames = processingSources.split(' ');
        var code = "";
        for (var j=0, fl=filenames.length; j<fl; j++) {
          if (filenames[j]) {
            code += ajax(filenames[j]) + ";\n"; // deal with files that don't end with newline
          }
        }
        new Processing(canvas[i], code);
      }
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    init();
  }, false);

}());

