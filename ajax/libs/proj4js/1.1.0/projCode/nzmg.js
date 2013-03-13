/*******************************************************************************
NAME                            NEW ZEALAND MAP GRID

PURPOSE:	Transforms input longitude and latitude to Easting and
		Northing for the New Zealand Map Grid projection.  The
		longitude and latitude must be in radians.  The Easting
		and Northing values will be returned in meters.


ALGORITHM REFERENCES

1.  Department of Land and Survey Technical Circular 1973/32
      http://www.linz.govt.nz/docs/miscellaneous/nz-map-definition.pdf

2.  OSG Technical Report 4.1
      http://www.linz.govt.nz/docs/miscellaneous/nzmg.pdf


IMPLEMENTATION NOTES

The two references use different symbols for the calculated values. This
implementation uses the variable names similar to the symbols in reference [1].

The alogrithm uses different units for delta latitude and delta longitude.
The delta latitude is assumed to be in units of seconds of arc x 10^-5.
The delta longitude is the usual radians. Look out for these conversions.

The algorithm is described using complex arithmetic. There were three
options:
   * find and use a Javascript library for complex arithmetic
   * write my own complex library
   * expand the complex arithmetic by hand to simple arithmetic

This implementation has expanded the complex multiplication operations
into parallel simple arithmetic operations for the real and imaginary parts.
The imaginary part is way over to the right of the display; this probably
violates every coding standard in the world, but, to me, it makes it much
more obvious what is going on.

The following complex operations are used:
   - addition
   - multiplication
   - division
   - complex number raised to integer power
   - summation

A summary of complex arithmetic operations:
   (from http://en.wikipedia.org/wiki/Complex_arithmetic)
   addition:       (a + bi) + (c + di) = (a + c) + (b + d)i
   subtraction:    (a + bi) - (c + di) = (a - c) + (b - d)i
   multiplication: (a + bi) x (c + di) = (ac - bd) + (bc + ad)i
   division:       (a + bi) / (c + di) = [(ac + bd)/(cc + dd)] + [(bc - ad)/(cc + dd)]i

The algorithm needs to calculate summations of simple and complex numbers. This is
implemented using a for-loop, pre-loading the summed value to zero.

The algorithm needs to calculate theta^2, theta^3, etc while doing a summation.
There are three possible implementations:
   - use Math.pow in the summation loop - except for complex numbers
   - precalculate the values before running the loop
   - calculate theta^n = theta^(n-1) * theta during the loop
This implementation uses the third option for both real and complex arithmetic.

For example
   psi_n = 1;
   sum = 0;
   for (n = 1; n <=6; n++) {
      psi_n1 = psi_n * psi;       // calculate psi^(n+1)
      psi_n = psi_n1;
      sum = sum + A[n] * psi_n;
   }


TEST VECTORS

NZMG E, N:         2487100.638      6751049.719     metres
NZGD49 long, lat:      172.739194       -34.444066  degrees

NZMG E, N:         2486533.395      6077263.661     metres
NZGD49 long, lat:      172.723106       -40.512409  degrees

NZMG E, N:         2216746.425      5388508.765     metres
NZGD49 long, lat:      169.172062       -46.651295  degrees

Note that these test vectors convert from NZMG metres to lat/long referenced
to NZGD49, not the more usual WGS84. The difference is about 70m N/S and about
10m E/W.

These test vectors are provided in reference [1]. Many more test
vectors are available in
   http://www.linz.govt.nz/docs/topography/topographicdata/placenamesdatabase/nznamesmar08.zip
which is a catalog of names on the 260-series maps.


EPSG CODES

NZMG     EPSG:27200
NZGD49   EPSG:4272

http://spatialreference.org/ defines these as
  Proj4js.defs["EPSG:4272"] = "+proj=longlat +ellps=intl +datum=nzgd49 +no_defs ";
  Proj4js.defs["EPSG:27200"] = "+proj=nzmg +lat_0=-41 +lon_0=173 +x_0=2510000 +y_0=6023150 +ellps=intl +datum=nzgd49 +units=m +no_defs ";


LICENSE
  Copyright: Stephen Irons 2008
  Released under terms of the LGPL as per: http://www.gnu.org/copyleft/lesser.html

*******************************************************************************/


