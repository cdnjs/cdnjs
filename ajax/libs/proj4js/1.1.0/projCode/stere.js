
// Initialize the Stereographic projection

Proj4js.Proj.stere = {
  ssfn_: function(phit, sinphi, eccen) {
  	sinphi *= eccen;
  	return (Math.tan (.5 * (Proj4js.common.HALF_PI + phit)) * Math.pow((1. - sinphi) / (1. + sinphi), .5 * eccen));
  },
  TOL:	1.e-8,
  NITER:	8,
  CONV:	1.e-10,
  S_POLE:	0,
  N_POLE:	1,
  OBLIQ:	2,
  EQUIT:	3,

  init: function() {
  	this.phits = this.lat_ts ? this.lat_ts : Proj4js.common.HALF_PI;
    var t = Math.abs(this.lat0);
  	if ((Math.abs(t) - Proj4js.common.HALF_PI) < Proj4js.common.EPSLN) {
  		this.mode = this.lat0 < 0. ? this.S_POLE : this.N_POLE;
  	} else {
  		this.mode = t > Proj4js.common.EPSLN ? this.OBLIQ : this.EQUIT;
    }
  	this.phits = Math.abs(this.phits);
  	if (this.es) {
  		var X;

  		switch (this.mode) {
  		case this.N_POLE:
  		case this.S_POLE:
  			if (Math.abs(this.phits - Proj4js.common.HALF_PI) < Proj4js.common.EPSLN) {
  				this.akm1 = 2. * this.k0 / Math.sqrt(Math.pow(1+this.e,1+this.e)*Math.pow(1-this.e,1-this.e));
  			} else {
          t = Math.sin(this.phits);
  				this.akm1 = Math.cos(this.phits) / Proj4js.common.tsfnz(this.e, this.phits, t);
  				t *= this.e;
  				this.akm1 /= Math.sqrt(1. - t * t);
  			}
  			break;
  		case this.EQUIT:
  			this.akm1 = 2. * this.k0;
  			break;
  		case this.OBLIQ:
  			t = Math.sin(this.lat0);
  			X = 2. * Math.atan(this.ssfn_(this.lat0, t, this.e)) - Proj4js.common.HALF_PI;
  			t *= this.e;
  			this.akm1 = 2. * this.k0 * Math.cos(this.lat0) / Math.sqrt(1. - t * t);
  			this.sinX1 = Math.sin(X);
  			this.cosX1 = Math.cos(X);
  			break;
  		}
  	} else {
  		switch (this.mode) {
  		case this.OBLIQ:
  			this.sinph0 = Math.sin(this.lat0);
  			this.cosph0 = Math.cos(this.lat0);
  		case this.EQUIT:
  			this.akm1 = 2. * this.k0;
  			break;
  		case this.S_POLE:
  		case this.N_POLE:
  			this.akm1 = Math.abs(this.phits - Proj4js.common.HALF_PI) >= Proj4js.common.EPSLN ?
  			   Math.cos(this.phits) / Math.tan(Proj4js.common.FORTPI - .5 * this.phits) :
  			   2. * this.k0 ;
  			break;
  		}
  	}
  }, 

// Stereographic forward equations--mapping lat,long to x,y
  forward: function(p) {
    var lon = p.x;
    lon = Proj4js.common.adjust_lon(lon - this.long0);
    var lat = p.y;
    var x, y;
    
    if (this.sphere) {
    	var  sinphi, cosphi, coslam, sinlam;

    	sinphi = Math.sin(lat);
    	cosphi = Math.cos(lat);
    	coslam = Math.cos(lon);
    	sinlam = Math.sin(lon);
    	switch (this.mode) {
    	case this.EQUIT:
    		y = 1. + cosphi * coslam;
    		if (y <= Proj4js.common.EPSLN) {
            Proj4js.reportError("stere:forward:Equit");
        }
        y = this.akm1 / y;
    		x = y * cosphi * sinlam;
        y *= sinphi;
    		break;
    	case this.OBLIQ:
    		y = 1. + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
    		if (y <= Proj4js.common.EPSLN) {
            Proj4js.reportError("stere:forward:Obliq");
        }
        y = this.akm1 / y;
    		x = y * cosphi * sinlam;
    		y *= this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
    		break;
    	case this.N_POLE:
    		coslam = -coslam;
    		lat = -lat;
        //Note  no break here so it conitnues through S_POLE
    	case this.S_POLE:
    		if (Math.abs(lat - Proj4js.common.HALF_PI) < this.TOL) {
            Proj4js.reportError("stere:forward:S_POLE");
        }
        y = this.akm1 * Math.tan(Proj4js.common.FORTPI + .5 * lat);
    		x = sinlam * y;
    		y *= coslam;
    		break;
    	}
    } else {
    	coslam = Math.cos(lon);
    	sinlam = Math.sin(lon);
    	sinphi = Math.sin(lat);
    	var sinX, cosX;
    	if (this.mode == this.OBLIQ || this.mode == this.EQUIT) {
    	  var Xt = 2. * Math.atan(this.ssfn_(lat, sinphi, this.e));
        sinX = Math.sin(Xt - Proj4js.common.HALF_PI);
        cosX = Math.cos(Xt);
    	}
    	switch (this.mode) {
    	case this.OBLIQ:
    		var A = this.akm1 / (this.cosX1 * (1. + this.sinX1 * sinX + this.cosX1 * cosX * coslam));
    		y = A * (this.cosX1 * sinX - this.sinX1 * cosX * coslam);
    		x = A * cosX;
    		break;
    	case this.EQUIT:
    		var A = 2. * this.akm1 / (1. + cosX * coslam);
    		y = A * sinX;
    		x = A * cosX;
    		break;
    	case this.S_POLE:
    		lat = -lat;
    		coslam = - coslam;
    		sinphi = -sinphi;
    	case this.N_POLE:
    		x = this.akm1 * Proj4js.common.tsfnz(this.e, lat, sinphi);
    		y = - x * coslam;
    		break;
    	}
    	x = x * sinlam;
    }
    p.x = x*this.a + this.x0;
    p.y = y*this.a + this.y0;
    return p;
  },


//* Stereographic inverse equations--mapping x,y to lat/long
  inverse: function(p) {
    var x = (p.x - this.x0)/this.a;   /* descale and de-offset */
    var y = (p.y - this.y0)/this.a;
    var lon, lat;

    var cosphi, sinphi, tp=0.0, phi_l=0.0, rho, halfe=0.0, pi2=0.0;
    var i;

    if (this.sphere) {
    	var  c, rh, sinc, cosc;

      rh = Math.sqrt(x*x + y*y);
      c = 2. * Math.atan(rh / this.akm1);
    	sinc = Math.sin(c);
    	cosc = Math.cos(c);
    	lon = 0.;
    	switch (this.mode) {
    	case this.EQUIT:
    		if (Math.abs(rh) <= Proj4js.common.EPSLN) {
    			lat = 0.;
    		} else {
    			lat = Math.asin(y * sinc / rh);
        }
    		if (cosc != 0. || x != 0.) lon = Math.atan2(x * sinc, cosc * rh);
    		break;
    	case this.OBLIQ:
    		if (Math.abs(rh) <= Proj4js.common.EPSLN) {
    			lat = this.phi0;
    		} else {
    			lat = Math.asin(cosc * this.sinph0 + y * sinc * this.cosph0 / rh);
        }
        c = cosc - this.sinph0 * Math.sin(lat);
    		if (c != 0. || x != 0.) {
    			lon = Math.atan2(x * sinc * this.cosph0, c * rh);
        }
    		break;
    	case this.N_POLE:
    		y = -y;
    	case this.S_POLE:
    		if (Math.abs(rh) <= Proj4js.common.EPSLN) {
    			lat = this.phi0;
    		} else {
    			lat = Math.asin(this.mode == this.S_POLE ? -cosc : cosc);
        }
    		lon = (x == 0. && y == 0.) ? 0. : Math.atan2(x, y);
    		break;
    	}
        p.x = Proj4js.common.adjust_lon(lon + this.long0);
        p.y = lat;
    } else {
    	rho = Math.sqrt(x*x + y*y);
    	switch (this.mode) {
    	case this.OBLIQ:
    	case this.EQUIT:
        tp = 2. * Math.atan2(rho * this.cosX1 , this.akm1);
    		cosphi = Math.cos(tp);
    		sinphi = Math.sin(tp);
        if( rho == 0.0 ) {
    		  phi_l = Math.asin(cosphi * this.sinX1);
        } else {
    		  phi_l = Math.asin(cosphi * this.sinX1 + (y * sinphi * this.cosX1 / rho));
        }

    		tp = Math.tan(.5 * (Proj4js.common.HALF_PI + phi_l));
    		x *= sinphi;
    		y = rho * this.cosX1 * cosphi - y * this.sinX1* sinphi;
    		pi2 = Proj4js.common.HALF_PI;
    		halfe = .5 * this.e;
    		break;
    	case this.N_POLE:
    		y = -y;
    	case this.S_POLE:
        tp = - rho / this.akm1;
    		phi_l = Proj4js.common.HALF_PI - 2. * Math.atan(tp);
    		pi2 = -Proj4js.common.HALF_PI;
    		halfe = -.5 * this.e;
    		break;
    	}
    	for (i = this.NITER; i--; phi_l = lat) { //check this
    		sinphi = this.e * Math.sin(phi_l);
    		lat = 2. * Math.atan(tp * Math.pow((1.+sinphi)/(1.-sinphi), halfe)) - pi2;
    		if (Math.abs(phi_l - lat) < this.CONV) {
    			if (this.mode == this.S_POLE) lat = -lat;
    			lon = (x == 0. && y == 0.) ? 0. : Math.atan2(x, y);
          p.x = Proj4js.common.adjust_lon(lon + this.long0);
          p.y = lat;
    			return p;
    		}
    	}
    }
  }
}; 
