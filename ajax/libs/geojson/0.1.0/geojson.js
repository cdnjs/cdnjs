(function(GeoJSON) {
  GeoJSON.version = '0.1.0';

  // Allow user to specify default parameters
  GeoJSON.defaults = {};

  // The one and only public function.
  // Converts an array of objects into a GeoJSON feature collection
  GeoJSON.parse = function(objects, params) {
    if(objects.length === 0) { throw new Error('No data found'); }

    var geojson = {"type": "FeatureCollection", "features": []},
        settings = applyDefaults(params, this.defaults);

    geomAttrs.length = 0; // Reset the list of geometry fields
    setGeom(settings);

    objects.forEach(function(item){
      geojson.features.push(getFeature(item, settings));
    });

    addOptionals(geojson, settings);
    return geojson;
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
  function getFeature(item, params) {
    var feature = { "type": "Feature" };

    feature.geometry = buildGeom(item, params);
    feature.properties = buildProps(item, params);

    return feature;
  }

  // Assembles the `geometry` property
  // for the feature output
  function buildGeom(item, params) {
    var geom = {};

    for(var attr in item) {
      if(item.hasOwnProperty(attr) && geomAttrs.indexOf(attr) !== -1) {
        for(var gtype in params.geom) {
          if(params.geom.hasOwnProperty(gtype) && (attr === params.geom[gtype] || attr === params.geom[gtype][0])) {
            geom.type = gtype;

            if(typeof params.geom[gtype] === 'string') {
              geom.coordinates = item[params.geom[gtype]];
            } else { // Point with geom stored in two attributes
              geom.coordinates = [item[params.geom[gtype][1]], item[params.geom[gtype][0]]];
            }

            return geom;
          }
        }
      }
    }
  }

  // Assemblies the `properties` property
  // for the feature ouput
  function buildProps(item, params) {
    var properties = {},
        attr;

    if(!params.exclude && !params.include) {
      for(attr in item) {
        if(item.hasOwnProperty(attr) && (geomAttrs.indexOf(attr) === -1)) {
            properties[attr] = item[attr];
          }
      }
    } else if(params.include) {
      params.include.forEach(function(attr){
        properties[attr] = item[attr];
      });
    } else if(params.exclude) {
      for(attr in item) {
        if(item.hasOwnProperty(attr) && (geomAttrs.indexOf(attr) === -1) && (params.exclude.indexOf(attr) === -1)) {
          properties[attr] = item[attr];
        }
      }
    }

    if(params.extra) { addExtra(properties, params.extra); }

    return properties;
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