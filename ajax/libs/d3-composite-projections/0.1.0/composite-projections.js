(function() {




d3.geo.albersUsa = function() {

  var lower48 = d3.geo.albers();

 
  var alaska = d3.geo.conicEqualArea()
      .rotate([154, 0])
      .center([-2, 58.5])
      .parallels([55, 65]);

 
  var hawaii = d3.geo.conicEqualArea()
      .rotate([157, 0])
      .center([-3, 19.9])
      .parallels([8, 18]);

  var point,
      pointStream = {point: function(x, y) { point = [x, y]; }},
      lower48Point,
      alaskaPoint,
      hawaiiPoint;

  function albersUsa(coordinates) {
    console.info('USA');
    var x = coordinates[0], y = coordinates[1];
    point = null;

    (lower48Point(x, y), point)
        || (alaskaPoint(x, y), point)
        || hawaiiPoint(x, y);
        return point;
  }

  albersUsa.invert = function(coordinates) {
    var k = lower48.scale(),
        t = lower48.translate(),
        x = (coordinates[0] - t[0]) / k,
        y = (coordinates[1] - t[1]) / k;
    return (y >= .120 && y < .234 && x >= -.425 && x < -.214 ? alaska
        : y >= .166 && y < .234 && x >= -.214 && x < -.115 ? hawaii
        : lower48).invert(coordinates);
  };

 
 
 
  albersUsa.stream = function(stream) {
    var lower48Stream = lower48.stream(stream),
        alaskaStream = alaska.stream(stream),
        hawaiiStream = hawaii.stream(stream);
    return {
      point: function(x, y) {
        lower48Stream.point(x, y);
        alaskaStream.point(x, y);
        hawaiiStream.point(x, y);
      },
      sphere: function() {
        lower48Stream.sphere();
        alaskaStream.sphere();
        hawaiiStream.sphere();
      },
      lineStart: function() {
        lower48Stream.lineStart();
        alaskaStream.lineStart();
        hawaiiStream.lineStart();
      },
      lineEnd: function() {
        lower48Stream.lineEnd();
        alaskaStream.lineEnd();
        hawaiiStream.lineEnd();
      },
      polygonStart: function() {
        lower48Stream.polygonStart();
        alaskaStream.polygonStart();
        hawaiiStream.polygonStart();
      },
      polygonEnd: function() {
        lower48Stream.polygonEnd();
        alaskaStream.polygonEnd();
        hawaiiStream.polygonEnd();
      }
    };
  };

  albersUsa.precision = function(_) {
    if (!arguments.length) return lower48.precision();
    lower48.precision(_);
    alaska.precision(_);
    hawaii.precision(_);
    return albersUsa;
  };

  albersUsa.scale = function(_) {
    if (!arguments.length) return lower48.scale();
    lower48.scale(_);
    alaska.scale(_ * .35);
    hawaii.scale(_);
    return albersUsa.translate(lower48.translate());
  };

  albersUsa.translate = function(_) {
    var ε = 1*10E-6;
    if (!arguments.length) return lower48.translate();
    var k = lower48.scale(), x = +_[0], y = +_[1];

    lower48Point = lower48
        .translate(_)
        .clipExtent([[x - .455 * k, y - .238 * k], [x + .455 * k, y + .238 * k]])
        .stream(pointStream).point;

    alaskaPoint = alaska
        .translate([x - .307 * k, y + .201 * k])
        .clipExtent([[x - .425 * k + ε, y + .120 * k + ε], [x - .214 * k - ε, y + .234 * k - ε]])
        .stream(pointStream).point;

    hawaiiPoint = hawaii
        .translate([x - .205 * k, y + .212 * k])
        .clipExtent([[x - .214 * k + ε, y + .166 * k + ε], [x - .115 * k - ε, y + .234 * k - ε]])
        .stream(pointStream).point;

    return albersUsa;
  };
  albersUsa.getCompositionBorders = function() {
    var hawaii1 = lower48([-102.91, 26.3]);
    var hawaii2 = lower48([-104.0, 27.5]);
    var hawaii3 = lower48([-108.0, 29.1]);
    var hawaii4 = lower48([-110.0, 29.1]);
    
    var alaska1 = lower48([-110.0, 26.7]);
    var alaska2 = lower48([-112.8, 27.6]);
    var alaska3 = lower48([-114.3, 30.6]);
    var alaska4 = lower48([-119.3, 30.1]);

    return "M"+hawaii1[0]+" "+hawaii1[1]+"L"+hawaii2[0]+" "+hawaii2[1]+
      "L"+hawaii3[0]+" "+hawaii3[1]+"L"+hawaii4[0]+" "+hawaii4[1]+
      "M"+alaska1[0]+" "+alaska1[1]+"L"+alaska2[0]+" "+alaska2[1]+
      "L"+alaska3[0]+" "+alaska3[1]+"L"+alaska4[0]+" "+alaska4[1];


  };

  return albersUsa.scale(1070);
};


})();

