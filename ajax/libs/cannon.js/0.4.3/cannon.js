/*
 * Copyright (c) 2012 cannon.js Authors
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function () {
/**
 * @page About
 * cannon.js is a lightweight 3D physics engine for web applications. For more information and source code, go to the Github repository [schteppe/cannon.js](https://github.com/schteppe/cannon.js).
 */

/**
 * @library cannon.js
 * @version 0.4.2
 * @brief A lightweight 3D physics engine for the web
 */

var CANNON = CANNON || {};

// Maintain compatibility with older browsers
// @todo: check so ordinary Arrays work.
if(!this.Int32Array){
  this.Int32Array=Array;
  this.Float32Array=Array;
}/*global CANNON:true */

/**
 * @class CANNON.Broadphase
 * @author schteppe
 * @brief Base class for broadphase implementations
 */
CANNON.Broadphase = function(){
  /// The world to search for collisions in.
  this.world = null;
};
CANNON.Broadphase.prototype.constructor = CANNON.BroadPhase;

/**
 * @method collisionPairs
 * @memberof CANNON.Broadphase
 * @brief Get the collision pairs from the world
 * @param CANNON.World world The world to search in
 * @return array An array with two subarrays of body indices
 */
CANNON.Broadphase.prototype.collisionPairs = function(world){
  throw "collisionPairs not implemented for this BroadPhase class!";
};

/*global CANNON:true */

/**
 * @class CANNON.NaiveBroadphase
 * @brief Naive broadphase implementation, used in lack of better ones.
 * @description The naive broadphase looks at all possible pairs without restriction, therefore it has complexity N^2 (which is bad)
 * @extends CANNON.Broadphase
 */
CANNON.NaiveBroadphase = function(){
  this.temp = {
    r: new CANNON.Vec3(),
    normal: new CANNON.Vec3(),
    quat: new CANNON.Quaternion()
  };
};
CANNON.NaiveBroadphase.prototype = new CANNON.Broadphase();
CANNON.NaiveBroadphase.prototype.constructor = CANNON.NaiveBroadphase;

/**
 * @method collisionPairs
 * @memberof CANNON.NaiveBroadphase
 * @brief Get all the collision pairs in the physics world
 * @param CANNON.World world
 * @return array An array containing two arrays of integers. The integers corresponds to the body indices.
 */
CANNON.NaiveBroadphase.prototype.collisionPairs = function(world){
    var pairs1 = [], pairs2 = [];
    var n = world.numObjects(),
    bodies = world.bodies;

    // Local fast access
    var types = CANNON.Shape.types;
    var BOX_SPHERE_COMPOUND_CONVEX = types.SPHERE | types.BOX | types.COMPOUND | types.CONVEXPOLYHEDRON,
    PLANE = types.PLANE,
    STATIC_OR_KINEMATIC = CANNON.Body.STATIC | CANNON.Body.KINEMATIC;

    // Temp vecs
    var temp = this.temp;
    var r = temp.r,
    normal = temp.normal,
    quat = temp.quat;

    // Naive N^2 ftw!
    for(var i=0; i<n; i++){
	for(var j=0; j<i; j++){
	    var bi = bodies[i], bj = bodies[j];

	    if(((bi.motionstate & STATIC_OR_KINEMATIC)!==0 || bi.isSleeping()) &&
	       ((bj.motionstate & STATIC_OR_KINEMATIC)!==0 || bj.isSleeping())) {
  		// Both bodies are static, kinematic or sleeping. Skip.
		continue;
	    }

	    var bishape = bi.shape, bjshape = bj.shape;
	    if(bishape && bjshape){
		var ti = bishape.type, tj = bjshape.type;

		// --- Box / sphere / compound / convexpolyhedron collision ---
		if((ti & BOX_SPHERE_COMPOUND_CONVEX) && (tj & BOX_SPHERE_COMPOUND_CONVEX)){
		    // Rel. position
		    bj.position.vsub(bi.position,r);

		    var boundingRadiusSum = bishape.boundingSphereRadius() + bjshape.boundingSphereRadius();
		    if(r.norm2()<boundingRadiusSum*boundingRadiusSum){
			pairs1.push(bi);
			pairs2.push(bj);
		    }

		    // --- Sphere/box/compound/convexpoly versus plane ---
		} else if((ti & BOX_SPHERE_COMPOUND_CONVEX) && (tj & types.PLANE) || (tj & BOX_SPHERE_COMPOUND_CONVEX) && (ti & types.PLANE)){
		    var pi = (ti===PLANE) ? i : j, // Plane
		    oi = (ti!==PLANE) ? i : j; // Other
		    
		    // Rel. position
		    bodies[oi].position.vsub(bodies[pi].position,r);
		    bodies[pi].quaternion.vmult(bodies[pi].shape.normal,normal);
		    
		    var q = r.dot(normal) - bodies[oi].shape.boundingSphereRadius();
		    if(q<0.0){
			pairs1.push(bi);
			pairs2.push(bj);
		    }
		}
	    } else {
		// Particle without shape
		if(!bishape && !bjshape){
		    // No collisions between 2 particles
		} else {
		    var particle = bishape ? bj : bi;
		    var other = bishape ? bi : bj;
		    var otherShape = other.shape;
		    var type = otherShape.type;

		    if(type & BOX_SPHERE_COMPOUND_CONVEX){
			// todo: particle vs box,sphere,compound,convex
		    } else if(type & types.PLANE){
			// particle/plane
			var relpos = new CANNON.Vec3(); // todo: cache
			particle.position.vsub(other.position,relpos);
			if(otherShape.normal.dot(relpos)<=0.0){
			    pairs1.push(particle);
			    pairs2.push(other);
			}
		    }
		}
	    }
	}
    }
    return [pairs1,pairs2];
};
/*global CANNON:true */

/**
 * @class CANNON.Ray
 * @author Originally written by mr.doob / http://mrdoob.com/ for Three.js. Cannon.js-ified by schteppe.
 * @brief A line in 3D space that intersects bodies and return points.
 * @param CANNON.Vec3 origin
 * @param CANNON.Vec3 direction
 */
CANNON.Ray = function(origin, direction){
    this.origin = origin || new CANNON.Vec3();
    this.direction = direction || new CANNON.Vec3();

    var precision = 0.0001;

    /**
     * @method setPrecision
     * @memberof CANNON.Ray
     * @param float value
     * @brief Sets the precision of the ray. Used when checking parallelity etc.
     */
    this.setPrecision = function ( value ) {
	precision = value;
    };

    var a = new CANNON.Vec3();
    var b = new CANNON.Vec3();
    var c = new CANNON.Vec3();
    var d = new CANNON.Vec3();

    var directionCopy = new CANNON.Vec3();

    var vector = new CANNON.Vec3();
    var normal = new CANNON.Vec3();
    var intersectPoint = new CANNON.Vec3()

    /**
     * @method intersectBody
     * @memberof CANNON.Ray
     * @param CANNON.RigidBody body
     * @brief Shoot a ray at a body, get back information about the hit.
     * @return Array An array of results. The result objects has properties: distance (float), point (CANNON.Vec3) and body (CANNON.RigidBody).
     */
    this.intersectBody = function ( body ) {
	if(body.shape instanceof CANNON.ConvexPolyhedron){
	    return this.intersectShape(body.shape,
				       body.quaternion,
				       body.position,
				       body);
	} else if(body.shape instanceof CANNON.Box){
	    return this.intersectShape(body.shape.convexPolyhedronRepresentation,
				       body.quaternion,
				       body.position,
				       body);
	} else
	    console.warn("Ray intersection is this far only implemented for ConvexPolyhedron and Box shapes.");
    };
    
    /**
     * @method intersectShape
     * @memberof CANNON.Ray
     * @param CANNON.Shape shape
     * @param CANNON.Quaternion quat
     * @param CANNON.Vec3 position
     * @param CANNON.RigidBody body
     * @return Array See intersectBody()
     */
    this.intersectShape = function(shape,quat,position,body){

	var intersect, intersects = [];

	if ( shape instanceof CANNON.ConvexPolyhedron ) {
	    // Checking boundingSphere

	    var distance = distanceFromIntersection( this.origin, this.direction, position );
	    if ( distance > shape.boundingSphereRadius() ) {
		return intersects;
	    }

	    // Checking faces
	    var dot, scalar, faces = shape.faces, vertices = shape.vertices, normals = shape.faceNormals;


	    for ( fi = 0; fi < faces.length; fi++ ) {

		var face = faces[ fi ];
		var faceNormal = normals[ fi ];
		var q = quat;
		var x = position;

		// determine if ray intersects the plane of the face
		// note: this works regardless of the direction of the face normal

		// Get plane point in world coordinates...
		vertices[face[0]].copy(vector);
		q.vmult(vector,vector);
		vector.vadd(x,vector);

		// ...but make it relative to the ray origin. We'll fix this later.
		vector.vsub(this.origin,vector);

		// Get plane normal
		q.vmult(faceNormal,normal);

		// If this dot product is negative, we have something interesting
		dot = this.direction.dot(normal);
		
		// bail if ray and plane are parallel
		if ( Math.abs( dot ) < precision ) continue;

		// calc distance to plane
		scalar = normal.dot( vector ) / dot;

		// if negative distance, then plane is behind ray
		if ( scalar < 0 ) continue;

		if (  dot < 0 ) {

		    // Intersection point is origin + direction * scalar
		    this.direction.mult(scalar,intersectPoint);
		    intersectPoint.vadd(this.origin,intersectPoint);

		    // a is the point we compare points b and c with.
		    vertices[ face[0] ].copy(a);
		    q.vmult(a,a);
		    x.vadd(a,a);

		    for(var i=1; i<face.length-1; i++){
			// Transform 3 vertices to world coords
			vertices[ face[i] ].copy(b);
			vertices[ face[i+1] ].copy(c);
			q.vmult(b,b);
			q.vmult(c,c);
			x.vadd(b,b);
			x.vadd(c,c);
		    
			if ( pointInTriangle( intersectPoint, a, b, c ) ) {

			    intersect = {

				distance: this.origin.distanceTo( intersectPoint ),
				point: intersectPoint.copy(),
				face: face,
				body: body
				
			    };
			    
			    intersects.push( intersect );
			    break;
			    
			}

		    }
		}

	    }

	}
	    

	return intersects;

    }

    /**
     * @method intersectBodies
     * @memberof CANNON.Ray
     * @param Array bodies An array of CANNON.RigidBody objects.
     * @return Array See intersectBody
     */
    this.intersectBodies = function ( bodies ) {

	var intersects = [];

	for ( var i = 0, l = bodies.length; i < l; i ++ ) {
	    var result = this.intersectBody( bodies[ i ] );
	    Array.prototype.push.apply( intersects, result );

	}

	intersects.sort( function ( a, b ) { return a.distance - b.distance; } );

	return intersects;

    };

    var v0 = new CANNON.Vec3(), intersect = new CANNON.Vec3();
    var dot, distance;

    function distanceFromIntersection( origin, direction, position ) {

	// v0 is vector from origin to position
	position.vsub(origin,v0);
	dot = v0.dot( direction );

	// intersect = direction*dot + origin
	direction.mult(dot,intersect);
	intersect.vadd(origin,intersect);
	
	distance = position.distanceTo( intersect );

	return distance;

    }

    // http://www.blackpawn.com/texts/pointinpoly/default.html

    var dot00, dot01, dot02, dot11, dot12, invDenom, u, v;
    var v1 = new CANNON.Vec3(), v2 = new CANNON.Vec3();

    function pointInTriangle( p, a, b, c ) {
	c.vsub(a,v0);
	b.vsub(a,v1);
	p.vsub(a,v2);

	dot00 = v0.dot( v0 );
	dot01 = v0.dot( v1 );
	dot02 = v0.dot( v2 );
	dot11 = v1.dot( v1 );
	dot12 = v1.dot( v2 );

	invDenom = 1 / ( dot00 * dot11 - dot01 * dot01 );
	u = ( dot11 * dot02 - dot01 * dot12 ) * invDenom;
	v = ( dot00 * dot12 - dot01 * dot02 ) * invDenom;

	return ( u >= 0 ) && ( v >= 0 ) && ( u + v < 1 );
    }
};
CANNON.Ray.prototype.constructor = CANNON.Ray;
/*global CANNON:true */

/**
 * @class CANNON.Mat3
 * @brief A 3x3 matrix.
 * @param array elements Array of nine elements. Optional.
 * @author schteppe / http://github.com/schteppe
 */
CANNON.Mat3 = function(elements){
  /**
   * @property Float32Array elements
   * @memberof CANNON.Mat3
   * @brief A vector of length 9, containing all matrix elements
   */
  if(elements){
    this.elements = new Float32Array(elements);
  } else {
    this.elements = new Float32Array(9);
  }
};

/**
 * @method identity
 * @memberof CANNON.Mat3
 * @brief Sets the matrix to identity
 * @todo Should perhaps be renamed to setIdentity() to be more clear.
 * @todo Create another function that immediately creates an identity matrix eg. eye()
 */
CANNON.Mat3.prototype.identity = function(){
  this.elements[0] = 1;
  this.elements[1] = 0;
  this.elements[2] = 0;

  this.elements[3] = 0;
  this.elements[4] = 1;
  this.elements[5] = 0;

  this.elements[6] = 0;
  this.elements[7] = 0;
  this.elements[8] = 1;
};

/**
 * @method vmult
 * @memberof CANNON.vmult
 * @brief Matrix-Vector multiplication
 * @param CANNON.Vec3 v The vector to multiply with
 * @param CANNON.Vec3 target Optional, target to save the result in.
 */
CANNON.Mat3.prototype.vmult = function(v,target){
  if(target===undefined){
    target = new CANNON.Vec3();
  }

  var vec = [v.x, v.y, v.z];
  var targetvec = [0, 0, 0];
  for(var i=0; i<3; i++){
    for(var j=0; j<3; j++){
      targetvec[i] += this.elements[i+3*j]*vec[i];
    }
  }

  target.x = targetvec[0];
  target.y = targetvec[1];
  target.z = targetvec[2];
  return target;
};

/**
 * @method smult
 * @memberof CANNON.Mat3
 * @brief Matrix-scalar multiplication
 * @param float s
 */
CANNON.Mat3.prototype.smult = function(s){
  for(var i=0; i<this.elements.length; i++){
    this.elements[i] *= s;
  }
};

/**
 * @method mmult
 * @memberof CANNON.Mat3
 * @brief Matrix multiplication
 * @param CANNON.Mat3 m Matrix to multiply with from left side.
 * @return CANNON.Mat3 The result.
 */
CANNON.Mat3.prototype.mmult = function(m){
  var r = new CANNON.Mat3();
  for(var i=0; i<3; i++){
    for(var j=0; j<3; j++){
      var sum = 0.0;
      for(var k=0; k<3; k++){
	sum += this.elements[i+k] * m.elements[k+j*3];
      }
      r.elements[i+j*3] = sum;
    }
  }
  return r;
};

/**
 * @method solve
 * @memberof CANNON.Mat3
 * @brief Solve Ax=b
 * @param CANNON.Vec3 b The right hand side
 * @param CANNON.Vec3 target Optional. Target vector to save in.
 * @return CANNON.Vec3 The solution x
 */
CANNON.Mat3.prototype.solve = function(b,target){

  target = target || new CANNON.Vec3();

  // Construct equations
  var nr = 3; // num rows
  var nc = 4; // num cols
  var eqns = new Float32Array(nr*nc);
  var i,j;
  for(i=0; i<3; i++){
    for(j=0; j<3; j++){
      eqns[i+nc*j] = this.elements[i+3*j];
    }
  }
  eqns[3+4*0] = b.x;
  eqns[3+4*1] = b.y;
  eqns[3+4*2] = b.z;
  
  // Compute right upper triangular version of the matrix - Gauss elimination
  var n = 3, k = n, np;
  var kp = 4; // num rows
  var p, els;
  do {
    i = k - n;
    if (eqns[i+nc*i] === 0) {
      for (j = i + 1; j < k; j++) {
	if (eqns[i+nc*j] !== 0) {
	  els = [];
	  np = kp;
	  do {
	    p = kp - np;
	    els.push(eqns[p+nc*i] + eqns[p+nc*j]);
	  } while (--np);
	  eqns[i+nc*0] = els[0];
	  eqns[i+nc*1] = els[1];
	  eqns[i+nc*2] = els[2];
	  break;
	}
      }
    }
    if (eqns[i+nc*i] !== 0) {
      for (j = i + 1; j < k; j++) {
	var multiplier = eqns[i+nc*j] / eqns[i+nc*i];
	els = [];
	np = kp;
	do {
	  p = kp - np;
	  els.push(p <= i ? 0 : eqns[p+nc*j] - eqns[p+nc*i] * multiplier);
	} while (--np);
	eqns[j+nc*0] = els[0];
	eqns[j+nc*1] = els[1];
	eqns[j+nc*2] = els[2];
      }
    }
  } while (--n);
  // Get the solution
  target.z = eqns[2*nc+3] / eqns[2*nc+2];
  target.y = (eqns[1*nc+3] - eqns[1*nc+2]*target.z) / eqns[1*nc+1];
  target.x = (eqns[0*nc+3] - eqns[0*nc+2]*target.z - eqns[0*nc+1]*target.y) / eqns[0*nc+0];

  if(isNaN(target.x) || isNaN(target.y) || isNaN(target.z) || target.x===Infinity || target.y===Infinity || target.z===Infinity){
    throw "Could not solve equation! Got x=["+target.toString()+"], b=["+b.toString()+"], A=["+this.toString()+"]";
  }

  return target;
};

/**
 * @method e
 * @memberof CANNON.Mat3
 * @brief Get an element in the matrix by index. Index starts at 0, not 1!!!
 * @param int i
 * @param int j
 * @param float value Optional. If provided, the matrix element will be set to this value.
 * @return float
 */
CANNON.Mat3.prototype.e = function(i,j,value){
  if(value===undefined){
    return this.elements[i+3*j];
  } else {
    // Set value
    this.elements[i+3*j] = value;
  }
};

/**
 * @method copy
 * @memberof CANNON.Mat3
 * @brief Copy the matrix
 * @param CANNON.Mat3 target Optional. Target to save the copy in.
 * @return CANNON.Mat3
 */
CANNON.Mat3.prototype.copy = function(target){
  target = target || new CANNON.Mat3();
  for(var i=0; i<this.elements.length; i++){
    target.elements[i] = this.elements[i];
  }
  return target;
};

/**
 * @method toString
 * @memberof CANNON.Mat3
 * @brief Returns a string representation of the matrix.
 * @return string
 */
CANNON.Mat3.prototype.toString = function(){
  var r = "";
  var sep = ",";
  for(var i=0; i<9; i++){
    r += this.elements[i] + sep;
  }
  return r;
};/*global CANNON:true */

/**
 * @class CANNON.Vec3
 * @brief 3-dimensional vector
 * @param float x
 * @param float y
 * @param float z
 * @author schteppe
 */
CANNON.Vec3 = function(x,y,z){
  /**
   * @property float x
   * @memberof CANNON.Vec3
   */
  this.x = x||0.0;
  /**
   * @property float y
   * @memberof CANNON.Vec3
   */
  this.y = y||0.0;
  /**
   * @property float z
   * @memberof CANNON.Vec3
   */
  this.z = z||0.0;
};

/**
 * @method cross
 * @memberof CANNON.Vec3
 * @brief Vector cross product
 * @param CANNON.Vec3 v
 * @param CANNON.Vec3 target Optional. Target to save in.
 * @return CANNON.Vec3
 */
CANNON.Vec3.prototype.cross = function(v,target){
    var vx=v.x, vy=v.y, vz=v.z, x=this.x, y=this.y, z=this.z;
    target = target || new CANNON.Vec3();

    var A = [this.x, this.y, this.z];
    var B = [v.x, v.y, v.z];
    
    /*target.x = (A[1] * B[2]) - (A[2] * B[1]);
    target.y = (A[2] * B[0]) - (A[0] * B[2]);
    target.z = (A[0] * B[1]) - (A[1] * B[0]);*/
    target.x = (y * vz) - (z * vy);
    target.y = (z * vx) - (x * vz);
    target.z = (x * vy) - (y * vx);
    
    return target;
};

