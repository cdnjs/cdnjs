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
        define(['physicsjs','../geometries/rectangle'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory.apply(root, ['physicsjs','../geometries/rectangle'].map(require));
    } else {
        factory.call(root, root.Physics);
    }
}(this, function (Physics) {
    'use strict';
    /*
     * @requires geometries/rectangle
     */
     /**
      * class RectangleBody < Body
      *
      * Physics.body('rectangle')
      *
      * Body for rectangles. The position of the body is the centroid of the rectangle.
      *
      * Additional config options:
      *
      * - width: The width
      * - height: The height
      *
      * Example:
      *
      * ```javascript
      * var rect = Physics.body('rectangle', {
      *     // place the centroid of the rectangle at (300, 200)
      *     x: 300,
      *     y: 200,
      *     width: 30,
      *     height: 40
      * });
      * ```
      **/
    Physics.body('rectangle', function( parent ){
    
        var defaults = {
    
        };
    
        return {
    
            // extended
            init: function( options ){
    
                // call parent init method
                parent.init.call(this, options);
    
                options = Physics.util.extend({}, defaults, options);
    
                this.geometry = Physics.geometry('rectangle', {
                    width: options.width,
                    height: options.height
                });
    
                this.recalc();
            },
    
            // extended
            recalc: function(){
                var w = this.geometry.width;
                var h = this.geometry.height;
                parent.recalc.call(this);
                // moment of inertia
                this.moi = ( w*w + h*h ) * this.mass / 12;
            }
        };
    });
    
    // end module: bodies/rectangle.js
    return Physics;
}));// UMD