/**
  Initialize New Zealand Map Grip projection
*/

Proj4js.Proj.nzmg = {

  /**
   * iterations: Number of iterations to refine inverse transform.
   *     0 -> km accuracy
   *     1 -> m accuracy -- suitable for most mapping applications
   *     2 -> mm accuracy
   */
  iterations: 1,

  init : function() {
    this.A = new Array();
    this.A[1]  = +0.6399175073;
    this.A[2]  = -0.1358797613;
    this.A[3]  = +0.063294409;
    this.A[4]  = -0.02526853;
    this.A[5]  = +0.0117879;
    this.A[6]  = -0.0055161;
    this.A[7]  = +0.0026906;
    this.A[8]  = -0.001333;
    this.A[9]  = +0.00067;
    this.A[10] = -0.00034;

    this.B_re = new Array();        this.B_im = new Array();
    this.B_re[1] = +0.7557853228;   this.B_im[1] =  0.0;
    this.B_re[2] = +0.249204646;    this.B_im[2] = +0.003371507;
    this.B_re[3] = -0.001541739;    this.B_im[3] = +0.041058560;
    this.B_re[4] = -0.10162907;     this.B_im[4] = +0.01727609;
    this.B_re[5] = -0.26623489;     this.B_im[5] = -0.36249218;
    this.B_re[6] = -0.6870983;      this.B_im[6] = -1.1651967;

    this.C_re = new Array();        this.C_im = new Array();
    this.C_re[1] = +1.3231270439;   this.C_im[1] =  0.0;
    this.C_re[2] = -0.577245789;    this.C_im[2] = -0.007809598;
    this.C_re[3] = +0.508307513;    this.C_im[3] = -0.112208952;
    this.C_re[4] = -0.15094762;     this.C_im[4] = +0.18200602;
    this.C_re[5] = +1.01418179;     this.C_im[5] = +1.64497696;
    this.C_re[6] = +1.9660549;      this.C_im[6] = +2.5127645;

    this.D = new Array();
    this.D[1] = +1.5627014243;
    this.D[2] = +0.5185406398;
    this.D[3] = -0.03333098;
    this.D[4] = -0.1052906;
    this.D[5] = -0.0368594;
    this.D[6] = +0.007317;
    this.D[7] = +0.01220;
    this.D[8] = +0.00394;
    this.D[9] = -0.0013;
  },

  /**
    New Zealand Map Grid Forward  - long/lat to x/y
    long/lat in radians
  */
  forward : function(p) {
    var lon = p.x;
    var lat = p.y;

    var delta_lat = lat - this.lat0;
    var delta_lon = lon - this.long0;

    // 1. Calculate d_phi and d_psi    ...                          // and d_lambda
    // For this algorithm, delta_latitude is in seconds of arc x 10-5, so we need to scale to those units. Longitude is radians.
    var d_phi = delta_lat / Proj4js.common.SEC_TO_RAD * 1E-5;       var d_lambda = delta_lon;
    var d_phi_n = 1;  // d_phi^0

    var d_psi = 0;
    for (var n = 1; n <= 10; n++) {
      d_phi_n = d_phi_n * d_phi;
      d_psi = d_psi + this.A[n] * d_phi_n;
    }

    // 2. Calculate theta
    var th_re = d_psi;                                              var th_im = d_lambda;

    // 3. Calculate z
    var th_n_re = 1;                                                var th_n_im = 0;  // theta^0
    var th_n_re1;                                                   var th_n_im1;

    var z_re = 0;                                                   var z_im = 0;
    for (var n = 1; n <= 6; n++) {
      th_n_re1 = th_n_re*th_re - th_n_im*th_im;                     th_n_im1 = th_n_im*th_re + th_n_re*th_im;
      th_n_re = th_n_re1;                                           th_n_im = th_n_im1;
      z_re = z_re + this.B_re[n]*th_n_re - this.B_im[n]*th_n_im;    z_im = z_im + this.B_im[n]*th_n_re + this.B_re[n]*th_n_im;
    }

    // 4. Calculate easting and northing
    p.x = (z_im * this.a) + this.x0; 
    p.y = (z_re * this.a) + this.y0;

    return p;
  },


  /**
    New Zealand Map Grid Inverse  -  x/y to long/lat
  */
  inverse : function(p) {

    var x = p.x;
    var y = p.y;

    var delta_x = x - this.x0;
    var delta_y = y - this.y0;

    // 1. Calculate z
    var z_re = delta_y / this.a;                                              var z_im = delta_x / this.a;

    // 2a. Calculate theta - first approximation gives km accuracy
    var z_n_re = 1;                                                           var z_n_im = 0;  // z^0
    var z_n_re1;                                                              var z_n_im1;

    var th_re = 0;                                                            var th_im = 0;
    for (var n = 1; n <= 6; n++) {
      z_n_re1 = z_n_re*z_re - z_n_im*z_im;                                    z_n_im1 = z_n_im*z_re + z_n_re*z_im;
      z_n_re = z_n_re1;                                                       z_n_im = z_n_im1;
      th_re = th_re + this.C_re[n]*z_n_re - this.C_im[n]*z_n_im;              th_im = th_im + this.C_im[n]*z_n_re + this.C_re[n]*z_n_im;
    }

    // 2b. Iterate to refine the accuracy of the calculation
    //        0 iterations gives km accuracy
    //        1 iteration gives m accuracy -- good enough for most mapping applications
    //        2 iterations bives mm accuracy
    for (var i = 0; i < this.iterations; i++) {
       var th_n_re = th_re;                                                      var th_n_im = th_im;
       var th_n_re1;                                                             var th_n_im1;

       var num_re = z_re;                                                        var num_im = z_im;
       for (var n = 2; n <= 6; n++) {
         th_n_re1 = th_n_re*th_re - th_n_im*th_im;                               th_n_im1 = th_n_im*th_re + th_n_re*th_im;
         th_n_re = th_n_re1;                                                     th_n_im = th_n_im1;
         num_re = num_re + (n-1)*(this.B_re[n]*th_n_re - this.B_im[n]*th_n_im);  num_im = num_im + (n-1)*(this.B_im[n]*th_n_re + this.B_re[n]*th_n_im);
       }

       th_n_re = 1;                                                              th_n_im = 0;
       var den_re = this.B_re[1];                                                var den_im = this.B_im[1];
       for (var n = 2; n <= 6; n++) {
         th_n_re1 = th_n_re*th_re - th_n_im*th_im;                               th_n_im1 = th_n_im*th_re + th_n_re*th_im;
         th_n_re = th_n_re1;                                                     th_n_im = th_n_im1;
         den_re = den_re + n * (this.B_re[n]*th_n_re - this.B_im[n]*th_n_im);    den_im = den_im + n * (this.B_im[n]*th_n_re + this.B_re[n]*th_n_im);
       }

       // Complex division
       var den2 = den_re*den_re + den_im*den_im;
       th_re = (num_re*den_re + num_im*den_im) / den2;                           th_im = (num_im*den_re - num_re*den_im) / den2;
    }

    // 3. Calculate d_phi              ...                                    // and d_lambda
    var d_psi = th_re;                                                        var d_lambda = th_im;
    var d_psi_n = 1;  // d_psi^0

    var d_phi = 0;
    for (var n = 1; n <= 9; n++) {
       d_psi_n = d_psi_n * d_psi;
       d_phi = d_phi + this.D[n] * d_psi_n;
    }

    // 4. Calculate latitude and longitude
    // d_phi is calcuated in second of arc * 10^-5, so we need to scale back to radians. d_lambda is in radians.
    var lat = this.lat0 + (d_phi * Proj4js.common.SEC_TO_RAD * 1E5);
    var lon = this.long0 +  d_lambda;

    p.x = lon;
    p.y = lat;

    return p;
  }
};
