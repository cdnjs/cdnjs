/* esri-leaflet-renderers - v2.1.3 - Tue Mar 08 2022 09:17:40 GMT-0600 (Central Standard Time)
 * Copyright (c) 2022 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet'), require('esri-leaflet'), require('esri-leaflet-cluster')) :
  typeof define === 'function' && define.amd ? define(['exports', 'leaflet', 'esri-leaflet', 'esri-leaflet-cluster'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}, global.L.esri.Renderers = {}), global.L, global.L.esri, global.L.esri.Cluster));
})(this, (function (exports, L, EsriLeaflet, EsriLeafletCluster) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var L__default = /*#__PURE__*/_interopDefaultLegacy(L);
  var EsriLeaflet__namespace = /*#__PURE__*/_interopNamespace(EsriLeaflet);
  var EsriLeafletCluster__default = /*#__PURE__*/_interopDefaultLegacy(EsriLeafletCluster);

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

  var ShapeMarker = L__default["default"].Path.extend({

    initialize: function (latlng, size, options) {
      L__default["default"].setOptions(this, options);
      this._size = size;
      this._latlng = L__default["default"].latLng(latlng);
      this._svgCanvasIncludes();
    },

    toGeoJSON: function () {
      return L__default["default"].GeoJSON.getFeature(this, {
        type: 'Point',
        coordinates: L__default["default"].GeoJSON.latLngToCoords(this.getLatLng())
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
      this._latlng = L__default["default"].latLng(latlng);
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
      L__default["default"].Canvas.include({
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

      L__default["default"].SVG.include({
        _updateCrossMarker: function (layer) {
          var latlng = layer._point;
          var offset = layer._size / 2.0;

          if (L__default["default"].Browser.vml) {
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
      L__default["default"].Canvas.include({
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

      L__default["default"].SVG.include({
        _updateXMarker: function (layer) {
          var latlng = layer._point;
          var offset = layer._size / 2.0;

          if (L__default["default"].Browser.vml) {
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
      L__default["default"].Canvas.include({
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

      L__default["default"].SVG.include({
        _updateSquareMarker: function (layer) {
          var latlng = layer._point;
          var offset = layer._size / 2.0;

          if (L__default["default"].Browser.vml) {
            latlng._round();
            offset = Math.round(offset);
          }

          var str = 'M' + (latlng.x + offset) + ',' + (latlng.y + offset) +
            'L' + (latlng.x - offset) + ',' + (latlng.y + offset) +
            'L' + (latlng.x - offset) + ',' + (latlng.y - offset) +
            'L' + (latlng.x + offset) + ',' + (latlng.y - offset);

          str = str + (L__default["default"].Browser.svg ? 'z' : 'x');

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
      L__default["default"].Canvas.include({
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

      L__default["default"].SVG.include({
        _updateDiamondMarker: function (layer) {
          var latlng = layer._point;
          var offset = layer._size / 2.0;

          if (L__default["default"].Browser.vml) {
            latlng._round();
            offset = Math.round(offset);
          }

          var str = 'M' + latlng.x + ',' + (latlng.y + offset) +
            'L' + (latlng.x - offset) + ',' + latlng.y +
            'L' + latlng.x + ',' + (latlng.y - offset) +
            'L' + (latlng.x + offset) + ',' + latlng.y;

          str = str + (L__default["default"].Browser.svg ? 'z' : 'x');

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
        icon = this._createIcon({ width: size });
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
        var layerOptions = L.extend({}, { icon: this._getIcon(size) }, options);
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
      return L.circleMarker(latlng, { radius: 0, opacity: 0 });
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
        return this.mergeStyles({ opacity: 0, fillOpacity: 0 }, userStyles);
      }
    },

    mergeStyles: function (styles, userStyles) {
      var mergedStyles = {};
      var attr;
      // copy renderer style attributes
      for (attr in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, attr)) {
          mergedStyles[attr] = styles[attr];
        }
      }
      // override with user defined style attributes
      if (userStyles) {
        for (attr in userStyles) {
          if (Object.prototype.hasOwnProperty.call(userStyles, attr)) {
            mergedStyles[attr] = userStyles[attr];
          }
        }
      }
      return mergedStyles;
    }
  });

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
        /* eslint-enable */
      }
      return symbol;
    }
  });

  function uniqueValueRenderer (rendererJson, options) {
    return new UniqueValueRenderer(rendererJson, options);
  }

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

  function wireUpRenderers () {
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
        f = (p1[0] * p2[1]) - (p2[0] * p1[1]);
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
  }

  EsriLeaflet__namespace.FeatureLayer.addInitHook(wireUpRenderers);

  if (typeof EsriLeafletCluster__default["default"] !== 'undefined') {
    EsriLeafletCluster__default["default"].FeatureLayer.addInitHook(wireUpRenderers);
  }

  var version = "2.1.3";

  exports.ClassBreaksRenderer = ClassBreaksRenderer;
  exports.LineSymbol = LineSymbol;
  exports.PointSymbol = PointSymbol;
  exports.PolygonSymbol = PolygonSymbol;
  exports.Renderer = Renderer;
  exports.SimpleRenderer = SimpleRenderer;
  exports.Symbol = Symbol;
  exports.UniqueValueRenderer = UniqueValueRenderer;
  exports.VERSION = version;
  exports.classBreaksRenderer = classBreaksRenderer;
  exports.lineSymbol = lineSymbol;
  exports.pointSymbol = pointSymbol;
  exports.polygonSymbol = polygonSymbol;
  exports.simpleRenderer = simpleRenderer;
  exports.uniqueValueRenderer = uniqueValueRenderer;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=esri-leaflet-renderers-debug.js.map
