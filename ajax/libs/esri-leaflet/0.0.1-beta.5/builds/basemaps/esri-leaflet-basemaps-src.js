/*! Esri-Leaflet - v0.0.1-beta.5 - 2014-06-17
*   Copyright (c) 2014 Environmental Systems Research Institute, Inc.
*   Apache License*/
L.esri = {
  VERSION: '0.0.1-beta.5',
  Layers: {},
  Services: {},
  Controls: {},
  Tasks: {},
  Util: {},
  Support: {
    CORS: !!(window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest()),
    pointerEvents: document.documentElement.style.pointerEvents === ''
  }
};
(function(L){
  var callbacks = 0;

  function serialize(params){
    var data = '';

    params.f = 'json';

    for (var key in params){
      if(params.hasOwnProperty(key)){
        var param = params[key];
        var type = Object.prototype.toString.call(param);
        var value;

        if(data.length){
          data += '&';
        }

        if(type === '[object Array]' || type === '[object Object]'){
          value = JSON.stringify(param);
        } else if (type === '[object Date]'){
          value = param.valueOf();
        } else {
          value = param;
        }

        data += encodeURIComponent(key) + '=' + encodeURIComponent(value);
      }
    }

    return data;
  }

  function createRequest(callback, context){
    var httpRequest = new XMLHttpRequest();

    httpRequest.onerror = function() {
      callback.call(context, {
        error: {
          code: 500,
          message: 'XMLHttpRequest error'
        }
      }, null);
    };

    httpRequest.onreadystatechange = function(){
      var response;
      var error;
      if (httpRequest.readyState === 4) {
        try {
          response = JSON.parse(httpRequest.responseText);
        } catch(e) {
          response = null;
          error = {
            code: 500,
            message: 'Could not parse response as JSON.'
          };
        }

        if (!error && response.error) {
          error = response.error;
          response = null;
        }

        callback.call(context, error, response);
      }
    };

    return httpRequest;
  }

  // AJAX handlers for CORS (modern browsers) or JSONP (older browsers)
  L.esri.Request = {
    post: {
      XMLHTTP: function (url, params, callback, context) {
        var httpRequest = createRequest(callback, context);
        httpRequest.open('POST', url);
        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        httpRequest.send(serialize(params));

        return httpRequest;
      }
    },

    get: {
      CORS: function (url, params, callback, context) {
        var httpRequest = createRequest(callback, context);

        httpRequest.open('GET', url + '?' + serialize(params), true);
        httpRequest.send(null);

        return httpRequest;
      },
      JSONP: function(url, params, callback, context){
        L.esri._callback = L.esri._callback || {};

        var callbackId = 'c' + callbacks;

        params.callback = 'L.esri._callback.'+callbackId;

        var script = L.DomUtil.create('script', null, document.body);
        script.type = 'text/javascript';
        script.src = url + '?' +  serialize(params);
        script.id = callbackId;

        L.esri._callback[callbackId] = function(response){
          if(L.esri._callback[callbackId] !== true){
            var error;
            var responseType = Object.prototype.toString.call(response);

            if(!(responseType === '[object Object]' || responseType === '[object Array]')){
              error = {
                error: {
                  code: 500,
                  message: 'Expected array or object as JSONP response'
                }
              };
              response = null;
            }

            if (!error && response.error) {
              error = response;
              response = null;
            }

            callback.call(context, error, response);
            L.esri._callback[callbackId] = true;
          }
        };

        callbacks++;

        return L.esri._callback[callbackId];
      }
    }

  };

  // Choose the correct AJAX handler depending on CORS support
  L.esri.get = (L.esri.Support.CORS) ? L.esri.Request.get.CORS : L.esri.Request.get.JSONP;

  // Always use XMLHttpRequest for posts
  L.esri.post = L.esri.Request.post.XMLHTTP;

})(L);
(function(L){

  var tileProtocol = (window.location.protocol !== 'https:') ? 'http:' : 'https:';

  L.esri.Layers.BasemapLayer = L.TileLayer.extend({
    statics: {
      TILES: {
        Streets: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
          attributionUrl: 'https://static.arcgis.com/attribution/World_Street_Map',
          options: {
            minZoom: 1,
            maxZoom: 19,
            subdomains: ['server', 'services'],
            attribution: 'Esri'
          }
        },
        Topographic: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          attributionUrl: 'https://static.arcgis.com/attribution/World_Topo_Map',
          options: {
            minZoom: 1,
            maxZoom: 19,
            subdomains: ['server', 'services'],
            attribution: 'Esri'
          }
        },
        Oceans: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
          attributionUrl: 'https://static.arcgis.com/attribution/Ocean_Basemap',
          options: {
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            attribution: 'Esri'
          }
        },
        OceansLabels: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}',
          options: {
            //pane: 'esri-label',
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services']
          }
        },
        NationalGeographic: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            attribution: 'Esri'
          }
        },
        DarkGray: {
          urlTemplate: tileProtocol + '//tiles{s}.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Dark_Gray_Base_Beta/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 10,
            subdomains: ['1', '2'],
            attribution: 'Esri, DeLorme, HERE'
          }
        },
        DarkGrayLabels: {
          urlTemplate: tileProtocol + '//tiles{s}.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Dark_Gray_Reference_Beta/MapServer/tile/{z}/{y}/{x}',
          options: {
            //pane: 'esri-label',
            minZoom: 1,
            maxZoom: 10,
            subdomains: ['1', '2']
          }
        },
        Gray: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            attribution: 'Esri, NAVTEQ, DeLorme'
          }
        },
        GrayLabels: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
          options: {
            //pane: 'esri-label',
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services']
          }
        },
        Imagery: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 19,
            subdomains: ['server', 'services'],
            attribution: 'Esri, DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community'
          }
        },
        ImageryLabels: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
          options: {
            //pane: 'esri-label',
            minZoom: 1,
            maxZoom: 19,
            subdomains: ['server', 'services']
          }
        },
        ImageryTransportation: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',
          //pane: 'esri-label',
          options: {
            minZoom: 1,
            maxZoom: 19,
            subdomains: ['server', 'services']
          }
        },
        ShadedRelief: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 13,
            subdomains: ['server', 'services'],
            attribution: 'ESRI, NAVTEQ, DeLorme'
          }
        },
        ShadedReliefLabels: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer/tile/{z}/{y}/{x}',
