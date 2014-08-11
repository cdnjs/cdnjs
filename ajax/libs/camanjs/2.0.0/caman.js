/*!
 * CamanJS - Pure HTML5 Javascript (Ca)nvas (Man)ipulation
 * http://camanjs.com/
 *
 * Version 2.2
 *
 * Copyright 2011, Ryan LeFevre
 * Licensed under the new BSD License.
 * See LICENSE for more info.
 *
 * Project Contributors:
 *   Ryan LeFevre - Lead Developer and Project Maintainer
 *    Twitter: @meltingice
 *    GitHUb: http://github.com/meltingice
 *
 *   Rick Waldron - Plugin Architect and Developer
 *    Twitter: @rwaldron
 *    GitHub: http://github.com/rwldrn
 *
 *   Cezar Sa Espinola - Developer
 *    Twitter: @cezarsa
 *    GitHub: http://github.com/cezarsa
 */
 
/*global Caman: true, require: true, exports: true */
var fs  = require('fs'),
Canvas  = require('canvas'),
Image = Canvas.Image;

/*
 * Responsible for loading CamanJS and setting everything up.
 * The Caman() function is defined here.
 */

var Caman = function ( file, ready ) {
  return new Caman.manip.load(file, ready);
};

Caman.manip = Caman.prototype = {
  /*
   * Sets up everything that needs to be done before the filter
   * functions can be run. This includes loading the image into
   * the canvas element and saving lots of different data about
   * the image.
   */
  load: function(file, ready) {
    var self = this,
    img = new Image();
    
    file = fs.realpathSync(file);

    img.onload = function () {
      var canvas = new Canvas(img.width, img.height);
      
      self.canvas = canvas;
      self.context = canvas.getContext('2d');
      self.context.drawImage(img, 0, 0);
      self.image_data = self.context.getImageData(0, 0, img.width, img.height);
      self.pixel_data = self.image_data.data;
      
      self.dimensions = {
        width: img.width,
        height: img.height
      };
      
      self.renderQueue = [];
      self.pixelStack = [];
      self.layerStack = [];
      
      if(typeof ready === "function") { ready.call(self, self); }
      
      Caman.store[file] = self;
      
      return self;
    };
    
    img.onerror = function (err) {
      throw err;
    };
    
    img.src = file;
  }
};

Caman.manip.load.prototype = Caman.manip;

// Helper function since document.getElementById()
// is a mouthful. Note that this will not conflict
// with jQuery since this Caman.$ variable does not exist
// in the global window scope.
Caman.$ = function (id) {
  if (id[0] == '#') {
    id = id.substr(1);
  }
  
  return document.getElementById(id);
};

Caman.store = {};

Caman.isRemote = function (url) {
  var domain_regex = /(?:(?:http|https):\/\/)((?:\w+)\.(?:(?:\w|\.)+))/,
  test_domain;
  
  if (!url || !url.length) {
    return;
  }
  
  var matches = url.match(domain_regex);
  if (matches) {
    test_domain = matches[1];
  
    return test_domain != document.domain;
  } else {
    return false;
  }
};

Caman.remoteCheck = function (src) {
  // Check to see if image is remote or not
  if (Caman.isRemote(src)) {
    if (!Caman.remoteProxy.length) {
      console.info("Attempting to load remote image without a configured proxy, URL: " + src);
      return;
    } else {
      if (Caman.isRemote(Caman.remoteProxy)) {
        console.info("Cannot use a remote proxy for loading remote images due to same-origin policy");
        return;
      }
      
      // We have a remote proxy setup properly, so lets alter the image src
      return Caman.remoteProxy + "?url=" + encodeURIComponent(src);
    }
  }
};

exports.Caman = Caman;
/*
 * Utility functions that help out in various areas of CamanJS.
 */
 