/**
 * @method set
 * @memberof CANNON.Vec3
 * @brief Set the vectors' 3 elements
 * @param float x
 * @param float y
 * @param float z
 * @return CANNON.Vec3
 */
CANNON.Vec3.prototype.set = function(x,y,z){
  this.x = x;
  this.y = y;
  this.z = z;
  return this;
};
    
/**
 * @method vadd
 * @memberof CANNON.Vec3
 * @brief Vector addition
 * @param CANNON.Vec3 v
 * @param CANNON.Vec3 target Optional.
 * @return CANNON.Vec3
 */
CANNON.Vec3.prototype.vadd = function(v,target){
  if(target){
    target.x = v.x + this.x;
    target.y = v.y + this.y;
    target.z = v.z + this.z;
  } else {
    return new CANNON.Vec3(this.x + v.x,
			   this.y + v.y,
			   this.z + v.z);
  }  
};
    
/**
 * @method vsub
 * @memberof CANNON.Vec3
 * @brief Vector subtraction
 * @param CANNON.Vec3 v
 * @param CANNON.Vec3 target Optional. Target to save in.
 * @return CANNON.Vec3
 */
CANNON.Vec3.prototype.vsub = function(v,target){
  if(target){
    target.x = this.x - v.x;
    target.y = this.y - v.y;
    target.z = this.z - v.z;
  } else {
    return new CANNON.Vec3(this.x-v.x,
			   this.y-v.y,
			   this.z-v.z);
  }
};

/**
 * @method crossmat
 * @memberof CANNON.Vec3
 * @brief Get the cross product matrix a_cross from a vector, such that a x b = a_cross * b = c
 * @see http://www8.cs.umu.se/kurser/TDBD24/VT06/lectures/Lecture6.pdf
 * @return CANNON.Mat3
 */
CANNON.Vec3.prototype.crossmat = function(){
  return new CANNON.Mat3([      0,  -this.z,   this.y,
			    this.z,        0,  -this.x,
			   -this.y,   this.x,        0]);
};

/**
 * @method normalize
 * @memberof CANNON.Vec3
 * @brief Normalize the vector. Note that this changes the values in the vector.
 * @return float Returns the norm of the vector
 */
CANNON.Vec3.prototype.normalize = function(){
    var x=this.x, y=this.y, z=this.z;
    var n = Math.sqrt(x*x + y*y + z*z);
    if(n>0.0){
	var invN = 1/n;
	this.x *= invN;
	this.y *= invN;
	this.z *= invN;
    } else {
	// Make something up
	this.x = 0;
	this.y = 0;
	this.z = 0;
    }
    return n;
};

/**
 * @method unit
 * @memberof CANNON.Vec3
 * @brief Get the version of this vector that is of length 1.
 * @param CANNON.Vec3 target Optional target to save in
 * @return CANNON.Vec3 Returns the unit vector
 */
CANNON.Vec3.prototype.unit = function(target){
    target = target || new CANNON.Vec3();
    var x=this.x, y=this.y, z=this.z;
    var ninv = Math.sqrt(x*x + y*y + z*z);
    if(ninv>0.0){
	ninv = 1.0/ninv;
	target.x = x * ninv;
	target.y = y * ninv;
	target.z = z * ninv;
    } else {
	target.x = 0;
	target.y = 0;
	target.z = 0;
    }
    return target;
};

/**
 * @method norm
 * @memberof CANNON.Vec3
 * @brief Get the 2-norm (length) of the vector
 * @return float
 */
CANNON.Vec3.prototype.norm = function(){
    var x=this.x, y=this.y, z=this.z;
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * @method norm2
 * @memberof CANNON.Vec3
 * @brief Get the squared length of the vector
 * @return float
 */
CANNON.Vec3.prototype.norm2 = function(){
    return this.dot(this);
};

CANNON.Vec3.prototype.distanceTo = function(p){
    var x=this.x, y=this.y, z=this.z;
    var px=p.x, py=p.y, pz=p.z;
    return Math.sqrt((px-x)*(px-x)+
		     (py-y)*(py-y)+
		     (pz-z)*(pz-z));
};

/**
 * @method mult
 * @memberof CANNON.Vec3
 * @brief Multiply the vector with a scalar
 * @param float scalar
 * @param CANNON.Vec3 target
 * @return CANNON.Vec3
 */
CANNON.Vec3.prototype.mult = function(scalar,target){
  if(!target)
    target = new CANNON.Vec3();
  target.x = scalar*this.x;
  target.y = scalar*this.y;
  target.z = scalar*this.z;
  return target;
};

/**
 * @method dot
 * @memberof CANNON.Vec3
 * @brief Calculate dot product
 * @param CANNON.Vec3 v
 * @return float
 */
CANNON.Vec3.prototype.dot = function(v){
  return (this.x * v.x + this.y * v.y + this.z * v.z);
};

/**
 * @method isZero
 * @memberof CANNON.Vec3
 * @return bool
 */
CANNON.Vec3.prototype.isZero = function(){
  return this.x===0 && this.y===0 && this.z===0;
}

/**
 * @method negate
 * @memberof CANNON.Vec3
 * @brief Make the vector point in the opposite direction.
 * @param CANNON.Vec3 target Optional target to save in
 * @return CANNON.Vec3
 */
CANNON.Vec3.prototype.negate = function(target){
  target = target || new CANNON.Vec3();
  target.x = -this.x;
  target.y = -this.y;
  target.z = -this.z;
  return target;
};

/**
 * @method tangents
 * @memberof CANNON.Vec3
 * @brief Compute two artificial tangents to the vector
 * @param CANNON.Vec3 t1 Vector object to save the first tangent in
 * @param CANNON.Vec3 t2 Vector object to save the second tangent in
 */
CANNON.Vec3.prototype.tangents = function(t1,t2){
  var norm = this.norm();
  if(norm>0.0){
    var n = new CANNON.Vec3(this.x/norm,
			    this.y/norm,
			    this.z/norm);
    if(n.x<0.9){
      var rand = Math.random();
      n.cross(new CANNON.Vec3(rand,0.0000001,0).unit(),t1);
    } else
      n.cross(new CANNON.Vec3(0.0000001,rand,0).unit(),t1);
    n.cross(t1,t2);
  } else {
    // The normal length is zero, make something up
    t1.set(1,0,0).normalize();
    t2.set(0,1,0).normalize();
  }
};

/**
 * @method toString
 * @memberof CANNON.Vec3
 * @brief Converts to a more readable format
 * @return string
 */
CANNON.Vec3.prototype.toString = function(){
  return this.x+","+this.y+","+this.z;
};

/**
 * @method copy
 * @memberof CANNON.Vec3
 * @brief Copy the vector.
 * @param CANNON.Vec3 target
 * @return CANNON.Vec3
 */
CANNON.Vec3.prototype.copy = function(target){
  target = target || new CANNON.Vec3();
  target.x = this.x;
  target.y = this.y;
  target.z = this.z;
  return target;
};


/**
 * @method lerp
 * @memberof CANNON.Vec3
 * @brief Do a linear interpolation between two vectors
 * @param CANNON.Vec3 v
 * @param float t A number between 0 and 1. 0 will make this function return u, and 1 will make it return v. Numbers in between will generate a vector in between them.
 * @param CANNON.Vec3 target
 */
CANNON.Vec3.prototype.lerp = function(v,t,target){
    var x=this.x, y=this.y, z=this.z;
    target.x = x + (v.x-x)*t;
    target.y = y + (v.y-y)*t;
    target.z = z + (v.z-z)*t;
};

/**
 * @method almostEquals
 * @memberof CANNON.Vec3
 * @brief Check if a vector equals is almost equal to another one.
 * @param CANNON.Vec3 v
 * @param float precision
 * @return bool
 */
CANNON.Vec3.prototype.almostEquals = function(v,precision){
  if(precision===undefined)
    precision = 1e-6;
  if(Math.abs(this.x-v.x)>precision ||
     Math.abs(this.y-v.y)>precision ||
     Math.abs(this.z-v.z)>precision)
    return false;
  return true;
}

/**
 * Check if a vector is almost zero
 */
CANNON.Vec3.prototype.almostZero = function(precision){
  if(precision===undefined)
    precision = 1e-6;
  if(Math.abs(this.x)>precision ||
     Math.abs(this.y)>precision ||
     Math.abs(this.z)>precision)
    return false;
  return true;
}/*global CANNON:true */

/**
 * @class CANNON.Quaternion
 * @brief A Quaternion describes a rotation in 3D space.
 * @description The Quaternion is mathematically defined as Q = x*i + y*j + z*k + w, where (i,j,k) are imaginary basis vectors. (x,y,z) can be seen as a vector related to the axis of rotation, while the real multiplier, w, is related to the amount of rotation.
 * @param float x Multiplier of the imaginary basis vector i.
 * @param float y Multiplier of the imaginary basis vector j.
 * @param float z Multiplier of the imaginary basis vector k.
 * @param float w Multiplier of the real part.
 * @see http://en.wikipedia.org/wiki/Quaternion
 */
CANNON.Quaternion = function(x,y,z,w){
  /**
   * @property float x
   * @memberof CANNON.Quaternion
   */
  this.x = x!=undefined ? x : 0;
  /**
   * @property float y
   * @memberof CANNON.Quaternion
   */
  this.y = y!=undefined ? y : 0;
  /**
   * @property float z
   * @memberof CANNON.Quaternion
   */
  this.z = z!=undefined ? z : 0;
  /**
   * @property float w
   * @memberof CANNON.Quaternion
   * @brief The multiplier of the real quaternion basis vector.
   */
  this.w = w!=undefined ? w : 1;
};

/**
 * Set the value of the quaternion.
 */
CANNON.Quaternion.prototype.set = function(x,y,z,w){
  this.x = x;
  this.y = y;
  this.z = z;
  this.w = w;
};

/**
 * @method toString
 * @memberof CANNON.Quaternion
 * @brief Convert to a readable format
 * @return string
 */
CANNON.Quaternion.prototype.toString = function(){
  return this.x+","+this.y+","+this.z+","+this.w;
};

/**
 * @method setFromAxisAngle
 * @memberof CANNON.Quaternion
 * @brief Set the quaternion components given an axis and an angle.
 * @param CANNON.Vec3 axis
 * @param float angle in radians
 */
CANNON.Quaternion.prototype.setFromAxisAngle = function(axis,angle){
  var s = Math.sin(angle*0.5);
  this.x = axis.x * s;
  this.y = axis.y * s;
  this.z = axis.z * s;
  this.w = Math.cos(angle*0.5);
};

// saves axis to targetAxis and returns 
CANNON.Quaternion.prototype.toAxisAngle = function(targetAxis){
    targetAxis = targetAxis || new CANNON.Vec3();
    this.normalize(); // if w>1 acos and sqrt will produce errors, this cant happen if quaternion is normalised
    var angle = 2 * Math.acos(this.w);
    var s = Math.sqrt(1-this.w*this.w); // assuming quaternion normalised then w is less than 1, so term always positive.
    if (s < 0.001) { // test to avoid divide by zero, s is always positive due to sqrt
	// if s close to zero then direction of axis not important
	targetAxis.x = this.x; // if it is important that axis is normalised then replace with x=1; y=z=0;
	targetAxis.y = this.y;
	targetAxis.z = this.z;
    } else {
	targetAxis.x = this.x / s; // normalise axis
	targetAxis.y = this.y / s;
	targetAxis.z = this.z / s;
    }
    return [targetAxis,angle];
};

/**
 * @method setFromVectors
 * @memberof CANNON.Quaternion
 * @brief Set the quaternion value given two vectors. The resulting rotation will be the needed rotation to rotate u to v.
 * @param CANNON.Vec3 u
 * @param CANNON.Vec3 v
 */
CANNON.Quaternion.prototype.setFromVectors = function(u,v){
  var a = u.cross(v);
  this.x = a.x;
  this.y = a.y;
  this.z = a.z;
  this.w = Math.sqrt(Math.pow(u.norm(),2) * Math.pow(v.norm(),2)) + u.dot(v);
  this.normalize();
};

/**
 * @method mult
 * @memberof CANNON.Quaternion
 * @brief Quaternion multiplication
 * @param CANNON.Quaternion q
 * @param CANNON.Quaternion target Optional.
 * @return CANNON.Quaternion
 */ 
var va = new CANNON.Vec3();
var vb = new CANNON.Vec3();
var vaxvb = new CANNON.Vec3();
CANNON.Quaternion.prototype.mult = function(q,target){
    var w = this.w;
    if(target==undefined)
	target = new CANNON.Quaternion();
    
    va.set(this.x,this.y,this.z);
    vb.set(q.x,q.y,q.z);
    target.w = w*q.w - va.dot(vb);
    va.cross(vb,vaxvb);
    target.x = w * vb.x + q.w*va.x + vaxvb.x;
    target.y = w * vb.y + q.w*va.y + vaxvb.y;
    target.z = w * vb.z + q.w*va.z + vaxvb.z;
    return target;
};

/**
 * @method inverse
 * @memberof CANNON.Quaternion
 * @brief Get the inverse quaternion rotation.
 * @param CANNON.Quaternion target
 * @return CANNON.Quaternion
 */
CANNON.Quaternion.prototype.inverse = function(target){
    var x = this.x, y = this.y, z = this.z, w = this.w;
    if(target==undefined)
	target = new CANNON.Quaternion();
    
    this.conjugate(target);
    var inorm2 = 1/(x*x + y*y + z*z + w*w);
    target.x *= inorm2;
    target.y *= inorm2;
    target.z *= inorm2;
    target.w *= inorm2;
    
    return target;
};

/**
 * @method conjugate
 * @memberof CANNON.Quaternion
 * @brief Get the quaternion conjugate
 * @param CANNON.Quaternion target
 * @return CANNON.Quaternion
 */
CANNON.Quaternion.prototype.conjugate = function(target){
  if(target==undefined)
    target = new CANNON.Quaternion();
  
  target.x = -this.x;
  target.y = -this.y;
  target.z = -this.z;
  target.w = this.w;

  return target;
};

/**
 * @method normalize
 * @memberof CANNON.Quaternion
 * @brief Normalize the quaternion. Note that this changes the values of the quaternion.
 */
CANNON.Quaternion.prototype.normalize = function(){
    var l = Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);
    if ( l === 0 ) {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.w = 0;
    } else {
	l = 1 / l;
	this.x *= l;
	this.y *= l;
	this.z *= l;
	this.w *= l;
    }
};

/**
 * @method normalizeFast
 * @memberof CANNON.Quaternion
 * @brief Approximation of quaternion normalization. Works best when quat is already almost-normalized.
 * @see http://jsperf.com/fast-quaternion-normalization
 * @author unphased, https://github.com/unphased
 */
