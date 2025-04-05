(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GeoJSON2SVG = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const {GeoJSON2SVG} = require('./src/index.js');
module.exports = GeoJSON2SVG;

},{"./src/index.js":6}],2:[function(require,module,exports){
'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
var setProperty = function setProperty(target, options) {
	if (defineProperty && options.name === '__proto__') {
		defineProperty(target, options.name, {
			enumerable: true,
			configurable: true,
			value: options.newValue,
			writable: true
		});
	} else {
		target[options.name] = options.newValue;
	}
};

// Return undefined instead of __proto__ if '__proto__' is not an own property
var getProperty = function getProperty(obj, name) {
	if (name === '__proto__') {
		if (!hasOwn.call(obj, name)) {
			return void 0;
		} else if (gOPD) {
			// In early versions of node, obj['__proto__'] is buggy when obj has
			// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
			return gOPD(obj, name).value;
		}
	}

	return obj[name];
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = getProperty(target, name);
				copy = getProperty(options, name);

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						setProperty(target, { name: name, newValue: copy });
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};

},{}],3:[function(require,module,exports){
module.exports = function(gj) {
  var coords, bbox;
  if (!gj.hasOwnProperty('type')) return;
  coords = getCoordinatesDump(gj);
  bbox = [ Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,];
  return coords.reduce(function(prev,coord) {
    return [
      Math.min(coord[0], prev[0]),
      Math.min(coord[1], prev[1]),
      Math.max(coord[0], prev[2]),
      Math.max(coord[1], prev[3])
    ];
  }, bbox);
};

function getCoordinatesDump(gj) {
  var coords;
  if (gj.type == 'Point') {
    coords = [gj.coordinates];
  } else if (gj.type == 'LineString' || gj.type == 'MultiPoint') {
    coords = gj.coordinates;
  } else if (gj.type == 'Polygon' || gj.type == 'MultiLineString') {
    coords = gj.coordinates.reduce(function(dump,part) {
      return dump.concat(part);
    }, []);
  } else if (gj.type == 'MultiPolygon') {
    coords = gj.coordinates.reduce(function(dump,poly) {
      return dump.concat(poly.reduce(function(points,part) {
        return points.concat(part);
      },[]));
    },[]);
  } else if (gj.type == 'Feature') {
    coords =  getCoordinatesDump(gj.geometry);
  } else if (gj.type == 'GeometryCollection') {
    coords = gj.geometries.reduce(function(dump,g) {
      return dump.concat(getCoordinatesDump(g));
    },[]);
  } else if (gj.type == 'FeatureCollection') {
    coords = gj.features.reduce(function(dump,f) {
      return dump.concat(getCoordinatesDump(f));
    },[]);
  }
  return coords;
}

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
//converter.js
var multi = require('multigeojson');

function getCoordString(coords,res,origin, precision, opt) {
  //origin - svg image origin
  var convertedCoords = coords.map(function(coord) {
    if (opt.coordinateConverter) {
      coord = opt.coordinateConverter(coord);
    }
    return [(coord[0] - origin.x)/res, (origin.y - coord[1])/res];
  });
  var coordStr = convertedCoords.map(function (coord) {
    if (precision) {
      return coord[0].toFixed(precision) + ',' + coord[1].toFixed(precision);
    } else {
      return coord[0] + ',' + coord[1];
    }
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
  var pointAsCircle = opt && opt.hasOwnProperty('pointAsCircle')
    ? opt.pointAsCircle : false;
  var coords = getCoordString([geom.coordinates],res,origin,opt.precision, opt);
  if (pointAsCircle) {
    return [coords];
  } else {
    return [
      'M' + coords
      + ' m'+ -r+ ',0'+ ' a'+r+','+ r + ' 0 1,1 '+ 2*r + ','+0
      + ' a'+r+','+ r + ' 0 1,1 '+ -2*r + ','+0
    ];
  }
}
function multiPoint(geom,res,origin,opt) {
  var explode = opt && opt.hasOwnProperty('explode') ? opt.explode : false;
  var paths = multi.explode(geom).map(function(single) {
    return point(single,res,origin,opt)[0];
  });
  if(!explode) return [paths.join(' ')];
  return paths;

}
function lineString(geom,res,origin,opt) {
  var coords = getCoordString(geom.coordinates,res,origin,opt.precision, opt);
  var path = 'M'+ coords;
  return [path];
}
function multiLineString(geom,res,origin,opt) {
  var explode = opt && opt.hasOwnProperty('explode') ? opt.explode : false;
  var paths = multi.explode(geom).map(function(single) {
    return lineString(single,res,origin,opt)[0];
  });
  if(!explode) return [paths.join(' ')];
  return paths;
}
function polygon(geom,res,origin,opt) {
  var mainStr,holes,holeStr;
  mainStr = getCoordString(geom.coordinates[0],res,origin,opt.precision, opt);
  if (geom.coordinates.length > 1) {
    holes = geom.coordinates.slice(1,geom.coordinates.length);
  }
  var path = 'M'+ mainStr;
  if(holes) {
    for(var i=0;i<holes.length; i++) {
      path += ' M' +  getCoordString(holes[i],res,origin,opt.precision, opt);
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

},{"multigeojson":4}],6:[function(require,module,exports){
var bbox = require('geojson-bbox');
var extend = require('extend');
var converter = require('./converter.js');

var GeoJSON2SVG = function(options = {}) {
  if (!options.mapExtent) {
    // throw new
    //   Error('One of the parameter is must: mapExtent or mapExtentFromGeojson');
    this.mapExtentFromGeojson = true;
  } else {
    this.mapExtentFromGeojson = options.mapExtentFromGeojson;
  }
  if (options.fitTo && !/^(width|height)$/i.test(options.fitTo)) {
    throw new Error('"fitTo" option should be "width" or "height" ');
  }
  this.options = options;
  this.viewportSize = options.viewportSize ||
    {width: 256, height: 256};
  if (options.coordinateConverter
    && typeof options.coordinateConverter != 'function')
  {
    throw new Error('"coordinateConverter" option should be function');
  }
  this.coordinateConverter = options.coordinateConverter;
  if (options.mapExtent && this.coordinateConverter) {
    var rightTop = this.coordinateConverter(
      [options.mapExtent.right, options.mapExtent.top]);
    var leftBottom = this.coordinateConverter(
      [options.mapExtent.left, options.mapExtent.bottom]);
    this.mapExtent = {
      left: leftBottom[0], bottom: leftBottom[1],
      right: rightTop[0], top: rightTop[1]
    };
  } else {
    // yes, it may be undefined in case of mapExtentFromGeojson is true
    this.mapExtent = options.mapExtent;
  }
  if (this.mapExtent) {
    this.res = this.calResolution(this.mapExtent,this.viewportSize,
      this.options.fitTo);
  }
};
function convertExtent (extent, converter) {
  var leftBottom = converter([extent[0], extent[1]]);
  var rightTop = converter([extent[2], extent[3]]);
  return [...leftBottom, ...rightTop];
}
GeoJSON2SVG.prototype.calResolution = function(extent,size,fitTo) {
  var xres = (extent.right - extent.left)/size.width;
  var yres = (extent.top - extent.bottom)/size.height;
  if (fitTo) {
    if (fitTo.toLowerCase() === 'width') {
      return xres;
    } else if (fitTo.toLowerCase() === 'height') {
      return yres;
    } else {
      throw new Error('"fitTo" option should be "width" or "height" ');
    }
  } else {
    return Math.max(xres,yres);
  }
};
GeoJSON2SVG.prototype.convert = function(geojson,options) {
  var resetExtent = false;
  if (!this.res && this.mapExtentFromGeojson) {
    var resetExtent = true;
    var extent = bbox(geojson); // output extent is an array
    if (this.coordinateConverter) {
      // var rightTop = this.coordinateConverter(extent[2] , extent[3]);
      // var leftBottom = this.coordinateConverter(extent[0], extent[1]);
      // extent = [leftBottom[0], leftBottom[1],
      //   rightTop[0], rightTop[1]];
      extent = convertExtent(extent, this.coordinateConverter);
    }
    this.mapExtent = {
      left: extent[0], bottom: extent[1],
      right: extent[2], top: extent[3]
    };
    this.res = this.calResolution(
      this.mapExtent, this.viewportSize, this.options.fitTo);
  }
  var opt = extend(true, {}, this.options, options || {});
  var multiGeometries = ['MultiPoint','MultiLineString','MultiPolygon'];
  var geometries = ['Point', 'LineString', 'Polygon'];
  var svgElements = [];
  if (geojson.type == 'FeatureCollection') {
    for(var i=0; i< geojson.features.length; i++) {
      svgElements = svgElements.concat(
        this.convertFeature(geojson.features[i],opt));
    }
  } else if (geojson.type == 'Feature') {
    svgElements = this.convertFeature(geojson,opt);
  } else if (geojson.type == 'GeometryCollection') {
    for(var i=0; i< geojson.geometries.length; i++) {
      svgElements = svgElements.concat(
        this.convertGeometry(geojson.geometries[i],opt));
    }
  } else if (converter[geojson.type]) {
    svgElements = this.convertGeometry(geojson,opt);
  } else {
    throw new Error('Geojson type not supported.');
  }
  if (resetExtent) {
    this.res = null;
    this.mapExtent = null;
  }
  if(opt.callback) opt.callback.call(this,svgElements);
  return svgElements;
};
GeoJSON2SVG.prototype.convertFeature = function(feature,options) {
  if(!feature && !feature.geometry) return;
  var opt = extend(true, {}, this.options, options || {});
  if (opt.attributes && opt.attributes instanceof Array) {
    var arr = opt.attributes
    opt.attributes = arr.reduce(function(sum, property) {
      if (typeof(property) === 'string') {
        var val, key = property.split('.').pop()
        try {
          val = valueAt(feature, property)
        } catch(e) {
          val = undefined
        }
        if (val !== undefined) sum[key] = val
      } else if (typeof(property) === 'object' && property.type
        && property.property)
      {
        if (property.type === 'dynamic') {
          var val, key = property.key ? property.key
            : property.property.split('.').pop()
          try {
            val = valueAt(feature, property.property)
          } catch(e) {
            val = undefined
          }
          if (val !== undefined) sum[key] = val
        } else if (property.type === 'static'  && property.value) {
          sum[property.property] = property.value
        }
      }
      return sum
    }, {})
  } else {
    opt.attributes = opt.attributes || {};
  }
  var id = opt.attributes.id || feature.id ||
    (feature.properties && feature.properties.id
    ? feature.properties.id : null);
  if (id) opt.attributes.id = id;
  return this.convertGeometry(feature.geometry,opt);
};
GeoJSON2SVG.prototype.convertGeometry = function(geom,options) {
  if(converter[geom.type]) {
    var opt = extend(true, {}, this.options, options || {});
    var output = opt.output || 'svg';
    var paths = converter[geom.type].call(this,geom,
      this.res,
      {x:this.mapExtent.left,y:this.mapExtent.top},
      opt
    );
    var svgJsons,svgEles;
    if (output.toLowerCase() == 'svg') {
      svgJsons = paths.map(function(path) {
        return pathToSvgJson(path,geom.type,opt.attributes,opt);
      });
      svgEles = svgJsons.map(function(json) {
        return jsonToSvgElement(json,geom.type,opt);
      });
      return svgEles;
    } else {
      return paths;
    }
  } else {
    throw new Error('Geojson type not supported.');
  }
};

function pathToSvgJson(path,type,attributes,opt) {
  var svg = {};
  var pointAsCircle = opt && opt.hasOwnProperty('pointAsCircle')
    ? opt.pointAsCircle : false;
  if((type == 'Point' || type == 'MultiPoint') && pointAsCircle) {
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

function jsonToSvgElement(json,type,opt) {
  var pointAsCircle = opt && opt.hasOwnProperty('pointAsCircle')
    ? opt.pointAsCircle : false;
  var ele ='<path';
  if((type == 'Point' || type == 'MultiPoint') && pointAsCircle) {
    ele = '<circle';
  }
  for(var key in json) {
    ele += ' ' + key +'="' + json[key] + '"';
  }
  ele += '/>';
  return ele;
}

function valueAt(obj,path) {
  //taken from http://stackoverflow.com/a/6394168/713573
  function index(prev,cur, i, arr) {
    if (prev.hasOwnProperty(cur)) {
      return prev[cur];
    } else {
      throw new Error(arr.slice(0,i+1).join('.') + ' is not a valid property path');
    }
  }
  return path.split('.').reduce(index, obj);
}
module.exports = {GeoJSON2SVG};

},{"./converter.js":5,"extend":2,"geojson-bbox":3}]},{},[1])(1)
});
//# sourceMappingURL=geojson2svg.js.map
