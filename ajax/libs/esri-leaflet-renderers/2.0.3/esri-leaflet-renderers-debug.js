/* esri-leaflet-renderers - v2.0.3 - Fri Jul 01 2016 11:23:55 GMT-0700 (PDT)
 * Copyright (c) 2016 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}, global.L.esri.Renderers = global.L.esri.Renderers || {}),global.L));
}(this, function (exports,L) { 'use strict';

	L = 'default' in L ? L['default'] : L;

	var version = "2.0.3";

	var Symbol = L.Class.extend({
	  initialize: function (symbolJson, options) {
	    this._symbolJson = symbolJson;
	    this.val = null;
	    this._styles = {};
	    this._isDefault = false;
	    this._layerTransparency = 1;
	    if (options && options.layerTransparency) {
	      this._layerTransparency = 1 - (options.layerTransparency / 100.0);
	    }
	  },

	  // the geojson values returned are in points
	  pixelValue: function (pointValue) {
	    return pointValue * 1.333;
	  },

	  // color is an array [r,g,b,a]
	  colorValue: function (color) {
	    return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
	  },

	  alphaValue: function (color) {
	    var alpha = color[3] / 255.0;
	    return alpha * this._layerTransparency;
	  },

	  getSize: function (feature, sizeInfo) {
	    var attr = feature.properties;
	    var field = sizeInfo.field;
	    var size = 0;
	    var featureValue = null;

	    if (field) {
	      featureValue = attr[field];
	      var minSize = sizeInfo.minSize;
	      var maxSize = sizeInfo.maxSize;
	      var minDataValue = sizeInfo.minDataValue;
	      var maxDataValue = sizeInfo.maxDataValue;
	      var featureRatio;
	      var normField = sizeInfo.normalizationField;
	      var normValue = attr ? parseFloat(attr[normField]) : undefined;

	      if (featureValue === null || (normField && ((isNaN(normValue) || normValue === 0)))) {
	        return null;
	      }

	      if (!isNaN(normValue)) {
	        featureValue /= normValue;
	      }

	      if (minSize !== null && maxSize !== null && minDataValue !== null && maxDataValue !== null) {
	        if (featureValue <= minDataValue) {
	          size = minSize;
	        } else if (featureValue >= maxDataValue) {
	          size = maxSize;
	        } else {
	          featureRatio = (featureValue - minDataValue) / (maxDataValue - minDataValue);
	          size = minSize + (featureRatio * (maxSize - minSize));
	        }
	      }
	      size = isNaN(size) ? 0 : size;
	    }
	    return size;
	  },

	  getColor: function (feature, colorInfo) {
	    // required information to get color
	    if (!(feature.properties && colorInfo && colorInfo.field && colorInfo.stops)) {
	      return null;
	    }

	    var attr = feature.properties;
	    var featureValue = attr[colorInfo.field];
	    var lowerBoundColor, upperBoundColor, lowerBound, upperBound;
	    var normField = colorInfo.normalizationField;
	    var normValue = attr ? parseFloat(attr[normField]) : undefined;
	    if (featureValue === null || (normField && ((isNaN(normValue) || normValue === 0)))) {
	      return null;
	    }

	    if (!isNaN(normValue)) {
	      featureValue /= normValue;
	    }

	    if (featureValue <= colorInfo.stops[0].value) {
	      return colorInfo.stops[0].color;
	    }
	    var lastStop = colorInfo.stops[colorInfo.stops.length - 1];
	    if (featureValue >= lastStop.value) {
	      return lastStop.color;
	    }

	    // go through the stops to find min and max
	    for (var i = 0; i < colorInfo.stops.length; i++) {
	      var stopInfo = colorInfo.stops[i];

	      if (stopInfo.value <= featureValue) {
	        lowerBoundColor = stopInfo.color;
	        lowerBound = stopInfo.value;
	      } else if (stopInfo.value > featureValue) {
	        upperBoundColor = stopInfo.color;
	        upperBound = stopInfo.value;
	        break;
	      }
	    }

	    // feature falls between two stops, interplate the colors
	    if (!isNaN(lowerBound) && !isNaN(upperBound)) {
	      var range = upperBound - lowerBound;
	      if (range > 0) {
	        // more weight the further it is from the lower bound
	        var upperBoundColorWeight = (featureValue - lowerBound) / range;
	        if (upperBoundColorWeight) {
	          // more weight the further it is from the upper bound
	          var lowerBoundColorWeight = (upperBound - featureValue) / range;
	          if (lowerBoundColorWeight) {
	            // interpolate the lower and upper bound color by applying the
	            // weights to each of the rgba colors and adding them together
	            var interpolatedColor = [];
	            for (var j = 0; j < 4; j++) {
	              interpolatedColor[j] = Math.round(lowerBoundColor[j] * lowerBoundColorWeight + upperBoundColor[j] * upperBoundColorWeight);
	            }
	            return interpolatedColor;
	          } else {
	            // no difference between featureValue and upperBound, 100% of upperBoundColor
	            return upperBoundColor;
	          }
	        } else {
	          // no difference between featureValue and lowerBound, 100% of lowerBoundColor
	          return lowerBoundColor;
	        }
	      }
	    }
	    // if we get to here, none of the cases apply so return null
	    return null;
	  }
	});

	var ShapeMarker = L.Path.extend({

	  initialize: function (latlng, size, options) {
	    L.setOptions(this, options);
	    this._size = size;
	    this._latlng = L.latLng(latlng);
	    this._svgCanvasIncludes();
	  },

	  toGeoJSON: function () {
	    return L.GeoJSON.getFeature(this, {
	      type: 'Point',
	      coordinates: L.GeoJSON.latLngToCoords(this.getLatLng())
	    });
	  },

	  _svgCanvasIncludes: function () {
	    // implement in sub class
	  },

	  _project: function () {
	    this._point = this._map.latLngToLayerPoint(this._latlng);
	  },

	  _update: function () {
	    if (this._map) {
	      this._updatePath();
	    }
	  },

	  _updatePath: function () {
	    // implement in sub class
	  },

	  setLatLng: function (latlng) {
	    this._latlng = L.latLng(latlng);
	    this.redraw();
	    return this.fire('move', {latlng: this._latlng});
	  },

	  getLatLng: function () {
	    return this._latlng;
	  },

	  setSize: function (size) {
	    this._size = size;
	    return this.redraw();
	  },

	  getSize: function () {
	    return this._size;
	  }
	});

	var CrossMarker = ShapeMarker.extend({

	  initialize: function (latlng, size, options) {
	    ShapeMarker.prototype.initialize.call(this, latlng, size, options);
	  },

	  _updatePath: function () {
	    this._renderer._updateCrossMarker(this);
	  },

	  _svgCanvasIncludes: function () {
	    L.Canvas.include({
	      _updateCrossMarker: function (layer) {
	        var latlng = layer._point;
	        var offset = layer._size / 2.0;
	        var ctx = this._ctx;

	        ctx.beginPath();
	        ctx.moveTo(latlng.x, latlng.y + offset);
	        ctx.lineTo(latlng.x, latlng.y - offset);
	        this._fillStroke(ctx, layer);

	        ctx.moveTo(latlng.x - offset, latlng.y);
	        ctx.lineTo(latlng.x + offset, latlng.y);
	        this._fillStroke(ctx, layer);
	      }
	    });

	    L.SVG.include({
	      _updateCrossMarker: function (layer) {
	        var latlng = layer._point;
	        var offset = layer._size / 2.0;

	        if (L.Browser.vml) {
	          latlng._round();
	          offset = Math.round(offset);
	        }

	        var str = 'M' + latlng.x + ',' + (latlng.y + offset) +
	          'L' + latlng.x + ',' + (latlng.y - offset) +
	          'M' + (latlng.x - offset) + ',' + latlng.y +
	          'L' + (latlng.x + offset) + ',' + latlng.y;

	        this._setPath(layer, str);
	      }
	    });
	  }
	});

	var crossMarker = function (latlng, size, options) {
	  return new CrossMarker(latlng, size, options);
	};

	var XMarker = ShapeMarker.extend({

	  initialize: function (latlng, size, options) {
	    ShapeMarker.prototype.initialize.call(this, latlng, size, options);
	  },

	  _updatePath: function () {
	    this._renderer._updateXMarker(this);
	  },

	  _svgCanvasIncludes: function () {
	    L.Canvas.include({
	      _updateXMarker: function (layer) {
	        var latlng = layer._point;
	        var offset = layer._size / 2.0;
	        var ctx = this._ctx;

	        ctx.beginPath();

	        ctx.moveTo(latlng.x + offset, latlng.y + offset);
	        ctx.lineTo(latlng.x - offset, latlng.y - offset);
	        this._fillStroke(ctx, layer);
	      }
	    });

	    L.SVG.include({
	      _updateXMarker: function (layer) {
	        var latlng = layer._point;
	        var offset = layer._size / 2.0;

	        if (L.Browser.vml) {
	          latlng._round();
	          offset = Math.round(offset);
	        }

	        var str = 'M' + (latlng.x + offset) + ',' + (latlng.y + offset) +
	          'L' + (latlng.x - offset) + ',' + (latlng.y - offset) +
	          'M' + (latlng.x - offset) + ',' + (latlng.y + offset) +
	          'L' + (latlng.x + offset) + ',' + (latlng.y - offset);

	        this._setPath(layer, str);
	      }
	    });
	  }
	});

	var xMarker = function (latlng, size, options) {
	  return new XMarker(latlng, size, options);
	};

	var SquareMarker = ShapeMarker.extend({
	  options: {
	    fill: true
	  },

	  initialize: function (latlng, size, options) {
	    ShapeMarker.prototype.initialize.call(this, latlng, size, options);
	  },

	  _updatePath: function () {
	    this._renderer._updateSquareMarker(this);
	  },

	  _svgCanvasIncludes: function () {
	    L.Canvas.include({
	      _updateSquareMarker: function (layer) {
	        var latlng = layer._point;
	        var offset = layer._size / 2.0;
	        var ctx = this._ctx;

	        ctx.beginPath();

	        ctx.moveTo(latlng.x + offset, latlng.y + offset);
	        ctx.lineTo(latlng.x - offset, latlng.y + offset);
	        ctx.lineTo(latlng.x - offset, latlng.y - offset);
	        ctx.lineTo(latlng.x + offset, latlng.y - offset);

	        ctx.closePath();

	        this._fillStroke(ctx, layer);
	      }
	    });

	    L.SVG.include({
	      _updateSquareMarker: function (layer) {
	        var latlng = layer._point;
	        var offset = layer._size / 2.0;

	        if (L.Browser.vml) {
	          latlng._round();
	          offset = Math.round(offset);
	        }

	        var str = 'M' + (latlng.x + offset) + ',' + (latlng.y + offset) +
	          'L' + (latlng.x - offset) + ',' + (latlng.y + offset) +
	          'L' + (latlng.x - offset) + ',' + (latlng.y - offset) +
	          'L' + (latlng.x + offset) + ',' + (latlng.y - offset);

	        str = str + (L.Browser.svg ? 'z' : 'x');

	        this._setPath(layer, str);
	      }
	    });
	  }
	});

	var squareMarker = function (latlng, size, options) {
	  return new SquareMarker(latlng, size, options);
	};

	var DiamondMarker = ShapeMarker.extend({
	  options: {
	    fill: true
	  },

	  initialize: function (latlng, size, options) {
	    ShapeMarker.prototype.initialize.call(this, latlng, size, options);
	  },

	  _updatePath: function () {
	    this._renderer._updateDiamondMarker(this);
	  },

	  _svgCanvasIncludes: function () {
	    L.Canvas.include({
	      _updateDiamondMarker: function (layer) {
	        var latlng = layer._point;
	        var offset = layer._size / 2.0;
	        var ctx = this._ctx;

	        ctx.beginPath();

	        ctx.moveTo(latlng.x, latlng.y + offset);
	        ctx.lineTo(latlng.x - offset, latlng.y);
	        ctx.lineTo(latlng.x, latlng.y - offset);
	        ctx.lineTo(latlng.x + offset, latlng.y);

	        ctx.closePath();

	        this._fillStroke(ctx, layer);
	      }
	    });

	    L.SVG.include({
	      _updateDiamondMarker: function (layer) {
	        var latlng = layer._point;
	        var offset = layer._size / 2.0;

	        if (L.Browser.vml) {
	          latlng._round();
	          offset = Math.round(offset);
	        }

	        var str = 'M' + latlng.x + ',' + (latlng.y + offset) +
	          'L' + (latlng.x - offset) + ',' + latlng.y +
	          'L' + latlng.x + ',' + (latlng.y - offset) +
	          'L' + (latlng.x + offset) + ',' + latlng.y;

	        str = str + (L.Browser.svg ? 'z' : 'x');

	        this._setPath(layer, str);
	      }
	    });
	  }
	});

	var diamondMarker = function (latlng, size, options) {
	  return new DiamondMarker(latlng, size, options);
	};

	var PointSymbol = Symbol.extend({

	  statics: {
	    MARKERTYPES: ['esriSMSCircle', 'esriSMSCross', 'esriSMSDiamond', 'esriSMSSquare', 'esriSMSX', 'esriPMS']
	  },

	  initialize: function (symbolJson, options) {
	    Symbol.prototype.initialize.call(this, symbolJson, options);
	    if (options) {
	      this.serviceUrl = options.url;
	    }
	    if (symbolJson) {
	      if (symbolJson.type === 'esriPMS') {
	        var url = this.serviceUrl + 'images/' + this._symbolJson.url;
	        this._iconUrl = options && options.token ? url + '?token=' + options.token : url;
	        if (symbolJson.imageData) {
	          this._iconUrl = 'data:' + symbolJson.contentType + ';base64,' + symbolJson.imageData;
	        }
	        // leaflet does not allow resizing icons so keep a hash of different
	        // icon sizes to try and keep down on the number of icons created
	        this._icons = {};
	        // create base icon
	        this.icon = this._createIcon(this._symbolJson);
	      } else {
	        this._fillStyles();
	      }
	    }
	  },

	  _fillStyles: function () {
	    if (this._symbolJson.outline && this._symbolJson.size > 0) {
	      this._styles.stroke = true;
	      this._styles.weight = this.pixelValue(this._symbolJson.outline.width);
	      this._styles.color = this.colorValue(this._symbolJson.outline.color);
	      this._styles.opacity = this.alphaValue(this._symbolJson.outline.color);
	    } else {
	      this._styles.stroke = false;
	    }
	    if (this._symbolJson.color) {
	      this._styles.fillColor = this.colorValue(this._symbolJson.color);
	      this._styles.fillOpacity = this.alphaValue(this._symbolJson.color);
	    } else {
	      this._styles.fillOpacity = 0;
	    }

	    if (this._symbolJson.style === 'esriSMSCircle') {
	      this._styles.radius = this.pixelValue(this._symbolJson.size) / 2.0;
	    }
	  },

	  _createIcon: function (options) {
	    var width = this.pixelValue(options.width);
	    var height = width;
	    if (options.height) {
	      height = this.pixelValue(options.height);
	    }
	    var xOffset = width / 2.0;
	    var yOffset = height / 2.0;

	    if (options.xoffset) {
	      xOffset += this.pixelValue(options.xoffset);
	    }
	    if (options.yoffset) {
	      yOffset += this.pixelValue(options.yoffset);
	    }

	    var icon = L.icon({
	      iconUrl: this._iconUrl,
	      iconSize: [width, height],
	      iconAnchor: [xOffset, yOffset]
	    });
	    this._icons[options.width.toString()] = icon;
	    return icon;
	  },

	  _getIcon: function (size) {
	    // check to see if it is already created by size
	    var icon = this._icons[size.toString()];
	    if (!icon) {
	      icon = this._createIcon({width: size});
	    }
	    return icon;
	  },

	  pointToLayer: function (geojson, latlng, visualVariables, options) {
	    var size = this._symbolJson.size || this._symbolJson.width;
	    if (!this._isDefault) {
	      if (visualVariables.sizeInfo) {
	        var calculatedSize = this.getSize(geojson, visualVariables.sizeInfo);
	        if (calculatedSize) {
	          size = calculatedSize;
	        }
	      }
	      if (visualVariables.colorInfo) {
	        var color = this.getColor(geojson, visualVariables.colorInfo);
	        if (color) {
	          this._styles.fillColor = this.colorValue(color);
	          this._styles.fillOpacity = this.alphaValue(color);
	        }
	      }
	    }

	    if (this._symbolJson.type === 'esriPMS') {
	      var layerOptions = L.extend({}, {icon: this._getIcon(size)}, options);
	      return L.marker(latlng, layerOptions);
	    }
	    size = this.pixelValue(size);

	    switch (this._symbolJson.style) {
	      case 'esriSMSSquare':
	        return squareMarker(latlng, size, L.extend({}, this._styles, options));
	      case 'esriSMSDiamond':
	        return diamondMarker(latlng, size, L.extend({}, this._styles, options));
	      case 'esriSMSCross':
	        return crossMarker(latlng, size, L.extend({}, this._styles, options));
	      case 'esriSMSX':
	        return xMarker(latlng, size, L.extend({}, this._styles, options));
	    }
	    this._styles.radius = size / 2.0;
	    return L.circleMarker(latlng, L.extend({}, this._styles, options));
	  }
	});

	function pointSymbol (symbolJson, options) {
	  return new PointSymbol(symbolJson, options);
	}

	var LineSymbol = Symbol.extend({
	  statics: {
	    // Not implemented 'esriSLSNull'
	    LINETYPES: ['esriSLSDash', 'esriSLSDot', 'esriSLSDashDotDot', 'esriSLSDashDot', 'esriSLSSolid']
	  },
	  initialize: function (symbolJson, options) {
	    Symbol.prototype.initialize.call(this, symbolJson, options);
	    this._fillStyles();
	  },

	  _fillStyles: function () {
	    // set the defaults that show up on arcgis online
	    this._styles.lineCap = 'butt';
	    this._styles.lineJoin = 'miter';
	    this._styles.fill = false;
	    this._styles.weight = 0;

	    if (!this._symbolJson) {
	      return this._styles;
	    }

	    if (this._symbolJson.color) {
	      this._styles.color = this.colorValue(this._symbolJson.color);
	      this._styles.opacity = this.alphaValue(this._symbolJson.color);
	    }

	    if (!isNaN(this._symbolJson.width)) {
	      this._styles.weight = this.pixelValue(this._symbolJson.width);

	      var dashValues = [];

	      switch (this._symbolJson.style) {
	        case 'esriSLSDash':
	          dashValues = [4, 3];
	          break;
	        case 'esriSLSDot':
	          dashValues = [1, 3];
	          break;
	        case 'esriSLSDashDot':
	          dashValues = [8, 3, 1, 3];
	          break;
	        case 'esriSLSDashDotDot':
	          dashValues = [8, 3, 1, 3, 1, 3];
	          break;
	      }

	      // use the dash values and the line weight to set dash array
	      if (dashValues.length > 0) {
	        for (var i = 0; i < dashValues.length; i++) {
	          dashValues[i] *= this._styles.weight;
	        }

	        this._styles.dashArray = dashValues.join(',');
	      }
	    }
	  },

	  style: function (feature, visualVariables) {
	    if (!this._isDefault && visualVariables) {
	      if (visualVariables.sizeInfo) {
	        var calculatedSize = this.pixelValue(this.getSize(feature, visualVariables.sizeInfo));
	        if (calculatedSize) {
	          this._styles.weight = calculatedSize;
	        }
	      }
	      if (visualVariables.colorInfo) {
	        var color = this.getColor(feature, visualVariables.colorInfo);
	        if (color) {
	          this._styles.color = this.colorValue(color);
	          this._styles.opacity = this.alphaValue(color);
	        }
	      }
	    }
	    return this._styles;
	  }
	});

	function lineSymbol (symbolJson, options) {
	  return new LineSymbol(symbolJson, options);
	}

	var PolygonSymbol = Symbol.extend({
	  statics: {
	    // not implemented: 'esriSFSBackwardDiagonal','esriSFSCross','esriSFSDiagonalCross','esriSFSForwardDiagonal','esriSFSHorizontal','esriSFSNull','esriSFSVertical'
	    POLYGONTYPES: ['esriSFSSolid']
	  },
	  initialize: function (symbolJson, options) {
	    Symbol.prototype.initialize.call(this, symbolJson, options);
	    if (symbolJson) {
	      this._lineStyles = lineSymbol(symbolJson.outline, options).style();
	      this._fillStyles();
	    }
	  },

	  _fillStyles: function () {
	    if (this._lineStyles) {
	      if (this._lineStyles.weight === 0) {
	        // when weight is 0, setting the stroke to false can still look bad
	        // (gaps between the polygons)
	        this._styles.stroke = false;
	      } else {
	        // copy the line symbol styles into this symbol's styles
	        for (var styleAttr in this._lineStyles) {
	          this._styles[styleAttr] = this._lineStyles[styleAttr];
	        }
	      }
	    }

	    // set the fill for the polygon
	    if (this._symbolJson) {
	      if (this._symbolJson.color &&
	          // don't fill polygon if type is not supported
	          PolygonSymbol.POLYGONTYPES.indexOf(this._symbolJson.style >= 0)) {
	        this._styles.fill = true;
	        this._styles.fillColor = this.colorValue(this._symbolJson.color);
	        this._styles.fillOpacity = this.alphaValue(this._symbolJson.color);
	      } else {
	        this._styles.fill = false;
	        this._styles.fillOpacity = 0;
	      }
	    }
	  },

	  style: function (feature, visualVariables) {
	    if (!this._isDefault && visualVariables && visualVariables.colorInfo) {
	      var color = this.getColor(feature, visualVariables.colorInfo);
	      if (color) {
	        this._styles.fillColor = this.colorValue(color);
	        this._styles.fillOpacity = this.alphaValue(color);
	      }
	    }
	    return this._styles;
	  }
	});

	function polygonSymbol (symbolJson, options) {
	  return new PolygonSymbol(symbolJson, options);
	}

	var Renderer = L.Class.extend({
	  options: {
	    proportionalPolygon: false,
	    clickable: true
	  },

	  initialize: function (rendererJson, options) {
	    this._rendererJson = rendererJson;
	    this._pointSymbols = false;
	    this._symbols = [];
	    this._visualVariables = this._parseVisualVariables(rendererJson.visualVariables);
	    L.Util.setOptions(this, options);
	  },

	  _parseVisualVariables: function (visualVariables) {
	    var visVars = {};
	    if (visualVariables) {
	      for (var i = 0; i < visualVariables.length; i++) {
	        visVars[visualVariables[i].type] = visualVariables[i];
	      }
	    }
	    return visVars;
	  },

	  _createDefaultSymbol: function () {
	    if (this._rendererJson.defaultSymbol) {
	      this._defaultSymbol = this._newSymbol(this._rendererJson.defaultSymbol);
	      this._defaultSymbol._isDefault = true;
	    }
	  },

	  _newSymbol: function (symbolJson) {
	    if (symbolJson.type === 'esriSMS' || symbolJson.type === 'esriPMS') {
	      this._pointSymbols = true;
	      return pointSymbol(symbolJson, this.options);
	    }
	    if (symbolJson.type === 'esriSLS') {
	      return lineSymbol(symbolJson, this.options);
	    }
	    if (symbolJson.type === 'esriSFS') {
	      return polygonSymbol(symbolJson, this.options);
	    }
	  },

	  _getSymbol: function () {
	    // override
	  },

	  attachStylesToLayer: function (layer) {
	    if (this._pointSymbols) {
	      layer.options.pointToLayer = L.Util.bind(this.pointToLayer, this);
	    } else {
	      layer.options.style = L.Util.bind(this.style, this);
	      layer._originalStyle = layer.options.style;
	    }
	  },

	  pointToLayer: function (geojson, latlng) {
	    var sym = this._getSymbol(geojson);
	    if (sym && sym.pointToLayer) {
	      // right now custom panes are the only option pushed through
	      return sym.pointToLayer(geojson, latlng, this._visualVariables, this.options);
	    }
	    // invisible symbology
	    return L.circleMarker(latlng, {radius: 0, opacity: 0});
	  },

	  style: function (feature) {
	    var userStyles;
	    if (this.options.userDefinedStyle) {
	      userStyles = this.options.userDefinedStyle(feature);
	    }
	    // find the symbol to represent this feature
	    var sym = this._getSymbol(feature);
	    if (sym) {
	      return this.mergeStyles(sym.style(feature, this._visualVariables), userStyles);
	    } else {
	      // invisible symbology
	      return this.mergeStyles({opacity: 0, fillOpacity: 0}, userStyles);
	    }
	  },

	  mergeStyles: function (styles, userStyles) {
	    var mergedStyles = {};
	    var attr;
	    // copy renderer style attributes
	    for (attr in styles) {
	      if (styles.hasOwnProperty(attr)) {
	        mergedStyles[attr] = styles[attr];
	      }
	    }
	    // override with user defined style attributes
	    if (userStyles) {
	      for (attr in userStyles) {
	        if (userStyles.hasOwnProperty(attr)) {
	          mergedStyles[attr] = userStyles[attr];
	        }
	      }
	    }
	    return mergedStyles;
	  }
	});

	var SimpleRenderer = Renderer.extend({
	  initialize: function (rendererJson, options) {
	    Renderer.prototype.initialize.call(this, rendererJson, options);
	    this._createSymbol();
	  },

	  _createSymbol: function () {
	    if (this._rendererJson.symbol) {
	      this._symbols.push(this._newSymbol(this._rendererJson.symbol));
	    }
	  },

	  _getSymbol: function () {
	    return this._symbols[0];
	  }
	});

	function simpleRenderer (rendererJson, options) {
	  return new SimpleRenderer(rendererJson, options);
	}

	var ClassBreaksRenderer = Renderer.extend({
	  initialize: function (rendererJson, options) {
	    Renderer.prototype.initialize.call(this, rendererJson, options);
	    this._field = this._rendererJson.field;
	    if (this._rendererJson.normalizationType && this._rendererJson.normalizationType === 'esriNormalizeByField') {
	      this._normalizationField = this._rendererJson.normalizationField;
	    }
	    this._createSymbols();
	  },

	  _createSymbols: function () {
	    var symbol;
	    var classbreaks = this._rendererJson.classBreakInfos;

	    this._symbols = [];

	    // create a symbol for each class break
	    for (var i = classbreaks.length - 1; i >= 0; i--) {
	      if (this.options.proportionalPolygon && this._rendererJson.backgroundFillSymbol) {
	        symbol = this._newSymbol(this._rendererJson.backgroundFillSymbol);
	      } else {
	        symbol = this._newSymbol(classbreaks[i].symbol);
	      }
	      symbol.val = classbreaks[i].classMaxValue;
	      this._symbols.push(symbol);
	    }
	    // sort the symbols in ascending value
	    this._symbols.sort(function (a, b) {
	      return a.val > b.val ? 1 : -1;
	    });
	    this._createDefaultSymbol();
	    this._maxValue = this._symbols[this._symbols.length - 1].val;
	  },

	  _getSymbol: function (feature) {
	    var val = feature.properties[this._field];
	    if (this._normalizationField) {
	      var normValue = feature.properties[this._normalizationField];
	      if (!isNaN(normValue) && normValue !== 0) {
	        val = val / normValue;
	      } else {
	        return this._defaultSymbol;
	      }
	    }

	    if (val > this._maxValue) {
	      return this._defaultSymbol;
	    }
	    var symbol = this._symbols[0];
	    for (var i = this._symbols.length - 1; i >= 0; i--) {
	      if (val > this._symbols[i].val) {
	        break;
	      }
	      symbol = this._symbols[i];
	    }
	    return symbol;
	  }
	});

	function classBreaksRenderer (rendererJson, options) {
	  return new ClassBreaksRenderer(rendererJson, options);
	}

	var UniqueValueRenderer = Renderer.extend({
	  initialize: function (rendererJson, options) {
	    Renderer.prototype.initialize.call(this, rendererJson, options);
	    this._field = this._rendererJson.field1;
	    this._createSymbols();
	  },

	  _createSymbols: function () {
	    var symbol;
	    var uniques = this._rendererJson.uniqueValueInfos;

	    // create a symbol for each unique value
	    for (var i = uniques.length - 1; i >= 0; i--) {
	      symbol = this._newSymbol(uniques[i].symbol);
	      symbol.val = uniques[i].value;
	      this._symbols.push(symbol);
	    }
	    this._createDefaultSymbol();
	  },

	  _getSymbol: function (feature) {
	    var val = feature.properties[this._field];
	    // accumulate values if there is more than one field defined
	    if (this._rendererJson.fieldDelimiter && this._rendererJson.field2) {
	      var val2 = feature.properties[this._rendererJson.field2];
	      if (val2) {
	        val += this._rendererJson.fieldDelimiter + val2;
	        var val3 = feature.properties[this._rendererJson.field3];
	        if (val3) {
	          val += this._rendererJson.fieldDelimiter + val3;
	        }
	      }
	    }

	    var symbol = this._defaultSymbol;
	    for (var i = this._symbols.length - 1; i >= 0; i--) {
	      // using the === operator does not work if the field
	      // of the unique renderer is not a string
	      /*eslint-disable */
	      if (this._symbols[i].val == val) {
	        symbol = this._symbols[i];
	      }
	      /*eslint-enable */
	    }
	    return symbol;
	  }
	});

	function uniqueValueRenderer (rendererJson, options) {
	  return new UniqueValueRenderer(rendererJson, options);
	}

	L.esri.FeatureLayer.addInitHook(function () {
	  if (this.options.ignoreRenderer) {
	    return;
	  }
	  var oldOnAdd = L.Util.bind(this.onAdd, this);
	  var oldUnbindPopup = L.Util.bind(this.unbindPopup, this);
	  var oldOnRemove = L.Util.bind(this.onRemove, this);
	  L.Util.bind(this.createNewLayer, this);

	  this.onAdd = function (map) {
	    this.metadata(function (error, response) {
	      if (error) {
	        console.warn('failed to load metadata from the service.');
	        return
	      } if (response && response.drawingInfo) {
	        if(this.options.drawingInfo) {
	          // allow L.esri.webmap (and others) to override service symbology with info provided in layer constructor
	          var serviceMetadata = response;
	          serviceMetadata.drawingInfo = this.options.drawingInfo;
	          this._setRenderers(serviceMetadata);
	        } else {
	          this._setRenderers(response);
	        }
	        this._setRenderers(response);
	        oldOnAdd(map);
	        this._addPointLayer(map);
	      }
	    }, this);
	  };

	  this.onRemove = function (map) {
	    oldOnRemove(map);
	    if (this._pointLayer) {
	      var pointLayers = this._pointLayer.getLayers();
	      for (var i in pointLayers) {
	        map.removeLayer(pointLayers[i]);
	      }
	    }
	  };

	  this.unbindPopup = function () {
	    oldUnbindPopup();
	    if (this._pointLayer) {
	      var pointLayers = this._pointLayer.getLayers();
	      for (var i in pointLayers) {
	        pointLayers[i].unbindPopup();
	      }
	    }
	  };

	  this._addPointLayer = function (map) {
	    if (this._pointLayer) {
	      this._pointLayer.addTo(map);
	      this._pointLayer.bringToFront();
	    }
	  };

	  this._createPointLayer = function () {
	    if (!this._pointLayer) {
	      this._pointLayer = L.geoJson();
	      // store the feature ids that have already been added to the map
	      this._pointLayerIds = {};

	      if (this._popup) {
	        var popupFunction = function (feature, layer) {
	          layer.bindPopup(this._popup(feature, layer), this._popupOptions);
	        };
	        this._pointLayer.options.onEachFeature = L.Util.bind(popupFunction, this);
	      }
	    }
	  };

	  this.createNewLayer = function (geojson) {
	    var fLayer = L.GeoJSON.geometryToLayer(geojson, this.options);

	    // add a point layer when the polygon is represented as proportional marker symbols
	    if (this._hasProportionalSymbols) {
	      var centroid = this.getPolygonCentroid(geojson.geometry.coordinates);
	      if (!(isNaN(centroid[0]) || isNaN(centroid[0]))) {
	        this._createPointLayer();

	        var featureId = geojson.id.toString();
	        // only add the feature if it does not already exist on the map
	        if (!this._pointLayerIds[featureId]) {
	          var pointjson = this.getPointJson(geojson, centroid);

	          this._pointLayer.addData(pointjson);
	          this._pointLayerIds[featureId] = true;
	        }

	        this._pointLayer.bringToFront();
	      }
	    }
	    return fLayer;
	  };

	  this.getPolygonCentroid = function (coordinates) {
	    var pts = coordinates[0][0];
	    if (pts.length === 2) {
	      pts = coordinates[0];
	    }

	    var twicearea = 0;
	    var x = 0;
	    var y = 0;
	    var nPts = pts.length;
	    var p1;
	    var p2;
	    var f;

	    for (var i = 0, j = nPts - 1; i < nPts; j = i++) {
	      p1 = pts[i]; p2 = pts[j];
	      twicearea += p1[0] * p2[1];
	      twicearea -= p1[1] * p2[0];
	      f = p1[0] * p2[1] - p2[0] * p1[1];
	      x += (p1[0] + p2[0]) * f;
	      y += (p1[1] + p2[1]) * f;
	    }
	    f = twicearea * 3;
	    return [x / f, y / f];
	  };

	  this.getPointJson = function (geojson, centroid) {
	    return {
	      type: 'Feature',
	      properties: geojson.properties,
	      id: geojson.id,
	      geometry: {
	        type: 'Point',
	        coordinates: [centroid[0], centroid[1]]
	      }
	    };
	  };

	  this._checkForProportionalSymbols = function (geometryType, renderer) {
	    this._hasProportionalSymbols = false;
	    if (geometryType === 'esriGeometryPolygon') {
	      if (renderer.backgroundFillSymbol) {
	        this._hasProportionalSymbols = true;
	      }
	      // check to see if the first symbol in the classbreaks is a marker symbol
	      if (renderer.classBreakInfos && renderer.classBreakInfos.length) {
	        var sym = renderer.classBreakInfos[0].symbol;
	        if (sym && (sym.type === 'esriSMS' || sym.type === 'esriPMS')) {
	          this._hasProportionalSymbols = true;
	        }
	      }
	    }
	  };

	  this._setRenderers = function (geojson) {
	    var rend;
	    var rendererInfo = geojson.drawingInfo.renderer;

	    var options = {
	      url: this.options.url
	    };

	    if (this.options.token) {
	      options.token = this.options.token;
	    }
	    if (this.options.pane) {
	      options.pane = this.options.pane;
	    }
	    if (geojson.drawingInfo.transparency) {
	      options.layerTransparency = geojson.drawingInfo.transparency;
	    }
	    if (this.options.style) {
	      options.userDefinedStyle = this.options.style;
	    }

	    switch (rendererInfo.type) {
	      case 'classBreaks':
	        this._checkForProportionalSymbols(geojson.geometryType, rendererInfo);
	        if (this._hasProportionalSymbols) {
	          this._createPointLayer();
	          var pRend = classBreaksRenderer(rendererInfo, options);
	          pRend.attachStylesToLayer(this._pointLayer);
	          options.proportionalPolygon = true;
	        }
	        rend = classBreaksRenderer(rendererInfo, options);
	        break;
	      case 'uniqueValue':
	        rend = uniqueValueRenderer(rendererInfo, options);
	        break;
	      default:
	        rend = simpleRenderer(rendererInfo, options);
	    }
	    rend.attachStylesToLayer(this);
	  };

	  this.metadata(function (error, response) {
	    if (error) {
	      return;
	    } if (response && response.drawingInfo) {
	      // if drawingInfo from a webmap is supplied in the layer constructor, use that instead
	      if (this.options.drawingInfo) {
	        response.drawingInfo = this.options.drawingInfo;
	      }
	      this._setRenderers(response);
	    } if (this._alreadyAdded) {
	      this.setStyle(this._originalStyle);
	    }
	  }, this);
	});

	exports.VERSION = version;
	exports.Renderer = Renderer;
	exports.SimpleRenderer = SimpleRenderer;
	exports.simpleRenderer = simpleRenderer;
	exports.ClassBreaksRenderer = ClassBreaksRenderer;
	exports.classBreaksRenderer = classBreaksRenderer;
	exports.UniqueValueRenderer = UniqueValueRenderer;
	exports.uniqueValueRenderer = uniqueValueRenderer;
	exports.Symbol = Symbol;
	exports.PointSymbol = PointSymbol;
	exports.pointSymbol = pointSymbol;
	exports.LineSymbol = LineSymbol;
	exports.lineSymbol = lineSymbol;
	exports.PolygonSymbol = PolygonSymbol;
	exports.polygonSymbol = polygonSymbol;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LXJlbmRlcmVycy1kZWJ1Zy5qcyIsInNvdXJjZXMiOlsiLi4vcGFja2FnZS5qc29uIiwiLi4vc3JjL1N5bWJvbHMvU3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xlYWZsZXQtc2hhcGUtbWFya2Vycy9zcmMvU2hhcGVNYXJrZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGVhZmxldC1zaGFwZS1tYXJrZXJzL3NyYy9Dcm9zc01hcmtlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9sZWFmbGV0LXNoYXBlLW1hcmtlcnMvc3JjL1hNYXJrZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGVhZmxldC1zaGFwZS1tYXJrZXJzL3NyYy9TcXVhcmVNYXJrZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGVhZmxldC1zaGFwZS1tYXJrZXJzL3NyYy9EaWFtb25kTWFya2VyLmpzIiwiLi4vc3JjL1N5bWJvbHMvUG9pbnRTeW1ib2wuanMiLCIuLi9zcmMvU3ltYm9scy9MaW5lU3ltYm9sLmpzIiwiLi4vc3JjL1N5bWJvbHMvUG9seWdvblN5bWJvbC5qcyIsIi4uL3NyYy9SZW5kZXJlcnMvUmVuZGVyZXIuanMiLCIuLi9zcmMvUmVuZGVyZXJzL1NpbXBsZVJlbmRlcmVyLmpzIiwiLi4vc3JjL1JlbmRlcmVycy9DbGFzc0JyZWFrc1JlbmRlcmVyLmpzIiwiLi4vc3JjL1JlbmRlcmVycy9VbmlxdWVWYWx1ZVJlbmRlcmVyLmpzIiwiLi4vc3JjL0ZlYXR1cmVMYXllckhvb2suanMiXSwic291cmNlc0NvbnRlbnQiOlsie1xuICBcIm5hbWVcIjogXCJlc3JpLWxlYWZsZXQtcmVuZGVyZXJzXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJlc3JpLWxlYWZsZXQgcGx1Z2luIGZvciByZW5kZXJpbmdcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMi4wLjNcIixcbiAgXCJhdXRob3JcIjogXCJSYWNoZWwgTmVobWVyIDxybmVobWVyQGVzcmkuY29tPlwiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2VzcmkvZXNyaS1sZWFmbGV0LXJlbmRlcmVycy9pc3N1ZXNcIlxuICB9LFxuICBcImNvbnRyaWJ1dG9yc1wiOiBbXG4gICAgXCJSYWNoZWwgTmVobWVyIDxybmVobWVyQGVzcmkuY29tPlwiLFxuICAgIFwiSm9obiBHcmF2b2lzIDxqZ3Jhdm9pc0Blc3JpLmNvbT5cIlxuICBdLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgIFwiZXNyaS1sZWFmbGV0XCI6IFwiXjIuMC4wLWJldGEuOFwiLFxuICAgICBcImxlYWZsZXRcIjogXCJeMS4wLjAtYmV0YS4yXCIsXG4gICAgIFwibGVhZmxldC1zaGFwZS1tYXJrZXJzXCI6IFwiXjEuMC40XCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYmFiZWxpZnlcIjogXCJeNi4xLjNcIixcbiAgICBcImNoYWlcIjogXCIyLjMuMFwiLFxuICAgIFwiZ2gtcmVsZWFzZVwiOiBcIl4yLjAuMFwiLFxuICAgIFwiaHR0cC1zZXJ2ZXJcIjogXCJeMC44LjVcIixcbiAgICBcImlzcGFydGFcIjogXCJeMy4wLjNcIixcbiAgICBcImlzdGFuYnVsXCI6IFwiXjAuNC4yXCIsXG4gICAgXCJrYXJtYVwiOiBcIl4wLjEyLjI0XCIsXG4gICAgXCJrYXJtYS1jaGFpLXNpbm9uXCI6IFwiXjAuMS4zXCIsXG4gICAgXCJrYXJtYS1jb3ZlcmFnZVwiOiBcIl4wLjUuM1wiLFxuICAgIFwia2FybWEtbW9jaGFcIjogXCJeMC4xLjBcIixcbiAgICBcImthcm1hLW1vY2hhLXJlcG9ydGVyXCI6IFwiXjAuMi41XCIsXG4gICAgXCJrYXJtYS1waGFudG9tanMtbGF1bmNoZXJcIjogXCJeMC4xLjRcIixcbiAgICBcImthcm1hLXNvdXJjZW1hcC1sb2FkZXJcIjogXCJeMC4zLjVcIixcbiAgICBcIm1rZGlycFwiOiBcIl4wLjUuMVwiLFxuICAgIFwibW9jaGFcIjogXCJeMi4zLjRcIixcbiAgICBcInBoYW50b21qc1wiOiBcIl4xLjkuMTdcIixcbiAgICBcInJvbGx1cFwiOiBcIl4wLjI1LjRcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tanNvblwiOiBcIl4yLjAuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1ub2RlLXJlc29sdmVcIjogXCJeMS40LjBcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tdWdsaWZ5XCI6IFwiXjAuMi4wXCIsXG4gICAgXCJzZW1pc3RhbmRhcmRcIjogXCJeNy4wLjVcIixcbiAgICBcInNpbm9uXCI6IFwiXjEuMTEuMVwiLFxuICAgIFwic2lub24tY2hhaVwiOiBcIjIuNy4wXCIsXG4gICAgXCJ1Z2xpZnktanNcIjogXCJeMi40LjIzXCIsXG4gICAgXCJ3YXRjaFwiOiBcIl4wLjE3LjFcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cDovL2VzcmkuZ2l0aHViLmlvL2VzcmktbGVhZmxldFwiLFxuICBcImpzbmV4dDptYWluXCI6IFwic3JjL0VzcmlMZWFmbGV0UmVuZGVyZXJzLmpzXCIsXG4gIFwianNwbVwiOiB7XG4gICAgXCJyZWdpc3RyeVwiOiBcIm5wbVwiLFxuICAgIFwiZm9ybWF0XCI6IFwiZXM2XCIsXG4gICAgXCJtYWluXCI6IFwic3JjL0VzcmlMZWFmbGV0UmVuZGVyZXJzLmpzXCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJhcmNnaXNcIixcbiAgICBcImVzcmlcIixcbiAgICBcImVzcmkgbGVhZmxldFwiLFxuICAgIFwiZ2lzXCIsXG4gICAgXCJsZWFmbGV0IHBsdWdpblwiLFxuICAgIFwibWFwcGluZ1wiLFxuICAgIFwicmVuZGVyZXJzXCIsXG4gICAgXCJzeW1ib2xvZ3lcIlxuICBdLFxuICBcImxpY2Vuc2VcIjogXCJBcGFjaGUtMi4wXCIsXG4gIFwibWFpblwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LXJlbmRlcmVycy1kZWJ1Zy5qc1wiLFxuICBcImJyb3dzZXJcIjogXCJkaXN0L2VzcmktbGVhZmxldC1yZW5kZXJlcnMtZGVidWcuanNcIixcbiAgXCJyZWFkbWVGaWxlbmFtZVwiOiBcIlJFQURNRS5tZFwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0QGdpdGh1Yi5jb206RXNyaS9lc3JpLWxlYWZsZXQtcmVuZGVyZXJzLmdpdFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG5cbiAgICBcInByZWJ1aWxkXCI6IFwibWtkaXJwIGRpc3RcIixcbiAgICBcImJ1aWxkXCI6IFwicm9sbHVwIC1jIHByb2ZpbGVzL2RlYnVnLmpzICYgcm9sbHVwIC1jIHByb2ZpbGVzL3Byb2R1Y3Rpb24uanNcIixcbiAgICBcImxpbnRcIjogXCJzZW1pc3RhbmRhcmQgc3JjLyoqLyouanNcIixcbiAgICBcInByZXB1Ymxpc2hcIjogXCJucG0gcnVuIGJ1aWxkXCIsXG4gICAgXCJwcmV0ZXN0XCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicmVsZWFzZVwiOiBcIi4vc2NyaXB0cy9yZWxlYXNlLnNoXCIsXG4gICAgXCJzdGFydFwiOiBcIndhdGNoICducG0gcnVuIGJ1aWxkJyBzcmMgJiBodHRwLXNlcnZlciAtcCA1MDAwIC1jLTEgLW9cIixcbiAgICBcInRlc3RcIjogXCJucG0gcnVuIGxpbnQgJiYgbnBtIHJ1biBidWlsZCAmJiBrYXJtYSBzdGFydFwiXG4gIH1cbn1cbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuXG5leHBvcnQgdmFyIFN5bWJvbCA9IEwuQ2xhc3MuZXh0ZW5kKHtcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKHN5bWJvbEpzb24sIG9wdGlvbnMpIHtcbiAgICB0aGlzLl9zeW1ib2xKc29uID0gc3ltYm9sSnNvbjtcbiAgICB0aGlzLnZhbCA9IG51bGw7XG4gICAgdGhpcy5fc3R5bGVzID0ge307XG4gICAgdGhpcy5faXNEZWZhdWx0ID0gZmFsc2U7XG4gICAgdGhpcy5fbGF5ZXJUcmFuc3BhcmVuY3kgPSAxO1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMubGF5ZXJUcmFuc3BhcmVuY3kpIHtcbiAgICAgIHRoaXMuX2xheWVyVHJhbnNwYXJlbmN5ID0gMSAtIChvcHRpb25zLmxheWVyVHJhbnNwYXJlbmN5IC8gMTAwLjApO1xuICAgIH1cbiAgfSxcblxuICAvLyB0aGUgZ2VvanNvbiB2YWx1ZXMgcmV0dXJuZWQgYXJlIGluIHBvaW50c1xuICBwaXhlbFZhbHVlOiBmdW5jdGlvbiAocG9pbnRWYWx1ZSkge1xuICAgIHJldHVybiBwb2ludFZhbHVlICogMS4zMzM7XG4gIH0sXG5cbiAgLy8gY29sb3IgaXMgYW4gYXJyYXkgW3IsZyxiLGFdXG4gIGNvbG9yVmFsdWU6IGZ1bmN0aW9uIChjb2xvcikge1xuICAgIHJldHVybiAncmdiKCcgKyBjb2xvclswXSArICcsJyArIGNvbG9yWzFdICsgJywnICsgY29sb3JbMl0gKyAnKSc7XG4gIH0sXG5cbiAgYWxwaGFWYWx1ZTogZnVuY3Rpb24gKGNvbG9yKSB7XG4gICAgdmFyIGFscGhhID0gY29sb3JbM10gLyAyNTUuMDtcbiAgICByZXR1cm4gYWxwaGEgKiB0aGlzLl9sYXllclRyYW5zcGFyZW5jeTtcbiAgfSxcblxuICBnZXRTaXplOiBmdW5jdGlvbiAoZmVhdHVyZSwgc2l6ZUluZm8pIHtcbiAgICB2YXIgYXR0ciA9IGZlYXR1cmUucHJvcGVydGllcztcbiAgICB2YXIgZmllbGQgPSBzaXplSW5mby5maWVsZDtcbiAgICB2YXIgc2l6ZSA9IDA7XG4gICAgdmFyIGZlYXR1cmVWYWx1ZSA9IG51bGw7XG5cbiAgICBpZiAoZmllbGQpIHtcbiAgICAgIGZlYXR1cmVWYWx1ZSA9IGF0dHJbZmllbGRdO1xuICAgICAgdmFyIG1pblNpemUgPSBzaXplSW5mby5taW5TaXplO1xuICAgICAgdmFyIG1heFNpemUgPSBzaXplSW5mby5tYXhTaXplO1xuICAgICAgdmFyIG1pbkRhdGFWYWx1ZSA9IHNpemVJbmZvLm1pbkRhdGFWYWx1ZTtcbiAgICAgIHZhciBtYXhEYXRhVmFsdWUgPSBzaXplSW5mby5tYXhEYXRhVmFsdWU7XG4gICAgICB2YXIgZmVhdHVyZVJhdGlvO1xuICAgICAgdmFyIG5vcm1GaWVsZCA9IHNpemVJbmZvLm5vcm1hbGl6YXRpb25GaWVsZDtcbiAgICAgIHZhciBub3JtVmFsdWUgPSBhdHRyID8gcGFyc2VGbG9hdChhdHRyW25vcm1GaWVsZF0pIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoZmVhdHVyZVZhbHVlID09PSBudWxsIHx8IChub3JtRmllbGQgJiYgKChpc05hTihub3JtVmFsdWUpIHx8IG5vcm1WYWx1ZSA9PT0gMCkpKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihub3JtVmFsdWUpKSB7XG4gICAgICAgIGZlYXR1cmVWYWx1ZSAvPSBub3JtVmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtaW5TaXplICE9PSBudWxsICYmIG1heFNpemUgIT09IG51bGwgJiYgbWluRGF0YVZhbHVlICE9PSBudWxsICYmIG1heERhdGFWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoZmVhdHVyZVZhbHVlIDw9IG1pbkRhdGFWYWx1ZSkge1xuICAgICAgICAgIHNpemUgPSBtaW5TaXplO1xuICAgICAgICB9IGVsc2UgaWYgKGZlYXR1cmVWYWx1ZSA+PSBtYXhEYXRhVmFsdWUpIHtcbiAgICAgICAgICBzaXplID0gbWF4U2l6ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmZWF0dXJlUmF0aW8gPSAoZmVhdHVyZVZhbHVlIC0gbWluRGF0YVZhbHVlKSAvIChtYXhEYXRhVmFsdWUgLSBtaW5EYXRhVmFsdWUpO1xuICAgICAgICAgIHNpemUgPSBtaW5TaXplICsgKGZlYXR1cmVSYXRpbyAqIChtYXhTaXplIC0gbWluU2l6ZSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzaXplID0gaXNOYU4oc2l6ZSkgPyAwIDogc2l6ZTtcbiAgICB9XG4gICAgcmV0dXJuIHNpemU7XG4gIH0sXG5cbiAgZ2V0Q29sb3I6IGZ1bmN0aW9uIChmZWF0dXJlLCBjb2xvckluZm8pIHtcbiAgICAvLyByZXF1aXJlZCBpbmZvcm1hdGlvbiB0byBnZXQgY29sb3JcbiAgICBpZiAoIShmZWF0dXJlLnByb3BlcnRpZXMgJiYgY29sb3JJbmZvICYmIGNvbG9ySW5mby5maWVsZCAmJiBjb2xvckluZm8uc3RvcHMpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgYXR0ciA9IGZlYXR1cmUucHJvcGVydGllcztcbiAgICB2YXIgZmVhdHVyZVZhbHVlID0gYXR0cltjb2xvckluZm8uZmllbGRdO1xuICAgIHZhciBsb3dlckJvdW5kQ29sb3IsIHVwcGVyQm91bmRDb2xvciwgbG93ZXJCb3VuZCwgdXBwZXJCb3VuZDtcbiAgICB2YXIgbm9ybUZpZWxkID0gY29sb3JJbmZvLm5vcm1hbGl6YXRpb25GaWVsZDtcbiAgICB2YXIgbm9ybVZhbHVlID0gYXR0ciA/IHBhcnNlRmxvYXQoYXR0cltub3JtRmllbGRdKSA6IHVuZGVmaW5lZDtcbiAgICBpZiAoZmVhdHVyZVZhbHVlID09PSBudWxsIHx8IChub3JtRmllbGQgJiYgKChpc05hTihub3JtVmFsdWUpIHx8IG5vcm1WYWx1ZSA9PT0gMCkpKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCFpc05hTihub3JtVmFsdWUpKSB7XG4gICAgICBmZWF0dXJlVmFsdWUgLz0gbm9ybVZhbHVlO1xuICAgIH1cblxuICAgIGlmIChmZWF0dXJlVmFsdWUgPD0gY29sb3JJbmZvLnN0b3BzWzBdLnZhbHVlKSB7XG4gICAgICByZXR1cm4gY29sb3JJbmZvLnN0b3BzWzBdLmNvbG9yO1xuICAgIH1cbiAgICB2YXIgbGFzdFN0b3AgPSBjb2xvckluZm8uc3RvcHNbY29sb3JJbmZvLnN0b3BzLmxlbmd0aCAtIDFdO1xuICAgIGlmIChmZWF0dXJlVmFsdWUgPj0gbGFzdFN0b3AudmFsdWUpIHtcbiAgICAgIHJldHVybiBsYXN0U3RvcC5jb2xvcjtcbiAgICB9XG5cbiAgICAvLyBnbyB0aHJvdWdoIHRoZSBzdG9wcyB0byBmaW5kIG1pbiBhbmQgbWF4XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2xvckluZm8uc3RvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzdG9wSW5mbyA9IGNvbG9ySW5mby5zdG9wc1tpXTtcblxuICAgICAgaWYgKHN0b3BJbmZvLnZhbHVlIDw9IGZlYXR1cmVWYWx1ZSkge1xuICAgICAgICBsb3dlckJvdW5kQ29sb3IgPSBzdG9wSW5mby5jb2xvcjtcbiAgICAgICAgbG93ZXJCb3VuZCA9IHN0b3BJbmZvLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChzdG9wSW5mby52YWx1ZSA+IGZlYXR1cmVWYWx1ZSkge1xuICAgICAgICB1cHBlckJvdW5kQ29sb3IgPSBzdG9wSW5mby5jb2xvcjtcbiAgICAgICAgdXBwZXJCb3VuZCA9IHN0b3BJbmZvLnZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmZWF0dXJlIGZhbGxzIGJldHdlZW4gdHdvIHN0b3BzLCBpbnRlcnBsYXRlIHRoZSBjb2xvcnNcbiAgICBpZiAoIWlzTmFOKGxvd2VyQm91bmQpICYmICFpc05hTih1cHBlckJvdW5kKSkge1xuICAgICAgdmFyIHJhbmdlID0gdXBwZXJCb3VuZCAtIGxvd2VyQm91bmQ7XG4gICAgICBpZiAocmFuZ2UgPiAwKSB7XG4gICAgICAgIC8vIG1vcmUgd2VpZ2h0IHRoZSBmdXJ0aGVyIGl0IGlzIGZyb20gdGhlIGxvd2VyIGJvdW5kXG4gICAgICAgIHZhciB1cHBlckJvdW5kQ29sb3JXZWlnaHQgPSAoZmVhdHVyZVZhbHVlIC0gbG93ZXJCb3VuZCkgLyByYW5nZTtcbiAgICAgICAgaWYgKHVwcGVyQm91bmRDb2xvcldlaWdodCkge1xuICAgICAgICAgIC8vIG1vcmUgd2VpZ2h0IHRoZSBmdXJ0aGVyIGl0IGlzIGZyb20gdGhlIHVwcGVyIGJvdW5kXG4gICAgICAgICAgdmFyIGxvd2VyQm91bmRDb2xvcldlaWdodCA9ICh1cHBlckJvdW5kIC0gZmVhdHVyZVZhbHVlKSAvIHJhbmdlO1xuICAgICAgICAgIGlmIChsb3dlckJvdW5kQ29sb3JXZWlnaHQpIHtcbiAgICAgICAgICAgIC8vIGludGVycG9sYXRlIHRoZSBsb3dlciBhbmQgdXBwZXIgYm91bmQgY29sb3IgYnkgYXBwbHlpbmcgdGhlXG4gICAgICAgICAgICAvLyB3ZWlnaHRzIHRvIGVhY2ggb2YgdGhlIHJnYmEgY29sb3JzIGFuZCBhZGRpbmcgdGhlbSB0b2dldGhlclxuICAgICAgICAgICAgdmFyIGludGVycG9sYXRlZENvbG9yID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDQ7IGorKykge1xuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZWRDb2xvcltqXSA9IE1hdGgucm91bmQobG93ZXJCb3VuZENvbG9yW2pdICogbG93ZXJCb3VuZENvbG9yV2VpZ2h0ICsgdXBwZXJCb3VuZENvbG9yW2pdICogdXBwZXJCb3VuZENvbG9yV2VpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbnRlcnBvbGF0ZWRDb2xvcjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gbm8gZGlmZmVyZW5jZSBiZXR3ZWVuIGZlYXR1cmVWYWx1ZSBhbmQgdXBwZXJCb3VuZCwgMTAwJSBvZiB1cHBlckJvdW5kQ29sb3JcbiAgICAgICAgICAgIHJldHVybiB1cHBlckJvdW5kQ29sb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG5vIGRpZmZlcmVuY2UgYmV0d2VlbiBmZWF0dXJlVmFsdWUgYW5kIGxvd2VyQm91bmQsIDEwMCUgb2YgbG93ZXJCb3VuZENvbG9yXG4gICAgICAgICAgcmV0dXJuIGxvd2VyQm91bmRDb2xvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBpZiB3ZSBnZXQgdG8gaGVyZSwgbm9uZSBvZiB0aGUgY2FzZXMgYXBwbHkgc28gcmV0dXJuIG51bGxcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufSk7XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBzeW1ib2wgKHN5bWJvbEpzb24pIHtcbi8vICAgcmV0dXJuIG5ldyBTeW1ib2woc3ltYm9sSnNvbik7XG4vLyB9XG5cbmV4cG9ydCBkZWZhdWx0IFN5bWJvbDtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuXG5leHBvcnQgdmFyIFNoYXBlTWFya2VyID0gTC5QYXRoLmV4dGVuZCh7XG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKGxhdGxuZywgc2l6ZSwgb3B0aW9ucykge1xuICAgIEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9zaXplID0gc2l6ZTtcbiAgICB0aGlzLl9sYXRsbmcgPSBMLmxhdExuZyhsYXRsbmcpO1xuICAgIHRoaXMuX3N2Z0NhbnZhc0luY2x1ZGVzKCk7XG4gIH0sXG5cbiAgdG9HZW9KU09OOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEwuR2VvSlNPTi5nZXRGZWF0dXJlKHRoaXMsIHtcbiAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICBjb29yZGluYXRlczogTC5HZW9KU09OLmxhdExuZ1RvQ29vcmRzKHRoaXMuZ2V0TGF0TG5nKCkpXG4gICAgfSk7XG4gIH0sXG5cbiAgX3N2Z0NhbnZhc0luY2x1ZGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gaW1wbGVtZW50IGluIHN1YiBjbGFzc1xuICB9LFxuXG4gIF9wcm9qZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fcG9pbnQgPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KHRoaXMuX2xhdGxuZyk7XG4gIH0sXG5cbiAgX3VwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgIHRoaXMuX3VwZGF0ZVBhdGgoKTtcbiAgICB9XG4gIH0sXG5cbiAgX3VwZGF0ZVBhdGg6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBpbXBsZW1lbnQgaW4gc3ViIGNsYXNzXG4gIH0sXG5cbiAgc2V0TGF0TG5nOiBmdW5jdGlvbiAobGF0bG5nKSB7XG4gICAgdGhpcy5fbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcbiAgICB0aGlzLnJlZHJhdygpO1xuICAgIHJldHVybiB0aGlzLmZpcmUoJ21vdmUnLCB7bGF0bG5nOiB0aGlzLl9sYXRsbmd9KTtcbiAgfSxcblxuICBnZXRMYXRMbmc6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGF0bG5nO1xuICB9LFxuXG4gIHNldFNpemU6IGZ1bmN0aW9uIChzaXplKSB7XG4gICAgdGhpcy5fc2l6ZSA9IHNpemU7XG4gICAgcmV0dXJuIHRoaXMucmVkcmF3KCk7XG4gIH0sXG5cbiAgZ2V0U2l6ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG59KTtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgU2hhcGVNYXJrZXIgfSBmcm9tICcuL1NoYXBlTWFya2VyJztcblxuZXhwb3J0IHZhciBDcm9zc01hcmtlciA9IFNoYXBlTWFya2VyLmV4dGVuZCh7XG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKGxhdGxuZywgc2l6ZSwgb3B0aW9ucykge1xuICAgIFNoYXBlTWFya2VyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgbGF0bG5nLCBzaXplLCBvcHRpb25zKTtcbiAgfSxcblxuICBfdXBkYXRlUGF0aDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3JlbmRlcmVyLl91cGRhdGVDcm9zc01hcmtlcih0aGlzKTtcbiAgfSxcblxuICBfc3ZnQ2FudmFzSW5jbHVkZXM6IGZ1bmN0aW9uICgpIHtcbiAgICBMLkNhbnZhcy5pbmNsdWRlKHtcbiAgICAgIF91cGRhdGVDcm9zc01hcmtlcjogZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgIHZhciBsYXRsbmcgPSBsYXllci5fcG9pbnQ7XG4gICAgICAgIHZhciBvZmZzZXQgPSBsYXllci5fc2l6ZSAvIDIuMDtcbiAgICAgICAgdmFyIGN0eCA9IHRoaXMuX2N0eDtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8obGF0bG5nLngsIGxhdGxuZy55ICsgb2Zmc2V0KTtcbiAgICAgICAgY3R4LmxpbmVUbyhsYXRsbmcueCwgbGF0bG5nLnkgLSBvZmZzZXQpO1xuICAgICAgICB0aGlzLl9maWxsU3Ryb2tlKGN0eCwgbGF5ZXIpO1xuXG4gICAgICAgIGN0eC5tb3ZlVG8obGF0bG5nLnggLSBvZmZzZXQsIGxhdGxuZy55KTtcbiAgICAgICAgY3R4LmxpbmVUbyhsYXRsbmcueCArIG9mZnNldCwgbGF0bG5nLnkpO1xuICAgICAgICB0aGlzLl9maWxsU3Ryb2tlKGN0eCwgbGF5ZXIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTC5TVkcuaW5jbHVkZSh7XG4gICAgICBfdXBkYXRlQ3Jvc3NNYXJrZXI6IGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICB2YXIgbGF0bG5nID0gbGF5ZXIuX3BvaW50O1xuICAgICAgICB2YXIgb2Zmc2V0ID0gbGF5ZXIuX3NpemUgLyAyLjA7XG5cbiAgICAgICAgaWYgKEwuQnJvd3Nlci52bWwpIHtcbiAgICAgICAgICBsYXRsbmcuX3JvdW5kKCk7XG4gICAgICAgICAgb2Zmc2V0ID0gTWF0aC5yb3VuZChvZmZzZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0ciA9ICdNJyArIGxhdGxuZy54ICsgJywnICsgKGxhdGxuZy55ICsgb2Zmc2V0KSArXG4gICAgICAgICAgJ0wnICsgbGF0bG5nLnggKyAnLCcgKyAobGF0bG5nLnkgLSBvZmZzZXQpICtcbiAgICAgICAgICAnTScgKyAobGF0bG5nLnggLSBvZmZzZXQpICsgJywnICsgbGF0bG5nLnkgK1xuICAgICAgICAgICdMJyArIChsYXRsbmcueCArIG9mZnNldCkgKyAnLCcgKyBsYXRsbmcueTtcblxuICAgICAgICB0aGlzLl9zZXRQYXRoKGxheWVyLCBzdHIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59KTtcblxuZXhwb3J0IHZhciBjcm9zc01hcmtlciA9IGZ1bmN0aW9uIChsYXRsbmcsIHNpemUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBDcm9zc01hcmtlcihsYXRsbmcsIHNpemUsIG9wdGlvbnMpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3Jvc3NNYXJrZXI7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IFNoYXBlTWFya2VyIH0gZnJvbSAnLi9TaGFwZU1hcmtlcic7XG5cbmV4cG9ydCB2YXIgWE1hcmtlciA9IFNoYXBlTWFya2VyLmV4dGVuZCh7XG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKGxhdGxuZywgc2l6ZSwgb3B0aW9ucykge1xuICAgIFNoYXBlTWFya2VyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgbGF0bG5nLCBzaXplLCBvcHRpb25zKTtcbiAgfSxcblxuICBfdXBkYXRlUGF0aDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3JlbmRlcmVyLl91cGRhdGVYTWFya2VyKHRoaXMpO1xuICB9LFxuXG4gIF9zdmdDYW52YXNJbmNsdWRlczogZnVuY3Rpb24gKCkge1xuICAgIEwuQ2FudmFzLmluY2x1ZGUoe1xuICAgICAgX3VwZGF0ZVhNYXJrZXI6IGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICB2YXIgbGF0bG5nID0gbGF5ZXIuX3BvaW50O1xuICAgICAgICB2YXIgb2Zmc2V0ID0gbGF5ZXIuX3NpemUgLyAyLjA7XG4gICAgICAgIHZhciBjdHggPSB0aGlzLl9jdHg7XG5cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgICAgIGN0eC5tb3ZlVG8obGF0bG5nLnggKyBvZmZzZXQsIGxhdGxuZy55ICsgb2Zmc2V0KTtcbiAgICAgICAgY3R4LmxpbmVUbyhsYXRsbmcueCAtIG9mZnNldCwgbGF0bG5nLnkgLSBvZmZzZXQpO1xuICAgICAgICB0aGlzLl9maWxsU3Ryb2tlKGN0eCwgbGF5ZXIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTC5TVkcuaW5jbHVkZSh7XG4gICAgICBfdXBkYXRlWE1hcmtlcjogZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgIHZhciBsYXRsbmcgPSBsYXllci5fcG9pbnQ7XG4gICAgICAgIHZhciBvZmZzZXQgPSBsYXllci5fc2l6ZSAvIDIuMDtcblxuICAgICAgICBpZiAoTC5Ccm93c2VyLnZtbCkge1xuICAgICAgICAgIGxhdGxuZy5fcm91bmQoKTtcbiAgICAgICAgICBvZmZzZXQgPSBNYXRoLnJvdW5kKG9mZnNldCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RyID0gJ00nICsgKGxhdGxuZy54ICsgb2Zmc2V0KSArICcsJyArIChsYXRsbmcueSArIG9mZnNldCkgK1xuICAgICAgICAgICdMJyArIChsYXRsbmcueCAtIG9mZnNldCkgKyAnLCcgKyAobGF0bG5nLnkgLSBvZmZzZXQpICtcbiAgICAgICAgICAnTScgKyAobGF0bG5nLnggLSBvZmZzZXQpICsgJywnICsgKGxhdGxuZy55ICsgb2Zmc2V0KSArXG4gICAgICAgICAgJ0wnICsgKGxhdGxuZy54ICsgb2Zmc2V0KSArICcsJyArIChsYXRsbmcueSAtIG9mZnNldCk7XG5cbiAgICAgICAgdGhpcy5fc2V0UGF0aChsYXllciwgc3RyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufSk7XG5cbmV4cG9ydCB2YXIgeE1hcmtlciA9IGZ1bmN0aW9uIChsYXRsbmcsIHNpemUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBYTWFya2VyKGxhdGxuZywgc2l6ZSwgb3B0aW9ucyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB4TWFya2VyO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBTaGFwZU1hcmtlciB9IGZyb20gJy4vU2hhcGVNYXJrZXInO1xuXG5leHBvcnQgdmFyIFNxdWFyZU1hcmtlciA9IFNoYXBlTWFya2VyLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBmaWxsOiB0cnVlXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKGxhdGxuZywgc2l6ZSwgb3B0aW9ucykge1xuICAgIFNoYXBlTWFya2VyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgbGF0bG5nLCBzaXplLCBvcHRpb25zKTtcbiAgfSxcblxuICBfdXBkYXRlUGF0aDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3JlbmRlcmVyLl91cGRhdGVTcXVhcmVNYXJrZXIodGhpcyk7XG4gIH0sXG5cbiAgX3N2Z0NhbnZhc0luY2x1ZGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgTC5DYW52YXMuaW5jbHVkZSh7XG4gICAgICBfdXBkYXRlU3F1YXJlTWFya2VyOiBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgdmFyIGxhdGxuZyA9IGxheWVyLl9wb2ludDtcbiAgICAgICAgdmFyIG9mZnNldCA9IGxheWVyLl9zaXplIC8gMi4wO1xuICAgICAgICB2YXIgY3R4ID0gdGhpcy5fY3R4O1xuXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcblxuICAgICAgICBjdHgubW92ZVRvKGxhdGxuZy54ICsgb2Zmc2V0LCBsYXRsbmcueSArIG9mZnNldCk7XG4gICAgICAgIGN0eC5saW5lVG8obGF0bG5nLnggLSBvZmZzZXQsIGxhdGxuZy55ICsgb2Zmc2V0KTtcbiAgICAgICAgY3R4LmxpbmVUbyhsYXRsbmcueCAtIG9mZnNldCwgbGF0bG5nLnkgLSBvZmZzZXQpO1xuICAgICAgICBjdHgubGluZVRvKGxhdGxuZy54ICsgb2Zmc2V0LCBsYXRsbmcueSAtIG9mZnNldCk7XG5cbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgIHRoaXMuX2ZpbGxTdHJva2UoY3R4LCBsYXllcik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBMLlNWRy5pbmNsdWRlKHtcbiAgICAgIF91cGRhdGVTcXVhcmVNYXJrZXI6IGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICB2YXIgbGF0bG5nID0gbGF5ZXIuX3BvaW50O1xuICAgICAgICB2YXIgb2Zmc2V0ID0gbGF5ZXIuX3NpemUgLyAyLjA7XG5cbiAgICAgICAgaWYgKEwuQnJvd3Nlci52bWwpIHtcbiAgICAgICAgICBsYXRsbmcuX3JvdW5kKCk7XG4gICAgICAgICAgb2Zmc2V0ID0gTWF0aC5yb3VuZChvZmZzZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0ciA9ICdNJyArIChsYXRsbmcueCArIG9mZnNldCkgKyAnLCcgKyAobGF0bG5nLnkgKyBvZmZzZXQpICtcbiAgICAgICAgICAnTCcgKyAobGF0bG5nLnggLSBvZmZzZXQpICsgJywnICsgKGxhdGxuZy55ICsgb2Zmc2V0KSArXG4gICAgICAgICAgJ0wnICsgKGxhdGxuZy54IC0gb2Zmc2V0KSArICcsJyArIChsYXRsbmcueSAtIG9mZnNldCkgK1xuICAgICAgICAgICdMJyArIChsYXRsbmcueCArIG9mZnNldCkgKyAnLCcgKyAobGF0bG5nLnkgLSBvZmZzZXQpO1xuXG4gICAgICAgIHN0ciA9IHN0ciArIChMLkJyb3dzZXIuc3ZnID8gJ3onIDogJ3gnKTtcblxuICAgICAgICB0aGlzLl9zZXRQYXRoKGxheWVyLCBzdHIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59KTtcblxuZXhwb3J0IHZhciBzcXVhcmVNYXJrZXIgPSBmdW5jdGlvbiAobGF0bG5nLCBzaXplLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgU3F1YXJlTWFya2VyKGxhdGxuZywgc2l6ZSwgb3B0aW9ucyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzcXVhcmVNYXJrZXI7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IFNoYXBlTWFya2VyIH0gZnJvbSAnLi9TaGFwZU1hcmtlcic7XG5cbmV4cG9ydCB2YXIgRGlhbW9uZE1hcmtlciA9IFNoYXBlTWFya2VyLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBmaWxsOiB0cnVlXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKGxhdGxuZywgc2l6ZSwgb3B0aW9ucykge1xuICAgIFNoYXBlTWFya2VyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgbGF0bG5nLCBzaXplLCBvcHRpb25zKTtcbiAgfSxcblxuICBfdXBkYXRlUGF0aDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3JlbmRlcmVyLl91cGRhdGVEaWFtb25kTWFya2VyKHRoaXMpO1xuICB9LFxuXG4gIF9zdmdDYW52YXNJbmNsdWRlczogZnVuY3Rpb24gKCkge1xuICAgIEwuQ2FudmFzLmluY2x1ZGUoe1xuICAgICAgX3VwZGF0ZURpYW1vbmRNYXJrZXI6IGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICB2YXIgbGF0bG5nID0gbGF5ZXIuX3BvaW50O1xuICAgICAgICB2YXIgb2Zmc2V0ID0gbGF5ZXIuX3NpemUgLyAyLjA7XG4gICAgICAgIHZhciBjdHggPSB0aGlzLl9jdHg7XG5cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgICAgIGN0eC5tb3ZlVG8obGF0bG5nLngsIGxhdGxuZy55ICsgb2Zmc2V0KTtcbiAgICAgICAgY3R4LmxpbmVUbyhsYXRsbmcueCAtIG9mZnNldCwgbGF0bG5nLnkpO1xuICAgICAgICBjdHgubGluZVRvKGxhdGxuZy54LCBsYXRsbmcueSAtIG9mZnNldCk7XG4gICAgICAgIGN0eC5saW5lVG8obGF0bG5nLnggKyBvZmZzZXQsIGxhdGxuZy55KTtcblxuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgdGhpcy5fZmlsbFN0cm9rZShjdHgsIGxheWVyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIEwuU1ZHLmluY2x1ZGUoe1xuICAgICAgX3VwZGF0ZURpYW1vbmRNYXJrZXI6IGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICB2YXIgbGF0bG5nID0gbGF5ZXIuX3BvaW50O1xuICAgICAgICB2YXIgb2Zmc2V0ID0gbGF5ZXIuX3NpemUgLyAyLjA7XG5cbiAgICAgICAgaWYgKEwuQnJvd3Nlci52bWwpIHtcbiAgICAgICAgICBsYXRsbmcuX3JvdW5kKCk7XG4gICAgICAgICAgb2Zmc2V0ID0gTWF0aC5yb3VuZChvZmZzZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0ciA9ICdNJyArIGxhdGxuZy54ICsgJywnICsgKGxhdGxuZy55ICsgb2Zmc2V0KSArXG4gICAgICAgICAgJ0wnICsgKGxhdGxuZy54IC0gb2Zmc2V0KSArICcsJyArIGxhdGxuZy55ICtcbiAgICAgICAgICAnTCcgKyBsYXRsbmcueCArICcsJyArIChsYXRsbmcueSAtIG9mZnNldCkgK1xuICAgICAgICAgICdMJyArIChsYXRsbmcueCArIG9mZnNldCkgKyAnLCcgKyBsYXRsbmcueTtcblxuICAgICAgICBzdHIgPSBzdHIgKyAoTC5Ccm93c2VyLnN2ZyA/ICd6JyA6ICd4Jyk7XG5cbiAgICAgICAgdGhpcy5fc2V0UGF0aChsYXllciwgc3RyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufSk7XG5cbmV4cG9ydCB2YXIgZGlhbW9uZE1hcmtlciA9IGZ1bmN0aW9uIChsYXRsbmcsIHNpemUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBEaWFtb25kTWFya2VyKGxhdGxuZywgc2l6ZSwgb3B0aW9ucyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBkaWFtb25kTWFya2VyO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy4vU3ltYm9sJztcbmltcG9ydCB7c3F1YXJlTWFya2VyLCB4TWFya2VyLCBjcm9zc01hcmtlciwgZGlhbW9uZE1hcmtlcn0gZnJvbSAnbGVhZmxldC1zaGFwZS1tYXJrZXJzJztcblxuZXhwb3J0IHZhciBQb2ludFN5bWJvbCA9IFN5bWJvbC5leHRlbmQoe1xuXG4gIHN0YXRpY3M6IHtcbiAgICBNQVJLRVJUWVBFUzogWydlc3JpU01TQ2lyY2xlJywgJ2VzcmlTTVNDcm9zcycsICdlc3JpU01TRGlhbW9uZCcsICdlc3JpU01TU3F1YXJlJywgJ2VzcmlTTVNYJywgJ2VzcmlQTVMnXVxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChzeW1ib2xKc29uLCBvcHRpb25zKSB7XG4gICAgU3ltYm9sLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgc3ltYm9sSnNvbiwgb3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuc2VydmljZVVybCA9IG9wdGlvbnMudXJsO1xuICAgIH1cbiAgICBpZiAoc3ltYm9sSnNvbikge1xuICAgICAgaWYgKHN5bWJvbEpzb24udHlwZSA9PT0gJ2VzcmlQTVMnKSB7XG4gICAgICAgIHZhciB1cmwgPSB0aGlzLnNlcnZpY2VVcmwgKyAnaW1hZ2VzLycgKyB0aGlzLl9zeW1ib2xKc29uLnVybDtcbiAgICAgICAgdGhpcy5faWNvblVybCA9IG9wdGlvbnMgJiYgb3B0aW9ucy50b2tlbiA/IHVybCArICc/dG9rZW49JyArIG9wdGlvbnMudG9rZW4gOiB1cmw7XG4gICAgICAgIGlmIChzeW1ib2xKc29uLmltYWdlRGF0YSkge1xuICAgICAgICAgIHRoaXMuX2ljb25VcmwgPSAnZGF0YTonICsgc3ltYm9sSnNvbi5jb250ZW50VHlwZSArICc7YmFzZTY0LCcgKyBzeW1ib2xKc29uLmltYWdlRGF0YTtcbiAgICAgICAgfVxuICAgICAgICAvLyBsZWFmbGV0IGRvZXMgbm90IGFsbG93IHJlc2l6aW5nIGljb25zIHNvIGtlZXAgYSBoYXNoIG9mIGRpZmZlcmVudFxuICAgICAgICAvLyBpY29uIHNpemVzIHRvIHRyeSBhbmQga2VlcCBkb3duIG9uIHRoZSBudW1iZXIgb2YgaWNvbnMgY3JlYXRlZFxuICAgICAgICB0aGlzLl9pY29ucyA9IHt9O1xuICAgICAgICAvLyBjcmVhdGUgYmFzZSBpY29uXG4gICAgICAgIHRoaXMuaWNvbiA9IHRoaXMuX2NyZWF0ZUljb24odGhpcy5fc3ltYm9sSnNvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9maWxsU3R5bGVzKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9maWxsU3R5bGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX3N5bWJvbEpzb24ub3V0bGluZSAmJiB0aGlzLl9zeW1ib2xKc29uLnNpemUgPiAwKSB7XG4gICAgICB0aGlzLl9zdHlsZXMuc3Ryb2tlID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3N0eWxlcy53ZWlnaHQgPSB0aGlzLnBpeGVsVmFsdWUodGhpcy5fc3ltYm9sSnNvbi5vdXRsaW5lLndpZHRoKTtcbiAgICAgIHRoaXMuX3N0eWxlcy5jb2xvciA9IHRoaXMuY29sb3JWYWx1ZSh0aGlzLl9zeW1ib2xKc29uLm91dGxpbmUuY29sb3IpO1xuICAgICAgdGhpcy5fc3R5bGVzLm9wYWNpdHkgPSB0aGlzLmFscGhhVmFsdWUodGhpcy5fc3ltYm9sSnNvbi5vdXRsaW5lLmNvbG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc3R5bGVzLnN0cm9rZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc3ltYm9sSnNvbi5jb2xvcikge1xuICAgICAgdGhpcy5fc3R5bGVzLmZpbGxDb2xvciA9IHRoaXMuY29sb3JWYWx1ZSh0aGlzLl9zeW1ib2xKc29uLmNvbG9yKTtcbiAgICAgIHRoaXMuX3N0eWxlcy5maWxsT3BhY2l0eSA9IHRoaXMuYWxwaGFWYWx1ZSh0aGlzLl9zeW1ib2xKc29uLmNvbG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc3R5bGVzLmZpbGxPcGFjaXR5ID0gMDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc3ltYm9sSnNvbi5zdHlsZSA9PT0gJ2VzcmlTTVNDaXJjbGUnKSB7XG4gICAgICB0aGlzLl9zdHlsZXMucmFkaXVzID0gdGhpcy5waXhlbFZhbHVlKHRoaXMuX3N5bWJvbEpzb24uc2l6ZSkgLyAyLjA7XG4gICAgfVxuICB9LFxuXG4gIF9jcmVhdGVJY29uOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciB3aWR0aCA9IHRoaXMucGl4ZWxWYWx1ZShvcHRpb25zLndpZHRoKTtcbiAgICB2YXIgaGVpZ2h0ID0gd2lkdGg7XG4gICAgaWYgKG9wdGlvbnMuaGVpZ2h0KSB7XG4gICAgICBoZWlnaHQgPSB0aGlzLnBpeGVsVmFsdWUob3B0aW9ucy5oZWlnaHQpO1xuICAgIH1cbiAgICB2YXIgeE9mZnNldCA9IHdpZHRoIC8gMi4wO1xuICAgIHZhciB5T2Zmc2V0ID0gaGVpZ2h0IC8gMi4wO1xuXG4gICAgaWYgKG9wdGlvbnMueG9mZnNldCkge1xuICAgICAgeE9mZnNldCArPSB0aGlzLnBpeGVsVmFsdWUob3B0aW9ucy54b2Zmc2V0KTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMueW9mZnNldCkge1xuICAgICAgeU9mZnNldCArPSB0aGlzLnBpeGVsVmFsdWUob3B0aW9ucy55b2Zmc2V0KTtcbiAgICB9XG5cbiAgICB2YXIgaWNvbiA9IEwuaWNvbih7XG4gICAgICBpY29uVXJsOiB0aGlzLl9pY29uVXJsLFxuICAgICAgaWNvblNpemU6IFt3aWR0aCwgaGVpZ2h0XSxcbiAgICAgIGljb25BbmNob3I6IFt4T2Zmc2V0LCB5T2Zmc2V0XVxuICAgIH0pO1xuICAgIHRoaXMuX2ljb25zW29wdGlvbnMud2lkdGgudG9TdHJpbmcoKV0gPSBpY29uO1xuICAgIHJldHVybiBpY29uO1xuICB9LFxuXG4gIF9nZXRJY29uOiBmdW5jdGlvbiAoc2l6ZSkge1xuICAgIC8vIGNoZWNrIHRvIHNlZSBpZiBpdCBpcyBhbHJlYWR5IGNyZWF0ZWQgYnkgc2l6ZVxuICAgIHZhciBpY29uID0gdGhpcy5faWNvbnNbc2l6ZS50b1N0cmluZygpXTtcbiAgICBpZiAoIWljb24pIHtcbiAgICAgIGljb24gPSB0aGlzLl9jcmVhdGVJY29uKHt3aWR0aDogc2l6ZX0pO1xuICAgIH1cbiAgICByZXR1cm4gaWNvbjtcbiAgfSxcblxuICBwb2ludFRvTGF5ZXI6IGZ1bmN0aW9uIChnZW9qc29uLCBsYXRsbmcsIHZpc3VhbFZhcmlhYmxlcywgb3B0aW9ucykge1xuICAgIHZhciBzaXplID0gdGhpcy5fc3ltYm9sSnNvbi5zaXplIHx8IHRoaXMuX3N5bWJvbEpzb24ud2lkdGg7XG4gICAgaWYgKCF0aGlzLl9pc0RlZmF1bHQpIHtcbiAgICAgIGlmICh2aXN1YWxWYXJpYWJsZXMuc2l6ZUluZm8pIHtcbiAgICAgICAgdmFyIGNhbGN1bGF0ZWRTaXplID0gdGhpcy5nZXRTaXplKGdlb2pzb24sIHZpc3VhbFZhcmlhYmxlcy5zaXplSW5mbyk7XG4gICAgICAgIGlmIChjYWxjdWxhdGVkU2l6ZSkge1xuICAgICAgICAgIHNpemUgPSBjYWxjdWxhdGVkU2l6ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHZpc3VhbFZhcmlhYmxlcy5jb2xvckluZm8pIHtcbiAgICAgICAgdmFyIGNvbG9yID0gdGhpcy5nZXRDb2xvcihnZW9qc29uLCB2aXN1YWxWYXJpYWJsZXMuY29sb3JJbmZvKTtcbiAgICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgICAgdGhpcy5fc3R5bGVzLmZpbGxDb2xvciA9IHRoaXMuY29sb3JWYWx1ZShjb2xvcik7XG4gICAgICAgICAgdGhpcy5fc3R5bGVzLmZpbGxPcGFjaXR5ID0gdGhpcy5hbHBoYVZhbHVlKGNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9zeW1ib2xKc29uLnR5cGUgPT09ICdlc3JpUE1TJykge1xuICAgICAgdmFyIGxheWVyT3B0aW9ucyA9IEwuZXh0ZW5kKHt9LCB7aWNvbjogdGhpcy5fZ2V0SWNvbihzaXplKX0sIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIEwubWFya2VyKGxhdGxuZywgbGF5ZXJPcHRpb25zKTtcbiAgICB9XG4gICAgc2l6ZSA9IHRoaXMucGl4ZWxWYWx1ZShzaXplKTtcblxuICAgIHN3aXRjaCAodGhpcy5fc3ltYm9sSnNvbi5zdHlsZSkge1xuICAgICAgY2FzZSAnZXNyaVNNU1NxdWFyZSc6XG4gICAgICAgIHJldHVybiBzcXVhcmVNYXJrZXIobGF0bG5nLCBzaXplLCBMLmV4dGVuZCh7fSwgdGhpcy5fc3R5bGVzLCBvcHRpb25zKSk7XG4gICAgICBjYXNlICdlc3JpU01TRGlhbW9uZCc6XG4gICAgICAgIHJldHVybiBkaWFtb25kTWFya2VyKGxhdGxuZywgc2l6ZSwgTC5leHRlbmQoe30sIHRoaXMuX3N0eWxlcywgb3B0aW9ucykpO1xuICAgICAgY2FzZSAnZXNyaVNNU0Nyb3NzJzpcbiAgICAgICAgcmV0dXJuIGNyb3NzTWFya2VyKGxhdGxuZywgc2l6ZSwgTC5leHRlbmQoe30sIHRoaXMuX3N0eWxlcywgb3B0aW9ucykpO1xuICAgICAgY2FzZSAnZXNyaVNNU1gnOlxuICAgICAgICByZXR1cm4geE1hcmtlcihsYXRsbmcsIHNpemUsIEwuZXh0ZW5kKHt9LCB0aGlzLl9zdHlsZXMsIG9wdGlvbnMpKTtcbiAgICB9XG4gICAgdGhpcy5fc3R5bGVzLnJhZGl1cyA9IHNpemUgLyAyLjA7XG4gICAgcmV0dXJuIEwuY2lyY2xlTWFya2VyKGxhdGxuZywgTC5leHRlbmQoe30sIHRoaXMuX3N0eWxlcywgb3B0aW9ucykpO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBvaW50U3ltYm9sIChzeW1ib2xKc29uLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgUG9pbnRTeW1ib2woc3ltYm9sSnNvbiwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBvaW50U3ltYm9sO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL1N5bWJvbCc7XG5cbmV4cG9ydCB2YXIgTGluZVN5bWJvbCA9IFN5bWJvbC5leHRlbmQoe1xuICBzdGF0aWNzOiB7XG4gICAgLy8gTm90IGltcGxlbWVudGVkICdlc3JpU0xTTnVsbCdcbiAgICBMSU5FVFlQRVM6IFsnZXNyaVNMU0Rhc2gnLCAnZXNyaVNMU0RvdCcsICdlc3JpU0xTRGFzaERvdERvdCcsICdlc3JpU0xTRGFzaERvdCcsICdlc3JpU0xTU29saWQnXVxuICB9LFxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoc3ltYm9sSnNvbiwgb3B0aW9ucykge1xuICAgIFN5bWJvbC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHN5bWJvbEpzb24sIG9wdGlvbnMpO1xuICAgIHRoaXMuX2ZpbGxTdHlsZXMoKTtcbiAgfSxcblxuICBfZmlsbFN0eWxlczogZnVuY3Rpb24gKCkge1xuICAgIC8vIHNldCB0aGUgZGVmYXVsdHMgdGhhdCBzaG93IHVwIG9uIGFyY2dpcyBvbmxpbmVcbiAgICB0aGlzLl9zdHlsZXMubGluZUNhcCA9ICdidXR0JztcbiAgICB0aGlzLl9zdHlsZXMubGluZUpvaW4gPSAnbWl0ZXInO1xuICAgIHRoaXMuX3N0eWxlcy5maWxsID0gZmFsc2U7XG4gICAgdGhpcy5fc3R5bGVzLndlaWdodCA9IDA7XG5cbiAgICBpZiAoIXRoaXMuX3N5bWJvbEpzb24pIHtcbiAgICAgIHJldHVybiB0aGlzLl9zdHlsZXM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3N5bWJvbEpzb24uY29sb3IpIHtcbiAgICAgIHRoaXMuX3N0eWxlcy5jb2xvciA9IHRoaXMuY29sb3JWYWx1ZSh0aGlzLl9zeW1ib2xKc29uLmNvbG9yKTtcbiAgICAgIHRoaXMuX3N0eWxlcy5vcGFjaXR5ID0gdGhpcy5hbHBoYVZhbHVlKHRoaXMuX3N5bWJvbEpzb24uY29sb3IpO1xuICAgIH1cblxuICAgIGlmICghaXNOYU4odGhpcy5fc3ltYm9sSnNvbi53aWR0aCkpIHtcbiAgICAgIHRoaXMuX3N0eWxlcy53ZWlnaHQgPSB0aGlzLnBpeGVsVmFsdWUodGhpcy5fc3ltYm9sSnNvbi53aWR0aCk7XG5cbiAgICAgIHZhciBkYXNoVmFsdWVzID0gW107XG5cbiAgICAgIHN3aXRjaCAodGhpcy5fc3ltYm9sSnNvbi5zdHlsZSkge1xuICAgICAgICBjYXNlICdlc3JpU0xTRGFzaCc6XG4gICAgICAgICAgZGFzaFZhbHVlcyA9IFs0LCAzXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZXNyaVNMU0RvdCc6XG4gICAgICAgICAgZGFzaFZhbHVlcyA9IFsxLCAzXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZXNyaVNMU0Rhc2hEb3QnOlxuICAgICAgICAgIGRhc2hWYWx1ZXMgPSBbOCwgMywgMSwgM107XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2VzcmlTTFNEYXNoRG90RG90JzpcbiAgICAgICAgICBkYXNoVmFsdWVzID0gWzgsIDMsIDEsIDMsIDEsIDNdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyB1c2UgdGhlIGRhc2ggdmFsdWVzIGFuZCB0aGUgbGluZSB3ZWlnaHQgdG8gc2V0IGRhc2ggYXJyYXlcbiAgICAgIGlmIChkYXNoVmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXNoVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZGFzaFZhbHVlc1tpXSAqPSB0aGlzLl9zdHlsZXMud2VpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc3R5bGVzLmRhc2hBcnJheSA9IGRhc2hWYWx1ZXMuam9pbignLCcpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzdHlsZTogZnVuY3Rpb24gKGZlYXR1cmUsIHZpc3VhbFZhcmlhYmxlcykge1xuICAgIGlmICghdGhpcy5faXNEZWZhdWx0ICYmIHZpc3VhbFZhcmlhYmxlcykge1xuICAgICAgaWYgKHZpc3VhbFZhcmlhYmxlcy5zaXplSW5mbykge1xuICAgICAgICB2YXIgY2FsY3VsYXRlZFNpemUgPSB0aGlzLnBpeGVsVmFsdWUodGhpcy5nZXRTaXplKGZlYXR1cmUsIHZpc3VhbFZhcmlhYmxlcy5zaXplSW5mbykpO1xuICAgICAgICBpZiAoY2FsY3VsYXRlZFNpemUpIHtcbiAgICAgICAgICB0aGlzLl9zdHlsZXMud2VpZ2h0ID0gY2FsY3VsYXRlZFNpemU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh2aXN1YWxWYXJpYWJsZXMuY29sb3JJbmZvKSB7XG4gICAgICAgIHZhciBjb2xvciA9IHRoaXMuZ2V0Q29sb3IoZmVhdHVyZSwgdmlzdWFsVmFyaWFibGVzLmNvbG9ySW5mbyk7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgIHRoaXMuX3N0eWxlcy5jb2xvciA9IHRoaXMuY29sb3JWYWx1ZShjb2xvcik7XG4gICAgICAgICAgdGhpcy5fc3R5bGVzLm9wYWNpdHkgPSB0aGlzLmFscGhhVmFsdWUoY29sb3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zdHlsZXM7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gbGluZVN5bWJvbCAoc3ltYm9sSnNvbiwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IExpbmVTeW1ib2woc3ltYm9sSnNvbiwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpbmVTeW1ib2w7XG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vU3ltYm9sJztcbmltcG9ydCBsaW5lU3ltYm9sIGZyb20gJy4vTGluZVN5bWJvbCc7XG5cbmV4cG9ydCB2YXIgUG9seWdvblN5bWJvbCA9IFN5bWJvbC5leHRlbmQoe1xuICBzdGF0aWNzOiB7XG4gICAgLy8gbm90IGltcGxlbWVudGVkOiAnZXNyaVNGU0JhY2t3YXJkRGlhZ29uYWwnLCdlc3JpU0ZTQ3Jvc3MnLCdlc3JpU0ZTRGlhZ29uYWxDcm9zcycsJ2VzcmlTRlNGb3J3YXJkRGlhZ29uYWwnLCdlc3JpU0ZTSG9yaXpvbnRhbCcsJ2VzcmlTRlNOdWxsJywnZXNyaVNGU1ZlcnRpY2FsJ1xuICAgIFBPTFlHT05UWVBFUzogWydlc3JpU0ZTU29saWQnXVxuICB9LFxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoc3ltYm9sSnNvbiwgb3B0aW9ucykge1xuICAgIFN5bWJvbC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHN5bWJvbEpzb24sIG9wdGlvbnMpO1xuICAgIGlmIChzeW1ib2xKc29uKSB7XG4gICAgICB0aGlzLl9saW5lU3R5bGVzID0gbGluZVN5bWJvbChzeW1ib2xKc29uLm91dGxpbmUsIG9wdGlvbnMpLnN0eWxlKCk7XG4gICAgICB0aGlzLl9maWxsU3R5bGVzKCk7XG4gICAgfVxuICB9LFxuXG4gIF9maWxsU3R5bGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX2xpbmVTdHlsZXMpIHtcbiAgICAgIGlmICh0aGlzLl9saW5lU3R5bGVzLndlaWdodCA9PT0gMCkge1xuICAgICAgICAvLyB3aGVuIHdlaWdodCBpcyAwLCBzZXR0aW5nIHRoZSBzdHJva2UgdG8gZmFsc2UgY2FuIHN0aWxsIGxvb2sgYmFkXG4gICAgICAgIC8vIChnYXBzIGJldHdlZW4gdGhlIHBvbHlnb25zKVxuICAgICAgICB0aGlzLl9zdHlsZXMuc3Ryb2tlID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjb3B5IHRoZSBsaW5lIHN5bWJvbCBzdHlsZXMgaW50byB0aGlzIHN5bWJvbCdzIHN0eWxlc1xuICAgICAgICBmb3IgKHZhciBzdHlsZUF0dHIgaW4gdGhpcy5fbGluZVN0eWxlcykge1xuICAgICAgICAgIHRoaXMuX3N0eWxlc1tzdHlsZUF0dHJdID0gdGhpcy5fbGluZVN0eWxlc1tzdHlsZUF0dHJdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2V0IHRoZSBmaWxsIGZvciB0aGUgcG9seWdvblxuICAgIGlmICh0aGlzLl9zeW1ib2xKc29uKSB7XG4gICAgICBpZiAodGhpcy5fc3ltYm9sSnNvbi5jb2xvciAmJlxuICAgICAgICAgIC8vIGRvbid0IGZpbGwgcG9seWdvbiBpZiB0eXBlIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICAgICAgICBQb2x5Z29uU3ltYm9sLlBPTFlHT05UWVBFUy5pbmRleE9mKHRoaXMuX3N5bWJvbEpzb24uc3R5bGUgPj0gMCkpIHtcbiAgICAgICAgdGhpcy5fc3R5bGVzLmZpbGwgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zdHlsZXMuZmlsbENvbG9yID0gdGhpcy5jb2xvclZhbHVlKHRoaXMuX3N5bWJvbEpzb24uY29sb3IpO1xuICAgICAgICB0aGlzLl9zdHlsZXMuZmlsbE9wYWNpdHkgPSB0aGlzLmFscGhhVmFsdWUodGhpcy5fc3ltYm9sSnNvbi5jb2xvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zdHlsZXMuZmlsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zdHlsZXMuZmlsbE9wYWNpdHkgPSAwO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzdHlsZTogZnVuY3Rpb24gKGZlYXR1cmUsIHZpc3VhbFZhcmlhYmxlcykge1xuICAgIGlmICghdGhpcy5faXNEZWZhdWx0ICYmIHZpc3VhbFZhcmlhYmxlcyAmJiB2aXN1YWxWYXJpYWJsZXMuY29sb3JJbmZvKSB7XG4gICAgICB2YXIgY29sb3IgPSB0aGlzLmdldENvbG9yKGZlYXR1cmUsIHZpc3VhbFZhcmlhYmxlcy5jb2xvckluZm8pO1xuICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIHRoaXMuX3N0eWxlcy5maWxsQ29sb3IgPSB0aGlzLmNvbG9yVmFsdWUoY29sb3IpO1xuICAgICAgICB0aGlzLl9zdHlsZXMuZmlsbE9wYWNpdHkgPSB0aGlzLmFscGhhVmFsdWUoY29sb3IpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fc3R5bGVzO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBvbHlnb25TeW1ib2wgKHN5bWJvbEpzb24sIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBQb2x5Z29uU3ltYm9sKHN5bWJvbEpzb24sIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwb2x5Z29uU3ltYm9sO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCBwb2ludFN5bWJvbCBmcm9tICcuLi9TeW1ib2xzL1BvaW50U3ltYm9sJztcbmltcG9ydCBsaW5lU3ltYm9sIGZyb20gJy4uL1N5bWJvbHMvTGluZVN5bWJvbCc7XG5pbXBvcnQgcG9seWdvblN5bWJvbCBmcm9tICcuLi9TeW1ib2xzL1BvbHlnb25TeW1ib2wnO1xuXG5leHBvcnQgdmFyIFJlbmRlcmVyID0gTC5DbGFzcy5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgcHJvcG9ydGlvbmFsUG9seWdvbjogZmFsc2UsXG4gICAgY2xpY2thYmxlOiB0cnVlXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKHJlbmRlcmVySnNvbiwgb3B0aW9ucykge1xuICAgIHRoaXMuX3JlbmRlcmVySnNvbiA9IHJlbmRlcmVySnNvbjtcbiAgICB0aGlzLl9wb2ludFN5bWJvbHMgPSBmYWxzZTtcbiAgICB0aGlzLl9zeW1ib2xzID0gW107XG4gICAgdGhpcy5fdmlzdWFsVmFyaWFibGVzID0gdGhpcy5fcGFyc2VWaXN1YWxWYXJpYWJsZXMocmVuZGVyZXJKc29uLnZpc3VhbFZhcmlhYmxlcyk7XG4gICAgTC5VdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gIH0sXG5cbiAgX3BhcnNlVmlzdWFsVmFyaWFibGVzOiBmdW5jdGlvbiAodmlzdWFsVmFyaWFibGVzKSB7XG4gICAgdmFyIHZpc1ZhcnMgPSB7fTtcbiAgICBpZiAodmlzdWFsVmFyaWFibGVzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpc3VhbFZhcmlhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2aXNWYXJzW3Zpc3VhbFZhcmlhYmxlc1tpXS50eXBlXSA9IHZpc3VhbFZhcmlhYmxlc1tpXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZpc1ZhcnM7XG4gIH0sXG5cbiAgX2NyZWF0ZURlZmF1bHRTeW1ib2w6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fcmVuZGVyZXJKc29uLmRlZmF1bHRTeW1ib2wpIHtcbiAgICAgIHRoaXMuX2RlZmF1bHRTeW1ib2wgPSB0aGlzLl9uZXdTeW1ib2wodGhpcy5fcmVuZGVyZXJKc29uLmRlZmF1bHRTeW1ib2wpO1xuICAgICAgdGhpcy5fZGVmYXVsdFN5bWJvbC5faXNEZWZhdWx0ID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG5cbiAgX25ld1N5bWJvbDogZnVuY3Rpb24gKHN5bWJvbEpzb24pIHtcbiAgICBpZiAoc3ltYm9sSnNvbi50eXBlID09PSAnZXNyaVNNUycgfHwgc3ltYm9sSnNvbi50eXBlID09PSAnZXNyaVBNUycpIHtcbiAgICAgIHRoaXMuX3BvaW50U3ltYm9scyA9IHRydWU7XG4gICAgICByZXR1cm4gcG9pbnRTeW1ib2woc3ltYm9sSnNvbiwgdGhpcy5vcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKHN5bWJvbEpzb24udHlwZSA9PT0gJ2VzcmlTTFMnKSB7XG4gICAgICByZXR1cm4gbGluZVN5bWJvbChzeW1ib2xKc29uLCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoc3ltYm9sSnNvbi50eXBlID09PSAnZXNyaVNGUycpIHtcbiAgICAgIHJldHVybiBwb2x5Z29uU3ltYm9sKHN5bWJvbEpzb24sIHRoaXMub3B0aW9ucyk7XG4gICAgfVxuICB9LFxuXG4gIF9nZXRTeW1ib2w6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBvdmVycmlkZVxuICB9LFxuXG4gIGF0dGFjaFN0eWxlc1RvTGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xuICAgIGlmICh0aGlzLl9wb2ludFN5bWJvbHMpIHtcbiAgICAgIGxheWVyLm9wdGlvbnMucG9pbnRUb0xheWVyID0gTC5VdGlsLmJpbmQodGhpcy5wb2ludFRvTGF5ZXIsIHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXllci5vcHRpb25zLnN0eWxlID0gTC5VdGlsLmJpbmQodGhpcy5zdHlsZSwgdGhpcyk7XG4gICAgICBsYXllci5fb3JpZ2luYWxTdHlsZSA9IGxheWVyLm9wdGlvbnMuc3R5bGU7XG4gICAgfVxuICB9LFxuXG4gIHBvaW50VG9MYXllcjogZnVuY3Rpb24gKGdlb2pzb24sIGxhdGxuZykge1xuICAgIHZhciBzeW0gPSB0aGlzLl9nZXRTeW1ib2woZ2VvanNvbik7XG4gICAgaWYgKHN5bSAmJiBzeW0ucG9pbnRUb0xheWVyKSB7XG4gICAgICAvLyByaWdodCBub3cgY3VzdG9tIHBhbmVzIGFyZSB0aGUgb25seSBvcHRpb24gcHVzaGVkIHRocm91Z2hcbiAgICAgIHJldHVybiBzeW0ucG9pbnRUb0xheWVyKGdlb2pzb24sIGxhdGxuZywgdGhpcy5fdmlzdWFsVmFyaWFibGVzLCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cbiAgICAvLyBpbnZpc2libGUgc3ltYm9sb2d5XG4gICAgcmV0dXJuIEwuY2lyY2xlTWFya2VyKGxhdGxuZywge3JhZGl1czogMCwgb3BhY2l0eTogMH0pO1xuICB9LFxuXG4gIHN0eWxlOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgIHZhciB1c2VyU3R5bGVzO1xuICAgIGlmICh0aGlzLm9wdGlvbnMudXNlckRlZmluZWRTdHlsZSkge1xuICAgICAgdXNlclN0eWxlcyA9IHRoaXMub3B0aW9ucy51c2VyRGVmaW5lZFN0eWxlKGZlYXR1cmUpO1xuICAgIH1cbiAgICAvLyBmaW5kIHRoZSBzeW1ib2wgdG8gcmVwcmVzZW50IHRoaXMgZmVhdHVyZVxuICAgIHZhciBzeW0gPSB0aGlzLl9nZXRTeW1ib2woZmVhdHVyZSk7XG4gICAgaWYgKHN5bSkge1xuICAgICAgcmV0dXJuIHRoaXMubWVyZ2VTdHlsZXMoc3ltLnN0eWxlKGZlYXR1cmUsIHRoaXMuX3Zpc3VhbFZhcmlhYmxlcyksIHVzZXJTdHlsZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpbnZpc2libGUgc3ltYm9sb2d5XG4gICAgICByZXR1cm4gdGhpcy5tZXJnZVN0eWxlcyh7b3BhY2l0eTogMCwgZmlsbE9wYWNpdHk6IDB9LCB1c2VyU3R5bGVzKTtcbiAgICB9XG4gIH0sXG5cbiAgbWVyZ2VTdHlsZXM6IGZ1bmN0aW9uIChzdHlsZXMsIHVzZXJTdHlsZXMpIHtcbiAgICB2YXIgbWVyZ2VkU3R5bGVzID0ge307XG4gICAgdmFyIGF0dHI7XG4gICAgLy8gY29weSByZW5kZXJlciBzdHlsZSBhdHRyaWJ1dGVzXG4gICAgZm9yIChhdHRyIGluIHN0eWxlcykge1xuICAgICAgaWYgKHN0eWxlcy5oYXNPd25Qcm9wZXJ0eShhdHRyKSkge1xuICAgICAgICBtZXJnZWRTdHlsZXNbYXR0cl0gPSBzdHlsZXNbYXR0cl07XG4gICAgICB9XG4gICAgfVxuICAgIC8vIG92ZXJyaWRlIHdpdGggdXNlciBkZWZpbmVkIHN0eWxlIGF0dHJpYnV0ZXNcbiAgICBpZiAodXNlclN0eWxlcykge1xuICAgICAgZm9yIChhdHRyIGluIHVzZXJTdHlsZXMpIHtcbiAgICAgICAgaWYgKHVzZXJTdHlsZXMuaGFzT3duUHJvcGVydHkoYXR0cikpIHtcbiAgICAgICAgICBtZXJnZWRTdHlsZXNbYXR0cl0gPSB1c2VyU3R5bGVzW2F0dHJdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXJnZWRTdHlsZXM7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBSZW5kZXJlcjtcbiIsImltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcblxuZXhwb3J0IHZhciBTaW1wbGVSZW5kZXJlciA9IFJlbmRlcmVyLmV4dGVuZCh7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChyZW5kZXJlckpzb24sIG9wdGlvbnMpIHtcbiAgICBSZW5kZXJlci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHJlbmRlcmVySnNvbiwgb3B0aW9ucyk7XG4gICAgdGhpcy5fY3JlYXRlU3ltYm9sKCk7XG4gIH0sXG5cbiAgX2NyZWF0ZVN5bWJvbDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9yZW5kZXJlckpzb24uc3ltYm9sKSB7XG4gICAgICB0aGlzLl9zeW1ib2xzLnB1c2godGhpcy5fbmV3U3ltYm9sKHRoaXMuX3JlbmRlcmVySnNvbi5zeW1ib2wpKTtcbiAgICB9XG4gIH0sXG5cbiAgX2dldFN5bWJvbDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9zeW1ib2xzWzBdO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNpbXBsZVJlbmRlcmVyIChyZW5kZXJlckpzb24sIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBTaW1wbGVSZW5kZXJlcihyZW5kZXJlckpzb24sIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaW1wbGVSZW5kZXJlcjtcbiIsImltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcblxuZXhwb3J0IHZhciBDbGFzc0JyZWFrc1JlbmRlcmVyID0gUmVuZGVyZXIuZXh0ZW5kKHtcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKHJlbmRlcmVySnNvbiwgb3B0aW9ucykge1xuICAgIFJlbmRlcmVyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgcmVuZGVyZXJKc29uLCBvcHRpb25zKTtcbiAgICB0aGlzLl9maWVsZCA9IHRoaXMuX3JlbmRlcmVySnNvbi5maWVsZDtcbiAgICBpZiAodGhpcy5fcmVuZGVyZXJKc29uLm5vcm1hbGl6YXRpb25UeXBlICYmIHRoaXMuX3JlbmRlcmVySnNvbi5ub3JtYWxpemF0aW9uVHlwZSA9PT0gJ2VzcmlOb3JtYWxpemVCeUZpZWxkJykge1xuICAgICAgdGhpcy5fbm9ybWFsaXphdGlvbkZpZWxkID0gdGhpcy5fcmVuZGVyZXJKc29uLm5vcm1hbGl6YXRpb25GaWVsZDtcbiAgICB9XG4gICAgdGhpcy5fY3JlYXRlU3ltYm9scygpO1xuICB9LFxuXG4gIF9jcmVhdGVTeW1ib2xzOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN5bWJvbDtcbiAgICB2YXIgY2xhc3NicmVha3MgPSB0aGlzLl9yZW5kZXJlckpzb24uY2xhc3NCcmVha0luZm9zO1xuXG4gICAgdGhpcy5fc3ltYm9scyA9IFtdO1xuXG4gICAgLy8gY3JlYXRlIGEgc3ltYm9sIGZvciBlYWNoIGNsYXNzIGJyZWFrXG4gICAgZm9yICh2YXIgaSA9IGNsYXNzYnJlYWtzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnByb3BvcnRpb25hbFBvbHlnb24gJiYgdGhpcy5fcmVuZGVyZXJKc29uLmJhY2tncm91bmRGaWxsU3ltYm9sKSB7XG4gICAgICAgIHN5bWJvbCA9IHRoaXMuX25ld1N5bWJvbCh0aGlzLl9yZW5kZXJlckpzb24uYmFja2dyb3VuZEZpbGxTeW1ib2wpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3ltYm9sID0gdGhpcy5fbmV3U3ltYm9sKGNsYXNzYnJlYWtzW2ldLnN5bWJvbCk7XG4gICAgICB9XG4gICAgICBzeW1ib2wudmFsID0gY2xhc3NicmVha3NbaV0uY2xhc3NNYXhWYWx1ZTtcbiAgICAgIHRoaXMuX3N5bWJvbHMucHVzaChzeW1ib2wpO1xuICAgIH1cbiAgICAvLyBzb3J0IHRoZSBzeW1ib2xzIGluIGFzY2VuZGluZyB2YWx1ZVxuICAgIHRoaXMuX3N5bWJvbHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGEudmFsID4gYi52YWwgPyAxIDogLTE7XG4gICAgfSk7XG4gICAgdGhpcy5fY3JlYXRlRGVmYXVsdFN5bWJvbCgpO1xuICAgIHRoaXMuX21heFZhbHVlID0gdGhpcy5fc3ltYm9sc1t0aGlzLl9zeW1ib2xzLmxlbmd0aCAtIDFdLnZhbDtcbiAgfSxcblxuICBfZ2V0U3ltYm9sOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgIHZhciB2YWwgPSBmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5fZmllbGRdO1xuICAgIGlmICh0aGlzLl9ub3JtYWxpemF0aW9uRmllbGQpIHtcbiAgICAgIHZhciBub3JtVmFsdWUgPSBmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5fbm9ybWFsaXphdGlvbkZpZWxkXTtcbiAgICAgIGlmICghaXNOYU4obm9ybVZhbHVlKSAmJiBub3JtVmFsdWUgIT09IDApIHtcbiAgICAgICAgdmFsID0gdmFsIC8gbm9ybVZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRTeW1ib2w7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHZhbCA+IHRoaXMuX21heFZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdFN5bWJvbDtcbiAgICB9XG4gICAgdmFyIHN5bWJvbCA9IHRoaXMuX3N5bWJvbHNbMF07XG4gICAgZm9yICh2YXIgaSA9IHRoaXMuX3N5bWJvbHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGlmICh2YWwgPiB0aGlzLl9zeW1ib2xzW2ldLnZhbCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHN5bWJvbCA9IHRoaXMuX3N5bWJvbHNbaV07XG4gICAgfVxuICAgIHJldHVybiBzeW1ib2w7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY2xhc3NCcmVha3NSZW5kZXJlciAocmVuZGVyZXJKc29uLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgQ2xhc3NCcmVha3NSZW5kZXJlcihyZW5kZXJlckpzb24sIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzc0JyZWFrc1JlbmRlcmVyO1xuIiwiaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vUmVuZGVyZXInO1xuXG5leHBvcnQgdmFyIFVuaXF1ZVZhbHVlUmVuZGVyZXIgPSBSZW5kZXJlci5leHRlbmQoe1xuICBpbml0aWFsaXplOiBmdW5jdGlvbiAocmVuZGVyZXJKc29uLCBvcHRpb25zKSB7XG4gICAgUmVuZGVyZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCByZW5kZXJlckpzb24sIG9wdGlvbnMpO1xuICAgIHRoaXMuX2ZpZWxkID0gdGhpcy5fcmVuZGVyZXJKc29uLmZpZWxkMTtcbiAgICB0aGlzLl9jcmVhdGVTeW1ib2xzKCk7XG4gIH0sXG5cbiAgX2NyZWF0ZVN5bWJvbHM6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3ltYm9sO1xuICAgIHZhciB1bmlxdWVzID0gdGhpcy5fcmVuZGVyZXJKc29uLnVuaXF1ZVZhbHVlSW5mb3M7XG5cbiAgICAvLyBjcmVhdGUgYSBzeW1ib2wgZm9yIGVhY2ggdW5pcXVlIHZhbHVlXG4gICAgZm9yICh2YXIgaSA9IHVuaXF1ZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHN5bWJvbCA9IHRoaXMuX25ld1N5bWJvbCh1bmlxdWVzW2ldLnN5bWJvbCk7XG4gICAgICBzeW1ib2wudmFsID0gdW5pcXVlc1tpXS52YWx1ZTtcbiAgICAgIHRoaXMuX3N5bWJvbHMucHVzaChzeW1ib2wpO1xuICAgIH1cbiAgICB0aGlzLl9jcmVhdGVEZWZhdWx0U3ltYm9sKCk7XG4gIH0sXG5cbiAgX2dldFN5bWJvbDogZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICB2YXIgdmFsID0gZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMuX2ZpZWxkXTtcbiAgICAvLyBhY2N1bXVsYXRlIHZhbHVlcyBpZiB0aGVyZSBpcyBtb3JlIHRoYW4gb25lIGZpZWxkIGRlZmluZWRcbiAgICBpZiAodGhpcy5fcmVuZGVyZXJKc29uLmZpZWxkRGVsaW1pdGVyICYmIHRoaXMuX3JlbmRlcmVySnNvbi5maWVsZDIpIHtcbiAgICAgIHZhciB2YWwyID0gZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMuX3JlbmRlcmVySnNvbi5maWVsZDJdO1xuICAgICAgaWYgKHZhbDIpIHtcbiAgICAgICAgdmFsICs9IHRoaXMuX3JlbmRlcmVySnNvbi5maWVsZERlbGltaXRlciArIHZhbDI7XG4gICAgICAgIHZhciB2YWwzID0gZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMuX3JlbmRlcmVySnNvbi5maWVsZDNdO1xuICAgICAgICBpZiAodmFsMykge1xuICAgICAgICAgIHZhbCArPSB0aGlzLl9yZW5kZXJlckpzb24uZmllbGREZWxpbWl0ZXIgKyB2YWwzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHN5bWJvbCA9IHRoaXMuX2RlZmF1bHRTeW1ib2w7XG4gICAgZm9yICh2YXIgaSA9IHRoaXMuX3N5bWJvbHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIC8vIHVzaW5nIHRoZSA9PT0gb3BlcmF0b3IgZG9lcyBub3Qgd29yayBpZiB0aGUgZmllbGRcbiAgICAgIC8vIG9mIHRoZSB1bmlxdWUgcmVuZGVyZXIgaXMgbm90IGEgc3RyaW5nXG4gICAgICAvKmVzbGludC1kaXNhYmxlICovXG4gICAgICBpZiAodGhpcy5fc3ltYm9sc1tpXS52YWwgPT0gdmFsKSB7XG4gICAgICAgIHN5bWJvbCA9IHRoaXMuX3N5bWJvbHNbaV07XG4gICAgICB9XG4gICAgICAvKmVzbGludC1lbmFibGUgKi9cbiAgICB9XG4gICAgcmV0dXJuIHN5bWJvbDtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVWYWx1ZVJlbmRlcmVyIChyZW5kZXJlckpzb24sIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBVbmlxdWVWYWx1ZVJlbmRlcmVyKHJlbmRlcmVySnNvbiwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVuaXF1ZVZhbHVlUmVuZGVyZXI7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IGNsYXNzQnJlYWtzUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcnMvQ2xhc3NCcmVha3NSZW5kZXJlcic7XG5pbXBvcnQgdW5pcXVlVmFsdWVSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVycy9VbmlxdWVWYWx1ZVJlbmRlcmVyJztcbmltcG9ydCBzaW1wbGVSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVycy9TaW1wbGVSZW5kZXJlcic7XG5cbkwuZXNyaS5GZWF0dXJlTGF5ZXIuYWRkSW5pdEhvb2soZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5vcHRpb25zLmlnbm9yZVJlbmRlcmVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBvbGRPbkFkZCA9IEwuVXRpbC5iaW5kKHRoaXMub25BZGQsIHRoaXMpO1xuICB2YXIgb2xkVW5iaW5kUG9wdXAgPSBMLlV0aWwuYmluZCh0aGlzLnVuYmluZFBvcHVwLCB0aGlzKTtcbiAgdmFyIG9sZE9uUmVtb3ZlID0gTC5VdGlsLmJpbmQodGhpcy5vblJlbW92ZSwgdGhpcyk7XG4gIEwuVXRpbC5iaW5kKHRoaXMuY3JlYXRlTmV3TGF5ZXIsIHRoaXMpO1xuXG4gIHRoaXMub25BZGQgPSBmdW5jdGlvbiAobWFwKSB7XG4gICAgdGhpcy5tZXRhZGF0YShmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdmYWlsZWQgdG8gbG9hZCBtZXRhZGF0YSBmcm9tIHRoZSBzZXJ2aWNlLicpO1xuICAgICAgICByZXR1cm5cbiAgICAgIH0gaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRyYXdpbmdJbmZvKSB7XG4gICAgICAgIGlmKHRoaXMub3B0aW9ucy5kcmF3aW5nSW5mbykge1xuICAgICAgICAgIC8vIGFsbG93IEwuZXNyaS53ZWJtYXAgKGFuZCBvdGhlcnMpIHRvIG92ZXJyaWRlIHNlcnZpY2Ugc3ltYm9sb2d5IHdpdGggaW5mbyBwcm92aWRlZCBpbiBsYXllciBjb25zdHJ1Y3RvclxuICAgICAgICAgIHZhciBzZXJ2aWNlTWV0YWRhdGEgPSByZXNwb25zZTtcbiAgICAgICAgICBzZXJ2aWNlTWV0YWRhdGEuZHJhd2luZ0luZm8gPSB0aGlzLm9wdGlvbnMuZHJhd2luZ0luZm87XG4gICAgICAgICAgdGhpcy5fc2V0UmVuZGVyZXJzKHNlcnZpY2VNZXRhZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fc2V0UmVuZGVyZXJzKHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXRSZW5kZXJlcnMocmVzcG9uc2UpO1xuICAgICAgICBvbGRPbkFkZChtYXApO1xuICAgICAgICB0aGlzLl9hZGRQb2ludExheWVyKG1hcCk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH07XG5cbiAgdGhpcy5vblJlbW92ZSA9IGZ1bmN0aW9uIChtYXApIHtcbiAgICBvbGRPblJlbW92ZShtYXApO1xuICAgIGlmICh0aGlzLl9wb2ludExheWVyKSB7XG4gICAgICB2YXIgcG9pbnRMYXllcnMgPSB0aGlzLl9wb2ludExheWVyLmdldExheWVycygpO1xuICAgICAgZm9yICh2YXIgaSBpbiBwb2ludExheWVycykge1xuICAgICAgICBtYXAucmVtb3ZlTGF5ZXIocG9pbnRMYXllcnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB0aGlzLnVuYmluZFBvcHVwID0gZnVuY3Rpb24gKCkge1xuICAgIG9sZFVuYmluZFBvcHVwKCk7XG4gICAgaWYgKHRoaXMuX3BvaW50TGF5ZXIpIHtcbiAgICAgIHZhciBwb2ludExheWVycyA9IHRoaXMuX3BvaW50TGF5ZXIuZ2V0TGF5ZXJzKCk7XG4gICAgICBmb3IgKHZhciBpIGluIHBvaW50TGF5ZXJzKSB7XG4gICAgICAgIHBvaW50TGF5ZXJzW2ldLnVuYmluZFBvcHVwKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuX2FkZFBvaW50TGF5ZXIgPSBmdW5jdGlvbiAobWFwKSB7XG4gICAgaWYgKHRoaXMuX3BvaW50TGF5ZXIpIHtcbiAgICAgIHRoaXMuX3BvaW50TGF5ZXIuYWRkVG8obWFwKTtcbiAgICAgIHRoaXMuX3BvaW50TGF5ZXIuYnJpbmdUb0Zyb250KCk7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuX2NyZWF0ZVBvaW50TGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLl9wb2ludExheWVyKSB7XG4gICAgICB0aGlzLl9wb2ludExheWVyID0gTC5nZW9Kc29uKCk7XG4gICAgICAvLyBzdG9yZSB0aGUgZmVhdHVyZSBpZHMgdGhhdCBoYXZlIGFscmVhZHkgYmVlbiBhZGRlZCB0byB0aGUgbWFwXG4gICAgICB0aGlzLl9wb2ludExheWVySWRzID0ge307XG5cbiAgICAgIGlmICh0aGlzLl9wb3B1cCkge1xuICAgICAgICB2YXIgcG9wdXBGdW5jdGlvbiA9IGZ1bmN0aW9uIChmZWF0dXJlLCBsYXllcikge1xuICAgICAgICAgIGxheWVyLmJpbmRQb3B1cCh0aGlzLl9wb3B1cChmZWF0dXJlLCBsYXllciksIHRoaXMuX3BvcHVwT3B0aW9ucyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3BvaW50TGF5ZXIub3B0aW9ucy5vbkVhY2hGZWF0dXJlID0gTC5VdGlsLmJpbmQocG9wdXBGdW5jdGlvbiwgdGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuY3JlYXRlTmV3TGF5ZXIgPSBmdW5jdGlvbiAoZ2VvanNvbikge1xuICAgIHZhciBmTGF5ZXIgPSBMLkdlb0pTT04uZ2VvbWV0cnlUb0xheWVyKGdlb2pzb24sIHRoaXMub3B0aW9ucyk7XG5cbiAgICAvLyBhZGQgYSBwb2ludCBsYXllciB3aGVuIHRoZSBwb2x5Z29uIGlzIHJlcHJlc2VudGVkIGFzIHByb3BvcnRpb25hbCBtYXJrZXIgc3ltYm9sc1xuICAgIGlmICh0aGlzLl9oYXNQcm9wb3J0aW9uYWxTeW1ib2xzKSB7XG4gICAgICB2YXIgY2VudHJvaWQgPSB0aGlzLmdldFBvbHlnb25DZW50cm9pZChnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzKTtcbiAgICAgIGlmICghKGlzTmFOKGNlbnRyb2lkWzBdKSB8fCBpc05hTihjZW50cm9pZFswXSkpKSB7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVBvaW50TGF5ZXIoKTtcblxuICAgICAgICB2YXIgZmVhdHVyZUlkID0gZ2VvanNvbi5pZC50b1N0cmluZygpO1xuICAgICAgICAvLyBvbmx5IGFkZCB0aGUgZmVhdHVyZSBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0IG9uIHRoZSBtYXBcbiAgICAgICAgaWYgKCF0aGlzLl9wb2ludExheWVySWRzW2ZlYXR1cmVJZF0pIHtcbiAgICAgICAgICB2YXIgcG9pbnRqc29uID0gdGhpcy5nZXRQb2ludEpzb24oZ2VvanNvbiwgY2VudHJvaWQpO1xuXG4gICAgICAgICAgdGhpcy5fcG9pbnRMYXllci5hZGREYXRhKHBvaW50anNvbik7XG4gICAgICAgICAgdGhpcy5fcG9pbnRMYXllcklkc1tmZWF0dXJlSWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3BvaW50TGF5ZXIuYnJpbmdUb0Zyb250KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmTGF5ZXI7XG4gIH07XG5cbiAgdGhpcy5nZXRQb2x5Z29uQ2VudHJvaWQgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICB2YXIgcHRzID0gY29vcmRpbmF0ZXNbMF1bMF07XG4gICAgaWYgKHB0cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHB0cyA9IGNvb3JkaW5hdGVzWzBdO1xuICAgIH1cblxuICAgIHZhciB0d2ljZWFyZWEgPSAwO1xuICAgIHZhciB4ID0gMDtcbiAgICB2YXIgeSA9IDA7XG4gICAgdmFyIG5QdHMgPSBwdHMubGVuZ3RoO1xuICAgIHZhciBwMTtcbiAgICB2YXIgcDI7XG4gICAgdmFyIGY7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgaiA9IG5QdHMgLSAxOyBpIDwgblB0czsgaiA9IGkrKykge1xuICAgICAgcDEgPSBwdHNbaV07IHAyID0gcHRzW2pdO1xuICAgICAgdHdpY2VhcmVhICs9IHAxWzBdICogcDJbMV07XG4gICAgICB0d2ljZWFyZWEgLT0gcDFbMV0gKiBwMlswXTtcbiAgICAgIGYgPSBwMVswXSAqIHAyWzFdIC0gcDJbMF0gKiBwMVsxXTtcbiAgICAgIHggKz0gKHAxWzBdICsgcDJbMF0pICogZjtcbiAgICAgIHkgKz0gKHAxWzFdICsgcDJbMV0pICogZjtcbiAgICB9XG4gICAgZiA9IHR3aWNlYXJlYSAqIDM7XG4gICAgcmV0dXJuIFt4IC8gZiwgeSAvIGZdO1xuICB9O1xuXG4gIHRoaXMuZ2V0UG9pbnRKc29uID0gZnVuY3Rpb24gKGdlb2pzb24sIGNlbnRyb2lkKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgIHByb3BlcnRpZXM6IGdlb2pzb24ucHJvcGVydGllcyxcbiAgICAgIGlkOiBnZW9qc29uLmlkLFxuICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IFtjZW50cm9pZFswXSwgY2VudHJvaWRbMV1dXG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICB0aGlzLl9jaGVja0ZvclByb3BvcnRpb25hbFN5bWJvbHMgPSBmdW5jdGlvbiAoZ2VvbWV0cnlUeXBlLCByZW5kZXJlcikge1xuICAgIHRoaXMuX2hhc1Byb3BvcnRpb25hbFN5bWJvbHMgPSBmYWxzZTtcbiAgICBpZiAoZ2VvbWV0cnlUeXBlID09PSAnZXNyaUdlb21ldHJ5UG9seWdvbicpIHtcbiAgICAgIGlmIChyZW5kZXJlci5iYWNrZ3JvdW5kRmlsbFN5bWJvbCkge1xuICAgICAgICB0aGlzLl9oYXNQcm9wb3J0aW9uYWxTeW1ib2xzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB0aGUgZmlyc3Qgc3ltYm9sIGluIHRoZSBjbGFzc2JyZWFrcyBpcyBhIG1hcmtlciBzeW1ib2xcbiAgICAgIGlmIChyZW5kZXJlci5jbGFzc0JyZWFrSW5mb3MgJiYgcmVuZGVyZXIuY2xhc3NCcmVha0luZm9zLmxlbmd0aCkge1xuICAgICAgICB2YXIgc3ltID0gcmVuZGVyZXIuY2xhc3NCcmVha0luZm9zWzBdLnN5bWJvbDtcbiAgICAgICAgaWYgKHN5bSAmJiAoc3ltLnR5cGUgPT09ICdlc3JpU01TJyB8fCBzeW0udHlwZSA9PT0gJ2VzcmlQTVMnKSkge1xuICAgICAgICAgIHRoaXMuX2hhc1Byb3BvcnRpb25hbFN5bWJvbHMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuX3NldFJlbmRlcmVycyA9IGZ1bmN0aW9uIChnZW9qc29uKSB7XG4gICAgdmFyIHJlbmQ7XG4gICAgdmFyIHJlbmRlcmVySW5mbyA9IGdlb2pzb24uZHJhd2luZ0luZm8ucmVuZGVyZXI7XG5cbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHVybDogdGhpcy5vcHRpb25zLnVybFxuICAgIH07XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRva2VuKSB7XG4gICAgICBvcHRpb25zLnRva2VuID0gdGhpcy5vcHRpb25zLnRva2VuO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnBhbmUpIHtcbiAgICAgIG9wdGlvbnMucGFuZSA9IHRoaXMub3B0aW9ucy5wYW5lO1xuICAgIH1cbiAgICBpZiAoZ2VvanNvbi5kcmF3aW5nSW5mby50cmFuc3BhcmVuY3kpIHtcbiAgICAgIG9wdGlvbnMubGF5ZXJUcmFuc3BhcmVuY3kgPSBnZW9qc29uLmRyYXdpbmdJbmZvLnRyYW5zcGFyZW5jeTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdHlsZSkge1xuICAgICAgb3B0aW9ucy51c2VyRGVmaW5lZFN0eWxlID0gdGhpcy5vcHRpb25zLnN0eWxlO1xuICAgIH1cblxuICAgIHN3aXRjaCAocmVuZGVyZXJJbmZvLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2NsYXNzQnJlYWtzJzpcbiAgICAgICAgdGhpcy5fY2hlY2tGb3JQcm9wb3J0aW9uYWxTeW1ib2xzKGdlb2pzb24uZ2VvbWV0cnlUeXBlLCByZW5kZXJlckluZm8pO1xuICAgICAgICBpZiAodGhpcy5faGFzUHJvcG9ydGlvbmFsU3ltYm9scykge1xuICAgICAgICAgIHRoaXMuX2NyZWF0ZVBvaW50TGF5ZXIoKTtcbiAgICAgICAgICB2YXIgcFJlbmQgPSBjbGFzc0JyZWFrc1JlbmRlcmVyKHJlbmRlcmVySW5mbywgb3B0aW9ucyk7XG4gICAgICAgICAgcFJlbmQuYXR0YWNoU3R5bGVzVG9MYXllcih0aGlzLl9wb2ludExheWVyKTtcbiAgICAgICAgICBvcHRpb25zLnByb3BvcnRpb25hbFBvbHlnb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJlbmQgPSBjbGFzc0JyZWFrc1JlbmRlcmVyKHJlbmRlcmVySW5mbywgb3B0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndW5pcXVlVmFsdWUnOlxuICAgICAgICByZW5kID0gdW5pcXVlVmFsdWVSZW5kZXJlcihyZW5kZXJlckluZm8sIG9wdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlbmQgPSBzaW1wbGVSZW5kZXJlcihyZW5kZXJlckluZm8sIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZW5kLmF0dGFjaFN0eWxlc1RvTGF5ZXIodGhpcyk7XG4gIH07XG5cbiAgdGhpcy5tZXRhZGF0YShmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZHJhd2luZ0luZm8pIHtcbiAgICAgIC8vIGlmIGRyYXdpbmdJbmZvIGZyb20gYSB3ZWJtYXAgaXMgc3VwcGxpZWQgaW4gdGhlIGxheWVyIGNvbnN0cnVjdG9yLCB1c2UgdGhhdCBpbnN0ZWFkXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRyYXdpbmdJbmZvKSB7XG4gICAgICAgIHJlc3BvbnNlLmRyYXdpbmdJbmZvID0gdGhpcy5vcHRpb25zLmRyYXdpbmdJbmZvO1xuICAgICAgfVxuICAgICAgdGhpcy5fc2V0UmVuZGVyZXJzKHJlc3BvbnNlKTtcbiAgICB9IGlmICh0aGlzLl9hbHJlYWR5QWRkZWQpIHtcbiAgICAgIHRoaXMuc2V0U3R5bGUodGhpcy5fb3JpZ2luYWxTdHlsZSk7XG4gICAgfVxuICB9LCB0aGlzKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Q0NFTyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNuQyxDQUFBLEVBQUUsVUFBVSxFQUFFLFVBQVUsVUFBVSxFQUFFLE9BQU8sRUFBRTtBQUM3QyxDQUFBLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7QUFDbEMsQ0FBQSxJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUN0QixDQUFBLElB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QVUsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzFCLENBQUEsVUFBVSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QyxDQUFBLFNBQVM7O0FBRVQsQ0FBQSxRQUFRLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQzVELENBQUEsVUFBVSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUNwRCxDQUFBLFVBQVUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDcEQsQ0FBQSxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7O0FBRXJELENBQUEsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNsQyxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQSxHQUFHO0FBQ0gsQ0FBQSxDQUFDLENBQUMsQ0FBQzs7QUFFSCxDQUFPLElBQUksV0FBVyxHQUFHLFVBQVUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDMUQsQ0FBQSxFQUFFLE9BQU8sSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoRCxDQUFBLENBQUMsQ0FBQzs7Q0NuREssSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQzs7QUFFeEMsQ0FBQSxFQUFFLFVBQVUsRUFBRSxVQUFVLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQy9DLENBQUEs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