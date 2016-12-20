/*! Image Map Resizer
 *  Desc: Resize HTML imageMap to scaled image.
 *  Copyright: (c) 2014 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */


(function($){

    function setUpImageMap(){
        function getCoords(){
            for (var i = 0; i < len; i++) {
                coords[i] = areas[i].coords.split(',');
            }
        }

        function getSourceImageWidthAndThenResizeMap(){
            var
                sourceImage = this,
                testImage = new Image();

            testImage.onload = function(){
                imageWidth  = testImage.width;
                imageHeight = testImage.height;
                if ((sourceImage.width !== imageWidth) || (sourceImage.height !== imageHeight)){
                    resizeMap();
                }
            };

            testImage.src = sourceImage.src;
        }

        function init(){
            getCoords();
            $mapImg.each(getSourceImageWidthAndThenResizeMap);
            $(window).on('resize', resizeMap);
        }

        function getCurrentImageWidth(){
            return $mapImg.width();
        }

        function getCurrentImageHeight(){
            return $mapImg.height();
        }

        function resizeMap() {
            var
                i, j, clen,
                newCoords = [],
                sizeFactorWidth  = getCurrentImageWidth() / imageWidth;
                sizeFactorHeight = getCurrentImageHeight() / imageHeight;

            for (i = 0; i < len; i++) {
                clen = coords[i].length;
                newCoords[i] = [];

                for (j = 0; j < clen; j+=2) {
                    newCoords[i][j]   = parseInt(coords[i][j]   * sizeFactorWidth,  10);
                    newCoords[i][j+1] = parseInt(coords[i][j+1] * sizeFactorHeight, 10);
                }

                areas[i].coords = newCoords[i].join(',');
                console.debug('['+areas[i].alt+'] '+ areas[i].coords);
            }
        }

        var
            map        = this,
            $mapImg    = $('img[usemap=#'+$(map).attr('name')+']'),
            areas      = map.getElementsByTagName('area'),
            len        = areas.length,
            coords     = [],
            imageWidth,
            imageHeight;

        init();
    }

    $.fn.imageMapResize = function(){
        return this.each(setUpImageMap);
    };

})(window.jQuery);