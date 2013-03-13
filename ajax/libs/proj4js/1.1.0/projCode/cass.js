/*******************************************************************************
NAME                            CASSINI

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Cassini projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.
    Ported from PROJ.4.


ALGORITHM REFERENCES

1.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

2.  Snyder, John P. and Voxland, Philip M., "An Album of Map Projections",
    U.S. Geological Survey Professional Paper 1453 , United State Government
*******************************************************************************/


//Proj4js.defs["EPSG:28191"] = "+proj=cass +lat_0=31.73409694444445 +lon_0=35.21208055555556 +x_0=170251.555 +y_0=126867.909 +a=6378300.789 +b=6356566.435 +towgs84=-275.722,94.7824,340.894,-8.001,-4.42,-11.821,1 +units=m +no_defs";

// Initialize the Cassini projection
// -----------------------------------------------------------------

Proj4js.Proj.cass = {
  init : function() {
    if (!this.sphere) {
      this.en = Proj4js.common.pj_enfn(this.es)
      this.m0 = Proj4js.common.pj_mlfn(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
    }
  },

  C1:	.16666666666666666666,
  C2:	.00833333333333333333,
  C3:	.04166666666666666666,
  C4:	.33333333333333333333,
  C5:	.06666666666666666666,


/* Cassini forward equations--mapping lat,long to x,y
  -----------------------------------------------------------------------*/
  forward: function(p) {

    /* Forward equations
      -----------------*/
    var x,y;
    var lam=p.x;
    var phi=p.y;
    lam = Proj4js.common.adjust_lon(lam - this.long0);
    
    if (this.sphere) {
      x = Math.asin(Math.cos(phi) * Math.sin(lam));
      y = Math.atan2(Math.tan(phi) , Math.cos(lam)) - this.phi0;
    } else {
        //ellipsoid
      this.n = Math.sin(phi);
      this.c = Math.cos(phi);
      y = Proj4js.common.pj_mlfn(phi, this.n, this.c, this.en);
      this.n = 1./Math.sqrt(1. - this.es * this.n * this.n);
      this.tn = Math.tan(phi); 
      this.t = this.tn * this.tn;
      this.a1 = lam * this.c;
      this.c *= this.es * this.c / (1 - this.es);
      this.a2 = this.a1 * this.a1;
      x = this.n * this.a1 * (1. - this.a2 * this.t * (this.C1 - (8. - this.t + 8. * this.c) * this.a2 * this.C2));
      y -= this.m0 - this.n * this.tn * this.a2 * (.5 + (5. - this.t + 6. * this.c) * this.a2 * this.C3);
    }
    
    p.x = this.a*x + this.x0;
    p.y = this.a*y + this.y0;
    return p;
  },//cassFwd()

/* Inverse equations
  -----------------*/
  inverse: function(p) {
    p.x -= this.x0;
    p.y -= this.y0;
    var x = p.x/this.a;
    var y = p.y/this.a;
    var phi, lam;

    if (this.sphere) {
      this.dd = y + this.lat0;
      phi = Math.asin(Math.sin(this.dd) * Math.cos(x));
      lam = Math.atan2(Math.tan(x), Math.cos(this.dd));
    } else {
      /* ellipsoid */
      var ph1 = Proj4js.common.pj_inv_mlfn(this.m0 + y, this.es, this.en);
      this.tn = Math.tan(ph1); 
      this.t = this.tn * this.tn;
      this.n = Math.sin(ph1);
      this.r = 1. / (1. - this.es * this.n * this.n);
      this.n = Math.sqrt(this.r);
      this.r *= (1. - this.es) * this.n;
      this.dd = x / this.n;
      this.d2 = this.dd * this.dd;
      phi = ph1 - (this.n * this.tn / this.r) * this.d2 * (.5 - (1. + 3. * this.t) * this.d2 * this.C3);
      lam = this.dd * (1. + this.t * this.d2 * (-this.C4 + (1. + 3. * this.t) * this.d2 * this.C5)) / Math.cos(ph1);
    }
    p.x = Proj4js.common.adjust_lon(this.long0+lam);
    p.y = phi;
    return p;
  }//cassInv()

}
