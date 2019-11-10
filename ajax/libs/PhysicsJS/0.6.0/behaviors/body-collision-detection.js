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
     * class BodyCollisionDetectionBehavior < Behavior
     *
     * `Physics.behavior('body-collision-detection')`.
     *
     * Detect collisions of bodies.
     *
     * Publishes collision events to the world as a group of detected collisions per iteration.
     *
     * The event data will have a `.collisions` property that is an array of collisions of the form:
     *
     * ```javascript
     * {
     *     bodyA: // the first body
     *     bodyB: // the second body
     *     norm: // the normal vector (Vectorish)
     *     mtv: // the minimum transit vector. (the direction and length needed to extract bodyB from bodyA)
     *     pos: // the collision point
     *     overlap: // the amount bodyA overlaps bodyB
     * }
     * ```
     *
     * Additional options include:
     * - check: channel to listen to for collision candidates (default: `collisions:candidates`). set to `true` to force check every pair of bodies in the world
     * - channel: channel to publish events to (default: `collisions:detected`)
     **/
    Physics.behavior('body-collision-detection', function( parent ){
    
        var supportFnStack = [];
    
        /*
         * getSupportFn( bodyA, bodyB ) -> Function
         * - bodyA (Object): First body
         * - bodyB (Object): Second body
         * + (Function): The support function
         *
         * Get a general support function for use with GJK algorithm
         */
        var getSupportFn = function getSupportFn( bodyA, bodyB ){
    
            var hash = Physics.util.pairHash( bodyA.uid, bodyB.uid )
                ,fn = supportFnStack[ hash ]
                ;
    
            if ( !fn ){
                fn = supportFnStack[ hash ] = function( searchDir ){
    
                    var scratch = Physics.scratchpad()
                        ,tA = fn.tA
                        ,tB = fn.tB
                        ,vA = scratch.vector()
                        ,vB = scratch.vector()
                        ,marginA = fn.marginA
                        ,marginB = fn.marginB
                        ;
    
                    if ( fn.useCore ){
                        vA = bodyA.geometry.getFarthestCorePoint( searchDir.rotateInv( tA ), vA, marginA ).transform( tA );
                        vB = bodyB.geometry.getFarthestCorePoint( searchDir.rotate( tA ).rotateInv( tB ).negate(), vB, marginB ).transform( tB );
                    } else {
                        vA = bodyA.geometry.getFarthestHullPoint( searchDir.rotateInv( tA ), vA ).transform( tA );
                        vB = bodyB.geometry.getFarthestHullPoint( searchDir.rotate( tA ).rotateInv( tB ).negate(), vB ).transform( tB );
                    }
    
                    searchDir.negate().rotate( tB );
    
                    return scratch.done({
                        a: vA.values(),
                        b: vB.values(),
                        pt: vA.vsub( vB ).values()
                    });
                };
    
                fn.tA = Physics.transform();
                fn.tB = Physics.transform();
            }
    
            fn.useCore = false;
            fn.margin = 0;
            fn.tA.setTranslation( bodyA.state.pos ).setRotation( bodyA.state.angular.pos );
            fn.tB.setTranslation( bodyB.state.pos ).setRotation( bodyB.state.angular.pos );
            fn.bodyA = bodyA;
            fn.bodyB = bodyB;
    
            return fn;
        };
    
        /*
         * checkGJK( bodyA, bodyB ) -> Object
         * - bodyA (Object): First body
         * - bodyB (Object): Second body
         * + (Object): Collision result
         *
         * Use GJK algorithm to check arbitrary bodies for collisions
         */
        var checkGJK = function checkGJK( bodyA, bodyB ){
    
            var scratch = Physics.scratchpad()
                ,d = scratch.vector()
                ,tmp = scratch.vector()
                ,overlap
                ,result
                ,support
                ,collision = false
                ,aabbA = bodyA.aabb()
                ,dimA = Math.min( aabbA.hw, aabbA.hh )
                ,aabbB = bodyB.aabb()
                ,dimB = Math.min( aabbB.hw, aabbB.hh )
                ;
    
            // just check the overlap first
            support = getSupportFn( bodyA, bodyB );
            d.clone( bodyA.state.pos ).vsub( bodyB.state.pos );
            result = Physics.gjk(support, d, true);
    
            if ( result.overlap ){
    
                // there is a collision. let's do more work.
                collision = {
                    bodyA: bodyA,
                    bodyB: bodyB
                };
    
                // first get the min distance of between core objects
                support.useCore = true;
                support.marginA = 0;
                support.marginB = 0;
    
                while ( result.overlap && (support.marginA < dimA || support.marginB < dimB) ){
                    if ( support.marginA < dimA ){
                        support.marginA += 1;
                    }
                    if ( support.marginB < dimB ){
                        support.marginB += 1;
                    }
    
                    result = Physics.gjk(support, d);
                }
    
                if ( result.overlap || result.maxIterationsReached ){
                    // This implementation can't deal with a core overlap yet
                    return scratch.done(false);
                }
    
                // calc overlap
                overlap = Math.max(0, (support.marginA + support.marginB) - result.distance);
                collision.overlap = overlap;
                // @TODO: for now, just let the normal be the mtv
                collision.norm = d.clone( result.closest.b ).vsub( tmp.clone( result.closest.a ) ).normalize().values();
                collision.mtv = d.mult( overlap ).values();
                // get a corresponding hull point for one of the core points.. relative to body A
                collision.pos = d.clone( collision.norm ).mult( support.margin ).vadd( tmp.clone( result.closest.a ) ).vsub( bodyA.state.pos ).values();
            }
    
            return scratch.done( collision );
        };
    
        /*
         * checkCircles( bodyA, bodyB ) -> Object
         * - bodyA (Object): First body
         * - bodyB (Object): Second body
         * + (Object): Collision result
         *
         * Check two circles for collisions.
         */
        var checkCircles = function checkCircles( bodyA, bodyB ){
    
            var scratch = Physics.scratchpad()
                ,d = scratch.vector()
                ,tmp = scratch.vector()
                ,overlap
                ,collision = false
                ;
    
            d.clone( bodyB.state.pos ).vsub( bodyA.state.pos );
            overlap = d.norm() - (bodyA.geometry.radius + bodyB.geometry.radius);
    
            // hmm... they overlap exactly... choose a direction
            if ( d.equals( Physics.vector.zero ) ){
    
                d.set( 1, 0 );
            }
    
            // if ( overlap > 0 ){
            //     // check the future
            //     d.vadd( tmp.clone(bodyB.state.vel).mult( dt ) ).vsub( tmp.clone(bodyA.state.vel).mult( dt ) );
            //     overlap = d.norm() - (bodyA.geometry.radius + bodyB.geometry.radius);
            // }
    
            if ( overlap <= 0 ){
    
                collision = {
                    bodyA: bodyA,
                    bodyB: bodyB,
                    norm: d.normalize().values(),
                    mtv: d.mult( -overlap ).values(),
                    pos: d.normalize().mult( bodyA.geometry.radius ).values(),
                    overlap: -overlap
                };
            }
    
            return scratch.done( collision );
        };
    
        /*
         * checkPair( bodyA, bodyB ) -> Object
         * - bodyA (Object): First body
         * - bodyB (Object): Second body
         * + (Object): Collision result
         *
         * Check a pair for collisions
         */
        var checkPair = function checkPair( bodyA, bodyB ){
    
            // filter out bodies that don't collide with each other
            if (
                ( bodyA.treatment === 'static' || bodyA.treatment === 'kinematic' ) &&
                ( bodyB.treatment === 'static' || bodyB.treatment === 'kinematic' )
            ){
                return false;
            }
    
            if ( bodyA.geometry.name === 'circle' && bodyB.geometry.name === 'circle' ){
    
                return checkCircles( bodyA, bodyB );
    
            } else {
    
                return checkGJK( bodyA, bodyB );
            }
        };
    
        var defaults = {
    
            // channel to listen to for collision candidates
            // set to "true" to force check every pair of bodies in the world
            check: 'collisions:candidates',
    
            // channel to publish events to
            channel: 'collisions:detected'
        };
    
        return {
    
            // extended
            init: function( options ){
    
                parent.init.call( this );
                this.options.defaults( defaults );
                this.options( options );
            },
    
            // extended
            connect: function( world ){
    
                if ( this.options.check === true ){
    
                    world.on( 'integrate:velocities', this.checkAll, this );
    
                } else {
    
                    world.on( this.options.check, this.check, this );
                }
            },
    
            // extended
            disconnect: function( world ){
    
                if ( this.options.check === true ){
    
                    world.off( 'integrate:velocities', this.checkAll );
    
                } else {
    
                    world.off( this.options.check, this.check );
                }
            },
    
            /** internal
             * BodyCollisionDetectionBehavior#check( data )
             * - data (Object): The event data
             *
             * Event callback to check pairs of objects that have been flagged by broad phase for possible collisions.
             **/
            check: function( data ){
    
                var candidates = data.candidates
                    ,pair
                    ,targets = this.getTargets()
                    ,collisions = []
                    ,ret
                    ;
    
                for ( var i = 0, l = candidates.length; i < l; ++i ){
    
                    pair = candidates[ i ];
    
                    if ( targets === this._world._bodies ||
                        // only check if the members are targeted by this behavior
                        (Physics.util.indexOf( targets, pair.bodyA ) > -1) &&
                        (Physics.util.indexOf( targets, pair.bodyB ) > -1)
                    ){
                        ret = checkPair( pair.bodyA, pair.bodyB );
    
                        if ( ret ){
                            collisions.push( ret );
                        }
                    }
                }
    
                if ( collisions.length ){
    
                    this._world.emit( this.options.channel, {
                        collisions: collisions
                    });
                }
            },
    
            /** internal
             * BodyCollisionDetectionBehavior#checkAll( data )
             * - data (Object): The event data
             *
             * Event callback to check all pairs of objects in the list for collisions
             **/
            checkAll: function( data ){
    
                var bodies = this.getTargets()
                    ,dt = data.dt
                    ,bodyA
                    ,bodyB
                    ,collisions = []
                    ,ret
                    ;
    
                for ( var j = 0, l = bodies.length; j < l; j++ ){
    
                    bodyA = bodies[ j ];
    
                    for ( var i = j + 1; i < l; i++ ){
    
                        bodyB = bodies[ i ];
    
                        ret = checkPair( bodyA, bodyB );
    
                        if ( ret ){
                            collisions.push( ret );
                        }
                    }
                }
    
                if ( collisions.length ){
    
                    this._world.emit( this.options.channel, {
                        collisions: collisions
                    });
                }
            }
        };
    
    });
    
    // end module: behaviors/body-collision-detection.js
    return Physics;
}));// UMD