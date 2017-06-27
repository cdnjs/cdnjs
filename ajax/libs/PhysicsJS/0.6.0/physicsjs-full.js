/**
 * PhysicsJS v0.6.0 - 2014-04-22
 * A modular, extendable, and easy-to-use physics engine for javascript
 * http://wellcaffeinated.net/PhysicsJS
 *
 * Copyright (c) 2014 Jasper Palfree <jasper@wellcaffeinated.net>
 * Licensed MIT
 */

// ---
// inside: src/intro.js

(function (root, factory) {
    if (typeof exports === 'object') {
        // Node.
        module.exports = factory.call(root);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function(){ return factory.call(root) });
    } else {
        // Browser globals (root is window)
        root.Physics = factory.call(root);
    }
}(this, function () {

'use strict';

var window = this;
var document = window.document;

/** related to: Physics.world
 * Physics
 *
 * The top-level namespace. All of PhysicsJS is contained in
 * the `Physics` namespace.
 *
 * It may (and should) be invoked as a function to create a world instance. For all intensive purposes, [[Physics]] and [[Physics.world]] are the same thing.
 *
 * See [[new Physics.world]] for config options and function signature.
 *
 * Example:
 *
 * ```javascript
 * Physics( cfg, function( world ) {
 *     // use world
 * }); // -> world
 * ```
 **/
var Physics = function Physics(){

    return Physics.world.apply(Physics, arguments);
};

/**
 * Physics.util
 *
 * Namespace for utility functions.
 **/
Physics.util = {};

/**
 * == Special ==
 *
 * This section contains miscellaneous functionality.
 **/


// ---
// inside: src/math/aabb.js

(function(){

    /**
     * Physics.aabb( minX, minY, maxX, maxY ) -> Object
     * Physics.aabb( pt1, pt2 ) -> Object
     * Physics.aabb( width, height[, pt] ) -> Object
     * - minX (Number): The x coord of the "top left" point
     * - minY (Number): The y coord of the "top left" point
     * - maxX (Number): The x coord of the "bottom right" point
     * - maxY (Number): The y coord of the "bottom right" point
     * - pt1 (Vectorish): The first corner
     * - pt2 (Vectorish): The opposite corner
     * - width (Number): The width of the bounding box
     * - height (Number): The height of the bounding box
     * - pt (Vectorish): The center point of the bounding box
     *
     * Create an Axis Aligned Bounding Box.
     *
     * Signature:
     *
     * ```javascript
     * {
     *     x: Number, // the x coord of the center point
     *     y: Number, // the y coord of the center point
     *     hw: Number, // the half-width
     *     hh: Number, // the half-height
     * }
     * ```
     **/
    Physics.aabb = function( minX, minY, maxX, maxY ){

        var aabb = { x: 0, y: 0, hw: 0, hh: 0 };

        if ( minX === undefined ){
            return aabb;
        }

        if ( minX && minX.x !== undefined ){
            // we have a point specified as first arg
            maxX = minY.x;
            maxY = minY.y;
            minY = minX.y;
            minX = minX.x;
        }

        if ( maxY === undefined && minX !== undefined && minY !== undefined ){

            aabb.hw = minX * 0.5;
            aabb.hh = minY * 0.5;

            if ( maxX && maxX.x !== undefined ){
                // we have a point specified as the third arg
                // so we assume it's the center point
                aabb.x = maxX.x;
                aabb.y = maxX.y;
            }

            return aabb;
        }

        // here, we should have all the arguments as numbers
        aabb.hw = Math.abs(maxX - minX) * 0.5;
        aabb.hh = Math.abs(maxY - minY) * 0.5;
        aabb.x = (maxX + minX) * 0.5;
        aabb.y = (maxY + minY) * 0.5;

        return aabb;
    };

    /**
     * Physics.aabb.contains( aabb, pt ) -> Boolean
     * - aabb (Object): The aabb
     * - pt (Vectorish): The point
     * + (Boolean): `true` if `pt` is inside `aabb`, `false` otherwise
     *
     * Check if a point is inside an aabb.
     **/
    Physics.aabb.contains = function contains( aabb, pt ){

        return  (pt.x > (aabb.x - aabb.hw)) &&
                (pt.x < (aabb.x + aabb.hw)) &&
                (pt.y > (aabb.y - aabb.hh)) &&
                (pt.y < (aabb.y + aabb.hh));
    };

    /**
     * Physics.aabb.clone( aabb ) -> Object
     * - aabb (Object): The aabb to clone
     * + (Object): The clone
     *
     * Clone an aabb.
     **/
    Physics.aabb.clone = function( aabb ){
        return {
            x: aabb.x,
            y: aabb.y,
            hw: aabb.hw,
            hh: aabb.hh
        };
    };

    /**
     * Physics.aabb.overlap( aabb1, aabb2 ) -> Boolean
     * - aabb1 (Object): The first aabb
     * - aabb2 (Object): The second aabb
     * + (Boolean): `true` if they overlap, `false` otherwise
     *
     * Check if two AABBs overlap.
     **/
    Physics.aabb.overlap = function( aabb1, aabb2 ){

        var min1 = aabb1.x - aabb1.hw
            ,min2 = aabb2.x - aabb2.hw
            ,max1 = aabb1.x + aabb1.hw
            ,max2 = aabb2.x + aabb2.hw
            ;

        // first check x-axis

        if ( (min2 <= max1 && max1 <= max2) || (min1 <= max2 && max2 <= max1) ){
            // overlap in x-axis
            // check y...
            min1 = aabb1.y - aabb1.hh;
            min2 = aabb2.y - aabb2.hh;
            max1 = aabb1.y + aabb1.hh;
            max2 = aabb2.y + aabb2.hh;

            return (min2 <= max1 && max1 <= max2) || (min1 <= max2 && max2 <= max1);
        }

        // they don't overlap
        return false;
    };

}());


// ---
// inside: src/math/gjk.js

(function(){

    // the algorithm doesn't always converge for curved shapes.
    // need these constants to dictate how accurate we want to be.
    var gjkAccuracy = 0.0001;
    var gjkMaxIterations = 100;

    // get the next search direction from two simplex points
    var getNextSearchDir = function getNextSearchDir( ptA, ptB, dir ){

        var ABdotB = ptB.normSq() - ptB.dot( ptA )
            ,ABdotA = ptB.dot( ptA ) - ptA.normSq()
            ;

        // if the origin is farther than either of these points
        // get the direction from one of those points to the origin
        if ( ABdotB < 0 ){

            return dir.clone( ptB ).negate();

        } else if ( ABdotA > 0 ){

            return dir.clone( ptA ).negate();

        // otherwise, use the perpendicular direction from the simplex
        } else {

            // dir = AB = B - A
            dir.clone( ptB ).vsub( ptA );
            // if (left handed coordinate system)
            // A cross AB < 0 then get perpendicular counterclockwise
            return dir.perp( (ptA.cross( dir ) > 0) );
        }
    };

    /** hide
     * getClosestPoints( simplex ) -> Object
     * - simplex (Array): The simplex
     *
     * Figure out the closest points on the original objects
     * from the last two entries of the simplex
     **/
    var getClosestPoints = function getClosestPoints( simplex ){

        // see http://www.codezealot.org/archives/153
        // for algorithm details

        // we know that the position of the last point
        // is very close to the previous. (by nature of the distance test)
        // this won't give great results for the closest
        // points algorithm, so let's use the previous two
        var len = simplex.length
            ,last = simplex[ len - 2 ]
            ,prev = simplex[ len - 3 ]
            ,scratch = Physics.scratchpad()
            ,A = scratch.vector().clone( last.pt )
            // L = B - A
            ,L = scratch.vector().clone( prev.pt ).vsub( A )
            ,lambdaB
            ,lambdaA
            ;

        if ( L.equals(Physics.vector.zero) ){

            // oh.. it's a zero vector. So A and B are both the closest.
            // just use one of them
            return scratch.done({

                a: last.a,
                b: last.b
            });
        }

        lambdaB = - L.dot( A ) / L.normSq();
        lambdaA = 1 - lambdaB;

        if ( lambdaA <= 0 ){
            // woops.. that means the closest simplex point
            // isn't on the line it's point B itself
            return scratch.done({
                a: prev.a,
                b: prev.b
            });
        } else if ( lambdaB <= 0 ){
            // vice versa
            return scratch.done({
                a: last.a,
                b: last.b
            });
        }

        // guess we'd better do the math now...
        return scratch.done({
            // a closest = lambdaA * Aa + lambdaB * Ba
            a: A.clone( last.a ).mult( lambdaA ).vadd( L.clone( prev.a ).mult( lambdaB ) ).values(),
            // b closest = lambdaA * Ab + lambdaB * Bb
            b: A.clone( last.b ).mult( lambdaA ).vadd( L.clone( prev.b ).mult( lambdaB ) ).values()
        });
    };

    /**
     * Physics.gjk( support(axis)[, seed, checkOverlapOnly, debugFn] ) -> Object
     * - support (Function): The support function. Must return an object containing
       the witness points (`.a`, `.b`) and the support point (`.pt`).
       Recommended to use simple objects.
       Eg:
       ```javascript
       return {
            a: { x: 1, y:2 },
            b: { x: 3, y: 4 },
            pt: { x: 2, y: 2 }
       };
       ```
     * - axis (Physics.vector): The axis to search
     * - seed (Physics.vector): The starting direction for the simplex (defaults to x-axis)
     * - checkOverlapOnly (Boolean): only check whether there is an overlap, don't calculate the depth
     * - debugFn (Function): For debugging. Called at every iteration with the current simplex.
     *
     * Implementation agnostic GJK function.
     *
     * Gilbert–Johnson–Keerthi object collison algorithm
     * For general information about GJK see:
     * - [www.codezealot.org/archives/88](http://www.codezealot.org/archives/88)
     * - [mollyrocket.com/849](http://mollyrocket.com/849)
     *
     * The algorithm information returned:
     * ```javascript
     * {
     *     overlap: Boolean,
     *     simplex: [] // array containing simplex points as simple x/y objects
     * }
     * ```
     **/
    var gjk = function gjk( support, seed, checkOverlapOnly, debugFn ){

        var overlap = false
            ,noOverlap = false // if we're sure we're not overlapping
            ,distance = false
            ,simplex = []
            ,simplexLen = 1
            // setup a scratchpad of temporary cheap objects
            ,scratch = Physics.scratchpad()
            // use seed as starting direction or use x axis
            ,dir = scratch.vector().clone(seed || Physics.vector.axis[ 0 ])
            ,last = scratch.vector()
            ,lastlast = scratch.vector()
            // some temp vectors
            ,v1 = scratch.vector()
            ,v2 = scratch.vector()
            ,ab
            ,ac
            ,sign
            ,tmp
            ,iterations = 0
            ;

        // get the first Minkowski Difference point
        tmp = support( dir );
        simplexLen = simplex.push( tmp );
        last.clone( tmp.pt );
        // negate d for the next point
        dir.negate();

        // start looping
        while ( ++iterations ) {

            // swap last and lastlast, to save on memory/speed
            last.swap(lastlast);
            // push a new point to the simplex because we haven't terminated yet
            tmp = support( dir );
            simplexLen = simplex.push( tmp );
            last.clone( tmp.pt );

            if ( debugFn ){
                debugFn( simplex );
            }

            if ( last.equals(Physics.vector.zero) ){
                // we happened to pick the origin as a support point... lucky.
                overlap = true;
                break;
            }

            // check if the last point we added actually passed the origin
            if ( !noOverlap && last.dot( dir ) <= 0.0 ) {
                // if the point added last was not past the origin in the direction of d
                // then the Minkowski difference cannot possibly contain the origin since
                // the last point added is on the edge of the Minkowski Difference

                // if we just need the overlap...
                if ( checkOverlapOnly ){
                    break;
                }

                noOverlap = true;
            }

            // if it's a line...
            if ( simplexLen === 2 ){

                // otherwise we need to determine if the origin is in
                // the current simplex and act accordingly

                dir = getNextSearchDir( last, lastlast, dir );
                // continue...

            // if it's a triangle... and we're looking for the distance
            } else if ( noOverlap ){

                // if we know there isn't any overlap and
                // we're just trying to find the distance...
                // make sure we're getting closer to the origin
                dir.normalize();
                tmp = lastlast.dot( dir );
                if ( Math.abs(tmp - last.dot( dir )) < gjkAccuracy ){

                    distance = -tmp;
                    break;
                }

                // if we are still getting closer then only keep
                // the points in the simplex that are closest to
                // the origin (we already know that last is closer
                // than the previous two)
                // the norm is the same as distance(origin, a)
                // use norm squared to avoid the sqrt operations
                if (lastlast.normSq() < v1.clone(simplex[ 0 ].pt).normSq()) {

                    simplex.shift();

                } else {

                    simplex.splice(1, 1);
                }

                dir = getNextSearchDir( v1.clone(simplex[ 1 ].pt), v2.clone(simplex[ 0 ].pt), dir );
                // continue...

            // if it's a triangle
            } else {

                // we need to trim the useless point...

                ab = ab || scratch.vector();
                ac = ac || scratch.vector();

                // get the edges AB and AC
                ab.clone( lastlast ).vsub( last );
                ac.clone( simplex[ 0 ].pt ).vsub( last );

                // here normally people think about this as getting outward facing
                // normals and checking dot products. Since we're in 2D
                // we can be clever...
                sign = ab.cross( ac ) > 0;

                if ( sign ^ (last.cross( ab ) > 0) ){

                    // ok... so there's an XOR here... don't freak out
                    // remember last = A = -AO
                    // if AB cross AC and AO cross AB have the same sign
                    // then the origin is along the outward facing normal of AB
                    // so if AB cross AC and A cross AB have _different_ (XOR) signs
                    // then this is also the case... so we proceed...

                    // point C is dead to us now...
                    simplex.shift();

                    // if we haven't deduced that we've enclosed the origin
                    // then we know which way to look...
                    // morph the ab vector into its outward facing normal
                    ab.perp( !sign );

                    // swap
                    dir.swap( ab );

                    // continue...

                    // if we get to this if, then it means we can continue to look along
                    // the other outward normal direction (ACperp)
                    // if we don't see the origin... then we must have it enclosed
                } else if ( sign ^ (ac.cross( last ) > 0) ){
                    // then the origin is along the outward facing normal
                    // of AC; (ACperp)

                    // point B is dead to us now...
                    simplex.splice(1, 1);

                    ac.perp( sign );

                    // swap
                    dir.swap( ab );

                    // continue...

                } else {

                    // we have enclosed the origin!
                    overlap = true;
                    // fewf... take a break
                    break;
                }
            }

            // woah nelly... that's a lot of iterations.
            // Stop it!
            if (iterations > gjkMaxIterations){
                scratch.done();
                return {
                    simplex: simplex,
                    iterations: iterations,
                    distance: 0,
                    maxIterationsReached: true
                };
            }
        }

        // free workspace
        scratch.done();

        tmp = {
            overlap: overlap,
            simplex: simplex,
            iterations: iterations
        };

        if ( distance !== false ){

            tmp.distance = distance;
            tmp.closest = getClosestPoints( simplex );
        }

        return tmp;
    };

    Physics.gjk = gjk;

})();


// ---
// inside: src/math/transform.js

(function(){
    
    /**
     * class Physics.transform
     * 
     * Vector Transformations class for rotating and translating vectors
     **/

    /**
     * new Physics.transform( [vect, angle, origin] )
     * new Physics.transform( transform )
     * - vect (Vectorish): Translation vector
     * - transform (Physics.transform): Transform to copy
     * - angle (Number): Angle (radians) to use for rotation
     * - origin (Vectorish): Origin of the rotation
     * 
     * Transform Constructor / Factory
     **/
    var Transform = function Transform( vect, angle, origin ) {

        if (!(this instanceof Transform)){
            return new Transform( vect, angle );
        }

        this.v = Physics.vector();
        this.o = Physics.vector(); // origin of rotation
        
        if ( vect instanceof Transform ){

            this.clone( vect );
            return;
        }

        if (vect){
            this.setTranslation( vect );
        }

        this.setRotation( angle || 0, origin );
    };

    /**
     * Physics.transform#setTranslation( vect ) -> this
     * - vect (Vectorish): The translation vector
     * 
     * Set the translation portion of the transform.
     **/
    Transform.prototype.setTranslation = function( vect ){

        this.v.clone( vect );
        return this;
    };

    /**
     * Physics.transform#setRotation( angle[, origin ] ) -> this
     * - angle (Number): Angle (radians) to use for rotation
     * - origin (Vectorish): Origin of the rotation
     *
     * Set the rotation portion of the transform
     **/
    Transform.prototype.setRotation = function( angle, origin ){

        this.cosA = Math.cos( angle );
        this.sinA = Math.sin( angle );

        if ( origin ){
            this.o.clone( origin );
        } else {
            this.o.zero();
        }

        return this;
    };

    /**
     * Physics.transform#clone( [transform] ) -> this|Physics.transform
     * - transform (Physics.transform): Transform to copy
     * + (this): For chaining
     * + (Physics.transform): New copy of `this` if none is specified as an argument
     * 
     * Clone another transform. Or clone self into new transform.
     **/
    Transform.prototype.clone = function( t ){

        if ( t ){

            this.setTranslation( t.v );
            this.cosA = t.cosA;
            this.sinA = t.sinA;
            this.o.clone( t.o );

            return this;
        }

        return new Transform( this );
    };

    Physics.transform = Transform;

})();

// ---
// inside: src/math/vector.js

(function(window){

    // http://jsperf.com/vector-storage-test/2

    // cached math functions
    // TODO: might be faster not to do this???
    var sqrt = Math.sqrt
        ,min = Math.min
        ,max = Math.max
        ,acos = Math.acos
        ,atan2 = Math.atan2
        ,TWOPI = Math.PI * 2
        ,typedArrays = !!window.Float64Array
        ;

    /** 
     * class Physics.vector
     * 
     * The vector class and factory function.
     *
     * Call `Physics.vector` with the same arguments as
     * [[new Physics.vector]] to create an instance.
     *
     * The vector methods mostly modify the vector instance.
     * This makes computations faster because creating vectors
     * is avoided.
     *
     * Creating vectors is generally an expensive operation
     * so try to avoid doing this in the simulation loop.
     * Instead you can use [[Physics.scratchpad]] to get
     * temporary vectors for use in performance critical
     * code.
     *
     * _Note_: The coordinate system is left-handed, meaning that
     * the clockwise angular direction is positive. This has implications
     * for the cross-product rule.
     **/

    /** section: Special
     * class Vectorish
     *
     * Any object with `.x` and `.y` properties.
     *
     * A `Vectorish` isn't really a class. In this documentation, when
     * an argument is specified as a `Vectorish` it means either a true
     * [[Physics.vector]] instance, or an object literal with `.x` and `.y`
     * properties.
     **/

    /**
     * new Physics.vector( x, y )
     * new Physics.vector( vect )
     * - x (Number): The x coordinate
     * - y (Number): The y coordinate
     * - vect (Vectorish): A vector-like object to clone
     * 
     * Vector Constructor.
     **/
    var Vector = function Vector( x, y ) {

        // enforce instantiation
        if ( !(this instanceof Vector) ){

            return new Vector( x, y );
        }

        // arrays to store values
        // x = _[0]
        // y = _[1]
        // norm = _[3]
        // normsq = _[4]

        /** internal
         * Physics.vector#_
         *
         * Private storage array for data.
         *
         * Do not access this directly. Private. Keep out.
         **/
        if (typedArrays){
            this._ = new Float64Array(5);
        } else {
            this._ = [];
        }

        if (x && (x.x !== undefined || x._ && x._.length)){

            this.clone( x );

        } else {

            this.recalc = true; //whether or not recalculate norms
            this.set( x, y );
        }
    };

    Object.defineProperties( Vector.prototype, {
        /** 
         * Physics.vector#x
         * 
         * Getter/setter property for the x coordinate.
         **/
        x: {
            get: function(){
                return +this._[0];
            },
            set: function( x ){
                x = +x || 0;
                this.recalc = ( x === this._[0] );
                this._[0] = x;
            }
        },
        /** 
         * Physics.vector#y
         * 
         * Getter/setter property for the y coordinate.
         **/
        y: {
            get: function(){
                return +this._[1];
            },
            set: function( y ){
                y = +y || 0;
                this.recalc = ( y === this._[1] );
                this._[1] = y;
            }
        }
    });

    // 
    // Methods
    // 

    /**
     * Physics.vector#set( x, y ) -> this
     * - x (Number): x coordinate
     * - y (Number): y coordinate
     * 
     * Sets the x and y components of this vector.
     **/
    Vector.prototype.set = function( x, y ) {

        this.recalc = true;

        this._[0] = +x || 0;
        this._[1] = +y || 0;
        return this;
    };

    /** deprecated: 0.6.0..1.0.0
     * Physics.vector#get( idx ) -> Number
     * - idx (Number): The coordinate index (0 or 1)
     * 
     * Get the x or y component by index.
     **/
    Vector.prototype.get = function( n ){

        return this._[ n ];
    };

    /**
     * Physics.vector#vadd( v ) -> this
     * - v (Physics.vector): vector to add
     * 
     * Add a [[Physics.vector]] to `this`.
     **/
    Vector.prototype.vadd = function( v ) {

        this.recalc = true;

        this._[0] += v._[0];
        this._[1] += v._[1];
        return this;
    };

    /**
     * Physics.vector#vsub( v ) -> this
     * - v (Physics.vector): vector to subtract
     * 
     * Subtract a [[Physics.vector]] from `this`.
     **/
    Vector.prototype.vsub = function( v ) {

        this.recalc = true;

        this._[0] -= v._[0];
        this._[1] -= v._[1];
        return this;
    };

    /**
     * Physics.vector#add( x, y ) -> this
     * - x (Number): amount to add to the x coordinate
     * - y (Number): amount to add to the y coordinate
     * 
     * Add scalars [[Physics.vector]] to the coordinates.
     **/
    Vector.prototype.add = function( x, y ){
        
        this.recalc = true;

        this._[0] += +x || 0;
        this._[1] += +y || 0;
        return this;
    };

    /**
     * Physics.vector#sub( x, y ) -> this
     * - x (Number): amount to subtract from the x coordinate
     * - y (Number): amount to subtract from the y coordinate
     * 
     * Subtract scalars [[Physics.vector]] from the coordinates.
     **/
    Vector.prototype.sub = function( x, y ){
        
        this.recalc = true;

        this._[0] -= x;
        this._[1] -= y === undefined? 0 : y;
        return this;
    };

    /**
     * Physics.vector#mult( m ) -> this
     * - m (Number): amount to multiply this vector by
     * 
     * Multiply this by a scalar quantity.
     *
     * Same as scaling the vector by an amount `m`.
     **/
    Vector.prototype.mult = function( m ) {
        
        if ( !this.recalc ){

            this._[4] *= m * m;
            this._[3] *= m;
        }

        this._[0] *= m;
        this._[1] *= m;
        return this;
    };

    /** 
     * Physics.vector#dot( v ) -> Number
     * - v (Physics.vector): The other vector
     * 
     * Compute the dot product of this vector with `v`.
     **/
    Vector.prototype.dot = function( v ) {

        return (this._[0] * v._[0]) + (this._[1] * v._[1]);
    };

    /** 
     * Physics.vector#cross( v ) -> Number
     * - v (Physics.vector): The other vector
     * 
     * Compute the (left-handed) cross product of this vector with `v`.
     **/
    Vector.prototype.cross = function( v ) {

        return ( - this._[0] * v._[1]) + (this._[1] * v._[0]);
    };

    /**
     * Physics.vector#proj( v ) -> Number
     * - v (Physics.vector): The other vector
     * 
     * Compute the [scalar projection](http://en.wikipedia.org/wiki/Vector_projection#Scalar_projection_2) of this along `v`.
     **/
    Vector.prototype.proj = function( v ){

        return this.dot( v ) / v.norm();
    };


    /**
     * Physics.vector#vproj( v ) -> this
     * - v (Physics.vector): The other vector
     * 
     * Compute the [vector projection](http://en.wikipedia.org/wiki/Vector_projection#Vector_projection_2) of this along `v` and copy the result into this vector.
     **/
    Vector.prototype.vproj = function( v ){

        var m = this.dot( v ) / v.normSq();
        return this.clone( v ).mult( m );
    };

    /**
     * Physics.vector#angle( [v] ) -> Number
     * - v (Physics.vector): The other vector
     * + (Number): The angle in radians between this vector and the x-axis OR `v` if specified
     * 
     * Compute the angle between `this` and vector `v` or this and x axis.
     **/
    Vector.prototype.angle = function( v ){

        var ang;

        if ( this.equals( Vector.zero ) ){
            
            if ( v ){
                return v.angle();
            } else {
                return NaN;
            }

        } else {

            if ( v && !v.equals( Vector.zero ) ){
                ang = atan2( this._[1] * v._[0] - this._[0] * v._[1], this._[0] * v._[0] + this._[1] * v._[1]);
            } else {
                ang = atan2( this._[ 1 ], this._[ 0 ] );    
            }
        }
        
        while (ang > Math.PI){
            ang -= TWOPI;
        }

        while (ang < -Math.PI){
            ang += TWOPI;
        }

        return ang;
    };

    /**
     * Physics.vector#angle2( left, right ) -> Number
     * - left (Physics.vector): The position on the left
     * - right (Physics.vector): The position on the right
     * 
     * Compute the angle created between three points; left -> this -> right.
     **/
    Vector.prototype.angle2 = function( left, right ){

        var x1 = left._[0] - this._[0]
            ,y1 = left._[1] - this._[1]
            ,x2 = right._[0] - this._[0]
            ,y2 = right._[1] - this._[1]
            ,ang = atan2( y1 * x2 - x1 * y2, x1 * x2 + y1 * y2)
            ;

        while (ang > Math.PI){
            ang -= TWOPI;
        }

        while (ang < -Math.PI){
            ang += TWOPI;
        }

        return ang;
    };

    /**
     * Physics.vector#norm() -> Number
     * 
     * Compute the norm (length) of this vector.
     **/
    Vector.prototype.norm = function() {

        if (this.recalc){
            this.recalc = false;
            this._[4] = (this._[0] * this._[0] + this._[1] * this._[1]);
            this._[3] = sqrt( this._[4] );
        }
        
        return this._[3];
    };

    /**
     * Physics.vector#normSq() -> Number
     * 
     * Compute the norm (length) squared of this vector.
     **/
    Vector.prototype.normSq = function() {

        if (this.recalc){
            this.recalc = false;
            this._[4] = (this._[0] * this._[0] + this._[1] * this._[1]);
            this._[3] = sqrt( this._[4] );
        }

        return this._[4];
    };

    /**
     * Physics.vector#dist( v ) -> Number
     * - v (Physics.vector): The other vector
     * 
     * Compute the distance from this vector to another vector `v`.
     **/
    Vector.prototype.dist = function( v ) {
      
        var dx, dy;
        return sqrt(
            (dx = (v._[0] - this._[0])) * dx + 
            (dy = (v._[1] - this._[1])) * dy
        );
    };

    /**
     * Physics.vector#distSq( v ) -> Number
     * - v (Physics.vector): The other vector
     * 
     * Compute the distance squared from this vector to another vector `v`.
     **/
    Vector.prototype.distSq = function( v ) {

        var dx, dy;
        return (
            (dx = (v._[0] - this._[0])) * dx + 
            (dy = (v._[1] - this._[1])) * dy
        );
    };

    /**
     * Physics.vector#perp( [ccw] ) -> this
     * - ccw (Boolean): flag to indicate that we should rotate counterclockwise
     * 
     * Change this vector into a vector that will be perpendicular.
     *
     * In other words, rotate by (+-) 90 degrees.
     **/
    Vector.prototype.perp = function( ccw ) {

        var tmp = this._[0]
            ;

        if ( ccw ){

            // x <-> y
            // negate y
            this._[0] = this._[1];
            this._[1] = -tmp;

        } else {

            // x <-> y
            // negate x
            this._[0] = -this._[1];
            this._[1] = tmp;
        }

        return this;
    };

    /**
     * Physics.vector#normalize() -> this
     * 
     * Normalise this vector, making it a unit vector.
     **/
    Vector.prototype.normalize = function() {

        var m = this.norm();

        // means it's a zero Vector
        if ( m === 0 ){
            return this;
        }

        m = 1/m;

        this._[0] *= m;
        this._[1] *= m;

        this._[3] = 1.0;
        this._[4] = 1.0;

        return this;
    };

    /**
     * Physics.vector#transform( t ) -> this
     * - t (Physics.transform): The transformation to apply
     * 
     * Apply a [[Physics.transform]] to this vector.
     **/
    Vector.prototype.transform = function( t ){

        var sinA = t.sinA
            ,cosA = t.cosA
            ,x = t.o._[ 0 ]
            ,y = t.o._[ 1 ]
            ;

        this._[ 0 ] -= x;
        this._[ 1 ] -= y;

        // rotate about origin "o" then translate
        return this.set(
            this._[ 0 ] * cosA - this._[ 1 ] * sinA + x + t.v._[ 0 ], 
            this._[ 0 ] * sinA + this._[ 1 ] * cosA + y + t.v._[ 1 ]
        );
    };

    /**
     * Physics.vector#transformInv( t ) -> this
     * - t (Physics.transform): The transformation to apply the inverse of
     * 
     * Apply an inverse [[Physics.transform]] to this vector.
     **/
    Vector.prototype.transformInv = function( t ){

        var sinA = t.sinA
            ,cosA = t.cosA
            ,x = t.o._[ 0 ]
            ,y = t.o._[ 1 ]
            ;

        this._[ 0 ] -= x + t.v._[ 0 ];
        this._[ 1 ] -= y + t.v._[ 1 ];

        // inverse translate then inverse rotate about origin "o"
        return this.set(
            this._[ 0 ] * cosA + this._[ 1 ] * sinA + x, 
            - this._[ 0 ] * sinA + this._[ 1 ] * cosA + y
        );
    };

    /**
     * Physics.vector#rotate( t ) -> this
     * Physics.vector#rotate( ang[, o] ) -> this
     * - t (Physics.transform): The transformation to apply the rotational part of
     * - ang (Number): The angle (in radians), to rotate by
     * - o (Vectorish): The point of origin of the rotation
     * 
     * Rotate this vector.
     * 
     * An angle and rotation origin can be specified, 
     * or a transform can be specified and only the rotation
     * portion of that transform will be applied
     **/
    Vector.prototype.rotate = function( t, o ){

        var sinA
            ,cosA
            ,x = 0
            ,y = 0
            ;

        if ( typeof t === 'number' ){
            sinA = Math.sin( t );
            cosA = Math.cos( t );

            if ( o ){
                x = (o.x || o._[ 0 ]) | 0;
                y = (o.y || o._[ 1 ]) | 0;
            }
        } else {
            sinA = t.sinA;
            cosA = t.cosA;
        
            x = t.o._[ 0 ];
            y = t.o._[ 1 ];
        }
            
        this._[ 0 ] -= x;
        this._[ 1 ] -= y;

        return this.set(
            this._[ 0 ] * cosA - this._[ 1 ] * sinA + x, 
            this._[ 0 ] * sinA + this._[ 1 ] * cosA + y
        );
    };

    /**
     * Physics.vector#rotateInv( t ) -> this
     * - t (Physics.transform): The transformation to apply the inverse rotational part of
     * 
     * Apply the inverse rotation of a transform.
     * 
     * Only the inverse rotation portion of 
     * that transform will be applied.
     **/
    Vector.prototype.rotateInv = function( t ){

        return this.set(
            (this._[ 0 ] - t.o._[ 0 ]) * t.cosA + (this._[ 1 ] - t.o._[ 1 ]) * t.sinA + t.o._[ 0 ], 
            -(this._[ 0 ] - t.o._[ 0 ]) * t.sinA + (this._[ 1 ] - t.o._[ 1 ]) * t.cosA + t.o._[ 1 ]
        );
    };

    /**
     * Physics.vector#translate( t ) -> this
     * - t (Physics.transform): The transformation to apply the translational part of
     * 
     * Apply the translation of a transform.
     * 
     * Only the translation portion of 
     * that transform will be applied.
     **/
    Vector.prototype.translate = function( t ){

        return this.vadd( t.v );
    };

    /**
     * Physics.vector#translateInv( t ) -> this
     * - t (Physics.transform): The transformation to apply the inverse translational part of
     * 
     * Apply the inverse translation of a transform.
     * 
     * Only the inverse translation portion of 
     * that transform will be applied.
     **/
    Vector.prototype.translateInv = function( t ){

        return this.vsub( t.v );
    };


    /**
     * Physics.vector#clone( [v] ) -> this|Physics.vector
     * - v (Vectorish): The vector-like object to clone
     * + (this): If `v` is specified as an argument
     * + (Physics.vector): A new vector instance that clones this vector, if no argument is specified
     * 
     * Create a clone of this vector, or clone another vector into this instance.
     *
     * This is especially useful in vector algorithms 
     * that use temporary vectors (which most should).
     * You can create temporary vectors and then do things like...
     * ```
     * temp.clone( otherVector );
     * // compute things with temp...
     * // then save the result
     * result.clone( tmp );
     * ```
     **/
    Vector.prototype.clone = function( v ) {
        
        // http://jsperf.com/vector-storage-test

        if ( v ){

            if (!v._){

                return this.set( v.x, v.y );
            }
            
            this.recalc = v.recalc;

            if (!v.recalc){
                this._[3] = v._[3];
                this._[4] = v._[4];
            }

            this._[0] = v._[0];
            this._[1] = v._[1];

            return this;
        }

        return new Vector( this );
    };

    /**
     * Physics.vector#swap( v ) -> this
     * - v (Physics.vector): The other vector
     * 
     * Swap values with other vector.
     **/
    Vector.prototype.swap = function( v ){

        var _ = this._;
        this._ = v._;
        v._ = _;

        _ = this.recalc;
        this.recalc = v.recalc;
        v.recalc = _;
        return this;
    };

    /**
     * Physics.vector#values() -> Object
     * 
     * Get the coordinate values as an object literal.
     **/
    Vector.prototype.values = function(){

        return {
            x: this._[0],
            y: this._[1]
        };
    };


    /**
     * Physics.vector#zero() -> this
     * 
     * Set the coordinates of this vector to zero.
     **/
    Vector.prototype.zero = function() {

        this._[3] = 0.0;
        this._[4] = 0.0;

        this._[0] = 0.0;
        this._[1] = 0.0;
        return this;
    };

    /**
     * Physics.vector#negate() -> this
     * 
     * Flip this vector in the opposite direction.
     **/
    Vector.prototype.negate = function( component ){

        if (component !== undefined){

            this._[ component ] = -this._[ component ];
            return this;
        }

        this._[0] = -this._[0];
        this._[1] = -this._[1];
        return this;
    };

    /**
     * Physics.vector#clamp( minV, maxV ) -> this
     * - minV (Vectorish): The minimum vector
     * - maxV (Vectorish): The maximum vector
     * 
     * Constrain vector components to minima and maxima.
     * 
     * The vector analog of [scalar clamping](http://en.wikipedia.org/wiki/Clamping_(graphics)).
     **/
    Vector.prototype.clamp = function( minV, maxV ){

        this._[0] = min(max(this._[0], minV.x), maxV.x);
        this._[1] = min(max(this._[1], minV.y), maxV.y);
        this.recalc = true;
        return this;
    };

    /**
     * Physics.vector#toString() -> String
     * 
     * Get a formatted string of this vector's coordinates.
     **/
    Vector.prototype.toString = function(){

        return '('+this._[0] + ', ' + this._[1]+')';
    };


    /**
     * Physics.vector#equals( v ) -> Boolean
     * - v (Physics.vector): The other vector
     * 
     * Determine if this vector equals another.
     **/
    Vector.prototype.equals = function( v ){

        return this._[0] === v._[0] &&
            this._[1] === v._[1] &&
            this._[2] === v._[2];
    };

    /**
     * Physics.vector.axis = Array
     * 
     * Read-only axis vectors for general reference.
     *
     * Example:
     *
     * ```javascript
     * Physics.vector.axis[0]; // The x axis unit vector
     * Physics.vector.axis[1]; // The y axis unit vector
     * ```
     **/
    Vector.axis = [
        new Vector(1.0, 0.0),
        new Vector(0.0, 1.0)
    ];

    /**
     * Physics.vector.zero = zeroVector
     * 
     * Read-only zero vector for reference
     **/
    Vector.zero = new Vector(0, 0);

    // assign
    Physics.vector = Vector;

}(this)); // end Vector class


// ---
// inside: src/util/noconflict.js

(function( window ){

    var _Physics = window.Physics;

    /**
     * Physics.noConflict() -> Physics
     * 
     * Restore the original reference to the global window.Physics variable.
     * 
     * Does nothing if PhysicsJS doesn't have a reference in global scope
     **/
    Physics.noConflict = function(){

        if ( window.Physics === Physics ) {
            window.Physics = _Physics;
        }
        
        return Physics;
    };

})( this );

// ---
// inside: src/util/decorator.js

/** related to: factory
 * Physics.util.decorator( type [, protoDef ] ) -> Function
 * - type (String): The name of the factory you are creating
 * - protoDef (Object): The top-level prototype
 * + (Function): The factory function
 *
 * Facilitates creation of decorator factory functions.
 *
 * See the [[factory]] definition for the factory signatures.
 * [For full documentation and examples, please visit the wiki](https://github.com/wellcaffeinated/PhysicsJS/wiki/Fundamentals#the-factory-pattern).
 *
 * Example:
 *
 * ```javascript
 * var factory = Physics.util.decorator('factory', {
 *      // prototype methods...
 *      method: function( args ){
 *      }
 * });
 *
 * // define
 * factory( 'name', 'parent-name', function( parent ){
 *
 *      // extend further...
 *      return {
 *          // overrides
 *          init: function( cfg ){
 *              parent.init.call(this, cfg);
 *          }
 *      };
 * });
 *
 * // instantiate
 * var options = { key: 'val' };
 * var instance = factory( 'name', options );
 * ```
 **/
var Decorator = Physics.util.decorator = function Decorator( type, baseProto ){

    var registry = {}
        ,proto = {}
        ;

    // extend that supports getters/setters
    // only extends functions
    var extend = function extend( to, from ){
        var desc, key;
        for ( key in from ){
            desc = Object.getOwnPropertyDescriptor( from, key );
            if ( desc.get || desc.set ){

                Object.defineProperty( to, key, desc );

            } else if ( Physics.util.isFunction( desc.value ) ){

                to[ key ] = desc.value;
            }
        }
        return to;
    };

    // http://ejohn.org/blog/objectgetprototypeof/
    /* jshint -W103 */
    var getProto = Object.getPrototypeOf;
    if ( typeof getProto !== 'function' ) {
        if ( typeof 'test'.__proto__ === 'object' ) {
            getProto = function(object){
                return object.__proto__;
            };
        } else {
            getProto = function(object){
                // May break if the constructor has been tampered with
                return object.constructor.prototype;
            };
        }
    }
    /* jshint +W103 */

    var objectCreate = Object.create;
    if (typeof objectCreate !== 'function') {
        objectCreate = function (o) {
            function F() {}
            F.prototype = o;
            return new F();
        };
    }

    /*
     * mixin( key, val )
     * mixin( obj )
     * - key (String): The method name
     * - val (Function): The function to assign
     * - obj (Object): object with many `key: fn` pairs
     *
     * Apply mixin methods to decorator base.
     */
    var mixin = function mixin( key, val ){

        if ( typeof key === 'object' ){
            proto = extend(proto, key);
            proto.type = type;
            return;
        }

        if ( key !== 'type' && Physics.util.isFunction( val ) ){
            proto[ key ] = val;
        }
    };

    // @TODO: not sure of the best way to make the constructor names
    // transparent and readable in debug consoles...
    mixin( baseProto );

    /**  belongs to: Physics.util.decorator
     * factory( name[, parentName], decorator[, cfg] )
     * factory( name, cfg ) -> Object
     * -  name       (String):  The class name
     * -  parentName (String): The name of parent class to extend
     * -  decorator  (Function): The decorator function that should define and return methods to extend (decorate) the base class
     * -  cfg        (Object): The configuration to pass to the class initializer
     *
     * Factory function for definition and instantiation of subclasses.
     *
     * Use the first signature (once) to define it first.
     * If defining without the "cfg" parameter, void will be returned. Otherwise the class instance will be returned.
     *
     * See [[Physics.util.decorator]] for more information.
     **/
    var factory = function factory( name, parentName, decorator, cfg ){

        var instance
            ,result
            ,parent = proto
            ,tmp
            ;

        // set parent if specified
        if ( typeof parentName !== 'string' ){

            // ... otherwise reassign parameters
            cfg = decorator;
            decorator = parentName;

        } else {

            // extend the specified module
            parent = registry[ parentName ];

            if ( !parent ){

                throw 'Error: "' + parentName + '" ' + type + ' not defined';
            }

            parent = parent.prototype;
        }

        if ( typeof decorator === 'function' ){

            result = registry[ name ];

            if ( result ){

                result.prototype = extend(result.prototype, decorator( getProto(result.prototype) ));

            } else {
                // newly defined
                // store the new class
                result = registry[ name ] = function constructor( opts ){
                    if (this.init){
                        this.init( opts );
                    }
                };

                result.prototype = objectCreate( parent );
                result.prototype = extend(result.prototype, decorator( parent, result.prototype ));
            }

            result.prototype.type = type;
            result.prototype.name = name;

        } else {

            cfg = decorator || {};
            result = registry[ name ];
            if (!result){

                throw 'Error: "' + name + '" ' + type + ' not defined';
            }
        }

        if ( cfg ) {

            // create a new instance from the provided decorator
            return new result( cfg );
        }
    };

    factory.mixin = mixin;

    return factory;
};


// ---
// inside: src/util/helpers.js

/**
 * Physics.util.indexOf( arr, value ) -> Number
 * - arr (Array): The array to search
 * - value (Mixed): The value to find
 * + (Number): The index of `value` in the array OR `-1` if not found
 *
 * Fast indexOf implementation.
 **/
Physics.util.indexOf = function indexOf(arr, value) {
    var fr = 0, bk = arr.length;
    while (fr < bk) {
        bk--;
        if (arr[ fr ] === value) {
            return fr;
        }
        if (arr[ bk ] === value) {
            return bk;
        }
        fr++;
    }
    return -1;
};

/**
 * Physics.util.throttle( fn, delay ) -> Function
 * - fn (Function): The function to throttle
 * - delay (Number): Time in milliseconds
 *
 * Ensure a function is only called once every specified time span.
 **/
Physics.util.throttle = function throttle( fn, delay, scope ){
    var to
        ,call = false
        ,args
        ,cb = function(){
            clearTimeout( to );
            if ( call ){
                call = false;
                to = setTimeout(cb, delay);
                fn.apply(scope, args);
            } else {
                to = false;
            }
        }
        ;
        
    scope = scope || null;

    return function(){
        call = true;
        args = arguments;
        if ( !to ){
            cb();
        }
    };
};

/**
 * Physics.util.options( def[, target] ) -> Function
 * - def (Object): Default options to set
 * - target (Object): Where to copy the options to. Defaults to the returned function.
 * + (Function): The options function
 *
 * Options helper to keep track of options. Call it with a config object. Access options directly on the function.
 *
 * Example:
 *
 * ```javascript
 * this.options = Physics.util.options({ foo: 'bar', opt: 'def' });
 * this.options({ opt: 'myVal' });
 *
 * this.options.foo; // === 'bar'
 * this.options.def; // === 'myVal'
 *
 * // can also change defaults later
 * this.options.defaults({ foo: 'baz' });
 *
 * // can add a change callback
 * this.options.onChange(function( opts ){
 *     // some option changed
 *     // opts is the target
 * });
 * ```
 **/
Physics.util.options = function( def, target ){

    var _def = {}
        ,fn
        ,callbacks = []
        ;

    // set options
    fn = function fn( options ){

        Physics.util.extend(target, options, null);
        for ( var i = 0, l = callbacks.length; i < l; ++i ){
            callbacks[ i ]( target );
        }
        return target;
    };

    // add defaults
    fn.defaults = function defaults( def ){
        Physics.util.extend( _def, def );
        Physics.util.defaults( target, _def );
        return _def;
    };

    fn.onChange = function( cb ){
        callbacks.push( cb );
    };

    target = target || fn;

    fn.defaults( def );

    return fn;
};

/**
 * Physics.util.pairHash( id1, id2 ) -> Number
 * - id1 (Number): The id of the first thing
 * - id2 (Number): The id of the second thing
 * + (Number): A unique numeric hash (valid for values < 2^16)
 *
 * Generate a unique numeric hash from two input IDs.
 *
 * Useful for speedy indexing of pairs.
 **/
Physics.util.pairHash = function( id1, id2 ){
    id1 = id1|0;
    id2 = id2|0;

    if ( (id1|0) === (id2|0) ){

        return -1;
    }

    // valid for values < 2^16
    return ((id1|0) > (id2|0) ?
        (id1 << 16) | (id2 & 0xFFFF) :
        (id2 << 16) | (id1 & 0xFFFF))|0
        ;
};

/**
 * Physics.util.bind( fn, scope[, args... ] ) -> Function
 * - fn (Function): The function to bind scope to
 * - scope (Object): The scope to give to `fn`
 * - args (Mixed): Arguments to send to `fn`
 *
 * Bind a scope to a function.
 *
 * Basically the same functionality as [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 **/
if ( !Function.prototype.bind ){
    Physics.util.bind = function( fn, scope, args ){
        args = Array.prototype.slice.call( arguments, 2 );
        return function(){
            return fn.apply( scope, args.concat( Array.prototype.slice.call(arguments) ) );
        };
    };
} else {
    Physics.util.bind = function( fn, scope, args ){
        args = Array.prototype.slice.call( arguments, 1 );
        return Function.prototype.bind.apply( fn, args );
    };
}

/**
 * Physics.util.find( collection, fn( value, index, collection ) ) -> Mixed
 * - collection (Array): Collection of values to test
 * - fn (Function): The test function
 * - value (Mixed): The value to test
 * - index (Number): The index of value in collection
 * - collection (Array): The input collection
 *
 * Test an array of values against a test function
 * and return the first value for which the function
 * returns true.
 **/
Physics.util.find = function( collection, fn ){
    var i
        ,l = collection.length
        ,val
        ;

    for ( i = 0; i < l; i++ ){
        val = collection[ i ];
        if ( fn( val, i, collection ) ){
            return val;
        }
    }
};

/**
 * Physics.util.filter( collection, fn( value, index, collection ) ) -> Array
 * - collection (Array): Collection of values to test
 * - fn (Function): The test function
 * - value (Mixed): The value to test
 * - index (Number): The index of value in collection
 * - collection (Array): The input collection
 *
 * Test an array of values against a test function
 * and return another array of values for which
 * the test function returns true.
 **/
Physics.util.filter = function( collection, fn ){
    var i
        ,l = collection.length
        ,val
        ,matches = []
        ;

    for ( i = 0; i < l; i++ ){
        val = collection[ i ];
        if ( fn( val, i, collection ) ){
            matches.push( val );
        }
    }

    return matches;
};

// lodash methods

(function(){
/*
 * @license
 * Modified version of:
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/* Used to determine if values are of the language type Object */
var objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
};
var identity = function(a){ return a; };
var arrayClass = '[object Array]';
var objectClass = '[object Object]';
var nativeKeys = Object.keys;
var toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
/* Used as the size when optimizations are enabled for large arrays */
var largeArraySize = 75;
/* Used to pool arrays and objects used internally */
var arrayPool = [],
    objectPool = [];
/* Used as the max size of the `arrayPool` and `objectPool` */
var maxPoolSize = 40;
var keyPrefix = +new Date() + '';

function releaseArray(array) {
  array.length = 0;
  if (arrayPool.length < maxPoolSize) {
    arrayPool.push(array);
  }
}

function releaseObject(object) {
  var cache = object.cache;
  if (cache) {
    releaseObject(cache);
  }
  object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
  if (objectPool.length < maxPoolSize) {
    objectPool.push(object);
  }
}

function getObject() {
  return objectPool.pop() || {
    'array': null,
    'cache': null,
    'criteria': null,
    'false': false,
    'index': 0,
    'null': false,
    'number': null,
    'object': null,
    'push': null,
    'string': null,
    'true': false,
    'undefined': false,
    'value': null
  };
}

function getArray() {
  return arrayPool.pop() || [];
}

function cacheIndexOf(cache, value) {
  var type = typeof value;
  cache = cache.cache;

  if (type === 'boolean' || value == null) {
    return cache[value] ? 0 : -1;
  }
  if (type !== 'number' && type !== 'string') {
    type = 'object';
  }
  var key = type === 'number' ? value : keyPrefix + value;
  cache = (cache = cache[type]) && cache[key];

  return type === 'object' ?
    (cache && Physics.util.indexOf(cache, value) > -1 ? 0 : -1) :
    (cache ? 0 : -1);
}

function cachePush(value) {
  var cache = this.cache,
      type = typeof value;

  if (type === 'boolean' || value == null) {
    cache[value] = true;
  } else {
    if (type !== 'number' && type !== 'string') {
      type = 'object';
    }
    var key = type === 'number' ? value : keyPrefix + value,
        typeCache = cache[type] || (cache[type] = {});

    if (type === 'object') {
      (typeCache[key] || (typeCache[key] = [])).push(value);
    } else {
      typeCache[key] = true;
    }
  }
}

function createCache(array) {
  var index = -1,
      length = array.length,
      first = array[0],
      mid = array[(length / 2) | 0],
      last = array[length - 1];

  if (first && typeof first === 'object' &&
      mid && typeof mid === 'object' && last && typeof last === 'object') {
    return false;
  }
  var cache = getObject();
  cache['false'] = cache['null'] = cache['true'] = cache['undefined'] = false;

  var result = getObject();
  result.array = array;
  result.cache = cache;
  result.push = cachePush;

  while (++index < length) {
    result.push(array[index]);
  }
  return result;
}

var shimKeys = function(object) {
  var index, iterable = object, result = [];
  if (!iterable){ return result; }
  if (!(objectTypes[typeof object])){ return result; }
    for (index in iterable) {
      if (hasOwnProperty.call(iterable, index)) {
        result.push(index);
      }
    }
  return result;
};

var keys = !nativeKeys ? shimKeys : function(object) {
  if (!Physics.util.isObject(object)) {
    return [];
  }
  return nativeKeys(object);
};

var idCounter = 0;
/**
 * Physics.util.uniqueId( [prefix] ) -> String
 * - prefix (String): Prefix to the id
 *
 * Generate a unique id, optionally prefixed.
 **/
Physics.util.uniqueId = function uniqueId(prefix) {
    var id = ++idCounter;
    return '' + (prefix || '') + id;
};

/*
 * The base implementation of `_.random` without argument juggling or support
 * for returning floating-point numbers.
 *
 * @private
 * @param {number} min The minimum possible value.
 * @param {number} max The maximum possible value.
 * @returns {number} Returns a random number.
 */
function baseRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

/*
 * Creates an array of shuffled values, using a version of the Fisher-Yates
 * shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
 *
 * @static
 * @memberOf _
 * @category Collections
 * @param {Array|Object|string} collection The collection to shuffle.
 * @returns {Array} Returns a new shuffled collection.
 * @example
 *
 * _.shuffle([1, 2, 3, 4, 5, 6]);
 * // => [4, 1, 6, 3, 5, 2]
 */
Physics.util.shuffle = function(collection) {
    var index = -1
        ,length = collection ? collection.length : 0
        ,result = Array(typeof length === 'number' ? length : 0)
        ,i
        ,l
        ,value
        ,rand
        ;

    for ( i = 0, l = collection.length; i < l; i++ ){
        value = collection[ i ];
        rand = baseRandom(0, ++index);
        result[index] = result[rand];
        result[rand] = value;
    }
    return result;
};

/**
 * Physics.util.isObject( val ) -> Boolean
 * - val (Mixed): The value to test
 *
 * Test if a value is an object.
 **/
Physics.util.isObject = function isObject(value) {
    // check if the value is the ECMAScript language type of Object
    // http://es5.github.io/#x8
    // and avoid a V8 bug
    // http://code.google.com/p/v8/issues/detail?id=2291
    return !!(value && objectTypes[typeof value]);
};

function isFunction(value) {
    return typeof value === 'function';
}

/**
 * Physics.util.isFunction( val ) -> Boolean
 * - val (Mixed): The value to test
 *
 * Test if a value is a function.
 **/
Physics.util.isFunction = isFunction;

/**
 * Physics.util.isArray( val ) -> Boolean
 * - val (Mixed): The value to test
 *
 * Test if a value is an array.
 **/
Physics.util.isArray = Array.isArray || function(value) {
  return value && typeof value === 'object' && typeof value.length === 'number' &&
    toString.call(value) === arrayClass || false;
};

var reNative = RegExp('^' +
  String(toString)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/toString| for [^\]]+/g, '.*?') + '$'
);
function isNative(value) {
  return typeof value === 'function' && reNative.test(value);
}

function shimIsPlainObject(value) {
  var ctor,
      result;

  // avoid non Object objects, `arguments` objects, and DOM elements
  if (!(value && toString.call(value) === objectClass) ||
      (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor))) {
    return false;
  }
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  for (var key in value){
    result = key;
  }
  return typeof result === 'undefined' || hasOwnProperty.call(value, result);
}

