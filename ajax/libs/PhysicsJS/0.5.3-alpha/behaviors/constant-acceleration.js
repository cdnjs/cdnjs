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
     * Constant acceleration behavior
     * @module behaviors/constant-acceleration
     */
    Physics.behavior('constant-acceleration', function( parent ){
    
        var defaults = {
    
            acc: { x : 0, y: 0.0004 }
        };
    
        return {
    
            /**
             * Initialization
             * @param  {Object} options Configuration object
             * @return {void}
             */
            init: function( options ){
    
                parent.init.call(this, options);
    
                // extend options
                this.options = Physics.util.extend(this.options, defaults, options);
                this._acc = Physics.vector();
                this.setAcceleration( this.options.acc );
            },
    
            /**
             * Set the acceleration of the behavior
             * @param {Vectorish} acc The acceleration vector
             * @return {self}
             */
            setAcceleration: function( acc ){
    
                this._acc.clone( acc );
                return this;
            },
    
            /**
             * Callback run on integrate:positions event
             * @param  {Object} data Event data
             * @return {void}
             */
            behave: function( data ){
    
                var bodies = data.bodies;
    
                for ( var i = 0, l = bodies.length; i < l; ++i ){
                    
                    bodies[ i ].accelerate( this._acc );
                }
            }
        };
    });
    // end module: behaviors/constant-acceleration.js
    return Physics;
})); // UMD 