(function() {
d3.geo.conicConformalFrance = function() {

  var europe = d3.geo.conicConformal()
    .center([13.5, 44.0]);

  var guyane = d3.geo.mercator()
    .center([-53.2, 3.9]);

  var reunion = d3.geo.mercator()
      .center([55.52, -21.13]);

  var mayotte = d3.geo.mercator()
      .center([45.16, -12.8]);

  var martinique = d3.geo.mercator()
      .center([-61.03, 14.67]);

  var guadeloupe = d3.geo.mercator()
      .center([-61.46, 16.14]);

  var nouvelleCaledonie = d3.geo.mercator()
      .center([165.8, -21.07]);

  var polynesie = d3.geo.mercator()
      .center([-150.55, -17.11]);

  var wallisFutuna = d3.geo.mercator()
      .center([-178.1, -14.3]);

  var stPierreMichelon = d3.geo.mercator()
      .center([-56.23, 46.93]);

  var saintBarthlemy = d3.geo.mercator()
      .center([-62.85, 17.92]);



  var europeBbox = [[-9.9921301043373, 52.0], [4.393178805228727, 40.5]];
  var guyaneBbox = [[-54.5, 6.29], [-50.9, 1.48]];
  var reunionBbox = [[55.0088, -20.7228],[56.063449, -21.621723]];
  var mayotteBbox = [[44.9153, -12.594],[45.3602, -13.069]];
  var martiniqueBbox = [[-61.2968, 14.943],[-60.715, 14.321]];
  var guadeloupeBbox = [[-61.9634, 16.6034],[-60.7879, 15.722]];
  var nouvelleCaledonieBbox = [[163.1444, -19.3385],[168.286, -23.278]];
  var polynesieBbox = [[-152.0254, -16.2541],[-148.6856, -18.2893]];
  var wallisFutunaBbox = [[-178.2177, -14.2114],[-177.983, -14.3924]];
  var stPierreMichelonBbox = [[-56.517, 47.1969],[-56.0928, 46.7103]];
  var saintBarthlemyBbox = [[-62.915, 17.9758],[-62.7722, 17.8508]];


  var point,
      pointStream = {point: function(x, y) { point = [x, y]; }},
      europePoint,
      guyanePoint,
      reunionPoint,
      mayottePoint,
      martiniquePoint,
      guadeloupePoint,
      nouvelleCaledoniePoint,
      polynesiePoint,
      wallisFutunaPoint,
      stPierreMichelonPoint,
      saintBarthlemyPoint;


  function conicConformalFrance(coordinates) {
    var x = coordinates[0], y = coordinates[1];
    point = null;

    polynesiePoint(x,y); guyanePoint(x, y); reunionPoint(x, y);
    mayottePoint(x, y); martiniquePoint(x, y);
    guadeloupePoint(x, y); wallisFutunaPoint(x, y);
    stPierreMichelonPoint(x, y); saintBarthlemyPoint(x, y);
    nouvelleCaledoniePoint(x, y);europePoint(x, y);

    return point;
  }


conicConformalFrance.invert = function(coordinates) {

    var k = europe.scale(),
        t = europe.translate(),
        x = (coordinates[0] - t[0]) / k,
        y = (coordinates[1] - t[1]) / k;


          return (y >= 0.04034 && y < 0.0698 && x >= -0.1209 && x < -0.0989 ? guyane
        : y >= 0.04586 && y < 0.066059 && x >= -0.0867 && x < -0.064618 ? reunion
        : y >= 0.04847 && y < 0.061225 && x >= -0.0994 && x < -0.08776 ? mayotte
        : y >= 0.047607 && y < 0.064437 && x >= -0.14348 && x < -0.128253 ? martinique
        : y >= 0.045884 && y < 0.0651042 && x >= -0.168543 && x < -0.14392 ? guadeloupe
        : y >= 0.073339 && y < 0.095485 && x >= -0.1859 && x < -0.15898 ? nouvelleCaledonie
        : y >= 0.07364 && y < 0.09596 && x >= -0.15045 && x < -0.115476 ? polynesie
        : y >= 0.080171 && y < 0.08799 && x >= -0.109930 && x < -0.100099 ? wallisFutuna
        : y >= 0.07679 && y < 0.091724 && x >= -0.08401 && x < -0.075126 ? stPierreMichelon
        : y >= 0.0509 && y < 0.060076 && x >= -0.18453 && x < -0.174568 ? saintBarthlemy
        : europe).invert(coordinates);

  };



conicConformalFrance.stream = function(stream) {
    var europeStream = europe.stream(stream);
    var guyaneStream = guyane.stream(stream);
    var reunionStream = reunion.stream(stream);
    var mayotteStream = mayotte.stream(stream);
    var martiniqueStream = martinique.stream(stream);
    var guadeloupeStream = guadeloupe.stream(stream);
    var nouvelleCaledonieStream = nouvelleCaledonie.stream(stream);
    var polynesieStream = polynesie.stream(stream);
    var wallisFutunaStream = wallisFutuna.stream(stream);
    var stPierreMichelonStream = stPierreMichelon.stream(stream);
    var saintBarthlemyStream = saintBarthlemy.stream(stream);


    return {
      point: function(x, y) {
        europeStream.point(x, y);
        guyaneStream.point(x, y);
        reunionStream.point(x, y);
        mayotteStream.point(x, y);
        martiniqueStream.point(x, y);
        guadeloupeStream.point(x, y);
        nouvelleCaledonieStream.point(x, y);
        polynesieStream.point(x, y);
        wallisFutunaStream.point(x, y);
        stPierreMichelonStream.point(x, y);
        saintBarthlemyStream.point(x, y);

      },
      sphere: function() {
        europeStream.sphere();
        guyaneStream.sphere();
        reunionStream.sphere();
        mayotteStream.sphere();
        martiniqueStream.sphere();
        guadeloupeStream.sphere();
        nouvelleCaledonieStream.sphere();
        polynesieStream.sphere();
        wallisFutunaStream.sphere();
        stPierreMichelonStream.sphere();
        saintBarthlemyStream.sphere();
      },
      lineStart: function() {
        europeStream.lineStart();
        guyaneStream.lineStart();
        reunionStream.lineStart();
        mayotteStream.lineStart();
        martiniqueStream.lineStart();
        guadeloupeStream.lineStart();
        nouvelleCaledonieStream.lineStart();
        polynesieStream.lineStart();
        wallisFutunaStream.lineStart();
        stPierreMichelonStream.lineStart();
        saintBarthlemyStream.lineStart();
      },
      lineEnd: function() {
        europeStream.lineEnd();
        guyaneStream.lineEnd();
        reunionStream.lineEnd();
        mayotteStream.lineEnd();
        martiniqueStream.lineEnd();
        guadeloupeStream.lineEnd();
        nouvelleCaledonieStream.lineEnd();
        polynesieStream.lineEnd();
        wallisFutunaStream.lineEnd();
        stPierreMichelonStream.lineEnd();
        saintBarthlemyStream.lineEnd();
     },
      polygonStart: function() {
        europeStream.polygonStart();
        guyaneStream.polygonStart();
        reunionStream.polygonStart();
        mayotteStream.polygonStart();
        martiniqueStream.polygonStart();
        guadeloupeStream.polygonStart();
        nouvelleCaledonieStream.polygonStart();
        polynesieStream.polygonStart();
        wallisFutunaStream.polygonStart();
        stPierreMichelonStream.polygonStart();
        saintBarthlemyStream.polygonStart();
      },
      polygonEnd: function() {
        europeStream.polygonEnd();
        guyaneStream.polygonEnd();
        reunionStream.polygonEnd();
        mayotteStream.polygonEnd();
        martiniqueStream.polygonEnd();
        guadeloupeStream.polygonEnd();
        nouvelleCaledonieStream.polygonEnd();
        polynesieStream.polygonEnd();
        wallisFutunaStream.polygonEnd();
        stPierreMichelonStream.polygonEnd();
        saintBarthlemyStream.polygonEnd();
      }
    };
  };


  conicConformalFrance.precision = function(_) {
    if (!arguments.length) return europe.precision();
    europe.precision(_);
    guyane.precision(_);
    reunion.precision(_);
    mayotte.precision(_);
    martinique.precision(_);
    guadeloupe.precision(_);
    nouvelleCaledonie.precision(_);
    polynesie.precision(_);
    wallisFutuna.precision(_);
    stPierreMichelon.precision(_);
    saintBarthlemy.precision(_);

    return conicConformalFrance;
  };

  conicConformalFrance.scale = function(_) {
    if (!arguments.length) return europe.scale();

    europe.scale(_);
    guyane.scale(_* 0.35) ;
    reunion.scale(_ * 1.2);
    mayotte.scale(_ * 1.5);
    martinique.scale(_ * 1.5);
    guadeloupe.scale(_ * 1.2);
    nouvelleCaledonie.scale(_ * 0.3);
    polynesie.scale(_ * 0.6);
    wallisFutuna.scale(_ * 2.4);
    stPierreMichelon.scale(_ * 1.2);
    saintBarthlemy.scale(_ * 4.0);

    return conicConformalFrance.translate(europe.translate());
  };

  conicConformalFrance.translate = function(_) {

    if (!arguments.length) return europe.translate();

    var k = europe.scale(), x = +_[0], y = +_[1];


   

    var c0 = europe(europeBbox[0]);
   x0 = (x - c0[0]) / k;
   y0 = (y - c0[1]) / k;

   var c1 = europe(europeBbox[1]);
   x1 = (x - c1[0]) / k;
   y1 = (y - c1[1]) / k;

   
   europePoint = europe
       .translate(_)
       .clipExtent([[x - 0.249 * k, y - 0.1215 * k],[x + 0.0987 * k, y + 0.06201 * k]])
       .stream(pointStream).point;

   reunionPoint = reunion
       .translate([x - 0.076 * k, y + 0.055 * k])
       .clipExtent([[x - 0.0867 * k, y + 0.045869 * k],[x - 0.064618 * k, y + 0.066059 * k]])
       .stream(pointStream).point;

  mayottePoint = mayotte
       .translate([x - 0.093 * k, y + 0.054 * k])
       .clipExtent([[x - 0.0994 * k, y + 0.04847 * k],[x - 0.08776 * k, y + 0.0612257 * k]])
       .stream(pointStream).point;

  guyanePoint = guyane
       .translate([x - 0.113 * k, y + 0.055 * k])
       .clipExtent([[x - 0.12094 * k, y + 0.04034 * k],[x - 0.0989 * k, y + 0.0698 * k]])
       .stream(pointStream).point;

   martiniquePoint = martinique
      .translate([x - 0.1365 * k, y + 0.055 * k])
      .clipExtent([[x - 0.14348 * k, y + 0.0476 * k],[x - 0.12825 * k, y + 0.064437 * k]])
      .stream(pointStream).point;

  guadeloupePoint = guadeloupe
     .translate([x - 0.158 * k, y + 0.056 * k])
     .clipExtent([[x - 0.16854 * k, y + 0.045884 * k],[x - 0.14392 * k, y + 0.065104 * k]])
     .stream(pointStream).point;

 saintBarthlemyPoint = saintBarthlemy
     .translate([x - 0.18 * k, y + 0.055 * k])
     .clipExtent([[x - 0.18454 * k, y + 0.0509 * k],[x - 0.174569 * k, y + 0.06 * k]])
     .stream(pointStream).point;

  nouvelleCaledoniePoint = nouvelleCaledonie
      .translate([x - 0.172 * k, y + 0.083 * k])
      .clipExtent([[x - 0.1859 * k, y + 0.07334 * k],[x - 0.15898 * k, y + 0.09549 * k]])
      .stream(pointStream).point;

  polynesiePoint = polynesie
      .translate([x - 0.135 * k, y + 0.083 * k])
      .clipExtent([[x - 0.15045 * k, y + 0.07364 * k],[x - 0.11547 * k, y + 0.09596 * k]])
      .stream(pointStream).point;

  wallisFutunaPoint = wallisFutuna
      .translate([x - 0.105 * k, y + 0.084 * k])
      .clipExtent([[x - 0.10993 * k, y + 0.08017 * k],[x - 0.1 * k, y + 0.087995 * k]])
      .stream(pointStream).point;

  stPierreMichelonPoint = stPierreMichelon
      .translate([x - 0.078 * k, y + 0.085 * k])
      .clipExtent([[x - 0.08401 * k, y + 0.07679 * k],[x - 0.07512 * k, y + 0.09172 * k]])
      .stream(pointStream).point;

  return conicConformalFrance;
  };


  conicConformalFrance.getCompositionBorders = function() {

    var ur = europe([7.1, 41.9]);
    var ul = europe([-3.1, 42.6]);
    var lr = europe([7.1, 39.8]);
    var llr = europe([7.1, 38.2]);
    var s1 = europe([-1.8, 39.8]);
    var s2 = europe([0.4, 39.8]);
    var s3 = europe([2.0, 39.8]);
    var s4 = europe([4.3, 39.8]);
    var s5 = europe([5.4, 39.8]);
    var s6 = europe([-0.5, 38.2]);
    var s7 = europe([2.9, 38.2]);
    var s8 = europe([4.7, 38.2]);


    return "M"+ur[0]+" "+ur[1]+"L"+ul[0]+" "+ur[1]
    +"M"+ur[0]+" "+lr[1]+"L"+ul[0]+" "+lr[1]
    +"M"+ur[0]+" "+llr[1]+"L"+ul[0]+" "+llr[1]
    +"M"+s1[0]+" "+lr[1]+"L"+s1[0]+" "+ur[1]
    +"M"+s2[0]+" "+lr[1]+"L"+s2[0]+" "+ur[1]
    +"M"+s3[0]+" "+lr[1]+"L"+s3[0]+" "+ur[1]
    +"M"+s4[0]+" "+lr[1]+"L"+s4[0]+" "+ur[1]
    +"M"+s5[0]+" "+lr[1]+"L"+s5[0]+" "+ur[1]
    +"M"+s6[0]+" "+llr[1]+"L"+s6[0]+" "+lr[1]
    +"M"+s7[0]+" "+llr[1]+"L"+s7[0]+" "+lr[1]
    +"M"+s8[0]+" "+llr[1]+"L"+s8[0]+" "+lr[1];

 };


  return conicConformalFrance.scale(2300);
};

})();