//          pane: 'esri-label',
          options: {
            minZoom: 1,
            maxZoom: 12,
            subdomains: ['server', 'services']
          }
        },
        Terrain: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 13,
            subdomains: ['server', 'services'],
            attribution: 'Esri, USGS, NOAA'
          }
        },
        TerrainLabels: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}',
          options: {
            //pane: 'esri-label',
            minZoom: 1,
            maxZoom: 13,
            subdomains: ['server', 'services']
          }
        }
      }
    },
    initialize: function(key, options){
      var config;

      // set the config variable with the appropriate config object
      if (typeof key === 'object' && key.urlTemplate && key.options){
        config = key;
      } else if(typeof key === 'string' && L.esri.BasemapLayer.TILES[key]){
        config = L.esri.BasemapLayer.TILES[key];
      } else {
        throw new Error('L.esri.BasemapLayer: Invalid parameter. Use one of "Streets", "Topographic", "Oceans", "OceansLabels", "NationalGeographic", "Gray", "GrayLabels", "DarkGray", "DarkGrayLabels", "Imagery", "ImageryLabels", "ImageryTransportation", "ShadedRelief", "ShadedReliefLabels", "Terrain" or "TerrainLabels"');
      }

      // merge passed options into the config options
      var tileOptions = L.Util.extend(config.options, options);

      // call the initialize method on L.TileLayer to set everything up
      L.TileLayer.prototype.initialize.call(this, config.urlTemplate, L.Util.setOptions(this, tileOptions));

      // if this basemap requires dynamic attribution set it up
      if(config.attributionUrl){
        this._getAttributionData(config.attributionUrl);
      }
    },
    onAdd: function(map){
      // if(this.options.pane && L.esri.Support.pointerEvents){
      //   this._initPane();
      // }

      L.TileLayer.prototype.onAdd.call(this, map);

      map.on('moveend', this._updateMapAttribution, this);
    },
    onRemove: function(map){
      L.TileLayer.prototype.onRemove.call(this, map);

      map.off('moveend', this._updateMapAttribution, this);
    },
    getAttribution:function(){
      var logo = '<a href="https://developers.arcgis.com" style="border: none;"><img src="http://js.arcgis.com/3.9/js/esri/images/map/logo-med.png" style="position:absolute; top:-38px; right:2px; border: none;"></a>';
      var attribution = '<span class="esri-attributions" style="line-height:14px; vertical-align: -3px; text-overflow:ellipsis; white-space:nowrap; overflow:hidden; display:inline-block;">' + this.options.attribution + '</span>' + logo;
      return attribution;
    },
    // _initPane: function(){
    //   if(!this._map.getPane(this.options.pane)){
    //     var pane = this._map.createPane(this.options.pane);
    //     pane.style.pointerEvents = 'none';
    //     pane.style.zIndex = 5;
    //   }
    // },
    _getAttributionData: function(url){
      L.esri.get(url, {}, function(error, attributions){
        this._attributions = [];
        for (var c = 0; c < attributions.contributors.length; c++) {
          var contributor = attributions.contributors[c];
          for (var i = 0; i < contributor.coverageAreas.length; i++) {
            var coverageArea = contributor.coverageAreas[i];
            var southWest = new L.LatLng(coverageArea.bbox[0], coverageArea.bbox[1]);
            var northEast = new L.LatLng(coverageArea.bbox[2], coverageArea.bbox[3]);
            this._attributions.push({
              attribution: contributor.attribution,
              score: coverageArea.score,
              bounds: new L.LatLngBounds(southWest, northEast),
              minZoom: coverageArea.zoomMin,
              maxZoom: coverageArea.zoomMax
            });
          }
        }

        this._attributions.sort(function(a, b){
          return b.score - a.score;
        });

        this._updateMapAttribution();
      }, this);
    },
    _updateMapAttribution: function(){
      if(this._map && this._map.attributionControl && this._attributions){
        var newAttributions = '';
        var bounds = this._map.getBounds();
        var zoom = this._map.getZoom();

        for (var i = 0; i < this._attributions.length; i++) {
          var attribution = this._attributions[i];
          var text = attribution.attribution;
          if(!newAttributions.match(text) && bounds.intersects(attribution.bounds) && zoom >= attribution.minZoom && zoom <= attribution.maxZoom) {
            newAttributions += (', ' + text);
          }
        }
        newAttributions = newAttributions.substr(2);
        var attributionElement = this._map.attributionControl._container.querySelector('.esri-attributions');
        attributionElement.innerHTML = newAttributions;
        attributionElement.style.maxWidth =  (this._map.getSize().x * 0.65) + 'px';
        this.fire('attributionupdated', {
          attribution: newAttributions
        });
      }
    }
  });

  L.esri.BasemapLayer = L.esri.Layers.BasemapLayer;

  L.esri.Layers.basemapLayer = function(key, options){
    return new L.esri.Layers.BasemapLayer(key, options);
  };

  L.esri.basemapLayer = function(key, options){
    return new L.esri.Layers.BasemapLayer(key, options);
  };

})(L);