/**
 * Physics.util.isPlainObject( val ) -> Boolean
 * - val (Mixed): The value to test
 *
 * Test if a value is a plain javascript object.
 **/
Physics.util.isPlainObject = !Object.getPrototypeOf ? shimIsPlainObject : function(value) {
  if (!(value && toString.call(value) === objectClass)) {
    return false;
  }
  var valueOf = value.valueOf,
      objProto = isNative(valueOf) && (objProto = Object.getPrototypeOf(valueOf)) && Object.getPrototypeOf(objProto);

  return objProto ?
    (value === objProto || Object.getPrototypeOf(value) === objProto) :
    shimIsPlainObject(value);
};

function baseUniq(array, isSorted, callback) {
  var index = -1,
      indexOf = Physics.util.indexOf,
      length = array ? array.length : 0,
      result = [];

  var isLarge = !isSorted && length >= largeArraySize && indexOf === Physics.util.indexOf,
      seen = (callback || isLarge) ? getArray() : result;

  if (isLarge) {
    var cache = createCache(seen);
    indexOf = cacheIndexOf;
    seen = cache;
  }
  while (++index < length) {
    var value = array[index],
        computed = callback ? callback(value, index, array) : value;

    if (isSorted ?
          !index || seen[seen.length - 1] !== computed :
          indexOf(seen, computed) < 0
        ) {
      if (callback || isLarge) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  if (isLarge) {
    releaseArray(seen.array);
    releaseObject(seen);
  } else if (callback) {
    releaseArray(seen);
  }
  return result;
}

/**
 * Physics.util.uniq( array, [isSorted, callback] ) -> Array
 * - array (Array): The array
 * - isSorted (Boolean): Flag to indicate the array is sorted
 * - callback (Function): Mapping function
 *
 * Create an array without duplicates.
 **/
Physics.util.uniq = function uniq(array, isSorted, callback) {
  // juggle arguments
  if (typeof isSorted !== 'boolean' && isSorted != null) {
    callback = isSorted;
    isSorted = false;
  }
  return baseUniq(array, isSorted, callback);
};

var assign = function(object, source, guard) {
  var index, iterable = object, result = iterable;
  if (!iterable) { return result; }
  var args = arguments,
      argsIndex = 0,
      callback,
      argsLength = typeof guard === 'number' ? 2 : args.length;
  if (argsLength > 2 && typeof args[argsLength - 1] === 'function') {
    callback = args[--argsLength];
  }
  while (++argsIndex < argsLength) {
    iterable = args[argsIndex];
    if (iterable && objectTypes[typeof iterable]) {
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          result[index] = callback ? callback(result[index], iterable[index]) : iterable[index];
        }
    }
  }
  return result;
};

/**
 * Physics.util.extend( object, source...[, callback] ) -> Object
 * - object (Object): The destination object
 * - source (Object): The source objects
 * - callback (Function): The function to customize assigning values
 *
 * Implementation of [lodash.extend](http://lodash.com/docs#assign)
 **/
Physics.util.extend = assign;

/**
 * Physics.util.defaults( object, source...[, callback] ) -> Object
 * - object (Object): The destination object
 * - source (Object): The source objects
 * - callback (Function): The function to customize assigning values
 *
 * Implementation of [lodash.defaults](http://lodash.com/docs#defaults).
 **/
Physics.util.defaults = function(object, source, guard) {
  var index, iterable = object, result = iterable;
  if (!iterable){ return result; }
  var args = arguments,
      argsIndex = 0,
      argsLength = typeof guard === 'number' ? 2 : args.length;
  while (++argsIndex < argsLength) {
    iterable = args[argsIndex];
    if (iterable && objectTypes[typeof iterable]) {
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          if (typeof result[index] === 'undefined') {
              result[index] = iterable[index];
          }
        }
    }
  }
  return result;
};

