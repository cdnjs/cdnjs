/**
 * jVectorMap version 0.2.1
 *
 * Copyright 2011-2012, Kirill Lebedev
 * Licensed under the MIT license.
 *
 */
(function( $ ){
  var apiParams = {
        colors: 1,
        values: 1,
        backgroundColor: 1,
        scaleColors: 1,
        normalizeFunction: 1
      },
      apiEvents = {
        onLabelShow: 'labelShow',
        onRegionOver: 'regionOver',
        onRegionOut: 'regionOut',
        onRegionClick: 'regionClick',
        onMarkerLabelShow: 'markerLabelShow',
        onMarkerOver: 'markerOver',
        onMarkerOut: 'markerOut',
        onMarkerClick: 'markerClick'
      };

  $.fn.vectorMap = function(options) {
    var defaultParams = {
          map: 'world_en',
          backgroundColor: '#505050',
          color: '#ffffff',
          hoverColor: 'black',
          scaleColors: ['#b6d6ff', '#005ace'],
          normalizeFunction: 'linear'
        },
        map,
        methodName,
        event;

    if (options === 'addMap') {
      WorldMap.maps[arguments[1]] = arguments[2];
    } else if (options === 'set' && apiParams[arguments[1]]) {
      methodName = arguments[1].charAt(0).toUpperCase()+arguments[1].substr(1);
      this.data('mapObject')['set'+methodName].apply(this.data('mapObject'), Array.prototype.slice.call(arguments, 2));
    } else {
      $.extend(defaultParams, options);
      defaultParams.container = this;
      this.css({
        position: 'relative',
        overflow: 'hidden'
      });
      map = new WorldMap(defaultParams);
      this.data('mapObject', map);
      for (event in apiEvents) {
        if (defaultParams[event]) {
          this.bind(apiEvents[event]+'.jvectormap', defaultParams[event]);
        }
      }
    }
  };

  var VectorCanvas = function(width, height) {
    this.mode = window.SVGAngle ? 'svg' : 'vml';
    if (this.mode == 'svg') {
      this.createSvgNode = function(nodeName) {
        return document.createElementNS(this.svgns, nodeName);
      }
    } else {
      try {
        if (!document.namespaces.rvml) {
          document.namespaces.add("rvml","urn:schemas-microsoft-com:vml");
        }
        this.createVmlNode = function (tagName) {
          return document.createElement('<rvml:' + tagName + ' class="rvml">');
        };
      } catch (e) {
        this.createVmlNode = function (tagName) {
          return document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
        };
      }
      document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
    }
    if (this.mode == 'svg') {
      this.canvas = this.createSvgNode('svg');
    } else {
      this.canvas = this.createVmlNode('group');
      this.canvas.style.position = 'absolute';
    }
    this.setSize(width, height);
  }

  VectorCanvas.prototype = {
    svgns: "http://www.w3.org/2000/svg",
    mode: 'svg',
    width: 0,
    height: 0,
    canvas: null,

    setSize: function(width, height) {
      if (this.mode == 'svg') {
        this.canvas.setAttribute('width', width);
        this.canvas.setAttribute('height', height);
      } else {
        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";
        this.canvas.coordsize = width+' '+height;
        this.canvas.coordorigin = "0 0";
        if (this.rootGroup) {
          var paths = this.rootGroup.getElementsByTagName('shape');
          for(var i=0, l=paths.length; i<l; i++) {
            paths[i].coordsize = width+' '+height;
            paths[i].style.width = width+'px';
            paths[i].style.height = height+'px';
          }
          this.rootGroup.coordsize = width+' '+height;
          this.rootGroup.style.width = width+'px';
          this.rootGroup.style.height = height+'px';
        }
      }
      this.width = width;
      this.height = height;
    },

    createPath: function(config) {
      var node;
      if (this.mode == 'svg') {
        node = this.createSvgNode('path');
        node.setAttribute('d', config.path);
        node.setAttribute('fill-rule', 'evenodd');
        node.setFill = function(color) {
          this.setAttribute("fill", color);
        };
        node.getFill = function(color) {
          return this.getAttribute("fill");
        };
        node.setOpacity = function(opacity) {
          this.setAttribute('fill-opacity', opacity);
        };
      } else {
        node = this.createVmlNode('shape');
        node.coordorigin = "0 0";
        node.coordsize = this.width + ' ' + this.height;
        node.style.width = this.width+'px';
        node.style.height = this.height+'px';
        node.fillcolor = WorldMap.defaultFillColor;
        node.stroked = false;
        node.path = VectorCanvas.pathSvgToVml(config.path);
        var scale = this.createVmlNode('skew');
        scale.on = true;
        scale.matrix = '0.01,0,0,0.01,0,0';
        scale.offset = '0,0';
        node.appendChild(scale);
        var fill = this.createVmlNode('fill');
        node.appendChild(fill);
        node.setFill = function(color) {
          this.getElementsByTagName('fill')[0].color = color;
        };
        node.getFill = function(color) {
          return this.getElementsByTagName('fill')[0].color;
        };
        node.setOpacity = function(opacity) {
          this.getElementsByTagName('fill')[0].opacity = parseInt(opacity*100)+'%';
        };
      }
      return node;
    },

    createCircle: function(config) {
      var node;
      if (this.mode == 'svg') {
        node = this.createSvgNode('circle');
        node.setAttribute('cx', config.x);
        node.setAttribute('cy', config.y);
        node.setAttribute('r', config.r);
        node.setAttribute('fill', config.fill);
        node.setAttribute('stroke', config.stroke);
        node.setPosition = function(point){
          node.setAttribute('cx', point.x);
          node.setAttribute('cy', point.y);
        }
      } else {
        node = this.createVmlNode('oval');
        node.style.width = config.r*2+'px';
        node.style.height = config.r*2+'px';
        node.style.left = config.x-config.r+'px';
        node.style.top = config.y-config.r+'px';
        node.fillcolor = config.fill;
        node.stroke = true;
        node.strokecolor = config.stroke;
        node.setPosition = function(point){
          node.style.left = point.x-config.r+'px';
          node.style.top = point.y-config.r+'px';
        }
      }
      return node;
    },

    createGroup: function(isRoot) {
      var node;
      if (this.mode == 'svg') {
        node = this.createSvgNode('g');
      } else {
        node = this.createVmlNode('group');
        node.style.width = this.width+'px';
        node.style.height = this.height+'px';
        node.style.left = '0px';
        node.style.top = '0px';
        node.coordorigin = "0 0";
        node.coordsize = this.width + ' ' + this.height;
      }
      if (isRoot) {
        this.rootGroup = node;
      }
      return node;
    },

    applyTransformParams: function(scale, transX, transY) {
      if (this.mode == 'svg') {
        this.rootGroup.setAttribute('transform', 'scale('+scale+') translate('+transX+', '+transY+')');
      } else {
        this.rootGroup.coordorigin = (this.width-transX-this.width/100)+','+(this.height-transY-this.height/100);
        this.rootGroup.coordsize = this.width/scale+','+this.height/scale;
      }
    }
  }

  VectorCanvas.pathSvgToVml = function(path) {
    var result = '',
      cx = 0, cy = 0, ctrlx, ctrly;

    path = path.replace(/(-?\d+)e(-?\d+)/g, '0');
    return path.replace(/([MmLlHhVvCcSs])\s*((?:-?\d*(?:\.\d+)?\s*,?\s*)+)/g, function(segment, letter, coords, index){
      coords = coords.replace(/(\d)-/g, '$1,-').replace(/\s+/g, ',').split(',');
      if (!coords[0]) coords.shift();
      for (var i=0, l=coords.length; i<l; i++) {
        coords[i] = Math.round(100*coords[i]);
      }
      switch (letter) {
        case 'm':
          cx += coords[0];
          cy += coords[1];
          return 't'+coords.join(',');
        break;
        case 'M':
          cx = coords[0];
          cy = coords[1];
          return 'm'+coords.join(',');
        break;
        case 'l':
          cx += coords[0];
          cy += coords[1];
          return 'r'+coords.join(',');
        break;
        case 'L':
          cx = coords[0];
          cy = coords[1];
          return 'l'+coords.join(',');
        break;
        case 'h':
          cx += coords[0];
          return 'r'+coords[0]+',0';
        break;
        case 'H':
          cx = coords[0];
          return 'l'+cx+','+cy;
        break;
        case 'v':
          cy += coords[0];
          return 'r0,'+coords[0];
        break;
        case 'V':
          cy = coords[0];
          return 'l'+cx+','+cy;
        break;
        case 'c':
          ctrlx = cx + coords[coords.length-4];
          ctrly = cy + coords[coords.length-3];
          cx += coords[coords.length-2];
          cy += coords[coords.length-1];
          return 'v'+coords.join(',');
        break;
        case 'C':
          ctrlx = coords[coords.length-4];
          ctrly = coords[coords.length-3];
          cx = coords[coords.length-2];
          cy = coords[coords.length-1];
          return 'c'+coords.join(',');
        break;
        case 's':
          coords.unshift(cy-ctrly);
          coords.unshift(cx-ctrlx);
          ctrlx = cx + coords[coords.length-4];
          ctrly = cy + coords[coords.length-3];
          cx += coords[coords.length-2];
          cy += coords[coords.length-1];
          return 'v'+coords.join(',');
        break;
        case 'S':
          coords.unshift(cy+cy-ctrly);
          coords.unshift(cx+cx-ctrlx);
          ctrlx = coords[coords.length-4];
          ctrly = coords[coords.length-3];
          cx = coords[coords.length-2];
          cy = coords[coords.length-1];
          return 'c'+coords.join(',');
        break;
      }
      return '';
    }).replace(/z/g, 'e');
  }

  var WorldMap = function(params) {
    params = params || {};
    var map = this;
    var mapData = WorldMap.maps[params.map];

    this.params = params;

    this.container = params.container;

    this.defaultWidth = mapData.width;
    this.defaultHeight = mapData.height;

    this.color = params.color;
    this.hoverColor = params.hoverColor;
    this.setBackgroundColor(params.backgroundColor);

    this.width = params.container.width();
    this.height = params.container.height();

    this.resize();

    $(window).resize(function(){
      map.width = params.container.width();
      map.height = params.container.height();
      map.resize();
      map.canvas.setSize(map.width, map.height);
      map.applyTransform();
    });

    this.canvas = new VectorCanvas(this.width, this.height);
    params.container.append(this.canvas.canvas);

    this.makeDraggable();

    this.rootGroup = this.canvas.createGroup(true);

    this.index = WorldMap.mapIndex;
    this.label = $('<div/>').addClass('jvectormap-label').appendTo($('body'));
    $('<div/>').addClass('jvectormap-zoomin').text('+').appendTo(params.container);
    $('<div/>').addClass('jvectormap-zoomout').html('&#x2212;').appendTo(params.container);

    for(var key in mapData.paths) {
      var path = this.canvas.createPath({path: mapData.paths[key].path});
      path.setFill(this.color);
      if (this.canvas.mode == 'svg') {
        path.setAttribute('class', 'jvectormap-region');
      } else {
        $(path).addClass('jvectormap-region');
      }
      path.id = 'jvectormap'+map.index+'_'+key;
      map.countries[key] = path;
      $(this.rootGroup).append(path);
    }

    $(params.container).delegate('.jvectormap-region', 'mouseover mouseout', function(e){
      var path = e.target,
        code = e.target.id.substr(e.target.id.indexOf('_')+1),
        labelShowEvent = $.Event('labelShow.jvectormap'),
        regionOverEvent = $.Event('regionOver.jvectormap');

      if (e.type == 'mouseover') {
        $(params.container).trigger(regionOverEvent, [code]);
        if (!regionOverEvent.isDefaultPrevented()) {
          if (params.hoverOpacity) {
            path.setOpacity(params.hoverOpacity);
          }
          if (params.hoverColor) {
            path.currentFillColor = path.getFill()+'';
            path.setFill(params.hoverColor);
          }
        }

        map.label.text(mapData.paths[code].name);
        $(params.container).trigger(labelShowEvent, [map.label, code]);
        if (!labelShowEvent.isDefaultPrevented()) {
          map.label.show();
          map.labelWidth = map.label.width();
          map.labelHeight = map.label.height();
        }
      } else {
        path.setOpacity(1);
        if (path.currentFillColor) {
          path.setFill(path.currentFillColor);
        }
        map.label.hide();
        $(params.container).trigger('regionOut.jvectormap', [code]);
      }
    });

    $(params.container).delegate('.jvectormap-region', 'click', function(e){
      var path = e.target;
      var code = e.target.id.split('_').pop();
      $(params.container).trigger('regionClick.jvectormap', [code]);
    });

    params.container.mousemove(function(e){
      if (map.label.is(':visible')) {
        map.label.css({
          left: e.pageX-15-map.labelWidth,
          top: e.pageY-15-map.labelHeight
        })
      }
    });

    this.setColors(params.colors);

    this.canvas.canvas.appendChild(this.rootGroup);

    if (params.markers) {
      this.createMarkers(params.markers);
      $(params.container).delegate('.jvectormap-marker', 'mouseover mouseout', function(e){
        var marker = e.target,
            index = marker.getAttribute('data-index'),
            labelShowEvent = $.Event('markerLabelShow.jvectormap'),
            markerOverEvent = $.Event('markerOver.jvectormap');

        if (e.type == 'mouseover') {
          $(params.container).trigger(markerOverEvent, [index]);
          $(params.container).trigger(labelShowEvent, [map.label, index]);
          if (!labelShowEvent.isDefaultPrevented()) {
            map.label.text(map.markers[index].config.name || '');
            map.label.show();
            map.labelWidth = map.label.width();
            map.labelHeight = map.label.height();
          }
        } else {
          map.label.hide();
          $(params.container).trigger('markerOut.jvectormap', [index]);
        }
      });
      $(params.container).delegate('.jvectormap-marker', 'click', function(e){
        var marker = e.target;
        var index = marker.getAttribute('data-index');
        $(params.container).trigger('markerClick.jvectormap', [index]);
      });
    }

    this.applyTransform();

    this.colorScale = new ColorScale(params.scaleColors, params.normalizeFunction, params.valueMin, params.valueMax);
    if (params.values) {
      this.values = params.values;
      this.setValues(params.values);
    }

    this.bindZoomButtons();

    WorldMap.mapIndex++;
  }

  WorldMap.prototype = {
    transX: 0,
    transY: 0,
    scale: 1,
    baseTransX: 0,
    baseTransY: 0,
    baseScale: 1,

    width: 0,
    height: 0,
    countries: {},
    countriesColors: {},
    countriesData: {},
    zoomStep: 1.4,
    zoomMaxStep: 4,
    zoomCurStep: 1,

    setColors: function(key, color) {
      if (typeof key == 'string') {
        this.countries[key].setFill(color);
      } else {
        var colors = key;
        for (var code in colors) {
          if (this.countries[code]) {
            this.countries[code].setFill(colors[code]);
          }
        }
      }
    },

    setValues: function(values) {
      var max = 0,
        min = Number.MAX_VALUE,
        val;

      for (var cc in values) {
        val = parseFloat(values[cc]);
        if (val > max) max = values[cc];
        if (val && val < min) min = val;
      }
      this.colorScale.setMin(min);
      this.colorScale.setMax(max);

      var colors = {};
      for (cc in values) {
        val = parseFloat(values[cc]);
        if (val) {
          colors[cc] = this.colorScale.getColor(val);
        } else {
          colors[cc] = this.color;
        }
      }
      this.setColors(colors);
      this.values = values;
    },

    setBackgroundColor: function(backgroundColor) {
      this.container.css('background-color', backgroundColor);
    },

    setScaleColors: function(colors) {
      this.colorScale.setColors(colors);
      if (this.values) {
        this.setValues(this.values);
      }
    },

    setNormalizeFunction: function(f) {
      this.colorScale.setNormalizeFunction(f);
      if (this.values) {
        this.setValues(this.values);
      }
    },

    resize: function() {
      var curBaseScale = this.baseScale;
      if (this.width / this.height > this.defaultWidth / this.defaultHeight) {
        this.baseScale = this.height / this.defaultHeight;
        this.baseTransX = Math.abs(this.width - this.defaultWidth * this.baseScale) / (2 * this.baseScale);
      } else {
        this.baseScale = this.width / this.defaultWidth;
        this.baseTransY = Math.abs(this.height - this.defaultHeight * this.baseScale) / (2 * this.baseScale);
      }
      this.scale *= this.baseScale / curBaseScale;
      this.transX *= this.baseScale / curBaseScale;
      this.transY *= this.baseScale / curBaseScale;
    },

    reset: function() {
      this.countryTitle.reset();
      for(var key in this.countries) {
        this.countries[key].setFill(WorldMap.defaultColor);
      }
      this.scale = this.baseScale;
      this.transX = this.baseTransX;
      this.transY = this.baseTransY;
      this.applyTransform();
    },

    applyTransform: function() {
      var maxTransX, maxTransY, minTransX, maxTransY;
      if (this.defaultWidth * this.scale <= this.width) {
        maxTransX = (this.width - this.defaultWidth * this.scale) / (2 * this.scale);
        minTransX = (this.width - this.defaultWidth * this.scale) / (2 * this.scale);
      } else {
        maxTransX = 0;
        minTransX = (this.width - this.defaultWidth * this.scale) / this.scale;
      }

      if (this.defaultHeight * this.scale <= this.height) {
        maxTransY = (this.height - this.defaultHeight * this.scale) / (2 * this.scale);
        minTransY = (this.height - this.defaultHeight * this.scale) / (2 * this.scale);
      } else {
        maxTransY = 0;
        minTransY = (this.height - this.defaultHeight * this.scale) / this.scale;
      }

      if (this.transY > maxTransY) {
        this.transY = maxTransY;
      } else if (this.transY < minTransY) {
        this.transY = minTransY;
      }
      if (this.transX > maxTransX) {
        this.transX = maxTransX;
      } else if (this.transX < minTransX) {
        this.transX = minTransX;
      }

      this.canvas.applyTransformParams(this.scale, this.transX, this.transY);

      if (this.markers) {
        this.repositionMarkers();
      }
    },

    makeDraggable: function(){
      var mouseDown = false;
      var oldPageX, oldPageY;
      var self = this;
      this.container.mousemove(function(e){
        if (mouseDown) {
          var curTransX = self.transX;
          var curTransY = self.transY;

          self.transX -= (oldPageX - e.pageX) / self.scale;
          self.transY -= (oldPageY - e.pageY) / self.scale;

          self.applyTransform();

          oldPageX = e.pageX;
          oldPageY = e.pageY;
        }
        return false;
      }).mousedown(function(e){
        mouseDown = true;
        oldPageX = e.pageX;
        oldPageY = e.pageY;
        return false;
      }).mouseup(function(){
        mouseDown = false;
        return false;
      });
    },

    bindZoomButtons: function() {
      var map = this;
      var sliderDelta = ($('#zoom').innerHeight() - 6*2 - 15*2 - 3*2 - 7 - 6) / (this.zoomMaxStep - this.zoomCurStep);
      this.container.find('.jvectormap-zoomin').click(function(){
        if (map.zoomCurStep < map.zoomMaxStep) {
          var curTransX = map.transX;
          var curTransY = map.transY;
          var curScale = map.scale;
          map.transX -= (map.width / map.scale - map.width / (map.scale * map.zoomStep)) / 2;
          map.transY -= (map.height / map.scale - map.height / (map.scale * map.zoomStep)) / 2;
          map.setScale(map.scale * map.zoomStep);
          map.zoomCurStep++;
          $('#zoomSlider').css('top', parseInt($('#zoomSlider').css('top')) - sliderDelta);
        }
      });
      this.container.find('.jvectormap-zoomout').click(function(){
        if (map.zoomCurStep > 1) {
          var curTransX = map.transX;
          var curTransY = map.transY;
          var curScale = map.scale;
          map.transX += (map.width / (map.scale / map.zoomStep) - map.width / map.scale) / 2;
          map.transY += (map.height / (map.scale / map.zoomStep) - map.height / map.scale) / 2;
          map.setScale(map.scale / map.zoomStep);
          map.zoomCurStep--;
          $('#zoomSlider').css('top', parseInt($('#zoomSlider').css('top')) + sliderDelta);
        }
      });
    },

    setScale: function(scale) {
      this.scale = scale;
      this.applyTransform();
    },

    getCountryPath: function(cc) {
      return $('#'+cc)[0];
    },

    createMarkers: function(markers) {
      var group = this.canvas.createGroup(),
          i,
          marker,
          point,
          markerConfig,
          defaultConfig = {latLng: [0, 0], r: 5, fill: 'white', stroke: '#505050'};

      this.markers = [];

      for (i = 0; i < markers.length; i++) {
        markerConfig = markers[i] instanceof Array ? {latLng: markers[i]} : markers[i];
        markerConfig = $.extend({}, defaultConfig, this.params.markerDefaults, markerConfig);
        point = this.latLngToPoint.apply(this, markerConfig.latLng);
        $.extend(markerConfig, point);
        marker = this.canvas.createCircle(markerConfig);
        if (this.canvas.mode == 'svg') {
          marker.setAttribute('class', 'jvectormap-marker');
          marker.setAttribute('data-index', i);
        } else {
          $(marker).addClass('jvectormap-marker').attr('data-index', i);
        }
        this.markers.push({element: marker, config: markerConfig});
        $(group).append(marker);
      }

      this.canvas.canvas.appendChild(group);
    },

    repositionMarkers: function() {
      var i,
          point;

      for (i = 0; i < this.markers.length; i++) {
        point = this.latLngToPoint.apply(this, this.markers[i].config.latLng);
        this.markers[i].element.setPosition(point);
      }
    },

    latLngToPoint: function(lat, lng) {
      var x,
          y,
          centralMeridian = WorldMap.maps[this.params.map].projection.centralMeridian,
          width = this.width - this.baseTransX * 2 * this.baseScale,
          height = this.height - this.baseTransY * 2 * this.baseScale,
          inset,
          bbox,
          scaleFactor = this.scale / this.baseScale;

      if (lng < (-180 + centralMeridian)) {
        lng += 360;
      }

      x = (lng - centralMeridian) / 360 * WorldMap.circumference,
      y = (180 / Math.PI * (5 / 4) * Math.log(Math.tan(Math.PI / 4 + (4 / 5) * lat * Math.PI / 360))) / 360 * WorldMap.circumference;

      inset = this.getInsetForPoint(x, y);
      bbox = inset.bbox;

      x = (x - bbox[0].x) / (bbox[1].x - bbox[0].x) * inset.width * this.scale;
      y = (y - bbox[0].y) / (bbox[1].y - bbox[0].y) * inset.height * this.scale;

      return {
        x: x + this.transX*this.scale + inset.left*this.scale,
        y: y + this.transY*this.scale + inset.top*this.scale
      };
    },

    getInsetForPoint: function(x, y){
      var insets = WorldMap.maps[this.params.map].insets,
          i,
          bbox;

      for (i = 0; i < insets.length; i++) {
        bbox = insets[i].bbox;
        if (x > bbox[0].x && x < bbox[1].x && y > bbox[0].y && y < bbox[1].y) {
          return insets[i];
        }
      }
    }
  },

  WorldMap.xlink = "http://www.w3.org/1999/xlink";
  WorldMap.mapIndex = 1;
  WorldMap.maps = {};
  WorldMap.circumference = 40075017;

  var ColorScale = function(colors, normalizeFunction, minValue, maxValue) {
    if (colors) this.setColors(colors);
    if (normalizeFunction) this.setNormalizeFunction(normalizeFunction);
    if (minValue) this.setMin(minValue);
    if (minValue) this.setMax(maxValue);
  }

  ColorScale.prototype = {
    colors: [],

    setMin: function(min) {
      this.clearMinValue = min;
      if (typeof this.normalize === 'function') {
        this.minValue = this.normalize(min);
      } else {
        this.minValue = min;
      }
    },

    setMax: function(max) {
      this.clearMaxValue = max;
      if (typeof this.normalize === 'function') {
        this.maxValue = this.normalize(max);
      } else {
        this.maxValue = max;
      }
    },

    setColors: function(colors) {
      for (var i=0; i<colors.length; i++) {
        colors[i] = ColorScale.rgbToArray(colors[i]);
      }
      this.colors = colors;
    },

    setNormalizeFunction: function(f) {
      if (f === 'polynomial') {
        this.normalize = function(value) {
          return Math.pow(value, 0.2);
        }
      } else if (f === 'linear') {
        delete this.normalize;
      } else {
        this.normalize = f;
      }
      this.setMin(this.clearMinValue);
      this.setMax(this.clearMaxValue);
    },

    getColor: function(value) {
      if (typeof this.normalize === 'function') {
        value = this.normalize(value);
      }
      var lengthes = [];
      var fullLength = 0;
      var l;
      for (var i=0; i<this.colors.length-1; i++) {
        l = this.vectorLength(this.vectorSubtract(this.colors[i+1], this.colors[i]));
        lengthes.push(l);
        fullLength += l;
      }
      var c = (this.maxValue - this.minValue) / fullLength;
      for (i=0; i<lengthes.length; i++) {
        lengthes[i] *= c;
      }
      i = 0;
      value -= this.minValue;
      while (value - lengthes[i] >= 0) {
        value -= lengthes[i];
        i++;
      }
      var color;
      if (i == this.colors.length - 1) {
        color = this.vectorToNum(this.colors[i]).toString(16);
      } else {
        color = (
          this.vectorToNum(
            this.vectorAdd(this.colors[i],
              this.vectorMult(
                this.vectorSubtract(this.colors[i+1], this.colors[i]),
                (value) / (lengthes[i])
              )
            )
          )
        ).toString(16);
      }

      while (color.length < 6) {
        color = '0' + color;
      }
      return '#'+color;
    },

    vectorToNum: function(vector) {
      var num = 0;
      for (var i=0; i<vector.length; i++) {
        num += Math.round(vector[i])*Math.pow(256, vector.length-i-1);
      }
      return num;
    },

    vectorSubtract: function(vector1, vector2) {
      var vector = [];
      for (var i=0; i<vector1.length; i++) {
        vector[i] = vector1[i] - vector2[i];
      }
      return vector;
    },

    vectorAdd: function(vector1, vector2) {
      var vector = [];
      for (var i=0; i<vector1.length; i++) {
        vector[i] = vector1[i] + vector2[i];
      }
      return vector;
    },

    vectorMult: function(vector, num) {
      var result = [];
      for (var i=0; i<vector.length; i++) {
        result[i] = vector[i] * num;
      }
      return result;
    },

    vectorLength: function(vector) {
      var result = 0;
      for (var i=0; i<vector.length; i++) {
        result += vector[i]*vector[i];
      }
      return Math.sqrt(result);
    }
  }

  ColorScale.arrayToRgb = function(ar) {
    var rgb = '#';
    var d;
    for (var i=0; i<ar.length; i++) {
      d = ar[i].toString(16);
      rgb += d.length == 1 ? '0'+d : d;
    }
    return rgb;
  }

  ColorScale.rgbToArray = function(rgb) {
    rgb = rgb.substr(1);
    return [parseInt(rgb.substr(0, 2), 16), parseInt(rgb.substr(2, 2), 16), parseInt(rgb.substr(4, 2), 16)];
  }
})( jQuery );
