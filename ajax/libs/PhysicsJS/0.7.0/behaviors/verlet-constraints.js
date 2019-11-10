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
     * class VerletConstraintsBehavior < Behavior
     *
     * `Physics.behavior('verlet-constraints')`.
     *
     * Verlet constraints manager.
     *
     * Handles distance constraints, and angle constraints
     *
     * Additional options include:
     * - iterations: The number of iterations to take to relax the constraints. (default: `2`)
     **/
    Physics.behavior('verlet-constraints', function( parent ){
    
        var TWOPI = 2 * Math.PI;
    
        var defaults = {
    
            // number of iterations to resolve constraints
            iterations: 2
        };
    
        return {
    
            // extended
            init: function( options ){
    
                parent.init.call( this );
                this.options.defaults( defaults );
                this.options( options );
    
                this._distanceConstraints = [];
                this._angleConstraints = [];
            },
    
            // extended
            connect: function( world ){
    
                var intg = world.integrator();
    
                if ( intg && intg.name.indexOf('verlet') < 0 ){
    
                    throw 'The rigid constraint manager needs a world with a "verlet" compatible integrator.';
                }
    
                world.on('integrate:positions', this.resolve, this);
            },
    
            // extended
            disconnect: function( world ){
    
                world.off('integrate:positions', this.resolve, this);
            },
    
            /**
             * VerletConstraintsBehavior#drop() -> this
             *
             * Remove all constraints
             **/
            drop: function(){
    
                // drop the current constraints
                this._distanceConstraints = [];
                this._angleConstraints = [];
                return this;
            },
    
            /**
             * VerletConstraintsBehavior#distanceConstraint( bodyA, bodyB[, stiffness, targetLength] ) -> Object
             * - bodyA (Body): First body
             * - bodyB (Body): Second body
             * - stiffness (Number): A number between 0 and 1 that represents the stiffness of the constraint. Defaults to: `0.5`
             * - targetLength (Number): Target length. defaults to current distance between the bodies
             * + (Object): The constraint data object
             *
             * Constrain two bodies to a target relative distance.
             *
             * Returns constraint data that can be used to remove the constraint later.
             *
             * - `.bodyA` and `.bodyB` are references to the bodies
             * - `.type` is the type of constraint
             * - `.id` is the string ID of the constraint
             * - `.stiffness` is the stiffness
             * - `.targetLength` is the target length
             **/
            distanceConstraint: function( bodyA, bodyB, stiffness, targetLength ){
    
                var cst;
    
                if (!bodyA || !bodyB){
    
                    return false;
                }
    
                cst = {
                    id: Physics.util.uniqueId('dis-constraint'),
                    type: 'dis',
                    bodyA: bodyA,
                    bodyB: bodyB,
                    stiffness: stiffness || 0.5,
                    targetLength: targetLength || bodyB.state.pos.dist( bodyA.state.pos )
                };
    
                cst.targetLengthSq = cst.targetLength * cst.targetLength;
    
                this._distanceConstraints.push( cst );
                return cst;
            },
    
            /**
             * VerletConstraintsBehavior#angleConstraint( bodyA, bodyB, bodyC[, stiffness, targetAngle] ) -> Object
             * - bodyA (Body): First body
             * - bodyB (Body): Second body
             * - bodyC (Body): Third body
             * - stiffness (Number): A number between 0 and 1 that represents the stiffness of the constraint. Defaults to: `0.5`
             * - targetAngle (Number): Target angle. Defaults to the current angle between bodies
             * + (Object): The constraint data object
             *
             * Constrain three bodies to a target relative angle
             *
             * Returns constraint data that can be used to remove the constraint later.
             *
             * - `.bodyA`, `.bodyB`, and `.bodyC` are references to the bodies
             * - `.type` is the type of constraint
             * - `.id` is the string ID of the constraint
             * - `.stiffness` is the stiffness
             * - `.targetAngle` is the target angle
             **/
            angleConstraint: function( bodyA, bodyB, bodyC, stiffness, targetAngle ){
    
                var cst;
    
                if (!bodyA || !bodyB){
    
                    return false;
                }
    
                cst = {
                    id: Physics.util.uniqueId('ang-constraint'),
                    type: 'ang',
                    bodyA: bodyA,
                    bodyB: bodyB,
                    bodyC: bodyC,
                    stiffness: stiffness || 0.5,
                    targetAngle: targetAngle || bodyB.state.pos.angle2( bodyA.state.pos, bodyC.state.pos )
                };
    
                this._angleConstraints.push( cst );
                return cst;
            },
    
            /**
             * VerletConstraintsBehavior#remove( constraintData ) -> this
             * VerletConstraintsBehavior#remove( constraintId ) -> this
             * - constraintData (Object): The constraint data returned when creating a constraint
             * - constraintId (String): The constraint id
             *
             * Remove a constraint
             **/
            remove: function( cstrOrId ){
    
                var constraints
                    ,type
                    ,isObj
                    ,i
                    ,l
                    ;
    
                isObj = Physics.util.isObject( cstrOrId );
    
                type = (isObj) ? cstrOrId.type : cstrOrId.substr(0, 3);
                constraints = ( type === 'ang' ) ? this._angleConstraints : this._distanceConstraints;
    
                if ( isObj ){
    
                    for ( i = 0, l = constraints.length; i < l; ++i ){
    
                        if ( constraints[ i ] === cstrOrId ){
    
                            constraints.splice( i, 1 );
                            return this;
                        }
                    }
                } else {
    
                    for ( i = 0, l = constraints.length; i < l; ++i ){
    
                        if ( constraints[ i ].id === cstrOrId ){
    
                            constraints.splice( i, 1 );
                            return this;
                        }
                    }
                }
    
                return this;
            },
    
            /** internal
             * VerletConstraintsBehavior#resolveAngleConstraints( coef )
             * - coef (Number): Coefficient for this resolution phase
             *
             * Resolve angle constraints.
             **/
            resolveAngleConstraints: function( coef ){
    
                var constraints = this._angleConstraints
                    ,scratch = Physics.scratchpad()
                    ,trans = scratch.transform()
                    ,con
                    ,ang
                    ,corr
                    ,proportion
                    ,invMassSum
                    ;
    
                for ( var i = 0, l = constraints.length; i < l; ++i ){
    
                    con = constraints[ i ];
    
                    ang = con.bodyB.state.pos.angle2( con.bodyA.state.pos, con.bodyC.state.pos );
                    corr = ang - con.targetAngle;
    
                    if (!corr){
    
                        continue;
    
                    } else if (corr <= -Math.PI){
    
                        corr += TWOPI;
    
                    } else if (corr >= Math.PI){
    
                        corr -= TWOPI;
                    }
    
                    trans.setTranslation( con.bodyB.state.pos );
    
                    corr *= -coef * con.stiffness;
    
                    if ( con.bodyA.treatment === 'dynamic' && con.bodyB.treatment === 'dynamic' && con.bodyC.treatment === 'dynamic' ){
                        invMassSum = 1 / (con.bodyA.mass + con.bodyB.mass + con.bodyC.mass);
                    }
    
                    if ( con.bodyA.treatment === 'dynamic' ){
    
                        if ( con.bodyB.treatment === 'dynamic' && con.bodyC.treatment === 'dynamic' ){
    
                            ang = corr * (con.bodyB.mass + con.bodyC.mass) * invMassSum;
    
                        } else if ( con.bodyB.treatment !== 'dynamic' ){
    
                            ang = corr * con.bodyC.mass / ( con.bodyC.mass + con.bodyA.mass );
    
                        } else {
    
                            ang = corr * con.bodyB.mass / ( con.bodyB.mass + con.bodyA.mass );
                        }
    
    
                        trans.setRotation( ang );
                        con.bodyA.state.pos.translateInv( trans );
                        con.bodyA.state.pos.rotate( trans );
                        con.bodyA.state.pos.translate( trans );
                    }
    
                    if ( con.bodyC.treatment === 'dynamic' ){
    
                        if ( con.bodyA.treatment === 'dynamic' && con.bodyB.treatment === 'dynamic' ){
    
                            ang = -corr * (con.bodyB.mass + con.bodyA.mass) * invMassSum;
    
                        } else if ( con.bodyB.treatment !== 'dynamic' ){
    
                            ang = -corr * con.bodyA.mass / ( con.bodyC.mass + con.bodyA.mass );
    
                        } else {
    
                            ang = -corr * con.bodyB.mass / ( con.bodyB.mass + con.bodyC.mass );
                        }
    
                        trans.setRotation( ang );
                        con.bodyC.state.pos.translateInv( trans );
                        con.bodyC.state.pos.rotate( trans );
                        con.bodyC.state.pos.translate( trans );
                    }
    
                    if ( con.bodyB.treatment === 'dynamic' ){
    
                        if ( con.bodyA.treatment === 'dynamic' && con.bodyC.treatment === 'dynamic' ){
    
                            ang = corr * (con.bodyA.mass + con.bodyC.mass) * invMassSum;
    
                        } else if ( con.bodyA.treatment !== 'dynamic' ){
    
                            ang = corr * con.bodyC.mass / ( con.bodyC.mass + con.bodyB.mass );
    
                        } else {
    
                            ang = corr * con.bodyA.mass / ( con.bodyA.mass + con.bodyC.mass );
                        }
    
                        // ang = corr;
    
                        trans.setRotation( ang ).setTranslation( con.bodyA.state.pos );
                        con.bodyB.state.pos.translateInv( trans );
                        con.bodyB.state.pos.rotate( trans );
                        con.bodyB.state.pos.translate( trans );
    
                        trans.setTranslation( con.bodyC.state.pos );
                        con.bodyB.state.pos.translateInv( trans );
                        con.bodyB.state.pos.rotateInv( trans );
                        con.bodyB.state.pos.translate( trans );
                    }
    
                    con.bodyA.sleepCheck();
                    con.bodyB.sleepCheck();
                    con.bodyC.sleepCheck();
                }
    
                scratch.done();
            },
    
            /** internal
             * VerletConstraintsBehavior#resolveDistanceConstraints( coef )
             * - coef (Number): Coefficient for this resolution phase
             *
             * Resolve distance constraints.
             **/
            resolveDistanceConstraints: function( coef ){
    
                var constraints = this._distanceConstraints
                    ,scratch = Physics.scratchpad()
                    ,BA = scratch.vector()
                    ,con
                    ,len
                    ,corr
                    ,proportion
                    ;
    
                for ( var i = 0, l = constraints.length; i < l; ++i ){
    
                    con = constraints[ i ];
    
                    // move constrained bodies to target length based on their
                    // mass proportions
                    BA.clone( con.bodyB.state.pos ).vsub( con.bodyA.state.pos );
                    len = BA.normSq() || Math.random() * 0.0001;
                    corr = coef * con.stiffness * ( len - con.targetLengthSq ) / len;
    
                    BA.mult( corr );
                    proportion = (con.bodyA.treatment !== 'dynamic' || con.bodyB.treatment !== 'dynamic') ? 1 : con.bodyB.mass / (con.bodyA.mass + con.bodyB.mass);
    
                    if ( con.bodyA.treatment === 'dynamic' ){
    
                        if ( con.bodyB.treatment === 'dynamic' ){
                            BA.mult( proportion );
                        }
    
                        con.bodyA.state.pos.vadd( BA );
    
                        if ( con.bodyB.treatment === 'dynamic' ){
                            BA.mult( 1 / proportion );
                        }
                    }
    
                    if ( con.bodyB.treatment === 'dynamic' ){
    
                        if ( con.bodyA.treatment === 'dynamic' ){
                            BA.mult( 1 - proportion );
                        }
    
                        con.bodyB.state.pos.vsub( BA );
                    }
    
                    con.bodyA.sleepCheck();
                    con.bodyB.sleepCheck();
                }
    
                scratch.done();
            },
    
            /** internal
             * VerletConstraintsBehavior#shuffleConstraints()
             *
             * Mix up the constraints.
             **/
            shuffleConstraints: function(){
    
                this._distanceConstraints = Physics.util.shuffle( this._distanceConstraints );
                this._angleConstraints = Physics.util.shuffle( this._angleConstraints );
            },
    
            /** internal
             * VerletConstraintsBehavior#resolve()
             *
             * Resolve all constraints.
             **/
            resolve: function(){
    
                var its = this.options.iterations
                    ,coef = 1 / its
                    ;
    
                for (var i = 0; i < its; i++){
    
                    // this.shuffleConstraints();
                    this.resolveDistanceConstraints( coef );
                    this.resolveAngleConstraints( coef );
                }
            },
    
            /**
             * VerletConstraintsBehavior#getConstraints() -> Object
             * + (Object): The object containing copied arrays of the constraints
             *
             * Get all constraints.
             **/
            getConstraints: function(){
    
                return {
                    distanceConstraints: [].concat(this._distanceConstraints),
                    angleConstraints: [].concat(this._angleConstraints)
                };
            }
        };
    });
    
    // end module: behaviors/verlet-constraints.js
    return Physics;
}));// UMD