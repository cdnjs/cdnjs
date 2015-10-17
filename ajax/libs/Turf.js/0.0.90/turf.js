!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.t=e():"undefined"!=typeof global?global.t=e():"undefined"!=typeof self&&(self.t=e())}(function(){var define,module,exports;
return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  count: require('./lib/count'),
  erase: require('./lib/erase'),
  variance: require('./lib/variance'),
  deviation: require('./lib/deviation'),
  median: require('./lib/median'),
  min: require('./lib/min'),
  max: require('./lib/max'),
  aggregate: require('./lib/aggregate'),
  flip: require('./lib/flip'),
  simplify: require('./lib/simplify'),
  sum: require('./lib/sum'),
  average: require('./lib/average'),
  topo: require('./lib/topo'),
  bezier: require('./lib/bezier'),
  tag: require('./lib/tag'),
  size: require('./lib/size'),
  sample: require('./lib/sample'),
  jenks: require('./lib/jenks'),
  quantile: require('./lib/quantile'),
  save: require('./lib/save'),
  envelope: require('./lib/envelope'),
  square: require('./lib/square'),
  midpoint: require('./lib/midpoint'),
  buffer: require('./lib/buffer'),
  center: require('./lib/center'),
  centroid: require('./lib/centroid'),
  combine: require('./lib/combine'),
  contour: require('./lib/contour'),
  distance: require('./lib/distance'),
  explode: require('./lib/explode'),
  extent: require('./lib/extent'),
  bboxPolygon: require('./lib/bboxPolygon'),
  featurecollection: require('./lib/featurecollection'),
  filter: require('./lib/filter'),
  grid: require('./lib/grid'),
  inside: require('./lib/inside'),
  intersect: require('./lib/intersect'),
  linestring: require('./lib/linestring'),
  load: require('./lib/load'),
  nearest: require('./lib/nearest'),
  planepoint: require('./lib/planepoint'),
  point: require('./lib/point'),
  polygon: require('./lib/polygon'),
  quantile: require('./lib/quantile'),
  reclass: require('./lib/reclass'),
  remove: require('./lib/remove'),
  tin: require('./lib/tin'),
  union: require('./lib/union')
}


},{"./lib/aggregate":2,"./lib/average":3,"./lib/bboxPolygon":4,"./lib/bezier":5,"./lib/buffer":6,"./lib/center":7,"./lib/centroid":8,"./lib/combine":9,"./lib/contour":10,"./lib/count":11,"./lib/deviation":12,"./lib/distance":13,"./lib/envelope":14,"./lib/erase":15,"./lib/explode":16,"./lib/extent":17,"./lib/featurecollection":18,"./lib/filter":19,"./lib/flip":20,"./lib/grid":21,"./lib/inside":22,"./lib/intersect":23,"./lib/jenks":24,"./lib/linestring":25,"./lib/load":26,"./lib/max":27,"./lib/median":28,"./lib/midpoint":29,"./lib/min":30,"./lib/nearest":31,"./lib/planepoint":32,"./lib/point":33,"./lib/polygon":34,"./lib/quantile":35,"./lib/reclass":36,"./lib/remove":37,"./lib/sample":38,"./lib/save":39,"./lib/simplify":40,"./lib/size":41,"./lib/square":42,"./lib/sum":43,"./lib/tag":44,"./lib/tin":45,"./lib/topo":46,"./lib/union":47,"./lib/variance":48}],2:[function(require,module,exports){
var _ = require('lodash')
var t = {}
t.average = require('./average')
t.sum = require('./sum')
t.median = require('./median')
t.min = require('./min')
t.max = require('./max')
t.deviation = require('./deviation')
t.variance = require('./variance')
t.count = require('./count')

module.exports = function(polygons, points, aggregations, done){
  _.each(aggregations, function(agg){
    switch(agg.aggregation){
      case 'average':
        t.average(polygons, points, agg.inField, agg.outField, function(err, averaged){
          polygons = averaged
        })
        break
      case 'sum':
        t.sum(polygons, points, agg.inField, agg.outField, function(err, summed){
          polygons = summed
        })
        break
      case 'median':
        t.median(polygons, points, agg.inField, agg.outField, function(err, medianed){
          polygons = medianed
        })
        break
      case 'min':
        t.min(polygons, points, agg.inField, agg.outField, function(err, mined){
          polygons = mined
        })
        break
      case 'max':
        t.max(polygons, points, agg.inField, agg.outField, function(err, maxed){
          polygons = maxed
        })
        break
      case 'deviation':
        t.deviation(polygons, points, agg.inField, agg.outField, function(err, deviated){
          polygons = deviated
        })
        break
      case 'variance':
        t.variance(polygons, points, agg.inField, agg.outField, function(err, varianced){
          polygons = varianced
        })
        break
      case 'count':
        t.count(polygons, points, agg.inField, agg.outField, function(err, counted){
          polygons = counted
        })
        break
      default:
        done(new Error('"'+agg.aggregation +'" is not a recognized aggregation operation.'))
    }
  })
  done(null, polygons)
}
},{"./average":3,"./count":11,"./deviation":12,"./max":27,"./median":28,"./min":30,"./sum":43,"./variance":48,"lodash":71}],3:[function(require,module,exports){
var t = {}
var _ = require('lodash'),
    ss = require('simple-statistics')
t.inside = require('./inside')

module.exports = function(polyFC, ptFC, inField, outField, done){
  _.each(polyFC.features, function(poly){
    if(!poly.properties){
      poly.properties = {}
    }
    var values = []
    _.each(ptFC.features, function(pt){
      t.inside(pt, poly, function(err, isInside){
        if(isInside){
          values.push(pt.properties[inField])
        }
      })
    })
    poly.properties[outField] = ss.average(values)
  })

  done(null, polyFC)
}
},{"./inside":22,"lodash":71,"simple-statistics":72}],4:[function(require,module,exports){
var t = {}
var point = require('../lib/point'),
    polygon = require('../lib/polygon')
t.point = point
t.polygon = polygon

module.exports = function(bbox, done){
  var lowLeft = t.point(bbox[0], bbox[1])
  var topLeft = t.point(bbox[0], bbox[3])
  var topRight = t.point(bbox[2], bbox[3])
  var lowRight = t.point(bbox[2], bbox[1])

  var poly = t.polygon([[
    lowLeft.geometry.coordinates, 
    lowRight.geometry.coordinates, 
    topRight.geometry.coordinates, 
    topLeft.geometry.coordinates
  ]])
  done(null, poly)
}
},{"../lib/point":33,"../lib/polygon":34}],5:[function(require,module,exports){
// code modded from here:
//https://github.com/leszekr/bezier-spline-js/blob/master/bezier-spline.js
var t = {}
var _ = require('lodash')
t.linestring = require('./linestring')

module.exports = function(line, resolution, intensity, done){
  var lineOut = t.linestring([])
  lineOut.properties = line.properties
  pts = []
  _.each(line.geometry.coordinates, function(pt){
    pts.push({x: pt[0], y: pt[1]})
  })

  var spline = new Spline({
    points: pts,
    duration: resolution,
    sharpness: intensity,
    //stepLength: distance_between_points_to_cache
  });
  for(var i=0; i<spline.duration; i+=10){
    var pos = spline.pos(i); //bezier(i/max,p1, c1, c2, p2);
    if(Math.floor(i/100)%2==0) lineOut.geometry.coordinates.push([pos.x, pos.y]);
    //else ctx.moveTo(pos.x, pos.y);
  }
  done(null, lineOut)
}


 /**
   * BezierSpline 
   * http://leszekr.github.com/
   *
   * @copyright
   * Copyright (C) 2012 Leszek Rybicki.
   *
   * @license
   * This file is part of BezierSpline
   * 
   * BezierSpline is free software: you can redistribute it and/or modify
   * it under the terms of the GNU Lesser General Public License as published by
   * the Free Software Foundation, either version 3 of the License, or
   * (at your option) any later version.
   * 
   * BezierSpline is distributed in the hope that it will be useful,
   * but WITHOUT ANY WARRANTY; without even the implied warranty of
   * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   * GNU General Public License for more details.
   * 
   * You should have received a copy of the GNU General Public License
   * along with BezierSpline.  If not, see <http://www.gnu.org/copyleft/lesser.html>.
   */


  /*
  Usage:

    var spline = new Spline({
      points: array_of_control_points,
      duration: time_in_miliseconds,
      sharpness: how_curvy,
      stepLength: distance_between_points_to_cache
    });

  */
  Spline = function(options){
    this.points = options.points || [];
    this.duration = options.duration || 10000;
    this.sharpness = options.sharpness || 0.85;
    this.centers = [];
    this.controls = [];
    this.stepLength = options.stepLength || 60;
    this.length = this.points.length;
    this.delay = 0;
    // this is to ensure compatibility with the 2d version
    for(var i=0; i<this.length; i++) this.points[i].z = this.points[i].z || 0;
    for(var i=0; i<this.length-1; i++){
      var p1 = this.points[i];
      var p2 = this.points[i+1];
      this.centers.push({x:(p1.x+p2.x)/2, y:(p1.y+p2.y)/2, z:(p1.z+p2.z)/2});
    }
    this.controls.push([this.points[0],this.points[0]]);
    for(var i=0; i<this.centers.length-1; i++){
      var p1 = this.centers[i];
      var p2 = this.centers[i+1];
      var dx = this.points[i+1].x-(this.centers[i].x+this.centers[i+1].x)/2;
      var dy = this.points[i+1].y-(this.centers[i].y+this.centers[i+1].y)/2;
      var dz = this.points[i+1].z-(this.centers[i].y+this.centers[i+1].z)/2;
      this.controls.push([{
        x:(1.0-this.sharpness)*this.points[i+1].x+this.sharpness*(this.centers[i].x+dx),
        y:(1.0-this.sharpness)*this.points[i+1].y+this.sharpness*(this.centers[i].y+dy),
        z:(1.0-this.sharpness)*this.points[i+1].z+this.sharpness*(this.centers[i].z+dz)},
      {
        x:(1.0-this.sharpness)*this.points[i+1].x+this.sharpness*(this.centers[i+1].x+dx),
        y:(1.0-this.sharpness)*this.points[i+1].y+this.sharpness*(this.centers[i+1].y+dy),
        z:(1.0-this.sharpness)*this.points[i+1].z+this.sharpness*(this.centers[i+1].z+dz)}]);
    }
    this.controls.push([this.points[this.length-1],this.points[this.length-1]]);
    this.steps = this.cacheSteps(this.stepLength);
    return this;
  }

  /*
    Caches an array of equidistant (more or less) points on the curve.
  */
  Spline.prototype.cacheSteps = function(mindist){
    var steps = [];
    var laststep = this.pos(0);
    steps.push(0);
    for(var t=0; t<this.duration; t+=10){
      var step = this.pos(t);
      var dist = Math.sqrt((step.x-laststep.x)*(step.x-laststep.x)+(step.y-laststep.y)*(step.y-laststep.y)+(step.z-laststep.z)*(step.z-laststep.z));
      if(dist>mindist){
        steps.push(t);
        laststep = step;
      }
    }
    return steps;
  }

  /*
    returns angle and speed in the given point in the curve
  */
  Spline.prototype.vector = function(t){
    var p1 = this.pos(t+10);
    var p2 = this.pos(t-10);
    return {
      angle:180*Math.atan2(p1.y-p2.y, p1.x-p2.x)/3.14,
      speed:Math.sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y)+(p2.z-p1.z)*(p2.z-p1.z))
    }
  }

  /*
    Draws the control points
  */
  Spline.prototype.drawControlPoints = function(ctx, color){
    ctx.fillStyle = color||"#f60";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2; 
    for(var i=0; i<this.length; i++){
      var p = this.points[i];
      var c1 = this.controls[i][0];
      var c2 = this.controls[i][1];

      ctx.beginPath();
      ctx.moveTo(c1.x,c1.y);
      ctx.lineTo(p.x,p.y);
      ctx.lineTo(c2.x,c2.y);
      ctx.stroke();
            
      ctx.beginPath();
      ctx.arc(c1.x, c1.y, 3, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();
      
      /*ctx.beginPath();
      ctx.arc(this.centers[i].x, this.centers[i].y, 5, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();*/
      
      ctx.beginPath();
      ctx.arc(c2.x, c2.y, 3, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();
      

      ctx.beginPath();
      ctx.arc(p.x, p.y, 7, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();
    }
    return this;
  }

  /*
    Gets the position of the point, given time.

    WARNING: The speed is not constant. The time it takes between control points is constant.

    For constant speed, use Spline.steps[i];
  */
  Spline.prototype.pos = function(time){

    function bezier(t, p1, c1, c2, p2){
      var B = function(t) { 
        var t2=t*t, t3=t2*t;
        return [(t3),(3*t2*(1-t)),(3*t*(1-t)*(1-t)),((1-t)*(1-t)*(1-t))]
      }
      var b = B(t)
      var pos = {
        x : p2.x * b[0] + c2.x * b[1] +c1.x * b[2] + p1.x * b[3],
        y : p2.y * b[0] + c2.y * b[1] +c1.y * b[2] + p1.y * b[3],
        z : p2.z * b[0] + c2.z * b[1] +c1.z * b[2] + p1.z * b[3]
      }
      return pos; 
    }
    var t = time-this.delay;
    if(t<0) t=0;
    if(t>this.duration) t=this.duration-1;
    //t = t-this.delay;
    var t2 = (t)/this.duration;
    if(t2>=1) return this.points[this.length-1];

    var n = Math.floor((this.points.length-1)*t2);
    var t1 = (this.length-1)*t2-n;
    return bezier(t1,this.points[n],this.controls[n][1],this.controls[n+1][0],this.points[n+1]);
  }

  /*
    Draws the line
  */
  Spline.prototype.draw = function(ctx,color){
    ctx.strokeStyle = color || "#7e5e38"; // line color
    ctx.lineWidth = 14;
    ctx.beginPath();
    var pos;
    for(var i=0; i<this.duration; i+=10){
      pos = this.pos(i); //bezier(i/max,p1, c1, c2, p2);
      if(Math.floor(i/100)%2==0) ctx.lineTo(pos.x, pos.y);
      else ctx.moveTo(pos.x, pos.y);
    }
    ctx.stroke();
    return this;
  }
},{"./linestring":25,"lodash":71}],6:[function(require,module,exports){
//http://stackoverflow.com/questions/839899/how-do-i-calculate-a-point-on-a-circles-circumference
//radians = degrees * (pi/180)

// https://github.com/bjornharrtell/jsts/blob/master/examples/buffer.html

var _ = require('lodash'),
    jsts = require('jsts')
var t = {}
t.featurecollection = require('./featurecollection')
t.polygon = require('./polygon')

module.exports = function(feature, radius, units, union, done){
  switch(units){
    case 'miles':
      radius = radius / 69.047
      break
    case 'kilometers':
      radius = radius / 111.12
      break
    case 'degrees':
      break
  }
  
  var reader = new jsts.io.GeoJSONReader()
  var geom = reader.read(JSON.stringify(feature.geometry))
  var buffered = geom.buffer(radius);
  var parser = new jsts.io.GeoJSONParser()
  buffered = parser.write(buffered)

  buffered = t.featurecollection([t.polygon(buffered.coordinates)])
  done(null, buffered)
}
},{"./featurecollection":18,"./polygon":34,"jsts":49,"lodash":71}],7:[function(require,module,exports){
var t = {}
var extent = require('./extent')
t.extent = extent

module.exports = function(layer, done){
  t.extent(layer, function(err, extent){
    var x = (extent[0] +extent[2])/2
    var y = (extent[1] + extent[3])/2
    var center = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [x, y]
      }
    }
    done(center)
  })
}
},{"./extent":17}],8:[function(require,module,exports){
var t = {}
var _ = require('lodash'),
    ss = require('simple-statistics')
    explode = require('./explode'),
    point = require('./point'),
t.explode = explode
t.point = point

module.exports = function(features, done){
  t.explode(features, function(err, vertices){
    var averageX, 
        averageY, 
        xs = [], 
        ys = []
    
    _.each(vertices.features, function(v){
      xs.push(v.geometry.coordinates[0])
      ys.push(v.geometry.coordinates[1])
    })

    averageX = ss.mean(xs)
    averageY = ss.mean(ys)

    done(err, t.point(averageX, averageY))
  })
}
},{"./explode":16,"./point":33,"lodash":71,"simple-statistics":72}],9:[function(require,module,exports){
//this tool takes a feature collection of like geometries and combines them into a single multipoint, multilinestring, or multipolygon
var _ = require('lodash')

module.exports = function(fc, done){
  var type = fc.features[0].geometry.type
  var err
  var geometries = _.pluck(fc.features, 'geometry')
  switch(type){
    case 'Point':
      var multiPoint = {
        type: 'Feature',
        geometry: {
          type: 'MultiPoint',
          coordinates: []
        }
      }
      multiPoint.geometry.coordinates = _.pluck(geometries, 'coordinates')
      done(err, multiPoint)
    break
    case 'LineString':
      var multiLineString = {
        type: 'Feature',
        geometry: {
          type: 'MultiLineString',
          coordinates: []
        }
      }
      multiLineString.geometry.coordinates = _.pluck(geometries, 'coordinates')
      done(err, multiLineString)
      break
    case 'Polygon':
      var multiPolygon = {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: []
        }
      }
      multiPolygon.geometry.coordinates = _.pluck(geometries, 'coordinates')
      done(err, multiPolygon)
    break
  }
}
},{"lodash":71}],10:[function(require,module,exports){
//https://github.com/jasondavies/conrec.js
//http://stackoverflow.com/questions/263305/drawing-a-topographical-map
var t = {}
var _ = require('lodash'),
    fs = require('fs')
    tin = require('./tin'),
    inside = require('./inside'),
    grid = require('./grid'),
    extent = require('./extent'),
    planepoint = require('./planepoint'),
    featurecollection = require('./featurecollection'),
    polygon = require('./polygon'),
    square = require('./square')
t.tin = tin
t.inside = inside
t.grid = grid
t.extent = extent
t.planepoint = planepoint
t.featurecollection = featurecollection
t.polygon = polygon
t.square = square

module.exports = function(points, z, resolution, breaks, done){
  t.tin(points, z, function(err, tinResult){
    t.extent(points, function(err, bbox){
      t.square(bbox, function(err, bbox){
        t.grid(bbox, resolution, function(err, gridResult){
          var data = []
          _(gridResult.features).each(function(pt){
            _(tinResult.features).each(function(triangle){
              t.inside(pt, triangle, function(err, isInside){
                if(isInside){
                  t.planepoint(pt, triangle, function(err, zValue){
                    pt.properties = {}
                    pt.properties[z] = zValue
                  })
                }
                else {
                  //leave pt.properties null
                }
              })
            })
          })
          //fs.writeFileSync('../test/testOut/gridTest.geojson',JSON.stringify(gridResult))
          //fs.writeFileSync('../test/testOut/tinTest.geojson',JSON.stringify(tinResult))

          var depth = Math.sqrt(gridResult.features.length)
          for (var x=0; x<depth; x++){
            var xGroup = gridResult.features.slice(x * depth, (x + 1) * depth)
            var xFlat = []
            _.each(xGroup, function(verticalPoint){
              if(verticalPoint.properties){
                xFlat.push(verticalPoint.properties[z])
              } else{
                xFlat.push(0)
              }
            })
            data.push(xFlat)
          }
          var interval = (bbox[2] - bbox[0]) / depth
          var xCoordinates = []
          var yCoordinates = []
          for (var x=0; x<depth; x++){
            xCoordinates.push(x * interval + bbox[0])
            yCoordinates.push(x * interval + bbox[1])
          }
          
          var c = new Conrec
          c.contour(data, 0, resolution, 0, resolution, xCoordinates, yCoordinates, breaks.length, breaks)
          var contourList = c.contourList()


          var fc = t.featurecollection([])
          _.each(contourList, function(c){
            if(c.length > 2){
              var polyCoordinates = []
              _.each(c, function(coord){
                polyCoordinates.push([coord.x, coord.y])
              })
              var poly = t.polygon([polyCoordinates])
              poly.properties = {}
              poly.properties[z] = c.level

              fc.features.push(poly)
            }
          })
          //fs.writeFileSync('../test/testOut/contour.geojson',JSON.stringify(fc))
          done(null, fc)
        })
      })
    })
  })
}


/**
 * Copyright (c) 2010, Jason Davies.
 *
 * All rights reserved.  This code is based on Bradley White's Java version,
 * which is in turn based on Nicholas Yue's C++ version, which in turn is based
 * on Paul D. Bourke's original Fortran version.  See below for the respective
 * copyright notices.
 *
 * See http://local.wasp.uwa.edu.au/~pbourke/papers/conrec/ for the original
 * paper by Paul D. Bourke.
 *
 * The vector conversion code is based on http://apptree.net/conrec.htm by
 * Graham Cox.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the <organization> nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * Copyright (c) 1996-1997 Nicholas Yue
 *
 * This software is copyrighted by Nicholas Yue. This code is based on Paul D.
 * Bourke's CONREC.F routine.
 *
 * The authors hereby grant permission to use, copy, and distribute this
 * software and its documentation for any purpose, provided that existing
 * copyright notices are retained in all copies and that this notice is
 * included verbatim in any distributions. Additionally, the authors grant
 * permission to modify this software and its documentation for any purpose,
 * provided that such modifications are not distributed without the explicit
 * consent of the authors and that existing copyright notices are retained in
 * all copies. Some of the algorithms implemented by this software are
 * patented, observe all applicable patent law.
 *
 * IN NO EVENT SHALL THE AUTHORS OR DISTRIBUTORS BE LIABLE TO ANY PARTY FOR
 * DIRECT, INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT
 * OF THE USE OF THIS SOFTWARE, ITS DOCUMENTATION, OR ANY DERIVATIVES THEREOF,
 * EVEN IF THE AUTHORS HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * THE AUTHORS AND DISTRIBUTORS SPECIFICALLY DISCLAIM ANY WARRANTIES,
 * INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.  THIS SOFTWARE IS
 * PROVIDED ON AN "AS IS" BASIS, AND THE AUTHORS AND DISTRIBUTORS HAVE NO
 * OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS, OR
 * MODIFICATIONS.
 */


  exports.Conrec = Conrec;

  var EPSILON = 1e-10;

  function pointsEqual(a, b) {
    var x = a.x - b.x, y = a.y - b.y;
    return x * x + y * y < EPSILON;
  }

  function reverseList(list) {
    var pp = list.head;

    while (pp) {
      // swap prev/next pointers
      var temp = pp.next;
      pp.next = pp.prev;
      pp.prev = temp;

      // continue through the list
      pp = temp;
    }

    // swap head/tail pointers
    var temp = list.head;
    list.head = list.tail;
    list.tail = temp;
  }

  function ContourBuilder(level) {
    this.level = level;
    this.s = null;
    this.count = 0;
  }
  ContourBuilder.prototype.remove_seq = function(list) {
    // if list is the first item, static ptr s is updated
    if (list.prev) {
      list.prev.next = list.next;
    } else {
      this.s = list.next;
    }

    if (list.next) {
      list.next.prev = list.prev;
    }
    --this.count;
  }
  ContourBuilder.prototype.addSegment = function(a, b) {
    var ss = this.s;
    var ma = null;
    var mb = null;
    var prependA = false;
    var prependB = false;

    while (ss) {
      if (ma == null) {
        // no match for a yet
        if (pointsEqual(a, ss.head.p)) {
          ma = ss;
          prependA = true;
        } else if (pointsEqual(a, ss.tail.p)) {
          ma = ss;
        }
      }
      if (mb == null) {
        // no match for b yet
        if (pointsEqual(b, ss.head.p)) {
          mb = ss;
          prependB = true;
        } else if (pointsEqual(b, ss.tail.p)) {
          mb = ss;
        }
      }
      // if we matched both no need to continue searching
      if (mb != null && ma != null) {
        break;
      } else {
        ss = ss.next;
      }
    }

    // c is the case selector based on which of ma and/or mb are set
    var c = ((ma != null) ? 1 : 0) | ((mb != null) ? 2 : 0);

    switch(c) {
      case 0:   // both unmatched, add as new sequence
        var aa = {p: a, prev: null};
        var bb = {p: b, next: null};
        aa.next = bb;
        bb.prev = aa;

        // create sequence element and push onto head of main list. The order
        // of items in this list is unimportant
        ma = {head: aa, tail: bb, next: this.s, prev: null, closed: false};
        if (this.s) {
          this.s.prev = ma;
        }
        this.s = ma;

        ++this.count;    // not essential - tracks number of unmerged sequences
      break;

      case 1:   // a matched, b did not - thus b extends sequence ma
        var pp = {p: b};

        if (prependA) {
          pp.next = ma.head;
          pp.prev = null;
          ma.head.prev = pp;
          ma.head = pp;
        } else {
          pp.next = null;
          pp.prev = ma.tail;
          ma.tail.next = pp;
          ma.tail = pp;
        }
      break;

      case 2:   // b matched, a did not - thus a extends sequence mb
        var pp = {p: a};

        if (prependB) {
          pp.next = mb.head;
          pp.prev = null;
          mb.head.prev = pp;
          mb.head = pp;
        } else {
          pp.next = null;
          pp.prev = mb.tail;
          mb.tail.next = pp;
          mb.tail = pp;
        }
      break;

      case 3:   // both matched, can merge sequences
        // if the sequences are the same, do nothing, as we are simply closing this path (could set a flag)

        if (ma === mb) {
          var pp = {p: ma.tail.p, next: ma.head, prev: null};
          ma.head.prev = pp;
          ma.head = pp;
          ma.closed = true;
          break;
        }

        // there are 4 ways the sequence pair can be joined. The current setting of prependA and
        // prependB will tell us which type of join is needed. For head/head and tail/tail joins
        // one sequence needs to be reversed
        switch((prependA ? 1 : 0) | (prependB ? 2 : 0)) {
          case 0:   // tail-tail
            // reverse ma and append to mb
            reverseList(ma);
            // fall through to head/tail case
          case 1:   // head-tail
            // ma is appended to mb and ma discarded
            mb.tail.next = ma.head;
            ma.head.prev = mb.tail;
            mb.tail = ma.tail;

            //discard ma sequence record
            this.remove_seq(ma);
          break;

          case 3:   // head-head
            // reverse ma and append mb to it
            reverseList(ma);
            // fall through to tail/head case
          case 2:   // tail-head
            // mb is appended to ma and mb is discarded
            ma.tail.next = mb.head;
            mb.head.prev = ma.tail;
            ma.tail = mb.tail;

            //discard mb sequence record
            this.remove_seq(mb);
        break;
      }
    }
  }

  /**
   * Implements CONREC.
   *
   * @param {function} drawContour function for drawing contour.  Defaults to a
   *                               custom "contour builder", which populates the
   *                               contours property.
   */
  function Conrec(drawContour) {
    if (!drawContour) {
      var c = this;
      c.contours = {};
      /**
       * drawContour - interface for implementing the user supplied method to
       * render the countours.
       *
       * Draws a line between the start and end coordinates.
       *
       * @param startX    - start coordinate for X
       * @param startY    - start coordinate for Y
       * @param endX      - end coordinate for X
       * @param endY      - end coordinate for Y
       * @param contourLevel - Contour level for line.
       */
      this.drawContour = function(startX, startY, endX, endY, contourLevel, k) {
        var cb = c.contours[k];
        if (!cb) {
          cb = c.contours[k] = new ContourBuilder(contourLevel);
        }
        cb.addSegment({x: startX, y: startY}, {x: endX, y: endY});
      }
      this.contourList = function() {
        var l = [];
        var a = c.contours;
        for (var k in a) {
          var s = a[k].s;
          var level = a[k].level;
          while (s) {
            var h = s.head;
            var l2 = [];
            l2.level = level;
            l2.k = k;
            while (h && h.p) {
              l2.push(h.p);
              h = h.next;
            }
            l.push(l2);
            s = s.next;
          }
        }
        l.sort(function(a, b) { return a.k - b.k });
        return l;
      }
    } else {
      this.drawContour = drawContour;
    }
    this.h  = new Array(5);
    this.sh = new Array(5);
    this.xh = new Array(5);
    this.yh = new Array(5);
  }

  /**
   * contour is a contouring subroutine for rectangularily spaced data
   *
   * It emits calls to a line drawing subroutine supplied by the user which
   * draws a contour map corresponding to real*4data on a randomly spaced
   * rectangular grid. The coordinates emitted are in the same units given in
   * the x() and y() arrays.
   *
   * Any number of contour levels may be specified but they must be in order of
   * increasing value.
   *
   *
   * @param {number[][]} d - matrix of data to contour
   * @param {number} ilb,iub,jlb,jub - index bounds of data matrix
   *
   *             The following two, one dimensional arrays (x and y) contain
   *             the horizontal and vertical coordinates of each sample points.
   * @param {number[]} x  - data matrix column coordinates
   * @param {number[]} y  - data matrix row coordinates
   * @param {number} nc   - number of contour levels
   * @param {number[]} z  - contour levels in increasing order.
   */
  Conrec.prototype.contour = function(d, ilb, iub, jlb, jub, x, y, nc, z) {
    var h = this.h, sh = this.sh, xh = this.xh, yh = this.yh;
    var drawContour = this.drawContour;
    this.contours = {};

    /** private */
    var xsect = function(p1, p2){
      return (h[p2]*xh[p1]-h[p1]*xh[p2])/(h[p2]-h[p1]);
    }

    var ysect = function(p1, p2){
      return (h[p2]*yh[p1]-h[p1]*yh[p2])/(h[p2]-h[p1]);
    }
    var m1;
    var m2;
    var m3;
    var case_value;
    var dmin;
    var dmax;
    var x1 = 0.0;
    var x2 = 0.0;
    var y1 = 0.0;
    var y2 = 0.0;

    // The indexing of im and jm should be noted as it has to start from zero
    // unlike the fortran counter part
    var im = [0, 1, 1, 0];
    var jm = [0, 0, 1, 1];

    // Note that castab is arranged differently from the FORTRAN code because
    // Fortran and C/C++ arrays are transposed of each other, in this case
    // it is more tricky as castab is in 3 dimensions
    var castab = [
      [
        [0, 0, 8], [0, 2, 5], [7, 6, 9]
      ],
      [
        [0, 3, 4], [1, 3, 1], [4, 3, 0]
      ],
      [
        [9, 6, 7], [5, 2, 0], [8, 0, 0]
      ]
    ];

    for (var j=(jub-1);j>=jlb;j--) {
      for (var i=ilb;i<=iub-1;i++) {
        var temp1, temp2;
        temp1 = Math.min(d[i][j],d[i][j+1]);
        temp2 = Math.min(d[i+1][j],d[i+1][j+1]);
        dmin  = Math.min(temp1,temp2);
        temp1 = Math.max(d[i][j],d[i][j+1]);
        temp2 = Math.max(d[i+1][j],d[i+1][j+1]);
        dmax  = Math.max(temp1,temp2);

        if (dmax>=z[0]&&dmin<=z[nc-1]) {
          for (var k=0;k<nc;k++) {
            if (z[k]>=dmin&&z[k]<=dmax) {
              for (var m=4;m>=0;m--) {
                if (m>0) {
                  // The indexing of im and jm should be noted as it has to
                  // start from zero
                  h[m] = d[i+im[m-1]][j+jm[m-1]]-z[k];
                  xh[m] = x[i+im[m-1]];
                  yh[m] = y[j+jm[m-1]];
                } else {
                  h[0] = 0.25*(h[1]+h[2]+h[3]+h[4]);
                  xh[0]=0.5*(x[i]+x[i+1]);
                  yh[0]=0.5*(y[j]+y[j+1]);
                }
                if (h[m]>EPSILON) {
                  sh[m] = 1;
                } else if (h[m]<-EPSILON) {
                  sh[m] = -1;
                } else
                  sh[m] = 0;
              }
              //
              // Note: at this stage the relative heights of the corners and the
              // centre are in the h array, and the corresponding coordinates are
              // in the xh and yh arrays. The centre of the box is indexed by 0
              // and the 4 corners by 1 to 4 as shown below.
              // Each triangle is then indexed by the parameter m, and the 3
              // vertices of each triangle are indexed by parameters m1,m2,and
              // m3.
              // It is assumed that the centre of the box is always vertex 2
              // though this isimportant only when all 3 vertices lie exactly on
              // the same contour level, in which case only the side of the box
              // is drawn.
              //
              //
              //      vertex 4 +-------------------+ vertex 3
              //               | \               / |
              //               |   \    m-3    /   |
              //               |     \       /     |
              //               |       \   /       |
              //               |  m=2    X   m=2   |       the centre is vertex 0
              //               |       /   \       |
              //               |     /       \     |
              //               |   /    m=1    \   |
              //               | /               \ |
              //      vertex 1 +-------------------+ vertex 2
              //
              //
              //
              //               Scan each triangle in the box
              //
              for (m=1;m<=4;m++) {
                m1 = m;
                m2 = 0;
                if (m!=4) {
                    m3 = m+1;
                } else {
                    m3 = 1;
                }
                case_value = castab[sh[m1]+1][sh[m2]+1][sh[m3]+1];
                if (case_value!=0) {
                  switch (case_value) {
                    case 1: // Line between vertices 1 and 2
                      x1=xh[m1];
                      y1=yh[m1];
                      x2=xh[m2];
                      y2=yh[m2];
                      break;
                    case 2: // Line between vertices 2 and 3
                      x1=xh[m2];
                      y1=yh[m2];
                      x2=xh[m3];
                      y2=yh[m3];
                      break;
                    case 3: // Line between vertices 3 and 1
                      x1=xh[m3];
                      y1=yh[m3];
                      x2=xh[m1];
                      y2=yh[m1];
                      break;
                    case 4: // Line between vertex 1 and side 2-3
                      x1=xh[m1];
                      y1=yh[m1];
                      x2=xsect(m2,m3);
                      y2=ysect(m2,m3);
                      break;
                    case 5: // Line between vertex 2 and side 3-1
                      x1=xh[m2];
                      y1=yh[m2];
                      x2=xsect(m3,m1);
                      y2=ysect(m3,m1);
                      break;
                    case 6: //  Line between vertex 3 and side 1-2
                      x1=xh[m3];
                      y1=yh[m3];
                      x2=xsect(m1,m2);
                      y2=ysect(m1,m2);
                      break;
                    case 7: // Line between sides 1-2 and 2-3
                      x1=xsect(m1,m2);
                      y1=ysect(m1,m2);
                      x2=xsect(m2,m3);
                      y2=ysect(m2,m3);
                      break;
                    case 8: // Line between sides 2-3 and 3-1
                      x1=xsect(m2,m3);
                      y1=ysect(m2,m3);
                      x2=xsect(m3,m1);
                      y2=ysect(m3,m1);
                      break;
                    case 9: // Line between sides 3-1 and 1-2
                      x1=xsect(m3,m1);
                      y1=ysect(m3,m1);
                      x2=xsect(m1,m2);
                      y2=ysect(m1,m2);
                      break;
                    default:
                      break;
                  }
                  // Put your processing code here and comment out the printf
                  //printf("%f %f %f %f %f\n",x1,y1,x2,y2,z[k]);
                  drawContour(x1,y1,x2,y2,z[k],k);
                }
              }
            }
          }
        }
      }
    }
  }

},{"./extent":17,"./featurecollection":18,"./grid":21,"./inside":22,"./planepoint":32,"./polygon":34,"./square":42,"./tin":45,"fs":101,"lodash":71}],11:[function(require,module,exports){
var t = {}
var _ = require('lodash')
t.inside = require('./inside')

module.exports = function(polyFC, ptFC, inField, outField, done){
  _.each(polyFC.features, function(poly){
    if(!poly.properties){
      poly.properties = {}
    }
    var values = []
    _.each(ptFC.features, function(pt){
      t.inside(pt, poly, function(err, isInside){
        if(isInside){
          values.push(pt.properties[inField])
        }
      })
    })
    poly.properties[outField] = values.length
  })
  done(null, polyFC)
}
},{"./inside":22,"lodash":71}],12:[function(require,module,exports){
var t = {}
var _ = require('lodash'),
    ss = require('simple-statistics')
t.inside = require('./inside')

module.exports = function(polyFC, ptFC, inField, outField, done){
  _.each(polyFC.features, function(poly){
    if(!poly.properties){
      poly.properties = {}
    }
    var values = []
    _.each(ptFC.features, function(pt){
      t.inside(pt, poly, function(err, isInside){
        if(isInside){
          values.push(pt.properties[inField])
        }
      })
    })
    poly.properties[outField] = ss.standard_deviation(values)
  })
  done(null, polyFC)
}
},{"./inside":22,"lodash":71,"simple-statistics":72}],13:[function(require,module,exports){
//http://en.wikipedia.org/wiki/Haversine_formula
//http://www.movable-type.co.uk/scripts/latlong.html
// expects a feature collection of points

module.exports = function(point1, point2, units, done){
  var toRad = function(degree){
    return degree * Math.PI / 180
  }
  var coordinates1 = point1.geometry.coordinates
  var coordinates2 = point2.geometry.coordinates

  /*var dLat = (lat2-lat1).toRad();
  var dLon = (lon2-lon1).toRad();
  var lat1 = lat1.toRad();
  var lat2 = lat2.toRad();*/

  var dLat = toRad(coordinates2[0] - coordinates1[0])
  var dLon = toRad(coordinates2[1] - coordinates1[1])
  var lat1 = toRad(coordinates1[1])
  var lat2 = toRad(coordinates2[1])
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

  var R = 0
  switch(units){
    case 'miles':
      R = 3960
      break
    case 'kilometers':
      R = 6373
      break
    case 'degrees':
      R = 57.2957795
      break
    case 'radians':
      R = 1
      break
  }
  var distance = R * c
  done(null, distance)
}


},{}],14:[function(require,module,exports){
var t = {}
var extent = require('./extent'),
    bboxPolygon = require('./bboxPolygon')
t.bboxPolygon = bboxPolygon
t.extent = extent

module.exports = function(features, done){
  t.extent(features, function(err, bbox){
    t.bboxPolygon(bbox, function(err, poly){
      done(err, poly)
    })
  })
}
},{"./bboxPolygon":4,"./extent":17}],15:[function(require,module,exports){
// look here for help http://svn.osgeo.org/grass/grass/branches/releasebranch_6_4/vector/v.overlay/main.c
//must be array of polygons

// depend on jsts for now https://github.com/bjornharrtell/jsts/blob/master/examples/overlay.html

var jsts = require('jsts')
var t = {}
t.featurecollection = require('./featurecollection')

module.exports = function(polys1, polys2, done){
  var reader = new jsts.io.GeoJSONReader()
  var a = reader.read(JSON.stringify(polys1.features[0].geometry))
  var b = reader.read(JSON.stringify(polys2.features[0].geometry))
  var union = a.difference(b);
  var parser = new jsts.io.GeoJSONParser()
  union = parser.write(union)
  union = t.featurecollection([union])
  done(null, union)
}
},{"./featurecollection":18,"jsts":49}],16:[function(require,module,exports){
var t = {}
var _ = require('lodash'),
    featurecollection = require('./featurecollection'),
    point = require('./point')
t.featurecollection = featurecollection
t.point = point

module.exports = function(features, done){
  var coordinates = []
  if(features.type === 'FeatureCollection'){
    for(var i in features.features){
      switch(features.features[i].geometry.type){
        case 'Point':
          coordinates.push([features.features[i].geometry.coordinates])
          break
        case 'LineString':
          coordinates.push(features.features[i].geometry.coordinates)
          break
        case 'Polygon':
          coordinates.push(features.features[i].geometry.coordinates)
          coordinates.push(_.flatten(coordinates, true))
          break
        case 'MultiPoint':
          coordinates.push(features.features[i].geometry.coordinates)
          break
        case 'MultiLineString':
          coordinates.push(features.features[i].geometry.coordinates)
          coordinates.push(_.flatten(coordinates, true))
          break
        case 'MultiPolygon':
          coordinates.push(features.features[i].geometry.coordinates)
          coordinates.push(_.flatten(coordinates, true))
          coordinates.push(_.flatten(coordinates, true))
          break
      }
      if(!features.features[i].geometry && features.features[i].properties){
        throw new Error('Unknown Geometry Type')
      }
    }
    coordinates = _.flatten(coordinates, true)
  }
  else{
    var geometry
    if(features.type === 'Feature'){
      geometry = features.geometry
    }
    else{
      geometry = features
    }
    switch(geometry.type){
      case 'Point':
        coordinates = [geometry.coordinates]
        break
      case 'LineString':
        coordinates = geometry.coordinates
        break
      case 'Polygon':
        coordinates = geometry.coordinates
        coordinates = _.flatten(coordinates, true)
        break
      case 'MultiPoint':
        coordinates = geometry.coordinates
        break
      case 'MultiLineString':
        coordinates = geometry.coordinates
        coordinates = _.flatten(coordinates, true)
        break
      case 'MultiPolygon':
        coordinates = geometry.coordinates
        coordinates = _.flatten(coordinates, true)
        coordinates = _.flatten(coordinates, true)
        break
    }
    if(!geometry){
      throw new Error('No Geometry Found')
    }
  }
  var fc = t.featurecollection([])
  _.each(coordinates, function(c){
    fc.features.push(t.point(c[0], c[1]))
  })
  done(null, fc)
}







},{"./featurecollection":18,"./point":33,"lodash":71}],17:[function(require,module,exports){
_ = require('lodash')

module.exports = function(layer, done){
  var xmin = Infinity,
      ymin = Infinity,
      xmax = -Infinity,
      ymax = -Infinity
  if(layer.type === 'FeatureCollection'){
    for(var i in layer.features){
      var coordinates 
      switch(layer.features[i].geometry.type){
        case 'Point':
          coordinates = [layer.features[i].geometry.coordinates]
          break
        case 'LineString':
          coordinates = layer.features[i].geometry.coordinates
          break
        case 'Polygon':
          coordinates = layer.features[i].geometry.coordinates
          coordinates = _.flatten(coordinates, true)
          break
        case 'MultiPoint':
          coordinates = layer.features[i].geometry.coordinates
          break
        case 'MultiLineString':
          coordinates = layer.features[i].geometry.coordinates
          coordinates = _.flatten(coordinates, true)
          break
        case 'MultiPolygon':
          coordinates = layer.features[i].geometry.coordinates
          coordinates = _.flatten(coordinates, true)
          coordinates = _.flatten(coordinates, true)
          break
      }
      if(!layer.features[i].geometry && layer.features[i].properties){
        throw new Error('Unknown Geometry Type')
      }
      
      for(var n in coordinates){
        if(xmin > coordinates[n][0]){
          xmin = coordinates[n][0]
        }
        if(ymin > coordinates[n][1]){
          ymin = coordinates[n][1]
        }
        if(xmax < coordinates[n][0]){
          xmax = coordinates[n][0]
        }
        if(ymax < coordinates[n][1]){
          ymax = coordinates[n][1]
        }
      }
    }
    var bbox = [xmin, ymin, xmax, ymax]
    done(null, bbox)
  }
  else{
    var coordinates 
    var geometry
    if(layer.type === 'Feature'){
      geometry = layer.geometry
    }
    else{
      geometry = layer
    }
    switch(geometry.type){
      case 'Point':
        coordinates = [geometry.coordinates]
        break
      case 'LineString':
        coordinates = geometry.coordinates
        break
      case 'Polygon':
        coordinates = geometry.coordinates
        coordinates = _.flatten(coordinates, true)
        break
      case 'MultiPoint':
        coordinates = geometry.coordinates
        break
      case 'MultiLineString':
        coordinates = geometry.coordinates
        coordinates = _.flatten(coordinates, true)
        break
      case 'MultiPolygon':
        coordinates = geometry.coordinates
        coordinates = _.flatten(coordinates, true)
        coordinates = _.flatten(coordinates, true)
        break
    }
    if(!geometry){
      throw new Error('No Geometry Found')
    }
    
    for(var n in coordinates){
      if(xmin > coordinates[n][0]){
        xmin = coordinates[n][0]
      }
      if(ymin > coordinates[n][1]){
        ymin = coordinates[n][1]
      }
      if(xmax < coordinates[n][0]){
        xmax = coordinates[n][0]
      }
      if(ymax < coordinates[n][1]){
        ymax = coordinates[n][1]
      }
    }
    var bbox = [xmin, ymin, xmax, ymax]
    done(null, bbox)
  }
}
},{"lodash":71}],18:[function(require,module,exports){
module.exports = function(features){
  var fc = {
    "type": "FeatureCollection",
    "features": features
  }

  return fc
}
},{}],19:[function(require,module,exports){
var _ = require('lodash')
var t = {}
t.featurecollection = require('./featurecollection')

module.exports = function(fc, field, value, done){
  var newFC = t.featurecollection([]);
  for(var i = 0; i < fc.features.length; i++) {
    if(fc.features[i].properties[field] === value) {
      newFC.features.push(fc.features[i])
    }
  }
  done(null, newFC)
}
},{"./featurecollection":18,"lodash":71}],20:[function(require,module,exports){
var t = {}
t.featurecollection = require('./featurecollection')

module.exports = function(fc, done){
  if(fc.type === 'Feature'){
    switch(fc.geometry.type){
      case 'Point':
        fc.geometry.coordinates = flipCoordinate(fc.geometry.coordinates)
        done(null, fc)
        break
      case 'LineString':
        _.each(fc.geometry.coordinates, function(coordinates, i){
          coordinates = flipCoordinate(coordinates)
          fc.geometry.coordinates[i] = coordinates
        })
        done(null, fc)
        break
      case 'Polygon':
        _.each(fc.geometry.coordinates, function(ring, i){
          _.each(ring, function(coordinates, k){
            coordinates = flipCoordinate(coordinates)
            fc.geometry.coordinates[i][k] = coordinates
          })
        })
        done(null, fc)
        break
    }
  }
  else if(fc.type === 'FeatureCollection'){
    _.each(fc.features, function(feature){
      switch(feature.geometry.type){
        case 'Point':
          feature.geometry.coordinates = flipCoordinate(feature.geometry.coordinates)
          break
        case 'LineString':
          _.each(feature.geometry.coordinates, function(coordinates, i){
            coordinates = flipCoordinate(coordinates)
            feature.geometry.coordinates[i] = coordinates
          })
          break
        case 'Polygon':
          _.each(feature.geometry.coordinates, function(ring, i){
            _.each(ring, function(coordinates, k){
              coordinates = flipCoordinate(coordinates)
              feature.geometry.coordinates[i][k] = coordinates
            })
          })
          break
      }
    })
    done(null, fc)
  }
  else {
    done(new Error('Unknown geometry type'), null)
  }
}

var flipCoordinate = function(coordinates){
  x = coordinates[0]
  y = coordinates[1]
  return([y, x])
}
},{"./featurecollection":18}],21:[function(require,module,exports){
var t = {}
var _ = require('lodash'),
  point = require('./point')
t.point = point

module.exports = function(extents, depth, done){
  var xmin = extents[0]
  var ymin = extents[1]
  var xmax = extents[2]
  var ymax = extents[3]
  var interval = (xmax - xmin) / depth
  var coords = []
  var fc = {
    type: 'FeatureCollection',
    features: []
  }
  for (var x=0; x<=depth; x++){
    for (var y=0;y<=depth; y++){
      fc.features.push(t.point((x * interval) + xmin, (y * interval) + ymin))
    }
  }
  done(null, fc)
}
},{"./point":33,"lodash":71}],22:[function(require,module,exports){
// http://en.wikipedia.org/wiki/Even%E2%80%93odd_rule
// modified from: https://github.com/substack/point-in-polygon/blob/master/index.js
// which was modified from http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

module.exports = function(point, polygon, done){
  var x = point.geometry.coordinates[0]
  var y = point.geometry.coordinates[1]
  var vs = polygon.geometry.coordinates[0]

  var isInside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i][0], yi = vs[i][1];
    var xj = vs[j][0], yj = vs[j][1];
    
    var intersect = ((yi > y) != (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) isInside = !isInside;
  }
  done(null, isInside)
}


},{}],23:[function(require,module,exports){
// depend on jsts for now https://github.com/bjornharrtell/jsts/blob/master/examples/overlay.html
var jsts = require('jsts')
var t = {}
t.featurecollection = require('./featurecollection')

module.exports = function(polys1, polys2, done){
  var reader = new jsts.io.GeoJSONReader()
  var a = reader.read(JSON.stringify(polys1.features[0].geometry))
  var b = reader.read(JSON.stringify(polys2.features[0].geometry))
  var intersection = a.intersection(b)
  var parser = new jsts.io.GeoJSONParser()
  intersection = parser.write(intersection)
  intersection = t.featurecollection([intersection])
  done(null, intersection)
}
},{"./featurecollection":18,"jsts":49}],24:[function(require,module,exports){
var ss = require('simple-statistics'),
    _ = require('lodash')

module.exports = function(fc, field, num, done){
  var vals = []
  var breaks = []

  _.each(fc.features, function(feature){
    if(!(feature.properties[field]===undefined)){
      vals.push(feature.properties[field])
    }
  })
  breaks = ss.jenks(vals, num)

  done(null, breaks)
}
},{"lodash":71,"simple-statistics":72}],25:[function(require,module,exports){
module.exports = function(coordinates, properties){
  if(coordinates === null) throw new Error('No coordinates passed')
  var linestring = { 
    "type": "Feature",
    "geometry": {
      "type": "LineString",
      "coordinates": coordinates
    },
    "properties": properties
  }
  return linestring
}

},{}],26:[function(require,module,exports){
var path = require('path'),
    fs = require('fs'),
    ext = '',
    layer

module.exports = function(file, done) {
  ext = path.extname(file);
  fs.readFile(file, function(err, res){
    if (err) done(err)
    layer = JSON.parse(res)
    done(null, layer)
  })  
}

},{"fs":101,"path":102}],27:[function(require,module,exports){
var t = {}
var _ = require('lodash'),
    ss = require('simple-statistics')
t.inside = require('./inside')

module.exports = function(polyFC, ptFC, inField, outField, done){
  _.each(polyFC.features, function(poly){
    if(!poly.properties){
      poly.properties = {}
    }
    var values = []
    _.each(ptFC.features, function(pt){
      t.inside(pt, poly, function(err, isInside){
        if(isInside){
          values.push(pt.properties[inField])
        }
      })
    })
    poly.properties[outField] = ss.max(values)
  })
  done(null, polyFC)
}
},{"./inside":22,"lodash":71,"simple-statistics":72}],28:[function(require,module,exports){
var t = {}
var _ = require('lodash'),
    ss = require('simple-statistics')
t.inside = require('./inside')

module.exports = function(polyFC, ptFC, inField, outField, done){
  _.each(polyFC.features, function(poly){
    if(!poly.properties){
      poly.properties = {}
    }
    var values = []
    _.each(ptFC.features, function(pt){
      t.inside(pt, poly, function(err, isInside){
        if(isInside){
          values.push(pt.properties[inField])
        }
      })
    })
    poly.properties[outField] = ss.median(values)
  })
  done(null, polyFC)
}
},{"./inside":22,"lodash":71,"simple-statistics":72}],29:[function(require,module,exports){
// http://cs.selu.edu/~rbyrd/math/midpoint/
// ((x1+x2)/2), ((y1+y2)/2)
var t = {}
var point = require('./point')
t.point = point

module.exports = function(point1, point2, done) {
  if(point1 === null || point2 === null || point1 && point2 === null) throw new Error('Less than two points passed.')

  var x1 = point1.geometry.coordinates[0];
  var x2 = point2.geometry.coordinates[0];
  var y1 = point1.geometry.coordinates[1];
  var y2 = point2.geometry.coordinates[1];

  var x3 = x1 + x2;
  var midX = x3/2;
  var y3 = y1 + y2;
  var midY = y3/2;

  var midpoint = t.point(midX, midY);

  done(null, midpoint)
}
},{"./point":33}],30:[function(require,module,exports){
var t = {}
var _ = require('lodash'),
    ss = require('simple-statistics')
t.inside = require('./inside')

module.exports = function(polyFC, ptFC, inField, outField, done){
  _.each(polyFC.features, function(poly){
    if(!poly.properties){
      poly.properties = {}
    }
    var values = []
    _.each(ptFC.features, function(pt){
      t.inside(pt, poly, function(err, isInside){
        if(isInside){
          values.push(pt.properties[inField])
        }
      })
    })
    poly.properties[outField] = ss.min(values)
  })
  done(null, polyFC)
}
},{"./inside":22,"lodash":71,"simple-statistics":72}],31:[function(require,module,exports){
var t = {}
var _ = require('lodash'),
 distance = require('./distance')
t.distance = distance

module.exports = function(targetPoint, points, done){
  var nearestPoint
  var count = 0
  var dist = Infinity
  _.forEach(points.features, function(pt){
    if(!nearestPoint){
      nearestPoint = pt
      t.distance(targetPoint, pt, 'miles', function(err, dist){
        nearestPoint.properties.distance = dist 
      })
    }
    else{
      t.distance(targetPoint, pt, 'miles', function(err, dist){
        if(dist < nearestPoint.properties.distance){
          nearestPoint = pt
          nearestPoint.properties.distance = dist
        }
        if(points.features.length === count + 1){
          complete(nearestPoint)
        }
      })
    }
    count++
  })

  function complete(nPt){
    delete nPt.properties.distance
    done(null, nPt)
  }
}
},{"./distance":13,"lodash":71}],32:[function(require,module,exports){
http://stackoverflow.com/a/13916669/461015

module.exports = function(point, triangle, done){
  var x = point.geometry.coordinates[0]
      y = point.geometry.coordinates[1]
      x1 = triangle.geometry.coordinates[0][0][0],
      y1 = triangle.geometry.coordinates[0][0][1],
      z1 = triangle.properties.a
      x2 = triangle.geometry.coordinates[0][1][0],
      y2 = triangle.geometry.coordinates[0][1][1],
      z2 = triangle.properties.b
      x3 = triangle.geometry.coordinates[0][2][0],
      y3 = triangle.geometry.coordinates[0][2][1],
      z3 = triangle.properties.c

  var z = (z3 * (x-x1) * (y-y2) + z1 * (x-x2) * (y-y3) + z2 * (x-x3) * (y-y1) 
      - z2 * (x-x1) * (y-y3) - z3 * (x-x2) * (y-y1) - z1 * (x-x3) * (y-y2)) / 
      ((x-x1) * (y-y2) + (x-x2) * (y-y3) +(x-x3) * (y-y1) -   
       (x-x1) * (y-y3) - (x-x2) * (y-y1) - (x-x3) * (y-y2))

  done(null, z)
}
},{}],33:[function(require,module,exports){
module.exports = function(x, y, properties){
  if(x === null || y === null) throw new Error('Invalid coordinates')
  var point = { 
    "type": "Feature",
    "geometry": {
      "type": "Point", 
      "coordinates": [x, y]
    },
    "properties": properties
  }
  return point
}
},{}],34:[function(require,module,exports){
module.exports = function(coordinates, properties){
  if(coordinates === null) throw new Error('No coordinates passed')
  var polygon = {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": coordinates
    },
    "properties": properties
  }
  if(!polygon.properties){
    polygon.properties = {}
  }

  return polygon
}






},{}],35:[function(require,module,exports){
var ss = require('simple-statistics'),
    _ = require('lodash')

module.exports = function(fc, field, percentiles, done){
  var vals = []
  var quantiles = []

  _.each(fc.features, function(feature){
    vals.push(feature.properties[field])
  })
  _.each(percentiles, function(percentile){
    quantiles.push(ss.quantile(vals, percentile * .01))
  })
  done(null, quantiles)
}
},{"lodash":71,"simple-statistics":72}],36:[function(require,module,exports){
var t = {}
var featurecollection = require('./featurecollection')
t.featurecollection = featurecollection

module.exports = function(fc, inField, outField, translations, done){
  var reclassed = t.featurecollection([])
  _.each(fc.features, function(feature){
    var reclassedFeature
    var found = false
    for(var i = 0; i < translations.length; i++){
      if(feature.properties[inField] >= translations[i][0] && feature.properties[inField] <= translations[i][1]) {
        reclassedFeature = _.clone(feature, true)
        reclassedFeature.properties[outField] = translations[i][2]
      }
    }
    reclassed.features.push(reclassedFeature)
  })
  done(null, reclassed)
}
},{"./featurecollection":18}],37:[function(require,module,exports){
var t = {}
var featurecollection = require('./featurecollection')
t.featurecollection = featurecollection

module.exports = function(collection, key, val, done) {
  var newFC = t.featurecollection([]);
  for(var i = 0; i < collection.features.length; i++) {
    if(collection.features[i].properties[key] != val) {
      newFC.features.push(collection.features[i])
    }
  }
  done(null, newFC)
}
},{"./featurecollection":18}],38:[function(require,module,exports){
var t = {}
var _ = require('lodash'),
    featurecollection = require('./featurecollection')
t.featurecollection = featurecollection

module.exports = function(fc, num, done){
  var outFC = t.featurecollection(_.sample(fc.features, num))
  done(null, outFC)
}
},{"./featurecollection":18,"lodash":71}],39:[function(require,module,exports){
var t = {}
var fs = require('fs')
t.topo = require('./topo')

module.exports = function(path, features, type, done){
  if(!type) type = 'geojson'
  switch(type) {
    case 'geojson':
      fs.writeFile(path, JSON.stringify(features), function(err){
        done(err, 1)
      })
      break
      
    case 'topojson':
      t.topo(features, function(err, topology){
        fs.writeFile(path, JSON.stringify(features), function(err){
          done(err, 1)
        })
      })
      break
  }
}
},{"./topo":46,"fs":101}],40:[function(require,module,exports){
// use topojson.simplify to simplify points to a given tolerence then convert back to geojson
var topojson = require('topojson')

module.exports = function(fc, quantization, minimumArea, done){
  var options = {
    "quantization" : quantization,
    "minimum-area" : minimumArea,
    "property-transform": function(properties, key, value) {
       //keeps all
      properties[key] = value;
      return true;
    }
  }
  var topo = topojson.topology({name:fc}, options)
  topojson.simplify(topo, options)
  done(null, topojson.feature(topo, topo.objects.name))
}
},{"topojson":73}],41:[function(require,module,exports){
module.exports = function(bbox, factor, done){
  var lowX = (((bbox[2] - bbox[0]) / 2) * factor) + bbox[0]
  var lowY = (((bbox[3] - bbox[1]) / 2) * factor) + bbox[1]
  var highX = (((bbox[2] - bbox[0]) / 2) * factor) + bbox[2]
  var highY = (((bbox[3] - bbox[1]) / 2) * factor) + bbox[3]

  var sized = [lowX, lowY, highX, highY]
  done(null, sized)
}
},{}],42:[function(require,module,exports){
var t = {}
var midpoint = require('../lib/midpoint'),
    point = require('../lib/point'),
    distance = require('../lib/distance')
t.midpoint = midpoint
t.point = point
t.distance = distance

module.exports = function(bbox, done) {
  var squareBbox = [0,0,0,0]
  var lowLeft = t.point(bbox[0], bbox[1])
  var topLeft = t.point(bbox[0], bbox[3])
  var topRight = t.point(bbox[2], bbox[3])
  var lowRight = t.point(bbox[2], bbox[1])

  t.distance(lowLeft, lowRight, 'miles', function(err, horizontalDistance){
    t.distance(lowLeft, topLeft, 'miles', function(err, verticalDistance){
      if(horizontalDistance >= verticalDistance){
        squareBbox[0] = bbox[0]
        squareBbox[2] = bbox[2]
        t.midpoint(lowLeft, topLeft, function(err, verticalMidpoint){
          squareBbox[1] = verticalMidpoint.geometry.coordinates[1] - ((bbox[2] - bbox[0]) / 2)
          squareBbox[3] = verticalMidpoint.geometry.coordinates[1] + ((bbox[2] - bbox[0]) / 2)
          done(err, squareBbox)
        })
      }
      else {
        squareBbox[1] = bbox[1]
        squareBbox[3] = bbox[3]
        t.midpoint(lowLeft, lowRight, function(err, horzontalMidpoint){
          squareBbox[0] = horzontalMidpoint.geometry.coordinates[0] - ((bbox[3] - bbox[1]) / 2)
          squareBbox[2] = horzontalMidpoint.geometry.coordinates[0] + ((bbox[3] - bbox[1]) / 2)
          done(err, squareBbox)
        })
      }
    })
  })
  //t.midpoint(t.point(bbox[0,]), bbox)
  //squareBbox[0] = 
}
},{"../lib/distance":13,"../lib/midpoint":29,"../lib/point":33}],43:[function(require,module,exports){
var t = {}
var _ = require('lodash'),
    ss = require('simple-statistics')
t.inside = require('./inside')

module.exports = function(polyFC, ptFC, inField, outField, done){
  _.each(polyFC.features, function(poly){
    if(!poly.properties){
      poly.properties = {}
    }
    var values = []
    _.each(ptFC.features, function(pt){
      t.inside(pt, poly, function(err, isInside){
        if(isInside){
          values.push(pt.properties[inField])
        }
      })
    })
    poly.properties[outField] = ss.sum(values)
  })
  done(null, polyFC)
}
},{"./inside":22,"lodash":71,"simple-statistics":72}],44:[function(require,module,exports){
var t = {}
  var _ = require('lodash')
t.inside = require('./inside')

module.exports = function(points, polygons, field, outField, done){
  _.each(points.features, function(pt){
    if(!pt.properties){
      pt.properties = {}
    }
    _.each(polygons.features, function(poly){
      if(!pt.properties[outField]){
        t.inside(pt, poly, function(err, isInside){
          if(isInside){
            pt.properties[outField] = poly.properties[field]
          }
          else{
            pt.properties[outField] = null
          }
        })
      }
    })
  })
  done(null, points)
}
},{"./inside":22,"lodash":71}],45:[function(require,module,exports){
//http://en.wikipedia.org/wiki/Delaunay_triangulation
//https://github.com/ironwallaby/delaunay
var t = {}
var _ = require('lodash'),
  polygon = require('./polygon'),
  nearest = require('./nearest'),
  point = require('./point')
t.polygon = polygon
t.nearest = nearest
t.point = point

module.exports = function(points, z, done){
  //break down points
  var vertices = []
  _(points.features).each(function(p){
    vertices.push({x:p.geometry.coordinates[0], y:p.geometry.coordinates[1]})
  })

  var triangulated = triangulate(vertices)
  var triangles = {
    type: 'FeatureCollection',
    features: []
  }
  _(triangulated).each(function(triangle){
    var coords = [[[triangle.a.x, triangle.a.y], [triangle.b.x, triangle.b.y], [triangle.c.x, triangle.c.y]]]
    var poly = t.polygon(coords, {a: null, b: null, c: null})
    
    triangles.features.push(poly)
  })
  // add values from vertices
  _.each(triangles.features, function(tri){
    var coordinateNumber = 1
    _.each(tri.geometry.coordinates[0], function(c){
      t.nearest(t.point(c[0], c[1]), points, function(err, closest){        
        if(coordinateNumber === 1){
          tri.properties.a = closest.properties[z]
        }
        else if(coordinateNumber === 2){
          tri.properties.b = closest.properties[z]
        }
        else if(coordinateNumber === 3){
          tri.properties.c = closest.properties[z]
        }
        coordinateNumber++
      })
    })
  })
  done(null, triangles)
}

function Triangle(a, b, c) {
  this.a = a
  this.b = b
  this.c = c

  var A = b.x - a.x,
      B = b.y - a.y,
      C = c.x - a.x,
      D = c.y - a.y,
      E = A * (a.x + b.x) + B * (a.y + b.y),
      F = C * (a.x + c.x) + D * (a.y + c.y),
      G = 2 * (A * (c.y - b.y) - B * (c.x - b.x)),
      minx, miny, dx, dy

  /* If the points of the triangle are collinear, then just find the
   * extremes and use the midpoint as the center of the circumcircle. */
  if(Math.abs(G) < 0.000001) {
    minx = Math.min(a.x, b.x, c.x)
    miny = Math.min(a.y, b.y, c.y)
    dx   = (Math.max(a.x, b.x, c.x) - minx) * 0.5
    dy   = (Math.max(a.y, b.y, c.y) - miny) * 0.5

    this.x = minx + dx
    this.y = miny + dy
    this.r = dx * dx + dy * dy
  }

  else {
    this.x = (D*E - B*F) / G
    this.y = (A*F - C*E) / G
    dx = this.x - a.x
    dy = this.y - a.y
    this.r = dx * dx + dy * dy
  }
}

Triangle.prototype.draw = function(ctx) {
  ctx.beginPath()
  ctx.moveTo(this.a.x, this.a.y)
  ctx.lineTo(this.b.x, this.b.y)
  ctx.lineTo(this.c.x, this.c.y)
  ctx.closePath()
  ctx.stroke()
}

function byX(a, b) {
  return b.x - a.x
}

function dedup(edges) {
  var j = edges.length,
      a, b, i, m, n

  outer: while(j) {
    b = edges[--j]
    a = edges[--j]
    i = j
    while(i) {
      n = edges[--i]
      m = edges[--i]
      if((a === m && b === n) || (a === n && b === m)) {
        edges.splice(j, 2)
        edges.splice(i, 2)
        j -= 2
        continue outer
      }
    }
  }
}

function triangulate(vertices) {
  /* Bail if there aren't enough vertices to form any triangles. */
  if(vertices.length < 3)
    return []

  /* Ensure the vertex array is in order of descending X coordinate
   * (which is needed to ensure a subquadratic runtime), and then find
   * the bounding box around the points. */
  vertices.sort(byX)

  var i    = vertices.length - 1,
      xmin = vertices[i].x,
      xmax = vertices[0].x,
      ymin = vertices[i].y,
      ymax = ymin

  while(i--) {
    if(vertices[i].y < ymin) ymin = vertices[i].y
    if(vertices[i].y > ymax) ymax = vertices[i].y
  }

  /* Find a supertriangle, which is a triangle that surrounds all the
   * vertices. This is used like something of a sentinel value to remove
   * cases in the main algorithm, and is removed before we return any
   * results.
   *
   * Once found, put it in the "open" list. (The "open" list is for
   * triangles who may still need to be considered; the "closed" list is
   * for triangles which do not.) */
  var dx     = xmax - xmin,
      dy     = ymax - ymin,
      dmax   = (dx > dy) ? dx : dy,
      xmid   = (xmax + xmin) * 0.5,
      ymid   = (ymax + ymin) * 0.5,
      open   = [
        new Triangle(
          {x: xmid - 20 * dmax, y: ymid -      dmax, __sentinel: true},
          {x: xmid            , y: ymid + 20 * dmax, __sentinel: true},
          {x: xmid + 20 * dmax, y: ymid -      dmax, __sentinel: true}
        )
      ],
      closed = [],
      edges = [],
      j, a, b

  /* Incrementally add each vertex to the mesh. */
  i = vertices.length
  while(i--) {
    /* For each open triangle, check to see if the current point is
     * inside it's circumcircle. If it is, remove the triangle and add
     * it's edges to an edge list. */
    edges.length = 0
    j = open.length
    while(j--) {
      /* If this point is to the right of this triangle's circumcircle,
       * then this triangle should never get checked again. Remove it
       * from the open list, add it to the closed list, and skip. */
      dx = vertices[i].x - open[j].x
      if(dx > 0 && dx * dx > open[j].r) {
        closed.push(open[j])
        open.splice(j, 1)
        continue
      }

      /* If not, skip this triangle. */
      dy = vertices[i].y - open[j].y
      if(dx * dx + dy * dy > open[j].r)
        continue

      /* Remove the triangle and add it's edges to the edge list. */
      edges.push(
        open[j].a, open[j].b,
        open[j].b, open[j].c,
        open[j].c, open[j].a
      )
      open.splice(j, 1)
    }

    /* Remove any doubled edges. */
    dedup(edges)

    /* Add a new triangle for each edge. */
    j = edges.length
    while(j) {
      b = edges[--j]
      a = edges[--j]
      open.push(new Triangle(a, b, vertices[i]))
    }
  }

  /* Copy any remaining open triangles to the closed list, and then
   * remove any triangles that share a vertex with the supertriangle. */
  Array.prototype.push.apply(closed, open)

  i = closed.length
  while(i--)
    if(closed[i].a.__sentinel ||
       closed[i].b.__sentinel ||
       closed[i].c.__sentinel)
      closed.splice(i, 1)

  /* Yay, we're done! */
  return closed
}

/*if (typeof module !== 'undefined') {
    module.exports = {
        Triangle: Triangle,
        triangulate: triangulate
    }
}*/

},{"./nearest":31,"./point":33,"./polygon":34,"lodash":71}],46:[function(require,module,exports){
var topojson = require('topojson')

module.exports = function(geojson, done){
  var topology = topojson.topology({geojson: geojson})
  done(null, topology)
}
},{"topojson":73}],47:[function(require,module,exports){
// look here for help http://svn.osgeo.org/grass/grass/branches/releasebranch_6_4/vector/v.overlay/main.c
//must be array of polygons

// depend on jsts for now https://github.com/bjornharrtell/jsts/blob/master/examples/overlay.html

var jsts = require('jsts')
var t = {}
t.featurecollection = require('./featurecollection')

module.exports = function(polys1, polys2, done){
  var reader = new jsts.io.GeoJSONReader()
  var a = reader.read(JSON.stringify(polys1.features[0].geometry))
  var b = reader.read(JSON.stringify(polys2.features[0].geometry))
  var union = a.union(b);
  var parser = new jsts.io.GeoJSONParser()
  union = parser.write(union)
  union = t.featurecollection([union])
  done(null, union)
}
},{"./featurecollection":18,"jsts":49}],48:[function(require,module,exports){
var t = {}
var _ = require('lodash'),
    ss = require('simple-statistics')
t.inside = require('./inside')

module.exports = function(polyFC, ptFC, inField, outField, done){
  _.each(polyFC.features, function(poly){
    if(!poly.properties){
      poly.properties = {}
    }
    var values = []
    _.each(ptFC.features, function(pt){
      t.inside(pt, poly, function(err, isInside){
        if(isInside){
          values.push(pt.properties[inField])
        }
      })
    })
    poly.properties[outField] = ss.variance(values)
  })
  done(null, polyFC)
}
},{"./inside":22,"lodash":71,"simple-statistics":72}],49:[function(require,module,exports){
'use strict';
GLOBAL.javascript = {};
GLOBAL.javascript.util = require('javascript.util');
var jsts = require('./lib/jsts');
module.exports = jsts

},{"./lib/jsts":50,"javascript.util":51}],50:[function(require,module,exports){
/* The JSTS Topology Suite is a collection of JavaScript classes that
implement the fundamental operations required to validate a given
geo-spatial data set to a known topological specification.

Copyright (C) 2011 The Authors

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA */
jsts={version:'0.13.2',algorithm:{distance:{},locate:{}},error:{},geom:{util:{}},geomgraph:{index:{}},index:{bintree:{},chain:{},kdtree:{},quadtree:{},strtree:{}},io:{},noding:{snapround:{}},operation:{buffer:{},distance:{},overlay:{snap:{}},polygonize:{},relate:{},union:{},valid:{}},planargraph:{},simplify:{},triangulate:{quadedge:{}},util:{}};if(typeof String.prototype.trim!=='function'){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,'');};}
jsts.abstractFunc=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.error={};jsts.error.IllegalArgumentError=function(message){this.name='IllegalArgumentError';this.message=message;};jsts.error.IllegalArgumentError.prototype=new Error();jsts.error.TopologyError=function(message,pt){this.name='TopologyError';this.message=pt?message+' [ '+pt+' ]':message;};jsts.error.TopologyError.prototype=new Error();jsts.error.AbstractMethodInvocationError=function(){this.name='AbstractMethodInvocationError';this.message='Abstract method called, should be implemented in subclass.';};jsts.error.AbstractMethodInvocationError.prototype=new Error();jsts.error.NotImplementedError=function(){this.name='NotImplementedError';this.message='This method has not yet been implemented.';};jsts.error.NotImplementedError.prototype=new Error();jsts.error.NotRepresentableError=function(message){this.name='NotRepresentableError';this.message=message;};jsts.error.NotRepresentableError.prototype=new Error();jsts.error.LocateFailureError=function(message){this.name='LocateFailureError';this.message=message;};jsts.error.LocateFailureError.prototype=new Error();if(typeof module!=="undefined")module.exports=jsts;jsts.geom.GeometryFilter=function(){};jsts.geom.GeometryFilter.prototype.filter=function(geom){throw new jsts.error.AbstractMethodInvocationError();};jsts.geom.util.PolygonExtracter=function(comps){this.comps=comps;};jsts.geom.util.PolygonExtracter.prototype=new jsts.geom.GeometryFilter();jsts.geom.util.PolygonExtracter.prototype.comps=null;jsts.geom.util.PolygonExtracter.getPolygons=function(geom,list){if(list===undefined){list=[];}
if(geom instanceof jsts.geom.Polygon){list.push(geom);}else if(geom instanceof jsts.geom.GeometryCollection){geom.apply(new jsts.geom.util.PolygonExtracter(list));}
return list;};jsts.geom.util.PolygonExtracter.prototype.filter=function(geom){if(geom instanceof jsts.geom.Polygon)
this.comps.push(geom);};jsts.io.WKTParser=function(geometryFactory){this.geometryFactory=geometryFactory||new jsts.geom.GeometryFactory();this.regExes={'typeStr':/^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,'emptyTypeStr':/^\s*(\w+)\s*EMPTY\s*$/,'spaces':/\s+/,'parenComma':/\)\s*,\s*\(/,'doubleParenComma':/\)\s*\)\s*,\s*\(\s*\(/,'trimParens':/^\s*\(?(.*?)\)?\s*$/};};jsts.io.WKTParser.prototype.read=function(wkt){var geometry,type,str;wkt=wkt.replace(/[\n\r]/g,' ');var matches=this.regExes.typeStr.exec(wkt);if(wkt.search('EMPTY')!==-1){matches=this.regExes.emptyTypeStr.exec(wkt);matches[2]=undefined;}
if(matches){type=matches[1].toLowerCase();str=matches[2];if(this.parse[type]){geometry=this.parse[type].apply(this,[str]);}}
if(geometry===undefined)
throw new Error('Could not parse WKT '+wkt);return geometry;};jsts.io.WKTParser.prototype.write=function(geometry){return this.extractGeometry(geometry);};jsts.io.WKTParser.prototype.extractGeometry=function(geometry){var type=geometry.CLASS_NAME.split('.')[2].toLowerCase();if(!this.extract[type]){return null;}
var wktType=type.toUpperCase();var data;if(geometry.isEmpty()){data=wktType+' EMPTY';}else{data=wktType+'('+this.extract[type].apply(this,[geometry])+')';}
return data;};jsts.io.WKTParser.prototype.extract={'coordinate':function(coordinate){return coordinate.x+' '+coordinate.y;},'point':function(point){return point.coordinate.x+' '+point.coordinate.y;},'multipoint':function(multipoint){var array=[];for(var i=0,len=multipoint.geometries.length;i<len;++i){array.push('('+
this.extract.point.apply(this,[multipoint.geometries[i]])+')');}
return array.join(',');},'linestring':function(linestring){var array=[];for(var i=0,len=linestring.points.length;i<len;++i){array.push(this.extract.coordinate.apply(this,[linestring.points[i]]));}
return array.join(',');},'multilinestring':function(multilinestring){var array=[];for(var i=0,len=multilinestring.geometries.length;i<len;++i){array.push('('+
this.extract.linestring.apply(this,[multilinestring.geometries[i]])+')');}
return array.join(',');},'polygon':function(polygon){var array=[];array.push('('+this.extract.linestring.apply(this,[polygon.shell])+')');for(var i=0,len=polygon.holes.length;i<len;++i){array.push('('+this.extract.linestring.apply(this,[polygon.holes[i]])+')');}
return array.join(',');},'multipolygon':function(multipolygon){var array=[];for(var i=0,len=multipolygon.geometries.length;i<len;++i){array.push('('+this.extract.polygon.apply(this,[multipolygon.geometries[i]])+')');}
return array.join(',');},'geometrycollection':function(collection){var array=[];for(var i=0,len=collection.geometries.length;i<len;++i){array.push(this.extractGeometry.apply(this,[collection.geometries[i]]));}
return array.join(',');}};jsts.io.WKTParser.prototype.parse={'point':function(str){if(str===undefined){return this.geometryFactory.createPoint(null);}
var coords=str.trim().split(this.regExes.spaces);return this.geometryFactory.createPoint(new jsts.geom.Coordinate(coords[0],coords[1]));},'multipoint':function(str){if(str===undefined){return this.geometryFactory.createMultiPoint(null);}
var point;var points=str.trim().split(',');var components=[];for(var i=0,len=points.length;i<len;++i){point=points[i].replace(this.regExes.trimParens,'$1');components.push(this.parse.point.apply(this,[point]));}
return this.geometryFactory.createMultiPoint(components);},'linestring':function(str){if(str===undefined){return this.geometryFactory.createLineString(null);}
var points=str.trim().split(',');var components=[];var coords;for(var i=0,len=points.length;i<len;++i){coords=points[i].trim().split(this.regExes.spaces);components.push(new jsts.geom.Coordinate(coords[0],coords[1]));}
return this.geometryFactory.createLineString(components);},'linearring':function(str){if(str===undefined){return this.geometryFactory.createLinearRing(null);}
var points=str.trim().split(',');var components=[];var coords;for(var i=0,len=points.length;i<len;++i){coords=points[i].trim().split(this.regExes.spaces);components.push(new jsts.geom.Coordinate(coords[0],coords[1]));}
return this.geometryFactory.createLinearRing(components);},'multilinestring':function(str){if(str===undefined){return this.geometryFactory.createMultiLineString(null);}
var line;var lines=str.trim().split(this.regExes.parenComma);var components=[];for(var i=0,len=lines.length;i<len;++i){line=lines[i].replace(this.regExes.trimParens,'$1');components.push(this.parse.linestring.apply(this,[line]));}
return this.geometryFactory.createMultiLineString(components);},'polygon':function(str){if(str===undefined){return this.geometryFactory.createPolygon(null);}
var ring,linestring,linearring;var rings=str.trim().split(this.regExes.parenComma);var shell;var holes=[];for(var i=0,len=rings.length;i<len;++i){ring=rings[i].replace(this.regExes.trimParens,'$1');linestring=this.parse.linestring.apply(this,[ring]);linearring=this.geometryFactory.createLinearRing(linestring.points);if(i===0){shell=linearring;}else{holes.push(linearring);}}
return this.geometryFactory.createPolygon(shell,holes);},'multipolygon':function(str){if(str===undefined){return this.geometryFactory.createMultiPolygon(null);}
var polygon;var polygons=str.trim().split(this.regExes.doubleParenComma);var components=[];for(var i=0,len=polygons.length;i<len;++i){polygon=polygons[i].replace(this.regExes.trimParens,'$1');components.push(this.parse.polygon.apply(this,[polygon]));}
return this.geometryFactory.createMultiPolygon(components);},'geometrycollection':function(str){if(str===undefined){return this.geometryFactory.createGeometryCollection(null);}
str=str.replace(/,\s*([A-Za-z])/g,'|$1');var wktArray=str.trim().split('|');var components=[];for(var i=0,len=wktArray.length;i<len;++i){components.push(jsts.io.WKTParser.prototype.read.apply(this,[wktArray[i]]));}
return this.geometryFactory.createGeometryCollection(components);}};jsts.algorithm.HCoordinate=function(){this.x=0.0;this.y=0.0;this.w=1.0;if(arguments.length===1){this.initFrom1Coordinate(arguments[0]);}else if(arguments.length===2&&arguments[0]instanceof jsts.geom.Coordinate){this.initFrom2Coordinates(arguments[0],arguments[1]);}else if(arguments.length===2&&arguments[0]instanceof jsts.algorithm.HCoordinate){this.initFrom2HCoordinates(arguments[0],arguments[1]);}else if(arguments.length===2){this.initFromXY(arguments[0],arguments[1]);}else if(arguments.length===3){this.initFromXYW(arguments[0],arguments[1],arguments[2]);}else if(arguments.length===4){this.initFromXYW(arguments[0],arguments[1],arguments[2],arguments[3]);}};jsts.algorithm.HCoordinate.intersection=function(p1,p2,q1,q2){var px,py,pw,qx,qy,qw,x,y,w,xInt,yInt;px=p1.y-p2.y;py=p2.x-p1.x;pw=p1.x*p2.y-p2.x*p1.y;qx=q1.y-q2.y;qy=q2.x-q1.x;qw=q1.x*q2.y-q2.x*q1.y;x=py*qw-qy*pw;y=qx*pw-px*qw;w=px*qy-qx*py;xInt=x/w;yInt=y/w;if(!isFinite(xInt)||!isFinite(yInt)){throw new jsts.error.NotRepresentableError();}
return new jsts.geom.Coordinate(xInt,yInt);};jsts.algorithm.HCoordinate.prototype.initFrom1Coordinate=function(p){this.x=p.x;this.y=p.y;this.w=1.0;};jsts.algorithm.HCoordinate.prototype.initFrom2Coordinates=function(p1,p2){this.x=p1.y-p2.y;this.y=p2.x-p1.x;this.w=p1.x*p2.y-p2.x*p1.y;};jsts.algorithm.HCoordinate.prototype.initFrom2HCoordinates=function(p1,p2){this.x=p1.y*p2.w-p2.y*p1.w;this.y=p2.x*p1.w-p1.x*p2.w;this.w=p1.x*p2.y-p2.x*p1.y;};jsts.algorithm.HCoordinate.prototype.initFromXYW=function(x,y,w){this.x=x;this.y=y;this.w=w;};jsts.algorithm.HCoordinate.prototype.initFromXY=function(x,y){this.x=x;this.y=y;this.w=1.0;};jsts.algorithm.HCoordinate.prototype.initFrom4Coordinates=function(p1,p2,q1,q2){var px,py,pw,qx,qy,qw;px=p1.y-p2.y;py=p2.x-p1.x;pw=p1.x*p2.y-p2.x*p1.y;qx=q1.y-q2.y;qy=q2.x-q1.x;qw=q1.x*q2.y-q2.x*q1.y;this.x=py*qw-qy*pw;this.y=qx*pw-px*qw;this.w=px*qy-qx*py;};jsts.algorithm.HCoordinate.prototype.getX=function(){var a=this.x/this.w;if(!isFinite(a)){throw new jsts.error.NotRepresentableError();}
return a;};jsts.algorithm.HCoordinate.prototype.getY=function(){var a=this.y/this.w;if(!isFinite(a)){throw new jsts.error.NotRepresentableError();}
return a;};jsts.algorithm.HCoordinate.prototype.getCoordinate=function(){var p=new jsts.geom.Coordinate();p.x=this.getX();p.y=this.getY();return p;};jsts.algorithm.CGAlgorithms=function(){};jsts.algorithm.CGAlgorithms.CLOCKWISE=-1;jsts.algorithm.CGAlgorithms.RIGHT=jsts.algorithm.CGAlgorithms.CLOCKWISE;jsts.algorithm.CGAlgorithms.COUNTERCLOCKWISE=1;jsts.algorithm.CGAlgorithms.LEFT=jsts.algorithm.CGAlgorithms.COUNTERCLOCKWISE;jsts.algorithm.CGAlgorithms.COLLINEAR=0;jsts.algorithm.CGAlgorithms.STRAIGHT=jsts.algorithm.CGAlgorithms.COLLINEAR;jsts.algorithm.CGAlgorithms.orientationIndex=function(p1,p2,q){var dx1,dy1,dx2,dy2;dx1=p2.x-p1.x;dy1=p2.y-p1.y;dx2=q.x-p2.x;dy2=q.y-p2.y;return jsts.algorithm.RobustDeterminant.signOfDet2x2(dx1,dy1,dx2,dy2);};jsts.algorithm.CGAlgorithms.isPointInRing=function(p,ring){return jsts.algorithm.CGAlgorithms.locatePointInRing(p,ring)!==jsts.geom.Location.EXTERIOR;};jsts.algorithm.CGAlgorithms.locatePointInRing=function(p,ring){return jsts.algorithm.RayCrossingCounter.locatePointInRing(p,ring);};jsts.algorithm.CGAlgorithms.isOnLine=function(p,pt){var lineIntersector,i,il,p0,p1;lineIntersector=new jsts.algorithm.RobustLineIntersector();for(i=1,il=pt.length;i<il;i++){p0=pt[i-1];p1=pt[i];lineIntersector.computeIntersection(p,p0,p1);if(lineIntersector.hasIntersection()){return true;}}
return false;};jsts.algorithm.CGAlgorithms.isCCW=function(ring){var nPts,hiPt,hiIndex,p,iPrev,iNext,prev,next,i,disc,isCCW;nPts=ring.length-1;if(nPts<3){throw new jsts.IllegalArgumentError('Ring has fewer than 3 points, so orientation cannot be determined');}
hiPt=ring[0];hiIndex=0;i=1;for(i;i<=nPts;i++){p=ring[i];if(p.y>hiPt.y){hiPt=p;hiIndex=i;}}
iPrev=hiIndex;do{iPrev=iPrev-1;if(iPrev<0){iPrev=nPts;}}while(ring[iPrev].equals2D(hiPt)&&iPrev!==hiIndex);iNext=hiIndex;do{iNext=(iNext+1)%nPts;}while(ring[iNext].equals2D(hiPt)&&iNext!==hiIndex);prev=ring[iPrev];next=ring[iNext];if(prev.equals2D(hiPt)||next.equals2D(hiPt)||prev.equals2D(next)){return false;}
disc=jsts.algorithm.CGAlgorithms.computeOrientation(prev,hiPt,next);isCCW=false;if(disc===0){isCCW=(prev.x>next.x);}else{isCCW=(disc>0);}
return isCCW;};jsts.algorithm.CGAlgorithms.computeOrientation=function(p1,p2,q){return jsts.algorithm.CGAlgorithms.orientationIndex(p1,p2,q);};jsts.algorithm.CGAlgorithms.distancePointLine=function(p,A,B){if(!(A instanceof jsts.geom.Coordinate)){jsts.algorithm.CGAlgorithms.distancePointLine2.apply(this,arguments);}
if(A.x===B.x&&A.y===B.y){return p.distance(A);}
var r,s;r=((p.x-A.x)*(B.x-A.x)+(p.y-A.y)*(B.y-A.y))/((B.x-A.x)*(B.x-A.x)+(B.y-A.y)*(B.y-A.y));if(r<=0.0){return p.distance(A);}
if(r>=1.0){return p.distance(B);}
s=((A.y-p.y)*(B.x-A.x)-(A.x-p.x)*(B.y-A.y))/((B.x-A.x)*(B.x-A.x)+(B.y-A.y)*(B.y-A.y));return Math.abs(s)*Math.sqrt(((B.x-A.x)*(B.x-A.x)+(B.y-A.y)*(B.y-A.y)));};jsts.algorithm.CGAlgorithms.distancePointLinePerpendicular=function(p,A,B){var s=((A.y-p.y)*(B.x-A.x)-(A.x-p.x)*(B.y-A.y))/((B.x-A.x)*(B.x-A.x)+(B.y-A.y)*(B.y-A.y));return Math.abs(s)*Math.sqrt(((B.x-A.x)*(B.x-A.x)+(B.y-A.y)*(B.y-A.y)));};jsts.algorithm.CGAlgorithms.distancePointLine2=function(p,line){var minDistance,i,il,dist;if(line.length===0){throw new jsts.error.IllegalArgumentError('Line array must contain at least one vertex');}
minDistance=p.distance(line[0]);for(i=0,il=line.length-1;i<il;i++){dist=jsts.algorithm.CGAlgorithms.distancePointLine(p,line[i],line[i+1]);if(dist<minDistance){minDistance=dist;}}
return minDistance;};jsts.algorithm.CGAlgorithms.distanceLineLine=function(A,B,C,D){if(A.equals(B)){return jsts.algorithm.CGAlgorithms.distancePointLine(A,C,D);}
if(C.equals(D)){return jsts.algorithm.CGAlgorithms.distancePointLine(D,A,B);}
var r_top,r_bot,s_top,s_bot,s,r;r_top=(A.y-C.y)*(D.x-C.x)-(A.x-C.x)*(D.y-C.y);r_bot=(B.x-A.x)*(D.y-C.y)-(B.y-A.y)*(D.x-C.x);s_top=(A.y-C.y)*(B.x-A.x)-(A.x-C.x)*(B.y-A.y);s_bot=(B.x-A.x)*(D.y-C.y)-(B.y-A.y)*(D.x-C.x);if((r_bot===0)||(s_bot===0)){return Math.min(jsts.algorithm.CGAlgorithms.distancePointLine(A,C,D),Math.min(jsts.algorithm.CGAlgorithms.distancePointLine(B,C,D),Math.min(jsts.algorithm.CGAlgorithms.distancePointLine(C,A,B),jsts.algorithm.CGAlgorithms.distancePointLine(D,A,B))));}
s=s_top/s_bot;r=r_top/r_bot;if((r<0)||(r>1)||(s<0)||(s>1)){return Math.min(jsts.algorithm.CGAlgorithms.distancePointLine(A,C,D),Math.min(jsts.algorithm.CGAlgorithms.distancePointLine(B,C,D),Math.min(jsts.algorithm.CGAlgorithms.distancePointLine(C,A,B),jsts.algorithm.CGAlgorithms.distancePointLine(D,A,B))));}
return 0.0;};jsts.algorithm.CGAlgorithms.signedArea=function(ring){if(ring.length<3){return 0.0;}
var sum,i,il,bx,by,cx,cy;sum=0.0;for(i=0,il=ring.length-1;i<il;i++){bx=ring[i].x;by=ring[i].y;cx=ring[i+1].x;cy=ring[i+1].y;sum+=(bx+cx)*(cy-by);}
return-sum/2.0;};jsts.algorithm.CGAlgorithms.signedArea=function(ring){var n,sum,p,bx,by,i,cx,cy;n=ring.length;if(n<3){return 0.0;}
sum=0.0;p=ring[0];bx=p.x;by=p.y;for(i=1;i<n;i++){p=ring[i];cx=p.x;cy=p.y;sum+=(bx+cx)*(cy-by);bx=cx;by=cy;}
return-sum/2.0;};jsts.algorithm.CGAlgorithms.computeLength=function(pts){var n=pts.length,len,x0,y0,x1,y1,dx,dy,p,i,il;if(n<=1){return 0.0;}
len=0.0;p=pts[0];x0=p.x;y0=p.y;i=1,il=n;for(i;i<n;i++){p=pts[i];x1=p.x;y1=p.y;dx=x1-x0;dy=y1-y0;len+=Math.sqrt(dx*dx+dy*dy);x0=x1;y0=y1;}
return len;};jsts.algorithm.CGAlgorithms.length=function(){};jsts.algorithm.Angle=function(){};jsts.algorithm.Angle.PI_TIMES_2=2.0*Math.PI;jsts.algorithm.Angle.PI_OVER_2=Math.PI/2.0;jsts.algorithm.Angle.PI_OVER_4=Math.PI/4.0;jsts.algorithm.Angle.COUNTERCLOCKWISE=jsts.algorithm.CGAlgorithms.prototype.COUNTERCLOCKWISE;jsts.algorithm.Angle.CLOCKWISE=jsts.algorithm.CGAlgorithms.prototype.CLOCKWISE;jsts.algorithm.Angle.NONE=jsts.algorithm.CGAlgorithms.prototype.COLLINEAR;jsts.algorithm.Angle.toDegrees=function(radians){return(radians*180)/Math.PI;};jsts.algorithm.Angle.toRadians=function(angleDegrees){return(angleDegrees*Math.PI)/180.0;};jsts.algorithm.Angle.angle=function(){if(arguments.length===1){return jsts.algorithm.Angle.angleFromOrigo(arguments[0]);}else{return jsts.algorithm.Angle.angleBetweenCoords(arguments[0],arguments[1]);}};jsts.algorithm.Angle.angleBetweenCoords=function(p0,p1){var dx,dy;dx=p1.x-p0.x;dy=p1.y-p0.y;return Math.atan2(dy,dx);};jsts.algorithm.Angle.angleFromOrigo=function(p){return Math.atan2(p.y,p.x);};jsts.algorithm.Angle.isAcute=function(p0,p1,p2){var dx0,dy0,dx1,dy1,dotprod;dx0=p0.x-p1.x;dy0=p0.y-p1.y;dx1=p2.x-p1.x;dy1=p2.y-p1.y;dotprod=dx0*dx1+dy0*dy1;return dotprod>0;};jsts.algorithm.Angle.isObtuse=function(p0,p1,p2){var dx0,dy0,dx1,dy1,dotprod;dx0=p0.x-p1.x;dy0=p0.y-p1.y;dx1=p2.x-p1.x;dy1=p2.y-p1.y;dotprod=dx0*dx1+dy0*dy1;return dotprod<0;};jsts.algorithm.Angle.angleBetween=function(tip1,tail,tip2){var a1,a2;a1=jsts.algorithm.Angle.angle(tail,tip1);a2=jsts.algorithm.Angle.angle(tail,tip2);return jsts.algorithm.Angle.diff(a1,a2);};jsts.algorithm.Angle.angleBetweenOriented=function(tip1,tail,tip2){var a1,a2,angDel;a1=jsts.algorithm.Angle.angle(tail,tip1);a2=jsts.algorithm.Angle.angle(tail,tip2);angDel=a2-a1;if(angDel<=-Math.PI){return angDel+jsts.algorithm.Angle.PI_TIMES_2;}
if(angDel>Math.PI){return angDel-jsts.algorithm.Angle.PI_TIMES_2;}
return angDel;};jsts.algorithm.Angle.interiorAngle=function(p0,p1,p2){var anglePrev,angleNext;anglePrev=jsts.algorithm.Angle.angle(p1,p0);angleNext=jsts.algorithm.Angle.angle(p1,p2);return Math.abs(angleNext-anglePrev);};jsts.algorithm.Angle.getTurn=function(ang1,ang2){var crossproduct=Math.sin(ang2-ang1);if(crossproduct>0){return jsts.algorithm.Angle.COUNTERCLOCKWISE;}
if(crossproduct<0){return jsts.algorithm.Angle.CLOCKWISE;}
return jsts.algorithm.Angle.NONE;};jsts.algorithm.Angle.normalize=function(angle){while(angle>Math.PI){angle-=jsts.algorithm.Angle.PI_TIMES_2;}
while(angle<=-Math.PI){angle+=jsts.algorithm.Angle.PI_TIMES_2;}
return angle;};jsts.algorithm.Angle.normalizePositive=function(angle){if(angle<0.0){while(angle<0.0){angle+=jsts.algorithm.Angle.PI_TIMES_2;}
if(angle>=jsts.algorithm.Angle.PI_TIMES_2){angle=0.0;}}
else{while(angle>=jsts.algorithm.Angle.PI_TIMES_2){angle-=jsts.algorithm.Angle.PI_TIMES_2;}
if(angle<0.0){angle=0.0;}}
return angle;};jsts.algorithm.Angle.diff=function(ang1,ang2){var delAngle;if(ang1<ang2){delAngle=ang2-ang1;}else{delAngle=ang1-ang2;}
if(delAngle>Math.PI){delAngle=(2*Math.PI)-delAngle;}
return delAngle;};jsts.geom.GeometryComponentFilter=function(){};jsts.geom.GeometryComponentFilter.prototype.filter=function(geom){throw new jsts.error.AbstractMethodInvocationError();};jsts.geom.util.LinearComponentExtracter=function(lines,isForcedToLineString){this.lines=lines;this.isForcedToLineString=isForcedToLineString;};jsts.geom.util.LinearComponentExtracter.prototype=new jsts.geom.GeometryComponentFilter();jsts.geom.util.LinearComponentExtracter.prototype.lines=null;jsts.geom.util.LinearComponentExtracter.prototype.isForcedToLineString=false;jsts.geom.util.LinearComponentExtracter.getLines=function(geoms,lines){if(arguments.length==1){return jsts.geom.util.LinearComponentExtracter.getLines5.apply(this,arguments);}
else if(arguments.length==2&&typeof lines==='boolean'){return jsts.geom.util.LinearComponentExtracter.getLines6.apply(this,arguments);}
else if(arguments.length==2&&geoms instanceof jsts.geom.Geometry){return jsts.geom.util.LinearComponentExtracter.getLines3.apply(this,arguments);}
else if(arguments.length==3&&geoms instanceof jsts.geom.Geometry){return jsts.geom.util.LinearComponentExtracter.getLines4.apply(this,arguments);}
else if(arguments.length==3){return jsts.geom.util.LinearComponentExtracter.getLines2.apply(this,arguments);}
for(var i=0;i<geoms.length;i++){var g=geoms[i];jsts.geom.util.LinearComponentExtracter.getLines3(g,lines);}
return lines;};jsts.geom.util.LinearComponentExtracter.getLines2=function(geoms,lines,forceToLineString){for(var i=0;i<geoms.length;i++){var g=geoms[i];jsts.geom.util.LinearComponentExtracter.getLines4(g,lines,forceToLineString);}
return lines;};jsts.geom.util.LinearComponentExtracter.getLines3=function(geom,lines){if(geom instanceof LineString){lines.add(geom);}else{geom.apply(new jsts.geom.util.LinearComponentExtracter(lines));}
return lines;};jsts.geom.util.LinearComponentExtracter.getLines4=function(geom,lines,forceToLineString){geom.apply(new jsts.geom.util.LinearComponentExtracter(lines,forceToLineString));return lines;};jsts.geom.util.LinearComponentExtracter.getLines5=function(geom){return jsts.geom.util.LinearComponentExtracter.getLines6(geom,false);};jsts.geom.util.LinearComponentExtracter.getLines6=function(geom,forceToLineString){var lines=[];geom.apply(new jsts.geom.util.LinearComponentExtracter(lines,forceToLineString));return lines;};jsts.geom.util.LinearComponentExtracter.prototype.setForceToLineString=function(isForcedToLineString){this.isForcedToLineString=isForcedToLineString;};jsts.geom.util.LinearComponentExtracter.prototype.filter=function(geom){if(this.isForcedToLineString&&geom instanceof jsts.geom.LinearRing){var line=geom.getFactory().createLineString(geom.getCoordinateSequence());this.lines.push(line);return;}
if(geom instanceof jsts.geom.LineString||geom instanceof jsts.geom.LinearRing)
this.lines.push(geom);};(function(){var GraphComponent=function(){};GraphComponent.setVisited=function(i,visited){while(i.hasNext()){var comp=i.next();comp.setVisited(visited);}};GraphComponent.setMarked=function(i,marked){while(i.hasNext()){var comp=i.next();comp.setMarked(marked);}};GraphComponent.getComponentWithVisitedState=function(i,visitedState){while(i.hasNext()){var comp=i.next();if(comp.isVisited()==visitedState)
return comp;}
return null;};GraphComponent.prototype._isMarked=false;GraphComponent.prototype._isVisited=false;GraphComponent.prototype.data;GraphComponent.prototype.isVisited=function(){return this._isVisited;};GraphComponent.prototype.setVisited=function(isVisited){this._isVisited=isVisited;};GraphComponent.prototype.isMarked=function(){return this._isMarked;};GraphComponent.prototype.setMarked=function(isMarked){this._isMarked=isMarked;};GraphComponent.prototype.setContext=function(data){this.data=data;};GraphComponent.prototype.getContext=function(){return data;};GraphComponent.prototype.setData=function(data){this.data=data;};GraphComponent.prototype.getData=function(){return data;};GraphComponent.prototype.isRemoved=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.planargraph.GraphComponent=GraphComponent;})();(function(){var ArrayList=javascript.util.ArrayList;var DirectedEdgeStar=function(){this.outEdges=new ArrayList();};DirectedEdgeStar.prototype.outEdges=null;DirectedEdgeStar.prototype.sorted=false;DirectedEdgeStar.prototype.add=function(de){this.outEdges.add(de);this.sorted=false;};DirectedEdgeStar.prototype.remove=function(de){this.outEdges.remove(de);};DirectedEdgeStar.prototype.iterator=function(){this.sortEdges();return this.outEdges.iterator();};DirectedEdgeStar.prototype.getDegree=function(){return this.outEdges.size();};DirectedEdgeStar.prototype.getCoordinate=function(){var it=iterator();if(!it.hasNext())
return null;var e=it.next();return e.getCoordinate();};DirectedEdgeStar.prototype.getEdges=function(){this.sortEdges();return this.outEdges;};DirectedEdgeStar.prototype.sortEdges=function(){if(!this.sorted){var array=this.outEdges.toArray();array.sort(function(a,b){return a.compareTo(b);});this.outEdges=javascript.util.Arrays.asList(array);this.sorted=true;}};DirectedEdgeStar.prototype.getIndex=function(edge){if(edge instanceof jsts.planargraph.DirectedEdge){return this.getIndex2(edge);}else if(typeof(edge)==='number'){return this.getIndex3(edge);}
this.sortEdges();for(var i=0;i<this.outEdges.size();i++){var de=this.outEdges.get(i);if(de.getEdge()==edge)
return i;}
return-1;};DirectedEdgeStar.prototype.getIndex2=function(dirEdge){this.sortEdges();for(var i=0;i<this.outEdges.size();i++){var de=this.outEdges.get(i);if(de==dirEdge)
return i;}
return-1;};DirectedEdgeStar.prototype.getIndex3=function(i){var modi=toInt(i%this.outEdges.size());if(modi<0)
modi+=this.outEdges.size();return modi;};DirectedEdgeStar.prototype.getNextEdge=function(dirEdge){var i=this.getIndex(dirEdge);return this.outEdges.get(getIndex(i+1));};DirectedEdgeStar.prototype.getNextCWEdge=function(dirEdge){var i=this.getIndex(dirEdge);return this.outEdges.get(getIndex(i-1));};jsts.planargraph.DirectedEdgeStar=DirectedEdgeStar;})();(function(){var GraphComponent=jsts.planargraph.GraphComponent;var DirectedEdgeStar=jsts.planargraph.DirectedEdgeStar;var Node=function(pt,deStar){this.pt=pt;this.deStar=deStar||new DirectedEdgeStar();};Node.prototype=new GraphComponent();Node.getEdgesBetween=function(node0,node1){var edges0=DirectedEdge.toEdges(node0.getOutEdges().getEdges());var commonEdges=new javascript.util.HashSet(edges0);var edges1=DirectedEdge.toEdges(node1.getOutEdges().getEdges());commonEdges.retainAll(edges1);return commonEdges;};Node.prototype.pt=null;Node.prototype.deStar=null;Node.prototype.getCoordinate=function(){return this.pt;};Node.prototype.addOutEdge=function(de){this.deStar.add(de);};Node.prototype.getOutEdges=function(){return this.deStar;};Node.prototype.getDegree=function(){return this.deStar.getDegree();};Node.prototype.getIndex=function(edge){return this.deStar.getIndex(edge);};Node.prototype.remove=function(de){if(de===undefined){return this.remove2();}
this.deStar.remove(de);};Node.prototype.remove2=function(){this.pt=null;};Node.prototype.isRemoved=function(){return this.pt==null;};jsts.planargraph.Node=Node;})();(function(){jsts.io.GeoJSONReader=function(geometryFactory){this.geometryFactory=geometryFactory||new jsts.geom.GeometryFactory();this.precisionModel=this.geometryFactory.getPrecisionModel();this.parser=new jsts.io.GeoJSONParser(this.geometryFactory);};jsts.io.GeoJSONReader.prototype.read=function(geoJson){var geometry=this.parser.read(geoJson);if(this.precisionModel.getType()===jsts.geom.PrecisionModel.FIXED){this.reducePrecision(geometry);}
return geometry;};jsts.io.GeoJSONReader.prototype.reducePrecision=function(geometry){var i,len;if(geometry.coordinate){this.precisionModel.makePrecise(geometry.coordinate);}else if(geometry.points){for(i=0,len=geometry.points.length;i<len;i++){this.precisionModel.makePrecise(geometry.points[i]);}}else if(geometry.geometries){for(i=0,len=geometry.geometries.length;i<len;i++){this.reducePrecision(geometry.geometries[i]);}}};})();jsts.geom.Geometry=function(factory){this.factory=factory;};jsts.geom.Geometry.prototype.envelope=null;jsts.geom.Geometry.prototype.factory=null;jsts.geom.Geometry.prototype.getGeometryType=function(){return'Geometry';};jsts.geom.Geometry.hasNonEmptyElements=function(geometries){var i;for(i=0;i<geometries.length;i++){if(!geometries[i].isEmpty()){return true;}}
return false;};jsts.geom.Geometry.hasNullElements=function(array){var i;for(i=0;i<array.length;i++){if(array[i]===null){return true;}}
return false;};jsts.geom.Geometry.prototype.getFactory=function(){if(this.factory===null||this.factory===undefined){this.factory=new jsts.geom.GeometryFactory();}
return this.factory;};jsts.geom.Geometry.prototype.getNumGeometries=function(){return 1;};jsts.geom.Geometry.prototype.getGeometryN=function(n){return this;};jsts.geom.Geometry.prototype.getPrecisionModel=function(){return this.getFactory().getPrecisionModel();};jsts.geom.Geometry.prototype.getCoordinate=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.geom.Geometry.prototype.getCoordinates=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.geom.Geometry.prototype.getNumPoints=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.geom.Geometry.prototype.isSimple=function(){this.checkNotGeometryCollection(this);var op=new jsts.operation.IsSimpleOp(this);return op.isSimple();};jsts.geom.Geometry.prototype.isValid=function(){var isValidOp=new jsts.operation.valid.IsValidOp(this);return isValidOp.isValid();};jsts.geom.Geometry.prototype.isEmpty=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.geom.Geometry.prototype.distance=function(g){return jsts.operation.distance.DistanceOp.distance(this,g);};jsts.geom.Geometry.prototype.isWithinDistance=function(geom,distance){var envDist=this.getEnvelopeInternal().distance(geom.getEnvelopeInternal());if(envDist>distance){return false;}
return DistanceOp.isWithinDistance(this,geom,distance);};jsts.geom.Geometry.prototype.isRectangle=function(){return false;};jsts.geom.Geometry.prototype.getArea=function(){return 0.0;};jsts.geom.Geometry.prototype.getLength=function(){return 0.0;};jsts.geom.Geometry.prototype.getCentroid=function(){if(this.isEmpty()){return null;}
var cent;var centPt=null;var dim=this.getDimension();if(dim===0){cent=new jsts.algorithm.CentroidPoint();cent.add(this);centPt=cent.getCentroid();}else if(dim===1){cent=new jsts.algorithm.CentroidLine();cent.add(this);centPt=cent.getCentroid();}else{cent=new jsts.algorithm.CentroidArea();cent.add(this);centPt=cent.getCentroid();}
return this.createPointFromInternalCoord(centPt,this);};jsts.geom.Geometry.prototype.getInteriorPoint=function(){var intPt;var interiorPt=null;var dim=this.getDimension();if(dim===0){intPt=new InteriorPointPoint(this);interiorPt=intPt.getInteriorPoint();}else if(dim===1){intPt=new InteriorPointLine(this);interiorPt=intPt.getInteriorPoint();}else{intPt=new InteriorPointArea(this);interiorPt=intPt.getInteriorPoint();}
return this.createPointFromInternalCoord(interiorPt,this);};jsts.geom.Geometry.prototype.getDimension=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.geom.Geometry.prototype.getBoundary=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.geom.Geometry.prototype.getBoundaryDimension=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.geom.Geometry.prototype.getEnvelope=function(){return this.getFactory().toGeometry(this.getEnvelopeInternal());};jsts.geom.Geometry.prototype.getEnvelopeInternal=function(){if(this.envelope===null){this.envelope=this.computeEnvelopeInternal();}
return this.envelope;};jsts.geom.Geometry.prototype.disjoint=function(g){return!this.intersects(g);};jsts.geom.Geometry.prototype.touches=function(g){if(!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())){return false;}
return this.relate(g).isTouches(this.getDimension(),g.getDimension());};jsts.geom.Geometry.prototype.intersects=function(g){if(!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())){return false;}
if(this.isRectangle()){return RectangleIntersects.intersects(this,g);}
if(g.isRectangle()){return RectangleIntersects.intersects(g,this);}
return this.relate(g).isIntersects();};jsts.geom.Geometry.prototype.crosses=function(g){if(!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())){return false;}
return this.relate(g).isCrosses(this.getDimension(),g.getDimension());};jsts.geom.Geometry.prototype.within=function(g){return g.contains(this);};jsts.geom.Geometry.prototype.contains=function(g){if(!this.getEnvelopeInternal().contains(g.getEnvelopeInternal())){return false;}
if(this.isRectangle()){return RectangleContains.contains(this,g);}
return this.relate(g).isContains();};jsts.geom.Geometry.prototype.overlaps=function(g){if(!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())){return false;}
return this.relate(g).isOverlaps(this.getDimension(),g.getDimension());};jsts.geom.Geometry.prototype.covers=function(g){if(!this.getEnvelopeInternal().covers(g.getEnvelopeInternal())){return false;}
if(this.isRectangle()){return true;}
return this.relate(g).isCovers();};jsts.geom.Geometry.prototype.coveredBy=function(g){return g.covers(this);};jsts.geom.Geometry.prototype.relate=function(g,intersectionPattern){if(arguments.length===1){return this.relate2.apply(this,arguments);}
return this.relate2(g).matches(intersectionPattern);};jsts.geom.Geometry.prototype.relate2=function(g){this.checkNotGeometryCollection(this);this.checkNotGeometryCollection(g);return jsts.operation.relate.RelateOp.relate(this,g);};jsts.geom.Geometry.prototype.equalsTopo=function(g){if(!this.getEnvelopeInternal().equals(g.getEnvelopeInternal())){return false;}
return this.relate(g).isEquals(this.getDimension(),g.getDimension());};jsts.geom.Geometry.prototype.equals=function(o){if(o instanceof jsts.geom.Geometry||o instanceof jsts.geom.LinearRing||o instanceof jsts.geom.Polygon||o instanceof jsts.geom.GeometryCollection||o instanceof jsts.geom.MultiPoint||o instanceof jsts.geom.MultiLineString||o instanceof jsts.geom.MultiPolygon){return this.equalsExact(o);}
return false;};jsts.geom.Geometry.prototype.buffer=function(distance,quadrantSegments,endCapStyle){var params=new jsts.operation.buffer.BufferParameters(quadrantSegments,endCapStyle)
return jsts.operation.buffer.BufferOp.bufferOp2(this,distance,params);};jsts.geom.Geometry.prototype.convexHull=function(){return new jsts.algorithm.ConvexHull(this).getConvexHull();};jsts.geom.Geometry.prototype.intersection=function(other){if(this.isEmpty()){return this.getFactory().createGeometryCollection(null);}
if(other.isEmpty()){return this.getFactory().createGeometryCollection(null);}
if(this.isGeometryCollection(this)){var g2=other;}
this.checkNotGeometryCollection(this);this.checkNotGeometryCollection(other);return jsts.operation.overlay.snap.SnapIfNeededOverlayOp.overlayOp(this,other,jsts.operation.overlay.OverlayOp.INTERSECTION);};jsts.geom.Geometry.prototype.union=function(other){if(arguments.length===0){return jsts.operation.union.UnaryUnionOp.union(this);}
if(this.isEmpty()){return other.clone();}
if(other.isEmpty()){return this.clone();}
this.checkNotGeometryCollection(this);this.checkNotGeometryCollection(other);return jsts.operation.overlay.snap.SnapIfNeededOverlayOp.overlayOp(this,other,jsts.operation.overlay.OverlayOp.UNION);};jsts.geom.Geometry.prototype.difference=function(other){if(this.isEmpty()){return this.getFactory().createGeometryCollection(null);}
if(other.isEmpty()){return this.clone();}
this.checkNotGeometryCollection(this);this.checkNotGeometryCollection(other);return jsts.operation.overlay.snap.SnapIfNeededOverlayOp.overlayOp(this,other,jsts.operation.overlay.OverlayOp.DIFFERENCE);};jsts.geom.Geometry.prototype.symDifference=function(other){if(this.isEmpty()){return other.clone();}
if(other.isEmpty()){return this.clone();}
this.checkNotGeometryCollection(this);this.checkNotGeometryCollection(other);return jsts.operation.overlay.snap.SnapIfNeededOverlayOp.overlayOp(this,other,jsts.operation.overlay.OverlayOp.SYMDIFFERENCE);};jsts.geom.Geometry.prototype.equalsExact=function(other,tolerance){throw new jsts.error.AbstractMethodInvocationError();};jsts.geom.Geometry.prototype.equalsNorm=function(g){if(g===null||g===undefined)
return false;return this.norm().equalsExact(g.norm());};jsts.geom.Geometry.prototype.apply=function(filter){throw new jsts.error.AbstractMethodInvocationError();};jsts.geom.Geometry.prototype.clone=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.geom.Geometry.prototype.normalize=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.geom.Geometry.prototype.norm=function(){var copy=this.clone();copy.normalize();return copy;};jsts.geom.Geometry.prototype.compareTo=function(o){var other=o;if(this.getClassSortIndex()!==other.getClassSortIndex()){return this.getClassSortIndex()-other.getClassSortIndex();}
if(this.isEmpty()&&other.isEmpty()){return 0;}
if(this.isEmpty()){return-1;}
if(other.isEmpty()){return 1;}
return this.compareToSameClass(o);};jsts.geom.Geometry.prototype.isEquivalentClass=function(other){if(this instanceof jsts.geom.Point&&other instanceof jsts.geom.Point){return true;}else if(this instanceof jsts.geom.LineString&&(other instanceof jsts.geom.LineString|other instanceof jsts.geom.LinearRing)){return true;}else if(this instanceof jsts.geom.LinearRing&&(other instanceof jsts.geom.LineString|other instanceof jsts.geom.LinearRing)){return true;}else if(this instanceof jsts.geom.Polygon&&(other instanceof jsts.geom.Polygon)){return true;}else if(this instanceof jsts.geom.MultiPoint&&(other instanceof jsts.geom.MultiPoint)){return true;}else if(this instanceof jsts.geom.MultiLineString&&(other instanceof jsts.geom.MultiLineString)){return true;}else if(this instanceof jsts.geom.MultiPolygon&&(other instanceof jsts.geom.MultiPolygon)){return true;}else if(this instanceof jsts.geom.GeometryCollection&&(other instanceof jsts.geom.GeometryCollection)){return true;}
return false;};jsts.geom.Geometry.prototype.checkNotGeometryCollection=function(g){if(g.isGeometryCollectionBase()){throw new jsts.error.IllegalArgumentError('This method does not support GeometryCollection');}};jsts.geom.Geometry.prototype.isGeometryCollection=function(){return(this instanceof jsts.geom.GeometryCollection);};jsts.geom.Geometry.prototype.isGeometryCollectionBase=function(){return(this.CLASS_NAME==='jsts.geom.GeometryCollection');};jsts.geom.Geometry.prototype.computeEnvelopeInternal=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.geom.Geometry.prototype.compareToSameClass=function(o){throw new jsts.error.AbstractMethodInvocationError();};jsts.geom.Geometry.prototype.compare=function(a,b){var i=a.iterator();var j=b.iterator();while(i.hasNext()&&j.hasNext()){var aElement=i.next();var bElement=j.next();var comparison=aElement.compareTo(bElement);if(comparison!==0){return comparison;}}
if(i.hasNext()){return 1;}
if(j.hasNext()){return-1;}
return 0;};jsts.geom.Geometry.prototype.equal=function(a,b,tolerance){if(tolerance===undefined||tolerance===null||tolerance===0){return a.equals(b);}
return a.distance(b)<=tolerance;};jsts.geom.Geometry.prototype.getClassSortIndex=function(){var sortedClasses=[jsts.geom.Point,jsts.geom.MultiPoint,jsts.geom.LineString,jsts.geom.LinearRing,jsts.geom.MultiLineString,jsts.geom.Polygon,jsts.geom.MultiPolygon,jsts.geom.GeometryCollection];for(var i=0;i<sortedClasses.length;i++){if(this instanceof sortedClasses[i])
return i;}
jsts.util.Assert.shouldNeverReachHere('Class not supported: '+this);return-1;};jsts.geom.Geometry.prototype.toString=function(){return new jsts.io.WKTWriter().write(this);};jsts.geom.Geometry.prototype.createPointFromInternalCoord=function(coord,exemplar){exemplar.getPrecisionModel().makePrecise(coord);return exemplar.getFactory().createPoint(coord);};(function(){jsts.geom.Coordinate=function(x,y){if(typeof x==='number'){this.x=x;this.y=y;}else if(x instanceof jsts.geom.Coordinate){this.x=parseFloat(x.x);this.y=parseFloat(x.y);}else if(x===undefined||x===null){this.x=0;this.y=0;}else if(typeof x==='string'){this.x=parseFloat(x);this.y=parseFloat(y);}};jsts.geom.Coordinate.prototype.setCoordinate=function(other){this.x=other.x;this.y=other.y;};jsts.geom.Coordinate.prototype.clone=function(){return new jsts.geom.Coordinate(this.x,this.y);};jsts.geom.Coordinate.prototype.distance=function(p){var dx=this.x-p.x;var dy=this.y-p.y;return Math.sqrt(dx*dx+dy*dy);};jsts.geom.Coordinate.prototype.equals2D=function(other){if(this.x!==other.x){return false;}
if(this.y!==other.y){return false;}
return true;};jsts.geom.Coordinate.prototype.equals=function(other){if(!other instanceof jsts.geom.Coordinate||other===undefined){return false;}
return this.equals2D(other);};jsts.geom.Coordinate.prototype.compareTo=function(other){if(this.x<other.x){return-1;}
if(this.x>other.x){return 1;}
if(this.y<other.y){return-1;}
if(this.y>other.y){return 1;}
return 0;};jsts.geom.Coordinate.prototype.toString=function(){return'('+this.x+', '+this.y+')';};})();jsts.geom.Envelope=function(){jsts.geom.Envelope.prototype.init.apply(this,arguments);};jsts.geom.Envelope.prototype.minx=null;jsts.geom.Envelope.prototype.maxx=null;jsts.geom.Envelope.prototype.miny=null;jsts.geom.Envelope.prototype.maxy=null;jsts.geom.Envelope.prototype.init=function(){if(typeof arguments[0]==='number'&&arguments.length===4){this.initFromValues(arguments[0],arguments[1],arguments[2],arguments[3]);}else if(arguments[0]instanceof jsts.geom.Coordinate&&arguments.length===1){this.initFromCoordinate(arguments[0]);}else if(arguments[0]instanceof jsts.geom.Coordinate&&arguments.length===2){this.initFromCoordinates(arguments[0],arguments[1]);}else if(arguments[0]instanceof jsts.geom.Envelope&&arguments.length===1){this.initFromEnvelope(arguments[0]);}else{this.setToNull();}};jsts.geom.Envelope.prototype.initFromValues=function(x1,x2,y1,y2){if(x1<x2){this.minx=x1;this.maxx=x2;}else{this.minx=x2;this.maxx=x1;}
if(y1<y2){this.miny=y1;this.maxy=y2;}else{this.miny=y2;this.maxy=y1;}};jsts.geom.Envelope.prototype.initFromCoordinates=function(p1,p2){this.initFromValues(p1.x,p2.x,p1.y,p2.y);};jsts.geom.Envelope.prototype.initFromCoordinate=function(p){this.initFromValues(p.x,p.x,p.y,p.y);};jsts.geom.Envelope.prototype.initFromEnvelope=function(env){this.minx=env.minx;this.maxx=env.maxx;this.miny=env.miny;this.maxy=env.maxy;};jsts.geom.Envelope.prototype.setToNull=function(){this.minx=0;this.maxx=-1;this.miny=0;this.maxy=-1;};jsts.geom.Envelope.prototype.isNull=function(){return this.maxx<this.minx;};jsts.geom.Envelope.prototype.getHeight=function(){if(this.isNull()){return 0;}
return this.maxy-this.miny;};jsts.geom.Envelope.prototype.getWidth=function(){if(this.isNull()){return 0;}
return this.maxx-this.minx;};jsts.geom.Envelope.prototype.getMinX=function(){return this.minx;};jsts.geom.Envelope.prototype.getMaxX=function(){return this.maxx;};jsts.geom.Envelope.prototype.getMinY=function(){return this.miny;};jsts.geom.Envelope.prototype.getMaxY=function(){return this.maxy;};jsts.geom.Envelope.prototype.getArea=function(){return this.getWidth()*this.getHeight();};jsts.geom.Envelope.prototype.expandToInclude=function(){if(arguments[0]instanceof jsts.geom.Coordinate){this.expandToIncludeCoordinate(arguments[0]);}else if(arguments[0]instanceof jsts.geom.Envelope){this.expandToIncludeEnvelope(arguments[0]);}else{this.expandToIncludeValues(arguments[0],arguments[1]);}};jsts.geom.Envelope.prototype.expandToIncludeCoordinate=function(p){this.expandToIncludeValues(p.x,p.y);};jsts.geom.Envelope.prototype.expandToIncludeValues=function(x,y){if(this.isNull()){this.minx=x;this.maxx=x;this.miny=y;this.maxy=y;}else{if(x<this.minx){this.minx=x;}
if(x>this.maxx){this.maxx=x;}
if(y<this.miny){this.miny=y;}
if(y>this.maxy){this.maxy=y;}}};jsts.geom.Envelope.prototype.expandToIncludeEnvelope=function(other){if(other.isNull()){return;}
if(this.isNull()){this.minx=other.getMinX();this.maxx=other.getMaxX();this.miny=other.getMinY();this.maxy=other.getMaxY();}else{if(other.minx<this.minx){this.minx=other.minx;}
if(other.maxx>this.maxx){this.maxx=other.maxx;}
if(other.miny<this.miny){this.miny=other.miny;}
if(other.maxy>this.maxy){this.maxy=other.maxy;}}};jsts.geom.Envelope.prototype.expandBy=function(){if(arguments.length===1){this.expandByDistance(arguments[0]);}else{this.expandByDistances(arguments[0],arguments[1]);}};jsts.geom.Envelope.prototype.expandByDistance=function(distance){this.expandByDistances(distance,distance);};jsts.geom.Envelope.prototype.expandByDistances=function(deltaX,deltaY){if(this.isNull()){return;}
this.minx-=deltaX;this.maxx+=deltaX;this.miny-=deltaY;this.maxy+=deltaY;if(this.minx>this.maxx||this.miny>this.maxy){this.setToNull();}};jsts.geom.Envelope.prototype.translate=function(transX,transY){if(this.isNull()){return;}
this.init(this.minx+transX,this.maxx+transX,this.miny+transY,this.maxy+transY);};jsts.geom.Envelope.prototype.centre=function(){if(this.isNull()){return null;}
return new jsts.geom.Coordinate((this.minx+this.maxx)/2.0,(this.miny+this.maxy)/2.0);};jsts.geom.Envelope.prototype.intersection=function(env){if(this.isNull()||env.isNull()||!this.intersects(env)){return new jsts.geom.Envelope();}
var intMinX=this.minx>env.minx?this.minx:env.minx;var intMinY=this.miny>env.miny?this.miny:env.miny;var intMaxX=this.maxx<env.maxx?this.maxx:env.maxx;var intMaxY=this.maxy<env.maxy?this.maxy:env.maxy;return new jsts.geom.Envelope(intMinX,intMaxX,intMinY,intMaxY);};jsts.geom.Envelope.prototype.intersects=function(){if(arguments[0]instanceof jsts.geom.Envelope){return this.intersectsEnvelope(arguments[0]);}else if(arguments[0]instanceof jsts.geom.Coordinate){return this.intersectsCoordinate(arguments[0]);}else{return this.intersectsValues(arguments[0],arguments[1]);}};jsts.geom.Envelope.prototype.intersectsEnvelope=function(other){if(this.isNull()||other.isNull()){return false;}
var result=!(other.minx>this.maxx||other.maxx<this.minx||other.miny>this.maxy||other.maxy<this.miny);return result;};jsts.geom.Envelope.prototype.intersectsCoordinate=function(p){return this.intersectsValues(p.x,p.y);};jsts.geom.Envelope.prototype.intersectsValues=function(x,y){if(this.isNull()){return false;}
return!(x>this.maxx||x<this.minx||y>this.maxy||y<this.miny);};jsts.geom.Envelope.prototype.contains=function(){if(arguments[0]instanceof jsts.geom.Envelope){return this.containsEnvelope(arguments[0]);}else if(arguments[0]instanceof jsts.geom.Coordinate){return this.containsCoordinate(arguments[0]);}else{return this.containsValues(arguments[0],arguments[1]);}};jsts.geom.Envelope.prototype.containsEnvelope=function(other){return this.coversEnvelope(other);};jsts.geom.Envelope.prototype.containsCoordinate=function(p){return this.coversCoordinate(p);};jsts.geom.Envelope.prototype.containsValues=function(x,y){return this.coversValues(x,y);};jsts.geom.Envelope.prototype.covers=function(){if(p instanceof jsts.geom.Envelope){this.coversEnvelope(arguments[0]);}else if(p instanceof jsts.geom.Coordinate){this.coversCoordinate(arguments[0]);}else{this.coversValues(arguments[0],arguments[1]);}};jsts.geom.Envelope.prototype.coversValues=function(x,y){if(this.isNull()){return false;}
return x>=this.minx&&x<=this.maxx&&y>=this.miny&&y<=this.maxy;};jsts.geom.Envelope.prototype.coversCoordinate=function(p){return this.coversValues(p.x,p.y);};jsts.geom.Envelope.prototype.coversEnvelope=function(other){if(this.isNull()||other.isNull()){return false;}
return other.minx>=this.minx&&other.maxx<=this.maxx&&other.miny>=this.miny&&other.maxy<=this.maxy;};jsts.geom.Envelope.prototype.distance=function(env){if(this.intersects(env)){return 0;}
var dx=0.0;if(this.maxx<env.minx){dx=env.minx-this.maxx;}
if(this.minx>env.maxx){dx=this.minx-env.maxx;}
var dy=0.0;if(this.maxy<env.miny){dy=env.miny-this.maxy;}
if(this.miny>env.maxy){dy=this.miny-env.maxy;}
if(dx===0.0){return dy;}
if(dy===0.0){return dx;}
return Math.sqrt(dx*dx+dy*dy);};jsts.geom.Envelope.prototype.equals=function(other){if(this.isNull()){return other.isNull();}
return this.maxx===other.maxx&&this.maxy===other.maxy&&this.minx===other.minx&&this.miny===other.miny;};jsts.geom.Envelope.prototype.toString=function(){return'Env['+this.minx+' : '+this.maxx+', '+this.miny+' : '+
this.maxy+']';};jsts.geom.Envelope.intersects=function(p1,p2,q){if(arguments.length===4){return jsts.geom.Envelope.intersectsEnvelope(arguments[0],arguments[1],arguments[2],arguments[3]);}
var xc1=p1.x<p2.x?p1.x:p2.x;var xc2=p1.x>p2.x?p1.x:p2.x;var yc1=p1.y<p2.y?p1.y:p2.y;var yc2=p1.y>p2.y?p1.y:p2.y;if(((q.x>=xc1)&&(q.x<=xc2))&&((q.y>=yc1)&&(q.y<=yc2))){return true;}
return false;};jsts.geom.Envelope.intersectsEnvelope=function(p1,p2,q1,q2){var minq=Math.min(q1.x,q2.x);var maxq=Math.max(q1.x,q2.x);var minp=Math.min(p1.x,p2.x);var maxp=Math.max(p1.x,p2.x);if(minp>maxq){return false;}
if(maxp<minq){return false;}
minq=Math.min(q1.y,q2.y);maxq=Math.max(q1.y,q2.y);minp=Math.min(p1.y,p2.y);maxp=Math.max(p1.y,p2.y);if(minp>maxq){return false;}
if(maxp<minq){return false;}
return true;};jsts.geom.Envelope.prototype.clone=function(){return new jsts.geom.Envelope(this.minx,this.maxx,this.miny,this.maxy);};jsts.geom.util.GeometryCombiner=function(geoms){this.geomFactory=jsts.geom.util.GeometryCombiner.extractFactory(geoms);this.inputGeoms=geoms;};jsts.geom.util.GeometryCombiner.combine=function(geoms){if(arguments.length>1)return this.combine2.apply(this,arguments);var combiner=new jsts.geom.util.GeometryCombiner(geoms);return combiner.combine();};jsts.geom.util.GeometryCombiner.combine2=function(){var arrayList=new javascript.util.ArrayList();arguments.foreach(function(a){arrayList.add(a);})
var combiner=jsts.geom.util.GeometryCombiner(arrayList);return combiner.combine();};jsts.geom.util.GeometryCombiner.prototype.geomFactory=null;jsts.geom.util.GeometryCombiner.prototype.skipEmpty=false;jsts.geom.util.GeometryCombiner.prototype.inputGeoms;jsts.geom.util.GeometryCombiner.extractFactory=function(geoms){if(geoms.isEmpty())return null;return geoms.iterator().next().getFactory();};jsts.geom.util.GeometryCombiner.prototype.combine=function(){var elems=new javascript.util.ArrayList(),i;for(i=this.inputGeoms.iterator();i.hasNext();){var g=i.next();this.extractElements(g,elems);}
if(elems.size()===0){if(this.geomFactory!==null){return geomFactory.createGeometryCollection(null);}
return null;}
return this.geomFactory.buildGeometry(elems);};jsts.geom.util.GeometryCombiner.prototype.extractElements=function(geom,elems){if(geom===null){return;}
for(var i=0;i<geom.getNumGeometries();i++){var elemGeom=geom.getGeometryN(i);if(this.skipEmpty&&elemGeom.isEmpty()){continue;}
elems.add(elemGeom);}};jsts.geom.PrecisionModel=function(modelType){if(typeof modelType==='number'){this.modelType=jsts.geom.PrecisionModel.FIXED;this.scale=modelType;return;}
this.modelType=modelType||jsts.geom.PrecisionModel.FLOATING;if(this.modelType===jsts.geom.PrecisionModel.FIXED){this.scale=1.0;}};jsts.geom.PrecisionModel.FLOATING='FLOATING';jsts.geom.PrecisionModel.FIXED='FIXED';jsts.geom.PrecisionModel.FLOATING_SINGLE='FLOATING_SINGLE';jsts.geom.PrecisionModel.prototype.scale=null;jsts.geom.PrecisionModel.prototype.modelType=null;jsts.geom.PrecisionModel.prototype.isFloating=function(){return this.modelType===jsts.geom.PrecisionModel.FLOATING||this.modelType===jsts.geom.PrecisionModel.FLOATING_SINLGE;};jsts.geom.PrecisionModel.prototype.getScale=function(){return this.scale;};jsts.geom.PrecisionModel.prototype.getType=function(){return this.modelType;};jsts.geom.PrecisionModel.prototype.equals=function(other){return true;if(!(other instanceof jsts.geom.PrecisionModel)){return false;}
var otherPrecisionModel=other;return this.modelType===otherPrecisionModel.modelType&&this.scale===otherPrecisionModel.scale;};jsts.geom.PrecisionModel.prototype.makePrecise=function(val){if(val instanceof jsts.geom.Coordinate){this.makePrecise2(val);return;}
if(isNaN(val))
return val;if(this.modelType===jsts.geom.PrecisionModel.FIXED){return Math.round(val*this.scale)/this.scale;}
return val;};jsts.geom.PrecisionModel.prototype.makePrecise2=function(coord){if(this.modelType===jsts.geom.PrecisionModel.FLOATING)
return;coord.x=this.makePrecise(coord.x);coord.y=this.makePrecise(coord.y);};jsts.geom.PrecisionModel.prototype.compareTo=function(o){var other=o;return 0;};jsts.geom.CoordinateFilter=function(){};jsts.geom.CoordinateFilter.prototype.filter=function(coord){throw new jsts.error.AbstractMethodInvocationError();};jsts.geom.Point=function(coordinate,factory){this.factory=factory;if(coordinate===undefined)
return;this.coordinate=coordinate;};jsts.geom.Point.prototype=new jsts.geom.Geometry();jsts.geom.Point.constructor=jsts.geom.Point;jsts.geom.Point.CLASS_NAME='jsts.geom.Point';jsts.geom.Point.prototype.coordinate=null;jsts.geom.Point.prototype.getX=function(){return this.coordinate.x;};jsts.geom.Point.prototype.getY=function(){return this.coordinate.y;};jsts.geom.Point.prototype.getCoordinate=function(){return this.coordinate;};jsts.geom.Point.prototype.getCoordinates=function(){return this.isEmpty()?[]:[this.coordinate];};jsts.geom.Point.prototype.isEmpty=function(){return this.coordinate===null;};jsts.geom.Point.prototype.equalsExact=function(other,tolerance){if(!this.isEquivalentClass(other)){return false;}
if(this.isEmpty()&&other.isEmpty()){return true;}
return this.equal(other.getCoordinate(),this.getCoordinate(),tolerance);};jsts.geom.Point.prototype.getNumPoints=function(){return this.isEmpty()?0:1;};jsts.geom.Point.prototype.isSimple=function(){return true;};jsts.geom.Point.prototype.getBoundary=function(){return new jsts.geom.GeometryCollection(null);};jsts.geom.Point.prototype.computeEnvelopeInternal=function(){if(this.isEmpty()){return new jsts.geom.Envelope();}
return new jsts.geom.Envelope(this.coordinate);};jsts.geom.Point.prototype.apply=function(filter){if(filter instanceof jsts.geom.GeometryFilter||filter instanceof jsts.geom.GeometryComponentFilter){filter.filter(this);}else if(filter instanceof jsts.geom.CoordinateFilter){if(this.isEmpty()){return;}
filter.filter(this.getCoordinate());}};jsts.geom.Point.prototype.clone=function(){return new jsts.geom.Point(this.coordinate.clone(),this.factory);};jsts.geom.Point.prototype.getDimension=function(){return 0;};jsts.geom.Point.prototype.getBoundaryDimension=function(){return jsts.geom.Dimension.FALSE;};jsts.geom.Point.prototype.reverse=function(){return this.clone();};jsts.geom.Point.prototype.isValid=function(){if(!jsts.operation.valid.IsValidOp.isValid(this.getCoordinate())){return false;}
return true;};jsts.geom.Point.prototype.normalize=function(){};jsts.geom.Point.prototype.compareToSameClass=function(other){var point=other;return this.getCoordinate().compareTo(point.getCoordinate());};jsts.geom.Point.prototype.getGeometryType=function(){return'Point';};jsts.geom.Point.prototype.hashCode=function(){return'Point_'+this.coordinate.hashCode();};jsts.geom.Point.prototype.CLASS_NAME='jsts.geom.Point';jsts.geomgraph.EdgeIntersection=function(coord,segmentIndex,dist){this.coord=new jsts.geom.Coordinate(coord);this.segmentIndex=segmentIndex;this.dist=dist;};jsts.geomgraph.EdgeIntersection.prototype.coord=null;jsts.geomgraph.EdgeIntersection.prototype.segmentIndex=null;jsts.geomgraph.EdgeIntersection.prototype.dist=null;jsts.geomgraph.EdgeIntersection.prototype.getCoordinate=function(){return this.coord;};jsts.geomgraph.EdgeIntersection.prototype.getSegmentIndex=function(){return this.segmentIndex;};jsts.geomgraph.EdgeIntersection.prototype.getDistance=function(){return this.dist;};jsts.geomgraph.EdgeIntersection.prototype.compareTo=function(other){return this.compare(other.segmentIndex,other.dist);};jsts.geomgraph.EdgeIntersection.prototype.compare=function(segmentIndex,dist){if(this.segmentIndex<segmentIndex)
return-1;if(this.segmentIndex>segmentIndex)
return 1;if(this.dist<dist)
return-1;if(this.dist>dist)
return 1;return 0;};jsts.geomgraph.EdgeIntersection.prototype.isEndPoint=function(maxSegmentIndex){if(this.segmentIndex===0&&this.dist===0.0)
return true;if(this.segmentIndex===maxSegmentIndex)
return true;return false;};jsts.geomgraph.EdgeIntersection.prototype.toString=function(){return''+this.segmentIndex+this.dist;};(function(){var EdgeIntersection=jsts.geomgraph.EdgeIntersection;var TreeMap=javascript.util.TreeMap;jsts.geomgraph.EdgeIntersectionList=function(edge){this.nodeMap=new TreeMap();this.edge=edge;};jsts.geomgraph.EdgeIntersectionList.prototype.nodeMap=null;jsts.geomgraph.EdgeIntersectionList.prototype.edge=null;jsts.geomgraph.EdgeIntersectionList.prototype.isIntersection=function(pt){for(var it=this.iterator();it.hasNext();){var ei=it.next();if(ei.coord.equals(pt)){return true;}}
return false;};jsts.geomgraph.EdgeIntersectionList.prototype.add=function(intPt,segmentIndex,dist){var eiNew=new EdgeIntersection(intPt,segmentIndex,dist);var ei=this.nodeMap.get(eiNew);if(ei!==null){return ei;}
this.nodeMap.put(eiNew,eiNew);return eiNew;};jsts.geomgraph.EdgeIntersectionList.prototype.iterator=function(){return this.nodeMap.values().iterator();};jsts.geomgraph.EdgeIntersectionList.prototype.addEndpoints=function(){var maxSegIndex=this.edge.pts.length-1;this.add(this.edge.pts[0],0,0.0);this.add(this.edge.pts[maxSegIndex],maxSegIndex,0.0);};jsts.geomgraph.EdgeIntersectionList.prototype.addSplitEdges=function(edgeList)
{this.addEndpoints();var it=this.iterator();var eiPrev=it.next();while(it.hasNext()){var ei=it.next();var newEdge=this.createSplitEdge(eiPrev,ei);edgeList.add(newEdge);eiPrev=ei;}};jsts.geomgraph.EdgeIntersectionList.prototype.createSplitEdge=function(ei0,ei1){var npts=ei1.segmentIndex-ei0.segmentIndex+2;var lastSegStartPt=this.edge.pts[ei1.segmentIndex];var useIntPt1=ei1.dist>0.0||!ei1.coord.equals2D(lastSegStartPt);if(!useIntPt1){npts--;}
var pts=[];var ipt=0;pts[ipt++]=new jsts.geom.Coordinate(ei0.coord);for(var i=ei0.segmentIndex+1;i<=ei1.segmentIndex;i++){pts[ipt++]=this.edge.pts[i];}
if(useIntPt1)pts[ipt]=ei1.coord;return new jsts.geomgraph.Edge(pts,new jsts.geomgraph.Label(this.edge.label));};})();jsts.geom.Location=function(){};jsts.geom.Location.INTERIOR=0;jsts.geom.Location.BOUNDARY=1;jsts.geom.Location.EXTERIOR=2;jsts.geom.Location.NONE=-1;jsts.geom.Location.toLocationSymbol=function(locationValue){switch(locationValue){case jsts.geom.Location.EXTERIOR:return'e';case jsts.geom.Location.BOUNDARY:return'b';case jsts.geom.Location.INTERIOR:return'i';case jsts.geom.Location.NONE:return'-';}
throw new jsts.IllegalArgumentError('Unknown location value: '+
locationValue);};(function(){var AssertionFailedException=function(message){this.message=message;};AssertionFailedException.prototype=new Error();AssertionFailedException.prototype.name='AssertionFailedException';jsts.util.AssertionFailedException=AssertionFailedException;})();(function(){var AssertionFailedException=jsts.util.AssertionFailedException;jsts.util.Assert=function(){};jsts.util.Assert.isTrue=function(assertion,message){if(!assertion){if(message===null){throw new AssertionFailedException();}else{throw new AssertionFailedException(message);}}};jsts.util.Assert.equals=function(expectedValue,actualValue,message){if(!actualValue.equals(expectedValue)){throw new AssertionFailedException('Expected '+expectedValue+' but encountered '+actualValue+
(message!=null?': '+message:''));}};jsts.util.Assert.shouldNeverReachHere=function(message){throw new AssertionFailedException('Should never reach here'+
(message!=null?': '+message:''));};})();(function(){var Location=jsts.geom.Location;var Assert=jsts.util.Assert;var ArrayList=javascript.util.ArrayList;jsts.operation.relate.RelateComputer=function(arg){this.li=new jsts.algorithm.RobustLineIntersector();this.ptLocator=new jsts.algorithm.PointLocator();this.nodes=new jsts.geomgraph.NodeMap(new jsts.operation.relate.RelateNodeFactory());this.isolatedEdges=new ArrayList();this.arg=arg;};jsts.operation.relate.RelateComputer.prototype.li=null;jsts.operation.relate.RelateComputer.prototype.ptLocator=null;jsts.operation.relate.RelateComputer.prototype.arg=null;jsts.operation.relate.RelateComputer.prototype.nodes=null;jsts.operation.relate.RelateComputer.prototype.im=null;jsts.operation.relate.RelateComputer.prototype.isolatedEdges=null;jsts.operation.relate.RelateComputer.prototype.invalidPoint=null;jsts.operation.relate.RelateComputer.prototype.computeIM=function(){var im=new jsts.geom.IntersectionMatrix();im.set(Location.EXTERIOR,Location.EXTERIOR,2);if(!this.arg[0].getGeometry().getEnvelopeInternal().intersects(this.arg[1].getGeometry().getEnvelopeInternal())){this.computeDisjointIM(im);return im;}
this.arg[0].computeSelfNodes(this.li,false);this.arg[1].computeSelfNodes(this.li,false);var intersector=this.arg[0].computeEdgeIntersections(this.arg[1],this.li,false);this.computeIntersectionNodes(0);this.computeIntersectionNodes(1);this.copyNodesAndLabels(0);this.copyNodesAndLabels(1);this.labelIsolatedNodes();this.computeProperIntersectionIM(intersector,im);var eeBuilder=new jsts.operation.relate.EdgeEndBuilder();var ee0=eeBuilder.computeEdgeEnds(this.arg[0].getEdgeIterator());this.insertEdgeEnds(ee0);var ee1=eeBuilder.computeEdgeEnds(this.arg[1].getEdgeIterator());this.insertEdgeEnds(ee1);this.labelNodeEdges();this.labelIsolatedEdges(0,1);this.labelIsolatedEdges(1,0);this.updateIM(im);return im;};jsts.operation.relate.RelateComputer.prototype.insertEdgeEnds=function(ee){for(var i=ee.iterator();i.hasNext();){var e=i.next();this.nodes.add(e);}};jsts.operation.relate.RelateComputer.prototype.computeProperIntersectionIM=function(intersector,im){var dimA=this.arg[0].getGeometry().getDimension();var dimB=this.arg[1].getGeometry().getDimension();var hasProper=intersector.hasProperIntersection();var hasProperInterior=intersector.hasProperInteriorIntersection();if(dimA===2&&dimB===2){if(hasProper)
im.setAtLeast('212101212');}
else if(dimA===2&&dimB===1){if(hasProper)
im.setAtLeast('FFF0FFFF2');if(hasProperInterior)
im.setAtLeast('1FFFFF1FF');}else if(dimA===1&&dimB===2){if(hasProper)
im.setAtLeast('F0FFFFFF2');if(hasProperInterior)
im.setAtLeast('1F1FFFFFF');}
else if(dimA===1&&dimB===1){if(hasProperInterior)
im.setAtLeast('0FFFFFFFF');}};jsts.operation.relate.RelateComputer.prototype.copyNodesAndLabels=function(argIndex){for(var i=this.arg[argIndex].getNodeIterator();i.hasNext();){var graphNode=i.next();var newNode=this.nodes.addNode(graphNode.getCoordinate());newNode.setLabel(argIndex,graphNode.getLabel().getLocation(argIndex));}};jsts.operation.relate.RelateComputer.prototype.computeIntersectionNodes=function(argIndex){for(var i=this.arg[argIndex].getEdgeIterator();i.hasNext();){var e=i.next();var eLoc=e.getLabel().getLocation(argIndex);for(var eiIt=e.getEdgeIntersectionList().iterator();eiIt.hasNext();){var ei=eiIt.next();var n=this.nodes.addNode(ei.coord);if(eLoc===Location.BOUNDARY)
n.setLabelBoundary(argIndex);else{if(n.getLabel().isNull(argIndex))
n.setLabel(argIndex,Location.INTERIOR);}}}};jsts.operation.relate.RelateComputer.prototype.labelIntersectionNodes=function(argIndex){for(var i=this.arg[argIndex].getEdgeIterator();i.hasNext();){var e=i.next();var eLoc=e.getLabel().getLocation(argIndex);for(var eiIt=e.getEdgeIntersectionList().iterator();eiIt.hasNext();){var ei=eiIt.next();var n=this.nodes.find(ei.coord);if(n.getLabel().isNull(argIndex)){if(eLoc===Location.BOUNDARY)
n.setLabelBoundary(argIndex);else
n.setLabel(argIndex,Location.INTERIOR);}}}};jsts.operation.relate.RelateComputer.prototype.computeDisjointIM=function(im){var ga=this.arg[0].getGeometry();if(!ga.isEmpty()){im.set(Location.INTERIOR,Location.EXTERIOR,ga.getDimension());im.set(Location.BOUNDARY,Location.EXTERIOR,ga.getBoundaryDimension());}
var gb=this.arg[1].getGeometry();if(!gb.isEmpty()){im.set(Location.EXTERIOR,Location.INTERIOR,gb.getDimension());im.set(Location.EXTERIOR,Location.BOUNDARY,gb.getBoundaryDimension());}};jsts.operation.relate.RelateComputer.prototype.labelNodeEdges=function(){for(var ni=this.nodes.iterator();ni.hasNext();){var node=ni.next();node.getEdges().computeLabelling(this.arg);}};jsts.operation.relate.RelateComputer.prototype.updateIM=function(im){for(var ei=this.isolatedEdges.iterator();ei.hasNext();){var e=ei.next();e.updateIM(im);}
for(var ni=this.nodes.iterator();ni.hasNext();){var node=ni.next();node.updateIM(im);node.updateIMFromEdges(im);}};jsts.operation.relate.RelateComputer.prototype.labelIsolatedEdges=function(thisIndex,targetIndex){for(var ei=this.arg[thisIndex].getEdgeIterator();ei.hasNext();){var e=ei.next();if(e.isIsolated()){this.labelIsolatedEdge(e,targetIndex,this.arg[targetIndex].getGeometry());this.isolatedEdges.add(e);}}};jsts.operation.relate.RelateComputer.prototype.labelIsolatedEdge=function(e,targetIndex,target){if(target.getDimension()>0){var loc=this.ptLocator.locate(e.getCoordinate(),target);e.getLabel().setAllLocations(targetIndex,loc);}else{e.getLabel().setAllLocations(targetIndex,Location.EXTERIOR);}};jsts.operation.relate.RelateComputer.prototype.labelIsolatedNodes=function(){for(var ni=this.nodes.iterator();ni.hasNext();){var n=ni.next();var label=n.getLabel();Assert.isTrue(label.getGeometryCount()>0,'node with empty label found');if(n.isIsolated()){if(label.isNull(0))
this.labelIsolatedNode(n,0);else
this.labelIsolatedNode(n,1);}}};jsts.operation.relate.RelateComputer.prototype.labelIsolatedNode=function(n,targetIndex){var loc=this.ptLocator.locate(n.getCoordinate(),this.arg[targetIndex].getGeometry());n.getLabel().setAllLocations(targetIndex,loc);};})();(function(){var Assert=jsts.util.Assert;jsts.geomgraph.GraphComponent=function(label){this.label=label;};jsts.geomgraph.GraphComponent.prototype.label=null;jsts.geomgraph.GraphComponent.prototype._isInResult=false;jsts.geomgraph.GraphComponent.prototype._isCovered=false;jsts.geomgraph.GraphComponent.prototype._isCoveredSet=false;jsts.geomgraph.GraphComponent.prototype._isVisited=false;jsts.geomgraph.GraphComponent.prototype.getLabel=function(){return this.label;};jsts.geomgraph.GraphComponent.prototype.setLabel=function(label){if(arguments.length===2){this.setLabel2.apply(this,arguments);return;}
this.label=label;};jsts.geomgraph.GraphComponent.prototype.setInResult=function(isInResult){this._isInResult=isInResult;};jsts.geomgraph.GraphComponent.prototype.isInResult=function(){return this._isInResult;};jsts.geomgraph.GraphComponent.prototype.setCovered=function(isCovered){this._isCovered=isCovered;this._isCoveredSet=true;};jsts.geomgraph.GraphComponent.prototype.isCovered=function(){return this._isCovered;};jsts.geomgraph.GraphComponent.prototype.isCoveredSet=function(){return this._isCoveredSet;};jsts.geomgraph.GraphComponent.prototype.isVisited=function(){return this._isVisited;};jsts.geomgraph.GraphComponent.prototype.setVisited=function(isVisited){this._isVisited=isVisited;};jsts.geomgraph.GraphComponent.prototype.getCoordinate=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.geomgraph.GraphComponent.prototype.computeIM=function(im){throw new jsts.error.AbstractMethodInvocationError();};jsts.geomgraph.GraphComponent.prototype.isIsolated=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.geomgraph.GraphComponent.prototype.updateIM=function(im){Assert.isTrue(this.label.getGeometryCount()>=2,'found partial label');this.computeIM(im);};})();jsts.geomgraph.Node=function(coord,edges){this.coord=coord;this.edges=edges;this.label=new jsts.geomgraph.Label(0,jsts.geom.Location.NONE);};jsts.geomgraph.Node.prototype=new jsts.geomgraph.GraphComponent();jsts.geomgraph.Node.prototype.coord=null;jsts.geomgraph.Node.prototype.edges=null;jsts.geomgraph.Node.prototype.isIsolated=function(){return(this.label.getGeometryCount()==1);};jsts.geomgraph.Node.prototype.setLabel2=function(argIndex,onLocation){if(this.label===null){this.label=new jsts.geomgraph.Label(argIndex,onLocation);}else
this.label.setLocation(argIndex,onLocation);};jsts.geomgraph.Node.prototype.setLabelBoundary=function(argIndex){var loc=jsts.geom.Location.NONE;if(this.label!==null)
loc=this.label.getLocation(argIndex);var newLoc;switch(loc){case jsts.geom.Location.BOUNDARY:newLoc=jsts.geom.Location.INTERIOR;break;case jsts.geom.Location.INTERIOR:newLoc=jsts.geom.Location.BOUNDARY;break;default:newLoc=jsts.geom.Location.BOUNDARY;break;}
this.label.setLocation(argIndex,newLoc);};jsts.geomgraph.Node.prototype.add=function(e){this.edges.insert(e);e.setNode(this);};jsts.geomgraph.Node.prototype.getCoordinate=function(){return this.coord;};jsts.geomgraph.Node.prototype.getEdges=function(){return this.edges;};jsts.geomgraph.Node.prototype.isIncidentEdgeInResult=function(){for(var it=this.getEdges().getEdges().iterator();it.hasNext();){var de=it.next();if(de.getEdge().isInResult())
return true;}
return false;};(function(){var EdgeRing=function(factory){this.deList=new javascript.util.ArrayList();this.factory=factory;};EdgeRing.findEdgeRingContaining=function(testEr,shellList){var testRing=testEr.getRing();var testEnv=testRing.getEnvelopeInternal();var testPt=testRing.getCoordinateN(0);var minShell=null;var minEnv=null;for(var it=shellList.iterator();it.hasNext();){var tryShell=it.next();var tryRing=tryShell.getRing();var tryEnv=tryRing.getEnvelopeInternal();if(minShell!=null)
minEnv=minShell.getRing().getEnvelopeInternal();var isContained=false;if(tryEnv.equals(testEnv))
continue;testPt=jsts.geom.CoordinateArrays.ptNotInList(testRing.getCoordinates(),tryRing.getCoordinates());if(tryEnv.contains(testEnv)&&jsts.algorithm.CGAlgorithms.isPointInRing(testPt,tryRing.getCoordinates()))
isContained=true;if(isContained){if(minShell==null||minEnv.contains(tryEnv)){minShell=tryShell;}}}
return minShell;};EdgeRing.ptNotInList=function(testPts,pts){for(var i=0;i<testPts.length;i++){var testPt=testPts[i];if(!isInList(testPt,pts))
return testPt;}
return null;};EdgeRing.isInList=function(pt,pts){for(var i=0;i<pts.length;i++){if(pt.equals(pts[i]))
return true;}
return false;}
EdgeRing.prototype.factory=null;EdgeRing.prototype.deList=null;EdgeRing.prototype.ring=null;EdgeRing.prototype.ringPts=null;EdgeRing.prototype.holes=null;EdgeRing.prototype.add=function(de){this.deList.add(de);};EdgeRing.prototype.isHole=function(){var ring=this.getRing();return jsts.algorithm.CGAlgorithms.isCCW(ring.getCoordinates());};EdgeRing.prototype.addHole=function(hole){if(this.holes==null)
this.holes=new javascript.util.ArrayList();this.holes.add(hole);};EdgeRing.prototype.getPolygon=function(){var holeLR=null;if(this.holes!=null){holeLR=[];for(var i=0;i<this.holes.size();i++){holeLR[i]=this.holes.get(i);}}
var poly=this.factory.createPolygon(this.ring,holeLR);return poly;};EdgeRing.prototype.isValid=function(){this.getCoordinates();if(this.ringPts.length<=3)
return false;this.getRing();return this.ring.isValid();};EdgeRing.prototype.getCoordinates=function(){if(this.ringPts==null){var coordList=new jsts.geom.CoordinateList();for(var i=this.deList.iterator();i.hasNext();){var de=i.next();var edge=de.getEdge();EdgeRing.addEdge(edge.getLine().getCoordinates(),de.getEdgeDirection(),coordList);}
this.ringPts=coordList.toCoordinateArray();}
return this.ringPts;};EdgeRing.prototype.getLineString=function(){this.getCoordinates();return this.factory.createLineString(this.ringPts);};EdgeRing.prototype.getRing=function(){if(this.ring!=null)
return this.ring;this.getCoordinates();if(this.ringPts.length<3)
console.log(this.ringPts);try{this.ring=this.factory.createLinearRing(this.ringPts);}catch(ex){console.log(this.ringPts);}
return this.ring;};EdgeRing.addEdge=function(coords,isForward,coordList){if(isForward){for(var i=0;i<coords.length;i++){coordList.add(coords[i],false);}}else{for(var i=coords.length-1;i>=0;i--){coordList.add(coords[i],false);}}};jsts.operation.polygonize.EdgeRing=EdgeRing;})();(function(){var GraphComponent=jsts.planargraph.GraphComponent;var Edge=function(de0,de1){if(de0===undefined){return;}
this.setDirectedEdges(de0,de1);};Edge.prototype=new GraphComponent();Edge.prototype.dirEdge=null;Edge.prototype.setDirectedEdges=function(de0,de1){this.dirEdge=[de0,de1];de0.setEdge(this);de1.setEdge(this);de0.setSym(de1);de1.setSym(de0);de0.getFromNode().addOutEdge(de0);de1.getFromNode().addOutEdge(de1);};Edge.prototype.getDirEdge=function(i){if(i instanceof jsts.planargraph.Node){this.getDirEdge2(i);}
return this.dirEdge[i];};Edge.prototype.getDirEdge2=function(fromNode){if(this.dirEdge[0].getFromNode()==fromNode)
return this.dirEdge[0];if(this.dirEdge[1].getFromNode()==fromNode)
return this.dirEdge[1];return null;};Edge.prototype.getOppositeNode=function(node){if(this.dirEdge[0].getFromNode()==node)
return this.dirEdge[0].getToNode();if(this.dirEdge[1].getFromNode()==node)
return this.dirEdge[1].getToNode();return null;};Edge.prototype.remove=function(){this.dirEdge=null;};Edge.prototype.isRemoved=function(){return dirEdge==null;};jsts.planargraph.Edge=Edge;})();jsts.operation.polygonize.PolygonizeEdge=function(line){this.line=line;};jsts.operation.polygonize.PolygonizeEdge.prototype=new jsts.planargraph.Edge();jsts.operation.polygonize.PolygonizeEdge.prototype.line=null;jsts.operation.polygonize.PolygonizeEdge.prototype.getLine=function(){return this.line;};(function(){var ArrayList=javascript.util.ArrayList;var GraphComponent=jsts.planargraph.GraphComponent;var DirectedEdge=function(from,to,directionPt,edgeDirection){if(from===undefined){return;}
this.from=from;this.to=to;this.edgeDirection=edgeDirection;this.p0=from.getCoordinate();this.p1=directionPt;var dx=this.p1.x-this.p0.x;var dy=this.p1.y-this.p0.y;this.quadrant=jsts.geomgraph.Quadrant.quadrant(dx,dy);this.angle=Math.atan2(dy,dx);};DirectedEdge.prototype=new GraphComponent();DirectedEdge.toEdges=function(dirEdges){var edges=new ArrayList();for(var i=dirEdges.iterator();i.hasNext();){edges.add((i.next()).parentEdge);}
return edges;};DirectedEdge.prototype.parentEdge=null;DirectedEdge.prototype.from=null;DirectedEdge.prototype.to=null;DirectedEdge.prototype.p0=null;DirectedEdge.prototype.p1=null;DirectedEdge.prototype.sym=null;DirectedEdge.prototype.edgeDirection=null;DirectedEdge.prototype.quadrant=null;DirectedEdge.prototype.angle=null;DirectedEdge.prototype.getEdge=function(){return this.parentEdge;};DirectedEdge.prototype.setEdge=function(parentEdge){this.parentEdge=parentEdge;};DirectedEdge.prototype.getQuadrant=function(){return this.quadrant;};DirectedEdge.prototype.getDirectionPt=function(){return this.p1;};DirectedEdge.prototype.getEdgeDirection=function(){return this.edgeDirection;};DirectedEdge.prototype.getFromNode=function(){return this.from;};DirectedEdge.prototype.getToNode=function(){return this.to;};DirectedEdge.prototype.getCoordinate=function(){return this.from.getCoordinate();};DirectedEdge.prototype.getAngle=function(){return this.angle;};DirectedEdge.prototype.getSym=function(){return this.sym;};DirectedEdge.prototype.setSym=function(sym){this.sym=sym;};DirectedEdge.prototype.remove=function(){this.sym=null;this.parentEdge=null;};DirectedEdge.prototype.isRemoved=function(){return this.parentEdge==null;};DirectedEdge.prototype.compareTo=function(obj){var de=obj;return this.compareDirection(de);};DirectedEdge.prototype.compareDirection=function(e){if(this.quadrant>e.quadrant)
return 1;if(this.quadrant<e.quadrant)
return-1;return jsts.algorithm.CGAlgorithms.computeOrientation(e.p0,e.p1,this.p1);};jsts.planargraph.DirectedEdge=DirectedEdge;})();(function(){var DirectedEdge=jsts.planargraph.DirectedEdge;var PolygonizeDirectedEdge=function(from,to,directionPt,edgeDirection){DirectedEdge.apply(this,arguments);};PolygonizeDirectedEdge.prototype=new DirectedEdge();PolygonizeDirectedEdge.prototype.edgeRing=null;PolygonizeDirectedEdge.prototype.next=null;PolygonizeDirectedEdge.prototype.label=-1;PolygonizeDirectedEdge.prototype.getLabel=function(){return this.label;};PolygonizeDirectedEdge.prototype.setLabel=function(label){this.label=label;};PolygonizeDirectedEdge.prototype.getNext=function(){return this.next;};PolygonizeDirectedEdge.prototype.setNext=function(next){this.next=next;};PolygonizeDirectedEdge.prototype.isInRing=function(){return this.edgeRing!=null;};PolygonizeDirectedEdge.prototype.setRing=function(edgeRing){this.edgeRing=edgeRing;};jsts.operation.polygonize.PolygonizeDirectedEdge=PolygonizeDirectedEdge;})();(function(){var NodeMap=function(){this.nodeMap=new javascript.util.TreeMap();};NodeMap.prototype.nodeMap=null;NodeMap.prototype.add=function(n){this.nodeMap.put(n.getCoordinate(),n);return n;};NodeMap.prototype.remove=function(pt){return this.nodeMap.remove(pt);};NodeMap.prototype.find=function(coord){return this.nodeMap.get(coord);};NodeMap.prototype.iterator=function(){return this.nodeMap.values().iterator();};NodeMap.prototype.values=function(){return this.nodeMap.values();};jsts.planargraph.NodeMap=NodeMap;})();(function(){var ArrayList=javascript.util.ArrayList;var PlanarGraph=function(){this.edges=new javascript.util.HashSet();this.dirEdges=new javascript.util.HashSet();this.nodeMap=new jsts.planargraph.NodeMap();};PlanarGraph.prototype.edges=null;PlanarGraph.prototype.dirEdges=null;PlanarGraph.prototype.nodeMap=null;PlanarGraph.prototype.findNode=function(pt){return this.nodeMap.find(pt);};PlanarGraph.prototype.add=function(node){if(node instanceof jsts.planargraph.Edge){return this.add2(node);}else if(node instanceof jsts.planargraph.DirectedEdge){return this.add3(node);}
this.nodeMap.add(node);};PlanarGraph.prototype.add2=function(edge){this.edges.add(edge);this.add(edge.getDirEdge(0));this.add(edge.getDirEdge(1));};PlanarGraph.prototype.add3=function(dirEdge){this.dirEdges.add(dirEdge);};PlanarGraph.prototype.nodeIterator=function(){return this.nodeMap.iterator();};PlanarGraph.prototype.contains=function(e){if(e instanceof jsts.planargraph.DirectedEdge){return this.contains2(e);}
return this.edges.contains(e);};PlanarGraph.prototype.contains2=function(de){return this.dirEdges.contains(de);};PlanarGraph.prototype.getNodes=function(){return this.nodeMap.values();};PlanarGraph.prototype.dirEdgeIterator=function(){return this.dirEdges.iterator();};PlanarGraph.prototype.edgeIterator=function(){return this.edges.iterator();};PlanarGraph.prototype.getEdges=function(){return this.edges;};PlanarGraph.prototype.remove=function(edge){if(edge instanceof jsts.planargraph.DirectedEdge){return this.remove2(edge);}
this.remove(edge.getDirEdge(0));this.remove(edge.getDirEdge(1));this.edges.remove(edge);this.edge.remove();};PlanarGraph.prototype.remove2=function(de){if(de instanceof jsts.planargraph.Node){return this.remove3(de);}
var sym=de.getSym();if(sym!=null)
sym.setSym(null);de.getFromNode().remove(de);de.remove();this.dirEdges.remove(de);};PlanarGraph.prototype.remove3=function(node){var outEdges=node.getOutEdges().getEdges();for(var i=outEdges.iterator();i.hasNext();){var de=i.next();var sym=de.getSym();if(sym!=null)
this.remove(sym);this.dirEdges.remove(de);var edge=de.getEdge();if(edge!=null){this.edges.remove(edge);}}
this.nodeMap.remove(node.getCoordinate());node.remove();};PlanarGraph.prototype.findNodesOfDegree=function(degree){var nodesFound=new ArrayList();for(var i=this.nodeIterator();i.hasNext();){var node=i.next();if(node.getDegree()==degree)
nodesFound.add(node);}
return nodesFound;};jsts.planargraph.PlanarGraph=PlanarGraph;})();(function(){var ArrayList=javascript.util.ArrayList;var Stack=javascript.util.Stack;var HashSet=javascript.util.HashSet;var Assert=jsts.util.Assert;var EdgeRing=jsts.operation.polygonize.EdgeRing;var PolygonizeEdge=jsts.operation.polygonize.PolygonizeEdge;var PolygonizeDirectedEdge=jsts.operation.polygonize.PolygonizeDirectedEdge;var PlanarGraph=jsts.planargraph.PlanarGraph;var Node=jsts.planargraph.Node;var PolygonizeGraph=function(factory){PlanarGraph.apply(this);this.factory=factory;};PolygonizeGraph.prototype=new PlanarGraph();PolygonizeGraph.getDegreeNonDeleted=function(node){var edges=node.getOutEdges().getEdges();var degree=0;for(var i=edges.iterator();i.hasNext();){var de=i.next();if(!de.isMarked())
degree++;}
return degree;};PolygonizeGraph.getDegree=function(node,label){var edges=node.getOutEdges().getEdges();var degree=0;for(var i=edges.iterator();i.hasNext();){var de=i.next();if(de.getLabel()==label)
degree++;}
return degree;};PolygonizeGraph.deleteAllEdges=function(node){var edges=node.getOutEdges().getEdges();for(var i=edges.iterator();i.hasNext();){var de=i.next();de.setMarked(true);var sym=de.getSym();if(sym!=null)
sym.setMarked(true);}};PolygonizeGraph.prototype.factory=null;PolygonizeGraph.prototype.addEdge=function(line){if(line.isEmpty()){return;}
var linePts=jsts.geom.CoordinateArrays.removeRepeatedPoints(line.getCoordinates());if(linePts.length<2){return;}
var startPt=linePts[0];var endPt=linePts[linePts.length-1];var nStart=this.getNode(startPt);var nEnd=this.getNode(endPt);var de0=new PolygonizeDirectedEdge(nStart,nEnd,linePts[1],true);var de1=new PolygonizeDirectedEdge(nEnd,nStart,linePts[linePts.length-2],false);var edge=new PolygonizeEdge(line);edge.setDirectedEdges(de0,de1);this.add(edge);};PolygonizeGraph.prototype.getNode=function(pt){var node=this.findNode(pt);if(node==null){node=new Node(pt);this.add(node);}
return node;};PolygonizeGraph.prototype.computeNextCWEdges=function(){for(var iNode=this.nodeIterator();iNode.hasNext();){var node=iNode.next();PolygonizeGraph.computeNextCWEdges(node);}};PolygonizeGraph.prototype.convertMaximalToMinimalEdgeRings=function(ringEdges){for(var i=ringEdges.iterator();i.hasNext();){var de=i.next();var label=de.getLabel();var intNodes=PolygonizeGraph.findIntersectionNodes(de,label);if(intNodes==null)
continue;for(var iNode=intNodes.iterator();iNode.hasNext();){var node=iNode.next();PolygonizeGraph.computeNextCCWEdges(node,label);}}};PolygonizeGraph.findIntersectionNodes=function(startDE,label){var de=startDE;var intNodes=null;do{var node=de.getFromNode();if(PolygonizeGraph.getDegree(node,label)>1){if(intNodes==null)
intNodes=new ArrayList();intNodes.add(node);}
de=de.getNext();Assert.isTrue(de!=null,'found null DE in ring');Assert.isTrue(de==startDE||!de.isInRing(),'found DE already in ring');}while(de!=startDE);return intNodes;};PolygonizeGraph.prototype.getEdgeRings=function(){this.computeNextCWEdges();PolygonizeGraph.label(this.dirEdges,-1);var maximalRings=PolygonizeGraph.findLabeledEdgeRings(this.dirEdges);this.convertMaximalToMinimalEdgeRings(maximalRings);var edgeRingList=new ArrayList();for(var i=this.dirEdges.iterator();i.hasNext();){var de=i.next();if(de.isMarked())
continue;if(de.isInRing())
continue;var er=this.findEdgeRing(de);edgeRingList.add(er);}
return edgeRingList;};PolygonizeGraph.findLabeledEdgeRings=function(dirEdges){var edgeRingStarts=new ArrayList();var currLabel=1;for(var i=dirEdges.iterator();i.hasNext();){var de=i.next();if(de.isMarked())
continue;if(de.getLabel()>=0)
continue;edgeRingStarts.add(de);var edges=PolygonizeGraph.findDirEdgesInRing(de);PolygonizeGraph.label(edges,currLabel);currLabel++;}
return edgeRingStarts;};PolygonizeGraph.prototype.deleteCutEdges=function(){this.computeNextCWEdges();PolygonizeGraph.findLabeledEdgeRings(this.dirEdges);var cutLines=new ArrayList();for(var i=this.dirEdges.iterator();i.hasNext();){var de=i.next();if(de.isMarked())
continue;var sym=de.getSym();if(de.getLabel()==sym.getLabel()){de.setMarked(true);sym.setMarked(true);var e=de.getEdge();cutLines.add(e.getLine());}}
return cutLines;};PolygonizeGraph.label=function(dirEdges,label){for(var i=dirEdges.iterator();i.hasNext();){var de=i.next();de.setLabel(label);}};PolygonizeGraph.computeNextCWEdges=function(node){var deStar=node.getOutEdges();var startDE=null;var prevDE=null;for(var i=deStar.getEdges().iterator();i.hasNext();){var outDE=i.next();if(outDE.isMarked())
continue;if(startDE==null)
startDE=outDE;if(prevDE!=null){var sym=prevDE.getSym();sym.setNext(outDE);}
prevDE=outDE;}
if(prevDE!=null){var sym=prevDE.getSym();sym.setNext(startDE);}};PolygonizeGraph.computeNextCCWEdges=function(node,label){var deStar=node.getOutEdges();var firstOutDE=null;var prevInDE=null;var edges=deStar.getEdges();for(var i=edges.size()-1;i>=0;i--){var de=edges.get(i);var sym=de.getSym();var outDE=null;if(de.getLabel()==label)
outDE=de;var inDE=null;if(sym.getLabel()==label)
inDE=sym;if(outDE==null&&inDE==null)
continue;if(inDE!=null){prevInDE=inDE;}
if(outDE!=null){if(prevInDE!=null){prevInDE.setNext(outDE);prevInDE=null;}
if(firstOutDE==null)
firstOutDE=outDE;}}
if(prevInDE!=null){Assert.isTrue(firstOutDE!=null);prevInDE.setNext(firstOutDE);}};PolygonizeGraph.findDirEdgesInRing=function(startDE){var de=startDE;var edges=new ArrayList();do{edges.add(de);de=de.getNext();Assert.isTrue(de!=null,'found null DE in ring');Assert.isTrue(de==startDE||!de.isInRing(),'found DE already in ring');}while(de!=startDE);return edges;};PolygonizeGraph.prototype.findEdgeRing=function(startDE){var de=startDE;var er=new EdgeRing(this.factory);do{er.add(de);de.setRing(er);de=de.getNext();Assert.isTrue(de!=null,'found null DE in ring');Assert.isTrue(de==startDE||!de.isInRing(),'found DE already in ring');}while(de!=startDE);return er;};PolygonizeGraph.prototype.deleteDangles=function(){var nodesToRemove=this.findNodesOfDegree(1);var dangleLines=new HashSet();var nodeStack=new Stack();for(var i=nodesToRemove.iterator();i.hasNext();){nodeStack.push(i.next());}
while(!nodeStack.isEmpty()){var node=nodeStack.pop();PolygonizeGraph.deleteAllEdges(node);var nodeOutEdges=node.getOutEdges().getEdges();for(var i=nodeOutEdges.iterator();i.hasNext();){var de=i.next();de.setMarked(true);var sym=de.getSym();if(sym!=null)
sym.setMarked(true);var e=de.getEdge();dangleLines.add(e.getLine());var toNode=de.getToNode();if(PolygonizeGraph.getDegreeNonDeleted(toNode)==1)
nodeStack.push(toNode);}}
return dangleLines;};PolygonizeGraph.prototype.computeDepthParity=function(){while(true){var de=null;if(de==null)
return;this.computeDepthParity(de);}};PolygonizeGraph.prototype.computeDepthParity=function(de){};jsts.operation.polygonize.PolygonizeGraph=PolygonizeGraph;})();jsts.index.strtree.Interval=function(){var other;if(arguments.length===1){other=arguments[0];return jsts.index.strtree.Interval(other.min,other.max);}else if(arguments.length===2){jsts.util.Assert.isTrue(this.min<=this.max);this.min=arguments[0];this.max=arguments[1];}};jsts.index.strtree.Interval.prototype.min=null;jsts.index.strtree.Interval.prototype.max=null;jsts.index.strtree.Interval.prototype.getCentre=function(){return(this.min+this.max)/2;};jsts.index.strtree.Interval.prototype.expandToInclude=function(other){this.max=Math.max(this.max,other.max);this.min=Math.min(this.min,other.min);return this;};jsts.index.strtree.Interval.prototype.intersects=function(other){return!(other.min>this.max||other.max<this.min);};jsts.index.strtree.Interval.prototype.equals=function(o){if(!(o instanceof jsts.index.strtree.Interval)){return false;}
other=o;return this.min===other.min&&this.max===other.max;};jsts.geom.GeometryFactory=function(precisionModel){this.precisionModel=precisionModel||new jsts.geom.PrecisionModel();};jsts.geom.GeometryFactory.prototype.precisionModel=null;jsts.geom.GeometryFactory.prototype.getPrecisionModel=function(){return this.precisionModel;};jsts.geom.GeometryFactory.prototype.createPoint=function(coordinate){var point=new jsts.geom.Point(coordinate,this);return point;};jsts.geom.GeometryFactory.prototype.createLineString=function(coordinates){var lineString=new jsts.geom.LineString(coordinates,this);return lineString;};jsts.geom.GeometryFactory.prototype.createLinearRing=function(coordinates){var linearRing=new jsts.geom.LinearRing(coordinates,this);return linearRing;};jsts.geom.GeometryFactory.prototype.createPolygon=function(shell,holes){var polygon=new jsts.geom.Polygon(shell,holes,this);return polygon;};jsts.geom.GeometryFactory.prototype.createMultiPoint=function(points){if(points&&points[0]instanceof jsts.geom.Coordinate){var converted=[];var i;for(i=0;i<points.length;i++){converted.push(this.createPoint(points[i]));}
points=converted;}
return new jsts.geom.MultiPoint(points,this);};jsts.geom.GeometryFactory.prototype.createMultiLineString=function(lineStrings){return new jsts.geom.MultiLineString(lineStrings,this);};jsts.geom.GeometryFactory.prototype.createMultiPolygon=function(polygons){return new jsts.geom.MultiPolygon(polygons,this);};jsts.geom.GeometryFactory.prototype.buildGeometry=function(geomList){var geomClass=null;var isHeterogeneous=false;var hasGeometryCollection=false;for(var i=geomList.iterator();i.hasNext();){var geom=i.next();var partClass=geom.CLASS_NAME;if(geomClass===null){geomClass=partClass;}
if(!(partClass===geomClass)){isHeterogeneous=true;}
if(geom.isGeometryCollectionBase())
hasGeometryCollection=true;}
if(geomClass===null){return this.createGeometryCollection(null);}
if(isHeterogeneous||hasGeometryCollection){return this.createGeometryCollection(geomList.toArray());}
var geom0=geomList.get(0);var isCollection=geomList.size()>1;if(isCollection){if(geom0 instanceof jsts.geom.Polygon){return this.createMultiPolygon(geomList.toArray());}else if(geom0 instanceof jsts.geom.LineString){return this.createMultiLineString(geomList.toArray());}else if(geom0 instanceof jsts.geom.Point){return this.createMultiPoint(geomList.toArray());}
jsts.util.Assert.shouldNeverReachHere('Unhandled class: '+geom0);}
return geom0;};jsts.geom.GeometryFactory.prototype.createGeometryCollection=function(geometries){return new jsts.geom.GeometryCollection(geometries,this);};jsts.geom.GeometryFactory.prototype.toGeometry=function(envelope){if(envelope.isNull()){return this.createPoint(null);}
if(envelope.getMinX()===envelope.getMaxX()&&envelope.getMinY()===envelope.getMaxY()){return this.createPoint(new jsts.geom.Coordinate(envelope.getMinX(),envelope.getMinY()));}
if(envelope.getMinX()===envelope.getMaxX()||envelope.getMinY()===envelope.getMaxY()){return this.createLineString([new jsts.geom.Coordinate(envelope.getMinX(),envelope.getMinY()),new jsts.geom.Coordinate(envelope.getMaxX(),envelope.getMaxY())]);}
return this.createPolygon(this.createLinearRing([new jsts.geom.Coordinate(envelope.getMinX(),envelope.getMinY()),new jsts.geom.Coordinate(envelope.getMinX(),envelope.getMaxY()),new jsts.geom.Coordinate(envelope.getMaxX(),envelope.getMaxY()),new jsts.geom.Coordinate(envelope.getMaxX(),envelope.getMinY()),new jsts.geom.Coordinate(envelope.getMinX(),envelope.getMinY())]),null);};jsts.geomgraph.NodeFactory=function(){};jsts.geomgraph.NodeFactory.prototype.createNode=function(coord){return new jsts.geomgraph.Node(coord,null);};(function(){jsts.geomgraph.Position=function(){};jsts.geomgraph.Position.ON=0;jsts.geomgraph.Position.LEFT=1;jsts.geomgraph.Position.RIGHT=2;jsts.geomgraph.Position.opposite=function(position){if(position===jsts.geomgraph.Position.LEFT){return jsts.geomgraph.Position.RIGHT;}
if(position===jsts.geomgraph.Position.RIGHT){return jsts.geomgraph.Position.LEFT;}
return position;};})();jsts.geomgraph.TopologyLocation=function(){this.location=[];if(arguments.length===3){var on=arguments[0];var left=arguments[1];var right=arguments[2];this.init(3);this.location[jsts.geomgraph.Position.ON]=on;this.location[jsts.geomgraph.Position.LEFT]=left;this.location[jsts.geomgraph.Position.RIGHT]=right;}else if(arguments[0]instanceof jsts.geomgraph.TopologyLocation){var gl=arguments[0];this.init(gl.location.length);if(gl!=null){for(var i=0;i<this.location.length;i++){this.location[i]=gl.location[i];}}}else if(typeof arguments[0]==='number'){var on=arguments[0];this.init(1);this.location[jsts.geomgraph.Position.ON]=on;}else if(arguments[0]instanceof Array){var location=arguments[0];this.init(location.length);}};jsts.geomgraph.TopologyLocation.prototype.location=null;jsts.geomgraph.TopologyLocation.prototype.init=function(size){this.location[size-1]=null;this.setAllLocations(jsts.geom.Location.NONE);};jsts.geomgraph.TopologyLocation.prototype.get=function(posIndex){if(posIndex<this.location.length)
return this.location[posIndex];return jsts.geom.Location.NONE;};jsts.geomgraph.TopologyLocation.prototype.isNull=function(){for(var i=0;i<this.location.length;i++){if(this.location[i]!==jsts.geom.Location.NONE)
return false;}
return true;};jsts.geomgraph.TopologyLocation.prototype.isAnyNull=function(){for(var i=0;i<this.location.length;i++){if(this.location[i]===jsts.geom.Location.NONE)
return true;}
return false;};jsts.geomgraph.TopologyLocation.prototype.isEqualOnSide=function(le,locIndex){return this.location[locIndex]==le.location[locIndex];};jsts.geomgraph.TopologyLocation.prototype.isArea=function(){return this.location.length>1;};jsts.geomgraph.TopologyLocation.prototype.isLine=function(){return this.location.length===1;};jsts.geomgraph.TopologyLocation.prototype.flip=function(){if(this.location.length<=1)
return;var temp=this.location[jsts.geomgraph.Position.LEFT];this.location[jsts.geomgraph.Position.LEFT]=this.location[jsts.geomgraph.Position.RIGHT];this.location[jsts.geomgraph.Position.RIGHT]=temp;};jsts.geomgraph.TopologyLocation.prototype.setAllLocations=function(locValue){for(var i=0;i<this.location.length;i++){this.location[i]=locValue;}};jsts.geomgraph.TopologyLocation.prototype.setAllLocationsIfNull=function(locValue){for(var i=0;i<this.location.length;i++){if(this.location[i]===jsts.geom.Location.NONE)
this.location[i]=locValue;}};jsts.geomgraph.TopologyLocation.prototype.setLocation=function(locIndex,locValue){if(locValue!==undefined){this.location[locIndex]=locValue;}else{this.setLocation(jsts.geomgraph.Position.ON,locIndex);}};jsts.geomgraph.TopologyLocation.prototype.getLocations=function(){return location;};jsts.geomgraph.TopologyLocation.prototype.setLocations=function(on,left,right){this.location[jsts.geomgraph.Position.ON]=on;this.location[jsts.geomgraph.Position.LEFT]=left;this.location[jsts.geomgraph.Position.RIGHT]=right;};jsts.geomgraph.TopologyLocation.prototype.allPositionsEqual=function(loc){for(var i=0;i<this.location.length;i++){if(this.location[i]!==loc)
return false;}
return true;};jsts.geomgraph.TopologyLocation.prototype.merge=function(gl){if(gl.location.length>this.location.length){var newLoc=[];newLoc[jsts.geomgraph.Position.ON]=this.location[jsts.geomgraph.Position.ON];newLoc[jsts.geomgraph.Position.LEFT]=jsts.geom.Location.NONE;newLoc[jsts.geomgraph.Position.RIGHT]=jsts.geom.Location.NONE;this.location=newLoc;}
for(var i=0;i<this.location.length;i++){if(this.location[i]===jsts.geom.Location.NONE&&i<gl.location.length)
this.location[i]=gl.location[i];}};jsts.geomgraph.Label=function(){this.elt=[];var geomIndex,onLoc,leftLoc,lbl,rightLoc;if(arguments.length===4){geomIndex=arguments[0];onLoc=arguments[1];leftLoc=arguments[2];rightLoc=arguments[3];this.elt[0]=new jsts.geomgraph.TopologyLocation(jsts.geom.Location.NONE,jsts.geom.Location.NONE,jsts.geom.Location.NONE);this.elt[1]=new jsts.geomgraph.TopologyLocation(jsts.geom.Location.NONE,jsts.geom.Location.NONE,jsts.geom.Location.NONE);this.elt[geomIndex].setLocations(onLoc,leftLoc,rightLoc);}else if(arguments.length===3){onLoc=arguments[0];leftLoc=arguments[1];rightLoc=arguments[2];this.elt[0]=new jsts.geomgraph.TopologyLocation(onLoc,leftLoc,rightLoc);this.elt[1]=new jsts.geomgraph.TopologyLocation(onLoc,leftLoc,rightLoc);}else if(arguments.length===2){geomIndex=arguments[0];onLoc=arguments[1];this.elt[0]=new jsts.geomgraph.TopologyLocation(jsts.geom.Location.NONE);this.elt[1]=new jsts.geomgraph.TopologyLocation(jsts.geom.Location.NONE);this.elt[geomIndex].setLocation(onLoc);}else if(arguments[0]instanceof jsts.geomgraph.Label){lbl=arguments[0];this.elt[0]=new jsts.geomgraph.TopologyLocation(lbl.elt[0]);this.elt[1]=new jsts.geomgraph.TopologyLocation(lbl.elt[1]);}else if(typeof arguments[0]==='number'){onLoc=arguments[0];this.elt[0]=new jsts.geomgraph.TopologyLocation(onLoc);this.elt[1]=new jsts.geomgraph.TopologyLocation(onLoc);}};jsts.geomgraph.Label.toLineLabel=function(label){var i,lineLabel=new jsts.geomgraph.Label(jsts.geom.Location.NONE);for(i=0;i<2;i++){lineLabel.setLocation(i,label.getLocation(i));}
return lineLabel;};jsts.geomgraph.Label.prototype.elt=null;jsts.geomgraph.Label.prototype.flip=function(){this.elt[0].flip();this.elt[1].flip();};jsts.geomgraph.Label.prototype.getLocation=function(geomIndex,posIndex){if(arguments.length==1){return this.getLocation2.apply(this,arguments);}
return this.elt[geomIndex].get(posIndex);};jsts.geomgraph.Label.prototype.getLocation2=function(geomIndex){return this.elt[geomIndex].get(jsts.geomgraph.Position.ON);};jsts.geomgraph.Label.prototype.setLocation=function(geomIndex,posIndex,location){if(arguments.length==2){this.setLocation2.apply(this,arguments);return;}
this.elt[geomIndex].setLocation(posIndex,location);};jsts.geomgraph.Label.prototype.setLocation2=function(geomIndex,location){this.elt[geomIndex].setLocation(jsts.geomgraph.Position.ON,location);};jsts.geomgraph.Label.prototype.setAllLocations=function(geomIndex,location){this.elt[geomIndex].setAllLocations(location);};jsts.geomgraph.Label.prototype.setAllLocationsIfNull=function(geomIndex,location){if(arguments.length==1){this.setAllLocationsIfNull2.apply(this,arguments);return;}
this.elt[geomIndex].setAllLocationsIfNull(location);};jsts.geomgraph.Label.prototype.setAllLocationsIfNull2=function(location){this.setAllLocationsIfNull(0,location);this.setAllLocationsIfNull(1,location);};jsts.geomgraph.Label.prototype.merge=function(lbl){var i;for(i=0;i<2;i++){if(this.elt[i]===null&&lbl.elt[i]!==null){this.elt[i]=new jsts.geomgraph.TopologyLocation(lbl.elt[i]);}else{this.elt[i].merge(lbl.elt[i]);}}};jsts.geomgraph.Label.prototype.getGeometryCount=function(){var count=0;if(!this.elt[0].isNull()){count++;}
if(!this.elt[1].isNull()){count++;}
return count;};jsts.geomgraph.Label.prototype.isNull=function(geomIndex){return this.elt[geomIndex].isNull();};jsts.geomgraph.Label.prototype.isAnyNull=function(geomIndex){return this.elt[geomIndex].isAnyNull();};jsts.geomgraph.Label.prototype.isArea=function(){if(arguments.length==1){return this.isArea2(arguments[0]);}
return this.elt[0].isArea()||this.elt[1].isArea();};jsts.geomgraph.Label.prototype.isArea2=function(geomIndex){return this.elt[geomIndex].isArea();};jsts.geomgraph.Label.prototype.isLine=function(geomIndex){return this.elt[geomIndex].isLine();};jsts.geomgraph.Label.prototype.isEqualOnSide=function(lbl,side){return this.elt[0].isEqualOnSide(lbl.elt[0],side)&&this.elt[1].isEqualOnSide(lbl.elt[1],side);};jsts.geomgraph.Label.prototype.allPositionsEqual=function(geomIndex,loc){return this.elt[geomIndex].allPositionsEqual(loc);};jsts.geomgraph.Label.prototype.toLine=function(geomIndex){if(this.elt[geomIndex].isArea()){this.elt[geomIndex]=new jsts.geomgraph.TopologyLocation(this.elt[geomIndex].location[0]);}};jsts.geomgraph.EdgeRing=function(start,geometryFactory){this.edges=[];this.pts=[];this.holes=[];this.label=new jsts.geomgraph.Label(jsts.geom.Location.NONE);this.geometryFactory=geometryFactory;if(start){this.computePoints(start);this.computeRing();}};jsts.geomgraph.EdgeRing.prototype.startDe=null;jsts.geomgraph.EdgeRing.prototype.maxNodeDegree=-1;jsts.geomgraph.EdgeRing.prototype.edges=null;jsts.geomgraph.EdgeRing.prototype.pts=null;jsts.geomgraph.EdgeRing.prototype.label=null;jsts.geomgraph.EdgeRing.prototype.ring=null;jsts.geomgraph.EdgeRing.prototype._isHole=null;jsts.geomgraph.EdgeRing.prototype.shell=null;jsts.geomgraph.EdgeRing.prototype.holes=null;jsts.geomgraph.EdgeRing.prototype.geometryFactory=null;jsts.geomgraph.EdgeRing.prototype.isIsolated=function(){return(this.label.getGeometryCount()==1);};jsts.geomgraph.EdgeRing.prototype.isHole=function(){return this._isHole;};jsts.geomgraph.EdgeRing.prototype.getCoordinate=function(i){return this.pts[i];};jsts.geomgraph.EdgeRing.prototype.getLinearRing=function(){return this.ring;};jsts.geomgraph.EdgeRing.prototype.getLabel=function(){return this.label;};jsts.geomgraph.EdgeRing.prototype.isShell=function(){return this.shell===null;};jsts.geomgraph.EdgeRing.prototype.getShell=function(){return this.shell;};jsts.geomgraph.EdgeRing.prototype.setShell=function(shell){this.shell=shell;if(shell!==null)
shell.addHole(this);};jsts.geomgraph.EdgeRing.prototype.addHole=function(ring){this.holes.push(ring);};jsts.geomgraph.EdgeRing.prototype.toPolygon=function(geometryFactory){var holeLR=[];for(var i=0;i<this.holes.length;i++){holeLR[i]=this.holes[i].getLinearRing();}
var poly=this.geometryFactory.createPolygon(this.getLinearRing(),holeLR);return poly;};jsts.geomgraph.EdgeRing.prototype.computeRing=function(){if(this.ring!==null)
return;var coord=[];for(var i=0;i<this.pts.length;i++){coord[i]=this.pts[i];}
this.ring=this.geometryFactory.createLinearRing(coord);this._isHole=jsts.algorithm.CGAlgorithms.isCCW(this.ring.getCoordinates());};jsts.geomgraph.EdgeRing.prototype.getNext=function(de){throw new jsts.error.AbstractInvocationError();};jsts.geomgraph.EdgeRing.prototype.setEdgeRing=function(de,er){throw new jsts.error.AbstractInvocationError();};jsts.geomgraph.EdgeRing.prototype.getEdges=function(){return this.edges;};jsts.geomgraph.EdgeRing.prototype.computePoints=function(start){this.startDe=start;var de=start;var isFirstEdge=true;do{if(de===null)
throw new jsts.error.TopologyError('Found null DirectedEdge');if(de.getEdgeRing()===this)
throw new jsts.error.TopologyError('Directed Edge visited twice during ring-building at '+
de.getCoordinate());this.edges.push(de);var label=de.getLabel();jsts.util.Assert.isTrue(label.isArea());this.mergeLabel(label);this.addPoints(de.getEdge(),de.isForward(),isFirstEdge);isFirstEdge=false;this.setEdgeRing(de,this);de=this.getNext(de);}while(de!==this.startDe);};jsts.geomgraph.EdgeRing.prototype.getMaxNodeDegree=function(){if(this.maxNodeDegree<0)
this.computeMaxNodeDegree();return this.maxNodeDegree;};jsts.geomgraph.EdgeRing.prototype.computeMaxNodeDegree=function(){this.maxNodeDegree=0;var de=this.startDe;do{var node=de.getNode();var degree=node.getEdges().getOutgoingDegree(this);if(degree>this.maxNodeDegree)
this.maxNodeDegree=degree;de=this.getNext(de);}while(de!==this.startDe);this.maxNodeDegree*=2;};jsts.geomgraph.EdgeRing.prototype.setInResult=function(){var de=this.startDe;do{de.getEdge().setInResult(true);de=de.getNext();}while(de!=this.startDe);};jsts.geomgraph.EdgeRing.prototype.mergeLabel=function(deLabel){this.mergeLabel2(deLabel,0);this.mergeLabel2(deLabel,1);};jsts.geomgraph.EdgeRing.prototype.mergeLabel2=function(deLabel,geomIndex){var loc=deLabel.getLocation(geomIndex,jsts.geomgraph.Position.RIGHT);if(loc==jsts.geom.Location.NONE)
return;if(this.label.getLocation(geomIndex)===jsts.geom.Location.NONE){this.label.setLocation(geomIndex,loc);return;}};jsts.geomgraph.EdgeRing.prototype.addPoints=function(edge,isForward,isFirstEdge){var edgePts=edge.getCoordinates();if(isForward){var startIndex=1;if(isFirstEdge)
startIndex=0;for(var i=startIndex;i<edgePts.length;i++){this.pts.push(edgePts[i]);}}else{var startIndex=edgePts.length-2;if(isFirstEdge)
startIndex=edgePts.length-1;for(var i=startIndex;i>=0;i--){this.pts.push(edgePts[i]);}}};jsts.geomgraph.EdgeRing.prototype.containsPoint=function(p){var shell=this.getLinearRing();var env=shell.getEnvelopeInternal();if(!env.contains(p))
return false;if(!jsts.algorithm.CGAlgorithms.isPointInRing(p,shell.getCoordinates()))
return false;for(var i=0;i<this.holes.length;i++){var hole=this.holes[i];if(hole.containsPoint(p))
return false;}
return true;};jsts.geom.Dimension=function(){};jsts.geom.Dimension.P=0;jsts.geom.Dimension.L=1;jsts.geom.Dimension.A=2;jsts.geom.Dimension.FALSE=-1;jsts.geom.Dimension.TRUE=-2;jsts.geom.Dimension.DONTCARE=-3;jsts.geom.Dimension.toDimensionSymbol=function(dimensionValue){switch(dimensionValue){case jsts.geom.Dimension.FALSE:return'F';case jsts.geom.Dimension.TRUE:return'T';case jsts.geom.Dimension.DONTCARE:return'*';case jsts.geom.Dimension.P:return'0';case jsts.geom.Dimension.L:return'1';case jsts.geom.Dimension.A:return'2';}
throw new jsts.IllegalArgumentError('Unknown dimension value: '+
dimensionValue);};jsts.geom.Dimension.toDimensionValue=function(dimensionSymbol){switch(dimensionSymbol.toUpperCase()){case'F':return jsts.geom.Dimension.FALSE;case'T':return jsts.geom.Dimension.TRUE;case'*':return jsts.geom.Dimension.DONTCARE;case'0':return jsts.geom.Dimension.P;case'1':return jsts.geom.Dimension.L;case'2':return jsts.geom.Dimension.A;}
throw new jsts.error.IllegalArgumentError('Unknown dimension symbol: '+
dimensionSymbol);};(function(){var Dimension=jsts.geom.Dimension;jsts.geom.LineString=function(points,factory){this.factory=factory;this.points=points||[];};jsts.geom.LineString.prototype=new jsts.geom.Geometry();jsts.geom.LineString.constructor=jsts.geom.LineString;jsts.geom.LineString.prototype.points=null;jsts.geom.LineString.prototype.getCoordinates=function(){return this.points;};jsts.geom.LineString.prototype.getCoordinateSequence=function(){return this.points;};jsts.geom.LineString.prototype.getCoordinateN=function(n){return this.points[n];};jsts.geom.LineString.prototype.getCoordinate=function(){if(this.isEmpty()){return null;}
return this.getCoordinateN(0);};jsts.geom.LineString.prototype.getDimension=function(){return 1;};jsts.geom.LineString.prototype.getBoundaryDimension=function(){if(this.isClosed()){return Dimension.FALSE;}
return 0;};jsts.geom.LineString.prototype.isEmpty=function(){return this.points.length===0;};jsts.geom.LineString.prototype.getNumPoints=function(){return this.points.length;};jsts.geom.LineString.prototype.getPointN=function(n){return this.getFactory().createPoint(this.points[n]);};jsts.geom.LineString.prototype.getStartPoint=function(){if(this.isEmpty()){return null;}
return this.getPointN(0);};jsts.geom.LineString.prototype.getEndPoint=function(){if(this.isEmpty()){return null;}
return this.getPointN(this.getNumPoints()-1);};jsts.geom.LineString.prototype.isClosed=function(){if(this.isEmpty()){return false;}
return this.getCoordinateN(0).equals2D(this.getCoordinateN(this.points.length-1));};jsts.geom.LineString.prototype.isRing=function(){return this.isClosed()&&this.isSimple();};jsts.geom.LineString.prototype.getGeometryType=function(){return'LineString';};jsts.geom.LineString.prototype.getLength=function(){return jsts.algorithm.CGAlgorithms.computeLength(this.points);};jsts.geom.LineString.prototype.getBoundary=function(){return(new jsts.operation.BoundaryOp(this)).getBoundary();};jsts.geom.LineString.prototype.computeEnvelopeInternal=function(){if(this.isEmpty()){return new jsts.geom.Envelope();}
var env=new jsts.geom.Envelope();this.points.forEach(function(component){env.expandToInclude(component);});return env;};jsts.geom.LineString.prototype.equalsExact=function(other,tolerance){if(!this.isEquivalentClass(other)){return false;}
if(this.points.length!==other.points.length){return false;}
if(this.isEmpty()&&other.isEmpty()){return true;}
return this.points.reduce(function(equal,point,i){return equal&&jsts.geom.Geometry.prototype.equal(point,other.points[i],tolerance);});};jsts.geom.LineString.prototype.isEquivalentClass=function(other){return other instanceof jsts.geom.LineString;};jsts.geom.LineString.prototype.compareToSameClass=function(o){var line=o;var i=0,il=this.points.length;var j=0,jl=line.points.length;while(i<il&&j<jl){var comparison=this.points[i].compareTo(line.points[j]);if(comparison!==0){return comparison;}
i++;j++;}
if(i<il){return 1;}
if(j<jl){return-1;}
return 0;};jsts.geom.LineString.prototype.apply=function(filter){if(filter instanceof jsts.geom.GeometryFilter||filter instanceof jsts.geom.GeometryComponentFilter){filter.filter(this);}else if(filter instanceof jsts.geom.CoordinateFilter){for(var i=0,len=this.points.length;i<len;i++){filter.filter(this.points[i]);}}else if(filter instanceof jsts.geom.CoordinateSequenceFilter){this.apply2.apply(this,arguments);}};jsts.geom.LineString.prototype.apply2=function(filter){if(this.points.length===0)
return;for(var i=0;i<this.points.length;i++){filter.filter(this.points,i);if(filter.isDone())
break;}
if(filter.isGeometryChanged()){}};jsts.geom.LineString.prototype.clone=function(){var points=[];for(var i=0,len=this.points.length;i<len;i++){points.push(this.points[i].clone());}
return this.factory.createLineString(points);};jsts.geom.LineString.prototype.normalize=function(){var i,il,j,ci,cj,len;len=this.points.length;il=parseInt(len/2);for(i=0;i<il;i++){j=len-1-i;ci=this.points[i];cj=this.points[j];if(!ci.equals(cj)){if(ci.compareTo(cj)>0){this.points.reverse();}
return;}}};jsts.geom.LineString.prototype.CLASS_NAME='jsts.geom.LineString';})();(function(){jsts.geom.LinearRing=function(points,factory){jsts.geom.LineString.apply(this,arguments);};jsts.geom.LinearRing.prototype=new jsts.geom.LineString();jsts.geom.LinearRing.constructor=jsts.geom.LinearRing;jsts.geom.LinearRing.prototype.getBoundaryDimension=function(){return jsts.geom.Dimension.FALSE;};jsts.geom.LinearRing.prototype.isSimple=function(){return true;};jsts.geom.LinearRing.prototype.getGeometryType=function(){return'LinearRing';};jsts.geom.LinearRing.MINIMUM_VALID_SIZE=4;jsts.geom.LinearRing.prototype.CLASS_NAME='jsts.geom.LinearRing';})();jsts.operation.overlay.OverlayNodeFactory=function(){};jsts.operation.overlay.OverlayNodeFactory.prototype=new jsts.geomgraph.NodeFactory();jsts.operation.overlay.OverlayNodeFactory.constructor=jsts.operation.overlay.OverlayNodeFactory;jsts.operation.overlay.OverlayNodeFactory.prototype.createNode=function(coord){return new jsts.geomgraph.Node(coord,new jsts.geomgraph.DirectedEdgeStar());};jsts.operation.buffer.SubgraphDepthLocater=function(subgraphs){this.subgraphs=[];this.seg=new jsts.geom.LineSegment();this.subgraphs=subgraphs;};jsts.operation.buffer.SubgraphDepthLocater.prototype.subgraphs=null;jsts.operation.buffer.SubgraphDepthLocater.prototype.seg=null;jsts.operation.buffer.SubgraphDepthLocater.prototype.getDepth=function(p){var stabbedSegments=this.findStabbedSegments(p);if(stabbedSegments.length===0)
return 0;stabbedSegments.sort();var ds=stabbedSegments[0];return ds.leftDepth;};jsts.operation.buffer.SubgraphDepthLocater.prototype.findStabbedSegments=function(stabbingRayLeftPt){if(arguments.length===3){this.findStabbedSegments2.apply(this,arguments);return;}
var stabbedSegments=[];for(var i=0;i<this.subgraphs.length;i++){var bsg=this.subgraphs[i];var env=bsg.getEnvelope();if(stabbingRayLeftPt.y<env.getMinY()||stabbingRayLeftPt.y>env.getMaxY())
continue;this.findStabbedSegments2(stabbingRayLeftPt,bsg.getDirectedEdges(),stabbedSegments);}
return stabbedSegments;};jsts.operation.buffer.SubgraphDepthLocater.prototype.findStabbedSegments2=function(stabbingRayLeftPt,dirEdges,stabbedSegments){if(arguments[1]instanceof jsts.geomgraph.DirectedEdge){this.findStabbedSegments3(stabbingRayLeftPt,dirEdges,stabbedSegments);return;}
for(var i=dirEdges.iterator();i.hasNext();){var de=i.next();if(!de.isForward())
continue;this.findStabbedSegments3(stabbingRayLeftPt,de,stabbedSegments);}};jsts.operation.buffer.SubgraphDepthLocater.prototype.findStabbedSegments3=function(stabbingRayLeftPt,dirEdge,stabbedSegments){var pts=dirEdge.getEdge().getCoordinates();for(var i=0;i<pts.length-1;i++){this.seg.p0=pts[i];this.seg.p1=pts[i+1];if(this.seg.p0.y>this.seg.p1.y)
this.seg.reverse();var maxx=Math.max(this.seg.p0.x,this.seg.p1.x);if(maxx<stabbingRayLeftPt.x)
continue;if(this.seg.isHorizontal())
continue;if(stabbingRayLeftPt.y<this.seg.p0.y||stabbingRayLeftPt.y>this.seg.p1.y)
continue;if(jsts.algorithm.CGAlgorithms.computeOrientation(this.seg.p0,this.seg.p1,stabbingRayLeftPt)===jsts.algorithm.CGAlgorithms.RIGHT)
continue;var depth=dirEdge.getDepth(jsts.geomgraph.Position.LEFT);if(!this.seg.p0.equals(pts[i]))
depth=dirEdge.getDepth(jsts.geomgraph.Position.RIGHT);var ds=new jsts.operation.buffer.SubgraphDepthLocater.DepthSegment(this.seg,depth);stabbedSegments.push(ds);}};jsts.operation.buffer.SubgraphDepthLocater.DepthSegment=function(seg,depth){this.upwardSeg=new jsts.geom.LineSegment(seg);this.leftDepth=depth;};jsts.operation.buffer.SubgraphDepthLocater.DepthSegment.prototype.upwardSeg=null;jsts.operation.buffer.SubgraphDepthLocater.DepthSegment.prototype.leftDepth=null;jsts.operation.buffer.SubgraphDepthLocater.DepthSegment.prototype.compareTo=function(obj){var other=obj;var orientIndex=this.upwardSeg.orientationIndex(other.upwardSeg);if(orientIndex===0)
orientIndex=-1*other.upwardSeg.orientationIndex(upwardSeg);if(orientIndex!==0)
return orientIndex;return this.compareX(this.upwardSeg,other.upwardSeg);};jsts.operation.buffer.SubgraphDepthLocater.DepthSegment.prototype.compareX=function(seg0,seg1){var compare0=seg0.p0.compareTo(seg1.p0);if(compare0!==0)
return compare0;return seg0.p1.compareTo(seg1.p1);};jsts.index.ItemVisitor=function(){};jsts.index.ItemVisitor.prototype.visitItem=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.simplify.LineSegmentIndex=function(){this.index=new jsts.index.quadtree.Quadtree();};jsts.simplify.LineSegmentIndex.prototype.index=null;jsts.simplify.LineSegmentIndex.prototype.add=function(line){if(line instanceof jsts.geom.LineSegment){this.add2(line);return;}
var segs=line.getSegments();for(var i=0;i<segs.length;i++){var seg=segs[i];this.add2(seg);}};jsts.simplify.LineSegmentIndex.prototype.add2=function(seg){this.index.insert(new jsts.geom.Envelope(seg.p0,seg.p1),seg);};jsts.simplify.LineSegmentIndex.prototype.remove=function(seg){this.index.remove(new jsts.geom.Envelope(seg.p0,seg.p1),seg);};jsts.simplify.LineSegmentIndex.prototype.query=function(querySeg){var env=new jsts.geom.Envelope(querySeg.p0,querySeg.p1);var visitor=new jsts.simplify.LineSegmentIndex.LineSegmentVisitor(querySeg);this.index.query(env,visitor);var itemsFound=visitor.getItems();return itemsFound;};jsts.simplify.LineSegmentIndex.LineSegmentVisitor=function(querySeg){this.items=[];this.querySeg=querySeg;};jsts.simplify.LineSegmentIndex.LineSegmentVisitor.prototype=new jsts.index.ItemVisitor();jsts.simplify.LineSegmentIndex.LineSegmentVisitor.prototype.querySeg=null;jsts.simplify.LineSegmentIndex.LineSegmentVisitor.prototype.items=null;jsts.simplify.LineSegmentIndex.LineSegmentVisitor.prototype.visitItem=function(item){var seg=item;if(jsts.geom.Envelope.intersects(seg.p0,seg.p1,this.querySeg.p0,this.querySeg.p1))
this.items.push(item);};jsts.simplify.LineSegmentIndex.LineSegmentVisitor.prototype.getItems=function(){return this.items;};jsts.geomgraph.EdgeEndStar=function(){this.edgeMap=new javascript.util.TreeMap();this.edgeList=null;this.ptInAreaLocation=[jsts.geom.Location.NONE,jsts.geom.Location.NONE];};jsts.geomgraph.EdgeEndStar.prototype.edgeMap=null;jsts.geomgraph.EdgeEndStar.prototype.edgeList=null;jsts.geomgraph.EdgeEndStar.prototype.ptInAreaLocation=null;jsts.geomgraph.EdgeEndStar.prototype.insert=function(e){throw new jsts.error.AbstractMethodInvocationError();};jsts.geomgraph.EdgeEndStar.prototype.insertEdgeEnd=function(e,obj){this.edgeMap.put(e,obj);this.edgeList=null;};jsts.geomgraph.EdgeEndStar.prototype.getCoordinate=function(){var it=this.iterator();if(!it.hasNext())
return null;var e=it.next();return e.getCoordinate();};jsts.geomgraph.EdgeEndStar.prototype.getDegree=function(){return this.edgeMap.size();};jsts.geomgraph.EdgeEndStar.prototype.iterator=function(){return this.getEdges().iterator();};jsts.geomgraph.EdgeEndStar.prototype.getEdges=function(){if(this.edgeList===null){this.edgeList=new javascript.util.ArrayList(this.edgeMap.values());}
return this.edgeList;};jsts.geomgraph.EdgeEndStar.prototype.getNextCW=function(ee){this.getEdges();var i=this.edgeList.indexOf(ee);var iNextCW=i-1;if(i===0)
iNextCW=this.edgeList.length-1;return this.edgeList[iNextCW];};jsts.geomgraph.EdgeEndStar.prototype.computeLabelling=function(geomGraph){this.computeEdgeEndLabels(geomGraph[0].getBoundaryNodeRule());this.propagateSideLabels(0);this.propagateSideLabels(1);var hasDimensionalCollapseEdge=[false,false];for(var it=this.iterator();it.hasNext();){var e=it.next();var label=e.getLabel();for(var geomi=0;geomi<2;geomi++){if(label.isLine(geomi)&&label.getLocation(geomi)===jsts.geom.Location.BOUNDARY)
hasDimensionalCollapseEdge[geomi]=true;}}
for(var it=this.iterator();it.hasNext();){var e=it.next();var label=e.getLabel();for(var geomi=0;geomi<2;geomi++){if(label.isAnyNull(geomi)){var loc=jsts.geom.Location.NONE;if(hasDimensionalCollapseEdge[geomi]){loc=jsts.geom.Location.EXTERIOR;}else{var p=e.getCoordinate();loc=this.getLocation(geomi,p,geomGraph);}
label.setAllLocationsIfNull(geomi,loc);}}}};jsts.geomgraph.EdgeEndStar.prototype.computeEdgeEndLabels=function(boundaryNodeRule){for(var it=this.iterator();it.hasNext();){var ee=it.next();ee.computeLabel(boundaryNodeRule);}};jsts.geomgraph.EdgeEndStar.prototype.getLocation=function(geomIndex,p,geom){if(this.ptInAreaLocation[geomIndex]===jsts.geom.Location.NONE){this.ptInAreaLocation[geomIndex]=jsts.algorithm.locate.SimplePointInAreaLocator.locate(p,geom[geomIndex].getGeometry());}
return this.ptInAreaLocation[geomIndex];};jsts.geomgraph.EdgeEndStar.prototype.isAreaLabelsConsistent=function(geomGraph){this.computeEdgeEndLabels(geomGraph.getBoundaryNodeRule());return this.checkAreaLabelsConsistent(0);};jsts.geomgraph.EdgeEndStar.prototype.checkAreaLabelsConsistent=function(geomIndex){var edges=this.getEdges();if(edges.size()<=0)
return true;var lastEdgeIndex=edges.size()-1;var startLabel=edges.get(lastEdgeIndex).getLabel();var startLoc=startLabel.getLocation(geomIndex,jsts.geomgraph.Position.LEFT);jsts.util.Assert.isTrue(startLoc!=jsts.geom.Location.NONE,'Found unlabelled area edge');var currLoc=startLoc;for(var it=this.iterator();it.hasNext();){var e=it.next();var label=e.getLabel();jsts.util.Assert.isTrue(label.isArea(geomIndex),'Found non-area edge');var leftLoc=label.getLocation(geomIndex,jsts.geomgraph.Position.LEFT);var rightLoc=label.getLocation(geomIndex,jsts.geomgraph.Position.RIGHT);if(leftLoc===rightLoc){return false;}
if(rightLoc!==currLoc){return false;}
currLoc=leftLoc;}
return true;};jsts.geomgraph.EdgeEndStar.prototype.propagateSideLabels=function(geomIndex){var startLoc=jsts.geom.Location.NONE;for(var it=this.iterator();it.hasNext();){var e=it.next();var label=e.getLabel();if(label.isArea(geomIndex)&&label.getLocation(geomIndex,jsts.geomgraph.Position.LEFT)!==jsts.geom.Location.NONE)
startLoc=label.getLocation(geomIndex,jsts.geomgraph.Position.LEFT);}
if(startLoc===jsts.geom.Location.NONE)
return;var currLoc=startLoc;for(var it=this.iterator();it.hasNext();){var e=it.next();var label=e.getLabel();if(label.getLocation(geomIndex,jsts.geomgraph.Position.ON)===jsts.geom.Location.NONE)
label.setLocation(geomIndex,jsts.geomgraph.Position.ON,currLoc);if(label.isArea(geomIndex)){var leftLoc=label.getLocation(geomIndex,jsts.geomgraph.Position.LEFT);var rightLoc=label.getLocation(geomIndex,jsts.geomgraph.Position.RIGHT);if(rightLoc!==jsts.geom.Location.NONE){if(rightLoc!==currLoc)
throw new jsts.error.TopologyError('side location conflict',e.getCoordinate());if(leftLoc===jsts.geom.Location.NONE){jsts.util.Assert.shouldNeverReachHere('found single null side (at '+
e.getCoordinate()+')');}
currLoc=leftLoc;}else{jsts.util.Assert.isTrue(label.getLocation(geomIndex,jsts.geomgraph.Position.LEFT)===jsts.geom.Location.NONE,'found single null side');label.setLocation(geomIndex,jsts.geomgraph.Position.RIGHT,currLoc);label.setLocation(geomIndex,jsts.geomgraph.Position.LEFT,currLoc);}}}};jsts.geomgraph.EdgeEndStar.prototype.findIndex=function(eSearch){this.iterator();for(var i=0;i<this.edgeList.size();i++){var e=this.edgeList.get(i);if(e===eSearch)
return i;}
return-1;};jsts.operation.relate.EdgeEndBundleStar=function(){jsts.geomgraph.EdgeEndStar.apply(this,arguments);};jsts.operation.relate.EdgeEndBundleStar.prototype=new jsts.geomgraph.EdgeEndStar();jsts.operation.relate.EdgeEndBundleStar.prototype.insert=function(e){var eb=this.edgeMap.get(e);if(eb===null){eb=new jsts.operation.relate.EdgeEndBundle(e);this.insertEdgeEnd(e,eb);}
else{eb.insert(e);}};jsts.operation.relate.EdgeEndBundleStar.prototype.updateIM=function(im){for(var it=this.iterator();it.hasNext();){var esb=it.next();esb.updateIM(im);}};(function(){jsts.geom.Polygon=function(shell,holes,factory){this.shell=shell||factory.createLinearRing(null);this.holes=holes||[];this.factory=factory;};jsts.geom.Polygon.prototype=new jsts.geom.Geometry();jsts.geom.Polygon.constructor=jsts.geom.Polygon;jsts.geom.Polygon.prototype.getCoordinate=function(){return this.shell.getCoordinate();};jsts.geom.Polygon.prototype.getCoordinates=function(){if(this.isEmpty()){return[];}
var coordinates=[];var k=-1;var shellCoordinates=this.shell.getCoordinates();for(var x=0;x<shellCoordinates.length;x++){k++;coordinates[k]=shellCoordinates[x];}
for(var i=0;i<this.holes.length;i++){var childCoordinates=this.holes[i].getCoordinates();for(var j=0;j<childCoordinates.length;j++){k++;coordinates[k]=childCoordinates[j];}}
return coordinates;};jsts.geom.Polygon.prototype.isEmpty=function(){return this.shell.isEmpty();};jsts.geom.Polygon.prototype.getExteriorRing=function(){return this.shell;};jsts.geom.Polygon.prototype.getInteriorRingN=function(n){return this.holes[n];};jsts.geom.Polygon.prototype.getNumInteriorRing=function(){return this.holes.length;};jsts.geom.Polygon.prototype.getArea=function(){var area=0.0;area+=Math.abs(jsts.algorithm.CGAlgorithms.signedArea(this.shell.getCoordinateSequence()));for(var i=0;i<this.holes.length;i++){area-=Math.abs(jsts.algorithm.CGAlgorithms.signedArea(this.holes[i].getCoordinateSequence()));}
return area;};jsts.geom.Polygon.prototype.getLength=function(){var len=0.0;len+=this.shell.getLength();for(var i=0;i<this.holes.length;i++){len+=this.holes[i].getLength();}
return len;};jsts.geom.Polygon.prototype.getBoundary=function(){if(this.isEmpty()){return this.getFactory().createMultiLineString(null);}
var rings=[];rings[0]=this.shell.clone();for(var i=0,len=this.holes.length;i<len;i++){rings[i+1]=this.holes[i].clone();}
if(rings.length<=1)
return rings[0];return this.getFactory().createMultiLineString(rings);};jsts.geom.Polygon.prototype.computeEnvelopeInternal=function(){return this.shell.getEnvelopeInternal();};jsts.geom.Polygon.prototype.getDimension=function(){return 2;};jsts.geom.Polygon.prototype.getBoundaryDimension=function(){return 1;};jsts.geom.Polygon.prototype.equalsExact=function(other,tolerance){if(!this.isEquivalentClass(other)){return false;}
if(this.isEmpty()&&other.isEmpty()){return true;}
if(this.isEmpty()!==other.isEmpty()){return false;}
if(!this.shell.equalsExact(other.shell,tolerance)){return false;}
if(this.holes.length!==other.holes.length){return false;}
if(this.holes.length!==other.holes.length){return false;}
for(var i=0;i<this.holes.length;i++){if(!(this.holes[i]).equalsExact(other.holes[i],tolerance)){return false;}}
return true;};jsts.geom.Polygon.prototype.compareToSameClass=function(o){return this.shell.compareToSameClass(o.shell);};jsts.geom.Polygon.prototype.apply=function(filter){if(filter instanceof jsts.geom.GeometryComponentFilter){filter.filter(this);this.shell.apply(filter);for(var i=0,len=this.holes.length;i<len;i++){this.holes[i].apply(filter);}}else if(filter instanceof jsts.geom.GeometryFilter){filter.filter(this);}else if(filter instanceof jsts.geom.CoordinateFilter){this.shell.apply(filter);for(var i=0,len=this.holes.length;i<len;i++){this.holes[i].apply(filter);}}else if(filter instanceof jsts.geom.CoordinateSequenceFilter){this.apply2.apply(this,arguments);}};jsts.geom.Polygon.prototype.apply2=function(filter){this.shell.apply(filter);if(!filter.isDone()){for(var i=0;i<this.holes.length;i++){this.holes[i].apply(filter);if(filter.isDone())
break;}}
if(filter.isGeometryChanged()){}};jsts.geom.Polygon.prototype.clone=function(){var holes=[];for(var i=0,len=this.holes.length;i<len;i++){holes.push(this.holes[i].clone());}
return this.factory.createPolygon(this.shell.clone(),holes);};jsts.geom.Polygon.prototype.normalize=function(){this.normalize2(this.shell,true);for(var i=0,len=this.holes.length;i<len;i++){this.normalize2(this.holes[i],false);}
this.holes.sort();};jsts.geom.Polygon.prototype.normalize2=function(ring,clockwise){if(ring.isEmpty()){return;}
var uniqueCoordinates=ring.points.slice(0,ring.points.length-1);var minCoordinate=jsts.geom.CoordinateArrays.minCoordinate(ring.points);jsts.geom.CoordinateArrays.scroll(uniqueCoordinates,minCoordinate);ring.points=uniqueCoordinates.concat();ring.points[uniqueCoordinates.length]=uniqueCoordinates[0];if(jsts.algorithm.CGAlgorithms.isCCW(ring.points)===clockwise){ring.points.reverse();}};jsts.geom.Polygon.prototype.CLASS_NAME='jsts.geom.Polygon';})();jsts.algorithm.distance.DistanceToPoint=function(){};jsts.algorithm.distance.DistanceToPoint.computeDistance=function(geom,pt,ptDist){if(geom instanceof jsts.geom.LineString){jsts.algorithm.distance.DistanceToPoint.computeDistance2(geom,pt,ptDist);}else if(geom instanceof jsts.geom.Polygon){jsts.algorithm.distance.DistanceToPoint.computeDistance4(geom,pt,ptDist);}else if(geom instanceof jsts.geom.GeometryCollection){var gc=geom;for(var i=0;i<gc.getNumGeometries();i++){var g=gc.getGeometryN(i);jsts.algorithm.distance.DistanceToPoint.computeDistance(g,pt,ptDist);}}else{ptDist.setMinimum(geom.getCoordinate(),pt);}};jsts.algorithm.distance.DistanceToPoint.computeDistance2=function(line,pt,ptDist){var tempSegment=new jsts.geom.LineSegment();var coords=line.getCoordinates();for(var i=0;i<coords.length-1;i++){tempSegment.setCoordinates(coords[i],coords[i+1]);var closestPt=tempSegment.closestPoint(pt);ptDist.setMinimum(closestPt,pt);}};jsts.algorithm.distance.DistanceToPoint.computeDistance3=function(segment,pt,ptDist){var closestPt=segment.closestPoint(pt);ptDist.setMinimum(closestPt,pt);};jsts.algorithm.distance.DistanceToPoint.computeDistance4=function(poly,pt,ptDist){jsts.algorithm.distance.DistanceToPoint.computeDistance2(poly.getExteriorRing(),pt,ptDist);for(var i=0;i<poly.getNumInteriorRing();i++){jsts.algorithm.distance.DistanceToPoint.computeDistance2(poly.getInteriorRingN(i),pt,ptDist);}};jsts.index.strtree.Boundable=function(){};jsts.index.strtree.Boundable.prototype.getBounds=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.index.strtree.ItemBoundable=function(bounds,item){this.bounds=bounds;this.item=item;};jsts.index.strtree.ItemBoundable.prototype=new jsts.index.strtree.Boundable();jsts.index.strtree.ItemBoundable.constructor=jsts.index.strtree.ItemBoundable;jsts.index.strtree.ItemBoundable.prototype.bounds=null;jsts.index.strtree.ItemBoundable.prototype.item=null;jsts.index.strtree.ItemBoundable.prototype.getBounds=function(){return this.bounds;};jsts.index.strtree.ItemBoundable.prototype.getItem=function(){return this.item;};jsts.noding.SegmentPointComparator=function(){};jsts.noding.SegmentPointComparator.compare=function(octant,p0,p1){if(p0.equals2D(p1))
return 0;var xSign=jsts.noding.SegmentPointComparator.relativeSign(p0.x,p1.x);var ySign=jsts.noding.SegmentPointComparator.relativeSign(p0.y,p1.y);switch(octant){case 0:return jsts.noding.SegmentPointComparator.compareValue(xSign,ySign);case 1:return jsts.noding.SegmentPointComparator.compareValue(ySign,xSign);case 2:return jsts.noding.SegmentPointComparator.compareValue(ySign,-xSign);case 3:return jsts.noding.SegmentPointComparator.compareValue(-xSign,ySign);case 4:return jsts.noding.SegmentPointComparator.compareValue(-xSign,-ySign);case 5:return jsts.noding.SegmentPointComparator.compareValue(-ySign,-xSign);case 6:return jsts.noding.SegmentPointComparator.compareValue(-ySign,xSign);case 7:return jsts.noding.SegmentPointComparator.compareValue(xSign,-ySign);}
return 0;};jsts.noding.SegmentPointComparator.relativeSign=function(x0,x1){if(x0<x1)
return-1;if(x0>x1)
return 1;return 0;};jsts.noding.SegmentPointComparator.compareValue=function(compareSign0,compareSign1){if(compareSign0<0)
return-1;if(compareSign0>0)
return 1;if(compareSign1<0)
return-1;if(compareSign1>0)
return 1;return 0;};jsts.operation.IsSimpleOp=function(geom){this.geom=geom;};jsts.operation.IsSimpleOp.prototype.geom=null;jsts.operation.IsSimpleOp.prototype.isClosedEndpointsInInterior=true;jsts.operation.IsSimpleOp.prototype.nonSimpleLocation=null;jsts.operation.IsSimpleOp.prototype.IsSimpleOp=function(geom){this.geom=geom;};jsts.operation.IsSimpleOp.prototype.isSimple=function(){this.nonSimpleLocation=null;if(this.geom instanceof jsts.geom.LineString){return this.isSimpleLinearGeometry(this.geom);}
if(this.geom instanceof jsts.geom.MultiLineString){return this.isSimpleLinearGeometry(this.geom);}
if(this.geom instanceof jsts.geom.MultiPoint){return this.isSimpleMultiPoint(this.geom);}
return true;};jsts.operation.IsSimpleOp.prototype.isSimpleMultiPoint=function(mp){if(mp.isEmpty())
return true;var points=[];for(var i=0;i<mp.getNumGeometries();i++){var pt=mp.getGeometryN(i);var p=pt.getCoordinate();for(var j=0;j<points.length;j++){var point=points[j];if(p.equals2D(point)){this.nonSimpleLocation=p;return false;}}
points.push(p);}
return true;};jsts.operation.IsSimpleOp.prototype.isSimpleLinearGeometry=function(geom){if(geom.isEmpty())
return true;var graph=new jsts.geomgraph.GeometryGraph(0,geom);var li=new jsts.algorithm.RobustLineIntersector();var si=graph.computeSelfNodes(li,true);if(!si.hasIntersection())
return true;if(si.hasProperIntersection()){this.nonSimpleLocation=si.getProperIntersectionPoint();return false;}
if(this.hasNonEndpointIntersection(graph))
return false;if(this.isClosedEndpointsInInterior){if(this.hasClosedEndpointIntersection(graph))
return false;}
return true;};jsts.operation.IsSimpleOp.prototype.hasNonEndpointIntersection=function(graph){for(var i=graph.getEdgeIterator();i.hasNext();){var e=i.next();var maxSegmentIndex=e.getMaximumSegmentIndex();for(var eiIt=e.getEdgeIntersectionList().iterator();eiIt.hasNext();){var ei=eiIt.next();if(!ei.isEndPoint(maxSegmentIndex)){this.nonSimpleLocation=ei.getCoordinate();return true;}}}
return false;};jsts.operation.IsSimpleOp.prototype.hasClosedEndpointIntersection=function(graph){var endPoints=new javascript.util.TreeMap();for(var i=graph.getEdgeIterator();i.hasNext();){var e=i.next();var maxSegmentIndex=e.getMaximumSegmentIndex();var isClosed=e.isClosed();var p0=e.getCoordinate(0);this.addEndpoint(endPoints,p0,isClosed);var p1=e.getCoordinate(e.getNumPoints()-1);this.addEndpoint(endPoints,p1,isClosed);}
for(var i=endPoints.values().iterator();i.hasNext();){var eiInfo=i.next();if(eiInfo.isClosed&&eiInfo.degree!=2){this.nonSimpleLocation=eiInfo.getCoordinate();return true;}}
return false;};jsts.operation.IsSimpleOp.EndpointInfo=function(pt){this.pt=pt;this.isClosed=false;this.degree=0;};jsts.operation.IsSimpleOp.EndpointInfo.prototype.pt=null;jsts.operation.IsSimpleOp.EndpointInfo.prototype.isClosed=null;jsts.operation.IsSimpleOp.EndpointInfo.prototype.degree=null;jsts.operation.IsSimpleOp.EndpointInfo.prototype.getCoordinate=function(){return this.pt;};jsts.operation.IsSimpleOp.EndpointInfo.prototype.addEndpoint=function(isClosed){this.degree++;this.isClosed=this.isClosed||isClosed;};jsts.operation.IsSimpleOp.prototype.addEndpoint=function(endPoints,p,isClosed){var eiInfo=endPoints.get(p);if(eiInfo===null){eiInfo=new jsts.operation.IsSimpleOp.EndpointInfo(p);endPoints.put(p,eiInfo);}
eiInfo.addEndpoint(isClosed);};(function(){var LineStringSnapper=function(){this.snapTolerance=0.0;this.seg=new jsts.geom.LineSegment();this.allowSnappingToSourceVertices=false;this.isClosed=false;this.srcPts=[];if(arguments[0]instanceof jsts.geom.LineString){this.initFromLine.apply(this,arguments);}else{this.initFromPoints.apply(this,arguments);}};LineStringSnapper.prototype.initFromLine=function(srcLine,snapTolerance){this.initFromPoints(srcLine.getCoordinates(),snapTolerance);};LineStringSnapper.prototype.initFromPoints=function(srcPts,snapTolerance){this.srcPts=srcPts;this.isClosed=this.calcIsClosed(srcPts);this.snapTolerance=snapTolerance;};LineStringSnapper.prototype.setAllowSnappingToSourceVertices=function(allowSnappingToSourceVertices){this.allowSnappingToSourceVertices=allowSnappingToSourceVertices;};LineStringSnapper.prototype.calcIsClosed=function(pts){if(pts.length<=1){return false;}
return pts[0].equals(pts[pts.length-1]);};LineStringSnapper.prototype.snapTo=function(snapPts){var coordList=new jsts.geom.CoordinateList(this.srcPts);this.snapVertices(coordList,snapPts);this.snapSegments(coordList,snapPts);return coordList.toCoordinateArray();};LineStringSnapper.prototype.snapVertices=function(srcCoords,snapPts){var end=this.isClosed?srcCoords.size()-1:srcCoords.size(),i=0,srcPt,snapVert;for(i;i<end;i++){srcPt=srcCoords.get(i);snapVert=this.findSnapForVertex(srcPt,snapPts);if(snapVert!==null){srcCoords.set(i,new jsts.geom.Coordinate(snapVert));if(i===0&&this.isClosed)
srcCoords.set(srcCoords.size()-1,new jsts.geom.Coordinate(snapVert));}}};LineStringSnapper.prototype.findSnapForVertex=function(pt,snapPts){var i=0,il=snapPts.length;for(i=0;i<il;i++){if(pt.equals(snapPts[i])){return null;}
if(pt.distance(snapPts[i])<this.snapTolerance){return snapPts[i];}}
return null;};LineStringSnapper.prototype.snapSegments=function(srcCoords,snapPts){if(snapPts.length===0){return;}
var distinctPtCount=snapPts.length,i,snapPt,index;if(snapPts.length>1&&snapPts[0].equals2D(snapPts[snapPts.length-1])){distinctPtCount=snapPts.length-1;}
i=0;for(i;i<distinctPtCount;i++){snapPt=snapPts[i];index=this.findSegmentIndexToSnap(snapPt,srcCoords);if(index>=0){srcCoords.add(index+1,new jsts.geom.Coordinate(snapPt),false);}}};LineStringSnapper.prototype.findSegmentIndexToSnap=function(snapPt,srcCoords){var minDist=Number.MAX_VALUE,snapIndex=-1,i=0,dist;for(i;i<srcCoords.size()-1;i++){this.seg.p0=srcCoords.get(i);this.seg.p1=srcCoords.get(i+1);if(this.seg.p0.equals(snapPt)||this.seg.p1.equals(snapPt)){if(this.allowSnappingToSourceVertices){continue;}else{return-1;}}
dist=this.seg.distance(snapPt);if(dist<this.snapTolerance&&dist<minDist){minDist=dist;snapIndex=i;}}
return snapIndex;};jsts.operation.overlay.snap.LineStringSnapper=LineStringSnapper;})();jsts.operation.buffer.BufferOp=function(g,bufParams){this.argGeom=g;this.bufParams=bufParams?bufParams:new jsts.operation.buffer.BufferParameters();};jsts.operation.buffer.BufferOp.MAX_PRECISION_DIGITS=12;jsts.operation.buffer.BufferOp.precisionScaleFactor=function(g,distance,maxPrecisionDigits){var env=g.getEnvelopeInternal();var envSize=Math.max(env.getHeight(),env.getWidth());var expandByDistance=distance>0.0?distance:0.0;var bufEnvSize=envSize+2*expandByDistance;var bufEnvLog10=(Math.log(bufEnvSize)/Math.log(10)+1.0);var minUnitLog10=bufEnvLog10-maxPrecisionDigits;var scaleFactor=Math.pow(10.0,-minUnitLog10);return scaleFactor;};jsts.operation.buffer.BufferOp.bufferOp=function(g,distance){if(arguments.length>2){return jsts.operation.buffer.BufferOp.bufferOp2.apply(this,arguments);}
var gBuf=new jsts.operation.buffer.BufferOp(g);var geomBuf=gBuf.getResultGeometry(distance);return geomBuf;};jsts.operation.buffer.BufferOp.bufferOp2=function(g,distance,params){if(arguments.length>3){return jsts.operation.buffer.BufferOp.bufferOp3.apply(this,arguments);}
var bufOp=new jsts.operation.buffer.BufferOp(g,params);var geomBuf=bufOp.getResultGeometry(distance);return geomBuf;};jsts.operation.buffer.BufferOp.bufferOp3=function(g,distance,quadrantSegments){if(arguments.length>4){return jsts.operation.buffer.BufferOp.bufferOp4.apply(this,arguments);}
var bufOp=new jsts.operation.buffer.BufferOp(g);bufOp.setQuadrantSegments(quadrantSegments);var geomBuf=bufOp.getResultGeometry(distance);return geomBuf;};jsts.operation.buffer.BufferOp.bufferOp4=function(g,distance,quadrantSegments,endCapStyle){var bufOp=new jsts.operation.buffer.BufferOp(g);bufOp.setQuadrantSegments(quadrantSegments);bufOp.setEndCapStyle(endCapStyle);var geomBuf=bufOp.getResultGeometry(distance);return geomBuf;};jsts.operation.buffer.BufferOp.prototype.argGeom=null;jsts.operation.buffer.BufferOp.prototype.distance=null;jsts.operation.buffer.BufferOp.prototype.bufParams=null;jsts.operation.buffer.BufferOp.prototype.resultGeometry=null;jsts.operation.buffer.BufferOp.prototype.setEndCapStyle=function(endCapStyle){this.bufParams.setEndCapStyle(endCapStyle);};jsts.operation.buffer.BufferOp.prototype.setQuadrantSegments=function(quadrantSegments){this.bufParams.setQuadrantSegments(quadrantSegments);};jsts.operation.buffer.BufferOp.prototype.getResultGeometry=function(dist){this.distance=dist;this.computeGeometry();return this.resultGeometry;};jsts.operation.buffer.BufferOp.prototype.computeGeometry=function(){this.bufferOriginalPrecision();if(this.resultGeometry!==null){return;}
var argPM=this.argGeom.getPrecisionModel();if(argPM.getType()===jsts.geom.PrecisionModel.FIXED){this.bufferFixedPrecision(argPM);}else{this.bufferReducedPrecision();}};jsts.operation.buffer.BufferOp.prototype.bufferReducedPrecision=function(){var precDigits;var saveException=null;for(precDigits=jsts.operation.buffer.BufferOp.MAX_PRECISION_DIGITS;precDigits>=0;precDigits--){try{this.bufferReducedPrecision2(precDigits);}catch(ex){saveException=ex;}
if(this.resultGeometry!==null){return;}}
throw saveException;};jsts.operation.buffer.BufferOp.prototype.bufferOriginalPrecision=function(){try{var bufBuilder=new jsts.operation.buffer.BufferBuilder(this.bufParams);this.resultGeometry=bufBuilder.buffer(this.argGeom,this.distance);}catch(e){}};jsts.operation.buffer.BufferOp.prototype.bufferReducedPrecision2=function(precisionDigits){var sizeBasedScaleFactor=jsts.operation.buffer.BufferOp.precisionScaleFactor(this.argGeom,this.distance,precisionDigits);var fixedPM=new jsts.geom.PrecisionModel(sizeBasedScaleFactor);this.bufferFixedPrecision(fixedPM);};jsts.operation.buffer.BufferOp.prototype.bufferFixedPrecision=function(fixedPM){var noder=new jsts.noding.ScaledNoder(new jsts.noding.snapround.MCIndexSnapRounder(new jsts.geom.PrecisionModel(1.0)),fixedPM.getScale());var bufBuilder=new jsts.operation.buffer.BufferBuilder(this.bufParams);bufBuilder.setWorkingPrecisionModel(fixedPM);bufBuilder.setNoder(noder);this.resultGeometry=bufBuilder.buffer(this.argGeom,this.distance);};jsts.geomgraph.index.EdgeSetIntersector=function(){};jsts.geomgraph.index.EdgeSetIntersector.prototype.computeIntersections=function(edges,si,testAllSegments){throw new jsts.error.AbstractMethodInvocationError();};jsts.geomgraph.index.EdgeSetIntersector.prototype.computeIntersections2=function(edges0,edges1,si){throw new jsts.error.AbstractMethodInvocationError();};jsts.geomgraph.index.SimpleMCSweepLineIntersector=function(){throw new jsts.error.NotImplementedError();};jsts.geomgraph.index.SimpleMCSweepLineIntersector.prototype=new jsts.geomgraph.index.EdgeSetIntersector();jsts.algorithm.locate.SimplePointInAreaLocator=function(geom){this.geom=geom;};jsts.algorithm.locate.SimplePointInAreaLocator.locate=function(p,geom){if(geom.isEmpty())
return jsts.geom.Location.EXTERIOR;if(jsts.algorithm.locate.SimplePointInAreaLocator.containsPoint(p,geom))
return jsts.geom.Location.INTERIOR;return jsts.geom.Location.EXTERIOR;};jsts.algorithm.locate.SimplePointInAreaLocator.containsPoint=function(p,geom){if(geom instanceof jsts.geom.Polygon){return jsts.algorithm.locate.SimplePointInAreaLocator.containsPointInPolygon(p,geom);}else if(geom instanceof jsts.geom.GeometryCollection||geom instanceof jsts.geom.MultiPoint||geom instanceof jsts.geom.MultiLineString||geom instanceof jsts.geom.MultiPolygon){for(var i=0;i<geom.geometries.length;i++){var g2=geom.geometries[i];if(g2!==geom)
if(jsts.algorithm.locate.SimplePointInAreaLocator.containsPoint(p,g2))
return true;}}
return false;};jsts.algorithm.locate.SimplePointInAreaLocator.containsPointInPolygon=function(p,poly){if(poly.isEmpty())
return false;var shell=poly.getExteriorRing();if(!jsts.algorithm.locate.SimplePointInAreaLocator.isPointInRing(p,shell))
return false;for(var i=0;i<poly.getNumInteriorRing();i++){var hole=poly.getInteriorRingN(i);if(jsts.algorithm.locate.SimplePointInAreaLocator.isPointInRing(p,hole))
return false;}
return true;};jsts.algorithm.locate.SimplePointInAreaLocator.isPointInRing=function(p,ring){if(!ring.getEnvelopeInternal().intersects(p))
return false;return jsts.algorithm.CGAlgorithms.isPointInRing(p,ring.getCoordinates());};jsts.algorithm.locate.SimplePointInAreaLocator.prototype.geom=null;jsts.algorithm.locate.SimplePointInAreaLocator.prototype.locate=function(p){return jsts.algorithm.locate.SimplePointInAreaLocator.locate(p,geom);};(function(){var Location=jsts.geom.Location;var Position=jsts.geomgraph.Position;var EdgeEndStar=jsts.geomgraph.EdgeEndStar;var Assert=jsts.util.Assert;jsts.geomgraph.DirectedEdgeStar=function(){jsts.geomgraph.EdgeEndStar.call(this);};jsts.geomgraph.DirectedEdgeStar.prototype=new EdgeEndStar();jsts.geomgraph.DirectedEdgeStar.constructor=jsts.geomgraph.DirectedEdgeStar;jsts.geomgraph.DirectedEdgeStar.prototype.resultAreaEdgeList=null;jsts.geomgraph.DirectedEdgeStar.prototype.label=null;jsts.geomgraph.DirectedEdgeStar.prototype.insert=function(ee){var de=ee;this.insertEdgeEnd(de,de);};jsts.geomgraph.DirectedEdgeStar.prototype.getLabel=function(){return this.label;};jsts.geomgraph.DirectedEdgeStar.prototype.getOutgoingDegree=function(){var degree=0;for(var it=this.iterator();it.hasNext();){var de=it.next();if(de.isInResult())
degree++;}
return degree;};jsts.geomgraph.DirectedEdgeStar.prototype.getOutgoingDegree=function(er){var degree=0;for(var it=this.iterator();it.hasNext();){var de=it.next();if(de.getEdgeRing()===er)
degree++;}
return degree;};jsts.geomgraph.DirectedEdgeStar.prototype.getRightmostEdge=function(){var edges=this.getEdges();var size=edges.size();if(size<1)
return null;var de0=edges.get(0);if(size==1)
return de0;var deLast=edges.get(size-1);var quad0=de0.getQuadrant();var quad1=deLast.getQuadrant();if(jsts.geomgraph.Quadrant.isNorthern(quad0)&&jsts.geomgraph.Quadrant.isNorthern(quad1))
return de0;else if(!jsts.geomgraph.Quadrant.isNorthern(quad0)&&!jsts.geomgraph.Quadrant.isNorthern(quad1))
return deLast;else{var nonHorizontalEdge=null;if(de0.getDy()!=0)
return de0;else if(deLast.getDy()!=0)
return deLast;}
Assert.shouldNeverReachHere('found two horizontal edges incident on node');return null;};jsts.geomgraph.DirectedEdgeStar.prototype.computeLabelling=function(geom){EdgeEndStar.prototype.computeLabelling.call(this,geom);this.label=new jsts.geomgraph.Label(Location.NONE);for(var it=this.iterator();it.hasNext();){var ee=it.next();var e=ee.getEdge();var eLabel=e.getLabel();for(var i=0;i<2;i++){var eLoc=eLabel.getLocation(i);if(eLoc===Location.INTERIOR||eLoc===Location.BOUNDARY)
this.label.setLocation(i,Location.INTERIOR);}}};jsts.geomgraph.DirectedEdgeStar.prototype.mergeSymLabels=function(){for(var it=this.iterator();it.hasNext();){var de=it.next();var label=de.getLabel();label.merge(de.getSym().getLabel());}};jsts.geomgraph.DirectedEdgeStar.prototype.updateLabelling=function(nodeLabel){for(var it=this.iterator();it.hasNext();){var de=it.next();var label=de.getLabel();label.setAllLocationsIfNull(0,nodeLabel.getLocation(0));label.setAllLocationsIfNull(1,nodeLabel.getLocation(1));}};jsts.geomgraph.DirectedEdgeStar.prototype.getResultAreaEdges=function(){if(this.resultAreaEdgeList!==null)
return this.resultAreaEdgeList;this.resultAreaEdgeList=new javascript.util.ArrayList();for(var it=this.iterator();it.hasNext();){var de=it.next();if(de.isInResult()||de.getSym().isInResult())
this.resultAreaEdgeList.add(de);}
return this.resultAreaEdgeList;};jsts.geomgraph.DirectedEdgeStar.prototype.SCANNING_FOR_INCOMING=1;jsts.geomgraph.DirectedEdgeStar.prototype.LINKING_TO_OUTGOING=2;jsts.geomgraph.DirectedEdgeStar.prototype.linkResultDirectedEdges=function(){this.getResultAreaEdges();var firstOut=null;var incoming=null;var state=this.SCANNING_FOR_INCOMING;for(var i=0;i<this.resultAreaEdgeList.size();i++){var nextOut=this.resultAreaEdgeList.get(i);var nextIn=nextOut.getSym();if(!nextOut.getLabel().isArea())
continue;if(firstOut===null&&nextOut.isInResult())
firstOut=nextOut;switch(state){case this.SCANNING_FOR_INCOMING:if(!nextIn.isInResult())
continue;incoming=nextIn;state=this.LINKING_TO_OUTGOING;break;case this.LINKING_TO_OUTGOING:if(!nextOut.isInResult())
continue;incoming.setNext(nextOut);state=this.SCANNING_FOR_INCOMING;break;}}
if(state===this.LINKING_TO_OUTGOING){if(firstOut===null)
throw new jsts.error.TopologyError('no outgoing dirEdge found',this.getCoordinate());Assert.isTrue(firstOut.isInResult(),'unable to link last incoming dirEdge');incoming.setNext(firstOut);}};jsts.geomgraph.DirectedEdgeStar.prototype.linkMinimalDirectedEdges=function(er){var firstOut=null;var incoming=null;var state=this.SCANNING_FOR_INCOMING;for(var i=this.resultAreaEdgeList.size()-1;i>=0;i--){var nextOut=this.resultAreaEdgeList.get(i);var nextIn=nextOut.getSym();if(firstOut===null&&nextOut.getEdgeRing()===er)
firstOut=nextOut;switch(state){case this.SCANNING_FOR_INCOMING:if(nextIn.getEdgeRing()!=er)
continue;incoming=nextIn;state=this.LINKING_TO_OUTGOING;break;case this.LINKING_TO_OUTGOING:if(nextOut.getEdgeRing()!==er)
continue;incoming.setNextMin(nextOut);state=this.SCANNING_FOR_INCOMING;break;}}
if(state===this.LINKING_TO_OUTGOING){Assert.isTrue(firstOut!==null,'found null for first outgoing dirEdge');Assert.isTrue(firstOut.getEdgeRing()===er,'unable to link last incoming dirEdge');incoming.setNextMin(firstOut);}};jsts.geomgraph.DirectedEdgeStar.prototype.linkAllDirectedEdges=function(){this.getEdges();var prevOut=null;var firstIn=null;for(var i=this.edgeList.size()-1;i>=0;i--){var nextOut=this.edgeList.get(i);var nextIn=nextOut.getSym();if(firstIn===null)
firstIn=nextIn;if(prevOut!==null)
nextIn.setNext(prevOut);prevOut=nextOut;}
firstIn.setNext(prevOut);};jsts.geomgraph.DirectedEdgeStar.prototype.findCoveredLineEdges=function(){var startLoc=Location.NONE;for(var it=this.iterator();it.hasNext();){var nextOut=it.next();var nextIn=nextOut.getSym();if(!nextOut.isLineEdge()){if(nextOut.isInResult()){startLoc=Location.INTERIOR;break;}
if(nextIn.isInResult()){startLoc=Location.EXTERIOR;break;}}}
if(startLoc===Location.NONE)
return;var currLoc=startLoc;for(var it=this.iterator();it.hasNext();){var nextOut=it.next();var nextIn=nextOut.getSym();if(nextOut.isLineEdge()){nextOut.getEdge().setCovered(currLoc===Location.INTERIOR);}else{if(nextOut.isInResult())
currLoc=Location.EXTERIOR;if(nextIn.isInResult())
currLoc=Location.INTERIOR;}}};jsts.geomgraph.DirectedEdgeStar.prototype.computeDepths=function(de){if(arguments.length===2){this.computeDepths2.apply(this,arguments);return;}
var edgeIndex=this.findIndex(de);var label=de.getLabel();var startDepth=de.getDepth(Position.LEFT);var targetLastDepth=de.getDepth(Position.RIGHT);var nextDepth=this.computeDepths2(edgeIndex+1,this.edgeList.size(),startDepth);var lastDepth=this.computeDepths2(0,edgeIndex,nextDepth);if(lastDepth!=targetLastDepth)
throw new jsts.error.TopologyError('depth mismatch at '+
de.getCoordinate());};jsts.geomgraph.DirectedEdgeStar.prototype.computeDepths2=function(startIndex,endIndex,startDepth){var currDepth=startDepth;for(var i=startIndex;i<endIndex;i++){var nextDe=this.edgeList.get(i);var label=nextDe.getLabel();nextDe.setEdgeDepths(Position.RIGHT,currDepth);currDepth=nextDe.getDepth(Position.LEFT);}
return currDepth;};})();jsts.algorithm.CentroidLine=function(){this.centSum=new jsts.geom.Coordinate();};jsts.algorithm.CentroidLine.prototype.centSum=null;jsts.algorithm.CentroidLine.prototype.totalLength=0.0;jsts.algorithm.CentroidLine.prototype.add=function(geom){if(geom instanceof Array){this.add2.apply(this,arguments);return;}
if(geom instanceof jsts.geom.LineString){this.add(geom.getCoordinates());}else if(geom instanceof jsts.geom.Polygon){var poly=geom;this.add(poly.getExteriorRing().getCoordinates());for(var i=0;i<poly.getNumInteriorRing();i++){this.add(poly.getInteriorRingN(i).getCoordinates());}}else if(geom instanceof jsts.geom.GeometryCollection||geom instanceof jsts.geom.MultiPoint||geom instanceof jsts.geom.MultiLineString||geom instanceof jsts.geom.MultiPolygon){var gc=geom;for(var i=0;i<gc.getNumGeometries();i++){this.add(gc.getGeometryN(i));}}};jsts.algorithm.CentroidLine.prototype.getCentroid=function(){var cent=new jsts.geom.Coordinate();cent.x=this.centSum.x/this.totalLength;cent.y=this.centSum.y/this.totalLength;return cent;};jsts.algorithm.CentroidLine.prototype.add2=function(pts){for(var i=0;i<pts.length-1;i++){var segmentLen=pts[i].distance(pts[i+1]);this.totalLength+=segmentLen;var midx=(pts[i].x+pts[i+1].x)/2;this.centSum.x+=segmentLen*midx;var midy=(pts[i].y+pts[i+1].y)/2;this.centSum.y+=segmentLen*midy;}};jsts.algorithm.PointLocator=function(boundaryRule){this.boundaryRule=boundaryRule?boundaryRule:jsts.algorithm.BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE;};jsts.algorithm.PointLocator.prototype.boundaryRule=null;jsts.algorithm.PointLocator.prototype.isIn=null;jsts.algorithm.PointLocator.prototype.numBoundaries=null;jsts.algorithm.PointLocator.prototype.intersects=function(p,geom){return this.locate(p,geom)!==jsts.geom.Location.EXTERIOR;};jsts.algorithm.PointLocator.prototype.locate=function(p,geom){if(geom.isEmpty())
return jsts.geom.Location.EXTERIOR;if(geom instanceof jsts.geom.Point){return this.locate2(p,geom);}else if(geom instanceof jsts.geom.LineString){return this.locate3(p,geom);}else if(geom instanceof jsts.geom.Polygon){return this.locate4(p,geom);}
this.isIn=false;this.numBoundaries=0;this.computeLocation(p,geom);if(this.boundaryRule.isInBoundary(this.numBoundaries))
return jsts.geom.Location.BOUNDARY;if(this.numBoundaries>0||this.isIn)
return jsts.geom.Location.INTERIOR;return jsts.geom.Location.EXTERIOR;};jsts.algorithm.PointLocator.prototype.computeLocation=function(p,geom){if(geom instanceof jsts.geom.Point||geom instanceof jsts.geom.LineString||geom instanceof jsts.geom.Polygon){this.updateLocationInfo(this.locate(p,geom));}else if(geom instanceof jsts.geom.MultiLineString){var ml=geom;for(var i=0;i<ml.getNumGeometries();i++){var l=ml.getGeometryN(i);this.updateLocationInfo(this.locate(p,l));}}else if(geom instanceof jsts.geom.MultiPolygon){var mpoly=geom;for(var i=0;i<mpoly.getNumGeometries();i++){var poly=mpoly.getGeometryN(i);this.updateLocationInfo(this.locate(p,poly));}}else if(geom instanceof jsts.geom.MultiPoint||geom instanceof jsts.geom.GeometryCollection){for(var i=0;i<geom.getNumGeometries();i++){var part=geom.getGeometryN(i);if(part!==geom){this.computeLocation(p,part);}}}};jsts.algorithm.PointLocator.prototype.updateLocationInfo=function(loc){if(loc===jsts.geom.Location.INTERIOR)
this.isIn=true;if(loc===jsts.geom.Location.BOUNDARY)
this.numBoundaries++;};jsts.algorithm.PointLocator.prototype.locate2=function(p,pt){var ptCoord=pt.getCoordinate();if(ptCoord.equals2D(p))
return jsts.geom.Location.INTERIOR;return jsts.geom.Location.EXTERIOR;};jsts.algorithm.PointLocator.prototype.locate3=function(p,l){if(!l.getEnvelopeInternal().intersects(p))
return jsts.geom.Location.EXTERIOR;var pt=l.getCoordinates();if(!l.isClosed()){if(p.equals(pt[0])||p.equals(pt[pt.length-1])){return jsts.geom.Location.BOUNDARY;}}
if(jsts.algorithm.CGAlgorithms.isOnLine(p,pt))
return jsts.geom.Location.INTERIOR;return jsts.geom.Location.EXTERIOR;};jsts.algorithm.PointLocator.prototype.locateInPolygonRing=function(p,ring){if(!ring.getEnvelopeInternal().intersects(p))
return jsts.geom.Location.EXTERIOR;return jsts.algorithm.CGAlgorithms.locatePointInRing(p,ring.getCoordinates());};jsts.algorithm.PointLocator.prototype.locate4=function(p,poly){if(poly.isEmpty())
return jsts.geom.Location.EXTERIOR;var shell=poly.getExteriorRing();var shellLoc=this.locateInPolygonRing(p,shell);if(shellLoc===jsts.geom.Location.EXTERIOR)
return jsts.geom.Location.EXTERIOR;if(shellLoc===jsts.geom.Location.BOUNDARY)
return jsts.geom.Location.BOUNDARY;for(var i=0;i<poly.getNumInteriorRing();i++){var hole=poly.getInteriorRingN(i);var holeLoc=this.locateInPolygonRing(p,hole);if(holeLoc===jsts.geom.Location.INTERIOR)
return jsts.geom.Location.EXTERIOR;if(holeLoc===jsts.geom.Location.BOUNDARY)
return jsts.geom.Location.BOUNDARY;}
return jsts.geom.Location.INTERIOR;};(function(){var ArrayList=javascript.util.ArrayList;var TreeMap=javascript.util.TreeMap;jsts.geomgraph.EdgeList=function(){this.edges=new ArrayList();this.ocaMap=new TreeMap();};jsts.geomgraph.EdgeList.prototype.edges=null;jsts.geomgraph.EdgeList.prototype.ocaMap=null;jsts.geomgraph.EdgeList.prototype.add=function(e){this.edges.add(e);var oca=new jsts.noding.OrientedCoordinateArray(e.getCoordinates());this.ocaMap.put(oca,e);};jsts.geomgraph.EdgeList.prototype.addAll=function(edgeColl){for(var i=edgeColl.iterator();i.hasNext();){this.add(i.next());}};jsts.geomgraph.EdgeList.prototype.getEdges=function(){return this.edges;};jsts.geomgraph.EdgeList.prototype.findEqualEdge=function(e){var oca=new jsts.noding.OrientedCoordinateArray(e.getCoordinates());var matchEdge=this.ocaMap.get(oca);return matchEdge;};jsts.geomgraph.EdgeList.prototype.getEdges=function(){return this.edges;};jsts.geomgraph.EdgeList.prototype.iterator=function(){return this.edges.iterator();};jsts.geomgraph.EdgeList.prototype.get=function(i){return this.edges.get(i);};jsts.geomgraph.EdgeList.prototype.findEdgeIndex=function(e){for(var i=0;i<this.edges.size();i++){if(this.edges.get(i).equals(e))
return i;}
return-1;};})();(function(){var Location=jsts.geom.Location;var ArrayList=javascript.util.ArrayList;var TreeMap=javascript.util.TreeMap;jsts.geomgraph.NodeMap=function(nodeFactory){this.nodeMap=new TreeMap();this.nodeFact=nodeFactory;};jsts.geomgraph.NodeMap.prototype.nodeMap=null;jsts.geomgraph.NodeMap.prototype.nodeFact=null;jsts.geomgraph.NodeMap.prototype.addNode=function(arg){var node,coord;if(arg instanceof jsts.geom.Coordinate){coord=arg;node=this.nodeMap.get(coord);if(node===null){node=this.nodeFact.createNode(coord);this.nodeMap.put(coord,node);}
return node;}else if(arg instanceof jsts.geomgraph.Node){var n=arg;coord=n.getCoordinate();node=this.nodeMap.get(coord);if(node===null){this.nodeMap.put(coord,n);return n;}
node.mergeLabel(n);return node;}};jsts.geomgraph.NodeMap.prototype.add=function(e){var p=e.getCoordinate();var n=this.addNode(p);n.add(e);};jsts.geomgraph.NodeMap.prototype.find=function(coord){return this.nodeMap.get(coord);};jsts.geomgraph.NodeMap.prototype.values=function(){return this.nodeMap.values();};jsts.geomgraph.NodeMap.prototype.iterator=function(){return this.values().iterator();};jsts.geomgraph.NodeMap.prototype.getBoundaryNodes=function(geomIndex){var bdyNodes=new ArrayList();for(var i=this.iterator();i.hasNext();){var node=i.next();if(node.getLabel().getLocation(geomIndex)===Location.BOUNDARY){bdyNodes.add(node);}}
return bdyNodes;};})();(function(){var ArrayList=javascript.util.ArrayList;jsts.geomgraph.PlanarGraph=function(nodeFactory){this.edges=new ArrayList();this.edgeEndList=new ArrayList();this.nodes=new jsts.geomgraph.NodeMap(nodeFactory||new jsts.geomgraph.NodeFactory());};jsts.geomgraph.PlanarGraph.prototype.edges=null;jsts.geomgraph.PlanarGraph.prototype.nodes=null;jsts.geomgraph.PlanarGraph.prototype.edgeEndList=null;jsts.geomgraph.PlanarGraph.linkResultDirectedEdges=function(nodes){for(var nodeit=nodes.iterator();nodeit.hasNext();){var node=nodeit.next();node.getEdges().linkResultDirectedEdges();}};jsts.geomgraph.PlanarGraph.prototype.getEdgeIterator=function(){return this.edges.iterator();};jsts.geomgraph.PlanarGraph.prototype.getEdgeEnds=function(){return this.edgeEndList;};jsts.geomgraph.PlanarGraph.prototype.isBoundaryNode=function(geomIndex,coord){var node=this.nodes.find(coord);if(node===null)
return false;var label=node.getLabel();if(label!==null&&label.getLocation(geomIndex)===jsts.geom.Location.BOUNDARY)
return true;return false;};jsts.geomgraph.PlanarGraph.prototype.insertEdge=function(e){this.edges.add(e);};jsts.geomgraph.PlanarGraph.prototype.add=function(e){this.nodes.add(e);this.edgeEndList.add(e);};jsts.geomgraph.PlanarGraph.prototype.getNodeIterator=function(){return this.nodes.iterator();};jsts.geomgraph.PlanarGraph.prototype.getNodes=function(){return this.nodes.values();};jsts.geomgraph.PlanarGraph.prototype.addNode=function(node){return this.nodes.addNode(node);};jsts.geomgraph.PlanarGraph.prototype.addEdges=function(edgesToAdd){for(var it=edgesToAdd.iterator();it.hasNext();){var e=it.next();this.edges.add(e);var de1=new jsts.geomgraph.DirectedEdge(e,true);var de2=new jsts.geomgraph.DirectedEdge(e,false);de1.setSym(de2);de2.setSym(de1);this.add(de1);this.add(de2);}};jsts.geomgraph.PlanarGraph.prototype.linkResultDirectedEdges=function(){for(var nodeit=this.nodes.iterator();nodeit.hasNext();){var node=nodeit.next();node.getEdges().linkResultDirectedEdges();}};jsts.geomgraph.PlanarGraph.prototype.findEdgeInSameDirection=function(p0,p1){var i=0,il=this.edges.size(),e,eCoord;for(i;i<il;i++){e=this.edges.get(i);eCoord=e.getCoordinates();if(this.matchInSameDirection(p0,p1,eCoord[0],eCoord[1])){return e;}
if(this.matchInSameDirection(p0,p1,eCoord[eCoord.length-1],eCoord[eCoord.length-2])){return e;}}
return null;};jsts.geomgraph.PlanarGraph.prototype.matchInSameDirection=function(p0,p1,ep0,ep1){if(!p0.equals(ep0)){return false;}
if(jsts.algorithm.CGAlgorithms.computeOrientation(p0,p1,ep1)===jsts.algorithm.CGAlgorithms.COLLINEAR&&jsts.geomgraph.Quadrant.quadrant(p0,p1)===jsts.geomgraph.Quadrant.quadrant(ep0,ep1)){return true;}
return false;};jsts.geomgraph.PlanarGraph.prototype.findEdgeEnd=function(e){for(var i=this.getEdgeEnds().iterator();i.hasNext();){var ee=i.next();if(ee.getEdge()===e){return ee;}}
return null;};})();jsts.algorithm.LineIntersector=function(){this.inputLines=[[],[]];this.intPt=[null,null];this.pa=this.intPt[0];this.pb=this.intPt[1];this.result=jsts.algorithm.LineIntersector.NO_INTERSECTION;};jsts.algorithm.LineIntersector.NO_INTERSECTION=0;jsts.algorithm.LineIntersector.POINT_INTERSECTION=1;jsts.algorithm.LineIntersector.COLLINEAR_INTERSECTION=2;jsts.algorithm.LineIntersector.prototype.setPrecisionModel=function(precisionModel){this.precisionModel=precisionModel;};jsts.algorithm.LineIntersector.prototype.getEndpoint=function(segmentIndex,ptIndex){return this.inputLines[segmentIndex][ptIndex];};jsts.algorithm.LineIntersector.computeEdgeDistance=function(p,p0,p1){var dx=Math.abs(p1.x-p0.x);var dy=Math.abs(p1.y-p0.y);var dist=-1.0;if(p.equals(p0)){dist=0.0;}else if(p.equals(p1)){if(dx>dy){dist=dx;}else{dist=dy;}}else{var pdx=Math.abs(p.x-p0.x);var pdy=Math.abs(p.y-p0.y);if(dx>dy){dist=pdx;}else{dist=pdy;}
if(dist===0.0&&!p.equals(p0)){dist=Math.max(pdx,pdy);}}
if(dist===0.0&&!p.equals(p0)){throw new jsts.error.IllegalArgumentError('Bad distance calculation');}
return dist;};jsts.algorithm.LineIntersector.nonRobustComputeEdgeDistance=function(p,p1,p2){var dx=p.x-p1.x;var dy=p.y-p1.y;var dist=Math.sqrt(dx*dx+dy*dy);if(!(dist===0.0&&!p.equals(p1))){throw new jsts.error.IllegalArgumentError('Invalid distance calculation');}
return dist;};jsts.algorithm.LineIntersector.prototype.result=null;jsts.algorithm.LineIntersector.prototype.inputLines=null;jsts.algorithm.LineIntersector.prototype.intPt=null;jsts.algorithm.LineIntersector.prototype.intLineIndex=null;jsts.algorithm.LineIntersector.prototype._isProper=null;jsts.algorithm.LineIntersector.prototype.pa=null;jsts.algorithm.LineIntersector.prototype.pb=null;jsts.algorithm.LineIntersector.prototype.precisionModel=null;jsts.algorithm.LineIntersector.prototype.computeIntersection=function(p,p1,p2){throw new jsts.error.AbstractMethodInvocationError();};jsts.algorithm.LineIntersector.prototype.isCollinear=function(){return this.result===jsts.algorithm.LineIntersector.COLLINEAR_INTERSECTION;};jsts.algorithm.LineIntersector.prototype.computeIntersection=function(p1,p2,p3,p4){this.inputLines[0][0]=p1;this.inputLines[0][1]=p2;this.inputLines[1][0]=p3;this.inputLines[1][1]=p4;this.result=this.computeIntersect(p1,p2,p3,p4);};jsts.algorithm.LineIntersector.prototype.computeIntersect=function(p1,p2,q1,q2){throw new jsts.error.AbstractMethodInvocationError();};jsts.algorithm.LineIntersector.prototype.isEndPoint=function(){return this.hasIntersection()&&!this._isProper;};jsts.algorithm.LineIntersector.prototype.hasIntersection=function(){return this.result!==jsts.algorithm.LineIntersector.NO_INTERSECTION;};jsts.algorithm.LineIntersector.prototype.getIntersectionNum=function(){return this.result;};jsts.algorithm.LineIntersector.prototype.getIntersection=function(intIndex){return this.intPt[intIndex];};jsts.algorithm.LineIntersector.prototype.computeIntLineIndex=function(){if(this.intLineIndex===null){this.intLineIndex=[[],[]];this.computeIntLineIndex(0);this.computeIntLineIndex(1);}};jsts.algorithm.LineIntersector.prototype.isIntersection=function(pt){var i;for(i=0;i<this.result;i++){if(this.intPt[i].equals2D(pt)){return true;}}
return false;};jsts.algorithm.LineIntersector.prototype.isInteriorIntersection=function(){if(arguments.length===1){return this.isInteriorIntersection2.apply(this,arguments);}
if(this.isInteriorIntersection(0)){return true;}
if(this.isInteriorIntersection(1)){return true;}
return false;};jsts.algorithm.LineIntersector.prototype.isInteriorIntersection2=function(inputLineIndex){var i;for(i=0;i<this.result;i++){if(!(this.intPt[i].equals2D(this.inputLines[inputLineIndex][0])||this.intPt[i].equals2D(this.inputLines[inputLineIndex][1]))){return true;}}
return false;};jsts.algorithm.LineIntersector.prototype.isProper=function(){return this.hasIntersection()&&this._isProper;};jsts.algorithm.LineIntersector.prototype.getIntersectionAlongSegment=function(segmentIndex,intIndex){this.computeIntLineIndex();return this.intPt[intLineIndex[segmentIndex][intIndex]];};jsts.algorithm.LineIntersector.prototype.getIndexAlongSegment=function(segmentIndex,intIndex){this.computeIntLineIndex();return this.intLineIndex[segmentIndex][intIndex];};jsts.algorithm.LineIntersector.prototype.computeIntLineIndex=function(segmentIndex){var dist0=this.getEdgeDistance(segmentIndex,0);var dist1=this.getEdgeDistance(segmentIndex,1);if(dist0>dist1){this.intLineIndex[segmentIndex][0]=0;this.intLineIndex[segmentIndex][1]=1;}else{this.intLineIndex[segmentIndex][0]=1;this.intLineIndex[segmentIndex][1]=0;}};jsts.algorithm.LineIntersector.prototype.getEdgeDistance=function(segmentIndex,intIndex){var dist=jsts.algorithm.LineIntersector.computeEdgeDistance(this.intPt[intIndex],this.inputLines[segmentIndex][0],this.inputLines[segmentIndex][1]);return dist;};jsts.algorithm.RobustLineIntersector=function(){jsts.algorithm.RobustLineIntersector.prototype.constructor.call(this);};jsts.algorithm.RobustLineIntersector.prototype=new jsts.algorithm.LineIntersector();jsts.algorithm.RobustLineIntersector.prototype.computeIntersection=function(p,p1,p2){if(arguments.length===4){jsts.algorithm.LineIntersector.prototype.computeIntersection.apply(this,arguments);return;}
this._isProper=false;if(jsts.geom.Envelope.intersects(p1,p2,p)){if((jsts.algorithm.CGAlgorithms.orientationIndex(p1,p2,p)===0)&&(jsts.algorithm.CGAlgorithms.orientationIndex(p2,p1,p)===0)){this._isProper=true;if(p.equals(p1)||p.equals(p2)){this._isProper=false;}
this.result=jsts.algorithm.LineIntersector.POINT_INTERSECTION;return;}}
this.result=jsts.algorithm.LineIntersector.NO_INTERSECTION;};jsts.algorithm.RobustLineIntersector.prototype.computeIntersect=function(p1,p2,q1,q2){this._isProper=false;if(!jsts.geom.Envelope.intersects(p1,p2,q1,q2)){return jsts.algorithm.LineIntersector.NO_INTERSECTION;}
var Pq1=jsts.algorithm.CGAlgorithms.orientationIndex(p1,p2,q1);var Pq2=jsts.algorithm.CGAlgorithms.orientationIndex(p1,p2,q2);if((Pq1>0&&Pq2>0)||(Pq1<0&&Pq2<0)){return jsts.algorithm.LineIntersector.NO_INTERSECTION;}
var Qp1=jsts.algorithm.CGAlgorithms.orientationIndex(q1,q2,p1);var Qp2=jsts.algorithm.CGAlgorithms.orientationIndex(q1,q2,p2);if((Qp1>0&&Qp2>0)||(Qp1<0&&Qp2<0)){return jsts.algorithm.LineIntersector.NO_INTERSECTION;}
var collinear=Pq1===0&&Pq2===0&&Qp1===0&&Qp2===0;if(collinear){return this.computeCollinearIntersection(p1,p2,q1,q2);}
if(Pq1===0||Pq2===0||Qp1===0||Qp2===0){this._isProper=false;if(p1.equals2D(q1)||p1.equals2D(q2)){this.intPt[0]=p1;}else if(p2.equals2D(q1)||p2.equals2D(q2)){this.intPt[0]=p2;}
else if(Pq1===0){this.intPt[0]=new jsts.geom.Coordinate(q1);}else if(Pq2===0){this.intPt[0]=new jsts.geom.Coordinate(q2);}else if(Qp1===0){this.intPt[0]=new jsts.geom.Coordinate(p1);}else if(Qp2===0){this.intPt[0]=new jsts.geom.Coordinate(p2);}}else{this._isProper=true;this.intPt[0]=this.intersection(p1,p2,q1,q2);}
return jsts.algorithm.LineIntersector.POINT_INTERSECTION;};jsts.algorithm.RobustLineIntersector.prototype.computeCollinearIntersection=function(p1,p2,q1,q2){var p1q1p2=jsts.geom.Envelope.intersects(p1,p2,q1);var p1q2p2=jsts.geom.Envelope.intersects(p1,p2,q2);var q1p1q2=jsts.geom.Envelope.intersects(q1,q2,p1);var q1p2q2=jsts.geom.Envelope.intersects(q1,q2,p2);if(p1q1p2&&p1q2p2){this.intPt[0]=q1;this.intPt[1]=q2;return jsts.algorithm.LineIntersector.COLLINEAR_INTERSECTION;}
if(q1p1q2&&q1p2q2){this.intPt[0]=p1;this.intPt[1]=p2;return jsts.algorithm.LineIntersector.COLLINEAR_INTERSECTION;}
if(p1q1p2&&q1p1q2){this.intPt[0]=q1;this.intPt[1]=p1;return q1.equals(p1)&&!p1q2p2&&!q1p2q2?jsts.algorithm.LineIntersector.POINT_INTERSECTION:jsts.algorithm.LineIntersector.COLLINEAR_INTERSECTION;}
if(p1q1p2&&q1p2q2){this.intPt[0]=q1;this.intPt[1]=p2;return q1.equals(p2)&&!p1q2p2&&!q1p1q2?jsts.algorithm.LineIntersector.POINT_INTERSECTION:jsts.algorithm.LineIntersector.COLLINEAR_INTERSECTION;}
if(p1q2p2&&q1p1q2){this.intPt[0]=q2;this.intPt[1]=p1;return q2.equals(p1)&&!p1q1p2&&!q1p2q2?jsts.algorithm.LineIntersector.POINT_INTERSECTION:jsts.algorithm.LineIntersector.COLLINEAR_INTERSECTION;}
if(p1q2p2&&q1p2q2){this.intPt[0]=q2;this.intPt[1]=p2;return q2.equals(p2)&&!p1q1p2&&!q1p1q2?jsts.algorithm.LineIntersector.POINT_INTERSECTION:jsts.algorithm.LineIntersector.COLLINEAR_INTERSECTION;}
return jsts.algorithm.LineIntersector.NO_INTERSECTION;};jsts.algorithm.RobustLineIntersector.prototype.intersection=function(p1,p2,q1,q2){var intPt=this.intersectionWithNormalization(p1,p2,q1,q2);if(!this.isInSegmentEnvelopes(intPt)){intPt=jsts.algorithm.CentralEndpointIntersector.getIntersection(p1,p2,q1,q2);}
if(this.precisionModel!==null){this.precisionModel.makePrecise(intPt);}
return intPt;};jsts.algorithm.RobustLineIntersector.prototype.intersectionWithNormalization=function(p1,p2,q1,q2){var n1=new jsts.geom.Coordinate(p1);var n2=new jsts.geom.Coordinate(p2);var n3=new jsts.geom.Coordinate(q1);var n4=new jsts.geom.Coordinate(q2);var normPt=new jsts.geom.Coordinate();this.normalizeToEnvCentre(n1,n2,n3,n4,normPt);var intPt=this.safeHCoordinateIntersection(n1,n2,n3,n4);intPt.x+=normPt.x;intPt.y+=normPt.y;return intPt;};jsts.algorithm.RobustLineIntersector.prototype.safeHCoordinateIntersection=function(p1,p2,q1,q2){var intPt=null;try{intPt=jsts.algorithm.HCoordinate.intersection(p1,p2,q1,q2);}catch(e){if(e instanceof jsts.error.NotRepresentableError){intPt=jsts.algorithm.CentralEndpointIntersector.getIntersection(p1,p2,q1,q2);}else{throw e;}}
return intPt;};jsts.algorithm.RobustLineIntersector.prototype.normalizeToMinimum=function(n1,n2,n3,n4,normPt){normPt.x=this.smallestInAbsValue(n1.x,n2.x,n3.x,n4.x);normPt.y=this.smallestInAbsValue(n1.y,n2.y,n3.y,n4.y);n1.x-=normPt.x;n1.y-=normPt.y;n2.x-=normPt.x;n2.y-=normPt.y;n3.x-=normPt.x;n3.y-=normPt.y;n4.x-=normPt.x;n4.y-=normPt.y;};jsts.algorithm.RobustLineIntersector.prototype.normalizeToEnvCentre=function(n00,n01,n10,n11,normPt){var minX0=n00.x<n01.x?n00.x:n01.x;var minY0=n00.y<n01.y?n00.y:n01.y;var maxX0=n00.x>n01.x?n00.x:n01.x;var maxY0=n00.y>n01.y?n00.y:n01.y;var minX1=n10.x<n11.x?n10.x:n11.x;var minY1=n10.y<n11.y?n10.y:n11.y;var maxX1=n10.x>n11.x?n10.x:n11.x;var maxY1=n10.y>n11.y?n10.y:n11.y;var intMinX=minX0>minX1?minX0:minX1;var intMaxX=maxX0<maxX1?maxX0:maxX1;var intMinY=minY0>minY1?minY0:minY1;var intMaxY=maxY0<maxY1?maxY0:maxY1;var intMidX=(intMinX+intMaxX)/2.0;var intMidY=(intMinY+intMaxY)/2.0;normPt.x=intMidX;normPt.y=intMidY;n00.x-=normPt.x;n00.y-=normPt.y;n01.x-=normPt.x;n01.y-=normPt.y;n10.x-=normPt.x;n10.y-=normPt.y;n11.x-=normPt.x;n11.y-=normPt.y;};jsts.algorithm.RobustLineIntersector.prototype.smallestInAbsValue=function(x1,x2,x3,x4){var x=x1;var xabs=Math.abs(x);if(Math.abs(x2)<xabs){x=x2;xabs=Math.abs(x2);}
if(Math.abs(x3)<xabs){x=x3;xabs=Math.abs(x3);}
if(Math.abs(x4)<xabs){x=x4;}
return x;};jsts.algorithm.RobustLineIntersector.prototype.isInSegmentEnvelopes=function(intPt){var env0=new jsts.geom.Envelope(this.inputLines[0][0],this.inputLines[0][1]);var env1=new jsts.geom.Envelope(this.inputLines[1][0],this.inputLines[1][1]);return env0.contains(intPt)&&env1.contains(intPt);};jsts.noding.SegmentIntersector=function(){};jsts.noding.SegmentIntersector.prototype.processIntersections=jsts.abstractFunc;jsts.noding.SegmentIntersector.prototype.isDone=jsts.abstractFunc;(function(){var SegmentIntersector=jsts.noding.SegmentIntersector;var ArrayList=javascript.util.ArrayList;jsts.noding.InteriorIntersectionFinder=function(li){this.li=li;this.intersections=new ArrayList();this.interiorIntersection=null;};jsts.noding.InteriorIntersectionFinder.prototype=new SegmentIntersector();jsts.noding.InteriorIntersectionFinder.constructor=jsts.noding.InteriorIntersectionFinder;jsts.noding.InteriorIntersectionFinder.prototype.findAllIntersections=false;jsts.noding.InteriorIntersectionFinder.prototype.isCheckEndSegmentsOnly=false;jsts.noding.InteriorIntersectionFinder.prototype.li=null;jsts.noding.InteriorIntersectionFinder.prototype.interiorIntersection=null;jsts.noding.InteriorIntersectionFinder.prototype.intSegments=null;jsts.noding.InteriorIntersectionFinder.prototype.intersections=null;jsts.noding.InteriorIntersectionFinder.prototype.setFindAllIntersections=function(findAllIntersections){this.findAllIntersections=findAllIntersections;};jsts.noding.InteriorIntersectionFinder.prototype.getIntersections=function(){return intersections;};jsts.noding.InteriorIntersectionFinder.prototype.setCheckEndSegmentsOnly=function(isCheckEndSegmentsOnly){this.isCheckEndSegmentsOnly=isCheckEndSegmentsOnly;}
jsts.noding.InteriorIntersectionFinder.prototype.hasIntersection=function(){return this.interiorIntersection!=null;};jsts.noding.InteriorIntersectionFinder.prototype.getInteriorIntersection=function(){return this.interiorIntersection;};jsts.noding.InteriorIntersectionFinder.prototype.getIntersectionSegments=function(){return this.intSegments;};jsts.noding.InteriorIntersectionFinder.prototype.processIntersections=function(e0,segIndex0,e1,segIndex1){if(this.hasIntersection())
return;if(e0==e1&&segIndex0==segIndex1)
return;if(this.isCheckEndSegmentsOnly){var isEndSegPresent=this.isEndSegment(e0,segIndex0)||isEndSegment(e1,segIndex1);if(!isEndSegPresent)
return;}
var p00=e0.getCoordinates()[segIndex0];var p01=e0.getCoordinates()[segIndex0+1];var p10=e1.getCoordinates()[segIndex1];var p11=e1.getCoordinates()[segIndex1+1];this.li.computeIntersection(p00,p01,p10,p11);if(this.li.hasIntersection()){if(this.li.isInteriorIntersection()){this.intSegments=[];this.intSegments[0]=p00;this.intSegments[1]=p01;this.intSegments[2]=p10;this.intSegments[3]=p11;this.interiorIntersection=this.li.getIntersection(0);this.intersections.add(this.interiorIntersection);}}};jsts.noding.InteriorIntersectionFinder.prototype.isEndSegment=function(segStr,index){if(index==0)
return true;if(index>=segStr.size()-2)
return true;return false;};jsts.noding.InteriorIntersectionFinder.prototype.isDone=function(){if(this.findAllIntersections)
return false;return this.interiorIntersection!=null;};})();(function(){jsts.noding.Noder=function(){};jsts.noding.Noder.prototype.computeNodes=jsts.abstractFunc;jsts.noding.Noder.prototype.getNodedSubstrings=jsts.abstractFunc;})();(function(){var Noder=jsts.noding.Noder;jsts.noding.SinglePassNoder=function(){};jsts.noding.SinglePassNoder.prototype=new Noder();jsts.noding.SinglePassNoder.constructor=jsts.noding.SinglePassNoder;jsts.noding.SinglePassNoder.prototype.segInt=null;jsts.noding.SinglePassNoder.prototype.setSegmentIntersector=function(segInt){this.segInt=segInt;};})();jsts.index.SpatialIndex=function(){};jsts.index.SpatialIndex.prototype.insert=function(itemEnv,item){throw new jsts.error.AbstractMethodInvocationError();};jsts.index.SpatialIndex.prototype.query=function(searchEnv,visitor){throw new jsts.error.AbstractMethodInvocationError();};jsts.index.SpatialIndex.prototype.remove=function(itemEnv,item){throw new jsts.error.AbstractMethodInvocationError();};jsts.index.strtree.AbstractSTRtree=function(nodeCapacity){if(nodeCapacity===undefined)
return;this.itemBoundables=[];jsts.util.Assert.isTrue(nodeCapacity>1,'Node capacity must be greater than 1');this.nodeCapacity=nodeCapacity;};jsts.index.strtree.AbstractSTRtree.IntersectsOp=function(){};jsts.index.strtree.AbstractSTRtree.IntersectsOp.prototype.intersects=function(aBounds,bBounds){throw new jsts.error.AbstractMethodInvocationError();};jsts.index.strtree.AbstractSTRtree.prototype.root=null;jsts.index.strtree.AbstractSTRtree.prototype.built=false;jsts.index.strtree.AbstractSTRtree.prototype.itemBoundables=null;jsts.index.strtree.AbstractSTRtree.prototype.nodeCapacity=null;jsts.index.strtree.AbstractSTRtree.prototype.build=function(){jsts.util.Assert.isTrue(!this.built);this.root=this.itemBoundables.length===0?this.createNode(0):this.createHigherLevels(this.itemBoundables,-1);this.built=true;};jsts.index.strtree.AbstractSTRtree.prototype.createNode=function(level){throw new jsts.error.AbstractMethodInvocationError();};jsts.index.strtree.AbstractSTRtree.prototype.createParentBoundables=function(childBoundables,newLevel){jsts.util.Assert.isTrue(!(childBoundables.length===0));var parentBoundables=[];parentBoundables.push(this.createNode(newLevel));var sortedChildBoundables=[];for(var i=0;i<childBoundables.length;i++){sortedChildBoundables.push(childBoundables[i]);}
sortedChildBoundables.sort(this.getComparator());for(var i=0;i<sortedChildBoundables.length;i++){var childBoundable=sortedChildBoundables[i];if(this.lastNode(parentBoundables).getChildBoundables().length===this.getNodeCapacity()){parentBoundables.push(this.createNode(newLevel));}
this.lastNode(parentBoundables).addChildBoundable(childBoundable);}
return parentBoundables;};jsts.index.strtree.AbstractSTRtree.prototype.lastNode=function(nodes){return nodes[nodes.length-1];};jsts.index.strtree.AbstractSTRtree.prototype.compareDoubles=function(a,b){return a>b?1:a<b?-1:0;};jsts.index.strtree.AbstractSTRtree.prototype.createHigherLevels=function(boundablesOfALevel,level){jsts.util.Assert.isTrue(!(boundablesOfALevel.length===0));var parentBoundables=this.createParentBoundables(boundablesOfALevel,level+1);if(parentBoundables.length===1){return parentBoundables[0];}
return this.createHigherLevels(parentBoundables,level+1);};jsts.index.strtree.AbstractSTRtree.prototype.getRoot=function(){if(!this.built)
this.build();return this.root;};jsts.index.strtree.AbstractSTRtree.prototype.getNodeCapacity=function(){return this.nodeCapacity;};jsts.index.strtree.AbstractSTRtree.prototype.size=function(){if(arguments.length===1){return this.size2(arguments[0]);}
if(!this.built){this.build();}
if(this.itemBoundables.length===0){return 0;}
return this.size2(root);};jsts.index.strtree.AbstractSTRtree.prototype.size2=function(node){var size=0;var childBoundables=node.getChildBoundables();for(var i=0;i<childBoundables.length;i++){var childBoundable=childBoundables[i];if(childBoundable instanceof jsts.index.strtree.AbstractNode){size+=this.size(childBoundable);}else if(childBoundable instanceof jsts.index.strtree.ItemBoundable){size+=1;}}
return size;};jsts.index.strtree.AbstractSTRtree.prototype.depth=function(){if(arguments.length===1){return this.depth2(arguments[0]);}
if(!this.built){this.build();}
if(this.itemBoundables.length===0){return 0;}
return this.depth2(root);};jsts.index.strtree.AbstractSTRtree.prototype.depth2=function(){var maxChildDepth=0;var childBoundables=node.getChildBoundables();for(var i=0;i<childBoundables.length;i++){var childBoundable=childBoundables[i];if(childBoundable instanceof jsts.index.strtree.AbstractNode){var childDepth=this.depth(childBoundable);if(childDepth>maxChildDepth)
maxChildDepth=childDepth;}}
return maxChildDepth+1;};jsts.index.strtree.AbstractSTRtree.prototype.insert=function(bounds,item){jsts.util.Assert.isTrue(!this.built,'Cannot insert items into an STR packed R-tree after it has been built.');this.itemBoundables.push(new jsts.index.strtree.ItemBoundable(bounds,item));};jsts.index.strtree.AbstractSTRtree.prototype.query=function(searchBounds){if(arguments.length>1){this.query2.apply(this,arguments);}
if(!this.built){this.build();}
var matches=[];if(this.itemBoundables.length===0){jsts.util.Assert.isTrue(this.root.getBounds()===null);return matches;}
if(this.getIntersectsOp().intersects(this.root.getBounds(),searchBounds)){this.query3(searchBounds,this.root,matches);}
return matches;};jsts.index.strtree.AbstractSTRtree.prototype.query2=function(searchBounds,visitor){if(arguments.length>2){this.query3.apply(this,arguments);}
if(!this.built){this.build();}
if(this.itemBoundables.length===0){jsts.util.Assert.isTrue(this.root.getBounds()===null);}
if(this.getIntersectsOp().intersects(this.root.getBounds(),searchBounds)){this.query4(searchBounds,this.root,visitor);}};jsts.index.strtree.AbstractSTRtree.prototype.query3=function(searchBounds,node,matches){if(!(arguments[2]instanceof Array)){this.query4.apply(this,arguments);}
var childBoundables=node.getChildBoundables();for(var i=0;i<childBoundables.length;i++){var childBoundable=childBoundables[i];if(!this.getIntersectsOp().intersects(childBoundable.getBounds(),searchBounds)){continue;}
if(childBoundable instanceof jsts.index.strtree.AbstractNode){this.query3(searchBounds,childBoundable,matches);}else if(childBoundable instanceof jsts.index.strtree.ItemBoundable){matches.push(childBoundable.getItem());}else{jsts.util.Assert.shouldNeverReachHere();}}};jsts.index.strtree.AbstractSTRtree.prototype.query4=function(searchBounds,node,visitor){var childBoundables=node.getChildBoundables();for(var i=0;i<childBoundables.length;i++){var childBoundable=childBoundables[i];if(!this.getIntersectsOp().intersects(childBoundable.getBounds(),searchBounds)){continue;}
if(childBoundable instanceof jsts.index.strtree.AbstractNode){this.query4(searchBounds,childBoundable,visitor);}else if(childBoundable instanceof jsts.index.strtree.ItemBoundable){visitor.visitItem(childBoundable.getItem());}else{jsts.util.Assert.shouldNeverReachHere();}}};jsts.index.strtree.AbstractSTRtree.prototype.getIntersectsOp=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.index.strtree.AbstractSTRtree.prototype.itemsTree=function(){if(arguments.length===1){return this.itemsTree2.apply(this,arguments);}
if(!this.built){this.build();}
var valuesTree=this.itemsTree2(this.root);if(valuesTree===null)
return[];return valuesTree;};jsts.index.strtree.AbstractSTRtree.prototype.itemsTree2=function(node){var valuesTreeForNode=[];var childBoundables=node.getChildBoundables();for(var i=0;i<childBoundables.length;i++){var childBoundable=childBoundables[i];if(childBoundable instanceof jsts.index.strtree.AbstractNode){var valuesTreeForChild=this.itemsTree(childBoundable);if(valuesTreeForChild!=null)
valuesTreeForNode.push(valuesTreeForChild);}else if(childBoundable instanceof jsts.index.strtree.ItemBoundable){valuesTreeForNode.push(childBoundable.getItem());}else{jsts.util.Assert.shouldNeverReachHere();}}
if(valuesTreeForNode.length<=0)
return null;return valuesTreeForNode;};jsts.index.strtree.AbstractSTRtree.prototype.remove=function(searchBounds,item){if(!this.built){this.build();}
if(this.itemBoundables.length===0){jsts.util.Assert.isTrue(this.root.getBounds()==null);}
if(this.getIntersectsOp().intersects(this.root.getBounds(),searchBounds)){return this.remove2(searchBounds,this.root,item);}
return false;};jsts.index.strtree.AbstractSTRtree.prototype.remove2=function(searchBounds,node,item){var found=this.removeItem(node,item);if(found)
return true;var childToPrune=null;var childBoundables=node.getChildBoundables();for(var i=0;i<childBoundables.length;i++){var childBoundable=childBoundables[i];if(!this.getIntersectsOp().intersects(childBoundable.getBounds(),searchBounds)){continue;}
if(childBoundable instanceof jsts.index.strtree.AbstractNode){found=this.remove(searchBounds,childBoundable,item);if(found){childToPrune=childBoundable;break;}}}
if(childToPrune!=null){if(childToPrune.getChildBoundables().length===0){childBoundables.splice(childBoundables.indexOf(childToPrune),1);}}
return found;};jsts.index.strtree.AbstractSTRtree.prototype.removeItem=function(node,item){var childToRemove=null;var childBoundables=node.getChildBoundables();for(var i=0;i<childBoundables.length;i++){var childBoundable=childBoundables[i];if(childBoundable instanceof jsts.index.strtree.ItemBoundable){if(childBoundable.getItem()===item)
childToRemove=childBoundable;}}
if(childToRemove!==null){childBoundables.splice(childBoundables.indexOf(childToRemove),1);return true;}
return false;};jsts.index.strtree.AbstractSTRtree.prototype.boundablesAtLevel=function(level){if(arguments.length>1){this.boundablesAtLevel2.apply(this,arguments);return;}
var boundables=[];this.boundablesAtLevel2(level,this.root,boundables);return boundables;};jsts.index.strtree.AbstractSTRtree.prototype.boundablesAtLevel2=function(level,top,boundables){jsts.util.Assert.isTrue(level>-2);if(top.getLevel()===level){boundables.add(top);return;}
var childBoundables=node.getChildBoundables();for(var i=0;i<childBoundables.length;i++){var boundable=childBoundables[i];if(boundable instanceof jsts.index.strtree.AbstractNode){this.boundablesAtLevel(level,boundable,boundables);}else{jsts.util.Assert.isTrue(boundable instanceof jsts.index.strtree.ItemBoundable);if(level===-1){boundables.add(boundable);}}}
return;};jsts.index.strtree.AbstractSTRtree.prototype.getComparator=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.index.strtree.STRtree=function(nodeCapacity){nodeCapacity=nodeCapacity||jsts.index.strtree.STRtree.DEFAULT_NODE_CAPACITY;jsts.index.strtree.AbstractSTRtree.call(this,nodeCapacity);};jsts.index.strtree.STRtree.prototype=new jsts.index.strtree.AbstractSTRtree();jsts.index.strtree.STRtree.constructor=jsts.index.strtree.STRtree;jsts.index.strtree.STRtree.prototype.xComparator=function(o1,o2){return jsts.index.strtree.AbstractSTRtree.prototype.compareDoubles(jsts.index.strtree.STRtree.prototype.centreX(o1.getBounds()),jsts.index.strtree.STRtree.prototype.centreX(o2.getBounds()));};jsts.index.strtree.STRtree.prototype.yComparator=function(o1,o2){return jsts.index.strtree.AbstractSTRtree.prototype.compareDoubles(jsts.index.strtree.STRtree.prototype.centreY(o1.getBounds()),jsts.index.strtree.STRtree.prototype.centreY(o2.getBounds()));};jsts.index.strtree.STRtree.prototype.centreX=function(e){return jsts.index.strtree.STRtree.prototype.avg(e.getMinX(),e.getMaxX());};jsts.index.strtree.STRtree.prototype.centreY=function(e){return jsts.index.strtree.STRtree.prototype.avg(e.getMinY(),e.getMaxY());};jsts.index.strtree.STRtree.prototype.avg=function(a,b){return(a+b)/2.0;};jsts.index.strtree.STRtree.prototype.intersectsOp={intersects:function(aBounds,bBounds){return aBounds.intersects(bBounds);}};jsts.index.strtree.STRtree.prototype.createParentBoundables=function(childBoundables,newLevel){jsts.util.Assert.isTrue(!(childBoundables.length===0));var minLeafCount=Math.ceil(childBoundables.length/this.getNodeCapacity());var sortedChildBoundables=[];for(var i=0;i<childBoundables.length;i++){sortedChildBoundables.push(childBoundables[i]);}
sortedChildBoundables.sort(this.xComparator);var verticalSlices=this.verticalSlices(sortedChildBoundables,Math.ceil(Math.sqrt(minLeafCount)));return this.createParentBoundablesFromVerticalSlices(verticalSlices,newLevel);};jsts.index.strtree.STRtree.prototype.createParentBoundablesFromVerticalSlices=function(verticalSlices,newLevel){jsts.util.Assert.isTrue(verticalSlices.length>0);var parentBoundables=[];for(var i=0;i<verticalSlices.length;i++){parentBoundables=parentBoundables.concat(this.createParentBoundablesFromVerticalSlice(verticalSlices[i],newLevel));}
return parentBoundables;};jsts.index.strtree.STRtree.prototype.createParentBoundablesFromVerticalSlice=function(childBoundables,newLevel){return jsts.index.strtree.AbstractSTRtree.prototype.createParentBoundables.call(this,childBoundables,newLevel);};jsts.index.strtree.STRtree.prototype.verticalSlices=function(childBoundables,sliceCount){var sliceCapacity=Math.ceil(childBoundables.length/sliceCount);var slices=[];var i=0,boundablesAddedToSlice,childBoundable;for(var j=0;j<sliceCount;j++){slices[j]=[];boundablesAddedToSlice=0;while(i<childBoundables.length&&boundablesAddedToSlice<sliceCapacity){childBoundable=childBoundables[i++];slices[j].push(childBoundable);boundablesAddedToSlice++;}}
return slices;};jsts.index.strtree.STRtree.DEFAULT_NODE_CAPACITY=10;jsts.index.strtree.STRtree.prototype.createNode=function(level){var abstractNode=new jsts.index.strtree.AbstractNode(level);abstractNode.computeBounds=function(){var bounds=null;var childBoundables=this.getChildBoundables();for(var i=0;i<childBoundables.length;i++){var childBoundable=childBoundables[i];if(bounds===null){bounds=new jsts.geom.Envelope(childBoundable.getBounds());}else{bounds.expandToInclude(childBoundable.getBounds());}}
return bounds;};return abstractNode;};jsts.index.strtree.STRtree.prototype.getIntersectsOp=function(){return this.intersectsOp;};jsts.index.strtree.STRtree.prototype.insert=function(itemEnv,item){if(itemEnv.isNull()){return;}
jsts.index.strtree.AbstractSTRtree.prototype.insert.call(this,itemEnv,item);};jsts.index.strtree.STRtree.prototype.query=function(searchEnv,visitor){return jsts.index.strtree.AbstractSTRtree.prototype.query.apply(this,arguments);};jsts.index.strtree.STRtree.prototype.remove=function(itemEnv,item){return jsts.index.strtree.AbstractSTRtree.prototype.remove.call(this,itemEnv,item);};jsts.index.strtree.STRtree.prototype.size=function(){return jsts.index.strtree.AbstractSTRtree.prototype.size.call(this);};jsts.index.strtree.STRtree.prototype.depth=function(){return jsts.index.strtree.AbstractSTRtree.prototype.depth.call(this);};jsts.index.strtree.STRtree.prototype.getComparator=function(){return this.yComparator;};jsts.index.strtree.STRtree.prototype.nearestNeighbour=function(itemDist){var bp=new jsts.index.strtree.BoundablePair(this.getRoot(),this.getRoot(),itemDist);return this.nearestNeighbour4(bp);};jsts.index.strtree.STRtree.prototype.nearestNeighbour2=function(env,item,itemDist){var bnd=new jsts.index.strtree.ItemBoundable(env,item);var bp=new jsts.index.strtree.BoundablePair(this.getRoot(),bnd,itemDist);return this.nearestNeighbour4(bp)[0];};jsts.index.strtree.STRtree.prototype.nearestNeighbour3=function(tree,itemDist){var bp=new jsts.index.strtree.BoundablePair(this.getRoot(),tree.getRoot(),itemDist);return this.nearestNeighbour4(bp);};jsts.index.strtree.STRtree.prototype.nearestNeighbour4=function(initBndPair){return this.nearestNeighbour5(initBndPair,Double.POSITIVE_INFINITY);};jsts.index.strtree.STRtree.prototype.nearestNeighbour5=function(initBndPair,maxDistance){var distanceLowerBound=maxDistance;var minPair=null;var priQ=[];priQ.push(initBndPair);while(!priQ.isEmpty()&&distanceLowerBound>0.0){var bndPair=priQ.pop();var currentDistance=bndPair.getDistance();if(currentDistance>=distanceLowerBound)
break;if(bndPair.isLeaves()){distanceLowerBound=currentDistance;minPair=bndPair;}else{bndPair.expandToQueue(priQ,distanceLowerBound);}}
return[minPair.getBoundable(0).getItem(),minPair.getBoundable(1).getItem()];};jsts.noding.SegmentString=function(){};jsts.noding.SegmentString.prototype.getData=jsts.abstractFunc;jsts.noding.SegmentString.prototype.setData=jsts.abstractFunc;jsts.noding.SegmentString.prototype.size=jsts.abstractFunc;jsts.noding.SegmentString.prototype.getCoordinate=jsts.abstractFunc;jsts.noding.SegmentString.prototype.getCoordinates=jsts.abstractFunc;jsts.noding.SegmentString.prototype.isClosed=jsts.abstractFunc;jsts.noding.NodableSegmentString=function(){};jsts.noding.NodableSegmentString.prototype=new jsts.noding.SegmentString();jsts.noding.NodableSegmentString.prototype.addIntersection=jsts.abstractFunc;jsts.noding.NodedSegmentString=function(pts,data){this.nodeList=new jsts.noding.SegmentNodeList(this);this.pts=pts;this.data=data;};jsts.noding.NodedSegmentString.prototype=new jsts.noding.NodableSegmentString();jsts.noding.NodedSegmentString.constructor=jsts.noding.NodedSegmentString;jsts.noding.NodedSegmentString.getNodedSubstrings=function(segStrings){if(arguments.length===2){jsts.noding.NodedSegmentString.getNodedSubstrings2.apply(this,arguments);return;}
var resultEdgelist=new javascript.util.ArrayList();jsts.noding.NodedSegmentString.getNodedSubstrings2(segStrings,resultEdgelist);return resultEdgelist;};jsts.noding.NodedSegmentString.getNodedSubstrings2=function(segStrings,resultEdgelist){for(var i=segStrings.iterator();i.hasNext();){var ss=i.next();ss.getNodeList().addSplitEdges(resultEdgelist);}};jsts.noding.NodedSegmentString.prototype.nodeList=null;jsts.noding.NodedSegmentString.prototype.pts=null;jsts.noding.NodedSegmentString.prototype.data=null;jsts.noding.NodedSegmentString.prototype.getData=function(){return this.data;};jsts.noding.NodedSegmentString.prototype.setData=function(data){this.data=data;};jsts.noding.NodedSegmentString.prototype.getNodeList=function(){return this.nodeList;};jsts.noding.NodedSegmentString.prototype.size=function(){return this.pts.length;};jsts.noding.NodedSegmentString.prototype.getCoordinate=function(i){return this.pts[i];};jsts.noding.NodedSegmentString.prototype.getCoordinates=function(){return this.pts;};jsts.noding.NodedSegmentString.prototype.isClosed=function(){return this.pts[0].equals(this.pts[this.pts.length-1]);};jsts.noding.NodedSegmentString.prototype.getSegmentOctant=function(index){if(index===this.pts.length-1)
return-1;return this.safeOctant(this.getCoordinate(index),this.getCoordinate(index+1));};jsts.noding.NodedSegmentString.prototype.safeOctant=function(p0,p1){if(p0.equals2D(p1))
return 0;return jsts.noding.Octant.octant(p0,p1);};jsts.noding.NodedSegmentString.prototype.addIntersections=function(li,segmentIndex,geomIndex){for(var i=0;i<li.getIntersectionNum();i++){this.addIntersection(li,segmentIndex,geomIndex,i);}};jsts.noding.NodedSegmentString.prototype.addIntersection=function(li,segmentIndex,geomIndex,intIndex){if(li instanceof jsts.geom.Coordinate){this.addIntersection2.apply(this,arguments);return;}
var intPt=new jsts.geom.Coordinate(li.getIntersection(intIndex));this.addIntersection2(intPt,segmentIndex);};jsts.noding.NodedSegmentString.prototype.addIntersection2=function(intPt,segmentIndex){this.addIntersectionNode(intPt,segmentIndex);};jsts.noding.NodedSegmentString.prototype.addIntersectionNode=function(intPt,segmentIndex){var normalizedSegmentIndex=segmentIndex;var nextSegIndex=normalizedSegmentIndex+1;if(nextSegIndex<this.pts.length){var nextPt=this.pts[nextSegIndex];if(intPt.equals2D(nextPt)){normalizedSegmentIndex=nextSegIndex;}}
var ei=this.nodeList.add(intPt,normalizedSegmentIndex);return ei;};jsts.noding.NodedSegmentString.prototype.toString=function(){var geometryFactory=new jsts.geom.GeometryFactory();return new jsts.io.WKTWriter().write(geometryFactory.createLineString(this.pts));};jsts.index.chain.MonotoneChainBuilder=function(){};jsts.index.chain.MonotoneChainBuilder.toIntArray=function(list){var array=[];for(var i=0;i<list.length;i++){array[i]=list[i];}
return array;};jsts.index.chain.MonotoneChainBuilder.getChains=function(pts){if(arguments.length===2){return jsts.index.chain.MonotoneChainBuilder.getChains2.apply(this,arguments);}
return jsts.index.chain.MonotoneChainBuilder.getChains2(pts,null);};jsts.index.chain.MonotoneChainBuilder.getChains2=function(pts,context){var mcList=[];var startIndex=jsts.index.chain.MonotoneChainBuilder.getChainStartIndices(pts);for(var i=0;i<startIndex.length-1;i++){var mc=new jsts.index.chain.MonotoneChain(pts,startIndex[i],startIndex[i+1],context);mcList.push(mc);}
return mcList;};jsts.index.chain.MonotoneChainBuilder.getChainStartIndices=function(pts){var start=0;var startIndexList=[];startIndexList.push(start);do{var last=jsts.index.chain.MonotoneChainBuilder.findChainEnd(pts,start);startIndexList.push(last);start=last;}while(start<pts.length-1);var startIndex=jsts.index.chain.MonotoneChainBuilder.toIntArray(startIndexList);return startIndex;};jsts.index.chain.MonotoneChainBuilder.findChainEnd=function(pts,start){var safeStart=start;while(safeStart<pts.length-1&&pts[safeStart].equals2D(pts[safeStart+1])){safeStart++;}
if(safeStart>=pts.length-1){return pts.length-1;}
var chainQuad=jsts.geomgraph.Quadrant.quadrant(pts[safeStart],pts[safeStart+1]);var last=start+1;while(last<pts.length){if(!pts[last-1].equals2D(pts[last])){var quad=jsts.geomgraph.Quadrant.quadrant(pts[last-1],pts[last]);if(quad!==chainQuad)
break;}
last++;}
return last-1;};jsts.geom.LineSegment=function(p0,p1){if(p0===undefined){this.p0=new jsts.geom.Coordinate();this.p1=new jsts.geom.Coordinate();return;}
this.p0=p0;this.p1=p1;};jsts.geom.LineSegment.prototype.p0=null;jsts.geom.LineSegment.prototype.p1=null;jsts.geom.LineSegment.prototype.getLength=function(){return this.p0.distance(p1);};jsts.geom.LineSegment.prototype.isHorizontal=function(){return this.p0.y===this.p1.y;};jsts.geom.LineSegment.prototype.isVertical=function(){return this.p0.x===this.p1.x;};jsts.geom.LineSegment.prototype.reverse=function()
{var temp=this.p0;this.p0=this.p1;this.p1=temp;};jsts.geom.LineSegment.prototype.projectionFactor=function(p){if(p.equals(this.p0))
return 0.0;if(p.equals(this.p1))
return 1.0;var dx=this.p1.x-this.p0.x;var dy=this.p1.y-this.p0.y;var len2=dx*dx+dy*dy;var r=((p.x-this.p0.x)*dx+(p.y-this.p0.y)*dy)/len2;return r;};jsts.geom.LineSegment.prototype.closestPoint=function(p){var factor=this.projectionFactor(p);if(factor>0&&factor<1){return this.project(p);}
var dist0=this.p0.distance(p);var dist1=this.p1.distance(p);if(dist0<dist1)
return this.p0;return this.p1;};jsts.geom.LineSegment.prototype.closestPoints=function(line){var intPt=this.intersection(line);if(intPt!==null){return[intPt,intPt];}
var closestPt=[];var minDistance=Number.MAX_VALUE;var dist;var close00=this.closestPoint(line.p0);minDistance=close00.distance(line.p0);closestPt[0]=close00;closestPt[1]=line.p0;var close01=this.closestPoint(line.p1);dist=close01.distance(line.p1);if(dist<minDistance){minDistance=dist;closestPt[0]=close01;closestPt[1]=line.p1;}
var close10=line.closestPoint(this.p0);dist=close10.distance(this.p0);if(dist<minDistance){minDistance=dist;closestPt[0]=this.p0;closestPt[1]=close10;}
var close11=line.closestPoint(this.p1);dist=close11.distance(this.p1);if(dist<minDistance){minDistance=dist;closestPt[0]=this.p1;closestPt[1]=close11;}
return closestPt;};jsts.geom.LineSegment.prototype.intersection=function(line){var li=new jsts.algorithm.RobustLineIntersector();li.computeIntersection(this.p0,this.p1,line.p0,line.p1);if(li.hasIntersection())
return li.getIntersection(0);return null;};jsts.geom.LineSegment.prototype.project=function(p){if(p.equals(this.p0)||p.equals(this.p1))
return new jsts.geom.Coordinate(p);var r=this.projectionFactor(p);var coord=new jsts.geom.Coordinate();coord.x=this.p0.x+r*(this.p1.x-this.p0.x);coord.y=this.p0.y+r*(this.p1.y-this.p0.y);return coord;};jsts.geom.LineSegment.prototype.setCoordinates=function(ls){if(ls instanceof jsts.geom.Coordinate){this.setCoordinates2.apply(this,arguments);return;}
this.setCoordinates2(ls.p0,ls.p1);};jsts.geom.LineSegment.prototype.setCoordinates2=function(p0,p1){this.p0.x=p0.x;this.p0.y=p0.y;this.p1.x=p1.x;this.p1.y=p1.y;};jsts.geom.LineSegment.prototype.distance=function(p)
{return jsts.algorithm.CGAlgorithms.distancePointLine(p,this.p0,this.p1);};jsts.index.chain.MonotoneChainOverlapAction=function(){this.tempEnv1=new jsts.geom.Envelope();this.tempEnv2=new jsts.geom.Envelope();this.overlapSeg1=new jsts.geom.LineSegment();this.overlapSeg2=new jsts.geom.LineSegment();};jsts.index.chain.MonotoneChainOverlapAction.prototype.tempEnv1=null;jsts.index.chain.MonotoneChainOverlapAction.prototype.tempEnv2=null;jsts.index.chain.MonotoneChainOverlapAction.prototype.overlapSeg1=null;jsts.index.chain.MonotoneChainOverlapAction.prototype.overlapSeg2=null;jsts.index.chain.MonotoneChainOverlapAction.prototype.overlap=function(mc1,start1,mc2,start2){this.mc1.getLineSegment(start1,this.overlapSeg1);this.mc2.getLineSegment(start2,this.overlapSeg2);this.overlap2(this.overlapSeg1,this.overlapSeg2);};jsts.index.chain.MonotoneChainOverlapAction.prototype.overlap2=function(seg1,seg2){};(function(){var MonotoneChainOverlapAction=jsts.index.chain.MonotoneChainOverlapAction;var SinglePassNoder=jsts.noding.SinglePassNoder;var STRtree=jsts.index.strtree.STRtree;var NodedSegmentString=jsts.noding.NodedSegmentString;var MonotoneChainBuilder=jsts.index.chain.MonotoneChainBuilder;var SegmentOverlapAction=function(si){this.si=si;};SegmentOverlapAction.prototype=new MonotoneChainOverlapAction();SegmentOverlapAction.constructor=SegmentOverlapAction;SegmentOverlapAction.prototype.si=null;SegmentOverlapAction.prototype.overlap=function(mc1,start1,mc2,start2){var ss1=mc1.getContext();var ss2=mc2.getContext();this.si.processIntersections(ss1,start1,ss2,start2);};jsts.noding.MCIndexNoder=function(){this.monoChains=[];this.index=new STRtree();};jsts.noding.MCIndexNoder.prototype=new SinglePassNoder();jsts.noding.MCIndexNoder.constructor=jsts.noding.MCIndexNoder;jsts.noding.MCIndexNoder.prototype.monoChains=null;jsts.noding.MCIndexNoder.prototype.index=null;jsts.noding.MCIndexNoder.prototype.idCounter=0;jsts.noding.MCIndexNoder.prototype.nodedSegStrings=null;jsts.noding.MCIndexNoder.prototype.nOverlaps=0;jsts.noding.MCIndexNoder.prototype.getMonotoneChains=function(){return this.monoChains;};jsts.noding.MCIndexNoder.prototype.getIndex=function(){return this.index;};jsts.noding.MCIndexNoder.prototype.getNodedSubstrings=function(){return NodedSegmentString.getNodedSubstrings(this.nodedSegStrings);};jsts.noding.MCIndexNoder.prototype.computeNodes=function(inputSegStrings){this.nodedSegStrings=inputSegStrings;for(var i=inputSegStrings.iterator();i.hasNext();){this.add(i.next());}
this.intersectChains();};jsts.noding.MCIndexNoder.prototype.intersectChains=function(){var overlapAction=new SegmentOverlapAction(this.segInt);for(var i=0;i<this.monoChains.length;i++){var queryChain=this.monoChains[i];var overlapChains=this.index.query(queryChain.getEnvelope());for(var j=0;j<overlapChains.length;j++){var testChain=overlapChains[j];if(testChain.getId()>queryChain.getId()){queryChain.computeOverlaps(testChain,overlapAction);this.nOverlaps++;}
if(this.segInt.isDone())
return;}}};jsts.noding.MCIndexNoder.prototype.add=function(segStr){var segChains=MonotoneChainBuilder.getChains(segStr.getCoordinates(),segStr);for(var i=0;i<segChains.length;i++){var mc=segChains[i];mc.setId(this.idCounter++);this.index.insert(mc.getEnvelope(),mc);this.monoChains.push(mc);}};})();(function(){var RobustLineIntersector=jsts.algorithm.RobustLineIntersector;var InteriorIntersectionFinder=jsts.noding.InteriorIntersectionFinder;var MCIndexNoder=jsts.noding.MCIndexNoder;jsts.noding.FastNodingValidator=function(segStrings){this.li=new RobustLineIntersector();this.segStrings=segStrings;};jsts.noding.FastNodingValidator.prototype.li=null;jsts.noding.FastNodingValidator.prototype.segStrings=null;jsts.noding.FastNodingValidator.prototype.findAllIntersections=false;jsts.noding.FastNodingValidator.prototype.segInt=null;jsts.noding.FastNodingValidator.prototype._isValid=true;jsts.noding.FastNodingValidator.prototype.setFindAllIntersections=function(findAllIntersections){this.findAllIntersections=findAllIntersections;};jsts.noding.FastNodingValidator.prototype.getIntersections=function(){return segInt.getIntersections();};jsts.noding.FastNodingValidator.prototype.isValid=function(){this.execute();return this._isValid;};jsts.noding.FastNodingValidator.prototype.getErrorMessage=function(){if(this._isValid)
return'no intersections found';var intSegs=this.segInt.getIntersectionSegments();return'found non-noded intersection between '+
jsts.io.WKTWriter.toLineString(intSegs[0],intSegs[1])+' and '+
jsts.io.WKTWriter.toLineString(intSegs[2],intSegs[3]);};jsts.noding.FastNodingValidator.prototype.checkValid=function(){this.execute();if(!this._isValid)
throw new jsts.error.TopologyError(this.getErrorMessage(),this.segInt.getInteriorIntersection());};jsts.noding.FastNodingValidator.prototype.execute=function(){if(this.segInt!=null)
return;this.checkInteriorIntersections();};jsts.noding.FastNodingValidator.prototype.checkInteriorIntersections=function(){this._isValid=true;this.segInt=new InteriorIntersectionFinder(this.li);this.segInt.setFindAllIntersections(this.findAllIntersections);var noder=new MCIndexNoder();noder.setSegmentIntersector(this.segInt);noder.computeNodes(this.segStrings);if(this.segInt.hasIntersection()){this._isValid=false;return;}};})();(function(){jsts.noding.BasicSegmentString=function(pts,data){this.pts=pts;this.data=data;};jsts.noding.BasicSegmentString.prototype=new jsts.noding.SegmentString();jsts.noding.BasicSegmentString.prototype.pts=null;jsts.noding.BasicSegmentString.prototype.data=null;jsts.noding.BasicSegmentString.prototype.getData=function(){return this.data;}
jsts.noding.BasicSegmentString.prototype.setData=function(data){this.data=data;};jsts.noding.BasicSegmentString.prototype.size=function(){return this.pts.length;};jsts.noding.BasicSegmentString.prototype.getCoordinate=function(i){return this.pts[i];};jsts.noding.BasicSegmentString.prototype.getCoordinates=function(){return this.pts;};jsts.noding.BasicSegmentString.prototype.isClosed=function(){return this.pts[0].equals(this.pts[this.pts.length-1]);};jsts.noding.BasicSegmentString.prototype.getSegmentOctant=function(index){if(index==this.pts.length-1)
return-1;return jsts.noding.Octant.octant(this.getCoordinate(index),this.getCoordinate(index+1));};})();(function(){var FastNodingValidator=jsts.noding.FastNodingValidator;var BasicSegmentString=jsts.noding.BasicSegmentString;var ArrayList=javascript.util.ArrayList;jsts.geomgraph.EdgeNodingValidator=function(edges){this.nv=new FastNodingValidator(jsts.geomgraph.EdgeNodingValidator.toSegmentStrings(edges));};jsts.geomgraph.EdgeNodingValidator.checkValid=function(edges){var validator=new jsts.geomgraph.EdgeNodingValidator(edges);validator.checkValid();};jsts.geomgraph.EdgeNodingValidator.toSegmentStrings=function(edges){var segStrings=new ArrayList();for(var i=edges.iterator();i.hasNext();){var e=i.next();segStrings.add(new BasicSegmentString(e.getCoordinates(),e));}
return segStrings;};jsts.geomgraph.EdgeNodingValidator.prototype.nv=null;jsts.geomgraph.EdgeNodingValidator.prototype.checkValid=function(){this.nv.checkValid();};})();jsts.operation.GeometryGraphOperation=function(g0,g1,boundaryNodeRule){this.li=new jsts.algorithm.RobustLineIntersector();this.arg=[];if(g0===undefined){return;}
if(g1===undefined){this.setComputationPrecision(g0.getPrecisionModel());this.arg[0]=new jsts.geomgraph.GeometryGraph(0,g0);return;}
boundaryNodeRule=boundaryNodeRule||jsts.algorithm.BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE;if(g0.getPrecisionModel().compareTo(g1.getPrecisionModel())>=0)
this.setComputationPrecision(g0.getPrecisionModel());else
this.setComputationPrecision(g1.getPrecisionModel());this.arg[0]=new jsts.geomgraph.GeometryGraph(0,g0,boundaryNodeRule);this.arg[1]=new jsts.geomgraph.GeometryGraph(1,g1,boundaryNodeRule);};jsts.operation.GeometryGraphOperation.prototype.li=null;jsts.operation.GeometryGraphOperation.prototype.resultPrecisionModel=null;jsts.operation.GeometryGraphOperation.prototype.arg=null;jsts.operation.GeometryGraphOperation.prototype.getArgGeometry=function(i){return arg[i].getGeometry();};jsts.operation.GeometryGraphOperation.prototype.setComputationPrecision=function(pm){this.resultPrecisionModel=pm;this.li.setPrecisionModel(this.resultPrecisionModel);};jsts.operation.overlay.PolygonBuilder=function(geometryFactory){this.shellList=[];this.geometryFactory=geometryFactory;};jsts.operation.overlay.PolygonBuilder.prototype.geometryFactory=null;jsts.operation.overlay.PolygonBuilder.prototype.shellList=null;jsts.operation.overlay.PolygonBuilder.prototype.add=function(graph){if(arguments.length===2){this.add2.apply(this,arguments);return;}
this.add2(graph.getEdgeEnds(),graph.getNodes());};jsts.operation.overlay.PolygonBuilder.prototype.add2=function(dirEdges,nodes){jsts.geomgraph.PlanarGraph.linkResultDirectedEdges(nodes);var maxEdgeRings=this.buildMaximalEdgeRings(dirEdges);var freeHoleList=[];var edgeRings=this.buildMinimalEdgeRings(maxEdgeRings,this.shellList,freeHoleList);this.sortShellsAndHoles(edgeRings,this.shellList,freeHoleList);this.placeFreeHoles(this.shellList,freeHoleList);};jsts.operation.overlay.PolygonBuilder.prototype.getPolygons=function(){var resultPolyList=this.computePolygons(this.shellList);return resultPolyList;};jsts.operation.overlay.PolygonBuilder.prototype.buildMaximalEdgeRings=function(dirEdges){var maxEdgeRings=[];for(var it=dirEdges.iterator();it.hasNext();){var de=it.next();if(de.isInResult()&&de.getLabel().isArea()){if(de.getEdgeRing()==null){var er=new jsts.operation.overlay.MaximalEdgeRing(de,this.geometryFactory);maxEdgeRings.push(er);er.setInResult();}}}
return maxEdgeRings;};jsts.operation.overlay.PolygonBuilder.prototype.buildMinimalEdgeRings=function(maxEdgeRings,shellList,freeHoleList){var edgeRings=[];for(var i=0;i<maxEdgeRings.length;i++){var er=maxEdgeRings[i];if(er.getMaxNodeDegree()>2){er.linkDirectedEdgesForMinimalEdgeRings();var minEdgeRings=er.buildMinimalRings();var shell=this.findShell(minEdgeRings);if(shell!==null){this.placePolygonHoles(shell,minEdgeRings);shellList.push(shell);}else{freeHoleList=freeHoleList.concat(minEdgeRings);}}else{edgeRings.push(er);}}
return edgeRings;};jsts.operation.overlay.PolygonBuilder.prototype.findShell=function(minEdgeRings){var shellCount=0;var shell=null;for(var i=0;i<minEdgeRings.length;i++){var er=minEdgeRings[i];if(!er.isHole()){shell=er;shellCount++;}}
jsts.util.Assert.isTrue(shellCount<=1,'found two shells in MinimalEdgeRing list');return shell;};jsts.operation.overlay.PolygonBuilder.prototype.placePolygonHoles=function(shell,minEdgeRings){for(var i=0;i<minEdgeRings.length;i++){var er=minEdgeRings[i];if(er.isHole()){er.setShell(shell);}}};jsts.operation.overlay.PolygonBuilder.prototype.sortShellsAndHoles=function(edgeRings,shellList,freeHoleList){for(var i=0;i<edgeRings.length;i++){var er=edgeRings[i];if(er.isHole()){freeHoleList.push(er);}else{shellList.push(er);}}};jsts.operation.overlay.PolygonBuilder.prototype.placeFreeHoles=function(shellList,freeHoleList){for(var i=0;i<freeHoleList.length;i++){var hole=freeHoleList[i];if(hole.getShell()==null){var shell=this.findEdgeRingContaining(hole,shellList);if(shell===null)
throw new jsts.error.TopologyError('unable to assign hole to a shell',hole.getCoordinate(0));hole.setShell(shell);}}};jsts.operation.overlay.PolygonBuilder.prototype.findEdgeRingContaining=function(testEr,shellList){var testRing=testEr.getLinearRing();var testEnv=testRing.getEnvelopeInternal();var testPt=testRing.getCoordinateN(0);var minShell=null;var minEnv=null;for(var i=0;i<shellList.length;i++){var tryShell=shellList[i];var tryRing=tryShell.getLinearRing();var tryEnv=tryRing.getEnvelopeInternal();if(minShell!==null)
minEnv=minShell.getLinearRing().getEnvelopeInternal();var isContained=false;if(tryEnv.contains(testEnv)&&jsts.algorithm.CGAlgorithms.isPointInRing(testPt,tryRing.getCoordinates()))
isContained=true;if(isContained){if(minShell==null||minEnv.contains(tryEnv)){minShell=tryShell;}}}
return minShell;};jsts.operation.overlay.PolygonBuilder.prototype.computePolygons=function(shellList){var resultPolyList=new javascript.util.ArrayList();for(var i=0;i<shellList.length;i++){var er=shellList[i];var poly=er.toPolygon(this.geometryFactory);resultPolyList.add(poly);}
return resultPolyList;};jsts.operation.overlay.PolygonBuilder.prototype.containsPoint=function(p){for(var i=0;i<this.shellList.length;i++){var er=this.shellList[i];if(er.containsPoint(p))
return true;}
return false;};(function(){var Assert=jsts.util.Assert;var ArrayList=javascript.util.ArrayList;var LineBuilder=function(op,geometryFactory,ptLocator){this.lineEdgesList=new ArrayList();this.resultLineList=new ArrayList();this.op=op;this.geometryFactory=geometryFactory;this.ptLocator=ptLocator;};LineBuilder.prototype.op=null;LineBuilder.prototype.geometryFactory=null;LineBuilder.prototype.ptLocator=null;LineBuilder.prototype.lineEdgesList=null;LineBuilder.prototype.resultLineList=null;LineBuilder.prototype.build=function(opCode){this.findCoveredLineEdges();this.collectLines(opCode);this.buildLines(opCode);return this.resultLineList;};LineBuilder.prototype.findCoveredLineEdges=function(){for(var nodeit=this.op.getGraph().getNodes().iterator();nodeit.hasNext();){var node=nodeit.next();node.getEdges().findCoveredLineEdges();}
for(var it=this.op.getGraph().getEdgeEnds().iterator();it.hasNext();){var de=it.next();var e=de.getEdge();if(de.isLineEdge()&&!e.isCoveredSet()){var isCovered=this.op.isCoveredByA(de.getCoordinate());e.setCovered(isCovered);}}};LineBuilder.prototype.collectLines=function(opCode){for(var it=this.op.getGraph().getEdgeEnds().iterator();it.hasNext();){var de=it.next();this.collectLineEdge(de,opCode,this.lineEdgesList);this.collectBoundaryTouchEdge(de,opCode,this.lineEdgesList);}};LineBuilder.prototype.collectLineEdge=function(de,opCode,edges){var label=de.getLabel();var e=de.getEdge();if(de.isLineEdge()){if(!de.isVisited()&&jsts.operation.overlay.OverlayOp.isResultOfOp(label,opCode)&&!e.isCovered()){edges.add(e);de.setVisitedEdge(true);}}};LineBuilder.prototype.collectBoundaryTouchEdge=function(de,opCode,edges){var label=de.getLabel();if(de.isLineEdge())
return;if(de.isVisited())
return;if(de.isInteriorAreaEdge())
return;if(de.getEdge().isInResult())
return;Assert.isTrue(!(de.isInResult()||de.getSym().isInResult())||!de.getEdge().isInResult());if(jsts.operation.overlay.OverlayOp.isResultOfOp(label,opCode)&&opCode===jsts.operation.overlay.OverlayOp.INTERSECTION){edges.add(de.getEdge());de.setVisitedEdge(true);}};LineBuilder.prototype.buildLines=function(opCode){for(var it=this.lineEdgesList.iterator();it.hasNext();){var e=it.next();var label=e.getLabel();var line=this.geometryFactory.createLineString(e.getCoordinates());this.resultLineList.add(line);e.setInResult(true);}};LineBuilder.prototype.labelIsolatedLines=function(edgesList){for(var it=edgesList.iterator();it.hasNext();){var e=it.next();var label=e.getLabel();if(e.isIsolated()){if(label.isNull(0))
this.labelIsolatedLine(e,0);else
this.labelIsolatedLine(e,1);}}};LineBuilder.prototype.labelIsolatedLine=function(e,targetIndex){var loc=ptLocator.locate(e.getCoordinate(),op.getArgGeometry(targetIndex));e.getLabel().setLocation(targetIndex,loc);};jsts.operation.overlay.LineBuilder=LineBuilder;})();(function(){var ArrayList=javascript.util.ArrayList;var PointBuilder=function(op,geometryFactory,ptLocator){this.resultPointList=new ArrayList();this.op=op;this.geometryFactory=geometryFactory;};PointBuilder.prototype.op=null;PointBuilder.prototype.geometryFactory=null;PointBuilder.prototype.resultPointList=null;PointBuilder.prototype.build=function(opCode){this.extractNonCoveredResultNodes(opCode);return this.resultPointList;};PointBuilder.prototype.extractNonCoveredResultNodes=function(opCode){for(var nodeit=this.op.getGraph().getNodes().iterator();nodeit.hasNext();){var n=nodeit.next();if(n.isInResult())
continue;if(n.isIncidentEdgeInResult())
continue;if(n.getEdges().getDegree()===0||opCode===jsts.operation.overlay.OverlayOp.INTERSECTION){var label=n.getLabel();if(jsts.operation.overlay.OverlayOp.isResultOfOp(label,opCode)){this.filterCoveredNodeToPoint(n);}}}};PointBuilder.prototype.filterCoveredNodeToPoint=function(n){var coord=n.getCoordinate();if(!this.op.isCoveredByLA(coord)){var pt=this.geometryFactory.createPoint(coord);this.resultPointList.add(pt);}};jsts.operation.overlay.PointBuilder=PointBuilder;})();(function(){var PointLocator=jsts.algorithm.PointLocator;var Location=jsts.geom.Location;var EdgeList=jsts.geomgraph.EdgeList;var Label=jsts.geomgraph.Label;var PlanarGraph=jsts.geomgraph.PlanarGraph;var Position=jsts.geomgraph.Position;var EdgeNodingValidator=jsts.geomgraph.EdgeNodingValidator;var GeometryGraphOperation=jsts.operation.GeometryGraphOperation;var OverlayNodeFactory=jsts.operation.overlay.OverlayNodeFactory;var PolygonBuilder=jsts.operation.overlay.PolygonBuilder;var LineBuilder=jsts.operation.overlay.LineBuilder;var PointBuilder=jsts.operation.overlay.PointBuilder;var Assert=jsts.util.Assert;var ArrayList=javascript.util.ArrayList;jsts.operation.overlay.OverlayOp=function(g0,g1){this.ptLocator=new PointLocator();this.edgeList=new EdgeList();this.resultPolyList=new ArrayList();this.resultLineList=new ArrayList();this.resultPointList=new ArrayList();GeometryGraphOperation.call(this,g0,g1);this.graph=new PlanarGraph(new OverlayNodeFactory());this.geomFact=g0.getFactory();};jsts.operation.overlay.OverlayOp.prototype=new GeometryGraphOperation();jsts.operation.overlay.OverlayOp.constructor=jsts.operation.overlay.OverlayOp;jsts.operation.overlay.OverlayOp.INTERSECTION=1;jsts.operation.overlay.OverlayOp.UNION=2;jsts.operation.overlay.OverlayOp.DIFFERENCE=3;jsts.operation.overlay.OverlayOp.SYMDIFFERENCE=4;jsts.operation.overlay.OverlayOp.overlayOp=function(geom0,geom1,opCode){var gov=new jsts.operation.overlay.OverlayOp(geom0,geom1);var geomOv=gov.getResultGeometry(opCode);return geomOv;}
jsts.operation.overlay.OverlayOp.isResultOfOp=function(label,opCode){if(arguments.length===3){return jsts.operation.overlay.OverlayOp.isResultOfOp2.apply(this,arguments);}
var loc0=label.getLocation(0);var loc1=label.getLocation(1);return jsts.operation.overlay.OverlayOp.isResultOfOp2(loc0,loc1,opCode);}
jsts.operation.overlay.OverlayOp.isResultOfOp2=function(loc0,loc1,opCode){if(loc0==Location.BOUNDARY)
loc0=Location.INTERIOR;if(loc1==Location.BOUNDARY)
loc1=Location.INTERIOR;switch(opCode){case jsts.operation.overlay.OverlayOp.INTERSECTION:return loc0==Location.INTERIOR&&loc1==Location.INTERIOR;case jsts.operation.overlay.OverlayOp.UNION:return loc0==Location.INTERIOR||loc1==Location.INTERIOR;case jsts.operation.overlay.OverlayOp.DIFFERENCE:return loc0==Location.INTERIOR&&loc1!=Location.INTERIOR;case jsts.operation.overlay.OverlayOp.SYMDIFFERENCE:return(loc0==Location.INTERIOR&&loc1!=Location.INTERIOR)||(loc0!=Location.INTERIOR&&loc1==Location.INTERIOR);}
return false;}
jsts.operation.overlay.OverlayOp.prototype.ptLocator=null;jsts.operation.overlay.OverlayOp.prototype.geomFact=null;jsts.operation.overlay.OverlayOp.prototype.resultGeom=null;jsts.operation.overlay.OverlayOp.prototype.graph=null;jsts.operation.overlay.OverlayOp.prototype.edgeList=null;jsts.operation.overlay.OverlayOp.prototype.resultPolyList=null;jsts.operation.overlay.OverlayOp.prototype.resultLineList=null;jsts.operation.overlay.OverlayOp.prototype.resultPointList=null;jsts.operation.overlay.OverlayOp.prototype.getResultGeometry=function(funcCode){this.computeOverlay(funcCode);return this.resultGeom;}
jsts.operation.overlay.OverlayOp.prototype.getGraph=function(){return this.graph;}
jsts.operation.overlay.OverlayOp.prototype.computeOverlay=function(opCode){this.copyPoints(0);this.copyPoints(1);this.arg[0].computeSelfNodes(this.li,false);this.arg[1].computeSelfNodes(this.li,false);this.arg[0].computeEdgeIntersections(this.arg[1],this.li,true);var baseSplitEdges=new ArrayList();this.arg[0].computeSplitEdges(baseSplitEdges);this.arg[1].computeSplitEdges(baseSplitEdges);var splitEdges=baseSplitEdges;this.insertUniqueEdges(baseSplitEdges);this.computeLabelsFromDepths();this.replaceCollapsedEdges();EdgeNodingValidator.checkValid(this.edgeList.getEdges());this.graph.addEdges(this.edgeList.getEdges());this.computeLabelling();this.labelIncompleteNodes();this.findResultAreaEdges(opCode);this.cancelDuplicateResultEdges();var polyBuilder=new PolygonBuilder(this.geomFact);polyBuilder.add(this.graph);this.resultPolyList=polyBuilder.getPolygons();var lineBuilder=new LineBuilder(this,this.geomFact,this.ptLocator);this.resultLineList=lineBuilder.build(opCode);var pointBuilder=new PointBuilder(this,this.geomFact,this.ptLocator);this.resultPointList=pointBuilder.build(opCode);this.resultGeom=this.computeGeometry(this.resultPointList,this.resultLineList,this.resultPolyList,opCode);}
jsts.operation.overlay.OverlayOp.prototype.insertUniqueEdges=function(edges){for(var i=edges.iterator();i.hasNext();){var e=i.next();this.insertUniqueEdge(e);}}
jsts.operation.overlay.OverlayOp.prototype.insertUniqueEdge=function(e){var existingEdge=this.edgeList.findEqualEdge(e);if(existingEdge!==null){var existingLabel=existingEdge.getLabel();var labelToMerge=e.getLabel();if(!existingEdge.isPointwiseEqual(e)){labelToMerge=new Label(e.getLabel());labelToMerge.flip();}
var depth=existingEdge.getDepth();if(depth.isNull()){depth.add(existingLabel);}
depth.add(labelToMerge);existingLabel.merge(labelToMerge);}else{this.edgeList.add(e);}};jsts.operation.overlay.OverlayOp.prototype.computeLabelsFromDepths=function(){for(var it=this.edgeList.iterator();it.hasNext();){var e=it.next();var lbl=e.getLabel();var depth=e.getDepth();if(!depth.isNull()){depth.normalize();for(var i=0;i<2;i++){if(!lbl.isNull(i)&&lbl.isArea()&&!depth.isNull(i)){if(depth.getDelta(i)==0){lbl.toLine(i);}else{Assert.isTrue(!depth.isNull(i,Position.LEFT),'depth of LEFT side has not been initialized');lbl.setLocation(i,Position.LEFT,depth.getLocation(i,Position.LEFT));Assert.isTrue(!depth.isNull(i,Position.RIGHT),'depth of RIGHT side has not been initialized');lbl.setLocation(i,Position.RIGHT,depth.getLocation(i,Position.RIGHT));}}}}}}
jsts.operation.overlay.OverlayOp.prototype.replaceCollapsedEdges=function(){var newEdges=new ArrayList();for(var it=this.edgeList.iterator();it.hasNext();){var e=it.next();if(e.isCollapsed()){it.remove();newEdges.add(e.getCollapsedEdge());}}
this.edgeList.addAll(newEdges);}
jsts.operation.overlay.OverlayOp.prototype.copyPoints=function(argIndex){for(var i=this.arg[argIndex].getNodeIterator();i.hasNext();){var graphNode=i.next();var newNode=this.graph.addNode(graphNode.getCoordinate());newNode.setLabel(argIndex,graphNode.getLabel().getLocation(argIndex));}}
jsts.operation.overlay.OverlayOp.prototype.computeLabelling=function(){for(var nodeit=this.graph.getNodes().iterator();nodeit.hasNext();){var node=nodeit.next();node.getEdges().computeLabelling(this.arg);}
this.mergeSymLabels();this.updateNodeLabelling();}
jsts.operation.overlay.OverlayOp.prototype.mergeSymLabels=function(){for(var nodeit=this.graph.getNodes().iterator();nodeit.hasNext();){var node=nodeit.next();node.getEdges().mergeSymLabels();}}
jsts.operation.overlay.OverlayOp.prototype.updateNodeLabelling=function(){for(var nodeit=this.graph.getNodes().iterator();nodeit.hasNext();){var node=nodeit.next();var lbl=node.getEdges().getLabel();node.getLabel().merge(lbl);}}
jsts.operation.overlay.OverlayOp.prototype.labelIncompleteNodes=function(){var nodeCount=0;for(var ni=this.graph.getNodes().iterator();ni.hasNext();){var n=ni.next();var label=n.getLabel();if(n.isIsolated()){nodeCount++;if(label.isNull(0))
this.labelIncompleteNode(n,0);else
this.labelIncompleteNode(n,1);}
n.getEdges().updateLabelling(label);}};jsts.operation.overlay.OverlayOp.prototype.labelIncompleteNode=function(n,targetIndex){var loc=this.ptLocator.locate(n.getCoordinate(),this.arg[targetIndex].getGeometry());n.getLabel().setLocation(targetIndex,loc);};jsts.operation.overlay.OverlayOp.prototype.findResultAreaEdges=function(opCode){for(var it=this.graph.getEdgeEnds().iterator();it.hasNext();){var de=it.next();var label=de.getLabel();if(label.isArea()&&!de.isInteriorAreaEdge()&&jsts.operation.overlay.OverlayOp.isResultOfOp(label.getLocation(0,Position.RIGHT),label.getLocation(1,Position.RIGHT),opCode)){de.setInResult(true);}}};jsts.operation.overlay.OverlayOp.prototype.cancelDuplicateResultEdges=function(){for(var it=this.graph.getEdgeEnds().iterator();it.hasNext();){var de=it.next();var sym=de.getSym();if(de.isInResult()&&sym.isInResult()){de.setInResult(false);sym.setInResult(false);}}};jsts.operation.overlay.OverlayOp.prototype.isCoveredByLA=function(coord){if(this.isCovered(coord,this.resultLineList))
return true;if(this.isCovered(coord,this.resultPolyList))
return true;return false;};jsts.operation.overlay.OverlayOp.prototype.isCoveredByA=function(coord){if(this.isCovered(coord,this.resultPolyList))
return true;return false;};jsts.operation.overlay.OverlayOp.prototype.isCovered=function(coord,geomList){for(var it=geomList.iterator();it.hasNext();){var geom=it.next();var loc=this.ptLocator.locate(coord,geom);if(loc!=Location.EXTERIOR)
return true;}
return false;};jsts.operation.overlay.OverlayOp.prototype.computeGeometry=function(resultPointList,resultLineList,resultPolyList,opcode){var geomList=new ArrayList();geomList.addAll(resultPointList);geomList.addAll(resultLineList);geomList.addAll(resultPolyList);return this.geomFact.buildGeometry(geomList);};jsts.operation.overlay.OverlayOp.prototype.createEmptyResult=function(opCode){var result=null;switch(resultDimension(opCode,this.arg[0].getGeometry(),this.arg[1].getGeometry())){case-1:result=geomFact.createGeometryCollection();break;case 0:result=geomFact.createPoint(null);break;case 1:result=geomFact.createLineString(null);break;case 2:result=geomFact.createPolygon(null,null);break;}
return result;};jsts.operation.overlay.OverlayOp.prototype.resultDimension=function(opCode,g0,g1){var dim0=g0.getDimension();var dim1=g1.getDimension();var resultDimension=-1;switch(opCode){case jsts.operation.overlay.OverlayOp.INTERSECTION:resultDimension=Math.min(dim0,dim1);break;case jsts.operation.overlay.OverlayOp.UNION:resultDimension=Math.max(dim0,dim1);break;case jsts.operation.overlay.OverlayOp.DIFFERENCE:resultDimension=dim0;break;case jsts.operation.overlay.OverlayOp.SYMDIFFERENCE:resultDimension=Math.max(dim0,dim1);break;}
return resultDimension;};})();(function(){var NodeBase=function(){this.items=new javascript.util.ArrayList();this.subnode=[null,null];};NodeBase.getSubnodeIndex=function(interval,centre){var subnodeIndex=-1;if(interval.min>=centre){subnodeIndex=1;}
if(interval.max<=centre){subnodeIndex=0;}
return subnodeIndex;};NodeBase.prototype.getItems=function(){return this.items;};NodeBase.prototype.add=function(item){this.items.add(item);};NodeBase.prototype.addAllItems=function(items){items.addAll(this.items);var i=0,il=2;for(i;i<il;i++){if(this.subnode[i]!==null){this.subnode[i].addAllItems(items);}}
return items;};NodeBase.prototype.addAllItemsFromOverlapping=function(interval,resultItems){if(interval!==null&&!this.isSearchMatch(interval)){return;}
resultItems.addAll(this.items);if(this.subnode[0]!==null){this.subnode[0].addAllItemsFromOverlapping(interval,resultItems);}
if(this.subnode[1]!==null){this.subnode[1].addAllItemsFromOverlapping(interval,resultItems);}};NodeBase.prototype.remove=function(itemInterval,item){if(!this.isSearchMatch(itemInterval)){return false;}
var found=false,i=0,il=2;for(i;i<il;i++){if(this.subnode[i]!==null){found=this.subnode[i].remove(itemInterval,item);if(found){if(this.subnode[i].isPrunable()){this.subnode[i]=null;}
break;}}}
if(found){return found;}
found=this.items.remove(item);return found;};NodeBase.prototype.isPrunable=function(){return!(this.hasChildren()||this.hasItems());};NodeBase.prototype.hasChildren=function(){var i=0,il=2;for(i;i<il;i++){if(this.subnode[i]!==null){return true;}}
return false;};NodeBase.prototype.hasItems=function(){return!this.items.isEmpty();};NodeBase.prototype.depth=function(){var maxSubDepth=0,i=0,il=2,sqd;for(i;i<il;i++){if(this.subnode[i]!==null){sqd=this.subnode[i].depth();if(sqd>maxSubDepth){maxSubDepth=sqd;}}}
return maxSubDepth+1;};NodeBase.prototype.size=function(){var subSize=0,i=0,il=2;for(i;i<il;i++){if(this.subnode[i]!==null){subSize+=this.subnode[i].size();}}
return subSize+this.items.size();};NodeBase.prototype.nodeSize=function(){var subSize=0,i=0,il=2;for(i;i<il;i++){if(this.subnode[i]!==null){subSize+=this.subnode[i].nodeSize();}}
return subSize+1;};jsts.index.bintree.NodeBase=NodeBase;})();(function(){var Interval=function(){this.min=0.0;this.max=0.0;if(arguments.length===1){var interval=arguments[0];this.init(interval.min,interval.max);}else if(arguments.length===2){this.init(arguments[0],arguments[1]);}};Interval.prototype.init=function(min,max){this.min=min;this.max=max;if(min>max){this.min=max;this.max=min;}};Interval.prototype.getMin=function(){return this.min;};Interval.prototype.getMax=function(){return this.max;};Interval.prototype.getWidth=function(){return(this.max-this.min);};Interval.prototype.expandToInclude=function(interval){if(interval.max>this.max){this.max=interval.max;}
if(interval.min<this.min){this.min=interval.min;}};Interval.prototype.overlaps=function(){if(arguments.length===1){return this.overlapsInterval.apply(this,arguments);}else{return this.overlapsMinMax.apply(this,arguments);}};Interval.prototype.overlapsInterval=function(interval){return this.overlaps(interval.min,interval.max);};Interval.prototype.overlapsMinMax=function(min,max){if(this.min>max||this.max<min){return false;}
return true;};Interval.prototype.contains=function(){var interval;if(arguments[0]instanceof jsts.index.bintree.Interval){interval=arguments[0];return this.containsMinMax(interval.min,interval.max);}else if(arguments.length===1){return this.containsPoint(arguments[0]);}else{return this.containsMinMax(arguments[0],arguments[1]);}};Interval.prototype.containsMinMax=function(min,max){return(min>=this.min&&max<=this.max);};Interval.prototype.containsPoint=function(p){return(p>=this.min&&p<=this.max);};jsts.index.bintree.Interval=Interval;})();jsts.index.DoubleBits=function(){};jsts.index.DoubleBits.powerOf2=function(exp){return Math.pow(2,exp);};jsts.index.DoubleBits.exponent=function(d){return jsts.index.DoubleBits.CVTFWD(64,d)-1023;};jsts.index.DoubleBits.CVTFWD=function(NumW,Qty){var Sign,Expo,Mant,Bin,nb01='';var Inf={32:{d:0x7F,c:0x80,b:0,a:0},64:{d:0x7FF0,c:0,b:0,a:0}};var ExW={32:8,64:11}[NumW],MtW=NumW-ExW-1;if(!Bin){Sign=Qty<0||1/Qty<0;if(!isFinite(Qty)){Bin=Inf[NumW];if(Sign){Bin.d+=1<<(NumW/4-1);}
Expo=Math.pow(2,ExW)-1;Mant=0;}}
if(!Bin){Expo={32:127,64:1023}[NumW];Mant=Math.abs(Qty);while(Mant>=2){Expo++;Mant/=2;}
while(Mant<1&&Expo>0){Expo--;Mant*=2;}
if(Expo<=0){Mant/=2;nb01='Zero or Denormal';}
if(NumW===32&&Expo>254){nb01='Too big for Single';Bin={d:Sign?0xFF:0x7F,c:0x80,b:0,a:0};Expo=Math.pow(2,ExW)-1;Mant=0;}}
return Expo;};(function(){var DoubleBits=jsts.index.DoubleBits;var Interval=jsts.index.bintree.Interval;var Key=function(interval){this.pt=0.0;this.level=0;this.computeKey(interval);};Key.computeLevel=function(interval){var dx=interval.getWidth(),level;level=DoubleBits.exponent(dx)+1;return level;};Key.prototype.getPoint=function(){return this.pt;};Key.prototype.getLevel=function(){return this.level;};Key.prototype.getInterval=function(){return this.interval;};Key.prototype.computeKey=function(itemInterval){this.level=Key.computeLevel(itemInterval);this.interval=new Interval();this.computeInterval(this.level,itemInterval);while(!this.interval.contains(itemInterval)){this.level+=1;this.computeInterval(this.level,itemInterval);}};Key.prototype.computeInterval=function(level,itemInterval){var size=DoubleBits.powerOf2(level);this.pt=Math.floor(itemInterval.getMin()/size)*size;this.interval.init(this.pt,this.pt+size);};jsts.index.bintree.Key=Key;})();(function(){var NodeBase=jsts.index.bintree.NodeBase;var Key=jsts.index.bintree.Key;var Interval=jsts.index.bintree.Interval;var Node=function(interval,level){this.items=new javascript.util.ArrayList();this.subnode=[null,null];this.interval=interval;this.level=level;this.centre=(interval.getMin()+interval.getMax())/2;};Node.prototype=new NodeBase();Node.constructor=Node;Node.createNode=function(itemInterval){var key,node;key=new Key(itemInterval);node=new Node(key.getInterval(),key.getLevel());return node;};Node.createExpanded=function(node,addInterval){var expandInt,largerNode;expandInt=new Interval(addInterval);if(node!==null){expandInt.expandToInclude(node.interval);}
largerNode=Node.createNode(expandInt);if(node!==null){largerNode.insert(node);}
return largerNode;};Node.prototype.getInterval=function(){return this.interval;};Node.prototype.isSearchMatch=function(itemInterval){return itemInterval.overlaps(this.interval);};Node.prototype.getNode=function(searchInterval){var subnodeIndex=NodeBase.getSubnodeIndex(searchInterval,this.centre),node;if(subnodeIndex!=-1){node=this.getSubnode(subnodeIndex);return node.getNode(searchInterval);}else{return this;}};Node.prototype.find=function(searchInterval){var subnodeIndex=NodeBase.getSubnodeIndex(searchInterval,this.centre),node;if(subnodeIndex===-1){return this;}
if(this.subnode[subnodeIndex]!==null){node=this.subnode[subnodeIndex];return node.find(searchInterval);}
return this;};Node.prototype.insert=function(node){var index=NodeBase.getSubnodeIndex(node.interval,this.centre),childNode;if(node.level===this.level-1){this.subnode[index]=node;}else{childNode=this.createSubnode(index);childNode.insert(node);this.subnode[index]=childNode;}};Node.prototype.getSubnode=function(index){if(this.subnode[index]===null){this.subnode[index]=this.createSubnode(index);}
return this.subnode[index];};Node.prototype.createSubnode=function(index){var min,max,subInt,node;min=0.0;max=0.0;switch(index){case 0:min=this.interval.getMin();max=this.centre;break;case 1:min=this.centre;max=this.interval.getMax();break;}
subInt=new Interval(min,max);node=new Node(subInt,this.level-1);return node;};jsts.index.bintree.Node=Node;})();(function(){var Node=jsts.index.bintree.Node;var NodeBase=jsts.index.bintree.NodeBase;var Root=function(){this.subnode=[null,null];this.items=new javascript.util.ArrayList();};Root.prototype=new jsts.index.bintree.NodeBase();Root.constructor=Root;Root.origin=0.0;Root.prototype.insert=function(itemInterval,item){var index=NodeBase.getSubnodeIndex(itemInterval,Root.origin),node,largerNode;if(index===-1){this.add(item);return;}
node=this.subnode[index];if(node===null||!node.getInterval().contains(itemInterval)){largerNode=Node.createExpanded(node,itemInterval);this.subnode[index]=largerNode;}
this.insertContained(this.subnode[index],itemInterval,item);};Root.prototype.insertContained=function(tree,itemInterval,item){var isZeroArea,node;isZeroArea=jsts.index.IntervalSize.isZeroWidth(itemInterval.getMin(),itemInterval.getMax());node=isZeroArea?tree.find(itemInterval):tree.getNode(itemInterval);node.add(item);};Root.prototype.isSearchMatch=function(interval){return true;};jsts.index.bintree.Root=Root;})();(function(){var Interval=jsts.index.bintree.Interval;var Root=jsts.index.bintree.Root;var Bintree=function(){this.root=new Root();this.minExtent=1.0;};Bintree.ensureExtent=function(itemInterval,minExtent){var min,max;min=itemInterval.getMin();max=itemInterval.getMax();if(min!==max){return itemInterval;}
if(min===max){min=min-(minExtent/2.0);max=min+(minExtent/2.0);}
return new Interval(min,max);};Bintree.prototype.depth=function(){if(this.root!==null){return this.root.depth();}
return 0;};Bintree.prototype.size=function(){if(this.root!==null){return this.root.size();}
return 0;};Bintree.prototype.nodeSize=function(){if(this.root!==null){return this.root.nodeSize();}
return 0;};Bintree.prototype.insert=function(itemInterval,item){this.collectStats(itemInterval);var insertInterval=Bintree.ensureExtent(itemInterval,this.minExtent);this.root.insert(insertInterval,item);};Bintree.prototype.remove=function(itemInterval,item){var insertInterval=Bintree.ensureExtent(itemInterval,this.minExtent);return this.root.remove(insertInterval,item);};Bintree.prototype.iterator=function(){var foundItems=new javascript.util.ArrayList();this.root.addAllItems(foundItems);return foundItems.iterator();};Bintree.prototype.query=function(){if(arguments.length===2){this.queryAndAdd(arguments[0],arguments[1]);}else{var x=arguments[0];if(!x instanceof Interval){x=new Interval(x,x);}
return this.queryInterval(x);}};Bintree.prototype.queryInterval=function(interval){var foundItems=new javascript.util.ArrayList();this.query(interval,foundItems);return foundItems;};Bintree.prototype.queryAndAdd=function(interval,foundItems){this.root.addAllItemsFromOverlapping(interval,foundItems);};Bintree.prototype.collectStats=function(interval){var del=interval.getWidth();if(del<this.minExtent&&del>0.0){this.minExtent=del;}};jsts.index.bintree.Bintree=Bintree;})();jsts.index.IntervalSize=function(){};jsts.index.IntervalSize.MIN_BINARY_EXPONENT=-50;jsts.index.IntervalSize.isZeroWidth=function(min,max){var width=max-min;if(width===0.0){return true;}
var maxAbs,scaledInterval,level;maxAbs=Math.max(Math.abs(min),Math.abs(max));scaledInterval=width/maxAbs;level=jsts.index.DoubleBits.exponent(scaledInterval);return level<=jsts.index.IntervalSize.MIN_BINARY_EXPONENT;};jsts.geomgraph.index.SimpleEdgeSetIntersector=function(){};jsts.geomgraph.index.SimpleEdgeSetIntersector.prototype=new jsts.geomgraph.index.EdgeSetIntersector();jsts.geomgraph.index.SimpleEdgeSetIntersector.prototype.nOverlaps=0;jsts.geomgraph.index.SimpleEdgeSetIntersector.prototype.computeIntersections=function(edges,si,testAllSegments){if(si instanceof javascript.util.List){this.computeIntersections2.apply(this,arguments);return;}
this.nOverlaps=0;for(var i0=edges.iterator();i0.hasNext();){var edge0=i0.next();for(var i1=edges.iterator();i1.hasNext();){var edge1=i1.next();if(testAllSegments||edge0!=edge1)
this.computeIntersects(edge0,edge1,si);}}};jsts.geomgraph.index.SimpleEdgeSetIntersector.prototype.computeIntersections2=function(edges0,edges1,si){this.nOverlaps=0;for(var i0=edges0.iterator();i0.hasNext();){var edge0=i0.next();for(var i1=edges1.iterator();i1.hasNext();){var edge1=i1.next();this.computeIntersects(edge0,edge1,si);}}};jsts.geomgraph.index.SimpleEdgeSetIntersector.prototype.computeIntersects=function(e0,e1,si){var pts0=e0.getCoordinates();var pts1=e1.getCoordinates();var i0,i1;for(i0=0;i0<pts0.length-1;i0++){for(i1=0;i1<pts1.length-1;i1++){si.addIntersections(e0,i0,e1,i1);}}};jsts.index.ArrayListVisitor=function(){this.items=[];};jsts.index.ArrayListVisitor.prototype.visitItem=function(item){this.items.push(item);};jsts.index.ArrayListVisitor.prototype.getItems=function(){return this.items;};(function(){var ArrayList=javascript.util.ArrayList;var GeometryTransformer=function(){};GeometryTransformer.prototype.inputGeom=null;GeometryTransformer.prototype.factory=null;GeometryTransformer.prototype.pruneEmptyGeometry=true;GeometryTransformer.prototype.preserveGeometryCollectionType=true;GeometryTransformer.prototype.preserveCollections=false;GeometryTransformer.prototype.reserveType=false;GeometryTransformer.prototype.getInputGeometry=function(){return this.inputGeom;};GeometryTransformer.prototype.transform=function(inputGeom){this.inputGeom=inputGeom;this.factory=inputGeom.getFactory();if(inputGeom instanceof jsts.geom.Point)
return this.transformPoint(inputGeom,null);if(inputGeom instanceof jsts.geom.MultiPoint)
return this.transformMultiPoint(inputGeom,null);if(inputGeom instanceof jsts.geom.LinearRing)
return this.transformLinearRing(inputGeom,null);if(inputGeom instanceof jsts.geom.LineString)
return this.transformLineString(inputGeom,null);if(inputGeom instanceof jsts.geom.MultiLineString)
return this.transformMultiLineString(inputGeom,null);if(inputGeom instanceof jsts.geom.Polygon)
return this.transformPolygon(inputGeom,null);if(inputGeom instanceof jsts.geom.MultiPolygon)
return this.transformMultiPolygon(inputGeom,null);if(inputGeom instanceof jsts.geom.GeometryCollection)
return this.transformGeometryCollection(inputGeom,null);throw new jsts.error.IllegalArgumentException('Unknown Geometry subtype: '+
inputGeom.getClass().getName());};GeometryTransformer.prototype.createCoordinateSequence=function(coords){return this.factory.getCoordinateSequenceFactory().create(coords);};GeometryTransformer.prototype.copy=function(seq){return seq.clone();};GeometryTransformer.prototype.transformCoordinates=function(coords,parent){return this.copy(coords);};GeometryTransformer.prototype.transformPoint=function(geom,parent){return this.factory.createPoint(this.transformCoordinates(geom.getCoordinateSequence(),geom));};GeometryTransformer.prototype.transformMultiPoint=function(geom,parent){var transGeomList=new ArrayList();for(var i=0;i<geom.getNumGeometries();i++){var transformGeom=this.transformPoint(geom.getGeometryN(i),geom);if(transformGeom==null)
continue;if(transformGeom.isEmpty())
continue;transGeomList.add(transformGeom);}
return this.factory.buildGeometry(transGeomList);};GeometryTransformer.prototype.transformLinearRing=function(geom,parent){var seq=this.transformCoordinates(geom.getCoordinateSequence(),geom);var seqSize=seq.length;if(seqSize>0&&seqSize<4&&!this.preserveType)
return this.factory.createLineString(seq);return this.factory.createLinearRing(seq);};GeometryTransformer.prototype.transformLineString=function(geom,parent){return this.factory.createLineString(this.transformCoordinates(geom.getCoordinateSequence(),geom));};GeometryTransformer.prototype.transformMultiLineString=function(geom,parent){var transGeomList=new ArrayList();for(var i=0;i<geom.getNumGeometries();i++){var transformGeom=this.transformLineString(geom.getGeometryN(i),geom);if(transformGeom==null)
continue;if(transformGeom.isEmpty())
continue;transGeomList.add(transformGeom);}
return this.factory.buildGeometry(transGeomList);};GeometryTransformer.prototype.transformPolygon=function(geom,parent){var isAllValidLinearRings=true;var shell=this.transformLinearRing(geom.getExteriorRing(),geom);if(shell==null||!(shell instanceof jsts.geom.LinearRing)||shell.isEmpty())
isAllValidLinearRings=false;var holes=new ArrayList();for(var i=0;i<geom.getNumInteriorRing();i++){var hole=this.transformLinearRing(geom.getInteriorRingN(i),geom);if(hole==null||hole.isEmpty()){continue;}
if(!(hole instanceof jsts.geom.LinearRing))
isAllValidLinearRings=false;holes.add(hole);}
if(isAllValidLinearRings)
return this.factory.createPolygon(shell,holes.toArray());else{var components=new ArrayList();if(shell!=null)
components.add(shell);components.addAll(holes);return this.factory.buildGeometry(components);}};GeometryTransformer.prototype.transformMultiPolygon=function(geom,parent){var transGeomList=new ArrayList();for(var i=0;i<geom.getNumGeometries();i++){var transformGeom=this.transformPolygon(geom.getGeometryN(i),geom);if(transformGeom==null)
continue;if(transformGeom.isEmpty())
continue;transGeomList.add(transformGeom);}
return this.factory.buildGeometry(transGeomList);};GeometryTransformer.prototype.transformGeometryCollection=function(geom,parent){var transGeomList=new ArrayList();for(var i=0;i<geom.getNumGeometries();i++){var transformGeom=this.transform(geom.getGeometryN(i));if(transformGeom==null)
continue;if(this.pruneEmptyGeometry&&transformGeom.isEmpty())
continue;transGeomList.add(transformGeom);}
if(this.preserveGeometryCollectionType)
return this.factory.createGeometryCollection(GeometryFactory.toGeometryArray(transGeomList));return this.factory.buildGeometry(transGeomList);};jsts.geom.util.GeometryTransformer=GeometryTransformer;})();(function(){var LineStringSnapper=jsts.operation.overlay.snap.LineStringSnapper;var PrecisionModel=jsts.geom.PrecisionModel;var TreeSet=javascript.util.TreeSet;var SnapTransformer=function(snapTolerance,snapPts,isSelfSnap){this.snapTolerance=snapTolerance;this.snapPts=snapPts;this.isSelfSnap=isSelfSnap||false;};SnapTransformer.prototype=new jsts.geom.util.GeometryTransformer();SnapTransformer.prototype.snapTolerance=null;SnapTransformer.prototype.snapPts=null;SnapTransformer.prototype.isSelfSnap=false;SnapTransformer.prototype.transformCoordinates=function(coords,parent){var srcPts=coords;var newPts=this.snapLine(srcPts,this.snapPts);return newPts;};SnapTransformer.prototype.snapLine=function(srcPts,snapPts){var snapper=new LineStringSnapper(srcPts,this.snapTolerance);snapper.setAllowSnappingToSourceVertices(this.isSelfSnap);return snapper.snapTo(snapPts);};var GeometrySnapper=function(srcGeom){this.srcGeom=srcGeom;};GeometrySnapper.SNAP_PRECISION_FACTOR=1e-9;GeometrySnapper.computeOverlaySnapTolerance=function(g){if(arguments.length===2){return GeometrySnapper.computeOverlaySnapTolerance2.apply(this,arguments);}
var snapTolerance=this.computeSizeBasedSnapTolerance(g);var pm=g.getPrecisionModel();if(pm.getType()==PrecisionModel.FIXED){var fixedSnapTol=(1/pm.getScale())*2/1.415;if(fixedSnapTol>snapTolerance)
snapTolerance=fixedSnapTol;}
return snapTolerance;};GeometrySnapper.computeSizeBasedSnapTolerance=function(g){var env=g.getEnvelopeInternal();var minDimension=Math.min(env.getHeight(),env.getWidth());var snapTol=minDimension*GeometrySnapper.SNAP_PRECISION_FACTOR;return snapTol;};GeometrySnapper.computeOverlaySnapTolerance2=function(g0,g1){return Math.min(this.computeOverlaySnapTolerance(g0),this.computeOverlaySnapTolerance(g1));};GeometrySnapper.snap=function(g0,g1,snapTolerance){var snapGeom=[];var snapper0=new GeometrySnapper(g0);snapGeom[0]=snapper0.snapTo(g1,snapTolerance);var snapper1=new GeometrySnapper(g1);snapGeom[1]=snapper1.snapTo(snapGeom[0],snapTolerance);return snapGeom;};GeometrySnapper.snapToSelf=function(g0,snapTolerance,cleanResult){var snapper0=new GeometrySnapper(g0);return snapper0.snapToSelf(snapTolerance,cleanResult);};GeometrySnapper.prototype.srcGeom=null;GeometrySnapper.prototype.snapTo=function(snapGeom,snapTolerance){var snapPts=this.extractTargetCoordinates(snapGeom);var snapTrans=new SnapTransformer(snapTolerance,snapPts);return snapTrans.transform(this.srcGeom);};GeometrySnapper.prototype.snapToSelf=function(snapTolerance,cleanResult){var snapPts=this.extractTargetCoordinates(srcGeom);var snapTrans=new SnapTransformer(snapTolerance,snapPts,true);var snappedGeom=snapTrans.transform(srcGeom);var result=snappedGeom;if(cleanResult&&result instanceof Polygonal){result=snappedGeom.buffer(0);}
return result;};GeometrySnapper.prototype.extractTargetCoordinates=function(g){var ptSet=new TreeSet();var pts=g.getCoordinates();for(var i=0;i<pts.length;i++){ptSet.add(pts[i]);}
return ptSet.toArray();};GeometrySnapper.prototype.computeSnapTolerance=function(ringPts){var minSegLen=this.computeMinimumSegmentLength(ringPts);var snapTol=minSegLen/10;return snapTol;};GeometrySnapper.prototype.computeMinimumSegmentLength=function(pts){var minSegLen=Number.MAX_VALUE;for(var i=0;i<pts.length-1;i++){var segLen=pts[i].distance(pts[i+1]);if(segLen<minSegLen)
minSegLen=segLen;}
return minSegLen;};jsts.operation.overlay.snap.GeometrySnapper=GeometrySnapper;})();(function(){var OverlayOp=jsts.operation.overlay.OverlayOp;var GeometrySnapper=jsts.operation.overlay.snap.GeometrySnapper;var SnapOverlayOp=function(g1,g2){this.geom=[];this.geom[0]=g1;this.geom[1]=g2;this.computeSnapTolerance();};SnapOverlayOp.overlayOp=function(g0,g1,opCode){var op=new SnapOverlayOp(g0,g1);return op.getResultGeometry(opCode);};SnapOverlayOp.intersection=function(g0,g1){return this.overlayOp(g0,g1,OverlayOp.INTERSECTION);};SnapOverlayOp.union=function(g0,g1){return this.overlayOp(g0,g1,OverlayOp.UNION);};SnapOverlayOp.difference=function(g0,g1){return overlayOp(g0,g1,OverlayOp.DIFFERENCE);};SnapOverlayOp.symDifference=function(g0,g1){return overlayOp(g0,g1,OverlayOp.SYMDIFFERENCE);};SnapOverlayOp.prototype.geom=null;SnapOverlayOp.prototype.snapTolerance=null;SnapOverlayOp.prototype.computeSnapTolerance=function(){this.snapTolerance=GeometrySnapper.computeOverlaySnapTolerance(this.geom[0],this.geom[1]);};SnapOverlayOp.prototype.getResultGeometry=function(opCode){var prepGeom=this.snap(this.geom);var result=OverlayOp.overlayOp(prepGeom[0],prepGeom[1],opCode);return this.prepareResult(result);};SnapOverlayOp.prototype.selfSnap=function(geom){var snapper0=new GeometrySnapper(geom);var snapGeom=snapper0.snapTo(geom,this.snapTolerance);return snapGeom;};SnapOverlayOp.prototype.snap=function(geom){var remGeom=geom;var snapGeom=GeometrySnapper.snap(remGeom[0],remGeom[1],this.snapTolerance);return snapGeom;};SnapOverlayOp.prototype.prepareResult=function(geom){return geom;};SnapOverlayOp.prototype.cbr=null;SnapOverlayOp.prototype.removeCommonBits=function(geom){this.cbr=new jsts.precision.CommonBitsRemover();this.cbr.add(this.geom[0]);this.cbr.add(this.geom[1]);var remGeom=[];remGeom[0]=cbr.removeCommonBits(this.geom[0].clone());remGeom[1]=cbr.removeCommonBits(this.geom[1].clone());return remGeom;};jsts.operation.overlay.snap.SnapOverlayOp=SnapOverlayOp;})();jsts.noding.Octant=function(){throw jsts.error.AbstractMethodInvocationError();};jsts.noding.Octant.octant=function(dx,dy){if(dx instanceof jsts.geom.Coordinate){return jsts.noding.Octant.octant2.apply(this,arguments);}
if(dx===0.0&&dy===0.0)
throw new jsts.error.IllegalArgumentError('Cannot compute the octant for point ( '+dx+', '+dy+' )');var adx=Math.abs(dx);var ady=Math.abs(dy);if(dx>=0){if(dy>=0){if(adx>=ady)
return 0;else
return 1;}
else{if(adx>=ady)
return 7;else
return 6;}}
else{if(dy>=0){if(adx>=ady)
return 3;else
return 2;}
else{if(adx>=ady)
return 4;else
return 5;}}};jsts.noding.Octant.octant2=function(p0,p1){var dx=p1.x-p0.x;var dy=p1.y-p0.y;if(dx===0.0&&dy===0.0)
throw new jsts.error.IllegalArgumentError('Cannot compute the octant for two identical points '+p0);return jsts.noding.Octant.octant(dx,dy);};jsts.operation.union.UnionInteracting=function(g0,g1){this.g0=g0;this.g1=g1;this.geomFactory=g0.getFactory();this.interacts0=[];this.interacts1=[];};jsts.operation.union.UnionInteracting.union=function(g0,g1){var uue=new jsts.operation.union.UnionInteracting(g0,g1);return uue.union();};jsts.operation.union.UnionInteracting.prototype.geomFactory=null;jsts.operation.union.UnionInteracting.prototype.g0=null;jsts.operation.union.UnionInteracting.prototype.g1=null;jsts.operation.union.UnionInteracting.prototype.interacts0=null;jsts.operation.union.UnionInteracting.prototype.interacts1=null;jsts.operation.union.UnionInteracting.prototype.union=function(){this.computeInteracting();var int0=this.extractElements(this.g0,this.interacts0,true);var int1=this.extractElements(this.g1,this.interacts1,true);if(int0.isEmpty()||int1.isEmpty()){}
var union=in0.union(int1);var disjoint0=this.extractElements(this.g0,this.interacts0,false);var disjoint1=this.extractElements(this.g1,this.interacts1,false);var overallUnion=jsts.geom.util.GeometryCombiner.combine(union,disjoint0,disjoint1);return overallUnion;};jsts.operation.union.UnionInteracting.prototype.bufferUnion=function(g0,g1){var factory=g0.getFactory();var gColl=factory.createGeometryCollection([g0,g1]);var unionAll=gColl.buffer(0.0);return unionAll;};jsts.operation.union.UnionInteracting.prototype.computeInteracting=function(elem0){if(!elem0){for(var i=0,l=this.g0.getNumGeometries();i<l;i++){var elem=this.g0.getGeometryN(i);this.interacts0[i]=this.computeInteracting(elem);}}
else{var interactsWithAny=false;for(var i=0,l=g1.getNumGeometries();i<l;i++){var elem1=this.g1.getGeometryN(i);var interacts=elem1.getEnvelopeInternal().intersects(elem0.getEnvelopeInternal());if(interacts){this.interacts1[i]=true;interactsWithAny=true;}}
return interactsWithAny;}};jsts.operation.union.UnionInteracting.prototype.extractElements=function(geom,interacts,isInteracting){var extractedGeoms=[];for(var i=0,l=geom.getNumGeometries();i<l;i++){var elem=geom.getGeometryN(i);if(interacts[i]===isInteracting){extractedGeoms.push(elem);}}
return this.geomFactory.buildGeometry(extractedGeoms);};jsts.operation.union.PointGeometryUnion=function(pointGeom,otherGeom){this.pointGeom=pointGeom;this.otherGeom=otherGeom;this.geomFact=otherGeom.getFactory();};jsts.operation.union.PointGeometryUnion.union=function(pointGeom,otherGeom){var unioner=new jsts.operation.union.PointGeometryUnion(pointGeom,otherGeom);return unioner.union();};jsts.operation.union.PointGeometryUnion.prototype.pointGeom=null;jsts.operation.union.PointGeometryUnion.prototype.otherGeom=null;jsts.operation.union.PointGeometryUnion.prototype.geomFact=null;jsts.operation.union.PointGeometryUnion.prototype.union=function(){var locator=new jsts.algorithm.PointLocator();var exteriorCoords=[];for(var i=0,l=this.pointGeom.getNumGeometries();i<l;i++){var point=this.pointGeom.getGeometryN(i);var coord=point.getCoordinate();var loc=locator.locate(coord,this.otherGeom);if(loc===jsts.geom.Location.EXTERIOR){var include=true;for(var j=exteriorCoords.length;i--;){if(exteriorCoords[j].equals(coord)){include=false;break;}}
if(include){exteriorCoords.push(coord);}}}
exteriorCoords.sort(function(x,y){return x.compareTo(y);});if(exteriorCoords.length===0){return this.otherGeom;}
var ptComp=null;var coords=jsts.geom.CoordinateArrays.toCoordinateArray(exteriorCoords);if(coords.length===1){ptComp=this.geomFact.createPoint(coords[0]);}
else{ptComp=this.geomFact.createMultiPoint(coords);}
return jsts.geom.util.GeometryCombiner.combine(ptComp,this.otherGeom);};jsts.noding.IntersectionFinderAdder=function(li){this.li=li;this.interiorIntersections=new javascript.util.ArrayList();};jsts.noding.IntersectionFinderAdder.prototype=new jsts.noding.SegmentIntersector();jsts.noding.IntersectionFinderAdder.constructor=jsts.noding.IntersectionFinderAdder;jsts.noding.IntersectionFinderAdder.prototype.li=null;jsts.noding.IntersectionFinderAdder.prototype.interiorIntersections=null;jsts.noding.IntersectionFinderAdder.prototype.getInteriorIntersections=function(){return this.interiorIntersections;};jsts.noding.IntersectionFinderAdder.prototype.processIntersections=function(e0,segIndex0,e1,segIndex1){if(e0===e1&&segIndex0===segIndex1)
return;var p00=e0.getCoordinates()[segIndex0];var p01=e0.getCoordinates()[segIndex0+1];var p10=e1.getCoordinates()[segIndex1];var p11=e1.getCoordinates()[segIndex1+1];this.li.computeIntersection(p00,p01,p10,p11);if(this.li.hasIntersection()){if(this.li.isInteriorIntersection()){for(var intIndex=0;intIndex<this.li.getIntersectionNum();intIndex++){this.interiorIntersections.add(this.li.getIntersection(intIndex));}
e0.addIntersections(this.li,segIndex0,0);e1.addIntersections(this.li,segIndex1,1);}}};jsts.noding.IntersectionFinderAdder.prototype.isDone=function(){return false;};jsts.noding.snapround.MCIndexSnapRounder=function(pm){this.pm=pm;this.li=new jsts.algorithm.RobustLineIntersector();this.li.setPrecisionModel(pm);this.scaleFactor=pm.getScale();};jsts.noding.snapround.MCIndexSnapRounder.prototype=new jsts.noding.Noder();jsts.noding.snapround.MCIndexSnapRounder.constructor=jsts.noding.snapround.MCIndexSnapRounder;jsts.noding.snapround.MCIndexSnapRounder.prototype.pm=null;jsts.noding.snapround.MCIndexSnapRounder.prototype.li=null;jsts.noding.snapround.MCIndexSnapRounder.prototype.scaleFactor=null;jsts.noding.snapround.MCIndexSnapRounder.prototype.noder=null;jsts.noding.snapround.MCIndexSnapRounder.prototype.pointSnapper=null;jsts.noding.snapround.MCIndexSnapRounder.prototype.nodedSegStrings=null;jsts.noding.snapround.MCIndexSnapRounder.prototype.getNodedSubstrings=function(){return jsts.noding.NodedSegmentString.getNodedSubstrings(this.nodedSegStrings);};jsts.noding.snapround.MCIndexSnapRounder.prototype.computeNodes=function(inputSegmentStrings){this.nodedSegStrings=inputSegmentStrings;this.noder=new jsts.noding.MCIndexNoder();this.pointSnapper=new jsts.noding.snapround.MCIndexPointSnapper(this.noder.getIndex());this.snapRound(inputSegmentStrings,this.li);};jsts.noding.snapround.MCIndexSnapRounder.prototype.snapRound=function(segStrings,li){var intersections=this.findInteriorIntersections(segStrings,li);this.computeIntersectionSnaps(intersections);this.computeVertexSnaps(segStrings);};jsts.noding.snapround.MCIndexSnapRounder.prototype.findInteriorIntersections=function(segStrings,li){var intFinderAdder=new jsts.noding.IntersectionFinderAdder(li);this.noder.setSegmentIntersector(intFinderAdder);this.noder.computeNodes(segStrings);return intFinderAdder.getInteriorIntersections();};jsts.noding.snapround.MCIndexSnapRounder.prototype.computeIntersectionSnaps=function(snapPts){for(var it=snapPts.iterator();it.hasNext();){var snapPt=it.next();var hotPixel=new jsts.noding.snapround.HotPixel(snapPt,this.scaleFactor,this.li);this.pointSnapper.snap(hotPixel);}};jsts.noding.snapround.MCIndexSnapRounder.prototype.computeVertexSnaps=function(edges){if(edges instanceof jsts.noding.NodedSegmentString){this.computeVertexSnaps2.apply(this,arguments);return;}
for(var i0=edges.iterator();i0.hasNext();){var edge0=i0.next();this.computeVertexSnaps(edge0);}};jsts.noding.snapround.MCIndexSnapRounder.prototype.computeVertexSnaps2=function(e){var pts0=e.getCoordinates();for(var i=0;i<pts0.length-1;i++){var hotPixel=new jsts.noding.snapround.HotPixel(pts0[i],this.scaleFactor,this.li);var isNodeAdded=this.pointSnapper.snap(hotPixel,e,i);if(isNodeAdded){e.addIntersection(pts0[i],i);}}};jsts.operation.valid.ConnectedInteriorTester=function(geomGraph){this.geomGraph=geomGraph;this.geometryFactory=new jsts.geom.GeometryFactory();this.disconnectedRingcoord=null;};jsts.operation.valid.ConnectedInteriorTester.findDifferentPoint=function(coord,pt){var i=0,il=coord.length;for(i;i<il;i++){if(!coord[i].equals(pt))
return coord[i];}
return null;};jsts.operation.valid.ConnectedInteriorTester.prototype.getCoordinate=function(){return this.disconnectedRingcoord;};jsts.operation.valid.ConnectedInteriorTester.prototype.isInteriorsConnected=function(){var splitEdges=new javascript.util.ArrayList();this.geomGraph.computeSplitEdges(splitEdges);var graph=new jsts.geomgraph.PlanarGraph(new jsts.operation.overlay.OverlayNodeFactory());graph.addEdges(splitEdges);this.setInteriorEdgesInResult(graph);graph.linkResultDirectedEdges();var edgeRings=this.buildEdgeRings(graph.getEdgeEnds());this.visitShellInteriors(this.geomGraph.getGeometry(),graph);return!this.hasUnvisitedShellEdge(edgeRings);};jsts.operation.valid.ConnectedInteriorTester.prototype.setInteriorEdgesInResult=function(graph){var it=graph.getEdgeEnds().iterator(),de;while(it.hasNext()){de=it.next();if(de.getLabel().getLocation(0,jsts.geomgraph.Position.RIGHT)==jsts.geom.Location.INTERIOR){de.setInResult(true);}}};jsts.operation.valid.ConnectedInteriorTester.prototype.buildEdgeRings=function(dirEdges){var edgeRings=new javascript.util.ArrayList();for(var it=dirEdges.iterator();it.hasNext();){var de=it.next();if(de.isInResult()&&de.getEdgeRing()==null){var er=new jsts.operation.overlay.MaximalEdgeRing(de,this.geometryFactory);er.linkDirectedEdgesForMinimalEdgeRings();var minEdgeRings=er.buildMinimalRings();var i=0,il=minEdgeRings.length;for(i;i<il;i++){edgeRings.add(minEdgeRings[i]);}}}
return edgeRings;};jsts.operation.valid.ConnectedInteriorTester.prototype.visitShellInteriors=function(g,graph){if(g instanceof jsts.geom.Polygon){var p=g;this.visitInteriorRing(p.getExteriorRing(),graph);}
if(g instanceof jsts.geom.MultiPolygon){var mp=g;for(var i=0;i<mp.getNumGeometries();i++){var p=mp.getGeometryN(i);this.visitInteriorRing(p.getExteriorRing(),graph);}}};jsts.operation.valid.ConnectedInteriorTester.prototype.visitInteriorRing=function(ring,graph){var pts=ring.getCoordinates();var pt0=pts[0];var pt1=jsts.operation.valid.ConnectedInteriorTester.findDifferentPoint(pts,pt0);var e=graph.findEdgeInSameDirection(pt0,pt1);var de=graph.findEdgeEnd(e);var intDe=null;if(de.getLabel().getLocation(0,jsts.geomgraph.Position.RIGHT)==jsts.geom.Location.INTERIOR){intDe=de;}else if(de.getSym().getLabel().getLocation(0,jsts.geomgraph.Position.RIGHT)==jsts.geom.Location.INTERIOR){intDe=de.getSym();}
this.visitLinkedDirectedEdges(intDe);};jsts.operation.valid.ConnectedInteriorTester.prototype.visitLinkedDirectedEdges=function(start){var startDe=start;var de=start;do{de.setVisited(true);de=de.getNext();}while(de!=startDe);};jsts.operation.valid.ConnectedInteriorTester.prototype.hasUnvisitedShellEdge=function(edgeRings){for(var i=0;i<edgeRings.size();i++){var er=edgeRings.get(i);if(er.isHole()){continue;}
var edges=er.getEdges();var de=edges[0];if(de.getLabel().getLocation(0,jsts.geomgraph.Position.RIGHT)!=jsts.geom.Location.INTERIOR){continue;}
for(var j=0;j<edges.length;j++){de=edges[j];if(!de.isVisited()){disconnectedRingcoord=de.getCoordinate();return true;}}}
return false;};jsts.index.chain.MonotoneChainSelectAction=function(){this.tempEnv1=new jsts.geom.Envelope();this.selectedSegment=new jsts.geom.LineSegment();};jsts.index.chain.MonotoneChainSelectAction.prototype.tempEnv1=null;jsts.index.chain.MonotoneChainSelectAction.prototype.selectedSegment=null;jsts.index.chain.MonotoneChainSelectAction.prototype.select=function(mc,start){mc.getLineSegment(start,this.selectedSegment);this.select2(this.selectedSegment);};jsts.index.chain.MonotoneChainSelectAction.prototype.select2=function(seg){};jsts.algorithm.MCPointInRing=function(ring){this.ring=ring;this.tree=null;this.crossings=0;this.interval=new jsts.index.bintree.Interval();this.buildIndex();};jsts.algorithm.MCPointInRing.MCSelecter=function(p,parent){this.parent=parent;this.p=p;};jsts.algorithm.MCPointInRing.MCSelecter.prototype=new jsts.index.chain.MonotoneChainSelectAction;jsts.algorithm.MCPointInRing.MCSelecter.prototype.constructor=jsts.algorithm.MCPointInRing.MCSelecter;jsts.algorithm.MCPointInRing.MCSelecter.prototype.select2=function(ls){this.parent.testLineSegment.apply(this.parent,[this.p,ls]);};jsts.algorithm.MCPointInRing.prototype.buildIndex=function(){this.tree=new jsts.index.bintree.Bintree();var pts=jsts.geom.CoordinateArrays.removeRepeatedPoints(this.ring.getCoordinates());var mcList=jsts.index.chain.MonotoneChainBuilder.getChains(pts);for(var i=0;i<mcList.length;i++){var mc=mcList[i];var mcEnv=mc.getEnvelope();this.interval.min=mcEnv.getMinY();this.interval.max=mcEnv.getMaxY();this.tree.insert(this.interval,mc);}};jsts.algorithm.MCPointInRing.prototype.isInside=function(pt){this.crossings=0;var rayEnv=new jsts.geom.Envelope(-Number.MAX_VALUE,Number.MAX_VALUE,pt.y,pt.y);this.interval.min=pt.y;this.interval.max=pt.y;var segs=this.tree.query(this.interval);var mcSelecter=new jsts.algorithm.MCPointInRing.MCSelecter(pt,this);for(var i=segs.iterator();i.hasNext();){var mc=i.next();this.testMonotoneChain(rayEnv,mcSelecter,mc);}
if((this.crossings%2)==1){return true;}
return false;};jsts.algorithm.MCPointInRing.prototype.testMonotoneChain=function(rayEnv,mcSelecter,mc){mc.select(rayEnv,mcSelecter);};jsts.algorithm.MCPointInRing.prototype.testLineSegment=function(p,seg){var xInt,x1,y1,x2,y2,p1,p2;p1=seg.p0;p2=seg.p1;x1=p1.x-p.x;y1=p1.y-p.y;x2=p2.x-p.x;y2=p2.y-p.y;if(((y1>0)&&(y2<=0))||((y2>0)&&(y1<=0))){xInt=jsts.algorithm.RobustDeterminant.signOfDet2x2(x1,y1,x2,y2)/(y2-y1);if(0.0<xInt){this.crossings++;}}};jsts.operation.valid.TopologyValidationError=function(errorType,pt){this.errorType=errorType;this.pt=null;if(pt!=null){this.pt=pt.clone();}};jsts.operation.valid.TopologyValidationError.HOLE_OUTSIDE_SHELL=2;jsts.operation.valid.TopologyValidationError.NESTED_HOLES=3;jsts.operation.valid.TopologyValidationError.DISCONNECTED_INTERIOR=4;jsts.operation.valid.TopologyValidationError.SELF_INTERSECTION=5;jsts.operation.valid.TopologyValidationError.RING_SELF_INTERSECTION=6;jsts.operation.valid.TopologyValidationError.NESTED_SHELLS=7;jsts.operation.valid.TopologyValidationError.DUPLICATE_RINGS=8;jsts.operation.valid.TopologyValidationError.TOO_FEW_POINTS=9;jsts.operation.valid.TopologyValidationError.INVALID_COORDINATE=10;jsts.operation.valid.TopologyValidationError.RING_NOT_CLOSED=11;jsts.operation.valid.TopologyValidationError.prototype.errMsg=['Topology Validation Error','Repeated Point','Hole lies outside shell','Holes are nested','Interior is disconnected','Self-intersection','Ring Self-intersection','Nested shells','Duplicate Rings','Too few distinct points in geometry component','Invalid Coordinate','Ring is not closed'];jsts.operation.valid.TopologyValidationError.prototype.getCoordinate=function(){return this.pt;};jsts.operation.valid.TopologyValidationError.prototype.getErrorType=function(){return this.errorType;};jsts.operation.valid.TopologyValidationError.prototype.getMessage=function(){return this.errMsg[this.errorType];};jsts.operation.valid.TopologyValidationError.prototype.toString=function(){var locStr='';if(this.pt!=null){locStr=' at or near point '+this.pt;return this.getMessage()+locStr;}
return locStr;};(function(){var Geometry=jsts.geom.Geometry;var TreeSet=javascript.util.TreeSet;var Arrays=javascript.util.Arrays;jsts.geom.GeometryCollection=function(geometries,factory){this.geometries=geometries||[];this.factory=factory;};jsts.geom.GeometryCollection.prototype=new Geometry();jsts.geom.GeometryCollection.constructor=jsts.geom.GeometryCollection;jsts.geom.GeometryCollection.prototype.isEmpty=function(){for(var i=0,len=this.geometries.length;i<len;i++){var geometry=this.getGeometryN(i);if(!geometry.isEmpty()){return false;}}
return true;};jsts.geom.Geometry.prototype.getArea=function(){var area=0.0;for(var i=0,len=this.geometries.length;i<len;i++){area+=this.getGeometryN(i).getArea();}
return area;};jsts.geom.Geometry.prototype.getLength=function(){var length=0.0;for(var i=0,len=this.geometries.length;i<len;i++){length+=this.getGeometryN(i).getLength();}
return length;};jsts.geom.GeometryCollection.prototype.getCoordinate=function(){if(this.isEmpty())
return null;return this.getGeometryN(0).getCoordinate();};jsts.geom.GeometryCollection.prototype.getCoordinates=function(){var coordinates=[];var k=-1;for(var i=0,len=this.geometries.length;i<len;i++){var geometry=this.getGeometryN(i);var childCoordinates=geometry.getCoordinates();for(var j=0;j<childCoordinates.length;j++){k++;coordinates[k]=childCoordinates[j];}}
return coordinates;};jsts.geom.GeometryCollection.prototype.getNumGeometries=function(){return this.geometries.length;};jsts.geom.GeometryCollection.prototype.getGeometryN=function(n){var geometry=this.geometries[n];if(geometry instanceof jsts.geom.Coordinate){geometry=new jsts.geom.Point(geometry);}
return geometry;};jsts.geom.GeometryCollection.prototype.equalsExact=function(other,tolerance){if(!this.isEquivalentClass(other)){return false;}
if(this.geometries.length!==other.geometries.length){return false;}
for(var i=0,len=this.geometries.length;i<len;i++){var geometry=this.getGeometryN(i);if(!geometry.equalsExact(other.getGeometryN(i),tolerance)){return false;}}
return true;};jsts.geom.GeometryCollection.prototype.clone=function(){var geometries=[];for(var i=0,len=this.geometries.length;i<len;i++){geometries.push(this.geometries[i].clone());}
return this.factory.createGeometryCollection(geometries);};jsts.geom.GeometryCollection.prototype.normalize=function(){for(var i=0,len=this.geometries.length;i<len;i++){this.getGeometryN(i).normalize();}
this.geometries.sort();};jsts.geom.GeometryCollection.prototype.compareToSameClass=function(o){var theseElements=new TreeSet(Arrays.asList(this.geometries));var otherElements=new TreeSet(Arrays.asList(o.geometries));return this.compare(theseElements,otherElements);};jsts.geom.GeometryCollection.prototype.apply=function(filter){if(filter instanceof jsts.geom.GeometryFilter||filter instanceof jsts.geom.GeometryComponentFilter){filter.filter(this);for(var i=0,len=this.geometries.length;i<len;i++){this.getGeometryN(i).apply(filter);}}else if(filter instanceof jsts.geom.CoordinateFilter){for(var i=0,len=this.geometries.length;i<len;i++){this.getGeometryN(i).apply(filter);}}else if(filter instanceof jsts.geom.CoordinateSequenceFilter){this.apply2.apply(this,arguments);}};jsts.geom.GeometryCollection.prototype.apply2=function(filter){if(this.geometries.length==0)
return;for(var i=0;i<this.geometries.length;i++){this.geometries[i].apply(filter);if(filter.isDone()){break;}}
if(filter.isGeometryChanged()){}};jsts.geom.GeometryCollection.prototype.getDimension=function(){var dimension=jsts.geom.Dimension.FALSE;for(var i=0,len=this.geometries.length;i<len;i++){var geometry=this.getGeometryN(i);dimension=Math.max(dimension,geometry.getDimension());}
return dimension;};jsts.geom.GeometryCollection.prototype.computeEnvelopeInternal=function(){var envelope=new jsts.geom.Envelope();for(var i=0,len=this.geometries.length;i<len;i++){var geometry=this.getGeometryN(i);envelope.expandToInclude(geometry.getEnvelopeInternal());}
return envelope;};jsts.geom.GeometryCollection.prototype.CLASS_NAME='jsts.geom.GeometryCollection';})();(function(){jsts.geom.MultiPolygon=function(geometries,factory){this.geometries=geometries||[];this.factory=factory;};jsts.geom.MultiPolygon.prototype=new jsts.geom.GeometryCollection();jsts.geom.MultiPolygon.constructor=jsts.geom.MultiPolygon;jsts.geom.MultiPolygon.prototype.getBoundary=function(){if(this.isEmpty()){return this.getFactory().createMultiLineString(null);}
var allRings=[];for(var i=0;i<this.geometries.length;i++){var polygon=this.geometries[i];var rings=polygon.getBoundary();for(var j=0;j<rings.getNumGeometries();j++){allRings.push(rings.getGeometryN(j));}}
return this.getFactory().createMultiLineString(allRings);};jsts.geom.MultiPolygon.prototype.equalsExact=function(other,tolerance){if(!this.isEquivalentClass(other)){return false;}
return jsts.geom.GeometryCollection.prototype.equalsExact.call(this,other,tolerance);};jsts.geom.MultiPolygon.prototype.CLASS_NAME='jsts.geom.MultiPolygon';})();jsts.geom.CoordinateSequenceFilter=function(){};jsts.geom.CoordinateSequenceFilter.prototype.filter=jsts.abstractFunc;jsts.geom.CoordinateSequenceFilter.prototype.isDone=jsts.abstractFunc;jsts.geom.CoordinateSequenceFilter.prototype.isGeometryChanged=jsts.abstractFunc;jsts.noding.snapround.HotPixel=function(pt,scaleFactor,li){this.corner=[];this.originalPt=pt;this.pt=pt;this.scaleFactor=scaleFactor;this.li=li;if(this.scaleFactor!==1.0){this.pt=new jsts.geom.Coordinate(this.scale(pt.x),this.scale(pt.y));this.p0Scaled=new jsts.geom.Coordinate();this.p1Scaled=new jsts.geom.Coordinate();}
this.initCorners(this.pt);};jsts.noding.snapround.HotPixel.prototype.li=null;jsts.noding.snapround.HotPixel.prototype.pt=null;jsts.noding.snapround.HotPixel.prototype.originalPt=null;jsts.noding.snapround.HotPixel.prototype.ptScaled=null;jsts.noding.snapround.HotPixel.prototype.p0Scaled=null;jsts.noding.snapround.HotPixel.prototype.p1Scaled=null;jsts.noding.snapround.HotPixel.prototype.scaleFactor=undefined;jsts.noding.snapround.HotPixel.prototype.minx=undefined;jsts.noding.snapround.HotPixel.prototype.maxx=undefined;jsts.noding.snapround.HotPixel.prototype.miny=undefined;jsts.noding.snapround.HotPixel.prototype.maxy=undefined;jsts.noding.snapround.HotPixel.prototype.corner=null;jsts.noding.snapround.HotPixel.prototype.safeEnv=null;jsts.noding.snapround.HotPixel.prototype.getCoordinate=function(){return this.originalPt;};jsts.noding.snapround.HotPixel.SAFE_ENV_EXPANSION_FACTOR=0.75;jsts.noding.snapround.HotPixel.prototype.getSafeEnvelope=function(){if(this.safeEnv===null){var safeTolerance=jsts.noding.snapround.HotPixel.SAFE_ENV_EXPANSION_FACTOR/this.scaleFactor;this.safeEnv=new jsts.geom.Envelope(this.originalPt.x-safeTolerance,this.originalPt.x+safeTolerance,this.originalPt.y-safeTolerance,this.originalPt.y+safeTolerance);}
return this.safeEnv;};jsts.noding.snapround.HotPixel.prototype.initCorners=function(pt){var tolerance=0.5;this.minx=pt.x-tolerance;this.maxx=pt.x+tolerance;this.miny=pt.y-tolerance;this.maxy=pt.y+tolerance;this.corner[0]=new jsts.geom.Coordinate(this.maxx,this.maxy);this.corner[1]=new jsts.geom.Coordinate(this.minx,this.maxy);this.corner[2]=new jsts.geom.Coordinate(this.minx,this.miny);this.corner[3]=new jsts.geom.Coordinate(this.maxx,this.miny);};jsts.noding.snapround.HotPixel.prototype.scale=function(val){return Math.round(val*this.scaleFactor);};jsts.noding.snapround.HotPixel.prototype.intersects=function(p0,p1){if(this.scaleFactor===1.0)
return this.intersectsScaled(p0,p1);this.copyScaled(p0,this.p0Scaled);this.copyScaled(p1,this.p1Scaled);return this.intersectsScaled(this.p0Scaled,this.p1Scaled);};jsts.noding.snapround.HotPixel.prototype.copyScaled=function(p,pScaled){pScaled.x=this.scale(p.x);pScaled.y=this.scale(p.y);};jsts.noding.snapround.HotPixel.prototype.intersectsScaled=function(p0,p1){var segMinx=Math.min(p0.x,p1.x);var segMaxx=Math.max(p0.x,p1.x);var segMiny=Math.min(p0.y,p1.y);var segMaxy=Math.max(p0.y,p1.y);var isOutsidePixelEnv=this.maxx<segMinx||this.minx>segMaxx||this.maxy<segMiny||this.miny>segMaxy;if(isOutsidePixelEnv)
return false;var intersects=this.intersectsToleranceSquare(p0,p1);jsts.util.Assert.isTrue(!(isOutsidePixelEnv&&intersects),'Found bad envelope test');return intersects;};jsts.noding.snapround.HotPixel.prototype.intersectsToleranceSquare=function(p0,p1){var intersectsLeft=false;var intersectsBottom=false;this.li.computeIntersection(p0,p1,this.corner[0],this.corner[1]);if(this.li.isProper())
return true;this.li.computeIntersection(p0,p1,this.corner[1],this.corner[2]);if(this.li.isProper())
return true;if(this.li.hasIntersection())
intersectsLeft=true;this.li.computeIntersection(p0,p1,this.corner[2],this.corner[3]);if(this.li.isProper())
return true;if(this.li.hasIntersection())
intersectsBottom=true;this.li.computeIntersection(p0,p1,this.corner[3],this.corner[0]);if(this.li.isProper())
return true;if(intersectsLeft&&intersectsBottom)
return true;if(p0.equals(this.pt))
return true;if(p1.equals(this.pt))
return true;return false;};jsts.noding.snapround.HotPixel.prototype.intersectsPixelClosure=function(p0,p1){this.li.computeIntersection(p0,p1,this.corner[0],this.corner[1]);if(this.li.hasIntersection())
return true;this.li.computeIntersection(p0,p1,this.corner[1],this.corner[2]);if(this.li.hasIntersection())
return true;this.li.computeIntersection(p0,p1,this.corner[2],this.corner[3]);if(this.li.hasIntersection())
return true;this.li.computeIntersection(p0,p1,this.corner[3],this.corner[0]);if(this.li.hasIntersection())
return true;return false;};jsts.noding.snapround.HotPixel.prototype.addSnappedNode=function(segStr,segIndex){var p0=segStr.getCoordinate(segIndex);var p1=segStr.getCoordinate(segIndex+1);if(this.intersects(p0,p1)){segStr.addIntersection(this.getCoordinate(),segIndex);return true;}
return false;};jsts.operation.buffer.BufferInputLineSimplifier=function(inputLine){this.inputLine=inputLine;};jsts.operation.buffer.BufferInputLineSimplifier.simplify=function(inputLine,distanceTol){var simp=new jsts.operation.buffer.BufferInputLineSimplifier(inputLine);return simp.simplify(distanceTol);};jsts.operation.buffer.BufferInputLineSimplifier.INIT=0;jsts.operation.buffer.BufferInputLineSimplifier.DELETE=1;jsts.operation.buffer.BufferInputLineSimplifier.KEEP=1;jsts.operation.buffer.BufferInputLineSimplifier.prototype.inputLine=null;jsts.operation.buffer.BufferInputLineSimplifier.prototype.distanceTol=null;jsts.operation.buffer.BufferInputLineSimplifier.prototype.isDeleted=null;jsts.operation.buffer.BufferInputLineSimplifier.prototype.angleOrientation=jsts.algorithm.CGAlgorithms.COUNTERCLOCKWISE;jsts.operation.buffer.BufferInputLineSimplifier.prototype.simplify=function(distanceTol){this.distanceTol=Math.abs(distanceTol);if(distanceTol<0)
this.angleOrientation=jsts.algorithm.CGAlgorithms.CLOCKWISE;this.isDeleted=[];this.isDeleted.length=this.inputLine.length;var isChanged=false;do{isChanged=this.deleteShallowConcavities();}while(isChanged);return this.collapseLine();};jsts.operation.buffer.BufferInputLineSimplifier.prototype.deleteShallowConcavities=function(){var index=1;var maxIndex=this.inputLine.length-1;var midIndex=this.findNextNonDeletedIndex(index);var lastIndex=this.findNextNonDeletedIndex(midIndex);var isChanged=false;while(lastIndex<this.inputLine.length){var isMiddleVertexDeleted=false;if(this.isDeletable(index,midIndex,lastIndex,this.distanceTol)){this.isDeleted[midIndex]=jsts.operation.buffer.BufferInputLineSimplifier.DELETE;isMiddleVertexDeleted=true;isChanged=true;}
if(isMiddleVertexDeleted)
index=lastIndex;else
index=midIndex;midIndex=this.findNextNonDeletedIndex(index);lastIndex=this.findNextNonDeletedIndex(midIndex);}
return isChanged;};jsts.operation.buffer.BufferInputLineSimplifier.prototype.findNextNonDeletedIndex=function(index){var next=index+1;while(next<this.inputLine.length&&this.isDeleted[next]===jsts.operation.buffer.BufferInputLineSimplifier.DELETE)
next++;return next;};jsts.operation.buffer.BufferInputLineSimplifier.prototype.collapseLine=function(){var coordList=[];for(var i=0;i<this.inputLine.length;i++){if(this.isDeleted[i]!==jsts.operation.buffer.BufferInputLineSimplifier.DELETE)
coordList.push(this.inputLine[i]);}
return coordList;};jsts.operation.buffer.BufferInputLineSimplifier.prototype.isDeletable=function(i0,i1,i2,distanceTol){var p0=this.inputLine[i0];var p1=this.inputLine[i1];var p2=this.inputLine[i2];if(!this.isConcave(p0,p1,p2))
return false;if(!this.isShallow(p0,p1,p2,distanceTol))
return false;return this.isShallowSampled(p0,p1,i0,i2,distanceTol);};jsts.operation.buffer.BufferInputLineSimplifier.prototype.isShallowConcavity=function(p0,p1,p2,distanceTol){var orientation=jsts.algorithm.CGAlgorithms.computeOrientation(p0,p1,p2);var isAngleToSimplify=(orientation===this.angleOrientation);if(!isAngleToSimplify)
return false;var dist=jsts.algorithm.CGAlgorithms.distancePointLine(p1,p0,p2);return dist<distanceTol;};jsts.operation.buffer.BufferInputLineSimplifier.NUM_PTS_TO_CHECK=10;jsts.operation.buffer.BufferInputLineSimplifier.prototype.isShallowSampled=function(p0,p2,i0,i2,distanceTol){var inc=parseInt((i2-i0)/jsts.operation.buffer.BufferInputLineSimplifier.NUM_PTS_TO_CHECK);if(inc<=0)
inc=1;for(var i=i0;i<i2;i+=inc){if(!this.isShallow(p0,p2,this.inputLine[i],distanceTol))
return false;}
return true;};jsts.operation.buffer.BufferInputLineSimplifier.prototype.isShallow=function(p0,p1,p2,distanceTol){var dist=jsts.algorithm.CGAlgorithms.distancePointLine(p1,p0,p2);return dist<distanceTol;};jsts.operation.buffer.BufferInputLineSimplifier.prototype.isConcave=function(p0,p1,p2){var orientation=jsts.algorithm.CGAlgorithms.computeOrientation(p0,p1,p2);var isConcave=(orientation===this.angleOrientation);return isConcave;};jsts.geom.CoordinateList=function(coord,allowRepeated){javascript.util.ArrayList.apply(this,arguments);allowRepeated=(allowRepeated===undefined)?true:allowRepeated;if(coord!==undefined){this.add(coord,allowRepeated);}};jsts.geom.CoordinateList.prototype=new javascript.util.ArrayList();jsts.geom.CoordinateList.prototype.add=function(){if(arguments.length>1){return this.addCoordinates.apply(this,arguments);}else{return javascript.util.ArrayList.prototype.add.apply(this,arguments);}};jsts.geom.CoordinateList.prototype.addCoordinates=function(coord,allowRepeated,direction){if(coord instanceof jsts.geom.Coordinate){return this.addCoordinate.apply(this,arguments);}else if(typeof coord==='number'){return this.insertCoordinate.apply(this,arguments);}
direction=direction||true;if(direction){for(var i=0;i<coord.length;i++){this.addCoordinate(coord[i],allowRepeated);}}else{for(var i=coord.length-1;i>=0;i--){this.addCoordinate(coord[i],allowRepeated);}}
return true;};jsts.geom.CoordinateList.prototype.addCoordinate=function(coord,allowRepeated){if(!allowRepeated){if(this.size()>=1){var last=this.get(this.size()-1);if(last.equals2D(coord))return;}}
this.add(coord);};jsts.geom.CoordinateList.prototype.insertCoordinate=function(index,coord,allowRepeated){if(!allowRepeated){var before=index>0?index-1:-1;if(before!==-1&&this.get(before).equals2D(coord)){return;}
var after=index<this.size()-1?index+1:-1;if(after!==-1&&this.get(after).equals2D(coord)){return;}}
this.array.splice(index,0,coord);};jsts.geom.CoordinateList.prototype.closeRing=function(){if(this.size()>0){this.addCoordinate(new jsts.geom.Coordinate(this.get(0)),false);}};jsts.geom.CoordinateList.prototype.toArray=function(){var i,il,arr;i=0,il=this.size(),arr=[];for(i;i<il;i++){arr[i]=this.get(i);}
return arr;};jsts.geom.CoordinateList.prototype.toCoordinateArray=function(){return this.toArray();};jsts.operation.overlay.MaximalEdgeRing=function(start,geometryFactory){jsts.geomgraph.EdgeRing.call(this,start,geometryFactory);};jsts.operation.overlay.MaximalEdgeRing.prototype=new jsts.geomgraph.EdgeRing();jsts.operation.overlay.MaximalEdgeRing.constructor=jsts.operation.overlay.MaximalEdgeRing;jsts.operation.overlay.MaximalEdgeRing.prototype.getNext=function(de)
{return de.getNext();};jsts.operation.overlay.MaximalEdgeRing.prototype.setEdgeRing=function(de,er)
{de.setEdgeRing(er);};jsts.operation.overlay.MaximalEdgeRing.prototype.linkDirectedEdgesForMinimalEdgeRings=function()
{var de=this.startDe;do{var node=de.getNode();node.getEdges().linkMinimalDirectedEdges(this);de=de.getNext();}while(de!=this.startDe);};jsts.operation.overlay.MaximalEdgeRing.prototype.buildMinimalRings=function()
{var minEdgeRings=[];var de=this.startDe;do{if(de.getMinEdgeRing()===null){var minEr=new jsts.operation.overlay.MinimalEdgeRing(de,this.geometryFactory);minEdgeRings.push(minEr);}
de=de.getNext();}while(de!=this.startDe);return minEdgeRings;};jsts.algorithm.CentroidPoint=function(){this.centSum=new jsts.geom.Coordinate();};jsts.algorithm.CentroidPoint.prototype.ptCount=0;jsts.algorithm.CentroidPoint.prototype.centSum=null;jsts.algorithm.CentroidPoint.prototype.add=function(geom){if(geom instanceof jsts.geom.Point){this.add2(geom.getCoordinate());}else if(geom instanceof jsts.geom.GeometryCollection||geom instanceof jsts.geom.MultiPoint||geom instanceof jsts.geom.MultiLineString||geom instanceof jsts.geom.MultiPolygon){var gc=geom;for(var i=0;i<gc.getNumGeometries();i++){this.add(gc.getGeometryN(i));}}};jsts.algorithm.CentroidPoint.prototype.add2=function(pt){this.ptCount+=1;this.centSum.x+=pt.x;this.centSum.y+=pt.y;};jsts.algorithm.CentroidPoint.prototype.getCentroid=function(){var cent=new jsts.geom.Coordinate();cent.x=this.centSum.x/this.ptCount;cent.y=this.centSum.y/this.ptCount;return cent;};jsts.operation.distance.ConnectedElementLocationFilter=function(locations){this.locations=locations;};jsts.operation.distance.ConnectedElementLocationFilter.prototype=new jsts.geom.GeometryFilter();jsts.operation.distance.ConnectedElementLocationFilter.prototype.locations=null;jsts.operation.distance.ConnectedElementLocationFilter.getLocations=function(geom){var locations=[];geom.apply(new jsts.operation.distance.ConnectedElementLocationFilter(locations));return locations;};jsts.operation.distance.ConnectedElementLocationFilter.prototype.filter=function(geom){if(geom instanceof jsts.geom.Point||geom instanceof jsts.geom.LineString||geom instanceof jsts.geom.Polygon)
this.locations.push(new jsts.operation.distance.GeometryLocation(geom,0,geom.getCoordinate()));};(function(){var ArrayList=javascript.util.ArrayList;jsts.operation.relate.EdgeEndBuilder=function(){};jsts.operation.relate.EdgeEndBuilder.prototype.computeEdgeEnds=function(edges){if(arguments.length==2){this.computeEdgeEnds2.apply(this,arguments);return;}
var l=new ArrayList();for(var i=edges;i.hasNext();){var e=i.next();this.computeEdgeEnds2(e,l);}
return l;};jsts.operation.relate.EdgeEndBuilder.prototype.computeEdgeEnds2=function(edge,l){var eiList=edge.getEdgeIntersectionList();eiList.addEndpoints();var it=eiList.iterator();var eiPrev=null;var eiCurr=null;if(!it.hasNext())
return;var eiNext=it.next();do{eiPrev=eiCurr;eiCurr=eiNext;eiNext=null;if(it.hasNext())
eiNext=it.next();if(eiCurr!==null){this.createEdgeEndForPrev(edge,l,eiCurr,eiPrev);this.createEdgeEndForNext(edge,l,eiCurr,eiNext);}}while(eiCurr!==null);};jsts.operation.relate.EdgeEndBuilder.prototype.createEdgeEndForPrev=function(edge,l,eiCurr,eiPrev){var iPrev=eiCurr.segmentIndex;if(eiCurr.dist===0.0){if(iPrev===0)
return;iPrev--;}
var pPrev=edge.getCoordinate(iPrev);if(eiPrev!==null&&eiPrev.segmentIndex>=iPrev)
pPrev=eiPrev.coord;var label=new jsts.geomgraph.Label(edge.getLabel());label.flip();var e=new jsts.geomgraph.EdgeEnd(edge,eiCurr.coord,pPrev,label);l.add(e);};jsts.operation.relate.EdgeEndBuilder.prototype.createEdgeEndForNext=function(edge,l,eiCurr,eiNext){var iNext=eiCurr.segmentIndex+1;if(iNext>=edge.getNumPoints()&&eiNext===null)
return;var pNext=edge.getCoordinate(iNext);if(eiNext!==null&&eiNext.segmentIndex===eiCurr.segmentIndex)
pNext=eiNext.coord;var e=new jsts.geomgraph.EdgeEnd(edge,eiCurr.coord,pNext,new jsts.geomgraph.Label(edge.getLabel()));l.add(e);};})();(function(){jsts.io.GeoJSONParser=function(geometryFactory){this.geometryFactory=geometryFactory||new jsts.geom.GeometryFactory();this.geometryTypes=['Point','MultiPoint','LineString','MultiLineString','Polygon','MultiPolygon'];};jsts.io.GeoJSONParser.prototype.read=function(json){var obj;if(typeof json==='string'){obj=JSON.parse(json);}else{obj=json;}
var type=obj.type;if(!this.parse[type]){throw new Error('Unknown GeoJSON type: '+obj.type);}
if(this.geometryTypes.indexOf(type)!=-1){return this.parse[type].apply(this,[obj.coordinates]);}else if(type==='GeometryCollection'){return this.parse[type].apply(this,[obj.geometries]);}
return this.parse[type].apply(this,[obj]);};jsts.io.GeoJSONParser.prototype.parse={'Feature':function(obj){var feature={};for(var key in obj){feature[key]=obj[key];}
if(obj.geometry){var type=obj.geometry.type;if(!this.parse[type]){throw new Error('Unknown GeoJSON type: '+obj.type);}
feature.geometry=this.read(obj.geometry);}
if(obj.bbox){feature.bbox=this.parse.bbox.apply(this,[obj.bbox]);}
return feature;},'FeatureCollection':function(obj){var featureCollection={};if(obj.features){featureCollection.features=[];for(var i=0;i<obj.features.length;++i){featureCollection.features.push(this.read(obj.features[i]));}}
if(obj.bbox){featureCollection.bbox=this.parse.bbox.apply(this,[obj.bbox]);}
return featureCollection;},'coordinates':function(array){var coordinates=[];for(var i=0;i<array.length;++i){var sub=array[i];coordinates.push(new jsts.geom.Coordinate(sub[0],sub[1]));}
return coordinates;},'bbox':function(array){return this.geometryFactory.createLinearRing([new jsts.geom.Coordinate(array[0],array[1]),new jsts.geom.Coordinate(array[2],array[1]),new jsts.geom.Coordinate(array[2],array[3]),new jsts.geom.Coordinate(array[0],array[3]),new jsts.geom.Coordinate(array[0],array[1])]);},'Point':function(array){var coordinate=new jsts.geom.Coordinate(array[0],array[1]);return this.geometryFactory.createPoint(coordinate);},'MultiPoint':function(array){var points=[];for(var i=0;i<array.length;++i){points.push(this.parse.Point.apply(this,[array[i]]));}
return this.geometryFactory.createMultiPoint(points);},'LineString':function(array){var coordinates=this.parse.coordinates.apply(this,[array]);return this.geometryFactory.createLineString(coordinates);},'MultiLineString':function(array){var lineStrings=[];for(var i=0;i<array.length;++i){lineStrings.push(this.parse.LineString.apply(this,[array[i]]));}
return this.geometryFactory.createMultiLineString(lineStrings);},'Polygon':function(array){var shellCoordinates=this.parse.coordinates.apply(this,[array[0]]);var shell=this.geometryFactory.createLinearRing(shellCoordinates);var holes=[];for(var i=1;i<array.length;++i){var hole=array[i];var coordinates=this.parse.coordinates.apply(this,[hole]);var linearRing=this.geometryFactory.createLinearRing(coordinates);holes.push(linearRing);}
return this.geometryFactory.createPolygon(shell,holes);},'MultiPolygon':function(array){var polygons=[];for(var i=0;i<array.length;++i){var polygon=array[i];polygons.push(this.parse.Polygon.apply(this,[polygon]));}
return this.geometryFactory.createMultiPolygon(polygons);},'GeometryCollection':function(array){var geometries=[];for(var i=0;i<array.length;++i){var geometry=array[i];geometries.push(this.read(geometry));}
return this.geometryFactory.createGeometryCollection(geometries);}};jsts.io.GeoJSONParser.prototype.write=function(geometry){var type=geometry.CLASS_NAME.slice(10);if(!this.extract[type]){throw new Error('Geometry is not supported');}
return this.extract[type].apply(this,[geometry]);};jsts.io.GeoJSONParser.prototype.extract={'coordinate':function(coordinate){return[coordinate.x,coordinate.y];},'Point':function(point){var array=this.extract.coordinate.apply(this,[point.coordinate]);return{type:'Point',coordinates:array};},'MultiPoint':function(multipoint){var array=[];for(var i=0;i<multipoint.geometries.length;++i){var point=multipoint.geometries[i];var geoJson=this.extract.Point.apply(this,[point]);array.push(geoJson.coordinates);}
return{type:'MultiPoint',coordinates:array};},'LineString':function(linestring){var array=[];for(var i=0;i<linestring.points.length;++i){var coordinate=linestring.points[i];array.push(this.extract.coordinate.apply(this,[coordinate]));}
return{type:'LineString',coordinates:array};},'MultiLineString':function(multilinestring){var array=[];for(var i=0;i<multilinestring.geometries.length;++i){var linestring=multilinestring.geometries[i];var geoJson=this.extract.LineString.apply(this,[linestring]);array.push(geoJson.coordinates);}
return{type:'MultiLineString',coordinates:array};},'Polygon':function(polygon){var array=[];var shellGeoJson=this.extract.LineString.apply(this,[polygon.shell]);array.push(shellGeoJson.coordinates);for(var i=0;i<polygon.holes.length;++i){var hole=polygon.holes[i];var holeGeoJson=this.extract.LineString.apply(this,[hole]);array.push(holeGeoJson.coordinates);}
return{type:'Polygon',coordinates:array};},'MultiPolygon':function(multipolygon){var array=[];for(var i=0;i<multipolygon.geometries.length;++i){var polygon=multipolygon.geometries[i];var geoJson=this.extract.Polygon.apply(this,[polygon]);array.push(geoJson.coordinates);}
return{type:'MultiPolygon',coordinates:array};},'GeometryCollection':function(collection){var array=[];for(var i=0;i<collection.geometries.length;++i){var geometry=collection.geometries[i];var type=geometry.CLASS_NAME.slice(10);array.push(this.extract[type].apply(this,[geometry]));}
return{type:'GeometryCollection',geometries:array};}};})();jsts.geomgraph.Edge=function(pts,label){this.pts=pts;this.label=label;this.eiList=new jsts.geomgraph.EdgeIntersectionList(this);this.depth=new jsts.geomgraph.Depth();};jsts.geomgraph.Edge.prototype=new jsts.geomgraph.GraphComponent();jsts.geomgraph.Edge.constructor=jsts.geomgraph.Edge;jsts.geomgraph.Edge.updateIM=function(label,im){im.setAtLeastIfValid(label.getLocation(0,jsts.geomgraph.Position.ON),label.getLocation(1,jsts.geomgraph.Position.ON),1);if(label.isArea()){im.setAtLeastIfValid(label.getLocation(0,jsts.geomgraph.Position.LEFT),label.getLocation(1,jsts.geomgraph.Position.LEFT),2);im.setAtLeastIfValid(label.getLocation(0,jsts.geomgraph.Position.RIGHT),label.getLocation(1,jsts.geomgraph.Position.RIGHT),2);}};jsts.geomgraph.Edge.prototype.pts=null;jsts.geomgraph.Edge.prototype.env=null;jsts.geomgraph.Edge.prototype.name=null;jsts.geomgraph.Edge.prototype.mce=null;jsts.geomgraph.Edge.prototype._isIsolated=true;jsts.geomgraph.Edge.prototype.depth=null;jsts.geomgraph.Edge.prototype.depthDelta=0;jsts.geomgraph.Edge.prototype.eiList=null;jsts.geomgraph.Edge.prototype.getNumPoints=function(){return this.pts.length;};jsts.geomgraph.Edge.prototype.getEnvelope=function(){if(this.env===null){this.env=new jsts.geom.Envelope();for(var i=0;i<this.pts.length;i++){this.env.expandToInclude(pts[i]);}}
return env;};jsts.geomgraph.Edge.prototype.getDepth=function(){return this.depth;};jsts.geomgraph.Edge.prototype.getDepthDelta=function(){return this.depthDelta;};jsts.geomgraph.Edge.prototype.setDepthDelta=function(depthDelta){this.depthDelta=depthDelta;};jsts.geomgraph.Edge.prototype.getCoordinates=function(){return this.pts;};jsts.geomgraph.Edge.prototype.getCoordinate=function(i){if(i===undefined){if(this.pts.length>0){return this.pts[0];}else{return null;}}
return this.pts[i];};jsts.geomgraph.Edge.prototype.isClosed=function(){return this.pts[0].equals(this.pts[this.pts.length-1]);};jsts.geomgraph.Edge.prototype.setIsolated=function(isIsolated){this._isIsolated=isIsolated;};jsts.geomgraph.Edge.prototype.isIsolated=function(){return this._isIsolated;};jsts.geomgraph.Edge.prototype.addIntersections=function(li,segmentIndex,geomIndex){for(var i=0;i<li.getIntersectionNum();i++){this.addIntersection(li,segmentIndex,geomIndex,i);}};jsts.geomgraph.Edge.prototype.addIntersection=function(li,segmentIndex,geomIndex,intIndex){var intPt=new jsts.geom.Coordinate(li.getIntersection(intIndex));var normalizedSegmentIndex=segmentIndex;var dist=li.getEdgeDistance(geomIndex,intIndex);var nextSegIndex=normalizedSegmentIndex+1;if(nextSegIndex<this.pts.length){var nextPt=this.pts[nextSegIndex];if(intPt.equals2D(nextPt)){normalizedSegmentIndex=nextSegIndex;dist=0.0;}}
var ei=this.eiList.add(intPt,normalizedSegmentIndex,dist);};jsts.geomgraph.Edge.prototype.getMaximumSegmentIndex=function(){return this.pts.length-1;};jsts.geomgraph.Edge.prototype.getEdgeIntersectionList=function(){return this.eiList;};jsts.geomgraph.Edge.prototype.isClosed=function()
{return this.pts[0].equals(this.pts[this.pts.length-1]);};jsts.geomgraph.Edge.prototype.isCollapsed=function()
{if(!this.label.isArea())return false;if(this.pts.length!=3)return false;if(this.pts[0].equals(this.pts[2]))return true;return false;};jsts.geomgraph.Edge.prototype.getCollapsedEdge=function()
{var newPts=[];newPts[0]=this.pts[0];newPts[1]=this.pts[1];var newe=new jsts.geomgraph.Edge(newPts,jsts.geomgraph.Label.toLineLabel(this.label));return newe;};jsts.geomgraph.Edge.prototype.computeIM=function(im){jsts.geomgraph.Edge.updateIM(this.label,im);};jsts.geomgraph.Edge.prototype.isPointwiseEqual=function(e)
{if(this.pts.length!=e.pts.length)return false;for(var i=0;i<this.pts.length;i++){if(!this.pts[i].equals2D(e.pts[i])){return false;}}
return true;};jsts.operation.valid.IsValidOp=function(parentGeometry){this.parentGeometry=parentGeometry;this.isSelfTouchingRingFormingHoleValid=false;this.validErr=null;};jsts.operation.valid.IsValidOp.isValid=function(arg){if(arguments[0]instanceof jsts.geom.Coordinate){if(isNaN(arg.x)){return false;}
if(!isFinite(arg.x)&&!isNaN(arg.x)){return false;}
if(isNaN(arg.y)){return false;}
if(!isFinite(arg.y)&&!isNaN(arg.y)){return false;}
return true;}else{var isValidOp=new jsts.operation.valid.IsValidOp(arg);return isValidOp.isValid();}};jsts.operation.valid.IsValidOp.findPtNotNode=function(testCoords,searchRing,graph){var searchEdge=graph.findEdge(searchRing);var eiList=searchEdge.getEdgeIntersectionList();for(var i=0;i<testCoords.length;i++){var pt=testCoords[i];if(!eiList.isIntersection(pt)){return pt;}}
return null;};jsts.operation.valid.IsValidOp.prototype.setSelfTouchingRingFormingHoleValid=function(isValid){this.isSelfTouchingRingFormingHoleValid=isValid;};jsts.operation.valid.IsValidOp.prototype.isValid=function(){this.checkValid(this.parentGeometry);return this.validErr==null;};jsts.operation.valid.IsValidOp.prototype.getValidationError=function(){this.checkValid(this.parentGeometry);return this.validErr;};jsts.operation.valid.IsValidOp.prototype.checkValid=function(g){this.validErr=null;if(g.isEmpty()){return;}
if(g instanceof jsts.geom.Point){this.checkValidPoint(g);}else if(g instanceof jsts.geom.MultiPoint){this.checkValidMultiPoint(g);}else if(g instanceof jsts.geom.LinearRing){this.checkValidLinearRing(g);}else if(g instanceof jsts.geom.LineString){this.checkValidLineString(g);}else if(g instanceof jsts.geom.Polygon){this.checkValidPolygon(g);}else if(g instanceof jsts.geom.MultiPolygon){this.checkValidMultiPolygon(g);}else if(g instanceof jsts.geom.GeometryCollection){this.checkValidGeometryCollection(g);}else{throw g.constructor;}};jsts.operation.valid.IsValidOp.prototype.checkValidPoint=function(g){this.checkInvalidCoordinates(g.getCoordinates());};jsts.operation.valid.IsValidOp.prototype.checkValidMultiPoint=function(g){this.checkInvalidCoordinates(g.getCoordinates());};jsts.operation.valid.IsValidOp.prototype.checkValidLineString=function(g){this.checkInvalidCoordinates(g.getCoordinates());if(this.validErr!=null){return;}
var graph=new jsts.geomgraph.GeometryGraph(0,g);this.checkTooFewPoints(graph);};jsts.operation.valid.IsValidOp.prototype.checkValidLinearRing=function(g){this.checkInvalidCoordinates(g.getCoordinates());if(this.validErr!=null){return;}
this.checkClosedRing(g);if(this.validErr!=null){return;}
var graph=new jsts.geomgraph.GeometryGraph(0,g);this.checkTooFewPoints(graph);if(this.validErr!=null){return;}
var li=new jsts.algorithm.RobustLineIntersector();graph.computeSelfNodes(li,true);this.checkNoSelfIntersectingRings(graph);};jsts.operation.valid.IsValidOp.prototype.checkValidPolygon=function(g){this.checkInvalidCoordinates(g);if(this.validErr!=null){return;}
this.checkClosedRings(g);if(this.validErr!=null){return;}
var graph=new jsts.geomgraph.GeometryGraph(0,g);this.checkTooFewPoints(graph);if(this.validErr!=null){return;}
this.checkConsistentArea(graph);if(this.validErr!=null){return;}
if(!this.isSelfTouchingRingFormingHoleValid){this.checkNoSelfIntersectingRings(graph);if(this.validErr!=null){return;}}
this.checkHolesInShell(g,graph);if(this.validErr!=null){return;}
this.checkHolesNotNested(g,graph);if(this.validErr!=null){return;}
this.checkConnectedInteriors(graph);};jsts.operation.valid.IsValidOp.prototype.checkValidMultiPolygon=function(g){var il=g.getNumGeometries();for(var i=0;i<il;i++){var p=g.getGeometryN(i);this.checkInvalidCoordinates(p);if(this.validErr!=null){return;}
this.checkClosedRings(p);if(this.validErr!=null){return;}}
var graph=new jsts.geomgraph.GeometryGraph(0,g);this.checkTooFewPoints(graph);if(this.validErr!=null){return;}
this.checkConsistentArea(graph);if(this.validErr!=null){return;}
if(!this.isSelfTouchingRingFormingHoleValid){this.checkNoSelfIntersectingRings(graph);if(this.validErr!=null){return;}}
for(var i=0;i<g.getNumGeometries();i++){var p=g.getGeometryN(i);this.checkHolesInShell(p,graph);if(this.validErr!=null){return;}}
for(var i=0;i<g.getNumGeometries();i++){var p=g.getGeometryN(i);this.checkHolesNotNested(p,graph);if(this.validErr!=null){return;}}
this.checkShellsNotNested(g,graph);if(this.validErr!=null){return;}
this.checkConnectedInteriors(graph);};jsts.operation.valid.IsValidOp.prototype.checkValidGeometryCollection=function(gc){for(var i=0;i<gc.getNumGeometries();i++){var g=gc.getGeometryN(i);this.checkValid(g);if(this.validErr!=null){return;}}};jsts.operation.valid.IsValidOp.prototype.checkInvalidCoordinates=function(arg){if(arg instanceof jsts.geom.Polygon){var poly=arg;this.checkInvalidCoordinates(poly.getExteriorRing().getCoordinates());if(this.validErr!=null){return;}
for(var i=0;i<poly.getNumInteriorRing();i++){this.checkInvalidCoordinates(poly.getInteriorRingN(i).getCoordinates());if(this.validErr!=null){return;}}}else{var coords=arg;for(var i=0;i<coords.length;i++){if(!jsts.operation.valid.IsValidOp.isValid(coords[i])){this.validErr=new jsts.operation.valid.TopologyValidationError(jsts.operation.valid.TopologyValidationError.INVALID_COORDINATE,coords[i]);return;}}}};jsts.operation.valid.IsValidOp.prototype.checkClosedRings=function(poly){this.checkClosedRing(poly.getExteriorRing());if(this.validErr!=null){return;}
for(var i=0;i<poly.getNumInteriorRing();i++){this.checkClosedRing(poly.getInteriorRingN(i));if(this.validErr!=null){return;}}};jsts.operation.valid.IsValidOp.prototype.checkClosedRing=function(ring){if(!ring.isClosed()){var pt=null;if(ring.getNumPoints()>=1){pt=ring.getCoordinateN(0);}
this.validErr=new jsts.operation.valid.TopologyValidationError(jsts.operation.valid.TopologyValidationError.RING_NOT_CLOSED,pt);}};jsts.operation.valid.IsValidOp.prototype.checkTooFewPoints=function(graph){if(graph.hasTooFewPoints){this.validErr=new jsts.operation.valid.TopologyValidationError(jsts.operation.valid.TopologyValidationError.TOO_FEW_POINTS,graph.getInvalidPoint());return;}};jsts.operation.valid.IsValidOp.prototype.checkConsistentArea=function(graph){var cat=new jsts.operation.valid.ConsistentAreaTester(graph);var isValidArea=cat.isNodeConsistentArea();if(!isValidArea){this.validErr=new jsts.operation.valid.TopologyValidationError(jsts.operation.valid.TopologyValidationError.SELF_INTERSECTION,cat.getInvalidPoint());return;}
if(cat.hasDuplicateRings()){this.validErr=new jsts.operation.valid.TopologyValidationError(jsts.operation.valid.TopologyValidationError.DUPLICATE_RINGS,cat.getInvalidPoint());}};jsts.operation.valid.IsValidOp.prototype.checkNoSelfIntersectingRings=function(graph){for(var i=graph.getEdgeIterator();i.hasNext();){var e=i.next();this.checkNoSelfIntersectingRing(e.getEdgeIntersectionList());if(this.validErr!=null){return;}}};jsts.operation.valid.IsValidOp.prototype.checkNoSelfIntersectingRing=function(eiList){var nodeSet=[];var isFirst=true;for(var i=eiList.iterator();i.hasNext();){var ei=i.next();if(isFirst){isFirst=false;continue;}
if(nodeSet.indexOf(ei.coord)>=0){this.validErr=new jsts.operation.valid.TopologyValidationError(jsts.operation.valid.TopologyValidationError.RING_SELF_INTERSECTION,ei.coord);return;}else{nodeSet.push(ei.coord);}}};jsts.operation.valid.IsValidOp.prototype.checkHolesInShell=function(p,graph){var shell=p.getExteriorRing();var pir=new jsts.algorithm.MCPointInRing(shell);for(var i=0;i<p.getNumInteriorRing();i++){var hole=p.getInteriorRingN(i);var holePt=jsts.operation.valid.IsValidOp.findPtNotNode(hole.getCoordinates(),shell,graph);if(holePt==null){return;}
var outside=!pir.isInside(holePt);if(outside){this.validErr=new jsts.operation.valid.TopologyValidationError(jsts.operation.valid.TopologyValidationError.HOLE_OUTSIDE_SHELL,holePt);return;}}};jsts.operation.valid.IsValidOp.prototype.checkHolesNotNested=function(p,graph){var nestedTester=new jsts.operation.valid.IndexedNestedRingTester(graph);for(var i=0;i<p.getNumInteriorRing();i++){var innerHole=p.getInteriorRingN(i);nestedTester.add(innerHole);}
var isNonNested=nestedTester.isNonNested();if(!isNonNested){this.validErr=new jsts.operation.valid.TopologyValidationError(jsts.operation.valid.TopologyValidationError.NESTED_HOLES,nestedTester.getNestedPoint());}};jsts.operation.valid.IsValidOp.prototype.checkShellsNotNested=function(mp,graph){for(var i=0;i<mp.getNumGeometries();i++){var p=mp.getGeometryN(i);var shell=p.getExteriorRing();for(var j=0;j<mp.getNumGeometries();j++){if(i==j){continue;}
var p2=mp.getGeometryN(j);this.checkShellNotNested(shell,p2,graph);if(this.validErr!=null){return;}}}};jsts.operation.valid.IsValidOp.prototype.checkShellNotNested=function(shell,p,graph){var shellPts=shell.getCoordinates();var polyShell=p.getExteriorRing();var polyPts=polyShell.getCoordinates();var shellPt=jsts.operation.valid.IsValidOp.findPtNotNode(shellPts,polyShell,graph);if(shellPt==null){return;}
var insidePolyShell=jsts.algorithm.CGAlgorithms.isPointInRing(shellPt,polyPts);if(!insidePolyShell){return;}
if(p.getNumInteriorRing()<=0){this.validErr=new jsts.operation.valid.TopologyValidationError(jsts.operation.valid.TopologyValidationError.NESTED_SHELLS,shellPt);return;}
var badNestedPt=null;for(var i=0;i<p.getNumInteriorRing();i++){var hole=p.getInteriorRingN(i);badNestedPt=this.checkShellInsideHole(shell,hole,graph);if(badNestedPt==null){return;}}
this.validErr=new jsts.operation.valid.TopologyValidationError(jsts.operation.valid.TopologyValidationError.NESTED_SHELLS,badNestedPt);};jsts.operation.valid.IsValidOp.prototype.checkShellInsideHole=function(shell,hole,graph){var shellPts=shell.getCoordinates();var holePts=hole.getCoordinates();var shellPt=jsts.operation.valid.IsValidOp.findPtNotNode(shellPts,hole,graph);if(shellPt!=null){var insideHole=jsts.algorithm.CGAlgorithms.isPointInRing(shellPt,holePts);if(!insideHole){return shellPt;}}
var holePt=jsts.operation.valid.IsValidOp.findPtNotNode(holePts,shell,graph);if(holePt!=null){var insideShell=jsts.algorithm.CGAlgorithms.isPointInRing(holePt,shellPts);if(insideShell){return holePt;}
return null;}
jsts.util.Assert.shouldNeverReachHere('points in shell and hole appear to be equal');return null;};jsts.operation.valid.IsValidOp.prototype.checkConnectedInteriors=function(graph){var cit=new jsts.operation.valid.ConnectedInteriorTester(graph);if(!cit.isInteriorsConnected()){this.validErr=new jsts.operation.valid.TopologyValidationError(jsts.operation.valid.TopologyValidationError.DISCONNECTED_INTERIOR,cit.getCoordinate());}};jsts.algorithm.RobustDeterminant=function(){};jsts.algorithm.RobustDeterminant.signOfDet2x2=function(x1,y1,x2,y2){var sign,swap,k,count;count=0;sign=1;if((x1===0.0)||(y2===0.0)){if((y1===0.0)||(x2===0.0)){return 0;}
else if(y1>0){if(x2>0){return-sign;}
else{return sign;}}
else{if(x2>0){return sign;}
else{return-sign;}}}
if((y1===0.0)||(x2===0.0)){if(y2>0){if(x1>0){return sign;}
else{return-sign;}}
else{if(x1>0){return-sign;}
else{return sign;}}}
if(0.0<y1){if(0.0<y2){if(y1>y2){sign=-sign;swap=x1;x1=x2;x2=swap;swap=y1;y1=y2;y2=swap;}}
else{if(y1<=-y2){sign=-sign;x2=-x2;y2=-y2;}
else{swap=x1;x1=-x2;x2=swap;swap=y1;y1=-y2;y2=swap;}}}
else{if(0.0<y2){if(-y1<=y2){sign=-sign;x1=-x1;y1=-y1;}
else{swap=-x1;x1=x2;x2=swap;swap=-y1;y1=y2;y2=swap;}}
else{if(y1>=y2){x1=-x1;y1=-y1;x2=-x2;y2=-y2;}
else{sign=-sign;swap=-x1;x1=-x2;x2=swap;swap=-y1;y1=-y2;y2=swap;}}}
if(0.0<x1){if(0.0<x2){if(x1>x2){return sign;}}
else{return sign;}}
else{if(0.0<x2){return-sign;}
else{if(x1>=x2){sign=-sign;x1=-x1;x2=-x2;}
else{return-sign;}}}
while(true){count=count+1;k=Math.floor(x2/x1);x2=x2-k*x1;y2=y2-k*y1;if(y2<0.0){return-sign;}
if(y2>y1){return sign;}
if(x1>x2+x2){if(y1<y2+y2){return sign;}}
else{if(y1>y2+y2){return-sign;}
else{x2=x1-x2;y2=y1-y2;sign=-sign;}}
if(y2===0.0){if(x2===0.0){return 0;}
else{return-sign;}}
if(x2===0.0){return sign;}
k=Math.floor(x1/x2);x1=x1-k*x2;y1=y1-k*y2;if(y1<0.0){return sign;}
if(y1>y2){return-sign;}
if(x2>x1+x1){if(y2<y1+y1){return-sign;}}
else{if(y2>y1+y1){return sign;}
else{x1=x2-x1;y1=y2-y1;sign=-sign;}}
if(y1===0.0){if(x1===0.0){return 0;}
else{return sign;}}
if(x1===0.0){return-sign;}}};jsts.algorithm.RobustDeterminant.orientationIndex=function(p1,p2,q){var dx1=p2.x-p1.x;var dy1=p2.y-p1.y;var dx2=q.x-p2.x;var dy2=q.y-p2.y;return jsts.algorithm.RobustDeterminant.signOfDet2x2(dx1,dy1,dx2,dy2);};jsts.index.quadtree.NodeBase=function(){this.subnode=new Array(4);this.subnode[0]=null;this.subnode[1]=null;this.subnode[2]=null;this.subnode[3]=null;this.items=[];};jsts.index.quadtree.NodeBase.prototype.getSubnodeIndex=function(env,centre){var subnodeIndex=-1;if(env.getMinX()>=centre.x){if(env.getMinY()>=centre.y){subnodeIndex=3;}
if(env.getMaxY()<=centre.y){subnodeIndex=1;}}
if(env.getMaxX()<=centre.x){if(env.getMinY()>=centre.y){subnodeIndex=2;}
if(env.getMaxY()<=centre.y){subnodeIndex=0;}}
return subnodeIndex;};jsts.index.quadtree.NodeBase.prototype.getItems=function(){return this.items;};jsts.index.quadtree.NodeBase.prototype.hasItems=function(){return(this.items.length>0);};jsts.index.quadtree.NodeBase.prototype.add=function(item){this.items.push(item);};jsts.index.quadtree.NodeBase.prototype.remove=function(itemEnv,item){if(!this.isSearchMatch(itemEnv)){return false;}
var found=false,i=0;for(i;i<4;i++){if(this.subnode[i]!==null){found=this.subnode[i].remove(itemEnv,item);if(found){if(this.subnode[i].isPrunable()){this.subnode[i]=null;}
break;}}}
if(found){return found;}
if(this.items.indexOf(item)!==-1){for(var i=this.items.length-1;i>=0;i--){if(this.items[i]===item){this.items.splice(i,1);}}
found=true;}
return found;};jsts.index.quadtree.NodeBase.prototype.isPrunable=function(){return!(this.hasChildren()||this.hasItems());};jsts.index.quadtree.NodeBase.prototype.hasChildren=function(){var i=0;for(i;i<4;i++){if(this.subnode[i]!==null){return true;}}
return false;};jsts.index.quadtree.NodeBase.prototype.isEmpty=function(){var isEmpty=true;if(this.items.length>0){isEmpty=false;}
var i=0;for(i;i<4;i++){if(this.subnode[i]!==null){if(!this.subnode[i].isEmpty()){isEmpty=false;}}}
return isEmpty;};jsts.index.quadtree.NodeBase.prototype.addAllItems=function(resultItems){resultItems=resultItems.concat(this.items);var i=0;for(i;i<4;i++){if(this.subnode[i]!==null){resultItems=this.subnode[i].addAllItems(resultItems);}}
return resultItems;};jsts.index.quadtree.NodeBase.prototype.addAllItemsFromOverlapping=function(searchEnv,resultItems){if(!this.isSearchMatch(searchEnv)){return;}
resultItems=resultItems.concat(this.items);var i=0;for(i;i<4;i++){if(this.subnode[i]!==null){resultItems=this.subnode[i].addAllItemsFromOverlapping(searchEnv,resultItems);}}};jsts.index.quadtree.NodeBase.prototype.visit=function(searchEnv,visitor){if(!this.isSearchMatch(searchEnv)){return;}
this.visitItems(searchEnv,visitor);var i=0;for(i;i<4;i++){if(this.subnode[i]!==null){this.subnode[i].visit(searchEnv,visitor);}}};jsts.index.quadtree.NodeBase.prototype.visitItems=function(env,visitor){var i=0,il=this.items.length;for(i;i<il;i++){visitor.visitItem(this.items[i]);}};jsts.index.quadtree.NodeBase.prototype.depth=function(){var maxSubDepth=0,i=0,sqd;for(i;i<4;i++){if(this.subnode[i]!==null){sqd=this.subnode[i].depth();if(sqd>maxSubDepth){maxSubDepth=sqd;}}}
return maxSubDepth+1;};jsts.index.quadtree.NodeBase.prototype.size=function(){var subSize=0,i=0;for(i;i<4;i++){if(this.subnode[i]!==null){subSize+=this.subnode[i].size();}}
return subSize+this.items.length;};jsts.index.quadtree.NodeBase.prototype.getNodeCount=function(){var subSize=0,i=0;for(i;i<4;i++){if(this.subnode[i]!==null){subSize+=this.subnode[i].size();}}
return subSize+1;};jsts.index.quadtree.Node=function(env,level){jsts.index.quadtree.NodeBase.prototype.constructor.apply(this,arguments);this.env=env;this.level=level;this.centre=new jsts.geom.Coordinate();this.centre.x=(env.getMinX()+env.getMaxX())/2;this.centre.y=(env.getMinY()+env.getMaxY())/2;};jsts.index.quadtree.Node.prototype=new jsts.index.quadtree.NodeBase();jsts.index.quadtree.Node.createNode=function(env){var key,node;key=new jsts.index.quadtree.Key(env);node=new jsts.index.quadtree.Node(key.getEnvelope(),key.getLevel());return node;};jsts.index.quadtree.Node.createExpanded=function(node,addEnv){var expandEnv=new jsts.geom.Envelope(addEnv),largerNode;if(node!==null){expandEnv.expandToInclude(node.env);}
largerNode=jsts.index.quadtree.Node.createNode(expandEnv);if(node!==null){largerNode.insertNode(node);}
return largerNode;};jsts.index.quadtree.Node.prototype.getEnvelope=function(){return this.env;};jsts.index.quadtree.Node.prototype.isSearchMatch=function(searchEnv){return this.env.intersects(searchEnv);};jsts.index.quadtree.Node.prototype.getNode=function(searchEnv){var subnodeIndex=this.getSubnodeIndex(searchEnv,this.centre),node;if(subnodeIndex!==-1){node=this.getSubnode(subnodeIndex);return node.getNode(searchEnv);}else{return this;}};jsts.index.quadtree.Node.prototype.find=function(searchEnv){var subnodeIndex=this.getSubnodeIndex(searchEnv,this.centre),node;if(subnodeIndex===-1){return this;}
if(this.subnode[subnodeIndex]!==null){node=this.subnode[subnodeIndex];return node.find(searchEnv);}
return this;};jsts.index.quadtree.Node.prototype.insertNode=function(node){var index=this.getSubnodeIndex(node.env,this.centre),childNode;if(node.level===this.level-1){this.subnode[index]=node;}else{childNode=this.createSubnode(index);childNode.insertNode(node);this.subnode[index]=childNode;}};jsts.index.quadtree.Node.prototype.getSubnode=function(index){if(this.subnode[index]===null){this.subnode[index]=this.createSubnode(index);}
return this.subnode[index];};jsts.index.quadtree.Node.prototype.createSubnode=function(index){var minx=0.0,maxx=0.0,miny=0.0,maxy=0.0,sqEnv,node;switch(index){case 0:minx=this.env.getMinX();maxx=this.centre.x;miny=this.env.getMinY();maxy=this.centre.y;break;case 1:minx=this.centre.x;maxx=this.env.getMaxX();miny=this.env.getMinY();maxy=this.centre.y;break;case 2:minx=this.env.getMinX();maxx=this.centre.x;miny=this.centre.y;maxy=this.env.getMaxY();break;case 3:minx=this.centre.x;maxx=this.env.getMaxX();miny=this.centre.y;maxy=this.env.getMaxY();break;}
sqEnv=new jsts.geom.Envelope(minx,maxx,miny,maxy);node=new jsts.index.quadtree.Node(sqEnv,this.level-1);return node;};(function(){jsts.triangulate.quadedge.QuadEdge=function(){this.rot=null;this.vertex=null;this.next=null;this.data=null;};var QuadEdge=jsts.triangulate.quadedge.QuadEdge;jsts.triangulate.quadedge.QuadEdge.makeEdge=function(o,d){var q0,q1,q2,q3,base;q0=new QuadEdge();q1=new QuadEdge();q2=new QuadEdge();q3=new QuadEdge();q0.rot=q1;q1.rot=q2;q2.rot=q3;q3.rot=q0;q0.setNext(q0);q1.setNext(q3);q2.setNext(q2);q3.setNext(q1);base=q0;base.setOrig(o);base.setDest(d);return base;};jsts.triangulate.quadedge.QuadEdge.connect=function(a,b){var e=QuadEdge.makeEdge(a.dest(),b.orig());QuadEdge.splice(e,a.lNext());QuadEdge.splice(e.sym(),b);return e;};jsts.triangulate.quadedge.QuadEdge.splice=function(a,b){var alpha,beta,t1,t2,t3,t4;alpha=a.oNext().rot;beta=b.oNext().rot;t1=b.oNext();t2=a.oNext();t3=beta.oNext();t4=alpha.oNext();a.setNext(t1);b.setNext(t2);alpha.setNext(t3);beta.setNext(t4);};jsts.triangulate.quadedge.QuadEdge.swap=function(e){var a,b;a=e.oPrev();b=e.sym().oPrev();QuadEdge.splice(e,a);QuadEdge.splice(e.sym(),b);QuadEdge.splice(e,a.lNext());QuadEdge.splice(e.sym(),b.lNext());e.setOrig(a.dest());e.setDest(b.dest());};jsts.triangulate.quadedge.QuadEdge.prototype.getPrimary=function(){if(this.orig().getCoordinate().compareTo(this.dest().getCoordinate())<=0){return this;}
else{return this.sym();}};jsts.triangulate.quadedge.QuadEdge.prototype.setData=function(data){this.data=data;};jsts.triangulate.quadedge.QuadEdge.prototype.getData=function(){return this.data;};jsts.triangulate.quadedge.QuadEdge.prototype.delete_jsts=function(){this.rot=null;};jsts.triangulate.quadedge.QuadEdge.prototype.isLive=function(){return this.rot!==null;};jsts.triangulate.quadedge.QuadEdge.prototype.setNext=function(next){this.next=next;};jsts.triangulate.quadedge.QuadEdge.prototype.invRot=function(){return this.rot.sym();};jsts.triangulate.quadedge.QuadEdge.prototype.sym=function(){return this.rot.rot;};jsts.triangulate.quadedge.QuadEdge.prototype.oNext=function(){return this.next;};jsts.triangulate.quadedge.QuadEdge.prototype.oPrev=function(){return this.rot.next.rot;};jsts.triangulate.quadedge.QuadEdge.prototype.dNext=function(){return this.sym().oNext().sym();};jsts.triangulate.quadedge.QuadEdge.prototype.dPrev=function(){return this.invRot().oNext().invRot();};jsts.triangulate.quadedge.QuadEdge.prototype.lNext=function(){return this.invRot().oNext().rot;};jsts.triangulate.quadedge.QuadEdge.prototype.lPrev=function(){return this.next.sym();};jsts.triangulate.quadedge.QuadEdge.prototype.rNext=function(){return this.rot.next.invRot();};jsts.triangulate.quadedge.QuadEdge.prototype.rPrev=function(){return this.sym().oNext();};jsts.triangulate.quadedge.QuadEdge.prototype.setOrig=function(o){this.vertex=o;};jsts.triangulate.quadedge.QuadEdge.prototype.setDest=function(d){this.sym().setOrig(d);};jsts.triangulate.quadedge.QuadEdge.prototype.orig=function(){return this.vertex;};jsts.triangulate.quadedge.QuadEdge.prototype.dest=function(){return this.sym().orig();};jsts.triangulate.quadedge.QuadEdge.prototype.getLength=function(){return this.orig().getCoordinate().distance(dest().getCoordinate());};jsts.triangulate.quadedge.QuadEdge.prototype.equalsNonOriented=function(qe){if(this.equalsOriented(qe)){return true;}
if(this.equalsOriented(qe.sym())){return true;}
return false;};jsts.triangulate.quadedge.QuadEdge.prototype.equalsOriented=function(qe){if(this.orig().getCoordinate().equals2D(qe.orig().getCoordinate())&&this.dest().getCoordinate().equals2D(qe.dest().getCoordinate())){return true;}
return false;};jsts.triangulate.quadedge.QuadEdge.prototype.toLineSegment=function()
{return new jsts.geom.LineSegment(this.vertex.getCoordinate(),this.dest().getCoordinate());};jsts.triangulate.quadedge.QuadEdge.prototype.toString=function(){var p0,p1;p0=this.vertex.getCoordinate();p1=this.dest().getCoordinate();return jsts.io.WKTWriter.toLineString(p0,p1);};})();(function(){var Assert=jsts.util.Assert;jsts.geomgraph.EdgeEnd=function(edge,p0,p1,label){this.edge=edge;if(p0&&p1){this.init(p0,p1);}
if(label){this.label=label||null;}};jsts.geomgraph.EdgeEnd.prototype.edge=null;jsts.geomgraph.EdgeEnd.prototype.label=null;jsts.geomgraph.EdgeEnd.prototype.node=null;jsts.geomgraph.EdgeEnd.prototype.p0=null;jsts.geomgraph.EdgeEnd.prototype.p1=null;jsts.geomgraph.EdgeEnd.prototype.dx=null;jsts.geomgraph.EdgeEnd.prototype.dy=null;jsts.geomgraph.EdgeEnd.prototype.quadrant=null;jsts.geomgraph.EdgeEnd.prototype.init=function(p0,p1){this.p0=p0;this.p1=p1;this.dx=p1.x-p0.x;this.dy=p1.y-p0.y;this.quadrant=jsts.geomgraph.Quadrant.quadrant(this.dx,this.dy);Assert.isTrue(!(this.dx===0&&this.dy===0),'EdgeEnd with identical endpoints found');};jsts.geomgraph.EdgeEnd.prototype.getEdge=function(){return this.edge;};jsts.geomgraph.EdgeEnd.prototype.getLabel=function(){return this.label;};jsts.geomgraph.EdgeEnd.prototype.getCoordinate=function(){return this.p0;};jsts.geomgraph.EdgeEnd.prototype.getDirectedCoordinate=function(){return this.p1;};jsts.geomgraph.EdgeEnd.prototype.getQuadrant=function(){return this.quadrant;};jsts.geomgraph.EdgeEnd.prototype.getDx=function(){return this.dx;};jsts.geomgraph.EdgeEnd.prototype.getDy=function(){return this.dy;};jsts.geomgraph.EdgeEnd.prototype.setNode=function(node){this.node=node;};jsts.geomgraph.EdgeEnd.prototype.getNode=function(){return this.node;};jsts.geomgraph.EdgeEnd.prototype.compareTo=function(e){return this.compareDirection(e);};jsts.geomgraph.EdgeEnd.prototype.compareDirection=function(e){if(this.dx===e.dx&&this.dy===e.dy)
return 0;if(this.quadrant>e.quadrant)
return 1;if(this.quadrant<e.quadrant)
return-1;return jsts.algorithm.CGAlgorithms.computeOrientation(e.p0,e.p1,this.p1);};jsts.geomgraph.EdgeEnd.prototype.computeLabel=function(boundaryNodeRule){};})();jsts.triangulate.quadedge.TrianglePredicate=function(){};jsts.triangulate.quadedge.TrianglePredicate.isInCircleNonRobust=function(a,b,c,p){var isInCircle=(a.x*a.x+a.y*a.y)*jsts.triangulate.quadedge.TrianglePredicate.triArea(b,c,p)-
(b.x*b.x+b.y*b.y)*jsts.triangulate.quadedge.TrianglePredicate.triArea(a,c,p)+
(c.x*c.x+c.y*c.y)*jsts.triangulate.quadedge.TrianglePredicate.triArea(a,b,p)-
(p.x*p.x+p.y*p.y)*jsts.triangulate.quadedge.TrianglePredicate.triArea(a,b,c)>0;return isInCircle;};jsts.triangulate.quadedge.TrianglePredicate.isInCircleNormalized=function(a,b,c,p){var adx,ady,bdx,bdy,cdx,cdy,abdet,bcdet,cadet,alift,blift,clift,disc;adx=a.x-p.x;ady=a.y-p.y;bdx=b.x-p.x;bdy=b.y-p.y;cdx=c.x-p.x;cdy=c.y-p.y;abdet=adx*bdy-bdx*ady;bcdet=bdx*cdy-cdx*bdy;cadet=cdx*ady-adx*cdy;alift=adx*adx+ady*ady;blift=bdx*bdx+bdy*bdy;clift=cdx*cdx+cdy*cdy;disc=alift*bcdet+blift*cadet+clift*abdet;return disc>0;};jsts.triangulate.quadedge.TrianglePredicate.triArea=function(a,b,c){return(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);};jsts.triangulate.quadedge.TrianglePredicate.isInCircleRobust=function(a,b,c,p){return jsts.triangulate.quadedge.TrianglePredicate.isInCircleNormalized(a,b,c,p);};jsts.triangulate.quadedge.TrianglePredicate.isInCircleDDSlow=function(a,b,c,p){var px,py,ax,ay,bx,by,cx,cy,aTerm,bTerm,cTerm,pTerm,sum,isInCircle;px=jsts.math.DD.valueOf(p.x);py=jsts.math.DD.valueOf(p.y);ax=jsts.math.DD.valueOf(a.x);ay=jsts.math.DD.valueOf(a.y);bx=jsts.math.DD.valueOf(b.x);by=jsts.math.DD.valueOf(b.y);cx=jsts.math.DD.valueOf(c.x);cy=jsts.math.DD.valueOf(c.y);aTerm=(ax.multiply(ax).add(ay.multiply(ay))).multiply(jsts.triangulate.quadedge.TrianglePredicate.triAreaDDSlow(bx,by,cx,cy,px,py));bTerm=(bx.multiply(bx).add(by.multiply(by))).multiply(jsts.triangulate.quadedge.TrianglePredicate.triAreaDDSlow(ax,ay,cx,cy,px,py));cTerm=(cx.multiply(cx).add(cy.multiply(cy))).multiply(jsts.triangulate.quadedge.TrianglePredicate.triAreaDDSlow(ax,ay,bx,by,px,py));pTerm=(px.multiply(px).add(py.multiply(py))).multiply(jsts.triangulate.quadedge.TrianglePredicate.triAreaDDSlow(ax,ay,bx,by,cx,cy));sum=aTerm.subtract(bTerm).add(cTerm).subtract(pTerm);isInCircle=sum.doubleValue()>0;return isInCircle;};jsts.triangulate.quadedge.TrianglePredicate.triAreaDDSlow=function(ax,ay,bx,by,cx,cy){return(bx.subtract(ax).multiply(cy.subtract(ay)).subtract(by.subtract(ay).multiply(cx.subtract(ax))));};jsts.triangulate.quadedge.TrianglePredicate.isInCircleDDFast=function(a,b,c,p){var aTerm,bTerm,cTerm,pTerm,sum,isInCircle;aTerm=(jsts.math.DD.sqr(a.x).selfAdd(jsts.math.DD.sqr(a.y))).selfMultiply(jsts.triangulate.quadedge.TrianglePredicate.triAreaDDFast(b,c,p));bTerm=(jsts.math.DD.sqr(b.x).selfAdd(jsts.math.DD.sqr(b.y))).selfMultiply(jsts.triangulate.quadedge.TrianglePredicate.triAreaDDFast(a,c,p));cTerm=(jsts.math.DD.sqr(c.x).selfAdd(jsts.math.DD.sqr(c.y))).selfMultiply(jsts.triangulate.quadedge.TrianglePredicate.triAreaDDFast(a,b,p));pTerm=(jsts.math.DD.sqr(p.x).selfAdd(jsts.math.DD.sqr(p.y))).selfMultiply(jsts.triangulate.quadedge.TrianglePredicate.triAreaDDFast(a,b,c));sum=aTerm.selfSubtract(bTerm).selfAdd(cTerm).selfSubtract(pTerm);isInCircle=sum.doubleValue()>0;return isInCircle;};jsts.triangulate.quadedge.TrianglePredicate.triAreaDDFast=function(a,b,c){var t1,t2;t1=jsts.math.DD.valueOf(b.x).selfSubtract(a.x).selfMultiply(jsts.math.DD.valueOf(c.y).selfSubtract(a.y));t2=jsts.math.DD.valueOf(b.y).selSubtract(a.y).selfMultiply(jsts.math.DD.valueOf(c.x).selfSubtract(a.x));return t1.selfSubtract(t2);};jsts.triangulate.quadedge.TrianglePredicate.isInCircleDDNormalized=function(a,b,c,p){var adx,ady,bdx,bdy,cdx,cdy,abdet,bcdet,cadet,alift,blift,clift,sum,isInCircle;adx=jsts.math.DD.valueOf(a.x).selfSubtract(p.x);ady=jsts.math.DD.valueOf(a.y).selfSubtract(p.y);bdx=jsts.math.DD.valueOf(b.x).selfSubtract(p.x);bdx=jsts.math.DD.valueOf(b.y).selfSubtract(p.y);cdx=jsts.math.DD.valueOf(c.x).selfSubtract(p.x);cdx=jsts.math.DD.valueOf(c.y).selfSubtract(p.y);abdet=adx.multiply(bdy).selfSubtract(bdx.multiply(ady));bcdet=bdx.multiply(cdy).selfSubtract(cdx.multiply(bdy));cadet=cdx.multiply(ady).selfSubtract(adx.multiply(cdy));alift=adx.multiply(adx).selfAdd(ady.multiply(ady));blift=bdx.multiply(bdx).selfAdd(bdy.multiply(bdy));clift=cdx.multiply(cdx).selfAdd(cdy.multiply(cdy));sum=alift.selfMultiply(bcdet).selfAdd(blift.selfMultiply(cadet)).selfAdd(clift.selfMultiply(abdet));isInCircle=sum.doubleValue()>0;return isInCircle;};jsts.triangulate.quadedge.TrianglePredicate.isInCircleCC=function(a,b,c,p){var cc,ccRadius,pRadiusDiff;cc=jsts.geom.Triangle.circumcentre(a,b,c);ccRadius=a.distance(cc);pRadiusDiff=p.distance(cc)-ccRadius;return pRadiusDiff<=0;};jsts.operation.buffer.RightmostEdgeFinder=function(){};jsts.operation.buffer.RightmostEdgeFinder.prototype.minIndex=-1;jsts.operation.buffer.RightmostEdgeFinder.prototype.minCoord=null;jsts.operation.buffer.RightmostEdgeFinder.prototype.minDe=null;jsts.operation.buffer.RightmostEdgeFinder.prototype.orientedDe=null;jsts.operation.buffer.RightmostEdgeFinder.prototype.getEdge=function(){return this.orientedDe;};jsts.operation.buffer.RightmostEdgeFinder.prototype.getCoordinate=function(){return this.minCoord;};jsts.operation.buffer.RightmostEdgeFinder.prototype.findEdge=function(dirEdgeList){for(var i=dirEdgeList.iterator();i.hasNext();){var de=i.next();if(!de.isForward())
continue;this.checkForRightmostCoordinate(de);}
jsts.util.Assert.isTrue(this.minIndex!==0||this.minCoord.equals(this.minDe.getCoordinate()),'inconsistency in rightmost processing');if(this.minIndex===0){this.findRightmostEdgeAtNode();}else{this.findRightmostEdgeAtVertex();}
this.orientedDe=this.minDe;var rightmostSide=this.getRightmostSide(this.minDe,this.minIndex);if(rightmostSide==jsts.geomgraph.Position.LEFT){this.orientedDe=this.minDe.getSym();}};jsts.operation.buffer.RightmostEdgeFinder.prototype.findRightmostEdgeAtNode=function(){var node=this.minDe.getNode();var star=node.getEdges();this.minDe=star.getRightmostEdge();if(!this.minDe.isForward()){this.minDe=this.minDe.getSym();this.minIndex=this.minDe.getEdge().getCoordinates().length-1;}};jsts.operation.buffer.RightmostEdgeFinder.prototype.findRightmostEdgeAtVertex=function(){var pts=this.minDe.getEdge().getCoordinates();jsts.util.Assert.isTrue(this.minIndex>0&&this.minIndex<pts.length,'rightmost point expected to be interior vertex of edge');var pPrev=pts[this.minIndex-1];var pNext=pts[this.minIndex+1];var orientation=jsts.algorithm.CGAlgorithms.computeOrientation(this.minCoord,pNext,pPrev);var usePrev=false;if(pPrev.y<this.minCoord.y&&pNext.y<this.minCoord.y&&orientation===jsts.algorithm.CGAlgorithms.COUNTERCLOCKWISE){usePrev=true;}else if(pPrev.y>this.minCoord.y&&pNext.y>this.minCoord.y&&orientation===jsts.algorithm.CGAlgorithms.CLOCKWISE){usePrev=true;}
if(usePrev){this.minIndex=this.minIndex-1;}};jsts.operation.buffer.RightmostEdgeFinder.prototype.checkForRightmostCoordinate=function(de){var coord=de.getEdge().getCoordinates();for(var i=0;i<coord.length-1;i++){if(this.minCoord===null||coord[i].x>this.minCoord.x){this.minDe=de;this.minIndex=i;this.minCoord=coord[i];}}};jsts.operation.buffer.RightmostEdgeFinder.prototype.getRightmostSide=function(de,index){var side=this.getRightmostSideOfSegment(de,index);if(side<0)
side=this.getRightmostSideOfSegment(de,index-1);if(side<0){this.minCoord=null;this.checkForRightmostCoordinate(de);}
return side;};jsts.operation.buffer.RightmostEdgeFinder.prototype.getRightmostSideOfSegment=function(de,i){var e=de.getEdge();var coord=e.getCoordinates();if(i<0||i+1>=coord.length)
return-1;if(coord[i].y==coord[i+1].y)
return-1;var pos=jsts.geomgraph.Position.LEFT;if(coord[i].y<coord[i+1].y)
pos=jsts.geomgraph.Position.RIGHT;return pos;};(function(){jsts.triangulate.IncrementalDelaunayTriangulator=function(subdiv){this.subdiv=subdiv;this.isUsingTolerance=subdiv.getTolerance()>0.0;};jsts.triangulate.IncrementalDelaunayTriangulator.prototype.insertSites=function(vertices){var i=0,il=vertices.length,v;for(i;i<il;i++){v=vertices[i];this.insertSite(v);}};jsts.triangulate.IncrementalDelaunayTriangulator.prototype.insertSite=function(v){var e,base,startEdge,t;e=this.subdiv.locate(v);if(this.subdiv.isVertexOfEdge(e,v)){return e;}
else if(this.subdiv.isOnEdge(e,v.getCoordinate())){e=e.oPrev();this.subdiv.delete_jsts(e.oNext());}
base=this.subdiv.makeEdge(e.orig(),v);jsts.triangulate.quadedge.QuadEdge.splice(base,e);startEdge=base;do{base=this.subdiv.connect(e,base.sym());e=base.oPrev();}while(e.lNext()!=startEdge);do{t=e.oPrev();if(t.dest().rightOf(e)&&v.isInCircle(e.orig(),t.dest(),e.dest())){jsts.triangulate.quadedge.QuadEdge.swap(e);e=e.oPrev();}else if(e.oNext()==startEdge){return base;}else{e=e.oNext().lPrev();}}while(true);};}());jsts.noding.OrientedCoordinateArray=function(pts){this.pts=pts;this._orientation=jsts.noding.OrientedCoordinateArray.orientation(pts);};jsts.noding.OrientedCoordinateArray.prototype.pts=null;jsts.noding.OrientedCoordinateArray.prototype._orientation=undefined;jsts.noding.OrientedCoordinateArray.orientation=function(pts){return jsts.geom.CoordinateArrays.increasingDirection(pts)===1;};jsts.noding.OrientedCoordinateArray.prototype.compareTo=function(o1){var oca=o1;var comp=jsts.noding.OrientedCoordinateArray.compareOriented(this.pts,this._orientation,oca.pts,oca._orientation);return comp;};jsts.noding.OrientedCoordinateArray.compareOriented=function(pts1,orientation1,pts2,orientation2){var dir1=orientation1?1:-1;var dir2=orientation2?1:-1;var limit1=orientation1?pts1.length:-1;var limit2=orientation2?pts2.length:-1;var i1=orientation1?0:pts1.length-1;var i2=orientation2?0:pts2.length-1;var comp=0;while(true){var compPt=pts1[i1].compareTo(pts2[i2]);if(compPt!==0)
return compPt;i1+=dir1;i2+=dir2;var done1=i1===limit1;var done2=i2===limit2;if(done1&&!done2)
return-1;if(!done1&&done2)
return 1;if(done1&&done2)
return 0;}};jsts.index.quadtree.Root=function(){jsts.index.quadtree.NodeBase.prototype.constructor.apply(this,arguments);this.origin=new jsts.geom.Coordinate(0.0,0.0);};jsts.index.quadtree.Root.prototype=new jsts.index.quadtree.NodeBase();jsts.index.quadtree.Root.prototype.insert=function(itemEnv,item){var index=this.getSubnodeIndex(itemEnv,this.origin);if(index===-1){this.add(item);return;}
var node=this.subnode[index];if(node===null||!node.getEnvelope().contains(itemEnv)){var largerNode=jsts.index.quadtree.Node.createExpanded(node,itemEnv);this.subnode[index]=largerNode;}
this.insertContained(this.subnode[index],itemEnv,item);};jsts.index.quadtree.Root.prototype.insertContained=function(tree,itemEnv,item){var isZeroX,isZeroY,node;isZeroX=jsts.index.IntervalSize.isZeroWidth(itemEnv.getMinX(),itemEnv.getMaxX());isZeroY=jsts.index.IntervalSize.isZeroWidth(itemEnv.getMinY(),itemEnv.getMaxY());if(isZeroX||isZeroY){node=tree.find(itemEnv);}else{node=tree.getNode(itemEnv);}
node.add(item);};jsts.index.quadtree.Root.prototype.isSearchMatch=function(searchEnv){return true;};jsts.triangulate.quadedge.Vertex=function(){if(arguments.length===1){this.initFromCoordinate(arguments[0]);}else{this.initFromXY(arguments[0],arguments[1]);}};jsts.triangulate.quadedge.Vertex.LEFT=0;jsts.triangulate.quadedge.Vertex.RIGHT=1;jsts.triangulate.quadedge.Vertex.BEYOND=2;jsts.triangulate.quadedge.Vertex.BEHIND=3;jsts.triangulate.quadedge.Vertex.BETWEEN=4;jsts.triangulate.quadedge.Vertex.ORIGIN=5;jsts.triangulate.quadedge.Vertex.DESTINATION=6;jsts.triangulate.quadedge.Vertex.prototype.initFromXY=function(x,y){this.p=new jsts.geom.Coordinate(x,y);};jsts.triangulate.quadedge.Vertex.prototype.initFromCoordinate=function(_p){this.p=new jsts.geom.Coordinate(_p);};jsts.triangulate.quadedge.Vertex.prototype.getX=function(){return this.p.x;};jsts.triangulate.quadedge.Vertex.prototype.getY=function(){return this.p.y;};jsts.triangulate.quadedge.Vertex.prototype.getZ=function(){return this.p.z;};jsts.triangulate.quadedge.Vertex.prototype.setZ=function(z){this.p.z=z;};jsts.triangulate.quadedge.Vertex.prototype.getCoordinate=function(){return this.p;};jsts.triangulate.quadedge.Vertex.prototype.toString=function(){return'POINT ('+this.p.x+' '+this.p.y+')';};jsts.triangulate.quadedge.Vertex.prototype.equals=function(){if(arguments.length===1){return this.equalsExact(arguments[0]);}else{return this.equalsWithTolerance(arguments[0],arguments[1]);}};jsts.triangulate.quadedge.Vertex.prototype.equalsExact=function(other){return(this.p.x===other.getX()&&this.p.y===other.getY());};jsts.triangulate.quadedge.Vertex.prototype.equalsWithTolerance=function(other,tolerance){return(this.p.distance(other.getCoordinate())<tolerance);};jsts.triangulate.quadedge.Vertex.prototype.classify=function(p0,p1){var p2,a,b,sa;p2=this;a=p1.sub(p0);b=p2.sub(p0);sa=a.crossProduct(b);if(sa>0.0){return jsts.triangulate.quadedge.Vertex.LEFT;}
if(sa<0.0){return jsts.triangulate.quadedge.Vertex.RIGHT;}
if((a.getX()*b.getX()<0.0)||(a.getY()*b.getY()<0.0)){return jsts.triangulate.quadedge.Vertex.BEHIND;}
if(a.magn()<b.magn()){return jsts.triangulate.quadedge.Vertex.BEYOND;}
if(p0.equals(p2)){return jsts.triangulate.quadedge.Vertex.ORIGIN;}
if(p1.equals(p2)){return jsts.triangulate.quadedge.Vertex.DESTINATION;}
return jsts.triangulate.quadedge.Vertex.BETWEEN;};jsts.triangulate.quadedge.Vertex.prototype.crossProduct=function(v){return((this.p.x*v.getY())-(this.p.y*v.getX()));};jsts.triangulate.quadedge.Vertex.prototype.dot=function(v){return((this.p.x*v.getX())+(this.p.y*v.getY()));};jsts.triangulate.quadedge.Vertex.prototype.times=function(c){return new jsts.triangulate.quadedge.Vertex(c*this.p.x,c*this.p.y);};jsts.triangulate.quadedge.Vertex.prototype.sum=function(v){return new jsts.triangulate.quadedge.Vertex(this.p.x+v.getX(),this.p.y+
v.getY());};jsts.triangulate.quadedge.Vertex.prototype.sub=function(v){return new jsts.triangulate.quadedge.Vertex(this.p.x-v.getX(),this.p.y-
v.getY());};jsts.triangulate.quadedge.Vertex.prototype.magn=function(){return(Math.sqrt((this.p.x*this.p.x)+(this.p.y*this.p.y)));};jsts.triangulate.quadedge.Vertex.prototype.cross=function(){return new Vertex(this.p.y,-this.p.x);};jsts.triangulate.quadedge.Vertex.prototype.isInCircle=function(a,b,c){return jsts.triangulate.quadedge.TrianglePredicate.isInCircleRobust(a.p,b.p,c.p,this.p);};jsts.triangulate.quadedge.Vertex.prototype.isCCW=function(b,c){return((b.p.x-this.p.x)*(c.p.y-this.p.y)-(b.p.y-this.p.y)*(c.p.x-this.p.x)>0);};jsts.triangulate.quadedge.Vertex.prototype.rightOf=function(e){return this.isCCW(e.dest(),e.orig());};jsts.triangulate.quadedge.Vertex.prototype.leftOf=function(e){return this.isCCW(e.orig(),e.dest());};jsts.triangulate.quadedge.Vertex.prototype.bisector=function(a,b){var dx,dy,l1,l2;dx=b.getX()-a.getX();dy=b.getY()-a.getY();l1=new jsts.algorithm.HCoordinate(a.getX()+(dx/2.0),a.getY()+
(dy/2.0),1.0);l2=new jsts.algorithm.HCoordinate(a.getX()-dy+(dx/2.0),a.getY()+
dx+(dy/2.0),1.0);return new jsts.algorithm.HCoordinate(l1,l2);};jsts.triangulate.quadedge.Vertex.prototype.distance=function(v1,v2){return v1.p.distance(v2.p);};jsts.triangulate.quadedge.Vertex.prototype.circumRadiusRatio=function(b,c){var x,radius,edgeLength,el;x=this.circleCenter(b,c);radius=this.distance(x,b);edgeLength=this.distance(this,b);el=this.distance(b,c);if(el<edgeLength){edgeLength=el;}
el=this.distance(c,this);if(el<edgeLength){edgeLength=el;}
return radius/edgeLength;};jsts.triangulate.quadedge.Vertex.prototype.midPoint=function(a){var xm,ym;xm=(this.p.x+a.getX())/2.0;ym=(this.p.y+a.getY())/2.0;return new jsts.triangulate.quadedge.Vertex(xm,ym);};jsts.triangulate.quadedge.Vertex.prototype.circleCenter=function(b,c){var a,cab,cbc,hcc,cc;a=new jsts.triangulate.quadedge.Vertex(this.getX(),this.getY());cab=this.bisector(a,b);cbc=this.bisector(b,c);hcc=new jsts.algorithm.HCoordinate(cab,cbc);cc=null;try{cc=new jsts.triangulate.quadedge.Vertex(hcc.getX(),hcc.getY());}catch(err){}
return cc;};jsts.noding.SegmentNodeList=function(edge){this.nodeMap=new javascript.util.TreeMap();this.edge=edge;};jsts.noding.SegmentNodeList.prototype.nodeMap=null;jsts.noding.SegmentNodeList.prototype.iterator=function(){return this.nodeMap.values().iterator();};jsts.noding.SegmentNodeList.prototype.edge=null;jsts.noding.SegmentNodeList.prototype.getEdge=function(){return this.edge;};jsts.noding.SegmentNodeList.prototype.add=function(intPt,segmentIndex){var eiNew=new jsts.noding.SegmentNode(this.edge,intPt,segmentIndex,this.edge.getSegmentOctant(segmentIndex));var ei=this.nodeMap.get(eiNew);if(ei!==null){jsts.util.Assert.isTrue(ei.coord.equals2D(intPt),'Found equal nodes with different coordinates');return ei;}
this.nodeMap.put(eiNew,eiNew);return eiNew;};jsts.noding.SegmentNodeList.prototype.addEndpoints=function(){var maxSegIndex=this.edge.size()-1;this.add(this.edge.getCoordinate(0),0);this.add(this.edge.getCoordinate(maxSegIndex),maxSegIndex);};jsts.noding.SegmentNodeList.prototype.addCollapsedNodes=function(){var collapsedVertexIndexes=[];this.findCollapsesFromInsertedNodes(collapsedVertexIndexes);this.findCollapsesFromExistingVertices(collapsedVertexIndexes);for(var i=0;i<collapsedVertexIndexes.length;i++){var vertexIndex=collapsedVertexIndexes[i];this.add(this.edge.getCoordinate(vertexIndex),vertexIndex);}};jsts.noding.SegmentNodeList.prototype.findCollapsesFromExistingVertices=function(collapsedVertexIndexes){for(var i=0;i<this.edge.size()-2;i++){var p0=this.edge.getCoordinate(i);var p1=this.edge.getCoordinate(i+1);var p2=this.edge.getCoordinate(i+2);if(p0.equals2D(p2)){collapsedVertexIndexes.push(i+1);}}};jsts.noding.SegmentNodeList.prototype.findCollapsesFromInsertedNodes=function(collapsedVertexIndexes){var collapsedVertexIndex=[null];var it=this.iterator();var eiPrev=it.next();while(it.hasNext()){var ei=it.next();var isCollapsed=this.findCollapseIndex(eiPrev,ei,collapsedVertexIndex);if(isCollapsed)
collapsedVertexIndexes.push(collapsedVertexIndex[0]);eiPrev=ei;}};jsts.noding.SegmentNodeList.prototype.findCollapseIndex=function(ei0,ei1,collapsedVertexIndex){if(!ei0.coord.equals2D(ei1.coord))
return false;var numVerticesBetween=ei1.segmentIndex-ei0.segmentIndex;if(!ei1.isInterior()){numVerticesBetween--;}
if(numVerticesBetween===1){collapsedVertexIndex[0]=ei0.segmentIndex+1;return true;}
return false;};jsts.noding.SegmentNodeList.prototype.addSplitEdges=function(edgeList){this.addEndpoints();this.addCollapsedNodes();var it=this.iterator();var eiPrev=it.next();while(it.hasNext()){var ei=it.next();var newEdge=this.createSplitEdge(eiPrev,ei);edgeList.add(newEdge);eiPrev=ei;}};jsts.noding.SegmentNodeList.prototype.checkSplitEdgesCorrectness=function(splitEdges){var edgePts=edge.getCoordinates();var split0=splitEdges[0];var pt0=split0.getCoordinate(0);if(!pt0.equals2D(edgePts[0]))
throw new Error('bad split edge start point at '+pt0);var splitn=splitEdges[splitEdges.length-1];var splitnPts=splitn.getCoordinates();var ptn=splitnPts[splitnPts.length-1];if(!ptn.equals2D(edgePts[edgePts.length-1]))
throw new Error('bad split edge end point at '+ptn);};jsts.noding.SegmentNodeList.prototype.createSplitEdge=function(ei0,ei1){var npts=ei1.segmentIndex-ei0.segmentIndex+2;var lastSegStartPt=this.edge.getCoordinate(ei1.segmentIndex);var useIntPt1=ei1.isInterior()||!ei1.coord.equals2D(lastSegStartPt);if(!useIntPt1){npts--;}
var pts=[];var ipt=0;pts[ipt++]=new jsts.geom.Coordinate(ei0.coord);for(var i=ei0.segmentIndex+1;i<=ei1.segmentIndex;i++){pts[ipt++]=this.edge.getCoordinate(i);}
if(useIntPt1)
pts[ipt]=ei1.coord;return new jsts.noding.NodedSegmentString(pts,this.edge.getData());};jsts.operation.union.CascadedPolygonUnion=function(polys){this.inputPolys=polys;};jsts.operation.union.CascadedPolygonUnion.union=function(polys){var op=new jsts.operation.union.CascadedPolygonUnion(polys);return op.union();};jsts.operation.union.CascadedPolygonUnion.prototype.inputPolys;jsts.operation.union.CascadedPolygonUnion.prototype.geomFactory=null;jsts.operation.union.CascadedPolygonUnion.prototype.STRTREE_NODE_CAPACITY=4;jsts.operation.union.CascadedPolygonUnion.prototype.union=function(){if(this.inputPolys.length===0){return null;}
this.geomFactory=this.inputPolys[0].getFactory();var index=new jsts.index.strtree.STRtree(this.STRTREE_NODE_CAPACITY);for(var i=0,l=this.inputPolys.length;i<l;i++){var item=this.inputPolys[i];index.insert(item.getEnvelopeInternal(),item);}
var itemTree=index.itemsTree();var unionAll=this.unionTree(itemTree);return unionAll;};jsts.operation.union.CascadedPolygonUnion.prototype.unionTree=function(geomTree){var geoms=this.reduceToGeometries(geomTree);var union=this.bindayUnion(geoms);return union;};jsts.operation.union.CascadedPolygonUnion.prototype.binaryUnion=function(geoms,start,end){start=start||0;end=end||geoms.length;if(end-start<=1){var g0=this.getGeometry(geoms,start);return this.unionSafe(g0,null);}
else if(end-start===2){return this.unionSafe(this.getGeometry(geoms,start),this.getGeometry(geoms,start+1));}
else{var mid=(end+start)/2;var g0=this.binaryUnion(geoms,start,mid);var g1=this.binaryUnion(geoms,mid,end);return this.unionSafe(g0,g1);}};jsts.operation.union.CascadedPolygonUnion.getGeometry=function(list,index){if(index>=list.length){return null;}
return list[i];};jsts.operation.union.CascadedPolygonUnion.prototype.reduceToGeometries=function(geomTree){var geoms=[];for(var i=0,l=geomTree.length;i<l;i++){var o=geomTree[i],geom=null;if(o instanceof Array){geom=this.unionTree(o);}
else if(o instanceof jsts.geom.Geometry){geom=o;}
geoms.push(geom);}
return geoms;};jsts.operation.union.CascadedPolygonUnion.prototype.unionSafe=function(g0,g1){if(g0===null&&g1===null){return null;}
if(g0===null){return g1.clone();}
if(g1===null){return g0.clone();}
return unionOptimized(g0,g1);};jsts.operation.union.CascadedPolygonUnion.prototype.unionOptimized=function(g0,g1){var g0Env=g0.getEnvelopeInternal(),g1Env=g1.getEnvelopeInternal();if(!g0Env.intersects(g1Env)){var combo=jsts.geom.util.GeometryCombiner.combine(g0,g1);return combo;}
if(g0.getNumGeometries<=1&&g1.getNumGeometries<=1){return this.unionActual(g0,g1);}
var commonEnv=g0Env.intersection(g1Env);return this.unionUsingEnvelopeIntersection(g0,g1,commonEnv);};jsts.operation.union.CascadedPolygonUnion.prototype.unionUsingEnvelopeIntersection=function(g0,g1,common){var disjointPolys=[];var g0Int=this.extractByEnvelope(common,g0,disjointPolys);var g1Int=this.extractByEnvelope(common,g1,disjointPolys);var union=this.unionActual(g0Int,g1Int);disjointPolys.push(union);var overallUnion=jsts.geom.util.GeometryCombiner.combine(disjointPolys);return overallUnion;};jsts.operation.union.CascadedPolygonUnion.prototype.extractByEnvelope=function(env,geom,disjointGeoms){var intersectingGeoms=[];for(var i=0;i<geom.getNumGeometries();i++){var elem=geom.getGeometryN(i);if(elem.getEnvelopeInternal().intersects(env)){intersectingGeoms.push(elem);}
else{disjointGeoms.add(elem);}}
return this.geomFactory.buildGeometry(intersectingGeoms);};jsts.operation.union.CascadedPolygonUnion.prototype.unionActual=function(g0,g1){return g0.union(g1);};(function(){jsts.geom.MultiPoint=function(points,factory){this.geometries=points||[];this.factory=factory;};jsts.geom.MultiPoint.prototype=new jsts.geom.GeometryCollection();jsts.geom.MultiPoint.constructor=jsts.geom.MultiPoint;jsts.geom.MultiPoint.prototype.getBoundary=function(){return this.getFactory().createGeometryCollection(null);};jsts.geom.MultiPoint.prototype.getGeometryN=function(n){return this.geometries[n];};jsts.geom.MultiPoint.prototype.equalsExact=function(other,tolerance){if(!this.isEquivalentClass(other)){return false;}
return jsts.geom.GeometryCollection.prototype.equalsExact.call(this,other,tolerance);};jsts.geom.MultiPoint.prototype.CLASS_NAME='jsts.geom.MultiPoint';})();jsts.operation.distance.DistanceOp=function(g0,g1,terminateDistance){this.ptLocator=new jsts.algorithm.PointLocator();this.geom=[];this.geom[0]=g0;this.geom[1]=g1;this.terminateDistance=terminateDistance;};jsts.operation.distance.DistanceOp.prototype.geom=null;jsts.operation.distance.DistanceOp.prototype.terminateDistance=0.0;jsts.operation.distance.DistanceOp.prototype.ptLocator=null;jsts.operation.distance.DistanceOp.prototype.minDistanceLocation=null;jsts.operation.distance.DistanceOp.prototype.minDistance=Number.MAX_VALUE;jsts.operation.distance.DistanceOp.distance=function(g0,g1){var distOp=new jsts.operation.distance.DistanceOp(g0,g1,0.0);return distOp.distance();};jsts.operation.distance.DistanceOp.isWithinDistance=function(g0,g1,distance){var distOp=new jsts.operation.distance.DistanceOp(g0,g1,distance);return distOp.distance()<=distance;};jsts.operation.distance.DistanceOp.nearestPoints=function(g0,g1){var distOp=new jsts.operation.distance.DistanceOp(g0,g1,0.0);return distOp.nearestPoints();};jsts.operation.distance.DistanceOp.prototype.distance=function(){if(this.geom[0]===null||this.geom[1]===null)
throw new jsts.error.IllegalArgumentError('null geometries are not supported');if(this.geom[0].isEmpty()||this.geom[1].isEmpty())
return 0.0;this.computeMinDistance();return this.minDistance;};jsts.operation.distance.DistanceOp.prototype.nearestPoints=function(){this.computeMinDistance();var nearestPts=[this.minDistanceLocation[0].getCoordinate(),this.minDistanceLocation[1].getCoordinate()];return nearestPts;};jsts.operation.distance.DistanceOp.prototype.nearestLocations=function(){this.computeMinDistance();return this.minDistanceLocation;};jsts.operation.distance.DistanceOp.prototype.updateMinDistance=function(locGeom,flip){if(locGeom[0]===null)
return;if(flip){this.minDistanceLocation[0]=locGeom[1];this.minDistanceLocation[1]=locGeom[0];}else{this.minDistanceLocation[0]=locGeom[0];this.minDistanceLocation[1]=locGeom[1];}};jsts.operation.distance.DistanceOp.prototype.computeMinDistance=function(){if(arguments.length>0){this.computeMinDistance2.apply(this,arguments);return;}
if(this.minDistanceLocation!==null)
return;this.minDistanceLocation=[];this.computeContainmentDistance();if(this.minDistance<=this.terminateDistance)
return;this.computeFacetDistance();};jsts.operation.distance.DistanceOp.prototype.computeContainmentDistance=function(){if(arguments.length===2){this.computeContainmentDistance2.apply(this,arguments);return;}else if(arguments.length===3&&(!arguments[0]instanceof jsts.operation.distance.GeometryLocation)){this.computeContainmentDistance3.apply(this,arguments);return;}else if(arguments.length===3){this.computeContainmentDistance4.apply(this,arguments);return;}
var locPtPoly=[];this.computeContainmentDistance2(0,locPtPoly);if(this.minDistance<=this.terminateDistance)
return;this.computeContainmentDistance2(1,locPtPoly);};jsts.operation.distance.DistanceOp.prototype.computeContainmentDistance2=function(polyGeomIndex,locPtPoly){var locationsIndex=1-polyGeomIndex;var polys=jsts.geom.util.PolygonExtracter.getPolygons(this.geom[polyGeomIndex]);if(polys.length>0){var insideLocs=jsts.operation.distance.ConnectedElementLocationFilter.getLocations(this.geom[locationsIndex]);this.computeContainmentDistance3(insideLocs,polys,locPtPoly);if(this.minDistance<=this.terminateDistance){this.minDistanceLocation[locationsIndex]=locPtPoly[0];this.minDistanceLocation[polyGeomIndex]=locPtPoly[1];return;}}};jsts.operation.distance.DistanceOp.prototype.computeContainmentDistance3=function(locs,polys,locPtPoly){for(var i=0;i<locs.length;i++){var loc=locs[i];for(var j=0;j<polys.length;j++){this.computeContainmentDistance4(loc,polys[j],locPtPoly);if(this.minDistance<=this.terminateDistance)
return;}}};jsts.operation.distance.DistanceOp.prototype.computeContainmentDistance4=function(ptLoc,poly,locPtPoly){var pt=ptLoc.getCoordinate();if(jsts.geom.Location.EXTERIOR!==this.ptLocator.locate(pt,poly)){this.minDistance=0.0;locPtPoly[0]=ptLoc;locPtPoly[1]=new jsts.operation.distance.GeometryLocation(poly,pt);return;}};jsts.operation.distance.DistanceOp.prototype.computeFacetDistance=function(){var locGeom=[];var lines0=jsts.geom.util.LinearComponentExtracter.getLines(this.geom[0]);var lines1=jsts.geom.util.LinearComponentExtracter.getLines(this.geom[1]);var pts0=jsts.geom.util.PointExtracter.getPoints(this.geom[0]);var pts1=jsts.geom.util.PointExtracter.getPoints(this.geom[1]);this.computeMinDistanceLines(lines0,lines1,locGeom);this.updateMinDistance(locGeom,false);if(this.minDistance<=this.terminateDistance)
return;locGeom[0]=null;locGeom[1]=null;this.computeMinDistanceLinesPoints(lines0,pts1,locGeom);this.updateMinDistance(locGeom,false);if(this.minDistance<=this.terminateDistance)
return;locGeom[0]=null;locGeom[1]=null;this.computeMinDistanceLinesPoints(lines1,pts0,locGeom);this.updateMinDistance(locGeom,true);if(this.minDistance<=this.terminateDistance)
return;locGeom[0]=null;locGeom[1]=null;this.computeMinDistancePoints(pts0,pts1,locGeom);this.updateMinDistance(locGeom,false);};jsts.operation.distance.DistanceOp.prototype.computeMinDistanceLines=function(lines0,lines1,locGeom){for(var i=0;i<lines0.length;i++){var line0=lines0[i];for(var j=0;j<lines1.length;j++){var line1=lines1[j];this.computeMinDistance(line0,line1,locGeom);if(this.minDistance<=this.terminateDistance)
return;}}};jsts.operation.distance.DistanceOp.prototype.computeMinDistancePoints=function(points0,points1,locGeom){for(var i=0;i<points0.length;i++){var pt0=points0[i];for(var j=0;j<points1.length;j++){var pt1=points1[j];var dist=pt0.getCoordinate().distance(pt1.getCoordinate());if(dist<this.minDistance){this.minDistance=dist;locGeom[0]=new jsts.operation.distance.GeometryLocation(pt0,0,pt0.getCoordinate());locGeom[1]=new jsts.operation.distance.GeometryLocation(pt1,0,pt1.getCoordinate());}
if(this.minDistance<=this.terminateDistance)
return;}}};jsts.operation.distance.DistanceOp.prototype.computeMinDistanceLinesPoints=function(lines,points,locGeom){for(var i=0;i<lines.length;i++){var line=lines[i];for(var j=0;j<points.length;j++){var pt=points[j];this.computeMinDistance(line,pt,locGeom);if(this.minDistance<=this.terminateDistance)
return;}}};jsts.operation.distance.DistanceOp.prototype.computeMinDistance2=function(line0,line1,locGeom){if(line1 instanceof jsts.geom.Point){this.computeMinDistance3(line0,line1,locGeom);return;}
if(line0.getEnvelopeInternal().distance(line1.getEnvelopeInternal())>this.minDistance){return;}
var coord0=line0.getCoordinates();var coord1=line1.getCoordinates();for(var i=0;i<coord0.length-1;i++){for(var j=0;j<coord1.length-1;j++){var dist=jsts.algorithm.CGAlgorithms.distanceLineLine(coord0[i],coord0[i+1],coord1[j],coord1[j+1]);if(dist<this.minDistance){this.minDistance=dist;var seg0=new jsts.geom.LineSegment(coord0[i],coord0[i+1]);var seg1=new jsts.geom.LineSegment(coord1[j],coord1[j+1]);var closestPt=seg0.closestPoints(seg1);locGeom[0]=new jsts.operation.distance.GeometryLocation(line0,i,closestPt[0]);locGeom[1]=new jsts.operation.distance.GeometryLocation(line1,j,closestPt[1]);}
if(this.minDistance<=this.terminateDistance){return;}}}};jsts.operation.distance.DistanceOp.prototype.computeMinDistance3=function(line,pt,locGeom){if(line.getEnvelopeInternal().distance(pt.getEnvelopeInternal())>this.minDistance){return;}
var coord0=line.getCoordinates();var coord=pt.getCoordinate();for(var i=0;i<coord0.length-1;i++){var dist=jsts.algorithm.CGAlgorithms.distancePointLine(coord,coord0[i],coord0[i+1]);if(dist<this.minDistance){this.minDistance=dist;var seg=new jsts.geom.LineSegment(coord0[i],coord0[i+1]);var segClosestPoint=seg.closestPoint(coord);locGeom[0]=new jsts.operation.distance.GeometryLocation(line,i,segClosestPoint);locGeom[1]=new jsts.operation.distance.GeometryLocation(pt,0,coord);}
if(this.minDistance<=this.terminateDistance){return;}}};(function(){var HotPixelSnapAction=function(hotPixel,parentEdge,vertexIndex){this.hotPixel=hotPixel;this.parentEdge=parentEdge;this.vertexIndex=vertexIndex;};HotPixelSnapAction.prototype=new jsts.index.chain.MonotoneChainSelectAction();HotPixelSnapAction.constructor=HotPixelSnapAction;HotPixelSnapAction.prototype.hotPixel=null;HotPixelSnapAction.prototype.parentEdge=null;HotPixelSnapAction.prototype.vertexIndex=null;HotPixelSnapAction.prototype._isNodeAdded=false;HotPixelSnapAction.prototype.isNodeAdded=function(){return this._isNodeAdded;};HotPixelSnapAction.prototype.select=function(mc,startIndex){var ss=mc.getContext();if(this.parentEdge!==null){if(ss===this.parentEdge&&startIndex===this.vertexIndex)
return;}
this._isNodeAdded=this.hotPixel.addSnappedNode(ss,startIndex);};jsts.noding.snapround.MCIndexPointSnapper=function(index){this.index=index;};jsts.noding.snapround.MCIndexPointSnapper.prototype.index=null;jsts.noding.snapround.MCIndexPointSnapper.prototype.snap=function(hotPixel,parentEdge,vertexIndex){if(arguments.length===1){this.snap2.apply(this,arguments);return;}
var pixelEnv=hotPixel.getSafeEnvelope();var hotPixelSnapAction=new HotPixelSnapAction(hotPixel,parentEdge,vertexIndex);this.index.query(pixelEnv,{visitItem:function(testChain){testChain.select(pixelEnv,hotPixelSnapAction);}});return hotPixelSnapAction.isNodeAdded();};jsts.noding.snapround.MCIndexPointSnapper.prototype.snap2=function(hotPixel){return this.snap(hotPixel,null,-1);};})();jsts.geomgraph.Quadrant=function(){};jsts.geomgraph.Quadrant.NE=0;jsts.geomgraph.Quadrant.NW=1;jsts.geomgraph.Quadrant.SW=2;jsts.geomgraph.Quadrant.SE=3;jsts.geomgraph.Quadrant.quadrant=function(dx,dy){if(dx instanceof jsts.geom.Coordinate){return jsts.geomgraph.Quadrant.quadrant2.apply(this,arguments);}
if(dx===0.0&&dy===0.0)
throw new jsts.error.IllegalArgumentError('Cannot compute the quadrant for point ( '+dx+', '+dy+' )');if(dx>=0.0){if(dy>=0.0)
return jsts.geomgraph.Quadrant.NE;else
return jsts.geomgraph.Quadrant.SE;}else{if(dy>=0.0)
return jsts.geomgraph.Quadrant.NW;else
return jsts.geomgraph.Quadrant.SW;}};jsts.geomgraph.Quadrant.quadrant2=function(p0,p1){if(p1.x===p0.x&&p1.y===p0.y)
throw new jsts.error.IllegalArgumentError('Cannot compute the quadrant for two identical points '+p0);if(p1.x>=p0.x){if(p1.y>=p0.y)
return jsts.geomgraph.Quadrant.NE;else
return jsts.geomgraph.Quadrant.SE;}else{if(p1.y>=p0.y)
return jsts.geomgraph.Quadrant.NW;else
return jsts.geomgraph.Quadrant.SW;}};jsts.geomgraph.Quadrant.isOpposite=function(quad1,quad2){if(quad1===quad2)
return false;var diff=(quad1-quad2+4)%4;if(diff===2)
return true;return false;};jsts.geomgraph.Quadrant.commonHalfPlane=function(quad1,quad2){if(quad1===quad2)
return quad1;var diff=(quad1-quad2+4)%4;if(diff===2)
return-1;var min=(quad1<quad2)?quad1:quad2;var max=(quad1>quad2)?quad1:quad2;if(min===0&&max===3)
return 3;return min;};jsts.geomgraph.Quadrant.isInHalfPlane=function(quad,halfPlane){if(halfPlane===jsts.geomgraph.Quadrant.SE){return quad===jsts.geomgraph.Quadrant.SE||quad===jsts.geomgraph.Quadrant.SW;}
return quad===halfPlane||quad===halfPlane+1;};jsts.geomgraph.Quadrant.isNorthern=function(quad){return quad===jsts.geomgraph.Quadrant.NE||quad===jsts.geomgraph.Quadrant.NW;};jsts.operation.valid.ConsistentAreaTester=function(geomGraph){this.geomGraph=geomGraph;this.li=new jsts.algorithm.RobustLineIntersector();this.nodeGraph=new jsts.operation.relate.RelateNodeGraph();this.invalidPoint=null;};jsts.operation.valid.ConsistentAreaTester.prototype.getInvalidPoint=function(){return this.invalidPoint;};jsts.operation.valid.ConsistentAreaTester.prototype.isNodeConsistentArea=function(){var intersector=this.geomGraph.computeSelfNodes(this.li,true);if(intersector.hasProperIntersection()){this.invalidPoint=intersector.getProperIntersectionPoint();return false;}
this.nodeGraph.build(this.geomGraph);return this.isNodeEdgeAreaLabelsConsistent();};jsts.operation.valid.ConsistentAreaTester.prototype.isNodeEdgeAreaLabelsConsistent=function(){for(var nodeIt=this.nodeGraph.getNodeIterator();nodeIt.hasNext();){var node=nodeIt.next();if(!node.getEdges().isAreaLabelsConsistent(this.geomGraph)){this.invalidPoint=node.getCoordinate().clone();return false;}}
return true;};jsts.operation.valid.ConsistentAreaTester.prototype.hasDuplicateRings=function(){for(var nodeIt=this.nodeGraph.getNodeIterator();nodeIt.hasNext();){var node=nodeIt.next();for(var i=node.getEdges().iterator();i.hasNext();){var eeb=i.next();if(eeb.getEdgeEnds().length>1){invalidPoint=eeb.getEdge().getCoordinate(0);return true;}}}
return false;};jsts.index.strtree.AbstractNode=function(level){this.level=level;this.childBoundables=[];};jsts.index.strtree.AbstractNode.prototype=new jsts.index.strtree.Boundable();jsts.index.strtree.AbstractNode.constructor=jsts.index.strtree.AbstractNode;jsts.index.strtree.AbstractNode.prototype.childBoundables=null;jsts.index.strtree.AbstractNode.prototype.bounds=null;jsts.index.strtree.AbstractNode.prototype.level=null;jsts.index.strtree.AbstractNode.prototype.getChildBoundables=function(){return this.childBoundables;};jsts.index.strtree.AbstractNode.prototype.computeBounds=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.index.strtree.AbstractNode.prototype.getBounds=function(){if(this.bounds===null){this.bounds=this.computeBounds();}
return this.bounds;};jsts.index.strtree.AbstractNode.prototype.getLevel=function(){return this.level;};jsts.index.strtree.AbstractNode.prototype.addChildBoundable=function(childBoundable){this.childBoundables.push(childBoundable);};(function(){var Location=jsts.geom.Location;var Position=jsts.geomgraph.Position;var EdgeEnd=jsts.geomgraph.EdgeEnd;jsts.geomgraph.DirectedEdge=function(edge,isForward){EdgeEnd.call(this,edge);this.depth=[0,-999,-999];this._isForward=isForward;if(isForward){this.init(edge.getCoordinate(0),edge.getCoordinate(1));}else{var n=edge.getNumPoints()-1;this.init(edge.getCoordinate(n),edge.getCoordinate(n-1));}
this.computeDirectedLabel();};jsts.geomgraph.DirectedEdge.prototype=new EdgeEnd();jsts.geomgraph.DirectedEdge.constructor=jsts.geomgraph.DirectedEdge;jsts.geomgraph.DirectedEdge.depthFactor=function(currLocation,nextLocation){if(currLocation===Location.EXTERIOR&&nextLocation===Location.INTERIOR)
return 1;else if(currLocation===Location.INTERIOR&&nextLocation===Location.EXTERIOR)
return-1;return 0;};jsts.geomgraph.DirectedEdge.prototype._isForward=null;jsts.geomgraph.DirectedEdge.prototype._isInResult=false;jsts.geomgraph.DirectedEdge.prototype._isVisited=false;jsts.geomgraph.DirectedEdge.prototype.sym=null;jsts.geomgraph.DirectedEdge.prototype.next=null;jsts.geomgraph.DirectedEdge.prototype.nextMin=null;jsts.geomgraph.DirectedEdge.prototype.edgeRing=null;jsts.geomgraph.DirectedEdge.prototype.minEdgeRing=null;jsts.geomgraph.DirectedEdge.prototype.depth=null;jsts.geomgraph.DirectedEdge.prototype.getEdge=function(){return this.edge;};jsts.geomgraph.DirectedEdge.prototype.setInResult=function(isInResult){this._isInResult=isInResult;};jsts.geomgraph.DirectedEdge.prototype.isInResult=function(){return this._isInResult;};jsts.geomgraph.DirectedEdge.prototype.isVisited=function(){return this._isVisited;};jsts.geomgraph.DirectedEdge.prototype.setVisited=function(isVisited){this._isVisited=isVisited;};jsts.geomgraph.DirectedEdge.prototype.setEdgeRing=function(edgeRing){this.edgeRing=edgeRing;};jsts.geomgraph.DirectedEdge.prototype.getEdgeRing=function(){return this.edgeRing;};jsts.geomgraph.DirectedEdge.prototype.setMinEdgeRing=function(minEdgeRing){this.minEdgeRing=minEdgeRing;};jsts.geomgraph.DirectedEdge.prototype.getMinEdgeRing=function(){return this.minEdgeRing;};jsts.geomgraph.DirectedEdge.prototype.getDepth=function(position){return this.depth[position];};jsts.geomgraph.DirectedEdge.prototype.setDepth=function(position,depthVal){if(this.depth[position]!==-999){if(this.depth[position]!==depthVal)
throw new jsts.error.TopologyError('assigned depths do not match',this.getCoordinate());}
this.depth[position]=depthVal;};jsts.geomgraph.DirectedEdge.prototype.getDepthDelta=function(){var depthDelta=this.edge.getDepthDelta();if(!this._isForward)
depthDelta=-depthDelta;return depthDelta;};jsts.geomgraph.DirectedEdge.prototype.setVisitedEdge=function(isVisited){this.setVisited(isVisited);this.sym.setVisited(isVisited);};jsts.geomgraph.DirectedEdge.prototype.getSym=function(){return this.sym;};jsts.geomgraph.DirectedEdge.prototype.isForward=function(){return this._isForward;};jsts.geomgraph.DirectedEdge.prototype.setSym=function(de){this.sym=de;};jsts.geomgraph.DirectedEdge.prototype.getNext=function(){return this.next;};jsts.geomgraph.DirectedEdge.prototype.setNext=function(next){this.next=next;};jsts.geomgraph.DirectedEdge.prototype.getNextMin=function(){return this.nextMin;};jsts.geomgraph.DirectedEdge.prototype.setNextMin=function(nextMin){this.nextMin=nextMin;};jsts.geomgraph.DirectedEdge.prototype.isLineEdge=function(){var isLine=this.label.isLine(0)||this.label.isLine(1);var isExteriorIfArea0=!this.label.isArea(0)||this.label.allPositionsEqual(0,Location.EXTERIOR);var isExteriorIfArea1=!this.label.isArea(1)||this.label.allPositionsEqual(1,Location.EXTERIOR);return isLine&&isExteriorIfArea0&&isExteriorIfArea1;};jsts.geomgraph.DirectedEdge.prototype.isInteriorAreaEdge=function(){var isInteriorAreaEdge=true;for(var i=0;i<2;i++){if(!(this.label.isArea(i)&&this.label.getLocation(i,Position.LEFT)===Location.INTERIOR&&this.label.getLocation(i,Position.RIGHT)===Location.INTERIOR)){isInteriorAreaEdge=false;}}
return isInteriorAreaEdge;};jsts.geomgraph.DirectedEdge.prototype.computeDirectedLabel=function(){this.label=new jsts.geomgraph.Label(this.edge.getLabel());if(!this._isForward)
this.label.flip();};jsts.geomgraph.DirectedEdge.prototype.setEdgeDepths=function(position,depth){var depthDelta=this.getEdge().getDepthDelta();if(!this._isForward)
depthDelta=-depthDelta;var directionFactor=1;if(position===Position.LEFT)
directionFactor=-1;var oppositePos=Position.opposite(position);var delta=depthDelta*directionFactor;var oppositeDepth=depth+delta;this.setDepth(position,depth);this.setDepth(oppositePos,oppositeDepth);};})();jsts.operation.buffer.OffsetCurveBuilder=function(precisionModel,bufParams){this.precisionModel=precisionModel;this.bufParams=bufParams;};jsts.operation.buffer.OffsetCurveBuilder.prototype.distance=0.0;jsts.operation.buffer.OffsetCurveBuilder.prototype.precisionModel=null;jsts.operation.buffer.OffsetCurveBuilder.prototype.bufParams=null;jsts.operation.buffer.OffsetCurveBuilder.prototype.getBufferParameters=function(){return this.bufParams;};jsts.operation.buffer.OffsetCurveBuilder.prototype.getLineCurve=function(inputPts,distance){this.distance=distance;if(this.distance<0.0&&!this.bufParams.isSingleSided())
return null;if(this.distance==0.0)
return null;var posDistance=Math.abs(this.distance);var segGen=this.getSegGen(posDistance);if(inputPts.length<=1){this.computePointCurve(inputPts[0],segGen);}else{if(this.bufParams.isSingleSided()){var isRightSide=distance<0.0;this.computeSingleSidedBufferCurve(inputPts,isRightSide,segGen);}else
this.computeLineBufferCurve(inputPts,segGen);}
var lineCoord=segGen.getCoordinates();return lineCoord;};jsts.operation.buffer.OffsetCurveBuilder.prototype.getRingCurve=function(inputPts,side,distance){this.distance=distance;if(inputPts.length<=2)
return this.getLineCurve(inputPts,distance);if(this.distance==0.0){return jsts.operation.buffer.OffsetCurveBuilder.copyCoordinates(inputPts);}
var segGen=this.getSegGen(this.distance);this.computeRingBufferCurve(inputPts,side,segGen);return segGen.getCoordinates();};jsts.operation.buffer.OffsetCurveBuilder.prototype.getOffsetCurve=function(inputPts,distance){this.distance=distance;if(this.distance===0.0)
return null;var isRightSide=this.distance<0.0;var posDistance=Math.abs(this.distance);var segGen=this.getSegGen(posDistance);if(inputPts.length<=1){this.computePointCurve(inputPts[0],segGen);}else{this.computeOffsetCurve(inputPts,isRightSide,segGen);}
var curvePts=segGen.getCoordinates();if(isRightSide)
curvePts.reverse();return curvePts;};jsts.operation.buffer.OffsetCurveBuilder.copyCoordinates=function(pts){var copy=[];for(var i=0;i<pts.length;i++){copy.push(pts[i].clone());}
return copy;};jsts.operation.buffer.OffsetCurveBuilder.prototype.getSegGen=function(distance){return new jsts.operation.buffer.OffsetSegmentGenerator(this.precisionModel,this.bufParams,distance);};jsts.operation.buffer.OffsetCurveBuilder.SIMPLIFY_FACTOR=100.0;jsts.operation.buffer.OffsetCurveBuilder.simplifyTolerance=function(bufDistance){return bufDistance/jsts.operation.buffer.OffsetCurveBuilder.SIMPLIFY_FACTOR;};jsts.operation.buffer.OffsetCurveBuilder.prototype.computePointCurve=function(pt,segGen){switch(this.bufParams.getEndCapStyle()){case jsts.operation.buffer.BufferParameters.CAP_ROUND:segGen.createCircle(pt);break;case jsts.operation.buffer.BufferParameters.CAP_SQUARE:segGen.createSquare(pt);break;}};jsts.operation.buffer.OffsetCurveBuilder.prototype.computeLineBufferCurve=function(inputPts,segGen){var distTol=jsts.operation.buffer.OffsetCurveBuilder.simplifyTolerance(this.distance);var simp1=jsts.operation.buffer.BufferInputLineSimplifier.simplify(inputPts,distTol);var n1=simp1.length-1;segGen.initSideSegments(simp1[0],simp1[1],jsts.geomgraph.Position.LEFT);for(var i=2;i<=n1;i++){segGen.addNextSegment(simp1[i],true);}
segGen.addLastSegment();segGen.addLineEndCap(simp1[n1-1],simp1[n1]);var simp2=jsts.operation.buffer.BufferInputLineSimplifier.simplify(inputPts,-distTol);var n2=simp2.length-1;segGen.initSideSegments(simp2[n2],simp2[n2-1],jsts.geomgraph.Position.LEFT);for(var i=n2-2;i>=0;i--){segGen.addNextSegment(simp2[i],true);}
segGen.addLastSegment();segGen.addLineEndCap(simp2[1],simp2[0]);segGen.closeRing();};jsts.operation.buffer.OffsetCurveBuilder.prototype.computeSingleSidedBufferCurve=function(inputPts,isRightSide,segGen){var distTol=jsts.operation.buffer.OffsetCurveBuilder.simplifyTolerance(this.distance);if(isRightSide){segGen.addSegments(inputPts,true);var simp2=jsts.operation.buffer.BufferInputLineSimplifier.simplify(inputPts,-distTol);var n2=simp2.length-1;segGen.initSideSegments(simp2[n2],simp2[n2-1],jsts.geomgraph.Position.LEFT);segGen.addFirstSegment();for(var i=n2-2;i>=0;i--){segGen.addNextSegment(simp2[i],true);}}else{segGen.addSegments(inputPts,false);var simp1=jsts.operation.buffer.BufferInputLineSimplifier.simplify(inputPts,distTol);var n1=simp1.length-1;segGen.initSideSegments(simp1[0],simp1[1],jsts.geomgraph.Position.LEFT);segGen.addFirstSegment();for(var i=2;i<=n1;i++){segGen.addNextSegment(simp1[i],true);}}
segGen.addLastSegment();segGen.closeRing();};jsts.operation.buffer.OffsetCurveBuilder.prototype.computeOffsetCurve=function(inputPts,isRightSide,segGen){var distTol=jsts.operation.buffer.OffsetCurveBuilder.simplifyTolerance(this.distance);if(isRightSide){var simp2=jsts.operation.buffer.BufferInputLineSimplifier.simplify(inputPts,-distTol);var n2=simp2.length-1;segGen.initSideSegments(simp2[n2],simp2[n2-1],jsts.geomgraph.Position.LEFT);segGen.addFirstSegment();for(var i=n2-2;i>=0;i--){segGen.addNextSegment(simp2[i],true);}}else{var simp1=jsts.operation.buffer.BufferInputLineSimplifier.simplify(inputPts,distTol);var n1=simp1.length-1;segGen.initSideSegments(simp1[0],simp1[1],jsts.geomgraph.Position.LEFT);segGen.addFirstSegment();for(var i=2;i<=n1;i++){segGen.addNextSegment(simp1[i],true);}}
segGen.addLastSegment();};jsts.operation.buffer.OffsetCurveBuilder.prototype.computeRingBufferCurve=function(inputPts,side,segGen){var distTol=jsts.operation.buffer.OffsetCurveBuilder.simplifyTolerance(this.distance);if(side===jsts.geomgraph.Position.RIGHT)
distTol=-distTol;var simp=jsts.operation.buffer.BufferInputLineSimplifier.simplify(inputPts,distTol);var n=simp.length-1;segGen.initSideSegments(simp[n-1],simp[0],side);for(var i=1;i<=n;i++){var addStartPoint=i!==1;segGen.addNextSegment(simp[i],addStartPoint);}
segGen.closeRing();};jsts.index.strtree.SIRtree=function(nodeCapacity){nodeCapacity=nodeCapacity||10;jsts.index.strtree.AbstractSTRtree.call(this,nodeCapacity);};jsts.index.strtree.SIRtree.prototype=new jsts.index.strtree.AbstractSTRtree();jsts.index.strtree.SIRtree.constructor=jsts.index.strtree.SIRtree;jsts.index.strtree.SIRtree.prototype.comperator={compare:function(o1,o2){return o1.getBounds().getCentre()-o2.getBounds().getCentre();}};jsts.index.strtree.SIRtree.prototype.intersectionOp={intersects:function(aBounds,bBounds){return aBounds.intersects(bBounds);}};jsts.index.strtree.SIRtree.prototype.createNode=function(level){var AbstractNode=function(level){jsts.index.strtree.AbstractNode.apply(this,arguments);};AbstractNode.prototype=new jsts.index.strtree.AbstractNode();AbstractNode.constructor=AbstractNode;AbstractNode.prototype.computeBounds=function(){var bounds=null,childBoundables=this.getChildBoundables(),childBoundable;for(var i=0,l=childBoundables.length;i<l;i++){childBoundable=childBoundables[i];if(bounds===null){bounds=new jsts.index.strtree.Interval(childBoundable.getBounds());}
else{bounds.expandToInclude(childBoundable.getBounds());}}
return bounds;};return AbstractNode;};jsts.index.strtree.SIRtree.prototype.insert=function(x1,x2,item){jsts.index.strtree.AbstractSTRtree.prototype.insert(new jsts.index.strtree.Interval(Math.min(x1,x2),Math.max(x1,x2)),item);};jsts.index.strtree.SIRtree.prototype.query=function(x1,x2){x2=x2||x1;jsts.index.strtree.AbstractSTRtree.prototype.query(new jsts.index.strtree.Interval(Math.min(x1,x2),Math.max(x1,x2)));};jsts.index.strtree.SIRtree.prototype.getIntersectsOp=function(){return this.intersectionOp;};jsts.index.strtree.SIRtree.prototype.getComparator=function(){return this.comperator;};(function(){var Location=jsts.geom.Location;jsts.operation.relate.RelateNodeGraph=function(){this.nodes=new jsts.geomgraph.NodeMap(new jsts.operation.relate.RelateNodeFactory());};jsts.operation.relate.RelateNodeGraph.prototype.nodes=null;jsts.operation.relate.RelateNodeGraph.prototype.build=function(geomGraph){this.computeIntersectionNodes(geomGraph,0);this.copyNodesAndLabels(geomGraph,0);var eeBuilder=new jsts.operation.relate.EdgeEndBuilder();var eeList=eeBuilder.computeEdgeEnds(geomGraph.getEdgeIterator());this.insertEdgeEnds(eeList);};jsts.operation.relate.RelateNodeGraph.prototype.computeIntersectionNodes=function(geomGraph,argIndex){for(var edgeIt=geomGraph.getEdgeIterator();edgeIt.hasNext();){var e=edgeIt.next();var eLoc=e.getLabel().getLocation(argIndex);for(var eiIt=e.getEdgeIntersectionList().iterator();eiIt.hasNext();){var ei=eiIt.next();var n=this.nodes.addNode(ei.coord);if(eLoc===Location.BOUNDARY)
n.setLabelBoundary(argIndex);else{if(n.getLabel().isNull(argIndex))
n.setLabel(argIndex,Location.INTERIOR);}}}};jsts.operation.relate.RelateNodeGraph.prototype.copyNodesAndLabels=function(geomGraph,argIndex){for(var nodeIt=geomGraph.getNodeIterator();nodeIt.hasNext();){var graphNode=nodeIt.next();var newNode=this.nodes.addNode(graphNode.getCoordinate());newNode.setLabel(argIndex,graphNode.getLabel().getLocation(argIndex));}};jsts.operation.relate.RelateNodeGraph.prototype.insertEdgeEnds=function(ee){for(var i=ee.iterator();i.hasNext();){var e=i.next();this.nodes.add(e);}};jsts.operation.relate.RelateNodeGraph.prototype.getNodeIterator=function(){return this.nodes.iterator();};})();(function(){var Location=jsts.geom.Location;var Position=jsts.geomgraph.Position;jsts.geomgraph.Depth=function(){this.depth=[[],[]];for(var i=0;i<2;i++){for(var j=0;j<3;j++){this.depth[i][j]=jsts.geomgraph.Depth.NULL_VALUE;}}};jsts.geomgraph.Depth.NULL_VALUE=-1;jsts.geomgraph.Depth.depthAtLocation=function(location){if(location===Location.EXTERIOR)
return 0;if(location===Location.INTERIOR)
return 1;return jsts.geomgraph.Depth.NULL_VALUE;};jsts.geomgraph.Depth.prototype.depth=null;jsts.geomgraph.Depth.prototype.getDepth=function(geomIndex,posIndex){return this.depth[geomIndex][posIndex];};jsts.geomgraph.Depth.prototype.setDepth=function(geomIndex,posIndex,depthValue){this.depth[geomIndex][posIndex]=depthValue;};jsts.geomgraph.Depth.prototype.getLocation=function(geomIndex,posIndex){if(this.depth[geomIndex][posIndex]<=0)
return Location.EXTERIOR;return Location.INTERIOR;};jsts.geomgraph.Depth.prototype.add=function(geomIndex,posIndex,location){if(location===Location.INTERIOR)
this.depth[geomIndex][posIndex]++;};jsts.geomgraph.Depth.prototype.isNull=function(){if(arguments.length>0){return this.isNull2.apply(this,arguments);}
for(var i=0;i<2;i++){for(var j=0;j<3;j++){if(this.depth[i][j]!==jsts.geomgraph.Depth.NULL_VALUE)
return false;}}
return true;};jsts.geomgraph.Depth.prototype.isNull2=function(geomIndex){if(arguments.length>1){return this.isNull3.apply(this,arguments);}
return this.depth[geomIndex][1]==jsts.geomgraph.Depth.NULL_VALUE;};jsts.geomgraph.Depth.prototype.isNull3=function(geomIndex,posIndex){return this.depth[geomIndex][posIndex]==jsts.geomgraph.Depth.NULL_VALUE;};jsts.geomgraph.Depth.prototype.add=function(lbl){for(var i=0;i<2;i++){for(var j=1;j<3;j++){var loc=lbl.getLocation(i,j);if(loc===Location.EXTERIOR||loc===Location.INTERIOR){if(this.isNull(i,j)){this.depth[i][j]=jsts.geomgraph.Depth.depthAtLocation(loc);}else
this.depth[i][j]+=jsts.geomgraph.Depth.depthAtLocation(loc);}}}};jsts.geomgraph.Depth.prototype.getDelta=function(geomIndex){return this.depth[geomIndex][Position.RIGHT]-
this.depth[geomIndex][Position.LEFT];};jsts.geomgraph.Depth.prototype.normalize=function(){for(var i=0;i<2;i++){if(!this.isNull(i)){var minDepth=this.depth[i][1];if(this.depth[i][2]<minDepth)
minDepth=this.depth[i][2];if(minDepth<0)
minDepth=0;for(var j=1;j<3;j++){var newValue=0;if(this.depth[i][j]>minDepth)
newValue=1;this.depth[i][j]=newValue;}}}};jsts.geomgraph.Depth.prototype.toString=function(){return'A: '+this.depth[0][1]+','+this.depth[0][2]+' B: '+
this.depth[1][1]+','+this.depth[1][2];};})();jsts.operation.buffer.BufferParameters=function(quadrantSegments,endCapStyle,joinStyle,mitreLimit){if(quadrantSegments)
this.setQuadrantSegments(quadrantSegments);if(endCapStyle)
this.setEndCapStyle(endCapStyle);if(joinStyle)
this.setJoinStyle(joinStyle);if(mitreLimit)
this.setMitreLimit(mitreLimit);};jsts.operation.buffer.BufferParameters.CAP_ROUND=1;jsts.operation.buffer.BufferParameters.CAP_FLAT=2;jsts.operation.buffer.BufferParameters.CAP_SQUARE=3;jsts.operation.buffer.BufferParameters.JOIN_ROUND=1;jsts.operation.buffer.BufferParameters.JOIN_MITRE=2;jsts.operation.buffer.BufferParameters.JOIN_BEVEL=3;jsts.operation.buffer.BufferParameters.DEFAULT_QUADRANT_SEGMENTS=8;jsts.operation.buffer.BufferParameters.DEFAULT_MITRE_LIMIT=5.0;jsts.operation.buffer.BufferParameters.prototype.quadrantSegments=jsts.operation.buffer.BufferParameters.DEFAULT_QUADRANT_SEGMENTS;jsts.operation.buffer.BufferParameters.prototype.endCapStyle=jsts.operation.buffer.BufferParameters.CAP_ROUND;jsts.operation.buffer.BufferParameters.prototype.joinStyle=jsts.operation.buffer.BufferParameters.JOIN_ROUND;jsts.operation.buffer.BufferParameters.prototype.mitreLimit=jsts.operation.buffer.BufferParameters.DEFAULT_MITRE_LIMIT;jsts.operation.buffer.BufferParameters.prototype._isSingleSided=false;jsts.operation.buffer.BufferParameters.prototype.getQuadrantSegments=function(){return this.quadrantSegments;};jsts.operation.buffer.BufferParameters.prototype.setQuadrantSegments=function(quadrantSegments){this.quadrantSegments=quadrantSegments;};jsts.operation.buffer.BufferParameters.prototype.setQuadrantSegments=function(quadSegs){this.quadrantSegments=quadSegs;if(this.quadrantSegments===0)
this.joinStyle=jsts.operation.buffer.BufferParameters.JOIN_BEVEL;if(this.quadrantSegments<0){this.joinStyle=jsts.operation.buffer.BufferParameters.JOIN_MITRE;this.mitreLimit=Math.abs(this.quadrantSegments);}
if(quadSegs<=0){this.quadrantSegments=1;}
if(this.joinStyle!==jsts.operation.buffer.BufferParameters.JOIN_ROUND){this.quadrantSegments=jsts.operation.buffer.BufferParameters.DEFAULT_QUADRANT_SEGMENTS;}};jsts.operation.buffer.BufferParameters.bufferDistanceError=function(quadSegs){var alpha=Math.PI/2.0/quadSegs;return 1-Math.cos(alpha/2.0);};jsts.operation.buffer.BufferParameters.prototype.getEndCapStyle=function(){return this.endCapStyle;};jsts.operation.buffer.BufferParameters.prototype.setEndCapStyle=function(endCapStyle){this.endCapStyle=endCapStyle;};jsts.operation.buffer.BufferParameters.prototype.getJoinStyle=function(){return this.joinStyle;};jsts.operation.buffer.BufferParameters.prototype.setJoinStyle=function(joinStyle){this.joinStyle=joinStyle;};jsts.operation.buffer.BufferParameters.prototype.getMitreLimit=function(){return this.mitreLimit;};jsts.operation.buffer.BufferParameters.prototype.setMitreLimit=function(mitreLimit){this.mitreLimit=mitreLimit;};jsts.operation.buffer.BufferParameters.prototype.setSingleSided=function(isSingleSided){this._isSingleSided=isSingleSided;};jsts.operation.buffer.BufferParameters.prototype.isSingleSided=function(){return this._isSingleSided;};jsts.algorithm.distance.PointPairDistance=function(){this.pt=[new jsts.geom.Coordinate(),new jsts.geom.Coordinate()];};jsts.algorithm.distance.PointPairDistance.prototype.pt=null;jsts.algorithm.distance.PointPairDistance.prototype.distance=NaN;jsts.algorithm.distance.PointPairDistance.prototype.isNull=true;jsts.algorithm.distance.PointPairDistance.prototype.initialize=function(p0,p1,distance){if(p0===undefined){this.isNull=true;return;}
this.pt[0].setCoordinate(p0);this.pt[1].setCoordinate(p1);this.distance=distance!==undefined?distance:p0.distance(p1);this.isNull=false;};jsts.algorithm.distance.PointPairDistance.prototype.getDistance=function(){return this.distance;};jsts.algorithm.distance.PointPairDistance.prototype.getCoordinates=function(){return this.pt;};jsts.algorithm.distance.PointPairDistance.prototype.getCoordinate=function(i){return this.pt[i];};jsts.algorithm.distance.PointPairDistance.prototype.setMaximum=function(ptDist){if(arguments.length===2){this.setMaximum2.apply(this,arguments);return;}
this.setMaximum(ptDist.pt[0],ptDist.pt[1]);};jsts.algorithm.distance.PointPairDistance.prototype.setMaximum2=function(p0,p1){if(this.isNull){this.initialize(p0,p1);return;}
var dist=p0.distance(p1);if(dist>this.distance)
this.initialize(p0,p1,dist);};jsts.algorithm.distance.PointPairDistance.prototype.setMinimum=function(ptDist){if(arguments.length===2){this.setMinimum2.apply(this,arguments);return;}
this.setMinimum(ptDist.pt[0],ptDist.pt[1]);};jsts.algorithm.distance.PointPairDistance.prototype.setMinimum2=function(p0,p1){if(this.isNull){this.initialize(p0,p1);return;}
var dist=p0.distance(p1);if(dist<this.distance)
this.initialize(p0,p1,dist);};(function(){var PointPairDistance=jsts.algorithm.distance.PointPairDistance;var DistanceToPoint=jsts.algorithm.distance.DistanceToPoint;var MaxPointDistanceFilter=function(geom){this.maxPtDist=new PointPairDistance();this.minPtDist=new PointPairDistance();this.euclideanDist=new DistanceToPoint();this.geom=geom;};MaxPointDistanceFilter.prototype=new jsts.geom.CoordinateFilter();MaxPointDistanceFilter.prototype.maxPtDist=new PointPairDistance();MaxPointDistanceFilter.prototype.minPtDist=new PointPairDistance();MaxPointDistanceFilter.prototype.euclideanDist=new DistanceToPoint();MaxPointDistanceFilter.prototype.geom;MaxPointDistanceFilter.prototype.filter=function(pt){this.minPtDist.initialize();DistanceToPoint.computeDistance(this.geom,pt,this.minPtDist);this.maxPtDist.setMaximum(this.minPtDist);};MaxPointDistanceFilter.prototype.getMaxPointDistance=function(){return this.maxPtDist;};var MaxDensifiedByFractionDistanceFilter=function(geom,fraction){this.maxPtDist=new PointPairDistance();this.minPtDist=new PointPairDistance();this.geom=geom;this.numSubSegs=Math.round(1.0/fraction);};MaxDensifiedByFractionDistanceFilter.prototype=new jsts.geom.CoordinateSequenceFilter();MaxDensifiedByFractionDistanceFilter.prototype.maxPtDist=new PointPairDistance();MaxDensifiedByFractionDistanceFilter.prototype.minPtDist=new PointPairDistance();MaxDensifiedByFractionDistanceFilter.prototype.geom;MaxDensifiedByFractionDistanceFilter.prototype.numSubSegs=0;MaxDensifiedByFractionDistanceFilter.prototype.filter=function(seq,index){if(index==0)
return;var p0=seq[index-1];var p1=seq[index];var delx=(p1.x-p0.x)/this.numSubSegs;var dely=(p1.y-p0.y)/this.numSubSegs;for(var i=0;i<this.numSubSegs;i++){var x=p0.x+i*delx;var y=p0.y+i*dely;var pt=new jsts.geom.Coordinate(x,y);this.minPtDist.initialize();DistanceToPoint.computeDistance(this.geom,pt,this.minPtDist);this.maxPtDist.setMaximum(this.minPtDist);}};MaxDensifiedByFractionDistanceFilter.prototype.isGeometryChanged=function(){return false;};MaxDensifiedByFractionDistanceFilter.prototype.isDone=function(){return false;};MaxDensifiedByFractionDistanceFilter.prototype.getMaxPointDistance=function(){return this.maxPtDist;};jsts.algorithm.distance.DiscreteHausdorffDistance=function(g0,g1){this.g0=g0;this.g1=g1;this.ptDist=new jsts.algorithm.distance.PointPairDistance();};jsts.algorithm.distance.DiscreteHausdorffDistance.prototype.g0=null;jsts.algorithm.distance.DiscreteHausdorffDistance.prototype.g1=null;jsts.algorithm.distance.DiscreteHausdorffDistance.prototype.ptDist=null;jsts.algorithm.distance.DiscreteHausdorffDistance.prototype.densifyFrac=0.0;jsts.algorithm.distance.DiscreteHausdorffDistance.distance=function(g0,g1,densifyFrac){var dist=new jsts.algorithm.distance.DiscreteHausdorffDistance(g0,g1);if(densifyFrac!==undefined)
dist.setDensifyFraction(densifyFrac);return dist.distance();};jsts.algorithm.distance.DiscreteHausdorffDistance.prototype.setDensifyFraction=function(densifyFrac){if(densifyFrac>1.0||densifyFrac<=0.0)
throw new jsts.error.IllegalArgumentError('Fraction is not in range (0.0 - 1.0]');this.densifyFrac=densifyFrac;};jsts.algorithm.distance.DiscreteHausdorffDistance.prototype.distance=function(){this.compute(this.g0,this.g1);return ptDist.getDistance();};jsts.algorithm.distance.DiscreteHausdorffDistance.prototype.orientedDistance=function(){this.computeOrientedDistance(this.g0,this.g1,this.ptDist);return this.ptDist.getDistance();};jsts.algorithm.distance.DiscreteHausdorffDistance.prototype.getCoordinates=function(){return ptDist.getCoordinates();};jsts.algorithm.distance.DiscreteHausdorffDistance.prototype.compute=function(g0,g1){this.computeOrientedDistance(g0,g1,this.ptDist);this.computeOrientedDistance(g1,g0,this.ptDist);};jsts.algorithm.distance.DiscreteHausdorffDistance.prototype.computeOrientedDistance=function(discreteGeom,geom,ptDist){var distFilter=new MaxPointDistanceFilter(geom);discreteGeom.apply(distFilter);ptDist.setMaximum(distFilter.getMaxPointDistance());if(this.densifyFrac>0){var fracFilter=new MaxDensifiedByFractionDistanceFilter(geom,this.densifyFrac);discreteGeom.apply(fracFilter);ptDist.setMaximum(fracFilter.getMaxPointDistance());}};})();jsts.operation.distance.GeometryLocation=function(component,segIndex,pt){this.component=component;this.segIndex=segIndex;this.pt=pt;};jsts.operation.distance.GeometryLocation.INSIDE_AREA=-1;jsts.operation.distance.GeometryLocation.prototype.component=null;jsts.operation.distance.GeometryLocation.prototype.segIndex=null;jsts.operation.distance.GeometryLocation.prototype.pt=null;jsts.operation.distance.GeometryLocation.prototype.getGeometryComponent=function(){return this.component;};jsts.operation.distance.GeometryLocation.prototype.getSegmentIndex=function(){return this.segIndex;};jsts.operation.distance.GeometryLocation.prototype.getCoordinate=function(){return this.pt;};jsts.operation.distance.GeometryLocation.prototype.isInsideArea=function(){return this.segIndex===jsts.operation.distance.GeometryLocation.INSIDE_AREA;};jsts.geom.util.PointExtracter=function(pts){this.pts=pts;};jsts.geom.util.PointExtracter.prototype=new jsts.geom.GeometryFilter();jsts.geom.util.PointExtracter.prototype.pts=null;jsts.geom.util.PointExtracter.getPoints=function(geom,list){if(list===undefined){list=[];}
if(geom instanceof jsts.geom.Point){list.push(geom);}else if(geom instanceof jsts.geom.GeometryCollection||geom instanceof jsts.geom.MultiPoint||geom instanceof jsts.geom.MultiLineString||geom instanceof jsts.geom.MultiPolygon){geom.apply(new jsts.geom.util.PointExtracter(list));}
return list;};jsts.geom.util.PointExtracter.prototype.filter=function(geom){if(geom instanceof jsts.geom.Point)
this.pts.push(geom);};jsts.noding.ScaledNoder=function(noder,scaleFactor,offsetX,offsetY){this.offsetX=offsetX?offsetX:0;this.offsetY=offsetY?offsetY:0;this.noder=noder;this.scaleFactor=scaleFactor;this.isScaled=!this.isIntegerPrecision();};jsts.noding.ScaledNoder.prototype=new jsts.noding.Noder();jsts.noding.ScaledNoder.constructor=jsts.noding.ScaledNoder;jsts.noding.ScaledNoder.prototype.noder=null;jsts.noding.ScaledNoder.prototype.scaleFactor=undefined;jsts.noding.ScaledNoder.prototype.offsetX=undefined;jsts.noding.ScaledNoder.prototype.offsetY=undefined;jsts.noding.ScaledNoder.prototype.isScaled=false;jsts.noding.ScaledNoder.prototype.isIntegerPrecision=function(){return this.scaleFactor===1.0;};jsts.noding.ScaledNoder.prototype.getNodedSubstrings=function(){var splitSS=this.noder.getNodedSubstrings();if(this.isScaled)
this.rescale(splitSS);return splitSS;};jsts.noding.ScaledNoder.prototype.computeNodes=function(inputSegStrings){var intSegStrings=inputSegStrings;if(this.isScaled)
intSegStrings=this.scale(inputSegStrings);this.noder.computeNodes(intSegStrings);};jsts.noding.ScaledNoder.prototype.scale=function(segStrings){if(segStrings instanceof Array){return this.scale2(segStrings);}
var transformed=new javascript.util.ArrayList();for(var i=segStrings.iterator();i.hasNext();){var ss=i.next();transformed.add(new jsts.noding.NodedSegmentString(this.scale(ss.getCoordinates()),ss.getData()));}
return transformed;};jsts.noding.ScaledNoder.prototype.scale2=function(pts){var roundPts=[];for(var i=0;i<pts.length;i++){roundPts[i]=new jsts.geom.Coordinate(Math.round((pts[i].x-this.offsetX)*this.scaleFactor),Math.round((pts[i].y-this.offsetY)*this.scaleFactor));}
var roundPtsNoDup=jsts.geom.CoordinateArrays.removeRepeatedPoints(roundPts);return roundPtsNoDup;};jsts.noding.ScaledNoder.prototype.rescale=function(segStrings){if(segStrings instanceof Array){this.rescale2(segStrings);return;}
for(var i=segStrings.iterator();i.hasNext();){var ss=i.next();this.rescale(ss.getCoordinates());}};jsts.noding.ScaledNoder.prototype.rescale2=function(pts){for(var i=0;i<pts.length;i++){pts[i].x=pts[i].x/this.scaleFactor+this.offsetX;pts[i].y=pts[i].y/this.scaleFactor+this.offsetY;}};jsts.noding.IntersectionAdder=function(li){this.li=li;};jsts.noding.IntersectionAdder.prototype=new jsts.noding.SegmentIntersector();jsts.noding.IntersectionAdder.constructor=jsts.noding.IntersectionAdder;jsts.noding.IntersectionAdder.isAdjacentSegments=function(i1,i2){return Math.abs(i1-i2)===1;};jsts.noding.IntersectionAdder.prototype._hasIntersection=false;jsts.noding.IntersectionAdder.prototype.hasProper=false;jsts.noding.IntersectionAdder.prototype.hasProperInterior=false;jsts.noding.IntersectionAdder.prototype.hasInterior=false;jsts.noding.IntersectionAdder.prototype.properIntersectionPoint=null;jsts.noding.IntersectionAdder.prototype.li=null;jsts.noding.IntersectionAdder.prototype.isSelfIntersection=null;jsts.noding.IntersectionAdder.prototype.numIntersections=0;jsts.noding.IntersectionAdder.prototype.numInteriorIntersections=0;jsts.noding.IntersectionAdder.prototype.numProperIntersections=0;jsts.noding.IntersectionAdder.prototype.numTests=0;jsts.noding.IntersectionAdder.prototype.getLineIntersector=function(){return this.li;};jsts.noding.IntersectionAdder.prototype.getProperIntersectionPoint=function(){return this.properIntersectionPoint;};jsts.noding.IntersectionAdder.prototype.hasIntersection=function(){return this._hasIntersection;};jsts.noding.IntersectionAdder.prototype.hasProperIntersection=function(){return this.hasProper;};jsts.noding.IntersectionAdder.prototype.hasProperInteriorIntersection=function(){return this.hasProperInterior;};jsts.noding.IntersectionAdder.prototype.hasInteriorIntersection=function(){return this.hasInterior;};jsts.noding.IntersectionAdder.prototype.isTrivialIntersection=function(e0,segIndex0,e1,segIndex1){if(e0==e1){if(this.li.getIntersectionNum()==1){if(jsts.noding.IntersectionAdder.isAdjacentSegments(segIndex0,segIndex1))
return true;if(e0.isClosed()){var maxSegIndex=e0.size()-1;if((segIndex0===0&&segIndex1===maxSegIndex)||(segIndex1===0&&segIndex0===maxSegIndex)){return true;}}}}
return false;};jsts.noding.IntersectionAdder.prototype.processIntersections=function(e0,segIndex0,e1,segIndex1){if(e0===e1&&segIndex0===segIndex1)
return;this.numTests++;var p00=e0.getCoordinates()[segIndex0];var p01=e0.getCoordinates()[segIndex0+1];var p10=e1.getCoordinates()[segIndex1];var p11=e1.getCoordinates()[segIndex1+1];this.li.computeIntersection(p00,p01,p10,p11);if(this.li.hasIntersection()){this.numIntersections++;if(this.li.isInteriorIntersection()){this.numInteriorIntersections++;this.hasInterior=true;}
if(!this.isTrivialIntersection(e0,segIndex0,e1,segIndex1)){this._hasIntersection=true;e0.addIntersections(this.li,segIndex0,0);e1.addIntersections(this.li,segIndex1,1);if(this.li.isProper()){this.numProperIntersections++;this.hasProper=true;this.hasProperInterior=true;}}}};jsts.noding.IntersectionAdder.prototype.isDone=function(){return false;};jsts.triangulate.VoronoiDiagramBuilder=function(){this.siteCoords=null;this.tolerance=0.0;this.subdiv=null;this.clipEnv=null;this.diagramEnv=null;};jsts.triangulate.VoronoiDiagramBuilder.prototype.setSites=function(){var arg=arguments[0];if(arg instanceof jsts.geom.Geometry||arg instanceof jsts.geom.Coordinate||arg instanceof jsts.geom.Point||arg instanceof jsts.geom.MultiPoint||arg instanceof jsts.geom.LineString||arg instanceof jsts.geom.MultiLineString||arg instanceof jsts.geom.LinearRing||arg instanceof jsts.geom.Polygon||arg instanceof jsts.geom.MultiPolygon){this.setSitesByGeometry(arg);}else{this.setSitesByArray(arg);}};jsts.triangulate.VoronoiDiagramBuilder.prototype.setSitesByGeometry=function(geom){this.siteCoords=jsts.triangulate.DelaunayTriangulationBuilder.extractUniqueCoordinates(geom);};jsts.triangulate.VoronoiDiagramBuilder.prototype.setSitesByArray=function(coords){this.siteCoords=jsts.triangulate.DelaunayTriangulationBuilder.unique(coords);};jsts.triangulate.VoronoiDiagramBuilder.prototype.setClipEnvelope=function(clipEnv){this.clipEnv=clipEnv;};jsts.triangulate.VoronoiDiagramBuilder.prototype.setTolerance=function(tolerance)
{this.tolerance=tolerance;};jsts.triangulate.VoronoiDiagramBuilder.prototype.create=function(){if(this.subdiv!==null){return;}
var siteEnv,expandBy,vertices,triangulator;siteEnv=jsts.triangulate.DelaunayTriangulationBuilder.envelope(this.siteCoords);this.diagramEnv=siteEnv;expandBy=Math.max(this.diagramEnv.getWidth(),this.diagramEnv.getHeight());this.diagramEnv.expandBy(expandBy);if(this.clipEnv!==null){this.diagramEnv.expandToInclude(this.clipEnv);}
vertices=jsts.triangulate.DelaunayTriangulationBuilder.toVertices(this.siteCoords);this.subdiv=new jsts.triangulate.quadedge.QuadEdgeSubdivision(siteEnv,this.tolerance);triangulator=new jsts.triangulate.IncrementalDelaunayTriangulator(this.subdiv);triangulator.insertSites(vertices);};jsts.triangulate.VoronoiDiagramBuilder.prototype.getSubdivision=function(){this.create();return this.subdiv;};jsts.triangulate.VoronoiDiagramBuilder.prototype.getDiagram=function(geomFact){this.create();var polys=this.subdiv.getVoronoiDiagram(geomFact);return this.clipGeometryCollection(polys,this.diagramEnv);};jsts.triangulate.VoronoiDiagramBuilder.prototype.clipGeometryCollection=function(geom,clipEnv){var clipPoly,clipped,i,il,g,result;clipPoly=geom.getFactory().toGeometry(clipEnv);clipped=[];i=0,il=geom.getNumGeometries();for(i;i<il;i++){g=geom.getGeometryN(i);result=null;if(clipEnv.contains(g.getEnvelopeInternal())){result=g;}
else if(clipEnv.intersects(g.getEnvelopeInternal())){result=clipPoly.intersection(g);}
if(result!==null&&!result.isEmpty()){clipped.push(result);}}
return geom.getFactory().createGeometryCollection(clipped);};jsts.operation.valid.IndexedNestedRingTester=function(graph){this.graph=graph;this.rings=new javascript.util.ArrayList();this.totalEnv=new jsts.geom.Envelope();this.index=null;this.nestedPt=null;};jsts.operation.valid.IndexedNestedRingTester.prototype.getNestedPoint=function(){return this.nestedPt;};jsts.operation.valid.IndexedNestedRingTester.prototype.add=function(ring){this.rings.add(ring);this.totalEnv.expandToInclude(ring.getEnvelopeInternal());};jsts.operation.valid.IndexedNestedRingTester.prototype.isNonNested=function(){this.buildIndex();for(var i=0;i<this.rings.size();i++){var innerRing=this.rings.get(i);var innerRingPts=innerRing.getCoordinates();var results=this.index.query(innerRing.getEnvelopeInternal());for(var j=0;j<results.length;j++){var searchRing=results[j];var searchRingPts=searchRing.getCoordinates();if(innerRing==searchRing){continue;}
if(!innerRing.getEnvelopeInternal().intersects(searchRing.getEnvelopeInternal())){continue;}
var innerRingPt=jsts.operation.valid.IsValidOp.findPtNotNode(innerRingPts,searchRing,this.graph);if(innerRingPt==null){continue;}
var isInside=jsts.algorithm.CGAlgorithms.isPointInRing(innerRingPt,searchRingPts);if(isInside){this.nestedPt=innerRingPt;return false;}}}
return true;};jsts.operation.valid.IndexedNestedRingTester.prototype.buildIndex=function(){this.index=new jsts.index.strtree.STRtree();for(var i=0;i<this.rings.size();i++){var ring=this.rings.get(i);var env=ring.getEnvelopeInternal();this.index.insert(env,ring);}};jsts.noding.SegmentNode=function(segString,coord,segmentIndex,segmentOctant){this.segString=segString;this.coord=new jsts.geom.Coordinate(coord);this.segmentIndex=segmentIndex;this.segmentOctant=segmentOctant;this._isInterior=!coord.equals2D(segString.getCoordinate(segmentIndex));};jsts.noding.SegmentNode.prototype.segString=null;jsts.noding.SegmentNode.prototype.coord=null;jsts.noding.SegmentNode.prototype.segmentIndex=null;jsts.noding.SegmentNode.prototype.segmentOctant=null;jsts.noding.SegmentNode.prototype._isInterior=null;jsts.noding.SegmentNode.prototype.getCoordinate=function(){return this.coord;};jsts.noding.SegmentNode.prototype.isInterior=function(){return this._isInterior;};jsts.noding.SegmentNode.prototype.isEndPoint=function(maxSegmentIndex){if(this.segmentIndex===0&&!this._isInterior)return true;if(this.segmentIndex===this.maxSegmentIndex)return true;return false;};jsts.noding.SegmentNode.prototype.compareTo=function(obj){var other=obj;if(this.segmentIndex<other.segmentIndex)return-1;if(this.segmentIndex>other.segmentIndex)return 1;if(this.coord.equals2D(other.coord))return 0;return jsts.noding.SegmentPointComparator.compare(this.segmentOctant,this.coord,other.coord);};(function(){jsts.io.GeoJSONWriter=function(){this.parser=new jsts.io.GeoJSONParser(this.geometryFactory);};jsts.io.GeoJSONWriter.prototype.write=function(geometry){var geoJson=this.parser.write(geometry);return geoJson;};})();jsts.io.OpenLayersParser=function(geometryFactory){this.geometryFactory=geometryFactory||new jsts.geom.GeometryFactory();};jsts.io.OpenLayersParser.prototype.read=function(geometry){if(geometry.CLASS_NAME==='OpenLayers.Geometry.Point'){return this.convertFromPoint(geometry);}else if(geometry.CLASS_NAME==='OpenLayers.Geometry.LineString'){return this.convertFromLineString(geometry);}else if(geometry.CLASS_NAME==='OpenLayers.Geometry.LinearRing'){return this.convertFromLinearRing(geometry);}else if(geometry.CLASS_NAME==='OpenLayers.Geometry.Polygon'){return this.convertFromPolygon(geometry);}else if(geometry.CLASS_NAME==='OpenLayers.Geometry.MultiPoint'){return this.convertFromMultiPoint(geometry);}else if(geometry.CLASS_NAME==='OpenLayers.Geometry.MultiLineString'){return this.convertFromMultiLineString(geometry);}else if(geometry.CLASS_NAME==='OpenLayers.Geometry.MultiPolygon'){return this.convertFromMultiPolygon(geometry);}else if(geometry.CLASS_NAME==='OpenLayers.Geometry.Collection'){return this.convertFromCollection(geometry);}};jsts.io.OpenLayersParser.prototype.convertFromPoint=function(point){return this.geometryFactory.createPoint(new jsts.geom.Coordinate(point.x,point.y));};jsts.io.OpenLayersParser.prototype.convertFromLineString=function(lineString){var i;var coordinates=[];for(i=0;i<lineString.components.length;i++){coordinates.push(new jsts.geom.Coordinate(lineString.components[i].x,lineString.components[i].y));}
return this.geometryFactory.createLineString(coordinates);};jsts.io.OpenLayersParser.prototype.convertFromLinearRing=function(linearRing){var i;var coordinates=[];for(i=0;i<linearRing.components.length;i++){coordinates.push(new jsts.geom.Coordinate(linearRing.components[i].x,linearRing.components[i].y));}
return this.geometryFactory.createLinearRing(coordinates);};jsts.io.OpenLayersParser.prototype.convertFromPolygon=function(polygon){var i;var shell=null;var holes=[];for(i=0;i<polygon.components.length;i++){var linearRing=this.convertFromLinearRing(polygon.components[i]);if(i===0){shell=linearRing;}else{holes.push(linearRing);}}
return this.geometryFactory.createPolygon(shell,holes);};jsts.io.OpenLayersParser.prototype.convertFromMultiPoint=function(multiPoint){var i;var points=[];for(i=0;i<multiPoint.components.length;i++){points.push(this.convertFromPoint(multiPoint.components[i]));}
return this.geometryFactory.createMultiPoint(points);};jsts.io.OpenLayersParser.prototype.convertFromMultiLineString=function(multiLineString){var i;var lineStrings=[];for(i=0;i<multiLineString.components.length;i++){lineStrings.push(this.convertFromLineString(multiLineString.components[i]));}
return this.geometryFactory.createMultiLineString(lineStrings);};jsts.io.OpenLayersParser.prototype.convertFromMultiPolygon=function(multiPolygon){var i;var polygons=[];for(i=0;i<multiPolygon.components.length;i++){polygons.push(this.convertFromPolygon(multiPolygon.components[i]));}
return this.geometryFactory.createMultiPolygon(polygons);};jsts.io.OpenLayersParser.prototype.convertFromCollection=function(collection){var i;var geometries=[];for(i=0;i<collection.components.length;i++){geometries.push(this.convertFrom(collection.components[i]));}
return this.geometryFactory.createGeometryCollection(geometries);};jsts.io.OpenLayersParser.prototype.write=function(geometry){if(geometry.CLASS_NAME==='jsts.geom.Point'){return this.convertToPoint(geometry.coordinate);}else if(geometry.CLASS_NAME==='jsts.geom.LineString'){return this.convertToLineString(geometry);}else if(geometry.CLASS_NAME==='jsts.geom.LinearRing'){return this.convertToLinearRing(geometry);}else if(geometry.CLASS_NAME==='jsts.geom.Polygon'){return this.convertToPolygon(geometry);}else if(geometry.CLASS_NAME==='jsts.geom.MultiPoint'){return this.convertToMultiPoint(geometry);}else if(geometry.CLASS_NAME==='jsts.geom.MultiLineString'){return this.convertToMultiLineString(geometry);}else if(geometry.CLASS_NAME==='jsts.geom.MultiPolygon'){return this.convertToMultiPolygon(geometry);}else if(geometry.CLASS_NAME==='jsts.geom.GeometryCollection'){return this.convertToCollection(geometry);}};jsts.io.OpenLayersParser.prototype.convertToPoint=function(coordinate){return new OpenLayers.Geometry.Point(coordinate.x,coordinate.y);};jsts.io.OpenLayersParser.prototype.convertToLineString=function(lineString){var i;var points=[];for(i=0;i<lineString.points.length;i++){var coordinate=lineString.points[i];points.push(this.convertToPoint(coordinate));}
return new OpenLayers.Geometry.LineString(points);};jsts.io.OpenLayersParser.prototype.convertToLinearRing=function(linearRing){var i;var points=[];for(i=0;i<linearRing.points.length;i++){var coordinate=linearRing.points[i];points.push(this.convertToPoint(coordinate));}
return new OpenLayers.Geometry.LinearRing(points);};jsts.io.OpenLayersParser.prototype.convertToPolygon=function(polygon){var i;var rings=[];rings.push(this.convertToLinearRing(polygon.shell));for(i=0;i<polygon.holes.length;i++){var ring=polygon.holes[i];rings.push(this.convertToLinearRing(ring));}
return new OpenLayers.Geometry.Polygon(rings);};jsts.io.OpenLayersParser.prototype.convertToMultiPoint=function(multiPoint){var i;var points=[];for(i=0;i<multiPoint.geometries.length;i++){var coordinate=multiPoint.geometries[i].coordinate;points.push(new OpenLayers.Geometry.Point(coordinate.x,coordinate.y));}
return new OpenLayers.Geometry.MultiPoint(points);};jsts.io.OpenLayersParser.prototype.convertToMultiLineString=function(multiLineString){var i;var lineStrings=[];for(i=0;i<multiLineString.geometries.length;i++){lineStrings.push(this.convertToLineString(multiLineString.geometries[i]));}
return new OpenLayers.Geometry.MultiLineString(lineStrings);};jsts.io.OpenLayersParser.prototype.convertToMultiPolygon=function(multiPolygon){var i;var polygons=[];for(i=0;i<multiPolygon.geometries.length;i++){polygons.push(this.convertToPolygon(multiPolygon.geometries[i]));}
return new OpenLayers.Geometry.MultiPolygon(polygons);};jsts.io.OpenLayersParser.prototype.convertToCollection=function(geometryCollection){var i;var geometries=[];for(i=0;i<geometryCollection.geometries.length;i++){var geometry=geometryCollection.geometries[i];var geometryOpenLayers=this.write(geometry);geometries.push(geometryOpenLayers);}
return new OpenLayers.Geometry.Collection(geometries);};jsts.index.quadtree.Quadtree=function(){this.root=new jsts.index.quadtree.Root();this.minExtent=1.0;};jsts.index.quadtree.Quadtree.ensureExtent=function(itemEnv,minExtent){var minx,maxx,miny,maxy;minx=itemEnv.getMinX();maxx=itemEnv.getMaxX();miny=itemEnv.getMinY();maxy=itemEnv.getMaxY();if(minx!==maxx&&miny!==maxy){return itemEnv;}
if(minx===maxx){minx=minx-(minExtent/2.0);maxx=minx+(minExtent/2.0);}
if(miny===maxy){miny=miny-(minExtent/2.0);maxy=miny+(minExtent/2.0);}
return new jsts.geom.Envelope(minx,maxx,miny,maxy);};jsts.index.quadtree.Quadtree.prototype.depth=function(){return this.root.depth();};jsts.index.quadtree.Quadtree.prototype.size=function(){return this.root.size();};jsts.index.quadtree.Quadtree.prototype.insert=function(itemEnv,item){this.collectStats(itemEnv);var insertEnv=jsts.index.quadtree.Quadtree.ensureExtent(itemEnv,this.minExtent);this.root.insert(insertEnv,item);};jsts.index.quadtree.Quadtree.prototype.remove=function(itemEnv,item){var posEnv=jsts.index.quadtree.Quadtree.ensureExtent(itemEnv,this.minExtent);return this.root.remove(posEnv,item);};jsts.index.quadtree.Quadtree.prototype.query=function(){if(arguments.length===1){return jsts.index.quadtree.Quadtree.prototype.queryByEnvelope.apply(this,arguments);}else{jsts.index.quadtree.Quadtree.prototype.queryWithVisitor.apply(this,arguments);}};jsts.index.quadtree.Quadtree.prototype.queryByEnvelope=function(searchEnv){var visitor=new jsts.index.ArrayListVisitor();this.query(searchEnv,visitor);return visitor.getItems();};jsts.index.quadtree.Quadtree.prototype.queryWithVisitor=function(searchEnv,visitor){this.root.visit(searchEnv,visitor);};jsts.index.quadtree.Quadtree.prototype.queryAll=function(){var foundItems=[];foundItems=this.root.addAllItems(foundItems);return foundItems;};jsts.index.quadtree.Quadtree.prototype.collectStats=function(itemEnv){var delX=itemEnv.getWidth();if(delX<this.minExtent&&delX>0.0){this.minExtent=delX;}
var delY=itemEnv.getHeight();if(delY<this.minExtent&&delY>0.0){this.minExtent=delY;}};jsts.operation.relate.RelateNodeFactory=function(){};jsts.operation.relate.RelateNodeFactory.prototype=new jsts.geomgraph.NodeFactory();jsts.operation.relate.RelateNodeFactory.prototype.createNode=function(coord){return new jsts.operation.relate.RelateNode(coord,new jsts.operation.relate.EdgeEndBundleStar());};jsts.index.quadtree.Key=function(itemEnv){this.pt=new jsts.geom.Coordinate();this.level=0;this.env=null;this.computeKey(itemEnv);};jsts.index.quadtree.Key.computeQuadLevel=function(env){var dx,dy,dMax,level;dx=env.getWidth();dy=env.getHeight();dMax=dx>dy?dx:dy;level=jsts.index.DoubleBits.exponent(dMax)+1;return level;};jsts.index.quadtree.Key.prototype.getPoint=function(){return this.pt;};jsts.index.quadtree.Key.prototype.getLevel=function(){return this.level;};jsts.index.quadtree.Key.prototype.getEnvelope=function(){return this.env;};jsts.index.quadtree.Key.prototype.getCentre=function(){var x,y;x=(this.env.getMinX()+this.env.getMaxX())/2;y=(this.env.getMinY()+this.env.getMaxY())/2;return new jsts.geom.Coordinate(x,y);};jsts.index.quadtree.Key.prototype.computeKey=function(){if(arguments[0]instanceof jsts.geom.Envelope){this.computeKeyFromEnvelope(arguments[0]);}else{this.computeKeyFromLevel(arguments[0],arguments[1]);}};jsts.index.quadtree.Key.prototype.computeKeyFromEnvelope=function(env){this.level=jsts.index.quadtree.Key.computeQuadLevel(env);this.env=new jsts.geom.Envelope();this.computeKey(this.level,env);while(!this.env.contains(env)){this.level+=1;this.computeKey(this.level,env);}};jsts.index.quadtree.Key.prototype.computeKeyFromLevel=function(level,env){var quadSize=jsts.index.DoubleBits.powerOf2(level);this.pt.x=Math.floor(env.getMinX()/quadSize)*quadSize;this.pt.y=Math.floor(env.getMinY()/quadSize)*quadSize;this.env.init(this.pt.x,this.pt.x+quadSize,this.pt.y,this.pt.y+
quadSize);};jsts.operation.buffer.OffsetSegmentGenerator=function(precisionModel,bufParams,distance){this.seg0=new jsts.geom.LineSegment();this.seg1=new jsts.geom.LineSegment();this.offset0=new jsts.geom.LineSegment();this.offset1=new jsts.geom.LineSegment();this.precisionModel=precisionModel;this.bufParams=bufParams;this.li=new jsts.algorithm.RobustLineIntersector();this.filletAngleQuantum=Math.PI/2.0/bufParams.getQuadrantSegments();if(this.bufParams.getQuadrantSegments()>=8&&this.bufParams.getJoinStyle()===jsts.operation.buffer.BufferParameters.JOIN_ROUND){this.closingSegLengthFactor=jsts.operation.buffer.OffsetSegmentGenerator.MAX_CLOSING_SEG_LEN_FACTOR;}
this.init(distance);};jsts.operation.buffer.OffsetSegmentGenerator.OFFSET_SEGMENT_SEPARATION_FACTOR=1.0E-3;jsts.operation.buffer.OffsetSegmentGenerator.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR=1.0E-3;jsts.operation.buffer.OffsetSegmentGenerator.CURVE_VERTEX_SNAP_DISTANCE_FACTOR=1.0E-6;jsts.operation.buffer.OffsetSegmentGenerator.MAX_CLOSING_SEG_LEN_FACTOR=80;jsts.operation.buffer.OffsetSegmentGenerator.prototype.maxCurveSegmentError=0.0;jsts.operation.buffer.OffsetSegmentGenerator.prototype.filletAngleQuantum=null;jsts.operation.buffer.OffsetSegmentGenerator.prototype.closingSegLengthFactor=1;jsts.operation.buffer.OffsetSegmentGenerator.prototype.segList=null;jsts.operation.buffer.OffsetSegmentGenerator.prototype.distance=0.0;jsts.operation.buffer.OffsetSegmentGenerator.prototype.precisionModel=null;jsts.operation.buffer.OffsetSegmentGenerator.prototype.bufParams=null;jsts.operation.buffer.OffsetSegmentGenerator.prototype.li=null;jsts.operation.buffer.OffsetSegmentGenerator.prototype.s0=null;jsts.operation.buffer.OffsetSegmentGenerator.prototype.s1=null;jsts.operation.buffer.OffsetSegmentGenerator.prototype.s2=null;jsts.operation.buffer.OffsetSegmentGenerator.prototype.seg0=null;jsts.operation.buffer.OffsetSegmentGenerator.prototype.seg1=null;jsts.operation.buffer.OffsetSegmentGenerator.prototype.offset0=null;jsts.operation.buffer.OffsetSegmentGenerator.prototype.offset1=null;jsts.operation.buffer.OffsetSegmentGenerator.prototype.side=0;jsts.operation.buffer.OffsetSegmentGenerator.prototype.hasNarrowConcaveAngle=false;jsts.operation.buffer.OffsetSegmentGenerator.prototype.hasNarrowConcaveAngle=function(){return this.hasNarrowConcaveAngle;};jsts.operation.buffer.OffsetSegmentGenerator.prototype.init=function(distance){this.distance=distance;this.maxCurveSegmentError=this.distance*(1-Math.cos(this.filletAngleQuantum/2.0));this.segList=new jsts.operation.buffer.OffsetSegmentString();this.segList.setPrecisionModel(this.precisionModel);this.segList.setMinimumVertexDistance(this.distance*jsts.operation.buffer.OffsetSegmentGenerator.CURVE_VERTEX_SNAP_DISTANCE_FACTOR);};jsts.operation.buffer.OffsetSegmentGenerator.prototype.initSideSegments=function(s1,s2,side){this.s1=s1;this.s2=s2;this.side=side;this.seg1.setCoordinates(this.s1,this.s2);this.computeOffsetSegment(this.seg1,this.side,this.distance,this.offset1);};jsts.operation.buffer.OffsetSegmentGenerator.prototype.getCoordinates=function(){return this.segList.getCoordinates();};jsts.operation.buffer.OffsetSegmentGenerator.prototype.closeRing=function(){this.segList.closeRing();};jsts.operation.buffer.OffsetSegmentGenerator.prototype.addSegments=function(pt,isForward){this.segList.addPts(pt,isForward);};jsts.operation.buffer.OffsetSegmentGenerator.prototype.addFirstSegment=function(){this.segList.addPt(this.offset1.p0);};jsts.operation.buffer.OffsetSegmentGenerator.prototype.addLastSegment=function(){this.segList.addPt(this.offset1.p1);};jsts.operation.buffer.OffsetSegmentGenerator.prototype.addNextSegment=function(p,addStartPoint){this.s0=this.s1;this.s1=this.s2;this.s2=p;this.seg0.setCoordinates(this.s0,this.s1);this.computeOffsetSegment(this.seg0,this.side,this.distance,this.offset0);this.seg1.setCoordinates(this.s1,this.s2);this.computeOffsetSegment(this.seg1,this.side,this.distance,this.offset1);if(this.s1.equals(this.s2))
return;var orientation=jsts.algorithm.CGAlgorithms.computeOrientation(this.s0,this.s1,this.s2);var outsideTurn=(orientation===jsts.algorithm.CGAlgorithms.CLOCKWISE&&this.side===jsts.geomgraph.Position.LEFT)||(orientation===jsts.algorithm.CGAlgorithms.COUNTERCLOCKWISE&&this.side===jsts.geomgraph.Position.RIGHT);if(orientation==0){this.addCollinear(addStartPoint);}else if(outsideTurn){this.addOutsideTurn(orientation,addStartPoint);}else{this.addInsideTurn(orientation,addStartPoint);}};jsts.operation.buffer.OffsetSegmentGenerator.prototype.addCollinear=function(addStartPoint){this.li.computeIntersection(this.s0,this.s1,this.s1,this.s2);var numInt=this.li.getIntersectionNum();if(numInt>=2){if(this.bufParams.getJoinStyle()===jsts.operation.buffer.BufferParameters.JOIN_BEVEL||this.bufParams.getJoinStyle()===jsts.operation.buffer.BufferParameters.JOIN_MITRE){if(addStartPoint)
this.segList.addPt(this.offset0.p1);this.segList.addPt(this.offset1.p0);}else{this.addFillet(this.s1,this.offset0.p1,this.offset1.p0,jsts.algorithm.CGAlgorithms.CLOCKWISE,this.distance);}}};jsts.operation.buffer.OffsetSegmentGenerator.prototype.addOutsideTurn=function(orientation,addStartPoint){if(this.offset0.p1.distance(this.offset1.p0)<this.distance*jsts.operation.buffer.OffsetSegmentGenerator.OFFSET_SEGMENT_SEPARATION_FACTOR){this.segList.addPt(this.offset0.p1);return;}
if(this.bufParams.getJoinStyle()===jsts.operation.buffer.BufferParameters.JOIN_MITRE){this.addMitreJoin(this.s1,this.offset0,this.offset1,this.distance);}else if(this.bufParams.getJoinStyle()===jsts.operation.buffer.BufferParameters.JOIN_BEVEL){this.addBevelJoin(this.offset0,this.offset1);}else{if(addStartPoint)
this.segList.addPt(this.offset0.p1);this.addFillet(this.s1,this.offset0.p1,this.offset1.p0,orientation,this.distance);this.segList.addPt(this.offset1.p0);}};jsts.operation.buffer.OffsetSegmentGenerator.prototype.addInsideTurn=function(orientation,addStartPoint){this.li.computeIntersection(this.offset0.p0,this.offset0.p1,this.offset1.p0,this.offset1.p1);if(this.li.hasIntersection()){this.segList.addPt(this.li.getIntersection(0));}else{this.hasNarrowConcaveAngle=true;if(this.offset0.p1.distance(this.offset1.p0)<this.distance*jsts.operation.buffer.OffsetSegmentGenerator.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR){this.segList.addPt(this.offset0.p1);}else{this.segList.addPt(this.offset0.p1);if(this.closingSegLengthFactor>0){var mid0=new jsts.geom.Coordinate((this.closingSegLengthFactor*this.offset0.p1.x+this.s1.x)/(this.closingSegLengthFactor+1),(this.closingSegLengthFactor*this.offset0.p1.y+this.s1.y)/(this.closingSegLengthFactor+1));this.segList.addPt(mid0);var mid1=new jsts.geom.Coordinate((this.closingSegLengthFactor*this.offset1.p0.x+this.s1.x)/(this.closingSegLengthFactor+1),(this.closingSegLengthFactor*this.offset1.p0.y+this.s1.y)/(this.closingSegLengthFactor+1));this.segList.addPt(mid1);}else{this.segList.addPt(this.s1);}
this.segList.addPt(this.offset1.p0);}}};jsts.operation.buffer.OffsetSegmentGenerator.prototype.computeOffsetSegment=function(seg,side,distance,offset){var sideSign=side===jsts.geomgraph.Position.LEFT?1:-1;var dx=seg.p1.x-seg.p0.x;var dy=seg.p1.y-seg.p0.y;var len=Math.sqrt(dx*dx+dy*dy);var ux=sideSign*distance*dx/len;var uy=sideSign*distance*dy/len;offset.p0.x=seg.p0.x-uy;offset.p0.y=seg.p0.y+ux;offset.p1.x=seg.p1.x-uy;offset.p1.y=seg.p1.y+ux;};jsts.operation.buffer.OffsetSegmentGenerator.prototype.addLineEndCap=function(p0,p1){var seg=new jsts.geom.LineSegment(p0,p1);var offsetL=new jsts.geom.LineSegment();this.computeOffsetSegment(seg,jsts.geomgraph.Position.LEFT,this.distance,offsetL);var offsetR=new jsts.geom.LineSegment();this.computeOffsetSegment(seg,jsts.geomgraph.Position.RIGHT,this.distance,offsetR);var dx=p1.x-p0.x;var dy=p1.y-p0.y;var angle=Math.atan2(dy,dx);switch(this.bufParams.getEndCapStyle()){case jsts.operation.buffer.BufferParameters.CAP_ROUND:this.segList.addPt(offsetL.p1);this.addFillet(p1,angle+Math.PI/2,angle-Math.PI/2,jsts.algorithm.CGAlgorithms.CLOCKWISE,this.distance);this.segList.addPt(offsetR.p1);break;case jsts.operation.buffer.BufferParameters.CAP_FLAT:this.segList.addPt(offsetL.p1);this.segList.addPt(offsetR.p1);break;case jsts.operation.buffer.BufferParameters.CAP_SQUARE:var squareCapSideOffset=new jsts.geom.Coordinate();squareCapSideOffset.x=Math.abs(this.distance)*Math.cos(angle);squareCapSideOffset.y=Math.abs(this.distance)*Math.sin(angle);var squareCapLOffset=new jsts.geom.Coordinate(offsetL.p1.x+
squareCapSideOffset.x,offsetL.p1.y+squareCapSideOffset.y);var squareCapROffset=new jsts.geom.Coordinate(offsetR.p1.x+
squareCapSideOffset.x,offsetR.p1.y+squareCapSideOffset.y);this.segList.addPt(squareCapLOffset);this.segList.addPt(squareCapROffset);break;}};jsts.operation.buffer.OffsetSegmentGenerator.prototype.addMitreJoin=function(p,offset0,offset1,distance){var isMitreWithinLimit=true;var intPt=null;try{intPt=jsts.algorithm.HCoordinate.intersection(offset0.p0,offset0.p1,offset1.p0,offset1.p1);var mitreRatio=distance<=0.0?1.0:intPt.distance(p)/Math.abs(distance);if(mitreRatio>this.bufParams.getMitreLimit())
this.isMitreWithinLimit=false;}catch(e){if(e instanceof jsts.error.NotRepresentableError){intPt=new jsts.geom.Coordinate(0,0);this.isMitreWithinLimit=false;}}
if(isMitreWithinLimit){this.segList.addPt(intPt);}else{this.addLimitedMitreJoin(offset0,offset1,distance,bufParams.getMitreLimit());}};jsts.operation.buffer.OffsetSegmentGenerator.prototype.addLimitedMitreJoin=function(offset0,offset1,distance,mitreLimit){var basePt=this.seg0.p1;var ang0=jsts.algorithm.Angle.angle(basePt,this.seg0.p0);var ang1=jsts.algorithm.Angle.angle(basePt,this.seg1.p1);var angDiff=jsts.algorithm.Angle.angleBetweenOriented(this.seg0.p0,basePt,this.seg1.p1);var angDiffHalf=angDiff/2;var midAng=jsts.algorithm.Angle.normalize(ang0+angDiffHalf);var mitreMidAng=jsts.algorithm.Angle.normalize(midAng+Math.PI);var mitreDist=mitreLimit*distance;var bevelDelta=mitreDist*Math.abs(Math.sin(angDiffHalf));var bevelHalfLen=distance-bevelDelta;var bevelMidX=basePt.x+mitreDist*Math.cos(mitreMidAng);var bevelMidY=basePt.y+mitreDist*Math.sin(mitreMidAng);var bevelMidPt=new jsts.geom.Coordinate(bevelMidX,bevelMidY);var mitreMidLine=new jsts.geom.LineSegment(basePt,bevelMidPt);var bevelEndLeft=mitreMidLine.pointAlongOffset(1.0,bevelHalfLen);var bevelEndRight=mitreMidLine.pointAlongOffset(1.0,-bevelHalfLen);if(this.side==jsts.geomgraph.Position.LEFT){this.segList.addPt(bevelEndLeft);this.segList.addPt(bevelEndRight);}else{this.segList.addPt(bevelEndRight);this.segList.addPt(bevelEndLeft);}};jsts.operation.buffer.OffsetSegmentGenerator.prototype.addBevelJoin=function(offset0,offset1){this.segList.addPt(offset0.p1);this.segList.addPt(offset1.p0);};jsts.operation.buffer.OffsetSegmentGenerator.prototype.addFillet=function(p,p0,p1,direction,radius){if(!(p1 instanceof jsts.geom.Coordinate)){this.addFillet2.apply(this,arguments);return;}
var dx0=p0.x-p.x;var dy0=p0.y-p.y;var startAngle=Math.atan2(dy0,dx0);var dx1=p1.x-p.x;var dy1=p1.y-p.y;var endAngle=Math.atan2(dy1,dx1);if(direction===jsts.algorithm.CGAlgorithms.CLOCKWISE){if(startAngle<=endAngle)
startAngle+=2.0*Math.PI;}else{if(startAngle>=endAngle)
startAngle-=2.0*Math.PI;}
this.segList.addPt(p0);this.addFillet(p,startAngle,endAngle,direction,radius);this.segList.addPt(p1);};jsts.operation.buffer.OffsetSegmentGenerator.prototype.addFillet2=function(p,startAngle,endAngle,direction,radius){var directionFactor=direction===jsts.algorithm.CGAlgorithms.CLOCKWISE?-1:1;var totalAngle=Math.abs(startAngle-endAngle);var nSegs=parseInt((totalAngle/this.filletAngleQuantum+0.5));if(nSegs<1)
return;var initAngle,currAngleInc;initAngle=0.0;currAngleInc=totalAngle/nSegs;var currAngle=initAngle;var pt=new jsts.geom.Coordinate();while(currAngle<totalAngle){var angle=startAngle+directionFactor*currAngle;pt.x=p.x+radius*Math.cos(angle);pt.y=p.y+radius*Math.sin(angle);this.segList.addPt(pt);currAngle+=currAngleInc;}};jsts.operation.buffer.OffsetSegmentGenerator.prototype.createCircle=function(p){var pt=new jsts.geom.Coordinate(p.x+this.distance,p.y);this.segList.addPt(pt);this.addFillet(p,0.0,2.0*Math.PI,-1,this.distance);this.segList.closeRing();};jsts.operation.buffer.OffsetSegmentGenerator.prototype.createSquare=function(p){this.segList.addPt(new jsts.geom.Coordinate(p.x+distance,p.y+distance));this.segList.addPt(new jsts.geom.Coordinate(p.x+distance,p.y-distance));this.segList.addPt(new jsts.geom.Coordinate(p.x-distance,p.y-distance));this.segList.addPt(new jsts.geom.Coordinate(p.x-distance,p.y+distance));this.segList.closeRing();};jsts.geom.CoordinateArrays=function(){throw new jsts.error.AbstractMethodInvocationError();};jsts.geom.CoordinateArrays.removeRepeatedPoints=function(coord){var coordList;if(!this.hasRepeatedPoints(coord)){return coord;}
coordList=new jsts.geom.CoordinateList(coord,false);return coordList.toCoordinateArray();};jsts.geom.CoordinateArrays.hasRepeatedPoints=function(coord){var i;for(i=1;i<coord.length;i++){if(coord[i-1].equals(coord[i])){return true;}}
return false;};jsts.geom.CoordinateArrays.ptNotInList=function(testPts,pts){for(var i=0;i<testPts.length;i++){var testPt=testPts[i];if(jsts.geom.CoordinateArrays.indexOf(testPt,pts)<0)
return testPt;}
return null;};jsts.geom.CoordinateArrays.increasingDirection=function(pts){for(var i=0;i<parseInt(pts.length/2);i++){var j=pts.length-1-i;var comp=pts[i].compareTo(pts[j]);if(comp!=0)
return comp;}
return 1;};jsts.geom.CoordinateArrays.minCoordinate=function(coordinates){var minCoord=null;for(var i=0;i<coordinates.length;i++){if(minCoord===null||minCoord.compareTo(coordinates[i])>0){minCoord=coordinates[i];}}
return minCoord;};jsts.geom.CoordinateArrays.scroll=function(coordinates,firstCoordinate){var i=jsts.geom.CoordinateArrays.indexOf(firstCoordinate,coordinates);if(i<0)
return;var newCoordinates=coordinates.slice(i).concat(coordinates.slice(0,i));for(i=0;i<newCoordinates.length;i++){coordinates[i]=newCoordinates[i];}};jsts.geom.CoordinateArrays.indexOf=function(coordinate,coordinates){for(var i=0;i<coordinates.length;i++){if(coordinate.equals(coordinates[i])){return i;}}
return-1;};jsts.operation.overlay.MinimalEdgeRing=function(start,geometryFactory){jsts.geomgraph.EdgeRing.call(this,start,geometryFactory);};jsts.operation.overlay.MinimalEdgeRing.prototype=new jsts.geomgraph.EdgeRing();jsts.operation.overlay.MinimalEdgeRing.constructor=jsts.operation.overlay.MinimalEdgeRing;jsts.operation.overlay.MinimalEdgeRing.prototype.getNext=function(de){return de.getNextMin();};jsts.operation.overlay.MinimalEdgeRing.prototype.setEdgeRing=function(de,er){de.setMinEdgeRing(er);};jsts.triangulate.DelaunayTriangulationBuilder=function(){this.siteCoords=null;this.tolerance=0.0;this.subdiv=null;};jsts.triangulate.DelaunayTriangulationBuilder.extractUniqueCoordinates=function(geom){if(geom===undefined||geom===null){return new jsts.geom.CoordinateList([],false).toArray();}
var coords=geom.getCoordinates();return jsts.triangulate.DelaunayTriangulationBuilder.unique(coords);};jsts.triangulate.DelaunayTriangulationBuilder.unique=function(coords){coords.sort(function(a,b){return a.compareTo(b);});var coordList=new jsts.geom.CoordinateList(coords,false);return coordList.toArray();};jsts.triangulate.DelaunayTriangulationBuilder.toVertices=function(coords){var verts=new Array(coords.length),i=0,il=coords.length,coord;for(i;i<il;i++){coord=coords[i];verts[i]=new jsts.triangulate.quadedge.Vertex(coord);}
return verts;};jsts.triangulate.DelaunayTriangulationBuilder.envelope=function(coords){var env=new jsts.geom.Envelope(),i=0,il=coords.length;for(i;i<il;i++){env.expandToInclude(coords[i]);}
return env;};jsts.triangulate.DelaunayTriangulationBuilder.prototype.setSites=function(){var arg=arguments[0];if(arg instanceof jsts.geom.Geometry||arg instanceof jsts.geom.Coordinate||arg instanceof jsts.geom.Point||arg instanceof jsts.geom.MultiPoint||arg instanceof jsts.geom.LineString||arg instanceof jsts.geom.MultiLineString||arg instanceof jsts.geom.LinearRing||arg instanceof jsts.geom.Polygon||arg instanceof jsts.geom.MultiPolygon){this.setSitesFromGeometry(arg);}else{this.setSitesFromCollection(arg);}};jsts.triangulate.DelaunayTriangulationBuilder.prototype.setSitesFromGeometry=function(geom){this.siteCoords=jsts.triangulate.DelaunayTriangulationBuilder.extractUniqueCoordinates(geom);};jsts.triangulate.DelaunayTriangulationBuilder.prototype.setSitesFromCollection=function(coords){this.siteCoords=jsts.triangulate.DelaunayTriangulationBuilder.unique(coords);};jsts.triangulate.DelaunayTriangulationBuilder.prototype.setTolerance=function(tolerance){this.tolerance=tolerance;};jsts.triangulate.DelaunayTriangulationBuilder.prototype.create=function(){if(this.subdiv===null){var siteEnv,vertices,triangulator;siteEnv=jsts.triangulate.DelaunayTriangulationBuilder.envelope(this.siteCoords);vertices=jsts.triangulate.DelaunayTriangulationBuilder.toVertices(this.siteCoords);this.subdiv=new jsts.triangulate.quadedge.QuadEdgeSubdivision(siteEnv,this.tolerance);triangulator=new jsts.triangulate.IncrementalDelaunayTriangulator(this.subdiv);triangulator.insertSites(vertices);}};jsts.triangulate.DelaunayTriangulationBuilder.prototype.getSubdivision=function(){this.create();return this.subdiv;};jsts.triangulate.DelaunayTriangulationBuilder.prototype.getEdges=function(geomFact){this.create();return this.subdiv.getEdges(geomFact);};jsts.triangulate.DelaunayTriangulationBuilder.prototype.getTriangles=function(geomFact){this.create();return this.subdiv.getTriangles(geomFact);};jsts.algorithm.RayCrossingCounter=function(p){this.p=p;};jsts.algorithm.RayCrossingCounter.locatePointInRing=function(p,ring){var counter=new jsts.algorithm.RayCrossingCounter(p);for(var i=1;i<ring.length;i++){var p1=ring[i];var p2=ring[i-1];counter.countSegment(p1,p2);if(counter.isOnSegment())
return counter.getLocation();}
return counter.getLocation();};jsts.algorithm.RayCrossingCounter.prototype.p=null;jsts.algorithm.RayCrossingCounter.prototype.crossingCount=0;jsts.algorithm.RayCrossingCounter.prototype.isPointOnSegment=false;jsts.algorithm.RayCrossingCounter.prototype.countSegment=function(p1,p2){if(p1.x<this.p.x&&p2.x<this.p.x)
return;if(this.p.x==p2.x&&this.p.y===p2.y){this.isPointOnSegment=true;return;}
if(p1.y===this.p.y&&p2.y===this.p.y){var minx=p1.x;var maxx=p2.x;if(minx>maxx){minx=p2.x;maxx=p1.x;}
if(this.p.x>=minx&&this.p.x<=maxx){this.isPointOnSegment=true;}
return;}
if(((p1.y>this.p.y)&&(p2.y<=this.p.y))||((p2.y>this.p.y)&&(p1.y<=this.p.y))){var x1=p1.x-this.p.x;var y1=p1.y-this.p.y;var x2=p2.x-this.p.x;var y2=p2.y-this.p.y;var xIntSign=jsts.algorithm.RobustDeterminant.signOfDet2x2(x1,y1,x2,y2);if(xIntSign===0.0){this.isPointOnSegment=true;return;}
if(y2<y1)
xIntSign=-xIntSign;if(xIntSign>0.0){this.crossingCount++;}}};jsts.algorithm.RayCrossingCounter.prototype.isOnSegment=function(){return jsts.geom.isPointOnSegment;};jsts.algorithm.RayCrossingCounter.prototype.getLocation=function(){if(this.isPointOnSegment)
return jsts.geom.Location.BOUNDARY;if((this.crossingCount%2)===1){return jsts.geom.Location.INTERIOR;}
return jsts.geom.Location.EXTERIOR;};jsts.algorithm.RayCrossingCounter.prototype.isPointInPolygon=function(){return this.getLocation()!==jsts.geom.Location.EXTERIOR;};jsts.operation.BoundaryOp=function(geom,bnRule){this.geom=geom;this.geomFact=geom.getFactory();this.bnRule=bnRule||jsts.algorithm.BoundaryNodeRule.MOD2_BOUNDARY_RULE;};jsts.operation.BoundaryOp.prototype.geom=null;jsts.operation.BoundaryOp.prototype.geomFact=null;jsts.operation.BoundaryOp.prototype.bnRule=null;jsts.operation.BoundaryOp.prototype.getBoundary=function(){if(this.geom instanceof jsts.geom.LineString)return this.boundaryLineString(this.geom);if(this.geom instanceof jsts.geom.MultiLineString)return this.boundaryMultiLineString(this.geom);return this.geom.getBoundary();};jsts.operation.BoundaryOp.prototype.getEmptyMultiPoint=function(){return this.geomFact.createMultiPoint(null);};jsts.operation.BoundaryOp.prototype.boundaryMultiLineString=function(mLine){if(this.geom.isEmpty()){return this.getEmptyMultiPoint();}
var bdyPts=this.computeBoundaryCoordinates(mLine);if(bdyPts.length==1){return this.geomFact.createPoint(bdyPts[0]);}
return this.geomFact.createMultiPoint(bdyPts);};jsts.operation.BoundaryOp.prototype.endpoints=null;jsts.operation.BoundaryOp.prototype.computeBoundaryCoordinates=function(mLine){var i,line,endpoint,bdyPts=[];this.endpoints=[];for(i=0;i<mLine.getNumGeometries();i++){line=mLine.getGeometryN(i);if(line.getNumPoints()==0)
continue;this.addEndpoint(line.getCoordinateN(0));this.addEndpoint(line.getCoordinateN(line.getNumPoints()-1));}
for(i=0;i<this.endpoints.length;i++){endpoint=this.endpoints[i];if(this.bnRule.isInBoundary(endpoint.count)){bdyPts.push(endpoint.coordinate);}}
return bdyPts;};jsts.operation.BoundaryOp.prototype.addEndpoint=function(pt){var i,endpoint,found=false;for(i=0;i<this.endpoints.length;i++){endpoint=this.endpoints[i];if(endpoint.coordinate.equals(pt)){found=true;break;}}
if(!found){endpoint={};endpoint.coordinate=pt;endpoint.count=0;this.endpoints.push(endpoint);}
endpoint.count++;};jsts.operation.BoundaryOp.prototype.boundaryLineString=function(line){if(this.geom.isEmpty()){return this.getEmptyMultiPoint();}
if(line.isClosed()){var closedEndpointOnBoundary=this.bnRule.isInBoundary(2);if(closedEndpointOnBoundary){return line.getStartPoint();}
else{return this.geomFact.createMultiPoint(null);}}
return this.geomFact.createMultiPoint([line.getStartPoint(),line.getEndPoint()]);};jsts.operation.buffer.OffsetCurveSetBuilder=function(inputGeom,distance,curveBuilder){this.inputGeom=inputGeom;this.distance=distance;this.curveBuilder=curveBuilder;this.curveList=new javascript.util.ArrayList();};jsts.operation.buffer.OffsetCurveSetBuilder.prototype.inputGeom=null;jsts.operation.buffer.OffsetCurveSetBuilder.prototype.distance=null;jsts.operation.buffer.OffsetCurveSetBuilder.prototype.curveBuilder=null;jsts.operation.buffer.OffsetCurveSetBuilder.prototype.curveList=null;jsts.operation.buffer.OffsetCurveSetBuilder.prototype.getCurves=function(){this.add(this.inputGeom);return this.curveList;};jsts.operation.buffer.OffsetCurveSetBuilder.prototype.addCurve=function(coord,leftLoc,rightLoc){if(coord==null||coord.length<2)
return;var e=new jsts.noding.NodedSegmentString(coord,new jsts.geomgraph.Label(0,jsts.geom.Location.BOUNDARY,leftLoc,rightLoc));this.curveList.add(e);};jsts.operation.buffer.OffsetCurveSetBuilder.prototype.add=function(g){if(g.isEmpty())
return;if(g instanceof jsts.geom.Polygon)
this.addPolygon(g);else if(g instanceof jsts.geom.LineString)
this.addLineString(g);else if(g instanceof jsts.geom.Point)
this.addPoint(g);else if(g instanceof jsts.geom.MultiPoint)
this.addCollection(g);else if(g instanceof jsts.geom.MultiLineString)
this.addCollection(g);else if(g instanceof jsts.geom.MultiPolygon)
this.addCollection(g);else if(g instanceof jsts.geom.GeometryCollection)
this.addCollection(g);else
throw new jsts.error.IllegalArgumentError();};jsts.operation.buffer.OffsetCurveSetBuilder.prototype.addCollection=function(gc){for(var i=0;i<gc.getNumGeometries();i++){var g=gc.getGeometryN(i);this.add(g);}};jsts.operation.buffer.OffsetCurveSetBuilder.prototype.addPoint=function(p){if(this.distance<=0.0)
return;var coord=p.getCoordinates();var curve=this.curveBuilder.getLineCurve(coord,this.distance);this.addCurve(curve,jsts.geom.Location.EXTERIOR,jsts.geom.Location.INTERIOR);};jsts.operation.buffer.OffsetCurveSetBuilder.prototype.addLineString=function(line){if(this.distance<=0.0&&!this.curveBuilder.getBufferParameters().isSingleSided())
return;var coord=jsts.geom.CoordinateArrays.removeRepeatedPoints(line.getCoordinates());var curve=this.curveBuilder.getLineCurve(coord,this.distance);this.addCurve(curve,jsts.geom.Location.EXTERIOR,jsts.geom.Location.INTERIOR);};jsts.operation.buffer.OffsetCurveSetBuilder.prototype.addPolygon=function(p){var offsetDistance=this.distance;var offsetSide=jsts.geomgraph.Position.LEFT;if(this.distance<0.0){offsetDistance=-this.distance;offsetSide=jsts.geomgraph.Position.RIGHT;}
var shell=p.getExteriorRing();var shellCoord=jsts.geom.CoordinateArrays.removeRepeatedPoints(shell.getCoordinates());if(this.distance<0.0&&this.isErodedCompletely(shell,this.distance))
return;if(this.distance<=0.0&&shellCoord.length<3)
return;this.addPolygonRing(shellCoord,offsetDistance,offsetSide,jsts.geom.Location.EXTERIOR,jsts.geom.Location.INTERIOR);for(var i=0;i<p.getNumInteriorRing();i++){var hole=p.getInteriorRingN(i);var holeCoord=jsts.geom.CoordinateArrays.removeRepeatedPoints(hole.getCoordinates());if(this.distance>0.0&&this.isErodedCompletely(hole,-this.distance))
continue;this.addPolygonRing(holeCoord,offsetDistance,jsts.geomgraph.Position.opposite(offsetSide),jsts.geom.Location.INTERIOR,jsts.geom.Location.EXTERIOR);}};jsts.operation.buffer.OffsetCurveSetBuilder.prototype.addPolygonRing=function(coord,offsetDistance,side,cwLeftLoc,cwRightLoc){if(offsetDistance==0.0&&coord.length<jsts.geom.LinearRing.MINIMUM_VALID_SIZE)
return;var leftLoc=cwLeftLoc;var rightLoc=cwRightLoc;if(coord.length>=jsts.geom.LinearRing.MINIMUM_VALID_SIZE&&jsts.algorithm.CGAlgorithms.isCCW(coord)){leftLoc=cwRightLoc;rightLoc=cwLeftLoc;side=jsts.geomgraph.Position.opposite(side);}
var curve=this.curveBuilder.getRingCurve(coord,side,offsetDistance);this.addCurve(curve,leftLoc,rightLoc);};jsts.operation.buffer.OffsetCurveSetBuilder.prototype.isErodedCompletely=function(ring,bufferDistance){var ringCoord=ring.getCoordinates();var minDiam=0.0;if(ringCoord.length<4)
return bufferDistance<0;if(ringCoord.length==4)
return this.isTriangleErodedCompletely(ringCoord,bufferDistance);var env=ring.getEnvelopeInternal();var envMinDimension=Math.min(env.getHeight(),env.getWidth());if(bufferDistance<0.0&&2*Math.abs(bufferDistance)>envMinDimension)
return true;return false;};jsts.operation.buffer.OffsetCurveSetBuilder.prototype.isTriangleErodedCompletely=function(triangleCoord,bufferDistance){var tri=new jsts.geom.Triangle(triangleCoord[0],triangleCoord[1],triangleCoord[2]);var inCentre=tri.inCentre();var distToCentre=jsts.algorithm.CGAlgorithms.distancePointLine(inCentre,tri.p0,tri.p1);return distToCentre<Math.abs(bufferDistance);};jsts.operation.buffer.BufferSubgraph=function(){this.dirEdgeList=new javascript.util.ArrayList();this.nodes=new javascript.util.ArrayList();this.finder=new jsts.operation.buffer.RightmostEdgeFinder();};jsts.operation.buffer.BufferSubgraph.prototype.finder=null;jsts.operation.buffer.BufferSubgraph.prototype.dirEdgeList=null;jsts.operation.buffer.BufferSubgraph.prototype.nodes=null;jsts.operation.buffer.BufferSubgraph.prototype.rightMostCoord=null;jsts.operation.buffer.BufferSubgraph.prototype.env=null;jsts.operation.buffer.BufferSubgraph.prototype.getDirectedEdges=function(){return this.dirEdgeList;};jsts.operation.buffer.BufferSubgraph.prototype.getNodes=function(){return this.nodes;};jsts.operation.buffer.BufferSubgraph.prototype.getEnvelope=function(){if(this.env===null){var edgeEnv=new jsts.geom.Envelope();for(var it=this.dirEdgeList.iterator();it.hasNext();){var dirEdge=it.next();var pts=dirEdge.getEdge().getCoordinates();for(var j=0;j<pts.length-1;j++){edgeEnv.expandToInclude(pts[j]);}}
this.env=edgeEnv;}
return this.env;};jsts.operation.buffer.BufferSubgraph.prototype.getRightmostCoordinate=function(){return this.rightMostCoord;};jsts.operation.buffer.BufferSubgraph.prototype.create=function(node){this.addReachable(node);this.finder.findEdge(this.dirEdgeList);this.rightMostCoord=this.finder.getCoordinate();};jsts.operation.buffer.BufferSubgraph.prototype.addReachable=function(startNode){var nodeStack=[];nodeStack.push(startNode);while(nodeStack.length!==0){var node=nodeStack.pop();this.add(node,nodeStack);}};jsts.operation.buffer.BufferSubgraph.prototype.add=function(node,nodeStack){node.setVisited(true);this.nodes.add(node);for(var i=node.getEdges().iterator();i.hasNext();){var de=i.next();this.dirEdgeList.add(de);var sym=de.getSym();var symNode=sym.getNode();if(!symNode.isVisited())
nodeStack.push(symNode);}};jsts.operation.buffer.BufferSubgraph.prototype.clearVisitedEdges=function(){for(var it=this.dirEdgeList.iterator();it.hasNext();){var de=it.next();de.setVisited(false);}};jsts.operation.buffer.BufferSubgraph.prototype.computeDepth=function(outsideDepth){this.clearVisitedEdges();var de=this.finder.getEdge();var n=de.getNode();var label=de.getLabel();de.setEdgeDepths(jsts.geomgraph.Position.RIGHT,outsideDepth);this.copySymDepths(de);this.computeDepths(de);};jsts.operation.buffer.BufferSubgraph.prototype.computeDepths=function(startEdge){var nodesVisited=[];var nodeQueue=[];var startNode=startEdge.getNode();nodeQueue.push(startNode);nodesVisited.push(startNode);startEdge.setVisited(true);while(nodeQueue.length!==0){var n=nodeQueue.shift();nodesVisited.push(n);this.computeNodeDepth(n);for(var i=n.getEdges().iterator();i.hasNext();){var de=i.next();var sym=de.getSym();if(sym.isVisited())
continue;var adjNode=sym.getNode();if(nodesVisited.indexOf(adjNode)===-1){nodeQueue.push(adjNode);nodesVisited.push(adjNode);}}}};jsts.operation.buffer.BufferSubgraph.prototype.computeNodeDepth=function(n){var startEdge=null;for(var i=n.getEdges().iterator();i.hasNext();){var de=i.next();if(de.isVisited()||de.getSym().isVisited()){startEdge=de;break;}}
if(startEdge==null)
throw new jsts.error.TopologyError('unable to find edge to compute depths at '+n.getCoordinate());n.getEdges().computeDepths(startEdge);for(var i=n.getEdges().iterator();i.hasNext();){var de=i.next();de.setVisited(true);this.copySymDepths(de);}};jsts.operation.buffer.BufferSubgraph.prototype.copySymDepths=function(de){var sym=de.getSym();sym.setDepth(jsts.geomgraph.Position.LEFT,de.getDepth(jsts.geomgraph.Position.RIGHT));sym.setDepth(jsts.geomgraph.Position.RIGHT,de.getDepth(jsts.geomgraph.Position.LEFT));};jsts.operation.buffer.BufferSubgraph.prototype.findResultEdges=function(){for(var it=this.dirEdgeList.iterator();it.hasNext();){var de=it.next();if(de.getDepth(jsts.geomgraph.Position.RIGHT)>=1&&de.getDepth(jsts.geomgraph.Position.LEFT)<=0&&!de.isInteriorAreaEdge()){de.setInResult(true);}}};jsts.operation.buffer.BufferSubgraph.prototype.compareTo=function(o){var graph=o;if(this.rightMostCoord.x<graph.rightMostCoord.x){return-1;}
if(this.rightMostCoord.x>graph.rightMostCoord.x){return 1;}
return 0;};jsts.geom.util.GeometryExtracter=function(clz,comps){this.clz=clz;this.comps=comps;};jsts.geom.util.GeometryExtracter.prototype=new jsts.geom.GeometryFilter();jsts.geom.util.GeometryExtracter.prototype.clz=null;jsts.geom.util.GeometryExtracter.prototype.comps=null;jsts.geom.util.GeometryExtracter.extract=function(geom,clz,list){list=list||new javascript.util.ArrayList();if(geom instanceof clz){list.add(geom);}
else if(geom instanceof jsts.geom.GeometryCollection||geom instanceof jsts.geom.MultiPoint||geom instanceof jsts.geom.MultiLineString||geom instanceof jsts.geom.MultiPolygon){geom.apply(new jsts.geom.util.GeometryExtracter(clz,list));}
return list;};jsts.geom.util.GeometryExtracter.prototype.filter=function(geom){if(this.clz===null||geom instanceof this.clz){this.comps.add(geom);}};(function(){var OverlayOp=jsts.operation.overlay.OverlayOp;var SnapOverlayOp=jsts.operation.overlay.snap.SnapOverlayOp;var SnapIfNeededOverlayOp=function(g1,g2){this.geom=[];this.geom[0]=g1;this.geom[1]=g2;};SnapIfNeededOverlayOp.overlayOp=function(g0,g1,opCode){var op=new SnapIfNeededOverlayOp(g0,g1);return op.getResultGeometry(opCode);};SnapIfNeededOverlayOp.intersection=function(g0,g1){return overlayOp(g0,g1,OverlayOp.INTERSECTION);};SnapIfNeededOverlayOp.union=function(g0,g1){return overlayOp(g0,g1,OverlayOp.UNION);};SnapIfNeededOverlayOp.difference=function(g0,g1){return overlayOp(g0,g1,OverlayOp.DIFFERENCE);};SnapIfNeededOverlayOp.symDifference=function(g0,g1){return overlayOp(g0,g1,OverlayOp.SYMDIFFERENCE);};SnapIfNeededOverlayOp.prototype.geom=null;SnapIfNeededOverlayOp.prototype.getResultGeometry=function(opCode){var result=null;var isSuccess=false;var savedException=null;try{result=OverlayOp.overlayOp(this.geom[0],this.geom[1],opCode);var isValid=true;if(isValid)
isSuccess=true;}catch(ex){savedException=ex;}
if(!isSuccess){try{result=SnapOverlayOp.overlayOp(this.geom[0],this.geom[1],opCode);}catch(ex){throw savedException;}}
return result;};jsts.operation.overlay.snap.SnapIfNeededOverlayOp=SnapIfNeededOverlayOp;})();(function(){var GeometryExtracter=jsts.geom.util.GeometryExtracter;var CascadedPolygonUnion=jsts.operation.union.CascadedPolygonUnion;var PointGeometryUnion=jsts.operation.union.PointGeometryUnion;var OverlayOp=jsts.operation.overlay.OverlayOp;var SnapIfNeededOverlayOp=jsts.operation.overlay.snap.SnapIfNeededOverlayOp;var ArrayList=javascript.util.ArrayList;jsts.operation.union.UnaryUnionOp=function(geoms,geomFact){this.polygons=new ArrayList();this.lines=new ArrayList();this.points=new ArrayList();if(geomFact){this.geomFact=geomFact;}
this.extract(geoms);};jsts.operation.union.UnaryUnionOp.union=function(geoms,geomFact){var op=new jsts.operation.union.UnaryUnionOp(geoms,geomFact);return op.union();};jsts.operation.union.UnaryUnionOp.prototype.polygons=null;jsts.operation.union.UnaryUnionOp.prototype.lines=null;jsts.operation.union.UnaryUnionOp.prototype.points=null;jsts.operation.union.UnaryUnionOp.prototype.geomFact=null;jsts.operation.union.UnaryUnionOp.prototype.extract=function(geoms){if(geoms instanceof ArrayList){for(var i=geoms.iterator();i.hasNext();){var geom=i.next();this.extract(geom);}}else{if(this.geomFact===null){this.geomFact=geoms.getFactory();}
GeometryExtracter.extract(geoms,jsts.geom.Polygon,this.polygons);GeometryExtracter.extract(geoms,jsts.geom.LineString,this.lines);GeometryExtracter.extract(geoms,jsts.geom.Point,this.points);}};jsts.operation.union.UnaryUnionOp.prototype.union=function(){if(this.geomFact===null){return null;}
var unionPoints=null;if(this.points.size()>0){var ptGeom=this.geomFact.buildGeometry(this.points);unionPoints=this.unionNoOpt(ptGeom);}
var unionLines=null;if(this.lines.size()>0){var lineGeom=this.geomFact.buildGeometry(this.lines);unionLines=this.unionNoOpt(lineGeom);}
var unionPolygons=null;if(this.polygons.size()>0){unionPolygons=CascadedPolygonUnion.union(this.polygons);}
var unionLA=this.unionWithNull(unionLines,unionPolygons);var union=null;if(unionPoints===null){union=unionLA;}else if(unionLA===null){union=unionPoints;}else{union=PointGeometryUnion(unionPoints,unionLA);}
if(union===null){return this.geomFact.createGeometryCollection(null);}
return union;};jsts.operation.union.UnaryUnionOp.prototype.unionWithNull=function(g0,g1){if(g0===null&&g1===null){return null;}
if(g1===null){return g0;}
if(g0===null){return g1;}
return g0.union(g1);};jsts.operation.union.UnaryUnionOp.prototype.unionNoOpt=function(g0){var empty=this.geomFact.createPoint(null);return SnapIfNeededOverlayOp.overlayOp(g0,empty,OverlayOp.UNION);};}());jsts.index.kdtree.KdNode=function(){this.left=null;this.right=null;this.count=1;if(arguments.length===2){this.initializeFromCoordinate.apply(this,arguments[0],arguments[1]);}else if(arguments.length===3){this.initializeFromXY.apply(this,arguments[0],arguments[1],arguments[2]);}};jsts.index.kdtree.KdNode.prototype.initializeFromXY=function(x,y,data){this.p=new jsts.geom.Coordinate(x,y);this.data=data;};jsts.index.kdtree.KdNode.prototype.initializeFromCoordinate=function(p,data){this.p=p;this.data=data;};jsts.index.kdtree.KdNode.prototype.getX=function(){return this.p.x;};jsts.index.kdtree.KdNode.prototype.getY=function(){return this.p.y;};jsts.index.kdtree.KdNode.prototype.getCoordinate=function(){return this.p;};jsts.index.kdtree.KdNode.prototype.getData=function(){return this.data;};jsts.index.kdtree.KdNode.prototype.getLeft=function(){return this.left;};jsts.index.kdtree.KdNode.prototype.getRight=function(){return this.right;};jsts.index.kdtree.KdNode.prototype.increment=function(){this.count+=1;};jsts.index.kdtree.KdNode.prototype.getCount=function(){return this.count;};jsts.index.kdtree.KdNode.prototype.isRepeated=function(){return count>1;};jsts.index.kdtree.KdNode.prototype.setLeft=function(left){this.left=left;};jsts.index.kdtree.KdNode.prototype.setRight=function(right){this.right=right;};(function(){jsts.geom.MultiLineString=function(geometries,factory){this.geometries=geometries||[];this.factory=factory;};jsts.geom.MultiLineString.prototype=new jsts.geom.GeometryCollection();jsts.geom.MultiLineString.constructor=jsts.geom.MultiLineString;jsts.geom.MultiLineString.prototype.getBoundary=function(){return(new jsts.operation.BoundaryOp(this)).getBoundary();};jsts.geom.MultiLineString.prototype.equalsExact=function(other,tolerance){if(!this.isEquivalentClass(other)){return false;}
return jsts.geom.GeometryCollection.prototype.equalsExact.call(this,other,tolerance);};jsts.geom.MultiLineString.prototype.CLASS_NAME='jsts.geom.MultiLineString';})();jsts.algorithm.BoundaryNodeRule=function(){};jsts.algorithm.BoundaryNodeRule.prototype.isInBoundary=function(boundaryCount){throw new jsts.error.AbstractMethodInvocationError();};jsts.algorithm.Mod2BoundaryNodeRule=function(){};jsts.algorithm.Mod2BoundaryNodeRule.prototype=new jsts.algorithm.BoundaryNodeRule();jsts.algorithm.Mod2BoundaryNodeRule.prototype.isInBoundary=function(boundaryCount){return boundaryCount%2===1;};jsts.algorithm.BoundaryNodeRule.MOD2_BOUNDARY_RULE=new jsts.algorithm.Mod2BoundaryNodeRule();jsts.algorithm.BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE=jsts.algorithm.BoundaryNodeRule.MOD2_BOUNDARY_RULE;jsts.operation.buffer.BufferBuilder=function(bufParams){this.bufParams=bufParams;this.edgeList=new jsts.geomgraph.EdgeList();};jsts.operation.buffer.BufferBuilder.depthDelta=function(label){var lLoc=label.getLocation(0,jsts.geomgraph.Position.LEFT);var rLoc=label.getLocation(0,jsts.geomgraph.Position.RIGHT);if(lLoc===jsts.geom.Location.INTERIOR&&rLoc===jsts.geom.Location.EXTERIOR)
return 1;else if(lLoc===jsts.geom.Location.EXTERIOR&&rLoc===jsts.geom.Location.INTERIOR)
return-1;return 0;};jsts.operation.buffer.BufferBuilder.prototype.bufParams=null;jsts.operation.buffer.BufferBuilder.prototype.workingPrecisionModel=null;jsts.operation.buffer.BufferBuilder.prototype.workingNoder=null;jsts.operation.buffer.BufferBuilder.prototype.geomFact=null;jsts.operation.buffer.BufferBuilder.prototype.graph=null;jsts.operation.buffer.BufferBuilder.prototype.edgeList=null;jsts.operation.buffer.BufferBuilder.prototype.setWorkingPrecisionModel=function(pm){this.workingPrecisionModel=pm;};jsts.operation.buffer.BufferBuilder.prototype.setNoder=function(noder){this.workingNoder=noder;};jsts.operation.buffer.BufferBuilder.prototype.buffer=function(g,distance){var precisionModel=this.workingPrecisionModel;if(precisionModel===null)
precisionModel=g.getPrecisionModel();this.geomFact=g.getFactory();var curveBuilder=new jsts.operation.buffer.OffsetCurveBuilder(precisionModel,this.bufParams);var curveSetBuilder=new jsts.operation.buffer.OffsetCurveSetBuilder(g,distance,curveBuilder);var bufferSegStrList=curveSetBuilder.getCurves();if(bufferSegStrList.size()<=0){return this.createEmptyResultGeometry();}
this.computeNodedEdges(bufferSegStrList,precisionModel);this.graph=new jsts.geomgraph.PlanarGraph(new jsts.operation.overlay.OverlayNodeFactory());this.graph.addEdges(this.edgeList.getEdges());var subgraphList=this.createSubgraphs(this.graph);var polyBuilder=new jsts.operation.overlay.PolygonBuilder(this.geomFact);this.buildSubgraphs(subgraphList,polyBuilder);var resultPolyList=polyBuilder.getPolygons();if(resultPolyList.size()<=0){return this.createEmptyResultGeometry();}
var resultGeom=this.geomFact.buildGeometry(resultPolyList);return resultGeom;};jsts.operation.buffer.BufferBuilder.prototype.getNoder=function(precisionModel){if(this.workingNoder!==null)
return this.workingNoder;var noder=new jsts.noding.MCIndexNoder();var li=new jsts.algorithm.RobustLineIntersector();li.setPrecisionModel(precisionModel);noder.setSegmentIntersector(new jsts.noding.IntersectionAdder(li));return noder;};jsts.operation.buffer.BufferBuilder.prototype.computeNodedEdges=function(bufferSegStrList,precisionModel){var noder=this.getNoder(precisionModel);noder.computeNodes(bufferSegStrList);var nodedSegStrings=noder.getNodedSubstrings();for(var i=nodedSegStrings.iterator();i.hasNext();){var segStr=i.next();var oldLabel=segStr.getData();var edge=new jsts.geomgraph.Edge(segStr.getCoordinates(),new jsts.geomgraph.Label(oldLabel));this.insertUniqueEdge(edge);}};jsts.operation.buffer.BufferBuilder.prototype.insertUniqueEdge=function(e){var existingEdge=this.edgeList.findEqualEdge(e);if(existingEdge!=null){var existingLabel=existingEdge.getLabel();var labelToMerge=e.getLabel();if(!existingEdge.isPointwiseEqual(e)){labelToMerge=new jsts.geomgraph.Label(e.getLabel());labelToMerge.flip();}
existingLabel.merge(labelToMerge);var mergeDelta=jsts.operation.buffer.BufferBuilder.depthDelta(labelToMerge);var existingDelta=existingEdge.getDepthDelta();var newDelta=existingDelta+mergeDelta;existingEdge.setDepthDelta(newDelta);}else{this.edgeList.add(e);e.setDepthDelta(jsts.operation.buffer.BufferBuilder.depthDelta(e.getLabel()));}};jsts.operation.buffer.BufferBuilder.prototype.createSubgraphs=function(graph){var subgraphList=[];for(var i=graph.getNodes().iterator();i.hasNext();){var node=i.next();if(!node.isVisited()){var subgraph=new jsts.operation.buffer.BufferSubgraph();subgraph.create(node);subgraphList.push(subgraph);}}
var compare=function(a,b){return a.compareTo(b);};subgraphList.sort(compare);subgraphList.reverse();return subgraphList;};jsts.operation.buffer.BufferBuilder.prototype.buildSubgraphs=function(subgraphList,polyBuilder){var processedGraphs=[];for(var i=0;i<subgraphList.length;i++){var subgraph=subgraphList[i];var p=subgraph.getRightmostCoordinate();var locater=new jsts.operation.buffer.SubgraphDepthLocater(processedGraphs);var outsideDepth=locater.getDepth(p);subgraph.computeDepth(outsideDepth);subgraph.findResultEdges();processedGraphs.push(subgraph);polyBuilder.add(subgraph.getDirectedEdges(),subgraph.getNodes());}};jsts.operation.buffer.BufferBuilder.convertSegStrings=function(it){var fact=new jsts.geom.GeometryFactory();var lines=new javascript.util.ArrayList();while(it.hasNext()){var ss=it.next();var line=fact.createLineString(ss.getCoordinates());lines.add(line);}
return fact.buildGeometry(lines);};jsts.operation.buffer.BufferBuilder.prototype.createEmptyResultGeometry=function(){var emptyGeom=this.geomFact.createPolygon(null,null);return emptyGeom;};jsts.operation.relate.EdgeEndBundle=function(){this.edgeEnds=[];var e=arguments[0]instanceof jsts.geomgraph.EdgeEnd?arguments[0]:arguments[1];var edge=e.getEdge();var coord=e.getCoordinate();var dirCoord=e.getDirectedCoordinate();var label=new jsts.geomgraph.Label(e.getLabel());jsts.geomgraph.EdgeEnd.call(this,edge,coord,dirCoord,label);this.insert(e);};jsts.operation.relate.EdgeEndBundle.prototype=new jsts.geomgraph.EdgeEnd();jsts.operation.relate.EdgeEndBundle.prototype.edgeEnds=null;jsts.operation.relate.EdgeEndBundle.prototype.getLabel=function(){return this.label;};jsts.operation.relate.EdgeEndBundle.prototype.getEdgeEnds=function(){return this.edgeEnds;};jsts.operation.relate.EdgeEndBundle.prototype.insert=function(e){this.edgeEnds.push(e);};jsts.operation.relate.EdgeEndBundle.prototype.computeLabel=function(boundaryNodeRule){var isArea=false;for(var i=0;i<this.edgeEnds.length;i++){var e=this.edgeEnds[i];if(e.getLabel().isArea())
isArea=true;}
if(isArea)
this.label=new jsts.geomgraph.Label(jsts.geom.Location.NONE,jsts.geom.Location.NONE,jsts.geom.Location.NONE);else
this.label=new jsts.geomgraph.Label(jsts.geom.Location.NONE);for(var i=0;i<2;i++){this.computeLabelOn(i,boundaryNodeRule);if(isArea)
this.computeLabelSides(i);}};jsts.operation.relate.EdgeEndBundle.prototype.computeLabelOn=function(geomIndex,boundaryNodeRule){var boundaryCount=0;var foundInterior=false;for(var i=0;i<this.edgeEnds.length;i++){var e=this.edgeEnds[i];var loc=e.getLabel().getLocation(geomIndex);if(loc==jsts.geom.Location.BOUNDARY)
boundaryCount++;if(loc==jsts.geom.Location.INTERIOR)
foundInterior=true;}
var loc=jsts.geom.Location.NONE;if(foundInterior)
loc=jsts.geom.Location.INTERIOR;if(boundaryCount>0){loc=jsts.geomgraph.GeometryGraph.determineBoundary(boundaryNodeRule,boundaryCount);}
this.label.setLocation(geomIndex,loc);};jsts.operation.relate.EdgeEndBundle.prototype.computeLabelSides=function(geomIndex){this.computeLabelSide(geomIndex,jsts.geomgraph.Position.LEFT);this.computeLabelSide(geomIndex,jsts.geomgraph.Position.RIGHT);};jsts.operation.relate.EdgeEndBundle.prototype.computeLabelSide=function(geomIndex,side){for(var i=0;i<this.edgeEnds.length;i++){var e=this.edgeEnds[i];if(e.getLabel().isArea()){var loc=e.getLabel().getLocation(geomIndex,side);if(loc===jsts.geom.Location.INTERIOR){this.label.setLocation(geomIndex,side,jsts.geom.Location.INTERIOR);return;}else if(loc===jsts.geom.Location.EXTERIOR)
this.label.setLocation(geomIndex,side,jsts.geom.Location.EXTERIOR);}}};jsts.operation.relate.EdgeEndBundle.prototype.updateIM=function(im){jsts.geomgraph.Edge.updateIM(this.label,im);};jsts.index.chain.MonotoneChain=function(pts,start,end,context){this.pts=pts;this.start=start;this.end=end;this.context=context;};jsts.index.chain.MonotoneChain.prototype.pts=null;jsts.index.chain.MonotoneChain.prototype.start=null;jsts.index.chain.MonotoneChain.prototype.end=null;jsts.index.chain.MonotoneChain.prototype.env=null;jsts.index.chain.MonotoneChain.prototype.context=null;jsts.index.chain.MonotoneChain.prototype.id=null;jsts.index.chain.MonotoneChain.prototype.setId=function(id){this.id=id;};jsts.index.chain.MonotoneChain.prototype.getId=function(){return this.id;};jsts.index.chain.MonotoneChain.prototype.getContext=function(){return this.context;};jsts.index.chain.MonotoneChain.prototype.getEnvelope=function(){if(this.env==null){var p0=this.pts[this.start];var p1=this.pts[this.end];this.env=new jsts.geom.Envelope(p0,p1);}
return this.env;};jsts.index.chain.MonotoneChain.prototype.getStartIndex=function(){return this.start;};jsts.index.chain.MonotoneChain.prototype.getEndIndex=function(){return this.end;};jsts.index.chain.MonotoneChain.prototype.getLineSegment=function(index,ls){ls.p0=this.pts[index];ls.p1=this.pts[index+1];};jsts.index.chain.MonotoneChain.prototype.getCoordinates=function(){var coord=[];var index=0;for(var i=this.start;i<=this.end;i++){coord[index++]=this.pts[i];}
return coord;};jsts.index.chain.MonotoneChain.prototype.select=function(searchEnv,mcs){this.computeSelect2(searchEnv,this.start,this.end,mcs);};jsts.index.chain.MonotoneChain.prototype.computeSelect2=function(searchEnv,start0,end0,mcs){var p0=this.pts[start0];var p1=this.pts[end0];mcs.tempEnv1.init(p0,p1);if(end0-start0===1){mcs.select(this,start0);return;}
if(!searchEnv.intersects(mcs.tempEnv1))
return;var mid=parseInt((start0+end0)/2);if(start0<mid){this.computeSelect2(searchEnv,start0,mid,mcs);}
if(mid<end0){this.computeSelect2(searchEnv,mid,end0,mcs);}};jsts.index.chain.MonotoneChain.prototype.computeOverlaps=function(mc,mco){if(arguments.length===6){return this.computeOverlaps2.apply(this,arguments);}
this.computeOverlaps2(this.start,this.end,mc,mc.start,mc.end,mco);};jsts.index.chain.MonotoneChain.prototype.computeOverlaps2=function(start0,end0,mc,start1,end1,mco){var p00=this.pts[start0];var p01=this.pts[end0];var p10=mc.pts[start1];var p11=mc.pts[end1];if(end0-start0===1&&end1-start1===1){mco.overlap(this,start0,mc,start1);return;}
mco.tempEnv1.init(p00,p01);mco.tempEnv2.init(p10,p11);if(!mco.tempEnv1.intersects(mco.tempEnv2))
return;var mid0=parseInt((start0+end0)/2);var mid1=parseInt((start1+end1)/2);if(start0<mid0){if(start1<mid1)
this.computeOverlaps2(start0,mid0,mc,start1,mid1,mco);if(mid1<end1)
this.computeOverlaps2(start0,mid0,mc,mid1,end1,mco);}
if(mid0<end0){if(start1<mid1)
this.computeOverlaps2(mid0,end0,mc,start1,mid1,mco);if(mid1<end1)
this.computeOverlaps2(mid0,end0,mc,mid1,end1,mco);}};(function(){var Location=jsts.geom.Location;var Dimension=jsts.geom.Dimension;jsts.geom.IntersectionMatrix=function(elements){var other=elements;if(elements===undefined||elements===null){this.matrix=[[],[],[]];this.setAll(Dimension.FALSE);}else if(typeof elements==='string'){this.set(elements);}else if(other instanceof jsts.geom.IntersectionMatrix){this.matrix[Location.INTERIOR][Location.INTERIOR]=other.matrix[Location.INTERIOR][Location.INTERIOR];this.matrix[Location.INTERIOR][Location.BOUNDARY]=other.matrix[Location.INTERIOR][Location.BOUNDARY];this.matrix[Location.INTERIOR][Location.EXTERIOR]=other.matrix[Location.INTERIOR][Location.EXTERIOR];this.matrix[Location.BOUNDARY][Location.INTERIOR]=other.matrix[Location.BOUNDARY][Location.INTERIOR];this.matrix[Location.BOUNDARY][Location.BOUNDARY]=other.matrix[Location.BOUNDARY][Location.BOUNDARY];this.matrix[Location.BOUNDARY][Location.EXTERIOR]=other.matrix[Location.BOUNDARY][Location.EXTERIOR];this.matrix[Location.EXTERIOR][Location.INTERIOR]=other.matrix[Location.EXTERIOR][Location.INTERIOR];this.matrix[Location.EXTERIOR][Location.BOUNDARY]=other.matrix[Location.EXTERIOR][Location.BOUNDARY];this.matrix[Location.EXTERIOR][Location.EXTERIOR]=other.matrix[Location.EXTERIOR][Location.EXTERIOR];}};jsts.geom.IntersectionMatrix.prototype.matrix=null;jsts.geom.IntersectionMatrix.prototype.add=function(im){var i,j;for(i=0;i<3;i++){for(j=0;j<3;j++){this.setAtLeast(i,j,im.get(i,j));}}};jsts.geom.IntersectionMatrix.matches=function(actualDimensionValue,requiredDimensionSymbol){if(typeof actualDimensionValue==='string'){return jsts.geom.IntersectionMatrix.matches2.call(this,arguments);}
if(requiredDimensionSymbol==='*'){return true;}
if(requiredDimensionSymbol==='T'&&(actualDimensionValue>=0||actualDimensionValue===Dimension.TRUE)){return true;}
if(requiredDimensionSymbol==='F'&&actualDimensionValue===Dimension.FALSE){return true;}
if(requiredDimensionSymbol==='0'&&actualDimensionValue===Dimension.P){return true;}
if(requiredDimensionSymbol==='1'&&actualDimensionValue===Dimension.L){return true;}
if(requiredDimensionSymbol==='2'&&actualDimensionValue===Dimension.A){return true;}
return false;};jsts.geom.IntersectionMatrix.matches2=function(actualDimensionSymbols,requiredDimensionSymbols){var m=new jsts.geom.IntersectionMatrix(actualDimensionSymbols);return m.matches(requiredDimensionSymbols);};jsts.geom.IntersectionMatrix.prototype.set=function(row,column,dimensionValue){if(typeof row==='string'){this.set2(row);return;}
this.matrix[row][column]=dimensionValue;};jsts.geom.IntersectionMatrix.prototype.set2=function(dimensionSymbols){for(var i=0;i<dimensionSymbols.length();i++){var row=i/3;var col=i%3;this.matrix[row][col]=Dimension.toDimensionValue(dimensionSymbols.charAt(i));}};jsts.geom.IntersectionMatrix.prototype.setAtLeast=function(row,column,minimumDimensionValue){if(arguments.length===1){this.setAtLeast2(arguments[0]);return;}
if(this.matrix[row][column]<minimumDimensionValue){this.matrix[row][column]=minimumDimensionValue;}};jsts.geom.IntersectionMatrix.prototype.setAtLeastIfValid=function(row,column,minimumDimensionValue){if(row>=0&&column>=0){this.setAtLeast(row,column,minimumDimensionValue);}};jsts.geom.IntersectionMatrix.prototype.setAtLeast2=function(minimumDimensionSymbols){var i;for(i=0;i<minimumDimensionSymbols.length;i++){var row=parseInt(i/3);var col=parseInt(i%3);this.setAtLeast(row,col,jsts.geom.Dimension.toDimensionValue(minimumDimensionSymbols.charAt(i)));}};jsts.geom.IntersectionMatrix.prototype.setAll=function(dimensionValue){var ai,bi;for(ai=0;ai<3;ai++){for(bi=0;bi<3;bi++){this.matrix[ai][bi]=dimensionValue;}}};jsts.geom.IntersectionMatrix.prototype.get=function(row,column){return this.matrix[row][column];};jsts.geom.IntersectionMatrix.prototype.isDisjoint=function(){return this.matrix[Location.INTERIOR][Location.INTERIOR]===Dimension.FALSE&&this.matrix[Location.INTERIOR][Location.BOUNDARY]===Dimension.FALSE&&this.matrix[Location.BOUNDARY][Location.INTERIOR]===Dimension.FALSE&&this.matrix[Location.BOUNDARY][Location.BOUNDARY]===Dimension.FALSE;};jsts.geom.IntersectionMatrix.prototype.isIntersects=function(){return!this.isDisjoint();};jsts.geom.IntersectionMatrix.prototype.isTouches=function(dimensionOfGeometryA,dimensionOfGeometryB){if(dimensionOfGeometryA>dimensionOfGeometryB){return this.isTouches(dimensionOfGeometryB,dimensionOfGeometryA);}
if((dimensionOfGeometryA==Dimension.A&&dimensionOfGeometryB==Dimension.A)||(dimensionOfGeometryA==Dimension.L&&dimensionOfGeometryB==Dimension.L)||(dimensionOfGeometryA==Dimension.L&&dimensionOfGeometryB==Dimension.A)||(dimensionOfGeometryA==Dimension.P&&dimensionOfGeometryB==Dimension.A)||(dimensionOfGeometryA==Dimension.P&&dimensionOfGeometryB==Dimension.L)){return this.matrix[Location.INTERIOR][Location.INTERIOR]===Dimension.FALSE&&(jsts.geom.IntersectionMatrix.matches(this.matrix[Location.INTERIOR][Location.BOUNDARY],'T')||jsts.geom.IntersectionMatrix.matches(this.matrix[Location.BOUNDARY][Location.INTERIOR],'T')||jsts.geom.IntersectionMatrix.matches(this.matrix[Location.BOUNDARY][Location.BOUNDARY],'T'));}
return false;};jsts.geom.IntersectionMatrix.prototype.isCrosses=function(dimensionOfGeometryA,dimensionOfGeometryB){if((dimensionOfGeometryA==Dimension.P&&dimensionOfGeometryB==Dimension.L)||(dimensionOfGeometryA==Dimension.P&&dimensionOfGeometryB==Dimension.A)||(dimensionOfGeometryA==Dimension.L&&dimensionOfGeometryB==Dimension.A)){return jsts.geom.IntersectionMatrix.matches(this.matrix[Location.INTERIOR][Location.INTERIOR],'T')&&jsts.geom.IntersectionMatrix.matches(this.matrix[Location.INTERIOR][Location.EXTERIOR],'T');}
if((dimensionOfGeometryA==Dimension.L&&dimensionOfGeometryB==Dimension.P)||(dimensionOfGeometryA==Dimension.A&&dimensionOfGeometryB==Dimension.P)||(dimensionOfGeometryA==Dimension.A&&dimensionOfGeometryB==Dimension.L)){return jsts.geom.IntersectionMatrix.matches(matrix[Location.INTERIOR][Location.INTERIOR],'T')&&jsts.geom.IntersectionMatrix.matches(this.matrix[Location.EXTERIOR][Location.INTERIOR],'T');}
if(dimensionOfGeometryA===Dimension.L&&dimensionOfGeometryB===Dimension.L){return this.matrix[Location.INTERIOR][Location.INTERIOR]===0;}
return false;};jsts.geom.IntersectionMatrix.prototype.isWithin=function(){return jsts.geom.IntersectionMatrix.matches(this.matrix[Location.INTERIOR][Location.INTERIOR],'T')&&this.matrix[Location.INTERIOR][Location.EXTERIOR]==Dimension.FALSE&&this.matrix[Location.BOUNDARY][Location.EXTERIOR]==Dimension.FALSE;};jsts.geom.IntersectionMatrix.prototype.isContains=function(){return jsts.geom.IntersectionMatrix.matches(this.matrix[Location.INTERIOR][Location.INTERIOR],'T')&&this.matrix[Location.EXTERIOR][Location.INTERIOR]==Dimension.FALSE&&this.matrix[Location.EXTERIOR][Location.BOUNDARY]==Dimension.FALSE;};jsts.geom.IntersectionMatrix.prototype.isCovers=function(){var hasPointInCommon=jsts.geom.IntersectionMatrix.matches(this.matrix[Location.INTERIOR][Location.INTERIOR],'T')||jsts.geom.IntersectionMatrix.matches(this.matrix[Location.INTERIOR][Location.BOUNDARY],'T')||jsts.geom.IntersectionMatrix.matches(this.matrix[Location.BOUNDARY][Location.INTERIOR],'T')||jsts.geom.IntersectionMatrix.matches(this.matrix[Location.BOUNDARY][Location.BOUNDARY],'T');return hasPointInCommon&&this.matrix[Location.EXTERIOR][Location.INTERIOR]==Dimension.FALSE&&this.matrix[Location.EXTERIOR][Location.BOUNDARY]==Dimension.FALSE;};jsts.geom.IntersectionMatrix.prototype.isCoveredBy=function(){var hasPointInCommon=jsts.geom.IntersectionMatrix.matches(this.matrix[Location.INTERIOR][Location.INTERIOR],'T')||jsts.geom.IntersectionMatrix.matches(this.matrix[Location.INTERIOR][Location.BOUNDARY],'T')||jsts.geom.IntersectionMatrix.matches(this.matrix[Location.BOUNDARY][Location.INTERIOR],'T')||jsts.geom.IntersectionMatrix.matches(this.matrix[Location.BOUNDARY][Location.BOUNDARY],'T');return hasPointInCommon&&this.matrix[Location.INTERIOR][Location.EXTERIOR]===Dimension.FALSE&&this.matrix[Location.BOUNDARY][Location.EXTERIOR]===Dimension.FALSE;};jsts.geom.IntersectionMatrix.prototype.isEquals=function(dimensionOfGeometryA,dimensionOfGeometryB){if(dimensionOfGeometryA!==dimensionOfGeometryB){return false;}
return jsts.geom.IntersectionMatrix.matches(this.matrix[Location.INTERIOR][Location.INTERIOR],'T')&&this.matrix[Location.EXTERIOR][Location.INTERIOR]===Dimension.FALSE&&this.matrix[Location.INTERIOR][Location.EXTERIOR]===Dimension.FALSE&&this.matrix[Location.EXTERIOR][Location.BOUNDARY]===Dimension.FALSE&&this.matrix[Location.BOUNDARY][Location.EXTERIOR]===Dimension.FALSE;};jsts.geom.IntersectionMatrix.prototype.isOverlaps=function(dimensionOfGeometryA,dimensionOfGeometryB){if((dimensionOfGeometryA==Dimension.P&&dimensionOfGeometryB===Dimension.P)||(dimensionOfGeometryA==Dimension.A&&dimensionOfGeometryB===Dimension.A)){return jsts.geom.IntersectionMatrix.matches(this.matrix[Location.INTERIOR][Location.INTERIOR],'T')&&jsts.geom.IntersectionMatrix.matches(this.matrix[Location.INTERIOR][Location.EXTERIOR],'T')&&jsts.geom.IntersectionMatrix.matches(this.matrix[Location.EXTERIOR][Location.INTERIOR],'T');}
if(dimensionOfGeometryA===Dimension.L&&dimensionOfGeometryB===Dimension.L){return this.matrix[Location.INTERIOR][Location.INTERIOR]==1&&jsts.geom.IntersectionMatrix.matches(this.matrix[Location.INTERIOR][Location.EXTERIOR],'T')&&jsts.geom.IntersectionMatrix.matches(this.matrix[Location.EXTERIOR][Location.INTERIOR],'T');}
return false;};jsts.geom.IntersectionMatrix.prototype.matches=function(requiredDimensionSymbols){if(requiredDimensionSymbols.length!=9){throw new jsts.error.IllegalArgumentException('Should be length 9: '+
requiredDimensionSymbols);}
for(var ai=0;ai<3;ai++){for(var bi=0;bi<3;bi++){if(!jsts.geom.IntersectionMatrix.matches(this.matrix[ai][bi],requiredDimensionSymbols.charAt(3*ai+bi))){return false;}}}
return true;};jsts.geom.IntersectionMatrix.prototype.transpose=function(){var temp=matrix[1][0];this.matrix[1][0]=this.matrix[0][1];this.matrix[0][1]=temp;temp=this.matrix[2][0];this.matrix[2][0]=this.matrix[0][2];this.matrix[0][2]=temp;temp=this.matrix[2][1];this.matrix[2][1]=this.matrix[1][2];this.matrix[1][2]=temp;return this;};jsts.geom.IntersectionMatrix.prototype.toString=function(){var ai,bi,buf='';for(ai=0;ai<3;ai++){for(bi=0;bi<3;bi++){buf+=Dimension.toDimensionSymbol(this.matrix[ai][bi]);}}
return buf;};})();jsts.triangulate.quadedge.LastFoundQuadEdgeLocator=function(subdiv){this.subdiv=subdiv;this.lastEdge=null;this.init();};jsts.triangulate.quadedge.LastFoundQuadEdgeLocator.prototype.init=function(){this.lastEdge=this.findEdge();};jsts.triangulate.quadedge.LastFoundQuadEdgeLocator.prototype.findEdge=function(){var edges=this.subdiv.getEdges();return edges[0];};jsts.triangulate.quadedge.LastFoundQuadEdgeLocator.prototype.locate=function(v){if(!this.lastEdge.isLive()){this.init();}
var e=this.subdiv.locateFromEdge(v,this.lastEdge);this.lastEdge=e;return e;};jsts.io.WKTWriter=function(){this.parser=new jsts.io.WKTParser(this.geometryFactory);};jsts.io.WKTWriter.prototype.write=function(geometry){var wkt=this.parser.write(geometry);return wkt;};jsts.io.WKTWriter.toLineString=function(p0,p1){if(arguments.length!==2){throw new jsts.error.NotImplementedError();}
return'LINESTRING ( '+p0.x+' '+p0.y+', '+p1.x+' '+p1.y+' )';};jsts.io.WKTReader=function(geometryFactory){this.geometryFactory=geometryFactory||new jsts.geom.GeometryFactory();this.precisionModel=this.geometryFactory.getPrecisionModel();this.parser=new jsts.io.WKTParser(this.geometryFactory);};jsts.io.WKTReader.prototype.read=function(wkt){var geometry=this.parser.read(wkt);if(this.precisionModel.getType()===jsts.geom.PrecisionModel.FIXED){this.reducePrecision(geometry);}
return geometry;};jsts.io.WKTReader.prototype.reducePrecision=function(geometry){var i,len;if(geometry.coordinate){this.precisionModel.makePrecise(geometry.coordinate);}else if(geometry.points){for(i=0,len=geometry.points.length;i<len;i++){this.precisionModel.makePrecise(geometry.points[i]);}}else if(geometry.geometries){for(i=0,len=geometry.geometries.length;i<len;i++){this.reducePrecision(geometry.geometries[i]);}}};jsts.triangulate.quadedge.QuadEdgeSubdivision=function(env,tolerance){this.tolerance=tolerance;this.edgeCoincidenceTolerance=tolerance/jsts.triangulate.quadedge.QuadEdgeSubdivision.EDGE_COINCIDENCE_TOL_FACTOR;this.visitedKey=0;this.quadEdges=[];this.startingEdge;this.tolerance;this.edgeCoincidenceTolerance;this.frameEnv;this.locator=null;this.seg=new jsts.geom.LineSegment();this.triEdges=new Array(3);this.frameVertex=new Array(3);this.createFrame(env);this.startingEdge=this.initSubdiv();this.locator=new jsts.triangulate.quadedge.LastFoundQuadEdgeLocator(this);};jsts.triangulate.quadedge.QuadEdgeSubdivision.EDGE_COINCIDENCE_TOL_FACTOR=1000;jsts.triangulate.quadedge.QuadEdgeSubdivision.getTriangleEdges=function(startQE,triEdge){triEdge[0]=startQE;triEdge[1]=triEdge[0].lNext();triEdge[2]=triEdge[1].lNext();if(triEdge[2].lNext()!=triEdge[0]){throw new jsts.IllegalArgumentError('Edges do not form a triangle');}};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.createFrame=function(env){var deltaX,deltaY,offset;deltaX=env.getWidth();deltaY=env.getHeight();offset=0.0;if(deltaX>deltaY){offset=deltaX*10.0;}else{offset=deltaY*10.0;}
this.frameVertex[0]=new jsts.triangulate.quadedge.Vertex((env.getMaxX()+env.getMinX())/2.0,env.getMaxY()
+offset);this.frameVertex[1]=new jsts.triangulate.quadedge.Vertex(env.getMinX()-offset,env.getMinY()-offset);this.frameVertex[2]=new jsts.triangulate.quadedge.Vertex(env.getMaxX()+offset,env.getMinY()-offset);this.frameEnv=new jsts.geom.Envelope(this.frameVertex[0].getCoordinate(),this.frameVertex[1].getCoordinate());this.frameEnv.expandToInclude(this.frameVertex[2].getCoordinate());};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.initSubdiv=function(){var ea,eb,ec;ea=this.makeEdge(this.frameVertex[0],this.frameVertex[1]);eb=this.makeEdge(this.frameVertex[1],this.frameVertex[2]);jsts.triangulate.quadedge.QuadEdge.splice(ea.sym(),eb);ec=this.makeEdge(this.frameVertex[2],this.frameVertex[0]);jsts.triangulate.quadedge.QuadEdge.splice(eb.sym(),ec);jsts.triangulate.quadedge.QuadEdge.splice(ec.sym(),ea);return ea;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.getTolerance=function(){return this.tolerance;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.getEnvelope=function(){return new jsts.geom.Envelope(this.frameEnv);};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.getEdges=function(){if(arguments.length>0){return this.getEdgesByFactory(arguments[0]);}else{return this.quadEdges;}};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.setLocator=function(locator){this.locator=locator;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.makeEdge=function(o,d){var q=jsts.triangulate.quadedge.QuadEdge.makeEdge(o,d);this.quadEdges.push(q);return q;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.connect=function(a,b){var q=jsts.triangulate.quadedge.QuadEdge.connect(a,b);this.quadEdges.push(q);return q;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.delete_jsts=function(e){jsts.triangulate.quadedge.QuadEdge.splice(e,e.oPrev());jsts.triangulate.quadedge.QuadEdge.splice(e.sym(),e.sym().oPrev());var eSym,eRot,eRotSym;e.eSym=e.sym();eRot=e.rot;eRotSym=e.rot.sym();var idx=this.quadEdges.indexOf(e);if(idx!==-1){this.quadEdges.splice(idx,1);}
idx=this.quadEdges.indexOf(eSym);if(idx!==-1){this.quadEdges.splice(idx,1);}
idx=this.quadEdges.indexOf(eRot);if(idx!==-1){this.quadEdges.splice(idx,1);}
idx=this.quadEdges.indexOf(eRotSym);if(idx!==-1){this.quadEdges.splice(idx,1);}
e.delete_jsts();eSym.delete_jsts();eRot.delete_jsts();eRotSym.delete_jsts();};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.locateFromEdge=function(v,startEdge){var iter=0,maxIter=this.quadEdges.length,e;e=startEdge;while(true){iter++;if(iter>maxIter){throw new jsts.error.LocateFailureError(e.toLineSegment());}
if((v.equals(e.orig()))||(v.equals(e.dest()))){break;}else if(v.rightOf(e)){e=e.sym();}else if(!v.rightOf(e.oNext())){e=e.oNext();}else if(!v.rightOf(e.dPrev())){e=e.dPrev();}else{break;}}
return e;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.locate=function(){if(arguments.length===1){if(arguments[0]instanceof jsts.triangulate.quadedge.Vertex){return this.locateByVertex(arguments[0]);}else{return this.locateByCoordinate(arguments[0]);}}else{return this.locateByCoordinates(arguments[0],arguments[1]);}};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.locateByVertex=function(v){return this.locator.locate(v);};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.locateByCoordinate=function(p){return this.locator.locate(new jsts.triangulate.quadedge.Vertex(p));};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.locateByCoordinates=function(p0,p1){var e,base,locEdge;var e=this.locator.locate(new jsts.triangulate.quadedge.Vertex(p0));if(e===null){return null;}
base=e;if(e.dest().getCoordinate().equals2D(p0)){base=e.sym();}
locEdge=base;do{if(locEdge.dest().getCoordinate().equals2D(p1)){return locEdge;}
locEdge=locEdge.oNext();}while(locEdge!=base);return null;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.insertSite=function(v){var e,base,startEdge;e=this.locate(v);if((v.equals(e.orig(),this.tolerance))||(v.equals(e.dest(),this.tolerance))){return e;}
base=this.makeEdge(e.orig(),v);jsts.triangulate.quadedge.QuadEdge.splice(base,e);startEdge=base;do{base=this.connect(e,base.sym());e=base.oPrev();}while(e.lNext()!=startEdge);return startEdge;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.isFrameEdge=function(e){if(this.isFrameVertex(e.orig())||this.isFrameVertex(e.dest())){return true;}
return false;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.isFrameBorderEdge=function(e){var leftTri,rightTri,vLeftTriOther,vRightTriOther;leftTri=new Array(3);this.getTriangleEdges(e,leftTri);rightTri=new Array(3);this.getTriangleEdges(e.sym(),rightTri);vLeftTriOther=e.lNext().dest();if(this.isFrameVertex(vLeftTriOther)){return true;}
vRightTriOther=e.sym().lNext().dest();if(this.isFrameVertex(vRightTriOther)){return true;}
return false;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.isFrameVertex=function(v){if(v.equals(this.frameVertex[0])){return true;}
if(v.equals(this.frameVertex[1])){return true;}
if(v.equals(this.frameVertex[2])){return true;}
return false;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.isOnEdge=function(e,p){this.seg.setCoordinates(e.orig().getCoordinate(),e.dest().getCoordinate());var dist=this.seg.distance(p);return dist<this.edgeCoincidenceTolerance;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.isVertexOfEdge=function(e,v){if((v.equals(e.orig(),this.tolerance))||(v.equals(e.dest(),this.tolerance))){return true;}
return false;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.getVertices=function(includeFrame)
{var vertices=[],i,il,qe,v,vd;i=0,il=this.quadEdges.length;for(i;i<il;i++){qe=this.quadEdges[i];v=qe.orig();if(includeFrame||!this.isFrameVertex(v)){vertices.push(v);}
vd=qe.dest();if(includeFrame||!this.isFrameVertex(vd)){vertices.push(vd);}}
return vertices;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.getVertexUniqueEdges=function(includeFrame)
{var edges,visitedVertices,i,il,qe,v,qd,vd;edges=[];visitedVertices=[];i=0,il=this.quadEdges.length;for(i;i<il;i++){qe=this.quadEdges[i];v=qe.orig();if(visitedVertices.indexOf(v)===-1){visitedVertices.push(v);if(includeFrame||!this.isFrameVertex(v)){edges.push(qe);}}
qd=qe.sym();vd=qd.orig();if(visitedVertices.indexOf(vd)===-1){visitedVertices.push(vd);if(includeFrame||!this.isFrameVertex(vd)){edges.push(qd);}}}
return edges;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.getPrimaryEdges=function(includeFrame){this.visitedKey++;var edges,edgeStack,visitedEdges,edge,priQE;edges=[];edgeStack=[];edgeStack.push(this.startingEdge);visitedEdges=[];while(edgeStack.length>0){edge=edgeStack.pop();if(visitedEdges.indexOf(edge)===-1){priQE=edge.getPrimary();if(includeFrame||!this.isFrameEdge(priQE)){edges.push(priQE);}
edgeStack.push(edge.oNext());edgeStack.push(edge.sym().oNext());visitedEdges.push(edge);visitedEdges.push(edge.sym());}}
return edges;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.visitTriangles=function(triVisitor,includeFrame){this.visitedKey++;var edgeStack,visitedEdges,edge,triEdges;edgeStack=[];edgeStack.push(this.startingEdge);visitedEdges=[];while(edgeStack.length>0){edge=edgeStack.pop();if(visitedEdges.indexOf(edge)===-1){triEdges=this.fetchTriangleToVisit(edge,edgeStack,includeFrame,visitedEdges);if(triEdges!==null)
triVisitor.visit(triEdges);}}};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.fetchTriangleToVisit=function(edge,edgeStack,includeFrame,visitedEdges){var curr,edgeCount,isFrame,sym;curr=edge;edgeCount=0;isFrame=false;do{this.triEdges[edgeCount]=curr;if(this.isFrameEdge(curr)){isFrame=true;}
sym=curr.sym();if(visitedEdges.indexOf(sym)===-1){edgeStack.push(sym);}
visitedEdges.push(curr);edgeCount++;curr=curr.lNext();}while(curr!==edge);if(isFrame&&!includeFrame){return null;}
return this.triEdges;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.getTriangleEdges=function(includeFrame){var visitor=new jsts.triangulate.quadedge.TriangleEdgesListVisitor();this.visitTriangles(visitor,includeFrame);return visitor.getTriangleEdges();};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.getTriangleVertices=function(includeFrame){var visitor=new TriangleVertexListVisitor();this.visitTriangles(visitor,includeFrame);return visitor.getTriangleVertices();};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.getTriangleCoordinates=function(includeFrame){var visitor=new jsts.triangulate.quadedge.TriangleCoordinatesVisitor();this.visitTriangles(visitor,includeFrame);return visitor.getTriangles();};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.getEdgesByFactory=function(geomFact){var quadEdges,edges,i,il,qe,coords;quadEdges=this.getPrimaryEdges(false);edges=[];i=0;il=quadEdges.length;for(i;i<il;i++){qe=quadEdges[i];coords=[];coords[0]=(qe.orig().getCoordinate());coords[1]=(qe.dest().getCoordinate());edges[i]=geomFact.createLineString(coords);}
return geomFact.createMultiLineString(edges);};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.getTriangles=function(geomFact){var triPtsList,tris,triPt,i,il;triPtsList=this.getTriangleCoordinates(false);tris=new Array(triPtsList.length);i=0,il=triPtsList.length;for(i;i<il;i++){triPt=triPtsList[i];tris[i]=geomFact.createPolygon(geomFact.createLinearRing(triPt,null));}
return geomFact.createGeometryCollection(tris);};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.getVoronoiDiagram=function(geomFact)
{var vorCells=this.getVoronoiCellPolygons(geomFact);return geomFact.createGeometryCollection(vorCells);};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.getVoronoiCellPolygons=function(geomFact)
{this.visitTriangles(new jsts.triangulate.quadedge.TriangleCircumcentreVisitor(),true);var cells,edges,i,il,qe;cells=[];edges=this.getVertexUniqueEdges(false);i=0,il=edges.length;for(i;i<il;i++){qe=edges[i];cells.push(this.getVoronoiCellPolygon(qe,geomFact));}
return cells;};jsts.triangulate.quadedge.QuadEdgeSubdivision.prototype.getVoronoiCellPolygon=function(qe,geomFact)
{var cellPts,startQe,cc,coordList,cellPoly,v;cellPts=[];startQE=qe;do{cc=qe.rot.orig().getCoordinate();cellPts.push(cc);qe=qe.oPrev();}while(qe!==startQE);coordList=new jsts.geom.CoordinateList([],false);coordList.add(cellPts,false);coordList.closeRing();if(coordList.size()<4){coordList.add(coordList.get(coordList.size()-1),true);}
cellPoly=geomFact.createPolygon(geomFact.createLinearRing(coordList.toArray()),null);v=startQE.orig();return cellPoly;};jsts.triangulate.quadedge.TriangleCircumcentreVisitor=function(){};jsts.triangulate.quadedge.TriangleCircumcentreVisitor.prototype.visit=function(triEdges){var a,b,c,cc,ccVertex,i;a=triEdges[0].orig().getCoordinate();b=triEdges[1].orig().getCoordinate();c=triEdges[2].orig().getCoordinate();cc=jsts.geom.Triangle.circumcentre(a,b,c);ccVertex=new jsts.triangulate.quadedge.Vertex(cc);i=0;for(i;i<3;i++){triEdges[i].rot.setOrig(ccVertex);}};jsts.triangulate.quadedge.TriangleEdgesListVisitor=function(){this.triList=[];};jsts.triangulate.quadedge.TriangleEdgesListVisitor.prototype.visit=function(triEdges){var clone=triEdges.concat();this.triList.push(clone);};jsts.triangulate.quadedge.TriangleEdgesListVisitor.prototype.getTriangleEdges=function(){return this.triList;};jsts.triangulate.quadedge.TriangleVertexListVisitor=function(){this.triList=[];};jsts.triangulate.quadedge.TriangleVertexListVisitor.prototype.visit=function(triEdges){var vertices=[];vertices.push(trieEdges[0].orig());vertices.push(trieEdges[1].orig());vertices.push(trieEdges[2].orig());this.triList.push(vertices);};jsts.triangulate.quadedge.TriangleVertexListVisitor.prototype.getTriangleVertices=function(){return this.triList;};jsts.triangulate.quadedge.TriangleCoordinatesVisitor=function(){this.coordList=new jsts.geom.CoordinateList([],false);this.triCoords=[];};jsts.triangulate.quadedge.TriangleCoordinatesVisitor.prototype.visit=function(triEdges){this.coordList=new jsts.geom.CoordinateList([],false);var i=0,v,pts;for(i;i<3;i++){v=triEdges[i].orig();this.coordList.add(v.getCoordinate());}
if(this.coordList.size()>0){this.coordList.closeRing();pts=this.coordList.toArray();if(pts.length!==4){return;}
this.triCoords.push(pts);}};jsts.triangulate.quadedge.TriangleCoordinatesVisitor.prototype.getTriangles=function(){return this.triCoords;};jsts.index.kdtree.KdTree=function(tolerance){var tol=0.0;if(tolerance!==undefined){tol=tolerance;}
this.root=null;this.last=null;this.numberOfNodes=0;this.tolerance=tol;};jsts.index.kdtree.KdTree.prototype.insert=function(){if(arguments.length===1){return this.insertCoordinate.apply(this,arguments[0]);}else{return this.insertWithData.apply(this,arguments[0],arguments[1]);}};jsts.index.kdtree.KdTree.prototype.insertCoordinate=function(p){return this.insertWithData(p,null);};jsts.index.kdtree.KdTree.prototype.insertWithData=function(p,data){if(this.root===null){this.root=new jsts.index.kdtree.KdNode(p,data);return this.root;}
var currentNode=this.root,leafNode=this.root,isOddLevel=true,isLessThan=true;while(currentNode!==last){if(isOddLevel){isLessThan=p.x<currentNode.getX();}else{isLessThan=p.y<currentNode.getY();}
leafNode=currentNode;if(isLessThan){currentNode=currentNode.getLeft();}else{currentNode=currentNode.getRight();}
if(currentNode!==null){var isInTolerance=p.distance(currentNode.getCoordinate())<=this.tolerance;if(isInTolerance){currentNode.increment();return currentNode;}}
isOddLevel=!isOddLevel;}
this.numberOfNodes=numberOfNodes+1;var node=new jsts.index.kdtree.KdNode(p,data);node.setLeft(this.last);node.setRight(this.last);if(isLessThan){leafNode.setLeft(node);}else{leafNode.setRight(node);}
return node;};jsts.index.kdtree.KdTree.prototype.queryNode=function(currentNode,bottomNode,queryEnv,odd,result){if(currentNode===bottomNode){return;}
var min,max,discriminant;if(odd){min=queryEnv.getMinX();max=queryEnv.getMaxX();discriminant=currentNode.getX();}else{min=queryEnv.getMinY();max=queryEnv.getMaxY();discriminant=currentNode.getY();}
var searchLeft=min<discriminant;var searchRight=discriminant<=max;if(searchLeft){this.queryNode(currentNode.getLeft(),bottomNode,queryEnv,!odd,result);}
if(queryEnv.contains(currentNode.getCoordinate())){result.add(currentNode);}
if(searchRight){this.queryNode(currentNode.getRight(),bottomNode,queryEnv,!odd,result);}};jsts.index.kdtree.KdTree.prototype.query=function(){if(arguments.length===1){return this.queryByEnvelope.apply(this,arguments[0]);}else{return this.queryWithArray.apply(this,arguments[0],arguments[1]);}};jsts.index.kdtree.KdTree.prototype.queryByEnvelope=function(queryEnv){var result=[];this.queryNode(this.root,this.last,queryEnv,true,result);return result;};jsts.index.kdtree.KdTree.prototype.queryWithArray=function(queryEnv,result){this.queryNode(this.root,this.last,queryEnv,true,result);};jsts.operation.relate.RelateOp=function(){jsts.operation.GeometryGraphOperation.apply(this,arguments);this._relate=new jsts.operation.relate.RelateComputer(this.arg);};jsts.operation.relate.RelateOp.prototype=new jsts.operation.GeometryGraphOperation();jsts.operation.relate.RelateOp.relate=function(a,b,boundaryNodeRule){var relOp=new jsts.operation.relate.RelateOp(a,b,boundaryNodeRule);var im=relOp.getIntersectionMatrix();return im;};jsts.operation.relate.RelateOp.prototype._relate=null;jsts.operation.relate.RelateOp.prototype.getIntersectionMatrix=function(){return this._relate.computeIM();};jsts.geom.Triangle=function(p0,p1,p2){this.p0=p0;this.p1=p1;this.p2=p2;};jsts.geom.Triangle.isAcute=function(a,b,c){if(!jsts.algorithm.Angle.isAcute(a,b,c)){return false;}
if(!jsts.algorithm.Angle.isAcute(b,c,a)){return false;}
if(!jsts.algorithm.Angle.isAcute(c,a,b)){return false;}
return true;};jsts.geom.Triangle.perpendicularBisector=function(a,b){var dx,dy,l1,l2;dx=b.x-a.x;dy=b.y-a.y;l1=new jsts.algorithm.HCoordinate(a.x+dx/2.0,a.y+dy/2.0,1.0);l2=new jsts.algorithm.HCoordinate(a.x-dy+dx/2.0,a.y+dx+dy/2.0,1.0);return new jsts.algorithm.HCoordinate(l1,l2);};jsts.geom.Triangle.circumcentre=function(a,b,c){var cx,cy,ax,ay,bx,by,denom,numx,numy,ccx,ccy;cx=c.x;cy=c.y;ax=a.x-cx;ay=a.y-cy;bx=b.x-cx;by=b.y-cy;denom=2*jsts.geom.Triangle.det(ax,ay,bx,by);numx=jsts.geom.Triangle.det(ay,ax*ax+ay*ay,by,bx*bx+by*by);numy=jsts.geom.Triangle.det(ax,ax*ax+ay*ay,bx,bx*bx+by*by);ccx=cx-numx/denom;ccy=cy+numy/denom;return new jsts.geom.Coordinate(ccx,ccy);};jsts.geom.Triangle.det=function(m00,m01,m10,m11){return m00*m11-m01*m10;};jsts.geom.Triangle.inCentre=function(a,b,c){var len0,len1,len2,circum,inCentreX,inCentreY;len0=b.distance(c);len1=a.distance(c);len2=a.distance(b);circum=len0+len1+len2;inCentreX=(len0*a.x+len1*b.x+len2*c.x)/circum;inCentreY=(len0*a.y+len1*b.y+len2*c.y)/circum;return new jsts.geom.Coordinate(inCentreX,inCentreY);};jsts.geom.Triangle.centroid=function(a,b,c){var x,y;x=(a.x+b.x+c.x)/3;y=(a.y+b.y+c.y)/3;return new jsts.geom.Coordinate(x,y);};jsts.geom.Triangle.longestSideLength=function(a,b,c){var lenAB,lenBC,lenCA,maxLen;lenAB=a.distance(b);lenBC=b.distance(c);lenCA=c.distance(a);maxLen=lenAB;if(lenBC>maxLen){maxLen=lenBC;}
if(lenCA>maxLen){maxLen=lenCA;}
return maxLen;};jsts.geom.Triangle.angleBisector=function(a,b,c){var len0,len2,frac,dx,dy,splitPt;len0=b.distance(a);len2=b.distance(c);frac=len0/(len0+len2);dx=c.x-a.x;dy=c.y-a.y;splitPt=new jsts.geom.Coordinate(a.x+frac*dx,a.y+frac*dy);return splitPt;};jsts.geom.Triangle.area=function(a,b,c){return Math.abs(((c.x-a.x)*(b.y-a.y)-(b.x-a.x)*(c.y-a.y))/2.0);};jsts.geom.Triangle.signedArea=function(a,b,c){return((c.x-a.x)*(b.y-a.y)-(b.x-a.x)*(c.y-a.y))/2.0;};jsts.geom.Triangle.prototype.inCentre=function(){return jsts.geom.Triangle.inCentre(this.p0,this.p1,this.p2);};jsts.algorithm.CentroidArea=function(){this.basePt=null;this.triangleCent3=new jsts.geom.Coordinate();this.centSum=new jsts.geom.Coordinate();this.cg3=new jsts.geom.Coordinate();};jsts.algorithm.CentroidArea.prototype.basePt=null;jsts.algorithm.CentroidArea.prototype.triangleCent3=null;jsts.algorithm.CentroidArea.prototype.areasum2=0;jsts.algorithm.CentroidArea.prototype.cg3=null;jsts.algorithm.CentroidArea.prototype.centSum=null;jsts.algorithm.CentroidArea.prototype.totalLength=0.0;jsts.algorithm.CentroidArea.prototype.add=function(geom){if(geom instanceof jsts.geom.Polygon){var poly=geom;this.setBasePoint(poly.getExteriorRing().getCoordinateN(0));this.add3(poly);}else if(geom instanceof jsts.geom.GeometryCollection||geom instanceof jsts.geom.MultiPolygon){var gc=geom;for(var i=0;i<gc.getNumGeometries();i++){this.add(gc.getGeometryN(i));}}else if(geom instanceof Array){this.add2(geom);}};jsts.algorithm.CentroidArea.prototype.add2=function(ring){this.setBasePoint(ring[0]);this.addShell(ring);};jsts.algorithm.CentroidArea.prototype.getCentroid=function(){var cent=new jsts.geom.Coordinate();if(Math.abs(this.areasum2)>0.0){cent.x=this.cg3.x/3/this.areasum2;cent.y=this.cg3.y/3/this.areasum2;}else{cent.x=this.centSum.x/this.totalLength;cent.y=this.centSum.y/this.totalLength;}
return cent;};jsts.algorithm.CentroidArea.prototype.setBasePoint=function(basePt){if(this.basePt==null)
this.basePt=basePt;};jsts.algorithm.CentroidArea.prototype.add3=function(poly){this.addShell(poly.getExteriorRing().getCoordinates());for(var i=0;i<poly.getNumInteriorRing();i++){this.addHole(poly.getInteriorRingN(i).getCoordinates());}};jsts.algorithm.CentroidArea.prototype.addShell=function(pts){var isPositiveArea=!jsts.algorithm.CGAlgorithms.isCCW(pts);for(var i=0;i<pts.length-1;i++){this.addTriangle(this.basePt,pts[i],pts[i+1],isPositiveArea);}
this.addLinearSegments(pts);};jsts.algorithm.CentroidArea.prototype.addHole=function(pts){var isPositiveArea=jsts.algorithm.CGAlgorithms.isCCW(pts);for(var i=0;i<pts.length-1;i++){this.addTriangle(this.basePt,pts[i],pts[i+1],isPositiveArea);}
this.addLinearSegments(pts);};jsts.algorithm.CentroidArea.prototype.addTriangle=function(p0,p1,p2,isPositiveArea){var sign=(isPositiveArea)?1.0:-1.0;jsts.algorithm.CentroidArea.centroid3(p0,p1,p2,this.triangleCent3);var area2=jsts.algorithm.CentroidArea.area2(p0,p1,p2);this.cg3.x+=sign*area2*this.triangleCent3.x;this.cg3.y+=sign*area2*this.triangleCent3.y;this.areasum2+=sign*area2;};jsts.algorithm.CentroidArea.centroid3=function(p1,p2,p3,c){c.x=p1.x+p2.x+p3.x;c.y=p1.y+p2.y+p3.y;return;};jsts.algorithm.CentroidArea.area2=function(p1,p2,p3){return(p2.x-p1.x)*(p3.y-p1.y)-(p3.x-p1.x)*(p2.y-p1.y);};jsts.algorithm.CentroidArea.prototype.addLinearSegments=function(pts){for(var i=0;i<pts.length-1;i++){var segmentLen=pts[i].distance(pts[i+1]);this.totalLength+=segmentLen;var midx=(pts[i].x+pts[i+1].x)/2;this.centSum.x+=segmentLen*midx;var midy=(pts[i].y+pts[i+1].y)/2;this.centSum.y+=segmentLen*midy;}};jsts.algorithm.CentralEndpointIntersector=function(p00,p01,p10,p11){this.pts=[p00,p01,p10,p11];this.compute();};jsts.algorithm.CentralEndpointIntersector.getIntersection=function(p00,p01,p10,p11){var intor=new jsts.algorithm.CentralEndpointIntersector(p00,p01,p10,p11);return intor.getIntersection();};jsts.algorithm.CentralEndpointIntersector.prototype.pts=null;jsts.algorithm.CentralEndpointIntersector.prototype.intPt=null;jsts.algorithm.CentralEndpointIntersector.prototype.compute=function(){var centroid=jsts.algorithm.CentralEndpointIntersector.average(this.pts);this.intPt=this.findNearestPoint(centroid,this.pts);};jsts.algorithm.CentralEndpointIntersector.prototype.getIntersection=function(){return this.intPt;};jsts.algorithm.CentralEndpointIntersector.average=function(pts){var avg=new jsts.geom.Coordinate();var i,n=pts.length;for(i=0;i<n;i++){avg.x+=pts[i].x;avg.y+=pts[i].y;}
if(n>0){avg.x/=n;avg.y/=n;}
return avg;};jsts.algorithm.CentralEndpointIntersector.prototype.findNearestPoint=function(p,pts){var minDist=Number.MAX_VALUE;var i,result=null,dist;for(i=0;i<pts.length;i++){dist=p.distance(pts[i]);if(dist<minDist){minDist=dist;result=pts[i];}}
return result;};(function(){var ArrayList=javascript.util.ArrayList;var GeometryComponentFilter=jsts.geom.GeometryComponentFilter;var LineString=jsts.geom.LineString;var EdgeRing=jsts.operation.polygonize.EdgeRing;var PolygonizeGraph=jsts.operation.polygonize.PolygonizeGraph;var Polygonizer=function(){var that=this;var LineStringAdder=function(){};LineStringAdder.prototype=new GeometryComponentFilter();LineStringAdder.prototype.filter=function(g){if(g instanceof LineString)
that.add(g);};this.lineStringAdder=new LineStringAdder();this.dangles=new ArrayList();this.cutEdges=new ArrayList();this.invalidRingLines=new ArrayList();};Polygonizer.prototype.lineStringAdder=null;Polygonizer.prototype.graph=null;Polygonizer.prototype.dangles=null;Polygonizer.prototype.cutEdges=null;Polygonizer.prototype.invalidRingLines=null;Polygonizer.prototype.holeList=null;Polygonizer.prototype.shellList=null;Polygonizer.prototype.polyList=null;Polygonizer.prototype.add=function(geomList){if(geomList instanceof jsts.geom.LineString){return this.add3(geomList);}else if(geomList instanceof jsts.geom.Geometry){return this.add2(geomList);}
for(var i=geomList.iterator();i.hasNext();){var geometry=i.next();this.add2(geometry);}};Polygonizer.prototype.add2=function(g){g.apply(this.lineStringAdder);};Polygonizer.prototype.add3=function(line){if(this.graph==null)
this.graph=new PolygonizeGraph(line.getFactory());this.graph.addEdge(line);};Polygonizer.prototype.getPolygons=function(){this.polygonize();return this.polyList;};Polygonizer.prototype.getDangles=function(){this.polygonize();return this.dangles;};Polygonizer.prototype.getCutEdges=function(){this.polygonize();return this.cutEdges;};Polygonizer.prototype.getInvalidRingLines=function(){this.polygonize();return this.invalidRingLines;};Polygonizer.prototype.polygonize=function(){if(this.polyList!=null)
return;this.polyList=new ArrayList();if(this.graph==null)
return;this.dangles=this.graph.deleteDangles();this.cutEdges=this.graph.deleteCutEdges();var edgeRingList=this.graph.getEdgeRings();var validEdgeRingList=new ArrayList();this.invalidRingLines=new ArrayList();this.findValidRings(edgeRingList,validEdgeRingList,this.invalidRingLines);this.findShellsAndHoles(validEdgeRingList);Polygonizer.assignHolesToShells(this.holeList,this.shellList);this.polyList=new ArrayList();for(var i=this.shellList.iterator();i.hasNext();){var er=i.next();this.polyList.add(er.getPolygon());}};Polygonizer.prototype.findValidRings=function(edgeRingList,validEdgeRingList,invalidRingList){for(var i=edgeRingList.iterator();i.hasNext();){var er=i.next();if(er.isValid())
validEdgeRingList.add(er);else
invalidRingList.add(er.getLineString());}};Polygonizer.prototype.findShellsAndHoles=function(edgeRingList){this.holeList=new ArrayList();this.shellList=new ArrayList();for(var i=edgeRingList.iterator();i.hasNext();){var er=i.next();if(er.isHole())
this.holeList.add(er);else
this.shellList.add(er);}};Polygonizer.assignHolesToShells=function(holeList,shellList){for(var i=holeList.iterator();i.hasNext();){var holeER=i.next();Polygonizer.assignHoleToShell(holeER,shellList);}};Polygonizer.assignHoleToShell=function(holeER,shellList){var shell=EdgeRing.findEdgeRingContaining(holeER,shellList);if(shell!=null)
shell.addHole(holeER.getRing());};jsts.operation.polygonize.Polygonizer=Polygonizer;})();jsts.operation.relate.RelateNode=function(coord,edges){jsts.geomgraph.Node.apply(this,arguments);};jsts.operation.relate.RelateNode.prototype=new jsts.geomgraph.Node();jsts.operation.relate.RelateNode.prototype.computeIM=function(im){im.setAtLeastIfValid(this.label.getLocation(0),this.label.getLocation(1),0);};jsts.operation.relate.RelateNode.prototype.updateIMFromEdges=function(im){this.edges.updateIM(im);};jsts.operation.buffer.OffsetSegmentString=function(){this.ptList=[];};jsts.operation.buffer.OffsetSegmentString.prototype.ptList=null;jsts.operation.buffer.OffsetSegmentString.prototype.precisionModel=null;jsts.operation.buffer.OffsetSegmentString.prototype.minimimVertexDistance=0.0;jsts.operation.buffer.OffsetSegmentString.prototype.setPrecisionModel=function(precisionModel){this.precisionModel=precisionModel;};jsts.operation.buffer.OffsetSegmentString.prototype.setMinimumVertexDistance=function(minimimVertexDistance){this.minimimVertexDistance=minimimVertexDistance;};jsts.operation.buffer.OffsetSegmentString.prototype.addPt=function(pt){var bufPt=new jsts.geom.Coordinate(pt);this.precisionModel.makePrecise(bufPt);if(this.isRedundant(bufPt))
return;this.ptList.push(bufPt);};jsts.operation.buffer.OffsetSegmentString.prototype.addPts=function(pt,isForward){if(isForward){for(var i=0;i<pt.length;i++){this.addPt(pt[i]);}}else{for(var i=pt.length-1;i>=0;i--){this.addPt(pt[i]);}}};jsts.operation.buffer.OffsetSegmentString.prototype.isRedundant=function(pt){if(this.ptList.length<1)
return false;var lastPt=this.ptList[this.ptList.length-1];var ptDist=pt.distance(lastPt);if(ptDist<this.minimimVertexDistance)
return true;return false;};jsts.operation.buffer.OffsetSegmentString.prototype.closeRing=function(){if(this.ptList.length<1)
return;var startPt=new jsts.geom.Coordinate(this.ptList[0]);var lastPt=this.ptList[this.ptList.length-1];var last2Pt=null;if(this.ptList.length>=2)
last2Pt=this.ptList[this.ptList.length-2];if(startPt.equals(lastPt))
return;this.ptList.push(startPt);};jsts.operation.buffer.OffsetSegmentString.prototype.reverse=function(){};jsts.operation.buffer.OffsetSegmentString.prototype.getCoordinates=function(){return this.ptList;};(function(){var ArrayList=javascript.util.ArrayList;var TreeSet=javascript.util.TreeSet;var CoordinateFilter=jsts.geom.CoordinateFilter;jsts.util.UniqueCoordinateArrayFilter=function(){this.treeSet=new TreeSet();this.list=new ArrayList();};jsts.util.UniqueCoordinateArrayFilter.prototype=new CoordinateFilter();jsts.util.UniqueCoordinateArrayFilter.prototype.treeSet=null;jsts.util.UniqueCoordinateArrayFilter.prototype.list=null;jsts.util.UniqueCoordinateArrayFilter.prototype.getCoordinates=function(){return this.list.toArray();};jsts.util.UniqueCoordinateArrayFilter.prototype.filter=function(coord){if(!this.treeSet.contains(coord)){this.list.add(coord);this.treeSet.add(coord);}};})();(function(){var CGAlgorithms=jsts.algorithm.CGAlgorithms;var UniqueCoordinateArrayFilter=jsts.util.UniqueCoordinateArrayFilter;var Assert=jsts.util.Assert;var Stack=javascript.util.Stack;var ArrayList=javascript.util.ArrayList;var Arrays=javascript.util.Arrays;var RadialComparator=function(origin){this.origin=origin;};RadialComparator.prototype.origin=null;RadialComparator.prototype.compare=function(o1,o2){var p1=o1;var p2=o2;return RadialComparator.polarCompare(this.origin,p1,p2);};RadialComparator.polarCompare=function(o,p,q){var dxp=p.x-o.x;var dyp=p.y-o.y;var dxq=q.x-o.x;var dyq=q.y-o.y;var orient=CGAlgorithms.computeOrientation(o,p,q);if(orient==CGAlgorithms.COUNTERCLOCKWISE)
return 1;if(orient==CGAlgorithms.CLOCKWISE)
return-1;var op=dxp*dxp+dyp*dyp;var oq=dxq*dxq+dyq*dyq;if(op<oq){return-1;}
if(op>oq){return 1;}
return 0;};jsts.algorithm.ConvexHull=function(){if(arguments.length===1){var geometry=arguments[0];this.inputPts=jsts.algorithm.ConvexHull.extractCoordinates(geometry);this.geomFactory=geometry.getFactory();}else{this.pts=arguments[0];this.geomFactory=arguments[1];}};jsts.algorithm.ConvexHull.prototype.geomFactory=null;jsts.algorithm.ConvexHull.prototype.inputPts=null;jsts.algorithm.ConvexHull.extractCoordinates=function(geom){var filter=new UniqueCoordinateArrayFilter();geom.apply(filter);return filter.getCoordinates();};jsts.algorithm.ConvexHull.prototype.getConvexHull=function(){if(this.inputPts.length==0){return this.geomFactory.createGeometryCollection(null);}
if(this.inputPts.length==1){return this.geomFactory.createPoint(this.inputPts[0]);}
if(this.inputPts.length==2){return this.geomFactory.createLineString(this.inputPts);}
var reducedPts=this.inputPts;if(this.inputPts.length>50){reducedPts=this.reduce(this.inputPts);}
var sortedPts=this.preSort(reducedPts);var cHS=this.grahamScan(sortedPts);var cH=cHS.toArray();return this.lineOrPolygon(cH);};jsts.algorithm.ConvexHull.prototype.reduce=function(inputPts){var polyPts=this.computeOctRing(inputPts);if(polyPts==null)
return this.inputPts;var reducedSet=new javascript.util.TreeSet();for(var i=0;i<polyPts.length;i++){reducedSet.add(polyPts[i]);}
for(var i=0;i<inputPts.length;i++){if(!CGAlgorithms.isPointInRing(inputPts[i],polyPts)){reducedSet.add(inputPts[i]);}}
var reducedPts=reducedSet.toArray();if(reducedPts.length<3)
return this.padArray3(reducedPts);return reducedPts;};jsts.algorithm.ConvexHull.prototype.padArray3=function(pts){var pad=[];for(var i=0;i<pad.length;i++){if(i<pts.length){pad[i]=pts[i];}else
pad[i]=pts[0];}
return pad;};jsts.algorithm.ConvexHull.prototype.preSort=function(pts){var t;for(var i=1;i<pts.length;i++){if((pts[i].y<pts[0].y)||((pts[i].y==pts[0].y)&&(pts[i].x<pts[0].x))){t=pts[0];pts[0]=pts[i];pts[i]=t;}}
Arrays.sort(pts,1,pts.length,new RadialComparator(pts[0]));return pts;};jsts.algorithm.ConvexHull.prototype.grahamScan=function(c){var p;var ps=new Stack();p=ps.push(c[0]);p=ps.push(c[1]);p=ps.push(c[2]);for(var i=3;i<c.length;i++){p=ps.pop();while(!ps.empty()&&CGAlgorithms.computeOrientation(ps.peek(),p,c[i])>0){p=ps.pop();}
p=ps.push(p);p=ps.push(c[i]);}
p=ps.push(c[0]);return ps;};jsts.algorithm.ConvexHull.prototype.isBetween=function(c1,c2,c3){if(CGAlgorithms.computeOrientation(c1,c2,c3)!==0){return false;}
if(c1.x!=c3.x){if(c1.x<=c2.x&&c2.x<=c3.x){return true;}
if(c3.x<=c2.x&&c2.x<=c1.x){return true;}}
if(c1.y!=c3.y){if(c1.y<=c2.y&&c2.y<=c3.y){return true;}
if(c3.y<=c2.y&&c2.y<=c1.y){return true;}}
return false;};jsts.algorithm.ConvexHull.prototype.computeOctRing=function(inputPts){var octPts=this.computeOctPts(inputPts);var coordList=new jsts.geom.CoordinateList();coordList.add(octPts,false);if(coordList.size()<3){return null;}
coordList.closeRing();return coordList.toCoordinateArray();};jsts.algorithm.ConvexHull.prototype.computeOctPts=function(inputPts){var pts=[];for(var j=0;j<8;j++){pts[j]=inputPts[0];}
for(var i=1;i<inputPts.length;i++){if(inputPts[i].x<pts[0].x){pts[0]=inputPts[i];}
if(inputPts[i].x-inputPts[i].y<pts[1].x-pts[1].y){pts[1]=inputPts[i];}
if(inputPts[i].y>pts[2].y){pts[2]=inputPts[i];}
if(inputPts[i].x+inputPts[i].y>pts[3].x+pts[3].y){pts[3]=inputPts[i];}
if(inputPts[i].x>pts[4].x){pts[4]=inputPts[i];}
if(inputPts[i].x-inputPts[i].y>pts[5].x-pts[5].y){pts[5]=inputPts[i];}
if(inputPts[i].y<pts[6].y){pts[6]=inputPts[i];}
if(inputPts[i].x+inputPts[i].y<pts[7].x+pts[7].y){pts[7]=inputPts[i];}}
return pts;};jsts.algorithm.ConvexHull.prototype.lineOrPolygon=function(coordinates){coordinates=this.cleanRing(coordinates);if(coordinates.length==3){return this.geomFactory.createLineString([coordinates[0],coordinates[1]]);}
var linearRing=this.geomFactory.createLinearRing(coordinates);return this.geomFactory.createPolygon(linearRing,null);};jsts.algorithm.ConvexHull.prototype.cleanRing=function(original){Assert.equals(original[0],original[original.length-1]);var cleanedRing=new ArrayList();var previousDistinctCoordinate=null;for(var i=0;i<=original.length-2;i++){var currentCoordinate=original[i];var nextCoordinate=original[i+1];if(currentCoordinate.equals(nextCoordinate)){continue;}
if(previousDistinctCoordinate!=null&&this.isBetween(previousDistinctCoordinate,currentCoordinate,nextCoordinate)){continue;}
cleanedRing.add(currentCoordinate);previousDistinctCoordinate=currentCoordinate;}
cleanedRing.add(original[original.length-1]);var cleanedRingCoordinates=[];return cleanedRing.toArray(cleanedRingCoordinates);};})();(function(){var ArrayList=javascript.util.ArrayList;jsts.geomgraph.index.SegmentIntersector=function(li,includeProper,recordIsolated){this.li=li;this.includeProper=includeProper;this.recordIsolated=recordIsolated;};jsts.geomgraph.index.SegmentIntersector.isAdjacentSegments=function(i1,i2){return Math.abs(i1-i2)===1;};jsts.geomgraph.index.SegmentIntersector.prototype._hasIntersection=false;jsts.geomgraph.index.SegmentIntersector.prototype.hasProper=false;jsts.geomgraph.index.SegmentIntersector.prototype.hasProperInterior=false;jsts.geomgraph.index.SegmentIntersector.prototype.properIntersectionPoint=null;jsts.geomgraph.index.SegmentIntersector.prototype.li=null;jsts.geomgraph.index.SegmentIntersector.prototype.includeProper=null;jsts.geomgraph.index.SegmentIntersector.prototype.recordIsolated=null;jsts.geomgraph.index.SegmentIntersector.prototype.isSelfIntersection=null;jsts.geomgraph.index.SegmentIntersector.prototype.numIntersections=0;jsts.geomgraph.index.SegmentIntersector.prototype.numTests=0;jsts.geomgraph.index.SegmentIntersector.prototype.bdyNodes=null;jsts.geomgraph.index.SegmentIntersector.prototype.setBoundaryNodes=function(bdyNodes0,bdyNodes1){this.bdyNodes=[];this.bdyNodes[0]=bdyNodes0;this.bdyNodes[1]=bdyNodes1;};jsts.geomgraph.index.SegmentIntersector.prototype.getProperIntersectionPoint=function(){return this.properIntersectionPoint;};jsts.geomgraph.index.SegmentIntersector.prototype.hasIntersection=function(){return this._hasIntersection;};jsts.geomgraph.index.SegmentIntersector.prototype.hasProperIntersection=function(){return this.hasProper;};jsts.geomgraph.index.SegmentIntersector.prototype.hasProperInteriorIntersection=function(){return this.hasProperInterior;};jsts.geomgraph.index.SegmentIntersector.prototype.isTrivialIntersection=function(e0,segIndex0,e1,segIndex1){if(e0===e1){if(this.li.getIntersectionNum()===1){if(jsts.geomgraph.index.SegmentIntersector.isAdjacentSegments(segIndex0,segIndex1))
return true;if(e0.isClosed()){var maxSegIndex=e0.getNumPoints()-1;if((segIndex0===0&&segIndex1===maxSegIndex)||(segIndex1===0&&segIndex0===maxSegIndex)){return true;}}}}
return false;};jsts.geomgraph.index.SegmentIntersector.prototype.addIntersections=function(e0,segIndex0,e1,segIndex1){if(e0===e1&&segIndex0===segIndex1)
return;this.numTests++;var p00=e0.getCoordinates()[segIndex0];var p01=e0.getCoordinates()[segIndex0+1];var p10=e1.getCoordinates()[segIndex1];var p11=e1.getCoordinates()[segIndex1+1];this.li.computeIntersection(p00,p01,p10,p11);if(this.li.hasIntersection()){if(this.recordIsolated){e0.setIsolated(false);e1.setIsolated(false);}
this.numIntersections++;if(!this.isTrivialIntersection(e0,segIndex0,e1,segIndex1)){this._hasIntersection=true;if(this.includeProper||!this.li.isProper()){e0.addIntersections(this.li,segIndex0,0);e1.addIntersections(this.li,segIndex1,1);}
if(this.li.isProper()){this.properIntersectionPoint=this.li.getIntersection(0).clone();this.hasProper=true;if(!this.isBoundaryPoint(this.li,this.bdyNodes))
this.hasProperInterior=true;}}}};jsts.geomgraph.index.SegmentIntersector.prototype.isBoundaryPoint=function(li,bdyNodes){if(bdyNodes===null)
return false;if(bdyNodes instanceof Array){if(this.isBoundaryPoint(li,bdyNodes[0]))
return true;if(this.isBoundaryPoint(li,bdyNodes[1]))
return true;return false;}else{for(var i=bdyNodes.iterator();i.hasNext();){var node=i.next();var pt=node.getCoordinate();if(li.isIntersection(pt))
return true;}
return false;}};})();(function(){var Location=jsts.geom.Location;var Position=jsts.geomgraph.Position;var Assert=jsts.util.Assert;jsts.geomgraph.GeometryGraph=function(argIndex,parentGeom,boundaryNodeRule){jsts.geomgraph.PlanarGraph.call(this);this.lineEdgeMap=new javascript.util.HashMap();this.ptLocator=new jsts.algorithm.PointLocator();this.argIndex=argIndex;this.parentGeom=parentGeom;this.boundaryNodeRule=boundaryNodeRule||jsts.algorithm.BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE;if(parentGeom!==null){this.add(parentGeom);}};jsts.geomgraph.GeometryGraph.prototype=new jsts.geomgraph.PlanarGraph();jsts.geomgraph.GeometryGraph.constructor=jsts.geomgraph.GeometryGraph;jsts.geomgraph.GeometryGraph.prototype.createEdgeSetIntersector=function(){return new jsts.geomgraph.index.SimpleEdgeSetIntersector();};jsts.geomgraph.GeometryGraph.determineBoundary=function(boundaryNodeRule,boundaryCount){return boundaryNodeRule.isInBoundary(boundaryCount)?Location.BOUNDARY:Location.INTERIOR;};jsts.geomgraph.GeometryGraph.prototype.parentGeom=null;jsts.geomgraph.GeometryGraph.prototype.lineEdgeMap=null;jsts.geomgraph.GeometryGraph.prototype.boundaryNodeRule=null;jsts.geomgraph.GeometryGraph.prototype.useBoundaryDeterminationRule=true;jsts.geomgraph.GeometryGraph.prototype.argIndex=null;jsts.geomgraph.GeometryGraph.prototype.boundaryNodes=null;jsts.geomgraph.GeometryGraph.prototype.hasTooFewPoints=false;jsts.geomgraph.GeometryGraph.prototype.invalidPoint=null;jsts.geomgraph.GeometryGraph.prototype.areaPtLocator=null;jsts.geomgraph.GeometryGraph.prototype.ptLocator=null;jsts.geomgraph.GeometryGraph.prototype.getGeometry=function(){return this.parentGeom;};jsts.geomgraph.GeometryGraph.prototype.getBoundaryNodes=function(){if(this.boundaryNodes===null)
this.boundaryNodes=this.nodes.getBoundaryNodes(this.argIndex);return this.boundaryNodes;};jsts.geomgraph.GeometryGraph.prototype.getBoundaryNodeRule=function(){return this.boundaryNodeRule;};jsts.geomgraph.GeometryGraph.prototype.findEdge=function(line){return this.lineEdgeMap.get(line);};jsts.geomgraph.GeometryGraph.prototype.computeSplitEdges=function(edgelist){for(var i=this.edges.iterator();i.hasNext();){var e=i.next();e.eiList.addSplitEdges(edgelist);}}
jsts.geomgraph.GeometryGraph.prototype.add=function(g){if(g.isEmpty()){return;}
if(g instanceof jsts.geom.MultiPolygon)
this.useBoundaryDeterminationRule=false;if(g instanceof jsts.geom.Polygon)
this.addPolygon(g);else if(g instanceof jsts.geom.LineString)
this.addLineString(g);else if(g instanceof jsts.geom.Point)
this.addPoint(g);else if(g instanceof jsts.geom.MultiPoint)
this.addCollection(g);else if(g instanceof jsts.geom.MultiLineString)
this.addCollection(g);else if(g instanceof jsts.geom.MultiPolygon)
this.addCollection(g);else if(g instanceof jsts.geom.GeometryCollection)
this.addCollection(g);else
throw new jsts.error.IllegalArgumentError('Geometry type not supported.');};jsts.geomgraph.GeometryGraph.prototype.addCollection=function(gc){for(var i=0;i<gc.getNumGeometries();i++){var g=gc.getGeometryN(i);this.add(g);}};jsts.geomgraph.GeometryGraph.prototype.addEdge=function(e){this.insertEdge(e);var coord=e.getCoordinates();this.insertPoint(this.argIndex,coord[0],Location.BOUNDARY);this.insertPoint(this.argIndex,coord[coord.length-1],Location.BOUNDARY);};jsts.geomgraph.GeometryGraph.prototype.addPoint=function(p){var coord=p.getCoordinate();this.insertPoint(this.argIndex,coord,Location.INTERIOR);};jsts.geomgraph.GeometryGraph.prototype.addLineString=function(line){var coord=jsts.geom.CoordinateArrays.removeRepeatedPoints(line.getCoordinates());if(coord.length<2){this.hasTooFewPoints=true;this.invalidPoint=coords[0];return;}
var e=new jsts.geomgraph.Edge(coord,new jsts.geomgraph.Label(this.argIndex,Location.INTERIOR));this.lineEdgeMap.put(line,e);this.insertEdge(e);Assert.isTrue(coord.length>=2,'found LineString with single point');this.insertBoundaryPoint(this.argIndex,coord[0]);this.insertBoundaryPoint(this.argIndex,coord[coord.length-1]);};jsts.geomgraph.GeometryGraph.prototype.addPolygonRing=function(lr,cwLeft,cwRight){if(lr.isEmpty())
return;var coord=jsts.geom.CoordinateArrays.removeRepeatedPoints(lr.getCoordinates());if(coord.length<4){this.hasTooFewPoints=true;this.invalidPoint=coord[0];return;}
var left=cwLeft;var right=cwRight;if(jsts.algorithm.CGAlgorithms.isCCW(coord)){left=cwRight;right=cwLeft;}
var e=new jsts.geomgraph.Edge(coord,new jsts.geomgraph.Label(this.argIndex,Location.BOUNDARY,left,right));this.lineEdgeMap.put(lr,e);this.insertEdge(e);this.insertPoint(this.argIndex,coord[0],Location.BOUNDARY);};jsts.geomgraph.GeometryGraph.prototype.addPolygon=function(p){this.addPolygonRing(p.getExteriorRing(),Location.EXTERIOR,Location.INTERIOR);for(var i=0;i<p.getNumInteriorRing();i++){var hole=p.getInteriorRingN(i);this.addPolygonRing(hole,Location.INTERIOR,Location.EXTERIOR);}};jsts.geomgraph.GeometryGraph.prototype.computeEdgeIntersections=function(g,li,includeProper){var si=new jsts.geomgraph.index.SegmentIntersector(li,includeProper,true);si.setBoundaryNodes(this.getBoundaryNodes(),g.getBoundaryNodes());var esi=this.createEdgeSetIntersector();esi.computeIntersections(this.edges,g.edges,si);return si;};jsts.geomgraph.GeometryGraph.prototype.computeSelfNodes=function(li,computeRingSelfNodes){var si=new jsts.geomgraph.index.SegmentIntersector(li,true,false);var esi=this.createEdgeSetIntersector();if(!computeRingSelfNodes&&(this.parentGeom instanceof jsts.geom.LinearRing||this.parentGeom instanceof jsts.geom.Polygon||this.parentGeom instanceof jsts.geom.MultiPolygon)){esi.computeIntersections(this.edges,si,false);}else{esi.computeIntersections(this.edges,si,true);}
this.addSelfIntersectionNodes(this.argIndex);return si;};jsts.geomgraph.GeometryGraph.prototype.insertPoint=function(argIndex,coord,onLocation){var n=this.nodes.addNode(coord);var lbl=n.getLabel();if(lbl==null){n.label=new jsts.geomgraph.Label(argIndex,onLocation);}else
lbl.setLocation(argIndex,onLocation);};jsts.geomgraph.GeometryGraph.prototype.insertBoundaryPoint=function(argIndex,coord){var n=this.nodes.addNode(coord);var lbl=n.getLabel();var boundaryCount=1;var loc=Location.NONE;if(lbl!==null)
loc=lbl.getLocation(argIndex,Position.ON);if(loc===Location.BOUNDARY)
boundaryCount++;var newLoc=jsts.geomgraph.GeometryGraph.determineBoundary(this.boundaryNodeRule,boundaryCount);lbl.setLocation(argIndex,newLoc);};jsts.geomgraph.GeometryGraph.prototype.addSelfIntersectionNodes=function(argIndex){for(var i=this.edges.iterator();i.hasNext();){var e=i.next();var eLoc=e.getLabel().getLocation(argIndex);for(var eiIt=e.eiList.iterator();eiIt.hasNext();){var ei=eiIt.next();this.addSelfIntersectionNode(argIndex,ei.coord,eLoc);}}};jsts.geomgraph.GeometryGraph.prototype.addSelfIntersectionNode=function(argIndex,coord,loc){if(this.isBoundaryNode(argIndex,coord))
return;if(loc===Location.BOUNDARY&&this.useBoundaryDeterminationRule)
this.insertBoundaryPoint(argIndex,coord);else
this.insertPoint(argIndex,coord,loc);};jsts.geomgraph.GeometryGraph.prototype.getInvalidPoint=function(){return this.invalidPoint;};})();
},{}],51:[function(require,module,exports){
module.exports = require('./src');

},{"./src":70}],52:[function(require,module,exports){
/**
 * @requires List.js
 */

var Collection = require('./Collection');
var List = require('./List');
var IndexOutOfBoundsException = require('./IndexOutOfBoundsException');
var NoSuchElementException = require('./NoSuchElementException');
var OperationNotSupported = require('./OperationNotSupported');

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/ArrayList.html
 *
 * @implements {javascript.util.List}
 * @constructor
 */
function ArrayList() {
  this.array = [];

  if (arguments[0] instanceof Collection) {
    this.addAll(arguments[0]);
  }
};

ArrayList.prototype = new List;

/**
 * @type {Array}
 * @private
 */
ArrayList.prototype.array = null;

/**
 * @override
 */
ArrayList.prototype.add = function(e) {
  this.array.push(e);
  return true;
};

/**
 * @override
 */
ArrayList.prototype.addAll = function(c) {
  for ( var i = c.iterator(); i.hasNext();) {
    this.add(i.next());
  }
  return true;
};

/**
 * @override
 */
ArrayList.prototype.iterator = function() {
  return new ArrayList.Iterator(this);
};

/**
 * @override
 */
ArrayList.prototype.get = function(index) {
  if (index < 0 || index >= this.size()) {
    throw new IndexOutOfBoundsException();
  }

  return this.array[index];
};

/**
 * @override
 */
ArrayList.prototype.isEmpty = function() {
  return this.array.length === 0;
};

/**
 * @override
 */
ArrayList.prototype.size = function() {
  return this.array.length;
};

/**
 * @override
 */
ArrayList.prototype.toArray = function() {
  var array = [];

  for ( var i = 0, len = this.array.length; i < len; i++) {
    array.push(this.array[i]);
  }

  return array;
};

/**
 * @override
 */
ArrayList.prototype.remove = function(o) {
  var found = false;

  for ( var i = 0, len = this.array.length; i < len; i++) {
    if (this.array[i] === o) {
      this.array.splice(i, 1);
      found = true;
      break;
    }
  }

  return found;
};

/**
 * @implements {javascript.util.Iterator}
 * @param {javascript.util.ArrayList}
 *          arrayList
 * @constructor
 * @private
 */
ArrayList.Iterator = function(arrayList) {
  this.arrayList = arrayList;
};

/**
 * @type {javascript.util.ArrayList}
 * @private
 */
ArrayList.Iterator.prototype.arrayList = null;

/**
 * @type {number}
 * @private
 */
ArrayList.Iterator.prototype.position = 0;

/**
 * @override
 */
ArrayList.Iterator.prototype.next = function() {
  if (this.position === this.arrayList.size()) {
    throw new NoSuchElementException();
  }
  return this.arrayList.get(this.position++);
};

/**
 * @override
 */
ArrayList.Iterator.prototype.hasNext = function() {
  if (this.position < this.arrayList.size()) {
    return true;
  }
  return false;
};

/**
 * @override
 */
ArrayList.Iterator.prototype.remove = function() {
  throw new OperationNotSupported();
};

module.exports = ArrayList;

},{"./Collection":54,"./IndexOutOfBoundsException":58,"./List":60,"./NoSuchElementException":62,"./OperationNotSupported":63}],53:[function(require,module,exports){
/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Arrays.html
 *
 * @constructor
 */
function Arrays() {};

/**
 */
Arrays.sort = function() {
  var a = arguments[0], i, t, comparator, compare;
  if (arguments.length === 1) {
    a.sort();
    return;
  } else if (arguments.length === 2) {
    comparator = arguments[1];
    compare = function(a, b) {
      return comparator['compare'](a, b);
    };
    a.sort(compare);
  } else if (arguments.length === 3) {
    t = a.slice(arguments[1], arguments[2]);
    t.sort();
    var r = a.slice(0, arguments[1]).concat(t, a.slice(arguments[2], a.length));
    a.splice(0, a.length);
    for (i = 0; i < r.length; i++) {
      a.push(r[i]);
    }
    return;
  } else if (arguments.length === 4) {
    t = a.slice(arguments[1], arguments[2]);
    comparator = arguments[3];
    compare = function(a, b) {
      return comparator['compare'](a, b);
    };
    t.sort(compare);
    r = a.slice(0, arguments[1]).concat(t, a.slice(arguments[2], a.length));
    a.splice(0, a.length);
    for (i = 0; i < r.length; i++) {
      a.push(r[i]);
    }
    return;
  }
};

/**
 */
Arrays.asList = function(array) {
  var arrayList = new javascript.util.ArrayList();
  for ( var i = 0, len = array.length; i < len; i++) {
    arrayList.add(array[i]);
  }
  return arrayList;
};

module.exports = Arrays;

},{}],54:[function(require,module,exports){
/**
 * @requires Iterator.js
 */

var Iterator = require('./Iterator');

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Collection.html
 *
 * @interface
 */
function Collection() {};

/**
 * Ensures that this collection contains the specified element (optional
 * operation).
 *
 * @param {Object}
 *          o
 * @return {boolean}
 */
Collection.prototype.add = function(o) {};

/**
 * Appends all of the elements in the specified collection to the end of this
 * list, in the order that they are returned by the specified collection's
 * iterator (optional operation).
 *
 * @param {javascript.util.Collection}
 *          c
 * @return {boolean}
 */
Collection.prototype.addAll = function(c) {};

/**
 * Returns true if this collection contains no elements.
 *
 * @return {boolean}
 */
Collection.prototype.isEmpty = function() {};

/**
 * Returns an iterator over the elements in this collection.
 *
 * @return {javascript.util.Iterator}
 */
Collection.prototype.iterator = function() {};

/**
 * Returns an iterator over the elements in this collection.
 *
 * @return {number}
 */
Collection.prototype.size = function() {};

/**
 * Returns an array containing all of the elements in this collection.
 *
 * @return {Array}
 */
Collection.prototype.toArray = function() {};

/**
 * Removes a single instance of the specified element from this collection if it
 * is present. (optional)
 *
 * @param {Object}
 *          o
 * @return {boolean}
 */
Collection.prototype.remove = function(o) {};

module.exports = Collection;

},{"./Iterator":59}],55:[function(require,module,exports){
/**
 * @param {string=}
 *          message Optional message.
 * @extends {Error}
 * @constructor
 */
function EmptyStackException(message) {
  this.message = message || '';
};
EmptyStackException.prototype = new Error();

/**
 * @type {string}
 */
EmptyStackException.prototype.name = 'EmptyStackException';

module.exports = EmptyStackException;

},{}],56:[function(require,module,exports){
/**
 * @requires Map.js
 * @requires ArrayList.js
 */

var Map = require('./Map');
var ArrayList = require('./ArrayList');

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/HashMap.html
 *
 * @implements {javascript.util.Map}
 * @constructor
 *
 */
function HashMap() {
  this.object = {};
};
HashMap.prototype = new Map;

/**
 * @type {Object}
 * @private
 */
HashMap.prototype.object = null;

/**
 * @override
 */
HashMap.prototype.get = function(key) {
  return this.object[key] || null;
};

/**
 * @override
 */
HashMap.prototype.put = function(key, value) {
  this.object[key] = value;
  return value;
};

/**
 * @override
 */
HashMap.prototype.values = function() {
  var arrayList = new javascript.util.ArrayList();
  for ( var key in this.object) {
    if (this.object.hasOwnProperty(key)) {
      arrayList.add(this.object[key]);
    }
  }
  return arrayList;
};

/**
 * @override
 */
HashMap.prototype.size = function() {
  return this.values().size();
};

module.exports = HashMap;

},{"./ArrayList":52,"./Map":61}],57:[function(require,module,exports){
/**
 * @requires Set.js
 */
var Collection = require('./Collection');
var Set = require('./Set');
var OperationNotSupported = require('./OperationNotSupported');
var NoSuchElementException = require('./NoSuchElementException');


/**
 * @see http://docs.oracle.com/javase/6/docs/api/java/util/HashSet.html
 *
 * @extends {javascript.util.Set}
 * @interface
 */
function HashSet() {
  this.array = [];

  if (arguments[0] instanceof Collection) {
    this.addAll(arguments[0]);
  }
};
HashSet.prototype = new Set;

/**
 * @type {Array}
 * @private
 */
HashSet.prototype.array = null;

/**
 * @override
 */
HashSet.prototype.contains = function(o) {
  for ( var i = 0, len = this.array.length; i < len; i++) {
    var e = this.array[i];
    if (e === o) {
      return true;
    }
  }
  return false;
};

/**
 * @override
 */
HashSet.prototype.add = function(o) {
  if (this.contains(o)) {
    return false;
  }

  this.array.push(o);

  return true;
};

/**
 * @override
 */
HashSet.prototype.addAll = function(c) {
  for ( var i = c.iterator(); i.hasNext();) {
    this.add(i.next());
  }
  return true;
};

/**
 * @override
 * @returns {boolean}
 */
HashSet.prototype.remove = function(o) {
  throw new OperationNotSupported();
};

/**
 * @override
 */
HashSet.prototype.size = function() {
  return this.array.length;
};

/**
 * @override
 */
HashSet.prototype.isEmpty = function() {
  return this.array.length === 0;
};

/**
 * @override
 */
HashSet.prototype.toArray = function() {
  var array = [];

  for ( var i = 0, len = this.array.length; i < len; i++) {
    array.push(this.array[i]);
  }

  return array;
};

/**
 * @override
 */
HashSet.prototype.iterator = function() {
  return new HashSet.Iterator(this);
};

/**
 * @implements {javascript.util.Iterator}
 * @param {javascript.util.HashSet}
 *          HashSet
 * @constructor
 * @private
 */
HashSet.Iterator = function(hashSet) {
  this.hashSet = hashSet;
};

/**
 * @type {javascript.util.HashSet}
 * @private
 */
HashSet.Iterator.prototype.hashSet = null;

/**
 * @type {number}
 * @private
 */
HashSet.Iterator.prototype.position = 0;

/**
 * @override
 */
HashSet.Iterator.prototype.next = function() {
  if (this.position === this.hashSet.size()) {
    throw new NoSuchElementException();
  }
  return this.hashSet.array[this.position++];
};

/**
 * @override
 */
HashSet.Iterator.prototype.hasNext = function() {
  if (this.position < this.hashSet.size()) {
    return true;
  }
  return false;
};

/**
 * @override
 */
HashSet.Iterator.prototype.remove = function() {
  throw new javascript.util.OperationNotSupported();
};

module.exports = HashSet;

},{"./Collection":54,"./NoSuchElementException":62,"./OperationNotSupported":63,"./Set":64}],58:[function(require,module,exports){
/**
 * @param {string=}
 *          message Optional message.
 * @extends {Error}
 * @constructor
 */
function IndexOutOfBoundsException(message) {
      this.message = message || '';
};
IndexOutOfBoundsException.prototype = new Error();

/**
 * @type {string}
 */
IndexOutOfBoundsException.prototype.name = 'IndexOutOfBoundsException';

module.exports = IndexOutOfBoundsException;

},{}],59:[function(require,module,exports){
/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Iterator.html
 * @interface
 */
function Iterator() {};

/**
 * Returns true if the iteration has more elements.
 *
 * @return {boolean}
 */
Iterator.prototype.hasNext = function() {};

/**
 * Returns the next element in the iteration.
 *
 * @return {Object}
 */
Iterator.prototype.next = function() {};

/**
 * Removes from the underlying collection the last element returned by the
 * iterator (optional operation).
 */
Iterator.prototype.remove = function() {};

module.exports = Iterator;

},{}],60:[function(require,module,exports){
/**
 * @requires Collection.js
 */

var Collection = require('./Collection');

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/List.html
 *
 * @extends {javascript.util.Collection}
 * @interface
 */
function List() {};
List.prototype = new Collection;

/**
 * Returns the element at the specified position in this list.
 *
 * @param {number}
 *          index
 * @return {Object}
 */
List.prototype.get = function(index) {};

/**
 * Returns true if this collection contains no elements.
 *
 * @return {boolean} true if this collection contains no elements
 */
List.prototype.isEmpty = function() {};

module.exports = List;

},{"./Collection":54}],61:[function(require,module,exports){
/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Map.html
 *
 * @interface
 */
function Map() {};

/**
 * Returns the value to which the specified key is mapped, or null if this map
 * contains no mapping for the key.
 *
 * @param {Object}
 *          key
 * @return {?Object}
 */
Map.prototype.get = function(key) {};

/**
 * Associates the specified value with the specified key in this map (optional
 * operation).
 *
 * @param {Object}
 *          key
 * @param {Object}
 *          value
 * @return {Object}
 */
Map.prototype.put = function(key, value) {};

/**
 * Returns the number of key-value mappings in this map.
 *
 * @return {number}
 */
Map.prototype.size = function() {};

/**
 * Returns a Collection view of the values contained in this map.
 *
 * @return {javascript.util.Collection}
 */
Map.prototype.values = function() {};

module.exports = Map;

},{}],62:[function(require,module,exports){
/**
 * @param {string=}
 *          message Optional message.
 * @extends {Error}
 * @constructor
 */
function NoSuchElementException(message) {
  this.message = message || '';
};
NoSuchElementException.prototype = new Error();

/**
 * @type {string}
 */
NoSuchElementException.prototype.name = 'NoSuchElementException';

module.exports = NoSuchElementException;

},{}],63:[function(require,module,exports){
/**
 * @param {string=}
 *          message Optional message.
 * @extends {Error}
 * @constructor
 */
function OperationNotSupported(message) {
  this.message = message || '';
};
OperationNotSupported.prototype = new Error();

/**
 * @type {string}
 */
OperationNotSupported.prototype.name = 'OperationNotSupported';

module.exports = OperationNotSupported;

},{}],64:[function(require,module,exports){
/**
 * @requires Collection.js
 */
var Collection = require('./Collection');

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Set.html
 *
 * @extends {javascript.util.Collection}
 * @interface
 */
function Set() {};
Set.prototype = new Collection;

/**
 * Returns true if this set contains the specified element. More formally,
 * returns true if and only if this set contains an element e such that (o==null ?
 * e==null : o.equals(e)).
 *
 * @param {Object}
 *          o
 * @return {boolean}
 */
Set.prototype.contains = function(o) {};

module.exports = Set;

},{"./Collection":54}],65:[function(require,module,exports){
/**
 * @requires Map.js
 */
var Map = require('./Map');

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/SortedMap.html
 *
 * @extends {javascript.util.Map}
 * @interface
 */
function SortedMap() {};
SortedMap.prototype = new Map;

module.exports = SortedMap;

},{"./Map":61}],66:[function(require,module,exports){
/**
 * @requires Set.js
 */
var Set = require('./Set');

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/SortedSet.html
 *
 * @extends {javascript.util.Set}
 * @interface
 */
function SortedSet() {};
SortedSet.prototype = new Set;

module.exports = SortedSet;

},{"./Set":64}],67:[function(require,module,exports){
/**
 * @requires List.js
 */
var List = require('./List');
var EmptyStackException = require('./EmptyStackException');

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Stack.html
 *
 * @implements {javascript.util.List}
 * @constructor
 *
 */
function Stack() {
  this.array = [];
};

Stack.prototype = new List;

/**
 * @type {Array}
 * @private
 */
Stack.prototype.array = null;

/**
 * Pushes an item onto the top of this stack.
 *
 */
Stack.prototype.push = function(e) {
  this.array.push(e);
  return e;
};

/**
 * Pushes an item onto the top of this stack.
 *
 */
Stack.prototype.pop = function(e) {
  if (this.array.length === 0) {
    throw new EmptyStackException();
  }

  return this.array.pop();
};

/**
 * Looks at the object at the top of this stack without removing it from the
 * stack.
 *
 */
Stack.prototype.peek = function() {
  if (this.array.length === 0) {
    throw new EmptyStackException();
  }

  return this.array[this.array.length - 1];
};

/**
 * Tests if this stack is empty.
 *
 * @return {boolean} true if and only if this stack contains no items; false
 *         otherwise.
 */
Stack.prototype.empty = function(e) {
  if (this.array.length === 0) {
    return true;
  } else {
    return false;
  }
};

Stack.prototype.isEmpty = function() {
  return this.empty();
};

/**
 * Returns the 1-based position where an object is on this stack. If the object
 * o occurs as an item in this stack, this method returns the distance from the
 * top of the stack of the occurrence nearest the top of the stack; the topmost
 * item on the stack is considered to be at distance 1. The equals method is
 * used to compare o to the items in this stack.
 *
 * NOTE: does not currently actually use equals. (=== is used)
 *
 * @return {number} the 1-based position from the top of the stack where the
 *         object is located; the return value -1 indicates that the object is
 *         not on the stack.
 */
Stack.prototype.search = function(o) {
  return this.array.indexOf(o);
};

/**
 * @override
 *
 */
Stack.prototype.size = function() {
  return this.array.length;
};

/**
 * @override
 */
Stack.prototype.toArray = function() {
  var array = [];

  for ( var i = 0, len = this.array.length; i < len; i++) {
    array.push(this.array[i]);
  }

  return array;
};

module.exports = Stack;

},{"./EmptyStackException":55,"./List":60}],68:[function(require,module,exports){
/**
 * @requires SortedMap.js
 * @requires ArrayList.js
 */
var Map = require('./Map');
var SortedMap = require('./SortedMap');
var ArrayList = require('./ArrayList');

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/TreeMap.html
 *
 * @implements {javascript.util.Map}
 * @constructor
 *
 */
function TreeMap() {
  this.array = [];
};
TreeMap.prototype = new Map;

/**
 * @type {Array}
 * @private
 */
TreeMap.prototype.array = null;

/**
 * @override
 */
TreeMap.prototype.get = function(key) {
  for ( var i = 0, len = this.array.length; i < len; i++) {
    var e = this.array[i];
    if (e.key['compareTo'](key) === 0) {
      return e.value;
    }
  }
  return null;
};

/**
 * @override
 */
TreeMap.prototype.put = function(key, value) {
  var e = this.get(key);

  if (e) {
    var oldValue = e.value;
    e.value = value;
    return oldValue;
  }

  var newElement = {
    key : key,
    value : value
  };

  for ( var i = 0, len = this.array.length; i < len; i++) {
    e = this.array[i];
    if (e.key['compareTo'](key) === 1) {
      this.array.splice(i, 0, newElement);
      return null;
    }
  }

  this.array.push({
    key : key,
    value : value
  });

  return null;
};

/**
 * @override
 */
TreeMap.prototype.values = function() {
  var arrayList = new javascript.util.ArrayList();
  for ( var i = 0, len = this.array.length; i < len; i++) {
    arrayList.add(this.array[i].value);
  }
  return arrayList;
};

/**
 * @override
 */
TreeMap.prototype.size = function() {
  return this.values().size();
};

module.exports = TreeMap;

},{"./ArrayList":52,"./Map":61,"./SortedMap":65}],69:[function(require,module,exports){
/**
 * @requires SortedSet.js
 */
var Collection = require('./Collection');
var SortedSet = require('./SortedSet');
var OperationNotSupported = require('./OperationNotSupported');
var NoSuchElementException = require('./NoSuchElementException');

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/TreeSet.html
 *
 * @implements {javascript.util.SortedSet}
 * @constructor
 */
function TreeSet() {
  this.array = [];

  if (arguments[0] instanceof Collection) {
    this.addAll(arguments[0]);
  }
};
TreeSet.prototype = new SortedSet;

/**
 * @type {Array}
 * @private
 */
TreeSet.prototype.array = null;

/**
 * @override
 */
TreeSet.prototype.contains = function(o) {
  for ( var i = 0, len = this.array.length; i < len; i++) {
    var e = this.array[i];
    if (e['compareTo'](o) === 0) {
      return true;
    }
  }
  return false;
};

/**
 * @override
 */
TreeSet.prototype.add = function(o) {
  if (this.contains(o)) {
    return false;
  }

  for ( var i = 0, len = this.array.length; i < len; i++) {
    var e = this.array[i];
    if (e['compareTo'](o) === 1) {
      this.array.splice(i, 0, o);
      return true;
    }
  }

  this.array.push(o);

  return true;
};

/**
 * @override
 */
TreeSet.prototype.addAll = function(c) {
  for ( var i = c.iterator(); i.hasNext();) {
    this.add(i.next());
  }
  return true;
};

/**
 * @override
 * @returns {boolean}
 */
TreeSet.prototype.remove = function(o) {
  throw new OperationNotSupported();
};

/**
 * @override
 */
TreeSet.prototype.size = function() {
  return this.array.length;
};

/**
 * @override
 */
TreeSet.prototype.isEmpty = function() {
  return this.array.length === 0;
};

/**
 * @override
 */
TreeSet.prototype.toArray = function() {
  var array = [];

  for ( var i = 0, len = this.array.length; i < len; i++) {
    array.push(this.array[i]);
  }

  return array;
};

/**
 * @override
 */
TreeSet.prototype.iterator = function() {
  return new TreeSet.Iterator(this);
};

/**
 * @implements {javascript.util.Iterator}
 * @param {javascript.util.TreeSet}
 *          treeSet
 * @constructor
 * @private
 */
TreeSet.Iterator = function(treeSet) {
  this.treeSet = treeSet;
};

/**
 * @type {javascript.util.TreeSet}
 * @private
 */
TreeSet.Iterator.prototype.treeSet = null;

/**
 * @type {number}
 * @private
 */
TreeSet.Iterator.prototype.position = 0;

/**
 * @override
 */
TreeSet.Iterator.prototype.next = function() {
  if (this.position === this.treeSet.size()) {
    throw new NoSuchElementException();
  }
  return this.treeSet.array[this.position++];
};

/**
 * @override
 */
TreeSet.Iterator.prototype.hasNext = function() {
  if (this.position < this.treeSet.size()) {
    return true;
  }
  return false;
};

/**
 * @override
 */
TreeSet.Iterator.prototype.remove = function() {
  throw new javascript.util.OperationNotSupported();
};

module.exports = TreeSet;

},{"./Collection":54,"./NoSuchElementException":62,"./OperationNotSupported":63,"./SortedSet":66}],70:[function(require,module,exports){
module.exports.ArrayList = require('./ArrayList');
module.exports.Arrays = require('./Arrays');
module.exports.Collection = require('./Collection');
module.exports.HashMap = require('./HashMap');
module.exports.Iterator = require('./Iterator');
module.exports.List = require('./List');
module.exports.Map = require('./Map');
module.exports.Set = require('./Set');
module.exports.HashSet = require('./HashSet');
module.exports.SortedMap = require('./SortedMap');
module.exports.SortedSet = require('./SortedSet');
module.exports.Stack = require('./Stack');
module.exports.TreeMap = require('./TreeMap');
module.exports.TreeSet = require('./TreeSet');

},{"./ArrayList":52,"./Arrays":53,"./Collection":54,"./HashMap":56,"./HashSet":57,"./Iterator":59,"./List":60,"./Map":61,"./Set":64,"./SortedMap":65,"./SortedSet":66,"./Stack":67,"./TreeMap":68,"./TreeSet":69}],71:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};/**
 * @license
 * Lo-Dash 2.2.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modern -o ./dist/lodash.js`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
;(function() {

  /** Used as a safe reference for `undefined` in pre ES5 environments */
  var undefined;

  /** Used to pool arrays and objects used internally */
  var arrayPool = [],
      objectPool = [];

  /** Used to generate unique IDs */
  var idCounter = 0;

  /** Used to prefix keys to avoid issues with `__proto__` and properties on `Object.prototype` */
  var keyPrefix = +new Date + '';

  /** Used as the size when optimizations are enabled for large arrays */
  var largeArraySize = 75;

  /** Used as the max size of the `arrayPool` and `objectPool` */
  var maxPoolSize = 40;

  /** Used to detect and test whitespace */
  var whitespace = (
    // whitespace
    ' \t\x0B\f\xA0\ufeff' +

    // line terminators
    '\n\r\u2028\u2029' +

    // unicode category "Zs" space separators
    '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000'
  );

  /** Used to match empty string literals in compiled template source */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /**
   * Used to match ES6 template delimiters
   * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-7.8.6
   */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to match regexp flags from their coerced string values */
  var reFlags = /\w*$/;

  /** Used to detected named functions */
  var reFuncName = /^function[ \n\r\t]+\w/;

  /** Used to match "interpolate" template delimiters */
  var reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to match leading whitespace and zeros to be removed */
  var reLeadingSpacesAndZeros = RegExp('^[' + whitespace + ']*0+(?=.$)');

  /** Used to ensure capturing order of template delimiters */
  var reNoMatch = /($^)/;

  /** Used to detect functions containing a `this` reference */
  var reThis = /\bthis\b/;

  /** Used to match unescaped characters in compiled string literals */
  var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;

  /** Used to assign default `context` object properties */
  var contextProps = [
    'Array', 'Boolean', 'Date', 'Function', 'Math', 'Number', 'Object',
    'RegExp', 'String', '_', 'attachEvent', 'clearTimeout', 'isFinite', 'isNaN',
    'parseInt', 'setImmediate', 'setTimeout'
  ];

  /** Used to make template sourceURLs easier to identify */
  var templateCounter = 0;

  /** `Object#toString` result shortcuts */
  var argsClass = '[object Arguments]',
      arrayClass = '[object Array]',
      boolClass = '[object Boolean]',
      dateClass = '[object Date]',
      funcClass = '[object Function]',
      numberClass = '[object Number]',
      objectClass = '[object Object]',
      regexpClass = '[object RegExp]',
      stringClass = '[object String]';

  /** Used to identify object classifications that `_.clone` supports */
  var cloneableClasses = {};
  cloneableClasses[funcClass] = false;
  cloneableClasses[argsClass] = cloneableClasses[arrayClass] =
  cloneableClasses[boolClass] = cloneableClasses[dateClass] =
  cloneableClasses[numberClass] = cloneableClasses[objectClass] =
  cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;

  /** Used as an internal `_.debounce` options object */
  var debounceOptions = {
    'leading': false,
    'maxWait': 0,
    'trailing': false
  };

  /** Used as the property descriptor for `__bindData__` */
  var descriptor = {
    'configurable': false,
    'enumerable': false,
    'value': null,
    'writable': false
  };

  /** Used to determine if values are of the language type Object */
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  /** Used to escape characters for inclusion in compiled string literals */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\t': 't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Used as a reference to the global object */
  var root = (objectTypes[typeof window] && window) || this;

  /** Detect free variable `exports` */
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  /** Detect free variable `module` */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports` */
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
  var freeGlobal = objectTypes[typeof global] && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    root = freeGlobal;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The base implementation of `_.indexOf` without support for binary searches
   * or `fromIndex` constraints.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {number} Returns the index of the matched value or `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    var index = (fromIndex || 0) - 1,
        length = array ? array.length : 0;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * An implementation of `_.contains` for cache objects that mimics the return
   * signature of `_.indexOf` by returning `0` if the value is found, else `-1`.
   *
   * @private
   * @param {Object} cache The cache object to inspect.
   * @param {*} value The value to search for.
   * @returns {number} Returns `0` if `value` is found, else `-1`.
   */
  function cacheIndexOf(cache, value) {
    var type = typeof value;
    cache = cache.cache;

    if (type == 'boolean' || value == null) {
      return cache[value] ? 0 : -1;
    }
    if (type != 'number' && type != 'string') {
      type = 'object';
    }
    var key = type == 'number' ? value : keyPrefix + value;
    cache = (cache = cache[type]) && cache[key];

    return type == 'object'
      ? (cache && baseIndexOf(cache, value) > -1 ? 0 : -1)
      : (cache ? 0 : -1);
  }

  /**
   * Adds a given value to the corresponding cache object.
   *
   * @private
   * @param {*} value The value to add to the cache.
   */
  function cachePush(value) {
    var cache = this.cache,
        type = typeof value;

    if (type == 'boolean' || value == null) {
      cache[value] = true;
    } else {
      if (type != 'number' && type != 'string') {
        type = 'object';
      }
      var key = type == 'number' ? value : keyPrefix + value,
          typeCache = cache[type] || (cache[type] = {});

      if (type == 'object') {
        (typeCache[key] || (typeCache[key] = [])).push(value);
      } else {
        typeCache[key] = true;
      }
    }
  }

  /**
   * Used by `_.max` and `_.min` as the default callback when a given
   * collection is a string value.
   *
   * @private
   * @param {string} value The character to inspect.
   * @returns {number} Returns the code unit of given character.
   */
  function charAtCallback(value) {
    return value.charCodeAt(0);
  }

  /**
   * Used by `sortBy` to compare transformed `collection` elements, stable sorting
   * them in ascending order.
   *
   * @private
   * @param {Object} a The object to compare to `b`.
   * @param {Object} b The object to compare to `a`.
   * @returns {number} Returns the sort order indicator of `1` or `-1`.
   */
  function compareAscending(a, b) {
    var ac = a.criteria,
        bc = b.criteria;

    // ensure a stable sort in V8 and other engines
    // http://code.google.com/p/v8/issues/detail?id=90
    if (ac !== bc) {
      if (ac > bc || typeof ac == 'undefined') {
        return 1;
      }
      if (ac < bc || typeof bc == 'undefined') {
        return -1;
      }
    }
    // The JS engine embedded in Adobe applications like InDesign has a buggy
    // `Array#sort` implementation that causes it, under certain circumstances,
    // to return the same value for `a` and `b`.
    // See https://github.com/jashkenas/underscore/pull/1247
    return a.index - b.index;
  }

  /**
   * Creates a cache object to optimize linear searches of large arrays.
   *
   * @private
   * @param {Array} [array=[]] The array to search.
   * @returns {null|Object} Returns the cache object or `null` if caching should not be used.
   */
  function createCache(array) {
    var index = -1,
        length = array.length,
        first = array[0],
        mid = array[(length / 2) | 0],
        last = array[length - 1];

    if (first && typeof first == 'object' &&
        mid && typeof mid == 'object' && last && typeof last == 'object') {
      return false;
    }
    var cache = getObject();
    cache['false'] = cache['null'] = cache['true'] = cache['undefined'] = false;

    var result = getObject();
    result.array = array;
    result.cache = cache;
    result.push = cachePush;

    while (++index < length) {
      result.push(array[index]);
    }
    return result;
  }

  /**
   * Used by `template` to escape characters for inclusion in compiled
   * string literals.
   *
   * @private
   * @param {string} match The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(match) {
    return '\\' + stringEscapes[match];
  }

  /**
   * Gets an array from the array pool or creates a new one if the pool is empty.
   *
   * @private
   * @returns {Array} The array from the pool.
   */
  function getArray() {
    return arrayPool.pop() || [];
  }

  /**
   * Gets an object from the object pool or creates a new one if the pool is empty.
   *
   * @private
   * @returns {Object} The object from the pool.
   */
  function getObject() {
    return objectPool.pop() || {
      'array': null,
      'cache': null,
      'criteria': null,
      'false': false,
      'index': 0,
      'null': false,
      'number': null,
      'object': null,
      'push': null,
      'string': null,
      'true': false,
      'undefined': false,
      'value': null
    };
  }

  /**
   * A no-operation function.
   *
   * @private
   */
  function noop() {
    // no operation performed
  }

  /**
   * Releases the given array back to the array pool.
   *
   * @private
   * @param {Array} [array] The array to release.
   */
  function releaseArray(array) {
    array.length = 0;
    if (arrayPool.length < maxPoolSize) {
      arrayPool.push(array);
    }
  }

  /**
   * Releases the given object back to the object pool.
   *
   * @private
   * @param {Object} [object] The object to release.
   */
  function releaseObject(object) {
    var cache = object.cache;
    if (cache) {
      releaseObject(cache);
    }
    object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
    if (objectPool.length < maxPoolSize) {
      objectPool.push(object);
    }
  }

  /**
   * Slices the `collection` from the `start` index up to, but not including,
   * the `end` index.
   *
   * Note: This function is used instead of `Array#slice` to support node lists
   * in IE < 9 and to ensure dense arrays are returned.
   *
   * @private
   * @param {Array|Object|string} collection The collection to slice.
   * @param {number} start The start index.
   * @param {number} end The end index.
   * @returns {Array} Returns the new array.
   */
  function slice(array, start, end) {
    start || (start = 0);
    if (typeof end == 'undefined') {
      end = array ? array.length : 0;
    }
    var index = -1,
        length = end - start || 0,
        result = Array(length < 0 ? 0 : length);

    while (++index < length) {
      result[index] = array[start + index];
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a new `lodash` function using the given context object.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns the `lodash` function.
   */
  function runInContext(context) {
    // Avoid issues with some ES3 environments that attempt to use values, named
    // after built-in constructors like `Object`, for the creation of literals.
    // ES5 clears this up by stating that literals must use built-in constructors.
    // See http://es5.github.io/#x11.1.5.
    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;

    /** Native constructor references */
    var Array = context.Array,
        Boolean = context.Boolean,
        Date = context.Date,
        Function = context.Function,
        Math = context.Math,
        Number = context.Number,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;

    /**
     * Used for `Array` method references.
     *
     * Normally `Array.prototype` would suffice, however, using an array literal
     * avoids issues in Narwhal.
     */
    var arrayRef = [];

    /** Used for native method references */
    var objectProto = Object.prototype;

    /** Used to restore the original `_` reference in `noConflict` */
    var oldDash = context._;

    /** Used to detect if a method is native */
    var reNative = RegExp('^' +
      String(objectProto.valueOf)
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/valueOf|for [^\]]+/g, '.+?') + '$'
    );

    /** Native method shortcuts */
    var ceil = Math.ceil,
        clearTimeout = context.clearTimeout,
        floor = Math.floor,
        fnToString = Function.prototype.toString,
        getPrototypeOf = reNative.test(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
        hasOwnProperty = objectProto.hasOwnProperty,
        now = reNative.test(now = Date.now) && now || function() { return +new Date; },
        push = arrayRef.push,
        setImmediate = context.setImmediate,
        setTimeout = context.setTimeout,
        splice = arrayRef.splice,
        toString = objectProto.toString,
        unshift = arrayRef.unshift;

    var defineProperty = (function() {
      try {
        var o = {},
            func = reNative.test(func = Object.defineProperty) && func,
            result = func(o, o, o) && func;
      } catch(e) { }
      return result;
    }());

    /* Native method shortcuts for methods with the same name as other `lodash` methods */
    var nativeBind = reNative.test(nativeBind = toString.bind) && nativeBind,
        nativeCreate = reNative.test(nativeCreate = Object.create) && nativeCreate,
        nativeIsArray = reNative.test(nativeIsArray = Array.isArray) && nativeIsArray,
        nativeIsFinite = context.isFinite,
        nativeIsNaN = context.isNaN,
        nativeKeys = reNative.test(nativeKeys = Object.keys) && nativeKeys,
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random,
        nativeSlice = arrayRef.slice;

    /** Detect various environments */
    var isIeOpera = reNative.test(context.attachEvent),
        isV8 = nativeBind && !/\n|true/.test(nativeBind + isIeOpera);

    /** Used to lookup a built-in constructor by [[Class]] */
    var ctorByClass = {};
    ctorByClass[arrayClass] = Array;
    ctorByClass[boolClass] = Boolean;
    ctorByClass[dateClass] = Date;
    ctorByClass[funcClass] = Function;
    ctorByClass[objectClass] = Object;
    ctorByClass[numberClass] = Number;
    ctorByClass[regexpClass] = RegExp;
    ctorByClass[stringClass] = String;

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object which wraps the given value to enable intuitive
     * method chaining.
     *
     * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
     * and `unshift`
     *
     * Chaining is supported in custom builds as long as the `value` method is
     * implicitly or explicitly included in the build.
     *
     * The chainable wrapper functions are:
     * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`,
     * `compose`, `concat`, `countBy`, `createCallback`, `curry`, `debounce`,
     * `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`, `forEach`,
     * `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `functions`,
     * `groupBy`, `indexBy`, `initial`, `intersection`, `invert`, `invoke`, `keys`,
     * `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`, `once`, `pairs`,
     * `partial`, `partialRight`, `pick`, `pluck`, `pull`, `push`, `range`, `reject`,
     * `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`, `sortBy`, `splice`,
     * `tap`, `throttle`, `times`, `toArray`, `transform`, `union`, `uniq`, `unshift`,
     * `unzip`, `values`, `where`, `without`, `wrap`, and `zip`
     *
     * The non-chainable wrapper functions are:
     * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `findIndex`,
     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `has`, `identity`,
     * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
     * `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`,
     * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`,
     * `lastIndexOf`, `mixin`, `noConflict`, `parseInt`, `pop`, `random`, `reduce`,
     * `reduceRight`, `result`, `shift`, `size`, `some`, `sortedIndex`, `runInContext`,
     * `template`, `unescape`, `uniqueId`, and `value`
     *
     * The wrapper functions `first` and `last` return wrapped values when `n` is
     * provided, otherwise they return unwrapped values.
     *
     * Explicit chaining can be enabled by using the `_.chain` method.
     *
     * @name _
     * @constructor
     * @category Chaining
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns a `lodash` instance.
     * @example
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // returns an unwrapped value
     * wrapped.reduce(function(sum, num) {
     *   return sum + num;
     * });
     * // => 6
     *
     * // returns a wrapped value
     * var squares = wrapped.map(function(num) {
     *   return num * num;
     * });
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
    function lodash(value) {
      // don't wrap if already wrapped, even if wrapped by a different `lodash` constructor
      return (value && typeof value == 'object' && !isArray(value) && hasOwnProperty.call(value, '__wrapped__'))
       ? value
       : new lodashWrapper(value);
    }

    /**
     * A fast path for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap in a `lodash` instance.
     * @param {boolean} chainAll A flag to enable chaining for all methods
     * @returns {Object} Returns a `lodash` instance.
     */
    function lodashWrapper(value, chainAll) {
      this.__chain__ = !!chainAll;
      this.__wrapped__ = value;
    }
    // ensure `new lodashWrapper` is an instance of `lodash`
    lodashWrapper.prototype = lodash.prototype;

    /**
     * An object used to flag environments features.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    var support = lodash.support = {};

    /**
     * Detect if `Function#bind` exists and is inferred to be fast (all but V8).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.fastBind = nativeBind && !isV8;

    /**
     * Detect if functions can be decompiled by `Function#toString`
     * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.funcDecomp = !reNative.test(context.WinRTError) && reThis.test(runInContext);

    /**
     * Detect if `Function#name` is supported (all but IE).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.funcNames = typeof Function.name == 'string';

    /**
     * By default, the template delimiters used by Lo-Dash are similar to those in
     * embedded Ruby (ERB). Change the following template settings to use alternative
     * delimiters.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    lodash.templateSettings = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'escape': /<%-([\s\S]+?)%>/g,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'evaluate': /<%([\s\S]+?)%>/g,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'interpolate': reInterpolate,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type string
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type Object
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type Function
         */
        '_': lodash
      }
    };

    /*--------------------------------------------------------------------------*/

    /**
     * The base implementation of `_.clone` without argument juggling or support
     * for `thisArg` binding.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} [deep=false] Specify a deep clone.
     * @param {Function} [callback] The function to customize cloning values.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates clones with source counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, deep, callback, stackA, stackB) {
      if (callback) {
        var result = callback(value);
        if (typeof result != 'undefined') {
          return result;
        }
      }
      // inspect [[Class]]
      var isObj = isObject(value);
      if (isObj) {
        var className = toString.call(value);
        if (!cloneableClasses[className]) {
          return value;
        }
        var ctor = ctorByClass[className];
        switch (className) {
          case boolClass:
          case dateClass:
            return new ctor(+value);

          case numberClass:
          case stringClass:
            return new ctor(value);

          case regexpClass:
            result = ctor(value.source, reFlags.exec(value));
            result.lastIndex = value.lastIndex;
            return result;
        }
      } else {
        return value;
      }
      var isArr = isArray(value);
      if (deep) {
        // check for circular references and return corresponding clone
        var initedStack = !stackA;
        stackA || (stackA = getArray());
        stackB || (stackB = getArray());

        var length = stackA.length;
        while (length--) {
          if (stackA[length] == value) {
            return stackB[length];
          }
        }
        result = isArr ? ctor(value.length) : {};
      }
      else {
        result = isArr ? slice(value) : assign({}, value);
      }
      // add array properties assigned by `RegExp#exec`
      if (isArr) {
        if (hasOwnProperty.call(value, 'index')) {
          result.index = value.index;
        }
        if (hasOwnProperty.call(value, 'input')) {
          result.input = value.input;
        }
      }
      // exit for shallow clone
      if (!deep) {
        return result;
      }
      // add the source value to the stack of traversed objects
      // and associate it with its clone
      stackA.push(value);
      stackB.push(result);

      // recursively populate clone (susceptible to call stack limits)
      (isArr ? forEach : forOwn)(value, function(objValue, key) {
        result[key] = baseClone(objValue, deep, callback, stackA, stackB);
      });

      if (initedStack) {
        releaseArray(stackA);
        releaseArray(stackB);
      }
      return result;
    }

    /**
     * The base implementation of `_.createCallback` without support for creating
     * "_.pluck" or "_.where" style callbacks.
     *
     * @private
     * @param {*} [func=identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of the created callback.
     * @param {number} [argCount] The number of arguments the callback accepts.
     * @returns {Function} Returns a callback function.
     */
    function baseCreateCallback(func, thisArg, argCount) {
      if (typeof func != 'function') {
        return identity;
      }
      // exit early if there is no `thisArg`
      if (typeof thisArg == 'undefined') {
        return func;
      }
      var bindData = func.__bindData__ || (support.funcNames && !func.name);
      if (typeof bindData == 'undefined') {
        var source = reThis && fnToString.call(func);
        if (!support.funcNames && source && !reFuncName.test(source)) {
          bindData = true;
        }
        if (support.funcNames || !bindData) {
          // checks if `func` references the `this` keyword and stores the result
          bindData = !support.funcDecomp || reThis.test(source);
          setBindData(func, bindData);
        }
      }
      // exit early if there are no `this` references or `func` is bound
      if (bindData !== true && (bindData && bindData[1] & 1)) {
        return func;
      }
      switch (argCount) {
        case 1: return function(value) {
          return func.call(thisArg, value);
        };
        case 2: return function(a, b) {
          return func.call(thisArg, a, b);
        };
        case 3: return function(value, index, collection) {
          return func.call(thisArg, value, index, collection);
        };
        case 4: return function(accumulator, value, index, collection) {
          return func.call(thisArg, accumulator, value, index, collection);
        };
      }
      return bind(func, thisArg);
    }

    /**
     * The base implementation of `_.flatten` without support for callback
     * shorthands or `thisArg` binding.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
     * @param {boolean} [isArgArrays=false] A flag to restrict flattening to arrays and `arguments` objects.
     * @param {number} [fromIndex=0] The index to start from.
     * @returns {Array} Returns a new flattened array.
     */
    function baseFlatten(array, isShallow, isArgArrays, fromIndex) {
      var index = (fromIndex || 0) - 1,
          length = array ? array.length : 0,
          result = [];

      while (++index < length) {
        var value = array[index];

        if (value && typeof value == 'object' && typeof value.length == 'number'
            && (isArray(value) || isArguments(value))) {
          // recursively flatten arrays (susceptible to call stack limits)
          if (!isShallow) {
            value = baseFlatten(value, isShallow, isArgArrays);
          }
          var valIndex = -1,
              valLength = value.length,
              resIndex = result.length;

          result.length += valLength;
          while (++valIndex < valLength) {
            result[resIndex++] = value[valIndex];
          }
        } else if (!isArgArrays) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.isEqual`, without support for `thisArg` binding,
     * that allows partial "_.where" style comparisons.
     *
     * @private
     * @param {*} a The value to compare.
     * @param {*} b The other value to compare.
     * @param {Function} [callback] The function to customize comparing values.
     * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
     * @param {Array} [stackA=[]] Tracks traversed `a` objects.
     * @param {Array} [stackB=[]] Tracks traversed `b` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
      // used to indicate that when comparing objects, `a` has at least the properties of `b`
      if (callback) {
        var result = callback(a, b);
        if (typeof result != 'undefined') {
          return !!result;
        }
      }
      // exit early for identical values
      if (a === b) {
        // treat `+0` vs. `-0` as not equal
        return a !== 0 || (1 / a == 1 / b);
      }
      var type = typeof a,
          otherType = typeof b;

      // exit early for unlike primitive values
      if (a === a &&
          !(a && objectTypes[type]) &&
          !(b && objectTypes[otherType])) {
        return false;
      }
      // exit early for `null` and `undefined` avoiding ES3's Function#call behavior
      // http://es5.github.io/#x15.3.4.4
      if (a == null || b == null) {
        return a === b;
      }
      // compare [[Class]] names
      var className = toString.call(a),
          otherClass = toString.call(b);

      if (className == argsClass) {
        className = objectClass;
      }
      if (otherClass == argsClass) {
        otherClass = objectClass;
      }
      if (className != otherClass) {
        return false;
      }
      switch (className) {
        case boolClass:
        case dateClass:
          // coerce dates and booleans to numbers, dates to milliseconds and booleans
          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
          return +a == +b;

        case numberClass:
          // treat `NaN` vs. `NaN` as equal
          return (a != +a)
            ? b != +b
            // but treat `+0` vs. `-0` as not equal
            : (a == 0 ? (1 / a == 1 / b) : a == +b);

        case regexpClass:
        case stringClass:
          // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
          // treat string primitives and their corresponding object instances as equal
          return a == String(b);
      }
      var isArr = className == arrayClass;
      if (!isArr) {
        // unwrap any `lodash` wrapped values
        if (hasOwnProperty.call(a, '__wrapped__ ') || hasOwnProperty.call(b, '__wrapped__')) {
          return baseIsEqual(a.__wrapped__ || a, b.__wrapped__ || b, callback, isWhere, stackA, stackB);
        }
        // exit for functions and DOM nodes
        if (className != objectClass) {
          return false;
        }
        // in older versions of Opera, `arguments` objects have `Array` constructors
        var ctorA = a.constructor,
            ctorB = b.constructor;

        // non `Object` object instances with different constructors are not equal
        if (ctorA != ctorB && !(
              isFunction(ctorA) && ctorA instanceof ctorA &&
              isFunction(ctorB) && ctorB instanceof ctorB
            )) {
          return false;
        }
      }
      // assume cyclic structures are equal
      // the algorithm for detecting cyclic structures is adapted from ES 5.1
      // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
      var initedStack = !stackA;
      stackA || (stackA = getArray());
      stackB || (stackB = getArray());

      var length = stackA.length;
      while (length--) {
        if (stackA[length] == a) {
          return stackB[length] == b;
        }
      }
      var size = 0;
      result = true;

      // add `a` and `b` to the stack of traversed objects
      stackA.push(a);
      stackB.push(b);

      // recursively compare objects and arrays (susceptible to call stack limits)
      if (isArr) {
        length = a.length;
        size = b.length;

        // compare lengths to determine if a deep comparison is necessary
        result = size == a.length;
        if (!result && !isWhere) {
          return result;
        }
        // deep compare the contents, ignoring non-numeric properties
        while (size--) {
          var index = length,
              value = b[size];

          if (isWhere) {
            while (index--) {
              if ((result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB))) {
                break;
              }
            }
          } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {
            break;
          }
        }
        return result;
      }
      // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
      // which, in this case, is more costly
      forIn(b, function(value, key, b) {
        if (hasOwnProperty.call(b, key)) {
          // count the number of properties.
          size++;
          // deep compare each property value.
          return (result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB));
        }
      });

      if (result && !isWhere) {
        // ensure both objects have the same number of properties
        forIn(a, function(value, key, a) {
          if (hasOwnProperty.call(a, key)) {
            // `size` will be `-1` if `a` has more properties than `b`
            return (result = --size > -1);
          }
        });
      }
      if (initedStack) {
        releaseArray(stackA);
        releaseArray(stackB);
      }
      return result;
    }

    /**
     * The base implementation of `_.merge` without argument juggling or support
     * for `thisArg` binding.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} [callback] The function to customize merging properties.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates values with source counterparts.
     */
    function baseMerge(object, source, callback, stackA, stackB) {
      (isArray(source) ? forEach : forOwn)(source, function(source, key) {
        var found,
            isArr,
            result = source,
            value = object[key];

        if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
          // avoid merging previously merged cyclic sources
          var stackLength = stackA.length;
          while (stackLength--) {
            if ((found = stackA[stackLength] == source)) {
              value = stackB[stackLength];
              break;
            }
          }
          if (!found) {
            var isShallow;
            if (callback) {
              result = callback(value, source);
              if ((isShallow = typeof result != 'undefined')) {
                value = result;
              }
            }
            if (!isShallow) {
              value = isArr
                ? (isArray(value) ? value : [])
                : (isPlainObject(value) ? value : {});
            }
            // add `source` and associated `value` to the stack of traversed objects
            stackA.push(source);
            stackB.push(value);

            // recursively merge objects and arrays (susceptible to call stack limits)
            if (!isShallow) {
              baseMerge(value, source, callback, stackA, stackB);
            }
          }
        }
        else {
          if (callback) {
            result = callback(value, source);
            if (typeof result == 'undefined') {
              result = source;
            }
          }
          if (typeof result != 'undefined') {
            value = result;
          }
        }
        object[key] = value;
      });
    }

    /**
     * The base implementation of `_.uniq` without support for callback shorthands
     * or `thisArg` binding.
     *
     * @private
     * @param {Array} array The array to process.
     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
     * @param {Function} [callback] The function called per iteration.
     * @returns {Array} Returns a duplicate-value-free array.
     */
    function baseUniq(array, isSorted, callback) {
      var index = -1,
          indexOf = getIndexOf(),
          length = array ? array.length : 0,
          result = [];

      var isLarge = !isSorted && length >= largeArraySize && indexOf === baseIndexOf,
          seen = (callback || isLarge) ? getArray() : result;

      if (isLarge) {
        var cache = createCache(seen);
        if (cache) {
          indexOf = cacheIndexOf;
          seen = cache;
        } else {
          isLarge = false;
          seen = callback ? seen : (releaseArray(seen), result);
        }
      }
      while (++index < length) {
        var value = array[index],
            computed = callback ? callback(value, index, array) : value;

        if (isSorted
              ? !index || seen[seen.length - 1] !== computed
              : indexOf(seen, computed) < 0
            ) {
          if (callback || isLarge) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      if (isLarge) {
        releaseArray(seen.array);
        releaseObject(seen);
      } else if (callback) {
        releaseArray(seen);
      }
      return result;
    }

    /**
     * Creates a function that aggregates a collection, creating an object composed
     * of keys generated from the results of running each element of the collection
     * through a callback. The given `setter` function sets the keys and values
     * of the composed object.
     *
     * @private
     * @param {Function} setter The setter function.
     * @returns {Function} Returns the new aggregator function.
     */
    function createAggregator(setter) {
      return function(collection, callback, thisArg) {
        var result = {};
        callback = lodash.createCallback(callback, thisArg, 3);

        var index = -1,
            length = collection ? collection.length : 0;

        if (typeof length == 'number') {
          while (++index < length) {
            var value = collection[index];
            setter(result, value, callback(value, index, collection), collection);
          }
        } else {
          forOwn(collection, function(value, key, collection) {
            setter(result, value, callback(value, key, collection), collection);
          });
        }
        return result;
      };
    }

    /**
     * Creates a function that, when called, either curries or invokes `func`
     * with an optional `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to reference.
     * @param {number} bitmask The bitmask of method flags to compose.
     *  The bitmask may be composed of the following flags:
     *  1 - `_.bind`
     *  2 - `_.bindKey`
     *  4 - `_.curry`
     *  8 - `_.curry` (bound)
     *  16 - `_.partial`
     *  32 - `_.partialRight`
     * @param {Array} [partialArgs] An array of arguments to prepend to those
     *  provided to the new function.
     * @param {Array} [partialRightArgs] An array of arguments to append to those
     *  provided to the new function.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new bound function.
     */
    function createBound(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
      var isBind = bitmask & 1,
          isBindKey = bitmask & 2,
          isCurry = bitmask & 4,
          isCurryBound = bitmask & 8,
          isPartial = bitmask & 16,
          isPartialRight = bitmask & 32,
          key = func;

      if (!isBindKey && !isFunction(func)) {
        throw new TypeError;
      }
      if (isPartial && !partialArgs.length) {
        bitmask &= ~16;
        isPartial = partialArgs = false;
      }
      if (isPartialRight && !partialRightArgs.length) {
        bitmask &= ~32;
        isPartialRight = partialRightArgs = false;
      }
      var bindData = func && func.__bindData__;
      if (bindData) {
        if (isBind && !(bindData[1] & 1)) {
          bindData[4] = thisArg;
        }
        if (!isBind && bindData[1] & 1) {
          bitmask |= 8;
        }
        if (isCurry && !(bindData[1] & 4)) {
          bindData[5] = arity;
        }
        if (isPartial) {
          push.apply(bindData[2] || (bindData[2] = []), partialArgs);
        }
        if (isPartialRight) {
          push.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
        }
        bindData[1] |= bitmask;
        return createBound.apply(null, bindData);
      }
      // use `Function#bind` if it exists and is fast
      // (in V8 `Function#bind` is slower except when partially applied)
      if (isBind && !(isBindKey || isCurry || isPartialRight) &&
          (support.fastBind || (nativeBind && isPartial))) {
        if (isPartial) {
          var args = [thisArg];
          push.apply(args, partialArgs);
        }
        var bound = isPartial
          ? nativeBind.apply(func, args)
          : nativeBind.call(func, thisArg);
      }
      else {
        bound = function() {
          // `Function#bind` spec
          // http://es5.github.io/#x15.3.4.5
          var args = arguments,
              thisBinding = isBind ? thisArg : this;

          if (isCurry || isPartial || isPartialRight) {
            args = nativeSlice.call(args);
            if (isPartial) {
              unshift.apply(args, partialArgs);
            }
            if (isPartialRight) {
              push.apply(args, partialRightArgs);
            }
            if (isCurry && args.length < arity) {
              bitmask |= 16 & ~32;
              return createBound(func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity);
            }
          }
          if (isBindKey) {
            func = thisBinding[key];
          }
          if (this instanceof bound) {
            // ensure `new bound` is an instance of `func`
            thisBinding = createObject(func.prototype);

            // mimic the constructor's `return` behavior
            // http://es5.github.io/#x13.2.2
            var result = func.apply(thisBinding, args);
            return isObject(result) ? result : thisBinding;
          }
          return func.apply(thisBinding, args);
        };
      }
      setBindData(bound, nativeSlice.call(arguments));
      return bound;
    }

    /**
     * Creates a new object with the specified `prototype`.
     *
     * @private
     * @param {Object} prototype The prototype object.
     * @returns {Object} Returns the new object.
     */
    function createObject(prototype) {
      return isObject(prototype) ? nativeCreate(prototype) : {};
    }
    // fallback for browsers without `Object.create`
    if (!nativeCreate) {
      createObject = function(prototype) {
        if (isObject(prototype)) {
          noop.prototype = prototype;
          var result = new noop;
          noop.prototype = null;
        }
        return result || {};
      };
    }

    /**
     * Used by `escape` to convert characters to HTML entities.
     *
     * @private
     * @param {string} match The matched character to escape.
     * @returns {string} Returns the escaped character.
     */
    function escapeHtmlChar(match) {
      return htmlEscapes[match];
    }

    /**
     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
     * customized, this method returns the custom method, otherwise it returns
     * the `baseIndexOf` function.
     *
     * @private
     * @returns {Function} Returns the "indexOf" function.
     */
    function getIndexOf() {
      var result = (result = lodash.indexOf) === indexOf ? baseIndexOf : result;
      return result;
    }

    /**
     * Sets `this` binding data on a given function.
     *
     * @private
     * @param {Function} func The function to set data on.
     * @param {*} value The value to set.
     */
    var setBindData = !defineProperty ? noop : function(func, value) {
      descriptor.value = value;
      defineProperty(func, '__bindData__', descriptor);
    };

    /**
     * A fallback implementation of `isPlainObject` which checks if a given value
     * is an object created by the `Object` constructor, assuming objects created
     * by the `Object` constructor have no inherited enumerable properties and that
     * there are no `Object.prototype` extensions.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     */
    function shimIsPlainObject(value) {
      var ctor,
          result;

      // avoid non Object objects, `arguments` objects, and DOM elements
      if (!(value && toString.call(value) == objectClass) ||
          (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor))) {
        return false;
      }
      // In most environments an object's own properties are iterated before
      // its inherited properties. If the last iterated property is an object's
      // own property then there are no inherited enumerable properties.
      forIn(value, function(value, key) {
        result = key;
      });
      return typeof result == 'undefined' || hasOwnProperty.call(value, result);
    }

    /**
     * Used by `unescape` to convert HTML entities to characters.
     *
     * @private
     * @param {string} match The matched character to unescape.
     * @returns {string} Returns the unescaped character.
     */
    function unescapeHtmlChar(match) {
      return htmlUnescapes[match];
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Checks if `value` is an `arguments` object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
     * @example
     *
     * (function() { return _.isArguments(arguments); })(1, 2, 3);
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    function isArguments(value) {
      return value && typeof value == 'object' && typeof value.length == 'number' &&
        toString.call(value) == argsClass || false;
    }

    /**
     * Checks if `value` is an array.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
     * @example
     *
     * (function() { return _.isArray(arguments); })();
     * // => false
     *
     * _.isArray([1, 2, 3]);
     * // => true
     */
    var isArray = nativeIsArray || function(value) {
      return value && typeof value == 'object' && typeof value.length == 'number' &&
        toString.call(value) == arrayClass || false;
    };

    /**
     * A fallback implementation of `Object.keys` which produces an array of the
     * given object's own enumerable property names.
     *
     * @private
     * @type Function
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property names.
     */
    var shimKeys = function(object) {
      var index, iterable = object, result = [];
      if (!iterable) return result;
      if (!(objectTypes[typeof object])) return result;
        for (index in iterable) {
          if (hasOwnProperty.call(iterable, index)) {
            result.push(index);
          }
        }
      return result
    };

    /**
     * Creates an array composed of the own enumerable property names of an object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property names.
     * @example
     *
     * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
     * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
     */
    var keys = !nativeKeys ? shimKeys : function(object) {
      if (!isObject(object)) {
        return [];
      }
      return nativeKeys(object);
    };

    /**
     * Used to convert characters to HTML entities:
     *
     * Though the `>` character is escaped for symmetry, characters like `>` and `/`
     * don't require escaping in HTML and have no special meaning unless they're part
     * of a tag or an unquoted attribute value.
     * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
     */
    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    /** Used to convert HTML entities to characters */
    var htmlUnescapes = invert(htmlEscapes);

    /** Used to match HTML entities and HTML characters */
    var reEscapedHtml = RegExp('(' + keys(htmlUnescapes).join('|') + ')', 'g'),
        reUnescapedHtml = RegExp('[' + keys(htmlEscapes).join('') + ']', 'g');

    /*--------------------------------------------------------------------------*/

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object. Subsequent sources will overwrite property assignments of previous
     * sources. If a callback is provided it will be executed to produce the
     * assigned values. The callback is bound to `thisArg` and invoked with two
     * arguments; (objectValue, sourceValue).
     *
     * @static
     * @memberOf _
     * @type Function
     * @alias extend
     * @category Objects
     * @param {Object} object The destination object.
     * @param {...Object} [source] The source objects.
     * @param {Function} [callback] The function to customize assigning values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the destination object.
     * @example
     *
     * _.assign({ 'name': 'moe' }, { 'age': 40 });
     * // => { 'name': 'moe', 'age': 40 }
     *
     * var defaults = _.partialRight(_.assign, function(a, b) {
     *   return typeof a == 'undefined' ? b : a;
     * });
     *
     * var food = { 'name': 'apple' };
     * defaults(food, { 'name': 'banana', 'type': 'fruit' });
     * // => { 'name': 'apple', 'type': 'fruit' }
     */
    var assign = function(object, source, guard) {
      var index, iterable = object, result = iterable;
      if (!iterable) return result;
      var args = arguments,
          argsIndex = 0,
          argsLength = typeof guard == 'number' ? 2 : args.length;
      if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {
        var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);
      } else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {
        callback = args[--argsLength];
      }
      while (++argsIndex < argsLength) {
        iterable = args[argsIndex];
        if (iterable && objectTypes[typeof iterable]) {
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          result[index] = callback ? callback(result[index], iterable[index]) : iterable[index];
        }
        }
      }
      return result
    };

    /**
     * Creates a clone of `value`. If `deep` is `true` nested objects will also
     * be cloned, otherwise they will be assigned by reference. If a callback
     * is provided it will be executed to produce the cloned values. If the
     * callback returns `undefined` cloning will be handled by the method instead.
     * The callback is bound to `thisArg` and invoked with one argument; (value).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to clone.
     * @param {boolean} [deep=false] Specify a deep clone.
     * @param {Function} [callback] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the cloned value.
     * @example
     *
     * var stooges = [
     *   { 'name': 'moe', 'age': 40 },
     *   { 'name': 'larry', 'age': 50 }
     * ];
     *
     * var shallow = _.clone(stooges);
     * shallow[0] === stooges[0];
     * // => true
     *
     * var deep = _.clone(stooges, true);
     * deep[0] === stooges[0];
     * // => false
     *
     * _.mixin({
     *   'clone': _.partialRight(_.clone, function(value) {
     *     return _.isElement(value) ? value.cloneNode(false) : undefined;
     *   })
     * });
     *
     * var clone = _.clone(document.body);
     * clone.childNodes.length;
     * // => 0
     */
    function clone(value, deep, callback, thisArg) {
      // allows working with "Collections" methods without using their `index`
      // and `collection` arguments for `deep` and `callback`
      if (typeof deep != 'boolean' && deep != null) {
        thisArg = callback;
        callback = deep;
        deep = false;
      }
      return baseClone(value, deep, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
    }

    /**
     * Creates a deep clone of `value`. If a callback is provided it will be
     * executed to produce the cloned values. If the callback returns `undefined`
     * cloning will be handled by the method instead. The callback is bound to
     * `thisArg` and invoked with one argument; (value).
     *
     * Note: This method is loosely based on the structured clone algorithm. Functions
     * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and
     * objects created by constructors other than `Object` are cloned to plain `Object` objects.
     * See http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to deep clone.
     * @param {Function} [callback] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the deep cloned value.
     * @example
     *
     * var stooges = [
     *   { 'name': 'moe', 'age': 40 },
     *   { 'name': 'larry', 'age': 50 }
     * ];
     *
     * var deep = _.cloneDeep(stooges);
     * deep[0] === stooges[0];
     * // => false
     *
     * var view = {
     *   'label': 'docs',
     *   'node': element
     * };
     *
     * var clone = _.cloneDeep(view, function(value) {
     *   return _.isElement(value) ? value.cloneNode(true) : undefined;
     * });
     *
     * clone.node == view.node;
     * // => false
     */
    function cloneDeep(value, callback, thisArg) {
      return baseClone(value, true, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
    }

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object for all destination properties that resolve to `undefined`. Once a
     * property is set, additional defaults of the same property will be ignored.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {Object} object The destination object.
     * @param {...Object} [source] The source objects.
     * @param- {Object} [guard] Allows working with `_.reduce` without using its
     *  `key` and `object` arguments as sources.
     * @returns {Object} Returns the destination object.
     * @example
     *
     * var food = { 'name': 'apple' };
     * _.defaults(food, { 'name': 'banana', 'type': 'fruit' });
     * // => { 'name': 'apple', 'type': 'fruit' }
     */
    var defaults = function(object, source, guard) {
      var index, iterable = object, result = iterable;
      if (!iterable) return result;
      var args = arguments,
          argsIndex = 0,
          argsLength = typeof guard == 'number' ? 2 : args.length;
      while (++argsIndex < argsLength) {
        iterable = args[argsIndex];
        if (iterable && objectTypes[typeof iterable]) {
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          if (typeof result[index] == 'undefined') result[index] = iterable[index];
        }
        }
      }
      return result
    };

    /**
     * This method is like `_.findIndex` except that it returns the key of the
     * first element that passes the callback check, instead of the element itself.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [callback=identity] The function called per
     *  iteration. If a property name or object is provided it will be used to
     *  create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
     * @example
     *
     * _.findKey({ 'a': 1, 'b': 2, 'c': 3, 'd': 4 }, function(num) {
     *   return num % 2 == 0;
     * });
     * // => 'b' (property order is not guaranteed across environments)
     */
    function findKey(object, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);
      forOwn(object, function(value, key, object) {
        if (callback(value, key, object)) {
          result = key;
          return false;
        }
      });
      return result;
    }

    /**
     * This method is like `_.findKey` except that it iterates over elements
     * of a `collection` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [callback=identity] The function called per
     *  iteration. If a property name or object is provided it will be used to
     *  create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
     * @example
     *
     * _.findLastKey({ 'a': 1, 'b': 2, 'c': 3, 'd': 4 }, function(num) {
     *   return num % 2 == 1;
     * });
     * // => returns `c`, assuming `_.findKey` returns `a`
     */
    function findLastKey(object, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);
      forOwnRight(object, function(value, key, object) {
        if (callback(value, key, object)) {
          result = key;
          return false;
        }
      });
      return result;
    }

    /**
     * Iterates over own and inherited enumerable properties of an object,
     * executing the callback for each property. The callback is bound to `thisArg`
     * and invoked with three arguments; (value, key, object). Callbacks may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Dog(name) {
     *   this.name = name;
     * }
     *
     * Dog.prototype.bark = function() {
     *   console.log('Woof, woof!');
     * };
     *
     * _.forIn(new Dog('Dagny'), function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'bark' and 'name' (property order is not guaranteed across environments)
     */
    var forIn = function(collection, callback, thisArg) {
      var index, iterable = collection, result = iterable;
      if (!iterable) return result;
      if (!objectTypes[typeof iterable]) return result;
      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
        for (index in iterable) {
          if (callback(iterable[index], index, collection) === false) return result;
        }
      return result
    };

    /**
     * This method is like `_.forIn` except that it iterates over elements
     * of a `collection` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Dog(name) {
     *   this.name = name;
     * }
     *
     * Dog.prototype.bark = function() {
     *   console.log('Woof, woof!');
     * };
     *
     * _.forInRight(new Dog('Dagny'), function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'name' and 'bark' assuming `_.forIn ` logs 'bark' and 'name'
     */
    function forInRight(object, callback, thisArg) {
      var pairs = [];

      forIn(object, function(value, key) {
        pairs.push(key, value);
      });

      var length = pairs.length;
      callback = baseCreateCallback(callback, thisArg, 3);
      while (length--) {
        if (callback(pairs[length--], pairs[length], object) === false) {
          break;
        }
      }
      return object;
    }

    /**
     * Iterates over own enumerable properties of an object, executing the callback
     * for each property. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, key, object). Callbacks may exit iteration early by
     * explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
     *   console.log(key);
     * });
     * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
     */
    var forOwn = function(collection, callback, thisArg) {
      var index, iterable = collection, result = iterable;
      if (!iterable) return result;
      if (!objectTypes[typeof iterable]) return result;
      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          if (callback(iterable[index], index, collection) === false) return result;
        }
      return result
    };

    /**
     * This method is like `_.forOwn` except that it iterates over elements
     * of a `collection` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.forOwnRight({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
     *   console.log(key);
     * });
     * // => logs 'length', '1', and '0' assuming `_.forOwn` logs '0', '1', and 'length'
     */
    function forOwnRight(object, callback, thisArg) {
      var props = keys(object),
          length = props.length;

      callback = baseCreateCallback(callback, thisArg, 3);
      while (length--) {
        var key = props[length];
        if (callback(object[key], key, object) === false) {
          break;
        }
      }
      return object;
    }

    /**
     * Creates a sorted array of property names of all enumerable properties,
     * own and inherited, of `object` that have function values.
     *
     * @static
     * @memberOf _
     * @alias methods
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property names that have function values.
     * @example
     *
     * _.functions(_);
     * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
     */
    function functions(object) {
      var result = [];
      forIn(object, function(value, key) {
        if (isFunction(value)) {
          result.push(key);
        }
      });
      return result.sort();
    }

    /**
     * Checks if the specified object `property` exists and is a direct property,
     * instead of an inherited property.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to check.
     * @param {string} property The property to check for.
     * @returns {boolean} Returns `true` if key is a direct property, else `false`.
     * @example
     *
     * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
     * // => true
     */
    function has(object, property) {
      return object ? hasOwnProperty.call(object, property) : false;
    }

    /**
     * Creates an object composed of the inverted keys and values of the given object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to invert.
     * @returns {Object} Returns the created inverted object.
     * @example
     *
     *  _.invert({ 'first': 'moe', 'second': 'larry' });
     * // => { 'moe': 'first', 'larry': 'second' }
     */
    function invert(object) {
      var index = -1,
          props = keys(object),
          length = props.length,
          result = {};

      while (++index < length) {
        var key = props[index];
        result[object[key]] = key;
      }
      return result;
    }

    /**
     * Checks if `value` is a boolean value.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a boolean value, else `false`.
     * @example
     *
     * _.isBoolean(null);
     * // => false
     */
    function isBoolean(value) {
      return value === true || value === false || toString.call(value) == boolClass;
    }

    /**
     * Checks if `value` is a date.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a date, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     */
    function isDate(value) {
      return value ? (typeof value == 'object' && toString.call(value) == dateClass) : false;
    }

    /**
     * Checks if `value` is a DOM element.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     */
    function isElement(value) {
      return value ? value.nodeType === 1 : false;
    }

    /**
     * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
     * length of `0` and objects with no own enumerable properties are considered
     * "empty".
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Array|Object|string} value The value to inspect.
     * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({});
     * // => true
     *
     * _.isEmpty('');
     * // => true
     */
    function isEmpty(value) {
      var result = true;
      if (!value) {
        return result;
      }
      var className = toString.call(value),
          length = value.length;

      if ((className == arrayClass || className == stringClass || className == argsClass ) ||
          (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
        return !length;
      }
      forOwn(value, function() {
        return (result = false);
      });
      return result;
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent to each other. If a callback is provided it will be executed
     * to compare values. If the callback returns `undefined` comparisons will
     * be handled by the method instead. The callback is bound to `thisArg` and
     * invoked with two arguments; (a, b).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} a The value to compare.
     * @param {*} b The other value to compare.
     * @param {Function} [callback] The function to customize comparing values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var moe = { 'name': 'moe', 'age': 40 };
     * var copy = { 'name': 'moe', 'age': 40 };
     *
     * moe == copy;
     * // => false
     *
     * _.isEqual(moe, copy);
     * // => true
     *
     * var words = ['hello', 'goodbye'];
     * var otherWords = ['hi', 'goodbye'];
     *
     * _.isEqual(words, otherWords, function(a, b) {
     *   var reGreet = /^(?:hello|hi)$/i,
     *       aGreet = _.isString(a) && reGreet.test(a),
     *       bGreet = _.isString(b) && reGreet.test(b);
     *
     *   return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
     * });
     * // => true
     */
    function isEqual(a, b, callback, thisArg) {
      return baseIsEqual(a, b, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 2));
    }

    /**
     * Checks if `value` is, or can be coerced to, a finite number.
     *
     * Note: This is not the same as native `isFinite` which will return true for
     * booleans and empty strings. See http://es5.github.io/#x15.1.2.5.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is finite, else `false`.
     * @example
     *
     * _.isFinite(-101);
     * // => true
     *
     * _.isFinite('10');
     * // => true
     *
     * _.isFinite(true);
     * // => false
     *
     * _.isFinite('');
     * // => false
     *
     * _.isFinite(Infinity);
     * // => false
     */
    function isFinite(value) {
      return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
    }

    /**
     * Checks if `value` is a function.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     */
    function isFunction(value) {
      return typeof value == 'function';
    }

    /**
     * Checks if `value` is the language type of Object.
     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(1);
     * // => false
     */
    function isObject(value) {
      // check if the value is the ECMAScript language type of Object
      // http://es5.github.io/#x8
      // and avoid a V8 bug
      // http://code.google.com/p/v8/issues/detail?id=2291
      return !!(value && objectTypes[typeof value]);
    }

    /**
     * Checks if `value` is `NaN`.
     *
     * Note: This is not the same as native `isNaN` which will return `true` for
     * `undefined` and other non-numeric values. See http://es5.github.io/#x15.1.2.4.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
    function isNaN(value) {
      // `NaN` as a primitive is the only value that is not equal to itself
      // (perform the [[Class]] check first to avoid errors with some host objects in IE)
      return isNumber(value) && value != +value;
    }

    /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(undefined);
     * // => false
     */
    function isNull(value) {
      return value === null;
    }

    /**
     * Checks if `value` is a number.
     *
     * Note: `NaN` is considered a number. See http://es5.github.io/#x8.5.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a number, else `false`.
     * @example
     *
     * _.isNumber(8.4 * 5);
     * // => true
     */
    function isNumber(value) {
      return typeof value == 'number' || toString.call(value) == numberClass;
    }

    /**
     * Checks if `value` is an object created by the `Object` constructor.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Stooge(name, age) {
     *   this.name = name;
     *   this.age = age;
     * }
     *
     * _.isPlainObject(new Stooge('moe', 40));
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'name': 'moe', 'age': 40 });
     * // => true
     */
    var isPlainObject = function(value) {
      if (!(value && toString.call(value) == objectClass)) {
        return false;
      }
      var valueOf = value.valueOf,
          objProto = typeof valueOf == 'function' && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

      return objProto
        ? (value == objProto || getPrototypeOf(value) == objProto)
        : shimIsPlainObject(value);
    };

    /**
     * Checks if `value` is a regular expression.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a regular expression, else `false`.
     * @example
     *
     * _.isRegExp(/moe/);
     * // => true
     */
    function isRegExp(value) {
      return value ? (typeof value == 'object' && toString.call(value) == regexpClass) : false;
    }

    /**
     * Checks if `value` is a string.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a string, else `false`.
     * @example
     *
     * _.isString('moe');
     * // => true
     */
    function isString(value) {
      return typeof value == 'string' || toString.call(value) == stringClass;
    }

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     */
    function isUndefined(value) {
      return typeof value == 'undefined';
    }

    /**
     * Recursively merges own enumerable properties of the source object(s), that
     * don't resolve to `undefined` into the destination object. Subsequent sources
     * will overwrite property assignments of previous sources. If a callback is
     * provided it will be executed to produce the merged values of the destination
     * and source properties. If the callback returns `undefined` merging will
     * be handled by the method instead. The callback is bound to `thisArg` and
     * invoked with two arguments; (objectValue, sourceValue).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The destination object.
     * @param {...Object} [source] The source objects.
     * @param {Function} [callback] The function to customize merging properties.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the destination object.
     * @example
     *
     * var names = {
     *   'stooges': [
     *     { 'name': 'moe' },
     *     { 'name': 'larry' }
     *   ]
     * };
     *
     * var ages = {
     *   'stooges': [
     *     { 'age': 40 },
     *     { 'age': 50 }
     *   ]
     * };
     *
     * _.merge(names, ages);
     * // => { 'stooges': [{ 'name': 'moe', 'age': 40 }, { 'name': 'larry', 'age': 50 }] }
     *
     * var food = {
     *   'fruits': ['apple'],
     *   'vegetables': ['beet']
     * };
     *
     * var otherFood = {
     *   'fruits': ['banana'],
     *   'vegetables': ['carrot']
     * };
     *
     * _.merge(food, otherFood, function(a, b) {
     *   return _.isArray(a) ? a.concat(b) : undefined;
     * });
     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }
     */
    function merge(object) {
      var args = arguments,
          length = 2;

      if (!isObject(object)) {
        return object;
      }
      // allows working with `_.reduce` and `_.reduceRight` without using
      // their `index` and `collection` arguments
      if (typeof args[2] != 'number') {
        length = args.length;
      }
      if (length > 3 && typeof args[length - 2] == 'function') {
        var callback = baseCreateCallback(args[--length - 1], args[length--], 2);
      } else if (length > 2 && typeof args[length - 1] == 'function') {
        callback = args[--length];
      }
      var sources = nativeSlice.call(arguments, 1, length),
          index = -1,
          stackA = getArray(),
          stackB = getArray();

      while (++index < length) {
        baseMerge(object, sources[index], callback, stackA, stackB);
      }
      releaseArray(stackA);
      releaseArray(stackB);
      return object;
    }

    /**
     * Creates a shallow clone of `object` excluding the specified properties.
     * Property names may be specified as individual arguments or as arrays of
     * property names. If a callback is provided it will be executed for each
     * property of `object` omitting the properties the callback returns truey
     * for. The callback is bound to `thisArg` and invoked with three arguments;
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The source object.
     * @param {Function|...string|string[]} [callback] The properties to omit or the
     *  function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns an object without the omitted properties.
     * @example
     *
     * _.omit({ 'name': 'moe', 'age': 40 }, 'age');
     * // => { 'name': 'moe' }
     *
     * _.omit({ 'name': 'moe', 'age': 40 }, function(value) {
     *   return typeof value == 'number';
     * });
     * // => { 'name': 'moe' }
     */
    function omit(object, callback, thisArg) {
      var indexOf = getIndexOf(),
          isFunc = typeof callback == 'function',
          result = {};

      if (isFunc) {
        callback = lodash.createCallback(callback, thisArg, 3);
      } else {
        var props = baseFlatten(arguments, true, false, 1);
      }
      forIn(object, function(value, key, object) {
        if (isFunc
              ? !callback(value, key, object)
              : indexOf(props, key) < 0
            ) {
          result[key] = value;
        }
      });
      return result;
    }

    /**
     * Creates a two dimensional array of an object's key-value pairs,
     * i.e. `[[key1, value1], [key2, value2]]`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns new array of key-value pairs.
     * @example
     *
     * _.pairs({ 'moe': 30, 'larry': 40 });
     * // => [['moe', 30], ['larry', 40]] (property order is not guaranteed across environments)
     */
    function pairs(object) {
      var index = -1,
          props = keys(object),
          length = props.length,
          result = Array(length);

      while (++index < length) {
        var key = props[index];
        result[index] = [key, object[key]];
      }
      return result;
    }

    /**
     * Creates a shallow clone of `object` composed of the specified properties.
     * Property names may be specified as individual arguments or as arrays of
     * property names. If a callback is provided it will be executed for each
     * property of `object` picking the properties the callback returns truey
     * for. The callback is bound to `thisArg` and invoked with three arguments;
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The source object.
     * @param {Function|...string|string[]} [callback] The function called per
     *  iteration or property names to pick, specified as individual property
     *  names or arrays of property names.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns an object composed of the picked properties.
     * @example
     *
     * _.pick({ 'name': 'moe', '_userid': 'moe1' }, 'name');
     * // => { 'name': 'moe' }
     *
     * _.pick({ 'name': 'moe', '_userid': 'moe1' }, function(value, key) {
     *   return key.charAt(0) != '_';
     * });
     * // => { 'name': 'moe' }
     */
    function pick(object, callback, thisArg) {
      var result = {};
      if (typeof callback != 'function') {
        var index = -1,
            props = baseFlatten(arguments, true, false, 1),
            length = isObject(object) ? props.length : 0;

        while (++index < length) {
          var key = props[index];
          if (key in object) {
            result[key] = object[key];
          }
        }
      } else {
        callback = lodash.createCallback(callback, thisArg, 3);
        forIn(object, function(value, key, object) {
          if (callback(value, key, object)) {
            result[key] = value;
          }
        });
      }
      return result;
    }

    /**
     * An alternative to `_.reduce` this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its elements
     * through a callback, with each callback execution potentially mutating
     * the `accumulator` object. The callback is bound to `thisArg` and invoked
     * with four arguments; (accumulator, value, key, object). Callbacks may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var squares = _.transform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(result, num) {
     *   num *= num;
     *   if (num % 2) {
     *     return result.push(num) < 3;
     *   }
     * });
     * // => [1, 9, 25]
     *
     * var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
     *   result[key] = num * 3;
     * });
     * // => { 'a': 3, 'b': 6, 'c': 9 }
     */
    function transform(object, callback, accumulator, thisArg) {
      var isArr = isArray(object);
      callback = baseCreateCallback(callback, thisArg, 4);

      if (accumulator == null) {
        if (isArr) {
          accumulator = [];
        } else {
          var ctor = object && object.constructor,
              proto = ctor && ctor.prototype;

          accumulator = createObject(proto);
        }
      }
      (isArr ? forEach : forOwn)(object, function(value, index, object) {
        return callback(accumulator, value, index, object);
      });
      return accumulator;
    }

    /**
     * Creates an array composed of the own enumerable property values of `object`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property values.
     * @example
     *
     * _.values({ 'one': 1, 'two': 2, 'three': 3 });
     * // => [1, 2, 3] (property order is not guaranteed across environments)
     */
    function values(object) {
      var index = -1,
          props = keys(object),
          length = props.length,
          result = Array(length);

      while (++index < length) {
        result[index] = object[props[index]];
      }
      return result;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates an array of elements from the specified indexes, or keys, of the
     * `collection`. Indexes may be specified as individual arguments or as arrays
     * of indexes.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {...(number|number[]|string|string[])} [index] The indexes of `collection`
     *   to retrieve, specified as individual indexes or arrays of indexes.
     * @returns {Array} Returns a new array of elements corresponding to the
     *  provided indexes.
     * @example
     *
     * _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
     * // => ['a', 'c', 'e']
     *
     * _.at(['moe', 'larry', 'curly'], 0, 2);
     * // => ['moe', 'curly']
     */
    function at(collection) {
      var args = arguments,
          index = -1,
          props = baseFlatten(args, true, false, 1),
          length = (args[2] && args[2][args[1]] === collection) ? 1 : props.length,
          result = Array(length);

      while(++index < length) {
        result[index] = collection[props[index]];
      }
      return result;
    }

    /**
     * Checks if a given value is present in a collection using strict equality
     * for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the
     * offset from the end of the collection.
     *
     * @static
     * @memberOf _
     * @alias include
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {*} target The value to check for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {boolean} Returns `true` if the `target` element is found, else `false`.
     * @example
     *
     * _.contains([1, 2, 3], 1);
     * // => true
     *
     * _.contains([1, 2, 3], 1, 2);
     * // => false
     *
     * _.contains({ 'name': 'moe', 'age': 40 }, 'moe');
     * // => true
     *
     * _.contains('curly', 'ur');
     * // => true
     */
    function contains(collection, target, fromIndex) {
      var index = -1,
          indexOf = getIndexOf(),
          length = collection ? collection.length : 0,
          result = false;

      fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;
      if (isArray(collection)) {
        result = indexOf(collection, target, fromIndex) > -1;
      } else if (typeof length == 'number') {
        result = (isString(collection) ? collection.indexOf(target, fromIndex) : indexOf(collection, target, fromIndex)) > -1;
      } else {
        forOwn(collection, function(value) {
          if (++index >= fromIndex) {
            return !(result = value === target);
          }
        });
      }
      return result;
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through the callback. The corresponding value
     * of each key is the number of times the key was returned by the callback.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(function(result, value, key) {
      (hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1);
    });

    /**
     * Checks if the given callback returns truey value for **all** elements of
     * a collection. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias all
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {boolean} Returns `true` if all elements passed the callback check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var stooges = [
     *   { 'name': 'moe', 'age': 40 },
     *   { 'name': 'larry', 'age': 50 }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.every(stooges, 'age');
     * // => true
     *
     * // using "_.where" callback shorthand
     * _.every(stooges, { 'age': 50 });
     * // => false
     */
    function every(collection, callback, thisArg) {
      var result = true;
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          if (!(result = !!callback(collection[index], index, collection))) {
            break;
          }
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          return (result = !!callback(value, index, collection));
        });
      }
      return result;
    }

    /**
     * Iterates over elements of a collection, returning an array of all elements
     * the callback returns truey for. The callback is bound to `thisArg` and
     * invoked with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias select
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of elements that passed the callback check.
     * @example
     *
     * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
     * // => [2, 4, 6]
     *
     * var food = [
     *   { 'name': 'apple',  'organic': false, 'type': 'fruit' },
     *   { 'name': 'carrot', 'organic': true,  'type': 'vegetable' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.filter(food, 'organic');
     * // => [{ 'name': 'carrot', 'organic': true, 'type': 'vegetable' }]
     *
     * // using "_.where" callback shorthand
     * _.filter(food, { 'type': 'fruit' });
     * // => [{ 'name': 'apple', 'organic': false, 'type': 'fruit' }]
     */
    function filter(collection, callback, thisArg) {
      var result = [];
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          var value = collection[index];
          if (callback(value, index, collection)) {
            result.push(value);
          }
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          if (callback(value, index, collection)) {
            result.push(value);
          }
        });
      }
      return result;
    }

    /**
     * Iterates over elements of a collection, returning the first element that
     * the callback returns truey for. The callback is bound to `thisArg` and
     * invoked with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias detect, findWhere
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the found element, else `undefined`.
     * @example
     *
     * _.find([1, 2, 3, 4], function(num) {
     *   return num % 2 == 0;
     * });
     * // => 2
     *
     * var food = [
     *   { 'name': 'apple',  'organic': false, 'type': 'fruit' },
     *   { 'name': 'banana', 'organic': true,  'type': 'fruit' },
     *   { 'name': 'beet',   'organic': false, 'type': 'vegetable' }
     * ];
     *
     * // using "_.where" callback shorthand
     * _.find(food, { 'type': 'vegetable' });
     * // => { 'name': 'beet', 'organic': false, 'type': 'vegetable' }
     *
     * // using "_.pluck" callback shorthand
     * _.find(food, 'organic');
     * // => { 'name': 'banana', 'organic': true, 'type': 'fruit' }
     */
    function find(collection, callback, thisArg) {
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          var value = collection[index];
          if (callback(value, index, collection)) {
            return value;
          }
        }
      } else {
        var result;
        forOwn(collection, function(value, index, collection) {
          if (callback(value, index, collection)) {
            result = value;
            return false;
          }
        });
        return result;
      }
    }

    /**
     * This method is like `_.find` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the found element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(num) {
     *   return num % 2 == 1;
     * });
     * // => 3
     */
    function findLast(collection, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);
      forEachRight(collection, function(value, index, collection) {
        if (callback(value, index, collection)) {
          result = value;
          return false;
        }
      });
      return result;
    }

    /**
     * Iterates over elements of a collection, executing the callback for each
     * element. The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection). Callbacks may exit iteration early by
     * explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @alias each
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
     * // => logs each number and returns '1,2,3'
     *
     * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
     * // => logs each number and returns the object (property order is not guaranteed across environments)
     */
    function forEach(collection, callback, thisArg) {
      var index = -1,
          length = collection ? collection.length : 0;

      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
      if (typeof length == 'number') {
        while (++index < length) {
          if (callback(collection[index], index, collection) === false) {
            break;
          }
        }
      } else {
        forOwn(collection, callback);
      }
      return collection;
    }

    /**
     * This method is like `_.forEach` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias eachRight
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2, 3]).forEachRight(function(num) { console.log(num); }).join(',');
     * // => logs each number from right to left and returns '3,2,1'
     */
    function forEachRight(collection, callback, thisArg) {
      var length = collection ? collection.length : 0;
      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
      if (typeof length == 'number') {
        while (length--) {
          if (callback(collection[length], length, collection) === false) {
            break;
          }
        }
      } else {
        var props = keys(collection);
        length = props.length;
        forOwn(collection, function(value, key, collection) {
          key = props ? props[--length] : --length;
          return callback(collection[key], key, collection);
        });
      }
      return collection;
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of a collection through the callback. The corresponding value
     * of each key is an array of the elements responsible for generating the key.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * _.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * // using "_.pluck" callback shorthand
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
    var groupBy = createAggregator(function(result, value, key) {
      (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value);
    });

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of the collection through the given callback. The corresponding
     * value of each key is the last element responsible for generating the key.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var keys = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.indexBy(keys, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(keys, function(key) { return String.fromCharCode(key.code); });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(stooges, function(key) { this.fromCharCode(key.code); }, String);
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     */
    var indexBy = createAggregator(function(result, value, key) {
      result[key] = value;
    });

    /**
     * Invokes the method named by `methodName` on each element in the `collection`
     * returning an array of the results of each invoked method. Additional arguments
     * will be provided to each invoked method. If `methodName` is a function it
     * will be invoked for, and `this` bound to, each element in the `collection`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|string} methodName The name of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [arg] Arguments to invoke the method with.
     * @returns {Array} Returns a new array of the results of each invoked method.
     * @example
     *
     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invoke([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    function invoke(collection, methodName) {
      var args = nativeSlice.call(arguments, 2),
          index = -1,
          isFunc = typeof methodName == 'function',
          length = collection ? collection.length : 0,
          result = Array(typeof length == 'number' ? length : 0);

      forEach(collection, function(value) {
        result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args);
      });
      return result;
    }

    /**
     * Creates an array of values by running each element in the collection
     * through the callback. The callback is bound to `thisArg` and invoked with
     * three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias collect
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of the results of each `callback` execution.
     * @example
     *
     * _.map([1, 2, 3], function(num) { return num * 3; });
     * // => [3, 6, 9]
     *
     * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
     * // => [3, 6, 9] (property order is not guaranteed across environments)
     *
     * var stooges = [
     *   { 'name': 'moe', 'age': 40 },
     *   { 'name': 'larry', 'age': 50 }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.map(stooges, 'name');
     * // => ['moe', 'larry']
     */
    function map(collection, callback, thisArg) {
      var index = -1,
          length = collection ? collection.length : 0;

      callback = lodash.createCallback(callback, thisArg, 3);
      if (typeof length == 'number') {
        var result = Array(length);
        while (++index < length) {
          result[index] = callback(collection[index], index, collection);
        }
      } else {
        result = [];
        forOwn(collection, function(value, key, collection) {
          result[++index] = callback(value, key, collection);
        });
      }
      return result;
    }

    /**
     * Retrieves the maximum value of a collection. If the collection is empty or
     * falsey `-Infinity` is returned. If a callback is provided it will be executed
     * for each value in the collection to generate the criterion by which the value
     * is ranked. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * var stooges = [
     *   { 'name': 'moe', 'age': 40 },
     *   { 'name': 'larry', 'age': 50 }
     * ];
     *
     * _.max(stooges, function(stooge) { return stooge.age; });
     * // => { 'name': 'larry', 'age': 50 };
     *
     * // using "_.pluck" callback shorthand
     * _.max(stooges, 'age');
     * // => { 'name': 'larry', 'age': 50 };
     */
    function max(collection, callback, thisArg) {
      var computed = -Infinity,
          result = computed;

      if (!callback && isArray(collection)) {
        var index = -1,
            length = collection.length;

        while (++index < length) {
          var value = collection[index];
          if (value > result) {
            result = value;
          }
        }
      } else {
        callback = (!callback && isString(collection))
          ? charAtCallback
          : lodash.createCallback(callback, thisArg, 3);

        forEach(collection, function(value, index, collection) {
          var current = callback(value, index, collection);
          if (current > computed) {
            computed = current;
            result = value;
          }
        });
      }
      return result;
    }

    /**
     * Retrieves the minimum value of a collection. If the collection is empty or
     * falsey `Infinity` is returned. If a callback is provided it will be executed
     * for each value in the collection to generate the criterion by which the value
     * is ranked. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * var stooges = [
     *   { 'name': 'moe', 'age': 40 },
     *   { 'name': 'larry', 'age': 50 }
     * ];
     *
     * _.min(stooges, function(stooge) { return stooge.age; });
     * // => { 'name': 'moe', 'age': 40 };
     *
     * // using "_.pluck" callback shorthand
     * _.min(stooges, 'age');
     * // => { 'name': 'moe', 'age': 40 };
     */
    function min(collection, callback, thisArg) {
      var computed = Infinity,
          result = computed;

      if (!callback && isArray(collection)) {
        var index = -1,
            length = collection.length;

        while (++index < length) {
          var value = collection[index];
          if (value < result) {
            result = value;
          }
        }
      } else {
        callback = (!callback && isString(collection))
          ? charAtCallback
          : lodash.createCallback(callback, thisArg, 3);

        forEach(collection, function(value, index, collection) {
          var current = callback(value, index, collection);
          if (current < computed) {
            computed = current;
            result = value;
          }
        });
      }
      return result;
    }

    /**
     * Retrieves the value of a specified property from all elements in the `collection`.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {string} property The property to pluck.
     * @returns {Array} Returns a new array of property values.
     * @example
     *
     * var stooges = [
     *   { 'name': 'moe', 'age': 40 },
     *   { 'name': 'larry', 'age': 50 }
     * ];
     *
     * _.pluck(stooges, 'name');
     * // => ['moe', 'larry']
     */
    function pluck(collection, property) {
      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        var result = Array(length);
        while (++index < length) {
          result[index] = collection[index][property];
        }
      }
      return result || map(collection, property);
    }

    /**
     * Reduces a collection to a value which is the accumulated result of running
     * each element in the collection through the callback, where each successive
     * callback execution consumes the return value of the previous execution. If
     * `accumulator` is not provided the first element of the collection will be
     * used as the initial `accumulator` value. The callback is bound to `thisArg`
     * and invoked with four arguments; (accumulator, value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @alias foldl, inject
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [accumulator] Initial value of the accumulator.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var sum = _.reduce([1, 2, 3], function(sum, num) {
     *   return sum + num;
     * });
     * // => 6
     *
     * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
     *   result[key] = num * 3;
     *   return result;
     * }, {});
     * // => { 'a': 3, 'b': 6, 'c': 9 }
     */
    function reduce(collection, callback, accumulator, thisArg) {
      if (!collection) return accumulator;
      var noaccum = arguments.length < 3;
      callback = baseCreateCallback(callback, thisArg, 4);

      var index = -1,
          length = collection.length;

      if (typeof length == 'number') {
        if (noaccum) {
          accumulator = collection[++index];
        }
        while (++index < length) {
          accumulator = callback(accumulator, collection[index], index, collection);
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          accumulator = noaccum
            ? (noaccum = false, value)
            : callback(accumulator, value, index, collection)
        });
      }
      return accumulator;
    }

    /**
     * This method is like `_.reduce` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias foldr
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [accumulator] Initial value of the accumulator.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var list = [[0, 1], [2, 3], [4, 5]];
     * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    function reduceRight(collection, callback, accumulator, thisArg) {
      var noaccum = arguments.length < 3;
      callback = baseCreateCallback(callback, thisArg, 4);
      forEachRight(collection, function(value, index, collection) {
        accumulator = noaccum
          ? (noaccum = false, value)
          : callback(accumulator, value, index, collection);
      });
      return accumulator;
    }

    /**
     * The opposite of `_.filter` this method returns the elements of a
     * collection that the callback does **not** return truey for.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of elements that failed the callback check.
     * @example
     *
     * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
     * // => [1, 3, 5]
     *
     * var food = [
     *   { 'name': 'apple',  'organic': false, 'type': 'fruit' },
     *   { 'name': 'carrot', 'organic': true,  'type': 'vegetable' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.reject(food, 'organic');
     * // => [{ 'name': 'apple', 'organic': false, 'type': 'fruit' }]
     *
     * // using "_.where" callback shorthand
     * _.reject(food, { 'type': 'fruit' });
     * // => [{ 'name': 'carrot', 'organic': true, 'type': 'vegetable' }]
     */
    function reject(collection, callback, thisArg) {
      callback = lodash.createCallback(callback, thisArg, 3);
      return filter(collection, function(value, index, collection) {
        return !callback(value, index, collection);
      });
    }

    /**
     * Retrieves a random element or `n` random elements from a collection.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to sample.
     * @param {number} [n] The number of elements to sample.
     * @param- {Object} [guard] Allows working with functions, like `_.map`,
     *  without using their `key` and `object` arguments as sources.
     * @returns {Array} Returns the random sample(s) of `collection`.
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     *
     * _.sample([1, 2, 3, 4], 2);
     * // => [3, 1]
     */
    function sample(collection, n, guard) {
      var length = collection ? collection.length : 0;
      if (typeof length != 'number') {
        collection = values(collection);
      }
      if (n == null || guard) {
        return collection ? collection[random(length - 1)] : undefined;
      }
      var result = shuffle(collection);
      result.length = nativeMin(nativeMax(0, n), result.length);
      return result;
    }

    /**
     * Creates an array of shuffled values, using a version of the Fisher-Yates
     * shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to shuffle.
     * @returns {Array} Returns a new shuffled collection.
     * @example
     *
     * _.shuffle([1, 2, 3, 4, 5, 6]);
     * // => [4, 1, 6, 3, 5, 2]
     */
    function shuffle(collection) {
      var index = -1,
          length = collection ? collection.length : 0,
          result = Array(typeof length == 'number' ? length : 0);

      forEach(collection, function(value) {
        var rand = random(++index);
        result[index] = result[rand];
        result[rand] = value;
      });
      return result;
    }

    /**
     * Gets the size of the `collection` by returning `collection.length` for arrays
     * and array-like objects or the number of own enumerable properties for objects.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns `collection.length` or number of own enumerable properties.
     * @example
     *
     * _.size([1, 2]);
     * // => 2
     *
     * _.size({ 'one': 1, 'two': 2, 'three': 3 });
     * // => 3
     *
     * _.size('curly');
     * // => 5
     */
    function size(collection) {
      var length = collection ? collection.length : 0;
      return typeof length == 'number' ? length : keys(collection).length;
    }

    /**
     * Checks if the callback returns a truey value for **any** element of a
     * collection. The function returns as soon as it finds a passing value and
     * does not iterate over the entire collection. The callback is bound to
     * `thisArg` and invoked with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias any
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {boolean} Returns `true` if any element passed the callback check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var food = [
     *   { 'name': 'apple',  'organic': false, 'type': 'fruit' },
     *   { 'name': 'carrot', 'organic': true,  'type': 'vegetable' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.some(food, 'organic');
     * // => true
     *
     * // using "_.where" callback shorthand
     * _.some(food, { 'type': 'meat' });
     * // => false
     */
    function some(collection, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          if ((result = callback(collection[index], index, collection))) {
            break;
          }
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          return !(result = callback(value, index, collection));
        });
      }
      return !!result;
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection through the callback. This method
     * performs a stable sort, that is, it will preserve the original sort order
     * of equal elements. The callback is bound to `thisArg` and invoked with
     * three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of sorted elements.
     * @example
     *
     * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
     * // => [3, 1, 2]
     *
     * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
     * // => [3, 1, 2]
     *
     * // using "_.pluck" callback shorthand
     * _.sortBy(['banana', 'strawberry', 'apple'], 'length');
     * // => ['apple', 'banana', 'strawberry']
     */
    function sortBy(collection, callback, thisArg) {
      var index = -1,
          length = collection ? collection.length : 0,
          result = Array(typeof length == 'number' ? length : 0);

      callback = lodash.createCallback(callback, thisArg, 3);
      forEach(collection, function(value, key, collection) {
        var object = result[++index] = getObject();
        object.criteria = callback(value, key, collection);
        object.index = index;
        object.value = value;
      });

      length = result.length;
      result.sort(compareAscending);
      while (length--) {
        var object = result[length];
        result[length] = object.value;
        releaseObject(object);
      }
      return result;
    }

    /**
     * Converts the `collection` to an array.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to convert.
     * @returns {Array} Returns the new converted array.
     * @example
     *
     * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
     * // => [2, 3, 4]
     */
    function toArray(collection) {
      if (collection && typeof collection.length == 'number') {
        return slice(collection);
      }
      return values(collection);
    }

    /**
     * Performs a deep comparison of each element in a `collection` to the given
     * `properties` object, returning an array of all elements that have equivalent
     * property values.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Object} properties The object of property values to filter by.
     * @returns {Array} Returns a new array of elements that have the given properties.
     * @example
     *
     * var stooges = [
     *   { 'name': 'curly', 'age': 30, 'quotes': ['Oh, a wise guy, eh?', 'Poifect!'] },
     *   { 'name': 'moe', 'age': 40, 'quotes': ['Spread out!', 'You knucklehead!'] }
     * ];
     *
     * _.where(stooges, { 'age': 40 });
     * // => [{ 'name': 'moe', 'age': 40, 'quotes': ['Spread out!', 'You knucklehead!'] }]
     *
     * _.where(stooges, { 'quotes': ['Poifect!'] });
     * // => [{ 'name': 'curly', 'age': 30, 'quotes': ['Oh, a wise guy, eh?', 'Poifect!'] }]
     */
    var where = filter;

    /*--------------------------------------------------------------------------*/

    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are all falsey.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to compact.
     * @returns {Array} Returns a new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array ? array.length : 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * Creates an array excluding all values of the provided arrays using strict
     * equality for comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to process.
     * @param {...Array} [array] The arrays of values to exclude.
     * @returns {Array} Returns a new array of filtered values.
     * @example
     *
     * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
     * // => [1, 3, 4]
     */
    function difference(array) {
      var index = -1,
          indexOf = getIndexOf(),
          length = array ? array.length : 0,
          seen = baseFlatten(arguments, true, true, 1),
          result = [];

      var isLarge = length >= largeArraySize && indexOf === baseIndexOf;

      if (isLarge) {
        var cache = createCache(seen);
        if (cache) {
          indexOf = cacheIndexOf;
          seen = cache;
        } else {
          isLarge = false;
        }
      }
      while (++index < length) {
        var value = array[index];
        if (indexOf(seen, value) < 0) {
          result.push(value);
        }
      }
      if (isLarge) {
        releaseObject(seen);
      }
      return result;
    }

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element that passes the callback check, instead of the element itself.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * _.findIndex(['apple', 'banana', 'beet'], function(food) {
     *   return /^b/.test(food);
     * });
     * // => 1
     */
    function findIndex(array, callback, thisArg) {
      var index = -1,
          length = array ? array.length : 0;

      callback = lodash.createCallback(callback, thisArg, 3);
      while (++index < length) {
        if (callback(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * _.findLastIndex(['apple', 'banana', 'beet'], function(food) {
     *   return /^b/.test(food);
     * });
     * // => 2
     */
    function findLastIndex(array, callback, thisArg) {
      var length = array ? array.length : 0;
      callback = lodash.createCallback(callback, thisArg, 3);
      while (length--) {
        if (callback(array[length], length, array)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * Gets the first element or first `n` elements of an array. If a callback
     * is provided elements at the beginning of the array are returned as long
     * as the callback returns truey. The callback is bound to `thisArg` and
     * invoked with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias head, take
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback] The function called
     *  per element or the number of elements to return. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the first element(s) of `array`.
     * @example
     *
     * _.first([1, 2, 3]);
     * // => 1
     *
     * _.first([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.first([1, 2, 3], function(num) {
     *   return num < 3;
     * });
     * // => [1, 2]
     *
     * var food = [
     *   { 'name': 'banana', 'organic': true },
     *   { 'name': 'beet',   'organic': false },
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.first(food, 'organic');
     * // => [{ 'name': 'banana', 'organic': true }]
     *
     * var food = [
     *   { 'name': 'apple',  'type': 'fruit' },
     *   { 'name': 'banana', 'type': 'fruit' },
     *   { 'name': 'beet',   'type': 'vegetable' }
     * ];
     *
     * // using "_.where" callback shorthand
     * _.first(food, { 'type': 'fruit' });
     * // => [{ 'name': 'apple', 'type': 'fruit' }, { 'name': 'banana', 'type': 'fruit' }]
     */
    function first(array, callback, thisArg) {
      var n = 0,
          length = array ? array.length : 0;

      if (typeof callback != 'number' && callback != null) {
        var index = -1;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (++index < length && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = callback;
        if (n == null || thisArg) {
          return array ? array[0] : undefined;
        }
      }
      return slice(array, 0, nativeMin(nativeMax(0, n), length));
    }

    /**
     * Flattens a nested array (the nesting can be to any depth). If `isShallow`
     * is truey, the array will only be flattened a single level. If a callback
     * is provided each element of the array is passed through the callback before
     * flattening. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to flatten.
     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new flattened array.
     * @example
     *
     * _.flatten([1, [2], [3, [[4]]]]);
     * // => [1, 2, 3, 4];
     *
     * _.flatten([1, [2], [3, [[4]]]], true);
     * // => [1, 2, 3, [[4]]];
     *
     * var stooges = [
     *   { 'name': 'curly', 'quotes': ['Oh, a wise guy, eh?', 'Poifect!'] },
     *   { 'name': 'moe', 'quotes': ['Spread out!', 'You knucklehead!'] }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.flatten(stooges, 'quotes');
     * // => ['Oh, a wise guy, eh?', 'Poifect!', 'Spread out!', 'You knucklehead!']
     */
    function flatten(array, isShallow, callback, thisArg) {
      // juggle arguments
      if (typeof isShallow != 'boolean' && isShallow != null) {
        thisArg = callback;
        callback = !(thisArg && thisArg[isShallow] === array) ? isShallow : null;
        isShallow = false;
      }
      if (callback != null) {
        array = map(array, callback, thisArg);
      }
      return baseFlatten(array, isShallow);
    }

    /**
     * Gets the index at which the first occurrence of `value` is found using
     * strict equality for comparisons, i.e. `===`. If the array is already sorted
     * providing `true` for `fromIndex` will run a faster binary search.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
     *  to perform a binary search on a sorted array.
     * @returns {number} Returns the index of the matched value or `-1`.
     * @example
     *
     * _.indexOf([1, 2, 3, 1, 2, 3], 2);
     * // => 1
     *
     * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
     * // => 4
     *
     * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
     * // => 2
     */
    function indexOf(array, value, fromIndex) {
      if (typeof fromIndex == 'number') {
        var length = array ? array.length : 0;
        fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0);
      } else if (fromIndex) {
        var index = sortedIndex(array, value);
        return array[index] === value ? index : -1;
      }
      return baseIndexOf(array, value, fromIndex);
    }

    /**
     * Gets all but the last element or last `n` elements of an array. If a
     * callback is provided elements at the end of the array are excluded from
     * the result as long as the callback returns truey. The callback is bound
     * to `thisArg` and invoked with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback=1] The function called
     *  per element or the number of elements to exclude. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     *
     * _.initial([1, 2, 3], 2);
     * // => [1]
     *
     * _.initial([1, 2, 3], function(num) {
     *   return num > 1;
     * });
     * // => [1]
     *
     * var food = [
     *   { 'name': 'beet',   'organic': false },
     *   { 'name': 'carrot', 'organic': true }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.initial(food, 'organic');
     * // => [{ 'name': 'beet',   'organic': false }]
     *
     * var food = [
     *   { 'name': 'banana', 'type': 'fruit' },
     *   { 'name': 'beet',   'type': 'vegetable' },
     *   { 'name': 'carrot', 'type': 'vegetable' }
     * ];
     *
     * // using "_.where" callback shorthand
     * _.initial(food, { 'type': 'vegetable' });
     * // => [{ 'name': 'banana', 'type': 'fruit' }]
     */
    function initial(array, callback, thisArg) {
      var n = 0,
          length = array ? array.length : 0;

      if (typeof callback != 'number' && callback != null) {
        var index = length;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (index-- && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = (callback == null || thisArg) ? 1 : callback || n;
      }
      return slice(array, 0, nativeMin(nativeMax(0, length - n), length));
    }

    /**
     * Creates an array of unique values present in all provided arrays using
     * strict equality for comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {...Array} [array] The arrays to inspect.
     * @returns {Array} Returns an array of composite values.
     * @example
     *
     * _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
     * // => [1, 2]
     */
    function intersection(array) {
      var args = arguments,
          argsLength = args.length,
          argsIndex = -1,
          caches = getArray(),
          index = -1,
          indexOf = getIndexOf(),
          length = array ? array.length : 0,
          result = [],
          seen = getArray();

      while (++argsIndex < argsLength) {
        var value = args[argsIndex];
        caches[argsIndex] = indexOf === baseIndexOf &&
          (value ? value.length : 0) >= largeArraySize &&
          createCache(argsIndex ? args[argsIndex] : seen);
      }
      outer:
      while (++index < length) {
        var cache = caches[0];
        value = array[index];

        if ((cache ? cacheIndexOf(cache, value) : indexOf(seen, value)) < 0) {
          argsIndex = argsLength;
          (cache || seen).push(value);
          while (--argsIndex) {
            cache = caches[argsIndex];
            if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
              continue outer;
            }
          }
          result.push(value);
        }
      }
      while (argsLength--) {
        cache = caches[argsLength];
        if (cache) {
          releaseObject(cache);
        }
      }
      releaseArray(caches);
      releaseArray(seen);
      return result;
    }

    /**
     * Gets the last element or last `n` elements of an array. If a callback is
     * provided elements at the end of the array are returned as long as the
     * callback returns truey. The callback is bound to `thisArg` and invoked
     * with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback] The function called
     *  per element or the number of elements to return. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the last element(s) of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     *
     * _.last([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.last([1, 2, 3], function(num) {
     *   return num > 1;
     * });
     * // => [2, 3]
     *
     * var food = [
     *   { 'name': 'beet',   'organic': false },
     *   { 'name': 'carrot', 'organic': true }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.last(food, 'organic');
     * // => [{ 'name': 'carrot', 'organic': true }]
     *
     * var food = [
     *   { 'name': 'banana', 'type': 'fruit' },
     *   { 'name': 'beet',   'type': 'vegetable' },
     *   { 'name': 'carrot', 'type': 'vegetable' }
     * ];
     *
     * // using "_.where" callback shorthand
     * _.last(food, { 'type': 'vegetable' });
     * // => [{ 'name': 'beet', 'type': 'vegetable' }, { 'name': 'carrot', 'type': 'vegetable' }]
     */
    function last(array, callback, thisArg) {
      var n = 0,
          length = array ? array.length : 0;

      if (typeof callback != 'number' && callback != null) {
        var index = length;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (index-- && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = callback;
        if (n == null || thisArg) {
          return array ? array[length - 1] : undefined;
        }
      }
      return slice(array, nativeMax(0, length - n));
    }

    /**
     * Gets the index at which the last occurrence of `value` is found using strict
     * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
     * as the offset from the end of the collection.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the matched value or `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
     * // => 4
     *
     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
     * // => 1
     */
    function lastIndexOf(array, value, fromIndex) {
      var index = array ? array.length : 0;
      if (typeof fromIndex == 'number') {
        index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;
      }
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    /**
     * Removes all provided values from the given array using strict equality for
     * comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to modify.
     * @param {...*} [value] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3, 1, 2, 3];
     * _.pull(array, 2, 3);
     * console.log(array);
     * // => [1, 1]
     */
    function pull(array) {
      var args = arguments,
          argsIndex = 0,
          argsLength = args.length,
          length = array ? array.length : 0;

      while (++argsIndex < argsLength) {
        var index = -1,
            value = args[argsIndex];
        while (++index < length) {
          if (array[index] === value) {
            splice.call(array, index--, 1);
            length--;
          }
        }
      }
      return array;
    }

    /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to but not including `end`. If `start` is less than `stop` a
     * zero-length range is created unless a negative `step` is specified.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns a new range array.
     * @example
     *
     * _.range(10);
     * // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
     *
     * _.range(1, 11);
     * // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
     *
     * _.range(0, 30, 5);
     * // => [0, 5, 10, 15, 20, 25]
     *
     * _.range(0, -10, -1);
     * // => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
    function range(start, end, step) {
      start = +start || 0;
      step = typeof step == 'number' ? step : (+step || 1);

      if (end == null) {
        end = start;
        start = 0;
      }
      // use `Array(length)` so engines, like Chakra and V8, avoid slower modes
      // http://youtu.be/XAqIpGU8ZZk#t=17m25s
      var index = -1,
          length = nativeMax(0, ceil((end - start) / (step || 1))),
          result = Array(length);

      while (++index < length) {
        result[index] = start;
        start += step;
      }
      return result;
    }

    /**
     * Removes all elements from an array that the callback returns truey for
     * and returns an array of removed elements. The callback is bound to `thisArg`
     * and invoked with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to modify.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4, 5, 6];
     * var evens = _.remove(array, function(num) { return num % 2 == 0; });
     *
     * console.log(array);
     * // => [1, 3, 5]
     *
     * console.log(evens);
     * // => [2, 4, 6]
     */
    function remove(array, callback, thisArg) {
      var index = -1,
          length = array ? array.length : 0,
          result = [];

      callback = lodash.createCallback(callback, thisArg, 3);
      while (++index < length) {
        var value = array[index];
        if (callback(value, index, array)) {
          result.push(value);
          splice.call(array, index--, 1);
          length--;
        }
      }
      return result;
    }

    /**
     * The opposite of `_.initial` this method gets all but the first element or
     * first `n` elements of an array. If a callback function is provided elements
     * at the beginning of the array are excluded from the result as long as the
     * callback returns truey. The callback is bound to `thisArg` and invoked
     * with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias drop, tail
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback=1] The function called
     *  per element or the number of elements to exclude. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a slice of `array`.
     * @example
     *
     * _.rest([1, 2, 3]);
     * // => [2, 3]
     *
     * _.rest([1, 2, 3], 2);
     * // => [3]
     *
     * _.rest([1, 2, 3], function(num) {
     *   return num < 3;
     * });
     * // => [3]
     *
     * var food = [
     *   { 'name': 'banana', 'organic': true },
     *   { 'name': 'beet',   'organic': false },
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.rest(food, 'organic');
     * // => [{ 'name': 'beet', 'organic': false }]
     *
     * var food = [
     *   { 'name': 'apple',  'type': 'fruit' },
     *   { 'name': 'banana', 'type': 'fruit' },
     *   { 'name': 'beet',   'type': 'vegetable' }
     * ];
     *
     * // using "_.where" callback shorthand
     * _.rest(food, { 'type': 'fruit' });
     * // => [{ 'name': 'beet', 'type': 'vegetable' }]
     */
    function rest(array, callback, thisArg) {
      if (typeof callback != 'number' && callback != null) {
        var n = 0,
            index = -1,
            length = array ? array.length : 0;

        callback = lodash.createCallback(callback, thisArg, 3);
        while (++index < length && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = (callback == null || thisArg) ? 1 : nativeMax(0, callback);
      }
      return slice(array, n);
    }

    /**
     * Uses a binary search to determine the smallest index at which a value
     * should be inserted into a given sorted array in order to maintain the sort
     * order of the array. If a callback is provided it will be executed for
     * `value` and each element of `array` to compute their sort ranking. The
     * callback is bound to `thisArg` and invoked with one argument; (value).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([20, 30, 50], 40);
     * // => 2
     *
     * // using "_.pluck" callback shorthand
     * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
     * // => 2
     *
     * var dict = {
     *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
     * };
     *
     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
     *   return dict.wordToNumber[word];
     * });
     * // => 2
     *
     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
     *   return this.wordToNumber[word];
     * }, dict);
     * // => 2
     */
    function sortedIndex(array, value, callback, thisArg) {
      var low = 0,
          high = array ? array.length : low;

      // explicitly reference `identity` for better inlining in Firefox
      callback = callback ? lodash.createCallback(callback, thisArg, 1) : identity;
      value = callback(value);

      while (low < high) {
        var mid = (low + high) >>> 1;
        (callback(array[mid]) < value)
          ? low = mid + 1
          : high = mid;
      }
      return low;
    }

    /**
     * Creates an array of unique values, in order, of the provided arrays using
     * strict equality for comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {...Array} [array] The arrays to inspect.
     * @returns {Array} Returns an array of composite values.
     * @example
     *
     * _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
     * // => [1, 2, 3, 101, 10]
     */
    function union(array) {
      return baseUniq(baseFlatten(arguments, true, true));
    }

    /**
     * Creates a duplicate-value-free version of an array using strict equality
     * for comparisons, i.e. `===`. If the array is sorted, providing
     * `true` for `isSorted` will use a faster algorithm. If a callback is provided
     * each element of `array` is passed through the callback before uniqueness
     * is computed. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias unique
     * @category Arrays
     * @param {Array} array The array to process.
     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a duplicate-value-free array.
     * @example
     *
     * _.uniq([1, 2, 1, 3, 1]);
     * // => [1, 2, 3]
     *
     * _.uniq([1, 1, 2, 2, 3], true);
     * // => [1, 2, 3]
     *
     * _.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function(letter) { return letter.toLowerCase(); });
     * // => ['A', 'b', 'C']
     *
     * _.uniq([1, 2.5, 3, 1.5, 2, 3.5], function(num) { return this.floor(num); }, Math);
     * // => [1, 2.5, 3]
     *
     * // using "_.pluck" callback shorthand
     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniq(array, isSorted, callback, thisArg) {
      // juggle arguments
      if (typeof isSorted != 'boolean' && isSorted != null) {
        thisArg = callback;
        callback = !(thisArg && thisArg[isSorted] === array) ? isSorted : null;
        isSorted = false;
      }
      if (callback != null) {
        callback = lodash.createCallback(callback, thisArg, 3);
      }
      return baseUniq(array, isSorted, callback);
    }

    /**
     * Creates an array excluding all provided values using strict equality for
     * comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to filter.
     * @param {...*} [value] The values to exclude.
     * @returns {Array} Returns a new array of filtered values.
     * @example
     *
     * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
     * // => [2, 3, 4]
     */
    function without(array) {
      return difference(array, nativeSlice.call(arguments, 1));
    }

    /**
     * Creates an array of grouped elements, the first of which contains the first
     * elements of the given arrays, the second of which contains the second
     * elements of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @alias unzip
     * @category Arrays
     * @param {...Array} [array] Arrays to process.
     * @returns {Array} Returns a new array of grouped elements.
     * @example
     *
     * _.zip(['moe', 'larry'], [30, 40], [true, false]);
     * // => [['moe', 30, true], ['larry', 40, false]]
     */
    function zip() {
      var array = arguments.length > 1 ? arguments : arguments[0],
          index = -1,
          length = array ? max(pluck(array, 'length')) : 0,
          result = Array(length < 0 ? 0 : length);

      while (++index < length) {
        result[index] = pluck(array, index);
      }
      return result;
    }

    /**
     * Creates an object composed from arrays of `keys` and `values`. Provide
     * either a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`
     * or two arrays, one of `keys` and one of corresponding `values`.
     *
     * @static
     * @memberOf _
     * @alias object
     * @category Arrays
     * @param {Array} keys The array of keys.
     * @param {Array} [values=[]] The array of values.
     * @returns {Object} Returns an object composed of the given keys and
     *  corresponding values.
     * @example
     *
     * _.zipObject(['moe', 'larry'], [30, 40]);
     * // => { 'moe': 30, 'larry': 40 }
     */
    function zipObject(keys, values) {
      var index = -1,
          length = keys ? keys.length : 0,
          result = {};

      while (++index < length) {
        var key = keys[index];
        if (values) {
          result[key] = values[index];
        } else if (key) {
          result[key[0]] = key[1];
        }
      }
      return result;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a function that executes `func`, with  the `this` binding and
     * arguments of the created function, only after being called `n` times.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {number} n The number of times the function must be called before
     *  `func` is executed.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('Done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => logs 'Done saving!', after all saves have completed
     */
    function after(n, func) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }

    /**
     * Creates a function that, when called, invokes `func` with the `this`
     * binding of `thisArg` and prepends any additional `bind` arguments to those
     * provided to the bound function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to bind.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var func = function(greeting) {
     *   return greeting + ' ' + this.name;
     * };
     *
     * func = _.bind(func, { 'name': 'moe' }, 'hi');
     * func();
     * // => 'hi moe'
     */
    function bind(func, thisArg) {
      return arguments.length > 2
        ? createBound(func, 17, nativeSlice.call(arguments, 2), null, thisArg)
        : createBound(func, 1, null, null, thisArg);
    }

    /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method. Method names may be specified as individual arguments or as arrays
     * of method names. If no method names are provided all the function properties
     * of `object` will be bound.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...string} [methodName] The object method names to
     *  bind, specified as individual method names or arrays of method names.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *  'label': 'docs',
     *  'onClick': function() { console.log('clicked ' + this.label); }
     * };
     *
     * _.bindAll(view);
     * jQuery('#docs').on('click', view.onClick);
     * // => logs 'clicked docs', when the button is clicked
     */
    function bindAll(object) {
      var funcs = arguments.length > 1 ? baseFlatten(arguments, true, false, 1) : functions(object),
          index = -1,
          length = funcs.length;

      while (++index < length) {
        var key = funcs[index];
        object[key] = createBound(object[key], 1, null, null, object);
      }
      return object;
    }

    /**
     * Creates a function that, when called, invokes the method at `object[key]`
     * and prepends any additional `bindKey` arguments to those provided to the bound
     * function. This method differs from `_.bind` by allowing bound functions to
     * reference methods that will be redefined or don't yet exist.
     * See http://michaux.ca/articles/lazy-function-definition-pattern.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Object} object The object the method belongs to.
     * @param {string} key The key of the method.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'name': 'moe',
     *   'greet': function(greeting) {
     *     return greeting + ' ' + this.name;
     *   }
     * };
     *
     * var func = _.bindKey(object, 'greet', 'hi');
     * func();
     * // => 'hi moe'
     *
     * object.greet = function(greeting) {
     *   return greeting + ', ' + this.name + '!';
     * };
     *
     * func();
     * // => 'hi, moe!'
     */
    function bindKey(object, key) {
      return arguments.length > 2
        ? createBound(key, 19, nativeSlice.call(arguments, 2), null, object)
        : createBound(key, 3, null, null, object);
    }

    /**
     * Creates a function that is the composition of the provided functions,
     * where each function consumes the return value of the function that follows.
     * For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
     * Each function is executed with the `this` binding of the composed function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {...Function} [func] Functions to compose.
     * @returns {Function} Returns the new composed function.
     * @example
     *
     * var realNameMap = {
     *   'curly': 'jerome'
     * };
     *
     * var format = function(name) {
     *   name = realNameMap[name.toLowerCase()] || name;
     *   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
     * };
     *
     * var greet = function(formatted) {
     *   return 'Hiya ' + formatted + '!';
     * };
     *
     * var welcome = _.compose(greet, format);
     * welcome('curly');
     * // => 'Hiya Jerome!'
     */
    function compose() {
      var funcs = arguments,
          length = funcs.length;

      while (length--) {
        if (!isFunction(funcs[length])) {
          throw new TypeError;
        }
      }
      return function() {
        var args = arguments,
            length = funcs.length;

        while (length--) {
          args = [funcs[length].apply(this, args)];
        }
        return args[0];
      };
    }

    /**
     * Produces a callback bound to an optional `thisArg`. If `func` is a property
     * name the created callback will return the property value for a given element.
     * If `func` is an object the created callback will return `true` for elements
     * that contain the equivalent object properties, otherwise it will return `false`.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {*} [func=identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of the created callback.
     * @param {number} [argCount] The number of arguments the callback accepts.
     * @returns {Function} Returns a callback function.
     * @example
     *
     * var stooges = [
     *   { 'name': 'moe', 'age': 40 },
     *   { 'name': 'larry', 'age': 50 }
     * ];
     *
     * // wrap to create custom callback shorthands
     * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
     *   return !match ? func(callback, thisArg) : function(object) {
     *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
     *   };
     * });
     *
     * _.filter(stooges, 'age__gt45');
     * // => [{ 'name': 'larry', 'age': 50 }]
     */
    function createCallback(func, thisArg, argCount) {
      var type = typeof func;
      if (func == null || type == 'function') {
        return baseCreateCallback(func, thisArg, argCount);
      }
      // handle "_.pluck" style callback shorthands
      if (type != 'object') {
        return function(object) {
          return object[func];
        };
      }
      var props = keys(func),
          key = props[0],
          a = func[key];

      // handle "_.where" style callback shorthands
      if (props.length == 1 && a === a && !isObject(a)) {
        // fast path the common case of providing an object with a single
        // property containing a primitive value
        return function(object) {
          var b = object[key];
          return a === b && (a !== 0 || (1 / a == 1 / b));
        };
      }
      return function(object) {
        var length = props.length,
            result = false;

        while (length--) {
          if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) {
            break;
          }
        }
        return result;
      };
    }

    /**
     * Creates a function which accepts one or more arguments of `func` that when
     * invoked either executes `func` returning its result, if all `func` arguments
     * have been provided, or returns a function that accepts one or more of the
     * remaining `func` arguments, and so on. The arity of `func` can be specified
     * if `func.length` is not sufficient.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var curried = _.curry(function(a, b, c) {
     *   console.log(a + b + c);
     * });
     *
     * curried(1)(2)(3);
     * // => 6
     *
     * curried(1, 2)(3);
     * // => 6
     *
     * curried(1, 2, 3);
     * // => 6
     */
    function curry(func, arity) {
      arity = typeof arity == 'number' ? arity : (+arity || func.length);
      return createBound(func, 4, null, null, null, arity);
    }

    /**
     * Creates a function that will delay the execution of `func` until after
     * `wait` milliseconds have elapsed since the last time it was invoked.
     * Provide an options object to indicate that `func` should be invoked on
     * the leading and/or trailing edge of the `wait` timeout. Subsequent calls
     * to the debounced function will return the result of the last `func` call.
     *
     * Note: If `leading` and `trailing` options are `true` `func` will be called
     * on the trailing edge of the timeout only if the the debounced function is
     * invoked more than once during the `wait` timeout.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to debounce.
     * @param {number} wait The number of milliseconds to delay.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.
     * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.
     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // avoid costly calculations while the window size is in flux
     * var lazyLayout = _.debounce(calculateLayout, 150);
     * jQuery(window).on('resize', lazyLayout);
     *
     * // execute `sendMail` when the click event is fired, debouncing subsequent calls
     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * });
     *
     * // ensure `batchLog` is executed once after 1 second of debounced calls
     * var source = new EventSource('/stream');
     * source.addEventListener('message', _.debounce(batchLog, 250, {
     *   'maxWait': 1000
     * }, false);
     */
    function debounce(func, wait, options) {
      var args,
          maxTimeoutId,
          result,
          stamp,
          thisArg,
          timeoutId,
          trailingCall,
          lastCalled = 0,
          maxWait = false,
          trailing = true;

      if (!isFunction(func)) {
        throw new TypeError;
      }
      wait = nativeMax(0, wait) || 0;
      if (options === true) {
        var leading = true;
        trailing = false;
      } else if (isObject(options)) {
        leading = options.leading;
        maxWait = 'maxWait' in options && (nativeMax(wait, options.maxWait) || 0);
        trailing = 'trailing' in options ? options.trailing : trailing;
      }
      var delayed = function() {
        var remaining = wait - (now() - stamp);
        if (remaining <= 0) {
          if (maxTimeoutId) {
            clearTimeout(maxTimeoutId);
          }
          var isCalled = trailingCall;
          maxTimeoutId = timeoutId = trailingCall = undefined;
          if (isCalled) {
            lastCalled = now();
            result = func.apply(thisArg, args);
          }
        } else {
          timeoutId = setTimeout(delayed, remaining);
        }
      };

      var maxDelayed = function() {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        maxTimeoutId = timeoutId = trailingCall = undefined;
        if (trailing || (maxWait !== wait)) {
          lastCalled = now();
          result = func.apply(thisArg, args);
        }
      };

      return function() {
        args = arguments;
        stamp = now();
        thisArg = this;
        trailingCall = trailing && (timeoutId || !leading);

        if (maxWait === false) {
          var leadingCall = leading && !timeoutId;
        } else {
          if (!maxTimeoutId && !leading) {
            lastCalled = stamp;
          }
          var remaining = maxWait - (stamp - lastCalled);
          if (remaining <= 0) {
            if (maxTimeoutId) {
              maxTimeoutId = clearTimeout(maxTimeoutId);
            }
            lastCalled = stamp;
            result = func.apply(thisArg, args);
          }
          else if (!maxTimeoutId) {
            maxTimeoutId = setTimeout(maxDelayed, remaining);
          }
        }
        if (!timeoutId && wait !== maxWait) {
          timeoutId = setTimeout(delayed, wait);
        }
        if (leadingCall) {
          result = func.apply(thisArg, args);
        }
        return result;
      };
    }

    /**
     * Defers executing the `func` function until the current call stack has cleared.
     * Additional arguments will be provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to defer.
     * @param {...*} [arg] Arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function() { console.log('deferred'); });
     * // returns from the function before 'deferred' is logged
     */
    function defer(func) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      var args = nativeSlice.call(arguments, 1);
      return setTimeout(function() { func.apply(undefined, args); }, 1);
    }
    // use `setImmediate` if available in Node.js
    if (isV8 && moduleExports && typeof setImmediate == 'function') {
      defer = function(func) {
        if (!isFunction(func)) {
          throw new TypeError;
        }
        return setImmediate.apply(context, arguments);
      };
    }

    /**
     * Executes the `func` function after `wait` milliseconds. Additional arguments
     * will be provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay execution.
     * @param {...*} [arg] Arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * var log = _.bind(console.log, console);
     * _.delay(log, 1000, 'logged later');
     * // => 'logged later' (Appears after one second.)
     */
    function delay(func, wait) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      var args = nativeSlice.call(arguments, 2);
      return setTimeout(function() { func.apply(undefined, args); }, wait);
    }

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided it will be used to determine the cache key for storing the result
     * based on the arguments provided to the memoized function. By default, the
     * first argument provided to the memoized function is used as the cache key.
     * The `func` is executed with the `this` binding of the memoized function.
     * The result cache is exposed as the `cache` property on the memoized function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] A function used to resolve the cache key.
     * @returns {Function} Returns the new memoizing function.
     * @example
     *
     * var fibonacci = _.memoize(function(n) {
     *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
     * });
     *
     * var data = {
     *   'moe': { 'name': 'moe', 'age': 40 },
     *   'curly': { 'name': 'curly', 'age': 60 }
     * };
     *
     * // modifying the result cache
     * var stooge = _.memoize(function(name) { return data[name]; }, _.identity);
     * stooge('curly');
     * // => { 'name': 'curly', 'age': 60 }
     *
     * stooge.cache.curly.name = 'jerome';
     * stooge('curly');
     * // => { 'name': 'jerome', 'age': 60 }
     */
    function memoize(func, resolver) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      var memoized = function() {
        var cache = memoized.cache,
            key = resolver ? resolver.apply(this, arguments) : keyPrefix + arguments[0];

        return hasOwnProperty.call(cache, key)
          ? cache[key]
          : (cache[key] = func.apply(this, arguments));
      }
      memoized.cache = {};
      return memoized;
    }

    /**
     * Creates a function that is restricted to execute `func` once. Repeat calls to
     * the function will return the value of the first call. The `func` is executed
     * with the `this` binding of the created function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // `initialize` executes `createApplication` once
     */
    function once(func) {
      var ran,
          result;

      if (!isFunction(func)) {
        throw new TypeError;
      }
      return function() {
        if (ran) {
          return result;
        }
        ran = true;
        result = func.apply(this, arguments);

        // clear the `func` variable so the function may be garbage collected
        func = null;
        return result;
      };
    }

    /**
     * Creates a function that, when called, invokes `func` with any additional
     * `partial` arguments prepended to those provided to the new function. This
     * method is similar to `_.bind` except it does **not** alter the `this` binding.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var greet = function(greeting, name) { return greeting + ' ' + name; };
     * var hi = _.partial(greet, 'hi');
     * hi('moe');
     * // => 'hi moe'
     */
    function partial(func) {
      return createBound(func, 16, nativeSlice.call(arguments, 1));
    }

    /**
     * This method is like `_.partial` except that `partial` arguments are
     * appended to those provided to the new function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var defaultsDeep = _.partialRight(_.merge, _.defaults);
     *
     * var options = {
     *   'variable': 'data',
     *   'imports': { 'jq': $ }
     * };
     *
     * defaultsDeep(options, _.templateSettings);
     *
     * options.variable
     * // => 'data'
     *
     * options.imports
     * // => { '_': _, 'jq': $ }
     */
    function partialRight(func) {
      return createBound(func, 32, null, nativeSlice.call(arguments, 1));
    }

    /**
     * Creates a function that, when executed, will only call the `func` function
     * at most once per every `wait` milliseconds. Provide an options object to
     * indicate that `func` should be invoked on the leading and/or trailing edge
     * of the `wait` timeout. Subsequent calls to the throttled function will
     * return the result of the last `func` call.
     *
     * Note: If `leading` and `trailing` options are `true` `func` will be called
     * on the trailing edge of the timeout only if the the throttled function is
     * invoked more than once during the `wait` timeout.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to throttle.
     * @param {number} wait The number of milliseconds to throttle executions to.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // avoid excessively updating the position while scrolling
     * var throttled = _.throttle(updatePosition, 100);
     * jQuery(window).on('scroll', throttled);
     *
     * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes
     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
     *   'trailing': false
     * }));
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (!isFunction(func)) {
        throw new TypeError;
      }
      if (options === false) {
        leading = false;
      } else if (isObject(options)) {
        leading = 'leading' in options ? options.leading : leading;
        trailing = 'trailing' in options ? options.trailing : trailing;
      }
      debounceOptions.leading = leading;
      debounceOptions.maxWait = wait;
      debounceOptions.trailing = trailing;

      var result = debounce(func, wait, debounceOptions);
      return result;
    }

    /**
     * Creates a function that provides `value` to the wrapper function as its
     * first argument. Additional arguments provided to the function are appended
     * to those provided to the wrapper function. The wrapper is executed with
     * the `this` binding of the created function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {*} value The value to wrap.
     * @param {Function} wrapper The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var hello = function(name) { return 'hello ' + name; };
     * hello = _.wrap(hello, function(func) {
     *   return 'before, ' + func('moe') + ', after';
     * });
     * hello();
     * // => 'before, hello moe, after'
     */
    function wrap(value, wrapper) {
      if (!isFunction(wrapper)) {
        throw new TypeError;
      }
      return function() {
        var args = [value];
        push.apply(args, arguments);
        return wrapper.apply(this, args);
      };
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
     * corresponding HTML entities.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} string The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('Moe, Larry & Curly');
     * // => 'Moe, Larry &amp; Curly'
     */
    function escape(string) {
      return string == null ? '' : String(string).replace(reUnescapedHtml, escapeHtmlChar);
    }

    /**
     * This method returns the first argument provided to it.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var moe = { 'name': 'moe' };
     * moe === _.identity(moe);
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * Adds function properties of a source object to the `lodash` function and
     * chainable wrapper.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {Object} object The object of function properties to add to `lodash`.
     * @param {Object} object The object of function properties to add to `lodash`.
     * @example
     *
     * _.mixin({
     *   'capitalize': function(string) {
     *     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
     *   }
     * });
     *
     * _.capitalize('moe');
     * // => 'Moe'
     *
     * _('moe').capitalize();
     * // => 'Moe'
     */
    function mixin(object, source) {
      var ctor = object,
          isFunc = !source || isFunction(ctor);

      if (!source) {
        ctor = lodashWrapper;
        source = object;
        object = lodash;
      }
      forEach(functions(source), function(methodName) {
        var func = object[methodName] = source[methodName];
        if (isFunc) {
          ctor.prototype[methodName] = function() {
            var value = this.__wrapped__,
                args = [value];

            push.apply(args, arguments);
            var result = func.apply(object, args);
            if (value && typeof value == 'object' && value === result) {
              return this;
            }
            result = new ctor(result);
            result.__chain__ = this.__chain__;
            return result;
          };
        }
      });
    }

    /**
     * Reverts the '_' variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
    function noConflict() {
      context._ = oldDash;
      return this;
    }

    /**
     * Converts the given value into an integer of the specified radix.
     * If `radix` is `undefined` or `0` a `radix` of `10` is used unless the
     * `value` is a hexadecimal, in which case a `radix` of `16` is used.
     *
     * Note: This method avoids differences in native ES3 and ES5 `parseInt`
     * implementations. See http://es5.github.io/#E.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} value The value to parse.
     * @param {number} [radix] The radix used to interpret the value to parse.
     * @returns {number} Returns the new integer value.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     */
    var parseInt = nativeParseInt(whitespace + '08') == 8 ? nativeParseInt : function(value, radix) {
      // Firefox and Opera still follow the ES3 specified implementation of `parseInt`
      return nativeParseInt(isString(value) ? value.replace(reLeadingSpacesAndZeros, '') : value, radix || 0);
    };

    /**
     * Produces a random number between `min` and `max` (inclusive). If only one
     * argument is provided a number between `0` and the given number will be
     * returned. If `floating` is truey or either `min` or `max` are floats a
     * floating-point number will be returned instead of an integer.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {number} [min=0] The minimum possible value.
     * @param {number} [max=1] The maximum possible value.
     * @param {boolean} [floating=false] Specify returning a floating-point number.
     * @returns {number} Returns a random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
    function random(min, max, floating) {
      var noMin = min == null,
          noMax = max == null;

      if (floating == null) {
        if (typeof min == 'boolean' && noMax) {
          floating = min;
          min = 1;
        }
        else if (!noMax && typeof max == 'boolean') {
          floating = max;
          noMax = true;
        }
      }
      if (noMin && noMax) {
        max = 1;
      }
      min = +min || 0;
      if (noMax) {
        max = min;
        min = 0;
      } else {
        max = +max || 0;
      }
      var rand = nativeRandom();
      return (floating || min % 1 || max % 1)
        ? nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand +'').length - 1)))), max)
        : min + floor(rand * (max - min + 1));
    }

    /**
     * Resolves the value of `property` on `object`. If `property` is a function
     * it will be invoked with the `this` binding of `object` and its result returned,
     * else the property value is returned. If `object` is falsey then `undefined`
     * is returned.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {Object} object The object to inspect.
     * @param {string} property The property to get the value of.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = {
     *   'cheese': 'crumpets',
     *   'stuff': function() {
     *     return 'nonsense';
     *   }
     * };
     *
     * _.result(object, 'cheese');
     * // => 'crumpets'
     *
     * _.result(object, 'stuff');
     * // => 'nonsense'
     */
    function result(object, property) {
      if (object) {
        var value = object[property];
        return isFunction(value) ? object[property]() : value;
      }
    }

    /**
     * A micro-templating method that handles arbitrary delimiters, preserves
     * whitespace, and correctly escapes quotes within interpolated code.
     *
     * Note: In the development build, `_.template` utilizes sourceURLs for easier
     * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
     *
     * For more information on precompiling templates see:
     * http://lodash.com/#custom-builds
     *
     * For more information on Chrome extension sandboxes see:
     * http://developer.chrome.com/stable/extensions/sandboxingEval.html
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} text The template text.
     * @param {Object} data The data object used to populate the text.
     * @param {Object} [options] The options object.
     * @param {RegExp} [options.escape] The "escape" delimiter.
     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
     * @param {Object} [options.imports] An object to import into the template as local variables.
     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
     * @param {string} [sourceURL] The sourceURL of the template's compiled source.
     * @param {string} [variable] The data object variable name.
     * @returns {Function|string} Returns a compiled function when no `data` object
     *  is given, else it returns the interpolated text.
     * @example
     *
     * // using the "interpolate" delimiter to create a compiled template
     * var compiled = _.template('hello <%= name %>');
     * compiled({ 'name': 'moe' });
     * // => 'hello moe'
     *
     * // using the "escape" delimiter to escape HTML in data property values
     * _.template('<b><%- value %></b>', { 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // using the "evaluate" delimiter to generate HTML
     * var list = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
     * _.template(list, { 'people': ['moe', 'larry'] });
     * // => '<li>moe</li><li>larry</li>'
     *
     * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
     * _.template('hello ${ name }', { 'name': 'curly' });
     * // => 'hello curly'
     *
     * // using the internal `print` function in "evaluate" delimiters
     * _.template('<% print("hello " + name); %>!', { 'name': 'larry' });
     * // => 'hello larry!'
     *
     * // using a custom template delimiters
     * _.templateSettings = {
     *   'interpolate': /{{([\s\S]+?)}}/g
     * };
     *
     * _.template('hello {{ name }}!', { 'name': 'mustache' });
     * // => 'hello mustache!'
     *
     * // using the `imports` option to import jQuery
     * var list = '<% $.each(people, function(name) { %><li><%- name %></li><% }); %>';
     * _.template(list, { 'people': ['moe', 'larry'] }, { 'imports': { '$': jQuery } });
     * // => '<li>moe</li><li>larry</li>'
     *
     * // using the `sourceURL` option to specify a custom sourceURL for the template
     * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
     *
     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
     * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     *   var __t, __p = '', __e = _.escape;
     *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
     *   return __p;
     * }
     *
     * // using the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and a stack trace
     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(text, data, options) {
      // based on John Resig's `tmpl` implementation
      // http://ejohn.org/blog/javascript-micro-templating/
      // and Laura Doktorova's doT.js
      // https://github.com/olado/doT
      var settings = lodash.templateSettings;
      text || (text = '');

      // avoid missing dependencies when `iteratorTemplate` is not defined
      options = defaults({}, options, settings);

      var imports = defaults({}, options.imports, settings.imports),
          importsKeys = keys(imports),
          importsValues = values(imports);

      var isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // compile the regexp to match each delimiter
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // escape characters that cannot be included in string literals
        source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // replace delimiters with snippets
        if (escapeValue) {
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // the JS engine embedded in Adobe products requires returning the `match`
        // string in order to produce the correct `offset` value
        return match;
      });

      source += "';\n";

      // if `variable` is not specified, wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain
      var variable = options.variable,
          hasVariable = variable;

      if (!hasVariable) {
        variable = 'obj';
        source = 'with (' + variable + ') {\n' + source + '\n}\n';
      }
      // cleanup code by stripping empty strings
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // frame code as the function body
      source = 'function(' + variable + ') {\n' +
        (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') +
        "var __t, __p = '', __e = _.escape" +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      // Use a sourceURL for easier debugging.
      // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
      var sourceURL = '\n/*\n//# sourceURL=' + (options.sourceURL || '/lodash/template/source[' + (templateCounter++) + ']') + '\n*/';

      try {
        var result = Function(importsKeys, 'return ' + source + sourceURL).apply(undefined, importsValues);
      } catch(e) {
        e.source = source;
        throw e;
      }
      if (data) {
        return result(data);
      }
      // provide the compiled function's source by its `toString` method, in
      // supported environments, or the `source` property as a convenience for
      // inlining compiled templates during the build process
      result.source = source;
      return result;
    }

    /**
     * Executes the callback `n` times, returning an array of the results
     * of each callback execution. The callback is bound to `thisArg` and invoked
     * with one argument; (index).
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {number} n The number of times to execute the callback.
     * @param {Function} callback The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns an array of the results of each `callback` execution.
     * @example
     *
     * var diceRolls = _.times(3, _.partial(_.random, 1, 6));
     * // => [3, 6, 4]
     *
     * _.times(3, function(n) { mage.castSpell(n); });
     * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
     *
     * _.times(3, function(n) { this.cast(n); }, mage);
     * // => also calls `mage.castSpell(n)` three times
     */
    function times(n, callback, thisArg) {
      n = (n = +n) > -1 ? n : 0;
      var index = -1,
          result = Array(n);

      callback = baseCreateCallback(callback, thisArg, 1);
      while (++index < n) {
        result[index] = callback(index);
      }
      return result;
    }

    /**
     * The inverse of `_.escape` this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their
     * corresponding characters.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} string The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('Moe, Larry &amp; Curly');
     * // => 'Moe, Larry & Curly'
     */
    function unescape(string) {
      return string == null ? '' : String(string).replace(reEscapedHtml, unescapeHtmlChar);
    }

    /**
     * Generates a unique ID. If `prefix` is provided the ID will be appended to it.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} [prefix] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
    function uniqueId(prefix) {
      var id = ++idCounter;
      return String(prefix == null ? '' : prefix) + id;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object that wraps the given value with explicit
     * method chaining enabled.
     *
     * @static
     * @memberOf _
     * @category Chaining
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the wrapper object.
     * @example
     *
     * var stooges = [
     *   { 'name': 'moe', 'age': 40 },
     *   { 'name': 'larry', 'age': 50 },
     *   { 'name': 'curly', 'age': 60 }
     * ];
     *
     * var youngest = _.chain(stooges)
     *     .sortBy('age')
     *     .map(function(stooge) { return stooge.name + ' is ' + stooge.age; })
     *     .first()
     *     .value();
     * // => 'moe is 40'
     */
    function chain(value) {
      value = new lodashWrapper(value);
      value.__chain__ = true;
      return value;
    }

    /**
     * Invokes `interceptor` with the `value` as the first argument and then
     * returns `value`. The purpose of this method is to "tap into" a method
     * chain in order to perform operations on intermediate results within
     * the chain.
     *
     * @static
     * @memberOf _
     * @category Chaining
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3, 4])
     *  .filter(function(num) { return num % 2 == 0; })
     *  .tap(function(array) { console.log(array); })
     *  .map(function(num) { return num * num; })
     *  .value();
     * // => // [2, 4] (logged)
     * // => [4, 16]
     */
    function tap(value, interceptor) {
      interceptor(value);
      return value;
    }

    /**
     * Enables explicit method chaining on the wrapper object.
     *
     * @name chain
     * @memberOf _
     * @category Chaining
     * @returns {*} Returns the wrapper object.
     * @example
     *
     * var stooges = [
     *   { 'name': 'moe', 'age': 40 },
     *   { 'name': 'larry', 'age': 50 }
     * ];
     *
     * // without explicit chaining
     * _(stooges).first();
     * // => { 'name': 'moe', 'age': 40 }
     *
     * // with explicit chaining
     * _(stooges).chain()
     *   .first()
     *   .pick('age')
     *   .value()
     * // => { 'age': 40 }
     */
    function wrapperChain() {
      this.__chain__ = true;
      return this;
    }

    /**
     * Produces the `toString` result of the wrapped value.
     *
     * @name toString
     * @memberOf _
     * @category Chaining
     * @returns {string} Returns the string result.
     * @example
     *
     * _([1, 2, 3]).toString();
     * // => '1,2,3'
     */
    function wrapperToString() {
      return String(this.__wrapped__);
    }

    /**
     * Extracts the wrapped value.
     *
     * @name valueOf
     * @memberOf _
     * @alias value
     * @category Chaining
     * @returns {*} Returns the wrapped value.
     * @example
     *
     * _([1, 2, 3]).valueOf();
     * // => [1, 2, 3]
     */
    function wrapperValueOf() {
      return this.__wrapped__;
    }

    /*--------------------------------------------------------------------------*/

    // add functions that return wrapped values when chaining
    lodash.after = after;
    lodash.assign = assign;
    lodash.at = at;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.chain = chain;
    lodash.compact = compact;
    lodash.compose = compose;
    lodash.countBy = countBy;
    lodash.createCallback = createCallback;
    lodash.curry = curry;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.filter = filter;
    lodash.flatten = flatten;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.forOwn = forOwn;
    lodash.forOwnRight = forOwnRight;
    lodash.functions = functions;
    lodash.groupBy = groupBy;
    lodash.indexBy = indexBy;
    lodash.initial = initial;
    lodash.intersection = intersection;
    lodash.invert = invert;
    lodash.invoke = invoke;
    lodash.keys = keys;
    lodash.map = map;
    lodash.max = max;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.min = min;
    lodash.omit = omit;
    lodash.once = once;
    lodash.pairs = pairs;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.pick = pick;
    lodash.pluck = pluck;
    lodash.pull = pull;
    lodash.range = range;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.shuffle = shuffle;
    lodash.sortBy = sortBy;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.times = times;
    lodash.toArray = toArray;
    lodash.transform = transform;
    lodash.union = union;
    lodash.uniq = uniq;
    lodash.values = values;
    lodash.where = where;
    lodash.without = without;
    lodash.wrap = wrap;
    lodash.zip = zip;
    lodash.zipObject = zipObject;

    // add aliases
    lodash.collect = map;
    lodash.drop = rest;
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.extend = assign;
    lodash.methods = functions;
    lodash.object = zipObject;
    lodash.select = filter;
    lodash.tail = rest;
    lodash.unique = uniq;
    lodash.unzip = zip;

    // add functions to `lodash.prototype`
    mixin(lodash);

    /*--------------------------------------------------------------------------*/

    // add functions that return unwrapped values when chaining
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.contains = contains;
    lodash.escape = escape;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.has = has;
    lodash.identity = identity;
    lodash.indexOf = indexOf;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isBoolean = isBoolean;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isNaN = isNaN;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isString = isString;
    lodash.isUndefined = isUndefined;
    lodash.lastIndexOf = lastIndexOf;
    lodash.mixin = mixin;
    lodash.noConflict = noConflict;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.result = result;
    lodash.runInContext = runInContext;
    lodash.size = size;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.template = template;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;

    // add aliases
    lodash.all = every;
    lodash.any = some;
    lodash.detect = find;
    lodash.findWhere = find;
    lodash.foldl = reduce;
    lodash.foldr = reduceRight;
    lodash.include = contains;
    lodash.inject = reduce;

    forOwn(lodash, function(func, methodName) {
      if (!lodash.prototype[methodName]) {
        lodash.prototype[methodName] = function() {
          var args = [this.__wrapped__],
              chainAll = this.__chain__;

          push.apply(args, arguments);
          var result = func.apply(lodash, args);
          return chainAll
            ? new lodashWrapper(result, chainAll)
            : result;
        };
      }
    });

    /*--------------------------------------------------------------------------*/

    // add functions capable of returning wrapped and unwrapped values when chaining
    lodash.first = first;
    lodash.last = last;
    lodash.sample = sample;

    // add aliases
    lodash.take = first;
    lodash.head = first;

    forOwn(lodash, function(func, methodName) {
      var callbackable = methodName !== 'sample';
      if (!lodash.prototype[methodName]) {
        lodash.prototype[methodName]= function(n, guard) {
          var chainAll = this.__chain__,
              result = func(this.__wrapped__, n, guard);

          return !chainAll && (n == null || (guard && !(callbackable && typeof n == 'function')))
            ? result
            : new lodashWrapper(result, chainAll);
        };
      }
    });

    /*--------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type string
     */
    lodash.VERSION = '2.2.1';

    // add "Chaining" functions to the wrapper
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.toString = wrapperToString;
    lodash.prototype.value = wrapperValueOf;
    lodash.prototype.valueOf = wrapperValueOf;

    // add `Array` functions that return unwrapped values
    forEach(['join', 'pop', 'shift'], function(methodName) {
      var func = arrayRef[methodName];
      lodash.prototype[methodName] = function() {
        var chainAll = this.__chain__,
            result = func.apply(this.__wrapped__, arguments);

        return chainAll
          ? new lodashWrapper(result, chainAll)
          : result;
      };
    });

    // add `Array` functions that return the wrapped value
    forEach(['push', 'reverse', 'sort', 'unshift'], function(methodName) {
      var func = arrayRef[methodName];
      lodash.prototype[methodName] = function() {
        func.apply(this.__wrapped__, arguments);
        return this;
      };
    });

    // add `Array` functions that return new wrapped values
    forEach(['concat', 'slice', 'splice'], function(methodName) {
      var func = arrayRef[methodName];
      lodash.prototype[methodName] = function() {
        return new lodashWrapper(func.apply(this.__wrapped__, arguments), this.__chain__);
      };
    });

    return lodash;
  }

  /*--------------------------------------------------------------------------*/

  // expose Lo-Dash
  var _ = runInContext();

  // some AMD build optimizers, like r.js, check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lo-Dash to the global object even when an AMD loader is present in
    // case Lo-Dash was injected by a third-party script and not intended to be
    // loaded as a module. The global assignment can be reverted in the Lo-Dash
    // module by its `noConflict()` method.
    root._ = _;

    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module
    define(function() {
      return _;
    });
  }
  // check for `exports` after `define` in case a build optimizer adds an `exports` object
  else if (freeExports && freeModule) {
    // in Node.js or RingoJS
    if (moduleExports) {
      (freeModule.exports = _)._ = _;
    }
    // in Narwhal or Rhino -require
    else {
      freeExports._ = _;
    }
  }
  else {
    // in a browser or Rhino
    root._ = _;
  }
}.call(this));

},{}],72:[function(require,module,exports){
// # simple-statistics
//
// A simple, literate statistics system. The code below uses the
// [Javascript module pattern](http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth),
// eventually assigning `simple-statistics` to `ss` in browsers or the
// `exports object for node.js
(function() {
    var ss = {};

    if (typeof module !== 'undefined') {
        // Assign the `ss` object to exports, so that you can require
        // it in [node.js](http://nodejs.org/)
        exports = module.exports = ss;
    } else {
        // Otherwise, in a browser, we assign `ss` to the window object,
        // so you can simply refer to it as `ss`.
        this.ss = ss;
    }

    // # [Linear Regression](http://en.wikipedia.org/wiki/Linear_regression)
    //
    // [Simple linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression)
    // is a simple way to find a fitted line
    // between a set of coordinates.
    function linear_regression() {
        var linreg = {},
            data = [];

        // Assign data to the model. Data is assumed to be an array.
        linreg.data = function(x) {
            if (!arguments.length) return data;
            data = x.slice();
            return linreg;
        };

        // Calculate the slope and y-intercept of the regression line
        // by calculating the least sum of squares
        linreg.mb = function() {
            var m, b;

            //if there's only one point, arbitrarily choose a slope of 0
            //and a y-intercept of whatever the y of the initial point is
            if (data.length == 1) {
                m = 0;
                b = data[0][1];
            } else {
                // Initialize our sums and scope the `m` and `b`
                // variables that define the line.
                var sum_x = 0, sum_y = 0,
                    sum_xx = 0, sum_xy = 0;

                // Gather the sum of all x values, the sum of all
                // y values, and the sum of x^2 and (x*y) for each
                // value.
                //
                // In math notation, these would be SS_x, SS_y, SS_xx, and SS_xy
                for (var i = 0; i < data.length; i++) {
                    sum_x += data[i][0];
                    sum_y += data[i][1];

                    sum_xx += data[i][0] * data[i][0];
                    sum_xy += data[i][0] * data[i][1];
                }

                // `m` is the slope of the regression line
                m = ((data.length * sum_xy) - (sum_x * sum_y)) /
                    ((data.length * sum_xx) - (sum_x * sum_x));

                // `b` is the y-intercept of the line.
                b = (sum_y / data.length) - ((m * sum_x) / data.length);
            }

            // Return both values as an object.
            return { m: m, b: b };
        };

        // a shortcut for simply getting the slope of the regression line
        linreg.m = function() {
            return linreg.mb().m;
        };

        // a shortcut for simply getting the y-intercept of the regression
        // line.
        linreg.b = function() {
            return linreg.mb().b;
        };

        // ## Fitting The Regression Line
        //
        // This is called after `.data()` and returns the
        // equation `y = f(x)` which gives the position
        // of the regression line at each point in `x`.
        linreg.line = function() {

            // Get the slope, `m`, and y-intercept, `b`, of the line.
            var mb = linreg.mb(),
                m = mb.m,
                b = mb.b;

            // Return a function that computes a `y` value for each
            // x value it is given, based on the values of `b` and `a`
            // that we just computed.
            return function(x) {
                return b + (m * x);
            };
        };

        return linreg;
    }

    // # [R Squared](http://en.wikipedia.org/wiki/Coefficient_of_determination)
    //
    // The r-squared value of data compared with a function `f`
    // is the sum of the squared differences between the prediction
    // and the actual value.
    function r_squared(data, f) {
        if (data.length < 2) return 1;

        // Compute the average y value for the actual
        // data set in order to compute the
        // _total sum of squares_
        var sum = 0, average;
        for (var i = 0; i < data.length; i++) {
            sum += data[i][1];
        }
        average = sum / data.length;

        // Compute the total sum of squares - the
        // squared difference between each point
        // and the average of all points.
        var sum_of_squares = 0;
        for (var j = 0; j < data.length; j++) {
            sum_of_squares += Math.pow(average - data[j][1], 2);
        }

        // Finally estimate the error: the squared
        // difference between the estimate and the actual data
        // value at each point.
        var err = 0;
        for (var k = 0; k < data.length; k++) {
            err += Math.pow(data[k][1] - f(data[k][0]), 2);
        }

        // As the error grows larger, it's ratio to the
        // sum of squares increases and the r squared
        // value grows lower.
        return 1 - (err / sum_of_squares);
    }


    // # [Bayesian Classifier](http://en.wikipedia.org/wiki/Naive_Bayes_classifier)
    //
    // This is a naïve bayesian classifier that takes
    // singly-nested objects.
    function bayesian() {
        // The `bayes_model` object is what will be exposed
        // by this closure, with all of its extended methods, and will
        // have access to all scope variables, like `total_count`.
        var bayes_model = {},
            // The number of items that are currently
            // classified in the model
            total_count = 0,
            // Every item classified in the model
            data = {};

        // ## Train
        // Train the classifier with a new item, which has a single
        // dimension of Javascript literal keys and values.
        bayes_model.train = function(item, category) {
            // If the data object doesn't have any values
            // for this category, create a new object for it.
            if (!data[category]) data[category] = {};

            // Iterate through each key in the item.
            for (var k in item) {
                var v = item[k];
                // Initialize the nested object `data[category][k][item[k]]`
                // with an object of keys that equal 0.
                if (data[category][k] === undefined) data[category][k] = {};
                if (data[category][k][v] === undefined) data[category][k][v] = 0;

                // And increment the key for this key/value combination.
                data[category][k][item[k]]++;
            }
            // Increment the number of items classified
            total_count++;
        };

        // ## Score
        // Generate a score of how well this item matches all
        // possible categories based on its attributes
        bayes_model.score = function(item) {
            // Initialize an empty array of odds per category.
            var odds = {}, category;
            // Iterate through each key in the item,
            // then iterate through each category that has been used
            // in previous calls to `.train()`
            for (var k in item) {
                var v = item[k];
                for (category in data) {
                    // Create an empty object for storing key - value combinations
                    // for this category.
                    if (odds[category] === undefined) odds[category] = {};

                    // If this item doesn't even have a property, it counts for nothing,
                    // but if it does have the property that we're looking for from
                    // the item to categorize, it counts based on how popular it is
                    // versus the whole population.
                    if (data[category][k]) {
                        odds[category][k + '_' + v] = (data[category][k][v] || 0) / total_count;
                    } else {
                        odds[category][k + '_' + v] = 0;
                    }
                }
            }

            // Set up a new object that will contain sums of these odds by category
            var odds_sums = {};

            for (category in odds) {
                // Tally all of the odds for each category-combination pair -
                // the non-existence of a category does not add anything to the
                // score.
                for (var combination in odds[category]) {
                    if (odds_sums[category] === undefined) odds_sums[category] = 0;
                    odds_sums[category] += odds[category][combination];
                }
            }

            return odds_sums;
        };

        // Return the completed model.
        return bayes_model;
    }

    // # sum
    //
    // is simply the result of adding all numbers
    // together, starting from zero.
    //
    // This runs on `O(n)`, linear time in respect to the array
    function sum(x) {
        var value = 0;
        for (var i = 0; i < x.length; i++) {
            value += x[i];
        }
        return value;
    }

    // # mean
    //
    // is the sum over the number of values
    //
    // This runs on `O(n)`, linear time in respect to the array
    function mean(x) {
        // The mean of no numbers is null
        if (x.length === 0) return null;

        return sum(x) / x.length;
    }

    // # geometric mean
    //
    // a mean function that is more useful for numbers in different
    // ranges.
    //
    // this is the nth root of the input numbers multipled by each other
    //
    // This runs on `O(n)`, linear time in respect to the array
    function geometric_mean(x) {
        // The mean of no numbers is null
        if (x.length === 0) return null;

        // the starting value.
        var value = 1;

        for (var i = 0; i < x.length; i++) {
            // the geometric mean is only valid for positive numbers
            if (x[i] <= 0) return null;

            // repeatedly multiply the value by each number
            value *= x[i];
        }

        return Math.pow(value, 1 / x.length);
    }


    // # min
    //
    // This is simply the minimum number in the set.
    //
    // This runs on `O(n)`, linear time in respect to the array
    function min(x) {
        var value;
        for (var i = 0; i < x.length; i++) {
            // On the first iteration of this loop, min is
            // undefined and is thus made the minimum element in the array
            if (x[i] < value || value === undefined) value = x[i];
        }
        return value;
    }

    // # max
    //
    // This is simply the maximum number in the set.
    //
    // This runs on `O(n)`, linear time in respect to the array
    function max(x) {
        var value;
        for (var i = 0; i < x.length; i++) {
            // On the first iteration of this loop, max is
            // undefined and is thus made the maximum element in the array
            if (x[i] > value || value === undefined) value = x[i];
        }
        return value;
    }

    // # [variance](http://en.wikipedia.org/wiki/Variance)
    //
    // is the sum of squared deviations from the mean
    //
    // depends on `mean()`
    function variance(x) {
        // The variance of no numbers is null
        if (x.length === 0) return null;

        var mean_value = mean(x),
            deviations = [];

        // Make a list of squared deviations from the mean.
        for (var i = 0; i < x.length; i++) {
            deviations.push(Math.pow(x[i] - mean_value, 2));
        }

        // Find the mean value of that list
        return mean(deviations);
    }

    // # [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation)
    //
    // is just the square root of the variance.
    //
    // depends on `variance()`
    function standard_deviation(x) {
        // The standard deviation of no numbers is null
        if (x.length === 0) return null;

        return Math.sqrt(variance(x));
    }

    // The sum of deviations to the Nth power.
    // When n=2 it's the sum of squared deviations.
    // When n=3 it's the sum of cubed deviations.
    //
    // depends on `mean()`
    function sum_nth_power_deviations(x, n) {
        var mean_value = mean(x),
            sum = 0;

        for (var i = 0; i < x.length; i++) {
            sum += Math.pow(x[i] - mean_value, n);
        }

        return sum;
    }

    // # [variance](http://en.wikipedia.org/wiki/Variance)
    //
    // is the sum of squared deviations from the mean
    //
    // depends on `sum_nth_power_deviations`
    function sample_variance(x) {
        // The variance of no numbers is null
        if (x.length <= 1) return null;

        var sum_squared_deviations_value = sum_nth_power_deviations(x, 2);

        // Find the mean value of that list
        return sum_squared_deviations_value / (x.length - 1);
    }

    // # [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation)
    //
    // is just the square root of the variance.
    //
    // depends on `sample_variance()`
    function sample_standard_deviation(x) {
        // The standard deviation of no numbers is null
        if (x.length <= 1) return null;

        return Math.sqrt(sample_variance(x));
    }

    // # [covariance](http://en.wikipedia.org/wiki/Covariance)
    //
    // sample covariance of two datasets:
    // how much do the two datasets move together?
    // x and y are two datasets, represented as arrays of numbers.
    //
    // depends on `mean()`
    function sample_covariance(x, y) {

        // The two datasets must have the same length which must be more than 1
        if (x.length <= 1 || x.length != y.length){
          return null;
        }

        // determine the mean of each dataset so that we can judge each
        // value of the dataset fairly as the difference from the mean. this
        // way, if one dataset is [1, 2, 3] and [2, 3, 4], their covariance
        // does not suffer because of the difference in absolute values
        var xmean = mean(x),
            ymean = mean(y),
            sum = 0;

        // for each pair of values, the covariance increases when their
        // difference from the mean is associated - if both are well above
        // or if both are well below
        // the mean, the covariance increases significantly.
        for (var i = 0; i < x.length; i++){
            sum += (x[i] - xmean) * (y[i] - ymean);
        }

        // the covariance is weighted by the length of the datasets.
        return sum / (x.length - 1);
    }

    // # [correlation](http://en.wikipedia.org/wiki/Correlation_and_dependence)
    //
    // Gets a measure of how correlated two datasets are, between -1 and 1
    //
    // depends on `sample_standard_deviation()` and `sample_covariance()`
    function sample_correlation(x, y) {
        var cov = sample_covariance(x, y),
            xstd = sample_standard_deviation(x),
            ystd = sample_standard_deviation(y);

        if (cov === null || xstd === null || ystd === null) {
            return null;
        }

        return cov / xstd / ystd;
    }

    // # [median](http://en.wikipedia.org/wiki/Median)
    //
    // The middle number of a list. This is often a good indicator of 'the middle'
    // when there are outliers that skew the `mean()` value.
    function median(x) {
        // The median of an empty list is null
        if (x.length === 0) return null;

        // Sorting the array makes it easy to find the center, but
        // use `.slice()` to ensure the original array `x` is not modified
        var sorted = x.slice().sort(function (a, b) { return a - b; });

        // If the length of the list is odd, it's the central number
        if (sorted.length % 2 === 1) {
            return sorted[(sorted.length - 1) / 2];
        // Otherwise, the median is the average of the two numbers
        // at the center of the list
        } else {
            var a = sorted[(sorted.length / 2) - 1];
            var b = sorted[(sorted.length / 2)];
            return (a + b) / 2;
        }
    }

    // # [mode](http://bit.ly/W5K4Yt)
    // This implementation is inspired by [science.js](https://github.com/jasondavies/science.js/blob/master/src/stats/mode.js)
    function mode(x) {

        // Handle edge cases:
        // The median of an empty list is null
        if (x.length === 0) return null;
        else if (x.length === 1) return x[0];

        // Sorting the array lets us iterate through it below and be sure
        // that every time we see a new number it's new and we'll never
        // see the same number twice
        var sorted = x.slice().sort(function (a, b) { return a - b; });

        // This assumes it is dealing with an array of size > 1, since size
        // 0 and 1 are handled immediately. Hence it starts at index 1 in the
        // array.
        var last = sorted[0],
            // store the mode as we find new modes
            value,
            // store how many times we've seen the mode
            max_seen = 0,
            // how many times the current candidate for the mode
            // has been seen
            seen_this = 1;

        // end at sorted.length + 1 to fix the case in which the mode is
        // the highest number that occurs in the sequence. the last iteration
        // compares sorted[i], which is undefined, to the highest number
        // in the series
        for (var i = 1; i < sorted.length + 1; i++) {
            // we're seeing a new number pass by
            if (sorted[i] !== last) {
                // the last number is the new mode since we saw it more
                // often than the old one
                if (seen_this > max_seen) {
                    max_seen = seen_this;
                    seen_this = 1;
                    value = last;
                }
                last = sorted[i];
            // if this isn't a new number, it's one more occurrence of
            // the potential mode
            } else { seen_this++; }
        }
        return value;
    }

    // # [t-test](http://en.wikipedia.org/wiki/Student's_t-test)
    //
    // This is to compute a one-sample t-test, comparing the mean
    // of a sample to a known value, x.
    //
    // in this case, we're trying to determine whether the
    // population mean is equal to the value that we know, which is `x`
    // here. usually the results here are used to look up a
    // [p-value](http://en.wikipedia.org/wiki/P-value), which, for
    // a certain level of significance, will let you determine that the
    // null hypothesis can or cannot be rejected.
    //
    // Depends on `standard_deviation()` and `mean()`
    function t_test(sample, x) {
      // The mean of the sample
      var sample_mean = mean(sample);

      // The standard deviation of the sample
      var sd = standard_deviation(sample);

      // Square root the length of the sample
      var rootN = Math.sqrt(sample.length);

      // Compute the known value against the sample,
      // returning the t value
      return (sample_mean - x) / (sd / rootN);
    }

    // # quantile
    // This is a population quantile, since we assume to know the entire
    // dataset in this library. Thus I'm trying to follow the
    // [Quantiles of a Population](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population)
    // algorithm from wikipedia.
    //
    // Sample is a one-dimensional array of numbers,
    // and p is a decimal number from 0 to 1. In terms of a k/q
    // quantile, p = k/q - it's just dealing with fractions or dealing
    // with decimal values.
    function quantile(sample, p) {

        // We can't derive quantiles from an empty list
        if (sample.length === 0) return null;

        // invalid bounds. Microsoft Excel accepts 0 and 1, but
        // we won't.
        if (p >= 1 || p <= 0) return null;

        // Sort a copy of the array. We'll need a sorted array to index
        // the values in sorted order.
        var sorted = sample.slice().sort(function (a, b) { return a - b; });

        // Find a potential index in the list. In Wikipedia's terms, this
        // is I<sub>p</sub>.
        var idx = (sorted.length) * p;

        // If this isn't an integer, we'll round up to the next value in
        // the list.
        if (idx % 1 !== 0) {
            return sorted[Math.ceil(idx) - 1];
        } else if (sample.length % 2 === 0) {
            // If the list has even-length and we had an integer in the
            // first place, we'll take the average of this number
            // and the next value, if there is one
            return (sorted[idx - 1] + sorted[idx]) / 2;
        } else {
            // Finally, in the simple case of an integer value
            // with an odd-length list, return the sample value at the index.
            return sorted[idx];
        }
    }

    // # [Interquartile range](http://en.wikipedia.org/wiki/Interquartile_range)
    //
    // A measure of statistical dispersion, or how scattered, spread, or
    // concentrated a distribution is. It's computed as the difference betwen
    // the third quartile and first quartile.
    function iqr(sample){
	    // We can't derive quantiles from an empty list
        if (sample.length === 0) return null;

        // Interquartile range is the span between the upper quartile,
        // at `0.75`, and lower quartile, `0.25`
        return quantile(sample, 0.75) - quantile(sample, 0.25);
    }

    // # [Median Absolute Deviation](http://en.wikipedia.org/wiki/Median_absolute_deviation)
    //
    // The Median Absolute Deviation (MAD) is a robust measure of statistical
    // dispersion. It is more resilient to outliers than the standard deviation.
    function mad(x) {
        // The mad of nothing is null
        if (!x || x.length === 0) return null;

        var median_value = median(x),
            median_absolute_deviations = [];

        // Make a list of absolute deviations from the median
        for (var i = 0; i < x.length; i++) {
            median_absolute_deviations.push(Math.abs(x[i] - median_value));
        }

        // Find the median value of that list
        return median(median_absolute_deviations);
    }

    // ## Compute Matrices for Jenks
    //
    // Compute the matrices required for Jenks breaks. These matrices
    // can be used for any classing of data with `classes <= n_classes`
    function jenksMatrices(data, n_classes) {

        // in the original implementation, these matrices are referred to
        // as `LC` and `OP`
        //
        // * lower_class_limits (LC): optimal lower class limits
        // * variance_combinations (OP): optimal variance combinations for all classes
        var lower_class_limits = [],
            variance_combinations = [],
            // loop counters
            i, j,
            // the variance, as computed at each step in the calculation
            variance = 0;

        // Initialize and fill each matrix with zeroes
        for (i = 0; i < data.length + 1; i++) {
            var tmp1 = [], tmp2 = [];
            // despite these arrays having the same values, we need
            // to keep them separate so that changing one does not change
            // the other
            for (j = 0; j < n_classes + 1; j++) {
                tmp1.push(0);
                tmp2.push(0);
            }
            lower_class_limits.push(tmp1);
            variance_combinations.push(tmp2);
        }

        for (i = 1; i < n_classes + 1; i++) {
            lower_class_limits[1][i] = 1;
            variance_combinations[1][i] = 0;
            // in the original implementation, 9999999 is used but
            // since Javascript has `Infinity`, we use that.
            for (j = 2; j < data.length + 1; j++) {
                variance_combinations[j][i] = Infinity;
            }
        }

        for (var l = 2; l < data.length + 1; l++) {

            // `SZ` originally. this is the sum of the values seen thus
            // far when calculating variance.
            var sum = 0,
                // `ZSQ` originally. the sum of squares of values seen
                // thus far
                sum_squares = 0,
                // `WT` originally. This is the number of
                w = 0,
                // `IV` originally
                i4 = 0;

            // in several instances, you could say `Math.pow(x, 2)`
            // instead of `x * x`, but this is slower in some browsers
            // introduces an unnecessary concept.
            for (var m = 1; m < l + 1; m++) {

                // `III` originally
                var lower_class_limit = l - m + 1,
                    val = data[lower_class_limit - 1];

                // here we're estimating variance for each potential classing
                // of the data, for each potential number of classes. `w`
                // is the number of data points considered so far.
                w++;

                // increase the current sum and sum-of-squares
                sum += val;
                sum_squares += val * val;

                // the variance at this point in the sequence is the difference
                // between the sum of squares and the total x 2, over the number
                // of samples.
                variance = sum_squares - (sum * sum) / w;

                i4 = lower_class_limit - 1;

                if (i4 !== 0) {
                    for (j = 2; j < n_classes + 1; j++) {
                        // if adding this element to an existing class
                        // will increase its variance beyond the limit, break
                        // the class at this point, setting the `lower_class_limit`
                        // at this point.
                        if (variance_combinations[l][j] >=
                            (variance + variance_combinations[i4][j - 1])) {
                            lower_class_limits[l][j] = lower_class_limit;
                            variance_combinations[l][j] = variance +
                                variance_combinations[i4][j - 1];
                        }
                    }
                }
            }

            lower_class_limits[l][1] = 1;
            variance_combinations[l][1] = variance;
        }

        // return the two matrices. for just providing breaks, only
        // `lower_class_limits` is needed, but variances can be useful to
        // evaluage goodness of fit.
        return {
            lower_class_limits: lower_class_limits,
            variance_combinations: variance_combinations
        };
    }

    // ## Pull Breaks Values for Jenks
    //
    // the second part of the jenks recipe: take the calculated matrices
    // and derive an array of n breaks.
    function jenksBreaks(data, lower_class_limits, n_classes) {

        var k = data.length - 1,
            kclass = [],
            countNum = n_classes;

        // the calculation of classes will never include the upper and
        // lower bounds, so we need to explicitly set them
        kclass[n_classes] = data[data.length - 1];
        kclass[0] = data[0];

        // the lower_class_limits matrix is used as indexes into itself
        // here: the `k` variable is reused in each iteration.
        while (countNum > 1) {
            kclass[countNum - 1] = data[lower_class_limits[k][countNum] - 2];
            k = lower_class_limits[k][countNum] - 1;
            countNum--;
        }

        return kclass;
    }

    // # [Jenks natural breaks optimization](http://en.wikipedia.org/wiki/Jenks_natural_breaks_optimization)
    //
    // Implementations: [1](http://danieljlewis.org/files/2010/06/Jenks.pdf) (python),
    // [2](https://github.com/vvoovv/djeo-jenks/blob/master/main.js) (buggy),
    // [3](https://github.com/simogeo/geostats/blob/master/lib/geostats.js#L407) (works)
    //
    // Depends on `jenksBreaks()` and `jenksMatrices()`
    function jenks(data, n_classes) {

        if (n_classes > data.length) return null;

        // sort data in numerical order, since this is expected
        // by the matrices function
        data = data.slice().sort(function (a, b) { return a - b; });

        // get our basic matrices
        var matrices = jenksMatrices(data, n_classes),
            // we only need lower class limits here
            lower_class_limits = matrices.lower_class_limits;

        // extract n_classes out of the computed matrices
        return jenksBreaks(data, lower_class_limits, n_classes);

    }

    // # [Skewness](http://en.wikipedia.org/wiki/Skewness)
    //
    // A measure of the extent to which a probability distribution of a
    // real-valued random variable "leans" to one side of the mean.
    // The skewness value can be positive or negative, or even undefined.
    //
    // Implementation is based on the adjusted Fisher-Pearson standardized
    // moment coefficient, which is the version found in Excel and several
    // statistical packages including Minitab, SAS and SPSS.
    //
    // Depends on `sum_nth_power_deviations()` and `sample_standard_deviation`
    function sample_skewness(x) {
        // The skewness of less than three arguments is null
        if (x.length < 3) return null;

        var n = x.length,
            cubed_s = Math.pow(sample_standard_deviation(x), 3),
            sum_cubed_deviations = sum_nth_power_deviations(x, 3);

        return n * sum_cubed_deviations / ((n - 1) * (n - 2) * cubed_s);
    }

    // # Standard Normal Table
    // A standard normal table, also called the unit normal table or Z table,
    // is a mathematical table for the values of Φ (phi), which are the values of
    // the cumulative distribution function of the normal distribution.
    // It is used to find the probability that a statistic is observed below,
    // above, or between values on the standard normal distribution, and by
    // extension, any normal distribution.
    //
    // The probabilities are taken from http://en.wikipedia.org/wiki/Standard_normal_table
    // The table used is the cumulative, and not cumulative from 0 to mean
    // (even though the latter has 5 digits precision, instead of 4).
    var standard_normal_table = [
        /*  z      0.00    0.01    0.02    0.03    0.04    0.05    0.06    0.07    0.08    0.09 */
        /* 0.0 */ 0.5000, 0.5040, 0.5080, 0.5120, 0.5160, 0.5199, 0.5239, 0.5279, 0.5319, 0.5359,
        /* 0.1 */ 0.5398, 0.5438, 0.5478, 0.5517, 0.5557, 0.5596, 0.5636, 0.5675, 0.5714, 0.5753,
        /* 0.2 */ 0.5793, 0.5832, 0.5871, 0.5910, 0.5948, 0.5987, 0.6026, 0.6064, 0.6103, 0.6141,
        /* 0.3 */ 0.6179, 0.6217, 0.6255, 0.6293, 0.6331, 0.6368, 0.6406, 0.6443, 0.6480, 0.6517,
        /* 0.4 */ 0.6554, 0.6591, 0.6628, 0.6664, 0.6700, 0.6736, 0.6772, 0.6808, 0.6844, 0.6879,
        /* 0.5 */ 0.6915, 0.6950, 0.6985, 0.7019, 0.7054, 0.7088, 0.7123, 0.7157, 0.7190, 0.7224,
        /* 0.6 */ 0.7257, 0.7291, 0.7324, 0.7357, 0.7389, 0.7422, 0.7454, 0.7486, 0.7517, 0.7549,
        /* 0.7 */ 0.7580, 0.7611, 0.7642, 0.7673, 0.7704, 0.7734, 0.7764, 0.7794, 0.7823, 0.7852,
        /* 0.8 */ 0.7881, 0.7910, 0.7939, 0.7967, 0.7995, 0.8023, 0.8051, 0.8078, 0.8106, 0.8133,
        /* 0.9 */ 0.8159, 0.8186, 0.8212, 0.8238, 0.8264, 0.8289, 0.8315, 0.8340, 0.8365, 0.8389,
        /* 1.0 */ 0.8413, 0.8438, 0.8461, 0.8485, 0.8508, 0.8531, 0.8554, 0.8577, 0.8599, 0.8621,
        /* 1.1 */ 0.8643, 0.8665, 0.8686, 0.8708, 0.8729, 0.8749, 0.8770, 0.8790, 0.8810, 0.8830,
        /* 1.2 */ 0.8849, 0.8869, 0.8888, 0.8907, 0.8925, 0.8944, 0.8962, 0.8980, 0.8997, 0.9015,
        /* 1.3 */ 0.9032, 0.9049, 0.9066, 0.9082, 0.9099, 0.9115, 0.9131, 0.9147, 0.9162, 0.9177,
        /* 1.4 */ 0.9192, 0.9207, 0.9222, 0.9236, 0.9251, 0.9265, 0.9279, 0.9292, 0.9306, 0.9319,
        /* 1.5 */ 0.9332, 0.9345, 0.9357, 0.9370, 0.9382, 0.9394, 0.9406, 0.9418, 0.9429, 0.9441,
        /* 1.6 */ 0.9452, 0.9463, 0.9474, 0.9484, 0.9495, 0.9505, 0.9515, 0.9525, 0.9535, 0.9545,
        /* 1.7 */ 0.9554, 0.9564, 0.9573, 0.9582, 0.9591, 0.9599, 0.9608, 0.9616, 0.9625, 0.9633,
        /* 1.8 */ 0.9641, 0.9649, 0.9656, 0.9664, 0.9671, 0.9678, 0.9686, 0.9693, 0.9699, 0.9706,
        /* 1.9 */ 0.9713, 0.9719, 0.9726, 0.9732, 0.9738, 0.9744, 0.9750, 0.9756, 0.9761, 0.9767,
        /* 2.0 */ 0.9772, 0.9778, 0.9783, 0.9788, 0.9793, 0.9798, 0.9803, 0.9808, 0.9812, 0.9817,
        /* 2.1 */ 0.9821, 0.9826, 0.9830, 0.9834, 0.9838, 0.9842, 0.9846, 0.9850, 0.9854, 0.9857,
        /* 2.2 */ 0.9861, 0.9864, 0.9868, 0.9871, 0.9875, 0.9878, 0.9881, 0.9884, 0.9887, 0.9890,
        /* 2.3 */ 0.9893, 0.9896, 0.9898, 0.9901, 0.9904, 0.9906, 0.9909, 0.9911, 0.9913, 0.9916,
        /* 2.4 */ 0.9918, 0.9920, 0.9922, 0.9925, 0.9927, 0.9929, 0.9931, 0.9932, 0.9934, 0.9936,
        /* 2.5 */ 0.9938, 0.9940, 0.9941, 0.9943, 0.9945, 0.9946, 0.9948, 0.9949, 0.9951, 0.9952,
        /* 2.6 */ 0.9953, 0.9955, 0.9956, 0.9957, 0.9959, 0.9960, 0.9961, 0.9962, 0.9963, 0.9964,
        /* 2.7 */ 0.9965, 0.9966, 0.9967, 0.9968, 0.9969, 0.9970, 0.9971, 0.9972, 0.9973, 0.9974,
        /* 2.8 */ 0.9974, 0.9975, 0.9976, 0.9977, 0.9977, 0.9978, 0.9979, 0.9979, 0.9980, 0.9981,
        /* 2.9 */ 0.9981, 0.9982, 0.9982, 0.9983, 0.9984, 0.9984, 0.9985, 0.9985, 0.9986, 0.9986,
        /* 3.0 */ 0.9987, 0.9987, 0.9987, 0.9988, 0.9988, 0.9989, 0.9989, 0.9989, 0.9990, 0.9990
    ];

    // # [Cumulative Standard Normal Probability](http://en.wikipedia.org/wiki/Standard_normal_table)
    //
    // Since probability tables cannot be
    // printed for every normal distribution, as there are an infinite variety
    // of normal distributions, it is common practice to convert a normal to a
    // standard normal and then use the standard normal table to find probabilities
    function cumulative_std_normal_probability(z) {

        // Calculate the position of this value.
        var absZ = Math.abs(z),
            // Each row begins with a different
            // significant digit: 0.5, 0.6, 0.7, and so on. So the row is simply
            // this value's significant digit: 0.567 will be in row 0, so row=0,
            // 0.643 will be in row 1, so row=10.
            row = Math.floor(absZ * 10),
            column = 10 * (Math.floor(absZ * 100) / 10 - Math.floor(absZ * 100 / 10)),
            index = Math.min((row * 10) + column, standard_normal_table.length - 1);

        // The index we calculate must be in the table as a positive value,
        // but we still pay attention to whether the input is postive
        // or negative, and flip the output value as a last step.
        if (z >= 0) {
            return standard_normal_table[index];
        } else {
            // due to floating-point arithmetic, values in the table with
            // 4 significant figures can nevertheless end up as repeating
            // fractions when they're computed here.
            return (1 - standard_normal_table[index]).toFixed(4);
        }
    }

    // # [Z-Score, or Standard Score](http://en.wikipedia.org/wiki/Standard_score)
    //
    // The standard score is the number of standard deviations an observation
    // or datum is above or below the mean. Thus, a positive standard score
    // represents a datum above the mean, while a negative standard score
    // represents a datum below the mean. It is a dimensionless quantity
    // obtained by subtracting the population mean from an individual raw
    // score and then dividing the difference by the population standard
    // deviation.
    //
    // The z-score is only defined if one knows the population parameters;
    // if one only has a sample set, then the analogous computation with
    // sample mean and sample standard deviation yields the
    // Student's t-statistic.
    function z_score(x, mean, standard_deviation) {
        return (x - mean) / standard_deviation;
    }

    // # Mixin
    //
    // Mixin simple_statistics to the Array native object. This is an optional
    // feature that lets you treat simple_statistics as a native feature
    // of Javascript.
    function mixin() {
        var support = !!(Object.defineProperty && Object.defineProperties);
        if (!support) throw new Error('without defineProperty, simple-statistics cannot be mixed in');

        // only methods which work on basic arrays in a single step
        // are supported
        var arrayMethods = ['median', 'standard_deviation', 'sum',
            'mean', 'min', 'max', 'quantile', 'geometric_mean'];

        // create a closure with a method name so that a reference
        // like `arrayMethods[i]` doesn't follow the loop increment
        function wrap(method) {
            return function() {
                // cast any arguments into an array, since they're
                // natively objects
                var args = Array.prototype.slice.apply(arguments);
                // make the first argument the array itself
                args.unshift(this);
                // return the result of the ss method
                return ss[method].apply(ss, args);
            };
        }

        // for each array function, define a function off of the Array
        // prototype which automatically gets the array as the first
        // argument. We use [defineProperty](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty)
        // because it allows these properties to be non-enumerable:
        // `for (var in x)` loops will not run into problems with this
        // implementation.
        for (var i = 0; i < arrayMethods.length; i++) {
            Object.defineProperty(Array.prototype, arrayMethods[i], {
                value: wrap(arrayMethods[i]),
                configurable: true,
                enumerable: false,
                writable: true
            });
        }
    }

    ss.linear_regression = linear_regression;
    ss.standard_deviation = standard_deviation;
    ss.r_squared = r_squared;
    ss.median = median;
    ss.mean = mean;
    ss.mode = mode;
    ss.min = min;
    ss.max = max;
    ss.sum = sum;
    ss.quantile = quantile;
    ss.iqr = iqr;
    ss.mad = mad;

    ss.sample_covariance = sample_covariance;
    ss.sample_correlation = sample_correlation;
    ss.sample_variance = sample_variance;
    ss.sample_standard_deviation = sample_standard_deviation;
    ss.sample_skewness = sample_skewness;

    ss.geometric_mean = geometric_mean;
    ss.variance = variance;
    ss.t_test = t_test;

    // jenks
    ss.jenksMatrices = jenksMatrices;
    ss.jenksBreaks = jenksBreaks;
    ss.jenks = jenks;

    ss.bayesian = bayesian;

    // Normal distribution
    ss.z_score = z_score;
    ss.cumulative_std_normal_probability = cumulative_std_normal_probability;
    ss.standard_normal_table = standard_normal_table;

    // Alias this into its common name
    ss.average = mean;
    ss.interquartile_range = iqr;
    ss.mixin = mixin;
    ss.median_absolute_deviation = mad;

})(this);

},{}],73:[function(require,module,exports){
var __dirname="/node_modules/topojson";var fs = require("fs");

var topojson = module.exports = new Function("topojson", "return " + fs.readFileSync(__dirname + "/topojson.js", "utf8"))();
topojson.topology = require("./lib/topojson/topology");
topojson.simplify = require("./lib/topojson/simplify");
topojson.clockwise = require("./lib/topojson/clockwise");
topojson.filter = require("./lib/topojson/filter");
topojson.prune = require("./lib/topojson/prune");
topojson.bind = require("./lib/topojson/bind");

},{"./lib/topojson/bind":74,"./lib/topojson/clockwise":77,"./lib/topojson/filter":81,"./lib/topojson/prune":84,"./lib/topojson/simplify":86,"./lib/topojson/topology":89,"fs":101}],74:[function(require,module,exports){
var type = require("./type"),
    topojson = require("../../");

module.exports = function(topology, propertiesById) {
  var bind = type({
    geometry: function(geometry) {
      var properties0 = geometry.properties,
          properties1 = propertiesById[geometry.id];
      if (properties1) {
        if (properties0) for (var k in properties1) properties0[k] = properties1[k];
        else for (var k in properties1) { geometry.properties = properties1; break; }
      }
      this.defaults.geometry.call(this, geometry);
    },
    LineString: noop,
    MultiLineString: noop,
    Point: noop,
    MultiPoint: noop,
    Polygon: noop,
    MultiPolygon: noop
  });

  for (var key in topology.objects) {
    bind.object(topology.objects[key]);
  }
};

function noop() {}

},{"../../":73,"./type":99}],75:[function(require,module,exports){

// Computes the bounding box of the specified hash of GeoJSON objects.
module.exports = function(objects) {
  var x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity;

  function boundGeometry(geometry) {
    if (geometry && boundGeometryType.hasOwnProperty(geometry.type)) boundGeometryType[geometry.type](geometry);
  }

  var boundGeometryType = {
    GeometryCollection: function(o) { o.geometries.forEach(boundGeometry); },
    Point: function(o) { boundPoint(o.coordinates); },
    MultiPoint: function(o) { o.coordinates.forEach(boundPoint); },
    LineString: function(o) { boundLine(o.coordinates); },
    MultiLineString: function(o) { o.coordinates.forEach(boundLine); },
    Polygon: function(o) { o.coordinates.forEach(boundLine); },
    MultiPolygon: function(o) { o.coordinates.forEach(boundMultiLine); }
  };

  function boundPoint(coordinates) {
    var x = coordinates[0],
        y = coordinates[1];
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }

  function boundLine(coordinates) {
    coordinates.forEach(boundPoint);
  }

  function boundMultiLine(coordinates) {
    coordinates.forEach(boundLine);
  }

  for (var key in objects) {
    boundGeometry(objects[key]);
  }

  return [x0, y0, x1, y1];
};

},{}],76:[function(require,module,exports){
exports.name = "cartesian";
exports.formatDistance = formatDistance;
exports.ringArea = ringArea;
exports.absoluteArea = Math.abs;
exports.triangleArea = triangleArea;
exports.distance = distance;

function formatDistance(d) {
  return d.toString();
}

function ringArea(ring) {
  var i = 0,
      n = ring.length,
      area = ring[n - 1][1] * ring[0][0] - ring[n - 1][0] * ring[0][1];
  while (++i < n) {
    area += ring[i - 1][1] * ring[i][0] - ring[i - 1][0] * ring[i][1];
  }
  return -area * .5; // ensure clockwise pixel areas are positive
}

function triangleArea(triangle) {
  return Math.abs(
    (triangle[0][0] - triangle[2][0]) * (triangle[1][1] - triangle[0][1])
    - (triangle[0][0] - triangle[1][0]) * (triangle[2][1] - triangle[0][1])
  );
}

function distance(x0, y0, x1, y1) {
  var dx = x0 - x1, dy = y0 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

},{}],77:[function(require,module,exports){
var type = require("./type"),
    systems = require("./coordinate-systems"),
    topojson = require("../../");

module.exports = function(object, options) {
  if (object.type === "Topology") clockwiseTopology(object, options);
  else clockwiseGeometry(object, options);
};

function clockwiseGeometry(object, options) {
  var system = null;

  if (options)
    "coordinate-system" in options && (system = systems[options["coordinate-system"]]);

  type({
    LineString: noop,
    MultiLineString: noop,
    Point: noop,
    MultiPoint: noop,
    Polygon: function(polygon) { clockwisePolygon(polygon.coordinates); },
    MultiPolygon: function(multiPolygon) { multiPolygon.coordinates.forEach(clockwisePolygon); }
  }).object(object);

  function clockwisePolygon(rings) {
    if (rings.length && system.ringArea(r = rings[0]) < 0) r.reverse();
    for (var i = 1, n = rings.length, r; i < n; ++i) {
      if (system.ringArea(r = rings[i]) > 0) r.reverse();
    }
  }
}

function clockwiseTopology(topology, options) {
  var system = null;

  if (options)
    "coordinate-system" in options && (system = systems[options["coordinate-system"]]);

  var clockwise = type({
    LineString: noop,
    MultiLineString: noop,
    Point: noop,
    MultiPoint: noop,
    Polygon: function(polygon) { clockwisePolygon(polygon.arcs); },
    MultiPolygon: function(multiPolygon) { multiPolygon.arcs.forEach(clockwisePolygon); }
  });

  for (var key in topology.objects) {
    clockwise.object(topology.objects[key]);
  }

  function clockwisePolygon(rings) {
    if (rings.length && ringArea(r = rings[0]) < 0) reverse(r);
    for (var i = 1, n = rings.length, r; i < n; ++i) {
      if (ringArea(r = rings[i]) > 0) reverse(r);
    }
  }

  function ringArea(ring) {
    return system.ringArea(topojson.feature(topology, {type: "Polygon", arcs: [ring]}).geometry.coordinates[0]);
  }

  // TODO It might be slightly more compact to reverse the arc.
  function reverse(ring) {
    var i = -1, n = ring.length;
    ring.reverse();
    while (++i < n) ring[i] = ~ring[i];
  }
};

function noop() {}

},{"../../":73,"./coordinate-systems":79,"./type":99}],78:[function(require,module,exports){
// Given a hash of GeoJSON objects and an id function, invokes the id function
// to compute a new id for each object that is a feature. The function is passed
// the feature and is expected to return the new feature id, or null if the
// feature should not have an id.
module.exports = function(objects, id) {
  if (arguments.length < 2) id = function(d) { return d.id; };

  function idObject(object) {
    if (object && idObjectType.hasOwnProperty(object.type)) idObjectType[object.type](object);
  }

  function idFeature(feature) {
    var i = id(feature);
    if (i == null) delete feature.id;
    else feature.id = i;
  }

  var idObjectType = {
    Feature: idFeature,
    FeatureCollection: function(collection) { collection.features.forEach(idFeature); }
  };

  for (var key in objects) {
    idObject(objects[key]);
  }

  return objects;
};

},{}],79:[function(require,module,exports){
module.exports = {
  cartesian: require("./cartesian"),
  spherical: require("./spherical")
};

},{"./cartesian":76,"./spherical":87}],80:[function(require,module,exports){
// Given a TopoJSON topology in absolute (quantized) coordinates,
// converts to fixed-point delta encoding.
// This is a destructive operation that modifies the given topology!
module.exports = function(topology) {
  var arcs = topology.arcs,
      i = -1,
      n = arcs.length;

  while (++i < n) {
    var arc = arcs[i],
        j = 0,
        m = arc.length,
        point = arc[0],
        x0 = point[0],
        y0 = point[1],
        x1,
        y1;
    while (++j < m) {
      point = arc[j];
      x1 = point[0];
      y1 = point[1];
      arc[j] = [x1 - x0, y1 - y0];
      x0 = x1;
      y0 = y1;
    }
  }

  return topology;
};

},{}],81:[function(require,module,exports){
var type = require("./type"),
    prune = require("./prune"),
    clockwise = require("./clockwise"),
    systems = require("./coordinate-systems"),
    topojson = require("../../");

module.exports = function(topology, options) {
  var system = null,
      forceClockwise = true, // force exterior rings to be clockwise?
      minimumArea;

  if (options)
    "coordinate-system" in options && (system = systems[options["coordinate-system"]]),
    "minimum-area" in options && (minimumArea = +options["minimum-area"]),
    "force-clockwise" in options && (forceClockwise = !!options["force-clockwise"]);

  if (forceClockwise) clockwise(topology, options); // deprecated; for backwards-compatibility

  if (!(minimumArea > 0)) minimumArea = Number.MIN_VALUE;

  var filter = type({
    LineString: noop, // TODO remove empty lines
    MultiLineString: noop,
    Point: noop,
    MultiPoint: noop,
    Polygon: function(polygon) {
      polygon.arcs = polygon.arcs.filter(ringArea);
      if (!polygon.arcs.length) {
        polygon.type = null;
        delete polygon.arcs;
      }
    },
    MultiPolygon: function(multiPolygon) {
      multiPolygon.arcs = multiPolygon.arcs.map(function(polygon) {
        return polygon.filter(ringArea);
      }).filter(function(polygon) {
        return polygon.length;
      });
      if (!multiPolygon.arcs.length) {
        multiPolygon.type = null;
        delete multiPolygon.arcs;
      }
    },
    GeometryCollection: function(collection) {
      this.defaults.GeometryCollection.call(this, collection);
      collection.geometries = collection.geometries.filter(function(geometry) { return geometry.type != null; });
      if (!collection.geometries.length) {
        collection.type = null;
        delete collection.geometries;
      }
    }
  });

  for (var key in topology.objects) {
    filter.object(topology.objects[key]);
  }

  prune(topology, options);

  function ringArea(ring) {
    var topopolygon = {type: "Polygon", arcs: [ring]},
        geopolygon = topojson.feature(topology, topopolygon),
        exterior = geopolygon.geometry.coordinates[0],
        exteriorArea = system.absoluteArea(system.ringArea(exterior));
    return exteriorArea >= minimumArea;
  }
};

function noop() {}

},{"../../":73,"./clockwise":77,"./coordinate-systems":79,"./prune":84,"./type":99}],82:[function(require,module,exports){
// Given a hash of GeoJSON objects, replaces Features with geometry objects.
// This is a destructive operation that modifies the input objects!
module.exports = function(objects) {

  function geomifyObject(object) {
    return (object && geomifyObjectType.hasOwnProperty(object.type)
        ? geomifyObjectType[object.type]
        : geomifyGeometry)(object);
  }

  function geomifyFeature(feature) {
    var geometry = feature.geometry;
    if (geometry == null) {
      feature.type = null;
    } else {
      geomifyGeometry(geometry);
      feature.type = geometry.type;
      if (geometry.geometries) feature.geometries = geometry.geometries;
      else if (geometry.coordinates) feature.coordinates = geometry.coordinates;
    }
    delete feature.geometry;
    return feature;
  }

  function geomifyGeometry(geometry) {
    if (!geometry) return {type: null};
    if (geomifyGeometryType.hasOwnProperty(geometry.type)) geomifyGeometryType[geometry.type](geometry);
    return geometry;
  }

  var geomifyObjectType = {
    Feature: geomifyFeature,
    FeatureCollection: function(collection) {
      collection.type = "GeometryCollection";
      collection.geometries = collection.features;
      collection.features.forEach(geomifyFeature);
      delete collection.features;
      return collection;
    }
  };

  var geomifyGeometryType = {
    GeometryCollection: function(o) {
      var geometries = o.geometries, i = -1, n = geometries.length;
      while (++i < n) geometries[i] = geomifyGeometry(geometries[i]);
    },
    MultiPoint: function(o) {
      if (!o.coordinates.length) {
        o.type = null;
        delete o.coordinates;
      } else if (o.coordinates.length < 2) {
        o.type = "Point";
        o.coordinates = o.coordinates[0];
      }
    },
    LineString: function(o) {
      if (!o.coordinates.length) {
        o.type = null;
        delete o.coordinates;
      }
    },
    MultiLineString: function(o) {
      for (var lines = o.coordinates, i = 0, N = 0, n = lines.length; i < n; ++i) {
        var line = lines[i];
        if (line.length) lines[N++] = line;
      }
      if (!N) {
        o.type = null;
        delete o.coordinates;
      } else if (N < 2) {
        o.type = "LineString";
        o.coordinates = lines[0];
      } else {
        o.coordinates.length = N;
      }
    },
    Polygon: function(o) {
      for (var rings = o.coordinates, i = 0, N = 0, n = rings.length; i < n; ++i) {
        var ring = rings[i];
        if (ring.length) rings[N++] = ring;
      }
      if (!N) {
        o.type = null;
        delete o.coordinates;
      } else {
        o.coordinates.length = N;
      }
    },
    MultiPolygon: function(o) {
      for (var polygons = o.coordinates, j = 0, M = 0, m = polygons.length; j < m; ++j) {
        for (var rings = polygons[j], i = 0, N = 0, n = rings.length; i < n; ++i) {
          var ring = rings[i];
          if (ring.length) rings[N++] = ring;
        }
        if (N) {
          rings.length = N;
          polygons[M++] = rings;
        }
      }
      if (!M) {
        o.type = null;
        delete o.coordinates;
      } else if (M < 2) {
        o.type = "Polygon";
        o.coordinates = polygons[0];
      } else {
        polygons.length = M;
      }
    }
  };

  for (var key in objects) {
    objects[key] = geomifyObject(objects[key]);
  }

  return objects;
};

},{}],83:[function(require,module,exports){
module.exports = function(objects, filter) {

  function prefilterGeometry(geometry) {
    if (!geometry) return {type: null};
    if (prefilterGeometryType.hasOwnProperty(geometry.type)) prefilterGeometryType[geometry.type](geometry);
    return geometry;
  }

  var prefilterGeometryType = {
    GeometryCollection: function(o) {
      var geometries = o.geometries, i = -1, n = geometries.length;
      while (++i < n) geometries[i] = prefilterGeometry(geometries[i]);
    },
    Polygon: function(o) {
      for (var rings = o.coordinates, i = 0, N = 0, n = rings.length; i < n; ++i) {
        var ring = rings[i];
        if (filter(ring)) rings[N++] = ring;
      }
      if (!N) {
        o.type = null;
        delete o.coordinates;
      } else {
        o.coordinates.length = N;
      }
    },
    MultiPolygon: function(o) {
      for (var polygons = o.coordinates, j = 0, M = 0, m = polygons.length; j < m; ++j) {
        for (var rings = polygons[j], i = 0, N = 0, n = rings.length; i < n; ++i) {
          var ring = rings[i];
          if (filter(ring)) rings[N++] = ring;
        }
        if (N) {
          rings.length = N;
          polygons[M++] = rings;
        }
      }
      if (!M) {
        o.type = null;
        delete o.coordinates;
      } else if (M < 2) {
        o.type = "Polygon";
        o.coordinates = polygons[0];
      } else {
        polygons.length = M;
      }
    }
  };

  for (var key in objects) {
    objects[key] = prefilterGeometry(objects[key]);
  }

  return objects;
};

},{}],84:[function(require,module,exports){
module.exports = function(topology, options) {
  var verbose = false,
      objects = topology.objects,
      oldArcs = topology.arcs,
      oldArcCount = oldArcs.length,
      newArcs = topology.arcs = [],
      newArcCount = 0,
      newIndexByOldIndex = new Array(oldArcs.length);

  if (options)
    "verbose" in options && (verbose = !!options["verbose"]);

  function pruneGeometry(geometry) {
    if (geometry && pruneGeometryType.hasOwnProperty(geometry.type)) pruneGeometryType[geometry.type](geometry);
  }

  var pruneGeometryType = {
    GeometryCollection: function(o) { o.geometries.forEach(pruneGeometry); },
    LineString: function(o) { pruneArcs(o.arcs); },
    MultiLineString: function(o) { o.arcs.forEach(pruneArcs); },
    Polygon: function(o) { o.arcs.forEach(pruneArcs); },
    MultiPolygon: function(o) { o.arcs.forEach(pruneMultiArcs); }
  };

  function pruneArcs(arcs) {
    for (var i = 0, m = 0, n = arcs.length; i < n; ++i) {
      var oldIndex = arcs[i],
          oldReverse = oldIndex < 0 && (oldIndex = ~oldIndex, true),
          oldArc = oldArcs[oldIndex],
          newIndex;

      // Skip collapsed arc segments.
      if (oldArc.length < 3 && !oldArc[1][0] && !oldArc[1][1]) continue;

      // If this is the first instance of this arc,
      // record it under its new index.
      if ((newIndex = newIndexByOldIndex[oldIndex]) == null) {
        newIndexByOldIndex[oldIndex] = newIndex = newArcCount++;
        newArcs[newIndex] = oldArcs[oldIndex];
      }

      arcs[m++] = oldReverse ? ~newIndex : newIndex;
    }

    // If all were collapsed, restore the last arc to avoid collapsing the line.
    if (!(arcs.length = m) && n) {

      // If this is the first instance of this arc,
      // record it under its new index.
      if ((newIndex = newIndexByOldIndex[oldIndex]) == null) {
        newIndexByOldIndex[oldIndex] = newIndex = newArcCount++;
        newArcs[newIndex] = oldArcs[oldIndex];
      }

      arcs[0] = oldReverse ? ~newIndex : newIndex;
    }
  }

  function pruneMultiArcs(arcs) {
    arcs.forEach(pruneArcs);
  }

  for (var key in objects) {
    pruneGeometry(objects[key]);
  }

  if (verbose) console.warn("prune: retained " + newArcCount + " / " + oldArcCount + " arcs (" + Math.round(newArcCount / oldArcCount * 100) + "%)");

  return topology;
};

function noop() {}

},{}],85:[function(require,module,exports){
module.exports = function(objects, bbox, Q) {
  var x0 = isFinite(bbox[0]) ? bbox[0] : 0,
      y0 = isFinite(bbox[1]) ? bbox[1] : 0,
      x1 = isFinite(bbox[2]) ? bbox[2] : 0,
      y1 = isFinite(bbox[3]) ? bbox[3] : 0,
      kx = x1 - x0 ? (Q - 1) / (x1 - x0) : 1,
      ky = y1 - y0 ? (Q - 1) / (y1 - y0) : 1;

  function quantizeGeometry(geometry) {
    if (geometry && quantizeGeometryType.hasOwnProperty(geometry.type)) quantizeGeometryType[geometry.type](geometry);
  }

  var quantizeGeometryType = {
    GeometryCollection: function(o) { o.geometries.forEach(quantizeGeometry); },
    Point: function(o) { quantizePoint(o.coordinates); },
    MultiPoint: function(o) { o.coordinates.forEach(quantizePoint); },
    LineString: function(o) {
      var line = o.coordinates;
      quantizeLine(line);
      if (line.length < 2) line[1] = line[0]; // must have 2+
    },
    MultiLineString: function(o) {
      for (var lines = o.coordinates, i = 0, n = lines.length; i < n; ++i) {
        var line = lines[i];
        quantizeLine(line);
        if (line.length < 2) line[1] = line[0]; // must have 2+
      }
    },
    Polygon: function(o) {
      for (var rings = o.coordinates, i = 0, n = rings.length; i < n; ++i) {
        var ring = rings[i];
        quantizeLine(ring);
        while (ring.length < 4) ring.push(ring[0]); // must have 4+
      }
    },
    MultiPolygon: function(o) {
      for (var polygons = o.coordinates, i = 0, n = polygons.length; i < n; ++i) {
        for (var rings = polygons[i], j = 0, m = rings.length; j < m; ++j) {
          var ring = rings[j];
          quantizeLine(ring);
          while (ring.length < 4) ring.push(ring[0]); // must have 4+
        }
      }
    }
  };

  function quantizePoint(coordinates) {
    coordinates[0] = Math.round((coordinates[0] - x0) * kx);
    coordinates[1] = Math.round((coordinates[1] - y0) * ky);
  }

  function quantizeLine(coordinates) {
    var i = 0,
        j = 1,
        n = coordinates.length,
        pi = coordinates[0],
        pj,
        px = pi[0] = Math.round((pi[0] - x0) * kx),
        py = pi[1] = Math.round((pi[1] - y0) * ky),
        x,
        y;

    while (++i < n) {
      pi = coordinates[i];
      x = Math.round((pi[0] - x0) * kx);
      y = Math.round((pi[1] - y0) * ky);
      if (x !== px || y !== py) { // skip coincident points
        pj = coordinates[j++];
        pj[0] = px = x;
        pj[1] = py = y;
      }
    }

    coordinates.length = j;
  }

  for (var key in objects) {
    quantizeGeometry(objects[key]);
  }

  return {
    scale: [1 / kx, 1 / ky],
    translate: [x0, y0]
  };
};

},{}],86:[function(require,module,exports){
var topojson = require("../../"),
    systems = require("./coordinate-systems");

module.exports = function(topology, options) {
  var minimumArea = 0,
      retainProportion,
      verbose = false,
      system = null,
      N = topology.arcs.reduce(function(p, v) { return p + v.length; }, 0),
      M = 0;

  if (options)
    "minimum-area" in options && (minimumArea = +options["minimum-area"]),
    "coordinate-system" in options && (system = systems[options["coordinate-system"]]),
    "retain-proportion" in options && (retainProportion = +options["retain-proportion"]),
    "verbose" in options && (verbose = !!options["verbose"]);

  topojson.presimplify(topology, system.triangleArea);

  if (retainProportion) {
    var areas = [];
    topology.arcs.forEach(function(arc) {
      arc.forEach(function(point) {
        areas.push(point[2]);
      });
    });
    options["minimum-area"] = minimumArea = N ? areas.sort(function(a, b) { return b - a; })[Math.ceil((N - 1) * retainProportion)] : 0;
    if (verbose) console.warn("simplification: effective minimum area " + minimumArea.toPrecision(3));
  }

  topology.arcs.forEach(topology.transform ? function(arc) {
    var dx = 0,
        dy = 0, // accumulate removed points
        i = -1,
        j = -1,
        n = arc.length,
        source,
        target;

    while (++i < n) {
      source = arc[i];
      if (source[2] >= minimumArea) {
        target = arc[++j];
        target[0] = source[0] + dx;
        target[1] = source[1] + dy;
        dx = dy = 0;
      } else {
        dx += source[0];
        dy += source[1];
      }
    }

    arc.length = ++j;
  } : function(arc) {
    var i = -1,
        j = -1,
        n = arc.length,
        point;

    while (++i < n) {
      point = arc[i];
      if (point[2] >= minimumArea) {
        arc[++j] = point;
      }
    }

    arc.length = ++j;
  });

  // Remove computed area (z) for each point.
  // This is done as a separate pass because some coordinates may be shared
  // between arcs (such as the last point and first point of a cut line).
  topology.arcs.forEach(function(arc) {
    var i = -1, n = arc.length;
    while (++i < n) arc[i].length = 2;
    M += arc.length;
  });

  if (verbose) console.warn("simplification: retained " + M + " / " + N + " points (" + Math.round((M / N) * 100) + "%)");

  return topology;
};

},{"../../":73,"./coordinate-systems":79}],87:[function(require,module,exports){
var π = Math.PI,
    π_4 = π / 4,
    radians = π / 180;

exports.name = "spherical";
exports.formatDistance = formatDistance;
exports.ringArea = ringArea;
exports.absoluteArea = absoluteArea;
exports.triangleArea = triangleArea;
exports.distance = haversinDistance; // XXX why two implementations?

function formatDistance(radians) {
  var km = radians * 6371;
  return (km > 1 ? km.toFixed(3) + "km" : (km * 1000).toPrecision(3) + "m")
      + " (" + (radians * 180 / Math.PI).toPrecision(3) + "°)";
}

function ringArea(ring) {
  if (!ring.length) return 0;
  var area = 0,
      p = ring[0],
      λ = p[0] * radians,
      φ = p[1] * radians / 2 + π_4,
      λ0 = λ,
      cosφ0 = Math.cos(φ),
      sinφ0 = Math.sin(φ);

  for (var i = 1, n = ring.length; i < n; ++i) {
    p = ring[i], λ = p[0] * radians, φ = p[1] * radians / 2 + π_4;

    // Spherical excess E for a spherical triangle with vertices: south pole,
    // previous point, current point.  Uses a formula derived from Cagnoli’s
    // theorem.  See Todhunter, Spherical Trig. (1871), Sec. 103, Eq. (2).
    var dλ = λ - λ0,
        cosφ = Math.cos(φ),
        sinφ = Math.sin(φ),
        k = sinφ0 * sinφ,
        u = cosφ0 * cosφ + k * Math.cos(dλ),
        v = k * Math.sin(dλ);
    area += Math.atan2(v, u);

    // Advance the previous point.
    λ0 = λ, cosφ0 = cosφ, sinφ0 = sinφ;
  }

  return 2 * (area > π ? area - 2 * π : area < -π ? area + 2 * π : area);
}

function absoluteArea(a) {
  return a < 0 ? a + 4 * π : a;
}

function triangleArea(t) {
  var a = distance(t[0], t[1]),
      b = distance(t[1], t[2]),
      c = distance(t[2], t[0]),
      s = (a + b + c) / 2;
  return 4 * Math.atan(Math.sqrt(Math.max(0, Math.tan(s / 2) * Math.tan((s - a) / 2) * Math.tan((s - b) / 2) * Math.tan((s - c) / 2))));
}

function distance(a, b) {
  var Δλ = (b[0] - a[0]) * radians,
      sinΔλ = Math.sin(Δλ),
      cosΔλ = Math.cos(Δλ),
      sinφ0 = Math.sin(a[1] * radians),
      cosφ0 = Math.cos(a[1] * radians),
      sinφ1 = Math.sin(b[1] * radians),
      cosφ1 = Math.cos(b[1] * radians),
      _;
  return Math.atan2(Math.sqrt((_ = cosφ1 * sinΔλ) * _ + (_ = cosφ0 * sinφ1 - sinφ0 * cosφ1 * cosΔλ) * _), sinφ0 * sinφ1 + cosφ0 * cosφ1 * cosΔλ);
}

function haversinDistance(x0, y0, x1, y1) {
  x0 *= radians, y0 *= radians, x1 *= radians, y1 *= radians;
  return 2 * Math.asin(Math.sqrt(haversin(y1 - y0) + Math.cos(y0) * Math.cos(y1) * haversin(x1 - x0)));
}

function haversin(x) {
  return (x = Math.sin(x / 2)) * x;
}

},{}],88:[function(require,module,exports){
var type = require("./type");

module.exports = function(objects, transform) {
  var ε = 1e-2,
      x0 = -180, x0e = x0 + ε,
      x1 = 180, x1e = x1 - ε,
      y0 = -90, y0e = y0 + ε,
      y1 = 90, y1e = y1 - ε,
      fragments = [];

  if (transform) {
    var kx = transform.scale[0],
        ky = transform.scale[1],
        dx = transform.translate[0],
        dy = transform.translate[1];

    x0 = Math.round((x0 - dx) / kx);
    x1 = Math.round((x1 - dx) / kx);
    y0 = Math.round((y0 - dy) / ky);
    y1 = Math.round((y1 - dy) / ky);
    x0e = Math.round((x0e - dx) / kx);
    x1e = Math.round((x1e - dx) / kx);
    y0e = Math.round((y0e - dy) / ky);
    y1e = Math.round((y1e - dy) / ky);
  }

  function normalizePoint(y) {
    return y <= y0e ? [0, y0] // south pole
        : y >= y1e ? [0, y1] // north pole
        : [x0, y]; // antimeridian
  }

  var stitch = type({
    polygon: function(polygon) {
      var rings = [];

      // For each ring, detect where it crosses the antimeridian or pole.
      for (var j = 0, m = polygon.length; j < m; ++j) {
        var ring = polygon[j],
            fragments = [];

        // By default, assume that this ring doesn’t need any stitching.
        fragments.push(ring);

        for (var i = 0, n = ring.length; i < n; ++i) {
          var point = ring[i],
              x = point[0],
              y = point[1];

          // If this is an antimeridian or polar point…
          if (x <= x0e || x >= x1e || y <= y0e || y >= y1e) {

            // Advance through any antimeridian or polar points…
            for (var k = i + 1; k < n; ++k) {
              var pointk = ring[k],
                  xk = pointk[0],
                  yk = pointk[1];
              if (xk > x0e && xk < x1e && yk > y0e && yk < y1e) break;
            }

            // If this was just a single antimeridian or polar point,
            // we don’t need to cut this ring into a fragment;
            // we can just leave it as-is.
            if (k === i + 1) continue;

            // Otherwise, if this is not the first point in the ring,
            // cut the current fragment so that it ends at the current point.
            // The current point is also normalized for later joining.
            if (i) {
              var fragmentBefore = ring.slice(0, i + 1);
              fragmentBefore[fragmentBefore.length - 1] = normalizePoint(y);
              fragments[fragments.length - 1] = fragmentBefore;
            }

            // If the ring started with an antimeridian fragment,
            // we can ignore that fragment entirely.
            else {
              fragments.pop();
            }

            // If the remainder of the ring is an antimeridian fragment,
            // move on to the next ring.
            if (k >= n) break;

            // Otherwise, add the remaining ring fragment and continue.
            fragments.push(ring = ring.slice(k - 1));
            ring[0] = normalizePoint(ring[0][1]);
            i = -1;
            n = ring.length;
          }
        }

        // Now stitch the fragments back together into rings.
        // To connect the fragments start-to-end, create a simple index by end.
        var fragmentByStart = {},
            fragmentByEnd = {};

        // For each fragment…
        for (var i = 0, n = fragments.length; i < n; ++i) {
          var fragment = fragments[i],
              start = fragment[0],
              end = fragment[fragment.length - 1];

          // If this fragment is closed, add it as a standalone ring.
          if (start[0] === end[0] && start[1] === end[1]) {
            rings.push(fragment);
            fragments[i] = null;
            continue;
          }

          fragment.index = i;
          fragmentByStart[start] = fragmentByEnd[end] = fragment;
        }

        // For each open fragment…
        for (var i = 0; i < n; ++i) {
          var fragment = fragments[i];
          if (fragment) {

            var start = fragment[0],
                end = fragment[fragment.length - 1],
                startFragment = fragmentByEnd[start],
                endFragment = fragmentByStart[end];

            delete fragmentByStart[start];
            delete fragmentByEnd[end];

            // If this fragment is closed, add it as a standalone ring.
            if (start[0] === end[0] && start[1] === end[1]) {
              rings.push(fragment);
              continue;
            }

            if (startFragment) {
              delete fragmentByEnd[start];
              delete fragmentByStart[startFragment[0]];
              startFragment.pop(); // drop the shared coordinate
              fragments[startFragment.index] = null;
              fragment = startFragment.concat(fragment);

              if (startFragment === endFragment) {
                // Connect both ends to this single fragment to create a ring.
                rings.push(fragment);
              } else {
                fragment.index = n++;
                fragments.push(fragmentByStart[fragment[0]] = fragmentByEnd[fragment[fragment.length - 1]] = fragment);
              }
            } else if (endFragment) {
              delete fragmentByStart[end];
              delete fragmentByEnd[endFragment[endFragment.length - 1]];
              fragment.pop(); // drop the shared coordinate
              fragment = fragment.concat(endFragment);
              fragment.index = n++;
              fragments[endFragment.index] = null;
              fragments.push(fragmentByStart[fragment[0]] = fragmentByEnd[fragment[fragment.length - 1]] = fragment);
            } else {
              fragment.push(fragment[0]); // close ring
              rings.push(fragment);
            }
          }
        }
      }

      // Copy the rings into the target polygon.
      for (var i = 0, n = polygon.length = rings.length; i < n; ++i) {
        polygon[i] = rings[i];
      }
    }
  });

  for (var key in objects) {
    stitch.object(objects[key]);
  }
};

},{"./type":99}],89:[function(require,module,exports){
var type = require("./type"),
    stitch = require("./stitch"),
    systems = require("./coordinate-systems"),
    topologize = require("./topology/index"),
    delta = require("./delta"),
    geomify = require("./geomify"),
    prefilter = require("./prefilter"),
    quantize = require("./quantize"),
    bounds = require("./bounds"),
    computeId = require("./compute-id"),
    transformProperties = require("./transform-properties");

var ε = 1e-6;

module.exports = function(objects, options) {
  var Q = 1e4, // precision of quantization
      id = function(d) { return d.id; }, // function to compute object id
      propertyTransform = function() {}, // function to transform properties
      transform,
      minimumArea = 0,
      stitchPoles = true,
      verbose = false,
      system = null;

  if (options)
    "verbose" in options && (verbose = !!options["verbose"]),
    "stitch-poles" in options && (stitchPoles = !!options["stitch-poles"]),
    "coordinate-system" in options && (system = systems[options["coordinate-system"]]),
    "minimum-area" in options && (minimumArea = +options["minimum-area"]),
    "quantization" in options && (Q = +options["quantization"]),
    "id" in options && (id = options["id"]),
    "property-transform" in options && (propertyTransform = options["property-transform"]);

  // Compute the new feature id and transform properties.
  computeId(objects, id);
  transformProperties(objects, propertyTransform);

  // Convert to geometry objects.
  geomify(objects);

  // Compute initial bounding box.
  var bbox = bounds(objects);

  // For automatic coordinate system determination, consider the bounding box.
  var oversize = bbox[0] < -180 - ε
      || bbox[1] < -90 - ε
      || bbox[2] > 180 + ε
      || bbox[3] > 90 + ε;
  if (!system) {
    system = systems[oversize ? "cartesian" : "spherical"];
    if (options) options["coordinate-system"] = system.name;
  }

  if (system === systems.spherical) {
    if (oversize) throw new Error("spherical coordinates outside of [±180°, ±90°]");

    // When near the spherical coordinate limits, clamp to nice round values.
    // This avoids quantized coordinates that are slightly outside the limits.
    if (bbox[0] < -180 + ε) bbox[0] = -180;
    if (bbox[1] < -90 + ε) bbox[1] = -90;
    if (bbox[2] > 180 - ε) bbox[2] = 180;
    if (bbox[3] > 90 - ε) bbox[3] = 90;
  }

  if (verbose) {
    console.warn("bounds: " + bbox.join(" ") + " (" + system.name + ")");
  }

  // Filter rings smaller than the minimum area.
  // This can produce a simpler topology.
  if (minimumArea) prefilter(objects, function(ring) {
    return system.absoluteArea(system.ringArea(ring)) >= minimumArea;
  });

  // Compute the quantization transform.
  if (Q) {
    transform = quantize(objects, bbox, Q);
    if (verbose) {
      console.warn("quantization: " + transform.scale.map(function(degrees) { return system.formatDistance(degrees / 180 * Math.PI); }).join(" "));
    }
  }

  // Remove any antimeridian cuts and restitch.
  if (system === systems.spherical && stitchPoles) {
    stitch(objects, transform);
  }

  // Compute the topology.
  var topology = topologize(objects);
  topology.bbox = bbox;

  if (verbose) {
    console.warn("topology: " + topology.arcs.length + " arcs, " + topology.arcs.reduce(function(p, v) { return p + v.length; }, 0) + " points");
  }

  // Convert to delta-encoding.
  if (Q) topology.transform = transform, delta(topology);

  return topology;
};

},{"./bounds":75,"./compute-id":78,"./coordinate-systems":79,"./delta":80,"./geomify":82,"./prefilter":83,"./quantize":85,"./stitch":88,"./topology/index":94,"./transform-properties":98,"./type":99}],90:[function(require,module,exports){
var join = require("./join");

// Given an extracted (pre-)topology, cuts (or rotates) arcs so that all shared
// point sequences are identified. The topology can then be subsequently deduped
// to remove exact duplicate arcs.
module.exports = function(topology) {
  var junctionByPoint = join(topology),
      coordinates = topology.coordinates,
      lines = topology.lines,
      rings = topology.rings;

  for (var i = 0, n = lines.length; i < n; ++i) {
    var line = lines[i],
        lineMid = line[0],
        lineEnd = line[1];
    while (++lineMid < lineEnd) {
      if (junctionByPoint.get(coordinates[lineMid])) {
        var next = {0: lineMid, 1: line[1]};
        line[1] = lineMid;
        line = line.next = next;
      }
    }
  }

  for (var i = 0, n = rings.length; i < n; ++i) {
    var ring = rings[i],
        ringStart = ring[0],
        ringMid = ringStart,
        ringEnd = ring[1],
        ringFixed = junctionByPoint.get(coordinates[ringStart]);
    while (++ringMid < ringEnd) {
      if (junctionByPoint.get(coordinates[ringMid])) {
        if (ringFixed) {
          var next = {0: ringMid, 1: ring[1]};
          ring[1] = ringMid;
          ring = ring.next = next;
        } else { // For the first junction, we can rotate rather than cut.
          rotateArray(coordinates, ringStart, ringEnd, ringEnd - ringMid);
          coordinates[ringEnd] = coordinates[ringStart];
          ringFixed = true;
          ringMid = ringStart; // restart; we may have skipped junctions
        }
      }
    }
  }

  return topology;
};

function rotateArray(array, start, end, offset) {
  reverse(array, start, end);
  reverse(array, start, start + offset);
  reverse(array, start + offset, end);
}

function reverse(array, start, end) {
  for (var mid = start + ((end-- - start) >> 1), t; start < mid; ++start, --end) {
    t = array[start], array[start] = array[end], array[end] = t;
  }
}

},{"./join":95}],91:[function(require,module,exports){
var join = require("./join"),
    hashtable = require("./hashtable"),
    hashPoint = require("./point-hash"),
    equalPoint = require("./point-equal");

// Given a cut topology, combines duplicate arcs.
module.exports = function(topology) {
  var coordinates = topology.coordinates,
      lines = topology.lines,
      rings = topology.rings,
      arcCount = lines.length + rings.length;

  delete topology.lines;
  delete topology.rings;

  // Count the number of (non-unique) arcs to initialize the hashtable safely.
  for (var i = 0, n = lines.length; i < n; ++i) {
    var line = lines[i]; while (line = line.next) ++arcCount;
  }
  for (var i = 0, n = rings.length; i < n; ++i) {
    var ring = rings[i]; while (ring = ring.next) ++arcCount;
  }

  var arcsByEnd = hashtable(arcCount * 2, hashPoint, equalPoint),
      arcs = topology.arcs = [];

  for (var i = 0, n = lines.length; i < n; ++i) {
    var line = lines[i];
    do {
      dedupLine(line);
    } while (line = line.next);
  }

  for (var i = 0, n = rings.length; i < n; ++i) {
    var ring = rings[i];
    if (ring.next) { // arc is no longer closed
      do {
        dedupLine(ring);
      } while (ring = ring.next);
    } else {
      dedupRing(ring);
    }
  }

  function dedupLine(arc) {
    var startPoint,
        endPoint,
        startArcs,
        endArcs;

    // Does this arc match an existing arc in order?
    if (startArcs = arcsByEnd.get(startPoint = coordinates[arc[0]])) {
      for (var i = 0, n = startArcs.length; i < n; ++i) {
        var startArc = startArcs[i];
        if (equalLine(startArc, arc)) {
          arc[0] = startArc[0];
          arc[1] = startArc[1];
          return;
        }
      }
    }

    // Does this arc match an existing arc in reverse order?
    if (endArcs = arcsByEnd.get(endPoint = coordinates[arc[1]])) {
      for (var i = 0, n = endArcs.length; i < n; ++i) {
        var endArc = endArcs[i];
        if (reverseEqualLine(endArc, arc)) {
          arc[1] = endArc[0];
          arc[0] = endArc[1];
          return;
        }
      }
    }

    if (startArcs) startArcs.push(arc); else arcsByEnd.set(startPoint, [arc]);
    if (endArcs) endArcs.push(arc); else arcsByEnd.set(endPoint, [arc]);
    arcs.push(arc);
  }

  function dedupRing(arc) {
    var endPoint,
        endArcs;

    // Does this arc match an existing line in order, or reverse order?
    // Rings are closed, so their start point and end point is the same.
    if (endArcs = arcsByEnd.get(endPoint = coordinates[arc[0]])) {
      for (var i = 0, n = endArcs.length; i < n; ++i) {
        var endArc = endArcs[i];
        if (equalRing(endArc, arc)) {
          arc[0] = endArc[0];
          arc[1] = endArc[1];
          return;
        }
        if (reverseEqualRing(endArc, arc)) {
          arc[0] = endArc[1];
          arc[1] = endArc[0];
          return;
        }
      }
    }

    // Otherwise, does this arc match an existing ring in order, or reverse order?
    if (endArcs = arcsByEnd.get(endPoint = coordinates[arc[0] + findMinimumOffset(arc)])) {
      for (var i = 0, n = endArcs.length; i < n; ++i) {
        var endArc = endArcs[i];
        if (equalRing(endArc, arc)) {
          arc[0] = endArc[0];
          arc[1] = endArc[1];
          return;
        }
        if (reverseEqualRing(endArc, arc)) {
          arc[0] = endArc[1];
          arc[1] = endArc[0];
          return;
        }
      }
    }

    if (endArcs) endArcs.push(arc); else arcsByEnd.set(endPoint, [arc]);
    arcs.push(arc);
  }

  function equalLine(arcA, arcB) {
    var ia = arcA[0], ib = arcB[0],
        ja = arcA[1], jb = arcB[1];
    if (ia - ja !== ib - jb) return false;
    for (; ia <= ja; ++ia, ++ib) if (!equalPoint(coordinates[ia], coordinates[ib])) return false;
    return true;
  }

  function reverseEqualLine(arcA, arcB) {
    var ia = arcA[0], ib = arcB[0],
        ja = arcA[1], jb = arcB[1];
    if (ia - ja !== ib - jb) return false;
    for (; ia <= ja; ++ia, --jb) if (!equalPoint(coordinates[ia], coordinates[jb])) return false;
    return true;
  }

  function equalRing(arcA, arcB) {
    var ia = arcA[0], ib = arcB[0],
        ja = arcA[1], jb = arcB[1],
        n = ja - ia;
    if (n !== jb - ib) return false;
    var ka = findMinimumOffset(arcA),
        kb = findMinimumOffset(arcB);
    for (var i = 0; i < n; ++i) {
      if (!equalPoint(coordinates[ia + (i + ka) % n], coordinates[ib + (i + kb) % n])) return false;
    }
    return true;
  }

  function reverseEqualRing(arcA, arcB) {
    var ia = arcA[0], ib = arcB[0],
        ja = arcA[1], jb = arcB[1],
        n = ja - ia;
    if (n !== jb - ib) return false;
    var ka = findMinimumOffset(arcA),
        kb = n - findMinimumOffset(arcB);
    for (var i = 0; i < n; ++i) {
      if (!equalPoint(coordinates[ia + (i + ka) % n], coordinates[jb - (i + kb) % n])) return false;
    }
    return true;
  }

  // Rings are rotated to a consistent, but arbitrary, start point.
  // This is necessary to detect when a ring and a rotated copy are dupes.
  function findMinimumOffset(arc) {
    var start = arc[0],
        end = arc[1],
        mid = start,
        minimum = mid,
        minimumPoint = coordinates[mid];
    while (++mid < end) {
      var point = coordinates[mid];
      if (point[0] < minimumPoint[0] || point[0] === minimumPoint[0] && point[1] < minimumPoint[1]) {
        minimum = mid;
        minimumPoint = point;
      }
    }
    return minimum - start;
  }

  return topology;
};

},{"./hashtable":93,"./join":95,"./point-equal":96,"./point-hash":97}],92:[function(require,module,exports){
// Extracts the lines and rings from the specified hash of geometry objects.
//
// Returns an object with three properties:
//
// * coordinates - shared buffer of [x, y] coordinates
// * lines - lines extracted from the hash, of the form [start, end]
// * rings - rings extracted from the hash, of the form [start, end]
//
// For each ring or line, start and end represent inclusive indexes into the
// coordinates buffer. For rings (and closed lines), coordinates[start] equals
// coordinates[end].
//
// For each line or polygon geometry in the input hash, including nested
// geometries as in geometry collections, the `coordinates` array is replaced
// with an equivalent `arcs` array that, for each line (for line string
// geometries) or ring (for polygon geometries), points to one of the above
// lines or rings.
module.exports = function(objects) {
  var index = -1,
      lines = [],
      rings = [],
      coordinates = [];

  function extractGeometry(geometry) {
    if (geometry && extractGeometryType.hasOwnProperty(geometry.type)) extractGeometryType[geometry.type](geometry);
  }

  var extractGeometryType = {
    GeometryCollection: function(o) { o.geometries.forEach(extractGeometry); },
    LineString: function(o) { o.arcs = extractLine(o.coordinates); delete o.coordinates; },
    MultiLineString: function(o) { o.arcs = o.coordinates.map(extractLine); delete o.coordinates; },
    Polygon: function(o) { o.arcs = o.coordinates.map(extractRing); delete o.coordinates; },
    MultiPolygon: function(o) { o.arcs = o.coordinates.map(extractMultiRing); delete o.coordinates; }
  };

  function extractLine(line) {
    for (var i = 0, n = line.length; i < n; ++i) coordinates[++index] = line[i];
    var arc = {0: index - n + 1, 1: index};
    lines.push(arc);
    return arc;
  }

  function extractRing(ring) {
    for (var i = 0, n = ring.length; i < n; ++i) coordinates[++index] = ring[i];
    var arc = {0: index - n + 1, 1: index};
    rings.push(arc);
    return arc;
  }

  function extractMultiRing(rings) {
    return rings.map(extractRing);
  }

  for (var key in objects) {
    extractGeometry(objects[key]);
  }

  return {
    type: "Topology",
    coordinates: coordinates,
    lines: lines,
    rings: rings,
    objects: objects
  };
};

},{}],93:[function(require,module,exports){
module.exports = function(size, hash, equal) {
  var hashtable = new Array(size = 1 << Math.ceil(Math.log(size) / Math.LN2)),
      mask = size - 1,
      free = size;

  function set(key, value) {
    var index = hash(key) & mask,
        match = hashtable[index],
        cycle = !index;
    while (match != null) {
      if (equal(match.key, key)) return match.value = value;
      match = hashtable[index = (index + 1) & mask];
      if (!index && cycle++) throw new Error("full hashtable");
    }
    hashtable[index] = {key: key, value: value};
    --free;
    return value;
  }

  function get(key, missingValue) {
    var index = hash(key) & mask,
        match = hashtable[index],
        cycle = !index;
    while (match != null) {
      if (equal(match.key, key)) return match.value;
      match = hashtable[index = (index + 1) & mask];
      if (!index && cycle++) break;
    }
    return missingValue;
  }

  function remove(key) {
    var index = hash(key) & mask,
        match = hashtable[index],
        cycle = !index;
    while (match != null) {
      if (equal(match.key, key)) {
        hashtable[index] = null;
        match = hashtable[index = (index + 1) & mask];
        if (match != null) { // delete and re-add
          ++free;
          hashtable[index] = null;
          set(match.key, match.value);
        }
        ++free;
        return true;
      }
      match = hashtable[index = (index + 1) & mask];
      if (!index && cycle++) break;
    }
    return false;
  }

  function keys() {
    var keys = [];
    for (var i = 0, n = hashtable.length; i < n; ++i) {
      var match = hashtable[i];
      if (match != null) keys.push(match.key);
    }
    return keys;
  }

  return {
    set: set,
    get: get,
    remove: remove,
    keys: keys
  };
};

},{}],94:[function(require,module,exports){
var hashtable = require("./hashtable"),
    extract = require("./extract"),
    cut = require("./cut"),
    dedup = require("./dedup");

// Constructs the TopoJSON Topology for the specified hash of geometries.
// Each object in the specified hash must be a GeoJSON object,
// meaning FeatureCollection, a Feature or a geometry object.
module.exports = function(objects) {
  var topology = dedup(cut(extract(objects))),
      coordinates = topology.coordinates,
      indexByArc = hashtable(topology.arcs.length, hashArc, equalArc);

  objects = topology.objects; // for garbage collection

  topology.arcs = topology.arcs.map(function(arc, i) {
    indexByArc.set(arc, i);
    return coordinates.slice(arc[0], arc[1] + 1);
  });

  delete topology.coordinates;
  coordinates = null;

  function indexGeometry(geometry) {
    if (geometry && indexGeometryType.hasOwnProperty(geometry.type)) indexGeometryType[geometry.type](geometry);
  }

  var indexGeometryType = {
    GeometryCollection: function(o) { o.geometries.forEach(indexGeometry); },
    LineString: function(o) { o.arcs = indexArcs(o.arcs); },
    MultiLineString: function(o) { o.arcs = o.arcs.map(indexArcs); },
    Polygon: function(o) { o.arcs = o.arcs.map(indexArcs); },
    MultiPolygon: function(o) { o.arcs = o.arcs.map(indexMultiArcs); }
  };

  function indexArcs(arc) {
    var indexes = [];
    do {
      var index = indexByArc.get(arc);
      indexes.push(arc[0] < arc[1] ? index : ~index);
    } while (arc = arc.next);
    return indexes;
  }

  function indexMultiArcs(arcs) {
    return arcs.map(indexArcs);
  }

  for (var key in objects) {
    indexGeometry(objects[key]);
  }

  return topology;
};

function hashArc(arc) {
  var i = arc[0], j = arc[1], t;
  if (j < i) t = i, i = j, j = t;
  return i + 31 * j;
}

function equalArc(arcA, arcB) {
  var ia = arcA[0], ja = arcA[1],
      ib = arcB[0], jb = arcB[1], t;
  if (ja < ia) t = ia, ia = ja, ja = t;
  if (jb < ib) t = ib, ib = jb, jb = t;
  return ia === ib && ja === jb;
}

},{"./cut":90,"./dedup":91,"./extract":92,"./hashtable":93}],95:[function(require,module,exports){
var hashtable = require("./hashtable"),
    hashPoint = require("./point-hash"),
    equalPoint = require("./point-equal");

// Given an extracted (pre-)topology, identifies all of the junctions. These are
// the points at which arcs (lines or rings) will need to be cut so that each
// arc is represented uniquely.
//
// A junction is a point where at least one arc deviates from another arc going
// through the same point. For example, consider the point B. If there is a arc
// through ABC and another arc through CBA, then B is not a junction because in
// both cases the adjacent point pairs are {A,C}. However, if there is an
// additional arc ABD, then {A,D} != {A,C}, and thus B becomes a junction.
//
// For a closed ring ABCA, the first point A’s adjacent points are the second
// and last point {B,C}. For a line, the first and last point are always
// considered junctions, even if the line is closed; this ensures that a closed
// line is never rotated.
module.exports = function(topology) {
  var coordinates = topology.coordinates,
      lines = topology.lines,
      rings = topology.rings,
      visitedByPoint,
      neighborsByPoint = hashtable(coordinates.length, hashPoint, equalPoint),
      junctionByPoint = hashtable(coordinates.length, hashPoint, equalPoint);

  for (var i = 0, n = lines.length; i < n; ++i) {
    var line = lines[i],
        lineStart = line[0],
        lineEnd = line[1],
        previousPoint = null,
        currentPoint = coordinates[lineStart],
        nextPoint = coordinates[++lineStart];
    visitedByPoint = hashtable(lineEnd - lineStart, hashPoint, equalPoint);
    junctionByPoint.set(currentPoint, true); // start
    while (++lineStart <= lineEnd) {
      sequence(previousPoint = currentPoint, currentPoint = nextPoint, nextPoint = coordinates[lineStart]);
    }
    junctionByPoint.set(nextPoint, true); // end
  }

  for (var i = 0, n = rings.length; i < n; ++i) {
    var ring = rings[i],
        ringStart = ring[0] + 1,
        ringEnd = ring[1],
        previousPoint = coordinates[ringEnd - 1],
        currentPoint = coordinates[ringStart - 1],
        nextPoint = coordinates[ringStart];
    visitedByPoint = hashtable(ringEnd - ringStart + 1, hashPoint, equalPoint);
    sequence(previousPoint, currentPoint, nextPoint);
    while (++ringStart <= ringEnd) {
      sequence(previousPoint = currentPoint, currentPoint = nextPoint, nextPoint = coordinates[ringStart]);
    }
  }

  function sequence(previousPoint, currentPoint, nextPoint) {
    if (visitedByPoint.get(currentPoint)) return; // ignore self-intersection
    visitedByPoint.set(currentPoint, true);
    var neighbors = neighborsByPoint.get(currentPoint);
    if (neighbors) {
      if (!(equalPoint(neighbors[0], previousPoint)
        && equalPoint(neighbors[1], nextPoint))
        && !(equalPoint(neighbors[0], nextPoint)
        && equalPoint(neighbors[1], previousPoint))) {
        junctionByPoint.set(currentPoint, true);
      }
    } else {
      neighborsByPoint.set(currentPoint, [previousPoint, nextPoint]);
    }
  }

  return junctionByPoint;
};

},{"./hashtable":93,"./point-equal":96,"./point-hash":97}],96:[function(require,module,exports){
module.exports = function(pointA, pointB) {
  return pointA[0] === pointB[0] && pointA[1] === pointB[1];
};

},{}],97:[function(require,module,exports){
// TODO if quantized, use simpler Int32 hashing?

var hashBuffer = new ArrayBuffer(8),
    hashFloats = new Float64Array(hashBuffer),
    hashInts = new Int32Array(hashBuffer);

function hashFloat(x) {
  hashFloats[0] = x;
  x = hashInts[1] ^ hashInts[0];
  x ^= (x >>> 20) ^ (x >>> 12);
  x ^= (x >>> 7) ^ (x >>> 4);
  return x;
}

module.exports = function(point) {
  var h = (hashFloat(point[0]) + 31 * hashFloat(point[1])) | 0;
  return h < 0 ? ~h : h;
};

},{}],98:[function(require,module,exports){
// Given a hash of GeoJSON objects, transforms any properties on features using
// the specified transform function. The function is invoked for each existing
// property on the current feature, being passed the new properties hash, the
// property name, and the property value. The function is then expected to
// assign a new value to the given property hash if the feature is to be
// retained and return true. Or, to skip the property, do nothing and return
// false. If no properties are propagated to the new properties hash, the
// properties hash will be deleted from the current feature.
module.exports = function(objects, propertyTransform) {
  if (arguments.length < 2) propertyTransform = function() {};

  function transformObject(object) {
    if (object && transformObjectType.hasOwnProperty(object.type)) transformObjectType[object.type](object);
  }

  function transformFeature(feature) {
    if (feature.properties) {
      var properties0 = feature.properties,
          properties1 = {},
          empty = true;

      for (var key0 in properties0) {
        if (propertyTransform(properties1, key0, properties0[key0])) {
          empty = false;
        }
      }

      if (empty) delete feature.properties;
      else feature.properties = properties1;
    }
  }

  var transformObjectType = {
    Feature: transformFeature,
    FeatureCollection: function(collection) { collection.features.forEach(transformFeature); }
  };

  for (var key in objects) {
    transformObject(objects[key]);
  }

  return objects;
};

},{}],99:[function(require,module,exports){
module.exports = function(types) {
  for (var type in typeDefaults) {
    if (!(type in types)) {
      types[type] = typeDefaults[type];
    }
  }
  types.defaults = typeDefaults;
  return types;
};

var typeDefaults = {

  Feature: function(feature) {
    if (feature.geometry) this.geometry(feature.geometry);
  },

  FeatureCollection: function(collection) {
    var features = collection.features, i = -1, n = features.length;
    while (++i < n) this.Feature(features[i]);
  },

  GeometryCollection: function(collection) {
    var geometries = collection.geometries, i = -1, n = geometries.length;
    while (++i < n) this.geometry(geometries[i]);
  },

  LineString: function(lineString) {
    this.line(lineString.coordinates);
  },

  MultiLineString: function(multiLineString) {
    var coordinates = multiLineString.coordinates, i = -1, n = coordinates.length;
    while (++i < n) this.line(coordinates[i]);
  },

  MultiPoint: function(multiPoint) {
    var coordinates = multiPoint.coordinates, i = -1, n = coordinates.length;
    while (++i < n) this.point(coordinates[i]);
  },

  MultiPolygon: function(multiPolygon) {
    var coordinates = multiPolygon.coordinates, i = -1, n = coordinates.length;
    while (++i < n) this.polygon(coordinates[i]);
  },

  Point: function(point) {
    this.point(point.coordinates);
  },

  Polygon: function(polygon) {
    this.polygon(polygon.coordinates);
  },

  object: function(object) {
    return object == null ? null
        : typeObjects.hasOwnProperty(object.type) ? this[object.type](object)
        : this.geometry(object);
  },

  geometry: function(geometry) {
    return geometry == null ? null
        : typeGeometries.hasOwnProperty(geometry.type) ? this[geometry.type](geometry)
        : null;
  },

  point: function() {},

  line: function(coordinates) {
    var i = -1, n = coordinates.length;
    while (++i < n) this.point(coordinates[i]);
  },

  polygon: function(coordinates) {
    var i = -1, n = coordinates.length;
    while (++i < n) this.line(coordinates[i]);
  }
};

var typeGeometries = {
  LineString: 1,
  MultiLineString: 1,
  MultiPoint: 1,
  MultiPolygon: 1,
  Point: 1,
  Polygon: 1,
  GeometryCollection: 1
};

var typeObjects = {
  Feature: 1,
  FeatureCollection: 1
};

},{}],100:[function(require,module,exports){


//
// The shims in this file are not fully implemented shims for the ES5
// features, but do work for the particular usecases there is in
// the other modules.
//

var toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

// Array.isArray is supported in IE9
function isArray(xs) {
  return toString.call(xs) === '[object Array]';
}
exports.isArray = typeof Array.isArray === 'function' ? Array.isArray : isArray;

// Array.prototype.indexOf is supported in IE9
exports.indexOf = function indexOf(xs, x) {
  if (xs.indexOf) return xs.indexOf(x);
  for (var i = 0; i < xs.length; i++) {
    if (x === xs[i]) return i;
  }
  return -1;
};

// Array.prototype.filter is supported in IE9
exports.filter = function filter(xs, fn) {
  if (xs.filter) return xs.filter(fn);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (fn(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
};

// Array.prototype.forEach is supported in IE9
exports.forEach = function forEach(xs, fn, self) {
  if (xs.forEach) return xs.forEach(fn, self);
  for (var i = 0; i < xs.length; i++) {
    fn.call(self, xs[i], i, xs);
  }
};

// Array.prototype.map is supported in IE9
exports.map = function map(xs, fn) {
  if (xs.map) return xs.map(fn);
  var out = new Array(xs.length);
  for (var i = 0; i < xs.length; i++) {
    out[i] = fn(xs[i], i, xs);
  }
  return out;
};

// Array.prototype.reduce is supported in IE9
exports.reduce = function reduce(array, callback, opt_initialValue) {
  if (array.reduce) return array.reduce(callback, opt_initialValue);
  var value, isValueSet = false;

  if (2 < arguments.length) {
    value = opt_initialValue;
    isValueSet = true;
  }
  for (var i = 0, l = array.length; l > i; ++i) {
    if (array.hasOwnProperty(i)) {
      if (isValueSet) {
        value = callback(value, array[i], i, array);
      }
      else {
        value = array[i];
        isValueSet = true;
      }
    }
  }

  return value;
};

// String.prototype.substr - negative index don't work in IE8
if ('ab'.substr(-1) !== 'b') {
  exports.substr = function (str, start, length) {
    // did we get a negative start, calculate how much it is from the beginning of the string
    if (start < 0) start = str.length + start;

    // call the original function
    return str.substr(start, length);
  };
} else {
  exports.substr = function (str, start, length) {
    return str.substr(start, length);
  };
}

// String.prototype.trim is supported in IE9
exports.trim = function (str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
};

// Function.prototype.bind is supported in IE9
exports.bind = function () {
  var args = Array.prototype.slice.call(arguments);
  var fn = args.shift();
  if (fn.bind) return fn.bind.apply(fn, args);
  var self = args.shift();
  return function () {
    fn.apply(self, args.concat([Array.prototype.slice.call(arguments)]));
  };
};

// Object.create is supported in IE9
function create(prototype, properties) {
  var object;
  if (prototype === null) {
    object = { '__proto__' : null };
  }
  else {
    if (typeof prototype !== 'object') {
      throw new TypeError(
        'typeof prototype[' + (typeof prototype) + '] != \'object\''
      );
    }
    var Type = function () {};
    Type.prototype = prototype;
    object = new Type();
    object.__proto__ = prototype;
  }
  if (typeof properties !== 'undefined' && Object.defineProperties) {
    Object.defineProperties(object, properties);
  }
  return object;
}
exports.create = typeof Object.create === 'function' ? Object.create : create;

// Object.keys and Object.getOwnPropertyNames is supported in IE9 however
// they do show a description and number property on Error objects
function notObject(object) {
  return ((typeof object != "object" && typeof object != "function") || object === null);
}

function keysShim(object) {
  if (notObject(object)) {
    throw new TypeError("Object.keys called on a non-object");
  }

  var result = [];
  for (var name in object) {
    if (hasOwnProperty.call(object, name)) {
      result.push(name);
    }
  }
  return result;
}

// getOwnPropertyNames is almost the same as Object.keys one key feature
//  is that it returns hidden properties, since that can't be implemented,
//  this feature gets reduced so it just shows the length property on arrays
function propertyShim(object) {
  if (notObject(object)) {
    throw new TypeError("Object.getOwnPropertyNames called on a non-object");
  }

  var result = keysShim(object);
  if (exports.isArray(object) && exports.indexOf(object, 'length') === -1) {
    result.push('length');
  }
  return result;
}

var keys = typeof Object.keys === 'function' ? Object.keys : keysShim;
var getOwnPropertyNames = typeof Object.getOwnPropertyNames === 'function' ?
  Object.getOwnPropertyNames : propertyShim;

if (new Error().hasOwnProperty('description')) {
  var ERROR_PROPERTY_FILTER = function (obj, array) {
    if (toString.call(obj) === '[object Error]') {
      array = exports.filter(array, function (name) {
        return name !== 'description' && name !== 'number' && name !== 'message';
      });
    }
    return array;
  };

  exports.keys = function (object) {
    return ERROR_PROPERTY_FILTER(object, keys(object));
  };
  exports.getOwnPropertyNames = function (object) {
    return ERROR_PROPERTY_FILTER(object, getOwnPropertyNames(object));
  };
} else {
  exports.keys = keys;
  exports.getOwnPropertyNames = getOwnPropertyNames;
}

// Object.getOwnPropertyDescriptor - supported in IE8 but only on dom elements
function valueObject(value, key) {
  return { value: value[key] };
}

if (typeof Object.getOwnPropertyDescriptor === 'function') {
  try {
    Object.getOwnPropertyDescriptor({'a': 1}, 'a');
    exports.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  } catch (e) {
    // IE8 dom element issue - use a try catch and default to valueObject
    exports.getOwnPropertyDescriptor = function (value, key) {
      try {
        return Object.getOwnPropertyDescriptor(value, key);
      } catch (e) {
        return valueObject(value, key);
      }
    };
  }
} else {
  exports.getOwnPropertyDescriptor = valueObject;
}

},{}],101:[function(require,module,exports){

// not implemented
// The reason for having an empty file and not throwing is to allow
// untraditional implementation of this module.

},{}],102:[function(require,module,exports){
var process=require("__browserify_process");// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util');
var shims = require('_shims');

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (!util.isString(path)) {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(shims.filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = shims.substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(shims.filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(shims.filter(paths, function(p, index) {
    if (!util.isString(p)) {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

},{"__browserify_process":104,"_shims":100,"util":103}],103:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var shims = require('_shims');

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  shims.forEach(array, function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = shims.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = shims.getOwnPropertyNames(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }

  shims.forEach(keys, function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = shims.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }

  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (shims.indexOf(ctx.seen, desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = shims.reduce(output, function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return shims.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) && objectToString(e) === '[object Error]';
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.binarySlice === 'function'
  ;
}
exports.isBuffer = isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = shims.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = shims.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

},{"_shims":100}],104:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}]},{},[1])
(1)
});
;