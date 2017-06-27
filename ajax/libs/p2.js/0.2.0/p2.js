/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013 p2.js authors
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function(e){if("function"==typeof bootstrap)bootstrap("p2",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeP2=e}else"undefined"!=typeof window?window.p2=e():self.p2=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
// Export p2 classes
module.exports = {
    Body :                          require('./objects/Body'),
    Broadphase :                    require('./collision/Broadphase'),
    Capsule :                       require('./shapes/Capsule'),
    Circle :                        require('./shapes/Circle'),
    Constraint :                    require('./constraints/Constraint'),
    ContactEquation :               require('./constraints/ContactEquation'),
    ContactMaterial :               require('./material/ContactMaterial'),
    Convex :                        require('./shapes/Convex'),
    DistanceConstraint :            require('./constraints/DistanceConstraint'),
    Equation :                      require('./constraints/Equation'),
    EventEmitter :                  require('./events/EventEmitter'),
    FrictionEquation :              require('./constraints/FrictionEquation'),
    GridBroadphase :                require('./collision/GridBroadphase'),
    GSSolver :                      require('./solver/GSSolver'),
    Island :                        require('./solver/IslandSolver'),
    IslandSolver :                  require('./solver/IslandSolver'),
    Line :                          require('./shapes/Line'),
    Material :                      require('./material/Material'),
    NaiveBroadphase :               require('./collision/NaiveBroadphase'),
    Particle :                      require('./shapes/Particle'),
    Plane :                         require('./shapes/Plane'),
    PointToPointConstraint :        require('./constraints/PointToPointConstraint'),
    PrismaticConstraint :           require('./constraints/PrismaticConstraint'),
    Rectangle :                     require('./shapes/Rectangle'),
    RotationalVelocityEquation :    require('./constraints/RotationalVelocityEquation'),
    SAP1DBroadphase :               require('./collision/SAP1DBroadphase'),
    Shape :                         require('./shapes/Shape'),
    Solver :                        require('./solver/Solver'),
    Spring :                        require('./objects/Spring'),
    World :                         require('./world/World'),
    QuadTree :                      require('./collision/QuadTree').QuadTree,
    vec2 :                          require('./math/vec2'),
    version :                       require('../package.json').version,
};

},{"../package.json":2,"./objects/Body":3,"./collision/Broadphase":4,"./shapes/Capsule":5,"./shapes/Circle":6,"./constraints/Constraint":7,"./constraints/ContactEquation":8,"./material/ContactMaterial":9,"./shapes/Convex":10,"./constraints/DistanceConstraint":11,"./constraints/Equation":12,"./events/EventEmitter":13,"./constraints/FrictionEquation":14,"./collision/GridBroadphase":15,"./solver/GSSolver":16,"./solver/IslandSolver":17,"./shapes/Line":18,"./material/Material":19,"./collision/NaiveBroadphase":20,"./shapes/Particle":21,"./shapes/Plane":22,"./constraints/PointToPointConstraint":23,"./constraints/PrismaticConstraint":24,"./shapes/Rectangle":25,"./constraints/RotationalVelocityEquation":26,"./collision/SAP1DBroadphase":27,"./shapes/Shape":28,"./solver/Solver":29,"./objects/Spring":30,"./world/World":31,"./collision/QuadTree":32,"./math/vec2":33}],2:[function(require,module,exports){
module.exports={
    "name": "p2",
    "version": "0.2.0",
    "description": "A JavaScript 2D physics engine.",
    "author": "Stefan Hedman <schteppe@gmail.com> (http://steffe.se)",
    "keywords": [
        "p2.js",
        "p2",
        "physics",
        "engine",
        "2d"
    ],
    "main": "./src/p2.js",
    "engines": {
        "node": "*"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/schteppe/p2.js.git"
    },
    "bugs": {
        "url": "https://github.com/schteppe/p2.js/issues"
    },
    "licenses" : [
        {
            "type" : "MIT"
        }
    ],
    "devDependencies" : {
        "jshint"    : "latest",
        "nodeunit"  : "latest",
        "grunt": "~0.4.0",
        "grunt-contrib-jshint": "~0.1.1",
        "grunt-contrib-nodeunit": "~0.1.2",
        "grunt-contrib-concat": "~0.1.3",
        "grunt-contrib-uglify": "*",
        "grunt-browserify" : "*",
        "browserify":"*"
    },
    "dependencies" : {
        "gl-matrix":"2.0.0"
    }
}

},{}],7:[function(require,module,exports){
module.exports = Constraint;

/**
 * Base constraint class.
 *
 * @class Constraint
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 */
function Constraint(bodyA,bodyB){

    /**
     * Equations to be solved in this constraint
     * @property equations
     * @type {Array}
     */
    this.equations = [];

    /**
     * First body participating in the constraint.
     * @property bodyA
     * @type {Body}
     */
    this.bodyA = bodyA;

    /**
     * Second body participating in the constraint.
     * @property bodyB
     * @type {Body}
     */
    this.bodyB = bodyB;
};

/**
 * To be implemented by subclasses. Should update the internal constraint parameters.
 * @method update
 */
/*Constraint.prototype.update = function(){
    throw new Error("method update() not implmemented in this Constraint subclass!");
};*/

},{}],9:[function(require,module,exports){
module.exports = ContactMaterial;

var idCounter = 0;

/**
 * Defines a physics material.
 * @class ContactMaterial
 * @constructor
 * @param {Material} materialA
 * @param {Material} materialB
 * @param {Object}   [options]
 * @param {Number}   options.friction
 * @param {Number}   options.restitution
 * @author schteppe
 */
function ContactMaterial(materialA, materialB, options){
    options = options || {};

    /**
     * The contact material identifier
     * @property id
     * @type {Number}
     */
    this.id = idCounter++;

    /**
     * First material participating in the contact material
     * @property materialA
     * @type {Material}
     */
    this.materialA = materialA;

    /**
     * Second material participating in the contact material
     * @property materialB
     * @type {Material}
     */
    this.materialB = materialB;

    /**
     * Friction to use in the contact of these two materials
     * @property friction
     * @type {Number}
     */
    this.friction    =  typeof(options.friction)    !== "undefined" ?   Number(options.friction)    : 0.3;

    /**
     * Restitution to use in the contact of these two materials
     * @property restitution
     * @type {Number}
     */
    this.restitution =  typeof(options.restitution) !== "undefined" ?   Number(options.restitution) : 0.3;

    /**
     * Stiffness of the resulting ContactEquation that this ContactMaterial generate
     * @property stiffness
     * @type {Number}
     */
    this.stiffness =            typeof(options.stiffness)           !== "undefined" ?   Number(options.stiffness)   : 1e7;

    /**
     * Relaxation of the resulting ContactEquation that this ContactMaterial generate
     * @property relaxation
     * @type {Number}
     */
    this.relaxation =           typeof(options.relaxation)          !== "undefined" ?   Number(options.relaxation)  : 3;

    /**
     * Stiffness of the resulting FrictionEquation that this ContactMaterial generate
     * @property frictionStiffness
     * @type {Number}
     */
    this.frictionStiffness =    typeof(options.frictionStiffness)   !== "undefined" ?   Number(options.frictionStiffness)   : 1e7;

    /**
     * Relaxation of the resulting FrictionEquation that this ContactMaterial generate
     * @property frictionRelaxation
     * @type {Number}
     */
    this.frictionRelaxation =   typeof(options.frictionRelaxation)  !== "undefined" ?   Number(options.frictionRelaxation)  : 3;
};

},{}],12:[function(require,module,exports){
module.exports = Equation;

/**
 * Base class for constraint equations.
 * @class Equation
 * @constructor
 * @param {Body} bi First body participating in the equation
 * @param {Body} bj Second body participating in the equation
 * @param {number} minForce Minimum force to apply. Default: -1e6
 * @param {number} maxForce Maximum force to apply. Default: 1e6
 */
function Equation(bi,bj,minForce,maxForce){

    /**
     * Minimum force to apply when solving
     * @property minForce
     * @type {Number}
     */
    this.minForce = typeof(minForce)=="undefined" ? -1e6 : minForce;

    /**
     * Max force to apply when solving
     * @property maxForce
     * @type {Number}
     */
    this.maxForce = typeof(maxForce)=="undefined" ? 1e6 : maxForce;

    /**
     * First body participating in the constraint
     * @property bi
     * @type {Body}
     */
    this.bi = bi;

    /**
     * Second body participating in the constraint
     * @property bj
     * @type {Body}
     */
    this.bj = bj;

    /**
     * The stiffness of this equation. Typically chosen to a large number (~1e7), but can be chosen somewhat freely to get a stable simulation.
     * @property stiffness
     * @type {Number}
     */
    this.stiffness = 1e6;

    /**
     * The number of time steps needed to stabilize the constraint equation. Typically between 3 and 5 time steps.
     * @property relaxation
     * @type {Number}
     */
    this.relaxation = 4;

    this.a = 0;
    this.b = 0;
    this.eps = 0;
    this.h = 0;
    this.updateSpookParams(1/60);
};
Equation.prototype.constructor = Equation;

/**
 * Update SPOOK parameters .a, .b and .eps according to the given time step. See equations 9, 10 and 11 in the <a href="http://www8.cs.umu.se/kurser/5DV058/VT09/lectures/spooknotes.pdf">SPOOK notes</a>.
 * @method updateSpookParams
 * @param  {number} timeStep
 */
Equation.prototype.updateSpookParams = function(timeStep){
    var k = this.stiffness,
        d = this.relaxation,
        h = timeStep;
    this.a = 4.0 / (h * (1 + 4 * d));
    this.b = (4.0 * d) / (1 + 4 * d);
    this.eps = 4.0 / (h * h * k * (1 + 4 * d));
    this.h = timeStep;
};

},{}],13:[function(require,module,exports){
var EventEmitter = function () {}

module.exports = EventEmitter;

EventEmitter.prototype = {
    constructor: EventEmitter,
    on: function ( type, listener ) {
        if ( this._listeners === undefined ) this._listeners = {};
        var listeners = this._listeners;
        if ( listeners[ type ] === undefined ) {
            listeners[ type ] = [];
        }
        if ( listeners[ type ].indexOf( listener ) === - 1 ) {
            listeners[ type ].push( listener );
        }
        return this;
    },
    has: function ( type, listener ) {
        if ( this._listeners === undefined ) return false;
        var listeners = this._listeners;
        if ( listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1 ) {
            return true;
        }
        return false;
    },
    off: function ( type, listener ) {
        if ( this._listeners === undefined ) return;
        var listeners = this._listeners;
        var index = listeners[ type ].indexOf( listener );
        if ( index !== - 1 ) {
            listeners[ type ].splice( index, 1 );
        }
    },
    emit: function ( event ) {
        if ( this._listeners === undefined ) return;
        var listeners = this._listeners;
        var listenerArray = listeners[ event.type ];
        if ( listenerArray !== undefined ) {
            event.target = this;
            for ( var i = 0, l = listenerArray.length; i < l; i ++ ) {
                listenerArray[ i ].call( this, event );
            }
        }
        return this;
    }
};

},{}],19:[function(require,module,exports){
module.exports = Material;

var idCounter = 0;

/**
 * Defines a physics material.
 * @class Material
 * @constructor
 * @param string name
 * @author schteppe
 */
function Material(){
    /**
     * The material identifier
     * @property id
     * @type {Number}
     */
    this.id = idCounter++;
};

},{}],28:[function(require,module,exports){
module.exports = Shape;

/**
 * Base class for shapes.
 * @class Shape
 * @constructor
 */
function Shape(type){
    this.type = type;
    this.boundingRadius = 0;

    /**
     * Collision group that this shape belongs to (bit mask). See <a href="http://www.aurelienribon.com/blog/2011/07/box2d-tutorial-collision-filtering/">this tutorial</a>.
     * @property collisionGroup
     * @type {Number}
     * @example
     *     if(shapeA.collisionGroup & shapeB.collisionMask)!=0 && (shapeB.collisionGroup & shapeA.collisionMask)!=0){
     *         // The shapes will collide
     *     }
     */
    this.collisionGroup = 1;

    /**
     * Collision mask of this shape.
     * @property collisionMask
     * @type {Number}
     */
    this.collisionMask =  1;
    if(type) this.updateBoundingRadius();

    /**
     * Material to use in collisions for this Shape
     * @property material
     * @type {Material} Either a Material instance or null.
     */
    this.material = null;
};

Shape.CIRCLE =      1;
Shape.PARTICLE =    2;
Shape.PLANE =       4;
Shape.CONVEX =      8;
Shape.LINE =        16;
Shape.RECTANGLE =   32;
Shape.CAPSULE =     64;

/**
 * Should return the moment of inertia around the Z axis of the body given the total mass. See <a href="http://en.wikipedia.org/wiki/List_of_moments_of_inertia">Wikipedia's list of moments of inertia</a>.
 * @method computeMomentOfInertia
 * @param  {Number} mass
 * @return {Number} If the inertia is infinity or if the object simply isn't possible to rotate, return 0.
 */
Shape.prototype.computeMomentOfInertia = function(mass){
    throw new Error("Shape.computeMomentOfInertia is not implemented in this Shape...");
};

Shape.prototype.updateBoundingRadius = function(){
    throw new Error("Shape.updateBoundingRadius is not implemented in this Shape...");
};

},{}],29:[function(require,module,exports){
module.exports = Solver;

/**
 * Base class for constraint solvers.
 * @class Solver
 * @constructor
 */
function Solver(){

    /**
     * Current equations in the solver.
     *
     * @property equations
     * @type {Array}
     */
    this.equations = [];
};

Solver.prototype.solve = function(dt,world){
    throw new Error("Solver.solve should be implemented by subclasses!");
};

/**
 * Add an equation to be solved.
 *
 * @method addEquation
 * @param {Equation} eq
 */
Solver.prototype.addEquation = function(eq){
    this.equations.push(eq);
};

/**
 * Remove an equation.
 *
 * @method removeEquation
 * @param {Equation} eq
 */
Solver.prototype.removeEquation = function(eq){
    var i = this.equations.indexOf(eq);
    if(i!=-1)
        this.equations.splice(i,1);
};

/**
 * Remove all currently added equations.
 *
 * @method removeAllEquations
 */
Solver.prototype.removeAllEquations = function(){
    this.equations = [];
};


},{}],3:[function(require,module,exports){
var vec2 = require('../math/vec2');

module.exports = Body;

var zero = vec2.fromValues(0,0);

/**
 * A physics body.
 *
 * @class Body
 * @constructor
 * @param {Object}          [options]
 * @param {Shape}           options.shape           Used for collision detection. If absent the body will not collide.
 * @param {number}          options.mass            A number >= 0. If zero, the body becomes static. Defaults to static [0].
 * @param {Float32Array}    options.position
 * @param {Float32Array}    options.velocity
 * @param {number}          options.angle
 * @param {number}          options.angularVelocity
 * @param {Float32Array}    options.force
 * @param {number}          options.angularForce
 * @todo Should not take mass as an argument to Body, but as density to each Shape
 */
function Body(options){
    options = options || {};

    /**
     * The body identifyer
     * @property id
     * @type {Number}
     */
    this.id = ++Body._idCounter;

    /**
     * The shapes of the body.
     * @property shapes
     * @type {Array}
     */
    this.shapes = [];

    /**
     * The local shape offsets, relative to the body center of mass.
     * @property shapeOffsets
     * @type {Array}
     */
    this.shapeOffsets = [];

    /**
     * The body-local shape angle transformations.
     * @property shapeAngles
     * @type {Array}
     */
    this.shapeAngles = [];

    /**
     * The mass of the body.
     * @property mass
     * @type {number}
     */
    this.mass = options.mass || 0;

    /**
     * The inverse mass of the body.
     * @property invMass
     * @type {number}
     */
    this.invMass = 0;

    /**
     * The inertia of the body around the Z axis.
     * @property inertia
     * @type {number}
     */
    this.inertia = 0;

    /**
     * The inverse inertia of the body.
     * @property invInertia
     * @type {number}
     */
    this.invInertia = 0;

    this.updateMassProperties();

    /**
     * The position of the body
     * @property position
     * @type {Float32Array}
     */
    this.position = vec2.fromValues(0,0);
    if(options.position) vec2.copy(this.position, options.position);

    /**
     * The velocity of the body
     * @property velocity
     * @type {Float32Array}
     */
    this.velocity = vec2.fromValues(0,0);
    if(options.velocity) vec2.copy(this.velocity, options.velocity);

    /**
     * Constraint velocity that was added to the body during the last step.
     * @property vlambda
     * @type {Float32Array}
     */
    this.vlambda = vec2.fromValues(0,0);

    /**
     * Angular constraint velocity that was added to the body during the last step.
     * @property wlambda
     * @type {Float32Array}
     */
    this.wlambda = 0;

    /**
     * The angle of the body
     * @property angle
     * @type {number}
     */
    this.angle = options.angle || 0;

    /**
     * The angular velocity of the body
     * @property angularVelocity
     * @type {number}
     */
    this.angularVelocity = options.angularVelocity || 0;

    /**
     * The force acting on the body
     * @property force
     * @type {Float32Array}
     */
    this.force = vec2.create();
    if(options.force) vec2.copy(this.force, options.force);

    /**
     * The angular force acting on the body
     * @property angularForce
     * @type {number}
     */
    this.angularForce = options.angularForce || 0;

    /**
     * The type of motion this body has. Should be one of: Body.STATIC, Body.DYNAMIC and Body.KINEMATIC.
     * @property motionState
     * @type {number}
     */
    this.motionState = this.mass == 0 ? Body.STATIC : Body.DYNAMIC;

    /**
     * Bounding box max point, in world coordinates.
     * @property aabbMin
     * @type {Array}
     */
    this.boundingRadius = 0;
};

Body._idCounter = 0;

Body.prototype.updateBoundingRadius = function(){
    var shapes = this.shapes,
        shapeOffsets = this.shapeOffsets,
        N = shapes.length,
        radius = 0;

    for(var i=0; i!==N; i++){
        var shape = shapes[i],
            offset = vec2.length(shapeOffsets[i] || zero),
            r = shape.boundingRadius;
        if(offset + r > radius)
            radius = offset + r;
    }

    this.boundingRadius = radius;
};

/**
 * Add a shape to the body
 * @method addShape
 * @param  {Shape} shape
 * @param  {Array} offset
 * @param  {Number} angle
 */
Body.prototype.addShape = function(shape,offset,angle){
    this.shapes      .push(shape);
    this.shapeOffsets.push(offset);
    this.shapeAngles .push(angle);
    this.updateMassProperties();
    this.updateBoundingRadius();
};

/**
 * Updates .inertia, .invMass, .invInertia for this Body. Should be called when changing the structure of the Body.
 * @method updateMassProperties
 */
Body.prototype.updateMassProperties = function(){
    var shapes = this.shapes,
        N = shapes.length,
        m = this.mass / N,
        I = 0;

    for(var i=0; i<N; i++){
        var shape = shapes[i],
            r2 = vec2.squaredLength(this.shapeOffsets[i] || zero),
            Icm = shape.computeMomentOfInertia(m);
        I += Icm + m*r2;
    }

    this.inertia = I;

    // Inverse mass properties are easy
    this.invMass = this.mass > 0 ? 1/this.mass : 0;
    this.invInertia = I>0 ? 1/I : 0;
};

/**
 * Apply force to a world point. This could for example be a point on the RigidBody surface. Applying force this way will add to Body.force and Body.angularForce.
 * @method applyForce
 * @param {Float32Array} force The force to add.
 * @param {Float32Array} worldPoint A world point to apply the force on.
 */
var Body_applyForce_r = vec2.create();
Body.prototype.applyForce = function(force,worldPoint){
    // Compute point position relative to the body center
    var r = Body_applyForce_r;
    vec2.sub(r,worldPoint,this.position);

    // Add linear force
    vec2.add(this.force,this.force,force);

    // Compute produced rotational force
    var rotForce = vec2.crossLength(r,force);

    // Add rotational force
    this.angularForce += rotForce;
};

/**
 * Transform a world point to local body frame.
 * @method toLocalFrame
 * @param  {Array} out          The vector to store the result in
 * @param  {Array} worldPoint   The input world vector
 */
Body.prototype.toLocalFrame = function(out, worldPoint){
    vec2.toLocalFrame(out, worldPoint, this.position, this.angle);
};

/**
 * Transform a local point to world frame.
 * @method toWorldFrame
 * @param  {Array} out          The vector to store the result in
 * @param  {Array} localPoint   The input local vector
 */
Body.prototype.toWorldFrame = function(out, localPoint){
    vec2.toGlobalFrame(out, localPoint, this.position, this.angle);
};

/**
 * Dynamic body.
 * @property DYNAMIC
 * @type {Number}
 * @static
 */
Body.DYNAMIC = 1;

/**
 * Static body.
 * @property STATIC
 * @type {Number}
 * @static
 */
Body.STATIC = 2;

/**
 * Kinematic body.
 * @property KINEMATIC
 * @type {Number}
 * @static
 */
Body.KINEMATIC = 4;

},{"../math/vec2":33}],4:[function(require,module,exports){
var vec2 = require('../math/vec2')
,   Nearphase = require('./Nearphase')
,   Shape = require('./../shapes/Shape')

module.exports = Broadphase;

/**
 * Base class for broadphase implementations.
 * @class Broadphase
 * @constructor
 */
function Broadphase(){

};

/**
 * Get all potential intersecting body pairs.
 * @method getCollisionPairs
 * @param  {World} world The world to search in.
 * @return {Array} An array of the bodies, ordered in pairs. Example: A result of [a,b,c,d] means that the potential pairs are: (a,b), (c,d).
 */
Broadphase.prototype.getCollisionPairs = function(world){
    throw new Error("getCollisionPairs must be implemented in a subclass!");
};

// Temp things
var dist = vec2.create(),
    worldNormal = vec2.create(),
    yAxis = vec2.fromValues(0,1);

/**
 * Check whether the bounding radius of two bodies overlap.
 * @method  boundingRadiusCheck
 * @param  {Body} bodyA
 * @param  {Body} bodyB
 * @return {Boolean}
 */
Broadphase.boundingRadiusCheck = function(bodyA, bodyB){
    vec2.sub(dist, bodyA.position, bodyB.position);
    var d2 = vec2.squaredLength(dist),
        r = bodyA.boundingRadius + bodyB.boundingRadius;
    return d2 <= r*r;
};

},{"../math/vec2":33,"./Nearphase":34,"./../shapes/Shape":28}],5:[function(require,module,exports){
var Shape = require('./Shape')
,   vec2 = require('../math/vec2')

module.exports = Capsule;

/**
 * Capsule shape class.
 * @class Capsule
 * @constructor
 * @extends {Shape}
 * @param {Number} length The distance between the end points
 * @param {Number} radius Radius of the capsule
 */
function Capsule(length,radius){
    this.length = length || 1;
    this.radius = radius || 1;

    Shape.call(this,Shape.CAPSULE);
};
Capsule.prototype = new Shape();

/**
 * Compute the mass moment of inertia of the Capsule.
 * @method conputeMomentOfInertia
 * @param  {Number} mass
 * @return {Number}
 * @todo
 */
Capsule.prototype.computeMomentOfInertia = function(mass){
    // Approximate with rectangle
    var r = this.radius,
        w = this.length + r, // 2*r is too much, 0 is too little
        h = r*2;
    return mass * (h*h + w*w) / 12;
};

Capsule.prototype.updateBoundingRadius = function(){
    this.boundingRadius = this.radius + this.length/2;
};

},{"./Shape":28,"../math/vec2":33}],6:[function(require,module,exports){
var Shape = require('./Shape');

module.exports = Circle;

/**
 * Circle shape class.
 * @class Circle
 * @extends {Shape}
 * @constructor
 * @param {number} radius
 */
function Circle(radius){

    /**
     * The radius of the circle.
     * @property radius
     * @type {number}
     */
    this.radius = radius || 1;

    Shape.call(this,Shape.CIRCLE);
};
Circle.prototype = new Shape();
Circle.prototype.computeMomentOfInertia = function(mass){
    var r = this.radius;
    return mass * r * r / 2;
};

Circle.prototype.updateBoundingRadius = function(){
    this.boundingRadius = this.radius;
};

},{"./Shape":28}],8:[function(require,module,exports){
var Equation = require("./Equation"),
    vec2 = require('../math/vec2'),
    mat2 = require('../math/mat2');

module.exports = ContactEquation;

/**
 * Non-penetration constraint equation.
 *
 * @class ContactEquation
 * @constructor
 * @extends Equation
 * @param {Body} bi
 * @param {Body} bj
 */
function ContactEquation(bi,bj){
    Equation.call(this,bi,bj,0,1e6);
    this.penetration = 0.0;
    this.ri = vec2.create();
    this.penetrationVec = vec2.create();
    this.rj = vec2.create();
    this.ni = vec2.create();
    this.rixn = vec2.create();
    this.rjxn = vec2.create();
    this.rixw = vec2.create();
    this.rjxw = vec2.create();
    this.relVel = vec2.create();
    this.relForce = vec2.create();
};
ContactEquation.prototype = new Equation();
ContactEquation.prototype.constructor = ContactEquation;
ContactEquation.prototype.computeB = function(a,b,h){
    var bi = this.bi,
        bj = this.bj,
        ri = this.ri,
        rj = this.rj,
        xi = bi.position,
        xj = bj.position;

    var vi = bi.velocity,
        wi = bi.angularVelocity,
        fi = bi.force,
        taui = bi.angularForce;

    var vj = bj.velocity,
        wj = bj.angularVelocity,
        fj = bj.force,
        tauj = bj.angularForce;

    var relVel = this.relVel,
        relForce = this.relForce,
        penetrationVec = this.penetrationVec,
        invMassi = bi.invMass,
        invMassj = bj.invMass,
        invIi = bi.invInertia,
        invIj = bj.invInertia,
        n = this.ni;

    // Caluclate cross products
    var rixn = this.rixn = vec2.crossLength(ri,n);
    var rjxn = this.rjxn = vec2.crossLength(rj,n);

    // Calculate q = xj+rj -(xi+ri) i.e. the penetration vector
    vec2.set(penetrationVec,0,0);
    vec2.add(penetrationVec,xj,rj);
    vec2.sub(penetrationVec,penetrationVec,xi);
    vec2.sub(penetrationVec,penetrationVec,ri);

    var Gq = vec2.dot(n,penetrationVec);

    // Compute iteration
    var GW = vec2.dot(vj,n) - vec2.dot(vi,n) + wj * rjxn - wi * rixn;
    var GiMf = vec2.dot(fj,n)*invMassj - vec2.dot(fi,n)*invMassi + invIj*tauj*rjxn - invIi*taui*rixn;

    var B = - Gq * a - GW * b - h*GiMf;

    return B;
};

// Compute C = GMG+eps in the SPOOK equation
var computeC_tmp1 = vec2.create(),
    tmpMat1 = mat2.create(),
    tmpMat2 = mat2.create();
ContactEquation.prototype.computeC = function(eps){
    var bi = this.bi,
        bj = this.bj,
        n = this.ni,
        rixn = this.rixn,
        rjxn = this.rjxn,
        tmp = computeC_tmp1,
        imMat1 = tmpMat1,
        imMat2 = tmpMat2;

    mat2.identity(imMat1);
    mat2.identity(imMat2);
    imMat1[0] = imMat1[3] = bi.invMass;
    imMat2[0] = imMat2[3] = bj.invMass;

    var C = vec2.dot(n,vec2.transformMat2(tmp,n,imMat1)) + vec2.dot(n,vec2.transformMat2(tmp,n,imMat2)) + eps;
    //var C = bi.invMass + bj.invMass + eps;

    C += bi.invInertia * rixn * rixn;
    C += bj.invInertia * rjxn * rjxn;

    return C;
};
var computeGWlambda_ulambda = vec2.create();
ContactEquation.prototype.computeGWlambda = function(){
    var bi = this.bi;
    var bj = this.bj;
    var ulambda = computeGWlambda_ulambda;

    var GWlambda = 0.0;

    GWlambda -= vec2.dot(this.ni, bi.vlambda);
    GWlambda -= bi.wlambda * this.rixn;
    GWlambda += vec2.dot(this.ni, bj.vlambda);
    GWlambda += bj.wlambda * this.rjxn;

    return GWlambda;
};

var addToWlambda_temp = vec2.create();
ContactEquation.prototype.addToWlambda = function(deltalambda){
    var bi = this.bi,
        bj = this.bj,
        rixn = this.rixn,
        rjxn = this.rjxn,
        n = this.ni,
        temp = addToWlambda_temp,
        imMat1 = tmpMat1,
        imMat2 = tmpMat2;

    mat2.identity(imMat1);
    mat2.identity(imMat2);
    imMat1[0] = imMat1[3] = bi.invMass;
    imMat2[0] = imMat2[3] = bj.invMass;

    // Add to linear velocity
    //vec2.scale(temp,n,-bi.invMass*deltalambda);
    vec2.scale(temp,vec2.transformMat2(temp,n,imMat1),-deltalambda);
    vec2.add( bi.vlambda,bi.vlambda, temp );

    //vec2.scale(temp,n,bj.invMass*deltalambda);
    vec2.scale(temp,vec2.transformMat2(temp,n,imMat2),deltalambda);
    vec2.add( bj.vlambda,bj.vlambda, temp);

    // Add to angular velocity
    bi.wlambda -= bi.invInertia * rixn * deltalambda;
    bj.wlambda += bj.invInertia * rjxn * deltalambda;
};


},{"./Equation":12,"../math/vec2":33,"../math/mat2":35}],10:[function(require,module,exports){
var Shape = require('./Shape')
,   vec2 = require('../math/vec2')
,   polyk = require('../math/polyk')

module.exports = Convex;

/**
 * Convex shape class.
 * @class Convex
 * @constructor
 * @extends {Shape}
 * @param {Array} vertices An array of Float32Array vertices that span this shape. Vertices are given in counter-clockwise (CCW) direction.
 */
function Convex(vertices){

    /**
     * Vertices defined in the local frame.
     * @property vertices
     * @type {Array}
     */
    this.vertices = vertices || [];

    /**
     * The center of mass of the Convex
     * @property centerOfMass
     * @type {Float32Array}
     */
    this.centerOfMass = vec2.fromValues(0,0);

    /**
     * Triangulated version of this convex. The structure is Array of 3-Arrays, and each subarray contains 3 integers, referencing the vertices.
     * @property triangles
     * @type {Array}
     */
    this.triangles = [];

    if(this.vertices.length){
        this.updateTriangles();
        this.updateCenterOfMass();
    }

    /**
     * The bounding radius of the convex
     * @property boundingRadius
     * @type {Number}
     */
    this.boundingRadius = 0;
    this.updateBoundingRadius();

    Shape.call(this,Shape.CONVEX);
};
Convex.prototype = new Shape();

Convex.prototype.updateTriangles = function(){

    this.triangles.length = 0;

    // Rewrite on polyk notation, array of numbers
    var polykVerts = [];
    for(var i=0; i<this.vertices.length; i++){
        var v = this.vertices[i];
        polykVerts.push(v[0],v[1]);
    }

    // Triangulate
    var triangles = polyk.Triangulate(polykVerts);

    // Loop over all triangles, add their inertia contributions to I
    for(var i=0; i<triangles.length; i+=3){
        var id1 = triangles[i],
            id2 = triangles[i+1],
            id3 = triangles[i+2];

        // Add to triangles
        this.triangles.push([id1,id2,id3]);
    }
};

var updateCenterOfMass_centroid = vec2.create(),
    updateCenterOfMass_centroid_times_mass = vec2.create(),
    updateCenterOfMass_a = vec2.create(),
    updateCenterOfMass_b = vec2.create(),
    updateCenterOfMass_c = vec2.create(),
    updateCenterOfMass_ac = vec2.create(),
    updateCenterOfMass_ca = vec2.create(),
    updateCenterOfMass_cb = vec2.create(),
    updateCenterOfMass_n = vec2.create();
Convex.prototype.updateCenterOfMass = function(){
    var triangles = this.triangles,
        verts = this.vertices,
        cm = this.centerOfMass,
        centroid = updateCenterOfMass_centroid,
        n = updateCenterOfMass_n,
        a = updateCenterOfMass_a,
        b = updateCenterOfMass_b,
        c = updateCenterOfMass_c,
        ac = updateCenterOfMass_ac,
        ca = updateCenterOfMass_ca,
        cb = updateCenterOfMass_cb,
        centroid_times_mass = updateCenterOfMass_centroid_times_mass;

    vec2.set(cm,0,0);

    for(var i=0; i<triangles.length; i++){
        var t = triangles[i],
            a = verts[t[0]],
            b = verts[t[1]],
            c = verts[t[2]];

        vec2.centroid(centroid,a,b,c);

        vec2.sub(ca, c, a);
        vec2.sub(cb, c, b);

        // Get mass for the triangle (density=1 in this case)
        // http://math.stackexchange.com/questions/80198/area-of-triangle-via-vectors
        var m = 0.5 * vec2.crossLength(ca,cb);

        // Add to center of mass
        vec2.scale(centroid_times_mass, centroid, m);
        vec2.add(cm, cm, centroid_times_mass);
    }
};

/**
 * Compute the mass moment of inertia of the Convex.
 * @method conputeMomentOfInertia
 * @param  {Number} mass
 * @return {Number}
 * @todo  should use .triangles
 */
Convex.prototype.computeMomentOfInertia = function(mass){

    // In short: Triangulate the Convex, compute centroid and inertia of
    // each sub-triangle. Add up to total using parallel axis theorem.

    var I = 0;

    // Rewrite on polyk notation, array of numbers
    var polykVerts = [];
    for(var i=0; i<this.vertices.length; i++){
        var v = this.vertices[i];
        polykVerts.push(v[0],v[1]);
    }

    // Triangulate
    var triangles = polyk.Triangulate(polykVerts);

    // Get total convex area and density
    var area = polyk.GetArea(polykVerts);
    var density = mass / area;

    // Temp vectors
    var a = vec2.create(),
        b = vec2.create(),
        c = vec2.create(),
        centroid = vec2.create(),
        n = vec2.create(),
        ac = vec2.create(),
        ca = vec2.create(),
        cb = vec2.create(),
        centroid_times_mass = vec2.create();

    // Loop over all triangles, add their inertia contributions to I
    for(var i=0; i<triangles.length; i+=3){
        var id1 = triangles[i],
            id2 = triangles[i+1],
            id3 = triangles[i+2];

        // a,b,c are triangle corners
        vec2.set(a, polykVerts[2*id1], polykVerts[2*id1+1]);
        vec2.set(b, polykVerts[2*id2], polykVerts[2*id2+1]);
        vec2.set(c, polykVerts[2*id3], polykVerts[2*id3+1]);

        vec2.centroid(centroid, a, b, c);

        vec2.sub(ca, c, a);
        vec2.sub(cb, c, b);

        var area_triangle = 0.5 * vec2.crossLength(ca,cb);
        var base = vec2.length(ca);
        var height = 2*area_triangle / base; // a=b*h/2 => h=2*a/b

        // Get inertia for this triangle: http://answers.yahoo.com/question/index?qid=20080721030038AA3oE1m
        var I_triangle = (base * (Math.pow(height,3))) / 36;

        // Get mass for the triangle
        var m = base*height/2 * density;

        // Add to total inertia using parallel axis theorem
        var r2 = vec2.squaredLength(centroid);
        I += I_triangle + m*r2;
    }

    return I;
};

/**
 * Updates the .boundingRadius property
 * @method updateBoundingRadius
 */
Convex.prototype.updateBoundingRadius = function(){
    var verts = this.vertices,
        r2 = 0;

    for(var i=0; i!==verts.length; i++){
        var l2 = vec2.squaredLength(verts[i]);
        if(l2 > r2) r2 = l2;
    }

    this.boundingRadius = Math.sqrt(r2);
};


},{"./Shape":28,"../math/vec2":33,"../math/polyk":36}],11:[function(require,module,exports){
var Constraint = require('./Constraint')
,   ContactEquation = require('./ContactEquation')
,   vec2 = require('../math/vec2')

module.exports = DistanceConstraint;

/**
 * Constraint that tries to keep the distance between two bodies constant.
 *
 * @class DistanceConstraint
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {number} dist The distance to keep between the bodies.
 * @param {number} maxForce
 * @extends {Constraint}
 */
function DistanceConstraint(bodyA,bodyB,distance,maxForce){
    Constraint.call(this,bodyA,bodyB);

    this.distance = distance;

    if(typeof(maxForce)==="undefined" ) {
        maxForce = 1e6;
    }

    var normal = new ContactEquation(bodyA,bodyB); // Just in the normal direction

    this.equations = [ normal ];

    // Make the contact constraint bilateral
    normal.minForce = -maxForce;
    normal.maxForce =  maxForce;
}
DistanceConstraint.prototype = new Constraint();

/**
 * Update the constraint equations. Should be done if any of the bodies changed position, before solving.
 * @method update
 */
DistanceConstraint.prototype.update = function(){
    var normal = this.equations[0],
        bodyA = this.bodyA,
        bodyB = this.bodyB,
        distance = this.distance;

    vec2.sub(normal.ni, bodyB.position, bodyA.position);
    vec2.normalize(normal.ni,normal.ni);
    vec2.scale(normal.ri, normal.ni,  distance*0.5);
    vec2.scale(normal.rj, normal.ni, -distance*0.5);
};

},{"./Constraint":7,"./ContactEquation":8,"../math/vec2":33}],14:[function(require,module,exports){
var vec2 = require('../math/vec2')
,   Equation = require('./Equation')

module.exports = FrictionEquation;

// 3D cross product from glmatrix, until we get this to work...
function cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

var dot = vec2.dot;

/**
 * Constrains the slipping in a contact along a tangent
 *
 * @class FrictionEquation
 * @constructor
 * @param {Body} bi
 * @param {Body} bj
 * @param {Number} slipForce
 * @extends {Equation}
 */
function FrictionEquation(bi,bj,slipForce){
    Equation.call(this,bi,bj,-slipForce,slipForce);
    this.ri = vec2.create(); // Vector from center of body i to the contact point
    this.rj = vec2.create(); // Vector from center of body j to the contact point
    this.t = vec2.create();  // Tangent vector so that
    this.rixt = 0;
    this.rjxt = 0;
};
FrictionEquation.prototype = new Equation();
FrictionEquation.prototype.constructor = FrictionEquation;

/**
 * Set the slipping condition for the constraint. If the force
 * @method setSlipForce
 * @param  {Number} slipForce
 */
FrictionEquation.prototype.setSlipForce = function(slipForce){
    this.maxForce = slipForce;
    this.minForce = -slipForce;
};

var rixtVec = [0,0,0];
var rjxtVec = [0,0,0];
FrictionEquation.prototype.computeB = function(a,b,h){
    var a = this.a,
        b = this.b,
        bi = this.bi,
        bj = this.bj,
        ri = this.ri,
        rj = this.rj,
        rixt = this.rixt,
        rjxt = this.rjxt,
        t = this.t;

    // Caluclate cross products
    cross(rixtVec, [ri[0], ri[1], 0], [t[0], t[1], 0]);//ri.cross(t,rixt);
    cross(rjxtVec, [rj[0], rj[1], 0], [t[0], t[1], 0]);//rj.cross(t,rjxt);
    var rixt = this.rixt = rixtVec[2];
    var rjxt = this.rjxt = rjxtVec[2];

    var Gq = 0; // we do only want to constrain motion
    var GW = -dot(bi.velocity,t) + dot(bj.velocity,t) - rixt*bi.angularVelocity + rjxt*bj.angularVelocity; // eq. 40
    var GiMf = -dot(bi.force,t)*bi.invMass +dot(bj.force,t)*bj.invMass -rixt*bi.invInertia*bi.angularForce + rjxt*bj.invInertia*bj.angularForce;

    var B = - Gq * a - GW * b - h*GiMf;

    return B;
};

// Compute C = G * iM * G' + eps
//
// G*iM*G' =
//
//                             [ iM1          ] [-t     ]
// [-t (-ri x t) t (rj x t)] * [    iI1       ] [-ri x t]
//                             [       iM2    ] [t      ]
//                             [          iI2 ] [rj x t ]
//
// = (-t)*iM1*(-t) + (-ri x t)*iI1*(-ri x t) + t*iM2*t + (rj x t)*iI2*(rj x t)
//
// = t*iM1*t + (ri x t)*iI1*(ri x t) + t*iM2*t + (rj x t)*iI2*(rj x t)
//
FrictionEquation.prototype.computeC = function(eps){
    var bi = this.bi,
        bj = this.bj,
        rixt = this.rixt,
        rjxt = this.rjxt,
        C;

    C = bi.invMass + bj.invMass + eps;

    C += bi.invInertia * rixt * rixt;
    C += bj.invInertia * rjxt * rjxt;

    return C;
};

FrictionEquation.prototype.computeGWlambda = function(){
    var bi = this.bi;
    var bj = this.bj;
    var GWlambda = 0.0;

    GWlambda -= vec2.dot(this.t, bi.vlambda);
    GWlambda -= bi.wlambda * this.rixt;
    GWlambda += vec2.dot(this.t, bj.vlambda);
    GWlambda += bj.wlambda * this.rjxt;

    return GWlambda;
};

var FrictionEquation_addToWlambda_tmp = vec2.create();
FrictionEquation.prototype.addToWlambda = function(deltalambda){
    var bi = this.bi,
        bj = this.bj,
        rixt = this.rixt,
        rjxt = this.rjxt,
        t = this.t,
        tmp = FrictionEquation_addToWlambda_tmp;

    vec2.scale(tmp, t, -bi.invMass * deltalambda);  //t.mult(invMassi * deltalambda, tmp);
    vec2.add(bi.vlambda, bi.vlambda, tmp);          //bi.vlambda.vsub(tmp,bi.vlambda);

    vec2.scale(tmp, t, bj.invMass * deltalambda);   //t.mult(invMassj * deltalambda, tmp);
    vec2.add(bj.vlambda, bj.vlambda, tmp);          //bj.vlambda.vadd(tmp,bj.vlambda);

    bi.wlambda -= bi.invInertia * rixt * deltalambda;
    bj.wlambda += bj.invInertia * rjxt * deltalambda;
};

},{"../math/vec2":33,"./Equation":12}],15:[function(require,module,exports){
var Circle = require('../shapes/Circle')
,   Plane = require('../shapes/Plane')
,   Particle = require('../shapes/Particle')
,   Broadphase = require('../collision/Broadphase')
,   vec2 = require('../math/vec2')

module.exports = GridBroadphase;

/**
 * Broadphase that uses axis-aligned bins.
 * @class GridBroadphase
 * @constructor
 * @extends Broadphase
 * @param {number} xmin Lower x bound of the grid
 * @param {number} xmax Upper x bound
 * @param {number} ymin Lower y bound
 * @param {number} ymax Upper y bound
 * @param {number} nx Number of bins along x axis
 * @param {number} ny Number of bins along y axis
 * @todo test
 */
function GridBroadphase(xmin,xmax,ymin,ymax,nx,ny){
    Broadphase.apply(this);

    nx = nx || 10;
    ny = ny || 10;

    this.binsizeX = (xmax-xmin) / nx;
    this.binsizeY = (ymax-ymin) / ny;
    this.nx = nx;
    this.ny = ny;
    this.xmin = xmin;
    this.ymin = ymin;
    this.xmax = xmax;
    this.ymax = ymax;
};
GridBroadphase.prototype = new Broadphase();

/**
 * Get a bin index given a world coordinate
 * @method getBinIndex
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number} Integer index
 */
GridBroadphase.prototype.getBinIndex = function(x,y){
    var nx = this.nx,
        ny = this.ny,
        xmin = this.xmin,
        ymin = this.ymin,
        xmax = this.xmax,
        ymax = this.ymax;

    var xi = Math.floor(nx * (x - xmin) / (xmax-xmin));
    var yi = Math.floor(ny * (y - ymin) / (ymax-ymin));
    return xi*ny + yi;
}

/**
 * Get collision pairs.
 * @method getCollisionPairs
 * @param  {World} world
 * @return {Array}
 */
GridBroadphase.prototype.getCollisionPairs = function(world){
    var result = [],
        collidingBodies = world.bodies,
        Ncolliding = Ncolliding=collidingBodies.length,
        binsizeX = this.binsizeX,
        binsizeY = this.binsizeY;

    var bins=[], Nbins=nx*ny;
    for(var i=0; i<Nbins; i++)
        bins.push([]);

    var xmult = nx / (xmax-xmin);
    var ymult = ny / (ymax-ymin);

    // Put all bodies into bins
    for(var i=0; i!==Ncolliding; i++){
        var bi = collidingBodies[i];
        var si = bi.shape;
        if (si === undefined) {
            continue;
        } else if(si instanceof Circle){
            // Put in bin
            // check if overlap with other bins
            var x = bi.position[0];
            var y = bi.position[1];
            var r = si.radius;

            var xi1 = Math.floor(xmult * (x-r - xmin));
            var yi1 = Math.floor(ymult * (y-r - ymin));
            var xi2 = Math.floor(xmult * (x+r - xmin));
            var yi2 = Math.floor(ymult * (y+r - ymin));

            for(var j=xi1; j<=xi2; j++){
                for(var k=yi1; k<=yi2; k++){
                    var xi = j;
                    var yi = k;
                    if(xi*(ny-1) + yi >= 0 && xi*(ny-1) + yi < Nbins)
                        bins[ xi*(ny-1) + yi ].push(bi);
                }
            }
        } else if(si instanceof Plane){
            // Put in all bins for now
            if(bi.angle == 0){
                var y = bi.position[1];
                for(var j=0; j!==Nbins && ymin+binsizeY*(j-1)<y; j++){
                    for(var k=0; k<nx; k++){
                        var xi = k;
                        var yi = Math.floor(ymult * (binsizeY*j - ymin));
                        bins[ xi*(ny-1) + yi ].push(bi);
                    }
                }
            } else if(bi.angle == Math.PI*0.5){
                var x = bi.position[0];
                for(var j=0; j!==Nbins && xmin+binsizeX*(j-1)<x; j++){
                    for(var k=0; k<ny; k++){
                        var yi = k;
                        var xi = Math.floor(xmult * (binsizeX*j - xmin));
                        bins[ xi*(ny-1) + yi ].push(bi);
                    }
                }
            } else {
                for(var j=0; j!==Nbins; j++)
                    bins[j].push(bi);
            }
        } else {
            throw new Error("Shape not supported in GridBroadphase!");
        }
    }

    // Check each bin
    for(var i=0; i!==Nbins; i++){
        var bin = bins[i];

        for(var j=0, NbodiesInBin=bin.length; j!==NbodiesInBin; j++){
            var bi = bin[j];
            var si = bi.shape;

            for(var k=0; k!==j; k++){
                var bj = bin[k];
                var sj = bj.shape;

                if(si instanceof Circle){
                         if(sj instanceof Circle)   c=Broadphase.circleCircle  (bi,bj);
                    else if(sj instanceof Particle) c=Broadphase.circleParticle(bi,bj);
                    else if(sj instanceof Plane)    c=Broadphase.circlePlane   (bi,bj);
                } else if(si instanceof Particle){
                         if(sj instanceof Circle)   c=Broadphase.circleParticle(bj,bi);
                } else if(si instanceof Plane){
                         if(sj instanceof Circle)   c=Broadphase.circlePlane   (bj,bi);
                }
            }
        }
    }
    return result;
};

},{"../shapes/Circle":6,"../shapes/Plane":22,"../shapes/Particle":21,"../collision/Broadphase":4,"../math/vec2":33}],16:[function(require,module,exports){
var vec2 = require('../math/vec2'),
    Solver = require('./Solver');

module.exports = GSSolver;

var ARRAY_TYPE = Float32Array || Array;

/**
 * Iterative Gauss-Seidel constraint equation solver.
 *
 * @class GSSolver
 * @constructor
 * @extends Solver
 * @param {Object} [options]
 * @param {Number} options.iterations
 * @param {Number} options.timeStep
 * @param {Number} options.stiffness
 * @param {Number} options.relaxation
 * @param {Number} options.tolerance
 */
function GSSolver(options){
    Solver.call(this);
    options = options || {};
    this.iterations = options.iterations || 10;
    this.tolerance = options.tolerance || 0;
    this.debug = options.debug || false;
    this.arrayStep = 30;
    this.lambda = new ARRAY_TYPE(this.arrayStep);
    this.Bs =     new ARRAY_TYPE(this.arrayStep);
    this.invCs =  new ARRAY_TYPE(this.arrayStep);

    /**
     * Whether to use .stiffness and .relaxation parameters from the Solver instead of each Equation individually.
     * @type {Boolean}
     * @property useGlobalEquationParameters
     */
    this.useGlobalEquationParameters = true;

    /**
     * Global equation stiffness.
     * @property stiffness
     * @type {Number}
     */
    this.stiffness = 1e6;

    /**
     * Global equation relaxation.
     * @property relaxation
     * @type {Number}
     */
    this.relaxation = 4;

    /**
     * Set to true to set all right hand side terms to zero when solving. Can be handy for a few applications.
     * @property useZeroRHS
     * @type {Boolean}
     */
    this.useZeroRHS = false;
};
GSSolver.prototype = new Solver();

/**
 * Set stiffness parameters
 *
 * @method setSpookParams
 * @param  {number} k
 * @param  {number} d
 * @deprecated
 */
GSSolver.prototype.setSpookParams = function(k,d){
    this.stiffness = k;
    this.relaxation = d;
};

/**
 * Solve the system of equations
 * @method solve
 * @param  {Number}  dt       Time step
 * @param  {World}   world    World to solve
 */
GSSolver.prototype.solve = function(dt,world){
    var iter = 0,
        maxIter = this.iterations,
        tolSquared = this.tolerance*this.tolerance,
        equations = this.equations,
        Neq = equations.length,
        bodies = world.bodies,
        Nbodies = world.bodies.length,
        h = dt,
        d = this.relaxation,
        k = this.stiffness,
        eps = 4.0 / (h * h * k * (1 + 4 * d)),
        a = 4.0 / (h * (1 + 4 * d)),
        b = (4.0 * d) / (1 + 4 * d),
        useGlobalParams = this.useGlobalEquationParameters,
        add = vec2.add,
        set = vec2.set,
        useZeroRHS = this.useZeroRHS;

    // Things that does not change during iteration can be computed once
    if(this.lambda.length < Neq){
        this.lambda = new ARRAY_TYPE(Neq + this.arrayStep);
        this.Bs =     new ARRAY_TYPE(Neq + this.arrayStep);
        this.invCs =  new ARRAY_TYPE(Neq + this.arrayStep);
    }
    var invCs = this.invCs,
        Bs = this.Bs,
        lambda = this.lambda;
    for(var i=0; i!==Neq; i++){
        var c = equations[i];
        lambda[i] = 0.0;

        var _a = a,
            _b = b,
            _eps = eps;
        if(!useGlobalParams){
            if(h !== c.h) c.updateSpookParams(h);
            _a = c.a;
            _b = c.b;
            _eps = c.eps;
        }
        Bs[i] = c.computeB(_a,_b,h);
        invCs[i] = 1.0 / c.computeC(_eps);
    }

    var q, B, c, invC, deltalambda, deltalambdaTot, GWlambda, lambdaj;

    if(Neq !== 0){
        var i,j, minForce, maxForce, lambdaj_plus_deltalambda;

        // Reset vlambda
        for(i=0; i!==Nbodies; i++){
            var b=bodies[i], vlambda=b.vlambda;
            set(vlambda,0,0);
            b.wlambda = 0;
        }

        // Iterate over equations
        for(iter=0; iter!==maxIter; iter++){

            // Accumulate the total error for each iteration.
            deltalambdaTot = 0.0;

            for(j=0; j!==Neq; j++){

                c = equations[j];

                var _eps = useGlobalParams ? eps : c.eps;

                // Compute iteration
                maxForce = c.maxForce;
                minForce = c.minForce;

                B = Bs[j];
                invC = invCs[j];
                lambdaj = lambda[j];
                GWlambda = c.computeGWlambda(_eps);

                if(useZeroRHS) B = 0;

                deltalambda = invC * ( B - GWlambda - _eps * lambdaj );

                // Clamp if we are not within the min/max interval
                lambdaj_plus_deltalambda = lambdaj + deltalambda;
                if(lambdaj_plus_deltalambda < minForce){
                    deltalambda = minForce - lambdaj;
                } else if(lambdaj_plus_deltalambda > maxForce){
                    deltalambda = maxForce - lambdaj;
                }
                lambda[j] += deltalambda;

                deltalambdaTot += Math.abs(deltalambda);

                c.addToWlambda(deltalambda);
            }

            // If the total error is small enough - stop iterate
            if(deltalambdaTot*deltalambdaTot <= tolSquared) break;
        }

        // Add result to velocity
        for(i=0; i!==Nbodies; i++){
            var b=bodies[i], v=b.velocity;
            add( v, v, b.vlambda);
            b.angularVelocity += b.wlambda;
        }
    }
    errorTot = deltalambdaTot;
};


},{"../math/vec2":33,"./Solver":29}],17:[function(require,module,exports){
var Solver = require('./Solver')
,   vec2 = require('../math/vec2')
,   Island = require('../solver/Island')
,   Body = require('../objects/Body')
,   STATIC = Body.STATIC

module.exports = IslandSolver;

/**
 * Splits the system of bodies and equations into independent islands
 *
 * @class IslandSolver
 * @constructor
 * @param {Solver} subsolver
 * @extends Solver
 */
function IslandSolver(subsolver){
    Solver.call(this);
    var that = this;

    /**
     * The solver used in the workers.
     * @property subsolver
     * @type {Solver}
     */
    this.subsolver = subsolver;

    /**
     * Number of islands
     * @property numIslands
     * @type {number}
     */
    this.numIslands = 0;

    // Pooling of node objects saves some GC load
    this._nodePool = [];
};
IslandSolver.prototype = new Object(Solver.prototype);

function getUnvisitedNode(nodes){
    var Nnodes = nodes.length;
    for(var i=0; i!==Nnodes; i++){
        var node = nodes[i];
        if(!node.visited && !(node.body.motionState & STATIC)){ // correct?
            return node;
        }
    }
    return false;
}

function bfs(root,visitFunc){
    var queue = [];
    queue.push(root);
    root.visited = true;
    visitFunc(root);
    while(queue.length) {
        var node = queue.pop();
        // Loop over unvisited child nodes
        var child;
        while((child = getUnvisitedNode(node.children))) {
            child.visited = true;
            visitFunc(child);
            queue.push(child);
        }
    }
}

/**
 * Solves the full system.
 * @method solve
 * @param  {Number} dt
 * @param  {World} world
 */
IslandSolver.prototype.solve = function(dt,world){
    var nodes = [],
        bodies=world.bodies,
        equations=this.equations,
        Neq=equations.length,
        Nbodies=bodies.length,
        subsolver=this.subsolver,
        workers = this._workers,
        workerData = this._workerData,
        workerIslandGroups = this._workerIslandGroups;

    // Create needed nodes, reuse if possible
    for(var i=0; i!==Nbodies; i++){
        if(this._nodePool.length)
            nodes.push( this._nodePool.pop() );
        else {
            nodes.push({
                body:bodies[i],
                children:[],
                eqs:[],
                visited:false
            });
        }
    }

    // Reset node values
    for(var i=0; i!==Nbodies; i++){
        var node = nodes[i];
        node.body = bodies[i];
        node.children.length = 0;
        node.eqs.length = 0;
        node.visited = false;
    }

    // Add connectivity data. Each equation connects 2 bodies.
    for(var k=0; k!==Neq; k++){
        var eq=equations[k],
            i=bodies.indexOf(eq.bi),
            j=bodies.indexOf(eq.bj),
            ni=nodes[i],
            nj=nodes[j];
        ni.children.push(nj);
        ni.eqs.push(eq);
        nj.children.push(ni);
        nj.eqs.push(eq);
    }

    // The BFS search algorithm needs a traversal function. What we do is gather all bodies and equations connected.
    var child, n=0, eqs=[], bds=[];
    function visitFunc(node){
        bds.push(node.body);
        var Neqs = node.eqs.length;
        for(var i=0; i!==Neqs; i++){
            var eq = node.eqs[i];
            if(eqs.indexOf(eq) === -1){
                eqs.push(eq);
            }
        }
    }

    // Get islands
    var islands = [];
    while((child = getUnvisitedNode(nodes))){
        var island = new Island(); // @todo Should be reused from somewhere
        eqs.length = 0;
        bds.length = 0;
        bfs(child,visitFunc); // run search algo to gather an island of bodies

        // Add equations to island
        var Neqs = eqs.length;
        for(var i=0; i!==Neqs; i++){
            var eq = eqs[i];
            island.equations.push(eq);
        }

        n++;
        islands.push(island);
    }

    this.numIslands = n;

    // Solve islands
    for(var i=0; i<islands.length; i++){
        islands[i].solve(dt,this.subsolver);
    }
};

},{"./Solver":29,"../math/vec2":33,"../solver/Island":37,"../objects/Body":3}],18:[function(require,module,exports){
var Shape = require('./Shape');

module.exports = Line;

/**
 * Line shape class. The line shape is along the x direction, and stretches from [-length/2, 0] to [length/2,0].
 * @class Plane
 * @extends {Shape}
 * @constructor
 */
function Line(length){

    /**
     * Length of this line
     * @property length
     * @type {Number}
     */
    this.length = length;

    Shape.call(this,Shape.LINE);
};
Line.prototype = new Shape();
Line.prototype.computeMomentOfInertia = function(mass){
    return mass * Math.pow(this.length,2) / 12;
};

Line.prototype.updateBoundingRadius = function(){
    this.boundingRadius = this.length/2;
};


},{"./Shape":28}],20:[function(require,module,exports){
var Circle = require('../shapes/Circle')
,   Plane = require('../shapes/Plane')
,   Shape = require('../shapes/Shape')
,   Particle = require('../shapes/Particle')
,   Broadphase = require('../collision/Broadphase')
,   vec2 = require('../math/vec2')

module.exports = NaiveBroadphase;

/**
 * Naive broadphase implementation. Does N^2 tests.
 *
 * @class NaiveBroadphase
 * @constructor
 * @extends Broadphase
 */
function NaiveBroadphase(){
    Broadphase.apply(this);
};
NaiveBroadphase.prototype = new Broadphase();

/**
 * Get the colliding pairs
 * @method getCollisionPairs
 * @param  {World} world
 * @return {Array}
 */
NaiveBroadphase.prototype.getCollisionPairs = function(world){
    var bodies = world.bodies;
    var result = [];

    for(var i=0, Ncolliding=bodies.length; i!==Ncolliding; i++){
        var bi = bodies[i];

        for(var j=0; j<i; j++){
            var bj = bodies[j];

            if(Broadphase.boundingRadiusCheck(bi,bj))
                result.push(bi,bj);
        }
    }

    return result;
};

},{"../shapes/Circle":6,"../shapes/Plane":22,"../shapes/Shape":28,"../shapes/Particle":21,"../collision/Broadphase":4,"../math/vec2":33}],21:[function(require,module,exports){
var Shape = require('./Shape');

module.exports = Particle;

/**
 * Particle shape class.
 * @class Particle
 * @constructor
 * @extends {Shape}
 */
function Particle(){
    Shape.call(this,Shape.PARTICLE);
};
Particle.prototype = new Shape();
Particle.prototype.computeMomentOfInertia = function(mass){
    return 0; // Can't rotate a particle
};

Particle.prototype.updateBoundingRadius = function(){
    this.boundingRadius = 0;
};


},{"./Shape":28}],22:[function(require,module,exports){
var Shape = require('./Shape');

module.exports = Plane;

/**
 * Plane shape class. The plane is facing in the Y direction.
 * @class Plane
 * @extends {Shape}
 * @constructor
 */
function Plane(){
    Shape.call(this,Shape.PLANE);
};
Plane.prototype = new Shape();
Plane.prototype.computeMomentOfInertia = function(mass){
    return 0; // Plane is infinite. The inertia should therefore be infinty but by convention we set 0 here
};

Plane.prototype.updateBoundingRadius = function(){
    this.boundingRadius = Number.MAX_VALUE;
};


},{"./Shape":28}],23:[function(require,module,exports){
var Constraint = require('./Constraint')
,   ContactEquation = require('./ContactEquation')
,   RotationalVelocityEquation = require('./RotationalVelocityEquation')
,   vec2 = require('../math/vec2')

module.exports = PointToPointConstraint;

/**
 * Connects two bodies at given offset points
 * @class PointToPointConstraint
 * @constructor
 * @author schteppe
 * @param {Body}            bodyA
 * @param {Float32Array}    pivotA The point relative to the center of mass of bodyA which bodyA is constrained to.
 * @param {Body}            bodyB Body that will be constrained in a similar way to the same point as bodyA. We will therefore get sort of a link between bodyA and bodyB. If not specified, bodyA will be constrained to a static point.
 * @param {Float32Array}    pivotB See pivotA.
 * @param {Number}          maxForce The maximum force that should be applied to constrain the bodies.
 * @extends {Constraint}
 * @todo Ability to specify world points
 */
function PointToPointConstraint(bodyA, pivotA, bodyB, pivotB, maxForce){
    Constraint.call(this,bodyA,bodyB);

    maxForce = typeof(maxForce)!="undefined" ? maxForce : 1e7;

    this.pivotA = pivotA;
    this.pivotB = pivotB;

    // Equations to be fed to the solver
    var eqs = this.equations = [
        new ContactEquation(bodyA,bodyB), // Normal
        new ContactEquation(bodyA,bodyB), // Tangent
    ];

    var normal =  eqs[0];
    var tangent = eqs[1];

    tangent.minForce = normal.minForce = -maxForce;
    tangent.maxForce = normal.maxForce =  maxForce;

    this.motorEquation = null;
    this.motorVelocity = 1; // rad/s
}
PointToPointConstraint.prototype = new Constraint();

PointToPointConstraint.prototype.update = function(){
    var bodyA =  this.bodyA,
        bodyB =  this.bodyB,
        pivotA = this.pivotA,
        pivotB = this.pivotB,
        eqs =    this.equations,
        normal = eqs[0],
        tangent= eqs[1];

    vec2.subtract(normal.ni, bodyB.position, bodyA.position);
    vec2.normalize(normal.ni,normal.ni);
    vec2.rotate(normal.ri, pivotA, bodyA.angle);
    vec2.rotate(normal.rj, pivotB, bodyB.angle);

    vec2.rotate(tangent.ni, normal.ni, Math.PI / 2);
    vec2.copy(tangent.ri, normal.ri);
    vec2.copy(tangent.rj, normal.rj);
};

/**
 * Enable the rotational motor
 * @method enableMotor
 */
PointToPointConstraint.prototype.enableMotor = function(){
    if(this.motorEquation) return;
    this.motorEquation = new RotationalVelocityEquation(this.bodyA,this.bodyB);
    this.equations.push(this.motorEquation);
};

/**
 * Disable the rotational motor
 * @method disableMotor
 */
PointToPointConstraint.prototype.disableMotor = function(){
    if(!this.motorEquation) return;
    var i = this.equations.indexOf(this.motorEquation);
    this.motorEquation = null;
    this.equations.splice(i,1);
};

/**
 * Set the speed of the rotational constraint motor
 * @method setMotorSpeed
 * @param  {Number} speed
 */
PointToPointConstraint.prototype.setMotorSpeed = function(speed){
    if(!this.motorEquation) return;
    var i = this.equations.indexOf(this.motorEquation);
    this.equations[i].relativeVelocity = speed;
};

},{"./Constraint":7,"./ContactEquation":8,"./RotationalVelocityEquation":26,"../math/vec2":33}],24:[function(require,module,exports){
var Constraint = require('./Constraint')
,   ContactEquation = require('./ContactEquation')
,   vec2 = require('../math/vec2')

module.exports = PrismaticConstraint;

/**
 * Constraint that only allows translation along a line between the bodies, no rotation
 *
 * @class PrismaticConstraint
 * @constructor
 * @author schteppe
 * @param {Body}    bodyA
 * @param {Body}    bodyB
 * @param {Object}  options
 * @param {Number}  options.maxForce
 * @param {Array}   options.worldAxis
 * @param {Array}   options.localAxisA
 * @param {Array}   options.localAxisB
 * @extends {Constraint}
 */
function PrismaticConstraint(bodyA,bodyB,options){
    options = options || {};
    Constraint.call(this,bodyA,bodyB);

    var maxForce = this.maxForce = typeof(options.maxForce)==="undefined" ? options.maxForce : 1e6;

    // Equations to be fed to the solver
    var eqs = this.equations = [
        new ContactEquation(bodyA,bodyB), // Tangent for bodyA
        new ContactEquation(bodyB,bodyA), // Tangent for bodyB
    ];

    var tangentA = eqs[0],
        tangentB = eqs[1];

    tangentA.minForce = tangentB.minForce = -maxForce;
    tangentA.maxForce = tangentB.maxForce =  maxForce;

    var worldAxis = vec2.create();
    if(options.worldAxis){
        vec2.copy(worldAxis, options.worldAxis);
    } else {
        vec2.sub(worldAxis, bodyB.position, bodyA.position);
    }
    vec2.normalize(worldAxis,worldAxis);

    // Axis that is local in each body
    this.localAxisA = vec2.create();
    this.localAxisB = vec2.create();
    if(options.localAxisA) vec2.copy(this.localAxisA, options.localAxisA);
    else                   vec2.rotate(this.localAxisA, worldAxis, -bodyA.angle);

    if(options.localAxisB)  vec2.copy(this.localAxisB, options.localAxisB);
    else                    vec2.rotate(this.localAxisB, worldAxis, -bodyB.angle);
}

PrismaticConstraint.prototype = new Constraint();

/**
 * Update the constraint equations. Should be done if any of the bodies changed position, before solving.
 * @method update
 */
PrismaticConstraint.prototype.update = function(){
    var tangentA = this.equations[0],
        tangentB = this.equations[1],
        bodyA = this.bodyA,
        bodyB = this.bodyB;

    // Get tangent directions
    vec2.rotate(tangentA.ni, this.localAxisA, bodyA.angle - Math.PI/2);
    vec2.rotate(tangentB.ni, this.localAxisB, bodyB.angle + Math.PI/2);

    // Get distance vector
    var dist = vec2.create();
    vec2.sub(dist, bodyB.position, bodyA.position);
    vec2.scale(tangentA.ri, tangentA.ni, -vec2.dot(tangentA.ni, dist));
    vec2.scale(tangentB.ri, tangentB.ni,  vec2.dot(tangentB.ni, dist));
    vec2.add(tangentA.rj, tangentA.ri, dist);
    vec2.sub(tangentB.rj, tangentB.ri, dist);
    vec2.set(tangentA.ri, 0, 0);
    vec2.set(tangentB.ri, 0, 0);
};

},{"./Constraint":7,"./ContactEquation":8,"../math/vec2":33}],25:[function(require,module,exports){
var vec2 = require('../math/vec2')
,   Shape = require('./Shape')
,   Convex = require('./Convex')

module.exports = Rectangle;

/**
 * Rectangle shape class.
 * @class Rectangle
 * @constructor
 * @extends {Convex}
 */
function Rectangle(w,h){
    var verts = [   vec2.fromValues(-w/2, -h/2),
                    vec2.fromValues( w/2, -h/2),
                    vec2.fromValues( w/2,  h/2),
                    vec2.fromValues(-w/2,  h/2)];

    this.width = w;
    this.height = h;

    Convex.call(this,verts);
};
Rectangle.prototype = new Convex();

/**
 * Compute moment of inertia
 * @method computeMomentOfInertia
 * @param  {Number} mass
 * @return {Number}
 */
Rectangle.prototype.computeMomentOfInertia = function(mass){
    var w = this.width,
        h = this.height;
    return mass * (h*h + w*w) / 12;
};

Rectangle.prototype.updateBoundingRadius = function(){
    var w = this.width,
        h = this.height;
    this.boundingRadius = Math.sqrt(w*w + h*h) / 2;
};


},{"../math/vec2":33,"./Shape":28,"./Convex":10}],26:[function(require,module,exports){
var Equation = require("./Equation"),
    vec2 = require('../math/vec2');

module.exports = RotationalVelocityEquation;

/**
 * Syncs rotational velocity of two bodies, or sets a relative velocity (motor).
 *
 * @class RotationalVelocityEquation
 * @constructor
 * @extends Equation
 * @param {Body} bi
 * @param {Body} bj
 */
function RotationalVelocityEquation(bi,bj){
    Equation.call(this,bi,bj,-1e6,1e6);
    this.relativeVelocity = 1;
    this.ratio = 1;
};
RotationalVelocityEquation.prototype = new Equation();
RotationalVelocityEquation.prototype.constructor = RotationalVelocityEquation;
RotationalVelocityEquation.prototype.computeB = function(a,b,h){
    var bi = this.bi,
        bj = this.bj,
        vi = bi.velocity,
        wi = bi.angularVelocity,
        taui = bi.angularForce,
        vj = bj.velocity,
        wj = bj.angularVelocity,
        tauj = bj.angularForce,
        invIi = bi.invInertia,
        invIj = bj.invInertia,
        Gq = 0,
        GW = this.ratio * wj - wi + this.relativeVelocity,
        GiMf = invIj*tauj - invIi*taui;

    var B = - Gq * a - GW * b - h*GiMf;

    return B;
};

// Compute C = GMG+eps in the SPOOK equation
RotationalVelocityEquation.prototype.computeC = function(eps){
    var bi = this.bi,
        bj = this.bj;

    var C = bi.invInertia + bj.invInertia + eps;

    return C;
};
var computeGWlambda_ulambda = vec2.create();
RotationalVelocityEquation.prototype.computeGWlambda = function(){
    var bi = this.bi,
        bj = this.bj;

    var GWlambda = bj.wlambda - bi.wlambda;

    return GWlambda;
};

var addToWlambda_temp = vec2.create();
RotationalVelocityEquation.prototype.addToWlambda = function(deltalambda){
    var bi = this.bi,
        bj = this.bj;

    // Add to angular velocity
    bi.wlambda -= bi.invInertia * deltalambda;
    bj.wlambda += bj.invInertia * deltalambda;
};


},{"./Equation":12,"../math/vec2":33}],27:[function(require,module,exports){
var Circle = require('../shapes/Circle')
,   Plane = require('../shapes/Plane')
,   Shape = require('../shapes/Shape')
,   Particle = require('../shapes/Particle')
,   Broadphase = require('../collision/Broadphase')
,   vec2 = require('../math/vec2')

module.exports = SAP1DBroadphase;

/**
 * Sweep and prune broadphase along one axis.
 *
 * @class SAP1DBroadphase
 * @constructor
 * @extends Broadphase
 * @param {World} world
 */
function SAP1DBroadphase(world){
    Broadphase.apply(this);

    /**
     * List of bodies currently in the broadphase.
     * @property axisList
     * @type {Array}
     */
    this.axisList = world.bodies.slice(0);

    /**
     * The world to search in.
     * @property world
     * @type {World}
     */
    this.world = world;

    /**
     * Axis to sort the bodies along. Set to 0 for x axis, and 1 for y axis. For best performance, choose an axis that the bodies are spread out more on.
     * @property axisIndex
     * @type {Number}
     */
    this.axisIndex = 0;

    // Add listeners to update the list of bodies.
    var axisList = this.axisList;
    world.on("addBody",function(e){
        axisList.push(e.body);
    }).on("removeBody",function(e){
        var idx = axisList.indexOf(e.body);
        if(idx !== -1)
            axisList.splice(idx,1);
    });
};
SAP1DBroadphase.prototype = new Broadphase();

/**
 * Function for sorting bodies along the X axis. To be passed to array.sort()
 * @method sortAxisListX
 * @param  {Body} bodyA
 * @param  {Body} bodyB
 * @return {Number}
 */
SAP1DBroadphase.sortAxisListX = function(bodyA,bodyB){
    return (bodyA.position[0]-bodyA.boundingRadius) - (bodyB.position[0]-bodyB.boundingRadius);
};

/**
 * Function for sorting bodies along the Y axis. To be passed to array.sort()
 * @method sortAxisListY
 * @param  {Body} bodyA
 * @param  {Body} bodyB
 * @return {Number}
 */
SAP1DBroadphase.sortAxisListY = function(bodyA,bodyB){
    return (bodyA.position[1]-bodyA.boundingRadius) - (bodyB.position[1]-bodyB.boundingRadius);
};

/**
 * Get the colliding pairs
 * @method getCollisionPairs
 * @param  {World} world
 * @return {Array}
 */
SAP1DBroadphase.prototype.getCollisionPairs = function(world){
    var bodies = this.axisList,
        result = [],
        axisIndex = this.axisIndex;

    // Sort the list
    bodies.sort(axisIndex === 0 ? SAP1DBroadphase.sortAxisListX : SAP1DBroadphase.sortAxisListY );

    // Look through the list
    for(var i=0, N=bodies.length; i!==N; i++){
        var bi = bodies[i];

        for(var j=i+1; j<N; j++){
            var bj = bodies[j],
                boundA1 = bi.position[axisIndex]-bi.boundingRadius,
                boundA2 = bi.position[axisIndex]+bi.boundingRadius,
                boundB1 = bj.position[axisIndex]-bj.boundingRadius,
                boundB2 = bj.position[axisIndex]+bj.boundingRadius;

            // Abort if we got gap til the next body
            if( boundB1 > boundA2 ){
                break;
            }

            // If we got overlap, add pair
            if(Broadphase.boundingRadiusCheck(bi,bj))
                result.push(bi,bj);
        }
    }

    return result;
};

},{"../shapes/Circle":6,"../shapes/Plane":22,"../shapes/Shape":28,"../shapes/Particle":21,"../collision/Broadphase":4,"../math/vec2":33}],30:[function(require,module,exports){
var vec2 = require('../math/vec2');

module.exports = Spring;

/**
 * A spring, connecting two bodies.
 *
 * @class Spring
 * @constructor
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Object} [options]
 * @param {number} options.restLength   A number > 0. Default: 1
 * @param {number} options.stiffness    A number >= 0. Default: 100
 * @param {number} options.damping      A number >= 0. Default: 1
 * @param {Array}  options.worldAnchorA Where to hook the spring to body A, in world coordinates.
 * @param {Array}  options.worldAnchorB
 * @param {Array}  options.localAnchorA Where to hook the spring to body A, in local body coordinates.
 * @param {Array}  options.localAnchorB
 */
function Spring(bodyA,bodyB,options){
    options = options || {};

    /**
     * Rest length of the spring.
     * @property restLength
     * @type {number}
     */
    this.restLength = typeof(options.restLength)=="number" ? options.restLength : 1;

    /**
     * Stiffness of the spring.
     * @property stiffness
     * @type {number}
     */
    this.stiffness = options.stiffness || 100;

    /**
     * Damping of the spring.
     * @property damping
     * @type {number}
     */
    this.damping = options.damping || 1;

    /**
     * First connected body.
     * @property bodyA
     * @type {Body}
     */
    this.bodyA = bodyA;

    /**
     * Second connected body.
     * @property bodyB
     * @type {Body}
     */
    this.bodyB = bodyB;

    /**
     * Anchor for bodyA in local bodyA coordinates.
     * @property localAnchorA
     * @type {Array}
     */
    this.localAnchorA = vec2.fromValues(0,0);

    /**
     * Anchor for bodyB in local bodyB coordinates.
     * @property localAnchorB
     * @type {Array}
     */
    this.localAnchorB = vec2.fromValues(0,0);

    if(options.localAnchorA) vec2.copy(this.localAnchorA, options.localAnchorA);
    if(options.localAnchorB) vec2.copy(this.localAnchorB, options.localAnchorB);
    if(options.worldAnchorA) this.setWorldAnchorA(options.worldAnchorA);
    if(options.worldAnchorB) this.setWorldAnchorB(options.worldAnchorB);
};

/**
 * Set the anchor point on body A, using world coordinates.
 * @method setWorldAnchorA
 * @param {Array} worldAnchorA
 */
Spring.prototype.setWorldAnchorA = function(worldAnchorA){
    this.bodyA.toLocalFrame(this.localAnchorA, worldAnchorA);
};

/**
 * Set the anchor point on body B, using world coordinates.
 * @method setWorldAnchorB
 * @param {Array} worldAnchorB
 */
Spring.prototype.setWorldAnchorB = function(worldAnchorB){
    this.bodyB.toLocalFrame(this.localAnchorB, worldAnchorB);
};

/**
 * Get the anchor point on body A, in world coordinates.
 * @method getWorldAnchorA
 * @param {Array} result The vector to store the result in.
 */
Spring.prototype.getWorldAnchorA = function(result){
    this.bodyA.toWorldFrame(result, this.localAnchorA);
};

/**
 * Get the anchor point on body B, in world coordinates.
 * @method getWorldAnchorB
 * @param {Array} result The vector to store the result in.
 */
Spring.prototype.getWorldAnchorB = function(result){
    this.bodyB.toWorldFrame(result, this.localAnchorB);
};

var applyForce_r =              vec2.create(),
    applyForce_r_unit =         vec2.create(),
    applyForce_u =              vec2.create(),
    applyForce_f =              vec2.create(),
    applyForce_worldAnchorA =   vec2.create(),
    applyForce_worldAnchorB =   vec2.create(),
    applyForce_ri =             vec2.create(),
    applyForce_rj =             vec2.create(),
    applyForce_tmp =            vec2.create();

/**
 * Apply the spring force to the connected bodies.
 * @method applyForce
 */
Spring.prototype.applyForce = function(){
    var k = this.stiffness,
        d = this.damping,
        l = this.restLength,
        bodyA = this.bodyA,
        bodyB = this.bodyB,
        r = applyForce_r,
        r_unit = applyForce_r_unit,
        u = applyForce_u,
        f = applyForce_f,
        tmp = applyForce_tmp;

    var worldAnchorA = applyForce_worldAnchorA,
        worldAnchorB = applyForce_worldAnchorB,
        ri = applyForce_ri,
        rj = applyForce_rj;

    // Get world anchors
    this.getWorldAnchorA(worldAnchorA);
    this.getWorldAnchorB(worldAnchorB);

    // Get offset points
    vec2.sub(ri, worldAnchorA, bodyA.position);
    vec2.sub(rj, worldAnchorB, bodyB.position);

    // Compute distance vector between world anchor points
    vec2.sub(r, worldAnchorB, worldAnchorA);
    var rlen = vec2.len(r);
    vec2.normalize(r_unit,r);

    //console.log(rlen)
    //console.log("A",vec2.str(worldAnchorA),"B",vec2.str(worldAnchorB))

    // Compute relative velocity of the anchor points, u
    vec2.sub(u, bodyB.velocity, bodyA.velocity);
    vec2.crossZV(tmp, bodyB.angularVelocity, rj);
    vec2.add(u, u, tmp);
    vec2.crossZV(tmp, bodyA.angularVelocity, ri);
    vec2.sub(u, u, tmp);

    // F = - k * ( x - L ) - D * ( u )
    vec2.scale(f, r_unit, -k*(rlen-l) - d*vec2.dot(u,r_unit));

    // Add forces to bodies
    vec2.sub( bodyA.force, bodyA.force, f);
    vec2.add( bodyB.force, bodyB.force, f);

    // Angular force
    var ri_x_f = vec2.crossLength(ri, f);
    var rj_x_f = vec2.crossLength(rj, f);
    bodyA.angularForce -= ri_x_f;
    bodyB.angularForce -= rj_x_f;
};

},{"../math/vec2":33}],31:[function(require,module,exports){
var GSSolver = require('../solver/GSSolver')
,    NaiveBroadphase = require('../collision/NaiveBroadphase')
,    vec2 = require('../math/vec2')
,    Circle = require('../shapes/Circle')
,    Rectangle = require('../shapes/Rectangle')
,    Convex = require('../shapes/Convex')
,    Line = require('../shapes/Line')
,    Plane = require('../shapes/Plane')
,    Capsule = require('../shapes/Capsule')
,    Particle = require('../shapes/Particle')
,    EventEmitter = require('../events/EventEmitter')
,    Body = require('../objects/Body')
,    Spring = require('../objects/Spring')
,    DistanceConstraint = require('../constraints/DistanceConstraint')
,    PointToPointConstraint = require('../constraints/PointToPointConstraint')
,    PrismaticConstraint = require('../constraints/PrismaticConstraint')
,    pkg = require('../../package.json')
,    Broadphase = require('../collision/Broadphase')
,    Nearphase = require('../collision/Nearphase')

module.exports = World;

function now(){
    if(performance.now)
        return performance.now();
    else if(performance.webkitNow)
        return performance.webkitNow();
    else
        return new Date().getTime();
}

/**
 * The dynamics world, where all bodies and constraints lives.
 *
 * @class World
 * @constructor
 * @param {Object}          [options]
 * @param {Solver}          options.solver Defaults to GSSolver.
 * @param {Float32Array}    options.gravity Defaults to [0,-9.78]
 * @param {Broadphase}      options.broadphase Defaults to NaiveBroadphase
 * @extends {EventEmitter}
 */
function World(options){
    EventEmitter.apply(this);

    options = options || {};

    /**
     * All springs in the world.
     *
     * @property springs
     * @type {Array}
     */
    this.springs = [];

    /**
     * All bodies in the world.
     *
     * @property bodies
     * @type {Array}
     */
    this.bodies = [];

    /**
     * The solver used to satisfy constraints and contacts.
     *
     * @property solver
     * @type {Solver}
     */
    this.solver = options.solver || new GSSolver();

    /**
     * The nearphase to use to generate contacts.
     *
     * @property nearphase
     * @type {Nearphase}
     */
    this.nearphase = new Nearphase();

    /**
     * Gravity in the world. This is applied on all bodies in the beginning of each step().
     *
     * @property
     * @type {Float32Array}
     */
    this.gravity = options.gravity || vec2.fromValues(0, -9.78);

    /**
     * Whether to do timing measurements during the step() or not.
     *
     * @property doPofiling
     * @type {Boolean}
     */
    this.doProfiling = options.doProfiling || false;

    /**
     * How many millisecconds the last step() took. This is updated each step if .doProfiling is set to true.
     *
     * @property lastStepTime
     * @type {Number}
     */
    this.lastStepTime = 0.0;

    /**
     * The broadphase algorithm to use.
     *
     * @property broadphase
     * @type {Broadphase}
     */
    this.broadphase = options.broadphase || new NaiveBroadphase();

    /**
     * User-added constraints.
     *
     * @property constraints
     * @type {Array}
     */
    this.constraints = [];

    /**
     * Friction between colliding bodies. This value is used if no matching ContactMaterial is found for the body pair.
     * @property defaultFriction
     * @type {Number}
     */
    this.defaultFriction = 0.1;

    /**
     * For keeping track of what time step size we used last step
     * @property lastTimeStep
     * @type {Number}
     */
    this.lastTimeStep = 1/60;

    /**
     * Enable to automatically apply spring forces each step.
     * @property applySpringForces
     * @type {Boolean}
     */
    this.applySpringForces = true;

    /**
     * The ContactMaterials added to the World.
     * @property contactMaterials
     * @type {Array}
     */
    this.contactMaterials = [];

    // Id counters
    this._constraintIdCounter = 0;
    this._bodyIdCounter = 0;

    // Event objects that are reused
    this.postStepEvent = {
        type : "postStep",
    };
    this.addBodyEvent = {
        type : "addBody",
        body : null
    };
    this.addSpringEvent = {
        type : "addSpring",
        body : null
    };
};
World.prototype = new Object(EventEmitter.prototype);

/**
 * Add a constraint to the simulation.
 *
 * @method addConstraint
 * @param {Constraint} c
 */
World.prototype.addConstraint = function(c){
    this.constraints.push(c);
    c.id = this._constraintIdCounter++;
};

/**
 * Add a ContactMaterial to the simulation.
 * @method addContactMaterial
 * @param {ContactMaterial} contactMaterial
 */
World.prototype.addContactMaterial = function(contactMaterial){
    this.contactMaterials.push(contactMaterial);
};

/**
 * Get a contact material given two materials
 * @method getContactMaterial
 * @param {Material} materialA
 * @param {Material} materialB
 * @return {ContactMaterial} The matching ContactMaterial, or false on fail.
 * @todo Use faster hash map to lookup from material id's
 */
World.prototype.getContactMaterial = function(materialA,materialB){
    var cmats = this.contactMaterials;
    for(var i=0, N=cmats.length; i!==N; i++){
        var cm = cmats[i];
        if( (cm.materialA === materialA) && (cm.materialB === materialB) ||
            (cm.materialA === materialB) && (cm.materialB === materialA) )
            return cm;
    }
    return false;
};

/**
 * Removes a constraint
 *
 * @method removeConstraint
 * @param {Constraint} c
 */
World.prototype.removeConstraint = function(c){
    var idx = this.constraints.indexOf(c);
    if(idx!==-1){
        this.constraints.splice(idx,1);
    }
};

var step_r = vec2.create(),
    step_runit = vec2.create(),
    step_u = vec2.create(),
    step_f = vec2.create(),
    step_fhMinv = vec2.create(),
    step_velodt = vec2.create(),
    xiw = vec2.fromValues(0,0),
    xjw = vec2.fromValues(0,0),
    zero = vec2.fromValues(0,0);

/**
 * Step the physics world forward in time.
 *
 * @method step
 * @param {Number} dt The time step size to use.
 * @param {Function} callback Called when done.
 */
World.prototype.step = function(dt){
    var that = this,
        doProfiling = this.doProfiling,
        Nsprings = this.springs.length,
        springs = this.springs,
        bodies = this.bodies,
        g = this.gravity,
        solver = this.solver,
        Nbodies = this.bodies.length,
        broadphase = this.broadphase,
        np = this.nearphase,
        constraints = this.constraints,
        t0, t1,
        fhMinv = step_fhMinv,
        velodt = step_velodt,
        scale = vec2.scale,
        add = vec2.add,
        rotate = vec2.rotate;

    this.lastTimeStep = dt;

    if(doProfiling){
        t0 = now();
    }

    // add gravity to bodies
    for(var i=0; i!==Nbodies; i++){
        var fi = bodies[i].force;
        add(fi,fi,g);
    }

    // Add spring forces
    if(this.applySpringForces){
        for(var i=0; i!==Nsprings; i++){
            var s = springs[i];
            s.applyForce();
        }
    }

    // Broadphase
    var result = broadphase.getCollisionPairs(this);

    // Nearphase
    var glen = vec2.length(this.gravity);
    np.reset();
    for(var i=0, Nresults=result.length; i!==Nresults; i+=2){
        var bi = result[i],
            bj = result[i+1];

        // Loop over all shapes of body i
        for(var k=0; k<bi.shapes.length; k++){
            var si = bi.shapes[k],
                xi = bi.shapeOffsets[k] || zero,
                ai = bi.shapeAngles[k] || 0;

            // All shapes of body j
            for(var l=0; l<bj.shapes.length; l++){
                var sj = bj.shapes[l],
                    xj = bj.shapeOffsets[l] || zero,
                    aj = bj.shapeAngles[l] || 0;

                if(!((si.collisionGroup & sj.collisionMask) !== 0 && (sj.collisionGroup & si.collisionMask) !== 0))
                    continue;

                var reducedMass = (bi.invMass + bj.invMass);
                if(reducedMass > 0)
                    reducedMass = 1/reducedMass;

                var mu = this.defaultFriction;

                if(si.material && sj.material){
                    var cm = this.getContactMaterial(si.material,sj.material);
                    if(cm){
                        mu = cm.friction;
                    }
                }

                var mug = mu * glen * reducedMass,
                    doFriction = mu > 0;

                // Get world position and angle of each shape
                rotate(xiw, xi, bi.angle);
                rotate(xjw, xj, bj.angle);
                add(xiw, xiw, bi.position);
                add(xjw, xjw, bj.position);
                var aiw = ai + bi.angle;
                var ajw = aj + bj.angle;

                // Run nearphase
                np.enableFriction = mu > 0;
                np.slipForce = mug;
                if(si instanceof Circle){
                         if(sj instanceof Circle)       np.circleCircle  (bi,si,xiw,aiw, bj,sj,xjw,ajw);
                    else if(sj instanceof Particle)     np.circleParticle(bi,si,xiw,aiw, bj,sj,xjw,ajw);
                    else if(sj instanceof Plane)        np.circlePlane   (bi,si,xiw,aiw, bj,sj,xjw,ajw);
                    else if(sj instanceof Rectangle)    np.circleConvex  (bi,si,xiw,aiw, bj,sj,xjw,ajw);
                    else if(sj instanceof Convex)       np.circleConvex  (bi,si,xiw,aiw, bj,sj,xjw,ajw);
                    else if(sj instanceof Line)         np.circleLine    (bi,si,xiw,aiw, bj,sj,xjw,ajw);
                    else if(sj instanceof Capsule)      np.circleCapsule (bi,si,xiw,aiw, bj,sj,xjw,ajw);

                } else if(si instanceof Particle){
                         if(sj instanceof Circle)       np.circleParticle   (bj,sj,xjw,ajw, bi,si,xiw,aiw);
                    else if(sj instanceof Plane)        np.particlePlane    (bi,si,xiw,aiw, bj,sj,xjw,ajw);
                    else if(sj instanceof Rectangle)    np.particleConvex   (bi,si,xiw,aiw, bj,sj,xjw,ajw);
                    else if(sj instanceof Convex)       np.particleConvex   (bi,si,xiw,aiw, bj,sj,xjw,ajw);
                    else if(sj instanceof Capsule)      np.particleCapsule  (bi,si,xiw,aiw, bj,sj,xjw,ajw);

                } else if(si instanceof Plane){
                         if(sj instanceof Circle)       np.circlePlane   (bj,sj,xjw,ajw, bi,si,xiw,aiw);
                    else if(sj instanceof Particle)     np.particlePlane (bj,sj,xjw,ajw, bi,si,xiw,aiw);
                    else if(sj instanceof Rectangle)    np.convexPlane   (bj,sj,xjw,ajw, bi,si,xiw,aiw);
                    else if(sj instanceof Convex)       np.convexPlane   (bj,sj,xjw,ajw, bi,si,xiw,aiw);
                    else if(sj instanceof Line)         np.planeLine     (bi,si,xiw,aiw, bj,sj,xjw,ajw);
                    else if(sj instanceof Capsule)      np.capsulePlane  (bj,sj,xjw,ajw, bi,si,xiw,aiw);

                } else if(si instanceof Rectangle){
                         if(sj instanceof Plane)        np.convexPlane    (bi,si,xiw,aiw, bj,sj,xjw,ajw);
                    else if(sj instanceof Circle)       np.circleConvex   (bj,sj,xjw,ajw, bi,si,xiw,aiw);
                    else if(sj instanceof Rectangle)    np.convexConvex   (bj,sj,xjw,ajw, bi,si,xiw,aiw);
                    else if(sj instanceof Convex)       np.convexConvex   (bj,sj,xjw,ajw, bi,si,xiw,aiw);
                    else if(sj instanceof Particle)     np.particleConvex (bj,sj,xjw,ajw, bi,si,xiw,aiw);

                } else if(si instanceof Convex){
                         if(sj instanceof Plane)        np.convexPlane    (bi,si,xiw,aiw, bj,sj,xjw,ajw);
                    else if(sj instanceof Circle)       np.circleConvex   (bj,sj,xjw,ajw, bi,si,xiw,aiw);
                    else if(sj instanceof Rectangle)    np.convexConvex   (bj,sj,xjw,ajw, bi,si,xiw,aiw);
                    else if(sj instanceof Convex)       np.convexConvex   (bi,si,xiw,aiw, bj,sj,xjw,ajw);
                    else if(sj instanceof Particle)     np.particleConvex (bj,sj,xjw,ajw, bi,si,xiw,aiw);

                } else if(si instanceof Line){
                         if(sj instanceof Circle)       np.circleLine     (bj,sj,xjw,ajw, bi,si,xiw,aiw);
                    else if(sj instanceof Plane)        np.planeLine      (bj,sj,xjw,ajw, bi,si,xiw,aiw);

                } else if(si instanceof Capsule){
                         if(sj instanceof Plane)        np.capsulePlane   (bi,si,xiw,aiw, bj,sj,xjw,ajw);
                         if(sj instanceof Circle)       np.circleCapsule  (bj,sj,xjw,ajw, bi,si,xiw,aiw);
                         if(sj instanceof Particle)     np.particleCapsule(bj,sj,xjw,ajw, bi,si,xiw,aiw);

                }
            }
        }
    }

    // Add contact equations to solver
    for(var i=0, Ncontacts=np.contactEquations.length; i!==Ncontacts; i++){
        solver.addEquation(np.contactEquations[i]);
    }
    for(var i=0, Nfriction=np.frictionEquations.length; i!==Nfriction; i++){
        solver.addEquation(np.frictionEquations[i]);
    }

    // Add user-defined constraint equations
    var Nconstraints = constraints.length;
    for(i=0; i!==Nconstraints; i++){
        var c = constraints[i];
        c.update();
        for(var j=0, Neq=c.equations.length; j!==Neq; j++){
            var eq = c.equations[j];
            solver.addEquation(eq);
        }
    }
    solver.solve(dt,this);

    solver.removeAllEquations();

    // Step forward
    for(var i=0; i!==Nbodies; i++){
        var body = bodies[i];

        if(body.mass>0){
            var minv = body.invMass,
                f = body.force,
                pos = body.position,
                velo = body.velocity;

            // Angular step
            body.angularVelocity += body.angularForce * body.invInertia * dt;
            body.angle += body.angularVelocity * dt;

            // Linear step
            scale(fhMinv,f,dt*minv);
            add(velo,fhMinv,velo);
            scale(velodt,velo,dt);
            add(pos,pos,velodt);
        }
    }

    // Reset force
    for(var i=0; i!==Nbodies; i++){
        var bi = bodies[i];
        vec2.set(bi.force,0.0,0.0);
        bi.angularForce = 0.0;
    }

    if(doProfiling){
        t1 = now();
        that.lastStepTime = t1-t0;
    }

    this.emit(this.postStepEvent);
};

/**
 * Add a spring to the simulation
 *
 * @method addSpring
 * @param {Spring} s
 */
World.prototype.addSpring = function(s){
    this.springs.push(s);
    this.addSpringEvent.spring = s;
    this.emit(this.addSpringEvent);
};

/**
 * Remove a spring
 *
 * @method removeSpring
 * @param {Spring} s
 */
World.prototype.removeSpring = function(s){
    var idx = this.springs.indexOf(s);
    if(idx===-1)
        this.springs.splice(idx,1);
};

/**
 * Add a body to the simulation
 *
 * @method addBody
 * @param {Body} body
 */
World.prototype.addBody = function(body){
    this.bodies.push(body);
    this.addBodyEvent.body = body;
    this.emit(this.addBodyEvent);
};

/**
 * Remove a body from the simulation
 *
 * @method removeBody
 * @param {Body} body
 */
World.prototype.removeBody = function(body){
    var idx = this.bodies.indexOf(body);
    if(idx!==-1)
        this.bodies.splice(idx,1);
};

/**
 * Convert the world to a JSON-serializable Object.
 *
 * @method toJSON
 * @return {Object}
 */
World.prototype.toJSON = function(){
    var json = {
        p2 : pkg.version.split(".").slice(0,2).join("."), // "X.Y"
        bodies : [],
        springs : [],
        solver : {},
        gravity : v2a(this.gravity),
        broadphase : {},
        constraints : [],
    };

    // Serialize springs
    for(var i=0; i<this.springs.length; i++){
        var s = this.springs[i];
        json.springs.push({
            bodyA : this.bodies.indexOf(s.bodyA),
            bodyB : this.bodies.indexOf(s.bodyB),
            stiffness : s.stiffness,
            damping : s.damping,
            restLength : s.restLength,
            localAnchorA : v2a(s.localAnchorA),
            localAnchorB : v2a(s.localAnchorB),
        });
    }

    // Serialize constraints
    for(var i=0; i<this.constraints.length; i++){
        var c = this.constraints[i];
        var jc = {
            bodyA : this.bodies.indexOf(c.bodyA),
            bodyB : this.bodies.indexOf(c.bodyB),
        }
        if(c instanceof DistanceConstraint){
            jc.type = "DistanceConstraint";
            jc.distance = c.distance;
        } else if(c instanceof PointToPointConstraint){
            jc.type = "PointToPointConstraint";
            jc.pivotA = v2a(c.pivotA);
            jc.pivotB = v2a(c.pivotB);
            jc.maxForce = c.maxForce;
        } else if(c instanceof PrismaticConstraint){
            jc.type = "PrismaticConstraint";
            jc.localAxisA = v2a(c.localAxisA);
            jc.localAxisB = v2a(c.localAxisB);
            jc.maxForce = c.maxForce;
        } else {
            console.error("Constraint not supported yet!");
            continue;
        }

        json.constraints.push(jc);
    }

    // Serialize bodies
    for(var i=0; i<this.bodies.length; i++){
        var b = this.bodies[i],
            ss = b.shapes,
            jsonShapes = [];

        for(var j=0; j<ss.length; j++){
            var s = ss[j],
                jsonShape;

            // Check type
            if(s instanceof Circle){
                jsonShape = {
                    type : "Circle",
                    radius : s.radius,
                };
            } else if(s instanceof Plane){
                jsonShape = { type : "Plane", };
            } else if(s instanceof Particle){
                jsonShape = { type : "Particle", };
            } else if(s instanceof Line){
                jsonShape = {   type : "Line",
                                length : s.length };
            } else if(s instanceof Rectangle){
                jsonShape = {   type : "Rectangle",
                                width : s.width,
                                height : s.height };
            } else if(s instanceof Convex){
                var verts = [];
                for(var k=0; k<s.vertices.length; k++)
                    verts.push(v2a(s.vertices[k]));
                jsonShape = {   type : "Convex",
                                verts : verts };
            } else if(s instanceof Capsule){
                jsonShape = {   type : "Capsule",
                                length : s.length,
                                radius : s.radius };
            } else {
                throw new Error("Shape type not supported yet!");
            }

            jsonShape.offset = v2a(b.shapeOffsets[j] || [0,0]);
            jsonShape.angle = b.shapeAngles[j] || 0;
            jsonShape.collisionGroup = s.collisionGroup;
            jsonShape.collisionMask = s.collisionMask;

            jsonShapes.push(jsonShape);
        }
        json.bodies.push({
            mass : b.mass,
            angle : b.angle,
            position : v2a(b.position),
            velocity : v2a(b.velocity),
            angularVelocity : b.angularVelocity,
            force : v2a(b.force),
            shapes : jsonShapes,
        });
    }

    return json;

    function v2a(v){
        return [v[0],v[1]];
    }
};

/**
 * Load a scene from a serialized state.
 *
 * @method fromJSON
 * @param  {Object} json
 * @return {Boolean} True on success, else false.
 */
World.prototype.fromJSON = function(json){
    this.clear();

    if(!json.p2)
        return false;

    switch(json.p2){

        case "0.2":

            // Set gravity
            vec2.copy(this.gravity, json.gravity);

            // Load bodies
            for(var i=0; i<json.bodies.length; i++){
                var jb = json.bodies[i],
                    jss = jb.shapes;

                var b = new Body({
                    mass :              jb.mass,
                    position :          jb.position,
                    angle :             jb.angle,
                    velocity :          jb.velocity,
                    angularVelocity :   jb.angularVelocity,
                    force :             jb.force,
                });

                for(var j=0; j<jss.length; j++){
                    var shape, js=jss[j];

                    switch(js.type){
                        case "Circle":      shape = new Circle(js.radius);              break;
                        case "Plane":       shape = new Plane();                        break;
                        case "Particle":    shape = new Particle();                     break;
                        case "Line":        shape = new Line(js.length);                break;
                        case "Rectangle":   shape = new Rectangle(js.width,js.height);  break;
                        case "Convex":      shape = new Convex(js.verts);               break;
                        case "Capsule":     shape = new Capsule(js.length, js.radius);  break;
                        default:
                            throw new Error("Shape type not supported: "+js.type);
                            break;
                    }
                    shape.collisionMask = js.collisionMask;
                    shape.collisionGroup = js.collisionGroup;
                    b.addShape(shape,js.offset,js.angle);
                }

                this.addBody(b);
            }

            // Load springs
            for(var i=0; i<json.springs.length; i++){
                var js = json.springs[i];
                var s = new Spring(this.bodies[js.bodyA], this.bodies[js.bodyB], {
                    stiffness : js.stiffness,
                    damping : js.damping,
                    restLength : js.restLength,
                    localAnchorA : js.localAnchorA,
                    localAnchorB : js.localAnchorB,
                });
                this.addSpring(s);
            }

            // Load constraints
            for(var i=0; i<json.constraints.length; i++){
                var jc = json.constraints[i],
                    c;
                switch(jc.type){
                    case "DistanceConstraint":
                        c = new DistanceConstraint(this.bodies[jc.bodyA], this.bodies[jc.bodyB], jc.distance);
                        break;
                    case "PointToPointConstraint":
                        c = new PointToPointConstraint(this.bodies[jc.bodyA], jc.pivotA, this.bodies[jc.bodyB], jc.pivotB, jc.maxForce);
                        break;
                    case "PrismaticConstraint":
                        c = new PrismaticConstraint(this.bodies[jc.bodyA], this.bodies[jc.bodyB], {
                            maxForce : jc.maxForce,
                            localAxisA : jc.localAxisA,
                            localAxisB : jc.localAxisB,
                        });
                        break;
                    default:
                        throw new Error("Constraint type not recognized: "+jc.type);
                }
                this.addConstraint(c);
            }

            break;

        default:
            return false;
            break;
    }

    return true;
};

/**
 * Resets the World, removes all bodies, constraints and springs.
 *
 * @method clear
 */
World.prototype.clear = function(){

    // Remove all constraints
    var cs = this.constraints;
    for(var i=cs.length-1; i>=0; i--){
        this.removeConstraint(cs[i]);
    }

    // Remove all bodies
    var bodies = this.bodies;
    for(var i=bodies.length-1; i>=0; i--){
        this.removeBody(bodies[i]);
    }

    // Remove all springs
    var springs = this.springs;
    for(var i=springs.length-1; i>=0; i--){
        this.removeSpring(springs[i]);
    }
};

/**
 * Get a copy of this World instance
 * @method clone
 * @return {World}
 */
World.prototype.clone = function(){
    var world = new World();
    world.fromJSON(this.toJSON());
    return world;
};

var hitTest_tmp1 = vec2.create(),
    hitTest_zero = vec2.fromValues(0,0),
    hitTest_tmp2 = vec2.fromValues(0,0);

/**
 * Test if a world point overlaps bodies
 * @method hitTest
 * @param  {Array}  worldPoint  Point to use for intersection tests
 * @param  {Array}  bodies      A list of objects to check for intersection
 * @param  {Number} precision   Used for matching against particles and lines. Adds some margin to these infinitesimal objects.
 * @return {Array}              Array of bodies that overlap the point
 */
World.prototype.hitTest = function(worldPoint,bodies,precision){
    precision = precision || 0;

    // Create a dummy particle body with a particle shape to test against the bodies
    var pb = new Body({ position:worldPoint }),
        ps = new Particle(),
        px = worldPoint,
        pa = 0,
        x = hitTest_tmp1,
        zero = hitTest_zero,
        tmp = hitTest_tmp2;
    pb.addShape(ps);

    var n = this.nearphase,
        result = [];

    // Check bodies
    for(var i=0, N=bodies.length; i!==N; i++){
        var b = bodies[i];
        for(var j=0, NS=b.shapes.length; j!==NS; j++){
            var s = b.shapes[j],
                offset = b.shapeOffsets[j] || zero,
                angle = b.shapeAngles[j] || 0.0;

            // Get shape world position + angle
            vec2.rotate(x, offset, b.angle);
            vec2.add(x, x, b.position);
            var a = angle + b.angle;

            if( (s instanceof Circle    && n.circleParticle  (b,s,x,a,     pb,ps,px,pa, true)) ||
                (s instanceof Convex    && n.particleConvex  (pb,ps,px,pa, b,s,x,a,     true)) ||
                (s instanceof Plane     && n.particlePlane   (pb,ps,px,pa, b,s,x,a,     true)) ||
                (s instanceof Capsule   && n.particleCapsule (pb,ps,px,pa, b,s,x,a,     true)) ||
                (s instanceof Particle  && vec2.squaredLength(vec2.sub(tmp,x,worldPoint)) < precision*precision)
                ){
                result.push(b);
            }
        }
    }

    return result;
};

},{"../../package.json":2,"../solver/GSSolver":16,"../collision/NaiveBroadphase":20,"../math/vec2":33,"../shapes/Circle":6,"../shapes/Rectangle":25,"../shapes/Convex":10,"../shapes/Line":18,"../shapes/Plane":22,"../shapes/Capsule":5,"../shapes/Particle":21,"../events/EventEmitter":13,"../objects/Body":3,"../objects/Spring":30,"../constraints/DistanceConstraint":11,"../constraints/PointToPointConstraint":23,"../constraints/PrismaticConstraint":24,"../collision/Broadphase":4,"../collision/Nearphase":34}],32:[function(require,module,exports){
var Plane = require("../shapes/Plane");
var Broadphase = require("../collision/Broadphase");

module.exports = {
    QuadTree : QuadTree,
    Node : Node,
    BoundsNode : BoundsNode,
};

/**
 * QuadTree data structure. See https://github.com/mikechambers/ExamplesByMesh/tree/master/JavaScript/QuadTree
 * @class QuadTree
 * @constructor
 * @param {Object} An object representing the bounds of the top level of the QuadTree. The object
 * should contain the following properties : x, y, width, height
 * @param {Boolean} pointQuad Whether the QuadTree will contain points (true), or items with bounds
 * (width / height)(false). Default value is false.
 * @param {Number} maxDepth The maximum number of levels that the quadtree will create. Default is 4.
 * @param {Number} maxChildren The maximum number of children that a node can contain before it is split into sub-nodes.
 */
function QuadTree(bounds, pointQuad, maxDepth, maxChildren){
    var node;
    if(pointQuad){
        node = new Node(bounds, 0, maxDepth, maxChildren);
    } else {
        node = new BoundsNode(bounds, 0, maxDepth, maxChildren);
    }

    /**
     * The root node of the QuadTree which covers the entire area being segmented.
     * @property root
     * @type Node
     */
    this.root = node;
}

/**
 * Inserts an item into the QuadTree.
 * @method insert
 * @param {Object|Array} item The item or Array of items to be inserted into the QuadTree. The item should expose x, y
 * properties that represents its position in 2D space.
 */
QuadTree.prototype.insert = function(item){
    if(item instanceof Array){
        var len = item.length;
        for(var i = 0; i < len; i++){
            this.root.insert(item[i]);
        }
    } else {
        this.root.insert(item);
    }
}

/**
 * Clears all nodes and children from the QuadTree
 * @method clear
 */
QuadTree.prototype.clear = function(){
    this.root.clear();
}

/**
 * Retrieves all items / points in the same node as the specified item / point. If the specified item
 * overlaps the bounds of a node, then all children in both nodes will be returned.
 * @method retrieve
 * @param {Object} item An object representing a 2D coordinate point (with x, y properties), or a shape
 * with dimensions (x, y, width, height) properties.
 */
QuadTree.prototype.retrieve = function(item){
    //get a copy of the array of items
    var out = this.root.retrieve(item).slice(0);
    return out;
}

QuadTree.prototype.getCollisionPairs = function(world){

    var result = [];

    // Add all bodies
    this.insert(world.bodies);

    /*
    console.log("bodies",world.bodies.length);
    console.log("maxDepth",this.root.maxDepth,"maxChildren",this.root.maxChildren);
    */

    for(var i=0; i!==world.bodies.length; i++){
        var b = world.bodies[i],
            items = this.retrieve(b);

        //console.log("items",items.length);

        // Check results
        for(var j=0, len=items.length; j!==len; j++){
            var item = items[j];

            if(b === item) continue; // Do not add self

            // Check if they were already added
            var found = false;
            for(var k=0, numAdded=result.length; k<numAdded; k+=2){
                var r1 = result[k],
                    r2 = result[k+1];
                if( (r1==item && r2==b) || (r2==item && r1==b) ){
                    found = true;
                    break;
                }
            }
            if(!found && Broadphase.bodiesCollide(b,item)){
                result.push(b,item);
            }
        }
    }

    //console.log("results",result.length);

    // Clear until next
    this.clear();

    return result;
};

function Node(bounds, depth, maxDepth, maxChildren){
    this.bounds = bounds;
    this.children = [];
    this.nodes = [];

    if(maxChildren){
        this.maxChildren = maxChildren;
    }

    if(maxDepth){
        this.maxDepth = maxDepth;
    }

    if(depth){
        this.depth = depth;
    }
}

//subnodes
Node.prototype.classConstructor = Node;

//children contained directly in the node
Node.prototype.children = null;

//read only
Node.prototype.depth = 0;

Node.prototype.maxChildren = 4;
Node.prototype.maxDepth = 4;

Node.TOP_LEFT = 0;
Node.TOP_RIGHT = 1;
Node.BOTTOM_LEFT = 2;
Node.BOTTOM_RIGHT = 3;

Node.prototype.insert = function(item){
    if(this.nodes.length){
        var index = this.findIndex(item);
        this.nodes[index].insert(item);
        return;
    }

    this.children.push(item);

    var len = this.children.length;
    if(!(this.depth >= this.maxDepth) && len > this.maxChildren) {
        this.subdivide();

        for(var i = 0; i < len; i++){
            this.insert(this.children[i]);
        }

        this.children.length = 0;
    }
}

Node.prototype.retrieve = function(item){
    if(this.nodes.length){
        var index = this.findIndex(item);
        return this.nodes[index].retrieve(item);
    }

    return this.children;
}

Node.prototype.findIndex = function(item){
    var b = this.bounds;
    var left = (item.position[0]-item.boundingRadius > b.x + b.width  / 2) ? false : true;
    var top =  (item.position[1]-item.boundingRadius > b.y + b.height / 2) ? false : true;

    if(item instanceof Plane){
        left = top = false; // Will overlap the left/top boundary since it is infinite
    }

    //top left
    var index = Node.TOP_LEFT;
    if(left){
        if(!top){
            index = Node.BOTTOM_LEFT;
        }
    } else {
        if(top){
            index = Node.TOP_RIGHT;
        } else {
            index = Node.BOTTOM_RIGHT;
        }
    }

    return index;
}


Node.prototype.subdivide = function(){
    var depth = this.depth + 1;

    var bx = this.bounds.x;
    var by = this.bounds.y;

    //floor the values
    var b_w_h = (this.bounds.width / 2);
    var b_h_h = (this.bounds.height / 2);
    var bx_b_w_h = bx + b_w_h;
    var by_b_h_h = by + b_h_h;

    //top left
    this.nodes[Node.TOP_LEFT] = new this.classConstructor({
        x:bx,
        y:by,
        width:b_w_h,
        height:b_h_h
    },
    depth);

    //top right
    this.nodes[Node.TOP_RIGHT] = new this.classConstructor({
        x:bx_b_w_h,
        y:by,
        width:b_w_h,
        height:b_h_h
    },
    depth);

    //bottom left
    this.nodes[Node.BOTTOM_LEFT] = new this.classConstructor({
        x:bx,
        y:by_b_h_h,
        width:b_w_h,
        height:b_h_h
    },
    depth);


    //bottom right
    this.nodes[Node.BOTTOM_RIGHT] = new this.classConstructor({
        x:bx_b_w_h,
        y:by_b_h_h,
        width:b_w_h,
        height:b_h_h
    },
    depth);
}

Node.prototype.clear = function(){
    this.children.length = 0;

    var len = this.nodes.length;
    for(var i = 0; i < len; i++){
        this.nodes[i].clear();
    }

    this.nodes.length = 0;
}


// BoundsQuadTree

function BoundsNode(bounds, depth, maxChildren, maxDepth){
    Node.call(this, bounds, depth, maxChildren, maxDepth);
    this.stuckChildren = [];
}

BoundsNode.prototype = new Node();
BoundsNode.prototype.classConstructor = BoundsNode;
BoundsNode.prototype.stuckChildren = null;

//we use this to collect and conctenate items being retrieved. This way
//we dont have to continuously create new Array instances.
//Note, when returned from QuadTree.retrieve, we then copy the array
BoundsNode.prototype.out = [];

BoundsNode.prototype.insert = function(item){
    if(this.nodes.length){
        var index = this.findIndex(item);
        var node = this.nodes[index];

        /*
        console.log("radius:",item.boundingRadius);
        console.log("item x:",item.position[0] - item.boundingRadius,"x range:",node.bounds.x,node.bounds.x+node.bounds.width);
        console.log("item y:",item.position[1] - item.boundingRadius,"y range:",node.bounds.y,node.bounds.y+node.bounds.height);
        */

        //todo: make _bounds bounds
        if( !(item instanceof Plane) && // Plane is infinite.. Make it a "stuck" child
            item.position[0] - item.boundingRadius >= node.bounds.x &&
            item.position[0] + item.boundingRadius <= node.bounds.x + node.bounds.width &&
            item.position[1] - item.boundingRadius >= node.bounds.y &&
            item.position[1] + item.boundingRadius <= node.bounds.y + node.bounds.height){
            this.nodes[index].insert(item);
        } else {
            this.stuckChildren.push(item);
        }

        return;
    }

    this.children.push(item);

    var len = this.children.length;

    if(this.depth < this.maxDepth && len > this.maxChildren){
        this.subdivide();

        for(var i=0; i<len; i++){
            this.insert(this.children[i]);
        }

        this.children.length = 0;
    }
}

BoundsNode.prototype.getChildren = function(){
    return this.children.concat(this.stuckChildren);
}

BoundsNode.prototype.retrieve = function(item){
    var out = this.out;
    out.length = 0;

    if(this.nodes.length){
        var index = this.findIndex(item);
        out.push.apply(out, this.nodes[index].retrieve(item));
    }

    out.push.apply(out, this.stuckChildren);
    out.push.apply(out, this.children);

    return out;
}

BoundsNode.prototype.clear = function(){

    this.stuckChildren.length = 0;

    //array
    this.children.length = 0;

    var len = this.nodes.length;

    if(!len){
        return;
    }

    for(var i = 0; i < len; i++){
        this.nodes[i].clear();
    }

    //array
    this.nodes.length = 0;

    //we could call the super clear function but for now, im just going to inline it
    //call the hidden super.clear, and make sure its called with this = this instance
    //Object.getPrototypeOf(BoundsNode.prototype).clear.call(this);
}


},{"../shapes/Plane":22,"../collision/Broadphase":4}],33:[function(require,module,exports){
/**
 * The vec2 object from glMatrix, extended with the functions documented here. See http://glmatrix.net for full doc.
 * @class vec2
 */

// Only import vec2 from gl-matrix and skip the rest
var vec2 = require('../../node_modules/gl-matrix/src/gl-matrix/vec2').vec2;

// Now add some extensions

/**
 * Get the vector x component
 * @method getX
 * @static
 * @param  {Float32Array} a
 * @return {Number}
 */
vec2.getX = function(a){
    return a[0];
};

/**
 * Get the vector y component
 * @method getY
 * @static
 * @param  {Float32Array} a
 * @return {Number}
 */
vec2.getY = function(a){
    return a[1];
};

/**
 * Make a cross product and only return the z component
 * @method crossLength
 * @static
 * @param  {Float32Array} a
 * @param  {Float32Array} b
 * @return {Number}
 */
vec2.crossLength = function(a,b){
    return a[0] * b[1] - a[1] * b[0];
};

/**
 * Cross product between a vector and the Z component of a vector
 * @method crossVZ
 * @static
 * @param  {Float32Array} out
 * @param  {Float32Array} vec
 * @param  {Number} zcomp
 * @return {Number}
 */
vec2.crossVZ = function(out, vec, zcomp){
    vec2.rotate(out,vec,-Math.PI/2);// Rotate according to the right hand rule
    vec2.scale(out,out,zcomp);      // Scale with z
    return out;
};

/**
 * Cross product between a vector and the Z component of a vector
 * @method crossZV
 * @static
 * @param  {Float32Array} out
 * @param  {Number} zcomp
 * @param  {Float32Array} vec
 * @return {Number}
 */
vec2.crossZV = function(out, zcomp, vec){
    vec2.rotate(out,vec,Math.PI/2); // Rotate according to the right hand rule
    vec2.scale(out,out,zcomp);      // Scale with z
    return out;
};

/**
 * Rotate a vector by an angle
 * @method rotate
 * @static
 * @param  {Float32Array} out
 * @param  {Float32Array} a
 * @param  {Number} angle
 */
vec2.rotate = function(out,a,angle){
    var c = Math.cos(angle),
        s = Math.sin(angle),
        x = a[0],
        y = a[1];
    out[0] = c*x -s*y;
    out[1] = s*x +c*y;
};

vec2.toLocalFrame = function(out, worldPoint, framePosition, frameAngle){
    vec2.copy(out, worldPoint);
    vec2.sub(out, out, framePosition);
    vec2.rotate(out, out, -frameAngle);
};

vec2.toGlobalFrame = function(out, localPoint, framePosition, frameAngle){
    vec2.copy(out, localPoint);
    vec2.rotate(out, out, frameAngle);
    vec2.add(out, out, framePosition);
};

/**
 * Compute centroid of a triangle spanned by vectors a,b,c. See http://easycalculation.com/analytical/learn-centroid.php
 * @method centroid
 * @static
 * @param  {Float32Array} out
 * @param  {Float32Array} a
 * @param  {Float32Array} b
 * @param  {Float32Array} c
 * @return  {Float32Array} The out object
 */
vec2.centroid = function(out, a, b, c){
    vec2.add(out, a, b);
    vec2.add(out, out, c);
    vec2.scale(out, out, 1/3);
    return out;
};

// Export everything
module.exports = vec2;

},{"../../node_modules/gl-matrix/src/gl-matrix/vec2":38}],36:[function(require,module,exports){

    /*
        PolyK library
        url: http://polyk.ivank.net
        Released under MIT licence.

        Copyright (c) 2012 Ivan Kuckir

        Permission is hereby granted, free of charge, to any person
        obtaining a copy of this software and associated documentation
        files (the "Software"), to deal in the Software without
        restriction, including without limitation the rights to use,
        copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the
        Software is furnished to do so, subject to the following
        conditions:

        The above copyright notice and this permission notice shall be
        included in all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
        EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
        OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
        NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
        HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
        WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
        OTHER DEALINGS IN THE SOFTWARE.
    */

    var PolyK = {};

    /*
        Is Polygon self-intersecting?

        O(n^2)
    */
    /*
    PolyK.IsSimple = function(p)
    {
        var n = p.length>>1;
        if(n<4) return true;
        var a1 = new PolyK._P(), a2 = new PolyK._P();
        var b1 = new PolyK._P(), b2 = new PolyK._P();
        var c = new PolyK._P();

        for(var i=0; i<n; i++)
        {
            a1.x = p[2*i  ];
            a1.y = p[2*i+1];
            if(i==n-1)  { a2.x = p[0    ];  a2.y = p[1    ]; }
            else        { a2.x = p[2*i+2];  a2.y = p[2*i+3]; }

            for(var j=0; j<n; j++)
            {
                if(Math.abs(i-j) < 2) continue;
                if(j==n-1 && i==0) continue;
                if(i==n-1 && j==0) continue;

                b1.x = p[2*j  ];
                b1.y = p[2*j+1];
                if(j==n-1)  { b2.x = p[0    ];  b2.y = p[1    ]; }
                else        { b2.x = p[2*j+2];  b2.y = p[2*j+3]; }

                if(PolyK._GetLineIntersection(a1,a2,b1,b2,c) != null) return false;
            }
        }
        return true;
    }

    PolyK.IsConvex = function(p)
    {
        if(p.length<6) return true;
        var l = p.length - 4;
        for(var i=0; i<l; i+=2)
            if(!PolyK._convex(p[i], p[i+1], p[i+2], p[i+3], p[i+4], p[i+5])) return false;
        if(!PolyK._convex(p[l  ], p[l+1], p[l+2], p[l+3], p[0], p[1])) return false;
        if(!PolyK._convex(p[l+2], p[l+3], p[0  ], p[1  ], p[2], p[3])) return false;
        return true;
    }
    */
    PolyK.GetArea = function(p)
    {
        if(p.length <6) return 0;
        var l = p.length - 2;
        var sum = 0;
        for(var i=0; i<l; i+=2)
            sum += (p[i+2]-p[i]) * (p[i+1]+p[i+3]);
        sum += (p[0]-p[l]) * (p[l+1]+p[1]);
        return - sum * 0.5;
    }
    /*
    PolyK.GetAABB = function(p)
    {
        var minx = Infinity;
        var miny = Infinity;
        var maxx = -minx;
        var maxy = -miny;
        for(var i=0; i<p.length; i+=2)
        {
            minx = Math.min(minx, p[i  ]);
            maxx = Math.max(maxx, p[i  ]);
            miny = Math.min(miny, p[i+1]);
            maxy = Math.max(maxy, p[i+1]);
        }
        return {x:minx, y:miny, width:maxx-minx, height:maxy-miny};
    }
    */

    PolyK.Triangulate = function(p)
    {
        var n = p.length>>1;
        if(n<3) return [];
        var tgs = [];
        var avl = [];
        for(var i=0; i<n; i++) avl.push(i);

        var i = 0;
        var al = n;
        while(al > 3)
        {
            var i0 = avl[(i+0)%al];
            var i1 = avl[(i+1)%al];
            var i2 = avl[(i+2)%al];

            var ax = p[2*i0],  ay = p[2*i0+1];
            var bx = p[2*i1],  by = p[2*i1+1];
            var cx = p[2*i2],  cy = p[2*i2+1];

            var earFound = false;
            if(PolyK._convex(ax, ay, bx, by, cx, cy))
            {
                earFound = true;
                for(var j=0; j<al; j++)
                {
                    var vi = avl[j];
                    if(vi==i0 || vi==i1 || vi==i2) continue;
                    if(PolyK._PointInTriangle(p[2*vi], p[2*vi+1], ax, ay, bx, by, cx, cy)) {earFound = false; break;}
                }
            }
            if(earFound)
            {
                tgs.push(i0, i1, i2);
                avl.splice((i+1)%al, 1);
                al--;
                i= 0;
            }
            else if(i++ > 3*al) break;      // no convex angles :(
        }
        tgs.push(avl[0], avl[1], avl[2]);
        return tgs;
    }
    /*
    PolyK.ContainsPoint = function(p, px, py)
    {
        var n = p.length>>1;
        var ax, ay, bx = p[2*n-2]-px, by = p[2*n-1]-py;
        var depth = 0;
        for(var i=0; i<n; i++)
        {
            ax = bx;  ay = by;
            bx = p[2*i  ] - px;
            by = p[2*i+1] - py;
            if(ay< 0 && by< 0) continue;    // both "up" or both "donw"
            if(ay>=0 && by>=0) continue;    // both "up" or both "donw"
            if(ax< 0 && bx< 0) continue;

            var lx = ax + (bx-ax)*(-ay)/(by-ay);
            if(lx>0) depth++;
        }
        return (depth & 1) == 1;
    }

    PolyK.Slice = function(p, ax, ay, bx, by)
    {
        if(PolyK.ContainsPoint(p, ax, ay) || PolyK.ContainsPoint(p, bx, by)) return [p.slice(0)];

        var a = new PolyK._P(ax, ay);
        var b = new PolyK._P(bx, by);
        var iscs = [];  // intersections
        var ps = [];    // points
        for(var i=0; i<p.length; i+=2) ps.push(new PolyK._P(p[i], p[i+1]));

        for(var i=0; i<ps.length; i++)
        {
            var isc = new PolyK._P(0,0);
            isc = PolyK._GetLineIntersection(a, b, ps[i], ps[(i+1)%ps.length], isc);

            if(isc)
            {
                isc.flag = true;
                iscs.push(isc);
                ps.splice(i+1,0,isc);
                i++;
            }
        }
        if(iscs.length == 0) return [p.slice(0)];
        var comp = function(u,v) {return PolyK._P.dist(a,u) - PolyK._P.dist(a,v); }
        iscs.sort(comp);

        var pgs = [];
        var dir = 0;
        while(iscs.length > 0)
        {
            var n = ps.length;
            var i0 = iscs[0];
            var i1 = iscs[1];
            var ind0 = ps.indexOf(i0);
            var ind1 = ps.indexOf(i1);
            var solved = false;

            if(PolyK._firstWithFlag(ps, ind0) == ind1) solved = true;
            else
            {
                i0 = iscs[1];
                i1 = iscs[0];
                ind0 = ps.indexOf(i0);
                ind1 = ps.indexOf(i1);
                if(PolyK._firstWithFlag(ps, ind0) == ind1) solved = true;
            }
            if(solved)
            {
                dir--;
                var pgn = PolyK._getPoints(ps, ind0, ind1);
                pgs.push(pgn);
                ps = PolyK._getPoints(ps, ind1, ind0);
                i0.flag = i1.flag = false;
                iscs.splice(0,2);
                if(iscs.length == 0) pgs.push(ps);
            }
            else { dir++; iscs.reverse(); }
            if(dir>1) break;
        }
        var result = [];
        for(var i=0; i<pgs.length; i++)
        {
            var pg = pgs[i];
            var npg = [];
            for(var j=0; j<pg.length; j++) npg.push(pg[j].x, pg[j].y);
            result.push(npg);
        }
        return result;
    }

    PolyK.Raycast = function(p, x, y, dx, dy, isc)
    {
        var l = p.length - 2;
        var tp = PolyK._tp;
        var a1 = tp[0], a2 = tp[1],
        b1 = tp[2], b2 = tp[3], c = tp[4];
        a1.x = x; a1.y = y;
        a2.x = x+dx; a2.y = y+dy;

        if(isc==null) isc = {dist:0, edge:0, norm:{x:0, y:0}, refl:{x:0, y:0}};
        isc.dist = Infinity;

        for(var i=0; i<l; i+=2)
        {
            b1.x = p[i  ];  b1.y = p[i+1];
            b2.x = p[i+2];  b2.y = p[i+3];
            var nisc = PolyK._RayLineIntersection(a1, a2, b1, b2, c);
            if(nisc) PolyK._updateISC(dx, dy, a1, b1, b2, c, i/2, isc);
        }
        b1.x = b2.x;  b1.y = b2.y;
        b2.x = p[0];  b2.y = p[1];
        var nisc = PolyK._RayLineIntersection(a1, a2, b1, b2, c);
        if(nisc) PolyK._updateISC(dx, dy, a1, b1, b2, c, p.length/2, isc);

        return (isc.dist != Infinity) ? isc : null;
    }

    PolyK.ClosestEdge = function(p, x, y, isc)
    {
        var l = p.length - 2;
        var tp = PolyK._tp;
        var a1 = tp[0],
        b1 = tp[2], b2 = tp[3], c = tp[4];
        a1.x = x; a1.y = y;

        if(isc==null) isc = {dist:0, edge:0, point:{x:0, y:0}, norm:{x:0, y:0}};
        isc.dist = Infinity;

        for(var i=0; i<l; i+=2)
        {
            b1.x = p[i  ];  b1.y = p[i+1];
            b2.x = p[i+2];  b2.y = p[i+3];
            PolyK._pointLineDist(a1, b1, b2, i>>1, isc);
        }
        b1.x = b2.x;  b1.y = b2.y;
        b2.x = p[0];  b2.y = p[1];
        PolyK._pointLineDist(a1, b1, b2, l>>1, isc);

        var idst = 1/isc.dist;
        isc.norm.x = (x-isc.point.x)*idst;
        isc.norm.y = (y-isc.point.y)*idst;
        return isc;
    }

    PolyK._pointLineDist = function(p, a, b, edge, isc)
    {
        var x = p.x, y = p.y, x1 = a.x, y1 = a.y, x2 = b.x, y2 = b.y;

        var A = x - x1;
        var B = y - y1;
        var C = x2 - x1;
        var D = y2 - y1;

        var dot = A * C + B * D;
        var len_sq = C * C + D * D;
        var param = dot / len_sq;

        var xx, yy;

        if (param < 0 || (x1 == x2 && y1 == y2)) {
            xx = x1;
            yy = y1;
        }
        else if (param > 1) {
            xx = x2;
            yy = y2;
        }
        else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }

        var dx = x - xx;
        var dy = y - yy;
        var dst = Math.sqrt(dx * dx + dy * dy);
        if(dst<isc.dist)
        {
            isc.dist = dst;
            isc.edge = edge;
            isc.point.x = xx;
            isc.point.y = yy;
        }
    }

    PolyK._updateISC = function(dx, dy, a1, b1, b2, c, edge, isc)
    {
        var nrl = PolyK._P.dist(a1, c);
        if(nrl<isc.dist)
        {
            var ibl = 1/PolyK._P.dist(b1, b2);
            var nx = -(b2.y-b1.y)*ibl;
            var ny =  (b2.x-b1.x)*ibl;
            var ddot = 2*(dx*nx+dy*ny);
            isc.dist = nrl;
            isc.norm.x = nx;
            isc.norm.y = ny;
            isc.refl.x = -ddot*nx+dx;
            isc.refl.y = -ddot*ny+dy;
            isc.edge = edge;
        }
    }

    PolyK._getPoints = function(ps, ind0, ind1)
    {
        var n = ps.length;
        var nps = [];
        if(ind1<ind0) ind1 += n;
        for(var i=ind0; i<= ind1; i++) nps.push(ps[i%n]);
        return nps;
    }

    PolyK._firstWithFlag = function(ps, ind)
    {
        var n = ps.length;
        while(true)
        {
            ind = (ind+1)%n;
            if(ps[ind].flag) return ind;
        }
    }
    */
    PolyK._PointInTriangle = function(px, py, ax, ay, bx, by, cx, cy)
    {
        var v0x = cx-ax;
        var v0y = cy-ay;
        var v1x = bx-ax;
        var v1y = by-ay;
        var v2x = px-ax;
        var v2y = py-ay;

        var dot00 = v0x*v0x+v0y*v0y;
        var dot01 = v0x*v1x+v0y*v1y;
        var dot02 = v0x*v2x+v0y*v2y;
        var dot11 = v1x*v1x+v1y*v1y;
        var dot12 = v1x*v2x+v1y*v2y;

        var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
        var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

        // Check if point is in triangle
        return (u >= 0) && (v >= 0) && (u + v < 1);
    }
    /*
    PolyK._RayLineIntersection = function(a1, a2, b1, b2, c)
    {
        var dax = (a1.x-a2.x), dbx = (b1.x-b2.x);
        var day = (a1.y-a2.y), dby = (b1.y-b2.y);

        var Den = dax*dby - day*dbx;
        if (Den == 0) return null;  // parallel

        var A = (a1.x * a2.y - a1.y * a2.x);
        var B = (b1.x * b2.y - b1.y * b2.x);

        var I = c;
        var iDen = 1/Den;
        I.x = ( A*dbx - dax*B ) * iDen;
        I.y = ( A*dby - day*B ) * iDen;

        if(!PolyK._InRect(I, b1, b2)) return null;
        if((day>0 && I.y>a1.y) || (day<0 && I.y<a1.y)) return null;
        if((dax>0 && I.x>a1.x) || (dax<0 && I.x<a1.x)) return null;
        return I;
    }

    PolyK._GetLineIntersection = function(a1, a2, b1, b2, c)
    {
        var dax = (a1.x-a2.x), dbx = (b1.x-b2.x);
        var day = (a1.y-a2.y), dby = (b1.y-b2.y);

        var Den = dax*dby - day*dbx;
        if (Den == 0) return null;  // parallel

        var A = (a1.x * a2.y - a1.y * a2.x);
        var B = (b1.x * b2.y - b1.y * b2.x);

        var I = c;
        I.x = ( A*dbx - dax*B ) / Den;
        I.y = ( A*dby - day*B ) / Den;

        if(PolyK._InRect(I, a1, a2) && PolyK._InRect(I, b1, b2)) return I;
        return null;
    }

    PolyK._InRect = function(a, b, c)
    {
        if  (b.x == c.x) return (a.y>=Math.min(b.y, c.y) && a.y<=Math.max(b.y, c.y));
        if  (b.y == c.y) return (a.x>=Math.min(b.x, c.x) && a.x<=Math.max(b.x, c.x));

        if(a.x >= Math.min(b.x, c.x) && a.x <= Math.max(b.x, c.x)
        && a.y >= Math.min(b.y, c.y) && a.y <= Math.max(b.y, c.y))
        return true;
        return false;
    }
    */
    PolyK._convex = function(ax, ay, bx, by, cx, cy)
    {
        return (ay-by)*(cx-bx) + (bx-ax)*(cy-by) >= 0;
    }
    /*
    PolyK._P = function(x,y)
    {
        this.x = x;
        this.y = y;
        this.flag = false;
    }
    PolyK._P.prototype.toString = function()
    {
        return "Point ["+this.x+", "+this.y+"]";
    }
    PolyK._P.dist = function(a,b)
    {
        var dx = b.x-a.x;
        var dy = b.y-a.y;
        return Math.sqrt(dx*dx + dy*dy);
    }

    PolyK._tp = [];
    for(var i=0; i<10; i++) PolyK._tp.push(new PolyK._P(0,0));
        */

module.exports = PolyK;

},{}],37:[function(require,module,exports){
module.exports = Island;

/**
 * An island of bodies connected with equations.
 * @class Island
 * @constructor
 */
function Island(){

    /**
     * Current equations in this island.
     * @property equations
     * @type {Array}
     */
    this.equations = [];

    /**
     * Current bodies in this island.
     * @property bodies
     * @type {Array}
     */
    this.bodies = [];
}

/**
 * Clean this island from bodies and equations.
 * @method reset
 */
Island.prototype.reset = function(){
    this.equations.length = this.bodies.length = 0;
}


/**
 * Get all unique bodies in this island.
 * @method getBodies
 * @return {Array} An array of Body
 */
Island.prototype.getBodies = function(){
    var bodies = [],
        bodyIds = [],
        eqs = this.equations;
    for(var i=0; i!==eqs.length; i++){
        var eq = eqs[i];
        if(bodyIds.indexOf(eq.bi.id)===-1){
            bodies.push(eq.bi);
            bodyIds.push(eq.bi.id);
        }
        if(bodyIds.indexOf(eq.bj.id)===-1){
            bodies.push(eq.bj);
            bodyIds.push(eq.bj.id);
        }
    }
    return bodies;
};

/**
 * Solves all constraints in the group of islands.
 * @method solve
 * @param  {Number} dt
 * @param  {Solver} solver
 */
Island.prototype.solve = function(dt,solver){
    var bodies = [];

    solver.removeAllEquations();

    // Add equations to solver
    var numEquations = this.equations.length;
    for(var j=0; j!==numEquations; j++){
        solver.addEquation(this.equations[j]);
    }
    var islandBodies = this.getBodies();
    var numBodies = islandBodies.length;
    for(var j=0; j!==numBodies; j++){
        bodies.push(islandBodies[j]);
    }

    // Solve
    solver.solve(dt,{bodies:bodies});
};

},{}],38:[function(require,module,exports){
/* Copyright (c) 2012, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */
var vec2 = {};

if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}
 
/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    return new Float32Array(2);
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new Float32Array(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new Float32Array(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {vec2} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Caclulates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Caclulates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Caclulates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = x * m[0] + y * m[1];
    out[1] = x * m[2] + y * m[3];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = new Float32Array(2);

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec2 = vec2;
}

},{}],34:[function(require,module,exports){
var vec2 = require('../math/vec2')
,   sub = vec2.sub
,   add = vec2.add
,   dot = vec2.dot
,   ContactEquation = require('../constraints/ContactEquation')
,   FrictionEquation = require('../constraints/FrictionEquation')
,   Circle = require('../shapes/Circle')

module.exports = Nearphase;

// Temp things
var yAxis = vec2.fromValues(0,1);

var tmp1 = vec2.fromValues(0,0)
,   tmp2 = vec2.fromValues(0,0)
,   tmp3 = vec2.fromValues(0,0)
,   tmp4 = vec2.fromValues(0,0)
,   tmp5 = vec2.fromValues(0,0)
,   tmp6 = vec2.fromValues(0,0)
,   tmp7 = vec2.fromValues(0,0)
,   tmp8 = vec2.fromValues(0,0)
,   tmp9 = vec2.fromValues(0,0)
,   tmp10 = vec2.fromValues(0,0)
,   tmp11 = vec2.fromValues(0,0)
,   tmp12 = vec2.fromValues(0,0)
,   tmp13 = vec2.fromValues(0,0)
,   tmp14 = vec2.fromValues(0,0)
,   tmp15 = vec2.fromValues(0,0)

/**
 * Nearphase. Creates contacts and friction given shapes and transforms.
 * @class Nearphase
 * @constructor
 */
function Nearphase(){
    this.contactEquations = [];
    this.frictionEquations = [];
    this.enableFriction = true;
    this.slipForce = 10.0;
    this.reuseObjects = true;
    this.reusableContactEquations = [];
    this.reusableFrictionEquations = [];
};

/**
 * Throws away the old equatons and gets ready to create new
 * @method reset
 */
Nearphase.prototype.reset = function(){
    if(this.reuseObjects){
        var ce = this.contactEquations,
            fe = this.frictionEquations,
            rfe = this.reusableFrictionEquations,
            rce = this.reusableContactEquations;
        for(var i=0, N=ce.length; i!==N; i++) rce.push(ce[i]);
        for(var i=0, N=fe.length; i!==N; i++) rfe.push(fe[i]);

    }

    // Reset
    this.contactEquations.length = this.frictionEquations.length = 0;
};

/**
 * Creates a ContactEquation, either by reusing an existing object or creating a new one.
 * @method createContactEquation
 * @param  {Body} bodyA
 * @param  {Body} bodyB
 * @return {ContactEquation}
 */
Nearphase.prototype.createContactEquation = function(bodyA,bodyB){
    var c = this.reusableContactEquations.length ? this.reusableContactEquations.pop() : new ContactEquation(bodyA,bodyB);
    c.bi = bodyA;
    c.bj = bodyB;
    return c;
};

/**
 * Creates a FrictionEquation, either by reusing an existing object or creating a new one.
 * @method createFrictionEquation
 * @param  {Body} bodyA
 * @param  {Body} bodyB
 * @return {FrictionEquation}
 */
Nearphase.prototype.createFrictionEquation = function(bodyA,bodyB){
    var c = this.reusableFrictionEquations.length ? this.reusableFrictionEquations.pop() : new FrictionEquation(bodyA,bodyB);
    c.bi = bodyA;
    c.bj = bodyB;
    c.setSlipForce(this.slipForce);
    return c;
};

/**
 * Creates a FrictionEquation given the data in the ContactEquation. Uses same offset vectors ri and rj, but the tangent vector will be constructed from the collision normal.
 * @method createFrictionFromContact
 * @param  {ContactEquation} contactEquation
 * @return {FrictionEquation}
 */
Nearphase.prototype.createFrictionFromContact = function(c){
    var eq = this.createFrictionEquation(c.bi,c.bj);
    vec2.copy(eq.ri, c.ri);
    vec2.copy(eq.rj, c.rj);
    vec2.rotate(eq.t, c.ni, -Math.PI / 2);
    return eq;
}

/**
 * Plane/line nearphase
 * @method planeLine
 * @param  {Body} bi
 * @param  {Plane} si
 * @param  {Array} xi
 * @param  {Number} ai
 * @param  {Body} bj
 * @param  {Line} sj
 * @param  {Array} xj
 * @param  {Number} aj
 */
Nearphase.prototype.planeLine = function(bi,si,xi,ai, bj,sj,xj,aj){
    var lineShape = sj,
        lineAngle = aj,
        lineBody = bj,
        lineOffset = xj,
        planeOffset = xi,
        planeAngle = ai,
        planeBody = bi,
        planeShape = si;

    var worldVertex0 = tmp1,
        worldVertex1 = tmp2,
        worldVertex01 = tmp3,
        worldVertex11 = tmp4,
        worldEdge = tmp5,
        worldEdgeUnit = tmp6,
        dist = tmp7,
        worldNormal = tmp8,
        worldTangent = tmp9;

    // Get start and end points
    vec2.set(worldVertex0, -lineShape.length/2, 0);
    vec2.set(worldVertex1,  lineShape.length/2, 0);

    // Not sure why we have to use worldVertex*1 here, but it won't work otherwise. Tired.
    vec2.rotate(worldVertex01, worldVertex0, lineAngle);
    vec2.rotate(worldVertex11, worldVertex1, lineAngle);

    add(worldVertex01, worldVertex01, lineOffset);
    add(worldVertex11, worldVertex11, lineOffset);

    vec2.copy(worldVertex0,worldVertex01);
    vec2.copy(worldVertex1,worldVertex11);

    // Get vector along the line
    sub(worldEdge, worldVertex1, worldVertex0);
    vec2.normalize(worldEdgeUnit, worldEdge);

    // Get tangent to the edge.
    vec2.rotate(worldTangent, worldEdgeUnit, -Math.PI/2);

    vec2.rotate(worldNormal, yAxis, planeAngle);

    // Check line ends
    var verts = [worldVertex0, worldVertex1];
    for(var i=0; i<verts.length; i++){
        var v = verts[i];

        sub(dist, v, planeOffset);

        var d = dot(dist,worldNormal);

        if(d < 0){

            var c = this.createContactEquation(planeBody,lineBody);

            vec2.copy(c.ni, worldNormal);
            vec2.normalize(c.ni,c.ni);

            // distance vector along plane normal
            vec2.scale(dist, worldNormal, d);

            // Vector from plane center to contact
            sub(c.ri, v, dist);
            sub(c.ri, c.ri, planeBody.position);

            // From line center to contact
            sub(c.rj, v,    lineOffset);
            add(c.rj, c.rj, lineOffset);
            sub(c.rj, c.rj, lineBody.position);

            this.contactEquations.push(c);

            // TODO : only need one friction equation if both points touch
            if(this.enableFriction){
                this.frictionEquations.push(this.createFrictionFromContact(c));
            }
        }
    }
};

Nearphase.prototype.particleCapsule = function(bi,si,xi,ai, bj,sj,xj,aj, justTest){
    return this.circleLine(bi,si,xi,ai, bj,sj,xj,aj, justTest, sj.radius, 0);
};

/**
 * Circle/line nearphase
 * @method circleLine
 * @param  {Body} bi
 * @param  {Circle} si
 * @param  {Array} xi
 * @param  {Number} ai
 * @param  {Body} bj
 * @param  {Line} sj
 * @param  {Array} xj
 * @param  {Number} aj
 * @param {Boolean} justTest If set to true, this function will return the result (intersection or not) without adding equations.
 * @param {Number} lineRadius Radius to add to the line. Can be used to test Capsules.
 * @param {Number} circleRadius If set, this value overrides the circle shape radius.
 */
Nearphase.prototype.circleLine = function(bi,si,xi,ai, bj,sj,xj,aj, justTest, lineRadius, circleRadius){
    var lineShape = sj,
        lineAngle = aj,
        lineBody = bj,
        lineOffset = xj,
        circleOffset = xi,
        circleBody = bi,
        circleShape = si,

        lineRadius = lineRadius || 0,
        circleRadius = typeof(circleRadius)!="undefined" ? circleRadius : circleShape.radius,

        orthoDist = tmp1,
        lineToCircleOrthoUnit = tmp2,
        projectedPoint = tmp3,
        centerDist = tmp4,
        worldTangent = tmp5,
        worldEdge = tmp6,
        worldEdgeUnit = tmp7,
        worldVertex0 = tmp8,
        worldVertex1 = tmp9,
        worldVertex01 = tmp10,
        worldVertex11 = tmp11,
        dist = tmp12,
        lineToCircle = tmp13,
        lineEndToLineRadius = tmp14;

    // Get start and end points
    vec2.set(worldVertex0, -lineShape.length/2, 0);
    vec2.set(worldVertex1,  lineShape.length/2, 0);

    // Not sure why we have to use worldVertex*1 here, but it won't work otherwise. Tired.
    vec2.rotate(worldVertex01, worldVertex0, lineAngle);
    vec2.rotate(worldVertex11, worldVertex1, lineAngle);

    add(worldVertex01, worldVertex01, lineOffset);
    add(worldVertex11, worldVertex11, lineOffset);

    vec2.copy(worldVertex0,worldVertex01);
    vec2.copy(worldVertex1,worldVertex11);

    // Get vector along the line
    sub(worldEdge, worldVertex1, worldVertex0);
    vec2.normalize(worldEdgeUnit, worldEdge);

    // Get tangent to the edge.
    vec2.rotate(worldTangent, worldEdgeUnit, -Math.PI/2);

    // Check distance from the plane spanned by the edge vs the circle
    sub(dist, circleOffset, worldVertex0);
    var d = dot(dist, worldTangent); // Distance from center of line to circle center
    sub(centerDist, worldVertex0, lineOffset);

    sub(lineToCircle, circleOffset, lineOffset);

    if(Math.abs(d) < circleRadius+lineRadius){

        // Now project the circle onto the edge
        vec2.scale(orthoDist, worldTangent, d);
        sub(projectedPoint, circleOffset, orthoDist);

        // Add the missing line radius
        vec2.scale(lineToCircleOrthoUnit, worldTangent, dot(worldTangent, lineToCircle));
        vec2.normalize(lineToCircleOrthoUnit,lineToCircleOrthoUnit);
        vec2.scale(lineToCircleOrthoUnit, lineToCircleOrthoUnit, lineRadius);
        add(projectedPoint,projectedPoint,lineToCircleOrthoUnit);

        // Check if the point is within the edge span
        var pos =  dot(worldEdgeUnit, projectedPoint);
        var pos0 = dot(worldEdgeUnit, worldVertex0);
        var pos1 = dot(worldEdgeUnit, worldVertex1);

        if(pos > pos0 && pos < pos1){
            // We got contact!

            if(justTest) return true;

            var c = this.createContactEquation(circleBody,lineBody);

            vec2.scale(c.ni, orthoDist, -1);
            vec2.normalize(c.ni, c.ni);

            vec2.scale( c.ri, c.ni,  circleRadius);
            add(c.ri, c.ri, circleOffset);
            sub(c.ri, c.ri, circleBody.position);

            sub(c.rj, projectedPoint, lineOffset);
            add(c.rj, c.rj, lineOffset);
            sub(c.rj, c.rj, lineBody.position);

            this.contactEquations.push(c);

            if(this.enableFriction){
                this.frictionEquations.push(this.createFrictionFromContact(c));
            }

            return true;
        }
    }

    // Add corner
    var verts = [worldVertex0, worldVertex1];

    for(var i=0; i<verts.length; i++){
        var v = verts[i];

        sub(dist, v, circleOffset);

        if(vec2.squaredLength(dist) < (circleRadius+lineRadius)*(circleRadius+lineRadius)){

            if(justTest) return true;

            var c = this.createContactEquation(circleBody,lineBody);

            vec2.copy(c.ni, dist);
            vec2.normalize(c.ni,c.ni);

            // Vector from circle to contact point is the normal times the circle radius
            vec2.scale(c.ri, c.ni, circleRadius);
            add(c.ri, c.ri, circleOffset);
            sub(c.ri, c.ri, circleBody.position);

            sub(c.rj, v, lineOffset);
            vec2.scale(lineEndToLineRadius, c.ni, -lineRadius);
            add(c.rj, c.rj, lineEndToLineRadius);
            add(c.rj, c.rj, lineOffset);
            sub(c.rj, c.rj, lineBody.position);

            this.contactEquations.push(c);

            if(this.enableFriction){
                this.frictionEquations.push(this.createFrictionFromContact(c));
            }

            return true;
        }
    }

    return false;
};

/**
 * Circle/capsule nearphase
 * @method circleCapsule
 * @param  {Body}   bi
 * @param  {Circle} si
 * @param  {Array}  xi
 * @param  {Number} ai
 * @param  {Body}   bj
 * @param  {Line}   sj
 * @param  {Array}  xj
 * @param  {Number} aj
 */
Nearphase.prototype.circleCapsule = function(bi,si,xi,ai, bj,sj,xj,aj, justTest){
    return this.circleLine(bi,si,xi,ai, bj,sj,xj,aj, justTest, sj.radius);
};

/**
 * Circle/convex nearphase
 * @method circleConvex
 * @param  {Body} bi
 * @param  {Circle} si
 * @param  {Array} xi
 * @param  {Number} ai
 * @param  {Body} bj
 * @param  {Convex} sj
 * @param  {Array} xj
 * @param  {Number} aj
 */
Nearphase.prototype.circleConvex = function(  bi,si,xi,ai, bj,sj,xj,aj){
    var convexShape = sj,
        convexAngle = aj,
        convexBody = bj,
        convexOffset = xj,
        circleOffset = xi,
        circleBody = bi,
        circleShape = si;

    var worldVertex0 = tmp1,
        worldVertex1 = tmp2,
        worldEdge = tmp3,
        worldEdgeUnit = tmp4,
        worldTangent = tmp5,
        centerDist = tmp6,
        convexToCircle = tmp7,
        orthoDist = tmp8,
        projectedPoint = tmp9,
        dist = tmp10,
        worldVertex = tmp11;

    var numReported = 0;

    verts = convexShape.vertices;

    // Check all edges first
    for(var i=0; i<verts.length; i++){
        var v0 = verts[i],
            v1 = verts[(i+1)%verts.length];

        vec2.rotate(worldVertex0, v0, convexAngle);
        vec2.rotate(worldVertex1, v1, convexAngle);
        add(worldVertex0, worldVertex0, convexOffset);
        add(worldVertex1, worldVertex1, convexOffset);
        sub(worldEdge, worldVertex1, worldVertex0);

        vec2.normalize(worldEdgeUnit, worldEdge);

        // Get tangent to the edge. Points out of the Convex
        vec2.rotate(worldTangent, worldEdgeUnit, -Math.PI/2);

        // Check distance from the plane spanned by the edge vs the circle
        sub(dist, circleOffset, worldVertex0);
        var d = dot(dist, worldTangent);
        sub(centerDist, worldVertex0, convexOffset);

        sub(convexToCircle, circleOffset, convexOffset);

        if(d < circleShape.radius && dot(centerDist,convexToCircle) > 0){

            // Now project the circle onto the edge
            vec2.scale(orthoDist, worldTangent, d);
            sub(projectedPoint, circleOffset, orthoDist);

            // Check if the point is within the edge span
            var pos =  dot(worldEdgeUnit, projectedPoint);
            var pos0 = dot(worldEdgeUnit, worldVertex0);
            var pos1 = dot(worldEdgeUnit, worldVertex1);

            if(pos > pos0 && pos < pos1){
                // We got contact!

                var c = this.createContactEquation(circleBody,convexBody);

                vec2.scale(c.ni, orthoDist, -1);
                vec2.normalize(c.ni, c.ni);

                vec2.scale( c.ri, c.ni,  circleShape.radius);
                add(c.ri, c.ri, circleOffset);
                sub(c.ri, c.ri, circleBody.position);

                sub( c.rj, projectedPoint, convexOffset);
                add(c.rj, c.rj, convexOffset);
                sub(c.rj, c.rj, convexBody.position);

                this.contactEquations.push(c);

                if(this.enableFriction){
                    this.frictionEquations.push( this.createFrictionFromContact(c) );
                }

                return true;
            }
        }
    }

    // Check all vertices
    for(var i=0; i<verts.length; i++){
        var localVertex = verts[i];
        vec2.rotate(worldVertex, localVertex, convexAngle);
        add(worldVertex, worldVertex, convexOffset);

        sub(dist, worldVertex, circleOffset);
        if(vec2.squaredLength(dist) < circleShape.radius*circleShape.radius){

            var c = this.createContactEquation(circleBody,convexBody);

            vec2.copy(c.ni, dist);
            vec2.normalize(c.ni,c.ni);

            // Vector from circle to contact point is the normal times the circle radius
            vec2.scale(c.ri, c.ni, circleShape.radius);
            add(c.ri, c.ri, circleOffset);
            sub(c.ri, c.ri, circleBody.position);

            sub(c.rj, worldVertex, convexOffset);
            add(c.rj, c.rj, convexOffset);
            sub(c.rj, c.rj, convexBody.position);

            this.contactEquations.push(c);

            if(this.enableFriction){
                this.frictionEquations.push(this.createFrictionFromContact(c));
            }

            return true;
        }
    }
    return false;
};

/**
 * Particle/convex nearphase
 * @method particleConvex
 * @param  {Body} bi
 * @param  {Particle} si
 * @param  {Array} xi
 * @param  {Number} ai
 * @param  {Body} bj
 * @param  {Convex} sj
 * @param  {Array} xj
 * @param  {Number} aj
 */
Nearphase.prototype.particleConvex = function(  bi,si,xi,ai, bj,sj,xj,aj, justTest ){
    var convexShape = sj,
        convexAngle = aj,
        convexBody = bj,
        convexOffset = xj,
        particleOffset = xi,
        particleBody = bi,
        particleShape = si,
        worldVertex0 = tmp1,
        worldVertex1 = tmp2,
        worldEdge = tmp3,
        worldEdgeUnit = tmp4,
        worldTangent = tmp5,
        centerDist = tmp6,
        convexToparticle = tmp7,
        orthoDist = tmp8,
        projectedPoint = tmp9,
        dist = tmp10,
        worldVertex = tmp11,
        closestEdge = -1,
        closestEdgeDistance = null,
        closestEdgeOrthoDist = tmp12,
        closestEdgeProjectedPoint = tmp13;

    var numReported = 0;

    verts = convexShape.vertices;

    // Check all edges first
    for(var i=0; i<verts.length; i++){
        var v0 = verts[i],
            v1 = verts[(i+1)%verts.length];

        // Transform vertices to world
        vec2.rotate(worldVertex0, v0, convexAngle);
        vec2.rotate(worldVertex1, v1, convexAngle);
        add(worldVertex0, worldVertex0, convexOffset);
        add(worldVertex1, worldVertex1, convexOffset);

        // Get world edge
        sub(worldEdge, worldVertex1, worldVertex0);
        vec2.normalize(worldEdgeUnit, worldEdge);

        // Get tangent to the edge. Points out of the Convex
        vec2.rotate(worldTangent, worldEdgeUnit, -Math.PI/2);

        // Check distance from the infinite line (spanned by the edge) to the particle
        sub(dist, particleOffset, worldVertex0);
        var d = dot(dist, worldTangent);
        sub(centerDist, worldVertex0, convexOffset);

        sub(convexToparticle, particleOffset, convexOffset);

        if(d < 0 && dot(centerDist,convexToparticle) >= 0){

            // Now project the particle onto the edge
            vec2.scale(orthoDist, worldTangent, d);
            sub(projectedPoint, particleOffset, orthoDist);

            // Check if the point is within the edge span
            var pos =  dot(worldEdgeUnit, projectedPoint);
            var pos0 = dot(worldEdgeUnit, worldVertex0);
            var pos1 = dot(worldEdgeUnit, worldVertex1);

            if(pos > pos0 && pos < pos1){
                // We got contact!
                if(justTest) return true;

                if(closestEdgeDistance === null || d*d<closestEdgeDistance*closestEdgeDistance){
                    closestEdgeDistance = d;
                    closestEdge = i;
                    vec2.copy(closestEdgeOrthoDist, orthoDist);
                    vec2.copy(closestEdgeProjectedPoint, projectedPoint);
                }
            }
        }
    }

    if(closestEdge != -1){
        var c = this.createContactEquation(particleBody,convexBody);

        vec2.copy(c.ni, closestEdgeOrthoDist);
        vec2.normalize(c.ni, c.ni);

        vec2.set(c.ri,  0, 0);
        add(c.ri, c.ri, particleOffset);
        sub(c.ri, c.ri, particleBody.position);

        sub(c.rj, closestEdgeProjectedPoint, convexOffset);
        add(c.rj, c.rj, convexOffset);
        sub(c.rj, c.rj, convexBody.position);

        this.contactEquations.push(c);

        if(this.enableFriction)
            this.frictionEquations.push( this.createFrictionFromContact(c) );

        return true;
    }


    return false;
};

/**
 * Circle/circle nearphase
 * @method circleCircle
 * @param  {Body} bi
 * @param  {Circle} si
 * @param  {Array} xi
 * @param  {Number} ai
 * @param  {Body} bj
 * @param  {Circle} sj
 * @param  {Array} xj
 * @param  {Number} aj
 */
Nearphase.prototype.circleCircle = function(  bi,si,xi,ai, bj,sj,xj,aj, justTest){
    var bodyA = bi,
        shapeA = si,
        offsetA = xi,
        bodyB = bj,
        shapeB = sj,
        offsetB = xj,
        dist = tmp1;

    sub(dist,xi,xj);
    var r = si.radius + sj.radius;
    if(vec2.squaredLength(dist) > r*r){
        return false;
    }

    if(justTest) return true;

    var c = this.createContactEquation(bodyA,bodyB);
    sub(c.ni, offsetB, offsetA);
    vec2.normalize(c.ni,c.ni);

    vec2.scale( c.ri, c.ni,  shapeA.radius);
    vec2.scale( c.rj, c.ni, -shapeB.radius);

    add(c.ri, c.ri, offsetA);
    sub(c.ri, c.ri, bodyA.position);

    add(c.rj, c.rj, offsetB);
    sub(c.rj, c.rj, bodyB.position);

    this.contactEquations.push(c);

    if(this.enableFriction){
        this.frictionEquations.push(this.createFrictionFromContact(c));
    }
    return true;
};

/**
 * Convex/Plane nearphase
 * @method convexPlane
 * @param  {Body} bi
 * @param  {Convex} si
 * @param  {Array} xi
 * @param  {Number} ai
 * @param  {Body} bj
 * @param  {Plane} sj
 * @param  {Array} xj
 * @param  {Number} aj
 */
Nearphase.prototype.convexPlane = function( bi,si,xi,ai, bj,sj,xj,aj ){
    var convexBody = bi,
        convexOffset = xi,
        convexShape = si,
        convexAngle = ai,
        planeBody = bj,
        planeShape = sj,
        planeOffset = xj,
        planeAngle = aj;

    var worldVertex = tmp1,
        worldNormal = tmp2,
        dist = tmp3;

    var numReported = 0;
    vec2.rotate(worldNormal, yAxis, planeAngle);

    for(var i=0; i<si.vertices.length; i++){
        var v = si.vertices[i];
        vec2.rotate(worldVertex, v, convexAngle);
        add(worldVertex, worldVertex, convexOffset);

        sub(dist, worldVertex, planeOffset);

        if(dot(dist,worldNormal) < 0){

            // Found vertex
            numReported++;

            var c = this.createContactEquation(planeBody,convexBody);

            sub(dist, worldVertex, planeOffset);

            vec2.copy(c.ni, worldNormal);

            var d = dot(dist, c.ni);
            vec2.scale(dist, c.ni, d);

            // rj is from convex center to contact
            sub(c.rj, worldVertex, convexBody.position);


            // ri is from plane center to contact
            sub( c.ri, worldVertex, dist);
            sub( c.ri, c.ri, planeBody.position);

            this.contactEquations.push(c);

            // TODO: if we have 2 contacts, we do only need 1 friction equation

            if(this.enableFriction){
                this.frictionEquations.push(this.createFrictionFromContact(c));
            }

            if(numReported >= 2)
                break;
        }
    }
    return numReported > 0;
};

/**
 * Nearphase for particle vs plane
 * @method particlePlane
 * @param  {Body}       bi The particle body
 * @param  {Particle}   si Particle shape
 * @param  {Array}      xi World position for the particle
 * @param  {Number}     ai World angle for the particle
 * @param  {Body}       bj Plane body
 * @param  {Plane}      sj Plane shape
 * @param  {Array}      xj World position for the plane
 * @param  {Number}     aj World angle for the plane
 */
Nearphase.prototype.particlePlane = function( bi,si,xi,ai, bj,sj,xj,aj, justTest ){
    var particleBody = bi,
        particleShape = si,
        particleOffset = xi,
        planeBody = bj,
        planeShape = sj,
        planeOffset = xj,
        planeAngle = aj;

    var dist = tmp1,
        worldNormal = tmp2;

    planeAngle = planeAngle || 0;

    sub(dist, particleOffset, planeOffset);
    vec2.rotate(worldNormal, yAxis, planeAngle);

    var d = dot(dist, worldNormal);

    if(d > 0) return false;
    if(justTest) return true;

    var c = this.createContactEquation(planeBody,particleBody);

    vec2.copy(c.ni, worldNormal);
    vec2.scale( dist, c.ni, d );
    // dist is now the distance vector in the normal direction

    // ri is the particle position projected down onto the plane, from the plane center
    sub( c.ri, particleOffset, dist);
    sub( c.ri, c.ri, planeBody.position);

    // rj is from the body center to the particle center
    sub( c.rj, particleOffset, particleBody.position );

    this.contactEquations.push(c);

    if(this.enableFriction){
        this.frictionEquations.push(this.createFrictionFromContact(c));
    }
    return true;
};

/**
 * Circle/Particle nearphase
 * @method circleParticle
 * @param  {Body} bi
 * @param  {Circle} si
 * @param  {Array} xi
 * @param  {Number} ai
 * @param  {Body} bj
 * @param  {Particle} sj
 * @param  {Array} xj
 * @param  {Number} aj
 */
Nearphase.prototype.circleParticle = function(   bi,si,xi,ai, bj,sj,xj,aj, justTest ){
    var circleBody = bi,
        circleShape = si,
        circleOffset = xi,
        particleBody = bj,
        particleShape = sj,
        particleOffset = xj,
        dist = tmp1;

    sub(dist, particleOffset, circleOffset);
    if(vec2.squaredLength(dist) > circleShape.radius*circleShape.radius) return false;
    if(justTest) return true;

    var c = this.createContactEquation(circleBody,particleBody);
    vec2.copy(c.ni, dist);
    vec2.normalize(c.ni,c.ni);

    // Vector from circle to contact point is the normal times the circle radius
    vec2.scale(c.ri, c.ni, circleShape.radius);
    add(c.ri, c.ri, circleOffset);
    sub(c.ri, c.ri, circleBody.position);

    // Vector from particle center to contact point is zero
    sub(c.rj, particleOffset, particleBody.position);

    this.contactEquations.push(c);

    if(this.enableFriction){
        this.frictionEquations.push(this.createFrictionFromContact(c));
    }

    return true;
};

var capsulePlane_tmpCircle = new Circle(1),
    capsulePlane_tmp1 = vec2.create(),
    capsulePlane_tmp2 = vec2.create(),
    capsulePlane_tmp3 = vec2.create();
Nearphase.prototype.capsulePlane = function( bi,si,xi,ai, bj,sj,xj,aj ){
    var end1 = capsulePlane_tmp1,
        end2 = capsulePlane_tmp2,
        circle = capsulePlane_tmpCircle,
        dst = capsulePlane_tmp3;

    // Compute world end positions
    vec2.set(end1, -si.length/2, 0);
    vec2.rotate(end1,end1,ai);
    add(end1,end1,xi);

    vec2.set(end2,  si.length/2, 0);
    vec2.rotate(end2,end2,ai);
    add(end2,end2,xi);

    circle.radius = si.radius;

    // Do nearphase as two circles
    this.circlePlane(bi,circle,end1,0, bj,sj,xj,aj);
    this.circlePlane(bi,circle,end2,0, bj,sj,xj,aj);
};

/**
 * Creates ContactEquations and FrictionEquations for a collision.
 * @method circlePlane
 * @param  {Body}    bi     The first body that should be connected to the equations.
 * @param  {Circle}  si     The circle shape participating in the collision.
 * @param  {Array}   xi     Extra offset to take into account for the Shape, in addition to the one in circleBody.position. Will *not* be rotated by circleBody.angle (maybe it should, for sake of homogenity?). Set to null if none.
 * @param  {Body}    bj     The second body that should be connected to the equations.
 * @param  {Plane}   sj     The Plane shape that is participating
 * @param  {Array}   xj     Extra offset for the plane shape.
 * @param  {Number}  aj     Extra angle to apply to the plane
 */
Nearphase.prototype.circlePlane = function(   bi,si,xi,ai, bj,sj,xj,aj ){
    var circleBody = bi,
        circleShape = si,
        circleOffset = xi, // Offset from body center, rotated!
        planeBody = bj,
        shapeB = sj,
        planeOffset = xj,
        planeAngle = aj;

    planeAngle = planeAngle || 0;

    // Vector from plane to circle
    var planeToCircle = tmp1,
        worldNormal = tmp2,
        temp = tmp3;

    sub(planeToCircle, circleOffset, planeOffset);

    // World plane normal
    vec2.rotate(worldNormal, yAxis, planeAngle);

    // Normal direction distance
    var d = dot(worldNormal, planeToCircle);

    if(d > circleShape.radius) return false; // No overlap. Abort.

    // Create contact
    var contact = this.createContactEquation(planeBody,circleBody);

    // ni is the plane world normal
    vec2.copy(contact.ni, worldNormal);

    // rj is the vector from circle center to the contact point
    vec2.scale(contact.rj, contact.ni, -circleShape.radius);
    add(contact.rj, contact.rj, circleOffset);
    sub(contact.rj, contact.rj, circleBody.position);

    // ri is the distance from plane center to contact.
    vec2.scale(temp, contact.ni, d);
    sub(contact.ri, planeToCircle, temp ); // Subtract normal distance vector from the distance vector
    add(contact.ri, contact.ri, planeOffset);
    sub(contact.ri, contact.ri, planeBody.position);

    this.contactEquations.push(contact);

    if(this.enableFriction){
        this.frictionEquations.push( this.createFrictionFromContact(contact) );
    }

    return true;
};


/**
 * Convex/convex nearphase.See <a href="http://www.altdevblogaday.com/2011/05/13/contact-generation-between-3d-convex-meshes/">this article</a> for more info.
 * @method convexConvex
 * @param  {Body} bi
 * @param  {Convex} si
 * @param  {Array} xi
 * @param  {Number} ai
 * @param  {Body} bj
 * @param  {Convex} sj
 * @param  {Array} xj
 * @param  {Number} aj
 */
Nearphase.prototype.convexConvex = function(  bi,si,xi,ai, bj,sj,xj,aj ){
    var sepAxis = tmp1,
        worldPoint = tmp2,
        worldPoint0 = tmp3,
        worldPoint1 = tmp4,
        worldEdge = tmp5,
        projected = tmp6,
        penetrationVec = tmp7,
        dist = tmp8,
        worldNormal = tmp9;

    var found = Nearphase.findSeparatingAxis(si,xi,ai,sj,xj,aj,sepAxis);
    if(!found) return false;

    // Make sure the separating axis is directed from shape i to shape j
    sub(dist,xj,xi);
    if(dot(sepAxis,dist) > 0){
        vec2.scale(sepAxis,sepAxis,-1);
    }

    // Find edges with normals closest to the separating axis
    var closestEdge1 = Nearphase.getClosestEdge(si,ai,sepAxis,true), // Flipped axis
        closestEdge2 = Nearphase.getClosestEdge(sj,aj,sepAxis);

    if(closestEdge1==-1 || closestEdge2==-1) return false;

    // Loop over the shapes
    for(var k=0; k<2; k++){

        var closestEdgeA = closestEdge1,
            closestEdgeB = closestEdge2,
            shapeA =  si, shapeB =  sj,
            offsetA = xi, offsetB = xj,
            angleA = ai, angleB = aj,
            bodyA = bi, bodyB = bj;

        if(k==0){
            // Swap!
            var tmp;
            tmp = closestEdgeA; closestEdgeA = closestEdgeB;    closestEdgeB = tmp;
            tmp = shapeA;       shapeA = shapeB;                shapeB = tmp;
            tmp = offsetA;      offsetA = offsetB;              offsetB = tmp;
            tmp = angleA;       angleA = angleB;                angleB = tmp;
            tmp = bodyA;        bodyA = bodyB;                  bodyB = tmp;
        }

        // Loop over 2 points in convex B
        for(var j=closestEdgeB; j<closestEdgeB+2; j++){

            // Get world point
            var v = shapeB.vertices[(j+shapeB.vertices.length)%shapeB.vertices.length];
            vec2.rotate(worldPoint, v, angleB);
            add(worldPoint, worldPoint, offsetB);

            var insideNumEdges = 0;

            // Loop over the 3 closest edges in convex A
            for(var i=closestEdgeA-1; i<closestEdgeA+2; i++){

                var v0 = shapeA.vertices[(i  +shapeA.vertices.length)%shapeA.vertices.length],
                    v1 = shapeA.vertices[(i+1+shapeA.vertices.length)%shapeA.vertices.length];

                // Construct the edge
                vec2.rotate(worldPoint0, v0, angleA);
                vec2.rotate(worldPoint1, v1, angleA);
                add(worldPoint0, worldPoint0, offsetA);
                add(worldPoint1, worldPoint1, offsetA);

                sub(worldEdge, worldPoint1, worldPoint0);

                vec2.rotate(worldNormal, worldEdge, -Math.PI/2); // Normal points out of convex 1
                vec2.normalize(worldNormal,worldNormal);

                sub(dist, worldPoint, worldPoint0);

                var d = dot(worldNormal,dist);

                if(d < 0){
                    insideNumEdges++;
                }
            }

            if(insideNumEdges == 3){

                // worldPoint was on the "inside" side of each of the 3 checked edges.
                // Project it to the center edge and use the projection direction as normal

                // Create contact
                var c = this.createContactEquation(bodyA,bodyB);

                // Get center edge from body A
                var v0 = shapeA.vertices[(closestEdgeA)   % shapeA.vertices.length],
                    v1 = shapeA.vertices[(closestEdgeA+1) % shapeA.vertices.length];

                // Construct the edge
                vec2.rotate(worldPoint0, v0, angleA);
                vec2.rotate(worldPoint1, v1, angleA);
                add(worldPoint0, worldPoint0, offsetA);
                add(worldPoint1, worldPoint1, offsetA);

                sub(worldEdge, worldPoint1, worldPoint0);

                vec2.rotate(c.ni, worldEdge, -Math.PI/2); // Normal points out of convex A
                vec2.normalize(c.ni,c.ni);

                sub(dist, worldPoint, worldPoint0); // From edge point to the penetrating point
                var d = dot(c.ni,dist);             // Penetration
                vec2.scale(penetrationVec, c.ni, d);     // Vector penetration


                sub(c.ri, worldPoint, offsetA);
                sub(c.ri, c.ri, penetrationVec);
                add(c.ri, c.ri, offsetA);
                sub(c.ri, c.ri, bodyA.position);

                sub(c.rj, worldPoint, offsetB);
                add(c.rj, c.rj, offsetB);
                sub(c.rj, c.rj, bodyB.position);

                this.contactEquations.push(c);

                // Todo reduce to 1 friction equation if we have 2 contact points
                if(this.enableFriction)
                    this.frictionEquations.push(this.createFrictionFromContact(c));
            }
        }
    }
};

// .projectConvex is called by other functions, need local tmp vectors
var pcoa_tmp1 = vec2.fromValues(0,0);

/**
 * Project a Convex onto a world-oriented axis
 * @method projectConvexOntoAxis
 * @static
 * @param  {Convex} convexShape
 * @param  {Array} convexOffset
 * @param  {Number} convexAngle
 * @param  {Array} worldAxis
 * @param  {Array} result
 */
Nearphase.projectConvexOntoAxis = function(convexShape, convexOffset, convexAngle, worldAxis, result){
    var max=null,
        min=null,
        v,
        value,
        localAxis = pcoa_tmp1;

    // Convert the axis to local coords of the body
    vec2.rotate(localAxis, worldAxis, -convexAngle);

    // Get projected position of all vertices
    for(var i=0; i<convexShape.vertices.length; i++){
        v = convexShape.vertices[i];
        value = dot(v,localAxis);
        if(max === null || value > max) max = value;
        if(min === null || value < min) min = value;
    }

    if(min > max){
        var t = min;
        min = max;
        max = t;
    }

    // Project the position of the body onto the axis - need to add this to the result
    var offset = dot(convexOffset, worldAxis);

    vec2.set( result, min + offset, max + offset);
};

// .findSeparatingAxis is called by other functions, need local tmp vectors
var fsa_tmp1 = vec2.fromValues(0,0)
,   fsa_tmp2 = vec2.fromValues(0,0)
,   fsa_tmp3 = vec2.fromValues(0,0)
,   fsa_tmp4 = vec2.fromValues(0,0)
,   fsa_tmp5 = vec2.fromValues(0,0)
,   fsa_tmp6 = vec2.fromValues(0,0)

/**
 * Find a separating axis between the shapes, that maximizes the separating distance between them.
 * @method findSeparatingAxis
 * @static
 * @param  {Convex}     c1
 * @param  {Array}      offset1
 * @param  {Number}     angle1
 * @param  {Convex}     c2
 * @param  {Array}      offset2
 * @param  {Number}     angle2
 * @param  {Array}      sepAxis     The resulting axis
 * @return {Boolean}                Whether the axis could be found.
 */
Nearphase.findSeparatingAxis = function(c1,offset1,angle1,c2,offset2,angle2,sepAxis){
    var maxDist = null,
        overlap = false,
        found = false,
        edge = fsa_tmp1,
        worldPoint0 = fsa_tmp2,
        worldPoint1 = fsa_tmp3,
        normal = fsa_tmp4,
        span1 = fsa_tmp5,
        span2 = fsa_tmp6;

    for(var j=0; j<2; j++){
        var c = c1,
            angle = angle1;
        if(j==1){
            c = c2;
            angle = angle2;
        }

        for(var i=0; i<c.vertices.length; i++){
            // Get the world edge
            vec2.rotate(worldPoint0, c.vertices[i], angle);
            vec2.rotate(worldPoint1, c.vertices[(i+1)%c.vertices.length], angle);

            sub(edge, worldPoint1, worldPoint0);

            // Get normal - just rotate 90 degrees since vertices are given in CCW
            vec2.rotate(normal, edge, -Math.PI / 2);
            vec2.normalize(normal,normal);

            // Project hulls onto that normal
            Nearphase.projectConvexOntoAxis(c1,offset1,angle1,normal,span1);
            Nearphase.projectConvexOntoAxis(c2,offset2,angle2,normal,span2);

            // Order by span position
            var a=span1,
                b=span2,
                swapped = false;
            if(span1[0] > span2[0]){
                b=span1;
                a=span2;
                swapped = true;
            }


            // Get separating distance
            var dist = b[0] - a[1];
            overlap = dist < 0;


            if(maxDist===null || dist > maxDist){
                vec2.copy(sepAxis, normal);
                maxDist = dist;
                found = overlap;
            }
        }
    }

    return found;
};

// .getClosestEdge is called by other functions, need local tmp vectors
var gce_tmp1 = vec2.fromValues(0,0)
,   gce_tmp2 = vec2.fromValues(0,0)
,   gce_tmp3 = vec2.fromValues(0,0)

/**
 * Get the edge that has a normal closest to an axis.
 * @method getClosestEdge
 * @static
 * @param  {Convex}     c
 * @param  {Number}     angle
 * @param  {Array}      axis
 * @param  {Boolean}    flip
 * @return {Number}             Index of the edge that is closest. This index and the next spans the resulting edge. Returns -1 if failed.
 */
Nearphase.getClosestEdge = function(c,angle,axis,flip){
    var localAxis = gce_tmp1,
        edge = gce_tmp2,
        normal = gce_tmp3;

    // Convert the axis to local coords of the body
    vec2.rotate(localAxis, axis, -angle);
    if(flip){
        vec2.scale(localAxis,localAxis,-1);
    }

    var closestEdge = -1;
    for(var i=0; i<c.vertices.length; i++){
        // Get the edge
        sub(edge, c.vertices[(i+1)%(c.vertices.length)], c.vertices[i%(c.vertices.length)]);

        // Get normal - just rotate 90 degrees since vertices are given in CCW
        vec2.rotate(normal, edge, -Math.PI / 2);
        vec2.normalize(normal,normal);

        var d = dot(normal,localAxis);
        if(closestEdge == -1 || d > maxDot){
            closestEdge = i % c.vertices.length;
            maxDot = d;
        }
    }

    return closestEdge;
};


},{"../math/vec2":33,"../constraints/ContactEquation":8,"../constraints/FrictionEquation":14,"../shapes/Circle":6}],35:[function(require,module,exports){
/**
 * The mat2 object from glMatrix, extended with the functions documented here. See http://glmatrix.net for full doc.
 * @class mat2
 */

// Only import mat2 from gl-matrix and skip the rest
var mat2 = require('../../node_modules/gl-matrix/src/gl-matrix/mat2').mat2;

// Export everything
module.exports = mat2;

},{"../../node_modules/gl-matrix/src/gl-matrix/mat2":39}],39:[function(require,module,exports){
/* Copyright (c) 2012, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x2 Matrix
 * @name mat2
 */
var mat2 = {};

var mat2Identity = new Float32Array([
    1, 0,
    0, 1
]);

if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    return new Float32Array(mat2Identity);
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new Float32Array(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Caclulates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a1 * b2;
    out[1] = a0 * b1 + a1 * b3;
    out[2] = a2 * b0 + a3 * b2;
    out[3] = a2 * b1 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {mat2} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a1 * s;
    out[1] = a0 * -s + a1 * c;
    out[2] = a2 *  c + a3 * s;
    out[3] = a2 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {mat2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v1;
    out[2] = a2 * v0;
    out[3] = a3 * v1;
    return out;
};

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat2 = mat2;
}

},{}]},{},[1])(1)
});
;