/**
 * Physics.util.sortedIndex( array, value[, callback] ) -> Number
 * - array (Array): The array to inspect
 * - value (Mixed): The value to evaluate
 * - callback (Function): Function called per iteration
 *
 * Implementation of [lodash.sortedIndex](http://lodash.com/docs#sortedIndex).
 **/
Physics.util.sortedIndex = function sortedIndex(array, value, callback) {
  var low = 0,
      high = array ? array.length : low;

  // explicitly reference `identity` for better inlining in Firefox
  callback = callback || identity;
  value = callback(value);

  /* jshint -W030 */
  while (low < high) {
    var mid = (low + high) >>> 1;
    (callback(array[mid]) < value) ?
      low = mid + 1 :
      high = mid;
  }
  /* jshint +W030 */
  return low;
};

})();


// ---
// inside: src/util/scratchpad.js

/*
 * scratchpad
 * thread-safe management of temporary (voletile)
 * objects for use in calculations
 * https://github.com/wellcaffeinated/scratchpad.js
 */
Physics.scratchpad = (function(){

    // Errors
    var SCRATCH_USAGE_ERROR = 'Error: Scratchpad used after .done() called. (Could it be unintentionally scoped?)';
    var SCRATCH_INDEX_OUT_OF_BOUNDS = 'Error: Scratchpad usage space out of bounds. (Did you forget to call .done()?)';
    var SCRATCH_MAX_REACHED = 'Error: Too many scratchpads created. (Did you forget to call .done()?)';
    var ALREADY_DEFINED_ERROR = 'Error: Object is already registered.';

    // cache previously created scratches
    var scratches = [];
    var numScratches = 0;
    var Scratch, Scratchpad;
    
    var regIndex = 0;


    /** belongs to: Physics.scratchpad
     * class Scratch
     *
     * A scratchpad session.
     * 
     * This class keeps track of temporary objects used
     * in this session and releases them when finished (call to `.done()`).
     *
     * Use this to retrieve temporary objects:
     * - `.vector()`: retrieve a temporary [[Physics.vector]]
     * - `.transform()`: retrieve a temporary [[Physics.transform]]
     *
     * See [[Physics.scratchpad]] for more info.
     **/
    Scratch = function Scratch(){

        // private variables
        this._active = false;
        this._indexArr = [];
        
        if (++numScratches >= Scratchpad.maxScratches){
            throw SCRATCH_MAX_REACHED;
        }
    };

    Scratch.prototype = {

        /**
         * Scratch#done( [val] ) -> Mixed
         * - val (Mixed): No effect on this method, just passed on to the return value so you can do things like:
         return scratch.done( myReturnVal );
         * + (Mixed): Whatever you specified as `val`
         * 
         * Declare that your work is finished.
         * 
         * Release temp objects for use elsewhere. Must be called when immediate work is done.
         *
         * You can wrap the return value in scratch.done() so that you don't forget to call it.
         *
         * Example:
         *
         * ```javascript
         * return scratch.done( myReturnValue );
         * ```
         **/
        done: function( val ){

            this._active = false;
            var s;
            for ( var i = 0; i < regIndex; ++i ){
                
                this[ i ] = 0;
            }
            
            // add it back to the scratch stack for future use
            scratches.push( this );
            return val;
        }
    };


    // API

    /**
     * Physics.scratchpad( [fn] ) -> Scratch|Function
     * - fn (Function): Some function you'd like to wrap in a scratch session. First argument is the scratch instance.
     * + (Function): The wrapped function (if `fn` arg specified) that can be reused like the original minus the first (scratch) parameter.
     * + (Scratch): The scratch session.
     * 
     * Get a new scratch session to work from or wrap a function in a scratch session.
     * 
     * Call `.done()` on it when finished.
     *
     * Example:
     * 
     * ```javascript
     * // get a scratch session manually
     * var myAlg = function( scratch, arg1, arg2, ... ){
     *     var scratch = Physics.scratchpad()
     *     ,vec = scratch.vector().set( 0, 0 ) // need to reinitialize... it's recycled!
     *     ;
     *     // ...
     *     return scratch.done( result );
     * };
     * // later...
     * while( awesome ){
     *     myAlg( arg1, arg2, ... );
     * }
     * ```
     *
     * Example:
     * 
     * ```javascript
     * // wrap a function in a scratch session
     * var myAlg = Physics.scratchpad(function( scratch, arg1, arg2, ... ){
     *     var vec = scratch.vector().set( 0, 0 ); // need to reinitialize... it's recycled!
     *     //...
     *     return result;
     * });
     * // later...
     * while( awesome ){
     *     myAlg( arg1, arg2, ... );
     * }
     * ```
     **/
    Scratchpad = function Scratchpad( fn ){

        if ( fn ){
            return Scratchpad.fn( fn );
        }

        var scratch = scratches.pop() || new Scratch();
        scratch._active = true;
        return scratch;
    };

    // options
    Scratchpad.maxScratches = 100; // maximum number of scratches
    Scratchpad.maxIndex = 20; // maximum number of any type of temp objects

    /**
     * Physics.scratchpad.fn( fn ) -> Function
     * - fn (Function): Some function you'd like to wrap in a scratch session. First argument is the scratch instance. See [[Physics.scratchpad]].
     * + (Function): The wrapped function that can be reused like the original minus the first (scratch) parameter.
     * 
     * Wrap a function in a scratch session.
     *
     * Same as calling `Physics.scratchpad( fn )` with a function specified.
     **/
    Scratchpad.fn = function( fn ){
        
        var args = [];
        for ( var i = 0, l = fn.length; i < l; i++ ){
            args.push( i );
        }

        args = 'a' + args.join(',a');
        /* jshint -W054 */
        var handle = new Function('fn, scratches, Scratch', 'return function('+args+'){ '+
               'var scratch = scratches.pop() || new Scratch( scratches );'+
               'scratch._active = true;'+
               'return scratch.done( fn(scratch, '+args+') );'+
           '};'
        );
        /* jshint +W054 */

        return handle(fn, scratches, Scratch);
    };

    /**
     * Physics.scratchpad.register( name, constructor )
     * - name (String): Name of the object class
     * - constructor (Function): The object constructor
     * 
     * Register a new object to be included in scratchpads.
     *
     * Example:
     *
     * ```javascript
     * // register a hypothetical vector class...
     * Physics.scratchpad.register('vector', Vector);
     * ```
     **/
    Scratchpad.register = function register( name, constructor, options ){

        var proto = Scratch.prototype
            ,idx = regIndex++ // increase the scratch type index
            ,stackname = '_' + name + 'Stack' // the name of the array stack
            ,useFactory = options && options.useFactory
            ;

        if ( name in proto ) {
            throw ALREADY_DEFINED_ERROR;
        }

        // create a new function on the prototype
        proto[ name ] = function(){

            // get the stack (or initialize it)
            var stack = this[ stackname ] || (this[ stackname ] = [])
                // we increase this index every time a voletile object is requested
                // seems weird to store it on this as a number (ie: this.0, this.1)...
                // but actually it's faster...
                ,stackIndex = this[ idx ] | 0
                ;

            this[ idx ] = stackIndex + 1;

            // if used after calling done...
            if (!this._active){
                throw SCRATCH_USAGE_ERROR;
            }

            // if too many objects created...
            if (stackIndex >= Scratchpad.maxIndex){
                throw SCRATCH_INDEX_OUT_OF_BOUNDS;
            }

            // return or create new instance
            return stack[ stackIndex ] || 
                    (stack[ stackIndex ] = useFactory ? constructor() : new constructor() );
        };

    };

    // register some classes
    Scratchpad.register('vector', Physics.vector);
    Scratchpad.register('transform', Physics.transform);

    return Scratchpad;

})();

// ---
// inside: src/util/pubsub.js

(function(){

    function getPriority( val ){
        return val._priority_;
    }

    // register a new scratch object so we can reuse event data
    Physics.scratchpad.register('event', function(){ return {}; }, { useFactory: true });

    /**
     * class Physics.util.pubsub
     *
     * Fast pubsub implementation.
     *
     * Can be mixed into other classes easily.
     **/
    var PubSub = function PubSub(){

        if (!(this instanceof PubSub)){
            return new PubSub();
        }
    };

    PubSub.prototype = {

        /**
         * Physics.util.pubsub#on( topic, fn( data, event )[, scope, priority] ) -> this
         * Physics.util.pubsub#on( topicConfig[, scope, priority] ) -> this
         * - topic (String): The topic name
         * - topicConfig (Object): A config with key/value pairs of `{ topic: callbackFn, ... }`
         * - fn (Function): The callback function (if not using Object as previous argument)
         * - data (Mixed): The data sent from the call to `.emit()`
         * - event (Object): Event data, holding `.topic`, the topic, and `.handler`, the `fn` callback.
         * - scope (Object): The scope to bind callback to
         * - priority (Number): The priority of the callback (higher is earlier)
         *
         * Subscribe callback(s) to a topic(s).
         **/
        on: function( topic, fn, scope, priority ){

            var listeners
                ,orig
                ,idx
                ;

            // ensure topics hash is initialized
            this._topics = this._topics || (this._topics = {});

            // check if we're subscribing to multiple topics
            // with an object
            if ( Physics.util.isObject( topic ) ){

                for ( var t in topic ){

                    this.on( t, topic[ t ], fn, scope );
                }

                return this;
            }

            listeners = this._topics[ topic ] || (this._topics[ topic ] = []);
            orig = fn;

            if ( Physics.util.isObject( scope ) ){

                fn = Physics.util.bind( fn, scope );
                fn._bindfn_ = orig;
                fn._one_ = orig._one_;

            } else if (!priority) {

                priority = scope;
            }

            fn._priority_ = priority;

            idx = Physics.util.sortedIndex( listeners, fn, getPriority );

            listeners.splice( idx, 0, fn );
            return this;
        },

        /**
         * Physics.util.pubsub#off( topic, fn ) -> this
         * Physics.util.pubsub#off( topicCfg ) -> this
         * - topic (String): topic The topic name. Specify `true` to remove all listeners for all topics
         * - topicCfg (Object): A config with key/value pairs of `{ topic: callbackFn, ... }`
         * - fn (Function): The original callback function. Specify `true` to remove all listeners for specified topic
         *
         * Unsubscribe callback(s) from topic(s).
         **/
        off: function( topic, fn ){

            var listeners
                ,listn
                ;

            if ( !this._topics ){
                // nothing subscribed
                return this;
            }

            if ( topic === true ){
                // purge all listeners
                this._topics = {};
                return this;
            }

            // check if we're subscribing to multiple topics
            // with an object
            if ( Physics.util.isObject( topic ) ){

                for ( var t in topic ){

                    this.off( t, topic[ t ] );
                }

                return this;
            }

            listeners = this._topics[ topic ];

            if (!listeners){
                return this;
            }

            if ( fn === true ){
                // purge all listeners for topic
                this._topics[ topic ] = [];
                return this;
            }

            for ( var i = 0, l = listeners.length; i < l; i++ ){

                listn = listeners[ i ];

                if ( listn._bindfn_ === fn || listn === fn ){
                    listeners.splice( i, 1 );
                    break;
                }
            }

            return this;
        },

        /**
         * Physics.util.pubsub#emit( topic[, data] ) -> this
         * - topic (String): The topic name
         * - data (Mixed): The data to send
         *
         * Publish data to a topic.
         **/
        emit: function( topic, data ){

            if ( !this._topics ){
                // nothing subscribed
                return this;
            }

            var listeners = this._topics[ topic ]
                ,l = listeners && listeners.length
                ,handler
                ,e
                ,scratch = Physics.scratchpad()
                ;

            if ( !l ){
                return scratch.done(this);
            }

            e = scratch.event();
            // event data
            e.topic = topic;
            e.handler = handler;

            // reverse iterate so priorities work out correctly
            while ( l-- ){

                handler = listeners[ l ];
                handler( data, e );

                // if _one_ flag is set, the unsubscribe
                if ( handler._one_ ){
                    listeners.splice( l, 1 );
                }
            }

            return scratch.done(this);
        },

        /**
         * Physics.util.pubsub#one( topic, fn( data, event )[, scope, priority] ) -> this
         * Physics.util.pubsub#one( topicConfig[, scope, priority] ) -> this
         * - topic (String): The topic name
         * - topicConfig (Object): A config with key/value pairs of `{ topic: callbackFn, ... }`
         * - fn (Function): The callback function (if not using Object as previous argument)
         * - data (Mixed): The data sent from the call to `.emit()`
         * - event (Object): Event data, holding `.topic`, the topic, and `.handler`, the `fn` callback.
         * - scope (Object): The scope to bind callback to
         * - priority (Number): The priority of the callback (higher is earlier)
         *
         * Subscribe callback(s) to a topic(s), but only ONCE.
         **/
        one: function( topic, fn, scope ){

            // check if we're subscribing to multiple topics
            // with an object
            if ( Physics.util.isObject( topic ) ){

                for ( var t in topic ){

                    this.one( t, topic[ t ], fn, scope );
                }

                return this;
            }

            // set the _one_ flag
            fn._one_ = true;
            this.on( topic, fn, scope );

            return this;
        }
    };

    Physics.util.pubsub = PubSub;
})();


// ---
// inside: src/util/ticker.js

/**
 * class Physics.util.ticker
 *
 * The Ticker _singleton_ for easily binding callbacks to animation loops (requestAnimationFrame).
 *
 * Requires window.requestAnimationFrame... so polyfill it if you need to.
 **/
(function(window){

    var active = false
        ,ps = Physics.util.pubsub()
        ,perf = window.performance
        ;

    function now(){
        // http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision
        return (perf && perf.now) ?
            (perf.now() + perf.timing.navigationStart) :
            Date.now();
    }

    /*
     * step( time )
     * - time (Number): The current time
     *
     * Publish a tick to subscribed callbacks
     */
    function step(){

        var time;

        if (!active){
            return;
        }

        time = now();

        if (!time){
            return;
        }

        window.requestAnimationFrame( step );
        ps.emit( 'tick', time );
    }

    /**
     * Physics.util.ticker.start() -> this
     *
     * Start the ticker
     **/
    function start(){

        active = true;
        step();
        return this;
    }

    /**
     * Physics.util.ticker.stop() -> this
     *
     * Stop the ticker
     **/
    function stop(){

        active = false;
        return this;
    }

    /**
     * Physics.util.ticker.on( listener( time ) ) -> this
     * - listener (Function): The callback function
     * - time (Number): The current timestamp
     *
     * Subscribe a callback to the ticker.
     **/
    function on( listener ){

        ps.on('tick', listener);
        return this;
    }

    /**
     * Physics.util.ticker.off( listener ) -> this
     * - listener (Function): The callback function previously bound
     *
     * Unsubscribe a callback from the ticker.
     **/
    function off( listener ){

        ps.off('tick', listener);
        return this;
    }

    /**
     * Physics.util.ticker.isActive() -> Boolean
     * + (Boolean): `true` if running, `false` otherwise.
     *
     * Determine if ticker is currently running.
     **/
    function isActive(){

        return !!active;
    }

    // API
    Physics.util.ticker = {
        now: now,
        start: start,
        stop: stop,
        on: on,
        off: off,
        isActive: isActive
    };

}(this));


// ---
// inside: src/core/query.js

(function (window) {

    /*
     * Group helpers
     */
    var fnTrue = function(){ return !0; }; // return true
    
    var indexOf = Physics.util.indexOf;

    /** hide
     * wrapRule( fn( propVal ), prop ) -> Function
     * - fn (Function): The test function
     * - prop (String): The property name to test
     * - propVal (Mixed): The property value
     * 
     * Get test function to test on sub property.
     **/
    var wrapRule = function wrapRule( fn, prop ){
        return function( thing ){
            return fn( thing[ prop ] );
        };
    };

    /** hide
     * $eq( toMatch[, prop] ) -> Function
     * - toMatch (Mixed): The value to match
     * - prop (String): The property name to test
     * 
     * Get an equality test function.
     **/
    var $eq = function $eq( toMatch, prop ){
        return function( thing ){
            
            thing = prop ? thing[ prop ] : thing;

            var fr = 0
                ,bk
                ;
            
            if ( Physics.util.isArray( thing ) ){

                if ( Physics.util.isArray( toMatch ) ){
                    // match all
                    bk = thing.length;

                    // check lengths
                    if ( bk !== toMatch.length ){
                        return false;
                    }

                    while ( fr < bk ){
                        bk--;
                        if (
                            // check front
                            (indexOf(toMatch, thing[ fr ]) === -1) ||
                            // check back
                            (indexOf(toMatch, thing[ bk ]) === -1)
                        ) {
                            return false;
                        }
                        fr++;
                    }
                    return true;
                } else {
                    // find in array
                    return (indexOf( thing, toMatch ) > -1);
                }
            }

            // exact match
            return (thing === toMatch);
        };
    };

    /** hide
     * $ne( toMatch[, prop] ) -> Function
     * - toMatch (Mixed): The value to match
     * - prop (String): The property name to test
     * 
     * Get a NOT equality test function.
     **/
    var $ne = function $ne( toMatch, prop ){
        var fn = $eq( toMatch, prop );
        return function( thing ){
            return !fn( thing );
        };
    };

    /** hide
     * $in( toMatch[, prop] ) -> Function
     * - toMatch (Array): The array to match
     * - prop (String): The property name to test
     * 
     * Get a test function for matching ANY in array
     **/
    var $in = function $in( toMatch, prop ){
        return function( thing ){

            thing = prop ? thing[ prop ] : thing;
            
            var fr = 0
                ,bk
                ;

            if ( Physics.util.isArray( thing ) ){
                bk = thing.length;

                while( fr < bk ){
                    bk--;
                    if (
                        // check front
                        (indexOf(toMatch, thing[ fr ]) > -1) ||
                        // check back
                        (indexOf(toMatch, thing[ bk ]) > -1)
                    ) {
                        return true;
                    }
                    fr++;
                }
                return false;
            }

            // if thing matches any in array
            return (indexOf(toMatch, thing) > -1);
        };
    };

    /** hide
     * $nin( toMatch[, prop] ) -> Function
     * - toMatch (Array): The array to match
     * - prop (String): The property name to test
     * 
     * Get a test function for matching NOT ANY in array
     **/
    var $nin = function $nin( toMatch, prop ){
        var fn = $in( toMatch, prop );
        return function( thing ){
            return !fn( thing );
        };
    };

    /** hide
     * $at( point ) -> Function
     * - point (Vectorish): The point to check
     * 
     * Get a test function to match any body who's aabb intersects point
     **/
    var $at = function $at( point ){
        point = Physics.vector( point );
        return function( body ){
            var aabb = body.aabb();
            return Physics.aabb.contains( aabb, point );
        };
    };

    /** hide
     * $and( first ) -> Function
     * - first (Function): First function node. `first.next` should have the next function, and so on.
     * 
     * Get an AND test function.
     **/
    var $and = function $and( first ){
        return first.next ? function( thing ){
            var fn = first;
            while ( fn ){

                if ( !fn( thing ) ){
                    return false;
                }
                fn = fn.next;
            }
            return true;
        } : first;
    };

    /** hide
     * $or( first ) -> Function
     * - first (Function): First function node. `first.next` should have the next function, and so on.
     * 
     * Get an OR test function.
     **/
    var $or = function $or( first ){
        return first.next ? function( thing ){
            var fn = first;
            while ( fn ){

                if ( fn( thing ) ){
                    return true;
                }
                fn = fn.next;
            }
            return false;
        } : first;
    };

    // operation hash
    var operations = {
        // $and and $or are separate
        $eq: $eq
        ,$ne: $ne
        ,$in: $in
        ,$nin: $nin
        ,$at: $at
    };

    /** related to: Physics.world#find
     * Physics.query( rules ) -> Function
     * - rules (Object): The mongodb-like search rules. (See description).
     * + (Function): The test function
     * 
     * Creates a function that can be used to perform tests on objects.
     *
     * The test function will return a [[Boolean]]; `true` if the object matches the tests.
     *
     * Query rules are mongodb-like. You can specify a hash of values to match like this:
     *
     * ```javascript
     * {
     *     foo: 'bar',
     *     baz: 2,
     *     some: {
     *         nested: 'value'
     *     }
     * }
     * ```
     *
     * And they will all need to match (it's an AND rule).
     *
     * You can also use operators for more versatility. The operators you can use include:
     *
     * - $eq: Test if some property is equal to a value (this is done by default, and is thus redundant)
     * - $ne: Test if some property is _NOT_ equal to a value
     * - $in: Test if some value (or array of values) is one of the specified array of values
     * - $nin: Test if some value (or array of values) is _NOT_ one of the specified array of values
     * - $at: Test if a body's [[Physics.aabb]] includes specified point. It's a primative hit-test.
     * 
     * Example:
     *
     * ```javascript
     * var wheelsArray = [];
     * 
     * var queryFn = Physics.query({
     *     name: 'circle', // only circles
     *     $nin: wheelsArray, // not in the wheelsArray
     *     labels: { $in: [ 'player', 'monster' ] } // that have player OR monster labels
     * });
     *
     * var obj = {
     *     name: 'circle',
     *     labels: [ 'round' ]
     * };
     *
     * queryFn( obj ); // -> false
     * // give it a player tag
     * obj.labels.push('player');
     * queryFn( obj ); // -> true
     * // put it inside the wheelsArray
     * wheelsArray.push( obj );
     * queryFn( obj ); // -> false
     * ```
     **/
    var Query = function Query( rules, /* internal use */ $op ){

        var op
            ,l
            ,rule
            ,first
            ,list
            ,fn
            ;

        if ( $op ){
            
            // parse operation choice
            if ( $op === '$or' || $op === '$and' ){

                // expect a rules array
                for ( op = 0, l = rules.length; op < l; ++op ){
                    
                    fn = Query( rules[ op ] );
                    // if first hasn't been set yet, set it and start the list there
                    // otherwise set the next node of the list
                    list = list ? list.next = fn : first = fn;
                }

                return ($op === '$or') ? $or( first ) : $and( first );
            } else if ( op = operations[ $op ] ){

                return op( rules );

            } else {
                // does not compute...
                throw 'Unknown query operation: ' + $op;
            }
        }

        // loop through rules
        for ( op in rules ){
            rule = rules[ op ];
   
            if ( op[0] === '$' ){
                // it's an operation rule
                fn = Query( rule, op );
                
            } else if ( Physics.util.isPlainObject( rule ) ) {
                // it's an object so parse subrules
                fn = wrapRule( Query( rule ), op );
            } else {
                // simple equality rule
                fn = $eq( rule, op );
            }

            // if first hasn't been set yet, set it and start the list there
            // otherwise set the next node of the list
            list = list ? list.next = fn : first = fn;
        }

        // return the rules test
        return $and( first || fnTrue );
    };

    Physics.query = Query;

})(this);