(function() {


d3.geo.conicConformalPortugal = function() {

  var iberianPeninsule = d3.geo.conicConformal()
    .center([-5.0, 38.5]);

  var madeira = d3.geo.conicConformal()
    .center([-16.9, 32.8]);

  var azores = d3.geo.conicConformal()
    .center([-27.8, 38.6]);

  var iberianPeninsuleBbox = [[-12.0, 44.0], [-3.5, 35.5]];
  var madeiraBbox = [[-17.85, 33.6], [-15.65, 32.02]];
  var azoresBbox = [[-31.996, 40.529], [-24.05, 35.834]];




  var point,
      pointStream = {point: function(x, y) { point = [x, y]; }},
      iberianPeninsulePoint,
      madeiraPoint,
      azoresPoint;

  function conicConformalPortugal(coordinates) {
    var x = coordinates[0], y = coordinates[1];
    point = null;

    (iberianPeninsulePoint(x, y), point) || (madeiraPoint(x, y), point) || azoresPoint(x, y);

    return point;
  }


conicConformalPortugal.invert = function(coordinates) {

    var k = iberianPeninsule.scale(),
        t = iberianPeninsule.translate(),
        x = (coordinates[0] - t[0]) / k,
        y = (coordinates[1] - t[1]) / k;


          return (y >= -0.059983 && y < -0.004151 && x >= -0.1186717 && x < -0.07454468 ? azores
        : y >= 0.0131739727 && y < 0.04100812 && x >= -0.084925 && x < -0.06100898 ? madeira
        : iberianPeninsule).invert(coordinates);
  };



conicConformalPortugal.stream = function(stream) {
    var iberianPeninsuleStream = iberianPeninsule.stream(stream);
    var madeiraStream = madeira.stream(stream);
    var azoresStream = azores.stream(stream);

    return {
      point: function(x, y) {
        iberianPeninsuleStream.point(x, y);
        madeiraStream.point(x, y);
        azoresStream.point(x, y);
      },
      sphere: function() {
        iberianPeninsuleStream.sphere();
        madeiraStream.sphere();
        azoresStream.sphere();
      },
      lineStart: function() {
        iberianPeninsuleStream.lineStart();
        madeiraStream.lineStart();
        azoresStream.lineStart();
      },
      lineEnd: function() {
        iberianPeninsuleStream.lineEnd();
        madeiraStream.lineEnd();
        azoresStream.lineEnd();
     },
      polygonStart: function() {
        iberianPeninsuleStream.polygonStart();
        madeiraStream.polygonStart();
        azoresStream.polygonStart();
      },
      polygonEnd: function() {
        iberianPeninsuleStream.polygonEnd();
        madeiraStream.polygonEnd();
        azoresStream.polygonEnd();
      }
    };
  };


  conicConformalPortugal.precision = function(_) {
    if (!arguments.length) return iberianPeninsule.precision();
    iberianPeninsule.precision(_);
    madeiraPeninsule.precision(_);
    azoresPeninsule.precision(_);

    return conicConformalPortugal;
  };

  conicConformalPortugal.scale = function(_) {
    if (!arguments.length) return iberianPeninsule.scale();

    iberianPeninsule.scale(_);
    madeira.scale(_);
    azores.scale(_ * 0.6);

    return conicConformalPortugal.translate(iberianPeninsule.translate());
  };

  conicConformalPortugal.translate = function(_) {
    if (!arguments.length) return iberianPeninsule.translate();

    var k = iberianPeninsule.scale(), x = +_[0], y = +_[1];

      iberianPeninsulePoint = iberianPeninsule
       .translate(_)
       .clipExtent([[x - 0.0737 * k, y - 0.090189 * k],[x + 0.01636 * k, y + 0.04613 * k]])
       .stream(pointStream).point;

   madeiraPoint = madeira
       .translate([x - 0.075 * k, y + 0.027 * k])
       .clipExtent([[x - 0.0849* k, y + 0.01317 * k ],[x  - 0.061 * k, y + 0.041 * k]])
       .stream(pointStream).point;

   azoresPoint = azores
       .translate([x - 0.095 * k, y - 0.035 * k])
       .clipExtent([[x - 0.1187* k, y - 0.06 * k ],[x  - 0.07454 * k, y + 0.00415 * k]])
       .stream(pointStream).point;

   return conicConformalPortugal;
  };


  conicConformalPortugal.getCompositionBorders = function() {

    var ldAzores = iberianPeninsule([-10.65, 38.8]);
    var ulAzores = iberianPeninsule([-16.0, 41.4]);

    var ldMadeira = iberianPeninsule([-10.34, 35.9]);
    var ulMadeira = iberianPeninsule([-12.0, 36.8]);

    return "M"+ldAzores[0]+" "+ldAzores[1]+"L"+ldAzores[0]+" "+ulAzores[1]+
    "L"+ulAzores[0]+" "+ulAzores[1]+"L"+ulAzores[0]+" "+ldAzores[1]+"L"+ldAzores[0]+" "+ldAzores[1]+
    "M"+ldMadeira[0]+" "+ldMadeira[1]+"L"+ldMadeira[0]+" "+ulMadeira[1]+
    "L"+ulMadeira[0]+" "+ulMadeira[1]+"L"+ulMadeira[0]+" "+ldMadeira[1]+"L"+ldMadeira[0]+" "+ldMadeira[1];

 };

  return conicConformalPortugal.scale(3500);
};



})();

