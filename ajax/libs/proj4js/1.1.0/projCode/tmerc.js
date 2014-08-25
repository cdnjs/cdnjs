/*******************************************************************************
NAME                            TRANSVERSE MERCATOR

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Transverse Mercator projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.

ALGORITHM REFERENCES

1.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

2.  Snyder, John P. and Voxland, Philip M., "An Album of Map Projections",
    U.S. Geological Survey Professional Paper 1453 , United State Government
    Printing Office, Washington D.C., 1989.
*******************************************************************************/


/**
  Initialize Transverse Mercator projection
*/

Proj4js.Proj.tmerc = {
  init : function() {
    this.e0 = Proj4js.common.e0fn(this.es);
    this.e1 = Proj4js.common.e1fn(this.es);
    this.e2 = Proj4js.common.e2fn(this.es);
    this.e3 = Proj4js.common.e3fn(this.es);
    this.ml0 = this.a * Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
  },

  /**
    Transverse Mercator Forward  - long/lat to x/y
    long/lat in radians
  */
  forward : function(p) {
    var lon = p.x;
    var lat = p.y;

    var delta_lon = Proj4js.common.adjust_lon(lon - this.long0); // Delta longitude
    var con;    // cone constant
    var x, y;
    var sin_phi=Math.sin(lat);
    var cos_phi=Math.cos(lat);

    if (this.sphere) {  /* spherical form */
      var b = cos_phi * Math.sin(delta_lon);
      if ((Math.abs(Math.abs(b) - 1.0)) < .0000000001)  {
        Proj4js.reportError("tmerc:forward: Point projects into infinity");
        return(93);
      } else {
        x = .5 * this.a * this.k0 * Math.log((1.0 + b)/(1.0 - b));
        con = Math.acos(cos_phi * Math.cos(delta_lon)/Math.sqrt(1.0 - b*b));
        if (lat < 0) con = - con;
        y = this.a * this.k0 * (con - this.lat0);
      }
    } else {
      var al  = cos_phi * delta_lon;
      var als = Math.pow(al,2);
      var c   = this.ep2 * Math.pow(cos_phi,2);
      var tq  = Math.tan(lat);
      var t   = Math.pow(tq,2);
      con = 1.0 - this.es * Math.pow(sin_phi,2);
      var n   = this.a / Math.sqrt(con);
      var ml  = this.a * Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, lat);

      x = this.k0 * n * al * (1.0 + als / 6.0 * (1.0 - t + c + als / 20.0 * (5.0 - 18.0 * t + Math.pow(t,2) + 72.0 * c - 58.0 * this.ep2))) + this.x0;
      y = this.k0 * (ml - this.ml0 + n * tq * (als * (0.5 + als / 24.0 * (5.0 - t + 9.0 * c + 4.0 * Math.pow(c,2) + als / 30.0 * (61.0 - 58.0 * t + Math.pow(t,2) + 600.0 * c - 330.0 * this.ep2))))) + this.y0;

    }
    p.x = x; p.y = y;
    return p;
  }, // tmercFwd()

  /**
    Transverse Mercator Inverse  -  x/y to long/lat
  */
  inverse : function(p) {
    var con, phi;  /* temporary angles       */
    var delta_phi; /* difference between longitudes    */
    var i;
    var max_iter = 6;      /* maximun number of iterations */
    var lat, lon;

    if (this.sphere) {   /* spherical form */
      var f = Math.exp(p.x/(this.a * this.k0));
      var g = .5 * (f - 1/f);
      var temp = this.lat0 + p.y/(this.a * this.k0);
      var h = Math.cos(temp);
      con = Math.sqrt((1.0 - h * h)/(1.0 + g * g));
      lat = Proj4js.common.asinz(con);
      if (temp < 0)
        lat = -lat;
      if ((g == 0) && (h == 0)) {
        lon = this.long0;
      } else {
        lon = Proj4js.common.adjust_lon(Math.atan2(g,h) + this.long0);
      }
    } else {    // ellipsoidal form
      var x = p.x - this.x0;
      var y = p.y - this.y0;

      con = (this.ml0 + y / this.k0) / this.a;
      phi = con;
      for (i=0;true;i++) {
        delta_phi=((con + this.e1 * Math.sin(2.0*phi) - this.e2 * Math.sin(4.0*phi) + this.e3 * Math.sin(6.0*phi)) / this.e0) - phi;
        phi += delta_phi;
        if (Math.abs(delta_phi) <= Proj4js.common.EPSLN) break;
        if (i >= max_iter) {
          Proj4js.reportError("tmerc:inverse: Latitude failed to converge");
          return(95);
        }
      } // for()
      if (Math.abs(phi) < Proj4js.common.HALF_PI) {
        // sincos(phi, &sin_phi, &cos_phi);
        var sin_phi=Math.sin(phi);
        var cos_phi=Math.cos(phi);
        var tan_phi = Math.tan(phi);
        var c = this.ep2 * Math.pow(cos_phi,2);
        var cs = Math.pow(c,2);
        var t = Math.pow(tan_phi,2);
        var ts = Math.pow(t,2);
        con = 1.0 - this.es * Math.pow(sin_phi,2);
        var n = this.a / Math.sqrt(con);
        var r = n * (1.0 - this.es) / con;
        var d = x / (n * this.k0);
        var ds = Math.pow(d,2);
        lat = phi - (n * tan_phi * ds / r) * (0.5 - ds / 24.0 * (5.0 + 3.0 * t + 10.0 * c - 4.0 * cs - 9.0 * this.ep2 - ds / 30.0 * (61.0 + 90.0 * t + 298.0 * c + 45.0 * ts - 252.0 * this.ep2 - 3.0 * cs)));
        lon = Proj4js.common.adjust_lon(this.long0 + (d * (1.0 - ds / 6.0 * (1.0 + 2.0 * t + c - ds / 20.0 * (5.0 - 2.0 * c + 28.0 * t - 3.0 * cs + 8.0 * this.ep2 + 24.0 * ts))) / cos_phi));
      } else {
        lat = Proj4js.common.HALF_PI * Proj4js.common.sign(y);
        lon = this.long0;
      }
    }
    p.x = lon;
    p.y = lat;
    return p;
  } // tmercInv()
};