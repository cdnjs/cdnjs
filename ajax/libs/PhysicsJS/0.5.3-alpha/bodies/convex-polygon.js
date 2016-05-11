/**
 * PhysicsJS v0.5.3 - 2013-11-25
 * A modular, extendable, and easy-to-use physics engine for javascript
 * http://wellcaffeinated.net/PhysicsJS
 *
 * Copyright (c) 2013 Jasper Palfree <jasper@wellcaffeinated.net>
 * Licensed MIT
 */
(function (root, factory) {
    var deps = ['physicsjs', '../geometries/convex-polygon'];
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
     * Convex Polygon Body
     * @module bodies/convex-polygon
     * @requires geometries/convex-polygon
     */
    Physics.body('convex-polygon', function( parent ){
    
        var defaults = {
            
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
    
                this.geometry = Physics.geometry('convex-polygon', {
                    vertices: options.vertices
                });
    
                this.recalc();
            },
    
            /**
             * Recalculate properties. Call when body physical properties are changed.
             * @return {this}
             */
            recalc: function(){
                parent.recalc.call(this);
                // moment of inertia
                this.moi = Physics.geometry.getPolygonMOI( this.geometry.vertices );
            }
        };
    });
    
    // end module: bodies/convex-polygon.js
    return Physics;
})); // UMD 