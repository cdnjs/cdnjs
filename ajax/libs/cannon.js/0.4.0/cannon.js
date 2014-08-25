/**
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
 * @mainpage Cannon.js
 * A lightweight 3D physics engine for the web. See the github page for more information: https://github.com/schteppe/cannon.js
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
 * @todo Make it a base class for broadphase implementations, and rename this one to NaiveBroadphase
 */
CANNON.Broadphase = function(){
  /// The world to search for collisions in.
  this.world = null;
};
CANNON.Broadphase.prototype.constructor = CANNON.BroadPhase;

/**
 * @fn collisionPairs
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
 * @brief Naive broadphase implementation, used in lack of better ones. The naive broadphase looks at all possible pairs without restriction, therefore it has complexity N^2 (which is bad)
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
 * @fn collisionPairs
 * @memberof CANNON.NaiveBroadphase
 * @brief Get all the collision pairs in the physics world
 * @param CANNON.World world
 * @return array An array containing two arrays of integers. The integers corresponds to the body indices.
 */
CANNON.NaiveBroadphase.prototype.collisionPairs = function(world){
  var pairs1 = [];
  var pairs2 = [];
  var n = world.numObjects();

  // Local fast access
  var SPHERE =   CANNON.Shape.types.SPHERE;
  var PLANE =    CANNON.Shape.types.PLANE;
  var BOX =      CANNON.Shape.types.BOX;
  var COMPOUND = CANNON.Shape.types.COMPOUND;
  var bodies = world.bodies;

  // Temp vecs
  var r = this.temp.r;
  var normal = this.temp.normal;
  var quat = this.temp.quat;

  // Naive N^2 ftw!
  for(var i=0; i<n; i++){
    for(var j=0; j<i; j++){

      var bi = bodies[i], bj = bodies[j];
      var ti = bi.shape.type, tj = bj.shape.type;

      // --- Box / sphere / compound collision ---
      if((ti==BOX      && tj==BOX) ||
	 (ti==BOX      && tj==COMPOUND) ||
	 (ti==BOX      && tj==SPHERE) ||
	 (ti==SPHERE   && tj==BOX) ||
	 (ti==SPHERE   && tj==SPHERE) ||
	 (ti==SPHERE   && tj==COMPOUND) ||
	 (ti==COMPOUND && tj==COMPOUND) ||
	 (ti==COMPOUND && tj==SPHERE) ||
	 (ti==COMPOUND && tj==BOX)){

	// Rel. position
	bj.position.vsub(bi.position,r);

	var boundingRadius1 = bi.shape.boundingSphereRadius();
	var boundingRadius2 = bj.shape.boundingSphereRadius();
	if(r.norm()<(boundingRadius1+boundingRadius2)){
	  pairs1.push(i);
	  pairs2.push(j);
	}

      // --- Sphere/box/compound versus plane ---
      } else if((ti==SPHERE && tj==PLANE) ||
		(ti==PLANE &&  tj==SPHERE) ||

		(ti==BOX && tj==PLANE) ||
		(ti==PLANE &&  tj==BOX) ||

		(ti==COMPOUND && tj==PLANE) ||
		(ti==PLANE &&  tj==COMPOUND)){

	var pi = ti==PLANE ? i : j, // Plane
	  oi = ti!=PLANE ? i : j; // Other
	  
	  // Rel. position
	bodies[oi].position.vsub(bodies[pi].position,r);
	bodies[pi].quaternion.vmult(bodies[pi].shape.normal,normal);
	
	var q = r.dot(normal) - bodies[oi].shape.boundingSphereRadius();
	if(q<0.0){
	  pairs1.push(i);
	  pairs2.push(j);
	}
      }
    }
  }
  return [pairs1,pairs2];
};
/*global CANNON:true */

/**
 * @class CANNON.Mat3
 * @brief Produce a 3x3 matrix. Columns first!
 * @param array elements Array of nine elements. Optional.
 * @author schteppe / http://github.com/schteppe
 */
CANNON.Mat3 = function(elements){
  /**
   * @property Float32Array elements
   * @memberof CANNON.Mat3
   * @brief A vector of length 9, containing all matrix elements
   */
  if(elements)
    this.elements = new Float32Array(elements);
  else
    this.elements = new Float32Array(9);
};

/**
 * @fn identity
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
 * @fn vmult
 * @memberof CANNON.vmult
 * @brief Matrix-Vector multiplication
 * @param CANNON.Vec3 v The vector to multiply with
 * @param CANNON.Vec3 target Optional, target to save the result in.
 */
CANNON.Mat3.prototype.vmult = function(v,target){
  if(target===undefined)
    target = new CANNON.Vec3();

  var vec = [v.x, v.y, v.z];
  var targetvec = [0, 0, 0];
  for(var i=0; i<3; i++)
    for(var j=0; j<3; j++)
      targetvec[i] += this.elements[i+3*j]*vec[i];

  target.x = targetvec[0];
  target.y = targetvec[1];
  target.z = targetvec[2];
  return target;
};

/**
 * @fn smult
 * @memberof CANNON.Mat3
 * @brief Matrix-scalar multiplication
 * @param float s
 */
CANNON.Mat3.prototype.smult = function(s){
  for(var i=0; i<this.elements.length; i++)
    this.elements[i] *= s;
};

