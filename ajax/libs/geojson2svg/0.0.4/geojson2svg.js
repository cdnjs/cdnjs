!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.geojson2svg=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/*!
 * Node.JS module "Deep Extend"
 * @description Recursive object extending.
 * @author Viacheslav Lotsmanov (unclechu) <lotsmanov89@gmail.com>
 * @license MIT
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Viacheslav Lotsmanov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Extening object that entered in first argument.
 * Returns extended object or false if have no target object or incorrect type.
 * If you wish to clone object, simply use that:
 *  deepExtend({}, yourObj_1, [yourObj_N]) - first arg is new empty object
 */
var deepExtend = module.exports = function (/*obj_1, [obj_2], [obj_N]*/) {
    if (arguments.length < 1 || typeof arguments[0] !== 'object') {
        return false;
    }

    if (arguments.length < 2) return arguments[0];

    var target = arguments[0];

    // convert arguments to array and cut off target object
    var args = Array.prototype.slice.call(arguments, 1);

    var key, val, src, clone;

    args.forEach(function (obj) {
        if (typeof obj !== 'object') return;

        for (key in obj) {
            if ( ! (key in obj)) continue;

            src = target[key];
            val = obj[key];

            if (val === target) continue;

            if (typeof val !== 'object' || val === null) {
                target[key] = val;
                continue;
            }

            if (typeof src !== 'object' || src === null) {
                clone = (Array.isArray(val)) ? [] : {};
                target[key] = deepExtend(clone, val);
                continue;
            }

            if (Array.isArray(val)) {
                clone = (Array.isArray(src)) ? src : [];
            } else {
                clone = (!Array.isArray(src)) ? src : {};
            }

            target[key] = deepExtend(clone, val);
        }
    });

    return target;
}

},{}],2:[function(_dereq_,module,exports){
//index.js 
(function() { 
	var singles = ['Point', 'LineString', 'Polygon'];
	var multies = ['MultiPoint', 'MultiLineString', 'MultiPolygon'];
	function explode(g) {
	  if( multies.indexOf(g.type) > -1) {
	    return g.coordinates.map(function(part) {
	      var single = {};
	      single.type = g.type.replace('Multi','');
	      single.coordinates = part;
        if(g.crs) single.crs = g.crs;
	      return single;
	    });  
	  } else {
	    return false;
	  }
	}
	function implode(gs) {
	  var sameType = gs.every(function(g) { 
	    return singles.indexOf(g.type) > -1;
	  })
    var crs = gs[0].crs || 0;
    var sameCrs = gs.every(function(g) {
      var gcrs = g.crs || 0;
      return gcrs == crs;
    });
	  if(sameType && sameCrs) {
	    var multi = {};
	    multi.type = 'Multi' + gs[0].type;
	    multi.coordinates = [];
      if(crs != 0) multi.crs = crs;
	    gs.forEach(function(g) {
	      multi.coordinates.push(g.coordinates);
	    });
	    return multi;
	  } else {
	    return false;
	  }
	};
	var multigeojson = {
	  explode: explode,
	  implode: implode
	};
	if(typeof module !== 'undefined' && module.exports) {
	  module.exports = multigeojson;
	} else if(window) {
	  window.multigeojson = multigeojson;
	}
})();

},{}],3:[function(_dereq_,module,exports){
//converter.js
var multi = _dereq_('multigeojson');
function getCoordString(coords,res,origin) {
  //origin - svg image origin 
  var coordStr = coords.map(function(coord) {
    return (coord[0] - origin.x)/res + ',' + (origin.y - coord[1])/res;
  });
  return coordStr.join(' ');
}
function addAttributes(ele,attributes) {
  var part = ele.split('/>')[0];
  for(var key in attributes) {
    if(attributes[key]) {
      part += ' ' + key + '="' + attributes[key] + '"';
    }
  }
  return part + ' />';
}

function point(geom,res,origin,opt) {
  var r = opt && opt.r ? opt.r : 1;
  var path = 'M' + getCoordString([geom.coordinates],res,origin)
    +' m'+ -r+ ',0'+ ' a'+r+','+ r + ' 0 1,1 '+ 2*r + ','+0
    +' a'+r+','+ r + ' 0 1,1 '+ -2*r + ','+0;
  return [path];
}
function multiPoint(geom,res,origin,opt) {
  var explode = opt && opt.hasOwnProperty('explode') ? opt.explode : false;
  var paths = multi.explode(geom).map(function(single) {
    return point(single,res,origin,opt)[0];
  });
  if(!explode) return [paths.join(' ')]
  return paths;

}
function lineString(geom,res,origin,otp) {
  var coords = getCoordString(geom.coordinates,res,origin);
  var path = 'M'+ coords;  
  return [path];
}
function multiLineString(geom,res,origin,opt) {
  var explode = opt && opt.hasOwnProperty('explode') ? opt.explode : false;
  var paths = multi.explode(geom).map(function(single) {
    return lineString(single,res,origin,opt)[0];
  });
  if(!explode) return [paths.join(' ')]
  return paths;
}
function polygon(geom,res,origin,opt) {
  var mainStr,holes,holeStr;
  mainStr = getCoordString(geom.coordinates[0],res,origin);
  if (geom.coordinates.length > 1) {
    holes = geom.coordinates.slice(1,geom.coordinates.length);
  }
  var path = 'M'+ mainStr;
  if(holes) {
    for(var i=0;i<holes.length; i++) {
      path += ' M' +  getCoordString(holes[i],res,origin);
    }
  }
  path += 'Z';
  return [path];
}
function multiPolygon(geom,res,origin,opt) {
  var explode = opt.hasOwnProperty('explode') ? opt.explode : false;
  var paths = multi.explode(geom).map(function(single) {
    return polygon(single,res,origin,opt)[0];
  });
  if(!explode) return [paths.join(' ').replace(/Z/g,'') + 'Z'];
  return paths;
}
module.exports = {
  Point: point,
  MultiPoint: multiPoint,
  LineString: lineString,
  MultiLineString: multiLineString,
  Polygon: polygon,
  MultiPolygon: multiPolygon
};

},{"multigeojson":2}],4:[function(_dereq_,module,exports){
var extend = _dereq_('deep-extend'),
	converter = _dereq_('./converter.js');

//g2svg as geojson2svg (shorthand)
var g2svg = function(viewportSize,opt) {
  if(!viewportSize) return;
  this.viewportSize = viewportSize;
  var opt = opt || {};
  this.mapExtent = opt.mapExtent 
    || {'left':-180,'bottom':-90,'right':180,'top':90}; 
  this.res = this.calResolution(this.mapExtent,this.viewportSize);
};
g2svg.prototype.calResolution = function(extent,size) {
  var xres = (extent.right - extent.left)/size.width;
  var yres = (extent.top - extent.bottom)/size.height;
  return Math.max(xres,yres);
};
g2svg.prototype.convert = function(geojson,options)  {
  var options = options || {};
  var multiGeometries = ['MultiPoint','MultiLineString','MultiPolygon'];
  var geometries = ['Point', 'LineString', 'Polygon'];
  var svgElements = [];
  if (geojson.type == 'FeatureCollection') {
    for(var i=0; i< geojson.features.length; i++) {
      svgElements = svgElements.concat(
        this.convertFeature(geojson.features[i],options));
    }
  } else if (geojson.type == 'Feature') {
    svgElements = this.convertFeature(geojson,options);
  } else if (geojson.type == 'GeomtryCollection') {
    for(var i=0; i< geojson.geometries.length; i++) {
      svgElements = svgElements.concat(
        this.convertGeometry(geojson.geometries[i],options));
    }
  } else if (converter[geojson.type]) {
    svgElements = this.convertGeometry(geojson,options);
  } else {
    return;
  }
  if(options.callback) options.callback.call(this,svgElements);
  return svgElements;
};
g2svg.prototype.convertFeature = function(feature,options) {
  if(!feature.geometry) return;
  var opt = {};
  extend(opt,options);
  opt.attributes = opt.attributes || {};
  opt.attributes.id = opt.attributes.id || feature.id || null;
  return this.convertGeometry(feature.geometry,opt);
};
g2svg.prototype.convertGeometry = function(geom,opt) {
  if(converter[geom.type]) {
    var opt = opt || {};
    //var explode = opt.hasOwnProperty('explode') ? opt.explode : false;
    var paths = converter[geom.type].call(this,geom,
      this.res,
      {x:this.mapExtent.left,y:this.mapExtent.top},
      opt
    );
    var svgJsons,svgEles;
    if(opt.output && opt.output.toLowerCase() == 'svg') {
      svgJsons = paths.map(function(path) {
        return pathToSvgJson(path,geom.type,opt.attributes,opt);
      });
      svgEles = svgJsons.map(function(json) {
        return jsonToSvgElement(json,geom.type);
      });
      return svgEles;
    }
    return paths;
  } else {
    return;
  }
};
var pathToSvgJson = function(path,type,attributes,opt) {
  var svg = {};
  var forcePath = opt && opt.hasOwnProperty('forcePath') ? opt.forcePath
     : true;
  if((type == 'Point' || type == 'MultiPoint') && !forcePath) {
    svg['cx'] = path.split(',')[0];
    svg['cy'] = path.split(',')[1];
    svg['r'] = opt && opt.r ? opt.r : '1';
  } else {
    svg = {d: path};
    if(type == 'Polygon' || type == 'MultiPolygon') {
      svg['fill-rule'] == 'evenodd'; 
    } 
  }
  for (var key in attributes) {
    svg[key]= attributes[key];
  }
  return svg;
};
var jsonToSvgElement = function(json,type,opt) {
  var forcePath = opt && opt.hasOwnProperty('forcePath') ? opt.forcePath
     : true;
  var ele ='<path';
  if((type == 'Point' || type == 'MultiPoint') && !forcePath) {
    ele = '<circle';
  }
  for(var key in json) {
    ele += ' ' + key +'="' + json[key] + '"';
  }
  ele += '/>';
  return ele;
};

module.exports = g2svg;

},{"./converter.js":3,"deep-extend":1}],5:[function(_dereq_,module,exports){
var g2svg = _dereq_('./instance.js');
var geojson2svg = function(viewportSize,options) {
  if(!viewportSize) return;
  return new g2svg(viewportSize,options);
};

module.exports = geojson2svg;

},{"./instance.js":4}]},{},[5])

(5)
});

//# sourceMappingURL=geojson2svg.js.map