/*******************************************************************************
NAME                            EQUIDISTANT CONIC 

PURPOSE:	Transforms input longitude and latitude to Easting and Northing
		for the Equidistant Conic projection.  The longitude and
		latitude must be in radians.  The Easting and Northing values
		will be returned in meters.

PROGRAMMER              DATE
----------              ----
T. Mittan		Mar, 1993

ALGORITHM REFERENCES

1.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

2.  Snyder, John P. and Voxland, Philip M., "An Album of Map Projections",
    U.S. Geological Survey Professional Paper 1453 , United State Government
    Printing Office, Washington D.C., 1989.
*******************************************************************************/

/* Variables common to all subroutines in this code file
  -----------------------------------------------------*/

Proj4js.Proj.eqdc = {

/* Initialize the Equidistant Conic projection
  ------------------------------------------*/
  init: function() {

    /* Place parameters in static storage for common use
      -------------------------------------------------*/

    if(!this.mode) this.mode=0;//chosen default mode
    this.temp = this.b / this.a;
    this.es = 1.0 - Math.pow(this.temp,2);
    this.e = Math.sqrt(this.es);
    this.e0 = Proj4js.common.e0fn(this.es);
    this.e1 = Proj4js.common.e1fn(this.es);
    this.e2 = Proj4js.common.e2fn(this.es);
    this.e3 = Proj4js.common.e3fn(this.es);

    this.sinphi=Math.sin(this.lat1);
    this.cosphi=Math.cos(this.lat1);

    this.ms1 = Proj4js.common.msfnz(this.e,this.sinphi,this.cosphi);
    this.ml1 = Proj4js.common.mlfn(this.e0, this.e1, this.e2,this.e3, this.lat1);

    /* format B
    ---------*/
    if (this.mode != 0) {
      if (Math.abs(this.lat1 + this.lat2) < Proj4js.common.EPSLN) {
            Proj4js.reportError("eqdc:Init:EqualLatitudes");
            //return(81);
       }
       this.sinphi=Math.sin(this.lat2);
       this.cosphi=Math.cos(this.lat2);   

       this.ms2 = Proj4js.common.msfnz(this.e,this.sinphi,this.cosphi);
       this.ml2 = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat2);
       if (Math.abs(this.lat1 - this.lat2) >= Proj4js.common.EPSLN) {
         this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1);
       } else {
          this.ns = this.sinphi;
       }
    } else {
      this.ns = this.sinphi;
    }
    this.g = this.ml1 + this.ms1/this.ns;
    this.ml0 = Proj4js.common.mlfn(this.e0, this.e1,this. e2, this.e3, this.lat0);
    this.rh = this.a * (this.g - this.ml0);
  },


/* Equidistant Conic forward equations--mapping lat,long to x,y
  -----------------------------------------------------------*/
  forward: function(p) {
    var lon=p.x;
    var lat=p.y;

    /* Forward equations
      -----------------*/
    var ml = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, lat);
    var rh1 = this.a * (this.g - ml);
    var theta = this.ns * Proj4js.common.adjust_lon(lon - this.long0);

    var x = this.x0  + rh1 * Math.sin(theta);
    var y = this.y0 + this.rh - rh1 * Math.cos(theta);
    p.x=x;
    p.y=y;
    return p;
  },

/* Inverse equations
  -----------------*/
  inverse: function(p) {
    p.x -= this.x0;
    p.y  = this.rh - p.y + this.y0;
    var con, rh1;
    if (this.ns >= 0) {
       rh1 = Math.sqrt(p.x *p.x + p.y * p.y); 
       con = 1.0;
    } else {
       rh1 = -Math.sqrt(p.x *p. x +p. y * p.y); 
       con = -1.0;
    }
    var theta = 0.0;
    if (rh1 != 0.0) theta = Math.atan2(con *p.x, con *p.y);
    var ml = this.g - rh1 /this.a;
    var lat = this.phi3z(ml,this.e0,this.e1,this.e2,this.e3);
    var lon = Proj4js.common.adjust_lon(this.long0 + theta / this.ns);

     p.x=lon;
     p.y=lat;  
     return p;
    },
    
/* Function to compute latitude, phi3, for the inverse of the Equidistant
   Conic projection.
-----------------------------------------------------------------*/
  phi3z: function(ml,e0,e1,e2,e3) {
    var phi;
    var dphi;

    phi = ml;
    for (var i = 0; i < 15; i++) {
      dphi = (ml + e1 * Math.sin(2.0 * phi) - e2 * Math.sin(4.0 * phi) + e3 * Math.sin(6.0 * phi))/ e0 - phi;
      phi += dphi;
      if (Math.abs(dphi) <= .0000000001) {
        return phi;
      }
    }
    Proj4js.reportError("PHI3Z-CONV:Latitude failed to converge after 15 iterations");
    return null;
  }

    
};