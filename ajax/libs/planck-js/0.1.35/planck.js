/*
 * Planck.js v0.1.35
 * 
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2013 Erin Catto  http://www.gphysics.com
 * 
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * 
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.planck=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.internal = {};

exports.Math = require("./common/Math");

exports.Vec2 = require("./common/Vec2");

exports.Transform = require("./common/Transform");

exports.Rot = require("./common/Rot");

exports.AABB = require("./collision/AABB");

exports.Shape = require("./Shape");

exports.Fixture = require("./Fixture");

exports.Body = require("./Body");

exports.Contact = require("./Contact");

exports.Joint = require("./Joint");

exports.World = require("./World");

exports.Circle = require("./shape/CircleShape");

exports.Edge = require("./shape/EdgeShape");

exports.Polygon = require("./shape/PolygonShape");

exports.Chain = require("./shape/ChainShape");

exports.Box = require("./shape/BoxShape");

require("./shape/CollideCircle");

require("./shape/CollideEdgeCircle");

exports.internal.CollidePolygons = require("./shape/CollidePolygon");

require("./shape/CollideCirclePolygone");

require("./shape/CollideEdgePolygon");

exports.DistanceJoint = require("./joint/DistanceJoint");

exports.FrictionJoint = require("./joint/FrictionJoint");

exports.GearJoint = require("./joint/GearJoint");

exports.MotorJoint = require("./joint/MotorJoint");

exports.MouseJoint = require("./joint/MouseJoint");

exports.PrismaticJoint = require("./joint/PrismaticJoint");

exports.PulleyJoint = require("./joint/PulleyJoint");

exports.RevoluteJoint = require("./joint/RevoluteJoint");

exports.RopeJoint = require("./joint/RopeJoint");

exports.WeldJoint = require("./joint/WeldJoint");

exports.WheelJoint = require("./joint/WheelJoint");

exports.internal.Sweep = require("./common/Sweep");

exports.internal.stats = require("./common/stats");

exports.internal.Manifold = require("./Manifold");

exports.internal.Distance = require("./collision/Distance");

exports.internal.TimeOfImpact = require("./collision/TimeOfImpact");

exports.internal.DynamicTree = require("./collision/DynamicTree");

exports.internal.Settings = require("./Settings");
},{"./Body":2,"./Contact":3,"./Fixture":4,"./Joint":5,"./Manifold":6,"./Settings":7,"./Shape":8,"./World":10,"./collision/AABB":11,"./collision/Distance":13,"./collision/DynamicTree":14,"./collision/TimeOfImpact":15,"./common/Math":18,"./common/Rot":20,"./common/Sweep":21,"./common/Transform":22,"./common/Vec2":23,"./common/stats":26,"./joint/DistanceJoint":27,"./joint/FrictionJoint":28,"./joint/GearJoint":29,"./joint/MotorJoint":30,"./joint/MouseJoint":31,"./joint/PrismaticJoint":32,"./joint/PulleyJoint":33,"./joint/RevoluteJoint":34,"./joint/RopeJoint":35,"./joint/WeldJoint":36,"./joint/WheelJoint":37,"./shape/BoxShape":38,"./shape/ChainShape":39,"./shape/CircleShape":40,"./shape/CollideCircle":41,"./shape/CollideCirclePolygone":42,"./shape/CollideEdgeCircle":43,"./shape/CollideEdgePolygon":44,"./shape/CollidePolygon":45,"./shape/EdgeShape":46,"./shape/PolygonShape":47}],2:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Body;

var common = require("./util/common");

var options = require("./util/options");

var Vec2 = require("./common/Vec2");

var Rot = require("./common/Rot");

var Math = require("./common/Math");

var Sweep = require("./common/Sweep");

var Transform = require("./common/Transform");

var Velocity = require("./common/Velocity");

var Position = require("./common/Position");

var Fixture = require("./Fixture");

var Shape = require("./Shape");

var World = require("./World");

var staticBody = Body.STATIC = "static";

var kinematicBody = Body.KINEMATIC = "kinematic";

var dynamicBody = Body.DYNAMIC = "dynamic";

/**
 * @typedef {Object} BodyDef
 *
 * @prop type Body types are static, kinematic, or dynamic. Note: if a dynamic
 *       body would have zero mass, the mass is set to one.
 *
 * @prop position The world position of the body. Avoid creating bodies at the
 *       origin since this can lead to many overlapping shapes.
 *
 * @prop angle The world angle of the body in radians.
 *
 * @prop linearVelocity The linear velocity of the body's origin in world
 *       co-ordinates.
 *
 * @prop linearDamping Linear damping is use to reduce the linear velocity. The
 *       damping parameter can be larger than 1.0 but the damping effect becomes
 *       sensitive to the time step when the damping parameter is large.
 *
 * @prop angularDamping Angular damping is use to reduce the angular velocity.
 *       The damping parameter can be larger than 1.0 but the damping effect
 *       becomes sensitive to the time step when the damping parameter is large.
 *
 * @prop fixedRotation Should this body be prevented from rotating? Useful for
 *       characters.
 *
 * @prop bullet Is this a fast moving body that should be prevented from
 *       tunneling through other moving bodies? Note that all bodies are
 *       prevented from tunneling through kinematic and static bodies. This
 *       setting is only considered on dynamic bodies. Warning: You should use
 *       this flag sparingly since it increases processing time.
 *
 * @prop active Does this body start out active?
 *
 * @prop awake Is this body initially awake or sleeping?
 *
 * @prop allowSleep Set this flag to false if this body should never fall
 *       asleep. Note that this increases CPU usage.
 */
var BodyDef = {
    type: staticBody,
    position: Vec2.zero(),
    angle: 0,
    linearVelocity: Vec2.zero(),
    angularVelocity: 0,
    linearDamping: 0,
    angularDamping: 0,
    fixedRotation: false,
    bullet: false,
    gravityScale: 1,
    allowSleep: true,
    awake: true,
    active: true,
    userData: null
};

/**
 * @class
 * 
 * A rigid body composed of one or more fixtures.
 * 
 * @param {BodyDef} def
 */
function Body(world, def) {
    def = options(def, BodyDef);
    ASSERT && common.assert(Vec2.isValid(def.position));
    ASSERT && common.assert(Vec2.isValid(def.linearVelocity));
    ASSERT && common.assert(Math.isFinite(def.angle));
    ASSERT && common.assert(Math.isFinite(def.angularVelocity));
    ASSERT && common.assert(Math.isFinite(def.angularDamping) && def.angularDamping >= 0);
    ASSERT && common.assert(Math.isFinite(def.linearDamping) && def.linearDamping >= 0);
    this.m_world = world;
    this.m_awakeFlag = def.awake;
    this.m_autoSleepFlag = def.allowSleep;
    this.m_bulletFlag = def.bullet;
    this.m_fixedRotationFlag = def.fixedRotation;
    this.m_activeFlag = def.active;
    this.m_islandFlag = false;
    this.m_toiFlag = false;
    this.m_userData = def.userData;
    this.m_type = def.type;
    if (this.m_type == dynamicBody) {
        this.m_mass = 1;
        this.m_invMass = 1;
    } else {
        this.m_mass = 0;
        this.m_invMass = 0;
    }
    // Rotational inertia about the center of mass.
    this.m_I = 0;
    this.m_invI = 0;
    // the body origin transform
    this.m_xf = Transform.identity();
    this.m_xf.p = Vec2.clone(def.position);
    this.m_xf.q.setAngle(def.angle);
    // the swept motion for CCD
    this.m_sweep = new Sweep();
    this.m_sweep.setTransform(this.m_xf);
    // position and velocity correction
    this.c_velocity = new Velocity();
    this.c_position = new Position();
    this.m_force = Vec2.zero();
    this.m_torque = 0;
    this.m_linearVelocity = Vec2.clone(def.linearVelocity);
    this.m_angularVelocity = def.angularVelocity;
    this.m_linearDamping = def.linearDamping;
    this.m_angularDamping = def.angularDamping;
    this.m_gravityScale = def.gravityScale;
    this.m_sleepTime = 0;
    this.m_jointList = null;
    this.m_contactList = null;
    this.m_fixtureList = null;
    this.m_prev = null;
    this.m_next = null;
}

Body.prototype.isWorldLocked = function() {
    return this.m_world && this.m_world.isLocked() ? true : false;
};

Body.prototype.getWorld = function() {
    return this.m_world;
};

Body.prototype.getNext = function() {
    return this.m_next;
};

Body.prototype.setUserData = function(data) {
    this.m_userData = data;
};

Body.prototype.getUserData = function() {
    return this.m_userData;
};

Body.prototype.getFixtureList = function() {
    return this.m_fixtureList;
};

Body.prototype.getJointList = function() {
    return this.m_jointList;
};

/**
 * Warning: this list changes during the time step and you may miss some
 * collisions if you don't use ContactListener.
 */
Body.prototype.getContactList = function() {
    return this.m_contactList;
};

Body.prototype.isStatic = function() {
    return this.m_type == staticBody;
};

Body.prototype.isDynamic = function() {
    return this.m_type == dynamicBody;
};

Body.prototype.isKinematic = function() {
    return this.m_type == kinematicBody;
};

/**
 * This will alter the mass and velocity.
 */
Body.prototype.setStatic = function() {
    this.setType(staticBody);
    return this;
};

Body.prototype.setDynamic = function() {
    this.setType(dynamicBody);
    return this;
};

Body.prototype.setKinematic = function() {
    this.setType(kinematicBody);
    return this;
};

/**
 * @private
 */
Body.prototype.getType = function() {
    return this.m_type;
};

/**
 * 
 * @private
 */
Body.prototype.setType = function(type) {
    ASSERT && common.assert(type === staticBody || type === kinematicBody || type === dynamicBody);
    ASSERT && common.assert(this.isWorldLocked() == false);
    if (this.isWorldLocked() == true) {
        return;
    }
    if (this.m_type == type) {
        return;
    }
    this.m_type = type;
    this.resetMassData();
    if (this.m_type == staticBody) {
        this.m_linearVelocity.setZero();
        this.m_angularVelocity = 0;
        this.m_sweep.forward();
        this.synchronizeFixtures();
    }
    this.setAwake(true);
    this.m_force.setZero();
    this.m_torque = 0;
    // Delete the attached contacts.
    var ce = this.m_contactList;
    while (ce) {
        var ce0 = ce;
        ce = ce.next;
        this.m_world.destroyContact(ce0.contact);
    }
    this.m_contactList = null;
    // Touch the proxies so that new contacts will be created (when appropriate)
    var broadPhase = this.m_world.m_broadPhase;
    for (var f = this.m_fixtureList; f; f = f.m_next) {
        var proxyCount = f.m_proxyCount;
        for (var i = 0; i < proxyCount; ++i) {
            broadPhase.touchProxy(f.m_proxies[i].proxyId);
        }
    }
};

Body.prototype.isBullet = function() {
    return this.m_bulletFlag;
};

/**
 * Should this body be treated like a bullet for continuous collision detection?
 */
Body.prototype.setBullet = function(flag) {
    this.m_bulletFlag = !!flag;
};

Body.prototype.isSleepingAllowed = function() {
    return this.m_autoSleepFlag;
};

Body.prototype.setSleepingAllowed = function(flag) {
    this.m_autoSleepFlag = !!flag;
    if (this.m_autoSleepFlag == false) {
        this.setAwake(true);
    }
};

Body.prototype.isAwake = function() {
    return this.m_awakeFlag;
};

/**
 * Set the sleep state of the body. A sleeping body has very low CPU cost.
 * 
 * @param flag Set to true to wake the body, false to put it to sleep.
 */
Body.prototype.setAwake = function(flag) {
    if (flag) {
        if (this.m_awakeFlag == false) {
            this.m_awakeFlag = true;
            this.m_sleepTime = 0;
        }
    } else {
        this.m_awakeFlag = false;
        this.m_sleepTime = 0;
        this.m_linearVelocity.setZero();
        this.m_angularVelocity = 0;
        this.m_force.setZero();
        this.m_torque = 0;
    }
};

Body.prototype.isActive = function() {
    return this.m_activeFlag;
};

/**
 * Set the active state of the body. An inactive body is not simulated and
 * cannot be collided with or woken up. If you pass a flag of true, all fixtures
 * will be added to the broad-phase. If you pass a flag of false, all fixtures
 * will be removed from the broad-phase and all contacts will be destroyed.
 * Fixtures and joints are otherwise unaffected.
 * 
 * You may continue to create/destroy fixtures and joints on inactive bodies.
 * Fixtures on an inactive body are implicitly inactive and will not participate
 * in collisions, ray-casts, or queries. Joints connected to an inactive body
 * are implicitly inactive. An inactive body is still owned by a World object
 * and remains
 */
Body.prototype.setActive = function(flag) {
    ASSERT && common.assert(this.isWorldLocked() == false);
    if (flag == this.m_activeFlag) {
        return;
    }
    this.m_activeFlag = !!flag;
    if (this.m_activeFlag) {
        // Create all proxies.
        var broadPhase = this.m_world.m_broadPhase;
        for (var f = this.m_fixtureList; f; f = f.m_next) {
            f.createProxies(broadPhase, this.m_xf);
        }
    } else {
        // Destroy all proxies.
        var broadPhase = this.m_world.m_broadPhase;
        for (var f = this.m_fixtureList; f; f = f.m_next) {
            f.destroyProxies(broadPhase);
        }
        // Destroy the attached contacts.
        var ce = this.m_contactList;
        while (ce) {
            var ce0 = ce;
            ce = ce.next;
            this.m_world.destroyContact(ce0.contact);
        }
        this.m_contactList = null;
    }
};

Body.prototype.isFixedRotation = function() {
    return this.m_fixedRotationFlag;
};

/**
 * Set this body to have fixed rotation. This causes the mass to be reset.
 */
Body.prototype.setFixedRotation = function(flag) {
    if (this.m_fixedRotationFlag == flag) {
        return;
    }
    this.m_fixedRotationFlag = !!flag;
    this.m_angularVelocity = 0;
    this.resetMassData();
};

/**
 * Get the world transform for the body's origin.
 */
Body.prototype.getTransform = function() {
    return this.m_xf;
};

/**
 * Set the position of the body's origin and rotation. Manipulating a body's
 * transform may cause non-physical behavior. Note: contacts are updated on the
 * next call to World.step.
 * 
 * @param position The world position of the body's local origin.
 * @param angle The world rotation in radians.
 */
Body.prototype.setTransform = function(position, angle) {
    ASSERT && common.assert(this.isWorldLocked() == false);
    if (this.isWorldLocked() == true) {
        return;
    }
    this.m_xf.set(position, angle);
    this.m_sweep.setTransform(this.m_xf);
    var broadPhase = this.m_world.m_broadPhase;
    for (var f = this.m_fixtureList; f; f = f.m_next) {
        f.synchronize(broadPhase, this.m_xf, this.m_xf);
    }
};

Body.prototype.synchronizeTransform = function() {
    this.m_sweep.getTransform(this.m_xf, 1);
};

/**
 * Update fixtures in broad-phase.
 */
Body.prototype.synchronizeFixtures = function() {
    var xf = Transform.identity();
    this.m_sweep.getTransform(xf, 0);
    var broadPhase = this.m_world.m_broadPhase;
    for (var f = this.m_fixtureList; f; f = f.m_next) {
        f.synchronize(broadPhase, xf, this.m_xf);
    }
};

/**
 * Used in TOI.
 */
Body.prototype.advance = function(alpha) {
    // Advance to the new safe time. This doesn't sync the broad-phase.
    this.m_sweep.advance(alpha);
    this.m_sweep.c.set(this.m_sweep.c0);
    this.m_sweep.a = this.m_sweep.a0;
    this.m_sweep.getTransform(this.m_xf, 1);
};

/**
 * Get the world position for the body's origin.
 */
Body.prototype.getPosition = function() {
    return this.m_xf.p;
};

Body.prototype.setPosition = function(p) {
    this.setTransform(p, this.m_sweep.a);
};

/**
 * Get the current world rotation angle in radians.
 */
Body.prototype.getAngle = function() {
    return this.m_sweep.a;
};

Body.prototype.setAngle = function(angle) {
    this.setTransform(this.m_xf.p, angle);
};

/**
 * Get the world position of the center of mass.
 */
Body.prototype.getWorldCenter = function() {
    return this.m_sweep.c;
};

/**
 * Get the local position of the center of mass.
 */
Body.prototype.getLocalCenter = function() {
    return this.m_sweep.localCenter;
};

/**
 * Get the linear velocity of the center of mass.
 * 
 * @return the linear velocity of the center of mass.
 */
Body.prototype.getLinearVelocity = function() {
    return this.m_linearVelocity;
};

/**
 * Get the world linear velocity of a world point attached to this body.
 * 
 * @param worldPoint A point in world coordinates.
 */
Body.prototype.getLinearVelocityFromWorldPoint = function(worldPoint) {
    var localCenter = Vec2.sub(worldPoint, this.m_sweep.c);
    return Vec2.add(this.m_linearVelocity, Vec2.cross(this.m_angularVelocity, localCenter));
};

/**
 * Get the world velocity of a local point.
 * 
 * @param localPoint A point in local coordinates.
 */
Body.prototype.getLinearVelocityFromLocalPoint = function(localPoint) {
    return this.getLinearVelocityFromWorldPoint(this.getWorldPoint(localPoint));
};

/**
 * Set the linear velocity of the center of mass.
 * 
 * @param v The new linear velocity of the center of mass.
 */
Body.prototype.setLinearVelocity = function(v) {
    if (this.m_type == staticBody) {
        return;
    }
    if (Vec2.dot(v, v) > 0) {
        this.setAwake(true);
    }
    this.m_linearVelocity.set(v);
};

/**
 * Get the angular velocity.
 * 
 * @returns the angular velocity in radians/second.
 */
Body.prototype.getAngularVelocity = function() {
    return this.m_angularVelocity;
};

/**
 * Set the angular velocity.
 * 
 * @param omega The new angular velocity in radians/second.
 */
Body.prototype.setAngularVelocity = function(w) {
    if (this.m_type == staticBody) {
        return;
    }
    if (w * w > 0) {
        this.setAwake(true);
    }
    this.m_angularVelocity = w;
};

Body.prototype.getLinearDamping = function() {
    return this.m_linearDamping;
};

Body.prototype.setLinearDamping = function(linearDamping) {
    this.m_linearDamping = linearDamping;
};

Body.prototype.getAngularDamping = function() {
    return this.m_angularDamping;
};

Body.prototype.setAngularDamping = function(angularDamping) {
    this.m_angularDamping = angularDamping;
};

Body.prototype.getGravityScale = function() {
    return this.m_gravityScale;
};

/**
 * Scale the gravity applied to this body.
 */
Body.prototype.setGravityScale = function(scale) {
    this.m_gravityScale = scale;
};

/**
 * Get the total mass of the body.
 * 
 * @returns The mass, usually in kilograms (kg).
 */
Body.prototype.getMass = function() {
    return this.m_mass;
};

/**
 * Get the rotational inertia of the body about the local origin.
 * 
 * @return the rotational inertia, usually in kg-m^2.
 */
Body.prototype.getInertia = function() {
    return this.m_I + this.m_mass * Vec2.dot(this.m_sweep.localCenter, this.m_sweep.localCenter);
};

/**
 * @typedef {Object} MassData This holds the mass data computed for a shape.
 * 
 * @prop mass The mass of the shape, usually in kilograms.
 * @prop center The position of the shape's centroid relative to the shape's
 *       origin.
 * @prop I The rotational inertia of the shape about the local origin.
 */
function MassData() {
    this.mass = 0;
    this.center = Vec2.zero();
    this.I = 0;
}

/**
 * Copy the mass data of the body to data.
 */
Body.prototype.getMassData = function(data) {
    data.mass = this.m_mass;
    data.I = this.getInertia();
    data.center.set(this.m_sweep.localCenter);
};

/**
 * This resets the mass properties to the sum of the mass properties of the
 * fixtures. This normally does not need to be called unless you called
 * SetMassData to override the mass and you later want to reset the mass.
 */
Body.prototype.resetMassData = function() {
    // Compute mass data from shapes. Each shape has its own density.
    this.m_mass = 0;
    this.m_invMass = 0;
    this.m_I = 0;
    this.m_invI = 0;
    this.m_sweep.localCenter.setZero();
    // Static and kinematic bodies have zero mass.
    if (this.isStatic() || this.isKinematic()) {
        this.m_sweep.c0.set(this.m_xf.p);
        this.m_sweep.c.set(this.m_xf.p);
        this.m_sweep.a0 = this.m_sweep.a;
        return;
    }
    ASSERT && common.assert(this.isDynamic());
    // Accumulate mass over all fixtures.
    var localCenter = Vec2.zero();
    for (var f = this.m_fixtureList; f; f = f.m_next) {
        if (f.m_density == 0) {
            continue;
        }
        var massData = new MassData();
        f.getMassData(massData);
        this.m_mass += massData.mass;
        localCenter.wAdd(massData.mass, massData.center);
        this.m_I += massData.I;
    }
    // Compute center of mass.
    if (this.m_mass > 0) {
        this.m_invMass = 1 / this.m_mass;
        localCenter.mul(this.m_invMass);
    } else {
        // Force all dynamic bodies to have a positive mass.
        this.m_mass = 1;
        this.m_invMass = 1;
    }
    if (this.m_I > 0 && this.m_fixedRotationFlag == false) {
        // Center the inertia about the center of mass.
        this.m_I -= this.m_mass * Vec2.dot(localCenter, localCenter);
        ASSERT && common.assert(this.m_I > 0);
        this.m_invI = 1 / this.m_I;
    } else {
        this.m_I = 0;
        this.m_invI = 0;
    }
    // Move center of mass.
    var oldCenter = Vec2.clone(this.m_sweep.c);
    this.m_sweep.setLocalCenter(localCenter, this.m_xf);
    // Update center of mass velocity.
    this.m_linearVelocity.add(Vec2.cross(this.m_angularVelocity, Vec2.sub(this.m_sweep.c, oldCenter)));
};

/**
 * Set the mass properties to override the mass properties of the fixtures. Note
 * that this changes the center of mass position. Note that creating or
 * destroying fixtures can also alter the mass. This function has no effect if
 * the body isn't dynamic.
 * 
 * @param massData The mass properties.
 */
Body.prototype.setMassData = function(massData) {
    ASSERT && common.assert(this.isWorldLocked() == false);
    if (this.isWorldLocked() == true) {
        return;
    }
    if (this.m_type != dynamicBody) {
        return;
    }
    this.m_invMass = 0;
    this.m_I = 0;
    this.m_invI = 0;
    this.m_mass = massData.mass;
    if (this.m_mass <= 0) {
        this.m_mass = 1;
    }
    this.m_invMass = 1 / this.m_mass;
    if (massData.I > 0 && this.m_fixedRotationFlag == false) {
        this.m_I = massData.I - this.m_mass * Vec2.dot(massData.center, massData.center);
        ASSERT && common.assert(this.m_I > 0);
        this.m_invI = 1 / this.m_I;
    }
    // Move center of mass.
    var oldCenter = Vec2.clone(this.m_sweep.c);
    this.m_sweep.setLocalCenter(massData.center, this.m_xf);
    // Update center of mass velocity.
    this.m_linearVelocity.add(Vec2.cross(this.m_angularVelocity, Vec2.sub(this.m_sweep.c, oldCenter)));
};

/**
 * Apply a force at a world point. If the force is not applied at the center of
 * mass, it will generate a torque and affect the angular velocity. This wakes
 * up the body.
 * 
 * @param force The world force vector, usually in Newtons (N).
 * @param point The world position of the point of application.
 * @param wake Also wake up the body
 */
Body.prototype.applyForce = function(force, point, wake) {
    if (this.m_type != dynamicBody) {
        return;
    }
    if (wake && this.m_awakeFlag == false) {
        this.setAwake(true);
    }
    // Don't accumulate a force if the body is sleeping.
    if (this.m_awakeFlag) {
        this.m_force.add(force);
        this.m_torque += Vec2.cross(Vec2.sub(point, this.m_sweep.c), force);
    }
};

/**
 * Apply a force to the center of mass. This wakes up the body.
 * 
 * @param force The world force vector, usually in Newtons (N).
 * @param wake Also wake up the body
 */
Body.prototype.applyForceToCenter = function(force, wake) {
    if (this.m_type != dynamicBody) {
        return;
    }
    if (wake && this.m_awakeFlag == false) {
        this.setAwake(true);
    }
    // Don't accumulate a force if the body is sleeping
    if (this.m_awakeFlag) {
        this.m_force.add(force);
    }
};

/**
 * Apply a torque. This affects the angular velocity without affecting the
 * linear velocity of the center of mass. This wakes up the body.
 * 
 * @param torque About the z-axis (out of the screen), usually in N-m.
 * @param wake Also wake up the body
 */
Body.prototype.applyTorque = function(torque, wake) {
    if (this.m_type != dynamicBody) {
        return;
    }
    if (wake && this.m_awakeFlag == false) {
        this.setAwake(true);
    }
    // Don't accumulate a force if the body is sleeping
    if (this.m_awakeFlag) {
        this.m_torque += torque;
    }
};

/**
 * Apply an impulse at a point. This immediately modifies the velocity. It also
 * modifies the angular velocity if the point of application is not at the
 * center of mass. This wakes up the body.
 * 
 * @param impulse The world impulse vector, usually in N-seconds or kg-m/s.
 * @param point The world position of the point of application.
 * @param wake Also wake up the body
 */
Body.prototype.applyLinearImpulse = function(impulse, point, wake) {
    if (this.m_type != dynamicBody) {
        return;
    }
    if (wake && this.m_awakeFlag == false) {
        this.setAwake(true);
    }
    // Don't accumulate velocity if the body is sleeping
    if (this.m_awakeFlag) {
        this.m_linearVelocity.wAdd(this.m_invMass, impulse);
        this.m_angularVelocity += this.m_invI * Vec2.cross(Vec2.sub(point, this.m_sweep.c), impulse);
    }
};

/**
 * Apply an angular impulse.
 * 
 * @param impulse The angular impulse in units of kg*m*m/s
 * @param wake Also wake up the body
 */
Body.prototype.applyAngularImpulse = function(impulse, wake) {
    if (this.m_type != dynamicBody) {
        return;
    }
    if (wake && this.m_awakeFlag == false) {
        this.setAwake(true);
    }
    // Don't accumulate velocity if the body is sleeping
    if (this.m_awakeFlag) {
        this.m_angularVelocity += this.m_invI * impulse;
    }
};

/**
 * This is used to prevent connected bodies (by joints) from colliding,
 * depending on the joint's collideConnected flag.
 */
Body.prototype.shouldCollide = function(that) {
    // At least one body should be dynamic.
    if (this.m_type != dynamicBody && that.m_type != dynamicBody) {
        return false;
    }
    // Does a joint prevent collision?
    for (var jn = this.m_jointList; jn; jn = jn.next) {
        if (jn.other == that) {
            if (jn.joint.m_collideConnected == false) {
                return false;
            }
        }
    }
    return true;
};

/**
 * Creates a fixture and attach it to this body.
 * 
 * If the density is non-zero, this function automatically updates the mass of
 * the body.
 * 
 * Contacts are not created until the next time step.
 * 
 * Warning: This function is locked during callbacks.

 * @param {Shape|FixtureDef} shape Shape or fixture definition.
 * @param {FixtureDef|number} fixdef Fixture definition or just density.
 */
Body.prototype.createFixture = function(shape, fixdef) {
    ASSERT && common.assert(this.isWorldLocked() == false);
    if (this.isWorldLocked() == true) {
        return null;
    }
    var fixture = new Fixture(this, shape, fixdef);
    if (this.m_activeFlag) {
        var broadPhase = this.m_world.m_broadPhase;
        fixture.createProxies(broadPhase, this.m_xf);
    }
    fixture.m_next = this.m_fixtureList;
    this.m_fixtureList = fixture;
    // Adjust mass properties if needed.
    if (fixture.m_density > 0) {
        this.resetMassData();
    }
    // Let the world know we have a new fixture. This will cause new contacts
    // to be created at the beginning of the next time step.
    this.m_world.m_newFixture = true;
    return fixture;
};

/**
 * Destroy a fixture. This removes the fixture from the broad-phase and destroys
 * all contacts associated with this fixture. This will automatically adjust the
 * mass of the body if the body is dynamic and the fixture has positive density.
 * All fixtures attached to a body are implicitly destroyed when the body is
 * destroyed.
 * 
 * Warning: This function is locked during callbacks.
 * 
 * @param fixture The fixture to be removed.
 */
Body.prototype.destroyFixture = function(fixture) {
    ASSERT && common.assert(this.isWorldLocked() == false);
    if (this.isWorldLocked() == true) {
        return;
    }
    ASSERT && common.assert(fixture.m_body == this);
    // Remove the fixture from this body's singly linked list.
    var node = this.m_fixtureList;
    var found = false;
    while (node != null) {
        if (node == fixture) {
            node = fixture.m_next;
            found = true;
            break;
        }
        node = node.m_next;
    }
    // You tried to remove a shape that is not attached to this body.
    ASSERT && common.assert(found);
    // Destroy any contacts associated with the fixture.
    var edge = this.m_contactList;
    while (edge) {
        var c = edge.contact;
        edge = edge.next;
        var fixtureA = c.getFixtureA();
        var fixtureB = c.getFixtureB();
        if (fixture == fixtureA || fixture == fixtureB) {
            // This destroys the contact and removes it from
            // this body's contact list.
            this.m_world.destroyContact(c);
        }
    }
    if (this.m_activeFlag) {
        var broadPhase = this.m_world.m_broadPhase;
        fixture.destroyProxies(broadPhase);
    }
    fixture.m_body = null;
    fixture.m_next = null;
    this.m_world.publish("remove-fixture", fixture);
    // Reset the mass data.
    this.resetMassData();
};

/**
 * Get the corresponding world point of a local point.
 */
Body.prototype.getWorldPoint = function(localPoint) {
    return Transform.mul(this.m_xf, localPoint);
};

/**
 * Get the corresponding world vector of a local vector.
 */
Body.prototype.getWorldVector = function(localVector) {
    return Rot.mul(this.m_xf.q, localVector);
};

/**
 * Gets the corresponding local point of a world point.
 */
Body.prototype.getLocalPoint = function(worldPoint) {
    return Transform.mulT(this.m_xf, worldPoint);
};

/**
 * 
 * Gets the corresponding local vector of a world vector.
 */
Body.prototype.getLocalVector = function(worldVector) {
    return Rot.mulT(this.m_xf.q, worldVector);
};


},{"./Fixture":4,"./Shape":8,"./World":10,"./common/Math":18,"./common/Position":19,"./common/Rot":20,"./common/Sweep":21,"./common/Transform":22,"./common/Vec2":23,"./common/Velocity":25,"./util/common":50,"./util/options":52}],3:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

var DEBUG_SOLVER = false;

var common = require("./util/common");

var Math = require("./common/Math");

var Vec2 = require("./common/Vec2");

var Transform = require("./common/Transform");

var Mat22 = require("./common/Mat22");

var Rot = require("./common/Rot");

var Settings = require("./Settings");

var Manifold = require("./Manifold");

var Distance = require("./collision/Distance");

module.exports = Contact;

/**
 * A contact edge is used to connect bodies and contacts together in a contact
 * graph where each body is a node and each contact is an edge. A contact edge
 * belongs to a doubly linked list maintained in each attached body. Each
 * contact has two contact nodes, one for each attached body.
 * 
 * @prop {Contact} contact The contact
 * @prop {ContactEdge} prev The previous contact edge in the body's contact list
 * @prop {ContactEdge} next The next contact edge in the body's contact list
 * @prop {Body} other Provides quick access to the other body attached.
 */
function ContactEdge(contact) {
    this.contact = contact;
    this.prev;
    this.next;
    this.other;
}

/**
 * @function Contact~evaluate
 * 
 * @param manifold
 * @param xfA
 * @param fixtureA
 * @param indexA
 * @param xfB
 * @param fixtureB
 * @param indexB
 */
/**
 * The class manages contact between two shapes. A contact exists for each
 * overlapping AABB in the broad-phase (except if filtered). Therefore a contact
 * object may exist that has no contact points.
 * 
 * @param {Fixture} fA
 * @param {int} indexA
 * @param {Fixture} fB
 * @param {int} indexB
 * @param {Contact~evaluate} evaluateFcn
 */
function Contact(fA, indexA, fB, indexB, evaluateFcn) {
    // Nodes for connecting bodies.
    this.m_nodeA = new ContactEdge(this);
    this.m_nodeB = new ContactEdge(this);
    this.m_fixtureA = fA;
    this.m_fixtureB = fB;
    this.m_indexA = indexA;
    this.m_indexB = indexB;
    this.m_evaluateFcn = evaluateFcn;
    this.m_manifold = new Manifold();
    this.m_prev = null;
    this.m_next = null;
    this.m_toi = 1;
    this.m_toiCount = 0;
    // This contact has a valid TOI in m_toi
    this.m_toiFlag = false;
    this.m_friction = mixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
    this.m_restitution = mixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
    this.m_tangentSpeed = 0;
    // This contact can be disabled (by user)
    this.m_enabledFlag = true;
    // Used when crawling contact graph when forming islands.
    this.m_islandFlag = false;
    // Set when the shapes are touching.
    this.m_touchingFlag = false;
    // This contact needs filtering because a fixture filter was changed.
    this.m_filterFlag = false;
    // This bullet contact had a TOI event
    this.m_bulletHitFlag = false;
    this.v_points = [];
    // VelocityConstraintPoint[maxManifoldPoints]
    this.v_normal = Vec2.zero();
    this.v_normalMass = new Mat22();
    this.v_K = new Mat22();
    this.v_pointCount;
    this.v_tangentSpeed;
    this.v_friction;
    this.v_restitution;
    this.v_invMassA;
    this.v_invMassB;
    this.v_invIA;
    this.v_invIB;
    this.p_localPoints = [];
    // Vec2[maxManifoldPoints];
    this.p_localNormal = Vec2.zero();
    this.p_localPoint = Vec2.zero();
    this.p_localCenterA = Vec2.zero();
    this.p_localCenterB = Vec2.zero();
    this.p_type;
    // Manifold.Type
    this.p_radiusA;
    this.p_radiusB;
    this.p_pointCount;
    this.p_invMassA;
    this.p_invMassB;
    this.p_invIA;
    this.p_invIB;
}

Contact.prototype.initConstraint = function(step) {
    var fixtureA = this.m_fixtureA;
    var fixtureB = this.m_fixtureB;
    var shapeA = fixtureA.getShape();
    var shapeB = fixtureB.getShape();
    var bodyA = fixtureA.getBody();
    var bodyB = fixtureB.getBody();
    var manifold = this.getManifold();
    var pointCount = manifold.pointCount;
    ASSERT && common.assert(pointCount > 0);
    this.v_invMassA = bodyA.m_invMass;
    this.v_invMassB = bodyB.m_invMass;
    this.v_invIA = bodyA.m_invI;
    this.v_invIB = bodyB.m_invI;
    this.v_friction = this.m_friction;
    this.v_restitution = this.m_restitution;
    this.v_tangentSpeed = this.m_tangentSpeed;
    this.v_pointCount = pointCount;
    DEBUG && common.debug("pc", this.v_pointCount, pointCount);
    this.v_K.setZero();
    this.v_normalMass.setZero();
    this.p_invMassA = bodyA.m_invMass;
    this.p_invMassB = bodyB.m_invMass;
    this.p_invIA = bodyA.m_invI;
    this.p_invIB = bodyB.m_invI;
    this.p_localCenterA = Vec2.clone(bodyA.m_sweep.localCenter);
    this.p_localCenterB = Vec2.clone(bodyB.m_sweep.localCenter);
    this.p_radiusA = shapeA.m_radius;
    this.p_radiusB = shapeB.m_radius;
    this.p_type = manifold.type;
    this.p_localNormal = Vec2.clone(manifold.localNormal);
    this.p_localPoint = Vec2.clone(manifold.localPoint);
    this.p_pointCount = pointCount;
    for (var j = 0; j < pointCount; ++j) {
        var cp = manifold.points[j];
        // ManifoldPoint
        var vcp = this.v_points[j] = new VelocityConstraintPoint();
        if (step.warmStarting) {
            vcp.normalImpulse = step.dtRatio * cp.normalImpulse;
            vcp.tangentImpulse = step.dtRatio * cp.tangentImpulse;
        } else {
            vcp.normalImpulse = 0;
            vcp.tangentImpulse = 0;
        }
        vcp.rA.setZero();
        vcp.rB.setZero();
        vcp.normalMass = 0;
        vcp.tangentMass = 0;
        vcp.velocityBias = 0;
        this.p_localPoints[j] = Vec2.clone(cp.localPoint);
    }
};

/**
 * Get the contact manifold. Do not modify the manifold unless you understand
 * the internals of the library.
 */
Contact.prototype.getManifold = function() {
    return this.m_manifold;
};

/**
 * Get the world manifold.
 * 
 * @param {WorldManifold} [worldManifold]
 */
Contact.prototype.getWorldManifold = function(worldManifold) {
    var bodyA = this.m_fixtureA.getBody();
    var bodyB = this.m_fixtureB.getBody();
    var shapeA = this.m_fixtureA.getShape();
    var shapeB = this.m_fixtureB.getShape();
    return this.m_manifold.getWorldManifold(worldManifold, bodyA.getTransform(), shapeA.m_radius, bodyB.getTransform(), shapeB.m_radius);
};

/**
 * Enable/disable this contact. This can be used inside the pre-solve contact
 * listener. The contact is only disabled for the current time step (or sub-step
 * in continuous collisions).
 */
Contact.prototype.setEnabled = function(flag) {
    this.m_enabledFlag = !!flag;
};

/**
 * Has this contact been disabled?
 */
Contact.prototype.isEnabled = function() {
    return this.m_enabledFlag;
};

/**
 * Is this contact touching?
 */
Contact.prototype.isTouching = function() {
    return this.m_touchingFlag;
};

/**
 * Get the next contact in the world's contact list.
 */
Contact.prototype.getNext = function() {
    return this.m_next;
};

/**
 * Get fixture A in this contact.
 */
Contact.prototype.getFixtureA = function() {
    return this.m_fixtureA;
};

/**
 * Get fixture B in this contact.
 */
Contact.prototype.getFixtureB = function() {
    return this.m_fixtureB;
};

/**
 * Get the child primitive index for fixture A.
 */
Contact.prototype.getChildIndexA = function() {
    return this.m_indexA;
};

/**
 * Get the child primitive index for fixture B.
 */
Contact.prototype.getChildIndexB = function() {
    return this.m_indexB;
};

/**
 * Flag this contact for filtering. Filtering will occur the next time step.
 */
Contact.prototype.flagForFiltering = function() {
    this.m_filterFlag = true;
};

/**
 * Override the default friction mixture. You can call this in
 * ContactListener.preSolve. This value persists until set or reset.
 */
Contact.prototype.setFriction = function(friction) {
    this.m_friction = friction;
};

/**
 * Get the friction.
 */
Contact.prototype.getFriction = function() {
    return this.m_friction;
};

/**
 * Reset the friction mixture to the default value.
 */
Contact.prototype.resetFriction = function() {
    this.m_friction = mixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
};

/**
 * Override the default restitution mixture. You can call this in
 * ContactListener.preSolve. The value persists until you set or reset.
 */
Contact.prototype.setRestitution = function(restitution) {
    this.m_restitution = restitution;
};

/**
 * Get the restitution.
 */
Contact.prototype.getRestitution = function() {
    return this.m_restitution;
};

/**
 * Reset the restitution to the default value.
 */
Contact.prototype.resetRestitution = function() {
    this.m_restitution = mixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
};

/**
 * Set the desired tangent speed for a conveyor belt behavior. In meters per
 * second.
 */
Contact.prototype.setTangentSpeed = function(speed) {
    this.m_tangentSpeed = speed;
};

/**
 * Get the desired tangent speed. In meters per second.
 */
Contact.prototype.getTangentSpeed = function() {
    return this.m_tangentSpeed;
};

/**
 * Called by Update method, and implemented by subclasses.
 */
Contact.prototype.evaluate = function(manifold, xfA, xfB) {
    this.m_evaluateFcn(manifold, xfA, this.m_fixtureA, this.m_indexA, xfB, this.m_fixtureB, this.m_indexB);
};

/**
 * Updates the contact manifold and touching status.
 * 
 * Note: do not assume the fixture AABBs are overlapping or are valid.
 * 
 * @param {function} listener.beginContact
 * @param {function} listener.endContact
 * @param {function} listener.preSolve
 */
Contact.prototype.update = function(listener) {
    // Re-enable this contact.
    this.m_enabledFlag = true;
    var touching = false;
    var wasTouching = this.m_touchingFlag;
    var sensorA = this.m_fixtureA.isSensor();
    var sensorB = this.m_fixtureB.isSensor();
    var sensor = sensorA || sensorB;
    var bodyA = this.m_fixtureA.getBody();
    var bodyB = this.m_fixtureB.getBody();
    var xfA = bodyA.getTransform();
    var xfB = bodyB.getTransform();
    // Is this contact a sensor?
    if (sensor) {
        var shapeA = this.m_fixtureA.getShape();
        var shapeB = this.m_fixtureB.getShape();
        touching = Distance.testOverlap(shapeA, this.m_indexA, shapeB, this.m_indexB, xfA, xfB);
        // Sensors don't generate manifolds.
        this.m_manifold.pointCount = 0;
    } else {
        // TODO reuse manifold
        var oldManifold = this.m_manifold;
        this.m_manifold = new Manifold();
        this.evaluate(this.m_manifold, xfA, xfB);
        touching = this.m_manifold.pointCount > 0;
        // Match old contact ids to new contact ids and copy the
        // stored impulses to warm start the solver.
        for (var i = 0; i < this.m_manifold.pointCount; ++i) {
            var nmp = this.m_manifold.points[i];
            nmp.normalImpulse = 0;
            nmp.tangentImpulse = 0;
            for (var j = 0; j < oldManifold.pointCount; ++j) {
                var omp = oldManifold.points[j];
                if (omp.id.key == nmp.id.key) {
                    // ContactID.key
                    nmp.normalImpulse = omp.normalImpulse;
                    nmp.tangentImpulse = omp.tangentImpulse;
                    break;
                }
            }
        }
        if (touching != wasTouching) {
            bodyA.setAwake(true);
            bodyB.setAwake(true);
        }
    }
    this.m_touchingFlag = touching;
    if (wasTouching == false && touching == true && listener) {
        listener.beginContact(this);
    }
    if (wasTouching == true && touching == false && listener) {
        listener.endContact(this);
    }
    if (sensor == false && touching && listener) {
        listener.preSolve(this, oldManifold);
    }
};

Contact.prototype.solvePositionConstraint = function(step) {
    return this._solvePositionConstraint(step, false);
};

Contact.prototype.solvePositionConstraintTOI = function(step, toiA, toiB) {
    return this._solvePositionConstraint(step, true, toiA, toiB);
};

Contact.prototype._solvePositionConstraint = function(step, toi, toiA, toiB) {
    var fixtureA = this.m_fixtureA;
    var fixtureB = this.m_fixtureB;
    var bodyA = fixtureA.getBody();
    var bodyB = fixtureB.getBody();
    var velocityA = bodyA.c_velocity;
    var velocityB = bodyB.c_velocity;
    var positionA = bodyA.c_position;
    var positionB = bodyB.c_position;
    var localCenterA = Vec2.clone(this.p_localCenterA);
    var localCenterB = Vec2.clone(this.p_localCenterB);
    var mA = 0;
    var iA = 0;
    if (!toi || (bodyA == toiA || bodyA == toiB)) {
        mA = this.p_invMassA;
        iA = this.p_invIA;
    }
    var mB = 0;
    var iB = 0;
    if (!toi || (bodyB == toiA || bodyB == toiB)) {
        mB = this.p_invMassB;
        iB = this.p_invIB;
    }
    var cA = Vec2.clone(positionA.c);
    var aA = positionA.a;
    var cB = Vec2.clone(positionB.c);
    var aB = positionB.a;
    var minSeparation = 0;
    // Solve normal constraints
    for (var j = 0; j < this.p_pointCount; ++j) {
        var xfA = Transform.identity();
        var xfB = Transform.identity();
        xfA.q.set(aA);
        xfB.q.set(aB);
        xfA.p = Vec2.sub(cA, Rot.mul(xfA.q, localCenterA));
        xfB.p = Vec2.sub(cB, Rot.mul(xfB.q, localCenterB));
        // PositionSolverManifold
        var normal, point, separation;
        switch (this.p_type) {
          case Manifold.e_circles:
            var pointA = Transform.mul(xfA, this.p_localPoint);
            var pointB = Transform.mul(xfB, this.p_localPoints[0]);
            normal = Vec2.sub(pointB, pointA);
            normal.normalize();
            point = Vec2.wAdd(.5, pointA, .5, pointB);
            separation = Vec2.dot(Vec2.sub(pointB, pointA), normal) - this.p_radiusA - this.p_radiusB;
            break;

          case Manifold.e_faceA:
            normal = Rot.mul(xfA.q, this.p_localNormal);
            var planePoint = Transform.mul(xfA, this.p_localPoint);
            var clipPoint = Transform.mul(xfB, this.p_localPoints[j]);
            separation = Vec2.dot(Vec2.sub(clipPoint, planePoint), normal) - this.p_radiusA - this.p_radiusB;
            point = clipPoint;
            break;

          case Manifold.e_faceB:
            normal = Rot.mul(xfB.q, this.p_localNormal);
            var planePoint = Transform.mul(xfB, this.p_localPoint);
            var clipPoint = Transform.mul(xfA, this.p_localPoints[j]);
            separation = Vec2.dot(Vec2.sub(clipPoint, planePoint), normal) - this.p_radiusA - this.p_radiusB;
            point = clipPoint;
            // Ensure normal points from A to B
            normal.mul(-1);
            break;
        }
        var rA = Vec2.sub(point, cA);
        var rB = Vec2.sub(point, cB);
        // Track max constraint error.
        minSeparation = Math.min(minSeparation, separation);
        var baumgarte = toi ? Settings.toiBaugarte : Settings.baumgarte;
        var linearSlop = Settings.linearSlop;
        var maxLinearCorrection = Settings.maxLinearCorrection;
        // Prevent large corrections and allow slop.
        var C = Math.clamp(baumgarte * (separation + linearSlop), -maxLinearCorrection, 0);
        // Compute the effective mass.
        var rnA = Vec2.cross(rA, normal);
        var rnB = Vec2.cross(rB, normal);
        var K = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
        // Compute normal impulse
        var impulse = K > 0 ? -C / K : 0;
        var P = Vec2.mul(impulse, normal);
        cA.wSub(mA, P);
        aA -= iA * Vec2.cross(rA, P);
        cB.wAdd(mB, P);
        aB += iB * Vec2.cross(rB, P);
    }
    positionA.c.set(cA);
    positionA.a = aA;
    positionB.c.set(cB);
    positionB.a = aB;
    return minSeparation;
};

// TODO merge with ManifoldPoint
function VelocityConstraintPoint() {
    this.rA = Vec2.zero();
    this.rB = Vec2.zero();
    this.normalImpulse = 0;
    this.tangentImpulse = 0;
    this.normalMass = 0;
    this.tangentMass = 0;
    this.velocityBias = 0;
}

Contact.prototype.initVelocityConstraint = function(step) {
    var fixtureA = this.m_fixtureA;
    var fixtureB = this.m_fixtureB;
    var bodyA = fixtureA.getBody();
    var bodyB = fixtureB.getBody();
    var velocityA = bodyA.c_velocity;
    var velocityB = bodyB.c_velocity;
    var positionA = bodyA.c_position;
    var positionB = bodyB.c_position;
    var radiusA = this.p_radiusA;
    var radiusB = this.p_radiusB;
    var manifold = this.getManifold();
    var mA = this.v_invMassA;
    var mB = this.v_invMassB;
    var iA = this.v_invIA;
    var iB = this.v_invIB;
    var localCenterA = Vec2.clone(this.p_localCenterA);
    var localCenterB = Vec2.clone(this.p_localCenterB);
    var cA = Vec2.clone(positionA.c);
    var aA = positionA.a;
    var vA = Vec2.clone(velocityA.v);
    var wA = velocityA.w;
    var cB = Vec2.clone(positionB.c);
    var aB = positionB.a;
    var vB = Vec2.clone(velocityB.v);
    var wB = velocityB.w;
    ASSERT && common.assert(manifold.pointCount > 0);
    var xfA = Transform.identity();
    var xfB = Transform.identity();
    xfA.q.set(aA);
    xfB.q.set(aB);
    xfA.p.wSet(1, cA, -1, Rot.mul(xfA.q, localCenterA));
    xfB.p.wSet(1, cB, -1, Rot.mul(xfB.q, localCenterB));
    var worldManifold = manifold.getWorldManifold(null, xfA, radiusA, xfB, radiusB);
    this.v_normal.set(worldManifold.normal);
    for (var j = 0; j < this.v_pointCount; ++j) {
        var vcp = this.v_points[j];
        // VelocityConstraintPoint
        vcp.rA.set(Vec2.sub(worldManifold.points[j], cA));
        vcp.rB.set(Vec2.sub(worldManifold.points[j], cB));
        DEBUG && common.debug("vcp.rA", worldManifold.points[j].x, worldManifold.points[j].y, cA.x, cA.y, vcp.rA.x, vcp.rA.y);
        var rnA = Vec2.cross(vcp.rA, this.v_normal);
        var rnB = Vec2.cross(vcp.rB, this.v_normal);
        var kNormal = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
        vcp.normalMass = kNormal > 0 ? 1 / kNormal : 0;
        var tangent = Vec2.cross(this.v_normal, 1);
        var rtA = Vec2.cross(vcp.rA, tangent);
        var rtB = Vec2.cross(vcp.rB, tangent);
        var kTangent = mA + mB + iA * rtA * rtA + iB * rtB * rtB;
        vcp.tangentMass = kTangent > 0 ? 1 / kTangent : 0;
        // Setup a velocity bias for restitution.
        vcp.velocityBias = 0;
        var vRel = Vec2.dot(this.v_normal, vB) + Vec2.dot(this.v_normal, Vec2.cross(wB, vcp.rB)) - Vec2.dot(this.v_normal, vA) - Vec2.dot(this.v_normal, Vec2.cross(wA, vcp.rA));
        if (vRel < -Settings.velocityThreshold) {
            vcp.velocityBias = -this.v_restitution * vRel;
        }
    }
    // If we have two points, then prepare the block solver.
    if (this.v_pointCount == 2 && step.blockSolve) {
        var vcp1 = this.v_points[0];
        // VelocityConstraintPoint
        var vcp2 = this.v_points[1];
        // VelocityConstraintPoint
        var rn1A = Vec2.cross(vcp1.rA, this.v_normal);
        var rn1B = Vec2.cross(vcp1.rB, this.v_normal);
        var rn2A = Vec2.cross(vcp2.rA, this.v_normal);
        var rn2B = Vec2.cross(vcp2.rB, this.v_normal);
        var k11 = mA + mB + iA * rn1A * rn1A + iB * rn1B * rn1B;
        var k22 = mA + mB + iA * rn2A * rn2A + iB * rn2B * rn2B;
        var k12 = mA + mB + iA * rn1A * rn2A + iB * rn1B * rn2B;
        // Ensure a reasonable condition number.
        var k_maxConditionNumber = 1e3;
        DEBUG && common.debug("k1x2: ", k11, k22, k12, mA, mB, iA, rn1A, rn2A, iB, rn1B, rn2B);
        if (k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
            // K is safe to invert.
            this.v_K.ex.set(k11, k12);
            this.v_K.ey.set(k12, k22);
            this.v_normalMass.set(this.v_K.getInverse());
        } else {
            // The constraints are redundant, just use one.
            // TODO_ERIN use deepest?
            this.v_pointCount = 1;
        }
    }
    positionA.c.set(cA);
    positionA.a = aA;
    velocityA.v.set(vA);
    velocityA.w = wA;
    positionB.c.set(cB);
    positionB.a = aB;
    velocityB.v.set(vB);
    velocityB.w = wB;
};

Contact.prototype.warmStartConstraint = function(step) {
    var fixtureA = this.m_fixtureA;
    var fixtureB = this.m_fixtureB;
    var bodyA = fixtureA.getBody();
    var bodyB = fixtureB.getBody();
    var velocityA = bodyA.c_velocity;
    var velocityB = bodyB.c_velocity;
    var positionA = bodyA.c_position;
    var positionB = bodyB.c_position;
    var mA = this.v_invMassA;
    var iA = this.v_invIA;
    var mB = this.v_invMassB;
    var iB = this.v_invIB;
    var vA = Vec2.clone(velocityA.v);
    var wA = velocityA.w;
    var vB = Vec2.clone(velocityB.v);
    var wB = velocityB.w;
    var normal = this.v_normal;
    var tangent = Vec2.cross(normal, 1);
    for (var j = 0; j < this.v_pointCount; ++j) {
        var vcp = this.v_points[j];
        // VelocityConstraintPoint
        var P = Vec2.wAdd(vcp.normalImpulse, normal, vcp.tangentImpulse, tangent);
        DEBUG && common.debug(iA, iB, vcp.rA.x, vcp.rA.y, vcp.rB.x, vcp.rB.y, P.x, P.y);
        wA -= iA * Vec2.cross(vcp.rA, P);
        vA.wSub(mA, P);
        wB += iB * Vec2.cross(vcp.rB, P);
        vB.wAdd(mB, P);
    }
    velocityA.v.set(vA);
    velocityA.w = wA;
    velocityB.v.set(vB);
    velocityB.w = wB;
};

Contact.prototype.storeConstraintImpulses = function(step) {
    var manifold = this.m_manifold;
    for (var j = 0; j < this.v_pointCount; ++j) {
        manifold.points[j].normalImpulse = this.v_points[j].normalImpulse;
        manifold.points[j].tangentImpulse = this.v_points[j].tangentImpulse;
    }
};

Contact.prototype.solveVelocityConstraint = function(step) {
    var bodyA = this.m_fixtureA.m_body;
    var bodyB = this.m_fixtureB.m_body;
    var velocityA = bodyA.c_velocity;
    var positionA = bodyA.c_position;
    var velocityB = bodyB.c_velocity;
    var positionB = bodyB.c_position;
    var mA = this.v_invMassA;
    var iA = this.v_invIA;
    var mB = this.v_invMassB;
    var iB = this.v_invIB;
    var vA = Vec2.clone(velocityA.v);
    var wA = velocityA.w;
    var vB = Vec2.clone(velocityB.v);
    var wB = velocityB.w;
    var normal = this.v_normal;
    var tangent = Vec2.cross(normal, 1);
    var friction = this.v_friction;
    ASSERT && common.assert(this.v_pointCount == 1 || this.v_pointCount == 2);
    // Solve tangent constraints first because non-penetration is more important
    // than friction.
    for (var j = 0; j < this.v_pointCount; ++j) {
        var vcp = this.v_points[j];
        // VelocityConstraintPoint
        // Relative velocity at contact
        var dv = Vec2.zero();
        dv.wAdd(1, vB, 1, Vec2.cross(wB, vcp.rB));
        dv.wSub(1, vA, 1, Vec2.cross(wA, vcp.rA));
        // Compute tangent force
        var vt = Vec2.dot(dv, tangent) - this.v_tangentSpeed;
        var lambda = vcp.tangentMass * -vt;
        // Clamp the accumulated force
        var maxFriction = friction * vcp.normalImpulse;
        var newImpulse = Math.clamp(vcp.tangentImpulse + lambda, -maxFriction, maxFriction);
        lambda = newImpulse - vcp.tangentImpulse;
        vcp.tangentImpulse = newImpulse;
        // Apply contact impulse
        var P = Vec2.mul(lambda, tangent);
        vA.wSub(mA, P);
        wA -= iA * Vec2.cross(vcp.rA, P);
        vB.wAdd(mB, P);
        wB += iB * Vec2.cross(vcp.rB, P);
    }
    // Solve normal constraints
    if (this.v_pointCount == 1 || step.blockSolve == false) {
        for (var i = 0; i < this.v_pointCount; ++i) {
            var vcp = this.v_points[i];
            // VelocityConstraintPoint
            // Relative velocity at contact
            var dv = Vec2.zero();
            dv.wAdd(1, vB, 1, Vec2.cross(wB, vcp.rB));
            dv.wSub(1, vA, 1, Vec2.cross(wA, vcp.rA));
            // Compute normal impulse
            var vn = Vec2.dot(dv, normal);
            var lambda = -vcp.normalMass * (vn - vcp.velocityBias);
            // Clamp the accumulated impulse
            var newImpulse = Math.max(vcp.normalImpulse + lambda, 0);
            lambda = newImpulse - vcp.normalImpulse;
            vcp.normalImpulse = newImpulse;
            // Apply contact impulse
            var P = Vec2.mul(lambda, normal);
            vA.wSub(mA, P);
            wA -= iA * Vec2.cross(vcp.rA, P);
            vB.wAdd(mB, P);
            wB += iB * Vec2.cross(vcp.rB, P);
        }
    } else {
        // Block solver developed in collaboration with Dirk Gregorius (back in
        // 01/07 on Box2D_Lite).
        // Build the mini LCP for this contact patch
        //
        // vn = A * x + b, vn >= 0, , vn >= 0, x >= 0 and vn_i * x_i = 0 with i =
        // 1..2
        //
        // A = J * W * JT and J = ( -n, -r1 x n, n, r2 x n )
        // b = vn0 - velocityBias
        //
        // The system is solved using the "Total enumeration method" (s. Murty).
        // The complementary constraint vn_i * x_i
        // implies that we must have in any solution either vn_i = 0 or x_i = 0.
        // So for the 2D contact problem the cases
        // vn1 = 0 and vn2 = 0, x1 = 0 and x2 = 0, x1 = 0 and vn2 = 0, x2 = 0 and
        // vn1 = 0 need to be tested. The first valid
        // solution that satisfies the problem is chosen.
        // 
        // In order to account of the accumulated impulse 'a' (because of the
        // iterative nature of the solver which only requires
        // that the accumulated impulse is clamped and not the incremental
        // impulse) we change the impulse variable (x_i).
        //
        // Substitute:
        // 
        // x = a + d
        // 
        // a := old total impulse
        // x := new total impulse
        // d := incremental impulse
        //
        // For the current iteration we extend the formula for the incremental
        // impulse
        // to compute the new total impulse:
        //
        // vn = A * d + b
        // = A * (x - a) + b
        // = A * x + b - A * a
        // = A * x + b'
        // b' = b - A * a;
        var vcp1 = this.v_points[0];
        // VelocityConstraintPoint
        var vcp2 = this.v_points[1];
        // VelocityConstraintPoint
        var a = Vec2.neo(vcp1.normalImpulse, vcp2.normalImpulse);
        ASSERT && common.assert(a.x >= 0 && a.y >= 0);
        // Relative velocity at contact
        var dv1 = Vec2.zero().add(vB).add(Vec2.cross(wB, vcp1.rB)).sub(vA).sub(Vec2.cross(wA, vcp1.rA));
        var dv2 = Vec2.zero().add(vB).add(Vec2.cross(wB, vcp2.rB)).sub(vA).sub(Vec2.cross(wA, vcp2.rA));
        // Compute normal velocity
        var vn1 = Vec2.dot(dv1, normal);
        var vn2 = Vec2.dot(dv2, normal);
        var b = Vec2.neo(vn1 - vcp1.velocityBias, vn2 - vcp2.velocityBias);
        // Compute b'
        b.sub(Mat22.mul(this.v_K, a));
        var k_errorTol = .001;
        // NOT_USED(k_errorTol);
        for (;;) {
            //
            // Case 1: vn = 0
            //
            // 0 = A * x + b'
            //
            // Solve for x:
            //
            // x = - inv(A) * b'
            //
            var x = Vec2.neg(Mat22.mul(this.v_normalMass, b));
            if (x.x >= 0 && x.y >= 0) {
                // Get the incremental impulse
                var d = Vec2.sub(x, a);
                // Apply incremental impulse
                var P1 = Vec2.mul(d.x, normal);
                var P2 = Vec2.mul(d.y, normal);
                vA.wSub(mA, P1, mA, P2);
                wA -= iA * (Vec2.cross(vcp1.rA, P1) + Vec2.cross(vcp2.rA, P2));
                vB.wAdd(mB, P1, mB, P2);
                wB += iB * (Vec2.cross(vcp1.rB, P1) + Vec2.cross(vcp2.rB, P2));
                // Accumulate
                vcp1.normalImpulse = x.x;
                vcp2.normalImpulse = x.y;
                if (DEBUG_SOLVER) {
                    // Postconditions
                    dv1 = vB + Vec2.cross(wB, vcp1.rB) - vA - Vec2.cross(wA, vcp1.rA);
                    dv2 = vB + Vec2.cross(wB, vcp2.rB) - vA - Vec2.cross(wA, vcp2.rA);
                    // Compute normal velocity
                    vn1 = Dot(dv1, normal);
                    vn2 = Dot(dv2, normal);
                    ASSERT && common.assert(Abs(vn1 - vcp1.velocityBias) < k_errorTol);
                    ASSERT && common.assert(Abs(vn2 - vcp2.velocityBias) < k_errorTol);
                }
                break;
            }
            //
            // Case 2: vn1 = 0 and x2 = 0
            //
            // 0 = a11 * x1 + a12 * 0 + b1'
            // vn2 = a21 * x1 + a22 * 0 + b2'
            //
            x.x = -vcp1.normalMass * b.x;
            x.y = 0;
            vn1 = 0;
            vn2 = this.v_K.ex.y * x.x + b.y;
            if (x.x >= 0 && vn2 >= 0) {
                // Get the incremental impulse
                var d = Vec2.sub(x, a);
                // Apply incremental impulse
                var P1 = Vec2.mul(d.x, normal);
                var P2 = Vec2.mul(d.y, normal);
                vA.wSub(mA, P1, mA, P2);
                wA -= iA * (Vec2.cross(vcp1.rA, P1) + Vec2.cross(vcp2.rA, P2));
                vB.wAdd(mB, P1, mB, P2);
                wB += iB * (Vec2.cross(vcp1.rB, P1) + Vec2.cross(vcp2.rB, P2));
                // Accumulate
                vcp1.normalImpulse = x.x;
                vcp2.normalImpulse = x.y;
                if (DEBUG_SOLVER) {
                    // Postconditions
                    var dv1B = Vec2.add(vB, Vec2.cross(wB, vcp1.rB));
                    var dv1A = Vec2.add(vA, Vec2.cross(wA, vcp1.rA));
                    var dv1 = Vec2.sub(dv1B, dv1A);
                    // Compute normal velocity
                    vn1 = Vec2.dot(dv1, normal);
                    ASSERT && common.assert(Math.abs(vn1 - vcp1.velocityBias) < k_errorTol);
                }
                break;
            }
            //
            // Case 3: vn2 = 0 and x1 = 0
            //
            // vn1 = a11 * 0 + a12 * x2 + b1'
            // 0 = a21 * 0 + a22 * x2 + b2'
            //
            x.x = 0;
            x.y = -vcp2.normalMass * b.y;
            vn1 = this.v_K.ey.x * x.y + b.x;
            vn2 = 0;
            if (x.y >= 0 && vn1 >= 0) {
                // Resubstitute for the incremental impulse
                var d = Vec2.sub(x, a);
                // Apply incremental impulse
                var P1 = Vec2.mul(d.x, normal);
                var P2 = Vec2.mul(d.y, normal);
                vA.wSub(mA, P1, mA, P2);
                wA -= iA * (Vec2.cross(vcp1.rA, P1) + Vec2.cross(vcp2.rA, P2));
                vB.wAdd(mB, P1, mB, P2);
                wB += iB * (Vec2.cross(vcp1.rB, P1) + Vec2.cross(vcp2.rB, P2));
                // Accumulate
                vcp1.normalImpulse = x.x;
                vcp2.normalImpulse = x.y;
                if (DEBUG_SOLVER) {
                    // Postconditions
                    var dv2B = Vec2.add(vB, Vec2.cross(wB, vcp2.rB));
                    var dv2A = Vec2.add(vA, Vec2.cross(wA, vcp2.rA));
                    var dv1 = Vec2.sub(dv2B, dv2A);
                    // Compute normal velocity
                    vn2 = Vec2.dot(dv2, normal);
                    ASSERT && common.assert(Math.abs(vn2 - vcp2.velocityBias) < k_errorTol);
                }
                break;
            }
            //
            // Case 4: x1 = 0 and x2 = 0
            // 
            // vn1 = b1
            // vn2 = b2;
            //
            x.x = 0;
            x.y = 0;
            vn1 = b.x;
            vn2 = b.y;
            if (vn1 >= 0 && vn2 >= 0) {
                // Resubstitute for the incremental impulse
                var d = Vec2.sub(x, a);
                // Apply incremental impulse
                var P1 = Vec2.mul(d.x, normal);
                var P2 = Vec2.mul(d.y, normal);
                vA.wSub(mA, P1, mA, P2);
                wA -= iA * (Vec2.cross(vcp1.rA, P1) + Vec2.cross(vcp2.rA, P2));
                vB.wAdd(mB, P1, mB, P2);
                wB += iB * (Vec2.cross(vcp1.rB, P1) + Vec2.cross(vcp2.rB, P2));
                // Accumulate
                vcp1.normalImpulse = x.x;
                vcp2.normalImpulse = x.y;
                break;
            }
            // No solution, give up. This is hit sometimes, but it doesn't seem to
            // matter.
            break;
        }
    }
    velocityA.v.set(vA);
    velocityA.w = wA;
    velocityB.v.set(vB);
    velocityB.w = wB;
};

/**
 * Friction mixing law. The idea is to allow either fixture to drive the
 * restitution to zero. For example, anything slides on ice.
 */
function mixFriction(friction1, friction2) {
    return Math.sqrt(friction1 * friction2);
}

/**
 * Restitution mixing law. The idea is allow for anything to bounce off an
 * inelastic surface. For example, a superball bounces on anything.
 */
function mixRestitution(restitution1, restitution2) {
    return restitution1 > restitution2 ? restitution1 : restitution2;
}

var s_registers = [];

/**
 * @param fn function(fixtureA, indexA, fixtureB, indexB) Contact
 */
Contact.addType = function(type1, type2, callback) {
    s_registers[type1] = s_registers[type1] || {};
    s_registers[type1][type2] = callback;
};

Contact.create = function(fixtureA, indexA, fixtureB, indexB) {
    var typeA = fixtureA.getType();
    // Shape.Type
    var typeB = fixtureB.getType();
    // Shape.Type
    // TODO: pool contacts
    var contact, evaluateFcn;
    if (evaluateFcn = s_registers[typeA] && s_registers[typeA][typeB]) {
        contact = new Contact(fixtureA, indexA, fixtureB, indexB, evaluateFcn);
    } else if (evaluateFcn = s_registers[typeB] && s_registers[typeB][typeA]) {
        contact = new Contact(fixtureB, indexB, fixtureA, indexA, evaluateFcn);
    } else {
        return null;
    }
    // Contact creation may swap fixtures.
    fixtureA = contact.getFixtureA();
    fixtureB = contact.getFixtureB();
    indexA = contact.getChildIndexA();
    indexB = contact.getChildIndexB();
    var bodyA = fixtureA.getBody();
    var bodyB = fixtureB.getBody();
    // Connect to body A
    contact.m_nodeA.contact = contact;
    contact.m_nodeA.other = bodyB;
    contact.m_nodeA.prev = null;
    contact.m_nodeA.next = bodyA.m_contactList;
    if (bodyA.m_contactList != null) {
        bodyA.m_contactList.prev = contact.m_nodeA;
    }
    bodyA.m_contactList = contact.m_nodeA;
    // Connect to body B
    contact.m_nodeB.contact = contact;
    contact.m_nodeB.other = bodyA;
    contact.m_nodeB.prev = null;
    contact.m_nodeB.next = bodyB.m_contactList;
    if (bodyB.m_contactList != null) {
        bodyB.m_contactList.prev = contact.m_nodeB;
    }
    bodyB.m_contactList = contact.m_nodeB;
    // Wake up the bodies
    if (fixtureA.isSensor() == false && fixtureB.isSensor() == false) {
        bodyA.setAwake(true);
        bodyB.setAwake(true);
    }
    return contact;
};

Contact.destroy = function(contact, listener) {
    var fixtureA = contact.m_fixtureA;
    var fixtureB = contact.m_fixtureB;
    var bodyA = fixtureA.getBody();
    var bodyB = fixtureB.getBody();
    if (contact.isTouching()) {
        listener.endContact(contact);
    }
    // Remove from body 1
    if (contact.m_nodeA.prev) {
        contact.m_nodeA.prev.next = contact.m_nodeA.next;
    }
    if (contact.m_nodeA.next) {
        contact.m_nodeA.next.prev = contact.m_nodeA.prev;
    }
    if (contact.m_nodeA == bodyA.m_contactList) {
        bodyA.m_contactList = contact.m_nodeA.next;
    }
    // Remove from body 2
    if (contact.m_nodeB.prev) {
        contact.m_nodeB.prev.next = contact.m_nodeB.next;
    }
    if (contact.m_nodeB.next) {
        contact.m_nodeB.next.prev = contact.m_nodeB.prev;
    }
    if (contact.m_nodeB == bodyB.m_contactList) {
        bodyB.m_contactList = contact.m_nodeB.next;
    }
    if (contact.m_manifold.pointCount > 0 && fixtureA.isSensor() == false && fixtureB.isSensor() == false) {
        bodyA.setAwake(true);
        bodyB.setAwake(true);
    }
    var typeA = fixtureA.getType();
    // Shape.Type
    var typeB = fixtureB.getType();
    // Shape.Type
    var destroyFcn = s_registers[typeA][typeB].destroyFcn;
    if (typeof destroyFcn === "function") {
        destroyFcn(contact);
    }
};


},{"./Manifold":6,"./Settings":7,"./collision/Distance":13,"./common/Mat22":16,"./common/Math":18,"./common/Rot":20,"./common/Transform":22,"./common/Vec2":23,"./util/common":50}],4:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Fixture;

var common = require("./util/common");

var options = require("./util/options");

var Vec2 = require("./common/Vec2");

var AABB = require("./collision/AABB");

/**
 * @typedef {Object} FixtureDef
 *
 * A fixture definition is used to create a fixture. This class defines an
 * abstract fixture definition. You can reuse fixture definitions safely.
 * 
 * @prop friction The friction coefficient, usually in the range [0,1]
 * @prop restitution The restitution (elasticity) usually in the range [0,1]
 * @prop density The density, usually in kg/m^2
 * @prop isSensor A sensor shape collects contact information but never
 *       generates a collision response
 * @prop userData
 * @prop filterGroupIndex Zero, positive or negative collision group. Fixtures with same positive groupIndex always collide and fixtures with same
 * negative groupIndex never collide.
 * @prop filterCategoryBits Collision category bit or bits that this fixture belongs
 *       to. If groupIndex is zero or not matching, then at least one bit in this fixture
 * categoryBits should match other fixture maskBits and vice versa.
 * @prop filterMaskBits Collision category bit or bits that this fixture accept for
 *       collision.
 */
var FixtureDef = {
    userData: null,
    friction: .2,
    restitution: 0,
    density: 0,
    isSensor: false,
    filterGroupIndex: 0,
    filterCategoryBits: 1,
    filterMaskBits: 65535
};

/**
 * This proxy is used internally to connect shape children to the broad-phase.
 */
function FixtureProxy(fixture, childIndex) {
    this.aabb = new AABB();
    this.fixture = fixture;
    this.childIndex = childIndex;
    this.proxyId;
}

/**
 * A fixture is used to attach a shape to a body for collision detection. A
 * fixture inherits its transform from its parent. Fixtures hold additional
 * non-geometric data such as friction, collision filters, etc. Fixtures are
 * created via Body.createFixture.
 * 
 * @param {Shape|FixtureDef} shape Shape of fixture definition.
 * @param {FixtureDef|number} def Fixture definition or number.
 */
function Fixture(body, shape, def) {
    if (shape.shape) {
        def = shape;
        shape = shape.shape;
    } else if (typeof def === "number") {
        def = {
            density: def
        };
    }
    def = options(def, FixtureDef);
    this.m_body = body;
    this.m_friction = def.friction;
    this.m_restitution = def.restitution;
    this.m_density = def.density;
    this.m_isSensor = def.isSensor;
    this.m_filterGroupIndex = def.filterGroupIndex;
    this.m_filterCategoryBits = def.filterCategoryBits;
    this.m_filterMaskBits = def.filterMaskBits;
    // TODO validate shape
    this.m_shape = shape;
    //.clone();
    this.m_next = null;
    this.m_proxies = [];
    this.m_proxyCount = 0;
    var childCount = this.m_shape.getChildCount();
    for (var i = 0; i < childCount; ++i) {
        this.m_proxies[i] = new FixtureProxy(this, i);
    }
    this.m_userData = def.userData;
}

/**
 * Get the type of the child shape. You can use this to down cast to the
 * concrete shape.
 */
Fixture.prototype.getType = function() {
    return this.m_shape.getType();
};

/**
 * Get the child shape. You can modify the child shape, however you should not
 * change the number of vertices because this will crash some collision caching
 * mechanisms. Manipulating the shape may lead to non-physical behavior.
 */
Fixture.prototype.getShape = function() {
    return this.m_shape;
};

/**
 * A sensor shape collects contact information but never generates a collision
 * response.
 */
Fixture.prototype.isSensor = function() {
    return this.m_isSensor;
};

/**
 * Set if this fixture is a sensor.
 */
Fixture.prototype.setSensor = function(sensor) {
    if (sensor != this.m_isSensor) {
        this.m_body.setAwake(true);
        this.m_isSensor = sensor;
    }
};

/**
 * Get the contact filtering data.
 */
// Fixture.prototype.getFilterData = function() {
//   return this.m_filter;
// }
/**
 * Get the user data that was assigned in the fixture definition. Use this to
 * store your application specific data.
 */
Fixture.prototype.getUserData = function() {
    return this.m_userData;
};

/**
 * Set the user data. Use this to store your application specific data.
 */
Fixture.prototype.setUserData = function(data) {
    this.m_userData = data;
};

/**
 * Get the parent body of this fixture. This is null if the fixture is not
 * attached.
 */
Fixture.prototype.getBody = function() {
    return this.m_body;
};

/**
 * Get the next fixture in the parent body's fixture list.
 */
Fixture.prototype.getNext = function() {
    return this.m_next;
};

/**
 * Get the density of this fixture.
 */
Fixture.prototype.getDensity = function() {
    return this.m_density;
};

/**
 * Set the density of this fixture. This will _not_ automatically adjust the
 * mass of the body. You must call Body.resetMassData to update the body's mass.
 */
Fixture.prototype.setDensity = function(density) {
    ASSERT && common.assert(Math.isFinite(density) && density >= 0);
    this.m_density = density;
};

/**
 * Get the coefficient of friction, usually in the range [0,1].
 */
Fixture.prototype.getFriction = function() {
    return this.m_friction;
};

/**
 * Set the coefficient of friction. This will not change the friction of
 * existing contacts.
 */
Fixture.prototype.setFriction = function(friction) {
    this.m_friction = friction;
};

/**
 * Get the coefficient of restitution.
 */
Fixture.prototype.getRestitution = function() {
    return this.m_restitution;
};

/**
 * Set the coefficient of restitution. This will not change the restitution of
 * existing contacts.
 */
Fixture.prototype.setRestitution = function(restitution) {
    this.m_restitution = restitution;
};

/**
 * Test a point in world coordinates for containment in this fixture.
 */
Fixture.prototype.testPoint = function(p) {
    return this.m_shape.testPoint(this.m_body.getTransform(), p);
};

/**
 * Cast a ray against this shape.
 */
Fixture.prototype.rayCast = function(output, input, childIndex) {
    return this.m_shape.rayCast(output, input, this.m_body.getTransform(), childIndex);
};

/**
 * Get the mass data for this fixture. The mass data is based on the density and
 * the shape. The rotational inertia is about the shape's origin. This operation
 * may be expensive.
 */
Fixture.prototype.getMassData = function(massData) {
    this.m_shape.computeMass(massData, this.m_density);
};

/**
 * Get the fixture's AABB. This AABB may be enlarge and/or stale. If you need a
 * more accurate AABB, compute it using the shape and the body transform.
 */
Fixture.prototype.getAABB = function(childIndex) {
    ASSERT && common.assert(0 <= childIndex && childIndex < this.m_proxyCount);
    return this.m_proxies[childIndex].aabb;
};

/**
 * These support body activation/deactivation.
 */
Fixture.prototype.createProxies = function(broadPhase, xf) {
    ASSERT && common.assert(this.m_proxyCount == 0);
    // Create proxies in the broad-phase.
    this.m_proxyCount = this.m_shape.getChildCount();
    for (var i = 0; i < this.m_proxyCount; ++i) {
        var proxy = this.m_proxies[i];
        this.m_shape.computeAABB(proxy.aabb, xf, i);
        proxy.proxyId = broadPhase.createProxy(proxy.aabb, proxy);
    }
};

Fixture.prototype.destroyProxies = function(broadPhase) {
    // Destroy proxies in the broad-phase.
    for (var i = 0; i < this.m_proxyCount; ++i) {
        var proxy = this.m_proxies[i];
        broadPhase.destroyProxy(proxy.proxyId);
        proxy.proxyId = null;
    }
    this.m_proxyCount = 0;
};

/**
 * Updates this fixture proxy in broad-phase (with combined AABB of current and
 * next transformation).
 */
Fixture.prototype.synchronize = function(broadPhase, xf1, xf2) {
    for (var i = 0; i < this.m_proxyCount; ++i) {
        var proxy = this.m_proxies[i];
        // Compute an AABB that covers the swept shape (may miss some rotation
        // effect).
        var aabb1 = new AABB();
        var aabb2 = new AABB();
        this.m_shape.computeAABB(aabb1, xf1, proxy.childIndex);
        this.m_shape.computeAABB(aabb2, xf2, proxy.childIndex);
        proxy.aabb.combine(aabb1, aabb2);
        var displacement = Vec2.sub(xf2.p, xf1.p);
        broadPhase.moveProxy(proxy.proxyId, proxy.aabb, displacement);
    }
};

/**
 * Set the contact filtering data. This will not update contacts until the next
 * time step when either parent body is active and awake. This automatically
 * calls refilter.
 */
Fixture.prototype.setFilterData = function(filter) {
    this.m_filterGroupIndex = filter.groupIndex;
    this.m_filterCategoryBits = filter.categoryBits;
    this.m_filterMaskBits = filter.maskBits;
    this.refilter();
};

Fixture.prototype.getFilterGroupIndex = function() {
    return this.m_filterGroupIndex;
};

Fixture.prototype.getFilterCategoryBits = function() {
    return this.m_filterCategoryBits;
};

Fixture.prototype.getFilterMaskBits = function() {
    return this.m_filterMaskBits;
};

/**
 * Call this if you want to establish collision that was previously disabled by
 * ContactFilter.
 */
Fixture.prototype.refilter = function() {
    if (this.m_body == null) {
        return;
    }
    // Flag associated contacts for filtering.
    var edge = this.m_body.getContactList();
    while (edge) {
        var contact = edge.contact;
        var fixtureA = contact.getFixtureA();
        var fixtureB = contact.getFixtureB();
        if (fixtureA == this || fixtureB == this) {
            contact.flagForFiltering();
        }
        edge = edge.next;
    }
    var world = this.m_body.getWorld();
    if (world == null) {
        return;
    }
    // Touch each proxy so that new pairs may be created
    var broadPhase = world.m_broadPhase;
    for (var i = 0; i < this.m_proxyCount; ++i) {
        broadPhase.touchProxy(this.m_proxies[i].proxyId);
    }
};

/**
 * Implement this method to provide collision filtering, if you want finer
 * control over contact creation.
 * 
 * Return true if contact calculations should be performed between these two
 * fixtures.
 * 
 * Warning: for performance reasons this is only called when the AABBs begin to
 * overlap.
 * 
 * @param {Fixture} fixtureA
 * @param {Fixture} fixtureB
 */
Fixture.prototype.shouldCollide = function(that) {
    if (that.m_filterGroupIndex == this.m_filterGroupIndex && that.m_filterGroupIndex != 0) {
        return that.m_filterGroupIndex > 0;
    }
    var collide = (that.m_filterMaskBits & this.m_filterCategoryBits) != 0 && (that.m_filterCategoryBits & this.m_filterMaskBits) != 0;
    return collide;
};


},{"./collision/AABB":11,"./common/Vec2":23,"./util/common":50,"./util/options":52}],5:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Joint;

var common = require("./util/common");

/**
 * A joint edge is used to connect bodies and joints together in a joint graph
 * where each body is a node and each joint is an edge. A joint edge belongs to
 * a doubly linked list maintained in each attached body. Each joint has two
 * joint nodes, one for each attached body.
 * 
 * @prop {Body} other provides quick access to the other body attached.
 * @prop {Joint} joint the joint
 * @prop {JointEdge} prev the previous joint edge in the body's joint list
 * @prop {JointEdge} next the next joint edge in the body's joint list
 */
function JointEdge() {
    this.other = null;
    this.joint = null;
    this.prev = null;
    this.next = null;
}

/**
 * @typedef {Object} JointDef
 *
 * Joint definitions are used to construct joints.
 * 
 * @prop userData Use this to attach application specific data to your joints.
 *       void userData;
 * @prop {boolean} collideConnected Set this flag to true if the attached bodies
 *       should collide.
 */
var JointDef = {
    userData: null,
    collideConnected: false
};

/**
 * The base joint class. Joints are used to constraint two bodies together in
 * various fashions. Some joints also feature limits and motors.
 * 
 * @param {JointDef} def
 * @param {Body} bodyA first attached body.
 * @param {Body} bodyB The second attached body.
 */
function Joint(def, bodyA, bodyB) {
    bodyA = def.bodyA || bodyA;
    bodyB = def.bodyB || bodyB;
    ASSERT && common.assert(bodyA);
    ASSERT && common.assert(bodyB);
    ASSERT && common.assert(bodyA != bodyB);
    this.m_type = "unknown-joint";
    this.m_bodyA = bodyA;
    this.m_bodyB = bodyB;
    this.m_index = 0;
    this.m_collideConnected = !!def.collideConnected;
    this.m_prev = null;
    this.m_next = null;
    this.m_edgeA = new JointEdge();
    this.m_edgeB = new JointEdge();
    this.m_islandFlag = false;
    this.m_userData = def.userData;
}

/**
 * Short-cut function to determine if either body is inactive.
 * 
 * @returns {boolean}
 */
Joint.prototype.isActive = function() {
    return this.m_bodyA.isActive() && this.m_bodyB.isActive();
};

/**
 * Get the type of the concrete joint.
 * 
 * @returns JointType
 */
Joint.prototype.getType = function() {
    return this.m_type;
};

/**
 * Get the first body attached to this joint.
 * 
 * @returns Body
 */
Joint.prototype.getBodyA = function() {
    return this.m_bodyA;
};

/**
 * Get the second body attached to this joint.
 * 
 * @returns Body
 */
Joint.prototype.getBodyB = function() {
    return this.m_bodyB;
};

/**
 * Get the next joint the world joint list.
 * 
 * @returns Joint
 */
Joint.prototype.getNext = function() {
    return this.m_next;
};

Joint.prototype.getUserData = function() {
    return this.m_userData;
};

Joint.prototype.setUserData = function(data) {
    this.m_userData = data;
};

/**
 * Get collide connected. Note: modifying the collide connect flag won't work
 * correctly because the flag is only checked when fixture AABBs begin to
 * overlap.
 * 
 * @returns {boolean}
 */
Joint.prototype.getCollideConnected = function() {
    return this.m_collideConnected;
};

/**
 * Get the anchor point on bodyA in world coordinates.
 * 
 * @return {Vec2}
 */
Joint.prototype.getAnchorA = function() {};

/**
 * Get the anchor point on bodyB in world coordinates.
 * 
 * @return {Vec2}
 */
Joint.prototype.getAnchorB = function() {};

/**
 * Get the reaction force on bodyB at the joint anchor in Newtons.
 * 
 * @param {float} inv_dt
 * @return {Vec2}
 */
Joint.prototype.getReactionForce = function(inv_dt) {};

/**
 * Get the reaction torque on bodyB in N*m.
 * 
 * @param {float} inv_dt
 * @return {float}
 */
Joint.prototype.getReactionTorque = function(inv_dt) {};

/**
 * Shift the origin for any points stored in world coordinates.
 * 
 * @param {Vec2} newOrigin
 */
Joint.prototype.shiftOrigin = function(newOrigin) {};

/**
 */
Joint.prototype.initVelocityConstraints = function(step) {};

/**
 */
Joint.prototype.solveVelocityConstraints = function(step) {};

/**
 * This returns true if the position errors are within tolerance.
 */
Joint.prototype.solvePositionConstraints = function(step) {};


},{"./util/common":50}],6:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

var common = require("./util/common");

var Vec2 = require("./common/Vec2");

var Transform = require("./common/Transform");

var Math = require("./common/Math");

var Rot = require("./common/Rot");

module.exports = Manifold;

module.exports.clipSegmentToLine = clipSegmentToLine;

module.exports.clipVertex = ClipVertex;

module.exports.getPointStates = getPointStates;

module.exports.PointState = PointState;

// Manifold Type
Manifold.e_circles = 0;

Manifold.e_faceA = 1;

Manifold.e_faceB = 2;

// ContactFeature Type
Manifold.e_vertex = 0;

Manifold.e_face = 1;

/**
 * A manifold for two touching convex shapes. Manifolds are created in `evaluate`
 * method of Contact subclasses.
 * 
 * Supported manifold types are e_faceA or e_faceB for clip point versus plane
 * with radius and e_circles point versus point with radius.
 * 
 * We store contacts in this way so that position correction can account for
 * movement, which is critical for continuous physics. All contact scenarios
 * must be expressed in one of these types. This structure is stored across time
 * steps, so we keep it small.
 * 
 * @prop type e_circle, e_faceA, e_faceB
 * @prop localPoint Usage depends on manifold type:<br>
 *       e_circles: the local center of circleA <br>
 *       e_faceA: the center of faceA <br>
 *       e_faceB: the center of faceB
 * @prop localNormal Usage depends on manifold type:<br>
 *       e_circles: not used <br>
 *       e_faceA: the normal on polygonA <br>
 *       e_faceB: the normal on polygonB
 * @prop points The points of contact {ManifoldPoint[]}
 * @prop pointCount The number of manifold points
 */
function Manifold() {
    this.type;
    this.localNormal = Vec2.zero();
    this.localPoint = Vec2.zero();
    this.points = [ new ManifoldPoint(), new ManifoldPoint() ];
    this.pointCount = 0;
}

/**
 * A manifold point is a contact point belonging to a contact manifold. It holds
 * details related to the geometry and dynamics of the contact points.
 * 
 * This structure is stored across time steps, so we keep it small.
 * 
 * Note: impulses are used for internal caching and may not provide reliable
 * contact forces, especially for high speed collisions.
 * 
 * @prop {Vec2} localPoint Usage depends on manifold type:<br>
 *       e_circles: the local center of circleB<br>
 *       e_faceA: the local center of cirlceB or the clip point of polygonB<br>
 *       e_faceB: the clip point of polygonA.
 * @prop normalImpulse The non-penetration impulse
 * @prop tangentImpulse The friction impulse
 * @prop {ContactID} id Uniquely identifies a contact point between two shapes
 *       to facilatate warm starting
 */
function ManifoldPoint() {
    this.localPoint = Vec2.zero();
    this.normalImpulse = 0;
    this.tangentImpulse = 0;
    this.id = new ContactID();
}

/**
 * Contact ids to facilitate warm starting.
 * 
 * @prop {ContactFeature} cf
 * @prop key Used to quickly compare contact ids.
 * 
 */
function ContactID() {
    // TODO merge with ManifoldPoint?
    this.cf = new ContactFeature();
    this.key;
}

ContactID.prototype.set = function(o) {
    this.key = o.key;
    this.cf.set(o.cf);
};

/**
 * The features that intersect to form the contact point.
 * 
 * @prop indexA Feature index on shapeA
 * @prop indexB Feature index on shapeB
 * @prop typeA The feature type on shapeA
 * @prop typeB The feature type on shapeB
 */
function ContactFeature() {
    // TODO merge with ContactID?
    this.indexA;
    this.indexB;
    this.typeA;
    this.typeB;
}

ContactFeature.prototype.set = function(o) {
    this.indexA = o.indexA;
    this.indexB = o.indexB;
    this.typeA = o.typeA;
    this.typeB = o.typeB;
};

/**
 * This is used to compute the current state of a contact manifold.
 * 
 * @prop normal World vector pointing from A to B
 * @prop points World contact point (point of intersection)
 * @prop separations A negative value indicates overlap, in meters
 */
function WorldManifold() {
    this.normal;
    this.points = [];
    // [maxManifoldPoints]
    this.separations = [];
}

/**
 * Evaluate the manifold with supplied transforms. This assumes modest motion
 * from the original state. This does not change the point count, impulses, etc.
 * The radii must come from the shapes that generated the manifold.
 * 
 * @param {WorldManifold} [wm]
 */
Manifold.prototype.getWorldManifold = function(wm, xfA, radiusA, xfB, radiusB) {
    if (this.pointCount == 0) {
        return;
    }
    wm = wm || new WorldManifold();
    var normal = wm.normal;
    var points = wm.points;
    var separations = wm.separations;
    // TODO: improve
    switch (this.type) {
      case Manifold.e_circles:
        normal = Vec2.neo(1, 0);
        var pointA = Transform.mul(xfA, this.localPoint);
        var pointB = Transform.mul(xfB, this.points[0].localPoint);
        var dist = Vec2.sub(pointB, pointA);
        if (Vec2.lengthSquared(dist) > Math.EPSILON * Math.EPSILON) {
            normal.set(dist);
            normal.normalize();
        }
        points[0] = Vec2.mid(pointA, pointB);
        separations[0] = -radiusB - radiusA;
        points.length = 1;
        separations.length = 1;
        break;

      case Manifold.e_faceA:
        normal = Rot.mul(xfA.q, this.localNormal);
        var planePoint = Transform.mul(xfA, this.localPoint);
        DEBUG && common.debug("faceA", this.localPoint.x, this.localPoint.y, this.localNormal.x, this.localNormal.y, normal.x, normal.y);
        for (var i = 0; i < this.pointCount; ++i) {
            var clipPoint = Transform.mul(xfB, this.points[i].localPoint);
            var cA = Vec2.clone(clipPoint).wAdd(radiusA - Vec2.dot(Vec2.sub(clipPoint, planePoint), normal), normal);
            var cB = Vec2.clone(clipPoint).wSub(radiusB, normal);
            points[i] = Vec2.mid(cA, cB);
            separations[i] = Vec2.dot(Vec2.sub(cB, cA), normal);
            DEBUG && common.debug(i, this.points[i].localPoint.x, this.points[i].localPoint.y, planePoint.x, planePoint.y, xfA.p.x, xfA.p.y, xfA.q.c, xfA.q.s, xfB.p.x, xfB.p.y, xfB.q.c, xfB.q.s, radiusA, radiusB, clipPoint.x, clipPoint.y, cA.x, cA.y, cB.x, cB.y, separations[i], points[i].x, points[i].y);
        }
        points.length = this.pointCount;
        separations.length = this.pointCount;
        break;

      case Manifold.e_faceB:
        normal = Rot.mul(xfB.q, this.localNormal);
        var planePoint = Transform.mul(xfB, this.localPoint);
        for (var i = 0; i < this.pointCount; ++i) {
            var clipPoint = Transform.mul(xfA, this.points[i].localPoint);
            var cB = Vec2.zero().wSet(1, clipPoint, radiusB - Vec2.dot(Vec2.sub(clipPoint, planePoint), normal), normal);
            var cA = Vec2.zero().wSet(1, clipPoint, -radiusA, normal);
            points[i] = Vec2.mid(cA, cB);
            separations[i] = Vec2.dot(Vec2.sub(cA, cB), normal);
        }
        points.length = this.pointCount;
        separations.length = this.pointCount;
        // Ensure normal points from A to B.
        normal.mul(-1);
        break;
    }
    wm.normal = normal;
    wm.points = points;
    wm.separations = separations;
    return wm;
};

/**
 * This is used for determining the state of contact points.
 * 
 * @prop {0} nullState Point does not exist
 * @prop {1} addState Point was added in the update
 * @prop {2} persistState Point persisted across the update
 * @prop {3} removeState Point was removed in the update
 */
var PointState = {
    // TODO: use constants
    nullState: 0,
    addState: 1,
    persistState: 2,
    removeState: 3
};

/**
 * Compute the point states given two manifolds. The states pertain to the
 * transition from manifold1 to manifold2. So state1 is either persist or remove
 * while state2 is either add or persist.
 * 
 * @param {PointState[Settings.maxManifoldPoints]} state1
 * @param {PointState[Settings.maxManifoldPoints]} state2
 */
function getPointStates(state1, state2, manifold1, manifold2) {
    // for (var i = 0; i < Settings.maxManifoldPoints; ++i) {
    // state1[i] = PointState.nullState;
    // state2[i] = PointState.nullState;
    // }
    // Detect persists and removes.
    for (var i = 0; i < manifold1.pointCount; ++i) {
        var id = manifold1.points[i].id;
        // ContactID
        state1[i] = PointState.removeState;
        for (var j = 0; j < manifold2.pointCount; ++j) {
            if (manifold2.points[j].id.key == id.key) {
                state1[i] = PointState.persistState;
                break;
            }
        }
    }
    // Detect persists and adds.
    for (var i = 0; i < manifold2.pointCount; ++i) {
        var id = manifold2.points[i].id;
        // ContactID
        state2[i] = PointState.addState;
        for (var j = 0; j < manifold1.pointCount; ++j) {
            if (manifold1.points[j].id.key == id.key) {
                state2[i] = PointState.persistState;
                break;
            }
        }
    }
}

/**
 * Used for computing contact manifolds.
 * 
 * @prop {Vec2} v
 * @prop {ContactID} id
 */
function ClipVertex() {
    this.v = Vec2.zero();
    this.id = new ContactID();
}

ClipVertex.prototype.set = function(o) {
    this.v.set(o.v);
    this.id.set(o.id);
};

/**
 * Clipping for contact manifolds. Sutherland-Hodgman clipping.
 * 
 * @param {ClipVertex[2]} vOut
 * @param {ClipVertex[2]} vIn
 */
function clipSegmentToLine(vOut, vIn, normal, offset, vertexIndexA) {
    // Start with no output points
    var numOut = 0;
    // Calculate the distance of end points to the line
    var distance0 = Vec2.dot(normal, vIn[0].v) - offset;
    var distance1 = Vec2.dot(normal, vIn[1].v) - offset;
    // If the points are behind the plane
    if (distance0 <= 0) vOut[numOut++].set(vIn[0]);
    if (distance1 <= 0) vOut[numOut++].set(vIn[1]);
    // If the points are on different sides of the plane
    if (distance0 * distance1 < 0) {
        // Find intersection point of edge and plane
        var interp = distance0 / (distance0 - distance1);
        vOut[numOut].v.wSet(1 - interp, vIn[0].v, interp, vIn[1].v);
        // VertexA is hitting edgeB.
        vOut[numOut].id.cf.indexA = vertexIndexA;
        vOut[numOut].id.cf.indexB = vIn[0].id.cf.indexB;
        vOut[numOut].id.cf.typeA = ContactFeature.e_vertex;
        vOut[numOut].id.cf.typeB = ContactFeature.e_face;
        ++numOut;
    }
    return numOut;
}


},{"./common/Math":18,"./common/Rot":20,"./common/Transform":22,"./common/Vec2":23,"./util/common":50}],7:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

// TODO merge with World options?
var Settings = exports;

/**
 * Tuning constants based on meters-kilograms-seconds (MKS) units.
 */
// Collision
/**
 * The maximum number of contact points between two convex shapes. Do not change
 * this value.
 */
Settings.maxManifoldPoints = 2;

/**
 * The maximum number of vertices on a convex polygon. You cannot increase this
 * too much because BlockAllocator has a maximum object size.
 */
Settings.maxPolygonVertices = 12;

/**
 * This is used to fatten AABBs in the dynamic tree. This allows proxies to move
 * by a small amount without triggering a tree adjustment. This is in meters.
 */
Settings.aabbExtension = .1;

/**
 * This is used to fatten AABBs in the dynamic tree. This is used to predict the
 * future position based on the current displacement. This is a dimensionless
 * multiplier.
 */
Settings.aabbMultiplier = 2;

/**
 * A small length used as a collision and constraint tolerance. Usually it is
 * chosen to be numerically significant, but visually insignificant.
 */
Settings.linearSlop = .005;

Settings.linearSlopSquared = Settings.linearSlop * Settings.linearSlop;

/**
 * A small angle used as a collision and constraint tolerance. Usually it is
 * chosen to be numerically significant, but visually insignificant.
 */
Settings.angularSlop = 2 / 180 * Math.PI;

/**
 * The radius of the polygon/edge shape skin. This should not be modified.
 * Making this smaller means polygons will have an insufficient buffer for
 * continuous collision. Making it larger may create artifacts for vertex
 * collision.
 */
Settings.polygonRadius = 2 * Settings.linearSlop;

/**
 * Maximum number of sub-steps per contact in continuous physics simulation.
 */
Settings.maxSubSteps = 8;

// Dynamics
/**
 * Maximum number of contacts to be handled to solve a TOI impact.
 */
Settings.maxTOIContacts = 32;

/**
 * Maximum iterations to solve a TOI.
 */
Settings.maxTOIIterations = 20;

/**
 * Maximum iterations to find Distance.
 */
Settings.maxDistnceIterations = 20;

/**
 * A velocity threshold for elastic collisions. Any collision with a relative
 * linear velocity below this threshold will be treated as inelastic.
 */
Settings.velocityThreshold = 1;

/**
 * The maximum linear position correction used when solving constraints. This
 * helps to prevent overshoot.
 */
Settings.maxLinearCorrection = .2;

/**
 * The maximum angular position correction used when solving constraints. This
 * helps to prevent overshoot.
 */
Settings.maxAngularCorrection = 8 / 180 * Math.PI;

/**
 * The maximum linear velocity of a body. This limit is very large and is used
 * to prevent numerical problems. You shouldn't need to adjust this.
 */
Settings.maxTranslation = 2;

Settings.maxTranslationSquared = Settings.maxTranslation * Settings.maxTranslation;

/**
 * The maximum angular velocity of a body. This limit is very large and is used
 * to prevent numerical problems. You shouldn't need to adjust this.
 */
Settings.maxRotation = .5 * Math.PI;

Settings.maxRotationSquared = Settings.maxRotation * Settings.maxRotation;

/**
 * This scale factor controls how fast overlap is resolved. Ideally this would
 * be 1 so that overlap is removed in one time step. However using values close
 * to 1 often lead to overshoot.
 */
Settings.baumgarte = .2;

Settings.toiBaugarte = .75;

// Sleep
/**
 * The time that a body must be still before it will go to sleep.
 */
Settings.timeToSleep = .5;

/**
 * A body cannot sleep if its linear velocity is above this tolerance.
 */
Settings.linearSleepTolerance = .01;

Settings.linearSleepToleranceSqr = Math.pow(Settings.linearSleepTolerance, 2);

/**
 * A body cannot sleep if its angular velocity is above this tolerance.
 */
Settings.angularSleepTolerance = 2 / 180 * Math.PI;

Settings.angularSleepToleranceSqr = Math.pow(Settings.angularSleepTolerance, 2);


},{}],8:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Shape;

var Math = require("./common/Math");

/**
 * A shape is used for collision detection. You can create a shape however you
 * like. Shapes used for simulation in World are created automatically when a
 * Fixture is created. Shapes may encapsulate one or more child shapes.
 */
function Shape() {
    this.m_type;
    this.m_radius;
}

Shape.isValid = function(shape) {
    return !!shape;
};

Shape.prototype.getRadius = function() {
    return this.m_radius;
};

/**
 * Get the type of this shape. You can use this to down cast to the concrete
 * shape.
 * 
 * @return the shape type.
 */
Shape.prototype.getType = function() {
    return this.m_type;
};

/**
 * @deprecated
 *
 * clone the concrete shape.
 */
Shape.prototype._clone = function() {};

/**
 * // Get the number of child primitives.
 */
Shape.prototype.getChildCount = function() {};

/**
 * Test a point for containment in this shape. This only works for convex
 * shapes.
 * 
 * @param {Transform} xf The shape world transform.
 * @param p A point in world coordinates.
 */
Shape.prototype.testPoint = function(xf, p) {};

/**
 * Cast a ray against a child shape.
 * 
 * @param {RayCastOutput} output The ray-cast results.
 * @param {RayCastInput} input The ray-cast input parameters.
 * @param {Transform} transform The transform to be applied to the shape.
 * @param childIndex The child shape index
 */
Shape.prototype.rayCast = function(output, input, transform, childIndex) {};

/**
 * Given a transform, compute the associated axis aligned bounding box for a
 * child shape.
 * 
 * @param {AABB} aabb Returns the axis aligned box.
 * @param {Transform} xf The world transform of the shape.
 * @param childIndex The child shape
 */
Shape.prototype.computeAABB = function(aabb, xf, childIndex) {};

/**
 * Compute the mass properties of this shape using its dimensions and density.
 * The inertia tensor is computed about the local origin.
 * 
 * @param {MassData} massData Returns the mass data for this shape.
 * @param density The density in kilograms per meter squared.
 */
Shape.prototype.computeMass = function(massData, density) {};

/**
 * @param {DistanceProxy} proxy
 */
Shape.prototype.computeDistanceProxy = function(proxy) {};


},{"./common/Math":18}],9:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Solver;

module.exports.TimeStep = TimeStep;

var Settings = require("./Settings");

var common = require("./util/common");

var Timer = require("./util/Timer");

var Vec2 = require("./common/Vec2");

var Math = require("./common/Math");

var Body = require("./Body");

var Contact = require("./Contact");

var Joint = require("./Joint");

var TimeOfImpact = require("./collision/TimeOfImpact");

var TOIInput = TimeOfImpact.Input;

var TOIOutput = TimeOfImpact.Output;

var Distance = require("./collision/Distance");

var DistanceInput = Distance.Input;

var DistanceOutput = Distance.Output;

var DistanceProxy = Distance.Proxy;

var SimplexCache = Distance.Cache;

/**
 * Profiling data. Times are in milliseconds.
 */
function Profile() {
    this.solveInit;
    this.solveVelocity;
    this.solvePosition;
}

function TimeStep(dt) {
    this.dt = 0;
    // time step
    this.inv_dt = 0;
    // inverse time step (0 if dt == 0)
    this.velocityIterations = 0;
    this.positionIterations = 0;
    this.warmStarting = false;
    this.blockSolve = true;
    // timestep ratio for variable timestep
    this.inv_dt0 = 0;
    this.dtRatio = 1;
}

TimeStep.prototype.reset = function(dt) {
    if (this.dt > 0) {
        this.inv_dt0 = this.inv_dt;
    }
    this.dt = dt;
    this.inv_dt = dt == 0 ? 0 : 1 / dt;
    this.dtRatio = dt * this.inv_dt0;
};

/**
 * Finds and solves islands. An island is a connected subset of the world.
 * 
 * @param {World} world
 * @param {Profile} profile
 */
function Solver(world) {
    this.m_world = world;
    this.m_profile = new Profile();
    this.m_stack = [];
    this.m_bodies = [];
    this.m_contacts = [];
    this.m_joints = [];
}

Solver.prototype.clear = function() {
    this.m_stack.length = 0;
    this.m_bodies.length = 0;
    this.m_contacts.length = 0;
    this.m_joints.length = 0;
};

Solver.prototype.addBody = function(body) {
    ASSERT && common.assert(body instanceof Body, "Not a Body!", body);
    this.m_bodies.push(body);
};

Solver.prototype.addContact = function(contact) {
    ASSERT && common.assert(contact instanceof Contact, "Not a Contact!", contact);
    this.m_contacts.push(contact);
};

Solver.prototype.addJoint = function(joint) {
    ASSERT && common.assert(joint instanceof Joint, "Not a Joint!", joint);
    this.m_joints.push(joint);
};

/**
 * @param {TimeStep} step
 */
Solver.prototype.solveWorld = function(step) {
    var world = this.m_world;
    var profile = this.m_profile;
    profile.solveInit = 0;
    profile.solveVelocity = 0;
    profile.solvePosition = 0;
    // Clear all the island flags.
    for (var b = world.m_bodyList; b; b = b.m_next) {
        b.m_islandFlag = false;
    }
    for (var c = world.m_contactList; c; c = c.m_next) {
        c.m_islandFlag = false;
    }
    for (var j = world.m_jointList; j; j = j.m_next) {
        j.m_islandFlag = false;
    }
    // Build and simulate all awake islands.
    var stack = this.m_stack;
    var loop = -1;
    for (var seed = world.m_bodyList; seed; seed = seed.m_next) {
        loop++;
        if (seed.m_islandFlag) {
            continue;
        }
        if (seed.isAwake() == false || seed.isActive() == false) {
            continue;
        }
        // The seed can be dynamic or kinematic.
        if (seed.isStatic()) {
            continue;
        }
        // Reset island and stack.
        this.clear();
        stack.push(seed);
        seed.m_islandFlag = true;
        // Perform a depth first search (DFS) on the constraint graph.
        while (stack.length > 0) {
            // Grab the next body off the stack and add it to the island.
            var b = stack.pop();
            ASSERT && common.assert(b.isActive() == true);
            this.addBody(b);
            // Make sure the body is awake.
            b.setAwake(true);
            // To keep islands as small as possible, we don't
            // propagate islands across static bodies.
            if (b.isStatic()) {
                continue;
            }
            // Search all contacts connected to this body.
            for (var ce = b.m_contactList; ce; ce = ce.next) {
                var contact = ce.contact;
                // Has this contact already been added to an island?
                if (contact.m_islandFlag) {
                    continue;
                }
                // Is this contact solid and touching?
                if (contact.isEnabled() == false || contact.isTouching() == false) {
                    continue;
                }
                // Skip sensors.
                var sensorA = contact.m_fixtureA.m_isSensor;
                var sensorB = contact.m_fixtureB.m_isSensor;
                if (sensorA || sensorB) {
                    continue;
                }
                this.addContact(contact);
                contact.m_islandFlag = true;
                var other = ce.other;
                // Was the other body already added to this island?
                if (other.m_islandFlag) {
                    continue;
                }
                // ASSERT && common.assert(stack.length < world.m_bodyCount);
                stack.push(other);
                other.m_islandFlag = true;
            }
            // Search all joints connect to this body.
            for (var je = b.m_jointList; je; je = je.next) {
                if (je.joint.m_islandFlag == true) {
                    continue;
                }
                var other = je.other;
                // Don't simulate joints connected to inactive bodies.
                if (other.isActive() == false) {
                    continue;
                }
                this.addJoint(je.joint);
                je.joint.m_islandFlag = true;
                if (other.m_islandFlag) {
                    continue;
                }
                // ASSERT && common.assert(stack.length < world.m_bodyCount);
                stack.push(other);
                other.m_islandFlag = true;
            }
        }
        this.solveIsland(step);
        // Post solve cleanup.
        for (var i = 0; i < this.m_bodies.length; ++i) {
            // Allow static bodies to participate in other islands.
            // TODO: are they added at all?
            var b = this.m_bodies[i];
            if (b.isStatic()) {
                b.m_islandFlag = false;
            }
        }
    }
};

/**
 * @param {TimeStep} step
 */
Solver.prototype.solveIsland = function(step) {
    var world = this.m_world;
    var profile = this.m_profile;
    var gravity = world.m_gravity;
    var allowSleep = world.m_allowSleep;
    var timer = Timer.now();
    var h = step.dt;
    // Integrate velocities and apply damping. Initialize the body state.
    for (var i = 0; i < this.m_bodies.length; ++i) {
        var body = this.m_bodies[i];
        var c = Vec2.clone(body.m_sweep.c);
        var a = body.m_sweep.a;
        var v = Vec2.clone(body.m_linearVelocity);
        var w = body.m_angularVelocity;
        // Store positions for continuous collision.
        body.m_sweep.c0.set(body.m_sweep.c);
        body.m_sweep.a0 = body.m_sweep.a;
        DEBUG && common.debug("P: ", a, c.x, c.y, w, v.x, v.y);
        if (body.isDynamic()) {
            // Integrate velocities.
            v.wAdd(h * body.m_gravityScale, gravity);
            v.wAdd(h * body.m_invMass, body.m_force);
            w += h * body.m_invI * body.m_torque;
            DEBUG && common.debug("N: " + h, body.m_gravityScale, gravity.x, gravity.y, body.m_invMass, body.m_force.x, body.m_force.y);
            /**
       * <pre>
       * Apply damping.
       * ODE: dv/dt + c * v = 0
       * Solution: v(t) = v0 * exp(-c * t)
       * Time step: v(t + dt) = v0 * exp(-c * (t + dt)) = v0 * exp(-c * t) * exp(-c * dt) = v * exp(-c * dt)
       * v2 = exp(-c * dt) * v1
       * Pade approximation:
       * v2 = v1 * 1 / (1 + c * dt)
       * </pre>
       */
            v.mul(1 / (1 + h * body.m_linearDamping));
            w *= 1 / (1 + h * body.m_angularDamping);
        }
        common.debug("A: ", a, c.x, c.y, w, v.x, v.y);
        body.c_position.c = c;
        body.c_position.a = a;
        body.c_velocity.v = v;
        body.c_velocity.w = w;
    }
    timer = Timer.now();
    for (var i = 0; i < this.m_contacts.length; ++i) {
        var contact = this.m_contacts[i];
        contact.initConstraint(step);
    }
    DEBUG && this.printBodies("M: ");
    for (var i = 0; i < this.m_contacts.length; ++i) {
        var contact = this.m_contacts[i];
        contact.initVelocityConstraint(step);
    }
    DEBUG && this.printBodies("R: ");
    if (step.warmStarting) {
        // Warm start.
        for (var i = 0; i < this.m_contacts.length; ++i) {
            var contact = this.m_contacts[i];
            contact.warmStartConstraint(step);
        }
    }
    DEBUG && this.printBodies("Q: ");
    for (var i = 0; i < this.m_joints.length; ++i) {
        var joint = this.m_joints[i];
        joint.initVelocityConstraints(step);
    }
    DEBUG && this.printBodies("E: ");
    profile.solveInit = Timer.diff(timer);
    // Solve velocity constraints
    timer = Timer.now();
    for (var i = 0; i < step.velocityIterations; ++i) {
        DEBUG && common.debug("--", i);
        for (var j = 0; j < this.m_joints.length; ++j) {
            var joint = this.m_joints[j];
            joint.solveVelocityConstraints(step);
        }
        for (var j = 0; j < this.m_contacts.length; ++j) {
            var contact = this.m_contacts[j];
            contact.solveVelocityConstraint(step);
        }
    }
    DEBUG && this.printBodies("D: ");
    // Store impulses for warm starting
    for (var i = 0; i < this.m_contacts.length; ++i) {
        var contact = this.m_contacts[i];
        contact.storeConstraintImpulses(step);
    }
    profile.solveVelocity = Timer.diff(timer);
    DEBUG && this.printBodies("C: ");
    // Integrate positions
    for (var i = 0; i < this.m_bodies.length; ++i) {
        var body = this.m_bodies[i];
        var c = Vec2.clone(body.c_position.c);
        var a = body.c_position.a;
        var v = Vec2.clone(body.c_velocity.v);
        var w = body.c_velocity.w;
        // Check for large velocities
        var translation = Vec2.mul(h, v);
        if (Vec2.lengthSquared(translation) > Settings.maxTranslationSquared) {
            var ratio = Settings.maxTranslation / translation.length();
            v.mul(ratio);
        }
        var rotation = h * w;
        if (rotation * rotation > Settings.maxRotationSquared) {
            var ratio = Settings.maxRotation / Math.abs(rotation);
            w *= ratio;
        }
        // Integrate
        c.wAdd(h, v);
        a += h * w;
        body.c_position.c.set(c);
        body.c_position.a = a;
        body.c_velocity.v.set(v);
        body.c_velocity.w = w;
    }
    DEBUG && this.printBodies("B: ");
    // Solve position constraints
    timer = Timer.now();
    var positionSolved = false;
    for (var i = 0; i < step.positionIterations; ++i) {
        var minSeparation = 0;
        for (var j = 0; j < this.m_contacts.length; ++j) {
            var contact = this.m_contacts[j];
            var separation = contact.solvePositionConstraint(step);
            minSeparation = Math.min(minSeparation, separation);
        }
        // We can't expect minSpeparation >= -Settings.linearSlop because we don't
        // push the separation above -Settings.linearSlop.
        var contactsOkay = minSeparation >= -3 * Settings.linearSlop;
        var jointsOkay = true;
        for (var j = 0; j < this.m_joints.length; ++j) {
            var joint = this.m_joints[j];
            var jointOkay = joint.solvePositionConstraints(step);
            jointsOkay = jointsOkay && jointOkay;
        }
        if (contactsOkay && jointsOkay) {
            // Exit early if the position errors are small.
            positionSolved = true;
            break;
        }
    }
    DEBUG && this.printBodies("L: ");
    // Copy state buffers back to the bodies
    for (var i = 0; i < this.m_bodies.length; ++i) {
        var body = this.m_bodies[i];
        body.m_sweep.c.set(body.c_position.c);
        body.m_sweep.a = body.c_position.a;
        body.m_linearVelocity.set(body.c_velocity.v);
        body.m_angularVelocity = body.c_velocity.w;
        body.synchronizeTransform();
    }
    profile.solvePosition = Timer.diff(timer);
    this.postSolveIsland();
    if (allowSleep) {
        var minSleepTime = Infinity;
        var linTolSqr = Settings.linearSleepToleranceSqr;
        var angTolSqr = Settings.angularSleepToleranceSqr;
        for (var i = 0; i < this.m_bodies.length; ++i) {
            var body = this.m_bodies[i];
            if (body.isStatic()) {
                continue;
            }
            if (body.m_autoSleepFlag == false || body.m_angularVelocity * body.m_angularVelocity > angTolSqr || Vec2.lengthSquared(body.m_linearVelocity) > linTolSqr) {
                body.m_sleepTime = 0;
                minSleepTime = 0;
            } else {
                body.m_sleepTime += h;
                minSleepTime = Math.min(minSleepTime, body.m_sleepTime);
            }
        }
        if (minSleepTime >= Settings.timeToSleep && positionSolved) {
            for (var i = 0; i < this.m_bodies.length; ++i) {
                var body = this.m_bodies[i];
                body.setAwake(false);
            }
        }
    }
};

Solver.prototype.printBodies = function(tag) {
    for (var i = 0; i < this.m_bodies.length; ++i) {
        var b = this.m_bodies[i];
        common.debug(tag, b.c_position.a, b.c_position.c.x, b.c_position.c.y, b.c_velocity.w, b.c_velocity.v.x, b.c_velocity.v.y);
    }
};

var s_subStep = new TimeStep();

// reuse
/**
 * Find TOI contacts and solve them.
 *
 * @param {TimeStep} step
 */
Solver.prototype.solveWorldTOI = function(step) {
    DEBUG && common.debug("TOI++++++World");
    var world = this.m_world;
    var profile = this.m_profile;
    DEBUG && common.debug("Z:", world.m_stepComplete);
    if (world.m_stepComplete) {
        for (var b = world.m_bodyList; b; b = b.m_next) {
            b.m_islandFlag = false;
            b.m_sweep.alpha0 = 0;
            DEBUG && common.debug("b.alpha0:", b.m_sweep.alpha0);
        }
        for (var c = world.m_contactList; c; c = c.m_next) {
            // Invalidate TOI
            c.m_toiFlag = false;
            c.m_islandFlag = false;
            c.m_toiCount = 0;
            c.m_toi = 1;
        }
    }
    if (DEBUG) for (var c = world.m_contactList; c; c = c.m_next) {
        DEBUG && common.debug("X:", c.m_toiFlag);
    }
    // Find TOI events and solve them.
    for (;;) {
        DEBUG && common.debug(";;");
        // Find the first TOI.
        var minContact = null;
        // Contact
        var minAlpha = 1;
        for (var c = world.m_contactList; c; c = c.m_next) {
            DEBUG && common.debug("alpha0::", c.getFixtureA().getBody().m_sweep.alpha0, c.getFixtureB().getBody().m_sweep.alpha0);
            // Is this contact disabled?
            if (c.isEnabled() == false) {
                continue;
            }
            DEBUG && common.debug("toiCount:", c.m_toiCount, Settings.maxSubSteps);
            // Prevent excessive sub-stepping.
            if (c.m_toiCount > Settings.maxSubSteps) {
                continue;
            }
            DEBUG && common.debug("toiFlag:", c.m_toiFlag);
            var alpha = 1;
            if (c.m_toiFlag) {
                // This contact has a valid cached TOI.
                alpha = c.m_toi;
            } else {
                var fA = c.getFixtureA();
                var fB = c.getFixtureB();
                DEBUG && common.debug("sensor:", fA.isSensor(), fB.isSensor());
                // Is there a sensor?
                if (fA.isSensor() || fB.isSensor()) {
                    continue;
                }
                var bA = fA.getBody();
                var bB = fB.getBody();
                ASSERT && common.assert(bA.isDynamic() || bB.isDynamic());
                var activeA = bA.isAwake() && !bA.isStatic();
                var activeB = bB.isAwake() && !bB.isStatic();
                DEBUG && common.debug("awakestatic:", bA.isAwake(), bA.isStatic());
                DEBUG && common.debug("awakestatic:", bB.isAwake(), bB.isStatic());
                DEBUG && common.debug("active:", activeA, activeB);
                // Is at least one body active (awake and dynamic or kinematic)?
                if (activeA == false && activeB == false) {
                    continue;
                }
                DEBUG && common.debug("alpha:", alpha, bA.m_sweep.alpha0, bB.m_sweep.alpha0);
                var collideA = bA.isBullet() || !bA.isDynamic();
                var collideB = bB.isBullet() || !bB.isDynamic();
                DEBUG && common.debug("collide:", collideA, collideB);
                // Are these two non-bullet dynamic bodies?
                if (collideA == false && collideB == false) {
                    continue;
                }
                // Compute the TOI for this contact.
                // Put the sweeps onto the same time interval.
                var alpha0 = bA.m_sweep.alpha0;
                if (bA.m_sweep.alpha0 < bB.m_sweep.alpha0) {
                    alpha0 = bB.m_sweep.alpha0;
                    bA.m_sweep.advance(alpha0);
                } else if (bB.m_sweep.alpha0 < bA.m_sweep.alpha0) {
                    alpha0 = bA.m_sweep.alpha0;
                    bB.m_sweep.advance(alpha0);
                }
                DEBUG && common.debug("alpha0:", alpha0, bA.m_sweep.alpha0, bB.m_sweep.alpha0);
                ASSERT && common.assert(alpha0 < 1);
                var indexA = c.getChildIndexA();
                var indexB = c.getChildIndexB();
                var sweepA = bA.m_sweep;
                var sweepB = bB.m_sweep;
                DEBUG && common.debug("sweepA", sweepA.localCenter.x, sweepA.localCenter.y, sweepA.c.x, sweepA.c.y, sweepA.a, sweepA.alpha0, sweepA.c0.x, sweepA.c0.y, sweepA.a0);
                DEBUG && common.debug("sweepB", sweepB.localCenter.x, sweepB.localCenter.y, sweepB.c.x, sweepB.c.y, sweepB.a, sweepB.alpha0, sweepB.c0.x, sweepB.c0.y, sweepB.a0);
                // Compute the time of impact in interval [0, minTOI]
                var input = new TOIInput();
                // TODO: reuse
                input.proxyA.set(fA.getShape(), indexA);
                input.proxyB.set(fB.getShape(), indexB);
                input.sweepA.set(bA.m_sweep);
                input.sweepB.set(bB.m_sweep);
                input.tMax = 1;
                var output = new TOIOutput();
                // TODO: reuse
                TimeOfImpact(output, input);
                // DEBUG && common.debug(output.t, output.state);
                // Beta is the fraction of the remaining portion of the [time?].
                var beta = output.t;
                DEBUG && common.debug("state:", output.state, TOIOutput.e_touching);
                if (output.state == TOIOutput.e_touching) {
                    alpha = Math.min(alpha0 + (1 - alpha0) * beta, 1);
                } else {
                    alpha = 1;
                }
                c.m_toi = alpha;
                c.m_toiFlag = true;
            }
            DEBUG && common.debug("minAlpha:", minAlpha, alpha);
            if (alpha < minAlpha) {
                // This is the minimum TOI found so far.
                minContact = c;
                minAlpha = alpha;
            }
        }
        DEBUG && common.debug("minContact:", minContact == null, 1 - 10 * Math.EPSILON < minAlpha, minAlpha);
        if (minContact == null || 1 - 10 * Math.EPSILON < minAlpha) {
            // No more TOI events. Done!
            world.m_stepComplete = true;
            break;
        }
        // Advance the bodies to the TOI.
        var fA = minContact.getFixtureA();
        var fB = minContact.getFixtureB();
        var bA = fA.getBody();
        var bB = fB.getBody();
        var backup1 = bA.m_sweep.clone();
        var backup2 = bB.m_sweep.clone();
        bA.advance(minAlpha);
        bB.advance(minAlpha);
        // The TOI contact likely has some new contact points.
        minContact.update(world);
        minContact.m_toiFlag = false;
        ++minContact.m_toiCount;
        // Is the contact solid?
        if (minContact.isEnabled() == false || minContact.isTouching() == false) {
            // Restore the sweeps.
            minContact.setEnabled(false);
            bA.m_sweep.set(backup1);
            bB.m_sweep.set(backup2);
            bA.synchronizeTransform();
            bB.synchronizeTransform();
            continue;
        }
        bA.setAwake(true);
        bB.setAwake(true);
        // Build the island
        this.clear();
        this.addBody(bA);
        this.addBody(bB);
        this.addContact(minContact);
        bA.m_islandFlag = true;
        bB.m_islandFlag = true;
        minContact.m_islandFlag = true;
        // Get contacts on bodyA and bodyB.
        var bodies = [ bA, bB ];
        for (var i = 0; i < bodies.length; ++i) {
            var body = bodies[i];
            if (body.isDynamic()) {
                for (var ce = body.m_contactList; ce; ce = ce.next) {
                    // if (this.m_bodyCount == this.m_bodyCapacity) { break; }
                    // if (this.m_contactCount == this.m_contactCapacity) { break; }
                    var contact = ce.contact;
                    // Has this contact already been added to the island?
                    if (contact.m_islandFlag) {
                        continue;
                    }
                    // Only add if either is static, kinematic or bullet.
                    var other = ce.other;
                    if (other.isDynamic() && !body.isBullet() && !other.isBullet()) {
                        continue;
                    }
                    // Skip sensors.
                    var sensorA = contact.m_fixtureA.m_isSensor;
                    var sensorB = contact.m_fixtureB.m_isSensor;
                    if (sensorA || sensorB) {
                        continue;
                    }
                    // Tentatively advance the body to the TOI.
                    var backup = other.m_sweep.clone();
                    if (other.m_islandFlag == false) {
                        other.advance(minAlpha);
                    }
                    // Update the contact points
                    contact.update(world);
                    // Was the contact disabled by the user?
                    // Are there contact points?
                    if (contact.isEnabled() == false || contact.isTouching() == false) {
                        other.m_sweep.set(backup);
                        other.synchronizeTransform();
                        continue;
                    }
                    // Add the contact to the island
                    contact.m_islandFlag = true;
                    this.addContact(contact);
                    // Has the other body already been added to the island?
                    if (other.m_islandFlag) {
                        continue;
                    }
                    // Add the other body to the island.
                    other.m_islandFlag = true;
                    if (!other.isStatic()) {
                        other.setAwake(true);
                    }
                    this.addBody(other);
                }
            }
        }
        s_subStep.reset((1 - minAlpha) * step.dt);
        s_subStep.dtRatio = 1;
        s_subStep.positionIterations = 20;
        s_subStep.velocityIterations = step.velocityIterations;
        s_subStep.warmStarting = false;
        this.solveIslandTOI(s_subStep, bA, bB);
        // Reset island flags and synchronize broad-phase proxies.
        for (var i = 0; i < this.m_bodies.length; ++i) {
            var body = this.m_bodies[i];
            body.m_islandFlag = false;
            if (!body.isDynamic()) {
                continue;
            }
            body.synchronizeFixtures();
            // Invalidate all contact TOIs on this displaced body.
            for (var ce = body.m_contactList; ce; ce = ce.next) {
                ce.contact.m_toiFlag = false;
                ce.contact.m_islandFlag = false;
            }
        }
        // Commit fixture proxy movements to the broad-phase so that new contacts
        // are created.
        // Also, some contacts can be destroyed.
        world.findNewContacts();
        if (world.m_subStepping) {
            world.m_stepComplete = false;
            break;
        }
    }
    if (DEBUG) for (var b = world.m_bodyList; b; b = b.m_next) {
        var c = b.m_sweep.c;
        var a = b.m_sweep.a;
        var v = b.m_linearVelocity;
        var w = b.m_angularVelocity;
        DEBUG && common.debug("== ", a, c.x, c.y, w, v.x, v.y);
    }
};

/**
 * @param {TimeStep} subStep
 * @param toiA
 * @param toiB
 */
Solver.prototype.solveIslandTOI = function(subStep, toiA, toiB) {
    DEBUG && common.debug("TOI++++++Island");
    var world = this.m_world;
    var profile = this.m_profile;
    // Initialize the body state.
    for (var i = 0; i < this.m_bodies.length; ++i) {
        var body = this.m_bodies[i];
        body.c_position.c.set(body.m_sweep.c);
        body.c_position.a = body.m_sweep.a;
        body.c_velocity.v.set(body.m_linearVelocity);
        body.c_velocity.w = body.m_angularVelocity;
    }
    for (var i = 0; i < this.m_contacts.length; ++i) {
        var contact = this.m_contacts[i];
        contact.initConstraint(subStep);
    }
    // Solve position constraints.
    for (var i = 0; i < subStep.positionIterations; ++i) {
        var minSeparation = 0;
        for (var j = 0; j < this.m_contacts.length; ++j) {
            var contact = this.m_contacts[j];
            var separation = contact.solvePositionConstraintTOI(subStep, toiA, toiB);
            minSeparation = Math.min(minSeparation, separation);
        }
        // We can't expect minSpeparation >= -Settings.linearSlop because we don't
        // push the separation above -Settings.linearSlop.
        var contactsOkay = minSeparation >= -1.5 * Settings.linearSlop;
        if (contactsOkay) {
            break;
        }
    }
    if (false) {
        // Is the new position really safe?
        for (var i = 0; i < this.m_contacts.length; ++i) {
            var c = this.m_contacts[i];
            var fA = c.getFixtureA();
            var fB = c.getFixtureB();
            var bA = fA.getBody();
            var bB = fB.getBody();
            var indexA = c.getChildIndexA();
            var indexB = c.getChildIndexB();
            var input = new DistanceInput();
            input.proxyA.set(fA.getShape(), indexA);
            input.proxyB.set(fB.getShape(), indexB);
            input.transformA = bA.getTransform();
            input.transformB = bB.getTransform();
            input.useRadii = false;
            var output = new DistanceOutput();
            var cache = new SimplexCache();
            Distance(output, cache, input);
            if (output.distance == 0 || cache.count == 3) {
                cache.count += 0;
            }
        }
    }
    // Leap of faith to new safe state.
    toiA.m_sweep.c0.set(toiA.c_position.c);
    toiA.m_sweep.a0 = toiA.c_position.a;
    toiB.m_sweep.c0.set(toiB.c_position.c);
    toiB.m_sweep.a0 = toiB.c_position.a;
    // No warm starting is needed for TOI events because warm
    // starting impulses were applied in the discrete solver.
    for (var i = 0; i < this.m_contacts.length; ++i) {
        var contact = this.m_contacts[i];
        contact.initVelocityConstraint(subStep);
    }
    // Solve velocity constraints.
    for (var i = 0; i < subStep.velocityIterations; ++i) {
        for (var j = 0; j < this.m_contacts.length; ++j) {
            var contact = this.m_contacts[j];
            contact.solveVelocityConstraint(subStep);
        }
    }
    // Don't store the TOI contact forces for warm starting
    // because they can be quite large.
    var h = subStep.dt;
    // Integrate positions
    for (var i = 0; i < this.m_bodies.length; ++i) {
        var body = this.m_bodies[i];
        var c = Vec2.clone(body.c_position.c);
        var a = body.c_position.a;
        var v = Vec2.clone(body.c_velocity.v);
        var w = body.c_velocity.w;
        // Check for large velocities
        var translation = Vec2.mul(h, v);
        if (Vec2.dot(translation, translation) > Settings.maxTranslationSquared) {
            var ratio = Settings.maxTranslation / translation.length();
            v.mul(ratio);
        }
        var rotation = h * w;
        if (rotation * rotation > Settings.maxRotationSquared) {
            var ratio = Settings.maxRotation / Math.abs(rotation);
            w *= ratio;
        }
        // Integrate
        c.wAdd(h, v);
        a += h * w;
        body.c_position.c = c;
        body.c_position.a = a;
        body.c_velocity.v = v;
        body.c_velocity.w = w;
        // Sync bodies
        body.m_sweep.c = c;
        body.m_sweep.a = a;
        body.m_linearVelocity = v;
        body.m_angularVelocity = w;
        body.synchronizeTransform();
    }
    this.postSolveIsland();
    DEBUG && common.debug("TOI------Island");
};

/**
 * Contact impulses for reporting. Impulses are used instead of forces because
 * sub-step forces may approach infinity for rigid body collisions. These match
 * up one-to-one with the contact points in Manifold.
 */
function ContactImpulse() {
    this.normalImpulses = [];
    this.tangentImpulses = [];
}

Solver.prototype.postSolveIsland = function() {
    // TODO: report contact.v_points instead of new object?
    var impulse = new ContactImpulse();
    for (var c = 0; c < this.m_contacts.length; ++c) {
        var contact = this.m_contacts[c];
        for (var p = 0; p < contact.v_points.length; ++p) {
            impulse.normalImpulses.push(contact.v_points[p].normalImpulse);
            impulse.tangentImpulses.push(contact.v_points[p].tangentImpulse);
        }
        this.m_world.postSolve(contact, impulse);
    }
};


},{"./Body":2,"./Contact":3,"./Joint":5,"./Settings":7,"./collision/Distance":13,"./collision/TimeOfImpact":15,"./common/Math":18,"./common/Vec2":23,"./util/Timer":49,"./util/common":50}],10:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = World;

var options = require("./util/options");

var common = require("./util/common");

var Timer = require("./util/Timer");

var Vec2 = require("./common/Vec2");

var BroadPhase = require("./collision/BroadPhase");

var Solver = require("./Solver");

var Body = require("./Body");

var Contact = require("./Contact");

/**
 * @typedef {Object} WorldDef
 *
 * @prop {Vec2} [gravity = { x : 0, y : 0}]
 * @prop {boolean} [allowSleep = true]
 * @prop {boolean} [warmStarting = false]
 * @prop {boolean} [continuousPhysics = false]
 * @prop {boolean} [subStepping = false]
 * @prop {boolean} [blockSolve = true]
 * @prop {int} [velocityIterations = 8] For the velocity constraint solver.
 * @prop {int} [positionIterations = 3] For the position constraint solver.
 */
var WorldDef = {
    gravity: Vec2.zero(),
    allowSleep: true,
    warmStarting: true,
    continuousPhysics: true,
    subStepping: false,
    blockSolve: true,
    velocityIterations: 8,
    positionIterations: 3
};

/**
 * @param {WordDef|Vec2} def World definition or gravity vector.
 */
function World(def) {
    if (!(this instanceof World)) {
        return new World(def);
    }
    if (def && Vec2.isValid(def)) {
        def = {
            gravity: def
        };
    }
    def = options(def, WorldDef);
    this.m_solver = new Solver(this);
    this.m_broadPhase = new BroadPhase();
    this.m_contactList = null;
    this.m_contactCount = 0;
    this.m_bodyList = null;
    this.m_bodyCount = 0;
    this.m_jointList = null;
    this.m_jointCount = 0;
    this.m_stepComplete = true;
    this.m_allowSleep = def.allowSleep;
    this.m_gravity = Vec2.clone(def.gravity);
    this.m_clearForces = true;
    this.m_newFixture = false;
    this.m_locked = false;
    // These are for debugging the solver.
    this.m_warmStarting = def.warmStarting;
    this.m_continuousPhysics = def.continuousPhysics;
    this.m_subStepping = def.subStepping;
    this.m_blockSolve = def.blockSolve;
    this.m_velocityIterations = def.velocityIterations;
    this.m_positionIterations = def.positionIterations;
    this.m_t = 0;
    this.m_stepCount = 0;
    // Broad-phase callback.
    this.addPair = this.createContact.bind(this);
}

/**
 * Get the world body list. With the returned body, use Body.getNext to get the
 * next body in the world list. A null body indicates the end of the list.
 * 
 * @return the head of the world body list.
 */
World.prototype.getBodyList = function() {
    return this.m_bodyList;
};

/**
 * Get the world joint list. With the returned joint, use Joint.getNext to get
 * the next joint in the world list. A null joint indicates the end of the list.
 * 
 * @return the head of the world joint list.
 */
World.prototype.getJointList = function() {
    return this.m_jointList;
};

/**
 * Get the world contact list. With the returned contact, use Contact.getNext to
 * get the next contact in the world list. A null contact indicates the end of
 * the list.
 * 
 * @return the head of the world contact list. Warning: contacts are created and
 *         destroyed in the middle of a time step. Use ContactListener to avoid
 *         missing contacts.
 */
World.prototype.getContactList = function() {
    return this.m_contactList;
};

World.prototype.getBodyCount = function() {
    return this.m_bodyCount;
};

World.prototype.getJointCount = function() {
    return this.m_jointCount;
};

/**
 * Get the number of contacts (each may have 0 or more contact points).
 */
World.prototype.getContactCount = function() {
    return this.m_contactCount;
};

/**
 * Change the global gravity vector.
 */
World.prototype.setGravity = function(gravity) {
    this.m_gravity = gravity;
};

/**
 * Get the global gravity vector.
 */
World.prototype.getGravity = function() {
    return this.m_gravity;
};

/**
 * Is the world locked (in the middle of a time step).
 */
World.prototype.isLocked = function() {
    return this.m_locked;
};

/**
 * Enable/disable sleep.
 */
World.prototype.setAllowSleeping = function(flag) {
    if (flag == this.m_allowSleep) {
        return;
    }
    this.m_allowSleep = flag;
    if (this.m_allowSleep == false) {
        for (var b = this.m_bodyList; b; b = b.m_next) {
            b.setAwake(true);
        }
    }
};

World.prototype.getAllowSleeping = function() {
    return this.m_allowSleep;
};

/**
 * Enable/disable warm starting. For testing.
 */
World.prototype.setWarmStarting = function(flag) {
    this.m_warmStarting = flag;
};

World.prototype.getWarmStarting = function() {
    return this.m_warmStarting;
};

/**
 * Enable/disable continuous physics. For testing.
 */
World.prototype.setContinuousPhysics = function(flag) {
    this.m_continuousPhysics = flag;
};

World.prototype.getContinuousPhysics = function() {
    return this.m_continuousPhysics;
};

/**
 * Enable/disable single stepped continuous physics. For testing.
 */
World.prototype.setSubStepping = function(flag) {
    this.m_subStepping = flag;
};

World.prototype.getSubStepping = function() {
    return this.m_subStepping;
};

/**
 * Set flag to control automatic clearing of forces after each time step.
 */
World.prototype.setAutoClearForces = function(flag) {
    this.m_clearForces = flag;
};

/**
 * Get the flag that controls automatic clearing of forces after each time step.
 */
World.prototype.getAutoClearForces = function() {
    return this.m_clearForces;
};

/**
 * Manually clear the force buffer on all bodies. By default, forces are cleared
 * automatically after each call to step. The default behavior is modified by
 * calling setAutoClearForces. The purpose of this function is to support
 * sub-stepping. Sub-stepping is often used to maintain a fixed sized time step
 * under a variable frame-rate. When you perform sub-stepping you will disable
 * auto clearing of forces and instead call clearForces after all sub-steps are
 * complete in one pass of your game loop.
 * 
 * @see setAutoClearForces
 */
World.prototype.clearForces = function() {
    for (var body = this.m_bodyList; body; body = body.getNext()) {
        body.m_force.setZero();
        body.m_torque = 0;
    }
};

/**
 * @function World~rayCastCallback
 * 
 * @param fixture
 */
/**
 * Query the world for all fixtures that potentially overlap the provided AABB.
 * 
 * @param {World~queryCallback} queryCallback Called for each fixture
 *          found in the query AABB. It may return `false` to terminate the
 *          query.
 * 
 * @param aabb The query box.
 */
World.prototype.queryAABB = function(aabb, queryCallback) {
    ASSERT && common.assert(typeof queryCallback === "function");
    var broadPhase = this.m_broadPhase;
    this.m_broadPhase.query(aabb, function(proxyId) {
        //TODO GC
        var proxy = broadPhase.getUserData(proxyId);
        // FixtureProxy
        return queryCallback(proxy.fixture);
    });
};

/**
 * @function World~rayCastCallback
 * 
 * Callback class for ray casts. See World.rayCast
 * 
 * Called for each fixture found in the query. You control how the ray cast
 * proceeds by returning a float: return -1: ignore this fixture and continue
 * return 0: terminate the ray cast return fraction: clip the ray to this point
 * return 1: don't clip the ray and continue
 * 
 * @param fixture The fixture hit by the ray
 * @param point The point of initial intersection
 * @param normal The normal vector at the point of intersection
 * @param fraction
 * 
 * @return {float} -1 to filter, 0 to terminate, fraction to clip the ray for
 *         closest hit, 1 to continue
 */
/**
 * 
 * Ray-cast the world for all fixtures in the path of the ray. Your callback
 * controls whether you get the closest point, any point, or n-points. The
 * ray-cast ignores shapes that contain the starting point.
 * 
 * @param {World~RayCastCallback} reportFixtureCallback A user implemented
 *          callback function.
 * @param point1 The ray starting point
 * @param point2 The ray ending point
 */
World.prototype.rayCast = function(point1, point2, reportFixtureCallback) {
    ASSERT && common.assert(typeof reportFixtureCallback === "function");
    var broadPhase = this.m_broadPhase;
    this.m_broadPhase.rayCast({
        maxFraction: 1,
        p1: point1,
        p2: point2
    }, function(input, proxyId) {
        // TODO GC
        var proxy = broadPhase.getUserData(proxyId);
        // FixtureProxy
        var fixture = proxy.fixture;
        var index = proxy.childIndex;
        var output = {};
        // TODO GC
        var hit = fixture.rayCast(output, input, index);
        if (hit) {
            var fraction = output.fraction;
            var point = Vec2.add(Vec2.mul(1 - fraction, input.p1), Vec2.mul(fraction, input.p2));
            return reportFixtureCallback(fixture, point, output.normal, fraction);
        }
        return input.maxFraction;
    });
};

/**
 * Get the number of broad-phase proxies.
 */
World.prototype.getProxyCount = function() {
    return this.m_broadPhase.getProxyCount();
};

/**
 * Get the height of broad-phase dynamic tree.
 */
World.prototype.getTreeHeight = function() {
    return this.m_broadPhase.getTreeHeight();
};

/**
 * Get the balance of broad-phase dynamic tree.
 * 
 * @returns {int}
 */
World.prototype.getTreeBalance = function() {
    return this.m_broadPhase.getTreeBalance();
};

/**
 * Get the quality metric of broad-phase dynamic tree. The smaller the better.
 * The minimum is 1.
 * 
 * @returns {float}
 */
World.prototype.getTreeQuality = function() {
    return this.m_broadPhase.getTreeQuality();
};

/**
 * Shift the world origin. Useful for large worlds. The body shift formula is:
 * position -= newOrigin
 * 
 * @param {Vec2} newOrigin The new origin with respect to the old origin
 */
World.prototype.shiftOrigin = function(newOrigin) {
    ASSERT && common.assert(this.m_locked == false);
    if (this.m_locked) {
        return;
    }
    for (var b = this.m_bodyList; b; b = b.m_next) {
        b.m_xf.p.sub(newOrigin);
        b.m_sweep.c0.sub(newOrigin);
        b.m_sweep.c.sub(newOrigin);
    }
    for (var j = this.m_jointList; j; j = j.m_next) {
        j.shiftOrigin(newOrigin);
    }
    this.m_broadPhase.shiftOrigin(newOrigin);
};

/**
 * Create a rigid body given a definition. No reference to the definition is
 * retained.
 * 
 * Warning: This function is locked during callbacks.
 * 
 * @param {BodyDef|Vec2} def Body definition or position.
 * @param {float} angle Body angle if def is position.
 */
World.prototype.createBody = function(def, angle) {
    ASSERT && common.assert(this.isLocked() == false);
    if (this.isLocked()) {
        return null;
    }
    if (def && Vec2.isValid(def)) {
        def = {
            position: def,
            angle: angle
        };
    }
    var body = new Body(this, def);
    // Add to world doubly linked list.
    body.m_prev = null;
    body.m_next = this.m_bodyList;
    if (this.m_bodyList) {
        this.m_bodyList.m_prev = body;
    }
    this.m_bodyList = body;
    ++this.m_bodyCount;
    return body;
};

World.prototype.createDynamicBody = function(def, angle) {
    if (!def) {
        def = {};
    } else if (Vec2.isValid(def)) {
        def = {
            position: def,
            angle: angle
        };
    }
    def.type = "dynamic";
    return this.createBody(def);
};

World.prototype.createKinematicBody = function(def, angle) {
    if (!def) {
        def = {};
    } else if (Vec2.isValid(def)) {
        def = {
            position: def,
            angle: angle
        };
    }
    def.type = "kinematic";
    return this.createBody(def);
};

/**
 * Destroy a rigid body given a definition. No reference to the definition is
 * retained.
 * 
 * Warning: This automatically deletes all associated shapes and joints.
 * 
 * Warning: This function is locked during callbacks.
 * 
 * @param {Body} b
 */
World.prototype.destroyBody = function(b) {
    ASSERT && common.assert(this.m_bodyCount > 0);
    ASSERT && common.assert(this.isLocked() == false);
    if (this.isLocked()) {
        return;
    }
    if (b.m_destroyed) {
        return false;
    }
    // Delete the attached joints.
    var je = b.m_jointList;
    while (je) {
        var je0 = je;
        je = je.next;
        this.publish("remove-joint", je0.joint);
        this.destroyJoint(je0.joint);
        b.m_jointList = je;
    }
    b.m_jointList = null;
    // Delete the attached contacts.
    var ce = b.m_contactList;
    while (ce) {
        var ce0 = ce;
        ce = ce.next;
        this.destroyContact(ce0.contact);
        b.m_contactList = ce;
    }
    b.m_contactList = null;
    // Delete the attached fixtures. This destroys broad-phase proxies.
    var f = b.m_fixtureList;
    while (f) {
        var f0 = f;
        f = f.m_next;
        this.publish("remove-fixture", f0);
        f0.destroyProxies(this.m_broadPhase);
        b.m_fixtureList = f;
    }
    b.m_fixtureList = null;
    // Remove world body list.
    if (b.m_prev) {
        b.m_prev.m_next = b.m_next;
    }
    if (b.m_next) {
        b.m_next.m_prev = b.m_prev;
    }
    if (b == this.m_bodyList) {
        this.m_bodyList = b.m_next;
    }
    b.m_destroyed = true;
    --this.m_bodyCount;
    return true;
};

/**
 * Create a joint to constrain bodies together. No reference to the definition
 * is retained. This may cause the connected bodies to cease colliding.
 * 
 * Warning: This function is locked during callbacks.
 * 
 * @param {Joint} join
 * @param {Body} bodyB
 * @param {Body} bodyA
 */
World.prototype.createJoint = function(joint) {
    ASSERT && common.assert(!!joint.m_bodyA);
    ASSERT && common.assert(!!joint.m_bodyB);
    ASSERT && common.assert(this.isLocked() == false);
    if (this.isLocked()) {
        return null;
    }
    // Connect to the world list.
    joint.m_prev = null;
    joint.m_next = this.m_jointList;
    if (this.m_jointList) {
        this.m_jointList.m_prev = joint;
    }
    this.m_jointList = joint;
    ++this.m_jointCount;
    // Connect to the bodies' doubly linked lists.
    joint.m_edgeA.joint = joint;
    joint.m_edgeA.other = joint.m_bodyB;
    joint.m_edgeA.prev = null;
    joint.m_edgeA.next = joint.m_bodyA.m_jointList;
    if (joint.m_bodyA.m_jointList) joint.m_bodyA.m_jointList.prev = joint.m_edgeA;
    joint.m_bodyA.m_jointList = joint.m_edgeA;
    joint.m_edgeB.joint = joint;
    joint.m_edgeB.other = joint.m_bodyA;
    joint.m_edgeB.prev = null;
    joint.m_edgeB.next = joint.m_bodyB.m_jointList;
    if (joint.m_bodyB.m_jointList) joint.m_bodyB.m_jointList.prev = joint.m_edgeB;
    joint.m_bodyB.m_jointList = joint.m_edgeB;
    // If the joint prevents collisions, then flag any contacts for filtering.
    if (joint.m_collideConnected == false) {
        for (var edge = joint.m_bodyB.getContactList(); edge; edge = edge.next) {
            if (edge.other == joint.m_bodyA) {
                // Flag the contact for filtering at the next time step (where either
                // body is awake).
                edge.contact.flagForFiltering();
            }
        }
    }
    // Note: creating a joint doesn't wake the bodies.
    return joint;
};

/**
 * Destroy a joint. This may cause the connected bodies to begin colliding.
 * Warning: This function is locked during callbacks.
 * 
 * @param {Joint} join
 */
World.prototype.destroyJoint = function(joint) {
    ASSERT && common.assert(this.isLocked() == false);
    if (this.isLocked()) {
        return;
    }
    // Remove from the doubly linked list.
    if (joint.m_prev) {
        joint.m_prev.m_next = joint.m_next;
    }
    if (joint.m_next) {
        joint.m_next.m_prev = joint.m_prev;
    }
    if (joint == this.m_jointList) {
        this.m_jointList = joint.m_next;
    }
    // Disconnect from bodies.
    var bodyA = joint.m_bodyA;
    var bodyB = joint.m_bodyB;
    // Wake up connected bodies.
    bodyA.setAwake(true);
    bodyB.setAwake(true);
    // Remove from body 1.
    if (joint.m_edgeA.prev) {
        joint.m_edgeA.prev.next = joint.m_edgeA.next;
    }
    if (joint.m_edgeA.next) {
        joint.m_edgeA.next.prev = joint.m_edgeA.prev;
    }
    if (joint.m_edgeA == bodyA.m_jointList) {
        bodyA.m_jointList = joint.m_edgeA.next;
    }
    joint.m_edgeA.prev = null;
    joint.m_edgeA.next = null;
    // Remove from body 2
    if (joint.m_edgeB.prev) {
        joint.m_edgeB.prev.next = joint.m_edgeB.next;
    }
    if (joint.m_edgeB.next) {
        joint.m_edgeB.next.prev = joint.m_edgeB.prev;
    }
    if (joint.m_edgeB == bodyB.m_jointList) {
        bodyB.m_jointList = joint.m_edgeB.next;
    }
    joint.m_edgeB.prev = null;
    joint.m_edgeB.next = null;
    ASSERT && common.assert(this.m_jointCount > 0);
    --this.m_jointCount;
    // If the joint prevents collisions, then flag any contacts for filtering.
    if (joint.m_collideConnected == false) {
        var edge = bodyB.getContactList();
        while (edge) {
            if (edge.other == bodyA) {
                // Flag the contact for filtering at the next time step (where either
                // body is awake).
                edge.contact.flagForFiltering();
            }
            edge = edge.next;
        }
    }
    this.publish("remove-joint", joint);
};

var s_step = new Solver.TimeStep();

// reuse
/**
 * Take a time step. This performs collision detection, integration, and
 * constraint solution.
 *
 * Broad-phase, narrow-phase, solve and solve time of impacts.
 *
 * @param {float} timeStep Time step, this should not vary.
 * @param {int} velocityIterations
 * @param {int} positionIterations
 */
World.prototype.step = function(timeStep, velocityIterations, positionIterations) {
    if ((velocityIterations | 0) !== velocityIterations) {
        // TODO: remove this in future
        velocityIterations = 0;
    }
    velocityIterations = velocityIterations || this.m_velocityIterations;
    positionIterations = positionIterations || this.m_positionIterations;
    // TODO: move this to testbed
    this.m_stepCount++;
    // If new fixtures were added, we need to find the new contacts.
    if (this.m_newFixture) {
        this.findNewContacts();
        this.m_newFixture = false;
    }
    this.m_locked = true;
    s_step.reset(timeStep);
    s_step.velocityIterations = velocityIterations;
    s_step.positionIterations = positionIterations;
    s_step.warmStarting = this.m_warmStarting;
    s_step.blockSolve = this.m_blockSolve;
    // Update contacts. This is where some contacts are destroyed.
    this.updateContacts();
    // Integrate velocities, solve velocity constraints, and integrate positions.
    if (this.m_stepComplete && timeStep > 0) {
        this.m_solver.solveWorld(s_step);
        // Synchronize fixtures, check for out of range bodies.
        for (var b = this.m_bodyList; b; b = b.getNext()) {
            // If a body was not in an island then it did not move.
            if (b.m_islandFlag == false) {
                continue;
            }
            if (b.isStatic()) {
                continue;
            }
            // Update fixtures (for broad-phase).
            b.synchronizeFixtures();
        }
        // Look for new contacts.
        this.findNewContacts();
    }
    // Handle TOI events.
    if (this.m_continuousPhysics && timeStep > 0) {
        this.m_solver.solveWorldTOI(s_step);
    }
    if (this.m_clearForces) {
        this.clearForces();
    }
    this.m_locked = false;
};

/**
 * Call this method to find new contacts.
 */
World.prototype.findNewContacts = function() {
    this.m_broadPhase.updatePairs(this.addPair);
};

/**
 * @private
 * 
 * @param {FixtureProxy} proxyA
 * @param {FixtureProxy} proxyB
 */
World.prototype.createContact = function(proxyA, proxyB) {
    var fixtureA = proxyA.fixture;
    var fixtureB = proxyB.fixture;
    var indexA = proxyA.childIndex;
    var indexB = proxyB.childIndex;
    var bodyA = fixtureA.getBody();
    var bodyB = fixtureB.getBody();
    // Are the fixtures on the same body?
    if (bodyA == bodyB) {
        return;
    }
    // TODO_ERIN use a hash table to remove a potential bottleneck when both
    // bodies have a lot of contacts.
    // Does a contact already exist?
    var edge = bodyB.getContactList();
    // ContactEdge
    while (edge) {
        if (edge.other == bodyA) {
            var fA = edge.contact.getFixtureA();
            var fB = edge.contact.getFixtureB();
            var iA = edge.contact.getChildIndexA();
            var iB = edge.contact.getChildIndexB();
            if (fA == fixtureA && fB == fixtureB && iA == indexA && iB == indexB) {
                // A contact already exists.
                return;
            }
            if (fA == fixtureB && fB == fixtureA && iA == indexB && iB == indexA) {
                // A contact already exists.
                return;
            }
        }
        edge = edge.next;
    }
    if (bodyB.shouldCollide(bodyA) == false) {
        return;
    }
    if (fixtureB.shouldCollide(fixtureA) == false) {
        return;
    }
    // Call the factory.
    var contact = Contact.create(fixtureA, indexA, fixtureB, indexB);
    if (contact == null) {
        return;
    }
    // Insert into the world.
    contact.m_prev = null;
    if (this.m_contactList != null) {
        contact.m_next = this.m_contactList;
        this.m_contactList.m_prev = contact;
    }
    this.m_contactList = contact;
    ++this.m_contactCount;
};

/**
 * Removes old non-overlapping contacts, applies filters and updates contacts.
 */
World.prototype.updateContacts = function() {
    // Update awake contacts.
    var c, next_c = this.m_contactList;
    while (c = next_c) {
        next_c = c.getNext();
        var fixtureA = c.getFixtureA();
        var fixtureB = c.getFixtureB();
        var indexA = c.getChildIndexA();
        var indexB = c.getChildIndexB();
        var bodyA = fixtureA.getBody();
        var bodyB = fixtureB.getBody();
        // Is this contact flagged for filtering?
        if (c.m_filterFlag) {
            if (bodyB.shouldCollide(bodyA) == false) {
                this.destroyContact(c);
                continue;
            }
            if (fixtureB.shouldCollide(fixtureA) == false) {
                this.destroyContact(c);
                continue;
            }
            // Clear the filtering flag.
            c.m_filterFlag = false;
        }
        var activeA = bodyA.isAwake() && !bodyA.isStatic();
        var activeB = bodyB.isAwake() && !bodyB.isStatic();
        // At least one body must be awake and it must be dynamic or kinematic.
        if (activeA == false && activeB == false) {
            continue;
        }
        var proxyIdA = fixtureA.m_proxies[indexA].proxyId;
        var proxyIdB = fixtureB.m_proxies[indexB].proxyId;
        var overlap = this.m_broadPhase.testOverlap(proxyIdA, proxyIdB);
        // Here we destroy contacts that cease to overlap in the broad-phase.
        if (overlap == false) {
            this.destroyContact(c);
            continue;
        }
        // The contact persists.
        c.update(this);
    }
};

/**
 * @param {Contact} contact
 */
World.prototype.destroyContact = function(contact) {
    Contact.destroy(contact, this);
    // Remove from the world.
    if (contact.m_prev) {
        contact.m_prev.m_next = contact.m_next;
    }
    if (contact.m_next) {
        contact.m_next.m_prev = contact.m_prev;
    }
    if (contact == this.m_contactList) {
        this.m_contactList = contact.m_next;
    }
    --this.m_contactCount;
};

World.prototype._listeners = null;

/**
 * Register an event listener.
 *
 * @param {string} name
 * @param {function} listener
 */
World.prototype.on = function(name, listener) {
    if (typeof name !== "string" || typeof listener !== "function") {
        return this;
    }
    if (!this._listeners) {
        this._listeners = {};
    }
    if (!this._listeners[name]) {
        this._listeners[name] = [];
    }
    this._listeners[name].push(listener);
    return this;
};

/**
 * Remove an event listener.
 *
 * @param {string} name
 * @param {function} listener
 */
World.prototype.off = function(name, listener) {
    if (typeof name !== "string" || typeof listener !== "function") {
        return this;
    }
    var listeners = this._listeners && this._listeners[name];
    if (!listeners || !listeners.length) {
        return this;
    }
    var index = listeners.indexOf(listener);
    if (index >= 0) {
        listeners.splice(index, 1);
    }
    return this;
};

World.prototype.publish = function(name, arg1, arg2, arg3) {
    var listeners = this._listeners && this._listeners[name];
    if (!listeners || !listeners.length) {
        return 0;
    }
    for (var l = 0; l < listeners.length; l++) {
        listeners[l].call(this, arg1, arg2, arg3);
    }
    return listeners.length;
};

/**
 * @event World#remove-body
 * @event World#remove-joint
 * @event World#remove-fixture
 *
 * Joints and fixtures are destroyed when their associated body is destroyed.
 * Register a destruction listener so that you may nullify references to these
 * joints and shapes.
 *
 * `function(object)` is called when any joint or fixture is about to
 * be destroyed due to the destruction of one of its attached or parent bodies.
 */
/**
 * @private
 * @param {Contact} contact
 */
World.prototype.beginContact = function(contact) {
    this.publish("begin-contact", contact);
};

/**
 * @event World#begin-contact
 *
 * Called when two fixtures begin to touch.
 *
 * Implement contact callbacks to get contact information. You can use these
 * results for things like sounds and game logic. You can also get contact
 * results by traversing the contact lists after the time step. However, you
 * might miss some contacts because continuous physics leads to sub-stepping.
 * Additionally you may receive multiple callbacks for the same contact in a
 * single time step. You should strive to make your callbacks efficient because
 * there may be many callbacks per time step.
 *
 * Warning: You cannot create/destroy world entities inside these callbacks.
 */
/**
 * @private
 * @param {Contact} contact
 */
World.prototype.endContact = function(contact) {
    this.publish("end-contact", contact);
};

/**
 * @event World#end-contact
 *
 * Called when two fixtures cease to touch.
 *
 * Implement contact callbacks to get contact information. You can use these
 * results for things like sounds and game logic. You can also get contact
 * results by traversing the contact lists after the time step. However, you
 * might miss some contacts because continuous physics leads to sub-stepping.
 * Additionally you may receive multiple callbacks for the same contact in a
 * single time step. You should strive to make your callbacks efficient because
 * there may be many callbacks per time step.
 *
 * Warning: You cannot create/destroy world entities inside these callbacks.
 */
/**
 * @private
 * @param {Contact} contact
 * @param {Manifold} oldManifold
 */
World.prototype.preSolve = function(contact, oldManifold) {
    this.publish("pre-solve", contact, oldManifold);
};

/**
 * @event World#pre-solve
 *
 * This is called after a contact is updated. This allows you to inspect a
 * contact before it goes to the solver. If you are careful, you can modify the
 * contact manifold (e.g. disable contact). A copy of the old manifold is
 * provided so that you can detect changes. Note: this is called only for awake
 * bodies. Note: this is called even when the number of contact points is zero.
 * Note: this is not called for sensors. Note: if you set the number of contact
 * points to zero, you will not get an endContact callback. However, you may get
 * a beginContact callback the next step.
 *
 * Warning: You cannot create/destroy world entities inside these callbacks.
 */
/**
 * @private
 * @param {Contact} contact
 * @param {ContactImpulse} impulse
 */
World.prototype.postSolve = function(contact, impulse) {
    this.publish("post-solve", contact, impulse);
};


},{"./Body":2,"./Contact":3,"./Solver":9,"./collision/BroadPhase":12,"./common/Vec2":23,"./util/Timer":49,"./util/common":50,"./util/options":52}],11:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

var Settings = require("../Settings");

var Math = require("../common/Math");

var Vec2 = require("../common/Vec2");

module.exports = AABB;

function AABB(lower, upper) {
    if (!(this instanceof AABB)) {
        return new AABB(lower, upper);
    }
    this.lowerBound = Vec2.zero();
    this.upperBound = Vec2.zero();
    if (typeof lower === "object") {
        this.lowerBound.set(lower);
    }
    if (typeof upper === "object") {
        this.upperBound.set(upper);
    }
}

/**
 * Verify that the bounds are sorted.
 */
AABB.prototype.isValid = function() {
    return AABB.isValid(this);
};

AABB.isValid = function(aabb) {
    var d = Vec2.sub(aabb.upperBound, aabb.lowerBound);
    var valid = d.x >= 0 && d.y >= 0 && Vec2.isValid(aabb.lowerBound) && Vec2.isValid(aabb.upperBound);
    return valid;
};

/**
 * Get the center of the AABB.
 */
AABB.prototype.getCenter = function() {
    return Vec2.neo((this.lowerBound.x + this.upperBound.x) * .5, (this.lowerBound.y + this.upperBound.y) * .5);
};

/**
 * Get the extents of the AABB (half-widths).
 */
AABB.prototype.getExtents = function() {
    return Vec2.neo((this.upperBound.x - this.lowerBound.x) * .5, (this.upperBound.y - this.lowerBound.y) * .5);
};

/**
 * Get the perimeter length.
 */
AABB.prototype.getPerimeter = function() {
    return 2 * (this.upperBound.x - this.lowerBound.x + this.upperBound.y - this.lowerBound.y);
};

/**
 * Combine one or two AABB into this one.
 */
AABB.prototype.combine = function(a, b) {
    b = b || this;
    this.lowerBound.set(Math.min(a.lowerBound.x, b.lowerBound.x), Math.min(a.lowerBound.y, b.lowerBound.y));
    this.upperBound.set(Math.max(a.upperBound.x, b.upperBound.x), Math.max(a.upperBound.y, b.upperBound.y));
};

AABB.prototype.combinePoints = function(a, b) {
    this.lowerBound.set(Math.min(a.x, b.x), Math.min(a.y, b.y));
    this.upperBound.set(Math.max(a.x, b.x), Math.max(a.y, b.y));
};

AABB.prototype.set = function(aabb) {
    this.lowerBound.set(aabb.lowerBound.x, aabb.lowerBound.y);
    this.upperBound.set(aabb.upperBound.x, aabb.upperBound.y);
};

AABB.prototype.contains = function(aabb) {
    var result = true;
    result = result && this.lowerBound.x <= aabb.lowerBound.x;
    result = result && this.lowerBound.y <= aabb.lowerBound.y;
    result = result && aabb.upperBound.x <= this.upperBound.x;
    result = result && aabb.upperBound.y <= this.upperBound.y;
    return result;
};

AABB.prototype.extend = function(value) {
    AABB.extend(this, value);
};

AABB.extend = function(aabb, value) {
    aabb.lowerBound.x -= value;
    aabb.lowerBound.y -= value;
    aabb.upperBound.x += value;
    aabb.upperBound.y += value;
};

AABB.testOverlap = function(a, b) {
    var d1x = b.lowerBound.x - a.upperBound.x;
    var d2x = a.lowerBound.x - b.upperBound.x;
    var d1y = b.lowerBound.y - a.upperBound.y;
    var d2y = a.lowerBound.y - b.upperBound.y;
    if (d1x > 0 || d1y > 0 || d2x > 0 || d2y > 0) {
        return false;
    }
    return true;
};

AABB.areEqual = function(a, b) {
    return Vec2.areEqual(a.lowerBound, b.lowerBound) && Vec2.areEqual(a.upperBound, b.upperBound);
};

AABB.diff = function(a, b) {
    var wD = Math.max(0, Math.min(a.upperBound.x, b.upperBound.x) - Math.max(b.lowerBound.x, a.lowerBound.x));
    var hD = Math.max(0, Math.min(a.upperBound.y, b.upperBound.y) - Math.max(b.lowerBound.y, a.lowerBound.y));
    var wA = a.upperBound.x - a.lowerBound.x;
    var hA = a.upperBound.y - a.lowerBound.y;
    var wB = b.upperBound.x - b.lowerBound.x;
    var hB = b.upperBound.y - b.lowerBound.y;
    return wA * hA + wB * hB - wD * hD;
};

/**
 * @typedef RayCastInput
 *
 * Ray-cast input data. The ray extends from p1 to p1 + maxFraction * (p2 - p1).
 *
 * @prop {Vec2} p1
 * @prop {Vec2} p2
 * @prop {number} maxFraction
 */
/**
 * @typedef RayCastInput
 *
 * Ray-cast output data. The ray hits at p1 + fraction * (p2 - p1), where p1 and
 * p2 come from RayCastInput.
 *
 * @prop {Vec2} normal
 * @prop {number} fraction
 */
/**
 * @param {RayCastOutput} output
 * @param {RayCastInput} input
 * @returns {boolean}
 */
AABB.prototype.rayCast = function(output, input) {
    // From Real-time Collision Detection, p179.
    var tmin = -Infinity;
    var tmax = Infinity;
    var p = input.p1;
    var d = Vec2.sub(input.p2, input.p1);
    var absD = Vec2.abs(d);
    var normal = Vec2.zero();
    for (var f = "x"; f !== null; f = f === "x" ? "y" : null) {
        if (absD.x < Math.EPSILON) {
            // Parallel.
            if (p[f] < this.lowerBound[f] || this.upperBound[f] < p[f]) {
                return false;
            }
        } else {
            var inv_d = 1 / d[f];
            var t1 = (this.lowerBound[f] - p[f]) * inv_d;
            var t2 = (this.upperBound[f] - p[f]) * inv_d;
            // Sign of the normal vector.
            var s = -1;
            if (t1 > t2) {
                var temp = t1;
                t1 = t2, t2 = temp;
                s = 1;
            }
            // Push the min up
            if (t1 > tmin) {
                normal.setZero();
                normal[f] = s;
                tmin = t1;
            }
            // Pull the max down
            tmax = Math.min(tmax, t2);
            if (tmin > tmax) {
                return false;
            }
        }
    }
    // Does the ray start inside the box?
    // Does the ray intersect beyond the max fraction?
    if (tmin < 0 || input.maxFraction < tmin) {
        return false;
    }
    // Intersection.
    output.fraction = tmin;
    output.normal = normal;
    return true;
};

AABB.prototype.toString = function() {
    return JSON.stringify(this);
};


},{"../Settings":7,"../common/Math":18,"../common/Vec2":23}],12:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

var Settings = require("../Settings");

var common = require("../util/common");

var Math = require("../common/Math");

var AABB = require("./AABB");

var DynamicTree = require("./DynamicTree");

module.exports = BroadPhase;

/**
 * The broad-phase wraps and extends a dynamic-tree keep to track of moved
 * objects and query them on update.
 */
function BroadPhase() {
    this.m_tree = new DynamicTree();
    this.m_proxyCount = 0;
    this.m_moveBuffer = [];
    this.queryCallback = this.queryCallback.bind(this);
}

/**
 * Get user data from a proxy. Returns null if the id is invalid.
 */
BroadPhase.prototype.getUserData = function(proxyId) {
    return this.m_tree.getUserData(proxyId);
};

/**
 * Test overlap of fat AABBs.
 */
BroadPhase.prototype.testOverlap = function(proxyIdA, proxyIdB) {
    var aabbA = this.m_tree.getFatAABB(proxyIdA);
    var aabbB = this.m_tree.getFatAABB(proxyIdB);
    return AABB.testOverlap(aabbA, aabbB);
};

/**
 * Get the fat AABB for a proxy.
 */
BroadPhase.prototype.getFatAABB = function(proxyId) {
    return this.m_tree.getFatAABB(proxyId);
};

/**
 * Get the number of proxies.
 */
BroadPhase.prototype.getProxyCount = function() {
    return this.m_proxyCount;
};

/**
 * Get the height of the embedded tree.
 */
BroadPhase.prototype.getTreeHeight = function() {
    return this.m_tree.getHeight();
};

/**
 * Get the balance (integer) of the embedded tree.
 */
BroadPhase.prototype.getTreeBalance = function() {
    return this.m_tree.getMaxBalance();
};

/**
 * Get the quality metric of the embedded tree.
 */
BroadPhase.prototype.getTreeQuality = function() {
    return this.m_tree.getAreaRatio();
};

/**
 * Query an AABB for overlapping proxies. The callback class is called for each
 * proxy that overlaps the supplied AABB.
 */
BroadPhase.prototype.query = function(aabb, queryCallback) {
    this.m_tree.query(aabb, queryCallback);
};

/**
 * Ray-cast against the proxies in the tree. This relies on the callback to
 * perform a exact ray-cast in the case were the proxy contains a shape. The
 * callback also performs the any collision filtering. This has performance
 * roughly equal to k * log(n), where k is the number of collisions and n is the
 * number of proxies in the tree.
 * 
 * @param input The ray-cast input data. The ray extends from p1 to p1 +
 *          maxFraction * (p2 - p1).
 * @param rayCastCallback A function that is called for each proxy that is hit by
 *          the ray.
 */
BroadPhase.prototype.rayCast = function(input, rayCastCallback) {
    this.m_tree.rayCast(input, rayCastCallback);
};

/**
 * Shift the world origin. Useful for large worlds. The shift formula is:
 * position -= newOrigin
 * 
 * @param newOrigin The new origin with respect to the old origin
 */
BroadPhase.prototype.shiftOrigin = function(newOrigin) {
    this.m_tree.shiftOrigin(newOrigin);
};

/**
 * Create a proxy with an initial AABB. Pairs are not reported until UpdatePairs
 * is called.
 */
BroadPhase.prototype.createProxy = function(aabb, userData) {
    ASSERT && common.assert(AABB.isValid(aabb));
    var proxyId = this.m_tree.createProxy(aabb, userData);
    this.m_proxyCount++;
    this.bufferMove(proxyId);
    return proxyId;
};

/**
 * Destroy a proxy. It is up to the client to remove any pairs.
 */
BroadPhase.prototype.destroyProxy = function(proxyId) {
    this.unbufferMove(proxyId);
    this.m_proxyCount--;
    this.m_tree.destroyProxy(proxyId);
};

/**
 * Call moveProxy as many times as you like, then when you are done call
 * UpdatePairs to finalized the proxy pairs (for your time step).
 */
BroadPhase.prototype.moveProxy = function(proxyId, aabb, displacement) {
    ASSERT && common.assert(AABB.isValid(aabb));
    var changed = this.m_tree.moveProxy(proxyId, aabb, displacement);
    if (changed) {
        this.bufferMove(proxyId);
    }
};

/**
 * Call to trigger a re-processing of it's pairs on the next call to
 * UpdatePairs.
 */
BroadPhase.prototype.touchProxy = function(proxyId) {
    this.bufferMove(proxyId);
};

BroadPhase.prototype.bufferMove = function(proxyId) {
    this.m_moveBuffer.push(proxyId);
};

BroadPhase.prototype.unbufferMove = function(proxyId) {
    for (var i = 0; i < this.m_moveBuffer.length; ++i) {
        if (this.m_moveBuffer[i] == proxyId) {
            this.m_moveBuffer[i] = null;
        }
    }
};

/**
 * @function BroadPhase~addPair
 * @param {Object} userDataA
 * @param {Object} userDataB
 */
/**
 * Update the pairs. This results in pair callbacks. This can only add pairs.
 * 
 * @param {BroadPhase~AddPair} addPairCallback
 */
BroadPhase.prototype.updatePairs = function(addPairCallback) {
    ASSERT && common.assert(typeof addPairCallback === "function");
    this.m_callback = addPairCallback;
    // Perform tree queries for all moving proxies.
    while (this.m_moveBuffer.length > 0) {
        this.m_queryProxyId = this.m_moveBuffer.pop();
        if (this.m_queryProxyId === null) {
            continue;
        }
        // We have to query the tree with the fat AABB so that
        // we don't fail to create a pair that may touch later.
        var fatAABB = this.m_tree.getFatAABB(this.m_queryProxyId);
        // Query tree, create pairs and add them pair buffer.
        this.m_tree.query(fatAABB, this.queryCallback);
    }
};

BroadPhase.prototype.queryCallback = function(proxyId) {
    // A proxy cannot form a pair with itself.
    if (proxyId == this.m_queryProxyId) {
        return true;
    }
    var proxyIdA = Math.min(proxyId, this.m_queryProxyId);
    var proxyIdB = Math.max(proxyId, this.m_queryProxyId);
    // TODO: Skip any duplicate pairs.
    var userDataA = this.m_tree.getUserData(proxyIdA);
    var userDataB = this.m_tree.getUserData(proxyIdB);
    // Send the pairs back to the client.
    this.m_callback(userDataA, userDataB);
    return true;
};


},{"../Settings":7,"../common/Math":18,"../util/common":50,"./AABB":11,"./DynamicTree":14}],13:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Distance;

module.exports.Input = DistanceInput;

module.exports.Output = DistanceOutput;

module.exports.Proxy = DistanceProxy;

module.exports.Cache = SimplexCache;

var Settings = require("../Settings");

var common = require("../util/common");

var Timer = require("../util/Timer");

var stats = require("../common/stats");

var Math = require("../common/Math");

var Vec2 = require("../common/Vec2");

var Vec3 = require("../common/Vec3");

var Mat22 = require("../common/Mat22");

var Mat33 = require("../common/Mat33");

var Rot = require("../common/Rot");

var Sweep = require("../common/Sweep");

var Transform = require("../common/Transform");

var Velocity = require("../common/Velocity");

var Position = require("../common/Position");

/**
 * GJK using Voronoi regions (Christer Ericson) and Barycentric coordinates.
 */
stats.gjkCalls = 0;

stats.gjkIters = 0;

stats.gjkMaxIters = 0;

/**
 * Input for Distance. You have to option to use the shape radii in the
 * computation. Even
 */
function DistanceInput() {
    this.proxyA = new DistanceProxy();
    this.proxyB = new DistanceProxy();
    this.transformA = null;
    this.transformB = null;
    this.useRadii = false;
}

/**
 * Output for Distance.
 *
 * @prop {Vec2} pointA closest point on shapeA
 * @prop {Vec2} pointB closest point on shapeB
 * @prop distance
 * @prop iterations number of GJK iterations used
 */
function DistanceOutput() {
    this.pointA = Vec2.zero();
    this.pointB = Vec2.zero();
    this.distance;
    this.iterations;
}

/**
 * Used to warm start Distance. Set count to zero on first call.
 *
 * @prop {number} metric length or area
 * @prop {array} indexA vertices on shape A
 * @prop {array} indexB vertices on shape B
 * @prop {number} count
 */
function SimplexCache() {
    this.metric = 0;
    this.indexA = [];
    this.indexB = [];
    this.count = 0;
}

/**
 * Compute the closest points between two shapes. Supports any combination of:
 * CircleShape, PolygonShape, EdgeShape. The simplex cache is input/output. On
 * the first call set SimplexCache.count to zero.
 *
 * @param {DistanceOutput} output
 * @param {SimplexCache} cache
 * @param {DistanceInput} input
 */
function Distance(output, cache, input) {
    ++stats.gjkCalls;
    var proxyA = input.proxyA;
    var proxyB = input.proxyB;
    var xfA = input.transformA;
    var xfB = input.transformB;
    DEBUG && common.debug("cahce:", cache.metric, cache.count);
    DEBUG && common.debug("proxyA:", proxyA.m_count);
    DEBUG && common.debug("proxyB:", proxyB.m_count);
    DEBUG && common.debug("xfA:", xfA.p.x, xfA.p.y, xfA.q.c, xfA.q.s);
    DEBUG && common.debug("xfB:", xfB.p.x, xfB.p.y, xfB.q.c, xfB.q.s);
    // Initialize the simplex.
    var simplex = new Simplex();
    simplex.readCache(cache, proxyA, xfA, proxyB, xfB);
    DEBUG && common.debug("cache", simplex.print());
    // Get simplex vertices as an array.
    var vertices = simplex.m_v;
    // SimplexVertex
    var k_maxIters = Settings.maxDistnceIterations;
    // These store the vertices of the last simplex so that we
    // can check for duplicates and prevent cycling.
    var saveA = [];
    var saveB = [];
    // int[3]
    var saveCount = 0;
    var distanceSqr1 = Infinity;
    var distanceSqr2 = Infinity;
    // Main iteration loop.
    var iter = 0;
    while (iter < k_maxIters) {
        // Copy simplex so we can identify duplicates.
        saveCount = simplex.m_count;
        for (var i = 0; i < saveCount; ++i) {
            saveA[i] = vertices[i].indexA;
            saveB[i] = vertices[i].indexB;
        }
        simplex.solve();
        // If we have 3 points, then the origin is in the corresponding triangle.
        if (simplex.m_count == 3) {
            break;
        }
        // Compute closest point.
        var p = simplex.getClosestPoint();
        distanceSqr2 = p.lengthSquared();
        // Ensure progress
        if (distanceSqr2 >= distanceSqr1) {}
        distanceSqr1 = distanceSqr2;
        // Get search direction.
        var d = simplex.getSearchDirection();
        // Ensure the search direction is numerically fit.
        if (d.lengthSquared() < Math.EPSILON * Math.EPSILON) {
            // The origin is probably contained by a line segment
            // or triangle. Thus the shapes are overlapped.
            // We can't return zero here even though there may be overlap.
            // In case the simplex is a point, segment, or triangle it is difficult
            // to determine if the origin is contained in the CSO or very close to it.
            break;
        }
        // Compute a tentative new simplex vertex using support points.
        var vertex = vertices[simplex.m_count];
        // SimplexVertex
        vertex.indexA = proxyA.getSupport(Rot.mulT(xfA.q, Vec2.neg(d)));
        vertex.wA = Transform.mul(xfA, proxyA.getVertex(vertex.indexA));
        vertex.indexB = proxyB.getSupport(Rot.mulT(xfB.q, d));
        vertex.wB = Transform.mul(xfB, proxyB.getVertex(vertex.indexB));
        vertex.w = Vec2.sub(vertex.wB, vertex.wA);
        // Iteration count is equated to the number of support point calls.
        ++iter;
        ++stats.gjkIters;
        // Check for duplicate support points. This is the main termination
        // criteria.
        var duplicate = false;
        for (var i = 0; i < saveCount; ++i) {
            if (vertex.indexA == saveA[i] && vertex.indexB == saveB[i]) {
                duplicate = true;
                break;
            }
        }
        // If we found a duplicate support point we must exit to avoid cycling.
        if (duplicate) {
            break;
        }
        // New vertex is ok and needed.
        ++simplex.m_count;
    }
    stats.gjkMaxIters = Math.max(stats.gjkMaxIters, iter);
    // Prepare output.
    simplex.getWitnessPoints(output.pointA, output.pointB);
    output.distance = Vec2.distance(output.pointA, output.pointB);
    output.iterations = iter;
    DEBUG && common.debug("Distance:", output.distance, output.pointA.x, output.pointA.y, output.pointB.x, output.pointB.y);
    // Cache the simplex.
    simplex.writeCache(cache);
    // Apply radii if requested.
    if (input.useRadii) {
        var rA = proxyA.m_radius;
        var rB = proxyB.m_radius;
        if (output.distance > rA + rB && output.distance > Math.EPSILON) {
            // Shapes are still no overlapped.
            // Move the witness points to the outer surface.
            output.distance -= rA + rB;
            var normal = Vec2.sub(output.pointB, output.pointA);
            normal.normalize();
            output.pointA.wAdd(rA, normal);
            output.pointB.wSub(rB, normal);
        } else {
            // Shapes are overlapped when radii are considered.
            // Move the witness points to the middle.
            var p = Vec2.mid(output.pointA, output.pointB);
            output.pointA.set(p);
            output.pointB.set(p);
            output.distance = 0;
        }
    }
}

/**
 * A distance proxy is used by the GJK algorithm. It encapsulates any shape.
 */
function DistanceProxy() {
    this.m_buffer = [];
    // Vec2[2]
    this.m_vertices = [];
    // Vec2[]
    this.m_count = 0;
    this.m_radius = 0;
}

/**
 * Get the vertex count.
 */
DistanceProxy.prototype.getVertexCount = function() {
    return this.m_count;
};

/**
 * Get a vertex by index. Used by Distance.
 */
DistanceProxy.prototype.getVertex = function(index) {
    ASSERT && common.assert(0 <= index && index < this.m_count);
    return this.m_vertices[index];
};

/**
 * Get the supporting vertex index in the given direction.
 */
DistanceProxy.prototype.getSupport = function(d) {
    var bestIndex = 0;
    var bestValue = Vec2.dot(this.m_vertices[0], d);
    for (var i = 0; i < this.m_count; ++i) {
        var value = Vec2.dot(this.m_vertices[i], d);
        if (value > bestValue) {
            bestIndex = i;
            bestValue = value;
        }
    }
    return bestIndex;
};

/**
 * Get the supporting vertex in the given direction.
 */
DistanceProxy.prototype.getSupportVertex = function(d) {
    return this.m_vertices[this.getSupport(d)];
};

/**
 * Initialize the proxy using the given shape. The shape must remain in scope
 * while the proxy is in use.
 */
DistanceProxy.prototype.set = function(shape, index) {
    // TODO remove, use shape instead
    ASSERT && common.assert(typeof shape.computeDistanceProxy === "function");
    shape.computeDistanceProxy(this, index);
};

function SimplexVertex() {
    this.indexA;
    // wA index
    this.indexB;
    // wB index
    this.wA = Vec2.zero();
    // support point in proxyA
    this.wB = Vec2.zero();
    // support point in proxyB
    this.w = Vec2.zero();
    // wB - wA
    this.a;
}

SimplexVertex.prototype.set = function(v) {
    this.indexA = v.indexA;
    this.indexB = v.indexB;
    this.wA = Vec2.clone(v.wA);
    this.wB = Vec2.clone(v.wB);
    this.w = Vec2.clone(v.w);
    this.a = v.a;
};

function Simplex() {
    this.m_v1 = new SimplexVertex();
    this.m_v2 = new SimplexVertex();
    this.m_v3 = new SimplexVertex();
    this.m_v = [ this.m_v1, this.m_v2, this.m_v3 ];
    this.m_count;
}

Simplex.prototype.print = function() {
    if (this.m_count == 3) {
        return [ "+" + this.m_count, this.m_v1.a, this.m_v1.wA.x, this.m_v1.wA.y, this.m_v1.wB.x, this.m_v1.wB.y, this.m_v2.a, this.m_v2.wA.x, this.m_v2.wA.y, this.m_v2.wB.x, this.m_v2.wB.y, this.m_v3.a, this.m_v3.wA.x, this.m_v3.wA.y, this.m_v3.wB.x, this.m_v3.wB.y ].toString();
    } else if (this.m_count == 2) {
        return [ "+" + this.m_count, this.m_v1.a, this.m_v1.wA.x, this.m_v1.wA.y, this.m_v1.wB.x, this.m_v1.wB.y, this.m_v2.a, this.m_v2.wA.x, this.m_v2.wA.y, this.m_v2.wB.x, this.m_v2.wB.y ].toString();
    } else if (this.m_count == 1) {
        return [ "+" + this.m_count, this.m_v1.a, this.m_v1.wA.x, this.m_v1.wA.y, this.m_v1.wB.x, this.m_v1.wB.y ].toString();
    } else {
        return "+" + this.m_count;
    }
};

// (SimplexCache, DistanceProxy, ...)
Simplex.prototype.readCache = function(cache, proxyA, transformA, proxyB, transformB) {
    ASSERT && common.assert(cache.count <= 3);
    // Copy data from cache.
    this.m_count = cache.count;
    for (var i = 0; i < this.m_count; ++i) {
        var v = this.m_v[i];
        v.indexA = cache.indexA[i];
        v.indexB = cache.indexB[i];
        var wALocal = proxyA.getVertex(v.indexA);
        var wBLocal = proxyB.getVertex(v.indexB);
        v.wA = Transform.mul(transformA, wALocal);
        v.wB = Transform.mul(transformB, wBLocal);
        v.w = Vec2.sub(v.wB, v.wA);
        v.a = 0;
    }
    // Compute the new simplex metric, if it is substantially different than
    // old metric then flush the simplex.
    if (this.m_count > 1) {
        var metric1 = cache.metric;
        var metric2 = this.getMetric();
        if (metric2 < .5 * metric1 || 2 * metric1 < metric2 || metric2 < Math.EPSILON) {
            // Reset the simplex.
            this.m_count = 0;
        }
    }
    // If the cache is empty or invalid...
    if (this.m_count == 0) {
        var v = this.m_v[0];
        // SimplexVertex
        v.indexA = 0;
        v.indexB = 0;
        var wALocal = proxyA.getVertex(0);
        var wBLocal = proxyB.getVertex(0);
        v.wA = Transform.mul(transformA, wALocal);
        v.wB = Transform.mul(transformB, wBLocal);
        v.w = Vec2.sub(v.wB, v.wA);
        v.a = 1;
        this.m_count = 1;
    }
};

// (SimplexCache)
Simplex.prototype.writeCache = function(cache) {
    cache.metric = this.getMetric();
    cache.count = this.m_count;
    for (var i = 0; i < this.m_count; ++i) {
        cache.indexA[i] = this.m_v[i].indexA;
        cache.indexB[i] = this.m_v[i].indexB;
    }
};

Simplex.prototype.getSearchDirection = function() {
    switch (this.m_count) {
      case 1:
        return Vec2.neg(this.m_v1.w);

      case 2:
        {
            var e12 = Vec2.sub(this.m_v2.w, this.m_v1.w);
            var sgn = Vec2.cross(e12, Vec2.neg(this.m_v1.w));
            if (sgn > 0) {
                // Origin is left of e12.
                return Vec2.cross(1, e12);
            } else {
                // Origin is right of e12.
                return Vec2.cross(e12, 1);
            }
        }

      default:
        ASSERT && common.assert(false);
        return Vec2.zero();
    }
};

Simplex.prototype.getClosestPoint = function() {
    switch (this.m_count) {
      case 0:
        ASSERT && common.assert(false);
        return Vec2.zero();

      case 1:
        return Vec2.clone(this.m_v1.w);

      case 2:
        return Vec2.wAdd(this.m_v1.a, this.m_v1.w, this.m_v2.a, this.m_v2.w);

      case 3:
        return Vec2.zero();

      default:
        ASSERT && common.assert(false);
        return Vec2.zero();
    }
};

Simplex.prototype.getWitnessPoints = function(pA, pB) {
    switch (this.m_count) {
      case 0:
        ASSERT && common.assert(false);
        break;

      case 1:
        DEBUG && common.debug("case1", this.print());
        pA.set(this.m_v1.wA);
        pB.set(this.m_v1.wB);
        break;

      case 2:
        DEBUG && common.debug("case2", this.print());
        pA.wSet(this.m_v1.a, this.m_v1.wA, this.m_v2.a, this.m_v2.wA);
        pB.wSet(this.m_v1.a, this.m_v1.wB, this.m_v2.a, this.m_v2.wB);
        break;

      case 3:
        DEBUG && common.debug("case3", this.print());
        pA.wSet(this.m_v1.a, this.m_v1.wA, this.m_v2.a, this.m_v2.wA);
        pA.wAdd(this.m_v3.a, this.m_v3.wA);
        pB.set(pA);
        break;

      default:
        ASSERT && common.assert(false);
        break;
    }
};

Simplex.prototype.getMetric = function() {
    switch (this.m_count) {
      case 0:
        ASSERT && common.assert(false);
        return 0;

      case 1:
        return 0;

      case 2:
        return Vec2.distance(this.m_v1.w, this.m_v2.w);

      case 3:
        return Vec2.cross(Vec2.sub(this.m_v2.w, this.m_v1.w), Vec2.sub(this.m_v3.w, this.m_v1.w));

      default:
        ASSERT && common.assert(false);
        return 0;
    }
};

Simplex.prototype.solve = function() {
    switch (this.m_count) {
      case 1:
        break;

      case 2:
        this.solve2();
        break;

      case 3:
        this.solve3();
        break;

      default:
        ASSERT && common.assert(false);
    }
};

// Solve a line segment using barycentric coordinates.
//
// p = a1 * w1 + a2 * w2
// a1 + a2 = 1
//
// The vector from the origin to the closest point on the line is
// perpendicular to the line.
// e12 = w2 - w1
// dot(p, e) = 0
// a1 * dot(w1, e) + a2 * dot(w2, e) = 0
//
// 2-by-2 linear system
// [1 1 ][a1] = [1]
// [w1.e12 w2.e12][a2] = [0]
//
// Define
// d12_1 = dot(w2, e12)
// d12_2 = -dot(w1, e12)
// d12 = d12_1 + d12_2
//
// Solution
// a1 = d12_1 / d12
// a2 = d12_2 / d12
Simplex.prototype.solve2 = function() {
    var w1 = this.m_v1.w;
    var w2 = this.m_v2.w;
    var e12 = Vec2.sub(w2, w1);
    // w1 region
    var d12_2 = -Vec2.dot(w1, e12);
    if (d12_2 <= 0) {
        // a2 <= 0, so we clamp it to 0
        this.m_v1.a = 1;
        this.m_count = 1;
        return;
    }
    // w2 region
    var d12_1 = Vec2.dot(w2, e12);
    if (d12_1 <= 0) {
        // a1 <= 0, so we clamp it to 0
        this.m_v2.a = 1;
        this.m_count = 1;
        this.m_v1.set(this.m_v2);
        return;
    }
    // Must be in e12 region.
    var inv_d12 = 1 / (d12_1 + d12_2);
    this.m_v1.a = d12_1 * inv_d12;
    this.m_v2.a = d12_2 * inv_d12;
    this.m_count = 2;
};

// Possible regions:
// - points[2]
// - edge points[0]-points[2]
// - edge points[1]-points[2]
// - inside the triangle
Simplex.prototype.solve3 = function() {
    var w1 = this.m_v1.w;
    var w2 = this.m_v2.w;
    var w3 = this.m_v3.w;
    // Edge12
    // [1 1 ][a1] = [1]
    // [w1.e12 w2.e12][a2] = [0]
    // a3 = 0
    var e12 = Vec2.sub(w2, w1);
    var w1e12 = Vec2.dot(w1, e12);
    var w2e12 = Vec2.dot(w2, e12);
    var d12_1 = w2e12;
    var d12_2 = -w1e12;
    // Edge13
    // [1 1 ][a1] = [1]
    // [w1.e13 w3.e13][a3] = [0]
    // a2 = 0
    var e13 = Vec2.sub(w3, w1);
    var w1e13 = Vec2.dot(w1, e13);
    var w3e13 = Vec2.dot(w3, e13);
    var d13_1 = w3e13;
    var d13_2 = -w1e13;
    // Edge23
    // [1 1 ][a2] = [1]
    // [w2.e23 w3.e23][a3] = [0]
    // a1 = 0
    var e23 = Vec2.sub(w3, w2);
    // Vec2
    var w2e23 = Vec2.dot(w2, e23);
    var w3e23 = Vec2.dot(w3, e23);
    var d23_1 = w3e23;
    var d23_2 = -w2e23;
    // Triangle123
    var n123 = Vec2.cross(e12, e13);
    var d123_1 = n123 * Vec2.cross(w2, w3);
    var d123_2 = n123 * Vec2.cross(w3, w1);
    var d123_3 = n123 * Vec2.cross(w1, w2);
    // w1 region
    if (d12_2 <= 0 && d13_2 <= 0) {
        this.m_v1.a = 1;
        this.m_count = 1;
        return;
    }
    // e12
    if (d12_1 > 0 && d12_2 > 0 && d123_3 <= 0) {
        var inv_d12 = 1 / (d12_1 + d12_2);
        this.m_v1.a = d12_1 * inv_d12;
        this.m_v2.a = d12_2 * inv_d12;
        this.m_count = 2;
        return;
    }
    // e13
    if (d13_1 > 0 && d13_2 > 0 && d123_2 <= 0) {
        var inv_d13 = 1 / (d13_1 + d13_2);
        this.m_v1.a = d13_1 * inv_d13;
        this.m_v3.a = d13_2 * inv_d13;
        this.m_count = 2;
        this.m_v2.set(this.m_v3);
        return;
    }
    // w2 region
    if (d12_1 <= 0 && d23_2 <= 0) {
        this.m_v2.a = 1;
        this.m_count = 1;
        this.m_v1.set(this.m_v2);
        return;
    }
    // w3 region
    if (d13_1 <= 0 && d23_1 <= 0) {
        this.m_v3.a = 1;
        this.m_count = 1;
        this.m_v1.set(this.m_v3);
        return;
    }
    // e23
    if (d23_1 > 0 && d23_2 > 0 && d123_1 <= 0) {
        var inv_d23 = 1 / (d23_1 + d23_2);
        this.m_v2.a = d23_1 * inv_d23;
        this.m_v3.a = d23_2 * inv_d23;
        this.m_count = 2;
        this.m_v1.set(this.m_v3);
        return;
    }
    // Must be in triangle123
    var inv_d123 = 1 / (d123_1 + d123_2 + d123_3);
    this.m_v1.a = d123_1 * inv_d123;
    this.m_v2.a = d123_2 * inv_d123;
    this.m_v3.a = d123_3 * inv_d123;
    this.m_count = 3;
};

/**
 * Determine if two generic shapes overlap.
 */
Distance.testOverlap = function(shapeA, indexA, shapeB, indexB, xfA, xfB) {
    var input = new DistanceInput();
    input.proxyA.set(shapeA, indexA);
    input.proxyB.set(shapeB, indexB);
    input.transformA = xfA;
    input.transformB = xfB;
    input.useRadii = true;
    var cache = new SimplexCache();
    var output = new DistanceOutput();
    Distance(output, cache, input);
    return output.distance < 10 * Math.EPSILON;
};


},{"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../common/stats":26,"../util/Timer":49,"../util/common":50}],14:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

var Settings = require("../Settings");

var common = require("../util/common");

var Pool = require("../util/Pool");

var Vec2 = require("../common/Vec2");

var Math = require("../common/Math");

var AABB = require("./AABB");

module.exports = DynamicTree;

/**
 * A node in the dynamic tree. The client does not interact with this directly.
 * 
 * @prop {AABB} aabb Enlarged AABB
 * @prop {integer} height 0: leaf, -1: free node
 */
function TreeNode(id) {
    this.id = id;
    this.aabb = new AABB();
    this.userData = null;
    this.parent = null;
    this.child1 = null;
    this.child2 = null;
    this.height = -1;
    this.toString = function() {
        return this.id + ": " + this.userData;
    };
}

TreeNode.prototype.isLeaf = function() {
    return this.child1 == null;
};

/**
 * A dynamic AABB tree broad-phase, inspired by Nathanael Presson's btDbvt. A
 * dynamic tree arranges data in a binary tree to accelerate queries such as
 * volume queries and ray casts. Leafs are proxies with an AABB. In the tree we
 * expand the proxy AABB by `aabbExtension` so that the proxy AABB is bigger
 * than the client object. This allows the client object to move by small
 * amounts without triggering a tree update.
 * 
 * Nodes are pooled and relocatable, so we use node indices rather than
 * pointers.
 */
function DynamicTree() {
    this.m_root = null;
    this.m_nodes = {};
    this.m_lastProxyId = 0;
    this.m_pool = new Pool({
        create: function() {
            return new TreeNode();
        }
    });
}

/**
 * Get proxy user data.
 * 
 * @return the proxy user data or 0 if the id is invalid.
 */
DynamicTree.prototype.getUserData = function(id) {
    var node = this.m_nodes[id];
    ASSERT && common.assert(!!node);
    return node.userData;
};

/**
 * Get the fat AABB for a node id.
 * 
 * @return the proxy user data or 0 if the id is invalid.
 */
DynamicTree.prototype.getFatAABB = function(id) {
    var node = this.m_nodes[id];
    ASSERT && common.assert(!!node);
    return node.aabb;
};

DynamicTree.prototype.allocateNode = function() {
    var node = this.m_pool.allocate();
    node.id = ++this.m_lastProxyId;
    node.userData = null;
    node.parent = null;
    node.child1 = null;
    node.child2 = null;
    node.height = -1;
    this.m_nodes[node.id] = node;
    return node;
};

DynamicTree.prototype.freeNode = function(node) {
    this.m_pool.release(node);
    node.height = -1;
    delete this.m_nodes[node.id];
};

/**
 * Create a proxy in the tree as a leaf node. We return the index of the node
 * instead of a pointer so that we can grow the node pool.
 * 
 * Create a proxy. Provide a tight fitting AABB and a userData pointer.
 */
DynamicTree.prototype.createProxy = function(aabb, userData) {
    ASSERT && common.assert(AABB.isValid(aabb));
    var node = this.allocateNode();
    node.aabb.set(aabb);
    // Fatten the aabb.
    AABB.extend(node.aabb, Settings.aabbExtension);
    node.userData = userData;
    node.height = 0;
    this.insertLeaf(node);
    return node.id;
};

/**
 * Destroy a proxy. This asserts if the id is invalid.
 */
DynamicTree.prototype.destroyProxy = function(id) {
    var node = this.m_nodes[id];
    ASSERT && common.assert(!!node);
    ASSERT && common.assert(node.isLeaf());
    this.removeLeaf(node);
    this.freeNode(node);
};

/**
 * Move a proxy with a swepted AABB. If the proxy has moved outside of its
 * fattened AABB, then the proxy is removed from the tree and re-inserted.
 * Otherwise the function returns immediately.
 * 
 * @param id
 * @param aabb
 * @param {Vec2} d Displacement
 * 
 * @return true if the proxy was re-inserted.
 */
DynamicTree.prototype.moveProxy = function(id, aabb, d) {
    ASSERT && common.assert(AABB.isValid(aabb));
    ASSERT && common.assert(!d || Vec2.isValid(d));
    var node = this.m_nodes[id];
    ASSERT && common.assert(!!node);
    ASSERT && common.assert(node.isLeaf());
    if (node.aabb.contains(aabb)) {
        return false;
    }
    this.removeLeaf(node);
    node.aabb.set(aabb);
    // Extend AABB.
    aabb = node.aabb;
    AABB.extend(aabb, Settings.aabbExtension);
    // Predict AABB displacement.
    // var d = Vec2.mul(Settings.aabbMultiplier, displacement);
    if (d.x < 0) {
        aabb.lowerBound.x += d.x * Settings.aabbMultiplier;
    } else {
        aabb.upperBound.x += d.x * Settings.aabbMultiplier;
    }
    if (d.y < 0) {
        aabb.lowerBound.y += d.y * Settings.aabbMultiplier;
    } else {
        aabb.upperBound.y += d.y * Settings.aabbMultiplier;
    }
    this.insertLeaf(node);
    return true;
};

DynamicTree.prototype.insertLeaf = function(leaf) {
    ASSERT && common.assert(AABB.isValid(leaf.aabb));
    if (this.m_root == null) {
        this.m_root = leaf;
        this.m_root.parent = null;
        return;
    }
    // Find the best sibling for this node
    var leafAABB = leaf.aabb;
    var index = this.m_root;
    while (index.isLeaf() == false) {
        var child1 = index.child1;
        var child2 = index.child2;
        var area = index.aabb.getPerimeter();
        var combinedAABB = new AABB();
        combinedAABB.combine(index.aabb, leafAABB);
        var combinedArea = combinedAABB.getPerimeter();
        // Cost of creating a new parent for this node and the new leaf
        var cost = 2 * combinedArea;
        // Minimum cost of pushing the leaf further down the tree
        var inheritanceCost = 2 * (combinedArea - area);
        // Cost of descending into child1
        var cost1;
        if (child1.isLeaf()) {
            var aabb = new AABB();
            aabb.combine(leafAABB, child1.aabb);
            cost1 = aabb.getPerimeter() + inheritanceCost;
        } else {
            var aabb = new AABB();
            aabb.combine(leafAABB, child1.aabb);
            var oldArea = child1.aabb.getPerimeter();
            var newArea = aabb.getPerimeter();
            cost1 = newArea - oldArea + inheritanceCost;
        }
        // Cost of descending into child2
        var cost2;
        if (child2.isLeaf()) {
            var aabb = new AABB();
            aabb.combine(leafAABB, child2.aabb);
            cost2 = aabb.getPerimeter() + inheritanceCost;
        } else {
            var aabb = new AABB();
            aabb.combine(leafAABB, child2.aabb);
            var oldArea = child2.aabb.getPerimeter();
            var newArea = aabb.getPerimeter();
            cost2 = newArea - oldArea + inheritanceCost;
        }
        // Descend according to the minimum cost.
        if (cost < cost1 && cost < cost2) {
            break;
        }
        // Descend
        if (cost1 < cost2) {
            index = child1;
        } else {
            index = child2;
        }
    }
    var sibling = index;
    // Create a new parent.
    var oldParent = sibling.parent;
    var newParent = this.allocateNode();
    newParent.parent = oldParent;
    newParent.userData = null;
    newParent.aabb.combine(leafAABB, sibling.aabb);
    newParent.height = sibling.height + 1;
    if (oldParent != null) {
        // The sibling was not the root.
        if (oldParent.child1 == sibling) {
            oldParent.child1 = newParent;
        } else {
            oldParent.child2 = newParent;
        }
        newParent.child1 = sibling;
        newParent.child2 = leaf;
        sibling.parent = newParent;
        leaf.parent = newParent;
    } else {
        // The sibling was the root.
        newParent.child1 = sibling;
        newParent.child2 = leaf;
        sibling.parent = newParent;
        leaf.parent = newParent;
        this.m_root = newParent;
    }
    // Walk back up the tree fixing heights and AABBs
    index = leaf.parent;
    while (index != null) {
        index = this.balance(index);
        var child1 = index.child1;
        var child2 = index.child2;
        ASSERT && common.assert(child1 != null);
        ASSERT && common.assert(child2 != null);
        index.height = 1 + Math.max(child1.height, child2.height);
        index.aabb.combine(child1.aabb, child2.aabb);
        index = index.parent;
    }
};

DynamicTree.prototype.removeLeaf = function(leaf) {
    if (leaf == this.m_root) {
        this.m_root = null;
        return;
    }
    var parent = leaf.parent;
    var grandParent = parent.parent;
    var sibling;
    if (parent.child1 == leaf) {
        sibling = parent.child2;
    } else {
        sibling = parent.child1;
    }
    if (grandParent != null) {
        // Destroy parent and connect sibling to grandParent.
        if (grandParent.child1 == parent) {
            grandParent.child1 = sibling;
        } else {
            grandParent.child2 = sibling;
        }
        sibling.parent = grandParent;
        this.freeNode(parent);
        // Adjust ancestor bounds.
        var index = grandParent;
        while (index != null) {
            index = this.balance(index);
            var child1 = index.child1;
            var child2 = index.child2;
            index.aabb.combine(child1.aabb, child2.aabb);
            index.height = 1 + Math.max(child1.height, child2.height);
            index = index.parent;
        }
    } else {
        this.m_root = sibling;
        sibling.parent = null;
        this.freeNode(parent);
    }
};

/**
 * Perform a left or right rotation if node A is imbalanced. Returns the new
 * root index.
 */
DynamicTree.prototype.balance = function(iA) {
    ASSERT && common.assert(iA != null);
    var A = iA;
    if (A.isLeaf() || A.height < 2) {
        return iA;
    }
    var B = A.child1;
    var C = A.child2;
    var balance = C.height - B.height;
    // Rotate C up
    if (balance > 1) {
        var F = C.child1;
        var G = C.child2;
        // Swap A and C
        C.child1 = A;
        C.parent = A.parent;
        A.parent = C;
        // A's old parent should point to C
        if (C.parent != null) {
            if (C.parent.child1 == iA) {
                C.parent.child1 = C;
            } else {
                C.parent.child2 = C;
            }
        } else {
            this.m_root = C;
        }
        // Rotate
        if (F.height > G.height) {
            C.child2 = F;
            A.child2 = G;
            G.parent = A;
            A.aabb.combine(B.aabb, G.aabb);
            C.aabb.combine(A.aabb, F.aabb);
            A.height = 1 + Math.max(B.height, G.height);
            C.height = 1 + Math.max(A.height, F.height);
        } else {
            C.child2 = G;
            A.child2 = F;
            F.parent = A;
            A.aabb.combine(B.aabb, F.aabb);
            C.aabb.combine(A.aabb, G.aabb);
            A.height = 1 + Math.max(B.height, F.height);
            C.height = 1 + Math.max(A.height, G.height);
        }
        return C;
    }
    // Rotate B up
    if (balance < -1) {
        var D = B.child1;
        var E = B.child2;
        // Swap A and B
        B.child1 = A;
        B.parent = A.parent;
        A.parent = B;
        // A's old parent should point to B
        if (B.parent != null) {
            if (B.parent.child1 == A) {
                B.parent.child1 = B;
            } else {
                B.parent.child2 = B;
            }
        } else {
            this.m_root = B;
        }
        // Rotate
        if (D.height > E.height) {
            B.child2 = D;
            A.child1 = E;
            E.parent = A;
            A.aabb.combine(C.aabb, E.aabb);
            B.aabb.combine(A.aabb, D.aabb);
            A.height = 1 + Math.max(C.height, E.height);
            B.height = 1 + Math.max(A.height, D.height);
        } else {
            B.child2 = E;
            A.child1 = D;
            D.parent = A;
            A.aabb.combine(C.aabb, D.aabb);
            B.aabb.combine(A.aabb, E.aabb);
            A.height = 1 + Math.max(C.height, D.height);
            B.height = 1 + Math.max(A.height, E.height);
        }
        return B;
    }
    return A;
};

/**
 * Compute the height of the binary tree in O(N) time. Should not be called
 * often.
 */
DynamicTree.prototype.getHeight = function() {
    if (this.m_root == null) {
        return 0;
    }
    return this.m_root.height;
};

/**
 * Get the ratio of the sum of the node areas to the root area.
 */
DynamicTree.prototype.getAreaRatio = function() {
    if (this.m_root == null) {
        return 0;
    }
    var root = this.m_root;
    var rootArea = root.aabb.getPerimeter();
    var totalArea = 0;
    var node, it = iteratorPool.allocate().preorder();
    while (node = it.next()) {
        if (node.height < 0) {
            // Free node in pool
            continue;
        }
        totalArea += node.aabb.getPerimeter();
    }
    iteratorPool.release(it);
    return totalArea / rootArea;
};

/**
 * Compute the height of a sub-tree.
 */
DynamicTree.prototype.computeHeight = function(id) {
    var node;
    if (typeof id !== "undefined") {
        node = this.m_nodes[id];
    } else {
        node = this.m_root;
    }
    // ASSERT && common.assert(0 <= id && id < this.m_nodeCapacity);
    if (node.isLeaf()) {
        return 0;
    }
    var height1 = ComputeHeight(node.child1);
    var height2 = ComputeHeight(node.child2);
    return 1 + Math.max(height1, height2);
};

DynamicTree.prototype.validateStructure = function(node) {
    if (node == null) {
        return;
    }
    if (node == this.m_root) {
        ASSERT && common.assert(node.parent == null);
    }
    var child1 = node.child1;
    var child2 = node.child2;
    if (node.isLeaf()) {
        ASSERT && common.assert(child1 == null);
        ASSERT && common.assert(child2 == null);
        ASSERT && common.assert(node.height == 0);
        return;
    }
    // ASSERT && common.assert(0 <= child1 && child1 < this.m_nodeCapacity);
    // ASSERT && common.assert(0 <= child2 && child2 < this.m_nodeCapacity);
    ASSERT && common.assert(child1.parent == node);
    ASSERT && common.assert(child2.parent == node);
    this.validateStructure(child1);
    this.validateStructure(child2);
};

DynamicTree.prototype.validateMetrics = function(node) {
    if (node == null) {
        return;
    }
    var child1 = node.child1;
    var child2 = node.child2;
    if (node.isLeaf()) {
        ASSERT && common.assert(child1 == null);
        ASSERT && common.assert(child2 == null);
        ASSERT && common.assert(node.height == 0);
        return;
    }
    // ASSERT && common.assert(0 <= child1 && child1 < this.m_nodeCapacity);
    // ASSERT && common.assert(0 <= child2 && child2 < this.m_nodeCapacity);
    var height1 = this.m_nodes[child1].height;
    var height2 = this.m_nodes[child2].height;
    var height = 1 + Math.max(height1, height2);
    ASSERT && common.assert(node.height == height);
    var aabb = new AABB();
    aabb.combine(child1.aabb, child2.aabb);
    ASSERT && common.assert(AABB.areEqual(aabb, node.aabb));
    this.validateMetrics(child1);
    this.validateMetrics(child2);
};

// Validate this tree. For testing.
DynamicTree.prototype.validate = function() {
    ValidateStructure(this.m_root);
    ValidateMetrics(this.m_root);
    ASSERT && common.assert(this.getHeight() == this.computeHeight());
};

/**
 * Get the maximum balance of an node in the tree. The balance is the difference
 * in height of the two children of a node.
 */
DynamicTree.prototype.getMaxBalance = function() {
    var maxBalance = 0;
    var node, it = iteratorPool.allocate().preorder();
    while (node = it.next()) {
        if (node.height <= 1) {
            continue;
        }
        ASSERT && common.assert(node.isLeaf() == false);
        var balance = Math.abs(node.child2.height - node.child1.height);
        maxBalance = Math.max(maxBalance, balance);
    }
    iteratorPool.release(it);
    return maxBalance;
};

/**
 * Build an optimal tree. Very expensive. For testing.
 */
DynamicTree.prototype.rebuildBottomUp = function() {
    var nodes = [];
    var count = 0;
    // Build array of leaves. Free the rest.
    var node, it = iteratorPool.allocate().preorder();
    while (node = it.next()) {
        if (node.height < 0) {
            // free node in pool
            continue;
        }
        if (node.isLeaf()) {
            node.parent = null;
            nodes[count] = node;
            ++count;
        } else {
            this.freeNode(node);
        }
    }
    iteratorPool.release(it);
    while (count > 1) {
        var minCost = Infinity;
        var iMin = -1, jMin = -1;
        for (var i = 0; i < count; ++i) {
            var aabbi = nodes[i].aabb;
            for (var j = i + 1; j < count; ++j) {
                var aabbj = nodes[j].aabb;
                var b = new AABB();
                b.combine(aabbi, aabbj);
                var cost = b.getPerimeter();
                if (cost < minCost) {
                    iMin = i;
                    jMin = j;
                    minCost = cost;
                }
            }
        }
        var child1 = nodes[iMin];
        var child2 = nodes[jMin];
        var parent = this.allocateNode();
        parent.child1 = child1;
        parent.child2 = child2;
        parent.height = 1 + Math.max(child1.height, child2.height);
        parent.aabb.combine(child1.aabb, child2.aabb);
        parent.parent = null;
        child1.parent = parent;
        child2.parent = parent;
        nodes[jMin] = nodes[count - 1];
        nodes[iMin] = parent;
        --count;
    }
    this.m_root = nodes[0];
    this.validate();
};

/**
 * Shift the world origin. Useful for large worlds. The shift formula is:
 * position -= newOrigin
 * 
 * @param newOrigin The new origin with respect to the old origin
 */
DynamicTree.prototype.shiftOrigin = function(newOrigin) {
    // Build array of leaves. Free the rest.
    var node, it = iteratorPool.allocate().preorder();
    while (node = it.next()) {
        var aabb = node.aabb;
        aabb.lowerBound.x -= newOrigin.x;
        aabb.lowerBound.y -= newOrigin.y;
        aabb.lowerBound.x -= newOrigin.x;
        aabb.lowerBound.y -= newOrigin.y;
    }
    iteratorPool.release(it);
};

/**
 * @function {DynamicTree~queryCallback}
 * 
 * @param id Node id.
 */
/**
 * Query an AABB for overlapping proxies. The callback class is called for each
 * proxy that overlaps the supplied AABB.
 * 
 * @param {DynamicTree~queryCallback} queryCallback
 */
DynamicTree.prototype.query = function(aabb, queryCallback) {
    ASSERT && common.assert(typeof queryCallback === "function");
    var stack = stackPool.allocate();
    stack.push(this.m_root);
    while (stack.length > 0) {
        var node = stack.pop();
        if (node == null) {
            continue;
        }
        if (AABB.testOverlap(node.aabb, aabb)) {
            if (node.isLeaf()) {
                var proceed = queryCallback(node.id);
                if (proceed == false) {
                    return;
                }
            } else {
                stack.push(node.child1);
                stack.push(node.child2);
            }
        }
    }
    stackPool.release(stack);
};

/**
 * Ray-cast against the proxies in the tree. This relies on the callback to
 * perform a exact ray-cast in the case were the proxy contains a shape. The
 * callback also performs the any collision filtering. This has performance
 * roughly equal to k * log(n), where k is the number of collisions and n is the
 * number of proxies in the tree.
 * 
 * @param input The ray-cast input data. The ray extends from p1 to p1 +
 *          maxFraction * (p2 - p1).
 * @param rayCastCallback A function that is called for each proxy that is hit by
 *          the ray.
 */
DynamicTree.prototype.rayCast = function(input, rayCastCallback) {
    // TODO GC
    ASSERT && common.assert(typeof rayCastCallback === "function");
    var p1 = input.p1;
    var p2 = input.p2;
    var r = Vec2.sub(p2, p1);
    ASSERT && common.assert(r.lengthSquared() > 0);
    r.normalize();
    // v is perpendicular to the segment.
    var v = Vec2.cross(1, r);
    var abs_v = Vec2.abs(v);
    // Separating axis for segment (Gino, p80).
    // |dot(v, p1 - c)| > dot(|v|, h)
    var maxFraction = input.maxFraction;
    // Build a bounding box for the segment.
    var segmentAABB = new AABB();
    var t = Vec2.wAdd(1 - maxFraction, p1, maxFraction, p2);
    segmentAABB.combinePoints(p1, t);
    var stack = stackPool.allocate();
    var subInput = inputPool.allocate();
    stack.push(this.m_root);
    while (stack.length > 0) {
        var node = stack.pop();
        if (node == null) {
            continue;
        }
        if (AABB.testOverlap(node.aabb, segmentAABB) == false) {
            continue;
        }
        // Separating axis for segment (Gino, p80).
        // |dot(v, p1 - c)| > dot(|v|, h)
        var c = node.aabb.getCenter();
        var h = node.aabb.getExtents();
        var separation = Math.abs(Vec2.dot(v, Vec2.sub(p1, c))) - Vec2.dot(abs_v, h);
        if (separation > 0) {
            continue;
        }
        if (node.isLeaf()) {
            subInput.p1 = Vec2.clone(input.p1);
            subInput.p2 = Vec2.clone(input.p2);
            subInput.maxFraction = maxFraction;
            var value = rayCastCallback(subInput, node.id);
            if (value == 0) {
                // The client has terminated the ray cast.
                return;
            }
            if (value > 0) {
                // update segment bounding box.
                maxFraction = value;
                t = Vec2.wAdd(1 - maxFraction, p1, maxFraction, p2);
                segmentAABB.combinePoints(p1, t);
            }
        } else {
            stack.push(node.child1);
            stack.push(node.child2);
        }
    }
    stackPool.release(stack);
    inputPool.release(subInput);
};

var inputPool = new Pool({
    create: function() {
        return {};
    },
    release: function(stack) {}
});

var stackPool = new Pool({
    create: function() {
        return [];
    },
    release: function(stack) {
        stack.length = 0;
    }
});

var iteratorPool = new Pool({
    create: function() {
        return new Iterator();
    },
    release: function(iterator) {
        iterator.close();
    }
});

function Iterator() {
    var parents = [];
    var states = [];
    return {
        preorder: function(root) {
            parents.length = 0;
            parents.push(root);
            states.length = 0;
            states.push(0);
            return this;
        },
        next: function() {
            while (parents.length > 0) {
                var i = parents.length - 1;
                var node = parents[i];
                if (states[i] === 0) {
                    states[i] = 1;
                    return node;
                }
                if (states[i] === 1) {
                    states[i] = 2;
                    if (node.child1) {
                        parents.push(node.child1);
                        states.push(1);
                        return node.child1;
                    }
                }
                if (states[i] === 2) {
                    states[i] = 3;
                    if (node.child2) {
                        parents.push(node.child2);
                        states.push(1);
                        return node.child2;
                    }
                }
                parents.pop();
                states.pop();
            }
        },
        close: function() {
            parents.length = 0;
        }
    };
}


},{"../Settings":7,"../common/Math":18,"../common/Vec2":23,"../util/Pool":48,"../util/common":50,"./AABB":11}],15:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = TimeOfImpact;

module.exports.Input = TOIInput;

module.exports.Output = TOIOutput;

var Settings = require("../Settings");

var common = require("../util/common");

var Timer = require("../util/Timer");

var stats = require("../common/stats");

var Math = require("../common/Math");

var Vec2 = require("../common/Vec2");

var Vec3 = require("../common/Vec3");

var Mat22 = require("../common/Mat22");

var Mat33 = require("../common/Mat33");

var Rot = require("../common/Rot");

var Sweep = require("../common/Sweep");

var Transform = require("../common/Transform");

var Velocity = require("../common/Velocity");

var Position = require("../common/Position");

var Distance = require("./Distance");

var DistanceInput = Distance.Input;

var DistanceOutput = Distance.Output;

var DistanceProxy = Distance.Proxy;

var SimplexCache = Distance.Cache;

/**
 * Input parameters for TimeOfImpact.
 * 
 * @prop {DistanceProxy} proxyA
 * @prop {DistanceProxy} proxyB
 * @prop {Sweep} sweepA
 * @prop {Sweep} sweepB
 * @prop tMax defines sweep interval [0, tMax]
 */
function TOIInput() {
    this.proxyA = new DistanceProxy();
    this.proxyB = new DistanceProxy();
    this.sweepA = new Sweep();
    this.sweepB = new Sweep();
    this.tMax;
}

// TOIOutput State
TOIOutput.e_unknown = 0;

TOIOutput.e_failed = 1;

TOIOutput.e_overlapped = 2;

TOIOutput.e_touching = 3;

TOIOutput.e_separated = 4;

/**
 * Output parameters for TimeOfImpact.
 * 
 * @prop state
 * @prop t
 */
function TOIOutput() {
    this.state;
    this.t;
}

stats.toiTime = 0;

stats.toiMaxTime = 0;

stats.toiCalls = 0;

stats.toiIters = 0;

stats.toiMaxIters = 0;

stats.toiRootIters = 0;

stats.toiMaxRootIters = 0;

/**
 * Compute the upper bound on time before two shapes penetrate. Time is
 * represented as a fraction between [0,tMax]. This uses a swept separating axis
 * and may miss some intermediate, non-tunneling collision. If you change the
 * time interval, you should call this function again.
 * 
 * Note: use Distance to compute the contact point and normal at the time of
 * impact.
 * 
 * CCD via the local separating axis method. This seeks progression by computing
 * the largest time at which separation is maintained.
 */
function TimeOfImpact(output, input) {
    var timer = Timer.now();
    ++stats.toiCalls;
    output.state = TOIOutput.e_unknown;
    output.t = input.tMax;
    var proxyA = input.proxyA;
    // DistanceProxy
    var proxyB = input.proxyB;
    // DistanceProxy
    var sweepA = input.sweepA;
    // Sweep
    var sweepB = input.sweepB;
    // Sweep
    DEBUG && common.debug("sweepA", sweepA.localCenter.x, sweepA.localCenter.y, sweepA.c.x, sweepA.c.y, sweepA.a, sweepA.alpha0, sweepA.c0.x, sweepA.c0.y, sweepA.a0);
    DEBUG && common.debug("sweepB", sweepB.localCenter.x, sweepB.localCenter.y, sweepB.c.x, sweepB.c.y, sweepB.a, sweepB.alpha0, sweepB.c0.x, sweepB.c0.y, sweepB.a0);
    // Large rotations can make the root finder fail, so we normalize the
    // sweep angles.
    sweepA.normalize();
    sweepB.normalize();
    var tMax = input.tMax;
    var totalRadius = proxyA.m_radius + proxyB.m_radius;
    var target = Math.max(Settings.linearSlop, totalRadius - 3 * Settings.linearSlop);
    var tolerance = .25 * Settings.linearSlop;
    ASSERT && common.assert(target > tolerance);
    var t1 = 0;
    var k_maxIterations = Settings.maxTOIIterations;
    var iter = 0;
    // Prepare input for distance query.
    var cache = new SimplexCache();
    var distanceInput = new DistanceInput();
    distanceInput.proxyA = input.proxyA;
    distanceInput.proxyB = input.proxyB;
    distanceInput.useRadii = false;
    // The outer loop progressively attempts to compute new separating axes.
    // This loop terminates when an axis is repeated (no progress is made).
    for (;;) {
        var xfA = Transform.identity();
        var xfB = Transform.identity();
        sweepA.getTransform(xfA, t1);
        sweepB.getTransform(xfB, t1);
        DEBUG && common.debug("xfA:", xfA.p.x, xfA.p.y, xfA.q.c, xfA.q.s);
        DEBUG && common.debug("xfB:", xfB.p.x, xfB.p.y, xfB.q.c, xfB.q.s);
        // Get the distance between shapes. We can also use the results
        // to get a separating axis.
        distanceInput.transformA = xfA;
        distanceInput.transformB = xfB;
        var distanceOutput = new DistanceOutput();
        Distance(distanceOutput, cache, distanceInput);
        DEBUG && common.debug("distance:", distanceOutput.distance);
        // If the shapes are overlapped, we give up on continuous collision.
        if (distanceOutput.distance <= 0) {
            // Failure!
            output.state = TOIOutput.e_overlapped;
            output.t = 0;
            break;
        }
        if (distanceOutput.distance < target + tolerance) {
            // Victory!
            output.state = TOIOutput.e_touching;
            output.t = t1;
            break;
        }
        // Initialize the separating axis.
        var fcn = new SeparationFunction();
        fcn.initialize(cache, proxyA, sweepA, proxyB, sweepB, t1);
        if (false) {
            // Dump the curve seen by the root finder
            var N = 100;
            var dx = 1 / N;
            var xs = [];
            // [ N + 1 ];
            var fs = [];
            // [ N + 1 ];
            var x = 0;
            for (var i = 0; i <= N; ++i) {
                sweepA.getTransform(xfA, x);
                sweepB.getTransform(xfB, x);
                var f = fcn.evaluate(xfA, xfB) - target;
                printf("%g %g\n", x, f);
                xs[i] = x;
                fs[i] = f;
                x += dx;
            }
        }
        // Compute the TOI on the separating axis. We do this by successively
        // resolving the deepest point. This loop is bounded by the number of
        // vertices.
        var done = false;
        var t2 = tMax;
        var pushBackIter = 0;
        for (;;) {
            // Find the deepest point at t2. Store the witness point indices.
            var s2 = fcn.findMinSeparation(t2);
            var indexA = fcn.indexA;
            var indexB = fcn.indexB;
            // Is the final configuration separated?
            if (s2 > target + tolerance) {
                // Victory!
                output.state = TOIOutput.e_separated;
                output.t = tMax;
                done = true;
                break;
            }
            // Has the separation reached tolerance?
            if (s2 > target - tolerance) {
                // Advance the sweeps
                t1 = t2;
                break;
            }
            // Compute the initial separation of the witness points.
            var s1 = fcn.evaluate(t1);
            var indexA = fcn.indexA;
            var indexB = fcn.indexB;
            DEBUG && common.debug("s1:", s1, target, tolerance, t1);
            // Check for initial overlap. This might happen if the root finder
            // runs out of iterations.
            if (s1 < target - tolerance) {
                output.state = TOIOutput.e_failed;
                output.t = t1;
                done = true;
                break;
            }
            // Check for touching
            if (s1 <= target + tolerance) {
                // Victory! t1 should hold the TOI (could be 0.0).
                output.state = TOIOutput.e_touching;
                output.t = t1;
                done = true;
                break;
            }
            // Compute 1D root of: f(x) - target = 0
            var rootIterCount = 0;
            var a1 = t1, a2 = t2;
            for (;;) {
                // Use a mix of the secant rule and bisection.
                var t;
                if (rootIterCount & 1) {
                    // Secant rule to improve convergence.
                    t = a1 + (target - s1) * (a2 - a1) / (s2 - s1);
                } else {
                    // Bisection to guarantee progress.
                    t = .5 * (a1 + a2);
                }
                ++rootIterCount;
                ++stats.toiRootIters;
                var s = fcn.evaluate(t);
                var indexA = fcn.indexA;
                var indexB = fcn.indexB;
                if (Math.abs(s - target) < tolerance) {
                    // t2 holds a tentative value for t1
                    t2 = t;
                    break;
                }
                // Ensure we continue to bracket the root.
                if (s > target) {
                    a1 = t;
                    s1 = s;
                } else {
                    a2 = t;
                    s2 = s;
                }
                if (rootIterCount == 50) {
                    break;
                }
            }
            stats.toiMaxRootIters = Math.max(stats.toiMaxRootIters, rootIterCount);
            ++pushBackIter;
            if (pushBackIter == Settings.maxPolygonVertices) {
                break;
            }
        }
        ++iter;
        ++stats.toiIters;
        if (done) {
            break;
        }
        if (iter == k_maxIterations) {
            // Root finder got stuck. Semi-victory.
            output.state = TOIOutput.e_failed;
            output.t = t1;
            break;
        }
    }
    stats.toiMaxIters = Math.max(stats.toiMaxIters, iter);
    var time = Timer.diff(timer);
    stats.toiMaxTime = Math.max(stats.toiMaxTime, time);
    stats.toiTime += time;
}

// SeparationFunction Type
var e_points = 1;

var e_faceA = 2;

var e_faceB = 3;

function SeparationFunction() {
    this.m_proxyA = new DistanceProxy();
    this.m_proxyB = new DistanceProxy();
    this.m_sweepA;
    // Sweep
    this.m_sweepB;
    // Sweep
    this.m_type;
    this.m_localPoint = Vec2.zero();
    this.m_axis = Vec2.zero();
}

// TODO_ERIN might not need to return the separation
/**
 * @param {SimplexCache} cache
 * @param {DistanceProxy} proxyA
 * @param {Sweep} sweepA
 * @param {DistanceProxy} proxyB
 * @param {Sweep} sweepB
 * @param {float} t1
 */
SeparationFunction.prototype.initialize = function(cache, proxyA, sweepA, proxyB, sweepB, t1) {
    this.m_proxyA = proxyA;
    this.m_proxyB = proxyB;
    var count = cache.count;
    ASSERT && common.assert(0 < count && count < 3);
    this.m_sweepA = sweepA;
    this.m_sweepB = sweepB;
    var xfA = Transform.identity();
    var xfB = Transform.identity();
    this.m_sweepA.getTransform(xfA, t1);
    this.m_sweepB.getTransform(xfB, t1);
    if (count == 1) {
        this.m_type = e_points;
        var localPointA = this.m_proxyA.getVertex(cache.indexA[0]);
        var localPointB = this.m_proxyB.getVertex(cache.indexB[0]);
        var pointA = Transform.mul(xfA, localPointA);
        var pointB = Transform.mul(xfB, localPointB);
        this.m_axis.wSet(1, pointB, -1, pointA);
        var s = this.m_axis.normalize();
        return s;
    } else if (cache.indexA[0] == cache.indexA[1]) {
        // Two points on B and one on A.
        this.m_type = e_faceB;
        var localPointB1 = proxyB.getVertex(cache.indexB[0]);
        var localPointB2 = proxyB.getVertex(cache.indexB[1]);
        this.m_axis = Vec2.cross(Vec2.sub(localPointB2, localPointB1), 1);
        this.m_axis.normalize();
        var normal = Rot.mul(xfB.q, this.m_axis);
        this.m_localPoint = Vec2.mid(localPointB1, localPointB2);
        var pointB = Transform.mul(xfB, this.m_localPoint);
        var localPointA = proxyA.getVertex(cache.indexA[0]);
        var pointA = Transform.mul(xfA, localPointA);
        var s = Vec2.dot(pointA, normal) - Vec2.dot(pointB, normal);
        if (s < 0) {
            this.m_axis = Vec2.neg(this.m_axis);
            s = -s;
        }
        return s;
    } else {
        // Two points on A and one or two points on B.
        this.m_type = e_faceA;
        var localPointA1 = this.m_proxyA.getVertex(cache.indexA[0]);
        var localPointA2 = this.m_proxyA.getVertex(cache.indexA[1]);
        this.m_axis = Vec2.cross(Vec2.sub(localPointA2, localPointA1), 1);
        this.m_axis.normalize();
        var normal = Rot.mul(xfA.q, this.m_axis);
        this.m_localPoint = Vec2.mid(localPointA1, localPointA2);
        var pointA = Transform.mul(xfA, this.m_localPoint);
        var localPointB = this.m_proxyB.getVertex(cache.indexB[0]);
        var pointB = Transform.mul(xfB, localPointB);
        var s = Vec2.dot(pointB, normal) - Vec2.dot(pointA, normal);
        if (s < 0) {
            this.m_axis = Vec2.neg(this.m_axis);
            s = -s;
        }
        return s;
    }
};

SeparationFunction.prototype.compute = function(find, t) {
    // It was findMinSeparation and evaluate
    var xfA = Transform.identity();
    var xfB = Transform.identity();
    this.m_sweepA.getTransform(xfA, t);
    this.m_sweepB.getTransform(xfB, t);
    // DEBUG && common.debug('xfB', t, this.m_sweepB.localCenter.x,
    // this.m_sweepB.localCenter.y, this.m_sweepB.c.x, this.m_sweepB.c.y,
    // this.m_sweepB.a, this.m_sweepB.alpha0, this.m_sweepB.c0.x,
    // this.m_sweepB.c0.y, this.m_sweepB.a0, xfB.p.x, xfB.p.y, xfB.q.c, xfB.q.s);
    switch (this.m_type) {
      case e_points:
        {
            if (find) {
                var axisA = Rot.mulT(xfA.q, this.m_axis);
                var axisB = Rot.mulT(xfB.q, Vec2.neg(this.m_axis));
                this.indexA = this.m_proxyA.getSupport(axisA);
                this.indexB = this.m_proxyB.getSupport(axisB);
            }
            var localPointA = this.m_proxyA.getVertex(this.indexA);
            var localPointB = this.m_proxyB.getVertex(this.indexB);
            var pointA = Transform.mul(xfA, localPointA);
            var pointB = Transform.mul(xfB, localPointB);
            var sep = Vec2.dot(pointB, this.m_axis) - Vec2.dot(pointA, this.m_axis);
            return sep;
        }

      case e_faceA:
        {
            var normal = Rot.mul(xfA.q, this.m_axis);
            var pointA = Transform.mul(xfA, this.m_localPoint);
            if (find) {
                var axisB = Rot.mulT(xfB.q, Vec2.neg(normal));
                this.indexA = -1;
                this.indexB = this.m_proxyB.getSupport(axisB);
            }
            var localPointB = this.m_proxyB.getVertex(this.indexB);
            var pointB = Transform.mul(xfB, localPointB);
            var sep = Vec2.dot(pointB, normal) - Vec2.dot(pointA, normal);
            return sep;
        }

      case e_faceB:
        {
            var normal = Rot.mul(xfB.q, this.m_axis);
            var pointB = Transform.mul(xfB, this.m_localPoint);
            if (find) {
                var axisA = Rot.mulT(xfA.q, Vec2.neg(normal));
                this.indexB = -1;
                this.indexA = this.m_proxyA.getSupport(axisA);
            }
            var localPointA = this.m_proxyA.getVertex(this.indexA);
            var pointA = Transform.mul(xfA, localPointA);
            var sep = Vec2.dot(pointA, normal) - Vec2.dot(pointB, normal);
            return sep;
        }

      default:
        ASSERT && common.assert(false);
        if (find) {
            this.indexA = -1;
            this.indexB = -1;
        }
        return 0;
    }
};

SeparationFunction.prototype.findMinSeparation = function(t) {
    return this.compute(true, t);
};

SeparationFunction.prototype.evaluate = function(t) {
    return this.compute(false, t);
};


},{"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../common/stats":26,"../util/Timer":49,"../util/common":50,"./Distance":13}],16:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Mat22;

var common = require("../util/common");

var Math = require("./Math");

var Vec2 = require("./Vec2");

/**
 * A 2-by-2 matrix. Stored in column-major order.
 */
function Mat22(a, b, c, d) {
    if (typeof a === "object" && a !== null) {
        this.ex = Vec2.clone(a);
        this.ey = Vec2.clone(b);
    } else if (typeof a === "number") {
        this.ex = Vec2.neo(a, c);
        this.ey = Vec2.neo(b, d);
    } else {
        this.ex = Vec2.zero();
        this.ey = Vec2.zero();
    }
}

Mat22.prototype.toString = function() {
    return JSON.stringify(this);
};

Mat22.isValid = function(o) {
    return o && Vec2.isValid(o.ex) && Vec2.isValid(o.ey);
};

Mat22.assert = function(o) {
    if (!ASSERT) return;
    if (!Mat22.isValid(o)) {
        DEBUG && common.debug(o);
        throw new Error("Invalid Mat22!");
    }
};

Mat22.prototype.set = function(a, b, c, d) {
    if (typeof a === "number" && typeof b === "number" && typeof c === "number" && typeof d === "number") {
        this.ex.set(a, c);
        this.ey.set(b, d);
    } else if (typeof a === "object" && typeof b === "object") {
        this.ex.set(a);
        this.ey.set(b);
    } else if (typeof a === "object") {
        ASSERT && Mat22.assert(a);
        this.ex.set(a.ex);
        this.ey.set(a.ey);
    } else {
        ASSERT && common.assert(false);
    }
};

Mat22.prototype.setIdentity = function() {
    this.ex.x = 1;
    this.ey.x = 0;
    this.ex.y = 0;
    this.ey.y = 1;
};

Mat22.prototype.setZero = function() {
    this.ex.x = 0;
    this.ey.x = 0;
    this.ex.y = 0;
    this.ey.y = 0;
};

Mat22.prototype.getInverse = function() {
    var a = this.ex.x;
    var b = this.ey.x;
    var c = this.ex.y;
    var d = this.ey.y;
    var det = a * d - b * c;
    if (det != 0) {
        det = 1 / det;
    }
    var imx = new Mat22();
    imx.ex.x = det * d;
    imx.ey.x = -det * b;
    imx.ex.y = -det * c;
    imx.ey.y = det * a;
    return imx;
};

/**
 * Solve A * x = b, where b is a column vector. This is more efficient than
 * computing the inverse in one-shot cases.
 */
Mat22.prototype.solve = function(v) {
    ASSERT && Vec2.assert(v);
    var a = this.ex.x;
    var b = this.ey.x;
    var c = this.ex.y;
    var d = this.ey.y;
    var det = a * d - b * c;
    if (det != 0) {
        det = 1 / det;
    }
    var w = Vec2.zero();
    w.x = det * (d * v.x - b * v.y);
    w.y = det * (a * v.y - c * v.x);
    return w;
};

/**
 * Multiply a matrix times a vector. If a rotation matrix is provided, then this
 * transforms the vector from one frame to another.
 */
Mat22.mul = function(mx, v) {
    if (v && "x" in v && "y" in v) {
        // Vec2
        ASSERT && Vec2.assert(v);
        var x = mx.ex.x * v.x + mx.ey.x * v.y;
        var y = mx.ex.y * v.x + mx.ey.y * v.y;
        return Vec2.neo(x, y);
    } else if (v && "ex" in v && "ey" in v) {
        // Mat22
        ASSERT && Mat22.assert(v);
        return new Mat22(Vec2.mul(mx, v.ex), Vec2.mul(mx, v.ey));
    }
    ASSERT && common.assert(false);
};

/**
 * 
 * Multiply a matrix transpose times a vector. If a rotation matrix is provided,
 * then this transforms the vector from one frame to another (inverse
 * transform).
 */
Mat22.mulT = function(mx, v) {
    if (v && "x" in v && "y" in v) {
        // Vec2
        ASSERT && Vec2.assert(v);
        return Vec2.neo(Vec2.dot(v, mx.ex), Vec2.dot(v, mx.ey));
    } else if (v && "ex" in v && "ey" in v) {
        // Mat22
        ASSERT && Mat22.assert(v);
        var c1 = Vec2.neo(Vec2.dot(mx.ex, v.ex), Vec2.dot(mx.ey, v.ex));
        var c2 = Vec2.neo(Vec2.dot(mx.ex, v.ey), Vec2.dot(mx.ey, v.ey));
        return new Mat22(c1, c2);
    }
    ASSERT && common.assert(false);
};

Mat22.abs = function(mx) {
    ASSERT && Mat22.assert(mx);
    return new Mat22(Vec2.abs(mx.ex), Vec2.abs(mx.ey));
};

Mat22.add = function(mx1, mx2) {
    ASSERT && Mat22.assert(mx1);
    ASSERT && Mat22.assert(mx2);
    return new Mat22(Vec2.add(mx1.ex + mx2.ex), Vec2.add(mx1.ey + mx2.ey));
};


},{"../util/common":50,"./Math":18,"./Vec2":23}],17:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Mat33;

var common = require("../util/common");

var Math = require("./Math");

var Vec2 = require("./Vec2");

var Vec3 = require("./Vec3");

/**
 * A 3-by-3 matrix. Stored in column-major order.
 */
function Mat33(a, b, c) {
    if (typeof a === "object" && a !== null) {
        this.ex = Vec3.clone(a);
        this.ey = Vec3.clone(b);
        this.ez = Vec3.clone(c);
    } else {
        this.ex = Vec3();
        this.ey = Vec3();
        this.ez = Vec3();
    }
}

Mat33.prototype.toString = function() {
    return JSON.stringify(this);
};

Mat33.isValid = function(o) {
    return o && Vec3.isValid(o.ex) && Vec3.isValid(o.ey) && Vec3.isValid(o.ez);
};

Mat33.assert = function(o) {
    if (!ASSERT) return;
    if (!Mat33.isValid(o)) {
        DEBUG && common.debug(o);
        throw new Error("Invalid Mat33!");
    }
};

/**
 * Set this matrix to all zeros.
 */
Mat33.prototype.setZero = function() {
    this.ex.setZero();
    this.ey.setZero();
    this.ez.setZero();
    return this;
};

/**
 * Solve A * x = b, where b is a column vector. This is more efficient than
 * computing the inverse in one-shot cases.
 * 
 * @param {Vec3} v
 * @returns {Vec3}
 */
Mat33.prototype.solve33 = function(v) {
    var det = Vec3.dot(this.ex, Vec3.cross(this.ey, this.ez));
    if (det != 0) {
        det = 1 / det;
    }
    var r = new Vec3();
    r.x = det * Vec3.dot(v, Vec3.cross(this.ey, this.ez));
    r.y = det * Vec3.dot(this.ex, Vec3.cross(v, this.ez));
    r.z = det * Vec3.dot(this.ex, Vec3.cross(this.ey, v));
    return r;
};

/**
 * Solve A * x = b, where b is a column vector. This is more efficient than
 * computing the inverse in one-shot cases. Solve only the upper 2-by-2 matrix
 * equation.
 * 
 * @param {Vec2} v
 * 
 * @returns {Vec2}
 */
Mat33.prototype.solve22 = function(v) {
    var a11 = this.ex.x;
    var a12 = this.ey.x;
    var a21 = this.ex.y;
    var a22 = this.ey.y;
    var det = a11 * a22 - a12 * a21;
    if (det != 0) {
        det = 1 / det;
    }
    var r = Vec2.zero();
    r.x = det * (a22 * v.x - a12 * v.y);
    r.y = det * (a11 * v.y - a21 * v.x);
    return r;
};

/**
 * Get the inverse of this matrix as a 2-by-2. Returns the zero matrix if
 * singular.
 * 
 * @param {Mat33} M
 */
Mat33.prototype.getInverse22 = function(M) {
    var a = this.ex.x;
    var b = this.ey.x;
    var c = this.ex.y;
    var d = this.ey.y;
    var det = a * d - b * c;
    if (det != 0) {
        det = 1 / det;
    }
    M.ex.x = det * d;
    M.ey.x = -det * b;
    M.ex.z = 0;
    M.ex.y = -det * c;
    M.ey.y = det * a;
    M.ey.z = 0;
    M.ez.x = 0;
    M.ez.y = 0;
    M.ez.z = 0;
};

/**
 * Get the symmetric inverse of this matrix as a 3-by-3. Returns the zero matrix
 * if singular.
 * 
 * @param {Mat33} M
 */
Mat33.prototype.getSymInverse33 = function(M) {
    var det = Vec3.dot(this.ex, Vec3.cross(this.ey, this.ez));
    if (det != 0) {
        det = 1 / det;
    }
    var a11 = this.ex.x;
    var a12 = this.ey.x;
    var a13 = this.ez.x;
    var a22 = this.ey.y;
    var a23 = this.ez.y;
    var a33 = this.ez.z;
    M.ex.x = det * (a22 * a33 - a23 * a23);
    M.ex.y = det * (a13 * a23 - a12 * a33);
    M.ex.z = det * (a12 * a23 - a13 * a22);
    M.ey.x = M.ex.y;
    M.ey.y = det * (a11 * a33 - a13 * a13);
    M.ey.z = det * (a13 * a12 - a11 * a23);
    M.ez.x = M.ex.z;
    M.ez.y = M.ey.z;
    M.ez.z = det * (a11 * a22 - a12 * a12);
};

/**
 * Multiply a matrix times a vector.
 * 
 * @param {Mat33} a
 * @param {Vec3|Vec2} b
 * 
 * @returns {Vec3|Vec2}
 */
Mat33.mul = function(a, b) {
    ASSERT && Mat33.assert(a);
    if (b && "z" in b && "y" in b && "x" in b) {
        ASSERT && Vec3.assert(b);
        var x = a.ex.x * b.x + a.ey.x * b.y + a.ez.x * b.z;
        var y = a.ex.y * b.x + a.ey.y * b.y + a.ez.y * b.z;
        var z = a.ex.z * b.x + a.ey.z * b.y + a.ez.z * b.z;
        return new Vec3(x, y, z);
    } else if (b && "y" in b && "x" in b) {
        ASSERT && Vec2.assert(b);
        var x = a.ex.x * b.x + a.ey.x * b.y;
        var y = a.ex.y * b.x + a.ey.y * b.y;
        return Vec2.neo(x, y);
    }
    ASSERT && common.assert(false);
};

Mat33.add = function(a, b) {
    ASSERT && Mat33.assert(a);
    ASSERT && Mat33.assert(b);
    return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
};


},{"../util/common":50,"./Math":18,"./Vec2":23,"./Vec3":24}],18:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

var common = require("../util/common");

var create = require("../util/create");

var native = Math;

var math = module.exports = create(native);

math.EPSILON = 1e-9;

// TODO
/**
 * This function is used to ensure that a floating point number is not a NaN or
 * infinity.
 */
math.isFinite = function(x) {
    return typeof x === "number" && isFinite(x) && !isNaN(x);
};

math.assert = function(x) {
    if (!ASSERT) return;
    if (!math.isFinite(x)) {
        DEBUG && common.debug(x);
        throw new Error("Invalid Number!");
    }
};

/**
 * TODO: This is a approximate yet fast inverse square-root.
 */
math.invSqrt = function(x) {
    // TODO
    return 1 / native.sqrt(x);
};

/**
 * Next Largest Power of 2 Given a binary integer value x, the next largest
 * power of 2 can be computed by a SWAR algorithm that recursively "folds" the
 * upper bits into the lower bits. This process yields a bit vector with the
 * same most significant 1 as x, but all 1's below it. Adding 1 to that value
 * yields the next largest power of 2. For a 32-bit value:
 */
math.nextPowerOfTwo = function(x) {
    // TODO
    x |= x >> 1;
    x |= x >> 2;
    x |= x >> 4;
    x |= x >> 8;
    x |= x >> 16;
    return x + 1;
};

math.isPowerOfTwo = function(x) {
    return x > 0 && (x & x - 1) == 0;
};

math.mod = function(num, min, max) {
    if (typeof min === "undefined") {
        max = 1, min = 0;
    } else if (typeof max === "undefined") {
        max = min, min = 0;
    }
    if (max > min) {
        num = (num - min) % (max - min);
        return num + (num < 0 ? max : min);
    } else {
        num = (num - max) % (min - max);
        return num + (num <= 0 ? min : max);
    }
};

math.clamp = function(num, min, max) {
    if (num < min) {
        return min;
    } else if (num > max) {
        return max;
    } else {
        return num;
    }
};

math.random = function(min, max) {
    if (typeof min === "undefined") {
        max = 1;
        min = 0;
    } else if (typeof max === "undefined") {
        max = min;
        min = 0;
    }
    return min == max ? min : native.random() * (max - min) + min;
};


},{"../util/common":50,"../util/create":51}],19:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Position;

var Vec2 = require("./Vec2");

var Rot = require("./Rot");

/**
 * @prop {Vec2} c location
 * @prop {float} a angle
 */
function Position() {
    this.c = Vec2.zero();
    this.a = 0;
}

Position.prototype.getTransform = function(xf, p) {
    xf.q.set(this.a);
    xf.p.set(Vec2.sub(this.c, Rot.mul(xf.q, p)));
    return xf;
};


},{"./Rot":20,"./Vec2":23}],20:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Rot;

var common = require("../util/common");

var Vec2 = require("./Vec2");

var Math = require("./Math");

// TODO merge with Transform
/**
 * Initialize from an angle in radians.
 */
function Rot(angle) {
    if (!(this instanceof Rot)) {
        return new Rot(angle);
    }
    if (typeof angle === "number") {
        this.setAngle(angle);
    } else if (typeof angle === "object") {
        this.set(angle);
    } else {
        this.setIdentity();
    }
}

Rot.neo = function(angle) {
    var obj = Object.create(Rot.prototype);
    obj.setAngle(angle);
    return obj;
};

Rot.clone = function(rot) {
    ASSERT && Rot.assert(rot);
    var obj = Object.create(Rot.prototype);
    obj.s = rot.s;
    obj.c = rot.c;
    return obj;
};

Rot.identity = function(rot) {
    ASSERT && Rot.assert(rot);
    var obj = Object.create(Rot.prototype);
    obj.s = 0;
    obj.c = 1;
    return obj;
};

Rot.isValid = function(o) {
    return o && Math.isFinite(o.s) && Math.isFinite(o.c);
};

Rot.assert = function(o) {
    if (!ASSERT) return;
    if (!Rot.isValid(o)) {
        DEBUG && common.debug(o);
        throw new Error("Invalid Rot!");
    }
};

/**
 * Set to the identity rotation.
 */
Rot.prototype.setIdentity = function() {
    this.s = 0;
    this.c = 1;
};

Rot.prototype.set = function(angle) {
    if (typeof angle === "object") {
        ASSERT && Rot.assert(angle);
        this.s = angle.s;
        this.c = angle.c;
    } else {
        ASSERT && Math.assert(angle);
        // TODO_ERIN optimize
        this.s = Math.sin(angle);
        this.c = Math.cos(angle);
    }
};

/**
 * Set using an angle in radians.
 */
Rot.prototype.setAngle = function(angle) {
    ASSERT && Math.assert(angle);
    // TODO_ERIN optimize
    this.s = Math.sin(angle);
    this.c = Math.cos(angle);
};

/**
 * Get the angle in radians.
 */
Rot.prototype.getAngle = function() {
    return Math.atan2(this.s, this.c);
};

/**
 * Get the x-axis.
 */
Rot.prototype.getXAxis = function() {
    return Vec2.neo(this.c, this.s);
};

/**
 * Get the u-axis.
 */
Rot.prototype.getYAxis = function() {
    return Vec2.neo(-this.s, this.c);
};

/**
 * Multiply two rotations: q * r
 * 
 * @returns Rot
 * 
 * Rotate a vector
 * 
 * @returns Vec2
 */
Rot.mul = function(rot, m) {
    ASSERT && Rot.assert(rot);
    if ("c" in m && "s" in m) {
        ASSERT && Rot.assert(m);
        // [qc -qs] * [rc -rs] = [qc*rc-qs*rs -qc*rs-qs*rc]
        // [qs qc] [rs rc] [qs*rc+qc*rs -qs*rs+qc*rc]
        // s = qs * rc + qc * rs
        // c = qc * rc - qs * rs
        var qr = Rot.identity();
        qr.s = rot.s * m.c + rot.c * m.s;
        qr.c = rot.c * m.c - rot.s * m.s;
        return qr;
    } else if ("x" in m && "y" in m) {
        ASSERT && Vec2.assert(m);
        return Vec2.neo(rot.c * m.x - rot.s * m.y, rot.s * m.x + rot.c * m.y);
    }
};

Rot.mulSub = function(rot, v, w) {
    var x = rot.c * (v.x - w.x) - rot.s * (v.y - w.y);
    var y = rot.s * (v.x - w.y) + rot.c * (v.y - w.y);
    return Vec2.neo(x, y);
};

/**
 * Transpose multiply two rotations: qT * r
 * 
 * @returns Rot
 * 
 * Inverse rotate a vector
 * 
 * @returns Vec2
 */
Rot.mulT = function(rot, m) {
    if ("c" in m && "s" in m) {
        ASSERT && Rot.assert(m);
        // [ qc qs] * [rc -rs] = [qc*rc+qs*rs -qc*rs+qs*rc]
        // [-qs qc] [rs rc] [-qs*rc+qc*rs qs*rs+qc*rc]
        // s = qc * rs - qs * rc
        // c = qc * rc + qs * rs
        var qr = Rot.identity();
        qr.s = rot.c * m.s - rot.s * m.c;
        qr.c = rot.c * m.c + rot.s * m.s;
        return qr;
    } else if ("x" in m && "y" in m) {
        ASSERT && Vec2.assert(m);
        return Vec2.neo(rot.c * m.x + rot.s * m.y, -rot.s * m.x + rot.c * m.y);
    }
};


},{"../util/common":50,"./Math":18,"./Vec2":23}],21:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Sweep;

var common = require("../util/common");

var Math = require("./Math");

var Vec2 = require("./Vec2");

var Rot = require("./Rot");

var Transform = require("./Transform");

/**
 * This describes the motion of a body/shape for TOI computation. Shapes are
 * defined with respect to the body origin, which may not coincide with the
 * center of mass. However, to support dynamics we must interpolate the center
 * of mass position.
 * 
 * @prop {Vec2} localCenter Local center of mass position
 * @prop {Vec2} c World center position
 * @prop {float} a World angle
 * @prop {float} alpha0 Fraction of the current time step in the range [0,1], c0
 *       and a0 are c and a at alpha0.
 */
function Sweep(c, a) {
    ASSERT && common.assert(typeof c === "undefined");
    ASSERT && common.assert(typeof a === "undefined");
    this.localCenter = Vec2.zero();
    this.c = Vec2.zero();
    this.a = 0;
    this.alpha0 = 0;
    this.c0 = Vec2.zero();
    this.a0 = 0;
}

Sweep.prototype.setTransform = function(xf) {
    var c = Transform.mul(xf, this.localCenter);
    this.c.set(c);
    this.c0.set(c);
    this.a = xf.q.getAngle();
    this.a0 = xf.q.getAngle();
};

Sweep.prototype.setLocalCenter = function(localCenter, xf) {
    this.localCenter.set(localCenter);
    var c = Transform.mul(xf, this.localCenter);
    this.c.set(c);
    this.c0.set(c);
};

/**
 * Get the interpolated transform at a specific time.
 * 
 * @param xf
 * @param beta A factor in [0,1], where 0 indicates alpha0
 */
Sweep.prototype.getTransform = function(xf, beta) {
    beta = typeof beta === "undefined" ? 0 : beta;
    xf.q.setAngle((1 - beta) * this.a0 + beta * this.a);
    xf.p.wSet(1 - beta, this.c0, beta, this.c);
    // shift to origin
    xf.p.sub(Rot.mul(xf.q, this.localCenter));
};

/**
 * Advance the sweep forward, yielding a new initial state.
 * 
 * @param {float} alpha The new initial time
 */
Sweep.prototype.advance = function(alpha) {
    ASSERT && common.assert(this.alpha0 < 1);
    var beta = (alpha - this.alpha0) / (1 - this.alpha0);
    this.c0.wSet(beta, this.c, 1 - beta, this.c0);
    this.a0 = beta * this.a + (1 - beta) * this.a0;
    this.alpha0 = alpha;
};

Sweep.prototype.forward = function() {
    this.a0 = this.a;
    this.c0.set(this.c);
};

/**
 * normalize the angles in radians to be between -pi and pi.
 */
Sweep.prototype.normalize = function() {
    var a0 = Math.mod(this.a0, -Math.PI, +Math.PI);
    this.a -= this.a0 - a0;
    this.a0 = a0;
};

Sweep.prototype.clone = function() {
    var clone = new Sweep();
    clone.localCenter.set(this.localCenter);
    clone.alpha0 = this.alpha0;
    clone.a0 = this.a0;
    clone.a = this.a;
    clone.c0.set(this.c0);
    clone.c.set(this.c);
    return clone;
};

Sweep.prototype.set = function(that) {
    this.localCenter.set(that.localCenter);
    this.alpha0 = that.alpha0;
    this.a0 = that.a0;
    this.a = that.a;
    this.c0.set(that.c0);
    this.c.set(that.c);
};


},{"../util/common":50,"./Math":18,"./Rot":20,"./Transform":22,"./Vec2":23}],22:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Transform;

var common = require("../util/common");

var Vec2 = require("./Vec2");

var Rot = require("./Rot");

// TODO merge with Rot
/**
 * A transform contains translation and rotation. It is used to represent the
 * position and orientation of rigid frames. Initialize using a position vector
 * and a rotation.
 * 
 * @prop {Vec2} position
 * @prop {Rot} rotation
 */
function Transform(position, rotation) {
    if (!(this instanceof Transform)) {
        return new Transform(position, rotation);
    }
    this.p = Vec2.zero();
    this.q = Rot.identity();
    if (typeof position !== "undefined") {
        this.p.set(position);
    }
    if (typeof rotation !== "undefined") {
        this.q.set(rotation);
    }
}

Transform.clone = function(xf) {
    var obj = Object.create(Transform.prototype);
    obj.p = Vec2.clone(xf.p);
    obj.q = Rot.clone(xf.q);
    return obj;
};

Transform.neo = function(position, rotation) {
    var obj = Object.create(Transform.prototype);
    obj.p = Vec2.clone(position);
    obj.q = Rot.clone(rotation);
    return obj;
};

Transform.identity = function() {
    var obj = Object.create(Transform.prototype);
    obj.p = Vec2.zero();
    obj.q = Rot.identity();
    return obj;
};

/**
 * Set this to the identity transform.
 */
Transform.prototype.setIdentity = function() {
    this.p.setZero();
    this.q.setIdentity();
};

/**
 * Set this based on the position and angle.
 */
Transform.prototype.set = function(a, b) {
    if (Transform.isValid(a)) {
        this.p.set(a.p);
        this.q.set(a.q);
    } else {
        this.p.set(a);
        this.q.set(b);
    }
};

Transform.isValid = function(o) {
    return o && Vec2.isValid(o.p) && Rot.isValid(o.q);
};

Transform.assert = function(o) {
    if (!ASSERT) return;
    if (!Transform.isValid(o)) {
        DEBUG && common.debug(o);
        throw new Error("Invalid Transform!");
    }
};

/**
 * @param {Transform} a
 * @param {Vec2} b
 * @returns {Vec2}
 * 
 * @param {Transform} a
 * @param {Transform} b
 * @returns {Transform}
 */
Transform.mul = function(a, b) {
    ASSERT && Transform.assert(a);
    if (Array.isArray(b)) {
        var arr = [];
        for (var i = 0; i < b.length; i++) {
            arr[i] = Transform.mul(a, b[i]);
        }
        return arr;
    } else if ("x" in b && "y" in b) {
        ASSERT && Vec2.assert(b);
        var x = a.q.c * b.x - a.q.s * b.y + a.p.x;
        var y = a.q.s * b.x + a.q.c * b.y + a.p.y;
        return Vec2.neo(x, y);
    } else if ("p" in b && "q" in b) {
        ASSERT && Transform.assert(b);
        // v2 = A.q.Rot(B.q.Rot(v1) + B.p) + A.p
        // = (A.q * B.q).Rot(v1) + A.q.Rot(B.p) + A.p
        var xf = Transform.identity();
        xf.q = Rot.mul(a.q, b.q);
        xf.p = Vec2.add(Rot.mul(a.q, b.p), a.p);
        return xf;
    }
};

/**
 * @param {Transform} a
 * @param {Vec2} b
 * @returns {Vec2}
 * 
 * @param {Transform} a
 * @param {Transform} b
 * @returns {Transform}
 */
Transform.mulT = function(a, b) {
    ASSERT && Transform.assert(a);
    if ("x" in b && "y" in b) {
        ASSERT && Vec2.assert(b);
        var px = b.x - a.p.x;
        var py = b.y - a.p.y;
        var x = a.q.c * px + a.q.s * py;
        var y = -a.q.s * px + a.q.c * py;
        return Vec2.neo(x, y);
    } else if ("p" in b && "q" in b) {
        ASSERT && Transform.assert(b);
        // v2 = A.q' * (B.q * v1 + B.p - A.p)
        // = A.q' * B.q * v1 + A.q' * (B.p - A.p)
        var xf = Transform.identity();
        xf.q.set(Rot.mulT(a.q, b.q));
        xf.p.set(Rot.mulT(a.q, Vec2.sub(b.p, a.p)));
        return xf;
    }
};


},{"../util/common":50,"./Rot":20,"./Vec2":23}],23:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Vec2;

var common = require("../util/common");

var Math = require("./Math");

function Vec2(x, y) {
    if (!(this instanceof Vec2)) {
        return new Vec2(x, y);
    }
    if (typeof x === "undefined") {
        this.x = 0, this.y = 0;
    } else if (typeof x === "object") {
        this.x = x.x, this.y = x.y;
    } else {
        this.x = x, this.y = y;
    }
    ASSERT && Vec2.assert(this);
}

Vec2.zero = function() {
    var obj = Object.create(Vec2.prototype);
    obj.x = 0;
    obj.y = 0;
    return obj;
};

Vec2.neo = function(x, y) {
    var obj = Object.create(Vec2.prototype);
    obj.x = x;
    obj.y = y;
    return obj;
};

Vec2.clone = function(v, depricated) {
    ASSERT && Vec2.assert(v);
    ASSERT && common.assert(!depricated);
    return Vec2.neo(v.x, v.y);
};

Vec2.prototype.toString = function() {
    return JSON.stringify(this);
};

/**
 * Does this vector contain finite coordinates?
 */
Vec2.isValid = function(v) {
    return v && Math.isFinite(v.x) && Math.isFinite(v.y);
};

Vec2.assert = function(o) {
    if (!ASSERT) return;
    if (!Vec2.isValid(o)) {
        DEBUG && common.debug(o);
        throw new Error("Invalid Vec2!");
    }
};

Vec2.prototype.clone = function(depricated) {
    return Vec2.clone(this, depricated);
};

/**
 * Set this vector to all zeros.
 * 
 * @returns this
 */
Vec2.prototype.setZero = function() {
    this.x = 0;
    this.y = 0;
    return this;
};

/**
 * Set this vector to some specified coordinates.
 * 
 * @returns this
 */
Vec2.prototype.set = function(x, y) {
    if (typeof x === "object") {
        ASSERT && Vec2.assert(x);
        this.x = x.x;
        this.y = x.y;
    } else {
        ASSERT && Math.assert(x);
        ASSERT && Math.assert(y);
        this.x = x;
        this.y = y;
    }
    return this;
};

Vec2.prototype.wSet = function(a, v, b, w) {
    ASSERT && Math.assert(a);
    ASSERT && Vec2.assert(v);
    var x = a * v.x;
    var y = a * v.y;
    if (typeof b !== "undefined" || typeof w !== "undefined") {
        ASSERT && Math.assert(b);
        ASSERT && Vec2.assert(w);
        x += b * w.x;
        y += b * w.y;
    }
    // `this` may be `w`
    this.x = x;
    this.y = y;
    return this;
};

/**
 * Add a vector to this vector.
 * 
 * @returns this
 */
Vec2.prototype.add = function(w) {
    ASSERT && Vec2.assert(w);
    this.x += w.x;
    this.y += w.y;
    return this;
};

Vec2.prototype.wAdd = function(a, v, b, w) {
    ASSERT && Math.assert(a);
    ASSERT && Vec2.assert(v);
    var x = a * v.x;
    var y = a * v.y;
    if (typeof b !== "undefined" || typeof w !== "undefined") {
        ASSERT && Math.assert(b);
        ASSERT && Vec2.assert(w);
        x += b * w.x;
        y += b * w.y;
    }
    // `this` may be `w`
    this.x += x;
    this.y += y;
    return this;
};

Vec2.prototype.wSub = function(a, v, b, w) {
    ASSERT && Math.assert(a);
    ASSERT && Vec2.assert(v);
    var x = a * v.x;
    var y = a * v.y;
    if (typeof b !== "undefined" || typeof w !== "undefined") {
        ASSERT && Math.assert(b);
        ASSERT && Vec2.assert(w);
        x += b * w.x;
        y += b * w.y;
    }
    // `this` may be `w`
    this.x -= x;
    this.y -= y;
    return this;
};

/**
 * Subtract a vector from this vector
 * 
 * @returns this
 */
Vec2.prototype.sub = function(w) {
    ASSERT && Vec2.assert(w);
    this.x -= w.x;
    this.y -= w.y;
    return this;
};

/**
 * Multiply this vector by a scalar.
 * 
 * @returns this
 */
Vec2.prototype.mul = function(m) {
    ASSERT && Math.assert(m);
    this.x *= m;
    this.y *= m;
    return this;
};

/**
 * Get the length of this vector (the norm).
 * 
 * For performance, use this instead of lengthSquared (if possible).
 */
Vec2.prototype.length = function() {
    return Vec2.lengthOf(this);
};

/**
 * Get the length squared.
 */
Vec2.prototype.lengthSquared = function() {
    return Vec2.lengthSquared(this);
};

/**
 * Convert this vector into a unit vector.
 * 
 * @returns old length
 */
Vec2.prototype.normalize = function() {
    var length = this.length();
    if (length < Math.EPSILON) {
        return 0;
    }
    var invLength = 1 / length;
    this.x *= invLength;
    this.y *= invLength;
    return length;
};

/**
 * Get the length of this vector (the norm).
 *
 * For performance, use this instead of lengthSquared (if possible).
 */
Vec2.lengthOf = function(v) {
    ASSERT && Vec2.assert(v);
    return Math.sqrt(v.x * v.x + v.y * v.y);
};

/**
 * Get the length squared.
 */
Vec2.lengthSquared = function(v) {
    ASSERT && Vec2.assert(v);
    return v.x * v.x + v.y * v.y;
};

Vec2.distance = function(v, w) {
    ASSERT && Vec2.assert(v);
    ASSERT && Vec2.assert(w);
    var dx = v.x - w.x, dy = v.y - w.y;
    return Math.sqrt(dx * dx + dy * dy);
};

Vec2.distanceSquared = function(v, w) {
    ASSERT && Vec2.assert(v);
    ASSERT && Vec2.assert(w);
    var dx = v.x - w.x, dy = v.y - w.y;
    return dx * dx + dy * dy;
};

Vec2.areEqual = function(v, w) {
    ASSERT && Vec2.assert(v);
    ASSERT && Vec2.assert(w);
    return v == w || typeof w === "object" && w !== null && v.x == w.x && v.y == w.y;
};

/**
 * Get the skew vector such that dot(skew_vec, other) == cross(vec, other)
 */
Vec2.skew = function(v) {
    ASSERT && Vec2.assert(v);
    return Vec2.neo(-v.y, v.x);
};

/**
 * Perform the dot product on two vectors.
 */
Vec2.dot = function(v, w) {
    ASSERT && Vec2.assert(v);
    ASSERT && Vec2.assert(w);
    return v.x * w.x + v.y * w.y;
};

/**
 * Perform the cross product on two vectors. In 2D this produces a scalar.
 * 
 * Perform the cross product on a vector and a scalar. In 2D this produces a
 * vector.
 */
Vec2.cross = function(v, w) {
    if (typeof w === "number") {
        ASSERT && Vec2.assert(v);
        ASSERT && Math.assert(w);
        return Vec2.neo(w * v.y, -w * v.x);
    } else if (typeof v === "number") {
        ASSERT && Math.assert(v);
        ASSERT && Vec2.assert(w);
        return Vec2.neo(-v * w.y, v * w.x);
    } else {
        ASSERT && Vec2.assert(v);
        ASSERT && Vec2.assert(w);
        return v.x * w.y - v.y * w.x;
    }
};

Vec2.addCross = function(a, v, w) {
    if (typeof w === "number") {
        ASSERT && Vec2.assert(v);
        ASSERT && Math.assert(w);
        return Vec2.neo(w * v.y + a.x, -w * v.x + a.y);
    } else if (typeof v === "number") {
        ASSERT && Math.assert(v);
        ASSERT && Vec2.assert(w);
        return Vec2.neo(-v * w.y + a.x, v * w.x + a.y);
    }
    ASSERT && common.assert(false);
};

Vec2.add = function(v, w) {
    ASSERT && Vec2.assert(v);
    ASSERT && Vec2.assert(w);
    return Vec2.neo(v.x + w.x, v.y + w.y);
};

Vec2.wAdd = function(a, v, b, w) {
    var r = Vec2.zero();
    r.wAdd(a, v, b, w);
    return r;
};

Vec2.sub = function(v, w) {
    ASSERT && Vec2.assert(v);
    ASSERT && Vec2.assert(w);
    return Vec2.neo(v.x - w.x, v.y - w.y);
};

Vec2.mul = function(a, b) {
    if (typeof a === "object") {
        ASSERT && Vec2.assert(a);
        ASSERT && Math.assert(b);
        return Vec2.neo(a.x * b, a.y * b);
    } else if (typeof b === "object") {
        ASSERT && Math.assert(a);
        ASSERT && Vec2.assert(b);
        return Vec2.neo(a * b.x, a * b.y);
    }
};

Vec2.prototype.neg = function() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
};

Vec2.neg = function(v) {
    ASSERT && Vec2.assert(v);
    return Vec2.neo(-v.x, -v.y);
};

Vec2.abs = function(v) {
    ASSERT && Vec2.assert(v);
    return Vec2.neo(Math.abs(v.x), Math.abs(v.y));
};

Vec2.mid = function(v, w) {
    ASSERT && Vec2.assert(v);
    ASSERT && Vec2.assert(w);
    return Vec2.neo((v.x + w.x) * .5, (v.y + w.y) * .5);
};

Vec2.upper = function(v, w) {
    ASSERT && Vec2.assert(v);
    ASSERT && Vec2.assert(w);
    return Vec2.neo(Math.max(v.x, w.x), Math.max(v.y, w.y));
};

Vec2.lower = function(v, w) {
    ASSERT && Vec2.assert(v);
    ASSERT && Vec2.assert(w);
    return Vec2.neo(Math.min(v.x, w.x), Math.min(v.y, w.y));
};

Vec2.prototype.clamp = function(max) {
    var lengthSqr = this.x * this.x + this.y * this.y;
    if (lengthSqr > max * max) {
        var invLength = Math.invSqrt(lengthSqr);
        this.x *= invLength * max;
        this.y *= invLength * max;
    }
    return this;
};

Vec2.clamp = function(v, max) {
    v = Vec2.neo(v.x, v.y);
    v.clamp(max);
    return v;
};


},{"../util/common":50,"./Math":18}],24:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Vec3;

var common = require("../util/common");

var Math = require("./Math");

function Vec3(x, y, z) {
    if (!(this instanceof Vec3)) {
        return new Vec3(x, y, z);
    }
    if (typeof x === "undefined") {
        this.x = 0, this.y = 0, this.z = 0;
    } else if (typeof x === "object") {
        this.x = x.x, this.y = x.y, this.z = x.z;
    } else {
        this.x = x, this.y = y, this.z = z;
    }
    ASSERT && Vec3.assert(this);
}

Vec3.prototype.toString = function() {
    return JSON.stringify(this);
};

/**
 * Does this vector contain finite coordinates?
 */
Vec3.isValid = function(v) {
    return v && Math.isFinite(v.x) && Math.isFinite(v.y) && Math.isFinite(v.z);
};

Vec3.assert = function(o) {
    if (!ASSERT) return;
    if (!Vec3.isValid(o)) {
        DEBUG && common.debug(o);
        throw new Error("Invalid Vec3!");
    }
};

Vec3.prototype.setZero = function() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    return this;
};

Vec3.prototype.set = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
};

Vec3.prototype.add = function(w) {
    this.x += w.x;
    this.y += w.y;
    this.z += w.z;
    return this;
};

Vec3.prototype.sub = function(w) {
    this.x -= w.x;
    this.y -= w.y;
    this.z -= w.z;
    return this;
};

Vec3.prototype.mul = function(m) {
    this.x *= m;
    this.y *= m;
    this.z *= m;
    return this;
};

Vec3.areEqual = function(v, w) {
    return v == w || typeof w === "object" && w !== null && v.x == w.x && v.y == w.y && v.z == w.z;
};

// Perform the dot product on two vectors.
Vec3.dot = function(v, w) {
    return v.x * w.x + v.y * w.y + v.z * w.z;
};

// Perform the cross product on two vectors. In 2D this produces a scalar.
Vec3.cross = function(v, w) {
    return new Vec3(v.y * w.z - v.z * w.y, v.z * w.x - v.x * w.z, v.x * w.y - v.y * w.x);
};

Vec3.add = function(v, w) {
    return new Vec3(v.x + w.x, v.y + w.y, v.z + w.z);
};

Vec3.sub = function(v, w) {
    return new Vec3(v.x - w.x, v.y - w.y, v.z - w.z);
};

Vec3.mul = function(v, m) {
    return new Vec3(m * v.x, m * v.y, m * v.z);
};

Vec3.prototype.neg = function(m) {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
};

Vec3.neg = function(v) {
    return new Vec3(-v.x, -v.y, -v.z);
};


},{"../util/common":50,"./Math":18}],25:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Velocity;

var Vec2 = require("./Vec2");

/**
 * @prop {Vec2} v linear
 * @prop {float} w angular
 */
function Velocity() {
    this.v = Vec2.zero();
    this.w = 0;
}


},{"./Vec2":23}],26:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

exports.toString = function(newline) {
    newline = typeof newline === "string" ? newline : "\n";
    var string = "";
    for (var name in this) {
        if (typeof this[name] !== "function" && typeof this[name] !== "object") {
            string += name + ": " + this[name] + newline;
        }
    }
    return string;
};


},{}],27:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = DistanceJoint;

var options = require("../util/options");

var create = require("../util/create");

var Settings = require("../Settings");

var Math = require("../common/Math");

var Vec2 = require("../common/Vec2");

var Vec3 = require("../common/Vec3");

var Mat22 = require("../common/Mat22");

var Mat33 = require("../common/Mat33");

var Rot = require("../common/Rot");

var Sweep = require("../common/Sweep");

var Transform = require("../common/Transform");

var Velocity = require("../common/Velocity");

var Position = require("../common/Position");

var Joint = require("../Joint");

DistanceJoint.TYPE = "distance-joint";

DistanceJoint._super = Joint;

DistanceJoint.prototype = create(DistanceJoint._super.prototype);

/**
 * @typedef {Object} DistanceJointDef
 *
 * Distance joint definition. This requires defining an anchor point on both
 * bodies and the non-zero length of the distance joint. The definition uses
 * local anchor points so that the initial configuration can violate the
 * constraint slightly. This helps when saving and loading a game. Warning: Do
 * not use a zero or short length.
 * 
 * @prop {float} frequencyHz The mass-spring-damper frequency in Hertz. A value
 *       of 0 disables softness.
 * @prop {float} dampingRatio The damping ratio. 0 = no damping, 1 = critical
 *       damping.
 */
var DistanceJointDef = {
    frequencyHz: 0,
    dampingRatio: 0
};

/**
 * A distance joint constrains two points on two bodies to remain at a fixed
 * distance from each other. You can view this as a massless, rigid rod.
 * 
 * @param {Vec2} def.localAnchorA The local anchor point relative to bodyA's origin.
 * @param {Vec2} def.localAnchorB The local anchor point relative to bodyB's origin.
 */
function DistanceJoint(def, bodyA, anchorA, bodyB, anchorB) {
    if (!(this instanceof DistanceJoint)) {
        return new DistanceJoint(def, bodyA, anchorA, bodyB, anchorB);
    }
    def = options(def, DistanceJointDef);
    Joint.call(this, def, bodyA, bodyB);
    this.m_type = DistanceJoint.TYPE;
    // Solver shared
    this.m_localAnchorA = def.localAnchorA || bodyA.getLocalPoint(anchorA);
    this.m_localAnchorB = def.localAnchorB || bodyB.getLocalPoint(anchorB);
    this.m_length = Vec2.distance(anchorB, anchorA);
    this.m_frequencyHz = def.frequencyHz;
    this.m_dampingRatio = def.dampingRatio;
    this.m_impulse = 0;
    this.m_gamma = 0;
    this.m_bias = 0;
    // Solver temp
    this.m_u;
    // Vec2
    this.m_rA;
    // Vec2
    this.m_rB;
    // Vec2
    this.m_localCenterA;
    // Vec2
    this.m_localCenterB;
    // Vec2
    this.m_invMassA;
    this.m_invMassB;
    this.m_invIA;
    this.m_invIB;
    this.m_mass;
}

/**
 * The local anchor point relative to bodyA's origin.
 */
DistanceJoint.prototype.getLocalAnchorA = function() {
    return this.m_localAnchorA;
};

/**
 * The local anchor point relative to bodyB's origin.
 */
DistanceJoint.prototype.getLocalAnchorB = function() {
    return this.m_localAnchorB;
};

/**
 * Set/get the natural length. Manipulating the length can lead to non-physical
 * behavior when the frequency is zero.
 */
DistanceJoint.prototype.setLength = function(length) {
    this.m_length = length;
};

DistanceJoint.prototype.getLength = function() {
    return this.m_length;
};

DistanceJoint.prototype.setFrequency = function(hz) {
    this.m_frequencyHz = hz;
};

DistanceJoint.prototype.getFrequency = function() {
    return this.m_frequencyHz;
};

DistanceJoint.prototype.setDampingRatio = function(ratio) {
    this.m_dampingRatio = ratio;
};

DistanceJoint.prototype.getDampingRatio = function() {
    return this.m_dampingRatio;
};

DistanceJoint.prototype.getAnchorA = function() {
    return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
};

DistanceJoint.prototype.getAnchorB = function() {
    return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
};

DistanceJoint.prototype.getReactionForce = function(inv_dt) {
    var F = Vec2.mul(inv_dt * this.m_impulse, this.m_u);
    return F;
};

DistanceJoint.prototype.getReactionTorque = function(inv_dt) {
    return 0;
};

DistanceJoint.prototype.initVelocityConstraints = function(step) {
    this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
    this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
    this.m_invMassA = this.m_bodyA.m_invMass;
    this.m_invMassB = this.m_bodyB.m_invMass;
    this.m_invIA = this.m_bodyA.m_invI;
    this.m_invIB = this.m_bodyB.m_invI;
    var cA = this.m_bodyA.c_position.c;
    var aA = this.m_bodyA.c_position.a;
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var cB = this.m_bodyB.c_position.c;
    var aB = this.m_bodyB.c_position.a;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    var qA = Rot.neo(aA);
    var qB = Rot.neo(aB);
    this.m_rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    this.m_rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    this.m_u = Vec2.sub(Vec2.add(cB, this.m_rB), Vec2.add(cA, this.m_rA));
    // Handle singularity.
    var length = this.m_u.length();
    if (length > Settings.linearSlop) {
        this.m_u.mul(1 / length);
    } else {
        this.m_u.set(0, 0);
    }
    var crAu = Vec2.cross(this.m_rA, this.m_u);
    var crBu = Vec2.cross(this.m_rB, this.m_u);
    var invMass = this.m_invMassA + this.m_invIA * crAu * crAu + this.m_invMassB + this.m_invIB * crBu * crBu;
    // Compute the effective mass matrix.
    this.m_mass = invMass != 0 ? 1 / invMass : 0;
    if (this.m_frequencyHz > 0) {
        var C = length - this.m_length;
        // Frequency
        var omega = 2 * Math.PI * this.m_frequencyHz;
        // Damping coefficient
        var d = 2 * this.m_mass * this.m_dampingRatio * omega;
        // Spring stiffness
        var k = this.m_mass * omega * omega;
        // magic formulas
        var h = step.dt;
        this.m_gamma = h * (d + h * k);
        this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
        this.m_bias = C * h * k * this.m_gamma;
        invMass += this.m_gamma;
        this.m_mass = invMass != 0 ? 1 / invMass : 0;
    } else {
        this.m_gamma = 0;
        this.m_bias = 0;
    }
    if (step.warmStarting) {
        // Scale the impulse to support a variable time step.
        this.m_impulse *= step.dtRatio;
        var P = Vec2.mul(this.m_impulse, this.m_u);
        vA.wSub(this.m_invMassA, P);
        wA -= this.m_invIA * Vec2.cross(this.m_rA, P);
        vB.wAdd(this.m_invMassB, P);
        wB += this.m_invIB * Vec2.cross(this.m_rB, P);
    } else {
        this.m_impulse = 0;
    }
    this.m_bodyA.c_velocity.v.set(vA);
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v.set(vB);
    this.m_bodyB.c_velocity.w = wB;
};

DistanceJoint.prototype.solveVelocityConstraints = function(step) {
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    // Cdot = dot(u, v + cross(w, r))
    var vpA = Vec2.add(vA, Vec2.cross(wA, this.m_rA));
    var vpB = Vec2.add(vB, Vec2.cross(wB, this.m_rB));
    var Cdot = Vec2.dot(this.m_u, vpB) - Vec2.dot(this.m_u, vpA);
    var impulse = -this.m_mass * (Cdot + this.m_bias + this.m_gamma * this.m_impulse);
    this.m_impulse += impulse;
    var P = Vec2.mul(impulse, this.m_u);
    vA.wSub(this.m_invMassA, P);
    wA -= this.m_invIA * Vec2.cross(this.m_rA, P);
    vB.wAdd(this.m_invMassB, P);
    wB += this.m_invIB * Vec2.cross(this.m_rB, P);
    this.m_bodyA.c_velocity.v.set(vA);
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v.set(vB);
    this.m_bodyB.c_velocity.w = wB;
};

DistanceJoint.prototype.solvePositionConstraints = function(step) {
    if (this.m_frequencyHz > 0) {
        // There is no position correction for soft distance constraints.
        return true;
    }
    var cA = this.m_bodyA.c_position.c;
    var aA = this.m_bodyA.c_position.a;
    var cB = this.m_bodyB.c_position.c;
    var aB = this.m_bodyB.c_position.a;
    var qA = Rot.neo(aA);
    var qB = Rot.neo(aB);
    var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
    var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
    var u = Vec2.sub(Vec2.add(cB, rB), Vec2.add(cA, rA));
    var length = u.normalize();
    var C = length - this.m_length;
    C = Math.clamp(C, -Settings.maxLinearCorrection, Settings.maxLinearCorrection);
    var impulse = -this.m_mass * C;
    var P = Vec2.mul(impulse, u);
    cA.wSub(this.m_invMassA, P);
    aA -= this.m_invIA * Vec2.cross(rA, P);
    cB.wAdd(this.m_invMassB, P);
    aB += this.m_invIB * Vec2.cross(rB, P);
    this.m_bodyA.c_position.c.set(cA);
    this.m_bodyA.c_position.a = aA;
    this.m_bodyB.c_position.c.set(cB);
    this.m_bodyB.c_position.a = aB;
    return Math.abs(C) < Settings.linearSlop;
};


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/create":51,"../util/options":52}],28:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = FrictionJoint;

var common = require("../util/common");

var options = require("../util/options");

var create = require("../util/create");

var Settings = require("../Settings");

var Math = require("../common/Math");

var Vec2 = require("../common/Vec2");

var Vec3 = require("../common/Vec3");

var Mat22 = require("../common/Mat22");

var Mat33 = require("../common/Mat33");

var Rot = require("../common/Rot");

var Sweep = require("../common/Sweep");

var Transform = require("../common/Transform");

var Velocity = require("../common/Velocity");

var Position = require("../common/Position");

var Joint = require("../Joint");

FrictionJoint.TYPE = "friction-joint";

FrictionJoint._super = Joint;

FrictionJoint.prototype = create(FrictionJoint._super.prototype);

/**
 * @typedef {Object} FrictionJointDef
 *
 * Friction joint definition.
 * 
 * @prop {float} maxForce The maximum friction force in N.
 * @prop {float} maxTorque The maximum friction torque in N-m.
 */
var FrictionJointDef = {
    maxForce: 0,
    maxTorque: 0
};

/**
 * Friction joint. This is used for top-down friction. It provides 2D
 * translational friction and angular friction.
 * 
 * @prop {Vec2} localAnchorA The local anchor point relative to bodyA's origin.
 * @prop {Vec2} localAnchorB The local anchor point relative to bodyB's origin.
 */
function FrictionJoint(def, bodyA, bodyB, anchor) {
    if (!(this instanceof FrictionJoint)) {
        return new FrictionJoint(def, bodyA, bodyB, anchor);
    }
    def = options(def, FrictionJointDef);
    Joint.call(this, def, bodyA, bodyB);
    this.m_type = FrictionJoint.TYPE;
    if (anchor) {
        this.m_localAnchorA = bodyA.getLocalPoint(anchor);
        this.m_localAnchorB = bodyB.getLocalPoint(anchor);
    } else {
        this.m_localAnchorA = Vec2.zero();
        this.m_localAnchorB = Vec2.zero();
    }
    // Solver shared
    this.m_linearImpulse = Vec2.zero();
    this.m_angularImpulse = 0;
    this.m_maxForce = def.maxForce;
    this.m_maxTorque = def.maxTorque;
    // Solver temp
    this.m_rA;
    // Vec2
    this.m_rB;
    // Vec2
    this.m_localCenterA;
    // Vec2
    this.m_localCenterB;
    // Vec2
    this.m_invMassA;
    // float
    this.m_invMassB;
    // float
    this.m_invIA;
    // float
    this.m_invIB;
    // float
    this.m_linearMass;
    // Mat22
    this.m_angularMass;
}

/**
 * The local anchor point relative to bodyA's origin.
 */
FrictionJoint.prototype.getLocalAnchorA = function() {
    return this.m_localAnchorA;
};

/**
 * The local anchor point relative to bodyB's origin.
 */
FrictionJoint.prototype.getLocalAnchorB = function() {
    return this.m_localAnchorB;
};

/**
 * Set the maximum friction force in N.
 */
FrictionJoint.prototype.setMaxForce = function(force) {
    ASSERT && common.assert(IsValid(force) && force >= 0);
    this.m_maxForce = force;
};

/**
 * Get the maximum friction force in N.
 */
FrictionJoint.prototype.getMaxForce = function() {
    return this.m_maxForce;
};

/**
 * Set the maximum friction torque in N*m.
 */
FrictionJoint.prototype.setMaxTorque = function(torque) {
    ASSERT && common.assert(IsValid(torque) && torque >= 0);
    this.m_maxTorque = torque;
};

/**
 * Get the maximum friction torque in N*m.
 */
FrictionJoint.prototype.getMaxTorque = function() {
    return this.m_maxTorque;
};

FrictionJoint.prototype.getAnchorA = function() {
    return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
};

FrictionJoint.prototype.getAnchorB = function() {
    return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
};

FrictionJoint.prototype.getReactionForce = function(inv_dt) {
    return inv_dt * this.m_linearImpulse;
};

FrictionJoint.prototype.getReactionTorque = function(inv_dt) {
    return inv_dt * this.m_angularImpulse;
};

FrictionJoint.prototype.initVelocityConstraints = function(step) {
    this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
    this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
    this.m_invMassA = this.m_bodyA.m_invMass;
    this.m_invMassB = this.m_bodyB.m_invMass;
    this.m_invIA = this.m_bodyA.m_invI;
    this.m_invIB = this.m_bodyB.m_invI;
    var aA = this.m_bodyA.c_position.a;
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var aB = this.m_bodyB.c_position.a;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    var qA = Rot.neo(aA), qB = Rot.neo(aB);
    // Compute the effective mass matrix.
    this.m_rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    this.m_rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    // J = [-I -r1_skew I r2_skew]
    // [ 0 -1 0 1]
    // r_skew = [-ry; rx]
    // Matlab
    // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
    // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
    // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]
    var mA = this.m_invMassA, mB = this.m_invMassB;
    // float
    var iA = this.m_invIA, iB = this.m_invIB;
    // float
    var K = new Mat22();
    K.ex.x = mA + mB + iA * this.m_rA.y * this.m_rA.y + iB * this.m_rB.y * this.m_rB.y;
    K.ex.y = -iA * this.m_rA.x * this.m_rA.y - iB * this.m_rB.x * this.m_rB.y;
    K.ey.x = K.ex.y;
    K.ey.y = mA + mB + iA * this.m_rA.x * this.m_rA.x + iB * this.m_rB.x * this.m_rB.x;
    this.m_linearMass = K.getInverse();
    this.m_angularMass = iA + iB;
    if (this.m_angularMass > 0) {
        this.m_angularMass = 1 / this.m_angularMass;
    }
    if (step.warmStarting) {
        // Scale impulses to support a variable time step.
        this.m_linearImpulse.mul(step.dtRatio);
        this.m_angularImpulse *= step.dtRatio;
        var P = Vec2.neo(this.m_linearImpulse.x, this.m_linearImpulse.y);
        vA.wSub(mA, P);
        wA -= iA * (Vec2.cross(this.m_rA, P) + this.m_angularImpulse);
        vB.wAdd(mB, P);
        wB += iB * (Vec2.cross(this.m_rB, P) + this.m_angularImpulse);
    } else {
        this.m_linearImpulse.setZero();
        this.m_angularImpulse = 0;
    }
    this.m_bodyA.c_velocity.v = vA;
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v = vB;
    this.m_bodyB.c_velocity.w = wB;
};

FrictionJoint.prototype.solveVelocityConstraints = function(step) {
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    var mA = this.m_invMassA, mB = this.m_invMassB;
    // float
    var iA = this.m_invIA, iB = this.m_invIB;
    // float
    var h = step.dt;
    // float
    // Solve angular friction
    {
        var Cdot = wB - wA;
        // float
        var impulse = -this.m_angularMass * Cdot;
        // float
        var oldImpulse = this.m_angularImpulse;
        // float
        var maxImpulse = h * this.m_maxTorque;
        // float
        this.m_angularImpulse = Math.clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
        impulse = this.m_angularImpulse - oldImpulse;
        wA -= iA * impulse;
        wB += iB * impulse;
    }
    // Solve linear friction
    {
        var Cdot = Vec2.sub(Vec2.add(vB, Vec2.cross(wB, this.m_rB)), Vec2.add(vA, Vec2.cross(wA, this.m_rA)));
        // Vec2
        var impulse = Vec2.neg(Mat22.mul(this.m_linearMass, Cdot));
        // Vec2
        var oldImpulse = this.m_linearImpulse;
        // Vec2
        this.m_linearImpulse.add(impulse);
        var maxImpulse = h * this.m_maxForce;
        // float
        if (this.m_linearImpulse.lengthSquared() > maxImpulse * maxImpulse) {
            this.m_linearImpulse.normalize();
            this.m_linearImpulse.mul(maxImpulse);
        }
        impulse = Vec2.sub(this.m_linearImpulse, oldImpulse);
        vA.wSub(mA, impulse);
        wA -= iA * Vec2.cross(this.m_rA, impulse);
        vB.wAdd(mB, impulse);
        wB += iB * Vec2.cross(this.m_rB, impulse);
    }
    this.m_bodyA.c_velocity.v = vA;
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v = vB;
    this.m_bodyB.c_velocity.w = wB;
};

FrictionJoint.prototype.solvePositionConstraints = function(step) {
    return true;
};


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],29:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = GearJoint;

var common = require("../util/common");

var options = require("../util/options");

var create = require("../util/create");

var Settings = require("../Settings");

var Math = require("../common/Math");

var Vec2 = require("../common/Vec2");

var Vec3 = require("../common/Vec3");

var Mat22 = require("../common/Mat22");

var Mat33 = require("../common/Mat33");

var Rot = require("../common/Rot");

var Sweep = require("../common/Sweep");

var Transform = require("../common/Transform");

var Velocity = require("../common/Velocity");

var Position = require("../common/Position");

var Joint = require("../Joint");

var RevoluteJoint = require("./RevoluteJoint");

var PrismaticJoint = require("./PrismaticJoint");

GearJoint.TYPE = "gear-joint";

GearJoint._super = Joint;

GearJoint.prototype = create(GearJoint._super.prototype);

/**
 * @typedef {Object} GearJointDef
 *
 * Gear joint definition.
 * 
 * @prop {float} ratio The gear ratio. See GearJoint for explanation.
 */
var GearJointDef = {
    ratio: 1
};

/**
 * A gear joint is used to connect two joints together. Either joint can be a
 * revolute or prismatic joint. You specify a gear ratio to bind the motions
 * together: coordinate1 + ratio * coordinate2 = constant
 * 
 * The ratio can be negative or positive. If one joint is a revolute joint and
 * the other joint is a prismatic joint, then the ratio will have units of
 * length or units of 1/length. Warning: You have to manually destroy the gear
 * joint if joint1 or joint2 is destroyed.
 * 
 * This definition requires two existing revolute or prismatic joints (any
 * combination will work).
 * 
 * @param {RevoluteJoint|PrismaticJoint} joint1 The first revolute/prismatic
 *          joint attached to the gear joint.
 * @param {PrismaticJoint|RevoluteJoint} joint2 The second prismatic/revolute
 *          joint attached to the gear joint.
 */
function GearJoint(def, bodyA, bodyB, joint1, joint2, ratio) {
    if (!(this instanceof GearJoint)) {
        return new GearJoint(def, bodyA, bodyB, joint1, joint2, ratio);
    }
    def = options(def, GearJointDef);
    Joint.call(this, def, bodyA, bodyB);
    this.m_type = GearJoint.TYPE;
    ASSERT && common.assert(joint1.m_type == RevoluteJoint.TYPE || joint1.m_type == PrismaticJoint.TYPE);
    ASSERT && common.assert(joint2.m_type == RevoluteJoint.TYPE || joint2.m_type == PrismaticJoint.TYPE);
    this.m_joint1 = joint1;
    this.m_joint2 = joint2;
    this.m_type1 = this.m_joint1.getType();
    this.m_type2 = this.m_joint2.getType();
    // joint1 connects body A to body C
    // joint2 connects body B to body D
    var coordinateA, coordinateB;
    // float
    // TODO_ERIN there might be some problem with the joint edges in Joint.
    this.m_bodyC = this.m_joint1.getBodyA();
    this.m_bodyA = this.m_joint1.getBodyB();
    // Get geometry of joint1
    var xfA = this.m_bodyA.m_xf;
    var aA = this.m_bodyA.m_sweep.a;
    var xfC = this.m_bodyC.m_xf;
    var aC = this.m_bodyC.m_sweep.a;
    if (this.m_type1 == RevoluteJoint.TYPE) {
        var revolute = joint1;
        // RevoluteJoint
        this.m_localAnchorC = revolute.m_localAnchorA;
        this.m_localAnchorA = revolute.m_localAnchorB;
        this.m_referenceAngleA = revolute.m_referenceAngle;
        this.m_localAxisC = Vec2.zero();
        coordinateA = aA - aC - this.m_referenceAngleA;
    } else {
        var prismatic = joint1;
        // PrismaticJoint
        this.m_localAnchorC = prismatic.m_localAnchorA;
        this.m_localAnchorA = prismatic.m_localAnchorB;
        this.m_referenceAngleA = prismatic.m_referenceAngle;
        this.m_localAxisC = prismatic.m_localXAxisA;
        var pC = this.m_localAnchorC;
        var pA = Rot.mulT(xfC.q, Vec2.add(Rot.mul(xfA.q, this.m_localAnchorA), Vec2.sub(xfA.p, xfC.p)));
        coordinateA = Vec2.dot(pA, this.m_localAxisC) - Vec2.dot(pC, this.m_localAxisC);
    }
    this.m_bodyD = this.m_joint2.getBodyA();
    this.m_bodyB = this.m_joint2.getBodyB();
    // Get geometry of joint2
    var xfB = this.m_bodyB.m_xf;
    var aB = this.m_bodyB.m_sweep.a;
    var xfD = this.m_bodyD.m_xf;
    var aD = this.m_bodyD.m_sweep.a;
    if (this.m_type2 == RevoluteJoint.TYPE) {
        var revolute = joint2;
        // RevoluteJoint
        this.m_localAnchorD = revolute.m_localAnchorA;
        this.m_localAnchorB = revolute.m_localAnchorB;
        this.m_referenceAngleB = revolute.m_referenceAngle;
        this.m_localAxisD = Vec2.zero();
        coordinateB = aB - aD - this.m_referenceAngleB;
    } else {
        var prismatic = joint2;
        // PrismaticJoint
        this.m_localAnchorD = prismatic.m_localAnchorA;
        this.m_localAnchorB = prismatic.m_localAnchorB;
        this.m_referenceAngleB = prismatic.m_referenceAngle;
        this.m_localAxisD = prismatic.m_localXAxisA;
        var pD = this.m_localAnchorD;
        var pB = Rot.mulT(xfD.q, Vec2.add(Rot.mul(xfB.q, this.m_localAnchorB), Vec2.sub(xfB.p, xfD.p)));
        coordinateB = Vec2.dot(pB, this.m_localAxisD) - Vec2.dot(pD, this.m_localAxisD);
    }
    this.m_ratio = ratio || def.ratio;
    this.m_constant = coordinateA + this.m_ratio * coordinateB;
    this.m_impulse = 0;
    // Solver temp
    this.m_lcA, this.m_lcB, this.m_lcC, this.m_lcD;
    // Vec2
    this.m_mA, this.m_mB, this.m_mC, this.m_mD;
    // float
    this.m_iA, this.m_iB, this.m_iC, this.m_iD;
    // float
    this.m_JvAC, this.m_JvBD;
    // Vec2
    this.m_JwA, this.m_JwB, this.m_JwC, this.m_JwD;
    // float
    this.m_mass;
}

/**
 * Get the first joint.
 */
GearJoint.prototype.getJoint1 = function() {
    return this.m_joint1;
};

/**
 * Get the second joint.
 */
GearJoint.prototype.getJoint2 = function() {
    return this.m_joint2;
};

/**
 * Set/Get the gear ratio.
 */
GearJoint.prototype.setRatio = function(ratio) {
    ASSERT && common.assert(IsValid(ratio));
    this.m_ratio = ratio;
};

GearJoint.prototype.setRatio = function() {
    return this.m_ratio;
};

GearJoint.prototype.getAnchorA = function() {
    return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
};

GearJoint.prototype.getAnchorB = function() {
    return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
};

GearJoint.prototype.getReactionForce = function(inv_dt) {
    var P = this.m_impulse * this.m_JvAC;
    // Vec2
    return inv_dt * P;
};

GearJoint.prototype.getReactionTorque = function(inv_dt) {
    var L = this.m_impulse * this.m_JwA;
    // float
    return inv_dt * L;
};

GearJoint.prototype.initVelocityConstraints = function(step) {
    this.m_lcA = this.m_bodyA.m_sweep.localCenter;
    this.m_lcB = this.m_bodyB.m_sweep.localCenter;
    this.m_lcC = this.m_bodyC.m_sweep.localCenter;
    this.m_lcD = this.m_bodyD.m_sweep.localCenter;
    this.m_mA = this.m_bodyA.m_invMass;
    this.m_mB = this.m_bodyB.m_invMass;
    this.m_mC = this.m_bodyC.m_invMass;
    this.m_mD = this.m_bodyD.m_invMass;
    this.m_iA = this.m_bodyA.m_invI;
    this.m_iB = this.m_bodyB.m_invI;
    this.m_iC = this.m_bodyC.m_invI;
    this.m_iD = this.m_bodyD.m_invI;
    var aA = this.m_bodyA.c_position.a;
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var aB = this.m_bodyB.c_position.a;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    var aC = this.m_bodyC.c_position.a;
    var vC = this.m_bodyC.c_velocity.v;
    var wC = this.m_bodyC.c_velocity.w;
    var aD = this.m_bodyD.c_position.a;
    var vD = this.m_bodyD.c_velocity.v;
    var wD = this.m_bodyD.c_velocity.w;
    var qA = Rot.neo(aA);
    var qB = Rot.neo(aB);
    var qC = Rot.neo(aC);
    var qD = Rot.neo(aD);
    this.m_mass = 0;
    if (this.m_type1 == RevoluteJoint.TYPE) {
        this.m_JvAC = Vec2.zero();
        this.m_JwA = 1;
        this.m_JwC = 1;
        this.m_mass += this.m_iA + this.m_iC;
    } else {
        var u = Rot.mul(qC, this.m_localAxisC);
        // Vec2
        var rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC);
        // Vec2
        var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA);
        // Vec2
        this.m_JvAC = u;
        this.m_JwC = Vec2.cross(rC, u);
        this.m_JwA = Vec2.cross(rA, u);
        this.m_mass += this.m_mC + this.m_mA + this.m_iC * this.m_JwC * this.m_JwC + this.m_iA * this.m_JwA * this.m_JwA;
    }
    if (this.m_type2 == RevoluteJoint.TYPE) {
        this.m_JvBD = Vec2.zero();
        this.m_JwB = this.m_ratio;
        this.m_JwD = this.m_ratio;
        this.m_mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
    } else {
        var u = Rot.mul(qD, this.m_localAxisD);
        // Vec2
        var rD = Rot.mulSub(qD, this.m_localAnchorD, this.m_lcD);
        // Vec2
        var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_lcB);
        // Vec2
        this.m_JvBD = Vec2.mul(this.m_ratio, u);
        this.m_JwD = this.m_ratio * Vec2.cross(rD, u);
        this.m_JwB = this.m_ratio * Vec2.cross(rB, u);
        this.m_mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * this.m_JwD * this.m_JwD + this.m_iB * this.m_JwB * this.m_JwB;
    }
    // Compute effective mass.
    this.m_mass = this.m_mass > 0 ? 1 / this.m_mass : 0;
    if (step.warmStarting) {
        vA.wAdd(this.m_mA * this.m_impulse, this.m_JvAC);
        wA += this.m_iA * this.m_impulse * this.m_JwA;
        vB.wAdd(this.m_mB * this.m_impulse, this.m_JvBD);
        wB += this.m_iB * this.m_impulse * this.m_JwB;
        vC.wSub(this.m_mC * this.m_impulse, this.m_JvAC);
        wC -= this.m_iC * this.m_impulse * this.m_JwC;
        vD.wSub(this.m_mD * this.m_impulse, this.m_JvBD);
        wD -= this.m_iD * this.m_impulse * this.m_JwD;
    } else {
        this.m_impulse = 0;
    }
    this.m_bodyA.c_velocity.v.set(vA);
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v.set(vB);
    this.m_bodyB.c_velocity.w = wB;
    this.m_bodyC.c_velocity.v.set(vC);
    this.m_bodyC.c_velocity.w = wC;
    this.m_bodyD.c_velocity.v.set(vD);
    this.m_bodyD.c_velocity.w = wD;
};

GearJoint.prototype.solveVelocityConstraints = function(step) {
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    var vC = this.m_bodyC.c_velocity.v;
    var wC = this.m_bodyC.c_velocity.w;
    var vD = this.m_bodyD.c_velocity.v;
    var wD = this.m_bodyD.c_velocity.w;
    var Cdot = Vec2.dot(this.m_JvAC, vA) - Vec2.dot(this.m_JvAC, vC) + Vec2.dot(this.m_JvBD, vB) - Vec2.dot(this.m_JvBD, vD);
    // float
    Cdot += this.m_JwA * wA - this.m_JwC * wC + (this.m_JwB * wB - this.m_JwD * wD);
    var impulse = -this.m_mass * Cdot;
    // float
    this.m_impulse += impulse;
    vA.wAdd(this.m_mA * impulse, this.m_JvAC);
    wA += this.m_iA * impulse * this.m_JwA;
    vB.wAdd(this.m_mB * impulse, this.m_JvBD);
    wB += this.m_iB * impulse * this.m_JwB;
    vC.wSub(this.m_mC * impulse, this.m_JvAC);
    wC -= this.m_iC * impulse * this.m_JwC;
    vD.wSub(this.m_mD * impulse, this.m_JvBD);
    wD -= this.m_iD * impulse * this.m_JwD;
    this.m_bodyA.c_velocity.v.set(vA);
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v.set(vB);
    this.m_bodyB.c_velocity.w = wB;
    this.m_bodyC.c_velocity.v.set(vC);
    this.m_bodyC.c_velocity.w = wC;
    this.m_bodyD.c_velocity.v.set(vD);
    this.m_bodyD.c_velocity.w = wD;
};

GearJoint.prototype.solvePositionConstraints = function(step) {
    var cA = this.m_bodyA.c_position.c;
    var aA = this.m_bodyA.c_position.a;
    var cB = this.m_bodyB.c_position.c;
    var aB = this.m_bodyB.c_position.a;
    var cC = this.m_bodyC.c_position.c;
    var aC = this.m_bodyC.c_position.a;
    var cD = this.m_bodyD.c_position.c;
    var aD = this.m_bodyD.c_position.a;
    var qA = Rot.neo(aA);
    var qB = Rot.neo(aB);
    var qC = Rot.neo(aC);
    var qD = Rot.neo(aD);
    var linearError = 0;
    // float
    var coordinateA, coordinateB;
    // float
    var JvAC, JvBD;
    // Vec2
    var JwA, JwB, JwC, JwD;
    // float
    var mass = 0;
    // float
    if (this.m_type1 == RevoluteJoint.TYPE) {
        JvAC = Vec2.zero();
        JwA = 1;
        JwC = 1;
        mass += this.m_iA + this.m_iC;
        coordinateA = aA - aC - this.m_referenceAngleA;
    } else {
        var u = Rot.mul(qC, this.m_localAxisC);
        // Vec2
        var rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC);
        // Vec2
        var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA);
        // Vec2
        JvAC = u;
        JwC = Vec2.cross(rC, u);
        JwA = Vec2.cross(rA, u);
        mass += this.m_mC + this.m_mA + this.m_iC * JwC * JwC + this.m_iA * JwA * JwA;
        var pC = this.m_localAnchorC - this.m_lcC;
        // Vec2
        var pA = Rot.mulT(qC, Vec2.add(rA, Vec2.sub(cA, cC)));
        // Vec2
        coordinateA = Dot(pA - pC, this.m_localAxisC);
    }
    if (this.m_type2 == RevoluteJoint.TYPE) {
        JvBD = Vec2.zero();
        JwB = this.m_ratio;
        JwD = this.m_ratio;
        mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
        coordinateB = aB - aD - this.m_referenceAngleB;
    } else {
        var u = Rot.mul(qD, this.m_localAxisD);
        var rD = Rot.mulSub(qD, this.m_localAnchorD, this.m_lcD);
        var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_lcB);
        JvBD = Vec2.mul(this.m_ratio, u);
        JwD = this.m_ratio * Vec2.cross(rD, u);
        JwB = this.m_ratio * Vec2.cross(rB, u);
        mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * JwD * JwD + this.m_iB * JwB * JwB;
        var pD = Vec2.sub(this.m_localAnchorD, this.m_lcD);
        // Vec2
        var pB = Rot.mulT(qD, Vec2.add(rB, Vec2.sub(cB, cD)));
        // Vec2
        coordinateB = Vec2.dot(pB, this.m_localAxisD) - Vec2.dot(pD, this.m_localAxisD);
    }
    var C = coordinateA + this.m_ratio * coordinateB - this.m_constant;
    // float
    var impulse = 0;
    // float
    if (mass > 0) {
        impulse = -C / mass;
    }
    cA.wAdd(this.m_mA * impulse, JvAC);
    aA += this.m_iA * impulse * JwA;
    cB.wAdd(this.m_mB * impulse, JvBD);
    aB += this.m_iB * impulse * JwB;
    cC.wAdd(this.m_mC * impulse, JvAC);
    aC -= this.m_iC * impulse * JwC;
    cD.wAdd(this.m_mD * impulse, JvBD);
    aD -= this.m_iD * impulse * JwD;
    this.m_bodyA.c_position.c.set(cA);
    this.m_bodyA.c_position.a = aA;
    this.m_bodyB.c_position.c.set(cB);
    this.m_bodyB.c_position.a = aB;
    this.m_bodyC.c_position.c.set(cC);
    this.m_bodyC.c_position.a = aC;
    this.m_bodyD.c_position.c.set(cD);
    this.m_bodyD.c_position.a = aD;
    // TODO_ERIN not implemented
    return linearError < Settings.linearSlop;
};


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52,"./PrismaticJoint":32,"./RevoluteJoint":34}],30:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = MotorJoint;

var common = require("../util/common");

var options = require("../util/options");

var create = require("../util/create");

var Settings = require("../Settings");

var Math = require("../common/Math");

var Vec2 = require("../common/Vec2");

var Vec3 = require("../common/Vec3");

var Mat22 = require("../common/Mat22");

var Mat33 = require("../common/Mat33");

var Rot = require("../common/Rot");

var Sweep = require("../common/Sweep");

var Transform = require("../common/Transform");

var Velocity = require("../common/Velocity");

var Position = require("../common/Position");

var Joint = require("../Joint");

MotorJoint.TYPE = "motor-joint";

MotorJoint._super = Joint;

MotorJoint.prototype = create(MotorJoint._super.prototype);

/**
 * @typedef {Object} MotorJointDef
 *
 * Motor joint definition.
 * 
 * @prop {float} angularOffset The bodyB angle minus bodyA angle in radians.
 * @prop {float} maxForce The maximum motor force in N.
 * @prop {float} maxTorque The maximum motor torque in N-m.
 * @prop {float} correctionFactor Position correction factor in the range [0,1].
 */
var MotorJointDef = {
    maxForce: 1,
    maxTorque: 1,
    correctionFactor: .3
};

/**
 * A motor joint is used to control the relative motion between two bodies. A
 * typical usage is to control the movement of a dynamic body with respect to
 * the ground.
 * 
 * @prop {Vec2} linearOffset Position of bodyB minus the position of bodyA, in
 *       bodyA's frame, in meters.
 */
function MotorJoint(def, bodyA, bodyB) {
    if (!(this instanceof MotorJoint)) {
        return new MotorJoint(def, bodyA, bodyB);
    }
    def = options(def, MotorJointDef);
    Joint.call(this, def, bodyA, bodyB);
    this.m_type = MotorJoint.TYPE;
    var xB = bodyB.getPosition();
    this.m_linearOffset = bodyA.getLocalPoint(xB);
    var angleA = bodyA.getAngle();
    var angleB = bodyB.getAngle();
    this.m_angularOffset = angleB - angleA;
    this.m_linearImpulse = Vec2.zero();
    this.m_angularImpulse = 0;
    this.m_maxForce = def.maxForce;
    this.m_maxTorque = def.maxTorque;
    this.m_correctionFactor = def.correctionFactor;
    // Solver temp
    this.m_rA;
    // Vec2
    this.m_rB;
    // Vec2
    this.m_localCenterA;
    // Vec2
    this.m_localCenterB;
    // Vec2
    this.m_linearError;
    // Vec2
    this.m_angularError;
    // float
    this.m_invMassA;
    // float
    this.m_invMassB;
    // float
    this.m_invIA;
    // float
    this.m_invIB;
    // float
    this.m_linearMass;
    // Mat22
    this.m_angularMass;
}

/**
 * Set the maximum friction force in N.
 */
MotorJoint.prototype.setMaxForce = function(force) {
    ASSERT && common.assert(IsValid(force) && force >= 0);
    this.m_maxForce = force;
};

/**
 * Get the maximum friction force in N.
 */
MotorJoint.prototype.getMaxForce = function() {
    return this.m_maxForce;
};

/**
 * Set the maximum friction torque in N*m.
 */
MotorJoint.prototype.setMaxTorque = function(torque) {
    ASSERT && common.assert(IsValid(torque) && torque >= 0);
    this.m_maxTorque = torque;
};

/**
 * Get the maximum friction torque in N*m.
 */
MotorJoint.prototype.getMaxTorque = function() {
    return this.m_maxTorque;
};

/**
 * Set the position correction factor in the range [0,1].
 */
MotorJoint.prototype.setCorrectionFactor = function(factor) {
    ASSERT && common.assert(IsValid(factor) && 0 <= factor && factor <= 1);
    this.m_correctionFactor = factor;
};

/**
 * Get the position correction factor in the range [0,1].
 */
MotorJoint.prototype.getCorrectionFactor = function() {
    return this.m_correctionFactor;
};

/**
 * Set/get the target linear offset, in frame A, in meters.
 */
MotorJoint.prototype.setLinearOffset = function(/* Vec2& */ linearOffset) {
    if (linearOffset.x != this.m_linearOffset.x || linearOffset.y != this.m_linearOffset.y) {
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_linearOffset = linearOffset;
    }
};

MotorJoint.prototype.getLinearOffset = function() {
    return this.m_linearOffset;
};

/**
 * Set/get the target angular offset, in radians.
 */
MotorJoint.prototype.setAngularOffset = function(angularOffset) {
    if (angularOffset != this.m_angularOffset) {
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_angularOffset = angularOffset;
    }
};

MotorJoint.prototype.getAngularOffset = function() {
    return this.m_angularOffset;
};

MotorJoint.prototype.getAnchorA = function() {
    return this.m_bodyA.getPosition();
};

MotorJoint.prototype.getAnchorB = function() {
    return this.m_bodyB.getPosition();
};

MotorJoint.prototype.getReactionForce = function(inv_dt) {
    return inv_dt * this.m_linearImpulse;
};

MotorJoint.prototype.getReactionTorque = function(inv_dt) {
    return inv_dt * this.m_angularImpulse;
};

MotorJoint.prototype.initVelocityConstraints = function(step) {
    this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
    this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
    this.m_invMassA = this.m_bodyA.m_invMass;
    this.m_invMassB = this.m_bodyB.m_invMass;
    this.m_invIA = this.m_bodyA.m_invI;
    this.m_invIB = this.m_bodyB.m_invI;
    var cA = this.m_bodyA.c_position.c;
    var aA = this.m_bodyA.c_position.a;
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var cB = this.m_bodyB.c_position.c;
    var aB = this.m_bodyB.c_position.a;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    var qA = Rot.neo(aA), qB = Rot.neo(aB);
    // Compute the effective mass matrix.
    this.m_rA = Rot.mul(qA, Vec2.neg(this.m_localCenterA));
    this.m_rB = Rot.mul(qB, Vec2.neg(this.m_localCenterB));
    // J = [-I -r1_skew I r2_skew]
    // [ 0 -1 0 1]
    // r_skew = [-ry; rx]
    // Matlab
    // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
    // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
    // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]
    var mA = this.m_invMassA;
    var mB = this.m_invMassB;
    var iA = this.m_invIA;
    var iB = this.m_invIB;
    var K = new Mat22();
    K.ex.x = mA + mB + iA * this.m_rA.y * this.m_rA.y + iB * this.m_rB.y * this.m_rB.y;
    K.ex.y = -iA * this.m_rA.x * this.m_rA.y - iB * this.m_rB.x * this.m_rB.y;
    K.ey.x = K.ex.y;
    K.ey.y = mA + mB + iA * this.m_rA.x * this.m_rA.x + iB * this.m_rB.x * this.m_rB.x;
    this.m_linearMass = K.getInverse();
    this.m_angularMass = iA + iB;
    if (this.m_angularMass > 0) {
        this.m_angularMass = 1 / this.m_angularMass;
    }
    this.m_linearError = Vec2.zero();
    this.m_linearError.wAdd(1, cB, 1, this.m_rB);
    this.m_linearError.wSub(1, cA, 1, this.m_rA);
    this.m_linearError.sub(Rot.mul(qA, this.m_linearOffset));
    this.m_angularError = aB - aA - this.m_angularOffset;
    if (step.warmStarting) {
        // Scale impulses to support a variable time step.
        this.m_linearImpulse.mul(step.dtRatio);
        this.m_angularImpulse *= step.dtRatio;
        var P = Vec2.neo(this.m_linearImpulse.x, this.m_linearImpulse.y);
        vA.wSub(mA, P);
        wA -= iA * (Vec2.cross(this.m_rA, P) + this.m_angularImpulse);
        vB.wAdd(mB, P);
        wB += iB * (Vec2.cross(this.m_rB, P) + this.m_angularImpulse);
    } else {
        this.m_linearImpulse.setZero();
        this.m_angularImpulse = 0;
    }
    this.m_bodyA.c_velocity.v = vA;
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v = vB;
    this.m_bodyB.c_velocity.w = wB;
};

MotorJoint.prototype.solveVelocityConstraints = function(step) {
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    var mA = this.m_invMassA, mB = this.m_invMassB;
    var iA = this.m_invIA, iB = this.m_invIB;
    var h = step.dt;
    var inv_h = step.inv_dt;
    // Solve angular friction
    {
        var Cdot = wB - wA + inv_h * this.m_correctionFactor * this.m_angularError;
        var impulse = -this.m_angularMass * Cdot;
        var oldImpulse = this.m_angularImpulse;
        var maxImpulse = h * this.m_maxTorque;
        this.m_angularImpulse = Math.clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
        impulse = this.m_angularImpulse - oldImpulse;
        wA -= iA * impulse;
        wB += iB * impulse;
    }
    // Solve linear friction
    {
        var Cdot = Vec2.zero();
        Cdot.wAdd(1, vB, 1, Vec2.cross(wB, this.m_rB));
        Cdot.wSub(1, vA, 1, Vec2.cross(wA, this.m_rA));
        Cdot.wAdd(inv_h * this.m_correctionFactor, this.m_linearError);
        var impulse = Vec2.neg(Mat22.mul(this.m_linearMass, Cdot));
        var oldImpulse = Vec2.clone(this.m_linearImpulse);
        this.m_linearImpulse.add(impulse);
        var maxImpulse = h * this.m_maxForce;
        this.m_linearImpulse.clamp(maxImpulse);
        impulse = Vec2.sub(this.m_linearImpulse, oldImpulse);
        vA.wSub(mA, impulse);
        wA -= iA * Vec2.cross(this.m_rA, impulse);
        vB.wAdd(mB, impulse);
        wB += iB * Vec2.cross(this.m_rB, impulse);
    }
    this.m_bodyA.c_velocity.v = vA;
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v = vB;
    this.m_bodyB.c_velocity.w = wB;
};

MotorJoint.prototype.solvePositionConstraints = function(step) {
    return true;
};


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],31:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = MouseJoint;

var common = require("../util/common");

var options = require("../util/options");

var create = require("../util/create");

var Math = require("../common/Math");

var Vec2 = require("../common/Vec2");

var Vec3 = require("../common/Vec3");

var Mat22 = require("../common/Mat22");

var Mat33 = require("../common/Mat33");

var Rot = require("../common/Rot");

var Sweep = require("../common/Sweep");

var Transform = require("../common/Transform");

var Velocity = require("../common/Velocity");

var Position = require("../common/Position");

var Joint = require("../Joint");

MouseJoint.TYPE = "mouse-joint";

MouseJoint._super = Joint;

MouseJoint.prototype = create(MouseJoint._super.prototype);

/**
 * @typedef {Object} MouseJointDef
 *
 * Mouse joint definition. This requires a world target point, tuning
 * parameters, and the time step.
 * 
 * @prop [maxForce = 0.0] The maximum constraint force that can be exerted to
 *       move the candidate body. Usually you will express as some multiple of
 *       the weight (multiplier * mass * gravity).
 * @prop [frequencyHz = 5.0] The response speed.
 * @prop [dampingRatio = 0.7] The damping ratio. 0 = no damping, 1 = critical
 *       damping.
 */
var MouseJointDef = {
    maxForce: 0,
    frequencyHz: 5,
    dampingRatio: .7
};

/**
 * A mouse joint is used to make a point on a body track a specified world
 * point. This a soft constraint with a maximum force. This allows the
 * constraint to stretch and without applying huge forces.
 * 
 * NOTE: this joint is not documented in the manual because it was developed to
 * be used in the testbed. If you want to learn how to use the mouse joint, look
 * at the testbed.
 * 
 * @prop {Vec2} target The initial world target point. This is assumed to
 *       coincide with the body anchor initially.
 */
function MouseJoint(def, bodyA, bodyB, target) {
    if (!(this instanceof MouseJoint)) {
        return new MouseJoint(def, bodyA, bodyB, target);
    }
    def = options(def, MouseJointDef);
    Joint.call(this, def, bodyA, bodyB);
    this.m_type = MouseJoint.TYPE;
    ASSERT && common.assert(Math.isFinite(def.maxForce) && def.maxForce >= 0);
    ASSERT && common.assert(Math.isFinite(def.frequencyHz) && def.frequencyHz >= 0);
    ASSERT && common.assert(Math.isFinite(def.dampingRatio) && def.dampingRatio >= 0);
    this.m_targetA = Vec2.clone(target);
    this.m_localAnchorB = Transform.mulT(this.m_bodyB.getTransform(), this.m_targetA);
    this.m_maxForce = def.maxForce;
    this.m_impulse = Vec2.zero();
    this.m_frequencyHz = def.frequencyHz;
    this.m_dampingRatio = def.dampingRatio;
    this.m_beta = 0;
    this.m_gamma = 0;
    // Solver temp
    this.m_rB = Vec2.zero();
    this.m_localCenterB = Vec2.zero();
    this.m_invMassB = 0;
    this.m_invIB = 0;
    this.mass = new Mat22();
    this.m_C = Vec2.zero();
}

/**
 * Use this to update the target point.
 */
MouseJoint.prototype.setTarget = function(target) {
    if (this.m_bodyB.isAwake() == false) {
        this.m_bodyB.setAwake(true);
    }
    this.m_targetA = Vec2.clone(target);
};

MouseJoint.prototype.getTarget = function() {
    return this.m_targetA;
};

/**
 * Set/get the maximum force in Newtons.
 */
MouseJoint.prototype.setMaxForce = function(force) {
    this.m_maxForce = force;
};

MouseJoint.getMaxForce = function() {
    return this.m_maxForce;
};

/**
 * Set/get the frequency in Hertz.
 */
MouseJoint.prototype.setFrequency = function(hz) {
    this.m_frequencyHz = hz;
};

MouseJoint.prototype.getFrequency = function() {
    return this.m_frequencyHz;
};

/**
 * Set/get the damping ratio (dimensionless).
 */
MouseJoint.prototype.setDampingRatio = function(ratio) {
    this.m_dampingRatio = ratio;
};

MouseJoint.prototype.getDampingRatio = function() {
    return this.m_dampingRatio;
};

MouseJoint.prototype.getAnchorA = function() {
    return Vec2.clone(this.m_targetA);
};

MouseJoint.prototype.getAnchorB = function() {
    return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
};

MouseJoint.prototype.getReactionForce = function(inv_dt) {
    return Vec2.mul(inv_dt, this.m_impulse);
};

MouseJoint.prototype.getReactionTorque = function(inv_dt) {
    return inv_dt * 0;
};

MouseJoint.prototype.shiftOrigin = function(newOrigin) {
    this.m_targetA.sub(newOrigin);
};

MouseJoint.prototype.initVelocityConstraints = function(step) {
    this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
    this.m_invMassB = this.m_bodyB.m_invMass;
    this.m_invIB = this.m_bodyB.m_invI;
    var position = this.m_bodyB.c_position;
    var velocity = this.m_bodyB.c_velocity;
    var cB = position.c;
    var aB = position.a;
    var vB = velocity.v;
    var wB = velocity.w;
    var qB = Rot.neo(aB);
    var mass = this.m_bodyB.getMass();
    // Frequency
    var omega = 2 * Math.PI * this.m_frequencyHz;
    // Damping coefficient
    var d = 2 * mass * this.m_dampingRatio * omega;
    // Spring stiffness
    var k = mass * (omega * omega);
    // magic formulas
    // gamma has units of inverse mass.
    // beta has units of inverse time.
    var h = step.dt;
    ASSERT && common.assert(d + h * k > Math.EPSILON);
    this.m_gamma = h * (d + h * k);
    if (this.m_gamma != 0) {
        this.m_gamma = 1 / this.m_gamma;
    }
    this.m_beta = h * k * this.m_gamma;
    // Compute the effective mass matrix.
    this.m_rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    // K = [(1/m1 + 1/m2) * eye(2) - skew(r1) * invI1 * skew(r1) - skew(r2) *
    // invI2 * skew(r2)]
    // = [1/m1+1/m2 0 ] + invI1 * [r1.y*r1.y -r1.x*r1.y] + invI2 * [r1.y*r1.y
    // -r1.x*r1.y]
    // [ 0 1/m1+1/m2] [-r1.x*r1.y r1.x*r1.x] [-r1.x*r1.y r1.x*r1.x]
    var K = new Mat22();
    K.ex.x = this.m_invMassB + this.m_invIB * this.m_rB.y * this.m_rB.y + this.m_gamma;
    K.ex.y = -this.m_invIB * this.m_rB.x * this.m_rB.y;
    K.ey.x = K.ex.y;
    K.ey.y = this.m_invMassB + this.m_invIB * this.m_rB.x * this.m_rB.x + this.m_gamma;
    this.m_mass = K.getInverse();
    this.m_C.set(cB);
    this.m_C.wAdd(1, this.m_rB, -1, this.m_targetA);
    this.m_C.mul(this.m_beta);
    // Cheat with some damping
    wB *= .98;
    if (step.warmStarting) {
        this.m_impulse.mul(step.dtRatio);
        vB.wAdd(this.m_invMassB, this.m_impulse);
        wB += this.m_invIB * Vec2.cross(this.m_rB, this.m_impulse);
    } else {
        this.m_impulse.setZero();
    }
    velocity.v.set(vB);
    velocity.w = wB;
};

MouseJoint.prototype.solveVelocityConstraints = function(step) {
    var velocity = this.m_bodyB.c_velocity;
    var vB = Vec2.clone(velocity.v);
    var wB = velocity.w;
    // Cdot = v + cross(w, r)
    var Cdot = Vec2.cross(wB, this.m_rB);
    Cdot.add(vB);
    Cdot.wAdd(1, this.m_C, this.m_gamma, this.m_impulse);
    Cdot.neg();
    var impulse = Mat22.mul(this.m_mass, Cdot);
    var oldImpulse = Vec2.clone(this.m_impulse);
    this.m_impulse.add(impulse);
    var maxImpulse = step.dt * this.m_maxForce;
    this.m_impulse.clamp(maxImpulse);
    impulse = Vec2.sub(this.m_impulse, oldImpulse);
    vB.wAdd(this.m_invMassB, impulse);
    wB += this.m_invIB * Vec2.cross(this.m_rB, impulse);
    velocity.v.set(vB);
    velocity.w = wB;
};

MouseJoint.prototype.solvePositionConstraints = function(step) {
    return true;
};


},{"../Joint":5,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],32:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = PrismaticJoint;

var common = require("../util/common");

var options = require("../util/options");

var create = require("../util/create");

var Settings = require("../Settings");

var Math = require("../common/Math");

var Vec2 = require("../common/Vec2");

var Vec3 = require("../common/Vec3");

var Mat22 = require("../common/Mat22");

var Mat33 = require("../common/Mat33");

var Rot = require("../common/Rot");

var Sweep = require("../common/Sweep");

var Transform = require("../common/Transform");

var Velocity = require("../common/Velocity");

var Position = require("../common/Position");

var Joint = require("../Joint");

var inactiveLimit = 0;

var atLowerLimit = 1;

var atUpperLimit = 2;

var equalLimits = 3;

PrismaticJoint.TYPE = "prismatic-joint";

PrismaticJoint._super = Joint;

PrismaticJoint.prototype = create(PrismaticJoint._super.prototype);

/**
 * @typedef {Object} PrismaticJointDef
 *
 * Prismatic joint definition. This requires defining a line of motion using an
 * axis and an anchor point. The definition uses local anchor points and a local
 * axis so that the initial configuration can violate the constraint slightly.
 * The joint translation is zero when the local anchor points coincide in world
 * space. Using local anchors and a local axis helps when saving and loading a
 * game.
 * 
 * @prop {boolean} enableLimit Enable/disable the joint limit.
 * @prop {float} lowerTranslation The lower translation limit, usually in
 *       meters.
 * @prop {float} upperTranslation The upper translation limit, usually in
 *       meters.
 * @prop {boolean} enableMotor Enable/disable the joint motor.
 * @prop {float} maxMotorForce The maximum motor torque, usually in N-m.
 * @prop {float} motorSpeed The desired motor speed in radians per second.
 */
var PrismaticJointDef = {
    enableLimit: false,
    lowerTranslation: 0,
    upperTranslation: 0,
    enableMotor: false,
    maxMotorForce: 0,
    motorSpeed: 0
};

/**
 * A prismatic joint. This joint provides one degree of freedom: translation
 * along an axis fixed in bodyA. Relative rotation is prevented. You can use a
 * joint limit to restrict the range of motion and a joint motor to drive the
 * motion or to model joint friction.
 * 
 * @prop {Vec2} localAnchorA The local anchor point relative to bodyA's origin.
 * @prop {Vec2} localAnchorB The local anchor point relative to bodyB's origin.
 * @prop {Vec2} localAxisA The local translation unit axis in bodyA.
 * @prop {float} referenceAngle The constrained angle between the bodies:
 *       bodyB_angle - bodyA_angle.
 */
function PrismaticJoint(def, bodyA, bodyB, anchor, axis) {
    if (!(this instanceof PrismaticJoint)) {
        return new PrismaticJoint(def, bodyA, bodyB, anchor, axis);
    }
    def = options(def, PrismaticJointDef);
    Joint.call(this, def, bodyA, bodyB);
    this.m_type = PrismaticJoint.TYPE;
    this.m_localAnchorA = def.localAnchorA || bodyA.getLocalPoint(anchor);
    this.m_localAnchorB = def.localAnchorB || bodyB.getLocalPoint(anchor);
    this.m_localXAxisA = def.localAxisA || bodyA.getLocalVector(axis);
    this.m_localXAxisA.normalize();
    this.m_localYAxisA = Vec2.cross(1, this.m_localXAxisA);
    this.m_referenceAngle = bodyB.getAngle() - bodyA.getAngle();
    this.m_impulse = Vec3();
    this.m_motorMass = 0;
    this.m_motorImpulse = 0;
    this.m_lowerTranslation = def.lowerTranslation;
    this.m_upperTranslation = def.upperTranslation;
    this.m_maxMotorForce = def.maxMotorForce;
    this.m_motorSpeed = def.motorSpeed;
    this.m_enableLimit = def.enableLimit;
    this.m_enableMotor = def.enableMotor;
    this.m_limitState = inactiveLimit;
    this.m_axis = Vec2.zero();
    this.m_perp = Vec2.zero();
    // Solver temp
    this.m_localCenterA;
    // Vec2
    this.m_localCenterB;
    // Vec2
    this.m_invMassA;
    // float
    this.m_invMassB;
    // float
    this.m_invIA;
    // float
    this.m_invIB;
    // float
    this.m_axis, this.m_perp;
    // Vec2
    this.m_s1, this.m_s2;
    // float
    this.m_a1, this.m_a2;
    // float
    this.m_K = new Mat33();
    this.m_motorMass;
}

/**
 * The local anchor point relative to bodyA's origin.
 */
PrismaticJoint.prototype.getLocalAnchorA = function() {
    return this.m_localAnchorA;
};

/**
 * The local anchor point relative to bodyB's origin.
 */
PrismaticJoint.prototype.getLocalAnchorB = function() {
    return this.m_localAnchorB;
};

/**
 * The local joint axis relative to bodyA.
 */
PrismaticJoint.prototype.getLocalAxisA = function() {
    return this.m_localXAxisA;
};

/**
 * Get the reference angle.
 */
PrismaticJoint.prototype.getReferenceAngle = function() {
    return this.m_referenceAngle;
};

/**
 * Get the current joint translation, usually in meters.
 */
PrismaticJoint.prototype.getJointTranslation = function() {
    var pA = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    var pB = this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    var d = Vec2.sub(pB, pA);
    var axis = this.m_bodyA.getWorldVector(this.m_localXAxisA);
    var translation = Vec2.dot(d, axis);
    return translation;
};

/**
 * Get the current joint translation speed, usually in meters per second.
 */
PrismaticJoint.prototype.getJointSpeed = function() {
    var bA = this.m_bodyA;
    var bB = this.m_bodyB;
    var rA = Mul(bA.m_xf.q, this.m_localAnchorA - bA.m_sweep.localCenter);
    // Vec2
    var rB = Mul(bB.m_xf.q, this.m_localAnchorB - bB.m_sweep.localCenter);
    // Vec2
    var p1 = bA.m_sweep.c + rA;
    // Vec2
    var p2 = bB.m_sweep.c + rB;
    // Vec2
    var d = p2 - p1;
    // Vec2
    var axis = Mul(bA.m_xf.q, this.m_localXAxisA);
    // Vec2
    var vA = bA.m_linearVelocity;
    // Vec2
    var vB = bB.m_linearVelocity;
    // Vec2
    var wA = bA.m_angularVelocity;
    // float
    var wB = bB.m_angularVelocity;
    // float
    var speed = Dot(d, Cross(wA, axis)) + Dot(axis, vB + Cross(wB, rB) - vA - Cross(wA, rA));
    // float
    return speed;
};

/**
 * Is the joint limit enabled?
 */
PrismaticJoint.prototype.isLimitEnabled = function() {
    return this.m_enableLimit;
};

/**
 * Enable/disable the joint limit.
 */
PrismaticJoint.prototype.enableLimit = function(flag) {
    if (flag != this.m_enableLimit) {
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_enableLimit = flag;
        this.m_impulse.z = 0;
    }
};

/**
 * Get the lower joint limit, usually in meters.
 */
PrismaticJoint.prototype.getLowerLimit = function() {
    return this.m_lowerTranslation;
};

/**
 * Get the upper joint limit, usually in meters.
 */
PrismaticJoint.prototype.getUpperLimit = function() {
    return this.m_upperTranslation;
};

/**
 * Set the joint limits, usually in meters.
 */
PrismaticJoint.prototype.setLimits = function(lower, upper) {
    ASSERT && common.assert(lower <= upper);
    if (lower != this.m_lowerTranslation || upper != this.m_upperTranslation) {
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_lowerTranslation = lower;
        this.m_upperTranslation = upper;
        this.m_impulse.z = 0;
    }
};

/**
 * Is the joint motor enabled?
 */
PrismaticJoint.prototype.isMotorEnabled = function() {
    return this.m_enableMotor;
};

/**
 * Enable/disable the joint motor.
 */
PrismaticJoint.prototype.enableMotor = function(flag) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_enableMotor = flag;
};

/**
 * Set the motor speed, usually in meters per second.
 */
PrismaticJoint.prototype.setMotorSpeed = function(speed) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_motorSpeed = speed;
};

/**
 * Set the maximum motor force, usually in N.
 */
PrismaticJoint.prototype.setMaxMotorForce = function(force) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_maxMotorForce = force;
};

/**
 * Get the motor speed, usually in meters per second.
 */
PrismaticJoint.prototype.getMotorSpeed = function() {
    return this.m_motorSpeed;
};

/**
 * Get the current motor force given the inverse time step, usually in N.
 */
PrismaticJoint.prototype.getMotorForce = function(inv_dt) {
    return inv_dt * this.m_motorImpulse;
};

PrismaticJoint.prototype.getAnchorA = function() {
    return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
};

PrismaticJoint.prototype.getAnchorB = function() {
    return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
};

PrismaticJoint.prototype.getReactionForce = function(inv_dt) {
    return inv_dt * (this.m_impulse.x * this.m_perp + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis);
};

PrismaticJoint.prototype.getReactionTorque = function(inv_dt) {
    return inv_dt * this.m_impulse.y;
};

PrismaticJoint.prototype.initVelocityConstraints = function(step) {
    this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
    this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
    this.m_invMassA = this.m_bodyA.m_invMass;
    this.m_invMassB = this.m_bodyB.m_invMass;
    this.m_invIA = this.m_bodyA.m_invI;
    this.m_invIB = this.m_bodyB.m_invI;
    var cA = this.m_bodyA.c_position.c;
    var aA = this.m_bodyA.c_position.a;
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var cB = this.m_bodyB.c_position.c;
    var aB = this.m_bodyB.c_position.a;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    var qA = Rot.neo(aA);
    var qB = Rot.neo(aB);
    // Compute the effective masses.
    var rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    var rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    var d = Vec2.zero();
    d.wAdd(1, cB, 1, rB);
    d.wSub(1, cA, 1, rA);
    var mA = this.m_invMassA, mB = this.m_invMassB;
    var iA = this.m_invIA, iB = this.m_invIB;
    // Compute motor Jacobian and effective mass.
    {
        this.m_axis = Rot.mul(qA, this.m_localXAxisA);
        this.m_a1 = Vec2.cross(Vec2.add(d, rA), this.m_axis);
        this.m_a2 = Vec2.cross(rB, this.m_axis);
        this.m_motorMass = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2 * this.m_a2;
        if (this.m_motorMass > 0) {
            this.m_motorMass = 1 / this.m_motorMass;
        }
    }
    // Prismatic constraint.
    {
        this.m_perp = Rot.mul(qA, this.m_localYAxisA);
        this.m_s1 = Vec2.cross(Vec2.add(d, rA), this.m_perp);
        this.m_s2 = Vec2.cross(rB, this.m_perp);
        var s1test = Vec2.cross(rA, this.m_perp);
        var k11 = mA + mB + iA * this.m_s1 * this.m_s1 + iB * this.m_s2 * this.m_s2;
        var k12 = iA * this.m_s1 + iB * this.m_s2;
        var k13 = iA * this.m_s1 * this.m_a1 + iB * this.m_s2 * this.m_a2;
        var k22 = iA + iB;
        if (k22 == 0) {
            // For bodies with fixed rotation.
            k22 = 1;
        }
        var k23 = iA * this.m_a1 + iB * this.m_a2;
        var k33 = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2 * this.m_a2;
        this.m_K.ex.set(k11, k12, k13);
        this.m_K.ey.set(k12, k22, k23);
        this.m_K.ez.set(k13, k23, k33);
    }
    // Compute motor and limit terms.
    if (this.m_enableLimit) {
        var jointTranslation = Vec2.dot(this.m_axis, d);
        // float
        if (Math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * Settings.linearSlop) {
            this.m_limitState = equalLimits;
        } else if (jointTranslation <= this.m_lowerTranslation) {
            if (this.m_limitState != atLowerLimit) {
                this.m_limitState = atLowerLimit;
                this.m_impulse.z = 0;
            }
        } else if (jointTranslation >= this.m_upperTranslation) {
            if (this.m_limitState != atUpperLimit) {
                this.m_limitState = atUpperLimit;
                this.m_impulse.z = 0;
            }
        } else {
            this.m_limitState = inactiveLimit;
            this.m_impulse.z = 0;
        }
    } else {
        this.m_limitState = inactiveLimit;
        this.m_impulse.z = 0;
    }
    if (this.m_enableMotor == false) {
        this.m_motorImpulse = 0;
    }
    if (step.warmStarting) {
        // Account for variable time step.
        this.m_impulse.mul(step.dtRatio);
        this.m_motorImpulse *= step.dtRatio;
        var P = Vec2.wAdd(this.m_impulse.x, this.m_perp, this.m_motorImpulse + this.m_impulse.z, this.m_axis);
        var LA = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
        var LB = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
        vA.wSub(mA, P);
        wA -= iA * LA;
        vB.wAdd(mB, P);
        wB += iB * LB;
    } else {
        this.m_impulse.setZero();
        this.m_motorImpulse = 0;
    }
    this.m_bodyA.c_velocity.v.set(vA);
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v.set(vB);
    this.m_bodyB.c_velocity.w = wB;
};

PrismaticJoint.prototype.solveVelocityConstraints = function(step) {
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    var mA = this.m_invMassA;
    var mB = this.m_invMassB;
    var iA = this.m_invIA;
    var iB = this.m_invIB;
    // Solve linear motor constraint.
    if (this.m_enableMotor && this.m_limitState != equalLimits) {
        var Cdot = Vec2.dot(this.m_axis, Vec2.sub(vB, vA)) + this.m_a2 * wB - this.m_a1 * wA;
        var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
        var oldImpulse = this.m_motorImpulse;
        var maxImpulse = step.dt * this.m_maxMotorForce;
        this.m_motorImpulse = Math.clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
        impulse = this.m_motorImpulse - oldImpulse;
        var P = Vec2.zero().wSet(impulse, this.m_axis);
        var LA = impulse * this.m_a1;
        var LB = impulse * this.m_a2;
        vA.wSub(mA, P);
        wA -= iA * LA;
        vB.wAdd(mB, P);
        wB += iB * LB;
    }
    var Cdot1 = Vec2.zero();
    Cdot1.x += Vec2.dot(this.m_perp, vB) + this.m_s2 * wB;
    Cdot1.x -= Vec2.dot(this.m_perp, vA) + this.m_s1 * wA;
    Cdot1.y = wB - wA;
    if (this.m_enableLimit && this.m_limitState != inactiveLimit) {
        // Solve prismatic and limit constraint in block form.
        var Cdot2 = 0;
        Cdot2 += Vec2.dot(this.m_axis, vB) + this.m_a2 * wB;
        Cdot2 -= Vec2.dot(this.m_axis, vA) + this.m_a1 * wA;
        var Cdot = Vec3(Cdot1.x, Cdot1.y, Cdot2);
        var f1 = Vec3(this.m_impulse);
        var df = this.m_K.solve33(Vec3.neg(Cdot));
        // Vec3
        this.m_impulse.add(df);
        if (this.m_limitState == atLowerLimit) {
            this.m_impulse.z = Math.max(this.m_impulse.z, 0);
        } else if (this.m_limitState == atUpperLimit) {
            this.m_impulse.z = Math.min(this.m_impulse.z, 0);
        }
        // f2(1:2) = invK(1:2,1:2) * (-Cdot(1:2) - K(1:2,3) * (f2(3) - f1(3))) +
        // f1(1:2)
        var b = Vec2.wAdd(-1, Cdot1, -(this.m_impulse.z - f1.z), Vec2.neo(this.m_K.ez.x, this.m_K.ez.y));
        // Vec2
        var f2r = Vec2.add(this.m_K.solve22(b), Vec2.neo(f1.x, f1.y));
        // Vec2
        this.m_impulse.x = f2r.x;
        this.m_impulse.y = f2r.y;
        df = Vec3.sub(this.m_impulse, f1);
        var P = Vec2.wAdd(df.x, this.m_perp, df.z, this.m_axis);
        // Vec2
        var LA = df.x * this.m_s1 + df.y + df.z * this.m_a1;
        // float
        var LB = df.x * this.m_s2 + df.y + df.z * this.m_a2;
        // float
        vA.wSub(mA, P);
        wA -= iA * LA;
        vB.wAdd(mB, P);
        wB += iB * LB;
    } else {
        // Limit is inactive, just solve the prismatic constraint in block form.
        var df = this.m_K.solve22(Vec2.neg(Cdot1));
        // Vec2
        this.m_impulse.x += df.x;
        this.m_impulse.y += df.y;
        var P = Vec2.zero().wAdd(df.x, this.m_perp);
        // Vec2
        var LA = df.x * this.m_s1 + df.y;
        // float
        var LB = df.x * this.m_s2 + df.y;
        // float
        vA.wSub(mA, P);
        wA -= iA * LA;
        vB.wAdd(mB, P);
        wB += iB * LB;
    }
    this.m_bodyA.c_velocity.v = vA;
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v = vB;
    this.m_bodyB.c_velocity.w = wB;
};

PrismaticJoint.prototype.solvePositionConstraints = function(step) {
    var cA = this.m_bodyA.c_position.c;
    var aA = this.m_bodyA.c_position.a;
    var cB = this.m_bodyB.c_position.c;
    var aB = this.m_bodyB.c_position.a;
    var qA = Rot.neo(aA);
    var qB = Rot.neo(aB);
    var mA = this.m_invMassA;
    var mB = this.m_invMassB;
    var iA = this.m_invIA;
    var iB = this.m_invIB;
    // Compute fresh Jacobians
    var rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    // Vec2
    var rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    // Vec2
    var d = Vec2.sub(Vec2.add(cB, rB), Vec2.add(cA, rA));
    // Vec2
    var axis = Rot.mul(qA, this.m_localXAxisA);
    // Vec2
    var a1 = Vec2.cross(Vec2.add(d, rA), axis);
    // float
    var a2 = Vec2.cross(rB, axis);
    // float
    var perp = Rot.mul(qA, this.m_localYAxisA);
    // Vec2
    var s1 = Vec2.cross(Vec2.add(d, rA), perp);
    // float
    var s2 = Vec2.cross(rB, perp);
    // float
    var impulse = Vec3();
    var C1 = Vec2.zero();
    // Vec2
    C1.x = Vec2.dot(perp, d);
    C1.y = aB - aA - this.m_referenceAngle;
    var linearError = Math.abs(C1.x);
    // float
    var angularError = Math.abs(C1.y);
    // float
    var linearSlop = Settings.linearSlop;
    var maxLinearCorrection = Settings.maxLinearCorrection;
    var active = false;
    // bool
    var C2 = 0;
    // float
    if (this.m_enableLimit) {
        var translation = Vec2.dot(axis, d);
        // float
        if (Math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * linearSlop) {
            // Prevent large angular corrections
            C2 = Math.clamp(translation, -maxLinearCorrection, maxLinearCorrection);
            linearError = Math.max(linearError, Math.abs(translation));
            active = true;
        } else if (translation <= this.m_lowerTranslation) {
            // Prevent large linear corrections and allow some slop.
            C2 = Math.clamp(translation - this.m_lowerTranslation + linearSlop, -maxLinearCorrection, 0);
            linearError = Math.max(linearError, this.m_lowerTranslation - translation);
            active = true;
        } else if (translation >= this.m_upperTranslation) {
            // Prevent large linear corrections and allow some slop.
            C2 = Math.clamp(translation - this.m_upperTranslation - linearSlop, 0, maxLinearCorrection);
            linearError = Math.max(linearError, translation - this.m_upperTranslation);
            active = true;
        }
    }
    if (active) {
        var k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2;
        // float
        var k12 = iA * s1 + iB * s2;
        // float
        var k13 = iA * s1 * a1 + iB * s2 * a2;
        // float
        var k22 = iA + iB;
        // float
        if (k22 == 0) {
            // For fixed rotation
            k22 = 1;
        }
        var k23 = iA * a1 + iB * a2;
        // float
        var k33 = mA + mB + iA * a1 * a1 + iB * a2 * a2;
        // float
        var K = new Mat33();
        K.ex.set(k11, k12, k13);
        K.ey.set(k12, k22, k23);
        K.ez.set(k13, k23, k33);
        var C = Vec3();
        C.x = C1.x;
        C.y = C1.y;
        C.z = C2;
        impulse = K.solve33(Vec3.neg(C));
    } else {
        var k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2;
        // float
        var k12 = iA * s1 + iB * s2;
        // float
        var k22 = iA + iB;
        // float
        if (k22 == 0) {
            k22 = 1;
        }
        var K = new Mat22();
        K.ex.set(k11, k12);
        K.ey.set(k12, k22);
        var impulse1 = K.solve(Vec2.neg(C1));
        // Vec2
        impulse.x = impulse1.x;
        impulse.y = impulse1.y;
        impulse.z = 0;
    }
    var P = Vec2.wAdd(impulse.x, perp, impulse.z, axis);
    // Vec2
    var LA = impulse.x * s1 + impulse.y + impulse.z * a1;
    // float
    var LB = impulse.x * s2 + impulse.y + impulse.z * a2;
    // float
    cA.wSub(mA, P);
    aA -= iA * LA;
    cB.wAdd(mB, P);
    aB += iB * LB;
    this.m_bodyA.c_position.c = cA;
    this.m_bodyA.c_position.a = aA;
    this.m_bodyB.c_position.c = cB;
    this.m_bodyB.c_position.a = aB;
    return linearError <= Settings.linearSlop && angularError <= Settings.angularSlop;
};


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],33:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = PulleyJoint;

var common = require("../util/common");

var options = require("../util/options");

var create = require("../util/create");

var Settings = require("../Settings");

var Math = require("../common/Math");

var Vec2 = require("../common/Vec2");

var Vec3 = require("../common/Vec3");

var Mat22 = require("../common/Mat22");

var Mat33 = require("../common/Mat33");

var Rot = require("../common/Rot");

var Sweep = require("../common/Sweep");

var Transform = require("../common/Transform");

var Velocity = require("../common/Velocity");

var Position = require("../common/Position");

var Joint = require("../Joint");

PulleyJoint.TYPE = "pulley-joint";

PulleyJoint.MIN_PULLEY_LENGTH = 2;

// minPulleyLength
PulleyJoint._super = Joint;

PulleyJoint.prototype = create(PulleyJoint._super.prototype);

/**
 * @typedef {Object} PulleyJointDef
 *
 * Pulley joint definition. This requires two ground anchors, two dynamic body
 * anchor points, and a pulley ratio.
 */
var PulleyJointDef = {
    collideConnected: true
};

/**
 * The pulley joint is connected to two bodies and two fixed ground points. The
 * pulley supports a ratio such that: length1 + ratio * length2 <= constant
 * 
 * Yes, the force transmitted is scaled by the ratio.
 * 
 * Warning: the pulley joint can get a bit squirrelly by itself. They often work
 * better when combined with prismatic joints. You should also cover the the
 * anchor points with static shapes to prevent one side from going to zero
 * length.
 * 
 * @param {Vec2} groundAnchorA The first ground anchor in world coordinates.
 *          This point never moves.
 * @param {Vec2} groundAnchorB The second ground anchor in world coordinates.
 *          This point never moves.
 * @param {Vec2} localAnchorA The local anchor point relative to bodyA's origin.
 * @param {Vec2} localAnchorB The local anchor point relative to bodyB's origin.
 * @param {float} ratio The pulley ratio, used to simulate a block-and-tackle.
 * 
 * @prop {float} lengthA The reference length for the segment attached to bodyA.
 * @prop {float} lengthB The reference length for the segment attached to bodyB.
 */
function PulleyJoint(def, bodyA, bodyB, groundA, groundB, anchorA, anchorB, ratio) {
    if (!(this instanceof PulleyJoint)) {
        return new PulleyJoint(def, bodyA, bodyB, groundA, groundB, anchorA, anchorB, ratio);
    }
    def = options(def, PulleyJointDef);
    Joint.call(this, def, bodyA, bodyB);
    this.m_type = PulleyJoint.TYPE;
    this.m_groundAnchorA = groundA;
    this.m_groundAnchorB = groundB;
    this.m_localAnchorA = bodyA.getLocalPoint(anchorA);
    this.m_localAnchorB = bodyB.getLocalPoint(anchorB);
    this.m_lengthA = Vec2.distance(anchorA, groundA);
    this.m_lengthB = Vec2.distance(anchorB, groundB);
    this.m_ratio = def.ratio || ratio;
    ASSERT && common.assert(ratio > Math.EPSILON);
    this.m_constant = this.m_lengthA + this.m_ratio * this.m_lengthB;
    this.m_impulse = 0;
    // Solver temp
    this.m_uA;
    // Vec2
    this.m_uB;
    // Vec2
    this.m_rA;
    // Vec2
    this.m_rB;
    // Vec2
    this.m_localCenterA;
    // Vec2
    this.m_localCenterB;
    // Vec2
    this.m_invMassA;
    // float
    this.m_invMassB;
    // float
    this.m_invIA;
    // float
    this.m_invIB;
    // float
    this.m_mass;
}

/**
 * Get the first ground anchor.
 */
PulleyJoint.prototype.getGroundAnchorA = function() {
    return this.m_groundAnchorA;
};

/**
 * Get the second ground anchor.
 */
PulleyJoint.prototype.getGroundAnchorB = function() {
    return this.m_groundAnchorB;
};

/**
 * Get the current length of the segment attached to bodyA.
 */
PulleyJoint.prototype.getLengthA = function() {
    return this.m_lengthA;
};

/**
 * Get the current length of the segment attached to bodyB.
 */
PulleyJoint.prototype.getLengthB = function() {
    return this.m_lengthB;
};

/**
 * Get the pulley ratio.
 */
PulleyJoint.prototype.setRatio = function() {
    return this.m_ratio;
};

/**
 * Get the current length of the segment attached to bodyA.
 */
PulleyJoint.prototype.getCurrentLengthA = function() {
    var p = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    var s = this.m_groundAnchorA;
    return Vec2.distance(p, s);
};

/**
 * Get the current length of the segment attached to bodyB.
 */
PulleyJoint.prototype.getCurrentLengthB = function() {
    var p = this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    var s = this.m_groundAnchorB;
    return Vec2.distance(p, s);
};

PulleyJoint.prototype.shiftOrigin = function(newOrigin) {
    this.m_groundAnchorA -= newOrigin;
    this.m_groundAnchorB -= newOrigin;
};

PulleyJoint.prototype.getAnchorA = function() {
    return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
};

PulleyJoint.prototype.getAnchorB = function() {
    return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
};

PulleyJoint.prototype.getReactionForce = function(inv_dt) {
    return Vec3.mul(inv_dt * this.m_impulse, this.m_uB);
};

PulleyJoint.prototype.getReactionTorque = function(inv_dt) {
    return 0;
};

PulleyJoint.prototype.initVelocityConstraints = function(step) {
    this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
    this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
    this.m_invMassA = this.m_bodyA.m_invMass;
    this.m_invMassB = this.m_bodyB.m_invMass;
    this.m_invIA = this.m_bodyA.m_invI;
    this.m_invIB = this.m_bodyB.m_invI;
    var cA = this.m_bodyA.c_position.c;
    var aA = this.m_bodyA.c_position.a;
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var cB = this.m_bodyB.c_position.c;
    var aB = this.m_bodyB.c_position.a;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    var qA = Rot.neo(aA);
    var qB = Rot.neo(aB);
    this.m_rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    this.m_rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    // Get the pulley axes.
    this.m_uA = Vec2.sub(Vec2.add(cA, this.m_rA), this.m_groundAnchorA);
    this.m_uB = Vec2.sub(Vec2.add(cB, this.m_rB), this.m_groundAnchorB);
    var lengthA = this.m_uA.length();
    var lengthB = this.m_uB.length();
    if (lengthA > 10 * Settings.linearSlop) {
        this.m_uA.mul(1 / lengthA);
    } else {
        this.m_uA.setZero();
    }
    if (lengthB > 10 * Settings.linearSlop) {
        this.m_uB.mul(1 / lengthB);
    } else {
        this.m_uB.setZero();
    }
    // Compute effective mass.
    var ruA = Vec2.cross(this.m_rA, this.m_uA);
    // float
    var ruB = Vec2.cross(this.m_rB, this.m_uB);
    // float
    var mA = this.m_invMassA + this.m_invIA * ruA * ruA;
    // float
    var mB = this.m_invMassB + this.m_invIB * ruB * ruB;
    // float
    this.m_mass = mA + this.m_ratio * this.m_ratio * mB;
    if (this.m_mass > 0) {
        this.m_mass = 1 / this.m_mass;
    }
    if (step.warmStarting) {
        // Scale impulses to support variable time steps.
        this.m_impulse *= step.dtRatio;
        // Warm starting.
        var PA = Vec2.mul(-this.m_impulse, this.m_uA);
        var PB = Vec2.mul(-this.m_ratio * this.m_impulse, this.m_uB);
        vA.wAdd(this.m_invMassA, PA);
        wA += this.m_invIA * Vec2.cross(this.m_rA, PA);
        vB.wAdd(this.m_invMassB, PB);
        wB += this.m_invIB * Vec2.cross(this.m_rB, PB);
    } else {
        this.m_impulse = 0;
    }
    this.m_bodyA.c_velocity.v = vA;
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v = vB;
    this.m_bodyB.c_velocity.w = wB;
};

PulleyJoint.prototype.solveVelocityConstraints = function(step) {
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    var vpA = Vec2.add(vA, Vec2.cross(wA, this.m_rA));
    var vpB = Vec2.add(vB, Vec2.cross(wB, this.m_rB));
    var Cdot = -Vec2.dot(this.m_uA, vpA) - this.m_ratio * Vec2.dot(this.m_uB, vpB);
    // float
    var impulse = -this.m_mass * Cdot;
    // float
    this.m_impulse += impulse;
    var PA = Vec2.zero().wSet(-impulse, this.m_uA);
    // Vec2
    var PB = Vec2.zero().wSet(-this.m_ratio * impulse, this.m_uB);
    // Vec2
    vA.wAdd(this.m_invMassA, PA);
    wA += this.m_invIA * Vec2.cross(this.m_rA, PA);
    vB.wAdd(this.m_invMassB, PB);
    wB += this.m_invIB * Vec2.cross(this.m_rB, PB);
    this.m_bodyA.c_velocity.v = vA;
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v = vB;
    this.m_bodyB.c_velocity.w = wB;
};

PulleyJoint.prototype.solvePositionConstraints = function(step) {
    var cA = this.m_bodyA.c_position.c;
    var aA = this.m_bodyA.c_position.a;
    var cB = this.m_bodyB.c_position.c;
    var aB = this.m_bodyB.c_position.a;
    var qA = Rot.neo(aA), qB = Rot.neo(aB);
    var rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    var rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    // Get the pulley axes.
    var uA = Vec2.sub(Vec2.add(cA, this.m_rA), this.m_groundAnchorA);
    var uB = Vec2.sub(Vec2.add(cB, this.m_rB), this.m_groundAnchorB);
    var lengthA = uA.length();
    var lengthB = uB.length();
    if (lengthA > 10 * Settings.linearSlop) {
        uA.mul(1 / lengthA);
    } else {
        uA.setZero();
    }
    if (lengthB > 10 * Settings.linearSlop) {
        uB.mul(1 / lengthB);
    } else {
        uB.setZero();
    }
    // Compute effective mass.
    var ruA = Vec2.cross(rA, uA);
    var ruB = Vec2.cross(rB, uB);
    var mA = this.m_invMassA + this.m_invIA * ruA * ruA;
    // float
    var mB = this.m_invMassB + this.m_invIB * ruB * ruB;
    // float
    var mass = mA + this.m_ratio * this.m_ratio * mB;
    // float
    if (mass > 0) {
        mass = 1 / mass;
    }
    var C = this.m_constant - lengthA - this.m_ratio * lengthB;
    // float
    var linearError = Math.abs(C);
    // float
    var impulse = -mass * C;
    // float
    var PA = Vec2.zero().wSet(-impulse, uA);
    // Vec2
    var PB = Vec2.zero().wSet(-this.m_ratio * impulse, uB);
    // Vec2
    cA.wAdd(this.m_invMassA, PA);
    aA += this.m_invIA * Vec2.cross(rA, PA);
    cB.wAdd(this.m_invMassB, PB);
    aB += this.m_invIB * Vec2.cross(rB, PB);
    this.m_bodyA.c_position.c = cA;
    this.m_bodyA.c_position.a = aA;
    this.m_bodyB.c_position.c = cB;
    this.m_bodyB.c_position.a = aB;
    return linearError < Settings.linearSlop;
};


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],34:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = RevoluteJoint;

var common = require("../util/common");

var options = require("../util/options");

var create = require("../util/create");

var Settings = require("../Settings");

var Math = require("../common/Math");

var Vec2 = require("../common/Vec2");

var Vec3 = require("../common/Vec3");

var Mat22 = require("../common/Mat22");

var Mat33 = require("../common/Mat33");

var Rot = require("../common/Rot");

var Sweep = require("../common/Sweep");

var Transform = require("../common/Transform");

var Velocity = require("../common/Velocity");

var Position = require("../common/Position");

var Joint = require("../Joint");

var inactiveLimit = 0;

var atLowerLimit = 1;

var atUpperLimit = 2;

var equalLimits = 3;

RevoluteJoint.TYPE = "revolute-joint";

RevoluteJoint._super = Joint;

RevoluteJoint.prototype = create(RevoluteJoint._super.prototype);

/**
 * @typedef {Object} RevoluteJointDef
 *
 * Revolute joint definition. This requires defining an anchor point where the
 * bodies are joined. The definition uses local anchor points so that the
 * initial configuration can violate the constraint slightly. You also need to
 * specify the initial relative angle for joint limits. This helps when saving
 * and loading a game.
 * 
 * The local anchor points are measured from the body's origin rather than the
 * center of mass because: 1. you might not know where the center of mass will
 * be. 2. if you add/remove shapes from a body and recompute the mass, the
 * joints will be broken.
 * 
 * @prop {bool} enableLimit A flag to enable joint limits.
 * @prop {bool} enableMotor A flag to enable the joint motor.
 * @prop {float} lowerAngle The lower angle for the joint limit (radians).
 * @prop {float} upperAngle The upper angle for the joint limit (radians).
 * @prop {float} motorSpeed The desired motor speed. Usually in radians per
 *       second.
 * @prop {float} maxMotorTorque The maximum motor torque used to achieve the
 *       desired motor speed. Usually in N-m.
 */
var RevoluteJointDef = {
    lowerAngle: 0,
    upperAngle: 0,
    maxMotorTorque: 0,
    motorSpeed: 0,
    enableLimit: false,
    enableMotor: false
};

/**
 * A revolute joint constrains two bodies to share a common point while they are
 * free to rotate about the point. The relative rotation about the shared point
 * is the joint angle. You can limit the relative rotation with a joint limit
 * that specifies a lower and upper angle. You can use a motor to drive the
 * relative rotation about the shared point. A maximum motor torque is provided
 * so that infinite forces are not generated.
 * 
 * @prop {Vec2} localAnchorA The local anchor point relative to bodyA's origin.
 * @prop {Vec2} localAnchorB The local anchor point relative to bodyB's origin.
 * @prop {float} referenceAngle The bodyB angle minus bodyA angle in the
 *       reference state (radians).
 */
function RevoluteJoint(def, bodyA, bodyB, anchor) {
    if (!(this instanceof RevoluteJoint)) {
        return new RevoluteJoint(def, bodyA, bodyB, anchor);
    }
    def = options(def, RevoluteJointDef);
    Joint.call(this, def, bodyA, bodyB);
    this.m_type = RevoluteJoint.TYPE;
    this.m_localAnchorA = def.localAnchorA || bodyA.getLocalPoint(anchor);
    this.m_localAnchorB = def.localAnchorB || bodyB.getLocalPoint(anchor);
    this.m_referenceAngle = bodyB.getAngle() - bodyA.getAngle();
    this.m_impulse = Vec3();
    this.m_motorImpulse = 0;
    this.m_lowerAngle = def.lowerAngle;
    this.m_upperAngle = def.upperAngle;
    this.m_maxMotorTorque = def.maxMotorTorque;
    this.m_motorSpeed = def.motorSpeed;
    this.m_enableLimit = def.enableLimit;
    this.m_enableMotor = def.enableMotor;
    // Solver temp
    this.m_rA;
    // Vec2
    this.m_rB;
    // Vec2
    this.m_localCenterA;
    // Vec2
    this.m_localCenterB;
    // Vec2
    this.m_invMassA;
    // float
    this.m_invMassB;
    // float
    this.m_invIA;
    // float
    this.m_invIB;
    // float
    // effective mass for point-to-point constraint.
    this.m_mass = new Mat33();
    // effective mass for motor/limit angular constraint.
    this.m_motorMass;
    // float
    this.m_limitState = inactiveLimit;
}

/**
 * The local anchor point relative to bodyA's origin.
 */
RevoluteJoint.prototype.getLocalAnchorA = function() {
    return this.m_localAnchorA;
};

/**
 * The local anchor point relative to bodyB's origin.
 */
RevoluteJoint.prototype.getLocalAnchorB = function() {
    return this.m_localAnchorB;
};

/**
 * Get the reference angle.
 */
RevoluteJoint.prototype.getReferenceAngle = function() {
    return this.m_referenceAngle;
};

/**
 * Get the current joint angle in radians.
 */
RevoluteJoint.prototype.getJointAngle = function() {
    var bA = this.m_bodyA;
    var bB = this.m_bodyB;
    return bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
};

/**
 * Get the current joint angle speed in radians per second.
 */
RevoluteJoint.prototype.getJointSpeed = function() {
    var bA = this.m_bodyA;
    var bB = this.m_bodyB;
    return bB.m_angularVelocity - bA.m_angularVelocity;
};

/**
 * Is the joint motor enabled?
 */
RevoluteJoint.prototype.isMotorEnabled = function() {
    return this.m_enableMotor;
};

/**
 * Enable/disable the joint motor.
 */
RevoluteJoint.prototype.enableMotor = function(flag) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_enableMotor = flag;
};

/**
 * Get the current motor torque given the inverse time step. Unit is N*m.
 */
RevoluteJoint.prototype.getMotorTorque = function(inv_dt) {
    return inv_dt * this.m_motorImpulse;
};

/**
 * Set the motor speed in radians per second.
 */
RevoluteJoint.prototype.setMotorSpeed = function(speed) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_motorSpeed = speed;
};

/**
 * Get the motor speed in radians per second.
 */
RevoluteJoint.prototype.getMotorSpeed = function() {
    return this.m_motorSpeed;
};

/**
 * Set the maximum motor torque, usually in N-m.
 */
RevoluteJoint.prototype.setMaxMotorTorque = function(torque) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_maxMotorTorque = torque;
};

/**
 * Is the joint limit enabled?
 */
RevoluteJoint.prototype.isLimitEnabled = function() {
    return this.m_enableLimit;
};

/**
 * Enable/disable the joint limit.
 */
RevoluteJoint.prototype.enableLimit = function(flag) {
    if (flag != this.m_enableLimit) {
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_enableLimit = flag;
        this.m_impulse.z = 0;
    }
};

/**
 * Get the lower joint limit in radians.
 */
RevoluteJoint.prototype.getLowerLimit = function() {
    return this.m_lowerAngle;
};

/**
 * Get the upper joint limit in radians.
 */
RevoluteJoint.prototype.getUpperLimit = function() {
    return this.m_upperAngle;
};

/**
 * Set the joint limits in radians.
 */
RevoluteJoint.prototype.setLimits = function(lower, upper) {
    ASSERT && common.assert(lower <= upper);
    if (lower != this.m_lowerAngle || upper != this.m_upperAngle) {
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_impulse.z = 0;
        this.m_lowerAngle = lower;
        this.m_upperAngle = upper;
    }
};

RevoluteJoint.prototype.getAnchorA = function() {
    return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
};

RevoluteJoint.prototype.getAnchorB = function() {
    return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
};

/**
 * Get the reaction force given the inverse time step. Unit is N.
 */
RevoluteJoint.prototype.getReactionForce = function(inv_dt) {
    var P = Vec2.neo(this.m_impulse.x, this.m_impulse.y);
    return inv_dt * P;
};

/**
 * Get the reaction torque due to the joint limit given the inverse time step.
 * Unit is N*m.
 */
RevoluteJoint.prototype.getReactionTorque = function(inv_dt) {
    return inv_dt * this.m_impulse.z;
};

RevoluteJoint.prototype.initVelocityConstraints = function(step) {
    this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
    this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
    this.m_invMassA = this.m_bodyA.m_invMass;
    this.m_invMassB = this.m_bodyB.m_invMass;
    this.m_invIA = this.m_bodyA.m_invI;
    this.m_invIB = this.m_bodyB.m_invI;
    var aA = this.m_bodyA.c_position.a;
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var aB = this.m_bodyB.c_position.a;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    var qA = Rot.neo(aA);
    var qB = Rot.neo(aB);
    this.m_rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    this.m_rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    // J = [-I -r1_skew I r2_skew]
    // [ 0 -1 0 1]
    // r_skew = [-ry; rx]
    // Matlab
    // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
    // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
    // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]
    var mA = this.m_invMassA;
    var mB = this.m_invMassB;
    // float
    var iA = this.m_invIA;
    var iB = this.m_invIB;
    // float
    var fixedRotation = iA + iB == 0;
    // bool
    this.m_mass.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y * iB;
    this.m_mass.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
    this.m_mass.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
    this.m_mass.ex.y = this.m_mass.ey.x;
    this.m_mass.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x * iB;
    this.m_mass.ez.y = this.m_rA.x * iA + this.m_rB.x * iB;
    this.m_mass.ex.z = this.m_mass.ez.x;
    this.m_mass.ey.z = this.m_mass.ez.y;
    this.m_mass.ez.z = iA + iB;
    this.m_motorMass = iA + iB;
    if (this.m_motorMass > 0) {
        this.m_motorMass = 1 / this.m_motorMass;
    }
    if (this.m_enableMotor == false || fixedRotation) {
        this.m_motorImpulse = 0;
    }
    if (this.m_enableLimit && fixedRotation == false) {
        var jointAngle = aB - aA - this.m_referenceAngle;
        // float
        if (Math.abs(this.m_upperAngle - this.m_lowerAngle) < 2 * Settings.angularSlop) {
            this.m_limitState = equalLimits;
        } else if (jointAngle <= this.m_lowerAngle) {
            if (this.m_limitState != atLowerLimit) {
                this.m_impulse.z = 0;
            }
            this.m_limitState = atLowerLimit;
        } else if (jointAngle >= this.m_upperAngle) {
            if (this.m_limitState != atUpperLimit) {
                this.m_impulse.z = 0;
            }
            this.m_limitState = atUpperLimit;
        } else {
            this.m_limitState = inactiveLimit;
            this.m_impulse.z = 0;
        }
    } else {
        this.m_limitState = inactiveLimit;
    }
    if (step.warmStarting) {
        // Scale impulses to support a variable time step.
        this.m_impulse.mul(step.dtRatio);
        this.m_motorImpulse *= step.dtRatio;
        var P = Vec2.neo(this.m_impulse.x, this.m_impulse.y);
        vA.wSub(mA, P);
        wA -= iA * (Vec2.cross(this.m_rA, P) + this.m_motorImpulse + this.m_impulse.z);
        vB.wAdd(mB, P);
        wB += iB * (Vec2.cross(this.m_rB, P) + this.m_motorImpulse + this.m_impulse.z);
    } else {
        this.m_impulse.setZero();
        this.m_motorImpulse = 0;
    }
    this.m_bodyA.c_velocity.v = vA;
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v = vB;
    this.m_bodyB.c_velocity.w = wB;
};

RevoluteJoint.prototype.solveVelocityConstraints = function(step) {
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    var mA = this.m_invMassA;
    var mB = this.m_invMassB;
    // float
    var iA = this.m_invIA;
    var iB = this.m_invIB;
    // float
    var fixedRotation = iA + iB == 0;
    // bool
    // Solve motor constraint.
    if (this.m_enableMotor && this.m_limitState != equalLimits && fixedRotation == false) {
        var Cdot = wB - wA - this.m_motorSpeed;
        // float
        var impulse = -this.m_motorMass * Cdot;
        // float
        var oldImpulse = this.m_motorImpulse;
        // float
        var maxImpulse = step.dt * this.m_maxMotorTorque;
        // float
        this.m_motorImpulse = Math.clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
        impulse = this.m_motorImpulse - oldImpulse;
        wA -= iA * impulse;
        wB += iB * impulse;
    }
    // Solve limit constraint.
    if (this.m_enableLimit && this.m_limitState != inactiveLimit && fixedRotation == false) {
        var Cdot1 = Vec2.zero();
        Cdot1.wAdd(1, vB, 1, Vec2.cross(wB, this.m_rB));
        Cdot1.wSub(1, vA, 1, Vec2.cross(wA, this.m_rA));
        var Cdot2 = wB - wA;
        // float
        var Cdot = Vec3(Cdot1.x, Cdot1.y, Cdot2);
        var impulse = Vec3.neg(this.m_mass.solve33(Cdot));
        // Vec3
        if (this.m_limitState == equalLimits) {
            this.m_impulse.add(impulse);
        } else if (this.m_limitState == atLowerLimit) {
            var newImpulse = this.m_impulse.z + impulse.z;
            // float
            if (newImpulse < 0) {
                var rhs = Vec2.wAdd(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y));
                // Vec2
                var reduced = this.m_mass.solve22(rhs);
                // Vec2
                impulse.x = reduced.x;
                impulse.y = reduced.y;
                impulse.z = -this.m_impulse.z;
                this.m_impulse.x += reduced.x;
                this.m_impulse.y += reduced.y;
                this.m_impulse.z = 0;
            } else {
                this.m_impulse.add(impulse);
            }
        } else if (this.m_limitState == atUpperLimit) {
            var newImpulse = this.m_impulse.z + impulse.z;
            // float
            if (newImpulse > 0) {
                var rhs = Vec2.wAdd(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y));
                // Vec2
                var reduced = this.m_mass.solve22(rhs);
                // Vec2
                impulse.x = reduced.x;
                impulse.y = reduced.y;
                impulse.z = -this.m_impulse.z;
                this.m_impulse.x += reduced.x;
                this.m_impulse.y += reduced.y;
                this.m_impulse.z = 0;
            } else {
                this.m_impulse.add(impulse);
            }
        }
        var P = Vec2.neo(impulse.x, impulse.y);
        vA.wSub(mA, P);
        wA -= iA * (Vec2.cross(this.m_rA, P) + impulse.z);
        vB.wAdd(mB, P);
        wB += iB * (Vec2.cross(this.m_rB, P) + impulse.z);
    } else {
        // Solve point-to-point constraint
        var Cdot = Vec2.zero();
        Cdot.wAdd(1, vB, 1, Vec2.cross(wB, this.m_rB));
        Cdot.wSub(1, vA, 1, Vec2.cross(wA, this.m_rA));
        var impulse = this.m_mass.solve22(Vec2.neg(Cdot));
        // Vec2
        this.m_impulse.x += impulse.x;
        this.m_impulse.y += impulse.y;
        vA.wSub(mA, impulse);
        wA -= iA * Vec2.cross(this.m_rA, impulse);
        vB.wAdd(mB, impulse);
        wB += iB * Vec2.cross(this.m_rB, impulse);
    }
    this.m_bodyA.c_velocity.v = vA;
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v = vB;
    this.m_bodyB.c_velocity.w = wB;
};

RevoluteJoint.prototype.solvePositionConstraints = function(step) {
    var cA = this.m_bodyA.c_position.c;
    var aA = this.m_bodyA.c_position.a;
    var cB = this.m_bodyB.c_position.c;
    var aB = this.m_bodyB.c_position.a;
    var qA = Rot.neo(aA);
    var qB = Rot.neo(aB);
    var angularError = 0;
    // float
    var positionError = 0;
    // float
    var fixedRotation = this.m_invIA + this.m_invIB == 0;
    // bool
    // Solve angular limit constraint.
    if (this.m_enableLimit && this.m_limitState != inactiveLimit && fixedRotation == false) {
        var angle = aB - aA - this.m_referenceAngle;
        // float
        var limitImpulse = 0;
        // float
        if (this.m_limitState == equalLimits) {
            // Prevent large angular corrections
            var C = Math.clamp(angle - this.m_lowerAngle, -Settings.maxAngularCorrection, Settings.maxAngularCorrection);
            // float
            limitImpulse = -this.m_motorMass * C;
            angularError = Math.abs(C);
        } else if (this.m_limitState == atLowerLimit) {
            var C = angle - this.m_lowerAngle;
            // float
            angularError = -C;
            // Prevent large angular corrections and allow some slop.
            C = Math.clamp(C + Settings.angularSlop, -Settings.maxAngularCorrection, 0);
            limitImpulse = -this.m_motorMass * C;
        } else if (this.m_limitState == atUpperLimit) {
            var C = angle - this.m_upperAngle;
            // float
            angularError = C;
            // Prevent large angular corrections and allow some slop.
            C = Math.clamp(C - Settings.angularSlop, 0, Settings.maxAngularCorrection);
            limitImpulse = -this.m_motorMass * C;
        }
        aA -= this.m_invIA * limitImpulse;
        aB += this.m_invIB * limitImpulse;
    }
    // Solve point-to-point constraint.
    {
        qA.set(aA);
        qB.set(aB);
        var rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        // Vec2
        var rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        // Vec2
        var C = Vec2.zero();
        C.wAdd(1, cB, 1, rB);
        C.wSub(1, cA, 1, rA);
        positionError = C.length();
        var mA = this.m_invMassA;
        var mB = this.m_invMassB;
        // float
        var iA = this.m_invIA;
        var iB = this.m_invIB;
        // float
        var K = new Mat22();
        K.ex.x = mA + mB + iA * rA.y * rA.y + iB * rB.y * rB.y;
        K.ex.y = -iA * rA.x * rA.y - iB * rB.x * rB.y;
        K.ey.x = K.ex.y;
        K.ey.y = mA + mB + iA * rA.x * rA.x + iB * rB.x * rB.x;
        var impulse = Vec2.neg(K.solve(C));
        // Vec2
        cA.wSub(mA, impulse);
        aA -= iA * Vec2.cross(rA, impulse);
        cB.wAdd(mB, impulse);
        aB += iB * Vec2.cross(rB, impulse);
    }
    this.m_bodyA.c_position.c.set(cA);
    this.m_bodyA.c_position.a = aA;
    this.m_bodyB.c_position.c.set(cB);
    this.m_bodyB.c_position.a = aB;
    return positionError <= Settings.linearSlop && angularError <= Settings.angularSlop;
};


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],35:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = RopeJoint;

var options = require("../util/options");

var create = require("../util/create");

var Settings = require("../Settings");

var Math = require("../common/Math");

var Vec2 = require("../common/Vec2");

var Vec3 = require("../common/Vec3");

var Mat22 = require("../common/Mat22");

var Mat33 = require("../common/Mat33");

var Rot = require("../common/Rot");

var Sweep = require("../common/Sweep");

var Transform = require("../common/Transform");

var Velocity = require("../common/Velocity");

var Position = require("../common/Position");

var Joint = require("../Joint");

var inactiveLimit = 0;

var atLowerLimit = 1;

var atUpperLimit = 2;

var equalLimits = 3;

RopeJoint.TYPE = "rope-joint";

RopeJoint._super = Joint;

RopeJoint.prototype = create(RopeJoint._super.prototype);

/**
 * @typedef {Object} RopeJointDef
 *
 * Rope joint definition. This requires two body anchor points and a maximum
 * lengths. Note: by default the connected objects will not collide. see
 * collideConnected in JointDef.
 * 
 * @prop {float} maxLength The maximum length of the rope. Warning: this must be
 *       larger than linearSlop or the joint will have no effect.
 */
var RopeJointDef = {
    maxLength: 0
};

/**
 * A rope joint enforces a maximum distance between two points on two bodies. It
 * has no other effect.
 * 
 * Warning: if you attempt to change the maximum length during the simulation
 * you will get some non-physical behavior.
 * 
 * A model that would allow you to dynamically modify the length would have some
 * sponginess, so I chose not to implement it that way. See DistanceJoint if you
 * want to dynamically control length.
 * 
 * @prop {Vec2} def.localAnchorA The local anchor point relative to bodyA's origin.
 * @prop {Vec2} def.localAnchorB The local anchor point relative to bodyB's origin.
 */
function RopeJoint(def, bodyA, bodyB, anchor) {
    if (!(this instanceof RopeJoint)) {
        return new RopeJoint(def, bodyA, bodyB, anchor);
    }
    def = options(def, RopeJointDef);
    Joint.call(this, def, bodyA, bodyB);
    this.m_type = RopeJoint.TYPE;
    this.m_localAnchorA = def.localAnchorA || bodyA.getLocalPoint(anchor);
    this.m_localAnchorB = def.localAnchorB || bodyB.getLocalPoint(anchor);
    this.m_maxLength = def.maxLength;
    this.m_mass = 0;
    this.m_impulse = 0;
    this.m_length = 0;
    this.m_state = inactiveLimit;
    // Solver temp
    this.m_u;
    // Vec2
    this.m_rA;
    // Vec2
    this.m_rB;
    // Vec2
    this.m_localCenterA;
    // Vec2
    this.m_localCenterB;
    // Vec2
    this.m_invMassA;
    // float
    this.m_invMassB;
    // float
    this.m_invIA;
    // float
    this.m_invIB;
    // float
    this.m_mass;
}

/**
 * The local anchor point relative to bodyA's origin.
 */
RopeJoint.prototype.getLocalAnchorA = function() {
    return this.m_localAnchorA;
};

/**
 * The local anchor point relative to bodyB's origin.
 */
RopeJoint.prototype.getLocalAnchorB = function() {
    return this.m_localAnchorB;
};

/**
 * Set/Get the maximum length of the rope.
 */
RopeJoint.prototype.setMaxLength = function(length) {
    this.m_maxLength = length;
};

RopeJoint.prototype.getMaxLength = function() {
    return this.m_maxLength;
};

RopeJoint.prototype.getLimitState = function() {
    // TODO LimitState
    return this.m_state;
};

RopeJoint.prototype.getAnchorA = function() {
    return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
};

RopeJoint.prototype.getAnchorB = function() {
    return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
};

RopeJoint.prototype.getReactionForce = function(inv_dt) {
    var F = inv_dt * this.m_impulse * this.m_u;
    // Vec2
    return F;
};

RopeJoint.prototype.getReactionTorque = function(inv_dt) {
    return 0;
};

RopeJoint.prototype.initVelocityConstraints = function(step) {
    this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
    this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
    this.m_invMassA = this.m_bodyA.m_invMass;
    this.m_invMassB = this.m_bodyB.m_invMass;
    this.m_invIA = this.m_bodyA.m_invI;
    this.m_invIB = this.m_bodyB.m_invI;
    var cA = this.m_bodyA.c_position.c;
    var aA = this.m_bodyA.c_position.a;
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var cB = this.m_bodyB.c_position.c;
    var aB = this.m_bodyB.c_position.a;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    var qA = Rot.neo(aA);
    var qB = Rot.neo(aB);
    this.m_rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
    this.m_rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
    this.m_u = Vec2.zero();
    this.m_u.wAdd(1, cB, 1, this.m_rB);
    this.m_u.wSub(1, cA, 1, this.m_rA);
    // Vec2
    this.m_length = this.m_u.length();
    var C = this.m_length - this.m_maxLength;
    // float
    if (C > 0) {
        this.m_state = atUpperLimit;
    } else {
        this.m_state = inactiveLimit;
    }
    if (this.m_length > Settings.linearSlop) {
        this.m_u.mul(1 / this.m_length);
    } else {
        this.m_u.setZero();
        this.m_mass = 0;
        this.m_impulse = 0;
        return;
    }
    // Compute effective mass.
    var crA = Vec2.cross(this.m_rA, this.m_u);
    // float
    var crB = Vec2.cross(this.m_rB, this.m_u);
    // float
    var invMass = this.m_invMassA + this.m_invIA * crA * crA + this.m_invMassB + this.m_invIB * crB * crB;
    // float
    this.m_mass = invMass != 0 ? 1 / invMass : 0;
    if (step.warmStarting) {
        // Scale the impulse to support a variable time step.
        this.m_impulse *= step.dtRatio;
        var P = Vec2.mul(this.m_impulse, this.m_u);
        vA.wSub(this.m_invMassA, P);
        wA -= this.m_invIA * Vec2.cross(this.m_rA, P);
        vB.wAdd(this.m_invMassB, P);
        wB += this.m_invIB * Vec2.cross(this.m_rB, P);
    } else {
        this.m_impulse = 0;
    }
    this.m_bodyA.c_velocity.v.set(vA);
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v.set(vB);
    this.m_bodyB.c_velocity.w = wB;
};

RopeJoint.prototype.solveVelocityConstraints = function(step) {
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    // Cdot = dot(u, v + cross(w, r))
    var vpA = Vec2.addCross(vA, wA, this.m_rA);
    // Vec2
    var vpB = Vec2.addCross(vB, wB, this.m_rB);
    // Vec2
    var C = this.m_length - this.m_maxLength;
    // float
    var Cdot = Vec2.dot(this.m_u, Vec2.sub(vpB, vpA));
    // float
    // Predictive constraint.
    if (C < 0) {
        Cdot += step.inv_dt * C;
    }
    var impulse = -this.m_mass * Cdot;
    // float
    var oldImpulse = this.m_impulse;
    // float
    this.m_impulse = Math.min(0, this.m_impulse + impulse);
    impulse = this.m_impulse - oldImpulse;
    var P = Vec2.mul(impulse, this.m_u);
    // Vec2
    vA.wSub(this.m_invMassA, P);
    wA -= this.m_invIA * Vec2.cross(this.m_rA, P);
    vB.wAdd(this.m_invMassB, P);
    wB += this.m_invIB * Vec2.cross(this.m_rB, P);
    this.m_bodyA.c_velocity.v = vA;
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v = vB;
    this.m_bodyB.c_velocity.w = wB;
};

RopeJoint.prototype.solvePositionConstraints = function(step) {
    var cA = this.m_bodyA.c_position.c;
    // Vec2
    var aA = this.m_bodyA.c_position.a;
    // float
    var cB = this.m_bodyB.c_position.c;
    // Vec2
    var aB = this.m_bodyB.c_position.a;
    // float
    var qA = Rot.neo(aA);
    var qB = Rot.neo(aB);
    var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
    var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
    var u = Vec2.zero();
    u.wAdd(1, cB, 1, rB);
    u.wSub(1, cA, 1, rA);
    // Vec2
    var length = u.normalize();
    // float
    var C = length - this.m_maxLength;
    // float
    C = Math.clamp(C, 0, Settings.maxLinearCorrection);
    var impulse = -this.m_mass * C;
    // float
    var P = Vec2.mul(impulse, u);
    // Vec2
    cA.wSub(this.m_invMassA, P);
    aA -= this.m_invIA * Vec2.cross(rA, P);
    cB.wAdd(this.m_invMassB, P);
    aB += this.m_invIB * Vec2.cross(rB, P);
    this.m_bodyA.c_position.c.set(cA);
    this.m_bodyA.c_position.a = aA;
    this.m_bodyB.c_position.c.set(cB);
    this.m_bodyB.c_position.a = aB;
    return length - this.m_maxLength < Settings.linearSlop;
};


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/create":51,"../util/options":52}],36:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = WeldJoint;

var options = require("../util/options");

var create = require("../util/create");

var Settings = require("../Settings");

var Math = require("../common/Math");

var Vec2 = require("../common/Vec2");

var Vec3 = require("../common/Vec3");

var Mat22 = require("../common/Mat22");

var Mat33 = require("../common/Mat33");

var Rot = require("../common/Rot");

var Sweep = require("../common/Sweep");

var Transform = require("../common/Transform");

var Velocity = require("../common/Velocity");

var Position = require("../common/Position");

var Joint = require("../Joint");

WeldJoint.TYPE = "weld-joint";

WeldJoint._super = Joint;

WeldJoint.prototype = create(WeldJoint._super.prototype);

/**
 * @typedef {Object} WeldJointDef
 *
 * Weld joint definition. You need to specify local anchor points where they are
 * attached and the relative body angle. The position of the anchor points is
 * important for computing the reaction torque.
 * 
 * @prop {float} frequencyHz The mass-spring-damper frequency in Hertz. Rotation
 *       only. Disable softness with a value of 0.
 * @prop {float} dampingRatio The damping ratio. 0 = no damping, 1 = critical
 *       damping.
 */
var WeldJointDef = {
    frequencyHz: 0,
    dampingRatio: 0
};

/**
 * A weld joint essentially glues two bodies together. A weld joint may distort
 * somewhat because the island constraint solver is approximate.
 * 
 * @prop {Vec2} localAnchorA The local anchor point relative to bodyA's origin.
 * @prop {Vec2} localAnchorB The local anchor point relative to bodyB's origin.
 * @prop {float} referenceAngle The bodyB angle minus bodyA angle in the
 *       reference state (radians).
 */
function WeldJoint(def, bodyA, bodyB, anchor) {
    if (!(this instanceof WeldJoint)) {
        return new WeldJoint(def, bodyA, bodyB, anchor);
    }
    def = options(def, WeldJointDef);
    Joint.call(this, def, bodyA, bodyB);
    this.m_type = WeldJoint.TYPE;
    this.m_localAnchorA = bodyA.getLocalPoint(anchor);
    this.m_localAnchorB = bodyB.getLocalPoint(anchor);
    this.m_referenceAngle = bodyB.getAngle() - bodyA.getAngle();
    this.m_frequencyHz = def.frequencyHz;
    this.m_dampingRatio = def.dampingRatio;
    this.m_impulse = Vec3();
    this.m_bias = 0;
    this.m_gamma = 0;
    // Solver temp
    this.m_rA;
    // Vec2
    this.m_rB;
    // Vec2
    this.m_localCenterA;
    // Vec2
    this.m_localCenterB;
    // Vec2
    this.m_invMassA;
    // float
    this.m_invMassB;
    // float
    this.m_invIA;
    // float
    this.m_invIB;
    // float
    this.m_mass = new Mat33();
}

/**
 * The local anchor point relative to bodyA's origin.
 */
WeldJoint.prototype.getLocalAnchorA = function() {
    return this.m_localAnchorA;
};

/**
 * The local anchor point relative to bodyB's origin.
 */
WeldJoint.prototype.getLocalAnchorB = function() {
    return this.m_localAnchorB;
};

/**
 * Get the reference angle.
 */
WeldJoint.prototype.getReferenceAngle = function() {
    return this.m_referenceAngle;
};

/**
 * Set/get frequency in Hz.
 */
WeldJoint.prototype.setFrequency = function(hz) {
    this.m_frequencyHz = hz;
};

WeldJoint.prototype.getFrequency = function() {
    return this.m_frequencyHz;
};

/**
 * Set/get damping ratio.
 */
WeldJoint.prototype.setDampingRatio = function(ratio) {
    this.m_dampingRatio = ratio;
};

WeldJoint.prototype.getDampingRatio = function() {
    return this.m_dampingRatio;
};

WeldJoint.prototype.getAnchorA = function() {
    return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
};

WeldJoint.prototype.getAnchorB = function() {
    return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
};

WeldJoint.prototype.getReactionForce = function(inv_dt) {
    var P = Vec2.neo(this.m_impulse.x, this.m_impulse.y);
    return inv_dt * P;
};

WeldJoint.prototype.getReactionTorque = function(inv_dt) {
    return inv_dt * this.m_impulse.z;
};

WeldJoint.prototype.initVelocityConstraints = function(step) {
    this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
    this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
    this.m_invMassA = this.m_bodyA.m_invMass;
    this.m_invMassB = this.m_bodyB.m_invMass;
    this.m_invIA = this.m_bodyA.m_invI;
    this.m_invIB = this.m_bodyB.m_invI;
    var aA = this.m_bodyA.c_position.a;
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var aB = this.m_bodyB.c_position.a;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    var qA = Rot.neo(aA), qB = Rot.neo(aB);
    this.m_rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    this.m_rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    // J = [-I -r1_skew I r2_skew]
    // [ 0 -1 0 1]
    // r_skew = [-ry; rx]
    // Matlab
    // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
    // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
    // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]
    var mA = this.m_invMassA;
    var mB = this.m_invMassB;
    // float
    var iA = this.m_invIA;
    var iB = this.m_invIB;
    // float
    var K = new Mat33();
    K.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y * iB;
    K.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
    K.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
    K.ex.y = K.ey.x;
    K.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x * iB;
    K.ez.y = this.m_rA.x * iA + this.m_rB.x * iB;
    K.ex.z = K.ez.x;
    K.ey.z = K.ez.y;
    K.ez.z = iA + iB;
    if (this.m_frequencyHz > 0) {
        K.getInverse22(this.m_mass);
        var invM = iA + iB;
        // float
        var m = invM > 0 ? 1 / invM : 0;
        // float
        var C = aB - aA - this.m_referenceAngle;
        // float
        // Frequency
        var omega = 2 * Math.PI * this.m_frequencyHz;
        // float
        // Damping coefficient
        var d = 2 * m * this.m_dampingRatio * omega;
        // float
        // Spring stiffness
        var k = m * omega * omega;
        // float
        // magic formulas
        var h = step.dt;
        // float
        this.m_gamma = h * (d + h * k);
        this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
        this.m_bias = C * h * k * this.m_gamma;
        invM += this.m_gamma;
        this.m_mass.ez.z = invM != 0 ? 1 / invM : 0;
    } else if (K.ez.z == 0) {
        K.getInverse22(this.m_mass);
        this.m_gamma = 0;
        this.m_bias = 0;
    } else {
        K.getSymInverse33(this.m_mass);
        this.m_gamma = 0;
        this.m_bias = 0;
    }
    if (step.warmStarting) {
        // Scale impulses to support a variable time step.
        this.m_impulse.mul(step.dtRatio);
        var P = Vec2.neo(this.m_impulse.x, this.m_impulse.y);
        vA.wSub(mA, P);
        wA -= iA * (Vec2.cross(this.m_rA, P) + this.m_impulse.z);
        vB.wAdd(mB, P);
        wB += iB * (Vec2.cross(this.m_rB, P) + this.m_impulse.z);
    } else {
        this.m_impulse.setZero();
    }
    this.m_bodyA.c_velocity.v = vA;
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v = vB;
    this.m_bodyB.c_velocity.w = wB;
};

WeldJoint.prototype.solveVelocityConstraints = function(step) {
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    var mA = this.m_invMassA;
    var mB = this.m_invMassB;
    // float
    var iA = this.m_invIA;
    var iB = this.m_invIB;
    // float
    if (this.m_frequencyHz > 0) {
        var Cdot2 = wB - wA;
        // float
        var impulse2 = -this.m_mass.ez.z * (Cdot2 + this.m_bias + this.m_gamma * this.m_impulse.z);
        // float
        this.m_impulse.z += impulse2;
        wA -= iA * impulse2;
        wB += iB * impulse2;
        var Cdot1 = Vec2.zero();
        Cdot1.wAdd(1, vB, 1, Vec2.cross(wB, this.m_rB));
        Cdot1.wSub(1, vA, 1, Vec2.cross(wA, this.m_rA));
        // Vec2
        var impulse1 = Vec2.neg(Mat33.mul(this.m_mass, Cdot1));
        // Vec2
        this.m_impulse.x += impulse1.x;
        this.m_impulse.y += impulse1.y;
        var P = Vec2.clone(impulse1);
        // Vec2
        vA.wSub(mA, P);
        wA -= iA * Vec2.cross(this.m_rA, P);
        vB.wAdd(mB, P);
        wB += iB * Vec2.cross(this.m_rB, P);
    } else {
        var Cdot1 = Vec2.zero();
        Cdot1.wAdd(1, vB, 1, Vec2.cross(wB, this.m_rB));
        Cdot1.wSub(1, vA, 1, Vec2.cross(wA, this.m_rA));
        // Vec2
        var Cdot2 = wB - wA;
        // float
        var Cdot = Vec3(Cdot1.x, Cdot1.y, Cdot2);
        // Vec3
        var impulse = Vec3.neg(Mat33.mul(this.m_mass, Cdot));
        // Vec3
        this.m_impulse.add(impulse);
        var P = Vec2.neo(impulse.x, impulse.y);
        vA.wSub(mA, P);
        wA -= iA * (Vec2.cross(this.m_rA, P) + impulse.z);
        vB.wAdd(mB, P);
        wB += iB * (Vec2.cross(this.m_rB, P) + impulse.z);
    }
    this.m_bodyA.c_velocity.v = vA;
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v = vB;
    this.m_bodyB.c_velocity.w = wB;
};

WeldJoint.prototype.solvePositionConstraints = function(step) {
    var cA = this.m_bodyA.c_position.c;
    var aA = this.m_bodyA.c_position.a;
    var cB = this.m_bodyB.c_position.c;
    var aB = this.m_bodyB.c_position.a;
    var qA = Rot.neo(aA), qB = Rot.neo(aB);
    var mA = this.m_invMassA, mB = this.m_invMassB;
    // float
    var iA = this.m_invIA, iB = this.m_invIB;
    // float
    var rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    var rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    var positionError, angularError;
    // float
    var K = new Mat33();
    K.ex.x = mA + mB + rA.y * rA.y * iA + rB.y * rB.y * iB;
    K.ey.x = -rA.y * rA.x * iA - rB.y * rB.x * iB;
    K.ez.x = -rA.y * iA - rB.y * iB;
    K.ex.y = K.ey.x;
    K.ey.y = mA + mB + rA.x * rA.x * iA + rB.x * rB.x * iB;
    K.ez.y = rA.x * iA + rB.x * iB;
    K.ex.z = K.ez.x;
    K.ey.z = K.ez.y;
    K.ez.z = iA + iB;
    if (this.m_frequencyHz > 0) {
        var C1 = Vec2.zero();
        C1.wAdd(1, cB, 1, rB);
        C1.wSub(1, cA, 1, rA);
        // Vec2
        positionError = C1.length();
        angularError = 0;
        var P = Vec2.neg(K.solve22(C1));
        // Vec2
        cA.wSub(mA, P);
        aA -= iA * Vec2.cross(rA, P);
        cB.wAdd(mB, P);
        aB += iB * Vec2.cross(rB, P);
    } else {
        var C1 = Vec2.zero();
        C1.wAdd(1, cB, 1, rB);
        C1.wSub(1, cA, 1, rA);
        var C2 = aB - aA - this.m_referenceAngle;
        // float
        positionError = C1.length();
        angularError = Math.abs(C2);
        var C = Vec3(C1.x, C1.y, C2);
        var impulse = Vec3();
        if (K.ez.z > 0) {
            impulse = Vec3.neg(K.solve33(C));
        } else {
            var impulse2 = Vec2.neg(K.solve22(C1));
            impulse.set(impulse2.x, impulse2.y, 0);
        }
        var P = Vec2.neo(impulse.x, impulse.y);
        cA.wSub(mA, P);
        aA -= iA * (Vec2.cross(rA, P) + impulse.z);
        cB.wAdd(mB, P);
        aB += iB * (Vec2.cross(rB, P) + impulse.z);
    }
    this.m_bodyA.c_position.c = cA;
    this.m_bodyA.c_position.a = aA;
    this.m_bodyB.c_position.c = cB;
    this.m_bodyB.c_position.a = aB;
    return positionError <= Settings.linearSlop && angularError <= Settings.angularSlop;
};


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/create":51,"../util/options":52}],37:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = WheelJoint;

var options = require("../util/options");

var create = require("../util/create");

var Settings = require("../Settings");

var Math = require("../common/Math");

var Vec2 = require("../common/Vec2");

var Vec3 = require("../common/Vec3");

var Mat22 = require("../common/Mat22");

var Mat33 = require("../common/Mat33");

var Rot = require("../common/Rot");

var Sweep = require("../common/Sweep");

var Transform = require("../common/Transform");

var Velocity = require("../common/Velocity");

var Position = require("../common/Position");

var Joint = require("../Joint");

WheelJoint.TYPE = "wheel-joint";

WheelJoint._super = Joint;

WheelJoint.prototype = create(WheelJoint._super.prototype);

/**
 * @typedef {Object} WheelJointDef
 *
 * Wheel joint definition. This requires defining a line of motion using an axis
 * and an anchor point. The definition uses local anchor points and a local axis
 * so that the initial configuration can violate the constraint slightly. The
 * joint translation is zero when the local anchor points coincide in world
 * space. Using local anchors and a local axis helps when saving and loading a
 * game.
 * 
 * @prop {boolean} enableMotor Enable/disable the joint motor.
 * @prop {float} maxMotorTorque The maximum motor torque, usually in N-m.
 * @prop {float} motorSpeed The desired motor speed in radians per second.
 * @prop {float} frequencyHz Suspension frequency, zero indicates no suspension
 * @prop {float} dampingRatio Suspension damping ratio, one indicates critical
 *       damping
 */
var WheelJointDef = {
    enableMotor: false,
    maxMotorTorque: 0,
    motorSpeed: 0,
    frequencyHz: 2,
    dampingRatio: .7
};

/**
 * A wheel joint. This joint provides two degrees of freedom: translation along
 * an axis fixed in bodyA and rotation in the plane. In other words, it is a
 * point to line constraint with a rotational motor and a linear spring/damper.
 * This joint is designed for vehicle suspensions.
 * 
 * @prop {Vec2} localAnchorA The local anchor point relative to bodyA's origin.
 * @prop {Vec2} localAnchorB The local anchor point relative to bodyB's origin.
 * @prop {Vec2} localAxisA The local translation axis in bodyA.
 */
function WheelJoint(def, bodyA, bodyB, anchor, axis) {
    if (!(this instanceof WheelJoint)) {
        return new WheelJoint(def, bodyA, bodyB, anchor, axis);
    }
    def = options(def, WheelJointDef);
    Joint.call(this, def, bodyA, bodyB);
    this.m_type = WheelJoint.TYPE;
    this.m_localAnchorA = bodyA.getLocalPoint(anchor);
    this.m_localAnchorB = bodyB.getLocalPoint(anchor);
    this.m_localXAxisA = bodyA.getLocalVector(axis || Vec2.neo(1, 0));
    this.m_localYAxisA = Vec2.cross(1, this.m_localXAxisA);
    this.m_mass = 0;
    this.m_impulse = 0;
    this.m_motorMass = 0;
    this.m_motorImpulse = 0;
    this.m_springMass = 0;
    this.m_springImpulse = 0;
    this.m_maxMotorTorque = def.maxMotorTorque;
    this.m_motorSpeed = def.motorSpeed;
    this.m_enableMotor = def.enableMotor;
    this.m_frequencyHz = def.frequencyHz;
    this.m_dampingRatio = def.dampingRatio;
    this.m_bias = 0;
    this.m_gamma = 0;
    // Solver temp
    this.m_localCenterA;
    // Vec2
    this.m_localCenterB;
    // Vec2
    this.m_invMassA;
    // float
    this.m_invMassB;
    // float
    this.m_invIA;
    // float
    this.m_invIB;
    // float
    this.m_ax = Vec2.zero();
    this.m_ay = Vec2.zero();
    // Vec2
    this.m_sAx;
    this.m_sBx;
    // float
    this.m_sAy;
    this.m_sBy;
}

/**
 * The local anchor point relative to bodyA's origin.
 */
WheelJoint.prototype.getLocalAnchorA = function() {
    return this.m_localAnchorA;
};

/**
 * The local anchor point relative to bodyB's origin.
 */
WheelJoint.prototype.getLocalAnchorB = function() {
    return this.m_localAnchorB;
};

/**
 * The local joint axis relative to bodyA.
 */
WheelJoint.prototype.getLocalAxisA = function() {
    return this.m_localXAxisA;
};

/**
 * Get the current joint translation, usually in meters.
 */
WheelJoint.prototype.getJointTranslation = function() {
    var bA = this.m_bodyA;
    var bB = this.m_bodyB;
    var pA = bA.getWorldPoint(this.m_localAnchorA);
    // Vec2
    var pB = bB.getWorldPoint(this.m_localAnchorB);
    // Vec2
    var d = pB - pA;
    // Vec2
    var axis = bA.getWorldVector(this.m_localXAxisA);
    // Vec2
    var translation = Dot(d, axis);
    // float
    return translation;
};

/**
 * Get the current joint translation speed, usually in meters per second.
 */
WheelJoint.prototype.getJointSpeed = function() {
    var wA = this.m_bodyA.m_angularVelocity;
    var wB = this.m_bodyB.m_angularVelocity;
    return wB - wA;
};

/**
 * Is the joint motor enabled?
 */
WheelJoint.prototype.isMotorEnabled = function() {
    return this.m_enableMotor;
};

/**
 * Enable/disable the joint motor.
 */
WheelJoint.prototype.enableMotor = function(flag) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_enableMotor = flag;
};

/**
 * Set the motor speed, usually in radians per second.
 */
WheelJoint.prototype.setMotorSpeed = function(speed) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_motorSpeed = speed;
};

/**
 * Get the motor speed, usually in radians per second.
 */
WheelJoint.prototype.getMotorSpeed = function() {
    return this.m_motorSpeed;
};

/**
 * Set/Get the maximum motor force, usually in N-m.
 */
WheelJoint.prototype.setMaxMotorTorque = function(torque) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_maxMotorTorque = torque;
};

WheelJoint.prototype.getMaxMotorTorque = function() {
    return this.m_maxMotorTorque;
};

/**
 * Get the current motor torque given the inverse time step, usually in N-m.
 */
WheelJoint.prototype.getMotorTorque = function(inv_dt) {
    return inv_dt * this.m_motorImpulse;
};

/**
 * Set/Get the spring frequency in hertz. Setting the frequency to zero disables
 * the spring.
 */
WheelJoint.prototype.setSpringFrequencyHz = function(hz) {
    this.m_frequencyHz = hz;
};

WheelJoint.prototype.getSpringFrequencyHz = function() {
    return this.m_frequencyHz;
};

/**
 * Set/Get the spring damping ratio
 */
WheelJoint.prototype.setSpringDampingRatio = function(ratio) {
    this.m_dampingRatio = ratio;
};

WheelJoint.prototype.getSpringDampingRatio = function() {
    return this.m_dampingRatio;
};

WheelJoint.prototype.getAnchorA = function() {
    return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
};

WheelJoint.prototype.getAnchorB = function() {
    return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
};

WheelJoint.prototype.getReactionForce = function(inv_dt) {
    return inv_dt * (this.m_impulse * this.m_ay + this.m_springImpulse * this.m_ax);
};

WheelJoint.prototype.getReactionTorque = function(inv_dt) {
    return inv_dt * this.m_motorImpulse;
};

WheelJoint.prototype.initVelocityConstraints = function(step) {
    this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
    this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
    this.m_invMassA = this.m_bodyA.m_invMass;
    this.m_invMassB = this.m_bodyB.m_invMass;
    this.m_invIA = this.m_bodyA.m_invI;
    this.m_invIB = this.m_bodyB.m_invI;
    var mA = this.m_invMassA;
    var mB = this.m_invMassB;
    // float
    var iA = this.m_invIA;
    var iB = this.m_invIB;
    // float
    var cA = this.m_bodyA.c_position.c;
    var aA = this.m_bodyA.c_position.a;
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var cB = this.m_bodyB.c_position.c;
    var aB = this.m_bodyB.c_position.a;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    var qA = Rot.neo(aA);
    var qB = Rot.neo(aB);
    // Compute the effective masses.
    var rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    // Vec2
    var rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    // Vec2
    var d = Vec2.zero();
    d.wAdd(1, cB, 1, rB);
    d.wSub(1, cA, 1, rA);
    // Vec2
    // Point to line constraint
    {
        this.m_ay = Rot.mul(qA, this.m_localYAxisA);
        this.m_sAy = Vec2.cross(Vec2.add(d, rA), this.m_ay);
        this.m_sBy = Vec2.cross(rB, this.m_ay);
        this.m_mass = mA + mB + iA * this.m_sAy * this.m_sAy + iB * this.m_sBy * this.m_sBy;
        if (this.m_mass > 0) {
            this.m_mass = 1 / this.m_mass;
        }
    }
    // Spring constraint
    this.m_springMass = 0;
    this.m_bias = 0;
    this.m_gamma = 0;
    if (this.m_frequencyHz > 0) {
        this.m_ax = Rot.mul(qA, this.m_localXAxisA);
        this.m_sAx = Vec2.cross(Vec2.add(d, rA), this.m_ax);
        this.m_sBx = Vec2.cross(rB, this.m_ax);
        var invMass = mA + mB + iA * this.m_sAx * this.m_sAx + iB * this.m_sBx * this.m_sBx;
        // float
        if (invMass > 0) {
            this.m_springMass = 1 / invMass;
            var C = Vec2.dot(d, this.m_ax);
            // float
            // Frequency
            var omega = 2 * Math.PI * this.m_frequencyHz;
            // float
            // Damping coefficient
            var d = 2 * this.m_springMass * this.m_dampingRatio * omega;
            // float
            // Spring stiffness
            var k = this.m_springMass * omega * omega;
            // float
            // magic formulas
            var h = step.dt;
            // float
            this.m_gamma = h * (d + h * k);
            if (this.m_gamma > 0) {
                this.m_gamma = 1 / this.m_gamma;
            }
            this.m_bias = C * h * k * this.m_gamma;
            this.m_springMass = invMass + this.m_gamma;
            if (this.m_springMass > 0) {
                this.m_springMass = 1 / this.m_springMass;
            }
        }
    } else {
        this.m_springImpulse = 0;
    }
    // Rotational motor
    if (this.m_enableMotor) {
        this.m_motorMass = iA + iB;
        if (this.m_motorMass > 0) {
            this.m_motorMass = 1 / this.m_motorMass;
        }
    } else {
        this.m_motorMass = 0;
        this.m_motorImpulse = 0;
    }
    if (step.warmStarting) {
        // Account for variable time step.
        this.m_impulse *= step.dtRatio;
        this.m_springImpulse *= step.dtRatio;
        this.m_motorImpulse *= step.dtRatio;
        var P = Vec2.wAdd(this.m_impulse, this.m_ay, this.m_springImpulse, this.m_ax);
        var LA = this.m_impulse * this.m_sAy + this.m_springImpulse * this.m_sAx + this.m_motorImpulse;
        var LB = this.m_impulse * this.m_sBy + this.m_springImpulse * this.m_sBx + this.m_motorImpulse;
        vA.wSub(this.m_invMassA, P);
        wA -= this.m_invIA * LA;
        vB.wAdd(this.m_invMassB, P);
        wB += this.m_invIB * LB;
    } else {
        this.m_impulse = 0;
        this.m_springImpulse = 0;
        this.m_motorImpulse = 0;
    }
    this.m_bodyA.c_velocity.v.set(vA);
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v.set(vB);
    this.m_bodyB.c_velocity.w = wB;
};

WheelJoint.prototype.solveVelocityConstraints = function(step) {
    var mA = this.m_invMassA;
    var mB = this.m_invMassB;
    // float
    var iA = this.m_invIA;
    var iB = this.m_invIB;
    // float
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    // Solve spring constraint
    {
        var Cdot = Vec2.dot(this.m_ax, vB) - Vec2.dot(this.m_ax, vA) + this.m_sBx * wB - this.m_sAx * wA;
        // float
        var impulse = -this.m_springMass * (Cdot + this.m_bias + this.m_gamma * this.m_springImpulse);
        // float
        this.m_springImpulse += impulse;
        var P = Vec2.zero().wSet(impulse, this.m_ax);
        // Vec2
        var LA = impulse * this.m_sAx;
        // float
        var LB = impulse * this.m_sBx;
        // float
        vA.wSub(mA, P);
        wA -= iA * LA;
        vB.wAdd(mB, P);
        wB += iB * LB;
    }
    // Solve rotational motor constraint
    {
        var Cdot = wB - wA - this.m_motorSpeed;
        // float
        var impulse = -this.m_motorMass * Cdot;
        // float
        var oldImpulse = this.m_motorImpulse;
        // float
        var maxImpulse = step.dt * this.m_maxMotorTorque;
        // float
        this.m_motorImpulse = Math.clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
        impulse = this.m_motorImpulse - oldImpulse;
        wA -= iA * impulse;
        wB += iB * impulse;
    }
    // Solve point to line constraint
    {
        var Cdot = Vec2.dot(this.m_ay, vB) - Vec2.dot(this.m_ay, vA) + this.m_sBy * wB - this.m_sAy * wA;
        // float
        var impulse = -this.m_mass * Cdot;
        // float
        this.m_impulse += impulse;
        var P = Vec2.zero().wSet(impulse, this.m_ay);
        // Vec2
        var LA = impulse * this.m_sAy;
        // float
        var LB = impulse * this.m_sBy;
        // float
        vA.wSub(mA, P);
        wA -= iA * LA;
        vB.wAdd(mB, P);
        wB += iB * LB;
    }
    this.m_bodyA.c_velocity.v.set(vA);
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v.set(vB);
    this.m_bodyB.c_velocity.w = wB;
};

WheelJoint.prototype.solvePositionConstraints = function(step) {
    var cA = this.m_bodyA.c_position.c;
    var aA = this.m_bodyA.c_position.a;
    var cB = this.m_bodyB.c_position.c;
    var aB = this.m_bodyB.c_position.a;
    var qA = Rot.neo(aA);
    var qB = Rot.neo(aB);
    var rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    // Vec2
    var rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    // Vec2
    var d = Vec2.zero();
    d.wAdd(1, cB, 1, rB);
    d.wSub(1, cA, 1, rA);
    // Vec2
    var ay = Rot.mul(qA, this.m_localYAxisA);
    // Vec2
    var sAy = Vec2.cross(Vec2.sub(d, rA), ay);
    // float
    var sBy = Vec2.cross(rB, ay);
    // float
    var C = Vec2.dot(d, ay);
    // float
    var k = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_sAy * this.m_sAy + this.m_invIB * this.m_sBy * this.m_sBy;
    // float
    var impulse;
    // float
    if (k != 0) {
        impulse = -C / k;
    } else {
        impulse = 0;
    }
    var P = Vec2.zero().wSet(impulse, ay);
    // Vec2
    var LA = impulse * sAy;
    // float
    var LB = impulse * sBy;
    // float
    cA.wSub(this.m_invMassA, P);
    aA -= this.m_invIA * LA;
    cB.wAdd(this.m_invMassB, P);
    aB += this.m_invIB * LB;
    this.m_bodyA.c_position.c.set(cA);
    this.m_bodyA.c_position.a = aA;
    this.m_bodyB.c_position.c.set(cB);
    this.m_bodyB.c_position.a = aB;
    return Math.abs(C) <= Settings.linearSlop;
};


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/create":51,"../util/options":52}],38:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = BoxShape;

var common = require("../util/common");

var create = require("../util/create");

var options = require("../util/options");

var Math = require("../common/Math");

var Transform = require("../common/Transform");

var Rot = require("../common/Rot");

var Vec2 = require("../common/Vec2");

var AABB = require("../collision/AABB");

var Settings = require("../Settings");

var PolygonShape = require("./PolygonShape");

BoxShape._super = PolygonShape;

BoxShape.prototype = create(BoxShape._super.prototype);

BoxShape.TYPE = "polygon";

/**
 * A rectangle polygon which extend PolygonShape.
 */
function BoxShape(hx, hy, center, angle) {
    if (!(this instanceof BoxShape)) {
        return new BoxShape(hx, hy, center, angle);
    }
    BoxShape._super.call(this);
    this.m_vertices[0] = Vec2.neo(-hx, -hy);
    this.m_vertices[1] = Vec2.neo(hx, -hy);
    this.m_vertices[2] = Vec2.neo(hx, hy);
    this.m_vertices[3] = Vec2.neo(-hx, hy);
    this.m_normals[0] = Vec2.neo(0, -1);
    this.m_normals[1] = Vec2.neo(1, 0);
    this.m_normals[2] = Vec2.neo(0, 1);
    this.m_normals[3] = Vec2.neo(-1, 0);
    this.m_count = 4;
    if (center && "x" in center && "y" in center) {
        angle = angle || 0;
        this.m_centroid.set(center);
        var xf = Transform.identity();
        xf.p.set(center);
        xf.q.set(angle);
        // Transform vertices and normals.
        for (var i = 0; i < this.m_count; ++i) {
            this.m_vertices[i] = Transform.mul(xf, this.m_vertices[i]);
            this.m_normals[i] = Rot.mul(xf.q, this.m_normals[i]);
        }
    }
}


},{"../Settings":7,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"../util/options":52,"./PolygonShape":47}],39:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = ChainShape;

var common = require("../util/common");

var create = require("../util/create");

var options = require("../util/options");

var Math = require("../common/Math");

var Transform = require("../common/Transform");

var Rot = require("../common/Rot");

var Vec2 = require("../common/Vec2");

var AABB = require("../collision/AABB");

var Settings = require("../Settings");

var Shape = require("../Shape");

var EdgeShape = require("./EdgeShape");

ChainShape._super = Shape;

ChainShape.prototype = create(ChainShape._super.prototype);

ChainShape.TYPE = "chain";

/**
 * A chain shape is a free form sequence of line segments. The chain has
 * two-sided collision, so you can use inside and outside collision. Therefore,
 * you may use any winding order. Connectivity information is used to create
 * smooth collisions.
 * 
 * WARNING: The chain will not collide properly if there are self-intersections.
 */
function ChainShape(vertices, loop) {
    if (!(this instanceof ChainShape)) {
        return new ChainShape(vertices, loop);
    }
    ChainShape._super.call(this);
    this.m_type = ChainShape.TYPE;
    this.m_radius = Settings.polygonRadius;
    this.m_vertices = [];
    this.m_count = 0;
    this.m_prevVertex = null;
    this.m_nextVertex = null;
    this.m_hasPrevVertex = false;
    this.m_hasNextVertex = false;
    if (vertices && vertices.length) {
        if (loop) {
            this._createLoop(vertices);
        } else {
            this._createChain(vertices);
        }
    }
}

// ChainShape.clear = function() {
// this.m_vertices.length = 0;
// this.m_count = 0;
// }
/**
 * Create a loop. This automatically adjusts connectivity.
 * 
 * @param vertices an array of vertices, these are copied
 * @param count the vertex count
 */
ChainShape.prototype._createLoop = function(vertices) {
    ASSERT && common.assert(this.m_vertices.length == 0 && this.m_count == 0);
    ASSERT && common.assert(vertices.length >= 3);
    for (var i = 1; i < vertices.length; ++i) {
        var v1 = vertices[i - 1];
        var v2 = vertices[i];
        // If the code crashes here, it means your vertices are too close together.
        ASSERT && common.assert(Vec2.distanceSquared(v1, v2) > Settings.linearSlopSquared);
    }
    this.m_vertices.length = 0;
    this.m_count = vertices.length + 1;
    for (var i = 0; i < vertices.length; ++i) {
        this.m_vertices[i] = vertices[i].clone();
    }
    this.m_vertices[vertices.length] = vertices[0].clone();
    this.m_prevVertex = this.m_vertices[this.m_count - 2];
    this.m_nextVertex = this.m_vertices[1];
    this.m_hasPrevVertex = true;
    this.m_hasNextVertex = true;
    return this;
};

/**
 * Create a chain with isolated end vertices.
 * 
 * @param vertices an array of vertices, these are copied
 * @param count the vertex count
 */
ChainShape.prototype._createChain = function(vertices) {
    ASSERT && common.assert(this.m_vertices.length == 0 && this.m_count == 0);
    ASSERT && common.assert(vertices.length >= 2);
    for (var i = 1; i < vertices.length; ++i) {
        // If the code crashes here, it means your vertices are too close together.
        var v1 = vertices[i - 1];
        var v2 = vertices[i];
        ASSERT && common.assert(Vec2.distanceSquared(v1, v2) > Settings.linearSlopSquared);
    }
    this.m_count = vertices.length;
    for (var i = 0; i < vertices.length; ++i) {
        this.m_vertices[i] = vertices[i].clone();
    }
    this.m_hasPrevVertex = false;
    this.m_hasNextVertex = false;
    this.m_prevVertex = null;
    this.m_nextVertex = null;
    return this;
};

/**
 * Establish connectivity to a vertex that precedes the first vertex. Don't call
 * this for loops.
 */
ChainShape.prototype._setPrevVertex = function(prevVertex) {
    this.m_prevVertex = prevVertex;
    this.m_hasPrevVertex = true;
};

/**
 * Establish connectivity to a vertex that follows the last vertex. Don't call
 * this for loops.
 */
ChainShape.prototype._setNextVertex = function(nextVertex) {
    this.m_nextVertex = nextVertex;
    this.m_hasNextVertex = true;
};

ChainShape.prototype._clone = function() {
    var clone = new ChainShape();
    clone.createChain(this.m_vertices);
    clone.m_type = this.m_type;
    clone.m_radius = this.m_radius;
    clone.m_prevVertex = this.m_prevVertex;
    clone.m_nextVertex = this.m_nextVertex;
    clone.m_hasPrevVertex = this.m_hasPrevVertex;
    clone.m_hasNextVertex = this.m_hasNextVertex;
    return clone;
};

ChainShape.prototype.getChildCount = function() {
    // edge count = vertex count - 1
    return this.m_count - 1;
};

// Get a child edge.
ChainShape.prototype.getChildEdge = function(edge, childIndex) {
    ASSERT && common.assert(0 <= childIndex && childIndex < this.m_count - 1);
    edge.m_type = EdgeShape.TYPE;
    edge.m_radius = this.m_radius;
    edge.m_vertex1 = this.m_vertices[childIndex];
    edge.m_vertex2 = this.m_vertices[childIndex + 1];
    if (childIndex > 0) {
        edge.m_vertex0 = this.m_vertices[childIndex - 1];
        edge.m_hasVertex0 = true;
    } else {
        edge.m_vertex0 = this.m_prevVertex;
        edge.m_hasVertex0 = this.m_hasPrevVertex;
    }
    if (childIndex < this.m_count - 2) {
        edge.m_vertex3 = this.m_vertices[childIndex + 2];
        edge.m_hasVertex3 = true;
    } else {
        edge.m_vertex3 = this.m_nextVertex;
        edge.m_hasVertex3 = this.m_hasNextVertex;
    }
};

ChainShape.prototype.getVertex = function(index) {
    ASSERT && common.assert(0 <= index && index <= this.m_count);
    if (index < this.m_count) {
        return this.m_vertices[index];
    } else {
        return this.m_vertices[0];
    }
};

/**
 * This always return false.
 */
ChainShape.prototype.testPoint = function(xf, p) {
    return false;
};

ChainShape.prototype.rayCast = function(output, input, xf, childIndex) {
    ASSERT && common.assert(0 <= childIndex && childIndex < this.m_count);
    var edgeShape = new EdgeShape(this.getVertex(childIndex), this.getVertex(childIndex + 1));
    return edgeShape.rayCast(output, input, xf, 0);
};

ChainShape.prototype.computeAABB = function(aabb, xf, childIndex) {
    ASSERT && common.assert(0 <= childIndex && childIndex < this.m_count);
    var v1 = Transform.mul(xf, this.getVertex(childIndex));
    var v2 = Transform.mul(xf, this.getVertex(childIndex + 1));
    aabb.combinePoints(v1, v2);
};

/**
 * Chains have zero mass.
 */
ChainShape.prototype.computeMass = function(massData, density) {
    massData.mass = 0;
    massData.center = Vec2.neo();
    massData.I = 0;
};

ChainShape.prototype.computeDistanceProxy = function(proxy, childIndex) {
    ASSERT && common.assert(0 <= childIndex && childIndex < this.m_count);
    proxy.m_buffer[0] = this.getVertex(childIndex);
    proxy.m_buffer[1] = this.getVertex(childIndex + 1);
    proxy.m_vertices = proxy.m_buffer;
    proxy.m_count = 2;
    proxy.m_radius = this.m_radius;
};


},{"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"../util/options":52,"./EdgeShape":46}],40:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = CircleShape;

var common = require("../util/common");

var create = require("../util/create");

var options = require("../util/options");

var Math = require("../common/Math");

var Transform = require("../common/Transform");

var Rot = require("../common/Rot");

var Vec2 = require("../common/Vec2");

var AABB = require("../collision/AABB");

var Settings = require("../Settings");

var Shape = require("../Shape");

CircleShape._super = Shape;

CircleShape.prototype = create(CircleShape._super.prototype);

CircleShape.TYPE = "circle";

function CircleShape(a, b) {
    if (!(this instanceof CircleShape)) {
        return new CircleShape(a, b);
    }
    CircleShape._super.call(this);
    this.m_type = CircleShape.TYPE;
    this.m_p = Vec2.zero();
    this.m_radius = 1;
    if (typeof a === "object" && Vec2.isValid(a)) {
        this.m_p.set(a);
        if (typeof b === "number") {
            this.m_radius = b;
        }
    } else if (typeof a === "number") {
        this.m_radius = a;
    }
}

CircleShape.prototype.getRadius = function() {
    return this.m_radius;
};

CircleShape.prototype.getCenter = function() {
    return this.m_p;
};

CircleShape.prototype.getSupportVertex = function(d) {
    return this.m_p;
};

CircleShape.prototype.getVertex = function(index) {
    ASSERT && common.assert(index == 0);
    return this.m_p;
};

CircleShape.prototype.getVertexCount = function(index) {
    return 1;
};

CircleShape.prototype._clone = function() {
    var clone = new CircleShape();
    clone.m_type = this.m_type;
    clone.m_radius = this.m_radius;
    clone.m_p = this.m_p.clone();
    return clone;
};

CircleShape.prototype.getChildCount = function() {
    return 1;
};

CircleShape.prototype.testPoint = function(xf, p) {
    var center = Vec2.add(xf.p, Rot.mul(xf.q, this.m_p));
    var d = Vec2.sub(p, center);
    return Vec2.dot(d, d) <= this.m_radius * this.m_radius;
};

// Collision Detection in Interactive 3D Environments by Gino van den Bergen
// From Section 3.1.2
// x = s + a * r
// norm(x) = radius
CircleShape.prototype.rayCast = function(output, input, xf, childIndex) {
    var position = Vec2.add(xf.p, Rot.mul(xf.q, this.m_p));
    var s = Vec2.sub(input.p1, position);
    var b = Vec2.dot(s, s) - this.m_radius * this.m_radius;
    // Solve quadratic equation.
    var r = Vec2.sub(input.p2, input.p1);
    var c = Vec2.dot(s, r);
    var rr = Vec2.dot(r, r);
    var sigma = c * c - rr * b;
    // Check for negative discriminant and short segment.
    if (sigma < 0 || rr < Math.EPSILON) {
        return false;
    }
    // Find the point of intersection of the line with the circle.
    var a = -(c + Math.sqrt(sigma));
    // Is the intersection point on the segment?
    if (0 <= a && a <= input.maxFraction * rr) {
        a /= rr;
        output.fraction = a;
        output.normal = Vec2.add(s, Vec2.mul(a, r));
        output.normal.normalize();
        return true;
    }
    return false;
};

CircleShape.prototype.computeAABB = function(aabb, xf, childIndex) {
    var p = Vec2.add(xf.p, Rot.mul(xf.q, this.m_p));
    aabb.lowerBound.set(p.x - this.m_radius, p.y - this.m_radius);
    aabb.upperBound.set(p.x + this.m_radius, p.y + this.m_radius);
};

CircleShape.prototype.computeMass = function(massData, density) {
    massData.mass = density * Math.PI * this.m_radius * this.m_radius;
    massData.center = this.m_p;
    // inertia about the local origin
    massData.I = massData.mass * (.5 * this.m_radius * this.m_radius + Vec2.dot(this.m_p, this.m_p));
};

CircleShape.prototype.computeDistanceProxy = function(proxy) {
    proxy.m_vertices.push(this.m_p);
    proxy.m_count = 1;
    proxy.m_radius = this.m_radius;
};


},{"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"../util/options":52}],41:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

var common = require("../util/common");

var create = require("../util/create");

var Math = require("../common/Math");

var Transform = require("../common/Transform");

var Vec2 = require("../common/Vec2");

var Settings = require("../Settings");

var Shape = require("../Shape");

var Contact = require("../Contact");

var Manifold = require("../Manifold");

var CircleShape = require("./CircleShape");

Contact.addType(CircleShape.TYPE, CircleShape.TYPE, CircleCircleContact);

function CircleCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
    ASSERT && common.assert(fixtureA.getType() == CircleShape.TYPE);
    ASSERT && common.assert(fixtureB.getType() == CircleShape.TYPE);
    CollideCircles(manifold, fixtureA.getShape(), xfA, fixtureB.getShape(), xfB);
}

function CollideCircles(manifold, circleA, xfA, circleB, xfB) {
    manifold.pointCount = 0;
    var pA = Transform.mul(xfA, circleA.m_p);
    var pB = Transform.mul(xfB, circleB.m_p);
    var distSqr = Vec2.distanceSquared(pB, pA);
    var rA = circleA.m_radius;
    var rB = circleB.m_radius;
    var radius = rA + rB;
    if (distSqr > radius * radius) {
        return;
    }
    manifold.type = Manifold.e_circles;
    manifold.localPoint.set(circleA.m_p);
    manifold.localNormal.setZero();
    manifold.pointCount = 1;
    manifold.points[0].localPoint.set(circleB.m_p);
    manifold.points[0].id.key = 0;
}

exports.CollideCircles = CollideCircles;


},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../common/Math":18,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"./CircleShape":40}],42:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

var common = require("../util/common");

var Math = require("../common/Math");

var Transform = require("../common/Transform");

var Rot = require("../common/Rot");

var Vec2 = require("../common/Vec2");

var AABB = require("../collision/AABB");

var Settings = require("../Settings");

var Manifold = require("../Manifold");

var Contact = require("../Contact");

var Shape = require("../Shape");

var CircleShape = require("./CircleShape");

var PolygonShape = require("./PolygonShape");

Contact.addType(PolygonShape.TYPE, CircleShape.TYPE, PolygonCircleContact);

function PolygonCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
    ASSERT && common.assert(fixtureA.getType() == PolygonShape.TYPE);
    ASSERT && common.assert(fixtureB.getType() == CircleShape.TYPE);
    CollidePolygonCircle(manifold, fixtureA.getShape(), xfA, fixtureB.getShape(), xfB);
}

function CollidePolygonCircle(manifold, polygonA, xfA, circleB, xfB) {
    manifold.pointCount = 0;
    // Compute circle position in the frame of the polygon.
    var c = Transform.mul(xfB, circleB.m_p);
    var cLocal = Transform.mulT(xfA, c);
    // Find the min separating edge.
    var normalIndex = 0;
    var separation = -Infinity;
    var radius = polygonA.m_radius + circleB.m_radius;
    var vertexCount = polygonA.m_count;
    var vertices = polygonA.m_vertices;
    var normals = polygonA.m_normals;
    for (var i = 0; i < vertexCount; ++i) {
        var s = Vec2.dot(normals[i], Vec2.sub(cLocal, vertices[i]));
        if (s > radius) {
            // Early out.
            return;
        }
        if (s > separation) {
            separation = s;
            normalIndex = i;
        }
    }
    // Vertices that subtend the incident face.
    var vertIndex1 = normalIndex;
    var vertIndex2 = vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0;
    var v1 = vertices[vertIndex1];
    var v2 = vertices[vertIndex2];
    // If the center is inside the polygon ...
    if (separation < Math.EPSILON) {
        manifold.pointCount = 1;
        manifold.type = Manifold.e_faceA;
        manifold.localNormal.set(normals[normalIndex]);
        manifold.localPoint.wSet(.5, v1, .5, v2);
        manifold.points[0].localPoint = circleB.m_p;
        manifold.points[0].id.key = 0;
        return;
    }
    // Compute barycentric coordinates
    var u1 = Vec2.dot(Vec2.sub(cLocal, v1), Vec2.sub(v2, v1));
    var u2 = Vec2.dot(Vec2.sub(cLocal, v2), Vec2.sub(v1, v2));
    if (u1 <= 0) {
        if (Vec2.distanceSquared(cLocal, v1) > radius * radius) {
            return;
        }
        manifold.pointCount = 1;
        manifold.type = Manifold.e_faceA;
        manifold.localNormal.wSet(1, cLocal, -1, v1);
        manifold.localNormal.normalize();
        manifold.localPoint = v1;
        manifold.points[0].localPoint.set(circleB.m_p);
        manifold.points[0].id.key = 0;
    } else if (u2 <= 0) {
        if (Vec2.distanceSquared(cLocal, v2) > radius * radius) {
            return;
        }
        manifold.pointCount = 1;
        manifold.type = Manifold.e_faceA;
        manifold.localNormal.wSet(1, cLocal, -1, v2);
        manifold.localNormal.normalize();
        manifold.localPoint.set(v2);
        manifold.points[0].localPoint.set(circleB.m_p);
        manifold.points[0].id.key = 0;
    } else {
        var faceCenter = Vec2.mid(v1, v2);
        var separation = Vec2.dot(cLocal, normals[vertIndex1]) - Vec2.dot(faceCenter, normals[vertIndex1]);
        if (separation > radius) {
            return;
        }
        manifold.pointCount = 1;
        manifold.type = Manifold.e_faceA;
        manifold.localNormal.set(normals[vertIndex1]);
        manifold.localPoint.set(faceCenter);
        manifold.points[0].localPoint.set(circleB.m_p);
        manifold.points[0].id.key = 0;
    }
}


},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"./CircleShape":40,"./PolygonShape":47}],43:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

var common = require("../util/common");

var create = require("../util/create");

var Math = require("../common/Math");

var Transform = require("../common/Transform");

var Vec2 = require("../common/Vec2");

var Rot = require("../common/Rot");

var Settings = require("../Settings");

var Shape = require("../Shape");

var Contact = require("../Contact");

var Manifold = require("../Manifold");

var EdgeShape = require("./EdgeShape");

var ChainShape = require("./ChainShape");

var CircleShape = require("./CircleShape");

Contact.addType(EdgeShape.TYPE, CircleShape.TYPE, EdgeCircleContact);

Contact.addType(ChainShape.TYPE, CircleShape.TYPE, ChainCircleContact);

function EdgeCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
    ASSERT && common.assert(fixtureA.getType() == EdgeShape.TYPE);
    ASSERT && common.assert(fixtureB.getType() == CircleShape.TYPE);
    var shapeA = fixtureA.getShape();
    var shapeB = fixtureB.getShape();
    CollideEdgeCircle(manifold, shapeA, xfA, shapeB, xfB);
}

function ChainCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
    ASSERT && common.assert(fixtureA.getType() == ChainShape.TYPE);
    ASSERT && common.assert(fixtureB.getType() == CircleShape.TYPE);
    var chain = fixtureA.getShape();
    var edge = new EdgeShape();
    chain.getChildEdge(edge, indexA);
    var shapeA = edge;
    var shapeB = fixtureB.getShape();
    CollideEdgeCircle(manifold, shapeA, xfA, shapeB, xfB);
}

// Compute contact points for edge versus circle.
// This accounts for edge connectivity.
function CollideEdgeCircle(manifold, edgeA, xfA, circleB, xfB) {
    manifold.pointCount = 0;
    // Compute circle in frame of edge
    var Q = Transform.mulT(xfA, Transform.mul(xfB, circleB.m_p));
    var A = edgeA.m_vertex1;
    var B = edgeA.m_vertex2;
    var e = Vec2.sub(B, A);
    // Barycentric coordinates
    var u = Vec2.dot(e, Vec2.sub(B, Q));
    var v = Vec2.dot(e, Vec2.sub(Q, A));
    var radius = edgeA.m_radius + circleB.m_radius;
    // Region A
    if (v <= 0) {
        var P = Vec2.clone(A);
        var d = Vec2.sub(Q, P);
        var dd = Vec2.dot(d, d);
        if (dd > radius * radius) {
            return;
        }
        // Is there an edge connected to A?
        if (edgeA.m_hasVertex0) {
            var A1 = edgeA.m_vertex0;
            var B1 = A;
            var e1 = Vec2.sub(B1, A1);
            var u1 = Vec2.dot(e1, Vec2.sub(B1, Q));
            // Is the circle in Region AB of the previous edge?
            if (u1 > 0) {
                return;
            }
        }
        manifold.type = Manifold.e_circles;
        manifold.localNormal.setZero();
        manifold.localPoint.set(P);
        manifold.pointCount = 1;
        manifold.points[0].localPoint.set(circleB.m_p);
        manifold.points[0].id.key = 0;
        manifold.points[0].id.cf.indexA = 0;
        manifold.points[0].id.cf.typeA = Manifold.e_vertex;
        manifold.points[0].id.cf.indexB = 0;
        manifold.points[0].id.cf.typeB = Manifold.e_vertex;
        return;
    }
    // Region B
    if (u <= 0) {
        var P = Vec2.clone(B);
        var d = Vec2.sub(Q, P);
        var dd = Vec2.dot(d, d);
        if (dd > radius * radius) {
            return;
        }
        // Is there an edge connected to B?
        if (edgeA.m_hasVertex3) {
            var B2 = edgeA.m_vertex3;
            var A2 = B;
            var e2 = Vec2.sub(B2, A2);
            var v2 = Vec2.dot(e2, Vec2.sub(Q, A2));
            // Is the circle in Region AB of the next edge?
            if (v2 > 0) {
                return;
            }
        }
        manifold.type = Manifold.e_circles;
        manifold.localNormal.setZero();
        manifold.localPoint.set(P);
        manifold.pointCount = 1;
        manifold.points[0].localPoint.set(circleB.m_p);
        manifold.points[0].id.key = 0;
        manifold.points[0].id.cf.indexA = 1;
        manifold.points[0].id.cf.typeA = Manifold.e_vertex;
        manifold.points[0].id.cf.indexB = 0;
        manifold.points[0].id.cf.typeB = Manifold.e_vertex;
        return;
    }
    // Region AB
    var den = Vec2.dot(e, e);
    ASSERT && common.assert(den > 0);
    var P = Vec2.wAdd(u / den, A, v / den, B);
    var d = Vec2.sub(Q, P);
    var dd = Vec2.dot(d, d);
    if (dd > radius * radius) {
        return;
    }
    var n = Vec2.neo(-e.y, e.x);
    if (Vec2.dot(n, Vec2.sub(Q, A)) < 0) {
        n.set(-n.x, -n.y);
    }
    n.normalize();
    manifold.type = Manifold.e_faceA;
    manifold.localNormal = n;
    manifold.localPoint.set(A);
    manifold.pointCount = 1;
    manifold.points[0].localPoint.set(circleB.m_p);
    manifold.points[0].id.key = 0;
    manifold.points[0].id.cf.indexA = 0;
    manifold.points[0].id.cf.typeA = Manifold.e_face;
    manifold.points[0].id.cf.indexB = 0;
    manifold.points[0].id.cf.typeB = Manifold.e_vertex;
}


},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"./ChainShape":39,"./CircleShape":40,"./EdgeShape":46}],44:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

var common = require("../util/common");

var create = require("../util/create");

var Math = require("../common/Math");

var Transform = require("../common/Transform");

var Vec2 = require("../common/Vec2");

var Rot = require("../common/Rot");

var Settings = require("../Settings");

var Shape = require("../Shape");

var Contact = require("../Contact");

var Manifold = require("../Manifold");

var EdgeShape = require("./EdgeShape");

var ChainShape = require("./ChainShape");

var PolygonShape = require("./PolygonShape");

Contact.addType(EdgeShape.TYPE, PolygonShape.TYPE, EdgePolygonContact);

Contact.addType(ChainShape.TYPE, PolygonShape.TYPE, ChainPolygonContact);

function EdgePolygonContact(manifold, xfA, fA, indexA, xfB, fB, indexB) {
    ASSERT && common.assert(fA.getType() == EdgeShape.TYPE);
    ASSERT && common.assert(fB.getType() == PolygonShape.TYPE);
    CollideEdgePolygon(manifold, fA.getShape(), xfA, fB.getShape(), xfB);
}

function ChainPolygonContact(manifold, xfA, fA, indexA, xfB, fB, indexB) {
    ASSERT && common.assert(fA.getType() == ChainShape.TYPE);
    ASSERT && common.assert(fB.getType() == PolygonShape.TYPE);
    var chain = fA.getShape();
    var edge = new EdgeShape();
    chain.getChildEdge(edge, indexA);
    CollideEdgePolygon(manifold, edge, xfA, fB.getShape(), xfB);
}

// EPAxis Type
var e_unknown = -1;

var e_edgeA = 1;

var e_edgeB = 2;

// VertexType unused?
var e_isolated = 0;

var e_concave = 1;

var e_convex = 2;

// This structure is used to keep track of the best separating axis.
function EPAxis() {
    this.type;
    // Type
    this.index;
    this.separation;
}

// This holds polygon B expressed in frame A.
function TempPolygon() {
    this.vertices = [];
    // Vec2[Settings.maxPolygonVertices]
    this.normals = [];
    // Vec2[Settings.maxPolygonVertices];
    this.count = 0;
}

// Reference face used for clipping
function ReferenceFace() {
    this.i1, this.i2;
    // int
    this.v1, this.v2;
    // v
    this.normal = Vec2.zero();
    this.sideNormal1 = Vec2.zero();
    this.sideOffset1;
    // float
    this.sideNormal2 = Vec2.zero();
    this.sideOffset2;
}

// reused
var edgeAxis = new EPAxis();

var polygonAxis = new EPAxis();

var polygonBA = new TempPolygon();

var rf = new ReferenceFace();

/**
 * This function collides and edge and a polygon, taking into account edge
 * adjacency.
 */
function CollideEdgePolygon(manifold, edgeA, xfA, polygonB, xfB) {
    DEBUG && common.debug("CollideEdgePolygon");
    // Algorithm:
    // 1. Classify v1 and v2
    // 2. Classify polygon centroid as front or back
    // 3. Flip normal if necessary
    // 4. Initialize normal range to [-pi, pi] about face normal
    // 5. Adjust normal range according to adjacent edges
    // 6. Visit each separating axes, only accept axes within the range
    // 7. Return if _any_ axis indicates separation
    // 8. Clip
    var m_type1, m_type2;
    // VertexType unused?
    var xf = Transform.mulT(xfA, xfB);
    var centroidB = Transform.mul(xf, polygonB.m_centroid);
    var v0 = edgeA.m_vertex0;
    var v1 = edgeA.m_vertex1;
    var v2 = edgeA.m_vertex2;
    var v3 = edgeA.m_vertex3;
    var hasVertex0 = edgeA.m_hasVertex0;
    var hasVertex3 = edgeA.m_hasVertex3;
    var edge1 = Vec2.sub(v2, v1);
    edge1.normalize();
    var normal1 = Vec2.neo(edge1.y, -edge1.x);
    var offset1 = Vec2.dot(normal1, Vec2.sub(centroidB, v1));
    var offset0 = 0;
    var offset2 = 0;
    var convex1 = false;
    var convex2 = false;
    // Is there a preceding edge?
    if (hasVertex0) {
        var edge0 = Vec2.sub(v1, v0);
        edge0.normalize();
        var normal0 = Vec2.neo(edge0.y, -edge0.x);
        convex1 = Vec2.cross(edge0, edge1) >= 0;
        offset0 = Vec2.dot(normal0, centroidB) - Vec2.dot(normal0, v0);
    }
    // Is there a following edge?
    if (hasVertex3) {
        var edge2 = Vec2.sub(v3, v2);
        edge2.normalize();
        var normal2 = Vec2.neo(edge2.y, -edge2.x);
        convex2 = Vec2.cross(edge1, edge2) > 0;
        offset2 = Vec2.dot(normal2, centroidB) - Vec2.dot(normal2, v2);
    }
    var front;
    var normal = Vec2.zero();
    var lowerLimit = Vec2.zero();
    var upperLimit = Vec2.zero();
    // Determine front or back collision. Determine collision normal limits.
    if (hasVertex0 && hasVertex3) {
        if (convex1 && convex2) {
            front = offset0 >= 0 || offset1 >= 0 || offset2 >= 0;
            if (front) {
                normal.set(normal1);
                lowerLimit.set(normal0);
                upperLimit.set(normal2);
            } else {
                normal.wSet(-1, normal1);
                lowerLimit.wSet(-1, normal1);
                upperLimit.wSet(-1, normal1);
            }
        } else if (convex1) {
            front = offset0 >= 0 || offset1 >= 0 && offset2 >= 0;
            if (front) {
                normal.set(normal1);
                lowerLimit.set(normal0);
                upperLimit.set(normal1);
            } else {
                normal.wSet(-1, normal1);
                lowerLimit.wSet(-1, normal2);
                upperLimit.wSet(-1, normal1);
            }
        } else if (convex2) {
            front = offset2 >= 0 || offset0 >= 0 && offset1 >= 0;
            if (front) {
                normal.set(normal1);
                lowerLimit.set(normal1);
                upperLimit.set(normal2);
            } else {
                normal.wSet(-1, normal1);
                lowerLimit.wSet(-1, normal1);
                upperLimit.wSet(-1, normal0);
            }
        } else {
            front = offset0 >= 0 && offset1 >= 0 && offset2 >= 0;
            if (front) {
                normal.set(normal1);
                lowerLimit.set(normal1);
                upperLimit.set(normal1);
            } else {
                normal.wSet(-1, normal1);
                lowerLimit.wSet(-1, normal2);
                upperLimit.wSet(-1, normal0);
            }
        }
    } else if (hasVertex0) {
        if (convex1) {
            front = offset0 >= 0 || offset1 >= 0;
            if (front) {
                normal.set(normal1);
                lowerLimit.set(normal0);
                upperLimit.wSet(-1, normal1);
            } else {
                normal.wSet(-1, normal1);
                lowerLimit.set(normal1);
                upperLimit.wSet(-1, normal1);
            }
        } else {
            front = offset0 >= 0 && offset1 >= 0;
            if (front) {
                normal.set(normal1);
                lowerLimit.set(normal1);
                upperLimit.wSet(-1, normal1);
            } else {
                normal.wSet(-1, normal1);
                lowerLimit.set(normal1);
                upperLimit.wSet(-1, normal0);
            }
        }
    } else if (hasVertex3) {
        if (convex2) {
            front = offset1 >= 0 || offset2 >= 0;
            if (front) {
                normal.set(normal1);
                lowerLimit.wSet(-1, normal1);
                upperLimit.set(normal2);
            } else {
                normal.wSet(-1, normal1);
                lowerLimit.wSet(-1, normal1);
                upperLimit.set(normal1);
            }
        } else {
            front = offset1 >= 0 && offset2 >= 0;
            if (front) {
                normal.set(normal1);
                lowerLimit.wSet(-1, normal1);
                upperLimit.set(normal1);
            } else {
                normal.wSet(-1, normal1);
                lowerLimit.wSet(-1, normal2);
                upperLimit.set(normal1);
            }
        }
    } else {
        front = offset1 >= 0;
        if (front) {
            normal.set(normal1);
            lowerLimit.wSet(-1, normal1);
            upperLimit.wSet(-1, normal1);
        } else {
            normal.wSet(-1, normal1);
            lowerLimit.set(normal1);
            upperLimit.set(normal1);
        }
    }
    // Get polygonB in frameA
    polygonBA.count = polygonB.m_count;
    for (var i = 0; i < polygonB.m_count; ++i) {
        polygonBA.vertices[i] = Transform.mul(xf, polygonB.m_vertices[i]);
        polygonBA.normals[i] = Rot.mul(xf.q, polygonB.m_normals[i]);
    }
    var radius = 2 * Settings.polygonRadius;
    manifold.pointCount = 0;
    {
        // ComputeEdgeSeparation
        edgeAxis.type = e_edgeA;
        edgeAxis.index = front ? 0 : 1;
        edgeAxis.separation = Infinity;
        for (var i = 0; i < polygonBA.count; ++i) {
            var s = Vec2.dot(normal, Vec2.sub(polygonBA.vertices[i], v1));
            if (s < edgeAxis.separation) {
                edgeAxis.separation = s;
            }
        }
    }
    // If no valid normal can be found than this edge should not collide.
    if (edgeAxis.type == e_unknown) {
        return;
    }
    if (edgeAxis.separation > radius) {
        return;
    }
    {
        // ComputePolygonSeparation
        polygonAxis.type = e_unknown;
        polygonAxis.index = -1;
        polygonAxis.separation = -Infinity;
        var perp = Vec2.neo(-normal.y, normal.x);
        for (var i = 0; i < polygonBA.count; ++i) {
            var n = Vec2.neg(polygonBA.normals[i]);
            var s1 = Vec2.dot(n, Vec2.sub(polygonBA.vertices[i], v1));
            var s2 = Vec2.dot(n, Vec2.sub(polygonBA.vertices[i], v2));
            var s = Math.min(s1, s2);
            if (s > radius) {
                // No collision
                polygonAxis.type = e_edgeB;
                polygonAxis.index = i;
                polygonAxis.separation = s;
                break;
            }
            // Adjacency
            if (Vec2.dot(n, perp) >= 0) {
                if (Vec2.dot(Vec2.sub(n, upperLimit), normal) < -Settings.angularSlop) {
                    continue;
                }
            } else {
                if (Vec2.dot(Vec2.sub(n, lowerLimit), normal) < -Settings.angularSlop) {
                    continue;
                }
            }
            if (s > polygonAxis.separation) {
                polygonAxis.type = e_edgeB;
                polygonAxis.index = i;
                polygonAxis.separation = s;
            }
        }
    }
    if (polygonAxis.type != e_unknown && polygonAxis.separation > radius) {
        return;
    }
    // Use hysteresis for jitter reduction.
    var k_relativeTol = .98;
    var k_absoluteTol = .001;
    var primaryAxis;
    if (polygonAxis.type == e_unknown) {
        primaryAxis = edgeAxis;
    } else if (polygonAxis.separation > k_relativeTol * edgeAxis.separation + k_absoluteTol) {
        primaryAxis = polygonAxis;
    } else {
        primaryAxis = edgeAxis;
    }
    var ie = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];
    if (primaryAxis.type == e_edgeA) {
        manifold.type = Manifold.e_faceA;
        // Search for the polygon normal that is most anti-parallel to the edge
        // normal.
        var bestIndex = 0;
        var bestValue = Vec2.dot(normal, polygonBA.normals[0]);
        for (var i = 1; i < polygonBA.count; ++i) {
            var value = Vec2.dot(normal, polygonBA.normals[i]);
            if (value < bestValue) {
                bestValue = value;
                bestIndex = i;
            }
        }
        var i1 = bestIndex;
        var i2 = i1 + 1 < polygonBA.count ? i1 + 1 : 0;
        ie[0].v = polygonBA.vertices[i1];
        ie[0].id.cf.indexA = 0;
        ie[0].id.cf.indexB = i1;
        ie[0].id.cf.typeA = Manifold.e_face;
        ie[0].id.cf.typeB = Manifold.e_vertex;
        ie[1].v = polygonBA.vertices[i2];
        ie[1].id.cf.indexA = 0;
        ie[1].id.cf.indexB = i2;
        ie[1].id.cf.typeA = Manifold.e_face;
        ie[1].id.cf.typeB = Manifold.e_vertex;
        if (front) {
            rf.i1 = 0;
            rf.i2 = 1;
            rf.v1 = v1;
            rf.v2 = v2;
            rf.normal.set(normal1);
        } else {
            rf.i1 = 1;
            rf.i2 = 0;
            rf.v1 = v2;
            rf.v2 = v1;
            rf.normal.wSet(-1, normal1);
        }
    } else {
        manifold.type = Manifold.e_faceB;
        ie[0].v = v1;
        ie[0].id.cf.indexA = 0;
        ie[0].id.cf.indexB = primaryAxis.index;
        ie[0].id.cf.typeA = Manifold.e_vertex;
        ie[0].id.cf.typeB = Manifold.e_face;
        ie[1].v = v2;
        ie[1].id.cf.indexA = 0;
        ie[1].id.cf.indexB = primaryAxis.index;
        ie[1].id.cf.typeA = Manifold.e_vertex;
        ie[1].id.cf.typeB = Manifold.e_face;
        rf.i1 = primaryAxis.index;
        rf.i2 = rf.i1 + 1 < polygonBA.count ? rf.i1 + 1 : 0;
        rf.v1 = polygonBA.vertices[rf.i1];
        rf.v2 = polygonBA.vertices[rf.i2];
        rf.normal.set(polygonBA.normals[rf.i1]);
    }
    rf.sideNormal1.set(rf.normal.y, -rf.normal.x);
    rf.sideNormal2.wSet(-1, rf.sideNormal1);
    rf.sideOffset1 = Vec2.dot(rf.sideNormal1, rf.v1);
    rf.sideOffset2 = Vec2.dot(rf.sideNormal2, rf.v2);
    // Clip incident edge against extruded edge1 side edges.
    var clipPoints1 = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];
    var clipPoints2 = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];
    var np;
    // Clip to box side 1
    np = Manifold.clipSegmentToLine(clipPoints1, ie, rf.sideNormal1, rf.sideOffset1, rf.i1);
    if (np < Settings.maxManifoldPoints) {
        return;
    }
    // Clip to negative box side 1
    np = Manifold.clipSegmentToLine(clipPoints2, clipPoints1, rf.sideNormal2, rf.sideOffset2, rf.i2);
    if (np < Settings.maxManifoldPoints) {
        return;
    }
    // Now clipPoints2 contains the clipped points.
    if (primaryAxis.type == e_edgeA) {
        manifold.localNormal = Vec2.clone(rf.normal);
        manifold.localPoint = Vec2.clone(rf.v1);
    } else {
        manifold.localNormal = Vec2.clone(polygonB.m_normals[rf.i1]);
        manifold.localPoint = Vec2.clone(polygonB.m_vertices[rf.i1]);
    }
    var pointCount = 0;
    for (var i = 0; i < Settings.maxManifoldPoints; ++i) {
        var separation = Vec2.dot(rf.normal, Vec2.sub(clipPoints2[i].v, rf.v1));
        if (separation <= radius) {
            var cp = manifold.points[pointCount];
            // ManifoldPoint
            if (primaryAxis.type == e_edgeA) {
                cp.localPoint = Transform.mulT(xf, clipPoints2[i].v);
                cp.id = clipPoints2[i].id;
            } else {
                cp.localPoint = clipPoints2[i].v;
                cp.id.cf.typeA = clipPoints2[i].id.cf.typeB;
                cp.id.cf.typeB = clipPoints2[i].id.cf.typeA;
                cp.id.cf.indexA = clipPoints2[i].id.cf.indexB;
                cp.id.cf.indexB = clipPoints2[i].id.cf.indexA;
            }
            ++pointCount;
        }
    }
    manifold.pointCount = pointCount;
}


},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"./ChainShape":39,"./EdgeShape":46,"./PolygonShape":47}],45:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

var common = require("../util/common");

var Math = require("../common/Math");

var Transform = require("../common/Transform");

var Rot = require("../common/Rot");

var Vec2 = require("../common/Vec2");

var AABB = require("../collision/AABB");

var Settings = require("../Settings");

var Manifold = require("../Manifold");

var Contact = require("../Contact");

var Shape = require("../Shape");

var PolygonShape = require("./PolygonShape");

module.exports = CollidePolygons;

Contact.addType(PolygonShape.TYPE, PolygonShape.TYPE, PolygonContact);

function PolygonContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
    ASSERT && common.assert(fixtureA.getType() == PolygonShape.TYPE);
    ASSERT && common.assert(fixtureB.getType() == PolygonShape.TYPE);
    CollidePolygons(manifold, fixtureA.getShape(), xfA, fixtureB.getShape(), xfB);
}

/**
 * Find the max separation between poly1 and poly2 using edge normals from
 * poly1.
 */
function FindMaxSeparation(poly1, xf1, poly2, xf2) {
    var count1 = poly1.m_count;
    var count2 = poly2.m_count;
    var n1s = poly1.m_normals;
    var v1s = poly1.m_vertices;
    var v2s = poly2.m_vertices;
    var xf = Transform.mulT(xf2, xf1);
    var bestIndex = 0;
    var maxSeparation = -Infinity;
    for (var i = 0; i < count1; ++i) {
        // Get poly1 normal in frame2.
        var n = Rot.mul(xf.q, n1s[i]);
        var v1 = Transform.mul(xf, v1s[i]);
        // Find deepest point for normal i.
        var si = Infinity;
        for (var j = 0; j < count2; ++j) {
            var sij = Vec2.dot(n, v2s[j]) - Vec2.dot(n, v1);
            if (sij < si) {
                si = sij;
            }
        }
        if (si > maxSeparation) {
            maxSeparation = si;
            bestIndex = i;
        }
    }
    // used to keep last FindMaxSeparation call values
    FindMaxSeparation._maxSeparation = maxSeparation;
    FindMaxSeparation._bestIndex = bestIndex;
}

/**
 * @param {ClipVertex[2]} c
 * @param {int} edge1
 */
function FindIncidentEdge(c, poly1, xf1, edge1, poly2, xf2) {
    var normals1 = poly1.m_normals;
    var count2 = poly2.m_count;
    var vertices2 = poly2.m_vertices;
    var normals2 = poly2.m_normals;
    ASSERT && common.assert(0 <= edge1 && edge1 < poly1.m_count);
    // Get the normal of the reference edge in poly2's frame.
    var normal1 = Rot.mulT(xf2.q, Rot.mul(xf1.q, normals1[edge1]));
    // Find the incident edge on poly2.
    var index = 0;
    var minDot = Infinity;
    for (var i = 0; i < count2; ++i) {
        var dot = Vec2.dot(normal1, normals2[i]);
        if (dot < minDot) {
            minDot = dot;
            index = i;
        }
    }
    // Build the clip vertices for the incident edge.
    var i1 = index;
    var i2 = i1 + 1 < count2 ? i1 + 1 : 0;
    c[0].v = Transform.mul(xf2, vertices2[i1]);
    c[0].id.cf.indexA = edge1;
    c[0].id.cf.indexB = i1;
    c[0].id.cf.typeA = Manifold.e_face;
    c[0].id.cf.typeB = Manifold.e_vertex;
    c[1].v = Transform.mul(xf2, vertices2[i2]);
    c[1].id.cf.indexA = edge1;
    c[1].id.cf.indexB = i2;
    c[1].id.cf.typeA = Manifold.e_face;
    c[1].id.cf.typeB = Manifold.e_vertex;
}

/**
 * 
 * Find edge normal of max separation on A - return if separating axis is found<br>
 * Find edge normal of max separation on B - return if separation axis is found<br>
 * Choose reference edge as min(minA, minB)<br>
 * Find incident edge<br>
 * Clip
 * 
 * The normal points from 1 to 2
 */
function CollidePolygons(manifold, polyA, xfA, polyB, xfB) {
    manifold.pointCount = 0;
    var totalRadius = polyA.m_radius + polyB.m_radius;
    FindMaxSeparation(polyA, xfA, polyB, xfB);
    var edgeA = FindMaxSeparation._bestIndex;
    var separationA = FindMaxSeparation._maxSeparation;
    if (separationA > totalRadius) return;
    FindMaxSeparation(polyB, xfB, polyA, xfA);
    var edgeB = FindMaxSeparation._bestIndex;
    var separationB = FindMaxSeparation._maxSeparation;
    if (separationB > totalRadius) return;
    var poly1;
    // reference polygon
    var poly2;
    // incident polygon
    var xf1;
    var xf2;
    var edge1;
    // reference edge
    var flip;
    var k_tol = .1 * Settings.linearSlop;
    if (separationB > separationA + k_tol) {
        poly1 = polyB;
        poly2 = polyA;
        xf1 = xfB;
        xf2 = xfA;
        edge1 = edgeB;
        manifold.type = Manifold.e_faceB;
        flip = 1;
    } else {
        poly1 = polyA;
        poly2 = polyB;
        xf1 = xfA;
        xf2 = xfB;
        edge1 = edgeA;
        manifold.type = Manifold.e_faceA;
        flip = 0;
    }
    var incidentEdge = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];
    FindIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);
    var count1 = poly1.m_count;
    var vertices1 = poly1.m_vertices;
    var iv1 = edge1;
    var iv2 = edge1 + 1 < count1 ? edge1 + 1 : 0;
    var v11 = vertices1[iv1];
    var v12 = vertices1[iv2];
    var localTangent = Vec2.sub(v12, v11);
    localTangent.normalize();
    var localNormal = Vec2.cross(localTangent, 1);
    var planePoint = Vec2.wAdd(.5, v11, .5, v12);
    var tangent = Rot.mul(xf1.q, localTangent);
    var normal = Vec2.cross(tangent, 1);
    v11 = Transform.mul(xf1, v11);
    v12 = Transform.mul(xf1, v12);
    // Face offset.
    var frontOffset = Vec2.dot(normal, v11);
    // Side offsets, extended by polytope skin thickness.
    var sideOffset1 = -Vec2.dot(tangent, v11) + totalRadius;
    var sideOffset2 = Vec2.dot(tangent, v12) + totalRadius;
    // Clip incident edge against extruded edge1 side edges.
    var clipPoints1 = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];
    var clipPoints2 = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];
    var np;
    // Clip to box side 1
    np = Manifold.clipSegmentToLine(clipPoints1, incidentEdge, Vec2.neg(tangent), sideOffset1, iv1);
    if (np < 2) {
        return;
    }
    // Clip to negative box side 1
    np = Manifold.clipSegmentToLine(clipPoints2, clipPoints1, tangent, sideOffset2, iv2);
    if (np < 2) {
        return;
    }
    // Now clipPoints2 contains the clipped points.
    manifold.localNormal = localNormal;
    manifold.localPoint = planePoint;
    var pointCount = 0;
    for (var i = 0; i < clipPoints2.length; ++i) {
        var separation = Vec2.dot(normal, clipPoints2[i].v) - frontOffset;
        if (separation <= totalRadius) {
            var cp = manifold.points[pointCount];
            // ManifoldPoint
            cp.localPoint.set(Transform.mulT(xf2, clipPoints2[i].v));
            cp.id = clipPoints2[i].id;
            if (flip) {
                // Swap features
                var cf = cp.id.cf;
                // ContactFeature
                var indexA = cf.indexA;
                var indexB = cf.indexB;
                var typeA = cf.typeA;
                var typeB = cf.typeB;
                cf.indexA = indexB;
                cf.indexB = indexA;
                cf.typeA = typeB;
                cf.typeB = typeA;
            }
            ++pointCount;
        }
    }
    manifold.pointCount = pointCount;
}


},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"./PolygonShape":47}],46:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = EdgeShape;

var create = require("../util/create");

var options = require("../util/options");

var Settings = require("../Settings");

var Shape = require("../Shape");

var Math = require("../common/Math");

var Transform = require("../common/Transform");

var Rot = require("../common/Rot");

var Vec2 = require("../common/Vec2");

var AABB = require("../collision/AABB");

EdgeShape._super = Shape;

EdgeShape.prototype = create(EdgeShape._super.prototype);

EdgeShape.TYPE = "edge";

/**
 * A line segment (edge) shape. These can be connected in chains or loops to
 * other edge shapes. The connectivity information is used to ensure correct
 * contact normals.
 */
function EdgeShape(v1, v2) {
    if (!(this instanceof EdgeShape)) {
        return new EdgeShape(v1, v2);
    }
    EdgeShape._super.call(this);
    this.m_type = EdgeShape.TYPE;
    this.m_radius = Settings.polygonRadius;
    // These are the edge vertices
    this.m_vertex1 = v1 ? Vec2.clone(v1) : Vec2.zero();
    this.m_vertex2 = v2 ? Vec2.clone(v2) : Vec2.zero();
    // Optional adjacent vertices. These are used for smooth collision.
    // Used by chain shape.
    this.m_vertex0 = Vec2.zero();
    this.m_vertex3 = Vec2.zero();
    this.m_hasVertex0 = false;
    this.m_hasVertex3 = false;
}

EdgeShape.prototype.setNext = function(v3) {
    if (v3) {
        this.m_vertex3.set(v3);
        this.m_hasVertex3 = true;
    } else {
        this.m_vertex3.setZero();
        this.m_hasVertex3 = false;
    }
    return this;
};

EdgeShape.prototype.setPrev = function(v0) {
    if (v0) {
        this.m_vertex0.set(v0);
        this.m_hasVertex0 = true;
    } else {
        this.m_vertex0.setZero();
        this.m_hasVertex0 = false;
    }
    return this;
};

/**
 * Set this as an isolated edge.
 */
EdgeShape.prototype._set = function(v1, v2) {
    this.m_vertex1.set(v1);
    this.m_vertex2.set(v2);
    this.m_hasVertex0 = false;
    this.m_hasVertex3 = false;
    return this;
};

EdgeShape.prototype._clone = function() {
    var clone = new EdgeShape();
    clone.m_type = this.m_type;
    clone.m_radius = this.m_radius;
    clone.m_vertex1.set(this.m_vertex1);
    clone.m_vertex2.set(this.m_vertex2);
    clone.m_vertex0.set(this.m_vertex0);
    clone.m_vertex3.set(this.m_vertex3);
    clone.m_hasVertex0 = this.m_hasVertex0;
    clone.m_hasVertex3 = this.m_hasVertex3;
    return clone;
};

EdgeShape.prototype.getChildCount = function() {
    return 1;
};

EdgeShape.prototype.testPoint = function(xf, p) {
    return false;
};

// p = p1 + t * d
// v = v1 + s * e
// p1 + t * d = v1 + s * e
// s * e - t * d = p1 - v1
EdgeShape.prototype.rayCast = function(output, input, xf, childIndex) {
    // NOT_USED(childIndex);
    // Put the ray into the edge's frame of reference.
    var p1 = Rot.mulT(xf.q, Vec2.sub(input.p1, xf.p));
    var p2 = Rot.mulT(xf.q, Vec2.sub(input.p2, xf.p));
    var d = Vec2.sub(p2, p1);
    var v1 = this.m_vertex1;
    var v2 = this.m_vertex2;
    var e = Vec2.sub(v2, v1);
    var normal = Vec2.neo(e.y, -e.x);
    normal.normalize();
    // q = p1 + t * d
    // dot(normal, q - v1) = 0
    // dot(normal, p1 - v1) + t * dot(normal, d) = 0
    var numerator = Vec2.dot(normal, Vec2.sub(v1, p1));
    var denominator = Vec2.dot(normal, d);
    if (denominator == 0) {
        return false;
    }
    var t = numerator / denominator;
    if (t < 0 || input.maxFraction < t) {
        return false;
    }
    var q = Vec2.add(p1, Vec2.mul(t, d));
    // q = v1 + s * r
    // s = dot(q - v1, r) / dot(r, r)
    var r = Vec2.sub(v2, v1);
    var rr = Vec2.dot(r, r);
    if (rr == 0) {
        return false;
    }
    var s = Vec2.dot(Vec2.sub(q, v1), r) / rr;
    if (s < 0 || 1 < s) {
        return false;
    }
    output.fraction = t;
    if (numerator > 0) {
        output.normal = Rot.mul(xf.q, normal).neg();
    } else {
        output.normal = Rot.mul(xf.q, normal);
    }
    return true;
};

EdgeShape.prototype.computeAABB = function(aabb, xf, childIndex) {
    var v1 = Transform.mul(xf, this.m_vertex1);
    var v2 = Transform.mul(xf, this.m_vertex2);
    aabb.combinePoints(v1, v2);
    aabb.extend(this.m_radius);
};

EdgeShape.prototype.computeMass = function(massData, density) {
    massData.mass = 0;
    massData.center.wSet(.5, this.m_vertex1, .5, this.m_vertex2);
    massData.I = 0;
};

EdgeShape.prototype.computeDistanceProxy = function(proxy) {
    proxy.m_vertices.push(this.m_vertex1);
    proxy.m_vertices.push(this.m_vertex2);
    proxy.m_count = 2;
    proxy.m_radius = this.m_radius;
};


},{"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/create":51,"../util/options":52}],47:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = PolygonShape;

var common = require("../util/common");

var create = require("../util/create");

var options = require("../util/options");

var Math = require("../common/Math");

var Transform = require("../common/Transform");

var Rot = require("../common/Rot");

var Vec2 = require("../common/Vec2");

var AABB = require("../collision/AABB");

var Settings = require("../Settings");

var Shape = require("../Shape");

PolygonShape._super = Shape;

PolygonShape.prototype = create(PolygonShape._super.prototype);

PolygonShape.TYPE = "polygon";

/**
 * A convex polygon. It is assumed that the interior of the polygon is to the
 * left of each edge. Polygons have a maximum number of vertices equal to
 * Settings.maxPolygonVertices. In most cases you should not need many vertices
 * for a convex polygon. extends Shape
 */
function PolygonShape(vertices) {
    if (!(this instanceof PolygonShape)) {
        return new PolygonShape(vertices);
    }
    PolygonShape._super.call(this);
    this.m_type = PolygonShape.TYPE;
    this.m_radius = Settings.polygonRadius;
    this.m_centroid = Vec2.zero();
    this.m_vertices = [];
    // Vec2[Settings.maxPolygonVertices]
    this.m_normals = [];
    // Vec2[Settings.maxPolygonVertices]
    this.m_count = 0;
    if (vertices && vertices.length) {
        this._set(vertices);
    }
}

PolygonShape.prototype.getVertex = function(index) {
    ASSERT && common.assert(0 <= index && index < this.m_count);
    return this.m_vertices[index];
};

PolygonShape.prototype._clone = function() {
    var clone = new PolygonShape();
    clone.m_type = this.m_type;
    clone.m_radius = this.m_radius;
    clone.m_count = this.m_count;
    clone.m_centroid.set(this.m_centroid);
    for (var i = 0; i < this.m_count; i++) {
        clone.m_vertices.push(this.m_vertices[i].clone());
    }
    for (var i = 0; i < this.m_normals.length; i++) {
        clone.m_normals.push(this.m_normals[i].clone());
    }
    return clone;
};

PolygonShape.prototype.getChildCount = function() {
    return 1;
};

function ComputeCentroid(vs, count) {
    ASSERT && common.assert(count >= 3);
    var c = Vec2.zero();
    var area = 0;
    // pRef is the reference point for forming triangles.
    // It's location doesn't change the result (except for rounding error).
    var pRef = Vec2.zero();
    if (false) {
        // This code would put the reference point inside the polygon.
        for (var i = 0; i < count; ++i) {
            pRef.add(vs[i]);
        }
        pRef.mul(1 / count);
    }
    var inv3 = 1 / 3;
    for (var i = 0; i < count; ++i) {
        // Triangle vertices.
        var p1 = pRef;
        var p2 = vs[i];
        var p3 = i + 1 < count ? vs[i + 1] : vs[0];
        var e1 = Vec2.sub(p2, p1);
        var e2 = Vec2.sub(p3, p1);
        var D = Vec2.cross(e1, e2);
        var triangleArea = .5 * D;
        area += triangleArea;
        // Area weighted centroid
        c.wAdd(triangleArea * inv3, p1);
        c.wAdd(triangleArea * inv3, p2);
        c.wAdd(triangleArea * inv3, p3);
    }
    // Centroid
    ASSERT && common.assert(area > Math.EPSILON);
    c.mul(1 / area);
    return c;
}

/**
 * @private
 *
 * Create a convex hull from the given array of local points. The count must be
 * in the range [3, Settings.maxPolygonVertices].
 * 
 * Warning: the points may be re-ordered, even if they form a convex polygon
 * Warning: collinear points are handled but not removed. Collinear points may
 * lead to poor stacking behavior.
 */
PolygonShape.prototype._set = function(vertices) {
    ASSERT && common.assert(3 <= vertices.length && vertices.length <= Settings.maxPolygonVertices);
    if (vertices.length < 3) {
        SetAsBox(1, 1);
        return;
    }
    var n = Math.min(vertices.length, Settings.maxPolygonVertices);
    // Perform welding and copy vertices into local buffer.
    var ps = [];
    // [Settings.maxPolygonVertices];
    var tempCount = 0;
    for (var i = 0; i < n; ++i) {
        var v = vertices[i];
        var unique = true;
        for (var j = 0; j < tempCount; ++j) {
            if (Vec2.distanceSquared(v, ps[j]) < .25 * Settings.linearSlopSquared) {
                unique = false;
                break;
            }
        }
        if (unique) {
            ps[tempCount++] = v;
        }
    }
    n = tempCount;
    if (n < 3) {
        // Polygon is degenerate.
        ASSERT && common.assert(false);
        SetAsBox(1, 1);
        return;
    }
    // Create the convex hull using the Gift wrapping algorithm
    // http://en.wikipedia.org/wiki/Gift_wrapping_algorithm
    // Find the right most point on the hull
    var i0 = 0;
    var x0 = ps[0].x;
    for (var i = 1; i < n; ++i) {
        var x = ps[i].x;
        if (x > x0 || x == x0 && ps[i].y < ps[i0].y) {
            i0 = i;
            x0 = x;
        }
    }
    var hull = [];
    // [Settings.maxPolygonVertices];
    var m = 0;
    var ih = i0;
    for (;;) {
        hull[m] = ih;
        var ie = 0;
        for (var j = 1; j < n; ++j) {
            if (ie == ih) {
                ie = j;
                continue;
            }
            var r = Vec2.sub(ps[ie], ps[hull[m]]);
            var v = Vec2.sub(ps[j], ps[hull[m]]);
            var c = Vec2.cross(r, v);
            if (c < 0) {
                ie = j;
            }
            // Collinearity check
            if (c == 0 && v.lengthSquared() > r.lengthSquared()) {
                ie = j;
            }
        }
        ++m;
        ih = ie;
        if (ie == i0) {
            break;
        }
    }
    if (m < 3) {
        // Polygon is degenerate.
        ASSERT && common.assert(false);
        SetAsBox(1, 1);
        return;
    }
    this.m_count = m;
    // Copy vertices.
    for (var i = 0; i < m; ++i) {
        this.m_vertices[i] = ps[hull[i]];
    }
    // Compute normals. Ensure the edges have non-zero length.
    for (var i = 0; i < m; ++i) {
        var i1 = i;
        var i2 = i + 1 < m ? i + 1 : 0;
        var edge = Vec2.sub(this.m_vertices[i2], this.m_vertices[i1]);
        ASSERT && common.assert(edge.lengthSquared() > Math.EPSILON * Math.EPSILON);
        this.m_normals[i] = Vec2.cross(edge, 1);
        this.m_normals[i].normalize();
    }
    // Compute the polygon centroid.
    this.m_centroid = ComputeCentroid(this.m_vertices, m);
};

PolygonShape.prototype.testPoint = function(xf, p) {
    var pLocal = Rot.mulT(xf.q, Vec2.sub(p, xf.p));
    for (var i = 0; i < this.m_count; ++i) {
        var dot = Vec2.dot(this.m_normals[i], Vec2.sub(pLocal, this.m_vertices[i]));
        if (dot > 0) {
            return false;
        }
    }
    return true;
};

PolygonShape.prototype.rayCast = function(output, input, xf, childIndex) {
    // Put the ray into the polygon's frame of reference.
    var p1 = Rot.mulT(xf.q, Vec2.sub(input.p1, xf.p));
    var p2 = Rot.mulT(xf.q, Vec2.sub(input.p2, xf.p));
    var d = Vec2.sub(p2, p1);
    var lower = 0;
    var upper = input.maxFraction;
    var index = -1;
    for (var i = 0; i < this.m_count; ++i) {
        // p = p1 + a * d
        // dot(normal, p - v) = 0
        // dot(normal, p1 - v) + a * dot(normal, d) = 0
        var numerator = Vec2.dot(this.m_normals[i], Vec2.sub(this.m_vertices[i], p1));
        var denominator = Vec2.dot(this.m_normals[i], d);
        if (denominator == 0) {
            if (numerator < 0) {
                return false;
            }
        } else {
            // Note: we want this predicate without division:
            // lower < numerator / denominator, where denominator < 0
            // Since denominator < 0, we have to flip the inequality:
            // lower < numerator / denominator <==> denominator * lower > numerator.
            if (denominator < 0 && numerator < lower * denominator) {
                // Increase lower.
                // The segment enters this half-space.
                lower = numerator / denominator;
                index = i;
            } else if (denominator > 0 && numerator < upper * denominator) {
                // Decrease upper.
                // The segment exits this half-space.
                upper = numerator / denominator;
            }
        }
        // The use of epsilon here causes the assert on lower to trip
        // in some cases. Apparently the use of epsilon was to make edge
        // shapes work, but now those are handled separately.
        // if (upper < lower - Math.EPSILON)
        if (upper < lower) {
            return false;
        }
    }
    ASSERT && common.assert(0 <= lower && lower <= input.maxFraction);
    if (index >= 0) {
        output.fraction = lower;
        output.normal = Rot.mul(xf.q, this.m_normals[index]);
        return true;
    }
    return false;
};

PolygonShape.prototype.computeAABB = function(aabb, xf, childIndex) {
    var minX = Infinity, minY = Infinity;
    var maxX = -Infinity, maxY = -Infinity;
    for (var i = 0; i < this.m_count; ++i) {
        var v = Transform.mul(xf, this.m_vertices[i]);
        minX = Math.min(minX, v.x);
        maxX = Math.max(maxX, v.x);
        minY = Math.min(minY, v.y);
        maxY = Math.max(maxY, v.y);
    }
    aabb.lowerBound.set(minX, minY);
    aabb.upperBound.set(maxX, maxY);
    aabb.extend(this.m_radius);
};

PolygonShape.prototype.computeMass = function(massData, density) {
    // Polygon mass, centroid, and inertia.
    // Let rho be the polygon density in mass per unit area.
    // Then:
    // mass = rho * int(dA)
    // centroid.x = (1/mass) * rho * int(x * dA)
    // centroid.y = (1/mass) * rho * int(y * dA)
    // I = rho * int((x*x + y*y) * dA)
    //
    // We can compute these integrals by summing all the integrals
    // for each triangle of the polygon. To evaluate the integral
    // for a single triangle, we make a change of variables to
    // the (u,v) coordinates of the triangle:
    // x = x0 + e1x * u + e2x * v
    // y = y0 + e1y * u + e2y * v
    // where 0 <= u && 0 <= v && u + v <= 1.
    //
    // We integrate u from [0,1-v] and then v from [0,1].
    // We also need to use the Jacobian of the transformation:
    // D = cross(e1, e2)
    //
    // Simplification: triangle centroid = (1/3) * (p1 + p2 + p3)
    //
    // The rest of the derivation is handled by computer algebra.
    ASSERT && common.assert(this.m_count >= 3);
    var center = Vec2.zero();
    var area = 0;
    var I = 0;
    // s is the reference point for forming triangles.
    // It's location doesn't change the result (except for rounding error).
    var s = Vec2.zero();
    // This code would put the reference point inside the polygon.
    for (var i = 0; i < this.m_count; ++i) {
        s.add(this.m_vertices[i]);
    }
    s.mul(1 / this.m_count);
    var k_inv3 = 1 / 3;
    for (var i = 0; i < this.m_count; ++i) {
        // Triangle vertices.
        var e1 = Vec2.sub(this.m_vertices[i], s);
        var e2 = i + 1 < this.m_count ? Vec2.sub(this.m_vertices[i + 1], s) : Vec2.sub(this.m_vertices[0], s);
        var D = Vec2.cross(e1, e2);
        var triangleArea = .5 * D;
        area += triangleArea;
        // Area weighted centroid
        center.wAdd(triangleArea * k_inv3, e1, triangleArea * k_inv3, e2);
        var ex1 = e1.x;
        var ey1 = e1.y;
        var ex2 = e2.x;
        var ey2 = e2.y;
        var intx2 = ex1 * ex1 + ex2 * ex1 + ex2 * ex2;
        var inty2 = ey1 * ey1 + ey2 * ey1 + ey2 * ey2;
        I += .25 * k_inv3 * D * (intx2 + inty2);
    }
    // Total mass
    massData.mass = density * area;
    // Center of mass
    ASSERT && common.assert(area > Math.EPSILON);
    center.mul(1 / area);
    massData.center.wSet(1, center, 1, s);
    // Inertia tensor relative to the local origin (point s).
    massData.I = density * I;
    // Shift to center of mass then to original body origin.
    massData.I += massData.mass * (Vec2.dot(massData.center, massData.center) - Vec2.dot(center, center));
};

// Validate convexity. This is a very time consuming operation.
// @returns true if valid
PolygonShape.prototype.validate = function() {
    for (var i = 0; i < this.m_count; ++i) {
        var i1 = i;
        var i2 = i < this.m_count - 1 ? i1 + 1 : 0;
        var p = this.m_vertices[i1];
        var e = Vec2.sub(this.m_vertices[i2], p);
        for (var j = 0; j < this.m_count; ++j) {
            if (j == i1 || j == i2) {
                continue;
            }
            var v = Vec2.sub(this.m_vertices[j], p);
            var c = Vec2.cross(e, v);
            if (c < 0) {
                return false;
            }
        }
    }
    return true;
};

PolygonShape.prototype.computeDistanceProxy = function(proxy) {
    proxy.m_vertices = this.m_vertices;
    proxy.m_count = this.m_count;
    proxy.m_radius = this.m_radius;
};


},{"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"../util/options":52}],48:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Pool;

function Pool(opts) {
    var _list = [];
    var _max = opts.max || Infinity;
    var _createFn = opts.create;
    var _outFn = opts.allocate;
    var _inFn = opts.release;
    var _discardFn = opts.discard;
    var _createCount = 0;
    var _outCount = 0;
    var _inCount = 0;
    var _discardCount = 0;
    this.max = function(n) {
        if (typeof n === "number") {
            _max = n;
            return this;
        }
        return _max;
    };
    this.size = function() {
        return _list.length;
    };
    this.allocate = function() {
        var item;
        if (_list.length > 0) {
            item = _list.shift();
        } else {
            _createCount++;
            if (typeof _createFn === "function") {
                item = _createFn();
            } else {
                item = {};
            }
        }
        _outCount++;
        if (typeof _outFn === "function") {
            _outFn(item);
        }
        return item;
    };
    this.release = function(item) {
        if (_list.length < _max) {
            _inCount++;
            if (typeof _inFn === "function") {
                _inFn(item);
            }
            _list.push(item);
        } else {
            _discardCount++;
            if (typeof _discardFn === "function") {
                item = _discardFn(item);
            }
        }
    };
    this.toString = function() {
        return " +" + _createCount + " >" + _outCount + " <" + _inCount + " -" + _discardCount + " =" + _list.length + "/" + _max;
    };
}


},{}],49:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports.now = function() {
    return Date.now();
};

module.exports.diff = function(time) {
    return Date.now() - time;
};


},{}],50:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

exports.debug = function() {
    if (!DEBUG) return;
    console.log.apply(console, arguments);
};

exports.assert = function(statement, err, log) {
    if (!ASSERT) return;
    if (statement) return;
    log && console.log(log);
    throw new Error(err);
};


},{}],51:[function(require,module,exports){
if (typeof Object.create == "function") {
    module.exports = function(proto, props) {
        return Object.create.call(Object, proto, props);
    };
} else {
    module.exports = function(proto, props) {
        if (props) throw Error("Second argument is not supported!");
        if (typeof proto !== "object" || proto === null) throw Error("Invalid prototype!");
        noop.prototype = proto;
        return new noop();
    };
    function noop() {}
}


},{}],52:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

var propIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function(to, from) {
    if (to === null || typeof to === "undefined") {
        to = {};
    }
    for (var key in from) {
        if (from.hasOwnProperty(key) && typeof to[key] === "undefined") {
            to[key] = from[key];
        }
    }
    if (typeof Object.getOwnPropertySymbols === "function") {
        var symbols = Object.getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++) {
            var symbol = symbols[i];
            if (from.propertyIsEnumerable(symbol) && typeof to[key] === "undefined") {
                to[symbol] = from[symbol];
            }
        }
    }
    return to;
};


},{}]},{},[1])(1)
});