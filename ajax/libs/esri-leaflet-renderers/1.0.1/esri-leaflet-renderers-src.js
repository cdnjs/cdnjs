/*! esri-leaflet-renderers - v1.0.1 - 2015-11-30
*   Copyright (c) 2015 Environmental Systems Research Institute, Inc.
*   Apache 2.0 License */

var EsriLeafletRenderers = {
  VERSION: '1.0.1'
};

// attach to the L.esri global if we can
if(typeof window !== 'undefined' && window.L && window.L.esri) {
  window.L.esri.Renderers = EsriLeafletRenderers;
}

// We do not have an 'Esri' variable e.g loading this file directly from source define 'Esri'
if(!Esri){
  var Esri = window.L.esri;
}


EsriLeafletRenderers.Symbol = L.Class.extend({

  initialize: function(symbolJson, options){
    this._symbolJson = symbolJson;
    this.val = null;
    this._styles = {};
    this._isDefault = false;
    this._layerTransparency = 1;
    if (options && options.layerTransparency) {
      this._layerTransparency = 1 - (options.layerTransparency / 100.0);
    }
  },

  //the geojson values returned are in points
  pixelValue: function(pointValue){
    return pointValue * 1.333;
  },

  //color is an array [r,g,b,a]
  colorValue: function(color){
    return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
  },

  alphaValue: function(color){
    var alpha = color[3] / 255.0;
    return alpha * this._layerTransparency;
  },

  getSize: function(feature, sizeInfo) {

    var attr = feature.properties,
    field = sizeInfo.field,
    size = 0,
    featureValue = null;

    if(field){
      featureValue = attr[field];
      var minSize = sizeInfo.minSize,
      maxSize = sizeInfo.maxSize,
      minDataValue = sizeInfo.minDataValue,
      maxDataValue = sizeInfo.maxDataValue,
      featureRatio,
      normField = sizeInfo.normalizationField,
      normValue = attr ? parseFloat(attr[normField]) : undefined;

      if(featureValue === null || (normField && ((isNaN(normValue) || normValue === 0)))){
       return null;
      }

      if(!isNaN(normValue)){
        featureValue /= normValue;
      }

      if(minSize !== null && maxSize !== null && minDataValue !== null && maxDataValue !== null){
        if(featureValue <= minDataValue){
          size = minSize;
        }
        else if(featureValue >= maxDataValue){
          size = maxSize;
        }
        else{
          featureRatio = (featureValue - minDataValue) / (maxDataValue - minDataValue);
          size = minSize + (featureRatio * (maxSize - minSize));
        }
      }
      size = isNaN(size) ? 0 : size;
    }
    return size;
  },

  getColor: function(feature, colorInfo) {
    //required information to get color
    if(!(feature.properties && colorInfo && colorInfo.field && colorInfo.stops)){
      return null;
    }

    var attr = feature.properties;
    var featureValue = attr[colorInfo.field];
    var lowerBoundColor, upperBoundColor, lowerBound, upperBound;
    var normField = colorInfo.normalizationField;
    var normValue = attr ? parseFloat(attr[normField]) : undefined;
    if(featureValue === null || (normField && ((isNaN(normValue) || normValue === 0)))){
      return null;
    }

    if(!isNaN(normValue)){
      featureValue /= normValue;
    }

    if(featureValue <= colorInfo.stops[0].value){
      return colorInfo.stops[0].color;
    }
    var lastStop = colorInfo.stops[colorInfo.stops.length - 1];
    if(featureValue >= lastStop.value){
      return lastStop.color;
    }

    //go through the stops to find min and max
    for(var i=0; i<colorInfo.stops.length; i++){
      var stopInfo = colorInfo.stops[i];

      if(stopInfo.value <= featureValue){
        lowerBoundColor = stopInfo.color;
        lowerBound = stopInfo.value;

      }else if(stopInfo.value > featureValue){
        upperBoundColor = stopInfo.color;
        upperBound = stopInfo.value;
        break;
      }
    }

    //feature falls between two stops, interplate the colors
    if(!isNaN(lowerBound) && !isNaN(upperBound)){
      var range = upperBound - lowerBound;
      if(range > 0){
        //more weight the further it is from the lower bound
        var upperBoundColorWeight = (featureValue - lowerBound) / range;
        if(upperBoundColorWeight){
          //more weight the further it is from the upper bound
          var lowerBoundColorWeight = (upperBound - featureValue) / range;
          if(lowerBoundColorWeight){

            //interpolate the lower and upper bound color by applying the
            //weights to each of the rgba colors and adding them together
            var interpolatedColor = [];
            for(var j=0; j<4; j++){
              interpolatedColor[j] = Math.round(lowerBoundColor[j] * lowerBoundColorWeight + upperBoundColor[j] * upperBoundColorWeight); 
            }
            return interpolatedColor;
          } else {
            //no difference between featureValue and upperBound, 100% of upperBoundColor
            return upperBoundColor;
          }
        } else {
          //no difference between featureValue and lowerBound, 100% of lowerBoundColor
          return lowerBoundColor;
        }
      }
    }
    //if we get to here, none of the cases apply so return null
    return null;
  }
});