// ---
// inside: src/core/behavior.js

(function(){

    var defaults = {
        priority: 0
    };

    /** related to: Physics.util.decorator
     * Physics.behavior( name[, options] ) -> Behavior
     * - name (String): The name of the behavior to create
     * - options (Object): The configuration for that behavior ( depends on behavior ).
       Available options and defaults:
       
       ```javascript
        {
           priority: 0 // the priority of this body
        }
       ```
     *
     * Factory function for creating Behaviors.
     *
     * Visit [the PhysicsJS wiki on Behaviors](https://github.com/wellcaffeinated/PhysicsJS/wiki/Behaviors)
     * for usage documentation.
     **/
    Physics.behavior = Decorator('behavior', {

        /** belongs to: Physics.behavior
         * class Behavior
         *
         * The base class for behaviors created by [[Physics.behavior]] factory function.
         **/

        /** internal
         * Behavior#init( options )
         * - options (Object): The configuration options passed by the factory
         * 
         * Initialization. Internal use.
         **/
        init: function( options ){
            
            /** related to: Physics.util.options
             * Behavior#options( options ) -> Object
             * - options (Object): The options to set as an object
             * + (Object): The options
             * 
             * Set options on this instance. 
             * 
             * Access options directly from the options object.
             * 
             * Example:
             *
             * ```javascript
             * this.options.someOption;
             * ```
             * 
             **/
            this.options = Physics.util.options( defaults );
            this.options( options );
        },

        /**
         * Behavior#applyTo( arr ) -> this
         * - arr (Array): Array of bodies to apply this behavior to. Specify `true` for all objects in world.
         * 
         * Apply the behavior to a group of bodies.
         **/
        applyTo: function( arr ){

            if ( arr === true ){
                this._targets = null;
            } else {
                this._targets = Physics.util.uniq( arr );
            }
            return this;
        },

        /**
         * Behavior#getTargets() -> Array
         * + (Array): The array of bodies (by reference!) this behavior is applied to.
         * 
         * Get the array of bodies (by reference!) this behavior is applied to.
         **/
        getTargets: function(){
            
            return this._targets || ( this._world ? this._world._bodies : [] );
        },

        /**
         * Behavior#setWorld( world ) -> this
         * - world (Object): The world (or null)
         *
         * Set which world to apply to.
         *
         * Usually this is called internally. Shouldn't be a need to call this yourself usually.
         **/
        setWorld: function( world ){

            if ( this.disconnect && this._world ){
                this.disconnect( this._world );
            }

            this._world = world;

            if ( this.connect && world ){
                this.connect( world );
            }

            return this;
        },

        /**
         * Behavior#connect( world )
         * - world (Physics.world): The world to connect to
         * 
         * Connect to a world.
         *
         * Extend this when creating behaviors if you need to specify pubsub management.
         * Automatically called when added to world by the [[Behavior#setWorld]] method.
         **/
        connect: function( world ){

            if (this.behave){
                world.on('integrate:positions', this.behave, this, this.options.priority);
            }
        },

        /**
         * Behavior#disconnect( world )
         * - world (Physics.world): The world to disconnect from
         * 
         * Disconnect from a world.
         *
         * Extend this when creating behaviors if you need to specify pubsub management.
         * Automatically called when added to world by the [[Behavior#setWorld]] method.
         **/
        disconnect: function( world ){

            if (this.behave){
                world.off('integrate:positions', this.behave);
            }
        },

        /**
         * Behavior#behave( data )
         * - data (Object): The pubsub `integrate:positions` event data
         * 
         * Default method run on every world integration.
         *
         * You _must_ extend this when creating a behavior,
         * unless you extend the [[Behavior#connect]] and [[Behavior#disconnect]] methods.
         **/
        behave: null
    });

}());

// ---
// inside: src/core/body.js

(function(){

    var defaults = {

        // is the body hidden (not to be rendered)?
        hidden: false,
        // is the body `dynamic`, `kinematic` or `static`?
        // http://www.box2d.org/manual.html#_Toc258082973
        treatment: 'dynamic',
        // body mass
        mass: 1.0,
        // body restitution. How "bouncy" is it?
        restitution: 1.0,
        // what is its coefficient of friction with another surface with COF = 1?
        cof: 0.8,
        // what is the view object (mixed) that should be used when rendering?
        view: null
    };

    var uidGen = 1;

    /** related to: Physics.util.decorator
     * Physics.body( name[, options] ) -> Body
     * - name (String): The name of the body to create
     * - options (Object): The configuration for that body ( depends on body ).
       Available options and defaults:

       ```javascript
        {
            // is the body hidden (not to be rendered)?
            hidden: false,
            // is the body `dynamic`, `kinematic` or `static`?
            // http://www.box2d.org/manual.html#_Toc258082973
            treatment: 'dynamic',
            // body mass
            mass: 1.0,
            // body restitution. How "bouncy" is it?
            restitution: 1.0,
            // what is its coefficient of friction with another surface with COF = 1?
            cof: 0.8,
            // what is the view object (mixed) that should be used when rendering?
            view: null
        }
       ```
     *
     * Factory function for creating Bodies.
     *
     * Visit [the PhysicsJS wiki on Bodies](https://github.com/wellcaffeinated/PhysicsJS/wiki/Bodies)
     * for usage documentation.
     **/
    Physics.body = Decorator('body', {

        /** belongs to: Physics.body
         * class Body
         *
         * The base class for bodies created by [[Physics.body]] factory function.
         **/

        /** internal
         * Body#init( options )
         * - options (Object): The configuration options passed by the factory
         *
         * Initialization. Internal use.
         **/
        init: function( options ){

            var vector = Physics.vector;

            /** related to: Physics.util.options
             * Body#options( options ) -> Object
             * - options (Object): The options to set as an object
             * + (Object): The options
             *
             * Set options on this instance.
             *
             * Access options directly from the options object.
             *
             * Example:
             *
             * ```javascript
             * this.options.someOption;
             * ```
             *
             **/
            // all options get copied onto the body.
            this.options = Physics.util.options( defaults, this );
            this.options( options );

            /**
             * Body#state
             *
             * The physical state container.
             *
             * - ``this.state.pos`` ([[Physics.vector]]) The position vector.
             * - ``this.state.vel`` ([[Physics.vector]]) The velocity vector.
             * - ``this.state.acc`` ([[Physics.vector]]) The acceleration vector.
             * - ``this.state.angular.pos`` ([[Number]]) The angular position (in radians, positive is clockwise starting along the x axis)
             * - ``this.state.angular.vel`` ([[Number]]) The angular velocity
             * - ``this.state.angular.acc`` ([[Number]]) The angular acceleration
             *
             * Properties from the previous timestep are stored in:
             * ```javascript
             * this.state.old; // .pos, .vel, ...
             * ```
             **/
            this.state = {
                pos: vector( this.x, this.y ),
                vel: vector( this.vx, this.vy ),
                acc: vector(),
                angular: {
                    pos: this.angle || 0.0,
                    vel: this.angularVelocity || 0.0,
                    acc: 0.0
                },
                old: {
                    pos: vector(),
                    vel: vector(),
                    acc: vector(),
                    angular: {
                        pos: 0.0,
                        vel: 0.0,
                        acc: 0.0
                    }
                }
            };

            // cleanup
            delete this.x;
            delete this.y;
            delete this.vx;
            delete this.vy;
            delete this.angle;
            delete this.angularVelocity;

            if (this.mass === 0){
                throw "Error: Bodies must have non-zero mass";
            }

            /**
             * Body#uid = Number
             *
             * The unique id for the body
             **/
            this.uid = uidGen++;

            /** related to: Physics.geometry
             * Body#geometry
             *
             * The geometry for this body.
             *
             * By default it is a `point` geometry which gets overridden.
             **/
            this.geometry = Physics.geometry('point');

            /**
             * Body#mass = 1.0
             *
             * The mass.
             **/

             /**
              * Body#restitution = 1.0
              *
              * The restitution.
              *
              * This is the "bounciness" of the body.
              * It's a number between `0` and `1`.
              *
              * A restitution of 1 is the bounciest.
              *
              * A restitution of 0 is not bouncy.
              *
              * When colliding the restitutions of bodies are
              * multiplied together to get the restitution between two
              * bodies.
              *
              **/

              /**
               * Body#cof = 0.8
               *
               * The coefficient of friction of the body.
               *
               * It's how much "slide" it has during collisions.
               *
               * A `cof` of `0` will really slidy.
               *
               * A `cof` of `1` has no slide.
               *
               * This is a very simplistic implementation at the moment.
               * What would be better is to have both static and kinetic
               * friction. But that's not done yet.
               **/

               /**
                * Body#treatment = String
                *
                * How the body is treated by the simulation.
                *
                * The body can be `dynamic`, `kinematic` or `static` as
                * described by the [analogous box2d docs](http://www.box2d.org/manual.html#_Toc258082973).
                *
                * * _dynamic_ bodies are treated "normally". They are integrated, and collide, and all that.
                * * _kinematic_ bodies are bodies that move at a specified velocity. Other bodies collide with them, but they don't bounce off of other bodies.
                * * _static_ bodies just stand still. They are like obstacles.
                **/

                /**
                 * Body#hidden = false
                 *
                 * Determines whether the body should be hidden by the renderer.
                 **/

                /** related to: Physics.renderer
                 * Body#view = it_depends
                 *
                 * Storage for use by the renderer.
                 *
                 * The type of renderer will put different things in the view property.
                 * Basically, this is how the body "looks". It could be a HTMLElement, or
                 * an Image, etc...
                 *
                 * If your body changes appearance (shape), you should modify this somehow
                 * otherwise the renderer will keep using this same view. If you're letting
                 * the renderer create the view for you, just set this to `undefined` if the
                 * body gets modified in shape during the simulation.
                 **/

                /** related to: Physics.renderer
                 * Body#style
                 *
                 * The styles the renderer should use for creating the view.
                 *
                 * The styles depend on the renderer. See [[Renderer#createView]] for style options.
                 **/
        },

        /**
         * Body#setWorld( world ) -> this
         * - world (Object): The world (or null)
         *
         * Set which world to apply to.
         *
         * Usually this is called internally. Shouldn't be a need to call this yourself usually.
         **/
        setWorld: function( world ){

            if ( this.disconnect && this._world ){
                this.disconnect( this._world );
            }

            this._world = world;

            if ( this.connect && world ){
                this.connect( world );
            }

            return this;
        },

        /**
         * Body#accelerate( acc ) -> this
         * - acc (Physics.vector): The acceleration vector
         *
         * Accelerate the body by adding supplied vector to its current acceleration
         **/
        accelerate: function( acc ){

            if ( this.treatment === 'dynamic' ){
                this.state.acc.vadd( acc );
            }

            return this;
        },

        /**
         * Body#applyForce( force[, p] ) -> this
         * - force (Vectorish): The force vector
         * - p (Vectorish): The point vector from the COM at which to apply the force
         *
         * Apply a force at center of mass, or at point `p` relative to the center of mass
         **/
        applyForce: function( force, p ){

            if ( this.treatment !== 'dynamic' ){
                return this;
            }

            var scratch = Physics.scratchpad()
                ,r = scratch.vector()
                ,state
                ;

            // if no point at which to apply the force... apply at center of mass
            if ( p && this.moi ){
                
                // apply torques
                state = this.state;
                r.clone( p );
                // r cross F
                this.state.angular.acc -= r.cross( force ) / this.moi;
            }

            this.accelerate( r.clone( force ).mult( 1/this.mass ) );

            scratch.done();
            return this;
        },

        /** related to: Physics.aabb
         * Body#aabb() -> Object
         * + (Object): The aabb of this body
         *
         * Get the Axis aligned bounding box for the body in its current position and rotation
         **/
        aabb: function(){

            var angle = this.state.angular.pos
                ,aabb = this.geometry.aabb( angle )
                ;

            aabb.x += this.state.pos.x;
            aabb.y += this.state.pos.y;

            return aabb;
        },

        /**
         * Body#recalc() -> this
         *
         * Recalculate properties.
         *
         * Intended to be overridden by subclasses. Call when body physical properties are changed.
         **/
        recalc: function(){
            // override to recalculate properties
            return this;
        }
    });

}());


// ---
// inside: src/core/geometry.js

(function(){
    /** related to: Physics.util.decorator
     * Physics.geometry( name[, options] ) -> Geometry
     * - name (String): The name of the geometry to create
     * - options (Object): The configuration for that geometry ( depends on geometry ).
     *
     * Factory function for creating Geometries.
     *
     * Visit [the PhysicsJS wiki on Geometries](https://github.com/wellcaffeinated/PhysicsJS/wiki/Geometries)
     * for usage documentation.
     **/
    Physics.geometry = Decorator('geometry', {

        /** belongs to: Physics.geometry
         * class Geometry
         *
         * The base class for geometries created by [[Physics.geometry]] factory function.
         **/

        /** internal
         * Geometry#init( options )
         * - options (Object): The configuration options passed by the factory
         * 
         * Initialization. Internal use.
         **/
        init: function( options ){

            /** related to: Physics.util.options
             * Geometry#options( options ) -> Object
             * - options (Object): The options to set as an object
             * + (Object): The options
             * 
             * Set options on this instance. 
             * 
             * Access options directly from the options object.
             * 
             * Example:
             *
             * ```javascript
             * this.options.someOption;
             * ```
             * 
             **/
            this.options = Physics.util.options();
            this.options( options );

            this._aabb = new Physics.aabb();
        },
        
        /** related to: Physics.aabb
         * Geometry#aabb( angle ) -> Object
         * - angle (Number): The angle to rotate the geometry
         * + (Object): Bounding box values
         * 
         * Get axis-aligned bounding box for this object (rotated by angle if specified).
         **/
        aabb: function( angle ){

            return Physics.aabb.clone(this._aabb);
        },

        /**
         * Geometry#getFarthestHullPoint( dir[, result] ) -> Physics.vector
         * - dir (Physics.vector): Direction to look
         * - result (Physics.vector): A vector to write result to. Speeds up calculations.
         * + (Physics.vector): The farthest hull point in local coordinates
         * 
         * Get farthest point on the hull of this geometry
         * along the direction vector `dir`
         * returns local coordinates. Replaces result if provided.
         *
         * Assume all coordinates are relative to the geometry 
         * centroid (IE: in the body frame).
         * 
         * This should take a direction vector then it should
         * calculate the location (in that frame of reference)
         * of the point on the perimeter (hull) if you traveled
         * in a straight line from the centroid in the provided
         * direction. The result should be returned/set just like
         * it is in the other geometries.
         **/
        getFarthestHullPoint: function( dir, result ){

            result = result || Physics.vector();

            // not implemented.
            return result.set( 0, 0 );
        },

        /** related to: Geometry#getFarthestHullPoint
         * Geometry#getFarthestCorePoint( dir[, result] ) -> Physics.vector
         * - dir (Physics.vector): Direction to look
         * - result (Physics.vector): A vector to write result to. Speeds up calculations.
         * + (Physics.vector): The farthest hull point in local coordinates
         * 
         * Get farthest point on the core shape of this geometry
         * along the direction vector `dir`
         * returns local coordinates. Replaces result if provided.
         *
         * This does almost the same thing as [[Geometry#getFarthestHullPoint]]
         * but shrinks the shape by subtracting "margin" from it.
         * Return the position of the point on the "core" shape.
         **/
        getFarthestCorePoint: function( dir, result, margin ){

            result = result || Physics.vector();

            // not implemented.
            return result.set( 0, 0 );
        }
    });

}());

// ---
// inside: src/core/geometry-helpers.js

/*
 * Geometry helper functions
 */

/**
 * Physics.geometry.isPolygonConvex( hull ) -> Boolean
 * - hull (Array): Array of ([[Vectorish]]) vertices
 * + (Boolean): `true` if the polygon is convex. `false` otherwise.
 * 
 * Determine if polygon hull is convex
 **/
Physics.geometry.isPolygonConvex = function( hull ){

    var scratch = Physics.scratchpad()
        ,prev = scratch.vector()
        ,next = scratch.vector()
        ,tmp = scratch.vector()
        ,ret = true
        ,sign = false
        ,l = hull.length
        ;

    if ( !hull || !l ){
        return false;
    }

    if ( l < 3 ){
        // it must be a point or a line...
        // which are convex
        scratch.done();
        return ret;
    }

    prev.clone( hull[ 0 ] ).vsub( tmp.clone( hull[ l - 1 ] ) );

    // loop over the edges of the hull and construct vectors of the current
    // edge and retain the last edge
    // add two to the length to do a full cycle
    for ( var i = 1; i <= l; ++i ){
        
        next.clone( hull[ i % l ] ).vsub( tmp.clone( hull[ (i - 1) % l ] ) );

        if ( sign === false ){

            // first check the sign of the first cross product
            sign = prev.cross( next );

        } else if ( (sign > 0) ^ (prev.cross( next ) > 0) ){
        
            // if the cross products are different signs it's not convex
            ret = false;
            break;
        }

        // remember the last edge
        next.swap( prev );
    }

    scratch.done();
    return ret;
};

/**
 * Physics.geometry.getPolygonMOI( hull ) -> Number
 * - hull (Array): Array of ([[Vectorish]]) vertices
 * + (Number): The polygon's moment of inertia
 * 
 * Gets the moment of inertia of a convex polygon
 *
 * See [List of moments of inertia](http://en.wikipedia.org/wiki/List_of_moments_of_inertia)
 * for more information.
 * 
 * _Note_: we make the following assumpations: 
 * * mass is unitary (== 1)
 * * axis of rotation is the origin
 **/
Physics.geometry.getPolygonMOI = function( hull ){

    var scratch = Physics.scratchpad()
        ,prev = scratch.vector()
        ,next = scratch.vector()
        ,num = 0
        ,denom = 0
        ,tmp
        ,l = hull.length
        ;

    if ( l < 2 ){
        // it must be a point
        // moi = 0
        scratch.done();
        return 0;
    }

    if ( l === 2 ){
        // it's a line
        // get length squared
        tmp = next.clone( hull[ 1 ] ).distSq( prev.clone( hull[ 0 ] ) );
        scratch.done();
        return tmp / 12;
    }

    prev.clone( hull[ 0 ] );

    for ( var i = 1; i < l; ++i ){
        
        next.clone( hull[ i ] );

        tmp = Math.abs( next.cross( prev ) );
        num += tmp * ( next.normSq() + next.dot( prev ) + prev.normSq() );
        denom += tmp;

        prev.swap( next );
    }

    scratch.done();
    return num / ( 6 * denom );
};

/**
 * Physics.geometry.isPointInPolygon( pt, hull ) -> Boolean
 * - pt (Vectorish): The point to test
 * - hull (Array): Array of ([[Vectorish]]) vertices
 * + (Boolean): `true` if point `pt` is inside the polygon
 * 
 * Check if point is inside polygon hull.
 **/
Physics.geometry.isPointInPolygon = function( pt, hull ){

    var scratch = Physics.scratchpad()
        ,point = scratch.vector().clone( pt )
        ,prev = scratch.vector()
        ,next = scratch.vector()
        ,ang = 0
        ,l = hull.length
        ;

    if ( l < 2 ){
        // it's a point...
        ang = point.equals( prev.clone( hull[ 0 ] ));
        scratch.done();
        return ang;
    }

    if ( l === 2 ){
        // it's a line
        ang = point.angle( prev.clone( hull[ 0 ] ));
        ang += point.angle( prev.clone( hull[ 1 ] ));
        scratch.done();
        return ( Math.abs(ang) === Math.PI );
    }

    prev.clone( hull[ 0 ] ).vsub( point );

    // calculate the sum of angles between vector pairs
    // from point to vertices
    for ( var i = 1; i <= l; ++i ){
        
        next.clone( hull[ i % l ] ).vsub( point );
        ang += next.angle( prev );
        prev.swap( next );
    }

    scratch.done();
    return ( Math.abs(ang) > 1e-6 );
};

/**
 * Physics.geometry.getPolygonArea( hull ) -> Number
 * - hull (Array): Array of ([[Vectorish]]) vertices
 * + (Number): The area (positive for clockwise ordering)
 * 
 * Get the signed area of the polygon.
 **/
Physics.geometry.getPolygonArea = function getPolygonArea( hull ){

    var scratch = Physics.scratchpad()
        ,prev = scratch.vector()
        ,next = scratch.vector()
        ,ret = 0
        ,l = hull.length
        ;

    if ( l < 3 ){
        // it must be a point or a line
        // area = 0
        scratch.done();
        return 0;
    }

    prev.clone( hull[ l - 1 ] );

    for ( var i = 0; i < l; ++i ){
        
        next.clone( hull[ i ] );

        ret += prev.cross( next );

        prev.swap( next );
    }

    scratch.done();
    return ret / 2;
};

/**
 * Physics.geometry.getPolygonCentroid( hull ) -> Physics.vector
 * - hull (Array): Array of ([[Vectorish]]) vertices
 * + (Physics.vector): The centroid
 * 
 * Get the coordinates of the centroid.
 **/
Physics.geometry.getPolygonCentroid = function getPolygonCentroid( hull ){

    var scratch = Physics.scratchpad()
        ,prev = scratch.vector()
        ,next = scratch.vector()
        ,ret = Physics.vector()
        ,tmp
        ,l = hull.length
        ;

    if ( l < 2 ){
        // it must be a point
        scratch.done();
        return Physics.vector( hull[0] );
    }

    if ( l === 2 ){
        // it's a line
        // get the midpoint
        scratch.done();
        return Physics.vector((hull[ 1 ].x + hull[ 0 ].x)/2, (hull[ 1 ].y + hull[ 0 ].y)/2 );
    }

    prev.clone( hull[ l - 1 ] );

    for ( var i = 0; i < l; ++i ){
        
        next.clone( hull[ i ] );

        tmp = prev.cross( next );
        prev.vadd( next ).mult( tmp );
        ret.vadd( prev );

        prev.swap( next );
    }

    tmp = 1 / (6 * Physics.geometry.getPolygonArea( hull ));

    scratch.done();
    return ret.mult( tmp );
};

/**
 * Physics.geometry.nearestPointOnLine( pt, linePt1, linePt2 ) -> Physics.vector
 * - pt (Vectorish): The point
 * - linePt1 (Vectorish): The first endpoint of the line
 * - linePt2 (Vectorish): The second endpoint of the line
 * + (Vector): The closest point
 * 
 * Get the closest point on a discrete line to specified point.
 **/
Physics.geometry.nearestPointOnLine = function nearestPointOnLine( pt, linePt1, linePt2 ){

    var scratch = Physics.scratchpad()
        ,p = scratch.vector().clone( pt )
        ,A = scratch.vector().clone( linePt1 ).vsub( p )
        ,L = scratch.vector().clone( linePt2 ).vsub( p ).vsub( A )
        ,lambdaB
        ,lambdaA
        ;

    if ( L.equals(Physics.vector.zero) ){
        // oh.. it's a zero vector. So A and B are both the closest.
        // just use one of them
        scratch.done();
        return Physics.vector( linePt1 );
    }

    lambdaB = - L.dot( A ) / L.normSq();
    lambdaA = 1 - lambdaB;

    if ( lambdaA <= 0 ){
        // woops.. that means the closest simplex point
        // isn't on the line it's point B itself
        scratch.done();
        return Physics.vector( linePt2 );
    } else if ( lambdaB <= 0 ){
        // vice versa
        scratch.done();
        return Physics.vector( linePt1 );
    }

    // guess we'd better do the math now...
    p = Physics.vector( linePt2 ).mult( lambdaB ).vadd( A.clone( linePt1 ).mult( lambdaA ) );
    scratch.done();
    return p;
};



// ---
// inside: src/core/integrator.js

