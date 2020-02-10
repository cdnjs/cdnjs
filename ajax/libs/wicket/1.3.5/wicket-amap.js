(function (Wkt) {

  Wkt.Wkt.prototype.construct = {
    point: function(config) {
      var opt = config || {};
      opt.position = new AMap.LngLat(this.components[0].x, this.components[0].y);
      return new AMap.Marker(opt);
    },

    polygon: function (config) {
      var opt = config || {};
      opt.path = this.components[0].map(function(p) {
        return new AMap.LngLat(p.x, p.y);
      });
      opt.path.pop();           // unclosure
      return new AMap.Polygon(opt);
    }
  };

  Wkt.Wkt.prototype.deconstruct = deconstruct;

  function deconstruct(obj) {
    if (obj.constructor === AMap.Marker) {
      var p = obj.getPosition();
      return {
        type: 'point',
        components: [{
          x: p.getLng(),
          y: p.getLat()
        }]
      };
    }

    if (obj.constructor === AMap.Polygon) {
      var verts = obj.getPath().map(function(p) {
        return {
          x: p.getLng(),
          y: p.getLat()
        };
      });
      verts.push({              // closure
        x: verts[0].x,
        y: verts[0].y
      });

      return {
        type: 'polygon',
        components: [verts]
      };
    }

    console.error('Unsupported geometry class');
    return null;
  }

}(Wkt || require('./wicket')));
