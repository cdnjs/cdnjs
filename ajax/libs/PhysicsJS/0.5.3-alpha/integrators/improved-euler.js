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
    Physics.integrator('improved-euler', function( parent ){
    
        return {
    
            /**
             * Initialization
             * @param  {Object} options Configuration options
             * @return {void}
             */
            init: function( options ){
    
                // call parent init
                parent.init.call(this, options);
            },
    
            /**
             * Velocity integration
             * @param  {Array} bodies Array of bodies to integrate
             * @param  {Number} dt     Timestep size
             * @return {void}
             */
            integrateVelocities: function( bodies, dt ){
    
                // half the timestep squared
                var drag = 1 - this.options.drag
                    ,body = null
                    ,state
                    ;
    
                for ( var i = 0, l = bodies.length; i < l; ++i ){
    
                    body = bodies[ i ];
                    state = body.state;
    
                    // only integrate if the body isn't fixed
                    if ( !body.fixed ){
    
                        // Inspired from https://github.com/soulwire/Coffee-Physics
                        // @licence MIT
                        // 
                        // x += (v * dt) + (a * 0.5 * dt * dt)
                        // v += a * dt
    
                        
                        // Scale force to mass.
                        // state.acc.mult( body.massInv );
    
                        // Remember velocity for future use.
                        state.old.vel.clone( state.vel );
    
                        // remember original acc
                        state.old.acc.clone( state.acc );
    
                        // Update velocity first so we can reuse the acc vector.
                        // a *= dt
                        // v += a ...
                        state.vel.vadd( state.acc.mult( dt ) );
    
                        // Apply "air resistance".
                        if ( drag ){
    
                            state.vel.mult( drag );
                        }
    
                        // Reset accel
                        state.acc.zero();
    
                        //
                        // Angular components
                        // 
    
                        state.old.angular.vel = state.angular.vel;
                        state.angular.vel += state.angular.acc * dt;
                        state.angular.acc = 0;
    
                    } else {
                        // set the velocity and acceleration to zero!
                        state.vel.zero();
                        state.acc.zero();
                        state.angular.vel = 0;
                        state.angular.acc = 0;
                    }
                }
            },
    
            /**
             * Position integration
             * @param  {Array} bodies Array of bodies to integrate
             * @param  {Number} dt     Timestep size
             * @return {void}
             */
            integratePositions: function( bodies, dt ){
    
                // half the timestep squared
                var halfdtdt = 0.5 * dt * dt
                    ,body = null
                    ,state
                    // use cached vector instances
                    // so we don't need to recreate them in a loop
                    ,scratch = Physics.scratchpad()
                    ,vel = scratch.vector()
                    ,angVel
                    ;
    
                for ( var i = 0, l = bodies.length; i < l; ++i ){
    
                    body = bodies[ i ];
                    state = body.state;
    
                    // only integrate if the body isn't fixed
                    if ( !body.fixed ){
    
    
                        // Store previous location.
                        state.old.pos.clone( state.pos );
    
                        // Update position.
                        // ...
                        // oldV *= dt
                        // a *= 0.5 * dt
                        // x += oldV + a
                        vel.clone( state.old.vel );
                        state.pos.vadd( vel.mult( dt ) ).vadd( state.old.acc.mult( halfdtdt ) );
    
                        state.old.acc.zero();
    
                        //
                        // Angular components
                        // 
    
                        state.old.angular.pos = state.angular.pos;
                        state.angular.pos += state.old.angular.vel * dt + state.old.angular.acc * halfdtdt;
                        state.old.angular.acc = 0;
    
                    }
                }
    
                scratch.done();
            }
        };
    });
    
    
    // end module: integrators/improved-euler.js
    return Physics;
})); // UMD 