(function() {
d3.geo.conicConformalSpain = function() {

  var iberianPeninsule = d3.geo.conicConformal()
  .center([2, 37.5]);

  var canaryIslands = d3.geo.conicConformal()
  .center([-9.6, 26.4]);

  var iberianPeninsuleBbox = [[-9.9921301043373, 48.119816258446754], [4.393178805228727, 34.02148129982776]];
  var canaryIslandsBbox = [[-19.0, 29.0], [-12.7, 27.0]];


  var point,
      pointStream = {point: function(x, y) { point = [x, y]; }},
      iberianPeninsulePoint,
      canaryIslandsPoint;

  function conicConformalSpain(coordinates) {
    var x = coordinates[0], y = coordinates[1];
    point = null;

    (iberianPeninsulePoint(x, y), point) || canaryIslandsPoint(x, y);

    return point;
  }


conicConformalSpain.invert = function(coordinates) {

    var k = iberianPeninsule.scale(),
        t = iberianPeninsule.translate(),
        x = (coordinates[0] - t[0]) / k,
        y = (coordinates[1] - t[1]) / k;

      
            
    return (y >= -0.10779 && y < 0.067673 && x >= -0.1866 && x < 0.0255 ? canaryIslands
        : iberianPeninsule).invert(coordinates);
  };


conicConformalSpain.stream = function(stream) {
    var iberianPeninsuleStream = iberianPeninsule.stream(stream);
    var canaryIslandsStream = canaryIslands.stream(stream);
    return {
      point: function(x, y) {
        iberianPeninsuleStream.point(x, y);
        canaryIslandsStream.point(x, y);
      },
      sphere: function() {
        iberianPeninsuleStream.sphere();
        canaryIslandsStream.sphere();
      },
      lineStart: function() {
        iberianPeninsuleStream.lineStart();
        canaryIslandsStream.lineStart();
      },
      lineEnd: function() {
        iberianPeninsuleStream.lineEnd();
        canaryIslandsStream.lineEnd();
     },
      polygonStart: function() {
        iberianPeninsuleStream.polygonStart();
        canaryIslandsStream.polygonStart();
      },
      polygonEnd: function() {
        iberianPeninsuleStream.polygonEnd();
        canaryIslandsStream.polygonEnd();
      }
    };
  };


  conicConformalSpain.precision = function(_) {
    if (!arguments.length) return iberianPeninsule.precision();
    iberianPeninsule.precision(_);
    canaryIslandsPeninsule.precision(_);

    return conicConformalSpain;
  };

  conicConformalSpain.scale = function(_) {
    if (!arguments.length) return iberianPeninsule.scale();

    iberianPeninsule.scale(_);
    canaryIslands.scale(_);

    return conicConformalSpain.translate(iberianPeninsule.translate());
  };

  conicConformalSpain.translate = function(_) {
    if (!arguments.length) return iberianPeninsule.translate();

    var k = iberianPeninsule.scale(), x = +_[0], y = +_[1];

      iberianPeninsulePoint = iberianPeninsule
       .translate(_)
       .clipExtent([[x - 0.1291 * k, y - 0.1683 * k],[x + 0.0309 * k, y + 0.0517 * k]])
       .stream(pointStream).point;

   canaryIslandsPoint = canaryIslands
       .translate([x - 0.067 * k, y + 0.081 * k])
       .clipExtent([[x - 0.1866* k, y + 0.02557 * k],[x  - 0.10779* k, y + 0.06767 * k]])
       .stream(pointStream).point;

    return conicConformalSpain;
  };


  conicConformalSpain.getCompositionBorders = function() {

    var ulCanaryIslands = iberianPeninsule([-13.0, 35.3]);
    var ldCanaryIslands = iberianPeninsule([-6.4, 34.0]);
    
    return "M"+ulCanaryIslands[0]+" "+ulCanaryIslands[1]+"L"+ldCanaryIslands[0]+" "+ulCanaryIslands[1]+
      "L"+ldCanaryIslands[0]+" "+ldCanaryIslands[1];

 };


  return conicConformalSpain.scale(2500);
};

})();
