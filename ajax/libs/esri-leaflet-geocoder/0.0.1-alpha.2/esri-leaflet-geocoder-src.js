/*! esri-leaflet-geocoder - v0.0.1 - 2013-11-26
*   Copyright (c) 2013 Environmental Systems Research Institute, Inc.
*   Apache License*/

(function(L){

  // function to ensure namespaces exist
  function namespace(ns, root){
    root = root || window;

    var parent = root,
        parts = ns.split('.'),
        part;

    while(part = parts.shift()){
      if(!parent[part]){
        parent[part] = {};
      }
      parent = parent[part];
    }

    return parent;
  }

  // serialize params to query string
  function serialize(params){
    var qs="?";

    for(var param in params){
      if(params.hasOwnProperty(param)){
        var key = param;
        var value = params[param];
        qs+=encodeURIComponent(key);
        qs+="=";
        qs+=encodeURIComponent(value);
        qs+="&";
      }
    }

    return qs.substring(0, qs.length - 1);
  }

  // convert an arcgis extent to a leaflet bounds
  function extentToBounds(extent){
    var southWest = new L.LatLng(extent.ymin, extent.xmin);
    var northEast = new L.LatLng(extent.ymax, extent.xmax);
    return new L.LatLngBounds(southWest, northEast);
  }

  // ensure the namespaces exist
  namespace('L.esri.Services.Geocoding');
  namespace('L.esri.Controls.Geosearch');

  L.esri.Services.Geocoding = L.Class.extend({
    includes: L.Mixin.Events,
    options: {
      url: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/',
      outFields: 'Subregion, Region, PlaceName, Match_addr, Country, Addr_type, City, Place_addr'
    },
    initialize: function (options) {
      L.Util.setOptions(this, options);
    },
    request: function(url, params, callback){
      var callbackId = "c"+(Math.random() * 1e9).toString(36).replace(".", "_");

      params.f="json";
      params.callback="L.esri.Services.Geocoding._callback."+callbackId;

      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url + serialize(params);
      script.id = callbackId;
      this.fire('loading');

      L.esri.Services.Geocoding._callback[callbackId] = L.Util.bind(function(response){
        this.fire('load');
        callback(response);
        document.body.removeChild(script);
        delete L.esri.Services.Geocoding._callback[callbackId];
      }, this);

      document.body.appendChild(script);
    },
    geocode: function(text, opts, callback){
      var defaults = {
        outFields: this.options.outFields
      };
      var options = L.extend(defaults, opts);
      options.text = text;
      this.request(this.options.url + "find", options, callback);
    },
    suggest: function(text, opts, callback){
      var options = opts || {};
      options.text = text;
      this.request(this.options.url + "suggest", options, callback);
    }
  });

  L.esri.Services.geocoding = function(options){
    return new L.esri.Services.Geocoding(options);
  };

  L.esri.Services.Geocoding._callback = {};

  L.esri.Controls.Geosearch = L.Control.extend({
    includes: L.Mixin.Events,
    options: {
      position: 'topleft',
      zoomToResult: true,
      useMapBounds: 11,
      collapseAfterResult: true,
      expanded: false,
      maxResults: 25,
      containerClass: "geocoder-control",
      inputClass: "geocoder-control-input leaflet-bar",
      suggestionsWrapperClass: "geocoder-control-suggestions leaflet-bar",
      selectedSuggestionClass: "geocoder-control-selected",
      expandedClass: "geocoder-control-expanded"
    },
    initialize: function (options) {
      L.Util.setOptions(this, options);
      this._service = new L.esri.Services.Geocoding();
    },
    _processMatch: function(text, match){
      var attributes = match.feature.attributes;
      var bounds = extentToBounds(match.extent);

      return {
        text: text,
        bounds: bounds,
        latlng: new L.LatLng(match.feature.geometry.y, match.feature.geometry.x),
        name: attributes.PlaceName,
        match: attributes.Addr_type,
        country: attributes.Country,
        region: attributes.Region,
        subregion: attributes.Subregion,
        city: attributes.City,
        address: attributes.Place_addr ? attributes.Place_addr : attributes.Match_addr
      };
    },
    _geocode: function(text, key){
      var options = {};

      if(key){
        options.magicKey = key;
      } else {
        var mapBounds = this._map.getBounds();
        var center = mapBounds.getCenter();
        var ne = mapBounds.getNorthWest();
        options.bbox = mapBounds.toBBoxString();
        options.maxLocations = this.options.maxResults;
        options.location = center.lng + "," + center.lat;
        options.distance = Math.min(Math.max(center.distanceTo(ne), 2000), 50000);
      }

      L.DomUtil.addClass(this._input, "loading");

      this.fire('loading');

      this._service.geocode(text, options, L.Util.bind(function(response){
        if(response.error){
          this.fire("error", {
            code: response.error.code,
            message: response.error.messsage
          });
        } else if(response.locations.length) {
          var results = [];
          var bounds = new L.LatLngBounds();
          var i;

          for (i = response.locations.length - 1; i >= 0; i--) {
            results.push(this._processMatch(text, response.locations[i]));
          }

          for (i = results.length - 1; i >= 0; i--) {
            bounds.extend(results[i].bounds);
          }

          this.fire('results', {
            results: results,
            bounds: bounds,
            latlng: bounds.getCenter()
          });

          if(this.options.zoomToResult){
            this._map.fitBounds(bounds);
          }
        } else {
          this.fire('results', {
            results: [],
            bounds: null,
            latlng: null,
            text: text
          });
        }

        L.DomUtil.removeClass(this._input, "loading");

        this.fire('load');

        this.clear();

      }, this));
    },
    _suggest: function(text){

      L.DomUtil.addClass(this._input, "loading");

      var options = {};

      if(this.options.useMapBounds === true || (this._map.getZoom() >= this.options.useMapBounds)){
        var bounds = this._map.getBounds();
        var center = bounds.getCenter();
        var ne = bounds.getNorthWest();
        options.location = center.lng + "," + center.lat;
        options.distance = Math.min(Math.max(center.distanceTo(ne), 2000), 50000);
      }

      this._service.suggest(text, options, L.Util.bind(function(response){
        // make sure something is still in the input field before putting in suggestions.
        if(this._input.value){
          this._suggestions.innerHTML = "";

          if(response.suggestions){
            for (var i = 0; i < response.suggestions.length; i++) {
              var suggestion = L.DomUtil.create('li', 'geocoder-control-suggestion', this._suggestions);
              suggestion.innerHTML = response.suggestions[i].text;
              suggestion["data-magic-key"] = response.suggestions[i].magicKey;
            }
          }

          L.DomUtil.removeClass(this._input, "loading");
        }
      }, this));
    },
    clear: function(){
      this._suggestions.innerHTML = "";
      this._input.value = "";

      if(this.options.collapseAfterResult){
        L.DomUtil.removeClass(this._container, this.options.expandedClass);
      }

      this._input.blur();
    },
    onAdd: function (map) {
      this._map = map;

      if (!map.attributionControl) {
        L.control.attribution().addAttribution('Geocoding by Esri').addTo(map);
      } else {
        map.attributionControl.addAttribution('Geocoding by Esri');
      }

      this._container = L.DomUtil.create('div', this.options.containerClass + ((this.options.expanded) ? " " + this.options.expandedClass  : ""));

      this._input = L.DomUtil.create('input', this.options.inputClass, this._container);

      this._suggestions = L.DomUtil.create('ul', this.options.suggestionsWrapperClass, this._container);

      L.DomEvent.addListener(this._container, "click", function(e){
        L.DomUtil.addClass(this._container, this.options.expandedClass);
      }, this);

      L.DomEvent.addListener(this._suggestions, "mousedown", function(e){
        var suggestionItem = e.target || e.srcElement;
        this._geocode(suggestionItem.innerHTML, suggestionItem["data-magic-key"]);
        this.clear();
      }, this);

      L.DomEvent.addListener(this._input, "blur", function(e){
        this.clear();
      }, this);

      L.DomEvent.addListener(this._input, "keydown", function(e){
        var selected = this._suggestions.querySelectorAll('.' + this.options.selectedSuggestionClass)[0];
        switch(e.keyCode){
        case 13:
          if(selected){
            this._geocode(selected.innerHTML, selected["data-magic-key"]);
          } else {
            this._geocode(this._input.value);
          }
          this.clear();
          L.DomEvent.preventDefault(e);
          break;
        case 38:
          if(selected){
            L.DomUtil.removeClass(selected, this.options.selectedSuggestionClass);
          }
          if(selected && selected.previousSibling) {
            L.DomUtil.addClass(selected.previousSibling, this.options.selectedSuggestionClass);
          } else {
            L.DomUtil.addClass(this._suggestions.childNodes[this._suggestions.childNodes.length-1], this.options.selectedSuggestionClass);
          }
          L.DomEvent.preventDefault(e);
          break;
        case 40:
          if(selected){
            L.DomUtil.removeClass(selected, this.options.selectedSuggestionClass);
          }
          if(selected && selected.nextSibling) {
            L.DomUtil.addClass(selected.nextSibling, this.options.selectedSuggestionClass);
          } else {
            L.DomUtil.addClass(this._suggestions.childNodes[0], this.options.selectedSuggestionClass);
          }
          L.DomEvent.preventDefault(e);
          break;
        }
      }, this);

      L.DomEvent.addListener(this._input, "keypress", function(e){
        var key = e.keyCode;
        if(key !== 13 && key !== 38 && key !== 40){
          this._suggest((e.target || e.srcElement).value);
        }
      }, this);

      return this._container;
    },
    onRemove: function (map) {
      map.attributionControl.removeAttribution('Geocoding by Esri');
    }
  });

  L.esri.Controls.geosearch = function(options){
    return new L.esri.Controls.Geosearch(options);
  };

})(L);