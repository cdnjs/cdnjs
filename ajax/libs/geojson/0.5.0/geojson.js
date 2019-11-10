(function(GeoJSON) {
  GeoJSON.version = '0.5.0';

  // Allow user to specify default parameters
  GeoJSON.defaults = {
    doThrows: {
      invalidGeometry: false
    }
  };

  function InvalidGeometryError() {
    var args = 1 <= arguments.length ? [].slice.call(arguments, 0) : [];
    var item = args.shift();
    var params = args.shift();

    Error.apply(this, args);
    this.message = this.message || "Invalid Geometry: " + 'item: ' + JSON.stringify(item) + ', params: ' + JSON.stringify(params);
  }

  InvalidGeometryError.prototype = Error;


  GeoJSON.errors = {
    InvalidGeometryError: InvalidGeometryError
  };

  //exposing so this can be overriden maybe by geojson-validation or the like
  GeoJSON.isGeometryValid = function(geometry){
    if(!geometry || !Object.keys(geometry).length)
      return false;

    return !!geometry.type && !!geometry.coordinates && Array.isArray(geometry.coordinates) && !!geometry.coordinates.length;
  };

  // The one and only public function.
  // Converts an array of objects into a GeoJSON feature collection
  GeoJSON.parse = function(objects, params, callback) {
    var geojson,
        settings = applyDefaults(params, this.defaults),
        propFunc;

    geomAttrs.length = 0; // Reset the list of geometry fields
    setGeom(settings);
    propFunc = getPropFunction(settings);

    if (Array.isArray(objects)) {
      geojson = {"type": "FeatureCollection", "features": []};
      objects.forEach(function(item){
        geojson.features.push(getFeature({item:item, params: settings, propFunc:propFunc}));
      });
      addOptionals(geojson, settings);
    } else {
      geojson = getFeature({item:objects, params: settings, propFunc:propFunc});
      addOptionals(geojson, settings);
    }

    if (callback && typeof callback === 'function') {
      callback(geojson);
    } else {
      return geojson;
    }
  };

  // Helper functions
  var geoms = ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon', 'GeoJSON'],
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
    if(settings.crs && checkCRS(settings.crs)) {
      if(settings.isPostgres)
        geojson.geometry.crs = settings.crs;
      else
        geojson.crs = settings.crs;
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

  // Verify that the structure of CRS object is valid
  function checkCRS(crs) {
    if (crs.type === 'name') {
        if (crs.properties && crs.properties.name) {
            return true;
        } else {
            throw new Error('Invalid CRS. Properties must contain "name" key');
        }
    } else if (crs.type === 'link') {
        if (crs.properties && crs.properties.href && crs.properties.type) {
            return true;
        } else {
            throw new Error('Invalid CRS. Properties must contain "href" and "type" key');
        }
    } else {
        throw new Error('Invald CRS. Type attribute must be "name" or "link"');
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
  function getFeature(args) {
    var item = args.item,
      params = args.params,
      propFunc = args.propFunc;

    var feature = { "type": "Feature" };

    feature.geometry = buildGeom(item, params);
    feature.properties = propFunc.call(item);

    return feature;
  }

  function isNested(val){
    return (/^.+\..+$/.test(val));
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
        if(gtype === 'GeoJSON') {
          geom = item[val];
        } else {
          geom.type = gtype;
          geom.coordinates = item[val];
        }
      }

      /* Handle things like:
      Polygon: {
        northeast: ['lat', 'lng'],
        southwest: ['lat', 'lng']
      }
      */
      else if(typeof val === 'object' && !Array.isArray(val)) {
        /*jshint loopfunc: true */
        var points = Object.keys(val).map(function(key){
          var order = val[key];
          var newItem = item[key];
          return buildGeom(newItem, {geom:{ Point: order}});
        });
        geom.type = gtype;
        /*jshint loopfunc: true */
        geom.coordinates = [].concat(points.map(function(p){
          return p.coordinates;
        }));
      }

      // Geometry parameter specified as: {Point: ['lat', 'lng']}
      else if(Array.isArray(val) && item.hasOwnProperty(val[0]) && item.hasOwnProperty(val[1])){
        geom.type = gtype;
        geom.coordinates = [Number(item[val[1]]), Number(item[val[0]])];
      }

      // Geometry parameter specified as: {Point: ['container.lat', 'container.lng']}
      else if(Array.isArray(val) && isNested(val[0]) && isNested(val[1])){
        var coordinates = [];
        for (var i = 0; i < val.length; i++) {	// i.e. 0 and 1
          var paths = val[i].split('.');
          var itemClone = item;
          for (var j = 0; j < paths.length; j++) {
            if (!itemClone.hasOwnProperty(paths[j])) {
              return false;
            }
            itemClone = itemClone[paths[j]];	// Iterate deeper into the object
          }
          coordinates[i] = itemClone;
        }
        geom.type = gtype;
        geom.coordinates = [Number(coordinates[1]), Number(coordinates[0])];
      }
    }

    if(params.doThrows && params.doThrows.invalidGeometry && !GeoJSON.isGeometryValid(geom)){
      throw new InvalidGeometryError(item, params);
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
