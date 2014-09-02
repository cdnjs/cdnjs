/*****************************************************************************
NAME                             GNOMONIC

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Gnomonic Projection.
                Implementation based on the existing sterea and ortho
                implementations.

PROGRAMMER              DATE
----------              ----
Richard Marsden         November 2009

ALGORITHM REFERENCES

1.  Snyder, John P., "Flattening the Earth - Two Thousand Years of Map 
    Projections", University of Chicago Press 1993

2.  Wolfram Mathworld "Gnomonic Projection"
    http://mathworld.wolfram.com/GnomonicProjection.html
    Accessed: 12th November 2009
******************************************************************************/

Proj4js.Proj.gnom = {

  /* Initialize the Gnomonic projection
    -------------------------------------*/
  init: function(def) {

    /* Place parameters in static storage for common use
      -------------------------------------------------*/
    this.sin_p14=Math.sin(this.lat0);
    this.cos_p14=Math.cos(this.lat0);
    // Approximation for projecting points to the horizon (infinity)
    this.infinity_dist = 1000 * this.a;
    this.rc = 1;
  },


  /* Gnomonic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
  forward: function(p) {
    var sinphi, cosphi;	/* sin and cos value				*/
    var dlon;		/* delta longitude value			*/
    var coslon;		/* cos of longitude				*/
    var ksp;		/* scale factor					*/
    var g;		
    var x, y;
    var lon=p.x;
    var lat=p.y;	
    /* Forward equations
      -----------------*/
    dlon = Proj4js.common.adjust_lon(lon - this.long0);

    sinphi=Math.sin(lat);
    cosphi=Math.cos(lat);	

    coslon = Math.cos(dlon);
    g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
    ksp = 1.0;
    if ((g > 0) || (Math.abs(g) <= Proj4js.common.EPSLN)) {
      x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g;
      y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g;
    } else {
      Proj4js.reportError("orthoFwdPointError");

      // Point is in the opposing hemisphere and is unprojectable
      // We still need to return a reasonable point, so we project 
      // to infinity, on a bearing 
      // equivalent to the northern hemisphere equivalent
      // This is a reasonable approximation for short shapes and lines that 
      // straddle the horizon.

      x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon);
      y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);

    }
    p.x=x;
    p.y=y;
    return p;
  },


  inverse: function(p) {
    var rh;		/* Rho */
    var z;		/* angle */
    var sinc, cosc;
    var c;
    var lon , lat;

    /* Inverse equations
      -----------------*/
    p.x = (p.x - this.x0) / this.a;
    p.y = (p.y - this.y0) / this.a;

    p.x /= this.k0;
    p.y /= this.k0;

    if ( (rh = Math.sqrt(p.x * p.x + p.y * p.y)) ) {
      c = Math.atan2(rh, this.rc);
      sinc = Math.sin(c);
      cosc = Math.cos(c);

      lat = Proj4js.common.asinz(cosc*this.sin_p14 + (p.y*sinc*this.cos_p14) / rh);
      lon = Math.atan2(p.x*sinc, rh*this.cos_p14*cosc - p.y*this.sin_p14*sinc);
      lon = Proj4js.common.adjust_lon(this.long0+lon);
    } else {
      lat = this.phic0;
      lon = 0.0;
    }
 
    p.x=lon;
    p.y=lat;
    return p;
  }
};


