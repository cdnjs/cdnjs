exports.version = '0.0.1';

exports.defaults = {};

exports.parse = function(objects, params) {
  var geojson = baseObj();
  var conf = setConf(params, objects[0]);

  objects.forEach(function(item){
    var feature = buildFeature(item, conf);
    geojson.features.push(feature);
  });

  return geojson;
};

// Helper functions
function baseObj() {
  return {
    "type": "FeatureCollection",
    "features": []
  };
}

function getAttrList(params, item) {
  if (params.include) {
    return params.include;
  } else if (params.exclude) {
    var attrs = [];
    for(var attr in item) {
      if (item.hasOwnProperty(attr) && params.exclude.indexOf(attr) === -1) {
        attrs.push(attr);
      }
    }
    return attrs;
  } else {
    return 'all';
  }
}

function setConf(params, item) {
  return {
    x: params.point[1],
    y: params.point[0],
    attrs: getAttrList(params, item)
  };
}

function buildFeature(item, conf) {
  var feature = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [Number(item[conf.y]), Number(item[conf.x])]
    },
    "properties" : {}
  };

  if (conf.attrs !== 'all') {
    conf.attrs.forEach(function(attr) {
      feature.properties[attr] = item[attr];
    });
  } else { // include or exclude not specified. Include all fields except geom/coords
    for(var attr in item) {
      if(item.hasOwnProperty(attr) && (attr !== conf.x && attr !==conf.y)) {
        feature.properties[attr] = item[attr];
      }
    }
  }

  return feature;
}