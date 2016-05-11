/** @namespace */
var geo = {};     // jshint ignore: line
window.geo = geo; // jshint ignore: line

geo.renderers = {};
geo.features = {};
geo.fileReaders = {};
geo.rendererLayerAdjustments = {};

//////////////////////////////////////////////////////////////////////////////
/**
 * Convenient function to define JS inheritance
 */
//////////////////////////////////////////////////////////////////////////////
geo.inherit = function (C, P) { // jshint ignore: line
  'use strict';

  var F = inherit.func();
  F.prototype = P.prototype;
  C.prototype = new F();
  C.prototype.constructor = C;
};
geo.inherit.func = function () {
  'use strict';
  return function () {};
};

// Should get rid of this at some point.
window.inherit = geo.inherit;

//////////////////////////////////////////////////////////////////////////////
/**
 * This is a helper method for generating new-style subclasses as an
 * alternative to the older `inherit` classes.  Note: these classes
 * intentionally don't support constructors for the moment.  We may
 * consider alternate semantics such as ES6 classes or stampit
 * (https://github.com/stampit-org/stampit) as an alternative to handling
 * private variables.
 *
 * @param {object?} props Instance methods and properties to add/override
 * @returns {object} The inherited object
 */
//////////////////////////////////////////////////////////////////////////////
geo.extend = function (props) {
  'use strict';
  var child = Object.create(this.prototype);
  $.extend(child.prototype, props || {});
  return child;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Register a new file reader type
 */
//////////////////////////////////////////////////////////////////////////////
geo.registerFileReader = function (name, func) {
  'use strict';

  if (geo.fileReaders === undefined) {
    geo.fileReaders = {};
  }

  geo.fileReaders[name] = func;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new file reader
 */
//////////////////////////////////////////////////////////////////////////////
geo.createFileReader = function (name, opts) {
  'use strict';

  if (geo.fileReaders.hasOwnProperty(name)) {
    return geo.fileReaders[name](opts);
  }
  return null;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Register a new renderer type
 */
//////////////////////////////////////////////////////////////////////////////
geo.registerRenderer = function (name, func) {
  'use strict';

  if (geo.renderers === undefined) {
    geo.renderers = {};
  }

  geo.renderers[name] = func;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create new instance of the renderer
 */
//////////////////////////////////////////////////////////////////////////////
geo.createRenderer = function (name, layer, canvas, options) {
  'use strict';

  if (geo.renderers.hasOwnProperty(name)) {
    var ren = geo.renderers[name](
      {layer: layer, canvas: canvas, options: options}
    );
    ren._init();
    return ren;
  }
  return null;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Check if the named renderer is supported.  If not, display a warning and get
 * the name of a fallback renderer.  Ideally, we would pass a list of desired
 * features, and, if the renderer is unavailable, this would choose a fallback
 * that would support those features.
 *
 * @params {string|null} name name of the desired renderer
 * @params {boolean} noFallack if true, don't recommend a fallback
 * @return {string|null|false} the name of the renderer that should be used
 *      of false if no valid renderer can be determined.
 */
//////////////////////////////////////////////////////////////////////////////
geo.checkRenderer = function (name, noFallback) {
  'use strict';
  if (name === null) {
    return name;
  }
  if (geo.renderers.hasOwnProperty(name)) {
    var ren = geo.renderers[name];
    if (!ren.supported || ren.supported()) {
      return name;
    }
    if (!ren.fallback || noFallback) {
      return false;
    }
    var fallback = geo.checkRenderer(ren.fallback(), true);
    if (fallback !== false) {
      console.warn(name + ' renderer is unavailable, using ' + fallback +
                   ' renderer instead');
    }
    return fallback;
  }
  return false;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Register a new feature type
 */
//////////////////////////////////////////////////////////////////////////////
geo.registerFeature = function (category, name, func) {
  'use strict';

  if (geo.features === undefined) {
    geo.features = {};
  }

  if (!(category in geo.features)) {
    geo.features[category] = {};
  }

  // TODO Add warning if the name already exists
  geo.features[category][name] = func;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create new instance of the renderer
 */
//////////////////////////////////////////////////////////////////////////////
geo.createFeature  = function (name, layer, renderer, arg) {
  'use strict';

  var category = renderer.api(),
      options = {'layer': layer, 'renderer': renderer};
  if (category in geo.features && name in geo.features[category]) {
    if (arg !== undefined) {
      $.extend(true, options, arg);
    }
    var feature = geo.features[category][name](options);
    layer.gcs = function () {
      return layer.map().gcs();
    };
    return feature;
  }
  return null;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Register a layer adjustment.
 */
//////////////////////////////////////////////////////////////////////////////
geo.registerLayerAdjustment = function (category, name, func) {
  'use strict';

  if (geo.rendererLayerAdjustments === undefined) {
    geo.rendererLayerAdjustments = {};
  }

  if (!(category in geo.rendererLayerAdjustments)) {
    geo.rendererLayerAdjustments[category] = {};
  }

  // TODO Add warning if the name already exists
  geo.rendererLayerAdjustments[category][name] = func;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * If a layer needs to be adjusted based on the renderer, call the function
 * that adjusts it.
 *
 * @param {string} name Name of the layer.
 * @param {object} layer Instantiated layer object.
 */
//////////////////////////////////////////////////////////////////////////////
geo.adjustLayerForRenderer = function (name, layer) {
  'use strict';
  var rendererName = layer.rendererName();
  if (rendererName) {
    if (geo.rendererLayerAdjustments &&
        geo.rendererLayerAdjustments[rendererName] &&
        geo.rendererLayerAdjustments[rendererName][name]) {
      geo.rendererLayerAdjustments[rendererName][name].apply(layer);
    }
  }
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Register a new layer type
 */
//////////////////////////////////////////////////////////////////////////////
geo.registerLayer = function (name, func) {
  'use strict';

  if (geo.layers === undefined) {
    geo.layers = {};
  }

  geo.layers[name] = func;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create new instance of the layer
 */
//////////////////////////////////////////////////////////////////////////////
geo.createLayer = function (name, map, arg) {
  'use strict';

  /// Default renderer is vgl
  var options = {'map': map, 'renderer': 'vgl'},
      layer = null;

  if (name in geo.layers) {
    if (arg !== undefined) {
      $.extend(true, options, arg);
    }
    layer = geo.layers[name](options);
    layer._init();
    return layer;
  } else {
    return null;
  }
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Register a new widget type
 */
//////////////////////////////////////////////////////////////////////////////
geo.registerWidget = function (category, name, func) {
  'use strict';

  if (geo.widgets === undefined) {
    geo.widgets = {};
  }

  if (!(category in geo.widgets)) {
    geo.widgets[category] = {};
  }

  // TODO Add warning if the name already exists
  geo.widgets[category][name] = func;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create new instance of the widget
 */
//////////////////////////////////////////////////////////////////////////////
geo.createWidget  = function (name, layer, arg) {
  'use strict';

  var options = {
    layer: layer
  };

  if (name in geo.widgets.dom) {
    if (arg !== undefined) {
      $.extend(true, options, arg);
    }

    return geo.widgets.dom[name](options);
  }

  throw new Error('Cannot create unknown widget ' + name);
};

// Add a polyfill for window.requestAnimationFrame.
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function (func) {
    'use strict';

    window.setTimeout(func, 15);
  };
}

// Add a polyfill for Math.log2
if (!Math.log2) {
  Math.log2 = function () {
    'use strict';

    return Math.log.apply(Math, arguments) / Math.LN2;
  };
}

// Add a polyfill for Math.sinh
Math.sinh = Math.sinh || function (x) {
  'use strict';
  var y = Math.exp(x);
  return (y - 1 / y) / 2;
};

/*global geo*/

geo.version = "0.7.0";

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl: true, ogs: true, inherit*/
/*exported vgl, inherit*/
//////////////////////////////////////////////////////////////////////////////

if (typeof ogs === 'undefined') {
  var ogs = {};
}

//////////////////////////////////////////////////////////////////////////////
/**
 * Create namespace for the given name
 *
 * @param ns_string
 * @returns {*|{}}
 */
//////////////////////////////////////////////////////////////////////////////
ogs.namespace = function (ns_string) {
  'use strict';

  var parts = ns_string.split('.'), parent = ogs, i;

  // strip redundant leading global
  if (parts[0] === 'ogs') {
    parts = parts.slice(1);
  }
  for (i = 0; i < parts.length; i += 1) {
    // create a property if it doesn't exist
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }
  return parent;
};

/** vgl namespace */
var vgl = ogs.namespace('gl');

//////////////////////////////////////////////////////////////////////////////
/**
 * Convenient function to define JS inheritance
 *
 * @param C
 * @param P
 */
//////////////////////////////////////////////////////////////////////////////
function inherit(C, P) {
  'use strict';

  var F = function () {
  };
  F.prototype = P.prototype;
  C.prototype = new F();
  C.uber = P.prototype;
  C.prototype.constructor = C;
}

//////////////////////////////////////////////////////////////////////////////
/**
 * Convenient function to get size of an object
 *
 * @param obj
 * @returns {number} *
 */
//////////////////////////////////////////////////////////////////////////////
Object.size = function (obj) {
  'use strict';

  var size = 0, key = null;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      size += 1;
    }
  }
  return size;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Wrap GL enums. Currently to get values of the enums we need to create
 * or access the context.
 *
 * Using enums from here:
 * https://github.com/toji/dart-gl-enums/blob/master/lib/gl_enums.dart
 *
 * @class
 */
//////////////////////////////////////////////////////////////////////////////
vgl.GL = {
  ACTIVE_ATTRIBUTES : 0x8B89,
  ACTIVE_TEXTURE : 0x84E0,
  ACTIVE_UNIFORMS : 0x8B86,
  ALIASED_LINE_WIDTH_RANGE : 0x846E,
  ALIASED_POINT_SIZE_RANGE : 0x846D,
  ALPHA : 0x1906,
  ALPHA_BITS : 0x0D55,
  ALWAYS : 0x0207,
  ARRAY_BUFFER : 0x8892,
  ARRAY_BUFFER_BINDING : 0x8894,
  ATTACHED_SHADERS : 0x8B85,
  BACK : 0x0405,
  BLEND : 0x0BE2,
  BLEND_COLOR : 0x8005,
  BLEND_DST_ALPHA : 0x80CA,
  BLEND_DST_RGB : 0x80C8,
  BLEND_EQUATION : 0x8009,
  BLEND_EQUATION_ALPHA : 0x883D,
  BLEND_EQUATION_RGB : 0x8009,
  BLEND_SRC_ALPHA : 0x80CB,
  BLEND_SRC_RGB : 0x80C9,
  BLUE_BITS : 0x0D54,
  BOOL : 0x8B56,
  BOOL_VEC2 : 0x8B57,
  BOOL_VEC3 : 0x8B58,
  BOOL_VEC4 : 0x8B59,
  BROWSER_DEFAULT_WEBGL : 0x9244,
  BUFFER_SIZE : 0x8764,
  BUFFER_USAGE : 0x8765,
  BYTE : 0x1400,
  CCW : 0x0901,
  CLAMP_TO_EDGE : 0x812F,
  COLOR_ATTACHMENT0 : 0x8CE0,
  COLOR_BUFFER_BIT : 0x00004000,
  COLOR_CLEAR_VALUE : 0x0C22,
  COLOR_WRITEMASK : 0x0C23,
  COMPILE_STATUS : 0x8B81,
  COMPRESSED_TEXTURE_FORMATS : 0x86A3,
  CONSTANT_ALPHA : 0x8003,
  CONSTANT_COLOR : 0x8001,
  CONTEXT_LOST_WEBGL : 0x9242,
  CULL_FACE : 0x0B44,
  CULL_FACE_MODE : 0x0B45,
  CURRENT_PROGRAM : 0x8B8D,
  CURRENT_VERTEX_ATTRIB : 0x8626,
  CW : 0x0900,
  DECR : 0x1E03,
  DECR_WRAP : 0x8508,
  DELETE_STATUS : 0x8B80,
  DEPTH_ATTACHMENT : 0x8D00,
  DEPTH_BITS : 0x0D56,
  DEPTH_BUFFER_BIT : 0x00000100,
  DEPTH_CLEAR_VALUE : 0x0B73,
  DEPTH_COMPONENT : 0x1902,
  DEPTH_COMPONENT16 : 0x81A5,
  DEPTH_FUNC : 0x0B74,
  DEPTH_RANGE : 0x0B70,
  DEPTH_STENCIL : 0x84F9,
  DEPTH_STENCIL_ATTACHMENT : 0x821A,
  DEPTH_TEST : 0x0B71,
  DEPTH_WRITEMASK : 0x0B72,
  DITHER : 0x0BD0,
  DONT_CARE : 0x1100,
  DST_ALPHA : 0x0304,
  DST_COLOR : 0x0306,
  DYNAMIC_DRAW : 0x88E8,
  ELEMENT_ARRAY_BUFFER : 0x8893,
  ELEMENT_ARRAY_BUFFER_BINDING : 0x8895,
  EQUAL : 0x0202,
  FASTEST : 0x1101,
  FLOAT : 0x1406,
  FLOAT_MAT2 : 0x8B5A,
  FLOAT_MAT3 : 0x8B5B,
  FLOAT_MAT4 : 0x8B5C,
  FLOAT_VEC2 : 0x8B50,
  FLOAT_VEC3 : 0x8B51,
  FLOAT_VEC4 : 0x8B52,
  FRAGMENT_SHADER : 0x8B30,
  FRAMEBUFFER : 0x8D40,
  FRAMEBUFFER_ATTACHMENT_OBJECT_NAME : 0x8CD1,
  FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE : 0x8CD0,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE : 0x8CD3,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL : 0x8CD2,
  FRAMEBUFFER_BINDING : 0x8CA6,
  FRAMEBUFFER_COMPLETE : 0x8CD5,
  FRAMEBUFFER_INCOMPLETE_ATTACHMENT : 0x8CD6,
  FRAMEBUFFER_INCOMPLETE_DIMENSIONS : 0x8CD9,
  FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT : 0x8CD7,
  FRAMEBUFFER_UNSUPPORTED : 0x8CDD,
  FRONT : 0x0404,
  FRONT_AND_BACK : 0x0408,
  FRONT_FACE : 0x0B46,
  FUNC_ADD : 0x8006,
  FUNC_REVERSE_SUBTRACT : 0x800B,
  FUNC_SUBTRACT : 0x800A,
  GENERATE_MIPMAP_HINT : 0x8192,
  GEQUAL : 0x0206,
  GREATER : 0x0204,
  GREEN_BITS : 0x0D53,
  HIGH_FLOAT : 0x8DF2,
  HIGH_INT : 0x8DF5,
  INCR : 0x1E02,
  INCR_WRAP : 0x8507,
  INT : 0x1404,
  INT_VEC2 : 0x8B53,
  INT_VEC3 : 0x8B54,
  INT_VEC4 : 0x8B55,
  INVALID_ENUM : 0x0500,
  INVALID_FRAMEBUFFER_OPERATION : 0x0506,
  INVALID_OPERATION : 0x0502,
  INVALID_VALUE : 0x0501,
  INVERT : 0x150A,
  KEEP : 0x1E00,
  LEQUAL : 0x0203,
  LESS : 0x0201,
  LINEAR : 0x2601,
  LINEAR_MIPMAP_LINEAR : 0x2703,
  LINEAR_MIPMAP_NEAREST : 0x2701,
  LINES : 0x0001,
  LINE_LOOP : 0x0002,
  LINE_STRIP : 0x0003,
  LINE_WIDTH : 0x0B21,
  LINK_STATUS : 0x8B82,
  LOW_FLOAT : 0x8DF0,
  LOW_INT : 0x8DF3,
  LUMINANCE : 0x1909,
  LUMINANCE_ALPHA : 0x190A,
  MAX_COMBINED_TEXTURE_IMAGE_UNITS : 0x8B4D,
  MAX_CUBE_MAP_TEXTURE_SIZE : 0x851C,
  MAX_FRAGMENT_UNIFORM_VECTORS : 0x8DFD,
  MAX_RENDERBUFFER_SIZE : 0x84E8,
  MAX_TEXTURE_IMAGE_UNITS : 0x8872,
  MAX_TEXTURE_SIZE : 0x0D33,
  MAX_VARYING_VECTORS : 0x8DFC,
  MAX_VERTEX_ATTRIBS : 0x8869,
  MAX_VERTEX_TEXTURE_IMAGE_UNITS : 0x8B4C,
  MAX_VERTEX_UNIFORM_VECTORS : 0x8DFB,
  MAX_VIEWPORT_DIMS : 0x0D3A,
  MEDIUM_FLOAT : 0x8DF1,
  MEDIUM_INT : 0x8DF4,
  MIRRORED_REPEAT : 0x8370,
  NEAREST : 0x2600,
  NEAREST_MIPMAP_LINEAR : 0x2702,
  NEAREST_MIPMAP_NEAREST : 0x2700,
  NEVER : 0x0200,
  NICEST : 0x1102,
  NONE : 0,
  NOTEQUAL : 0x0205,
  NO_ERROR : 0,
  ONE : 1,
  ONE_MINUS_CONSTANT_ALPHA : 0x8004,
  ONE_MINUS_CONSTANT_COLOR : 0x8002,
  ONE_MINUS_DST_ALPHA : 0x0305,
  ONE_MINUS_DST_COLOR : 0x0307,
  ONE_MINUS_SRC_ALPHA : 0x0303,
  ONE_MINUS_SRC_COLOR : 0x0301,
  OUT_OF_MEMORY : 0x0505,
  PACK_ALIGNMENT : 0x0D05,
  POINTS : 0x0000,
  POLYGON_OFFSET_FACTOR : 0x8038,
  POLYGON_OFFSET_FILL : 0x8037,
  POLYGON_OFFSET_UNITS : 0x2A00,
  RED_BITS : 0x0D52,
  RENDERBUFFER : 0x8D41,
  RENDERBUFFER_ALPHA_SIZE : 0x8D53,
  RENDERBUFFER_BINDING : 0x8CA7,
  RENDERBUFFER_BLUE_SIZE : 0x8D52,
  RENDERBUFFER_DEPTH_SIZE : 0x8D54,
  RENDERBUFFER_GREEN_SIZE : 0x8D51,
  RENDERBUFFER_HEIGHT : 0x8D43,
  RENDERBUFFER_INTERNAL_FORMAT : 0x8D44,
  RENDERBUFFER_RED_SIZE : 0x8D50,
  RENDERBUFFER_STENCIL_SIZE : 0x8D55,
  RENDERBUFFER_WIDTH : 0x8D42,
  RENDERER : 0x1F01,
  REPEAT : 0x2901,
  REPLACE : 0x1E01,
  RGB : 0x1907,
  RGB565 : 0x8D62,
  RGB5_A1 : 0x8057,
  RGBA : 0x1908,
  RGBA4 : 0x8056,
  SAMPLER_2D : 0x8B5E,
  SAMPLER_CUBE : 0x8B60,
  SAMPLES : 0x80A9,
  SAMPLE_ALPHA_TO_COVERAGE : 0x809E,
  SAMPLE_BUFFERS : 0x80A8,
  SAMPLE_COVERAGE : 0x80A0,
  SAMPLE_COVERAGE_INVERT : 0x80AB,
  SAMPLE_COVERAGE_VALUE : 0x80AA,
  SCISSOR_BOX : 0x0C10,
  SCISSOR_TEST : 0x0C11,
  SHADER_TYPE : 0x8B4F,
  SHADING_LANGUAGE_VERSION : 0x8B8C,
  SHORT : 0x1402,
  SRC_ALPHA : 0x0302,
  SRC_ALPHA_SATURATE : 0x0308,
  SRC_COLOR : 0x0300,
  STATIC_DRAW : 0x88E4,
  STENCIL_ATTACHMENT : 0x8D20,
  STENCIL_BACK_FAIL : 0x8801,
  STENCIL_BACK_FUNC : 0x8800,
  STENCIL_BACK_PASS_DEPTH_FAIL : 0x8802,
  STENCIL_BACK_PASS_DEPTH_PASS : 0x8803,
  STENCIL_BACK_REF : 0x8CA3,
  STENCIL_BACK_VALUE_MASK : 0x8CA4,
  STENCIL_BACK_WRITEMASK : 0x8CA5,
  STENCIL_BITS : 0x0D57,
  STENCIL_BUFFER_BIT : 0x00000400,
  STENCIL_CLEAR_VALUE : 0x0B91,
  STENCIL_FAIL : 0x0B94,
  STENCIL_FUNC : 0x0B92,
  STENCIL_INDEX : 0x1901,
  STENCIL_INDEX8 : 0x8D48,
  STENCIL_PASS_DEPTH_FAIL : 0x0B95,
  STENCIL_PASS_DEPTH_PASS : 0x0B96,
  STENCIL_REF : 0x0B97,
  STENCIL_TEST : 0x0B90,
  STENCIL_VALUE_MASK : 0x0B93,
  STENCIL_WRITEMASK : 0x0B98,
  STREAM_DRAW : 0x88E0,
  SUBPIXEL_BITS : 0x0D50,
  TEXTURE : 0x1702,
  TEXTURE0 : 0x84C0,
  TEXTURE1 : 0x84C1,
  TEXTURE10 : 0x84CA,
  TEXTURE11 : 0x84CB,
  TEXTURE12 : 0x84CC,
  TEXTURE13 : 0x84CD,
  TEXTURE14 : 0x84CE,
  TEXTURE15 : 0x84CF,
  TEXTURE16 : 0x84D0,
  TEXTURE17 : 0x84D1,
  TEXTURE18 : 0x84D2,
  TEXTURE19 : 0x84D3,
  TEXTURE2 : 0x84C2,
  TEXTURE20 : 0x84D4,
  TEXTURE21 : 0x84D5,
  TEXTURE22 : 0x84D6,
  TEXTURE23 : 0x84D7,
  TEXTURE24 : 0x84D8,
  TEXTURE25 : 0x84D9,
  TEXTURE26 : 0x84DA,
  TEXTURE27 : 0x84DB,
  TEXTURE28 : 0x84DC,
  TEXTURE29 : 0x84DD,
  TEXTURE3 : 0x84C3,
  TEXTURE30 : 0x84DE,
  TEXTURE31 : 0x84DF,
  TEXTURE4 : 0x84C4,
  TEXTURE5 : 0x84C5,
  TEXTURE6 : 0x84C6,
  TEXTURE7 : 0x84C7,
  TEXTURE8 : 0x84C8,
  TEXTURE9 : 0x84C9,
  TEXTURE_2D : 0x0DE1,
  TEXTURE_BINDING_2D : 0x8069,
  TEXTURE_BINDING_CUBE_MAP : 0x8514,
  TEXTURE_CUBE_MAP : 0x8513,
  TEXTURE_CUBE_MAP_NEGATIVE_X : 0x8516,
  TEXTURE_CUBE_MAP_NEGATIVE_Y : 0x8518,
  TEXTURE_CUBE_MAP_NEGATIVE_Z : 0x851A,
  TEXTURE_CUBE_MAP_POSITIVE_X : 0x8515,
  TEXTURE_CUBE_MAP_POSITIVE_Y : 0x8517,
  TEXTURE_CUBE_MAP_POSITIVE_Z : 0x8519,
  TEXTURE_MAG_FILTER : 0x2800,
  TEXTURE_MIN_FILTER : 0x2801,
  TEXTURE_WRAP_S : 0x2802,
  TEXTURE_WRAP_T : 0x2803,
  TRIANGLES : 0x0004,
  TRIANGLE_FAN : 0x0006,
  TRIANGLE_STRIP : 0x0005,
  UNPACK_ALIGNMENT : 0x0CF5,
  UNPACK_COLORSPACE_CONVERSION_WEBGL : 0x9243,
  UNPACK_FLIP_Y_WEBGL : 0x9240,
  UNPACK_PREMULTIPLY_ALPHA_WEBGL : 0x9241,
  UNSIGNED_BYTE : 0x1401,
  UNSIGNED_INT : 0x1405,
  UNSIGNED_SHORT : 0x1403,
  UNSIGNED_SHORT_4_4_4_4 : 0x8033,
  UNSIGNED_SHORT_5_5_5_1 : 0x8034,
  UNSIGNED_SHORT_5_6_5 : 0x8363,
  VALIDATE_STATUS : 0x8B83,
  VENDOR : 0x1F00,
  VERSION : 0x1F02,
  VERTEX_ATTRIB_ARRAY_BUFFER_BINDING : 0x889F,
  VERTEX_ATTRIB_ARRAY_ENABLED : 0x8622,
  VERTEX_ATTRIB_ARRAY_NORMALIZED : 0x886A,
  VERTEX_ATTRIB_ARRAY_POINTER : 0x8645,
  VERTEX_ATTRIB_ARRAY_SIZE : 0x8623,
  VERTEX_ATTRIB_ARRAY_STRIDE : 0x8624,
  VERTEX_ATTRIB_ARRAY_TYPE : 0x8625,
  VERTEX_SHADER : 0x8B31,
  VIEWPORT : 0x0BA2,
  ZERO : 0
};

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class timestamp
 *
 * @class
 * @returns {vgl.timestamp}
 */
//////////////////////////////////////////////////////////////////////////////
var m_globalModifiedTime = 0;

vgl.timestamp = function () {
  'use strict';

  if (!(this instanceof vgl.timestamp)) {
    return new vgl.timestamp();
  }

  var m_modifiedTime = 0;

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Update modified time
   */
  /////////////////////////////////////////////////////////////////////////////
  this.modified = function () {
    m_globalModifiedTime += 1;
    m_modifiedTime = m_globalModifiedTime;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get modified time
   *
   * @returns {number}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.getMTime = function () {
    return m_modifiedTime;
  };
};

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class object
 *
 * @class
 * @returns {vgl.object}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.object = function () {
  'use strict';

  if (!(this instanceof vgl.object)) {
    return new vgl.object();
  }

  /** @private */
  var m_modifiedTime = vgl.timestamp();
  m_modifiedTime.modified();

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Mark the object modified
   */
  ////////////////////////////////////////////////////////////////////////////
  this.modified = function () {
    m_modifiedTime.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return modified time of the object
   *
   * @returns {*}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.getMTime = function () {
    return m_modifiedTime.getMTime();
  };

  return this;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class event
 *
 * @class event
 * @returns {vgl.event}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.event = function () {
  'use strict';

  if (!(this instanceof vgl.event)) {
    return new vgl.event();
  }
  vgl.object.call(this);

  return this;
};

inherit(vgl.event, vgl.object);

//////////////////////////////////////////////////////////////////////////////
/**
 *  types
 */
//////////////////////////////////////////////////////////////////////////////
vgl.event.keyPress = 'vgl.event.keyPress';
vgl.event.mousePress = 'vgl.event.mousePress';
vgl.event.mouseRelease = 'vgl.event.mouseRelease';
vgl.event.contextMenu = 'vgl.event.contextMenu';
vgl.event.configure = 'vgl.event.configure';
vgl.event.enable = 'vgl.event.enable';
vgl.event.mouseWheel = 'vgl.event.mouseWheel';
vgl.event.keyRelease = 'vgl.event.keyRelease';
vgl.event.middleButtonPress = 'vgl.event.middleButtonPress';
vgl.event.startInteraction = 'vgl.event.startInteraction';
vgl.event.enter = 'vgl.event.enter';
vgl.event.rightButtonPress = 'vgl.event.rightButtonPress';
vgl.event.middleButtonRelease = 'vgl.event.middleButtonRelease';
vgl.event.char = 'vgl.event.char';
vgl.event.disable = 'vgl.event.disable';
vgl.event.endInteraction = 'vgl.event.endInteraction';
vgl.event.mouseMove = 'vgl.event.mouseMove';
vgl.event.mouseOut = 'vgl.event.mouseOut';
vgl.event.expose = 'vgl.event.expose';
vgl.event.timer = 'vgl.event.timer';
vgl.event.leftButtonPress = 'vgl.event.leftButtonPress';
vgl.event.leave = 'vgl.event.leave';
vgl.event.rightButtonRelease = 'vgl.event.rightButtonRelease';
vgl.event.leftButtonRelease = 'vgl.event.leftButtonRelease';
vgl.event.click = 'vgl.event.click';
vgl.event.dblClick = 'vgl.event.dblClick';

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class boundingObject
 *
 * @class
 * @return {vgl.boundingObject}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.boundingObject = function () {
  'use strict';

  if (!(this instanceof vgl.boundingObject)) {
    return new vgl.boundingObject();
  }
  vgl.object.call(this);

  /** @private */
  var m_bounds = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      m_computeBoundsTimestamp = vgl.timestamp(),
      m_boundsDirtyTimestamp = vgl.timestamp();

  m_computeBoundsTimestamp.modified();
  m_boundsDirtyTimestamp.modified();

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get current bounds of the object
   */
  ////////////////////////////////////////////////////////////////////////////
  this.bounds = function () {
    return m_bounds;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Check if bounds are valid
   */
  ////////////////////////////////////////////////////////////////////////////
  this.hasValidBounds = function (bounds) {
    if (bounds[0] === Number.MAX_VALUE ||
        bounds[1] === -Number.MAX_VALUE ||
        bounds[2] === Number.MAX_VALUE ||
        bounds[3] === -Number.MAX_VALUE ||
        bounds[4] === Number.MAX_VALUE ||
        bounds[5] === -Number.MAX_VALUE) {
      return false;
    }

    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set current bounds of the object
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setBounds = function (minX, maxX, minY, maxY, minZ, maxZ) {
    if (!this.hasValidBounds([minX, maxX, minY, maxY, minZ, maxZ])) {
      return;
    }

    m_bounds[0] = minX;
    m_bounds[1] = maxX;
    m_bounds[2] = minY;
    m_bounds[3] = maxY;
    m_bounds[4] = minZ;
    m_bounds[5] = maxZ;

    this.modified();
    m_computeBoundsTimestamp.modified();

    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Reset bounds to default values
   */
  ////////////////////////////////////////////////////////////////////////////
  this.resetBounds = function () {
    m_bounds[0] = Number.MAX_VALUE;
    m_bounds[1] = -Number.MAX_VALUE;
    m_bounds[2] = Number.MAX_VALUE;
    m_bounds[3] = -Number.MAX_VALUE;
    m_bounds[4] = Number.MAX_VALUE;
    m_bounds[5] = -Number.MAX_VALUE;

    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Compute bounds of the object
   *
   * Should be implemented by the concrete class
   */
  ////////////////////////////////////////////////////////////////////////////
  this.computeBounds = function () {
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return bounds computation modification time
   *
   * @returns {vgl.timestamp}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.computeBoundsTimestamp = function () {
    return m_computeBoundsTimestamp;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return bounds dirty timestamp
   *
   * @returns {vgl.timestamp}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.boundsDirtyTimestamp = function () {
    return m_boundsDirtyTimestamp;
  };

  this.resetBounds();

  return this;
};

vgl.boundingObject.ReferenceFrame = {
  'Relative' : 0,
  'Absolute' : 1
};

inherit(vgl.boundingObject, vgl.object);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class node
 *
 * @class
 * @returns {vgl.node}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.node = function () {
  'use strict';

  if (!(this instanceof vgl.node)) {
    return new vgl.node();
  }
  vgl.boundingObject.call(this);

  /** @private */
  var m_parent = null,
      m_material = null,
      m_visible = true,
      m_overlay = false;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Accept visitor for scene traversal
   */
  ////////////////////////////////////////////////////////////////////////////
  this.accept = function (visitor) {
    visitor.visit(this);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return active material used by the node
   */
  ////////////////////////////////////////////////////////////////////////////
  this.material = function () {
    return m_material;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set material to be used the node
   *
   * @param material
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setMaterial = function (material) {
    if (material !== m_material) {
      m_material = material;
      this.modified();
      return true;
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Check if the node is visible or node
   *
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.visible = function () {
    return m_visible;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Turn ON/OFF visibility of the node
   *
   * @param flag
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setVisible = function (flag) {
    if (flag !== m_visible) {
      m_visible = flag;
      this.modified();
      return true;
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return current parent of the node
   *
   * @returns {null}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.parent = function () {
    return m_parent;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set parent of the node
   *
   * @param parent
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setParent = function (parent) {
    if (parent !== m_parent) {
      if (m_parent !== null) {
        m_parent.removeChild(this);
      }
      m_parent = parent;
      this.modified();
      return true;
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Check if the node is an overlay node
   *
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.overlay = function () {
    return m_overlay;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set if the node is an overlay node or not
   *
   * @param flag
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setOverlay = function (flag) {
    if (m_overlay !== flag) {
      m_overlay = flag;
      this.modified();
      return true;
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /*
   * Traverse parent and their parent and so on
   */
  ////////////////////////////////////////////////////////////////////////////
  this.ascend = function (visitor) {
    visitor = visitor; /* unused parameter */
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Traverse children
   */
  ////////////////////////////////////////////////////////////////////////////
  this.traverse = function (visitor) {
    visitor = visitor; /* unused parameter */
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Mark that the bounds are modified
   *
   */
  ////////////////////////////////////////////////////////////////////////////
  this.boundsModified = function () {
    // @todo Implement this
    this.boundsDirtyTimestamp().modified();

    if (m_parent !== null) {
      m_parent.boundsModified();
    }
  };

  return this;
};

inherit(vgl.node, vgl.boundingObject);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class groupNode
 *
 * @class
 * @returns {vgl.groupNode}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.groupNode = function () {
  'use strict';

  if (!(this instanceof vgl.groupNode)) {
    return new vgl.groupNode();
  }
  vgl.node.call(this);

  var m_children = [];

  // Reference to base class methods
  this.b_setVisible = this.setVisible;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Turn on / off visibility
   *
   * @param flag
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setVisible = function (flag) {
    var i;

    if (this.b_setVisible(flag) !== true) {
      return false;
    }

    for (i = 0; i < m_children.length; i += 1) {
      m_children[i].setVisible(flag);
    }

    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Make the incoming node as child of the group node
   *
   * @param childNode
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.addChild = function (childNode) {
    if (childNode instanceof vgl.node) {
      if (m_children.indexOf(childNode) === -1) {
        childNode.setParent(this);
        m_children.push(childNode);
        this.boundsDirtyTimestamp().modified();
        return true;
      }
      return false;
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Remove parent-child relationship between the group and incoming node
   *
   * @param childNode
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.removeChild = function (childNode) {
    if (childNode.parent() === this) {
      var index = m_children.indexOf(childNode);
      m_children.splice(index, 1);
      this.boundsDirtyTimestamp().modified();
      return true;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Remove parent-child relationship between child nodes and the group node
   */
  ////////////////////////////////////////////////////////////////////////////
  this.removeChildren = function () {
    var i;
    for (i = 0; i < m_children.length; i += 1) {
      this.removeChild(m_children[i]);
    }

    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return children of this group node
   *
   * @returns {Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.children = function () {
    return m_children;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return true if this group node has node as a child, false otherwise.
   *
   * @param node
   * @returns {bool}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.hasChild = function (node) {
    var i = 0, child = false;

    for (i = 0; i < m_children.length; i += 1) {
      if (m_children[i] === node) {
        child = true;
        break;
      }
    }

    return child;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Accept a visitor and traverse the scene tree
   *
   * @param visitor
   */
  ////////////////////////////////////////////////////////////////////////////
  this.accept = function (visitor) {
    visitor.visit(this);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Traverse the scene
   *
   * @param visitor
   */
  ////////////////////////////////////////////////////////////////////////////
  this.traverse = function (visitor) {
    switch (visitor.type()) {
      case visitor.UpdateVisitor:
        this.traverseChildrenAndUpdateBounds(visitor);
        break;
      case visitor.CullVisitor:
        this.traverseChildren(visitor);
        break;
      default:
        break;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Traverse all of the children and update the bounds for each
   *
   * @param visitor
   */
  ////////////////////////////////////////////////////////////////////////////
  this.traverseChildrenAndUpdateBounds = function (visitor) {
    var i;

    if (this.m_parent && this.boundsDirtyTimestamp().getMTime() >
      this.computeBoundsTimestamp().getMTime()) {
      // Flag parents bounds dirty.
      this.m_parent.boundsDirtyTimestamp.modified();
    }

    this.computeBounds();

    if (visitor.mode() === visitor.TraverseAllChildren) {
      for (i = 0; i < m_children.length(); i += 1) {
        m_children[i].accept(visitor);
        this.updateBounds(m_children[i]);
      }
    }

    this.computeBoundsTimestamp().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Traverse children of the group node
   *
   * @param visitor
   */
  ////////////////////////////////////////////////////////////////////////////
  this.traverseChildren = function (visitor) {
    var i;

    if (visitor.mode() === vgl.vesVisitor.TraverseAllChildren) {
      for (i = 0; i < m_children.length(); i += 1) {
        m_children[i].accept(visitor);
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Compute bounds for the group node
   */
  ////////////////////////////////////////////////////////////////////////////
  this.computeBounds = function () {
    var i = 0;

    if (this.computeBoundsTimestamp().getMTime() >
        this.boundsDirtyTimestamp().getMTime()) {
      return;
    }

    for (i = 0; i < m_children.length; i += 1) {
      this.updateBounds(m_children[i]);
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update bounds for the group node
   *
   * This method is used internally to update bounds of the group node by
   * traversing each of its child.
   *
   * @param child
   */
  ////////////////////////////////////////////////////////////////////////////
  this.updateBounds = function (child) {
    // FIXME: This check should not be required and possibly is incorrect
    if (child.overlay()) {
      return;
    }

    // Make sure that child bounds are upto date
    child.computeBounds();

    var bounds = this.bounds(),
        childBounds = child.bounds(),
        istep = 0,
        jstep = 0,
        i;

    for (i = 0; i < 3; i += 1) {
      istep = i * 2;
      jstep = i * 2 + 1;
      if (childBounds[istep] < bounds[istep]) {
        bounds[istep] = childBounds[istep];
      }
      if (childBounds[jstep] > bounds[jstep]) {
        bounds[jstep] = childBounds[jstep];
      }
    }

    this.setBounds(bounds[0], bounds[1], bounds[2], bounds[3],
                   bounds[4], bounds[5]);
  };

  return this;
};

inherit(vgl.groupNode, vgl.node);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, vec3, mat4, inherit*/
//////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class actor
 *
 * @class
 * @returns {vgl.actor}
 */
////////////////////////////////////////////////////////////////////////////
vgl.actor = function () {
  'use strict';

  if (!(this instanceof vgl.actor)) {
    return new vgl.actor();
  }
  vgl.node.call(this);

  /** @private */
  var m_this = this,
      m_transformMatrix = mat4.create(),
      m_referenceFrame = vgl.boundingObject.ReferenceFrame.Relative,
      m_mapper = null;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get transformation matrix used by the actor
   *
   * @returns {mat4}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.matrix = function () {
    return m_transformMatrix;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set transformation matrix for the actor
   *
   * @param {mat4} 4X4 transformation matrix
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setMatrix = function (tmatrix) {
    if (tmatrix !== m_transformMatrix) {
      m_transformMatrix = tmatrix;
      m_this.modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get reference frame for the transformations
   *
   * @returns {String} Possible values are Absolute or Relative
   */
  ////////////////////////////////////////////////////////////////////////////
  this.referenceFrame = function () {
    return m_referenceFrame;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set reference frame for the transformations
   *
   * @param {vgl.boundingObject.ReferenceFrame}
   * referenceFrame Possible values are (Absolute | Relative)
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setReferenceFrame = function (referenceFrame) {
    if (referenceFrame !== m_referenceFrame) {
      m_referenceFrame = referenceFrame;
      m_this.modified();
      return true;
    }
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return mapper where actor gets it behavior and data
   *
   * @returns {vgl.mapper}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.mapper = function () {
    return m_mapper;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Connect an actor to its data source
   *
   * @param {vgl.mapper}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setMapper = function (mapper) {
    if (mapper !== m_mapper) {
      m_mapper = mapper;
      m_this.boundsModified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @todo
   */
  ////////////////////////////////////////////////////////////////////////////
  this.accept = function (visitor) {
    visitor = visitor; /* ignore this parameter */
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @todo
   */
  ////////////////////////////////////////////////////////////////////////////
  this.ascend = function (visitor) {
    visitor = visitor; /* ignore this parameter */
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Compute object space to world space matrix
   * @todo
   */
  ////////////////////////////////////////////////////////////////////////////
  this.computeLocalToWorldMatrix = function (matrix, visitor) {
    matrix = matrix; /* ignore this parameter */
    visitor = visitor; /* ignore this parameter */
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Compute world space to object space matrix
   * @todo
   */
  ////////////////////////////////////////////////////////////////////////////
  this.computeWorldToLocalMatrix = function (matrix, visitor) {
    matrix = matrix; /* ignore this parameter */
    visitor = visitor; /* ignore this parameter */
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Compute actor bounds
   */
  ////////////////////////////////////////////////////////////////////////////
  this.computeBounds = function () {
    if (m_mapper === null || m_mapper === undefined) {
      m_this.resetBounds();
      return;
    }

    var computeBoundsTimestamp = m_this.computeBoundsTimestamp(),
        mapperBounds, minPt, maxPt, newBounds;

    if (m_this.boundsDirtyTimestamp().getMTime() > computeBoundsTimestamp.getMTime() ||
      m_mapper.boundsDirtyTimestamp().getMTime() > computeBoundsTimestamp.getMTime()) {

      m_mapper.computeBounds();
      mapperBounds = m_mapper.bounds();

      minPt = [mapperBounds[0], mapperBounds[2], mapperBounds[4]];
      maxPt = [mapperBounds[1], mapperBounds[3], mapperBounds[5]];

      vec3.transformMat4(minPt, minPt, m_transformMatrix);
      vec3.transformMat4(maxPt, maxPt, m_transformMatrix);

      newBounds = [
        minPt[0] > maxPt[0] ? maxPt[0] : minPt[0],
        minPt[0] > maxPt[0] ? minPt[0] : maxPt[0],
        minPt[1] > maxPt[1] ? maxPt[1] : minPt[1],
        minPt[1] > maxPt[1] ? minPt[1] : maxPt[1],
        minPt[2] > maxPt[2] ? maxPt[2] : minPt[2],
        minPt[2] > maxPt[2] ? minPt[2] : maxPt[2]
      ];

      m_this.setBounds(newBounds[0], newBounds[1],
                     newBounds[2], newBounds[3],
                     newBounds[4], newBounds[5]);

      computeBoundsTimestamp.modified();
    }
  };

  return m_this;
};

inherit(vgl.actor, vgl.node);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Freeze javascript object
 *
 * @param obj
 */
//////////////////////////////////////////////////////////////////////////////
vgl.freezeObject = function (obj) {
  'use strict';

  /**
   * Freezes an object, using Object.freeze if available, otherwise returns
   * the object unchanged.  This function should be used in setup code to prevent
   * errors from completely halting JavaScript execution in legacy browsers.
   *
   * @exports freezeObject
   */
  var freezedObject = Object.freeze(obj);
  if (typeof freezedObject === 'undefined') {
    freezedObject = function (o) {
      return o;
    };
  }

  return freezedObject;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Returns the first parameter if not undefined,
 * otherwise the second parameter.
 *
 * @class
 * @returns {vgl.defaultValue}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.defaultValue = function (a, b) {
  'use strict';

  if (typeof a !== 'undefined') {
    return a;
  }
  return b;
};

vgl.defaultValue.EMPTY_OBJECT = vgl.freezeObject({});

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class graphicsObject
 *
 * @class
 * @param type
 * @returns {vgl.graphicsObject}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.graphicsObject = function (type) {
  'use strict';

  type = type; /* unused parameter */
  if (!(this instanceof vgl.graphicsObject)) {
    return new vgl.graphicsObject();
  }
  vgl.object.call(this);

  var m_this = this;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Setup (initialize) the object
   *
   * @param renderState
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this._setup = function (renderState) {
    renderState = renderState; /* unused parameter */
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Remove any resources acquired before deletion
   *
   * @param renderState
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this._cleanup = function (renderState) {
    renderState = renderState; /* unused parameter */
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Bind and activate
   *
   * @param renderState
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.bind = function (renderState) {
    renderState = renderState; /* unused parameter */
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Undo bind and deactivate
   *
   * @param renderState
   * @returns {boolean}
   *
   * TODO: Change it to unbind (simple)
   */
  ////////////////////////////////////////////////////////////////////////////
  this.undoBind = function (renderState) {
    renderState = renderState; /* unused parameter */
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Render the object
   */
  ////////////////////////////////////////////////////////////////////////////
  this.render = function (renderState) {
    renderState = renderState; /* unused parameter */
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Remove the object and release its graphics resources
   */
  ////////////////////////////////////////////////////////////////////////////
  this.remove = function (renderState) {
    m_this._cleanup(renderState);
  };

  return m_this;
};

inherit(vgl.graphicsObject, vgl.object);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, Uint16Array*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of geojson reader
 *
 * This contains code that reads a geoJSON file and produces rendering
 * primitives from it.
 *
 * @class
 * @returns {vgl.geojsonReader}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.geojsonReader = function () {
  'use strict';

  if (!(this instanceof vgl.geojsonReader)) {
    return new vgl.geojsonReader();
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Read scalars
   *
   * @param coordinates
   * @param geom
   * @param size_estimate
   * @param idx
   */
  ////////////////////////////////////////////////////////////////////////////
  this.readScalars = function (coordinates, geom, size_estimate, idx) {
    var array = null,
        s = null,
        r  = null,
        g = null,
        b = null;

    if (this.m_scalarFormat === 'values' && coordinates.length === 4) {
      s = coordinates[3];
      array = geom.sourceData(vgl.vertexAttributeKeys.Scalar);

      if (!array) {
        array = new vgl.sourceDataSf();
        if (this.m_scalarRange) {
          array.setScalarRange(this.m_scalarRange[0], this.m_scalarRange[1]);
        }
        if (size_estimate !== undefined) {
          //array.length = size_estimate; //no, slow on Safari
          array.data().length = size_estimate;
        }
        geom.addSource(array);
      }
      if (size_estimate === undefined) {
        array.pushBack(s);
      } else {
        array.insertAt(idx, s);
      }
    } else if (this.m_scalarFormat === 'rgb' && coordinates.length === 6) {
      array = geom.sourceData(vgl.vertexAttributeKeys.Color);
      if (!array) {
        array = new vgl.sourceDataC3fv();
        if (size_estimate !== undefined) {
          array.length = size_estimate * 3;
        }
        geom.addSource(array);
      }
      r = coordinates[3];
      g = coordinates[4];
      b = coordinates[5];
      if (size_estimate === undefined) {
        array.pushBack([r, g, b]);
      } else {
        array.insertAt(idx, [r, g, b]);
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Read point data
   *
   * @param coordinates
   * @returns {vgl.geometryData}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.readPoint = function (coordinates) {
    var geom = new vgl.geometryData(),
        vglpoints = new vgl.points(),
        vglcoords = new vgl.sourceDataP3fv(),
        indices = new Uint16Array(1),
        x = null,
        y = null,
        z = null,
        i = null;

    geom.addSource(vglcoords);
    for (i = 0; i < 1; i += 1) {
      indices[i] = i;

      x = coordinates[0];
      y = coordinates[1];
      z = 0.0;
      if (coordinates.length > 2) {
        z = coordinates[2];
      }

      //console.log('read ' + x + ',' + y + ',' + z);
      vglcoords.pushBack([x, y, z]);

      //attributes
      this.readScalars(coordinates, geom);
    }

    vglpoints.setIndices(indices);
    geom.addPrimitive(vglpoints);
    geom.setName('aPoint');
    return geom;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Read multipoint data
   *
   * @param coordinates
   * @returns {vgl.geometryData}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.readMultiPoint = function (coordinates) {
    var geom = new vgl.geometryData(),
        vglpoints = new vgl.points(),
        vglcoords = new vgl.sourceDataP3fv(),
        indices = new Uint16Array(coordinates.length),
        pntcnt = 0,
        estpntcnt = coordinates.length,
        x = null,
        y = null,
        z = null,
        i;

    //preallocate with size estimate
    vglcoords.data().length = estpntcnt * 3; //x,y,z

    for (i = 0; i < coordinates.length; i += 1) {
      indices[i] = i;
      x = coordinates[i][0];
      y = coordinates[i][1];
      z = 0.0;
      if (coordinates[i].length > 2) {
        z = coordinates[i][2];
      }

      //console.log('read ' + x + ',' + y + ',' + z);
      vglcoords.insertAt(pntcnt, [x, y, z]);

      //attributes
      this.readScalars(coordinates[i], geom, estpntcnt, pntcnt);

      pntcnt += 1;
    }

    vglpoints.setIndices(indices);
    geom.addPrimitive(vglpoints);
    geom.addSource(vglcoords);
    geom.setName('manyPoints');
    return geom;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Read line string data
   *
   * @param coordinates
   * @returns {vgl.geometryData}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.readLineString = function (coordinates) {
    var geom = new vgl.geometryData(),
        vglline = new vgl.lineStrip(),
        vglcoords = new vgl.sourceDataP3fv(),
        indices = [],
        i = null,
        x = null,
        y = null,
        z = null;

    vglline.setIndicesPerPrimitive(coordinates.length);

    for (i = 0; i < coordinates.length; i += 1) {
      indices.push(i);
      x = coordinates[i][0];
      y = coordinates[i][1];
      z = 0.0;
      if (coordinates[i].length > 2) {
        z = coordinates[i][2];
      }

      //console.log('read ' + x + ',' + y + ',' + z);
      vglcoords.pushBack([x, y, z]);

      //attributes
      this.readScalars(coordinates[i], geom);
    }

    vglline.setIndices(indices);
    geom.addPrimitive(vglline);
    geom.addSource(vglcoords);
    geom.setName('aLineString');
    return geom;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Read multi line string
   *
   * @param coordinates
   * @returns {vgl.geometryData}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.readMultiLineString = function (coordinates) {
    var geom = new vgl.geometryData(),
        vglcoords = new vgl.sourceDataP3fv(),
        pntcnt = 0,
        //lines should be at least 2 verts long, underest OK
        estpntcnt = coordinates.length * 2,
        i = null,
        j = null,
        x = null,
        y = null,
        z = null,
        indices = null,
        vglline = null,
        thisLineLength = null;

    // Preallocate with size estimate
    vglcoords.data().length = estpntcnt * 3; //x,y,z

    for (j = 0; j < coordinates.length; j += 1) {
      indices = [];
      //console.log('getting line ' + j);
      vglline = new vgl.lineStrip();
      thisLineLength = coordinates[j].length;
      vglline.setIndicesPerPrimitive(thisLineLength);
      for (i = 0; i < thisLineLength; i += 1) {
        indices.push(pntcnt);
        x = coordinates[j][i][0];
        y = coordinates[j][i][1];
        z = 0.0;
        if (coordinates[j][i].length > 2) {
          z = coordinates[j][i][2];
        }

        //console.log('read ' + x + ',' + y + ',' + z);
        vglcoords.insertAt(pntcnt, [x, y, z]);

        //attributes
        this.readScalars(coordinates[j][i], geom, estpntcnt * 2, pntcnt);

        pntcnt += 1;
      }

      vglline.setIndices(indices);
      geom.addPrimitive(vglline);
    }

    geom.setName('aMultiLineString');
    geom.addSource(vglcoords);
    return geom;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Read polygon data
   *
   * @param coordinates
   * @returns {vgl.geometryData}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.readPolygon = function (coordinates) {
    //TODO: ignoring holes given in coordinates[1...]
    //TODO: ignoring convex
    //TODO: implement ear clipping in VGL instead of this to handle both
    var geom = new vgl.geometryData(),
        vglcoords = new vgl.sourceDataP3fv(),
        x = null,
        y = null,
        z  = null,
        thisPolyLength = coordinates[0].length,
        vl = 1,
        i = null,
        indices = null,
        vgltriangle = null;


    for (i = 0; i < thisPolyLength; i += 1) {
      x = coordinates[0][i][0];
      y = coordinates[0][i][1];
      z = 0.0;
      if (coordinates[0][i].length > 2) {
        z = coordinates[0][i][2];
      }

      //console.log('read ' + x + ',' + y + ',' + z);
      vglcoords.pushBack([x, y, z]);

      //attributes
      this.readScalars(coordinates[0][i], geom);

      if (i > 1) {
        //console.log('Cutting new triangle 0,'+ vl+ ','+ i);
        indices = new Uint16Array([0, vl, i]);
        vgltriangle = new vgl.triangles();
        vgltriangle.setIndices(indices);
        geom.addPrimitive(vgltriangle);
        vl = i;
      }
    }

    geom.setName('POLY');
    geom.addSource(vglcoords);
    return geom;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Read multi polygon data
   *
   * @param coordinates
   * @returns {vgl.geometryData}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.readMultiPolygon = function (coordinates) {
    var geom = new vgl.geometryData(),
        vglcoords = new vgl.sourceDataP3fv(),
        ccount = 0,
        numPolys = coordinates.length,
        pntcnt = 0,
        estpntcnt = numPolys * 3, // assume triangles, underest is fine
        vgltriangle = new vgl.triangles(),
        indexes = [],
        i = null,
        j = null,
        x = null,
        y = null,
        z  = null,
        thisPolyLength = null,
        vf = null,
        vl = null,
        flip = null,
        flipped = false,
        tcount = 0;


    //var time1 = new Date().getTime()
    //var a = 0;
    //var b = 0;
    //var c = 0;
    //var d = 0;

    //preallocate with size estimate
    vglcoords.data().length = numPolys * 3; //x,y,z
    for (j = 0; j < numPolys; j += 1) {
      //console.log('getting poly ' + j);

      thisPolyLength = coordinates[j][0].length;
      vf = ccount;
      vl = ccount + 1;
      flip = [false, false, false];
      for (i = 0; i < thisPolyLength; i += 1) {
        //var timea = new Date().getTime()

        x = coordinates[j][0][i][0];
        y = coordinates[j][0][i][1];
        z = 0.0;
        if (coordinates[j][0][i].length > 2) {
          z = coordinates[j][0][i][2];
        }
        flipped = false;
        if (x > 180) {
          flipped = true;
          x = x - 360;
        }
        if (i === 0) {
          flip[0] = flipped;
        } else {
          flip[1 + (i - 1) % 2] = flipped;
        }
        //var timeb = new Date().getTime();
        //console.log('read ' + x + ',' + y + ',' + z);

        vglcoords.insertAt(pntcnt, [x, y, z]);
        //var timec = new Date().getTime();

        //attributes
        this.readScalars(coordinates[j][0][i], geom, estpntcnt, pntcnt);
        pntcnt += 1;
        //var timed = new Date().getTime()

        if (i > 1) {
          //if (vl < 50) {
          //console.log('Cutting new triangle ' + tcount + ':' + vf + ',' +
          //            vl + ',' + ccount);
          //console.log(indexes);
          //}
          if (flip[0] === flip[1] && flip[1] === flip[2]) {
            //indexes = indexes.concat([vf,vl,ccount]); //no, very slow in Safari
            indexes[tcount * 3 + 0] = vf;
            indexes[tcount * 3 + 1] = vl;
            indexes[tcount * 3 + 2] = ccount;
            tcount += 1;
          }
          //else {
          //  //TODO: duplicate triangles that straddle boundary on either side
          //}

          vl = ccount;
        }
        ccount += 1;
        //var timee = new Date().getTime()
        //a = a + (timeb-timea)
        //b = b + (timec-timeb)
        //c = c + (timed-timec)
        //d = d + (timee-timed)
      }
    }
    vgltriangle.setIndices(indexes);
    geom.addPrimitive(vgltriangle);

    //console.log('NUMPOLYS ' + pntcnt);
    //console.log('RMP: ', a, ',', b, ',', c, ',', d)
    //var time2 = new Date().getTime()

    geom.setName('aMultiPoly');
    geom.addSource(vglcoords);
    //var time3 = new Date().getTime()
    //console.log('RMP: ', time2-time1, ',', time3-time2)

    return geom;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @param object
   * @returns {*}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.readGJObjectInt = function (object) {
    if (!object.hasOwnProperty('type')) {
      //console.log('uh oh, not a geojson object');
      return null;
    }

    //look for properties type annotation
    if (object.properties &&
        object.properties.ScalarFormat &&
        object.properties.ScalarFormat === 'values') {
      this.m_scalarFormat = 'values';
      if (object.properties.ScalarRange) {
        this.m_scalarRange = object.properties.ScalarRange;
      }
    }
    if (object.properties &&
        object.properties.ScalarFormat &&
        object.properties.ScalarFormat === 'rgb') {
      this.m_scalarFormat = 'rgb';
    }

    //TODO: ignoring 'crs' and 'bbox' and misc meta data on all of these,
    //best to handle as references into original probably
    var ret,
        type = object.type,
        next = null,
        nextset = null,
        i = null;

    switch (type) {
      case 'Point':
        //console.log('parsed Point');
        ret = this.readPoint(object.coordinates);
        break;
      case 'MultiPoint':
        //console.log('parsed MultiPoint');
        ret = this.readMultiPoint(object.coordinates);
        break;
      case 'LineString':
        //console.log('parsed LineString');
        ret = this.readLineString(object.coordinates);
        break;
      case 'MultiLineString':
        //console.log('parsed MultiLineString');
        ret = this.readMultiLineString(object.coordinates);
        break;
      case 'Polygon':
        //console.log('parsed Polygon');
        ret = this.readPolygon(object.coordinates);
        break;
      case 'MultiPolygon':
        //console.log('parsed MultiPolygon');
        ret = this.readMultiPolygon(object.coordinates);
        break;
      case 'GeometryCollection':
        //console.log('parsed GeometryCollection');
        nextset = [];
        for (i = 0; i < object.geometries.length; i += 1) {
          next = this.readGJObject(object.geometries[i]);
          nextset.push(next);
        }
        ret = nextset;
        break;
      case 'Feature':
        //console.log('parsed Feature');
        next = this.readGJObject(object.geometry);
        ret = next;
        break;
      case 'FeatureCollection':
        //console.log('parsed FeatureCollection');
        nextset = [];
        for (i = 0; i < object.features.length; i += 1) {
          next = this.readGJObject(object.features[i]);
          nextset.push(next);
        }
        ret = nextset;
        break;
      default:
        console.log('Don\'t understand type ' + type);
        ret = null;
        break;
    }
    return ret;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @param object
   * @returns {*}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.readGJObject = function (object) {
    //var time1, time2;
    var ret;
    //time1 = new Date().getTime()
    ret = this.readGJObjectInt(object);
    //time2 = new Date().getTime()
    //console.log('ELAPSED: ', time2-time1)
    return ret;
  };

  /**
   * Linearize geometries
   *
   * @param geoms
   * @param geom
   */
  this.linearizeGeoms = function (geoms, geom) {
    var i = null;

    if (Object.prototype.toString.call(geom) === '[object Array]') {
      for (i = 0; i < geom.length; i += 1) {
        this.linearizeGeoms(geoms, geom[i]);
      }
    } else {
      geoms.push(geom);
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Read geometries from geojson object
   *
   * @param object
   * @returns {Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.readGeomObject = function (object) {
    var geom,
        geoms = [];

    geom = this.readGJObject(object);
    this.linearizeGeoms(geoms, geom);
    return geoms;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Given a buffer get rendering primitives
   *
   * @param buffer
   * @returns {*}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.getPrimitives = function (buffer) {
    //console.log('Parsing geoJSON');
    if (!buffer) {
      return [];
    }

    var obj = JSON.parse(buffer),
      geom = this.readGJObject(obj),
      geoms = [];

    this.m_scalarFormat = 'none';
    this.m_scalarRange = null;

    this.linearizeGeoms(geoms, geom);

    return { 'geoms': geoms,
             'scalarFormat': this.m_scalarFormat,
             'scalarRange': this.m_scalarRange };
  };

  return this;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl*/
//////////////////////////////////////////////////////////////////////////////

vgl.data = function () {
  'use strict';

  if (!(this instanceof vgl.data)) {
    return new vgl.data();
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return data type. Should be implemented by the derived class
   */
  ////////////////////////////////////////////////////////////////////////////
  this.type = function () {
  };
};

vgl.data.raster = 0;
vgl.data.point = 1;
vgl.data.lineString = 2;
vgl.data.polygon = 3;
vgl.data.geometry = 10;

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, Uint16Array, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class primitive
 *
 * @class
 * @return {vgl.primitive}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.primitive = function () {
  'use strict';

  if (!(this instanceof vgl.primitive)) {
    return new vgl.primitive();
  }

  /** @private */
  var m_indicesPerPrimitive = 0,
      m_primitiveType = 0,
      m_indicesValueType = 0,
      m_indices = null;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get indices of the primitive
   *
   * @returns {null}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.indices = function () {
    return m_indices;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create indices array for the primitive
   * @param type
   */
  ////////////////////////////////////////////////////////////////////////////
  this.createIndices = function (type) {
    type = type; /* unused parameters */
    // TODO Check for the type
    m_indices = new Uint16Array();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the number of indices
   */
  ////////////////////////////////////////////////////////////////////////////
  this.numberOfIndices = function () {
    return m_indices.length;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return size of indices in bytes
   */
  ////////////////////////////////////////////////////////////////////////////
  this.sizeInBytes = function () {
    return m_indices.length * Uint16Array.BYTES_PER_ELEMENT;
  };

  ////////////////////////////////////////////////////////////////////////////
  /*
   * Return primitive type g
   */
  ////////////////////////////////////////////////////////////////////////////
  this.primitiveType = function () {
    return m_primitiveType;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set primitive type
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setPrimitiveType = function (type) {
    m_primitiveType = type;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return count of indices that form a primitives
   */
  ////////////////////////////////////////////////////////////////////////////
  this.indicesPerPrimitive = function () {
    return m_indicesPerPrimitive;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set count of indices that form a primitive
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setIndicesPerPrimitive = function (count) {
    m_indicesPerPrimitive = count;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return indices value type
   */
  ////////////////////////////////////////////////////////////////////////////
  this.indicesValueType = function () {
    return m_indicesValueType;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set indices value type
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setIndicesValueType = function (type) {
    m_indicesValueType = type;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set indices from a array
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setIndices = function (indicesArray) {
    // TODO Check for the type
    m_indices = new Uint16Array(indicesArray);
  };

  return this;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class triangleStrip
 *
 * @returns {vgl.triangleStrip}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.triangleStrip = function () {
  'use strict';

  if (!(this instanceof vgl.triangleStrip)) {
    return new vgl.triangleStrip();
  }

  vgl.primitive.call(this);

  this.setPrimitiveType(vgl.GL.TRIANGLE_STRIP);
  this.setIndicesValueType(vgl.GL.UNSIGNED_SHORT);
  this.setIndicesPerPrimitive(3);

  return this;
};

inherit(vgl.triangleStrip, vgl.primitive);

////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class triangles
 *
 * @returns {vgl.triangles}
 */
////////////////////////////////////////////////////////////////////////////
vgl.triangles = function () {
  'use strict';

  if (!(this instanceof vgl.triangles)) {
    return new vgl.triangles();
  }
  vgl.primitive.call(this);

  this.setPrimitiveType(vgl.GL.TRIANGLES);
  this.setIndicesValueType(vgl.GL.UNSIGNED_SHORT);
  this.setIndicesPerPrimitive(3);

  return this;
};

inherit(vgl.triangles, vgl.primitive);

//////////////////////////////////////////////////////////////////////////////
/**
 * create a instance of lines primitive type
 *
 * @returns {vgl.lines}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.lines = function () {
  'use strict';

  if (!(this instanceof vgl.lines)) {
    return new vgl.lines();
  }
  vgl.primitive.call(this);

  this.setPrimitiveType(vgl.GL.LINES);
  this.setIndicesValueType(vgl.GL.UNSIGNED_SHORT);
  this.setIndicesPerPrimitive(2);

  return this;
};
inherit(vgl.lines, vgl.primitive);

//////////////////////////////////////////////////////////////////////////////
/**
 * create a instance of line strip primitive type
 *
 * @returns {vgl.lineStrip}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.lineStrip = function () {
  'use strict';

  if (!(this instanceof vgl.lineStrip)) {
    return new vgl.lineStrip();
  }
  vgl.primitive.call(this);

  this.setPrimitiveType(vgl.GL.LINE_STRIP);
  this.setIndicesValueType(vgl.GL.UNSIGNED_SHORT);
  this.setIndicesPerPrimitive(2);

  return this;
};
inherit(vgl.lineStrip, vgl.primitive);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class points
 *
 * @returns {vgl.points}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.points = function () {
  'use strict';

  if (!(this instanceof vgl.points)) {
    return new vgl.points();
  }
  vgl.primitive.call(this);

  this.setPrimitiveType(vgl.GL.POINTS);
  this.setIndicesValueType(vgl.GL.UNSIGNED_SHORT);
  this.setIndicesPerPrimitive(1);

  return this;
};

inherit(vgl.points, vgl.primitive);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class vertexDataP3f
 *
 * @returns {vgl.vertexDataP3f}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.vertexDataP3f = function () {
  'use strict';

  if (!(this instanceof vgl.vertexDataP3f)) {
    return new vgl.vertexDataP3f();
  }

  /** @private */
  this.m_position = [];

  return this;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class vertexDataP3N3f
 *
 * @class
 * @returns {vgl.vertexDataP3N3f}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.vertexDataP3N3f = function () {
  'use strict';

  if (!(this instanceof vgl.vertexDataP3N3f)) {
    return new vgl.vertexDataP3N3f();
  }

  this.m_position = [];
  this.m_normal = [];

  return this;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class vertexDataP3T3f
 *
 * @class
 * @returns {vgl.vertexDataP3T3f}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.vertexDataP3T3f = function () {
  'use strict';

  if (!(this instanceof vgl.vertexDataP3T3f)) {
    return new vgl.vertexDataP3T3f();
  }

  this.m_position = [];
  this.m_texCoordinate = [];

  return this;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class sourceData
 * @class
 * @returns {vgl.sourceData}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.sourceData = function (arg) {
  'use strict';

  if (!(this instanceof vgl.sourceData)) {
    return new vgl.sourceData(arg);
  }

  arg = arg || {};
  var m_attributesMap = {},
      m_data = [],
      m_name = arg.name || 'Source ' + new Date().toISOString(),

      ////////////////////////////////////////////////////////////////////////////
      /**
       * Attribute data for the source
       */
      ////////////////////////////////////////////////////////////////////////////
      vglAttributeData = function () {
        // Number of components per group
        // Type of data type (GL_FLOAT etc)
        this.m_numberOfComponents = 0;
        // Size of data type
        this.m_dataType = 0;
        this.m_dataTypeSize = 0;
        // Specifies whether fixed-point data values should be normalized
        // (true) or converted directly as fixed-point values (false)
        // when they are accessed.
        this.m_normalized = false;
        // Strides for each attribute.
        this.m_stride = 0;
        // Offset
        this.m_offset = 0;
      };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return raw data for this source
   *
   * @returns {Array or Float32Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.data = function () {
    return m_data;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return raw data for this source
   *
   * @returns {Array or Float32Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.getData = function () {
    return this.data();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * If the raw data is not a Float32Array, convert it to one.  Then, return
   * raw data for this source
   *
   * @returns {Float32Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.dataToFloat32Array = function () {
    if (!(m_data instanceof Float32Array)) {
      m_data = new Float32Array(m_data);
    }
    return m_data;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set data for this source
   *
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setData = function (data) {
    if (!(data instanceof Array) && !(data instanceof Float32Array)) {
      console.log('[error] Requires array');
      return;
    }
    if (data instanceof Float32Array) {
      m_data = data;
    } else {
      m_data = data.slice(0);
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Add new attribute data to the source
   */
  ////////////////////////////////////////////////////////////////////////////
  this.addAttribute = function (key, dataType, sizeOfDataType, offset, stride,
                               noOfComponents, normalized) {

    if (!m_attributesMap.hasOwnProperty(key)) {
      /* jshint newcap: false */
      //jscs:disable requireCapitalizedConstructors
      var newAttr = new vglAttributeData();
      //jscs:enable requireCapitalizedConstructors
      /* jshint newcap: true */
      newAttr.m_dataType = dataType;
      newAttr.m_dataTypeSize = sizeOfDataType;
      newAttr.m_offset = offset;
      newAttr.m_stride = stride;
      newAttr.m_numberOfComponents = noOfComponents;
      newAttr.m_normalized = normalized;
      m_attributesMap[key] = newAttr;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return size of the source data
   */
  ////////////////////////////////////////////////////////////////////////////
  this.sizeOfArray = function () {
    return Object.size(m_data);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return length of array
   */
  ////////////////////////////////////////////////////////////////////////////
  this.lengthOfArray = function () {
    return m_data.length;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return size of the source data in bytes
   */
  ////////////////////////////////////////////////////////////////////////////
  /*
    * TODO: code below is probably wrong.
    *   Example:
    *            format P3N3f
    *            m_data = [ 1, 2, 3, 4, 5, 6 ]; // contains one vertex,
    *                                    // one normal, m_data.length == 6
    *
    *       The inner loop computes:
    *             sizeInBytes += 3 * 4; // for position
    *             sizeInBytes += 3 * 4; // for normal
    *
    *        Then sizeInBytes *= 6; // m_data.length == 6
    *        which gives sizeInBytes == 144 bytes when it should have been 4*6 = 24
    */
  this.sizeInBytes = function () {
    var sizeInBytes = 0,
        keys = this.keys(), i;

    for (i = 0; i < keys.length(); i += 1) {
      sizeInBytes += this.numberOfComponents(keys[i]) *
                     this.sizeOfAttributeDataType(keys[i]);
    }

    sizeInBytes *= this.sizeOfArray();

    return sizeInBytes;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Check if there is attribute exists of a given key type
   */
  ////////////////////////////////////////////////////////////////////////////
  this.hasKey = function (key) {
    return m_attributesMap.hasOwnProperty(key);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return keys of all attributes
   */
  ////////////////////////////////////////////////////////////////////////////
  this.keys = function () {
    return Object.keys(m_attributesMap);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return number of attributes of source data
   */
  ////////////////////////////////////////////////////////////////////////////
  this.numberOfAttributes = function () {
    return Object.size(m_attributesMap);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return number of components of the attribute data
   */
  ////////////////////////////////////////////////////////////////////////////
  this.attributeNumberOfComponents = function (key) {
    if (m_attributesMap.hasOwnProperty(key)) {
      return m_attributesMap[key].m_numberOfComponents;
    }

    return 0;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return if the attribute data is normalized
   */
  ////////////////////////////////////////////////////////////////////////////
  this.normalized = function (key) {
    if (m_attributesMap.hasOwnProperty(key)) {
      return m_attributesMap[key].m_normalized;
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return size of the attribute data type
   */
  ////////////////////////////////////////////////////////////////////////////
  this.sizeOfAttributeDataType = function (key) {
    if (m_attributesMap.hasOwnProperty(key)) {
      return m_attributesMap[key].m_dataTypeSize;
    }

    return 0;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return attribute data type
   */
  ////////////////////////////////////////////////////////////////////////////
  this.attributeDataType = function (key) {
    if (m_attributesMap.hasOwnProperty(key)) {
      return m_attributesMap[key].m_dataType;
    }

    return undefined;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return attribute offset
   */
  ////////////////////////////////////////////////////////////////////////////
  this.attributeOffset = function (key) {
    if (m_attributesMap.hasOwnProperty(key)) {
      return m_attributesMap[key].m_offset;
    }

    return 0;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return attribute stride
   */
  ////////////////////////////////////////////////////////////////////////////
  this.attributeStride = function (key) {
    if (m_attributesMap.hasOwnProperty(key)) {
      return m_attributesMap[key].m_stride;
    }

    return 0;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Virtual function to insert new vertex data at the end
   */
  ////////////////////////////////////////////////////////////////////////////
  this.pushBack = function (vertexData) {
    vertexData = vertexData; /* unused parameter */
    // Should be implemented by the base class
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Insert new data block to the raw data
   */
  ////////////////////////////////////////////////////////////////////////////
  this.insert = function (data) {
    var i;

    //m_data = m_data.concat(data); //no, slow on Safari
    /* If we will are given a Float32Array and don't have any other data, use
     * it directly. */
    if (!m_data.length && data.length && data instanceof Float32Array) {
      m_data = data;
      return;
    }
    /* If our internal array is immutable and we will need to change it, create
     * a regular mutable array from it. */
    if (!m_data.slice && (m_data.length || !data.slice)) {
      m_data = Array.prototype.slice.call(m_data);
    }
    if (!data.length) {
      /* data is a singular value, so append it to our array */
      m_data[m_data.length] = data;
    } else {
      /* We don't have any data currently, so it is faster to copy the data
       * using slice. */
      if (!m_data.length && data.slice) {
        m_data = data.slice(0);
      } else {
        for (i = 0; i < data.length; i += 1) {
          m_data[m_data.length] = data[i];
        }
      }
    }
  };

  this.insertAt = function (index, data) {
    var i;

    if (!data.length) {
      m_data[index] = data;
    } else {
      for (i = 0; i < data.length; i += 1) {
        m_data[index * data.length + i] = data[i];
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return name of the source data
   */
  ////////////////////////////////////////////////////////////////////////////
  this.name = function () {
    return m_name;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set name of the source data
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setName = function (name) {
    m_name = name;
  };


  return this;
};


vgl.sourceDataAnyfv = function (size, key, arg) {
  'use strict';
  if (!(this instanceof vgl.sourceDataAnyfv)) {
    return new vgl.sourceDataAnyfv(size, key, arg);
  }

  vgl.sourceData.call(this, arg);
  this.addAttribute(key, vgl.GL.FLOAT,
                    4, 0, size * 4, size, false);

  this.pushBack = function (value) {
    this.insert(value);
  };

  return this;
};
inherit(vgl.sourceDataAnyfv, vgl.sourceData);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class sourceDataP3T3f
 *
 * @returns {vgl.sourceDataP3T3f}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.sourceDataP3T3f = function (arg) {
  'use strict';

  if (!(this instanceof vgl.sourceDataP3T3f)) {
    return new vgl.sourceDataP3T3f(arg);
  }
  vgl.sourceData.call(this, arg);

  this.addAttribute(vgl.vertexAttributeKeys.Position, vgl.GL.FLOAT, 4, 0, 6 * 4, 3,
                    false);
  this.addAttribute(vgl.vertexAttributeKeys.TextureCoordinate, vgl.GL.FLOAT, 4, 12,
                    6 * 4, 3, false);

  this.pushBack = function (value) {
    this.insert(value.m_position);
    this.insert(value.m_texCoordinate);
  };

  return this;
};

inherit(vgl.sourceDataP3T3f, vgl.sourceData);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class sourceDataP3N3f
 *
 * @returns {vgl.sourceDataP3N3f}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.sourceDataP3N3f = function (arg) {
  'use strict';

  if (!(this instanceof vgl.sourceDataP3N3f)) {
    return new vgl.sourceDataP3N3f(arg);
  }

  vgl.sourceData.call(this, arg);

  this.addAttribute(vgl.vertexAttributeKeys.Position, vgl.GL.FLOAT, 4, 0, 6 * 4, 3,
                    false);
  this.addAttribute(vgl.vertexAttributeKeys.Normal, vgl.GL.FLOAT, 4, 12, 6 * 4, 3,
                    false);

  this.pushBack = function (value) {
    this.insert(value.m_position);
    this.insert(value.m_normal);
  };

  return this;
};

inherit(vgl.sourceDataP3N3f, vgl.sourceData);

/////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class sourceDataP3fv
 *
 * @returns {vgl.sourceDataP3fv}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.sourceDataP3fv = function (arg) {
  'use strict';

  if (!(this instanceof vgl.sourceDataP3fv)) {
    return new vgl.sourceDataP3fv(arg);
  }

  vgl.sourceData.call(this, arg);

  this.addAttribute(vgl.vertexAttributeKeys.Position, vgl.GL.FLOAT, 4, 0, 3 * 4, 3,
                    false);

  this.pushBack = function (value) {
    this.insert(value);
  };

  return this;
};

inherit(vgl.sourceDataP3fv, vgl.sourceData);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class sourceDataT2fv
 *
 * @returns {vgl.sourceDataT2fv}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.sourceDataT2fv = function (arg) {
  'use strict';

  if (!(this instanceof vgl.sourceDataT2fv)) {
    return new vgl.sourceDataT2fv(arg);
  }

  vgl.sourceData.call(this, arg);

  this.addAttribute(vgl.vertexAttributeKeys.TextureCoordinate, vgl.GL.FLOAT, 4, 0,
                    2 * 4, 2, false);

  this.pushBack = function (value) {
    this.insert(value);
  };

  return this;
};

inherit(vgl.sourceDataT2fv, vgl.sourceData);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class sourceDataC3fv
 *
 * @returns {vgl.sourceDataC3fv}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.sourceDataC3fv = function (arg) {
  'use strict';

  if (!(this instanceof vgl.sourceDataC3fv)) {
    return new vgl.sourceDataC3fv(arg);
  }

  vgl.sourceData.call(this, arg);

  this.addAttribute(vgl.vertexAttributeKeys.Color, vgl.GL.FLOAT, 4, 0, 3 * 4, 3, false);

  this.pushBack = function (value) {
    this.insert(value);
  };

  return this;
};

inherit(vgl.sourceDataC3fv, vgl.sourceData);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class sourceDataSf meant to hold scalar float values
 *
 * @class
 * @returns {vgl.sourceDataSf}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.sourceDataSf = function (arg) {
  'use strict';

  if (!(this instanceof vgl.sourceDataSf)) {
    return new vgl.sourceDataSf(arg);
  }

  var m_min = null,
      m_max = null,
      m_fixedmin = null,
      m_fixedmax = null;

  vgl.sourceData.call(this, arg);

  this.addAttribute(vgl.vertexAttributeKeys.Scalar, vgl.GL.FLOAT, 4, 0, 4, 1, false);

  this.pushBack = function (value) {
    if (m_max === null || value > m_max) {
      m_max = value;
    }
    if (m_min === null || value < m_min) {
      m_min = value;
    }
    //this.insert(value); //no, slow on Safari
    this.data()[this.data().length] = value;
  };

  this.insertAt = function (index, value) {
    if (m_max === null || value > m_max) {
      m_max = value;
    }
    if (m_min === null || value < m_min) {
      m_min = value;
    }
    //call superclass ??
    //vgl.sourceData.insertAt.call(this, index, value);
    this.data()[index] = value;
  };

  this.scalarRange = function () {
    if (m_fixedmin === null || m_fixedmax === null) {
      return [m_min, m_max];
    }

    return [m_fixedmin, m_fixedmax];
  };

  this.setScalarRange = function (min, max) {
    m_fixedmin = min;
    m_fixedmax = max;
  };

  return this;
};

inherit(vgl.sourceDataSf, vgl.sourceData);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class sourceDataDf meant to hold data float values
 *
 * This source array is the best way to pass a array of floats to the shader
 * that has one entry for each of the vertices.
 *
 * @class
 * @returns {vgl.sourceDataDf}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.sourceDataDf = function (arg) {
  'use strict';

  if (!(this instanceof vgl.sourceDataDf)) {
    return new vgl.sourceDataDf(arg);
  }

  vgl.sourceData.call(this, arg);

  this.addAttribute(vgl.vertexAttributeKeys.Scalar, vgl.GL.FLOAT,
                    4, 0, 4, 1, false);

  this.pushBack = function (value) {
    this.data()[this.data().length] = value;
  };

  this.insertAt = function (index, value) {
    this.data()[index] = value;
  };

  return this;
};

inherit(vgl.sourceDataDf, vgl.sourceData);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class geometryData
 *
 * @class
 * @returns {vgl.geometryData}
 */
/////////////////////////////////////////////////////////////////////////////
vgl.geometryData = function () {
  'use strict';

  if (!(this instanceof vgl.geometryData)) {
    return new vgl.geometryData();
  }
  vgl.data.call(this);

  /** @private */
  var m_name = '',
      m_primitives = [],
      m_sources = [],
      m_bounds = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      m_computeBoundsTimestamp = vgl.timestamp(),
      m_boundsDirtyTimestamp = vgl.timestamp();

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return type
   */
  ////////////////////////////////////////////////////////////////////////////
  this.type = function () {
    return vgl.data.geometry;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return ID of the geometry data
   */
  ////////////////////////////////////////////////////////////////////////////
  this.name = function () {
    return m_name;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set name of the geometry data
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setName = function (name) {
    m_name = name;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Add new source
   */
  ////////////////////////////////////////////////////////////////////////////
  this.addSource = function (source, sourceName) {
    // @todo Check if the incoming source has duplicate keys

    if (sourceName !== undefined) {
      source.setName(sourceName);
    }
    // NOTE This might not work on IE8 or lower
    if (m_sources.indexOf(source) === -1) {
      m_sources.push(source);

      if (source.hasKey(vgl.vertexAttributeKeys.Position)) {
        m_boundsDirtyTimestamp.modified();
      }
      return true;
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return source for a given index. Returns 0 if not found.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.source = function (index) {
    if (index < m_sources.length) {
      return m_sources[index];
    }

    return 0;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return source with a specified name.  Returns 0 if not found.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.sourceByName = function (sourceName) {
    for (var i = 0; i < m_sources.length; i += 1) {
      if (m_sources[i].name() === sourceName) {
        return m_sources[i];
      }
    }
    return 0;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return number of sources
   */
  ////////////////////////////////////////////////////////////////////////////
  this.numberOfSources = function () {
    return m_sources.length;
  };

  /**
   * Return source data given a key
   */
  this.sourceData = function (key) {
    var i;

    for (i = 0; i < m_sources.length; i += 1) {
      if (m_sources[i].hasKey(key)) {
        return m_sources[i];
      }
    }

    return null;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Add new primitive
   */
  ////////////////////////////////////////////////////////////////////////////
  this.addPrimitive = function (primitive) {
    m_primitives.push(primitive);
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return primitive for a given index. Returns null if not found.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.primitive = function (index) {
    if (index < m_primitives.length) {
      return m_primitives[index];
    }

    return null;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return number of primitives
   */
  ////////////////////////////////////////////////////////////////////////////
  this.numberOfPrimitives = function () {
    return m_primitives.length;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return bounds [minX, maxX, minY, maxY, minZ, maxZ]
   */
  ////////////////////////////////////////////////////////////////////////////
  this.bounds = function () {
    if (m_boundsDirtyTimestamp.getMTime() > m_computeBoundsTimestamp.getMTime()) {
      this.computeBounds();
    }
    return m_bounds;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Check if bounds are dirty or mark them as such.
   *
   * @param dirty: true to set bounds as dirty.
   * Return true if bounds are dirty.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.boundsDirty = function (dirty) {
    if (dirty) {
      m_boundsDirtyTimestamp.modified();
    }
    return m_boundsDirtyTimestamp.getMTime() > m_computeBoundsTimestamp.getMTime();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Reset bounds
   */
  ////////////////////////////////////////////////////////////////////////////
  this.resetBounds = function () {
    m_bounds[0] = 0.0;
    m_bounds[1] = 0.0;
    m_bounds[2] = 0.0;
    m_bounds[3] = 0.0;
    m_bounds[4] = 0.0;
    m_bounds[5] = 0.0;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set bounds
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setBounds = function (minX, maxX, minY, maxY, minZ, maxZ) {
    m_bounds[0] = minX;
    m_bounds[1] = maxX;
    m_bounds[2] = minY;
    m_bounds[3] = maxY;
    m_bounds[4] = minZ;
    m_bounds[5] = maxZ;

    m_computeBoundsTimestamp.modified();

    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Compute bounds
   */
  ////////////////////////////////////////////////////////////////////////////
  this.computeBounds = function () {
    if (m_boundsDirtyTimestamp.getMTime() > m_computeBoundsTimestamp.getMTime()) {
      var attr = vgl.vertexAttributeKeys.Position,
          sourceData = this.sourceData(attr),
          data = sourceData.data(),
          numberOfComponents = sourceData.attributeNumberOfComponents(attr),
          stride = sourceData.attributeStride(attr),
          offset = sourceData.attributeOffset(attr),
          sizeOfDataType = sourceData.sizeOfAttributeDataType(attr),
          count = data.length,
          j, ib, jb, maxv, minv,
          value = null,
          vertexIndex;

      // We advance by index, not by byte
      stride /= sizeOfDataType;
      offset /= sizeOfDataType;

      this.resetBounds();

      for (j = 0; j < numberOfComponents; j += 1) {
        ib = j * 2;
        jb = j * 2 + 1;
        if (count) {
          maxv = minv = m_bounds[jb] = data[offset + j];
        } else {
          maxv = minv = 0;
        }
        for (vertexIndex = offset + stride + j; vertexIndex < count;
             vertexIndex += stride) {
          value = data[vertexIndex];
          if (value > maxv) {
            maxv = value;
          }
          if (value < minv) {
            minv = value;
          }
        }
        m_bounds[ib] = minv;  m_bounds[jb] = maxv;
      }

      m_computeBoundsTimestamp.modified();
    }
  };


  ////////////////////////////////////////////////////////////////////////////
  /**
   * Returns the vertex closest to a given position
   */
  ////////////////////////////////////////////////////////////////////////////
  this.findClosestVertex = function (point) {
    var attr = vgl.vertexAttributeKeys.Position,
        sourceData = this.sourceData(attr),
        sizeOfDataType = sourceData.sizeOfAttributeDataType(attr),
        numberOfComponents = sourceData.attributeNumberOfComponents(attr),
        data = sourceData.data(),
        stride = sourceData.attributeStride(attr) / sizeOfDataType,
        offset = sourceData.attributeOffset(attr) / sizeOfDataType,
        minDist = Number.MAX_VALUE,
        minIndex = null,
        vi, vPos, dx, dy, dz, dist, i;

    // assume positions are always triplets
    if (numberOfComponents !== 3) {
      console.log('[warning] Find closest vertex assumes three' +
        'component vertex ');
    }

    if (!point.z) {
      point = {x: point.x, y: point.y, z: 0};
    }

    for (vi = offset, i = 0; vi < data.length; vi += stride, i += 1) {
      vPos = [data[vi],
              data[vi + 1],
              data[vi + 2]];

      dx = vPos[0] - point.x;
      dy = vPos[1] - point.y;
      dz = vPos[2] - point.z;
      dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < minDist) {
        minDist = dist;
        minIndex = i;
      }
    }
    return minIndex;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Returns the requested vertex position
   */
  ////////////////////////////////////////////////////////////////////////////
  this.getPosition = function (index) {
    var attr = vgl.vertexAttributeKeys.Position,
        sourceData = this.sourceData(attr),
        sizeOfDataType = sourceData.sizeOfAttributeDataType(attr),
        numberOfComponents = sourceData.attributeNumberOfComponents(attr),
        data = sourceData.data(),
        stride = sourceData.attributeStride(attr) / sizeOfDataType,
        offset = sourceData.attributeOffset(attr) / sizeOfDataType;

    // assume positions are always triplets
    if (numberOfComponents !== 3) {
      console.log('[warning] getPosition assumes three component data');
    }

    return [data[offset + index * stride],
            data[offset + index * stride + 1],
            data[offset + index * stride + 2]];
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Returns the scalar corresponding to a given vertex index
   */
  ////////////////////////////////////////////////////////////////////////////
  this.getScalar = function (index) {
    var attr = vgl.vertexAttributeKeys.Scalar,
        sourceData = this.sourceData(attr),
        numberOfComponents, sizeOfDataType, data, stride, offset;

    if (!sourceData) {
      return null;
    }

    numberOfComponents = sourceData.attributeNumberOfComponents(attr);
    sizeOfDataType = sourceData.sizeOfAttributeDataType(attr);
    data = sourceData.data();
    stride = sourceData.attributeStride(attr) / sizeOfDataType;
    offset = sourceData.attributeOffset(attr) / sizeOfDataType;

    //console.log('index for scalar is ' + index);
    //console.log('offset for scalar is ' + offset);
    //console.log('stride for scalar is ' + stride);

    //console.log('have ' + data.length + ' scalars');

    if (index * stride + offset >= data.length) {
      console.log('access out of bounds in getScalar');
    }

    return data[index * stride + offset];
  };

  return this;
};

inherit(vgl.geometryData, vgl.data);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, Float32Array, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class mapper
 *
 * @class
 * @returns {vgl.mapper}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.mapper = function (arg) {
  'use strict';

  if (!(this instanceof vgl.mapper)) {
    return new vgl.mapper(arg);
  }
  vgl.boundingObject.call(this);

  /** @private */
  arg = arg || {};

  var m_dirty = true,
      m_color = [0.0, 1.0, 1.0],
      m_geomData = null,
      m_buffers = [],
      m_bufferVertexAttributeMap = {},
      m_dynamicDraw = arg.dynamicDraw === undefined ? false : arg.dynamicDraw,
      m_glCompileTimestamp = vgl.timestamp(),
      m_context = null,
      m_this = this;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Delete cached VBO if any
   */
  ////////////////////////////////////////////////////////////////////////////
  this.deleteVertexBufferObjects = function (renderState) {
    var i;
    var context = m_context;
    if (renderState) {
      context = renderState.m_context;
    }
    if (context) {
      for (i = 0; i < m_buffers.length; i += 1) {
        context.deleteBuffer(m_buffers[i]);
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create new VBO for all its geometryData sources and primitives
   *
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function createVertexBufferObjects(renderState) {
    if (m_geomData) {
      if (renderState) {
        m_context = renderState.m_context;
      }
      var numberOfSources = m_geomData.numberOfSources(),
          i, j, k, bufferId = null, keys, ks, numberOfPrimitives, data;

      for (i = 0; i < numberOfSources; i += 1) {
        bufferId = m_context.createBuffer();
        m_context.bindBuffer(vgl.GL.ARRAY_BUFFER, bufferId);
        data = m_geomData.source(i).data();
        if (!(data instanceof Float32Array)) {
          data = new Float32Array(data);
        }
        m_context.bufferData(vgl.GL.ARRAY_BUFFER, data,
                      m_dynamicDraw ? vgl.GL.DYNAMIC_DRAW :
                      vgl.GL.STATIC_DRAW);

        keys = m_geomData.source(i).keys();
        ks = [];

        for (j = 0; j < keys.length; j += 1) {
          ks.push(keys[j]);
        }

        m_bufferVertexAttributeMap[i] = ks;
        m_buffers[i] = bufferId;
      }

      numberOfPrimitives = m_geomData.numberOfPrimitives();
      for (k = 0; k < numberOfPrimitives; k += 1) {
        bufferId = m_context.createBuffer();
        m_context.bindBuffer(vgl.GL.ARRAY_BUFFER, bufferId);
        m_context.bufferData(vgl.GL.ARRAY_BUFFER,
          m_geomData.primitive(k).indices(), vgl.GL.STATIC_DRAW);
        m_buffers[i] = bufferId;
        i += 1;
      }

      m_glCompileTimestamp.modified();
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Clear cache related to buffers
   *
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function cleanUpDrawObjects(renderState) {
    renderState = renderState; /* avoid unused warning */
    m_bufferVertexAttributeMap = {};
    m_buffers = [];
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Setup draw objects; Delete old ones and create new ones
   *
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function setupDrawObjects(renderState) {
    // Delete buffer objects from past if any.
    m_this.deleteVertexBufferObjects(renderState);

    // Clear any cache related to buffers
    cleanUpDrawObjects(renderState);

    // Now construct the new ones.
    createVertexBufferObjects(renderState);

    m_dirty = false;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Compute bounds of the data
   */
  ////////////////////////////////////////////////////////////////////////////
  this.computeBounds = function () {
    if (m_geomData === null || typeof m_geomData === 'undefined') {
      this.resetBounds();
      return;
    }

    var computeBoundsTimestamp = this.computeBoundsTimestamp(),
        boundsDirtyTimestamp = this.boundsDirtyTimestamp(),
        geomBounds = null;

    if (boundsDirtyTimestamp.getMTime() > computeBoundsTimestamp.getMTime()) {
      geomBounds = m_geomData.bounds();

      this.setBounds(geomBounds[0], geomBounds[1], geomBounds[2],
        geomBounds[3], geomBounds[4], geomBounds[5]) ;

      computeBoundsTimestamp.modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get solid color of the geometry
   */
  ////////////////////////////////////////////////////////////////////////////
  this.color = function () {
    return m_color;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set solid color of the geometry. Default is teal [1.0, 1.0, 1.0]
   *
   * @param r Red component of the color [0.0 - 1.0]
   * @param g Green component of the color [0.0 - 1.0]
   * @param b Blue component of the color [0.0 - 1.0]
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setColor = function (r, g, b) {
    m_color[0] = r;
    m_color[1] = g;
    m_color[2] = b;

    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return stored geometry data if any
   */
  ////////////////////////////////////////////////////////////////////////////
  this.geometryData = function () {
    return m_geomData;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Connect mapper to its geometry data
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setGeometryData = function (geom) {
    if (m_geomData !== geom) {
      m_geomData = geom;

      this.modified();
      this.boundsDirtyTimestamp().modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update the buffer used for a named source.
   *
   * @param {String} sourceName The name of the source to update.
   * @param {Object[] or Float32Array} values The values to use for the source.
   *    If not specified, use the source's own buffer.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.updateSourceBuffer = function (sourceName, values, renderState) {
    if (renderState) {
      m_context = renderState.m_context;
    }
    if (!m_context) {
      return false;
    }
    var bufferIndex = -1;
    for (var i = 0; i < m_geomData.numberOfSources(); i += 1) {
      if (m_geomData.source(i).name() === sourceName) {
        bufferIndex = i;
        break;
      }
    }
    if (bufferIndex < 0 || bufferIndex >= m_buffers.length) {
      return false;
    }
    if (!values) {
      values = m_geomData.source(i).dataToFloat32Array();
    }
    m_context.bindBuffer(vgl.GL.ARRAY_BUFFER, m_buffers[bufferIndex]);
    if (values instanceof Float32Array) {
      m_context.bufferSubData(vgl.GL.ARRAY_BUFFER, 0, values);
    } else {
      m_context.bufferSubData(vgl.GL.ARRAY_BUFFER, 0,
                              new Float32Array(values));
    }
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the buffer used for a named source.  If the current buffer isn't a
   * Float32Array, it is converted to one.  This array can then be modified
   * directly, after which updateSourceBuffer can be called to update the
   * GL array.
   *
   * @param {String} sourceName The name of the source to update.
   * @returns {Float32Array} An array used for this source.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.getSourceBuffer = function (sourceName) {
    var source = m_geomData.sourceByName(sourceName);
    if (!source) {
      return new Float32Array();
    }
    return source.dataToFloat32Array();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Render the mapper
   */
  ////////////////////////////////////////////////////////////////////////////
  this.render = function (renderState) {
    if (this.getMTime() > m_glCompileTimestamp.getMTime() ||
        renderState.m_contextChanged) {
      setupDrawObjects(renderState);
    }
    m_context = renderState.m_context;

    // Fixed vertex color
    m_context.vertexAttrib3fv(vgl.vertexAttributeKeys.Color, this.color());

    // TODO Use renderState
    var bufferIndex = 0,
        j = 0, i, noOfPrimitives = null, primitive = null;

    for (i in m_bufferVertexAttributeMap) {
      if (m_bufferVertexAttributeMap.hasOwnProperty(i)) {
        m_context.bindBuffer(vgl.GL.ARRAY_BUFFER,
                                         m_buffers[bufferIndex]);
        for (j = 0; j < m_bufferVertexAttributeMap[i].length; j += 1) {
          renderState.m_material
              .bindVertexData(renderState, m_bufferVertexAttributeMap[i][j]);
        }
        bufferIndex += 1;
      }
    }

    noOfPrimitives = m_geomData.numberOfPrimitives();
    for (j = 0; j < noOfPrimitives; j += 1) {
      m_context.bindBuffer(vgl.GL.ARRAY_BUFFER, m_buffers[bufferIndex]);
      bufferIndex += 1;
      primitive = m_geomData.primitive(j);
      switch (primitive.primitiveType()) {
        case vgl.GL.POINTS:
          m_context.drawArrays(vgl.GL.POINTS, 0, primitive.numberOfIndices());
          break;
        case vgl.GL.LINES:
          m_context.drawArrays(vgl.GL.LINES, 0, primitive.numberOfIndices());
          break;
        case vgl.GL.LINE_STRIP:
          m_context.drawArrays(vgl.GL.LINE_STRIP, 0, primitive.numberOfIndices());
          break;
        case vgl.GL.TRIANGLES:
          m_context.drawArrays(vgl.GL.TRIANGLES, 0, primitive.numberOfIndices());
          break;
        case vgl.GL.TRIANGLE_STRIP:
          m_context.drawArrays(vgl.GL.TRIANGLE_STRIP, 0, primitive.numberOfIndices());
          break;
      }
      m_context.bindBuffer (vgl.GL.ARRAY_BUFFER, null);
    }
  };

  return this;
};

inherit(vgl.mapper, vgl.boundingObject);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, inherit*/
//////////////////////////////////////////////////////////////////////////////

vgl.groupMapper = function () {
  'use strict';

  if (!(this instanceof vgl.groupMapper)) {
    return new vgl.groupMapper();
  }
  vgl.mapper.call(this);

  /** @private */
  var m_createMappersTimestamp = vgl.timestamp(),
      m_mappers = [],
      m_geomDataArray = [];

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return stored geometry data if any
   *
   * @param index optional
   */
  ////////////////////////////////////////////////////////////////////////////
  this.geometryData = function (index) {
    if (index !== undefined && index < m_geomDataArray.length) {
      return m_geomDataArray[index];
    }

    if (m_geomDataArray.length > 0) {
      return m_geomDataArray[0];
    }

    return null;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Connect mapper to its geometry data
   *
   * @param geom {vgl.geomData}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setGeometryData = function (geom) {
    if (m_geomDataArray.length === 1) {
      if (m_geomDataArray[0] === geom) {
        return;
      }
    }
    m_geomDataArray = [];
    m_geomDataArray.push(geom);
    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return stored geometry data array if any
   */
  ////////////////////////////////////////////////////////////////////////////
  this.geometryDataArray = function () {
    return m_geomDataArray;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Connect mapper to its geometry data
   *
   * @param geoms {Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setGeometryDataArray = function (geoms) {
    if (geoms instanceof Array) {
      if (m_geomDataArray !== geoms) {
        m_geomDataArray = [];
        m_geomDataArray = geoms;
        this.modified();
        return true;
      }
    } else {
      console.log('[error] Requies array of geometry data');
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Compute bounds of the data
   */
  ////////////////////////////////////////////////////////////////////////////
  this.computeBounds = function () {
    if (m_geomDataArray === null ||
        m_geomDataArray === undefined) {
      this.resetBounds();
      return;
    }

    var computeBoundsTimestamp = this.computeBoundsTimestamp(),
        boundsDirtyTimestamp = this.boundsDirtyTimestamp(),
        m_bounds = this.bounds(),
        geomBounds = null,
        i = null;

    if (boundsDirtyTimestamp.getMTime() >
        computeBoundsTimestamp.getMTime()) {

      for (i = 0; i < m_geomDataArray.length; i += 1) {
        geomBounds = m_geomDataArray[i].bounds();

        if (m_bounds[0] > geomBounds[0]) {
          m_bounds[0] = geomBounds[0];
        }
        if (m_bounds[1] < geomBounds[1]) {
          m_bounds[1] = geomBounds[1];
        }
        if (m_bounds[2] > geomBounds[2]) {
          m_bounds[2] = geomBounds[2];
        }
        if (m_bounds[3] < geomBounds[3]) {
          m_bounds[3] = geomBounds[3];
        }
        if (m_bounds[4] > geomBounds[4]) {
          m_bounds[4] = geomBounds[4];
        }
        if (m_bounds[5] < geomBounds[5]) {
          m_bounds[5] = geomBounds[5];
        }
      }

      this.modified();
      computeBoundsTimestamp.modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Render the mapper
   */
  ////////////////////////////////////////////////////////////////////////////
  this.render = function (renderState) {
    var i = null;

    if (this.getMTime() > m_createMappersTimestamp.getMTime()) {
      // NOTE Hoping that it will release the graphics resources
      for (i = 0; i < m_geomDataArray.length; i += 1) {
        m_mappers.push(vgl.mapper());
        m_mappers[i].setGeometryData(m_geomDataArray[i]);
      }
      m_createMappersTimestamp.modified();
    }

    for (i = 0; i < m_mappers.length; i += 1) {
      m_mappers[i].render(renderState);
    }
  };

  return this;
};

inherit(vgl.groupMapper, vgl.mapper);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, inherit*/
//////////////////////////////////////////////////////////////////////////////

vgl.materialAttributeType = {
  'Undefined' : 0x0,
  'ShaderProgram' : 0x1,
  'Texture' : 0x2,
  'Blend' : 0x3,
  'Depth' : 0x4
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class materialAttribute
 *
 * @class
 * @param type
 * @returns {vgl.materialAttribute}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.materialAttribute = function (type) {
  'use strict';

  if (!(this instanceof vgl.materialAttribute)) {
    return new vgl.materialAttribute();
  }
  vgl.graphicsObject.call(this);

  /** @private */
  var m_this = this,
      m_type = type,
      m_enabled = true;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return tyep of the material attribute
   *
   * @returns {*}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.type = function () {
    return m_type;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return if material attribute is enabled or not
   *
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.enabled = function () {
    return m_enabled;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Bind and activate vertex specific data
   *
   * @param renderState
   * @param key
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.bindVertexData = function (renderState, key) {
    renderState = renderState; /* unused parameter */
    key = key /* unused parameter */;
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Undo bind and deactivate vertex specific data
   *
   * @param renderState
   * @param key
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.undoBindVertexData = function (renderState, key) {
    renderState = renderState; /* unused parameter */
    key = key /* unused parameter */;
    return false;
  };

  return m_this;
};

inherit(vgl.materialAttribute, vgl.graphicsObject);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of clas blendFunction
 *
 * @class
 * @param source
 * @param destination
 * @returns {vgl.blendFunction}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.blendFunction = function (source, destination) {
  'use strict';

  if (!(this instanceof vgl.blendFunction)) {
    return new vgl.blendFunction(source, destination);
  }

  /** @private */
  var m_source = source,
      m_destination = destination;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Apply blend function to the current state
   *
   * @param {vgl.renderState}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.apply = function (renderState) {
    renderState.m_context.blendFuncSeparate(m_source, m_destination,
                         vgl.GL.ONE, vgl.GL.ONE_MINUS_SRC_ALPHA);
  };

  return this;
};

////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class blend
 *
 * @returns {vgl.blend}
 */
////////////////////////////////////////////////////////////////////////////
vgl.blend = function () {
  'use strict';

  if (!(this instanceof vgl.blend)) {
    return new vgl.blend();
  }
  vgl.materialAttribute.call(
    this, vgl.materialAttributeType.Blend);

  /** @private */
  var m_wasEnabled = false,
      m_blendFunction = vgl.blendFunction(vgl.GL.SRC_ALPHA,
                                          vgl.GL.ONE_MINUS_SRC_ALPHA);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Bind blend attribute
   *
   * @param {vgl.renderState}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.bind = function (renderState) {
    m_wasEnabled = renderState.m_context.isEnabled(vgl.GL.BLEND);

    if (this.enabled()) {
      renderState.m_context.enable(vgl.GL.BLEND);
      m_blendFunction.apply(renderState);
    } else {
      renderState.m_context.disable(vgl.GL.BLEND);
    }

    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Undo bind blend attribute
   *
   * @param {vgl.renderState}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.undoBind = function (renderState) {
    if (m_wasEnabled) {
      renderState.m_context.enable(vgl.GL.BLEND);
    } else {
      renderState.m_context.disable(vgl.GL.BLEND);
    }

    return true;
  };

  return this;
};

inherit(vgl.blend, vgl.materialAttribute);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class material
 *
 * @class
 * @returns {vgl.material}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.material = function () {
  'use strict';

  if (!(this instanceof vgl.material)) {
    return new vgl.material();
  }
  vgl.graphicsObject.call(this);

  // / Private member variables
  var m_this = this,
      m_shaderProgram = new vgl.shaderProgram(),
      m_binNumber = 100,
      m_textureAttributes = {},
      m_attributes = {};

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return bin number for the material
   *
   * @default 100
   * @returns {number}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.binNumber = function () {
    return m_binNumber;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set bin number for the material
   *
   * @param binNo
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setBinNumber = function (binNo) {
    m_binNumber = binNo;
    m_this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Check if incoming attribute already exists in the material
   *
   * @param attr
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.exists = function (attr) {
    if (attr.type() === vgl.materialAttribute.Texture) {
      return m_textureAttributes.hasOwnProperty(attr);
    }

    return m_attributes.hasOwnProperty(attr);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get uniform given a name

   * @param name Uniform name
   * @returns {vgl.uniform}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.uniform = function (name) {
    if (m_shaderProgram) {
      return m_shaderProgram.uniform(name);
    }

    return null;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get material attribute

   * @param attr Attribute name
   * @returns {vgl.materialAttribute}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.attribute = function (name) {
    if (m_attributes.hasOwnProperty(name)) {
      return m_attributes[name];
    }

    if (m_textureAttributes.hasOwnProperty(name)) {
      return m_textureAttributes[name];
    }

    return null;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set a new attribute for the material
   *
   * This method replace any existing attribute except for textures as
   * materials can have multiple textures.
   *
   * @param attr
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setAttribute = function (attr) {
    if (attr.type() === vgl.materialAttributeType.Texture &&
        m_textureAttributes[attr.textureUnit()] !== attr) {
      m_textureAttributes[attr.textureUnit()] = attr;
      m_this.modified();
      return true;
    }

    if (m_attributes[attr.type()] === attr) {
      return false;
    }

    // Shader is a very special attribute
    if (attr.type() === vgl.materialAttributeType.ShaderProgram) {
      m_shaderProgram = attr;
    }

    m_attributes[attr.type()] = attr;
    m_this.modified();
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Add a new attribute to the material.
   *
   * @param attr
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.addAttribute = function (attr) {
    if (m_this.exists(attr)) {
      return false;
    }

    if (attr.type() === vgl.materialAttributeType.Texture) {
      // TODO Currently we don't check if we are replacing or not.
      // It would be nice to have a flag for it.
      m_textureAttributes[attr.textureUnit()] = attr;
      m_this.modified();
      return true;
    }

    // Shader is a very special attribute
    if (attr.type() === vgl.materialAttributeType.ShaderProgram) {
      m_shaderProgram = attr;
    }

    m_attributes[attr.type()] = attr;
    m_this.modified();
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return shader program used by the material
   *
   * @returns {vgl.shaderProgram}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.shaderProgram = function () {
    return m_shaderProgram;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Setup (initialize) the material attribute
   *
   * @param renderState
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this._setup = function (renderState) {
    renderState = renderState; /* unused parameter */
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Remove any resources acquired before deletion
   *
   * @param renderState
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this._cleanup = function (renderState) {
    for (var key in m_attributes) {
      if (m_attributes.hasOwnProperty(key)) {
        m_attributes[key]._cleanup(renderState);
      }
    }

    for (key in m_textureAttributes) {
      if (m_textureAttributes.hasOwnProperty(key)) {
        m_textureAttributes[key]._cleanup(renderState);
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Bind and activate material states
   *
   * @param renderState
   */
  ////////////////////////////////////////////////////////////////////////////
  this.bind = function (renderState) {
    var key = null;

    m_shaderProgram.bind(renderState);

    for (key in m_attributes) {
      if (m_attributes.hasOwnProperty(key)) {
        if (m_attributes[key] !== m_shaderProgram) {
          m_attributes[key].bind(renderState);
        }
      }
    }

    for (key in m_textureAttributes) {
      if (m_textureAttributes.hasOwnProperty(key)) {
        m_textureAttributes[key].bind(renderState);
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Undo-bind and de-activate material states
   *
   * @param renderState
   */
  ////////////////////////////////////////////////////////////////////////////
  this.undoBind = function (renderState) {
    var key = null;
    for (key in m_attributes) {
      if (m_attributes.hasOwnProperty(key)) {
        m_attributes[key].undoBind(renderState);
      }
    }

    for (key in m_textureAttributes) {
      if (m_textureAttributes.hasOwnProperty(key)) {
        m_textureAttributes[key].undoBind(renderState);
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Bind vertex data
   *
   * @param renderState
   * @param key
   */
  ////////////////////////////////////////////////////////////////////////////
  this.bindVertexData = function (renderState, key) {
    var i = null;

    for (i in m_attributes) {
      if (m_attributes.hasOwnProperty(i)) {
        m_attributes[i].bindVertexData(renderState, key);
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Undo bind vertex data
   *
   * @param renderState
   * @param key
   */
  ////////////////////////////////////////////////////////////////////////////
  this.undoBindVertexData = function (renderState, key) {
    var i = null;

    for (i in m_attributes) {
      if (m_attributes.hasOwnProperty(i)) {
        m_attributes.undoBindVertexData(renderState, key);
      }
    }
  };

  return m_this;
};

vgl.material.RenderBin = {
  'Base' : 0,
  'Default' : 100,
  'Opaque' : 100,
  'Transparent' : 1000,
  'Overlay' : 10000
};

inherit(vgl.material, vgl.graphicsObject);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, vec2, vec3, vec4, mat4, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class renderState
 *
 * @returns {vgl.renderState}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.renderState = function () {
  'use strict';

  this.m_context = null;
  this.m_modelViewMatrix = mat4.create();
  this.m_normalMatrix = mat4.create();
  this.m_projectionMatrix = null;
  this.m_material = null;
  this.m_mapper = null;
};

////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class renderer *
 *
 * @returns {vgl.renderer}
 */
////////////////////////////////////////////////////////////////////////////
vgl.renderer = function (arg) {
  'use strict';

  if (!(this instanceof vgl.renderer)) {
    return new vgl.renderer(arg);
  }
  vgl.graphicsObject.call(this);
  arg = arg || {};

  /** @private */
  var m_this = this;
  m_this.m_renderWindow = null;
  m_this.m_contextChanged = false;
  m_this.m_sceneRoot = new vgl.groupNode();
  m_this.m_camera = new vgl.camera(arg);
  m_this.m_nearClippingPlaneTolerance = null;
  m_this.m_x = 0;
  m_this.m_y = 0;
  m_this.m_width = 0;
  m_this.m_height = 0;
  m_this.m_resizable = true;
  m_this.m_resetScene = true;
  m_this.m_layer = 0;
  m_this.m_renderPasses = null;
  m_this.m_resetClippingRange = true;
  m_this.m_depthBits = null;

  m_this.m_camera.addChild(m_this.m_sceneRoot);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get width of the renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.width = function () {
    return m_this.m_width;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get height of the renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.height = function () {
    return m_this.m_height;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get layer this renderer is associated with
   *
   * @return {Number}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.layer = function () {
    return m_this.m_layer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set the layer this renderer is associated with.
   *
   * @param layerNo
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setLayer = function (layerNo) {
    m_this.m_layer = layerNo;
    m_this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   *
   */
  ////////////////////////////////////////////////////////////////////////////
  this.isResizable = function () {
    return m_this.m_resizable;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   *
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setResizable = function (r) {
    m_this.m_resizable = r;
  };


  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return render window (owner) of the renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.renderWindow = function () {
    return m_this.m_renderWindow;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set render window for the renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setRenderWindow = function (renWin) {
    if (m_this.m_renderWindow !== renWin) {
      if (m_this.m_renderWindow) {
        m_this.m_renderWindow.removeRenderer(this);
      }
      m_this.m_renderWindow = renWin;
      m_this.m_contextChanged = true;
      m_this.modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get background color
   */
  ////////////////////////////////////////////////////////////////////////////
  this.backgroundColor = function () {
    return m_this.m_camera.clearColor();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set background color of the renderer
   *
   * @param r
   * @param g
   * @param b
   * @param a
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setBackgroundColor = function (r, g, b, a) {
    m_this.m_camera.setClearColor(r, g, b, a);
    m_this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get scene root
   *
   * @returns {vgl.groupNode}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.sceneRoot = function () {
    return m_this.m_sceneRoot;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get main camera of the renderer
   *
   * @returns {vgl.camera}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.camera = function () {
    return m_this.m_camera;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Render the scene
   */
  ////////////////////////////////////////////////////////////////////////////
  this.render = function () {
    var i, renSt, children, actor = null, sortedActors = [],
        mvMatrixInv = mat4.create(), clearColor = null;

    renSt = new vgl.renderState();
    renSt.m_renderer = m_this;
    renSt.m_context = m_this.renderWindow().context();
    if (!m_this.m_depthBits || m_this.m_contextChanged) {
      m_this.m_depthBits = renSt.m_context.getParameter(vgl.GL.DEPTH_BITS);
    }
    renSt.m_contextChanged = m_this.m_contextChanged;

    if (m_this.m_renderPasses) {
      for (i = 0; i < m_this.m_renderPasses.length; i += 1) {
        if (m_this.m_renderPasses[i].render(renSt)) {
          // Stop the rendering if render pass returns false
          console.log('returning');
          m_this.m_renderPasses[i].remove(renSt);
          return;
        }
        m_this.m_renderPasses[i].remove(renSt);
      }
    }

    renSt.m_context.enable(vgl.GL.DEPTH_TEST);
    renSt.m_context.depthFunc(vgl.GL.LEQUAL);

    /*jshint bitwise: false */
    if (m_this.m_camera.clearMask() & vgl.GL.COLOR_BUFFER_BIT) {
      clearColor = m_this.m_camera.clearColor();
      renSt.m_context.clearColor(clearColor[0], clearColor[1],
                                 clearColor[2], clearColor[3]);
    }

    if (m_this.m_camera.clearMask() & vgl.GL.DEPTH_BUFFER_BIT) {
      renSt.m_context.clearDepth(m_this.m_camera.clearDepth());
    }
    /*jshint bitwise: true */

    renSt.m_context.clear(m_this.m_camera.clearMask());

    // Set the viewport for this renderer
    renSt.m_context.viewport(m_this.m_x, m_this.m_y,
                             m_this.m_width, m_this.m_height);

    children = m_this.m_sceneRoot.children();

    if (children.length > 0 && m_this.m_resetScene) {
      m_this.resetCamera();
      m_this.m_resetScene = false;
    }

    for (i = 0; i < children.length; i += 1) {
      actor = children[i];

      // Compute the bounds even if the actor is not visible
      actor.computeBounds();

      // If bin number is < 0, then don't even bother
      // rendering the data
      if (actor.visible() && actor.material().binNumber() >= 0) {
        sortedActors.push([actor.material().binNumber(), actor]);
      }
    }

    // Now perform sorting
    sortedActors.sort(function (a, b) {return a[0] - b[0];});

    for (i = 0; i < sortedActors.length; i += 1) {
      actor = sortedActors[i][1];
      if (actor.referenceFrame() ===
          vgl.boundingObject.ReferenceFrame.Relative) {
        var view = m_this.m_camera.viewMatrix();
        /* If the view matrix is a plain array, keep it as such.  This is
         * intended to preserve precision, and will only be the case if the
         * view matrix was created by delibrately setting it as an array. */
        if (view instanceof Array) {
          renSt.m_modelViewMatrix = new Array(16);
        }
        mat4.multiply(renSt.m_modelViewMatrix, view, actor.matrix());
        renSt.m_projectionMatrix = m_this.m_camera.projectionMatrix();
        renSt.m_modelViewAlignment = m_this.m_camera.viewAlignment();
      } else {
        renSt.m_modelViewMatrix = actor.matrix();
        renSt.m_modelViewAlignment = null;
        renSt.m_projectionMatrix = mat4.create();
        mat4.ortho(renSt.m_projectionMatrix,
                   0, m_this.m_width, 0, m_this.m_height, -1, 1);
      }

      mat4.invert(mvMatrixInv, renSt.m_modelViewMatrix);
      mat4.transpose(renSt.m_normalMatrix, mvMatrixInv);
      renSt.m_material = actor.material();
      renSt.m_mapper = actor.mapper();

      // TODO Fix this shortcut
      renSt.m_material.bind(renSt);
      renSt.m_mapper.render(renSt);
      renSt.m_material.undoBind(renSt);
    }

    renSt.m_context.finish();
    m_this.m_contextChanged = false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Automatically set up the camera based on visible actors
   */
  ////////////////////////////////////////////////////////////////////////////
  this.resetCamera = function () {
    m_this.m_camera.computeBounds();

    var vn = m_this.m_camera.directionOfProjection(),
        visibleBounds = m_this.m_camera.bounds(),
        center = [
          (visibleBounds[0] + visibleBounds[1]) / 2.0,
          (visibleBounds[2] + visibleBounds[3]) / 2.0,
          (visibleBounds[4] + visibleBounds[5]) / 2.0
        ],
        diagonals = [
          visibleBounds[1] - visibleBounds[0],
          visibleBounds[3] - visibleBounds[2],
          visibleBounds[5] - visibleBounds[4]
        ],
        radius = 0.0,
        aspect = m_this.m_camera.viewAspect(),
        angle = m_this.m_camera.viewAngle(),
        distance = null,
        vup = null;

    if (diagonals[0] > diagonals[1]) {
      if (diagonals[0] > diagonals[2]) {
        radius = diagonals[0] / 2.0;
      } else {
        radius = diagonals[2] / 2.0;
      }
    } else {
      if (diagonals[1] > diagonals[2]) {
        radius = diagonals[1] / 2.0;
      } else {
        radius = diagonals[2] / 2.0;
      }
    }

    // @todo Need to figure out what's happening here
    if (aspect >= 1.0) {
      angle = 2.0 * Math.atan(Math.tan(angle * 0.5) / aspect);
    } else {
      angle = 2.0 * Math.atan(Math.tan(angle * 0.5) * aspect);
    }

    distance = radius / Math.sin(angle * 0.5);
    vup = m_this.m_camera.viewUpDirection();

    if (Math.abs(vec3.dot(vup, vn)) > 0.999) {
      m_this.m_camera.setViewUpDirection(-vup[2], vup[0], vup[1]);
    }

    m_this.m_camera.setFocalPoint(center[0], center[1], center[2]);
    m_this.m_camera.setPosition(center[0] + distance * -vn[0],
      center[1] + distance * -vn[1], center[2] + distance * -vn[2]);

    m_this.resetCameraClippingRange(visibleBounds);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
  * Check whether or not whether or not the bounds are valid
  */
  ////////////////////////////////////////////////////////////////////////////
  this.hasValidBounds = function (bounds) {
    if (bounds[0] === Number.MAX_VALUE ||
        bounds[1] === -Number.MAX_VALUE ||
        bounds[2] === Number.MAX_VALUE ||
        bounds[3] === -Number.MAX_VALUE ||
        bounds[4] === Number.MAX_VALUE ||
        bounds[5] === -Number.MAX_VALUE) {
      return false;
    }

    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Recalculate camera's clipping range
   */
  ////////////////////////////////////////////////////////////////////////////
  this.resetCameraClippingRange = function (bounds) {
    if (typeof bounds === 'undefined') {
      m_this.m_camera.computeBounds();
      bounds = m_this.m_camera.bounds();
    }

    if (!m_this.hasValidBounds(bounds)) {
      return;
    }

    var vn = m_this.m_camera.viewPlaneNormal(),
        position = m_this.m_camera.position(),
        a = -vn[0],
        b = -vn[1],
        c = -vn[2],
        d = -(a * position[0] + b * position[1] + c * position[2]),
        range = vec2.create(),
        dist = null,
        i = null,
        j = null,
        k = null;

    if (!m_this.m_resetClippingRange) {
      return;
    }

    // Set the max near clipping plane and the min far clipping plane
    range[0] = a * bounds[0] + b * bounds[2] + c * bounds[4] + d;
    range[1] = 1e-18;

    // Find the closest / farthest bounding box vertex
    for (k = 0; k < 2; k += 1) {
      for (j = 0; j < 2; j += 1) {
        for (i = 0; i < 2; i += 1) {
          dist = a * bounds[i] + b * bounds[2 + j] + c * bounds[4 + k] + d;
          range[0] = (dist < range[0]) ? (dist) : (range[0]);
          range[1] = (dist > range[1]) ? (dist) : (range[1]);
        }
      }
    }

    // Do not let the range behind the camera throw off the calculation.
    if (range[0] < 0.0) {
      range[0] = 0.0;
    }

    // Give ourselves a little breathing room
    range[0] = 0.99 * range[0] - (range[1] - range[0]) * 0.5;
    range[1] = 1.01 * range[1] + (range[1] - range[0]) * 0.5;

    // Make sure near is not bigger than far
    range[0] = (range[0] >= range[1]) ? (0.01 * range[1]) : (range[0]);

    // Make sure near is at least some fraction of far - this prevents near
    // from being behind the camera or too close in front. How close is too
    // close depends on the resolution of the depth buffer.
    if (!m_this.m_nearClippingPlaneTolerance) {
      m_this.m_nearClippingPlaneTolerance = 0.01;

      if (m_this.m_depthBits && m_this.m_depthBits > 16) {
        m_this.m_nearClippingPlaneTolerance = 0.001;
      }
    }

    // make sure the front clipping range is not too far from the far clippnig
    // range, this is to make sure that the zbuffer resolution is effectively
    // used.
    if (range[0] < m_this.m_nearClippingPlaneTolerance * range[1]) {
      range[0] = m_this.m_nearClippingPlaneTolerance * range[1];
    }

    m_this.m_camera.setClippingRange(range[0], range[1]);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Resize viewport given a width and height
   */
  ////////////////////////////////////////////////////////////////////////////
  this.resize = function (width, height) {
    if (!width || !height) {
      return;
    }
    // @note: where do m_this.m_x and m_this.m_y come from?
    m_this.positionAndResize(m_this.m_x, m_this.m_y, width, height);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Resize viewport given a position, width and height
   */
  ////////////////////////////////////////////////////////////////////////////
  this.positionAndResize = function (x, y, width, height) {
    var i;

    // TODO move this code to camera
    if (x < 0 || y < 0 || width <= 0 || height <= 0) {
      console.log('[error] Invalid position and resize values',
        x, y, width, height);
      return;
    }

    //If we're allowing this renderer to resize ...
    if (m_this.m_resizable) {
      m_this.m_width = width;
      m_this.m_height = height;

      m_this.m_camera.setViewAspect(width / height);
      m_this.m_camera.setParallelExtents({width: width, height: height});
      m_this.modified();
    }

    if (m_this.m_renderPasses) {
      for (i = 0; i < m_this.m_renderPasses.length; i += 1) {
        m_this.m_renderPasses[i].resize(width, height);
        m_this.m_renderPasses[i].renderer().positionAndResize(x, y, width, height);
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Add new actor to the collection
   *
   * @param actor
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.addActor = function (actor) {
    if (actor instanceof vgl.actor) {
      m_this.m_sceneRoot.addChild(actor);
      m_this.modified();
      return true;
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return true if this renderer has this actor attached, false otherwise.
   *
   * @param actor
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.hasActor = function (actor) {
    return m_this.m_sceneRoot.hasChild(actor);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Add an array of actors to the collection
   */
  ////////////////////////////////////////////////////////////////////////////
  this.addActors = function (actors) {
    var i = null;
    if (actors instanceof Array) {
      for (i = 0; i < actors.length; i += 1) {
        m_this.m_sceneRoot.addChild(actors[i]);
      }
      m_this.modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Remove the actor from the collection
   *
   * @param actor
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.removeActor = function (actor) {
    if (m_this.m_sceneRoot.children().indexOf(actor) !== -1) {
      /* When we remove an actor, free the VBOs of the mapper and mark the
       * mapper as modified; it will reallocate VBOs as necessary. */
      if (actor.mapper()) {
        actor.mapper().deleteVertexBufferObjects();
        actor.mapper().modified();
      }
      m_this.m_sceneRoot.removeChild(actor);
      m_this.modified();
      return true;
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Remove actors from the collection
   *
   * @param actors
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.removeActors = function (actors) {
    if (!(actors instanceof Array)) {
      return false;
    }

    var i;
    for (i = 0; i < actors.length; i += 1) {
      m_this.m_sceneRoot.removeChild(actors[i]);
    }
    m_this.modified();
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Remove all actors for a renderer
   *
   * @returns {*}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.removeAllActors = function () {
    return m_this.m_sceneRoot.removeChildren();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Transform a point in the world space to display space
   */
  ////////////////////////////////////////////////////////////////////////////
  this.worldToDisplay = function (worldPt, viewMatrix, projectionMatrix, width,
                                 height) {
    var viewProjectionMatrix = mat4.create(),
        winX = null,
        winY = null,
        winZ = null,
        winW = null,
        clipPt = null;


    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);

    // Transform world to clipping coordinates
    clipPt = vec4.create();
    vec4.transformMat4(clipPt, worldPt, viewProjectionMatrix);

    if (clipPt[3] !== 0.0) {
      clipPt[0] = clipPt[0] / clipPt[3];
      clipPt[1] = clipPt[1] / clipPt[3];
      clipPt[2] = clipPt[2] / clipPt[3];
      clipPt[3] = 1.0;
    }

    winX = (((clipPt[0]) + 1) / 2.0) * width;
    // We calculate -point3D.getY() because the screen Y axis is
    // oriented top->down
    winY = ((1 - clipPt[1]) / 2.0) * height;
    winZ = clipPt[2];
    winW = clipPt[3];

    return vec4.fromValues(winX, winY, winZ, winW);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Transform a point in display space to world space
   * @param displayPt
   * @param viewMatrix
   * @param projectionMatrix
   * @param width
   * @param height
   * @returns {vec4}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.displayToWorld = function (displayPt, viewMatrix, projectionMatrix,
                                 width, height) {
    var x = (2.0 * displayPt[0] / width) - 1,
        y = -(2.0 * displayPt[1] / height) + 1,
        z = displayPt[2],
        viewProjectionInverse = mat4.create(),
        worldPt = null;

    mat4.multiply(viewProjectionInverse, projectionMatrix, viewMatrix);
    mat4.invert(viewProjectionInverse, viewProjectionInverse);

    worldPt = vec4.fromValues(x, y, z, 1);
    vec4.transformMat4(worldPt, worldPt, viewProjectionInverse);
    if (worldPt[3] !== 0.0) {
      worldPt[0] = worldPt[0] / worldPt[3];
      worldPt[1] = worldPt[1] / worldPt[3];
      worldPt[2] = worldPt[2] / worldPt[3];
      worldPt[3] = 1.0;
    }

    return worldPt;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the focusDisplayPoint
   * @returns {vec4}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.focusDisplayPoint = function () {
    var focalPoint = m_this.m_camera.focalPoint(),
      focusWorldPt = vec4.fromValues(
        focalPoint[0], focalPoint[1], focalPoint[2], 1);

    return m_this.worldToDisplay(
      focusWorldPt, m_this.m_camera.viewMatrix(),
      m_this.m_camera.projectionMatrix(), m_this.m_width, m_this.m_height);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Will the scene be reset.
   * @returns {bool}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.resetScene = function () {
    return m_this.m_resetScene;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * If true the scene will be reset, otherwise the scene will not be
   * automatically reset.
   *
   * @param reset
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setResetScene = function (reset) {
    if (m_this.m_resetScene !== reset) {
      m_this.m_resetScene = reset;
      m_this.modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Will the clipping range be reset
   * @returns {bool}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.resetClippingRange = function () {
    return m_this.m_resetClippingRange;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * If true the camera clipping range will be reset, otherwise the scene will
   * not be automatically reset.
   *
   * @param reset
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setResetClippingRange = function (reset) {
    if (m_this.m_resetClippingRange !== reset) {
      m_this.m_resetClippingRange = reset;
      m_this.modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   *
   */
  ////////////////////////////////////////////////////////////////////////////
  this.addRenderPass = function (renPass) {
    var i;

    if (m_this.m_renderPasses) {
      for (i = 0; i < m_this.m_renderPasses.length; i += 1) {
        if (renPass === m_this.m_renderPasses[i]) {
          return;
        }
      }
    }

    m_this.m_renderPasses = [];
    m_this.m_renderPasses.push(renPass);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   *
   */
  ////////////////////////////////////////////////////////////////////////////
  this.removeRenderPass = function (renPass) {
    renPass = renPass; // TODO Implement this
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   *
   */
  ////////////////////////////////////////////////////////////////////////////
  this._cleanup = function (renderState) {
    var children = m_this.m_sceneRoot.children();
    for (var i = 0; i < children.length; i += 1) {
      var actor = children[i];
      actor.material()._cleanup(renderState);
      actor.mapper()._cleanup(renderState);
    }

    m_this.m_sceneRoot.removeChildren();
  };

  return m_this;
};

inherit(vgl.renderer, vgl.graphicsObject);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, vec4, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class renderWindow
 *
 * @class
 * @returns {vgl.renderWindow}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.renderWindow = function (canvas) {
  'use strict';

  if (!(this instanceof vgl.renderWindow)) {
    return new vgl.renderWindow(canvas);
  }
  vgl.graphicsObject.call(this);

  /** @private */
  var m_this = this,
      m_x = 0,
      m_y = 0,
      m_width = 400,
      m_height = 400,
      m_canvas = canvas,
      m_activeRender = null,
      m_renderers = [],
      m_context = null;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get size of the render window
   *
   * @returns {Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.windowSize = function () {
    return [m_width, m_height];
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set size of the render window
   *
   * @param width
   * @param height
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setWindowSize = function (width, height) {

    if (m_width !== width || m_height !== height) {
      m_width = width;
      m_height = height;

      m_this.modified();

      return true;
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get window position (top left coordinates)
   *
   * @returns {Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.windowPosition = function () {
    return [m_x, m_y];
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set window position (top left coordinates)
   *
   * @param x
   * @param y
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setWindowPosition = function (x, y) {
    if ((m_x !== x) || (m_y !== y)) {
      m_x = x;
      m_y = y;
      m_this.modified();
      return true;
    }
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return all renderers contained in the render window
   * @returns {Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.renderers = function () {
    return m_renderers;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get active renderer of the the render window
   *
   * @returns vgl.renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.activeRenderer = function () {
    return m_activeRender;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Add renderer to the render window
   *
   * @param ren
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.addRenderer = function (ren) {
    if (m_this.hasRenderer(ren) === false) {
      m_renderers.push(ren);
      ren.setRenderWindow(m_this);
      if (m_activeRender === null) {
        m_activeRender = ren;
      }
      if (ren.layer() !== 0) {
        ren.camera().setClearMask(vgl.GL.DepthBufferBit);
      }
      m_this.modified();
      return true;
    }
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Remove renderer from the render window
   *
   * @param ren
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.removeRenderer = function (ren) {
    var index = m_renderers.indexOf(ren);
    if (index !== -1) {
      if (m_activeRender === ren) {
        m_activeRender = null;
      }
      m_renderers.splice(index, 1);
      m_this.modified();
      return true;
    }
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return a renderer at a given index
   *
   * @param index
   * @returns {vgl.renderer}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.getRenderer = function (index) {
    if (index < m_renderers.length) {
      return m_renderers[index];
    }

    console.log('[WARNING] Out of index array');
    return null;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Check if the renderer exists
   *
   * @param ren
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.hasRenderer = function (ren) {
    var i;
    for (i = 0; i < m_renderers.length; i += 1) {
      if (ren === m_renderers[i]) {
        return true;
      }
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Resize window
   *
   * @param width
   * @param height
   */
  ////////////////////////////////////////////////////////////////////////////
  this.resize = function (width, height) {
    m_this.positionAndResize(m_x, m_y, width, height);
    m_this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Resize and reposition the window
   *
   * @param x
   * @param y
   * @param width
   * @param height
   */
  ////////////////////////////////////////////////////////////////////////////
  this.positionAndResize = function (x, y, width, height) {
    m_x = x;
    m_y = y;
    m_width = width;
    m_height = height;
    var i;
    for (i = 0; i < m_renderers.length; i += 1) {
      m_renderers[i].positionAndResize(m_x, m_y, m_width, m_height);
    }
    m_this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create the window
   *
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this._setup = function (renderState) {
    renderState = renderState; /* unused parameter */
    m_context = null;

    try {
      // Try to grab the standard context. If it fails, fallback to
      // experimental.
      m_context = m_canvas.getContext('webgl') ||
            m_canvas.getContext('experimental-webgl');

      // Set width and height of renderers if not set already
      var i;
      for (i = 0; i < m_renderers.length; i += 1) {
        if ((m_renderers[i].width() > m_width) ||
            m_renderers[i].width() === 0 ||
            (m_renderers[i].height() > m_height) ||
            m_renderers[i].height() === 0) {
          m_renderers[i].resize(m_x, m_y, m_width, m_height);
        }
      }

      return true;
    }
    catch (e) {
    }

    // If we don't have a GL context, give up now
    if (!m_context) {
      console('[ERROR] Unable to initialize WebGL. Your browser may not support it.');
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return current GL context
   */
  ////////////////////////////////////////////////////////////////////////////
  this.context = function () {
    return m_context;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Delete this window and release any graphics resources
   */
  ////////////////////////////////////////////////////////////////////////////
  this._cleanup = function (renderState) {
    var i;
    for (i = 0; i < m_renderers.length; i += 1) {
      m_renderers[i]._cleanup(renderState);
    }
    vgl.clearCachedShaders(renderState ? renderState.m_context : null);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Render the scene
   */
  ////////////////////////////////////////////////////////////////////////////
  this.render = function () {
    var i;
    m_renderers.sort(function (a, b) {return a.layer() - b.layer();});
    for (i = 0; i < m_renderers.length; i += 1) {
      m_renderers[i].render();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the focusDisplayPoint from the activeRenderer
   * @returns {vec4}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.focusDisplayPoint = function () {
    return m_activeRender.focusDisplayPoint();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Transform a point in display space to world space
   * @param {Number} x
   * @param {Number} y
   * @param {vec4} focusDisplayPoint
   * @returns {vec4}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.displayToWorld = function (x, y, focusDisplayPoint, ren) {
    ren = ren === undefined ? ren = m_activeRender : ren;

    var camera = ren.camera();
    if (!focusDisplayPoint) {
      focusDisplayPoint = ren.focusDisplayPoint();
    }

    return ren.displayToWorld(
      vec4.fromValues(x, y, focusDisplayPoint[2], 1.0), camera.viewMatrix(),
      camera.projectionMatrix(), m_width, m_height);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Transform a point in display space to world space
   * @param {Number} x
   * @param {Number} y
   * @param {vec4} focusDisplayPoint
   * @returns {vec4}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.worldToDisplay = function (x, y, z, ren) {
    ren = ren === undefined ? ren = m_activeRender : ren;
    var camera = ren.camera();
    return ren.worldToDisplay(
      vec4.fromValues(x, y, z, 1.0), camera.viewMatrix(),
      camera.projectionMatrix(), m_width, m_height);
  };

  return m_this;
};

inherit(vgl.renderWindow, vgl.graphicsObject);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, vec3, vec4, mat4, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class camera
 *
 * @class
 * @returns {vgl.camera}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.camera = function (arg) {
  'use strict';

  if (!(this instanceof vgl.camera)) {
    return new vgl.camera(arg);
  }
  vgl.groupNode.call(this);
  arg = arg || {};

  /** @private */
  var m_viewAngle = (Math.PI * 30) / 180.0,
      m_position = vec4.fromValues(0.0, 0.0, 1.0, 1.0),
      m_focalPoint = vec4.fromValues(0.0, 0.0, 0.0, 1.0),
      m_centerOfRotation = vec3.fromValues(0.0, 0.0, 0.0),
      m_viewUp = vec4.fromValues(0.0, 1.0, 0.0, 0.0),
      m_rightDir = vec4.fromValues(1.0, 0.0, 0.0, 0.0),
      m_near = 0.01,
      m_far = 10000.0,
      m_viewAspect = 1.0,
      m_directionOfProjection = vec4.fromValues(0.0, 0.0, -1.0, 0.0),
      m_viewPlaneNormal = vec4.fromValues(0.0, 0.0, 1.0, 0.0),
      m_viewMatrix = mat4.create(),
      m_projectionMatrix = mat4.create(),
      m_computeModelViewMatrixTime = vgl.timestamp(),
      m_computeProjectMatrixTime = vgl.timestamp(),
      m_left = -1.0,
      m_right = 1.0,
      m_top = +1.0,
      m_bottom = -1.0,
      m_parallelExtents = {zoom: 1, tilesize: 256},
      m_enableTranslation = true,
      m_enableRotation = true,
      m_enableScale = true,
      m_enableParallelProjection = false,
      m_clearColor = [0.0, 0.0, 0.0, 0.0],
      m_clearDepth = 1.0,
      /*jshint bitwise: false */
      m_clearMask = vgl.GL.COLOR_BUFFER_BIT |
                    vgl.GL.DEPTH_BUFFER_BIT;
  /*jshint bitwise: true */

  if (arg.parallelProjection !== undefined) {
    m_enableParallelProjection = arg.parallelProjection ? true : false;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get view angle of the camera
   */
  ////////////////////////////////////////////////////////////////////////////
  this.viewAngle = function () {
    return m_viewAngle;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set view angle of the camera in degrees, which is converted to radians.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setViewAngleDegrees = function (a) {
    m_viewAngle = (Math.PI * a) / 180.0;
    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set view angle of the camera in degrees, which is converted to radians.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setViewAngle = function (a) {
    if (m_enableScale) {
      m_viewAngle = a;
      this.modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get position of the camera
   */
  ////////////////////////////////////////////////////////////////////////////
  this.position = function () {
    return m_position;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set position of the camera
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setPosition = function (x, y, z) {
    if (m_enableTranslation) {
      m_position = vec4.fromValues(x, y, z, 1.0);
      this.modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get focal point of the camera
   */
  ////////////////////////////////////////////////////////////////////////////
  this.focalPoint = function () {
    return m_focalPoint;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set focal point of the camera
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setFocalPoint = function (x, y, z) {
    if (m_enableRotation && m_enableTranslation) {
      m_focalPoint = vec4.fromValues(x, y, z, 1.0);
      this.modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get view-up direction of camera
   */
  ////////////////////////////////////////////////////////////////////////////
  this.viewUpDirection = function () {
    return m_viewUp;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set view-up direction of the camera
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setViewUpDirection = function (x, y, z) {
    m_viewUp = vec4.fromValues(x, y, z, 0);
    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get center of rotation for camera
   */
  ////////////////////////////////////////////////////////////////////////////
  this.centerOfRotation = function () {
    return m_centerOfRotation;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set center of rotation for camera
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setCenterOfRotation = function (centerOfRotation) {
    m_centerOfRotation = centerOfRotation;
    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get clipping range of the camera
   */
  ////////////////////////////////////////////////////////////////////////////
  this.clippingRange = function () {
    return [m_near, m_far];
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set clipping range of the camera
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setClippingRange = function (near, far) {
    m_near = near;
    m_far = far;
    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get view aspect
   */
  ////////////////////////////////////////////////////////////////////////////
  this.viewAspect = function () {
    return m_viewAspect;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set view aspect
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setViewAspect = function (aspect) {
    m_viewAspect = aspect;
    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return active mode for scaling (enabled / disabled)
   */
  ////////////////////////////////////////////////////////////////////////////
  this.enableScale = function () {
    return m_enableScale;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Enable/disable scaling
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setEnableScale = function (flag) {
    if (flag !== m_enableScale) {
      m_enableScale = flag;
      this.modified();
      return true;
    }

    return m_enableScale;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return active mode for rotation (enabled / disabled)
   */
  ////////////////////////////////////////////////////////////////////////////
  this.enableRotation = function () {
    return m_enableRotation;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Enable / disable rotation
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setEnableRotation = function (flag) {
    if (flag !== m_enableRotation) {
      m_enableRotation = flag;
      this.modified();
      return true;
    }

    return m_enableRotation;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return active mode for translation (enabled/disabled)
   */
  ////////////////////////////////////////////////////////////////////////////
  this.enableTranslation = function () {
    return m_enableTranslation;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Enable / disable translation
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setEnableTranslation = function (flag) {
    if (flag !== m_enableTranslation) {
      m_enableTranslation = flag;
      this.modified();
      return true;
    }

    return m_enableTranslation;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return if parallel projection is enabled
   */
  ////////////////////////////////////////////////////////////////////////////
  this.isEnabledParallelProjection = function () {
    return m_enableParallelProjection;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Enable / disable parallel projection
   */
  ////////////////////////////////////////////////////////////////////////////
  this.enableParallelProjection = function (flag) {
    if (flag !== m_enableParallelProjection) {
      m_enableParallelProjection = flag;
      this.modified();
      return true;
    }

    return m_enableParallelProjection;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Enable / disable parallel projection
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setEnableParallelProjection = function (flag) {
    return this.enableParallelProjection(flag);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get parallel projection parameters
   */
  ////////////////////////////////////////////////////////////////////////////
  this.parallelProjection = function () {
    return {left: m_left, right: m_right, top: m_top, bottom: m_bottom};
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set parallel projection parameters
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setParallelProjection = function (left, right, top, bottom) {
    m_left = left;
    m_right = right;
    m_top = top;
    m_bottom = bottom;
    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get parallel projection extents parameters
   */
  ////////////////////////////////////////////////////////////////////////////
  this.parallelExtents = function () {
    return m_parallelExtents;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set parallel projection extents parameters
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setParallelExtents = function (extents) {
    var prop = ['width', 'height', 'zoom', 'tilesize'], mod = false, i, key;
    for (i = 0; i < prop.length; i += 1) {
      key = prop[i];
      if (extents[key] !== undefined &&
          extents[key] !== m_parallelExtents[key]) {
        m_parallelExtents[key] = extents[key];
        mod = true;
      }
    }
    if (mod && m_parallelExtents.width && m_parallelExtents.height &&
        m_parallelExtents.zoom !== undefined && m_parallelExtents.tilesize) {
      var unitsPerPixel = this.unitsPerPixel(m_parallelExtents.zoom,
                                             m_parallelExtents.tilesize);
      m_right = unitsPerPixel * m_parallelExtents.width / 2;
      m_left = -m_right;
      m_top = unitsPerPixel * m_parallelExtents.height / 2;
      m_bottom = -m_top;
      this.modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Compute the units per pixel.
   *
   * @param zoom: tile zoom level.
   * @param tilesize: number of pixels per tile (defaults to 256).
   * @returns: unitsPerPixel.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.unitsPerPixel = function (zoom, tilesize) {
    tilesize = tilesize || 256;
    return 360.0 * Math.pow(2, -zoom) / tilesize;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return direction of projection
   */
  ////////////////////////////////////////////////////////////////////////////
  this.directionOfProjection = function () {
    this.computeDirectionOfProjection();
    return m_directionOfProjection;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return view plane normal direction
   */
  ////////////////////////////////////////////////////////////////////////////
  this.viewPlaneNormal = function () {
    this.computeViewPlaneNormal();
    return m_viewPlaneNormal;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return view-matrix for the camera This method does not compute the
   * view-matrix for the camera. It is assumed that a call to computeViewMatrix
   * has been made earlier.
   *
   * @returns {mat4}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.viewMatrix = function () {
    return this.computeViewMatrix();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set the view-matrix for the camera and mark that it is up to date so that
   * it won't be recomputed unless something else changes.
   *
   * @param {mat4} view: new view matrix.
   * @param {boolean} preserveType: if true, clone the input using slice.  This
   *    can be used to ensure the array is a specific precision.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setViewMatrix = function (view, preserveType) {
    if (!preserveType) {
      mat4.copy(m_viewMatrix, view);
    } else {
      m_viewMatrix = view.slice();
    }
    m_computeModelViewMatrixTime.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return camera projection matrix This method does not compute the
   * projection-matrix for the camera. It is assumed that a call to
   * computeProjectionMatrix has been made earlier.
   *
   * @returns {mat4}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.projectionMatrix = function () {
    return this.computeProjectionMatrix();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set the projection-matrix for the camera and mark that it is up to date so
   * that it won't be recomputed unless something else changes.
   *
   * @param {mat4} proj: new projection matrix.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setProjectionMatrix = function (proj) {
    mat4.copy(m_projectionMatrix, proj);
    m_computeProjectMatrixTime.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return clear mask used by this camera
   *
   * @returns {number}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.clearMask = function () {
    return m_clearMask;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set clear mask for camera
   *
   * @param mask
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setClearMask = function (mask) {
    m_clearMask = mask;
    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get clear color (background color) of the camera
   *
   * @returns {Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.clearColor = function () {
    return m_clearColor;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set clear color (background color) for the camera
   *
   * @param color RGBA
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setClearColor = function (r, g, b, a) {
    m_clearColor[0] = r;
    m_clearColor[1] = g;
    m_clearColor[2] = b;
    m_clearColor[3] = a;

    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   *
   * @returns {{1.0: null}}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.clearDepth = function () {
    return m_clearDepth;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   *
   * @param depth
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setClearDepth = function (depth) {
    m_clearDepth = depth;
    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Compute direction of projection
   */
  ////////////////////////////////////////////////////////////////////////////
  this.computeDirectionOfProjection = function () {
    vec3.subtract(m_directionOfProjection, m_focalPoint, m_position);
    vec3.normalize(m_directionOfProjection, m_directionOfProjection);
    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Compute view plane normal
   */
  ////////////////////////////////////////////////////////////////////////////
  this.computeViewPlaneNormal = function () {
    m_viewPlaneNormal[0] = -m_directionOfProjection[0];
    m_viewPlaneNormal[1] = -m_directionOfProjection[1];
    m_viewPlaneNormal[2] = -m_directionOfProjection[2];
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Move camera closer or further away from the scene
   */
  ////////////////////////////////////////////////////////////////////////////
  this.zoom = function (d, dir) {
    if (d === 0) {
      return;
    }

    if (!m_enableTranslation) {
      return;
    }

    d = d * vec3.distance(m_focalPoint, m_position);
    if (!dir) {
      dir = m_directionOfProjection;
      m_position[0] = m_focalPoint[0] - d * dir[0];
      m_position[1] = m_focalPoint[1] - d * dir[1];
      m_position[2] = m_focalPoint[2] - d * dir[2];
    } else {
      m_position[0] = m_position[0]  + d * dir[0];
      m_position[1] = m_position[1]  + d * dir[1];
      m_position[2] = m_position[2]  + d * dir[2];
    }

    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Move camera sideways
   */
  ////////////////////////////////////////////////////////////////////////////
  this.pan = function (dx, dy, dz) {
    if (!m_enableTranslation) {
      return;
    }

    m_position[0] += dx;
    m_position[1] += dy;
    m_position[2] += dz;

    m_focalPoint[0] += dx;
    m_focalPoint[1] += dy;
    m_focalPoint[2] += dz;

    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Compute camera coordinate axes
   */
  ////////////////////////////////////////////////////////////////////////////
  this.computeOrthogonalAxes = function () {
    this.computeDirectionOfProjection();
    vec3.cross(m_rightDir, m_directionOfProjection, m_viewUp);
    vec3.normalize(m_rightDir, m_rightDir);
    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Rotate camera around center of rotation
   * @param dx Rotation around vertical axis in degrees
   * @param dy Rotation around horizontal axis in degrees
   */
  ////////////////////////////////////////////////////////////////////////////
  this.rotate = function (dx, dy) {
    if (!m_enableRotation) {
      return;
    }

    // Convert degrees into radians
    dx = 0.5 * dx * (Math.PI / 180.0);
    dy = 0.5 * dy * (Math.PI / 180.0);

    var mat = mat4.create(),
        inverseCenterOfRotation = new vec3.create();

    mat4.identity(mat);

    inverseCenterOfRotation[0] = -m_centerOfRotation[0];
    inverseCenterOfRotation[1] = -m_centerOfRotation[1];
    inverseCenterOfRotation[2] = -m_centerOfRotation[2];

    mat4.translate(mat, mat, m_centerOfRotation);
    mat4.rotate(mat, mat, dx, m_viewUp);
    mat4.rotate(mat, mat, dy, m_rightDir);
    mat4.translate(mat, mat, inverseCenterOfRotation);

    vec4.transformMat4(m_position, m_position, mat);
    vec4.transformMat4(m_focalPoint, m_focalPoint, mat);

    // Update viewup vector
    vec4.transformMat4(m_viewUp, m_viewUp, mat);
    vec4.normalize(m_viewUp, m_viewUp);

    // Update direction of projection
    this.computeOrthogonalAxes();

    // Mark modified
    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Compute camera view matrix
   */
  ////////////////////////////////////////////////////////////////////////////
  this.computeViewMatrix = function () {
    if (m_computeModelViewMatrixTime.getMTime() < this.getMTime()) {
      mat4.lookAt(m_viewMatrix, m_position, m_focalPoint, m_viewUp);
      m_computeModelViewMatrixTime.modified();
    }
    return m_viewMatrix;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Check if the texture should be aligned to the screen.  Alignment only
   * occurs if the parallel extents contain width, height, and a
   * close-to-integer zoom level, and if the units-per-pixel value has been
   * computed.  The camera must either be in parallel projection mode OR must
   * have a perspective camera which is oriented along the z-axis without any
   * rotation.
   *
   * @returns: either null if no alignment should occur, or an alignment object
   *           with the rounding value and offsets.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.viewAlignment = function () {
    if (!m_enableParallelProjection) {
      /* If we aren't in parallel projection mode, ensure that the projection
       * matrix meets strict specifications */
      var proj = this.projectionMatrix();
      if (proj[1] || proj[2] || proj[3] || proj[4] || proj[6] || proj[7] ||
          proj[8] || proj[9] || proj[12] || proj[13] || proj[15]) {
        return null;
      }
    }
    var unitsPerPixel = this.unitsPerPixel(m_parallelExtents.zoom,
                                           m_parallelExtents.tilesize);
    /* If we don't have screen dimensions, we can't know how to align pixels */
    if (!m_parallelExtents.width || !m_parallelExtents.height ||
        !unitsPerPixel) {
      return null;
    }
    /* If we aren't at an integer zoom level, we shouldn't align pixels.  If
     * we are really close to an integer zoom level, that is good enough. */
    if (parseFloat(m_parallelExtents.zoom.toFixed(6)) !==
        parseFloat(m_parallelExtents.zoom.toFixed(0))) {
      return null;
    }
    var align = {roundx: unitsPerPixel, roundy: unitsPerPixel, dx: 0, dy: 0};
    /* If the screen is an odd number of pixels, shift the view center to the
     * center of a pixel so that the pixels fit discretely across the screen.
     * If an even number of pixels, align the view center between pixels for
     * the same reason. */
    if (m_parallelExtents.width % 2) {
      align.dx = unitsPerPixel * 0.5;
    }
    if (m_parallelExtents.height % 2) {
      align.dy = unitsPerPixel * 0.5;
    }
    return align;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Compute camera projection matrix
   */
  ////////////////////////////////////////////////////////////////////////////
  this.computeProjectionMatrix = function () {
    if (m_computeProjectMatrixTime.getMTime() < this.getMTime()) {
      if (!m_enableParallelProjection) {
        mat4.perspective(m_projectionMatrix, m_viewAngle, m_viewAspect, m_near, m_far);
      } else {
        mat4.ortho(m_projectionMatrix,
          m_left, m_right, m_bottom, m_top, m_near, m_far);
      }

      m_computeProjectMatrixTime.modified();
    }

    return m_projectionMatrix;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert a zoom level and window size to a camera height.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.zoomToHeight = function (zoom, width, height) {
    return vgl.zoomToHeight(zoom, width, height, m_viewAngle);
  };

  this.computeDirectionOfProjection();

  return this;
};

inherit(vgl.camera, vgl.groupNode);

////////////////////////////////////////////////////////////////////////////
/**
 * Convert a zoom level and window size to a camera height.
 *
 * @param zoom: Zoom level, as used in OSM maps.
 * @param width: width of the window.
 * @param height: height of the window.
 * @returns: perspective camera height.
 */
////////////////////////////////////////////////////////////////////////////
vgl.zoomToHeight = function (zoom, width, height, viewAngle) {
  'use strict';
  viewAngle = viewAngle || (30 * Math.PI / 180.0);
  var newZ = 360 * Math.pow(2, -zoom);
  newZ /= Math.tan(viewAngle / 2) * 2 * 256 / height;
  return newZ;
};

////////////////////////////////////////////////////////////////////////////
/**
 * Convert a camera height and window size to a zoom level.
 *
 * @param z: perspective camera height.
 * @param width: width of the window.
 * @param height: height of the window.
 * @returns: zoom level.
 */
////////////////////////////////////////////////////////////////////////////
vgl.heightToZoom = function (z, width, height, viewAngle) {
  'use strict';
  viewAngle = viewAngle || (30 * Math.PI / 180.0);
  z *= Math.tan(viewAngle / 2) * 2 * 256 / height;
  var zoom = -Math.log2(z / 360);
  return zoom;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, inherit, $*/
//////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class interactorStyle
 *
 * @class vgl.interactorStyle
 * interactorStyle is a base class for all interactor styles
 * @returns {vgl.interactorStyle}
 */
////////////////////////////////////////////////////////////////////////////
vgl.interactorStyle = function () {
  'use strict';

  if (!(this instanceof vgl.interactorStyle)) {
    return new vgl.interactorStyle();
  }
  vgl.object.call(this);

  // Private member variables
  var m_that = this,
      m_viewer = null;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return viewer referenced by the interactor style
   *
   * @returns {null}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.viewer = function () {
    return m_viewer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set viewer for the interactor style
   *
   * @param viewer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setViewer = function (viewer) {
    if (viewer !== m_viewer) {
      m_viewer = viewer;
      $(m_viewer).on(vgl.event.mousePress, m_that.handleMouseDown);
      $(m_viewer).on(vgl.event.mouseRelease, m_that.handleMouseUp);
      $(m_viewer).on(vgl.event.mouseMove, m_that.handleMouseMove);
      $(m_viewer).on(vgl.event.mouseOut, m_that.handleMouseOut);
      $(m_viewer).on(vgl.event.mouseWheel, m_that.handleMouseWheel);
      $(m_viewer).on(vgl.event.keyPress, m_that.handleKeyPress);
      $(m_viewer).on(vgl.event.mouseContextMenu, m_that.handleContextMenu);
      $(m_viewer).on(vgl.event.click, m_that.handleClick);
      $(m_viewer).on(vgl.event.dblClick, m_that.handleDoubleClick);
      this.modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse down event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleMouseDown = function (event) {
    event = event; /* unused parameter */
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse up event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleMouseUp = function (event) {
    event = event; /* unused parameter */
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse move event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleMouseMove = function (event) {
    event = event; /* unused parameter */
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse move event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleMouseOut = function (event) {
    event = event; /* unused parameter */
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse wheel event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleMouseWheel = function (event) {
    event = event; /* unused parameter */
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle click event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleClick = function (event) {
    event = event; /* unused parameter */
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle double click event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleDoubleClick = function (event) {
    event = event; /* unused parameter */
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle key press event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleKeyPress = function (event) {
    event = event; /* unused parameter */
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle context menu event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleContextMenu = function (event) {
    event = event; /* unused parameter */
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Reset to default
   */
  ////////////////////////////////////////////////////////////////////////////
  this.reset = function () {
    return true;
  };

  return this;
};

inherit(vgl.interactorStyle, vgl.object);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, vec4, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of trackballInteractorStyle
 *
 * @class vgl.trackballInteractorStyle
 * @returns {vgl.trackballInteractorStyle}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.trackballInteractorStyle = function () {
  'use strict';

  if (!(this instanceof vgl.trackballInteractorStyle)) {
    return new vgl.trackballInteractorStyle();
  }
  vgl.interactorStyle.call(this);
  var m_that = this,
      m_leftMouseBtnDown = false,
      m_rightMouseBtnDown = false,
      m_midMouseBtnDown = false,
      m_outsideCanvas,
      m_currPos = {x: 0, y: 0},
      m_lastPos = {x: 0, y: 0};


  /////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse move event
   *
   * @param event
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.handleMouseMove = function (event) {
    var width = m_that.viewer().renderWindow().windowSize()[0],
        height = m_that.viewer().renderWindow().windowSize()[1],
        ren = m_that.viewer().renderWindow().activeRenderer(),
        cam = ren.camera(), coords = m_that.viewer().relMouseCoords(event),
        fp, fdp, fwp, dp1, dp2, wp1, wp2, dx, dy, dz, m_zTrans;

    m_outsideCanvas = false;
    m_currPos = {x: 0, y: 0};

    if ((coords.x < 0) || (coords.x > width)) {
      m_currPos.x = 0;
      m_outsideCanvas = true;
    } else {
      m_currPos.x = coords.x;
    }
    if ((coords.y < 0) || (coords.y > height)) {
      m_currPos.y = 0;
      m_outsideCanvas = true;
    } else {
      m_currPos.y = coords.y;
    }
    if (m_outsideCanvas === true) {
      return;
    }

    fp = cam.focalPoint();
    fwp = vec4.fromValues(fp[0], fp[1], fp[2], 1);
    fdp = ren.worldToDisplay(fwp, cam.viewMatrix(),
                              cam.projectionMatrix(), width, height);

    dp1 = vec4.fromValues(m_currPos.x, m_currPos.y, fdp[2], 1.0);
    dp2 = vec4.fromValues(m_lastPos.x, m_lastPos.y, fdp[2], 1.0);

    wp1 = ren.displayToWorld(dp1, cam.viewMatrix(), cam.projectionMatrix(),
                             width, height);
    wp2 = ren.displayToWorld(dp2, cam.viewMatrix(), cam.projectionMatrix(),
                             width, height);

    dx = wp1[0] - wp2[0];
    dy = wp1[1] - wp2[1];
    dz = wp1[2] - wp2[2];

    if (m_midMouseBtnDown) {
      cam.pan(-dx, -dy, -dz);
      m_that.viewer().render();
    }
    if (m_leftMouseBtnDown) {
      cam.rotate((m_lastPos.x - m_currPos.x),
      (m_lastPos.y - m_currPos.y));
      ren.resetCameraClippingRange();
      m_that.viewer().render();
    }
    if (m_rightMouseBtnDown) {
      /// 2.0 is the speed up factor
      m_zTrans = 2.0 * (m_currPos.y - m_lastPos.y) / height;

      // Calculate zoom scale here
      if (m_zTrans > 0) {
        cam.zoom(1 - Math.abs(m_zTrans));
      } else {
        cam.zoom(1 + Math.abs(m_zTrans));
      }
      ren.resetCameraClippingRange();
      m_that.viewer().render();
    }
    m_lastPos.x = m_currPos.x;
    m_lastPos.y = m_currPos.y;
    return false;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse down event
   *
   * @param event
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.handleMouseDown = function (event) {
    var coords;

    if (event.button === 0) {
      m_leftMouseBtnDown = true;
    }
    if (event.button === 1) {
      m_midMouseBtnDown = true;
    }
    if (event.button === 2) {
      m_rightMouseBtnDown = true;
    }
    coords = m_that.viewer().relMouseCoords(event);
    if (coords.x < 0) {
      m_lastPos.x = 0;
    } else {
      m_lastPos.x = coords.x;
    }
    if (coords.y < 0) {
      m_lastPos.y = 0;
    } else {
      m_lastPos.y = coords.y;
    }
    return false;
  };

  // @note We never get mouse up from scroll bar: See the bug report here
  // http://bugs.jquery.com/ticket/8184
  /////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse up event
   *
   * @param event
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.handleMouseUp = function (event) {
    if (event.button === 0) {
      m_leftMouseBtnDown = false;
    }
    if (event.button === 1) {
      m_midMouseBtnDown = false;
    }
    if (event.button === 2) {
      m_rightMouseBtnDown = false;
    }
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse wheel event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleMouseWheel = function (event) {
    var ren = m_that.viewer().renderWindow().activeRenderer(),
        cam = ren.camera();

    // TODO Compute zoom factor intelligently
    if (event.originalEvent.wheelDelta < 0) {
      cam.zoom(0.9);
    } else {
      cam.zoom(1.1);
    }
    ren.resetCameraClippingRange();
    m_that.viewer().render();
    return true;
  };

  return this;
};
inherit(vgl.trackballInteractorStyle, vgl.interactorStyle);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, vec4, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of pvwInteractorStyle (for ParaViewWeb)
 *
 * @class vgl.pvwInteractorStyle
 * @returns {vgl.pvwInteractorStyle}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.pvwInteractorStyle = function () {
  'use strict';

  if (!(this instanceof vgl.pvwInteractorStyle)) {
    return new vgl.pvwInteractorStyle();
  }
  vgl.trackballInteractorStyle.call(this);
  var m_that = this,
      m_leftMouseButtonDown = false,
      m_rightMouseButtonDown = false,
      m_middleMouseButtonDown = false,
      m_width,
      m_height,
      m_renderer,
      m_camera,
      m_outsideCanvas,
      m_coords,
      m_currentMousePos,
      m_focalPoint,
      m_focusWorldPt,
      m_focusDisplayPt,
      m_displayPt1,
      m_displayPt2,
      m_worldPt1,
      m_worldPt2,
      m_dx,
      m_dy,
      m_dz,
      m_zTrans,
      m_mouseLastPos = {
        x: 0,
        y: 0
      };

  function render() {
    m_renderer.resetCameraClippingRange();
    m_that.viewer().render();
  }

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse move event
   *
   * @param event
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.handleMouseMove = function (event) {
    var rens = [], i = null, secCameras = [], deltaxy = null;
    m_width = m_that.viewer().renderWindow().windowSize()[0];
    m_height = m_that.viewer().renderWindow().windowSize()[1];
    m_renderer = m_that.viewer().renderWindow().activeRenderer();
    m_camera = m_renderer.camera();
    m_outsideCanvas = false;
    m_coords = m_that.viewer().relMouseCoords(event);
    m_currentMousePos = {
      x: 0,
      y: 0
    };

    // Get secondary cameras
    rens = m_that.viewer().renderWindow().renderers();
    for (i = 0; i < rens.length; i += 1) {
      if (m_renderer !== rens[i]) {
        secCameras.push(rens[i].camera());
      }
    }

    if ((m_coords.x < 0) || (m_coords.x > m_width)) {
      m_currentMousePos.x = 0;
      m_outsideCanvas = true;
    } else {
      m_currentMousePos.x = m_coords.x;
    }
    if ((m_coords.y < 0) || (m_coords.y > m_height)) {
      m_currentMousePos.y = 0;
      m_outsideCanvas = true;
    } else {
      m_currentMousePos.y = m_coords.y;
    }
    if (m_outsideCanvas === true) {
      return;
    }
    m_focalPoint = m_camera.focalPoint();
    m_focusWorldPt = vec4.fromValues(m_focalPoint[0], m_focalPoint[1],
                                     m_focalPoint[2], 1);
    m_focusDisplayPt = m_renderer.worldToDisplay(m_focusWorldPt,
        m_camera.viewMatrix(), m_camera.projectionMatrix(), m_width, m_height);
    m_displayPt1 = vec4.fromValues(
      m_currentMousePos.x, m_currentMousePos.y, m_focusDisplayPt[2], 1.0);
    m_displayPt2 = vec4.fromValues(
      m_mouseLastPos.x, m_mouseLastPos.y, m_focusDisplayPt[2], 1.0);
    m_worldPt1 = m_renderer.displayToWorld(
      m_displayPt1, m_camera.viewMatrix(), m_camera.projectionMatrix(),
      m_width, m_height);
    m_worldPt2 = m_renderer.displayToWorld(
      m_displayPt2, m_camera.viewMatrix(), m_camera.projectionMatrix(),
      m_width, m_height);

    m_dx = m_worldPt1[0] - m_worldPt2[0];
    m_dy = m_worldPt1[1] - m_worldPt2[1];
    m_dz = m_worldPt1[2] - m_worldPt2[2];

    if (m_middleMouseButtonDown) {
      m_camera.pan(-m_dx, -m_dy, -m_dz);
      render();
    }
    if (m_leftMouseButtonDown) {
      deltaxy = [(m_mouseLastPos.x - m_currentMousePos.x),
      (m_mouseLastPos.y - m_currentMousePos.y)];
      m_camera.rotate(deltaxy[0], deltaxy[1]);

      // Apply rotation to all other cameras
      for (i = 0; i < secCameras.length; i += 1) {
        secCameras[i].rotate(deltaxy[0], deltaxy[1]);
      }

      // Apply rotation to all other cameras
      for (i = 0; i < rens.length; i += 1) {
        rens[i].resetCameraClippingRange();
      }
      render();
    }
    if (m_rightMouseButtonDown) {
      /// 2.0 is the speed up factor.
      m_zTrans = 2.0 * (m_currentMousePos.y - m_mouseLastPos.y) / m_height;

      // Calculate zoom scale here
      if (m_zTrans > 0) {
        m_camera.zoom(1 - Math.abs(m_zTrans));
      } else {
        m_camera.zoom(1 + Math.abs(m_zTrans));
      }
      render();
    }
    m_mouseLastPos.x = m_currentMousePos.x;
    m_mouseLastPos.y = m_currentMousePos.y;
    return false;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse down event
   *
   * @param event
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.handleMouseDown = function (event) {
    if (event.button === 0) {
      m_leftMouseButtonDown = true;
    }
    if (event.button === 1) {
      m_middleMouseButtonDown = true;
    }
    if (event.button === 2) {
      m_rightMouseButtonDown = true;
    }
    m_coords = m_that.viewer().relMouseCoords(event);
    if (m_coords.x < 0) {
      m_mouseLastPos.x = 0;
    } else {
      m_mouseLastPos.x = m_coords.x;
    }
    if (m_coords.y < 0) {
      m_mouseLastPos.y = 0;
    } else {
      m_mouseLastPos.y = m_coords.y;
    }
    return false;
  };

  // @note We never get mouse up from scroll bar: See the bug report here
  // http://bugs.jquery.com/ticket/8184
  /////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse up event
   *
   * @param event
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.handleMouseUp = function (event) {
    if (event.button === 0) {
      m_leftMouseButtonDown = false;
    }
    if (event.button === 1) {
      m_middleMouseButtonDown = false;
    }
    if (event.button === 2) {
      m_rightMouseButtonDown = false;
    }
    return false;
  };

  return this;
};
inherit(vgl.pvwInteractorStyle, vgl.trackballInteractorStyle);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global window, vgl, inherit, $*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class viewer
 *
 * @param canvas
 * @returns {vgl.viewer}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.viewer = function (canvas, options) {
  'use strict';

  if (!(this instanceof vgl.viewer)) {
    return new vgl.viewer(canvas, options);
  }

  vgl.object.call(this);

  var m_that = this,
      m_canvas = canvas,
      m_ready = true,
      m_interactorStyle = null,
      m_renderer = vgl.renderer(options),
      m_renderWindow = vgl.renderWindow(m_canvas);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get canvas of the viewer
   *
   * @returns {*}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.canvas = function () {
    return m_canvas;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return render window of the viewer
   *
   * @returns {vgl.renderWindow}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.renderWindow = function () {
    return m_renderWindow;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize the viewer
   *
   * This is a must call or otherwise render context may not initialized
   * properly.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.init = function () {
    if (m_renderWindow !== null) {
      m_renderWindow._setup();
    } else {
      console.log('[ERROR] No render window attached');
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   *  Remove the viewer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.exit = function (renderState) {
    if (m_renderWindow !== null) {
      m_renderWindow._cleanup(renderState);
    } else {
      console.log('[ERROR] No render window attached');
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get interactor style of the viewer
   *
   * @returns {vgl.interactorStyle}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.interactorStyle = function () {
    return m_interactorStyle;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set interactor style to be used by the viewer
   *
   * @param {vgl.interactorStyle} style
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setInteractorStyle = function (style) {
    if (style !== m_interactorStyle) {
      m_interactorStyle = style;
      m_interactorStyle.setViewer(this);
      this.modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse down event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleMouseDown = function (event) {
    if (m_ready === true) {
      var fixedEvent = $.event.fix(event || window.event);
      // Only prevent default action for right mouse button
      if (event.button === 2) {
        fixedEvent.preventDefault();
      }
      fixedEvent.state = 'down';
      fixedEvent.type = vgl.event.mousePress;
      $(m_that).trigger(fixedEvent);
    }

    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse up event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleMouseUp = function (event) {
    if (m_ready === true) {
      var fixedEvent = $.event.fix(event || window.event);
      fixedEvent.preventDefault();
      fixedEvent.state = 'up';
      fixedEvent.type = vgl.event.mouseRelease;
      $(m_that).trigger(fixedEvent);
    }

    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse move event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleMouseMove = function (event) {
    if (m_ready === true) {
      var fixedEvent = $.event.fix(event || window.event);
      fixedEvent.preventDefault();
      fixedEvent.type = vgl.event.mouseMove;
      $(m_that).trigger(fixedEvent);
    }

    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse wheel scroll
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleMouseWheel = function (event) {
    if (m_ready === true) {
      var fixedEvent = $.event.fix(event || window.event);
      fixedEvent.preventDefault();
      fixedEvent.type = vgl.event.mouseWheel;
      $(m_that).trigger(fixedEvent);
    }

    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse move event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleMouseOut = function (event) {
    if (m_ready === true) {
      var fixedEvent = $.event.fix(event || window.event);
      fixedEvent.preventDefault();
      fixedEvent.type = vgl.event.mouseOut;
      $(m_that).trigger(fixedEvent);
    }

    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle key press event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleKeyPress = function (event) {
    if (m_ready === true) {
      var fixedEvent = $.event.fix(event || window.event);
      fixedEvent.preventDefault();
      fixedEvent.type = vgl.event.keyPress;
      $(m_that).trigger(fixedEvent);
    }

    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle context menu event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleContextMenu = function (event) {
    if (m_ready === true) {
      var fixedEvent = $.event.fix(event || window.event);
      fixedEvent.preventDefault();
      fixedEvent.type = vgl.event.contextMenu;
      $(m_that).trigger(fixedEvent);
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle click event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleClick = function (event) {
    if (m_ready === true) {
      var fixedEvent = $.event.fix(event || window.event);
      fixedEvent.preventDefault();
      fixedEvent.type = vgl.event.click;
      $(m_that).trigger(fixedEvent);
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle double click event
   *
   * @param event
   * @returns {boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.handleDoubleClick = function (event) {
    if (m_ready === true) {
      var fixedEvent = $.event.fix(event || window.event);
      fixedEvent.preventDefault();
      fixedEvent.type = vgl.event.dblClick;
      $(m_that).trigger(fixedEvent);
    }

    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get mouse coodinates related to canvas
   *
   * @param event
   * @returns {{x: number, y: number}}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.relMouseCoords = function (event) {
    if (event.pageX === undefined || event.pageY === undefined) {
      throw 'Missing attributes pageX and pageY on the event';
    }

    var totalOffsetX = 0,
        totalOffsetY = 0,
        canvasX = 0,
        canvasY = 0,
        currentElement = m_canvas;

    do {
      totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
      totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
      currentElement = currentElement.offsetParent;
    } while (currentElement);

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {
      x: canvasX,
      y: canvasY
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Render
   */
  ////////////////////////////////////////////////////////////////////////////
  this.render = function () {
    m_renderWindow.render();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Bind canvas mouse events to their default handlers
   */
  ////////////////////////////////////////////////////////////////////////////
  this.bindEventHandlers = function () {
    $(m_canvas).on('mousedown', this.handleMouseDown);
    $(m_canvas).on('mouseup', this.handleMouseUp);
    $(m_canvas).on('mousemove', this.handleMouseMove);
    $(m_canvas).on('mousewheel', this.handleMouseWheel);
    $(m_canvas).on('contextmenu', this.handleContextMenu);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Undo earlier binded  handlers for canvas mouse events
   */
  ////////////////////////////////////////////////////////////////////////////
  this.unbindEventHandlers = function () {
    $(m_canvas).off('mousedown', this.handleMouseDown);
    $(m_canvas).off('mouseup', this.handleMouseUp);
    $(m_canvas).off('mousemove', this.handleMouseMove);
    $(m_canvas).off('mousewheel', this.handleMouseWheel);
    $(m_canvas).off('contextmenu', this.handleContextMenu);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function () {
    this.bindEventHandlers();
    m_renderWindow.addRenderer(m_renderer);
  };

  this._init();
  return this;
};

inherit(vgl.viewer, vgl.object);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class shader
 *
 * @param type
 * @returns {vgl.shader}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.shader = function (type) {
  'use strict';

  if (!(this instanceof vgl.shader)) {
    return new vgl.shader(type);
  }
  vgl.object.call(this);

  var m_shaderContexts = [],
      m_shaderType = type,
      m_shaderSource = '';

  /**
   * A shader can be associated with multiple contexts.  Each context needs to
   * be compiled and attached separately.  These are tracked in the
   * m_shaderContexts array.
   *
   * @param renderState a renderState that includes a m_context value.
   * @return an object with context, compileTimestamp, and, if compiled, a
   *    shaderHandle entry.
   */
  this._getContextEntry = function (renderState) {
    var context = renderState.m_context, i, entry;
    for (i = 0; i < m_shaderContexts.length; i += 1) {
      if (m_shaderContexts[i].context === context) {
        return m_shaderContexts[i];
      }
    }
    entry = {
      context: context,
      compileTimestamp: vgl.timestamp()
    };
    m_shaderContexts.push(entry);
    return entry;
  };

  /**
   * Remove the context from the list of tracked contexts.  This allows the
   * associated shader handle to be GCed.  Does nothing if the context is not
   * in the list of tracked contexts.
   *
   * @param renderState a renderState that includes a m_context value.
   */
  this.removeContext = function (renderState) {
    var context = renderState.m_context, i;
    for (i = 0; i < m_shaderContexts.length; i += 1) {
      if (m_shaderContexts[i].context === context) {
        m_shaderContexts.splice(i, 1);
        return;
      }
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get shader handle
   */
  /////////////////////////////////////////////////////////////////////////////
  this.shaderHandle = function (renderState) {
    var entry = this._getContextEntry(renderState);
    return entry.shaderHandle;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get type of the shader
   *
   * @returns {*}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.shaderType = function () {
    return m_shaderType;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get shader source
   *
   * @returns {string}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.shaderSource = function () {
    return m_shaderSource;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Set shader source
   *
   * @param {string} source
   */
  /////////////////////////////////////////////////////////////////////////////
  this.setShaderSource = function (source) {
    m_shaderSource = source;
    this.modified();
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Compile the shader
   *
   * @returns {null}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.compile = function (renderState) {
    var entry = this._getContextEntry(renderState);
    if (this.getMTime() < entry.compileTimestamp.getMTime()) {
      return entry.shaderHandle;
    }

    renderState.m_context.deleteShader(entry.shaderHandle);
    entry.shaderHandle = renderState.m_context.createShader(m_shaderType);
    renderState.m_context.shaderSource(entry.shaderHandle, m_shaderSource);
    renderState.m_context.compileShader(entry.shaderHandle);

    // See if it compiled successfully
    if (!renderState.m_context.getShaderParameter(entry.shaderHandle,
        vgl.GL.COMPILE_STATUS)) {
      console.log('[ERROR] An error occurred compiling the shaders: ' +
                  renderState.m_context.getShaderInfoLog(entry.shaderHandle));
      console.log(m_shaderSource);
      renderState.m_context.deleteShader(entry.shaderHandle);
      return null;
    }

    entry.compileTimestamp.modified();

    return entry.shaderHandle;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Attach shader to the program
   *
   * @param programHandle
   */
  /////////////////////////////////////////////////////////////////////////////
  this.attachShader = function (renderState, programHandle) {
    renderState.m_context.attachShader(
        programHandle, this.shaderHandle(renderState));
  };
};

inherit(vgl.shader, vgl.object);


/* We can use the same shader multiple times if it is identical.  This caches
 * the last N shaders and will reuse them when possible.  The cache keeps the
 * most recently requested shader at the front.  If you are doing anything more
 * to a shader then creating it and setting its source once, do not use this
 * cache.
 */
(function () {
  'use strict';
  var m_shaderCache = [],
      m_shaderCacheMaxSize = 10;

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get a shader from the cache.  Create a new shader if necessary using a
   * specific source.
   *
   * @param type One of vgl.GL.*_SHADER
   * @param context the GL context for the shader.
   * @param {string} source the source code of the shader.
   */
  /////////////////////////////////////////////////////////////////////////////
  vgl.getCachedShader = function (type, context, source) {
    for (var i = 0; i < m_shaderCache.length; i += 1) {
      if (m_shaderCache[i].type === type &&
          m_shaderCache[i].context === context &&
          m_shaderCache[i].source === source) {
        if (i) {
          m_shaderCache.splice(0, 0, m_shaderCache.splice(i, 1)[0]);
        }
        return m_shaderCache[0].shader;
      }
    }
    var shader = new vgl.shader(type);
    shader.setShaderSource(source);
    m_shaderCache.unshift({
      type: type,
      context: context,
      source: source,
      shader: shader
    });
    if (m_shaderCache.length >= m_shaderCacheMaxSize) {
      m_shaderCache.splice(m_shaderCacheMaxSize,
                           m_shaderCache.length - m_shaderCacheMaxSize);
    }
    return shader;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Clear the shader cache.
   *
   * @param context the GL context to clear, or null for clear all.
   */
  /////////////////////////////////////////////////////////////////////////////
  vgl.clearCachedShaders = function (context) {
    for (var i = m_shaderCache.length - 1; i >= 0; i -= 1) {
      if (context === null || context === undefined ||
          m_shaderCache[i].context === context) {
        m_shaderCache.splice(i, 1);
      }
    }
  };
})();

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, inherit, $*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instace of class shaderProgram
 *
 * @class
 * @returns {vgl.shaderProgram}
 */
//////////////////////////////////////////////////////////////////////////////

var getBaseUrl = (function () {
  'use strict';
  var baseUrl = '.';
  var scripts = document.getElementsByTagName('script');
  /* When run in certain environments, there may be no scripts loaded.  For
   * instance, jQuery's $.getScript won't add it to a script tag. */
  if (scripts.length > 0) {
    var index = scripts.length - 1;
    var vglScript = scripts[index];
    index = vglScript.src.lastIndexOf('/');
    baseUrl = vglScript.src.substring(0, index);
  }
  return function () { return baseUrl; };
})();


vgl.shaderProgram = function () {
  'use strict';

  if (!(this instanceof vgl.shaderProgram)) {
    return new vgl.shaderProgram();
  }
  vgl.materialAttribute.call(
    this, vgl.materialAttributeType.ShaderProgram);

  /** @private */
  var m_this = this,
      m_programHandle = 0,
      m_compileTimestamp = vgl.timestamp(),
      m_bindTimestamp = vgl.timestamp(),
      m_shaders = [],
      m_uniforms = [],
      m_vertexAttributes = {},
      m_uniformNameToLocation = {},
      m_vertexAttributeNameToLocation = {};

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Create a particular shader type using GLSL shader strings from a file
   */
  /////////////////////////////////////////////////////////////////////////////
  this.loadFromFile = function (type, sourceUrl) {
    var shader;
    $.ajax({
      url: sourceUrl,
      type: 'GET',
      async: false,
      success: function (result) {
        //console.log(result);
        shader = vgl.shader(type);
        shader.setShaderSource(result);
        m_this.addShader(shader);
      }
    });
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Create a particular shader type using GLSL shader strings from a file
   * relative to VGL load URL.
   */
  /////////////////////////////////////////////////////////////////////////////
  this.loadShader = function (type, file) {
    this.loadFromFile(type, getBaseUrl() + '/shaders/' + file);
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Query uniform location in the program
   *
   * @param name
   * @returns {*}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.queryUniformLocation = function (renderState, name) {
    return renderState.m_context.getUniformLocation(m_programHandle, name);
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Query attribute location in the program
   *
   * @param name
   * @returns {*}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.queryAttributeLocation = function (renderState, name) {
    return renderState.m_context.getAttribLocation(m_programHandle, name);
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Add a new shader to the program
   *
   * @param shader
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.addShader = function (shader) {
    if (m_shaders.indexOf(shader) > -1) {
      return false;
    }

    var i;
    for (i = 0; i < m_shaders.length; i += 1) {
      if (m_shaders[i].shaderType() === shader.shaderType()) {
        m_shaders.splice(m_shaders.indexOf(shader), 1);
      }
    }

    m_shaders.push(shader);
    m_this.modified();
    return true;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Add a new uniform to the program
   *
   * @param uniform
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.addUniform = function (uniform) {
    if (m_uniforms.indexOf(uniform) > -1) {
      return false;
    }

    m_uniforms.push(uniform);
    m_this.modified();
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Add a new vertex attribute to the program
   *
   * @param attr
   * @param key
   */
  /////////////////////////////////////////////////////////////////////////////
  this.addVertexAttribute = function (attr, key) {
    m_vertexAttributes[key] = attr;
    m_this.modified();
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get uniform location
   *
   * This method does not perform any query into the program but relies on
   * the fact that it depends on a call to queryUniformLocation earlier.
   *
   * @param name
   * @returns {number}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.uniformLocation = function (name) {
    return m_uniformNameToLocation[name];
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get attribute location
   *
   * This method does not perform any query into the program but relies on the
   * fact that it depends on a call to queryUniformLocation earlier.
   *
   * @param name
   * @returns {number}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.attributeLocation = function (name) {
    return m_vertexAttributeNameToLocation[name];
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get uniform object using name as the key
   *
   * @param name
   * @returns {*}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.uniform = function (name) {
    var i;
    for (i = 0; i < m_uniforms.length; i += 1) {
      if (m_uniforms[i].name() === name) {
        return m_uniforms[i];
      }
    }

    return null;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Update all uniforms
   *
   * This method should be used directly unless required
   */
  /////////////////////////////////////////////////////////////////////////////
  this.updateUniforms = function (renderState) {
    var i;

    for (i = 0; i < m_uniforms.length; i += 1) {
      m_uniforms[i].callGL(renderState,
        m_uniformNameToLocation[m_uniforms[i].name()]);
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Link shader program
   *
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.link = function (renderState) {
    renderState.m_context.linkProgram(m_programHandle);

    // If creating the shader program failed, alert
    if (!renderState.m_context.getProgramParameter(m_programHandle,
        vgl.GL.LINK_STATUS)) {
      console.log('[ERROR] Unable to initialize the shader program.');
      return false;
    }

    return true;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Use the shader program
   */
  /////////////////////////////////////////////////////////////////////////////
  this.use = function (renderState) {
    renderState.m_context.useProgram(m_programHandle);
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Peform any initialization required
   */
  /////////////////////////////////////////////////////////////////////////////
  this._setup = function (renderState) {
    if (m_programHandle === 0) {
      m_programHandle = renderState.m_context.createProgram();
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Peform any clean up required when the program gets deleted
   */
  /////////////////////////////////////////////////////////////////////////////
  this._cleanup = function (renderState) {
    m_this.deleteVertexAndFragment(renderState);
    m_this.deleteProgram(renderState);
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Delete the shader program
   */
  /////////////////////////////////////////////////////////////////////////////
  this.deleteProgram = function (renderState) {
    renderState.m_context.deleteProgram(m_programHandle);
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Delete vertex and fragment shaders
   */
  /////////////////////////////////////////////////////////////////////////////
  this.deleteVertexAndFragment = function (renderState) {
    var i;
    for (i = 0; i < m_shaders.length; i += 1) {
      renderState.m_context.detachShader(m_shaders[i].shaderHandle(renderState));
      renderState.m_context.deleteShader(m_shaders[i].shaderHandle(renderState));
      m_shaders[i].removeContext(renderState);
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Compile and link a shader
   */
  /////////////////////////////////////////////////////////////////////////////
  this.compileAndLink = function (renderState) {
    var i;

    if (m_compileTimestamp.getMTime() >= this.getMTime()) {
      return;
    }

    m_this._setup(renderState);

    // Compile shaders
    for (i = 0; i < m_shaders.length; i += 1) {
      m_shaders[i].compile(renderState);
      m_shaders[i].attachShader(renderState, m_programHandle);
    }

    m_this.bindAttributes(renderState);

    // link program
    if (!m_this.link(renderState)) {
      console.log('[ERROR] Failed to link Program');
      m_this._cleanup(renderState);
    }

    m_compileTimestamp.modified();
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Bind the program with its shaders
   *
   * @param renderState
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.bind = function (renderState) {
    var i = 0;

    if (m_bindTimestamp.getMTime() < m_this.getMTime()) {

      // Compile shaders
      m_this.compileAndLink(renderState);

      m_this.use(renderState);
      m_this.bindUniforms(renderState);
      m_bindTimestamp.modified();
    } else {
      m_this.use(renderState);
    }

    // Call update callback.
    for (i = 0; i < m_uniforms.length; i += 1) {
      m_uniforms[i].update(renderState, m_this);
    }

    // Now update values to GL.
    m_this.updateUniforms(renderState);
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Undo binding of the shader program
   *
   * @param renderState
   */
  /////////////////////////////////////////////////////////////////////////////
  this.undoBind = function (renderState) {
    // REF https://www.khronos.org/opengles/sdk/docs/man/xhtml/glUseProgram.xml
    // If program is 0, then the current rendering state refers to an invalid
    // program object, and the results of vertex and fragment shader execution
    // due to any glDrawArrays or glDrawElements commands are undefined
    renderState.m_context.useProgram(null);
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Bind vertex data
   *
   * @param renderState
   * @param key
   */
  /////////////////////////////////////////////////////////////////////////////
  this.bindVertexData = function (renderState, key) {
    if (m_vertexAttributes.hasOwnProperty(key)) {
      m_vertexAttributes[key].bindVertexData(renderState, key);
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Undo bind vetex data
   *
   * @param renderState
   * @param key
   */
  /////////////////////////////////////////////////////////////////////////////
  this.undoBindVertexData = function (renderState, key) {
    if (m_vertexAttributes.hasOwnProperty(key)) {
      m_vertexAttributes[key].undoBindVertexData(renderState, key);
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Bind uniforms
   */
  /////////////////////////////////////////////////////////////////////////////
  this.bindUniforms = function (renderState) {
    var i;
    for (i = 0; i < m_uniforms.length; i += 1) {
      m_uniformNameToLocation[m_uniforms[i].name()] = this
          .queryUniformLocation(renderState, m_uniforms[i].name());
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Bind vertex attributes
   */
  /////////////////////////////////////////////////////////////////////////////
  this.bindAttributes = function (renderState) {
    var key, name;
    for (key in m_vertexAttributes) {
      if (m_vertexAttributes.hasOwnProperty(key)) {
        name = m_vertexAttributes[key].name();
        renderState.m_context.bindAttribLocation(m_programHandle, key, name);
        m_vertexAttributeNameToLocation[name] = key;
      }
    }
  };

  return m_this;
};

inherit(vgl.shaderProgram, vgl.materialAttribute);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global Uint8Array, vgl, inherit*/
//////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class texture
 *
 * @class
 * @returns {vgl.texture}
 */
///////////////////////////////////////////////////////////////////////////////
vgl.texture = function () {
  'use strict';

  if (!(this instanceof vgl.texture)) {
    return new vgl.texture();
  }
  vgl.materialAttribute.call(
    this, vgl.materialAttributeType.Texture);

  this.m_width = 0;
  this.m_height = 0;
  this.m_depth = 0;

  this.m_textureHandle = null;
  this.m_textureUnit = 0;

  this.m_pixelFormat = vgl.GL.RGBA;
  this.m_pixelDataType = vgl.GL.UNSIGNED_BYTE;
  this.m_internalFormat = vgl.GL.RGBA;
  this.m_nearestPixel = false;

  this.m_image = null;

  var m_setupTimestamp = vgl.timestamp(),
      m_that = this;

  function activateTextureUnit(renderState) {
    switch (m_that.m_textureUnit) {
      case 0:
        renderState.m_context.activeTexture(vgl.GL.TEXTURE0);
        break;
      case 1:
        renderState.m_context.activeTexture(vgl.GL.TEXTURE1);
        break;
      case 2:
        renderState.m_context.activeTexture(vgl.GL.TEXTURE2);
        break;
      case 3:
        renderState.m_context.activeTexture(vgl.GL.TEXTURE3);
        break;
      case 4:
        renderState.m_context.activeTexture(vgl.GL.TEXTURE4);
        break;
      case 5:
        renderState.m_context.activeTexture(vgl.GL.TEXTURE5);
        break;
      case 6:
        renderState.m_context.activeTexture(vgl.GL.TEXTURE6);
        break;
      case 7:
        renderState.m_context.activeTexture(vgl.GL.TEXTURE7);
        break;
      case 8:
        renderState.m_context.activeTexture(vgl.GL.TEXTURE8);
        break;
      case 9:
        renderState.m_context.activeTexture(vgl.GL.TEXTURE9);
        break;
      case 10:
        renderState.m_context.activeTexture(vgl.GL.TEXTURE10);
        break;
      case 11:
        renderState.m_context.activeTexture(vgl.GL.TEXTURE11);
        break;
      case 12:
        renderState.m_context.activeTexture(vgl.GL.TEXTURE12);
        break;
      case 13:
        renderState.m_context.activeTexture(vgl.GL.TEXTURE13);
        break;
      case 14:
        renderState.m_context.activeTexture(vgl.GL.TEXTURE14);
        break;
      case 15:
        renderState.m_context.activeTexture(vgl.GL.TEXTURE15);
        break;
      default:
        throw '[error] Texture unit '  + m_that.m_textureUnit +
              ' is not supported';
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Create texture, update parameters, and bind data
   *
   * @param renderState
   */
  /////////////////////////////////////////////////////////////////////////////
  this.setup = function (renderState) {
    // Activate the texture unit first
    activateTextureUnit(renderState);

    renderState.m_context.deleteTexture(this.m_textureHandle);
    this.m_textureHandle = renderState.m_context.createTexture();
    renderState.m_context.bindTexture(vgl.GL.TEXTURE_2D, this.m_textureHandle);
    renderState.m_context.texParameteri(vgl.GL.TEXTURE_2D,
        vgl.GL.TEXTURE_MIN_FILTER,
        this.m_nearestPixel ? vgl.GL.NEAREST : vgl.GL.LINEAR);
    renderState.m_context.texParameteri(vgl.GL.TEXTURE_2D,
        vgl.GL.TEXTURE_MAG_FILTER,
        this.m_nearestPixel ? vgl.GL.NEAREST : vgl.GL.LINEAR);
    renderState.m_context.texParameteri(vgl.GL.TEXTURE_2D,
        vgl.GL.TEXTURE_WRAP_S, vgl.GL.CLAMP_TO_EDGE);
    renderState.m_context.texParameteri(vgl.GL.TEXTURE_2D,
        vgl.GL.TEXTURE_WRAP_T, vgl.GL.CLAMP_TO_EDGE);

    if (this.m_image !== null) {
      renderState.m_context.pixelStorei(vgl.GL.UNPACK_ALIGNMENT, 1);
      renderState.m_context.pixelStorei(vgl.GL.UNPACK_FLIP_Y_WEBGL, true);

      this.updateDimensions();
      this.computeInternalFormatUsingImage();

      // console.log('m_internalFormat ' + this.m_internalFormat);
      // console.log('m_pixelFormat ' + this.m_pixelFormat);
      // console.log('m_pixelDataType ' + this.m_pixelDataType);

      // FOR now support only 2D textures
      renderState.m_context.texImage2D(vgl.GL.TEXTURE_2D, 0, this.m_internalFormat,
        this.m_pixelFormat, this.m_pixelDataType, this.m_image);
    } else {
      renderState.m_context.texImage2D(vgl.GL.TEXTURE_2D, 0, this.m_internalFormat,
        this.m_width, this.m_height, 0, this.m_pixelFormat, this.m_pixelDataType, null);
    }

    renderState.m_context.bindTexture(vgl.GL.TEXTURE_2D, null);
    m_setupTimestamp.modified();
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Create texture and if already created use it
   *
   * @param renderState
   */
  /////////////////////////////////////////////////////////////////////////////
  this.bind = function (renderState) {
    // TODO Call setup via material setup
    if (this.getMTime() > m_setupTimestamp.getMTime()) {
      this.setup(renderState);
    }

    activateTextureUnit(renderState);
    renderState.m_context.bindTexture(vgl.GL.TEXTURE_2D, this.m_textureHandle);
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Turn off the use of this texture
   *
   * @param renderState
   */
  /////////////////////////////////////////////////////////////////////////////
  this.undoBind = function (renderState) {
    renderState.m_context.bindTexture(vgl.GL.TEXTURE_2D, null);
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get image used by the texture
   *
   * @returns {vgl.image}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.image = function () {
    return this.m_image;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Set image for the texture
   *
   * @param {vgl.image} image
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.setImage = function (image) {
    if (image !== null) {
      this.m_image = image;
      this.updateDimensions();
      this.modified();
      return true;
    }

    return false;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get nearest pixel flag for the texture
   *
   * @returns boolean
   */
  /////////////////////////////////////////////////////////////////////////////
  this.nearestPixel = function () {
    return this.m_nearestPixel;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Set nearest pixel flag for the texture
   *
   * @param {boolean} nearest pixel flag
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.setNearestPixel = function (nearest) {
    nearest = nearest ? true : false;
    if (nearest !== this.m_nearestPixel) {
      this.m_nearestPixel = nearest;
      this.modified();
      return true;
    }
    return false;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get texture unit of the texture
   *
   * @returns {number}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.textureUnit = function () {
    return this.m_textureUnit;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Set texture unit of the texture. Default is 0.
   *
   * @param {number} unit
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.setTextureUnit = function (unit) {
    if (this.m_textureUnit === unit) {
      return false;
    }

    this.m_textureUnit = unit;
    this.modified();
    return true;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get width of the texture
   *
   * @returns {*}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.width = function () {
    return this.m_width;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Set width of the texture
   *
   * @param {number} width
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.setWidth = function (width) {
    if (m_that.m_width !== width) {
      m_that.m_width = width;
      m_that.modified();
      return true;
    }

    return false;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get width of the texture
   *
   * @returns {*}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.height = function () {
    return m_that.m_height;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Set height of the texture
   *
   * @param {number} height
   * @returns {vgl.texture}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.setHeight = function (height) {
    if (m_that.m_height !== height) {
      m_that.m_height = height;
      m_that.modified();
      return true;
    }

    return false;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get depth of the texture
   *
   * @returns {number}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.depth = function () {
    return this.m_depth;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Set depth of the texture
   *
   * @param {number} depth
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.setDepth = function (depth) {
    if (this.m_image === null) {
      return false;
    }

    this.m_depth = depth;
    this.modified();
    return true;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get the texture handle (id) of the texture
   *
   * @returns {*}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.textureHandle = function () {
    return this.m_textureHandle;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get internal format of the texture
   *
   * @returns {*}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.internalFormat = function () {
    return this.m_internalFormat;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Set internal format of the texture
   *
   * @param internalFormat
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.setInternalFormat = function (internalFormat) {
    if (this.m_internalFormat !== internalFormat) {
      this.m_internalFormat = internalFormat;
      this.modified();
      return true;
    }

    return false;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get pixel format of the texture
   *
   * @returns {*}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.pixelFormat = function () {
    return this.m_pixelFormat;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Set pixel format of the texture
   *
   * @param pixelFormat
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.setPixelFormat = function (pixelFormat) {
    if (this.m_image === null) {
      return false;
    }

    this.m_pixelFormat = pixelFormat;
    this.modified();
    return true;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get pixel data type
   *
   * @returns {*}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.pixelDataType = function () {
    return this.m_pixelDataType;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Set pixel data type
   *
   * @param pixelDataType
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.setPixelDataType = function (pixelDataType) {
    if (this.m_image === null) {
      return false;
    }

    this.m_pixelDataType = pixelDataType;

    this.modified();

    return true;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Compute internal format of the texture
   */
  /////////////////////////////////////////////////////////////////////////////
  this.computeInternalFormatUsingImage = function () {
    // Currently image does not define internal format
    // and hence it's pixel format is the only way to query
    // information on how color has been stored.
    // switch (this.m_image.pixelFormat()) {
    // case vgl.GL.RGB:
    // this.m_internalFormat = vgl.GL.RGB;
    // break;
    // case vgl.GL.RGBA:
    // this.m_internalFormat = vgl.GL.RGBA;
    // break;
    // case vgl.GL.Luminance:
    // this.m_internalFormat = vgl.GL.Luminance;
    // break;
    // case vgl.GL.LuminanceAlpha:
    // this.m_internalFormat = vgl.GL.LuminanceAlpha;
    // break;
    // // Do nothing when image pixel format is none or undefined.
    // default:
    // break;
    // };

    // TODO Fix this
    this.m_internalFormat = vgl.GL.RGBA;
    this.m_pixelFormat = vgl.GL.RGBA;
    this.m_pixelDataType = vgl.GL.UNSIGNED_BYTE;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Update texture dimensions
   */
  /////////////////////////////////////////////////////////////////////////////
  this.updateDimensions = function () {
    if (this.m_image !== null) {
      this.m_width = this.m_image.width;
      this.m_height = this.m_image.height;
      this.m_depth = 0; // Only 2D images are supported now
    }
  };

  return this;
};

inherit(vgl.texture, vgl.materialAttribute);

///////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class lookupTable
 *
 * @class
 * @returns {vgl.lookupTable}
 */
///////////////////////////////////////////////////////////////////////////////
vgl.lookupTable = function () {
  'use strict';

  if (!(this instanceof vgl.lookupTable)) {
    return new vgl.lookupTable();
  }
  vgl.texture.call(this);

  var m_setupTimestamp = vgl.timestamp(),
      m_range = [0, 0];

  this.m_colorTable = //paraview bwr colortable
    [0.07514311, 0.468049805, 1, 1,
     0.247872569, 0.498782363, 1, 1,
     0.339526309, 0.528909511, 1, 1,
     0.409505078, 0.558608486, 1, 1,
     0.468487184, 0.588057293, 1, 1,
     0.520796675, 0.617435078, 1, 1,
     0.568724526, 0.646924167, 1, 1,
     0.613686735, 0.676713218, 1, 1,
     0.656658579, 0.707001303, 1, 1,
     0.698372844, 0.738002964, 1, 1,
     0.739424025, 0.769954435, 1, 1,
     0.780330104, 0.803121429, 1, 1,
     0.821573924, 0.837809045, 1, 1,
     0.863634967, 0.874374691, 1, 1,
     0.907017747, 0.913245283, 1, 1,
     0.936129275, 0.938743558, 0.983038586, 1,
     0.943467973, 0.943498599, 0.943398095, 1,
     0.990146732, 0.928791426, 0.917447482, 1,
     1, 0.88332677, 0.861943246, 1,
     1, 0.833985467, 0.803839606, 1,
     1, 0.788626485, 0.750707739, 1,
     1, 0.746206642, 0.701389973, 1,
     1, 0.70590052, 0.654994046, 1,
     1, 0.667019783, 0.610806959, 1,
     1, 0.6289553, 0.568237474, 1,
     1, 0.591130233, 0.526775617, 1,
     1, 0.552955184, 0.485962266, 1,
     1, 0.513776083, 0.445364274, 1,
     1, 0.472800903, 0.404551679, 1,
     1, 0.428977855, 0.363073592, 1,
     1, 0.380759558, 0.320428137, 1,
     0.961891484, 0.313155629, 0.265499262, 1,
     0.916482116, 0.236630659, 0.209939162, 1].map(
             function (x) {return x * 255;});

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Create lookup table, initialize parameters, and bind data to it
   *
   * @param {vgl.renderState} renderState
   */
  /////////////////////////////////////////////////////////////////////////////
  this.setup = function (renderState) {
    if (this.textureUnit() === 0) {
      renderState.m_context.activeTexture(vgl.GL.TEXTURE0);
    } else if (this.textureUnit() === 1) {
      renderState.m_context.activeTexture(vgl.GL.TEXTURE1);
    }

    renderState.m_context.deleteTexture(this.m_textureHandle);
    this.m_textureHandle = renderState.m_context.createTexture();
    renderState.m_context.bindTexture(vgl.GL.TEXTURE_2D, this.m_textureHandle);
    renderState.m_context.texParameteri(vgl.GL.TEXTURE_2D,
        vgl.GL.TEXTURE_MIN_FILTER, vgl.GL.LINEAR);
    renderState.m_context.texParameteri(vgl.GL.TEXTURE_2D,
        vgl.GL.TEXTURE_MAG_FILTER, vgl.GL.LINEAR);
    renderState.m_context.texParameteri(vgl.GL.TEXTURE_2D,
        vgl.GL.TEXTURE_WRAP_S, vgl.GL.CLAMP_TO_EDGE);
    renderState.m_context.texParameteri(vgl.GL.TEXTURE_2D,
        vgl.GL.TEXTURE_WRAP_T, vgl.GL.CLAMP_TO_EDGE);
    renderState.m_context.pixelStorei(vgl.GL.UNPACK_ALIGNMENT, 1);

    this.m_width = this.m_colorTable.length / 4;
    this.m_height = 1;
    this.m_depth = 0;
    renderState.m_context.texImage2D(vgl.GL.TEXTURE_2D,
        0, vgl.GL.RGBA, this.m_width, this.m_height, this.m_depth,
        vgl.GL.RGBA, vgl.GL.UNSIGNED_BYTE, new Uint8Array(this.m_colorTable));

    renderState.m_context.bindTexture(vgl.GL.TEXTURE_2D, null);
    m_setupTimestamp.modified();
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get color table used by the lookup table
   *
   * @returns {*}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.colorTable = function () {
    return this.m_colorTable;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Set color table used by the lookup table
   *
   * @param colors
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.setColorTable = function (colors) {
    if (this.m_colorTable === colors) {
      return false;
    }

    this.m_colorTable = colors;
    this.modified();
    return true;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get scalar range
   *
   * @returns {Array}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.range = function () {
    return m_range;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Set scalar range for the lookup table
   *
   * @param range
   * @returns {boolean}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.setRange = function (range) {
    if (m_range === range) {
      return false;
    }
    m_range = range;
    this.modified();
    return true;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Given a [min,max] range update the lookup table range
   *
   * @param range
   */
  /////////////////////////////////////////////////////////////////////////////
  this.updateRange = function (range) {
    if (!(range instanceof Array)) {
      console.log('[error] Invalid data type for range. Requires array [min,max]');
    }

    if (range[0] < m_range[0]) {
      m_range[0] = range[0];
      this.modified();
    }

    if (range[1] > m_range[1]) {
      m_range[1] = range[1];
      this.modified();
    }
  };

  return this;
};

inherit(vgl.lookupTable, vgl.texture);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, mat4, inherit*/
//////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class uniform
 *
 * @param type
 * @param name
 * @returns {vgl.uniform} OpenGL uniform encapsulation
 */
///////////////////////////////////////////////////////////////////////////////
vgl.uniform = function (type, name) {
  'use strict';

  if (!(this instanceof vgl.uniform)) {
    return new vgl.uniform();
  }

  this.getTypeNumberOfComponents = function (type) {
    switch (type) {
      case vgl.GL.FLOAT:
      case vgl.GL.INT:
      case vgl.GL.BOOL:
        return 1;

      case vgl.GL.FLOAT_VEC2:
      case vgl.GL.INT_VEC2:
      case vgl.GL.BOOL_VEC2:
        return 2;

      case vgl.GL.FLOAT_VEC3:
      case vgl.GL.INT_VEC3:
      case vgl.GL.BOOL_VEC3:
        return 3;

      case vgl.GL.FLOAT_VEC4:
      case vgl.GL.INT_VEC4:
      case vgl.GL.BOOL_VEC4:
        return 4;

      case vgl.GL.FLOAT_MAT3:
        return 9;

      case vgl.GL.FLOAT_MAT4:
        return 16;

      default:
        return 0;
    }
  };

  var m_type = type,
      m_name = name,
      m_dataArray = [];

  m_dataArray.length = this.getTypeNumberOfComponents(m_type);

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get name of the uniform
   *
   * @returns {*}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.name = function () {
    return m_name;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get type of the uniform
   *
   * @returns {*}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.type = function () {
    return m_type;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Get value of the uniform
   *
   * @returns {Array}
   */
  /////////////////////////////////////////////////////////////////////////////
  this.get = function () {
    return m_dataArray;
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Set value of the uniform
   *
   * @param value
   */
  /////////////////////////////////////////////////////////////////////////////
  this.set = function (value) {
    var i = 0;
    if (m_dataArray.length === 16) {
      for (i = 0; i < 16; i += 1) {
        m_dataArray[i] = value[i];
      }
    } else if (m_dataArray.length === 9) {
      for (i = 0; i < 9; i += 1) {
        m_dataArray[i] = value[i];
      }
    } else if (m_dataArray.length === 4) {
      for (i = 0; i < 4; i += 1) {
        m_dataArray[i] = value[i];
      }
    } else if (m_dataArray.length === 3) {
      for (i = 0; i < 3; i += 1) {
        m_dataArray[i] = value[i];
      }
    } else if (m_dataArray.length === 2) {
      for (i = 0; i < 2; i += 1) {
        m_dataArray[i] = value[i];
      }
    } else {
      m_dataArray[0] = value;
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Call GL and pass updated values to the current shader
   *
   * @param location
   */
  /////////////////////////////////////////////////////////////////////////////
  this.callGL = function (renderState, location) {
    if (this.m_numberElements < 1) {
      return;
    }

    switch (m_type) {
      case vgl.GL.BOOL:
      case vgl.GL.INT:
        renderState.m_context.uniform1iv(location, m_dataArray);
        break;
      case vgl.GL.FLOAT:
        renderState.m_context.uniform1fv(location, m_dataArray);
        break;
      case vgl.GL.FLOAT_VEC2:
        renderState.m_context.uniform2fv(location, m_dataArray);
        break;
      case vgl.GL.FLOAT_VEC3:
        renderState.m_context.uniform3fv(location, m_dataArray);
        break;
      case vgl.GL.FLOAT_VEC4:
        renderState.m_context.uniform4fv(location, m_dataArray);
        break;
      case vgl.GL.FLOAT_MAT3:
        renderState.m_context.uniformMatrix3fv(location, vgl.GL.FALSE, m_dataArray);
        break;
      case vgl.GL.FLOAT_MAT4:
        renderState.m_context.uniformMatrix4fv(location, vgl.GL.FALSE, m_dataArray);
        break;
      default:
        break;
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Virtual method to update the uniform
   *
   * Should be implemented by the derived class.
   *
   * @param renderState
   * @param program
   */
  /////////////////////////////////////////////////////////////////////////////
  this.update = function (renderState, program) {
    renderState = renderState; /* unused parameter */
    program = program; /* unused parameter */
    // Should be implemented by the derived class
  };

  return this;
};

///////////////////////////////////////////////////////////////////////////////
/**
 * Create new instance of class modelViewUniform
 *
 * @param name
 * @returns {vgl.modelViewUniform}
 */
///////////////////////////////////////////////////////////////////////////////
vgl.modelViewUniform = function (name) {
  'use strict';

  if (!(this instanceof vgl.modelViewUniform)) {
    return new vgl.modelViewUniform(name);
  }

  if (name.length === 0) {
    name = 'modelViewMatrix';
  }

  vgl.uniform.call(this, vgl.GL.FLOAT_MAT4, name);

  this.set(mat4.create());

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Update the uniform given a render state and shader program
   *
   * @param {vgl.renderState} renderState
   * @param {vgl.shaderProgram} program
   */
  /////////////////////////////////////////////////////////////////////////////
  this.update = function (renderState, program) {
    program = program; /* unused parameter */
    this.set(renderState.m_modelViewMatrix);
  };

  return this;
};

inherit(vgl.modelViewUniform, vgl.uniform);

///////////////////////////////////////////////////////////////////////////////
/**
 * Create new instance of class modelViewOriginUniform.
 *
 * @param name
 * @param uniform: a triplet of floats.
 * @returns {vgl.modelViewUniform}
 */
///////////////////////////////////////////////////////////////////////////////
vgl.modelViewOriginUniform = function (name, origin) {
  'use strict';

  if (!(this instanceof vgl.modelViewOriginUniform)) {
    return new vgl.modelViewOriginUniform(name, origin);
  }

  if (name.length === 0) {
    name = 'modelViewMatrix';
  }

  var m_origin = [origin[0], origin[1], origin[2] || 0];

  vgl.uniform.call(this, vgl.GL.FLOAT_MAT4, name);

  this.set(mat4.create());

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Update the uniform given a render state and shader program.  This offsets
   * the modelViewMatrix by the origin, and, if the model view should be
   * aligned, aligns it appropriately.  The alignment must be done after the
   * origin offset to maintain precision.
   *
   * @param {vgl.renderState} renderState
   * @param {vgl.shaderProgram} program
   */
  /////////////////////////////////////////////////////////////////////////////
  this.update = function (renderState, program) {
    program = program; /* unused parameter */
    var view = mat4.create();
    mat4.translate(view, renderState.m_modelViewMatrix, m_origin);
    if (renderState.m_modelViewAlignment) {
      var align = renderState.m_modelViewAlignment;
      /* view[12] and view[13] are the x and y offsets.  align.round is the
       * units-per-pixel, and align.dx and .dy are either 0 or half the size of
       * a unit-per-pixel.  The alignment guarantees that the texels are
       * aligned with screen pixels. */
      view[12] = Math.round(view[12] / align.roundx) * align.roundx + align.dx;
      view[13] = Math.round(view[13] / align.roundy) * align.roundy + align.dy;
    }
    this.set(view);
  };

  return this;
};

inherit(vgl.modelViewOriginUniform, vgl.uniform);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class projectionUniform
 *
 * @param name
 * @returns {vgl.projectionUniform}
 */
///////////////////////////////////////////////////////////////////////////////
vgl.projectionUniform = function (name) {
  'use strict';

  if (!(this instanceof vgl.projectionUniform)) {
    return new vgl.projectionUniform(name);
  }

  if (name.length === 0) {
    name = 'projectionMatrix';
  }

  vgl.uniform.call(this, vgl.GL.FLOAT_MAT4, name);

  this.set(mat4.create());

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Update the uniform given a render state and shader program
   *
   * @param renderState
   * @param program
   */
  /////////////////////////////////////////////////////////////////////////////
  this.update = function (renderState, program) {
    program = program; /* unused parameter */
    this.set(renderState.m_projectionMatrix);
  };

  return this;
};

inherit(vgl.projectionUniform, vgl.uniform);

///////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class floatUniform
 *
 * @param name
 * @param value
 * @returns {vgl.floatUniform}
 */
///////////////////////////////////////////////////////////////////////////////
vgl.floatUniform = function (name, value) {
  'use strict';

  if (!(this instanceof vgl.floatUniform)) {
    return new vgl.floatUniform(name, value);
  }

  if (name.length === 0) {
    name = 'floatUniform';
  }

  value = value === undefined ? 1.0 : value;

  vgl.uniform.call(this, vgl.GL.FLOAT, name);

  this.set(value);
};

inherit(vgl.floatUniform, vgl.uniform);


///////////////////////////////////////////////////////////////////////////////
/**
 * Create new instance of class normalMatrixUniform
 *
 * @param name
 * @returns {vgl.normalMatrixUniform}
 */
///////////////////////////////////////////////////////////////////////////////
vgl.normalMatrixUniform = function (name) {
  'use strict';

  if (!(this instanceof vgl.normalMatrixUniform)) {
    return new vgl.normalMatrixUniform(name);
  }

  if (name.length === 0) {
    name = 'normalMatrix';
  }

  vgl.uniform.call(this, vgl.GL.FLOAT_MAT4, name);

  this.set(mat4.create());

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Update the uniform given a render state and shader program
   *
   * @param {vgl.renderState} renderState
   * @param {vgl.shaderProgram} program
   */
  /////////////////////////////////////////////////////////////////////////////
  this.update = function (renderState, program) {
    program = program; /* unused parameter */
    this.set(renderState.m_normalMatrix);
  };

  return this;
};

inherit(vgl.normalMatrixUniform, vgl.uniform);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Keys to identify vertex attributes
 *
 * @type {{Position: number, Normal: number, TextureCoordinate: number,
 *         Color: number, Scalar: number, Scalar2: number, Scalar3: number,
 *         Scalar4: number, Scalar5: number, Scalar6: number, Scalar7: number,
 *         CountAttributeIndex: number}}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.vertexAttributeKeys = {
  'Position' : 0,
  'Normal' : 1,
  'TextureCoordinate' : 2,
  'Color' : 3,
  'Scalar': 4,
  'CountAttributeIndex' : 5
};

vgl.vertexAttributeKeysIndexed = {
  'Zero' : 0,
  'One' : 1,
  'Two' : 2,
  'Three' : 3,
  'Four' : 4,
  'Five' : 5,
  'Six' : 6,
  'Seven' : 7,
  'Eight' : 8,
  'Nine' : 9
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of vertexAttribute
 *
 * @param {string} name
 * @returns {vgl.vertexAttribute}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.vertexAttribute = function (name) {
  'use strict';

  if (!(this instanceof vgl.vertexAttribute)) {
    return new vgl.vertexAttribute(name);
  }

  var m_name = name;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get name of the vertex attribute
   *
   * @returns {string}
   */
  //////////////////////////////////////////////////////////////////////////////
  this.name = function () {
    return m_name;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Bind vertex data to the given render state
   *
   * @param {vgl.renderState} renderState
   * @param {vgl.vertexAttributeKeys} key
   */
  //////////////////////////////////////////////////////////////////////////////
  this.bindVertexData = function (renderState, key) {
    var geometryData = renderState.m_mapper.geometryData(),
        sourceData = geometryData.sourceData(key),
        program = renderState.m_material.shaderProgram();

    renderState.m_context.vertexAttribPointer(program.attributeLocation(
        m_name), sourceData
        .attributeNumberOfComponents(key), sourceData.attributeDataType(key),
                           sourceData.normalized(key), sourceData
                               .attributeStride(key), sourceData
                               .attributeOffset(key));

    renderState.m_context.enableVertexAttribArray(program.attributeLocation(m_name));
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Undo bind vertex data for a given render state
   *
   * @param {vgl.renderState} renderState
   * @param {vgl.vertexAttributeKeys} key
   */
  //////////////////////////////////////////////////////////////////////////////
  this.undoBindVertexData = function (renderState, key) {
    key = key; /* unused parameter */

    var program = renderState.m_material.shaderProgram();

    renderState.m_context.disableVertexAttribArray(program.attributeLocation(m_name));
  };
};

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, inherit*/
//////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class source
 *
 * @returns {vgl.source}
 */
///////////////////////////////////////////////////////////////////////////////
vgl.source = function () {
  'use strict';

  if (!(this instanceof vgl.source)) {
    return new vgl.source();
  }

  vgl.object.call(this);

  /////////////////////////////////////////////////////////////////////////////
  /**
   * Virtual function to create a source instance
   */
  /////////////////////////////////////////////////////////////////////////////
  this.create = function () {
  };

  return this;
};

inherit(vgl.source, vgl.object);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class planeSource
 *
 * @class
 * @returns {vgl.planeSource}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.planeSource = function () {
  'use strict';

  if (!(this instanceof vgl.planeSource)) {
    return new vgl.planeSource();
  }
  vgl.source.call(this);

  var m_origin = [0.0, 0.0, 0.0],
      m_point1 = [1.0, 0.0, 0.0],
      m_point2 = [0.0, 1.0, 0.0],
      m_normal = [0.0, 0.0, 1.0],
      m_xresolution = 1,
      m_yresolution = 1,
      m_geom = null;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set origin of the plane
   *
   * @param x
   * @param y
   * @param z
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setOrigin = function (x, y, z) {
    m_origin[0] = x;
    m_origin[1] = y;
    m_origin[2] = z;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set point that defines the first axis of the plane
   *
   * @param x
   * @param y
   * @param z
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setPoint1 = function (x, y, z) {
    m_point1[0] = x;
    m_point1[1] = y;
    m_point1[2] = z;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set point that defines the first axis of the plane
   *
   * @param x
   * @param y
   * @param z
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setPoint2 = function (x, y, z) {
    m_point2[0] = x;
    m_point2[1] = y;
    m_point2[2] = z;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create a plane geometry given input parameters
   *
   * @returns {null}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.create = function () {
    m_geom = new vgl.geometryData();

    var x = [], tc = [], v1 = [], v2 = [],
        pts = [], i, j, k, ii, numPts, numPolys,
        posIndex = 0, normIndex = 0, colorIndex = 0, texCoordIndex = 0,
        positions = [], normals = [], colors = [],
        texCoords = [], indices = [], tristrip = null,
        sourcePositions = null, sourceColors = null, sourceTexCoords;

    x.length = 3;
    tc.length = 2;
    v1.length = 3;
    v2.length = 3;
    pts.length = 3;

    // Check input
    for (i = 0; i < 3; i += 1) {
      v1[i] = m_point1[i] - m_origin[i];
      v2[i] = m_point2[i] - m_origin[i];
    }

    // TODO Compute center and normal
    // Set things up; allocate memory
    numPts = (m_xresolution + 1) * (m_yresolution + 1);
    numPolys = m_xresolution * m_yresolution * 2;
    positions.length = 3 * numPts;
    normals.length = 3 * numPts;
    texCoords.length = 2 * numPts;
    indices.length = numPts;

    for (k = 0, i = 0; i < (m_yresolution + 1); i += 1) {
      tc[1] = i / m_yresolution;

      for (j = 0; j < (m_xresolution + 1); j += 1) {
        tc[0] = j / m_xresolution;

        for (ii = 0; ii < 3; ii += 1) {
          x[ii] = m_origin[ii] + tc[0] * v1[ii] + tc[1] * v2[ii];
        }

        //jshint plusplus: false
        positions[posIndex++] = x[0];
        positions[posIndex++] = x[1];
        positions[posIndex++] = x[2];

        colors[colorIndex++] = 1.0;
        colors[colorIndex++] = 1.0;
        colors[colorIndex++] = 1.0;

        normals[normIndex++] = m_normal[0];
        normals[normIndex++] = m_normal[1];
        normals[normIndex++] = m_normal[2];

        texCoords[texCoordIndex++] = tc[0];
        texCoords[texCoordIndex++] = tc[1];
        //jshint plusplus: true
      }
    }

    /// Generate polygon connectivity
    for (i = 0; i < m_yresolution; i += 1) {
      for (j = 0; j < m_xresolution; j += 1) {
        pts[0] = j + i * (m_xresolution + 1);
        pts[1] = pts[0] + 1;
        pts[2] = pts[0] + m_xresolution + 2;
        pts[3] = pts[0] + m_xresolution + 1;
      }
    }

    for (i = 0; i < numPts; i += 1) {
      indices[i] = i;
    }

    tristrip = new vgl.triangleStrip();
    tristrip.setIndices(indices);

    sourcePositions = vgl.sourceDataP3fv();
    sourcePositions.pushBack(positions);

    sourceColors = vgl.sourceDataC3fv();
    sourceColors.pushBack(colors);

    sourceTexCoords = vgl.sourceDataT2fv();
    sourceTexCoords.pushBack(texCoords);

    m_geom.addSource(sourcePositions);
    m_geom.addSource(sourceColors);
    m_geom.addSource(sourceTexCoords);
    m_geom.addPrimitive(tristrip);

    return m_geom;
  };
};

inherit(vgl.planeSource, vgl.source);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class pointSource
 *
 * @class
 * @returns {vgl.pointSource}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.pointSource = function () {
  'use strict';

  if (!(this instanceof vgl.pointSource)) {
    return new vgl.pointSource();
  }
  vgl.source.call(this);

  var m_this = this,
      m_positions = [],
      m_colors = [],
      m_textureCoords = [],
      m_size = [],
      m_geom = null;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get positions for the points
   */
  ////////////////////////////////////////////////////////////////////////////
  this.getPositions = function () {
    return m_positions;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set positions for the source
   *
   * @param positions
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setPositions = function (positions) {
    if (positions instanceof Array) {
      m_positions = positions;
    } else {
      console
          .log('[ERROR] Invalid data type for positions. Array is required.');
    }
    m_this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get colors for the points
   */
  ////////////////////////////////////////////////////////////////////////////
  this.getColors = function () {
    return m_colors;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set colors for the points
   *
   * @param colors
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setColors = function (colors) {
    if (colors instanceof Array) {
      m_colors = colors;
    } else {
      console.log('[ERROR] Invalid data type for colors. Array is required.');
    }

    m_this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get size for the points
   */
  ////////////////////////////////////////////////////////////////////////////
  this.getSize = function () {
    return m_size;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set colors for the points
   *
   * @param colors
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setSize = function (size) {
    m_size = size;
    this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set texture coordinates for the points
   *
   * @param texcoords
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setTextureCoordinates = function (texcoords) {
    if (texcoords instanceof Array) {
      m_textureCoords = texcoords;
    } else {
      console.log('[ERROR] Invalid data type for ' +
                  'texture coordinates. Array is required.');
    }
    m_this.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create a point geometry given input parameters
   */
  ////////////////////////////////////////////////////////////////////////////
  this.create = function () {
    m_geom = new vgl.geometryData();

    if (m_positions.length % 3 !== 0) {
      console.log('[ERROR] Invalid length of the points array');
      return;
    }

    var numPts = m_positions.length / 3,
        i = 0,
        indices = [],
        pointsPrimitive,
        sourcePositions,
        sourceColors,
        sourceTexCoords,
        sourceSize;

    indices.length = numPts;
    for (i = 0; i < numPts; i += 1) {
      indices[i] = i;
    }

    /// Generate array of size if needed
    sourceSize = vgl.sourceDataDf();
    if (numPts !== m_size.length) {
      for (i = 0; i < numPts; i += 1) {
        sourceSize.pushBack(m_size);
      }
    } else {
      sourceSize.setData(m_size);
    }
    m_geom.addSource(sourceSize);

    pointsPrimitive = new vgl.points();
    pointsPrimitive.setIndices(indices);

    sourcePositions = vgl.sourceDataP3fv();
    sourcePositions.pushBack(m_positions);
    m_geom.addSource(sourcePositions);

    if ((m_colors.length > 0) && m_colors.length === m_positions.length) {
      sourceColors = vgl.sourceDataC3fv();
      sourceColors.pushBack(m_colors);
      m_geom.addSource(sourceColors);
    } else if ((m_colors.length > 0) && m_colors.length !== m_positions.length) {
      console
          .log('[ERROR] Number of colors are different than number of points');
    }

    if (m_textureCoords.length > 0 &&
        m_textureCoords.length === m_positions.length) {
      sourceTexCoords = vgl.sourceDataT2fv();
      sourceTexCoords.pushBack(m_textureCoords);
      m_geom.addSource(sourceTexCoords);
    } else if (m_textureCoords.length > 0 &&
        (m_textureCoords.length / 2) !== (m_positions.length / 3)) {
      console
          .log('[ERROR] Number of texture coordinates are different than ' +
               'number of points');
    }


    m_geom.addPrimitive(pointsPrimitive);

    return m_geom;
  };
};

inherit(vgl.pointSource, vgl.source);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class lineSource
 *
 * @class
 * @returns {vgl.lineSource}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.lineSource = function (positions, colors) {
  'use strict';

  if (!(this instanceof vgl.lineSource)) {
    return new vgl.lineSource();
  }
  vgl.source.call(this);

  var m_positions = positions,
      m_colors = colors;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set start positions for the lines
   *
   * @param positions
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setPositions = function (positions) {
    if (positions instanceof Array) {
      m_positions = positions;
      this.modified();
      return true;
    }

    console
      .log('[ERROR] Invalid data type for positions. Array is required.');
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set colors for the lines
   *
   * @param colors
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setColors = function (colors) {
    if (colors instanceof Array) {
      m_colors = colors;
      this.modified();
      return true;
    }

    console.log('[ERROR] Invalid data type for colors. Array is required.');
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create a point geometry given input parameters
   */
  ////////////////////////////////////////////////////////////////////////////
  this.create = function () {
    if (!m_positions) {
      console.log('[error] Invalid positions');
      return;
    }

    if (m_positions.length % 3 !== 0) {
      console.log('[error] Line source requires 3d points');
      return;
    }

    if (m_positions.length % 3 !== 0) {
      console.log('[ERROR] Invalid length of the points array');
      return;
    }

    var m_geom = new vgl.geometryData(),
        numPts = m_positions.length / 3,
        i,
        indices = [],
        linesPrimitive,
        sourcePositions,
        sourceColors;

    indices.length = numPts;

    for (i = 0; i < numPts; i += 1) {
      indices[i] = i;
    }

    linesPrimitive = new vgl.lines();
    linesPrimitive.setIndices(indices);

    sourcePositions = vgl.sourceDataP3fv();
    sourcePositions.pushBack(m_positions);
    m_geom.addSource(sourcePositions);

    if (m_colors && (m_colors.length > 0) &&
         m_colors.length === m_positions.length) {
      sourceColors = vgl.sourceDataC3fv();
      sourceColors.pushBack(m_colors);
      m_geom.addSource(sourceColors);
    } else if (m_colors && (m_colors.length > 0) &&
             m_colors.length !== m_positions.length) {
      console
        .log('[error] Number of colors are different than number of points');
    }

    m_geom.addPrimitive(linesPrimitive);

    return m_geom;
  };
};

inherit(vgl.lineSource, vgl.source);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global document, vgl, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class utils
 *
 * Utility class provides helper functions such as functions to create
 * shaders, geometry etc.
 *
 * @returns {vgl.utils}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils = function () {
  'use strict';

  if (!(this instanceof vgl.utils)) {
    return new vgl.utils();
  }
  vgl.object.call(this);

  return this;
};

inherit(vgl.utils, vgl.object);

//////////////////////////////////////////////////////////////////////////////
/**
 * Helper function to compute power of 2 number
 *
 * @param value
 * @param pow
 *
 * @returns {number}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.computePowerOfTwo = function (value, pow) {
  'use strict';
  pow = pow || 1;
  while (pow < value) {
    pow *= 2;
  }
  return pow;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of default vertex shader that uses a texture
 *
 * Helper function to create default vertex shader
 *
 * @param context
 * @returns {vgl.shader}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createTextureVertexShader = function (context) {
  'use strict';
  var vertexShaderSource = [
        'attribute vec3 vertexPosition;',
        'attribute vec3 textureCoord;',
        'uniform mediump float pointSize;',
        'uniform mat4 modelViewMatrix;',
        'uniform mat4 projectionMatrix;',
        'varying highp vec3 iTextureCoord;',
        'void main(void)',
        '{',
        'gl_PointSize = pointSize;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);',
        ' iTextureCoord = textureCoord;', '}'].join('\n');
  return vgl.getCachedShader(vgl.GL.VERTEX_SHADER, context,
                             vertexShaderSource);
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of default fragment shader that uses a texture
 *
 * Helper function to create default fragment shader with sampler
 *
 * @param context
 * @returns {vgl.shader}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createTextureFragmentShader = function (context) {
  'use strict';
  var fragmentShaderSource = [
        'varying highp vec3 iTextureCoord;',
        'uniform sampler2D sampler2d;',
        'uniform mediump float opacity;',
        'void main(void) {',
        'gl_FragColor = vec4(texture2D(sampler2d, vec2(iTextureCoord.s, ' +
                        'iTextureCoord.t)).xyz, opacity);',
        '}'].join('\n');
  return vgl.getCachedShader(vgl.GL.FRAGMENT_SHADER, context,
                             fragmentShaderSource);
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create variation of createTextureFragmentShader which uses texture alpha
 *
 * Helper function to create default fragment shader with sampler
 *
 * @param context
 * @returns {vgl.shader}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createRgbaTextureFragmentShader = function (context) {
  'use strict';
  var fragmentShaderSource = [
        'varying highp vec3 iTextureCoord;',
        'uniform sampler2D sampler2d;',
        'uniform mediump float opacity;',
        'void main(void) {',
        '  mediump vec4 color = vec4(texture2D(sampler2d, vec2(' +
                                'iTextureCoord.s, iTextureCoord.t)).xyzw);',
        '  color.w *= opacity;',
        '  gl_FragColor = color;',
        '}'
      ].join('\n');
  return vgl.getCachedShader(vgl.GL.FRAGMENT_SHADER, context,
                             fragmentShaderSource);
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of default vertex shader
 *
 * Helper function to create default vertex shader
 *
 * @param context
 * @returns {vgl.shader}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createVertexShader = function (context) {
  'use strict';
  var vertexShaderSource = [
        'attribute vec3 vertexPosition;',
        'attribute vec3 vertexColor;',
        'uniform mediump float pointSize;',
        'uniform mat4 modelViewMatrix;',
        'uniform mat4 projectionMatrix;',
        'varying mediump vec3 iVertexColor;',
        'varying highp vec3 iTextureCoord;',
        'void main(void)',
        '{',
        'gl_PointSize = pointSize;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);',
        ' iVertexColor = vertexColor;', '}'].join('\n');
  return vgl.getCachedShader(vgl.GL.VERTEX_SHADER, context,
                             vertexShaderSource);
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of default vertex shader
 *
 * Helper function to create default vertex shader
 *
 * @param context
 * @returns {vgl.shader}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createPointVertexShader = function (context) {
  'use strict';
  var vertexShaderSource = [
        'attribute vec3 vertexPosition;',
        'attribute vec3 vertexColor;',
        'attribute float vertexSize;',
        'uniform mat4 modelViewMatrix;',
        'uniform mat4 projectionMatrix;',
        'varying mediump vec3 iVertexColor;',
        'varying highp vec3 iTextureCoord;',
        'void main(void)',
        '{',
        'gl_PointSize =  vertexSize;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);',
        ' iVertexColor = vertexColor;', '}'].join('\n');
  return vgl.getCachedShader(vgl.GL.VERTEX_SHADER, context,
                             vertexShaderSource);
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of vertex shader with a solid color
 *
 * Helper function to create default vertex shader
 *
 * @param context
 * @returns {vgl.shader}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createVertexShaderSolidColor = function (context) {
  'use strict';
  var vertexShaderSource = [
        'attribute vec3 vertexPosition;',
        'uniform mediump float pointSize;',
        'uniform mat4 modelViewMatrix;',
        'uniform mat4 projectionMatrix;',
        'void main(void)',
        '{',
        'gl_PointSize = pointSize;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);',
        '}'].join('\n');
  return vgl.getCachedShader(vgl.GL.VERTEX_SHADER, context,
                             vertexShaderSource);
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of vertex shader that passes values through
 * for color mapping
 *
 * Helper function to create default vertex shader
 *
 * @param context
 * @returns {vgl.shader}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createVertexShaderColorMap = function (context, min, max) {
  'use strict';
  min = min; /* unused parameter */
  max = max; /* unused parameter */
  var vertexShaderSource = [
        'attribute vec3 vertexPosition;',
        'attribute float vertexScalar;',
        'uniform mediump float pointSize;',
        'uniform mat4 modelViewMatrix;',
        'uniform mat4 projectionMatrix;',
        'uniform float lutMin;',
        'uniform float lutMax;',
        'varying mediump float iVertexScalar;',
        'void main(void)',
        '{',
        'gl_PointSize = pointSize;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);',
        'iVertexScalar = (vertexScalar-lutMin)/(lutMax-lutMin);',
        '}'].join('\n');
  return vgl.getCachedShader(vgl.GL.VERTEX_SHADER, context,
                             vertexShaderSource);
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of default fragment shader
 *
 * Helper function to create default fragment shader
 *
 * @param context
 * @returns {vgl.shader}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createFragmentShader = function (context) {
  'use strict';
  var fragmentShaderSource = ['varying mediump vec3 iVertexColor;',
                              'uniform mediump float opacity;',
                              'void main(void) {',
                              'gl_FragColor = vec4(iVertexColor, opacity);',
                              '}'].join('\n');
  return vgl.getCachedShader(vgl.GL.FRAGMENT_SHADER, context,
                             fragmentShaderSource);
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a Phong vertex shader
 *
 * Helper function to create Phong vertex shader
 *
 * @param context
 * @returns {vgl.shader}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createPhongVertexShader = function (context) {
  'use strict';
  var vertexShaderSource = [
      'attribute highp vec3 vertexPosition;',
      'attribute mediump vec3 vertexNormal;',
      'attribute mediump vec3 vertexColor;',

      'uniform highp mat4 projectionMatrix;',
      'uniform mat4 modelViewMatrix;',
      'uniform mat4 normalMatrix;',

      'varying highp vec4 varPosition;',
      'varying mediump vec3 varNormal;',
      'varying mediump vec3 varVertexColor;',

      'void main(void)',
      '{',
      'varPosition = modelViewMatrix * vec4(vertexPosition, 1.0);',
      'gl_Position = projectionMatrix * varPosition;',
      'varNormal = vec3(normalMatrix * vec4(vertexNormal, 0.0));',
      'varVertexColor = vertexColor;',
      '}'].join('\n');
  return vgl.getCachedShader(vgl.GL.VERTEX_SHADER, context,
                             vertexShaderSource);
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of Phong fragment shader
 *
 * Helper function to create Phong fragment shader
 *
 * NOTE: Shader assumes directional light
 *
 * @param context
 * @returns {vgl.shader}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createPhongFragmentShader = function (context) {
  'use strict';
  var fragmentShaderSource = [
    'uniform mediump float opacity;',
    'precision mediump float;',
    'varying vec3 varNormal;',
    'varying vec4 varPosition;',
    'varying mediump vec3 varVertexColor;',
    'const vec3 lightPos = vec3(0.0, 0.0,10000.0);',
    'const vec3 ambientColor = vec3(0.01, 0.01, 0.01);',
    'const vec3 specColor = vec3(0.0, 0.0, 0.0);',

    'void main() {',
    'vec3 normal = normalize(varNormal);',
    'vec3 lightDir = normalize(lightPos);',
    'vec3 reflectDir = -reflect(lightDir, normal);',
    'vec3 viewDir = normalize(-varPosition.xyz);',

    'float lambertian = max(dot(lightDir, normal), 0.0);',
    'vec3 color = vec3(0.0);',
    'if(lambertian > 0.0) {',
    '  color = lambertian * varVertexColor;',
    '}',
    'gl_FragColor = vec4(color * opacity, 1.0 - opacity);',
    '}'].join('\n');
  return vgl.getCachedShader(vgl.GL.FRAGMENT_SHADER, context,
                             fragmentShaderSource);
};


//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of fragment shader with an assigned constant color.
 *
 * Helper function to create default fragment shader
 *
 * @param context
 * @returns {vgl.shader}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createFragmentShaderSolidColor = function (context, color) {
  'use strict';
  var fragmentShaderSource = [
      'uniform mediump float opacity;',
      'void main(void) {',
      'gl_FragColor = vec4(' + color[0] + ',' + color[1] + ',' + color[2] + ', opacity);',
      '}'].join('\n');
  return vgl.getCachedShader(vgl.GL.FRAGMENT_SHADER, context,
                             fragmentShaderSource);
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of fragment shader that maps values into colors bia lookup table
 *
 * Helper function to create default fragment shader
 *
 * @param context
 * @returns {vgl.shader}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createFragmentShaderColorMap = function (context) {
  'use strict';
  var fragmentShaderSource = [
        'varying mediump float iVertexScalar;',
        'uniform sampler2D sampler2d;',
        'uniform mediump float opacity;',
        'void main(void) {',
        'gl_FragColor = vec4(texture2D(sampler2d, vec2(iVertexScalar, ' +
            '0.0)).xyz, opacity);',
        '}'].join('\n');
  return vgl.getCachedShader(vgl.GL.FRAGMENT_SHADER, context,
                             fragmentShaderSource);
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of vertex shader for point sprites
 *
 * Helper function to create default point sprites vertex shader
 *
 * @param context
 * @returns {vgl.shader}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createPointSpritesVertexShader = function (context) {
  'use strict';
  var vertexShaderSource = [
        'attribute vec3 vertexPosition;',
        'attribute vec3 vertexColor;',
        'uniform mediump vec2 pointSize;',
        'uniform mat4 modelViewMatrix;',
        'uniform mat4 projectionMatrix;',
        'uniform float height;',
        'varying mediump vec3 iVertexColor;',
        'varying highp float iVertexScalar;',
        'void main(void)',
        '{',
        'mediump float realPointSize = pointSize.y;',
        'if (pointSize.x > pointSize.y) {',
        '  realPointSize = pointSize.x;}',
        'gl_PointSize = realPointSize ;',
        'iVertexScalar = vertexPosition.z;',
        'gl_Position = projectionMatrix * modelViewMatrix * ' +
            'vec4(vertexPosition.xy, height, 1.0);',
        ' iVertexColor = vertexColor;', '}'].join('\n');
  return vgl.getCachedShader(vgl.GL.VERTEX_SHADER, context,
                             vertexShaderSource);
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of fragment shader for point sprites
 *
 * Helper function to create default point sprites fragment shader
 *
 * @param context
 * @returns {vgl.shader}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createPointSpritesFragmentShader = function (context) {
  'use strict';
  var fragmentShaderSource = [
        'varying mediump vec3 iVertexColor;',
        'varying highp float iVertexScalar;',
        'uniform sampler2D opacityLookup;',
        'uniform highp float lutMin;',
        'uniform highp float lutMax;',
        'uniform sampler2D scalarsToColors;',
        'uniform int useScalarsToColors;',
        'uniform int useVertexColors;',
        'uniform mediump vec2 pointSize;',
        'uniform mediump float vertexColorWeight;',
        'void main(void) {',
        'mediump vec2 realTexCoord;',
        'if (pointSize.x > pointSize.y) {',
        '  realTexCoord = vec2(1.0, pointSize.y/pointSize.x) * gl_PointCoord;',
        '} else {',
        '  realTexCoord = vec2(pointSize.x/pointSize.y, 1.0) * gl_PointCoord;',
        '}',
        'highp float texOpacity = texture2D(opacityLookup, realTexCoord).w;',
        'if (useScalarsToColors == 1) {',
        '  gl_FragColor = vec4(texture2D(scalarsToColors, vec2((' +
            'iVertexScalar - lutMin)/(lutMax - lutMin), 0.0)).xyz, ' +
            'texOpacity);',
        '} else if (useVertexColors == 1) {',
        '  gl_FragColor = vec4(iVertexColor, texOpacity);',
        '} else {',
        '  gl_FragColor = vec4(texture2D(opacityLookup, realTexCoord).xyz, texOpacity);',
        '}}'
    ].join('\n');
  return vgl.getCachedShader(vgl.GL.FRAGMENT_SHADER, context,
                             fragmentShaderSource);
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of texture material
 *
 * Helper function to create a texture material
 *
 * @returns {vgl.material}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createTextureMaterial = function (isRgba, origin) {
  'use strict';
  var mat = new vgl.material(),
    blend = new vgl.blend(),
    prog = new vgl.shaderProgram(),
    vertexShader = vgl.utils.createTextureVertexShader(vgl.GL),
    fragmentShader = null,
    posVertAttr = new vgl.vertexAttribute('vertexPosition'),
    texCoordVertAttr = new vgl.vertexAttribute('textureCoord'),
    pointsizeUniform = new vgl.floatUniform('pointSize', 5.0),
    modelViewUniform,
    projectionUniform = new vgl.projectionUniform('projectionMatrix'),
    samplerUniform = new vgl.uniform(vgl.GL.INT, 'sampler2d'),
    opacityUniform = null;
  if (origin !== undefined) {
    modelViewUniform = new vgl.modelViewOriginUniform('modelViewMatrix',
                                                      origin);
  } else {
    modelViewUniform = new vgl.modelViewUniform('modelViewMatrix');
  }

  samplerUniform.set(0);

  prog.addVertexAttribute(posVertAttr, vgl.vertexAttributeKeys.Position);
  prog.addVertexAttribute(texCoordVertAttr,
                          vgl.vertexAttributeKeys.TextureCoordinate);
  prog.addUniform(pointsizeUniform);
  prog.addUniform(modelViewUniform);
  prog.addUniform(projectionUniform);

  if (isRgba) {
    fragmentShader = vgl.utils.createRgbaTextureFragmentShader(vgl.GL);
  } else {
    fragmentShader = vgl.utils.createTextureFragmentShader(vgl.GL);
  }
  opacityUniform = new vgl.floatUniform('opacity', 1.0);
  prog.addUniform(opacityUniform);

  prog.addShader(fragmentShader);
  prog.addShader(vertexShader);
  mat.addAttribute(prog);
  mat.addAttribute(blend);

  return mat;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of geometry material
 *
 * Helper function to create geometry material
 *
 * @returns {vgl.material}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createGeometryMaterial = function () {
  'use strict';
  var mat = new vgl.material(),
      prog = new vgl.shaderProgram(),
      pointSize = 5.0,
      opacity = 1.0,
      vertexShader = vgl.utils.createVertexShader(vgl.GL),
      fragmentShader = vgl.utils.createFragmentShader(vgl.GL),
      posVertAttr = new vgl.vertexAttribute('vertexPosition'),
      colorVertAttr = new vgl.vertexAttribute('vertexColor'),
      pointsizeUniform = new vgl.floatUniform('pointSize', pointSize),
      opacityUniform = new vgl.floatUniform('opacity', opacity),
      modelViewUniform = new vgl.modelViewUniform('modelViewMatrix'),
      projectionUniform = new vgl.projectionUniform('projectionMatrix');

  prog.addVertexAttribute(posVertAttr, vgl.vertexAttributeKeys.Position);
  prog.addVertexAttribute(colorVertAttr, vgl.vertexAttributeKeys.Color);
  prog.addUniform(pointsizeUniform);
  prog.addUniform(opacityUniform);
  prog.addUniform(modelViewUniform);
  prog.addUniform(projectionUniform);
  prog.addShader(fragmentShader);
  prog.addShader(vertexShader);
  mat.addAttribute(prog);

  return mat;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of geometry material
 *
 * Helper function to create geometry material
 *
 * @returns {vgl.material}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createPointGeometryMaterial = function (opacity) {
  'use strict';
  opacity = opacity === undefined ? 1.0 : opacity;
  var mat = new vgl.material(),
      blend = new vgl.blend(),
      prog = new vgl.shaderProgram(),
      vertexShader = vgl.utils.createPointVertexShader(vgl.GL),
      fragmentShader = vgl.utils.createFragmentShader(vgl.GL),
      posVertAttr = new vgl.vertexAttribute('vertexPosition'),
      colorVertAttr = new vgl.vertexAttribute('vertexColor'),
      sizeVertAttr = new vgl.vertexAttribute('vertexSize'),
      opacityUniform = new vgl.floatUniform('opacity', opacity),
      modelViewUniform = new vgl.modelViewUniform('modelViewMatrix'),
      projectionUniform = new vgl.projectionUniform('projectionMatrix');

  prog.addVertexAttribute(posVertAttr, vgl.vertexAttributeKeys.Position);
  prog.addVertexAttribute(colorVertAttr, vgl.vertexAttributeKeys.Color);
  prog.addVertexAttribute(sizeVertAttr, vgl.vertexAttributeKeys.Scalar);
  prog.addUniform(opacityUniform);
  prog.addUniform(modelViewUniform);
  prog.addUniform(projectionUniform);
  prog.addShader(fragmentShader);
  prog.addShader(vertexShader);
  mat.addAttribute(prog);
  mat.addAttribute(blend);

  return mat;
};


//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of geometry material with the phong shader
 *
 * Helper function to create color phong shaded geometry material
 *
 * @returns {vgl.material}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createPhongMaterial = function () {
  'use strict';
  var mat = new vgl.material(),
      prog = new vgl.shaderProgram(),
      vertexShader = vgl.utils.createPhongVertexShader(vgl.GL),
      fragmentShader = vgl.utils.createPhongFragmentShader(vgl.GL),
      posVertAttr = new vgl.vertexAttribute('vertexPosition'),
      normalVertAttr = new vgl.vertexAttribute('vertexNormal'),
      colorVertAttr = new vgl.vertexAttribute('vertexColor'),
      opacityUniform = new vgl.floatUniform('opacity', 1.0),
      modelViewUniform = new vgl.modelViewUniform('modelViewMatrix'),
      normalUniform = new vgl.normalMatrixUniform('normalMatrix'),
      projectionUniform = new vgl.projectionUniform('projectionMatrix');

  prog.addVertexAttribute(posVertAttr, vgl.vertexAttributeKeys.Position);
  prog.addVertexAttribute(normalVertAttr, vgl.vertexAttributeKeys.Normal);
  prog.addVertexAttribute(colorVertAttr, vgl.vertexAttributeKeys.Color);
  prog.addUniform(opacityUniform);
  prog.addUniform(modelViewUniform);
  prog.addUniform(projectionUniform);
  prog.addUniform(normalUniform);
  prog.addShader(fragmentShader);
  prog.addShader(vertexShader);
  //mat.addAttribute(blend);
  mat.addAttribute(prog);

  return mat;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of colored geometry material
 *
 * Helper function to create color geometry material
 *
 * @returns {vgl.material}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createColorMaterial = function () {
  'use strict';
  var mat = new vgl.material(),
      blend = new vgl.blend(),
      prog = new vgl.shaderProgram(),
      vertexShader = vgl.utils.createVertexShader(vgl.GL),
      fragmentShader = vgl.utils.createFragmentShader(vgl.GL),
      posVertAttr = new vgl.vertexAttribute('vertexPosition'),
      texCoordVertAttr = new vgl.vertexAttribute('textureCoord'),
      colorVertAttr = new vgl.vertexAttribute('vertexColor'),
      pointsizeUniform = new vgl.floatUniform('pointSize', 5.0),
      opacityUniform = new vgl.floatUniform('opacity', 1.0),
      modelViewUniform = new vgl.modelViewUniform('modelViewMatrix'),
      projectionUniform = new vgl.projectionUniform('projectionMatrix');

  prog.addVertexAttribute(posVertAttr, vgl.vertexAttributeKeys.Position);
  prog.addVertexAttribute(colorVertAttr, vgl.vertexAttributeKeys.Color);
  prog.addVertexAttribute(texCoordVertAttr,
                          vgl.vertexAttributeKeys.TextureCoordinate);
  prog.addUniform(pointsizeUniform);
  prog.addUniform(opacityUniform);
  prog.addUniform(modelViewUniform);
  prog.addUniform(projectionUniform);
  prog.addShader(fragmentShader);
  prog.addShader(vertexShader);
  mat.addAttribute(prog);
  mat.addAttribute(blend);

  return mat;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of geometry material
 *
 * Helper function to create geometry material
 *
 * @returns {vgl.material}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createColorMappedMaterial = function (lut) {
  'use strict';
  if (!lut) {
    lut = new vgl.lookupTable();
  }

  var scalarRange = lut.range(),
      mat = new vgl.material(),
      blend = new vgl.blend(),
      prog = new vgl.shaderProgram(),
      vertexShader = vgl.utils.createVertexShaderColorMap(
        vgl.GL, scalarRange[0], scalarRange[1]),
      fragmentShader = vgl.utils.createFragmentShaderColorMap(vgl.GL),
      posVertAttr = new vgl.vertexAttribute('vertexPosition'),
      scalarVertAttr = new vgl.vertexAttribute('vertexScalar'),
      pointsizeUniform = new vgl.floatUniform('pointSize', 5.0),
      opacityUniform = new vgl.floatUniform('opacity', 1.0),
      lutMinUniform = new vgl.floatUniform('lutMin', scalarRange[0]),
      lutMaxUniform = new vgl.floatUniform('lutMax', scalarRange[1]),
      modelViewUniform = new vgl.modelViewUniform('modelViewMatrix'),
      projectionUniform = new vgl.projectionUniform('projectionMatrix'),
      samplerUniform = new vgl.uniform(vgl.GL.FLOAT, 'sampler2d'),
      lookupTable = lut;

  samplerUniform.set(0);

  prog.addVertexAttribute(posVertAttr, vgl.vertexAttributeKeys.Position);
  prog.addVertexAttribute(scalarVertAttr, vgl.vertexAttributeKeys.Scalar);
  prog.addUniform(pointsizeUniform);
  prog.addUniform(opacityUniform);
  prog.addUniform(lutMinUniform);
  prog.addUniform(lutMaxUniform);
  prog.addUniform(modelViewUniform);
  prog.addUniform(projectionUniform);
  prog.addShader(fragmentShader);
  prog.addShader(vertexShader);
  mat.addAttribute(prog);
  mat.addAttribute(blend);
  mat.addAttribute(lookupTable);

  return mat;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Update color mapped material
 *
 * @param mat
 * @param scalarRange
 * @param lut
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.updateColorMappedMaterial = function (mat, lut) {
  'use strict';
  if (!mat) {
    console.log('[warning] Invalid material. Nothing to update.');
    return;
  }

  if (!lut) {
    console.log('[warning] Invalid lookup table. Nothing to update.');
    return;
  }


  var lutMin = mat.shaderProgram().uniform('lutMin'),
      lutMax = mat.shaderProgram().uniform('lutMax');

  lutMin.set(lut.range()[0]);
  lutMax.set(lut.range()[1]);

  // This will replace the existing lookup table
  mat.setAttribute(lut);
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of solid color material
 *
 * Helper function to create geometry material
 *
 * @returns {vgl.material}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createSolidColorMaterial = function (color) {
  'use strict';
  if (!color) {
    color = [1.0, 1.0, 1.0];
  }

  var mat = new vgl.material(),
      blend = new vgl.blend(),
      prog = new vgl.shaderProgram(),
      vertexShader = vgl.utils.createVertexShaderSolidColor(vgl.GL),
      fragmentShader = vgl.utils.createFragmentShaderSolidColor(vgl.GL, color),
      posVertAttr = new vgl.vertexAttribute('vertexPosition'),
      pointsizeUniform = new vgl.floatUniform('pointSize', 5.0),
      opacityUniform = new vgl.floatUniform('opacity', 1.0),
      modelViewUniform = new vgl.modelViewUniform('modelViewMatrix'),
      projectionUniform = new vgl.projectionUniform('projectionMatrix');

  prog.addVertexAttribute(posVertAttr, vgl.vertexAttributeKeys.Position);
  prog.addUniform(pointsizeUniform);
  prog.addUniform(opacityUniform);
  prog.addUniform(modelViewUniform);
  prog.addUniform(projectionUniform);
  prog.addShader(fragmentShader);
  prog.addShader(vertexShader);
  mat.addAttribute(prog);
  mat.addAttribute(blend);

  return mat;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of point sprites material
 *
 * Helper function to create point sprites material
 *
 * @returns {vgl.material}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createPointSpritesMaterial = function (image, lut) {
  'use strict';
  var scalarRange = lut === undefined ? [0, 1] : lut.range(),
      mat = new vgl.material(),
      blend = new vgl.blend(),
      prog = new vgl.shaderProgram(),
      vertexShader = vgl.utils.createPointSpritesVertexShader(vgl.GL),
      fragmentShader = vgl.utils.createPointSpritesFragmentShader(vgl.GL),
      posVertAttr = new vgl.vertexAttribute('vertexPosition'),
      colorVertAttr = new vgl.vertexAttribute('vertexColor'),
      heightUniform = new vgl.floatUniform('height', 0.0),
      vertexColorWeightUniform =
        new vgl.floatUniform('vertexColorWeight', 0.0),
      lutMinUniform = new vgl.floatUniform('lutMin', scalarRange[0]),
      lutMaxUniform = new vgl.floatUniform('lutMax', scalarRange[1]),
      modelViewUniform = new vgl.modelViewUniform('modelViewMatrix'),
      projectionUniform = new vgl.projectionUniform('projectionMatrix'),
      samplerUniform = new vgl.uniform(vgl.GL.INT, 'opacityLookup'),
      scalarsToColors = new vgl.uniform(vgl.GL.INT, 'scalarsToColors'),
      useScalarsToColors = new vgl.uniform(vgl.GL.INT, 'useScalarsToColors'),
      useVertexColors = new vgl.uniform(vgl.GL.INT, 'useVertexColors'),
      pointSize = new vgl.uniform(vgl.GL.FLOAT_VEC2, 'pointSize'),
      texture = new vgl.texture();

  samplerUniform.set(0);
  scalarsToColors.set(1);
  useScalarsToColors.set(0);
  useVertexColors.set(0);
  pointSize.set([1.0, 1.0]);

  prog.addVertexAttribute(posVertAttr, vgl.vertexAttributeKeys.Position);
  prog.addVertexAttribute(colorVertAttr, vgl.vertexAttributeKeys.Color);
  prog.addUniform(heightUniform);
  prog.addUniform(vertexColorWeightUniform);
  prog.addUniform(modelViewUniform);
  prog.addUniform(projectionUniform);
  prog.addUniform(samplerUniform);
  prog.addUniform(useVertexColors);
  prog.addUniform(useScalarsToColors);
  prog.addUniform(pointSize);
  prog.addShader(fragmentShader);
  prog.addShader(vertexShader);
  mat.addAttribute(prog);
  mat.addAttribute(blend);

  if (lut) {
    prog.addUniform(scalarsToColors);
    useScalarsToColors.set(1);
    prog.addUniform(lutMinUniform);
    prog.addUniform(lutMaxUniform);
    lut.setTextureUnit(1);
    mat.addAttribute(lut);
  }

  texture.setImage(image);
  texture.setTextureUnit(0);
  mat.addAttribute(texture);
  return mat;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of an actor that contains a plane geometry
 *
 * Function to create a plane node This method will create a plane actor
 * with texture coordinates, eventually normal, and plane material.
 *
 * @returns {vgl.actor}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createPlane = function (originX, originY, originZ,
                                 point1X, point1Y, point1Z,
                                 point2X, point2Y, point2Z) {
  'use strict';
  var mapper = new vgl.mapper(),
      planeSource = new vgl.planeSource(),
      mat = vgl.utils.createGeometryMaterial(),
      actor = new vgl.actor();

  planeSource.setOrigin(originX, originY, originZ);
  planeSource.setPoint1(point1X, point1Y, point1Z);
  planeSource.setPoint2(point2X, point2Y, point2Z);

  mapper.setGeometryData(planeSource.create());
  actor.setMapper(mapper);
  actor.setMaterial(mat);

  return actor;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of an actor that contains a texture plane geometry
 *
 * Helper function to create a plane textured node This method will create
 * a plane actor with texture coordinates, eventually normal, and plane
 * material.
 *
 * @returns {vgl.actor}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createTexturePlane = function (originX, originY, originZ,
                                        point1X, point1Y, point1Z,
                                        point2X, point2Y, point2Z,
                                        isRgba) {
  'use strict';
  var mapper = new vgl.mapper(),
      planeSource = new vgl.planeSource(),
      mat = vgl.utils.createTextureMaterial(isRgba,
                                            [originX, originY, originZ]),
      actor = new vgl.actor();

  planeSource.setPoint1(point1X - originX, point1Y - originY, point1Z - originZ);
  planeSource.setPoint2(point2X - originX, point2Y - originY, point2Z - originZ);
  mapper.setGeometryData(planeSource.create());

  actor.setMapper(mapper);
  actor.setMaterial(mat);

  return actor;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of an actor that contains points
 *
 * Helper function to create a point node This method will create a point
 * actor with texture coordinates, eventually normal, and plane material.
 *
 * @returns {vgl.actor}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createPoints = function (positions, size, colors, texcoords, opacity) {
  'use strict';
  if (!positions) {
    console.log('[ERROR] Cannot create points without positions');
    return null;
  }

  opacity = opacity === undefined ? 1.0 : opacity;
  var mapper = new vgl.mapper(),
      pointSource = new vgl.pointSource(),
      mat = vgl.utils.createPointGeometryMaterial(opacity),
      actor = new vgl.actor();

  pointSource.setPositions(positions);
  if (colors) {
    pointSource.setColors(colors);
  }

  if (texcoords) {
    pointSource.setTextureCoordinates(texcoords);
  }

  if (size) {
    pointSource.setSize(size);
  } else {
    pointSource.setSize(1.0);
  }

  mapper.setGeometryData(pointSource.create());
  actor.setMapper(mapper);
  actor.setMaterial(mat);

  return actor;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of an actor that contains point sprites
 *
 * Helper function to create a point sprites node This method will create
 * a point sprites actor with texture coordinates, normals, and a point sprites
 * material.
 *
 * @returns {vgl.actor}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createPointSprites = function (image, positions, colors,
                                              texcoords) {
  'use strict';
  if (!image) {
    console.log('[ERROR] Point sprites requires an image');
    return null;
  }

  if (!positions) {
    console.log('[ERROR] Cannot create points without positions');
    return null;
  }

  var mapper = new vgl.mapper(),
      pointSource = new vgl.pointSource(),
      mat = vgl.utils.createPointSpritesMaterial(image),
      actor = new vgl.actor();

  pointSource.setPositions(positions);
  if (colors) {
    pointSource.setColors(colors);
  }

  if (texcoords) {
    pointSource.setTextureCoordinates(texcoords);
  }

  mapper.setGeometryData(pointSource.create());
  actor.setMapper(mapper);
  actor.setMaterial(mat);

  return actor;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create lines given positions, colors, and desired length
 *
 * @param positions
 * @param colors
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createLines = function (positions, colors) {
  'use strict';
  if (!positions) {
    console.log('[ERROR] Cannot create points without positions');
    return null;
  }

  var mapper = new vgl.mapper(),
      lineSource = new vgl.lineSource(),
      mat = vgl.utils.createGeometryMaterial(),
      actor = new vgl.actor();

  lineSource.setPositions(positions);
  if (colors) {
    lineSource.setColors(colors);
  }

  mapper.setGeometryData(lineSource.create());
  actor.setMapper(mapper);
  actor.setMaterial(mat);

  return actor;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create color legend
 *
 * @param lookupTable
 * @param width
 * @param height
 * @param origin
 * @param divs
 * @returns {Array}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.createColorLegend = function (varname, lookupTable, origin,
                                             width, height, countMajor,
                                             countMinor) {
  'use strict';

  if (!lookupTable) {
    console.log('[error] Invalid lookup table');
    return [];
  }

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Create labels for the legend
   *
   * @param ticks
   * @param range
   * @param divs
   */
  //////////////////////////////////////////////////////////////////////////////
  function createLabels(varname, positions, range) {
    if (!positions) {
      console.log('[error] Create labels requires positions (x,y,z) array');
      return;
    }

    if (positions.length % 3 !== 0) {
      console.log('[error] Create labels require positions array contain 3d points');
      return;
    }

    if (!range) {
      console.log('[error] Create labels requires Valid range');
      return;
    }

    var actor = null,
        size = vgl.utils.computePowerOfTwo(48),
        index = 0,
        actors = [],
        origin = [],
        pt1 = [],
        pt2 = [],
        delta = (positions[6] - positions[0]),
        axisLabelOffset = 4, i;

    origin.length = 3;
    pt1.length = 3;
    pt2.length = 3;

    // For now just create labels for end points
    for (i = 0; i < 2; i += 1) {
      index = i * (positions.length - 3);

      origin[0] = positions[index] - delta;
      origin[1] = positions[index + 1] - 2 * delta;
      origin[2] = positions[index + 2];

      pt1[0] = positions[index] + delta;
      pt1[1] = origin[1];
      pt1[2] = origin[2];

      pt2[0] = origin[0];
      pt2[1] = positions[1];
      pt2[2] = origin[2];

      actor = vgl.utils.createTexturePlane(
        origin[0], origin[1], origin[2],
        pt1[0], pt1[1], pt1[2],
        pt2[0], pt2[1], pt2[2], true);

      actor.setReferenceFrame(vgl.boundingObject.ReferenceFrame.Absolute);
      actor.material().setBinNumber(vgl.material.RenderBin.Overlay);
      actor.material().addAttribute(vgl.utils.create2DTexture(
        range[i].toFixed(2).toString(), 12, null));
      actors.push(actor);
    }

    // Create axis label
    origin[0] = (positions[0] + positions[positions.length - 3]  - size) * 0.5;
    origin[1] = positions[1] + axisLabelOffset;
    origin[2] = positions[2];

    pt1[0] = origin[0] + size;
    pt1[1] = origin[1];
    pt1[2] = origin[2];

    pt2[0] = origin[0];
    pt2[1] = origin[1] + size;
    pt2[2] = origin[2];

    actor = vgl.utils.createTexturePlane(
      origin[0], origin[1], origin[2],
      pt1[0], pt1[1], pt1[2],
      pt2[0], pt2[1], pt2[2], true);
    actor.setReferenceFrame(vgl.boundingObject.ReferenceFrame.Absolute);
    actor.material().setBinNumber(vgl.material.RenderBin.Overlay);
    actor.material().addAttribute(vgl.utils.create2DTexture(
      varname, 24, null));
    actors.push(actor);

    return actors;
  }

  //////////////////////////////////////////////////////////////////////////////
  // TODO Currently we assume that the ticks are laid on x-axis
  // and this is on a 2D plane (ignoring Z axis. For now lets
  // not draw minor ticks.
  /**
   * Create ticks and labels
   *
   * @param originX
   * @param originY
   * @param originZ
   * @param pt1X
   * @param pt1Y
   * @param pt1Z
   * @param pt2X
   * @param pt2Y
   * @param pt2Z
   * @param divs
   * @param heightMajor
   * @param heightMinor
   * @returns {Array} Returns array of vgl.actor
   */
  //////////////////////////////////////////////////////////////////////////////
  function createTicksAndLabels(varname, lut,
                        originX, originY, originZ,
                        pt1X, pt1Y, pt1Z,
                        pt2X, pt2Y, pt2Z,
                        countMajor, countMinor,
                        heightMajor, heightMinor) {
    heightMinor = heightMinor; /* unused parameter */
    var width = pt2X - pt1X,
        index = null,
        delta = width / countMajor,
        positions = [],
        actors = [];

    for (index = 0; index <= countMajor; index += 1) {
      positions.push(pt1X + delta * index);
      positions.push(pt1Y);
      positions.push(pt1Z);

      positions.push(pt1X + delta * index);
      positions.push(pt1Y + heightMajor);
      positions.push(pt1Z);
    }

    // TODO: Fix this
    //actor = vgl.utils.createLines(positions, null);
    //actor.setReferenceFrame(vgl.boundingObject.ReferenceFrame.Absolute);
    //actor.material().setBinNumber(vgl.material.RenderBin.Overlay);
    //actors.push(actor);

    actors = actors.concat(createLabels(varname, positions, lut.range()));
    return actors;
  }

  // TODO Currently we create only one type of legend
  var pt1X = origin[0] + width,
      pt1Y = origin[1],
      pt1Z = 0.0,
      pt2X = origin[0],
      pt2Y = origin[1] + height,
      pt2Z = 0.0,
      actors = [],
      actor = null,
      mat = null,
      group = vgl.groupNode();

  actor = vgl.utils.createTexturePlane(
    origin[0], origin[1], origin[2],
    pt1X, pt1Y, pt1Z,
    pt2X, pt2Y, pt2Z, true
  );

  mat = actor.material();
  mat.addAttribute(lookupTable);
  actor.setMaterial(mat);
  group.addChild(actor);
  actor.material().setBinNumber(vgl.material.RenderBin.Overlay);
  actor.setReferenceFrame(vgl.boundingObject.ReferenceFrame.Absolute);
  actors.push(actor);
  actors = actors.concat(createTicksAndLabels(
                          varname,
                          lookupTable,
                          origin[0], origin[1], origin[1],
                          pt2X, pt1Y, pt1Z,
                          pt1X, pt1Y, pt1Z,
                          countMajor, countMinor, 5, 3));

  // TODO This needs to change so that we can return a group node
  // which should get appended to the scene graph
  return actors;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create 2D texture by rendering text using canvas2D context
 *
 * @param textToWrite
 * @param textSize
 * @param color
 * @returns {vgl.texture}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.utils.create2DTexture = function (textToWrite, textSize,
  color, font, alignment, baseline, bold) {
  'use strict';

  var canvas = document.getElementById('textRendering'),
      ctx = null,
      texture = vgl.texture();

  font = font || 'sans-serif';
  alignment = alignment || 'center';
  baseline = baseline || 'bottom';

  if (typeof bold === 'undefined') {
    bold = true;
  }

  if (!canvas) {
    canvas = document.createElement('canvas');
  }
  ctx = canvas.getContext('2d');

  canvas.setAttribute('id', 'textRendering');
  canvas.style.display = 'none';

  // Make width and height equal so that we get pretty looking text.
  canvas.height = vgl.utils.computePowerOfTwo(8 * textSize);
  canvas.width = canvas.height;

  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // This determines the text colour, it can take a hex value or rgba value
  // (e.g. rgba(255,0,0,0.5))
  ctx.fillStyle = 'rgba(200, 85, 10, 1.0)';

  // This determines the alignment of text, e.g. left, center, right
  ctx.textAlign = alignment;

  // This determines the baseline of the text, e.g. top, middle, bottom
  ctx.textBaseline = baseline;

  // This determines the size of the text and the font family used
  ctx.font = 4 * textSize + 'px ' + font;
  if (bold) {
    ctx.font = 'bold ' + ctx.font;
  }

  ctx.fillText(textToWrite, canvas.width / 2, canvas.height / 2, canvas.width);

  texture.setImage(canvas);
  texture.updateDimensions();

  return texture;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, vec4, inherit*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class picker
 *
 * @class vgl.picker
 * @returns {vgl.picker}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.picker = function () {
  'use strict';

  if (!(this instanceof vgl.picker)) {
    return new vgl.picker();
  }
  vgl.object.call(this);

  /** @private */
  var m_actors = [];

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get actors intersected
   */
  ////////////////////////////////////////////////////////////////////////////
  this.getActors = function () {
    return m_actors;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Perform pick operation
   */
  ////////////////////////////////////////////////////////////////////////////
  this.pick = function (selectionX, selectionY, renderer) {
    // Check if variables are acceptable
    if (selectionX === undefined) {
      return 0;
    }
    if (selectionY === undefined) {
      return 0;
    }
    if (renderer === undefined) {
      return 0;
    }

    // Clean list of actors intersected previously
    m_actors = [];

    //
    var camera = renderer.camera(),
        width = renderer.width(),
        height = renderer.height(),
        fpoint = camera.focalPoint(),
        focusWorldPt = vec4.fromValues(fpoint[0], fpoint[1], fpoint[2], 1.0),
        focusDisplayPt = renderer.worldToDisplay(
          focusWorldPt, camera.viewMatrix(),
        camera.projectionMatrix(), width, height),
        displayPt = vec4.fromValues(selectionX,
                      selectionY, focusDisplayPt[2], 1.0),
        // Convert selection point into world coordinates
        worldPt = renderer.displayToWorld(displayPt, camera.viewMatrix(),
                    camera.projectionMatrix(), width, height),
        cameraPos = camera.position(), ray = [], actors, count, i, bb,
        tmin, tmax, tymin, tymax, tzmin, tzmax, actor;

    for (i = 0; i < 3; i += 1) {
      ray[i] = worldPt[i] - cameraPos[i];
    }

    // Go through all actors and check if intersects
    actors = renderer.sceneRoot().children();
    count = 0;

    for (i = 0; i < actors.length; i += 1) {
      actor = actors[i];
      if (actor.visible() === true) {
        bb = actor.bounds();
        // Ray-aabb intersection - Smits' method
        if (ray[0] >= 0) {
          tmin = (bb[0] - cameraPos[0]) / ray[0];
          tmax = (bb[1] - cameraPos[0]) / ray[0];
        } else {
          tmin = (bb[1] - cameraPos[0]) / ray[0];
          tmax = (bb[0] - cameraPos[0]) / ray[0];
        }
        if (ray[1] >= 0) {
          tymin = (bb[2] - cameraPos[1]) / ray[1];
          tymax = (bb[3] - cameraPos[1]) / ray[1];
        } else {
          tymin = (bb[3] - cameraPos[1]) / ray[1];
          tymax = (bb[2] - cameraPos[1]) / ray[1];
        }
        if ((tmin > tymax) || (tymin > tmax)) {
          //jscs:disable disallowKeywords
          continue;
          //jscs:enable disallowKeywords
        }


        if (tymin > tmin) {
          tmin = tymin;
        }
        if (tymax < tmax) {
          tmax = tymax;
        }
        if (ray[2] >= 0) {
          tzmin = (bb[4] - cameraPos[2]) / ray[2];
          tzmax = (bb[5] - cameraPos[2]) / ray[2];
        } else {
          tzmin = (bb[5] - cameraPos[2]) / ray[2];
          tzmax = (bb[4] - cameraPos[2]) / ray[2];
        }
        if ((tmin > tzmax) || (tzmin > tmax)) {
          //jscs:disable disallowKeywords
          continue;
          //jscs:enable disallowKeywords
        }
        if (tzmin > tmin) {
          tmin = tzmin;
        }
        if (tzmax < tmax) {
          tmax = tzmax;
        }

        m_actors[count] = actor;
        count += 1;
      }
    }
    return count;
  };

  return this;
};

inherit(vgl.picker, vgl.object);

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, $*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of shapefile reader
 *
 * This contains code that reads a shapefile and produces vgl geometries
 *
 * @class
 * @returns {vgl.shapefileReader}
 */
//////////////////////////////////////////////////////////////////////////////
vgl.shapefileReader = function () {
  'use strict';

  if (!(this instanceof vgl.shapefileReader)) {
    return new vgl.shapefileReader();
  }

  var m_that = this;
  var SHP_NULL = 0;
  var SHP_POINT = 1;
  var SHP_POLYGON = 5;
  var SHP_POLYLINE = 3;

  this.int8 = function (data, offset) {
    return data.charCodeAt (offset);
  };

  /*jshint bitwise: false */
  this.bint32 = function (data, offset) {
    return (
      ((data.charCodeAt (offset) & 0xff) << 24) +
        ((data.charCodeAt (offset + 1) & 0xff) << 16) +
        ((data.charCodeAt (offset + 2) & 0xff) << 8) +
        (data.charCodeAt (offset + 3) & 0xff)
    );
  };

  this.lint32 = function (data, offset) {
    return (
      ((data.charCodeAt (offset + 3) & 0xff) << 24) +
        ((data.charCodeAt (offset + 2) & 0xff) << 16) +
        ((data.charCodeAt (offset + 1) & 0xff) << 8) +
        (data.charCodeAt (offset) & 0xff)
    );
  };

  this.bint16 = function (data, offset) {
    return (
      ((data.charCodeAt (offset) & 0xff) << 8) +
        (data.charCodeAt (offset + 1) & 0xff)
    );
  };

  this.lint16 = function (data, offset) {
    return (
      ((data.charCodeAt (offset + 1) & 0xff) << 8) +
        (data.charCodeAt (offset) & 0xff)
    );
  };

  this.ldbl64 = function (data, offset) {
    var b0 = data.charCodeAt (offset) & 0xff;
    var b1 = data.charCodeAt (offset + 1) & 0xff;
    var b2 = data.charCodeAt (offset + 2) & 0xff;
    var b3 = data.charCodeAt (offset + 3) & 0xff;
    var b4 = data.charCodeAt (offset + 4) & 0xff;
    var b5 = data.charCodeAt (offset + 5) & 0xff;
    var b6 = data.charCodeAt (offset + 6) & 0xff;
    var b7 = data.charCodeAt (offset + 7) & 0xff;

    var sign = 1 - 2 * (b7 >> 7);
    var exp = (((b7 & 0x7f) << 4) + ((b6 & 0xf0) >> 4)) - 1023;
    //var frac = (b6 & 0x0f) * Math.pow (2, -4) + b5 * Math.pow (2, -12) + b4 *
    // Math.pow (2, -20) + b3 * Math.pow (2, -28) + b2 * Math.pow (2, -36) + b1 *
    // Math.pow (2, -44) + b0 * Math.pow (2, -52);

    //return sign * (1 + frac) * Math.pow (2, exp);
    var frac = (b6 & 0x0f) * Math.pow (2, 48) + b5 * Math.pow (2, 40) + b4 *
                 Math.pow (2, 32) + b3 * Math.pow (2, 24) + b2 *
                 Math.pow (2, 16) + b1 * Math.pow (2, 8) + b0;

    return sign * (1 + frac * Math.pow (2, -52)) * Math.pow (2, exp);
  };

  this.lfloat32 = function (data, offset) {
    var b0 = data.charCodeAt (offset) & 0xff;
    var b1 = data.charCodeAt (offset + 1) & 0xff;
    var b2 = data.charCodeAt (offset + 2) & 0xff;
    var b3 = data.charCodeAt (offset + 3) & 0xff;

    var sign = 1 - 2 * (b3 >> 7);
    var exp = (((b3 & 0x7f) << 1) + ((b2 & 0xfe) >> 7)) - 127;
    var frac = (b2 & 0x7f) * Math.pow (2, 16) + b1 * Math.pow (2, 8) + b0;

    return sign * (1 + frac * Math.pow (2, -23)) * Math.pow (2, exp);
  };
  /*jshint bitwise: true */

  this.str = function (data, offset, length) {
    var chars = [];
    var index = offset;
    while (index < offset + length) {
      var c = data[index];
      if (c.charCodeAt (0) !== 0) {
        chars.push (c);
      } else {
        break;
      }
      index += 1;
    }
    return chars.join ('');
  };

  this.readHeader = function (data) {
    var code = this.bint32(data, 0);
    var length = this.bint32(data, 24);
    var version = this.lint32(data, 28);
    var shapetype = this.lint32(data, 32);

    /*
    var xmin = this.ldbl64(data, 36);
    var ymin = this.ldbl64(data, 44);
    var xmax = this.ldbl64(data, 52);
    var ymax = this.ldbl64(data, 60);
    */
    return {
      code: code,
      length: length,
      version: version,
      shapetype: shapetype
      // bounds: new Box (vect (xmin, ymin), vect (xmax, ymax))
    };
  };

  this.loadShx = function (data) {
    var indices = [];
    var appendIndex = function (offset) {
      indices.push (2 * m_that.bint32(data, offset));
      return offset + 8;
    };
    var offset = 100;
    while (offset < data.length) {
      offset = appendIndex (offset);
    }
    return indices;
  };

  this.Shapefile = function (options) {
    var path = options.path;
    $.ajax ({
      url: path + '.shx',
      mimeType: 'text/plain; charset=x-user-defined',
      success: function (data) {
        var indices = this.loadShx(data);
        $.ajax ({
          url: path + '.shp',
          mimeType: 'text/plain; charset=x-user-defined',
          success: function (data) {
            $.ajax ({
              url: path + '.dbf',
              mimeType: 'text/plain; charset=x-user-defined',
              success: function (dbf_data) {
                var layer = this.loadShp (data, dbf_data, indices, options);
                options.success (layer);
              }
            });
          }
        });
      }
    });
  };

  this.localShapefile = function (options) {
    var shxFile = options.shx;
    var shpFile = options.shp;
    var dbfFile = options.dbf;
    var shxReader = new FileReader();
    shxReader.onloadend = function () {
      var indices = m_that.loadShx(shxReader.result);
      var shpReader = new FileReader();

      shpReader.onloadend = function () {
        var shpData = shpReader.result;

        var dbfReader = new FileReader();
        dbfReader.onloadend = function () {
          var dbfData = dbfReader.result;
          var layer = m_that.loadShp(shpData, dbfData, indices, options);
          options.success(layer);
        };
        dbfReader.readAsBinaryString(dbfFile);
      };
      shpReader.readAsBinaryString(shpFile);
    };
    shxReader.readAsBinaryString(shxFile);
  };

  this.loadDBF = function (data) {
    var readHeader = function (offset) {
      var name = m_that.str(data, offset, 10);
      var type = m_that.str(data, offset + 11, 1);
      var length = m_that.int8(data, offset + 16);
      return {
        name: name,
        type: type,
        length: length
      };
    };

    // Level of the dBASE file
    var level = m_that.int8(data, 0);
    if (level === 4) {
      throw 'Level 7 dBASE not supported';
    }

    // Date of last update
    /*
    var year = m_that.int8(data, 1);
    var month = m_that.int8(data, 2);
    var day = m_that.int8(data, 3);
    */

    var num_entries = m_that.lint32(data, 4);
    var header_size = m_that.lint16(data, 8);
    var record_size = m_that.lint16(data, 10);

    var FIELDS_START = 32;
    var HEADER_LENGTH = 32;

    var header_offset = FIELDS_START;
    var headers = [];
    while (header_offset < header_size - 1) {
      headers.push (readHeader(header_offset));
      header_offset += HEADER_LENGTH;
    }

    var records = [];
    var record_offset = header_size;
    while (record_offset < header_size + num_entries * record_size) {
      var declare = m_that.str(data, record_offset, 1);
      if (declare === '*') {
        // Record size in the header include the size of the delete indicator
        record_offset += record_size;
      } else {
        // Move offset to the start of the actual data
        record_offset += 1;
        var record = {};
        for (var i = 0; i < headers.length; i  += 1) {
          var header = headers[i];
          var value;
          if (header.type === 'C') {
            value = m_that.str(data, record_offset, header.length).trim ();
          } else if (header.type === 'N') {
            value = parseFloat (m_that.str (data, record_offset, header.length));
          }
          record_offset += header.length;
          record[header.name] = value;
        }
        records.push(record);
      }
    }
    return records;
  };

  this.loadShp = function (data, dbf_data, indices, options) {
    options = options; /* unused parameter */
    var features = [];
    var readRing = function (offset, start, end) {
      var ring = [];
      for (var i = end - 1; i >= start; i -= 1) {
        var x = m_that.ldbl64(data, offset + 16 * i);
        var y = m_that.ldbl64(data, offset + 16 * i + 8);
        ring.push ([x, y]);
      }
      //if (ring.length <= 3)
      // return [];
      return ring;
    };

    var readRecord = function (offset) {
      // var index = m_that.bint32(data, offset);
      // var record_length = m_that.bint32(data, offset + 4);
      var record_offset = offset + 8;
      var geom_type = m_that.lint32(data, record_offset);
      var num_parts, num_points, parts_start, points_start, i,
          start, end, ring, rings;

      if (geom_type === SHP_NULL) {
        console.log ('NULL Shape');
        //return offset + 12;
      } else if (geom_type === SHP_POINT) {
        var x = m_that.ldbl64(data, record_offset + 4);
        var y = m_that.ldbl64(data, record_offset + 12);

        features.push ({
          type: 'Point',
          attr: {},
          geom: [[x, y]]
        });
      } else if (geom_type === SHP_POLYGON) {
        num_parts = m_that.lint32(data, record_offset + 36);
        num_points = m_that.lint32(data, record_offset + 40);

        parts_start = offset + 52;
        points_start = offset + 52 + 4 * num_parts;

        rings = [];
        for (i = 0; i < num_parts; i  += 1) {
          start = m_that.lint32(data, parts_start + i * 4);
          if (i + 1 < num_parts) {
            end = m_that.lint32(data, parts_start + (i + 1) * 4);
          } else {
            end = num_points;
          }
          ring = readRing (points_start, start, end);
          rings.push (ring);
        }
        features.push ({
          type: 'Polygon',
          attr: {},
          geom: [rings]
        });
      } else if (geom_type === SHP_POLYLINE) {
        num_parts = m_that.lint32(data, record_offset + 36);
        num_points = m_that.lint32(data, record_offset + 40);

        parts_start = offset + 52;
        points_start = offset + 52 + 4 * num_parts;

        rings = [];
        for (i = 0; i < num_parts; i  += 1) {
          start = m_that.lint32(data, parts_start + i * 4);
          if (i + 1 < num_parts) {
            end = m_that.lint32(data, parts_start + (i + 1) * 4);
          } else {
            end = num_points;
          }
          ring = readRing (points_start, start, end);
          rings.push (ring);
        }
        features.push ({
          type: 'Polyline',
          attr: {},
          geom: [rings]
        });
      } else {
        throw 'Not Implemented: ' + geom_type;
      }
      //return offset + 2 * record_length + SHP_HEADER_LEN;
    };

    var attr = this.loadDBF(dbf_data), i;

    //var offset = 100;
    //while (offset < length * 2) {
    // offset = readRecord (offset);
    //}
    for (i = 0; i < indices.length; i  += 1) {
      var offset = indices[i];
      readRecord (offset);
    }

    var layer = []; //new Layer ();

    for (i = 0; i < features.length; i  += 1) {
      var feature = features[i];
      feature.attr = attr[i];
      layer.push (feature);
    }
    return layer;
  };

  return this;
};

//////////////////////////////////////////////////////////////////////////////
/**
 * @module vgl
 */

/*global vgl, mat4, unescape, Float32Array, Int8Array, Uint16Array*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//
// vbgModule.vtkReader class
// This contains code that unpack a json base64 encoded vtkdataset,
// such as those produced by ParaView's webGL exporter (where much
// of the code originated from) and convert it to VGL representation.
//
//////////////////////////////////////////////////////////////////////////////

vgl.vtkReader = function () {
  'use strict';

  if (!(this instanceof vgl.vtkReader)) {
    return new vgl.vtkReader();
  }

  var m_base64Chars =
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
     'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
     'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
     'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
     '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'],
  m_reverseBase64Chars = [],
  m_vtkRenderedList = {},
  m_vtkObjectCount = 0,
  m_vtkScene = null,
  m_node = null,
  END_OF_INPUT = -1,
  m_base64Str = '',
  m_base64Count = 0,
  m_pos = 0,
  m_viewer = null,
  i = 0;

  //initialize the array here if not already done.
  if (m_reverseBase64Chars.length === 0) {
    for (i = 0; i < m_base64Chars.length; i += 1) {
      m_reverseBase64Chars[m_base64Chars[i]] = i;
    }
  }



  ////////////////////////////////////////////////////////////////////////////
  /**
   * ntos
   *
   * @param n
   * @returns unescaped n
   */
  ////////////////////////////////////////////////////////////////////////////
  this.ntos = function (n) {
    var unN;

    unN = n.toString(16);
    if (unN.length === 1) {
      unN = '0' + unN;
    }
    unN = '%' + unN;

    return unescape(unN);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * readReverseBase64
   *
   * @returns
   */
  ////////////////////////////////////////////////////////////////////////////
  this.readReverseBase64 = function () {
    var nextCharacter;

    if (!m_base64Str) {
      return END_OF_INPUT;
    }

    while (true) {
      if (m_base64Count >= m_base64Str.length) {
        return END_OF_INPUT;
      }
      nextCharacter = m_base64Str.charAt(m_base64Count);
      m_base64Count += 1;

      if (m_reverseBase64Chars[nextCharacter]) {
        return m_reverseBase64Chars[nextCharacter];
      }
      if (nextCharacter === 'A') {
        return 0;
      }
    }

    return END_OF_INPUT;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * decode64
   *
   * @param str
   * @returns result
   */
  ////////////////////////////////////////////////////////////////////////////
  this.decode64 = function (str) {
    var result = '',
        inBuffer = new Array(4),
        done = false;

    m_base64Str = str;
    m_base64Count = 0;

    while (!done &&
           (inBuffer[0] = this.readReverseBase64()) !== END_OF_INPUT &&
           (inBuffer[1] = this.readReverseBase64()) !== END_OF_INPUT) {
      inBuffer[2] = this.readReverseBase64();
      inBuffer[3] = this.readReverseBase64();
      /*jshint bitwise: false */
      result += this.ntos((((inBuffer[0] << 2) & 0xff) | inBuffer[1] >> 4));
      if (inBuffer[2] !== END_OF_INPUT) {
        result +=  this.ntos((((inBuffer[1] << 4) & 0xff) | inBuffer[2] >> 2));
        if (inBuffer[3] !== END_OF_INPUT) {
          result +=  this.ntos((((inBuffer[2] << 6) & 0xff) | inBuffer[3]));
        } else {
          done = true;
        }
      } else {
        done = true;
      }
      /*jshint bitwise: true */
    }

    return result;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * readNumber
   *
   * @param ss
   * @returns v
   */
  ////////////////////////////////////////////////////////////////////////////
  this.readNumber = function (ss) {
    //jshint plusplus: false, bitwise: false
    var v = ((ss[m_pos++]) +
             (ss[m_pos++] << 8) +
             (ss[m_pos++] << 16) +
             (ss[m_pos++] << 24));
    //jshint plusplus: true, bitwise: true
    return v;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * readF3Array
   *
   * @param numberOfPoints
   * @param ss
   * @returns points
   */
  ////////////////////////////////////////////////////////////////////////////
  this.readF3Array = function (numberOfPoints, ss) {
    var size = numberOfPoints * 4 * 3, test = new Int8Array(size),
        points = null, i;

    for (i = 0; i < size; i += 1) {
      test[i] = ss[m_pos];
      m_pos += 1;
    }

    points = new Float32Array(test.buffer);

    return points;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * readColorArray
   *
   * @param numberOfPoints
   * @param ss
   * @param vglcolors
   * @returns points
   */
  ////////////////////////////////////////////////////////////////////////////
  this.readColorArray = function (numberOfPoints, ss, vglcolors) {
    var i, idx = 0, tmp = new Array(numberOfPoints * 3);
    //jshint plusplus: false
    for (i = 0; i < numberOfPoints; i += 1) {
      tmp[idx++] = ss[m_pos++] / 255.0;
      tmp[idx++] = ss[m_pos++] / 255.0;
      tmp[idx++] = ss[m_pos++] / 255.0;
      m_pos++;
    }
    //jshint plusplus: true
    vglcolors.insert(tmp);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * parseObject
   *
   * @param buffer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.parseObject = function (vtkObject) {
    var geom = new vgl.geometryData(), mapper = vgl.mapper(), ss = [],
        type = null, data = null, size, matrix = null, material = null,
        actor, colorMapData, shaderProg, opacityUniform, lookupTable,
        colorTable, windowSize, width, height, position;

    //dehexlify
    //data = this.decode64(vtkObject.data);
    data = atob(vtkObject.data);
    //jshint bitwise: false
    for (i = 0; i < data.length; i += 1) {
      ss[i] = data.charCodeAt(i) & 0xff;
    }
    //jshint bitwise: true

    //Determine the Object type
    m_pos = 0;
    size = this.readNumber(ss);
    type = String.fromCharCode(ss[m_pos]);
    m_pos += 1;
    geom.setName(type);

    // Lines
    if (type === 'L') {
      matrix = this.parseLineData(geom, ss);
      material = vgl.utils.createGeometryMaterial();
    // Mesh
    } else if (type === 'M') {
      matrix = this.parseMeshData(geom, ss);
      material = vgl.utils.createPhongMaterial();
    // Points
    } else if (type === 'P') {
      matrix = this.parsePointData(geom, ss);
      material = vgl.utils.createGeometryMaterial();
    // ColorMap
    } else if (type === 'C') {
      colorMapData = this.parseColorMapData(geom, ss, size);
      colorTable = [];

      for (i = 0; i < colorMapData.colors.length; i += 1) {
        colorTable.push(colorMapData.colors[i][1]);
        colorTable.push(colorMapData.colors[i][2]);
        colorTable.push(colorMapData.colors[i][3]);
        colorTable.push(colorMapData.colors[i][0] * 255);
      }

      lookupTable = new vgl.lookupTable();
      lookupTable.setColorTable(colorTable);

      windowSize = m_viewer.renderWindow().windowSize();
      width = colorMapData.size[0] * windowSize[0];
      height = colorMapData.size[1] * windowSize[1];

      position = [colorMapData.position[0] * windowSize[0],
                  (1 - colorMapData.position[1]) * windowSize[1], 0];
      position[1] = position[1] - height;

      // For now hardcode the height
      height = 30;

      return vgl.utils.createColorLegend(colorMapData.title,
          lookupTable, position, width, height, 3, 0);
    // Unknown
    } else {
      console.log('Ignoring unrecognized encoded data type ' + type);
    }

    mapper.setGeometryData(geom);

    //default opacity === solid. If were transparent, set it lower.
    if (vtkObject.hasTransparency) {
      shaderProg = material.shaderProgram();
      opacityUniform = shaderProg.uniform('opacity');
      console.log('opacity ', vtkObject.opacity);
      opacityUniform.set(vtkObject.opacity);
      material.setBinNumber(1000);
    }

    actor = vgl.actor();
    actor.setMapper(mapper);
    actor.setMaterial(material);
    actor.setMatrix(mat4.transpose(mat4.create(), matrix));

    return [actor];
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * parseLineData
   *
   * @param geom, ss
   * @returns matrix
   */
  ////////////////////////////////////////////////////////////////////////////
  this.parseLineData = function (geom, ss) {
    var vglpoints = null, vglcolors = null, vgllines = null,
        matrix = mat4.create(),
        numberOfIndex, numberOfPoints, points,
        temp, index, size, m, i,
        p = null, idx = 0;

    numberOfPoints = this.readNumber(ss);
    p = new Array(numberOfPoints * 3);

    //Getting Points
    vglpoints = new vgl.sourceDataP3fv();
    points = this.readF3Array(numberOfPoints, ss);

    //jshint plusplus: false
    for (i = 0; i < numberOfPoints; i += 1) {
      p[idx++] = points[i * 3/*+0*/];
      p[idx++] = points[i * 3 + 1];
      p[idx++] =  points[i * 3 + 2];
    }
    //jshint plusplus: true
    vglpoints.insert(p);
    geom.addSource(vglpoints);

    //Getting Colors
    vglcolors = new vgl.sourceDataC3fv();
    this.readColorArray(numberOfPoints, ss, vglcolors);
    geom.addSource(vglcolors);

    //Getting connectivity
    vgllines = new vgl.lines();
    geom.addPrimitive(vgllines);
    numberOfIndex = this.readNumber(ss);

    temp = new Int8Array(numberOfIndex * 2);
    for (i = 0; i < numberOfIndex * 2; i += 1) {
      temp[i] = ss[m_pos];
      m_pos += 1;
    }

    index = new Uint16Array(temp.buffer);
    vgllines.setIndices(index);
    vgllines.setPrimitiveType(vgl.GL.LINES);

    //Getting Matrix
    size = 16 * 4;
    temp = new Int8Array(size);
    for (i = 0; i < size; i += 1) {
      temp[i] = ss[m_pos];
      m_pos += 1;
    }

    m = new Float32Array(temp.buffer);
    mat4.copy(matrix, m);

    return matrix;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * parseMeshData
   *
   * @param geom, ss
   * @returns matrix
   */
  ////////////////////////////////////////////////////////////////////////////
  this.parseMeshData = function (geom, ss) {
    var vglpoints = null, vglcolors = null,
        normals = null, matrix = mat4.create(),
        vgltriangles = null, numberOfIndex, numberOfPoints,
        points, temp, index, size, m, i, tcoord,
        pn = null, idx = 0;

    numberOfPoints = this.readNumber(ss);
    pn = new Array(numberOfPoints * 6);
    //Getting Points
    vglpoints = new vgl.sourceDataP3N3f();
    points = this.readF3Array(numberOfPoints, ss);

    //Getting Normals
    normals = this.readF3Array(numberOfPoints, ss);
    //jshint plusplus: false
    for (i = 0; i < numberOfPoints; i += 1) {
      pn[idx++] = points[i * 3/*+0*/];
      pn[idx++] = points[i * 3 + 1];
      pn[idx++] = points[i * 3 + 2];
      pn[idx++] = normals[i * 3/*+0*/];
      pn[idx++] = normals[i * 3 + 1];
      pn[idx++] = normals[i * 3 + 2];
    }
    //jshint plusplus: true
    vglpoints.insert(pn);
    geom.addSource(vglpoints);

    //Getting Colors
    vglcolors = new vgl.sourceDataC3fv();
    this.readColorArray(numberOfPoints, ss, vglcolors);
    geom.addSource(vglcolors);

    //Getting connectivity
    temp = [];
    vgltriangles = new vgl.triangles();
    numberOfIndex = this.readNumber(ss);

    temp = new Int8Array(numberOfIndex * 2);
    for (i = 0; i < numberOfIndex * 2; i += 1) {
      temp[i] = ss[m_pos];
      m_pos += 1;
    }

    index = new Uint16Array(temp.buffer);
    vgltriangles.setIndices(index);
    geom.addPrimitive(vgltriangles);

    //Getting Matrix
    size = 16 * 4;
    temp = new Int8Array(size);
    for (i = 0; i < size; i += 1) {
      temp[i] = ss[m_pos];
      m_pos += 1;
    }

    m = new Float32Array(temp.buffer);
    mat4.copy(matrix, m);

    //Getting TCoord
    //TODO: renderer is not doing anything with this yet
    tcoord = null;

    return matrix;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * parsePointData
   *
   * @param geom, ss
   * @returns matrix
   */
  ////////////////////////////////////////////////////////////////////////////
  this.parsePointData = function (geom, ss) {
    var numberOfPoints, points, indices, temp, size,
        matrix = mat4.create(), vglpoints = null,
        vglcolors = null, vglVertexes = null, m,
        p = null, idx = 0;

    numberOfPoints = this.readNumber(ss);
    p = new Array(numberOfPoints * 3);

    //Getting Points and creating 1:1 connectivity
    vglpoints = new vgl.sourceDataP3fv();
    points = this.readF3Array(numberOfPoints, ss);

    indices = new Uint16Array(numberOfPoints);

    //jshint plusplus: false
    for (i = 0; i < numberOfPoints; i += 1) {
      indices[i] = i;
      p[idx++] = points[i * 3/*+0*/];
      p[idx++] = points[i * 3 + 1];
      p[idx++] = points[i * 3 + 2];
    }
    //jshint plusplus: true
    vglpoints.insert(p);
    geom.addSource(vglpoints);

    //Getting Colors
    vglcolors = new vgl.sourceDataC3fv();
    this.readColorArray(numberOfPoints, ss, vglcolors);
    geom.addSource(vglcolors);

    //Getting connectivity
    vglVertexes = new vgl.points();
    vglVertexes.setIndices(indices);
    geom.addPrimitive(vglVertexes);

    //Getting matrix
    size = 16 * 4;
    temp = new Int8Array(size);
    for (i = 0; i < size; i += 1) {
      temp[i] = ss[m_pos];
      m_pos += 1;
    }

    m = new Float32Array(temp.buffer);
    mat4.copy(matrix, m);

    return matrix;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * parseColorMapData
   *
   * @param geom, ss
   * @returns matrix
   */
  ////////////////////////////////////////////////////////////////////////////
  this.parseColorMapData = function (geom, ss, numColors) {

    var tmpArray, size, xrgb, i, c, obj = {};

    // Set number of colors
    obj.numOfColors = numColors;

    // Getting Position
    size = 8;
    tmpArray = new Int8Array(size);
    for (i = 0; i < size; i += 1) {
      tmpArray[i] = ss[m_pos];
      m_pos += 1;
    }
    obj.position = new Float32Array(tmpArray.buffer);

    // Getting Size
    size = 8;
    tmpArray = new Int8Array(size);
    for (i = 0; i < size; i += 1) {
      tmpArray[i] = ss[m_pos];
      m_pos += 1;
    }
    obj.size = new Float32Array(tmpArray.buffer);

    //Getting Colors
    obj.colors = [];
    //jshint plusplus: false
    for (c = 0; c < obj.numOfColors; c += 1) {
      tmpArray = new Int8Array(4);
      for (i = 0; i < 4; i += 1) {
        tmpArray[i] = ss[m_pos];
        m_pos += 1;
      }

      xrgb = [
        new Float32Array(tmpArray.buffer)[0],
        ss[m_pos++],
        ss[m_pos++],
        ss[m_pos++]
      ];
      obj.colors[c] = xrgb;
    }

    obj.orientation = ss[m_pos++];
    obj.numOfLabels = ss[m_pos++];
    obj.title = '';
    while (m_pos < ss.length) {
      obj.title += String.fromCharCode(ss[m_pos++]);
    }
    //jshint plusplus: true

    return obj;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * parseSceneMetadata
   *
   * @param data
   * @returns renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.parseSceneMetadata = function (renderer, layer) {

    var sceneRenderer = m_vtkScene.Renderers[layer],
        camera = renderer.camera(), bgc, localWidth, localHeight;

    localWidth = (sceneRenderer.size[0] - sceneRenderer.origin[0]) * m_node.width;
    localHeight = (sceneRenderer.size[1] - sceneRenderer.origin[1]) * m_node.height;
    renderer.resize(localWidth, localHeight);

    /// We are setting the center to the focal point because of
    /// a possible paraview web bug. The center of rotation isn't
    /// getting updated correctly on resetCamera.
    camera.setCenterOfRotation(
      [sceneRenderer.LookAt[1], sceneRenderer.LookAt[2],
       sceneRenderer.LookAt[3]]);
    camera.setViewAngleDegrees(sceneRenderer.LookAt[0]);
    camera.setPosition(
      sceneRenderer.LookAt[7], sceneRenderer.LookAt[8],
      sceneRenderer.LookAt[9]);
    camera.setFocalPoint(
      sceneRenderer.LookAt[1], sceneRenderer.LookAt[2],
      sceneRenderer.LookAt[3]);
    camera.setViewUpDirection(
      sceneRenderer.LookAt[4], sceneRenderer.LookAt[5],
      sceneRenderer.LookAt[6]);

    if (layer === 0) {
      bgc = sceneRenderer.Background1;
      renderer.setBackgroundColor(bgc[0], bgc[1], bgc[2], 1);
    } else {
      renderer.setResizable(false);
    }
    renderer.setLayer(layer);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * initScene
   *
   * @returns viewer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.initScene = function () {
    var renderer, layer;

    if (m_vtkScene === null) {
      return m_viewer;
    }
    for (layer = m_vtkScene.Renderers.length - 1; layer >= 0; layer -= 1) {

      renderer = this.getRenderer(layer);
      this.parseSceneMetadata(renderer, layer);
    }

    return m_viewer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * createViewer - Creates a viewer object.
   *
   * @param
   *
   * @returns viewer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.createViewer = function (node) {
    var interactorStyle;

    if (m_viewer === null) {
      m_node = node;
      m_viewer = vgl.viewer(node);
      m_viewer.init();
      m_viewer.renderWindow().removeRenderer(m_viewer.renderWindow().activeRenderer());
      m_viewer.renderWindow().addRenderer(new vgl.depthPeelRenderer());
      m_vtkRenderedList[0] = m_viewer.renderWindow().activeRenderer();
      m_viewer.renderWindow().resize(node.width, node.height);
      interactorStyle = vgl.pvwInteractorStyle();
      m_viewer.setInteractorStyle(interactorStyle);
    }

    return m_viewer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * deleteViewer - Deletes the viewer object associated with the reader.
   *
   * @returns void
   */
  ////////////////////////////////////////////////////////////////////////////
  this.deleteViewer = function () {
    m_vtkRenderedList = {};
    m_viewer = null;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * updateCanvas -
   *
   * @param
   *
   * @returns void
   */
  ////////////////////////////////////////////////////////////////////////////
  this.updateCanvas = function (node) {
    m_node = node;
    m_viewer.renderWindow().resize(node.width, node.height);

    return m_viewer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * clearVtkObjectData - Clear out the list of VTK geometry data.
   *
   * @param void
   * @returns void
   */
  ////////////////////////////////////////////////////////////////////////////
  this.numObjects = function () {
    return m_vtkObjectCount;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * getRenderer - Gets (or creates) the renderer for a layer.
   *
   * @param layer
   * @returns renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.getRenderer = function (layer) {
    var renderer;

    renderer = m_vtkRenderedList[layer];
    if (renderer === null || typeof renderer === 'undefined') {
      renderer = new vgl.renderer();
      renderer.setResetScene(false);
      renderer.setResetClippingRange(false);
      m_viewer.renderWindow().addRenderer(renderer);

      if (layer !== 0) {
        renderer.camera().setClearMask(vgl.GL.DepthBufferBit);
      }

      m_vtkRenderedList[layer] = renderer;
    }

    return renderer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * setVtkScene - Set the VTK scene data for camera initialization.
   *
   * @param scene
   * @returns void
   */
  ////////////////////////////////////////////////////////////////////////////
  this.setVtkScene = function (scene) {
    m_vtkScene = scene;
  };

  return this;
};

vgl.DataBuffers = function (initialSize) {
  'use strict';
  if (!(this instanceof vgl.DataBuffers)) {
    return new vgl.DataBuffers(initialSize);
  }

  var data = {};

  var size;
  if (!initialSize && initialSize !== 0) {
    size = 256;
  } else {
    size = initialSize;
  }

  var current = 0;

  var copyArray = function (dst, src, start, count) {
    if (!dst) {
      console.log ('ack');
    }
    if (!start) {
      start = 0;
    }
    if (!count) {
      count = src.length;
    }
    for (var i = 0; i < count; i += 1) {
      dst[start + i] = src[i];
    }
  };

  var resize = function (min_expand) {
    var new_size = size;
    /* If the array would increase substantially, don't just double its
     * size.  If the array has been increasing gradually, double it as the
     * expectation is that it will increase again. */
    if (new_size * 2 < min_expand) {
      new_size = min_expand;
    }
    while (new_size < min_expand) {
      new_size *= 2;
    }
    size = new_size;
    for (var name in data) {
      if (data.hasOwnProperty(name)) {
        var newArray = new Float32Array (new_size * data[name].len);
        var oldArray = data[name].array;
        copyArray (newArray, oldArray);
        data[name].array = newArray;
        data[name].dirty = true;
      }
    }
  };

  this.create = function (name, len) {
    if (!len) {
      throw 'Length of buffer must be a positive integer';
    }
    var array = new Float32Array (size * len);
    data[name] = {
      array: array,
      len: len,
      dirty: false
    };
    return data[name].array;
  };

  this.alloc = function (num) {
    if ((current + num) >= size) {
      resize (current + num);
    }
    var start = current;
    current += num;
    return start;
  };

  this.get = function (name) {
    return data[name].array;
  };

  this.write = function (name, array, start, count) {
    copyArray (data[name].array, array, start * data[name].len, count * data[name].len);
    data[name].dirty = true;
  };

  this.repeat = function (name, elem, start, count) {
    for (var i = 0; i < count; i += 1) {
      copyArray (data[name].array, elem,
                 (start + i) * data[name].len, data[name].len);
    }
    data[name].dirty = true;
  };

  this.count = function () {
    return current;
  };

  this.data = function (name) {
    return data[name].array;
  };
};


(function () {
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  /**
   * Takes a variable number of arguments and returns the first numeric value
   * it finds.
   * @private
   */
  function setNumeric() {
    var i;
    for (i = 0; i < arguments.length; i += 1) {
      if (isFinite(arguments[i])) {
        return arguments[i];
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Contains utility classes and methods used by geojs.
   * @namespace
   */
  //////////////////////////////////////////////////////////////////////////////
  geo.util = {
    /**
     * Returns true if the given point lies in the given polygon.
     * Algorithm description:
     *   http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
     * @param {geo.screenPosition} point The test point
     * @param {geo.screenPosition[]} outer The outer boundary of the polygon
     * @param {geo.screenPosition[][]?} inner Inner boundaries (holes)
     */
    pointInPolygon: function (point, outer, inner) {
      var inside = false, n = outer.length;

      if (n < 3) {
        // we need 3 coordinates for this to make sense
        return false;
      }

      outer.forEach(function (vert, i) {
        var j = (n + i - 1) % n;
        var intersect = (
          ((outer[i].y > point.y) !== (outer[j].y > point.y)) &&
          (point.x < (outer[j].x - outer[i].x) *
                     (point.y - outer[i].y) /
                     (outer[j].y - outer[i].y) + outer[i].x)
        );
        if (intersect) {
          inside = !inside;
        }
      });

      (inner || []).forEach(function (hole) {
        inside = inside && !geo.util.pointInPolygon(point, hole);
      });

      return inside;
    },

    /**
     * Returns true if the argument is a function.
     */
    isFunction: function (f) {
      return typeof f === "function";
    },

    /**
     * Returns the argument if it is function, otherwise returns a function
     * that returns the argument.
     */
    ensureFunction: function (f) {
      if (geo.util.isFunction(f)) {
        return f;
      } else {
        return function () { return f; };
      }
    },

    /**
     * Return a random string of length n || 8.
     */
    randomString: function (n) {
      var s, i, r;
      n = n || 8;
      s = "";
      for (i = 0; i < n; i += 1) {
        r = Math.floor(Math.random() * chars.length);
        s += chars.substring(r, r + 1);
      }
      return s;
    },

    /**
     * Convert a color from hex value or css name to rgb objects
     */
    convertColor: function (color) {
      if (color.r !== undefined && color.g !== undefined &&
          color.b !== undefined) {
        return color;
      }
      if (typeof color === "string") {
        if (geo.util.cssColors.hasOwnProperty(color)) {
          color = geo.util.cssColors[color];
        } else if (color.charAt(0) === "#") {
          color = parseInt(color.slice(1), 16);
        }
      }
      // jshint -W016
      if (isFinite(color)) {
        color = {
          r: ((color & 0xff0000) >> 16) / 255,
          g: ((color & 0xff00) >> 8) / 255,
          b: ((color & 0xff)) / 255
        };
      }
      // jshint +W016
      return color;
    },

    /**
     * Normalize a coordinate object into {x: ..., y: ..., z: ... } form.
     * Accepts 2-3d arrays,
     * latitude -> lat -> y
     * longitude -> lon -> lng -> x
     */
    normalizeCoordinates: function (p) {
      p = p || {};
      if (Array.isArray(p)) {
        return {
          x: p[0],
          y: p[1],
          z: p[2] || 0
        };
      }
      return {
        x: setNumeric(
          p.x,
          p.longitude,
          p.lng,
          p.lon,
          0
        ),
        y: setNumeric(
          p.y,
          p.latitude,
          p.lat,
          0
        ),
        z: setNumeric(
          p.z,
          p.elevation,
          p.elev,
          p.height,
          0
        )
      };
    },

    /**
     * Radius of the earth in meters, from the equatorial radius of SRID 4326.
     */
    radiusEarth: 6378137,

    /**
     * Linearly combine two "coordinate-like" objects in a uniform way.
     * Coordinate like objects have ``x``, ``y``, and optionally a ``z``
     * key.  The first object is mutated.
     *
     *   a <= ca * a + cb * b
     *
     * @param {number} ca
     * @param {object} a
     * @param {number} [a.x=0]
     * @param {number} [a.y=0]
     * @param {number} [a.z=0]
     * @param {number} cb
     * @param {object} b
     * @param {number} [b.x=0]
     * @param {number} [b.y=0]
     * @param {number} [b.z=0]
     * @returns {object} ca * a + cb * b
     */
    lincomb: function (ca, a, cb, b) {
      a.x = ca * (a.x || 0) + cb * (b.x || 0);
      a.y = ca * (a.y || 0) + cb * (b.y || 0);
      a.z = ca * (a.x || 0) + cb * (b.x || 0);
      return a;
    },

    /**
     * Element-wise product of two coordinate-like object.  Mutates
     * the first object.  Note the default values for ``b``, which
     * are intended to used as a anisotropic scaling factors.
     *
     *   a <= a * b^pow
     *
     * @param {object} a
     * @param {number} [a.x=0]
     * @param {number} [a.y=0]
     * @param {number} [a.z=0]
     * @param {object} b
     * @param {number} [b.x=1]
     * @param {number} [b.y=1]
     * @param {number} [b.z=1]
     * @param {number} [pow=1]
     * @returns {object} a * b^pow
     */
    scale: function (a, b, pow) {
      a.x = (a.x || 0) * Math.pow(b.x || 1, pow);
      a.y = (a.y || 0) * Math.pow(b.y || 1, pow);
      a.z = (a.z || 0) * Math.pow(b.z || 1, pow);
      return a;
    },

    /**
     * Compare two arrays and return if their contents are equal.
     * @param {array} a1 first array to compare
     * @param {array} a2 second array to compare
     * @returns {boolean} true if the contents of the arrays are equal.
     */
    compareArrays: function (a1, a2) {
      return (a1.length === a2.length && a1.every(function (el, idx) {
        return el === a2[idx];
      }));
    },

    /**
     * Create a vec3 that is always an array.  This should only be used if it
     * will not be used in a WebGL context.  Plain arrays usually use 64-bit
     * float values, whereas vec3 defaults to 32-bit floats.
     *
     * @returns {Array} zeroed-out vec3 compatible array.
     */
    vec3AsArray: function () {
      return [0, 0, 0];
    },

    /**
     * Create a mat4 that is always an array.  This should only be used if it
     * will not be used in a WebGL context.  Plain arrays usually use 64-bit
     * float values, whereas mat4 defaults to 32-bit floats.
     *
     * @returns {Array} identity mat4 compatible array.
     */
    mat4AsArray: function () {
      return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ];
    }
  };

  geo.util.cssColors = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };
}());

//////////////////////////////////////////////////////////////////////////////
/*
 * Includes several support classes adapted from wigglemaps.
 *
 * https://github.com/dotskapes/wigglemaps
 *
 * Copyright 2013 Preston and Krejci (dotSkapes Virtual Lab)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//////////////////////////////////////////////////////////////////////////////

/* jshint ignore: start */
(function () {
    'use strict';

    var RangeNode = function (elem, start, end, current) {
        this.data = elem[current];
        this.left = null;
        this.right = null;
        if (start !== current)
            this.left = new RangeNode(elem, start, current - 1, parseInt((start + (current - 1)) / 2, 10));
        if (end !== current)
            this.right = new RangeNode(elem, current + 1, end, parseInt((end + (current + 1)) / 2, 10));
        this.elem = elem;
        this.start = start;
        this.end = end;
        this.subtree = null; /* This is populated as needed */
        this.search = rangeNodeSearch;
    };

    var rangeNodeSearch = function (result, box) {
        var m_this = this;

        var xrange = function (b) {
            return (b.x_in(m_this.elem[m_this.start]) &&
                    b.x_in(m_this.elem[m_this.end]));
        };

        var yrange = function (b, start, end) {
            return (b.y_in(m_this.subtree[start]) &&
                    b.y_in(m_this.subtree[end]));
        };

        var subquery = function (result, box, start, end, current) {
            if (yrange(box, start, end)) {
                for (var i = start; i <= end; i ++) {
                    result.push(m_this.subtree[i]);
                }
                return;
            }
            if (box.y_in(m_this.subtree[current]))
                result.push(m_this.subtree[current]);
            if (box.y_left(m_this.subtree[current])){
                if (current !== end)
                    subquery(result, box, current + 1, end, parseInt((end + (current + 1)) / 2, 10));
            } else if (box.x_right(m_this.subtree[current])) {
                if (current !== start)
                    subquery(result, box, start, current - 1, parseInt((start + (current - 1)) / 2, 10));
            } else {
                if (current !== end)
                    subquery(result, box, current + 1, end, parseInt((end + (current + 1)) / 2, 10));
                if (current !== start)
                    subquery(result, box, start, current - 1, parseInt((start + (current - 1)) / 2, 10));
            }
        };

        if (xrange(box)) {
            if (!this.subtree) {
                this.subtree = this.elem.slice(this.start, this.end + 1);
                this.subtree.sort(function (a, b) {
                    return a.y - b.y;
                });
            }
            subquery(result, box, 0, this.subtree.length - 1, parseInt((this.subtree.length - 1) / 2, 10));
            return;
        } else {
            if (box.contains(this.data))
                result.push(this.data);
            if (box.x_left(this.data)) {
                if (this.right)
                    this.right.search(result, box);
            } else if (box.x_right(this.data)) {
                if (this.left)
                    this.left.search(result, box);
            } else {
                if (this.left)
                    this.left.search(result, box);
                if (this.right)
                    this.right.search(result, box);
            }
        }
    };

    var RangeTree = function (elem) {
        elem.sort(function (a, b) {
            return a.x - b.x;
        });
        if (elem.length > 0)
            this.root = new RangeNode(elem, 0, elem.length - 1, parseInt((elem.length - 1) / 2, 10));
        else
            this.root = null;

        this.search = function (_box) {
            if (!this.root)
                return [];
            //var box = new Box (min, max);
            var box = _box.clone ();
            var result = [];
            this.root.search (result, box);
            return result;
        };
    };

    var Box = function (v1, v2) {
        this.min = v1.clone ();
        this.max = v2.clone ();
        this.contains = function (p) {
            return (v1.x <= p.x) && (v2.x >= p.x) && (v1.y <= p.y) && (v2.y >= p.y);
        };

        this.x_in = function (p) {
            return (v1.x <= p.x) && (v2.x >= p.x);
        };

        this.x_left = function (p) {
            return (v1.x >= p.x);
        };

        this.x_right = function (p) {
            return (v2.x <= p.x);
        };

        this.y_in = function (p) {
            return (v1.y <= p.y) && (v2.y >= p.y);
        };

        this.y_left = function (p) {
            return (v1.y >= p.y);
        };

        this.y_right = function (p) {
            return (v2.y <= p.y);
        };

        this.area = function () {
            return (this.max.x - this.min.x) * (this.max.y - this.min.y);
        };

        this.height = function () {
            return this.max.y - this.min.y;
        };

        this.width = function () {
            return this.max.x - this.min.x;
        };

        this.vertex = function (index) {
            switch (index) {
            case 0:
                return this.min.clone ();
            case 1:
                return new vect (this.max.x, this.min.y);
            case 2:
                return this.max.clone ();
            case 3:
                return new vect (this.min.x, this.max.y);
            default:
                throw "Index out of bounds: " + index ;
            }
        };

        this.intersects = function (box) {
            for (var i = 0; i < 4; i ++) {
                for (var j = 0; j < 4; j ++) {
                    if (vect.intersects (this.vertex (i), this.vertex ((i + 1) % 4),
                                         box.vertex (j), box.vertex ((j + 1) % 4)))
                        return true;
                }
            }
            if (this.contains (box.min) &&
                this.contains (box.max) &&
                this.contains (new vect (box.min.x, box.max.y)) &&
                this.contains (new vect (box.max.x, box.min.y)))
                return true;
            if (box.contains (this.min) &&
                box.contains (this.max) &&
                box.contains (new vect (this.min.x, this.max.y)) &&
                box.contains (new vect (this.max.x, this.min.y)))
                return true;
            return false;
        };

        this.union = function (b) {
            this.min.x = Math.min (this.min.x, b.min.x);
            this.min.y = Math.min (this.min.y, b.min.y);

            this.max.x = Math.max (this.max.x, b.max.x);
            this.max.y = Math.max (this.max.y, b.max.y);
        };

        this.centroid = function () {
            return new vect ((this.max.x + this.min.x) / 2, (this.max.y + this.min.y) / 2);
        };

        this.clone = function () {
            return new Box (v1, v2);
        };
    };

    // A basic vector type. Supports standard 2D vector operations
    var Vector2D = function (x, y) {
        this.x = x;
        this.y = y;

        this.add = function (v) {
            this.x += v.x;
            this.y += v.y;
            return this;
        };
        this.sub = function (v) {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        };
        this.scale = function (s) {
            this.x *= s;
            this.y *= s;
            return this;
        };
        this.length = function () {
            return Math.sqrt (this.x * this.x + this.y * this.y);
        };
        this.normalize = function () {
            var scale = this.length ();
            if (scale === 0)
                return this;
            this.x /= scale;
            this.y /= scale;
            return this;
        };
        this.div = function (v) {
            this.x /= v.x;
            this.y /= v.y;
            return this;
        };
        this.floor = function () {
            this.x = Math.floor (this.x);
            this.y = Math.floor (this.y);
            return this;
        };
        this.zero = function (tol) {
            tol = tol || 0;
            return (this.length() <= tol);
        };
        this.dot = function (v) {
            return (this.x * v.x) + (this.y * v.y);
        };
        this.cross = function (v) {
            return (this.x * v.y) - (this.y * v.x);
        };
        this.rotate = function (omega) {
            var cos = Math.cos (omega);
            var sin = Math.sin (omega);
            xp = cos * this.x - sin * this.y;
            yp = sin * this.x + cos * this.y;
            this.x = xp;
            this.y = yp;
            return this;
        };
        this.clone = function () {
            return new Vector2D (this.x, this.y);
        };

        this.array = function () {
            return [this.x, this.y];
        };
    };

    // A shortcut for the vector constructor
    function vect (x, y) {
        return new Vector2D (x, y);
    }

    // Shorthand operations for vectors for operations that make new vectors

    vect.scale = function (v, s) {
        return v.clone ().scale (s);
    };

    vect.add = function (v1, v2) {
        return v1.clone ().add (v2);
    };

    vect.sub = function (v1, v2) {
        return v1.clone ().sub (v2);
    };

    vect.dist = function (v1, v2) {
        return v1.clone ().sub (v2).length ();
    };

    vect.dir = function (v1, v2) {
        return v1.clone ().sub (v2).normalize ();
    };

    vect.dot = function (v1, v2) {
        return (v1.x * v2.x) + (v1.y * v2.y);
    };

    vect.cross = function (v1, v2) {
        return (v1.x * v2.y) - (v1.y * v2.x);
    };

    vect.left = function (a, b, c, tol) {
        if (!tol)
            tol = 0;
        var v1 = vect.sub (b, a);
        var v2 = vect.sub (c, a);
        return (vect.cross (v1, v2) >= -tol);
    };

    vect.intersects = function (a, b, c, d, tol) {
        if (!tol)
            tol = 0;
        return (vect.left (a, b, c, tol) != vect.left (a, b, d, tol) &&
                vect.left (c, d, b, tol) != vect.left (c, d, a, tol));
    };

    vect.intersect2dt = function (a, b, c, d) {
        var denom = a.x * (d.y - c.y) +
            b.x * (c.y - d.y) +
            d.x * (b.y - a.y) +
            c.x * (a.y - b.y);

        if (denom === 0)
            return Infinity;

        var num_s = a.x * (d.y - c.y) +
            c.x * (a.y - d.y) +
            d.x * (c.y - a.y);
        var s = num_s / denom;

        var num_t = -(a.x * (c.y - b.y) +
                      b.x * (a.y - c.y) +
                      c.x * (b.y - a.y));
        var t = num_t / denom;

        return t;
    };

    vect.intersect2dpos = function (a, b, c, d) {
        var denom = a.x * (d.y - c.y) +
            b.x * (c.y - d.y) +
            d.x * (b.y - a.y) +
            c.x * (a.y - b.y);

        if (denom === 0)
            return Infinity;

        var num_s = a.x * (d.y - c.y) +
            c.x * (a.y - d.y) +
            d.x * (c.y - a.y);
        var s = num_s / denom;

        /*var num_t = -(a.x * (c.y - b.y) +
                      b.x * (a.y - c.y) +
                      c.x * (b.y - a.y));
        var t = num_t / denom;*/

        var dir = vect.sub (b, a);
        dir.scale (s);
        return vect.add (a, dir);
    };

    vect.rotate = function (v, omega) {
        var cos = Math.cos (omega);
        var sin = Math.sin (omega);
        xp = cos * v.x - sin * v.y;
        yp = sin * v.x + cos * v.y;
        var c = new vect (xp, yp);
        return c;
    };

    vect.normalize = function (v) {
        return v.clone ().normalize ();
    };

    // Export to geo.util module
    geo.util.RangeTree = RangeTree;
    geo.util.Box = Box;
    geo.util.vect = vect;
}());
/* jshint ignore: end */

/*
markercluster plugin:

Copyright 2012 David Leaver

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Leaflet utilities:

Copyright (c) 2010-2015, Vladimir Agafonkin
Copyright (c) 2010-2011, CloudMade
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice, this list of
      conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright notice, this list
      of conditions and the following disclaimer in the documentation and/or other
      materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @file
 * Code taken from https://github.com/Leaflet/Leaflet.markercluster
 * to support faster hierarchical clustering of features.
 * @copyright 2012, David Leaver
 */

/* jshint -W016 */
/* jshint -W089 */
// jscs:disable validateIndentation
(function () {
    "use strict";

    var L = {};
    L.Util = {
        // return unique ID of an object
        stamp: function (obj) {
            obj._leaflet_id = obj._leaflet_id || ++L.Util.lastId;
            return obj._leaflet_id;
        },
        lastId: 0
    };

    geo.util.DistanceGrid = function (cellSize) {
        this._cellSize = cellSize;
        this._sqCellSize = cellSize * cellSize;
        this._grid = {};
        this._objectPoint = {};
    };

    geo.util.DistanceGrid.prototype = {

        addObject: function (obj, point) {
            var x = this._getCoord(point.x),
                y = this._getCoord(point.y),
                grid = this._grid,
                row = grid[y] = grid[y] || {},
                cell = row[x] = row[x] || [],
                stamp = L.Util.stamp(obj);

            point.obj = obj;
            this._objectPoint[stamp] = point;

            cell.push(obj);
        },

        updateObject: function (obj, point) {
            this.removeObject(obj);
            this.addObject(obj, point);
        },

        //Returns true if the object was found
        removeObject: function (obj, point) {
            var x = this._getCoord(point.x),
                y = this._getCoord(point.y),
                grid = this._grid,
                row = grid[y] = grid[y] || {},
                cell = row[x] = row[x] || [],
                i, len;

            delete this._objectPoint[L.Util.stamp(obj)];

            for (i = 0, len = cell.length; i < len; i++) {
                if (cell[i] === obj) {

                    cell.splice(i, 1);

                    if (len === 1) {
                        delete row[x];
                    }

                    return true;
                }
            }

        },

        eachObject: function (fn, context) {
            var i, j, k, len, row, cell, removed,
                grid = this._grid;

            for (i in grid) {
                row = grid[i];

                for (j in row) {
                    cell = row[j];

                    for (k = 0, len = cell.length; k < len; k++) {
                        removed = fn.call(context, cell[k]);
                        if (removed) {
                            k--;
                            len--;
                        }
                    }
                }
            }
        },

        getNearObject: function (point) {
            var x = this._getCoord(point.x),
                y = this._getCoord(point.y),
                i, j, k, row, cell, len, obj, dist,
                objectPoint = this._objectPoint,
                closestDistSq = this._sqCellSize,
                closest = null;

            for (i = y - 1; i <= y + 1; i++) {
                row = this._grid[i];
                if (row) {

                    for (j = x - 1; j <= x + 1; j++) {
                        cell = row[j];
                        if (cell) {

                            for (k = 0, len = cell.length; k < len; k++) {
                                obj = cell[k];
                                dist = this._sqDist(
                                    objectPoint[L.Util.stamp(obj)],
                                    point
                                );
                                if (dist < closestDistSq) {
                                    closestDistSq = dist;
                                    closest = obj;
                                }
                            }
                        }
                    }
                }
            }
            return closest;
        },

        /* return the point coordinates contained in the structure */
        contents: function () {
            return $.map(this._objectPoint, function (val) { return val; });
        },

        _getCoord: function (x) {
            return Math.floor(x / this._cellSize);
        },

        _sqDist: function (p, p2) {
            var dx = p2.x - p.x,
                dy = p2.y - p.y;
            return dx * dx + dy * dy;
        }
    };
})();
// jscs:enable validateIndentation

/**
 * @file
 * Using methods adapted from leaflet to cluster an array of positions
 * hierarchically given an array of length scales (zoom levels).
 */

(function () {
  'use strict';

  /**
   * This class manages a group of nearby points that are clustered as a
   * single object for display purposes.  The class constructor is private
   * and only meant to be created by the ClusterGroup object.
   *
   * This is a tree-like data structure.  Each node in the tree is a
   * cluster containing child clusters and unclustered points.
   *
   * @class
   * @private
   *
   * @param {geo.util.ClusterGroup} group The source cluster group
   * @param {number} zoom The zoom level of the current node
   * @param {object[]} children An array of ClusterTrees or point objects
   */
  function ClusterTree(group, zoom, children) {
    this._group = group;
    this._zoom = zoom;
    this._points = [];     // Unclustered points
    this._clusters = [];   // Child clusters
    this._count = 0;       // Total number of points
    this._parent = null;
    this._coord = null;    // The cached coordinates
    var that = this;

    // add the children provided in the constructor call
    (children || []).forEach(function (c) {
      that._add(c);
    });
  }

  /**
   * Add a point or cluster as a child to the current cluster.
   * @param {object} pt A ClusterTree or point object
   * @private
   */
  ClusterTree.prototype._add = function (pt) {
    var inc = 1;

    if (pt instanceof ClusterTree) {
      // add a child cluster
      this._clusters.push(pt);
      inc = pt._count;
    } else {
      this._points.push(pt);
    }
    pt._parent = this;

    // increment the counter
    this._increment(inc);
  };

  /**
   * Increment the child counter for this and the parent.
   * @param {number} inc The value to increment by
   * @private
   */
  ClusterTree.prototype._increment = function (inc) {
    this._coord = null;
    this._count += inc;
    if (this._parent) {
      this._parent._increment(inc);
    }
  };

  /**
   * Return the total number of child points contained in the cluster.
   * @returns {number} Total points contained
   */
  ClusterTree.prototype.count = function () {
    return this._count;
  };

  /**
   * Recursively call a function on all points contained in the cluster.
   * Calls the function with `this` as the current ClusterTree object, and
   * arguments to arguments the point object and the zoom level:
   *   func.call(this, point, zoom)
   */
  ClusterTree.prototype.each = function (func) {
    var i;
    for (i = 0; i < this._points.length; i += 1) {
      func.call(this, this._points[i], this._zoom);
    }
    for (i = 0; i < this._clusters.length; i += 1) {
      this._clusters[i].each.call(
        this._clusters[i],
        func
      );
    }
  };

  /**
   * Get the coordinates of the cluster (the mean position of all the points
   * contained).  This is lazily calculated and cached.
   */
  ClusterTree.prototype.coords = function () {
    var i, center = {x: 0, y: 0};
    if (this._coord) {
      return this._coord;
    }
    // first add up the points at the node
    for (i = 0; i < this._points.length; i += 1) {
      center.x += this._points[i].x;
      center.y += this._points[i].y;
    }

    // add up the contribution from the clusters
    for (i = 0; i < this._clusters.length; i += 1) {
      center.x += this._clusters[i].coords().x * this._clusters[i].count();
      center.y += this._clusters[i].coords().y * this._clusters[i].count();
    }

    return {
      x: center.x / this.count(),
      y: center.y / this.count()
    };
  };

  /**
   * This class manages clustering of an array of positions hierarchically.
   * The algorithm and code was adapted from the Leaflet marker cluster
   * plugin by David Leaver: https://github.com/Leaflet/Leaflet.markercluster
   *
   * @class geo.util.ClusterGroup
   * @param {object} opts An options object
   * @param {number} width The width of the window; used for scaling.
   * @param {number} height The height of the window; used for scaling.
   * @param {number} maxZoom The maximimum zoom level to calculate
   * @param {number} radius Proportional to the clustering radius in pixels
   */
  function C(opts, width, height) {

    // store the options
    this._opts = $.extend({
      maxZoom: 18,
      radius: 0.05
    }, opts);
    this._opts.width = this._opts.width || width || 256;
    this._opts.height = this._opts.height || height || 256;

    // generate the initial datastructures
    this._clusters = {}; // clusters at each zoom level
    this._points = {};   // unclustered points at each zoom level

    var zoom, scl;
    for (zoom = this._opts.maxZoom; zoom >= 0; zoom -= 1) {
      scl = this._scaleAtLevel(zoom, this._opts.width, this._opts.height);
      this._clusters[zoom] = new geo.util.DistanceGrid(scl);
      this._points[zoom] = new geo.util.DistanceGrid(scl);
    }
    this._topClusterLevel = new ClusterTree(this, -1);
  }

  /**
   * Returns a characteristic distance scale at a particular zoom level.  This
   * scale is used to control the clustering radius.  When the renderer supports
   * it, this call should be replaced by a calculation involving the view port
   * size in point coordinates at a particular zoom level.
   * @private
   */
  C.prototype._scaleAtLevel = function (zoom, width, height) {
    return vgl.zoomToHeight(zoom, width, height) / 2 * this._opts.radius;
  };

  /**
   * Add a position to the cluster group.
   * @protected
   */
  C.prototype.addPoint = function (point) {
    var zoom, closest, parent, newCluster, lastParent, z;

    // start at the maximum zoom level and search for nearby
    //
    // 1.  existing clusters
    // 2.  unclustered points
    //
    // otherwise add the point as a new unclustered point

    for (zoom = this._opts.maxZoom; zoom >= 0; zoom -= 1) {

      // find near cluster
      closest = this._clusters[zoom].getNearObject(point);
      if (closest) {
        // add the point to the cluster and return
        closest._add(point);
        return;
      }

      // find near point
      closest = this._points[zoom].getNearObject(point);
      if (closest) {
        parent = closest._parent;
        if (parent) {
          // remove the point from the parent
          for (z = parent._points.length - 1; z >= 0; z -= 1) {
            if (parent._points[z] === closest) {
              parent._points.splice(z, 1);
              parent._increment(-1);
              break;
            }
          }
        }

        if (!parent) {
          $.noop();
        }
        // create a new cluster with these two points
        newCluster = new ClusterTree(this, zoom, [closest, point]);
        this._clusters[zoom].addObject(newCluster, newCluster.coords());

        // create intermediate parent clusters that don't exist
        lastParent = newCluster;
        for (z = zoom - 1; z > parent._zoom; z -= 1) {
          lastParent = new ClusterTree(this, z, [lastParent]);
          this._clusters[z].addObject(lastParent, lastParent.coords());
        }
        parent._add(lastParent);

        // remove closest from this zoom level and any above (replace with newCluster)
        for (z = zoom; z >= 0; z -= 1) {
          if (!this._points[z].removeObject(closest, closest)) {
            break;
          }
        }

        return;
      }

      // add an unclustered point
      this._points[zoom].addObject(point, point);
    }

    // otherwise add to the top
    this._topClusterLevel._add(point);
  };

  /**
   * Return the unclustered points contained at a given zoom level.
   * @param {number} zoom The zoom level
   * @return {object[]} The array of unclustered points
   */
  C.prototype.points = function (zoom) {
    zoom = Math.min(Math.max(Math.floor(zoom), 0), this._opts.maxZoom - 1);
    return this._points[Math.floor(zoom)].contents();
  };

  /**
   * Return the clusters contained at a given zoom level.
   * @param {number} zoom The zoom level
   * @return {ClusterTree[]} The array of clusters
   */
  C.prototype.clusters = function (zoom) {
    zoom = Math.min(Math.max(Math.floor(zoom), 0), this._opts.maxZoom - 1);
    return this._clusters[Math.floor(zoom)].contents();
  };

  geo.util.ClusterGroup = C;
})();

(function () {
  'use strict';

  geo.util.scale = {
    d3: typeof d3 !== 'undefined' ? d3.scale : undefined
  };
})();

/**
 * @file
 * Based on the following jquery throttle / debounce plugin:
 *
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 *
 * @copyright 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 *
 * The implementation included here is modified to support a callback
 * method that can accumulate values between actual invocations of
 * the throttled method.
 */

(function (window, undefined) {
  'use strict';

  // Internal method reference.
  var _throttle;

  /**
   * Throttle execution of a function. Especially useful for rate limiting
   * execution of handlers on events like resize and scroll. If you want to
   * rate-limit execution of a function to a single time see
   * {@link geo.util.debounce}.
   *
   * In this visualization, | is a throttled-function call and X is the actual
   * callback execution:
   *
   * ::
   *   Throttled with `no_trailing` specified as false or unspecified:
   *   ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
   *   X    X    X    X    X    X        X    X    X    X    X    X
   *
   *   Throttled with `no_trailing` specified as true:
   *   ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
   *   X    X    X    X    X             X    X    X    X    X
   *
   * @function geo.util.throttle
   * @param {number} delay A zero-or-greater delay in milliseconds. For event
   *    callbacks, values around 100 or 250 (or even higher) are most useful.
   * @param {boolean} [no_trailing=false] If no_trailing is
   *    true, callback will only execute every `delay` milliseconds while the
   *    throttled-function is being called. If no_trailing is false or
   *    unspecified, callback will be executed one final time after the last
   *    throttled-function call. (After the throttled-function has not been
   *    called for `delay` milliseconds, the internal counter is reset)
   * @param {function} callback A function to be executed after `delay`
   *    milliseconds. The `this` context and all arguments are passed through,
   *    as-is, to `callback` when the throttled-function is executed.
   * @param {function} [accumulator] A function to be executed (synchronously)
   *    during **each** call to the wrapped function.  Typically, this
   *    this method is used to accumulate values that the callback uses
   *    when it finally executes.
   *
   * @returns {function} The throttled version of `callback`
   *
   * @example
   * var throttled = geo.util.throttle( delay, [ no_trailing, ] callback );
   * $('selector').bind( 'someevent', throttled );
   * $('selector').unbind( 'someevent', throttled );
   */
  geo.util.throttle = function (delay, no_trailing,
                                callback, accumulator, debounce_mode) {
    // After wrapper has stopped being called, this timeout ensures that
    // `callback` is executed at the proper times in `throttle` and `end`
    // debounce modes.
    var timeout_id,

      // Keep track of the last time `callback` was executed.
      last_exec = 0;

    // `no_trailing` defaults to falsy.
    if (typeof no_trailing !== 'boolean') {
      debounce_mode = accumulator;
      accumulator = callback;
      callback = no_trailing;
      no_trailing = undefined;
    }

    // accumulator defaults to no-op
    if (typeof accumulator !== 'function') {
      debounce_mode = accumulator;
      accumulator = function () {};
    }

    // The `wrapper` function encapsulates all of the throttling / debouncing
    // functionality and when executed will limit the rate at which `callback`
    // is executed.
    function wrapper() {
      var that = this, // jshint ignore: line
        elapsed = +new Date() - last_exec,
        args = arguments;

      // Execute `callback` and update the `last_exec` timestamp.
      function exec() {
        last_exec = +new Date();
        callback.apply(that, args);
      }

      // If `debounce_mode` is true (at_begin) this is used to clear the flag
      // to allow future `callback` executions.
      function clear() {
        timeout_id = undefined;
      }

      // always call the accumulator first
      accumulator.apply(that, args);

      if (debounce_mode && !timeout_id) {
        // Since `wrapper` is being called for the first time and
        // `debounce_mode` is true (at_begin), execute `callback`.
        exec();
      }

      // Clear any existing timeout.
      void(
        timeout_id && clearTimeout(timeout_id)
      );

      if (debounce_mode === undefined && elapsed > delay) {
        // In throttle mode, if `delay` time has been exceeded, execute
        // `callback`.
        exec();

      } else if (no_trailing !== true) {
        // In trailing throttle mode, since `delay` time has not been
        // exceeded, schedule `callback` to execute `delay` ms after most
        // recent execution.
        //
        // If `debounce_mode` is true (at_begin), schedule `clear` to execute
        // after `delay` ms.
        //
        // If `debounce_mode` is false (at end), schedule `callback` to
        // execute after `delay` ms.
        timeout_id = setTimeout(
          debounce_mode ?
            clear :
            exec,
          debounce_mode === undefined ?
            delay - elapsed :
            delay
        );
      }
    }

    // Return the wrapper function.
    return wrapper;
  };

  _throttle = geo.util.throttle;

  /**
   * Debounce execution of a function. Debouncing, unlike throttling,
   * guarantees that a function is only executed a single time, either at the
   * very beginning of a series of calls, or at the very end. If you want to
   * simply rate-limit execution of a function, see the <jQuery.throttle>
   * method.
   *
   * In this visualization, | is a debounced-function call and X is the actual
   * callback execution:
   *
   * ::
   *
   *   Debounced with `at_begin` specified as false or unspecified:
   *   ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
   *                            X                                 X
   *
   *   Debounced with `at_begin` specified as true:
   *   ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
   *   X                                 X
   *
   *
   * @param {number} delay A zero-or-greater delay in milliseconds. For event
   *    callbacks, values around 100 or 250 (or even higher) are most useful.
   * @param {boolean} [at_begin=false] If at_begin is false or
   *    unspecified, callback will only be executed `delay` milliseconds after
   *    the last debounced-function call. If at_begin is true, callback will be
   *    executed only at the first debounced-function call. (After the
   *    throttled-function has not been called for `delay` milliseconds, the
   *    internal counter is reset)
   * @param {function} callback A function to be executed after delay milliseconds.
   *    The `this` context and all arguments are passed through, as-is, to
   *    `callback` when the debounced-function is executed.
   * @param {function} [accumulator] A function to be executed (synchronously)
   *    during **each** call to the wrapped function.  Typically, this
   *    this method is used to accumulate values that the callback uses
   *    when it finally executes.
   *
   * @returns {function} A new, debounced, function.
   *
   * @example
   * var debounced = geo.util.debounce( delay, [ at_begin, ] callback );
   * $('selector').bind( 'someevent', debounced );
   * $('selector').unbind( 'someevent', debounced );
   *
   */

  geo.util.debounce = function (delay, at_begin, callback, accumulator) {
    if (typeof at_begin !== 'boolean') {
      accumulator = callback;
      callback = at_begin;
      at_begin = false;
    }
    accumulator = accumulator || function () {};
    return _throttle(delay, false, callback, accumulator, !!at_begin);
  };

})(this);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class object
 *
 * @class
 * @extends vgl.object
 * @returns {geo.object}
 */
//////////////////////////////////////////////////////////////////////////////
geo.object = function () {
  "use strict";
  if (!(this instanceof geo.object)) {
    return new geo.object();
  }

  var m_this = this,
      m_eventHandlers = {},
      m_idleHandlers = [],
      m_promiseCount = 0;

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Bind a handler that will be called once when all internal promises are
   *  resolved.
   *
   *  @param {function} handler A function taking no arguments
   *  @returns {geo.object[]|geo.object} this
   */
  //////////////////////////////////////////////////////////////////////////////
  this.onIdle = function (handler) {
    if (m_promiseCount) {
      m_idleHandlers.push(handler);
    } else {
      handler();
    }
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Add a new promise object preventing idle event handlers from being called
   *  until it is resolved.
   *
   *  @param {Promise} promise A promise object
   */
  //////////////////////////////////////////////////////////////////////////////
  this.addPromise = function (promise) {
    // called on any resolution of the promise
    function onDone() {
      m_promiseCount -= 1;
      if (!m_promiseCount) {
        m_idleHandlers.splice(0, m_idleHandlers.length)
          .forEach(function (handler) {
            handler();
          });
      }
    }
    m_promiseCount += 1;
    promise.then(onDone, onDone);
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Bind an event handler to this object
   *
   *  @param {String} event
   *    An event from {geo.events}
   *  @param {function} handler
   *    A function that will be called when ``event`` is triggered.  The
   *    function will be given an event object as a first parameter and
   *    optionally a second argument provided by the triggerer.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.geoOn = function (event, handler) {
    if (Array.isArray(event)) {
      event.forEach(function (e) {
        m_this.geoOn(e, handler);
      });
      return m_this;
    }
    if (!m_eventHandlers.hasOwnProperty(event)) {
      m_eventHandlers[event] = [];
    }
    m_eventHandlers[event].push(handler);
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Trigger an event (or events) on this object and call all handlers
   *
   *  @param {String} event An event from {geo.event}
   *  @param {Object} args An optional argument to pass to handlers
   */
  //////////////////////////////////////////////////////////////////////////////
  this.geoTrigger = function (event, args) {

    // if we have an array of events, recall with single events
    if (Array.isArray(event)) {
      event.forEach(function (e) {
        m_this.geoTrigger(e, args);
      });
      return m_this;
    }

    // append the event type to the argument object
    args = args || {};
    args.event = event;

    if (m_eventHandlers.hasOwnProperty(event)) {
      m_eventHandlers[event].forEach(function (handler) {
        handler.call(m_this, args);
      });
    }

    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Remove handlers from an event (or an array of events).  If no event is
   *  provided all hanlders will be removed.
   *
   *  @param {string?} event An event from {geo.events}
   *  @param {object?} arg A function or array of functions to remove from the events
   *                      or if falsey remove all handlers from the events
   */
  //////////////////////////////////////////////////////////////////////////////
  this.geoOff = function (event, arg) {
    if (event === undefined) {
      m_eventHandlers = {};
      m_idleHandlers = [];
      m_promiseCount = 0;
    }
    if (Array.isArray(event)) {
      event.forEach(function (e) {
        m_this.geoOff(e, arg);
      });
      return m_this;
    }
    if (!arg) {
      m_eventHandlers[event] = [];
    } else if (Array.isArray(arg)) {
      arg.forEach(function (handler) {
        m_this.geoOff(event, handler);
      });
      return m_this;
    }
    // What do we do if the handler is not already bound?
    //   ignoring for now...
    if (m_eventHandlers.hasOwnProperty(event)) {
      m_eventHandlers[event] = m_eventHandlers[event].filter(function (f) {
          return f !== arg;
        }
      );
    }
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Free all resources and destroy the object.
   */
  //////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.geoOff();
  };

  vgl.object.call(this);

  return this;
};

inherit(geo.object, vgl.object);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class sceneObject, which extends the object's
 * event handling with a tree-based event propagation.
 *
 * @class
 * @extends geo.object
 * @returns {geo.sceneObject}
 */
//////////////////////////////////////////////////////////////////////////////
geo.sceneObject = function (arg) {
  "use strict";
  if (!(this instanceof geo.sceneObject)) {
    return new geo.sceneObject();
  }
  geo.object.call(this, arg);

  var m_this = this,
      m_parent = null,
      m_children = [],
      s_exit = this._exit,
      s_trigger = this.geoTrigger,
      s_addPromise = this.addPromise,
      s_onIdle = this.onIdle;

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Override object.addPromise to propagate up the scene tree.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.addPromise = function (promise) {
    if (m_parent) {
      m_parent.addPromise(promise);
    } else {
      s_addPromise(promise);
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Override object.onIdle to propagate up the scene tree.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.onIdle = function (handler) {
    if (m_parent) {
      m_parent.onIdle(handler);
    } else {
      s_onIdle(handler);
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Get/set parent of the object
   *  @param {?geo.sceneObject} parent
   */
  //////////////////////////////////////////////////////////////////////////////
  this.parent = function (arg) {
    if (arg === undefined) {
      return m_parent;
    }
    m_parent = arg;
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Add a child (or an array of children) to the object
   */
  //////////////////////////////////////////////////////////////////////////////
  this.addChild = function (child) {
    if (Array.isArray(child)) {
      child.forEach(m_this.addChild);
      return m_this;
    }
    child.parent(m_this);
    m_children.push(child);
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Remove a child (or array of children) from the object
   */
  //////////////////////////////////////////////////////////////////////////////
  this.removeChild = function (child) {
    if (Array.isArray(child)) {
      child.forEach(m_this.removeChild);
      return m_this;
    }
    m_children = m_children.filter(function (c) { return c !== child; });
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Get an array of child objects
   */
  //////////////////////////////////////////////////////////////////////////////
  this.children = function () {
    return m_children.slice();
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Force redraw of a scene object, to be implemented by subclasses.
   *  Base class just calls draw of child objects.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.draw = function (arg) {
    m_this.children().forEach(function (child) {
      child.draw(arg);
    });
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   *  Trigger an event (or events) on this object and call all handlers.
   *  @param {String} event the event to trigger
   *  @param {Object} args arbitrary argument to pass to the handler
   *  @param {Boolean} childrenOnly if true, only propagate down the tree
   */
  //////////////////////////////////////////////////////////////////////////////
  this.geoTrigger = function (event, args, childrenOnly) {

    var geoArgs;

    args = args || {};
    geoArgs = args.geo || {};
    args.geo = geoArgs;

    // stop propagation if requested by the handler
    if (geoArgs.stopPropagation) {
      return m_this;
    }

    // If the event was not triggered by the parent, just propagate up the tree
    if (!childrenOnly && m_parent && geoArgs._triggeredBy !== m_parent) {
      geoArgs._triggeredBy = m_this;
      m_parent.geoTrigger(event, args);
      return m_this;
    }

    // call the object's own handlers
    s_trigger.call(m_this, event, args);

    // stop propagation if requested by the handler
    if (geoArgs.stopPropagation) {
      return m_this;
    }

    // trigger the event on the children
    m_children.forEach(function (child) {
      if (child.geoTrigger) {
        geoArgs._triggeredBy = m_this;
        child.geoTrigger(event, args);
      }
    });

    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Free all resources and destroy the object.
   */
  //////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.children = [];
    delete m_this.parent;
    s_exit();
  };

  return this;
};

inherit(geo.sceneObject, geo.object);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class timestamp
 *
 * @class
 * @extends vgl.timestamp
 * @returns {geo.timestamp}
 */
//////////////////////////////////////////////////////////////////////////////
geo.timestamp = function () {
  'use strict';
  if (!(this instanceof geo.timestamp)) {
    return new geo.timestamp();
  }
  vgl.timestamp.call(this);
};

inherit(geo.timestamp, vgl.timestamp);

//////////////////////////////////////////////////////////////////////////////
/**
 * This purpose of this class is to provide a generic interface for computing
 * coordinate transformationss.  The interface is taken from the proj4js,
 * which also provides the geospatial projection implementation.  The
 * interface is intentionally simple to allow for custom, non-geospatial use
 * cases. For further details, see http://proj4js.org/
 *
 * The default transforms lat/long coordinates into web mercator
 * for use with standard tile sets.
 *
 * This class is intended to be extended in the future to support 2.5 and 3
 * dimensional transformations.  The forward/inverse methods take optional
 * z values that are ignored in current mapping context, but will in the
 * future perform more general 3D transformations.
 *
 * @class
 * @extends geo.object
 * @param {object} options Constructor options
 * @param {string} options.source A proj4 string for the source projection
 * @param {string} options.target A proj4 string for the target projection
 * @returns {geo.transform}
 */
//////////////////////////////////////////////////////////////////////////////

geo.transform = function (options) {
  'use strict';
  if (!(this instanceof geo.transform)) {
    return new geo.transform(options);
  }

  var m_this = this,
      m_proj,   // The raw proj4js object
      m_source, // The source projection
      m_target; // The target projection

  /**
   * Generate the internal proj4 object.
   * @private
   */
  function generate_proj4() {
    m_proj = new proj4(
      m_this.source(),
      m_this.target()
    );
  }

  /**
   * Get/Set the source projection
   */
  this.source = function (arg) {
    if (arg === undefined) {
      return m_source || 'EPSG:4326';
    }
    m_source = arg;
    generate_proj4();
    return m_this;
  };

  /**
   * Get/Set the target projection
   */
  this.target = function (arg) {
    if (arg === undefined) {
      return m_target || 'EPSG:3857';
    }
    m_target = arg;
    generate_proj4();
    return m_this;
  };

  /**
   * Perform a forward transformation (source -> target)
   * @protected
   *
   * @param {object}   point      The point coordinates
   * @param {number}   point.x    The x-coordinate (i.e. longitude)
   * @param {number}   point.y    The y-coordinate (i.e. latitude)
   * @param {number}  [point.z=0] The z-coordinate (i.e. elevation)
   *
   * @returns {object} A point object in the target coordinates
   */
  this._forward = function (point) {
    var pt = m_proj.forward(point);
    pt.z = point.z || 0;
    return pt;
  };

  /**
   * Perform an inverse transformation (target -> source)
   * @protected
   *
   * @param {object}   point     The point coordinates
   * @param {number}   point.x   The x-coordinate (i.e. longitude)
   * @param {number}   point.y   The y-coordinate (i.e. latitude)
   * @param {number}  [point.z=0] The z-coordinate (i.e. elevation)
   *
   * @returns {object} A point object in the source coordinates
   */
  this._inverse = function (point) {
    var pt = m_proj.inverse(point);
    pt.z = point.z || 0;
    return pt;
  };

  /**
   * Perform a forward transformation (source -> target) in place
   *
   * @param {object[]} point      The point coordinates or array of points
   * @param {number}   point.x    The x-coordinate (i.e. longitude)
   * @param {number}   point.y    The y-coordinate (i.e. latitude)
   * @param {number}  [point.z=0] The z-coordinate (i.e. elevation)
   *
   * @returns {object} A point object or array in the target coordinates
   */
  this.forward = function (point) {
    if (Array.isArray(point)) {
      return point.map(m_this._forward);
    }
    return m_this._forward(point);
  };

  /**
   * Perform an inverse transformation (target -> source) in place
   * @protected
   *
   * @param {object[]} point      The point coordinates or array of points
   * @param {number}   point.x    The x-coordinate (i.e. longitude)
   * @param {number}   point.y    The y-coordinate (i.e. latitude)
   * @param {number}  [point.z=0] The z-coordinate (i.e. elevation)
   *
   * @returns {object} A point object in the source coordinates
   */
  this.inverse = function (point) {
    if (Array.isArray(point)) {
      return point.map(m_this._inverse);
    }
    return m_this._inverse(point);
  };

  // Set defaults given by the constructor
  options = options || {};
  this.source(options.source);
  this.target(options.target);

  geo.object.call(this);
  return this;
};

/**
 * Transform an array of coordinates from one projection into another.  The
 * transformation may occur in place (modifying the input coordinate array),
 * depending on the input format.  The coordinates can be an object with x, y,
 * and (optionally z) or an array of 2 or 3 values, or an array of either of
 * those, or a single flat array with 2 or 3 components per coordinate.  Arrays
 * are always modified in place.  Individual point objects are not altered; new
 * point objects are returned unless no transform is needed.
 *
 * @param {string}        srcPrj The source projection
 * @param {string}        tgtPrj The destination projection
 * @param {geoPosition[]} coordinates An array of coordinate objects
 * @param {number}        numberOfComponents for flat arrays, either 2 or 3.
 *
 * @returns {geoPosition[]} The transformed coordinates
 */
geo.transform.transformCoordinates = function (
        srcPrj, tgtPrj, coordinates, numberOfComponents) {
  'use strict';

  if (srcPrj === tgtPrj) {
    return coordinates;
  }

  var i, count, offset, xAcc, yAcc, zAcc, writer, output, projPoint,
      trans = geo.transform({source: srcPrj, target: tgtPrj});

  /// Default Z accessor
  zAcc = function () {
    return 0.0;
  };

  /// Helper methods
  function handleArrayCoordinates() {
    if (coordinates[0] instanceof Array) {
      if (coordinates[0].length === 2) {
        xAcc = function (index) {
          return coordinates[index][0];
        };
        yAcc = function (index) {
          return coordinates[index][1];
        };
        writer = function (index, x, y) {
          output[index] = [x, y];
        };
      } else if (coordinates[0].length === 3) {
        xAcc = function (index) {
          return coordinates[index][0];
        };
        yAcc = function (index) {
          return coordinates[index][1];
        };
        zAcc = function (index) {
          return coordinates[index][2];
        };
        writer = function (index, x, y, z) {
          output[index] = [x, y, z];
        };
      } else {
        throw 'Invalid coordinates. Requires two or three components per array';
      }
    } else {
      if (coordinates.length === 2) {
        offset = 2;

        xAcc = function (index) {
          return coordinates[index * offset];
        };
        yAcc = function (index) {
          return coordinates[index * offset + 1];
        };
        writer = function (index, x, y) {
          output[index] = x;
          output[index + 1] = y;
        };
      } else if (coordinates.length === 3) {
        offset = 3;

        xAcc = function (index) {
          return coordinates[index * offset];
        };
        yAcc = function (index) {
          return coordinates[index * offset + 1];
        };
        zAcc = function (index) {
          return coordinates[index * offset + 2];
        };
        writer = function (index, x, y, z) {
          output[index] = x;
          output[index + 1] = y;
          output[index + 2] = z;
        };
      } else if (numberOfComponents) {
        if (numberOfComponents === 2 || numberOfComponents === 3) {
          offset = numberOfComponents;

          xAcc = function (index) {
            return coordinates[index];
          };
          yAcc = function (index) {
            return coordinates[index + 1];
          };
          if (numberOfComponents === 2) {
            writer = function (index, x, y) {
              output[index] = x;
              output[index + 1] = y;
            };
          } else {
            zAcc = function (index) {
              return coordinates[index + 2];
            };
            writer = function (index, x, y, z) {
              output[index] = x;
              output[index + 1] = y;
              output[index + 2] = z;
            };
          }
        } else {
          throw 'Number of components should be two or three';
        }
      } else {
        throw 'Invalid coordinates';
      }
    }
  }

  /// Helper methods
  function handleObjectCoordinates() {
    if (coordinates[0] &&
        'x' in coordinates[0] &&
        'y' in coordinates[0]) {
      xAcc = function (index) {
        return coordinates[index].x;
      };
      yAcc = function (index) {
        return coordinates[index].y;
      };

      if ('z' in coordinates[0]) {
        zAcc = function (index) {
          return coordinates[index].z;
        };
        writer = function (index, x, y, z) {
          output[i] = {x: x, y: y, z: z};
        };
      } else {
        writer = function (index, x, y) {
          output[index] = {x: x, y: y};
        };
      }
    } else if (coordinates && 'x' in coordinates && 'y' in coordinates) {
      xAcc = function () {
        return coordinates.x;
      };
      yAcc = function () {
        return coordinates.y;
      };

      if ('z' in coordinates) {
        zAcc = function () {
          return coordinates.z;
        };
        writer = function (index, x, y, z) {
          output = {x: x, y: y, z: z};
        };
      } else {
        writer = function (index, x, y) {
          output = {x: x, y: y};
        };
      }
    } else {
      throw 'Invalid coordinates';
    }
  }

  if (coordinates instanceof Array) {
    output = [];
    output.length = coordinates.length;
    count = coordinates.length;

    if (coordinates[0] instanceof Array ||
        coordinates[0] instanceof Object) {
      offset = 1;

      if (coordinates[0] instanceof Array) {
        handleArrayCoordinates();
      } else if (coordinates[0] instanceof Object) {
        handleObjectCoordinates();
      }
    } else {
      handleArrayCoordinates();
    }
  } else if (coordinates && coordinates instanceof Object) {
    count = 1;
    offset = 1;
    if (coordinates && 'x' in coordinates && 'y' in coordinates) {
      handleObjectCoordinates();
    } else {
      throw 'Coordinates are not valid';
    }
  }

  for (i = 0; i < count; i += offset) {
    projPoint = trans.forward({x: xAcc(i), y: yAcc(i), z: zAcc(i)});
    writer(i, projPoint.x, projPoint.y, projPoint.z);
  }
  return output;
};

/**
 * Apply an affine transformation consisting of a translation
 * then a scaling to the given coordinate array.  Note, the
 * transformation occurs in place so the input coordinate
 * object are mutated.
 *
 * (Possibly extend to support rotations as well)
 *
 * @param {object} def
 * @param {object} def.origin The transformed origin
 * @param {object} def.scale The transformed scale factor
 * @param {object[]} coords An array of coordinate objects
 *
 * @returns {object[]} The transformed coordinates
 */
geo.transform.affineForward = function (def, coords) {
  'use strict';
  var i, origin = def.origin, scale = def.scale || {x: 1, y: 1, z: 1};
  for (i = 0; i < coords.length; i += 1) {
    coords[i].x = (coords[i].x - origin.x) * scale.x;
    coords[i].y = (coords[i].y - origin.y) * scale.y;
    coords[i].z = ((coords[i].z || 0) - (origin.z || 0)) * scale.z;
  }
  return coords;
};

/**
 * Apply an inverse affine transformation which is the
 * inverse to {@link geo.transform.affineForward}.  Note, the
 * transformation occurs in place so the input coordinate
 * object are mutated.
 *
 * (Possibly extend to support rotations as well)
 *
 * @param {object} def
 * @param {object} def.origin The transformed origin
 * @param {object} def.scale The transformed scale factor
 * @param {object[]} coords An array of coordinate objects
 *
 * @returns {object[]} The transformed coordinates
 */
geo.transform.affineInverse = function (def, coords) {
  'use strict';
  var i, origin = def.origin, scale = def.scale || {x: 1, y: 1, z: 1};
  for (i = 0; i < coords.length; i += 1) {
    coords[i].x = coords[i].x / scale.x + origin.x;
    coords[i].y = coords[i].y / scale.y + origin.y;
    coords[i].z = (coords[i].z || 0) / scale.z + (origin.z || 0);
  }
  return coords;
};
inherit(geo.transform, geo.object);

(function () {
  'use strict';

  //////////////////////////////////////////////////////////////////////////////
  /**
   * This class defines the raw interface for a camera.  At a low level, the
   * camera provides a methods for converting between a map's coordinate system
   * to display pixel coordinates.
   *
   * For the moment, all camera transforms are assumed to be expressible as
   * 4x4 matrices.  More general cameras may follow that break this assumption.
   *
   * The interface for the camera is relatively stable for "map-like" views,
   * e.g. when the camera is pointing in the direction [0, 0, -1], and placed
   * above the z=0 plane.  More general view changes and events have not yet
   * been defined.
   *
   * The camera emits the following events when the view changes:
   *
   *   * {@link geo.event.camera.pan} when the camera is translated in the
   *       x/y plane
   *   * {@link geo.event.camera.zoom} when the camera is changed in a way
   *       that modifies the current zoom level
   *   * {@link geo.event.camera.view} when the visible bounds change for
   *       any reason
   *   * {@link geo.event.camera.projection} when the projection type changes
   *   * {@link geo.event.camera.viewport} when the viewport changes
   *
   * By convention, protected methods do not update the internal matrix state,
   * public methods do.  There are a few primary methods that are intended to
   * be used by external classes to mutate the internal state:
   *
   *   * bounds: Set the visible bounds (for initialization and zooming)
   *   * pan: Translate the camera in x/y by an offset (for panning)
   *   * viewFromCenterSizeRotation: set the camera view based on a center
   *        point, boundary size, and rotation angle.
   *
   * @class
   * @extends geo.object
   * @param {object?} spec Options argument
   * @param {string} spec.projection One of the supported geo.camera.projection
   * @param {object} spec.viewport The initial camera viewport
   * @param {object} spec.viewport.width
   * @param {object} spec.viewport.height
   * @returns {geo.camera}
   */
  //////////////////////////////////////////////////////////////////////////////
  geo.camera = function (spec) {
    if (!(this instanceof geo.camera)) {
      return new geo.camera(spec);
    }
    spec = spec || {};
    geo.object.call(this, spec);

    /**
     * The view matrix
     * @protected
     */
    this._view = geo.util.mat4AsArray();

    /**
     * The projection matrix
     * @protected
     */
    this._proj = geo.util.mat4AsArray();

    /**
     * The projection type (one of `this.constructor.projection`)
     * @protected
     */
    this._projection = null;

    /**
     * The transform matrix (view * proj)
     * @protected
     */
    this._transform = geo.util.mat4AsArray();

    /**
     * The inverse transform matrix (view * proj)^-1
     * @protected
     */
    this._inverse = geo.util.mat4AsArray();

    /**
     * Cached bounds object recomputed on demand.
     * @protected
     */
    this._bounds = null;

    /**
     * Cached "display" matrix recomputed on demand.
     * @see {@link geo.camera.display}
     * @protected
     */
    this._display = null;

    /**
     * Cached "world" matrix recomputed on demand.
     * @see {@link geo.camera.world}
     * @protected
     */
    this._world = null;

    /**
     * The viewport parameters size and offset.
     * @property {number} height Viewport height in pixels
     * @property {number} width Viewport width in pixels
     * @protected
     */
    this._viewport = {width: 1, height: 1};

    /**
     * Set up the projection matrix for the current projection type.
     * @protected
     */
    this._createProj = function () {
      var s = this.constructor.bounds.near / this.constructor.bounds.far;

      // call mat4.frustum or mat4.ortho here
      if (this._projection === 'perspective') {
        mat4.frustum(
          this._proj,
          this.constructor.bounds.left * s,
          this.constructor.bounds.right * s,
          this.constructor.bounds.bottom * s,
          this.constructor.bounds.top * s,
          -this.constructor.bounds.near,
          -this.constructor.bounds.far
        );
      } else if (this._projection === 'parallel') {
        mat4.ortho(
          this._proj,
          this.constructor.bounds.left,
          this.constructor.bounds.right,
          this.constructor.bounds.bottom,
          this.constructor.bounds.top,
          this.constructor.bounds.near,
          this.constructor.bounds.far
        );
      }
    };

    /**
     * Update the internal state of the camera on change to camera
     * parameters.
     * @protected
     */
    this._update = function () {
      this._bounds = null;
      this._display = null;
      this._world = null;
      this._transform = geo.camera.combine(this._proj, this._view);
      mat4.invert(this._inverse, this._transform);
      this.geoTrigger(geo.event.camera.view, {
        camera: this
      });
    };

    /**
     * Getter/setter for the view matrix.
     * @note copies the matrix value on set.
     */
    Object.defineProperty(this, 'view', {
      get: function () {
        return this._view;
      },
      set: function (view) {
        mat4.copy(this._view, view);
        this._update();
      }
    });

    /**
     * Getter/setter for the view bounds.
     *
     * If not provided, near and far bounds will be set to [-1, 1] by
     * default.  We will probably want to change this to a unit specific
     * value initialized by the map when drawing true 3D objects or
     * tilting the camera.
     *
     * Returned near/far bounds are also -1, 1 for the moment.
     */
    Object.defineProperty(this, 'bounds', {
      get: function () {
        if (this._bounds === null) {
          this._bounds = this._getBounds();
        }
        return this._bounds;
      },
      set: function (bounds) {
        this._setBounds(bounds);
        this._update();
      }
    });

    /**
     * Getter for the "display" matrix.  This matrix converts from
     * world coordinates into display coordinates.  This matrix exists to
     * generate matrix3d css transforms that can be used in layers that
     * render on the DOM.
     */
    Object.defineProperty(this, 'display', {
      get: function () {
        var mat;
        if (this._display === null) {
          mat = geo.camera.affine(
            {x: 1, y: 1}, // translate to: [0, 2] x [0, 2]
            {
              x: this.viewport.width / 2,
              y: this.viewport.height / -2
            }             // scale to: [0, width] x [-height, 0]
          );

          // applies mat to the transform (world -> normalized)
          this._display = geo.camera.combine(
            mat,
            this._transform
          );
        }
        return this._display;
      }
    });

    /**
     * Getter for the "world" matrix.  This matrix converts from
     * display coordinates into world coordinates.  This is constructed
     * by inverting the "display" matrix.
     */
    Object.defineProperty(this, 'world', {
      get: function () {
        if (this._world === null) {
          this._world = mat4.invert(
            geo.util.mat4AsArray(),
            this.display
          );
        }
        return this._world;
      }
    });

    /**
     * Getter/setter for the projection type.
     */
    Object.defineProperty(this, 'projection', {
      get: function () {
        return this._projection;
      },
      set: function (type) {
        if (!this.constructor.projection[type]) {
          throw new Error('Unsupported projection type: ' + type);
        }
        if (type !== this._projection) {
          this._projection = type;
          this._createProj();
          this._update();
          this.geoTrigger(geo.event.camera.projection, {
            camera: this,
            projection: type
          });
        }
      }
    });

    /**
     * Getter for the projection matrix (when applicable).
     * This generally shouldn't be modified directly because
     * the rest of the code assumes that the clipping bounds
     * are [-1, -1, -1] to [1, 1, 1] in camera coordinates.
     */
    Object.defineProperty(this, 'projectionMatrix', {
      get: function () {
        return this._proj;
      }
    });

    /**
     * Getter for the transform matrix.
     */
    Object.defineProperty(this, 'transform', {
      get: function () {
        return this._transform;
      }
    });

    /**
     * Getter for the inverse transform matrix.
     */
    Object.defineProperty(this, 'inverse', {
      get: function () {
        return this._inverse;
      }
    });

    /**
     * Getter/setter for the viewport.
     */
    Object.defineProperty(this, 'viewport', {
      get: function () {
        return {width: this._viewport.width, height: this._viewport.height};
      },
      set: function (viewport) {
        if (!(viewport.width > 0 &&
              viewport.height > 0)) {
          throw new Error('Invalid viewport dimensions');
        }
        if (viewport.width === this._viewport.width &&
            viewport.height === this._viewport.height) {
          return;
        }

        // apply scaling to the view matrix to account for the new aspect ratio
        // without changing the apparent zoom level
        if (this._viewport.width && this._viewport.height) {
          this._scale([
              this._viewport.width / viewport.width,
              this._viewport.height / viewport.height,
              1
          ]);

          // translate by half the difference to keep the center the same
          this._translate([
              (viewport.width - this._viewport.width) / 2,
              (viewport.height - this._viewport.height) / 2,
              0
          ]);
        }

        this._viewport = {width: viewport.width, height: viewport.height};
        this._update();
        this.geoTrigger(geo.event.camera.viewport, {
          camera: this,
          viewport: this.viewport
        });
      }
    });

    /**
     * Reset the view matrix to its initial (identity) state.
     * @protected
     * @returns {this} Chainable
     */
    this._resetView = function () {
      mat4.identity(this._view);
      return this;
    };

    /**
     * Uses `mat4.translate` to translate the camera by the given vector amount.
     * @protected
     * @param {vec3|Array} offset The camera translation vector
     * @returns {this} Chainable
     */
    this._translate = function (offset) {
      mat4.translate(this._view, this._view, offset);
    };

    /**
     * Uses `mat4.scale` to scale the camera by the given vector amount.
     * @protected
     * @param {vec3|Array} scale The scaling vector
     * @returns {this} Chainable
     */
    this._scale = function (scale) {
      mat4.scale(this._view, this._view, scale);
    };

    /**
     * Project a vec4 from world space into clipped space [-1, 1] in place
     * @protected
     * @param {vec4} point The point in world coordinates (mutated)
     * @returns {vec4} The point in clip space coordinates
     */
    this._worldToClip4 = function (point) {
      return geo.camera.applyTransform(this._transform, point);
    };

    /**
     * Project a vec4 from clipped space into world space in place
     * @protected
     * @param {vec4} point The point in clipped coordinates (mutated)
     * @returns {vec4} The point in world space coordinates
     */
    this._clipToWorld4 = function (point) {
      return geo.camera.applyTransform(this._inverse, point);
    };

    /**
     * Apply the camera's projection transform to the given point.
     * @param {vec4} pt a point in clipped coordinates
     * @returns {vec4} the point in normalized coordinates
     */
    this.applyProjection = function (pt) {
      var w;
      if (this._projection === 'perspective') {
        w = 1 / (pt[3] || 1);
        pt[0] = w * pt[0];
        pt[1] = w * pt[1];
        pt[2] = w * pt[2];
        pt[3] = w;
      } else {
        pt[3] = 1;
      }
      return pt;
    };

    /**
     * Unapply the camera's projection transform from the given point.
     * @param {vec4} pt a point in normalized coordinates
     * @returns {vec4} the point in clipped coordinates
     */
    this.unapplyProjection = function (pt) {
      var w;
      if (this._projection === 'perspective') {
        w = pt[3] || 1;
        pt[0] = w * pt[0];
        pt[1] = w * pt[1];
        pt[2] = w * pt[2];
        pt[3] = w;
      } else {
        pt[3] = 1;
      }
      return pt;
    };


    /**
     * Project a vec4 from world space into viewport space.
     * @param {vec4} point The point in world coordinates (mutated)
     * @returns {vec4} The point in display coordinates
     *
     * @note For the moment, this computation assumes the following:
     *   * point[3] > 0
     *   * depth range [0, 1]
     *
     * The clip space z and w coordinates are returned with the window
     * x/y coordinates.
     */
    this.worldToDisplay4 = function (point) {
      // This is because z = 0 is the far plane exposed to the user, but
      // internally the far plane is at -2.
      point[2] -= 2;

      // convert to clip space
      this._worldToClip4(point);

      // apply projection specific transformation
      point = this.applyProjection(point);

      // convert to display space
      point[0] = this._viewport.width * (1 + point[0]) / 2.0;
      point[1] = this._viewport.height * (1 - point[1]) / 2.0;
      point[2] = (1 + point[2]) / 2.0;
      return point;
    };

    /**
     * Project a vec4 from display space into world space in place.
     * @param {vec4} point The point in display coordinates (mutated)
     * @returns {vec4} The point in world space coordinates
     *
     * @note For the moment, this computation assumes the following:
     *   * point[3] > 0
     *   * depth range [0, 1]
     */
    this.displayToWorld4 = function (point) {
      // convert to clip space
      point[0] = 2 * point[0] / this._viewport.width - 1;
      point[1] = -2 * point[1] / this._viewport.height + 1;
      point[2] = 2 * point[2] - 1;

      // invert projection transform
      point = this.unapplyProjection(point);

      // convert to world coordinates
      this._clipToWorld4(point);

      // move far surface to z = 0
      point[2] += 2;
      return point;
    };

    /**
     * Project a point object from world space into viewport space.
     * @param {object} point The point in world coordinates
     * @param {number} point.x
     * @param {number} point.y
     * @returns {object} The point in display coordinates
     */
    this.worldToDisplay = function (point) {
      // define some magic numbers:
      var z = 0, // z coordinate of the surface in world coordinates
          w = 1; // enables perspective divide (i.e. for point conversion)
      point = this.worldToDisplay4(
        [point.x, point.y, z, w]
      );
      return {x: point[0], y: point[1], z: point[2]};
    };

    /**
     * Project a point object from viewport space into world space.
     * @param {object} point The point in display coordinates
     * @param {number} point.x
     * @param {number} point.y
     * @returns {object} The point in world coordinates
     */
    this.displayToWorld = function (point) {
      // define some magic numbers:
      var z = 1, // the z coordinate of the surface
          w = 2; // perspective divide at z = 1
      point = this.displayToWorld4(
        [point.x, point.y, z, w]
      );
      return {x: point[0], y: point[1]};
    };

    /**
     * Calculate the current bounds in world coordinates from the
     * current view matrix.  This computes a matrix vector multiplication
     * so the result is cached for public facing methods.
     *
     * @protected
     * @returns {object} bounds object
     */
    this._getBounds = function () {
      var ul, ur, ll, lr, bds = {};

      // get corners
      ul = this.displayToWorld({x: 0, y: 0});
      ur = this.displayToWorld({x: this._viewport.width, y: 0});
      ll = this.displayToWorld({x: 0, y: this._viewport.height});
      lr = this.displayToWorld({
        x: this._viewport.width,
        y: this._viewport.height
      });

      bds.left = Math.min(ul.x, ur.x, ll.x, lr.x);
      bds.bottom = Math.min(ul.y, ur.y, ll.y, lr.y);
      bds.right = Math.max(ul.x, ur.x, ll.x, lr.x);
      bds.top = Math.max(ul.y, ur.y, ll.y, lr.y);

      return bds;
    };

    /**
     * Sets the view matrix so that the given world bounds
     * are in view.  To account for the viewport aspect ratio,
     * the resulting bounds may be larger in width or height than
     * the requested bound, but should be centered in the frame.
     *
     * @protected
     * @param {object} bounds
     * @param {number} bounds.left
     * @param {number} bounds.right
     * @param {number} bounds.bottom
     * @param {number} bounds.top
     * @param {number?} bounds.near Currently ignored
     * @param {number?} bounds.far Currently ignored
     * @return {this} Chainable
     */
    this._setBounds = function (bounds) {
      var size = {
        width: bounds.right - bounds.left,
        height: bounds.top - bounds.bottom
      };
      var center = {
        x: (bounds.left + bounds.right) / 2,
        y: (bounds.bottom + bounds.top) / 2
      };

      this._viewFromCenterSizeRotation(center, size, 0);
      return this;
    };

    /**
     * Sets the view matrix so that the given world center is centered, at
     * least a certain width and height are visible, and a rotation is applied.
     * The resulting bounds may be larger in width or height than the values if
     * the viewport is a different aspect ratio.
     *
     * @protected
     * @param {object} center
     * @param {number} center.x
     * @param {number} center.y
     * @param {object} size
     * @param {number} size.width
     * @param {number} size.height
     * @param {number} rotation in clockwise radians.  Optional
     * @return {this} Chainable
     */
    this._viewFromCenterSizeRotation = function (center, size, rotation) {
      var translate = geo.util.vec3AsArray(),
          scale = geo.util.vec3AsArray(),
          c_ar, v_ar, w, h;

      // reset view to the identity
      this._resetView();

      w = Math.abs(size.width);
      h = Math.abs(size.height);
      c_ar = w / h;
      v_ar = this._viewport.width / this._viewport.height;

      if (c_ar >= v_ar) {
        // grow camera bounds vertically
        h = w / v_ar;
        scale[0] = 2 / w;
        scale[1] = 2 / h;
      } else {
        // grow bounds horizontally
        w = h * v_ar;
        scale[0] = 2 / w;
        scale[1] = 2 / h;
      }

      scale[2] = 1;
      this._scale(scale);

      if (rotation) {
        this._rotate(rotation);
      }

      // translate to the new center.
      translate[0] = -center.x;
      translate[1] = -center.y;
      translate[2] = 0;

      this._translate(translate);

      return this;
    };

    /**
     * Public exposure of the viewFromCenterSizeRotation function.
     */
    this.viewFromCenterSizeRotation = function (center, size, rotation) {
      this._viewFromCenterSizeRotation(center, size, rotation);
      this._update();
      return this;
    };

    /**
     * Pans the view matrix by the given amount.
     *
     * @param {object} offset The delta in world space coordinates.
     * @param {number} offset.x
     * @param {number} offset.y
     * @param {number} [offset.z=0]
     */
    this.pan = function (offset) {
      if (!offset.x && !offset.y && !offset.z) {
        return;
      }
      this._translate([
        offset.x,
        offset.y,
        offset.z || 0
      ]);
      this._update();
    };

    /**
     * Zooms the view matrix by the given amount.
     *
     * @param {number} zoom The zoom scale to apply
     */
    this.zoom = function (zoom) {
      if (zoom === 1) {
        return;
      }
      mat4.scale(this._view, this._view, [
          zoom,
          zoom,
          zoom
      ]);
      this._update();
    };

    /**
     * Rotate the view matrix by the given amount.
     *
     * @param {number} rotation Counter-clockwise rotation angle in radians.
     * @param {object} center Center of rotation in world space coordinates.
     * @param {vec3} axis acis of rotation.  Defaults to [0, 0, -1]
     */
    this._rotate = function (rotation, center, axis) {
      if (!rotation) {
        return;
      }
      axis = axis || [0, 0, -1];
      if (!center) {
        center = [0, 0, 0];
      } else if (center.x !== undefined) {
        center = [center.x || 0, center.y || 0, center.z || 0];
      }
      var invcenter = [-center[0], -center[1], -center[2]];
      mat4.translate(this._view, this._view, center);
      mat4.rotate(this._view, this._view, rotation, axis);
      mat4.translate(this._view, this._view, invcenter);
    };

    /**
     * Returns a CSS transform that converts (by default) from world coordinates
     * into display coordinates.  This allows users of this module to
     * position elements using world coordinates directly inside DOM
     * elements.
     *
     * @note This transform will not take into account projection specific
     * transforms.  For perspective projections, one can use the properties
     * `perspective` and `perspective-origin` to apply the projection
     * in css directly.
     *
     * @param {string} transform The transform to return
     *   * display
     *   * world
     * @returns {string} The css transform string
     */
    this.css = function (transform) {
      var m;
      switch ((transform || '').toLowerCase()) {
        case 'display':
        case '':
          m = this.display;
          break;
        case 'world':
          m = this.world;
          break;
        default:
          throw new Error('Unknown transform ' + transform);
      }
      return geo.camera.css(m);
    };

    /**
     * Represent a glmatrix as a pretty-printed string.
     * @param {mat4} mat A 4 x 4 matrix
     * @param {number} prec The number of decimal places
     * @returns {string}
     */
    this.ppMatrix = function (mat, prec) {
      var t = mat;
      prec = prec || 2;
      function f(i) {
        var d = t[i], s = d.toExponential(prec);
        if (d >= 0) {
          s = ' ' + s;
        }
        return s;
      }
      return [
        [f(0), f(4), f(8), f(12)].join(' '),
        [f(1), f(5), f(9), f(13)].join(' '),
        [f(2), f(6), f(10), f(14)].join(' '),
        [f(3), f(7), f(11), f(15)].join(' ')
      ].join('\n');
    };

    /**
     * Pretty print the transform matrix.
     */
    this.toString = function () {
      return this.ppMatrix(this._transform);
    };

    /**
     * Return a debugging string of the current camera state.
     */
    this.debug = function () {
      return [
        'bounds',
        JSON.stringify(this.bounds),
        'view:',
        this.ppMatrix(this._view),
        'projection:',
        this.ppMatrix(this._proj),
        'transform:',
        this.ppMatrix(this._transform)
      ].join('\n');
    };

    /**
     * Represent the value of the camera as its transform matrix.
     */
    this.valueOf = function () {
      return this._transform;
    };

    // initialize the view matrix
    this._resetView();

    // set up the projection matrix
    this.projection = spec.projection || 'parallel';

    // initialize the viewport
    if (spec.viewport) {
      this.viewport = spec.viewport;
    }

    // trigger an initial update to set up the camera state
    this._update();

    return this;
  };

  /**
   * Supported projection types.
   */
  geo.camera.projection = {
    perspective: true,
    parallel: true
  };

  /**
   * Camera clipping bounds, probably shouldn't be modified.
   */
  geo.camera.bounds = {
    left: -1,
    right: 1,
    top: 1,
    bottom: -1,
    far: -2,
    near: -1
  };

  /**
   * Output a mat4 as a css transform.
   * @param {mat4} t A matrix transform
   * @returns {string} A css transform string
   */
  geo.camera.css = function (t) {
    return (
      'matrix3d(' +
      [
        t[0].toFixed(20),
        t[1].toFixed(20),
        t[2].toFixed(20),
        t[3].toFixed(20),
        t[4].toFixed(20),
        t[5].toFixed(20),
        t[6].toFixed(20),
        t[7].toFixed(20),
        t[8].toFixed(20),
        t[9].toFixed(20),
        t[10].toFixed(20),
        t[11].toFixed(20),
        t[12].toFixed(20),
        t[13].toFixed(20),
        t[14].toFixed(20),
        t[15].toFixed(20)
      ].join(',') +
      ')'
    );
  };

  /**
   * Generate a mat4 representing an affine coordinate transformation.
   *
   * For the following affine transform:
   *
   *    x |-> m * (x + a) + b
   *
   * applies the css transform:
   *
   *    translate(b) scale(m) translate(a)
   *
   * @param {object?} pre Coordinate offset **before** scaling
   * @param {object?} scale Coordinate scaling
   * @param {object?} post Coordinate offset **after** scaling
   * @returns {mat4} The new transform matrix
   */
  geo.camera.affine = function (pre, scale, post) {
    var mat = geo.util.mat4AsArray();

    // Note: mat4 operations are applied to the right side of the current
    // transform, so the first applied here is the last applied to the
    // coordinate.
    if (post) {
      mat4.translate(mat, mat, [post.x || 0, post.y || 0, post.z || 0]);
    }
    if (scale) {
      mat4.scale(mat, mat, [scale.x || 1, scale.y || 1, scale.z || 1]);
    }
    if (pre) {
      mat4.translate(mat, mat, [pre.x || 0, pre.y || 0, pre.z || 0]);
    }
    return mat;
  };

  /**
   * Apply the given transform matrix to a point in place.
   * @param {mat4} t
   * @param {vec4} pt
   * @returns {vec4}
   */
  geo.camera.applyTransform = function (t, pt) {
    return vec4.transformMat4(pt, pt, t);
  };

  /**
   * Combine two transforms by multiplying their matrix representations.
   * @note The second transform provided will be the first applied in the
   * coordinate transform.
   * @param {mat4} A
   * @param {mat4} B
   * @returns {mat4} A * B
   */
  geo.camera.combine = function (A, B) {
    return mat4.mul(geo.util.mat4AsArray(), A, B);
  };

  inherit(geo.camera, geo.object);
})();

//////////////////////////////////////////////////////////////////////////////
/**
 * @class
 * @extends geo.sceneObject
 * @param {Object?} arg An options argument
 * @param {string} arg.attribution An attribution string to display
 * @param {number} arg.zIndex The z-index to assign to the layer (defaults
 *   to the index of the layer inside the map)
 * @returns {geo.layer}
 */
//////////////////////////////////////////////////////////////////////////////
geo.layer = function (arg) {
  'use strict';

  if (!(this instanceof geo.layer)) {
    return new geo.layer(arg);
  }
  arg = arg || {};
  geo.sceneObject.call(this, arg);

  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_exit = this._exit,
      m_id = arg.id === undefined ? geo.layer.newLayerId() : arg.id,
      m_name = '',
      m_map = arg.map === undefined ? null : arg.map,
      m_node = null,
      m_canvas = null,
      m_renderer = null,
      m_initialized = false,
      m_rendererName = arg.renderer === undefined ? 'vgl' : arg.renderer,
      m_dataTime = geo.timestamp(),
      m_updateTime = geo.timestamp(),
      m_sticky = arg.sticky === undefined ? true : arg.sticky,
      m_active = arg.active === undefined ? true : arg.active,
      m_opacity = arg.opacity === undefined ? 1 : arg.opacity,
      m_attribution = arg.attribution || null,
      m_zIndex;

  m_rendererName = geo.checkRenderer(m_rendererName);

  if (!m_map) {
    throw new Error('Layers must be initialized on a map.');
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the name of the renderer.
   *
   * @returns {string}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.rendererName = function () {
    return m_rendererName;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the z-index of the layer.  The z-index controls the display
   * order of the layers in much the same way as the CSS z-index property.
   *
   * @param {number} [zIndex] The new z-index
   * @returns {number|this}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.zIndex = function (zIndex) {
    if (zIndex === undefined) {
      return m_zIndex;
    }
    m_zIndex = zIndex;
    m_node.css('z-index', m_zIndex);
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Bring the layer above the given number of layers.  This will rotate the
   * current z-indices for this and the next `n` layers.
   *
   * @param {number} [n=1] The number of positions to move
   * @returns {this}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.moveUp = function (n) {
    var order, i, me = null, tmp, sign;

    // set the default
    if (n === undefined) {
      n = 1;
    }

    // set the sort direction that controls if we are moving up
    // or down the z-index
    sign = 1;
    if (n < 0) {
      sign = -1;
      n = -n;
    }

    // get a sorted list of layers
    order = m_this.map().layers().sort(
      function (a, b) { return sign * (a.zIndex() - b.zIndex()); }
    );

    for (i = 0; i < order.length; i += 1) {
      if (me === null) {
        // loop until we get to the current layer
        if (order[i] === m_this) {
          me = i;
        }
      } else if (i - me <= n) {
        // swap the next n layers
        tmp = m_this.zIndex();
        m_this.zIndex(order[i].zIndex());
        order[i].zIndex(tmp);
      } else {
        // all the swaps are done now
        break;
      }
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Bring the layer below the given number of layers.  This will rotate the
   * current z-indices for this and the previous `n` layers.
   *
   * @param {number} [n=1] The number of positions to move
   * @returns {this}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.moveDown = function (n) {
    if (n === undefined) {
      n = 1;
    }
    return m_this.moveUp(-n);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Bring the layer to the top of the map layers.
   *
   * @returns {this}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.moveToTop = function () {
    return m_this.moveUp(m_this.map().children().length - 1);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Bring the layer to the bottom of the map layers.
   *
   * @returns {this}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.moveToBottom = function () {
    return m_this.moveDown(m_this.map().children().length - 1);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get whether or not the layer is sticky (navigates with the map).
   *
   * @returns {Boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.sticky = function () {
    return m_sticky;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get whether or not the layer is active.  An active layer will receive
   * native mouse when the layer is on top.  Non-active layers will never
   * receive native mouse events.
   *
   * @returns {Boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.active = function () {
    return m_active;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set root node of the layer
   *
   * @returns {div}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.node = function () {
    return m_node;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set id of the layer
   *
   * @returns {String}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.id = function (val) {
    if (val === undefined) {
      return m_id;
    }
    m_id = geo.newLayerId();
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set name of the layer
   *
   * @returns {String}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.name = function (val) {
    if (val === undefined) {
      return m_name;
    }
    m_name = val;
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set map of the layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.map = function () {
    return m_map;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get renderer for the layer if any
   */
  ////////////////////////////////////////////////////////////////////////////
  this.renderer = function () {
    return m_renderer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get canvas of the layer
   *
   */
  ////////////////////////////////////////////////////////////////////////////
  this.canvas = function () {
    return m_canvas;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return last time data got changed
   */
  ////////////////////////////////////////////////////////////////////////////
  this.dataTime = function () {
    return m_dataTime;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the modified time for the last update that did something
   */
  ////////////////////////////////////////////////////////////////////////////
  this.updateTime = function () {
    return m_updateTime;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set if the layer has been initialized
   */
  ////////////////////////////////////////////////////////////////////////////
  this.initialized = function (val) {
    if (val !== undefined) {
      m_initialized = val;
      return m_this;
    }
    return m_initialized;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Transform coordinates from world coordinates into a local coordinate
   * system specific to the underlying renderer.  This method is exposed
   * to allow direct access the rendering context, but otherwise should
   * not be called directly.  The default implementation is the identity
   * operator.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.toLocal = function (input) {
    if (m_this._toLocalMatrix) {
      geo.camera.applyTransform(m_this._toLocalMatrix, input);
    }
    return input;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Transform coordinates from a local coordinate system to world coordinates.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.fromLocal = function (input) {
    if (m_this._fromLocalMatrix) {
      geo.camera.applyTransform(m_this._fromLocalMatrix, input);
    }
    return input;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the attribution html content that will displayed with the
   * layer.  By default, nothing will be displayed.  Note, this content
   * is **not** html escaped, so care should be taken when renderering
   * user provided content.
   * @param {string?} arg An html fragment
   * @returns {string|this} Chainable as a setter
   */
  ////////////////////////////////////////////////////////////////////////////
  this.attribution = function (arg) {
    if (arg !== undefined) {
      m_attribution = arg;
      m_this.map().updateAttribution();
      return m_this;
    }
    return m_attribution;
  };


  ////////////////////////////////////////////////////////////////////////////
  /**
   * Init layer
   *
   * @param {boolean} noEvents if a subclass of this intends to bind the
   *    resize, pan, and zoom events itself, set this flag to true to avoid
   *    binding them here.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (noEvents) {
    if (m_initialized) {
      return m_this;
    }

    m_map.node().append(m_node);

    /* Pass along the arguments, but not the map reference */
    var options = $.extend({}, arg);
    delete options.map;

    if (m_rendererName === null) {
      // if given a "null" renderer, then pass the map element as the
      // canvas
      m_renderer = null;
      m_canvas = m_node;
    } else if (m_canvas) { // Share context if have valid one
      m_renderer = geo.createRenderer(m_rendererName, m_this, m_canvas,
                                      options);
    } else {
      m_renderer = geo.createRenderer(m_rendererName, m_this, undefined,
                                      options);
      m_canvas = m_renderer.canvas();
    }

    if (!m_this.active()) {
      m_node.css('pointerEvents', 'none');
    }

    m_initialized = true;

    if (!noEvents) {
      /// Bind events to handlers
      m_this.geoOn(geo.event.resize, function (event) {
        m_this._update({event: event});
      });

      m_this.geoOn(geo.event.pan, function (event) {
        m_this._update({event: event});
      });

      m_this.geoOn(geo.event.rotate, function (event) {
        m_this._update({event: event});
      });

      m_this.geoOn(geo.event.zoom, function (event) {
        m_this._update({event: event});
      });
    }

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Clean up resouces
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.geoOff();
    if (m_renderer) {
      m_renderer._exit();
    }
    m_node.off();
    m_node.remove();
    arg = {};
    m_canvas = null;
    m_renderer = null;
    s_exit();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the width of the layer in pixels.
   * **DEPRECIATED: use map.size instead.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.width = function () {
    return m_this.map().size().width;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the height of the layer in pixels
   * **DEPRECIATED: use map.size instead.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.height = function () {
    return m_this.map().size().height;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the current layer opacity.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.opacity = function (opac) {
    if (opac !== undefined) {
      m_opacity = opac;
      m_node.css('opacity', m_opacity);
      return m_this;
    }
    return m_opacity;
  };

  if (arg.zIndex === undefined) {
    arg.zIndex = m_map.children().length;
  }
  m_zIndex = arg.zIndex;

  // Create top level div for the layer
  m_node = $(document.createElement('div'));
  m_node.attr('id', m_name);
  m_node.css('position', 'absolute');
  m_node.css('width', '100%');
  m_node.css('height', '100%');
  m_this.opacity(m_opacity);

  // set the z-index
  m_this.zIndex(m_zIndex);

  return m_this;
};

/**
 * Gets a new id number for a layer.
 * @protected
 * @instance
 * @returns {number}
 */
geo.layer.newLayerId = (function () {
    'use strict';
    var currentId = 1;
    return function () {
      var id = currentId;
      currentId += 1;
      return id;
    };
  }()
);

/**
 * General object specification for feature types.
 * @typedef geo.layer.spec
 * @type {object}
 * @property {string} [type='feature'] For feature compatibility
 * with more than one kind of creatable layer
 * @property {object[]} [data=[]] The default data array to
 * apply to each feature if none exists
 * @property {string} [renderer='vgl'] The renderer to use
 * @property {geo.feature.spec[]} [features=[]] Features
 * to add to the layer
 */

/**
 * Create a layer from an object.  Any errors in the creation
 * of the layer will result in returning null.
 * @param {geo.map} map The map to add the layer to
 * @param {geo.layer.spec} spec The object specification
 * @returns {geo.layer|null}
 */
geo.layer.create = function (map, spec) {
  'use strict';

  spec = spec || {};

  // add osmLayer later
  spec.type = 'feature';
  if (spec.type !== 'feature') {
    console.warn('Unsupported layer type');
    return null;
  }

  spec.renderer = spec.renderer || 'vgl';
  spec.renderer = geo.checkRenderer(spec.renderer);

  if (!spec.renderer) {
    console.warn('Invalid renderer');
    return null;
  }

  var layer = map.createLayer(spec.type, spec);
  if (!layer) {
    console.warn('Unable to create a layer');
    return null;
  }

  // probably move this down to featureLayer eventually
  spec.features.forEach(function (f) {
    f.data = f.data || spec.data;
    f.feature = geo.feature.create(layer, f);
  });

  return layer;
};

inherit(geo.layer, geo.sceneObject);

//////////////////////////////////////////////////////////////////////////////
/**
 * Layer to draw points, lines, and polygons on the map The polydata layer
 * provide mechanisms to create and draw geometrical shapes such as points,
 * lines, and polygons.
 * @class
 * @extends geo.layer
 * @returns {geo.featureLayer}
 */
//////////////////////////////////////////////////////////////////////////////
geo.featureLayer = function (arg) {
  "use strict";
  if (!(this instanceof geo.featureLayer)) {
    return new geo.featureLayer(arg);
  }
  geo.layer.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      m_features = [],
      s_init = this._init,
      s_exit = this._exit,
      s_update = this._update,
      s_draw = this.draw;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create feature give a name
   *
   * @returns {geo.Feature} Will return a new feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this.createFeature = function (featureName, arg) {

    var newFeature = geo.createFeature(
      featureName, m_this, m_this.renderer(), arg);

    m_this.addChild(newFeature);
    m_features.push(newFeature);
    m_this.features(m_features);
    m_this.modified();
    return newFeature;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Delete feature
   *
   */
  ////////////////////////////////////////////////////////////////////////////
  this.deleteFeature = function (feature) {
    var i;

    for (i = 0; i < m_features.length; i += 1) {
      if (m_features[i] === feature) {
        m_features[i]._exit();
        m_this.dataTime().modified();
        m_this.modified();
        m_features.splice(i, 1);
      }
    }
    m_this.removeChild(feature);

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set drawables
   *
   * @returns {Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.features = function (val) {
    if (val === undefined) {
      return m_features;
    } else {
      m_features = val.slice(0);
      m_this.dataTime().modified();
      m_this.modified();
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function () {
    if (m_this.initialized()) {
      return m_this;
    }

    /// Call super class init
    s_init.call(m_this, true);

    /// Bind events to handlers
    m_this.geoOn(geo.event.resize, function (event) {
      if (m_this.renderer()) {
        m_this.renderer()._resize(event.x, event.y, event.width, event.height);
        m_this._update({event: event});
        m_this.renderer()._render();
      } else {
        m_this._update({event: event});
      }
    });

    m_this.geoOn(geo.event.pan, function (event) {
      m_this._update({event: event});
      if (m_this.renderer()) {
        m_this.renderer()._render();
      }
    });

    m_this.geoOn(geo.event.rotate, function (event) {
      m_this._update({event: event});
      if (m_this.renderer()) {
        m_this.renderer()._render();
      }
    });

    m_this.geoOn(geo.event.zoom, function (event) {
      m_this._update({event: event});
      if (m_this.renderer()) {
        m_this.renderer()._render();
      }
    });

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function (request) {
    var i;

    if (!m_features.length) {
      return m_this;
    }

    /// Call base class update
    s_update.call(m_this, request);

    if (m_features && m_features.length === 0) {
      console.log("[info] No valid data source found.");
      return;
    }

    if (m_this.dataTime().getMTime() > m_this.updateTime().getMTime()) {
      for (i = 0; i < m_features.length; i += 1) {
        m_features[i].renderer(m_this.renderer());
      }
    }

    for (i = 0; i < m_features.length; i += 1) {
      m_features[i]._update();
    }

    m_this.updateTime().modified();

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Free all resources
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.clear();
    s_exit();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Draw
   */
  ////////////////////////////////////////////////////////////////////////////
  this.draw = function () {
    // Call sceneObject.draw, which calls draw on all child objects.
    s_draw();

    // Now call render on the renderer. In certain cases it may not do
    // anything if the if the child objects are drawn on the screen already.
    if (m_this.renderer()) {
      m_this.renderer()._render();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Clear all features in layer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.clear = function () {
    var i;

    if (!m_features.length) {
      return m_this;
    }

    for (i = 0; i < m_features.length; i += 1) {
      m_features[i]._exit();
      m_this.removeChild(m_features[i]);
    }

    m_this.dataTime().modified();
    m_this.modified();
    m_features = [];

    return m_this;
  };

  return m_this;
};

inherit(geo.featureLayer, geo.layer);

// Now register it
geo.registerLayer("feature", geo.featureLayer);

//////////////////////////////////////////////////////////////////////////////
/**
 * Common object containing all event types that are provided by the GeoJS
 * API.  Each property contained here is a valid target for event handling
 * via {@link geo.object#geoOn}.  The event object provided to handlers is
 * different for each event type.  Each handler will generally be called
 * with a the <code>this</code> context being the class that caused the event.<br>
 * <br>
 * The following properties are common to all event objects:
 *
 * @namespace
 * @property {string} type The event type that was triggered
 * @property {object} geo A universal event object for controlling propagation
 *
 * @example
 * map.geoOn(geo.event.layerAdd, function (event) {
 *   // event is an object with type: {@link geo.event.layerAdd}
 * });
 *
 */
//////////////////////////////////////////////////////////////////////////////
geo.event = {};

//////////////////////////////////////////////////////////////////////////////
/*
 * Event types
 */
//////////////////////////////////////////////////////////////////////////////

// The following were not triggered nor used anywhere.  Removing until their
// purpose is defined more clearly.
//
// geo.event.update = 'geo_update';
// geo.event.opacityUpdate = 'geo_opacityUpdate';
// geo.event.layerSelect = 'geo_layerSelect';
// geo.event.layerUnselect = 'geo_layerUnselect';
// geo.event.query = 'geo_query';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered when a layer is added to the map.
 *
 * @property {geo.map} target The current map
 * @property {geo.layer} layer The new layer
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.layerAdd = 'geo_layerAdd';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered when a layer is removed from the map.
 *
 * @property {geo.map} target The current map
 * @property {geo.layer} layer The old layer
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.layerRemove = 'geo_layerRemove';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered when the map's zoom level is changed.  Note that zoom is never
 * triggered on the map itself.  Instead it is triggered individually on
 * layers, starting with the base layer.
 *
 * @property {number} zoomLevel New zoom level
 * @property {object} screenPosition The screen position of mouse pointer
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.zoom = 'geo_zoom';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered when the map is rotated around the current map center (pointing
 * downward so that positive angles are clockwise rotations).
 *
 * @property {number} angle The angle of the rotation in radians
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.rotate = 'geo_rotate';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered when the map is panned either by user interaction or map
 * transition.
 *
 * @property {object} screenDelta The number of pixels to pan the map by
 * @property {object} center The new map center
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.pan = 'geo_pan';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered when the map's canvas is resized.
 *
 * @property {number} width The new width in pixels
 * @property {number} height The new height in pixels
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.resize = 'geo_resize';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered when the world coordinate system changes.  Data in GCS
 * coordinates can be transformed by the following formulas:
 *
 *   x <- (x - origin.x) * scale.x
 *   y <- (y - origin.y) * scale.y
 *   z <- (z - origin.z) * scale.z
 *
 * Data in world coordinates can be updated using the following formulas:
 *
 *   x <- (x * scaleChange.x - origin.x * (scale.x + scaleChange.x)
 *          - scale.x * originChange.x) * scale.x / scaleChange.x
 *   y <- (y * scaleChange.y - origin.y * (scale.y + scaleChange.y)
 *          - scale.y * originChange.y) * scale.y / scaleChange.y
 *   z <- (z * scaleChange.z - origin.z * (scale.z + scaleChange.z)
 *          - scale.z * originChange.z) * scale.z / scaleChange.z
 *
 * @property {geo.map} map The map whose coordinates changed
 * @property {object} origin The new origin in GCS coordinates
 * @property {number} origin.x
 * @property {number} origin.y
 * @property {number} origin.z
 * @property {object} scale The new scale factor
 * @property {number} scale.x
 * @property {number} scale.y
 * @property {number} scale.z
 * @property {object} originChange Relative change from the old origin defined
 *   as `origin - oldorigin`.
 * @property {object} scaleChange Relative change from the old scale defined
 *   as `scale / oldscale`.
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.worldChanged = 'geo_worldChanged';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered on every call to {@link geo.map#draw} before the map is rendered.
 *
 * @property {geo.map} target The current map
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.draw = 'geo_draw';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered on every call to {@link geo.map#draw} after the map is rendered.
 *
 * @property {geo.map} target The current map
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.drawEnd = 'geo_drawEnd';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered on every 'mousemove' over the map's DOM element.  The event
 * object extends {@link geo.mouseState}.
 * @mixes geo.mouseState
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.mousemove = 'geo_mousemove';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered on every 'mousedown' over the map's DOM element.  The event
 * object extends {@link geo.mouseState}.
 * @mixes geo.mouseState
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.mouseclick = 'geo_mouseclick';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered on every 'mousemove' during a brushing selection.
 * The event object extends {@link geo.brushSelection}.
 * @mixes geo.brushSelection
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.brush = 'geo_brush';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered after a brush selection ends.
 * The event object extends {@link geo.brushSelection}.
 * @mixes geo.brushSelection
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.brushend = 'geo_brushend';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered when a brush selection starts.
 * The event object extends {@link geo.brushSelection}.
 * @mixes geo.brushSelection
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.brushstart = 'geo_brushstart';


//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered before a map navigation animation begins.  Set
 * <code>event.geo.cancelAnimation</code> to cancel the animation
 * of the navigation.  This will cause the map to navigate to the
 * target location immediately.  Set <code>event.geo.cancelNavigation</code>
 * to cancel the navigation completely.  The transition options can
 * be modified in place.
 *
 * @property {geo.geoPosition} center The target center
 * @property {number} zoom The target zoom level
 * @property {number} duration The duration of the transition in milliseconds
 * @property {function} ease The easing function
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.transitionstart = 'geo_transitionstart';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered after a map navigation animation ends.
 *
 * @property {geo.geoPosition} center The target center
 * @property {number} zoom The target zoom level
 * @property {number} duration The duration of the transition in milliseconds
 * @property {function} ease The easing function
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.transitionend = 'geo_transitionend';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered when the parallel projection mode is changes.
 *
 * @property paralellProjection {boolean} True if parallel projection is turned
 *                                        on.
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.parallelprojection = 'geo_parallelprojection';

////////////////////////////////////////////////////////////////////////////
/**
 * @namespace
 */
////////////////////////////////////////////////////////////////////////////
geo.event.clock = {
  play: 'geo_clock_play',
  stop: 'geo_clock_stop',
  pause: 'geo_clock_pause',
  change: 'geo_clock_change'
};

////////////////////////////////////////////////////////////////////////////
/**
 * This event object provides mouse/keyboard events that can be handled
 * by the features.  This provides a similar interface as core events,
 * but with different names so the events don't interfere.  Subclasses
 * can override this to provide custom events.
 *
 * These events will only be triggered on features which were instantiated
 * with the option 'selectionAPI'.
 * @namespace
 */
////////////////////////////////////////////////////////////////////////////
geo.event.feature = {
  mousemove:  'geo_feature_mousemove',
  mouseover:  'geo_feature_mouseover',
  mouseout:   'geo_feature_mouseout',
  mouseon:    'geo_feature_mouseon',
  mouseoff:   'geo_feature_mouseoff',
  mouseclick: 'geo_feature_mouseclick',
  brushend:   'geo_feature_brushend',
  brush:      'geo_feature_brush'
};

////////////////////////////////////////////////////////////////////////////
/**
 * These events are triggered by the camera when it's internal state is
 * mutated.
 * @namespace
 */
////////////////////////////////////////////////////////////////////////////
geo.event.camera = {};

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered after a general view matrix change (any change in the visible
 * bounds).  This is equivalent to the union of pan and zoom.
 *
 * @property {geo.camera} camera The camera instance
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.camera.view = 'geo_camera_view';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered after a pan in the x/y plane (no zoom level change).
 *
 * @property {geo.camera} camera The camera instance
 * @property {object} delta The translation delta in world coordinates.
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.camera.pan = 'geo_camera_pan';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered after a view matrix change that is not a simple pan.  This
 * includes, but is not limited to, pure zooms.
 *
 * @property {geo.camera} camera The camera instance
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.camera.zoom = 'geo_camera_zoom';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered after a projection change.
 *
 * @property {geo.camera} camera The camera instance
 * @property {string} type The projection type ('perspective'|'parallel')
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.camera.projection = 'geo_camera_projection';

//////////////////////////////////////////////////////////////////////////////
/**
 * Triggered after a viewport change.
 *
 * @property {geo.camera} camera The camera instance
 * @property {object} viewport The new viewport
 * @property {number} viewport.width The new width
 * @property {number} viewport.height The new height
 */
//////////////////////////////////////////////////////////////////////////////
geo.event.camera.viewport = 'geo_camera_viewport';

//////////////////////////////////////////////////////////////////////////////
/**
 * The mapInteractor class is responsible for handling raw events from the
 * browser and interpreting them as map navigation interactions.  This class
 * will call the navigation methods on the connected map, which will make
 * modifications to the camera directly.
 *
 * @class
 * @extends geo.object
 * @returns {geo.mapInteractor}
 */
//////////////////////////////////////////////////////////////////////////////
geo.mapInteractor = function (args) {
  'use strict';
  if (!(this instanceof geo.mapInteractor)) {
    return new geo.mapInteractor(args);
  }
  geo.object.call(this);

  var m_options = args || {},
      m_this = this,
      m_mouse,
      m_keyboard,
      m_state,
      m_queue,
      $node,
      m_selectionLayer = null,
      m_selectionPlane = null,
      m_paused = false,
      m_clickMaybe = false,
      m_callZoom = function () {};

  // Helper method to decide if the current button/modifiers match a set of
  // conditions.
  // button: 'left' | 'right' | 'middle'
  // modifiers: [ 'alt' | 'meta' | 'ctrl' | 'shift' ]
  function eventMatch(button, modifiers) {
    /* jshint -W018 */
    return (button === 'wheel' || m_mouse.buttons[button]) &&
      (!!m_mouse.modifiers.alt)   === (!!modifiers.alt)   &&
      (!!m_mouse.modifiers.meta)  === (!!modifiers.meta)  &&
      (!!m_mouse.modifiers.shift) === (!!modifiers.shift) &&
      (!!m_mouse.modifiers.ctrl)  === (!!modifiers.ctrl);
    /* jshint +W018 */
  }

  // Helper method to calculate the speed from a velocity
  function calcSpeed(v) {
    var x = v.x, y = v.y;
    return Math.sqrt(x * x + y * y);
  }

  // copy the options object with defaults
  m_options = $.extend(
    true,
    {},
    {
      throttle: 30,
      discreteZoom: false,
      panMoveButton: 'left',
      panMoveModifiers: {},
      zoomMoveButton: 'right',
      zoomMoveModifiers: {},
      rotateMoveButton: 'left',
      rotateMoveModifiers: {'ctrl': true},
      panWheelEnabled: false,
      panWheelModifiers: {},
      zoomWheelEnabled: true,
      zoomWheelModifiers: {},
      rotateWheelEnabled: true,
      rotateWheelModifiers: {'ctrl': true},
      wheelScaleX: 1,
      wheelScaleY: 1,
      zoomScale: 1,
      rotateWheelScale: 6 * Math.PI / 180,
      selectionButton: 'left',
      selectionModifiers: {'shift': true},
      momentum: {
        enabled: true,
        maxSpeed: 2.5,
        minSpeed: 0.01,
        drag: 0.01
      },
      spring: {
        enabled: false,
        springConstant: 0.00005
      },
      click: {
        enabled: true,
        buttons: {left: true, right: true, middle: true},
        duration: 0,
        cancelOnMove: true
      }
    },
    m_options
  );

  // options supported:
  // {
  //   // throttle mouse events to at most this many milliseconds each (default 30)
  //   throttle: number
  //
  //   // Clamp zoom events to discrete (integer) zoom levels.  If a number is
  //   // provided then zoom events will be debounced (and accumulated)
  //   // with the given delay.  The default debounce interval is 400 ms.
  //   discreteZoom: boolean | number > 0
  //
  //   // button that must be pressed to initiate a pan on mousedown
  //   panMoveButton: 'right' | 'left' | 'middle'
  //
  //   // modifier keys that must be pressed to initiate a pan on mousemove
  //   panMoveModifiers: { 'ctrl' | 'alt' | 'meta' | 'shift' }
  //
  //   // button that must be pressed to initiate a zoom on mousedown
  //   zoomMoveButton: 'right' | 'left' | 'middle'
  //
  //   // modifier keys that must be pressed to initiate a zoom on mousemove
  //   zoomMoveModifiers: { 'ctrl' | 'alt' | 'meta' | 'shift' }
  //
  //   // button that must be pressed to initiate a rotate on mousedown
  //   rotateMoveButton: 'right' | 'left' | 'middle'
  //
  //   // modifier keys that must be pressed to initiate a rotate on mousemove
  //   rotateMoveModifiers: { 'ctrl' | 'alt' | 'meta' | 'shift' }
  //
  //   // enable or disable panning with the mouse wheel
  //   panWheelEnabled: true | false
  //
  //   // modifier keys that must be pressed to trigger a pan on wheel
  //   panWheelModifiers: {...}
  //
  //   // enable or disable zooming with the mouse wheel
  //   zoomWheelEnabled: true | false
  //
  //   // modifier keys that must be pressed to trigger a zoom on wheel
  //   zoomWheelModifiers: {...}
  //
  //   // enable or disable rotation with the mouse wheel
  //   rotateWheelEnabled: true | false
  //
  //   // modifier keys that must be pressed to trigger a rotate on wheel
  //   rotateWheelModifiers: {...}
  //
  //   // wheel scale factor to change the magnitude of wheel interactions
  //   wheelScaleX: 1
  //   wheelScaleY: 1
  //
  //   // zoom scale factor to change the magnitude of zoom move interactions
  //   zoomScale: 1
  //
  //   // scale factor to change the magnitude of wheel rotation interactions
  //   rotateWheelScale: 1
  //
  //   // button that must be pressed to enable drag selection
  //    selectionButton: 'right' | 'left' | 'middle'
  //
  //   // keyboard modifiers that must be pressed to initiate a selection
  //   selectionModifiers: {...}
  //
  //   // enable momentum when panning
  //   momentum: {
  //     enabled: true | false,
  //     drag: number, // drag coefficient
  //     maxSpeed: number, // don't allow animation to pan faster than this
  //     minSpeed: number  // stop animations if the speed is less than this
  //   }
  //
  //   // enable spring clamping to screen edges to enforce clamping
  //   spring: {
  //     enabled: true | false,
  //     springConstant: number,
  //   }
  //
  //   // enable the "click" event
  //   // A click will be registered when a mouse down is followed
  //   // by a mouse up in less than the given number of milliseconds
  //   // and the standard handler will *not* be called
  //   // If the duration is <= 0, then clicks will only be canceled by
  //   // a mousemove.
  //   click: {
  //     enabled: true | false,
  //     buttons: {'left': true, 'right': true, 'middle': true}
  //     duration: 0,
  //     cancelOnMove: true // cancels click if the mouse is moved before release
  //   }
  // }

  // A bunch of type definitions for api documentation:
  /**
   * General representation of rectangular bounds in world coordinates
   * @typedef geo.geoBounds
   * @type {object}
   * @property {geo.geoPosition} upperLeft Upper left corner
   * @property {geo.geoPosition} upperRight Upper right corner
   * @property {geo.geoPosition} lowerLeft Lower left corner
   * @property {geo.geoPosition} lowerRight Lower right corner
   */

  /**
   * General representation of rectangular bounds in pixel coordinates
   * @typedef geo.screenBounds
   * @type {object}
   * @property {geo.screenPosition} upperLeft Upper left corner
   * @property {geo.screenPosition} upperRight Upper right corner
   * @property {geo.screenPosition} lowerLeft Lower left corner
   * @property {geo.screenPosition} lowerRight Lower right corner
   */

  /**
   * General representation of a point on the screen.
   * @typedef geo.screenPosition
   * @type {object}
   * @property {Number} x Horizontal coordinate in pixels
   * @property {Number} y Vertical coordinate in pixels
   */

  /**
   * General represention of a point on the earth.
   * @typedef geo.geoPosition
   * @type {object}
   * @property {Number} x Horizontal coordinate in degrees longitude
   * @property {Number} y Vertical coordinate in degrees latitude
   */

  /**
   * The status of all mouse buttons.
   * @typedef geo.mouseButtons
   * @type {object}
   * @property {true|false} left The left mouse button
   * @property {true|false} right The right mouse button
   * @property {true|false} middle The middle mouse button
   */

  /**
   * The status of all modifier keys these are copied from the
   * standard DOM events.
   * @typedef geo.modifierKeys
   * @type {object}
   * @property {true|false} alt <code>Event.alt</code>
   * @property {true|false} ctrl <code>Event.ctrl</code>
   * @property {true|false} shift <code>Event.shift</code>
   * @property {true|false} meta <code>Event.meta</code>
   */

  /**
   * Provides information about the state of the mouse
   * @typedef geo.mouseState
   * @type {object}
   * @property {geo.screenPosition} page Mouse location in pixel space
   * @property {geo.geoPosition} map Mouse location in world space
   * @property {geo.mouseButtons} buttons The current state of the mouse buttons
   * @property {geo.modifierKeys} modifiers The current state of all modifier keys
   * @property {Date} time The timestamp the event took place
   * @property {Number} deltaTime The time in milliseconds since the last mouse event
   * @property {geo.screenPosition} velocity The velocity of the mouse pointer
   * in pixels per second
   */

  /**
   * @typedef geo.brushSelection
   * @type {object}
   * @property {geo.screenBounds} display The selection bounds in pixel space
   * @property {geo.geoBounds} gcs The selection bounds in world space
   * @property {geo.mouseState} mouse The current mouse state
   * @property {geo.mouseState} origin The mouse state at the start of the
   * brush action
   */


  // default mouse object
  m_mouse = {
    page: { // mouse position relative to the page
      x: 0,
      y: 0
    },
    map: { // mouse position relative to the map
      x: 0,
      y: 0
    },
    // mouse button status
    buttons: {
      left: false,
      right: false,
      middle: false
    },
    // keyboard modifier status
    modifiers: {
      alt: false,
      ctrl: false,
      shift: false,
      meta: false
    },
    // time the event was captured
    time: new Date(),
    // time elapsed since the last mouse event
    deltaTime: 1,
    // pixels/ms
    velocity: {
      x: 0,
      y: 0
    }
  };

  // default keyboard object
  // (keyboard events not implemented yet)
  m_keyboard = {
  };

  // The interactor state determines what actions are taken in response to
  // core browser events.
  //
  // i.e.
  //  {
  //    'action': 'pan',      // an ongoing pan event
  //    'origin': {...},      // mouse object at the start of the action
  //    'delta': {x: *, y: *} // mouse movement since action start
  //                          // not including the current event
  //  }
  //
  //  {
  //    'action': 'zoom',  // an ongoing zoom event
  //    ...
  //  }
  //
  //  {
  //    'action': 'rotate',   // an ongoing rotate event
  //    'origin': {...},      // mouse object at the start of the action
  //    'delta': {x: *, y: *} // mouse movement since action start
  //                          // not including the current event
  //  }
  //
  //  {
  //    'acton': 'select',
  //    'origin': {...},
  //    'delta': {x: *, y: *}
  //  }
  //
  //  {
  //    'action': 'momentum',
  //    'origin': {...},
  //    'handler': function () { }, // called in animation loop
  //    'timer': animate loop timer
  //  }
  m_state = {};

  /**
   * Store queued map navigation commands (due to throttling) here
   * {
   *   kind: 'move' | 'wheel',  // what kind of mouse action triggered this
   *   method: function () {},  // the throttled method
   *   scroll: {x: ..., y: ...} // accumulated scroll wheel deltas
   * }
   */
  m_queue = {};

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Connects events to a map.  If the map is not set, then this does nothing.
   * @returns {geo.mapInteractor}
   */
  ////////////////////////////////////////////////////////////////////////////
  this._connectEvents = function () {
    if (!m_options.map) {
      return m_this;
    }

    // prevent double binding to dom elements
    m_this._disconnectEvents();

    // store the connected element
    $node = $(m_options.map.node());

    // set methods related to asyncronous event handling
    m_this._handleMouseWheel = throttled_wheel();
    m_callZoom = debounced_zoom();

    // add event handlers
    $node.on('wheel.geojs', m_this._handleMouseWheel);
    $node.on('mousemove.geojs', m_this._handleMouseMove);
    $node.on('mousedown.geojs', m_this._handleMouseDown);
    $node.on('mouseup.geojs', m_this._handleMouseUp);
    // Disable dragging images and such
    $node.on('dragstart', function () { return false; });
    if (m_options.panMoveButton === 'right' ||
        m_options.zoomMoveButton === 'right' ||
        m_options.rotateMoveButton === 'right' ||
        m_options.selectionButton === 'right') {
      $node.on('contextmenu.geojs', function () { return false; });
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Disonnects events to a map.  If the map is not set, then this does nothing.
   * @returns {geo.mapInteractor}
   */
  ////////////////////////////////////////////////////////////////////////////
  this._disconnectEvents = function () {
    if ($node) {
      $node.off('.geojs');
      $node = null;
    }
    m_this._handleMouseWheel = function () {};
    m_callZoom = function () {};
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Sets or gets map for this interactor, adds draw region layer if needed
   *
   * @param {geo.map} newMap optional
   * @returns {geo.interactorStyle|geo.map}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.map = function (val) {
    if (val !== undefined) {
      m_options.map = val;
      m_this._connectEvents();
      return m_this;
    }
    return m_options.map;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Gets/sets the options object for the interactor.
   *
   * @param {Object} opts optional
   * @returns {geo.interactorStyle|Object}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.options = function (opts) {
    if (opts === undefined) {
      return $.extend({}, m_options);
    }
    $.extend(m_options, opts);

    // reset event handlers for new options
    this._connectEvents();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Stores the current mouse position from an event
   */
  ////////////////////////////////////////////////////////////////////////////
  this._getMousePosition = function (evt) {
    var offset = $node.offset(), dt, t;

    t = (new Date()).valueOf();
    dt = t - m_mouse.time;
    m_mouse.time = t;
    m_mouse.deltaTime = dt;
    m_mouse.velocity = {
      x: (evt.pageX - m_mouse.page.x) / dt,
      y: (evt.pageY - m_mouse.page.y) / dt
    };
    m_mouse.page = {
      x: evt.pageX,
      y: evt.pageY
    };
    m_mouse.map = {
      x: evt.pageX - offset.left,
      y: evt.pageY - offset.top
    };
    try {
      m_mouse.geo = m_this.map().displayToGcs(m_mouse.map);
    } catch (e) {
      // catch georeferencing problems and move on
      // needed for handling the map before the base layer
      // is attached
      m_mouse.geo = null;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Stores the current mouse button
   */
  ////////////////////////////////////////////////////////////////////////////
  this._getMouseButton = function (evt) {
    if (evt.which === 1) {
      m_mouse.buttons.left = evt.type !== 'mouseup';
    } else if (evt.which === 3) {
      m_mouse.buttons.right = evt.type !== 'mouseup';
    } else if (evt.which === 2) {
      m_mouse.buttons.middle = evt.type !== 'mouseup';
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Stores the current keyboard modifiers
   */
  ////////////////////////////////////////////////////////////////////////////
  this._getMouseModifiers = function (evt) {
    m_mouse.modifiers.alt = evt.altKey;
    m_mouse.modifiers.ctrl = evt.ctrlKey;
    m_mouse.modifiers.meta = evt.metaKey;
    m_mouse.modifiers.shift = evt.shiftKey;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Compute a selection information object.
   * @private
   * @returns {Object}
   */
  ////////////////////////////////////////////////////////////////////////////
  this._getSelection = function () {
    var origin = m_state.origin,
        mouse = m_this.mouse(),
        map = m_this.map(),
        display = {}, gcs = {};

    // TODO: clamp to map bounds
    // Get the display coordinates
    display.upperLeft = {
      x: Math.min(origin.map.x, mouse.map.x),
      y: Math.min(origin.map.y, mouse.map.y)
    };

    display.lowerRight = {
      x: Math.max(origin.map.x, mouse.map.x),
      y: Math.max(origin.map.y, mouse.map.y)
    };

    display.upperRight = {
      x: display.lowerRight.x,
      y: display.upperLeft.y
    };

    display.lowerLeft = {
      x: display.upperLeft.x,
      y: display.lowerRight.y
    };

    // Get the gcs coordinates
    gcs.upperLeft = map.displayToGcs(display.upperLeft);
    gcs.lowerRight = map.displayToGcs(display.lowerRight);
    gcs.upperRight = map.displayToGcs(display.upperRight);
    gcs.lowerLeft = map.displayToGcs(display.lowerLeft);

    m_selectionPlane.origin([
      display.lowerLeft.x,
      display.lowerLeft.y,
      0
    ]);
    m_selectionPlane.upperLeft([
      display.upperLeft.x,
      display.upperLeft.y,
      0
    ]);
    m_selectionPlane.lowerRight([
      display.lowerRight.x,
      display.lowerRight.y,
      0
    ]);
    m_selectionPlane.draw();

    return {
      display: display,
      gcs: gcs,
      mouse: mouse,
      origin: $.extend({}, m_state.origin)
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Immediately cancel an ongoing action.
   *
   * @param {string?} action The action type, if null cancel any action
   * @returns {bool} If an action was canceled
   */
  ////////////////////////////////////////////////////////////////////////////
  this.cancel = function (action) {
    var out;
    if (!action) {
      out = !!m_state.action;
    } else {
      out = m_state.action === action;
    }
    if (out) {
      // cancel any queued interaction events
      m_queue = {};
      m_state = {};
    }
    return out;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle event when a mouse button is pressed
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleMouseDown = function (evt) {
    var action = null;

    if (m_paused) {
      return;
    }

    // cancel momentum on click
    m_this.cancel('momentum');

    m_this._getMousePosition(evt);
    m_this._getMouseButton(evt);
    m_this._getMouseModifiers(evt);

    if (m_options.click.enabled &&
        (!m_mouse.buttons.left || m_options.click.buttons.left) &&
        (!m_mouse.buttons.right || m_options.click.buttons.right) &&
        (!m_mouse.buttons.middle || m_options.click.buttons.middle)) {
      m_clickMaybe = true;
      if (m_options.click.duration > 0) {
        window.setTimeout(function () {
          m_clickMaybe = false;
        }, m_options.click.duration);
      }
    }
    if (eventMatch(m_options.panMoveButton, m_options.panMoveModifiers)) {
      action = 'pan';
    } else if (eventMatch(m_options.zoomMoveButton, m_options.zoomMoveModifiers)) {
      action = 'zoom';
    } else if (eventMatch(m_options.rotateMoveButton, m_options.rotateMoveModifiers)) {
      action = 'rotate';
    } else if (eventMatch(m_options.selectionButton, m_options.selectionModifiers)) {
      action = 'select';
    }

    m_mouse.velocity = {
      x: 0,
      y: 0
    };

    if (action) {
      // cancel any ongoing interaction queue
      m_queue = {
        kind: 'move'
      };

      // store the state object
      m_state = {
        action: action,
        origin: $.extend(true, {}, m_mouse),
        delta: {x: 0, y: 0}
      };

      if (action === 'select') {
        // Make sure the old selection layer is gone.
        if (m_selectionLayer) {
          m_selectionLayer.clear();
          m_this.map().deleteLayer(m_selectionLayer);
          m_selectionLayer = null;
        }
        // Create a feature layer and plane feature to show the selection bounds
        m_selectionLayer = m_this.map().createLayer('feature', {renderer: 'd3'});
        m_selectionPlane = m_selectionLayer.createFeature('plane');
        m_selectionPlane.style({
          screenCoordinates: true,
          fillOpacity: function () { return 0.25; }
        });
        m_this.map().geoTrigger(geo.event.brushstart, m_this._getSelection());
      }

      // bind temporary handlers to document
      if (m_options.throttle > 0) {
        $(document).on(
          'mousemove.geojs',
          geo.util.throttle(
            m_options.throttle,
            m_this._handleMouseMoveDocument
          )
        );
      } else {
        $(document).on('mousemove.geojs', m_this._handleMouseMoveDocument);
      }
      $(document).on('mouseup.geojs', m_this._handleMouseUpDocument);
    }

  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse move event
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleMouseMove = function (evt) {

    if (m_paused) {
      return;
    }

    if (m_state.action) {
      // If currently performing a navigation action, the mouse
      // coordinates will be captured by the document handler.
      return;
    }

    if (m_options.click.cancelOnMove) {
      m_clickMaybe = false;
    }

    m_this._getMousePosition(evt);
    m_this._getMouseButton(evt);
    m_this._getMouseModifiers(evt);

    if (m_clickMaybe) {
      return;
    }

    m_this.map().geoTrigger(geo.event.mousemove, m_this.mouse());
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse move event on the document (temporary bindings)
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleMouseMoveDocument = function (evt) {
    var dx, dy, selectionObj;

    if (m_paused || m_queue.kind !== 'move') {
      return;
    }

    m_this._getMousePosition(evt);
    m_this._getMouseButton(evt);
    m_this._getMouseModifiers(evt);


    if (m_options.click.cancelOnMove) {
      m_clickMaybe = false;
    }
    if (m_clickMaybe) {
      return;
    }

    if (!m_state.action) {
      // This shouldn't happen
      console.log('WARNING: Invalid state in mapInteractor.');
      return;
    }

    // calculate the delta from the origin point to avoid
    // accumulation of floating point errors
    dx = m_mouse.map.x - m_state.origin.map.x - m_state.delta.x;
    dy = m_mouse.map.y - m_state.origin.map.y - m_state.delta.y;
    m_state.delta.x += dx;
    m_state.delta.y += dy;

    if (m_state.action === 'pan') {
      m_this.map().pan({x: dx, y: dy});
    } else if (m_state.action === 'zoom') {
      m_callZoom(-dy * m_options.zoomScale / 120, m_state);
    } else if (m_state.action === 'rotate') {
      var cx, cy;
      if (m_state.origin.rotation === undefined) {
        cx = m_state.origin.map.x - m_this.map().size().width / 2;
        cy = m_state.origin.map.y - m_this.map().size().height / 2;
        m_state.origin.rotation = m_this.map().rotation() - Math.atan2(cy, cx);
      }
      cx = m_mouse.map.x - m_this.map().size().width / 2;
      cy = m_mouse.map.y - m_this.map().size().height / 2;
      m_this.map().rotation(m_state.origin.rotation + Math.atan2(cy, cx));
    } else if (m_state.action === 'select') {
      // Get the bounds of the current selection
      selectionObj = m_this._getSelection();
      m_this.map().geoTrigger(geo.event.brush, selectionObj);
    }

    // Prevent default to stop text selection in particular
    evt.preventDefault();
  };

  /**
   * Use interactor options to modify the mouse velocity by momentum
   * or spring equations depending on the current map state.
   * @private
   * @param {object} v Current velocity in pixels / ms
   * @param {number} deltaT The time delta
   * @returns {object} New velocity
   */
  function modifyVelocity(v, deltaT) {
    deltaT = deltaT <= 0 ? 30 : deltaT;
    var sf = springForce();
    var speed = calcSpeed(v);
    var vx = v.x / speed;
    var vy = v.y / speed;

    speed = speed * Math.exp(-m_options.momentum.drag * deltaT);

    // |force| + |velocity| < c <- stopping condition
    if (calcSpeed(sf) * deltaT + speed < m_options.momentum.minSpeed) {
      return null;
    }

    if (speed > 0) {
      vx = vx * speed;
      vy = vy * speed;
    } else {
      vx = 0;
      vy = 0;
    }

    return {
      x: vx - sf.x * deltaT,
      y: vy - sf.y * deltaT
    };
  }

  /**
   * Get the spring force for the current map bounds
   * (This method might need to move elsewhere to deal
   * with different projections)
   * @private
   * @returns {object} The spring force
   */
  function springForce() {
    var xplus,  // force to the right
        xminus, // force to the left
        yplus,  // force to the top
        yminus; // force to the bottom

    if (!m_options.spring.enabled) {
      return {x: 0, y: 0};
    }
    // get screen coordinates of corners
    var ul = m_this.map().gcsToDisplay({
      x: -180,
      y: 82
    });
    var lr = m_this.map().gcsToDisplay({
      x: 180,
      y: -82
    });

    var c = m_options.spring.springConstant;
    // Arg... map needs to expose the canvas size
    var width = m_this.map().node().width();
    var height = m_this.map().node().height();

    xplus = c * Math.max(0, ul.x);
    xminus = c * Math.max(0, width - lr.x);
    yplus = c * Math.max(0, ul.y) / 2;
    yminus = c * Math.max(0, height - lr.y) / 2;

    return {
      x: xplus - xminus,
      y: yplus - yminus
    };
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle event when a mouse button is unpressed on the document.
   * Removes temporary bindings.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleMouseUpDocument = function (evt) {
    var selectionObj, oldAction;

    if (m_paused) {
      return;
    }

    // cancel queued interactions
    m_queue = {};

    m_clickMaybe = false;
    m_this._getMouseButton(evt);
    m_this._getMouseModifiers(evt);

    // unbind temporary handlers on document
    $(document).off('.geojs');

    if (m_mouse.buttons.right) {
      evt.preventDefault();
    }

    if (m_state.action === 'select') {
      selectionObj = m_this._getSelection();

      m_selectionLayer.clear();
      m_this.map().deleteLayer(m_selectionLayer);
      m_selectionLayer = null;
      m_selectionPlane = null;

      m_this.map().geoTrigger(geo.event.brushend, selectionObj);
    }

    // reset the interactor state
    oldAction = m_state.action;
    m_state = {};

    // if momentum is enabled, start the action here
    if (m_options.momentum.enabled && oldAction === 'pan') {
      m_this.springBack(true);
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle event when a mouse button is unpressed
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleMouseUp = function (evt) {

    if (m_paused) {
      return;
    }

    if (m_clickMaybe) {
      m_this._handleMouseClick(evt);
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle event when a mouse click is detected.  A mouse click is a simulated
   * event that occurs when the time between a mouse down and mouse up
   * is less than the configured duration and (optionally) if no mousemove
   * events were triggered in the interim.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleMouseClick = function (evt) {

    m_this._getMouseButton(evt);
    m_this._getMouseModifiers(evt);

    // cancel any ongoing pan action
    m_this.cancel('pan');

    // unbind temporary handlers on document
    $(document).off('.geojs');

    // reset click detector variable
    m_clickMaybe = false;

    // fire a click event
    m_this.map().geoTrigger(geo.event.mouseclick, m_this.mouse());
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private wrapper around the map zoom method that is debounced to support
   * discrete zoom interactions.
   * @param {number} deltaZ The zoom increment
   */
  ////////////////////////////////////////////////////////////////////////////
  function debounced_zoom() {
    var deltaZ = 0, delay = 400, direction;

    function accum(dz, dir) {
      var map = m_this.map(), zoom;

      direction = dir;
      deltaZ += dz;

      // Respond to debounced events when they add up to a change in the
      // discrete zoom level.
      if (map && Math.abs(deltaZ) >= 1 && m_options.discreteZoom) {

        zoom = Math.round(deltaZ + map.zoom());

        // delta is what is left over from the zoom delta after the new zoom value
        deltaZ = deltaZ + map.zoom() - zoom;

        map.zoom(zoom, direction);
      }
    }

    function apply() {
      var map = m_this.map(), zoom;
      if (map) {

        zoom = deltaZ + map.zoom();

        if (m_options.discreteZoom) {
          // round off the zoom to an integer and throw away the rest
          zoom = Math.round(zoom);
        }
        map.zoom(zoom, direction);
      }

      deltaZ = 0;
    }


    if (m_options.discreteZoom !== true && m_options.discreteZoom > 0) {
      delay = m_options.discreteZoom;
    }
    if (m_options.discreteZoom === true || m_options.discreteZoom > 0) {
      return geo.util.debounce(delay, false, apply, accum);
    } else {
      return function (dz, dir) {
        accum(dz, dir);
        apply(dz, dir);
      };
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Attaches wrapped methods for accumulating fast mouse wheel events and
   * throttling map interactions.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function throttled_wheel() {
    var my_queue = {};

    function accum(evt) {
      var dx, dy;

      if (m_paused) {
        return;
      }

      if (my_queue !== m_queue) {
        my_queue = {
          kind: 'wheel',
          scroll: {x: 0, y: 0}
        };
        m_queue = my_queue;
      }

      evt.preventDefault();

      // try to normalize deltas using the wheel event standard:
      //   https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent
      evt.deltaFactor = 1;
      if (evt.originalEvent.deltaMode === 1) {
        // DOM_DELTA_LINE -- estimate line height
        evt.deltaFactor = 40;
      } else if (evt.originalEvent.deltaMode === 2) {
        // DOM_DELTA_PAGE -- get window height
        evt.deltaFactor = $(window).height();
      }

      // prevent NaN's on legacy browsers
      dx = evt.originalEvent.deltaX || 0;
      dy = evt.originalEvent.deltaY || 0;

      // scale according to the options
      dx = dx * m_options.wheelScaleX * evt.deltaFactor / 120;
      dy = dy * m_options.wheelScaleY * evt.deltaFactor / 120;

      my_queue.scroll.x += dx;
      my_queue.scroll.y += dy;
    }

    function wheel(evt) {
      var zoomFactor;

      // If the current queue doesn't match the queue passed in as an argument,
      // assume it was cancelled and do nothing.
      if (my_queue !== m_queue) {
        return;
      }

      // perform the map navigation event
      m_this._getMouseModifiers(evt);
      if (m_options.panWheelEnabled &&
          eventMatch('wheel', m_options.panWheelModifiers)) {

        m_this.map().pan({
          x: m_queue.scroll.x,
          y: m_queue.scroll.y
        });

      } else if (m_options.zoomWheelEnabled &&
                 eventMatch('wheel', m_options.zoomWheelModifiers)) {

        zoomFactor = -m_queue.scroll.y;

        m_callZoom(zoomFactor, m_mouse);
      } else if (m_options.rotateWheelEnabled &&
                 eventMatch('wheel', m_options.rotateWheelModifiers)) {
        m_this.map().rotation(
            m_this.map().rotation() +
            m_queue.scroll.y * m_options.rotateWheelScale,
            m_mouse);
      }

      // reset the queue
      m_queue = {};
    }

    if (m_options.throttle > 0) {
      return geo.util.throttle(m_options.throttle, false, wheel, accum);
    } else {
      return function (evt) {
        accum(evt);
        wheel(evt);
      };
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle mouse wheel event.  (Defined inside _connectEvents).
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleMouseWheel = function () {};

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Start up a spring back action when the map bounds are out of range.
   * Not to be user callable.
   * @todo Move this and momentum handling to the map class
   * @protected
   *
   */
  ////////////////////////////////////////////////////////////////////////////
  this.springBack = function (initialVelocity) {
    if (m_state.action === 'momentum') {
      return;
    }
    if (!initialVelocity) {
      m_mouse.velocity = {
        x: 0,
        y: 0
      };
    }
    m_state.action = 'momentum';
    m_state.origin = m_this.mouse();
    m_state.start = new Date();
    m_state.handler = function () {
      var v, s, last, dt;

      // Not sure the correct way to do this.  We need the delta t for the
      // next time step...  Maybe use a better interpolator and the time
      // parameter from requestAnimationFrame.
      dt = Math.min(m_mouse.deltaTime, 30);
      if (m_state.action !== 'momentum' ||
          !m_this.map() ||
          m_this.map().transition()) {
        // cancel if a new action was performed
        return;
      }

      last = m_state.start.valueOf();
      m_state.start = new Date();

      v = modifyVelocity(m_mouse.velocity, m_state.start - last);

      // stop panning when the speed is below the threshold
      if (!v) {
        m_state = {};
        return;
      }

      s = calcSpeed(v);
      if (s > m_options.momentum.maxSpeed) {
        s = m_options.momentum.maxSpeed / s;
        v.x = v.x * s;
        v.y = v.y * s;
      }

      if (!isFinite(v.x) || !isFinite(v.y)) {
        v.x = 0;
        v.y = 0;
      }
      m_mouse.velocity.x = v.x;
      m_mouse.velocity.y = v.y;

      m_this.map().pan({
        x: m_mouse.velocity.x * dt,
        y: m_mouse.velocity.y * dt
      });

      if (m_state.handler) {
        window.requestAnimationFrame(m_state.handler);
      }
    };
    if (m_state.handler) {
      window.requestAnimationFrame(m_state.handler);
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle double click event
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleDoubleClick = function () {
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Public method that unbinds all events
   */
  ////////////////////////////////////////////////////////////////////////////
  this.destroy = function () {
    m_this._disconnectEvents();
    m_this.map(null);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get current mouse information
   */
  ////////////////////////////////////////////////////////////////////////////
  this.mouse = function () {
    return $.extend(true, {}, m_mouse);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get current keyboard information
   */
  ////////////////////////////////////////////////////////////////////////////
  this.keyboard = function () {
    return $.extend(true, {}, m_keyboard);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the current interactor state
   */
  ////////////////////////////////////////////////////////////////////////////
  this.state = function () {
    return $.extend(true, {}, m_state);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the pause state of the interactor, which
   * ignores all native mouse and keyboard events.
   *
   * @param {bool} [value] The pause state to set or undefined to return the
   *                        current state.
   * @returns {bool|this}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.pause = function (value) {
    if (value === undefined) {
      return m_paused;
    }
    m_paused = !!value;
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Simulate a DOM mouse event on connected map.
   *
   * The options for creating the events are as follows, not all
   * options are required for every event type. ::
   *
   *   options = {
   *     page: {x, y} // position on the page
   *     map: {x, y}  // position on the map (overrides page)
   *     button: 'left' | 'right' | 'middle'
   *     modifiers: [ 'alt' | 'ctrl' | 'meta' | 'shift' ]
   *     wheelDelta: {x, y}
   *   }
   *
   * @param {string} type Event type 'mousemove', 'mousedown', 'mouseup', ...
   * @param {object} options
   * @returns {mapInteractor}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.simulateEvent = function (type, options) {
    var evt, page, offset, which;

    if (!m_this.map()) {
      return m_this;
    }

    page = options.page || {};

    if (options.map) {
      offset = $node.offset();
      page.x = options.map.x + offset.left;
      page.y = options.map.y + offset.top;
    }

    if (options.button === 'left') {
      which = 1;
    } else if (options.button === 'right') {
      which = 3;
    } else if (options.button === 'middle') {
      which = 2;
    }

    options.modifiers = options.modifiers || [];
    options.wheelDelta = options.wheelDelta || {};

    evt = $.Event(
      type,
      {
        pageX: page.x,
        pageY: page.y,
        which: which,
        altKey: options.modifiers.indexOf('alt') >= 0,
        ctrlKey: options.modifiers.indexOf('ctrl') >= 0,
        metaKey: options.modifiers.indexOf('meta') >= 0,
        shiftKey: options.modifiers.indexOf('shift') >= 0,
        originalEvent: {
          deltaX: options.wheelDelta.x,
          deltaY: options.wheelDelta.y,
          deltaMode: options.wheelMode
        }
      }
    );
    $node.trigger(evt);
  };
  this._connectEvents();
  return this;
};

inherit(geo.mapInteractor, geo.object);

//////////////////////////////////////////////////////////////////////////////
/**
 * Stores the current time for a map, triggers time keeping events, and
 * handles the animation state and interaction.
 *
 * @class geo.clock
 * @extends geo.object
 * @returns {geo.clock}
 */
//////////////////////////////////////////////////////////////////////////////
geo.clock = function (opts) {
  'use strict';

  if (!(this instanceof geo.clock)) {
    return new geo.clock(opts);
  }
  opts = opts || {};
  geo.object.call(this, opts);

  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      m_now = new Date(0),
      m_start = null,
      m_end = null,
      m_step = null,
      m_rate = null,
      m_loop = Number.POSITIVE_INFINITY,
      m_currentLoop = 0,
      m_state = 'stop',
      m_currentAnimation = null,
      m_object = null;

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the geo.object to trigger events on.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.object = function (arg) {
    if (arg === undefined) {
      return m_object;
    }
    m_object = arg;
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Returns true if attached to a valid geo.object.
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  this._attached = function () {
    return (m_object instanceof geo.object);
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the current time.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.now = function (arg) {
    var previous = m_now;
    if (arg === undefined) {
      return m_now;
    }
    m_now = arg;

    if (m_now !== previous &&
        m_this._attached()) {
      m_this.object().geoTrigger(geo.event.clock.change, {
        previous: previous,
        current: m_now,
        clock: m_this
      });
    }
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the animation start time.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.start = function (arg) {
    if (arg === undefined) {
      return m_start;
    }
    m_start = arg;
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the animation end time.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.end = function (arg) {
    if (arg === undefined) {
      return m_end;
    }
    m_end = arg;
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the animation time step.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.step = function (arg) {
    if (arg === undefined) {
      return m_step;
    }
    m_step = arg;
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set looping control of the clock.  This controls how many times the
   * animation will repeat before stopping.  Default
   * ``Number.POSITIVE_INFINITY``, the animation repeats forever.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.loop = function (arg) {
    if (arg === undefined) {
      return m_loop;
    }
    m_loop = arg;
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the animation state.  Valid values are:
   *
   *   * 'stop'
   *   * 'play'
   *   * 'pause'
   *
   * This will also trigger relevant events, but they may be fired
   * asynchronously.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.state = function (arg, step) {

    if (arg === undefined) {
      return m_state;
    }
    if (['stop', 'play', 'pause'].indexOf(arg) < 0) {
      console.log('WARNING: Ignored invalid state: ' + arg);
      return m_this;
    }

    if (arg === 'play' && m_state === 'stop') {
      // reset animation parameters
      m_currentLoop = 0;
      m_this.now(m_this.start());
    }

    if (arg === 'play' && m_state !== 'play') {
      // Start a new animation.
      m_state = arg;
      m_this._animate(step || 1);
    }

    m_state = arg;
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the animation frame rate.  This is approximately the number
   * of frames displayed per second.  A null value will use the browser's
   * native requestAnimationFrame to draw new frames.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.framerate = function (arg) {
    if (arg === undefined) {
      return m_rate;
    }
    m_rate = arg;
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Step to the next frame in the animation.  Pauses the animation if it is
   * playing.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.stepForward = function () {
    m_this.state('pause');
    m_this._setNextFrame(1);
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Step to the previous frame in the animation.  Pauses the animation if it is
   * playing.
   */
  //////////////////////////////////////////////////////////////////////////////
  this.stepBackward = function () {
    m_this.state('pause');
    m_this._setNextFrame(-1);
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Step to the next frame in the animation.  Will set the state to stop
   * if the animation has reached the end and there are no more loops.
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  this._setNextFrame = function (step) {
    var next = new Date(m_this.now().valueOf() + step * m_this.step());

    if (next >= m_this.end() || next <= m_this.start()) {
      if (m_this.loop() <= m_currentLoop) {
        m_this.state('stop');
        return;
      }
      m_currentLoop += 1;
      if (step >= 0) {
        m_this.now(m_this.start());
      } else {
        m_this.now(m_this.end());
      }
      return;
    }
    m_this.now(next);
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Start an animation.
   * @param {integer} step The animation frame step (+1 for forward -1 for
   *                       reverse, etc).
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  this._animate = function (step) {
    var myAnimation = {};
    m_currentAnimation = myAnimation;

    function frame() {
      if (myAnimation !== m_currentAnimation) {
        // A new animation has started, so kill this one.
        return;
      }
      m_this._setNextFrame(step);
      if (m_this.state() === 'play') {

        // Queue the next frame
        if (!m_this.framerate()) {
          window.requestAnimationFrame(frame);
        } else {
          window.setTimeout(frame, 1000 / m_this.framerate());
        }
      } else if (m_this._attached()) {
        m_this.object().geoTrigger(geo.event.clock[m_this.state()], {
          current: m_this.now(),
          clock: m_this
        });
      }
    }

    // trigger the play event
    if (m_this._attached()) {
      m_this.object().geoTrigger(geo.event.clock.play, {
        current: m_this.now(),
        clock: m_this
      });
    }

    // Queue the first frame
    if (!m_this.framerate()) {
      window.requestAnimationFrame(frame);
    } else {
      window.setTimeout(frame, 1000 / m_this.framerate());
    }
  };
};
inherit(geo.clock, geo.object);

(function () {
  'use strict';

  //////////////////////////////////////////////////////////////////////////////
  /**
   * This class defines the raw interface for a "tile" on a map.  A tile is
   * defined as a rectangular section of a map.  The base implementation
   * is independent of the actual content of the tile, but assumes that
   * the content is loaded asynchronously via a url.  The tile object
   * has a promise-like interface.  For example,
   *
   * tile.then(function (data) {...}).catch(function (data) {...});
   *
   * @class
   * @param {Object} spec The tile specification object
   *
   * @param {Object} spec.index The global position of the tile
   * @param {Number} spec.index.x The x-coordinate (usually the column number)
   * @param {Number} spec.index.y The y-coordinate (usually the row number)
   *
   * @param {Object} spec.size The size of each tile
   * @param {Number} spec.size.x Width (usually in pixels)
   * @param {Number} spec.size.y Height (usually in pixels)
   *
   * @param {Object|String} spec.url A url or jQuery ajax config object
   *
   * @param {Object?} spec.overlap The size of overlap with neighboring tiles
   * @param {Number} [spec.overlap.x=0]
   * @param {Number} [spec.overlap.y=0]
   */
  //////////////////////////////////////////////////////////////////////////////
  geo.tile = function (spec) {
    if (!(this instanceof geo.tile)) {
      return new geo.tile(spec);
    }

    this._index = spec.index;
    this._size = spec.size;
    this._overlap = spec.overlap || {x: 0, y: 0};
    this._wrap = spec.wrap || {x: 1, y: 1};
    this._url = spec.url;
    this._fetched = false;
    this._queue = spec.queue || null;

    /**
     * Return the index coordinates.
     */
    Object.defineProperty(this, 'index', {
      get:
        function () { return this._index; }
    });

    /**
     * Return the tile sizes.
     */
    Object.defineProperty(this, 'size', {
      get: function () { return this._size; }
    });

    /**
     * Return the tile overlap sizes.
     */
    Object.defineProperty(this, 'overlap', {
      get: function () { return this._overlap; }
    });

    /**
     * Initiate the ajax request and add a promise interface
     * to the tile object.  This method exists to allow
     * derived classes the ability to override how the tile
     * is obtained.  For example, imageTile uses an Image
     * element rather than $.get.
     */
    this.fetch = function () {
      if (!this._fetched) {
        $.get(this._url).then(function () {
          this._fetched = true;
        }.bind(this)).promise(this);
      }
      return this;
    };

    /**
     * Return whether this tile has been fetched already.
     *
     * @returns {boolean} True if the tile has been fetched.
     */
    this.fetched = function () {
      return this._fetched;
    };

    /**
     * Add a method to be called with the data when the ajax request is
     * successfully resolved.
     *
     * @param {function?} onSuccess The success handler
     * @param {function?} onFailure The failure handler
     * @returns {this} Supports chained calling
     *
     */
    this.then = function (onSuccess, onFailure) {
      // both fetch and _queueAdd can replace the current then method
      if (!this.fetched() && this._queue && this._queue.add && (!this.state ||
          this.state() === 'pending')) {
        this._queue.add(this, this.fetch);
      } else {
        this.fetch();
      }
      // Call then on the new promise
      this.then(onSuccess, onFailure);
      return this;
    };

    /**
     * Add a method to be called with the data when the ajax fails.
     *
     * @param {function} method The rejection handler
     * @returns {this} Supports chained calling
     *
     */
    this.catch = function (method) {
      this.then(undefined, method);
      return this;
    };

    /**
     * Return a unique string representation of the given tile useable
     * as a hash key.  Possibly extend later to include url information
     * to make caches aware of the tile source.
     * @returns {string}
     */
    this.toString = function () {
      return [this._index.level || 0, this._index.y, this._index.x].join('_');
    };

    /**
     * Return the bounds of the tile given an index offset and
     * a translation.
     *
     * @param {object} index The tile index containing (0, 0)
     * @param {object} shift The coordinates of (0, 0) inside the tile
     */
    this.bounds = function (index, shift) {
      var left, right, bottom, top;
      left = this.size.x * (this.index.x - index.x) - this.overlap.x - shift.x;
      right = left + this.size.x + this.overlap.x * 2;
      top = this.size.y * (this.index.y - index.y) - this.overlap.y - shift.y;
      bottom = top + this.size.y + this.overlap.y * 2;
      return {
        left: left,
        right: right,
        bottom: bottom,
        top: top
      };
    };

    /**
     * Computes the global coordinates of the bottom edge.
     * @returns {number}
     */
    Object.defineProperty(this, 'bottom', {
      get: function () {
        return this.size.y * (this.index.y + 1) + this.overlap.y;
      }
    });

    /**
     * Computes the global coordinates of the top edge.
     * @returns {number}
     */
    Object.defineProperty(this, 'top', {
      get: function () {
        return this.size.y * this.index.y - this.overlap.y;
      }
    });

    /**
     * Computes the global coordinates of the left edge.
     * @returns {number}
     */
    Object.defineProperty(this, 'left', {
      get: function () {
        return this.size.x * this.index.x - this.overlap.x;
      }
    });

    /**
     * Computes the global coordinates of the right edge.
     * @returns {number}
     */
    Object.defineProperty(this, 'right', {
      get: function () {
        return this.size.x * (this.index.x + 1) + this.overlap.x;
      }
    });

    /**
     * Returns the global image size at this level.
     * @returns {number}
     */
    Object.defineProperty(this, 'levelSize', {
      value: {
        width: Math.pow(2, this.index.level || 0) * this.size.x,
        height: Math.pow(2, this.index.level || 0) * this.size.y
      }
    });

    /**
     * Set the opacity of the tile to 0 and gradually fade in
     * over the given number of milliseconds.  This will also
     * resolve the embedded promise interface.
     * @param {number} duration the duration of the animation in ms
     * @returns {this} chainable
     */
    this.fadeIn = function (duration) {
      $.noop(duration);
      return this;
    };
  };
})();

(function () {
  'use strict';

  //////////////////////////////////////////////////////////////////////////////
  /**
   * This class defines a tile that is part of a standard "image pyramid", such
   * as an open street map tile set.  Every tile is uniquely indexed by a row,
   * column, and zoom level.  The number of rows/columns at zoom level z is
   * `2^z`, the number of pixels per tile is configurable.
   *
   * By default, this class assumes that images are fetch from the url, but
   * subclasses may define additional rendering steps to produce the images
   * before passing them off to the handlers.
   *
   * @class
   * @param {Object} spec The tile specification object
   *
   * @param {Object} spec.index The global position of the tile
   * @param {Number} spec.index.x The x-coordinate (usually the column number)
   * @param {Number} spec.index.y The y-coordinate (usually the row number)
   * @param {Number} spec.index.level The zoom level
   *
   * @param {Object?} spec.size The size of each tile
   * @param {Number} [spec.size.x=256] Width in pixels
   * @param {Number} [spec.size.y=256] Height in pixels
   *
   * @param {String} spec.url A url to the image
   * @param {String} [spec.crossDomain='anonymous'] Image CORS attribute
   *
   * @param {Object} spec.overlap The size of overlap with neighboring tiles
   * @param {Number} [spec.overlap.x=0]
   * @param {Number} [spec.overlap.y=0]
   */
  //////////////////////////////////////////////////////////////////////////////
  geo.imageTile = function (spec) {
    if (!(this instanceof geo.imageTile)) {
      return new geo.imageTile(spec);
    }

    spec.size = spec.size || {x: 256, y: 256};
    this._image = null;

    // Cache the coordinate scaling
    this._cors = spec.crossDomain || 'anonymous';

    // Call superclass constructor
    geo.tile.call(this, spec);

    /**
     * Read only accessor to the Image object used by the
     * tile.  Note, this method does not gaurantee that the
     * image data is available.  Use the promise interface
     * to add asyncronous handlers.
     * @returns {Image}
     */
    Object.defineProperty(this, 'image', {
      get: function () { return this._image; }
    });

    /**
     * Initiate the image request.
     */
    this.fetch = function () {
      var defer;
      if (!this._image) {
        this._image = new Image(this.size.x, this.size.y);
        // Only set the crossOrigin parameter if this is going across origins.
        if (this._url.indexOf(':') >= 0 && this._url.indexOf('/') >= 0 &&
            this._url.indexOf(':') < this._url.indexOf('/')) {
          this._image.crossOrigin = this._cors;
        }
        defer = new $.Deferred();
        this._image.onload = function () { defer.resolve(); };
        this._image.onerror = function () { defer.reject(); };
        this._image.src = this._url;

        // attach a promise interface to `this`
        defer.then(function () {
          this._fetched = true;
        }.bind(this)).promise(this);
      }
      return this;
    };

    /**
     * Set the opacity of the tile to 0 and gradually fade in
     * over the given number of milliseconds.  This will also
     * resolve the embedded promise interface.
     * @param {number} duration the duration of the animation in ms
     * @returns {this} chainable
     */
    this.fadeIn = function (duration) {
      var promise = this.fetch(), defer = new $.Deferred();
      $(this._image).css('display', 'none');
      promise.then(function () {
        $(this._image).fadeIn(duration, function () {
          defer.resolve();
        });
      }.bind(this));
      return defer.promise(this);
    };

    return this;
  };

  inherit(geo.imageTile, geo.tile);
})();

(function () {
  'use strict';

  //////////////////////////////////////////////////////////////////////////////
  /**
   * This class implements a simple cache for tile objects.  Each tile is
   * stored in cache object keyed by a configurable hashing function.  Another
   * array keeps track of last access times for each tile to purge old tiles
   * once the maximum cache size is reached.
   *
   * @class
   *
   * @param {Object?} [options] A configuratoin object for the cache
   * @param {Number} [options.size=64] The maximum number of tiles to store
   */
  //////////////////////////////////////////////////////////////////////////////
  geo.tileCache = function (options) {
    if (!(this instanceof geo.tileCache)) {
      return new geo.tileCache(options);
    }
    options = options || {};
    this._size = options.size || 64;

    /**
     * Get/set the maximum cache size.
     */
    Object.defineProperty(this, 'size', {
      get: function () { return this._size; },
      set: function (n) {
        while (this._atime.length > n) {
          this.remove(this._atime[this._atime.length - 1]);
        }
        this._size = n;
      }
    });

    /**
     * Get the current cache size.
     */
    Object.defineProperty(this, 'length', {
      get: function () { return this._atime.length; }
    });

    /**
     * Get the position of the tile in the access queue.
     * @param {string} hash The tile's hash value
     * @returns {number} The position in the queue or -1
     */
    this._access = function (hash) {
      return this._atime.indexOf(hash);
    };

    /**
     * Remove a tile from the cache.
     * @param {string|geo.tile} tile The tile or its hash
     * @returns {bool} true if a tile was removed
     */
    this.remove = function (tile) {
      var hash = typeof tile === 'string' ? tile : tile.toString();

      // if the tile is not in the cache
      if (!(hash in this._cache)) {
        return false;
      }

      // Remove the tile from the access queue
      this._atime.splice(this._access(hash), 1);

      // Remove the tile from the cache
      delete this._cache[hash];
      return true;
    };

    /**
     * Remove all tiles from the cache.
     */
    this.clear = function () {
      this._cache = {};  // The hash -> tile mapping
      this._atime = [];  // The access queue (the hashes are stored)
      return this;
    };

    /**
     * Get a tile from the cache if it exists, otherwise
     * return null.  This method also moves the tile to the
     * front of the access queue.
     *
     * @param {string|geo.tile} hash The tile or the tile hash value
     * @returns {geo.tile|null}
     */
    this.get = function (hash) {
      hash = typeof hash === 'string' ? hash : hash.toString();
      if (!(hash in this._cache)) {
        return null;
      }

      this._atime.splice(this._access(hash), 1);
      this._atime.unshift(hash);
      return this._cache[hash];
    };

    /**
     * Add a tile to the cache.
     * @param {geo.tile} tile
     * @param {function} removeFunc if specified and tiles must be purged from
     *      the cache, call this function on each tile before purging.
     * @param {boolean} noPurge if true, don't purge tiles.
     */
    this.add = function (tile, removeFunc, noPurge) {
      // remove any existing tiles with the same hash
      this.remove(tile);
      var hash = tile.toString();

      // add the tile
      this._cache[hash] = tile;
      this._atime.unshift(hash);

      if (!noPurge) {
        this.purge(removeFunc);
      }
    };

    /**
     * Purge tiles from the cache if it is full.
     * @param {function} removeFunc if specified and tiles must be purged from
     *      the cache, call this function on each tile before purging.
     */
    this.purge = function (removeFunc) {
      var hash;
      while (this._atime.length > this.size) {
        hash = this._atime.pop();
        var tile = this._cache[hash];
        if (removeFunc) {
          removeFunc(tile);
        }
        delete this._cache[hash];
      }
    };

    this.clear();
    return this;
  };
})();

(function () {
  'use strict';

  /**
   * Standard modulo operator where the output is in [0, b) for all inputs.
   * @private
   */
  function modulo(a, b) {
    return ((a % b) + b) % b;
  }

  /**
   * Pick a subdomain from a list of subdomains based on a the tile location.
   *
   * @param {number} x: the x tile coordinate.
   * @param {number} y: the y tile coordinate.
   * @param {list} subdomains: the list of known subdomains.
   */
  function m_getTileSubdomain(x, y, subdomains) {
    return subdomains[modulo(x + y, subdomains.length)];
  }

  /**
   * Returns an OSM tile server formatting function from a standard format
   * string. Replaces {s}, {z}, {x}, and {y}.
   *
   * @param {string} base The tile format string
   * @returns: a conversion function.
   * @private.
   */
  function m_tileUrlFromTemplate(base) {
    return function (x, y, z, subdomains) {
      return base.replace('{s}', m_getTileSubdomain(x, y, subdomains))
        .replace('{z}', z)
        .replace('{x}', x)
        .replace('{y}', y);
    };
  }

  //////////////////////////////////////////////////////////////////////////////
  /**
   * This method defines a tileLayer, which is an abstract class defining a
   * layer divided into tiles of arbitrary data.  Notably, this class provides
   * the core functionality of the osmLayer, but hooks exist to render tiles
   * dynamically from vector data, or to display arbitrary grids of images
   * in a custom coordinate system.  When multiple zoom levels are present
   * in a given dataset, this class assumes that the space occupied by
   * tile (i, j) at level z is covered by a 2x2 grid of tiles at zoom
   * level z + 1:
   *
   *   (2i, 2j),     (2i, 2j + 1)
   *   (2i + 1, 2j), (2i + 1, 2j + 1)
   *
   * The higher level tile set should represent a 2x increase in resolution.
   *
   * Although not currently supported, this class is intended to extend to
   * 3D grids of tiles as well where 1 tile is covered by a 2x2x2 grid of
   * tiles at the next level.  The tiles are assumed to be rectangular,
   * identically sized, and aligned with x/y axis of the underlying
   * coordinate system.  The local coordinate system is in pixels relative
   * to the current zoom level and changes when the zoom level crosses an
   * integer threshold.
   *
   * The constructor takes a number of optional parameters that customize
   * the display of the tiles.  The default values of these options are
   * stored as the `defaults` attribution on the constructor.  Supporting
   * alternate tiling protocols often only requires adjusting these
   * defaults.
   *
   * @class
   * @extends geo.featureLayer
   * @param {object?} options
   * @param {number} [options.minLevel=0]    The minimum zoom level available
   * @param {number} [options.maxLevel=18]   The maximum zoom level available
   * @param {number} [options.tileOverlap=0]
   *    Number of pixels of overlap between tiles
   * @param {number} [options.tileWidth=256]
   *    The tile width as displayed without overlap
   * @param {number} [options.tileHeight=256]
   *    The tile height as displayed without overlap
   * @param {number} [options.cacheSize=400] The maximum number of tiles to
   *    cache.  The default is 200 if keepLower is false.
   * @param {bool}   [options.keepLower=true]
   *    Keep lower zoom level tiles when showing high zoom level tiles.  This
   *    uses more memory but results in smoother transitions.
   * @param {bool}   [options.wrapX=true]    Wrap in the x-direction
   * @param {bool}   [options.wrapY=false]   Wrap in the y-direction
   * @param {function|string} [options.url=null]
   *   A function taking the current tile indices and returning a URL or jquery
   *   ajax config to be passed to the {geo.tile} constructor.
   *   Example:
   *     (x, y, z, subdomains) => "http://example.com/z/y/x.png"
   *   If this is a string, a template url with {x}, {y}, {z}, and {s} as
   *   template variables.  {s} picks one of the subdomains parameter.
   * @param {string|list} [options.subdomain="abc"]  Subdomains to use in
   *   template url strings.  If a string, this is converted to a list before
   *   being passed to a url function.
   * @param {string} [options.baseUrl=null]  If defined, use the old-style base
   *   url instead of the options.url parameter.  This is functionally the same
   *   as using a url of baseUrl/{z}/{x}/{y}.(options.imageFormat || png).  If
   *   the specified string does not end in a slash, one is added.
   * @param {string} [options.imageFormat='png']
   *   This is only used if a baseUrl is specified, in which case it determines
   *   the image name extension used in the url.
   * @param {number} [options.animationDuration=0]
   *   The number of milliseconds for the tile loading animation to occur.  **This
   *   option is currently buggy because old tiles will purge before the animation
   *   is complete.**
   * @param {string} [options.attribution]
   *   An attribution to display with the layer (accepts HTML)
   * @param {function} [options.tileRounding=Math.round]
   *   This function determines which tiles will be loaded when the map is at
   *   a non-integer zoom.  For example, `Math.floor`, will use tile level 2
   *   when the map is at zoom 2.9.
   * @param {function} [options.tileOffset]
   *   This function takes a zoom level argument and returns, in units of
   *   pixels, the coordinates of the point (0, 0) at the given zoom level
   *   relative to the bottom left corner of the domain.
   * @param {bool}   [options.topDown=false]  True if the gcs is top-down,
   *   false if bottom-up (the ingcs does not matter, only the gcs coordinate
   *   system).  When false, this inverts the gcs y-coordinate when calculating
   *   local coordinates.
   * @returns {geo.tileLayer}
   */
  //////////////////////////////////////////////////////////////////////////////
  geo.tileLayer = function (options) {
    if (!(this instanceof geo.tileLayer)) {
      return new geo.tileLayer(options);
    }
    geo.featureLayer.call(this, options);

    options = $.extend(true, {}, this.constructor.defaults, options || {});
    if (!options.cacheSize) {
      // this size should be sufficient for a 4k display
      options.cacheSize = options.keepLower ? 600 : 200;
    }
    if ($.type(options.subdomains) === 'string') {
      options.subdomains = options.subdomains.split('');
    }
    /* We used to call the url option baseUrl.  If a baseUrl is specified, use
     * it instead of url, interpretting it as before. */
    if (options.baseUrl) {
      var url = options.baseUrl;
      if (url && url.charAt(url.length - 1) !== '/') {
        url += '/';
      }
      options.url = url + '{z}/{x}/{y}.' + (options.imageFormat || 'png');
    }
    /* Save the original url so that we can return it if asked */
    options.originalUrl = options.url;
    if ($.type(options.url) === 'string') {
      options.url = m_tileUrlFromTemplate(options.url);
    }

    var lastZoom = null,
        lastX = null,
        lastY = null,
        s_init = this._init,
        s_exit = this._exit,
        m_exited;

    // copy the options into a private variable
    this._options = $.extend(true, {}, options);

    // set the layer attribution text
    this.attribution(options.attribution);

    // initialize the object that keeps track of actively drawn tiles
    this._activeTiles = {};

    // initialize the object that stores active tile regions in a
    // tree-like structure providing quick queries to determine
    // if tiles are completely obscured or not.
    this._tileTree = {};

    // initialize the in memory tile cache
    this._cache = geo.tileCache({size: options.cacheSize});

    // initialize the tile fetch queue
    this._queue = geo.fetchQueue({
      // this should probably be 6 * subdomains.length if subdomains are used
      size: 6,
      // if track is the same as the cache size, then neither processing time
      // nor memory will be wasted.  Larger values will use more memory,
      // smaller values will do needless computations.
      track: options.cacheSize,
      needed: function (tile) {
        return tile === this.cache.get(tile.toString());
      }.bind(this)
    });

    var m_tileOffsetValues = {};

    /**
     * Readonly accessor to the options object
     */
    Object.defineProperty(this, 'options', {get: function () {
      return $.extend({}, this._options);
    }});

    /**
     * Readonly accessor to the tile cache object.
     */
    Object.defineProperty(this, 'cache', {get: function () {
      return this._cache;
    }});

    /**
     * Readonly accessor to the active tile mapping.  This is an object containing
     * all currently drawn tiles (hash(tile) => tile).
     */
    Object.defineProperty(this, 'activeTiles', {get: function () {
      return $.extend({}, this._activeTiles); // copy on output
    }});

    /**
     * The number of tiles at the given zoom level
     * The default implementation just returns `Math.pow(2, z)`.
     * @param {number} level A zoom level
     * @returns {{x: nx, y: ny}} The number of tiles in each axis
     */
    this.tilesAtZoom = function (level) {
      var s = Math.pow(2, level);
      return {x: s, y: s};
    };

    /**
     * Returns true if the given tile index is valid:
     *   * min level <= level <= max level
     *   * 0 <= x <= 2^level - 1
     *   * 0 <= y <= 2^level - 1
     * @param {object} index The tile index
     * @param {number} index.x
     * @param {number} index.y
     * @param {number} index.level
     * @returns {geo.tile}
     */
    this.isValid = function (index) {
      if (!(this._options.minLevel <= index.level &&
           index.level <= this._options.maxLevel)) {
        return false;
      }
      if (!(this._options.wrapX ||
            0 <= index.x &&
            index.x <= this.tilesAtZoom(index.level).x - 1)) {
        return false;
      }
      if (!(this._options.wrapY ||
            0 <= index.y &&
            index.y <= this.tilesAtZoom(index.level).y - 1)) {
        return false;
      }
      return true;
    };

    /**
     * Returns the current origin tile and offset at the given zoom level.
     * This is intended to be cached in the future to optimize coordinate
     * transformations.
     * @protected
     * @param {number} level The target zoom level
     * @returns {object} {index: {x, y}, offset: {x, y}}
     */
    this._origin = function (level) {
      var origin = this.toLevel(this.toLocal(this.map().origin()), level),
          o = this._options,
          index, offset;

      // get the tile index
      index = {
        x: Math.floor(origin.x / o.tileWidth),
        y: Math.floor(origin.y / o.tileHeight)
      };

      // get the offset inside the tile (in pixels)
      // This computation should contain the only numerically unstable
      // subtraction in this class.  All other methods will assume
      // coordinates are given relative to the map origin.
      offset = {
        x: origin.x - o.tileWidth * index.x,
        y: origin.y - o.tileHeight * index.y
      };
      return {index: index, offset: offset};
    };

    /**
     * Returns a tile's bounds in its level coordinates.
     * @param {geo.tile} tile
     * @returns {object} bounds
     */
    this._tileBounds = function (tile) {
      var origin = this._origin(tile.index.level);
      return tile.bounds(origin.index, origin.offset);
    };

    /**
     * Returns the tile indices at the given point.
     * @param {object} point The coordinates in pixels relative to the map origin.
     * @param {number} point.x
     * @param {number} point.y
     * @param {number} level The target zoom level
     * @returns {object} The tile indices
     */
    this.tileAtPoint = function (point, level) {
      var o = this._origin(level);
      var map = this.map();
      point = this.displayToLevel(map.gcsToDisplay(point, null), level);
      var to = this._tileOffset(level);
      if (to) {
        point.x += to.x;
        point.y += to.y;
      }
      var tile = {
        x: Math.floor(
          o.index.x + (o.offset.x + point.x) / this._options.tileWidth
        ),
        y: Math.floor(
          o.index.y + (o.offset.y + point.y) / this._options.tileHeight
        )
      };
      return tile;
    };

    /**
     * Returns a tile's bounds in a gcs.
     * @param {object|tile} either a tile or an object with {x, y, level}
     *                      specifying a tile.
     * @param {string|geo.transform} [gcs] undefined to use the interface gcs,
     *    null to use the map gcs, or any other transform.
     * @returns {object} The tile bounds in the specified gcs.
     */
    this.gcsTileBounds = function (indexOrTile, gcs) {
      var tile = (indexOrTile.index ? indexOrTile : geo.tile({
            index: indexOrTile,
            size: {x: this._options.tileWidth, y: this._options.tileHeight},
            url: ''
          }));
      var to = this._tileOffset(tile.index.level),
          bounds = tile.bounds({x: 0, y: 0}, to),
          map = this.map(),
          unit = map.unitsPerPixel(tile.index.level);
      var coord = [{
            x: bounds.left * unit, y: this._topDown() * bounds.top * unit
          }, {
            x: bounds.right * unit, y: this._topDown() * bounds.bottom * unit
          }];
      gcs = (gcs === null ? map.gcs() : (
          gcs === undefined ? map.ingcs() : gcs));
      if (gcs !== map.gcs()) {
        coord = geo.transform.transformCoordinates(gcs, map.gcs(), coord);
      }
      return {
        left: coord[0].x,
        top: coord[0].y,
        right: coord[1].x,
        bottom: coord[1].y
      };
    };

    /**
     * Returns an instantiated tile object with the given indices.  This
     * method always returns a new tile object.  Use `_getTileCached`
     * to use the caching layer.
     * @param {object} index The tile index
     * @param {number} index.x
     * @param {number} index.y
     * @param {number} index.level
     * @param {object} source The tile index used for constructing the url
     * @param {number} source.x
     * @param {number} source.y
     * @param {number} source.level
     * @returns {geo.tile}
     */
    this._getTile = function (index, source) {
      var urlParams = source || index;
      return geo.tile({
        index: index,
        size: {x: this._options.tileWidth, y: this._options.tileHeight},
        queue: this._queue,
        url: this._options.url(urlParams.x, urlParams.y, urlParams.level || 0,
                               this._options.subdomains)
      });
    };

    /**
     * Returns an instantiated tile object with the given indices.  This
     * method is similar to `_getTile`, but checks the cache before
     * generating a new tile.
     * @param {object} index The tile index
     * @param {number} index.x
     * @param {number} index.y
     * @param {number} index.level
     * @param {object} source The tile index used for constructing the url
     * @param {number} source.x
     * @param {number} source.y
     * @param {number} source.level
     * @param {boolean} delayPurge If true, don't purge tiles from the cache
     * @returns {geo.tile}
     */
    this._getTileCached = function (index, source, delayPurge) {
      var tile = this.cache.get(this._tileHash(index));
      if (tile === null) {
        tile = this._getTile(index, source);
        this.cache.add(tile, this.remove.bind(this), delayPurge);
      }
      return tile;
    };

    /**
     * Returns a string representation of the tile at the given index.
     * This method is used as a hashing function for the caching layer.
     *
     * Note: This method _must_ return the same string as:
     *
     *   tile({index: index}).toString();
     *
     * @param {object} index The tile index
     * @param {number} index.x
     * @param {number} index.y
     * @param {number} index.level
     * @returns {string}
     */
    this._tileHash = function (index) {
      return [index.level || 0, index.y, index.x].join('_');
    };

    /**
     * Returns the optimal starting and ending tile indices
     * (inclusive) necessary to fill the given viewport.
     * @param {number} level The zoom level
     * @param {object} bounds The map bounds in world coordinates
     */
    this._getTileRange = function (level, bounds) {
      return {
        start: this.tileAtPoint({
          x: bounds.left,
          y: bounds.top
        }, level),
        end: this.tileAtPoint({
          x: bounds.right,
          y: bounds.bottom
        }, level)
      };
    };

    /**
     * Returns a list of tiles necessary to fill the screen at the given
     * zoom level, center point, and viewport size.  The list is optionally
     * ordered by loading priority (center tiles first).
     *
     * @protected
     * @param {number} maxLevel The zoom level
     * @param {object} bounds The map bounds
     * @param {boolean} sorted Return a sorted list
     * @returns {geo.tile[]} An array of tile objects
     */
    this._getTiles = function (maxLevel, bounds, sorted) {
      var i, j, tiles = [], index, nTilesLevel,
          start, end, indexRange, source, center,
          level, minLevel = this._options.keepLower ? 0 : maxLevel;

      /* Generate a list of the tiles that we want to create.  This is done
       * before sorting, because we want to actually generate the tiles in
       * the sort order. */
      for (level = minLevel; level <= maxLevel; level += 1) {
        // get the tile range to fetch
        indexRange = this._getTileRange(level, bounds);
        start = indexRange.start;
        end = indexRange.end;

        // total number of tiles existing at this level
        nTilesLevel = this.tilesAtZoom(level);

        // loop over the tile range
        index = {level: level};
        index.nx = nTilesLevel.x;
        index.ny = nTilesLevel.y;

        for (i = start.x; i <= end.x; i += 1) {
          index.x = i;
          for (j = start.y; j <= end.y; j += 1) {
            index.y = j;

            source = $.extend({}, index);
            if (this._options.wrapX) {
              source.x = modulo(index.x, index.nx);
            }
            if (this._options.wrapY) {
              source.y = modulo(index.y, index.ny);
            }

            if (this.isValid(source)) {
              tiles.push({index: $.extend({}, index), source: source});
            }
          }
        }
      }

      if (sorted) {
        center = {
          x: (start.x + end.x) / 2,
          y: (start.y + end.y) / 2,
          level: maxLevel,
          bottomLevel: maxLevel
        };
        var numTiles = Math.max(end.x - start.x, end.y - start.y) + 1;
        for (; numTiles >= 1; numTiles /= 2) {
          center.bottomLevel -= 1;
        }
        tiles.sort(this._loadMetric(center));
        /* If we are using a fetch queue, start a new batch */
        if (this._queue) {
          this._queue.batch(true);
        }
      }
      if (this.cache.size < tiles.length) {
        console.log('Increasing cache size to ' + tiles.length);
        this.cache.size = tiles.length;
      }
      /* Actually get the tiles. */
      for (i = 0; i < tiles.length; i += 1) {
        tiles[i] = this._getTileCached(tiles[i].index, tiles[i].source, true);
      }
      this.cache.purge(this.remove.bind(this));
      return tiles;
    };

    /**
     * Prefetches tiles up to a given zoom level around a given bounding box.
     *
     * @param {number} level The zoom level
     * @param {object} bounds The map bounds
     * @returns {$.Deferred} resolves when all of the tiles are fetched
     */
    this.prefetch = function (level, bounds) {
      var tiles;
      tiles = this._getTiles(level, bounds, true);
      return $.when.apply($,
        tiles.map(function (tile) {
          return tile.fetch();
        })
      );
    };

    /**
     * This method returns a metric that determines tile loading order.  The
     * default implementation prioritizes tiles that are closer to the center,
     * or at a lower zoom level.
     * @protected
     * @param {index1} center   The center tile
     * @param {number} center.x
     * @param {number} center.y
     * @returns {function} A function accepted by Array.prototype.sort
     */
    this._loadMetric = function (center) {
      return function (a, b) {
        var a0, b0, dx, dy, cx, cy, scale;

        a = a.index || a;
        b = b.index || b;
        // shortcut if zoom level differs
        if (a.level !== b.level) {
          if (center.bottomLevel && ((a.level >= center.bottomLevel) !==
                                     (b.level >= center.bottomLevel))) {
            return a.level >= center.bottomLevel ? -1 : 1;
          }
          return a.level - b.level;
        }

        /* compute the center coordinates relative to a.level.  Since we really
         * care about the center of the tiles, use an offset */
        scale = Math.pow(2, a.level - center.level);
        cx = (center.x + 0.5) * scale - 0.5;
        cy = (center.y + 0.5) * scale - 0.5;

        // calculate distances to the center squared
        dx = a.x - cx;
        dy = a.y - cy;
        a0 = dx * dx + dy * dy;

        dx = b.x - cx;
        dy = b.y - cy;
        b0 = dx * dx + dy * dy;

        // return negative if a < b, or positive if a > b
        return a0 - b0;
      };
    };

    /**
     * Convert a coordinate from pixel coordinates at the given zoom
     * level to world coordinates.
     * @param {object} coord
     * @param {number} coord.x The offset in pixels (level 0) from the left edge
     * @param {number} coord.y The offset in pixels (level 0) from the bottom edge
     * @param {number} level   The zoom level of the source coordinates
     */
    this.fromLevel = function (coord, level) {
      var s = Math.pow(2, -level);
      return {
        x: coord.x * s,
        y: coord.y * s
      };
    };

    /**
     * Convert a coordinate from layer coordinates to pixel coordinates at the
     * given zoom level.
     * @param {object} coord
     * @param {number} coord.x The offset in pixels (level 0) from the left edge
     * @param {number} coord.y The offset in pixels (level 0) from the bottom edge
     * @param {number} level   The zoom level of the new coordinates
     */
    this.toLevel = function (coord, level) {
      var s = Math.pow(2, level);
      return {
        x: coord.x * s,
        y: coord.y * s
      };
    };

    /**
     * Draw the given tile on the active canvas.
     * @param {geo.tile} tile The tile to draw
     */
    this.drawTile = function (tile) {
      var hash = tile.toString();

      if (this._activeTiles.hasOwnProperty(hash)) {
        // the tile is already drawn, move it to the top
        this._moveToTop(tile);
      } else {
        // pass to the rendering implementation
        this._drawTile(tile);
      }

      // add the tile to the active cache
      this._activeTiles[hash] = tile;
    };

    /**
     * Render the tile on the canvas.  This implementation draws the tiles directly
     * on the DOM using <img> tags.  Derived classes should override this method
     * to draw the tile on a renderer specific context.
     * @protected
     * @param {geo.tile} tile The tile to draw
     */
    this._drawTile = function (tile) {
      // Make sure this method is not called when there is
      // a renderer attached.
      //
      if (this.renderer() !== null) {
        throw new Error('This draw method is not valid on renderer managed layers.');
      }

      // get the layer node
      var div = $(this._getSubLayer(tile.index.level)),
          bounds = this._tileBounds(tile),
          duration = this._options.animationDuration,
          container = $('<div class="geo-tile-container"/>').attr(
            'tile-reference', tile.toString());

      // apply a transform to place the image correctly
      container.append(tile.image);
      container.css({
        position: 'absolute',
        left: (bounds.left - parseInt(div.attr('offsetx') || 0)) + 'px',
        top: (bounds.top - parseInt(div.attr('offsety') || 0)) + 'px'
      });

      // apply fade in animation
      if (duration > 0) {
        tile.fadeIn(duration);
      }

      // append the image element
      div.append(container);

      // add an error handler
      tile.catch(function () {
        // May want to do something special here later
        console.warn('Could not load tile at ' + tile.index);
        this._remove(tile);
      }.bind(this));
    };

    /**
     * Remove the given tile from the canvas and the active cache.
     * @param {geo.tile|string} tile The tile (or hash) to remove
     * @returns {geo.tile} the tile removed from the active layer
     */
    this.remove = function (tile) {
      var hash = tile.toString();
      var value = this._activeTiles[hash];

      if (value instanceof geo.tile) {
        this._remove(value);
      }

      delete this._activeTiles[hash];
      return value;
    };

    /**
     * Remove the given tile from the canvas.  This implementation just
     * finds and removes the <img> element created for the tile.
     * @param {geo.tile|string} tile The tile object to remove
     */
    this._remove = function (tile) {
      if (tile.image) {
        if (tile.image.parentElement) {
          $(tile.image.parentElement).remove();
        } else {
          /* This shouldn't happen, but sometimes does.  Originally it happened
           * when a tile was removed from the cache before it was finished
           * being used; there is still some much rarer condition that can
           * cause it.  Log that it happened until we can figure out how to fix
           * the issue. */
          console.log('No parent element to remove ' + tile.toString(), tile);
        }
        $(tile.image).remove();
      }
    };

    /**
     * Move the given tile to the top on the canvas.
     * @param {geo.tile} tile The tile object to move
     */
    this._moveToTop = function (tile) {
      $.noop(tile);
    };

    /**
     * Query the attached map for the current bounds and return them
     * as pixels at the current zoom level.
     * @returns {object}
     *  Bounds object with left, right, top, bottom keys
     * @protected
     */
    this._getViewBounds = function () {
      var map = this.map(),
          mapZoom = map.zoom(),
          zoom = this._options.tileRounding(mapZoom),
          scale = Math.pow(2, mapZoom - zoom),
          size = map.size();
      var ul = this.displayToLevel({x: 0, y: 0}),
          ur = this.displayToLevel({x: size.width, y: 0}),
          ll = this.displayToLevel({x: 0, y: size.height}),
          lr = this.displayToLevel({x: size.width, y: size.height});
      return {
        level: zoom,
        scale: scale,
        left: Math.min(ul.x, ur.x, ll.x, lr.x),
        right: Math.max(ul.x, ur.x, ll.x, lr.x),
        top: Math.min(ul.y, ur.y, ll.y, lr.y),
        bottom: Math.max(ul.y, ur.y, ll.y, lr.y)
      };
    };

    /**
     * Remove all inactive tiles from the display.  An inactive tile
     * is one that is no longer visible either because it was panned
     * out of the active view or the zoom has changed.
     * @protected
     * @param {number} zoom Tiles (in bounds) at this zoom level will be kept
     * @param {boolean} doneLoading If true, allow purging additional tiles.
     * @param {object} bounds view bounds.  If not specified, this is
     *   obtained from _getViewBounds().
     */
    this._purge = function (zoom, doneLoading, bounds) {
      var tile, hash;

      // Don't purge tiles in an active update
      if (this._updating) {
        return;
      }

      // get the view bounds
      if (!bounds) {
        bounds = this._getViewBounds();
      }

      for (hash in this._activeTiles) {// jshint ignore: line

        tile = this._activeTiles[hash];
        if (this._canPurge(tile, bounds, zoom, doneLoading)) {
          this.remove(tile);
        }
      }
      return this;
    };

    /**
     * Remove all active tiles from the canvas.
     * @returns {geo.tile[]} The array of tiles removed
     */
    this.clear = function () {
      var tiles = [], tile;

      // ignoring the warning here because this is a privately
      // controlled object with simple keys
      for (tile in this._activeTiles) {  // jshint ignore: line
        tiles.push(this.remove(tile));
      }

      // clear out the tile coverage tree
      this._tileTree = {};

      return tiles;
    };

    /**
     * Reset the layer to the initial state, clearing the canvas
     * and resetting the tile cache.
     * @returns {this} Chainable
     */
    this.reset = function () {
      this.clear();
      this._cache.clear();
    };

    /**
     * Compute local coordinates from the given world coordinates.  The
     * tile layer uses units of pixels relative to the world space
     * coordinate origin.
     * @param {object} pt A point in world space coordinates
     * @param {number|undefined} zoom If unspecified, use the map zoom.
     * @returns {object} Local coordinates
     */
    this.toLocal = function (pt, zoom) {
      var map = this.map(),
          unit = map.unitsPerPixel(zoom === undefined ? map.zoom() : zoom);
      return {
        x: pt.x / unit,
        y: this._topDown() * pt.y / unit
      };
    };

    /**
     * Compute world coordinates from the given local coordinates.  The
     * tile layer uses units of pixels relative to the world space
     * coordinate origin.
     * @param {object} pt A point in world space coordinates
     * @param {number|undefined} zoom If unspecified, use the map zoom.
     * @returns {object} Local coordinates
     */
    this.fromLocal = function (pt, zoom) {
      var map = this.map(),
          unit = map.unitsPerPixel(zoom === undefined ? map.zoom() : zoom);
      return {
        x: pt.x * unit,
        y: this._topDown() * pt.y * unit
      };
    };

    /**
     * Return a factor for invertin the y units as appropriate.
     * @return {number}
     */
    this._topDown = function () {
      return this._options.topDown ? 1 : -1;
    };

    /**
     * Return the DOM element containing a level specific layer.  This will
     * create the element if it doesn't already exist.
     * @param {number} level The zoom level of the layer to fetch
     * @return {DOM}
     */
    this._getSubLayer = function (level) {
      if (!this.canvas()) {
        return;
      }
      var node = this.canvas()
        .find('div[data-tile-layer=' + level.toFixed() + ']').get(0);
      if (!node) {
        node = $(
          '<div class=geo-tile-layer data-tile-layer="' + level.toFixed() + '"/>'
        ).css({
          'transform-origin': '0px 0px',
          'line-height': 0,
          'font-size': 0
        }).get(0);
        this.canvas().append(node);
      }
      return node;
    };

    /**
     * Set sublayer transforms to align them with the given zoom level.
     * @param {number} level The target zoom level
     * @param {object} view The view bounds.  The top and left are used to
     *                      adjust the offset of tile layers.
     * @return {object} the x and y offsets for the current level.
     */
    this._updateSubLayers = function (level, view) {
      var canvas = this.canvas(),
          lastlevel = parseInt(canvas.attr('lastlevel')),
          lastx = parseInt(canvas.attr('lastoffsetx') || 0),
          lasty = parseInt(canvas.attr('lastoffsety') || 0);
      if (lastlevel === level && Math.abs(lastx - view.left) < 65536 &&
          Math.abs(lasty - view.top) < 65536) {
        return {x: lastx, y: lasty};
      }
      var map = this.map(),
          to = this._tileOffset(level),
          x = parseInt((view.left + view.right - map.size().width) / 2 + to.x),
          y = parseInt((view.top + view.bottom - map.size().height) / 2 + to.y);
      canvas.find('.geo-tile-layer').each(function (idx, el) {
        var $el = $(el),
            layer = parseInt($el.data('tileLayer'));
        $el.css(
          'transform',
          'scale(' + Math.pow(2, level - layer) + ')'
        );
        var layerx = parseInt(x / Math.pow(2, level - layer)),
            layery = parseInt(y / Math.pow(2, level - layer)),
            dx = layerx - parseInt($el.attr('offsetx') || 0),
            dy = layery - parseInt($el.attr('offsety') || 0);
        $el.attr({offsetx: layerx, offsety: layery});
        $el.find('.geo-tile-container').each(function (tileidx, tileel) {
          $(tileel).css({
            left: (parseInt($(tileel).css('left')) - dx) + 'px',
            top: (parseInt($(tileel).css('top')) - dy) + 'px'
          });
        }.bind(this));
      }.bind(this));
      canvas.attr({lastoffsetx: x, lastoffsety: y, lastlevel: level});
      return {x: x, y: y};
    };

    /**
     * Update the view according to the map/camera.
     * @returns {this} Chainable
     */
    this._update = function (evt) {
      /* Ignore zoom and rotate events, as they are ALWAYS followed by a pan
       * event */
      if (evt && evt.event && (evt.event.event === geo.event.zoom ||
          evt.event.event === geo.event.rotate)) {
        return;
      }
      var map = this.map(),
          mapZoom = map.zoom(),
          zoom = this._options.tileRounding(mapZoom),
          center = this.displayToLevel(undefined, zoom),
          bounds = map.bounds(undefined, null),
          tiles, view = this._getViewBounds();

      tiles = this._getTiles(
        zoom, bounds, true
      );

      if (this._updateSubLayers) {
        // Update the transform for the local layer coordinates
        var offset = this._updateSubLayers(zoom, view) || {x: 0, y: 0};

        var to = this._tileOffset(zoom);
        if (this.renderer() === null) {
          var scale = Math.pow(2, mapZoom - zoom),
              rotation = map.rotation(),
              rx = -to.x + -(view.left + view.right) / 2 + offset.x,
              ry = -to.y + -(view.bottom + view.top) / 2 + offset.y,
              dx = (rx + map.size().width / 2) * scale,
              dy = (ry + map.size().height / 2) * scale;

          this.canvas().css({
            'transform-origin': '' +
                -rx + 'px ' +
                -ry + 'px'
          });
          var transform = 'translate(' + dx + 'px' + ',' + dy + 'px' + ')' +
              'scale(' + scale + ')';
          if (rotation) {
            transform += 'rotate(' + (rotation * 180 / Math.PI) + 'deg)';
          }
          this.canvas().css('transform', transform);
        }
        /* Set some attributes that can be used by non-css based viewers.  This
         * doesn't include the map center, as that may need to be handled
         * differently from the view center. */
        this.canvas().attr({
          scale: Math.pow(2, mapZoom - zoom),
          dx: -to.x + -(view.left + view.right) / 2,
          dy: -to.y + -(view.bottom + view.top) / 2,
          offsetx: offset.x,
          offsety: offset.y,
          rotation: map.rotation()
        });
      }

      lastZoom = mapZoom;
      lastX = center.x;
      lastY = center.y;

      // reset the tile coverage tree
      this._tileTree = {};

      tiles.forEach(function (tile) {
        if (tile.fetched()) {
          /* if we have already fetched the tile, we know we can just draw it,
           * as the bounds won't have changed since the call to _getTiles. */
          this.drawTile(tile);

          // mark the tile as covered
          this._setTileTree(tile);
        } else {
          if (!tile._queued) {
            tile.then(function () {
              if (m_exited) {
                /* If we have disconnected the renderer, do nothing.  This
                 * happens when the layer is being deleted. */
                return;
              }
              if (tile !== this.cache.get(tile.toString())) {
                /* If the tile has fallen out of the cache, don't draw it -- it
                 * is untracked.  This may be an indication that a larger cache
                 * should have been used. */
                return;
              }
              /* Check if a tile is still desired.  Don't draw it if it isn't. */
              var mapZoom = map.zoom(),
                  zoom = this._options.tileRounding(mapZoom),
                  view = this._getViewBounds();
              if (this._canPurge(tile, view, zoom)) {
                this.remove(tile);
                return;
              }

              this.drawTile(tile);

              // mark the tile as covered
              this._setTileTree(tile);
            }.bind(this));

            this.addPromise(tile);
            tile._queued = true;
          } else {
            /* If we are using a fetch queue, tell the queue so this tile can
             * be reprioritized. */
            var pos = this._queue ? this._queue.get(tile) : -1;
            if (pos >= 0) {
              this._queue.add(tile);
            }
          }
        }
      }.bind(this));

      // purge all old tiles when the new tiles are loaded (successfully or not)
      $.when.apply($, tiles)
        .done(// called on success and failure
          function () {
            var map = this.map(),
                mapZoom = map.zoom(),
                zoom = this._options.tileRounding(mapZoom);
            this._purge(zoom, true);
          }.bind(this)
        );
    };

    /**
     * Set a value in the tile tree object indicating that the given area of
     * the canvas is covered by the tile.
     * @protected
     * @param {geo.tile} tile
     */
    this._setTileTree = function (tile) {
      var index = tile.index;
      this._tileTree[index.level] = this._tileTree[index.level] || {};
      this._tileTree[index.level][index.x] = this._tileTree[index.level][index.x] || {};
      this._tileTree[index.level][index.x][index.y] = tile;
    };

    /**
     * Get a value in the tile tree object if it exists or return null.
     * @protected
     * @param {object} index A tile index object
     * @param {object} index.level
     * @param {object} index.x
     * @param {object} index.y
     * @returns {geo.tile|null}
     */
    this._getTileTree = function (index) {
      return (
          (
            this._tileTree[index.level] || {}
          )[index.x] || {}
        )[index.y] || null;
    };

    /**
     * Returns true if the tile is completely covered by other tiles on the canvas.
     * Currently this method only checks layers +/- 1 away from `tile`.  If the
     * zoom level is allowed to change by 2 or more in a single update step, this
     * method will need to be refactored to make a more robust check.  Returns
     * an array of tiles covering it or null if any part of the tile is exposed.
     * @protected
     * @param {geo.tile} tile
     * @returns {geo.tile[]|null}
     */
    this._isCovered = function (tile) {
      var level = tile.index.level,
          x = tile.index.x,
          y = tile.index.y,
          tiles = [];

      // Check one level up
      tiles = this._getTileTree({
        level: level - 1,
        x: Math.floor(x / 2),
        y: Math.floor(y / 2)
      });
      if (tiles) {
        return [tiles];
      }

      // Check one level down
      tiles = [
        this._getTileTree({
          level: level + 1,
          x: 2 * x,
          y: 2 * y
        }),
        this._getTileTree({
          level: level + 1,
          x: 2 * x + 1,
          y: 2 * y
        }),
        this._getTileTree({
          level: level + 1,
          x: 2 * x,
          y: 2 * y + 1
        }),
        this._getTileTree({
          level: level + 1,
          x: 2 * x + 1,
          y: 2 * y + 1
        })
      ];
      if (tiles.every(function (t) { return t !== null; })) {
        return tiles;
      }

      return null;
    };

    /**
     * Returns true if the provided tile is outside of the current view bounds
     * and can be removed from the canvas.
     * @protected
     * @param {geo.tile} tile
     * @param {object?} bounds The view bounds
     * @param {object?} bounds.left
     * @param {object?} bounds.right
     * @param {object?} bounds.top
     * @param {object?} bounds.bottom
     * @returns {boolean}
     */
    this._outOfBounds = function (tile, bounds) {
      /* We may want to add an (n) tile edge buffer so we appear more
       * responsive */
      var to = this._tileOffset(tile.index.level);
      var scale = 1;
      if (tile.index.level !== bounds.level) {
        scale = Math.pow(2, (bounds.level || 0) - (tile.index.level || 0));
      }
      return (tile.bottom - to.y) * scale < bounds.top ||
             (tile.left - to.x) * scale   > bounds.right ||
             (tile.top - to.y) * scale    > bounds.bottom ||
             (tile.right - to.x) * scale  < bounds.left;
    };

    /**
     * Returns true if the provided tile can be purged from the canvas.  This method
     * will return `true` if the tile is completely covered by one or more other tiles
     * or it is outside of the active view bounds.  This method returns the logical and
     * of `_isCovered` and `_outOfBounds`.
     * @protected
     * @param {geo.tile} tile
     * @param {object?} bounds The view bounds (if empty, assume global bounds)
     * @param {number} bounds.left
     * @param {number} bounds.right
     * @param {number} bounds.top
     * @param {number} bounds.bottom
     * @param {number} bounds.level The zoom level the bounds are given as
     * @param {number} zoom Keep in bound tile at this zoom level
     * @param {boolean} doneLoading If true, allow purging additional tiles.
     * @returns {boolean}
     */
    this._canPurge = function (tile, bounds, zoom, doneLoading) {
      if (this._options.keepLower) {
        zoom = zoom || 0;
        if (zoom < tile.index.level) {
          return true;
        }
      } else {
        /* For tile layers that should only keep one layer, if loading is
         * finished, purge all but the current layer.  This is important for
         * semi-transparanet layers. */
        if ((doneLoading || this._isCovered(tile)) &&
            zoom !== tile.index.level) {
          return true;
        }
      }
      if (bounds) {
        return this._outOfBounds(tile, bounds);
      }
      return false;
    };

    /**
     * Convert display pixel coordinates (where (0,0) is the upper left) to
     * layer pixel coordinates (typically (0,0) is the center of the map and
     * the upper-left has the most negative values).
     * By default, this is done at the current base zoom level.
     *
     * @param pt: the point to convert.  If undefined, use the center of the
     *            display.
     * @param zoom: if specified, the zoom level to use.
     * @returns: the point in level coordinates.
     */
    this.displayToLevel = function (pt, zoom) {
      var map = this.map(),
          mapzoom = map.zoom(),
          roundzoom = this._options.tileRounding(mapzoom),
          unit = map.unitsPerPixel(zoom === undefined ? roundzoom : zoom);
      if (pt === undefined) {
        var size = map.size();
        pt = {x: size.width / 2, y: size.height / 2};
      }
      /* Reverse the y coordinate, since we expect the gcs coordinate system
       * to be right-handed and the level coordinate system to be
       * left-handed. */
      var gcsPt = map.displayToGcs(pt, null),
          lvlPt = {x: gcsPt.x / unit, y: this._topDown() * gcsPt.y / unit};
      return lvlPt;
    };

    /**
     * Get or set the tile url string or function.  If changed, load the new
     * tiles.
     *
     * @param {string|function} [url] The new tile url.
     * @returns {string|function|this}
     */
    this.url = function (url) {
      if (url === undefined) {
        return this._options.originalUrl;
      }
      if (url === this._options.originalUrl) {
        return this;
      }
      this._options.originalUrl = url;
      if ($.type(url) === 'string') {
        url = m_tileUrlFromTemplate(url);
      }
      this._options.url = url;
      this.reset();
      this.map().draw();
      return this;
    };

    /**
     * Get or set the subdomains used for templating.
     *
     * @param {string|list} [subdomains] A comma-separated list, a string of
     *      single character subdomains, or a list.
     * @returns {string|list|this}
     */
    this.subdomains = function (subdomains) {
      if (subdomains === undefined) {
        return this._options.subdomains;
      }
      if (subdomains) {
        if ($.type(subdomains) === 'string') {
          if (subdomains.indexOf(',') >= 0) {
            subdomains = subdomains.split(',');
          } else {
            subdomains = subdomains.split('');
          }
        }
        this._options.subdomains = subdomains;
        this.reset();
        this.map().draw();
      }
      return this;
    };

    /**
     * Return a value from the tileOffset function, caching it for different
     * levels.
     *
     * @param {Number} level the level to pass to the tileOffset function.
     * @returns {Object} a tile offset object with x and y properties.
     */
    this._tileOffset = function (level) {
      if (m_tileOffsetValues[level] === undefined) {
        m_tileOffsetValues[level] = this._options.tileOffset(level);
      }
      return m_tileOffsetValues[level];
    };

    /**
     * Initialize after the layer is added to the map.
     */
    this._init = function () {
      var sublayer;

      // call super method
      s_init.apply(this, arguments);

      if (this.renderer() === null) {
        // Initialize sublayers in the correct order
        for (sublayer = 0; sublayer <= this._options.maxLevel; sublayer += 1) {
          this._getSubLayer(sublayer);
        }
      }
      return this;
    };

    /**
     * Clean up the layer.
     */
    this._exit = function () {
      // call super method
      s_exit.apply(this, arguments);
      m_exited = true;
      return this;
    };

    geo.adjustLayerForRenderer('tile', this);

    return this;
  };

  /**
   * This object contains the default options used to initialize the tileLayer.
   */
  geo.tileLayer.defaults = {
    minLevel: 0,
    maxLevel: 18,
    tileOverlap: 0,
    tileWidth: 256,
    tileHeight: 256,
    wrapX: true,
    wrapY: false,
    url: null,
    subdomains: 'abc',
    tileOffset: function (level) {
      void(level);
      return {x: 0, y: 0};
    },
    topDown: false,
    keepLower: true,
    // cacheSize: 400,  // set depending on keepLower
    tileRounding: Math.round,
    attribution: '',
    animationDuration: 0
  };

  inherit(geo.tileLayer, geo.featureLayer);
})();

(function () {
  'use strict';

  //////////////////////////////////////////////////////////////////////////////
  /**
   * This class implements a queue for Deferred objects.  Whenever one of the
   * objects in the queue completes (resolved or rejected), another item in the
   * queue is processed.  The number of concurrently processing items can be
   * adjusted.  At this time (2015-12-29) most major browsers support 6
   * concurrent requests from any given server, so, when using the queue for
   * tile images, thie number of concurrent requests should be 6 * (number of
   * subdomains serving tiles).
   *
   * @class
   *
   * @param {Object?} [options] A configuration object for the queue
   * @param {Number} [options.size=6] The maximum number of concurrent deferred
   *    objects.
   * @param {Number} [options.track=600] The number of objects that are tracked
   *    that trigger checking if any of them have been abandoned.  The fetch
   *    queue can grow to the greater of this size and the number of items that
   *    are still needed.  Setting this to a low number will increase
   *    processing time, to a high number can increase memory.  Ideally, it
   *    should reflect the number of items that are kept in memory elsewhere.
   *    If needed is null, this is ignored.
   * @param {function} [options.needed=null] If set, this function is passed a
   *    Deferred object and must return a truthy value if the object is still
   *    needed.
   */
  //////////////////////////////////////////////////////////////////////////////
  geo.fetchQueue = function (options) {
    if (!(this instanceof geo.fetchQueue)) {
      return new geo.fetchQueue(options);
    }
    options = options || {};
    this._size = options.size || 6;
    this._track = options.track || 600;
    this._needed = options.needed || null;
    this._batch = false;

    var m_this = this,
        m_next_batch = 1;

    /**
     * Get/set the maximum concurrent deferred object size.
     */
    Object.defineProperty(this, 'size', {
      get: function () { return this._size; },
      set: function (n) {
        this._size = n;
        this.next_item();
      }
    });

    /**
     * Get the current queue size.
     */
    Object.defineProperty(this, 'length', {
      get: function () { return this._queue.length; }
    });

    /**
     * Get the current number of processing items.
     */
    Object.defineProperty(this, 'processing', {
      get: function () { return this._processing; }
    });

    /**
     * Remove all items from the queue.
     */
    this.clear = function () {
      this._queue = [];
      this._processing = 0;
      return this;
    };

    /**
     * Add a Deferred object to the queue.
     * @param {Deferred} defer Deferred object to add to the queue.
     * @param {function} callback a function to call when the item's turn is
     *  granted.
     * @param {boolean} atEnd if false, add the item to the front of the queue
     *  if batching is turned off or at the end of the current batch if it is
     *  turned on.  If true, always add the item to the end of the queue.
     */
    this.add = function (defer, callback, atEnd) {
      if (defer.__fetchQueue) {
        var pos = $.inArray(defer, this._queue);
        if (pos >= 0) {
          this._queue.splice(pos, 1);
          this._addToQueue(defer, atEnd);
          return defer;
        }
      }
      var wait = new $.Deferred();
      var process = new $.Deferred();
      wait.then(function () {
        $.when(callback.call(defer)).always(process.resolve);
      }, process.resolve);
      defer.__fetchQueue = wait;
      this._addToQueue(defer, atEnd);
      $.when(wait, process).always(function () {
        if (m_this._processing > 0) {
          m_this._processing -= 1;
        }
        m_this.next_item();
      }).promise(defer);
      m_this.next_item();
      return defer;
    };

    /**
     * Add an item to the queue.  If batches are being used, add it at after
     * other items in the same batch.
     * @param {Deferred} defer Deferred object to add to the queue.
     * @param {boolean} atEnd if false, add the item to the front of the queue
     *  if batching is turned off or at the end of the current batch if it is
     *  turned on.  If true, always add the item to the end of the queue.
     */
    this._addToQueue = function (defer, atEnd) {
      defer.__fetchQueue._batch = this._batch;
      if (atEnd) {
        this._queue.push(defer);
      } else if (!this._batch) {
        this._queue.unshift(defer);
      } else {
        for (var i = 0; i < this._queue.length; i += 1) {
          if (this._queue[i].__fetchQueue._batch !== this._batch) {
            break;
          }
        }
        this._queue.splice(i, 0, defer);
      }
    };

    /**
     * Get the position of a deferred object in the queue.
     * @param {Deferred} defer Deferred object to get the position of.
     * @returns {number} -1 if not in the queue, or the position in the queue.
     */
    this.get = function (defer) {
      return $.inArray(defer, this._queue);
    };

    /**
     * Remove a Deferred object from the queue.
     * @param {Deferred} defer Deferred object to add to the queue.
     * @returns {bool} true if the object was removed
     */
    this.remove = function (defer) {
      var pos = $.inArray(defer, this._queue);
      if (pos >= 0) {
        this._queue.splice(pos, 1);
        return true;
      }
      return false;
    };

    /**
     * Start a new batch or clear using batches.
     * @param {boolean} start true to start a new batch, false to turn off
     *                        using batches.  Undefined to return the current
     *                        state of batches.
     * @return {Number|boolean|Object} the current batch state or this object.
     */
    this.batch = function (start) {
      if (start === undefined) {
        return this._batch;
      }
      if (!start) {
        this._batch = false;
      } else {
        this._batch = m_next_batch;
        m_next_batch += 1;
      }
      return this;
    };

    /**
     * Check if any items are queued and if there if there are not too many
     * deferred objects being processed.  If so, process more items.
     */
    this.next_item = function () {
      if (m_this._innextitem) {
        return;
      }
      m_this._innextitem = true;
      /* if the queue is greater than the track size, check each item to see
       * if it is still needed. */
      if (m_this._queue.length > m_this._track && this._needed) {
        for (var i = m_this._queue.length - 1; i >= 0; i -= 1) {
          if (!m_this._needed(m_this._queue[i])) {
            var discard = m_this._queue.splice(i, 1)[0];
            m_this._processing += 1;
            discard.__fetchQueue.reject();
            delete discard.__fetchQueue;
          }
        }
      }
      while (m_this._processing < m_this._size && m_this._queue.length) {
        var defer = m_this._queue.shift();
        if (defer.__fetchQueue) {
          m_this._processing += 1;
          var needed = m_this._needed ? m_this._needed(defer) : true;
          if (needed) {
            defer.__fetchQueue.resolve();
          } else {
            defer.__fetchQueue.reject();
          }
          delete defer.__fetchQueue;
        }
      }
      m_this._innextitem = false;
    };

    this.clear();
    return this;
  };
})();

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class fileReader
 *
 * @class
 * @extends geo.object
 * @returns {geo.fileReader}
 */
//////////////////////////////////////////////////////////////////////////////
geo.fileReader = function (arg) {
  "use strict";
  if (!(this instanceof geo.fileReader)) {
    return new geo.fileReader(arg);
  }
  geo.object.call(this);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  arg = arg || {};

  if (!(arg.layer instanceof geo.featureLayer)) {
    throw "fileReader must be given a feature layer";
  }

  var m_layer = arg.layer;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the feature layer attached to the reader
   */
  ////////////////////////////////////////////////////////////////////////////
  this.layer = function () {
    return m_layer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Tells the caller if it can handle the given file by returning a boolean.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.canRead = function () {
    return false;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Reads the file object and calls the done function when finished.  As an
   * argument to done, provides a boolean that reports if the read was a
   * success.  Possibly, it can call done with an object containing details
   * of the read operation.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.read = function (file, done) {
    done(false);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return a FileReader with handlers attached.
   */
  ////////////////////////////////////////////////////////////////////////////
  function newFileReader(done, progress) {
    var reader = new FileReader();
    if (progress) {
      reader.onprogress = progress;
    }
    reader.onloadend = function () {
      if (!reader.result) {
        done(reader.error);
      }
      done(reader.result);
    };
    return reader;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private method for reading a file object as a string.  Calls done with
   * the string content when finished or an error object if unsuccessful.
   * Optionally, the caller can provide a progress method that is called
   * after reading each slice.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._getString = function (file, done, progress) {
    var reader = newFileReader(done, progress);
    reader.readAsText(file);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Like _getString, but returns an ArrayBuffer object.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._getArrayBuffer = function (file, done, progress) {
    var reader = newFileReader(done, progress);
    reader.readAsText(file);
  };

  return this;
};

inherit(geo.fileReader, geo.object);

/*global File*/
//////////////////////////////////////////////////////////////////////////////
/**
* Create a new instance of class jsonReader
*
* @class
* @extends geo.fileReader
* @returns {geo.jsonReader}
*/
//////////////////////////////////////////////////////////////////////////////
geo.jsonReader = function (arg) {
  'use strict';
  if (!(this instanceof geo.jsonReader)) {
    return new geo.jsonReader(arg);
  }

  var m_this = this, m_style = arg.style || {};
  m_style = $.extend({
    'strokeWidth': 2,
    'strokeColor': {r: 0, g: 0, b: 0},
    'strokeOpacity': 1,
    'fillColor': {r: 1, g: 0, b: 0},
    'fillOpacity': 1
  }, m_style);

  geo.fileReader.call(this, arg);

  this.canRead = function (file) {
    if (file instanceof File) {
      return (file.type === 'application/json' || file.name.match(/\.json$/));
    } else if (typeof file === 'string') {
      try {
        JSON.parse(file);
      } catch (e) {
        return false;
      }
      return true;
    }
    try {
      if (Array.isArray(m_this._featureArray(file))) {
        return true;
      }
    } catch (e) {}
    return false;
  };

  this._readObject = function (file, done, progress) {
    var object;
    function onDone(fileString) {
      if (typeof fileString !== 'string') {
        done(false);
      }

      // We have two possibilities here:
      // 1) fileString is a JSON string or is
      // a URL.
      try {
        object = JSON.parse(fileString);
        done(object);
      } catch (e) {
        if (!object) {
          $.ajax({
            type: 'GET',
            url: fileString,
            dataType: 'text'
          }).done(function (data) {
            object = JSON.parse(data);
            done(object);
          }).fail(function () {
            done(false);
          });
        }
      }
    }

    if (file instanceof File) {
      m_this._getString(file, onDone, progress);
    } else if (typeof file === 'string') {
      onDone(file);
    } else {
      done(file);
    }
  };

  this._featureArray = function (spec) {
    if (spec.type === 'FeatureCollection') {
      return spec.features || [];
    }
    if (spec.type === 'GeometryCollection') {
      throw 'GeometryCollection not yet implemented.';
    }
    if (Array.isArray(spec.coordinates)) {
      return spec;
    }
    throw 'Unsupported collection type: ' + spec.type;
  };

  this._featureType = function (spec) {
    var geometry = spec.geometry || {};
    if (geometry.type === 'Point' || geometry.type === 'MultiPoint') {
      return 'point';
    }
    if (geometry.type === 'LineString') {
      return 'line';
    }
    if (geometry.type === 'Polygon') {
      return 'polygon';
    }
    if (geometry.type === 'MultiPolygon') {
      return 'multipolygon';
    }
    return null;
  };

  this._getCoordinates = function (spec) {
    var geometry = spec.geometry || {},
    coordinates = geometry.coordinates || [], elv;

    if ((coordinates.length === 2 || coordinates.length === 3) &&
    (isFinite(coordinates[0]) && isFinite(coordinates[1]))) {

      // Do we have a elevation component
      if (isFinite(coordinates[2])) {
        elv = coordinates[2];
      }

      // special handling for single point coordinates
      return [{x: coordinates[0], y: coordinates[1], z: elv}];
    }

    // need better handling here, but we can plot simple polygons
    // by taking just the outer linearring
    if (Array.isArray(coordinates[0][0])) {
      coordinates = coordinates[0];
    }

    // return an array of points for LineString, MultiPoint, etc...
    return coordinates.map(function (c) {
      return {
        x: c[0],
        y: c[1],
        z: c[2]
      };
    });
  };

  this._getStyle = function (spec) {
    return spec.properties;
  };

  this.read = function (file, done, progress) {

    function _done(object) {
      var features, allFeatures = [];

      features = m_this._featureArray(object);

      features.forEach(function (feature) {
        var type = m_this._featureType(feature),
        coordinates = m_this._getCoordinates(feature),
        style = m_this._getStyle(feature);
        if (type) {
          if (type === 'line') {
            style.fill = style.fill || false;
            allFeatures.push(m_this._addFeature(
              type,
              [coordinates],
              style,
              feature.properties
            ));
          } else if (type === 'point') {
            style.stroke = style.stroke || false;
            allFeatures.push(m_this._addFeature(
              type,
              coordinates,
              style,
              feature.properties
            ));
          } else if (type === 'polygon') {
            style.fill = style.fill === undefined ? true : style.fill;
            style.fillOpacity = (
              style.fillOpacity === undefined ? 0.25 : style.fillOpacity
            );
            // polygons not yet supported
            allFeatures.push(m_this._addFeature(
              type,
              [[coordinates]], //double wrap for the data method below
              style,
              feature.properties
            ));
          } else if (type === 'multipolygon') {
            style.fill = style.fill === undefined ? true : style.fill;
            style.fillOpacity = (
              style.fillOpacity === undefined ? 0.25 : style.fillOpacity
            );
            coordinates = feature.geometry.coordinates.map(function (c) {
              return [m_this._getCoordinates({
                geometry: {
                  type: 'Polygon',
                  coordinates: c
                }
              })];
            });
            allFeatures.push(m_this._addFeature(
              'polygon', //there is no multipolygon feature class
              coordinates,
              style,
              feature.properties
            ));
          }
        } else {
          console.log('unsupported feature type: ' + feature.geometry.type);
        }
      });

      if (done) {
        done(allFeatures);
      }
    }

    m_this._readObject(file, _done, progress);
  };


  ////////////////////////////////////////////////////////////////////////////
  /**
  * Build the data array for a feature given the coordinates and properties
  * from the geojson.
  *
  * @private
  * @param {Object[]} coordinates Coordinate data array
  * @param {Object} properties Geojson properties object
  * @param {Object} style Global style defaults
  * @returns {Object[]}
  */
  //////////////////////////////////////////////////////////////////////////////
  this._buildData = function (coordinates, properties, style) {
    return coordinates.map(function (coord) {
      return {
        coordinates: coord,
        properties: properties,
        style: style
      };
    });
  };

  this._addFeature = function (type, coordinates, style, properties) {
    var _style = $.extend({}, m_style, style);
    var feature = m_this.layer().createFeature(type)
    .data(m_this._buildData(coordinates, properties, style))
    .style(_style);

    if (type === 'line') {
      feature.line(function (d) { return d.coordinates; });
    } else if (type === 'polygon') {
      feature.position(function (d) {
        return {
          x: d.x,
          y: d.y,
          z: d.z
        };
      }).polygon(function (d) {
        return {
          'outer': d.coordinates[0],
          'inner': d.coordinates[1]
        };
      });
    } else {
      feature.position(function (d) {
        return d.coordinates;
      });
    }
    return feature;
  };

};

inherit(geo.jsonReader, geo.fileReader);

geo.registerFileReader('jsonReader', geo.jsonReader);

//////////////////////////////////////////////////////////////////////////////
/**
 * Creates a new map object
 *
 * Map coordinates for default world map, where c = half circumference at
 * equator in meters, o = origin:
 *   (-c, c) + o                   (c, c) + o
 *            (center.x, center.y) + o            <-- center of viewport
 *   (-c, -c) + o                  (c, -c) + o
 *
 * @class
 * @extends geo.sceneObject
 *
 * *** Always required ***
 * @param {string} node DOM selector for the map container
 *
 * *** Required when using a domain/CS different from OSM ***
 * @param {string|geo.transform} [gcs='EPSG:3857']
 *   The main coordinate system of the map
 * @param {number} [maxZoom=16] The maximum zoom level
 * @param {string|geo.transform} [ingcs='EPSG:4326']
 *   The default coordinate system of interface calls.
 * @param {number} [unitsPerPixel=156543] GCS to pixel unit scaling at zoom 0
 *   (i.e. meters per pixel or degrees per pixel).
 * @param {object?} maxBounds The maximum visable map bounds
 * @param {number} [maxBounds.left=-20037508] The left bound
 * @param {number} [maxBounds.right=20037508] The right bound
 * @param {number} [maxBounds.bottom=-20037508] The bottom bound
 * @param {number} [maxBounds.top=20037508] The top bound
 *
 * *** Initial view ***
 * @param {number} [zoom=4] Initial zoom
 * @param {object?} center Map center
 * @param {number} [center.x=0]
 * @param {number} [center.y=0]
 * @param {number} [rotation=0] Clockwise rotation in radians
 * @param {number?} width The map width (default node width)
 * @param {number?} height The map height (default node height)
 *
 * *** Navigation ***
 * @param {number} [min=0]  Minimum zoom level (though fitting to the viewport
 *   may make it so this is smaller than the smallest possible value)
 * @param {number} [max=16]  Maximum zoom level
 * @param {boolean} [discreteZoom=false]  True to only allow integer zoom
 *   levels.  False for any zoom level.
 * @param {boolean} [allowRotation=true]  False prevents rotation, true allows
 *   any rotation.  If a function, the function is called with a rotation
 *   (angle in radians) and returns a valid rotation (this can be used to
 *   constrain the rotation to a range or specific values).
 *
 * *** Advanced parameters ***
 * @param {geo.camera?} camera The camera to control the view
 * @param {geo.mapInteractor?} interactor The UI event handler
 * @param {geo.clock?} clock The clock used to synchronize time events
 * @param {boolean} [autoResize=true] Adjust map size on window resize
 * @param {boolean} [clampBoundsX=false] Prevent panning outside of the
 *   maximum bounds in the horizontal direction.
 * @param {boolean} [clampBoundsY=true] Prevent panning outside of the
 *   maximum bounds in the vertical direction.
 * @param {boolean} [clampZoom=true] Prevent zooming out so that the map area
 *   is smaller than the window.
 *
 * @returns {geo.map}
 */
//////////////////////////////////////////////////////////////////////////////
geo.map = function (arg) {
  'use strict';
  if (!(this instanceof geo.map)) {
    return new geo.map(arg);
  }
  arg = arg || {};

  if (arg.node === undefined || arg.node === null) {
    console.warn('map creation requires a node');
    return this;
  }

  geo.sceneObject.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private member variables
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_exit = this._exit,
      // See https://en.wikipedia.org/wiki/Web_Mercator
      // phiMax = 180 / Math.PI * (2 * Math.atan(Math.exp(Math.PI)) - Math.PI / 2),
      m_x = 0,
      m_y = 0,
      m_node = $(arg.node),
      m_width = arg.width || m_node.width() || 512,
      m_height = arg.height || m_node.height() || 512,
      m_gcs = arg.gcs === undefined ? 'EPSG:3857' : arg.gcs,
      m_ingcs = arg.ingcs === undefined ? 'EPSG:4326' : arg.ingcs,
      m_center = {x: 0, y: 0},
      m_zoom = arg.zoom === undefined ? 4 : arg.zoom,
      m_rotation = 0,
      m_fileReader = null,
      m_interactor = null,
      m_validZoomRange = {min: 0, max: 16, origMin: 0},
      m_transition = null,
      m_queuedTransition = null,
      m_clock = null,
      m_discreteZoom = arg.discreteZoom ? true : false,
      m_allowRotation = (typeof arg.allowRotation === 'function' ?
                         arg.allowRotation : (arg.allowRotation === undefined ?
                         true : !!arg.allowRotation)),
      m_maxBounds = arg.maxBounds || {},
      m_camera = arg.camera || geo.camera(),
      m_unitsPerPixel,
      m_clampBoundsX,
      m_clampBoundsY,
      m_clampZoom,
      m_origin,
      m_scale = {x: 1, y: 1, z: 1}; // constant and ignored for the moment

  /* Compute the maximum bounds on our map projection.  By default, x ranges
   * from [-180, 180] in the interface projection, and y matches the x range in
   * the map (not the interface) projection.  For images, this might be
   * [0, width] and [0, height] instead. */
  m_maxBounds.left = geo.transform.transformCoordinates(m_ingcs, m_gcs, [{
    x: m_maxBounds.left !== undefined ? m_maxBounds.left : -180, y: 0}])[0].x;
  m_maxBounds.right = geo.transform.transformCoordinates(m_ingcs, m_gcs, [{
    x: m_maxBounds.right !== undefined ? m_maxBounds.right : 180, y: 0}])[0].x;
  m_maxBounds.top = (m_maxBounds.top !== undefined ?
    geo.transform.transformCoordinates(m_ingcs, m_gcs, [{
    x: 0, y: m_maxBounds.top}])[0].y : m_maxBounds.right);
  m_maxBounds.bottom = (m_maxBounds.bottom !== undefined ?
    geo.transform.transformCoordinates(m_ingcs, m_gcs, [{
    x: 0, y: m_maxBounds.bottom}])[0].y : m_maxBounds.left);
  m_unitsPerPixel = (arg.unitsPerPixel || (
    m_maxBounds.right - m_maxBounds.left) / 256);

  m_camera.viewport = {width: m_width, height: m_height};
  arg.center = geo.util.normalizeCoordinates(arg.center);
  arg.autoResize = arg.autoResize === undefined ? true : arg.autoResize;
  m_clampBoundsX = arg.clampBoundsX === undefined ? false : arg.clampBoundsX;
  m_clampBoundsY = arg.clampBoundsY === undefined ? true : arg.clampBoundsY;
  m_clampZoom = arg.clampZoom === undefined ? true : arg.clampZoom;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/set the number of world space units per display pixel at the given
   * zoom level.
   *
   * @param {Number} [zoom=0] The target zoom level
   * @param {Number?} unit If present, set the unitsPerPixel otherwise return
   *   the current value.
   * @returns {Number|this}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.unitsPerPixel = function (zoom, unit) {
    zoom = zoom || 0;
    if (unit) {
      // get the units at level 0
      m_unitsPerPixel = Math.pow(2, zoom) * unit;

      // redraw all the things
      m_this.draw();
      return m_this;
    }
    return Math.pow(2, -zoom) * m_unitsPerPixel;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/set the clampBoundsX setting.  If changed, adjust the bounds of the
   * map as needed.
   *
   * @param {boolean?} clamp The new clamp value.
   * @returns {boolean|this}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.clampBoundsX = function (clamp) {
    if (clamp === undefined) {
      return m_clampBoundsX;
    }
    if (clamp !== m_clampBoundsX) {
      m_clampBoundsX = !!clamp;
      m_this.pan({x: 0, y: 0});
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/set the clampBoundsY setting.  If changed, adjust the bounds of the
   * map as needed.
   *
   * @param {boolean?} clamp The new clamp value.
   * @returns {boolean|this}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.clampBoundsY = function (clamp) {
    if (clamp === undefined) {
      return m_clampBoundsY;
    }
    if (clamp !== m_clampBoundsY) {
      m_clampBoundsY = !!clamp;
      m_this.pan({x: 0, y: 0});
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/set the clampZoom setting.  If changed, adjust the bounds of the map
   * as needed.
   *
   * @param {boolean?} clamp The new clamp value.
   * @returns {boolean|this}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.clampZoom = function (clamp) {
    if (clamp === undefined) {
      return m_clampZoom;
    }
    if (clamp !== m_clampZoom) {
      m_clampZoom = !!clamp;
      reset_minimum_zoom();
      m_this.zoom(m_zoom);
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/set the allowRotation setting.  If changed, adjust the map as needed.
   *
   * @param {boolean|function} allowRotation the new allowRotation value.
   * @returns {boolean|function|this}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.allowRotation = function (allowRotation) {
    if (allowRotation === undefined) {
      return m_allowRotation;
    }
    if (typeof allowRotation !== 'function') {
      allowRotation = !!allowRotation;
    }
    if (allowRotation !== m_allowRotation) {
      m_allowRotation = allowRotation;
      m_this.rotation(m_rotation);
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the map's world coordinate origin in gcs coordinates
   *
   * @returns {object}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.origin = function () {
    return $.extend({}, m_origin);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the map's world coordinate scaling relative gcs units
   *
   * @returns {object}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.scale = function () {
    return $.extend({}, m_scale);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the camera
   *
   * @returns {geo.camera}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.camera = function () {
    return m_camera;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get map gcs
   *
   * @returns {string}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.gcs = function (arg) {
    if (arg === undefined) {
      return m_gcs;
    }
    m_gcs = arg;
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get map interface gcs
   *
   * @returns {string}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.ingcs = function (arg) {
    if (arg === undefined) {
      return m_ingcs;
    }
    m_ingcs = arg;
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get root node of the map
   *
   * @returns {object}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.node = function () {
    return m_node;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set zoom level of the map
   *
   * @returns {Number|geo.map}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.zoom = function (val, origin, ignoreDiscreteZoom) {
    var evt, oldZoom, bounds;
    if (val === undefined) {
      return m_zoom;
    }

    oldZoom = m_zoom;
    /* The ignoreDiscreteZoom flag is intended to allow non-integer zoom values
     * during animation. */
    val = fix_zoom(val, ignoreDiscreteZoom);
    if (val === m_zoom) {
      return m_this;
    }

    m_zoom = val;

    bounds = m_this.boundsFromZoomAndCenter(val, m_center, m_rotation, null);
    m_this.modified();

    camera_bounds(bounds, m_rotation);
    evt = {
      geo: {},
      zoomLevel: m_zoom,
      screenPosition: origin ? origin.map : undefined
    };
    m_this.geoTrigger(geo.event.zoom, evt);

    if (origin && origin.geo && origin.map) {
      var shifted = m_this.gcsToDisplay(origin.geo);
      m_this.pan({x: origin.map.x - shifted.x, y: origin.map.y - shifted.y});
    } else {
      m_this.pan({x: 0, y: 0});
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Pan the map by (x: dx, y: dy) pixels.
   *
   * @param {Object} delta
   * @returns {geo.map}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.pan = function (delta) {
    var evt, unit;
    evt = {
      geo: {},
      screenDelta: delta
    };

    unit = m_this.unitsPerPixel(m_zoom);

    var sinr = Math.sin(m_rotation), cosr = Math.cos(m_rotation);
    m_camera.pan({
      x: (delta.x * cosr - (-delta.y) * sinr) * unit,
      y: (delta.x * sinr + (-delta.y) * cosr) * unit
    });
    /* If m_clampBounds* is true, clamp the pan */
    var bounds = fix_bounds(m_camera.bounds, m_rotation);
    if (bounds !== m_camera.bounds) {
      var panPos = m_this.gcsToDisplay({
            x: m_camera.bounds.left, y: m_camera.bounds.top}, null);
      bounds = m_this.boundsFromZoomAndCenter(m_zoom, {
        x: (bounds.left + bounds.right) / 2,
        y: (bounds.top + bounds.bottom) / 2
      }, m_rotation, null);
      camera_bounds(bounds, m_rotation);
      var clampPos = m_this.gcsToDisplay({
            x: m_camera.bounds.left, y: m_camera.bounds.top}, null);
      evt.screenDelta.x += clampPos.x - panPos.x;
      evt.screenDelta.y += clampPos.y - panPos.y;
    }

    m_center = m_camera.displayToWorld({
      x: m_width / 2,
      y: m_height / 2
    });

    m_this.geoTrigger(geo.event.pan, evt);

    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/set the map rotation.  The rotation is performed around the current
   * view center.
   *
   * @param {Object} rotation angle in radians (positive is clockwise)
   * @param {Object} origin is specified, rotate about this origin
   * @param {boolean} ignoreRotationFunc if true, don't constrain the rotation.
   * @returns {geo.map}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.rotation = function (rotation, origin, ignoreRotationFunc) {
    if (rotation === undefined) {
      return m_rotation;
    }
    rotation = fix_rotation(rotation, ignoreRotationFunc);
    if (rotation === m_rotation) {
      return m_this;
    }
    m_rotation = rotation;

    var bounds = m_this.boundsFromZoomAndCenter(
        m_zoom, m_center, m_rotation, null);
    m_this.modified();

    camera_bounds(bounds, m_rotation);

    var evt = {
      geo: {},
      rotation: m_rotation,
      screenPosition: origin ? origin.map : undefined
    };

    m_this.geoTrigger(geo.event.rotate, evt);

    if (origin && origin.geo && origin.map) {
      var shifted = m_this.gcsToDisplay(origin.geo);
      m_this.pan({x: origin.map.x - shifted.x, y: origin.map.y - shifted.y});
    } else {
      m_this.pan({x: 0, y: 0});
    }
    /* Changing the rotation can change our minimum zoom */
    reset_minimum_zoom();
    m_this.zoom(m_zoom);
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set center of the map to the given geographic coordinates, or get the
   * current center.  Uses bare objects {x: 0, y: 0}.
   *
   * @param {Object} coordinates
   * @param {string|geo.transform} [gcs] undefined to use the interface gcs,
   *    null to use the map gcs, or any other transform.  If setting the
   *    center, they are converted from this gcs to the map projection.  The
   *    returned center are converted from the map projection to this gcs.
   * @returns {Object|geo.map}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.center = function (coordinates, gcs) {
    var center;
    if (coordinates === undefined) {
      center = $.extend({}, m_this.worldToGcs(m_center, gcs));
      return center;
    }

    // get the screen coordinates of the new center
    m_center = $.extend({}, m_this.gcsToWorld(coordinates, gcs));

    camera_bounds(m_this.boundsFromZoomAndCenter(
        m_zoom, m_center, m_rotation, null), m_rotation);
    // trigger a pan event
    m_this.geoTrigger(
      geo.event.pan,
      {
        geo: coordinates,
        screenDelta: null
      }
    );
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Add layer to the map
   *
   * @param {geo.layer} layer to be added to the map
   * @return {geom.map}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.createLayer = function (layerName, arg) {
    arg = arg || {};
    var newLayer = geo.createLayer(
      layerName, m_this, arg);

    if (newLayer) {

      m_this.addChild(newLayer);
      newLayer._update();
      m_this.modified();

      m_this.geoTrigger(geo.event.layerAdd, {
        type: geo.event.layerAdd,
        target: m_this,
        layer: newLayer
      });
    }

    return newLayer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Remove layer from the map
   *
   * @param {geo.layer} layer that should be removed from the map
   * @return {geo.map}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.deleteLayer = function (layer) {

    if (layer !== null && layer !== undefined) {
      layer._exit();
      m_this.removeChild(layer);

      m_this.modified();

      m_this.geoTrigger(geo.event.layerRemove, {
        type: geo.event.layerRemove,
        target: m_this,
        layer: layer
      });
    }

    /// Return deleted layer (similar to createLayer) as in the future
    /// we may provide extension of this method to support deletion of
    /// layer using id or some sort.
    return layer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the size of the map.
   *
   * @param {Object?} arg
   * @param {Number} arg.width width in pixels
   * @param {Number} arg.height height in pixels
   * @returns {Object} An object containing width and height as keys
   */
  ////////////////////////////////////////////////////////////////////////////
  this.size = function (arg) {
    if (arg === undefined) {
      return {
        width: m_width,
        height: m_height
      };
    }
    m_this.resize(0, 0, arg.width, arg.height);
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the rotated size of the map.  This is the width and height of the
   * non-rotated area necessary to enclose the rotated area in pixels.
   *
   * @returns {Object} An object containing width and height as keys
   */
  ////////////////////////////////////////////////////////////////////////////
  this.rotatedSize = function () {
    if (!this.rotation()) {
      return {
        width: m_width,
        height: m_height
      };
    }
    var bds = rotate_bounds_center(
        {x: 0, y: 0}, {width: m_width, height: m_height}, this.rotation());
    return {
      width: Math.abs(bds.right - bds.left),
      height: Math.abs(bds.top - bds.bottom)
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Resize map (deprecated)
   *
   * @param {Number} x x-offset in display space
   * @param {Number} y y-offset in display space
   * @param {Number} w width in display space
   * @param {Number} h height in display space
   */
  ////////////////////////////////////////////////////////////////////////////
  this.resize = function (x, y, w, h) {

    // store the original center and restore it after the resize
    var oldCenter = m_this.center();
    m_x = x;
    m_y = y;
    m_width = w;
    m_height = h;

    m_this.camera().viewport = {width: w, height: h};

    reset_minimum_zoom();
    var newZoom = fix_zoom(m_zoom);
    if (newZoom !== m_zoom) {
      m_this.zoom(newZoom);
    }

    m_this.geoTrigger(geo.event.resize, {
      type: geo.event.resize,
      target: m_this,
      x: m_x,
      y: m_y,
      width: w,
      height: h
    });

    m_this.center(oldCenter);
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert from gcs coordinates to map world coordinates.
   * @param {object} c The input coordinate to convert
   * @param {object} c.x
   * @param {object} c.y
   * @param {object} [c.z=0]
   * @param {string?} gcs The gcs of the input (map.gcs() by default)
   * @return {object} World space coordinates
   */
  ////////////////////////////////////////////////////////////////////////////
  this.gcsToWorld = function (c, gcs) {
    gcs = (gcs === null ? m_gcs : (gcs === undefined ? m_ingcs : gcs));
    if (gcs !== m_gcs) {
      c = geo.transform.transformCoordinates(gcs, m_gcs, [c])[0];
    }
    return geo.transform.affineForward(
      {origin: m_origin},
      [c]
    )[0];
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert from map world coordinates to gcs coordinates.
   * @param {object} c The input coordinate to convert
   * @param {object} c.x
   * @param {object} c.y
   * @param {object} [c.z=0]
   * @param {string|geo.transform} [gcs] undefined to use the interface gcs,
   *    null to use the map gcs, or any other transform.
   * @return {object} GCS space coordinates
   */
  ////////////////////////////////////////////////////////////////////////////
  this.worldToGcs = function (c, gcs) {
    c = geo.transform.affineInverse(
      {origin: m_origin},
      [c]
    )[0];
    gcs = (gcs === null ? m_gcs : (gcs === undefined ? m_ingcs : gcs));
    if (gcs !== m_gcs) {
      c = geo.transform.transformCoordinates(m_gcs, gcs, [c])[0];
    }
    return c;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert from gcs coordinates to display coordinates.
   *
   *    gcsToWorld | worldToDisplay
   *
   * @param {object} c The input coordinate to convert
   * @param {object} c.x
   * @param {object} c.y
   * @param {object} [c.z=0]
   * @param {string|geo.transform} [gcs] undefined to use the interface gcs,
   *    null to use the map gcs, or any other transform.
   * @return {object} Display space coordinates
   */
  ////////////////////////////////////////////////////////////////////////////
  this.gcsToDisplay = function (c, gcs) {
    c = m_this.gcsToWorld(c, gcs);
    return m_this.worldToDisplay(c);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert from world coordinates to display coordinates using the attached
   * camera.
   * @param {object} c The input coordinate to convert
   * @param {object} c.x
   * @param {object} c.y
   * @param {object} [c.z=0]
   * @return {object} Display space coordinates
   */
  ////////////////////////////////////////////////////////////////////////////
  this.worldToDisplay = function (c) {
    return m_camera.worldToDisplay(c);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert from display to gcs coordinates
   *
   *    displayToWorld | worldToGcs
   *
   * @param {object} c The input display coordinate to convert
   * @param {object} c.x
   * @param {object} c.y
   * @param {object} [c.z=0]
   * @param {string|geo.transform} [gcs] undefined to use the interface gcs,
   *    null to use the map gcs, or any other transform.
   * @return {object} GCS space coordinates
   */
  ////////////////////////////////////////////////////////////////////////////
  this.displayToGcs = function (c, gcs) {
    c = m_this.displayToWorld(c); // done via camera
    return m_this.worldToGcs(c, gcs);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert from display coordinates to world coordinates using the attached
   * camera.
   * @param {object} c The input coordinate to convert
   * @param {object} c.x
   * @param {object} c.y
   * @param {object} [c.z=0]
   * @return {object} World space coordinates
   */
  ////////////////////////////////////////////////////////////////////////////
  this.displayToWorld = function (c) {
    return m_camera.displayToWorld(c);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Manually force to render map
   */
  ////////////////////////////////////////////////////////////////////////////
  this.draw = function () {
    var i, layers = m_this.children();

    m_this.geoTrigger(geo.event.draw, {
        type: geo.event.draw,
        target: m_this
      }
    );

    m_this._update();

    for (i = 0; i < layers.length; i += 1) {
      layers[i].draw();
    }

    m_this.geoTrigger(geo.event.drawEnd, {
        type: geo.event.drawEnd,
        target: m_this
      }
    );

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Attach a file reader to a layer in the map to be used as a drop target.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.fileReader = function (readerType, opts) {
    var layer, renderer;
    opts = opts || {};
    if (!readerType) {
      return m_fileReader;
    }
    layer = opts.layer;
    if (!layer) {
      renderer = opts.renderer;
      if (!renderer) {
        renderer = 'd3';
      }
      layer = m_this.createLayer('feature', {renderer: renderer});
    }
    opts.layer = layer;
    opts.renderer = renderer;
    m_fileReader = geo.createFileReader(readerType, opts);
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize the map
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function () {

    if (m_node === undefined || m_node === null) {
      throw 'Map require DIV node';
    }

    m_node.css('position', 'relative');
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update map
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function (request) {
    var i, layers = m_this.children();
    for (i = 0; i < layers.length; i += 1) {
      layers[i]._update(request);
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Exit this map
   */
  ////////////////////////////////////////////////////////////////////////////
  this.exit = function () {
    var i, layers = m_this.children();
    for (i = 0; i < layers.length; i += 1) {
      layers[i]._exit();
    }
    if (m_this.interactor()) {
      m_this.interactor().destroy();
      m_this.interactor(null);
    }
    m_this.node().off('.geo');
    $(window).off('resize', resizeSelf);
    s_exit();
  };

  this._init(arg);

  // set up drag/drop handling
  this.node().on('dragover.geo', function (e) {
    var evt = e.originalEvent;

    if (m_this.fileReader()) {
      evt.stopPropagation();
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'copy';
    }
  })
  .on('drop.geo', function (e) {
    var evt = e.originalEvent, reader = m_this.fileReader(),
        i, file;

    function done() {
      m_this.draw();
    }

    if (reader) {
      evt.stopPropagation();
      evt.preventDefault();

      for (i = 0; i < evt.dataTransfer.files.length; i += 1) {
        file = evt.dataTransfer.files[i];
        if (reader.canRead(file)) {
          reader.read(file, done); // to do: trigger event on done
        }
      }
    }
  });

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the map interactor
   */
  ////////////////////////////////////////////////////////////////////////////
  this.interactor = function (arg) {
    if (arg === undefined) {
      return m_interactor;
    }
    m_interactor = arg;

    // this makes it possible to set a null interactor
    // i.e. map.interactor(null);
    if (m_interactor) {
      m_interactor.map(m_this);
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the map clock
   */
  ////////////////////////////////////////////////////////////////////////////
  this.clock = function (arg) {
    if (arg === undefined) {
      return m_clock;
    }
    m_clock = arg;

    if (m_clock) {
      m_clock.object(m_this);
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the min/max zoom range.
   *
   * @param {Object} arg {min: minimumzoom, max: maximumzom}
   * @param {boolean} noRefresh if true, don't update the map if the zoom level
   *                            has changed.
   * @returns {Object|geo.map}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.zoomRange = function (arg, noRefresh) {
    if (arg === undefined) {
      return $.extend({}, m_validZoomRange);
    }
    if (arg.max !== undefined) {
      m_validZoomRange.max = arg.max;
    }
    if (arg.min !== undefined) {
      m_validZoomRange.min = m_validZoomRange.origMin = arg.min;
    }
    reset_minimum_zoom();
    if (!noRefresh) {
      m_this.zoom(m_zoom);
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Start an animated zoom/pan/rotate.  If a second transition is requested
   * while a transition is already in progress, a new transition is created
   * that is functionally from whereever the map has moved to (possibly partway
   * through the first transition) going to the end point of the new
   * transition.
   *
   * Options:
   * <pre>
   *   opts = {
   *     center: { x: ... , y: ... } // the new center
   *     zoom: ... // the new zoom level
   *     rotation: ... // the new rotation angle
   *     duration: ... // the duration (in ms) of the transition
   *     ease: ... // an easing function [0, 1] -> [0, 1]
   *   }
   * </pre>
   *
   * Call with no arguments to return the current transition information.
   *
   * @param {object?} opts
   * @param {string|geo.transform} [gcs] undefined to use the interface gcs,
   *    null to use the map gcs, or any other transform.  Applies only to the
   *    center coordinate of the opts and to converting zoom values to height,
   *    if specified.
   * @returns {geo.map}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.transition = function (opts, gcs) {

    if (opts === undefined) {
      return m_transition;
    }

    if (m_transition) {
      m_queuedTransition = opts;
      return m_this;
    }

    function interp1(p0, p1, t) {
      return p0 + (p1 - p0) * t;
    }
    function defaultInterp(p0, p1) {
      return function (t) {
        var result = [];
        $.each(p0, function (idx) {
          result.push(interp1(p0[idx], p1[idx], t));
        });
        return result;
      };
    }

    var units = m_this.unitsPerPixel(0);

    // Transform zoom level into z-coordinate and inverse
    function zoom2z(z) {
      return vgl.zoomToHeight(z + 1, m_width, m_height) * units;
    }
    function z2zoom(z) {
      return vgl.heightToZoom(z / units, m_width, m_height) - 1;
    }

    var defaultOpts = {
      center: m_this.center(undefined, null),
      zoom: m_this.zoom(),
      rotation: m_this.rotation(),
      duration: 1000,
      ease: function (t) {
        return t;
      },
      interp: defaultInterp,
      done: null,
      zCoord: true
    };

    if (opts.center) {
      gcs = (gcs === null ? m_gcs : (gcs === undefined ? m_ingcs : gcs));
      opts = $.extend(true, {}, opts);
      opts.center = geo.util.normalizeCoordinates(opts.center);
      if (gcs !== m_gcs) {
        opts.center = geo.transform.transformCoordinates(gcs, m_gcs, [
            opts.center])[0];
      }
    }
    opts = $.extend(true, {}, defaultOpts, opts);

    m_transition = {
      start: {
        center: m_this.center(undefined, null),
        zoom: m_this.zoom(),
        rotation: m_this.rotation()
      },
      end: {
        center: opts.center,
        zoom: fix_zoom(opts.zoom),
        rotation: fix_rotation(opts.rotation, undefined, true)
      },
      ease: opts.ease,
      zCoord: opts.zCoord,
      done: opts.done,
      duration: opts.duration
    };

    if (opts.zCoord) {
      m_transition.interp = opts.interp(
        [
          m_transition.start.center.x,
          m_transition.start.center.y,
          zoom2z(m_transition.start.zoom),
          m_transition.start.rotation
        ],
        [
          m_transition.end.center.x,
          m_transition.end.center.y,
          zoom2z(m_transition.end.zoom),
          m_transition.end.rotation
        ]
      );
    } else {
      m_transition.interp = opts.interp(
        [
          m_transition.start.center.x,
          m_transition.start.center.y,
          m_transition.start.zoom,
          m_transition.start.rotation
        ],
        [
          m_transition.end.center.x,
          m_transition.end.center.y,
          m_transition.end.zoom,
          m_transition.end.rotation
        ]
      );
    }

    function anim(time) {
      var done = m_transition.done, next;
      next = m_queuedTransition;

      if (!m_transition.start.time) {
        m_transition.start.time = time;
        m_transition.end.time = time + opts.duration;
      }
      m_transition.time = time - m_transition.start.time;
      if (time >= m_transition.end.time || next) {
        if (!next) {
          m_this.center(m_transition.end.center, null);
          m_this.zoom(m_transition.end.zoom);
          m_this.rotation(fix_rotation(m_transition.end.rotation));
        }

        m_transition = null;

        m_this.geoTrigger(geo.event.transitionend, opts);

        if (done) {
          done();
        }

        if (next) {
          m_queuedTransition = null;
          m_this.transition(next);
        }

        return;
      }

      var z = m_transition.ease(
        (time - m_transition.start.time) / opts.duration
      );

      var p = m_transition.interp(z);
      if (m_transition.zCoord) {
        p[2] = z2zoom(p[2]);
      }
      if (fix_zoom(p[2], true) === m_zoom) {
        m_this.center({
          x: p[0],
          y: p[1]
        }, null);
      } else {
        m_center = m_this.gcsToWorld({x: p[0], y: p[1]}, null);
        m_this.zoom(p[2], undefined, true);
      }
      m_this.rotation(p[3], undefined, true);

      window.requestAnimationFrame(anim);
    }

    m_this.geoTrigger(geo.event.transitionstart, opts);

    if (geo.event.cancelNavigation) {
      m_transition = null;
      m_this.geoTrigger(geo.event.transitionend, opts);
      return m_this;
    } else if (geo.event.cancelAnimation) {
      // run the navigation synchronously
      opts.duration = 0;
      anim(0);
    } else {
      window.requestAnimationFrame(anim);
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/set the locations of the current map corners as latitudes/longitudes.
   * When provided the argument should be an object containing the keys left,
   * top, right, bottom declaring the desired new map bounds.  The new bounds
   * will contain at least the min/max lat/lngs provided modified by clamp
   * settings.  In any case, the actual new bounds will be returned by this
   * function.
   *
   * @param {geo.geoBounds} [bds] The requested map bounds
   * @param {string|geo.transform} [gcs] undefined to use the interface gcs,
   *    null to use the map gcs, or any other transform.  If setting the
   *    bounds, they are converted from this gcs to the map projection.  The
   *    returned bounds are converted from the map projection to this gcs.
   * @return {geo.geoBounds} The actual new map bounds
   */
  ////////////////////////////////////////////////////////////////////////////
  this.bounds = function (bds, gcs) {
    var nav;

    gcs = (gcs === null ? m_gcs : (gcs === undefined ? m_ingcs : gcs));
    if (bds !== undefined) {
      if (gcs !== m_gcs) {
        var trans = geo.transform.transformCoordinates(gcs, m_gcs, [{
            x: bds.left, y: bds.top}, {x: bds.right, y: bds.bottom}]);
        bds = {
          left: trans[0].x,
          top: trans[0].y,
          right: trans[1].x,
          bottom: trans[1].y
        };
      }
      bds = fix_bounds(bds, m_rotation);
      nav = m_this.zoomAndCenterFromBounds(bds, m_rotation, null);

      // This might have consequences in terms of bounds/zoom clamping.
      // What behavior do we expect from this method in that case?
      m_this.zoom(nav.zoom);
      m_this.center(nav.center, null);
    }

    return m_this.boundsFromZoomAndCenter(m_zoom, m_center, m_rotation, gcs);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the center zoom level necessary to display the given lat/lon bounds.
   *
   * @param {geo.geoBounds} [bds] The requested map bounds
   * @param {number} rotation Rotation in clockwise radians.
   * @param {string|geo.transform} [gcs] undefined to use the interface gcs,
   *    null to use the map gcs, or any other transform.
   * @return {object} Object containing keys 'center' and 'zoom'
   */
  ////////////////////////////////////////////////////////////////////////////
  this.zoomAndCenterFromBounds = function (bounds, rotation, gcs) {
    var center, zoom;

    gcs = (gcs === null ? m_gcs : (gcs === undefined ? m_ingcs : gcs));
    if (gcs !== m_gcs) {
      var trans = geo.transform.transformCoordinates(gcs, m_gcs, [{
          x: bounds.left, y: bounds.top}, {x: bounds.right, y: bounds.bottom}]);
      bounds = {
        left: trans[0].x,
        top: trans[0].y,
        right: trans[1].x,
        bottom: trans[1].y
      };
    }
    if (bounds.left >= bounds.right || bounds.bottom >= bounds.top) {
      throw new Error('Invalid bounds provided');
    }

    // calculate the zoom to fit the bounds
    zoom = fix_zoom(calculate_zoom(bounds, rotation));

    // clamp bounds if necessary
    bounds = fix_bounds(bounds, rotation);

    /* This relies on having the map projection coordinates be uniform
     * regardless of location.  If not, the center will not be correct. */
    // calculate new center
    center = {
      x: (bounds.left + bounds.right) / 2 - m_origin.x,
      y: (bounds.top + bounds.bottom) / 2 - m_origin.y
    };
    if (gcs !== m_gcs) {
      center = geo.transform.transformCoordinates(m_gcs, gcs, [center])[0];
    }
    return {
      zoom: zoom,
      center: center
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the bounds that will be displayed with the given zoom and center.
   *
   * Note: the bounds may not have the requested zoom and center due to map
   * restrictions.
   *
   * @param {number} zoom The requested zoom level
   * @param {geo.geoPosition} center The requested center
   * @param {number} rotation The requested rotation
   * @param {string|geo.transform} [gcs] undefined to use the interface gcs,
   *    null to use the map gcs, or any other transform.
   * @return {geo.geoBounds}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.boundsFromZoomAndCenter = function (zoom, center, rotation, gcs) {
    var width, height, halfw, halfh, bounds, units;

    gcs = (gcs === null ? m_gcs : (gcs === undefined ? m_ingcs : gcs));
    // preprocess the arguments
    zoom = fix_zoom(zoom);
    units = m_this.unitsPerPixel(zoom);
    center = m_this.gcsToWorld(center, gcs);

    // get half the width and height in world coordinates
    width = m_width * units;
    height = m_height * units;
    halfw = width / 2;
    halfh = height / 2;

    // calculate the bounds.  This is only valid if the map projection has
    // uniform units in each direction.  If not, then worldToGcs should be
    // used.

    if (rotation) {
      center.x += m_origin.x;
      center.y += m_origin.y;
      bounds = rotate_bounds_center(
        center, {width: width, height: height}, rotation);
      // correct the bounds when clamping is enabled
      bounds.width = width;
      bounds.height = height;
      bounds = fix_bounds(bounds, rotation);
    } else {
      bounds = {
        left: center.x - halfw + m_origin.x,
        right: center.x + halfw + m_origin.x,
        bottom: center.y - halfh + m_origin.y,
        top: center.y + halfh + m_origin.y
      };
      // correct the bounds when clamping is enabled
      bounds = fix_bounds(bounds, 0);
    }
    if (gcs !== m_gcs) {
      var bds = geo.transform.transformCoordinates(
        m_gcs, gcs,
        [[bounds.left, bounds.top], [bounds.right, bounds.bottom]]);
      bounds = {
        left: bds[0][0], top: bds[0][1], right: bds[1][0], bottom: bds[1][1]
      };
    }
    /* Add the original width and height of the viewport before rotation. */
    bounds.width = width;
    bounds.height = height;
    return bounds;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/set the discrete zoom flag.
   *
   * @param {bool} If specified, the discrete zoom flag.
   * @return {bool} The current discrete zoom flag if no parameter is
   *                specified, otherwise the map object.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.discreteZoom = function (discreteZoom) {
    if (discreteZoom === undefined) {
      return m_discreteZoom;
    }
    discreteZoom = discreteZoom ? true : false;
    if (m_discreteZoom !== discreteZoom) {
      m_discreteZoom = discreteZoom;
      if (m_discreteZoom) {
        m_this.zoom(Math.round(m_this.zoom()));
      }
      m_this.interactor().options({discreteZoom: m_discreteZoom});
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the layers contained in the map.
   * Alias of {@linkcode geo.sceneObject.children}.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.layers = this.children;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update the attribution notice displayed on the bottom right corner of
   * the map.  The content of this notice is managed by individual layers.
   * This method queries all of the visible layers and joins the individual
   * attribution notices into a single element.  By default, this method
   * is called on each of the following events:
   *
   *   * geo.event.layerAdd
   *   * geo.event.layerRemove
   *
   * In addition, layers should call this method when their own attribution
   * notices has changed.  Users, in general, should not need to call this.
   * @returns {this} Chainable
   */
  ////////////////////////////////////////////////////////////////////////////
  this.updateAttribution = function () {
    // clear any existing attribution content
    m_this.node().find('.geo-attribution').remove();

    // generate a new attribution node
    var $a = $('<div/>')
      .addClass('geo-attribution')
      .css({
        position: 'absolute',
        right: '0px',
        bottom: '0px',
        'padding-right': '5px',
        cursor: 'auto',
        font: '11px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif',
        'z-index': '1001',
        background: 'rgba(255,255,255,0.7)',
        clear: 'both',
        display: 'block',
        'pointer-events': 'auto'
      }).on('mousedown', function (evt) {
        evt.stopPropagation();
      });

    // append content from each layer
    m_this.children().forEach(function (layer) {
      var content = layer.attribution();
      if (content) {
        $('<span/>')
          .addClass('geo-attribution-layer')
          .css({
            'padding-left': '5px'
          })
          .html(content)
          .appendTo($a);
      }
    });

    $a.appendTo(m_this.node());
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  //
  // The following are some private methods for interacting with the camera.
  // In order to hide the complexity of dealing with map aspect ratios,
  // clamping behavior, reseting zoom levels on resize, etc. from the
  // layers, the map handles camera movements directly.  This requires
  // passing all camera movement events through the map initially.  The
  // map uses these methods to fix up the events according to the constraints
  // of the display and passes the event to the layers.
  //
  ////////////////////////////////////////////////////////////////////////////
  /**
   * Calculate the scaling factor to fit the given map bounds
   * into the viewport with the correct aspect ratio.
   * @param {object} bounds A desired bounds
   * @return {object} Multiplicative aspect ratio correction
   * @private
   */
  function camera_scaling(bounds) {
    var width = bounds.right - bounds.left,
        height = bounds.top - bounds.bottom,
        ar_bds = Math.abs(width / height),
        ar_vp = m_width / m_height,
        sclx, scly;

    if (ar_bds > ar_vp) {
      // fit left and right
      sclx = 1;

      // grow top and bottom
      scly = ar_bds / ar_vp;
    } else {
      // fit top and bottom
      scly = 1;

      // grow left and right
      sclx = ar_vp / ar_bds;
    }
    return {x: sclx, y: scly};
  }

  /**
   * Adjust a set of bounds based on a rotation.
   * @private.
   */
  function rotate_bounds(bounds, rotation) {
    if (rotation) {
      var center = {
        x: (bounds.left + bounds.right) / 2,
        y: (bounds.top + bounds.bottom) / 2
      };
      var size = {
        width: Math.abs(bounds.left - bounds.right),
        height: Math.abs(bounds.top - bounds.bottom)
      };
      bounds = rotate_bounds_center(center, size, rotation);
    }
    return bounds;
  }

  /**
   * Generate a set of bounds based on a center point, a width and height, and
   * a rotation.
   * @private.
   */
  function rotate_bounds_center(center, size, rotation) {
    // calculate the half width and height
    var width = size.width / 2, height = size.height / 2;
    var sinr = Math.sin(rotation), cosr = Math.cos(rotation);
    var ul = {}, ur = {}, ll = {}, lr = {};
    ul.x = center.x + (-width) * cosr - (-height) * sinr;
    ul.y = center.y + (-width) * sinr + (-height) * cosr;
    ur.x = center.x +   width  * cosr - (-height) * sinr;
    ur.y = center.y +   width  * sinr + (-height) * cosr;
    ll.x = center.x + (-width) * cosr -   height  * sinr;
    ll.y = center.y + (-width) * sinr +   height  * cosr;
    lr.x = center.x +   width  * cosr -   height  * sinr;
    lr.y = center.y +   width  * sinr +   height  * cosr;
    return {
      left: Math.min(ul.x, ur.x, ll.x, lr.x),
      right: Math.max(ul.x, ur.x, ll.x, lr.x),
      bottom: Math.min(ul.y, ur.y, ll.y, lr.y),
      top: Math.max(ul.y, ur.y, ll.y, lr.y)
    };
  }

  /**
   * Calculate the minimum zoom level to fit the given
   * bounds inside the view port using the view port size,
   * the given bounds, and the number of units per
   * pixel.  The method sets the valid zoom bounds as well
   * as the current zoom level to be within that range.
   * @private
   */
  function calculate_zoom(bounds, rotation) {
    if (rotation === undefined) {
      rotation = m_rotation;
    }
    bounds = rotate_bounds(bounds, rotation);
    // compare the aspect ratios of the viewport and bounds
    var scl = camera_scaling(bounds), z;

    if (scl.y > scl.x) {
      // left to right matches exactly
      // center map vertically and have blank borders on the
      // top and bottom (or repeat tiles)
      z = -Math.log2(
        Math.abs(bounds.right - bounds.left) * scl.x /
        (m_width * m_unitsPerPixel)
      );
    } else {
      // top to bottom matches exactly, blank border on the
      // left and right (or repeat tiles)
      z = -Math.log2(
        Math.abs(bounds.top - bounds.bottom) * scl.y /
        (m_height * m_unitsPerPixel)
      );
    }
    return z;
  }

  /**
   * Reset the minimum zoom level given the current window size.
   * @private
   */
  function reset_minimum_zoom() {
    if (m_clampZoom) {
      m_validZoomRange.min = Math.max(
          m_validZoomRange.origMin, calculate_zoom(m_maxBounds));
    } else {
      m_validZoomRange.min = m_validZoomRange.origMin;
    }
  }

  /**
   * Return the nearest valid zoom level to the requested zoom.
   * @private
   */
  function fix_zoom(zoom, ignoreDiscreteZoom) {
    zoom = Math.max(
      Math.min(
        m_validZoomRange.max,
        zoom
      ),
      m_validZoomRange.min
    );
    if (m_discreteZoom && !ignoreDiscreteZoom) {
      zoom = Math.round(zoom);
      if (zoom < m_validZoomRange.min) {
        zoom = Math.ceil(m_validZoomRange.min);
      }
    }
    return zoom;
  }

  /**
   * Return a valid rotation angle.
   * @private
   */
  function fix_rotation(rotation, ignoreRotationFunc, noRangeLimit) {
    if (!m_allowRotation) {
      return 0;
    }
    if (!ignoreRotationFunc && typeof m_allowRotation === 'function') {
      rotation = m_allowRotation(rotation);
    }
    /* Ensure that the rotation is in the range [0, 2pi) */
    if (!noRangeLimit) {
      var range = Math.PI * 2;
      rotation = (rotation % range) + (rotation >= 0 ? 0 : range);
      if (Math.min(Math.abs(rotation), Math.abs(rotation - range)) < 0.00001) {
        rotation = 0;
      }
    }
    return rotation;
  }

  /**
   * Return the nearest valid bounds maintaining the
   * width and height. Does nothing if m_clampBounds* is
   * false.
   * @private
   */
  function fix_bounds(bounds, rotation) {
    if (!m_clampBoundsX && !m_clampBoundsY) {
      return bounds;
    }
    var dx, dy, maxBounds = m_maxBounds;
    if (rotation) {
      maxBounds = $.extend({}, m_maxBounds);
      /* When rotated, expand the maximum bounds so that they will allow the
       * corners to be visible.  We know the rotated bounding box, plus the
       * original maximum bounds.  To fit the corners of the maximum bounds, we
       * can expand the total bounds by the same factor that the rotated
       * bounding box is expanded from the non-rotated bounding box (for a
       * small rotation, this is sin(rotation) * (original bounding box height)
       * in the width).  This feels like appropriate behaviour with one of the
       * two bounds clamped.  With both, it seems mildly peculiar. */
      var bw = Math.abs(bounds.right - bounds.left),
          bh = Math.abs(bounds.top - bounds.bottom),
          absinr = Math.abs(Math.sin(rotation)),
          abcosr = Math.abs(Math.cos(rotation)),
          ow, oh;
      if (bounds.width && bounds.height) {
        ow = bounds.width;
        oh = bounds.height;
      } else if (Math.abs(absinr - abcosr) < 0.0005) {
        /* If we are close to a 45 degree rotation, it is ill-determined to
         * compute the original (pre-rotation) bounds width and height.  In
         * this case, assume that we are using the map's aspect ratio. */
        if (m_width && m_height) {
          var aspect = Math.abs(m_width / m_height);
          var fac = Math.pow(1 + Math.pow(aspect, 2), 0.5);
          ow = Math.max(bw, bh) / fac;
          oh = ow * aspect;
        } else {
          /* Fallback if we don't have width or height */
          ow = bw * abcosr;
          oh = bh * absinr;
        }
      } else {
        /* Compute the pre-rotation (original) bounds width and height */
        ow = (abcosr * bw - absinr * bh) / (abcosr * abcosr - absinr * absinr);
        oh = (abcosr * bh - absinr * bw) / (abcosr * abcosr - absinr * absinr);
      }
      /* Our maximum bounds are expanded based on the projected length of a
       * tilted side of the original bounding box in the rotated bounding box.
       * To handle all rotations, take the minimum difference in width or
       * height. */
      var bdx = bw - Math.max(abcosr * ow, absinr * oh),
          bdy = bh - Math.max(abcosr * oh, absinr * ow);
      maxBounds.left -= bdx;
      maxBounds.right += bdx;
      maxBounds.top += bdy;
      maxBounds.bottom -= bdy;
    }
    if (m_clampBoundsX) {
      if (bounds.right - bounds.left > maxBounds.right - maxBounds.left) {
        dx = maxBounds.left - ((bounds.right - bounds.left - (
          maxBounds.right - maxBounds.left)) / 2) - bounds.left;
      } else if (bounds.left < maxBounds.left) {
        dx = maxBounds.left - bounds.left;
      } else if (bounds.right > maxBounds.right) {
        dx = maxBounds.right - bounds.right;
      }
      if (dx) {
        bounds = {
          left: bounds.left += dx,
          right: bounds.right += dx,
          top: bounds.top,
          bottom: bounds.bottom
        };
      }
    }
    if (m_clampBoundsY) {
      if (bounds.top - bounds.bottom > maxBounds.top - maxBounds.bottom) {
        dy = maxBounds.bottom - ((bounds.top - bounds.bottom - (
          maxBounds.top - maxBounds.bottom)) / 2) - bounds.bottom;
      } else if (bounds.top > maxBounds.top) {
        dy = maxBounds.top - bounds.top;
      } else if (bounds.bottom < maxBounds.bottom) {
        dy = maxBounds.bottom - bounds.bottom;
      }
      if (dy) {
        bounds = {
          top: bounds.top += dy,
          bottom: bounds.bottom += dy,
          left: bounds.left,
          right: bounds.right
        };
      }
    }
    return bounds;
  }

  /**
   * Call the camera bounds method with the given bounds, but
   * correct for the viewport aspect ratio.
   * @private
   */
  function camera_bounds(bounds, rotation) {
    m_camera.rotation = rotation || 0;
    /* When dealing with rotation, use the original width and height of the
     * bounds, as the rotation will have expanded them. */
    if (bounds.width && bounds.height && rotation) {
      var cx = (bounds.left + bounds.right) / 2,
          cy = (bounds.top + bounds.bottom) / 2;
      m_camera.viewFromCenterSizeRotation({x: cx, y: cy}, bounds, rotation);
    } else {
      m_camera.bounds = bounds;
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  //
  // All the methods are now defined.  From here, we are initializing all
  // internal variables and event handlers.
  //
  ////////////////////////////////////////////////////////////////////////////

  // Set the world origin
  m_origin = {x: 0, y: 0};

  // Fix the zoom level (minimum and initial)
  this.zoomRange(arg, true);
  m_zoom = fix_zoom(m_zoom);
  m_rotation = fix_rotation(m_rotation);
  // Now update to the correct center and zoom level
  this.center($.extend({}, arg.center || m_center), undefined);

  this.interactor(arg.interactor || geo.mapInteractor({discreteZoom: m_discreteZoom}));
  this.clock(arg.clock || geo.clock());

  function resizeSelf() {
    m_this.resize(0, 0, m_node.width(), m_node.height());
  }

  if (arg.autoResize) {
    $(window).resize(resizeSelf);
  }

  // attach attribution updates to layer events
  m_this.geoOn([
    geo.event.layerAdd,
    geo.event.layerRemove
  ], m_this.updateAttribution);

  return this;
};

/**
 * General object specification for map types.  Any additional
 * values in the object are passed to the map constructor.
 * @typedef geo.map.spec
 * @type {object}
 * @property {object[]} [data=[]] The default data array to
 * apply to each feature if none exists
 * @property {geo.layer.spec[]} [layers=[]] Layers to create
 */

/**
 * Create a map from an object.  Any errors in the creation
 * of the map will result in returning null.
 * @param {geo.map.spec} spec The object specification
 * @returns {geo.map|null}
 */
geo.map.create = function (spec) {
  'use strict';

  var map = geo.map(spec);

  /* If the spec is bad, we still end up with an object, but it won't have a
   * zoom function */
  if (!map || !map.zoom) {
    console.warn('Could not create map.');
    return null;
  }

  spec.data = spec.data || [];
  spec.layers = spec.layers || [];

  spec.layers.forEach(function (l) {
    l.data = l.data || spec.data;
    l.layer = geo.layer.create(map, l);
  });

  return map;
};

inherit(geo.map, geo.sceneObject);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class feature
 *
 * @class
 * @extends geo.sceneObject
 * @returns {geo.feature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.feature = function (arg) {
  "use strict";
  if (!(this instanceof geo.feature)) {
    return new geo.feature(arg);
  }
  geo.sceneObject.call(this);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  arg = arg || {};

  var m_this = this,
      s_exit = this._exit,
      m_selectionAPI = arg.selectionAPI === undefined ? false : arg.selectionAPI,
      m_style = {},
      m_layer = arg.layer === undefined ? null : arg.layer,
      m_gcs = arg.gcs,
      m_visible = arg.visible === undefined ? true : arg.visible,
      m_bin = arg.bin === undefined ? 0 : arg.bin,
      m_renderer = arg.renderer === undefined ? null : arg.renderer,
      m_dataTime = geo.timestamp(),
      m_buildTime = geo.timestamp(),
      m_updateTime = geo.timestamp(),
      m_selectedFeatures = [];

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private method to bind mouse handlers on the map element.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._bindMouseHandlers = function () {

    // Don't bind handlers for improved performance on features that don't
    // require it.
    if (!m_selectionAPI) {
      return;
    }

    // First unbind to be sure that the handlers aren't bound twice.
    m_this._unbindMouseHandlers();

    m_this.geoOn(geo.event.mousemove, m_this._handleMousemove);
    m_this.geoOn(geo.event.mouseclick, m_this._handleMouseclick);
    m_this.geoOn(geo.event.brushend, m_this._handleBrushend);
    m_this.geoOn(geo.event.brush, m_this._handleBrush);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private method to unbind mouse handlers on the map element.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._unbindMouseHandlers = function () {
    m_this.geoOff(geo.event.mousemove, m_this._handleMousemove);
    m_this.geoOff(geo.event.mouseclick, m_this._handleMouseclick);
    m_this.geoOff(geo.event.brushend, m_this._handleBrushend);
    m_this.geoOff(geo.event.brush, m_this._handleBrush);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * For binding mouse events, use functions with
   * the following call signatures:
   *
   * function handler(arg) {
   *   // arg.data - the data object of the feature
   *   // arg.index - the index inside the data array of the featue
   *   // arg.mouse - mouse information object (see src/core/mapInteractor.js)
   * }
   *
   * i.e.
   *
   * feature.geoOn(geo.event.feature.mousemove, function (arg) {
   *   // do something with the feature marker.
   * });
   */
  ////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Search for features containing the given point.
   *
   * Returns an object: ::
   *
   *   {
   *     data: [...] // an array of data objects for matching features
   *     index: [...] // an array of indices of the matching features
   *   }
   *
   * @argument {Object} coordinate
   * @returns {Object}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.pointSearch = function () {
    // base class method does nothing
    return {
      index: [],
      found: []
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private mousemove handler
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleMousemove = function () {
    var mouse = m_this.layer().map().interactor().mouse(),
        data = m_this.data(),
        over = m_this.pointSearch(mouse.geo),
        newFeatures = [], oldFeatures = [], lastTop = -1, top = -1;

    // Get the index of the element that was previously on top
    if (m_selectedFeatures.length) {
      lastTop = m_selectedFeatures[m_selectedFeatures.length - 1];
    }

    // There are probably faster ways of doing this:
    newFeatures = over.index.filter(function (i) {
      return m_selectedFeatures.indexOf(i) < 0;
    });
    oldFeatures = m_selectedFeatures.filter(function (i) {
      return over.index.indexOf(i) < 0;
    });

    geo.feature.eventID += 1;
    // Fire events for mouse in first.
    newFeatures.forEach(function (i, idx) {
      m_this.geoTrigger(geo.event.feature.mouseover, {
        data: data[i],
        index: i,
        mouse: mouse,
        eventID: geo.feature.eventID,
        top: idx === newFeatures.length - 1
      }, true);
    });

    geo.feature.eventID += 1;
    // Fire events for mouse out next
    oldFeatures.forEach(function (i, idx) {
      m_this.geoTrigger(geo.event.feature.mouseout, {
        data: data[i],
        index: i,
        mouse: mouse,
        eventID: geo.feature.eventID,
        top: idx === oldFeatures.length - 1
      }, true);
    });

    geo.feature.eventID += 1;
    // Fire events for mouse move last
    over.index.forEach(function (i, idx) {
      m_this.geoTrigger(geo.event.feature.mousemove, {
        data: data[i],
        index: i,
        mouse: mouse,
        eventID: geo.feature.eventID,
        top: idx === over.index.length - 1
      }, true);
    });

    // Replace the selected features array
    m_selectedFeatures = over.index;

    // Get the index of the element that is now on top
    if (m_selectedFeatures.length) {
      top = m_selectedFeatures[m_selectedFeatures.length - 1];
    }

    if (lastTop !== top) {
      // The element on top changed so we need to fire mouseon/mouseoff
      if (lastTop !== -1) {
        m_this.geoTrigger(geo.event.feature.mouseoff, {
          data: data[lastTop],
          index: lastTop,
          mouse: mouse
        }, true);
      }

      if (top !== -1) {
        m_this.geoTrigger(geo.event.feature.mouseon, {
          data: data[top],
          index: top,
          mouse: mouse
        }, true);
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private mouseclick handler
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleMouseclick = function () {
    var mouse = m_this.layer().map().interactor().mouse(),
        data = m_this.data(),
        over = m_this.pointSearch(mouse.geo);

    geo.feature.eventID += 1;
    over.index.forEach(function (i, idx) {
      m_this.geoTrigger(geo.event.feature.mouseclick, {
        data: data[i],
        index: i,
        mouse: mouse,
        eventID: geo.feature.eventID,
        top: idx === over.index.length - 1
      }, true);
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private brush handler.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleBrush = function (brush) {
    var idx = m_this.boxSearch(brush.gcs.lowerLeft, brush.gcs.upperRight),
        data = m_this.data();

    geo.feature.eventID += 1;
    idx.forEach(function (i, idx) {
      m_this.geoTrigger(geo.event.feature.brush, {
        data: data[i],
        index: i,
        mouse: brush.mouse,
        brush: brush,
        eventID: geo.feature.eventID,
        top: idx === idx.length - 1
      }, true);
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Private brushend handler.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleBrushend = function (brush) {
    var idx = m_this.boxSearch(brush.gcs.lowerLeft, brush.gcs.upperRight),
        data = m_this.data();

    geo.feature.eventID += 1;
    idx.forEach(function (i, idx) {
      m_this.geoTrigger(geo.event.feature.brushend, {
        data: data[i],
        index: i,
        mouse: brush.mouse,
        brush: brush,
        eventID: geo.feature.eventID,
        top: idx === idx.length - 1
      }, true);
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set style used by the feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this.style = function (arg1, arg2) {
    if (arg1 === undefined) {
      return m_style;
    } else if (typeof arg1 === "string" && arg2 === undefined) {
      return m_style[arg1];
    } else if (arg2 === undefined) {
      m_style = $.extend({}, m_style, arg1);
      m_this.modified();
      return m_this;
    } else {
      m_style[arg1] = arg2;
      m_this.modified();
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * A uniform getter that always returns a function even for constant styles.
   * Maybe extend later to support accessor-like objects.  If undefined input,
   * return all the styles as an object.
   *
   * @param {string|undefined} key
   * @return {function}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.style.get = function (key) {
    var tmp, out;
    if (key === undefined) {
      var all = {}, k;
      for (k in m_style) {
        if (m_style.hasOwnProperty(k)) {
          all[k] = m_this.style.get(k);
        }
      }
      return all;
    }
    if (key.toLowerCase().match(/color$/)) {
      if (geo.util.isFunction(m_style[key])) {
        tmp = geo.util.ensureFunction(m_style[key]);
        out = function () {
          return geo.util.convertColor(
            tmp.apply(this, arguments)
          );
        };
      } else {
        // if the color is not a function, only convert it once
        out = geo.util.ensureFunction(geo.util.convertColor(m_style[key]));
      }
    } else {
      out = geo.util.ensureFunction(m_style[key]);
    }
    return out;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get layer referenced by the feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this.layer = function () {
    return m_layer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get renderer used by the feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this.renderer = function () {
    return m_renderer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set projection of the feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this.gcs = function (val) {
    if (val === undefined) {
      if (m_gcs === undefined && m_renderer) {
        return m_renderer.layer().map().ingcs();
      }
      return m_gcs;
    } else {
      m_gcs = val;
      m_this.modified();
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert from the renderer's input gcs coordinates to display coordinates.
   *
   * @param {object} c The input coordinate to convert
   * @param {object} c.x
   * @param {object} c.y
   * @param {object} [c.z=0]
   * @return {object} Display space coordinates
   */
  this.featureGcsToDisplay = function (c) {
    var map = m_renderer.layer().map();
    c = map.gcsToWorld(c, map.ingcs());
    c = map.worldToDisplay(c);
    if (m_renderer.baseToLocal) {
      c = m_renderer.baseToLocal(c);
    }
    return c;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set visibility of the feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this.visible = function (val) {
    if (val === undefined) {
      return m_visible;
    } else {
      m_visible = val;
      m_this.modified();

      // bind or unbind mouse handlers on visibility change
      if (m_visible) {
        m_this._bindMouseHandlers();
      } else {
        m_this._unbindMouseHandlers();
      }

      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set bin of the feature
   *
   * Bin number is typically used for sorting the order of rendering
   */
  ////////////////////////////////////////////////////////////////////////////
  this.bin = function (val) {
    if (val === undefined) {
      return m_bin;
    } else {
      m_bin = val;
      m_this.modified();
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set timestamp of data change
   */
  ////////////////////////////////////////////////////////////////////////////
  this.dataTime = function (val) {
    if (val === undefined) {
      return m_dataTime;
    } else {
      m_dataTime = val;
      m_this.modified();
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set timestamp of last time build happened
   */
  ////////////////////////////////////////////////////////////////////////////
  this.buildTime = function (val) {
    if (val === undefined) {
      return m_buildTime;
    } else {
      m_buildTime = val;
      m_this.modified();
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set timestamp of last time update happened
   */
  ////////////////////////////////////////////////////////////////////////////
  this.updateTime = function (val) {
    if (val === undefined) {
      return m_updateTime;
    } else {
      m_updateTime = val;
      m_this.modified();
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set the data array for the feature.
   *
   * @returns {Array|this}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.data = function (data) {
    if (data === undefined) {
      return m_this.style("data") || [];
    } else {
      m_this.style("data", data);
      m_this.dataTime().modified();
      m_this.modified();
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Query if the selection API is enabled for this feature.
   * @returns {bool}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.selectionAPI = function () {
    return m_selectionAPI;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   *
   * Derived class should implement this
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    if (!m_layer) {
      throw "Feature requires a valid layer";
    }
    m_style = $.extend({},
                {"opacity": 1.0}, arg.style === undefined ? {} :
                arg.style);
    m_this._bindMouseHandlers();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   *
   * Derived class should implement this
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * Derived class should implement this
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Destroy
   *
   * Derived class should implement this
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this._unbindMouseHandlers();
    m_selectedFeatures = [];
    m_style = {};
    arg = {};
    s_exit();
  };

  this._init(arg);
  return this;
};

/**
 * The most recent feature event triggered.
 * @type {number}
 */
geo.feature.eventID = 0;

/**
 * General object specification for feature types.
 * @typedef geo.feature.spec
 * @type {object}
 * @property {string} type A supported feature type.
 * @property {object[]} [data=[]] An array of arbitrary objects used to
 * construct the feature.  These objects (and their associated
 * indices in the array) will be passed back to style and attribute
 * accessors provided by the user.  In general the number of
 * "markers" drawn will be equal to the length of this array.
 */

/**
 * Create a feature from an object.  The implementation here is
 * meant to define the general interface of creating features
 * from a javascript object.  See documentation from individual
 * feature types for specific details.  In case of an error in
 * the arguments this method will return null;
 * @param {geo.layer} layer The layer to add the feature to
 * @param {geo.feature.spec} [spec={}] The object specification
 * @returns {geo.feature|null}
 */
geo.feature.create = function (layer, spec) {
  "use strict";

  var type = spec.type;

  // Check arguments
  if (!(layer instanceof geo.layer)) {
    console.warn("Invalid layer");
    return null;
  }
  if (typeof spec !== "object") {
    console.warn("Invalid spec");
    return null;
  }
  var feature = layer.createFeature(type);
  if (!feature) {
    console.warn("Could not create feature type '" + type + "'");
    return null;
  }

  spec = spec || {};
  spec.data = spec.data || [];
  return feature.style(spec);
};

inherit(geo.feature, geo.sceneObject);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class pointFeature
 *
 * @class
 * @param {object} arg Options object
 * @param {boolean} arg.clustering Enable point clustering
 * @extends geo.feature
 * @returns {geo.pointFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.pointFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.pointFeature)) {
    return new geo.pointFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_init = this._init,
      m_rangeTree = null,
      m_rangeTreeTime = geo.timestamp(),
      s_data = this.data,
      m_maxRadius = 0,
      m_clustering = arg.clustering,
      m_clusterTree = null,
      m_allData = [],
      m_lastZoom = null,
      m_ignoreData = false; // flag to ignore data() calls made locally

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set clustering option
   *
   * @returns {geo.pointFeature|boolean}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.clustering = function (val) {
    if (val === undefined) {
      return m_clustering;
    }
    if (m_clustering && !val) {
      // Throw out the cluster tree and reset the data
      m_clusterTree = null;
      m_clustering = false;
      s_data(m_allData);
      m_allData = null;
    } else if (!m_clustering && val) {
      // Generate the cluster tree
      m_clustering = true;
      m_this._clusterData();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Generate the clustering tree from positions.  This might be async in the
   * future.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._clusterData = function () {
    if (!m_clustering) {
      // clustering is not enabled, so this is a no-op
      return;
    }

    // set clustering options to default if an options argument wasn't supplied
    var opts = m_clustering === true ? {radius: 0.01} : m_clustering;

    // generate the cluster tree from the raw data
    var position = m_this.position();
    m_clusterTree = new geo.util.ClusterGroup(
        opts, m_this.layer().width(), m_this.layer().height());

    m_allData.forEach(function (d, i) {

      // for each point in the data set normalize the coordinate
      // representation and add the point to the cluster treee
      var pt = geo.util.normalizeCoordinates(position(d, i));
      pt.index = i;
      m_clusterTree.addPoint(pt);
    });

    // reset the last zoom state and trigger a redraw at the current zoom level
    m_lastZoom = null;
    m_this._handleZoom(m_this.layer().map().zoom());
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle zoom events for clustering.  This keeps track of the last
   * clustering level, and only regenerates the displayed points when the
   * zoom level changes.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._handleZoom = function (zoom) {
    // get the current zoom level rounded down
    var z = Math.floor(zoom);

    if (!m_clustering || z === m_lastZoom) {
      // short cut when there is nothing to do
      return;
    }

    // store the current zoom level privately
    m_lastZoom = z;

    // get the raw data elements for the points at the current level
    var data = m_clusterTree.points(z).map(function (d) {
      return m_allData[d.index];
    });

    // append the clusters at the current level
    m_clusterTree.clusters(z).forEach(function (d) {
      // mark the datum as a cluster for accessor methods
      d.__cluster = true;

      // store all of the data objects for each point in the cluster as __data
      d.__data = [];
      d.obj.each(function (e) {
        d.__data.push(m_allData[e.index]);
      });
      data.push(d);
    });

    // prevent recomputing the clustering and set the new data array
    m_ignoreData = true;
    m_this.data(data);
    m_this.layer().map().draw(); // replace with m_this.draw() when gl is fixed
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set position
   *
   * @returns {geo.pointFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.position = function (val) {
    if (val === undefined) {
      return m_this.style("position");
    } else {
      val = geo.util.ensureFunction(val);
      m_this.style("position", function (d, i) {
        if (d.__cluster) {
          return d;
        } else {
          return val(d, i);
        }
      });
      m_this.dataTime().modified();
      m_this.modified();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update the current range tree object.  Should be called whenever the
   * data changes.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._updateRangeTree = function () {
    if (m_rangeTreeTime.getMTime() >= m_this.dataTime().getMTime()) {
      return;
    }
    var pts, position,
        radius = m_this.style.get("radius"),
        stroke = m_this.style.get("stroke"),
        strokeWidth = m_this.style.get("strokeWidth");

    position = m_this.position();

    m_maxRadius = 0;

    // create an array of positions in geo coordinates
    pts = m_this.data().map(function (d, i) {
      var pt = position(d);
      pt.idx = i;

      // store the maximum point radius
      m_maxRadius = Math.max(
        m_maxRadius,
        radius(d, i) + (stroke(d, i) ? strokeWidth(d, i) : 0)
      );

      return pt;
    });

    m_rangeTree = new geo.util.RangeTree(pts);
    m_rangeTreeTime.modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Returns an array of datum indices that contain the given point.
   * Largely adapted from wigglemaps pointQuerier:
   *
   * https://github.com/dotskapes/wigglemaps/blob/cf5bed3fbfe2c3e48d31799462a80c564be1fb60/src/query/PointQuerier.js
   */
  ////////////////////////////////////////////////////////////////////////////
  this.pointSearch = function (p) {
    var min, max, data, idx = [], box, found = [], ifound = [], map, pt,
        corners,
        stroke = m_this.style.get("stroke"),
        strokeWidth = m_this.style.get("strokeWidth"),
        radius = m_this.style.get("radius");

    if (!m_this.selectionAPI()) {
      return [];
    }

    data = m_this.data();
    if (!data || !data.length) {
      return {
        found: [],
        index: []
      };
    }

    map = m_this.layer().map();
    pt = map.gcsToDisplay(p);
    // check all corners to make sure we handle rotations
    corners = [
      map.displayToGcs({x: pt.x - m_maxRadius, y: pt.y - m_maxRadius}),
      map.displayToGcs({x: pt.x + m_maxRadius, y: pt.y - m_maxRadius}),
      map.displayToGcs({x: pt.x - m_maxRadius, y: pt.y + m_maxRadius}),
      map.displayToGcs({x: pt.x + m_maxRadius, y: pt.y + m_maxRadius})
    ];
    min = {
      x: Math.min(corners[0].x, corners[1].x, corners[2].x, corners[3].x),
      y: Math.min(corners[0].y, corners[1].y, corners[2].y, corners[3].y)
    };
    max = {
      x: Math.max(corners[0].x, corners[1].x, corners[2].x, corners[3].x),
      y: Math.max(corners[0].y, corners[1].y, corners[2].y, corners[3].y)
    };

    // Find points inside the bounding box
    box = new geo.util.Box(geo.util.vect(min.x, min.y), geo.util.vect(max.x, max.y));
    m_this._updateRangeTree();
    m_rangeTree.search(box).forEach(function (q) {
      idx.push(q.idx);
    });

    // Filter by circular region
    idx.forEach(function (i) {
      var d = data[i],
          p = m_this.position()(d, i),
          dx, dy, rad, rad2;

      rad = radius(data[i], i);
      rad += stroke(data[i], i) ? strokeWidth(data[i], i) : 0;
      rad2 = rad * rad;
      p = map.gcsToDisplay(p);
      dx = p.x - pt.x;
      dy = p.y - pt.y;
      if (dx * dx + dy * dy <= rad2) {
        found.push(d);
        ifound.push(i);
      }
    });

    return {
      data: found,
      index: ifound
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Returns an array of datum indices that are contained in the given box.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.boxSearch = function (lowerLeft, upperRight) {
    var pos = m_this.position(),
        idx = [];
    // TODO: use the range tree
    m_this.data().forEach(function (d, i) {
      var p = pos(d);
      if (p.x >= lowerLeft.x &&
          p.x <= upperRight.x &&
          p.y >= lowerLeft.y &&
          p.y <= upperRight.y
      ) {
        idx.push(i);
      }
    });
    return idx;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Overloaded data method that updates the internal range tree on write.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.data = function (data) {
    if (data === undefined) {
      return s_data();
    }
    if (m_clustering && !m_ignoreData) {
      m_allData = data;
      m_this._clusterData();
    } else {
      s_data(data);
    }
    m_ignoreData = false;
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Returns the bounding box for a given datum in screen coordinates as an
   * object: ::
   *
   *   {
   *     min: {
   *       x: value,
   *       y: value
   *     },
   *     max: {
   *       x: value,
   *       y: value
   *     }
   *   }
   *
   * @returns {object}
   */
  ////////////////////////////////////////////////////////////////////////////
  this._boundingBox = function (d) {
    var pt, radius;

    // get the position in geo coordinates
    pt = m_this.position()(d);

    // convert to screen coordinates
    pt = m_this.layer().map().gcsToDisplay(pt);

    // get the radius of the points (should we add stroke width?)
    radius = m_this.style().radius(d);

    return {
      min: {
        x: pt.x - radius,
        y: pt.y - radius
      },
      max: {
        x: pt.x + radius,
        y: pt.y + radius
      }
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);

    var defaultStyle = $.extend(
      {},
      {
        radius: 5.0,
        stroke: true,
        strokeColor: { r: 0.851, g: 0.604, b: 0.0 },
        strokeWidth: 1.25,
        strokeOpacity: 1.0,
        fillColor: { r: 1.0, g: 0.839, b: 0.439 },
        fill: true,
        fillOpacity: 0.8,
        sprites: false,
        sprites_image: null,
        position: function (d) { return d; }
      },
      arg.style === undefined ? {} : arg.style
    );

    if (arg.position !== undefined) {
      defaultStyle.position = arg.position;
    }

    m_this.style(defaultStyle);
    m_this.dataTime().modified();

    // bind to the zoom handler for point clustering
    m_this.geoOn(geo.event.zoom, function (evt) {
      m_this._handleZoom(evt.zoomLevel);
    });
  };

  return m_this;
};

geo.event.pointFeature = $.extend({}, geo.event.feature);

/**
 * Object specification for a point feature.
 *
 * @extends geo.feature.spec // need to make a jsdoc plugin for this to work
 * @typedef geo.pointFeature.spec
 * @type {object}
 */

/**
 * Create a pointFeature from an object.
 * @see {@link geo.feature.create}
 * @param {geo.layer} layer The layer to add the feature to
 * @param {geo.pointFeature.spec} spec The object specification
 * @returns {geo.pointFeature|null}
 */
geo.pointFeature.create = function (layer, renderer, spec) {
  "use strict";

  spec.type = "point";
  return geo.feature.create(layer, spec);
};

inherit(geo.pointFeature, geo.feature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class lineFeature
 *
 * @class
 * @extends geo.feature
 * @returns {geo.lineFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.lineFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.lineFeature)) {
    return new geo.lineFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_init = this._init;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set line accessor
   *
   * @returns {geo.pointFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.line = function (val) {
    if (val === undefined) {
      return m_this.style("line");
    } else {
      m_this.style("line", val);
      m_this.dataTime().modified();
      m_this.modified();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set position accessor
   *
   * @returns {geo.pointFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.position = function (val) {
    if (val === undefined) {
      return m_this.style("position");
    } else {
      m_this.style("position", val);
      m_this.dataTime().modified();
      m_this.modified();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Returns an array of datum indices that contain the given point.
   * This is a slow implementation with runtime order of the number of
   * vertices.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.pointSearch = function (p) {
    var data, pt, map, line, width, indices = [], found = [], pos;
    data = m_this.data();
    if (!data || !data.length) {
      return {
        found: [],
        index: []
      };
    }

    map = m_this.layer().map();
    line = m_this.line();
    width = m_this.style.get("strokeWidth");
    pos = m_this.position();
    pt = m_this.featureGcsToDisplay(p);

    // minimum l2 distance squared from
    // q -> line(u, v)
    function lineDist2(q, u, v) {
      var t, l2 = dist2(u, v);

      if (l2 < 1) {
        // u, v are within 1 pixel
        return dist2(q, u);
      }

      t = ((q.x - u.x) * (v.x - u.x) + (q.y - u.y) * (v.y - u.y)) / l2;
      if (t < 0) { return dist2(q, u); }
      if (t > 1) { return dist2(q, v); }
      return dist2(
        q,
        {
          x: u.x + t * (v.x - u.x),
          y: u.y + t * (v.y - u.y)
        }
      );
    }

    // l2 distance squared from u to v
    function dist2(u, v) {
      var dx = u.x - v.x,
          dy = u.y - v.y;
      return dx * dx + dy * dy;
    }

    // for each line
    data.forEach(function (d, index) {
      var last = null;

      try {
        line(d, index).forEach(function (current, j) {

          // get the screen coordinates of the current point
          var p = pos(current, j, d, index);
          var s = m_this.featureGcsToDisplay(p);
          var r = Math.ceil(width(p, j, d, index) / 2) + 2;
          r = r * r;

          if (last) {
            // test the line segment s -> last
            if (lineDist2(pt, s, last) <= r) {

              // short circuit the loop here
              throw "found";
            }
          }

          last = s;
        });
      } catch (err) {
        if (err !== "found") {
          throw err;
        }
        found.push(d);
        indices.push(index);
      }
    });

    return {
      data: found,
      index: indices
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Returns an array of line indices that are contained in the given box.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.boxSearch = function (lowerLeft, upperRight, opts) {
    var pos = m_this.position(),
        idx = [],
        line = m_this.line();

    opts = opts || {};
    opts.partial = opts.partial || false;
    if (opts.partial) {
      throw "Unimplemented query method.";
    }

    m_this.data().forEach(function (d, i) {
      var inside = true;
      line(d, i).forEach(function (e, j) {
        if (!inside) { return; }
        var p = pos(e, j, d, i);
        if (!(p.x >= lowerLeft.x  &&
              p.x <= upperRight.x &&
              p.y >= lowerLeft.y  &&
              p.y <= upperRight.y)
        ) {
          inside = false;
        }
      });
      if (inside) {
        idx.push(i);
      }
    });
    return idx;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);

    var defaultStyle = $.extend(
      {},
      {
        "strokeWidth": 1.0,
        // Default to gold color for lines
        "strokeColor": { r: 1.0, g: 0.8431372549, b: 0.0 },
        "strokeStyle": "solid",
        "strokeOpacity": 1.0,
        "line": function (d) { return d; },
        "position": function (d) { return d; }
      },
      arg.style === undefined ? {} : arg.style
    );

    if (arg.line !== undefined) {
      defaultStyle.line = arg.line;
    }

    if (arg.position !== undefined) {
      defaultStyle.position = arg.position;
    }


    m_this.style(defaultStyle);

    m_this.dataTime().modified();
  };

  this._init(arg);
  return this;
};

/**
 * Create a lineFeature from an object.
 * @see {@link geo.feature.create}
 * @param {geo.layer} layer The layer to add the feature to
 * @param {geo.lineFeature.spec} spec The object specification
 * @returns {geo.lineFeature|null}
 */
geo.lineFeature.create = function (layer, spec) {
  "use strict";

  spec.type = "line";
  return geo.feature.create(layer, spec);
};

inherit(geo.lineFeature, geo.feature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class pathFeature
 *
 * @class
 * @extends geo.feature
 * @returns {geo.pathFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.pathFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.pathFeature)) {
    return new geo.pathFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      m_position = arg.position === undefined ? [] : arg.position,
      s_init = this._init;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set positions
   *
   * @returns {geo.pathFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.position = function (val) {
    if (val === undefined) {
      return m_position;
    }
    // Copy incoming array of positions
    m_position = val;
    m_this.dataTime().modified();
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);

    var defaultStyle = $.extend(
      {},
      {
        "strokeWidth": function () { return 1; },
        "strokeColor": function () { return { r: 1.0, g: 1.0, b: 1.0 }; }
      },
      arg.style === undefined ? {} : arg.style
    );

    m_this.style(defaultStyle);

    if (m_position) {
      m_this.dataTime().modified();
    }
  };

  this._init(arg);
  return this;
};

inherit(geo.pathFeature, geo.feature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class polygonFeature
 *
 * @class
 * @extends geo.feature
 * @returns {geo.polygonFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.polygonFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.polygonFeature)) {
    return new geo.polygonFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      m_position,
      m_polygon,
      s_init = this._init,
      s_data = this.data,
      m_coordinates = {outer: [], inner: []};

  if (arg.polygon === undefined) {
    m_polygon = function (d) {
      return d;
    };
  } else {
    m_polygon = arg.polygon;
  }

  if (arg.position === undefined) {
    m_position = function (d) {
      return d;
    };
  } else {
    m_position = arg.position;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Override the parent data method to keep track of changes to the
   * internal coordinates.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.data = function (arg) {
    var ret = s_data(arg);
    if (arg !== undefined) {
      getCoordinates();
    }
    return ret;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the internal coordinates whenever the data changes.  For now, we do
   * the computation in world coordinates, but we will need to work in GCS
   * for other projections.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function getCoordinates() {
    var posFunc = m_this.position(),
        polyFunc = m_this.polygon();
    m_coordinates = m_this.data().map(function (d, i) {
      var poly = polyFunc(d);
      var outer, inner;

      outer = (poly.outer || []).map(function (d0, j) {
        return posFunc.call(m_this, d0, j, d, i);
      });

      inner = (poly.inner || []).map(function (hole) {
        return (hole || []).map(function (d0, k) {
          return posFunc.call(m_this, d0, k, d, i);
        });
      });
      return {
        outer: outer,
        inner: inner
      };
    });
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set polygon accessor
   *
   * @returns {geo.pointFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.polygon = function (val) {
    if (val === undefined) {
      return m_polygon;
    } else {
      m_polygon = val;
      m_this.dataTime().modified();
      m_this.modified();
      getCoordinates();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set position accessor
   *
   * @returns {geo.pointFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.position = function (val) {
    if (val === undefined) {
      return m_position;
    } else {
      m_position = val;
      m_this.dataTime().modified();
      m_this.modified();
      getCoordinates();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Point searce method for selection api.  Returns markers containing the
   * given point.
   * @argument {Object} coordinate
   * @returns {Object}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.pointSearch = function (coordinate) {
    var found = [], indices = [], data = m_this.data();
    m_coordinates.forEach(function (coord, i) {
      var inside = geo.util.pointInPolygon(
        coordinate,
        coord.outer,
        coord.inner
      );
      if (inside) {
        indices.push(i);
        found.push(data[i]);
      }
    });
    return {
      index: indices,
      found: found
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);

    var defaultStyle = $.extend(
      {},
      {
        "fillColor": { r: 0.0,  g: 0.5, b: 0.5 },
        "fillOpacity": 1.0
      },
      arg.style === undefined ? {} : arg.style
    );

    m_this.style(defaultStyle);

    if (m_position) {
      m_this.dataTime().modified();
    }
  };

  this._init(arg);
  return this;
};

inherit(geo.polygonFeature, geo.feature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class planeFeature
 *
 * @class
 * @extends geo.polygonFeature
 * @returns {geo.planeFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.planeFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.planeFeature)) {
    return new geo.planeFeature(arg);
  }
  arg = arg || {};

  // Defaults
  arg.ul = arg.ul === undefined ? [0.0, 1.0, 0.0] : arg.ul;
  arg.lr = arg.lr === undefined ? [1.0, 0.0, 0.0] : arg.lr;
  arg.depth = arg.depth === undefined ? 0.0 : arg.depth;

  geo.polygonFeature.call(this, arg);

  var m_this = this,
      m_origin = [arg.ul.x, arg.lr.y, arg.depth],
      m_upperLeft = [arg.ul.x, arg.ul.y, arg.depth],
      m_lowerRight = [arg.lr.x, arg.lr.y, arg.depth],
      m_defaultDepth = arg.depth,
      m_drawOnAsyncResourceLoad = arg.drawOnAsyncResourceLoad === undefined ?
                                    true : false,
      s_init = this._init;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set origin
   *
   * @returns {geo.planeFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.origin = function (val) {
    if (val === undefined) {
      return m_origin;
    } else if (val instanceof Array) {
      if (val.length > 3 || val.length < 2) {
        throw "Origin point requires point in 2 or 3 dimension";
      }
      m_origin = val.slice(0);
      if (m_origin.length === 2) {
        m_origin[2] = m_defaultDepth;
      }
    }
    m_this.dataTime().modified();
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set pt1
   *
   * @returns {geo.planeFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.upperLeft = function (val) {
    if (val === undefined) {
      return m_upperLeft;
    } else if (val instanceof Array) {
      if (val.length > 3 || val.length < 2) {
        throw "Upper left point requires point in 2 or 3 dimension";
      }
      m_upperLeft = val.slice(0);
      if (m_upperLeft.length === 2) {
        m_upperLeft[2] = m_defaultDepth;
      }
    }
    m_this.dataTime().modified();
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set origin
   *
   * @returns {geo.planeFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.lowerRight = function (val) {
    if (val === undefined) {
      return m_lowerRight;
    } else if (val instanceof Array) {
      if (val.length > 3 || val.length < 2) {
        throw "Lower right point requires point in 2 or 3 dimension";
      }
      m_lowerRight = val.slice(0);
      if (m_lowerRight.length === 2) {
        m_lowerRight[2] = m_defaultDepth;
      }
      m_this.dataTime().modified();
    }
    m_this.dataTime().modified();
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set if draw should happen as soon as a async resource is loaded
   */
  ////////////////////////////////////////////////////////////////////////////
  this.drawOnAsyncResourceLoad = function (val) {
    if (val === undefined) {
      return m_drawOnAsyncResourceLoad;
    } else {
      m_drawOnAsyncResourceLoad = val;
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    var style = null;
    s_init.call(m_this, arg);
    style = m_this.style();
    if (style.image === undefined) {
      style.image = null;
    }
    m_this.style(style);
  };

  this._init(arg);
  return this;
};

inherit(geo.planeFeature, geo.polygonFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class vectorFeature
 *
 * @class
 * @extends geo.feature
 * @returns {geo.vectorFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.vectorFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.vectorFeature)) {
    return new geo.vectorFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_init = this._init,
      s_style = this.style;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the accessor for the origin of the vector.  This is the point
   * that the vector base resides at.  Defaults to (0, 0, 0).
   * @param {geo.accessor|geo.geoPosition} [accessor] The origin accessor
   */
  ////////////////////////////////////////////////////////////////////////////
  this.origin = function (val) {
    if (val === undefined) {
      return s_style('origin');
    } else {
      s_style('origin', val);
      m_this.dataTime().modified();
      m_this.modified();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the accessor for the displacement (coordinates) of the vector.
   * @param {geo.accessor|geo.geoPosition} [accessor] The accessor
   */
  ////////////////////////////////////////////////////////////////////////////
  this.delta = function (val) {
    if (val === undefined) {
      return s_style('delta');
    } else {
      s_style('delta', val);
      m_this.dataTime().modified();
      m_this.modified();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   * @protected
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);

    var defaultStyle = $.extend(
      {},
      {
        strokeColor: 'black',
        strokeWidth: 2.0,
        strokeOpacity: 1.0,
        // TODO: define styles for the end markers
        // originStyle: 'none',
        // endStyle: 'arrow',
        origin: {x: 0, y: 0, z: 0},
        delta: function (d) { return d; },
        scale: null // size scaling factor (null -> renderer decides)
      },
      arg.style === undefined ? {} : arg.style
    );

    if (arg.origin !== undefined) {
      defaultStyle.origin = arg.origin;
    }

    m_this.style(defaultStyle);
    m_this.dataTime().modified();
  };
};

inherit(geo.vectorFeature, geo.feature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class geomFeature
 *
 * @class
 * @extends geo.feature
 * @returns {geo.geomFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.geomFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.geomFeature)) {
    return new geo.geomFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  arg.style = arg.style === undefined ? $.extend({}, {
    "color": [1.0, 1.0, 1.0],
    "point_sprites": false,
    "point_sprites_image": null
  }, arg.style) : arg.style;

  // Update style
  this.style(arg.style);

  return this;
};

inherit(geo.geomFeature, geo.feature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class graphFeature
 *
 * @class
 * @extends geo.feature
 * @returns {geo.graphFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.graphFeature = function (arg) {
  "use strict";

  if (!(this instanceof geo.graphFeature)) {
    return new geo.graphFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_draw = this.draw,
      s_style = this.style,
      m_nodes = null,
      m_points = null,
      m_children = function (d) { return d.children; },
      m_links = [],
      s_init = this._init,
      s_exit = this._exit;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);

    var defaultStyle = $.extend(true, {},
      {
        nodes: {
          radius: 5.0,
          fill: true,
          fillColor: { r: 1.0, g: 0.0, b: 0.0 },
          strokeColor: { r: 0, g: 0, b: 0 }
        },
        links: {
          strokeColor: { r: 0.0, g: 0.0, b: 0.0 }
        },
        linkType: "path" /* 'path' || 'line' */
      },
      arg.style === undefined ? {} : arg.style
    );

    m_this.style(defaultStyle);
    m_this.nodes(function (d) { return d; });
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Call child _build methods
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    m_this.children().forEach(function (child) {
      child._build();
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Call child _update methods
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    m_this.children().forEach(function (child) {
      child._update();
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Custom _exit method to remove all sub-features
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.data([]);
    m_links.forEach(function (link) {
      link._exit();
      m_this.removeChild(link);
    });
    m_links = [];
    m_points._exit();
    m_this.removeChild(m_points);
    s_exit();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set style
   */
  ////////////////////////////////////////////////////////////////////////////
  this.style = function (arg, arg2) {
    var out = s_style.call(m_this, arg, arg2);
    if (out !== m_this) {
      return out;
    }
    // set styles for sub-features
    m_points.style(arg.nodes);
    m_links.forEach(function (l) {
      l.style(arg.links);
    });
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set links accessor.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.links = function (arg) {
    if (arg === undefined) {
      return m_children;
    }

    m_children = geo.util.ensureFunction(arg);
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set nodes
   */
  ////////////////////////////////////////////////////////////////////////////
  this.nodes = function (val) {
    if (val === undefined) {
      return m_nodes;
    }
    m_nodes = val;
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get internal node feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this.nodeFeature = function () {
    return m_points;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get internal link features
   */
  ////////////////////////////////////////////////////////////////////////////
  this.linkFeatures = function () {
    return m_links;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build the feature for drawing
   */
  ////////////////////////////////////////////////////////////////////////////
  this.draw = function () {

    var layer = m_this.layer(),
        data = m_this.data(),
        nLinks = 0,
        style;

    // get the feature style object
    style = m_this.style();

    // Bind data to the point nodes
    m_points.data(data);
    m_points.style(style.nodes);

    // get links from node connections
    data.forEach(function (source) {
      (source.children || []).forEach(function (target) {
        var link;
        nLinks += 1;
        if (m_links.length < nLinks) {
          link = geo.createFeature(
            style.linkType, layer, layer.renderer()
          ).style(style.links);
          m_this.addChild(link);
          m_links.push(link);
        }
        m_links[nLinks - 1].data([source, target]);
      });
    });

    m_links.splice(nLinks, m_links.length - nLinks).forEach(function (l) {
      l._exit();
      m_this.removeChild(l);
    });

    s_draw();
    return m_this;
  };

  m_points = geo.createFeature(
    "point",
    this.layer(),
    this.layer().renderer()
  );
  m_this.addChild(m_points);

  if (arg.nodes) {
    this.nodes(arg.nodes);
  }

  this._init(arg);
  return this;
};

inherit(geo.graphFeature, geo.feature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class contourFeature
 *
 * @class
 * @extends geo.feature
 * @returns {geo.contourFeature}
 *
 */
//////////////////////////////////////////////////////////////////////////////
geo.contourFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.contourFeature)) {
    return new geo.contourFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      m_contour = {},
      s_init = this._init,
      s_data = this.data;

  if (arg.contour === undefined) {
    m_contour = function (d) {
      return d;
    };
  } else {
    m_contour = arg.contour;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Override the parent data method to keep track of changes to the
   * internal coordinates.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.data = function (arg) {
    var ret = s_data(arg);
    return ret;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set contour accessor
   *
   * @returns {geo.pointFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.contour = function (arg1, arg2) {
    if (arg1 === undefined) {
      return m_contour;
    }
    if (typeof arg1 === 'string' && arg2 === undefined) {
      return m_contour[arg1];
    }
    if (arg2 === undefined) {
      var contour = $.extend(
        {},
        {
          gridWidth: function () {
            if (arg1.gridHeight) {
              return Math.floor(m_this.data().length / arg1.gridHeight);
            }
            return Math.floor(Math.sqrt(m_this.data().length));
          },
          gridHeight: function () {
            if (arg1.gridWidth) {
              return Math.floor(m_this.data().length / arg1.gridWidth);
            }
            return Math.floor(Math.sqrt(m_this.data().length));
          },
          minColor: 'black',
          minOpacity: 0,
          maxColor: 'black',
          maxOpacity: 0,
          /* 9-step based on paraview bwr colortable */
          colorRange: [
            {r: 0.07514311, g: 0.468049805, b: 1},
            {r: 0.468487184, g: 0.588057293, b: 1},
            {r: 0.656658579, g: 0.707001303, b: 1},
            {r: 0.821573924, g: 0.837809045, b: 1},
            {r: 0.943467973, g: 0.943498599, b: 0.943398095},
            {r: 1, g: 0.788626485, b: 0.750707739},
            {r: 1, g: 0.6289553, b: 0.568237474},
            {r: 1, g: 0.472800903, b: 0.404551679},
            {r: 0.916482116, g: 0.236630659, b: 0.209939162}
          ]
        },
        m_contour,
        arg1
      );
      m_contour = contour;
    } else {
      m_contour[arg1] = arg2;
    }
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * A uniform getter that always returns a function even for constant values.
   * If undefined input, return all the contour values as an object.
   *
   * @param {string|undefined} key
   * @return {function}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.contour.get = function (key) {
    if (key === undefined) {
      var all = {}, k;
      for (k in m_contour) {
        if (m_contour.hasOwnProperty(k)) {
          all[k] = m_this.contour.get(k);
        }
      }
      return all;
    }
    return geo.util.ensureFunction(m_contour[key]);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set position accessor
   *
   * @returns {geo.pointFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.position = function (val) {
    if (val === undefined) {
      return m_this.style('position');
    } else {
      m_this.style('position', val);
      m_this.dataTime().modified();
      m_this.modified();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create a set of vertices, values at the vertices, and opacities at the
   * vertices.  Create a set of triangles of indices into the vertex array.
   * Create a color and opacity map corresponding to the values.
   *
   * @returns: an object with pos, value, opacity, elements, minValue,
   *           maxValue, minColor, maxColor, colorMap, factor.  If there is no
   *           contour data that can be used, only elements is guaranteed to
   *           exist, and it will be a zero-length array.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.createContours = function () {
    var i, i3, j, idx, k, val, numPts, usedPts = 0, usePos, item,
        idxMap = {},
        minval, maxval, range,
        contour = m_this.contour,
        data = m_this.data(),
        posFunc = m_this.position(), posVal,
        gridW = contour.get('gridWidth')(),
        gridH = contour.get('gridHeight')(),
        x0 = contour.get('x0')(),
        y0 = contour.get('y0')(),
        dx = contour.get('dx')(),
        dy = contour.get('dy')(),
        opacityFunc = m_this.style.get('opacity'),
        opacityRange = contour.get('opacityRange')(),
        rangeValues = contour.get('rangeValues')(),
        valueFunc = m_this.style.get('value'), values = [],
        stepped = contour.get('stepped')(),
        wrapLong = contour.get('wrapLongitude')(),
        calcX, skipColumn, x, origI, /* used for wrapping */
        gridWorig = gridW,  /* can be different when wrapping */
        result = {
          minValue: contour.get('min')(),
          maxValue: contour.get('max')(),
          stepped: stepped === undefined || stepped ? true : false,
          wrapLongitude: wrapLong === undefined || wrapLong ? true : false,
          colorMap: [],
          elements: []
        };
    /* Create the min/max colors and the color array */
    result.minColor = $.extend({a: contour.get('minOpacity')() || 0},
        geo.util.convertColor(contour.get('minColor')()));
    result.maxColor = $.extend({a: contour.get('maxOpacity')() || 0},
        geo.util.convertColor(contour.get('maxColor')()));
    contour.get('colorRange')().forEach(function (clr, idx) {
      result.colorMap.push($.extend(
          {a: opacityRange && opacityRange[idx] !== undefined ?
          opacityRange[idx] : 1}, geo.util.convertColor(clr)));
    });
    /* Determine which values are usable */
    if (gridW * gridH > data.length) {
      gridH = Math.floor(data.length) / gridW;
    }
    /* If we are not using the position values (we are using x0, y0, dx, dy),
     * and wrapLongitude is turned on, and the position spans 180 degrees,
     * duplicate one or two columns of points at opposite ends of the map. */
    usePos = (x0 === null || x0 === undefined || y0 === null ||
        y0 === undefined || !dx || !dy);
    if (!usePos && result.wrapLongitude && (x0 < -180 || x0 > 180 ||
        x0 + dx * (gridW - 1) < -180 || x0 + dx * (gridW - 1) > 180) &&
        dx > -180 && dx < 180) {
      calcX = [];
      for (i = 0; i < gridW; i += 1) {
        x = x0 + i * dx;
        while (x < -180) { x += 360; }
        while (x > 180) { x -= 360; }
        if (i && Math.abs(x - calcX[calcX.length - 1]) > 180) {
          if (x > calcX[calcX.length - 1]) {
            calcX.push(x - 360);
            calcX.push(calcX[calcX.length - 2] + 360);
          } else {
            calcX.push(x + 360);
            calcX.push(calcX[calcX.length - 2] - 360);
          }
          skipColumn = i;
        }
        calcX.push(x);
      }
      gridW += 2;
      if (Math.abs(Math.abs(gridWorig * dx) - 360) < 0.01) {
        gridW += 1;
        x = x0 + gridWorig * dx;
        while (x < -180) { x += 360; }
        while (x > 180) { x -= 360; }
        calcX.push(x);
      }
    }
    /* Calculate the value for point */
    numPts = gridW * gridH;
    for (i = 0; i < numPts; i += 1) {
      if (skipColumn === undefined) {
        val = parseFloat(valueFunc(data[i]));
      } else {
        j = Math.floor(i / gridW);
        origI = i - j * gridW;
        origI += (origI > skipColumn ? -2 : 0);
        if (origI >= gridWorig) {
          origI -= gridWorig;
        }
        origI += j * gridWorig;
        val = parseFloat(valueFunc(data[origI]));
      }
      values[i] = isNaN(val) ? null : val;
      if (values[i] !== null) {
        idxMap[i] = usedPts;
        usedPts += 1;
        if (minval === undefined) {
          minval = maxval = values[i];
        }
        if (values[i] < minval) {
          minval = values[i];
        }
        if (values[i] > maxval) {
          maxval = values[i];
        }
      }
    }
    if (!usedPts) {
      return result;
    }
    if (!$.isNumeric(result.minValue)) {
      result.minValue = minval;
    }
    if (!$.isNumeric(result.maxValue)) {
      result.maxValue = maxval;
    }
    if (!rangeValues || rangeValues.length !== result.colorMap.length + 1) {
      rangeValues = null;
    }
    if (rangeValues) {  /* ensure increasing monotonicity */
      for (k = 1; k < rangeValues.length; k += 1) {
        if (rangeValues[k] > rangeValues[k + 1]) {
          rangeValues = null;
          break;
        }
      }
    }
    if (rangeValues) {
      result.minValue = rangeValues[0];
      result.maxValue = rangeValues[rangeValues.length - 1];
    }
    range = result.maxValue - result.minValue;
    if (!range) {
      result.colorMap = result.colorMap.slice(0, 1);
      range = 1;
      rangeValues = null;
    }
    result.rangeValues = rangeValues;
    result.factor = result.colorMap.length / range;
    /* Create triangles */
    for (j = idx = 0; j < gridH - 1; j += 1, idx += 1) {
      for (i = 0; i < gridW - 1; i += 1, idx += 1) {
        if (values[idx] !== null && values[idx + 1] !== null &&
            values[idx + gridW] !== null &&
            values[idx + gridW + 1] !== null && i !== skipColumn) {
          result.elements.push(idxMap[idx]);
          result.elements.push(idxMap[idx + 1]);
          result.elements.push(idxMap[idx + gridW]);
          result.elements.push(idxMap[idx + gridW + 1]);
          result.elements.push(idxMap[idx + gridW]);
          result.elements.push(idxMap[idx + 1]);
        }
      }
    }
    /* Only locate the points that are in use. */
    result.pos = new Array(usedPts * 3);
    result.value = new Array(usedPts);
    result.opacity = new Array(usedPts);
    for (j = i = i3 = 0; j < numPts; j += 1) {
      val = values[j];
      if (val !== null) {
        item = data[j];
        if (usePos) {
          posVal = posFunc(item);
          result.pos[i3]     = posVal.x;
          result.pos[i3 + 1] = posVal.y;
          result.pos[i3 + 2] = posVal.z || 0;
        } else {
          if (skipColumn === undefined) {
            result.pos[i3]   = x0 + dx * (j % gridW);
          } else {
            result.pos[i3]   = calcX[j % gridW];
          }
          result.pos[i3 + 1] = y0 + dy * Math.floor(j / gridW);
          result.pos[i3 + 2] = 0;
        }
        result.opacity[i] = opacityFunc(item);
        if (rangeValues && val >= result.minValue && val <= result.maxValue) {
          for (k = 1; k < rangeValues.length; k += 1) {
            if (val <= rangeValues[k]) {
              result.value[i] = k - 1 + (val - rangeValues[k - 1]) /
                  (rangeValues[k] - rangeValues[k - 1]);
              break;
            }
          }
        } else {
          result.value[i] = (val - result.minValue) * result.factor;
        }
        i += 1;
        i3 += 3;
      }
    }
    return result;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);

    var defaultStyle = $.extend(
      {},
      {
        opacity: 1.0,
        position: function (d) {
          return {x: d.x, y: d.y, z: d.z};
        },
        value: function (d) {
          return m_this.position()(d).z;
        }
      },
      arg.style === undefined ? {} : arg.style
    );

    m_this.style(defaultStyle);

    if (m_contour) {
      m_this.dataTime().modified();
    }
  };

  this._init(arg);
  return this;
};

inherit(geo.contourFeature, geo.feature);

/* Example:

layer.createFeature('contour', {
})
.data(<array with w x h elements>)
.position(function (d) {
  return { x: <longitude>, y: <latitude>, z: <altitude>};
})
.style({
  opacity: function (d) {
    return <opacity of grid point>;
  },
  value: function (d) {            // defaults to position().z
    return <contour value>;
  }
})
.contour({
  gridWidth: <width of grid>,
  gridHeight: <height of grid>,
  x0: <the x coordinate of the 0th point in the value array>,
  y0: <the y coordinate of the 0th point in the value array>,
  dx: <the distance in the x direction between the 0th and 1st point in the
    value array>,
  dy: <the distance in the y direction between the 0th and (gridWidth)th point
    in the value array>,
  wrapLongitude: <boolean (default true).  If true, AND the position array is
    not used, assume the x coordinates is longitude and should be adjusted to
    be within -180 to 180.  If the data spans 180 degrees, the points or
    squares will be duplicated to ensure that the map is covered from -180 to
    180 as appropriate.  Set this to false if using a non longitude x
    coordinate.  This is ignored if the position array is used.>,
  min: <optional minimum contour value, otherwise taken from style.value>,
  max: <optional maximum contour value, otherwise taken from style.value>,
  minColor: <color for any value below the minimum>,
  minOpacity: <opacity for any value below the minimum>,
  maxColor: <color for any value above the maximum>,
  maxOpacity: <opacity for any value above the maximum>,
  stepped: <boolean (default true).  If false, smooth transitions between
    colors>,
  colorRange: [<array of colors used for the contour>],
  opacityRange: [<optional array of opacities used for the contour, expected to
    be the same length as colorRange>],
  rangeValues: [<if specified, instead of spacing the colors linearly, use this
    spacing.  Must be increasing monotonic and one value longer than the length
    of colorRange>]
})

Notes:
* The position array is only used for position if not all of x0, y0, dx, and dy
    are specified (not null or undefined).  If a value array is not specified,
    the position array could still be used for the value.
* If the value() of a grid point is null or undefined, that point will not be
    included in the contour display.  Since the values are on a grid, if this
    point is in the interior of the grid, this can remove up to four squares.
* Only one of gridWidth and gridHeight needs to be specified.  If both are
    specified and gridWidth * gridHeight < data().length, not all the data will
    be used.  If neither are specified, floor(sqrt(data().length)) is used for
    both.
 */

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class renderer
 *
 * @class
 * @extends geo.object
 * @returns {geo.renderer}
 */
//////////////////////////////////////////////////////////////////////////////
geo.renderer = function (arg) {
  "use strict";

  if (!(this instanceof geo.renderer)) {
    return new geo.renderer(arg);
  }
  geo.object.call(this);

  arg = arg || {};
  var m_this = this,
      m_layer = arg.layer === undefined ? null : arg.layer,
      m_canvas = arg.canvas === undefined ? null : arg.canvas,
      m_initialized = false;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get layer of the renderer
   *
   * @returns {*}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.layer = function () {
    return m_layer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get canvas for the renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.canvas = function (val) {
    if (val === undefined) {
      return m_canvas;
    } else {
      m_canvas = val;
      m_this.modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get map that this renderer belongs to
   */
  ////////////////////////////////////////////////////////////////////////////
  this.map = function () {
    if (m_layer) {
      return m_layer.map();
    } else {
      return null;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get base layer that belongs to this renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.baseLayer = function () {
    if (m_this.map()) {
      return m_this.map().baseLayer();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set if renderer has been initialized
   */
  ////////////////////////////////////////////////////////////////////////////
  this.initialized = function (val) {
    if (val === undefined) {
      return m_initialized;
    } else {
      m_initialized = val;
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get render API used by the renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.api = function () {
    throw "Should be implemented by derivied classes";
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Reset to default
   */
  ////////////////////////////////////////////////////////////////////////////
  this.reset = function () {
    return true;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function () {
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle resize event
   */
  ////////////////////////////////////////////////////////////////////////////
  this._resize = function () {
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Render
   */
  ////////////////////////////////////////////////////////////////////////////
  this._render = function () {
  };

  return this;
};

inherit(geo.renderer, geo.object);

(function () {
  'use strict';

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Create a new instance of osmLayer
   *
   * @class
   * @extends geo.featureLayer
   *
   * @param {Object} arg - arg can contain following keys: baseUrl,
   *        imageFormat (such as png or jpeg), and displayLast
   *        (to decide whether or not render tiles from last zoom level).
   */
  //////////////////////////////////////////////////////////////////////////////
  geo.osmLayer = function (arg) {

    if (!(this instanceof geo.osmLayer)) {
      return new geo.osmLayer(arg);
    }
    if (arg.mapOpacity !== undefined && arg.opacity === undefined) {
      arg.opacity = arg.mapOpacity;
    }
    geo.tileLayer.call(this, arg);

    /* mapOpacity is just another name for the layer opacity. */
    this.mapOpacity = this.opacity;

    /**
     * Returns an instantiated imageTile object with the given indices.  This
     * method always returns a new tile object.  Use `_getTileCached`
     * to use the caching layer.
     * @param {Object} index The tile index
     * @param {Number} index.x
     * @param {Number} index.y
     * @param {Number} index.level
     * @param {Object} source The tile index used for constructing the url
     * @param {Number} source.x
     * @param {Number} source.y
     * @param {Number} source.level
     * @returns {geo.tile}
     */
    this._getTile = function (index, source) {
      var urlParams = source || index;
      return geo.imageTile({
        index: index,
        size: {x: this._options.tileWidth, y: this._options.tileHeight},
        queue: this._queue,
        url: this._options.url(urlParams.x, urlParams.y, urlParams.level || 0,
                               this._options.subdomains)
      });
    }.bind(this);
  };

  /**
   * This object contains the default options used to initialize the osmLayer.
   */
  geo.osmLayer.defaults = $.extend({}, geo.tileLayer.defaults, {
    minLevel: 0,
    maxLevel: 18,
    tileOverlap: 0,
    tileWidth: 256,
    tileHeight: 256,
    tileOffset : function (level) {
      var s = Math.pow(2, level - 1) * 256;
      return {x: s, y: s};
    },
    wrapX: true,
    wrapY: false,
    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: 'Tile data &copy; <a href="http://osm.org/copyright">' +
      'OpenStreetMap</a> contributors'
  });

  inherit(geo.osmLayer, geo.tileLayer);

  geo.registerLayer('osm', geo.osmLayer);
})();

geo.domRenderer = function (arg) {
  'use strict';

  if (!(this instanceof geo.domRenderer)) {
    return new geo.domRenderer(arg);
  }
  geo.renderer.call(this, arg);

  arg = arg || {};

  var m_this = this;

  this.api = function () {
    return 'dom';
  };

  this._init = function () {
    var layer = m_this.layer().node();

    if (!m_this.canvas() && layer && layer.length) {
      // The renderer and the UI Layer share the same canvas
      // at least for now. This renderer is essentially a noop renderer
      // designed for backwards compatibility
      m_this.canvas(layer[0]);
    }
  };

  this._init(arg);
  return this;
};

inherit(geo.domRenderer, geo.renderer);

geo.registerRenderer('dom', geo.domRenderer);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class choroplethFeature
 *
 * @class
 * @extends geo.feature
 * @returns {geo.choroplethFeature}
 *
 */
//////////////////////////////////////////////////////////////////////////////
geo.choroplethFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.choroplethFeature)) {
    return new geo.choroplethFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_init = this._init,
      m_choropleth = $
      .extend({},
              {
                /* 9-step based on paraview bwr colortable */
                colorRange: [
                  {r: 0.07514311, g: 0.468049805, b: 1},
                  {r: 0.468487184, g: 0.588057293, b: 1},
                  {r: 0.656658579, g: 0.707001303, b: 1},
                  {r: 0.821573924, g: 0.837809045, b: 1},
                  {r: 0.943467973, g: 0.943498599, b: 0.943398095},
                  {r: 1, g: 0.788626485, b: 0.750707739},
                  {r: 1, g: 0.6289553, b: 0.568237474},
                  {r: 1, g: 0.472800903, b: 0.404551679},
                  {r: 0.916482116, g: 0.236630659, b: 0.209939162}
                ],
                scale: d3.scale.quantize(),
                accessors: {
                  //accessor for ID on geodata feature
                  geoId: function (geoFeature) {
                    return geoFeature.properties.GEO_ID;
                  },
                  //accessor for ID on scalar element
                  scalarId: function (scalarElement) {
                    return scalarElement.id;
                  },
                  //accessor for value on scalar element
                  scalarValue: function (scalarElement) {
                    return scalarElement.value;
                  }
                }
              },
              arg.choropleth);


  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set choropleth scalar data
   *
   * @returns {geo.feature.choropleth}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.scalar = function (data, aggregator) {
    var scalarId, scalarValue;

    if (data === undefined) {
      return m_this.choropleth.get('scalar')();
    } else {
      scalarId = m_this.choropleth.get('accessors')().scalarId;
      scalarValue = m_this.choropleth.get('accessors')().scalarValue;
      m_choropleth.scalar = data;
      m_choropleth.scalarAggregator = aggregator || d3.mean;
      // we make internal dictionary from array for faster lookup
      // when matching geojson features to scalar values,
      // note that we also allow for multiple scalar elements
      // for the same geo feature
      m_choropleth.scalar._dictionary = data
        .reduce(function (accumeDictionary, scalarElement) {
          var id, value;

          id = scalarId(scalarElement);
          value = scalarValue(scalarElement);

          accumeDictionary[id] =
            accumeDictionary[id] ?
            accumeDictionary[id].push(value) : [value];

          return accumeDictionary;
        }, {});
      m_this.dataTime().modified();
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set choropleth accessor
   *
   * @returns {geo.feature.choropleth}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.choropleth = function (arg1, arg2) {
    var choropleth;

    if (arg1 === undefined) {
      return m_choropleth;
    }
    if (typeof arg1 === 'string' && arg2 === undefined) {
      return m_choropleth[arg1];
    }
    if (arg2 === undefined) {
      choropleth = $.extend(
        {},
        m_choropleth,
        arg1
      );
      m_choropleth = choropleth;
    } else {
      m_choropleth[arg1] = arg2; //if you pass in accessor for prop
    }
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * A uniform getter that always returns a function even for constant values.
   * If undefined input, return all the choropleth values as an object.
   *
   * @param {string|undefined} key
   * @return {function}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.choropleth.get = function (key) {
    var all = {}, k;
    if (key === undefined) {
      for (k in m_choropleth) {
        if (m_choropleth.hasOwnProperty(k)) {
          all[k] = m_this.choropleth.get(k);
        }
      }
      return all;
    }
    return geo.util.ensureFunction(m_choropleth[key]);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * A method that adds a polygon feature to the current layer.
   *
   * @param {array} coordinateArray
   * @param {geo.color} fillColor
   * @return {geo.feature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this._addPolygonFeature = function (feature, fillColor) {
    var newFeature = m_this.layer()
        .createFeature('polygon', {});

    if (feature.geometry.type === 'Polygon') {
      newFeature.data([{
        type: 'Polygon',
        coordinates: feature.geometry.coordinates
      }]);
    } else if (feature.geometry.type === 'MultiPolygon') {
      newFeature.data(feature.geometry.coordinates.map(function (coordinateMap) {
        return {
          type: 'Polygon',
          coordinates: coordinateMap
        };
      }));
    }

    newFeature
      .polygon(function (d) {
        return {
          'outer': d.coordinates[0],
          'inner': d.coordinates[1] // undefined but ok
        };
      })
      .position(function (d) {
        return {
          x: d[0],
          y: d[1]
        };
      })
      .style({
        'fillColor': fillColor
      });

    return newFeature;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * A method that adds polygons from a given feature to the current layer.
   *
   * @param {} geoJsonFeature
   * @param geo.color
   * @return [{geo.feature}]
   */
  ////////////////////////////////////////////////////////////////////////////
  this._featureToPolygons = function (feature, fillValue) {
    return m_this
      ._addPolygonFeature(feature, fillValue);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * A method that sets a choropleth scale's domain and range.
   *
   * @param {undefined | function({})} valueAccessor
   * @return {geo.feature.choropleth}
   */
  ////////////////////////////////////////////////////////////////////////////
  this._generateScale = function (valueAccessor) {
    var extent =
        d3.extent(m_this.scalar(), valueAccessor || undefined);

    m_this.choropleth()
      .scale
      .domain(extent)
      .range(m_this.choropleth().colorRange);

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**sr
   * Generate scale for choropleth.data(), make polygons from features.
   * @returns: [ [geo.feature.polygon, ...] , ... ]
   */
  ////////////////////////////////////////////////////////////////////////////
  this.createChoropleth = function () {
    var choropleth = m_this.choropleth,
        data = m_this.data(),
        scalars = m_this.scalar(),
        valueFunc = choropleth.get('accessors')().scalarValue,
        getFeatureId = choropleth.get('accessors')().geoId;

    m_this._generateScale(valueFunc);

    return data
      .map(function (feature) {
        var id = getFeatureId(feature);
        var valueArray = scalars._dictionary[id];
        var accumulatedScalarValue = choropleth().scalarAggregator(valueArray);
        // take average of this array of values
        // which allows for non-bijective correspondance
        // between geo data and scalar data
        var fillColor =
            m_this
            .choropleth()
            .scale(accumulatedScalarValue);

        return m_this
          ._featureToPolygons(feature, fillColor);
      });
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);

    if (m_choropleth) {
      m_this.dataTime().modified();
    }
  };

  this._init(arg);
  return this;
};

inherit(geo.choroplethFeature, geo.feature);

/* Example:
 */

/**
 * @namespace
 */
geo.gl = {};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of lineFeature
 *
 * @class
 * @extends geo.lineFeature
 * @returns {geo.gl.lineFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gl.lineFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.gl.lineFeature)) {
    return new geo.gl.lineFeature(arg);
  }
  arg = arg || {};
  geo.lineFeature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_exit = this._exit,
      m_actor = null,
      m_mapper = null,
      m_material = null,
      m_pixelWidthUnif = null,
      m_aspectUniform = null,
      m_dynamicDraw = arg.dynamicDraw === undefined ? false : arg.dynamicDraw,
      s_init = this._init,
      s_update = this._update;

  function createVertexShader() {
    var vertexShaderSource = [
      '#ifdef GL_ES',
      '  precision highp float;',
      '#endif',
      'attribute vec3 pos;',
      'attribute vec3 prev;',
      'attribute vec3 next;',
      'attribute float offset;',

      'attribute vec3 strokeColor;',
      'attribute float strokeOpacity;',
      'attribute float strokeWidth;',

      'uniform mat4 modelViewMatrix;',
      'uniform mat4 projectionMatrix;',
      'uniform float pixelWidth;',
      'uniform float aspect;',

      'varying vec3 strokeColorVar;',
      'varying float strokeWidthVar;',
      'varying float strokeOpacityVar;',

      'void main(void)',
      '{',
      /* If any vertex has been deliberately set to a negative opacity,
       * skip doing computations on it. */
      '  if (strokeOpacity < 0.0) {',
      '    gl_Position = vec4(2, 2, 0, 1);',
      '    return;',
      '  }',
      '  const float PI = 3.14159265358979323846264;',
      '  vec4 worldPos = projectionMatrix * modelViewMatrix * vec4(pos.xyz, 1);',
      '  if (worldPos.w != 0.0) {',
      '    worldPos = worldPos/worldPos.w;',
      '  }',
      '  vec4 worldNext = projectionMatrix * modelViewMatrix * vec4(next.xyz, 1);',
      '  if (worldNext.w != 0.0) {',
      '    worldNext = worldNext/worldNext.w;',
      '  }',
      '  vec4 worldPrev = projectionMatrix* modelViewMatrix * vec4(prev.xyz, 1);',
      '  if (worldPrev.w != 0.0) {',
      '    worldPrev = worldPrev/worldPrev.w;',
      '  }',
      '  strokeColorVar = strokeColor;',
      '  strokeWidthVar = strokeWidth;',
      '  strokeOpacityVar = strokeOpacity;',
      '  vec2 deltaNext = worldNext.xy - worldPos.xy;',
      '  vec2 deltaPrev = worldPos.xy - worldPrev.xy;',
      '  float angleNext = 0.0, anglePrev = 0.0;',
      '  if (deltaNext.xy != vec2(0.0, 0.0))',
      '    angleNext = atan(deltaNext.y / aspect, deltaNext.x);',
      '  if (deltaPrev.xy == vec2(0.0, 0.0)) anglePrev = angleNext;',
      '  else  anglePrev = atan(deltaPrev.y / aspect, deltaPrev.x);',
      '  if (deltaNext.xy == vec2(0.0, 0.0)) angleNext = anglePrev;',
      '  float angle = (anglePrev + angleNext) / 2.0;',
      '  float cosAngle = cos(anglePrev - angle);',
      '  if (cosAngle < 0.1) { cosAngle = sign(cosAngle) * 1.0; angle = 0.0; }',
      '  float distance = (offset * strokeWidth * pixelWidth) /',
      '                    cosAngle;',
      '  worldPos.x += distance * sin(angle);',
      '  worldPos.y -= distance * cos(angle) * aspect;',
      '  gl_Position = worldPos;',
      '}'
    ].join('\n'),
    shader = new vgl.shader(vgl.GL.VERTEX_SHADER);
    shader.setShaderSource(vertexShaderSource);
    return shader;
  }

  function createFragmentShader() {
    var fragmentShaderSource = [
      '#ifdef GL_ES',
      '  precision highp float;',
      '#endif',
      'varying vec3 strokeColorVar;',
      'varying float strokeWidthVar;',
      'varying float strokeOpacityVar;',
      'void main () {',
      '  gl_FragColor = vec4 (strokeColorVar, strokeOpacityVar);',
      '}'
    ].join('\n'),
    shader = new vgl.shader(vgl.GL.FRAGMENT_SHADER);
    shader.setShaderSource(fragmentShaderSource);
    return shader;
  }

  function createGLLines() {
    var data = m_this.data(),
        i, j, k, v,
        numSegments = 0, len,
        lineItem, lineItemData,
        vert = [{}, {}], vertTemp,
        pos, posIdx3,
        position = [],
        posFunc = m_this.position(),
        strkWidthFunc = m_this.style.get('strokeWidth'),
        strkColorFunc = m_this.style.get('strokeColor'),
        strkOpacityFunc = m_this.style.get('strokeOpacity'),
        order = m_this.featureVertices(),
        posBuf, nextBuf, prevBuf, offsetBuf, indicesBuf,
        strokeWidthBuf, strokeColorBuf, strokeOpacityBuf,
        dest, dest3,
        geom = m_mapper.geometryData();

    for (i = 0; i < data.length; i += 1) {
      lineItem = m_this.line()(data[i], i);
      numSegments += lineItem.length - 1;
      for (j = 0; j < lineItem.length; j += 1) {
        pos = posFunc(lineItem[j], j, lineItem, i);
        position.push(pos.x);
        position.push(pos.y);
        position.push(pos.z || 0.0);
      }
    }

    position = geo.transform.transformCoordinates(
                 m_this.gcs(), m_this.layer().map().gcs(),
                 position, 3);

    len = numSegments * order.length;
    posBuf           = getBuffer(geom, 'pos', len * 3);
    nextBuf          = getBuffer(geom, 'next', len * 3);
    prevBuf          = getBuffer(geom, 'prev', len * 3);
    offsetBuf        = getBuffer(geom, 'offset', len * 1);
    strokeWidthBuf   = getBuffer(geom, 'strokeWidth', len * 1);
    strokeColorBuf   = getBuffer(geom, 'strokeColor', len * 3);
    strokeOpacityBuf = getBuffer(geom, 'strokeOpacity', len * 1);
    indicesBuf = geom.primitive(0).indices();
    if (!(indicesBuf instanceof Uint16Array) || indicesBuf.length !== len) {
      indicesBuf = new Uint16Array(len);
      geom.primitive(0).setIndices(indicesBuf);
    }

    for (i = posIdx3 = dest = dest3 = 0; i < data.length; i += 1) {
      lineItem = m_this.line()(data[i], i);
      for (j = 0; j < lineItem.length; j += 1, posIdx3 += 3) {
        lineItemData = lineItem[j];
        /* swap entries in vert so that vert[0] is the first vertex, and
         * vert[1] will be reused for the second vertex */
        if (j) {
          vertTemp = vert[0];
          vert[0] = vert[1];
          vert[1] = vertTemp;
        }
        vert[1].pos = posIdx3;
        vert[1].prev = posIdx3 - (j ? 3 : 0);
        vert[1].next = posIdx3 + (j + 1 < lineItem.length ? 3 : 0);
        vert[1].strokeWidth = strkWidthFunc(lineItemData, j, lineItem, i);
        vert[1].strokeColor = strkColorFunc(lineItemData, j, lineItem, i);
        vert[1].strokeOpacity = strkOpacityFunc(lineItemData, j, lineItem, i);
        if (j) {
          for (k = 0; k < order.length; k += 1, dest += 1, dest3 += 3) {
            v = vert[order[k][0]];
            posBuf[dest3]     = position[v.pos];
            posBuf[dest3 + 1] = position[v.pos + 1];
            posBuf[dest3 + 2] = position[v.pos + 2];
            prevBuf[dest3]     = position[v.prev];
            prevBuf[dest3 + 1] = position[v.prev + 1];
            prevBuf[dest3 + 2] = position[v.prev + 2];
            nextBuf[dest3]     = position[v.next];
            nextBuf[dest3 + 1] = position[v.next + 1];
            nextBuf[dest3 + 2] = position[v.next + 2];
            offsetBuf[dest] = order[k][1];
            /* We can ignore the indicies (they will all be zero) */
            strokeWidthBuf[dest] = v.strokeWidth;
            strokeColorBuf[dest3]     = v.strokeColor.r;
            strokeColorBuf[dest3 + 1] = v.strokeColor.g;
            strokeColorBuf[dest3 + 2] = v.strokeColor.b;
            strokeOpacityBuf[dest] = v.strokeOpacity;
          }
        }
      }
    }

    geom.boundsDirty(true);
    m_mapper.modified();
    m_mapper.boundsDirtyTimestamp().modified();
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get a buffer for a geometry source.  If a buffer already exists and is
   * the correct size, return it.  Otherwise, allocate a new buffer; any data
   * in an old buffer is discarded.
   *
   * @param geom: the geometry to reference and modify.
   * @param srcName: the name of the source.
   * @param len: the number of elements for the array.
   * @returns {Float32Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  function getBuffer(geom, srcName, len) {
    var src = geom.sourceByName(srcName), data;

    data = src.data();
    if (data instanceof Float32Array && data.length === len) {
      return data;
    }
    data = new Float32Array(len);
    src.setData(data);
    return data;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the arrangement of vertices used for each line segment.
   *
   * @returns {Number}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.featureVertices = function () {
    return [[0, 1], [1, -1], [0, -1], [0, 1], [1, 1], [1, -1]];
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the number of vertices used for each line segment.
   *
   * @returns {Number}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.verticesPerFeature = function () {
    return m_this.featureVertices().length;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    var prog = vgl.shaderProgram(),
        vs = createVertexShader(),
        fs = createFragmentShader(),
        // Vertex attributes
        posAttr = vgl.vertexAttribute('pos'),
        prvAttr = vgl.vertexAttribute('prev'),
        nxtAttr = vgl.vertexAttribute('next'),
        offAttr = vgl.vertexAttribute('offset'),
        strkWidthAttr = vgl.vertexAttribute('strokeWidth'),
        strkColorAttr = vgl.vertexAttribute('strokeColor'),
        strkOpacityAttr = vgl.vertexAttribute('strokeOpacity'),
        // Shader uniforms
        mviUnif = new vgl.modelViewUniform('modelViewMatrix'),
        prjUnif = new vgl.projectionUniform('projectionMatrix'),
        geom = vgl.geometryData(),
        // Sources
        posData = vgl.sourceDataP3fv({'name': 'pos'}),
        prvPosData = vgl.sourceDataAnyfv(
            3, vgl.vertexAttributeKeysIndexed.Four, {'name': 'prev'}),
        nxtPosData = vgl.sourceDataAnyfv(
            3, vgl.vertexAttributeKeysIndexed.Five, {'name': 'next'}),
        offPosData = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.Six, {'name': 'offset'}),
        strkWidthData = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.One, {'name': 'strokeWidth'}),
        strkColorData = vgl.sourceDataAnyfv(
            3, vgl.vertexAttributeKeysIndexed.Two, {'name': 'strokeColor'}),
        strkOpacityData = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.Three,
            {'name': 'strokeOpacity'}),
        // Primitive indices
        triangles = vgl.triangles();

    m_pixelWidthUnif =  new vgl.floatUniform('pixelWidth',
                          1.0 / m_this.renderer().width());
    m_aspectUniform = new vgl.floatUniform('aspect',
        m_this.renderer().width() / m_this.renderer().height());

    s_init.call(m_this, arg);
    m_material = vgl.material();
    m_mapper = vgl.mapper({dynamicDraw: m_dynamicDraw});

    prog.addVertexAttribute(posAttr, vgl.vertexAttributeKeys.Position);
    prog.addVertexAttribute(strkWidthAttr, vgl.vertexAttributeKeysIndexed.One);
    prog.addVertexAttribute(strkColorAttr, vgl.vertexAttributeKeysIndexed.Two);
    prog.addVertexAttribute(strkOpacityAttr, vgl.vertexAttributeKeysIndexed.Three);
    prog.addVertexAttribute(prvAttr, vgl.vertexAttributeKeysIndexed.Four);
    prog.addVertexAttribute(nxtAttr, vgl.vertexAttributeKeysIndexed.Five);
    prog.addVertexAttribute(offAttr, vgl.vertexAttributeKeysIndexed.Six);

    prog.addUniform(mviUnif);
    prog.addUniform(prjUnif);
    prog.addUniform(m_pixelWidthUnif);
    prog.addUniform(m_aspectUniform);

    prog.addShader(fs);
    prog.addShader(vs);

    m_material.addAttribute(prog);
    m_material.addAttribute(vgl.blend());

    m_actor = vgl.actor();
    m_actor.setMaterial(m_material);
    m_actor.setMapper(m_mapper);

    geom.addSource(posData);
    geom.addSource(prvPosData);
    geom.addSource(nxtPosData);
    geom.addSource(strkWidthData);
    geom.addSource(strkColorData);
    geom.addSource(strkOpacityData);
    geom.addSource(offPosData);
    geom.addPrimitive(triangles);
    m_mapper.setGeometryData(geom);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return list of actors
   *
   * @returns {vgl.actor[]}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.actors = function () {
    if (!m_actor) {
      return [];
    }
    return [m_actor];
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    if (m_actor) {
      m_this.renderer().contextRenderer().removeActor(m_actor);
    }

    createGLLines();

    m_this.renderer().contextRenderer().addActor(m_actor);
    m_this.buildTime().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    s_update.call(m_this);

    if (m_this.dataTime().getMTime() >= m_this.buildTime().getMTime() ||
        m_this.updateTime().getMTime() <= m_this.getMTime()) {
      m_this._build();
    }

    m_pixelWidthUnif.set(1.0 / m_this.renderer().width());
    m_aspectUniform.set(m_this.renderer().width() /
                        m_this.renderer().height());
    m_actor.setVisible(m_this.visible());
    m_actor.material().setBinNumber(m_this.bin());
    m_this.updateTime().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Destroy
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.renderer().contextRenderer().removeActor(m_actor);
    s_exit();
  };

  this._init(arg);
  return this;
};

inherit(geo.gl.lineFeature, geo.lineFeature);

// Now register it
geo.registerFeature('vgl', 'line', geo.gl.lineFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of pointFeature
 *
 * @class
 * @extends geo.pointFeature
 * @returns {geo.gl.pointFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gl.pointFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.gl.pointFeature)) {
    return new geo.gl.pointFeature(arg);
  }
  arg = arg || {};
  geo.pointFeature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_exit = this._exit,
      m_actor = null,
      m_mapper = null,
      m_pixelWidthUniform = null,
      m_aspectUniform = null,
      m_dynamicDraw = arg.dynamicDraw === undefined ? false : arg.dynamicDraw,
      m_primitiveShape = "sprite", // arg can change this, below
      s_init = this._init,
      s_update = this._update,
      vertexShaderSource = null,
      fragmentShaderSource = null;

  if (arg.primitiveShape === "triangle" ||
      arg.primitiveShape === "square" ||
      arg.primitiveShape === "sprite") {
    m_primitiveShape = arg.primitiveShape;
  }

  vertexShaderSource = [
    "#ifdef GL_ES",
    "  precision highp float;",
    "#endif",
    "attribute vec3 pos;",
    "attribute float rad;",
    "attribute vec3 fillColor;",
    "attribute vec3 strokeColor;",
    "attribute float fillOpacity;",
    "attribute float strokeWidth;",
    "attribute float strokeOpacity;",
    "attribute float fill;",
    "attribute float stroke;",
    "uniform float pixelWidth;",
    "uniform float aspect;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "varying vec4 fillColorVar;",
    "varying vec4 strokeColorVar;",
    "varying float radiusVar;",
    "varying float strokeWidthVar;",
    "varying float fillVar;",
    "varying float strokeVar;"
  ];

  if (m_primitiveShape !== "sprite") {
    vertexShaderSource = vertexShaderSource.concat([
      "attribute vec2 unit;",
      "varying vec3 unitVar;"
    ]);
  }

  vertexShaderSource.push.apply(vertexShaderSource, [
    "void main(void)",
    "{",
    "  strokeWidthVar = strokeWidth;",
    "  // No stroke or fill implies nothing to draw",
    "  if (stroke < 1.0 || strokeWidth <= 0.0 || strokeOpacity <= 0.0) {",
    "    strokeVar = 0.0;",
    "    strokeWidthVar = 0.0;",
    "  }",
    "  else",
    "    strokeVar = 1.0;",
    "  if (fill < 1.0 || rad <= 0.0 || fillOpacity <= 0.0)",
    "    fillVar = 0.0;",
    "  else",
    "    fillVar = 1.0;",
    /* If the point has no visible pixels, skip doing computations on it. */
    "  if (fillVar == 0.0 && strokeVar == 0.0) {",
    "    gl_Position = vec4(2, 2, 0, 1);",
    "    return;",
    "  }",
    "  fillColorVar = vec4 (fillColor, fillOpacity);",
    "  strokeColorVar = vec4 (strokeColor, strokeOpacity);",
    "  radiusVar = rad;"
  ]);

  if (m_primitiveShape === "sprite") {
    vertexShaderSource.push.apply(vertexShaderSource, [
      "  gl_Position = (projectionMatrix * modelViewMatrix * vec4(pos, 1.0)).xyzw;",
      "  gl_PointSize = 2.0 * (rad + strokeWidthVar); ",
      "}"
    ]);
  } else {
    vertexShaderSource.push.apply(vertexShaderSource, [
        "  unitVar = vec3 (unit, 1.0);",
        "  vec4 p = (projectionMatrix * modelViewMatrix * vec4(pos, 1.0)).xyzw;",
        "  if (p.w != 0.0) {",
        "    p = p / p.w;",
        "  }",
        "  p += (rad + strokeWidthVar) * ",
        "       vec4 (unit.x * pixelWidth, unit.y * pixelWidth * aspect, 0.0, 1.0);",
        "  gl_Position = vec4(p.xyz, 1.0);",
        "}"
      ]);
  }
  vertexShaderSource = vertexShaderSource.join("\n");

  fragmentShaderSource = [
    "#ifdef GL_ES",
    "  precision highp float;",
    "#endif",
    "uniform float aspect;",
    "varying vec4 fillColorVar;",
    "varying vec4 strokeColorVar;",
    "varying float radiusVar;",
    "varying float strokeWidthVar;",
    "varying float fillVar;",
    "varying float strokeVar;"
  ];

  if (m_primitiveShape !== "sprite") {
    fragmentShaderSource.push("varying vec3 unitVar;");
  }

  fragmentShaderSource.push.apply(fragmentShaderSource, [
    "void main () {",
    "  vec4 strokeColor, fillColor;",
    "  float endStep;",
    "  // No stroke or fill implies nothing to draw",
    "  if (fillVar == 0.0 && strokeVar == 0.0)",
    "    discard;"
  ]);

  if (m_primitiveShape === "sprite") {
    fragmentShaderSource.push(
      "  float rad = 2.0 * length (gl_PointCoord - vec2(0.5));");
  } else {
    fragmentShaderSource.push(
      "  float rad = length (unitVar.xy);");
  }

  fragmentShaderSource.push.apply(fragmentShaderSource, [
    "  if (rad > 1.0)",
    "    discard;",
    "  // If there is no stroke, the fill region should transition to nothing",
    "  if (strokeVar == 0.0) {",
    "    strokeColor = vec4 (fillColorVar.rgb, 0.0);",
    "    endStep = 1.0;",
    "  } else {",
    "    strokeColor = strokeColorVar;",
    "    endStep = radiusVar / (radiusVar + strokeWidthVar);",
    "  }",
    "  // Likewise, if there is no fill, the stroke should transition to nothing",
    "  if (fillVar == 0.0)",
    "    fillColor = vec4 (strokeColor.rgb, 0.0);",
    "  else",
    "    fillColor = fillColorVar;",
    "  // Distance to antialias over",
    "  float antialiasDist = 3.0 / (2.0 * radiusVar);",
    "  if (rad < endStep) {",
    "    float step = smoothstep (endStep - antialiasDist, endStep, rad);",
    "    gl_FragColor = mix (fillColor, strokeColor, step);",
    "  } else {",
    "    float step = smoothstep (1.0 - antialiasDist, 1.0, rad);",
    "    gl_FragColor = mix (strokeColor, vec4 (strokeColor.rgb, 0.0), step);",
    "  }",
    "}"
  ]);

  fragmentShaderSource = fragmentShaderSource.join("\n");

  function createVertexShader() {
    var shader = new vgl.shader(vgl.GL.VERTEX_SHADER);
    shader.setShaderSource(vertexShaderSource);
    return shader;
  }

  function createFragmentShader() {
    var shader = new vgl.shader(vgl.GL.FRAGMENT_SHADER);
    shader.setShaderSource(fragmentShaderSource);
    return shader;
  }

  function pointPolygon(x, y, w, h) {
    var verts;
    switch (m_primitiveShape) {
      case "triangle":
        /* Use an equilateral triangle.  While this has 30% more area than a
         * square, the reduction in vertices should help more than the
         * processing the additional fragments. */
        verts = [
          x, y - h * 2,
          x - w * Math.sqrt(3.0), y + h,
          x + w * Math.sqrt(3.0), y + h
        ];
        break;
      case "sprite":
        /* Point sprite uses only one vertex per point. */
        verts = [x, y];
        break;
      default: // "square"
        /* Use a surrounding square split diagonally into two triangles. */
        verts = [
          x - w, y + h,
          x - w, y - h,
          x + w, y + h,
          x - w, y - h,
          x + w, y - h,
          x + w, y + h
        ];
        break;
    }
    return verts;
  }

  function createGLPoints() {
    // unit and associated data is not used when drawing sprite
    var i, j, numPts = m_this.data().length,
        unit = pointPolygon(0, 0, 1, 1),
        position = new Array(numPts * 3), posBuf, posVal, posFunc,
        unitBuf, indices,
        radius, radiusVal, radFunc,
        stroke, strokeVal, strokeFunc,
        strokeWidth, strokeWidthVal, strokeWidthFunc,
        strokeOpacity, strokeOpacityVal, strokeOpactityFunc,
        strokeColor, strokeColorVal, strokeColorFunc,
        fill, fillVal, fillFunc,
        fillOpacity, fillOpacityVal, fillOpacityFunc,
        fillColor, fillColorVal, fillColorFunc,
        vpf = m_this.verticesPerFeature(),
        data = m_this.data(),
        item, ivpf, ivpf3, iunit, i3,
        geom = m_mapper.geometryData();

    posFunc = m_this.position();
    radFunc = m_this.style.get("radius");
    strokeFunc = m_this.style.get("stroke");
    strokeWidthFunc = m_this.style.get("strokeWidth");
    strokeOpactityFunc = m_this.style.get("strokeOpacity");
    strokeColorFunc = m_this.style.get("strokeColor");
    fillFunc = m_this.style.get("fill");
    fillOpacityFunc = m_this.style.get("fillOpacity");
    fillColorFunc = m_this.style.get("fillColor");

    /* It is more efficient to do a transform on a single array rather than on
     * an array of arrays or an array of objects. */
    for (i = i3 = 0; i < numPts; i += 1, i3 += 3) {
      posVal = posFunc(data[i]);
      position[i3]     = posVal.x;
      position[i3 + 1] = posVal.y;
      position[i3 + 2] = posVal.z || 0;
    }
    position = geo.transform.transformCoordinates(
                  m_this.gcs(), m_this.layer().map().gcs(),
                  position, 3);

    posBuf        = getBuffer(geom, "pos", vpf * numPts * 3);

    if (m_primitiveShape !== "sprite") {
      unitBuf       = getBuffer(geom, "unit", vpf * numPts * 2);
    }

    radius        = getBuffer(geom, "rad", vpf * numPts * 1);
    stroke        = getBuffer(geom, "stroke", vpf * numPts * 1);
    strokeWidth   = getBuffer(geom, "strokeWidth", vpf * numPts * 1);
    strokeOpacity = getBuffer(geom, "strokeOpacity", vpf * numPts * 1);
    strokeColor   = getBuffer(geom, "strokeColor", vpf * numPts * 3);
    fill          = getBuffer(geom, "fill", vpf * numPts * 1);
    fillOpacity   = getBuffer(geom, "fillOpacity", vpf * numPts * 1);
    fillColor     = getBuffer(geom, "fillColor", vpf * numPts * 3);
    indices = geom.primitive(0).indices();
    if (!(indices instanceof Uint16Array) || indices.length !== vpf * numPts) {
      indices = new Uint16Array(vpf * numPts);
      geom.primitive(0).setIndices(indices);
    }

    for (i = ivpf = ivpf3 = iunit = i3 = 0; i < numPts; i += 1, i3 += 3) {
      item = data[i];
      if (m_primitiveShape !== "sprite") {
        for (j = 0; j < unit.length; j += 1, iunit += 1) {
          unitBuf[iunit] = unit[j];
        }
      }
      /* We can ignore the indicies (they will all be zero) */
      radiusVal = radFunc(item);
      strokeVal = strokeFunc(item) ? 1.0 : 0.0;
      strokeWidthVal = strokeWidthFunc(item);
      strokeOpacityVal = strokeOpactityFunc(item);
      strokeColorVal = strokeColorFunc(item);
      fillVal = fillFunc(item) ? 1.0 : 0.0;
      fillOpacityVal = fillOpacityFunc(item);
      fillColorVal = fillColorFunc(item);
      for (j = 0; j < vpf; j += 1, ivpf += 1, ivpf3 += 3) {
        posBuf[ivpf3]     = position[i3];
        posBuf[ivpf3 + 1] = position[i3 + 1];
        posBuf[ivpf3 + 2] = position[i3 + 2];
        radius[ivpf] = radiusVal;
        stroke[ivpf] = strokeVal;
        strokeWidth[ivpf] = strokeWidthVal;
        strokeOpacity[ivpf] = strokeOpacityVal;
        strokeColor[ivpf3]     = strokeColorVal.r;
        strokeColor[ivpf3 + 1] = strokeColorVal.g;
        strokeColor[ivpf3 + 2] = strokeColorVal.b;
        fill[ivpf] = fillVal;
        fillOpacity[ivpf] = fillOpacityVal;
        fillColor[ivpf3]     = fillColorVal.r;
        fillColor[ivpf3 + 1] = fillColorVal.g;
        fillColor[ivpf3 + 2] = fillColorVal.b;
      }
    }

    geom.boundsDirty(true);
    m_mapper.modified();
    m_mapper.boundsDirtyTimestamp().modified();
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get a buffer for a geometry source.  If a buffer already exists and is
   * the correct size, return it.  Otherwise, allocate a new buffer; any data
   * in an old buffer is discarded.
   *
   * @param geom: the geometry to reference and modify.
   * @param srcName: the name of the source.
   * @param len: the number of elements for the array.
   * @returns {Float32Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  function getBuffer(geom, srcName, len) {
    var src = geom.sourceByName(srcName), data;

    data = src.data();
    if (data instanceof Float32Array && data.length === len) {
      return data;
    }
    data = new Float32Array(len);
    src.setData(data);
    return data;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return list of actors
   *
   * @returns {vgl.actor[]}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.actors = function () {
    if (!m_actor) {
      return [];
    }
    return [m_actor];
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the number of vertices used for each point.
   *
   * @returns {Number}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.verticesPerFeature = function () {
    var unit = pointPolygon(0, 0, 1, 1);
    return unit.length / 2;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function () {
    var prog = vgl.shaderProgram(),
        vertexShader = createVertexShader(),
        fragmentShader = createFragmentShader(),
        posAttr = vgl.vertexAttribute("pos"),
        unitAttr = vgl.vertexAttribute("unit"),
        radAttr = vgl.vertexAttribute("rad"),
        strokeWidthAttr = vgl.vertexAttribute("strokeWidth"),
        fillColorAttr = vgl.vertexAttribute("fillColor"),
        fillAttr = vgl.vertexAttribute("fill"),
        strokeColorAttr = vgl.vertexAttribute("strokeColor"),
        strokeAttr = vgl.vertexAttribute("stroke"),
        fillOpacityAttr = vgl.vertexAttribute("fillOpacity"),
        strokeOpacityAttr = vgl.vertexAttribute("strokeOpacity"),
        modelViewUniform = new vgl.modelViewUniform("modelViewMatrix"),
        projectionUniform = new vgl.projectionUniform("projectionMatrix"),
        mat = vgl.material(),
        blend = vgl.blend(),
        geom = vgl.geometryData(),
        sourcePositions = vgl.sourceDataP3fv({"name": "pos"}),
        sourceUnits = vgl.sourceDataAnyfv(
            2, vgl.vertexAttributeKeysIndexed.One, {"name": "unit"}),
        sourceRadius = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.Two, {"name": "rad"}),
        sourceStrokeWidth = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.Three, {"name": "strokeWidth"}),
        sourceFillColor = vgl.sourceDataAnyfv(
            3, vgl.vertexAttributeKeysIndexed.Four, {"name": "fillColor"}),
        sourceFill = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.Five, {"name": "fill"}),
        sourceStrokeColor = vgl.sourceDataAnyfv(
            3, vgl.vertexAttributeKeysIndexed.Six, {"name": "strokeColor"}),
        sourceStroke = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.Seven, {"name": "stroke"}),
        sourceAlpha = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.Eight, {"name": "fillOpacity"}),
        sourceStrokeOpacity = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.Nine, {"name": "strokeOpacity"}),
        primitive = new vgl.triangles();

    if (m_primitiveShape === "sprite") {
      primitive = new vgl.points();
    }

    m_pixelWidthUniform = new vgl.floatUniform("pixelWidth",
                            2.0 / m_this.renderer().width());
    m_aspectUniform = new vgl.floatUniform("aspect",
                        m_this.renderer().width() / m_this.renderer().height());

    s_init.call(m_this, arg);
    m_mapper = vgl.mapper({dynamicDraw: m_dynamicDraw});

    // TODO: Right now this is ugly but we will fix it.
    prog.addVertexAttribute(posAttr, vgl.vertexAttributeKeys.Position);
    if (m_primitiveShape !== "sprite") {
      prog.addVertexAttribute(unitAttr, vgl.vertexAttributeKeysIndexed.One);
    }

    prog.addVertexAttribute(radAttr, vgl.vertexAttributeKeysIndexed.Two);
    prog.addVertexAttribute(strokeWidthAttr, vgl.vertexAttributeKeysIndexed.Three);
    prog.addVertexAttribute(fillColorAttr, vgl.vertexAttributeKeysIndexed.Four);
    prog.addVertexAttribute(fillAttr, vgl.vertexAttributeKeysIndexed.Five);
    prog.addVertexAttribute(strokeColorAttr, vgl.vertexAttributeKeysIndexed.Six);
    prog.addVertexAttribute(strokeAttr, vgl.vertexAttributeKeysIndexed.Seven);
    prog.addVertexAttribute(fillOpacityAttr, vgl.vertexAttributeKeysIndexed.Eight);
    prog.addVertexAttribute(strokeOpacityAttr, vgl.vertexAttributeKeysIndexed.Nine);

    prog.addUniform(m_pixelWidthUniform);
    prog.addUniform(m_aspectUniform);
    prog.addUniform(modelViewUniform);
    prog.addUniform(projectionUniform);

    prog.addShader(fragmentShader);
    prog.addShader(vertexShader);

    mat.addAttribute(prog);
    mat.addAttribute(blend);

    m_actor = vgl.actor();
    m_actor.setMaterial(mat);
    m_actor.setMapper(m_mapper);

    geom.addSource(sourcePositions);
    geom.addSource(sourceUnits);
    geom.addSource(sourceRadius);
    geom.addSource(sourceStrokeWidth);
    geom.addSource(sourceFillColor);
    geom.addSource(sourceFill);
    geom.addSource(sourceStrokeColor);
    geom.addSource(sourceStroke);
    geom.addSource(sourceAlpha);
    geom.addSource(sourceStrokeOpacity);
    geom.addPrimitive(primitive);
    m_mapper.setGeometryData(geom);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {

    if (m_actor) {
      m_this.renderer().contextRenderer().removeActor(m_actor);
    }

    createGLPoints();

    m_this.renderer().contextRenderer().addActor(m_actor);
    m_this.renderer().contextRenderer().render();
    m_this.buildTime().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {

    s_update.call(m_this);

    // For now build if the data or style changes. In the future we may
    // we able to partially update the data using dynamic gl buffers.
    if (m_this.dataTime().getMTime() >= m_this.buildTime().getMTime() ||
        m_this.updateTime().getMTime() < m_this.getMTime()) {
      m_this._build();
    }

    // Update uniforms
    m_pixelWidthUniform.set(2.0 / m_this.renderer().width());
    m_aspectUniform.set(m_this.renderer().width() /
                        m_this.renderer().height());

    m_actor.setVisible(m_this.visible());
    m_actor.material().setBinNumber(m_this.bin());

    m_this.updateTime().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Destroy
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.renderer().contextRenderer().removeActor(m_actor);
    s_exit();
  };

  m_this._init();
  return this;
};

inherit(geo.gl.pointFeature, geo.pointFeature);

// Now register it
geo.registerFeature("vgl", "point", geo.gl.pointFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of geomFeature
 *
 * @class
 * @extends geo.geomFeature
 * @param {vgl.geometryData} arg
 * @returns {geo.gl.geomFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gl.geomFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.gl.geomFeature)) {
    return new geo.gl.geomFeature(arg);
  }
  arg = arg || {};
  geo.geomFeature.call(this, arg);

  // Initialize
  var m_this = this,
      m_geom = arg.geom || null,
      m_actor = vgl.actor(),
      m_mapper = vgl.mapper(),
      m_material = null,
      m_scalar = null,
      m_color = arg.color || [1.0, 1.0, 1.0],
      m_buildTime = null,
      m_noOfPrimitives = 0;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    var style = m_this.style();

    // Vertex color gets the preference
    if (m_geom !== null) {
      m_scalar = m_geom.sourceData(vgl.vertexAttributeKeys.Scalar);
      m_color = m_geom.sourceData(vgl.vertexAttributeKeys.Color);
      m_mapper.setGeometryData(m_geom);
    }

    m_this.setMapper(m_mapper);

    if (style.point_sprites !== undefined && style.point_sprites &&
        style.point_sprites_image !== undefined &&
        style.point_sprites_image !== null &&
        m_noOfPrimitives === 1 &&
        m_geom.primitive(0).primitiveType() === gl.POINTS) {
      m_material = vgl.utils.createPointSpritesMaterial(
                     style.point_sprites_image);
    } else if (m_scalar) {
      if (m_color instanceof vgl.lookupTable) {
        m_color.updateRange(m_scalar.scalarRange());
        m_material = vgl.utils.createColorMappedMaterial(m_color);
      } else {
        m_color = vgl.lookupTable();
        m_color.updateRange(m_scalar.scalarRange());
        m_material = vgl.utils.createColorMappedMaterial(m_color);
      }
    } else if (m_color) {
      m_material = vgl.utils.createColorMaterial();
    } else {
      m_material = vgl.utils.createSolidColorMaterial();
    }
    m_actor.setMaterial(m_material);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @private
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    if (m_buildTime &&
        m_buildTime.getMTime() < m_this.getMTime()) {
      if (m_color instanceof vgl.lookupTable) {
        vgl.utils.updateColorMappedMaterial(m_this.material(),
          m_this.style.color);
      }/* else {
        // TODO
      }*/
    } else {
      m_buildTime = vgl.timestamp();
      m_buildTime.modified();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set geometry
   *
   * @returns {geo.gl.geomFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.geometry = function (val) {
    if (val === undefined) {
      return m_geom;
    } else {
      m_geom = val;
      m_this.modified();
      return m_this;
    }
  };

  return this;
};

inherit(geo.gl.geomFeature, geo.geomFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a plane feature given a lower left corner point
 * and and upper right corner point
 * @class
 * @extends geo.planeFeature
 * @param lowerleft
 * @param upperright
 * @returns {geo.planeFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gl.planeFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.gl.planeFeature)) {
    return new geo.gl.planeFeature(arg);
  }
  geo.planeFeature.call(this, arg);

  var m_this = this,
      s_exit = this._exit,
      m_actor = null,
      m_onloadCallback = arg.onload === undefined ? null : arg.onload;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Gets the coordinates for this plane
   *
   * @returns {Array} [[origin], [upper left] [lower right]]
   */
  ////////////////////////////////////////////////////////////////////////////
  this.coords = function () {
    return [m_this.origin(), m_this.upperLeft(), m_this.lowerRight()];
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build this feature
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    var or = m_this.origin(),
        ul = m_this.upperLeft(),
        lr = m_this.lowerRight(),
        /// img could be a source or an Image
        img = m_this.style().image,
        image = null,
        texture = null,
        gcs = m_this.gcs(),
        map_gcs = m_this.layer().map().gcs();

    if (gcs !== map_gcs) {
      or = geo.transform.transformCoordinates(gcs, map_gcs, or);
      ul = geo.transform.transformCoordinates(gcs, map_gcs, ul);
      lr = geo.transform.transformCoordinates(gcs, map_gcs, lr);
    }

    m_this.buildTime().modified();

    if (m_actor) {
      m_this.renderer().contextRenderer().removeActor(m_actor);
    }

    if (img && img instanceof Image) {
      image = img;
    } else if (img) {
      image = new Image();
      image.src = img;
    }

    if (!image) {
      m_actor = vgl.utils.createPlane(or[0], or[1], or[2],
        ul[0], ul[1], ul[2],
        lr[0], lr[1], lr[2]);

      m_actor.material().shaderProgram().uniform("opacity").set(
        m_this.style().opacity !== undefined ? m_this.style().opacity : 1);

      m_this.renderer().contextRenderer().addActor(m_actor);

    } else {
      m_actor = vgl.utils.createTexturePlane(or[0], or[1], or[2],
        lr[0], lr[1], lr[2],
        ul[0], ul[1], ul[2], true);

      m_actor.material().shaderProgram().uniform("opacity").set(
        m_this.style().opacity !== undefined ? m_this.style().opacity : 1);

      texture = vgl.texture();
      m_this.visible(false);

      m_this.renderer().contextRenderer().addActor(m_actor);

      /* An image is already loaded if .complete is true and .naturalWidth
       * and .naturalHeight are defined and non-zero (not falsy seems to be
       * sufficient). */
      if (image.complete && image.naturalWidth && image.naturalHeight) {
        texture.setImage(image);
        m_actor.material().addAttribute(texture);
        /// NOTE Currently we assume that we want to show the feature as
        /// soon as the image gets loaded. However, there might be a case
        /// where we want to lock down the visibility. We will deal with that
        /// later.
        m_this.visible(true);

        if (m_onloadCallback) {
          m_onloadCallback.call(m_this);
        }
      } else {
        image.onload = function () {
          texture.setImage(image);
          m_actor.material().addAttribute(texture);
          /// NOTE Currently we assume that we want to show the feature as
          /// soon as the image gets loaded. However, there might be a case
          /// where we want to lock down the visibility. We will deal with that
          /// later.
          m_this.visible(true);

          if (m_onloadCallback) {
            m_onloadCallback.call(m_this);
          }

          if (m_this.drawOnAsyncResourceLoad()) {
            m_this._update();
            m_this.layer().draw();
          }
        };
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    if (m_this.buildTime().getMTime() <= m_this.dataTime().getMTime()) {
      m_this._build();
    }

    if (m_this.updateTime().getMTime() <= m_this.getMTime()) {
      m_actor.setVisible(m_this.visible());
      m_actor.material().setBinNumber(m_this.bin());
      m_actor.material().shaderProgram().uniform("opacity").set(
        m_this.style().opacity !== undefined ? m_this.style().opacity : 1);
    }

    m_this.updateTime().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Destroy
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.renderer().contextRenderer().removeActor(m_actor);
    s_exit();
  };

  return this;
};

inherit(geo.gl.planeFeature, geo.planeFeature);

// Now register it
geo.registerFeature("vgl", "plane", geo.gl.planeFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of polygonFeature
 *
 * @class
 * @extends geo.polygonFeature
 * @returns {geo.gl.polygonFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gl.polygonFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.gl.polygonFeature)) {
    return new geo.gl.polygonFeature(arg);
  }
  arg = arg || {};
  geo.polygonFeature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_exit = this._exit,
      m_actor = vgl.actor(),
      m_mapper = vgl.mapper(),
      m_material = vgl.material(),
      s_init = this._init,
      s_update = this._update;

  function createVertexShader() {
    var vertexShaderSource = [
      'attribute vec3 pos;',
      'attribute vec3 fillColor;',
      'attribute float fillOpacity;',
      'uniform mat4 modelViewMatrix;',
      'uniform mat4 projectionMatrix;',
      'uniform float pixelWidth;',
      'varying vec3 fillColorVar;',
      'varying float fillOpacityVar;',

      'void main(void)',
      '{',
      '  vec4 clipPos = projectionMatrix * modelViewMatrix * vec4(pos.xyz, 1);',
      '  if (clipPos.w != 0.0) {',
      '    clipPos = clipPos/clipPos.w;',
      '  }',
      '  fillColorVar = fillColor;',
      '  fillOpacityVar = fillOpacity;',
      '  gl_Position = clipPos;',
      '}'
    ].join('\n'),
    shader = new vgl.shader(vgl.GL.VERTEX_SHADER);
    shader.setShaderSource(vertexShaderSource);
    return shader;
  }

  function createFragmentShader() {
    var fragmentShaderSource = [
      '#ifdef GL_ES',
      '  precision highp float;',
      '#endif',
      'varying vec3 fillColorVar;',
      'varying float fillOpacityVar;',
      'void main () {',
      '  gl_FragColor = vec4 (fillColorVar, fillOpacityVar);',
      '}'
    ].join('\n'),
    shader = new vgl.shader(vgl.GL.FRAGMENT_SHADER);
    shader.setShaderSource(fragmentShaderSource);
    return shader;
  }

  function createGLPolygons() {
    var i = null,
        numPts = null,
        start = null,
        itemIndex = 0,
        polygonItemCoordIndex = 0,
        position = [],
        fillColor = [],
        fillOpacity = [],
        fillColorNew = [],
        fillOpacityNew = [],
        posFunc = null,
        fillColorFunc = null,
        polygonItem = null,
        fillOpacityFunc = null,
        buffers = vgl.DataBuffers(1024),
        sourcePositions = vgl.sourceDataP3fv(),
        sourceFillColor =
          vgl.sourceDataAnyfv(3, vgl.vertexAttributeKeysIndexed.Two),
        sourceFillOpacity =
          vgl.sourceDataAnyfv(1, vgl.vertexAttributeKeysIndexed.Three),
        trianglePrimitive = vgl.triangles(),
        geom = vgl.geometryData(),
        polygon = null,
        holes = null,
        extRing = null,
        extIndex = 0,
        extLength = null,
        intIndex = 0,
        posInstance = null,
        triangulator = new PNLTRI.Triangulator(),
        triangList = null,
        newTriangList = null,
        fillColorInstance = null,
        currentIndex = null;

    posFunc = m_this.position();
    fillColorFunc = m_this.style.get('fillColor');
    fillOpacityFunc = m_this.style.get('fillOpacity');

    m_this.data().forEach(function (item) {
      polygon = m_this.polygon()(item, itemIndex);
      polygonItem = polygon.outer || [];
      holes = polygon.inner || [];
      polygonItemCoordIndex = 0;
      extRing = [];
      extIndex = 0;
      extLength = polygonItem.length - 1;
      extRing[0] = [];
      intIndex = 0;

      polygonItem.forEach(function (extRingCoords) {
        if (extIndex !== extLength) {
          //extRing = extRing.concat(extRingCoords);
          posInstance = posFunc(extRingCoords,
                                polygonItemCoordIndex,
                                item, itemIndex);
          extRing[0].push({
            x: posInstance.x, y: posInstance.y, i: fillColor.length
          });

          fillColorInstance = fillColorFunc(extRingCoords,
                                            polygonItemCoordIndex,
                                            item, itemIndex);
          fillColor.push([fillColorInstance.r,
                          fillColorInstance.g,
                          fillColorInstance.b]);
          fillOpacity.push(fillOpacityFunc(extRingCoords,
                                           polygonItemCoordIndex,
                                           item,
                                           itemIndex));
          polygonItemCoordIndex += 1;
        }
        extIndex += 1;
      });

      polygonItemCoordIndex = 0;
      holes.forEach(function (hole) {
        extRing[intIndex + 1] = [];
        hole.forEach(function (intRingCoords) {
          posInstance = posFunc(intRingCoords, polygonItemCoordIndex,
                                item, itemIndex);
          extRing[intIndex + 1].push({
            x: posInstance.x, y: posInstance.y, i: fillColor.length
          });
          fillColorInstance = fillColorFunc(intRingCoords,
                                            polygonItemCoordIndex,
                                            item, itemIndex);
          fillColor.push([fillColorInstance.r,
                          fillColorInstance.g,
                          fillColorInstance.b]);
          fillOpacity.push(fillOpacityFunc(intRingCoords,
                                           polygonItemCoordIndex,
                                           item, itemIndex));
          polygonItemCoordIndex += 1;
        });
        intIndex += 1;
      });

      //console.log("extRing ", extRing);
      //console.log("result", PolyK.Triangulate(extRing));
      triangList = triangulator.triangulate_polygon(extRing);
      newTriangList = [];

      triangList.forEach(function (newIndices) {
        Array.prototype.push.apply(newTriangList, newIndices);
      });

      for (i = 1; i < extRing.length; i += 1) {
        extRing[0] = extRing[0].concat(extRing[i]);
      }

      newTriangList.forEach(function (polygonIndex) {
        var polygonItemCoords = extRing[0][polygonIndex];
        position.push([polygonItemCoords.x,
                       polygonItemCoords.y,
                       polygonItemCoords.z || 0.0]);
        fillColorNew.push(fillColor[polygonItemCoords.i]);
        fillOpacityNew.push(fillOpacity[polygonItemCoords.i]);
      });

      itemIndex += 1;
    });

    position = geo.transform.transformCoordinates(
                 m_this.gcs(), m_this.layer().map().gcs(),
                 position, 3);

    buffers.create('pos', 3);
    buffers.create('indices', 1);
    buffers.create('fillColor', 3);
    buffers.create('fillOpacity', 1);

    numPts = position.length;

    start = buffers.alloc(numPts);
    currentIndex = start;

    //console.log("numPts ", numPts);
    for (i = 0; i < numPts; i += 1) {
      buffers.write('pos', position[i], start + i, 1);
      buffers.write('indices', [i], start + i, 1);
      buffers.write('fillColor', fillColorNew[i], start + i, 1);
      buffers.write('fillOpacity', [fillOpacityNew[i]], start + i, 1);
    }

    //console.log(buffers.get('fillColor'));
    sourcePositions.pushBack(buffers.get('pos'));
    geom.addSource(sourcePositions);

    sourceFillColor.pushBack(buffers.get('fillColor'));
    geom.addSource(sourceFillColor);

    sourceFillOpacity.pushBack(buffers.get('fillOpacity'));
    geom.addSource(sourceFillOpacity);

    //console.log(buffers.get('indices'));
    trianglePrimitive.setIndices(buffers.get('indices'));
    geom.addPrimitive(trianglePrimitive);

    m_mapper.setGeometryData(geom);
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    var blend = vgl.blend(),
        prog = vgl.shaderProgram(),
        posAttr = vgl.vertexAttribute('pos'),
        fillColorAttr = vgl.vertexAttribute('fillColor'),
        fillOpacityAttr = vgl.vertexAttribute('fillOpacity'),
        modelViewUniform = new vgl.modelViewUniform('modelViewMatrix'),
        projectionUniform = new vgl.projectionUniform('projectionMatrix'),
        vertexShader = createVertexShader(),
        fragmentShader = createFragmentShader();

    s_init.call(m_this, arg);

    prog.addVertexAttribute(posAttr, vgl.vertexAttributeKeys.Position);
    prog.addVertexAttribute(fillColorAttr, vgl.vertexAttributeKeysIndexed.Two);
    prog.addVertexAttribute(fillOpacityAttr, vgl.vertexAttributeKeysIndexed.Three);

    prog.addUniform(modelViewUniform);
    prog.addUniform(projectionUniform);

    prog.addShader(fragmentShader);
    prog.addShader(vertexShader);

    m_material.addAttribute(prog);
    m_material.addAttribute(blend);

    m_actor.setMapper(m_mapper);
    m_actor.setMaterial(m_material);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    if (m_actor) {
      m_this.renderer().contextRenderer().removeActor(m_actor);
    }

    createGLPolygons();

    m_this.renderer().contextRenderer().addActor(m_actor);
    m_this.buildTime().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    s_update.call(m_this);

    if (m_this.dataTime().getMTime() >= m_this.buildTime().getMTime() ||
        m_this.updateTime().getMTime() <= m_this.getMTime()) {
      m_this._build();
    }

    m_actor.setVisible(m_this.visible());
    m_actor.material().setBinNumber(m_this.bin());
    m_this.updateTime().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Destroy
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.renderer().contextRenderer().removeActor(m_actor);
    s_exit();
  };

  this._init(arg);
  return this;
};

inherit(geo.gl.polygonFeature, geo.polygonFeature);

// Now register it
geo.registerFeature('vgl', 'polygon', geo.gl.polygonFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of contourFeature
 *
 * @class
 * @extends geo.contourFeature
 * @returns {geo.gl.contourFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gl.contourFeature = function (arg) {
  'use strict';

  if (!(this instanceof geo.gl.contourFeature)) {
    return new geo.gl.contourFeature(arg);
  }
  arg = arg || {};
  geo.contourFeature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_exit = this._exit,
      m_textureUnit = 7,
      m_actor = null,
      m_mapper = null,
      m_material = null,
      m_texture = null,
      m_minColorUniform = null,
      m_maxColorUniform = null,
      m_stepsUniform = null,
      m_steppedUniform = null,
      m_dynamicDraw = arg.dynamicDraw === undefined ? false : arg.dynamicDraw,
      s_init = this._init,
      s_update = this._update;

  function createVertexShader() {
    var vertexShaderSource = [
      '#ifdef GL_ES',
      '  precision highp float;',
      '#endif',
      'attribute vec3 pos;',
      'attribute float value;',
      'attribute float opacity;',
      'uniform mat4 modelViewMatrix;',
      'uniform mat4 projectionMatrix;',
      'varying float valueVar;',
      'varying float opacityVar;',

      'void main(void)',
      '{',
      /* Don't use z values; something is rotten in one of our matrices */
      '  vec4 scrPos = projectionMatrix * modelViewMatrix * vec4(pos.xy, 0, 1);',
      '  if (scrPos.w != 0.0) {',
      '    scrPos = scrPos / scrPos.w;',
      '  }',
      '  valueVar = value;',
      '  opacityVar = opacity;',
      '  gl_Position = scrPos;',
      '}'
    ].join('\n'),
    shader = new vgl.shader(vgl.GL.VERTEX_SHADER);
    shader.setShaderSource(vertexShaderSource);
    return shader;
  }

  function createFragmentShader() {
    var fragmentShaderSource = [
      '#ifdef GL_ES',
      '  precision highp float;',
      '#endif',
      'uniform vec4 minColor;',
      'uniform vec4 maxColor;',
      'uniform float steps;',
      'uniform bool stepped;',
      'uniform sampler2D sampler2d;',
      'varying float valueVar;',
      'varying float opacityVar;',
      'void main () {',
      '  vec4 clr;',
      '  if (valueVar < 0.0) {',
      '    clr = minColor;',
      '  } else if (valueVar > steps) {',
      '    clr = maxColor;',
      '  } else {',
      '    float step;',
      '    if (stepped) {',
      '      step = floor(valueVar) + 0.5;',
      '      if (step > steps) {',
      '        step = steps - 0.5;',
      '      }',
      '    } else {',
      '      step = valueVar;',
      '    }',
      '    clr = texture2D(sampler2d, vec2(step / steps, 0.0));',
      '  }',
      '  gl_FragColor = vec4(clr.rgb, clr.a * opacityVar);',
      '}'
    ].join('\n'),
    shader = new vgl.shader(vgl.GL.FRAGMENT_SHADER);
    shader.setShaderSource(fragmentShaderSource);
    return shader;
  }

  /* Create the contours.  This calls the base class to generate the geometry,
   * color map, and other parameters.  The generated geoemtry is then loaded
   * into the various gl uniforms and buffers.
   */
  function createGLContours() {
    var contour = m_this.createContours(),
        numPts = contour.elements.length,
        colorTable = [],
        i, i3, j, j3,
        posBuf, opacityBuf, valueBuf, indicesBuf,
        geom = m_mapper.geometryData();

    m_minColorUniform.set([contour.minColor.r, contour.minColor.g,
                           contour.minColor.b, contour.minColor.a]);
    m_maxColorUniform.set([contour.maxColor.r, contour.maxColor.g,
                           contour.maxColor.b, contour.maxColor.a]);
    m_stepsUniform.set(contour.colorMap.length);
    m_steppedUniform.set(contour.stepped);
    for (i = 0; i < contour.colorMap.length; i += 1) {
      colorTable.push(contour.colorMap[i].r * 255);
      colorTable.push(contour.colorMap[i].g * 255);
      colorTable.push(contour.colorMap[i].b * 255);
      colorTable.push(contour.colorMap[i].a * 255);
    }
    m_texture.setColorTable(colorTable);
    contour.pos = geo.transform.transformCoordinates(
        m_this.gcs(), m_this.layer().map().gcs(), contour.pos, 3);
    posBuf     = getBuffer(geom, 'pos',     numPts * 3);
    opacityBuf = getBuffer(geom, 'opacity', numPts);
    valueBuf   = getBuffer(geom, 'value',   numPts);
    for (i = i3 = 0; i < numPts; i += 1, i3 += 3) {
      j = contour.elements[i];
      j3 = j * 3;
      posBuf[i3]     = contour.pos[j3];
      posBuf[i3 + 1] = contour.pos[j3 + 1];
      posBuf[i3 + 2] = contour.pos[j3 + 2];
      opacityBuf[i]  = contour.opacity[j];
      valueBuf[i]    = contour.value[j];
    }
    indicesBuf = geom.primitive(0).indices();
    if (!(indicesBuf instanceof Uint16Array) || indicesBuf.length !== numPts) {
      indicesBuf = new Uint16Array(numPts);
      geom.primitive(0).setIndices(indicesBuf);
    }
    geom.boundsDirty(true);
    m_mapper.modified();
    m_mapper.boundsDirtyTimestamp().modified();
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get a buffer for a geometry source.  If a buffer already exists and is
   * the correct size, return it.  Otherwise, allocate a new buffer; any data
   * in an old buffer is discarded.
   *
   * @param geom: the geometry to reference and modify.
   * @param srcName: the name of the source.
   * @param len: the number of elements for the array.
   * @returns {Float32Array}
   */
  ////////////////////////////////////////////////////////////////////////////
  function getBuffer(geom, srcName, len) {
    var src = geom.sourceByName(srcName), data;

    data = src.data();
    if (data instanceof Float32Array && data.length === len) {
      return data;
    }
    data = new Float32Array(len);
    src.setData(data);
    return data;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    var blend = vgl.blend(),
        prog = vgl.shaderProgram(),
        mat = vgl.material(),
        tex = vgl.lookupTable(),
        geom = vgl.geometryData(),
        modelViewUniform = new vgl.modelViewUniform('modelViewMatrix'),
        projectionUniform = new vgl.projectionUniform('projectionMatrix'),
        samplerUniform = new vgl.uniform(vgl.GL.INT, 'sampler2d'),
        vertexShader = createVertexShader(),
        fragmentShader = createFragmentShader(),
        posAttr = vgl.vertexAttribute('pos'),
        valueAttr = vgl.vertexAttribute('value'),
        opacityAttr = vgl.vertexAttribute('opacity'),
        sourcePositions = vgl.sourceDataP3fv({'name': 'pos'}),
        sourceValues = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.One, {'name': 'value'}),
        sourceOpacity = vgl.sourceDataAnyfv(
            1, vgl.vertexAttributeKeysIndexed.Two, {'name': 'opacity'}),
        primitive = new vgl.triangles();

    s_init.call(m_this, arg);
    m_mapper = vgl.mapper({dynamicDraw: m_dynamicDraw});

    prog.addVertexAttribute(posAttr, vgl.vertexAttributeKeys.Position);
    prog.addVertexAttribute(valueAttr, vgl.vertexAttributeKeysIndexed.One);
    prog.addVertexAttribute(opacityAttr, vgl.vertexAttributeKeysIndexed.Two);

    prog.addUniform(modelViewUniform);
    prog.addUniform(projectionUniform);
    m_minColorUniform = new vgl.uniform(vgl.GL.FLOAT_VEC4, 'minColor');
    prog.addUniform(m_minColorUniform);
    m_maxColorUniform = new vgl.uniform(vgl.GL.FLOAT_VEC4, 'maxColor');
    prog.addUniform(m_maxColorUniform);
    /* steps is always an integer, but it is more efficient if we use a float
     */
    m_stepsUniform = new vgl.uniform(vgl.GL.FLOAT, 'steps');
    prog.addUniform(m_stepsUniform);
    m_steppedUniform = new vgl.uniform(vgl.GL.BOOL, 'stepped');
    prog.addUniform(m_steppedUniform);

    prog.addShader(fragmentShader);
    prog.addShader(vertexShader);

    prog.addUniform(samplerUniform);
    tex.setTextureUnit(m_textureUnit);
    samplerUniform.set(m_textureUnit);

    m_material = mat;
    m_material.addAttribute(prog);
    m_material.addAttribute(blend);
    m_texture = tex;
    m_material.addAttribute(m_texture);

    m_actor = vgl.actor();
    m_actor.setMaterial(m_material);
    m_actor.setMapper(m_mapper);

    geom.addSource(sourcePositions);
    geom.addSource(sourceValues);
    geom.addSource(sourceOpacity);
    geom.addPrimitive(primitive);
    m_mapper.setGeometryData(geom);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    if (m_actor) {
      m_this.renderer().contextRenderer().removeActor(m_actor);
    }

    createGLContours();

    m_this.renderer().contextRenderer().addActor(m_actor);
    m_this.buildTime().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    s_update.call(m_this);

    if (m_this.dataTime().getMTime() >= m_this.buildTime().getMTime() ||
        m_this.updateTime().getMTime() <= m_this.getMTime()) {
      m_this._build();
    }

    m_actor.setVisible(m_this.visible());
    m_actor.material().setBinNumber(m_this.bin());
    m_this.updateTime().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Destroy
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.renderer().contextRenderer().removeActor(m_actor);
    s_exit();
  };

  this._init(arg);
  return this;
};

inherit(geo.gl.contourFeature, geo.contourFeature);

// Now register it
geo.registerFeature('vgl', 'contour', geo.gl.contourFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class vglRenderer
 *
 * @class
 * @extends geo.renderer
 * @param canvas
 * @returns {geo.gl.vglRenderer}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gl.vglRenderer = function (arg) {
  'use strict';

  if (!(this instanceof geo.gl.vglRenderer)) {
    return new geo.gl.vglRenderer(arg);
  }
  arg = arg || {};
  geo.renderer.call(this, arg);

  var m_this = this,
      m_contextRenderer = null,
      m_viewer = null,
      m_width = 0,
      m_height = 0,
      m_renderAnimFrameRef = null,
      s_init = this._init,
      s_exit = this._exit;

  /// TODO: Move this API to the base class
  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return width of the renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.width = function () {
    return m_width;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return height of the renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.height = function () {
    return m_height;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get context specific renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.contextRenderer = function () {
    return m_contextRenderer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get API used by the renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.api = function () {
    return 'vgl';
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function () {
    if (m_this.initialized()) {
      return m_this;
    }

    s_init.call(m_this);

    var canvas = $(document.createElement('canvas'));
    canvas.attr('class', 'webgl-canvas');
    $(m_this.layer().node().get(0)).append(canvas);
    m_viewer = vgl.viewer(canvas.get(0), arg.options);
    m_viewer.init();
    m_contextRenderer = m_viewer.renderWindow().activeRenderer();
    m_contextRenderer.setResetScene(false);

    if (m_viewer.renderWindow().renderers().length > 0) {
      m_contextRenderer.setLayer(m_viewer.renderWindow().renderers().length);
    }
    m_this.canvas(canvas);
    /* Initialize the size of the renderer */
    var map = m_this.layer().map(),
        mapSize = map.size();
    m_this._resize(0, 0, mapSize.width, mapSize.height);

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle resize event
   */
  ////////////////////////////////////////////////////////////////////////////
  this._resize = function (x, y, w, h) {
    var renderWindow = m_viewer.renderWindow();

    m_width = w;
    m_height = h;
    m_this.canvas().attr('width', w);
    m_this.canvas().attr('height', h);
    renderWindow.positionAndResize(x, y, w, h);

    m_this._updateRendererCamera();
    m_this._render();

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Render
   */
  ////////////////////////////////////////////////////////////////////////////
  this._render = function () {
    if (m_renderAnimFrameRef === null) {
      m_renderAnimFrameRef = window.requestAnimationFrame(function () {
        m_renderAnimFrameRef = null;
        m_viewer.render();
      });
    }
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Exit
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_viewer.exit();
    s_exit();
  };

  this._updateRendererCamera = function () {
    var renderWindow = m_viewer.renderWindow(),
        map = m_this.layer().map(),
        camera = map.camera(),
        rotation = map.rotation() || 0,
        view = camera.view,
        proj = camera.projectionMatrix;
    if (proj[15]) {
      /* we want positive z to be closer to the camera, but webGL does the
       * converse, so reverse the z coordinates. */
      proj = mat4.scale(geo.util.mat4AsArray(), proj, [1, 1, -1]);
    }
    /* A similar kluge as in the base camera class worldToDisplay4.  With this,
     * we can show z values from 0 to 1. */
    proj = mat4.translate(geo.util.mat4AsArray(), proj,
                          [0, 0, camera.constructor.bounds.far]);
    /* Check if the rotation is a multiple of 90 */
    var basis = Math.PI / 2,
        angle = rotation % basis,  // move to range (-pi/2, pi/2)
        ortho = (Math.min(Math.abs(angle), Math.abs(angle - basis)) < 0.00001);
    renderWindow.renderers().forEach(function (renderer) {
      var cam = renderer.camera();
      if (geo.util.compareArrays(view, cam.viewMatrix()) &&
          geo.util.compareArrays(proj, cam.projectionMatrix())) {
        return;
      }
      cam.setViewMatrix(view, true);
      cam.setProjectionMatrix(proj);
      if (proj[1] || proj[2] || proj[3] || proj[4] || proj[6] || proj[7] ||
          proj[8] || proj[9] || proj[11] || proj[15] !== 1 || !ortho ||
          (parseFloat(map.zoom().toFixed(6)) !==
           parseFloat(map.zoom().toFixed(0)))) {
        /* Don't align texels */
        cam.viewAlignment = function () {
          return null;
        };
      } else {
        /* Set information for texel alignment.  The rounding factors should
         * probably be divided by window.devicePixelRatio. */
        cam.viewAlignment = function () {
          var align = {
            roundx: 2.0 / camera.viewport.width,
            roundy: 2.0 / camera.viewport.height
          };
          align.dx = (camera.viewport.width % 2) ? align.roundx * 0.5 : 0;
          align.dy = (camera.viewport.height % 2) ? align.roundy * 0.5 : 0;
          return align;
        };
      }
    });
  };

  // Connect to interactor events
  // Connect to pan event
  m_this.layer().geoOn(geo.event.pan, function (evt) {
    void(evt);
    m_this._updateRendererCamera();
  });

  // Connect to zoom event
  m_this.layer().geoOn(geo.event.zoom, function (evt) {
    void(evt);
    m_this._updateRendererCamera();
  });

  // Connect to rotation event
  m_this.layer().geoOn(geo.event.rotate, function (evt) {
    void(evt);
    m_this._updateRendererCamera();
  });

  // Connect to parallelprojection event
  m_this.layer().geoOn(geo.event.parallelprojection, function (evt) {
    var vglRenderer = m_this.contextRenderer(),
        camera,
        layer = m_this.layer();

    if (evt.geo && evt.geo._triggeredBy !== layer) {
      if (!vglRenderer || !vglRenderer.camera()) {
        console.log('Parallel projection event triggered on unconnected VGL ' +
                    'renderer.');
      }
      camera = vglRenderer.camera();
      camera.setEnableParallelProjection(evt.parallelProjection);
      m_this._updateRendererCamera();
    }
  });

  return this;
};

inherit(geo.gl.vglRenderer, geo.renderer);

geo.registerRenderer('vgl', geo.gl.vglRenderer);

(function () {
  'use strict';

  var checkedWebGL;

  /**
   * Report if the vgl renderer is supported.  This is just a check if webGL is
   * supported and available.
   *
   * @returns {boolean} true if available.
   */
  geo.gl.vglRenderer.supported = function () {
    if (checkedWebGL === undefined) {
      /* This is extracted from what Modernizr uses. */
      var canvas, ctx, exts;
      try {
        canvas = document.createElement('canvas');
        ctx = (canvas.getContext('webgl') ||
               canvas.getContext('experimental-webgl'));
        exts = ctx.getSupportedExtensions();
        checkedWebGL = true;
      } catch (e) {
        console.error('No webGL support');
        checkedWebGL = false;
      }
      canvas = undefined;
      ctx = undefined;
      exts = undefined;
    }
    return checkedWebGL;
  };

  /**
   * If the vgl renderer is not supported, supply the name of a renderer that
   * should be used instead.  This asks for the null renderer.
   *
   * @returns null for the null renderer.
   */
  geo.gl.vglRenderer.fallback = function () {
    return null;
  };
})();

geo.gl.tileLayer = function () {
  'use strict';
  var m_this = this;

  this._drawTile = function (tile) {
    var bounds = this._tileBounds(tile),
        level = tile.index.level || 0,
        to = this._tileOffset(level);
    var ul = this.fromLocal(this.fromLevel({
      x: bounds.left - to.x, y: bounds.top - to.y
    }, level), 0);
    var lr = this.fromLocal(this.fromLevel({
      x: bounds.right - to.x, y: bounds.bottom - to.y
    }, level), 0);
    /* Use a small z-value for layering the tile levels. */
    tile.feature = m_this.createFeature(
      'plane', {drawOnAsyncResourceLoad: true})
      .origin([ul.x, lr.y, level * 1e-7])
      .upperLeft([ul.x, ul.y, level * 1e-7])
      .lowerRight([lr.x, lr.y, level * 1e-7])
      .style({image: tile._image});
    /* Don't respond to geo events */
    tile.feature.geoTrigger = undefined;
    tile.feature.gcs(m_this.map().gcs());
    tile.feature._update();
    m_this.draw();
  };

  /* Remove the tile feature. */
  this._remove = function (tile) {
    if (tile.feature) {
      m_this.deleteFeature(tile.feature);
      tile.feature = null;
      m_this.draw();
    }
  };

  /* These functions don't need to do anything. */
  this._getSubLayer = function () {};
  this._updateSubLayer = undefined;
};

geo.registerLayerAdjustment('vgl', 'tile', geo.gl.tileLayer);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of choroplethFeature
 *
 * @class
 * @extends geo.choroplethFeature
 * @returns {geo.gl.choroplethFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gl.choroplethFeature = function (arg) {
  'use strict';

  if (!(this instanceof geo.gl.choroplethFeature)) {
    return new geo.gl.choroplethFeature(arg);
  }
  arg = arg || {};
  geo.choroplethFeature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      m_gl_polygons = null,
      s_exit = this._exit,
      s_init = this._init,
      s_update = this._update;

  /* Create the choropleth.  This calls the base class to generate the contours,
   * into the various gl uniforms and buffers.
   */
  function createGLChoropleth() {
    return m_this.createChoropleth();
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    m_this.buildTime().modified();
    return (m_gl_polygons = createGLChoropleth());
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    s_update.call(m_this);
    if (m_this.dataTime().getMTime() >= m_this.buildTime().getMTime() ||
        m_this.updateTime().getMTime() <= m_this.getMTime()) {
      m_this._wipePolygons();
      m_this._build();
    }
    m_this.updateTime().modified();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Destroy Polygon Sub-Features
   */
  ////////////////////////////////////////////////////////////////////////////
  this._wipePolygons = function () {
    if (m_gl_polygons) {
      m_gl_polygons.map(function (polygon) {
        return polygon._exit();
      });
    }
    m_gl_polygons = null;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Destroy
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this._wipePolygons();
    s_exit();
  };

  this._init(arg);
  return this;
};

inherit(geo.gl.choroplethFeature, geo.choroplethFeature);

// Now register it
geo.registerFeature('vgl', 'choropleth', geo.gl.choroplethFeature);

/** @namespace */
geo.d3 = {};

(function () {
  'use strict';

  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz',
    strLength = 8;

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get a random string to use as a div ID
   * @returns {string}
   */
  //////////////////////////////////////////////////////////////////////////////
  geo.d3.uniqueID = function () {
    var strArray = [],
        i;
    strArray.length = strLength;
    for (i = 0; i < strLength; i += 1) {
      strArray[i] = chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return strArray.join('');
  };

  // event propagated when the d3 renderer rescales its group element
  geo.event.d3Rescale = 'geo_d3_rescale';
}());

//////////////////////////////////////////////////////////////////////////////
/**
 * D3 specific subclass of object which adds an id property for d3 selections
 * on groups of objects by class id.
 * @class
 * @extends geo.sceneObject
 */
//////////////////////////////////////////////////////////////////////////////

geo.d3.object = function (arg) {
  'use strict';
  // this is used to extend other geojs classes, so only generate
  // a new object when that is not the case... like if this === window
  if (!(this instanceof geo.object)) {
    return new geo.d3.object(arg);
  }
  geo.sceneObject.call(this);

  var m_id = 'd3-' + geo.d3.uniqueID(),
      s_exit = this._exit,
      m_this = this,
      s_draw = this.draw;

  this._d3id = function () {
    return m_id;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
  *  Returns a d3 selection for the feature elements
  */
  ////////////////////////////////////////////////////////////////////////////
  this.select = function () {
    return m_this.renderer().select(m_this._d3id());
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
  *  Redraw the object.
  */
  ////////////////////////////////////////////////////////////////////////////
  this.draw = function () {
    m_this._update();
    s_draw();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
  *  Removes the element from the svg and the renderer
  */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.renderer()._removeFeature(m_this._d3id());
    s_exit();
  };

  return this;
};

inherit(geo.d3.object, geo.sceneObject);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class d3Renderer
 *
 * @class
 * @extends geo.renderer
 * @returns {geo.d3.d3Renderer}
 */
//////////////////////////////////////////////////////////////////////////////
geo.d3.d3Renderer = function (arg) {
  'use strict';

  if (!(this instanceof geo.d3.d3Renderer)) {
    return new geo.d3.d3Renderer(arg);
  }
  geo.renderer.call(this, arg);

  var s_exit = this._exit;

  geo.d3.object.call(this, arg);

  arg = arg || {};

  var m_this = this,
      m_sticky = null,
      m_features = {},
      m_corners = null,
      m_width = null,
      m_height = null,
      m_diagonal = null,
      m_scale = 1,
      m_transform = {dx: 0, dy: 0, rx: 0, ry: 0, rotation: 0},
      m_svg = null,
      m_defs = null;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set attributes to a d3 selection.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function setAttrs(select, attrs) {
    var key;
    for (key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        select.attr(key, attrs[key]);
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Meta functions for converting from geojs styles to d3.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  this._convertColor = function (f, g) {
    f = geo.util.ensureFunction(f);
    g = g || function () { return true; };
    return function () {
      var c = 'none';
      if (g.apply(m_this, arguments)) {
        c = f.apply(m_this, arguments);
        if (c.hasOwnProperty('r') &&
            c.hasOwnProperty('g') &&
            c.hasOwnProperty('b')) {
          c = d3.rgb(255 * c.r, 255 * c.g, 255 * c.b);
        }
      }
      return c;
    };
  };

  this._convertPosition = function (f) {
    f = geo.util.ensureFunction(f);
    return function () {
      return m_this.layer().map().worldToDisplay(f.apply(m_this, arguments));
    };
  };

  this._convertScale = function (f) {
    f = geo.util.ensureFunction(f);
    return function () {
      return f.apply(m_this, arguments) / m_scale;
    };
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set styles to a d3 selection. Ignores unkown style keys.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function setStyles(select, styles) {
    /* jshint validthis:true */
    var key, k, f;
    function fillFunc() {
      if (styles.fill.apply(m_this, arguments)) {
        return null;
      } else {
        return 'none';
      }
    }
    function strokeFunc() {
      if (styles.stroke.apply(m_this, arguments)) {
        return null;
      } else {
        return 'none';
      }
    }
    for (key in styles) {
      if (styles.hasOwnProperty(key)) {
        f = null;
        k = null;
        if (key === 'strokeColor') {
          k = 'stroke';
          f = m_this._convertColor(styles[key], styles.stroke);
        } else if (key === 'stroke' && styles[key]) {
          k = 'stroke';
          f = strokeFunc;
        } else if (key === 'strokeWidth') {
          k = 'stroke-width';
          f = m_this._convertScale(styles[key]);
        } else if (key === 'strokeOpacity') {
          k = 'stroke-opacity';
          f = styles[key];
        } else if (key === 'fillColor') {
          k = 'fill';
          f = m_this._convertColor(styles[key], styles.fill);
        } else if (key === 'fill' && !styles.hasOwnProperty('fillColor')) {
          k = 'fill';
          f = fillFunc;
        } else if (key === 'fillOpacity') {
          k = 'fill-opacity';
          f = styles[key];
        }
        if (k) {
          select.style(k, f);
        }
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the svg group element associated with this renderer instance, or of a
   * group within the render instance.
   *
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function getGroup(parentId) {
    if (parentId) {
      return m_svg.select('.group-' + parentId);
    }
    return m_svg.select('.group-' + m_this._d3id());
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set the initial lat-lon coordinates of the map view.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  function initCorners() {
    var layer = m_this.layer(),
        map = layer.map(),
        width = map.size().width,
        height = map.size().height;

    m_width = width;
    m_height = height;
    if (!m_width || !m_height) {
      throw 'Map layer has size 0';
    }
    m_diagonal = Math.pow(width * width + height * height, 0.5);
    m_corners = {
      upperLeft: map.displayToGcs({'x': 0, 'y': 0}, null),
      lowerRight: map.displayToGcs({'x': width, 'y': height}, null),
      center: map.displayToGcs({'x': width / 2, 'y': height / 2}, null)
    };
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Set the translation, scale, and zoom for the current view.
   * @note rotation not yet supported
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  this._setTransform = function () {
    if (!m_corners) {
      initCorners();
    }

    if (!m_sticky) {
      return;
    }

    var layer = m_this.layer(),
        map = layer.map(),
        upperLeft = map.gcsToDisplay(m_corners.upperLeft, null),
        lowerRight = map.gcsToDisplay(m_corners.lowerRight, null),
        center = map.gcsToDisplay(m_corners.center, null),
        group = getGroup(),
        canvas = m_this.canvas(),
        dx, dy, scale, rotation, rx, ry;

    if (canvas.attr('scale') !== null) {
      scale = parseFloat(canvas.attr('scale') || 1);
      rx = (parseFloat(canvas.attr('dx') || 0) +
            parseFloat(canvas.attr('offsetx') || 0));
      ry = (parseFloat(canvas.attr('dy') || 0) +
            parseFloat(canvas.attr('offsety') || 0));
      rotation = parseFloat(canvas.attr('rotation') || 0);
      dx = scale * rx + map.size().width / 2;
      dy = scale * ry + map.size().height / 2;
    } else {
      scale = Math.sqrt(
        Math.pow(lowerRight.y - upperLeft.y, 2) +
        Math.pow(lowerRight.x - upperLeft.x, 2)) / m_diagonal;
      // calculate the translation
      rotation = map.rotation();
      rx = -m_width / 2;
      ry = -m_height / 2;
      dx = scale * rx + center.x;
      dy = scale * ry + center.y;
    }

    // set the group transform property
    var transform = 'matrix(' + [scale, 0, 0, scale, dx, dy].join() + ')';
    if (rotation) {
      transform += ' rotate(' + [
        rotation * 180 / Math.PI, -rx, -ry].join() + ')';
    }
    group.attr('transform', transform);

    // set internal variables
    m_scale = scale;
    m_transform.dx = dx;
    m_transform.dy = dy;
    m_transform.rx = rx;
    m_transform.ry = ry;
    m_transform.rotation = rotation;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert from screen pixel coordinates to the local coordinate system
   * in the SVG group element taking into account the transform.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  this.baseToLocal = function (pt) {
    pt = {
      x: (pt.x - m_transform.dx) / m_scale,
      y: (pt.y - m_transform.dy) / m_scale
    };
    if (m_transform.rotation) {
      var sinr = Math.sin(-m_transform.rotation),
          cosr = Math.cos(-m_transform.rotation);
      var x = pt.x + m_transform.rx, y = pt.y + m_transform.ry;
      pt = {
        x: x * cosr - y * sinr - m_transform.rx,
        y: x * sinr + y * cosr - m_transform.ry
      };
    }
    return pt;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Convert from the local coordinate system in the SVG group element
   * to screen pixel coordinates.
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  this.localToBase = function (pt) {
    if (m_transform.rotation) {
      var sinr = Math.sin(m_transform.rotation),
          cosr = Math.cos(m_transform.rotation);
      var x = pt.x + m_transform.rx, y = pt.y + m_transform.ry;
      pt = {
        x: x * cosr - y * sinr - m_transform.rx,
        y: x * sinr + y * cosr - m_transform.ry
      };
    }
    pt = {
      x: pt.x * m_scale + m_transform.dx,
      y: pt.y * m_scale + m_transform.dy
    };
    return pt;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    if (!m_this.canvas()) {
      var canvas;
      arg.widget = arg.widget || false;

      if ('d3Parent' in arg) {
        m_svg = d3.select(arg.d3Parent).append('svg');
      } else {
        m_svg = d3.select(m_this.layer().node().get(0)).append('svg');
      }

      // create a global svg definitions element
      m_defs = m_svg.append('defs');

      var shadow = m_defs
        .append('filter')
          .attr('id', 'geo-highlight')
          .attr('x', '-100%')
          .attr('y', '-100%')
          .attr('width', '300%')
          .attr('height', '300%');
      shadow
        .append('feMorphology')
          .attr('operator', 'dilate')
          .attr('radius', 2)
          .attr('in', 'SourceAlpha')
          .attr('result', 'dilateOut');
      shadow
        .append('feGaussianBlur')
          .attr('stdDeviation', 5)
          .attr('in', 'dilateOut')
          .attr('result', 'blurOut');
      shadow
        .append('feColorMatrix')
          .attr('type', 'matrix')
          .attr('values', '-1 0 0 0 1  0 -1 0 0 1  0 0 -1 0 1  0 0 0 1 0')
          .attr('in', 'blurOut')
          .attr('result', 'invertOut');
      shadow
        .append('feBlend')
          .attr('in', 'SourceGraphic')
          .attr('in2', 'invertOut')
          .attr('mode', 'normal');

      if (!arg.widget) {
        canvas = m_svg.append('g');
      }

      shadow = m_defs.append('filter')
          .attr('id', 'geo-blur')
          .attr('x', '-100%')
          .attr('y', '-100%')
          .attr('width', '300%')
          .attr('height', '300%');

      shadow
        .append('feGaussianBlur')
          .attr('stdDeviation', 20)
          .attr('in', 'SourceGraphic');

      m_sticky = m_this.layer().sticky();
      m_svg.attr('class', m_this._d3id());
      m_svg.attr('width', m_this.layer().node().width());
      m_svg.attr('height', m_this.layer().node().height());

      if (!arg.widget) {
        canvas.attr('class', 'group-' + m_this._d3id());

        m_this.canvas(canvas);
      } else {
        m_this.canvas(m_svg);
      }
    }
    m_this._setTransform();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get API used by the renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this.api = function () {
    return 'd3';
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the current scaling factor to build features that shouldn't
   * change size during zooms.  For example:
   *
   *  selection.append('circle')
   *    .attr('r', r0 / renderer.scaleFactor());
   *
   * This will create a circle element with radius r0 independent of the
   * current zoom level.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.scaleFactor = function () {
    return m_scale;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle resize event
   */
  ////////////////////////////////////////////////////////////////////////////
  this._resize = function (x, y, w, h) {
    if (!m_corners) {
      initCorners();
    }
    m_svg.attr('width', w);
    m_svg.attr('height', h);
    m_this._setTransform();
    m_this.layer().geoTrigger(geo.event.d3Rescale, { scale: m_scale }, true);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update noop for geo.d3.object api.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Exit
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_features = {};
    m_this.canvas().remove();
    m_svg.remove();
    m_svg = undefined;
    m_defs.remove();
    m_defs = undefined;
    s_exit();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the definitions dom element for the layer
   * @protected
   */
  ////////////////////////////////////////////////////////////////////////////
  this._definitions = function () {
    return m_defs;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create a new feature element from an object that describes the feature
   * attributes.  To be called from feature classes only.
   *
   * Input:
   *  {
   *    id:         A unique string identifying the feature.
   *    data:       Array of data objects used in a d3 data method.
   *    index:      A function that returns a unique id for each data element.
   *    style:      An object containing element CSS styles.
   *    attributes: An object containing element attributes.
   *    classes:    An array of classes to add to the elements.
   *    append:     The element type as used in d3 append methods.
   *    parentId:   If set, the group ID of the parent element.
   *  }
   */
  ////////////////////////////////////////////////////////////////////////////
  this._drawFeatures = function (arg) {
    m_features[arg.id] = {
      data: arg.data,
      index: arg.dataIndex,
      style: arg.style,
      attributes: arg.attributes,
      classes: arg.classes,
      append: arg.append,
      parentId: arg.parentId
    };
    return m_this.__render(arg.id, arg.parentId);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
  *  Updates a feature by performing a d3 data join.  If no input id is
  *  provided then this method will update all features.
  */
  ////////////////////////////////////////////////////////////////////////////
  this.__render = function (id, parentId) {
    var key;
    if (id === undefined) {
      for (key in m_features) {
        if (m_features.hasOwnProperty(key)) {
          m_this.__render(key);
        }
      }
      return m_this;
    }
    var data = m_features[id].data,
        index = m_features[id].index,
        style = m_features[id].style,
        attributes = m_features[id].attributes,
        classes = m_features[id].classes,
        append = m_features[id].append,
        selection = m_this.select(id, parentId).data(data, index);
    selection.enter().append(append);
    selection.exit().remove();
    setAttrs(selection, attributes);
    selection.attr('class', classes.concat([id]).join(' '));
    setStyles(selection, style);
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
  *  Returns a d3 selection for the given feature id.
  */
  ////////////////////////////////////////////////////////////////////////////
  this.select = function (id, parentId) {
    return getGroup(parentId).selectAll('.' + id);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
  *  Removes a feature from the layer.
  */
  ////////////////////////////////////////////////////////////////////////////
  this._removeFeature = function (id) {
    m_this.select(id).remove();
    delete m_features[id];
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
  *  Override draw method to do nothing.
  */
  ////////////////////////////////////////////////////////////////////////////
  this.draw = function () {
  };

  // connect to pan event
  this.layer().geoOn(geo.event.pan, m_this._setTransform);

  // connect to rotate event
  this.layer().geoOn(geo.event.rotate, m_this._setTransform);

  // connect to zoom event
  this.layer().geoOn(geo.event.zoom, function () {
    m_this._setTransform();
    m_this.__render();
    m_this.layer().geoTrigger(geo.event.d3Rescale, { scale: m_scale }, true);
  });

  this.layer().geoOn(geo.event.resize, function (event) {
    m_this._resize(event.x, event.y, event.width, event.height);
  });

  this._init(arg);
  return this;
};

inherit(geo.d3.d3Renderer, geo.renderer);

geo.registerRenderer('d3', geo.d3.d3Renderer);

(function () {
  'use strict';

  /**
   * Report if the d3 renderer is supported.  This is just a check if d3 is
   * available.
   *
   * @returns {boolean} true if available.
   */
  geo.d3.d3Renderer.supported = function () {
    return (typeof d3 !== 'undefined');
  };

  /**
   * If the d3 renderer is not supported, supply the name of a renderer that
   * should be used instead.  This asks for the null renderer.
   *
   * @returns null for the null renderer.
   */
  geo.d3.d3Renderer.fallback = function () {
    return null;
  };
})();

geo.d3.tileLayer = function () {
  'use strict';
  var m_this = this,
      s_update = this._update,
      s_init = this._init;

  this._drawTile = function (tile) {
    var bounds = m_this._tileBounds(tile),
        parentNode = m_this._getSubLayer(tile.index.level),
        offsetx = parseInt(parentNode.attr('offsetx') || 0),
        offsety = parseInt(parentNode.attr('offsety') || 0);
    tile.feature = m_this.createFeature(
      'plane', {drawOnAsyncResourceLoad: true})
      .origin([bounds.left - offsetx, bounds.top - offsety])
      .upperLeft([bounds.left - offsetx, bounds.top - offsety])
      .lowerRight([bounds.right - offsetx, bounds.bottom - offsety])
      .style({
        image: tile._url,
        opacity: 1,
        reference: tile.toString(),
        parentId: parentNode.attr('data-tile-layer-id')
      });
    /* Don't respond to geo events */
    tile.feature.geoTrigger = undefined;
    tile.feature._update();
    m_this.draw();
  };

  /**
   * Return the DOM element containing a level specific
   * layer.  This will create the element if it doesn't
   * already exist.
   * @param {number} level The zoom level of the layer to fetch
   * @return {DOM}
   */
  this._getSubLayer = function (level) {
    var node = m_this.canvas().select(
        'g[data-tile-layer="' + level.toFixed() + '"]');
    if (node.empty()) {
      node = m_this.canvas().append('g');
      var id = geo.d3.uniqueID();
      node.classed('group-' + id, true);
      node.classed('geo-tile-layer', true);
      node.attr('data-tile-layer', level.toFixed());
      node.attr('data-tile-layer-id', id);
    }
    return node;
  };

  /**
   * Set sublayer transforms to align them with the given zoom level.
   * @param {number} level The target zoom level
   * @param {object} view The view bounds.  The top and left are used to
   *                      adjust the offset of tile layers.
   * @return {object} the x and y offsets for the current level.
   */
  this._updateSubLayers = function (level, view) {
    var canvas = m_this.canvas(),
        lastlevel = parseInt(canvas.attr('lastlevel')),
        lastx = parseInt(canvas.attr('lastoffsetx') || 0),
        lasty = parseInt(canvas.attr('lastoffsety') || 0);
    if (lastlevel === level && Math.abs(lastx - view.left) < 65536 &&
        Math.abs(lasty - view.top) < 65536) {
      return {x: lastx, y: lasty};
    }
    var to = this._tileOffset(level),
        x = parseInt(view.left) + to.x,
        y = parseInt(view.top) + to.y;
    var tileCache = m_this.cache._cache;
    $.each(canvas.selectAll('.geo-tile-layer')[0], function (idx, el) {
      var layer = parseInt($(el).attr('data-tile-layer')),
          scale = Math.pow(2, level - layer);
      el = m_this._getSubLayer(layer);
      el.attr('transform', 'matrix(' + [scale, 0, 0, scale, 0, 0].join() + ')');
      /* x and y are the upper left of our view.  This is the zero-point for
       * offsets at the current level.  Other tile layers' offsets are scaled
       * by appropriate factors of 2.  We need to shift the tiles of each
       * layer by the appropriate amount (computed as dx and dy). */
      var layerx = parseInt(x / Math.pow(2, level - layer)),
          layery = parseInt(y / Math.pow(2, level - layer)),
          dx = layerx - parseInt(el.attr('offsetx') || 0),
          dy = layery - parseInt(el.attr('offsety') || 0);
      el.attr({offsetx: layerx, offsety: layery});
      /* We have to update the values stored in the tile features, too,
       * otherwise when d3 regenerates these features, the offsets will be
       * wrong. */
      $.each(tileCache, function (idx, tile) {
        if (tile._index.level === layer && tile.feature) {
          var f = tile.feature,
              o = f.origin(), ul = f.upperLeft(), lr = f.lowerRight();
          f.origin([o[0] - dx, o[1] - dy, o[2]]);
          f.upperLeft([ul[0] - dx, ul[1] - dy, ul[2]]);
          f.lowerRight([lr[0] - dx, lr[1] - dy, lr[2]]);
          f._update();
        }
      });
    });
    canvas.attr({lastoffsetx: x, lastoffsety: y, lastlevel: level});
    return {x: x, y: y};
  };

  /* Initialize the tile layer.  This creates a series of sublayers so that
   * the different layers will stack in the proper order.
   */
  this._init = function () {
    var sublayer;

    s_init.apply(m_this, arguments);
    for (sublayer = 0; sublayer <= m_this._options.maxLevel; sublayer += 1) {
      m_this._getSubLayer(sublayer);
    }
  };

  /* When update is called, apply the transform to our renderer. */
  this._update = function () {
    s_update.apply(m_this, arguments);
    m_this.renderer()._setTransform();
  };

  /* Remove both the tile feature and an internal image element. */
  this._remove = function (tile) {
    if (tile.feature) {
      m_this.deleteFeature(tile.feature);
      tile.feature = null;
    }
    if (tile.image) {
      $(tile.image).remove();
    }
  };
};

geo.registerLayerAdjustment('d3', 'tile', geo.d3.tileLayer);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of pointFeature
 *
 * @class
 * @extends geo.pointFeature
 * @extends geo.d3.object
 * @returns {geo.d3.pointFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.d3.pointFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.d3.pointFeature)) {
    return new geo.d3.pointFeature(arg);
  }
  arg = arg || {};
  geo.pointFeature.call(this, arg);
  geo.d3.object.call(this);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_init = this._init,
      s_update = this._update,
      m_buildTime = geo.timestamp(),
      m_style = {},
      m_sticky;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);
    m_sticky = m_this.layer().sticky();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    var data = m_this.data(),
        s_style = m_this.style.get(),
        m_renderer = m_this.renderer(),
        pos_func = m_this.position();

    // call super-method
    s_update.call(m_this);

    // default to empty data array
    if (!data) { data = []; }

    // fill in d3 renderer style object defaults
    m_style.id = m_this._d3id();
    m_style.data = data;
    m_style.append = 'circle';
    m_style.attributes = {
      r: m_renderer._convertScale(s_style.radius),
      cx: function (d) {
        return m_this.featureGcsToDisplay(pos_func(d)).x;
      },
      cy: function (d) {
        return m_this.featureGcsToDisplay(pos_func(d)).y;
      }
    };
    m_style.style = s_style;
    m_style.classes = ['d3PointFeature'];

    // pass to renderer to draw
    m_this.renderer()._drawFeatures(m_style);

    // update time stamps
    m_buildTime.modified();
    m_this.updateTime().modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    s_update.call(m_this);

    if (m_this.getMTime() >= m_buildTime.getMTime()) {
      m_this._build();
    }

    return m_this;
  };

  this._init(arg);
  return this;
};

inherit(geo.d3.pointFeature, geo.pointFeature);

// Now register it
geo.registerFeature('d3', 'point', geo.d3.pointFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class lineFeature
 *
 * @class
 * @extends geo.lineFeature
 * @extends geo.d3.object
 * @returns {geo.d3.lineFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.d3.lineFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.d3.lineFeature)) {
    return new geo.d3.lineFeature(arg);
  }
  arg = arg || {};
  geo.lineFeature.call(this, arg);
  geo.d3.object.call(this);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_init = this._init,
      m_buildTime = geo.timestamp(),
      s_update = this._update;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    var data = m_this.data() || [],
        s_style = m_this.style(),
        m_renderer = m_this.renderer(),
        pos_func = m_this.position(),
        line = d3.svg.line()
                .x(function (d) { return m_this.featureGcsToDisplay(d).x; })
                .y(function (d) { return m_this.featureGcsToDisplay(d).y; });

    s_update.call(m_this);
    s_style.fill = function () { return false; };

    data.forEach(function (item, idx) {
      var m_style;
      var ln = m_this.line()(item, idx);

      var style = {}, key;
      function wrapStyle(func) {
        if (geo.util.isFunction(func)) {
          return function () {
            return func(ln[0], 0, item, idx);
          };
        } else {
          return func;
        }
      }
      for (key in s_style) {
        if (s_style.hasOwnProperty(key)) {
          style[key] = wrapStyle(s_style[key]);
        }
      }

      // item is an object representing a single line
      // m_this.line()(item) is an array of coordinates
      m_style = {
        data: [ln.map(function (d, i) { return pos_func(d, i, item, idx);})],
        append: 'path',
        attributes: {
          d: line
        },
        id: m_this._d3id() + idx,
        classes: ['d3LineFeature', 'd3SubLine-' + idx],
        style: style
      };

      m_renderer._drawFeatures(m_style);
    });

    m_buildTime.modified();
    m_this.updateTime().modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    s_update.call(m_this);

    if (m_this.getMTime() >= m_buildTime.getMTime()) {
      m_this._build();
    }

    return m_this;
  };

  this._init(arg);
  return this;
};

inherit(geo.d3.lineFeature, geo.lineFeature);

geo.registerFeature('d3', 'line', geo.d3.lineFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class pathFeature
 *
 * @class
 * @extends geo.pathFeature
 * @extends geo.d3.object
 * @returns {geo.d3.pathFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.d3.pathFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.d3.pathFeature)) {
    return new geo.d3.pathFeature(arg);
  }
  arg = arg || {};
  geo.pathFeature.call(this, arg);
  geo.d3.object.call(this);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_init = this._init,
      m_buildTime = geo.timestamp(),
      s_update = this._update,
      m_style = {};

  m_style.style = {};

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    var data = m_this.data() || [],
        s_style = m_this.style(),
        tmp, diag;
    s_update.call(m_this);

    diag = function (d) {
        var p = {
          source: d.source,
          target: d.target
        };
        return d3.svg.diagonal()(p);
      };
    tmp = [];
    data.forEach(function (d, i) {
      var src, trg;
      if (i < data.length - 1) {
        src = d;
        trg = data[i + 1];
        tmp.push({
          source: m_this.featureGcsToDisplay(src),
          target: m_this.featureGcsToDisplay(trg)
        });
      }
    });
    m_style.data = tmp;
    m_style.attributes = {
      d: diag
    };

    m_style.id = m_this._d3id();
    m_style.append = 'path';
    m_style.classes = ['d3PathFeature'];
    m_style.style = $.extend({
      'fill': function () { return false; },
      'fillColor': function () { return { r: 0, g: 0, b: 0 }; }
    }, s_style);

    m_this.renderer()._drawFeatures(m_style);

    m_buildTime.modified();
    m_this.updateTime().modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   *
   * @override
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    s_update.call(m_this);

    if (m_this.dataTime().getMTime() >= m_buildTime.getMTime()) {
      m_this._build();
    }

    return m_this;
  };

  this._init(arg);
  return this;
};

inherit(geo.d3.pathFeature, geo.pathFeature);

geo.registerFeature('d3', 'path', geo.d3.pathFeature);

/**
 * @class
 * @extends geo.graphFeature
 */
geo.d3.graphFeature = function (arg) {
  'use strict';

  var m_this = this;

  if (!(this instanceof geo.d3.graphFeature)) {
    return new geo.d3.graphFeature(arg);
  }
  geo.graphFeature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
  *  Returns a d3 selection for the graph elements
  */
  ////////////////////////////////////////////////////////////////////////////
  this.select = function () {
    var renderer = m_this.renderer(),
        selection = {},
        node = m_this.nodeFeature(),
        links = m_this.linkFeatures();
    selection.nodes = renderer.select(node._d3id());
    selection.links = links.map(function (link) {
      return renderer.select(link._d3id());
    });
    return selection;
  };

  return this;
};

inherit(geo.d3.graphFeature, geo.graphFeature);

geo.registerFeature('d3', 'graph', geo.d3.graphFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a plane feature given a lower left corner point
 * and and upper right corner point
 *
 * @class
 * @extends geo.planeFeature
 * @param lowerleft
 * @param upperright
 * @returns {geo.d3.planeFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.d3.planeFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.d3.planeFeature)) {
    return new geo.d3.planeFeature(arg);
  }
  geo.planeFeature.call(this, arg);
  geo.d3.object.call(this);

  var m_this = this,
      m_style = {},
      s_update = this._update,
      s_init = this._init,
      m_buildTime = geo.timestamp();

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Normalize a coordinate as an object {x: ..., y: ...}
   *
   * @private
   * @returns {Object}
   */
  //////////////////////////////////////////////////////////////////////////////
  function normalize(pt) {
    if (Array.isArray(pt)) {
      return {
        x: pt[0],
        y: pt[1]
      };
    }
    return pt;
  }

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Build the feature object and pass to the renderer for drawing.
   *
   * @private
   * @returns {geo.d3.planeFeature}
   */
  //////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    var ul = normalize(m_this.upperLeft()),
        lr = normalize(m_this.lowerRight()),
        renderer = m_this.renderer(),
        s = m_this.style();

    delete s.fill_color;
    delete s.color;
    delete s.opacity;
    /*
    if (!s.screenCoordinates) {
      origin = renderer.layer().map().worldToDisplay(origin);
      ul = renderer.layer().map().worldToDisplay(ul);
      lr = renderer.layer().map().worldToDisplay(lr);
    }
    */
    m_style.id = m_this._d3id();
    m_style.style = s;
    m_style.attributes = {
      x: ul.x,
      y: ul.y,
      width: Math.abs(lr.x - ul.x),
      height: Math.abs(lr.y - ul.y),
      reference: s.reference
    };
    if (s.image) {
      m_style.append = 'image';
      m_style.attributes['xlink:href'] = s.image;
    } else {
      m_style.append = 'rect';
    }
    m_style.data = [0];
    m_style.classes = ['d3PlaneFeature'];
    if (s.parentId) {
      m_style.parentId = s.parentId;
    }

    renderer._drawFeatures(m_style);
    m_buildTime.modified();
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Redraw the plane feature if necessary.
   *
   * @private
   * @returns {geo.d3.planeFeature}
   */
  //////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    s_update.call(m_this);

    if (m_this.dataTime().getMTime() >= m_buildTime.getMTime()) {
      m_this._build();
    }
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Initializes the plane feature style (over-riding the parent default).
   *
   * @private
   * @returns {geo.d3.planeFeature}
   */
  //////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg || {});
    m_this.style({
      stroke: function () { return false; },
      fill: function () { return true; },
      fillColor: function () { return {r: 0.3, g: 0.3, b: 0.3}; },
      fillOpacity: function () { return 0.5; }
    });
    return m_this;
  };

  this._init();
  return this;
};

inherit(geo.d3.planeFeature, geo.planeFeature);

geo.registerFeature('d3', 'plane', geo.d3.planeFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of vectorFeature
 *
 * @class
 * @extends geo.vectorFeature
 * @extends geo.d3.object
 * @returns {geo.d3.vectorFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.d3.vectorFeature = function (arg) {
  'use strict';
  if (!(this instanceof geo.d3.vectorFeature)) {
    return new geo.d3.vectorFeature(arg);
  }
  arg = arg || {};
  geo.vectorFeature.call(this, arg);
  geo.d3.object.call(this);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      s_init = this._init,
      s_exit = this._exit,
      s_update = this._update,
      m_buildTime = geo.timestamp(),
      m_style = {},
      m_sticky;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Generate a unique ID for a marker definition
   * @private
   * @param {object} d Unused datum (for d3 compat)
   * @param {number} i The marker index
   */
  ////////////////////////////////////////////////////////////////////////////
  function markerID(d, i) {
    return m_this._d3id() + '_marker_' + i;
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Add marker styles for vector arrows.
   * @private
   * @param {object[]} data The vector data array
   * @param {function} stroke The stroke accessor
   * @param {function} opacity The opacity accessor
   */
  ////////////////////////////////////////////////////////////////////////////
  function updateMarkers(data, stroke, opacity) {

    var renderer = m_this.renderer();
    var sel = m_this.renderer()._definitions()
      .selectAll('marker.geo-vector')
        .data(data);
    sel.enter()
      .append('marker')
        .attr('id', markerID)
        .attr('class', 'geo-vector')
        .attr('viewBox', '0 0 10 10')
        .attr('refX', '1')
        .attr('refY', '5')
        .attr('markerWidth', '5')
        .attr('markerHeight', '5')
        .attr('orient', 'auto')
        .append('path')
          .attr('d', 'M 0 0 L 10 5 L 0 10 z');

    sel.exit().remove();

    sel.style('stroke', renderer._convertColor(stroke))
      .style('fill', renderer._convertColor(stroke))
      .style('opacity', opacity);
  }

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   * @protected
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);
    m_sticky = m_this.layer().sticky();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Build
   * @protected
   */
  ////////////////////////////////////////////////////////////////////////////
  this._build = function () {
    var data = m_this.data(),
        s_style = m_this.style.get(),
        m_renderer = m_this.renderer(),
        orig_func = m_this.origin(),
        size_func = m_this.delta(),
        cache = [],
        scale = m_this.style('scale'),
        max = Number.NEGATIVE_INFINITY;

    // call super-method
    s_update.call(m_this);

    // default to empty data array
    if (!data) { data = []; }

    // cache the georeferencing
    cache = data.map(function (d, i) {
      var origin = m_this.featureGcsToDisplay(orig_func(d, i)),
          delta = size_func(d, i);
      max = Math.max(max, delta.x * delta.x + delta.y * delta.y);
      return {
        x1: origin.x,
        y1: origin.y,
        dx: delta.x,
        dy: -delta.y
      };
    });

    max = Math.sqrt(max);
    if (!scale) {
      scale = 75 / max;
    }

    function getScale() {
      return scale / m_renderer.scaleFactor();
    }

    // fill in d3 renderer style object defaults
    m_style.id = m_this._d3id();
    m_style.data = data;
    m_style.append = 'line';
    m_style.attributes = {
      x1: function (d, i) {
        return cache[i].x1;
      },
      y1: function (d, i) {
        return cache[i].y1;
      },
      x2: function (d, i) {
        return cache[i].x1 + getScale() * cache[i].dx;
      },
      y2: function (d, i) {
        return cache[i].y1 + getScale() * cache[i].dy;
      },
      'marker-end': function (d, i) {
        return 'url(#' + markerID(d, i) + ')';
      }
    };
    m_style.style = {
      stroke: function () { return true; },
      strokeColor: s_style.strokeColor,
      strokeWidth: s_style.strokeWidth,
      strokeOpacity: s_style.strokeOpacity
    };
    m_style.classes = ['d3VectorFeature'];

    // Add markers to the defition list
    updateMarkers(data, s_style.strokeColor, s_style.strokeOpacity);

    // pass to renderer to draw
    m_this.renderer()._drawFeatures(m_style);

    // update time stamps
    m_buildTime.modified();
    m_this.updateTime().modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Update
   * @protected
   */
  ////////////////////////////////////////////////////////////////////////////
  this._update = function () {
    s_update.call(m_this);

    if (m_this.getMTime() >= m_buildTime.getMTime()) {
      m_this._build();
    } else {
      updateMarkers(
        m_style.data,
        m_style.style.strokeColor,
        m_style.style.strokeOpacity
      );
    }

    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Exit
   * @protected
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    s_exit.call(m_this);
    m_style = {};
    updateMarkers([], null, null);
  };

  this._init(arg);
  return this;
};

inherit(geo.d3.vectorFeature, geo.vectorFeature);

// Now register it
geo.registerFeature('d3', 'vector', geo.d3.vectorFeature);

//////////////////////////////////////////////////////////////////////////////
/**
 * @namespace
 */
//////////////////////////////////////////////////////////////////////////////
geo.gui = {};

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class uiLayer
 *
 * @class
 * @extends {geo.layer}
 * @returns {geo.gui.uiLayer}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gui.uiLayer = function (arg) {
  'use strict';

  // The widget stays fixed on the screen.
  arg.renderer = 'dom';
  arg.sticky = false;

  if (!(this instanceof geo.gui.uiLayer)) {
    return new geo.gui.uiLayer(arg);
  }
  geo.layer.call(this, arg);

  var m_this = this,
      s_exit = this._exit;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create a new ui control
   *
   * @returns {geo.gui.Widget} Will return a new control widget
   */
  ////////////////////////////////////////////////////////////////////////////
  this.createWidget = function (widgetName, arg) {
    var newWidget = geo.createWidget(widgetName, m_this, arg);

    // We only want top level widgets to be a child of the uiLayer
    if (!(arg && 'parent' in arg)) {
      m_this.addChild(newWidget);
    }

    newWidget._init(arg);
    m_this.modified();
    return newWidget;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Delete a ui control
   */
  ////////////////////////////////////////////////////////////////////////////
  this.deleteWidget = function (widget) {
    widget._exit();
    m_this.removeChild(widget);
    m_this.modified();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Free memory and destroy the layer.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_this.children().forEach(function (child) {
      m_this.deleteWidget(child);
    });
    s_exit();
  };
};

inherit(geo.gui.uiLayer, geo.layer);

geo.registerLayer('ui', geo.gui.uiLayer);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class widget
 *
 * @class
 * @extends {geo.sceneObject}
 * @returns {geo.gui.widget}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gui.widget = function (arg) {
  'use strict';
  if (!(this instanceof geo.gui.widget)) {
    return new geo.gui.widget(arg);
  }
  geo.sceneObject.call(this, arg);

  var m_this = this,
      s_exit = this._exit,
      m_layer = arg.layer,
      m_canvas = null;

  arg.position = arg.position === undefined ? { left: 0, top: 0 } : arg.position;

  if (arg.parent !== undefined && !(arg.parent instanceof geo.gui.widget)) {
    throw 'Parent must be of type geo.gui.widget';
  }

  this._init = function () {
    m_this.modified();
  };

  this._exit = function () {
    m_this.children().forEach(function (child) {
      m_this._deleteFeature(child);
    });

    m_this.layer().geoOff(geo.event.pan, m_this.repositionEvent);
    m_this.parentCanvas().removeChild(m_this.canvas());
    s_exit();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create feature give a name
   *
   * @returns {geo.Feature} Will return a new feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this._createFeature = function (featureName, arg) {

    var newFeature = geo.createFeature(
      featureName, m_this, m_this.renderer(), arg);

    m_this.addChild(newFeature);
    m_this.modified();
    return newFeature;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Delete feature
   */
  ////////////////////////////////////////////////////////////////////////////
  this._deleteFeature = function (feature) {
    m_this.removeChild(feature);
    feature._exit();
    return m_this;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Return the layer associated with this widget.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.layer = function () {
    return m_layer;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Create the canvas this widget will operate on.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._createCanvas = function () {
    throw 'Must be defined in derived classes';
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set the canvas for the widget
   */
  ////////////////////////////////////////////////////////////////////////////
  this.canvas = function (val) {
    if (val === undefined) {
      return m_canvas;
    } else {
      m_canvas = val;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Appends a child to the widget
   * The widget determines how to append itself to a parent, the parent can either
   * be another widget, or the UI Layer.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._appendChild = function () {
    m_this.parentCanvas().appendChild(m_this.canvas());
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get the parent canvas (top level widgets define their layer as their parent canvas)
   */
  ////////////////////////////////////////////////////////////////////////////
  this.parentCanvas = function () {
    if (m_this.parent === undefined) {
      return m_this.layer().canvas();
    } else {
      return m_this.parent().canvas();
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Gets the CSS positioning that a widget should be placed at.
   * { top: 0, left: 0 } by default.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.position = function () {
    var position;

    if (arg &&
        arg.hasOwnProperty('position') &&
        arg.position.hasOwnProperty('x') &&
        arg.position.hasOwnProperty('y')) {

      position = m_this.layer().map().gcsToDisplay(arg.position);

      return {
        left: position.x,
        top: position.y
      };
    }

    return arg.position;
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Repositions a widget based on the argument passed, or calling position on
   * the widget itself.
   * @param {object} position A position with the form:
   * { top: m, left: n }
   */
  ////////////////////////////////////////////////////////////////////////////
  this.reposition = function (position) {
    position = position || m_this.position();
    m_this.canvas().style.position = 'absolute';

    for (var cssAttr in position) {
      if (position.hasOwnProperty(cssAttr)) {
        m_this.canvas().style[cssAttr] = position[cssAttr] + 'px';
      }
    }
  };

  this.repositionEvent = function () {
    return m_this.reposition();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Determines whether or not the widget is completely within the viewport.
   */
  ////////////////////////////////////////////////////////////////////////////
  this.isInViewport = function () {
    var position = m_this.position();
    var layer = m_this.layer();

    return ((position.left >= 0 && position.top >= 0) &&
            (position.left <= layer.width() && position.top <= layer.height()));
  };

  if (arg &&
      arg.hasOwnProperty('position') &&
      arg.position.hasOwnProperty('x') &&
      arg.position.hasOwnProperty('y')) {
    this.layer().geoOn(geo.event.pan, m_this.repositionEvent);
  }
};
inherit(geo.gui.widget, geo.sceneObject);

geo.gui.domWidget = function (arg) {
  'use strict';
  if (!(this instanceof geo.gui.domWidget)) {
    return new geo.gui.domWidget(arg);
  }

  geo.gui.widget.call(this, arg);

  var m_this = this,
      m_default_canvas = 'div';

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initializes DOM Widget.
   * Sets the canvas for the widget, does parent/child relationship management,
   * appends it to it's parent and handles any positioning logic.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function () {
    if (arg.hasOwnProperty('parent')) {
      arg.parent.addChild(m_this);
    }

    m_this._createCanvas();
    m_this._appendChild();

    m_this.canvas().addEventListener('mousedown', function (e) {
      e.stopPropagation();
    });

    m_this.reposition();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Creates the widget canvas.
   * This is just a simple DOM element (based on args.el, or defaults to a div)
   */
  ////////////////////////////////////////////////////////////////////////////
  this._createCanvas = function () {
    m_this.canvas(document.createElement(arg.el || m_default_canvas));
  };

  return this;
};

inherit(geo.gui.domWidget, geo.gui.widget);

geo.registerWidget('dom', 'dom', geo.gui.domWidget);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class geo.gui.svgWidget
 *
 * Due to the nature of d3 creating DOM elements as it inserts them, calls to appendChild
 * don't appear in this widget.
 *
 * The canvas of an svgWidget always refers to the actual svg element.
 * The parentCanvas can refer to another widgets svg element, dom element, or the
 * UI layers dom element.
 * See {@link geo.gui.widget#parentCanvas}.
 *
 * @class
 * @extends geo.gui.domWidget
 * @returns {geo.gui.svgWidget}
 *
 */
//////////////////////////////////////////////////////////////////////////////
geo.gui.svgWidget = function (arg) {
  'use strict';
  if (!(this instanceof geo.gui.svgWidget)) {
    return new geo.gui.svgWidget(arg);
  }

  geo.gui.domWidget.call(this, arg);

  var m_this = this,
      m_renderer = null;

  this._init = function (arg) {
    var d3Parent;
    if (arg.hasOwnProperty('parent')) {
      arg.parent.addChild(m_this);

      // Tell the renderer there is an SVG element as a parent
      d3Parent = arg.parent.canvas();
    }

    m_this._createCanvas(d3Parent);

    m_this.canvas().addEventListener('mousedown', function (e) {
      e.stopPropagation();
    });

    m_this.reposition();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Creates the canvas for the svg widget.
   * This directly uses the {@link geo.d3.d3Renderer} as a helper to do all of the heavy
   * lifting.
   */
  ////////////////////////////////////////////////////////////////////////////
  this._createCanvas = function (d3Parent) {
    var rendererOpts = {
      layer: m_this.layer(),
      widget: true
    };

    if (d3Parent) {
      rendererOpts.d3Parent = d3Parent;
    }

    m_renderer = geo.d3.d3Renderer(rendererOpts);

    m_this.canvas(m_renderer.canvas()[0][0]);
  };

  return this;
};

inherit(geo.gui.svgWidget, geo.gui.domWidget);

geo.registerWidget('dom', 'svg', geo.gui.svgWidget);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class sliderWidget
 *
 * @class
 * @extends {geo.gui.svgWidget}
 * @returns {geo.gui.sliderWidget}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gui.sliderWidget = function (arg) {
  'use strict';
  if (!(this instanceof geo.gui.sliderWidget)) {
    return new geo.gui.sliderWidget(arg);
  }
  geo.gui.svgWidget.call(this, arg);

  var m_this = this,
      s_exit = this._exit,
      s_createCanvas = this._createCanvas,
      s_appendChild = this._appendChild,
      m_xscale,
      m_yscale,
      m_plus,
      m_minus,
      m_track,
      m_nub,
      m_width = 20, // Approximate size of the widget in pixels
      m_height = 100,
      m_nubSize = 10,
      m_plusIcon,
      m_minusIcon,
      m_group,
      m_lowContrast,
      m_highlightDur = 100;

  /* http://icomoon.io */
  /* CC BY 3.0 http://creativecommons.org/licenses/by/3.0/ */
  /* jshint -W101 */
  m_plusIcon = 'M512 81.92c-237.568 0-430.080 192.614-430.080 430.080 0 237.568 192.563 430.080 430.080 430.080s430.080-192.563 430.080-430.080c0-237.517-192.563-430.080-430.080-430.080zM564.326 564.326v206.182h-104.653v-206.182h-206.234v-104.653h206.182v-206.234h104.704v206.182h206.182v104.704h-206.182z';
  m_minusIcon = 'M512 81.92c-237.568 0-430.080 192.614-430.080 430.080 0 237.568 192.563 430.080 430.080 430.080s430.080-192.563 430.080-430.080c0-237.517-192.563-430.080-430.080-430.080zM770.56 459.674v104.704h-517.12v-104.704h517.12z';
  /* jshint +W101 */

  // Define off-white gray colors for low contrast ui (unselected).
  m_lowContrast = {
    white: '#f4f4f4',
    black: '#505050'
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Add an icon from a path string.  Returns a d3 group element.
   *
   * @function
   * @argument {String} icon svg path string
   * @argument {Array} base where to append the element (d3 selection)
   * @argument {Number} cx Center x-coordinate
   * @argument {Number} cy Center y-coordinate
   * @argument {Number} size Icon size in pixels
   * @returns {object}
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  function put_icon(icon, base, cx, cy, size) {
    var g = base.append('g');

    // the scale factor
    var s = size / 1024;

    g.append('g')
      .append('g')
        .attr(
          'transform',
          'translate(' + cx + ',' + cy + ') scale(' + s + ') translate(-512,-512)'
      )
      .append('path')
        .attr('d', icon)
        .attr('class', 'geo-glyphicon');

    return g;
  }

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize the slider widget in the map.
   *
   * @function
   * @returns {geo.gui.sliderWidget}
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  this._init = function () {
    s_createCanvas();
    s_appendChild();

    m_this.reposition();

    var svg = d3.select(m_this.canvas()),
        x0 = 40,
        y0 = 40 + m_width,
        map = m_this.layer().map();

    // create d3 scales for positioning
    // TODO: make customizable and responsive
    m_xscale = d3.scale.linear().domain([-4, 4]).range([x0, x0 + m_width]);
    m_yscale = d3.scale.linear().domain([0, 1]).range([y0, y0 + m_height]);

    // Create the main group element
    svg = svg.append('g').classed('geo-ui-slider', true);
    m_group = svg;

    // Create + zoom button
    m_plus = svg.append('g');
    m_plus.append('circle')
      .datum({
        fill: 'white',
        stroke: null
      })
      .classed('geo-zoom-in', true)
      .attr('cx', m_xscale(0))
      .attr('cy', m_yscale(0.0) - m_width + 2)
      .attr('r', m_width / 2)
      .style({
        'cursor': 'pointer'
      })
      .on('click', function () {
        var z = map.zoom();
        map.transition({
          zoom: z + 1,
          ease: d3.ease('cubic-in-out'),
          duration: 500
        });
      })
      .on('mousedown', function () {
        d3.event.stopPropagation();
      });

    put_icon(
      m_plusIcon,
      m_plus,
      m_xscale(0),
      m_yscale(0) - m_width + 2,
      m_width + 5
    ).style('cursor', 'pointer')
      .style('pointer-events', 'none')
      .select('path')
      .datum({
        fill: 'black',
        stroke: null
      });

    // Create the - zoom button
    m_minus = svg.append('g');
    m_minus.append('circle')
      .datum({
        fill: 'white',
        stroke: null
      })
      .classed('geo-zoom-out', true)
      .attr('cx', m_xscale(0))
      .attr('cy', m_yscale(1.0) + m_width - 2)
      .attr('r', m_width / 2)
      .style({
        'cursor': 'pointer'
      })
      .on('click', function () {
        var z = map.zoom();
        map.transition({
          zoom: z - 1,
          ease: d3.ease('cubic-in-out'),
          duration: 500
        });
      })
      .on('mousedown', function () {
        d3.event.stopPropagation();
      });

    put_icon(
      m_minusIcon,
      m_minus,
      m_xscale(0),
      m_yscale(1) + m_width - 2,
      m_width + 5
    ).style('cursor', 'pointer')
      .style('pointer-events', 'none')
      .select('path')
      .datum({
        fill: 'black',
        stroke: null
      });

    // Respond to a mouse event on the widget
    function respond(evt, trans) {
      var z = m_yscale.invert(d3.mouse(m_this.layer().node()[0])[1]),
          zrange = map.zoomRange();
      z = (1 - z) * (zrange.max - zrange.min) + zrange.min;
      if (trans) {
        map.transition({
          zoom: z,
          ease: d3.ease('cubic-in-out'),
          duration: 500,
          done: m_this._update()
        });
      } else {
        map.zoom(z);
        m_this._update();
      }
      evt.stopPropagation();
    }

    // Create the track
    m_track = svg.append('rect')
      .datum({
        fill: 'white',
        stroke: 'black'
      })
      .classed('geo-zoom-track', true)
      .attr('x', m_xscale(0) - m_width / 6)
      .attr('y', m_yscale(0))
      .attr('rx', m_width / 10)
      .attr('ry', m_width / 10)
      .attr('width', m_width / 3)
      .attr('height', m_height)
      .style({
        'cursor': 'pointer'
      })
      .on('click', function () {
        respond(d3.event, true);
      });

    // Create the nub
    m_nub = svg.append('rect')
      .datum({
        fill: 'black',
        stroke: null
      })
      .classed('geo-zoom-nub', true)
      .attr('x', m_xscale(-4))
      .attr('y', m_yscale(0.5) - m_nubSize / 2)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('width', m_width)
      .attr('height', m_nubSize)
      .style({
        'cursor': 'pointer'
      })
      .on('mousedown', function () {
        d3.select(document).on('mousemove.geo.slider', function () {
          respond(d3.event);
        });
        d3.select(document).on('mouseup.geo.slider', function () {
          respond(d3.event);
          d3.select(document).on('.geo.slider', null);
        });
        d3.event.stopPropagation();
      });

    var mouseOver = function () {
      d3.select(this).attr('filter', 'url(#geo-highlight)');
      m_group.selectAll('rect,path,circle').transition()
        .duration(m_highlightDur)
        .style('fill', function (d) {
          return d.fill || null;
        })
        .style('stroke', function (d) {
          return d.stroke || null;
        });

    };

    var mouseOut = function () {
      d3.select(this).attr('filter', null);
      m_group.selectAll('circle,rect,path').transition()
        .duration(m_highlightDur)
        .style('fill', function (d) {
          return m_lowContrast[d.fill] || null;
        })
        .style('stroke', function (d) {
          return m_lowContrast[d.stroke] || null;
        });
    };

    m_group.selectAll('*')
      .on('mouseover', mouseOver)
      .on('mouseout', mouseOut);

    // Update the nub position on zoom
    m_this.layer().geoOn(geo.event.zoom, function () {
      m_this._update();
    });

    mouseOut();
    m_this._update();
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Removes the slider element from the map and unbinds all handlers.
   *
   * @function
   * @returns {geo.gui.sliderWidget}
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  this._exit = function () {
    m_group.remove();
    m_this.layer().geoOff(geo.event.zoom);
    s_exit();
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Update the slider widget state in reponse to map changes.  I.e. zoom
   * range changes.
   *
   * @function
   * @returns {geo.gui.sliderWidget}
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  this._update = function (obj) {
    var map = m_this.layer().map(),
        zoomRange = map.zoomRange(),
        zoom = map.zoom(),
        zoomScale = d3.scale.linear();

    obj = obj || {};
    zoom = obj.value || zoom;
    zoomScale.domain([zoomRange.min, zoomRange.max])
      .range([1, 0])
      .clamp(true);

    m_nub.attr('y', m_yscale(zoomScale(zoom)) - m_nubSize / 2);
  };
};

inherit(geo.gui.sliderWidget, geo.gui.svgWidget);

geo.registerWidget('dom', 'slider', geo.gui.sliderWidget);

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class legendWidget
 *
 * @class
 * @extends geo.gui.svgWidget
 * @returns {geo.gui.legendWidget}
 */
//////////////////////////////////////////////////////////////////////////////
geo.gui.legendWidget = function (arg) {
  'use strict';
  if (!(this instanceof geo.gui.legendWidget)) {
    return new geo.gui.legendWidget(arg);
  }
  geo.gui.svgWidget.call(this, arg);

  /** @private */
  var m_this = this,
      m_categories = [],
      m_top = null,
      m_group = null,
      m_border = null,
      m_spacing = 20, // distance in pixels between lines
      m_padding = 12, // padding in pixels inside the border
      s_createCanvas = this._createCanvas,
      s_appendChild = this._appendChild;

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get or set the category array associated with
   * the legend.  Each element of this array is
   * an object: ::
   *     {
   *         name: string,
   *         style: object,
   *         type: 'point' | 'line' | ...
   *     }
   *
   * The style property can contain the following feature styles:
   *     * fill: bool
   *     * fillColor: object | string
   *     * fillOpacity: number
   *     * stroke: bool
   *     * strokeColor: object | string
   *     * strokeWidth: number
   *     * strokeOpacity: number
   *
   * The type controls how the element is displayed, point as a circle,
   * line as a line segment.  Any other value will display as a rounded
   * rectangle.
   *
   * @param {object[]?} categories The categories to display
   */
  //////////////////////////////////////////////////////////////////////////////
  this.categories = function (arg) {
    if (arg === undefined) {
      return m_categories.slice();
    }
    m_categories = arg.slice().map(function (d) {
      if (d.type === 'line') {
        d.style.fill = false;
        d.style.stroke = true;
      }
      return d;
    });
    m_this.draw();
    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get the widget's size
   * @return {{width: number, height: number}} The size in pixels
   */
  //////////////////////////////////////////////////////////////////////////////
  this.size = function () {
    var width = 1, height;
    var test =  d3.select(m_this.canvas()).append('text')
          .style('opacity', 1e-6);

    m_categories.forEach(function (d) {
      test.text(d.name);
      width = Math.max(width, test.node().getBBox().width);
    });
    test.remove();

    height = m_spacing * (m_categories.length + 1);
    return {
      width: width + 50,
      height: height
    };
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Redraw the legend
   */
  //////////////////////////////////////////////////////////////////////////////
  this.draw = function () {

    m_this._init();
    function applyColor(selection) {
      selection.style('fill', function (d) {
        if (d.style.fill || d.style.fill === undefined) {
          return d.style.fillColor;
        } else {
          return 'none';
        }
      })
        .style('fill-opacity', function (d) {
          if (d.style.fillOpacity === undefined) {
            return 1;
          }
          return d.style.fillOpacity;
        })
        .style('stroke', function (d) {
          if (d.style.stroke || d.style.stroke === undefined) {
            return d.style.strokeColor;
          } else {
            return 'none';
          }
        })
        .style('stroke-opacity', function (d) {
          if (d.style.strokeOpacity === undefined) {
            return 1;
          }
          return d.style.strokeOpacity;
        })
        .style('stroke-width', function (d) {
          if (d.style.strokeWidth === undefined) {
            return 1.5;
          }
          return d.style.strokeWidth;
        });
    }

    m_border.attr('height', m_this.size().height + 2 * m_padding)
      .style('display', null);

    var scale = m_this._scale();

    var labels = m_group.selectAll('g.geo-label')
          .data(m_categories, function (d) { return d.name; });

    var g = labels.enter().append('g')
          .attr('class', 'geo-label')
          .attr('transform', function (d, i) {
            return 'translate(0,' + scale.y(i) + ')';
          });

    applyColor(g.filter(function (d) {
      return d.type !== 'point' && d.type !== 'line';
    }).append('rect')
               .attr('x', 0)
               .attr('y', -6)
               .attr('rx', 5)
               .attr('ry', 5)
               .attr('width', 40)
               .attr('height', 12)
              );

    applyColor(g.filter(function (d) {
      return d.type === 'point';
    }).append('circle')
               .attr('cx', 20)
               .attr('cy', 0)
               .attr('r', 6)
              );

    applyColor(g.filter(function (d) {
      return d.type === 'line';
    }).append('line')
               .attr('x1', 0)
               .attr('y1', 0)
               .attr('x2', 40)
               .attr('y2', 0)
              );

    g.append('text')
      .attr('x', '50px')
      .attr('y', 0)
      .attr('dy', '0.3em')
      .text(function (d) {
        return d.name;
      });

    m_this.reposition();

    return m_this;
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get scales for the x and y axis for the current size.
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  this._scale = function () {
    return {
      x: d3.scale.linear()
        .domain([0, 1])
        .range([0, m_this.size().width]),
      y: d3.scale.linear()
        .domain([0, m_categories.length - 1])
        .range([m_padding / 2, m_this.size().height - m_padding / 2])
    };
  };

  //////////////////////////////////////////////////////////////////////////////
  /**
   * Private initialization.  Creates the widget's DOM container and internal
   * variables.
   * @private
   */
  //////////////////////////////////////////////////////////////////////////////
  this._init = function () {
    // adding categories redraws the entire thing by calling _init, see
    // the m_top.remove() line below
    if (!m_top) {
      s_createCanvas();
      s_appendChild();
    }

    // total size = interior size + 2 * padding + 2 * width of the border
    var w = m_this.size().width + 2 * m_padding + 4,
        h = m_this.size().height + 2 * m_padding + 4;

    // @todo - removing after creating to maintain the appendChild structure
    if (m_top) {
      m_top.remove();
    }

    d3.select(m_this.canvas()).attr('width', w).attr('height', h);

    m_top = d3.select(m_this.canvas()).append('g');
    m_group = m_top
      .append('g')
      .attr('transform', 'translate(' + [m_padding + 2, m_padding + 2] + ')');
    m_border = m_group.append('rect')
      .attr('x', -m_padding)
      .attr('y', -m_padding)
      .attr('width', w - 4)
      .attr('height', h - 4)
      .attr('rx', 3)
      .attr('ry', 3)
      .style({
        'stroke': 'black',
        'stroke-width': '1.5px',
        'fill': 'white',
        'fill-opacity': 0.75,
        'display': 'none'
      });
    m_group.on('mousedown', function () {
      d3.event.stopPropagation();
    });
    m_group.on('mouseover', function () {
      m_border.transition()
        .duration(250)
        .style('fill-opacity', 1);
    });
    m_group.on('mouseout', function () {
      m_border.transition()
        .duration(250)
        .style('fill-opacity', 0.75);
    });

    m_this.reposition();
  };

  this.geoOn(geo.event.resize, function () {
    m_this.draw();
  });

};

inherit(geo.gui.legendWidget, geo.gui.svgWidget);

geo.registerWidget('dom', 'legend', geo.gui.legendWidget);

/*jscs:disable validateIndentation*/
(function ($, geo, d3) {
  'use strict';

  var load = function () {

  // This requires jquery ui, which we don't want to make a
  // hard requirement, so bail out here if the widget factory
  // is not available and throw a helpful message when the
  // tries to use it.
  if (!$.widget) {
    $.fn.geojsMap = function () {
      throw new Error(
        'The geojs jquery plugin requires jquery ui to be available.'
      );
    };
    return;
  }

  /**
   * Takes an option key and returns true if it should
   * return a color accessor.
   * @private
   */
  function isColorKey(key) {
    return key.slice(key.length - 5, key.length)
      .toLowerCase() === 'color';
  }

  /**
   * Take an array of data and an accessor for a color property
   * and return a wrapped accessor mapping to actual color
   * values.  This allows users to pass arbitrary strings
   * or numbers as any color property and this will wrap
   * a categorical scale or linear scale.
   *
   * Requires d3
   * @private
   * @param {Object[]} data A data array
   * @param {(string|number|function)} acc A color accessor
   * @return {function}
   */
  function makeColorScale(data, acc) {
    if (!d3) {
      console.warn('d3 is unavailable, cannot apply color scales.');
      return acc;
    }
    var domain;
    var cannotHandle = false;
    var doNotHandle = true;
    var categorical = false;
    var min = Number.POSITIVE_INFINITY;
    var max = Number.NEGATIVE_INFINITY;

    function wrap(func) {
      if (geo.util.isFunction(func)) {
        return function () {
          return func(acc.apply(this, arguments));
        };
      } else {
        return func(acc);
      }
    }

    if (geo.util.isFunction(acc)) {
      domain = d3.set(data.map(acc)).values();
    } else {
      domain = [acc];
    }
    domain.forEach(function (v) {
      if (!(typeof v === 'string' &&
            typeof geo.util.convertColor(v) === 'object')) {
        // This is to handle cases when values are css names or
        // hex strings.  We don't want to apply a categorical
        // scale.
        doNotHandle = false;
      }
      if (typeof v === 'string') {
        categorical = true;
      } else if (!isFinite(v)) {
        cannotHandle = true;
      } else if (+v > max) {
        max = +v;
      } else if (+v < min) {
        min = +v;
      }
    });
    if (cannotHandle) {
      // At least one value is not a string or a numeric value.
      // Pass the bare accessor back to geojs to handle it.
      return acc;
    }
    if (doNotHandle) {
      return acc;
    }
    if (categorical) {
      if (domain.length <= 10) {
        return wrap(d3.scale.category10().domain(domain));
      } else if (domain.length <= 20) {
        return wrap(d3.scale.category20().domain(domain));
      } else {
        // TODO: sort domain by most used and make an "other" category
        return wrap(d3.scale.category20().domain(domain));
      }
    }
    // http://colorbrewer2.org/?type=diverging&scheme=RdYlBu&n=3
    return wrap(d3.scale.linear()
      .range([
        'rgb(252,141,89)',
        'rgb(255,255,191)',
        'rgb(145,191,219)'
      ])
      .domain([
        min,
        (min + max) / 2,
        max
      ]));
  }

  /**
   * @class geojsMap
   * @memberOf jQuery.fn
   *
   * @description Generates a geojs map inside an element.
   *
   *
   * Due to current limitations in geojs, only a single map can be instantiated
   * on a page.  Trying to create a second map will throw an error
   * (see issue
   * <a href="https://github.com/OpenGeoscience/geojs/issues/154">#154</a>).
   *
   * @example <caption>Create a map with the default options.</caption>
   * $("#map").geojsMap();
   * @example <caption>Create a map with a given initial center and zoom</caption>
   * $("#map").geojsMap({
   *    longitude: -125,
   *    latitude: 35,
   *    zoom: 5
   * });
   * @example <caption>Create a map with points</caption>
   * $("#map").geojsMap({
   *   data: [...],
   *   layers: [{
   *     renderer: 'vgl',
   *     features: [{
   *       type: 'point',
   *       radius: 5,
   *       position: function (d) { return {x: d.geometry.x, y: d.geometry.y} },
   *       fillColor: function (d, i) { return i < 5 ? 'red' : 'blue' },
   *       stroke: false
   *     }]
   *   }]
   * };
   * @example <caption>Create a map with points, lines and multiple layers</caption>
   * $("#map").geojsMap({
   *   center: { x: -130, y: 40 },
   *   zoom: 3,
   *   layers: [{
   *     renderer: 'vgl',
   *     features: [{
   *       data: [...],
   *       type: 'point',
   *       radius: 5,
   *       position: function (d) { return {x: d.geometry.x, y: d.geometry.y} },
   *       fillColor: function (d, i) { return i < 5 ? 'red' : 'blue' },
   *       stroke: false
   *     }]
   *   },
   *   {
   *      renderer: 'd3',
   *      features[{
   *        data: [...],
   *        type: 'line',
   *        position: function (d) { return { x: d[0], y: d[1] } },
   *        line: function (d) { return d.coordinates; },
   *        strokeWidth: 3,
   *        strokeColor: 'black',
   *        strokeOpacity: 0.5
   *      }]
   *   }]
   * };
   */
  // jscs:disable requireSpaceBetweenArguments
  $.widget('geojs.geojsMap', /** @lends jQuery.fn.geojsMap */{
  // jscs:enable requireSpaceBetweenArguments
    /**
     * A coordinate object as accepted by geojs to express positions in an
     * arbitrary coordinate system (geographic, screen, etc).  Coordinates returned by
     * geojs methods are always expressed with "x" and "y" properties, but
     * it will accept any of the aliased properties.
     * @typedef coordinate
     * @type {object}
     * @property {number} longitude Alias: "x", "lng", or "lon"
     * @property {number} latitude Alias: "y" or "lat"
     * @property {number} [elevation=0] Alias: "z", "elev", or "height"
     */

    /**
     * Colors can be expressed in multiple ways:
     * <ul>
     *   <li>css name (<code>"steelblue"</code>)</li>
     *   <li>24 bit hex value (<code>0xff0051</code>)</li>
     *   <li>25 bit hex string (<code>"#ff0051"</code>)</li>
     *   <li>rgb object (values from 0-1, <code>{r: 1, g: 0.5, b: 0}</code>)</li>
     * </ul>
     * @typedef color
     * @type {*}
     */

    /**
     * Point feature options object.  All styles can be
     * given as accessor functions or constants.  Accessor
     * functions are called with the following signature:
     * <pre>
     *     function func(d, i) {
     *         // d    - data object
     *         // i    - index of d in the data array
     *         // this - geo.pointFeature
     *     }
     * </pre>
     * Pass null to remove saved options from previous calls.
     * @typedef pointOptions
     * @type {Object}
     * @property {Object[]} data Data array
     * @property {coordinate} position Location of the point center
     * @property {number} radius
     *  Radius of the circle in pixels (ignored when <code>size</code>
     *  is present)
     * @property {function} size
     *   A function returning a numerical value
     * @property {boolean} fill Presence or absence of the fill
     * @property {color} fillColor Interior color
     * @property {float} fillOpacity Opacity of the interior <code>[0,1]</code>
     * @property {boolean} stroke Presence or absence of the stroke
     * @property {color} strokeColor Stroke color
     * @property {float} strokeOpacity Opacity of the stroke <code>[0,1]</code>
     */

    /**
     * @instance
     * @description
     * Map options (not fully implemented).
     * @example <caption>Get the current map center</caption>
     * var center=$("#map").geojsMap("center");
     * @example <caption>Pan the map to a new center</caption>
     * $("#map").geojsMap("center", {lat: 10, lng: -100});
     * @property {object[]} [data=[]] The default data array used for
     * features/layers not already containing data.
     * @property {coordinate} [center={lat: 0, lng: 0}] The map center
     * @property {number} [zoom=0] The zoom level (floating point >= 0)
     * @property {(number|null)} [width=null]
     *   The width of the map in pixels or null for 100%
     * @property {(number|null)} [height=null]
     *   The height of the map in pixels or null for 100%
     * @property {geo.layer.spec[]} [layers=[]]
     *   Describes layers added to the map
     * @property {boolean} [autoresize=true]
     *   Resize the map on <code>window.resize</code> (initialization only)
     * @property {string} [url]
     *   The open street map tile server spec default:
     *   <code>http://tile.openstreetmap.org/&lt;zoom>/&lt;x>/&lt;y>.png</code>
     */
    options: {
      center: {latitude: 0, longitude: 0},
      zoom: 0,
      width: null,
      height: null,
      layers: [],
      data: [],
      url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: undefined,

      // These options are for future use, but shouldn't
      // be changed at the moment, so they aren't documented.
      baseLayer: 'osm',
      baseRenderer: 'vgl'
    },

    /**
     * Internal constructor
     * @instance
     * @protected
     */
    _create: function () {
      if (this._map || !this.element.length) {
        // when called multiple times on a single element, do nothing
        return;
      }

      // create the map
      this._map = geo.map({
        width: this.options.width,
        height: this.options.height,
        zoom: this.options.zoom,
        center: this.options.center,
        node: this.element.get(0)
      });

      // create the base layer
      this._baseLayer = this._map.createLayer(
        this.options.baseLayer,
        {
          renderer: this.options.baseRenderer,
          url: this.options.url,
          attribution: this.options.attribution
        }
      );

      // Trigger a resize to a valid size before adding
      // the feature layer to handle some of the bugs that
      // occur when initializing onto a node of size 0.
      this._resize({width: 800, height: 600});

      this._layers = [];
      this.update();
    },

    /**
     * Update the layers and features using a new array of
     * {@link geo.layer.spec} objects.  All existing layers
     * and features are deleted.  If only the data has changed,
     * you can usually just call {@link jQuery.fn.geojsMap#redraw redraw}.
     * @instance
     * @param {geo.layer.spec[]} [layers] New map layers
     * @example <caption>Delete and recreate all existing layers</caption>
     * $("#map").geojsMap("update");
     * @example <caption>Remove all existing feature layers.</caption>
     * $("#map").geojsMap("update", []);
     */
    update: function (layers) {
      var m_this = this;
      this.options.layers = layers || this.options.layers || [];

      // delete existing layers
      this._layers.forEach(function (layer) {
        layer.clear();
        m_this._map.deleteLayer(layer);
      });

      // create new layers
      this._layers = this.options.layers.map(function (layer) {
        layer.data = layer.data || m_this.options.data;

        // Until auto color scaling gets moved into geojs core, we will
        // mutate the spec and replace the color and radius options.
        (layer.features || []).forEach(function (feature) {
          var data = feature.data || layer.data || [];
          var scl;
          if (feature.type === 'point') {
            if (feature.size) {
              feature._size = geo.util.ensureFunction(feature.size);
            } else if (feature.size === null) {
              delete feature._size;
            }

            if (data.length && feature._size) {
              scl = d3.scale.linear()
                .domain(
                  d3.extent(data, feature._size)
                )
                .range([5, 20]);
              feature.radius = function () {
                // TODO: wrong `this` (wait for style refactor)
                return scl(feature._size.apply(this, arguments));
              };
            }
            delete feature.size;
          }

          var key;
          for (key in feature) {
            if (feature.hasOwnProperty(key) &&
                isColorKey(key)) {
              feature[key] = makeColorScale(data, feature[key]);
            }
          }
        });
        return geo.layer.create(m_this._map, layer);
      });

      // trigger an initial draw
      this.redraw();

      return this;
    },

    /**
     * Return the geojs map object.
     * @instance
     * @returns {geo.map}
     */
    map: function () {
      return this._map;
    },

    /**
     * Set the tile server URL.
     * @instance
     * @param {string} url The url format string of an OSM tile server.
     */
    url: function (url) {
      this._baseLayer.url(url);
      return this;
    },

    /**
     * Resize the map canvas.
     * @instance
     * @protected
     * @param {object?} size Explicit size or use this.options.
     */
    _resize: function (size) {
      var width = this.options.width,
          height = this.options.height;
      if (size) {
        width = size.width;
        height = size.height;
      }
      if (!width) {
        width = this.element.width();
      }
      if (!height) {
        height = this.element.height();
      }
      this._map.resize(0, 0, width, height);
    },

    /**
     * Do a full redraw of the map.  In general, users shouldn't need to
     * call this method, but it could be useful when accessing lower
     * level features of the mapping api.
     * @todo This function may need to go through each feature and call
     * {@link geo.feature#modified} to properly update.
     * @instance
     */
    redraw: function () {
      this._resize();
      return this;
    }
  });

  // Some argument type definitions used only by this plugin:
  /**
   * A geojs renderer is one of the following:
   * <ul>
   *   <li><code>"vgl"</code>: Uses webGL</li>
   *   <li><code>"d3"</code>: Uses svg</li>
   * </ul>
   * @typedef renderer
   * @type {string}
   */

  };

  /* Provide a method to reload the plugin in case jquery-ui is loaded after
   * the plugin. */
  geo.jqueryPlugin = {reload: load};

  $(load);
})(typeof $ !== 'undefined' ? $ : window.$,
   typeof geo !== 'undefined' ? geo : window.geo,
   typeof d3 !== 'undefined' ? d3 : window.d3);
