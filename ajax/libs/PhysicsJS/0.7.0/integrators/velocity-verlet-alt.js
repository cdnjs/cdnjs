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
    Physics.integrator('velocity-verlet-alt', function( parent ){
    
        // for this integrator we need to know if the object has been integrated before
        // so let's add a mixin to bodies
    
        Physics.body.mixin({
    
            started: function( val ){
                if ( val !== undefined ){
                    this._started = true;
                }
    
                return !!this._started;
            }
        });
    
    
        return {
            /**
             * class VelocityVerlet < Integrator
             *
             * `Physics.integrator('velocity-verlet')`.
             *
             * The velocity-verlet integrator.
             **/
    
            // extended
            init: function( options ){
    
                // call parent init
                parent.init.call(this, options);
            },
    
            // extended
            integrateVelocities: function( bodies, dt ){
    
                // half the timestep
                var dtdt = dt * dt
                    ,drag = 1 - this.options.drag
                    ,body = null
                    ,state
                    ;
    
                for ( var i = 0, l = bodies.length; i < l; ++i ){
    
                    body = bodies[ i ];
                    state = body.state;
    
                    // only integrate if the body isn't static
                    if ( body.treatment !== 'static' ){
    
                        // v = v_prev + 0.5 * (a_prev + a) * dt
                        // x = x_prev + v_prev * dt + 0.5 * a_prev * dt * dt
    
                        // use the velocity in vel if the velocity has been changed manually
                        if ( !body.started() ){
    
                            // Set old vals on first integration
                            state.old.acc.clone( state.acc );
                            state.old.acc.mult( dt );
                            state.old.vel.clone( state.vel ).vsub( state.old.acc );
                            state.old.acc.mult( 1/dt );
                        }
    
                        // Apply "air resistance".
                        if ( drag ){
    
                            state.vel.mult( drag );
                        }
    
                        // Apply acceleration
                        // v += 0.5 * (a_prev + a) * dt
                        state.vel.vadd( state.old.acc.vadd( state.acc ).mult( 0.5 * dt ) );
    
                        // Reset accel
                        // state.acc.zero();
    
                        //
                        // Angular components
                        //
    
                        if ( !body.started() ){
    
                            // Set old vals on first integration
                            state.old.angular.acc = state.angular.acc;
                            state.old.angular.vel = state.angular.vel - state.old.angular.acc * dt;
                        }
    
                        state.angular.vel += 0.5 * (state.angular.acc + state.old.angular.acc) * dt;
                        state.angular.acc = 0;
    
                        body.started( true );
    
                    } else {
                        // set the velocity and acceleration to zero!
                        state.vel.zero();
                        state.acc.zero();
                        state.angular.vel = 0;
                        state.angular.acc = 0;
                    }
                }
            },
    
            // extended
            integratePositions: function( bodies, dt ){
    
                // half the timestep
                var dtdt = dt * dt
                    ,body = null
                    ,state
                    ;
    
                for ( var i = 0, l = bodies.length; i < l; ++i ){
    
                    body = bodies[ i ];
                    state = body.state;
    
                    // only integrate if the body isn't static
                    if ( body.treatment !== 'static' ){
    
                        // x = x_prev + v_prev * dt + 0.5 * a_prev * dt * dt
    
                        // Store old position.
                        // xold = x
                        state.old.pos.clone( state.pos );
    
                        state.old.vel.mult( dt );
                        state.old.acc.mult( 0.5 * dtdt );
                        state.pos.vadd( state.old.vel ).vadd( state.old.acc );
    
                        // store calculated velocity
                        state.old.vel.clone( state.vel );
    
                        // store old acc
                        state.old.acc.clone( state.acc );
    
                        // Reset accel
                        state.acc.zero();
    
                        //
                        // Angular components
                        //
                        state.old.angular.pos = state.angular.pos;
    
                        state.angular.pos += state.angular.vel * dt + 0.5 * state.old.angular.acc * dtdt;
                        state.old.angular.vel = state.angular.vel;
                        state.old.angular.acc = state.angular.acc;
                        state.angular.acc = 0;
                    }
                }
            }
        };
    });
    
    // end module: integrators/velocity-verlet-alt.js
    return Physics;
}));// UMD