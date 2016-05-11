/**
 * PhysicsJS v0.7.0 - 2014-12-08
 * A modular, extendable, and easy-to-use physics engine for javascript
 * http://wellcaffeinated.net/PhysicsJS
 *
 * Copyright (c) 2014 Jasper Palfree <jasper@wellcaffeinated.net>
 * Licensed MIT
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['physicsjs','../geometries/convex-polygon'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory.apply(root, ['physicsjs','../geometries/convex-polygon'].map(require));
    } else {
        factory.call(root, root.Physics);
    }
}(this, function (Physics) {
    'use strict';
    /*
     * @requires geometries/convex-polygon
     */
     /**
      * class ConvexPolygonBody < Body
      *
      * Physics.body('convex-polygon')
      *
      * Body for convex polygons. The position of the body is the centroid of the polygon.
      *
      * Additional config options:
      *
      * - vertices: Array of [[Vectorish]] objects representing the polygon vertices in clockwise (or counterclockwise) order.
      *
      * Example:
      *
      * ```javascript
      * var pentagon = Physics.body('convex-polygon', {
      *     // place the centroid of the polygon at (300, 200)
      *     x: 300,
      *     y: 200,
      *     // the centroid is automatically calculated and used to position the shape
      *     vertices: [
      *         { x: 0, y: -30 },
      *         { x: -29, y: -9 },
      *         { x: -18, y: 24 },
      *         { x: 18, y: 24 },
      *         { x: 29, y: -9 }
      *     ]
      * });
      * ```
      **/
    Physics.body('convex-polygon', function( parent ){
    
        var defaults = {
    
        };
    
        return {
    
            // extended
            init: function( options ){
    
                // call parent init method
                parent.init.call(this, options);
    
                options = Physics.util.extend({}, defaults, options);
    
                this.geometry = Physics.geometry('convex-polygon', {
                    vertices: options.vertices
                });
    
                this.recalc();
            },
    
            // extended
            recalc: function(){
                parent.recalc.call(this);
                // moment of inertia
                this.moi = Physics.geometry.getPolygonMOI( this.geometry.vertices );
            }
        };
    });
    
    // end module: bodies/convex-polygon.js
    return Physics;
}));// UMD