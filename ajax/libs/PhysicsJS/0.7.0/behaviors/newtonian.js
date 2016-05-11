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
    
            calcPotential: function( posA, posB, out ){
    
                var strength = this.options.strength
                    ,minDistSq = this._minDistSq
                    ,maxDistSq = this._maxDistSq
                    ,normsq
                    ,g
                    ,pos
                    ;
    
                pos = out || new Physics.vector();
    
                // clone the position
                pos.clone( posB ).vsub( posA );
                // get the square distance
                normsq = pos.normSq();
    
                if (normsq > minDistSq && normsq < maxDistSq){
    
                    g = strength / normsq;
                    return pos.normalize().mult( g );
                }
    
                return pos.zero();
            },
    
            // extended
            behave: function( data ){
    
                var bodies = this.getTargets()
                    ,body
                    ,other
                    ,scratch = Physics.scratchpad()
                    ,potential = scratch.vector()
                    ,comp
                    ,bodyA
                    ,bodyB
                    ,posA = scratch.vector()
                    ,posB = scratch.vector()
                    ,i, j, k, m, l, ll, lll
                    ;
    
                for ( j = 0, l = bodies.length; j < l; j++ ){
    
                    body = bodies[ j ];
    
                    for ( i = j + 1; i < l; i++ ){
    
                        other = bodies[ i ];
    
                        if ( body.name === 'compound' ){
                            comp = body;
                        } else if ( other.name === 'compound' ){
                            comp = other;
                            other = body;
                        }
    
                        if ( comp ){
                            if ( other.name === 'compound' ){
                                for ( k = 0, ll = comp.children.length; k < ll; k++ ){
                                    bodyA = comp.children[ k ];
                                    comp.toWorldCoords( posA.clone( bodyA.state.pos ).vadd( comp.offset ) );
                                    for ( m = 0, lll = other.children.length; m < lll; m++ ){
                                        bodyB = other.children[ m ];
                                        other.toWorldCoords( posB.clone( bodyB.state.pos ).vadd( other.offset ) );
                                        this.calcPotential( posA, posB, potential );
                                        comp.accelerate( potential.mult( bodyB.mass ) );
                                        other.accelerate( potential.mult( bodyA.mass/bodyB.mass ).negate() );
                                    }
                                }
                            } else {
                                for ( k = 0, ll = comp.children.length; k < ll; k++ ){
                                    bodyA = comp.children[ k ];
                                    comp.toWorldCoords( posA.clone( bodyA.state.pos ).vadd( comp.offset ) );
                                    this.calcPotential( posA, other.state.pos, potential );
                                    comp.accelerate( potential.mult( other.mass ) );
                                    other.accelerate( potential.mult( bodyA.mass/other.mass ).negate() );
                                }
                            }
    
                        } else {
    
                            this.calcPotential( body.state.pos, other.state.pos, potential );
                            body.accelerate( potential.mult( other.mass ) );
                            other.accelerate( potential.mult( body.mass/other.mass ).negate() );
                        }
    
                        comp = null;
                    }
                }
    
                scratch.done();
            }
        };
    });
    
    // end module: behaviors/newtonian.js
    return Physics;
}));// UMD