!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.geojson2svg=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/ubuntu/projects/geojson2svg/node_modules/multigeojson/index.js":[function(require,module,exports){
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

},{}],"/home/ubuntu/projects/geojson2svg/node_modules/xtend/immutable.js":[function(require,module,exports){
module.exports = extend

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],"/home/ubuntu/projects/geojson2svg/src/converter.js":[function(require,module,exports){
//converter.js
var multi = require('multigeojson');
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
  if(!explode) return [paths.join(' ')];
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
  if(!explode) return [paths.join(' ')];
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

},{"multigeojson":"/home/ubuntu/projects/geojson2svg/node_modules/multigeojson/index.js"}],"/home/ubuntu/projects/geojson2svg/src/instance.js":[function(require,module,exports){
var extend = require('xtend'),
	converter = require('./converter.js');

//g2svg as geojson2svg (shorthand)
var g2svg = function(viewportSize,options) {
  if(!viewportSize) return;
  this.viewportSize = viewportSize;
  this.options = options || {};
  this.mapExtent = this.options.mapExtent ||
    {
      left: -20037508.342789244,
      right: 20037508.342789244,
      bottom: -20037508.342789244,
      top: 20037508.342789244
    };
  this.res = this.calResolution(this.mapExtent,this.viewportSize);
};
g2svg.prototype.calResolution = function(extent,size) {
  var xres = (extent.right - extent.left)/size.width;
  var yres = (extent.top - extent.bottom)/size.height;
  return Math.max(xres,yres);
};
g2svg.prototype.convert = function(geojson,options)  {
  var opt = extend(extend({},this.options), options || {});
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
  } else if (geojson.type == 'GeomtryCollection') {
    for(var i=0; i< geojson.geometries.length; i++) {
      svgElements = svgElements.concat(
        this.convertGeometry(geojson.geometries[i],opt));
    }
  } else if (converter[geojson.type]) {
    svgElements = this.convertGeometry(geojson,opt);
  } else {
    return;
  }
  if(opt.callback) opt.callback.call(this,svgElements);
  return svgElements;
};
g2svg.prototype.convertFeature = function(feature,options) {
  if(!feature && !feature.geometry) return;
  var opt = extend(extend({},this.options), options || {});
  opt.attributes = opt.attributes || {};
  opt.attributes.id = opt.attributes.id || feature.id || null;
  return this.convertGeometry(feature.geometry,opt);
};
g2svg.prototype.convertGeometry = function(geom,options) {
  if(converter[geom.type]) {
    var opt = extend(extend({},this.options), options || {});
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
        return jsonToSvgElement(json,geom.type);
      });
      return svgEles;
    } else {
      return paths;
    }
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

},{"./converter.js":"/home/ubuntu/projects/geojson2svg/src/converter.js","xtend":"/home/ubuntu/projects/geojson2svg/node_modules/xtend/immutable.js"}],"/home/ubuntu/projects/geojson2svg/src/main.js":[function(require,module,exports){
var g2svg = require('./instance.js');
var geojson2svg = function(viewportSize,options) {
  if(!viewportSize) return;
  return new g2svg(viewportSize,options);
};

module.exports = geojson2svg;

},{"./instance.js":"/home/ubuntu/projects/geojson2svg/src/instance.js"}]},{},["/home/ubuntu/projects/geojson2svg/src/main.js"])("/home/ubuntu/projects/geojson2svg/src/main.js")
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvdWJ1bnR1L3Byb2plY3RzL2dlb2pzb24yc3ZnL25vZGVfbW9kdWxlcy9tdWx0aWdlb2pzb24vaW5kZXguanMiLCIvaG9tZS91YnVudHUvcHJvamVjdHMvZ2VvanNvbjJzdmcvbm9kZV9tb2R1bGVzL3h0ZW5kL2ltbXV0YWJsZS5qcyIsIi9ob21lL3VidW50dS9wcm9qZWN0cy9nZW9qc29uMnN2Zy9zcmMvY29udmVydGVyLmpzIiwiL2hvbWUvdWJ1bnR1L3Byb2plY3RzL2dlb2pzb24yc3ZnL3NyYy9pbnN0YW5jZS5qcyIsIi9ob21lL3VidW50dS9wcm9qZWN0cy9nZW9qc29uMnN2Zy9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vaW5kZXguanMgXG4oZnVuY3Rpb24oKSB7IFxuXHR2YXIgc2luZ2xlcyA9IFsnUG9pbnQnLCAnTGluZVN0cmluZycsICdQb2x5Z29uJ107XG5cdHZhciBtdWx0aWVzID0gWydNdWx0aVBvaW50JywgJ011bHRpTGluZVN0cmluZycsICdNdWx0aVBvbHlnb24nXTtcblx0ZnVuY3Rpb24gZXhwbG9kZShnKSB7XG5cdCAgaWYoIG11bHRpZXMuaW5kZXhPZihnLnR5cGUpID4gLTEpIHtcblx0ICAgIHJldHVybiBnLmNvb3JkaW5hdGVzLm1hcChmdW5jdGlvbihwYXJ0KSB7XG5cdCAgICAgIHZhciBzaW5nbGUgPSB7fTtcblx0ICAgICAgc2luZ2xlLnR5cGUgPSBnLnR5cGUucmVwbGFjZSgnTXVsdGknLCcnKTtcblx0ICAgICAgc2luZ2xlLmNvb3JkaW5hdGVzID0gcGFydDtcbiAgICAgICAgaWYoZy5jcnMpIHNpbmdsZS5jcnMgPSBnLmNycztcblx0ICAgICAgcmV0dXJuIHNpbmdsZTtcblx0ICAgIH0pOyAgXG5cdCAgfSBlbHNlIHtcblx0ICAgIHJldHVybiBmYWxzZTtcblx0ICB9XG5cdH1cblx0ZnVuY3Rpb24gaW1wbG9kZShncykge1xuXHQgIHZhciBzYW1lVHlwZSA9IGdzLmV2ZXJ5KGZ1bmN0aW9uKGcpIHsgXG5cdCAgICByZXR1cm4gc2luZ2xlcy5pbmRleE9mKGcudHlwZSkgPiAtMTtcblx0ICB9KVxuICAgIHZhciBjcnMgPSBnc1swXS5jcnMgfHwgMDtcbiAgICB2YXIgc2FtZUNycyA9IGdzLmV2ZXJ5KGZ1bmN0aW9uKGcpIHtcbiAgICAgIHZhciBnY3JzID0gZy5jcnMgfHwgMDtcbiAgICAgIHJldHVybiBnY3JzID09IGNycztcbiAgICB9KTtcblx0ICBpZihzYW1lVHlwZSAmJiBzYW1lQ3JzKSB7XG5cdCAgICB2YXIgbXVsdGkgPSB7fTtcblx0ICAgIG11bHRpLnR5cGUgPSAnTXVsdGknICsgZ3NbMF0udHlwZTtcblx0ICAgIG11bHRpLmNvb3JkaW5hdGVzID0gW107XG4gICAgICBpZihjcnMgIT0gMCkgbXVsdGkuY3JzID0gY3JzO1xuXHQgICAgZ3MuZm9yRWFjaChmdW5jdGlvbihnKSB7XG5cdCAgICAgIG11bHRpLmNvb3JkaW5hdGVzLnB1c2goZy5jb29yZGluYXRlcyk7XG5cdCAgICB9KTtcblx0ICAgIHJldHVybiBtdWx0aTtcblx0ICB9IGVsc2Uge1xuXHQgICAgcmV0dXJuIGZhbHNlO1xuXHQgIH1cblx0fTtcblx0dmFyIG11bHRpZ2VvanNvbiA9IHtcblx0ICBleHBsb2RlOiBleHBsb2RlLFxuXHQgIGltcGxvZGU6IGltcGxvZGVcblx0fTtcblx0aWYodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0ICBtb2R1bGUuZXhwb3J0cyA9IG11bHRpZ2VvanNvbjtcblx0fSBlbHNlIGlmKHdpbmRvdykge1xuXHQgIHdpbmRvdy5tdWx0aWdlb2pzb24gPSBtdWx0aWdlb2pzb247XG5cdH1cbn0pKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGV4dGVuZFxuXG5mdW5jdGlvbiBleHRlbmQoKSB7XG4gICAgdmFyIHRhcmdldCA9IHt9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldFxufVxuIiwiLy9jb252ZXJ0ZXIuanNcbnZhciBtdWx0aSA9IHJlcXVpcmUoJ211bHRpZ2VvanNvbicpO1xuZnVuY3Rpb24gZ2V0Q29vcmRTdHJpbmcoY29vcmRzLHJlcyxvcmlnaW4pIHtcbiAgLy9vcmlnaW4gLSBzdmcgaW1hZ2Ugb3JpZ2luIFxuICB2YXIgY29vcmRTdHIgPSBjb29yZHMubWFwKGZ1bmN0aW9uKGNvb3JkKSB7XG4gICAgcmV0dXJuIChjb29yZFswXSAtIG9yaWdpbi54KS9yZXMgKyAnLCcgKyAob3JpZ2luLnkgLSBjb29yZFsxXSkvcmVzO1xuICB9KTtcbiAgcmV0dXJuIGNvb3JkU3RyLmpvaW4oJyAnKTtcbn1cbmZ1bmN0aW9uIGFkZEF0dHJpYnV0ZXMoZWxlLGF0dHJpYnV0ZXMpIHtcbiAgdmFyIHBhcnQgPSBlbGUuc3BsaXQoJy8+JylbMF07XG4gIGZvcih2YXIga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICBpZihhdHRyaWJ1dGVzW2tleV0pIHtcbiAgICAgIHBhcnQgKz0gJyAnICsga2V5ICsgJz1cIicgKyBhdHRyaWJ1dGVzW2tleV0gKyAnXCInO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcGFydCArICcgLz4nO1xufVxuXG5mdW5jdGlvbiBwb2ludChnZW9tLHJlcyxvcmlnaW4sb3B0KSB7XG4gIHZhciByID0gb3B0ICYmIG9wdC5yID8gb3B0LnIgOiAxO1xuICB2YXIgcGF0aCA9ICdNJyArIGdldENvb3JkU3RyaW5nKFtnZW9tLmNvb3JkaW5hdGVzXSxyZXMsb3JpZ2luKVxuICAgICsnIG0nKyAtcisgJywwJysgJyBhJytyKycsJysgciArICcgMCAxLDEgJysgMipyICsgJywnKzBcbiAgICArJyBhJytyKycsJysgciArICcgMCAxLDEgJysgLTIqciArICcsJyswO1xuICByZXR1cm4gW3BhdGhdO1xufVxuZnVuY3Rpb24gbXVsdGlQb2ludChnZW9tLHJlcyxvcmlnaW4sb3B0KSB7XG4gIHZhciBleHBsb2RlID0gb3B0ICYmIG9wdC5oYXNPd25Qcm9wZXJ0eSgnZXhwbG9kZScpID8gb3B0LmV4cGxvZGUgOiBmYWxzZTtcbiAgdmFyIHBhdGhzID0gbXVsdGkuZXhwbG9kZShnZW9tKS5tYXAoZnVuY3Rpb24oc2luZ2xlKSB7XG4gICAgcmV0dXJuIHBvaW50KHNpbmdsZSxyZXMsb3JpZ2luLG9wdClbMF07XG4gIH0pO1xuICBpZighZXhwbG9kZSkgcmV0dXJuIFtwYXRocy5qb2luKCcgJyldO1xuICByZXR1cm4gcGF0aHM7XG5cbn1cbmZ1bmN0aW9uIGxpbmVTdHJpbmcoZ2VvbSxyZXMsb3JpZ2luLG90cCkge1xuICB2YXIgY29vcmRzID0gZ2V0Q29vcmRTdHJpbmcoZ2VvbS5jb29yZGluYXRlcyxyZXMsb3JpZ2luKTtcbiAgdmFyIHBhdGggPSAnTScrIGNvb3JkczsgIFxuICByZXR1cm4gW3BhdGhdO1xufVxuZnVuY3Rpb24gbXVsdGlMaW5lU3RyaW5nKGdlb20scmVzLG9yaWdpbixvcHQpIHtcbiAgdmFyIGV4cGxvZGUgPSBvcHQgJiYgb3B0Lmhhc093blByb3BlcnR5KCdleHBsb2RlJykgPyBvcHQuZXhwbG9kZSA6IGZhbHNlO1xuICB2YXIgcGF0aHMgPSBtdWx0aS5leHBsb2RlKGdlb20pLm1hcChmdW5jdGlvbihzaW5nbGUpIHtcbiAgICByZXR1cm4gbGluZVN0cmluZyhzaW5nbGUscmVzLG9yaWdpbixvcHQpWzBdO1xuICB9KTtcbiAgaWYoIWV4cGxvZGUpIHJldHVybiBbcGF0aHMuam9pbignICcpXTtcbiAgcmV0dXJuIHBhdGhzO1xufVxuZnVuY3Rpb24gcG9seWdvbihnZW9tLHJlcyxvcmlnaW4sb3B0KSB7XG4gIHZhciBtYWluU3RyLGhvbGVzLGhvbGVTdHI7XG4gIG1haW5TdHIgPSBnZXRDb29yZFN0cmluZyhnZW9tLmNvb3JkaW5hdGVzWzBdLHJlcyxvcmlnaW4pO1xuICBpZiAoZ2VvbS5jb29yZGluYXRlcy5sZW5ndGggPiAxKSB7XG4gICAgaG9sZXMgPSBnZW9tLmNvb3JkaW5hdGVzLnNsaWNlKDEsZ2VvbS5jb29yZGluYXRlcy5sZW5ndGgpO1xuICB9XG4gIHZhciBwYXRoID0gJ00nKyBtYWluU3RyO1xuICBpZihob2xlcykge1xuICAgIGZvcih2YXIgaT0wO2k8aG9sZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhdGggKz0gJyBNJyArICBnZXRDb29yZFN0cmluZyhob2xlc1tpXSxyZXMsb3JpZ2luKTtcbiAgICB9XG4gIH1cbiAgcGF0aCArPSAnWic7XG4gIHJldHVybiBbcGF0aF07XG59XG5mdW5jdGlvbiBtdWx0aVBvbHlnb24oZ2VvbSxyZXMsb3JpZ2luLG9wdCkge1xuICB2YXIgZXhwbG9kZSA9IG9wdC5oYXNPd25Qcm9wZXJ0eSgnZXhwbG9kZScpID8gb3B0LmV4cGxvZGUgOiBmYWxzZTtcbiAgdmFyIHBhdGhzID0gbXVsdGkuZXhwbG9kZShnZW9tKS5tYXAoZnVuY3Rpb24oc2luZ2xlKSB7XG4gICAgcmV0dXJuIHBvbHlnb24oc2luZ2xlLHJlcyxvcmlnaW4sb3B0KVswXTtcbiAgfSk7XG4gIGlmKCFleHBsb2RlKSByZXR1cm4gW3BhdGhzLmpvaW4oJyAnKS5yZXBsYWNlKC9aL2csJycpICsgJ1onXTtcbiAgcmV0dXJuIHBhdGhzO1xufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFBvaW50OiBwb2ludCxcbiAgTXVsdGlQb2ludDogbXVsdGlQb2ludCxcbiAgTGluZVN0cmluZzogbGluZVN0cmluZyxcbiAgTXVsdGlMaW5lU3RyaW5nOiBtdWx0aUxpbmVTdHJpbmcsXG4gIFBvbHlnb246IHBvbHlnb24sXG4gIE11bHRpUG9seWdvbjogbXVsdGlQb2x5Z29uXG59O1xuIiwidmFyIGV4dGVuZCA9IHJlcXVpcmUoJ3h0ZW5kJyksXG5cdGNvbnZlcnRlciA9IHJlcXVpcmUoJy4vY29udmVydGVyLmpzJyk7XG5cbi8vZzJzdmcgYXMgZ2VvanNvbjJzdmcgKHNob3J0aGFuZClcbnZhciBnMnN2ZyA9IGZ1bmN0aW9uKHZpZXdwb3J0U2l6ZSxvcHRpb25zKSB7XG4gIGlmKCF2aWV3cG9ydFNpemUpIHJldHVybjtcbiAgdGhpcy52aWV3cG9ydFNpemUgPSB2aWV3cG9ydFNpemU7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMubWFwRXh0ZW50ID0gdGhpcy5vcHRpb25zLm1hcEV4dGVudCB8fFxuICAgIHtcbiAgICAgIGxlZnQ6IC0yMDAzNzUwOC4zNDI3ODkyNDQsXG4gICAgICByaWdodDogMjAwMzc1MDguMzQyNzg5MjQ0LFxuICAgICAgYm90dG9tOiAtMjAwMzc1MDguMzQyNzg5MjQ0LFxuICAgICAgdG9wOiAyMDAzNzUwOC4zNDI3ODkyNDRcbiAgICB9O1xuICB0aGlzLnJlcyA9IHRoaXMuY2FsUmVzb2x1dGlvbih0aGlzLm1hcEV4dGVudCx0aGlzLnZpZXdwb3J0U2l6ZSk7XG59O1xuZzJzdmcucHJvdG90eXBlLmNhbFJlc29sdXRpb24gPSBmdW5jdGlvbihleHRlbnQsc2l6ZSkge1xuICB2YXIgeHJlcyA9IChleHRlbnQucmlnaHQgLSBleHRlbnQubGVmdCkvc2l6ZS53aWR0aDtcbiAgdmFyIHlyZXMgPSAoZXh0ZW50LnRvcCAtIGV4dGVudC5ib3R0b20pL3NpemUuaGVpZ2h0O1xuICByZXR1cm4gTWF0aC5tYXgoeHJlcyx5cmVzKTtcbn07XG5nMnN2Zy5wcm90b3R5cGUuY29udmVydCA9IGZ1bmN0aW9uKGdlb2pzb24sb3B0aW9ucykgIHtcbiAgdmFyIG9wdCA9IGV4dGVuZChleHRlbmQoe30sdGhpcy5vcHRpb25zKSwgb3B0aW9ucyB8fCB7fSk7XG4gIHZhciBtdWx0aUdlb21ldHJpZXMgPSBbJ011bHRpUG9pbnQnLCdNdWx0aUxpbmVTdHJpbmcnLCdNdWx0aVBvbHlnb24nXTtcbiAgdmFyIGdlb21ldHJpZXMgPSBbJ1BvaW50JywgJ0xpbmVTdHJpbmcnLCAnUG9seWdvbiddO1xuICB2YXIgc3ZnRWxlbWVudHMgPSBbXTtcbiAgaWYgKGdlb2pzb24udHlwZSA9PSAnRmVhdHVyZUNvbGxlY3Rpb24nKSB7XG4gICAgZm9yKHZhciBpPTA7IGk8IGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN2Z0VsZW1lbnRzID0gc3ZnRWxlbWVudHMuY29uY2F0KFxuICAgICAgICB0aGlzLmNvbnZlcnRGZWF0dXJlKGdlb2pzb24uZmVhdHVyZXNbaV0sb3B0KSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGdlb2pzb24udHlwZSA9PSAnRmVhdHVyZScpIHtcbiAgICBzdmdFbGVtZW50cyA9IHRoaXMuY29udmVydEZlYXR1cmUoZ2VvanNvbixvcHQpO1xuICB9IGVsc2UgaWYgKGdlb2pzb24udHlwZSA9PSAnR2VvbXRyeUNvbGxlY3Rpb24nKSB7XG4gICAgZm9yKHZhciBpPTA7IGk8IGdlb2pzb24uZ2VvbWV0cmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgc3ZnRWxlbWVudHMgPSBzdmdFbGVtZW50cy5jb25jYXQoXG4gICAgICAgIHRoaXMuY29udmVydEdlb21ldHJ5KGdlb2pzb24uZ2VvbWV0cmllc1tpXSxvcHQpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoY29udmVydGVyW2dlb2pzb24udHlwZV0pIHtcbiAgICBzdmdFbGVtZW50cyA9IHRoaXMuY29udmVydEdlb21ldHJ5KGdlb2pzb24sb3B0KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYob3B0LmNhbGxiYWNrKSBvcHQuY2FsbGJhY2suY2FsbCh0aGlzLHN2Z0VsZW1lbnRzKTtcbiAgcmV0dXJuIHN2Z0VsZW1lbnRzO1xufTtcbmcyc3ZnLnByb3RvdHlwZS5jb252ZXJ0RmVhdHVyZSA9IGZ1bmN0aW9uKGZlYXR1cmUsb3B0aW9ucykge1xuICBpZighZmVhdHVyZSAmJiAhZmVhdHVyZS5nZW9tZXRyeSkgcmV0dXJuO1xuICB2YXIgb3B0ID0gZXh0ZW5kKGV4dGVuZCh7fSx0aGlzLm9wdGlvbnMpLCBvcHRpb25zIHx8IHt9KTtcbiAgb3B0LmF0dHJpYnV0ZXMgPSBvcHQuYXR0cmlidXRlcyB8fCB7fTtcbiAgb3B0LmF0dHJpYnV0ZXMuaWQgPSBvcHQuYXR0cmlidXRlcy5pZCB8fCBmZWF0dXJlLmlkIHx8IG51bGw7XG4gIHJldHVybiB0aGlzLmNvbnZlcnRHZW9tZXRyeShmZWF0dXJlLmdlb21ldHJ5LG9wdCk7XG59O1xuZzJzdmcucHJvdG90eXBlLmNvbnZlcnRHZW9tZXRyeSA9IGZ1bmN0aW9uKGdlb20sb3B0aW9ucykge1xuICBpZihjb252ZXJ0ZXJbZ2VvbS50eXBlXSkge1xuICAgIHZhciBvcHQgPSBleHRlbmQoZXh0ZW5kKHt9LHRoaXMub3B0aW9ucyksIG9wdGlvbnMgfHwge30pO1xuICAgIHZhciBvdXRwdXQgPSBvcHQub3V0cHV0IHx8ICdzdmcnO1xuICAgIHZhciBwYXRocyA9IGNvbnZlcnRlcltnZW9tLnR5cGVdLmNhbGwodGhpcyxnZW9tLFxuICAgICAgdGhpcy5yZXMsXG4gICAgICB7eDp0aGlzLm1hcEV4dGVudC5sZWZ0LHk6dGhpcy5tYXBFeHRlbnQudG9wfSxcbiAgICAgIG9wdFxuICAgICk7XG4gICAgdmFyIHN2Z0pzb25zLHN2Z0VsZXM7XG4gICAgaWYgKG91dHB1dC50b0xvd2VyQ2FzZSgpID09ICdzdmcnKSB7XG4gICAgICBzdmdKc29ucyA9IHBhdGhzLm1hcChmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoVG9TdmdKc29uKHBhdGgsZ2VvbS50eXBlLG9wdC5hdHRyaWJ1dGVzLG9wdCk7XG4gICAgICB9KTtcbiAgICAgIHN2Z0VsZXMgPSBzdmdKc29ucy5tYXAoZnVuY3Rpb24oanNvbikge1xuICAgICAgICByZXR1cm4ganNvblRvU3ZnRWxlbWVudChqc29uLGdlb20udHlwZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBzdmdFbGVzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcGF0aHM7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybjtcbiAgfVxufTtcbnZhciBwYXRoVG9TdmdKc29uID0gZnVuY3Rpb24ocGF0aCx0eXBlLGF0dHJpYnV0ZXMsb3B0KSB7XG4gIHZhciBzdmcgPSB7fTtcbiAgdmFyIGZvcmNlUGF0aCA9IG9wdCAmJiBvcHQuaGFzT3duUHJvcGVydHkoJ2ZvcmNlUGF0aCcpID8gb3B0LmZvcmNlUGF0aFxuICAgICA6IHRydWU7XG4gIGlmKCh0eXBlID09ICdQb2ludCcgfHwgdHlwZSA9PSAnTXVsdGlQb2ludCcpICYmICFmb3JjZVBhdGgpIHtcbiAgICBzdmdbJ2N4J10gPSBwYXRoLnNwbGl0KCcsJylbMF07XG4gICAgc3ZnWydjeSddID0gcGF0aC5zcGxpdCgnLCcpWzFdO1xuICAgIHN2Z1snciddID0gb3B0ICYmIG9wdC5yID8gb3B0LnIgOiAnMSc7XG4gIH0gZWxzZSB7XG4gICAgc3ZnID0ge2Q6IHBhdGh9O1xuICAgIGlmKHR5cGUgPT0gJ1BvbHlnb24nIHx8IHR5cGUgPT0gJ011bHRpUG9seWdvbicpIHtcbiAgICAgIHN2Z1snZmlsbC1ydWxlJ10gPT0gJ2V2ZW5vZGQnOyBcbiAgICB9IFxuICB9XG4gIGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgc3ZnW2tleV09IGF0dHJpYnV0ZXNba2V5XTtcbiAgfVxuICByZXR1cm4gc3ZnO1xufTtcbnZhciBqc29uVG9TdmdFbGVtZW50ID0gZnVuY3Rpb24oanNvbix0eXBlLG9wdCkge1xuICB2YXIgZm9yY2VQYXRoID0gb3B0ICYmIG9wdC5oYXNPd25Qcm9wZXJ0eSgnZm9yY2VQYXRoJykgPyBvcHQuZm9yY2VQYXRoXG4gICAgIDogdHJ1ZTtcbiAgdmFyIGVsZSA9JzxwYXRoJztcbiAgaWYoKHR5cGUgPT0gJ1BvaW50JyB8fCB0eXBlID09ICdNdWx0aVBvaW50JykgJiYgIWZvcmNlUGF0aCkge1xuICAgIGVsZSA9ICc8Y2lyY2xlJztcbiAgfVxuICBmb3IodmFyIGtleSBpbiBqc29uKSB7XG4gICAgZWxlICs9ICcgJyArIGtleSArJz1cIicgKyBqc29uW2tleV0gKyAnXCInO1xuICB9XG4gIGVsZSArPSAnLz4nO1xuICByZXR1cm4gZWxlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBnMnN2ZztcbiIsInZhciBnMnN2ZyA9IHJlcXVpcmUoJy4vaW5zdGFuY2UuanMnKTtcbnZhciBnZW9qc29uMnN2ZyA9IGZ1bmN0aW9uKHZpZXdwb3J0U2l6ZSxvcHRpb25zKSB7XG4gIGlmKCF2aWV3cG9ydFNpemUpIHJldHVybjtcbiAgcmV0dXJuIG5ldyBnMnN2Zyh2aWV3cG9ydFNpemUsb3B0aW9ucyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdlb2pzb24yc3ZnO1xuIl19
