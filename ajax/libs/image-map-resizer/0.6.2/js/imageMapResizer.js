/*! Image Map Resizer
 *  Desc: Resize HTML imageMap to scaled image.
 *  Copyright: (c) 2014-15 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

(function(){
    'use strict';

    function scaleImageMap(){

        function resizeMap() {
            function resizeAreaTag(cachedAreaCoords){
                function scaleCoord(e){
                    return e * scallingFactor[(1===(isWidth = 1-isWidth) ? 'width' : 'height')];
                }

                var isWidth = 0;

                return cachedAreaCoords.split(',').map(Number).map(scaleCoord).map(Math.floor).join(',');
            }

            var scallingFactor = {
                width  : displayedImage.width  / sourceImage.width,
                height : displayedImage.height / sourceImage.height
            };

            for (var i=0; i < areasLen ; i++) {
                areas[i].coords = resizeAreaTag(cachedAreaCoordsArray[i]);
            }
        }

        function start(){
            var
                displayedWidth  = null,
                displayedHeight = null;

            //WebKit asyncs image loading, so we have to catch the load event.
            sourceImage.onload = function sourceImageOnLoadF(){
                displayedWidth = displayedImage.width;
                displayedHeight = displayedImage.height;

                if ((displayedWidth !== sourceImage.width) || (displayedHeight !== sourceImage.height)) {
                    resizeMap();
                }
            };

            //IE11 can late load this image, so make sure we have the correct sizes (#10)
            displayedImage.onload = function() {
                if (null !== displayedWidth && displayedImage.width !== displayedWidth) {
                    resizeMap();
                }
            };

            //Make copy of image, so we can get the actual size measurements
            sourceImage.src = displayedImage.src;
        }

        function addListeners(){
            function debounce() {
                clearTimeout(timer);
                timer = setTimeout(resizeMap, 250);
            }

            addEventListener( displayedImage, 'load',      resizeMap );
            addEventListener( window,  'resize',           debounce  );
            addEventListener( window,  'focus',            resizeMap );
            addEventListener( window,  'readystatechange', resizeMap );
            addEventListener( document,'fullscreenchange', resizeMap );
        }


        function getCoords(e){
            // normalize coord-string to csv format without any space chars
            return e.coords.replace(/ *, */g,',').replace(/ +/g,',');
        }

        function beenHere(){
            return ('function' === typeof map._resize);
        }

        function setup(){
            map._resize           = resizeMap; //Bind resize method to HTML map element
            areas                 = map.getElementsByTagName('area');
            areasLen              = areas.length;
            cachedAreaCoordsArray = Array.prototype.map.call(areas, getCoords);
            displayedImage        = document.querySelector('img[usemap="#'+map.name+'"]');
            sourceImage           = new Image();
        }

        var
            /*jshint validthis:true */
            map   = this,
            areas = null, areasLen = null, cachedAreaCoordsArray = null, displayedImage = null, sourceImage = null, timer = null;

        if (!beenHere()){
            setup();
            addListeners();
            start();
        } else {
            map._resize(); //Already setup, so just resize map
        }
    }



    function addEventListener(obj,evt,func){
        if ('addEventListener' in window)obj.addEventListener(evt,func, false);
        else if ('attachEvent' in window) obj.attachEvent('on'+evt,func); // IE8
    }



    function factory(){
        function init(element){
            if(!element.tagName) {
                throw new TypeError('Object is not a valid DOM element');
            } else if ('MAP' !== element.tagName.toUpperCase()) {
                throw new TypeError('Expected <MAP> tag, found <'+element.tagName+'>.');
            }

            scaleImageMap.call(element);
        }

        return function imageMapResizeF(target){
            switch (typeof(target)){
                case 'undefined':
                case 'string':
                    Array.prototype.forEach.call(document.querySelectorAll(target||'map'),init);
                    break;
                case 'object':
                    init(target);
                    break;
                default:
                    throw new TypeError('Unexpected data type ('+typeof(target)+').');
            }
        };
    }


    if (typeof define === 'function' && define.amd) {
        define([],factory);
    } else if (typeof exports === 'object') { //Node for browserfy
        module.exports = factory();
    } else {
        window.imageMapResize = factory();
    }


    if('jQuery' in window) {
        jQuery.fn.imageMapResize = function $imageMapResizeF(){
            return this.filter('map').each(scaleImageMap).end();
        };
    }

})();



//PolyFils from MDN.
(function() {
  if (!Array.prototype.map){
    Array.prototype.map = function(fun /*, thisArg */){
      "use strict";

      if (this === void 0 || this === null || typeof fun !== "function"){
        throw new TypeError();
      }

      var
          t = Object(this),
          len = t.length >>> 0,
          res = new Array(len),
          thisArg = arguments.length >= 2 ? arguments[1] : void 0;

      for (var i = 0; i < len; i++){
        if (i in t) {
          res[i] = fun.call(thisArg, t[i], i, t);
        }
      }

      return res;
    };
  }

  if (!Array.prototype.forEach){
    Array.prototype.forEach = function(fun /*, thisArg */){
      "use strict";

      if (this === void 0 || this === null || typeof fun !== "function"){
        throw new TypeError();
      }

      var
        t = Object(this),
        len = t.length >>> 0,
        thisArg = arguments.length >= 2 ? arguments[1] : void 0;

      for (var i = 0; i < len; i++){
        if (i in t){
          fun.call(thisArg, t[i], i, t);
        }
      }
    };
  }

})();