(function(){

    var defaults = {

        // drag applied during integration
        // 0 means vacuum
        // 0.9 means molasses
        drag: 0
    };

    /** related to: Physics.util.decorator
     * Physics.integrator( name[, options] ) -> Integrator
     * - name (String): The name of the integrator to create
     * - options (Object): The configuration for that integrator ( depends on integrator ).
       Available options and defaults:
       
       ```javascript
        {
            // drag applied during integration
            // 0 means vacuum
            // 0.9 means molasses
            drag: 0
        }
       ```
     *
     * Factory function for creating Integrators.
     *
     * Visit [the PhysicsJS wiki on Integrators](https://github.com/wellcaffeinated/PhysicsJS/wiki/Integrators)
     * for usage documentation.
     **/
    Physics.integrator = Decorator('integrator', {

        /** belongs to: Physics.integrator
         * class Integrator
         *
         * The base class for integrators created by [[Physics.integrator]] factory function.
         **/

        /** internal
         * Integrator#init( options )
         * - options (Object): The configuration options passed by the factory
         * 
         * Initialization. Internal use.
         **/
        init: function( options ){
            
            /** related to: Physics.util.options
             * Integrator#options( options ) -> Object
             * - options (Object): The options to set as an object
             * + (Object): The options
             * 
             * Set options on this instance. 
             * 
             * Access options directly from the options object.
             * 
             * Example:
             *
             * ```javascript
             * this.options.someOption;
             * ```
             * 
             **/
            this.options = Physics.util.options( defaults );
        },

        /**
         * Integrator#setWorld( world ) -> this
         * - world (Object): The world (or null)
         *
         * Set which world to apply to.
         *
         * Usually this is called internally. Shouldn't be a need to call this yourself usually.
         **/
        setWorld: function( world ){

            if ( this.disconnect && this._world ){
                this.disconnect( this._world );
            }

            this._world = world;

            if ( this.connect && world ){
                this.connect( world );
            }

            return this;
        },

        /**
         * Integrator#integrate( bodies, dt ) -> this
         * - bodies (Array): List of bodies to integrate
         * - dt (Number): Timestep size
         * 
         * Integrate bodies by timestep.
         *
         * Will emit `integrate:velocities` and `integrate:positions`
         * events on the world.
         **/
        integrate: function( bodies, dt ){

            var world = this._world;

            this.integrateVelocities( bodies, dt );
            
            if ( world ){
                world.emit('integrate:velocities', {
                    bodies: bodies,
                    dt: dt
                });
            }

            this.integratePositions( bodies, dt );
            
            if ( world ){
                world.emit('integrate:positions', {
                    bodies: bodies,
                    dt: dt
                });
            }

            return this;
        },

        /**
         * Integrator#connect( world )
         * - world (Physics.world): The world to connect to
         * 
         * Connect to a world.
         *
         * Extend this when creating integrators if you need to specify pubsub management.
         * Automatically called when added to world by the [[Integrator#setWorld]] method.
         **/
        connect: null,

        /**
         * Integrator#disconnect( world )
         * - world (Physics.world): The world to disconnect from
         * 
         * Disconnect from a world.
         *
         * Extend this when creating integrators if you need to specify pubsub management.
         * Automatically called when added to world by the [[Integrator#setWorld]] method.
         **/
        disconnect: null,

        /**
         * Integrator#integrateVelocities( bodies, dt )
         * - bodies (Array): List of bodies to integrate
         * - dt (Number): Timestep size
         * 
         * Just integrate the velocities.
         *
         * Should be overridden when creating integrators.
         **/
        integrateVelocities: function( bodies, dt ){

            throw 'The integrator.integrateVelocities() method must be overriden';
        },

        /**
         * Integrator#integratePositions( bodies, dt )
         * - bodies (Array): List of bodies to integrate
         * - dt (Number): Timestep size
         * 
         * Just integrate the positions.
         *
         * Called after [[Integrator#integrateVelocities]].
         * 
         * Should be overridden when creating integrators.
         **/
        integratePositions: function( bodies, dt ){

            throw 'The integrator.integratePositions() method must be overriden';
        }
    });

}());

// ---
// inside: src/core/renderer.js

(function(){

    var defaults = {
        // draw meta data (fps, steps, etc)
        meta: false,
        // refresh rate of meta info
        metaRefresh: 200,

        // width of viewport
        width: 600,
        // height of viewport
        height: 600
    };

    /** related to: Physics.util.decorator
     * Physics.renderer( name[, options] ) -> Renderer
     * - name (String): The name of the renderer to create
     * - options (Object): The configuration for that renderer ( depends on renderer ).
       Available options and defaults:

       ```javascript
        {
            // draw meta data (fps, steps, etc)
            meta: false,
            // refresh rate of meta info
            metaRefresh: 200,

            // width of viewport
            width: 600,
            // height of viewport
            height: 600
        }
       ```
     *
     * Factory function for creating Renderers.
     *
     * Visit [the PhysicsJS wiki on Renderers](https://github.com/wellcaffeinated/PhysicsJS/wiki/Renderers)
     * for usage documentation.
     **/
    Physics.renderer = Decorator('renderer', {

        /** belongs to: Physics.renderer
         * class Renderer
         *
         * The base class for renderers created by [[Physics.renderer]] factory function.
         **/

        /** internal
         * Renderer#init( options )
         * - options (Object): The configuration options passed by the factory
         *
         * Initialization. Internal use.
         **/
        init: function( options ){

            var el = typeof options.el === 'string' ? document.getElementById(options.el) : options.el
                ;

            this.options = Physics.util.extend({}, defaults, options);

            this.el = el ? el : document.body;
            this.drawMeta = Physics.util.throttle( Physics.util.bind(this.drawMeta, this), this.options.metaRefresh );
        },

        /**
         * Renderer#setWorld( world ) -> this
         * - world (Object): The world (or null)
         *
         * Set which world to apply to.
         *
         * Usually this is called internally. Shouldn't be a need to call this yourself usually.
         **/
        setWorld: function( world ){

            if ( this.disconnect && this._world ){
                this.disconnect( this._world );
            }

            this._world = world;

            if ( this.connect && world ){
                this.connect( world );
            }

            return this;
        },

        /**
         * Renderer#render( bodies, meta ) -> this
         * - bodies (Array): Array of bodies in the world (by reference!)
         * - meta (Object): meta information
         *
         * Render the world bodies and meta. Called by world.render()
         **/
        render: function( bodies, meta ){

            var body
                ,view
                ,pos
                ;

            if (this.beforeRender){

                this.beforeRender();
            }

            this._world.emit('beforeRender', {
                renderer: this,
                bodies: bodies,
                meta: meta
            });

            if (this.options.meta){
                this.drawMeta( meta );
            }

            this._interpolateTime = meta.interpolateTime;

            for ( var i = 0, l = bodies.length; i < l; ++i ){

                body = bodies[ i ];
                view = body.view || ( body.view = this.createView(body.geometry, body.styles) );

                if ( !body.hidden ){
                    this.drawBody( body, view );
                }
            }

            return this;
        },

        /**
         * Renderer#createView( geometry, styles ) -> Mixed
         * - geometry (Geometry): geometry The geometry
         * - styles (Object|String): The styles configuration
         * + (Mixed): Whatever the renderer needs to render the body.
         *
         * Create a view for the specified geometry.
         *
         * The view is used to render the body. It is a cached version
         * of the body that gets moved and rotated according to the simulation.
         *
         * The styles are used to modify the appearance of the view.
         * They depend on the renderer.
         *
         * Override this when creating renderers.
         **/
        createView: function( geometry, styles ){

            // example:
            // var el = document.createElement('div');
            // el.style.height = geometry.height + 'px';
            // el.style.width = geometry.width + 'px';
            // return el;
            throw 'You must override the renderer.createView() method.';
        },

        /**
         * Renderer#drawMeta( meta )
         * - meta (Object): The meta data
         *
         * Draw the meta data.
         *
         * The meta data will look like this:
         *
         * ```javascript
         * meta = {
         *     fps: 60, // the frames per second
         *     ipf: 4 // the number of iterations per frame
         * };
         * ```
         *
         * Override this when creating renderers.
         **/
        drawMeta: function( meta ){

            // example:
            // this.els.fps.innerHTML = meta.fps.toFixed(2);
            // this.els.steps.innerHTML = meta.steps;
            throw 'You must override the renderer.drawMeta() method.';
        },

        /**
         * Renderer#drawBody( body, view )
         * - body (Object): The body to draw
         * - view (Object): The view for the body
         *
         * Draw specified body using specified view.
         *
         * Override this when creating renderers.
         **/
        drawBody: function( body, view ){

            // example (pseudocode):
            // view.angle = body.state.angle
            // view.position = body.state.position
            throw 'You must override the renderer.drawBody() method.';
        }


    });

}());


// ---
// inside: src/core/world.js

/** related to: Physics
 * class Physics.world
 *
 * The world class and factory function.
 *
 * Use [[Physics]] to create worlds.
 **/
(function(){

    var execCallbacks = function execCallbacks( fns, scope, args ){

        var fn
            ,ret
            ,cb = function(){
                return execCallbacks( fns, scope, args );
            }
            ;

        while ( fn = fns.shift() ){

            ret = fn.apply(scope, args);

            if (ret && ret.then){
                return ret.then( cb );
            }
        }
    };

    var defaults = {

        // default timestep
        timestep: 1000.0 / 120,
        // maximum number of iterations per step
        maxIPF: 16,
        webworker: false, // NOT YET IMPLEMENTED

        // default integrator
        integrator: 'verlet'
    };

    // begin world definitions

    /** alias of: Physics
     * new Physics.world([options, fn(world, Physics)])
     * - options (Object): configuration options (see description)
     * - fn (Function|Array): Callback function or array of callbacks called with this === world
     * - world (Physics.world): The current world created
     * - Physics (Physics): The Physics namespace
     *
     * World Constructor.
     *
     * Use [[Physics]] to create worlds.
     *
     * Configuration options and defaults:
     *
     * ```javascript
     * {
     *     // default timestep
     *     timestep: 1000.0 / 120,
     *     // maximum number of iterations per step
     *     maxIPF: 16,
     *     // default integrator
     *     integrator: 'verlet'
     * }
     * ```
     *
     * If called with an array of functions, and any functions
     * return a [promise-like object](http://promises-aplus.github.io/promises-spec/),
     * each remaining callback will be called only when that promise is resolved.
     *
     * Example:
     *
     * ```javascript
     * // hypothetical resources need to be loaded...
     * Physics( cfg, [
     *     function( world ){
     *         var dfd = $.Deferred()
     *             ,images = []
     *             ,toLoad = myImages.length
     *             ,callback = function(){
     *                 toLoad--;
     *                 // wait for all images to be loaded
     *                 if ( toLoad <= 0 ){
     *                     dfd.resolve();
     *                 }
     *             }
     *             ;
     *
     *         // load images
     *         $.each(myImages, function( src ){
     *             var img = new Image();
     *             img.onload = callback;
     *             img.src = src;
     *         });
     *
     *         return dfd.promise();
     *     },
     *     function( world ){
     *         // won't be executed until images are loaded
     *         // initialize world... etc...
     *     }
     * ]);
     * ```
     **/
    var World = function World( cfg, fn ){

        // allow creation of world without "new"
        if (!(this instanceof World)){
            return new World( cfg, fn );
        }

        this.init( cfg, fn );
    };

    // extend pubsub
    World.prototype = Physics.util.extend({}, Physics.util.pubsub.prototype, {

        /** internal, see: new Physics.world
         * Physics.world#init( [options, fn(world, Physics)] )
         * - options (Object): configuration options (see constructor)
         * - fn (Function|Array): Callback function or array of callbacks called with this === world
         *
         * Initialization
         **/
        init: function( cfg, fn ){

            var self = this;

            if ( Physics.util.isFunction( cfg ) || Physics.util.isArray( cfg ) ){
                fn = cfg;
                cfg = {};
            }

            this._meta = {
               // statistics (fps, etc)
               fps: 0,
               ipf: 0
            };
            this._bodies = [];
            this._behaviors = [];
            this._integrator = null;
            this._renderer = null;
            this._paused = false;
            this._warp = 1;
            this._time = 0;

            // set options
            this.options = Physics.util.options( defaults );
            this.options.onChange(function( opts ){

                // set timestep
                self.timestep( opts.timestep );
            });
            this.options( cfg );

            // add integrator
            this.add(Physics.integrator( this.options.integrator ));

            // apply the callback function
            if ( Physics.util.isFunction( fn ) ){

                execCallbacks([ fn ], this, [this, Physics] );

            } else if ( Physics.util.isArray( fn ) ){

                execCallbacks(fn, this, [this, Physics] );
            }
        },

        /**
         * Physics.world#options( cfg ) -> Object
         * - options (Object): configuration options (see constructor)
         * + (Object): Options container
         *
         * Set config options. Also access options by `.options.<option>`.
         **/
        options: null,

        /** chainable
         * Physics.world#add( things ) -> this
         * - things (Object|Array): The thing, or array of things (body, behavior, integrator, or renderer) to add.
         *
         * Multipurpose add method. Add one or many bodies, behaviors, integrators, renderers...
         **/
        add: function( arg ){

            var i = 0
                ,len = arg && arg.length || 0
                ,thing = len ? arg[ 0 ] : arg
                ;

            if ( !thing ){
                return this;
            }

            // we'll either cycle through an array
            // or just run this on the arg itself
            do {
                switch (thing.type){

                    case 'behavior':
                        this.addBehavior(thing);
                    break; // end behavior

                    case 'integrator':
                        this.integrator(thing);
                    break; // end integrator

                    case 'renderer':
                        this.renderer(thing);
                    break; // end renderer

                    case 'body':
                        this.addBody(thing);
                    break; // end body

                    default:
                        throw 'Error: failed to add item of unknown type "'+ thing.type +'" to world';
                    // end default
                }

            } while ( ++i < len && (thing = arg[ i ]) );

            return this;
        },

        /** chainable
         * Physics.world#remove( things ) -> this
         * - things (Object|Array): The thing, or array of things (body, behavior, integrator, or renderer) to remove.
         *
         * Multipurpose remove method. Remove one or many bodies, behaviors, integrators, renderers...
         **/
        remove: function( arg ){

            var i = 0
                ,len = arg && arg.length || 0
                ,thing = len ? arg[ 0 ] : arg
                ;

            if ( !thing ){
                return this;
            }

            // we'll either cycle through an array
            // or just run this on the arg itself
            do {
                switch (thing.type){

                    case 'behavior':
                        this.removeBehavior( thing );
                    break; // end behavior

                    case 'integrator':
                        if (thing === this._integrator){
                            this.integrator( null );
                        }
                    break; // end integrator

                    case 'renderer':
                        if (thing === this._renderer){
                            this.renderer( null );
                        }
                    break; // end renderer

                    case 'body':
                        this.removeBody( thing );
                    break; // end body

                    default:
                        throw 'Error: failed to remove item of unknown type "'+ thing.type +'" from world';
                    // end default
                }

            } while ( ++i < len && (thing = arg[ i ]) );

            return this;
        },

        /** chainable
         * Physics.world#has( thing ) -> Boolean
         * - thing (Object): The thing to test
         * + (Boolean): `true` if thing is in the world, `false` otherwise.
         *
         * Determine if a thing has been added to world.
         **/
        has: function( thing ){

            var arr
                ,i
                ,l
                ;

            if ( !thing ){
                return false;
            }

            switch (thing.type){

                case 'behavior':
                    arr = this._behaviors;
                break; // end behavior

                case 'integrator':
                return ( this._integrator === thing );
                // end integrator

                case 'renderer':
                return ( this._renderer === thing );
                // end renderer

                case 'body':
                    arr = this._bodies;
                break; // end body

                default:
                    throw 'Error: unknown type "'+ thing.type +'"';
                // end default
            }

            // check array
            return (Physics.util.indexOf( arr, thing ) > -1);
        },

        /** chainable
         * Physics.world#integrator( [integrator] ) -> Integrator|this
         * - integrator (Integrator): The integrator to set on the world
         * + (Integrator): The currently set integrator if `integrator` not specified
         * + (this): for chaining if `integrator` specified
         *
         * Get or Set the integrator
         **/
        integrator: function( integrator ){

            if ( integrator === undefined ){
                return this._integrator;
            }

            // do nothing if already added
            if ( this._integrator === integrator ){
                return this;
            }

            if ( this._integrator ){

                this._integrator.setWorld( null );

                this.emit( 'remove:integrator', {
                    integrator: this._integrator
                });
            }

            if ( integrator ){
                this._integrator = integrator;
                this._integrator.setWorld( this );

                this.emit( 'add:integrator', {
                    integrator: this._integrator
                });
            }

            return this;
        },

        /** chainable
         * Physics.world#renderer( [renderer] ) -> Renderer|this
         * - renderer (Renderer): The renderer to set on the world
         * + (Renderer): The currently set renderer if `renderer` not specified
         * + (this): for chaining if `renderer` specified
         *
         * Get or Set the renderer
         **/
        renderer: function( renderer ){

            if ( renderer === undefined ){
                return this._renderer;
            }

            // do nothing if renderer already added
            if ( this._renderer === renderer ){
                return this;
            }

            if ( this._renderer ){

                this._renderer.setWorld( null );

                this.emit( 'remove:renderer', {
                    renderer: this._renderer
                });
            }

            if ( renderer ){
                this._renderer = renderer;
                this._renderer.setWorld( this );

                this.emit( 'add:renderer', {
                    renderer: this._renderer
                });
            }

            return this;
        },

        /** chainable
         * Physics.world#timestep( [dt] ) -> Number|this
         * - dt (Number): The time step for the world
         * + (Number): The currently set time step if `dt` not specified
         * + (this): for chaining if `dt` specified
         *
         * Get or Set the timestep
         **/
        timestep: function( dt ){

            if ( dt ){

                this._dt = dt;
                // calculate the maximum jump in time over which to do iterations
                this._maxJump = dt * this.options.maxIPF;

                return this;
            }

            return this._dt;
        },

        /** chainable
         * Physics.world#addBehavior( behavior ) -> this
         * - behavior (Behavior): The behavior to add
         *
         * Add a behavior to the world
         **/
        addBehavior: function( behavior ){

            var notify;

            // don't allow duplicates
            if ( this.has( behavior ) ){
                return this;
            }

            behavior.setWorld( this );
            this._behaviors.push( behavior );

            this.emit( 'add:behavior', {
                behavior: behavior
            });

            return this;
        },

        /**
         * Physics.world#getBehaviors() -> Array
         * + (Array): Array of behaviors
         *
         * Get copied list of behaviors in the world
         **/
        getBehaviors: function(){

            // return the copied array
            return [].concat(this._behaviors);
        },

        /** chainable
         * Physics.world#removeBehavior( behavior ) -> this
         * - behavior (Behavior): The behavior to remove
         *
         * Remove a behavior from the world
         **/
        removeBehavior: function( behavior ){

            var behaviors = this._behaviors;

            if (behavior){

                for ( var i = 0, l = behaviors.length; i < l; ++i ){

                    if (behavior === behaviors[ i ]){

                        behaviors.splice( i, 1 );
                        behavior.setWorld( null );

                        this.emit( 'remove:behavior', {
                            behavior: behavior
                        });

                        break;
                    }
                }
            }

            return this;
        },

        /** chainable
         * Physics.world#addBody( body ) -> this
         * - body (Body): The behavior to add
         *
         * Add a body to the world
         **/
        addBody: function( body ){

            var notify;

            // don't allow duplicates
            if ( this.has( body ) ){
                return this;
            }

            body.setWorld( this );
            this._bodies.push( body );

            this.emit( 'add:body', {
                body: body
            });

            return this;
        },

        /**
         * Physics.world#getBodies() -> Array
         * + (Array): Array of bodies
         *
         * Get copied list of bodies in the world
         **/
        getBodies: function(){

            // return the copied array
            return [].concat(this._bodies);
        },

        /** chainable
         * Physics.world#removeBody( body ) -> this
         * - body (Body): The body to remove
         *
         * Remove a body from the world
         **/
        removeBody: function( body ){

            var bodies = this._bodies;

            if (body){

                for ( var i = 0, l = bodies.length; i < l; ++i ){

                    if (body === bodies[ i ]){

                        bodies.splice( i, 1 );
                        body.setWorld( null );

                        this.emit( 'remove:body', {
                            body: body
                        });

                        break;
                    }
                }
            }

            return this;
        },

        /** see: Physics.query
         * Physics.world#findOne( rules ) -> Body | false
         * Physics.world#findOne( filter(body) ) -> Body | false
         * - rules (Object): Query rules.
         * - filter (Function): Filter function called to check bodies
         * - body (Body): Each body in the world
         *
         * Find first matching body based on query rules.
         **/
        findOne: function( rules ){

            var self = this
                ,fn = (typeof rules === 'function') ? rules : Physics.query( rules )
                ;

            return Physics.util.find( self._bodies, fn ) || false;
        },

        /** see: Physics.query
         * Physics.world#find( rules ) -> Array
         * Physics.world#find( filter(body) ) -> Array
         * - rules (Object): Query rules
         * - filter (Function): Filter function called to check bodies
         * - body (Body): Each body in the world
         *
         * Find all matching bodies based on query rules.
         **/
        find: function( rules ){

            var self = this
                ,fn = (typeof rules === 'function') ? rules : Physics.query( rules )
                ;

            return Physics.util.filter( self._bodies, fn );
        },

        /** internal
         * Physics.world#iterate( dt )
         * - dt (Number): The timestep
         *
         * Do a single iteration.
         **/
        iterate: function( dt ){

            this._integrator.integrate( this._bodies, dt );
        },

        /** chainable
         * Physics.world#step( [now] ) -> this
         * - now (Number): Current unix timestamp
         *
         * Step the world up to specified time or do one step if no time is specified.
         **/
        step: function( now ){

            var time = this._time
                ,warp = this._warp
                ,invWarp = 1 / warp
                ,dt = this._dt
                ,animDt = dt * invWarp
                ,animMaxJump = this._maxJump * invWarp
                ,animDiff
                ,worldDiff
                ,target
                ,meta = this._meta
                ;

            // if it's paused, don't step
            // or if it's the first step...
            if ( this._paused || this._animTime === undefined ){
                this._animTime = now || this._animTime || Physics.util.ticker.now();

                if ( !this._paused ){
                    this.emit('step', meta);
                }
                return this;
            }

            // new time is specified, or just one iteration ahead
            now = now || (this._animTime + animDt);
            // the time between this step and the last
            animDiff = now - this._animTime;

            // if the time difference is too big... adjust
            if ( animDiff > animMaxJump ){
                this._animTime = now - animMaxJump;
                animDiff = animMaxJump;
            }

            // the "world" time between this step and the last. Adjusts for warp
            worldDiff = animDiff * warp;

            // the target time for the world time to step to
            target = time + worldDiff - dt;

            if ( time <= target ){

                while ( time <= target ){
                    // increment world time
                    time += dt;
                    // increment animation time
                    this._animTime += animDt;
                    // record the world time
                    this._time = time;
                    // iterate by one timestep
                    this.iterate( dt );
                }
            }

            // set some meta
            meta.fps = 1000 / (now - this._lastTime); // frames per second
            meta.ipf = (worldDiff / dt).toFixed(2); // iterations per frame
            meta.interpolateTime = dt + target - time;

            // record the time this was called
            this._lastTime = now;

            this.emit('step', meta);
            return this;
        },

        /**
         * Physics.world#warp( [warp] ) -> this|Number
         * - warp (Number): The time warp factor
         *
         * Speed up or slow down the iteration by this factor.
         *
         * Example:
         * ```javascript
         * // slow motion... 10x slower
         * world.warp( 0.01 );
         * ```
         **/
        warp: function( warp ){
            if ( warp === undefined ){
                return this._warp;
            }

            this._warp = warp || 1;

            return this;
        },

        /** chainable
         * Physics.world#render() -> this
         *
         * Render current world state using the renderer
         **/
        render: function(){

            if ( !this._renderer ){
                throw "No renderer added to world";
            }

            this._renderer.render( this._bodies, this._meta );
            this.emit('render', {
                bodies: this._bodies,
                meta: this._meta,
                renderer: this._renderer
            });
            return this;
        },

        /** chainable
         * Physics.world#pause() -> this
         *
         * Pause the world (step calls do nothing).
         **/
        pause: function(){

            this._paused = true;
            this.emit('pause');
            return this;
        },

        /** chainable
         * Physics.world#unpause() -> this
         *
         * Unpause the world (step calls continue as usual).
         **/
        unpause: function(){

            this._paused = false;
            this.emit('unpause');
            return this;
        },

        /**
         * Physics.world#isPaused() -> Boolean
         * + (Boolean): Returns `true` if world is paused, `false` otherwise.
         *
         * Determine if world is paused.
         **/
        isPaused: function(){

            return !!this._paused;
        },

        /**
         * Physics.world#destroy()
         *
         * Destroy the world.
         * (Bwahahahahaha!)
         **/
        destroy: function(){

            var self = this;
            self.pause();

            // notify before
            this.emit('destroy');

            // remove all listeners
            self.off( true );
            // remove everything
            self.remove( self.getBodies() );
            self.remove( self.getBehaviors() );
            self.integrator( null );
            self.renderer( null );
        }

    });

    Physics.world = World;

}());


// ---
// inside: src/integrators/verlet.js