CANNON.Quaternion.prototype.normalizeFast = function () {
    var f = (3.0-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2.0;
    if ( f === 0 ) {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.w = 0;
    } else {
	this.x *= f;
	this.y *= f;
	this.z *= f;
	this.w *= f;
    }
}

/**
 * @method vmult
 * @memberof CANNON.Quaternion
 * @brief Multiply the quaternion by a vector
 * @param CANNON.Vec3 v
 * @param CANNON.Vec3 target Optional
 * @return CANNON.Vec3
 */
CANNON.Quaternion.prototype.vmult = function(v,target){
  target = target || new CANNON.Vec3();
  if(this.w==0.0){
    target.x = v.x;
    target.y = v.y;
    target.z = v.z;
  } else {
    
    var x = v.x,
    y = v.y,
    z = v.z;
    
    var qx = this.x,
    qy = this.y,
    qz = this.z,
    qw = this.w;
    
    // q*v
    var ix =  qw * x + qy * z - qz * y,
    iy =  qw * y + qz * x - qx * z,
    iz =  qw * z + qx * y - qy * x,
    iw = -qx * x - qy * y - qz * z;
    
    target.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    target.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    target.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  }

  return target;
};

/**
 * @method copy
 * @memberof CANNON.Quaternion
 * @param CANNON.Quaternion target
 */
CANNON.Quaternion.prototype.copy = function(target){
  target.x = this.x;
  target.y = this.y;
  target.z = this.z;
  target.w = this.w;
};

/**
 * @method toEuler
 * @memberof CANNON.Quaternion
 * @brief Convert the quaternion to euler angle representation. Order: YZX, as this page describes: http://www.euclideanspace.com/maths/standards/index.htm
 * @param CANNON.Vec3 target
 * @param string order Three-character string e.g. "YZX", which also is default.
 */
CANNON.Quaternion.prototype.toEuler = function(target,order){
    order = order || "YZX";

    var heading, attitude, bank;
    var x = this.x, y = this.y, z = this.z, w = this.w;

    switch(order){
    case "YZX":
	var test = x*y + z*w;
	if (test > 0.499) { // singularity at north pole
	    heading = 2 * Math.atan2(x,w);
	    attitude = Math.PI/2;
	    bank = 0;
	}
	if (test < -0.499) { // singularity at south pole
	    heading = -2 * Math.atan2(x,w);
	    attitude = - Math.PI/2;
	    bank = 0;
	}
	if(isNaN(heading)){
	    var sqx = x*x;
	    var sqy = y*y;
	    var sqz = z*z;
	    heading = Math.atan2(2*y*w - 2*x*z , 1 - 2*sqy - 2*sqz); // Heading
	    attitude = Math.asin(2*test); // attitude
	    bank = Math.atan2(2*x*w - 2*y*z , 1 - 2*sqx - 2*sqz); // bank
	}
	break;
    default:
	throw new Error("Euler order "+order+" not supported yet.");
	break;
    }

    target.y = heading;
    target.z = attitude;
    target.x = bank;
};/*global CANNON:true */

/**
 * @class CANNON.Shape
 * @author schteppe
 * @brief Base class for shapes
 */
CANNON.Shape = function(){

  /**
   * @property int type
   * @memberof CANNON.Shape
   * @brief The type of this shape. Must be set to an int > 0 by subclasses.
   * @see CANNON.Shape.types
   */
  this.type = 0;

  this.aabbmin = new CANNON.Vec3();
  this.aabbmax = new CANNON.Vec3();
};
CANNON.Shape.prototype.constructor = CANNON.Shape;

/**
 * @method boundingSphereRadius
 * @memberof CANNON.Shape
 * @brief Get the bounding sphere radius from this shape
 * @return float
 */
CANNON.Shape.prototype.boundingSphereRadius = function(){
  throw "boundingSphereRadius() not implemented for shape type "+this.type;
};

/**
 * @method volume
 * @memberof CANNON.Shape
 * @brief Get the volume of this shape
 * @return float
 */
CANNON.Shape.prototype.volume = function(){
  throw "volume() not implemented for shape type "+this.type;
};

/**
 * @method calculateLocalInertia
 * @memberof CANNON.Shape
 * @brief Calculates the inertia in the local frame for this shape.
 * @return CANNON.Vec3
 * @see http://en.wikipedia.org/wiki/List_of_moments_of_inertia
 */
CANNON.Shape.prototype.calculateLocalInertia = function(mass,target){
  throw "calculateLocalInertia() not implemented for shape type "+this.type;
};

/**
 * @method calculateTransformedInertia
 * @memberof CANNON.Shape
 * @brief Calculates inertia in a specified frame for this shape.
 * @return CANNON.Vec3
 */
CANNON.Shape.prototype.calculateTransformedInertia = function(mass,quat,target){
  if(target==undefined)
    target = new CANNON.Vec3();

  // Compute inertia in the world frame
  quat.normalize();
  var localInertia = this.calculateLocalInertia(mass);

  // @todo Is this rotation OK? Check!
  var worldInertia = quat.vmult(localInertia);
  target.x = Math.abs(worldInertia.x);
  target.y = Math.abs(worldInertia.y);
  target.z = Math.abs(worldInertia.z);
  return target;
  //throw "calculateInertia() not implemented for shape type "+this.type;
};

/**
 * @enum CANNON.Shape.types
 * @brief The available shape types.
 */
CANNON.Shape.types = {
  SPHERE:1,
  PLANE:2,
  BOX:4,
  COMPOUND:8,
  CONVEXPOLYHEDRON:16
};

/*global CANNON:true */

/**
 * @class CANNON.Body
 * @brief Base class for all body types.
 * @param string type
 */
CANNON.Body = function(type){

  CANNON.EventTarget.apply(this);

  this.type = type;

  var that = this;

  /**
   * @property CANNON.World world
   * @memberof CANNON.Body
   * @brief Reference to the world the body is living in
   */
  this.world = null;

  /**
   * @property function preStep
   * @memberof CANNON.Body
   * @brief Callback function that is used BEFORE stepping the system. Use it to apply forces, for example. Inside the function, "this" will refer to this CANNON.Body object.
   * @todo dispatch an event from the World instead
   */
  this.preStep = null;

  /**
   * @property function postStep
   * @memberof CANNON.Body
   * @brief Callback function that is used AFTER stepping the system. Inside the function, "this" will refer to this CANNON.Body object.
   * @todo dispatch an event from the World instead
   */
  this.postStep = null;
};

/*
 * @brief A dynamic body is fully simulated. Can be moved manually by the user, but normally they move according to forces. A dynamic body can collide with all body types. A dynamic body always has finite, non-zero mass.
 */
CANNON.Body.DYNAMIC = 1;

/*
 * @brief A static body does not move during simulation and behaves as if it has infinite mass. Static bodies can be moved manually by setting the position of the body. The velocity of a static body is always zero. Static bodies do not collide with other static or kinematic bodies.
 */
CANNON.Body.STATIC = 2;

/*
 * A kinematic body moves under simulation according to its velocity. They do not respond to forces. They can be moved manually, but normally a kinematic body is moved by setting its velocity. A kinematic body behaves as if it has infinite mass. Kinematic bodies do not collide with other static or kinematic bodies.
 */
CANNON.Body.KINEMATIC = 4;/*global CANNON:true */

/**
 * @class CANNON.Particle
 * @brief A body consisting of one point mass. Does not have orientation.
 * @param float mass
 * @param CANNON.Material material
 */
CANNON.Particle = function(mass,material){

  // Check input
  if(typeof(mass)!="number")
      throw new Error("Argument 1 (mass) must be a number.");
  if(typeof(material)!="undefined" && !(material instanceof(CANNON.Material)))
      throw new Error("Argument 3 (material) must be an instance of CANNON.Material.");

  CANNON.Body.call(this,"particle");

  var that = this;

  /**
   * @property CANNON.Vec3 position
   * @memberof CANNON.Particle
   */
  this.position = new CANNON.Vec3();

  /**
   * @property CANNON.Vec3 initPosition
   * @memberof CANNON.Particle
   * @brief Initial position of the body
   */
  this.initPosition = new CANNON.Vec3();

  /**
   * @property CANNON.Vec3 velocity
   * @memberof CANNON.Particle
   */
  this.velocity = new CANNON.Vec3();

  /**
   * @property CANNON.Vec3 initVelocity
   * @memberof CANNON.Particle
   */
  this.initVelocity = new CANNON.Vec3();

  /**
   * @property CANNON.Vec3 force
   * @memberof CANNON.Particle
   * @brief Linear force on the body
   */
  this.force = new CANNON.Vec3();

  /**
   * @property float mass
   * @memberof CANNON.Particle
   */
  this.mass = mass;

  /**
   * @property float invMass
   * @memberof CANNON.Particle
   */
  this.invMass = mass>0 ? 1.0/mass : 0;

  /**
   * @property CANNON.Material material
   * @memberof CANNON.Particle
   */
  this.material = material;

  /**
   * @property float linearDamping
   * @memberof CANNON.Particle
   */
  this.linearDamping = 0.01; // Perhaps default should be zero here?

  /**
   * @property int motionstate
   * @memberof CANNON.Particle
   * @brief One of the states CANNON.Body.DYNAMIC, CANNON.Body.STATIC and CANNON.Body.KINEMATIC
   */
  this.motionstate = (mass <= 0.0 ? CANNON.Body.STATIC : CANNON.Body.DYNAMIC);

  /**
   * @property bool allowSleep
   * @memberof CANNON.Particle
   * @brief If true, the body will automatically fall to sleep.
   */
  this.allowSleep = true;

  // 0:awake, 1:sleepy, 2:sleeping
  var sleepState = 0;

  /**
   * @method isAwake
   * @memberof CANNON.Particle
   * @return bool
   */
  this.isAwake = function(){ return sleepState == 0; }

  /**
   * @method isSleepy
   * @memberof CANNON.Particle
   * @return bool
   */
  this.isSleepy = function(){ return sleepState == 1; }

  /**
   * @method isSleeping
   * @memberof CANNON.Particle
   * @return bool
   */
  this.isSleeping = function(){ return sleepState == 2; }

  /**
   * @property float sleepSpeedLimit
   * @memberof CANNON.Particle
   * @brief If the speed (the norm of the velocity) is smaller than this value, the body is considered sleepy.
   */
  this.sleepSpeedLimit = 0.1;

  /**
   * @property float sleepTimeLimit
   * @memberof CANNON.Particle
   * @brief If the body has been sleepy for this sleepTimeLimit milliseconds, it is considered sleeping.
   */
  this.sleepTimeLimit = 1000;
  var timeLastSleepy = new Date().getTime();

  /**
   * @method wakeUp
   * @memberof CANNON.Particle
   * @brief Wake the body up.
   */
  this.wakeUp = function(){
      sleepState = 0;
      that.dispatchEvent({type:"wakeup"});
  };

  /**
   * @method sleep
   * @memberof CANNON.Particle
   * @brief Force body sleep
   */
  this.sleep = function(){
      sleepState = 2;
  };

  /**
   * @method sleepTick
   * @memberof CANNON.Particle
   * @brief Called every timestep to update internal sleep timer and change sleep state if needed.
   */
  this.sleepTick = function(){
      if(that.allowSleep){
	  if(sleepState==0 && that.velocity.norm()<that.sleepSpeedLimit){
	      sleepState = 1; // Sleepy
	      timeLastSleepy = new Date().getTime();
	      that.dispatchEvent({type:"sleepy"});
	  } else if(sleepState==1 && that.velocity.norm()>that.sleepSpeedLimit){
	      that.wakeUp(); // Wake up
	  } else if(sleepState==1 && (new Date().getTime() - timeLastSleepy)>that.sleepTimeLimit){
	      sleepState = 2; // Sleeping
	      that.dispatchEvent({type:"sleep"});
	  }
      }
  };
};
/*global CANNON:true */

/**
 * @class CANNON.RigidBody
 * @brief Rigid body base class
 * @param float mass
 * @param CANNON.Shape shape
 * @param CANNON.Material material
 */
CANNON.RigidBody = function(mass,shape,material){

  // Check input
  if(typeof(mass)!="number")
      throw new Error("Argument 1 (mass) must be a number.");
  if(typeof(shape)!="object" || !(shape instanceof(CANNON.Shape)))
      throw new Error("Argument 2 (shape) must be an instance of CANNON.Shape.");
  if(typeof(material)!="undefined" && !(material instanceof(CANNON.Material)))
      throw new Error("Argument 3 (material) must be an instance of CANNON.Material.");

  CANNON.Particle.call(this,mass,material);

  var that = this;

  /**
   * @property CANNON.Vec3 tau
   * @memberof CANNON.RigidBody
   * @brief Rotational force on the body, around center of mass
   */
  this.tau = new CANNON.Vec3();

  /**
   * @property CANNON.Quaternion quaternion
   * @memberof CANNON.RigidBody
   * @brief Orientation of the body
   */
  this.quaternion = new CANNON.Quaternion();

  /**
   * @property CANNON.Quaternion initQuaternion
   * @memberof CANNON.RigidBody
   */
  this.initQuaternion = new CANNON.Quaternion();

  /**
   * @property CANNON.Vec3 angularVelocity
   * @memberof CANNON.RigidBody
   */
  this.angularVelocity = new CANNON.Vec3();

  /**
   * @property CANNON.Vec3 initAngularVelocity
   * @memberof CANNON.RigidBody
   */
  this.initAngularVelocity = new CANNON.Vec3();

  /**
   * @property CANNON.Shape shape
   * @memberof CANNON.RigidBody
   */
  this.shape = shape;

  /**
   * @property CANNON.Vec3 inertia
   * @memberof CANNON.RigidBody
   */
  this.inertia = new CANNON.Vec3();
  shape.calculateLocalInertia(mass,this.inertia);

  /**
   * @property CANNON.Vec3 intInertia
   * @memberof CANNON.RigidBody
   */
  this.invInertia = new CANNON.Vec3(this.inertia.x>0 ? 1.0/this.inertia.x : 0,
				    this.inertia.y>0 ? 1.0/this.inertia.y : 0,
				    this.inertia.z>0 ? 1.0/this.inertia.z : 0);

  /**
   * @property float angularDamping
   * @memberof CANNON.RigidBody
   */
  this.angularDamping = 0.01; // Perhaps default should be zero here?
};
/*global CANNON:true */

/**
 * @brief Spherical rigid body
 * @class CANNON.Sphere
 * @extends CANNON.Shape
 * @param float radius
 * @author schteppe / http://github.com/schteppe
 */
CANNON.Sphere = function(radius){
    CANNON.Shape.call(this);

    /**
     * @property float radius
     * @memberof CANNON.Sphere
     */
    this.radius = radius!=undefined ? Number(radius) : 1.0;
    this.type = CANNON.Shape.types.SPHERE;
};
CANNON.Sphere.prototype = new CANNON.Shape();
CANNON.Sphere.prototype.constructor = CANNON.Sphere;

CANNON.Sphere.prototype.calculateLocalInertia = function(mass,target){
  target = target || new CANNON.Vec3();
  var I = 2.0*mass*this.radius*this.radius/5.0;
  target.x = I;
  target.y = I;
  target.z = I;
  return target;
};

CANNON.Sphere.prototype.volume = function(){
  return 4.0 * Math.PI * this.radius / 3.0;
};

CANNON.Sphere.prototype.boundingSphereRadius = function(){
  return this.radius;
};/*global CANNON:true */

/**
 * @class CANNON.Box
 * @brief A 3d box shape.
 * @param CANNON.Vec3 halfExtents
 * @author schteppe
 * @extends CANNON.Shape
 */
CANNON.Box = function(halfExtents){
  CANNON.Shape.call(this);

  /**
   * @property CANNON.Vec3 halfExtents
   * @memberof CANNON.Box
   */
  this.halfExtents = halfExtents;
  this.type = CANNON.Shape.types.BOX;

  /**
   * 
   */
  this.convexPolyhedronRepresentation = null;

  this.updateConvexPolyhedronRepresentation();
};
CANNON.Box.prototype = new CANNON.Shape();
CANNON.Box.prototype.constructor = CANNON.Box;

/**
 * @method updateConvexPolyhedronRepresentation
 * @memberof CANNON.Box
 * @brief Updates the local convex polyhedron representation used for some collisions.
 */
CANNON.Box.prototype.updateConvexPolyhedronRepresentation = function(){
  var sx = this.halfExtents.x;
  var sy = this.halfExtents.y;
  var sz = this.halfExtents.z;
  var v = CANNON.Vec3;
    var h = new CANNON.ConvexPolyhedron([new v(-sx,-sy,-sz),
					 new v( sx,-sy,-sz),
					 new v( sx, sy,-sz),
					 new v(-sx, sy,-sz),
					 new v(-sx,-sy, sz),
					 new v( sx,-sy, sz),
					 new v( sx, sy, sz),
					 new v(-sx, sy, sz)],
					
					[
					    [0,1,2,3], // -z
					    [4,5,6,7], // +z
					    [0,1,4,5], // -y
					    [2,3,6,7], // +y
					    [0,3,4,7], // -x
					    [1,2,5,6], // +x
					],
					
					[new v( 0, 0,-1),
					 new v( 0, 0, 1),
					 new v( 0,-1, 0),
					 new v( 0, 1, 0),
					 new v(-1, 0, 0),
					 new v( 1, 0, 0)]);
    this.convexPolyhedronRepresentation = h;
};

CANNON.Box.prototype.calculateLocalInertia = function(mass,target){
  target = target || new CANNON.Vec3();
  target.x = 1.0 / 12.0 * mass * (   2*this.halfExtents.y*2*this.halfExtents.y
				   + 2*this.halfExtents.z*2*this.halfExtents.z );
  target.y = 1.0 / 12.0 * mass * (   2*this.halfExtents.x*2*this.halfExtents.x
				   + 2*this.halfExtents.z*2*this.halfExtents.z );
  target.z = 1.0 / 12.0 * mass * (   2*this.halfExtents.y*2*this.halfExtents.y
				   + 2*this.halfExtents.x*2*this.halfExtents.x );
  return target;
};

/**
 * @method getCorners
 * @memberof CANNON.Box
 * @brief Get the box corners
 * @param CANNON.Quaternion quat Orientation to apply to the corner vectors. If not provided, the vectors will be in respect to the local frame.
 * @return array
 */
CANNON.Box.prototype.getCorners = function(quat){
  var corners = [];
  var ex = this.halfExtents;
  corners.push(new CANNON.Vec3(  ex.x,  ex.y,  ex.z));
  corners.push(new CANNON.Vec3( -ex.x,  ex.y,  ex.z));
  corners.push(new CANNON.Vec3( -ex.x, -ex.y,  ex.z));
  corners.push(new CANNON.Vec3( -ex.x, -ex.y, -ex.z));
  corners.push(new CANNON.Vec3(  ex.x, -ex.y, -ex.z));
  corners.push(new CANNON.Vec3(  ex.x,  ex.y, -ex.z));
  corners.push(new CANNON.Vec3( -ex.x,  ex.y, -ex.z));
  corners.push(new CANNON.Vec3(  ex.x, -ex.y,  ex.z));

  for(var i=0; quat!=undefined && i<corners.length; i++)
    quat.vmult(corners[i],corners[i]);

  return corners;
};

/**
 * @method getSideNormals
 * @memberof CANNON.Box
 * @brief Get the box 6 side normals
 * @param bool includeNegative If true, this function returns 6 vectors. If false, it only returns 3 (but you get 6 by reversing those 3)
 * @param CANNON.Quaternion quat Orientation to apply to the normal vectors. If not provided, the vectors will be in respect to the local frame.
 * @return array
 */
CANNON.Box.prototype.getSideNormals = function(includeNegative,quat){
  var sides = [];
  var ex = this.halfExtents;
  sides.push(new CANNON.Vec3(  ex.x,     0,     0));
  sides.push(new CANNON.Vec3(     0,  ex.y,     0));
  sides.push(new CANNON.Vec3(     0,     0,  ex.z));
  if(includeNegative!=undefined && includeNegative){
    sides.push(new CANNON.Vec3( -ex.x,     0,     0));
    sides.push(new CANNON.Vec3(     0, -ex.y,     0));
    sides.push(new CANNON.Vec3(     0,     0, -ex.z));
  }

  for(var i=0; quat!=undefined && i<sides.length; i++)
    quat.vmult(sides[i],sides[i]);

  return sides;
};

CANNON.Box.prototype.volume = function(){
  return 8.0 * this.halfExtents.x * this.halfExtents.y * this.halfExtents.z;
};

CANNON.Box.prototype.boundingSphereRadius = function(){
  return this.halfExtents.norm();
};/*global CANNON:true */

/**
 * @class CANNON.Plane
 * @extends CANNON.Shape
 * @param CANNON.Vec3 normal
 * @brief An infinite plane, facing in the direction of the given normal.
 * @author schteppe
 */
CANNON.Plane = function(normal){
    CANNON.Shape.call(this);
    normal.normalize();

    /**
     * @property CANNON.Vec3 normal
     * @memberof CANNON.Plane
     */
    this.normal = normal;
    this.type = CANNON.Shape.types.PLANE;
};
CANNON.Plane.prototype = new CANNON.Shape();
CANNON.Plane.prototype.constructor = CANNON.Plane;

CANNON.Plane.prototype.calculateLocalInertia = function(mass,target){
  target = target || new CANNON.Vec3();
  return target;
};

CANNON.Plane.prototype.volume = function(){
  return Infinity; // The plane is infinite...
};/*global CANNON:true */

/**
 * @class CANNON.Compound
 * @extends CANNON.Shape
 * @brief A shape made of several other shapes.
 * @author schteppe
 */
CANNON.Compound = function(){
  CANNON.Shape.call(this);
  this.type = CANNON.Shape.types.COMPOUND;
  this.childShapes = [];
  this.childOffsets = [];
  this.childOrientations = [];
};
CANNON.Compound.prototype = new CANNON.Shape();
CANNON.Compound.prototype.constructor = CANNON.Compound;

/**
 * @method addChild
 * @memberof CANNON.Compound
 * @brief Add a child shape.
 * @param CANNON.Shape shape
 * @param CANNON.Vec3 offset
 * @param CANNON.Quaternion orientation
 */
CANNON.Compound.prototype.addChild = function(shape,offset,orientation){
  offset = offset || new CANNON.Vec3();
  orientation = orientation || new CANNON.Quaternion();
  this.childShapes.push(shape);
  this.childOffsets.push(offset);
  this.childOrientations.push(orientation);
};

CANNON.Compound.prototype.volume = function(){
  var r = 0.0;
  for(var i = 0; i<this.childShapes.length; i++)
    r += this.childShapes[i].volume();
  return r;
};

CANNON.Compound.prototype.calculateLocalInertia = function(mass,target){
  target = target || new CANNON.Vec3();

  // Calculate the total volume, we will spread out this objects' mass on the sub shapes
  var V = this.volume();

  for(var i = 0; i<this.childShapes.length; i++){
    // Get child information
    var b = this.childShapes[i];
    var o = this.childOffsets[i];
    var q = this.childOrientations[i];
    var m = b.volume() / V * mass;

    // Get the child inertia, transformed relative to local frame
    var inertia = b.calculateTransformedInertia(m,q);

    // Add its inertia using the parallel axis theorem, i.e.
    // I += I_child;    
    // I += m_child * r^2

    target.vadd(inertia,target);
    var mr2 = new CANNON.Vec3(m*o.x*o.x,
			      m*o.y*o.y,
			      m*o.z*o.z);
    target.vadd(mr2,target);
  }
  return target;
};

CANNON.Compound.prototype.boundingSphereRadius = function(){
  var r = 0.0;
  for(var i = 0; i<this.childShapes.length; i++){
    var candidate = this.childOffsets[i].norm() + this.childShapes[i].boundingSphereRadius();
    if(r < candidate)
      r = candidate;
  }
  return r;
};/**
 * @class CANNON.ConvexPolyhedron
 * @extends CANNON.Shape
 * @brief A set of points in space describing a convex shape.
 * @author qiao / https://github.com/qiao (original author, see https://github.com/qiao/three.js/commit/85026f0c769e4000148a67d45a9e9b9c5108836f)
 * @author schteppe / https://github.com/schteppe
 * @see http://www.altdevblogaday.com/2011/05/13/contact-generation-between-3d-convex-meshes/
 * @see http://bullet.googlecode.com/svn/trunk/src/BulletCollision/NarrowPhaseCollision/btPolyhedralContactClipping.cpp
 * @todo move the clipping functions to ContactGenerator?
 * @param array points An array of CANNON.Vec3's
 * @param array faces Deprecated - fix autogenerator for these
 * @param array normals Deprecated - fix autogenerator for these
 */
CANNON.ConvexPolyhedron = function( points , faces , normals ) {
    var that = this;
    CANNON.Shape.call( this );
    this.type = CANNON.Shape.types.CONVEXPOLYHEDRON;

    /**
     * @property array vertices
     * @memberof CANNON.ConvexPolyhedron
     * @brief Array of CANNON.Vec3
     */
    this.vertices = [];

    /**
     * @property array faces
     * @memberof CANNON.ConvexPolyhedron
     * @brief Array of integer arrays, indicating which vertices each face consists of
     * @todo Needed?
     */
    this.faces = faces;

    /**
     * @property array faceNormals
     * @memberof CANNON.ConvexPolyhedron
     * @brief Array of CANNON.Vec3
     * @todo Needed?
     */
    this.faceNormals = normals;

    /**
     * @property array uniqueEdges
     * @memberof CANNON.ConvexPolyhedron
     * @brief Array of CANNON.Vec3
     */
    this.uniqueEdges = [];

    for(var pi=0; pi<points.length; pi++){
	var p = points[pi];
	if(!(p instanceof CANNON.Vec3)){
	    throw "Argument 1 must be instance of CANNON.Vec3";
	    return false;
	}
	this.vertices.push(p);
    }
    
    for(var i=0; i<faces.length; i++){
	var numVertices = faces[i].length;
	var NbTris = numVertices;
	for(var j=0; j<NbTris; j++){
	    var k = ( j+1 ) % numVertices;
	    var edge = new CANNON.Vec3();
	    this.vertices[faces[i][j]].vsub(this.vertices[faces[i][k]],edge);
	    edge.normalize();
	    var found = false;
	    for(var p=0;p<this.uniqueEdges.length;p++){
		if (this.uniqueEdges[p].almostEquals(edge) || 
		    this.uniqueEdges[p].almostEquals(edge)){
		    found = true;
		    break;
		}
	    }

	    // What is this for???
	    if (!found){
		this.uniqueEdges.push(edge);
	    }

	    if (edge) {
		edge.face1 = i;
	    } else {
		var ed;
		ed.m_face0 = i;
		edges.insert(vp,ed);
	    }
	}
    }

    /**
     * Get max and min dot product of a convex hull at position (pos,quat) projected onto an axis. Results are saved in the array maxmin.
     * @param CANNON.ConvexPolyhedron hull
     * @param CANNON.Vec3 axis
     * @param CANNON.Vec3 pos
     * @param CANNON.Quaternion quat
     * @param array maxmin maxmin[0] and maxmin[1] will be set to maximum and minimum, respectively.
     */
    var worldVertex = new CANNON.Vec3();
    function project(hull,axis,pos,quat,maxmin){
	var n = hull.vertices.length;
	var max = null;
	var min = null;
	var vs = hull.vertices;
	for(var i=0; i<n; i++){
	    vs[i].copy(worldVertex);
	    quat.vmult(worldVertex,worldVertex);
	    worldVertex.vadd(pos,worldVertex);
	    var val = worldVertex.dot(axis);
	    if(max===null || val>max)
		max = val;
	    if(min===null || val<min){
		min = val;
	    }
	}

	if(min>max){
	    // Inconsistent - swap
	    var temp = min;
	    min = max;
	    max = temp;
	}
	
	// Output
	maxmin[0] = max;
	maxmin[1] = min;
    }

    /**
     * @method testSepAxis
     * @memberof CANNON.ConvexPolyhedron
     * @brief Test separating axis against two hulls. Both hulls are projected onto the axis and the overlap size is returned if there is one.
     * @param CANNON.Vec3 axis
     * @param CANNON.ConvexPolyhedron hullB
     * @param CANNON.Vec3 posA
     * @param CANNON.Quaternion quatA
     * @param CANNON.Vec3 posB
     * @param CANNON.Quaternion quatB
     * @return float The overlap depth, or FALSE if no penetration.
     */
    this.testSepAxis = function(axis, hullB, posA, quatA, posB, quatB){
	var maxminA=[], maxminB=[], hullA=this;
	project(hullA, axis, posA, quatA, maxminA);
	project(hullB, axis, posB, quatB, maxminB);
	var maxA = maxminA[0];
	var minA = maxminA[1];
	var maxB = maxminB[0];
	var minB = maxminB[1];
	if(maxA<minB || maxB<minA){
	    //console.log(minA,maxA,minB,maxB);
	    return false; // Separated
	}
	
	var d0 = maxA - minB;
	var d1 = maxB - minA;
	depth = d0<d1 ? d0:d1;
	return depth;
    }

    /**
     * @method findSeparatingAxis
     * @memberof CANNON.ConvexPolyhedron
     * @brief Find the separating axis between this hull and another
     * @param CANNON.ConvexPolyhedron hullB
     * @param CANNON.Vec3 posA
     * @param CANNON.Quaternion quatA
     * @param CANNON.Vec3 posB
     * @param CANNON.Quaternion quatB
     * @param CANNON.Vec3 target The target vector to save the axis in
     * @return bool Returns false if a separation is found, else true
     */
    var faceANormalWS3 = new CANNON.Vec3();
    var Worldnormal1 = new CANNON.Vec3(); 
    var deltaC = new CANNON.Vec3();
    var worldEdge0 = new CANNON.Vec3();
    var worldEdge1 = new CANNON.Vec3();
    var Cross = new CANNON.Vec3();
    this.findSeparatingAxis = function(hullB,posA,quatA,posB,quatB,target){
	var dmin = Infinity;
	var hullA = this;
	var curPlaneTests=0;
	var numFacesA = hullA.faces.length;

	// Test normals from hullA
	for(var i=0; i<numFacesA; i++){
	    // Get world face normal
	    hullA.faceNormals[i].copy(faceANormalWS3);
	    quatA.vmult(faceANormalWS3,faceANormalWS3);
	    //posA.vadd(faceANormalWS3,faceANormalWS3); // Needed?
	    //console.log("face normal:",hullA.faceNormals[i].toString(),"world face normal:",faceANormalWS3);
	    
	    var d = hullA.testSepAxis(faceANormalWS3, hullB, posA, quatA, posB, quatB);
	    if(d===false){
		return false;
	    }
	    
	    if(d<dmin){
		dmin = d;
		faceANormalWS3.copy(target);
	    }
	}

	// Test normals from hullB
	var numFacesB = hullB.faces.length;
	for(var i=0;i<numFacesB;i++){
	    hullB.faceNormals[i].copy(Worldnormal1);
	    quatB.vmult(Worldnormal1,Worldnormal1);
	    //posB.vadd(Worldnormal1,Worldnormal1);
	    //console.log("facenormal",hullB.faceNormals[i].toString(),"world:",Worldnormal1.toString());
	    curPlaneTests++;
	    var d = hullA.testSepAxis(Worldnormal1, hullB,posA,quatA,posB,quatB);
	    if(d===false){
		return false;
	    }
	    
	    if(d<dmin){
		dmin = d;
		Worldnormal1.copy(target);
	    }
	}

	var edgeAstart,edgeAend,edgeBstart,edgeBend;
	
	var curEdgeEdge = 0;
	// Test edges
	for(var e0=0; e0<hullA.uniqueEdges.length; e0++){
	    // Get world edge
	    hullA.uniqueEdges[e0].copy(worldEdge0);
	    quatA.vmult(worldEdge0,worldEdge0);
	    //posA.vadd(worldEdge0,worldEdge0); // needed?

	    //console.log("edge0:",worldEdge0.toString());

	    for(var e1=0; e1<hullB.uniqueEdges.length; e1++){
		hullB.uniqueEdges[e1].copy(worldEdge1);
		quatB.vmult(worldEdge1,worldEdge1);
		//posB.vadd(worldEdge1,worldEdge1); // needed?
		//console.log("edge1:",worldEdge1.toString());
		
		worldEdge0.cross(worldEdge1,Cross);

		curEdgeEdge++;
		if(!Cross.almostZero()){
		    Cross.normalize();
		    var dist = hullA.testSepAxis( Cross, hullB, posA,quatA,posB,quatB);
		    if(dist===false){
			return false;
		    }
		    
		    if(dist<dmin){
			dmin = dist;
			Cross.copy(target);
		    }
		}
	    }
	}

	posB.vsub(posA,deltaC);
	if((deltaC.dot(target))>0.0)
	    target.negate(target);
	
	return true;
    }

    /**
     * @method clipAgainstHull
     * @memberof CANNON.ConvexPolyhedron
     * @brief Clip this hull against another hull
     * @param CANNON.Vec3 posA
     * @param CANNON.Quaternion quatA
     * @param CANNON.ConvexPolyhedron hullB
     * @param CANNON.Vec3 posB
     * @param CANNON.Quaternion quatB
     * @param CANNON.Vec3 separatingNormal
     * @param float minDist Clamp distance
     * @param float maxDist
     * @param array result The an array of contact point objects, see clipFaceAgainstHull
     * @see http://bullet.googlecode.com/svn/trunk/src/BulletCollision/NarrowPhaseCollision/btPolyhedralContactClipping.cpp
     */
    var WorldNormal = new CANNON.Vec3();
    this.clipAgainstHull = function(posA,quatA,hullB,posB,quatB,separatingNormal,minDist,maxDist,result){
	if(!(posA instanceof CANNON.Vec3))
	    throw new Error("posA must be Vec3");
	if(!(quatA instanceof CANNON.Quaternion))
	    throw new Error("quatA must be Quaternion");
	var hullA = this;
	var curMaxDist = maxDist;
	var closestFaceB = -1;
	var dmax = -Infinity;
	for(var face=0; face < hullB.faces.length; face++){
	    hullB.faceNormals[face].copy(WorldNormal);
	    quatB.vmult(WorldNormal,WorldNormal);
	    posB.vadd(WorldNormal,WorldNormal);

	    var d = WorldNormal.dot(separatingNormal);
	    if (d > dmax){
		dmax = d;
		closestFaceB = face;
	    }
	}
	var worldVertsB1 = [];
	polyB = hullB.faces[closestFaceB];
	var numVertices = polyB.length;
	for(var e0=0; e0<numVertices; e0++){
	    var b = hullB.vertices[polyB[e0]];
	    var worldb = new CANNON.Vec3();
	    b.copy(worldb);
	    quatB.vmult(worldb,worldb);
	    posB.vadd(worldb,worldb);
	    worldVertsB1.push(worldb);
	}
	//console.log("--- clipping face: ",worldVertsB1);
	if (closestFaceB>=0)
	    this.clipFaceAgainstHull(separatingNormal,
				     posA,
				     quatA,
				     worldVertsB1,
				     minDist,
				     maxDist,
				     result);
    };

    /**
     * @method clipFaceAgainstHull
     * @memberof CANNON.ConvexPolyhedron
     * @brief Clip a face against a hull.
     * @param CANNON.Vec3 separatingNormal
     * @param CANNON.Vec3 posA
     * @param CANNON.Quaternion quatA
     * @param Array worldVertsB1 An array of CANNON.Vec3 with vertices in the world frame.
     * @param float minDist Distance clamping
     * @param float maxDist
     * @param Array result Array to store resulting contact points in. Will be objects with properties: point, depth, normal. These are represented in world coordinates.
     */
    var faceANormalWS = new CANNON.Vec3();
    var edge0 = new CANNON.Vec3();
    var WorldEdge0 = new CANNON.Vec3();
    var worldPlaneAnormal1 = new CANNON.Vec3();
    var planeNormalWS1 = new CANNON.Vec3();
    var worldA1 = new CANNON.Vec3();
    var localPlaneNormal = new CANNON.Vec3();
    var planeNormalWS = new CANNON.Vec3();
    this.clipFaceAgainstHull = function(separatingNormal, posA, quatA, worldVertsB1, minDist, maxDist,result){
	if(!(separatingNormal instanceof CANNON.Vec3))
	    throw new Error("sep normal must be vector");
	if(!(worldVertsB1 instanceof Array))
	    throw new Error("world verts must be array");
	minDist = Number(minDist);
	maxDist = Number(maxDist);
	var hullA = this;
	var worldVertsB2 = [];
	var pVtxIn = worldVertsB1;
	var pVtxOut = worldVertsB2;

	// Find the face with normal closest to the separating axis
	var closestFaceA = -1;
	var dmin = Infinity;
	for(var face=0; face<hullA.faces.length; face++){
	    hullA.faceNormals[face].copy(faceANormalWS);
	    quatA.vmult(faceANormalWS,faceANormalWS);
	    posA.vadd(faceANormalWS,faceANormalWS);
	    var d = faceANormalWS.dot(separatingNormal);
	    if (d < dmin){
		dmin = d;
		closestFaceA = face;
	    }
	}
	if (closestFaceA<0){
	    console.log("--- did not find any closest face... ---");
	    return;
	}
	//console.log("closest A: ",closestFaceA);

	// Get the face and construct connected faces
	var polyA = hullA.faces[closestFaceA];
	polyA.connectedFaces = [];
	for(var i=0; i<hullA.faces.length; i++)
	    for(var j=0; j<hullA.faces[i].length; j++)
		if(polyA.indexOf(hullA.faces[i][j])!==-1 && // Sharing a vertex
		   i!==closestFaceA && // Not the one we are looking for connections from
		   polyA.connectedFaces.indexOf(i)===-1 // Not already added
		  )
		    polyA.connectedFaces.push(i);
	
	// Clip the polygon to the back of the planes of all faces of hull A, that are adjacent to the witness face
	var numContacts = pVtxIn.length;
	var numVerticesA = polyA.length;
	var res = [];
	for(var e0=0; e0<numVerticesA; e0++){
	    var a = hullA.vertices[polyA[e0]];
	    var b = hullA.vertices[polyA[(e0+1)%numVerticesA]];
	    a.vsub(b,edge0);
	    edge0.copy(WorldEdge0);
	    quatA.vmult(WorldEdge0,WorldEdge0);
	    posA.vadd(WorldEdge0,WorldEdge0);
	    this.faceNormals[closestFaceA].copy(worldPlaneAnormal1);//transA.getBasis()* btVector3(polyA.m_plane[0],polyA.m_plane[1],polyA.m_plane[2]);
	    quatA.vmult(worldPlaneAnormal1,worldPlaneAnormal1);
	    posA.vadd(worldPlaneAnormal1,worldPlaneAnormal1);
	    WorldEdge0.cross(worldPlaneAnormal1,planeNormalWS1);
	    planeNormalWS1.negate(planeNormalWS1);
	    a.copy(worldA1);
	    quatA.vmult(worldA1,worldA1);
	    posA.vadd(worldA1,worldA1);
	    var planeEqWS1 = -worldA1.dot(planeNormalWS1);
	    var planeEqWS;
	    if(true){
		var otherFace = polyA.connectedFaces[e0];
		this.faceNormals[otherFace].copy(localPlaneNormal);
		var localPlaneEq = planeConstant(otherFace);
		
		localPlaneNormal.copy(planeNormalWS);
		quatA.vmult(planeNormalWS,planeNormalWS);
		//posA.vadd(planeNormalWS,planeNormalWS);
		var planeEqWS = localPlaneEq - planeNormalWS.dot(posA);
	    } else  {
		planeNormalWS1.copy(planeNormalWS);
		planeEqWS = planeEqWS1;
	    }

	    // Clip face against our constructed plane
	    //console.log("clipping polygon ",printFace(closestFaceA)," against plane ",planeNormalWS, planeEqWS);
	    this.clipFaceAgainstPlane(pVtxIn, pVtxOut, planeNormalWS, planeEqWS);
	    //console.log(" - clip result: ",pVtxOut);

	    // Throw away all clipped points, but save the reamining until next clip
	    while(pVtxIn.length)  pVtxIn.shift();
	    while(pVtxOut.length) pVtxIn.push(pVtxOut.shift());
	}

	//console.log("Resulting points after clip:",pVtxIn);
        
	// only keep contact points that are behind the witness face
	this.faceNormals[closestFaceA].copy(localPlaneNormal);
	
	var localPlaneEq = planeConstant(closestFaceA);
	localPlaneNormal.copy(planeNormalWS);
	quatA.vmult(planeNormalWS,planeNormalWS);
	
	var planeEqWS = localPlaneEq - planeNormalWS.dot(posA);
	for (var i=0; i<pVtxIn.length; i++){
	    var depth = planeNormalWS.dot(pVtxIn[i]) + planeEqWS; //???
	    /*console.log("depth calc from normal=",planeNormalWS.toString()," and constant "+planeEqWS+" and vertex ",pVtxIn[i].toString()," gives "+depth);*/
	    if (depth <=minDist){
		console.log("clamped: depth="+depth+" to minDist="+(minDist+""));
		depth = minDist;
	    }
	    
	    if (depth <=maxDist){
		var point = pVtxIn[i];
		if(depth<=0){
		    /*console.log("Got contact point ",point.toString(),
		      ", depth=",depth,
		      "contact normal=",separatingNormal.toString(),
		      "plane",planeNormalWS.toString(),
		      "planeConstant",planeEqWS);*/
		    var p = {
			point:point,
			normal:planeNormalWS,
			depth: depth,
		    };
		    result.push(p);
		}
	    }
	}
    }
    
    /**
     * @method clipFaceAgainstPlane
     * @memberof CANNON.ConvexPolyhedron
     * @brief Clip a face in a hull against the back of a plane.
     * @param Array inVertices
     * @param Array outVertices
     * @param CANNON.Vec3 planeNormal
     * @param float planeConstant The constant in the mathematical plane equation
     */
    this.clipFaceAgainstPlane = function(inVertices,outVertices, planeNormal, planeConstant){
	if(!(planeNormal instanceof CANNON.Vec3))
	    throw new Error("planeNormal must be Vec3, "+planeNormal+" given");
	if(!(inVertices instanceof Array))
	    throw new Error("invertices must be Array, "+inVertices+" given");
	if(!(outVertices instanceof Array))
	    throw new Error("outvertices must be Array, "+outVertices+" given");
	var n_dot_first, n_dot_last;
	var numVerts = inVertices.length;

	if(numVerts < 2)
	    return outVertices;
	
	var firstVertex = inVertices[inVertices.length-1];
	var lastVertex =   inVertices[0];

	n_dot_first = planeNormal.dot(firstVertex) + planeConstant;
	
	for(var vi = 0; vi < numVerts; vi++){
	    lastVertex = inVertices[vi];
	    n_dot_last = planeNormal.dot(lastVertex) + planeConstant;
	    if(n_dot_first < 0){
		if(n_dot_last < 0){
		    // Start < 0, end < 0, so output lastVertex
		    var newv = new CANNON.Vec3();
		    lastVertex.copy(newv);
		    outVertices.push(newv);
		} else {
		    // Start < 0, end >= 0, so output intersection
		    var newv = new CANNON.Vec3();
		    firstVertex.lerp(lastVertex,
				     n_dot_first / (n_dot_first - n_dot_last),
				     newv);
		    outVertices.push(newv);
		}
	    } else {
		if(n_dot_last<0){
		    // Start >= 0, end < 0 so output intersection and end
		    var newv = new CANNON.Vec3();
		    firstVertex.lerp(lastVertex,
				     n_dot_first / (n_dot_first - n_dot_last),
				     newv);
		    outVertices.push(newv);
		    outVertices.push(lastVertex);
		}
	    }
	    firstVertex = lastVertex;
	    n_dot_first = n_dot_last;
	}
	return outVertices;
    }

    /**
     * Whether the face is visible from the vertex
     * @param array face
     * @param CANNON.Vec3 vertex
     */
    function visible( face, vertex ) {
	var va = that.vertices[ face[ 0 ] ];
	var vb = that.vertices[ face[ 1 ] ];
	var vc = that.vertices[ face[ 2 ] ];

	var n = new CANNON.Vec3();
	normal( va, vb, vc, n );

	// distance from face to origin
	var dist = n.dot( va );

	return n.dot( vertex ) >= dist;
    }

    var that = this;
    function normalOfFace(i,target){
	var f = that.faces[i];
	var va = that.vertices[f[0]];
	var vb = that.vertices[f[1]];
	var vc = that.vertices[f[2]];
	return normal(va,vb,vc,target);
    }

    function planeConstant(face_i,target){
	var f = that.faces[face_i];
	var n = that.faceNormals[face_i];
	var v = that.vertices[f[0]];
	var c = -n.dot(v);
	return c;
    }

    /**
     * @brief Get face normal given 3 vertices
     * @param CANNON.Vec3 va
     * @param CANNON.Vec3 vb
     * @param CANNON.Vec3 vc
     * @param CANNON.Vec3 target
     * @todo unit test?
     */
    var cb = new CANNON.Vec3();
    var ab = new CANNON.Vec3();
    function normal( va, vb, vc, target ) {
	vb.vsub(va,ab);
	vc.vsub(vb,cb);
	cb.cross(ab,target);

	if ( !target.isZero() ) {
	    target.normalize();
	}
    }

    function printFace(i){
	var f = that.faces[i], s = "";
	for(var j=0; j<f.length; j++)
	    s += " ("+that.vertices[f[j]]+")";
	return s;
    }

    /**
     * Detect whether two edges are equal.
     * Note that when constructing the convex hull, two same edges can only
     * be of the negative direction.
     * @return bool
     */
    function equalEdge( ea, eb ) {
	return ea[ 0 ] === eb[ 1 ] && ea[ 1 ] === eb[ 0 ]; 
    }

    /**
     * Create a random offset between -1e-6 and 1e-6.
     * @return float
     */
    function randomOffset() {
	return ( Math.random() - 0.5 ) * 2 * 1e-6;
    }

    this.calculateLocalInertia = function(mass,target){
	// Approximate with box inertia
	// Exact inertia calculation is overkill, but see http://geometrictools.com/Documentation/PolyhedralMassProperties.pdf for the correct way to do it
	var x = this.aabbmax.x - this.aabbmin.x,
	y = this.aabbmax.y - this.aabbmin.y,
	z = this.aabbmax.z - this.aabbmin.z;
	target.x = 1.0 / 12.0 * mass * ( 2*y*2*y + 2*z*2*z );
	target.y = 1.0 / 12.0 * mass * ( 2*x*2*x + 2*z*2*z );
	target.z = 1.0 / 12.0 * mass * ( 2*y*2*y + 2*x*2*x );
    }

    this.computeAABB = function(){
	var n = this.vertices.length,
	aabbmin = this.aabbmin,
	aabbmax = this.aabbmax,
	vertices = this.vertices;
	aabbmin.set(Infinity,Infinity,Infinity);
	aabbmax.set(-Infinity,-Infinity,-Infinity);
	for(var i=0; i<n; i++){
	    var v = vertices[i];
	    if     (v.x < aabbmin.x) aabbmin.x = v.x;
	    else if(v.x > aabbmax.x) aabbmax.x = v.x;
	    if     (v.y < aabbmin.y) aabbmin.y = v.y;
	    else if(v.y > aabbmax.y) aabbmax.y = v.y;
	    if     (v.z < aabbmin.z) aabbmin.z = v.z;
	    else if(v.z > aabbmax.z) aabbmax.z = v.z;
	}
    }

    this.boundingSphereRadius = function(){
	// Assume points are distributed with local (0,0,0) as center
	var max2 = 0;
	for(var i=0; i<this.vertices.length; i++) {
	    var norm2 = this.vertices[i].norm2();
	    if(norm2>max2)
		max2 = norm2;
	}
	return Math.sqrt(max2);
    }
    
    this.computeAABB();
};

CANNON.ConvexPolyhedron.prototype = new CANNON.Shape();
CANNON.ConvexPolyhedron.prototype.constructor = CANNON.ConvexPolyhedron;/*global CANNON:true */

/**
 * @class CANNON.Solver
 * @brief Constraint solver.
 * @todo The spook parameters should be specified for each constraint, not globally.
 * @author schteppe / https://github.com/schteppe
 * @see https://www8.cs.umu.se/kurser/5DV058/VT09/lectures/spooknotes.pdf
 */
CANNON.Solver = function(){

  /**
   * @property int iterations
   * @brief The number of solver iterations determines quality of the constraints in the world. The more iterations, the more correct simulation. More iterations need more computations though. If you have a large gravity force in your world, you will need more iterations.
   * @todo write more about solver and iterations in the wiki
   * @memberof CANNON.Solver
   */
  this.iterations = 10;

  /**
   * @property float h
   * @brief Time step size. The larger timestep, the less computationally heavy will your simulation be. But watch out, you don't want your bodies to tunnel each instead of colliding!
   * @memberof CANNON.Solver
   */
  this.h = 1.0/60.0;

  /**
   * @property float k
   * @brief SPOOK parameter, spring stiffness
   * @memberof CANNON.Solver
   */
  this.k = 1000;

  /**
   * @property float d
   * @brief SPOOK parameter, similar to damping
   * @memberof CANNON.Solver
   */
  this.d = 4;

  /**
   * @property float a
   * @brief SPOOK parameter
   * @memberof CANNON.Solver
   */
  this.a = 0.0;

  /**
   * @property float b
   * @brief SPOOK parameter
   * @memberof CANNON.Solver
   */
  this.b = 0.0;

  /**
   * @property float eps
   * @brief SPOOK parameter
   * @memberof CANNON.Solver
   */
  this.eps = 0.0;

  this.setSpookParams(this.k,this.d);
  this.reset(0);

  /**
   * @property bool debug
   * @brief Debug flag, will output solver data to console if true
   * @memberof CANNON.Solver
   */
  this.debug = false;

  if(this.debug)
    console.log("a:",this.a,"b",this.b,"eps",this.eps,"k",this.k,"d",this.d);
};

/**
 * @method setSpookParams
 * @memberof CANNON.Solver
 * @brief Sets the SPOOK parameters k and d, and updates the other parameters a, b and eps accordingly.
 * @param float k
 * @param float d
 */
CANNON.Solver.prototype.setSpookParams = function(k,d){
    var h=this.h;
    
    this.k = k;
    this.d = d;
    this.a = 4.0 / (h * (1 + 4 * d));
    this.b = (4.0 * d) / (1 + 4 * d);
    this.eps = 4.0 / (h * h * k * (1 + 4 * d));
};

/**
 * @method reset
 * @memberof CANNON.Solver
 * @brief Resets the solver, removes all constraints and prepares for a new round of solving
 * @param int numbodies The number of bodies in the new system
 * @todo vlambda does not need to be instantiated again if the number of bodies is the same. Set to zero instead.
 */
CANNON.Solver.prototype.reset = function(numbodies){

  // Don't know number of constraints yet... Use dynamic arrays
  this.G = [];
  this.MinvTrace = [];
  this.Fext = [];
  this.q = [];
  this.qdot = [];
  this.n = 0;
  this.upper = [];
  this.lower = [];
  this.hasupper = [];
  this.haslower = [];
  this.i = []; // To keep track of body id's
  this.j = [];

  this.vxlambda = [];
  this.vylambda = [];
  this.vzlambda = [];
  this.wxlambda = [];
  this.wylambda = [];
  this.wzlambda = [];
  for(var i=0; i<numbodies; i++){
    this.vxlambda.push(0);
    this.vylambda.push(0);
    this.vzlambda.push(0);
    this.wxlambda.push(0);
    this.wylambda.push(0);
    this.wzlambda.push(0);
  }
};

/**
 * @method addConstraint
 * @memberof CANNON.Solver
 * @brief Add a constraint to the solver
 * @param array G Jacobian vector, 12 elements (6 dof per body)
 * @param array MinvTrace The trace of the Inverse mass matrix (12 elements). The mass matrix is 12x12 elements from the beginning and 6x6 matrix per body (mass matrix and inertia matrix).
 * @param array q The constraint violation vector in generalized coordinates (12 elements)
 * @param array qdot The time-derivative of the constraint violation vector q.
 * @param array Fext External forces (12 elements)
 * @param float lower Lower constraint force bound
 * @param float upper Upper constraint force bound
 * @param int body_i The first body index
 * @param int body_j The second body index - set to -1 if none
 * @see https://www8.cs.umu.se/kurser/5DV058/VT09/lectures/spooknotes.pdf
 */
CANNON.Solver.prototype.addConstraint = function(G,MinvTrace,q,qdot,Fext,lower,upper,body_i,body_j){
  if(this.debug){
    console.log("Adding constraint ",this.n," between body ",body_i," and ",body_j);
    console.log("G:",G);
    console.log("q:",q);
    console.log("qdot:",qdot);
    console.log("Fext:",Fext);
    console.log("lower:",lower);
    console.log("upper:",upper);
  }
  
  for(var i=0; i<12; i++){
    this.q.push(q[i]);
    this.qdot.push(qdot[i]);
    this.MinvTrace.push(MinvTrace[i]);
    this.G.push(G[i]);
    this.Fext.push(Fext[i]);
  }

  this.upper.push(upper);
  this.hasupper.push(!isNaN(upper));
  this.lower.push(lower);
  this.haslower.push(!isNaN(lower));
  
  this.i.push(body_i);
  this.j.push(body_j);

  this.n += 1;

  // Return result index
  return this.n - 1; 
};

/**
 * New version of the addConstraint function, still experimental
 */
CANNON.Solver.prototype.addConstraint2 = function(c,i,j){
  c.update();
  for(var k=0; k<c.equations.length; k++){
    var e = c.equations[k];
    this.addConstraint([e.G1.x,e.G1.y,e.G1.z,
			e.G2.x,e.G2.y,e.G2.z,
			e.G3.x,e.G3.y,e.G3.z,
			e.G4.x,e.G4.y,e.G4.z],
		       
		       [e.iM1.x,e.iM1.y,e.iM1.z,
			e.iM2.x,e.iM2.y,e.iM2.z,
			e.iM3.x,e.iM3.y,e.iM3.z,
			e.iM4.x,e.iM4.y,e.iM4.z],

		       [e.g1.x,e.g1.y,e.g1.z,
			e.g2.x,e.g2.y,e.g2.z,
			e.g3.x,e.g3.y,e.g3.z,
			e.g4.x,e.g4.y,e.g4.z],

		       [e.W1.x,e.W1.y,e.W1.z,
			e.W2.x,e.W2.y,e.W2.z,
			e.W3.x,e.W3.y,e.W3.z,
			e.W4.x,e.W4.y,e.W4.z],

		       [e.f1.x,e.f1.y,e.f1.z,
			e.f2.x,e.f2.y,e.f2.z,
			e.f3.x,e.f3.y,e.f3.z,
			e.f4.x,e.f4.y,e.f4.z],
		       
		       e.lambdamin,
		       e.lambdamax,
		       
		       i,
		       j);
  }
};


/**
 * @method addNonPenetrationConstraint
 * @memberof CANNON.Solver
 * @brief Add a non-penetration constraint to the solver
 * @param CANNON.Vec3 ni
 * @param CANNON.Vec3 ri
 * @param CANNON.Vec3 rj
 * @param CANNON.Vec3 iMi
 * @param CANNON.Vec3 iMj
 * @param CANNON.Vec3 iIi
 * @param CANNON.Vec3 iIj
 * @param CANNON.Vec3 v1
 * @param CANNON.Vec3 v2
 * @param CANNON.Vec3 w1
 * @param CANNON.Vec3 w2
 */
CANNON.Solver.prototype.addNonPenetrationConstraint
  = function(i,j,xi,xj,ni,ri,rj,iMi,iMj,iIi,iIj,vi,vj,wi,wj,fi,fj,taui,tauj){
  
  var rxn = ri.cross(ni);
  var u = vj.vsub(vi); // vj.vadd(rj.cross(wj)).vsub(vi.vadd(ri.cross(wi)));

  // g = ( xj + rj - xi - ri ) .dot ( ni )
  var qvec = xj.vadd(rj).vsub(xi.vadd(ri));
  var q = qvec.dot(ni);

  if(q<0.0){
    if(this.debug){
      console.log("i:",i,"j",j,"xi",xi.toString(),"xj",xj.toString());
      console.log("ni",ni.toString(),"ri",ri.toString(),"rj",rj.toString());
      console.log("iMi",iMi.toString(),"iMj",iMj.toString(),"iIi",iIi.toString(),"iIj",iIj.toString(),"vi",vi.toString(),"vj",vj.toString(),"wi",wi.toString(),"wj",wj.toString(),"fi",fi.toString(),"fj",fj.toString(),"taui",taui.toString(),"tauj",tauj.toString());
    }
    this.addConstraint( // Non-penetration constraint jacobian
			[ -ni.x,  -ni.y,  -ni.z,
			  -rxn.x, -rxn.y, -rxn.z,
			  ni.x,   ni.y,   ni.z,
			  rxn.x,  rxn.y,  rxn.z],
			
			// Inverse mass matrix & inertia
			[iMi.x, iMi.y, iMi.z,
			 iIi.z, iIi.y, iIi.z,
			 iMj.x, iMj.y, iMj.z,
			 iIj.z, iIj.y, iIj.z],
			
			// q - constraint violation
			[-qvec.x,-qvec.y,-qvec.z,
			 0,0,0,
			 qvec.x,qvec.y,qvec.z,
			 0,0,0],
			
			// qdot - motion along penetration normal
			[-u.x, -u.y, -u.z,
			 0,0,0,
			 u.x, u.y, u.z,
			 0,0,0],
			
			// External force - forces & torques
			[fi.x,fi.y,fi.z,
			 taui.x,taui.y,taui.z,
			 fj.x,fj.y,fj.z,
			 tauj.x,tauj.y,tauj.z],
			
			0,
			'inf',
			i,
			j);
  }
};

/**
 * @method solve
 * @memberof CANNON.Solver
 * @brief Solves the system, and sets the vlambda and wlambda properties of the Solver object
 */
CANNON.Solver.prototype.solve = function(){
  var n = this.n,
  lambda = [],
  dlambda = [],
  ulambda = [],
  B = [],
  c = [],
  precomp = [],
  iterations = this.iterations,
  G = this.G,
  debug = this.debug,
  a = this.a,
  eps = this.eps;

  var lower = this.lower,
  haslower = this.haslower,
  upper = this.upper,
  hasupper = this.hasupper;

  var vxlambda = this.vxlambda,
  vylambda = this.vylambda,
  vzlambda = this.vzlambda,
  wxlambda = this.wxlambda,
  wylambda = this.wylambda,
  wzlambda = this.wzlambda;
  var MinvTrace = this.MinvTrace;

  for(var i=0; i<n; i++){
    lambda.push(0);
    dlambda.push(0);
    B.push(0);
    c.push(0);
    precomp.push(0);
    for(var j=0; j<12; j++)
      dlambda.push(0);
  }

  for(var k = 0; k<iterations; k++){
    for(var l=0; l<n; l++){

      // Bodies participating in constraint
      var body_i = this.i[l];
      var body_j = this.j[l];

      var l12 = 12*l;
      
      if(!precomp[l]){
	// Precompute constants c[l] and B[l] for contact l
	var G_Minv_Gt = 0.0;
	var Gq = 0.0;
	var GW = 0.0;
	var GMinvf = 0.0;
	// Only add normal contributions here? See eq. 27 in spooknotes
	for(var i=0; i<12; i++){
	  var addi = l12+i;
	  G_Minv_Gt += G[addi] * MinvTrace[addi] * G[addi];
	  Gq +=        G[addi] * this.q[addi];
	  GW +=        G[addi] * this.qdot[addi];
	  GMinvf +=    G[addi] * MinvTrace[addi] * this.Fext[addi];
	}
	c[l] = 1.0 / (G_Minv_Gt + eps); // 1.0 / ( G*Minv*Gt + eps)
	B[l] = ( - a * Gq
		 - this.b * GW
		 - this.h * GMinvf);
	precomp[l] = 1;

	if(debug){
	  console.log("G_Minv_Gt["+l+"]:",G_Minv_Gt);
	  console.log("Gq["+l+"]:",Gq);
	  console.log("GW["+l+"]:",GW);
	  console.log("GMinvf["+l+"]:",GMinvf);
	}
      }

      var Gulambda = 0.0;

      //console.log("debuuug2.1",vxlambda[0],Gulambda,body_i);
      if(body_i>=0){
	Gulambda += G[0+l12] * vxlambda[body_i]; // previuously calculated lambdas
	Gulambda += G[1+l12] * vylambda[body_i];
	Gulambda += G[2+l12] * vzlambda[body_i];
	Gulambda += G[3+l12] * wxlambda[body_i];
	Gulambda += G[4+l12] * wylambda[body_i];
	Gulambda += G[5+l12] * wzlambda[body_i];
	if(debug && isNaN(Gulambda))
	  console.log("found NaN Gulambda",vxlambda);
      }

      if(body_j!==-1){
	Gulambda += G[6+l12] * vxlambda[body_j];
	Gulambda += G[7+l12] * vylambda[body_j];
	Gulambda += G[8+l12] * vzlambda[body_j];
	Gulambda += G[9+l12] * wxlambda[body_j];
	Gulambda += G[10+l12] * wylambda[body_j];
	Gulambda += G[11+l12] * wzlambda[body_j];
      }

      dlambda[l] = c[l] * ( B[l] - Gulambda - eps * lambda[l]);
      if(debug)
	console.log("dlambda["+l+"]=",dlambda[l],"rest = ",c[l],B[l],Gulambda,eps,lambda[l],l,body_i,body_j);
      lambda[l] = lambda[l] + dlambda[l];

      // Clamp lambda if out of bounds
      // @todo check if limits are numbers
      if(haslower[l] && lambda[l]<lower[l]){
	if(debug)
	  console.log("hit lower bound for constraint "+l+", truncating "+lambda[l]+" to the bound "+lower[l]);
	lambda[l] = lower[l];
	dlambda[l] = lower[l]-lambda[l];
      }
      if(hasupper && lambda[l]>upper[l]){
	if(debug)
	  console.log("hit upper bound for constraint "+l+", truncating "+lambda[l]+" to the bound "+upper[l]);
	lambda[l] = upper[l];
	dlambda[l] = upper[l]-lambda[l];
      }

      // Add velocity changes to keep track of them
      if(body_i!==-1){
	vxlambda[body_i] += dlambda[l] * MinvTrace[l12+0] * G[l12+0];
	vylambda[body_i] += dlambda[l] * MinvTrace[l12+1] * G[l12+1];
	vzlambda[body_i] += dlambda[l] * MinvTrace[l12+2] * G[l12+2];
	wxlambda[body_i] += dlambda[l] * MinvTrace[l12+3] * G[l12+3];
	wylambda[body_i] += dlambda[l] * MinvTrace[l12+4] * G[l12+4];
	wzlambda[body_i] += dlambda[l] * MinvTrace[l12+5] * G[l12+5];
      }
      if(body_j!==-1){
	vxlambda[body_j] += dlambda[l] * MinvTrace[l12+6] * G[l12+6];
	vylambda[body_j] += dlambda[l] * MinvTrace[l12+7] * G[l12+7];
	vzlambda[body_j] += dlambda[l] * MinvTrace[l12+8] * G[l12+8];
	wxlambda[body_j] += dlambda[l] * MinvTrace[l12+9] * G[l12+9];
	wylambda[body_j] += dlambda[l] * MinvTrace[l12+10] * G[l12+10];
	wzlambda[body_j] += dlambda[l] * MinvTrace[l12+11] * G[l12+11];
      }
    }
  }

  if(debug)
    for(var i=0; i<this.vxlambda.length; i++)
      console.log("dv["+i+"]=",
		  vxlambda[i],
		  vylambda[i],
		  vzlambda[i],
		  wxlambda[i],
		  wylambda[i],
		  wzlambda[i]);
};
/*global CANNON:true */

/**
 * @class CANNON.EventTarget
 * @see https://github.com/mrdoob/eventtarget.js/
 */
CANNON.EventTarget = function () {

	var listeners = {};

	this.addEventListener = function ( type, listener ) {

		if ( listeners[ type ] == undefined ) {

			listeners[ type ] = [];

		}

		if ( listeners[ type ].indexOf( listener ) === - 1 ) {

			listeners[ type ].push( listener );

		}

	};

	this.dispatchEvent = function ( event ) {

		for ( var listener in listeners[ event.type ] ) {

			listeners[ event.type ][ listener ]( event );

		}

	};

	this.removeEventListener = function ( type, listener ) {

		var index = listeners[ type ].indexOf( listener );

		if ( index !== - 1 ) {

			listeners[ type ].splice( index, 1 );

		}

	};

};/*global CANNON:true */

/**
 * @class CANNON.ObjectPool
 * @brief For pooling objects that can be reused.
 */
CANNON.ObjectPool = function(){
    this.objects = [];
    this.type = Object;
};

CANNON.ObjectPool.prototype.release = function(){
    for(var i in arguments)
	this.objects.push(arguments[i]);
};

CANNON.ObjectPool.prototype.get = function(){
    if(this.objects.length===0)
	return this.constructObject();
    else
	return this.objects.pop();
};

CANNON.ObjectPool.prototype.constructObject = function(){
    throw new Error("constructObject() not implemented in this ObjectPool subclass yet!");
};/*global CANNON:true */

/**
 * @class CANNON.Vec3Pool
 */
CANNON.Vec3Pool = function(){
    CANNON.ObjectPool.call(this);
    this.type = CANNON.Vec3;
};
CANNON.Vec3Pool.prototype = new CANNON.ObjectPool();

CANNON.Vec3Pool.prototype.constructObject = function(){
    return new CANNON.Vec3();
};/*global CANNON:true */

/**
 * @class CANNON.Material
 * @brief Defines a physics material.
 * @param string name
 * @author schteppe
 */
CANNON.Material = function(name){
  /**
   * @property string name
   * @memberof CANNON.Material
   */
  this.name = name;
  this.id = -1;
};

/*global CANNON:true */

/**
 * @class CANNON.ContactMaterial
 * @brief Defines what happens when two materials meet.
 * @param CANNON.Material m1
 * @param CANNON.Material m2
 * @param float friction
 * @param float restitution
 * @todo Contact solving parameters here too?
 */
CANNON.ContactMaterial = function(m1, m2, friction, restitution){

  /// Contact material index in the world, -1 until added to the world
  this.id = -1;

  /// The two materials participating in the contact
  this.materials = [m1,m2];

  /// Kinetic friction
  this.friction = friction!=undefined ? Number(friction) : 0.3;

  /// Restitution
  this.restitution =      restitution!=undefined ?      Number(restitution) :      0.3;
  
};

/*global CANNON:true */

/**
 * @class CANNON.World
 * @brief The physics world
 */
CANNON.World = function(){

  CANNON.EventTarget.apply(this);

  /// Makes bodies go to sleep when they've been inactive
  this.allowSleep = false;

  /// The wall-clock time since simulation start
  this.time = 0.0;

  /// Number of timesteps taken since start
  this.stepnumber = 0;

  /// Default and last timestep sizes
  this.default_dt = 1/60;
  this.last_dt = this.default_dt;

  this.nextId = 0;
  this.gravity = new CANNON.Vec3();
  this.broadphase = null;
  this.bodies = [];

  var th = this;

  /// The constraint solver
  this.solver = new CANNON.Solver();

  // User defined constraints
  this.constraints = [];

  // Contact generator
  this.contactgen = new CANNON.ContactGenerator();

  // Materials
  this.materials = []; // References to all added materials
  this.contactmaterials = []; // All added contact materials
  this.mats2cmat = []; // Hash: (mat1_id, mat2_id) => contactmat_id

  this.temp = {
    gvec:new CANNON.Vec3(),
    vi:new CANNON.Vec3(),
    vj:new CANNON.Vec3(),
    wi:new CANNON.Vec3(),
    wj:new CANNON.Vec3(),
    t1:new CANNON.Vec3(),
    t2:new CANNON.Vec3(),
    rixn:new CANNON.Vec3(),
    rjxn:new CANNON.Vec3(),
    step_q:new CANNON.Quaternion(),
    step_w:new CANNON.Quaternion(),
    step_wq:new CANNON.Quaternion()
  };
};

/**
 * @method getContactMaterial
 * @memberof CANNON.World
 * @brief Get the contact material between materials m1 and m2
 * @param CANNON.Material m1
 * @param CANNON.Material m2
 * @return CANNON.Contactmaterial The contact material if it was found.
 */
CANNON.World.prototype.getContactMaterial = function(m1,m2){
  if((m1 instanceof CANNON.Material) && 
     (m2 instanceof CANNON.Material)){

    var i = m1.id;
    var j = m2.id;

    if(i<j){
      var temp = i;
      i = j;
      j = temp;
    }
    return this.contactmaterials[this.mats2cmat[i+j*this.materials.length]];
  }
};

/**
 * @private
 * @method _addImpulse
 * @memberof CANNON.World
 * @brief Add an impulse to the colliding bodies i and j
 * @param int i Body number 1
 * @param int i Body number 2
 * @param CANNON.Vec3 ri Vector from body 1's center of mass to the contact point on its surface
 * @param CANNON.Vec3 ri Vector from body 1's center of mass to the contact point on its surface
 * @param CANNON.Vec3 ui The relative velocity eg. vj+wj*rj - (vi+wj*rj)
 * @param CANNON.Vec3 ni The contact normal pointing out from body i.
 * @param float e The coefficient of restitution
 * @param float mu The contact friction
 * @todo Use it in the code!
 */
CANNON.World.prototype._addImpulse = function(i,j,ri,rj,ui,ni,e,mu){

  var ri_star = ri.crossmat();
  var rj_star = rj.crossmat();
  
  // Inverse inertia matrices
  var ii = this.inertiax[i]>0 ? 1.0/this.inertiax[i] : 0.0;
  var Iinv_i = new CANNON.Mat3([ii,0,0,
				0,ii,0,
				0,0,ii]);
  ii = this.inertiax[j]>0 ? 1.0/this.inertiax[j] : 0.0;
  var Iinv_j = new CANNON.Mat3([ii,0,0,
				0,ii,0,
				0,0,ii]);

  // Collision matrix:
  // K = 1/mi + 1/mj - ri_star*I_inv_i*ri_star - rj_star*I_inv_j*rj_star;
  var im = this.invm[i] + this.invm[j];
  var K = new CANNON.Mat3([im,0,0,
			   0,im,0,
			   0,0,im]);
  var rIr_i = ri_star.mmult(Iinv_i.mmult(ri_star));
  var rIr_j = rj_star.mmult(Iinv_j.mmult(rj_star));

  /*
  // @todo add back when this works
  for(var el = 0; el<9; el++)
    K.elements[el] -= (rIr_i.elements[el] + rIr_j.elements[el]);
  */
	
  // First assume stick friction
  // Final velocity if stick:
  var v_f = ni.mult(-e * ui.dot(ni));

  var J =  K.solve(v_f.vsub(ui));

  // Check if slide mode (J_t > J_n) - outside friction cone
  var mu = 0.0; // quick fix
  if(mu>0){
    var J_n = ni.mult(J.dot(ni));
    var J_t = J.vsub(J_n);
    if(J_t.norm() > J_n.mult(mu).norm()){

      // Calculate impulse j = -(1+e)u_n / nK(n-mu*t)
      var v_tang = ui.vsub(ni.mult(ui.dot(ni)));
      var tangent = v_tang.mult(1.0/(v_tang.norm() + 0.0001));
      var impulse = -(1+e)*(ui.dot(ni))/(ni.dot(K.vmult((ni.vsub(tangent.mult(mu))))));
      J = ni.mult(impulse).vsub(tangent.mult(mu * impulse));
    }
  }

  // Add to velocities
  var imi = this.invm[i];
  var imj = this.invm[j];

  // du = uprim - u
  //   => uprim = du + u
  // vi = vi + J/mi
  // vj = vj - J/mj

  // Convert back to non-relative velocities:
  // u_rel = vj - vi
  // vi = vj - u_rel
  // vj = vi + u_rel

  this.vx[i] +=  J.x * imi - (this.vx[j] - ui.x);
  this.vy[i] +=  J.y * imi - (this.vy[j] - ui.y);
  this.vz[i] +=  J.z * imi - (this.vz[j] - ui.z);
  this.vx[j] -=  J.x * imj + (this.vx[i] + ui.x);
  this.vy[j] -=  J.y * imj + (this.vy[i] + ui.y);
  this.vz[j] -=  J.z * imj + (this.vz[i] + ui.z);

  var cr = ri.cross(J);
  var wadd = cr.mult(1.0/this.inertiax[i]);

  /*
  // Add rotational impulses
  this.wx[i] += wadd.x;
  this.wy[i] += wadd.y;
  this.wz[i] += wadd.z;
  cr = rj.cross(J);
  wadd = cr.mult(1.0/this.inertiax[j]); // @todo fix to suit asymmetric inertia
  this.wx[j] -= wadd.x;
  this.wy[j] -= wadd.y;
  this.wz[j] -= wadd.z;
  */
};

/**
 * @method numObjects
 * @memberof CANNON.World
 * @brief Get number of objects in the world.
 * @return int
 */
CANNON.World.prototype.numObjects = function(){
  return this.bodies.length;
};

/**
 * @method clearCollisionState
 * @memberof CANNON.World
 * @brief Clear the contact state for a body.
 * @param CANNON.Body body
 */
CANNON.World.prototype.clearCollisionState = function(body){
  var n = this.numObjects();
  var i = body.id;
  for(var idx=0; idx<n; idx++){
    var j = idx;
    if(i>j) this.collision_matrix[j+i*n] = 0;
    else    this.collision_matrix[i+j*n] = 0;
  }
};

/**
 * @method add
 * @memberof CANNON.World
 * @brief Add a rigid body to the simulation.
 * @param CANNON.Body body
 * @todo If the simulation has not yet started, why recrete and copy arrays for each body? Accumulate in dynamic arrays in this case.
 * @todo Adding an array of bodies should be possible. This would save some loops too
 */
CANNON.World.prototype.add = function(body){
    var n = this.numObjects();
    this.bodies.push(body);
    body.id = this.id();
    body.world = this;
    body.position.copy(body.initPosition);
    body.velocity.copy(body.initVelocity);
    if(body instanceof CANNON.RigidBody){
	body.angularVelocity.copy(body.initAngularVelocity);
	body.quaternion.copy(body.initQuaternion);
    }
    
    // Create collision matrix
    this.collision_matrix = new Int16Array((n+1)*(n+1));
};

/**
 * @method addConstraint
 * @memberof CANNON.World
 * @brief Add a constraint to the simulation.
 * @param CANNON.Constraint c
 */
CANNON.World.prototype.addConstraint = function(c){
  if(c instanceof CANNON.Constraint){
    this.constraints.push(c);
    c.id = this.id();
  }
};

/**
 * @method id
 * @memberof CANNON.World
 * @brief Generate a new unique integer identifyer
 * @return int
 */
CANNON.World.prototype.id = function(){
  return this.nextId++;
};

/**
 * @method remove
 * @memberof CANNON.World
 * @brief Remove a rigid body from the simulation.
 * @param CANNON.Body body
 */
CANNON.World.prototype.remove = function(body){
    body.world = null;
    var n = this.numObjects();
    var bodies = this.bodies;
    for(var i in bodies)
      if(bodies[i].id == body.id)
	bodies.splice(i,1);

    // Reset collision matrix
    this.collision_matrix = new Int16Array((n-1)*(n-1));
};

/**
 * @method addMaterial
 * @memberof CANNON.World
 * @brief Adds a material to the World. A material can only be added once, it's added more times then nothing will happen.
 * @param CANNON.Material m
 */
CANNON.World.prototype.addMaterial = function(m){
  if(m.id==-1){
    this.materials.push(m);
    m.id = this.materials.length-1;

    // Enlarge matrix
    var newcm = new Int16Array((this.materials.length)
			       * (this.materials.length));
    for(var i=0; i<newcm.length; i++)
      newcm[i] = -1;

    // Copy over old values
    for(var i=0; i<this.materials.length-1; i++)
      for(var j=0; j<this.materials.length-1; j++)
	newcm[i+this.materials.length*j] = this.mats2cmat[i+(this.materials.length-1)*j];
    this.mats2cmat = newcm;
  
  }
};

/**
 * @method addContactMaterial
 * @memberof CANNON.World
 * @brief Adds a contact material to the World
 * @param CANNON.ContactMaterial cmat
 */
CANNON.World.prototype.addContactMaterial = function(cmat) {

  // Add materials if they aren't already added
  this.addMaterial(cmat.materials[0]);
  this.addMaterial(cmat.materials[1]);

  // Save (material1,material2) -> (contact material) reference for easy access later
  // Make sure i>j, ie upper right matrix
  if(cmat.materials[0].id > cmat.materials[1].id){
    i = cmat.materials[0].id;
    j = cmat.materials[1].id;
  } else {
    j = cmat.materials[0].id;
    i = cmat.materials[1].id;
  }
    
  // Add contact material
  this.contactmaterials.push(cmat);
  cmat.id = this.contactmaterials.length-1;

  // Add current contact material to the material table
  this.mats2cmat[i+this.materials.length*j] = cmat.id; // index of the contact material
};

// Get the index given body id. Returns -1 on fail
CANNON.World.prototype._id2index = function(id){
  // ugly but works
  for(var j=0; j<this.bodies.length; j++)
    if(this.bodies[j].id === id)
      return j;
  return -1;
};

/**
 * @method step
 * @memberof CANNON.World
 * @brief Step the simulation
 * @param float dt
 */
CANNON.World.prototype.step = function(dt){
  var world = this,
  that = this,
  N = this.numObjects(),
  bodies = this.bodies,
  solver = this.solver,
  gravity = this.gravity;

  if(dt==undefined){
    if(this.last_dt)
      dt = this.last_dt;
    else
      dt = this.default_dt;
  }

  // Add gravity to all objects
  for(var i=0; i<N; i++){
    var bi = bodies[i];
    if(bi.motionstate & CANNON.Body.DYNAMIC){ // Only for dynamic bodies
      var f = bodies[i].force, m = bodies[i].mass;
      f.x += gravity.x * m;
      f.y += gravity.y * m;
      f.z += gravity.z * m;
    }
  }

  // 1. Collision detection
  var pairs = this.broadphase.collisionPairs(this);
  var p1 = pairs[0];
  var p2 = pairs[1];

  // Get references to things that are accessed often. Will save some lookup time.
  var SPHERE = CANNON.Shape.types.SPHERE;
  var PLANE = CANNON.Shape.types.PLANE;
  var BOX = CANNON.Shape.types.BOX;
  var COMPOUND = CANNON.Shape.types.COMPOUND;

  // Keep track of contacts for current and previous timestep
  // 0: No contact between i and j
  // 1: Contact
  function collisionMatrixGet(i,j,current){
      if(typeof(current)=="undefined") current = true;
      // i == column
      // j == row
      if((current && i<j) || // Current uses upper part of the matrix
	 (!current && i>j)){ // Previous uses lower part of the matrix
	  var temp = j;
	  j = i;
	  i = temp;
      }
      return that.collision_matrix[i+j*N];
  }
    
  function collisionMatrixSet(i,j,value,current){
      if(typeof(current)=="undefined") current = true;
      if((current && i<j) || // Current uses upper part of the matrix
	 (!current && i>j)){ // Previous uses lower part of the matrix
	  var temp = j;
	  j = i;
	  i = temp;
      }
      that.collision_matrix[i+j*N] = parseInt(value);
  }

  // transfer old contact state data to T-1
  function collisionMatrixTick(){
      for(var i=0; i<bodies.length; i++){
	  for(var j=0; j<i; j++){
	      var currentState = collisionMatrixGet(i,j,true);
	      collisionMatrixSet(i,j,currentState,false);
	      collisionMatrixSet(i,j,0,true);
	  }
      }
  }

  collisionMatrixTick();

  // Reset contact solver
  solver.reset(N);

  // Generate contacts
  var oldcontacts = this.contacts;
  this.contacts = [];
  this.contactgen.getContacts(p1,p2,
			      this,
			      this.contacts,
			      oldcontacts // To be reused
			      );

  // Loop over all collisions
  var temp = this.temp;
  var contacts = this.contacts;
  var ncontacts = contacts.length;
  for(var k=0; k<ncontacts; k++){

    // Current contact
    var c = contacts[k];

    // Get current collision indeces
    var bi = c.bi,
      bj = c.bj;

    // Resolve indeces
    var i = this._id2index(bi.id),
      j = this._id2index(bj.id);
    
    // Check last step stats
    var lastCollisionState = collisionMatrixGet(i,j,false);

    // Get collision properties
    var mu = 0.3, e = 0.2;
    var cm = this.getContactMaterial(bi.material,
				     bj.material);
    if(cm){
      mu = cm.friction;
      e = cm.restitution;
    }
      
    // g = ( xj + rj - xi - ri ) .dot ( ni )
    var gvec = temp.gvec;
    gvec.set(bj.position.x + c.rj.x - bi.position.x - c.ri.x,
	     bj.position.y + c.rj.y - bi.position.y - c.ri.y,
	     bj.position.z + c.rj.z - bi.position.z - c.ri.z);
    var g = gvec.dot(c.ni); // Gap, negative if penetration
    
    // Action if penetration
    if(g<0.0){
	// Now we know that i and j are in contact. Set collision matrix state
	collisionMatrixSet(i,j,1,true);
	
	if(collisionMatrixGet(i,j,true)!=collisionMatrixGet(i,j,false)){
	    bi.dispatchEvent({type:"collide", "with":bj});
	    bj.dispatchEvent({type:"collide", "with":bi});
	    bi.wakeUp();
	    bj.wakeUp();
	}

      var vi = bi.velocity;
      var wi = bi.angularVelocity;
      var vj = bj.velocity;
      var wj = bj.angularVelocity;

      var n = c.ni;
      var tangents = [temp.t1, temp.t2];
      n.tangents(tangents[0],tangents[1]);


      var v_contact_i;
      if(wi) v_contact_i = vi.vadd(wi.cross(c.ri));
      else   v_contact_i = vi.copy();

      var v_contact_j;
      if(wj) v_contact_j = vj.vadd(wj.cross(c.rj));
      else   v_contact_j = vj.copy();

      var u_rel = v_contact_j.vsub(v_contact_i)
      var w_rel;
      
      if(wj && wi) w_rel = wj.cross(c.rj).vsub(wi.cross(c.ri));
      else if(wi)  w_rel = wi.cross(c.ri).negate();
      else if(wj)  w_rel = wj.cross(c.rj);

      var u = (vj.vsub(vi)); // Contact velo
      var uw;
      if(wj && wi) uw = (c.rj.cross(wj)).vsub(c.ri.cross(wi));
      else if(wi)  uw = c.ri.cross(wi).negate();
      else if(wj)  uw = (c.rj.cross(wj));
      u.vsub(uw,u);

      // Get mass properties
      var iMi = bi.invMass;
      var iMj = bj.invMass;
	var iIxi = bi.invInertia ? bi.invInertia.x : 0.0;
	var iIyi = bi.invInertia ? bi.invInertia.y : 0.0;
	var iIzi = bi.invInertia ? bi.invInertia.z : 0.0;
	var iIxj = bj.invInertia ? bj.invInertia.x : 0.0;
	var iIyj = bj.invInertia ? bj.invInertia.y : 0.0;
	var iIzj = bj.invInertia ? bj.invInertia.z : 0.0;

      // Add contact constraint
      var rixn = temp.rixn;
      var rjxn = temp.rjxn;
      c.ri.cross(n,rixn);
      c.rj.cross(n,rjxn);

      var un_rel = n.mult(u_rel.dot(n)*0.5);
      var u_rixn_rel = rixn.unit().mult(w_rel.dot(rixn.unit()));
      var u_rjxn_rel = rjxn.unit().mult(-w_rel.dot(rjxn.unit()));

      var gn = c.ni.mult(g);

	// Rotational forces
	var tauxi, tauyi, tauzi;
	if(bi.tau){
	    tauxi = bi.tau.x;
	    tauyi = bi.tau.y;
	    tauzi = bi.tau.z;
	} else {
	    tauxi = 0;
	    tauyi = 0;
	    tauzi = 0;
	}
	var tauxj, tauyj, tauzj;
	if(bi.tau){
	    tauxj = bj.tau.x;
	    tauyj = bj.tau.y;
	    tauzj = bj.tau.z;
	} else {
	    tauxj = 0;
	    tauyj = 0;
	    tauzj = 0;
	}

      solver
	.addConstraint( // Non-penetration constraint jacobian
		       [-n.x,-n.y,-n.z,
			-rixn.x,-rixn.y,-rixn.z,
			n.x,n.y,n.z,
			rjxn.x,rjxn.y,rjxn.z],
			 
		       // Inverse mass matrix
		       [iMi,iMi,iMi,
			iIxi,iIyi,iIzi,
			iMj,iMj,iMj,
			iIxj,iIyj,iIzj],
			 
		       // g - constraint violation / gap
		       [-gn.x,-gn.y,-gn.z,
			0,0,0,//-gn.x,-gn.y,-gn.z,
			gn.x,gn.y,gn.z,
			0,0,0//gn.x,gn.y,gn.z
			],

		       [-un_rel.x,-un_rel.y,-un_rel.z,
			0,0,0,//-u_rixn_rel.x,-u_rixn_rel.y,-u_rixn_rel.z,
			un_rel.x,un_rel.y,un_rel.z,
			0,0,0//u_rjxn_rel.x,u_rjxn_rel.y,u_rjxn_rel.z
			],
			 
		       // External force - forces & torques
		       [bi.force.x,bi.force.y,bi.force.z,
			tauxi,tauyi,tauzi,
			-bj.force.x,-bj.force.y,-bj.force.z,
			-tauxj,-tauyi,-tauzi],
		       0,
		       'inf',
		       i, // These are id's, not indeces...
		       j);

      // Friction constraints
      if(mu>0.0){
	var g = gravity.norm();
	for(var ti=0; ti<tangents.length; ti++){
	  var t = tangents[ti];
	  var rixt = c.ri.cross(t);
	  var rjxt = c.rj.cross(t);

	  var ut_rel = t.mult(u_rel.dot(t));
	  var u_rixt_rel = rixt.unit().mult(u_rel.dot(rixt.unit()));
	  var u_rjxt_rel = rjxt.unit().mult(-u_rel.dot(rjxt.unit()));
	  solver
	    .addConstraint( // Non-penetration constraint jacobian
			   [-t.x,-t.y,-t.z,
			    -rixt.x,-rixt.y,-rixt.z,
			    t.x,t.y,t.z,
			    rjxt.x,rjxt.y,rjxt.z
			    ],
			     
			   // Inverse mass matrix
			   [iMi,iMi,iMi,
			    iIxi,iIyi,iIzi,
			    iMj,iMj,iMj,
			    iIxj,iIyj,iIzj],
			     
			   // g - constraint violation / gap
			   [0,0,0,
			    0,0,0,
			    0,0,0,
			    0,0,0],
			     
			   [-ut_rel.x,-ut_rel.y,-ut_rel.z,
			    0,0,0,//-u_rixt_rel.x,-u_rixt_rel.y,-u_rixt_rel.z,
			    ut_rel.x,ut_rel.y,ut_rel.z,
			    0,0,0//u_rjxt_rel.x,u_rjxt_rel.y,u_rjxt_rel.z
			    ],
			     
			   // External force - forces & torques
			   [bi.force.x,bi.force.y,bi.force.z,
			    tauxi,tauyi,tauzi,
			    bj.force.x,bj.force.y,bj.force.z,
			    tauxj,tauyj,tauzj],
			     
			   -mu*100*(bi.mass+bj.mass),
			   mu*100*(bi.mass+bj.mass),

			   i, // id, not index
			   j);
	}
      }
    }
  }

  // Add user-defined constraints
  var constraints = this.constraints;
  var nconstraints = constraints.length;
  for(var i=0; i<nconstraints; i++){
    // Preliminary - ugly but works
    var bj=-1, bi=-1;
    for(var j=0; j<N; j++)
      if(bodies[j].id === constraints[i].body_i.id)
	bi = j;
      else if(bodies[j].id === constraints[i].body_j.id)
	bj = j;
    solver.addConstraint2(constraints[i],bi,bj);
  }

  var bi;
  if(solver.n){
   
      solver.h = dt;
      solver.solve();
      var vxlambda = solver.vxlambda,
      vylambda = solver.vylambda,
      vzlambda = solver.vzlambda;
      var wxlambda = solver.wxlambda,
      wylambda = solver.wylambda,
      wzlambda = solver.wzlambda;

      // Apply constraint velocities
      for(var i=0; i<N; i++){
	  bi = bodies[i];
	  if(bi.motionstate & CANNON.Body.DYNAMIC){ // Only for dynamic bodies
	      var b = bodies[i];
	      var velo = b.velocity,
	      avelo = b.angularVelocity;
	      velo.x += vxlambda[i],
	      velo.y += vylambda[i],
	      velo.z += vzlambda[i];
	      if(b.angularVelocity){
	        avelo.x += wxlambda[i];
		avelo.y += wylambda[i];
	        avelo.z += wzlambda[i];
	      }
	  }
      }
  }

  // Apply damping
  for(var i=0; i<N; i++){
    bi = bodies[i];
    if(bi.motionstate & CANNON.Body.DYNAMIC){ // Only for dynamic bodies
	var ld = 1.0 - bi.linearDamping,
	ad = 1.0 - bi.angularDamping,
	v = bi.velocity,
	av = bi.angularVelocity;
	v.mult(ld,v);
	if(av)
	    av.mult(ad,av);
    }
  }

  that.dispatchEvent({type:"preStep"});

  // Invoke pre-step callbacks
  for(var i in bodies){
    var bi = bodies[i];
    bi.preStep && bi.preStep.call(bi);
  }

  // Leap frog
  // vnew = v + h*f/m
  // xnew = x + h*vnew
  var q = temp.step_q; 
  var w = temp.step_w;
  var wq = temp.step_wq;
  var stepnumber = world.stepnumber;
  var DYNAMIC_OR_KINEMATIC = CANNON.Body.DYNAMIC | CANNON.Body.KINEMATIC;
  for(var i=0; i<N; i++){
      var b = bodies[i],
      force = b.force,
      tau = b.tau;
      if((b.motionstate & DYNAMIC_OR_KINEMATIC)){ // Only for dynamic
	  var velo = b.velocity,
	  angularVelo = b.angularVelocity,
	  pos = b.position,
	  quat = b.quaternion,
	  invMass = b.invMass,
	  invInertia = b.invInertia;
	  velo.x += force.x * invMass * dt;
	  velo.y += force.y * invMass * dt;
	  velo.z += force.z * invMass * dt;
	  
	  if(b.angularVelocity){
              angularVelo.x += tau.x * invInertia.x * dt;
	      angularVelo.y += tau.y * invInertia.y * dt;
	      angularVelo.z += tau.z * invInertia.z * dt;
	  }
	  
	  // Use new velocity  - leap frog
	  if(!b.isSleeping()){
	      pos.x += velo.x * dt;
	      pos.y += velo.y * dt;
	      pos.z += velo.z * dt;
	      
	      if(b.angularVelocity){
		  w.set(angularVelo.x,
			angularVelo.y,
			angularVelo.z,
			0);
		  w.mult(quat,wq);
		  
		  quat.x += dt * 0.5 * wq.x;
		  quat.y += dt * 0.5 * wq.y;
		  quat.z += dt * 0.5 * wq.z;
		  quat.w += dt * 0.5 * wq.w;
		  if(stepnumber % 3 === 0)
		      quat.normalizeFast();
	      }
	  }
      }
      b.force.set(0,0,0);
      if(b.tau) b.tau.set(0,0,0);
  }

  // Update world time
  world.time += dt;
  world.stepnumber += 1;

  that.dispatchEvent({type:"postStep"});

  // Invoke post-step callbacks
  for(var i=0; i<N; i++){
      var bi = bodies[i];
      var postStep = bi.postStep;
      postStep && postStep.call(bi);
  }

  // Sleeping update
  if(world.allowSleep){
      for(var i=0; i<N; i++){
	  bodies[i].sleepTick();
      }
  }
};

/**
 * @class CANNON.ContactPoint
 * @brief A contact point between two bodies.
 * @description Should be generated by the ContactGenerator.
 * @param CANNON.Body bi
 * @param CANNON.Body bj
 * @param CANNON.Vec3 ri Optional. The vector from the center of mass of bi to the contact.
 * @param CANNON.Vec3 rj Optional. The vector from the center of mass of bj to the contact.
 * @param CANNON.Vec3 ni Optional. Contact normal vector, pointing out of body bi.
 */
CANNON.ContactPoint = function(bi,bj,ri,rj,ni){    
    /**
     * @property CANNON.Vec3 ri
     * @memberof CANNON.ContactPoint
     */
    this.ri = new CANNON.Vec3();

    /**
     * @property CANNON.Vec3 rj
     * @memberof CANNON.ContactPoint
     */
    this.rj = new CANNON.Vec3();

    /**
     * @property CANNON.Vec3 ni
     * @memberof CANNON.ContactPoint
     */
    this.ni = new CANNON.Vec3();
    
    // Copy over data if arguments were passed
    if(ri) ri.copy(this.ri);
    if(rj) rj.copy(this.rj);
    if(ni) ni.copy(this.ni);
    
    /**
     * @property CANNON.Body bi
     * @memberof CANNON.ContactPoint
     */
    this.bi = bi;

    /**
     * @property CANNON.Body bj
     * @memberof CANNON.ContactPoint
     */
    this.bj = bj;
};/*global CANNON:true */

/**
 * @class CANNON.ContactGenerator
 * @brief Helper class for the World. Generates ContactPoints.
 */
CANNON.ContactGenerator = function(){

    /**
     * @property bool contactReduction
     * @memberof CANNON.ContactGenerator
     * @brief Turns on or off contact reduction. Can be handy to turn off when debugging new collision types.
     */
    this.contactReduction = true;

    // Contact point objects that can be reused
    var contactPointPool = [];

    var v3pool = new CANNON.Vec3Pool();

    // temp vertices for plane/polyhedron collision tests
    var tempverts = [new CANNON.Vec3(),
		     new CANNON.Vec3(),
		     new CANNON.Vec3(),
		     new CANNON.Vec3(),
		     new CANNON.Vec3(),
		     new CANNON.Vec3(),
		     new CANNON.Vec3(),
		     new CANNON.Vec3()];
    // temp normals for plane/polyhedron
    var tempnormals = [new CANNON.Vec3(),
		       new CANNON.Vec3(),
		       new CANNON.Vec3(),
		       new CANNON.Vec3(),
		       new CANNON.Vec3(),
		       new CANNON.Vec3()];
    
    /**
     * Near phase calculation, get the contact point, normal, etc.
     * @param array result The result one will get back with all the contact point information
     * @param Shape si Colliding shape. If not given, particle is assumed.
     * @param Shape sj
     * @param Vec3 xi Position of the center of mass
     * @param Vec3 xj
     * @param Quaternion qi Rotation around the center of mass
     * @param Quaternion qj
     * @todo All collision cases
     */
    function nearPhase(result,si,sj,xi,xj,qi,qj,bi,bj){
	var swapped = false;
	if(si && sj){
	    if(si.type>sj.type){
		var temp;
		temp=sj;   sj=si;   si=temp;
		temp=xj;   xj=xi;   xi=temp;
		temp=qj;   qj=qi;   qi=temp;
		temp=bj;   bj=bi;   bi=temp;
		swapped = true;
	    }
	} else {
	    // Particle!
	}

	/**
	 * Make a contact object.
	 * @return object
	 * @todo reuse old contact point objects
	 */
	function makeResult(bi,bj){
	    if(contactPointPool.length){
		var c = contactPointPool.pop();
		c.bi = bi;
		c.bj = bj;
		return c;
	    } else
		return new CANNON.ContactPoint(bi,bj);
	}

	/**
	 * Swaps the body references in the contact
	 * @param object r
	 */
	function swapResult(r){
	    var temp;
	    temp = r.ri; r.ri = r.rj; r.rj = temp;
	    r.ni.negate(r.ni);
	    temp = r.bi; r.bi = r.bj; r.bj = temp;
	}

	/**
	 * Go recursive for compound shapes
	 * @param Shape si
	 * @param CompoundShape sj
	 */
	function recurseCompound(result,si,sj,xi,xj,qi,qj,bi,bj){
	    for(var i=0; i<sj.childShapes.length; i++){
		var r = [];
		nearPhase(r,
			  si,
			  sj.childShapes[i],
			  xi,
			  xj.vadd(qj.vmult(sj.childOffsets[i])), // Transform the shape to its local frame
			  qi,
			  qj.mult(sj.childOrientations[i]),
			  bi,
			  bj);
		// Transform back
		for(var j=0; j<r.length; j++){
		    r[j].rj.vadd(qj.vmult(sj.childOffsets[i]),r[j].rj);
		    result.push(r[j]);
		}
	    }
	}

	if(si && sj){
	    if(si.type==CANNON.Shape.types.SPHERE){
		if(sj.type==CANNON.Shape.types.SPHERE){ // sphere-sphere

		    // We will have one contact in this case
		    var r = makeResult(bi,bj);

		    // Contact normal
		    xj.vsub(xi,r.ni);
		    r.ni.normalize();

		    // Contact point locations
		    r.ni.copy(r.ri);
		    r.ni.copy(r.rj);
		    r.ri.mult(si.radius,r.ri);
		    r.rj.mult(-sj.radius,r.rj);
		    result.push(r);

		} else if(sj.type==CANNON.Shape.types.PLANE){ // sphere-plane

		    // We will have one contact in this case
		    var r = makeResult(bi,bj);

		    // Contact normal
		    sj.normal.copy(r.ni);
		    qj.vmult(r.ni,r.ni);
		    r.ni.negate(r.ni); // body i is the sphere, flip normal
		    r.ni.normalize();

		    // Vector from sphere center to contact point
		    r.ni.mult(si.radius,r.ri);

		    // Project down sphere on plane
		    var point_on_plane_to_sphere = xi.vsub(xj);
		    var plane_to_sphere_ortho = r.ni.mult(r.ni.dot(point_on_plane_to_sphere));
		    r.rj = point_on_plane_to_sphere.vsub(plane_to_sphere_ortho); // The sphere position projected to plane
		    if(plane_to_sphere_ortho.norm() <= si.radius)
			result.push(r);
		    
		} else if(sj.type==CANNON.Shape.types.BOX){ // sphere-box

		    // we refer to the box as body j
		    var box_to_sphere =  xi.vsub(xj);
		    var sides = sj.getSideNormals(true,qj);
		    var R =     si.radius;
		    var penetrating_sides = [];

		    // Check side (plane) intersections
		    var found = false;
		    for(var idx=0; idx<sides.length && !found; idx++){ // Max 3 penetrating sides
			var ns = sides[idx].copy();
			var h = ns.norm();
			ns.normalize();
			var dot = box_to_sphere.dot(ns);
			if(dot<h+R && dot>0){
			    // Intersects plane. Now check the other two dimensions
			    var ns1 = sides[(idx+1)%3].copy();
			    var ns2 = sides[(idx+2)%3].copy();
			    var h1 = ns1.norm();
			    var h2 = ns2.norm();
			    ns1.normalize();
			    ns2.normalize();
			    var dot1 = box_to_sphere.dot(ns1);
			    var dot2 = box_to_sphere.dot(ns2);
			    if(dot1<h1 && dot1>-h1 && dot2<h2 && dot2>-h2){
				found = true;
				var r = makeResult(bi,bj);
				ns.mult(-R,r.ri); // Sphere r
				ns.copy(r.ni);
				r.ni.negate(r.ni); // Normal should be out of sphere
				ns.mult(h).vadd(ns1.mult(dot1)).vadd(ns2.mult(dot2),r.rj); // box
				result.push(r);
			    }
			}
		    }

		    // Check corners
		    var rj = v3pool.get();
		    for(var j=0; j<2 && !found; j++){
			for(var k=0; k<2 && !found; k++){
			    for(var l=0; l<2 && !found; l++){
				rj.set(0,0,0);
				if(j) rj.vadd(sides[0],rj);
				else  rj.vsub(sides[0],rj);
				if(k) rj.vadd(sides[1],rj);
				else  rj.vsub(sides[1],rj);
				if(l) rj.vadd(sides[2],rj);
				else  rj.vsub(sides[2],rj);

				// World position of corner
				var sphere_to_corner = xj.vadd(rj).vsub(xi);
				if(sphere_to_corner.norm()<R){
				    found = true;
				    var r = makeResult(bi,bj);
				    sphere_to_corner.copy(r.ri);
				    r.ri.normalize();
				    r.ri.copy(r.ni);
				    r.ri.mult(R,r.ri);
				    rj.copy(r.rj);
				    result.push(r);
				}
			    }
			}
		    }
		    v3pool.release(rj);
		    rj = null;

		    // Check edges
		    var edgeTangent = v3pool.get();
		    var edgeCenter = v3pool.get();
		    var r = v3pool.get(); // r = edge center to sphere center
		    var orthogonal = v3pool.get();
		    var dist = v3pool.get();
		    for(var j=0; j<sides.length && !found; j++){
			for(var k=0; k<sides.length && !found; k++){
			    if(j%3!=k%3){
				// Get edge tangent
				sides[k].cross(sides[j],edgeTangent);
				edgeTangent.normalize();
				sides[j].vadd(sides[k], edgeCenter);
				xi.copy(r);
				r.vsub(edgeCenter,r);
				r.vsub(xj,r);
				var orthonorm = r.dot(edgeTangent); // distance from edge center to sphere center in the tangent direction
				edgeTangent.mult(orthonorm,orthogonal); // Vector from edge center to sphere center in the tangent direction
				
				// Find the third side orthogonal to this one
				var l = 0;
				while(l==j%3 || l==k%3) l++;

				// vec from edge center to sphere projected to the plane orthogonal to the edge tangent
				xi.copy(dist);
				dist.vsub(orthogonal,dist);
				dist.vsub(edgeCenter,dist);
				dist.vsub(xj,dist);

				// Distances in tangent direction and distance in the plane orthogonal to it
				var tdist = Math.abs(orthonorm);
				var ndist = dist.norm();
				
				if(tdist < sides[l].norm() && ndist<R){
				    found = true;
				    var res = makeResult(bi,bj);
				    edgeCenter.vadd(orthogonal,res.rj); // box rj
				    res.rj.copy(res.rj);
				    dist.negate(res.ni);
				    res.ni.normalize();

				    res.rj.copy(res.ri);
				    res.ri.vadd(xj,res.ri);
				    res.ri.vsub(xi,res.ri);
				    res.ri.normalize();
				    res.ri.mult(R,res.ri);

				    result.push(res);
				}
			    }
			}
		    }
		    v3pool.release(edgeTangent,edgeCenter,r,orthogonal,dist);

		} else if(sj.type==CANNON.Shape.types.COMPOUND){ // sphere-compound
		    recurseCompound(result,si,sj,xi,xj,qi,qj,bi,bj);

		} else if(sj.type==CANNON.Shape.types.CONVEXPOLYHEDRON){ // sphere-convexpolyhedron
		    throw new Error("sphere/convexpolyhedron contacts not implemented yet.");
		}
		
	    } else if(si.type==CANNON.Shape.types.PLANE){
		
		if(sj.type==CANNON.Shape.types.PLANE){ // plane-plane
		    throw "Plane-plane collision... wait, you did WHAT?";
		    
		} else if(sj.type==CANNON.Shape.types.BOX){ // plane-box

		    // Collision normal
		    var n = si.normal.copy();

		    // Loop over corners
		    var numcontacts = 0;
		    var corners = sj.getCorners(qj);
		    for(var idx=0; idx<corners.length && numcontacts<=4; idx++){ // max 4 corners against plane
			var r = makeResult(bi,bj);
			var worldCorner = corners[idx].vadd(xj);
			corners[idx].copy(r.rj);

			// Project down corner to plane to get xj
			var point_on_plane_to_corner = worldCorner.vsub(xi);
			var d = n.dot(point_on_plane_to_corner);
			if(d<=0){
			    numcontacts++;
			    var plane_to_corner = n.mult(d);
			    point_on_plane_to_corner.vsub(plane_to_corner,r.ri);
			    
			    // Set contact normal
			    n.copy(r.ni);
			    
			    // Add contact
			    result.push(r);
			}
		    }
		    
		} else if(sj.type==CANNON.Shape.types.COMPOUND){ // plane-compound
		    recurseCompound(result,si,sj,xi,xj,qi,qj,bi,bj);

		} else if(sj.type==CANNON.Shape.types.CONVEXPOLYHEDRON){ // plane-convex polyhedron
		    // Separating axis is the plane normal
		    // Create a virtual box polyhedron for the plane
		    var t1 = v3pool.get();
		    var t2 = v3pool.get();
		    si.normal.tangents(t1,t2);
		    t1.mult(100000,t1);
		    t2.mult(100000,t2);
		    var n = v3pool.get();
		    si.normal.copy(n);
		    tempverts[0].set(-t1.x -t2.x -n.x, -t1.y -t2.y -n.y, -t1.z -t2.z -n.z); //---
		    tempverts[1].set( t1.x -t2.x +0*n.x,  t1.y -t2.y +0*n.y,  t1.z -t2.z +0*n.z); // +-+
		    tempverts[2].set( t1.x +t2.x -n.x,  t1.y +t2.y -n.y,  t1.z +t2.z -n.z); // ++- 
		    tempverts[3].set(-t1.x +t2.x -n.x, -t1.y +t2.y -n.y, -t1.z +t2.z -n.z); // -+-
		    tempverts[4].set(-t1.x -t2.x +0*n.x, -t1.y -t2.y +0*n.y, -t1.z -t2.z +0*n.z); // --+
		    tempverts[5].set(+t1.x -t2.x +0*n.x,  t1.y -t2.y +0*n.y,  t1.z -t2.z +0*n.z); // +-+
		    tempverts[6].set(+t1.x +t2.x +0*n.x, +t1.y +t2.y +0*n.y,  t1.z +t2.z +0*n.z); // +++
		    tempverts[7].set(-t1.x +t2.x +0*n.x, -t1.y +t2.y +0*n.y, -t1.z +t2.z +0*n.z); // -++
		    t1.normalize();
		    t2.normalize();
		    tempnormals[0].set( -n.x, -n.y, -n.z);
		    tempnormals[1].set(  n.x,  n.y,  n.z);
		    tempnormals[2].set(-t2.x,-t2.y,-t2.z);
		    tempnormals[3].set( t2.x, t2.y, t2.z);
		    tempnormals[4].set(-t1.x,-t1.y,-t1.z);
		    tempnormals[5].set( t1.x, t1.y, t1.z);
		    var planehull = new CANNON.ConvexPolyhedron(tempverts,
								[
								    [0,1,2,3], // -z
								    [4,5,6,7], // +z
								    [0,1,4,5], // -y
								    [2,3,6,7], // +y
								    [0,3,4,7], // -x
								    [1,2,5,6], // +x
								],
								tempnormals);
		    
		    var sepAxis = v3pool.get();
		    n.negate(sepAxis);
		    var q = v3pool.get();
		    if(sj.testSepAxis(sepAxis,planehull,xj,qj,xi,qi)!==false){
			var res = [];
			planehull.clipAgainstHull(xi,qi,sj,xj,qj,sepAxis,-100,100,res);
			for(var j=0; j<res.length; j++){
			    var r = makeResult(bi,bj);
			    sepAxis.negate(r.ni);
			    res[j].normal.negate(q);
			    q.mult(res[j].depth,q);
			    r.ri.set(res[j].point.x + q.x,
				     res[j].point.y + q.y,
				     res[j].point.z + q.z);
			    r.rj.set(res[j].point.x,
				     res[j].point.y,
				     res[j].point.z);
			    // Contact points are in world coordinates. Transform back to relative
			    r.rj.vsub(xj,r.rj);
			    r.ri.vsub(xi,r.ri);
			    result.push(r);
			}
		    }
		    v3pool.release(q,t1,t2,sepAxis,n);
		}

	    } else if(si.type==CANNON.Shape.types.BOX){
		
		if(sj.type==CANNON.Shape.types.BOX){ // box-box
		    // Do convex polyhedron instead
		    nearPhase(result,
			      si.convexPolyhedronRepresentation,
			      sj.convexPolyhedronRepresentation,
			      xi,xj,qi,qj,bi,bj);

		} else if(sj.type==CANNON.Shape.types.COMPOUND){ // box-compound
		    recurseCompound(result,si,sj,xi,xj,qi,qj,bi,bj);
		    
		} else if(sj.type==CANNON.Shape.types.CONVEXPOLYHEDRON){ // box-convexpolyhedron
		    nearPhase(result,
			      si.convexPolyhedronRepresentation,
			      sj,xi,xj,qi,qj,bi,bj);
		}
		
	    } else if(si.type==CANNON.Shape.types.COMPOUND){
		
		if(sj.type==CANNON.Shape.types.COMPOUND){ // compound-compound
		    recurseCompound(result,si,sj,xi,xj,qi,qj,bi,bj);
		    
		} else if(sj.type==CANNON.Shape.types.CONVEXPOLYHEDRON){ // compound-convex polyhedron
		    recurseCompound(result,sj,si,xj,xi,qj,qi,bj,bi);	
		}

	    } else if(si.type==CANNON.Shape.types.CONVEXPOLYHEDRON){

		if(sj.type==CANNON.Shape.types.CONVEXPOLYHEDRON){ // convex polyhedron - convex polyhedron
		    var sepAxis = new CANNON.Vec3();
		    if(si.findSeparatingAxis(sj,xi,qi,xj,qj,sepAxis)){
			var res = [];
			var q = new CANNON.Vec3();
			si.clipAgainstHull(xi,qi,sj,xj,qj,sepAxis,-100,100,res);
			for(var j=0; j<res.length; j++){
			    var r = makeResult(bi,bj);
			    sepAxis.negate(r.ni);
			    res[j].normal.negate(q);
			    q.mult(res[j].depth,q);
			    r.ri.set(res[j].point.x + q.x,
				     res[j].point.y + q.y,
				     res[j].point.z + q.z);
			    r.rj.set(res[j].point.x,
				     res[j].point.y,
				     res[j].point.z);
			    // Contact points are in world coordinates. Transform back to relative
			    r.rj.vsub(xj,r.rj);
			    r.ri.vsub(xi,r.ri);
			    result.push(r);
			}
		    }
		}
	    }
	} else {
	    // Particle!
	    var particle = si ? bj : bi;
	    var other = si ? bi : bj;
	    var otherShape = other.shape;
	    var type = otherShape.type;

	    if(type == CANNON.Shape.types.PLANE){ // Particle vs plane
		var normal = otherShape.normal;
		var relpos = new CANNON.Vec3(); // todo: cache
		particle.position.vsub(other.position,relpos);
		var dot = normal.dot(relpos);
		if(dot<=0.0){
		    var r = makeResult(particle,other);
		    otherShape.normal.copy( r.ni ); // Contact normal is the plane normal
		    r.ni.negate(r.ni);
		    r.ri.set(0,0,0); // Center of particle

		    // Get particle position projected on plane
		    var projected = new CANNON.Vec3();
		    normal.mult(normal.dot(particle.position),projected);
		    particle.position.vsub(projected,projected);
		    //projected.vadd(other.position,projected);

		    // rj is now the projected world position minus plane position
		    projected.copy(r.rj);

		    result.push(r);
		}
	    }
	}
	
	// Swap back if we swapped bodies in the beginning
	for(var i=0; swapped && i<result.length; i++)
	    swapResult(result[i]);
    }

    /**
     * @method reduceContacts
     * @memberof CANNON.ContactGenerator
     * @brief Removes unnecessary members of an array of CANNON.ContactPoint.
     */
    this.reduceContacts = function(contacts){
	
    }

    /**
     * @method getContacts
     * @memberof CANNON.ContactGenerator
     * @param array p1 Array of body indices
     * @param array p2 Array of body indices
     * @param CANNON.World world
     * @param array result Array to store generated contacts
     * @param array oldcontacts Optional. Array of reusable contact objects
     */
    this.getContacts = function(p1,p2,world,result,oldcontacts){
	
	// Save old contact objects
	for(var i=0; oldcontacts && i<oldcontacts.length; i++)
	    contactPointPool.push(oldcontacts[i]);

	for(var k=0; k<p1.length; k++){
	    // Get current collision indeces
	    var bi = p1[k],
	    bj = p2[k];

	    // Get contacts
	    nearPhase(result,
		      bi.shape,
		      bj.shape,
		      bi.position,
		      bj.position,
		      bi.quaternion,
		      bj.quaternion,
		      bi,
		      bj
		     );
	}
    }
};/*global CANNON:true */

/**
 * Constraint base class
 * @author schteppe
 */
CANNON.Constraint = function(){

  /**
   * @property array equations
   * @brief A number of CANNON.Equation's that belongs to this Constraint
   */
  this.equations = [];

  this.id = -1;

};
CANNON.Constraint.prototype.constructor = CANNON.Constraint;

/**
 * @brief Updates the internal numbers, calculates the Jacobian etc.
 */
CANNON.Constraint.prototype.update = function(){
  throw "update() not implemented in this Constraint subclass!";
};
/**
 * Contact constraint class
 * @author schteppe
 * @param CANNON.RigidBody bodyA
 * @param CANNON.RigidBody bodyB
 * @param float friction
 * @todo test
 */
CANNON.ContactConstraint = function(bodyA,bodyB,slipForce){
  CANNON.Constraint.call(this);
  this.body_i = bodyA;
  this.body_j = bodyB;
  this.contact = contact;
  this.slipForce = slipForce;
  this.unused_equations = [];
  this.temp = {
    rixn:new CANNON.Vec3(),
    rjxn:new CANNON.Vec3(),
    t1:new CANNON.Vec3(),
    t2:new CANNON.Vec3()
  };
};

CANNON.ContactConstraint.prototype = new CANNON.Constraint();
CANNON.ContactConstraint.prototype.constructor = CANNON.ContactConstraint;

CANNON.ContactConstraint.prototype.update = function(){

  /*
  if(friction>0.0){
    for(var i=0; i<3; i++)
      this.equations.push(new CANNON.Equation(bodyA,bodyB)); // Normal+2tangents
  } else
    this.equations.push(new CANNON.Equation(bodyA,bodyB)); // Normal
  */

  var bi = this.body_i,
  bj = this.body_j;

  var vi = bi.velocity,
  wi = bi.angularVelocity,
  vj = bj.velocity,
  wj = bj.angularVelocity;

  var tangents = [this.temp.t1, this.temp.t2];
  for(var i in bi.contacts){
    for(var j in bj.contacts){
      if(bi.contacts[i].to.id==bj.id && bj.contacts[j].to.id==bi.id){
	var ri = bi.contacts[i].r,
	  rj = bj.contacts[j].r,
	  ni = bi.contacts[i].n; // normals should be the same anyways

	n.tangents(tangents[0],tangents[1]);
	
	var v_contact_i = vi.vadd(wi.cross(c.ri));
	var v_contact_j = vj.vadd(wj.cross(c.rj));
	var u_rel = v_contact_j.vsub(v_contact_i);
	var w_rel = wj.cross(c.rj).vsub(wi.cross(c.ri));
	
	var u = (vj.vsub(vi));
	var uw = (c.rj.cross(wj)).vsub(c.ri.cross(wi));
	u.vsub(uw,u);
	
	// Get mass properties
	var iMi = bi.invMass;
	var iMj = bj.invMass;
	var iIxi = bi.invInertia.x;
	var iIyi = bi.invInertia.y;
	var iIzi = bi.invInertia.z;
	var iIxj = bj.invInertia.x;
	var iIyj = bj.invInertia.y;
	var iIzj = bj.invInertia.z;
	
	// Add contact constraint
	var rixn = this.temp.rixn;
	var rjxn = this.temp.rjxn;
	c.ri.cross(n,rixn);
	c.rj.cross(n,rjxn);
	
	var un_rel = n.mult(u_rel.dot(n));
	var u_rixn_rel = rixn.unit().mult(w_rel.dot(rixn.unit()));
	var u_rjxn_rel = rjxn.unit().mult(-w_rel.dot(rjxn.unit()));
	
	var gn = c.ni.mult(g);
	
	// Jacobian, eq. 25 in spooknotes
	n.negate(eq.G1);
	rixn.negate(eq.G2);
	n.copy(eq.G3);
	rjxn.copy(eq.G4);
	
	eq.setDefaultMassProps();
	
	// g - constraint violation / gap
	gn.negate(eq.g1);
	gn.copy(eq.g3);
	
	// W
	un_rel.negate(eq.W1);
	un_rel.copy(eq.W3);

	// External force - forces & torques
	bi.force.copy(eq.f1);
	bi.tau.copy(eq.f2);
	bj.force.copy(eq.f3);
	bj.tau.copy(eq.f4);

	eq.lambdamin = 0;
	eq.lambdamax = 'inf';
	/*
  // Friction constraints
  if(mu>0.0){
    var g = that.gravity.norm();
    for(var ti=0; ti<tangents.length; ti++){
      var t = tangents[ti];
      var rixt = c.ri.cross(t);
      var rjxt = c.rj.cross(t);
      
      var ut_rel = t.mult(u_rel.dot(t));
      var u_rixt_rel = rixt.unit().mult(u_rel.dot(rixt.unit()));
      var u_rjxt_rel = rjxt.unit().mult(-u_rel.dot(rjxt.unit()));
      this.solver
	.addConstraint( // Non-penetration constraint jacobian
		       [-t.x,-t.y,-t.z,
			-rixt.x,-rixt.y,-rixt.z,
			t.x,t.y,t.z,
			rjxt.x,rjxt.y,rjxt.z
			],
		       
		       // Inverse mass matrix
		       [iMi,iMi,iMi,
			iIxi,iIyi,iIzi,
			iMj,iMj,iMj,
			iIxj,iIyj,iIzj],
		       
		       // g - constraint violation / gap
		       [0,0,0,
			      0,0,0,
			0,0,0,
			0,0,0],
		       
		       [-ut_rel.x,-ut_rel.y,-ut_rel.z,
			0,0,0,//-u_rixt_rel.x,-u_rixt_rel.y,-u_rixt_rel.z,
			ut_rel.x,ut_rel.y,ut_rel.z,
			      0,0,0//u_rjxt_rel.x,u_rjxt_rel.y,u_rjxt_rel.z
			],
		       
		       // External force - forces & torques
		       [bi.force.x,bi.force.y,bi.force.z,
			bi.tau.x,bi.tau.y,bi.tau.z,
			bj.force.x,bj.force.y,bj.force.z,
			bj.tau.x,bj.tau.y,bj.tau.z],
		       
		       -mu*g*(bi.mass+bj.mass),
		       mu*g*(bi.mass+bj.mass),
		       
		       i,
		       j);
		       }
		       }
	*/
	
      }
    }
  }
};
/**
 * @brief Distance constraint class
 * @author schteppe
 * @param CANNON.Body bodyA
 * @param CANNON.Body bodyB Could optionally be a CANNON.Vec3 to constrain a body to a static point in space
 * @param float distance
 * @todo test
 */
CANNON.DistanceConstraint = function(bodyA,bodyB,distance){
  CANNON.Constraint.call(this);
  this.body_i = bodyA;
  this.body_j = bodyB;
  this.distance = Number(distance);
    var eq = new CANNON.Equation(bodyA, bodyB instanceof CANNON.Vec3 ? null : bodyB);
  this.equations.push(eq);
};

CANNON.DistanceConstraint.prototype = new CANNON.Constraint();
CANNON.DistanceConstraint.prototype.constructor = CANNON.DistanceConstraint;

CANNON.DistanceConstraint.prototype.update = function(){
  var eq = this.equations[0], bi = this.body_i, bj = this.body_j;
  var pair = typeof(bj.mass)=="number";

  // Jacobian is the distance unit vector
  if(pair)
    bj.position.vsub(bi.position, eq.G1);
  else{
    bi.position.vsub(bj,eq.G1);
  }
  eq.G1.normalize();
  if(eq.G1.isZero()) eq.G1.set(1,0,0);
  eq.G1.negate(eq.G3);
  //console.log(eq.G1.toString());
  
  // Mass properties
  eq.setDefaultMassProps();
  eq.setDefaultForce();

  // Constraint violation
  eq.g1.set((pair ? bj.position.x : bj.x) - bi.position.x - eq.G1.x*this.distance,
	    (pair ? bj.position.y : bj.y) - bi.position.y - eq.G1.y*this.distance,
	    (pair ? bj.position.z : bj.z) - bi.position.z - eq.G1.z*this.distance);
  eq.g1.negate(eq.g1);
  eq.g1.negate(eq.g3);
};

CANNON.DistanceConstraint.prototype.setMaxForce = function(f){
  // @todo rescale with masses
  this.equations[0].lambdamax = Math.abs(f);
  this.equations[0].lambdamin = -this.equations[0].lambdamax;
};/**
 * Equation class
 * @author schteppe
 * @brief Something for the solver to chew on. Its mostly a holder of vectors
 * @todo try with the solver
 * @param CANNON.Body bi Could optionally be null
 * @param CANNON.Body bj Could optionally be null
 */
CANNON.Equation = function(bi,bj){

  // Jacobian
  this.G1 = new CANNON.Vec3();
  this.G2 = new CANNON.Vec3();
  this.G3 = new CANNON.Vec3();
  this.G4 = new CANNON.Vec3();

  // Inverse mass matrix
  this.iM1 = new CANNON.Vec3();
  this.iM2 = new CANNON.Vec3();
  this.iM3 = new CANNON.Vec3();
  this.iM4 = new CANNON.Vec3();

  // Constraint violation, g
  this.g1 = new CANNON.Vec3();
  this.g2 = new CANNON.Vec3();
  this.g3 = new CANNON.Vec3();
  this.g4 = new CANNON.Vec3();

  // Derivative of g, gdot
  this.W1 = new CANNON.Vec3();
  this.W2 = new CANNON.Vec3();
  this.W3 = new CANNON.Vec3();
  this.W4 = new CANNON.Vec3();
  
  // External force, f
  this.f1 = new CANNON.Vec3();
  this.f2 = new CANNON.Vec3();
  this.f3 = new CANNON.Vec3();
  this.f4 = new CANNON.Vec3();

  // Clamping for multipliers (see as max constraint force)
  this.lambdamax =  1e6;
  this.lambdamin = -1e6;

  // Bodies to apply the constraint forces on
  this.body_i = bi;
  this.body_j = bj;
};

CANNON.Equation.prototype.setDefaultMassProps = function(){
  var bi = this.body_i, bj = this.body_j;
  if(bi){
    this.iM1.set(bi.invMass,
		 bi.invMass,
		 bi.invMass);
    if(bi.invInertia)
      bi.invInertia.copy(this.iM2);
  }
  if(bj){
    this.iM3.set(bj.invMass,
		 bj.invMass,
		 bj.invMass);
    if(bj.invInertia)
      bj.invInertia.copy(this.iM4);
  }
};

CANNON.Equation.prototype.setDefaultForce = function(){
  var bi = this.body_i, bj = this.body_j;
  if(bi){
    bi.force.copy(this.f1);
    if(bi.tau) bi.tau.copy(this.f2);
  }
  if(bj){
    bj.force.copy(this.f3);
    if(bj.tau) bj.tau.copy(this.f4);
  }
};/*global CANNON:true */

/**
 * @author schteppe
 * @param CANNON.Body bodyA
 * @param CANNON.Vec3 pivotA The point relative to the center of mass of bodyA which bodyA is constrained to.
 * @param CANNON.Body bodyB Optional. If specified, pivotB must also be specified, and bodyB will be constrained in a similar way to the same point as bodyA. We will therefore get sort of a link between bodyA and bodyB. If not specified, bodyA will be constrained to a static point.
 * @param CANNON.Vec3 pivotB Optional.
 */
CANNON.PointToPointConstraint = function(bodyA,pivotA,bodyB,pivotB){
  CANNON.Constraint.call(this);
  this.body_i = bodyA;
  this.body_j = bodyB;
  this.pivot_i = pivotA;
  this.pivot_j = pivotB;

  // Need 3 equations, 1 normal + 2 tangent
  for(var i=0; i<3; i++)
    this.equations.push(new Equation(bodyA,bodyB));
};

CANNON.PointToPointConstraint.prototype = new CANNON.Constraint();
CANNON.PointToPointConstraint.prototype.constructor = CANNON.PointToPointConstraint;

/**
 * @todo
 */
CANNON.PointToPointConstraint.prototype.update = function(){
  /*
  var eq = this.equations[0], bi = this.body_i, bj = this.body_j;

  // Jacobian is the distance unit vector
  bj.position.vsub(bi.position,eq.G1);
  eq.G1.normalize();
  eq.G1.negate(eq.G3);
  
  // Mass properties
  eq.setDefaultMassProps();
  eq.setDefaultForce();

  // Constraint violation
  eq.g1.set(bj.position.x - bi.position.x - eq.G1.x*dist,
	    bj.position.y - bi.position.y - eq.G1.y*dist,
	    bj.position.z - bi.position.z - eq.G1.z*dist);
  eq.g1.negate(eq.g3);  
  */
};if (typeof module !== 'undefined') {
	// export for node
	module.exports = CANNON;
} else {
	// assign to window
	this.CANNON = CANNON;
}

}).apply(this);