/**
 * @fn mmult
 * @memberof CANNON.Mat3
 * @brief Matrix multiplication
 * @param CANNON.Mat3 m Matrix to multiply with from left side.
 * @return CANNON.Mat3 The result.
 */
CANNON.Mat3.prototype.mmult = function(m){
  var r = new CANNON.Mat3();
  for(var i=0; i<3; i++)
    for(var j=0; j<3; j++){
      var sum = 0.0;
      for(var k=0; k<3; k++)
	sum += this.elements[i+k] * m.elements[k+j*3];
      r.elements[i+j*3] = sum; 
    }
  return r;
};

/**
 * @fn solve
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
  for(var i=0; i<3; i++)
    for(var j=0; j<3; j++)
      eqns[i+nc*j] = this.elements[i+3*j];
  eqns[3+4*0] = b.x;
  eqns[3+4*1] = b.y;
  eqns[3+4*2] = b.z;
  
  // Compute right upper triangular version of the matrix - Gauss elimination
  var n = 3;
  var k = n;
  var i;
  var np;
  var kp = 4; // num rows
  var p;
  var els;
  do {
    i = k - n;
    if (eqns[i+nc*i] == 0) {
      for (j = i + 1; j < k; j++) {
	if (eqns[i+nc*j] != 0) {
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
    if (eqns[i+nc*i] != 0) {
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

  if(isNaN(target.x) || isNaN(target.y) || isNaN(target.z) ||
     target.x==Infinity || target.y==Infinity || target.z==Infinity)
    throw "Could not solve equation! Got x=["+target.toString()+"], b=["+b.toString()+"], A=["+this.toString()+"]";

  return target;
};

/**
 * @fn e
 * @memberof CANNON.Mat3
 * @brief Get an element in the matrix by index. Index starts at 0, not 1!!!
 * @param int i
 * @param int j
 * @param float value Optional. If provided, the matrix element will be set to this value.
 * @return float
 */
CANNON.Mat3.prototype.e = function(i,j,value){
  if(value==undefined)
    return this.elements[i+3*j];
  else {
    // Set value
    this.elements[i+3*j] = value;
  }
};

/**
 * @fn copy
 * @memberof CANNON.Mat3
 * @brief Copy the matrix
 * @param CANNON.Mat3 target Optional. Target to save the copy in.
 * @return CANNON.Mat3
 */
CANNON.Mat3.prototype.copy = function(target){
  target = target || new Mat3();
  for(var i=0; i<this.elements.length; i++)
    target.elements[i] = this.elements[i];
  return target;
};

/**
 * @fn toString
 * @memberof CANNON.Mat3
 * @brief Returns a string representation of the matrix.
 * @return string
 */
