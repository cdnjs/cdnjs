exports.version = '0.0.5';

exports.defaults = {};

exports.parse = function(objects, params) {
  var geojson = baseObj();
  var conf = setConf(params, objects[0]);
  getGeomAttrList(params);

  objects.forEach(function(item){
    var feature = buildFeature(item, conf);
    geojson.features.push(feature);
  });

  return geojson;
};

// Helper functions
var geoms = [
  'Point',
  'MultiPoint',
  'LineString',
  'MultiLineString',
  'Polygon',
  'MultiPolygon'
];

var geomAttrs = [];

function baseObj() {
  return {
    "type": "FeatureCollection",
    "features": []
  };
}

function getGeomAttrList(params) {
  for(var param in params) {
    if(params.hasOwnProperty(param) && geoms.indexOf(param) !== -1) {
      if(typeof params[param] === 'string') {
        geomAttrs.push(params[param]);
      } else if (typeof params[param] === 'object') { // Array of coordinates for Point
        geomAttrs.push(params[param][0]);
        geomAttrs.push(params[param][1]);
      }
    }
  }
}

function getAttrList(params, item) {
  if (params.include) {
    return params.include;
  } else if (params.exclude) {
    var attrs = [];
    for(var attr in item) {
      if (item.hasOwnProperty(attr) &&
        params.exclude.indexOf(attr) === -1 &&
        geomAttrs.indexOf(attr) === -1) {
        attrs.push(attr);
      }
    }
    return attrs;
  } else {
    return 'all';
  }
}

function setConf(params, item) {
  var conf = {};
  conf.geom = {};

  for(var param in params) {
    if(params.hasOwnProperty(param) && geoms.indexOf(param) !== -1){
      conf.geom[param] = params[param];
    }
  }

  conf.attrs = getAttrList(params, item);

  return conf;
}

function buildFeature(item, conf) {
  var feature = { "type": "Feature" };

  feature.geometry = buildGeom(item, conf);
  feature.properties = buildProps(item, conf);

  return feature;
}

function buildGeom(item, conf) {
  var geom = {};

  for(var attr in item) {
    if(item.hasOwnProperty(attr) && geomAttrs.indexOf(attr) !== -1) {
      for(var gtype in conf.geom) {
        if(conf.geom.hasOwnProperty(gtype) &&
          (attr === conf.geom[gtype] || attr === conf.geom[gtype][0])) {
          geom.type = gtype;

          if (typeof conf.geom[gtype] === 'string') {
            geom.coordinates = item[conf.geom[gtype]];
          } else { // Point with geom stored in two attributes
            geom.coordinates = [item[conf.geom[gtype][1]], item[conf.geom[gtype][0]]];
          }

          return geom;
        }
      }
    }
  }
}

function buildProps(item, conf) {
  var properties = {};

  if (conf.attrs !== 'all') {
    conf.attrs.forEach(function(attr) {
      properties[attr] = item[attr];
    });
  } else { // include or exclude not specified. Include all fields except geometry fields
    for(var attr in item) {
      if(item.hasOwnProperty(attr) && (geomAttrs.indexOf(attr) === -1)) {
        properties[attr] = item[attr];
      }
    }
  }

  return properties;
}