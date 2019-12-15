(function(GeoJSON) {
  GeoJSON.version = '0.2.0';

  // Allow user to specify default parameters
  GeoJSON.defaults = {};

  // The one and only public function.
  // Converts an array of objects into a GeoJSON feature collection
  GeoJSON.parse = function(objects, params, callback) {

    var geojson = {"type": "FeatureCollection", "features": []},
        settings = applyDefaults(params, this.defaults),
        propFunc;

    geomAttrs.length = 0; // Reset the list of geometry fields
    setGeom(settings);
    propFunc = getPropFunction(settings);
    
    objects.forEach(function(item){
      geojson.features.push(getFeature(item, settings, propFunc));
    });

    addOptionals(geojson, settings);

    if (callback && typeof callback === 'function') {
      callback(geojson);
    } else {
      return geojson;
    }
  };

  // Helper functions
  var geoms = ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon'],
      geomAttrs = [];

  // Adds default settings to user-specified params
  // Does not overwrite any settings--only adds defaults
  // the the user did not specify
  function applyDefaults(params, defaults) {
    var settings = params || {};

    for(var setting in defaults) {
      if(defaults.hasOwnProperty(setting) && !settings[setting]) {
        settings[setting] = defaults[setting];
      }
    }

    return settings;
  }

  // Adds the optional GeoJSON properties crs and bbox
  // if they have been specified
  function addOptionals(geojson, settings){
    if(settings.crs) {
      geojson.crs = {
        type: "name",
        properties: {
          name: settings.crs
        }
      };
    }
    if (settings.bbox) {
      geojson.bbox = settings.bbox;
    }
    if (settings.extraGlobal) {
      geojson.properties = {};
      for (var key in settings.extraGlobal) {
        geojson.properties[key] = settings.extraGlobal[key];
      }
    }
  }

  // Moves the user-specified geometry parameters
  // under the `geom` key in param for easier access
  function setGeom(params) {
    params.geom = {};

    for(var param in params) {
      if(params.hasOwnProperty(param) && geoms.indexOf(param) !== -1){
        params.geom[param] = params[param];
        delete params[param];
      }
    }

    setGeomAttrList(params.geom);
  }

  // Adds fields which contain geometry data
  // to geomAttrs. This list is used when adding
  // properties to the features so that no geometry
  // fields are added the properties key
  function setGeomAttrList(params) {
    for(var param in params) {
      if(params.hasOwnProperty(param)) {
        if(typeof params[param] === 'string') {
          geomAttrs.push(params[param]);
        } else if (typeof params[param] === 'object') { // Array of coordinates for Point
          geomAttrs.push(params[param][0]);
          geomAttrs.push(params[param][1]);
        }
      }
    }

    if(geomAttrs.length === 0) { throw new Error('No geometry attributes specified'); }
  }

  // Creates a feature object to be added
  // to the GeoJSON features array
  function getFeature(item, params, propFunc) {
    var feature = { "type": "Feature" };

    feature.geometry = buildGeom(item, params);
    feature.properties = propFunc.call(item);

    return feature;
  }

  // Assembles the `geometry` property
  // for the feature output
  function buildGeom(item, params) {
    var geom = {},
        attr;

    for(var gtype in params.geom) {
      var val = params.geom[gtype];

      // Geometry parameter specified as: {Point: 'coords'}
      if(typeof val === 'string' && item.hasOwnProperty(val)) {
        geom.type = gtype;
        geom.coordinates = item[val];
      }

      // Geometry parameter specified as: {Point: ['lat', 'lng']}
      else if(Array.isArray(val) && item.hasOwnProperty(val[0]) && item.hasOwnProperty(val[1])){
        geom.type = gtype;
        geom.coordinates = [item[val[1]], item[val[0]]];
      }
    }

    return geom;
  }

  // Returns the function to be used to
  // build the properties object for each feature
  function getPropFunction(params) {
    var func;

    if(!params.exclude && !params.include) {
      func = function(properties) {
        for(var attr in this) {
          if(this.hasOwnProperty(attr) && (geomAttrs.indexOf(attr) === -1)) {
            properties[attr] = this[attr];
          }
        }
      };
    } else if(params.include) {
      func = function(properties) {
        params.include.forEach(function(attr){
          properties[attr] = this[attr];
        }, this);
      };
    } else if(params.exclude) {
      func = function(properties) {
        for(var attr in this) {
          if(this.hasOwnProperty(attr) && (geomAttrs.indexOf(attr) === -1) && (params.exclude.indexOf(attr) === -1)) {
            properties[attr] = this[attr];
          }
        }
      };
    }

    return function() {
      var properties = {};

      func.call(this, properties);

      if(params.extra) { addExtra(properties, params.extra); }
      return properties;
    };
  }

  // Adds data contained in the `extra`
  // parameter if it has been specified
  function addExtra(properties, extra) {
    for(var key in extra){
      if(extra.hasOwnProperty(key)) {
        properties[key] = extra[key];
      }
    }

    return properties;
  }

}(typeof module == 'object' ? module.exports : window.GeoJSON = {}));
