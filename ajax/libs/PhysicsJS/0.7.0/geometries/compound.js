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
     * class CompoundGeometry < Geometry
     *
     * Physics.geometry('compound')
     *
     * Geometry for compound shapes.
     *
     * Example:
     *
     * ```javascript
     * var thing = Physics.geometry('compound');
     * thing.addChild( child, pos, rotation );
     * ```
     **/
    Physics.geometry('compound', function( parent ){
    
        var defaults = {
    
        };
    
        return {
    
            // extended
            init: function( options ){
    
                var self = this;
    
                // call parent init method
                parent.init.call(this, options);
    
                this.options.defaults( defaults );
                this.options( options );
    
                this.children = [];
            },
    
            /**
             * CompoundGeometry#addChild( geometry, pos ) -> this
             * - geometry (Geometry): The child to add.
             * - pos (Physics.vector): The position to add the child at.
             * - angle (Number): The rotation angle
             *
             * Add a child at relative position.
             **/
            addChild: function( geometry, pos, angle ){
    
                this._aabb = null;
                this.children.push({
                    g: geometry
                    ,pos: new Physics.vector( pos )
                    ,angle: angle
                });
    
                return this;
            },
    
            /**
             * CompoundGeometry#clear() -> this
             *
             * Remove all children.
             **/
            clear: function(){
    
                this._aabb = null;
                this.children = [];
    
                return this;
            },
    
            // extended
            aabb: function( angle ){
    
                if (!angle && this._aabb){
                    return Physics.aabb.clone( this._aabb );
                }
    
                var b
                    ,aabb
                    ,ch
                    ,ret
                    ,scratch = Physics.scratchpad()
                    ,pos = Physics.vector()
                    ;
    
                angle = angle || 0;
    
                for ( var i = 0, l = this.children.length; i < l; i++ ) {
                    ch = this.children[ i ];
                    // the aabb rotated by overall angle and the child rotation
                    aabb = ch.g.aabb( angle + ch.angle );
                    pos.clone( ch.pos );
                    if ( angle ){
                        // get the child's position rotated if needed
                        pos.rotate( angle );
                    }
                    // move the aabb to the child's position
                    aabb.x += pos._[0];
                    aabb.y += pos._[1];
                    ret = ret ? Physics.aabb.union(ret, aabb, true) : aabb;
                }
    
                if ( !angle ){
                    // if we don't have an angle specified (or it's zero)
                    // then we can cache this result
                    this._aabb = Physics.aabb.clone( ret );
                }
    
                return scratch.done( ret );
            },
    
            // extended
            // NOTE: unlike other geometries this can't be used in the
            // GJK algorithm because the shape isn't garanteed to be convex
            getFarthestHullPoint: function( dir, result ){
    
                var ch
                    ,i
                    ,l = this.children.length
                    ,scratch = Physics.scratchpad()
                    ,v = scratch.vector()
                    ,len = 0
                    ,maxlen = 0
                    ;
    
                result = result || new Physics.vector();
    
                // find the one with the largest projection along dir
                for ( i = 0; i < l; i++ ) {
                    ch = this.children[ i ];
                    ch.g.getFarthestHullPoint( dir.rotate(-ch.angle), v );
                    len = v.rotate(ch.angle).vadd( ch.pos ).proj( dir.rotate(ch.angle) );
    
                    if ( len > maxlen ){
                        maxlen = len;
                        result.swap( v );
                    }
                }
    
                return scratch.done( result );
            },
    
            // extended
            // NOTE: unlike other geometries this can't be used in the
            // GJK algorithm because the shape isn't garanteed to be convex
            getFarthestCorePoint: function( dir, result, margin ){
    
                var ch
                    ,i
                    ,l = this.children.length
                    ,scratch = Physics.scratchpad()
                    ,v = scratch.vector()
                    ,len = 0
                    ,maxlen = 0
                    ;
    
                result = result || new Physics.vector();
    
                // find the one with the largest projection along dir
                for ( i = 0; i < l; i++ ) {
                    ch = this.children[ i ];
                    ch.g.getFarthestCorePoint(dir.rotate(-ch.angle), v, margin );
                    len = v.rotate(ch.angle).vadd( ch.pos ).proj( dir.rotate(ch.angle) );
    
                    if ( len > maxlen ){
                        maxlen = len;
                        result.swap( v );
                    }
                }
    
                return scratch.done( result );
            }
        };
    });
    
    // end module: geometries/compound.js
    return Physics;
}));// UMD