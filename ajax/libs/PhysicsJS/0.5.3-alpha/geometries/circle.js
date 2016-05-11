/**
 * PhysicsJS v0.5.3 - 2013-11-25
 * A modular, extendable, and easy-to-use physics engine for javascript
 * http://wellcaffeinated.net/PhysicsJS
 *
 * Copyright (c) 2013 Jasper Palfree <jasper@wellcaffeinated.net>
 * Licensed MIT
 */
(function (root, factory) {
    var deps = ['physicsjs'];
    if (typeof exports === 'object') {
        // Node. 
        var mods = deps.map(require);
        module.exports = factory.call(root, mods[ 0 ]);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(deps, function( p ){ return factory.call(root, p); });
    } else {
        // Browser globals (root is window). Dependency management is up to you.
        root.Physics = factory.call(root, root.Physics);
    }
}(this, function ( Physics ) {
    'use strict';
    /**
     * Circle geometry
     * @module geometries/circle
     */
    Physics.geometry('circle', function( parent ){
    
        var defaults = {
    
            radius: 1.0
        };
    
        return {
    
            /**
             * Initialization
             * @param  {Object} options Configuration options
             * @return {void}
             */
            init: function( options ){
    
                // call parent init method
                parent.init.call(this, options);
    
                options = Physics.util.extend({}, defaults, options);
                this.radius = options.radius;
                this._aabb = Physics.aabb();
            },
                    
            /**
             * Get axis-aligned bounding box for this object (rotated by angle if specified).
             * @param  {Number} angle (optional) The angle to rotate the geometry.
             * @return {Object}       Bounding box values
             */
            aabb: function( angle ){
    
                var r = this.radius
                    ,aabb = this._aabb
                    ;
    
                // circles are symetric... so angle has no effect
                if ( aabb.halfWidth() === r ){
                    // don't recalculate
                    return aabb.get();
                }
    
                return aabb.set( -r, -r, r, r ).get();
            },
    
            /**
             * Get farthest point on the hull of this geometry
             * along the direction vector "dir"
             * returns local coordinates
             * replaces result if provided
             * @param {Vector} dir Direction to look
             * @param {Vector} result (optional) A vector to write result to
             * @return {Vector} The farthest hull point in local coordinates
             */
            getFarthestHullPoint: function( dir, result ){
    
                result = result || Physics.vector();
    
                return result.clone( dir ).normalize().mult( this.radius );
            },
    
            /**
             * Get farthest point on the core of this geometry
             * along the direction vector "dir"
             * returns local coordinates
             * replaces result if provided
             * @param {Vector} dir Direction to look
             * @param {Vector} result (optional) A vector to write result to
             * @return {Vector} The farthest core point in local coordinates
             */
            getFarthestCorePoint: function( dir, result, margin ){
    
                result = result || Physics.vector();
    
                // we can use the center of the circle as the core object
                // because we can project a point to the hull in any direction
                // ... yay circles!
                // but since the caller is expecting a certain margin... give it
                // to them
                return result.clone( dir ).normalize().mult( this.radius - margin );
            }
        };
    });
    
    // end module: geometries/circle.js
    return Physics;
})); // UMD 