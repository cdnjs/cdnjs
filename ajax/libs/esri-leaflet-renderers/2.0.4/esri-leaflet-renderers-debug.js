/* esri-leaflet-renderers - v2.0.4 - Wed Aug 17 2016 11:51:21 GMT-0700 (PDT)
 * Copyright (c) 2016 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}, global.L.esri.Renderers = global.L.esri.Renderers || {}),global.L));
}(this, function (exports,L) { 'use strict';

	L = 'default' in L ? L['default'] : L;

	var version = "2.0.4";

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
	    var url;
	    Symbol.prototype.initialize.call(this, symbolJson, options);
	    if (options) {
	      this.serviceUrl = options.url;
	    }
	    if (symbolJson) {
	      if (symbolJson.type === 'esriPMS') {
	        var imageUrl = this._symbolJson.url;
	        if (imageUrl && imageUrl.substr(0, 7) === 'http://' || imageUrl.substr(0, 8) === 'https://') {
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
	        return;
	      } if (response && response.drawingInfo) {
	        if (this.options.drawingInfo) {
	          // allow L.esri.webmap (and others) to override service symbology with info provided in layer constructor
	          response.drawingInfo = this.options.drawingInfo;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LXJlbmRlcmVycy1kZWJ1Zy5qcyIsInNvdXJjZXMiOlsiLi4vcGFja2FnZS5qc29uIiwiLi4vc3JjL1N5bWJvbHMvU3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xlYWZsZXQtc2hhcGUtbWFya2Vycy9zcmMvU2hhcGVNYXJrZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGVhZmxldC1zaGFwZS1tYXJrZXJzL3NyYy9Dcm9zc01hcmtlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9sZWFmbGV0LXNoYXBlLW1hcmtlcnMvc3JjL1hNYXJrZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGVhZmxldC1zaGFwZS1tYXJrZXJzL3NyYy9TcXVhcmVNYXJrZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGVhZmxldC1zaGFwZS1tYXJrZXJzL3NyYy9EaWFtb25kTWFya2VyLmpzIiwiLi4vc3JjL1N5bWJvbHMvUG9pbnRTeW1ib2wuanMiLCIuLi9zcmMvU3ltYm9scy9MaW5lU3ltYm9sLmpzIiwiLi4vc3JjL1N5bWJvbHMvUG9seWdvblN5bWJvbC5qcyIsIi4uL3NyYy9SZW5kZXJlcnMvUmVuZGVyZXIuanMiLCIuLi9zcmMvUmVuZGVyZXJzL1NpbXBsZVJlbmRlcmVyLmpzIiwiLi4vc3JjL1JlbmRlcmVycy9DbGFzc0JyZWFrc1JlbmRlcmVyLmpzIiwiLi4vc3JjL1JlbmRlcmVycy9VbmlxdWVWYWx1ZVJlbmRlcmVyLmpzIiwiLi4vc3JjL0ZlYXR1cmVMYXllckhvb2suanMiXSwic291cmNlc0NvbnRlbnQiOlsie1xuICBcIm5hbWVcIjogXCJlc3JpLWxlYWZsZXQtcmVuZGVyZXJzXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJlc3JpLWxlYWZsZXQgcGx1Z2luIGZvciByZW5kZXJpbmdcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMi4wLjRcIixcbiAgXCJhdXRob3JcIjogXCJSYWNoZWwgTmVobWVyIDxybmVobWVyQGVzcmkuY29tPlwiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2VzcmkvZXNyaS1sZWFmbGV0LXJlbmRlcmVycy9pc3N1ZXNcIlxuICB9LFxuICBcImNvbnRyaWJ1dG9yc1wiOiBbXG4gICAgXCJSYWNoZWwgTmVobWVyIDxybmVobWVyQGVzcmkuY29tPlwiLFxuICAgIFwiSm9obiBHcmF2b2lzIDxqZ3Jhdm9pc0Blc3JpLmNvbT5cIlxuICBdLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgIFwiZXNyaS1sZWFmbGV0XCI6IFwiXjIuMC4wXCIsXG4gICAgIFwibGVhZmxldFwiOiBcIl4xLjAuMC1yYy4zXCIsXG4gICAgIFwibGVhZmxldC1zaGFwZS1tYXJrZXJzXCI6IFwiXjEuMC40XCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYmFiZWxpZnlcIjogXCJeNi4xLjNcIixcbiAgICBcImNoYWlcIjogXCIyLjMuMFwiLFxuICAgIFwiZ2gtcmVsZWFzZVwiOiBcIl4yLjAuMFwiLFxuICAgIFwiaHR0cC1zZXJ2ZXJcIjogXCJeMC44LjVcIixcbiAgICBcImlzcGFydGFcIjogXCJeMy4wLjNcIixcbiAgICBcImlzdGFuYnVsXCI6IFwiXjAuNC4yXCIsXG4gICAgXCJrYXJtYVwiOiBcIl4wLjEyLjI0XCIsXG4gICAgXCJrYXJtYS1jaGFpLXNpbm9uXCI6IFwiXjAuMS4zXCIsXG4gICAgXCJrYXJtYS1jb3ZlcmFnZVwiOiBcIl4wLjUuM1wiLFxuICAgIFwia2FybWEtbW9jaGFcIjogXCJeMC4xLjBcIixcbiAgICBcImthcm1hLW1vY2hhLXJlcG9ydGVyXCI6IFwiXjAuMi41XCIsXG4gICAgXCJrYXJtYS1waGFudG9tanMtbGF1bmNoZXJcIjogXCJeMC4xLjRcIixcbiAgICBcImthcm1hLXNvdXJjZW1hcC1sb2FkZXJcIjogXCJeMC4zLjVcIixcbiAgICBcIm1rZGlycFwiOiBcIl4wLjUuMVwiLFxuICAgIFwibW9jaGFcIjogXCJeMi4zLjRcIixcbiAgICBcInBoYW50b21qc1wiOiBcIl4xLjkuMTdcIixcbiAgICBcInJvbGx1cFwiOiBcIl4wLjI1LjRcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tanNvblwiOiBcIl4yLjAuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1ub2RlLXJlc29sdmVcIjogXCJeMS40LjBcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tdWdsaWZ5XCI6IFwiXjAuMi4wXCIsXG4gICAgXCJzZW1pc3RhbmRhcmRcIjogXCJeNy4wLjVcIixcbiAgICBcInNpbm9uXCI6IFwiXjEuMTEuMVwiLFxuICAgIFwic2lub24tY2hhaVwiOiBcIjIuNy4wXCIsXG4gICAgXCJ1Z2xpZnktanNcIjogXCJeMi40LjIzXCIsXG4gICAgXCJ3YXRjaFwiOiBcIl4wLjE3LjFcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cDovL2VzcmkuZ2l0aHViLmlvL2VzcmktbGVhZmxldFwiLFxuICBcImpzbmV4dDptYWluXCI6IFwic3JjL0VzcmlMZWFmbGV0UmVuZGVyZXJzLmpzXCIsXG4gIFwianNwbVwiOiB7XG4gICAgXCJyZWdpc3RyeVwiOiBcIm5wbVwiLFxuICAgIFwiZm9ybWF0XCI6IFwiZXM2XCIsXG4gICAgXCJtYWluXCI6IFwic3JjL0VzcmlMZWFmbGV0UmVuZGVyZXJzLmpzXCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJhcmNnaXNcIixcbiAgICBcImVzcmlcIixcbiAgICBcImVzcmkgbGVhZmxldFwiLFxuICAgIFwiZ2lzXCIsXG4gICAgXCJsZWFmbGV0IHBsdWdpblwiLFxuICAgIFwibWFwcGluZ1wiLFxuICAgIFwicmVuZGVyZXJzXCIsXG4gICAgXCJzeW1ib2xvZ3lcIlxuICBdLFxuICBcImxpY2Vuc2VcIjogXCJBcGFjaGUtMi4wXCIsXG4gIFwibWFpblwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LXJlbmRlcmVycy1kZWJ1Zy5qc1wiLFxuICBcImJyb3dzZXJcIjogXCJkaXN0L2VzcmktbGVhZmxldC1yZW5kZXJlcnMtZGVidWcuanNcIixcbiAgXCJyZWFkbWVGaWxlbmFtZVwiOiBcIlJFQURNRS5tZFwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0QGdpdGh1Yi5jb206RXNyaS9lc3JpLWxlYWZsZXQtcmVuZGVyZXJzLmdpdFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJwcmVidWlsZFwiOiBcIm1rZGlycCBkaXN0XCIsXG4gICAgXCJidWlsZFwiOiBcInJvbGx1cCAtYyBwcm9maWxlcy9kZWJ1Zy5qcyAmIHJvbGx1cCAtYyBwcm9maWxlcy9wcm9kdWN0aW9uLmpzXCIsXG4gICAgXCJsaW50XCI6IFwic2VtaXN0YW5kYXJkIHNyYy8qKi8qLmpzXCIsXG4gICAgXCJwcmVwdWJsaXNoXCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicHJldGVzdFwiOiBcIm5wbSBydW4gYnVpbGRcIixcbiAgICBcInJlbGVhc2VcIjogXCIuL3NjcmlwdHMvcmVsZWFzZS5zaFwiLFxuICAgIFwic3RhcnRcIjogXCJ3YXRjaCAnbnBtIHJ1biBidWlsZCcgc3JjICYgaHR0cC1zZXJ2ZXIgLXAgNTAwMCAtYy0xIC1vXCIsXG4gICAgXCJ0ZXN0XCI6IFwibnBtIHJ1biBsaW50ICYmIG5wbSBydW4gYnVpbGQgJiYga2FybWEgc3RhcnRcIlxuICB9XG59XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcblxuZXhwb3J0IHZhciBTeW1ib2wgPSBMLkNsYXNzLmV4dGVuZCh7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChzeW1ib2xKc29uLCBvcHRpb25zKSB7XG4gICAgdGhpcy5fc3ltYm9sSnNvbiA9IHN5bWJvbEpzb247XG4gICAgdGhpcy52YWwgPSBudWxsO1xuICAgIHRoaXMuX3N0eWxlcyA9IHt9O1xuICAgIHRoaXMuX2lzRGVmYXVsdCA9IGZhbHNlO1xuICAgIHRoaXMuX2xheWVyVHJhbnNwYXJlbmN5ID0gMTtcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmxheWVyVHJhbnNwYXJlbmN5KSB7XG4gICAgICB0aGlzLl9sYXllclRyYW5zcGFyZW5jeSA9IDEgLSAob3B0aW9ucy5sYXllclRyYW5zcGFyZW5jeSAvIDEwMC4wKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gdGhlIGdlb2pzb24gdmFsdWVzIHJldHVybmVkIGFyZSBpbiBwb2ludHNcbiAgcGl4ZWxWYWx1ZTogZnVuY3Rpb24gKHBvaW50VmFsdWUpIHtcbiAgICByZXR1cm4gcG9pbnRWYWx1ZSAqIDEuMzMzO1xuICB9LFxuXG4gIC8vIGNvbG9yIGlzIGFuIGFycmF5IFtyLGcsYixhXVxuICBjb2xvclZhbHVlOiBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICByZXR1cm4gJ3JnYignICsgY29sb3JbMF0gKyAnLCcgKyBjb2xvclsxXSArICcsJyArIGNvbG9yWzJdICsgJyknO1xuICB9LFxuXG4gIGFscGhhVmFsdWU6IGZ1bmN0aW9uIChjb2xvcikge1xuICAgIHZhciBhbHBoYSA9IGNvbG9yWzNdIC8gMjU1LjA7XG4gICAgcmV0dXJuIGFscGhhICogdGhpcy5fbGF5ZXJUcmFuc3BhcmVuY3k7XG4gIH0sXG5cbiAgZ2V0U2l6ZTogZnVuY3Rpb24gKGZlYXR1cmUsIHNpemVJbmZvKSB7XG4gICAgdmFyIGF0dHIgPSBmZWF0dXJlLnByb3BlcnRpZXM7XG4gICAgdmFyIGZpZWxkID0gc2l6ZUluZm8uZmllbGQ7XG4gICAgdmFyIHNpemUgPSAwO1xuICAgIHZhciBmZWF0dXJlVmFsdWUgPSBudWxsO1xuXG4gICAgaWYgKGZpZWxkKSB7XG4gICAgICBmZWF0dXJlVmFsdWUgPSBhdHRyW2ZpZWxkXTtcbiAgICAgIHZhciBtaW5TaXplID0gc2l6ZUluZm8ubWluU2l6ZTtcbiAgICAgIHZhciBtYXhTaXplID0gc2l6ZUluZm8ubWF4U2l6ZTtcbiAgICAgIHZhciBtaW5EYXRhVmFsdWUgPSBzaXplSW5mby5taW5EYXRhVmFsdWU7XG4gICAgICB2YXIgbWF4RGF0YVZhbHVlID0gc2l6ZUluZm8ubWF4RGF0YVZhbHVlO1xuICAgICAgdmFyIGZlYXR1cmVSYXRpbztcbiAgICAgIHZhciBub3JtRmllbGQgPSBzaXplSW5mby5ub3JtYWxpemF0aW9uRmllbGQ7XG4gICAgICB2YXIgbm9ybVZhbHVlID0gYXR0ciA/IHBhcnNlRmxvYXQoYXR0cltub3JtRmllbGRdKSA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKGZlYXR1cmVWYWx1ZSA9PT0gbnVsbCB8fCAobm9ybUZpZWxkICYmICgoaXNOYU4obm9ybVZhbHVlKSB8fCBub3JtVmFsdWUgPT09IDApKSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4obm9ybVZhbHVlKSkge1xuICAgICAgICBmZWF0dXJlVmFsdWUgLz0gbm9ybVZhbHVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWluU2l6ZSAhPT0gbnVsbCAmJiBtYXhTaXplICE9PSBudWxsICYmIG1pbkRhdGFWYWx1ZSAhPT0gbnVsbCAmJiBtYXhEYXRhVmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKGZlYXR1cmVWYWx1ZSA8PSBtaW5EYXRhVmFsdWUpIHtcbiAgICAgICAgICBzaXplID0gbWluU2l6ZTtcbiAgICAgICAgfSBlbHNlIGlmIChmZWF0dXJlVmFsdWUgPj0gbWF4RGF0YVZhbHVlKSB7XG4gICAgICAgICAgc2l6ZSA9IG1heFNpemU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmVhdHVyZVJhdGlvID0gKGZlYXR1cmVWYWx1ZSAtIG1pbkRhdGFWYWx1ZSkgLyAobWF4RGF0YVZhbHVlIC0gbWluRGF0YVZhbHVlKTtcbiAgICAgICAgICBzaXplID0gbWluU2l6ZSArIChmZWF0dXJlUmF0aW8gKiAobWF4U2l6ZSAtIG1pblNpemUpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2l6ZSA9IGlzTmFOKHNpemUpID8gMCA6IHNpemU7XG4gICAgfVxuICAgIHJldHVybiBzaXplO1xuICB9LFxuXG4gIGdldENvbG9yOiBmdW5jdGlvbiAoZmVhdHVyZSwgY29sb3JJbmZvKSB7XG4gICAgLy8gcmVxdWlyZWQgaW5mb3JtYXRpb24gdG8gZ2V0IGNvbG9yXG4gICAgaWYgKCEoZmVhdHVyZS5wcm9wZXJ0aWVzICYmIGNvbG9ySW5mbyAmJiBjb2xvckluZm8uZmllbGQgJiYgY29sb3JJbmZvLnN0b3BzKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGF0dHIgPSBmZWF0dXJlLnByb3BlcnRpZXM7XG4gICAgdmFyIGZlYXR1cmVWYWx1ZSA9IGF0dHJbY29sb3JJbmZvLmZpZWxkXTtcbiAgICB2YXIgbG93ZXJCb3VuZENvbG9yLCB1cHBlckJvdW5kQ29sb3IsIGxvd2VyQm91bmQsIHVwcGVyQm91bmQ7XG4gICAgdmFyIG5vcm1GaWVsZCA9IGNvbG9ySW5mby5ub3JtYWxpemF0aW9uRmllbGQ7XG4gICAgdmFyIG5vcm1WYWx1ZSA9IGF0dHIgPyBwYXJzZUZsb2F0KGF0dHJbbm9ybUZpZWxkXSkgOiB1bmRlZmluZWQ7XG4gICAgaWYgKGZlYXR1cmVWYWx1ZSA9PT0gbnVsbCB8fCAobm9ybUZpZWxkICYmICgoaXNOYU4obm9ybVZhbHVlKSB8fCBub3JtVmFsdWUgPT09IDApKSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghaXNOYU4obm9ybVZhbHVlKSkge1xuICAgICAgZmVhdHVyZVZhbHVlIC89IG5vcm1WYWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoZmVhdHVyZVZhbHVlIDw9IGNvbG9ySW5mby5zdG9wc1swXS52YWx1ZSkge1xuICAgICAgcmV0dXJuIGNvbG9ySW5mby5zdG9wc1swXS5jb2xvcjtcbiAgICB9XG4gICAgdmFyIGxhc3RTdG9wID0gY29sb3JJbmZvLnN0b3BzW2NvbG9ySW5mby5zdG9wcy5sZW5ndGggLSAxXTtcbiAgICBpZiAoZmVhdHVyZVZhbHVlID49IGxhc3RTdG9wLnZhbHVlKSB7XG4gICAgICByZXR1cm4gbGFzdFN0b3AuY29sb3I7XG4gICAgfVxuXG4gICAgLy8gZ28gdGhyb3VnaCB0aGUgc3RvcHMgdG8gZmluZCBtaW4gYW5kIG1heFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29sb3JJbmZvLnN0b3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc3RvcEluZm8gPSBjb2xvckluZm8uc3RvcHNbaV07XG5cbiAgICAgIGlmIChzdG9wSW5mby52YWx1ZSA8PSBmZWF0dXJlVmFsdWUpIHtcbiAgICAgICAgbG93ZXJCb3VuZENvbG9yID0gc3RvcEluZm8uY29sb3I7XG4gICAgICAgIGxvd2VyQm91bmQgPSBzdG9wSW5mby52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoc3RvcEluZm8udmFsdWUgPiBmZWF0dXJlVmFsdWUpIHtcbiAgICAgICAgdXBwZXJCb3VuZENvbG9yID0gc3RvcEluZm8uY29sb3I7XG4gICAgICAgIHVwcGVyQm91bmQgPSBzdG9wSW5mby52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmVhdHVyZSBmYWxscyBiZXR3ZWVuIHR3byBzdG9wcywgaW50ZXJwbGF0ZSB0aGUgY29sb3JzXG4gICAgaWYgKCFpc05hTihsb3dlckJvdW5kKSAmJiAhaXNOYU4odXBwZXJCb3VuZCkpIHtcbiAgICAgIHZhciByYW5nZSA9IHVwcGVyQm91bmQgLSBsb3dlckJvdW5kO1xuICAgICAgaWYgKHJhbmdlID4gMCkge1xuICAgICAgICAvLyBtb3JlIHdlaWdodCB0aGUgZnVydGhlciBpdCBpcyBmcm9tIHRoZSBsb3dlciBib3VuZFxuICAgICAgICB2YXIgdXBwZXJCb3VuZENvbG9yV2VpZ2h0ID0gKGZlYXR1cmVWYWx1ZSAtIGxvd2VyQm91bmQpIC8gcmFuZ2U7XG4gICAgICAgIGlmICh1cHBlckJvdW5kQ29sb3JXZWlnaHQpIHtcbiAgICAgICAgICAvLyBtb3JlIHdlaWdodCB0aGUgZnVydGhlciBpdCBpcyBmcm9tIHRoZSB1cHBlciBib3VuZFxuICAgICAgICAgIHZhciBsb3dlckJvdW5kQ29sb3JXZWlnaHQgPSAodXBwZXJCb3VuZCAtIGZlYXR1cmVWYWx1ZSkgLyByYW5nZTtcbiAgICAgICAgICBpZiAobG93ZXJCb3VuZENvbG9yV2VpZ2h0KSB7XG4gICAgICAgICAgICAvLyBpbnRlcnBvbGF0ZSB0aGUgbG93ZXIgYW5kIHVwcGVyIGJvdW5kIGNvbG9yIGJ5IGFwcGx5aW5nIHRoZVxuICAgICAgICAgICAgLy8gd2VpZ2h0cyB0byBlYWNoIG9mIHRoZSByZ2JhIGNvbG9ycyBhbmQgYWRkaW5nIHRoZW0gdG9nZXRoZXJcbiAgICAgICAgICAgIHZhciBpbnRlcnBvbGF0ZWRDb2xvciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA0OyBqKyspIHtcbiAgICAgICAgICAgICAgaW50ZXJwb2xhdGVkQ29sb3Jbal0gPSBNYXRoLnJvdW5kKGxvd2VyQm91bmRDb2xvcltqXSAqIGxvd2VyQm91bmRDb2xvcldlaWdodCArIHVwcGVyQm91bmRDb2xvcltqXSAqIHVwcGVyQm91bmRDb2xvcldlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJwb2xhdGVkQ29sb3I7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIG5vIGRpZmZlcmVuY2UgYmV0d2VlbiBmZWF0dXJlVmFsdWUgYW5kIHVwcGVyQm91bmQsIDEwMCUgb2YgdXBwZXJCb3VuZENvbG9yXG4gICAgICAgICAgICByZXR1cm4gdXBwZXJCb3VuZENvbG9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBubyBkaWZmZXJlbmNlIGJldHdlZW4gZmVhdHVyZVZhbHVlIGFuZCBsb3dlckJvdW5kLCAxMDAlIG9mIGxvd2VyQm91bmRDb2xvclxuICAgICAgICAgIHJldHVybiBsb3dlckJvdW5kQ29sb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gaWYgd2UgZ2V0IHRvIGhlcmUsIG5vbmUgb2YgdGhlIGNhc2VzIGFwcGx5IHNvIHJldHVybiBudWxsXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn0pO1xuXG4vLyBleHBvcnQgZnVuY3Rpb24gc3ltYm9sIChzeW1ib2xKc29uKSB7XG4vLyAgIHJldHVybiBuZXcgU3ltYm9sKHN5bWJvbEpzb24pO1xuLy8gfVxuXG5leHBvcnQgZGVmYXVsdCBTeW1ib2w7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcblxuZXhwb3J0IHZhciBTaGFwZU1hcmtlciA9IEwuUGF0aC5leHRlbmQoe1xuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChsYXRsbmcsIHNpemUsIG9wdGlvbnMpIHtcbiAgICBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fc2l6ZSA9IHNpemU7XG4gICAgdGhpcy5fbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcbiAgICB0aGlzLl9zdmdDYW52YXNJbmNsdWRlcygpO1xuICB9LFxuXG4gIHRvR2VvSlNPTjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBMLkdlb0pTT04uZ2V0RmVhdHVyZSh0aGlzLCB7XG4gICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgY29vcmRpbmF0ZXM6IEwuR2VvSlNPTi5sYXRMbmdUb0Nvb3Jkcyh0aGlzLmdldExhdExuZygpKVxuICAgIH0pO1xuICB9LFxuXG4gIF9zdmdDYW52YXNJbmNsdWRlczogZnVuY3Rpb24gKCkge1xuICAgIC8vIGltcGxlbWVudCBpbiBzdWIgY2xhc3NcbiAgfSxcblxuICBfcHJvamVjdDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3BvaW50ID0gdGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludCh0aGlzLl9sYXRsbmcpO1xuICB9LFxuXG4gIF91cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICB0aGlzLl91cGRhdGVQYXRoKCk7XG4gICAgfVxuICB9LFxuXG4gIF91cGRhdGVQYXRoOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gaW1wbGVtZW50IGluIHN1YiBjbGFzc1xuICB9LFxuXG4gIHNldExhdExuZzogZnVuY3Rpb24gKGxhdGxuZykge1xuICAgIHRoaXMuX2xhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgICByZXR1cm4gdGhpcy5maXJlKCdtb3ZlJywge2xhdGxuZzogdGhpcy5fbGF0bG5nfSk7XG4gIH0sXG5cbiAgZ2V0TGF0TG5nOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xhdGxuZztcbiAgfSxcblxuICBzZXRTaXplOiBmdW5jdGlvbiAoc2l6ZSkge1xuICAgIHRoaXMuX3NpemUgPSBzaXplO1xuICAgIHJldHVybiB0aGlzLnJlZHJhdygpO1xuICB9LFxuXG4gIGdldFNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IFNoYXBlTWFya2VyIH0gZnJvbSAnLi9TaGFwZU1hcmtlcic7XG5cbmV4cG9ydCB2YXIgQ3Jvc3NNYXJrZXIgPSBTaGFwZU1hcmtlci5leHRlbmQoe1xuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChsYXRsbmcsIHNpemUsIG9wdGlvbnMpIHtcbiAgICBTaGFwZU1hcmtlci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIGxhdGxuZywgc2l6ZSwgb3B0aW9ucyk7XG4gIH0sXG5cbiAgX3VwZGF0ZVBhdGg6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9yZW5kZXJlci5fdXBkYXRlQ3Jvc3NNYXJrZXIodGhpcyk7XG4gIH0sXG5cbiAgX3N2Z0NhbnZhc0luY2x1ZGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgTC5DYW52YXMuaW5jbHVkZSh7XG4gICAgICBfdXBkYXRlQ3Jvc3NNYXJrZXI6IGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICB2YXIgbGF0bG5nID0gbGF5ZXIuX3BvaW50O1xuICAgICAgICB2YXIgb2Zmc2V0ID0gbGF5ZXIuX3NpemUgLyAyLjA7XG4gICAgICAgIHZhciBjdHggPSB0aGlzLl9jdHg7XG5cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKGxhdGxuZy54LCBsYXRsbmcueSArIG9mZnNldCk7XG4gICAgICAgIGN0eC5saW5lVG8obGF0bG5nLngsIGxhdGxuZy55IC0gb2Zmc2V0KTtcbiAgICAgICAgdGhpcy5fZmlsbFN0cm9rZShjdHgsIGxheWVyKTtcblxuICAgICAgICBjdHgubW92ZVRvKGxhdGxuZy54IC0gb2Zmc2V0LCBsYXRsbmcueSk7XG4gICAgICAgIGN0eC5saW5lVG8obGF0bG5nLnggKyBvZmZzZXQsIGxhdGxuZy55KTtcbiAgICAgICAgdGhpcy5fZmlsbFN0cm9rZShjdHgsIGxheWVyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIEwuU1ZHLmluY2x1ZGUoe1xuICAgICAgX3VwZGF0ZUNyb3NzTWFya2VyOiBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgdmFyIGxhdGxuZyA9IGxheWVyLl9wb2ludDtcbiAgICAgICAgdmFyIG9mZnNldCA9IGxheWVyLl9zaXplIC8gMi4wO1xuXG4gICAgICAgIGlmIChMLkJyb3dzZXIudm1sKSB7XG4gICAgICAgICAgbGF0bG5nLl9yb3VuZCgpO1xuICAgICAgICAgIG9mZnNldCA9IE1hdGgucm91bmQob2Zmc2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdHIgPSAnTScgKyBsYXRsbmcueCArICcsJyArIChsYXRsbmcueSArIG9mZnNldCkgK1xuICAgICAgICAgICdMJyArIGxhdGxuZy54ICsgJywnICsgKGxhdGxuZy55IC0gb2Zmc2V0KSArXG4gICAgICAgICAgJ00nICsgKGxhdGxuZy54IC0gb2Zmc2V0KSArICcsJyArIGxhdGxuZy55ICtcbiAgICAgICAgICAnTCcgKyAobGF0bG5nLnggKyBvZmZzZXQpICsgJywnICsgbGF0bG5nLnk7XG5cbiAgICAgICAgdGhpcy5fc2V0UGF0aChsYXllciwgc3RyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufSk7XG5cbmV4cG9ydCB2YXIgY3Jvc3NNYXJrZXIgPSBmdW5jdGlvbiAobGF0bG5nLCBzaXplLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgQ3Jvc3NNYXJrZXIobGF0bG5nLCBzaXplLCBvcHRpb25zKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyb3NzTWFya2VyO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBTaGFwZU1hcmtlciB9IGZyb20gJy4vU2hhcGVNYXJrZXInO1xuXG5leHBvcnQgdmFyIFhNYXJrZXIgPSBTaGFwZU1hcmtlci5leHRlbmQoe1xuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChsYXRsbmcsIHNpemUsIG9wdGlvbnMpIHtcbiAgICBTaGFwZU1hcmtlci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIGxhdGxuZywgc2l6ZSwgb3B0aW9ucyk7XG4gIH0sXG5cbiAgX3VwZGF0ZVBhdGg6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9yZW5kZXJlci5fdXBkYXRlWE1hcmtlcih0aGlzKTtcbiAgfSxcblxuICBfc3ZnQ2FudmFzSW5jbHVkZXM6IGZ1bmN0aW9uICgpIHtcbiAgICBMLkNhbnZhcy5pbmNsdWRlKHtcbiAgICAgIF91cGRhdGVYTWFya2VyOiBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgdmFyIGxhdGxuZyA9IGxheWVyLl9wb2ludDtcbiAgICAgICAgdmFyIG9mZnNldCA9IGxheWVyLl9zaXplIC8gMi4wO1xuICAgICAgICB2YXIgY3R4ID0gdGhpcy5fY3R4O1xuXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcblxuICAgICAgICBjdHgubW92ZVRvKGxhdGxuZy54ICsgb2Zmc2V0LCBsYXRsbmcueSArIG9mZnNldCk7XG4gICAgICAgIGN0eC5saW5lVG8obGF0bG5nLnggLSBvZmZzZXQsIGxhdGxuZy55IC0gb2Zmc2V0KTtcbiAgICAgICAgdGhpcy5fZmlsbFN0cm9rZShjdHgsIGxheWVyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIEwuU1ZHLmluY2x1ZGUoe1xuICAgICAgX3VwZGF0ZVhNYXJrZXI6IGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICB2YXIgbGF0bG5nID0gbGF5ZXIuX3BvaW50O1xuICAgICAgICB2YXIgb2Zmc2V0ID0gbGF5ZXIuX3NpemUgLyAyLjA7XG5cbiAgICAgICAgaWYgKEwuQnJvd3Nlci52bWwpIHtcbiAgICAgICAgICBsYXRsbmcuX3JvdW5kKCk7XG4gICAgICAgICAgb2Zmc2V0ID0gTWF0aC5yb3VuZChvZmZzZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0ciA9ICdNJyArIChsYXRsbmcueCArIG9mZnNldCkgKyAnLCcgKyAobGF0bG5nLnkgKyBvZmZzZXQpICtcbiAgICAgICAgICAnTCcgKyAobGF0bG5nLnggLSBvZmZzZXQpICsgJywnICsgKGxhdGxuZy55IC0gb2Zmc2V0KSArXG4gICAgICAgICAgJ00nICsgKGxhdGxuZy54IC0gb2Zmc2V0KSArICcsJyArIChsYXRsbmcueSArIG9mZnNldCkgK1xuICAgICAgICAgICdMJyArIChsYXRsbmcueCArIG9mZnNldCkgKyAnLCcgKyAobGF0bG5nLnkgLSBvZmZzZXQpO1xuXG4gICAgICAgIHRoaXMuX3NldFBhdGgobGF5ZXIsIHN0cik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgdmFyIHhNYXJrZXIgPSBmdW5jdGlvbiAobGF0bG5nLCBzaXplLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgWE1hcmtlcihsYXRsbmcsIHNpemUsIG9wdGlvbnMpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgeE1hcmtlcjtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgU2hhcGVNYXJrZXIgfSBmcm9tICcuL1NoYXBlTWFya2VyJztcblxuZXhwb3J0IHZhciBTcXVhcmVNYXJrZXIgPSBTaGFwZU1hcmtlci5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgZmlsbDogdHJ1ZVxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChsYXRsbmcsIHNpemUsIG9wdGlvbnMpIHtcbiAgICBTaGFwZU1hcmtlci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIGxhdGxuZywgc2l6ZSwgb3B0aW9ucyk7XG4gIH0sXG5cbiAgX3VwZGF0ZVBhdGg6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9yZW5kZXJlci5fdXBkYXRlU3F1YXJlTWFya2VyKHRoaXMpO1xuICB9LFxuXG4gIF9zdmdDYW52YXNJbmNsdWRlczogZnVuY3Rpb24gKCkge1xuICAgIEwuQ2FudmFzLmluY2x1ZGUoe1xuICAgICAgX3VwZGF0ZVNxdWFyZU1hcmtlcjogZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgIHZhciBsYXRsbmcgPSBsYXllci5fcG9pbnQ7XG4gICAgICAgIHZhciBvZmZzZXQgPSBsYXllci5fc2l6ZSAvIDIuMDtcbiAgICAgICAgdmFyIGN0eCA9IHRoaXMuX2N0eDtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgY3R4Lm1vdmVUbyhsYXRsbmcueCArIG9mZnNldCwgbGF0bG5nLnkgKyBvZmZzZXQpO1xuICAgICAgICBjdHgubGluZVRvKGxhdGxuZy54IC0gb2Zmc2V0LCBsYXRsbmcueSArIG9mZnNldCk7XG4gICAgICAgIGN0eC5saW5lVG8obGF0bG5nLnggLSBvZmZzZXQsIGxhdGxuZy55IC0gb2Zmc2V0KTtcbiAgICAgICAgY3R4LmxpbmVUbyhsYXRsbmcueCArIG9mZnNldCwgbGF0bG5nLnkgLSBvZmZzZXQpO1xuXG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuICAgICAgICB0aGlzLl9maWxsU3Ryb2tlKGN0eCwgbGF5ZXIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTC5TVkcuaW5jbHVkZSh7XG4gICAgICBfdXBkYXRlU3F1YXJlTWFya2VyOiBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgdmFyIGxhdGxuZyA9IGxheWVyLl9wb2ludDtcbiAgICAgICAgdmFyIG9mZnNldCA9IGxheWVyLl9zaXplIC8gMi4wO1xuXG4gICAgICAgIGlmIChMLkJyb3dzZXIudm1sKSB7XG4gICAgICAgICAgbGF0bG5nLl9yb3VuZCgpO1xuICAgICAgICAgIG9mZnNldCA9IE1hdGgucm91bmQob2Zmc2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdHIgPSAnTScgKyAobGF0bG5nLnggKyBvZmZzZXQpICsgJywnICsgKGxhdGxuZy55ICsgb2Zmc2V0KSArXG4gICAgICAgICAgJ0wnICsgKGxhdGxuZy54IC0gb2Zmc2V0KSArICcsJyArIChsYXRsbmcueSArIG9mZnNldCkgK1xuICAgICAgICAgICdMJyArIChsYXRsbmcueCAtIG9mZnNldCkgKyAnLCcgKyAobGF0bG5nLnkgLSBvZmZzZXQpICtcbiAgICAgICAgICAnTCcgKyAobGF0bG5nLnggKyBvZmZzZXQpICsgJywnICsgKGxhdGxuZy55IC0gb2Zmc2V0KTtcblxuICAgICAgICBzdHIgPSBzdHIgKyAoTC5Ccm93c2VyLnN2ZyA/ICd6JyA6ICd4Jyk7XG5cbiAgICAgICAgdGhpcy5fc2V0UGF0aChsYXllciwgc3RyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufSk7XG5cbmV4cG9ydCB2YXIgc3F1YXJlTWFya2VyID0gZnVuY3Rpb24gKGxhdGxuZywgc2l6ZSwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IFNxdWFyZU1hcmtlcihsYXRsbmcsIHNpemUsIG9wdGlvbnMpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc3F1YXJlTWFya2VyO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBTaGFwZU1hcmtlciB9IGZyb20gJy4vU2hhcGVNYXJrZXInO1xuXG5leHBvcnQgdmFyIERpYW1vbmRNYXJrZXIgPSBTaGFwZU1hcmtlci5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgZmlsbDogdHJ1ZVxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChsYXRsbmcsIHNpemUsIG9wdGlvbnMpIHtcbiAgICBTaGFwZU1hcmtlci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIGxhdGxuZywgc2l6ZSwgb3B0aW9ucyk7XG4gIH0sXG5cbiAgX3VwZGF0ZVBhdGg6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9yZW5kZXJlci5fdXBkYXRlRGlhbW9uZE1hcmtlcih0aGlzKTtcbiAgfSxcblxuICBfc3ZnQ2FudmFzSW5jbHVkZXM6IGZ1bmN0aW9uICgpIHtcbiAgICBMLkNhbnZhcy5pbmNsdWRlKHtcbiAgICAgIF91cGRhdGVEaWFtb25kTWFya2VyOiBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgdmFyIGxhdGxuZyA9IGxheWVyLl9wb2ludDtcbiAgICAgICAgdmFyIG9mZnNldCA9IGxheWVyLl9zaXplIC8gMi4wO1xuICAgICAgICB2YXIgY3R4ID0gdGhpcy5fY3R4O1xuXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcblxuICAgICAgICBjdHgubW92ZVRvKGxhdGxuZy54LCBsYXRsbmcueSArIG9mZnNldCk7XG4gICAgICAgIGN0eC5saW5lVG8obGF0bG5nLnggLSBvZmZzZXQsIGxhdGxuZy55KTtcbiAgICAgICAgY3R4LmxpbmVUbyhsYXRsbmcueCwgbGF0bG5nLnkgLSBvZmZzZXQpO1xuICAgICAgICBjdHgubGluZVRvKGxhdGxuZy54ICsgb2Zmc2V0LCBsYXRsbmcueSk7XG5cbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgIHRoaXMuX2ZpbGxTdHJva2UoY3R4LCBsYXllcik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBMLlNWRy5pbmNsdWRlKHtcbiAgICAgIF91cGRhdGVEaWFtb25kTWFya2VyOiBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgdmFyIGxhdGxuZyA9IGxheWVyLl9wb2ludDtcbiAgICAgICAgdmFyIG9mZnNldCA9IGxheWVyLl9zaXplIC8gMi4wO1xuXG4gICAgICAgIGlmIChMLkJyb3dzZXIudm1sKSB7XG4gICAgICAgICAgbGF0bG5nLl9yb3VuZCgpO1xuICAgICAgICAgIG9mZnNldCA9IE1hdGgucm91bmQob2Zmc2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdHIgPSAnTScgKyBsYXRsbmcueCArICcsJyArIChsYXRsbmcueSArIG9mZnNldCkgK1xuICAgICAgICAgICdMJyArIChsYXRsbmcueCAtIG9mZnNldCkgKyAnLCcgKyBsYXRsbmcueSArXG4gICAgICAgICAgJ0wnICsgbGF0bG5nLnggKyAnLCcgKyAobGF0bG5nLnkgLSBvZmZzZXQpICtcbiAgICAgICAgICAnTCcgKyAobGF0bG5nLnggKyBvZmZzZXQpICsgJywnICsgbGF0bG5nLnk7XG5cbiAgICAgICAgc3RyID0gc3RyICsgKEwuQnJvd3Nlci5zdmcgPyAneicgOiAneCcpO1xuXG4gICAgICAgIHRoaXMuX3NldFBhdGgobGF5ZXIsIHN0cik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgdmFyIGRpYW1vbmRNYXJrZXIgPSBmdW5jdGlvbiAobGF0bG5nLCBzaXplLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRGlhbW9uZE1hcmtlcihsYXRsbmcsIHNpemUsIG9wdGlvbnMpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGlhbW9uZE1hcmtlcjtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IFN5bWJvbCBmcm9tICcuL1N5bWJvbCc7XG5pbXBvcnQge3NxdWFyZU1hcmtlciwgeE1hcmtlciwgY3Jvc3NNYXJrZXIsIGRpYW1vbmRNYXJrZXJ9IGZyb20gJ2xlYWZsZXQtc2hhcGUtbWFya2Vycyc7XG5cbmV4cG9ydCB2YXIgUG9pbnRTeW1ib2wgPSBTeW1ib2wuZXh0ZW5kKHtcblxuICBzdGF0aWNzOiB7XG4gICAgTUFSS0VSVFlQRVM6IFsnZXNyaVNNU0NpcmNsZScsICdlc3JpU01TQ3Jvc3MnLCAnZXNyaVNNU0RpYW1vbmQnLCAnZXNyaVNNU1NxdWFyZScsICdlc3JpU01TWCcsICdlc3JpUE1TJ11cbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoc3ltYm9sSnNvbiwgb3B0aW9ucykge1xuICAgIHZhciB1cmw7XG4gICAgU3ltYm9sLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgc3ltYm9sSnNvbiwgb3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuc2VydmljZVVybCA9IG9wdGlvbnMudXJsO1xuICAgIH1cbiAgICBpZiAoc3ltYm9sSnNvbikge1xuICAgICAgaWYgKHN5bWJvbEpzb24udHlwZSA9PT0gJ2VzcmlQTVMnKSB7XG4gICAgICAgIHZhciBpbWFnZVVybCA9IHRoaXMuX3N5bWJvbEpzb24udXJsO1xuICAgICAgICBpZiAoaW1hZ2VVcmwgJiYgaW1hZ2VVcmwuc3Vic3RyKDAsIDcpID09PSAnaHR0cDovLycgfHwgaW1hZ2VVcmwuc3Vic3RyKDAsIDgpID09PSAnaHR0cHM6Ly8nKSB7XG4gICAgICAgICAgLy8gd2ViIGltYWdlXG4gICAgICAgICAgdXJsID0gdGhpcy5zYW5pdGl6ZShpbWFnZVVybCk7XG4gICAgICAgICAgdGhpcy5faWNvblVybCA9IHVybDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cmwgPSB0aGlzLnNlcnZpY2VVcmwgKyAnaW1hZ2VzLycgKyBpbWFnZVVybDtcbiAgICAgICAgICB0aGlzLl9pY29uVXJsID0gb3B0aW9ucyAmJiBvcHRpb25zLnRva2VuID8gdXJsICsgJz90b2tlbj0nICsgb3B0aW9ucy50b2tlbiA6IHVybDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3ltYm9sSnNvbi5pbWFnZURhdGEpIHtcbiAgICAgICAgICB0aGlzLl9pY29uVXJsID0gJ2RhdGE6JyArIHN5bWJvbEpzb24uY29udGVudFR5cGUgKyAnO2Jhc2U2NCwnICsgc3ltYm9sSnNvbi5pbWFnZURhdGE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbGVhZmxldCBkb2VzIG5vdCBhbGxvdyByZXNpemluZyBpY29ucyBzbyBrZWVwIGEgaGFzaCBvZiBkaWZmZXJlbnRcbiAgICAgICAgLy8gaWNvbiBzaXplcyB0byB0cnkgYW5kIGtlZXAgZG93biBvbiB0aGUgbnVtYmVyIG9mIGljb25zIGNyZWF0ZWRcbiAgICAgICAgdGhpcy5faWNvbnMgPSB7fTtcbiAgICAgICAgLy8gY3JlYXRlIGJhc2UgaWNvblxuICAgICAgICB0aGlzLmljb24gPSB0aGlzLl9jcmVhdGVJY29uKHRoaXMuX3N5bWJvbEpzb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZmlsbFN0eWxlcygpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBwcmV2ZW50IGh0bWwgaW5qZWN0aW9uIGluIHN0cmluZ3NcbiAgc2FuaXRpemU6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICBpZiAoIXN0cikge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgdGV4dDtcbiAgICB0cnkge1xuICAgICAgLy8gcmVtb3ZlcyBodG1sIGJ1dCBsZWF2ZXMgdXJsIGxpbmsgdGV4dFxuICAgICAgdGV4dCA9IHN0ci5yZXBsYWNlKC88YnI+L2dpLCAnXFxuJyk7XG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC88cC4qPi9naSwgJ1xcbicpO1xuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvPGEuKmhyZWY9JyguKj8pJy4qPiguKj8pPFxcL2E+L2dpLCAnICQyICgkMSkgJyk7XG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC88KD86LnxcXHMpKj8+L2csICcnKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgdGV4dCA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xuICB9LFxuXG4gIF9maWxsU3R5bGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX3N5bWJvbEpzb24ub3V0bGluZSAmJiB0aGlzLl9zeW1ib2xKc29uLnNpemUgPiAwICYmIHRoaXMuX3N5bWJvbEpzb24ub3V0bGluZS5zdHlsZSAhPT0gJ2VzcmlTTFNOdWxsJykge1xuICAgICAgdGhpcy5fc3R5bGVzLnN0cm9rZSA9IHRydWU7XG4gICAgICB0aGlzLl9zdHlsZXMud2VpZ2h0ID0gdGhpcy5waXhlbFZhbHVlKHRoaXMuX3N5bWJvbEpzb24ub3V0bGluZS53aWR0aCk7XG4gICAgICB0aGlzLl9zdHlsZXMuY29sb3IgPSB0aGlzLmNvbG9yVmFsdWUodGhpcy5fc3ltYm9sSnNvbi5vdXRsaW5lLmNvbG9yKTtcbiAgICAgIHRoaXMuX3N0eWxlcy5vcGFjaXR5ID0gdGhpcy5hbHBoYVZhbHVlKHRoaXMuX3N5bWJvbEpzb24ub3V0bGluZS5jb2xvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3N0eWxlcy5zdHJva2UgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3N5bWJvbEpzb24uY29sb3IpIHtcbiAgICAgIHRoaXMuX3N0eWxlcy5maWxsQ29sb3IgPSB0aGlzLmNvbG9yVmFsdWUodGhpcy5fc3ltYm9sSnNvbi5jb2xvcik7XG4gICAgICB0aGlzLl9zdHlsZXMuZmlsbE9wYWNpdHkgPSB0aGlzLmFscGhhVmFsdWUodGhpcy5fc3ltYm9sSnNvbi5jb2xvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3N0eWxlcy5maWxsT3BhY2l0eSA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3N5bWJvbEpzb24uc3R5bGUgPT09ICdlc3JpU01TQ2lyY2xlJykge1xuICAgICAgdGhpcy5fc3R5bGVzLnJhZGl1cyA9IHRoaXMucGl4ZWxWYWx1ZSh0aGlzLl9zeW1ib2xKc29uLnNpemUpIC8gMi4wO1xuICAgIH1cbiAgfSxcblxuICBfY3JlYXRlSWNvbjogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgd2lkdGggPSB0aGlzLnBpeGVsVmFsdWUob3B0aW9ucy53aWR0aCk7XG4gICAgdmFyIGhlaWdodCA9IHdpZHRoO1xuICAgIGlmIChvcHRpb25zLmhlaWdodCkge1xuICAgICAgaGVpZ2h0ID0gdGhpcy5waXhlbFZhbHVlKG9wdGlvbnMuaGVpZ2h0KTtcbiAgICB9XG4gICAgdmFyIHhPZmZzZXQgPSB3aWR0aCAvIDIuMDtcbiAgICB2YXIgeU9mZnNldCA9IGhlaWdodCAvIDIuMDtcblxuICAgIGlmIChvcHRpb25zLnhvZmZzZXQpIHtcbiAgICAgIHhPZmZzZXQgKz0gdGhpcy5waXhlbFZhbHVlKG9wdGlvbnMueG9mZnNldCk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnlvZmZzZXQpIHtcbiAgICAgIHlPZmZzZXQgKz0gdGhpcy5waXhlbFZhbHVlKG9wdGlvbnMueW9mZnNldCk7XG4gICAgfVxuXG4gICAgdmFyIGljb24gPSBMLmljb24oe1xuICAgICAgaWNvblVybDogdGhpcy5faWNvblVybCxcbiAgICAgIGljb25TaXplOiBbd2lkdGgsIGhlaWdodF0sXG4gICAgICBpY29uQW5jaG9yOiBbeE9mZnNldCwgeU9mZnNldF1cbiAgICB9KTtcbiAgICB0aGlzLl9pY29uc1tvcHRpb25zLndpZHRoLnRvU3RyaW5nKCldID0gaWNvbjtcbiAgICByZXR1cm4gaWNvbjtcbiAgfSxcblxuICBfZ2V0SWNvbjogZnVuY3Rpb24gKHNpemUpIHtcbiAgICAvLyBjaGVjayB0byBzZWUgaWYgaXQgaXMgYWxyZWFkeSBjcmVhdGVkIGJ5IHNpemVcbiAgICB2YXIgaWNvbiA9IHRoaXMuX2ljb25zW3NpemUudG9TdHJpbmcoKV07XG4gICAgaWYgKCFpY29uKSB7XG4gICAgICBpY29uID0gdGhpcy5fY3JlYXRlSWNvbih7d2lkdGg6IHNpemV9KTtcbiAgICB9XG4gICAgcmV0dXJuIGljb247XG4gIH0sXG5cbiAgcG9pbnRUb0xheWVyOiBmdW5jdGlvbiAoZ2VvanNvbiwgbGF0bG5nLCB2aXN1YWxWYXJpYWJsZXMsIG9wdGlvbnMpIHtcbiAgICB2YXIgc2l6ZSA9IHRoaXMuX3N5bWJvbEpzb24uc2l6ZSB8fCB0aGlzLl9zeW1ib2xKc29uLndpZHRoO1xuICAgIGlmICghdGhpcy5faXNEZWZhdWx0KSB7XG4gICAgICBpZiAodmlzdWFsVmFyaWFibGVzLnNpemVJbmZvKSB7XG4gICAgICAgIHZhciBjYWxjdWxhdGVkU2l6ZSA9IHRoaXMuZ2V0U2l6ZShnZW9qc29uLCB2aXN1YWxWYXJpYWJsZXMuc2l6ZUluZm8pO1xuICAgICAgICBpZiAoY2FsY3VsYXRlZFNpemUpIHtcbiAgICAgICAgICBzaXplID0gY2FsY3VsYXRlZFNpemU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh2aXN1YWxWYXJpYWJsZXMuY29sb3JJbmZvKSB7XG4gICAgICAgIHZhciBjb2xvciA9IHRoaXMuZ2V0Q29sb3IoZ2VvanNvbiwgdmlzdWFsVmFyaWFibGVzLmNvbG9ySW5mbyk7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgIHRoaXMuX3N0eWxlcy5maWxsQ29sb3IgPSB0aGlzLmNvbG9yVmFsdWUoY29sb3IpO1xuICAgICAgICAgIHRoaXMuX3N0eWxlcy5maWxsT3BhY2l0eSA9IHRoaXMuYWxwaGFWYWx1ZShjb2xvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc3ltYm9sSnNvbi50eXBlID09PSAnZXNyaVBNUycpIHtcbiAgICAgIHZhciBsYXllck9wdGlvbnMgPSBMLmV4dGVuZCh7fSwge2ljb246IHRoaXMuX2dldEljb24oc2l6ZSl9LCBvcHRpb25zKTtcbiAgICAgIHJldHVybiBMLm1hcmtlcihsYXRsbmcsIGxheWVyT3B0aW9ucyk7XG4gICAgfVxuICAgIHNpemUgPSB0aGlzLnBpeGVsVmFsdWUoc2l6ZSk7XG5cbiAgICBzd2l0Y2ggKHRoaXMuX3N5bWJvbEpzb24uc3R5bGUpIHtcbiAgICAgIGNhc2UgJ2VzcmlTTVNTcXVhcmUnOlxuICAgICAgICByZXR1cm4gc3F1YXJlTWFya2VyKGxhdGxuZywgc2l6ZSwgTC5leHRlbmQoe30sIHRoaXMuX3N0eWxlcywgb3B0aW9ucykpO1xuICAgICAgY2FzZSAnZXNyaVNNU0RpYW1vbmQnOlxuICAgICAgICByZXR1cm4gZGlhbW9uZE1hcmtlcihsYXRsbmcsIHNpemUsIEwuZXh0ZW5kKHt9LCB0aGlzLl9zdHlsZXMsIG9wdGlvbnMpKTtcbiAgICAgIGNhc2UgJ2VzcmlTTVNDcm9zcyc6XG4gICAgICAgIHJldHVybiBjcm9zc01hcmtlcihsYXRsbmcsIHNpemUsIEwuZXh0ZW5kKHt9LCB0aGlzLl9zdHlsZXMsIG9wdGlvbnMpKTtcbiAgICAgIGNhc2UgJ2VzcmlTTVNYJzpcbiAgICAgICAgcmV0dXJuIHhNYXJrZXIobGF0bG5nLCBzaXplLCBMLmV4dGVuZCh7fSwgdGhpcy5fc3R5bGVzLCBvcHRpb25zKSk7XG4gICAgfVxuICAgIHRoaXMuX3N0eWxlcy5yYWRpdXMgPSBzaXplIC8gMi4wO1xuICAgIHJldHVybiBMLmNpcmNsZU1hcmtlcihsYXRsbmcsIEwuZXh0ZW5kKHt9LCB0aGlzLl9zdHlsZXMsIG9wdGlvbnMpKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBwb2ludFN5bWJvbCAoc3ltYm9sSnNvbiwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IFBvaW50U3ltYm9sKHN5bWJvbEpzb24sIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwb2ludFN5bWJvbDtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9TeW1ib2wnO1xuXG5leHBvcnQgdmFyIExpbmVTeW1ib2wgPSBTeW1ib2wuZXh0ZW5kKHtcbiAgc3RhdGljczoge1xuICAgIC8vIE5vdCBpbXBsZW1lbnRlZCAnZXNyaVNMU051bGwnXG4gICAgTElORVRZUEVTOiBbJ2VzcmlTTFNEYXNoJywgJ2VzcmlTTFNEb3QnLCAnZXNyaVNMU0Rhc2hEb3REb3QnLCAnZXNyaVNMU0Rhc2hEb3QnLCAnZXNyaVNMU1NvbGlkJ11cbiAgfSxcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKHN5bWJvbEpzb24sIG9wdGlvbnMpIHtcbiAgICBTeW1ib2wucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBzeW1ib2xKc29uLCBvcHRpb25zKTtcbiAgICB0aGlzLl9maWxsU3R5bGVzKCk7XG4gIH0sXG5cbiAgX2ZpbGxTdHlsZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBzZXQgdGhlIGRlZmF1bHRzIHRoYXQgc2hvdyB1cCBvbiBhcmNnaXMgb25saW5lXG4gICAgdGhpcy5fc3R5bGVzLmxpbmVDYXAgPSAnYnV0dCc7XG4gICAgdGhpcy5fc3R5bGVzLmxpbmVKb2luID0gJ21pdGVyJztcbiAgICB0aGlzLl9zdHlsZXMuZmlsbCA9IGZhbHNlO1xuICAgIHRoaXMuX3N0eWxlcy53ZWlnaHQgPSAwO1xuXG4gICAgaWYgKCF0aGlzLl9zeW1ib2xKc29uKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc3R5bGVzO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9zeW1ib2xKc29uLmNvbG9yKSB7XG4gICAgICB0aGlzLl9zdHlsZXMuY29sb3IgPSB0aGlzLmNvbG9yVmFsdWUodGhpcy5fc3ltYm9sSnNvbi5jb2xvcik7XG4gICAgICB0aGlzLl9zdHlsZXMub3BhY2l0eSA9IHRoaXMuYWxwaGFWYWx1ZSh0aGlzLl9zeW1ib2xKc29uLmNvbG9yKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzTmFOKHRoaXMuX3N5bWJvbEpzb24ud2lkdGgpKSB7XG4gICAgICB0aGlzLl9zdHlsZXMud2VpZ2h0ID0gdGhpcy5waXhlbFZhbHVlKHRoaXMuX3N5bWJvbEpzb24ud2lkdGgpO1xuXG4gICAgICB2YXIgZGFzaFZhbHVlcyA9IFtdO1xuXG4gICAgICBzd2l0Y2ggKHRoaXMuX3N5bWJvbEpzb24uc3R5bGUpIHtcbiAgICAgICAgY2FzZSAnZXNyaVNMU0Rhc2gnOlxuICAgICAgICAgIGRhc2hWYWx1ZXMgPSBbNCwgM107XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2VzcmlTTFNEb3QnOlxuICAgICAgICAgIGRhc2hWYWx1ZXMgPSBbMSwgM107XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2VzcmlTTFNEYXNoRG90JzpcbiAgICAgICAgICBkYXNoVmFsdWVzID0gWzgsIDMsIDEsIDNdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdlc3JpU0xTRGFzaERvdERvdCc6XG4gICAgICAgICAgZGFzaFZhbHVlcyA9IFs4LCAzLCAxLCAzLCAxLCAzXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgLy8gdXNlIHRoZSBkYXNoIHZhbHVlcyBhbmQgdGhlIGxpbmUgd2VpZ2h0IHRvIHNldCBkYXNoIGFycmF5XG4gICAgICBpZiAoZGFzaFZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGFzaFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGRhc2hWYWx1ZXNbaV0gKj0gdGhpcy5fc3R5bGVzLndlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3N0eWxlcy5kYXNoQXJyYXkgPSBkYXNoVmFsdWVzLmpvaW4oJywnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgc3R5bGU6IGZ1bmN0aW9uIChmZWF0dXJlLCB2aXN1YWxWYXJpYWJsZXMpIHtcbiAgICBpZiAoIXRoaXMuX2lzRGVmYXVsdCAmJiB2aXN1YWxWYXJpYWJsZXMpIHtcbiAgICAgIGlmICh2aXN1YWxWYXJpYWJsZXMuc2l6ZUluZm8pIHtcbiAgICAgICAgdmFyIGNhbGN1bGF0ZWRTaXplID0gdGhpcy5waXhlbFZhbHVlKHRoaXMuZ2V0U2l6ZShmZWF0dXJlLCB2aXN1YWxWYXJpYWJsZXMuc2l6ZUluZm8pKTtcbiAgICAgICAgaWYgKGNhbGN1bGF0ZWRTaXplKSB7XG4gICAgICAgICAgdGhpcy5fc3R5bGVzLndlaWdodCA9IGNhbGN1bGF0ZWRTaXplO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodmlzdWFsVmFyaWFibGVzLmNvbG9ySW5mbykge1xuICAgICAgICB2YXIgY29sb3IgPSB0aGlzLmdldENvbG9yKGZlYXR1cmUsIHZpc3VhbFZhcmlhYmxlcy5jb2xvckluZm8pO1xuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICB0aGlzLl9zdHlsZXMuY29sb3IgPSB0aGlzLmNvbG9yVmFsdWUoY29sb3IpO1xuICAgICAgICAgIHRoaXMuX3N0eWxlcy5vcGFjaXR5ID0gdGhpcy5hbHBoYVZhbHVlKGNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fc3R5bGVzO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVTeW1ib2wgKHN5bWJvbEpzb24sIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBMaW5lU3ltYm9sKHN5bWJvbEpzb24sIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsaW5lU3ltYm9sO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL1N5bWJvbCc7XG5pbXBvcnQgbGluZVN5bWJvbCBmcm9tICcuL0xpbmVTeW1ib2wnO1xuXG5leHBvcnQgdmFyIFBvbHlnb25TeW1ib2wgPSBTeW1ib2wuZXh0ZW5kKHtcbiAgc3RhdGljczoge1xuICAgIC8vIG5vdCBpbXBsZW1lbnRlZDogJ2VzcmlTRlNCYWNrd2FyZERpYWdvbmFsJywnZXNyaVNGU0Nyb3NzJywnZXNyaVNGU0RpYWdvbmFsQ3Jvc3MnLCdlc3JpU0ZTRm9yd2FyZERpYWdvbmFsJywnZXNyaVNGU0hvcml6b250YWwnLCdlc3JpU0ZTTnVsbCcsJ2VzcmlTRlNWZXJ0aWNhbCdcbiAgICBQT0xZR09OVFlQRVM6IFsnZXNyaVNGU1NvbGlkJ11cbiAgfSxcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKHN5bWJvbEpzb24sIG9wdGlvbnMpIHtcbiAgICBTeW1ib2wucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBzeW1ib2xKc29uLCBvcHRpb25zKTtcbiAgICBpZiAoc3ltYm9sSnNvbikge1xuICAgICAgaWYgKHN5bWJvbEpzb24ub3V0bGluZSAmJiBzeW1ib2xKc29uLm91dGxpbmUuc3R5bGUgPT09ICdlc3JpU0xTTnVsbCcpIHtcbiAgICAgICAgdGhpcy5fbGluZVN0eWxlcyA9IHsgd2VpZ2h0OiAwIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9saW5lU3R5bGVzID0gbGluZVN5bWJvbChzeW1ib2xKc29uLm91dGxpbmUsIG9wdGlvbnMpLnN0eWxlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9maWxsU3R5bGVzKCk7XG4gICAgfVxuICB9LFxuXG4gIF9maWxsU3R5bGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX2xpbmVTdHlsZXMpIHtcbiAgICAgIGlmICh0aGlzLl9saW5lU3R5bGVzLndlaWdodCA9PT0gMCkge1xuICAgICAgICAvLyB3aGVuIHdlaWdodCBpcyAwLCBzZXR0aW5nIHRoZSBzdHJva2UgdG8gZmFsc2UgY2FuIHN0aWxsIGxvb2sgYmFkXG4gICAgICAgIC8vIChnYXBzIGJldHdlZW4gdGhlIHBvbHlnb25zKVxuICAgICAgICB0aGlzLl9zdHlsZXMuc3Ryb2tlID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjb3B5IHRoZSBsaW5lIHN5bWJvbCBzdHlsZXMgaW50byB0aGlzIHN5bWJvbCdzIHN0eWxlc1xuICAgICAgICBmb3IgKHZhciBzdHlsZUF0dHIgaW4gdGhpcy5fbGluZVN0eWxlcykge1xuICAgICAgICAgIHRoaXMuX3N0eWxlc1tzdHlsZUF0dHJdID0gdGhpcy5fbGluZVN0eWxlc1tzdHlsZUF0dHJdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2V0IHRoZSBmaWxsIGZvciB0aGUgcG9seWdvblxuICAgIGlmICh0aGlzLl9zeW1ib2xKc29uKSB7XG4gICAgICBpZiAodGhpcy5fc3ltYm9sSnNvbi5jb2xvciAmJlxuICAgICAgICAgIC8vIGRvbid0IGZpbGwgcG9seWdvbiBpZiB0eXBlIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICAgICAgICBQb2x5Z29uU3ltYm9sLlBPTFlHT05UWVBFUy5pbmRleE9mKHRoaXMuX3N5bWJvbEpzb24uc3R5bGUgPj0gMCkpIHtcbiAgICAgICAgdGhpcy5fc3R5bGVzLmZpbGwgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zdHlsZXMuZmlsbENvbG9yID0gdGhpcy5jb2xvclZhbHVlKHRoaXMuX3N5bWJvbEpzb24uY29sb3IpO1xuICAgICAgICB0aGlzLl9zdHlsZXMuZmlsbE9wYWNpdHkgPSB0aGlzLmFscGhhVmFsdWUodGhpcy5fc3ltYm9sSnNvbi5jb2xvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zdHlsZXMuZmlsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zdHlsZXMuZmlsbE9wYWNpdHkgPSAwO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzdHlsZTogZnVuY3Rpb24gKGZlYXR1cmUsIHZpc3VhbFZhcmlhYmxlcykge1xuICAgIGlmICghdGhpcy5faXNEZWZhdWx0ICYmIHZpc3VhbFZhcmlhYmxlcyAmJiB2aXN1YWxWYXJpYWJsZXMuY29sb3JJbmZvKSB7XG4gICAgICB2YXIgY29sb3IgPSB0aGlzLmdldENvbG9yKGZlYXR1cmUsIHZpc3VhbFZhcmlhYmxlcy5jb2xvckluZm8pO1xuICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIHRoaXMuX3N0eWxlcy5maWxsQ29sb3IgPSB0aGlzLmNvbG9yVmFsdWUoY29sb3IpO1xuICAgICAgICB0aGlzLl9zdHlsZXMuZmlsbE9wYWNpdHkgPSB0aGlzLmFscGhhVmFsdWUoY29sb3IpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fc3R5bGVzO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBvbHlnb25TeW1ib2wgKHN5bWJvbEpzb24sIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBQb2x5Z29uU3ltYm9sKHN5bWJvbEpzb24sIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwb2x5Z29uU3ltYm9sO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCBwb2ludFN5bWJvbCBmcm9tICcuLi9TeW1ib2xzL1BvaW50U3ltYm9sJztcbmltcG9ydCBsaW5lU3ltYm9sIGZyb20gJy4uL1N5bWJvbHMvTGluZVN5bWJvbCc7XG5pbXBvcnQgcG9seWdvblN5bWJvbCBmcm9tICcuLi9TeW1ib2xzL1BvbHlnb25TeW1ib2wnO1xuXG5leHBvcnQgdmFyIFJlbmRlcmVyID0gTC5DbGFzcy5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgcHJvcG9ydGlvbmFsUG9seWdvbjogZmFsc2UsXG4gICAgY2xpY2thYmxlOiB0cnVlXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKHJlbmRlcmVySnNvbiwgb3B0aW9ucykge1xuICAgIHRoaXMuX3JlbmRlcmVySnNvbiA9IHJlbmRlcmVySnNvbjtcbiAgICB0aGlzLl9wb2ludFN5bWJvbHMgPSBmYWxzZTtcbiAgICB0aGlzLl9zeW1ib2xzID0gW107XG4gICAgdGhpcy5fdmlzdWFsVmFyaWFibGVzID0gdGhpcy5fcGFyc2VWaXN1YWxWYXJpYWJsZXMocmVuZGVyZXJKc29uLnZpc3VhbFZhcmlhYmxlcyk7XG4gICAgTC5VdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gIH0sXG5cbiAgX3BhcnNlVmlzdWFsVmFyaWFibGVzOiBmdW5jdGlvbiAodmlzdWFsVmFyaWFibGVzKSB7XG4gICAgdmFyIHZpc1ZhcnMgPSB7fTtcbiAgICBpZiAodmlzdWFsVmFyaWFibGVzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpc3VhbFZhcmlhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2aXNWYXJzW3Zpc3VhbFZhcmlhYmxlc1tpXS50eXBlXSA9IHZpc3VhbFZhcmlhYmxlc1tpXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZpc1ZhcnM7XG4gIH0sXG5cbiAgX2NyZWF0ZURlZmF1bHRTeW1ib2w6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fcmVuZGVyZXJKc29uLmRlZmF1bHRTeW1ib2wpIHtcbiAgICAgIHRoaXMuX2RlZmF1bHRTeW1ib2wgPSB0aGlzLl9uZXdTeW1ib2wodGhpcy5fcmVuZGVyZXJKc29uLmRlZmF1bHRTeW1ib2wpO1xuICAgICAgdGhpcy5fZGVmYXVsdFN5bWJvbC5faXNEZWZhdWx0ID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG5cbiAgX25ld1N5bWJvbDogZnVuY3Rpb24gKHN5bWJvbEpzb24pIHtcbiAgICBpZiAoc3ltYm9sSnNvbi50eXBlID09PSAnZXNyaVNNUycgfHwgc3ltYm9sSnNvbi50eXBlID09PSAnZXNyaVBNUycpIHtcbiAgICAgIHRoaXMuX3BvaW50U3ltYm9scyA9IHRydWU7XG4gICAgICByZXR1cm4gcG9pbnRTeW1ib2woc3ltYm9sSnNvbiwgdGhpcy5vcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKHN5bWJvbEpzb24udHlwZSA9PT0gJ2VzcmlTTFMnKSB7XG4gICAgICByZXR1cm4gbGluZVN5bWJvbChzeW1ib2xKc29uLCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoc3ltYm9sSnNvbi50eXBlID09PSAnZXNyaVNGUycpIHtcbiAgICAgIHJldHVybiBwb2x5Z29uU3ltYm9sKHN5bWJvbEpzb24sIHRoaXMub3B0aW9ucyk7XG4gICAgfVxuICB9LFxuXG4gIF9nZXRTeW1ib2w6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBvdmVycmlkZVxuICB9LFxuXG4gIGF0dGFjaFN0eWxlc1RvTGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xuICAgIGlmICh0aGlzLl9wb2ludFN5bWJvbHMpIHtcbiAgICAgIGxheWVyLm9wdGlvbnMucG9pbnRUb0xheWVyID0gTC5VdGlsLmJpbmQodGhpcy5wb2ludFRvTGF5ZXIsIHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXllci5vcHRpb25zLnN0eWxlID0gTC5VdGlsLmJpbmQodGhpcy5zdHlsZSwgdGhpcyk7XG4gICAgICBsYXllci5fb3JpZ2luYWxTdHlsZSA9IGxheWVyLm9wdGlvbnMuc3R5bGU7XG4gICAgfVxuICB9LFxuXG4gIHBvaW50VG9MYXllcjogZnVuY3Rpb24gKGdlb2pzb24sIGxhdGxuZykge1xuICAgIHZhciBzeW0gPSB0aGlzLl9nZXRTeW1ib2woZ2VvanNvbik7XG4gICAgaWYgKHN5bSAmJiBzeW0ucG9pbnRUb0xheWVyKSB7XG4gICAgICAvLyByaWdodCBub3cgY3VzdG9tIHBhbmVzIGFyZSB0aGUgb25seSBvcHRpb24gcHVzaGVkIHRocm91Z2hcbiAgICAgIHJldHVybiBzeW0ucG9pbnRUb0xheWVyKGdlb2pzb24sIGxhdGxuZywgdGhpcy5fdmlzdWFsVmFyaWFibGVzLCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cbiAgICAvLyBpbnZpc2libGUgc3ltYm9sb2d5XG4gICAgcmV0dXJuIEwuY2lyY2xlTWFya2VyKGxhdGxuZywge3JhZGl1czogMCwgb3BhY2l0eTogMH0pO1xuICB9LFxuXG4gIHN0eWxlOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgIHZhciB1c2VyU3R5bGVzO1xuICAgIGlmICh0aGlzLm9wdGlvbnMudXNlckRlZmluZWRTdHlsZSkge1xuICAgICAgdXNlclN0eWxlcyA9IHRoaXMub3B0aW9ucy51c2VyRGVmaW5lZFN0eWxlKGZlYXR1cmUpO1xuICAgIH1cbiAgICAvLyBmaW5kIHRoZSBzeW1ib2wgdG8gcmVwcmVzZW50IHRoaXMgZmVhdHVyZVxuICAgIHZhciBzeW0gPSB0aGlzLl9nZXRTeW1ib2woZmVhdHVyZSk7XG4gICAgaWYgKHN5bSkge1xuICAgICAgcmV0dXJuIHRoaXMubWVyZ2VTdHlsZXMoc3ltLnN0eWxlKGZlYXR1cmUsIHRoaXMuX3Zpc3VhbFZhcmlhYmxlcyksIHVzZXJTdHlsZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpbnZpc2libGUgc3ltYm9sb2d5XG4gICAgICByZXR1cm4gdGhpcy5tZXJnZVN0eWxlcyh7b3BhY2l0eTogMCwgZmlsbE9wYWNpdHk6IDB9LCB1c2VyU3R5bGVzKTtcbiAgICB9XG4gIH0sXG5cbiAgbWVyZ2VTdHlsZXM6IGZ1bmN0aW9uIChzdHlsZXMsIHVzZXJTdHlsZXMpIHtcbiAgICB2YXIgbWVyZ2VkU3R5bGVzID0ge307XG4gICAgdmFyIGF0dHI7XG4gICAgLy8gY29weSByZW5kZXJlciBzdHlsZSBhdHRyaWJ1dGVzXG4gICAgZm9yIChhdHRyIGluIHN0eWxlcykge1xuICAgICAgaWYgKHN0eWxlcy5oYXNPd25Qcm9wZXJ0eShhdHRyKSkge1xuICAgICAgICBtZXJnZWRTdHlsZXNbYXR0cl0gPSBzdHlsZXNbYXR0cl07XG4gICAgICB9XG4gICAgfVxuICAgIC8vIG92ZXJyaWRlIHdpdGggdXNlciBkZWZpbmVkIHN0eWxlIGF0dHJpYnV0ZXNcbiAgICBpZiAodXNlclN0eWxlcykge1xuICAgICAgZm9yIChhdHRyIGluIHVzZXJTdHlsZXMpIHtcbiAgICAgICAgaWYgKHVzZXJTdHlsZXMuaGFzT3duUHJvcGVydHkoYXR0cikpIHtcbiAgICAgICAgICBtZXJnZWRTdHlsZXNbYXR0cl0gPSB1c2VyU3R5bGVzW2F0dHJdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXJnZWRTdHlsZXM7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBSZW5kZXJlcjtcbiIsImltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcblxuZXhwb3J0IHZhciBTaW1wbGVSZW5kZXJlciA9IFJlbmRlcmVyLmV4dGVuZCh7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChyZW5kZXJlckpzb24sIG9wdGlvbnMpIHtcbiAgICBSZW5kZXJlci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHJlbmRlcmVySnNvbiwgb3B0aW9ucyk7XG4gICAgdGhpcy5fY3JlYXRlU3ltYm9sKCk7XG4gIH0sXG5cbiAgX2NyZWF0ZVN5bWJvbDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9yZW5kZXJlckpzb24uc3ltYm9sKSB7XG4gICAgICB0aGlzLl9zeW1ib2xzLnB1c2godGhpcy5fbmV3U3ltYm9sKHRoaXMuX3JlbmRlcmVySnNvbi5zeW1ib2wpKTtcbiAgICB9XG4gIH0sXG5cbiAgX2dldFN5bWJvbDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9zeW1ib2xzWzBdO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNpbXBsZVJlbmRlcmVyIChyZW5kZXJlckpzb24sIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBTaW1wbGVSZW5kZXJlcihyZW5kZXJlckpzb24sIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaW1wbGVSZW5kZXJlcjtcbiIsImltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcblxuZXhwb3J0IHZhciBDbGFzc0JyZWFrc1JlbmRlcmVyID0gUmVuZGVyZXIuZXh0ZW5kKHtcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKHJlbmRlcmVySnNvbiwgb3B0aW9ucykge1xuICAgIFJlbmRlcmVyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgcmVuZGVyZXJKc29uLCBvcHRpb25zKTtcbiAgICB0aGlzLl9maWVsZCA9IHRoaXMuX3JlbmRlcmVySnNvbi5maWVsZDtcbiAgICBpZiAodGhpcy5fcmVuZGVyZXJKc29uLm5vcm1hbGl6YXRpb25UeXBlICYmIHRoaXMuX3JlbmRlcmVySnNvbi5ub3JtYWxpemF0aW9uVHlwZSA9PT0gJ2VzcmlOb3JtYWxpemVCeUZpZWxkJykge1xuICAgICAgdGhpcy5fbm9ybWFsaXphdGlvbkZpZWxkID0gdGhpcy5fcmVuZGVyZXJKc29uLm5vcm1hbGl6YXRpb25GaWVsZDtcbiAgICB9XG4gICAgdGhpcy5fY3JlYXRlU3ltYm9scygpO1xuICB9LFxuXG4gIF9jcmVhdGVTeW1ib2xzOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN5bWJvbDtcbiAgICB2YXIgY2xhc3NicmVha3MgPSB0aGlzLl9yZW5kZXJlckpzb24uY2xhc3NCcmVha0luZm9zO1xuXG4gICAgdGhpcy5fc3ltYm9scyA9IFtdO1xuXG4gICAgLy8gY3JlYXRlIGEgc3ltYm9sIGZvciBlYWNoIGNsYXNzIGJyZWFrXG4gICAgZm9yICh2YXIgaSA9IGNsYXNzYnJlYWtzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnByb3BvcnRpb25hbFBvbHlnb24gJiYgdGhpcy5fcmVuZGVyZXJKc29uLmJhY2tncm91bmRGaWxsU3ltYm9sKSB7XG4gICAgICAgIHN5bWJvbCA9IHRoaXMuX25ld1N5bWJvbCh0aGlzLl9yZW5kZXJlckpzb24uYmFja2dyb3VuZEZpbGxTeW1ib2wpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3ltYm9sID0gdGhpcy5fbmV3U3ltYm9sKGNsYXNzYnJlYWtzW2ldLnN5bWJvbCk7XG4gICAgICB9XG4gICAgICBzeW1ib2wudmFsID0gY2xhc3NicmVha3NbaV0uY2xhc3NNYXhWYWx1ZTtcbiAgICAgIHRoaXMuX3N5bWJvbHMucHVzaChzeW1ib2wpO1xuICAgIH1cbiAgICAvLyBzb3J0IHRoZSBzeW1ib2xzIGluIGFzY2VuZGluZyB2YWx1ZVxuICAgIHRoaXMuX3N5bWJvbHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGEudmFsID4gYi52YWwgPyAxIDogLTE7XG4gICAgfSk7XG4gICAgdGhpcy5fY3JlYXRlRGVmYXVsdFN5bWJvbCgpO1xuICAgIHRoaXMuX21heFZhbHVlID0gdGhpcy5fc3ltYm9sc1t0aGlzLl9zeW1ib2xzLmxlbmd0aCAtIDFdLnZhbDtcbiAgfSxcblxuICBfZ2V0U3ltYm9sOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgIHZhciB2YWwgPSBmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5fZmllbGRdO1xuICAgIGlmICh0aGlzLl9ub3JtYWxpemF0aW9uRmllbGQpIHtcbiAgICAgIHZhciBub3JtVmFsdWUgPSBmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5fbm9ybWFsaXphdGlvbkZpZWxkXTtcbiAgICAgIGlmICghaXNOYU4obm9ybVZhbHVlKSAmJiBub3JtVmFsdWUgIT09IDApIHtcbiAgICAgICAgdmFsID0gdmFsIC8gbm9ybVZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRTeW1ib2w7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHZhbCA+IHRoaXMuX21heFZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdFN5bWJvbDtcbiAgICB9XG4gICAgdmFyIHN5bWJvbCA9IHRoaXMuX3N5bWJvbHNbMF07XG4gICAgZm9yICh2YXIgaSA9IHRoaXMuX3N5bWJvbHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGlmICh2YWwgPiB0aGlzLl9zeW1ib2xzW2ldLnZhbCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHN5bWJvbCA9IHRoaXMuX3N5bWJvbHNbaV07XG4gICAgfVxuICAgIHJldHVybiBzeW1ib2w7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY2xhc3NCcmVha3NSZW5kZXJlciAocmVuZGVyZXJKc29uLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgQ2xhc3NCcmVha3NSZW5kZXJlcihyZW5kZXJlckpzb24sIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzc0JyZWFrc1JlbmRlcmVyO1xuIiwiaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vUmVuZGVyZXInO1xuXG5leHBvcnQgdmFyIFVuaXF1ZVZhbHVlUmVuZGVyZXIgPSBSZW5kZXJlci5leHRlbmQoe1xuICBpbml0aWFsaXplOiBmdW5jdGlvbiAocmVuZGVyZXJKc29uLCBvcHRpb25zKSB7XG4gICAgUmVuZGVyZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCByZW5kZXJlckpzb24sIG9wdGlvbnMpO1xuICAgIHRoaXMuX2ZpZWxkID0gdGhpcy5fcmVuZGVyZXJKc29uLmZpZWxkMTtcbiAgICB0aGlzLl9jcmVhdGVTeW1ib2xzKCk7XG4gIH0sXG5cbiAgX2NyZWF0ZVN5bWJvbHM6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3ltYm9sO1xuICAgIHZhciB1bmlxdWVzID0gdGhpcy5fcmVuZGVyZXJKc29uLnVuaXF1ZVZhbHVlSW5mb3M7XG5cbiAgICAvLyBjcmVhdGUgYSBzeW1ib2wgZm9yIGVhY2ggdW5pcXVlIHZhbHVlXG4gICAgZm9yICh2YXIgaSA9IHVuaXF1ZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHN5bWJvbCA9IHRoaXMuX25ld1N5bWJvbCh1bmlxdWVzW2ldLnN5bWJvbCk7XG4gICAgICBzeW1ib2wudmFsID0gdW5pcXVlc1tpXS52YWx1ZTtcbiAgICAgIHRoaXMuX3N5bWJvbHMucHVzaChzeW1ib2wpO1xuICAgIH1cbiAgICB0aGlzLl9jcmVhdGVEZWZhdWx0U3ltYm9sKCk7XG4gIH0sXG5cbiAgX2dldFN5bWJvbDogZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICB2YXIgdmFsID0gZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMuX2ZpZWxkXTtcbiAgICAvLyBhY2N1bXVsYXRlIHZhbHVlcyBpZiB0aGVyZSBpcyBtb3JlIHRoYW4gb25lIGZpZWxkIGRlZmluZWRcbiAgICBpZiAodGhpcy5fcmVuZGVyZXJKc29uLmZpZWxkRGVsaW1pdGVyICYmIHRoaXMuX3JlbmRlcmVySnNvbi5maWVsZDIpIHtcbiAgICAgIHZhciB2YWwyID0gZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMuX3JlbmRlcmVySnNvbi5maWVsZDJdO1xuICAgICAgaWYgKHZhbDIpIHtcbiAgICAgICAgdmFsICs9IHRoaXMuX3JlbmRlcmVySnNvbi5maWVsZERlbGltaXRlciArIHZhbDI7XG4gICAgICAgIHZhciB2YWwzID0gZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMuX3JlbmRlcmVySnNvbi5maWVsZDNdO1xuICAgICAgICBpZiAodmFsMykge1xuICAgICAgICAgIHZhbCArPSB0aGlzLl9yZW5kZXJlckpzb24uZmllbGREZWxpbWl0ZXIgKyB2YWwzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHN5bWJvbCA9IHRoaXMuX2RlZmF1bHRTeW1ib2w7XG4gICAgZm9yICh2YXIgaSA9IHRoaXMuX3N5bWJvbHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIC8vIHVzaW5nIHRoZSA9PT0gb3BlcmF0b3IgZG9lcyBub3Qgd29yayBpZiB0aGUgZmllbGRcbiAgICAgIC8vIG9mIHRoZSB1bmlxdWUgcmVuZGVyZXIgaXMgbm90IGEgc3RyaW5nXG4gICAgICAvKmVzbGludC1kaXNhYmxlICovXG4gICAgICBpZiAodGhpcy5fc3ltYm9sc1tpXS52YWwgPT0gdmFsKSB7XG4gICAgICAgIHN5bWJvbCA9IHRoaXMuX3N5bWJvbHNbaV07XG4gICAgICB9XG4gICAgICAvKmVzbGludC1lbmFibGUgKi9cbiAgICB9XG4gICAgcmV0dXJuIHN5bWJvbDtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVWYWx1ZVJlbmRlcmVyIChyZW5kZXJlckpzb24sIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBVbmlxdWVWYWx1ZVJlbmRlcmVyKHJlbmRlcmVySnNvbiwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVuaXF1ZVZhbHVlUmVuZGVyZXI7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IGNsYXNzQnJlYWtzUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcnMvQ2xhc3NCcmVha3NSZW5kZXJlcic7XG5pbXBvcnQgdW5pcXVlVmFsdWVSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVycy9VbmlxdWVWYWx1ZVJlbmRlcmVyJztcbmltcG9ydCBzaW1wbGVSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVycy9TaW1wbGVSZW5kZXJlcic7XG5cbkwuZXNyaS5GZWF0dXJlTGF5ZXIuYWRkSW5pdEhvb2soZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5vcHRpb25zLmlnbm9yZVJlbmRlcmVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBvbGRPbkFkZCA9IEwuVXRpbC5iaW5kKHRoaXMub25BZGQsIHRoaXMpO1xuICB2YXIgb2xkVW5iaW5kUG9wdXAgPSBMLlV0aWwuYmluZCh0aGlzLnVuYmluZFBvcHVwLCB0aGlzKTtcbiAgdmFyIG9sZE9uUmVtb3ZlID0gTC5VdGlsLmJpbmQodGhpcy5vblJlbW92ZSwgdGhpcyk7XG4gIEwuVXRpbC5iaW5kKHRoaXMuY3JlYXRlTmV3TGF5ZXIsIHRoaXMpO1xuXG4gIHRoaXMub25BZGQgPSBmdW5jdGlvbiAobWFwKSB7XG4gICAgdGhpcy5tZXRhZGF0YShmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdmYWlsZWQgdG8gbG9hZCBtZXRhZGF0YSBmcm9tIHRoZSBzZXJ2aWNlLicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5kcmF3aW5nSW5mbykge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRyYXdpbmdJbmZvKSB7XG4gICAgICAgICAgLy8gYWxsb3cgTC5lc3JpLndlYm1hcCAoYW5kIG90aGVycykgdG8gb3ZlcnJpZGUgc2VydmljZSBzeW1ib2xvZ3kgd2l0aCBpbmZvIHByb3ZpZGVkIGluIGxheWVyIGNvbnN0cnVjdG9yXG4gICAgICAgICAgcmVzcG9uc2UuZHJhd2luZ0luZm8gPSB0aGlzLm9wdGlvbnMuZHJhd2luZ0luZm87XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0UmVuZGVyZXJzKHJlc3BvbnNlKTtcbiAgICAgICAgb2xkT25BZGQobWFwKTtcbiAgICAgICAgdGhpcy5fYWRkUG9pbnRMYXllcihtYXApO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9O1xuXG4gIHRoaXMub25SZW1vdmUgPSBmdW5jdGlvbiAobWFwKSB7XG4gICAgb2xkT25SZW1vdmUobWFwKTtcbiAgICBpZiAodGhpcy5fcG9pbnRMYXllcikge1xuICAgICAgdmFyIHBvaW50TGF5ZXJzID0gdGhpcy5fcG9pbnRMYXllci5nZXRMYXllcnMoKTtcbiAgICAgIGZvciAodmFyIGkgaW4gcG9pbnRMYXllcnMpIHtcbiAgICAgICAgbWFwLnJlbW92ZUxheWVyKHBvaW50TGF5ZXJzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdGhpcy51bmJpbmRQb3B1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICBvbGRVbmJpbmRQb3B1cCgpO1xuICAgIGlmICh0aGlzLl9wb2ludExheWVyKSB7XG4gICAgICB2YXIgcG9pbnRMYXllcnMgPSB0aGlzLl9wb2ludExheWVyLmdldExheWVycygpO1xuICAgICAgZm9yICh2YXIgaSBpbiBwb2ludExheWVycykge1xuICAgICAgICBwb2ludExheWVyc1tpXS51bmJpbmRQb3B1cCgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB0aGlzLl9hZGRQb2ludExheWVyID0gZnVuY3Rpb24gKG1hcCkge1xuICAgIGlmICh0aGlzLl9wb2ludExheWVyKSB7XG4gICAgICB0aGlzLl9wb2ludExheWVyLmFkZFRvKG1hcCk7XG4gICAgICB0aGlzLl9wb2ludExheWVyLmJyaW5nVG9Gcm9udCgpO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLl9jcmVhdGVQb2ludExheWVyID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5fcG9pbnRMYXllcikge1xuICAgICAgdGhpcy5fcG9pbnRMYXllciA9IEwuZ2VvSnNvbigpO1xuICAgICAgLy8gc3RvcmUgdGhlIGZlYXR1cmUgaWRzIHRoYXQgaGF2ZSBhbHJlYWR5IGJlZW4gYWRkZWQgdG8gdGhlIG1hcFxuICAgICAgdGhpcy5fcG9pbnRMYXllcklkcyA9IHt9O1xuXG4gICAgICBpZiAodGhpcy5fcG9wdXApIHtcbiAgICAgICAgdmFyIHBvcHVwRnVuY3Rpb24gPSBmdW5jdGlvbiAoZmVhdHVyZSwgbGF5ZXIpIHtcbiAgICAgICAgICBsYXllci5iaW5kUG9wdXAodGhpcy5fcG9wdXAoZmVhdHVyZSwgbGF5ZXIpLCB0aGlzLl9wb3B1cE9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9wb2ludExheWVyLm9wdGlvbnMub25FYWNoRmVhdHVyZSA9IEwuVXRpbC5iaW5kKHBvcHVwRnVuY3Rpb24sIHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB0aGlzLmNyZWF0ZU5ld0xheWVyID0gZnVuY3Rpb24gKGdlb2pzb24pIHtcbiAgICB2YXIgZkxheWVyID0gTC5HZW9KU09OLmdlb21ldHJ5VG9MYXllcihnZW9qc29uLCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgLy8gYWRkIGEgcG9pbnQgbGF5ZXIgd2hlbiB0aGUgcG9seWdvbiBpcyByZXByZXNlbnRlZCBhcyBwcm9wb3J0aW9uYWwgbWFya2VyIHN5bWJvbHNcbiAgICBpZiAodGhpcy5faGFzUHJvcG9ydGlvbmFsU3ltYm9scykge1xuICAgICAgdmFyIGNlbnRyb2lkID0gdGhpcy5nZXRQb2x5Z29uQ2VudHJvaWQoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcyk7XG4gICAgICBpZiAoIShpc05hTihjZW50cm9pZFswXSkgfHwgaXNOYU4oY2VudHJvaWRbMF0pKSkge1xuICAgICAgICB0aGlzLl9jcmVhdGVQb2ludExheWVyKCk7XG5cbiAgICAgICAgdmFyIGZlYXR1cmVJZCA9IGdlb2pzb24uaWQudG9TdHJpbmcoKTtcbiAgICAgICAgLy8gb25seSBhZGQgdGhlIGZlYXR1cmUgaWYgaXQgZG9lcyBub3QgYWxyZWFkeSBleGlzdCBvbiB0aGUgbWFwXG4gICAgICAgIGlmICghdGhpcy5fcG9pbnRMYXllcklkc1tmZWF0dXJlSWRdKSB7XG4gICAgICAgICAgdmFyIHBvaW50anNvbiA9IHRoaXMuZ2V0UG9pbnRKc29uKGdlb2pzb24sIGNlbnRyb2lkKTtcblxuICAgICAgICAgIHRoaXMuX3BvaW50TGF5ZXIuYWRkRGF0YShwb2ludGpzb24pO1xuICAgICAgICAgIHRoaXMuX3BvaW50TGF5ZXJJZHNbZmVhdHVyZUlkXSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wb2ludExheWVyLmJyaW5nVG9Gcm9udCgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZkxheWVyO1xuICB9O1xuXG4gIHRoaXMuZ2V0UG9seWdvbkNlbnRyb2lkID0gZnVuY3Rpb24gKGNvb3JkaW5hdGVzKSB7XG4gICAgdmFyIHB0cyA9IGNvb3JkaW5hdGVzWzBdWzBdO1xuICAgIGlmIChwdHMubGVuZ3RoID09PSAyKSB7XG4gICAgICBwdHMgPSBjb29yZGluYXRlc1swXTtcbiAgICB9XG5cbiAgICB2YXIgdHdpY2VhcmVhID0gMDtcbiAgICB2YXIgeCA9IDA7XG4gICAgdmFyIHkgPSAwO1xuICAgIHZhciBuUHRzID0gcHRzLmxlbmd0aDtcbiAgICB2YXIgcDE7XG4gICAgdmFyIHAyO1xuICAgIHZhciBmO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGogPSBuUHRzIC0gMTsgaSA8IG5QdHM7IGogPSBpKyspIHtcbiAgICAgIHAxID0gcHRzW2ldOyBwMiA9IHB0c1tqXTtcbiAgICAgIHR3aWNlYXJlYSArPSBwMVswXSAqIHAyWzFdO1xuICAgICAgdHdpY2VhcmVhIC09IHAxWzFdICogcDJbMF07XG4gICAgICBmID0gcDFbMF0gKiBwMlsxXSAtIHAyWzBdICogcDFbMV07XG4gICAgICB4ICs9IChwMVswXSArIHAyWzBdKSAqIGY7XG4gICAgICB5ICs9IChwMVsxXSArIHAyWzFdKSAqIGY7XG4gICAgfVxuICAgIGYgPSB0d2ljZWFyZWEgKiAzO1xuICAgIHJldHVybiBbeCAvIGYsIHkgLyBmXTtcbiAgfTtcblxuICB0aGlzLmdldFBvaW50SnNvbiA9IGZ1bmN0aW9uIChnZW9qc29uLCBjZW50cm9pZCkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICBwcm9wZXJ0aWVzOiBnZW9qc29uLnByb3BlcnRpZXMsXG4gICAgICBpZDogZ2VvanNvbi5pZCxcbiAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBbY2VudHJvaWRbMF0sIGNlbnRyb2lkWzFdXVxuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgdGhpcy5fY2hlY2tGb3JQcm9wb3J0aW9uYWxTeW1ib2xzID0gZnVuY3Rpb24gKGdlb21ldHJ5VHlwZSwgcmVuZGVyZXIpIHtcbiAgICB0aGlzLl9oYXNQcm9wb3J0aW9uYWxTeW1ib2xzID0gZmFsc2U7XG4gICAgaWYgKGdlb21ldHJ5VHlwZSA9PT0gJ2VzcmlHZW9tZXRyeVBvbHlnb24nKSB7XG4gICAgICBpZiAocmVuZGVyZXIuYmFja2dyb3VuZEZpbGxTeW1ib2wpIHtcbiAgICAgICAgdGhpcy5faGFzUHJvcG9ydGlvbmFsU3ltYm9scyA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlIGZpcnN0IHN5bWJvbCBpbiB0aGUgY2xhc3NicmVha3MgaXMgYSBtYXJrZXIgc3ltYm9sXG4gICAgICBpZiAocmVuZGVyZXIuY2xhc3NCcmVha0luZm9zICYmIHJlbmRlcmVyLmNsYXNzQnJlYWtJbmZvcy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIHN5bSA9IHJlbmRlcmVyLmNsYXNzQnJlYWtJbmZvc1swXS5zeW1ib2w7XG4gICAgICAgIGlmIChzeW0gJiYgKHN5bS50eXBlID09PSAnZXNyaVNNUycgfHwgc3ltLnR5cGUgPT09ICdlc3JpUE1TJykpIHtcbiAgICAgICAgICB0aGlzLl9oYXNQcm9wb3J0aW9uYWxTeW1ib2xzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB0aGlzLl9zZXRSZW5kZXJlcnMgPSBmdW5jdGlvbiAoZ2VvanNvbikge1xuICAgIHZhciByZW5kO1xuICAgIHZhciByZW5kZXJlckluZm8gPSBnZW9qc29uLmRyYXdpbmdJbmZvLnJlbmRlcmVyO1xuXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB1cmw6IHRoaXMub3B0aW9ucy51cmxcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50b2tlbikge1xuICAgICAgb3B0aW9ucy50b2tlbiA9IHRoaXMub3B0aW9ucy50b2tlbjtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wYW5lKSB7XG4gICAgICBvcHRpb25zLnBhbmUgPSB0aGlzLm9wdGlvbnMucGFuZTtcbiAgICB9XG4gICAgaWYgKGdlb2pzb24uZHJhd2luZ0luZm8udHJhbnNwYXJlbmN5KSB7XG4gICAgICBvcHRpb25zLmxheWVyVHJhbnNwYXJlbmN5ID0gZ2VvanNvbi5kcmF3aW5nSW5mby50cmFuc3BhcmVuY3k7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMuc3R5bGUpIHtcbiAgICAgIG9wdGlvbnMudXNlckRlZmluZWRTdHlsZSA9IHRoaXMub3B0aW9ucy5zdHlsZTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHJlbmRlcmVySW5mby50eXBlKSB7XG4gICAgICBjYXNlICdjbGFzc0JyZWFrcyc6XG4gICAgICAgIHRoaXMuX2NoZWNrRm9yUHJvcG9ydGlvbmFsU3ltYm9scyhnZW9qc29uLmdlb21ldHJ5VHlwZSwgcmVuZGVyZXJJbmZvKTtcbiAgICAgICAgaWYgKHRoaXMuX2hhc1Byb3BvcnRpb25hbFN5bWJvbHMpIHtcbiAgICAgICAgICB0aGlzLl9jcmVhdGVQb2ludExheWVyKCk7XG4gICAgICAgICAgdmFyIHBSZW5kID0gY2xhc3NCcmVha3NSZW5kZXJlcihyZW5kZXJlckluZm8sIG9wdGlvbnMpO1xuICAgICAgICAgIHBSZW5kLmF0dGFjaFN0eWxlc1RvTGF5ZXIodGhpcy5fcG9pbnRMYXllcik7XG4gICAgICAgICAgb3B0aW9ucy5wcm9wb3J0aW9uYWxQb2x5Z29uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZW5kID0gY2xhc3NCcmVha3NSZW5kZXJlcihyZW5kZXJlckluZm8sIG9wdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3VuaXF1ZVZhbHVlJzpcbiAgICAgICAgcmVuZCA9IHVuaXF1ZVZhbHVlUmVuZGVyZXIocmVuZGVyZXJJbmZvLCBvcHRpb25zKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZW5kID0gc2ltcGxlUmVuZGVyZXIocmVuZGVyZXJJbmZvLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmVuZC5h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RyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3JDLENBQUEsT0FBTztBQUNQLENBQUEsS0FBSyxDQUFDLENBQUM7O0FBRVAsQ0FBQSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBQ2xCLENBQUEsTUFBTSxrQkFBa0IsRUFBRSxVQUFVLEtBQUssRUFBRTtBQUMzQyxDQUFBLFFBQVEsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNsQyxDQUFBLFFBQVEsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7O0FBRXZDLENBQUEsUUFBUSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQzNCLENBQUEsVUFBVSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDMUIsQ0FBQSxVQUFVLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLENBQUEsU0FBUzs7QUFFVCxDQUFBLFFBQVEsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDNUQsQ0FBQSxVQUFVLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ3BELENBQUEsVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQztBQUNwRCxDQUFBLFVBQVUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQzs7QUFFckQsQ0FBQSxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLENBQUEsT0FBTztBQUNQLENBQUEsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFBLEdBQUc7QUFDSCxDQUFBLENBQUMsQ0FBQyxDQUFDOztBQUVILENBQU8sSUFBSSxXQUFXLEdBQUcsVUFBVSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUMxRCxDQUFBLEVBQUUsT0FBTyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2hELENBQUEsQ0FBQyxDQUFDOztDQ25ESyxJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDOztBQUV4QyxDQUFBLEVBQUUsVUFBVSxFQUFFLFVBQVUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDL0MsQ0FBQSxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN2RSxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFdBQVcsRUFBRSxZQUFZO0FBQzNCLENBQUEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QyxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLGtCQUFrQixFQUFFLFlBQVk7QUFDbEMsQ0FBQSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ3JCLENBQUEsTUFBTSxjQUFjLEVBQUUsVUFBVSxLQUFLLEVBQUU7QUFDdkMsQ0FBQSxRQUFRLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDbEMsQ0FBQSxRQUFRLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ3ZDLENBQUEsUUFBUSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDOztBQUU1QixDQUFBLFFBQVEsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDOztBQUV4QixDQUFBLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0FBQ3pELENBQUEsUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDekQsQ0FBQSxRQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3JDLENBQUEsT0FBTztBQUNQLENBQUEsS0FBSyxDQUFDLENBQUM7O0FBRVAsQ0FBQSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBQ2xCLENBQUEsTUFBTSxjQUFjLEVBQUUsVUFBVSxLQUFLLEVBQUU7QUFDdkMsQ0FBQSxRQUFRLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDbEMsQ0FBQSxRQUFRLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDOztBQUV2QyxDQUFBLFFBQVEsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMzQixDQUFBLFVBQVUsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzFCLENBQUEsVUFBVSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QyxDQUFBLFNBQVM7O0FBRVQsQ0FBQSxRQUFRLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDdkUsQ0FBQSxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDL0QsQ0FBQSxVQUFVLEdBQUcs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LENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUNsQixDQUFBLE1BQU0sbUJBQW1CLEVBQUUsVUFBVSxLQUFLLEVBQUU7QUFDNUMsQ0FBQSxRQUFRLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDbEMsQ0FBQSxRQUFRLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDOztBQUV2QyxDQUFBLFFBQVEsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMzQixDQUFBLFVBQVUsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzFCLENBQUEsVUFBVSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QyxDQUFBLFNBQVM7O0FBRVQsQ0FBQSxRQUFRLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDdkUsQ0FBQSxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDL0QsQ0FBQSxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDL0QsQ0FBQSxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQzs7QUFFaEUsQ0FBQSxRQUFRLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FB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