/**
 * PhysicsJS v0.6.0 - 2014-04-22
 * A modular, extendable, and easy-to-use physics engine for javascript
 * http://wellcaffeinated.net/PhysicsJS
 *
 * Copyright (c) 2014 Jasper Palfree <jasper@wellcaffeinated.net>
 * Licensed MIT
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['physicsjs'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory.apply(root, ['physicsjs'].map(require));
    } else {
        factory.call(root, root.Physics);
    }
}(this, function (Physics) {
    'use strict';
    /** 
     * class NewtonianBehavior < Behavior
     *
     * `Physics.behavior('newtonian')`.
     *
     * Newtonian attraction between bodies (inverse square law).
     *
     * Additional options include:
     * - strength: The strength of the interaction between bodies. (default: `1`)
     * - max: The maximum distance between bodies at which to apply the behavior. (default: `false`... infinite)
     * - min: The minimum distance between bodies at which to apply the behavior. (default: `false`... autocalculate)
     **/
    Physics.behavior('newtonian', function( parent ){
    
        var defaults = {
    
            strength: 1,
            // max distance to apply it to
            max: false, // infinite
            // min distance to apply it to
            min: false // auto calc
        };
    
        return {
    
            // extended
            init: function( options ){
    
                var self = this;
                // call parent init method
                parent.init.call( this );
                this.options.defaults( defaults );
                this.options.onChange(function( opts ){
                    self._maxDistSq = opts.max === false ? Infinity : opts.max * opts.max;
                    self._minDistSq = opts.min ? opts.min * opts.min : 100 * opts.strength;
                });
                this.options( options );
            },
            
            // extended
            behave: function( data ){
    
                var bodies = this.getTargets()
                    ,body
                    ,other
                    ,strength = this.options.strength
                    ,minDistSq = this._minDistSq
                    ,maxDistSq = this._maxDistSq
                    ,scratch = Physics.scratchpad()
                    ,pos = scratch.vector()
                    ,normsq
                    ,g
                    ;
    
                for ( var j = 0, l = bodies.length; j < l; j++ ){
                    
                    body = bodies[ j ];
    
                    for ( var i = j + 1; i < l; i++ ){
                        
                        other = bodies[ i ];
                        // clone the position
                        pos.clone( other.state.pos );
                        pos.vsub( body.state.pos );
                        // get the square distance
                        normsq = pos.normSq();
    
                        if (normsq > minDistSq && normsq < maxDistSq){
    
                            g = strength / normsq;
    
                            body.accelerate( pos.normalize().mult( g * other.mass ) );
                            other.accelerate( pos.mult( body.mass/other.mass ).negate() );
                        }
                    }
                }
    
                scratch.done();
            }
        };
    });
    
    // end module: behaviors/newtonian.js
    return Physics;
}));// UMD