CANNON.Mat3.prototype.toString = function(){
  var r = "";
  var sep = ",";
  for(var i=0; i<9; i++)
    r += this.elements[i] + sep;
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
 * @fn cross
 * @memberof CANNON.Vec3
 * @brief Vector cross product
 * @param CANNON.Vec3 v
 * @param CANNON.Vec3 target Optional. Target to save in.
 * @return CANNON.Vec3
 */
CANNON.Vec3.prototype.cross = function(v,target){
  target = target || new CANNON.Vec3();
  var A = [this.x, this.y, this.z];
  var B = [v.x, v.y, v.z];
  
  target.x = (A[1] * B[2]) - (A[2] * B[1]);
  target.y = (A[2] * B[0]) - (A[0] * B[2]);
  target.z = (A[0] * B[1]) - (A[1] * B[0]);

  return target;
};

/**
 * @fn set
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
 * @fn vadd
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
 * @fn vsub
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
 * @fn crossmat
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
 * @fn normalize
 * @memberof CANNON.Vec3
 * @brief Normalize the vector. Note that this changes the values in the vector.
 * @return float Returns the norm of the vector
 */
CANNON.Vec3.prototype.normalize = function(){
  var n = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
  if(n>0.0){
    this.x /= n;
    this.y /= n;
    this.z /= n;
  } else {
    // Make something up
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }
  return n;
};

/**
 * @fn unit
 * @memberof CANNON.Vec3
 * @brief Get the version of this vector that is of length 1.
 * @param CANNON.Vec3 target Optional target to save in
 * @return CANNON.Vec3 Returns the unit vector
 */
CANNON.Vec3.prototype.unit = function(target){
  target = target || new CANNON.Vec3();
  var ninv = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
  if(ninv>0.0){
    ninv = 1.0/ninv;
    target.x = this.x * ninv;
    target.y = this.y * ninv;
    target.z = this.z * ninv;
  } else {
    target.x = 0;
    target.y = 0;
    target.z = 0;
  }
  return target;
};

/**
 * @fn norm
 * @memberof CANNON.Vec3
 * @brief Get the 2-norm (length) of the vector
 * @return float
 */
CANNON.Vec3.prototype.norm = function(){
  return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
};

/**
 * @fn mult
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
 * @fn dot
 * @memberof CANNON.Vec3
 * @brief Calculate dot product
 * @param CANNON.Vec3 v
 * @return float
 */
CANNON.Vec3.prototype.dot = function(v){
  return (this.x * v.x + this.y * v.y + this.z * v.z);
};

/**
 * @fn negate
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
 * @fn tangents
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
 * @fn toString
 * @memberof CANNON.Vec3
 * @brief Converts to a more readable format
 * @return string
 */
CANNON.Vec3.prototype.toString = function(){
  return this.x+","+this.y+","+this.z;
};

/**
 * @fn copy
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
/*global CANNON:true */

/**
 * @class CANNON.Quaternion
 * @brief 4-dimensional quaternion
 * @param float x
 * @param float y
 * @param float z 
 * @param float w
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
 * @fn toString
 * @memberof CANNON.Quaternion
 * @brief Convert to a readable format
 * @return string
 */
CANNON.Quaternion.prototype.toString = function(){
  return this.x+","+this.y+","+this.z+","+this.w;
};

/**
 * @fn setFromAxisAngle
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

/**
 * @fn setFromVectors
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
 * @fn mult
 * @memberof CANNON.Quaternion
 * @brief Quaternion multiplication
 * @param CANNON.Quaternion q
 * @param CANNON.Quaternion target Optional.
 * @return CANNON.Quaternion
 */ 
CANNON.Quaternion.prototype.mult = function(q,target){
  if(target==undefined)
    target = new CANNON.Quaternion();
  
  var va = new CANNON.Vec3(this.x,this.y,this.z);
  var vb = new CANNON.Vec3(q.x,q.y,q.z);
  target.w = this.w*q.w - va.dot(vb);
  vaxvb = va.cross(vb);
  target.x = this.w * vb.x + q.w*va.x + vaxvb.x;
  target.y = this.w * vb.y + q.w*va.y + vaxvb.y;
  target.z = this.w * vb.z + q.w*va.z + vaxvb.z;
  return target;
};

/**
 * @fn inverse
 * @memberof CANNON.Quaternion
 * @brief Get the inverse quaternion rotation.
 * @param CANNON.Quaternion target
 * @return CANNON.Quaternion
 */
CANNON.Quaternion.prototype.inverse = function(target){
  if(target==undefined)
    target = new CANNON.Quaternion();
  
  target.x = -this.x;
  target.y = -this.y;
  target.z = -this.z;
  target.w = this.w;

  return target;
};

/**
 * @fn normalize
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
 * @fn vmult
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

CANNON.Quaternion.prototype.copy = function(target){
  target.x = this.x;
  target.y = this.y;
  target.z = this.z;
  target.w = this.w;
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
};
CANNON.Shape.prototype.constructor = CANNON.Shape;

/**
 * @fn boundingSphereRadius
 * @memberof CANNON.Shape
 * @brief Get the bounding sphere radius from this shape
 * @return float
 */
CANNON.Shape.prototype.boundingSphereRadius = function(){
  throw "boundingSphereRadius() not implemented for shape type "+this.type;
};

/**
 * @fn volume
 * @memberof CANNON.Shape
 * @brief Get the volume of this shape
 * @return float
 */
CANNON.Shape.prototype.volume = function(){
  throw "volume() not implemented for shape type "+this.type;
};

/**
 * @fn calculateLocalInertia
 * @memberof CANNON.Shape
 * @brief Calculates the inertia in the local frame for this shape.
 * @return CANNON.Vec3
 * @see http://en.wikipedia.org/wiki/List_of_moments_of_inertia
 */
CANNON.Shape.prototype.calculateLocalInertia = function(mass,target){
  throw "calculateLocalInertia() not implemented for shape type "+this.type;
};

/**
 * @fn calculateTransformedInertia
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
  COMPOUND:8
};

/*global CANNON:true */

/**
 * @class CANNON.RigidBody
 * @brief Rigid body base class
 * @param float mass
 * @param CANNON.Shape shape
 * @param CANNON.Material material
 * @todo Motion state? Like dynamic, kinematic, static...
 */
CANNON.RigidBody = function(mass,shape,material){

  /**
   * @property CANNON.Vec3 position
   * @memberof CANNON.RigidBody
   */
  this.position = new CANNON.Vec3();

  /**
   * @property CANNON.Vec3 initPosition
   * @memberof CANNON.RigidBody
   * @brief Initial position of the body
   */
  this.initPosition = new CANNON.Vec3();

  /**
   * @property CANNON.Vec3 velocity
   * @memberof CANNON.RigidBody
   */
  this.velocity = new CANNON.Vec3();

  /**
   * @property CANNON.Vec3 initVelocity
   * @memberof CANNON.RigidBody
   */
  this.initVelocity = new CANNON.Vec3();

  /**
   * @property CANNON.Vec3 force
   * @memberof CANNON.RigidBody
   * @brief Linear force on the body
   */
  this.force = new CANNON.Vec3();

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
   * @property float mass
   * @memberof CANNON.RigidBody
   */
  this.mass = mass;

  /**
   * @property float invMass
   * @memberof CANNON.RigidBody
   */
  this.invMass = mass>0 ? 1.0/mass : 0;

  /**
   * @property CANNON.Shape shape
   * @memberof CANNON.RigidBody
   */
  this.shape = shape;

  /**
   * @property CANNON.Vec3 inertia
   * @memberof CANNON.RigidBody
   */
  this.inertia = shape.calculateLocalInertia(mass);

  /**
   * @property CANNON.Vec3 intInertia
   * @memberof CANNON.RigidBody
   */
  this.invInertia = new CANNON.Vec3(this.inertia.x>0 ? 1.0/this.inertia.x : 0,
				    this.inertia.y>0 ? 1.0/this.inertia.y : 0,
				    this.inertia.z>0 ? 1.0/this.inertia.z : 0);

  /**
   * @property CANNON.Material material
   * @memberof CANNON.RigidBody
   */
  this.material = material;

  /**
   * @property float linearDamping
   * @memberof CANNON.RigidBody
   */
  this.linearDamping = 0.01; // Perhaps default should be zero here?

  /**
   * @property float angularDamping
   * @memberof CANNON.RigidBody
   */
  this.angularDamping = 0.01;

  /**
   * @property bool fixed
   * @memberof CANNON.RigidBody
   * @brief True if the body is static
   */
  this.fixed = (mass <= 0.0);

  /**
   * @property CANNON.World world
   * @memberof CANNON.RigidBody
   * @brief Reference to the world the body is living in
   */
  this.world = null;
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
 * @param CANNON.Vec3 halfExtents
 * @author schteppe
 * @extends CANNON.Shape
 */
CANNON.Box = function(halfExtents){
  CANNON.Shape.call(this);
  this.halfExtents = halfExtents;
  this.type = CANNON.Shape.types.BOX;
};
CANNON.Box.prototype = new CANNON.Shape();
CANNON.Box.prototype.constructor = CANNON.Box;

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
 * @fn getCorners
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
 * @fn getSideNormals
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
 * @author schteppe
 */
CANNON.Plane = function(normal){
  CANNON.Shape.call(this);
  normal.normalize();
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
 * @brief Compound shape
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
 * @fn addChild
 * @memberof CANNON.Compound
 * @brief Add a subshape
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
};/*global CANNON:true */

/**
 * @class CANNON.Solver
 * @brief Constraint solver.
 * @todo The spook parameters should be specified for each constraint, not globally.
 * @author schteppe / https://github.com/schteppe
 */
CANNON.Solver = function(a,b,eps,k,d,iter,h){
  /**
   * @property int iterations
   * @memberof CANNON.Solver
   */
  this.iterations = iter || 10;

  /**
   * @property float h
   * @brief Time step size
   * @memberof CANNON.Solver
   */
  this.h = h || 1.0/60.0;

  /**
   * @property float a
   * @brief SPOOK parameter
   * @memberof CANNON.Solver
   */
  this.a = a;

  /**
   * @property float b
   * @brief SPOOK parameter
   * @memberof CANNON.Solver
   */
  this.b = b;

  /**
   * @property float eps
   * @brief SPOOK parameter
   * @memberof CANNON.Solver
   */
  this.eps = eps;

  /**
   * @property float k
   * @brief SPOOK parameter, spring stiffness
   * @memberof CANNON.Solver
   */
  this.k = k;

  /**
   * @property float d
   * @brief SPOOK parameter, similar to damping
   * @memberof CANNON.Solver
   */
  this.d = d;

  this.reset(0);

  /**
   * @property bool debug
   * @brief Debug flag, will output solver data to console if true
   * @memberof CANNON.Solver
   */
  this.debug = false;

  if(this.debug)
    console.log("a:",a,"b",b,"eps",eps,"k",k,"d",d);
};

/**
 * @fn reset
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

  // We know number of bodies so we can allocate these now
  this.vxlambda = new Float32Array(numbodies);
  this.vylambda = new Float32Array(numbodies);
  this.vzlambda = new Float32Array(numbodies);
  this.wxlambda = new Float32Array(numbodies);
  this.wylambda = new Float32Array(numbodies);
  this.wzlambda = new Float32Array(numbodies);
};

/**
 * @fn addConstraint
 * @memberof CANNON.Solver
 * @brief Add a constraint to the solver
 * @param array G Jacobian vector, 12 elements (6 dof per body)
 * @param array MinvTrace The trace of the Inverse mass matrix (12 elements). The mass matrix is 12x12 elements from the beginning and 6x6 matrix per body (mass matrix and inertia matrix).
 * @param array q The constraint violation vector in generalized coordinates (12 elements)
 * @param array qdot The time-derivative of the constraint violation vector q.
 * @param array Fext External forces (12 elements)
 * @param float lower Lower constraint force bound
 * @param float upper Upper constraint force bound
 * @param int body_i The first rigid body index
 * @param int body_j The second rigid body index - set to -1 if none
 * @see https://www8.cs.umu.se/kurser/5DV058/VT09/lectures/spooknotes.pdf
 */
CANNON.Solver.prototype.addConstraint = function(G,MinvTrace,q,qdot,Fext,lower,upper,body_i,body_j){
  if(this.debug){
    console.log("Adding constraint ",this.n);
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
 * @fn addNonPenetrationConstraint
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
 * @fn solve
 * @memberof CANNON.Solver
 * @brief Solves the system, and sets the vlambda and wlambda properties of the Solver object
 */
CANNON.Solver.prototype.solve = function(){
  this.i = new Int16Array(this.i);
  var n = this.n;
  var lambda = new Float32Array(n);
  var dlambda = new Float32Array(n);
  var ulambda = new Float32Array(12*n); // 6 dof per constraint, and 2 bodies
  var B = new Float32Array(n);
  var c = new Float32Array(n);
  var precomp = new Int16Array(n);
  var G = new Float32Array(this.G);
  for(var k = 0; k<this.iterations; k++){
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
	  G_Minv_Gt += G[addi] * this.MinvTrace[addi] * G[addi];
	  Gq +=        G[addi] * this.q[addi];
	  GW +=        G[addi] * this.qdot[addi];
	  GMinvf +=    G[addi] * this.MinvTrace[addi] * this.Fext[addi];
	}
	c[l] = 1.0 / (G_Minv_Gt + this.eps); // 1.0 / ( G*Minv*Gt + eps)
	B[l] = ( - this.a * Gq
		 - this.b * GW
		 - this.h * GMinvf);
	precomp[l] = 1;

	if(this.debug){
	  console.log("G_Minv_Gt["+l+"]:",G_Minv_Gt);
	  console.log("Gq["+l+"]:",Gq);
	  console.log("GW["+l+"]:",GW);
	  console.log("GMinvf["+l+"]:",GMinvf);
	}
      }

      var Gulambda = 0.0;

      Gulambda += G[0+l12] * this.vxlambda[body_i]; // previuously calculated lambdas
      Gulambda += G[1+l12] * this.vylambda[body_i];
      Gulambda += G[2+l12] * this.vzlambda[body_i];
      Gulambda += G[3+l12] * this.wxlambda[body_i];
      Gulambda += G[4+l12] * this.wylambda[body_i];
      Gulambda += G[5+l12] * this.wzlambda[body_i];

      Gulambda += G[6+l12] * this.vxlambda[body_j];
      Gulambda += G[7+l12] * this.vylambda[body_j];
      Gulambda += G[8+l12] * this.vzlambda[body_j];
      Gulambda += G[9+l12] * this.wxlambda[body_j];
      Gulambda += G[10+l12] * this.wylambda[body_j];
      Gulambda += G[11+l12] * this.wzlambda[body_j];

      dlambda[l] = c[l] * ( B[l] - Gulambda - this.eps * lambda[l]);
      if(this.debug)
	console.log("dlambda["+l+"]=",dlambda[l]);
      lambda[l] = lambda[l] + dlambda[l];

      // Clamp lambda if out of bounds
      // @todo check if limits are numbers
      if(this.haslower[l] && lambda[l]<this.lower[l]){
	if(this.debug)
	  console.log("hit lower bound for constraint "+l+", truncating "+lambda[l]+" to the bound "+this.lower[l]);
	lambda[l] = this.lower[l];
	dlambda[l] = this.lower[l]-lambda[l];
      }
      if(this.hasupper && lambda[l]>this.upper[l]){
	if(this.debug)
	  console.log("hit upper bound for constraint "+l+", truncating "+lambda[l]+" to the bound "+this.upper[l]);
	lambda[l] = this.upper[l];
	dlambda[l] = this.upper[l]-lambda[l];
      }

      // Add velocity changes to keep track of them
      this.vxlambda[body_i] += dlambda[l] * this.MinvTrace[l12+0] * G[l12+0];
      this.vylambda[body_i] += dlambda[l] * this.MinvTrace[l12+1] * G[l12+1];
      this.vzlambda[body_i] += dlambda[l] * this.MinvTrace[l12+2] * G[l12+2];
      this.wxlambda[body_i] += dlambda[l] * this.MinvTrace[l12+3] * G[l12+3];
      this.wylambda[body_i] += dlambda[l] * this.MinvTrace[l12+4] * G[l12+4];
      this.wzlambda[body_i] += dlambda[l] * this.MinvTrace[l12+5] * G[l12+5];
      this.vxlambda[body_j] += dlambda[l] * this.MinvTrace[l12+6] * G[l12+6];
      this.vylambda[body_j] += dlambda[l] * this.MinvTrace[l12+7] * G[l12+7];
      this.vzlambda[body_j] += dlambda[l] * this.MinvTrace[l12+8] * G[l12+8];
      this.wxlambda[body_j] += dlambda[l] * this.MinvTrace[l12+9] * G[l12+9];
      this.wylambda[body_j] += dlambda[l] * this.MinvTrace[l12+10] * G[l12+10];
      this.wzlambda[body_j] += dlambda[l] * this.MinvTrace[l12+11] * G[l12+11];
    }
  }

  if(this.debug)
    for(var i=0; i<this.vxlambda.length; i++)
      console.log("dv["+i+"]=",
		  this.vxlambda[i],
		  this.vylambda[i],
		  this.vzlambda[i],
		  this.wxlambda[i],
		  this.wylambda[i],
		  this.wzlambda[i]);
};
/*global CANNON:true */

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

/**
 * ContactPoint class
 * @brief A representation of a contact point between two bodies. Should be generated by the Narrowphase
 * @param CANNON.Vec3 r The vector from the center of mass to the contact.
 * @param CANNON.Vec3 n Normal vector, pointing out of the "from" body.
 * @param CANNON.RigidBody from
 * @param CANNON.RigidBody to
 */
CANNON.ContactPoint = function(from,to){
  this.r = new CANNON.Vec3();
  this.n = new CANNON.Vec3();
  this.fromBody = null;
  this.toBody = null;
};/**
 * ContactPoint class
 * @brief A representation of a contact point between two bodies
 */
CANNON.ContactPoint = function(){
  
};/*global CANNON:true */

/**
 * @class CANNON.World
 * @brief The physics world
 */
CANNON.World = function(){

  /// The wall-clock time since simulation start
  this.time = 0.0;

  /// Number of timesteps taken since start
  this.stepnumber = 0;

  /// Spring constant
  this.spook_k = 3000.0;

  /// Stabilization parameter (number of timesteps until stabilization)
  this.spook_d = 3.0;

  /// Default and last timestep sizes
  this.default_dt = 1/60;
  this.last_dt = this.default_dt;

  this.nextId = 0;
  this.gravity = new CANNON.Vec3();
  this.broadphase = null;
  this.bodies = [];

  var th = this;

  /// Contact solver parameters, @see https://www8.cs.umu.se/kurser/5DV058/VT09/lectures/spooknotes.pdf
  this.spook_a = function(h){ return 4.0 / (h * (1 + 4 * th.spook_d)); };
  this.spook_b = (4.0 * this.spook_d) / (1 + 4 * this.spook_d);
  this.spook_eps = function(h){ return 4.0 / (h * h * th.spook_k * (1 + 4 * th.spook_d)); };

  /// The contact solver
  this.solver = new CANNON.Solver(this.spook_a(1.0/60.0),
				  this.spook_b,
				  this.spook_eps(1.0/60.0),
				  this.spook_k,
				  this.spook_d,
				  5,
				  1.0/60.0);

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
 * @fn getContactMaterial
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
 * @fn _addImpulse
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
 * @fn numObjects
 * @memberof CANNON.World
 * @brief Get number of objects in the world.
 * @return int
 */
CANNON.World.prototype.numObjects = function(){
  return this.bodies.length;
};

/**
 * @fn clearCollisionState
 * @memberof CANNON.World
 * @brief Clear the contact state for a body.
 * @param CANNON.RigidBody body
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
 * @fn add
 * @memberof CANNON.World
 * @brief Add a rigid body to the simulation.
 * @param CANNON.RigidBody body
 * @todo If the simulation has not yet started, why recrete and copy arrays for each body? Accumulate in dynamic arrays in this case.
 * @todo Adding an array of bodies should be possible. This would save some loops too
 */
CANNON.World.prototype.add = function(body){
  if(body instanceof CANNON.RigidBody){
    var n = this.numObjects();
    this.bodies.push(body);
    body.id = this.id();
    body.world = this;
    body.position.copy(body.initPosition);
    body.velocity.copy(body.initVelocity);
    body.angularVelocity.copy(body.initAngularVelocity);
    body.quaternion.copy(body.initQuaternion);
    
    // Create collision matrix
    this.collision_matrix = new Int16Array((n+1)*(n+1));
  }
};

CANNON.World.prototype.id = function(){
  return this.nextId++;
};

/**
 * @fn remove
 * @memberof CANNON.World
 * @brief Remove a rigid body from the simulation.
 * @param CANNON.RigidBody body
 */
CANNON.World.prototype.remove = function(body){
  if(body instanceof CANNON.RigidBody){
    body.world = null;
    var n = this.numObjects();
    var bodies = this.bodies;
    for(var i in bodies)
      if(bodies[i].id == body.id)
	bodies.splice(i,1);

    // Reset collision matrix
    this.collision_matrix = new Int16Array((n-1)*(n-1));
  }
};

/**
 * @fn addMaterial
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
 * @fn addContactMaterial
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

/**
 * @fn step
 * @memberof CANNON.World
 * @brief Step the simulation
 * @param float dt
 */
CANNON.World.prototype.step = function(dt){
  var world = this,
  that = this,
  N = this.numObjects(),
  bodies = this.bodies;
  
  if(dt==undefined){
    if(this.last_dt)
      dt = this.last_dt;
    else
      dt = this.default_dt;
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

  /**
   * Keep track of contacts for current and previous timesteps
   * @param int i Body index
   * @param int j Body index
   * @param int which 0 means current, -1 one timestep behind, -2 two behind etc
   * @param int newval New contact status
   */
  function cmatrix(i,j,which,newval){
    // i == column
    // j == row
    if((which==0 && i<j) || // Current uses upper part of the matrix
       (which==-1 && i>j)){ // Previous uses lower part of the matrix
      var temp = j;
      j = i;
      i = temp;
    }
    if(newval===undefined)
      return that.collision_matrix[i+j*that.numObjects()];
    else
      that.collision_matrix[i+j*that.numObjects()] = parseInt(newval);
  }

  // Begin with transferring old contact data to the right place
  for(var i in bodies)
    for(var j=0; j<i; j++){
      cmatrix(i,j,-1, cmatrix(i,j,0));
      cmatrix(i,j,0,0);
    }

  // Add gravity to all objects
  for(var i in bodies){
    var f = bodies[i].force, m = bodies[i].mass;
    f.x += world.gravity.x * m;
    f.y += world.gravity.y * m;
    f.z += world.gravity.z * m;
  }

  // Reset contact solver
  this.solver.reset(N);

  /**
   * Near phase calculation, get the contact point, normal, etc.
   * @param array result The result one will get back with all the contact point information
   * @param Shape si Colliding shape
   * @param Shape sj
   * @param Vec3 xi Position of the center of mass
   * @param Vec3 xj
   * @param Quaternion qi Rotation around the center of mass
   * @param Quaternion qj
   * @todo All collision cases
   * @todo Replace the current nearphase with this function.
   */
  function nearPhase(result,si,sj,xi,xj,qi,qj){
    var swapped = false;
    if(si.type>sj.type){
      var temp;
      temp=sj;   sj=si;   si=temp;
      temp=xj;   xj=xi;   xi=temp;
      temp=qj;   qj=qi;   qi=temp;
      swapped = true;
    }

    /**
     * Make a contact object.
     * @return object
     * @todo Perhaps we should make a Contact class out of this instead...
     */
    function makeResult(){
      return {
	  ri:new CANNON.Vec3(), // Vector from body i center to contact point
	  rj:new CANNON.Vec3(), // Vector from body j center to contact point
	  ni:new CANNON.Vec3()  // Contact normal protruding body i
	};
    }

    /**
     * Swaps the body references in the contact
     * @param object r
     */
    function swapResult(r){
      var temp = CANNON.Vec3();
      temp = r.ri; r.ri = r.rj; r.rj = temp;
      r.ni.negate(r.ni);
    }

    /**
     * Go recursive for compound shapes
     * @param Shape si
     * @param CompoundShape sj
     */
    function recurseCompound(result,si,sj,xi,xj,qi,qj){
      for(var i=0; i<sj.childShapes.length; i++){
	var r = [];
	nearPhase(r,
		  si,
		  sj.childShapes[i],
		  xi,
		  xj.vadd(qj.vmult(sj.childOffsets[i])), // Transform the shape to its local frame
		  qi,
		  qj.mult(sj.childOrientations[i]));
	// Transform back
	for(var j=0; j<r.length; j++){
	  r[j].rj.vadd(qj.vmult(sj.childOffsets[i]),r[j].rj);
	  result.push(r[j]);
	}
      }
    }

    if(si.type==CANNON.Shape.types.SPHERE){
      if(sj.type==CANNON.Shape.types.SPHERE){ // sphere-sphere

	// We will have one contact in this case
	var r = makeResult();

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
	var r = makeResult();

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
	      var r = makeResult();
	      ns.mult(-R,r.ri); // Sphere r
	      ns.copy(r.ni);
	      r.ni.negate(r.ni); // Normal should be out of sphere
	      ns.mult(h).vadd(ns1.mult(dot1)).vadd(ns2.mult(dot2),r.rj); // box
	      result.push(r);
	    }
	  }
	}

	// Check corners
	var rj = new CANNON.Vec3();
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
		var r = makeResult();
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

	// Check edges
	var edgeTangent = new CANNON.Vec3();
	var edgeCenter = new CANNON.Vec3();
	var r = new CANNON.Vec3(); // r = edge center to sphere center
	var orthogonal = new CANNON.Vec3();
	var dist = new CANNON.Vec3();
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
		var res = makeResult();
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

      } else if(sj.type==CANNON.Shape.types.COMPOUND){ // sphere-compound
	recurseCompound(result,si,sj,xi,xj,qi,qj);
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
	  var r = makeResult();
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
	recurseCompound(result,si,sj,xi,xj,qi,qj);
      }
      
    } else if(si.type==CANNON.Shape.types.BOX){
      
      if(sj.type==CANNON.Shape.types.BOX){ // box-box
	throw "box-box collision not implemented yet";
      }
      
      if(sj.type==CANNON.Shape.types.COMPOUND){ // box-compound
	recurseCompound(result,si,sj,xi,xj,qi,qj);
	
      }
      
    } else if(si.type==CANNON.Shape.types.COMPOUND){
      
      if(sj.type==CANNON.Shape.types.COMPOUND){ // compound-compound
	recurseCompound(result,si,sj,xi,xj,qi,qj);
	
      }
    }
    
    // Swap back if we swapped bodies in the beginning
    for(var i=0; swapped && i<result.length; i++)
      swapResult(result[i]);
  }

  // Loop over all collisions
  this.contacts = {}; // Preliminary. contacts["i,j"]=>contact array
  var temp = this.temp;
  for(var k=0; k<p1.length; k++){

    // Get current collision indeces
    var i = p1[k],
      j = p2[k],
      bi = bodies[i],
      bj = bodies[j];
    
    // Check last step stats
    var lastCollisionState = cmatrix(i,j,-1);
    
    // Get collision properties
    var mu = 0.3, e = 0.2;
    var cm = this.getContactMaterial(bi.material,
				     bj.material);
    if(cm){
      mu = cm.friction;
      e = cm.restitution;
    }
    
    // Get contacts
    var contacts = [];
    nearPhase(contacts,
	      bi.shape,
	      bj.shape,
	      bi.position,//new CANNON.Vec3(x[i],y[i],z[i]),
	      bj.position,//new CANNON.Vec3(x[j],y[j],z[j]),
	      bi.quaternion,//new CANNON.Quaternion(qx[i],qy[i],qz[i],qw[i]),
	      bj.quaternion//new CANNON.Quaternion(qx[j],qy[j],qz[j],qw[j])
	      );
    this.contacts[i+","+j] = contacts;

    // Add contact constraint(s)
    for(var ci = 0; ci<contacts.length; ci++){
      var c = contacts[ci];
      
      // g = ( xj + rj - xi - ri ) .dot ( ni )
      var gvec = temp.gvec;
      gvec.set(bj.position.x + c.rj.x - bi.position.x - c.ri.x,
	       bj.position.y + c.rj.y - bi.position.y - c.ri.y,
	       bj.position.z + c.rj.z - bi.position.z - c.ri.z);
      var g = gvec.dot(c.ni); // Gap, negative if penetration

      // Action if penetration
      if(g<0.0){
	var vi = bi.velocity; //temp.vi; vi.set(vx[i],vy[i],vz[i]);
	var wi = bi.angularVelocity; //temp.wi; wi.set(wx[i],wy[i],wz[i]);
	var vj = bj.velocity;//temp.vj; vj.set(vx[j],vy[j],vz[j]);
	var wj = bj.angularVelocity; //temp.wj; wj.set(wx[j],wy[j],wz[j]);

	var n = c.ni;
	var tangents = [temp.t1, temp.t2];
	n.tangents(tangents[0],tangents[1]);

	var v_contact_i = vi.vadd(wi.cross(c.ri));
	var v_contact_j = vj.vadd(wj.cross(c.rj));
	var u_rel = v_contact_j.vsub(v_contact_i);
	var w_rel = wj.cross(c.rj).vsub(wi.cross(c.ri));

	var u = (vj.vsub(vi)); // Contact velo
	var uw = (c.rj.cross(wj)).vsub(c.ri.cross(wi));
	u.vsub(uw,u);

	// Get mass properties
	var iMi = bi.invMass; //world.invm[i];
	var iMj = bj.invMass; //world.invm[j];
	var iIxi = bi.invInertia.x;//world.inertiax[i] > 0 ? 1.0/world.inertiax[i] : 0;
	var iIyi = bi.invInertia.y;//world.inertiay[i] > 0 ? 1.0/world.inertiay[i] : 0;
	var iIzi = bi.invInertia.z;//world.inertiaz[i] > 0 ? 1.0/world.inertiaz[i] : 0;
	var iIxj = bj.invInertia.x;//world.inertiax[j] > 0 ? 1.0/world.inertiax[j] : 0;
	var iIyj = bj.invInertia.y;//world.inertiay[j] > 0 ? 1.0/world.inertiay[j] : 0;
	var iIzj = bj.invInertia.z;//world.inertiaz[j] > 0 ? 1.0/world.inertiaz[j] : 0;

	// Add contact constraint
	var rixn = temp.rixn;
	var rjxn = temp.rjxn;
	c.ri.cross(n,rixn);
	c.rj.cross(n,rjxn);

	var un_rel = n.mult(u_rel.dot(n));
	var u_rixn_rel = rixn.unit().mult(w_rel.dot(rixn.unit()));
	var u_rjxn_rel = rjxn.unit().mult(-w_rel.dot(rjxn.unit()));

	var gn = c.ni.mult(g);

	this.solver
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
			  bi.tau.x,bi.tau.y,bi.tau.z,
			  bj.force.x,bj.force.y,bj.force.z,
			  bj.tau.x,bj.tau.y,bj.tau.z],
			 0,
			 'inf',
			 i,
			 j);

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
      }
    }
  }

  if(this.solver.n){
    this.solver.solve();

    // Apply constraint velocities
    for(var i in bodies){
      var b = bodies[i];
      b.velocity.x += this.solver.vxlambda[i];
      b.velocity.y += this.solver.vylambda[i];
      b.velocity.z += this.solver.vzlambda[i];
      b.angularVelocity.x += this.solver.wxlambda[i];
      b.angularVelocity.y += this.solver.wylambda[i];
      b.angularVelocity.z += this.solver.wzlambda[i];
    }
  }

  // Apply damping
  for(var i in bodies){
    var ld = 1.0 - bodies[i].linearDamping;
    var ad = 1.0 - bodies[i].angularDamping;
    bodies[i].velocity.mult(ld,bodies[i].velocity);
    bodies[i].angularVelocity.mult(ad,bodies[i].angularVelocity);
  }

  // Leap frog
  // vnew = v + h*f/m
  // xnew = x + h*vnew
  var q = temp.step_q; 
  var w = temp.step_w;
  var wq = temp.step_wq;
  for(var i in bodies){
    var b = bodies[i];
    if(!b.fixed){
      
      b.velocity.x += b.force.x * b.invMass * dt;
      b.velocity.y += b.force.y * b.invMass * dt;
      b.velocity.z += b.force.z * b.invMass * dt;

      b.angularVelocity.x += b.tau.x * b.invInertia.x * dt;
      b.angularVelocity.y += b.tau.y * b.invInertia.y * dt;
      b.angularVelocity.z += b.tau.z * b.invInertia.z * dt;

      // Use new velocity  - leap frog
      
      b.position.x += b.velocity.x * dt;
      b.position.y += b.velocity.y * dt;
      b.position.z += b.velocity.z * dt;

      w.set(b.angularVelocity.x,
	    b.angularVelocity.y,
	    b.angularVelocity.z,
	    0);
      w.mult(b.quaternion,wq);

      b.quaternion.x += dt * 0.5 * wq.x;
      b.quaternion.y += dt * 0.5 * wq.y;
      b.quaternion.z += dt * 0.5 * wq.z;
      b.quaternion.w += dt * 0.5 * wq.w;
      b.quaternion.normalize();
    }
    b.force.set(0,0,0);
    b.tau.set(0,0,0);
  }

  // Update world time
  world.time += dt;
  world.stepnumber += 1;
};

if (typeof module !== 'undefined') {
	// export for node
	module.exports = CANNON;
} else {
	// assign to window
	this.CANNON = CANNON;
}

}).apply(this);