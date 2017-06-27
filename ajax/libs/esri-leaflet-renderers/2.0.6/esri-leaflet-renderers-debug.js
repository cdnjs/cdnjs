/* esri-leaflet-renderers - v2.0.6 - Fri Jun 02 2017 10:33:20 GMT-0700 (PDT)
 * Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet'), require('esri-leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet', 'esri-leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}, global.L.esri.Renderers = global.L.esri.Renderers || {}),global.L,global.L.esri));
}(this, function (exports,L,Esri) { 'use strict';

	L = 'default' in L ? L['default'] : L;
	Esri = 'default' in Esri ? Esri['default'] : Esri;

	var version = "2.0.6";

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
	              interpolatedColor[j] = Math.round((lowerBoundColor[j] * lowerBoundColorWeight) + (upperBoundColor[j] * upperBoundColorWeight));
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
	    var url;
	    Symbol.prototype.initialize.call(this, symbolJson, options);
	    if (options) {
	      this.serviceUrl = options.url;
	    }
	    if (symbolJson) {
	      if (symbolJson.type === 'esriPMS') {
	        var imageUrl = this._symbolJson.url;
	        if ((imageUrl && imageUrl.substr(0, 7) === 'http://') || (imageUrl.substr(0, 8) === 'https://')) {
	          // web image
	          url = this.sanitize(imageUrl);
	          this._iconUrl = url;
	        } else {
	          url = this.serviceUrl + 'images/' + imageUrl;
	          this._iconUrl = options && options.token ? url + '?token=' + options.token : url;
	        }
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

	  // prevent html injection in strings
	  sanitize: function (str) {
	    if (!str) {
	      return '';
	    }
	    var text;
	    try {
	      // removes html but leaves url link text
	      text = str.replace(/<br>/gi, '\n');
	      text = text.replace(/<p.*>/gi, '\n');
	      text = text.replace(/<a.*href='(.*?)'.*>(.*?)<\/a>/gi, ' $2 ($1) ');
	      text = text.replace(/<(?:.|\s)*?>/g, '');
	    } catch (ex) {
	      text = null;
	    }
	    return text;
	  },

	  _fillStyles: function () {
	    if (this._symbolJson.outline && this._symbolJson.size > 0 && this._symbolJson.outline.style !== 'esriSLSNull') {
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
	      if (symbolJson.outline && symbolJson.outline.style === 'esriSLSNull') {
	        this._lineStyles = { weight: 0 };
	      } else {
	        this._lineStyles = lineSymbol(symbolJson.outline, options).style();
	      }
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

	Esri.FeatureLayer.addInitHook(function () {
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
	        return;
	      } if (response && response.drawingInfo) {
	        if (this.options.drawingInfo) {
	          // allow L.esri.webmap (and others) to override service symbology with info provided in layer constructor
	          response.drawingInfo = this.options.drawingInfo;
	        }

	        // the default pane for lines and polygons is 'overlayPane', for points it is 'markerPane'
	        if (this.options.pane === 'overlayPane' && response.geometryType === 'esriGeometryPoint') {
	          this.options.pane = 'markerPane';
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

	  this._setRenderers = function (serviceInfo) {
	    var rend;
	    var rendererInfo = serviceInfo.drawingInfo.renderer;

	    var options = {
	      url: this.options.url
	    };

	    if (this.options.token) {
	      options.token = this.options.token;
	    }

	    if (this.options.pane) {
	      options.pane = this.options.pane;
	    }

	    if (serviceInfo.drawingInfo.transparency) {
	      options.layerTransparency = serviceInfo.drawingInfo.transparency;
	    }

	    if (this.options.style) {
	      options.userDefinedStyle = this.options.style;
	    }

	    switch (rendererInfo.type) {
	      case 'classBreaks':
	        this._checkForProportionalSymbols(serviceInfo.geometryType, rendererInfo);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LXJlbmRlcmVycy1kZWJ1Zy5qcyIsInNvdXJjZXMiOlsiLi4vcGFja2FnZS5qc29uIiwiLi4vc3JjL1N5bWJvbHMvU3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xlYWZsZXQtc2hhcGUtbWFya2Vycy9zcmMvU2hhcGVNYXJrZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGVhZmxldC1zaGFwZS1tYXJrZXJzL3NyYy9Dcm9zc01hcmtlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9sZWFmbGV0LXNoYXBlLW1hcmtlcnMvc3JjL1hNYXJrZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGVhZmxldC1zaGFwZS1tYXJrZXJzL3NyYy9TcXVhcmVNYXJrZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGVhZmxldC1zaGFwZS1tYXJrZXJzL3NyYy9EaWFtb25kTWFya2VyLmpzIiwiLi4vc3JjL1N5bWJvbHMvUG9pbnRTeW1ib2wuanMiLCIuLi9zcmMvU3ltYm9scy9MaW5lU3ltYm9sLmpzIiwiLi4vc3JjL1N5bWJvbHMvUG9seWdvblN5bWJvbC5qcyIsIi4uL3NyYy9SZW5kZXJlcnMvUmVuZGVyZXIuanMiLCIuLi9zcmMvUmVuZGVyZXJzL1NpbXBsZVJlbmRlcmVyLmpzIiwiLi4vc3JjL1JlbmRlcmVycy9DbGFzc0JyZWFrc1JlbmRlcmVyLmpzIiwiLi4vc3JjL1JlbmRlcmVycy9VbmlxdWVWYWx1ZVJlbmRlcmVyLmpzIiwiLi4vc3JjL0ZlYXR1cmVMYXllckhvb2suanMiXSwic291cmNlc0NvbnRlbnQiOlsie1xuICBcIm5hbWVcIjogXCJlc3JpLWxlYWZsZXQtcmVuZGVyZXJzXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJlc3JpLWxlYWZsZXQgcGx1Z2luIGZvciByZW5kZXJpbmdcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMi4wLjZcIixcbiAgXCJhdXRob3JcIjogXCJSYWNoZWwgTmVobWVyIDxybmVobWVyQGVzcmkuY29tPlwiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2VzcmkvZXNyaS1sZWFmbGV0LXJlbmRlcmVycy9pc3N1ZXNcIlxuICB9LFxuICBcImNvbnRyaWJ1dG9yc1wiOiBbXG4gICAgXCJSYWNoZWwgTmVobWVyIDxybmVobWVyQGVzcmkuY29tPlwiLFxuICAgIFwiSm9obiBHcmF2b2lzIDxqZ3Jhdm9pc0Blc3JpLmNvbT5cIlxuICBdLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJlc3JpLWxlYWZsZXRcIjogXCJeMi4wLjBcIixcbiAgICBcImxlYWZsZXRcIjogXCJeMS4wLjAtcmMuM1wiLFxuICAgIFwibGVhZmxldC1zaGFwZS1tYXJrZXJzXCI6IFwiXjEuMC40XCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYmFiZWxpZnlcIjogXCJeNi4xLjNcIixcbiAgICBcImNoYWlcIjogXCIzLjUuMFwiLFxuICAgIFwiZ2gtcmVsZWFzZVwiOiBcIl4yLjAuMFwiLFxuICAgIFwiaHR0cC1zZXJ2ZXJcIjogXCJeMC44LjVcIixcbiAgICBcImlzcGFydGFcIjogXCJeNC4wLjBcIixcbiAgICBcImlzdGFuYnVsXCI6IFwiXjAuNC4yXCIsXG4gICAgXCJrYXJtYVwiOiBcIl4xLjMuMFwiLFxuICAgIFwia2FybWEtY2hhaS1zaW5vblwiOiBcIl4wLjEuM1wiLFxuICAgIFwia2FybWEtY292ZXJhZ2VcIjogXCJeMS4xLjFcIixcbiAgICBcImthcm1hLW1vY2hhXCI6IFwiXjEuMy4wXCIsXG4gICAgXCJrYXJtYS1tb2NoYS1yZXBvcnRlclwiOiBcIl4yLjIuMVwiLFxuICAgIFwia2FybWEtcGhhbnRvbWpzLWxhdW5jaGVyXCI6IFwiXjEuMC4yXCIsXG4gICAgXCJrYXJtYS1zb3VyY2VtYXAtbG9hZGVyXCI6IFwiXjAuMy41XCIsXG4gICAgXCJta2RpcnBcIjogXCJeMC41LjFcIixcbiAgICBcIm1vY2hhXCI6IFwiXjMuMS4wXCIsXG4gICAgXCJwaGFudG9tanMtcHJlYnVpbHRcIjogXCJeMi4wLjBcIixcbiAgICBcInJvbGx1cFwiOiBcIl4wLjI1LjRcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tanNvblwiOiBcIl4yLjAuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1ub2RlLXJlc29sdmVcIjogXCJeMS40LjBcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tdWdsaWZ5XCI6IFwiXjAuMy4xXCIsXG4gICAgXCJzZW1pc3RhbmRhcmRcIjogXCJeMTAuMC4wXCIsXG4gICAgXCJzaW5vblwiOiBcIl4xLjExLjFcIixcbiAgICBcInNpbm9uLWNoYWlcIjogXCIyLjguMFwiLFxuICAgIFwic25henp5XCI6IFwiXjUuMC4wXCIsXG4gICAgXCJ1Z2xpZnktanNcIjogXCJeMi42LjFcIixcbiAgICBcIndhdGNoXCI6IFwiXjAuMTcuMVwiXG4gIH0sXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwOi8vZXNyaS5naXRodWIuaW8vZXNyaS1sZWFmbGV0XCIsXG4gIFwianNuZXh0Om1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXRSZW5kZXJlcnMuanNcIixcbiAgXCJqc3BtXCI6IHtcbiAgICBcInJlZ2lzdHJ5XCI6IFwibnBtXCIsXG4gICAgXCJmb3JtYXRcIjogXCJlczZcIixcbiAgICBcIm1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXRSZW5kZXJlcnMuanNcIlxuICB9LFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcImFyY2dpc1wiLFxuICAgIFwiZXNyaVwiLFxuICAgIFwiZXNyaSBsZWFmbGV0XCIsXG4gICAgXCJnaXNcIixcbiAgICBcImxlYWZsZXQgcGx1Z2luXCIsXG4gICAgXCJtYXBwaW5nXCIsXG4gICAgXCJyZW5kZXJlcnNcIixcbiAgICBcInN5bWJvbG9neVwiXG4gIF0sXG4gIFwibGljZW5zZVwiOiBcIkFwYWNoZS0yLjBcIixcbiAgXCJtYWluXCI6IFwiZGlzdC9lc3JpLWxlYWZsZXQtcmVuZGVyZXJzLWRlYnVnLmpzXCIsXG4gIFwibW9kdWxlXCI6IFwic3JjL0VzcmlMZWFmbGV0UmVuZGVyZXJzLmpzXCIsXG4gIFwiYnJvd3NlclwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LXJlbmRlcmVycy1kZWJ1Zy5qc1wiLFxuICBcInJlYWRtZUZpbGVuYW1lXCI6IFwiUkVBRE1FLm1kXCIsXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJnaXRAZ2l0aHViLmNvbTpFc3JpL2VzcmktbGVhZmxldC1yZW5kZXJlcnMuZ2l0XCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcInByZWJ1aWxkXCI6IFwibWtkaXJwIGRpc3RcIixcbiAgICBcImJ1aWxkXCI6IFwicm9sbHVwIC1jIHByb2ZpbGVzL2RlYnVnLmpzICYgcm9sbHVwIC1jIHByb2ZpbGVzL3Byb2R1Y3Rpb24uanNcIixcbiAgICBcImxpbnRcIjogXCJzZW1pc3RhbmRhcmQgc3JjLyoqLyouanMgfCBzbmF6enlcIixcbiAgICBcInByZXB1Ymxpc2hcIjogXCJucG0gcnVuIGJ1aWxkXCIsXG4gICAgXCJwcmV0ZXN0XCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicmVsZWFzZVwiOiBcIi4vc2NyaXB0cy9yZWxlYXNlLnNoXCIsXG4gICAgXCJzdGFydFwiOiBcIndhdGNoICducG0gcnVuIGJ1aWxkJyBzcmMgJiBodHRwLXNlcnZlciAtcCA1MDAwIC1jLTEgLW9cIixcbiAgICBcInRlc3RcIjogXCJucG0gcnVuIGxpbnQgJiYga2FybWEgc3RhcnRcIlxuICB9XG59XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcblxuZXhwb3J0IHZhciBTeW1ib2wgPSBMLkNsYXNzLmV4dGVuZCh7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChzeW1ib2xKc29uLCBvcHRpb25zKSB7XG4gICAgdGhpcy5fc3ltYm9sSnNvbiA9IHN5bWJvbEpzb247XG4gICAgdGhpcy52YWwgPSBudWxsO1xuICAgIHRoaXMuX3N0eWxlcyA9IHt9O1xuICAgIHRoaXMuX2lzRGVmYXVsdCA9IGZhbHNlO1xuICAgIHRoaXMuX2xheWVyVHJhbnNwYXJlbmN5ID0gMTtcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmxheWVyVHJhbnNwYXJlbmN5KSB7XG4gICAgICB0aGlzLl9sYXllclRyYW5zcGFyZW5jeSA9IDEgLSAob3B0aW9ucy5sYXllclRyYW5zcGFyZW5jeSAvIDEwMC4wKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gdGhlIGdlb2pzb24gdmFsdWVzIHJldHVybmVkIGFyZSBpbiBwb2ludHNcbiAgcGl4ZWxWYWx1ZTogZnVuY3Rpb24gKHBvaW50VmFsdWUpIHtcbiAgICByZXR1cm4gcG9pbnRWYWx1ZSAqIDEuMzMzO1xuICB9LFxuXG4gIC8vIGNvbG9yIGlzIGFuIGFycmF5IFtyLGcsYixhXVxuICBjb2xvclZhbHVlOiBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICByZXR1cm4gJ3JnYignICsgY29sb3JbMF0gKyAnLCcgKyBjb2xvclsxXSArICcsJyArIGNvbG9yWzJdICsgJyknO1xuICB9LFxuXG4gIGFscGhhVmFsdWU6IGZ1bmN0aW9uIChjb2xvcikge1xuICAgIHZhciBhbHBoYSA9IGNvbG9yWzNdIC8gMjU1LjA7XG4gICAgcmV0dXJuIGFscGhhICogdGhpcy5fbGF5ZXJUcmFuc3BhcmVuY3k7XG4gIH0sXG5cbiAgZ2V0U2l6ZTogZnVuY3Rpb24gKGZlYXR1cmUsIHNpemVJbmZvKSB7XG4gICAgdmFyIGF0dHIgPSBmZWF0dXJlLnByb3BlcnRpZXM7XG4gICAgdmFyIGZpZWxkID0gc2l6ZUluZm8uZmllbGQ7XG4gICAgdmFyIHNpemUgPSAwO1xuICAgIHZhciBmZWF0dXJlVmFsdWUgPSBudWxsO1xuXG4gICAgaWYgKGZpZWxkKSB7XG4gICAgICBmZWF0dXJlVmFsdWUgPSBhdHRyW2ZpZWxkXTtcbiAgICAgIHZhciBtaW5TaXplID0gc2l6ZUluZm8ubWluU2l6ZTtcbiAgICAgIHZhciBtYXhTaXplID0gc2l6ZUluZm8ubWF4U2l6ZTtcbiAgICAgIHZhciBtaW5EYXRhVmFsdWUgPSBzaXplSW5mby5taW5EYXRhVmFsdWU7XG4gICAgICB2YXIgbWF4RGF0YVZhbHVlID0gc2l6ZUluZm8ubWF4RGF0YVZhbHVlO1xuICAgICAgdmFyIGZlYXR1cmVSYXRpbztcbiAgICAgIHZhciBub3JtRmllbGQgPSBzaXplSW5mby5ub3JtYWxpemF0aW9uRmllbGQ7XG4gICAgICB2YXIgbm9ybVZhbHVlID0gYXR0ciA/IHBhcnNlRmxvYXQoYXR0cltub3JtRmllbGRdKSA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKGZlYXR1cmVWYWx1ZSA9PT0gbnVsbCB8fCAobm9ybUZpZWxkICYmICgoaXNOYU4obm9ybVZhbHVlKSB8fCBub3JtVmFsdWUgPT09IDApKSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4obm9ybVZhbHVlKSkge1xuICAgICAgICBmZWF0dXJlVmFsdWUgLz0gbm9ybVZhbHVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWluU2l6ZSAhPT0gbnVsbCAmJiBtYXhTaXplICE9PSBudWxsICYmIG1pbkRhdGFWYWx1ZSAhPT0gbnVsbCAmJiBtYXhEYXRhVmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKGZlYXR1cmVWYWx1ZSA8PSBtaW5EYXRhVmFsdWUpIHtcbiAgICAgICAgICBzaXplID0gbWluU2l6ZTtcbiAgICAgICAgfSBlbHNlIGlmIChmZWF0dXJlVmFsdWUgPj0gbWF4RGF0YVZhbHVlKSB7XG4gICAgICAgICAgc2l6ZSA9IG1heFNpemU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmVhdHVyZVJhdGlvID0gKGZlYXR1cmVWYWx1ZSAtIG1pbkRhdGFWYWx1ZSkgLyAobWF4RGF0YVZhbHVlIC0gbWluRGF0YVZhbHVlKTtcbiAgICAgICAgICBzaXplID0gbWluU2l6ZSArIChmZWF0dXJlUmF0aW8gKiAobWF4U2l6ZSAtIG1pblNpemUpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2l6ZSA9IGlzTmFOKHNpemUpID8gMCA6IHNpemU7XG4gICAgfVxuICAgIHJldHVybiBzaXplO1xuICB9LFxuXG4gIGdldENvbG9yOiBmdW5jdGlvbiAoZmVhdHVyZSwgY29sb3JJbmZvKSB7XG4gICAgLy8gcmVxdWlyZWQgaW5mb3JtYXRpb24gdG8gZ2V0IGNvbG9yXG4gICAgaWYgKCEoZmVhdHVyZS5wcm9wZXJ0aWVzICYmIGNvbG9ySW5mbyAmJiBjb2xvckluZm8uZmllbGQgJiYgY29sb3JJbmZvLnN0b3BzKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGF0dHIgPSBmZWF0dXJlLnByb3BlcnRpZXM7XG4gICAgdmFyIGZlYXR1cmVWYWx1ZSA9IGF0dHJbY29sb3JJbmZvLmZpZWxkXTtcbiAgICB2YXIgbG93ZXJCb3VuZENvbG9yLCB1cHBlckJvdW5kQ29sb3IsIGxvd2VyQm91bmQsIHVwcGVyQm91bmQ7XG4gICAgdmFyIG5vcm1GaWVsZCA9IGNvbG9ySW5mby5ub3JtYWxpemF0aW9uRmllbGQ7XG4gICAgdmFyIG5vcm1WYWx1ZSA9IGF0dHIgPyBwYXJzZUZsb2F0KGF0dHJbbm9ybUZpZWxkXSkgOiB1bmRlZmluZWQ7XG4gICAgaWYgKGZlYXR1cmVWYWx1ZSA9PT0gbnVsbCB8fCAobm9ybUZpZWxkICYmICgoaXNOYU4obm9ybVZhbHVlKSB8fCBub3JtVmFsdWUgPT09IDApKSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghaXNOYU4obm9ybVZhbHVlKSkge1xuICAgICAgZmVhdHVyZVZhbHVlIC89IG5vcm1WYWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoZmVhdHVyZVZhbHVlIDw9IGNvbG9ySW5mby5zdG9wc1swXS52YWx1ZSkge1xuICAgICAgcmV0dXJuIGNvbG9ySW5mby5zdG9wc1swXS5jb2xvcjtcbiAgICB9XG4gICAgdmFyIGxhc3RTdG9wID0gY29sb3JJbmZvLnN0b3BzW2NvbG9ySW5mby5zdG9wcy5sZW5ndGggLSAxXTtcbiAgICBpZiAoZmVhdHVyZVZhbHVlID49IGxhc3RTdG9wLnZhbHVlKSB7XG4gICAgICByZXR1cm4gbGFzdFN0b3AuY29sb3I7XG4gICAgfVxuXG4gICAgLy8gZ28gdGhyb3VnaCB0aGUgc3RvcHMgdG8gZmluZCBtaW4gYW5kIG1heFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29sb3JJbmZvLnN0b3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc3RvcEluZm8gPSBjb2xvckluZm8uc3RvcHNbaV07XG5cbiAgICAgIGlmIChzdG9wSW5mby52YWx1ZSA8PSBmZWF0dXJlVmFsdWUpIHtcbiAgICAgICAgbG93ZXJCb3VuZENvbG9yID0gc3RvcEluZm8uY29sb3I7XG4gICAgICAgIGxvd2VyQm91bmQgPSBzdG9wSW5mby52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoc3RvcEluZm8udmFsdWUgPiBmZWF0dXJlVmFsdWUpIHtcbiAgICAgICAgdXBwZXJCb3VuZENvbG9yID0gc3RvcEluZm8uY29sb3I7XG4gICAgICAgIHVwcGVyQm91bmQgPSBzdG9wSW5mby52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmVhdHVyZSBmYWxscyBiZXR3ZWVuIHR3byBzdG9wcywgaW50ZXJwbGF0ZSB0aGUgY29sb3JzXG4gICAgaWYgKCFpc05hTihsb3dlckJvdW5kKSAmJiAhaXNOYU4odXBwZXJCb3VuZCkpIHtcbiAgICAgIHZhciByYW5nZSA9IHVwcGVyQm91bmQgLSBsb3dlckJvdW5kO1xuICAgICAgaWYgKHJhbmdlID4gMCkge1xuICAgICAgICAvLyBtb3JlIHdlaWdodCB0aGUgZnVydGhlciBpdCBpcyBmcm9tIHRoZSBsb3dlciBib3VuZFxuICAgICAgICB2YXIgdXBwZXJCb3VuZENvbG9yV2VpZ2h0ID0gKGZlYXR1cmVWYWx1ZSAtIGxvd2VyQm91bmQpIC8gcmFuZ2U7XG4gICAgICAgIGlmICh1cHBlckJvdW5kQ29sb3JXZWlnaHQpIHtcbiAgICAgICAgICAvLyBtb3JlIHdlaWdodCB0aGUgZnVydGhlciBpdCBpcyBmcm9tIHRoZSB1cHBlciBib3VuZFxuICAgICAgICAgIHZhciBsb3dlckJvdW5kQ29sb3JXZWlnaHQgPSAodXBwZXJCb3VuZCAtIGZlYXR1cmVWYWx1ZSkgLyByYW5nZTtcbiAgICAgICAgICBpZiAobG93ZXJCb3VuZENvbG9yV2VpZ2h0KSB7XG4gICAgICAgICAgICAvLyBpbnRlcnBvbGF0ZSB0aGUgbG93ZXIgYW5kIHVwcGVyIGJvdW5kIGNvbG9yIGJ5IGFwcGx5aW5nIHRoZVxuICAgICAgICAgICAgLy8gd2VpZ2h0cyB0byBlYWNoIG9mIHRoZSByZ2JhIGNvbG9ycyBhbmQgYWRkaW5nIHRoZW0gdG9nZXRoZXJcbiAgICAgICAgICAgIHZhciBpbnRlcnBvbGF0ZWRDb2xvciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA0OyBqKyspIHtcbiAgICAgICAgICAgICAgaW50ZXJwb2xhdGVkQ29sb3Jbal0gPSBNYXRoLnJvdW5kKChsb3dlckJvdW5kQ29sb3Jbal0gKiBsb3dlckJvdW5kQ29sb3JXZWlnaHQpICsgKHVwcGVyQm91bmRDb2xvcltqXSAqIHVwcGVyQm91bmRDb2xvcldlaWdodCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGludGVycG9sYXRlZENvbG9yO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBubyBkaWZmZXJlbmNlIGJldHdlZW4gZmVhdHVyZVZhbHVlIGFuZCB1cHBlckJvdW5kLCAxMDAlIG9mIHVwcGVyQm91bmRDb2xvclxuICAgICAgICAgICAgcmV0dXJuIHVwcGVyQm91bmRDb2xvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbm8gZGlmZmVyZW5jZSBiZXR3ZWVuIGZlYXR1cmVWYWx1ZSBhbmQgbG93ZXJCb3VuZCwgMTAwJSBvZiBsb3dlckJvdW5kQ29sb3JcbiAgICAgICAgICByZXR1cm4gbG93ZXJCb3VuZENvbG9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGlmIHdlIGdldCB0byBoZXJlLCBub25lIG9mIHRoZSBjYXNlcyBhcHBseSBzbyByZXR1cm4gbnVsbFxuICAgIHJldHVybiBudWxsO1xuICB9XG59KTtcblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbCAoc3ltYm9sSnNvbikge1xuLy8gICByZXR1cm4gbmV3IFN5bWJvbChzeW1ib2xKc29uKTtcbi8vIH1cblxuZXhwb3J0IGRlZmF1bHQgU3ltYm9sO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5cbmV4cG9ydCB2YXIgU2hhcGVNYXJrZXIgPSBMLlBhdGguZXh0ZW5kKHtcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAobGF0bG5nLCBzaXplLCBvcHRpb25zKSB7XG4gICAgTC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgIHRoaXMuX3NpemUgPSBzaXplO1xuICAgIHRoaXMuX2xhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG4gICAgdGhpcy5fc3ZnQ2FudmFzSW5jbHVkZXMoKTtcbiAgfSxcblxuICB0b0dlb0pTT046IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gTC5HZW9KU09OLmdldEZlYXR1cmUodGhpcywge1xuICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgIGNvb3JkaW5hdGVzOiBMLkdlb0pTT04ubGF0TG5nVG9Db29yZHModGhpcy5nZXRMYXRMbmcoKSlcbiAgICB9KTtcbiAgfSxcblxuICBfc3ZnQ2FudmFzSW5jbHVkZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBpbXBsZW1lbnQgaW4gc3ViIGNsYXNzXG4gIH0sXG5cbiAgX3Byb2plY3Q6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9wb2ludCA9IHRoaXMuX21hcC5sYXRMbmdUb0xheWVyUG9pbnQodGhpcy5fbGF0bG5nKTtcbiAgfSxcblxuICBfdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX21hcCkge1xuICAgICAgdGhpcy5fdXBkYXRlUGF0aCgpO1xuICAgIH1cbiAgfSxcblxuICBfdXBkYXRlUGF0aDogZnVuY3Rpb24gKCkge1xuICAgIC8vIGltcGxlbWVudCBpbiBzdWIgY2xhc3NcbiAgfSxcblxuICBzZXRMYXRMbmc6IGZ1bmN0aW9uIChsYXRsbmcpIHtcbiAgICB0aGlzLl9sYXRsbmcgPSBMLmxhdExuZyhsYXRsbmcpO1xuICAgIHRoaXMucmVkcmF3KCk7XG4gICAgcmV0dXJuIHRoaXMuZmlyZSgnbW92ZScsIHtsYXRsbmc6IHRoaXMuX2xhdGxuZ30pO1xuICB9LFxuXG4gIGdldExhdExuZzogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9sYXRsbmc7XG4gIH0sXG5cbiAgc2V0U2l6ZTogZnVuY3Rpb24gKHNpemUpIHtcbiAgICB0aGlzLl9zaXplID0gc2l6ZTtcbiAgICByZXR1cm4gdGhpcy5yZWRyYXcoKTtcbiAgfSxcblxuICBnZXRTaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBTaGFwZU1hcmtlciB9IGZyb20gJy4vU2hhcGVNYXJrZXInO1xuXG5leHBvcnQgdmFyIENyb3NzTWFya2VyID0gU2hhcGVNYXJrZXIuZXh0ZW5kKHtcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAobGF0bG5nLCBzaXplLCBvcHRpb25zKSB7XG4gICAgU2hhcGVNYXJrZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBsYXRsbmcsIHNpemUsIG9wdGlvbnMpO1xuICB9LFxuXG4gIF91cGRhdGVQYXRoOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIuX3VwZGF0ZUNyb3NzTWFya2VyKHRoaXMpO1xuICB9LFxuXG4gIF9zdmdDYW52YXNJbmNsdWRlczogZnVuY3Rpb24gKCkge1xuICAgIEwuQ2FudmFzLmluY2x1ZGUoe1xuICAgICAgX3VwZGF0ZUNyb3NzTWFya2VyOiBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgdmFyIGxhdGxuZyA9IGxheWVyLl9wb2ludDtcbiAgICAgICAgdmFyIG9mZnNldCA9IGxheWVyLl9zaXplIC8gMi4wO1xuICAgICAgICB2YXIgY3R4ID0gdGhpcy5fY3R4O1xuXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhsYXRsbmcueCwgbGF0bG5nLnkgKyBvZmZzZXQpO1xuICAgICAgICBjdHgubGluZVRvKGxhdGxuZy54LCBsYXRsbmcueSAtIG9mZnNldCk7XG4gICAgICAgIHRoaXMuX2ZpbGxTdHJva2UoY3R4LCBsYXllcik7XG5cbiAgICAgICAgY3R4Lm1vdmVUbyhsYXRsbmcueCAtIG9mZnNldCwgbGF0bG5nLnkpO1xuICAgICAgICBjdHgubGluZVRvKGxhdGxuZy54ICsgb2Zmc2V0LCBsYXRsbmcueSk7XG4gICAgICAgIHRoaXMuX2ZpbGxTdHJva2UoY3R4LCBsYXllcik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBMLlNWRy5pbmNsdWRlKHtcbiAgICAgIF91cGRhdGVDcm9zc01hcmtlcjogZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgIHZhciBsYXRsbmcgPSBsYXllci5fcG9pbnQ7XG4gICAgICAgIHZhciBvZmZzZXQgPSBsYXllci5fc2l6ZSAvIDIuMDtcblxuICAgICAgICBpZiAoTC5Ccm93c2VyLnZtbCkge1xuICAgICAgICAgIGxhdGxuZy5fcm91bmQoKTtcbiAgICAgICAgICBvZmZzZXQgPSBNYXRoLnJvdW5kKG9mZnNldCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RyID0gJ00nICsgbGF0bG5nLnggKyAnLCcgKyAobGF0bG5nLnkgKyBvZmZzZXQpICtcbiAgICAgICAgICAnTCcgKyBsYXRsbmcueCArICcsJyArIChsYXRsbmcueSAtIG9mZnNldCkgK1xuICAgICAgICAgICdNJyArIChsYXRsbmcueCAtIG9mZnNldCkgKyAnLCcgKyBsYXRsbmcueSArXG4gICAgICAgICAgJ0wnICsgKGxhdGxuZy54ICsgb2Zmc2V0KSArICcsJyArIGxhdGxuZy55O1xuXG4gICAgICAgIHRoaXMuX3NldFBhdGgobGF5ZXIsIHN0cik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgdmFyIGNyb3NzTWFya2VyID0gZnVuY3Rpb24gKGxhdGxuZywgc2l6ZSwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IENyb3NzTWFya2VyKGxhdGxuZywgc2l6ZSwgb3B0aW9ucyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcm9zc01hcmtlcjtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgU2hhcGVNYXJrZXIgfSBmcm9tICcuL1NoYXBlTWFya2VyJztcblxuZXhwb3J0IHZhciBYTWFya2VyID0gU2hhcGVNYXJrZXIuZXh0ZW5kKHtcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAobGF0bG5nLCBzaXplLCBvcHRpb25zKSB7XG4gICAgU2hhcGVNYXJrZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBsYXRsbmcsIHNpemUsIG9wdGlvbnMpO1xuICB9LFxuXG4gIF91cGRhdGVQYXRoOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIuX3VwZGF0ZVhNYXJrZXIodGhpcyk7XG4gIH0sXG5cbiAgX3N2Z0NhbnZhc0luY2x1ZGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgTC5DYW52YXMuaW5jbHVkZSh7XG4gICAgICBfdXBkYXRlWE1hcmtlcjogZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgIHZhciBsYXRsbmcgPSBsYXllci5fcG9pbnQ7XG4gICAgICAgIHZhciBvZmZzZXQgPSBsYXllci5fc2l6ZSAvIDIuMDtcbiAgICAgICAgdmFyIGN0eCA9IHRoaXMuX2N0eDtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgY3R4Lm1vdmVUbyhsYXRsbmcueCArIG9mZnNldCwgbGF0bG5nLnkgKyBvZmZzZXQpO1xuICAgICAgICBjdHgubGluZVRvKGxhdGxuZy54IC0gb2Zmc2V0LCBsYXRsbmcueSAtIG9mZnNldCk7XG4gICAgICAgIHRoaXMuX2ZpbGxTdHJva2UoY3R4LCBsYXllcik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBMLlNWRy5pbmNsdWRlKHtcbiAgICAgIF91cGRhdGVYTWFya2VyOiBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgdmFyIGxhdGxuZyA9IGxheWVyLl9wb2ludDtcbiAgICAgICAgdmFyIG9mZnNldCA9IGxheWVyLl9zaXplIC8gMi4wO1xuXG4gICAgICAgIGlmIChMLkJyb3dzZXIudm1sKSB7XG4gICAgICAgICAgbGF0bG5nLl9yb3VuZCgpO1xuICAgICAgICAgIG9mZnNldCA9IE1hdGgucm91bmQob2Zmc2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdHIgPSAnTScgKyAobGF0bG5nLnggKyBvZmZzZXQpICsgJywnICsgKGxhdGxuZy55ICsgb2Zmc2V0KSArXG4gICAgICAgICAgJ0wnICsgKGxhdGxuZy54IC0gb2Zmc2V0KSArICcsJyArIChsYXRsbmcueSAtIG9mZnNldCkgK1xuICAgICAgICAgICdNJyArIChsYXRsbmcueCAtIG9mZnNldCkgKyAnLCcgKyAobGF0bG5nLnkgKyBvZmZzZXQpICtcbiAgICAgICAgICAnTCcgKyAobGF0bG5nLnggKyBvZmZzZXQpICsgJywnICsgKGxhdGxuZy55IC0gb2Zmc2V0KTtcblxuICAgICAgICB0aGlzLl9zZXRQYXRoKGxheWVyLCBzdHIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59KTtcblxuZXhwb3J0IHZhciB4TWFya2VyID0gZnVuY3Rpb24gKGxhdGxuZywgc2l6ZSwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IFhNYXJrZXIobGF0bG5nLCBzaXplLCBvcHRpb25zKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHhNYXJrZXI7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IFNoYXBlTWFya2VyIH0gZnJvbSAnLi9TaGFwZU1hcmtlcic7XG5cbmV4cG9ydCB2YXIgU3F1YXJlTWFya2VyID0gU2hhcGVNYXJrZXIuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIGZpbGw6IHRydWVcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAobGF0bG5nLCBzaXplLCBvcHRpb25zKSB7XG4gICAgU2hhcGVNYXJrZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBsYXRsbmcsIHNpemUsIG9wdGlvbnMpO1xuICB9LFxuXG4gIF91cGRhdGVQYXRoOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIuX3VwZGF0ZVNxdWFyZU1hcmtlcih0aGlzKTtcbiAgfSxcblxuICBfc3ZnQ2FudmFzSW5jbHVkZXM6IGZ1bmN0aW9uICgpIHtcbiAgICBMLkNhbnZhcy5pbmNsdWRlKHtcbiAgICAgIF91cGRhdGVTcXVhcmVNYXJrZXI6IGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICB2YXIgbGF0bG5nID0gbGF5ZXIuX3BvaW50O1xuICAgICAgICB2YXIgb2Zmc2V0ID0gbGF5ZXIuX3NpemUgLyAyLjA7XG4gICAgICAgIHZhciBjdHggPSB0aGlzLl9jdHg7XG5cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgICAgIGN0eC5tb3ZlVG8obGF0bG5nLnggKyBvZmZzZXQsIGxhdGxuZy55ICsgb2Zmc2V0KTtcbiAgICAgICAgY3R4LmxpbmVUbyhsYXRsbmcueCAtIG9mZnNldCwgbGF0bG5nLnkgKyBvZmZzZXQpO1xuICAgICAgICBjdHgubGluZVRvKGxhdGxuZy54IC0gb2Zmc2V0LCBsYXRsbmcueSAtIG9mZnNldCk7XG4gICAgICAgIGN0eC5saW5lVG8obGF0bG5nLnggKyBvZmZzZXQsIGxhdGxuZy55IC0gb2Zmc2V0KTtcblxuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgdGhpcy5fZmlsbFN0cm9rZShjdHgsIGxheWVyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIEwuU1ZHLmluY2x1ZGUoe1xuICAgICAgX3VwZGF0ZVNxdWFyZU1hcmtlcjogZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgIHZhciBsYXRsbmcgPSBsYXllci5fcG9pbnQ7XG4gICAgICAgIHZhciBvZmZzZXQgPSBsYXllci5fc2l6ZSAvIDIuMDtcblxuICAgICAgICBpZiAoTC5Ccm93c2VyLnZtbCkge1xuICAgICAgICAgIGxhdGxuZy5fcm91bmQoKTtcbiAgICAgICAgICBvZmZzZXQgPSBNYXRoLnJvdW5kKG9mZnNldCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RyID0gJ00nICsgKGxhdGxuZy54ICsgb2Zmc2V0KSArICcsJyArIChsYXRsbmcueSArIG9mZnNldCkgK1xuICAgICAgICAgICdMJyArIChsYXRsbmcueCAtIG9mZnNldCkgKyAnLCcgKyAobGF0bG5nLnkgKyBvZmZzZXQpICtcbiAgICAgICAgICAnTCcgKyAobGF0bG5nLnggLSBvZmZzZXQpICsgJywnICsgKGxhdGxuZy55IC0gb2Zmc2V0KSArXG4gICAgICAgICAgJ0wnICsgKGxhdGxuZy54ICsgb2Zmc2V0KSArICcsJyArIChsYXRsbmcueSAtIG9mZnNldCk7XG5cbiAgICAgICAgc3RyID0gc3RyICsgKEwuQnJvd3Nlci5zdmcgPyAneicgOiAneCcpO1xuXG4gICAgICAgIHRoaXMuX3NldFBhdGgobGF5ZXIsIHN0cik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgdmFyIHNxdWFyZU1hcmtlciA9IGZ1bmN0aW9uIChsYXRsbmcsIHNpemUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBTcXVhcmVNYXJrZXIobGF0bG5nLCBzaXplLCBvcHRpb25zKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNxdWFyZU1hcmtlcjtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgU2hhcGVNYXJrZXIgfSBmcm9tICcuL1NoYXBlTWFya2VyJztcblxuZXhwb3J0IHZhciBEaWFtb25kTWFya2VyID0gU2hhcGVNYXJrZXIuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIGZpbGw6IHRydWVcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAobGF0bG5nLCBzaXplLCBvcHRpb25zKSB7XG4gICAgU2hhcGVNYXJrZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBsYXRsbmcsIHNpemUsIG9wdGlvbnMpO1xuICB9LFxuXG4gIF91cGRhdGVQYXRoOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIuX3VwZGF0ZURpYW1vbmRNYXJrZXIodGhpcyk7XG4gIH0sXG5cbiAgX3N2Z0NhbnZhc0luY2x1ZGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgTC5DYW52YXMuaW5jbHVkZSh7XG4gICAgICBfdXBkYXRlRGlhbW9uZE1hcmtlcjogZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgIHZhciBsYXRsbmcgPSBsYXllci5fcG9pbnQ7XG4gICAgICAgIHZhciBvZmZzZXQgPSBsYXllci5fc2l6ZSAvIDIuMDtcbiAgICAgICAgdmFyIGN0eCA9IHRoaXMuX2N0eDtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgY3R4Lm1vdmVUbyhsYXRsbmcueCwgbGF0bG5nLnkgKyBvZmZzZXQpO1xuICAgICAgICBjdHgubGluZVRvKGxhdGxuZy54IC0gb2Zmc2V0LCBsYXRsbmcueSk7XG4gICAgICAgIGN0eC5saW5lVG8obGF0bG5nLngsIGxhdGxuZy55IC0gb2Zmc2V0KTtcbiAgICAgICAgY3R4LmxpbmVUbyhsYXRsbmcueCArIG9mZnNldCwgbGF0bG5nLnkpO1xuXG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuICAgICAgICB0aGlzLl9maWxsU3Ryb2tlKGN0eCwgbGF5ZXIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTC5TVkcuaW5jbHVkZSh7XG4gICAgICBfdXBkYXRlRGlhbW9uZE1hcmtlcjogZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgIHZhciBsYXRsbmcgPSBsYXllci5fcG9pbnQ7XG4gICAgICAgIHZhciBvZmZzZXQgPSBsYXllci5fc2l6ZSAvIDIuMDtcblxuICAgICAgICBpZiAoTC5Ccm93c2VyLnZtbCkge1xuICAgICAgICAgIGxhdGxuZy5fcm91bmQoKTtcbiAgICAgICAgICBvZmZzZXQgPSBNYXRoLnJvdW5kKG9mZnNldCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RyID0gJ00nICsgbGF0bG5nLnggKyAnLCcgKyAobGF0bG5nLnkgKyBvZmZzZXQpICtcbiAgICAgICAgICAnTCcgKyAobGF0bG5nLnggLSBvZmZzZXQpICsgJywnICsgbGF0bG5nLnkgK1xuICAgICAgICAgICdMJyArIGxhdGxuZy54ICsgJywnICsgKGxhdGxuZy55IC0gb2Zmc2V0KSArXG4gICAgICAgICAgJ0wnICsgKGxhdGxuZy54ICsgb2Zmc2V0KSArICcsJyArIGxhdGxuZy55O1xuXG4gICAgICAgIHN0ciA9IHN0ciArIChMLkJyb3dzZXIuc3ZnID8gJ3onIDogJ3gnKTtcblxuICAgICAgICB0aGlzLl9zZXRQYXRoKGxheWVyLCBzdHIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59KTtcblxuZXhwb3J0IHZhciBkaWFtb25kTWFya2VyID0gZnVuY3Rpb24gKGxhdGxuZywgc2l6ZSwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IERpYW1vbmRNYXJrZXIobGF0bG5nLCBzaXplLCBvcHRpb25zKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRpYW1vbmRNYXJrZXI7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCBTeW1ib2wgZnJvbSAnLi9TeW1ib2wnO1xuaW1wb3J0IHtzcXVhcmVNYXJrZXIsIHhNYXJrZXIsIGNyb3NzTWFya2VyLCBkaWFtb25kTWFya2VyfSBmcm9tICdsZWFmbGV0LXNoYXBlLW1hcmtlcnMnO1xuXG5leHBvcnQgdmFyIFBvaW50U3ltYm9sID0gU3ltYm9sLmV4dGVuZCh7XG5cbiAgc3RhdGljczoge1xuICAgIE1BUktFUlRZUEVTOiBbJ2VzcmlTTVNDaXJjbGUnLCAnZXNyaVNNU0Nyb3NzJywgJ2VzcmlTTVNEaWFtb25kJywgJ2VzcmlTTVNTcXVhcmUnLCAnZXNyaVNNU1gnLCAnZXNyaVBNUyddXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKHN5bWJvbEpzb24sIG9wdGlvbnMpIHtcbiAgICB2YXIgdXJsO1xuICAgIFN5bWJvbC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHN5bWJvbEpzb24sIG9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICB0aGlzLnNlcnZpY2VVcmwgPSBvcHRpb25zLnVybDtcbiAgICB9XG4gICAgaWYgKHN5bWJvbEpzb24pIHtcbiAgICAgIGlmIChzeW1ib2xKc29uLnR5cGUgPT09ICdlc3JpUE1TJykge1xuICAgICAgICB2YXIgaW1hZ2VVcmwgPSB0aGlzLl9zeW1ib2xKc29uLnVybDtcbiAgICAgICAgaWYgKChpbWFnZVVybCAmJiBpbWFnZVVybC5zdWJzdHIoMCwgNykgPT09ICdodHRwOi8vJykgfHwgKGltYWdlVXJsLnN1YnN0cigwLCA4KSA9PT0gJ2h0dHBzOi8vJykpIHtcbiAgICAgICAgICAvLyB3ZWIgaW1hZ2VcbiAgICAgICAgICB1cmwgPSB0aGlzLnNhbml0aXplKGltYWdlVXJsKTtcbiAgICAgICAgICB0aGlzLl9pY29uVXJsID0gdXJsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVybCA9IHRoaXMuc2VydmljZVVybCArICdpbWFnZXMvJyArIGltYWdlVXJsO1xuICAgICAgICAgIHRoaXMuX2ljb25VcmwgPSBvcHRpb25zICYmIG9wdGlvbnMudG9rZW4gPyB1cmwgKyAnP3Rva2VuPScgKyBvcHRpb25zLnRva2VuIDogdXJsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzeW1ib2xKc29uLmltYWdlRGF0YSkge1xuICAgICAgICAgIHRoaXMuX2ljb25VcmwgPSAnZGF0YTonICsgc3ltYm9sSnNvbi5jb250ZW50VHlwZSArICc7YmFzZTY0LCcgKyBzeW1ib2xKc29uLmltYWdlRGF0YTtcbiAgICAgICAgfVxuICAgICAgICAvLyBsZWFmbGV0IGRvZXMgbm90IGFsbG93IHJlc2l6aW5nIGljb25zIHNvIGtlZXAgYSBoYXNoIG9mIGRpZmZlcmVudFxuICAgICAgICAvLyBpY29uIHNpemVzIHRvIHRyeSBhbmQga2VlcCBkb3duIG9uIHRoZSBudW1iZXIgb2YgaWNvbnMgY3JlYXRlZFxuICAgICAgICB0aGlzLl9pY29ucyA9IHt9O1xuICAgICAgICAvLyBjcmVhdGUgYmFzZSBpY29uXG4gICAgICAgIHRoaXMuaWNvbiA9IHRoaXMuX2NyZWF0ZUljb24odGhpcy5fc3ltYm9sSnNvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9maWxsU3R5bGVzKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIHByZXZlbnQgaHRtbCBpbmplY3Rpb24gaW4gc3RyaW5nc1xuICBzYW5pdGl6ZTogZnVuY3Rpb24gKHN0cikge1xuICAgIGlmICghc3RyKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciB0ZXh0O1xuICAgIHRyeSB7XG4gICAgICAvLyByZW1vdmVzIGh0bWwgYnV0IGxlYXZlcyB1cmwgbGluayB0ZXh0XG4gICAgICB0ZXh0ID0gc3RyLnJlcGxhY2UoLzxicj4vZ2ksICdcXG4nKTtcbiAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoLzxwLio+L2dpLCAnXFxuJyk7XG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC88YS4qaHJlZj0nKC4qPyknLio+KC4qPyk8XFwvYT4vZ2ksICcgJDIgKCQxKSAnKTtcbiAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoLzwoPzoufFxccykqPz4vZywgJycpO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICB0ZXh0ID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG4gIH0sXG5cbiAgX2ZpbGxTdHlsZXM6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fc3ltYm9sSnNvbi5vdXRsaW5lICYmIHRoaXMuX3N5bWJvbEpzb24uc2l6ZSA+IDAgJiYgdGhpcy5fc3ltYm9sSnNvbi5vdXRsaW5lLnN0eWxlICE9PSAnZXNyaVNMU051bGwnKSB7XG4gICAgICB0aGlzLl9zdHlsZXMuc3Ryb2tlID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3N0eWxlcy53ZWlnaHQgPSB0aGlzLnBpeGVsVmFsdWUodGhpcy5fc3ltYm9sSnNvbi5vdXRsaW5lLndpZHRoKTtcbiAgICAgIHRoaXMuX3N0eWxlcy5jb2xvciA9IHRoaXMuY29sb3JWYWx1ZSh0aGlzLl9zeW1ib2xKc29uLm91dGxpbmUuY29sb3IpO1xuICAgICAgdGhpcy5fc3R5bGVzLm9wYWNpdHkgPSB0aGlzLmFscGhhVmFsdWUodGhpcy5fc3ltYm9sSnNvbi5vdXRsaW5lLmNvbG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc3R5bGVzLnN0cm9rZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc3ltYm9sSnNvbi5jb2xvcikge1xuICAgICAgdGhpcy5fc3R5bGVzLmZpbGxDb2xvciA9IHRoaXMuY29sb3JWYWx1ZSh0aGlzLl9zeW1ib2xKc29uLmNvbG9yKTtcbiAgICAgIHRoaXMuX3N0eWxlcy5maWxsT3BhY2l0eSA9IHRoaXMuYWxwaGFWYWx1ZSh0aGlzLl9zeW1ib2xKc29uLmNvbG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc3R5bGVzLmZpbGxPcGFjaXR5ID0gMDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc3ltYm9sSnNvbi5zdHlsZSA9PT0gJ2VzcmlTTVNDaXJjbGUnKSB7XG4gICAgICB0aGlzLl9zdHlsZXMucmFkaXVzID0gdGhpcy5waXhlbFZhbHVlKHRoaXMuX3N5bWJvbEpzb24uc2l6ZSkgLyAyLjA7XG4gICAgfVxuICB9LFxuXG4gIF9jcmVhdGVJY29uOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciB3aWR0aCA9IHRoaXMucGl4ZWxWYWx1ZShvcHRpb25zLndpZHRoKTtcbiAgICB2YXIgaGVpZ2h0ID0gd2lkdGg7XG4gICAgaWYgKG9wdGlvbnMuaGVpZ2h0KSB7XG4gICAgICBoZWlnaHQgPSB0aGlzLnBpeGVsVmFsdWUob3B0aW9ucy5oZWlnaHQpO1xuICAgIH1cbiAgICB2YXIgeE9mZnNldCA9IHdpZHRoIC8gMi4wO1xuICAgIHZhciB5T2Zmc2V0ID0gaGVpZ2h0IC8gMi4wO1xuXG4gICAgaWYgKG9wdGlvbnMueG9mZnNldCkge1xuICAgICAgeE9mZnNldCArPSB0aGlzLnBpeGVsVmFsdWUob3B0aW9ucy54b2Zmc2V0KTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMueW9mZnNldCkge1xuICAgICAgeU9mZnNldCArPSB0aGlzLnBpeGVsVmFsdWUob3B0aW9ucy55b2Zmc2V0KTtcbiAgICB9XG5cbiAgICB2YXIgaWNvbiA9IEwuaWNvbih7XG4gICAgICBpY29uVXJsOiB0aGlzLl9pY29uVXJsLFxuICAgICAgaWNvblNpemU6IFt3aWR0aCwgaGVpZ2h0XSxcbiAgICAgIGljb25BbmNob3I6IFt4T2Zmc2V0LCB5T2Zmc2V0XVxuICAgIH0pO1xuICAgIHRoaXMuX2ljb25zW29wdGlvbnMud2lkdGgudG9TdHJpbmcoKV0gPSBpY29uO1xuICAgIHJldHVybiBpY29uO1xuICB9LFxuXG4gIF9nZXRJY29uOiBmdW5jdGlvbiAoc2l6ZSkge1xuICAgIC8vIGNoZWNrIHRvIHNlZSBpZiBpdCBpcyBhbHJlYWR5IGNyZWF0ZWQgYnkgc2l6ZVxuICAgIHZhciBpY29uID0gdGhpcy5faWNvbnNbc2l6ZS50b1N0cmluZygpXTtcbiAgICBpZiAoIWljb24pIHtcbiAgICAgIGljb24gPSB0aGlzLl9jcmVhdGVJY29uKHt3aWR0aDogc2l6ZX0pO1xuICAgIH1cbiAgICByZXR1cm4gaWNvbjtcbiAgfSxcblxuICBwb2ludFRvTGF5ZXI6IGZ1bmN0aW9uIChnZW9qc29uLCBsYXRsbmcsIHZpc3VhbFZhcmlhYmxlcywgb3B0aW9ucykge1xuICAgIHZhciBzaXplID0gdGhpcy5fc3ltYm9sSnNvbi5zaXplIHx8IHRoaXMuX3N5bWJvbEpzb24ud2lkdGg7XG4gICAgaWYgKCF0aGlzLl9pc0RlZmF1bHQpIHtcbiAgICAgIGlmICh2aXN1YWxWYXJpYWJsZXMuc2l6ZUluZm8pIHtcbiAgICAgICAgdmFyIGNhbGN1bGF0ZWRTaXplID0gdGhpcy5nZXRTaXplKGdlb2pzb24sIHZpc3VhbFZhcmlhYmxlcy5zaXplSW5mbyk7XG4gICAgICAgIGlmIChjYWxjdWxhdGVkU2l6ZSkge1xuICAgICAgICAgIHNpemUgPSBjYWxjdWxhdGVkU2l6ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHZpc3VhbFZhcmlhYmxlcy5jb2xvckluZm8pIHtcbiAgICAgICAgdmFyIGNvbG9yID0gdGhpcy5nZXRDb2xvcihnZW9qc29uLCB2aXN1YWxWYXJpYWJsZXMuY29sb3JJbmZvKTtcbiAgICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgICAgdGhpcy5fc3R5bGVzLmZpbGxDb2xvciA9IHRoaXMuY29sb3JWYWx1ZShjb2xvcik7XG4gICAgICAgICAgdGhpcy5fc3R5bGVzLmZpbGxPcGFjaXR5ID0gdGhpcy5hbHBoYVZhbHVlKGNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9zeW1ib2xKc29uLnR5cGUgPT09ICdlc3JpUE1TJykge1xuICAgICAgdmFyIGxheWVyT3B0aW9ucyA9IEwuZXh0ZW5kKHt9LCB7aWNvbjogdGhpcy5fZ2V0SWNvbihzaXplKX0sIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIEwubWFya2VyKGxhdGxuZywgbGF5ZXJPcHRpb25zKTtcbiAgICB9XG4gICAgc2l6ZSA9IHRoaXMucGl4ZWxWYWx1ZShzaXplKTtcblxuICAgIHN3aXRjaCAodGhpcy5fc3ltYm9sSnNvbi5zdHlsZSkge1xuICAgICAgY2FzZSAnZXNyaVNNU1NxdWFyZSc6XG4gICAgICAgIHJldHVybiBzcXVhcmVNYXJrZXIobGF0bG5nLCBzaXplLCBMLmV4dGVuZCh7fSwgdGhpcy5fc3R5bGVzLCBvcHRpb25zKSk7XG4gICAgICBjYXNlICdlc3JpU01TRGlhbW9uZCc6XG4gICAgICAgIHJldHVybiBkaWFtb25kTWFya2VyKGxhdGxuZywgc2l6ZSwgTC5leHRlbmQoe30sIHRoaXMuX3N0eWxlcywgb3B0aW9ucykpO1xuICAgICAgY2FzZSAnZXNyaVNNU0Nyb3NzJzpcbiAgICAgICAgcmV0dXJuIGNyb3NzTWFya2VyKGxhdGxuZywgc2l6ZSwgTC5leHRlbmQoe30sIHRoaXMuX3N0eWxlcywgb3B0aW9ucykpO1xuICAgICAgY2FzZSAnZXNyaVNNU1gnOlxuICAgICAgICByZXR1cm4geE1hcmtlcihsYXRsbmcsIHNpemUsIEwuZXh0ZW5kKHt9LCB0aGlzLl9zdHlsZXMsIG9wdGlvbnMpKTtcbiAgICB9XG4gICAgdGhpcy5fc3R5bGVzLnJhZGl1cyA9IHNpemUgLyAyLjA7XG4gICAgcmV0dXJuIEwuY2lyY2xlTWFya2VyKGxhdGxuZywgTC5leHRlbmQoe30sIHRoaXMuX3N0eWxlcywgb3B0aW9ucykpO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBvaW50U3ltYm9sIChzeW1ib2xKc29uLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgUG9pbnRTeW1ib2woc3ltYm9sSnNvbiwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBvaW50U3ltYm9sO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL1N5bWJvbCc7XG5cbmV4cG9ydCB2YXIgTGluZVN5bWJvbCA9IFN5bWJvbC5leHRlbmQoe1xuICBzdGF0aWNzOiB7XG4gICAgLy8gTm90IGltcGxlbWVudGVkICdlc3JpU0xTTnVsbCdcbiAgICBMSU5FVFlQRVM6IFsnZXNyaVNMU0Rhc2gnLCAnZXNyaVNMU0RvdCcsICdlc3JpU0xTRGFzaERvdERvdCcsICdlc3JpU0xTRGFzaERvdCcsICdlc3JpU0xTU29saWQnXVxuICB9LFxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoc3ltYm9sSnNvbiwgb3B0aW9ucykge1xuICAgIFN5bWJvbC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHN5bWJvbEpzb24sIG9wdGlvbnMpO1xuICAgIHRoaXMuX2ZpbGxTdHlsZXMoKTtcbiAgfSxcblxuICBfZmlsbFN0eWxlczogZnVuY3Rpb24gKCkge1xuICAgIC8vIHNldCB0aGUgZGVmYXVsdHMgdGhhdCBzaG93IHVwIG9uIGFyY2dpcyBvbmxpbmVcbiAgICB0aGlzLl9zdHlsZXMubGluZUNhcCA9ICdidXR0JztcbiAgICB0aGlzLl9zdHlsZXMubGluZUpvaW4gPSAnbWl0ZXInO1xuICAgIHRoaXMuX3N0eWxlcy5maWxsID0gZmFsc2U7XG4gICAgdGhpcy5fc3R5bGVzLndlaWdodCA9IDA7XG5cbiAgICBpZiAoIXRoaXMuX3N5bWJvbEpzb24pIHtcbiAgICAgIHJldHVybiB0aGlzLl9zdHlsZXM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3N5bWJvbEpzb24uY29sb3IpIHtcbiAgICAgIHRoaXMuX3N0eWxlcy5jb2xvciA9IHRoaXMuY29sb3JWYWx1ZSh0aGlzLl9zeW1ib2xKc29uLmNvbG9yKTtcbiAgICAgIHRoaXMuX3N0eWxlcy5vcGFjaXR5ID0gdGhpcy5hbHBoYVZhbHVlKHRoaXMuX3N5bWJvbEpzb24uY29sb3IpO1xuICAgIH1cblxuICAgIGlmICghaXNOYU4odGhpcy5fc3ltYm9sSnNvbi53aWR0aCkpIHtcbiAgICAgIHRoaXMuX3N0eWxlcy53ZWlnaHQgPSB0aGlzLnBpeGVsVmFsdWUodGhpcy5fc3ltYm9sSnNvbi53aWR0aCk7XG5cbiAgICAgIHZhciBkYXNoVmFsdWVzID0gW107XG5cbiAgICAgIHN3aXRjaCAodGhpcy5fc3ltYm9sSnNvbi5zdHlsZSkge1xuICAgICAgICBjYXNlICdlc3JpU0xTRGFzaCc6XG4gICAgICAgICAgZGFzaFZhbHVlcyA9IFs0LCAzXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZXNyaVNMU0RvdCc6XG4gICAgICAgICAgZGFzaFZhbHVlcyA9IFsxLCAzXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZXNyaVNMU0Rhc2hEb3QnOlxuICAgICAgICAgIGRhc2hWYWx1ZXMgPSBbOCwgMywgMSwgM107XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2VzcmlTTFNEYXNoRG90RG90JzpcbiAgICAgICAgICBkYXNoVmFsdWVzID0gWzgsIDMsIDEsIDMsIDEsIDNdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyB1c2UgdGhlIGRhc2ggdmFsdWVzIGFuZCB0aGUgbGluZSB3ZWlnaHQgdG8gc2V0IGRhc2ggYXJyYXlcbiAgICAgIGlmIChkYXNoVmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXNoVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZGFzaFZhbHVlc1tpXSAqPSB0aGlzLl9zdHlsZXMud2VpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc3R5bGVzLmRhc2hBcnJheSA9IGRhc2hWYWx1ZXMuam9pbignLCcpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzdHlsZTogZnVuY3Rpb24gKGZlYXR1cmUsIHZpc3VhbFZhcmlhYmxlcykge1xuICAgIGlmICghdGhpcy5faXNEZWZhdWx0ICYmIHZpc3VhbFZhcmlhYmxlcykge1xuICAgICAgaWYgKHZpc3VhbFZhcmlhYmxlcy5zaXplSW5mbykge1xuICAgICAgICB2YXIgY2FsY3VsYXRlZFNpemUgPSB0aGlzLnBpeGVsVmFsdWUodGhpcy5nZXRTaXplKGZlYXR1cmUsIHZpc3VhbFZhcmlhYmxlcy5zaXplSW5mbykpO1xuICAgICAgICBpZiAoY2FsY3VsYXRlZFNpemUpIHtcbiAgICAgICAgICB0aGlzLl9zdHlsZXMud2VpZ2h0ID0gY2FsY3VsYXRlZFNpemU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh2aXN1YWxWYXJpYWJsZXMuY29sb3JJbmZvKSB7XG4gICAgICAgIHZhciBjb2xvciA9IHRoaXMuZ2V0Q29sb3IoZmVhdHVyZSwgdmlzdWFsVmFyaWFibGVzLmNvbG9ySW5mbyk7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgIHRoaXMuX3N0eWxlcy5jb2xvciA9IHRoaXMuY29sb3JWYWx1ZShjb2xvcik7XG4gICAgICAgICAgdGhpcy5fc3R5bGVzLm9wYWNpdHkgPSB0aGlzLmFscGhhVmFsdWUoY29sb3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zdHlsZXM7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gbGluZVN5bWJvbCAoc3ltYm9sSnNvbiwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IExpbmVTeW1ib2woc3ltYm9sSnNvbiwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpbmVTeW1ib2w7XG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vU3ltYm9sJztcbmltcG9ydCBsaW5lU3ltYm9sIGZyb20gJy4vTGluZVN5bWJvbCc7XG5cbmV4cG9ydCB2YXIgUG9seWdvblN5bWJvbCA9IFN5bWJvbC5leHRlbmQoe1xuICBzdGF0aWNzOiB7XG4gICAgLy8gbm90IGltcGxlbWVudGVkOiAnZXNyaVNGU0JhY2t3YXJkRGlhZ29uYWwnLCdlc3JpU0ZTQ3Jvc3MnLCdlc3JpU0ZTRGlhZ29uYWxDcm9zcycsJ2VzcmlTRlNGb3J3YXJkRGlhZ29uYWwnLCdlc3JpU0ZTSG9yaXpvbnRhbCcsJ2VzcmlTRlNOdWxsJywnZXNyaVNGU1ZlcnRpY2FsJ1xuICAgIFBPTFlHT05UWVBFUzogWydlc3JpU0ZTU29saWQnXVxuICB9LFxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoc3ltYm9sSnNvbiwgb3B0aW9ucykge1xuICAgIFN5bWJvbC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHN5bWJvbEpzb24sIG9wdGlvbnMpO1xuICAgIGlmIChzeW1ib2xKc29uKSB7XG4gICAgICBpZiAoc3ltYm9sSnNvbi5vdXRsaW5lICYmIHN5bWJvbEpzb24ub3V0bGluZS5zdHlsZSA9PT0gJ2VzcmlTTFNOdWxsJykge1xuICAgICAgICB0aGlzLl9saW5lU3R5bGVzID0geyB3ZWlnaHQ6IDAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2xpbmVTdHlsZXMgPSBsaW5lU3ltYm9sKHN5bWJvbEpzb24ub3V0bGluZSwgb3B0aW9ucykuc3R5bGUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2ZpbGxTdHlsZXMoKTtcbiAgICB9XG4gIH0sXG5cbiAgX2ZpbGxTdHlsZXM6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fbGluZVN0eWxlcykge1xuICAgICAgaWYgKHRoaXMuX2xpbmVTdHlsZXMud2VpZ2h0ID09PSAwKSB7XG4gICAgICAgIC8vIHdoZW4gd2VpZ2h0IGlzIDAsIHNldHRpbmcgdGhlIHN0cm9rZSB0byBmYWxzZSBjYW4gc3RpbGwgbG9vayBiYWRcbiAgICAgICAgLy8gKGdhcHMgYmV0d2VlbiB0aGUgcG9seWdvbnMpXG4gICAgICAgIHRoaXMuX3N0eWxlcy5zdHJva2UgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNvcHkgdGhlIGxpbmUgc3ltYm9sIHN0eWxlcyBpbnRvIHRoaXMgc3ltYm9sJ3Mgc3R5bGVzXG4gICAgICAgIGZvciAodmFyIHN0eWxlQXR0ciBpbiB0aGlzLl9saW5lU3R5bGVzKSB7XG4gICAgICAgICAgdGhpcy5fc3R5bGVzW3N0eWxlQXR0cl0gPSB0aGlzLl9saW5lU3R5bGVzW3N0eWxlQXR0cl07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXQgdGhlIGZpbGwgZm9yIHRoZSBwb2x5Z29uXG4gICAgaWYgKHRoaXMuX3N5bWJvbEpzb24pIHtcbiAgICAgIGlmICh0aGlzLl9zeW1ib2xKc29uLmNvbG9yICYmXG4gICAgICAgICAgLy8gZG9uJ3QgZmlsbCBwb2x5Z29uIGlmIHR5cGUgaXMgbm90IHN1cHBvcnRlZFxuICAgICAgICAgIFBvbHlnb25TeW1ib2wuUE9MWUdPTlRZUEVTLmluZGV4T2YodGhpcy5fc3ltYm9sSnNvbi5zdHlsZSA+PSAwKSkge1xuICAgICAgICB0aGlzLl9zdHlsZXMuZmlsbCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3N0eWxlcy5maWxsQ29sb3IgPSB0aGlzLmNvbG9yVmFsdWUodGhpcy5fc3ltYm9sSnNvbi5jb2xvcik7XG4gICAgICAgIHRoaXMuX3N0eWxlcy5maWxsT3BhY2l0eSA9IHRoaXMuYWxwaGFWYWx1ZSh0aGlzLl9zeW1ib2xKc29uLmNvbG9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3N0eWxlcy5maWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3N0eWxlcy5maWxsT3BhY2l0eSA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHN0eWxlOiBmdW5jdGlvbiAoZmVhdHVyZSwgdmlzdWFsVmFyaWFibGVzKSB7XG4gICAgaWYgKCF0aGlzLl9pc0RlZmF1bHQgJiYgdmlzdWFsVmFyaWFibGVzICYmIHZpc3VhbFZhcmlhYmxlcy5jb2xvckluZm8pIHtcbiAgICAgIHZhciBjb2xvciA9IHRoaXMuZ2V0Q29sb3IoZmVhdHVyZSwgdmlzdWFsVmFyaWFibGVzLmNvbG9ySW5mbyk7XG4gICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgdGhpcy5fc3R5bGVzLmZpbGxDb2xvciA9IHRoaXMuY29sb3JWYWx1ZShjb2xvcik7XG4gICAgICAgIHRoaXMuX3N0eWxlcy5maWxsT3BhY2l0eSA9IHRoaXMuYWxwaGFWYWx1ZShjb2xvcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zdHlsZXM7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gcG9seWdvblN5bWJvbCAoc3ltYm9sSnNvbiwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IFBvbHlnb25TeW1ib2woc3ltYm9sSnNvbiwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBvbHlnb25TeW1ib2w7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHBvaW50U3ltYm9sIGZyb20gJy4uL1N5bWJvbHMvUG9pbnRTeW1ib2wnO1xuaW1wb3J0IGxpbmVTeW1ib2wgZnJvbSAnLi4vU3ltYm9scy9MaW5lU3ltYm9sJztcbmltcG9ydCBwb2x5Z29uU3ltYm9sIGZyb20gJy4uL1N5bWJvbHMvUG9seWdvblN5bWJvbCc7XG5cbmV4cG9ydCB2YXIgUmVuZGVyZXIgPSBMLkNsYXNzLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBwcm9wb3J0aW9uYWxQb2x5Z29uOiBmYWxzZSxcbiAgICBjbGlja2FibGU6IHRydWVcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAocmVuZGVyZXJKc29uLCBvcHRpb25zKSB7XG4gICAgdGhpcy5fcmVuZGVyZXJKc29uID0gcmVuZGVyZXJKc29uO1xuICAgIHRoaXMuX3BvaW50U3ltYm9scyA9IGZhbHNlO1xuICAgIHRoaXMuX3N5bWJvbHMgPSBbXTtcbiAgICB0aGlzLl92aXN1YWxWYXJpYWJsZXMgPSB0aGlzLl9wYXJzZVZpc3VhbFZhcmlhYmxlcyhyZW5kZXJlckpzb24udmlzdWFsVmFyaWFibGVzKTtcbiAgICBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgfSxcblxuICBfcGFyc2VWaXN1YWxWYXJpYWJsZXM6IGZ1bmN0aW9uICh2aXN1YWxWYXJpYWJsZXMpIHtcbiAgICB2YXIgdmlzVmFycyA9IHt9O1xuICAgIGlmICh2aXN1YWxWYXJpYWJsZXMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlzdWFsVmFyaWFibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZpc1ZhcnNbdmlzdWFsVmFyaWFibGVzW2ldLnR5cGVdID0gdmlzdWFsVmFyaWFibGVzW2ldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmlzVmFycztcbiAgfSxcblxuICBfY3JlYXRlRGVmYXVsdFN5bWJvbDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9yZW5kZXJlckpzb24uZGVmYXVsdFN5bWJvbCkge1xuICAgICAgdGhpcy5fZGVmYXVsdFN5bWJvbCA9IHRoaXMuX25ld1N5bWJvbCh0aGlzLl9yZW5kZXJlckpzb24uZGVmYXVsdFN5bWJvbCk7XG4gICAgICB0aGlzLl9kZWZhdWx0U3ltYm9sLl9pc0RlZmF1bHQgPSB0cnVlO1xuICAgIH1cbiAgfSxcblxuICBfbmV3U3ltYm9sOiBmdW5jdGlvbiAoc3ltYm9sSnNvbikge1xuICAgIGlmIChzeW1ib2xKc29uLnR5cGUgPT09ICdlc3JpU01TJyB8fCBzeW1ib2xKc29uLnR5cGUgPT09ICdlc3JpUE1TJykge1xuICAgICAgdGhpcy5fcG9pbnRTeW1ib2xzID0gdHJ1ZTtcbiAgICAgIHJldHVybiBwb2ludFN5bWJvbChzeW1ib2xKc29uLCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoc3ltYm9sSnNvbi50eXBlID09PSAnZXNyaVNMUycpIHtcbiAgICAgIHJldHVybiBsaW5lU3ltYm9sKHN5bWJvbEpzb24sIHRoaXMub3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChzeW1ib2xKc29uLnR5cGUgPT09ICdlc3JpU0ZTJykge1xuICAgICAgcmV0dXJuIHBvbHlnb25TeW1ib2woc3ltYm9sSnNvbiwgdGhpcy5vcHRpb25zKTtcbiAgICB9XG4gIH0sXG5cbiAgX2dldFN5bWJvbDogZnVuY3Rpb24gKCkge1xuICAgIC8vIG92ZXJyaWRlXG4gIH0sXG5cbiAgYXR0YWNoU3R5bGVzVG9MYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgaWYgKHRoaXMuX3BvaW50U3ltYm9scykge1xuICAgICAgbGF5ZXIub3B0aW9ucy5wb2ludFRvTGF5ZXIgPSBMLlV0aWwuYmluZCh0aGlzLnBvaW50VG9MYXllciwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxheWVyLm9wdGlvbnMuc3R5bGUgPSBMLlV0aWwuYmluZCh0aGlzLnN0eWxlLCB0aGlzKTtcbiAgICAgIGxheWVyLl9vcmlnaW5hbFN0eWxlID0gbGF5ZXIub3B0aW9ucy5zdHlsZTtcbiAgICB9XG4gIH0sXG5cbiAgcG9pbnRUb0xheWVyOiBmdW5jdGlvbiAoZ2VvanNvbiwgbGF0bG5nKSB7XG4gICAgdmFyIHN5bSA9IHRoaXMuX2dldFN5bWJvbChnZW9qc29uKTtcbiAgICBpZiAoc3ltICYmIHN5bS5wb2ludFRvTGF5ZXIpIHtcbiAgICAgIC8vIHJpZ2h0IG5vdyBjdXN0b20gcGFuZXMgYXJlIHRoZSBvbmx5IG9wdGlvbiBwdXNoZWQgdGhyb3VnaFxuICAgICAgcmV0dXJuIHN5bS5wb2ludFRvTGF5ZXIoZ2VvanNvbiwgbGF0bG5nLCB0aGlzLl92aXN1YWxWYXJpYWJsZXMsIHRoaXMub3B0aW9ucyk7XG4gICAgfVxuICAgIC8vIGludmlzaWJsZSBzeW1ib2xvZ3lcbiAgICByZXR1cm4gTC5jaXJjbGVNYXJrZXIobGF0bG5nLCB7cmFkaXVzOiAwLCBvcGFjaXR5OiAwfSk7XG4gIH0sXG5cbiAgc3R5bGU6IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgdmFyIHVzZXJTdHlsZXM7XG4gICAgaWYgKHRoaXMub3B0aW9ucy51c2VyRGVmaW5lZFN0eWxlKSB7XG4gICAgICB1c2VyU3R5bGVzID0gdGhpcy5vcHRpb25zLnVzZXJEZWZpbmVkU3R5bGUoZmVhdHVyZSk7XG4gICAgfVxuICAgIC8vIGZpbmQgdGhlIHN5bWJvbCB0byByZXByZXNlbnQgdGhpcyBmZWF0dXJlXG4gICAgdmFyIHN5bSA9IHRoaXMuX2dldFN5bWJvbChmZWF0dXJlKTtcbiAgICBpZiAoc3ltKSB7XG4gICAgICByZXR1cm4gdGhpcy5tZXJnZVN0eWxlcyhzeW0uc3R5bGUoZmVhdHVyZSwgdGhpcy5fdmlzdWFsVmFyaWFibGVzKSwgdXNlclN0eWxlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGludmlzaWJsZSBzeW1ib2xvZ3lcbiAgICAgIHJldHVybiB0aGlzLm1lcmdlU3R5bGVzKHtvcGFjaXR5OiAwLCBmaWxsT3BhY2l0eTogMH0sIHVzZXJTdHlsZXMpO1xuICAgIH1cbiAgfSxcblxuICBtZXJnZVN0eWxlczogZnVuY3Rpb24gKHN0eWxlcywgdXNlclN0eWxlcykge1xuICAgIHZhciBtZXJnZWRTdHlsZXMgPSB7fTtcbiAgICB2YXIgYXR0cjtcbiAgICAvLyBjb3B5IHJlbmRlcmVyIHN0eWxlIGF0dHJpYnV0ZXNcbiAgICBmb3IgKGF0dHIgaW4gc3R5bGVzKSB7XG4gICAgICBpZiAoc3R5bGVzLmhhc093blByb3BlcnR5KGF0dHIpKSB7XG4gICAgICAgIG1lcmdlZFN0eWxlc1thdHRyXSA9IHN0eWxlc1thdHRyXTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gb3ZlcnJpZGUgd2l0aCB1c2VyIGRlZmluZWQgc3R5bGUgYXR0cmlidXRlc1xuICAgIGlmICh1c2VyU3R5bGVzKSB7XG4gICAgICBmb3IgKGF0dHIgaW4gdXNlclN0eWxlcykge1xuICAgICAgICBpZiAodXNlclN0eWxlcy5oYXNPd25Qcm9wZXJ0eShhdHRyKSkge1xuICAgICAgICAgIG1lcmdlZFN0eWxlc1thdHRyXSA9IHVzZXJTdHlsZXNbYXR0cl07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1lcmdlZFN0eWxlcztcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFJlbmRlcmVyO1xuIiwiaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vUmVuZGVyZXInO1xuXG5leHBvcnQgdmFyIFNpbXBsZVJlbmRlcmVyID0gUmVuZGVyZXIuZXh0ZW5kKHtcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKHJlbmRlcmVySnNvbiwgb3B0aW9ucykge1xuICAgIFJlbmRlcmVyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgcmVuZGVyZXJKc29uLCBvcHRpb25zKTtcbiAgICB0aGlzLl9jcmVhdGVTeW1ib2woKTtcbiAgfSxcblxuICBfY3JlYXRlU3ltYm9sOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX3JlbmRlcmVySnNvbi5zeW1ib2wpIHtcbiAgICAgIHRoaXMuX3N5bWJvbHMucHVzaCh0aGlzLl9uZXdTeW1ib2wodGhpcy5fcmVuZGVyZXJKc29uLnN5bWJvbCkpO1xuICAgIH1cbiAgfSxcblxuICBfZ2V0U3ltYm9sOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N5bWJvbHNbMF07XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gc2ltcGxlUmVuZGVyZXIgKHJlbmRlcmVySnNvbiwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IFNpbXBsZVJlbmRlcmVyKHJlbmRlcmVySnNvbiwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNpbXBsZVJlbmRlcmVyO1xuIiwiaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vUmVuZGVyZXInO1xuXG5leHBvcnQgdmFyIENsYXNzQnJlYWtzUmVuZGVyZXIgPSBSZW5kZXJlci5leHRlbmQoe1xuICBpbml0aWFsaXplOiBmdW5jdGlvbiAocmVuZGVyZXJKc29uLCBvcHRpb25zKSB7XG4gICAgUmVuZGVyZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCByZW5kZXJlckpzb24sIG9wdGlvbnMpO1xuICAgIHRoaXMuX2ZpZWxkID0gdGhpcy5fcmVuZGVyZXJKc29uLmZpZWxkO1xuICAgIGlmICh0aGlzLl9yZW5kZXJlckpzb24ubm9ybWFsaXphdGlvblR5cGUgJiYgdGhpcy5fcmVuZGVyZXJKc29uLm5vcm1hbGl6YXRpb25UeXBlID09PSAnZXNyaU5vcm1hbGl6ZUJ5RmllbGQnKSB7XG4gICAgICB0aGlzLl9ub3JtYWxpemF0aW9uRmllbGQgPSB0aGlzLl9yZW5kZXJlckpzb24ubm9ybWFsaXphdGlvbkZpZWxkO1xuICAgIH1cbiAgICB0aGlzLl9jcmVhdGVTeW1ib2xzKCk7XG4gIH0sXG5cbiAgX2NyZWF0ZVN5bWJvbHM6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3ltYm9sO1xuICAgIHZhciBjbGFzc2JyZWFrcyA9IHRoaXMuX3JlbmRlcmVySnNvbi5jbGFzc0JyZWFrSW5mb3M7XG5cbiAgICB0aGlzLl9zeW1ib2xzID0gW107XG5cbiAgICAvLyBjcmVhdGUgYSBzeW1ib2wgZm9yIGVhY2ggY2xhc3MgYnJlYWtcbiAgICBmb3IgKHZhciBpID0gY2xhc3NicmVha3MubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucHJvcG9ydGlvbmFsUG9seWdvbiAmJiB0aGlzLl9yZW5kZXJlckpzb24uYmFja2dyb3VuZEZpbGxTeW1ib2wpIHtcbiAgICAgICAgc3ltYm9sID0gdGhpcy5fbmV3U3ltYm9sKHRoaXMuX3JlbmRlcmVySnNvbi5iYWNrZ3JvdW5kRmlsbFN5bWJvbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzeW1ib2wgPSB0aGlzLl9uZXdTeW1ib2woY2xhc3NicmVha3NbaV0uc3ltYm9sKTtcbiAgICAgIH1cbiAgICAgIHN5bWJvbC52YWwgPSBjbGFzc2JyZWFrc1tpXS5jbGFzc01heFZhbHVlO1xuICAgICAgdGhpcy5fc3ltYm9scy5wdXNoKHN5bWJvbCk7XG4gICAgfVxuICAgIC8vIHNvcnQgdGhlIHN5bWJvbHMgaW4gYXNjZW5kaW5nIHZhbHVlXG4gICAgdGhpcy5fc3ltYm9scy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gYS52YWwgPiBiLnZhbCA/IDEgOiAtMTtcbiAgICB9KTtcbiAgICB0aGlzLl9jcmVhdGVEZWZhdWx0U3ltYm9sKCk7XG4gICAgdGhpcy5fbWF4VmFsdWUgPSB0aGlzLl9zeW1ib2xzW3RoaXMuX3N5bWJvbHMubGVuZ3RoIC0gMV0udmFsO1xuICB9LFxuXG4gIF9nZXRTeW1ib2w6IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgdmFyIHZhbCA9IGZlYXR1cmUucHJvcGVydGllc1t0aGlzLl9maWVsZF07XG4gICAgaWYgKHRoaXMuX25vcm1hbGl6YXRpb25GaWVsZCkge1xuICAgICAgdmFyIG5vcm1WYWx1ZSA9IGZlYXR1cmUucHJvcGVydGllc1t0aGlzLl9ub3JtYWxpemF0aW9uRmllbGRdO1xuICAgICAgaWYgKCFpc05hTihub3JtVmFsdWUpICYmIG5vcm1WYWx1ZSAhPT0gMCkge1xuICAgICAgICB2YWwgPSB2YWwgLyBub3JtVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdFN5bWJvbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodmFsID4gdGhpcy5fbWF4VmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0U3ltYm9sO1xuICAgIH1cbiAgICB2YXIgc3ltYm9sID0gdGhpcy5fc3ltYm9sc1swXTtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5fc3ltYm9scy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgaWYgKHZhbCA+IHRoaXMuX3N5bWJvbHNbaV0udmFsKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgc3ltYm9sID0gdGhpcy5fc3ltYm9sc1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHN5bWJvbDtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGFzc0JyZWFrc1JlbmRlcmVyIChyZW5kZXJlckpzb24sIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBDbGFzc0JyZWFrc1JlbmRlcmVyKHJlbmRlcmVySnNvbiwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzQnJlYWtzUmVuZGVyZXI7XG4iLCJpbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5cbmV4cG9ydCB2YXIgVW5pcXVlVmFsdWVSZW5kZXJlciA9IFJlbmRlcmVyLmV4dGVuZCh7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChyZW5kZXJlckpzb24sIG9wdGlvbnMpIHtcbiAgICBSZW5kZXJlci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHJlbmRlcmVySnNvbiwgb3B0aW9ucyk7XG4gICAgdGhpcy5fZmllbGQgPSB0aGlzLl9yZW5kZXJlckpzb24uZmllbGQxO1xuICAgIHRoaXMuX2NyZWF0ZVN5bWJvbHMoKTtcbiAgfSxcblxuICBfY3JlYXRlU3ltYm9sczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzeW1ib2w7XG4gICAgdmFyIHVuaXF1ZXMgPSB0aGlzLl9yZW5kZXJlckpzb24udW5pcXVlVmFsdWVJbmZvcztcblxuICAgIC8vIGNyZWF0ZSBhIHN5bWJvbCBmb3IgZWFjaCB1bmlxdWUgdmFsdWVcbiAgICBmb3IgKHZhciBpID0gdW5pcXVlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgc3ltYm9sID0gdGhpcy5fbmV3U3ltYm9sKHVuaXF1ZXNbaV0uc3ltYm9sKTtcbiAgICAgIHN5bWJvbC52YWwgPSB1bmlxdWVzW2ldLnZhbHVlO1xuICAgICAgdGhpcy5fc3ltYm9scy5wdXNoKHN5bWJvbCk7XG4gICAgfVxuICAgIHRoaXMuX2NyZWF0ZURlZmF1bHRTeW1ib2woKTtcbiAgfSxcblxuICBfZ2V0U3ltYm9sOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgIHZhciB2YWwgPSBmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5fZmllbGRdO1xuICAgIC8vIGFjY3VtdWxhdGUgdmFsdWVzIGlmIHRoZXJlIGlzIG1vcmUgdGhhbiBvbmUgZmllbGQgZGVmaW5lZFxuICAgIGlmICh0aGlzLl9yZW5kZXJlckpzb24uZmllbGREZWxpbWl0ZXIgJiYgdGhpcy5fcmVuZGVyZXJKc29uLmZpZWxkMikge1xuICAgICAgdmFyIHZhbDIgPSBmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5fcmVuZGVyZXJKc29uLmZpZWxkMl07XG4gICAgICBpZiAodmFsMikge1xuICAgICAgICB2YWwgKz0gdGhpcy5fcmVuZGVyZXJKc29uLmZpZWxkRGVsaW1pdGVyICsgdmFsMjtcbiAgICAgICAgdmFyIHZhbDMgPSBmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5fcmVuZGVyZXJKc29uLmZpZWxkM107XG4gICAgICAgIGlmICh2YWwzKSB7XG4gICAgICAgICAgdmFsICs9IHRoaXMuX3JlbmRlcmVySnNvbi5maWVsZERlbGltaXRlciArIHZhbDM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc3ltYm9sID0gdGhpcy5fZGVmYXVsdFN5bWJvbDtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5fc3ltYm9scy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgLy8gdXNpbmcgdGhlID09PSBvcGVyYXRvciBkb2VzIG5vdCB3b3JrIGlmIHRoZSBmaWVsZFxuICAgICAgLy8gb2YgdGhlIHVuaXF1ZSByZW5kZXJlciBpcyBub3QgYSBzdHJpbmdcbiAgICAgIC8qZXNsaW50LWRpc2FibGUgKi9cbiAgICAgIGlmICh0aGlzLl9zeW1ib2xzW2ldLnZhbCA9PSB2YWwpIHtcbiAgICAgICAgc3ltYm9sID0gdGhpcy5fc3ltYm9sc1tpXTtcbiAgICAgIH1cbiAgICAgIC8qZXNsaW50LWVuYWJsZSAqL1xuICAgIH1cbiAgICByZXR1cm4gc3ltYm9sO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVuaXF1ZVZhbHVlUmVuZGVyZXIgKHJlbmRlcmVySnNvbiwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IFVuaXF1ZVZhbHVlUmVuZGVyZXIocmVuZGVyZXJKc29uLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdW5pcXVlVmFsdWVSZW5kZXJlcjtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IEVzcmkgZnJvbSAnZXNyaS1sZWFmbGV0JztcbmltcG9ydCBjbGFzc0JyZWFrc1JlbmRlcmVyIGZyb20gJy4vUmVuZGVyZXJzL0NsYXNzQnJlYWtzUmVuZGVyZXInO1xuaW1wb3J0IHVuaXF1ZVZhbHVlUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcnMvVW5pcXVlVmFsdWVSZW5kZXJlcic7XG5pbXBvcnQgc2ltcGxlUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcnMvU2ltcGxlUmVuZGVyZXInO1xuXG5Fc3JpLkZlYXR1cmVMYXllci5hZGRJbml0SG9vayhmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLm9wdGlvbnMuaWdub3JlUmVuZGVyZXIpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG9sZE9uQWRkID0gTC5VdGlsLmJpbmQodGhpcy5vbkFkZCwgdGhpcyk7XG4gIHZhciBvbGRVbmJpbmRQb3B1cCA9IEwuVXRpbC5iaW5kKHRoaXMudW5iaW5kUG9wdXAsIHRoaXMpO1xuICB2YXIgb2xkT25SZW1vdmUgPSBMLlV0aWwuYmluZCh0aGlzLm9uUmVtb3ZlLCB0aGlzKTtcbiAgTC5VdGlsLmJpbmQodGhpcy5jcmVhdGVOZXdMYXllciwgdGhpcyk7XG5cbiAgdGhpcy5vbkFkZCA9IGZ1bmN0aW9uIChtYXApIHtcbiAgICB0aGlzLm1ldGFkYXRhKGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLndhcm4oJ2ZhaWxlZCB0byBsb2FkIG1ldGFkYXRhIGZyb20gdGhlIHNlcnZpY2UuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRyYXdpbmdJbmZvKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZHJhd2luZ0luZm8pIHtcbiAgICAgICAgICAvLyBhbGxvdyBMLmVzcmkud2VibWFwIChhbmQgb3RoZXJzKSB0byBvdmVycmlkZSBzZXJ2aWNlIHN5bWJvbG9neSB3aXRoIGluZm8gcHJvdmlkZWQgaW4gbGF5ZXIgY29uc3RydWN0b3JcbiAgICAgICAgICByZXNwb25zZS5kcmF3aW5nSW5mbyA9IHRoaXMub3B0aW9ucy5kcmF3aW5nSW5mbztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZSBkZWZhdWx0IHBhbmUgZm9yIGxpbmVzIGFuZCBwb2x5Z29ucyBpcyAnb3ZlcmxheVBhbmUnLCBmb3IgcG9pbnRzIGl0IGlzICdtYXJrZXJQYW5lJ1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnBhbmUgPT09ICdvdmVybGF5UGFuZScgJiYgcmVzcG9uc2UuZ2VvbWV0cnlUeXBlID09PSAnZXNyaUdlb21ldHJ5UG9pbnQnKSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLnBhbmUgPSAnbWFya2VyUGFuZSc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZXRSZW5kZXJlcnMocmVzcG9uc2UpO1xuICAgICAgICBvbGRPbkFkZChtYXApO1xuICAgICAgICB0aGlzLl9hZGRQb2ludExheWVyKG1hcCk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH07XG5cbiAgdGhpcy5vblJlbW92ZSA9IGZ1bmN0aW9uIChtYXApIHtcbiAgICBvbGRPblJlbW92ZShtYXApO1xuICAgIGlmICh0aGlzLl9wb2ludExheWVyKSB7XG4gICAgICB2YXIgcG9pbnRMYXllcnMgPSB0aGlzLl9wb2ludExheWVyLmdldExheWVycygpO1xuICAgICAgZm9yICh2YXIgaSBpbiBwb2ludExheWVycykge1xuICAgICAgICBtYXAucmVtb3ZlTGF5ZXIocG9pbnRMYXllcnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB0aGlzLnVuYmluZFBvcHVwID0gZnVuY3Rpb24gKCkge1xuICAgIG9sZFVuYmluZFBvcHVwKCk7XG4gICAgaWYgKHRoaXMuX3BvaW50TGF5ZXIpIHtcbiAgICAgIHZhciBwb2ludExheWVycyA9IHRoaXMuX3BvaW50TGF5ZXIuZ2V0TGF5ZXJzKCk7XG4gICAgICBmb3IgKHZhciBpIGluIHBvaW50TGF5ZXJzKSB7XG4gICAgICAgIHBvaW50TGF5ZXJzW2ldLnVuYmluZFBvcHVwKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuX2FkZFBvaW50TGF5ZXIgPSBmdW5jdGlvbiAobWFwKSB7XG4gICAgaWYgKHRoaXMuX3BvaW50TGF5ZXIpIHtcbiAgICAgIHRoaXMuX3BvaW50TGF5ZXIuYWRkVG8obWFwKTtcbiAgICAgIHRoaXMuX3BvaW50TGF5ZXIuYnJpbmdUb0Zyb250KCk7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuX2NyZWF0ZVBvaW50TGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLl9wb2ludExheWVyKSB7XG4gICAgICB0aGlzLl9wb2ludExheWVyID0gTC5nZW9Kc29uKCk7XG4gICAgICAvLyBzdG9yZSB0aGUgZmVhdHVyZSBpZHMgdGhhdCBoYXZlIGFscmVhZHkgYmVlbiBhZGRlZCB0byB0aGUgbWFwXG4gICAgICB0aGlzLl9wb2ludExheWVySWRzID0ge307XG5cbiAgICAgIGlmICh0aGlzLl9wb3B1cCkge1xuICAgICAgICB2YXIgcG9wdXBGdW5jdGlvbiA9IGZ1bmN0aW9uIChmZWF0dXJlLCBsYXllcikge1xuICAgICAgICAgIGxheWVyLmJpbmRQb3B1cCh0aGlzLl9wb3B1cChmZWF0dXJlLCBsYXllciksIHRoaXMuX3BvcHVwT3B0aW9ucyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3BvaW50TGF5ZXIub3B0aW9ucy5vbkVhY2hGZWF0dXJlID0gTC5VdGlsLmJpbmQocG9wdXBGdW5jdGlvbiwgdGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuY3JlYXRlTmV3TGF5ZXIgPSBmdW5jdGlvbiAoZ2VvanNvbikge1xuICAgIHZhciBmTGF5ZXIgPSBMLkdlb0pTT04uZ2VvbWV0cnlUb0xheWVyKGdlb2pzb24sIHRoaXMub3B0aW9ucyk7XG5cbiAgICAvLyBhZGQgYSBwb2ludCBsYXllciB3aGVuIHRoZSBwb2x5Z29uIGlzIHJlcHJlc2VudGVkIGFzIHByb3BvcnRpb25hbCBtYXJrZXIgc3ltYm9sc1xuICAgIGlmICh0aGlzLl9oYXNQcm9wb3J0aW9uYWxTeW1ib2xzKSB7XG4gICAgICB2YXIgY2VudHJvaWQgPSB0aGlzLmdldFBvbHlnb25DZW50cm9pZChnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzKTtcbiAgICAgIGlmICghKGlzTmFOKGNlbnRyb2lkWzBdKSB8fCBpc05hTihjZW50cm9pZFswXSkpKSB7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVBvaW50TGF5ZXIoKTtcblxuICAgICAgICB2YXIgZmVhdHVyZUlkID0gZ2VvanNvbi5pZC50b1N0cmluZygpO1xuICAgICAgICAvLyBvbmx5IGFkZCB0aGUgZmVhdHVyZSBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0IG9uIHRoZSBtYXBcbiAgICAgICAgaWYgKCF0aGlzLl9wb2ludExheWVySWRzW2ZlYXR1cmVJZF0pIHtcbiAgICAgICAgICB2YXIgcG9pbnRqc29uID0gdGhpcy5nZXRQb2ludEpzb24oZ2VvanNvbiwgY2VudHJvaWQpO1xuXG4gICAgICAgICAgdGhpcy5fcG9pbnRMYXllci5hZGREYXRhKHBvaW50anNvbik7XG4gICAgICAgICAgdGhpcy5fcG9pbnRMYXllcklkc1tmZWF0dXJlSWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3BvaW50TGF5ZXIuYnJpbmdUb0Zyb250KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmTGF5ZXI7XG4gIH07XG5cbiAgdGhpcy5nZXRQb2x5Z29uQ2VudHJvaWQgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICB2YXIgcHRzID0gY29vcmRpbmF0ZXNbMF1bMF07XG4gICAgaWYgKHB0cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHB0cyA9IGNvb3JkaW5hdGVzWzBdO1xuICAgIH1cblxuICAgIHZhciB0d2ljZWFyZWEgPSAwO1xuICAgIHZhciB4ID0gMDtcbiAgICB2YXIgeSA9IDA7XG4gICAgdmFyIG5QdHMgPSBwdHMubGVuZ3RoO1xuICAgIHZhciBwMTtcbiAgICB2YXIgcDI7XG4gICAgdmFyIGY7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgaiA9IG5QdHMgLSAxOyBpIDwgblB0czsgaiA9IGkrKykge1xuICAgICAgcDEgPSBwdHNbaV07IHAyID0gcHRzW2pdO1xuICAgICAgdHdpY2VhcmVhICs9IHAxWzBdICogcDJbMV07XG4gICAgICB0d2ljZWFyZWEgLT0gcDFbMV0gKiBwMlswXTtcbiAgICAgIGYgPSBwMVswXSAqIHAyWzFdIC0gcDJbMF0gKiBwMVsxXTtcbiAgICAgIHggKz0gKHAxWzBdICsgcDJbMF0pICogZjtcbiAgICAgIHkgKz0gKHAxWzFdICsgcDJbMV0pICogZjtcbiAgICB9XG4gICAgZiA9IHR3aWNlYXJlYSAqIDM7XG4gICAgcmV0dXJuIFt4IC8gZiwgeSAvIGZdO1xuICB9O1xuXG4gIHRoaXMuZ2V0UG9pbnRKc29uID0gZnVuY3Rpb24gKGdlb2pzb24sIGNlbnRyb2lkKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgIHByb3BlcnRpZXM6IGdlb2pzb24ucHJvcGVydGllcyxcbiAgICAgIGlkOiBnZW9qc29uLmlkLFxuICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IFtjZW50cm9pZFswXSwgY2VudHJvaWRbMV1dXG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICB0aGlzLl9jaGVja0ZvclByb3BvcnRpb25hbFN5bWJvbHMgPSBmdW5jdGlvbiAoZ2VvbWV0cnlUeXBlLCByZW5kZXJlcikge1xuICAgIHRoaXMuX2hhc1Byb3BvcnRpb25hbFN5bWJvbHMgPSBmYWxzZTtcbiAgICBpZiAoZ2VvbWV0cnlUeXBlID09PSAnZXNyaUdlb21ldHJ5UG9seWdvbicpIHtcbiAgICAgIGlmIChyZW5kZXJlci5iYWNrZ3JvdW5kRmlsbFN5bWJvbCkge1xuICAgICAgICB0aGlzLl9oYXNQcm9wb3J0aW9uYWxTeW1ib2xzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB0aGUgZmlyc3Qgc3ltYm9sIGluIHRoZSBjbGFzc2JyZWFrcyBpcyBhIG1hcmtlciBzeW1ib2xcbiAgICAgIGlmIChyZW5kZXJlci5jbGFzc0JyZWFrSW5mb3MgJiYgcmVuZGVyZXIuY2xhc3NCcmVha0luZm9zLmxlbmd0aCkge1xuICAgICAgICB2YXIgc3ltID0gcmVuZGVyZXIuY2xhc3NCcmVha0luZm9zWzBdLnN5bWJvbDtcbiAgICAgICAgaWYgKHN5bSAmJiAoc3ltLnR5cGUgPT09ICdlc3JpU01TJyB8fCBzeW0udHlwZSA9PT0gJ2VzcmlQTVMnKSkge1xuICAgICAgICAgIHRoaXMuX2hhc1Byb3BvcnRpb25hbFN5bWJvbHMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuX3NldFJlbmRlcmVycyA9IGZ1bmN0aW9uIChzZXJ2aWNlSW5mbykge1xuICAgIHZhciByZW5kO1xuICAgIHZhciByZW5kZXJlckluZm8gPSBzZXJ2aWNlSW5mby5kcmF3aW5nSW5mby5yZW5kZXJlcjtcblxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgdXJsOiB0aGlzLm9wdGlvbnMudXJsXG4gICAgfTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIG9wdGlvbnMudG9rZW4gPSB0aGlzLm9wdGlvbnMudG9rZW47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5wYW5lKSB7XG4gICAgICBvcHRpb25zLnBhbmUgPSB0aGlzLm9wdGlvbnMucGFuZTtcbiAgICB9XG5cbiAgICBpZiAoc2VydmljZUluZm8uZHJhd2luZ0luZm8udHJhbnNwYXJlbmN5KSB7XG4gICAgICBvcHRpb25zLmxheWVyVHJhbnNwYXJlbmN5ID0gc2VydmljZUluZm8uZHJhd2luZ0luZm8udHJhbnNwYXJlbmN5O1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuc3R5bGUpIHtcbiAgICAgIG9wdGlvbnMudXNlckRlZmluZWRTdHlsZSA9IHRoaXMub3B0aW9ucy5zdHlsZTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHJlbmRlcmVySW5mby50eXBlKSB7XG4gICAgICBjYXNlICdjbGFzc0JyZWFrcyc6XG4gICAgICAgIHRoaXMuX2NoZWNrRm9yUHJvcG9ydGlvbmFsU3ltYm9scyhzZXJ2aWNlSW5mby5nZW9tZXRyeVR5cGUsIHJlbmRlcmVySW5mbyk7XG4gICAgICAgIGlmICh0aGlzLl9oYXNQcm9wb3J0aW9uYWxTeW1ib2xzKSB7XG4gICAgICAgICAgdGhpcy5fY3JlYXRlUG9pbnRMYXllcigpO1xuICAgICAgICAgIHZhciBwUmVuZCA9IGNsYXNzQnJlYWtzUmVuZGVyZXIocmVuZGVyZXJJbmZvLCBvcHRpb25zKTtcbiAgICAgICAgICBwUmVuZC5hdHRhY2hTdHlsZXNUb0xheWVyKHRoaXMuX3BvaW50TGF5ZXIpO1xuICAgICAgICAgIG9wdGlvbnMucHJvcG9ydGlvbmFsUG9seWdvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmVuZCA9IGNsYXNzQnJlYWtzUmVuZGVyZXIocmVuZGVyZXJJbmZvLCBvcHRpb25zKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd1bmlxdWVWYWx1ZSc6XG4gICAgICAgIHJlbmQgPSB1bmlxdWVWYWx1ZVJlbmRlcmVyKHJlbmRlcmVySW5mbywgb3B0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVuZCA9IHNpbXBsZVJlbmRlcmVyKHJlbmRlcmVySW5mbywgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJlbmQuYXR0YWNoU3R5bGVzVG9MYXllcih0aGlzKTtcbiAgfTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0NDRU8sSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDbkMsQ0FBQSxFQUFFLFVBQVUsRUFBRSxVQUFVLFVBQVUsRUFBRSxPQUFPLEVBQUU7QUFDN0MsQ0FBQSxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0FBQ2xDLENBQUEsSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztBQUNwQixDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDdEIsQ0FBQSxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0FBQzVCLENBQUEsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLENBQUEsSUFBSSxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsaUJBQWlCLEVBQUU7QUFDOUMsQ0FBQSxNQUFNLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxD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QUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztBQUNoRCxDQUFBLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDaEQsQ0FBQSxRQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUVyQyxDQUFBLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEQsQ0FBQSxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hELENBQUEsUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNyQyxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUssQ0FBQyxDQUFDOztBQUVQLENBQUEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUNsQixDQUFBLE1BQU0sa0JBQWtCLEVBQUUsVUFBVSxLQUFLLEVBQUU7QUFDM0MsQ0FBQSxRQUFRLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDbEMsQ0FBQSxRQUFRLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDOztBQUV2QyxDQUFBLFFBQVEsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMzQixDQUFBLFVBQVUsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzFCLENBQUEsVUFBVSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QyxDQUFBLFNBQVM7O0FBRVQsQ0FBQSxRQUFRLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQzVELENBQUEsVUFBVSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUNwRCxDQUFBLFVBQVUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDcEQsQ0FBQSxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7O0FBRXJELENBQUEsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNsQyxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQSxHQUFHO0FBQ0gsQ0FBQSxDQUFDLENBQUMsQ0FBQzs7QUFFSCxDQUFPLElBQUksV0FBVyxHQUFHLFVBQVUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDMUQsQ0FBQSxFQUFFLE9BQU8sSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoRCxDQUFBLENBQUMsQ0FBQzs7Q0NuREssSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQzs7QUFFeEMsQ0FBQSxFQUFFLFVBQVUsRUFBRSxVQUFVLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQy9DLENBQUEsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdkUsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxXQUFXLEVBQUUsWUFBWTtBQUMzQixDQUFBLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEMsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxrQkFBa0IsRUFBRSxZQUFZO0FBQ2xDLENBQUEsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNyQixDQUFBLE1BQU0sY0FBYyxFQUFFLFVBQVUsS0FBSyxFQUFFO0FBQ3ZDLENBQUEsUUFBUSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ2xDLENBQUEsUUFBUSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUN2QyxDQUFBLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzs7QUFFNUIsQ0FBQSxRQUFRLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7QUFFeEIsQ0FBQSxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztBQUN6RCxDQUFBLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0FBQ3pELENBQUEsUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNyQyxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUssQ0FBQyxDQUFDOztBQUVQLENBQUEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUNsQixDQUFBLE1BQU0sY0FBYyxFQUFFLFVBQVUsS0FBSyxFQUFFO0FBQ3ZDLENBQUEsUUFBUSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ2xDLENBQUEsUUFBUSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQzs7QUFFdkMsQ0FBQSxRQUFRLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7QUFDM0IsQ0FBQSxVQUFVLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMxQixDQUFBLFVBQVUsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEMsQ0FBQSxTQUFTOztBQUVULENBQUEsUUFBUSxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ3ZFLENBQUEsVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQy9ELENBQUEsVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQy9ELENBQUEsVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7O0FBRWhFLENBQUEsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNsQyxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQSxHQUFHO0FBQ0gsQ0FBQSxDQUFDLENBQUMsQ0FBQzs7QUFFSCxDQUFPLElBQUksT0FBTyxHQUFHLFVBQVUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDdEQsQ0FBQSxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM1QyxDQUFBLENBQUMsQ0FBQzs7Q0NoREssSUFBSSxZQUFZLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztBQUM3QyxDQUFBLEVBQUUsT0FBTyxFQUFFO0FBQ1gsQ0FBQSxJQUFJLElBQUksRUFBRSxJQUFJO0FBQ2QsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxVQUFVLEVBQUUsVUFBVSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUMvQyxDQUFBLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZFLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsV0FBVyxFQUFFLFlBQVk7QUFDM0IsQ0FBQSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0MsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxrQkFBa0IsRUFBRSxZQUFZO0FBQ2xDLENBQUEsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNyQixDQUFBLE1BQU0sbUJBQW1CLEVBQUUsVUFBVSxLQUFLLEVBQUU7QUFDNUMsQ0FBQSxRQUFRLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDbEMsQ0FBQSxRQUFRLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ3ZDLENBQUEsUUFBUSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDOztBQUU1QixDQUFBLFFBQVEsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDOztBQUV4QixDQUFBLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0FBQ3pELENBQUEsUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDekQsQ0FBQSxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztBQUN6RCxDQUFBLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDOztBQUV6RCxDQUFBLFFBQVEsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDOztBQUV4QixDQUFBLFFBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDckMsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxLQUFLLENBQUMsQ0FBQzs7QUFFUCxDQUFBLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDbEIsQ0FBQSxNQUFNLG1CQUFtQixFQUFFLFVBQVUsS0FBSyxFQUFFO0FBQzVDLENBQUEsUUFBUSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ2xDLENBQUEsUUFBUSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQzs7QUFFdkMsQ0FBQSxRQUFRLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7QUFDM0IsQ0FBQSxVQUFVLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMxQixDQUFBLFVBQVUsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEMsQ0FBQSxTQUFTOztBQUVULENBQUEsUUFBUSxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ3ZFLENBQUEsVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQy9ELENBQUEsVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQy9ELENBQUEsVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7O0FBRWhFLENBQUEsUUFBUSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDOztBQUVoRCxDQUFBLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDbEMsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxLQUFLLENBQUMsQ0FBQztBQUNQLENBQUEsR0FBRztBQUNILENBQUEsQ0FBQyxDQUFDLENBQUM7O0FBRUgsQ0FBTyxJQUFJLFlBQVksR0FBRyxVQUFVLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQzNELENBQUEsRUFBRSxPQUFPLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQSxDQUFDLENBQUM7O0NDMURLLElBQUksYUFBYSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7QUFDOUMsQ0FBQSxFQUFFLE9BQU8sRUFBRTtBQUNYLENBQUEsSUFBSSxJQUFJLEVBQUUsSUFBSTtBQUNkLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsVUFBVSxFQUFFLFVBQVUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDL0MsQ0FBQSxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN2RSxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFdBQVcsRUFBRSxZQUFZO0FBQzNCLENBQUEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlDLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsa0JBQWtCLEVBQUUsWUFBWTtBQUNsQyxDQUFBLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDckIsQ0FBQSxNQUFNLG9CQUFvQixFQUFFLFVBQVUsS0FBSyxFQUFFO0FBQzdDLENBQUEsUUFBUSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ2xDLENBQUEsUUFBUSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUN2QyxDQUFBLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzs7QUFFNUIsQ0FBQSxRQUFRLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7QUFFeEIsQ0FBQSxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0FBQ2hELENBQUEsUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRCxDQUFBLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDaEQsQ0FBQSxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVoRCxDQUFBLFFBQVEsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDOztBQUV4QixDQUFBLFFBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDckMsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxLQUFLLENBQUMsQ0FBQzs7QUFFUCxDQUFBLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDbEIsQ0FBQSxNQUFNLG9CQUFvQixFQUFFLFVBQVUsS0FBSyxFQUFFO0FBQzdDLENBQUEsUUFBUSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ2xDLENBQUEsUUFBUSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQzs7QUFFdkMsQ0FBQSxRQUFRLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7QUFDM0IsQ0FBQSxVQUFVLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMxQixDQUFBLFVBQVUsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEMsQ0FBQSxTQUFTOztBQUVULENBQUEsUUFBUSxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUM1RCxDQUFBLFVBQVUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDcEQsQ0FBQSxVQUFVLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ3BELENBQUEsVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDOztBQUVyRCxDQUFBLFFBQVEsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQzs7QUFFaEQsQ0FBQSxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLENBQUEsT0FBTztBQUNQLENBQUEsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFBLEdBQUc7QUFDSCxDQUFBLENBQUMsQ0FBQyxDQUFDOztBQUVILENBQU8sSUFBSSxhQUFhLEdBQUcsVUFBVSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUM1RCxDQUFBLEVBQUUsT0FBTyxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2xELENBQUEsQ0FBQyxDQUFDOztDQ3pESyxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDOztBQUV2QyxDQUFBLEVBQUUsT0FBTyxFQUFFO0FBQ1gsQ0FBQSxJQUFJLFdBQVcsRUFBRSxDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUM7QUFDNUcsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxVQUFVLEVBQUUsVUFBVSxVQUFVLEVBQUUsT0FBTyxFQUFFO0FBQzdDLENBQUEsSUFBSSxJQUFJLEdBQUcsQ0FBQztBQUNaLENBQUEsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoRSxDQUFBLElBQUksSUFBSSxPQUFPLEVBQUU7QUFDakIsQ0FBQSxNQUFNLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNwQyxDQUFBLEtBQUs7QUFDTCxDQUFBLElBQUksSUFBSSxVQUFVLEVBQUU7QUFDcEIsQ0FBQSxNQUFNLElBQUksVUFBVSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7QUFDekMsQ0FBQSxRQUFRLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO0FBQzVDLENBQUEsUUFBUSxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssVUFBVSxDQUFDLEVBQUU7QUFDekcsQ0FBQTtBQUNBLENBQUEsVUFBVSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4QyxDQUFBLFVBQVUsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7QUFDOUIsQ0FBQSxTQUFTLE1BQU07QUFDZixDQUFBLFVBQVUsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxHQUFHLFFBQVEsQ0FBQztBQUN2RCxDQUFBLFVBQVUsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQzNGLENBQUEsU0FBUztBQUNULENBQUEsUUFBUSxJQUFJLFVBQVUsQ0FBQyxTQUFTLEVBQUU7QUFDbEMsQ0FBQSxVQUFVLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxHQUFHLFVBQVUsQ0FBQyxXQUFXLEdBQUcsVUFBVSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUM7QUFDL0YsQ0FBQSxTQUFTO0FBQ1QsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBLFFBQVEsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDekIsQ0FBQTtBQUNBLENBQUEsUUFBUSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3ZELENBQUEsT0FBTyxNQUFNO0FBQ2IsQ0FBQSxRQUFRLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUMzQixDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUs7QUFDTCxDQUFBLEdBQUc7O0FBRUgsQ0FBQTtBQUNBLENBQUEsRUFBRSxRQUFRLEVBQUUsVUFBVSxHQUFHLEVBQUU7QUFDM0IsQ0FBQSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDZCxDQUFBLE1BQU0sT0FBTyxFQUFFLENBQUM7QUFDaEIsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDO0FBQ2IsQ0FBQSxJQUFJLElBQUk7QUFDUixDQUFBO0FBQ0EsQ0FBQSxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN6QyxDQUFBLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzNDLENBQUEsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUMxRSxDQUFBLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQy9DLENBQUEsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFO0FBQ2pCLENBQUEsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLENBQUEsS0FBSztBQUNMLENBQUEsSUFBSSxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFdBQVcsRUFBRSxZQUFZO0FBQzNCLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssYUFBYSxFQUFFO0FBQ25ILENBQUEsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDakMsQ0FBQSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUUsQ0FBQSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0UsQ0FBQSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0UsQ0FBQSxLQUFLLE1BQU07QUFDWCxDQUFBLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ2xDLENBQUEsS0FBSztBQUNMLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO0FBQ2hDLENBQUEsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkUsQ0FBQSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6RSxDQUFBLEtBQUssTUFBTTtBQUNYLENBQUEsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDbkMsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxLQUFLLGVBQWUsRUFBRTtBQUNwRCxDQUFBLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUN6RSxDQUFBLEtBQUs7QUFDTCxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFdBQVcsRUFBRSxVQUFVLE9BQU8sRUFBRTtBQUNsQyxDQUFBLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0MsQ0FBQSxJQUFJLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztBQUN2QixDQUFBLElBQUksSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO0FBQ3hCLENBQUEsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0MsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxJQUFJLElBQUksT0FBTyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7QUFDOUIsQ0FBQSxJQUFJLElBQUksT0FBTyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUM7O0FBRS9CLENBQUEsSUFBSSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7QUFDekIsQ0FBQSxNQUFNLE9BQU8sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsRCxDQUFBLEtBQUs7QUFDTCxDQUFBLElBQUksSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO0FBQ3pCLENBQUEsTUFBTSxPQUFPLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbEQsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3RCLENBQUEsTUFBTSxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7QUFDNUIsQ0FBQSxNQUFNLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7QUFDL0IsQ0FBQSxNQUFNLFVBQVUsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7QUFDcEMsQ0FBQSxLQUFLLENBQUMsQ0FBQztBQUNQLENBQUEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDakQsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsUUFBUSxFQUFFLFVBQVUsSUFBSSxFQUFFO0FBQzVCLENBQUE7QUFDQSxDQUFBLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUM1QyxDQUFBLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtBQUNmLENBQUEsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzdDLENBQUEsS0FBSztBQUNMLENBQUEsSUFBSSxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFlBQVksRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRTtBQUNyRSxDQUFBLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7QUFDL0QsQ0FBQSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO0FBQzFCLENBQUEsTUFBTSxJQUFJLGVBQWUsQ0FBQyxRQUFRLEVBQUU7QUFDcEMsQ0FBQSxRQUFRLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM3RSxDQUFBLFFBQVEsSUFBSSxjQUFjLEVBQUU7QUFDNUIsQ0FBQSxVQUFVLElBQUksR0FBRyxjQUFjLENBQUM7QUFDaEMsQ0FBQSxTQUFTO0FBQ1QsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxNQUFNLElBQUksZUFBZSxDQUFDLFNBQVMsRUFBRTtBQUNyQyxDQUFBLFFBQVEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3RFLENBQUEsUUFBUSxJQUFJLEtBQUssRUFBRTtBQUNuQixDQUFBLFVBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxRCxDQUFBLFVBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1RCxDQUFBLFNBQVM7QUFDVCxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQzdDLENBQUEsTUFBTSxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDNUUsQ0FBQSxNQUFNLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDNUMsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVqQyxDQUFBLElBQUksUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7QUFDbEMsQ0FBQSxNQUFNLEtBQUssZUFBZTtBQUMxQixDQUFBLFFBQVEsT0FBTyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDL0UsQ0FBQSxNQUFNLEtBQUssZ0JBQWdCO0FBQzNCLENBQUEsUUFBUSxPQUFPLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNoRixDQUFBLE1BQU0sS0FBSyxjQUFjO0FBQ3pCLENBQUEsUUFBUSxPQUFPLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUM5RSxDQUFBLE1BQU0sS0FBSyxVQUFVO0FBQ3JCLENBQUEsUUFBUSxPQUFPLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUMxRSxDQUFBLEtBQUs7QUFDTCxDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUNyQyxDQUFBLElBQUksT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDdkUsQ0FBQSxHQUFHO0FBQ0gsQ0FBQSxDQUFDLENBQUMsQ0FBQzs7QUFFSCxDQUFPLFNBQVMsV0FBVyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUU7QUFDbEQsQ0FBQSxFQUFFLE9BQU8sSUFBSSxXQUFXLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzlDLENBQUEsQ0FBQzs7Q0N6Sk0sSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUN0QyxDQUFBLEVBQUUsT0FBTyxFQUFFO0FBQ1gsQ0FBQTtBQUNBLENBQUEsSUFBSSxTQUFTLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQztBQUNuRyxDQUFBLEdBQUc7QUFDSCxDQUFBLEVBQUUsVUFBVSxFQUFFLFVBQVUsVUFBVSxFQUFFLE9BQU8sRUFBRTtBQUM3QyxDQUFBLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDaEUsQ0FBQSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUN2QixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFdBQVcsRUFBRSxZQUFZO0FBQzNCLENBQUE7QUFDQSxDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0FBQ2xDLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7QUFDcEMsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztBQUM5QixDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDOztBQUU1QixDQUFBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDM0IsQ0FBQSxNQUFNLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUMxQixDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7QUFDaEMsQ0FBQSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRSxDQUFBLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3JFLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3hDLENBQUEsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRXBFLENBQUEsTUFBTSxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRTFCLENBQUEsTUFBTSxRQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztBQUNwQyxDQUFBLFFBQVEsS0FBSyxhQUFhO0FBQzFCLENBQUEsVUFBVSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDOUIsQ0FBQSxVQUFVLE1BQU07QUFDaEIsQ0FBQSxRQUFRLEtBQUssWUFBWTtBQUN6QixDQUFBLFVBQVUsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzlCLENBQUEsVUFBVSxNQUFNO0FBQ2hCLENBQUEsUUFBUSxLQUFLLGdCQUFnQjtBQUM3QixDQUFBLFVBQVUsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDcEMsQ0FBQSxVQUFVLE1BQU07QUFDaEIsQ0FBQSxRQUFRLEtBQUssbUJBQW1CO0FBQ2hDLENBQUEsVUFBVSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzFDLENBQUEsVUFBVSxNQUFNO0FBQ2hCLENBQUEsT0FBTzs7QUFFUCxDQUFBO0FBQ0EsQ0FBQSxNQUFNLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDakMsQ0FBQSxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3BELENBQUEsVUFBVSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDL0MsQ0FBQSxTQUFTOztBQUVULENBQUEsUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RELENBQUEsT0FBTztBQUNQLENBQUEsS0FBSztBQUNMLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsS0FBSyxFQUFFLFVBQVUsT0FBTyxFQUFFLGVBQWUsRUFBRTtBQUM3QyxDQUFBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksZUFBZSxFQUFFO0FBQzdDLENBQUEsTUFBTSxJQUFJLGVBQWUsQ0FBQyxRQUFRLEVBQUU7QUFDcEMsQ0FBQSxRQUFRLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDOUYsQ0FBQSxRQUFRLElBQUksY0FBYyxFQUFFO0FBQzVCLENBQUEsVUFBVSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7QUFDL0MsQ0FBQSxTQUFTO0FBQ1QsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxNQUFNLElBQUksZUFBZSxDQUFDLFNBQVMsRUFBRTtBQUNyQyxDQUFBLFFBQVEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3RFLENBQUEsUUFBUSxJQUFJLEtBQUssRUFBRTtBQUNuQixDQUFBLFVBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0RCxDQUFBLFVBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4RCxDQUFBLFNBQVM7QUFDVCxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUs7QUFDTCxDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUEsR0FBRztBQUNILENBQUEsQ0FBQyxDQUFDLENBQUM7O0FBRUgsQ0FBTyxTQUFTLFVBQVUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFO0FBQ2pELENBQUEsRUFBRSxPQUFPLElBQUksVUFBVSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM3QyxDQUFBLENBQUM7O0NDOUVNLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDekMsQ0FBQSxFQUFFLE9BQU8sRUFBRTtBQUNYLENBQUE7QUFDQSxDQUFBLElBQUksWUFBWSxFQUFFLENBQUMsY0FBYyxDQUFDO0FBQ2xDLENBQUEsR0FBRztBQUNILENBQUEsRUFBRSxVQUFVLEVBQUUsVUFBVSxVQUFVLEVBQUUsT0FBTyxFQUFFO0FBQzdDLENBQUEsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoRSxDQUFBLElBQUksSUFBSSxVQUFVLEVBQUU7QUFDcEIsQ0FBQSxNQUFNLElBQUksVUFBVSxDQUFDLE9BQU8sSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxhQUFhLEVBQUU7QUFDNUUsQ0FBQSxRQUFRLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDekMsQ0FBQSxPQUFPLE1BQU07QUFDYixDQUFBLFFBQVEsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUMzRSxDQUFBLE9BQU87QUFDUCxDQUFBLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ3pCLENBQUEsS0FBSztBQUNMLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsV0FBVyxFQUFFLFlBQVk7QUFDM0IsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUMxQixDQUFBLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDekMsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ3BDLENBQUEsT0FBTyxNQUFNO0FBQ2IsQ0FBQTtBQUNBLENBQUEsUUFBUSxLQUFLLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDaEQsQ0FBQSxVQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNoRSxDQUFBLFNBQVM7QUFDVCxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUs7O0FBRUwsQ0FBQTtBQUNBLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDMUIsQ0FBQSxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO0FBQ2hDLENBQUE7QUFDQSxDQUFBLFVBQVUsYUFBYSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDM0UsQ0FBQSxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQyxDQUFBLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pFLENBQUEsUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0UsQ0FBQSxPQUFPLE1BQU07QUFDYixDQUFBLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0FBQ2xDLENBQUEsUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDckMsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxLQUFLLEVBQUUsVUFBVSxPQUFPLEVBQUUsZUFBZSxFQUFFO0FBQzdDLENBQUEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxlQUFlLElBQUksZUFBZSxDQUFDLFNBQVMsRUFBRTtBQUMxRSxDQUFBLE1BQU0sSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3BFLENBQUEsTUFBTSxJQUFJLEtBQUssRUFBRTtBQUNqQixDQUFBLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4RCxDQUFBLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxRCxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUs7QUFDTCxDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUEsR0FBRztBQUNILENBQUEsQ0FBQyxDQUFDLENBQUM7O0FBRUgsQ0FBTyxTQUFTLGFBQWEsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFO0FBQ3BELENBQUEsRUFBRSxPQUFPLElBQUksYUFBYSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoRCxDQUFBLENBQUM7O0NDekRNLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ3JDLENBQUEsRUFBRSxPQUFPLEVBQUU7QUFDWCxDQUFBLElBQUksbUJBQW1CLEVBQUUsS0FBSztBQUM5QixDQUFBLElBQUksU0FBUyxFQUFFLElBQUk7QUFDbkIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxVQUFVLEVBQUUsVUFBVSxZQUFZLEVBQUUsT0FBTyxFQUFFO0FBQy9DLENBQUEsSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztBQUN0QyxDQUFBLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDL0IsQ0FBQSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLENBQUEsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNyRixDQUFBLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3JDLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxlQUFlLEVBQUU7QUFDcEQsQ0FBQSxJQUFJLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNyQixDQUFBLElBQUksSUFBSSxlQUFlLEVBQUU7QUFDekIsQ0FBQSxNQUFNLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3ZELENBQUEsUUFBUSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5RCxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUs7QUFDTCxDQUFBLElBQUksT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxvQkFBb0IsRUFBRSxZQUFZO0FBQ3BDLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFO0FBQzFDLENBQUEsTUFBTSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUM5RSxDQUFBLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQzVDLENBQUEsS0FBSztBQUNMLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsVUFBVSxFQUFFLFVBQVUsVUFBVSxFQUFFO0FBQ3BDLENBQUEsSUFBSSxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQ3hFLENBQUEsTUFBTSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUNoQyxDQUFBLE1BQU0sT0FBTyxXQUFXLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuRCxDQUFBLEtBQUs7QUFDTCxDQUFBLElBQUksSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUN2QyxDQUFBLE1BQU0sT0FBTyxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsRCxDQUFBLEtBQUs7QUFDTCxDQUFBLElBQUksSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUN2QyxDQUFBLE1BQU0sT0FBTyxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyRCxDQUFBLEtBQUs7QUFDTCxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFVBQVUsRUFBRSxZQUFZO0FBQzFCLENBQUE7QUFDQSxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLG1CQUFtQixFQUFFLFVBQVUsS0FBSyxFQUFFO0FBQ3hDLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7QUFDNUIsQ0FBQSxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEUsQ0FBQSxLQUFLLE1BQU07QUFDWCxDQUFBLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMxRCxDQUFBLE1BQU0sS0FBSyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUNqRCxDQUFBLEtBQUs7QUFDTCxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFlBQVksRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDM0MsQ0FBQSxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkMsQ0FBQSxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxZQUFZLEVBQUU7QUFDakMsQ0FBQTtBQUNBLENBQUEsTUFBTSxPQUFPLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BGLENBQUEsS0FBSztBQUNMLENBQUE7QUFDQSxDQUFBLElBQUksT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0QsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxLQUFLLEVBQUUsVUFBVSxPQUFPLEVBQUU7QUFDNUIsQ0FBQSxJQUFJLElBQUksVUFBVSxDQUFDO0FBQ25CLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7QUFDdkMsQ0FBQSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzFELENBQUEsS0FBSztBQUNMLENBQUE7QUFDQSxDQUFBLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2QyxDQUFBLElBQUksSUFBSSxHQUFHLEVBQUU7QUFDYixDQUFBLE1BQU0sT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3JGLENBQUEsS0FBSyxNQUFNO0FBQ1gsQ0FBQTtBQUNBLENBQUEsTUFBTSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4RSxDQUFBLEtBQUs7QUFDTCxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFdBQVcsRUFBRSxVQUFVLE1BQU0sRUFBRSxVQUFVLEVBQUU7QUFDN0MsQ0FBQSxJQUFJLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUMxQixDQUFBLElBQUksSUFBSSxJQUFJLENBQUM7QUFDYixDQUFBO0FBQ0EsQ0FBQSxJQUFJLEtBQUssSUFBSSxJQUFJLE1BQU0sRUFBRTtBQUN6QixDQUFBLE1BQU0sSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3ZDLENBQUEsUUFBUSxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFDLENBQUEsT0FBTztBQUNQLENBQUEsS0FBSztBQUNMLENBQUE7QUFDQSxDQUFBLElBQUksSUFBSSxVQUFVLEVBQUU7QUFDcEIsQ0FBQSxNQUFNLEtBQUssSUFBSSxJQUFJLFVBQVUsRUFBRTtBQUMvQixDQUFBLFFBQVEsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzdDLENBQUEsVUFBVSxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hELENBQUEsU0FBUztBQUNULENBQUEsT0FBTztBQUNQLENBQUEsS0FBSztBQUNMLENBQUEsSUFBSSxPQUFPLFlBQVksQ0FBQztBQUN4QixDQUFBLEdBQUc7QUFDSCxDQUFBLENBQUMsQ0FBQyxDQUFDOztDQ3pHSSxJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO0FBQzVDLENBQUEsRUFBRSxVQUFVLEVBQUUsVUFBVSxZQUFZLEVBQUUsT0FBTyxFQUFFO0FBQy9DLENBQUEsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNwRSxDQUFBLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ3pCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsYUFBYSxFQUFFLFlBQVk7QUFDN0IsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7QUFDbkMsQ0FBQSxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLENBQUEsS0FBSztBQUNMLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsVUFBVSxFQUFFLFlBQVk7QUFDMUIsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QixDQUFBLEdBQUc7QUFDSCxDQUFBLENBQUMsQ0FBQyxDQUFDOztBQUVILENBQU8sU0FBUyxjQUFjLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRTtBQUN2RCxDQUFBLEVBQUUsT0FBTyxJQUFJLGNBQWMsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDbkQsQ0FBQSxDQUFDOztDQ25CTSxJQUFJLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFDakQsQ0FBQSxFQUFFLFVBQVUsRUFBRSxVQUFVLFlBQVksRUFBRSxPQUFPLEVBQUU7QUFDL0MsQ0FBQSxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3BFLENBQUEsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO0FBQzNDLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsS0FBSyxzQkFBc0IsRUFBRTtBQUNqSCxDQUFBLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUM7QUFDdkUsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUMxQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLGNBQWMsRUFBRSxZQUFZO0FBQzlCLENBQUEsSUFBSSxJQUFJLE1BQU0sQ0FBQztBQUNmLENBQUEsSUFBSSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQzs7QUFFekQsQ0FBQSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDOztBQUV2QixDQUFBO0FBQ0EsQ0FBQSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN0RCxDQUFBLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLEVBQUU7QUFDdkYsQ0FBQSxRQUFRLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUMxRSxDQUFBLE9BQU8sTUFBTTtBQUNiLENBQUEsUUFBUSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEQsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxNQUFNLE1BQU0sQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztBQUNoRCxDQUFBLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDakMsQ0FBQSxLQUFLO0FBQ0wsQ0FBQTtBQUNBLENBQUEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDdkMsQ0FBQSxNQUFNLE9BQU8sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNwQyxDQUFBLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0FBQ2hDLENBQUEsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ2pFLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsVUFBVSxFQUFFLFVBQVUsT0FBTyxFQUFFO0FBQ2pDLENBQUEsSUFBSSxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QyxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7QUFDbEMsQ0FBQSxNQUFNLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDbkUsQ0FBQSxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxLQUFLLENBQUMsRUFBRTtBQUNoRCxDQUFBLFFBQVEsR0FBRyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUM7QUFDOUIsQ0FBQSxPQUFPLE1BQU07QUFDYixDQUFBLFFBQVEsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0FBQ25DLENBQUEsT0FBTztBQUNQLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUM5QixDQUFBLE1BQU0sT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0FBQ2pDLENBQUEsS0FBSztBQUNMLENBQUEsSUFBSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLENBQUEsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3hELENBQUEsTUFBTSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtBQUN0QyxDQUFBLFFBQVEsTUFBTTtBQUNkLENBQUEsT0FBTztBQUNQLENBQUEsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQyxDQUFBLEtBQUs7QUFDTCxDQUFBLElBQUksT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQSxHQUFHO0FBQ0gsQ0FBQSxDQUFDLENBQUMsQ0FBQzs7QUFFSCxDQUFPLFNBQVMsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRTtBQUM1RCxDQUFBLEVBQUUsT0FBTyxJQUFJLG1CQUFtQixDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN4RCxDQUFBLENBQUM7O0NDN0RNLElBQUksbUJBQW1CLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUNqRCxDQUFBLEVBQUUsVUFBVSxFQUFFLFVBQVUsWUFBWSxFQUFFLE9BQU8sRUFBRTtBQUMvQyxDQUFBLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDcEUsQ0FBQSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7QUFDNUMsQ0FBQSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUMxQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLGNBQWMsRUFBRSxZQUFZO0FBQzlCLENBQUEsSUFBSSxJQUFJLE1BQU0sQ0FBQztBQUNmLENBQUEsSUFBSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDOztBQUV0RCxDQUFBO0FBQ0EsQ0FBQSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNsRCxDQUFBLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2xELENBQUEsTUFBTSxNQUFNLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDcEMsQ0FBQSxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pDLENBQUEsS0FBSztBQUNMLENBQUEsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztBQUNoQyxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFVBQVUsRUFBRSxVQUFVLE9BQU8sRUFBRTtBQUNqQyxDQUFBLElBQUksSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUMsQ0FBQTtBQUNBLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO0FBQ3hFLENBQUEsTUFBTSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0QsQ0FBQSxNQUFNLElBQUksSUFBSSxFQUFFO0FBQ2hCLENBQUEsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0FBQ3hELENBQUEsUUFBUSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDakUsQ0FBQSxRQUFRLElBQUksSUFBSSxFQUFFO0FBQ2xCLENBQUEsVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0FBQzFELENBQUEsU0FBUztBQUNULENBQUEsT0FBTztBQUNQLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztBQUNyQyxDQUFBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN4RCxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFDdkMsQ0FBQSxRQUFRLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLENBQUEsT0FBTztBQUNQLENBQUE7QUFDQSxDQUFBLEtBQUs7QUFDTCxDQUFBLElBQUksT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQSxHQUFHO0FBQ0gsQ0FBQSxDQUFDLENBQUMsQ0FBQzs7QUFFSCxDQUFPLFNBQVMsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRTtBQUM1RCxDQUFBLEVBQUUsT0FBTyxJQUFJLG1CQUFtQixDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN4RCxDQUFBLENBQUM7O0NDOUNELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFlBQVk7QUFDMUMsQ0FBQSxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUU7QUFDbkMsQ0FBQSxJQUFJLE9BQU87QUFDWCxDQUFBLEdBQUc7QUFDSCxDQUFBLEVBQUUsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvQyxDQUFBLEVBQUUsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMzRCxDQUFBLEVBQUUsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNyRCxDQUFBLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFekMsQ0FBQSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLEVBQUU7QUFDOUIsQ0FBQSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQzdDLENBQUEsTUFBTSxJQUFJLEtBQUssRUFBRTtBQUNqQixDQUFBLFFBQVEsT0FBTyxDQUFDLElBQUksQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO0FBQ2xFLENBQUEsUUFBUSxPQUFPO0FBQ2YsQ0FBQSxPQUFPLENBQUMsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRTtBQUM5QyxDQUFBLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtBQUN0QyxDQUFBO0FBQ0EsQ0FBQSxVQUFVLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7QUFDMUQsQ0FBQSxTQUFTOztBQUVULENBQUE7QUFDQSxDQUFBLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxhQUFhLElBQUksUUFBUSxDQUFDLFlBQVksS0FBSyxtQkFBbUIsRUFBRTtBQUNsRyxDQUFBLFVBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO0FBQzNDLENBQUEsU0FBUzs7QUFFVCxDQUFBLFFBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNyQyxDQUFBLFFBQVEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLENBQUEsUUFBUSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLENBQUEsT0FBTztBQUNQLENBQUEsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2IsQ0FBQSxHQUFHLENBQUM7O0FBRUosQ0FBQSxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxHQUFHLEVBQUU7QUFDakMsQ0FBQSxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQzFCLENBQUEsTUFBTSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ3JELENBQUEsTUFBTSxLQUFLLElBQUksQ0FBQyxJQUFJLFdBQVcsRUFBRTtBQUNqQyxDQUFBLFFBQVEsR0FBRyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QyxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUs7QUFDTCxDQUFBLEdBQUcsQ0FBQzs7QUFFSixDQUFBLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxZQUFZO0FBQ2pDLENBQUEsSUFBSSxjQUFjLEVBQUUsQ0FBQztBQUNyQixDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQzFCLENBQUEsTUFBTSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ3JELENBQUEsTUFBTSxLQUFLLElBQUksQ0FBQyxJQUFJLFdBQVcsRUFBRTtBQUNqQyxDQUFBLFFBQVEsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ3JDLENBQUEsT0FBTztBQUNQLENBQUEsS0FBSztBQUNMLENBQUEsR0FBRyxDQUFDOztBQUVKLENBQUEsRUFBRSxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsR0FBRyxFQUFFO0FBQ3ZDLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDMUIsQ0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLENBQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3RDLENBQUEsS0FBSztBQUNMLENBQUEsR0FBRyxDQUFDOztBQUVKLENBQUEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsWUFBWTtBQUN2QyxDQUFBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDM0IsQ0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3JDLENBQUE7QUFDQSxDQUFBLE1BQU0sSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7O0FBRS9CLENBQUEsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDdkIsQ0FBQSxRQUFRLElBQUksYUFBYSxHQUFHLFVBQVUsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUN0RCxDQUFBLFVBQVUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0UsQ0FBQSxTQUFTLENBQUM7QUFDVixDQUFBLFFBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNsRixDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUs7QUFDTCxDQUFBLEdBQUcsQ0FBQzs7QUFFSixDQUFBLEVBQUUsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLE9BQU8sRUFBRTtBQUMzQyxDQUFBLElBQUksSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFbEUsQ0FBQTtBQUNBLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtBQUN0QyxDQUFBLE1BQU0sSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDM0UsQ0FBQSxNQUFNLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUN2RCxDQUFBLFFBQVEsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7O0FBRWpDLENBQUEsUUFBUSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQzlDLENBQUE7QUFDQSxDQUFBLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUU7QUFDN0MsQ0FBQSxVQUFVLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztBQUUvRCxDQUFBLFVBQVUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDOUMsQ0FBQSxVQUFVLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ2hELENBQUEsU0FBUzs7QUFFVCxDQUFBLFFBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUN4QyxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUs7QUFDTCxDQUFBLElBQUksT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQSxHQUFHLENBQUM7O0FBRUosQ0FBQSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLFdBQVcsRUFBRTtBQUNuRCxDQUFBLElBQUksSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLENBQUEsSUFBSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQzFCLENBQUEsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNCLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLENBQUEsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDZCxDQUFBLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2QsQ0FBQSxJQUFJLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDMUIsQ0FBQSxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ1gsQ0FBQSxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ1gsQ0FBQSxJQUFJLElBQUksQ0FBQyxDQUFDOztBQUVWLENBQUEsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRTtBQUNyRCxDQUFBLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQSxNQUFNLFNBQVMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLENBQUEsTUFBTSxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQyxDQUFBLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QyxDQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvQixDQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvQixDQUFBLEtBQUs7QUFDTCxDQUFBLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDdEIsQ0FBQSxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMxQixDQUFBLEdBQUcsQ0FBQzs7QUFFSixDQUFBLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLE9BQU8sRUFBRSxRQUFRLEVBQUU7QUFDbkQsQ0FBQSxJQUFJLE9BQU87QUFDWCxDQUFBLE1BQU0sSUFBSSxFQUFFLFNBQVM7QUFDckIsQ0FBQSxNQUFNLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVTtBQUNwQyxDQUFBLE1BQU0sRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO0FBQ3BCLENBQUEsTUFBTSxRQUFRLEVBQUU7QUFDaEIsQ0FBQSxRQUFRLElBQUksRUFBRSxPQUFPO0FBQ3JCLENBQUEsUUFBUSxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9DLENBQUEsT0FBTztBQUNQLENBQUEsS0FBSyxDQUFDO0FBQ04sQ0FBQSxHQUFHLENBQUM7O0FBRUosQ0FBQSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxVQUFVLFlBQVksRUFBRSxRQUFRLEVBQUU7QUFDeEUsQ0FBQSxJQUFJLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUM7QUFDekMsQ0FBQSxJQUFJLElBQUksWUFBWSxLQUFLLHFCQUFxQixFQUFFO0FBQ2hELENBQUEsTUFBTSxJQUFJLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtBQUN6QyxDQUFBLFFBQVEsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztBQUM1QyxDQUFBLE9BQU87QUFDUCxDQUFBO0FBQ0EsQ0FBQSxNQUFNLElBQUksUUFBUSxDQUFDLGVBQWUsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRTtBQUN2RSxDQUFBLFFBQVEsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDckQsQ0FBQSxRQUFRLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsRUFBRTtBQUN2RSxDQUFBLFVBQVUsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztBQUM5QyxDQUFBLFNBQVM7QUFDVCxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUs7QUFDTCxDQUFBLEdBQUcsQ0FBQzs7QUFFSixDQUFBLEVBQUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLFdBQVcsRUFBRTtBQUM5QyxDQUFBLElBQUksSUFBSSxJQUFJLENBQUM7QUFDYixDQUFBLElBQUksSUFBSSxZQUFZLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7O0FBRXhELENBQUEsSUFBSSxJQUFJLE9BQU8sR0FBRztBQUNsQixDQUFBLE1BQU0sR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztBQUMzQixDQUFBLEtBQUssQ0FBQzs7QUFFTixDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtBQUM1QixDQUFBLE1BQU0sT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUN6QyxDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDM0IsQ0FBQSxNQUFNLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDdkMsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFO0FBQzlDLENBQUEsTUFBTSxPQUFPLENBQUMsaUJBQWlCLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7QUFDdkUsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO0FBQzVCLENBQUEsTUFBTSxPQUFPLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDcEQsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxRQUFRLFlBQVksQ0FBQyxJQUFJO0FBQzdCLENBQUEsTUFBTSxLQUFLLGFBQWE7QUFDeEIsQ0FBQSxRQUFRLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ2xGLENBQUEsUUFBUSxJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtBQUMxQyxDQUFBLFVBQVUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDbkMsQ0FBQSxVQUFVLElBQUksS0FBSyxHQUFHLG1CQUFtQixDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRSxDQUFBLFVBQVUsS0FBSyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN0RCxDQUFBLFVBQVUsT0FBTyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztBQUM3QyxDQUFBLFNBQVM7QUFDVCxDQUFBLFFBQVEsSUFBSSxHQUFHLG1CQUFtQixDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMxRCxDQUFBLFFBQVEsTUFBTTtBQUNkLENBQUEsTUFBTSxLQUFLLGFBQWE7QUFDeEIsQ0FBQSxRQUFRLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDMUQsQ0FBQSxRQUFRLE1BQU07QUFDZCxDQUFBLE1BQU07QUFDTixDQUFBLFFBQVEsSUFBSSxHQUFHLGNBQWMsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDckQsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxDQUFBLEdBQUcsQ0FBQztBQUNKLENBQUEsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==