EsriLeafletRenderers.PointSymbol = EsriLeafletRenderers.Symbol.extend({
  statics: {
    MARKERTYPES:  ['esriSMSCircle','esriSMSCross', 'esriSMSDiamond', 'esriSMSSquare', 'esriSMSX', 'esriPMS']
  },
  initialize: function(symbolJson, options){
    EsriLeafletRenderers.Symbol.prototype.initialize.call(this, symbolJson, options);
    if(options) {
      this.serviceUrl = options.url;
    }
    if(symbolJson){
      if(symbolJson.type === 'esriPMS'){
        var url = this.serviceUrl + 'images/' + this._symbolJson.url;
        this._iconUrl = options && options.token ? url + '?token=' + options.token : url;
        //leaflet does not allow resizing icons so keep a hash of different
        //icon sizes to try and keep down on the number of icons created
        this._icons = {};
        //create base icon
        this.icon = this._createIcon(this._symbolJson);
      } else {
        this._fillStyles();
      }
    }
  },

  _fillStyles: function(){
    if(this._symbolJson.outline && this._symbolJson.size > 0){
      this._styles.stroke = true;
      this._styles.weight = this.pixelValue(this._symbolJson.outline.width);
      this._styles.color = this.colorValue(this._symbolJson.outline.color);
      this._styles.opacity = this.alphaValue(this._symbolJson.outline.color);
    }else{
      this._styles.stroke = false;
    }
    if(this._symbolJson.color){
      this._styles.fillColor = this.colorValue(this._symbolJson.color);
      this._styles.fillOpacity = this.alphaValue(this._symbolJson.color);
    } else {
      this._styles.fillOpacity = 0;
    }

    if(this._symbolJson.style === 'esriSMSCircle'){
      this._styles.radius = this.pixelValue(this._symbolJson.size) / 2.0;
    }
  },

  _createIcon: function(options){
    var width = this.pixelValue(options.width);
    var height = width;
    if(options.height){
      height = this.pixelValue(options.height);
    }
    var xOffset = width / 2.0;
    var yOffset = height / 2.0;


    if(options.xoffset){
       xOffset += this.pixelValue(options.xoffset);
    }
    if(options.yoffset){
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

  _getIcon: function(size) {
    //check to see if it is already created by size
    var icon = this._icons[size.toString()];
    if(!icon){
      icon = this._createIcon({width: size});
    }
    return icon;
  },

  pointToLayer: function(geojson, latlng, visualVariables){
    var size = this._symbolJson.size || this._symbolJson.width;
    if(!this._isDefault){
      if( visualVariables.sizeInfo) {
        var calculatedSize = this.getSize(geojson, visualVariables.sizeInfo);
        if (calculatedSize) {
          size = calculatedSize;
        }
      }
      if(visualVariables.colorInfo){
        var color = this.getColor(geojson, visualVariables.colorInfo);
        if(color){
          this._styles.fillColor = this.colorValue(color);
          this._styles.fillOpacity = this.alphaValue(color);
        }
      }
    }

    if (this._symbolJson.type === 'esriPMS'){
      return L.marker(latlng, {icon: this._getIcon(size)});
    }
    size = this.pixelValue(size);

    switch(this._symbolJson.style){
      case 'esriSMSSquare':
        return EsriLeafletRenderers.squareMarker(latlng, size, this._styles);
      case 'esriSMSDiamond':
        return EsriLeafletRenderers.diamondMarker(latlng, size, this._styles);
      case 'esriSMSCross':
        return EsriLeafletRenderers.crossMarker(latlng, size, this._styles);
      case 'esriSMSX':
        return EsriLeafletRenderers.xMarker(latlng, size, this._styles);
    }
    this._styles.radius = size / 2.0;
    return L.circleMarker(latlng, this._styles);
  }
});
EsriLeafletRenderers.pointSymbol = function(symbolJson, options){
  return new EsriLeafletRenderers.PointSymbol(symbolJson, options);
};


EsriLeafletRenderers.LineSymbol = EsriLeafletRenderers.Symbol.extend({
  statics: {
    //Not implemented 'esriSLSNull'
    LINETYPES:  ['esriSLSDash','esriSLSDot','esriSLSDashDotDot','esriSLSDashDot','esriSLSSolid']
  },
  initialize: function(symbolJson, options){
    EsriLeafletRenderers.Symbol.prototype.initialize.call(this, symbolJson, options);
    this._fillStyles();
  },

  _fillStyles: function(){
    //set the defaults that show up on arcgis online
    this._styles.lineCap = 'butt';
    this._styles.lineJoin = 'miter';
    this._styles.fill = false;

    if (!this._symbolJson){
      return;
    }

    if(this._symbolJson.color ){
      this._styles.color = this.colorValue(this._symbolJson.color);
      this._styles.opacity = this.alphaValue(this._symbolJson.color);
    }

    if(this._symbolJson.width){
      this._styles.weight = this.pixelValue(this._symbolJson.width);
      
      var dashValues = [];

      switch(this._symbolJson.style){
        case 'esriSLSDash':
          dashValues = [4,3];
          break;
        case 'esriSLSDot':
          dashValues = [1,3];
          break;
        case 'esriSLSDashDot':
          dashValues = [8,3,1,3];
          break;
        case 'esriSLSDashDotDot':
          dashValues = [8,3,1,3,1,3];
          break;
      }

      //use the dash values and the line weight to set dash array
      if (dashValues.length > 0) {
        for (var i = 0; i < dashValues.length; i++){
          dashValues[i] *= this._styles.weight;
        }

        this._styles.dashArray = dashValues.join(',');
      }
    }
  },

  style: function(feature, visualVariables){
    if(!this._isDefault && visualVariables){
      if(visualVariables.sizeInfo){
        var calculatedSize = this.pixelValue(this.getSize(feature, visualVariables.sizeInfo));
        if (calculatedSize) {
          this._styles.weight = calculatedSize;
        }
      }
      if(visualVariables.colorInfo){
        var color = this.getColor(feature, visualVariables.colorInfo);
        if(color){
          this._styles.color = this.colorValue(color);
          this._styles.opacity = this.alphaValue(color);
        }
      }
    }
    return this._styles;
  }
});
EsriLeafletRenderers.lineSymbol = function(symbolJson, options){
  return new EsriLeafletRenderers.LineSymbol(symbolJson, options);
};


EsriLeafletRenderers.PolygonSymbol = EsriLeafletRenderers.Symbol.extend({
  statics: {
    //not implemented: 'esriSFSBackwardDiagonal','esriSFSCross','esriSFSDiagonalCross','esriSFSForwardDiagonal','esriSFSHorizontal','esriSFSNull','esriSFSVertical'
    POLYGONTYPES:  ['esriSFSSolid']
  },
  initialize: function(symbolJson, options){
    EsriLeafletRenderers.Symbol.prototype.initialize.call(this, symbolJson, options);
    if (symbolJson){
      this._lineStyles = EsriLeafletRenderers.lineSymbol(symbolJson.outline, options).style();
      this._fillStyles();
    }
  },

  _fillStyles: function(){
    if (this._lineStyles) {
      if (this._lineStyles.weight === 0){
        //when weight is 0, setting the stroke to false can still look bad
        //(gaps between the polygons)
        this._styles.stroke = false;
      } else {
        //copy the line symbol styles into this symbol's styles
        for (var styleAttr in this._lineStyles){
          this._styles[styleAttr] = this._lineStyles[styleAttr];
        }
      }
    }

    //set the fill for the polygon
    if (this._symbolJson) {
      if (this._symbolJson.color &&
          //don't fill polygon if type is not supported
          EsriLeafletRenderers.PolygonSymbol.POLYGONTYPES.indexOf(this._symbolJson.style >= 0)) {

        this._styles.fill = true;
        this._styles.fillColor = this.colorValue(this._symbolJson.color);
        this._styles.fillOpacity = this.alphaValue(this._symbolJson.color);
      } else {
        this._styles.fill = false;
        this._styles.fillOpacity = 0;
      }
    }

  },

  style: function(feature, visualVariables) {
    if(!this._isDefault && visualVariables && visualVariables.colorInfo){
      var color = this.getColor(feature, visualVariables.colorInfo);
      if(color){
        this._styles.fillColor = this.colorValue(color);
        this._styles.fillOpacity = this.alphaValue(color);
      }
    }
    return this._styles;
  }
});
EsriLeafletRenderers.polygonSymbol = function(symbolJson, options){
  return new EsriLeafletRenderers.PolygonSymbol(symbolJson, options);
};


EsriLeafletRenderers.Renderer = L.Class.extend({

  options: {
    proportionalPolygon: false,
    clickable: true
  },

  initialize: function(rendererJson, options){
    this._rendererJson = rendererJson;
    this._pointSymbols = false;
    this._symbols = [];
    this._visualVariables = this._parseVisualVariables(rendererJson.visualVariables);
    L.Util.setOptions(this, options);
  },

  _parseVisualVariables: function(visualVariables){
    var visVars = {};
    if (visualVariables) {
      for (var i = 0; i < visualVariables.length; i++){
        visVars[visualVariables[i].type] = visualVariables[i];
      }
    }
    return visVars;
  },

  _createDefaultSymbol: function(){
    if(this._rendererJson.defaultSymbol){
      this._defaultSymbol = this._newSymbol(this._rendererJson.defaultSymbol);
      this._defaultSymbol._isDefault = true;
    }
  },

  _newSymbol: function(symbolJson){
    if(symbolJson.type === 'esriSMS' || symbolJson.type === 'esriPMS'){
      this._pointSymbols = true;
      return EsriLeafletRenderers.pointSymbol(symbolJson, this.options);
    }
    if(symbolJson.type === 'esriSLS'){
      return EsriLeafletRenderers.lineSymbol(symbolJson, this.options);
    }
    if(symbolJson.type === 'esriSFS'){
      return EsriLeafletRenderers.polygonSymbol(symbolJson, this.options);
    }
  },

  _getSymbol: function(){
    //override
  },

  attachStylesToLayer: function(layer){
    if(this._pointSymbols){
      layer.options.pointToLayer = L.Util.bind(this.pointToLayer, this);
    } else {
      layer.options.style = L.Util.bind(this.style, this);
    }
  },

  pointToLayer: function(geojson, latlng){
    var sym = this._getSymbol(geojson);
    if(sym && sym.pointToLayer){
      return sym.pointToLayer(geojson, latlng, this._visualVariables);
    }
    //invisible symbology
    return L.circleMarker(latlng, {radius: 0, opacity: 0});
  },

  style: function(feature){
    //find the symbol to represent this feature
    var sym = this._getSymbol(feature);
    if(sym){
      return sym.style(feature, this._visualVariables);
    }else{
      //invisible symbology
      return {opacity: 0, fillOpacity: 0};
    }
  }
});


EsriLeafletRenderers.SimpleRenderer = EsriLeafletRenderers.Renderer.extend({

  initialize: function(rendererJson, options){
    EsriLeafletRenderers.Renderer.prototype.initialize.call(this, rendererJson, options);
    this._createSymbol();
  },

  _createSymbol: function(){
    if(this._rendererJson.symbol){
      this._symbols.push(this._newSymbol(this._rendererJson.symbol));
    }
  },

  _getSymbol: function(){
    return this._symbols[0];
  }
});

EsriLeafletRenderers.simpleRenderer = function(rendererJson, options){
  return new EsriLeafletRenderers.SimpleRenderer(rendererJson, options);
};


EsriLeafletRenderers.ClassBreaksRenderer = EsriLeafletRenderers.Renderer.extend({

  initialize: function(rendererJson, options){
    EsriLeafletRenderers.Renderer.prototype.initialize.call(this, rendererJson, options);
    this._field = this._rendererJson.field;
    if (this._rendererJson.normalizationType && this._rendererJson.normalizationType === 'esriNormalizeByField'){
      this._normalizationField = this._rendererJson.normalizationField;
    }
    this._createSymbols();
  },

  _createSymbols: function(){
    var symbol,
        classbreaks = this._rendererJson.classBreakInfos;

    this._symbols = [];

    //create a symbol for each class break
    for (var i = classbreaks.length  - 1; i >= 0; i--){
      if(this.options.proportionalPolygon && this._rendererJson.backgroundFillSymbol){
        symbol = this._newSymbol(this._rendererJson.backgroundFillSymbol);
      } else {
        symbol = this._newSymbol(classbreaks[i].symbol);
      }
      symbol.val = classbreaks[i].classMaxValue;
      this._symbols.push(symbol);
    }
    //sort the symbols in ascending value
    this._symbols.sort(function(a, b){
      return a.val > b.val ? 1 : -1;
    });
    this._createDefaultSymbol();
    this._maxValue = this._symbols[this._symbols.length - 1].val;
  },

  _getSymbol: function(feature){
    var val = feature.properties[this._field];
    if (this._normalizationField){
      var normValue = feature.properties[this._normalizationField];
      if (!isNaN(normValue) && normValue !== 0) {
        val = val / normValue;
      } else {
        return this._defaultSymbol;
      }
    }

    if(val > this._maxValue){
      return this._defaultSymbol;
    }
    var symbol = this._symbols[0];
    for (var i = this._symbols.length - 1; i >= 0; i--){
      if(val > this._symbols[i].val){
        break;
      }
      symbol = this._symbols[i];
    }
    return symbol;
  }
});

EsriLeafletRenderers.classBreaksRenderer = function(rendererJson, options){
  return new EsriLeafletRenderers.ClassBreaksRenderer(rendererJson, options);
};


EsriLeafletRenderers.UniqueValueRenderer = EsriLeafletRenderers.Renderer.extend({

  initialize: function(rendererJson, options){
    EsriLeafletRenderers.Renderer.prototype.initialize.call(this, rendererJson, options);

    this._field = this._rendererJson.field1;
    this._createSymbols();
  },

  _createSymbols: function(){
    var symbol, uniques = this._rendererJson.uniqueValueInfos;

    //create a symbol for each unique value
    for (var i = uniques.length  - 1; i >= 0; i--){
      symbol = this._newSymbol(uniques[i].symbol);
      symbol.val = uniques[i].value;
      this._symbols.push(symbol);
    }
    this._createDefaultSymbol();
  },

  /* jshint ignore:start */
  _getSymbol: function(feature){
    var val = feature.properties[this._field];
    //accumulate values if there is more than one field defined
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
    for (var i = this._symbols.length  - 1; i >= 0; i--){
      //using the === operator does not work if the field
      //of the unique renderer is not a string
      if(this._symbols[i].val == val){
        symbol = this._symbols[i];
      }
    }
    return symbol;
  }
  /* jshint ignore:end */
});

EsriLeafletRenderers.uniqueValueRenderer = function(rendererJson, options){
  return new EsriLeafletRenderers.UniqueValueRenderer(rendererJson, options);
};


EsriLeafletRenderers.SquareMarker = L.Path.extend({
  options: {
    fill: true
  },

  initialize: function(center, size, options){
    L.Path.prototype.initialize.call(this, options);
    this._size = size;
    this._center = center;
  },

  projectLatlngs: function(){
    this._point = this._map.latLngToLayerPoint(this._center);
  },

  getPathString: function(){
    if (!this._map){
      return '';
    }

    var center = this._point,
        offset = this._size / 2.0;

    if(L.Path.VML){
      center._round();
      offset = Math.round(offset);
    }

    var str = 'M' + (center.x + offset) + ',' + (center.y + offset) +
      'L' + (center.x - offset) + ',' + (center.y + offset) +
      'L' + (center.x - offset) + ',' + (center.y - offset) +
      'L' + (center.x + offset) + ',' + (center.y - offset);

    return str + (L.Browser.svg ? 'z' : 'x');
  },

  setLatLng: function(latlng){
    this._center = latlng;
    return this.redraw();
  },

  getLatLng: function(){
    return L.latLng(this._center);
  },

  getSize: function(){
    return this._size;
  },

  setSize: function(size){
    this._size = size;
    return this.redraw();
  }
});

EsriLeafletRenderers.squareMarker = function(center, size, options){
  return new EsriLeafletRenderers.SquareMarker(center, size, options);
};


EsriLeafletRenderers.DiamondMarker = L.Path.extend({
  options: {
    fill: true
  },

  initialize: function(center, size, options){
    L.Path.prototype.initialize.call(this, options);
    this._size = size;
    this._center = center;
  },

  projectLatlngs: function(){
    this._point = this._map.latLngToLayerPoint(this._center);
  },

  getPathString: function(){
    if (!this._map){
      return '';
    }

    var center = this._point,
        offset = this._size / 2.0;

    if(L.Path.VML){
      center._round();
      offset = Math.round(offset);
    }

    var str = 'M' + center.x + ',' + (center.y + offset) +
      'L' + (center.x - offset) + ',' + center.y +
      'L' + center.x + ',' + (center.y - offset) +
      'L' + (center.x + offset) + ',' + center.y;

    return str + (L.Browser.svg ? 'z' : 'x');
  },

  setLatLng: function(latlng){
    this._center = latlng;
    return this.redraw();
  },

  getLatLng: function(){
    return L.latLng(this._center);
  },

  getSize: function(){
    return this._size;
  },

  setSize: function(size){
    this._size = size;
    return this.redraw();
  }
});

EsriLeafletRenderers.diamondMarker = function(center, size, options){
  return new EsriLeafletRenderers.DiamondMarker(center, size, options);
};


EsriLeafletRenderers.CrossMarker = L.Path.extend({
  initialize: function (center, size, options){
    L.Path.prototype.initialize.call(this, options);
    this._size = size;
    this._center = center;
  },

  projectLatlngs: function(){
    this._point = this._map.latLngToLayerPoint(this._center);
  },

  getPathString: function(){
    if (!this._map){
      return '';
    }

    var center = this._point,
        offset = this._size / 2.0;

    if(L.Path.VML){
      center._round();
      offset = Math.round(offset);
    }

    return 'M' + center.x + ',' + (center.y + offset) +
      'L' + center.x + ',' + (center.y - offset) +
      'M' + (center.x - offset) + ',' + center.y +
      'L' + (center.x + offset) + ',' + center.y;
  },

  setLatLng: function(latlng){
    this._center = latlng;
    return this.redraw();
  },

  getLatLng: function(){
    return L.latLng(this._center);
  },

  getSize: function(){
    return this._size;
  },

  setSize: function(size){
    this._size = size;
    return this.redraw();
  }
});

EsriLeafletRenderers.crossMarker = function(center, size, options){
  return new EsriLeafletRenderers.CrossMarker(center, size, options);
};


EsriLeafletRenderers.XMarker = L.Path.extend({
  initialize: function(center, size, options){
    L.Path.prototype.initialize.call(this, options);
    this._size = size;
    this._center = center;
  },

  projectLatlngs: function(){
    this._point = this._map.latLngToLayerPoint(this._center);
  },

  getPathString: function(){
    if (!this._map){
      return '';
    }

    var center = this._point,
        offset = this._size / 2.0;

    if(L.Path.VML){
      center._round();
      offset = Math.round(offset);
    }

    return 'M' + (center.x + offset) + ',' + (center.y + offset) +
      'L' + (center.x - offset) + ',' + (center.y - offset) +
      'M' + (center.x - offset) + ',' + (center.y + offset) +
      'L' + (center.x + offset) + ',' + (center.y - offset);
  },

  setLatLng: function(latlng){
    this._center = latlng;
    return this.redraw();
  },

  getLatLng: function(){
    return L.latLng(this._center);
  },

  getSize: function(){
    return this._size;
  },

  setSize: function(size){
    this._size = size;
    return this.redraw();
  }
});

EsriLeafletRenderers.xMarker = function(center, size, options){
  return new EsriLeafletRenderers.XMarker(center, size, options);
};


var initializeRenderers = function() {
  var oldOnAdd = L.Util.bind(this.onAdd, this);
  var oldUnbindPopup = L.Util.bind(this.unbindPopup, this);
  var oldOnRemove = L.Util.bind(this.onRemove, this);
  L.Util.bind(this.createNewLayer, this);

  this.metadata(function(error, response) {
    if(error) {
      return;
    }
    if(response && response.drawingInfo && !this.options.style){
      this._setRenderers(response);
    }

    this._metadataLoaded = true;
    if(this._loadedMap){
      oldOnAdd(this._loadedMap);
      this._addPointLayer(this._loadedMap);
    }
  }, this);

  this.onAdd = function(map){

    this._loadedMap = map;
    if(this._metadataLoaded){
      oldOnAdd(this._loadedMap);
      this._addPointLayer(this._loadedMap);
    }
  };

  this.onRemove = function(map){
    oldOnRemove(map);
    if(this._pointLayer){
      var pointLayers = this._pointLayer.getLayers();
      for(var i in pointLayers){
        map.removeLayer(pointLayers[i]);
      }
    }
  };

  this.unbindPopup = function(){
    oldUnbindPopup();
    if(this._pointLayer){
      var pointLayers = this._pointLayer.getLayers();
      for(var i in pointLayers){
        pointLayers[i].unbindPopup();
      }
    }
  };

  this._addPointLayer = function(map){
    if(this._pointLayer){
      this._pointLayer.addTo(map);
      this._pointLayer.bringToFront();
    }
  };

  this._createPointLayer = function(){
    if(!this._pointLayer){
      this._pointLayer = L.geoJson();
      //store the feature ids that have already been added to the map
      this._pointLayerIds = {};

      if(this._popup){
        var popupFunction = function (feature, layer) {
          layer.bindPopup(this._popup(feature, layer), this._popupOptions);
        };
        this._pointLayer.options.onEachFeature = L.Util.bind(popupFunction, this);
      }
    }
  };

  this.createNewLayer = function(geojson){

    var fLayer = L.GeoJSON.geometryToLayer(geojson, this.options.pointToLayer, L.GeoJSON.coordsToLatLng, this.options);

    //add a point layer when the polygon is represented as proportional marker symbols
    if(this._hasProportionalSymbols){
      var centroid = this.getPolygonCentroid(geojson.geometry.coordinates);
      if(!(isNaN(centroid[0]) || isNaN(centroid[0]))){
        this._createPointLayer();

        var featureId = geojson.id.toString();
        //only add the feature if it does not already exist on the map
        if(!this._pointLayerIds[featureId]){
          var pointjson = this.getPointJson(geojson, centroid);

          this._pointLayer.addData(pointjson);
          this._pointLayerIds[featureId] = true;
        }

        this._pointLayer.bringToFront();
      }
    }
    return fLayer;
  };

  this.getPolygonCentroid = function(coordinates){
    var pts = coordinates[0][0];
    if(pts.length === 2){
      pts = coordinates[0];
    }


    var twicearea=0,
    x=0, y=0,
    nPts = pts.length,
    p1, p2, f;

    for (var i=0, j=nPts-1 ;i<nPts;j=i++) {
      p1=pts[i]; p2=pts[j];
      twicearea+=p1[0]*p2[1];
      twicearea-=p1[1]*p2[0];
      f=p1[0]*p2[1]-p2[0]*p1[1];
      x+=(p1[0]+p2[0])*f;
      y+=(p1[1]+p2[1])*f;
    }
    f=twicearea*3;
    return [x/f,y/f];
  };

  this.getPointJson = function(geojson, centroid){
    return {
      type: 'Feature',
      properties: geojson.properties,
      id: geojson.id,
      geometry: {
        type: 'Point',
        coordinates: [centroid[0],centroid[1]]
      }
    };
  };

  this._checkForProportionalSymbols = function(geometryType, renderer){
    this._hasProportionalSymbols = false;
    if(geometryType === 'esriGeometryPolygon'){
      if(renderer.backgroundFillSymbol){
        this._hasProportionalSymbols = true;
      }
      //check to see if the first symbol in the classbreaks is a marker symbol
      if(renderer.classBreakInfos && renderer.classBreakInfos.length){

        var sym = renderer.classBreakInfos[0].symbol;
        if(sym && (sym.type === 'esriSMS' || sym.type === 'esriPMS')){
          this._hasProportionalSymbols = true;
        }
      }
    }
  };

  this._setRenderers = function(geojson){
    var rend,
    rendererInfo = geojson.drawingInfo.renderer,
    options = {
        url: this.url ? this.url : this._service.options.url,
        token: this._service.options.token
    };
    if(geojson.drawingInfo.transparency) {
      options.layerTransparency = geojson.drawingInfo.transparency;
    }

    switch(rendererInfo.type){
      case 'classBreaks':
        this._checkForProportionalSymbols(geojson.geometryType, rendererInfo);
        if(this._hasProportionalSymbols){
          this._createPointLayer();
          var pRend = EsriLeafletRenderers.classBreaksRenderer(rendererInfo, options);
          pRend.attachStylesToLayer(this._pointLayer);
          options.proportionalPolygon = true;
        }
        rend = EsriLeafletRenderers.classBreaksRenderer(rendererInfo, options);
        break;
      case 'uniqueValue':
        rend = EsriLeafletRenderers.uniqueValueRenderer(rendererInfo, options);
        break;
      default:
        rend = EsriLeafletRenderers.simpleRenderer(rendererInfo, options);
    }
    rend.attachStylesToLayer(this);
  };
};

Esri.FeatureLayer.addInitHook(initializeRenderers);
if (Esri.ClusteredFeatureLayer) {
  Esri.ClusteredFeatureLayer.addInitHook(initializeRenderers);
}