(function (Caman) {

var forEach = Array.prototype.forEach,
hasOwn = Object.prototype.hasOwnProperty,
slice = Array.prototype.slice;

Caman.plugin = {};

/*
 * Utility forEach function for iterating over
 * objects/arrays.
 */
Caman.forEach = function( obj, fn, context ) {
  
  if ( !obj || !fn ) {
    return {};
  }
  
  context = context || this;
  // Use native whenever possible
  if ( forEach && obj.forEach === forEach ) {
    return obj.forEach(fn, context);
  } 

  for ( var key in obj ) {
    if ( hasOwn.call(obj, key) ) {
      fn.call(context, obj[key], key, obj);
    } 
  }        

  return obj;
};

/*
 * Used for extending the Caman object, primarily to
 * add new functionality to the base library.
 */
Caman.extend = function( obj ) {
  var dest = obj, src = slice.call(arguments, 1);


  Caman.forEach( src, function( copy ) {
    for ( var prop in copy ) {
      dest[prop] = copy[prop];
    }
  });
  return dest;      
};

Caman.clampRGB = function (value) {
  if (value > 255) return 255;
  else if (value < 0) return 0;
  return value;
};

/*
 * Here we define the proxies that ship with CamanJS for easy
 * usage.
 */
Caman.useProxy = function (lang) {
  // define cases where file extensions don't match the language name
  var langToExt = {
    ruby: 'rb',
    python: 'py',
    perl: 'pl'
  };
  
  lang = langToExt[lang.toLowerCase()] || lang.toLowerCase();
  
  return "proxies/caman_proxy." + lang;
};

/*
 * Unique ID generator. Guaranteed to always generate a new ID.
 */
Caman.uniqid = (function () {
  var id = 0;
  
  return {
    get: function () {
      return id++;
    },
    
    reset: function () {
      id = 0;
    }
  };
}());

Caman.extend(Caman, {
  /*
   * Returns the size of an object (the number of properties
   * the object has)
   */
  sizeOf: function ( obj ) {
    var size = 0,
        prop;
    
    for ( prop in obj  ) {
      size++;
    }
            
    return size;
  },
  
  /*
   * Determines whether two given objects are the same based
   * on their properties and values.
   */
  sameAs: function ( base, test ) {
    
    // only tests arrays
    // TODO: extend to object tests
    if ( base.length !== test.length ) {
      return false;
    }
    
    for ( var i = base.length; i >= 0; i-- )  {
      if ( base[i] !== test[i] ) {
        return false;
      }
    }
    return true;
  },
  
  /*
   * Removes items with the given value from an array if they
   * are present.
   */
  remove: function ( arr, item ) {
    var ret = [];
    
    for ( var i = 0, len = arr.length; i < len; i++ ) {
      if ( arr[i] !== item  ) {
        ret.push(arr[i]);
      }
    }
    
    arr = ret;
    
    return ret;      
  },
    
  randomRange: function (min, max, float) {
    var rand = min + (Math.random() * (max - min));
    return typeof float == 'undefined' ? Math.round(rand) : rand.toFixed(float);
  },
  
  /**
   * Converts an RGB color to HSL.
   * Assumes r, g, and b are in the set [0, 255] and
   * returns h, s, and l in the set [0, 1].
   *
   * @param   Number  r   Red channel
   * @param   Number  g   Green channel
   * @param   Number  b   Blue channel
   * @return              The HSL representation
   */
  rgb_to_hsl: function(r, g, b) {
  
    r /= 255;
    g /= 255;
    b /= 255;
    
    var max = Math.max(r, g, b), min = Math.min(r, g, b), 
        h, s, l = (max + min) / 2;
    
    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    return {h: h, s: s, l: l};
  },
  
  hue_to_rgb: function (p, q, t) {
    if(t < 0) t += 1;
    if(t > 1) t -= 1;
    if(t < 1/6) return p + (q - p) * 6 * t;
    if(t < 1/2) return q;
    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  },
  
  /**
   * Converts an HSL color value to RGB. Conversion formula
   * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
   * Assumes h, s, and l are contained in the set [0, 1] and
   * returns r, g, and b in the set [0, 255].
   *
   * @param   Number  h       The hue
   * @param   Number  s       The saturation
   * @param   Number  l       The lightness
   * @return  Array           The RGB representation
   */
  hsl_to_rgb: function(h, s, l){
      var r, g, b;
  
      if(s === 0){
          r = g = b = l; // achromatic
      } else {
          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = this.hue_to_rgb(p, q, h + 1/3);
          g = this.hue_to_rgb(p, q, h);
          b = this.hue_to_rgb(p, q, h - 1/3);
      }
      
      return {r: r * 255, g: g * 255, b: b * 255};
  },
  
  /**
   * Converts an RGB color value to HSV. Conversion formula
   * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
   * Assumes r, g, and b are contained in the set [0, 255] and
   * returns h, s, and v in the set [0, 1].
   *
   * @param   Number  r       The red color value
   * @param   Number  g       The green color value
   * @param   Number  b       The blue color value
   * @return  Array           The HSV representation
   */
  rgb_to_hsv: function(r, g, b){
      
      r = r/255;
      g = g/255;
      b = b/255;
      
      var max = Math.max(r, g, b), min = Math.min(r, g, b),
          h, s, v = max,
          d = max - min;
          
      s = max === 0 ? 0 : d / max;
  
      if(max == min){
          h = 0; // achromatic
      } else {
          switch(max){
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
      }
  
      return {h: h, s: s, v: v};
  },
  
  /**
   * Converts an HSV color value to RGB. Conversion formula
   * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
   * Assumes h, s, and v are contained in the set [0, 1] and
   * returns r, g, and b in the set [0, 255].
   *
   * @param   Number  h       The hue
   * @param   Number  s       The saturation
   * @param   Number  v       The value
   * @return  Array           The RGB representation
   */
  hsv_to_rgb: function(h, s, v){
    
      var r, g, b,
          i = Math.floor(h * 6),
          f = h * 6 - i,
          p = v * (1 - s),
          q = v * (1 - f * s),
          t = v * (1 - (1 - f) * s);
  
      switch(i % 6){
          case 0: 
            r = v;
            g = t;
            b = p;
            break;
          case 1:
            r = q;
            g = v;
            b = p;
            break;
          case 2:
            r = p;
            g = v;
            b = t;
            break;
          case 3:
            r = p;
            g = q;
            b = v;
            break;
          case 4:
            r = t;
            g = p;
            b = v;
            break;
          case 5:
            r = v;
            g = p;
            b = q;
            break;
      }
  
      return {r: r * 255, g: g * 255, b: b * 255};
  },
  
  /**
   * Converts a RGB color value to the XYZ color space. Formulas
   * are based on http://en.wikipedia.org/wiki/SRGB assuming that
   * RGB values are sRGB.
   * Assumes r, g, and b are contained in the set [0, 255] and
   * returns x, y, and z.
   *
   * @param   Number  r       The red color value
   * @param   Number  g       The green color value
   * @param   Number  b       The blue color value
   * @return  Array           The XYZ representation
   */
  rgb_to_xyz: function (r, g, b) {
  
    r = r / 255; g = g / 255; b = b / 255;
  
    if (r > 0.04045) {
      r = Math.pow((r + 0.055) / 1.055, 2.4);
    } else {
      r = r / 12.92;
    }
  
    if (g > 0.04045) {
      g = Math.pow((g + 0.055) / 1.055, 2.4);
    } else {
      g = g / 12.92;
    }
  
    if (b > 0.04045) {
      b = Math.pow((b + 0.055) / 1.055, 2.4);
    } else {
      b = b / 12.92;
    }
  
    var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
  
    return {x: x * 100, y: y * 100, z: z * 100};
  },
  
  /**
   * Converts a XYZ color value to the sRGB color space. Formulas
   * are based on http://en.wikipedia.org/wiki/SRGB and the resulting
   * RGB value will be in the sRGB color space.
   * Assumes x, y and z values are whatever they are and returns
   * r, g and b in the set [0, 255].
   *
   * @param   Number  x       The X value
   * @param   Number  y       The Y value
   * @param   Number  z       The Z value
   * @return  Array           The RGB representation
   */
  xyz_to_rgb: function (x, y, z) {

    x = x / 100; y = y / 100; z = z / 100;
  
    var r, g, b;
    r = (3.2406  * x) + (-1.5372 * y) + (-0.4986 * z);
    g = (-0.9689 * x) + (1.8758  * y) + (0.0415  * z);
    b = (0.0557  * x) + (-0.2040 * y) + (1.0570  * z);
  
    if(r > 0.0031308) {
      r = (1.055 * Math.pow(r, 0.4166666667)) - 0.055;
    } else {
      r = 12.92 * r;
    }
  
    if(g > 0.0031308) {
      g = (1.055 * Math.pow(g, 0.4166666667)) - 0.055;
    } else {
      g = 12.92 * g;
    }
  
    if(b > 0.0031308) {
      b = (1.055 * Math.pow(b, 0.4166666667)) - 0.055;
    } else {
      b = 12.92 * b;
    }
  
    return {r: r * 255, g: g * 255, b: b * 255};
  },
  
  /**
   * Converts a XYZ color value to the CIELAB color space. Formulas
   * are based on http://en.wikipedia.org/wiki/Lab_color_space
   * The reference white point used in the conversion is D65.
   * Assumes x, y and z values are whatever they are and returns
   * L*, a* and b* values
   *
   * @param   Number  x       The X value
   * @param   Number  y       The Y value
   * @param   Number  z       The Z value
   * @return  Array           The Lab representation
   */
  xyz_to_lab: function(x, y, z) {
  
    // D65 reference white point
    var whiteX = 95.047, whiteY = 100.0, whiteZ = 108.883;
  
    x = x / whiteX; y = y / whiteY; z = z / whiteZ;
  
    if (x > 0.008856451679) { // (6/29) ^ 3
      x = Math.pow(x, 0.3333333333);
    } else {
      x = (7.787037037 * x) + 0.1379310345; // (1/3) * ((29/6) ^ 2)c + (4/29)
    }
  
    if (y > 0.008856451679) {
      y = Math.pow(y, 0.3333333333);
    } else {
      y = (7.787037037 * y) + 0.1379310345;
    }
  
    if (z > 0.008856451679) {
      z = Math.pow(z, 0.3333333333);
    } else {
      z = (7.787037037 * z) + 0.1379310345;
    }
  
    var l = 116 * y - 16;
    var a = 500 * (x - y);
    var b = 200 * (y - z);
  
    return {l: l, a: a, b: b};
  },
  
  /**
   * Converts a L*, a*, b* color values from the CIELAB color space
   * to the XYZ color space. Formulas are based on
   * http://en.wikipedia.org/wiki/Lab_color_space
   * The reference white point used in the conversion is D65.
   * Assumes L*, a* and b* values are whatever they are and returns
   * x, y and z values.
   *
   * @param   Number  l       The L* value
   * @param   Number  a       The a* value
   * @param   Number  b       The b* value
   * @return  Array           The XYZ representation
   */
  lab_to_xyz: function(l, a, b) {
  
    var y = (l + 16) / 116;
    var x = y + (a / 500);
    var z = y - (b / 200);
  
    if (x > 0.2068965517) { // 6 / 29
      x = x * x * x;
    } else {
      x = 0.1284185493 * (x - 0.1379310345); // 3 * ((6 / 29) ^ 2) * (c - (4 / 29))
    }
  
    if (y > 0.2068965517) {
      y = y * y * y;
    } else {
      y = 0.1284185493 * (y - 0.1379310345);
    }
  
    if (z > 0.2068965517) {
      z = z * z * z;
    } else {
      z = 0.1284185493 * (z - 0.1379310345);
    }
  
    // D65 reference white point
    return {x: x * 95.047, y: y * 100.0, z: z * 108.883};
  },
  
  /*
   * Converts the hex representation of a color to RGB values.
   * Hex value can optionally start with the hash (#).
   *
   * @param   String  hex   The colors hex value
   * @return  Array         The RGB representation
   */
  hex_to_rgb: function(hex) {
    var r, g, b;
    
    if (hex.charAt(0) === "#") {
      hex = hex.substr(1);
    }
    
    r = parseInt(hex.substr(0, 2), 16);
    g = parseInt(hex.substr(2, 2), 16);
    b = parseInt(hex.substr(4, 2), 16);
    
    return {r: r, g: g, b: b};
  },
  
  bezier: function (start, ctrl1, ctrl2, end, lowBound, highBound) {
    var Ax, Bx, Cx, Ay, By, Cy,
    x0 = start[0], y0 = start[1],
    x1 = ctrl1[0], y1 = ctrl1[1],
    x2 = ctrl2[0], y2 = ctrl2[1],
    x3 = end[0], y3 = end[1],
    t, curveX, curveY,
    bezier = {};
    
    // Calculate our X and Y coefficients
    Cx = 3 * (x1 - x0);
    Bx = 3 * (x2 - x1) - Cx;
    Ax = x3 - x0 - Cx - Bx;
    
    Cy = 3 * (y1 - y0);
    By = 3 * (y2 - y1) - Cy;
    Ay = y3 - y0 - Cy - By;
    
    for (var i = 0; i < 1000; i++) {
      t = i / 1000;
      
      curveX = Math.round((Ax * Math.pow(t, 3)) + (Bx * Math.pow(t, 2)) + (Cx * t) + x0);
      curveY = Math.round((Ay * Math.pow(t, 3)) + (By * Math.pow(t, 2)) + (Cy * t) + y0);
      
      if (lowBound && curveY < lowBound) {
        curveY = lowBound;
      } else if (highBound && curveY > highBound) {
        curveY = highBound;
      }
      
      bezier[curveX] = curveY;
    }
    
    // Do a search for missing values in the bezier array and use linear interpolation
    // to approximate their values.
    var leftCoord, rightCoord, j, slope, bint;
    if (bezier.length < end[0] + 1) {
      for (i = 0; i <= end[0]; i++) {
        if (typeof bezier[i] === "undefined") {
          // The value to the left will always be defined. We don't have to worry about
          // when i = 0 because the starting point is guaranteed (I think...)
          leftCoord = [i-1, bezier[i-1]];
          
          // Find the first value to the right that was found. Ideally this loop will break
          // very quickly.
          for (j = i; j <= end[0]; j++) {
            if (typeof bezier[j] !== "undefined") {
              rightCoord = [j, bezier[j]];
              break;
            }
          }
          
          bezier[i] = leftCoord[1] + ((rightCoord[1] - leftCoord[1]) / (rightCoord[0] - leftCoord[0])) * (i - leftCoord[0]);
        }
      }
    }
    
    // Edge case
    if (typeof bezier[end[0]] === "undefined") {
      bezier[end[0]] = bezier[254];
    }
    
    return bezier;
  },
  
  distance: function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
});

}(Caman));
/*
 * Input/output functions for CamanJS. Mostly deal with
 * saving images, converting them to base64, and so on.
 */
 
(function (Caman) {

Caman.remoteProxy = "";

Caman.extend(Caman.manip, {
  /*
   * Grabs the canvas data, encodes it to Base64, then
   * sets the browser location to the encoded data so that
   * the user will be prompted to download it.
   */
  save: function (file, overwrite) {
    var out = fs.createWriteStream(file),
    stream = this.canvas.createPNGStream();
    
    var stats = fs.statSync(file);
    if (stats.isFile() && !overwrite) {
      return false;
    }

    stream.on('data', function (chunk) {
      out.write(chunk);
    });
  },
  
  /*
   * Grabs the current canvas data and Base64 encodes it.
   */
  toBase64: function (type) {
    if (type) {
      type = type.toLowerCase();
    }
    
    if (!type || (type !== 'png' && type !== 'jpg')) {
      type = 'png';
    }
    
    return this.canvas.toDataURL("image/" + type);
  }
});

}(Caman));
/*
 * CamanJS event system
 * Events can be subscribed to using Caman.listen() and events
 * can be triggered using Caman.trigger().
 */
 
(function (Caman) {

Caman.events  = {
  types: [ "processStart", "processComplete", "renderFinished" ],
  fn: {
    
    /*
     * Triggers an event with the given target name.
     */
    trigger: function ( target, type, data ) {
      
      var _target = target, _type = type, _data = data;
    
      if ( Caman.events.types.indexOf(target) !== -1 ) {
        _target = this;
        _type = target;
        _data = type;
      }
    
      if ( Caman.events.fn[_type] && Caman.sizeOf(Caman.events.fn[_type]) ) {

        Caman.forEach(Caman.events.fn[_type], function ( obj, key ) {

          obj.call(_target, _data);
        
        });
      }
    },
    
    /*
     * Registers a callback function to be fired when a certain
     * event occurs.
     */
    listen: function ( target, type, fn ) {

      var _target = target, _type = type, _fn = fn;
    
      if ( Caman.events.types.indexOf(target) !== -1 ) {
        _target = this;
        _type = target;
        _fn = type;
      }        

      if ( !Caman.events.fn[_type] ) {
        Caman.events.fn[_type] = [];
      }

      Caman.events.fn[_type].push(_fn);
      
      return true;
    }
  },
  cache: {} 
};
  
Caman.forEach( ["trigger", "listen"], function ( key ) {
  Caman[key] = Caman.events.fn[key];
});
  
})(Caman);
/*
 * The pixelInfo object. This object is available inside of the
 * process() loop, and it lets filter developers have simple access
 * to any arbitrary pixel in the image, as well as information about
 * the current pixel in the loop.
 */
 
(function (Caman) {

/*
 * Allows the currently rendering filter to get data about
 * surrounding pixels relative to the pixel currently being
 * processed. The data returned is identical in format to the
 * rgba object provided in the process function.
 *
 * Example: to get data about the pixel to the top-right
 * of the currently processing pixel, you can call (within the process
 * function):
 *    this.getPixelRelative(1, -1);
 */
Caman.manip.pixelInfo = function (self) {
  this.loc = 0;
  this.manip = self;
};

Caman.manip.pixelInfo.prototype.locationXY = function () {
  var x, y;
  
  y = this.manip.dimensions.height - Math.floor(this.loc / (this.manip.dimensions.width * 4));
  x = ((this.loc % (this.manip.dimensions.width * 4)) / 4);
  
  return {x: x, y: y};
};
  
Caman.manip.pixelInfo.prototype.getPixelRelative = function (horiz_offset, vert_offset) {
  // We invert the vert_offset in order to make the coordinate system non-inverted. In laymans
  // terms: -1 means down and +1 means up.
  var newLoc = this.loc + (this.manip.dimensions.width * 4 * (vert_offset * -1)) + (4 * horiz_offset);
  
  // error handling
  if (newLoc > this.manip.pixel_data.length || newLoc < 0) {
    return {r: 0, g: 0, b: 0, a: 0};
  }
  
  return {
    r: this.manip.pixel_data[newLoc],
    g: this.manip.pixel_data[newLoc+1],
    b: this.manip.pixel_data[newLoc+2],
    a: this.manip.pixel_data[newLoc+3]
  };
};
    
Caman.manip.pixelInfo.prototype.putPixelRelative = function (horiz_offset, vert_offset, rgba) {
  var newLoc = this.loc + (this.manip.dimensions.width * 4 * (vert_offset * -1)) + (4 * horiz_offset);
  
  // error handling
  if (newLoc > this.manip.pixel_data.length || newLoc < 0) {
    return false;
  }
  
  this.manip.pixel_data[newLoc]   = rgba.r;
  this.manip.pixel_data[newLoc+1] = rgba.g;
  this.manip.pixel_data[newLoc+2] = rgba.b;
  this.manip.pixel_data[newLoc+3] = rgba.a;
};
    
Caman.manip.pixelInfo.prototype.getPixel = function (x, y) {
  var newLoc = (y * this.manip.dimensions.width + x) * 4;
  
  return {
    r: this.manip.pixel_data[newLoc],
    g: this.manip.pixel_data[newLoc+1],
    b: this.manip.pixel_data[newLoc+2],
    a: this.manip.pixel_data[newLoc+3]
  };
};
    
Caman.manip.pixelInfo.prototype.putPixel = function (x, y, rgba) {
  var newLoc = (y * this.manip.dimensions.width + x) * 4;
  
  this.manip.pixel_data[newLoc]   = rgba.r;
  this.manip.pixel_data[newLoc+1] = rgba.g;
  this.manip.pixel_data[newLoc+2] = rgba.b;
  this.manip.pixel_data[newLoc+3] = rgba.a;
};

}(Caman));
/*
 * CamanJS's rendering system. This covers convolution kernels,
 * pixel-wise filters, and plugins. All of the actual pixel/image
 * manipulation is executed here when render() is called.
 */
 
(function (Caman) {

Caman.renderBlocks = 4;

/*
 * SINGLE = traverse the image 1 pixel at a time
 * KERNEL = traverse the image using convolution kernels
 * LAYER_DEQUEUE = shift a layer off the canvasQueue
 * LAYER_FINISHED = finished processing a layer
 * LOAD_OVERLAY = load a local/remote image into the layer canvas
 * PLUGIN = executes a plugin function that isn't pixelwise or kernel
 */
Caman.ProcessType = {
  SINGLE: 1,
  KERNEL: 2,
  LAYER_DEQUEUE: 3,
  LAYER_FINISHED: 4,
  LOAD_OVERLAY: 5,
  PLUGIN: 6
};

Caman.manip.process = function (adjust, processFn) {
  // Since the block-based renderer is asynchronous, we simply build
  // up a render queue and execute the filters in order once
  // render() is called instead of executing them as they're called
  // synchronously.
  this.renderQueue.push({adjust: adjust, processFn: processFn, type: Caman.ProcessType.SINGLE});
  
  return this;
};

Caman.manip.processKernel = function (name, adjust, divisor, bias) {  
  if (!divisor) {
    divisor = 0;

    for (var i = 0, len = adjust.length; i < len; i++) {
      divisor += adjust[i];
    }
  }
  
  var data = {
    name: name,
    adjust: adjust,
    divisor: divisor,
    bias: bias || 0
  };
  
  this.renderQueue.push({adjust: data, processFn: Caman.processKernel, type: Caman.ProcessType.KERNEL});
  
  return this;
};

Caman.manip.processPlugin = function (plugin, args) {
  this.renderQueue.push({type: Caman.ProcessType.PLUGIN, plugin: plugin, args: args});
  return this;
};

Caman.manip.executePlugin = function (plugin, args) {
  console.log("Executing plugin: " + plugin);
  Caman.plugin[plugin].apply(this, args);
  console.log("Plugin " + plugin + " finished!");
  this.processNext();
};

/*
 * Begins the render process if it's not started, or moves to the next
 * filter in the queue and processes it. Calls the finishedFn callback
 * when the render queue is empty.
 */
Caman.manip.processNext = function (finishedFn) {
  if (typeof finishedFn === "function") {
    this.finishedFn = finishedFn;
  }
  
  if (this.renderQueue.length === 0) {
    Caman.trigger("renderFinished", {id: this.canvas_id});
    
    if (typeof this.finishedFn === "function") {
      this.finishedFn.call(this);
    }
    
    return;
  }
  
  var next = this.renderQueue.shift();
  
  if (next.type == Caman.ProcessType.LAYER_DEQUEUE) {
    var layer = this.canvasQueue.shift();
    this.executeLayer(layer);
  } else if (next.type == Caman.ProcessType.LAYER_FINISHED) {
    this.applyCurrentLayer();
    this.popContext();
    this.processNext();
  } else if (next.type == Caman.ProcessType.LOAD_OVERLAY) {
    this.loadOverlay(next.layer, next.src);
  } else if (next.type == Caman.ProcessType.PLUGIN) {
    this.executePlugin(next.plugin, next.args);
  } else {
    this.executeFilter(next.adjust, next.processFn, next.type);
  }
};

/*
 * Convolution kernel processing
 */
Caman.extend( Caman, {  
  processKernel: function (adjust, kernel, divisor, bias) {
    var val = {r: 0, g: 0, b: 0};
    
    for (var i = 0, len = adjust.length; i < len; i++) {
      val.r += adjust[i] * kernel[i * 3];
      val.g += adjust[i] * kernel[i * 3 + 1];
      val.b += adjust[i] * kernel[i * 3 + 2];
    }
    
    val.r = (val.r / divisor) + bias;
    val.g = (val.g / divisor) + bias;
    val.b = (val.b / divisor) + bias;

    return val;
  }
});

/*
 * The core of the image rendering, this function executes
 * the provided filter and updates the canvas pixel data
 * accordingly. NOTE: this does not write the updated pixel
 * data to the canvas. That happens when all filters are finished
 * rendering in order to be as fast as possible.
 */
Caman.manip.executeFilter = function (adjust, processFn, type) {
  var n = this.pixel_data.length,
  res = null,
  
  // (n/4) == # of pixels in image
  // Give remaining pixels to last block in case it doesn't
  // divide evenly.
  blockPixelLength = Math.floor((n / 4) / Caman.renderBlocks),
  
  // expand it again to make the loop easier.
  blockN = blockPixelLength * 4,
  
  // add the remainder pixels to the last block.
  lastBlockN = blockN + ((n / 4) % Caman.renderBlocks) * 4,

  self = this,
  
  blocks_done = 0,
  
  // Called whenever a block finishes. It's used to determine when all blocks
  // finish rendering.
  block_finished = function (bnum) {
    if (bnum >= 0) {
      console.log("Block #" + bnum + " finished! Filter: " + processFn.name);
    }
    
    blocks_done++;

    if (blocks_done == Caman.renderBlocks || bnum == -1) {
      if (bnum >= 0) {
        console.log("Filter " + processFn.name + " finished!");
      } else {
        console.log("Kernel filter finished!");
      }
      
      Caman.trigger("processComplete", {id: self.canvas_id, completed: processFn.name});
      
      self.processNext();
    }
  },
  
  /*
   * Renders a block of the image bounded by the start and end
   * parameters.
   */
  render_block = function (bnum, start, end) {
    console.log("BLOCK #" + bnum + " - Filter: " + processFn.name + ", Start: " + start + ", End: " + end);
    
    setTimeout(function () {
      var data = {r: 0, g: 0, b: 0, a: 0};
      var pixelInfo = new self.pixelInfo(self);
      
      for (var i = start; i < end; i += 4) {
        pixelInfo.loc = i;
        data.r = self.pixel_data[i];
        data.g = self.pixel_data[i+1];
        data.b = self.pixel_data[i+2];
        data.a = self.pixel_data[i+3];
        
        res = processFn.call(pixelInfo, adjust, data);
        
        self.pixel_data[i]   = res.r;
        self.pixel_data[i+1] = res.g;
        self.pixel_data[i+2] = res.b;
        self.pixel_data[i+3] = res.a;
      }
      
      block_finished(bnum);
    }, 0);
  },
  
  render_kernel = function () {
    setTimeout(function () {
      var kernel = [],
      pixelInfo, pixel,
      start, end, 
      mod_pixel_data,
      name = adjust.name,
      bias = adjust.bias,
      divisor = adjust.divisor,
      adjustSize,
      builder, builder_index,
      i, j, k;
      
      adjust = adjust.adjust;
      adjustSize = Math.sqrt(adjust.length);
      
      mod_pixel_data = [];
      
      console.log("Rendering kernel - Filter: " + name);
      
      start = self.dimensions.width * 4 * ((adjustSize - 1) / 2);
      end = n - (self.dimensions.width * 4 * ((adjustSize - 1) / 2));
      
      builder = (adjustSize - 1) / 2;
      pixelInfo = new self.pixelInfo(self);
      
      for (i = start; i < end; i += 4) {
        pixelInfo.loc = i;
        
        builder_index = 0;
        for (j = -builder; j <= builder; j++) {
          for (k = builder; k >= -builder; k--) {
            pixel = pixelInfo.getPixelRelative(j, k);
            kernel[builder_index * 3]     = pixel.r;
            kernel[builder_index * 3 + 1] = pixel.g;
            kernel[builder_index * 3 + 2] = pixel.b;
            
            builder_index++;
          }
        }
                
        // Execute the kernel processing function
        res = processFn.call(pixelInfo, adjust, kernel, divisor, bias);

        // Update the new pixel array since we can't modify the original
        // until the convolutions are finished on the entire image.
        mod_pixel_data[i]   = res.r;
        mod_pixel_data[i+1] = res.g;
        mod_pixel_data[i+2] = res.b;
        mod_pixel_data[i+3] = 255;
      }

      // Update the actual canvas pixel data. Unfortunately we have to set
      // this one by one.
      for (i = start; i < end; i++) {
        self.pixel_data[i] = mod_pixel_data[i];
      }
      
      block_finished(-1);
      
    }, 0);
  };
  
  Caman.trigger("processStart", {id: this.canvas_id, start: processFn.name});
  
  if (type === Caman.ProcessType.SINGLE) {
    // Split the image into its blocks.
    for (var j = 0; j < Caman.renderBlocks; j++) {
     var start = j * blockN,
     end = start + ((j == Caman.renderBlocks - 1) ? lastBlockN : blockN);
     render_block(j, start, end);
    }
  } else {
    render_kernel();
  }
};

Caman.extend(Caman.manip, {
  revert: function (ready) {
    this.loadCanvas(this.options.image, this.options.canvas, ready);
  },
  
  render: function (callback) {
    this.processNext(function () {
      this.context.putImageData(this.image_data, 0, 0);
      
      if (typeof callback === 'function') {
        callback.call(this);
      }
    });    
  }
});

}(Caman));
/*
 * CamanJS layering system. Supports layer grouping and layer
 * ordering. Layers are blended into the parent layer using a variety
 * of blending functions, similar to what you would find in Photoshop
 * or GIMP.
 */
 
(function (Caman) {

Caman.manip.loadOverlay = function (layer, src) {
  var proxyUrl = Caman.remoteCheck(src),
  self = this;
  
  if (proxyUrl) {
    src = proxyUrl;
  }
  
  var img = document.createElement('img');
  img.onload = function () {
    layer.context.drawImage(img, 0, 0, self.dimensions.width, self.dimensions.height);
    layer.image_data = layer.context.getImageData(0, 0, self.dimensions.width, self.dimensions.height);
    layer.pixel_data = layer.image_data.data;
    
    self.pixel_data = layer.pixel_data;
    
    self.processNext();
  };
  img.src = src;
};

Caman.manip.canvasLayer = function (manip) {  
  // Default options
  this.options = {
    blendingMode: 'normal',
    opacity: 1.0
  };
  
  // Create a blank and invisible canvas and append it to the document
  this.layerID = Caman.uniqid.get();
  this.canvas = document.createElement('canvas');
  this.canvas.width = manip.dimensions.width;
  this.canvas.height = manip.dimensions.height;
  this.canvas.style.display = 'none';
  
  this.context = this.canvas.getContext("2d");
  this.context.createImageData(this.canvas.width, this.canvas.height);
  this.image_data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
  this.pixel_data = this.image_data.data;

  this.__defineGetter__("filter", function () {
    return manip;
  });

  return this;
};

Caman.manip.canvasLayer.prototype.newLayer = function (callback) {
  return this.filter.newLayer.call(this.filter, callback);
};

Caman.manip.canvasLayer.prototype.setBlendingMode = function (mode) {
  this.options.blendingMode = mode;
  return this;
};

Caman.manip.canvasLayer.prototype.opacity = function (opacity) {
  this.options.opacity = (opacity / 100);
  return this;
};

Caman.manip.canvasLayer.prototype.copyParent = function () {
  var parentData = this.filter.pixel_data;
  
  for (var i = 0; i < this.pixel_data.length; i += 4) {
    this.pixel_data[i]    = parentData[i];
    this.pixel_data[i+1]  = parentData[i+1];
    this.pixel_data[i+2]  = parentData[i+2];
    this.pixel_data[i+3]  = parentData[i+3];
  }
  
  return this;
};

Caman.manip.canvasLayer.prototype.fillColor = function () {
  this.filter.fillColor.apply(this.filter, arguments);
  return this;
};

Caman.manip.canvasLayer.prototype.overlayImage = function (image) {
  if (image[0] == '#') {
    image = Caman.Caman.$(image).src;
  } else if (typeof image === "object") {
    image = image.src;
  }
  
  // Some problem, skip to prevent errors
  if (!image) return;
  
  this.filter.renderQueue.push({type: Caman.ProcessType.LOAD_OVERLAY, src: image, layer: this});
  
  return this;
};

// Leaving this here for compatibility reasons. It is NO
// LONGER REQUIRED at the end of the layer.
Caman.manip.canvasLayer.prototype.render = function () {};

Caman.manip.canvasLayer.prototype.applyToParent = function () {
  var parentData = this.filter.pixelStack[this.filter.pixelStack.length - 1],
  layerData = this.filter.pixel_data,
  rgbaParent = {},
  rgbaLayer = {},
  result = {};

  for (var i = 0; i < layerData.length; i += 4) {
    rgbaParent = {
      r: parentData[i],
      g: parentData[i+1],
      b: parentData[i+2],
      a: parentData[i+3]
    };
    
    rgbaLayer = {
      r: layerData[i],
      g: layerData[i+1],
      b: layerData[i+2],
      a: layerData[i+3]
    };
    
    result = this.blenders[this.options.blendingMode](rgbaLayer, rgbaParent);
    
    result.r = Caman.clampRGB(result.r);
    result.g = Caman.clampRGB(result.g);
    result.b = Caman.clampRGB(result.b);
    
    parentData[i]   = rgbaParent.r - ((rgbaParent.r - result.r) * (this.options.opacity * (result.a / 255)));
    parentData[i+1] = rgbaParent.g - ((rgbaParent.g - result.g) * (this.options.opacity * (result.a / 255)));
    parentData[i+2] = rgbaParent.b - ((rgbaParent.b - result.b) * (this.options.opacity * (result.a / 255)));
    parentData[i+3] = 255;
  }
};

// Blending functions
Caman.manip.canvasLayer.prototype.blenders = {
  normal: function (rgbaLayer, rgbaParent) {
    return {
      r: rgbaLayer.r,
      g: rgbaLayer.g,
      b: rgbaLayer.b,
      a: 255
    };
  },
  
  multiply: function (rgbaLayer, rgbaParent) {
    return {
      r: (rgbaLayer.r * rgbaParent.r) / 255,
      g: (rgbaLayer.g * rgbaParent.g) / 255,
      b: (rgbaLayer.b * rgbaParent.b) / 255,
      a: 255
    };
  },
  
  screen: function (rgbaLayer, rgbaParent) {
    return {
      r: 255 - (((255 - rgbaLayer.r) * (255 - rgbaParent.r)) / 255),
      g: 255 - (((255 - rgbaLayer.g) * (255 - rgbaParent.g)) / 255),
      b: 255 - (((255 - rgbaLayer.b) * (255 - rgbaParent.b)) / 255),
      a: 255
    };
  },
  
  overlay: function (rgbaLayer, rgbaParent) {
    var result = {};
    result.r = 
      (rgbaParent.r > 128) ? 
        255 - 2 * (255 - rgbaLayer.r) * (255 - rgbaParent.r) / 255: 
        (rgbaParent.r * rgbaLayer.r * 2) / 255;
        
    result.g = 
      (rgbaParent.g > 128) ? 
        255 - 2 * (255 - rgbaLayer.g) * (255 - rgbaParent.g) / 255: 
        (rgbaParent.g * rgbaLayer.g * 2) / 255;
        
    result.b = 
      (rgbaParent.b > 128) ? 
        255 - 2 * (255 - rgbaLayer.b) * (255 - rgbaParent.b) / 255: 
        (rgbaParent.b * rgbaLayer.b * 2) / 255;
    
    result.a = 255;
    return result;
  },
  
  difference: function (rgbaLayer, rgbaParent) {
    return {
      r: rgbaLayer.r - rgbaParent.r,
      g: rgbaLayer.g - rgbaParent.g,
      b: rgbaLayer.b - rgbaParent.b,
      a: 255
    };
  },
  
  addition: function (rgbaLayer, rgbaParent) {
    return {
      r: rgbaParent.r + rgbaLayer.r,
      g: rgbaParent.g + rgbaLayer.g,
      b: rgbaParent.b + rgbaLayer.b,
      a: 255
    };
  },
  
  exclusion: function (rgbaLayer, rgbaParent) {
    return {
      r: 128 - 2 * (rgbaParent.r - 128) * (rgbaLayer.r - 128) / 255,
      g: 128 - 2 * (rgbaParent.g - 128) * (rgbaLayer.g - 128) / 255,
      b: 128 - 2 * (rgbaParent.b - 128) * (rgbaLayer.b - 128) / 255,
      a: 255
    };
  },
  
  softLight: function (rgbaLayer, rgbaParent) {
    var result = {};
    
    result.r = 
      (rgbaParent.r > 128) ? 
        255 - ((255 - rgbaParent.r) * (255 - (rgbaLayer.r - 128))) / 255 : 
        (rgbaParent.r * (rgbaLayer.r + 128)) / 255;
      
    result.g = 
      (rgbaParent.g > 128) ? 
        255 - ((255 - rgbaParent.g) * (255 - (rgbaLayer.g - 128))) / 255 : 
        (rgbaParent.g * (rgbaLayer.g + 128)) / 255;
    
    result.b = (rgbaParent.b > 128) ? 
      255 - ((255 - rgbaParent.b) * (255 - (rgbaLayer.b - 128))) / 255 : 
      (rgbaParent.b * (rgbaLayer.b + 128)) / 255;
      
    result.a = 255;
    return result;
  }
};

Caman.manip.blenders = Caman.manip.canvasLayer.prototype.blenders;

Caman.manip.canvasQueue = [];

Caman.manip.newLayer = function (callback) {
  var layer = new Caman.manip.canvasLayer(this);
  this.canvasQueue.push(layer);

  this.renderQueue.push({type: Caman.ProcessType.LAYER_DEQUEUE});  
  callback.call(layer);
  this.renderQueue.push({type: Caman.ProcessType.LAYER_FINISHED});

  return this;
};

Caman.manip.executeLayer = function (layer) {
  this.pushContext(layer);
  this.processNext();
};

Caman.manip.pushContext = function (layer) {
  console.log("PUSH LAYER!");
  
  this.layerStack.push(this.currentLayer);
  this.pixelStack.push(this.pixel_data);
  
  this.currentLayer = layer;
  this.pixel_data = layer.pixel_data;
};

Caman.manip.popContext = function () {
  console.log("POP LAYER!");
  
  this.pixel_data = this.pixelStack.pop();
  this.currentLayer = this.layerStack.pop();
};

Caman.manip.applyCurrentLayer = function () {
  this.currentLayer.applyToParent();
};

}(Caman));
/*!
 * Below are all of the built-in filters that are a part
 * of the CamanJS core library.
 */
 
(function(Caman) {
  Caman.manip.fillColor = function () {
    var color;
    if (arguments.length == 1) {
      color = Caman.hex_to_rgb(arguments[0]);
    } else {
      color = {
        r: arguments[0],
        g: arguments[1],
        b: arguments[2]
      };
    }
    
    return this.process( color, function fillColor(color, rgba) {
      rgba.r = color.r;
      rgba.g = color.g;
      rgba.b = color.b;
      rgba.a = 255;
      
      return rgba;
    });
  };

  Caman.manip.brightness = function(adjust) {
    
    adjust = Math.floor(255 * (adjust / 100));
    
    return this.process( adjust,  function brightness(adjust, rgba) {
      rgba.r += adjust;
      rgba.g += adjust;
      rgba.b += adjust;
      
      return rgba;
    });
  };

  Caman.manip.saturation = function(adjust) {
    var max, diff;
    adjust *= -0.01;
    
    return this.process( adjust, function saturation(adjust, rgba) {
      var chan;
      
      max = Math.max(rgba.r, rgba.g, rgba.b);
      
      if (rgba.r !== max) {
        diff = max - rgba.r;
        rgba.r += diff * adjust;
      }
      
      if (rgba.g !== max) {
        diff = max - rgba.g;
        rgba.g += diff * adjust; 
      }
      
      if (rgba.b !== max) {
        diff = max - rgba.b;
        rgba.b += diff * adjust;
      }
      
      return rgba;
    });
  };
  
  Caman.manip.vibrance = function (adjust) {
    var max, avg, amt, diff;
    adjust *= -1;
    
    return this.process( adjust, function vibrance(adjust, rgba) {
      var chan;
      
      max = Math.max(rgba.r, rgba.g, rgba.b);
      
      // Calculate difference between max color and other colors
      avg = (rgba.r + rgba.g + rgba.b) / 3;
      amt = ((Math.abs(max - avg) * 2 / 255) * adjust) / 100;
      
      if (rgba.r !== max) {
        diff = max - rgba.r;
        rgba.r += diff * amt;
      }
      
      if (rgba.g !== max) {
        diff = max - rgba.g;
        rgba.g += diff * amt;
      }
      
      if (rgba.b !== max) {
        diff = max - rgba.b;
        rgba.b += diff * amt;
      }
      
      return rgba;
    });
  };
  
  /*
   * An improved greyscale function that should make prettier results
   * than simply using the saturation filter to remove color. There are
   * no arguments, it simply makes the image greyscale with no in-between.
   *
   * Algorithm adopted from http://www.phpied.com/image-fun/
   */
  Caman.manip.greyscale = function () {
    return this.process({}, function greyscale(adjust, rgba) {
      var avg = 0.3 * rgba.r + 0.59 * rgba.g + 0.11 * rgba.b;
      
      rgba.r = avg;
      rgba.g = avg;
      rgba.b = avg;
      
      return rgba;
    });
  };
  
  Caman.manip.contrast = function(adjust) {
    adjust = (adjust + 100) / 100;
    adjust = Math.pow(adjust, 2);

    return this.process( adjust, function contrast(adjust, rgba) {
      /* Red channel */
      rgba.r /= 255;
      rgba.r -= 0.5;
      rgba.r *= adjust;
      rgba.r += 0.5;
      rgba.r *= 255;
      
      /* Green channel */
      rgba.g /= 255;
      rgba.g -= 0.5;
      rgba.g *= adjust;
      rgba.g += 0.5;
      rgba.g *= 255;
      
      /* Blue channel */
      rgba.b /= 255;
      rgba.b -= 0.5;
      rgba.b *= adjust;
      rgba.b += 0.5;
      rgba.b *= 255;
      
      // While uglier, I found that using if statements are
      // faster than calling Math.max() and Math.min() to bound
      // the numbers.
      if (rgba.r > 255) {
        rgba.r = 255;
      } else if (rgba.r < 0) {
        rgba.r = 0;
      }
      
      if (rgba.g > 255) {
        rgba.g = 255;
      } else if (rgba.g < 0) {
        rgba.g = 0;
      }
      
      if (rgba.b > 255) {
        rgba.b = 255;
      } else if (rgba.b < 0) {
        rgba.b = 0;
      }
              
      return rgba;
    });
  };
  
  Caman.manip.hue = function(adjust) {
    var hsv, h;

    return this.process( adjust, function hue(adjust, rgba) {
      var rgb;
      
      hsv = Caman.rgb_to_hsv(rgba.r, rgba.g, rgba.b);
      h = hsv.h * 100;
      h += Math.abs(adjust);
      h = h % 100;
      h /= 100;
      hsv.h = h;
      
      rgb = Caman.hsv_to_rgb(hsv.h, hsv.s, hsv.v);
      
      return {r: rgb.r, g: rgb.g, b: rgb.b, a: rgba.a};
    });
  };
  
  Caman.manip.colorize = function() {
    var diff, rgb, level;
            
    if (arguments.length === 2) {
      rgb = Caman.hex_to_rgb(arguments[0]);
      level = arguments[1];
    } else if (arguments.length === 4) {
      rgb = {
        r: arguments[0],
        g: arguments[1],
        b: arguments[2]        
      };
      
      level = arguments[3];
    }
    
    return this.process( [ level, rgb ],  function colorize( adjust, rgba) {
        // adjust[0] == level; adjust[1] == rgb;
        rgba.r -= (rgba.r - adjust[1].r) * (adjust[0] / 100);
        rgba.g -= (rgba.g - adjust[1].g) * (adjust[0] / 100);
        rgba.b -= (rgba.b - adjust[1].b) * (adjust[0] / 100);
        
        return rgba;
    });
  };
  
  Caman.manip.invert = function () {
    return this.process({}, function invert (adjust, rgba) {
      rgba.r = 255 - rgba.r;
      rgba.g = 255 - rgba.g;
      rgba.b = 255 - rgba.b;
      
      return rgba;
    });
  };
  
  /*
   * Applies a sepia filter to the image. Assumes adjustment is between 0 and 100,
   * which represents how much the sepia filter is applied.
   */
  Caman.manip.sepia = function (adjust) {
    if (adjust === undefined) {
      adjust = 100;
    }
    
    adjust = (adjust / 100);
    
    return this.process(adjust, function sepia (adjust, rgba) {
      rgba.r = Math.min(255, (rgba.r * (1 - (0.607 * adjust))) + (rgba.g * (0.769 * adjust)) + (rgba.b * (0.189 * adjust)));
      rgba.g = Math.min(255, (rgba.r * (0.349 * adjust)) + (rgba.g * (1 - (0.314 * adjust))) + (rgba.b * (0.168 * adjust)));
      rgba.b = Math.min(255, (rgba.r * (0.272 * adjust)) + (rgba.g * (0.534 * adjust)) + (rgba.b * (1- (0.869 * adjust))));
      
      return rgba;
    });
  };
  
  /*
   * Adjusts the gamma of the image. I would stick with low values to be safe.
   */
  Caman.manip.gamma = function (adjust) {
    return this.process(adjust, function gamma(adjust, rgba) {
      rgba.r = Math.pow(rgba.r / 255, adjust) * 255;
      rgba.g = Math.pow(rgba.g / 255, adjust) * 255;
      rgba.b = Math.pow(rgba.b / 255, adjust) * 255;
      
      return rgba;
    });
  };
  
  /*
   * Adds noise to the image on a scale from 1 - 100
   * However, the scale isn't constrained, so you can specify
   * a value > 100 if you want a LOT of noise.
   */
  Caman.manip.noise = function (adjust) {
    adjust = Math.abs(adjust) * 2.55;
    return this.process(adjust, function noise(adjust, rgba) {
      var rand = Caman.randomRange(adjust*-1, adjust);
      rgba.r += rand;
      rgba.g += rand;
      rgba.b += rand;
      
      return rgba;
    });
  };
  
  /*
   * Clips a color to max values when it falls outside of the specified range.
   * User supplied value should be between 0 and 100.
   */
  Caman.manip.clip = function (adjust) {
    adjust = Math.abs(adjust) * 2.55;
    return this.process(adjust, function clip(adjust, rgba) {
      if (rgba.r > 255 - adjust) {
        rgba.r = 255;
      } else if (rgba.r < adjust) {
        rgba.r = 0;
      }
      
      if (rgba.g > 255 - adjust) {
        rgba.g = 255;
      } else if (rgba.g < adjust) {
        rgba.g = 0;
      }
      
      if (rgba.b > 255 - adjust) {
        rgba.b = 255;
      } else if (rgba.b < adjust) {
        rgba.b = 0;
      }
      
      return rgba;
    });
  };
  
  /*
   * Lets you modify the intensity of any combination of red, green, or blue channels.
   * Options format (must specify 1 - 3 colors):
   * {
   *  red: 20,
   *  green: -5,
   *  blue: -40
   * }
   */
  Caman.manip.channels = function (options) {
    if (typeof(options) !== 'object') {
      return;
    }
    
    for (var chan in options) {
      if (options.hasOwnProperty(chan)) {
        if (options[chan] === 0) {
          delete options[chan];
          continue;
        }
        
        options[chan] = options[chan] / 100;
      }
    }
    
    if (options.length === 0) {
      return;
    }
    
    return this.process(options, function channels(options, rgba) {
      if (options.red) {
        if (options.red > 0) {
          // fraction of the distance between current color and 255
          rgba.r = rgba.r + ((255 - rgba.r) * options.red);
        } else {
          rgba.r = rgba.r - (rgba.r * Math.abs(options.red));
        }
      }
      
      if (options.green) {
        if (options.green > 0) {
          rgba.g = rgba.g + ((255 - rgba.g) * options.green);
        } else {
          rgba.g = rgba.g - (rgba.g * Math.abs(options.green));
        }
      }
      
      if (options.blue) {
        if (options.blue > 0) {
          rgba.b = rgba.b + ((255 - rgba.b) * options.blue);
        } else {
          rgba.b = rgba.b - (rgba.b * Math.abs(options.blue));
        }
      }
      
      return rgba;
    });
  };
  
  /*
   * Curves implementation using Bezier curve equation.
   *
   * Params:
   *    chan - [r, g, b, rgb]
   *    start - [x, y] (start of curve; 0 - 255)
   *    ctrl1 - [x, y] (control point 1; 0 - 255)
   *    ctrl2 - [x, y] (control point 2; 0 - 255)
   *    end   - [x, y] (end of curve; 0 - 255)
   */
  Caman.manip.curves = function (chan, start, ctrl1, ctrl2, end) {
    var bezier, i;
    
    if (typeof chan === 'string') {
      if (chan == 'rgb') {
        chan = ['r', 'g', 'b'];
      } else {
        chan = [chan];
      }
    }
    
    bezier = Caman.bezier(start, ctrl1, ctrl2, end, 0, 255);
    
    // If our curve starts after x = 0, initialize it with a flat line until
    // the curve begins.
    if (start[0] > 0) {
      for (i = 0; i < start[0]; i++) {
        bezier[i] = start[1];
      }
    }
    
    // ... and the same with the end point
    if (end[0] < 255) {
      for (i = end[0]; i <= 255; i++) {
        bezier[i] = end[1];
      }
    }
    
    return this.process({bezier: bezier, chans: chan}, function curves(opts, rgba) {
      for (var i = 0; i < opts.chans.length; i++) {
        rgba[opts.chans[i]] = opts.bezier[rgba[opts.chans[i]]];
      }
      
      return rgba;
    });
  };
  
  /*
   * Adjusts the exposure of the image by using the curves function.
   */
  Caman.manip.exposure = function (adjust) {
    var p, ctrl1, ctrl2;
    
    p = Math.abs(adjust) / 100;
    

    ctrl1 = [0, (255 * p)];
    ctrl2 = [(255 - (255 * p)), 255];
    
    if (adjust < 0) {
      ctrl1 = ctrl1.reverse();
      ctrl2 = ctrl2.reverse();
    }
    
    return this.curves('rgb', [0, 0], ctrl1, ctrl2, [255, 255]);
  };

}(Caman));
