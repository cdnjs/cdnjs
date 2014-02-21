Proj4js.Proj.aeqd = {

  init : function() {
    this.sin_p12=Math.sin(this.lat0);
    this.cos_p12=Math.cos(this.lat0);
  },

  forward: function(p) {
    var lon=p.x;
    var lat=p.y;
    var ksp;

    var sinphi=Math.sin(p.y);
    var cosphi=Math.cos(p.y); 
    var dlon = Proj4js.common.adjust_lon(lon - this.long0);
    var coslon = Math.cos(dlon);
    var g = this.sin_p12 * sinphi + this.cos_p12 * cosphi * coslon;
    if (Math.abs(Math.abs(g) - 1.0) < Proj4js.common.EPSLN) {
       ksp = 1.0;
       if (g < 0.0) {
         Proj4js.reportError("aeqd:Fwd:PointError");
         return;
       }
    } else {
       var z = Math.acos(g);
       ksp = z/Math.sin(z);
    }
    p.x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon);
    p.y = this.y0 + this.a * ksp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * coslon);
    return p;
  },

  inverse: function(p){
    p.x -= this.x0;
    p.y -= this.y0;

    var rh = Math.sqrt(p.x * p.x + p.y *p.y);
    if (rh > (2.0 * Proj4js.common.HALF_PI * this.a)) {
       Proj4js.reportError("aeqdInvDataError");
       return;
    }
    var z = rh / this.a;

    var sinz=Math.sin(z);
    var cosz=Math.cos(z);

    var lon = this.long0;
    var lat;
    if (Math.abs(rh) <= Proj4js.common.EPSLN) {
      lat = this.lat0;
    } else {
      lat = Proj4js.common.asinz(cosz * this.sin_p12 + (p.y * sinz * this.cos_p12) / rh);
      var con = Math.abs(this.lat0) - Proj4js.common.HALF_PI;
      if (Math.abs(con) <= Proj4js.common.EPSLN) {
        if (this.lat0 >= 0.0) {
          lon = Proj4js.common.adjust_lon(this.long0 + Math.atan2(p.x , -p.y));
        } else {
          lon = Proj4js.common.adjust_lon(this.long0 - Math.atan2(-p.x , p.y));
        }
      } else {
        con = cosz - this.sin_p12 * Math.sin(lat);
        if ((Math.abs(con) < Proj4js.common.EPSLN) && (Math.abs(p.x) < Proj4js.common.EPSLN)) {
           //no-op, just keep the lon value as is
        } else {
          var temp = Math.atan2((p.x * sinz * this.cos_p12), (con * rh));
          lon = Proj4js.common.adjust_lon(this.long0 + Math.atan2((p.x * sinz * this.cos_p12), (con * rh)));
        }
      }
    }

    p.x = lon;
    p.y = lat;
    return p;
  } 
};
