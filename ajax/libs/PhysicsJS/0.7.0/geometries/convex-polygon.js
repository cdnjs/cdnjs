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
     * class ConvexPolygonGeometry < Geometry
     *
     * Physics.geometry('convex-polygon')
     *
     * Geometry for convex polygons.
     *
     * Additional config options:
     *
     * - vertices: Array of [[Vectorish]] objects representing the polygon vertices in clockwise (or counterclockwise) order.
     *
     * Example:
     *
     * ```javascript
     * var pentagon = Physics.geometry('convex-polygon', {
     *     // the centroid is automatically calculated and used to position the shape
     *     vertices: [
     *         { x: 0, y: -30 },
     *         { x: -29, y: -9 },
     *         { x: -18, y: 24 },
     *         { x: 18, y: 24 },
     *         { x: 29, y: -9 }
     *     ]
     * });
     * ```
     **/
    Physics.geometry('convex-polygon', function( parent ){
    
        var ERROR_NOT_CONVEX = 'Error: The vertices specified do not match that of a _convex_ polygon.';
    
        var defaults = {
    
        };
    
        return {
    
            // extended
            init: function( options ){
    
                var self = this;
    
                // call parent init method
                parent.init.call(this, options);
    
                this.options.defaults( defaults );
                this.options.onChange(function( opts ){
                    self.setVertices( opts.vertices || [] );
                });
                this.options( options );
    
                self.setVertices( this.options.vertices || [] );
    
            },
    
            /**
             * ConvexPolygonGeometry#setVertices( hull ) -> this
             * - hull (Array): Vertices represented by an array of [[Vectorish]] objects, in either clockwise or counterclockwise order
             *
             * Set the vertices of this polygon.
             **/
            setVertices: function( hull ){
    
                var scratch = Physics.scratchpad()
                    ,transl = scratch.transform()
                    ,verts = this.vertices = []
                    ;
    
                if ( !Physics.geometry.isPolygonConvex( hull ) ){
                    throw ERROR_NOT_CONVEX;
                }
    
                transl.setRotation( 0 );
                transl.setTranslation( Physics.geometry.getPolygonCentroid( hull ).negate() );
    
                // translate each vertex so that the centroid is at the origin
                // then add the vertex as a vector to this.vertices
                for ( var i = 0, l = hull.length; i < l; ++i ){
    
                    verts.push( new Physics.vector( hull[ i ] ).translate( transl ) );
                }
    
                this._area = Physics.geometry.getPolygonArea( verts );
                this._aabb = false;
                return scratch.done(this);
            },
    
            // extended
            aabb: function( angle ){
    
                if (!angle && this._aabb){
                    return Physics.aabb.clone( this._aabb );
                }
    
                var scratch = Physics.scratchpad()
                    ,p = scratch.vector()
                    ,trans = scratch.transform().setRotation( angle || 0 )
                    ,xaxis = scratch.vector().set( 1, 0 ).rotateInv( trans )
                    ,yaxis = scratch.vector().set( 0, 1 ).rotateInv( trans )
                    ,xmax = this.getFarthestHullPoint( xaxis, p ).proj( xaxis )
                    ,xmin = - this.getFarthestHullPoint( xaxis.negate(), p ).proj( xaxis )
                    ,ymax = this.getFarthestHullPoint( yaxis, p ).proj( yaxis )
                    ,ymin = - this.getFarthestHullPoint( yaxis.negate(), p ).proj( yaxis )
                    ,aabb
                    ;
    
                aabb = Physics.aabb( xmin, ymin, xmax, ymax );
    
                if (!angle){
                    // if we don't have an angle specified (or it's zero)
                    // then we can cache this result
                    this._aabb = Physics.aabb.clone( aabb );
                }
    
                scratch.done();
                return aabb;
            },
    
            // extended
            getFarthestHullPoint: function( dir, result, data ){
    
                var verts = this.vertices
                    ,val
                    ,prev
                    ,l = verts.length
                    ,i = 2
                    ,idx
                    ;
    
                result = result || new Physics.vector();
    
                if ( l < 2 ){
                    if ( data ){
                        data.idx = 0;
                    }
                    return result.clone( verts[0] );
                }
    
                prev = verts[ 0 ].dot( dir );
                val = verts[ 1 ].dot( dir );
    
                if ( l === 2 ){
                    idx = (val >= prev) ? 1 : 0;
                    if ( data ){
                        data.idx = idx;
                    }
                    return result.clone( verts[ idx ] );
                }
    
                if ( val >= prev ){
                    // go up
                    // search until the next dot product
                    // is less than the previous
                    while ( i < l && val >= prev ){
                        prev = val;
                        val = verts[ i ].dot( dir );
                        i++;
                    }
    
                    if (val >= prev){
                        i++;
                    }
    
                    // return the previous (furthest with largest dot product)
                    idx = i - 2;
                    if ( data ){
                        data.idx = i - 2;
                    }
                    return result.clone( verts[ idx ] );
    
                } else {
                    // go down
    
                    i = l;
                    while ( i > 1 && prev >= val ){
                        i--;
                        val = prev;
                        prev = verts[ i ].dot( dir );
                    }
    
                    // return the previous (furthest with largest dot product)
                    idx = (i + 1) % l;
                    if ( data ){
                        data.idx = idx;
                    }
                    return result.clone( verts[ idx ] );
                }
            },
    
            // extended
            getFarthestCorePoint: function( dir, result, margin ){
    
                var norm
                    ,scratch = Physics.scratchpad()
                    ,next = scratch.vector()
                    ,prev = scratch.vector()
                    ,verts = this.vertices
                    ,l = verts.length
                    ,mag
                    ,sign = this._area > 0
                    ,data = {}
                    ;
    
                result = this.getFarthestHullPoint( dir, result, data );
    
                // get normalized directions to next and previous vertices
                next.clone( verts[ (data.idx + 1) % l ] ).vsub( result ).normalize().perp( sign );
                prev.clone( verts[ (data.idx - 1 + l) % l ] ).vsub( result ).normalize().perp( !sign );
    
                // get the magnitude of a vector from the result vertex
                // that splits down the middle
                // creating a margin of "m" to each edge
                mag = margin / (1 + next.dot(prev));
    
                result.vadd( next.vadd( prev ).mult( mag ) );
                scratch.done();
                return result;
            }
        };
    });
    
    // end module: geometries/convex-polygon.js
    return Physics;
}));// UMD