Physics.integrator('verlet', function( parent ){

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
         * class Verlet < Integrator
         *
         * `Physics.integrator('verlet')`.
         *
         * The improved euler integrator.
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

                    // Inspired from https://github.com/soulwire/Coffee-Physics
                    // @licence MIT
                    // 
                    // v = x - ox
                    // x = x + (v + a * dt * dt)

                    // use the velocity in vel if the velocity has been changed manually
                    if (state.vel.equals( state.old.vel ) && body.started()){
                            
                        // Get velocity by subtracting old position from curr position
                        state.vel.clone( state.pos ).vsub( state.old.pos );

                    } else {

                        state.old.pos.clone( state.pos ).vsub( state.vel );
                        // so we need to scale the value by dt so it 
                        // complies with other integration methods
                        state.vel.mult( dt );
                    }

                    // Apply "air resistance".
                    if ( drag ){

                        state.vel.mult( drag );
                    }

                    // Apply acceleration
                    // v += a * dt * dt
                    state.vel.vadd( state.acc.mult( dtdt ) );

                    // normalize velocity 
                    state.vel.mult( 1/dt );

                    // store calculated velocity
                    state.old.vel.clone( state.vel );

                    // Reset accel
                    state.acc.zero();

                    //
                    // Angular components
                    // 

                    if (state.angular.vel === state.old.angular.vel && body.started()){

                        state.angular.vel = (state.angular.pos - state.old.angular.pos);

                    } else {

                        state.old.angular.pos = state.angular.pos - state.angular.vel;
                        state.angular.vel *= dt;
                    }

                    state.angular.vel += state.angular.acc * dtdt;
                    state.angular.vel /= dt;
                    state.old.angular.vel = state.angular.vel;
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

                    // so we need to scale the value by dt so it 
                    // complies with other integration methods
                    state.vel.mult( dt );
                
                    // Store old position.
                    // xold = x
                    state.old.pos.clone( state.pos );

                    state.pos.vadd( state.vel );

                    // normalize velocity 
                    state.vel.mult( 1/dt );

                    // store calculated velocity
                    state.old.vel.clone( state.vel );

                    //
                    // Angular components
                    // 

                    
                    state.angular.vel *= dt;
                
                    state.old.angular.pos = state.angular.pos;

                    state.angular.pos += state.angular.vel;
                    state.angular.vel /= dt;
                    state.old.angular.vel = state.angular.vel;
                }
            }
        }
    };
});



// ---
// inside: src/geometries/point.js

/** alias of: Geometry
 * class PointGeometry < Geometry
 *
 * Physics.geometry('point')
 *
 * The point geometry represents a point.
 **/
Physics.geometry('point', function( parent ){});


// ---
// inside: src/bodies/point.js

/** alias of: Body
 * class PointBody < Body
 *
 * Physics.body('point')
 *
 * The point body represents a point.
 **/
Physics.body('point', function( parent ){
    return {
        init: function( opts ){
            parent.init.call( this, opts );
            this.moi = 0;
        }
    };
});


// ---
// inside: src/geometries/circle.js

/** 
 * class CircleGeometry < Geometry
 *
 * Physics.geometry('circle')
 *
 * The circle geometry has a circular shape.
 *
 * Additional options include:
 * - radius: the radius
 *
 * Example:
 *
 * ```javascript
 * var round = Physics.body('circle', {
 *     x: 30,
 *     y: 20,
 *     radius: 5
 * });
 * ```
 **/
Physics.geometry('circle', function( parent ){

    var defaults = {

        radius: 1.0
    };

    return {

        // extended
        init: function( options ){

            var self = this;
            // call parent init method
            parent.init.call(this, options);

            this.options.defaults( defaults );
            this.options.onChange(function( opts ){
                this.radius = opts.radius;
            });
            this.options( options );

            this._aabb = Physics.aabb();
            this.radius = this.options.radius;
        },
                
        // extended
        aabb: function( angle ){

            var r = this.radius
                ;

            // circles are symetric... so angle has no effect
            if ( this._aabb.hw !== r ){
                // recalculate
                this._aabb = Physics.aabb( -r, -r, r, r );
            }

            return Physics.aabb.clone( this._aabb );
        },

        // extended
        getFarthestHullPoint: function( dir, result ){

            result = result || Physics.vector();

            return result.clone( dir ).normalize().mult( this.radius );
        },

        // extended
        getFarthestCorePoint: function( dir, result, margin ){

            result = result || Physics.vector();

            // we can use the center of the circle as the core object
            // because we can project a point to the hull in any direction
            // ... yay circles!
            // but since the caller is expecting a certain margin... give it
            // to them
            return result.clone( dir ).normalize().mult( this.radius - margin );
        }
    };
});


// ---
// inside: src/geometries/convex-polygon.js

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

                verts.push( Physics.vector( hull[ i ] ).translate( transl ) );
            }

            this._area = Physics.geometry.getPolygonArea( verts );

            this._aabb = false;
            scratch.done();
            return this;
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

            result = result || Physics.vector();

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


// ---
// inside: src/geometries/rectangle.js

/**
 * class RectangleGeometry < Geometry
 *
 * Physics.geometry('rectangle')
 *
 * Geometry for rectangles.
 *
 * Additional config options:
 *
 * - width: The width
 * - height: The height
 *
 * Example:
 *
 * ```javascript
 * var rectGeo = Physics.geometry('rectangle', {
 *     width: 30,
 *     height: 40
 * });
 * ```
 **/
Physics.geometry('rectangle', function( parent ){

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
                /**
                 * RectangleGeometry#width = Number
                 *
                 * The width
                 **/
                self.width = self.options.width || 1;
                /**
                 * RectangleGeometry#height = Number
                 *
                 * The height
                 **/
                self.height = self.options.height || 1;
            });
            this.options( options );
        },

        // extended
        aabb: function( angle ){

            if (!angle){
                return Physics.aabb( this.width, this.height );
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
                ;

            scratch.done();
            return Physics.aabb( xmin, ymin, xmax, ymax );
        },

        // extended
        getFarthestHullPoint: function( dir, result ){

            result = result || new Physics.vector();

            var x = dir.x
                ,y = dir.y
                ;

            x = x === 0 ? 0 : x < 0 ? -this.width * 0.5 : this.width * 0.5;
            y = y === 0 ? 0 : y < 0 ? -this.height * 0.5 : this.height * 0.5;

            return result.set( x, y );
        },

        // extended
        getFarthestCorePoint: function( dir, result, margin ){

            var x, y;
            result = this.getFarthestHullPoint( dir, result );
            x = result.x;
            y = result.y;
            result.x = x === 0 ? 0 : x < 0 ? x + margin : x - margin;
            result.y = y === 0 ? 0 : y < 0 ? y + margin : y - margin;

            return result;
        }
    };
});


// ---
// inside: src/bodies/circle.js

/*
 * @requires geometries/circle
 */
/** 
 * class CircleBody < Body
 *
 * Physics.body('circle')
 *
 * The circle body has a circular shape.
 *
 * Additional options include:
 * - radius: the radius
 *
 * Example:
 *
 * ```javascript
 * var round = Physics.body('circle', {
 *     x: 30,
 *     y: 20,
 *     radius: 5
 * });
 * ```
 **/
Physics.body('circle', function( parent ){

    var defaults = {
        radius: 1.0
    };

    return {

        // extended
        init: function( options ){

            // call parent init method
            parent.init.call(this, options);

            options = Physics.util.extend({}, defaults, options);

            this.geometry = Physics.geometry('circle', {
                radius: options.radius
            });

            this.recalc();
        },

        // extended
        recalc: function(){
            parent.recalc.call(this);
            // moment of inertia
            this.moi = this.mass * this.geometry.radius * this.geometry.radius / 2;
        }
    };
});


// ---
// inside: src/bodies/convex-polygon.js

/*
 * @requires geometries/convex-polygon
 */
 /** 
  * class ConvexPolygonBody < Body
  *
  * Physics.body('convex-polygon')
  *
  * Body for convex polygons. The position of the body is the centroid of the polygon.
  *
  * Additional config options:
  * 
  * - vertices: Array of [[Vectorish]] objects representing the polygon vertices in clockwise (or counterclockwise) order.
  *
  * Example:
  *
  * ```javascript
  * var pentagon = Physics.body('convex-polygon', {
  *     // place the centroid of the polygon at (300, 200)
  *     x: 300,
  *     y: 200,
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
Physics.body('convex-polygon', function( parent ){

    var defaults = {
        
    };

    return {

        // extended
        init: function( options ){

            // call parent init method
            parent.init.call(this, options);

            options = Physics.util.extend({}, defaults, options);

            this.geometry = Physics.geometry('convex-polygon', {
                vertices: options.vertices
            });

            this.recalc();
        },

        // extended
        recalc: function(){
            parent.recalc.call(this);
            // moment of inertia
            this.moi = Physics.geometry.getPolygonMOI( this.geometry.vertices );
        }
    };
});


// ---
// inside: src/bodies/rectangle.js

/*
 * @requires geometries/rectangle
 */
 /**
  * class RectangleBody < Body
  *
  * Physics.body('rectangle')
  *
  * Body for rectangles. The position of the body is the centroid of the rectangle.
  *
  * Additional config options:
  *
  * - width: The width
  * - height: The height
  *
  * Example:
  *
  * ```javascript
  * var rect = Physics.body('rectangle', {
  *     // place the centroid of the rectangle at (300, 200)
  *     x: 300,
  *     y: 200,
  *     width: 30,
  *     height: 40
  * });
  * ```
  **/
Physics.body('rectangle', function( parent ){

    var defaults = {

    };

    return {

        // extended
        init: function( options ){

            // call parent init method
            parent.init.call(this, options);

            options = Physics.util.extend({}, defaults, options);

            this.geometry = Physics.geometry('rectangle', {
                width: options.width,
                height: options.height
            });

            this.recalc();
        },

        // extended
        recalc: function(){
            var w = this.geometry.width;
            var h = this.geometry.height;
            parent.recalc.call(this);
            // moment of inertia
            this.moi = ( w*w + h*h ) * this.mass / 12;
        }
    };
});


// ---
// inside: src/behaviors/attractor.js

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


// ---
// inside: src/behaviors/body-collision-detection.js

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


// ---
// inside: src/behaviors/body-impulse-response.js

/**
 * class BodyImpulseResponseBehavior < Behavior
 *
 * `Physics.behavior('body-impulse-response')`.
 *
 * Responds to collisions by applying impulses.
 *
 * Additional options include:
 * - check: channel to listen to for collisions (default: `collisions:detected`).
 **/
Physics.behavior('body-impulse-response', function( parent ){

    var defaults = {
        // channel to listen to for collisions
        check: 'collisions:detected'
    };

    return {

        // extended
        init: function( options ){

            parent.init.call( this );
            this.options.defaults( defaults );
            this.options( options );
        },

        // no applyTo method
        applyTo: false,

        // extended
        connect: function( world ){

            world.on( this.options.check, this.respond, this );
        },

        // extended
        disconnect: function( world ){

            world.off( this.options.check, this.respond );
        },

        /** internal
         * BodyImpulseResponseBehavior#collideBodes( bodyA, bodyB, normal, point, mtrans, contact )
         * - bodyA (Object): First Body
         * - bodyB (Object): Second body
         * - normal (Vector): Normal vector of the collision surface
         * - point (Vector): Contact point of the collision
         * - mtrans (Vector): Minimum transit vector that is the smallest displacement to separate the bodies
         * - contact (Boolean): Are the bodies in resting contact relative to each other
         *
         * Collide two bodies by modifying their positions and velocities to conserve momentum
         **/
        collideBodies: function(bodyA, bodyB, normal, point, mtrans, contact){

            var fixedA = bodyA.treatment === 'static' || bodyA.treatment === 'kinematic'
                ,fixedB = bodyB.treatment === 'static' || bodyB.treatment === 'kinematic'
                ,scratch = Physics.scratchpad()
                // minimum transit vector for each body
                ,mtv = scratch.vector().clone( mtrans )
                ;

            // do nothing if both are fixed
            if ( fixedA && fixedB ){
                scratch.done();
                return;
            }

            if ( fixedA ){

                // extract bodies
                bodyB.state.pos.vadd( mtv );

            } else if ( fixedB ){

                // extract bodies
                bodyA.state.pos.vsub( mtv );

            } else {

                // extract bodies
                mtv.mult( 0.5 );
                bodyA.state.pos.vsub( mtv );
                bodyB.state.pos.vadd( mtv );
            }

            // inverse masses and moments of inertia.
            // give fixed bodies infinite mass and moi
            var invMoiA = fixedA ? 0 : 1 / bodyA.moi
                ,invMoiB = fixedB ? 0 : 1 / bodyB.moi
                ,invMassA = fixedA ? 0 : 1 / bodyA.mass
                ,invMassB = fixedB ? 0 : 1 / bodyB.mass
                // coefficient of restitution between bodies
                ,cor = contact ? 0 : bodyA.restitution * bodyB.restitution
                // coefficient of friction between bodies
                ,cof = bodyA.cof * bodyB.cof
                // normal vector
                ,n = scratch.vector().clone( normal )
                // vector perpendicular to n
                ,perp = scratch.vector().clone( n ).perp()
                // collision point from A's center
                ,rA = scratch.vector().clone( point )
                // collision point from B's center
                ,rB = scratch.vector().clone( point ).vadd( bodyA.state.pos ).vsub( bodyB.state.pos )
                ,tmp = scratch.vector()
                ,angVelA = bodyA.state.angular.vel
                ,angVelB = bodyB.state.angular.vel
                // relative velocity towards B at collision point
                ,vAB = scratch.vector().clone( bodyB.state.vel )
                        .vadd( tmp.clone(rB).perp().mult( angVelB ) )
                        .vsub( bodyA.state.vel )
                        .vsub( tmp.clone(rA).perp().mult( angVelA ) )
                // break up components along normal and perp-normal directions
                ,rAproj = rA.proj( n )
                ,rAreg = rA.proj( perp )
                ,rBproj = rB.proj( n )
                ,rBreg = rB.proj( perp )
                ,vproj = vAB.proj( n ) // projection of vAB along n
                ,vreg = vAB.proj( perp ) // rejection of vAB along n (perp of proj)
                ,impulse
                ,sign
                ,max
                ,inContact = false
                ;

            // if moving away from each other... don't bother.
            if (vproj >= 0){
                scratch.done();
                return;
            }

            invMoiA = invMoiA === Infinity ? 0 : invMoiA;
            invMoiB = invMoiB === Infinity ? 0 : invMoiB;

            impulse =  - ((1 + cor) * vproj) / ( invMassA + invMassB + (invMoiA * rAreg * rAreg) + (invMoiB * rBreg * rBreg) );
            // vproj += impulse * ( invMass + (invMoi * rreg * rreg) );
            // angVel -= impulse * rreg * invMoi;


            if ( fixedA ){

                // apply impulse
                bodyB.state.vel.vadd( n.mult( impulse * invMassB ) );
                bodyB.state.angular.vel -= impulse * invMoiB * rBreg;

            } else if ( fixedB ){

                // apply impulse
                bodyA.state.vel.vsub( n.mult( impulse * invMassA ) );
                bodyA.state.angular.vel += impulse * invMoiA * rAreg;

            } else {

                // apply impulse
                bodyB.state.vel.vadd( n.mult( impulse * invMassB ) );
                bodyB.state.angular.vel -= impulse * invMoiB * rBreg;
                bodyA.state.vel.vsub( n.mult( invMassA * bodyB.mass ) );
                bodyA.state.angular.vel += impulse * invMoiA * rAreg;
            }

            // inContact = (impulse < 0.004);

            // if we have friction and a relative velocity perpendicular to the normal
            if ( cof && vreg ){


                // TODO: here, we could first assume static friction applies
                // and that the tangential relative velocity is zero.
                // Then we could calculate the impulse and check if the
                // tangential impulse is less than that allowed by static
                // friction. If not, _then_ apply kinetic friction.

                // instead we're just applying kinetic friction and making
                // sure the impulse we apply is less than the maximum
                // allowed amount

                // maximum impulse allowed by kinetic friction
                max = vreg / ( invMassA + invMassB + (invMoiA * rAproj * rAproj) + (invMoiB * rBproj * rBproj) );

                if (!inContact){
                    // the sign of vreg ( plus or minus 1 )
                    sign = vreg < 0 ? -1 : 1;

                    // get impulse due to friction
                    impulse *= sign * cof;
                    // make sure the impulse isn't giving the system energy
                    impulse = (sign === 1) ? Math.min( impulse, max ) : Math.max( impulse, max );

                } else {

                    impulse = max;
                }

                if ( fixedA ){

                    // apply frictional impulse
                    bodyB.state.vel.vsub( perp.mult( impulse * invMassB ) );
                    bodyB.state.angular.vel -= impulse * invMoiB * rBproj;

                } else if ( fixedB ){

                    // apply frictional impulse
                    bodyA.state.vel.vadd( perp.mult( impulse * invMassA ) );
                    bodyA.state.angular.vel += impulse * invMoiA * rAproj;

                } else {

                    // apply frictional impulse
                    bodyB.state.vel.vsub( perp.mult( impulse * invMassB ) );
                    bodyB.state.angular.vel -= impulse * invMoiB * rBproj;
                    bodyA.state.vel.vadd( perp.mult( invMassA * bodyB.mass ) );
                    bodyA.state.angular.vel += impulse * invMoiA * rAproj;
                }
            }

            scratch.done();
        },

        /** internal
         * BodyImpulseResponseBehavior#respond( data )
         * - data (Object): event data
         *
         * Event callback to respond to collision data.
         **/
        respond: function( data ){

            var self = this
                ,col
                ,collisions = Physics.util.shuffle(data.collisions)
                ;

            for ( var i = 0, l = collisions.length; i < l; ++i ){

                col = collisions[ i ];
                self.collideBodies(
                    col.bodyA,
                    col.bodyB,
                    col.norm,
                    col.pos,
                    col.mtv
                );
            }
        }
    };
});


// ---
// inside: src/behaviors/constant-acceleration.js

/** 
 * class ConstantAccelerationBehavior < Behavior
 *
 * `Physics.behavior('constant-acceleration')`.
 *
 * Constant acceleration behavior.
 *
 * Basically the "gravity" behavior. Used to give "earth-like gravity" to the world.
 *
 * Additional options include:
 * - acc: The acceleration vector (Vectorish). (default: `{ x: 0, y: 0.0004 }`)
 **/
Physics.behavior('constant-acceleration', function( parent ){

    var defaults = {

        acc: { x : 0, y: 0.0004 }
    };

    return {

        // extended
        init: function( options ){

            parent.init.call( this );
            this.options.defaults( defaults );
            this.options( options );

            // extend options
            this._acc = Physics.vector();
            this.setAcceleration( this.options.acc );
            delete this.options.acc;
        },

        /**
         * ConstantAccelerationBehavior#setAcceleration( acc ) -> this
         * - acc (Vectorish): The acceleration vector
         * 
         * Set the acceleration of the behavior.
         **/
        setAcceleration: function( acc ){

            this._acc.clone( acc );
            return this;
        },

        // extended
        behave: function( data ){

            var bodies = this.getTargets();

            for ( var i = 0, l = bodies.length; i < l; ++i ){
                
                bodies[ i ].accelerate( this._acc );
            }
        }
    };
});

// ---
// inside: src/behaviors/edge-collision-detection.js

/** 
 * class EdgeCollisionDetectionBehavior < Behavior
 *
 * `Physics.behavior('edge-collision-detection')`.
 *
 * Used to detect collisions with the boundaries of an AABB.
 *
 * Additional options include:
 * - aabb: The [[Physics.aabb]] bounds to use as the constraining boundary
 * - restitution: The restitution of the boundary walls (default: `0.99`)
 * - cof: The coefficient of friction of the boundary walls (default: `1`)
 * - channel: The channel to publish collisions to. (default: 'collisions:detected')
 **/
