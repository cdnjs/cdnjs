/**
 * Created by Michael on 12/03/14.
 */

angular.module('angularUtils.services.noise', [])
/**
 * Service to generate 1-dimensional Perlin noise. Based on the excellent article at Scratchapixel:
 * http://www.scratchapixel.com/lessons/3d-advanced-lessons/noise-part-1/creating-a-simple-1d-noise/
 *
 */
    .factory('noise', function() {

        var Simple1DNoise = function() {
            var MAX_VERTICES = 256;
            var MAX_VERTICES_MASK = MAX_VERTICES -1;
            var amplitude = 1;
            var scale = 1;

            var r = [];

            for ( var i = 0; i < MAX_VERTICES; ++i ) {
                r.push(Math.random());
            }

            var getVal = function( x ){
                var scaledX = x * scale;
                var xFloor = Math.floor(scaledX);
                var t = scaledX - xFloor;
                var tRemapSmoothstep = t * t * ( 3 - 2 * t );

                /// Modulo using &
                var xMin = xFloor & MAX_VERTICES_MASK;
                var xMax = ( xMin + 1 ) & MAX_VERTICES_MASK;

                var y = lerp( r[ xMin ], r[ xMax ], tRemapSmoothstep );

                return y * amplitude;
            };

            /**
             * Linear interpolation function.
             * @param a The lower integer value
             * @param b The upper integer value
             * @param t The value between the two
             * @returns {number}
             */
            var lerp = function(a, b, t ) {
                return a * ( 1 - t ) + b * t;
            };

            // return the API
            return {
                getVal: getVal,
                setAmplitude: function(newAmplitude) {
                    amplitude = newAmplitude;
                },
                setScale: function(newScale) {
                    scale = newScale;
                }
            };
        };

        return {
            newGenerator: function() {
                return new Simple1DNoise();
            }
        };
    });