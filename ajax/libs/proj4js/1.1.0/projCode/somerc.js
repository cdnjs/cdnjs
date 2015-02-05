/*******************************************************************************
NAME                       SWISS OBLIQUE MERCATOR

PURPOSE:	Swiss projection.
WARNING:  X and Y are inverted (weird) in the swiss coordinate system. Not
   here, since we want X to be horizontal and Y vertical.

ALGORITHM REFERENCES
1. "Formules et constantes pour le Calcul pour la
 projection cylindrique conforme à axe oblique et pour la transformation entre
 des systèmes de référence".
 http://www.swisstopo.admin.ch/internet/swisstopo/fr/home/topics/survey/sys/refsys/switzerland.parsysrelated1.31216.downloadList.77004.DownloadFile.tmp/swissprojectionfr.pdf

*******************************************************************************/

Proj4js.Proj.somerc = {

  init: function() {
    var phy0 = this.lat0;
    this.lambda0 = this.long0;
    var sinPhy0 = Math.sin(phy0);
    var semiMajorAxis = this.a;
    var invF = this.rf;
    var flattening = 1 / invF;
    var e2 = 2 * flattening - Math.pow(flattening, 2);
    var e = this.e = Math.sqrt(e2);
    this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2.0));
    this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4.0));
    this.b0 = Math.asin(sinPhy0 / this.alpha);
    this.K = Math.log(Math.tan(Math.PI / 4.0 + this.b0 / 2.0))
            - this.alpha
            * Math.log(Math.tan(Math.PI / 4.0 + phy0 / 2.0))
            + this.alpha
            * e / 2
            * Math.log((1 + e * sinPhy0)
            / (1 - e * sinPhy0));
  },


  forward: function(p) {
    var Sa1 = Math.log(Math.tan(Math.PI / 4.0 - p.y / 2.0));
    var Sa2 = this.e / 2.0
            * Math.log((1 + this.e * Math.sin(p.y))
            / (1 - this.e * Math.sin(p.y)));
    var S = -this.alpha * (Sa1 + Sa2) + this.K;

        // spheric latitude
    var b = 2.0 * (Math.atan(Math.exp(S)) - Math.PI / 4.0);

        // spheric longitude
    var I = this.alpha * (p.x - this.lambda0);

        // psoeudo equatorial rotation
    var rotI = Math.atan(Math.sin(I)
            / (Math.sin(this.b0) * Math.tan(b) +
               Math.cos(this.b0) * Math.cos(I)));

    var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) -
                         Math.sin(this.b0) * Math.cos(b) * Math.cos(I));

    p.y = this.R / 2.0
            * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB)))
            + this.y0;
    p.x = this.R * rotI + this.x0;
    return p;
  },

  inverse: function(p) {
    var Y = p.x - this.x0;
    var X = p.y - this.y0;

    var rotI = Y / this.R;
    var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4.0);

    var b = Math.asin(Math.cos(this.b0) * Math.sin(rotB)
            + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI));
    var I = Math.atan(Math.sin(rotI)
            / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0)
            * Math.tan(rotB)));

    var lambda = this.lambda0 + I / this.alpha;

    var S = 0.0;
    var phy = b;
    var prevPhy = -1000.0;
    var iteration = 0;
    while (Math.abs(phy - prevPhy) > 0.0000001)
    {
      if (++iteration > 20)
      {
        Proj4js.reportError("omercFwdInfinity");
        return;
      }
      //S = Math.log(Math.tan(Math.PI / 4.0 + phy / 2.0));
      S = 1.0
              / this.alpha
              * (Math.log(Math.tan(Math.PI / 4.0 + b / 2.0)) - this.K)
              + this.e
              * Math.log(Math.tan(Math.PI / 4.0
              + Math.asin(this.e * Math.sin(phy))
              / 2.0));
      prevPhy = phy;
      phy = 2.0 * Math.atan(Math.exp(S)) - Math.PI / 2.0;
    }

    p.x = lambda;
    p.y = phy;
    return p;
  }
};