Physics.behavior('edge-collision-detection', function( parent ){

    /*
     * checkGeneral( body, bounds, dummy ) -> Array
     * - body (Body): The body to check
     * - bounds (Physics.aabb): The boundary
     * - dummy: (Body): The dummy body to publish as the static other body it collides with
     * + (Array): The collision data
     * 
     * Check if a body collides with the boundary
     */
    var checkGeneral = function checkGeneral( body, bounds, dummy ){

        var overlap
            ,aabb = body.aabb()
            ,scratch = Physics.scratchpad()
            ,trans = scratch.transform()
            ,dir = scratch.vector()
            ,result = scratch.vector()
            ,collision = false
            ,collisions = []
            ;

        // right
        overlap = (aabb.x + aabb.hw) - bounds.max.x;

        if ( overlap >= 0 ){

            dir.set( 1, 0 ).rotateInv( trans.setRotation( body.state.angular.pos ) );

            collision = {
                bodyA: body,
                bodyB: dummy,
                overlap: overlap,
                norm: {
                    x: 1,
                    y: 0
                },
                mtv: {
                    x: overlap,
                    y: 0
                },
                pos: body.geometry.getFarthestHullPoint( dir, result ).rotate( trans ).values()
            };

            collisions.push(collision);
        }

        // bottom
        overlap = (aabb.y + aabb.hh) - bounds.max.y;

        if ( overlap >= 0 ){

            dir.set( 0, 1 ).rotateInv( trans.setRotation( body.state.angular.pos ) );

            collision = {
                bodyA: body,
                bodyB: dummy,
                overlap: overlap,
                norm: {
                    x: 0,
                    y: 1
                },
                mtv: {
                    x: 0,
                    y: overlap
                },
                pos: body.geometry.getFarthestHullPoint( dir, result ).rotate( trans ).values()
            };

            collisions.push(collision);
        }

        // left
        overlap = bounds.min.x - (aabb.x - aabb.hw);

        if ( overlap >= 0 ){

            dir.set( -1, 0 ).rotateInv( trans.setRotation( body.state.angular.pos ) );

            collision = {
                bodyA: body,
                bodyB: dummy,
                overlap: overlap,
                norm: {
                    x: -1,
                    y: 0
                },
                mtv: {
                    x: -overlap,
                    y: 0
                },
                pos: body.geometry.getFarthestHullPoint( dir, result ).rotate( trans ).values()
            };

            collisions.push(collision);
        }

        // top
        overlap = bounds.min.y - (aabb.y - aabb.hh);

        if ( overlap >= 0 ){

            dir.set( 0, -1 ).rotateInv( trans.setRotation( body.state.angular.pos ) );

            collision = {
                bodyA: body,
                bodyB: dummy,
                overlap: overlap,
                norm: {
                    x: 0,
                    y: -1
                },
                mtv: {
                    x: 0,
                    y: -overlap
                },
                pos: body.geometry.getFarthestHullPoint( dir, result ).rotate( trans ).values()
            };

            collisions.push(collision);
        }

        scratch.done();
        return collisions;
    };

    /*
     * checkEdgeCollide( body, bounds, dummy ) -> Array
     * - body (Body): The body to check
     * - bounds (Physics.aabb): The boundary
     * - dummy: (Body): The dummy body to publish as the static other body it collides with
     * + (Array): The collision data
     * 
     * Check if a body collides with the boundary
     */
    var checkEdgeCollide = function checkEdgeCollide( body, bounds, dummy ){

        return checkGeneral( body, bounds, dummy );
    };

    var defaults = {

        aabb: null,
        restitution: 0.99,
        cof: 1.0,
        channel: 'collisions:detected'
    };

    return {

        // extended
        init: function( options ){

            parent.init.call( this );
            this.options.defaults( defaults );
            this.options( options );

            this.setAABB( this.options.aabb );
            this.restitution = this.options.restitution;
            
            this.body = Physics.body('point', { 
                treatment: 'static',
                restitution: this.options.restitution,
                cof: this.options.cof
            });
        },

        /**
         * EdgeCollisionDetectionBehavior#setAABB( aabb ) -> this
         * - aabb (Physics.aabb): The aabb to use as the boundary
         * 
         * Set the boundaries of the edge.
         **/
        setAABB: function( aabb ){

            if (!aabb) {
                throw 'Error: aabb not set';
            }

            this._edges = {
                min: {
                    x: (aabb.x - aabb.hw),
                    y: (aabb.y - aabb.hh)
                },
                max: {
                    x: (aabb.x + aabb.hw),
                    y: (aabb.y + aabb.hh)  
                }
            };

            return this;
        },

        // extended
        connect: function( world ){

            world.on( 'integrate:velocities', this.checkAll, this );
        },

        // extended
        disconnect: function( world ){

            world.off( 'integrate:velocities', this.checkAll );
        },

        /** internal
         * EdgeCollisionDetectionBehavior#checkAll( data )
         * - data (Object): Event data
         * 
         * Event callback to check all bodies for collisions with the edge
         **/
        checkAll: function( data ){
            
            var bodies = this.getTargets()
                ,dt = data.dt
                ,body
                ,collisions = []
                ,ret
                ,bounds = this._edges
                ,dummy = this.body
                ;

            for ( var i = 0, l = bodies.length; i < l; i++ ){

                body = bodies[ i ];

                // only detect dynamic bodies
                if ( body.treatment === 'dynamic' ){
                    
                    ret = checkEdgeCollide( body, bounds, dummy );

                    if ( ret ){
                        collisions.push.apply( collisions, ret );
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

// ---
// inside: src/behaviors/interactive.js

/**
 * class InteractiveBehavior < Behavior
 *
 * `Physics.behavior('interactive')`.
 *
 * User interaction helper.
 *
 * Used to get mouse/touch events and add a mouse grab interaction.
 *
 * Additional options include:
 * - el: The element of the renderer. What you input as the `el` for the renderer.
 * - moveThrottle: The min time between move events (default: `10`).
 * - minVel: The minimum velocity clamp [[Vectorish]] (default: { x: -5, y: -5 }) to restrict velocity a user can give to a body
 * - maxVel: The maximum velocity clamp [[Vectorish]] (default: { x: 5, y: 5 }) to restrict velocity a user can give to a body
 *
 * The behavior also triggers the following events on the world:
 * ```javascript
 * // a body has been grabbed
 * world.on('interact:grab', function( data ){
 *     data.x; // the x coord
 *     data.y; // the y coord
 *     data.body; // the body that was grabbed
 * });
 * // no body was grabbed, but the renderer area was clicked, or touched
 * world.on('interact:poke', function( data ){
 *     data.x; // the x coord
 *     data.y; // the y coord
 * });
 * world.on('interact:move', function( data ){
 *     data.x; // the x coord
 *     data.y; // the y coord
 *     data.body; // the body that was grabbed (if applicable)
 * });
 * // when the viewport is released (mouseup, touchend)
 * world.on('interact:release', function( data ){
 *     data.x; // the x coord
 *     data.y; // the y coord
 * });
 * ```
 **/
Physics.behavior('interactive', function( parent ){

    if ( !document ){
        // must be in node environment
        return {};
    }

    var defaults = {
            // the element to monitor
            el: null,
            // time between move events
            moveThrottle: 1000 / 100 | 0,
            // minimum velocity clamp
            minVel: { x: -5, y: -5 },
            // maximum velocity clamp
            maxVel: { x: 5, y: 5 }
        }
        ,getElementOffset = function( el ){
            var curleft = 0
                ,curtop = 0
                ;

            if (el.offsetParent) {
                do {
                    curleft += el.offsetLeft;
                    curtop += el.offsetTop;
                } while (el = el.offsetParent);
            }

            return { left: curleft, top: curtop };
        }
        ,getCoords = function( e ){
            var offset = getElementOffset( e.target )
                ,obj = ( e.changedTouches && e.changedTouches[0] ) || e
                ,x = obj.pageX - offset.left
                ,y = obj.pageY - offset.top
                ;

            return {
                x: x
                ,y: y
            };
        }
        ;

    return {
        // extended
        init: function( options ){

            var self = this
                ,prevTreatment
                ,time
                ;

            // call parent init method
            parent.init.call( this );
            this.options.defaults( defaults );
            this.options( options );

            // vars
            this.mousePos = new Physics.vector();
            this.mousePosOld = new Physics.vector();
            this.offset = new Physics.vector();

            this.el = typeof this.options.el === 'string' ? document.getElementById(this.options.el) : this.options.el;

            if ( !this.el ){
                throw "No DOM element specified";
            }

            // init events
            var grab = function grab( e ){
                var pos = getCoords( e )
                    ,body
                    ;

                if ( self._world ){
                    body = self._world.findOne({ $at: new Physics.vector( pos.x, pos.y ) });

                    if ( body ){
                        // we're trying to grab a body

                        // fix the body in place
                        prevTreatment = body.treatment;
                        body.treatment = 'kinematic';
                        body.state.vel.zero();
                        body.state.angular.vel = 0;
                        // remember the currently grabbed body
                        self.body = body;
                        // remember the mouse offset
                        self.mousePos.clone( pos );
                        self.offset.clone( pos ).vsub( body.state.pos );

                        pos.body = body;
                        self._world.emit('interact:grab', pos);

                    } else {

                        self._world.emit('interact:poke', pos);
                    }
                }
            };

            var move = Physics.util.throttle(function move( e ){
                var pos = getCoords( e )
                    ,state
                    ;

                if ( self.body ){
                    time = Physics.util.ticker.now();

                    self.mousePosOld.clone( self.mousePos );
                    // get new mouse position
                    self.mousePos.set(pos.x, pos.y);

                    pos.body = self.body;
                }

                self._world.emit('interact:move', pos);

            }, self.options.moveThrottle);

            var release = function release( e ){
                var pos = getCoords( e )
                    ,body
                    ,dt = Math.max(Physics.util.ticker.now() - time, self.options.moveThrottle)
                    ;

                // get new mouse position
                self.mousePos.set(pos.x, pos.y);

                // release the body
                if (self.body){
                    self.body.treatment = prevTreatment;
                    // calculate the release velocity
                    self.body.state.vel.clone( self.mousePos ).vsub( self.mousePosOld ).mult( 1 / dt );
                    // make sure it's not too big
                    self.body.state.vel.clamp( self.options.minVel, self.options.maxVel );
                    self.body = false;
                }

                if ( self._world ){

                    self._world.emit('interact:release', pos);
                }
            };

            this.el.addEventListener('mousedown', grab);
            this.el.addEventListener('touchstart', grab);

            this.el.addEventListener('mousemove', move);
            this.el.addEventListener('touchmove', move);

            this.el.addEventListener('mouseup', release);
            this.el.addEventListener('touchend', release);
        },

        // extended
        connect: function( world ){

            // subscribe the .behave() method to the position integration step
            world.on('integrate:positions', this.behave, this);
        },

        // extended
        disconnect: function( world ){

            // unsubscribe when disconnected
            world.off('integrate:positions', this.behave);
        },

        // extended
        behave: function( data ){

            var self = this
                ,state
                ,dt = Math.max(data.dt, self.options.moveThrottle)
                ;

            if ( self.body ){

                // if we have a body, we need to move it the the new mouse position.
                // we'll do this by adjusting the velocity so it gets there at the next step
                state = self.body.state;
                state.vel.clone( self.mousePos ).vsub( self.offset ).vsub( state.pos ).mult( 1 / dt );
            }
        }
    };
});


// ---
// inside: src/behaviors/newtonian.js

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


// ---
// inside: src/behaviors/sweep-prune.js

/**
 * class SweepPruneBehavior < Behavior
 *
 * `Physics.behavior('sweep-prune')`.
 *
 * Sweep and Prune implementation for broad phase collision detection.
 *
 * This massively improves the speed of collision detection. It's set up to always be used with [[BodyCollisionDetection]], and [[BodyImpulseResponse]].
 *
 * Additional options include:
 * - channel: The channel to publish collision candidates to. (default: `collisions:candidates`)
 **/
Physics.behavior('sweep-prune', function( parent ){

    var uid = 1;

    // Get a unique numeric id for internal use
    var getUniqueId = function getUniqueId(){

        return uid++;
    };

    // add z: 2 to get this to work in 3D
    var dof = { x: 0, y: 1 }; // degrees of freedom
    // change to "3" to get it to work in 3D
    var maxDof = 2;

    var pairHash = Physics.util.pairHash;

    return {

        // extended
        init: function( options ){

            parent.init.call( this );
            this.options.defaults({
                channel: 'collisions:candidates' //default channel
            });
            this.options( options );

            this.encounters = [];
            this.candidates = [];

            this.clear();
        },

        /**
         * SweepPruneBehavior#clear()
         *
         * Refresh tracking data
         **/
        clear: function(){

            this.tracked = [];
            this.pairs = []; // pairs selected as candidate collisions by broad phase
            this.intervalLists = []; // stores lists of aabb projection intervals to be sorted

            // init intervalLists
            for ( var xyz = 0; xyz < maxDof; ++xyz ){

                this.intervalLists[ xyz ] = [];
            }
        },

        // extended
        connect: function( world ){

            world.on( 'add:body', this.trackBody, this );
            world.on( 'remove:body', this.untrackBody, this );
            world.on( 'integrate:velocities', this.sweep, this );

            // add current bodies
            var bodies = world.getBodies();
            for ( var i = 0, l = bodies.length; i < l; ++i ){

                this.trackBody({ body: bodies[ i ] });
            }
        },

        // extended
        disconnect: function( world ){

            world.off( 'add:body', this.trackBody );
            world.off( 'remove:body', this.untrackBody );
            world.off( 'integrate:velocities', this.sweep );
            this.clear();
        },

        /** internal
         * SweepPruneBehavior#broadPhase() -> Array
         * + (Array): The candidate data of overlapping aabbs
         *
         * Execute the broad phase and get candidate collisions
         **/
        broadPhase: function(){

            this.updateIntervals();
            this.sortIntervalLists();
            return this.checkOverlaps();
        },

        /** internal
         * SweepPruneBehavior#sortIntervalLists()
         *
         * Simple insertion sort for each axis
         **/
        sortIntervalLists: function(){

            var list
                ,len
                ,i
                ,hole
                ,bound
                ,boundVal
                ,left
                ,leftVal
                ,axis
                ;

            // for each axis...
            for ( var xyz = 0; xyz < maxDof; ++xyz ){

                // get the intervals for that axis
                list = this.intervalLists[ xyz ];
                i = 0;
                len = list.length;
                axis = xyz;

                // for each interval bound...
                while ( (++i) < len ){

                    // store bound
                    bound = list[ i ];
                    boundVal = bound.val.get( axis );
                    hole = i;

                    left = list[ hole - 1 ];
                    leftVal = left && left.val.get( axis );

                    // while others are greater than bound...
                    while (
                        hole > 0 &&
                        (
                            leftVal > boundVal ||
                            // if it's an equality, only move it over if
                            // the hole was created by a minimum
                            // and the previous is a maximum
                            // so that we detect contacts also
                            leftVal === boundVal &&
                            ( left.type && !bound.type )
                        )
                    ) {

                        // move others greater than bound to the right
                        list[ hole ] = left;
                        hole--;
                        left = list[ hole - 1 ];
                        leftVal = left && left.val.get( axis );
                    }

                    // insert bound in the hole
                    list[ hole ] = bound;
                }
            }
        },

        /** internal
         * SweepPruneBehavior#getPair( tr1, tr2, doCreate ) -> Object
         * - tr1 (Object): First tracker
         * - tr2 (Object): Second tracker
         * - doCreate (Boolean): Create if not found
         * + (Object): Pair object or null if not found
         *
         * Get a pair object for the tracker objects
         **/
        getPair: function(tr1, tr2, doCreate){

            var hash = pairHash( tr1.id, tr2.id );

            if ( hash === false ){
                return null;
            }

            var c = this.pairs[ hash ];

            if ( !c ){

                if ( !doCreate ){
                    return null;
                }

                c = this.pairs[ hash ] = {
                    bodyA: tr1.body,
                    bodyB: tr2.body,
                    flag: 1
                };
            }

            return c;
        },

        // getPair: function(tr1, tr2, doCreate){

        //     var hash = Math.min(tr1.id, tr2.id) // = pairHash( tr1.id, tr2.id )
        //         ,other = Math.max(tr1.id, tr2.id)
        //         ,first
        //         ,c
        //         ;

        //     if ( hash === false ){
        //         return null;
        //     }

        //     first = this.pairs[ hash ];

        //     if ( !first ){
        //         if ( !doCreate ){
        //             return null;
        //         }

        //         first = this.pairs[ hash ] = [];
        //     }

        //     c = first[ other ];

        //     if ( !c ){

        //         if ( !doCreate ){
        //             return null;
        //         }

        //         c = first[ other ] = {
        //             bodyA: tr1.body,
        //             bodyB: tr2.body,
        //             flag: 1
        //         };
        //     }

        //     return c;
        // },

        /** internal
         * SweepPruneBehavior#checkOverlaps() -> Array
         * + (Array): List of candidate collisions
         *
         * Check each axis for overlaps of bodies AABBs
         **/
        checkOverlaps: function(){

            var isX
                ,hash
                ,tr1
                ,tr2
                ,bound
                ,list
                ,len
                ,i
                ,j
                ,c
                // determine which axis is the last we need to check
                ,collisionFlag = 1 << (dof.z + 1) << (dof.y + 1) << (dof.x + 1)
                ,encounters = this.encounters
                ,enclen = 0
                ,candidates = this.candidates
                ;

            encounters.length = candidates.length = 0;

            for ( var xyz = 0; xyz < maxDof; ++xyz ){

                // is the x coord
                isX = (xyz === 0);
                // get the interval list for this axis
                list = this.intervalLists[ xyz ];

                // for each interval bound
                for ( i = 0, len = list.length; i < len; i++ ){

                    bound = list[ i ];
                    tr1 = bound.tracker;

                    if ( bound.type ){

                        // is a max

                        j = enclen;

                        for ( j = enclen - 1; j >= 0; j-- ){

                            tr2 = encounters[ j ];

                            // if they are the same tracked interval
                            if ( tr2 === tr1 ){

                                // remove the interval from the encounters list
                                // faster than .splice()
                                if ( j < enclen - 1 ) {

                                    encounters[ j ] = encounters.pop();

                                } else {

                                    // encountered a max right after a min... no overlap
                                    encounters.pop();
                                }

                                enclen--;

                            } else {

                                // check if we have flagged this pair before
                                // if it's the x axis, create a pair
                                c = this.getPair( tr1, tr2, isX );

                                if ( c ){

                                    if ( c.flag > collisionFlag ){
                                        c.flag = 1;
                                    }

                                    // if it's greater than the axis index, set the flag
                                    // to = 0.
                                    // if not, increment the flag by one.
                                    c.flag = c.flag << (xyz + 1);

                                    // c.flag will equal collisionFlag
                                    // if we've incremented the flag
                                    // enough that all axes are overlapping
                                    if ( c.flag === collisionFlag ){

                                        // overlaps on all axes.
                                        // add it to possible collision
                                        // candidates list for narrow phase

                                        candidates.push( c );
                                    }
                                }
                            }
                        }

                    } else {

                        // is a min
                        // just add this minimum to the encounters list
                        enclen = encounters.push( tr1 );
                    }
                }
            }

            return candidates;
        },

        /** internal
         * SweepPruneBehavior#updateIntervals()
         *
         * Update position intervals on each axis
         **/
        updateIntervals: function(){

            var tr
                ,intr
                ,scratch = Physics.scratchpad()
                ,pos = scratch.vector()
                ,aabb
                ,span = scratch.vector()
                ,list = this.tracked
                ,i = list.length
                ;

            // for all tracked bodies
            while ( (--i) >= 0 ){

                tr = list[ i ];
                intr = tr.interval;
                pos.clone( tr.body.state.pos );
                aabb = tr.body.aabb();
                span.set( aabb.hw, aabb.hh );

                // copy the position (plus or minus) the aabb half-dimensions
                // into the min/max intervals
                intr.min.val.clone( pos ).vsub( span );
                intr.max.val.clone( pos ).vadd( span );
            }

            scratch.done();
        },

        /** internal
         * SweepPruneBehavior#trackBody( data )
         * - data (Object): Event data
         *
         * Event callback to add body to list of those tracked by sweep and prune
         **/
        trackBody: function( data ){

            var body = data.body
                ,tracker = {

                    id: getUniqueId(),
                    body: body
                }
                ,intr = {

                    min: {
                        type: false, //min
                        val: Physics.vector(),
                        tracker: tracker
                    },

                    max: {
                        type: true, //max
                        val: Physics.vector(),
                        tracker: tracker
                    }
                }
                ;

            tracker.interval = intr;
            this.tracked.push( tracker );

            for ( var xyz = 0; xyz < maxDof; ++xyz ){

                this.intervalLists[ xyz ].push( intr.min, intr.max );
            }
        },

        /** internal
         * SweepPruneBehavior#untrackBody( data )
         * - data (Object): Event data
         *
         * Event callback to remove body from list of those tracked
         **/
        untrackBody: function( data ){

            var body = data.body
                ,list
                ,minmax
                ,trackedList = this.tracked
                ,tracker
                ,count
                ;

            for ( var i = 0, l = trackedList.length; i < l; ++i ){

                tracker = trackedList[ i ];

                if ( tracker.body === body ){

                    // remove the tracker at this index
                    trackedList.splice(i, 1);

                    for ( var xyz = 0; xyz < maxDof; ++xyz ){

                        count = 0;
                        list = this.intervalLists[ xyz ];

                        for ( var j = 0, m = list.length; j < m; ++j ){

                            minmax = list[ j ];

                            if ( minmax === tracker.interval.min || minmax === tracker.interval.max ){

                                // remove interval from list
                                list.splice(j, 1);
                                j--;
                                l--;

                                if (count > 0){
                                    break;
                                }

                                count++;
                            }
                        }
                    }

                    break;
                }
            }
        },

        /** internal
         * SweepPruneBehavior#sweep( data )
         * - data (Object): Event data
         *
         * Event callback to sweep and publish event if any candidate collisions are found
         **/
        sweep: function( data ){

            var self = this
                ,candidates
                ;

            candidates = self.broadPhase();

            if ( candidates.length ){

                this._world.emit( this.options.channel, {
                    candidates: candidates
                });
            }
        }
    };
});


// ---
// inside: src/behaviors/verlet-constraints.js

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

            world.off('integrate:positions', this.resolve);
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

                    // ang = corr;

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

                    // ang = -corr;

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


// ---
// inside: src/integrators/improved-euler.js

Physics.integrator('improved-euler', function( parent ){

    return {
        /** 
         * class ImprovedEuler < Integrator
         *
         * `Physics.integrator('improved-euler')`.
         *
         * The improved euler integrator.
         **/

        // extended
        init: function( options ){

            // call parent init
            parent.init.call(this, options);
        },
 
        // extended
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
                if ( body.treatment !== 'static' ){

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

        // extended
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
                if ( body.treatment !== 'static' ){


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



// ---
// inside: src/renderers/canvas.js

/**
 * class CanvasRenderer < Renderer
 *
 * Physics.renderer('canvas')
 *
 * Renderer that uses HTMLCanvas to render the world bodies.
 *
 * Additional config options:
 *
 * - debug: Draw debug shapes and bounding boxes. (default: `false`)
 * - metaEl: HTMLElement to write meta information like FPS and IPF into. (default: autogenerated)
 * - offset: Offset the shapes by this amount. (default: `{ x: 0, y: 0 }`)
 * - styles: Styles to use to draw the shapes. (see below)
 *
 * The styles property should contain _default_ styles for each shape you want to draw.
 *
 * Example:
 *
 * ```javascript
 * styles: {
 *
 *    'circle' : {
 *        strokeStyle: '#542437',
 *        lineWidth: 1,
 *        fillStyle: '#542437',
 *        angleIndicator: 'white'
 *    },
 *
 *    'convex-polygon' : {
 *        strokeStyle: '#542437',
 *        lineWidth: 1,
 *        fillStyle: '#542437',
 *        angleIndicator: 'white'
 *    }
 * }
 * ```
 **/
Physics.renderer('canvas', function( proto ){

    if ( !document ){
        // must be in node environment
        return {};
    }

    var Pi2 = Math.PI * 2
        // helper to create new dom elements
        ,newEl = function( node, content ){
            var el = document.createElement(node || 'div');
            if (content){
                el.innerHTML = content;
            }
            return el;
        }
        ,colors = {
            white: '#fff'
            ,violet: '#542437'
            ,blue: '#53777A'
        }
        ;

    var defaults = {

        // draw aabbs of bodies for debugging
        debug: false,
        // the element to place meta data into
        metaEl: null,
        // default styles of drawn objects
        styles: {

            'circle' : {
                strokeStyle: colors.blue,
                lineWidth: 1,
                fillStyle: colors.blue,
                angleIndicator: colors.white
            },

            'convex-polygon' : {
                strokeStyle: colors.violet,
                lineWidth: 1,
                fillStyle: colors.violet,
                angleIndicator: colors.white
            }
        },
        offset: { x: 0, y: 0 }
    };

    // deep copy callback to extend deeper into options
    var deep = function( a, b ){

        if ( Physics.util.isPlainObject( b ) ){

            return Physics.util.extend({}, a, b, deep );
        }

        return b !== undefined ? b : a;
    };

    return {

        // extended
        init: function( options ){

            var self = this;

            // call proto init
            proto.init.call(this, options);

            // further options
            this.options = Physics.util.extend({}, defaults, this.options, deep);
            this.options.offset = Physics.vector( this.options.offset );


            // hidden canvas
            this.hiddenCanvas = document.createElement('canvas');
            this.hiddenCanvas.width = this.hiddenCanvas.height = 100;

            if (!this.hiddenCanvas.getContext){
                throw "Canvas not supported";
            }

            this.hiddenCtx = this.hiddenCanvas.getContext('2d');

            // actual viewport
            var viewport = this.el;
            if (viewport.nodeName.toUpperCase() !== 'CANVAS'){

                viewport = document.createElement('canvas');
                this.el.appendChild( viewport );
                if (typeof this.options.el === 'string' && this.el === document.body){
                    viewport.id = this.options.el;
                }
                this.el = viewport;
            }

            this.ctx = viewport.getContext('2d');

            this.els = {};

            if (this.options.meta){
                var stats = this.options.metaEl || newEl();
                stats.className = 'pjs-meta';
                this.els.fps = newEl('span');
                this.els.ipf = newEl('span');
                stats.appendChild(newEl('span', 'fps: '));
                stats.appendChild(this.els.fps);
                stats.appendChild(newEl('br'));
                stats.appendChild(newEl('span', 'ipf: '));
                stats.appendChild(this.els.ipf);

                viewport.parentNode.insertBefore(stats, viewport);
            }

            this._layers = {};
            this.addLayer( 'main', this.el );
            this.resize( this.options.width, this.options.height );
        },

        /**
         * CanvasRenderer#layer( id ) -> Layer
         * - id (String): The id for the layer
         *
         * Get the layer by id.
         **/
        layer: function( id ){

            if ( id in this._layers ){
                return this._layers[ id ];
            }

            return null;
        },

        /**
         * CanvasRenderer#addLayer( id[, el, opts ] ) -> Layer
         * - id (String): The id for the layer
         * - el (HTMLElement): The canvas element to use for this layer
         * - opts (Object): The options for this layer (see below)
         *
         * Create a new layer.
         *
         * Layers can have the following options:
         *
         * - width: The width
         * - height: The height
         * - manual: Draw manually (default: `false`)
         * - autoResize: Automatically resize the layer when the renderer's [[CanvasRenderer#resize]] method is called. (default: `true`)
         * - follow: A [[Body]]. Offset this layer's rendering to follow a body's position. (default: `null`)
         * - offset: The offset [[Vectorish]] for this layer. (default: `null`)
         * - scale: Scale the layer by this amount. (default: `1`)
         * - zIndex: The zIndex for the layer's HTMLElement. (default: `1`)
         **/
        addLayer: function( id, el, opts ){

            /** belongs to: CanvasRenderer
             * class Layer
             *
             * A rendering layer for the canvas renderer.
             *
             * Create by calling [[CanvasRenderer#addLayer]].
             **/

            var self = this
                ,bodies = []
                ,styles = Physics.util.extend({}, this.options.styles)
                ,layer = {
                    /**
                     * Layer#id = String
                     *
                     * The layer's ID
                     **/
                    id: id
                    /**
                     * Layer#el = HTMLElement
                     *
                     * The layer's Canvas
                     **/
                    ,el: el || document.createElement('canvas')
                    /** related to: Physics.util.options
                      * Layer#options( options ) -> Object
                      * - options (Object): The options to set as an object
                      * + (Object): The options
                      *
                      * Set options on this layer.
                      *
                      * Access options directly from the options object.
                      *
                      * Example:
                      *
                      * ```javascript
                      * this.options.someOption;
                      * ```
                      **/
                    ,options: Physics.util.options({
                        width: this.el.width
                        ,height: this.el.height
                        ,manual: false
                        ,autoResize: true
                        ,follow: null
                        ,offset: null
                        ,scale: 1
                        ,zIndex: 1
                    })( opts )
                }
                ;

            if ( id in this._layers ){
                throw 'Layer "' + id + '" already added.';
            }

            this.el.parentNode.insertBefore( layer.el, this.el );
            layer.el.style.position = 'absolute';
            layer.el.style.zIndex = layer.options.zIndex;
            layer.el.className += ' pjs-layer-' + layer.id;
            layer.ctx = layer.el.getContext('2d');
            layer.ctx.scale( 1, 1 );
            layer.el.width = layer.options.width;
            layer.el.height = layer.options.height;

            /**
             * Layer#bodies = Array
             *
             * The Bodies this layer is rendering.
             *
             * The "main" layer will render all world bodies if it's empty.
             **/
            layer.bodies = bodies;

            /**
             * Layer#reset( [arr] ) -> this
             * - arr (Array): Array to replace the current stack of Bodies.
             *
             * Reset the stack.
             **/
            layer.reset = function( arr ){

                bodies = arr || [];
                return layer;
            };

            /**
             * Layer#addToStack( arr ) -> this
             * Layer#addToStack( body ) -> this
             * - body (Body): Body to add
             * - arr (Array): Array of bodies to add
             *
             * Add body (bodies) to the rendering stack for this layer.
             *
             * Bodies must be added to the stack in order to be rendered by this layer UNLESS it is the "main" layer.
             **/
            layer.addToStack = function( thing ){

                if ( Physics.util.isArray( thing ) ){
                    bodies.push.apply( bodies, thing );
                } else {
                    bodies.push( thing );
                }
                return layer;
            };

            /**
             * Layer#removeFromStack( arr ) -> this
             * Layer#removeFromStack( body ) -> this
             * - body (Body): Body to remove
             * - arr (Array): Array of bodies to remove
             *
             * Remove body (bodies) from the rendering stack for this layer.
             **/
            layer.removeFromStack = function( thing ){

                var i, l;

                if ( Physics.util.isArray( thing ) ){
                    for ( i = 0, l = thing.length; i < l; ++i ){
                        layer.removeFromStack(thing[ i ]);
                    }
                } else {
                    i = Physics.util.indexOf( bodies, thing );
                    if ( i > -1 ){
                        bodies.splice( i, 1 );
                    }
                }
                return layer;
            };

            /**
             * Layer#render( [clear] ) -> this
             * - clear (Boolean): Clear the canvas (default: `true`)
             *
             * Render the bodies in this layer's stack.
             *
             * If you want you can replace this function with your own to do custom rendering.
             *
             * Example:
             *
             * ```javascript
             * layer.render = myCustomRenderFn;
             * ```
             **/
            layer.render = function( clear ){

                var body
                    ,scratch = Physics.scratchpad()
                    ,offset = scratch.vector().set(0, 0)
                    ,scale = layer.options.scale
                    ,view
                    ,i
                    ,l = bodies.length
                    ,stack = (l || layer.id !== 'main') ? bodies : self._world._bodies
                    ;

                if ( layer.options.manual ){
                    scratch.done();
                    return layer;
                }

                if ( layer.options.offset ){
                    if ( layer.options.offset === 'center' ){
                        offset.add( layer.el.width * 0.5, layer.el.height * 0.5 ).mult( 1/scale );
                    } else {
                        offset.vadd( layer.options.offset ).mult( 1/scale );
                    }
                }

                if ( layer.options.follow ){
                    offset.vsub( layer.options.follow.state.pos );
                }

                if ( clear !== false ){
                    layer.ctx.clearRect(0, 0, layer.el.width, layer.el.height);
                }

                if ( scale !== 1 ){
                    layer.ctx.save();
                    layer.ctx.scale( scale, scale );
                }

                for ( i = 0, l = stack.length; i < l; ++i ){

                    body = stack[ i ];
                    if ( !body.hidden ){
                        view = body.view || ( body.view = self.createView(body.geometry, body.styles || styles[ body.geometry.name ]) );
                        self.drawBody( body, body.view, layer.ctx, offset );
                    }
                }

                if ( scale !== 1 ){
                    layer.ctx.restore();
                }

                scratch.done();
                return layer;
            };

            // remember layer
            this._layers[ id ] = layer;

            return layer;
        },

        /**
         * CanvasRenderer#removeLayer( id ) -> this
         * CanvasRenderer#removeLayer( layer ) -> this
         * - id (String): The id for the layer
         * - layer (Layer): The layer
         *
         * Remove a layer.
         **/
        removeLayer: function( idOrLayer ){

            var id = idOrLayer.id ? idOrLayer.id : idOrLayer
                ,el = this._layers[ id ].el
                ;

            if ( el !== this.el ){
                el.parentNode.removeChild( el );
            }
            delete this._layers[ id ];
            return this;
        },

        /**
         * CanvasRenderer#resize( width, height ) -> this
         * - width (Number): The width
         * - height (Number): The height
         *
         * Resize all layer canvases that have the `autoResize` option set to `true`.
         **/
        resize: function( width, height ){

            var layer;

            for ( var id in this._layers ){

                layer = this._layers[ id ];
                if ( layer.options.autoResize ){
                    layer.el.width = width;
                    layer.el.height = height;
                }
            }

            return this;
        },

        /**
         * CanvasRenderer#setStyle( styles[, ctx] )
         * - styles (Object|String): Styles to set on the canvas context
         * - ctx (Canvas2DContext): The canvas context
         *
         * Set styles on the specified canvas context (or main context).
         **/
        setStyle: function( styles, ctx ){

            ctx = ctx || this.ctx;

            if ( Physics.util.isObject(styles) ){

                styles.strokeStyle = styles.lineWidth ? styles.strokeStyle : 'rgba(0,0,0,0)';
                Physics.util.extend(ctx, styles);

            } else {

                ctx.fillStyle = ctx.strokeStyle = styles;
                ctx.lineWidth = 1;
            }
        },

        /**
         * CanvasRenderer#drawCircle( x, y, r, styles[, ctx] )
         * - x (Number): The x coord
         * - y (Number): The y coord
         * - r (Number): The circle radius
         * - styles (Object): The styles configuration
         * - ctx (Canvas2DContext): The canvas context
         *
         * Draw a circle to specified canvas context.
         **/
        drawCircle: function(x, y, r, styles, ctx){

            ctx = ctx || this.ctx;

            ctx.beginPath();
            this.setStyle( styles, ctx );
            ctx.arc(x, y, r, 0, Pi2, false);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        },

        /**
         * CanvasRenderer#drawPolygon( verts, styles[, ctx] )
         * - verts (Array): Array of [[Vectorish]] vertices
         * - styles (Object): The styles configuration
         * - ctx (Canvas2DContext): The canvas context
         *
         * Draw a polygon to specified canvas context.
         **/
        drawPolygon: function(verts, styles, ctx){

            var vert = verts[0]
                ,x = vert.x
                ,y = vert.y
                ,l = verts.length
                ;

            ctx = ctx || this.ctx;
            ctx.beginPath();
            this.setStyle( styles, ctx );

            ctx.moveTo(x, y);

            for ( var i = 1; i < l; ++i ){

                vert = verts[ i ];
                x = vert.x;
                y = vert.y;
                ctx.lineTo(x, y);
            }

            if ( l > 2 ){
                ctx.closePath();
            }

            ctx.stroke();
            ctx.fill();
        },

        /**
         * CanvasRenderer#drawRect( x, y, width, height, styles[, ctx] )
         * - x (Number): The x coord
         * - y (Number): The y coord
         * - width (Number): The width
         * - height (Number): The height
         * - styles (Object): The styles configuration
         * - ctx (Canvas2DContext): The canvas context
         *
         * Draw a rectangle to specified canvas context.
         **/
        drawRect: function(x, y, width, height, styles, ctx){

            var hw = width * 0.5
                ,hh = height * 0.5
                ;

            ctx = ctx || this.ctx;
            this.setStyle( styles, ctx );
            ctx.beginPath();
            ctx.rect(x - hw, y - hh, width, height);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        },

        /**
         * CanvasRenderer#drawLine( from, to, styles[, ctx] )
         * - from (Vectorish): The starting pt
         * - to (Vectorish): The ending pt
         * - styles (Object): The styles configuration
         * - ctx (Canvas2DContext): The canvas context
         *
         * Draw a line onto specified canvas context.
         **/
        drawLine: function(from, to, styles, ctx){

            var x = from.x
                ,y = from.y
                ;

            ctx = ctx || this.ctx;

            ctx.beginPath();
            this.setStyle( styles, ctx );

            ctx.moveTo(x, y);

            x = to.x;
            y = to.y;

            ctx.lineTo(x, y);

            ctx.stroke();
            ctx.fill();
        },

        // extended
        createView: function( geometry, styles ){

            var view
                ,aabb = geometry.aabb()
                ,hw = aabb.hw + Math.abs(aabb.x)
                ,hh = aabb.hh + Math.abs(aabb.y)
                ,x = hw + 1
                ,y = hh + 1
                ,hiddenCtx = this.hiddenCtx
                ,hiddenCanvas = this.hiddenCanvas
                ,name = geometry.name
                ;

            styles = styles || this.options.styles[ name ] || {};

            // must want an image
            if ( styles.src ){
                view = new Image();
                view.src = styles.src;
                if ( styles.width ){
                    view.width = styles.width;
                }
                if ( styles.height ){
                    view.height = styles.height;
                }
                return view;
            }

            x += styles.lineWidth | 0;
            y += styles.lineWidth | 0;

            // clear
            hiddenCanvas.width = 2 * hw + 2 + (2 * styles.lineWidth|0);
            hiddenCanvas.height = 2 * hh + 2 + (2 * styles.lineWidth|0);

            hiddenCtx.save();
            hiddenCtx.translate(x, y);

            if (name === 'circle'){

                this.drawCircle(0, 0, geometry.radius, styles, hiddenCtx);

            } else if (name === 'convex-polygon'){

                this.drawPolygon(geometry.vertices, styles, hiddenCtx);

            } else if (name === 'rectangle'){

                this.drawRect(0, 0, geometry.width, geometry.height, styles, hiddenCtx);
            }

            if (styles.angleIndicator){

                hiddenCtx.beginPath();
                this.setStyle( styles.angleIndicator, hiddenCtx );
                hiddenCtx.moveTo(0, 0);
                hiddenCtx.lineTo(hw, 0);
                hiddenCtx.closePath();
                hiddenCtx.stroke();
            }

            hiddenCtx.restore();

            view = new Image( hiddenCanvas.width, hiddenCanvas.height );
            view.src = hiddenCanvas.toDataURL('image/png');
            return view;
        },

        // extended
        drawMeta: function( meta ){

            this.els.fps.innerHTML = meta.fps.toFixed(2);
            this.els.ipf.innerHTML = meta.ipf;
        },

        // extended
        drawBody: function( body, view, ctx, offset ){

            var pos = body.state.pos
                ,v = body.state.vel
                ,t = this._interpolateTime || 0
                ,x
                ,y
                ,ang
                ,aabb
                ;

            offset = offset || this.options.offset;
            ctx = ctx || this.ctx;

            // interpolate positions
            x = pos.x + offset.x + v.x * t;
            y = pos.y + offset.y + v.y * t;
            ang = body.state.angular.pos + body.state.angular.vel * t;

            ctx.save();
            ctx.translate( x, y );
            ctx.rotate( ang );
            ctx.drawImage(view, -view.width/2, -view.height/2);
            ctx.restore();

            if ( this.options.debug ){
                aabb = body.aabb();
                // draw bounding boxes
                this.drawRect( aabb.x, aabb.y, 2 * aabb.hw, 2 * aabb.hh, 'rgba(0, 0, 255, 0.3)' );

                // draw also paths
                body._debugView = body._debugView || this.createView(body.geometry, 'rgba(255, 0, 0, 0.5)');
                ctx.save();
                ctx.translate(pos.x + offset.x, pos.y + offset.y);
                ctx.rotate(body.state.angular.pos);
                ctx.drawImage(body._debugView, -body._debugView.width * 0.5, -body._debugView.height * 0.5);
                ctx.restore();
            }
        },

        // extended
        render: function( bodies, meta ){

            var body
                ,view
                ,pos
                ;

            this._world.emit('beforeRender', {
                renderer: this,
                meta: meta
            });

            if ( this.options.meta ) {
                this.drawMeta( meta );
            }

            this._interpolateTime = meta.interpolateTime;

            for ( var id in this._layers ){

                this._layers[ id ].render();
            }

            return this;
        }
    };
});


// ---
// inside: src/renderers/dom.js

/**
 * class DomRenderer < Renderer
 *
 * Physics.renderer('dom')
 *
 * Renderer that manipulates DOM elements according to the physics simulation. Very primative...
 **/
Physics.renderer('dom', function( proto ){

    if ( !document ){
        // must be in node environment
        return {};
    }

    // utility methods
    var thePrefix = {}
        ,tmpdiv = document.createElement("div")
        ,toTitleCase = function toTitleCase(str) {
            return str.replace(/(?:^|\s)\w/g, function(match) {
                return match.toUpperCase();
            });
        }
        // return the prefixed name for the specified css property
        ,pfx = function pfx(prop) {

            if (thePrefix[prop]){
                return thePrefix[prop];
            }

            var arrayOfPrefixes = ['Webkit', 'Moz', 'Ms', 'O']
                ,name
                ;

            for (var i = 0, l = arrayOfPrefixes.length; i < l; ++i) {

                name = arrayOfPrefixes[i] + toTitleCase(prop);

                if (name in tmpdiv.style){
                    return thePrefix[prop] = name;
                }
            }

            if (name in tmpdiv.style){
                return thePrefix[prop] = prop;
            }

            return false;
        }
        ;

    var classpfx = 'pjs-'
        ,px = 'px'
        ,cssTransform = pfx('transform')
        ;

    var newEl = function( node, content ){
            var el = document.createElement(node || 'div');
            if (content){
                el.innerHTML = content;
            }
            return el;
        }
        ,drawBody
        ;

    return {

        // extended
        init: function( options ){

            // call proto init
            proto.init.call(this, options);

            var viewport = this.el;
            viewport.style.position = 'relative';
            viewport.style.overflow = 'hidden';
            viewport.style[cssTransform] = 'translateZ(0)'; // force GPU accel
            viewport.style.width = this.options.width + px;
            viewport.style.height = this.options.height + px;

            this.els = {};

            if (options.meta){
                var stats = newEl();
                stats.className = 'pjs-meta';
                this.els.fps = newEl('span');
                this.els.ipf = newEl('span');
                stats.appendChild(newEl('span', 'fps: '));
                stats.appendChild(this.els.fps);
                stats.appendChild(newEl('br'));
                stats.appendChild(newEl('span', 'ipf: '));
                stats.appendChild(this.els.ipf);

                viewport.appendChild(stats);
            }
        },

        /** internal
         * DomRenderer#circleProperties( el, geometry )
         * - el (HTMLElement): The element
         * - geometry (Geometry): The body's geometry
         *
         * Set dom element style properties for a circle.
         **/
        circleProperties: function( el, geometry ){

            var aabb = geometry.aabb();

            el.style.width = (aabb.hw * 2) + px;
            el.style.height = (aabb.hh * 2) + px;
            el.style.marginLeft = (-aabb.hw) + px;
            el.style.marginTop = (-aabb.hh) + px;
        },

        /** internal
         * DomRenderer#rectangleProperties( el, geometry )
         * - el (HTMLElement): The element
         * - geometry (Geometry): The body's geometry
         *
         * Set dom element style properties for a rectangle.
         **/
        rectangleProperties: function( el, geometry ){

            var aabb = geometry.aabb();

            el.style.width = (aabb.hw * 2) + px;
            el.style.height = (aabb.hh * 2) + px;
            el.style.marginLeft = (-aabb.hw) + px;
            el.style.marginTop = (-aabb.hh) + px;
        },

        // extended
        createView: function( geometry ){

            var el = newEl()
                ,fn = geometry.name + 'Properties'
                ;

            el.className = classpfx + geometry.name;
            el.style.position = 'absolute';
            el.style.top = '0px';
            el.style.left = '0px';

            if (this[ fn ]){
                this[ fn ](el, geometry);
            }

            this.el.appendChild( el );
            return el;
        },

        // extended
        connect: function( world ){

            world.on( 'add:body', this.attach, this );
            world.on( 'remove:body', this.detach, this );
        },

        // extended
        disconnect: function( world ){

            world.off( 'add:body', this.attach );
            world.off( 'remove:body', this.detach );
        },

        /**
         * DomRenderer#detach( data ) -> this
         * - data (HTMLElement|Object): DOM node or event data (`data.body`)
         *
         * Event callback to detach a node from the DOM
         **/
        detach: function( data ){

            // interpred data as either dom node or event data
            var el = (data.nodeType && data) || (data.body && data.body.view)
                ,par = el && el.parentNode
                ;

            if ( el && par ){
                // remove view from dom
                par.removeChild( el );
            }

            return this;
        },

        /**
         * DomRenderer#attach( data ) -> this
         * - data (HTMLElement|Object): DOM node or event data (`data.body`)
         *
         * Event callback to attach a node to the viewport
         **/
        attach: function( data ){

            // interpred data as either dom node or event data
            var el = (data.nodeType && data) || (data.body && data.body.view)
                ;

            if ( el ){
                // attach to viewport
                this.el.appendChild( el );
            }

            return this;
        },

        // extended
        drawMeta: function( meta ){

            this.els.fps.innerHTML = meta.fps.toFixed(2);
            this.els.ipf.innerHTML = meta.ipf;
        },

        // extended
        drawBody: function( body, view ){

            var pos = body.state.pos
                ,v = body.state.vel
                ,x
                ,y
                ,ang
                ,t = this._interpolateTime
                ;

            // interpolate positions
            x = pos.x + v.x * t;
            y = pos.y + v.y * t;
            ang = body.state.angular.pos + body.state.angular.vel * t;
            view.style[cssTransform] = 'translate('+x+'px,'+y+'px) rotate('+ ang +'rad)';
        }
    };
});


// ---
// inside: src/renderers/pixi-renderer.js

/**
 * class PixiRenderer < Renderer
 *
 * Physics.renderer('pixi')
 *
 * Renderer that uses the PIXI.js library. [Documentation can be found here](https://github.com/wellcaffeinated/PhysicsJS/wiki/PIXI-Renderer).
 *
 * Additional config options:
 *
 * - debug: Draw debug shapes and bounding boxes. (default: `false`)
 * - metaEl: HTMLElement to write meta information like FPS and IPF into. (default: autogenerated)
 * - offset: Offset the shapes by this amount. (default: `{ x: 0, y: 0 }`)
 * - styles: Styles to use to draw the shapes. (see below)
 *
 * The styles property should contain _default_ styles for each shape you want to draw.
 *
 * Example:
 *
 * ```javascript
 * styles: {
 *    // Defines the default canvas colour
 *    'color': '0x66FF99',
 *
 *    'circle' : {
 *        strokeStyle: '0xE8900C',
 *        lineWidth: 3,
 *        fillStyle: '0xD5DE4C',
 *        angleIndicator: '0xE8900C'
 *    },
 *
 *    'convex-polygon' : {
 *        strokeStyle: '0xE8900C',
 *        lineWidth: 3,
 *        fillStyle: '0xD5DE4C',
 *        angleIndicator: '0xE8900C'
 *    }
 * }
 * ```
 **/
/* global PIXI */
Physics.renderer('pixi', function( parent ){

    if ( !document ){
        // must be in node environment
        return {};
    }

    var Pi2 = Math.PI * 2;

    var defaults = {

        // draw aabbs of bodies for debugging
        debug: false,
        // the element to place meta data into
        metaEl: null,
        offset: { x: 0, y: 0 },
        // Provide some default colours
        styles: {
            // Defines the default canvas colour
            'color': '0x66FF99',

            'point' : '0xE8900C',

            'circle' : {
                strokeStyle: '0xE8900C',
                lineWidth: 3,
                fillStyle: '0xD5DE4C',
                angleIndicator: '0xE8900C'
            },

            'convex-polygon' : {
                strokeStyle: '0xE8900C',
                lineWidth: 3,
                fillStyle: '0xD5DE4C',
                angleIndicator: '0xE8900C'
            }
        }
    };

    // deep copy callback to extend deeper into options
    var deep = function( a, b ){

        if ( Physics.util.isPlainObject( b ) ){

            return Physics.util.extend({}, a, b, deep );
        }

        return b !== undefined ? b : a;
    };

    return {

        // extended
        init: function( options ){

            if (typeof PIXI === 'undefined') {
                throw "PIXI obj not present - cannot continue ";
            }

            // call parent init
            parent.init.call(this, options);

            // further options
            this.options = Physics.util.extend({}, defaults, this.options, deep);
            this.options.offset = Physics.vector( this.options.offset );

            // Hook in PIXI stage here
            this.stage = new PIXI.Stage(this.options.styles.color);
            this.renderer = new PIXI.autoDetectRenderer(this.options.width, this.options.height);

            // Create empty meta object for use later
            this.meta = {};

            // add the renderer view element to the DOM according to its type
            if ( this.el.nodeName === 'CANVAS' ){
                this.renderer = new PIXI.autoDetectRenderer(this.options.width, this.options.height, this.el);
            } else {
                this.renderer = new PIXI.autoDetectRenderer(this.options.width, this.options.height);

                if ( this.el !== null ) {
                    this.el.appendChild(this.renderer.view);
                } else {
                    document.body.appendChild(this.renderer.view);
                }
            }
        },

        /**
         * PixiRenderer#loadSpriteSheets( assetsToLoad, callback ) -> this
         * - assetsToLoad (Array): Array of spritesheets to load
         * - callback (Function): Function to call when loading is complete
         *
         * Loads textures defined in a spritesheet
         **/
        loadSpriteSheets: function( assetsToLoad, callback ){

            if ( !Physics.util.isArray( assetsToLoad ) ) {
                throw 'Spritesheets must be defined in arrays';
            }

            var self = this
                ,loader = new PIXI.AssetLoader(assetsToLoad)
                ;

            // Start loading resources!
            loader.load();

            loader.on('onComplete', function(evt){
                self.assetsLoaded = true;
                callback();
            });

            return self;
        },

        /**
         * PixiRenderer#drawBody( body, view )
         * - body (Body): The body to draw
         * - view (DisplayObject): The pixi display object
         *
         * Draw a PIXI.DisplayObject to the stage.
         **/
        drawBody: function( body, view ){
            var pos = body.state.pos
                ,v = body.state.vel
                ,t = this._interpolateTime || 0
                ,x
                ,y
                ,ang
                ;

            // interpolate positions
            x = pos.x + v.x * t;
            y = pos.y + v.y * t;
            ang = body.state.angular.pos + body.state.angular.vel * t;

            view.position.x = x;
            view.position.y = y;
            view.rotation = ang;
        },

        // extended
        render: function( bodies, meta ){

            parent.render.call(this, bodies, meta);
            this.renderer.render(this.stage);
        },

        /**
         * PixiRenderer#createCircle( x, y, r, style ) -> PIXI.Graphics
         * - x (Number): The x coord
         * - y (Number): The y coord
         * - r (Number): The circle radius
         * - style (Object): The styles configuration
         * + (PIXI.Graphics): A graphic object representing a circle.
         *
         * Create a circle for use in PIXI stage
         **/
        createCircle: function( x, y, r, style ){

            var graphics = new PIXI.Graphics();
            graphics.beginFill(style.fillStyle);
            graphics.lineStyle(style.lineWidth, style.strokeStyle);
            graphics.drawCircle(x, y, r);
            // Center the graphics to the circle
            graphics.pivot.x = (x / 2) + (r / 2);
            graphics.pivot.y = (y / 2) + (r / 2);
            return graphics;
        },

        /**
         * PixiRenderer#createPolygon( verts, style ) -> PIXI.Graphics
         * - verts (Array): Array of [[Vectorish]] vertices
         * - style (Object): The styles configuration
         * + (PIXI.Graphics): A graphic object representing a polygon.
         *
         * Create a polygon for use in PIXI stage
         **/
        createPolygon: function( verts, styles ){

            var vert = verts[0]
                ,x = vert.x
                ,y = vert.y
                ,l = verts.length
                ,start = {
                    x: x
                    ,y: y
                }
                ,graphics = new PIXI.Graphics()
                ;

            graphics.beginFill(styles.fillStyle);
            graphics.lineStyle(styles.lineWidth, styles.strokeStyle);

            graphics.moveTo(x, y);

            for ( var i = 1; i < l; ++i ){

                vert = verts[ i ];
                x = vert.x;
                y = vert.y;
                graphics.lineTo(x, y);
            }

            if (l > 2){
                graphics.lineTo(start.x, start.y);
            }

            graphics.endFill();
            return graphics;
        },

        /**
         * PixiRenderer#createLine( from, to, style ) -> PIXI.Graphics
         * - from (Vectorish): Starting point
         * - to (Vectorish): Ending point
         * - style (Object): The styles configuration
         * + (PIXI.Graphics): A graphic object representing a polygon.
         *
         * Create a line for use in PIXI stage
         **/
        createLine: function( from, to, styles ){

            var x = from.x
                ,y = from.y
                ;

            var graphics = new PIXI.Graphics();
            graphics.beginFill(styles.fillStyle);
            graphics.lineStyle(styles.lineWidth, styles.strokeStyle);

            graphics.moveTo(x, y);

            x = to.x;
            y = to.y;

            graphics.lineTo(x, y);

            graphics.endFill();
            return graphics;
        },

        // extended
        createView: function( geometry ){

            var view = null
                ,aabb = geometry.aabb()
                ,hw = aabb.hw + Math.abs(aabb.x)
                ,hh = aabb.hh + Math.abs(aabb.y)
                ,x = hw + 1
                ,y = hh + 1
                ,name = geometry.name
                ;

            var styles = styles || this.options.styles[ name ];

            x += styles.lineWidth | 0;
            y += styles.lineWidth | 0;

            if (name === 'circle'){

                view = this.createCircle(x, y, geometry.radius, styles);

            } else if (name === 'convex-polygon'){

                view = this.createPolygon(geometry.vertices, styles);
            }

            if (styles.angleIndicator){

                view.beginFill(styles.angleIndicator);
                view.moveTo((x / 2), (5 + styles.lineWidth));
                view.lineTo((x / 2) + (geometry.radius / 2), geometry.radius);
                // Center the graphics to the circle
                view.endFill();

            }
            if (view) {
                this.stage.addChild(view);
                return view;
            } else {
                throw "Invalid view name passed.";
            }

        },

        // extended
        drawMeta: function( meta ){
            if (!this.meta.loaded){
                // define the font style here
                var fontStyles = {
                    font: "18px Snippet",
                    fill: "white",
                    align: "left"
                };
                this.meta.fps = new PIXI.Text('FPS: ' + meta.fps.toFixed(2), fontStyles);
                this.meta.fps.position.x = 15;
                this.meta.fps.position.y = 5;

                this.meta.ipf = new PIXI.Text('IPF: ' + meta.ipf, fontStyles);
                this.meta.ipf.position.x = 15;
                this.meta.ipf.position.y = 30;

                this.stage.addChild(this.meta.fps);
                this.stage.addChild(this.meta.ipf);
                this.meta.loaded = true;
            } else {
                this.meta.fps.setText('FPS: ' + meta.fps.toFixed(2));
                this.meta.ipf.setText('IPF: ' + meta.ipf);
            }
        },

        /**
         * PixiRenderer#createDisplay( type, options ) -> PIXI.DisplayObject
         * - type (String): The type of PIXI.DisplayObject to make
         * - options (Object): Options to apply to the view.
         * + (PIXI.DisplayObject): An object that is renderable.
         *
         * Create a PIXI sprite or movie clip.
         **/
        createDisplay: function( type, options ){
            var view = null
                ,texture = null
                ;
            switch (type){
                // Create a sprite object
                case 'sprite':
                    texture = PIXI.Texture.fromImage(options.texture);
                    view = new PIXI.Sprite(texture);
                    if (options.anchor ) {
                        view.anchor.x = options.anchor.x;
                        view.anchor.y = options.anchor.y;
                    }
                    // If a container is specified, use add to that container
                    if (options.container) {
                        options.container.addChild(view);
                    } else {
                        // Otherwise just add the view to the stage
                        this.stage.addChild(view);
                    }
                    return view;
                // Create a movieclip object
                case 'movieclip':
                    if (!this.assetsLoaded) {
                        throw "No assets have been loaded. Use loadSpritesheet() first";
                    }
                    var tex = []
                        ,i = 0
                        ;
                    // Populate our movieclip
                    for (i; i < options.frames.length; i++) {
                        texture = PIXI.Texture.fromFrame(options.frames[i]);
                        tex.push(texture);
                    }
                    view = new PIXI.MovieClip(tex);
                    if (options.anchor ) {
                        view.anchor.x = options.anchor.x;
                        view.anchor.y = options.anchor.y;
                    }
                    // If a container is specified, use add to that container
                    if (options.container) {
                        options.container.addChild(view);
                    } else {
                        // Otherwise just add the view to the stage
                        this.stage.addChild(view);
                    }
                    return view;
                // Create a default case
                default:
                    throw 'Invalid PIXI.DisplayObject passed';
            }
        },

        /**
         * PixiRenderer#centerAnchor( view )
         * - view (PIXI.DisplayObject): The view to center
         *
         * Centers the anchor to {x: 0.5, y: 0.5} of a view
         **/
        centerAnchor: function( view ) {
            if (view !== null){
                view.anchor.x = 0.5;
                view.anchor.y = 0.5;
            }
        }
    };
});


// ---
// inside: src/outro.js

return Physics;
}));