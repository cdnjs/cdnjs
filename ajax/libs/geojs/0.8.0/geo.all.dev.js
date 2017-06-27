/**
 *  Including this file will load all geojs sources as individual files.
 */
(function () {
  var sources, srcRoot, script, attr = '';

  sources = JSON.parse(
    '["src/core/init.js","src/core/version.js","src/vgl/vgl.js","src/util/init.js","src/util/wigglemaps.js","src/util/leaflet.js","src/util/clustering.js","src/util/scales.js","src/util/throttle.js","src/core/object.js","src/core/sceneObject.js","src/core/timestamp.js","src/core/transform.js","src/core/camera.js","src/core/layer.js","src/core/featureLayer.js","src/core/event.js","src/core/mapInteractor.js","src/core/clock.js","src/core/tile.js","src/core/imageTile.js","src/core/tileCache.js","src/core/tileLayer.js","src/core/fetchQueue.js","src/core/fileReader.js","src/core/jsonReader.js","src/core/map.js","src/core/feature.js","src/core/pointFeature.js","src/core/lineFeature.js","src/core/pathFeature.js","src/core/polygonFeature.js","src/core/planeFeature.js","src/core/quadFeature.js","src/core/vectorFeature.js","src/core/geomFeature.js","src/core/graphFeature.js","src/core/contourFeature.js","src/core/renderer.js","src/core/osmLayer.js","src/core/domRenderer.js","src/core/choroplethFeature.js","src/gl/init.js","src/gl/lineFeature.js","src/gl/pointFeature.js","src/gl/geomFeature.js","src/gl/planeFeature.js","src/gl/quadFeature.js","src/gl/polygonFeature.js","src/gl/contourFeature.js","src/gl/vglRenderer.js","src/gl/tileLayer.js","src/gl/choroplethFeature.js","src/d3/init.js","src/d3/object.js","src/d3/d3Renderer.js","src/d3/tileLayer.js","src/d3/pointFeature.js","src/d3/lineFeature.js","src/d3/pathFeature.js","src/d3/graphFeature.js","src/d3/planeFeature.js","src/d3/vectorFeature.js","src/ui/init.js","src/ui/uiLayer.js","src/ui/widget.js","src/ui/domWidget.js","src/ui/svgWidget.js","src/ui/sliderWidget.js","src/ui/legendWidget.js","src/plugin/jquery-plugin.js"]'
  );

  srcRoot = '/';


  // Get the currently executing script tag.
  script = document.getElementsByTagName('script');
  script = script[script.length - 1];

  // Pop data cover attribute if present
  if (script.attributes.getNamedItem('data-cover')) {
    script.attributes.removeNamedItem('data-cover');
    attr = 'data-cover';
  }

  document.write('<script src="' + srcRoot + 'built/geo.ext.min.js" type="text/javascript" charset="UTF8"></script>');
  sources.forEach(function (src) {
    document.write(
      '<script src="' +
      srcRoot + src +
      '"' +
      attr +
      '></script>'
    );
  });
}());
