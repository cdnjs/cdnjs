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
        define(['physicsjs'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory.apply(root, ['physicsjs'].map(require));
    } else {
        factory.call(root, root.Physics);
    }
}(this, function (Physics) {
    'use strict';
    /** 
     * class AttractorBehavior < Behavior
     *
     * `Physics.behavior('attractor')`.
     *
     * Attractor behavior attracts bodies to a specific point.
     *
     * Additional options include:
     * - pos: The position of the attraction point
     * - strength: How strong the attraction is (default: `1`)
     * - order: The power of the inverse distance (default: `2` because that is newtonian gravity... inverse square)
     * - max: The maximum distance in which to apply the attraction (default: Infinity)
     * - min: The minimum distance above which to apply the attraction (default: very small non-zero)
     **/
    Physics.behavior('attractor', function( parent ){
    
        var defaults = {
    
            pos: null, // default to (0, 0)
            // how strong the attraction is
            strength: 1,
            // power of the inverse distance (2 is inverse square)
            order: 2,
            // max distance to apply it to
            max: false, // infinite
            // min distance to apply it to
            min: false // auto calc
        };
    
        return {
    
            // extended
            init: function( options ){
    
                var self = this;
                this._pos = new Physics.vector();
                // call parent init method
                parent.init.call( this );
                this.options.defaults( defaults );
                this.options.onChange(function( opts ){
                    self._maxDist = opts.max === false ? Infinity : opts.max;
                    self._minDist = opts.min ? opts.min : 10;
                    self.position( opts.pos );
                });
                this.options( options );
            },
    
            /**
             * AttractorBehavior#position( [pos] ) -> this|Object
             * - pos (Vectorish): The position to set
             * + (Object): Returns the [[Vectorish]] position if no arguments provided
             * + (this): For chaining
             *
             * Get or set the position of the attractor.
             **/
            position: function( pos ){
                
                var self = this;
    
                if ( pos ){
                    this._pos.clone( pos );
                    return self;
                }
    
                return this._pos.values();
            },
            
            // extended
            behave: function( data ){
    
                var bodies = this.getTargets()
                    ,body
                    ,order = this.options.order
                    ,strength = this.options.strength
                    ,minDist = this._minDist
                    ,maxDist = this._maxDist
                    ,scratch = Physics.scratchpad()
                    ,acc = scratch.vector()
                    ,norm
                    ,g
                    ;
    
                for ( var j = 0, l = bodies.length; j < l; j++ ){
                    
                    body = bodies[ j ];
    
                    // clone the position
                    acc.clone( this._pos );
                    acc.vsub( body.state.pos );
                    // get the distance
                    norm = acc.norm();
    
                    if (norm > minDist && norm < maxDist){
    
                        g = strength / Math.pow(norm, order);
    
                        body.accelerate( acc.normalize().mult( g ) );
                    }
                }
    
                scratch.done();
            }
        };
    });
    
    // end module: behaviors/attractor.js
    return Physics;
}));// UMD