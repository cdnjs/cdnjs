/*******************************************************************************
NAME                  		SINUSOIDAL

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the Sinusoidal projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.

PROGRAMMER              DATE            
----------              ----           
D. Steinwand, EROS      May, 1991     

This function was adapted from the Sinusoidal projection code (FORTRAN) in the 
General Cartographic Transformation Package software which is available from 
the U.S. Geological Survey National Mapping Division.
 
ALGORITHM REFERENCES

1.  Snyder, John P., "Map Projections--A Working Manual", U.S. Geological
    Survey Professional Paper 1395 (Supersedes USGS Bulletin 1532), United
    State Government Printing Office, Washington D.C., 1987.

2.  "Software Documentation for GCTP General Cartographic Transformation
    Package", U.S. Geological Survey National Mapping Division, May 1982.
*******************************************************************************/

Proj4js.Proj.sinu = {

	/* Initialize the Sinusoidal projection
	  ------------------------------------*/
	init: function() {
		/* Place parameters in static storage for common use
		  -------------------------------------------------*/
		  

		if (!this.sphere) {
		  this.en = Proj4js.common.pj_enfn(this.es);
    } else {
      this.n = 1.;
      this.m = 0.;
      this.es = 0;
      this.C_y = Math.sqrt((this.m + 1.) / this.n);
      this.C_x = this.C_y/(this.m + 1.);
    }
		  
	},

	/* Sinusoidal forward equations--mapping lat,long to x,y
	-----------------------------------------------------*/
	forward: function(p) {
		var x,y,delta_lon;	
		var lon=p.x;
		var lat=p.y;	
		/* Forward equations
		-----------------*/
		lon = Proj4js.common.adjust_lon(lon - this.long0);
		
		if (this.sphere) {
      if (!this.m) {
        lat = this.n != 1. ? Math.asin(this.n * Math.sin(lat)): lat;
      } else {
        var k = this.n * Math.sin(lat);
        for (var i = Proj4js.common.MAX_ITER; i ; --i) {
          var V = (this.m * lat + Math.sin(lat) - k) / (this.m + Math.cos(lat));
          lat -= V;
          if (Math.abs(V) < Proj4js.common.EPSLN) break;
        }
      }
      x = this.a * this.C_x * lon * (this.m + Math.cos(lat));
      y = this.a * this.C_y * lat;

		} else {
		  
		  var s = Math.sin(lat);
		  var c = Math.cos(lat);
      y = this.a * Proj4js.common.pj_mlfn(lat, s, c, this.en);
      x = this.a * lon * c / Math.sqrt(1. - this.es * s * s);
		}

		p.x=x;
		p.y=y;	
		return p;
	},

	inverse: function(p) {
		var lat,temp,lon;	
		
		/* Inverse equations
		  -----------------*/
		p.x -= this.x0;
		p.y -= this.y0;
		lat = p.y / this.a;
		
		if (this.sphere) {
		  
      p.y /= this.C_y;
      lat = this.m ? Math.asin((this.m * p.y + Math.sin(p.y)) / this.n) :
        ( this.n != 1. ? Math.asin(Math.sin(p.y) / this.n) : p.y );
      lon = p.x / (this.C_x * (this.m + Math.cos(p.y)));
		  
		} else {
		  lat = Proj4js.common.pj_inv_mlfn(p.y/this.a, this.es, this.en)
		  var s = Math.abs(lat);
      if (s < Proj4js.common.HALF_PI) {
        s = Math.sin(lat);
        temp = this.long0 + p.x * Math.sqrt(1. - this.es * s * s) /(this.a * Math.cos(lat));
        //temp = this.long0 + p.x / (this.a * Math.cos(lat));
        lon = Proj4js.common.adjust_lon(temp);
      } else if ((s - Proj4js.common.EPSLN) < Proj4js.common.HALF_PI) {
        lon = this.long0;
      }
		  
		}
		  
		p.x=lon;
		p.y=lat;
		return p;
	}
};


