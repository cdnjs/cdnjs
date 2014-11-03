/*******************************************************************************
NAME                    LAMBERT CYLINDRICAL EQUAL AREA

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Lambert Cylindrical Equal Area projection.
                This class of projection includes the Behrmann and 
                Gall-Peters Projections.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.

PROGRAMMER              DATE            
----------              ----
R. Marsden              August 2009
Winwaed Software Tech LLC, http://www.winwaed.com

This function was adapted from the Miller Cylindrical Projection in the Proj4JS
library.

Note: This implementation assumes a Spherical Earth. The (commented) code 
has been included for the ellipsoidal forward transform, but derivation of 
the ellispoidal inverse transform is beyond me. Note that most of the 
Proj4JS implementations do NOT currently support ellipsoidal figures. 
Therefore this is not seen as a problem - especially this lack of support 
is explicitly stated here.
 
ALGORITHM REFERENCES

1.  "Cartographic Projection Procedures for the UNIX Environment - 
     A User's Manual" by Gerald I. Evenden, USGS Open File Report 90-284
    and Release 4 Interim Reports (2003)

2.  Snyder, John P., "Flattening the Earth - Two Thousand Years of Map 
    Projections", Univ. Chicago Press, 1993
*******************************************************************************/

Proj4js.Proj.cea = {

/* Initialize the Cylindrical Equal Area projection
  -------------------------------------------*/
  init: function() {
    //no-op
  },


  /* Cylindrical Equal Area forward equations--mapping lat,long to x,y
    ------------------------------------------------------------*/
  forward: function(p) {
    var lon=p.x;
    var lat=p.y;
    /* Forward equations
      -----------------*/
    var dlon = Proj4js.common.adjust_lon(lon -this.long0);
    var x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
    var y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
   /* Elliptical Forward Transform
      Not implemented due to a lack of a matchign inverse function
    {
      var Sin_Lat = Math.sin(lat);
      var Rn = this.a * (Math.sqrt(1.0e0 - this.es * Sin_Lat * Sin_Lat ));
      x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
      y = this.y0 + Rn * Math.sin(lat) / Math.cos(this.lat_ts);
    }
   */


    p.x=x;
    p.y=y;
    return p;
  },//ceaFwd()

  /* Cylindrical Equal Area inverse equations--mapping x,y to lat/long
    ------------------------------------------------------------*/
  inverse: function(p) {
    p.x -= this.x0;
    p.y -= this.y0;

    var lon = Proj4js.common.adjust_lon( this.long0 + (p.x / this.a) / Math.cos(this.lat_ts) );

    var lat = Math.asin( (p.y/this.a) * Math.cos(this.lat_ts) );

    p.x=lon;
    p.y=lat;
    return p;
  }//ceaInv()
};
