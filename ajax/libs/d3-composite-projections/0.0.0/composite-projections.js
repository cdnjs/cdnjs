(function() {
d3.geo.conicConformalSpain = function() {

  var iberianPeninsule = d3.geo.conicConformal()
  .center([-3, 40]);

  var canaryIslands = d3.geo.conicConformal()
  .center([-14.5, 28.5]);

  
  var point,
      pointStream = {point: function(x, y) { point = [x, y]; }},
      iberianPeninsulePoint,
      canaryIslandsPoint;

  function conicConformalSpain(coordinates) {
    var x = coordinates[0], y = coordinates[1];
    point = null;
    console.info("coords: "+coordinates + " point: " + point);
    (iberianPeninsulePoint(x, y), point) || (canaryIslandsPoint(x, y), point);
    console.info("coords: "+coordinates + " point: " + point);
    console.info(iberianPeninsulePoint(x, y) + " - " + canaryIslandsPoint(x, y));
    return point;
  }


conicConformalSpain.invert = function(coordinates) {
    
    var k = iberianPeninsule.scale(),
        t = iberianPeninsule.translate(),
        x = (coordinates[0] - t[0]) / k,
        y = (coordinates[1] - t[1]) / k;

        //console.info(coordinates + " ---> scale: " + k + " trans: " + t + ": x = " + x + " y = " + y);
        //Trobar bé les coordenades!!!
    return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? canaryIslands
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
    console.info("translate");
    if (!arguments.length) return iberianPeninsule.translate();
    
    var k = iberianPeninsule.scale(), x = +_[0], y = +_[1];


    var iberianPeninsuleBbox = [[-9.9921301043373, 48.119816258446754], [4.393178805228727, 34.02148129982776]];

    var canaryIslandsBbox = [[-12.22643614428382, 34.989324589964816], [-6.681087681832122, 33.712511769541585]];

    iberianPeninsulePoint = iberianPeninsule
        .translate(_)
        .clipExtent([iberianPeninsule(iberianPeninsuleBbox[0]),iberianPeninsule(iberianPeninsuleBbox[1])])
        .stream(pointStream).point;

    canaryIslandsPoint = canaryIslands
        .translate([x - 0.067 * k, y + 0.081 * k])
        .clipExtent([iberianPeninsule(canaryIslandsBbox[0]),iberianPeninsule(canaryIslandsBbox[1])])
        .stream(pointStream).point;

    return conicConformalSpain;
  };

  return conicConformalSpain.scale(2500);
};

})();