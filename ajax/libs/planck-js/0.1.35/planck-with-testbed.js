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
/*
 * Stage.js 
 * 
 * @copyright 2017 Ali Shakiba http://shakiba.me/stage.js
 * @license The MIT License
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.planck=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var planck = require("../lib/");

var Stage = require("stage-js/platform/web");

module.exports = planck;

planck.testbed = function(opts, callback) {
    if (typeof opts === "function") {
        callback = opts;
        opts = null;
    }
    Stage(function(stage, canvas) {
        stage.on(Stage.Mouse.START, function() {
            window.focus();
            document.activeElement && document.activeElement.blur();
            canvas.focus();
        });
        stage.MAX_ELAPSE = 1e3 / 30;
        var Vec2 = planck.Vec2;
        var testbed = {};
        var paused = false;
        stage.on("resume", function() {
            paused = false;
            testbed._resume && testbed._resume();
        });
        stage.on("pause", function() {
            paused = true;
            testbed._pause && testbed._pause();
        });
        testbed.isPaused = function() {
            return paused;
        };
        testbed.togglePause = function() {
            paused ? testbed.play() : testbed.pause();
        };
        testbed.pause = function() {
            stage.pause();
        };
        testbed.resume = function() {
            stage.resume();
            testbed.focus();
        };
        testbed.focus = function() {
            document.activeElement && document.activeElement.blur();
            canvas.focus();
        };
        testbed.focus = function() {
            document.activeElement && document.activeElement.blur();
            canvas.focus();
        };
        testbed.debug = false;
        testbed.width = 80;
        testbed.height = 60;
        testbed.x = 0;
        testbed.y = -10;
        testbed.ratio = 16;
        testbed.hz = 60;
        testbed.speed = 1;
        testbed.activeKeys = {};
        testbed.background = "#222222";
        var statusText = "";
        var statusMap = {};
        function statusSet(name, value) {
            if (typeof value !== "function" && typeof value !== "object") {
                statusMap[name] = value;
            }
        }
        function statusMerge(obj) {
            for (var key in obj) {
                statusSet(key, obj[key]);
            }
        }
        testbed.status = function(a, b) {
            if (typeof b !== "undefined") {
                statusSet(a, b);
            } else if (a && typeof a === "object") {
                statusMerge(a);
            } else if (typeof a === "string") {
                statusText = a;
            }
            testbed._status && testbed._status(statusText, statusMap);
        };
        testbed.info = function(text) {
            testbed._info && testbed._info(text);
        };
        var lastDrawHash = "", drawHash = "";
        (function() {
            var drawingTexture = new Stage.Texture();
            stage.append(Stage.image(drawingTexture));
            var buffer = [];
            stage.tick(function() {
                buffer.length = 0;
            }, true);
            drawingTexture.draw = function(ctx) {
                ctx.save();
                ctx.transform(1, 0, 0, -1, -testbed.x, -testbed.y);
                ctx.lineWidth = 2 / testbed.ratio;
                ctx.lineCap = "round";
                for (var drawing = buffer.shift(); drawing; drawing = buffer.shift()) {
                    drawing(ctx, testbed.ratio);
                }
                ctx.restore();
            };
            testbed.drawPoint = function(p, r, color) {
                buffer.push(function(ctx, ratio) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 5 / ratio, 0, 2 * Math.PI);
                    ctx.strokeStyle = color;
                    ctx.stroke();
                });
                drawHash += "point" + p.x + "," + p.y + "," + r + "," + color;
            };
            testbed.drawCircle = function(p, r, color) {
                buffer.push(function(ctx) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
                    ctx.strokeStyle = color;
                    ctx.stroke();
                });
                drawHash += "circle" + p.x + "," + p.y + "," + r + "," + color;
            };
            testbed.drawSegment = function(a, b, color) {
                buffer.push(function(ctx) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = color;
                    ctx.stroke();
                });
                drawHash += "segment" + a.x + "," + a.y + "," + b.x + "," + b.y + "," + color;
            };
            testbed.drawPolygon = function(points, color) {
                if (!points || !points.length) {
                    return;
                }
                buffer.push(function(ctx) {
                    ctx.beginPath();
                    ctx.moveTo(points[0].x, points[0].y);
                    for (var i = 1; i < points.length; i++) {
                        ctx.lineTo(points[i].x, points[i].y);
                    }
                    ctx.strokeStyle = color;
                    ctx.closePath();
                    ctx.stroke();
                });
                drawHash += "segment";
                for (var i = 1; i < points.length; i++) {
                    drawHash += points[i].x + "," + points[i].y + ",";
                }
                drawHash += color;
            };
            testbed.drawAABB = function(aabb, color) {
                buffer.push(function(ctx) {
                    ctx.beginPath();
                    ctx.moveTo(aabb.lowerBound.x, aabb.lowerBound.y);
                    ctx.lineTo(aabb.upperBound.x, aabb.lowerBound.y);
                    ctx.lineTo(aabb.upperBound.x, aabb.upperBound.y);
                    ctx.lineTo(aabb.lowerBound.x, aabb.upperBound.y);
                    ctx.strokeStyle = color;
                    ctx.closePath();
                    ctx.stroke();
                });
                drawHash += "aabb";
                drawHash += aabb.lowerBound.x + "," + aabb.lowerBound.y + ",";
                drawHash += aabb.upperBound.x + "," + aabb.upperBound.y + ",";
                drawHash += color;
            };
            testbed.color = function(r, g, b) {
                r = r * 256 | 0;
                g = g * 256 | 0;
                b = b * 256 | 0;
                return "rgb(" + r + ", " + g + ", " + b + ")";
            };
        })();
        var world = callback(testbed);
        var viewer = new Viewer(world, testbed);
        var lastX = 0, lastY = 0;
        stage.tick(function(dt, t) {
            if (lastX !== testbed.x || lastY !== testbed.y) {
                viewer.offset(-testbed.x, -testbed.y);
                lastX = testbed.x, lastY = testbed.y;
            }
        });
        viewer.tick(function(dt, t) {
            if (typeof testbed.step === "function") {
                testbed.step(dt, t);
            }
            if (targetBody) {
                testbed.drawSegment(targetBody.getPosition(), mouseMove, "rgba(255,255,255,0.2)");
            }
            if (lastDrawHash !== drawHash) {
                lastDrawHash = drawHash;
                stage.touch();
            }
            drawHash = "";
            return true;
        });
        viewer.scale(1, -1);
        stage.background(testbed.background);
        stage.viewbox(testbed.width, testbed.height);
        stage.pin("alignX", -.5);
        stage.pin("alignY", -.5);
        stage.prepend(viewer);
        function findBody(point) {
            var body;
            var aabb = planck.AABB(point, point);
            world.queryAABB(aabb, function(fixture) {
                if (body) {
                    return;
                }
                if (!fixture.getBody().isDynamic() || !fixture.testPoint(point)) {
                    return;
                }
                body = fixture.getBody();
                return true;
            });
            return body;
        }
        var mouseGround = world.createBody();
        var mouseJoint;
        var targetBody;
        var mouseMove = {
            x: 0,
            y: 0
        };
        viewer.attr("spy", true).on(Stage.Mouse.START, function(point) {
            if (targetBody) {
                return;
            }
            var body = findBody(point);
            if (!body) {
                return;
            }
            if (testbed.mouseForce) {
                targetBody = body;
            } else {
                mouseJoint = planck.MouseJoint({
                    maxForce: 1e3
                }, mouseGround, body, Vec2(point));
                world.createJoint(mouseJoint);
            }
        }).on(Stage.Mouse.MOVE, function(point) {
            if (mouseJoint) {
                mouseJoint.setTarget(point);
            }
            mouseMove.x = point.x;
            mouseMove.y = point.y;
        }).on(Stage.Mouse.END, function(point) {
            if (mouseJoint) {
                world.destroyJoint(mouseJoint);
                mouseJoint = null;
            }
            if (targetBody) {
                var force = Vec2.sub(point, targetBody.getPosition());
                targetBody.applyForceToCenter(force.mul(testbed.mouseForce), true);
                targetBody = null;
            }
        }).on(Stage.Mouse.CANCEL, function(point) {
            if (mouseJoint) {
                world.destroyJoint(mouseJoint);
                mouseJoint = null;
            }
            if (targetBody) {
                targetBody = null;
            }
        });
        window.addEventListener("keydown", function(e) {
            switch (e.keyCode) {
              case "P".charCodeAt(0):
                testbed.togglePause();
                break;
            }
        }, false);
        var downKeys = {};
        window.addEventListener("keydown", function(e) {
            var keyCode = e.keyCode;
            downKeys[keyCode] = true;
            updateActiveKeys(keyCode, true);
            testbed.keydown && testbed.keydown(keyCode, String.fromCharCode(keyCode));
        });
        window.addEventListener("keyup", function(e) {
            var keyCode = e.keyCode;
            downKeys[keyCode] = false;
            updateActiveKeys(keyCode, false);
            testbed.keyup && testbed.keyup(keyCode, String.fromCharCode(keyCode));
        });
        var activeKeys = testbed.activeKeys;
        function updateActiveKeys(keyCode, down) {
            var char = String.fromCharCode(keyCode);
            if (/\w/.test(char)) {
                activeKeys[char] = down;
            }
            activeKeys.right = downKeys[39] || activeKeys["D"];
            activeKeys.left = downKeys[37] || activeKeys["A"];
            activeKeys.up = downKeys[38] || activeKeys["W"];
            activeKeys.down = downKeys[40] || activeKeys["S"];
            activeKeys.fire = downKeys[32] || downKeys[13];
        }
    });
};

Viewer._super = Stage;

Viewer.prototype = Stage._create(Viewer._super.prototype);

function Viewer(world, opts) {
    Viewer._super.call(this);
    this.label("Planck");
    opts = opts || {};
    var options = this._options = {};
    this._options.speed = opts.speed || 1;
    this._options.hz = opts.hz || 60;
    if (Math.abs(this._options.hz) < 1) {
        this._options.hz = 1 / this._options.hz;
    }
    this._options.ratio = opts.ratio || 16;
    this._options.lineWidth = 2 / this._options.ratio;
    this._world = world;
    var timeStep = 1 / this._options.hz;
    var elapsedTime = 0;
    this.tick(function(dt) {
        dt = dt * .001 * options.speed;
        elapsedTime += dt;
        while (elapsedTime > timeStep) {
            world.step(timeStep);
            elapsedTime -= timeStep;
        }
        this.renderWorld();
        return true;
    }, true);
    world.on("remove-fixture", function(obj) {
        obj.ui && obj.ui.remove();
    });
    world.on("remove-joint", function(obj) {
        obj.ui && obj.ui.remove();
    });
}

Viewer.prototype.renderWorld = function(world) {
    var world = this._world;
    var viewer = this;
    for (var b = world.getBodyList(); b; b = b.getNext()) {
        for (var f = b.getFixtureList(); f; f = f.getNext()) {
            if (!f.ui) {
                if (f.render && f.render.stroke) {
                    this._options.strokeStyle = f.render.stroke;
                } else if (b.render && b.render.stroke) {
                    this._options.strokeStyle = b.render.stroke;
                } else if (b.isDynamic()) {
                    this._options.strokeStyle = "rgba(255,255,255,0.9)";
                } else if (b.isKinematic()) {
                    this._options.strokeStyle = "rgba(255,255,255,0.7)";
                } else if (b.isStatic()) {
                    this._options.strokeStyle = "rgba(255,255,255,0.5)";
                }
                if (f.render && f.render.fill) {
                    this._options.fillStyle = f.render.fill;
                } else if (b.render && b.render.fill) {
                    this._options.fillStyle = b.render.fill;
                } else {
                    this._options.fillStyle = "";
                }
                var type = f.getType();
                var shape = f.getShape();
                if (type == "circle") {
                    f.ui = viewer.drawCircle(shape, this._options);
                }
                if (type == "edge") {
                    f.ui = viewer.drawEdge(shape, this._options);
                }
                if (type == "polygon") {
                    f.ui = viewer.drawPolygon(shape, this._options);
                }
                if (type == "chain") {
                    f.ui = viewer.drawChain(shape, this._options);
                }
                if (f.ui) {
                    f.ui.appendTo(viewer);
                }
            }
            if (f.ui) {
                var p = b.getPosition(), r = b.getAngle();
                if (f.ui.__lastX !== p.x || f.ui.__lastY !== p.y || f.ui.__lastR !== r) {
                    f.ui.__lastX = p.x;
                    f.ui.__lastY = p.y;
                    f.ui.__lastR = r;
                    f.ui.offset(p.x, p.y);
                    f.ui.rotate(r);
                }
            }
        }
    }
    for (var j = world.getJointList(); j; j = j.getNext()) {
        var type = j.getType();
        var a = j.getAnchorA();
        var b = j.getAnchorB();
        if (!j.ui) {
            this._options.strokeStyle = "rgba(255,255,255,0.2)";
            j.ui = viewer.drawJoint(j, this._options);
            j.ui.pin("handle", .5);
            if (j.ui) {
                j.ui.appendTo(viewer);
            }
        }
        if (j.ui) {
            var cx = (a.x + b.x) * .5;
            var cy = (a.y + b.y) * .5;
            var dx = a.x - b.x;
            var dy = a.y - b.y;
            var d = Math.sqrt(dx * dx + dy * dy);
            j.ui.width(d);
            j.ui.rotate(Math.atan2(dy, dx));
            j.ui.offset(cx, cy);
        }
    }
};

Viewer.prototype.drawJoint = function(joint, options) {
    var lw = options.lineWidth;
    var ratio = options.ratio;
    var length = 10;
    var texture = Stage.canvas(function(ctx) {
        this.size(length + 2 * lw, 2 * lw, ratio);
        ctx.scale(ratio, ratio);
        ctx.beginPath();
        ctx.moveTo(lw, lw);
        ctx.lineTo(lw + length, lw);
        ctx.lineCap = "round";
        ctx.lineWidth = options.lineWidth;
        ctx.strokeStyle = options.strokeStyle;
        ctx.stroke();
    });
    var image = Stage.image(texture).stretch();
    return image;
};

Viewer.prototype.drawCircle = function(shape, options) {
    var lw = options.lineWidth;
    var ratio = options.ratio;
    var r = shape.m_radius;
    var cx = r + lw;
    var cy = r + lw;
    var w = r * 2 + lw * 2;
    var h = r * 2 + lw * 2;
    var texture = Stage.canvas(function(ctx) {
        this.size(w, h, ratio);
        ctx.scale(ratio, ratio);
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        if (options.fillStyle) {
            ctx.fillStyle = options.fillStyle;
            ctx.fill();
        }
        ctx.lineTo(cx, cy);
        ctx.lineWidth = options.lineWidth;
        ctx.strokeStyle = options.strokeStyle;
        ctx.stroke();
    });
    var image = Stage.image(texture).offset(shape.m_p.x - cx, shape.m_p.y - cy);
    var node = Stage.create().append(image);
    return node;
};

Viewer.prototype.drawEdge = function(edge, options) {
    var lw = options.lineWidth;
    var ratio = options.ratio;
    var v1 = edge.m_vertex1;
    var v2 = edge.m_vertex2;
    var dx = v2.x - v1.x;
    var dy = v2.y - v1.y;
    var length = Math.sqrt(dx * dx + dy * dy);
    var texture = Stage.canvas(function(ctx) {
        this.size(length + 2 * lw, 2 * lw, ratio);
        ctx.scale(ratio, ratio);
        ctx.beginPath();
        ctx.moveTo(lw, lw);
        ctx.lineTo(lw + length, lw);
        ctx.lineCap = "round";
        ctx.lineWidth = options.lineWidth;
        ctx.strokeStyle = options.strokeStyle;
        ctx.stroke();
    });
    var minX = Math.min(v1.x, v2.x);
    var minY = Math.min(v1.y, v2.y);
    var image = Stage.image(texture);
    image.rotate(Math.atan2(dy, dx));
    image.offset(minX - lw, minY - lw);
    var node = Stage.create().append(image);
    return node;
};

Viewer.prototype.drawPolygon = function(shape, options) {
    var lw = options.lineWidth;
    var ratio = options.ratio;
    var vertices = shape.m_vertices;
    if (!vertices.length) {
        return;
    }
    var minX = Infinity, minY = Infinity;
    var maxX = -Infinity, maxY = -Infinity;
    for (var i = 0; i < vertices.length; ++i) {
        var v = vertices[i];
        minX = Math.min(minX, v.x);
        maxX = Math.max(maxX, v.x);
        minY = Math.min(minY, v.y);
        maxY = Math.max(maxY, v.y);
    }
    var width = maxX - minX;
    var height = maxY - minY;
    var texture = Stage.canvas(function(ctx) {
        this.size(width + 2 * lw, height + 2 * lw, ratio);
        ctx.scale(ratio, ratio);
        ctx.beginPath();
        for (var i = 0; i < vertices.length; ++i) {
            var v = vertices[i];
            var x = v.x - minX + lw;
            var y = v.y - minY + lw;
            if (i == 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        if (vertices.length > 2) {
            ctx.closePath();
        }
        if (options.fillStyle) {
            ctx.fillStyle = options.fillStyle;
            ctx.fill();
            ctx.closePath();
        }
        ctx.lineCap = "round";
        ctx.lineWidth = options.lineWidth;
        ctx.strokeStyle = options.strokeStyle;
        ctx.stroke();
    });
    var image = Stage.image(texture);
    image.offset(minX - lw, minY - lw);
    var node = Stage.create().append(image);
    return node;
};

Viewer.prototype.drawChain = function(shape, options) {
    var lw = options.lineWidth;
    var ratio = options.ratio;
    var vertices = shape.m_vertices;
    if (!vertices.length) {
        return;
    }
    var minX = Infinity, minY = Infinity;
    var maxX = -Infinity, maxY = -Infinity;
    for (var i = 0; i < vertices.length; ++i) {
        var v = vertices[i];
        minX = Math.min(minX, v.x);
        maxX = Math.max(maxX, v.x);
        minY = Math.min(minY, v.y);
        maxY = Math.max(maxY, v.y);
    }
    var width = maxX - minX;
    var height = maxY - minY;
    var texture = Stage.canvas(function(ctx) {
        this.size(width + 2 * lw, height + 2 * lw, ratio);
        ctx.scale(ratio, ratio);
        ctx.beginPath();
        for (var i = 0; i < vertices.length; ++i) {
            var v = vertices[i];
            var x = v.x - minX + lw;
            var y = v.y - minY + lw;
            if (i == 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        if (vertices.length > 2) {}
        if (options.fillStyle) {
            ctx.fillStyle = options.fillStyle;
            ctx.fill();
            ctx.closePath();
        }
        ctx.lineCap = "round";
        ctx.lineWidth = options.lineWidth;
        ctx.strokeStyle = options.strokeStyle;
        ctx.stroke();
    });
    var image = Stage.image(texture);
    image.offset(minX - lw, minY - lw);
    var node = Stage.create().append(image);
    return node;
};
},{"../lib/":27,"stage-js/platform/web":82}],2:[function(require,module,exports){
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
    this.m_I = 0;
    this.m_invI = 0;
    this.m_xf = Transform.identity();
    this.m_xf.p = Vec2.clone(def.position);
    this.m_xf.q.setAngle(def.angle);
    this.m_sweep = new Sweep();
    this.m_sweep.setTransform(this.m_xf);
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

Body.prototype.getType = function() {
    return this.m_type;
};

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
    var ce = this.m_contactList;
    while (ce) {
        var ce0 = ce;
        ce = ce.next;
        this.m_world.destroyContact(ce0.contact);
    }
    this.m_contactList = null;
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

Body.prototype.setActive = function(flag) {
    ASSERT && common.assert(this.isWorldLocked() == false);
    if (flag == this.m_activeFlag) {
        return;
    }
    this.m_activeFlag = !!flag;
    if (this.m_activeFlag) {
        var broadPhase = this.m_world.m_broadPhase;
        for (var f = this.m_fixtureList; f; f = f.m_next) {
            f.createProxies(broadPhase, this.m_xf);
        }
    } else {
        var broadPhase = this.m_world.m_broadPhase;
        for (var f = this.m_fixtureList; f; f = f.m_next) {
            f.destroyProxies(broadPhase);
        }
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

Body.prototype.setFixedRotation = function(flag) {
    if (this.m_fixedRotationFlag == flag) {
        return;
    }
    this.m_fixedRotationFlag = !!flag;
    this.m_angularVelocity = 0;
    this.resetMassData();
};

Body.prototype.getTransform = function() {
    return this.m_xf;
};

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

Body.prototype.synchronizeFixtures = function() {
    var xf = Transform.identity();
    this.m_sweep.getTransform(xf, 0);
    var broadPhase = this.m_world.m_broadPhase;
    for (var f = this.m_fixtureList; f; f = f.m_next) {
        f.synchronize(broadPhase, xf, this.m_xf);
    }
};

Body.prototype.advance = function(alpha) {
    this.m_sweep.advance(alpha);
    this.m_sweep.c.set(this.m_sweep.c0);
    this.m_sweep.a = this.m_sweep.a0;
    this.m_sweep.getTransform(this.m_xf, 1);
};

Body.prototype.getPosition = function() {
    return this.m_xf.p;
};

Body.prototype.setPosition = function(p) {
    this.setTransform(p, this.m_sweep.a);
};

Body.prototype.getAngle = function() {
    return this.m_sweep.a;
};

Body.prototype.setAngle = function(angle) {
    this.setTransform(this.m_xf.p, angle);
};

Body.prototype.getWorldCenter = function() {
    return this.m_sweep.c;
};

Body.prototype.getLocalCenter = function() {
    return this.m_sweep.localCenter;
};

Body.prototype.getLinearVelocity = function() {
    return this.m_linearVelocity;
};

Body.prototype.getLinearVelocityFromWorldPoint = function(worldPoint) {
    var localCenter = Vec2.sub(worldPoint, this.m_sweep.c);
    return Vec2.add(this.m_linearVelocity, Vec2.cross(this.m_angularVelocity, localCenter));
};

Body.prototype.getLinearVelocityFromLocalPoint = function(localPoint) {
    return this.getLinearVelocityFromWorldPoint(this.getWorldPoint(localPoint));
};

Body.prototype.setLinearVelocity = function(v) {
    if (this.m_type == staticBody) {
        return;
    }
    if (Vec2.dot(v, v) > 0) {
        this.setAwake(true);
    }
    this.m_linearVelocity.set(v);
};

Body.prototype.getAngularVelocity = function() {
    return this.m_angularVelocity;
};

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

Body.prototype.setGravityScale = function(scale) {
    this.m_gravityScale = scale;
};

Body.prototype.getMass = function() {
    return this.m_mass;
};

Body.prototype.getInertia = function() {
    return this.m_I + this.m_mass * Vec2.dot(this.m_sweep.localCenter, this.m_sweep.localCenter);
};

function MassData() {
    this.mass = 0;
    this.center = Vec2.zero();
    this.I = 0;
}

Body.prototype.getMassData = function(data) {
    data.mass = this.m_mass;
    data.I = this.getInertia();
    data.center.set(this.m_sweep.localCenter);
};

Body.prototype.resetMassData = function() {
    this.m_mass = 0;
    this.m_invMass = 0;
    this.m_I = 0;
    this.m_invI = 0;
    this.m_sweep.localCenter.setZero();
    if (this.isStatic() || this.isKinematic()) {
        this.m_sweep.c0.set(this.m_xf.p);
        this.m_sweep.c.set(this.m_xf.p);
        this.m_sweep.a0 = this.m_sweep.a;
        return;
    }
    ASSERT && common.assert(this.isDynamic());
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
    if (this.m_mass > 0) {
        this.m_invMass = 1 / this.m_mass;
        localCenter.mul(this.m_invMass);
    } else {
        this.m_mass = 1;
        this.m_invMass = 1;
    }
    if (this.m_I > 0 && this.m_fixedRotationFlag == false) {
        this.m_I -= this.m_mass * Vec2.dot(localCenter, localCenter);
        ASSERT && common.assert(this.m_I > 0);
        this.m_invI = 1 / this.m_I;
    } else {
        this.m_I = 0;
        this.m_invI = 0;
    }
    var oldCenter = Vec2.clone(this.m_sweep.c);
    this.m_sweep.setLocalCenter(localCenter, this.m_xf);
    this.m_linearVelocity.add(Vec2.cross(this.m_angularVelocity, Vec2.sub(this.m_sweep.c, oldCenter)));
};

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
    var oldCenter = Vec2.clone(this.m_sweep.c);
    this.m_sweep.setLocalCenter(massData.center, this.m_xf);
    this.m_linearVelocity.add(Vec2.cross(this.m_angularVelocity, Vec2.sub(this.m_sweep.c, oldCenter)));
};

Body.prototype.applyForce = function(force, point, wake) {
    if (this.m_type != dynamicBody) {
        return;
    }
    if (wake && this.m_awakeFlag == false) {
        this.setAwake(true);
    }
    if (this.m_awakeFlag) {
        this.m_force.add(force);
        this.m_torque += Vec2.cross(Vec2.sub(point, this.m_sweep.c), force);
    }
};

Body.prototype.applyForceToCenter = function(force, wake) {
    if (this.m_type != dynamicBody) {
        return;
    }
    if (wake && this.m_awakeFlag == false) {
        this.setAwake(true);
    }
    if (this.m_awakeFlag) {
        this.m_force.add(force);
    }
};

Body.prototype.applyTorque = function(torque, wake) {
    if (this.m_type != dynamicBody) {
        return;
    }
    if (wake && this.m_awakeFlag == false) {
        this.setAwake(true);
    }
    if (this.m_awakeFlag) {
        this.m_torque += torque;
    }
};

Body.prototype.applyLinearImpulse = function(impulse, point, wake) {
    if (this.m_type != dynamicBody) {
        return;
    }
    if (wake && this.m_awakeFlag == false) {
        this.setAwake(true);
    }
    if (this.m_awakeFlag) {
        this.m_linearVelocity.wAdd(this.m_invMass, impulse);
        this.m_angularVelocity += this.m_invI * Vec2.cross(Vec2.sub(point, this.m_sweep.c), impulse);
    }
};

Body.prototype.applyAngularImpulse = function(impulse, wake) {
    if (this.m_type != dynamicBody) {
        return;
    }
    if (wake && this.m_awakeFlag == false) {
        this.setAwake(true);
    }
    if (this.m_awakeFlag) {
        this.m_angularVelocity += this.m_invI * impulse;
    }
};

Body.prototype.shouldCollide = function(that) {
    if (this.m_type != dynamicBody && that.m_type != dynamicBody) {
        return false;
    }
    for (var jn = this.m_jointList; jn; jn = jn.next) {
        if (jn.other == that) {
            if (jn.joint.m_collideConnected == false) {
                return false;
            }
        }
    }
    return true;
};

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
    if (fixture.m_density > 0) {
        this.resetMassData();
    }
    this.m_world.m_newFixture = true;
    return fixture;
};

Body.prototype.destroyFixture = function(fixture) {
    ASSERT && common.assert(this.isWorldLocked() == false);
    if (this.isWorldLocked() == true) {
        return;
    }
    ASSERT && common.assert(fixture.m_body == this);
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
    ASSERT && common.assert(found);
    var edge = this.m_contactList;
    while (edge) {
        var c = edge.contact;
        edge = edge.next;
        var fixtureA = c.getFixtureA();
        var fixtureB = c.getFixtureB();
        if (fixture == fixtureA || fixture == fixtureB) {
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
    this.resetMassData();
};

Body.prototype.getWorldPoint = function(localPoint) {
    return Transform.mul(this.m_xf, localPoint);
};

Body.prototype.getWorldVector = function(localVector) {
    return Rot.mul(this.m_xf.q, localVector);
};

Body.prototype.getLocalPoint = function(worldPoint) {
    return Transform.mulT(this.m_xf, worldPoint);
};

Body.prototype.getLocalVector = function(worldVector) {
    return Rot.mulT(this.m_xf.q, worldVector);
};


},{"./Fixture":4,"./Shape":8,"./World":10,"./common/Math":18,"./common/Position":19,"./common/Rot":20,"./common/Sweep":21,"./common/Transform":22,"./common/Vec2":23,"./common/Velocity":25,"./util/common":51,"./util/options":53}],3:[function(require,module,exports){
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

function ContactEdge(contact) {
    this.contact = contact;
    this.prev;
    this.next;
    this.other;
}

function Contact(fA, indexA, fB, indexB, evaluateFcn) {
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
    this.m_toiFlag = false;
    this.m_friction = mixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
    this.m_restitution = mixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
    this.m_tangentSpeed = 0;
    this.m_enabledFlag = true;
    this.m_islandFlag = false;
    this.m_touchingFlag = false;
    this.m_filterFlag = false;
    this.m_bulletHitFlag = false;
    this.v_points = [];
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
    this.p_localNormal = Vec2.zero();
    this.p_localPoint = Vec2.zero();
    this.p_localCenterA = Vec2.zero();
    this.p_localCenterB = Vec2.zero();
    this.p_type;
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

Contact.prototype.getManifold = function() {
    return this.m_manifold;
};

Contact.prototype.getWorldManifold = function(worldManifold) {
    var bodyA = this.m_fixtureA.getBody();
    var bodyB = this.m_fixtureB.getBody();
    var shapeA = this.m_fixtureA.getShape();
    var shapeB = this.m_fixtureB.getShape();
    return this.m_manifold.getWorldManifold(worldManifold, bodyA.getTransform(), shapeA.m_radius, bodyB.getTransform(), shapeB.m_radius);
};

Contact.prototype.setEnabled = function(flag) {
    this.m_enabledFlag = !!flag;
};

Contact.prototype.isEnabled = function() {
    return this.m_enabledFlag;
};

Contact.prototype.isTouching = function() {
    return this.m_touchingFlag;
};

Contact.prototype.getNext = function() {
    return this.m_next;
};

Contact.prototype.getFixtureA = function() {
    return this.m_fixtureA;
};

Contact.prototype.getFixtureB = function() {
    return this.m_fixtureB;
};

Contact.prototype.getChildIndexA = function() {
    return this.m_indexA;
};

Contact.prototype.getChildIndexB = function() {
    return this.m_indexB;
};

Contact.prototype.flagForFiltering = function() {
    this.m_filterFlag = true;
};

Contact.prototype.setFriction = function(friction) {
    this.m_friction = friction;
};

Contact.prototype.getFriction = function() {
    return this.m_friction;
};

Contact.prototype.resetFriction = function() {
    this.m_friction = mixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
};

Contact.prototype.setRestitution = function(restitution) {
    this.m_restitution = restitution;
};

Contact.prototype.getRestitution = function() {
    return this.m_restitution;
};

Contact.prototype.resetRestitution = function() {
    this.m_restitution = mixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
};

Contact.prototype.setTangentSpeed = function(speed) {
    this.m_tangentSpeed = speed;
};

Contact.prototype.getTangentSpeed = function() {
    return this.m_tangentSpeed;
};

Contact.prototype.evaluate = function(manifold, xfA, xfB) {
    this.m_evaluateFcn(manifold, xfA, this.m_fixtureA, this.m_indexA, xfB, this.m_fixtureB, this.m_indexB);
};

Contact.prototype.update = function(listener) {
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
    if (sensor) {
        var shapeA = this.m_fixtureA.getShape();
        var shapeB = this.m_fixtureB.getShape();
        touching = Distance.testOverlap(shapeA, this.m_indexA, shapeB, this.m_indexB, xfA, xfB);
        this.m_manifold.pointCount = 0;
    } else {
        var oldManifold = this.m_manifold;
        this.m_manifold = new Manifold();
        this.evaluate(this.m_manifold, xfA, xfB);
        touching = this.m_manifold.pointCount > 0;
        for (var i = 0; i < this.m_manifold.pointCount; ++i) {
            var nmp = this.m_manifold.points[i];
            nmp.normalImpulse = 0;
            nmp.tangentImpulse = 0;
            for (var j = 0; j < oldManifold.pointCount; ++j) {
                var omp = oldManifold.points[j];
                if (omp.id.key == nmp.id.key) {
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
    for (var j = 0; j < this.p_pointCount; ++j) {
        var xfA = Transform.identity();
        var xfB = Transform.identity();
        xfA.q.set(aA);
        xfB.q.set(aB);
        xfA.p = Vec2.sub(cA, Rot.mul(xfA.q, localCenterA));
        xfB.p = Vec2.sub(cB, Rot.mul(xfB.q, localCenterB));
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
            normal.mul(-1);
            break;
        }
        var rA = Vec2.sub(point, cA);
        var rB = Vec2.sub(point, cB);
        minSeparation = Math.min(minSeparation, separation);
        var baumgarte = toi ? Settings.toiBaugarte : Settings.baumgarte;
        var linearSlop = Settings.linearSlop;
        var maxLinearCorrection = Settings.maxLinearCorrection;
        var C = Math.clamp(baumgarte * (separation + linearSlop), -maxLinearCorrection, 0);
        var rnA = Vec2.cross(rA, normal);
        var rnB = Vec2.cross(rB, normal);
        var K = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
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
        vcp.velocityBias = 0;
        var vRel = Vec2.dot(this.v_normal, vB) + Vec2.dot(this.v_normal, Vec2.cross(wB, vcp.rB)) - Vec2.dot(this.v_normal, vA) - Vec2.dot(this.v_normal, Vec2.cross(wA, vcp.rA));
        if (vRel < -Settings.velocityThreshold) {
            vcp.velocityBias = -this.v_restitution * vRel;
        }
    }
    if (this.v_pointCount == 2 && step.blockSolve) {
        var vcp1 = this.v_points[0];
        var vcp2 = this.v_points[1];
        var rn1A = Vec2.cross(vcp1.rA, this.v_normal);
        var rn1B = Vec2.cross(vcp1.rB, this.v_normal);
        var rn2A = Vec2.cross(vcp2.rA, this.v_normal);
        var rn2B = Vec2.cross(vcp2.rB, this.v_normal);
        var k11 = mA + mB + iA * rn1A * rn1A + iB * rn1B * rn1B;
        var k22 = mA + mB + iA * rn2A * rn2A + iB * rn2B * rn2B;
        var k12 = mA + mB + iA * rn1A * rn2A + iB * rn1B * rn2B;
        var k_maxConditionNumber = 1e3;
        DEBUG && common.debug("k1x2: ", k11, k22, k12, mA, mB, iA, rn1A, rn2A, iB, rn1B, rn2B);
        if (k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
            this.v_K.ex.set(k11, k12);
            this.v_K.ey.set(k12, k22);
            this.v_normalMass.set(this.v_K.getInverse());
        } else {
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
    for (var j = 0; j < this.v_pointCount; ++j) {
        var vcp = this.v_points[j];
        var dv = Vec2.zero();
        dv.wAdd(1, vB, 1, Vec2.cross(wB, vcp.rB));
        dv.wSub(1, vA, 1, Vec2.cross(wA, vcp.rA));
        var vt = Vec2.dot(dv, tangent) - this.v_tangentSpeed;
        var lambda = vcp.tangentMass * -vt;
        var maxFriction = friction * vcp.normalImpulse;
        var newImpulse = Math.clamp(vcp.tangentImpulse + lambda, -maxFriction, maxFriction);
        lambda = newImpulse - vcp.tangentImpulse;
        vcp.tangentImpulse = newImpulse;
        var P = Vec2.mul(lambda, tangent);
        vA.wSub(mA, P);
        wA -= iA * Vec2.cross(vcp.rA, P);
        vB.wAdd(mB, P);
        wB += iB * Vec2.cross(vcp.rB, P);
    }
    if (this.v_pointCount == 1 || step.blockSolve == false) {
        for (var i = 0; i < this.v_pointCount; ++i) {
            var vcp = this.v_points[i];
            var dv = Vec2.zero();
            dv.wAdd(1, vB, 1, Vec2.cross(wB, vcp.rB));
            dv.wSub(1, vA, 1, Vec2.cross(wA, vcp.rA));
            var vn = Vec2.dot(dv, normal);
            var lambda = -vcp.normalMass * (vn - vcp.velocityBias);
            var newImpulse = Math.max(vcp.normalImpulse + lambda, 0);
            lambda = newImpulse - vcp.normalImpulse;
            vcp.normalImpulse = newImpulse;
            var P = Vec2.mul(lambda, normal);
            vA.wSub(mA, P);
            wA -= iA * Vec2.cross(vcp.rA, P);
            vB.wAdd(mB, P);
            wB += iB * Vec2.cross(vcp.rB, P);
        }
    } else {
        var vcp1 = this.v_points[0];
        var vcp2 = this.v_points[1];
        var a = Vec2.neo(vcp1.normalImpulse, vcp2.normalImpulse);
        ASSERT && common.assert(a.x >= 0 && a.y >= 0);
        var dv1 = Vec2.zero().add(vB).add(Vec2.cross(wB, vcp1.rB)).sub(vA).sub(Vec2.cross(wA, vcp1.rA));
        var dv2 = Vec2.zero().add(vB).add(Vec2.cross(wB, vcp2.rB)).sub(vA).sub(Vec2.cross(wA, vcp2.rA));
        var vn1 = Vec2.dot(dv1, normal);
        var vn2 = Vec2.dot(dv2, normal);
        var b = Vec2.neo(vn1 - vcp1.velocityBias, vn2 - vcp2.velocityBias);
        b.sub(Mat22.mul(this.v_K, a));
        var k_errorTol = .001;
        for (;;) {
            var x = Vec2.neg(Mat22.mul(this.v_normalMass, b));
            if (x.x >= 0 && x.y >= 0) {
                var d = Vec2.sub(x, a);
                var P1 = Vec2.mul(d.x, normal);
                var P2 = Vec2.mul(d.y, normal);
                vA.wSub(mA, P1, mA, P2);
                wA -= iA * (Vec2.cross(vcp1.rA, P1) + Vec2.cross(vcp2.rA, P2));
                vB.wAdd(mB, P1, mB, P2);
                wB += iB * (Vec2.cross(vcp1.rB, P1) + Vec2.cross(vcp2.rB, P2));
                vcp1.normalImpulse = x.x;
                vcp2.normalImpulse = x.y;
                if (DEBUG_SOLVER) {
                    dv1 = vB + Vec2.cross(wB, vcp1.rB) - vA - Vec2.cross(wA, vcp1.rA);
                    dv2 = vB + Vec2.cross(wB, vcp2.rB) - vA - Vec2.cross(wA, vcp2.rA);
                    vn1 = Dot(dv1, normal);
                    vn2 = Dot(dv2, normal);
                    ASSERT && common.assert(Abs(vn1 - vcp1.velocityBias) < k_errorTol);
                    ASSERT && common.assert(Abs(vn2 - vcp2.velocityBias) < k_errorTol);
                }
                break;
            }
            x.x = -vcp1.normalMass * b.x;
            x.y = 0;
            vn1 = 0;
            vn2 = this.v_K.ex.y * x.x + b.y;
            if (x.x >= 0 && vn2 >= 0) {
                var d = Vec2.sub(x, a);
                var P1 = Vec2.mul(d.x, normal);
                var P2 = Vec2.mul(d.y, normal);
                vA.wSub(mA, P1, mA, P2);
                wA -= iA * (Vec2.cross(vcp1.rA, P1) + Vec2.cross(vcp2.rA, P2));
                vB.wAdd(mB, P1, mB, P2);
                wB += iB * (Vec2.cross(vcp1.rB, P1) + Vec2.cross(vcp2.rB, P2));
                vcp1.normalImpulse = x.x;
                vcp2.normalImpulse = x.y;
                if (DEBUG_SOLVER) {
                    var dv1B = Vec2.add(vB, Vec2.cross(wB, vcp1.rB));
                    var dv1A = Vec2.add(vA, Vec2.cross(wA, vcp1.rA));
                    var dv1 = Vec2.sub(dv1B, dv1A);
                    vn1 = Vec2.dot(dv1, normal);
                    ASSERT && common.assert(Math.abs(vn1 - vcp1.velocityBias) < k_errorTol);
                }
                break;
            }
            x.x = 0;
            x.y = -vcp2.normalMass * b.y;
            vn1 = this.v_K.ey.x * x.y + b.x;
            vn2 = 0;
            if (x.y >= 0 && vn1 >= 0) {
                var d = Vec2.sub(x, a);
                var P1 = Vec2.mul(d.x, normal);
                var P2 = Vec2.mul(d.y, normal);
                vA.wSub(mA, P1, mA, P2);
                wA -= iA * (Vec2.cross(vcp1.rA, P1) + Vec2.cross(vcp2.rA, P2));
                vB.wAdd(mB, P1, mB, P2);
                wB += iB * (Vec2.cross(vcp1.rB, P1) + Vec2.cross(vcp2.rB, P2));
                vcp1.normalImpulse = x.x;
                vcp2.normalImpulse = x.y;
                if (DEBUG_SOLVER) {
                    var dv2B = Vec2.add(vB, Vec2.cross(wB, vcp2.rB));
                    var dv2A = Vec2.add(vA, Vec2.cross(wA, vcp2.rA));
                    var dv1 = Vec2.sub(dv2B, dv2A);
                    vn2 = Vec2.dot(dv2, normal);
                    ASSERT && common.assert(Math.abs(vn2 - vcp2.velocityBias) < k_errorTol);
                }
                break;
            }
            x.x = 0;
            x.y = 0;
            vn1 = b.x;
            vn2 = b.y;
            if (vn1 >= 0 && vn2 >= 0) {
                var d = Vec2.sub(x, a);
                var P1 = Vec2.mul(d.x, normal);
                var P2 = Vec2.mul(d.y, normal);
                vA.wSub(mA, P1, mA, P2);
                wA -= iA * (Vec2.cross(vcp1.rA, P1) + Vec2.cross(vcp2.rA, P2));
                vB.wAdd(mB, P1, mB, P2);
                wB += iB * (Vec2.cross(vcp1.rB, P1) + Vec2.cross(vcp2.rB, P2));
                vcp1.normalImpulse = x.x;
                vcp2.normalImpulse = x.y;
                break;
            }
            break;
        }
    }
    velocityA.v.set(vA);
    velocityA.w = wA;
    velocityB.v.set(vB);
    velocityB.w = wB;
};

function mixFriction(friction1, friction2) {
    return Math.sqrt(friction1 * friction2);
}

function mixRestitution(restitution1, restitution2) {
    return restitution1 > restitution2 ? restitution1 : restitution2;
}

var s_registers = [];

Contact.addType = function(type1, type2, callback) {
    s_registers[type1] = s_registers[type1] || {};
    s_registers[type1][type2] = callback;
};

Contact.create = function(fixtureA, indexA, fixtureB, indexB) {
    var typeA = fixtureA.getType();
    var typeB = fixtureB.getType();
    var contact, evaluateFcn;
    if (evaluateFcn = s_registers[typeA] && s_registers[typeA][typeB]) {
        contact = new Contact(fixtureA, indexA, fixtureB, indexB, evaluateFcn);
    } else if (evaluateFcn = s_registers[typeB] && s_registers[typeB][typeA]) {
        contact = new Contact(fixtureB, indexB, fixtureA, indexA, evaluateFcn);
    } else {
        return null;
    }
    fixtureA = contact.getFixtureA();
    fixtureB = contact.getFixtureB();
    indexA = contact.getChildIndexA();
    indexB = contact.getChildIndexB();
    var bodyA = fixtureA.getBody();
    var bodyB = fixtureB.getBody();
    contact.m_nodeA.contact = contact;
    contact.m_nodeA.other = bodyB;
    contact.m_nodeA.prev = null;
    contact.m_nodeA.next = bodyA.m_contactList;
    if (bodyA.m_contactList != null) {
        bodyA.m_contactList.prev = contact.m_nodeA;
    }
    bodyA.m_contactList = contact.m_nodeA;
    contact.m_nodeB.contact = contact;
    contact.m_nodeB.other = bodyA;
    contact.m_nodeB.prev = null;
    contact.m_nodeB.next = bodyB.m_contactList;
    if (bodyB.m_contactList != null) {
        bodyB.m_contactList.prev = contact.m_nodeB;
    }
    bodyB.m_contactList = contact.m_nodeB;
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
    if (contact.m_nodeA.prev) {
        contact.m_nodeA.prev.next = contact.m_nodeA.next;
    }
    if (contact.m_nodeA.next) {
        contact.m_nodeA.next.prev = contact.m_nodeA.prev;
    }
    if (contact.m_nodeA == bodyA.m_contactList) {
        bodyA.m_contactList = contact.m_nodeA.next;
    }
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
    var typeB = fixtureB.getType();
    var destroyFcn = s_registers[typeA][typeB].destroyFcn;
    if (typeof destroyFcn === "function") {
        destroyFcn(contact);
    }
};


},{"./Manifold":6,"./Settings":7,"./collision/Distance":13,"./common/Mat22":16,"./common/Math":18,"./common/Rot":20,"./common/Transform":22,"./common/Vec2":23,"./util/common":51}],4:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Fixture;

var common = require("./util/common");

var options = require("./util/options");

var Vec2 = require("./common/Vec2");

var AABB = require("./collision/AABB");

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

function FixtureProxy(fixture, childIndex) {
    this.aabb = new AABB();
    this.fixture = fixture;
    this.childIndex = childIndex;
    this.proxyId;
}

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
    this.m_shape = shape;
    this.m_next = null;
    this.m_proxies = [];
    this.m_proxyCount = 0;
    var childCount = this.m_shape.getChildCount();
    for (var i = 0; i < childCount; ++i) {
        this.m_proxies[i] = new FixtureProxy(this, i);
    }
    this.m_userData = def.userData;
}

Fixture.prototype.getType = function() {
    return this.m_shape.getType();
};

Fixture.prototype.getShape = function() {
    return this.m_shape;
};

Fixture.prototype.isSensor = function() {
    return this.m_isSensor;
};

Fixture.prototype.setSensor = function(sensor) {
    if (sensor != this.m_isSensor) {
        this.m_body.setAwake(true);
        this.m_isSensor = sensor;
    }
};

Fixture.prototype.getUserData = function() {
    return this.m_userData;
};

Fixture.prototype.setUserData = function(data) {
    this.m_userData = data;
};

Fixture.prototype.getBody = function() {
    return this.m_body;
};

Fixture.prototype.getNext = function() {
    return this.m_next;
};

Fixture.prototype.getDensity = function() {
    return this.m_density;
};

Fixture.prototype.setDensity = function(density) {
    ASSERT && common.assert(Math.isFinite(density) && density >= 0);
    this.m_density = density;
};

Fixture.prototype.getFriction = function() {
    return this.m_friction;
};

Fixture.prototype.setFriction = function(friction) {
    this.m_friction = friction;
};

Fixture.prototype.getRestitution = function() {
    return this.m_restitution;
};

Fixture.prototype.setRestitution = function(restitution) {
    this.m_restitution = restitution;
};

Fixture.prototype.testPoint = function(p) {
    return this.m_shape.testPoint(this.m_body.getTransform(), p);
};

Fixture.prototype.rayCast = function(output, input, childIndex) {
    return this.m_shape.rayCast(output, input, this.m_body.getTransform(), childIndex);
};

Fixture.prototype.getMassData = function(massData) {
    this.m_shape.computeMass(massData, this.m_density);
};

Fixture.prototype.getAABB = function(childIndex) {
    ASSERT && common.assert(0 <= childIndex && childIndex < this.m_proxyCount);
    return this.m_proxies[childIndex].aabb;
};

Fixture.prototype.createProxies = function(broadPhase, xf) {
    ASSERT && common.assert(this.m_proxyCount == 0);
    this.m_proxyCount = this.m_shape.getChildCount();
    for (var i = 0; i < this.m_proxyCount; ++i) {
        var proxy = this.m_proxies[i];
        this.m_shape.computeAABB(proxy.aabb, xf, i);
        proxy.proxyId = broadPhase.createProxy(proxy.aabb, proxy);
    }
};

Fixture.prototype.destroyProxies = function(broadPhase) {
    for (var i = 0; i < this.m_proxyCount; ++i) {
        var proxy = this.m_proxies[i];
        broadPhase.destroyProxy(proxy.proxyId);
        proxy.proxyId = null;
    }
    this.m_proxyCount = 0;
};

Fixture.prototype.synchronize = function(broadPhase, xf1, xf2) {
    for (var i = 0; i < this.m_proxyCount; ++i) {
        var proxy = this.m_proxies[i];
        var aabb1 = new AABB();
        var aabb2 = new AABB();
        this.m_shape.computeAABB(aabb1, xf1, proxy.childIndex);
        this.m_shape.computeAABB(aabb2, xf2, proxy.childIndex);
        proxy.aabb.combine(aabb1, aabb2);
        var displacement = Vec2.sub(xf2.p, xf1.p);
        broadPhase.moveProxy(proxy.proxyId, proxy.aabb, displacement);
    }
};

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

Fixture.prototype.refilter = function() {
    if (this.m_body == null) {
        return;
    }
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
    var broadPhase = world.m_broadPhase;
    for (var i = 0; i < this.m_proxyCount; ++i) {
        broadPhase.touchProxy(this.m_proxies[i].proxyId);
    }
};

Fixture.prototype.shouldCollide = function(that) {
    if (that.m_filterGroupIndex == this.m_filterGroupIndex && that.m_filterGroupIndex != 0) {
        return that.m_filterGroupIndex > 0;
    }
    var collide = (that.m_filterMaskBits & this.m_filterCategoryBits) != 0 && (that.m_filterCategoryBits & this.m_filterMaskBits) != 0;
    return collide;
};


},{"./collision/AABB":11,"./common/Vec2":23,"./util/common":51,"./util/options":53}],5:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Joint;

var common = require("./util/common");

function JointEdge() {
    this.other = null;
    this.joint = null;
    this.prev = null;
    this.next = null;
}

var JointDef = {
    userData: null,
    collideConnected: false
};

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

Joint.prototype.isActive = function() {
    return this.m_bodyA.isActive() && this.m_bodyB.isActive();
};

Joint.prototype.getType = function() {
    return this.m_type;
};

Joint.prototype.getBodyA = function() {
    return this.m_bodyA;
};

Joint.prototype.getBodyB = function() {
    return this.m_bodyB;
};

Joint.prototype.getNext = function() {
    return this.m_next;
};

Joint.prototype.getUserData = function() {
    return this.m_userData;
};

Joint.prototype.setUserData = function(data) {
    this.m_userData = data;
};

Joint.prototype.getCollideConnected = function() {
    return this.m_collideConnected;
};

Joint.prototype.getAnchorA = function() {};

Joint.prototype.getAnchorB = function() {};

Joint.prototype.getReactionForce = function(inv_dt) {};

Joint.prototype.getReactionTorque = function(inv_dt) {};

Joint.prototype.shiftOrigin = function(newOrigin) {};

Joint.prototype.initVelocityConstraints = function(step) {};

Joint.prototype.solveVelocityConstraints = function(step) {};

Joint.prototype.solvePositionConstraints = function(step) {};


},{"./util/common":51}],6:[function(require,module,exports){
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

Manifold.e_circles = 0;

Manifold.e_faceA = 1;

Manifold.e_faceB = 2;

Manifold.e_vertex = 0;

Manifold.e_face = 1;

function Manifold() {
    this.type;
    this.localNormal = Vec2.zero();
    this.localPoint = Vec2.zero();
    this.points = [ new ManifoldPoint(), new ManifoldPoint() ];
    this.pointCount = 0;
}

function ManifoldPoint() {
    this.localPoint = Vec2.zero();
    this.normalImpulse = 0;
    this.tangentImpulse = 0;
    this.id = new ContactID();
}

function ContactID() {
    this.cf = new ContactFeature();
    this.key;
}

ContactID.prototype.set = function(o) {
    this.key = o.key;
    this.cf.set(o.cf);
};

function ContactFeature() {
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

function WorldManifold() {
    this.normal;
    this.points = [];
    this.separations = [];
}

Manifold.prototype.getWorldManifold = function(wm, xfA, radiusA, xfB, radiusB) {
    if (this.pointCount == 0) {
        return;
    }
    wm = wm || new WorldManifold();
    var normal = wm.normal;
    var points = wm.points;
    var separations = wm.separations;
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
        normal.mul(-1);
        break;
    }
    wm.normal = normal;
    wm.points = points;
    wm.separations = separations;
    return wm;
};

var PointState = {
    nullState: 0,
    addState: 1,
    persistState: 2,
    removeState: 3
};

function getPointStates(state1, state2, manifold1, manifold2) {
    for (var i = 0; i < manifold1.pointCount; ++i) {
        var id = manifold1.points[i].id;
        state1[i] = PointState.removeState;
        for (var j = 0; j < manifold2.pointCount; ++j) {
            if (manifold2.points[j].id.key == id.key) {
                state1[i] = PointState.persistState;
                break;
            }
        }
    }
    for (var i = 0; i < manifold2.pointCount; ++i) {
        var id = manifold2.points[i].id;
        state2[i] = PointState.addState;
        for (var j = 0; j < manifold1.pointCount; ++j) {
            if (manifold1.points[j].id.key == id.key) {
                state2[i] = PointState.persistState;
                break;
            }
        }
    }
}

function ClipVertex() {
    this.v = Vec2.zero();
    this.id = new ContactID();
}

ClipVertex.prototype.set = function(o) {
    this.v.set(o.v);
    this.id.set(o.id);
};

function clipSegmentToLine(vOut, vIn, normal, offset, vertexIndexA) {
    var numOut = 0;
    var distance0 = Vec2.dot(normal, vIn[0].v) - offset;
    var distance1 = Vec2.dot(normal, vIn[1].v) - offset;
    if (distance0 <= 0) vOut[numOut++].set(vIn[0]);
    if (distance1 <= 0) vOut[numOut++].set(vIn[1]);
    if (distance0 * distance1 < 0) {
        var interp = distance0 / (distance0 - distance1);
        vOut[numOut].v.wSet(1 - interp, vIn[0].v, interp, vIn[1].v);
        vOut[numOut].id.cf.indexA = vertexIndexA;
        vOut[numOut].id.cf.indexB = vIn[0].id.cf.indexB;
        vOut[numOut].id.cf.typeA = ContactFeature.e_vertex;
        vOut[numOut].id.cf.typeB = ContactFeature.e_face;
        ++numOut;
    }
    return numOut;
}


},{"./common/Math":18,"./common/Rot":20,"./common/Transform":22,"./common/Vec2":23,"./util/common":51}],7:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

var Settings = exports;

Settings.maxManifoldPoints = 2;

Settings.maxPolygonVertices = 12;

Settings.aabbExtension = .1;

Settings.aabbMultiplier = 2;

Settings.linearSlop = .005;

Settings.linearSlopSquared = Settings.linearSlop * Settings.linearSlop;

Settings.angularSlop = 2 / 180 * Math.PI;

Settings.polygonRadius = 2 * Settings.linearSlop;

Settings.maxSubSteps = 8;

Settings.maxTOIContacts = 32;

Settings.maxTOIIterations = 20;

Settings.maxDistnceIterations = 20;

Settings.velocityThreshold = 1;

Settings.maxLinearCorrection = .2;

Settings.maxAngularCorrection = 8 / 180 * Math.PI;

Settings.maxTranslation = 2;

Settings.maxTranslationSquared = Settings.maxTranslation * Settings.maxTranslation;

Settings.maxRotation = .5 * Math.PI;

Settings.maxRotationSquared = Settings.maxRotation * Settings.maxRotation;

Settings.baumgarte = .2;

Settings.toiBaugarte = .75;

Settings.timeToSleep = .5;

Settings.linearSleepTolerance = .01;

Settings.linearSleepToleranceSqr = Math.pow(Settings.linearSleepTolerance, 2);

Settings.angularSleepTolerance = 2 / 180 * Math.PI;

Settings.angularSleepToleranceSqr = Math.pow(Settings.angularSleepTolerance, 2);


},{}],8:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Shape;

var Math = require("./common/Math");

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

Shape.prototype.getType = function() {
    return this.m_type;
};

Shape.prototype._clone = function() {};

Shape.prototype.getChildCount = function() {};

Shape.prototype.testPoint = function(xf, p) {};

Shape.prototype.rayCast = function(output, input, transform, childIndex) {};

Shape.prototype.computeAABB = function(aabb, xf, childIndex) {};

Shape.prototype.computeMass = function(massData, density) {};

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

function Profile() {
    this.solveInit;
    this.solveVelocity;
    this.solvePosition;
}

function TimeStep(dt) {
    this.dt = 0;
    this.inv_dt = 0;
    this.velocityIterations = 0;
    this.positionIterations = 0;
    this.warmStarting = false;
    this.blockSolve = true;
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

Solver.prototype.solveWorld = function(step) {
    var world = this.m_world;
    var profile = this.m_profile;
    profile.solveInit = 0;
    profile.solveVelocity = 0;
    profile.solvePosition = 0;
    for (var b = world.m_bodyList; b; b = b.m_next) {
        b.m_islandFlag = false;
    }
    for (var c = world.m_contactList; c; c = c.m_next) {
        c.m_islandFlag = false;
    }
    for (var j = world.m_jointList; j; j = j.m_next) {
        j.m_islandFlag = false;
    }
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
        if (seed.isStatic()) {
            continue;
        }
        this.clear();
        stack.push(seed);
        seed.m_islandFlag = true;
        while (stack.length > 0) {
            var b = stack.pop();
            ASSERT && common.assert(b.isActive() == true);
            this.addBody(b);
            b.setAwake(true);
            if (b.isStatic()) {
                continue;
            }
            for (var ce = b.m_contactList; ce; ce = ce.next) {
                var contact = ce.contact;
                if (contact.m_islandFlag) {
                    continue;
                }
                if (contact.isEnabled() == false || contact.isTouching() == false) {
                    continue;
                }
                var sensorA = contact.m_fixtureA.m_isSensor;
                var sensorB = contact.m_fixtureB.m_isSensor;
                if (sensorA || sensorB) {
                    continue;
                }
                this.addContact(contact);
                contact.m_islandFlag = true;
                var other = ce.other;
                if (other.m_islandFlag) {
                    continue;
                }
                stack.push(other);
                other.m_islandFlag = true;
            }
            for (var je = b.m_jointList; je; je = je.next) {
                if (je.joint.m_islandFlag == true) {
                    continue;
                }
                var other = je.other;
                if (other.isActive() == false) {
                    continue;
                }
                this.addJoint(je.joint);
                je.joint.m_islandFlag = true;
                if (other.m_islandFlag) {
                    continue;
                }
                stack.push(other);
                other.m_islandFlag = true;
            }
        }
        this.solveIsland(step);
        for (var i = 0; i < this.m_bodies.length; ++i) {
            var b = this.m_bodies[i];
            if (b.isStatic()) {
                b.m_islandFlag = false;
            }
        }
    }
};

Solver.prototype.solveIsland = function(step) {
    var world = this.m_world;
    var profile = this.m_profile;
    var gravity = world.m_gravity;
    var allowSleep = world.m_allowSleep;
    var timer = Timer.now();
    var h = step.dt;
    for (var i = 0; i < this.m_bodies.length; ++i) {
        var body = this.m_bodies[i];
        var c = Vec2.clone(body.m_sweep.c);
        var a = body.m_sweep.a;
        var v = Vec2.clone(body.m_linearVelocity);
        var w = body.m_angularVelocity;
        body.m_sweep.c0.set(body.m_sweep.c);
        body.m_sweep.a0 = body.m_sweep.a;
        DEBUG && common.debug("P: ", a, c.x, c.y, w, v.x, v.y);
        if (body.isDynamic()) {
            v.wAdd(h * body.m_gravityScale, gravity);
            v.wAdd(h * body.m_invMass, body.m_force);
            w += h * body.m_invI * body.m_torque;
            DEBUG && common.debug("N: " + h, body.m_gravityScale, gravity.x, gravity.y, body.m_invMass, body.m_force.x, body.m_force.y);
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
    for (var i = 0; i < this.m_contacts.length; ++i) {
        var contact = this.m_contacts[i];
        contact.storeConstraintImpulses(step);
    }
    profile.solveVelocity = Timer.diff(timer);
    DEBUG && this.printBodies("C: ");
    for (var i = 0; i < this.m_bodies.length; ++i) {
        var body = this.m_bodies[i];
        var c = Vec2.clone(body.c_position.c);
        var a = body.c_position.a;
        var v = Vec2.clone(body.c_velocity.v);
        var w = body.c_velocity.w;
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
        c.wAdd(h, v);
        a += h * w;
        body.c_position.c.set(c);
        body.c_position.a = a;
        body.c_velocity.v.set(v);
        body.c_velocity.w = w;
    }
    DEBUG && this.printBodies("B: ");
    timer = Timer.now();
    var positionSolved = false;
    for (var i = 0; i < step.positionIterations; ++i) {
        var minSeparation = 0;
        for (var j = 0; j < this.m_contacts.length; ++j) {
            var contact = this.m_contacts[j];
            var separation = contact.solvePositionConstraint(step);
            minSeparation = Math.min(minSeparation, separation);
        }
        var contactsOkay = minSeparation >= -3 * Settings.linearSlop;
        var jointsOkay = true;
        for (var j = 0; j < this.m_joints.length; ++j) {
            var joint = this.m_joints[j];
            var jointOkay = joint.solvePositionConstraints(step);
            jointsOkay = jointsOkay && jointOkay;
        }
        if (contactsOkay && jointsOkay) {
            positionSolved = true;
            break;
        }
    }
    DEBUG && this.printBodies("L: ");
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
            c.m_toiFlag = false;
            c.m_islandFlag = false;
            c.m_toiCount = 0;
            c.m_toi = 1;
        }
    }
    if (DEBUG) for (var c = world.m_contactList; c; c = c.m_next) {
        DEBUG && common.debug("X:", c.m_toiFlag);
    }
    for (;;) {
        DEBUG && common.debug(";;");
        var minContact = null;
        var minAlpha = 1;
        for (var c = world.m_contactList; c; c = c.m_next) {
            DEBUG && common.debug("alpha0::", c.getFixtureA().getBody().m_sweep.alpha0, c.getFixtureB().getBody().m_sweep.alpha0);
            if (c.isEnabled() == false) {
                continue;
            }
            DEBUG && common.debug("toiCount:", c.m_toiCount, Settings.maxSubSteps);
            if (c.m_toiCount > Settings.maxSubSteps) {
                continue;
            }
            DEBUG && common.debug("toiFlag:", c.m_toiFlag);
            var alpha = 1;
            if (c.m_toiFlag) {
                alpha = c.m_toi;
            } else {
                var fA = c.getFixtureA();
                var fB = c.getFixtureB();
                DEBUG && common.debug("sensor:", fA.isSensor(), fB.isSensor());
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
                if (activeA == false && activeB == false) {
                    continue;
                }
                DEBUG && common.debug("alpha:", alpha, bA.m_sweep.alpha0, bB.m_sweep.alpha0);
                var collideA = bA.isBullet() || !bA.isDynamic();
                var collideB = bB.isBullet() || !bB.isDynamic();
                DEBUG && common.debug("collide:", collideA, collideB);
                if (collideA == false && collideB == false) {
                    continue;
                }
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
                var input = new TOIInput();
                input.proxyA.set(fA.getShape(), indexA);
                input.proxyB.set(fB.getShape(), indexB);
                input.sweepA.set(bA.m_sweep);
                input.sweepB.set(bB.m_sweep);
                input.tMax = 1;
                var output = new TOIOutput();
                TimeOfImpact(output, input);
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
                minContact = c;
                minAlpha = alpha;
            }
        }
        DEBUG && common.debug("minContact:", minContact == null, 1 - 10 * Math.EPSILON < minAlpha, minAlpha);
        if (minContact == null || 1 - 10 * Math.EPSILON < minAlpha) {
            world.m_stepComplete = true;
            break;
        }
        var fA = minContact.getFixtureA();
        var fB = minContact.getFixtureB();
        var bA = fA.getBody();
        var bB = fB.getBody();
        var backup1 = bA.m_sweep.clone();
        var backup2 = bB.m_sweep.clone();
        bA.advance(minAlpha);
        bB.advance(minAlpha);
        minContact.update(world);
        minContact.m_toiFlag = false;
        ++minContact.m_toiCount;
        if (minContact.isEnabled() == false || minContact.isTouching() == false) {
            minContact.setEnabled(false);
            bA.m_sweep.set(backup1);
            bB.m_sweep.set(backup2);
            bA.synchronizeTransform();
            bB.synchronizeTransform();
            continue;
        }
        bA.setAwake(true);
        bB.setAwake(true);
        this.clear();
        this.addBody(bA);
        this.addBody(bB);
        this.addContact(minContact);
        bA.m_islandFlag = true;
        bB.m_islandFlag = true;
        minContact.m_islandFlag = true;
        var bodies = [ bA, bB ];
        for (var i = 0; i < bodies.length; ++i) {
            var body = bodies[i];
            if (body.isDynamic()) {
                for (var ce = body.m_contactList; ce; ce = ce.next) {
                    var contact = ce.contact;
                    if (contact.m_islandFlag) {
                        continue;
                    }
                    var other = ce.other;
                    if (other.isDynamic() && !body.isBullet() && !other.isBullet()) {
                        continue;
                    }
                    var sensorA = contact.m_fixtureA.m_isSensor;
                    var sensorB = contact.m_fixtureB.m_isSensor;
                    if (sensorA || sensorB) {
                        continue;
                    }
                    var backup = other.m_sweep.clone();
                    if (other.m_islandFlag == false) {
                        other.advance(minAlpha);
                    }
                    contact.update(world);
                    if (contact.isEnabled() == false || contact.isTouching() == false) {
                        other.m_sweep.set(backup);
                        other.synchronizeTransform();
                        continue;
                    }
                    contact.m_islandFlag = true;
                    this.addContact(contact);
                    if (other.m_islandFlag) {
                        continue;
                    }
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
        for (var i = 0; i < this.m_bodies.length; ++i) {
            var body = this.m_bodies[i];
            body.m_islandFlag = false;
            if (!body.isDynamic()) {
                continue;
            }
            body.synchronizeFixtures();
            for (var ce = body.m_contactList; ce; ce = ce.next) {
                ce.contact.m_toiFlag = false;
                ce.contact.m_islandFlag = false;
            }
        }
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

Solver.prototype.solveIslandTOI = function(subStep, toiA, toiB) {
    DEBUG && common.debug("TOI++++++Island");
    var world = this.m_world;
    var profile = this.m_profile;
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
    for (var i = 0; i < subStep.positionIterations; ++i) {
        var minSeparation = 0;
        for (var j = 0; j < this.m_contacts.length; ++j) {
            var contact = this.m_contacts[j];
            var separation = contact.solvePositionConstraintTOI(subStep, toiA, toiB);
            minSeparation = Math.min(minSeparation, separation);
        }
        var contactsOkay = minSeparation >= -1.5 * Settings.linearSlop;
        if (contactsOkay) {
            break;
        }
    }
    if (false) {
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
    toiA.m_sweep.c0.set(toiA.c_position.c);
    toiA.m_sweep.a0 = toiA.c_position.a;
    toiB.m_sweep.c0.set(toiB.c_position.c);
    toiB.m_sweep.a0 = toiB.c_position.a;
    for (var i = 0; i < this.m_contacts.length; ++i) {
        var contact = this.m_contacts[i];
        contact.initVelocityConstraint(subStep);
    }
    for (var i = 0; i < subStep.velocityIterations; ++i) {
        for (var j = 0; j < this.m_contacts.length; ++j) {
            var contact = this.m_contacts[j];
            contact.solveVelocityConstraint(subStep);
        }
    }
    var h = subStep.dt;
    for (var i = 0; i < this.m_bodies.length; ++i) {
        var body = this.m_bodies[i];
        var c = Vec2.clone(body.c_position.c);
        var a = body.c_position.a;
        var v = Vec2.clone(body.c_velocity.v);
        var w = body.c_velocity.w;
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
        c.wAdd(h, v);
        a += h * w;
        body.c_position.c = c;
        body.c_position.a = a;
        body.c_velocity.v = v;
        body.c_velocity.w = w;
        body.m_sweep.c = c;
        body.m_sweep.a = a;
        body.m_linearVelocity = v;
        body.m_angularVelocity = w;
        body.synchronizeTransform();
    }
    this.postSolveIsland();
    DEBUG && common.debug("TOI------Island");
};

function ContactImpulse() {
    this.normalImpulses = [];
    this.tangentImpulses = [];
}

Solver.prototype.postSolveIsland = function() {
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


},{"./Body":2,"./Contact":3,"./Joint":5,"./Settings":7,"./collision/Distance":13,"./collision/TimeOfImpact":15,"./common/Math":18,"./common/Vec2":23,"./util/Timer":50,"./util/common":51}],10:[function(require,module,exports){
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
    this.m_warmStarting = def.warmStarting;
    this.m_continuousPhysics = def.continuousPhysics;
    this.m_subStepping = def.subStepping;
    this.m_blockSolve = def.blockSolve;
    this.m_velocityIterations = def.velocityIterations;
    this.m_positionIterations = def.positionIterations;
    this.m_t = 0;
    this.m_stepCount = 0;
    this.addPair = this.createContact.bind(this);
}

World.prototype.getBodyList = function() {
    return this.m_bodyList;
};

World.prototype.getJointList = function() {
    return this.m_jointList;
};

World.prototype.getContactList = function() {
    return this.m_contactList;
};

World.prototype.getBodyCount = function() {
    return this.m_bodyCount;
};

World.prototype.getJointCount = function() {
    return this.m_jointCount;
};

World.prototype.getContactCount = function() {
    return this.m_contactCount;
};

World.prototype.setGravity = function(gravity) {
    this.m_gravity = gravity;
};

World.prototype.getGravity = function() {
    return this.m_gravity;
};

World.prototype.isLocked = function() {
    return this.m_locked;
};

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

World.prototype.setWarmStarting = function(flag) {
    this.m_warmStarting = flag;
};

World.prototype.getWarmStarting = function() {
    return this.m_warmStarting;
};

World.prototype.setContinuousPhysics = function(flag) {
    this.m_continuousPhysics = flag;
};

World.prototype.getContinuousPhysics = function() {
    return this.m_continuousPhysics;
};

World.prototype.setSubStepping = function(flag) {
    this.m_subStepping = flag;
};

World.prototype.getSubStepping = function() {
    return this.m_subStepping;
};

World.prototype.setAutoClearForces = function(flag) {
    this.m_clearForces = flag;
};

World.prototype.getAutoClearForces = function() {
    return this.m_clearForces;
};

World.prototype.clearForces = function() {
    for (var body = this.m_bodyList; body; body = body.getNext()) {
        body.m_force.setZero();
        body.m_torque = 0;
    }
};

World.prototype.queryAABB = function(aabb, queryCallback) {
    ASSERT && common.assert(typeof queryCallback === "function");
    var broadPhase = this.m_broadPhase;
    this.m_broadPhase.query(aabb, function(proxyId) {
        var proxy = broadPhase.getUserData(proxyId);
        return queryCallback(proxy.fixture);
    });
};

World.prototype.rayCast = function(point1, point2, reportFixtureCallback) {
    ASSERT && common.assert(typeof reportFixtureCallback === "function");
    var broadPhase = this.m_broadPhase;
    this.m_broadPhase.rayCast({
        maxFraction: 1,
        p1: point1,
        p2: point2
    }, function(input, proxyId) {
        var proxy = broadPhase.getUserData(proxyId);
        var fixture = proxy.fixture;
        var index = proxy.childIndex;
        var output = {};
        var hit = fixture.rayCast(output, input, index);
        if (hit) {
            var fraction = output.fraction;
            var point = Vec2.add(Vec2.mul(1 - fraction, input.p1), Vec2.mul(fraction, input.p2));
            return reportFixtureCallback(fixture, point, output.normal, fraction);
        }
        return input.maxFraction;
    });
};

World.prototype.getProxyCount = function() {
    return this.m_broadPhase.getProxyCount();
};

World.prototype.getTreeHeight = function() {
    return this.m_broadPhase.getTreeHeight();
};

World.prototype.getTreeBalance = function() {
    return this.m_broadPhase.getTreeBalance();
};

World.prototype.getTreeQuality = function() {
    return this.m_broadPhase.getTreeQuality();
};

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

World.prototype.destroyBody = function(b) {
    ASSERT && common.assert(this.m_bodyCount > 0);
    ASSERT && common.assert(this.isLocked() == false);
    if (this.isLocked()) {
        return;
    }
    if (b.m_destroyed) {
        return false;
    }
    var je = b.m_jointList;
    while (je) {
        var je0 = je;
        je = je.next;
        this.publish("remove-joint", je0.joint);
        this.destroyJoint(je0.joint);
        b.m_jointList = je;
    }
    b.m_jointList = null;
    var ce = b.m_contactList;
    while (ce) {
        var ce0 = ce;
        ce = ce.next;
        this.destroyContact(ce0.contact);
        b.m_contactList = ce;
    }
    b.m_contactList = null;
    var f = b.m_fixtureList;
    while (f) {
        var f0 = f;
        f = f.m_next;
        this.publish("remove-fixture", f0);
        f0.destroyProxies(this.m_broadPhase);
        b.m_fixtureList = f;
    }
    b.m_fixtureList = null;
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

World.prototype.createJoint = function(joint) {
    ASSERT && common.assert(!!joint.m_bodyA);
    ASSERT && common.assert(!!joint.m_bodyB);
    ASSERT && common.assert(this.isLocked() == false);
    if (this.isLocked()) {
        return null;
    }
    joint.m_prev = null;
    joint.m_next = this.m_jointList;
    if (this.m_jointList) {
        this.m_jointList.m_prev = joint;
    }
    this.m_jointList = joint;
    ++this.m_jointCount;
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
    if (joint.m_collideConnected == false) {
        for (var edge = joint.m_bodyB.getContactList(); edge; edge = edge.next) {
            if (edge.other == joint.m_bodyA) {
                edge.contact.flagForFiltering();
            }
        }
    }
    return joint;
};

World.prototype.destroyJoint = function(joint) {
    ASSERT && common.assert(this.isLocked() == false);
    if (this.isLocked()) {
        return;
    }
    if (joint.m_prev) {
        joint.m_prev.m_next = joint.m_next;
    }
    if (joint.m_next) {
        joint.m_next.m_prev = joint.m_prev;
    }
    if (joint == this.m_jointList) {
        this.m_jointList = joint.m_next;
    }
    var bodyA = joint.m_bodyA;
    var bodyB = joint.m_bodyB;
    bodyA.setAwake(true);
    bodyB.setAwake(true);
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
    if (joint.m_collideConnected == false) {
        var edge = bodyB.getContactList();
        while (edge) {
            if (edge.other == bodyA) {
                edge.contact.flagForFiltering();
            }
            edge = edge.next;
        }
    }
    this.publish("remove-joint", joint);
};

var s_step = new Solver.TimeStep();

World.prototype.step = function(timeStep, velocityIterations, positionIterations) {
    if ((velocityIterations | 0) !== velocityIterations) {
        velocityIterations = 0;
    }
    velocityIterations = velocityIterations || this.m_velocityIterations;
    positionIterations = positionIterations || this.m_positionIterations;
    this.m_stepCount++;
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
    this.updateContacts();
    if (this.m_stepComplete && timeStep > 0) {
        this.m_solver.solveWorld(s_step);
        for (var b = this.m_bodyList; b; b = b.getNext()) {
            if (b.m_islandFlag == false) {
                continue;
            }
            if (b.isStatic()) {
                continue;
            }
            b.synchronizeFixtures();
        }
        this.findNewContacts();
    }
    if (this.m_continuousPhysics && timeStep > 0) {
        this.m_solver.solveWorldTOI(s_step);
    }
    if (this.m_clearForces) {
        this.clearForces();
    }
    this.m_locked = false;
};

World.prototype.findNewContacts = function() {
    this.m_broadPhase.updatePairs(this.addPair);
};

World.prototype.createContact = function(proxyA, proxyB) {
    var fixtureA = proxyA.fixture;
    var fixtureB = proxyB.fixture;
    var indexA = proxyA.childIndex;
    var indexB = proxyB.childIndex;
    var bodyA = fixtureA.getBody();
    var bodyB = fixtureB.getBody();
    if (bodyA == bodyB) {
        return;
    }
    var edge = bodyB.getContactList();
    while (edge) {
        if (edge.other == bodyA) {
            var fA = edge.contact.getFixtureA();
            var fB = edge.contact.getFixtureB();
            var iA = edge.contact.getChildIndexA();
            var iB = edge.contact.getChildIndexB();
            if (fA == fixtureA && fB == fixtureB && iA == indexA && iB == indexB) {
                return;
            }
            if (fA == fixtureB && fB == fixtureA && iA == indexB && iB == indexA) {
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
    var contact = Contact.create(fixtureA, indexA, fixtureB, indexB);
    if (contact == null) {
        return;
    }
    contact.m_prev = null;
    if (this.m_contactList != null) {
        contact.m_next = this.m_contactList;
        this.m_contactList.m_prev = contact;
    }
    this.m_contactList = contact;
    ++this.m_contactCount;
};

World.prototype.updateContacts = function() {
    var c, next_c = this.m_contactList;
    while (c = next_c) {
        next_c = c.getNext();
        var fixtureA = c.getFixtureA();
        var fixtureB = c.getFixtureB();
        var indexA = c.getChildIndexA();
        var indexB = c.getChildIndexB();
        var bodyA = fixtureA.getBody();
        var bodyB = fixtureB.getBody();
        if (c.m_filterFlag) {
            if (bodyB.shouldCollide(bodyA) == false) {
                this.destroyContact(c);
                continue;
            }
            if (fixtureB.shouldCollide(fixtureA) == false) {
                this.destroyContact(c);
                continue;
            }
            c.m_filterFlag = false;
        }
        var activeA = bodyA.isAwake() && !bodyA.isStatic();
        var activeB = bodyB.isAwake() && !bodyB.isStatic();
        if (activeA == false && activeB == false) {
            continue;
        }
        var proxyIdA = fixtureA.m_proxies[indexA].proxyId;
        var proxyIdB = fixtureB.m_proxies[indexB].proxyId;
        var overlap = this.m_broadPhase.testOverlap(proxyIdA, proxyIdB);
        if (overlap == false) {
            this.destroyContact(c);
            continue;
        }
        c.update(this);
    }
};

World.prototype.destroyContact = function(contact) {
    Contact.destroy(contact, this);
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

World.prototype.beginContact = function(contact) {
    this.publish("begin-contact", contact);
};

World.prototype.endContact = function(contact) {
    this.publish("end-contact", contact);
};

World.prototype.preSolve = function(contact, oldManifold) {
    this.publish("pre-solve", contact, oldManifold);
};

World.prototype.postSolve = function(contact, impulse) {
    this.publish("post-solve", contact, impulse);
};


},{"./Body":2,"./Contact":3,"./Solver":9,"./collision/BroadPhase":12,"./common/Vec2":23,"./util/Timer":50,"./util/common":51,"./util/options":53}],11:[function(require,module,exports){
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

AABB.prototype.isValid = function() {
    return AABB.isValid(this);
};

AABB.isValid = function(aabb) {
    var d = Vec2.sub(aabb.upperBound, aabb.lowerBound);
    var valid = d.x >= 0 && d.y >= 0 && Vec2.isValid(aabb.lowerBound) && Vec2.isValid(aabb.upperBound);
    return valid;
};

AABB.prototype.getCenter = function() {
    return Vec2.neo((this.lowerBound.x + this.upperBound.x) * .5, (this.lowerBound.y + this.upperBound.y) * .5);
};

AABB.prototype.getExtents = function() {
    return Vec2.neo((this.upperBound.x - this.lowerBound.x) * .5, (this.upperBound.y - this.lowerBound.y) * .5);
};

AABB.prototype.getPerimeter = function() {
    return 2 * (this.upperBound.x - this.lowerBound.x + this.upperBound.y - this.lowerBound.y);
};

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

AABB.prototype.rayCast = function(output, input) {
    var tmin = -Infinity;
    var tmax = Infinity;
    var p = input.p1;
    var d = Vec2.sub(input.p2, input.p1);
    var absD = Vec2.abs(d);
    var normal = Vec2.zero();
    for (var f = "x"; f !== null; f = f === "x" ? "y" : null) {
        if (absD.x < Math.EPSILON) {
            if (p[f] < this.lowerBound[f] || this.upperBound[f] < p[f]) {
                return false;
            }
        } else {
            var inv_d = 1 / d[f];
            var t1 = (this.lowerBound[f] - p[f]) * inv_d;
            var t2 = (this.upperBound[f] - p[f]) * inv_d;
            var s = -1;
            if (t1 > t2) {
                var temp = t1;
                t1 = t2, t2 = temp;
                s = 1;
            }
            if (t1 > tmin) {
                normal.setZero();
                normal[f] = s;
                tmin = t1;
            }
            tmax = Math.min(tmax, t2);
            if (tmin > tmax) {
                return false;
            }
        }
    }
    if (tmin < 0 || input.maxFraction < tmin) {
        return false;
    }
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

function BroadPhase() {
    this.m_tree = new DynamicTree();
    this.m_proxyCount = 0;
    this.m_moveBuffer = [];
    this.queryCallback = this.queryCallback.bind(this);
}

BroadPhase.prototype.getUserData = function(proxyId) {
    return this.m_tree.getUserData(proxyId);
};

BroadPhase.prototype.testOverlap = function(proxyIdA, proxyIdB) {
    var aabbA = this.m_tree.getFatAABB(proxyIdA);
    var aabbB = this.m_tree.getFatAABB(proxyIdB);
    return AABB.testOverlap(aabbA, aabbB);
};

BroadPhase.prototype.getFatAABB = function(proxyId) {
    return this.m_tree.getFatAABB(proxyId);
};

BroadPhase.prototype.getProxyCount = function() {
    return this.m_proxyCount;
};

BroadPhase.prototype.getTreeHeight = function() {
    return this.m_tree.getHeight();
};

BroadPhase.prototype.getTreeBalance = function() {
    return this.m_tree.getMaxBalance();
};

BroadPhase.prototype.getTreeQuality = function() {
    return this.m_tree.getAreaRatio();
};

BroadPhase.prototype.query = function(aabb, queryCallback) {
    this.m_tree.query(aabb, queryCallback);
};

BroadPhase.prototype.rayCast = function(input, rayCastCallback) {
    this.m_tree.rayCast(input, rayCastCallback);
};

BroadPhase.prototype.shiftOrigin = function(newOrigin) {
    this.m_tree.shiftOrigin(newOrigin);
};

BroadPhase.prototype.createProxy = function(aabb, userData) {
    ASSERT && common.assert(AABB.isValid(aabb));
    var proxyId = this.m_tree.createProxy(aabb, userData);
    this.m_proxyCount++;
    this.bufferMove(proxyId);
    return proxyId;
};

BroadPhase.prototype.destroyProxy = function(proxyId) {
    this.unbufferMove(proxyId);
    this.m_proxyCount--;
    this.m_tree.destroyProxy(proxyId);
};

BroadPhase.prototype.moveProxy = function(proxyId, aabb, displacement) {
    ASSERT && common.assert(AABB.isValid(aabb));
    var changed = this.m_tree.moveProxy(proxyId, aabb, displacement);
    if (changed) {
        this.bufferMove(proxyId);
    }
};

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

BroadPhase.prototype.updatePairs = function(addPairCallback) {
    ASSERT && common.assert(typeof addPairCallback === "function");
    this.m_callback = addPairCallback;
    while (this.m_moveBuffer.length > 0) {
        this.m_queryProxyId = this.m_moveBuffer.pop();
        if (this.m_queryProxyId === null) {
            continue;
        }
        var fatAABB = this.m_tree.getFatAABB(this.m_queryProxyId);
        this.m_tree.query(fatAABB, this.queryCallback);
    }
};

BroadPhase.prototype.queryCallback = function(proxyId) {
    if (proxyId == this.m_queryProxyId) {
        return true;
    }
    var proxyIdA = Math.min(proxyId, this.m_queryProxyId);
    var proxyIdB = Math.max(proxyId, this.m_queryProxyId);
    var userDataA = this.m_tree.getUserData(proxyIdA);
    var userDataB = this.m_tree.getUserData(proxyIdB);
    this.m_callback(userDataA, userDataB);
    return true;
};


},{"../Settings":7,"../common/Math":18,"../util/common":51,"./AABB":11,"./DynamicTree":14}],13:[function(require,module,exports){
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

stats.gjkCalls = 0;

stats.gjkIters = 0;

stats.gjkMaxIters = 0;

function DistanceInput() {
    this.proxyA = new DistanceProxy();
    this.proxyB = new DistanceProxy();
    this.transformA = null;
    this.transformB = null;
    this.useRadii = false;
}

function DistanceOutput() {
    this.pointA = Vec2.zero();
    this.pointB = Vec2.zero();
    this.distance;
    this.iterations;
}

function SimplexCache() {
    this.metric = 0;
    this.indexA = [];
    this.indexB = [];
    this.count = 0;
}

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
    var simplex = new Simplex();
    simplex.readCache(cache, proxyA, xfA, proxyB, xfB);
    DEBUG && common.debug("cache", simplex.print());
    var vertices = simplex.m_v;
    var k_maxIters = Settings.maxDistnceIterations;
    var saveA = [];
    var saveB = [];
    var saveCount = 0;
    var distanceSqr1 = Infinity;
    var distanceSqr2 = Infinity;
    var iter = 0;
    while (iter < k_maxIters) {
        saveCount = simplex.m_count;
        for (var i = 0; i < saveCount; ++i) {
            saveA[i] = vertices[i].indexA;
            saveB[i] = vertices[i].indexB;
        }
        simplex.solve();
        if (simplex.m_count == 3) {
            break;
        }
        var p = simplex.getClosestPoint();
        distanceSqr2 = p.lengthSquared();
        if (distanceSqr2 >= distanceSqr1) {}
        distanceSqr1 = distanceSqr2;
        var d = simplex.getSearchDirection();
        if (d.lengthSquared() < Math.EPSILON * Math.EPSILON) {
            break;
        }
        var vertex = vertices[simplex.m_count];
        vertex.indexA = proxyA.getSupport(Rot.mulT(xfA.q, Vec2.neg(d)));
        vertex.wA = Transform.mul(xfA, proxyA.getVertex(vertex.indexA));
        vertex.indexB = proxyB.getSupport(Rot.mulT(xfB.q, d));
        vertex.wB = Transform.mul(xfB, proxyB.getVertex(vertex.indexB));
        vertex.w = Vec2.sub(vertex.wB, vertex.wA);
        ++iter;
        ++stats.gjkIters;
        var duplicate = false;
        for (var i = 0; i < saveCount; ++i) {
            if (vertex.indexA == saveA[i] && vertex.indexB == saveB[i]) {
                duplicate = true;
                break;
            }
        }
        if (duplicate) {
            break;
        }
        ++simplex.m_count;
    }
    stats.gjkMaxIters = Math.max(stats.gjkMaxIters, iter);
    simplex.getWitnessPoints(output.pointA, output.pointB);
    output.distance = Vec2.distance(output.pointA, output.pointB);
    output.iterations = iter;
    DEBUG && common.debug("Distance:", output.distance, output.pointA.x, output.pointA.y, output.pointB.x, output.pointB.y);
    simplex.writeCache(cache);
    if (input.useRadii) {
        var rA = proxyA.m_radius;
        var rB = proxyB.m_radius;
        if (output.distance > rA + rB && output.distance > Math.EPSILON) {
            output.distance -= rA + rB;
            var normal = Vec2.sub(output.pointB, output.pointA);
            normal.normalize();
            output.pointA.wAdd(rA, normal);
            output.pointB.wSub(rB, normal);
        } else {
            var p = Vec2.mid(output.pointA, output.pointB);
            output.pointA.set(p);
            output.pointB.set(p);
            output.distance = 0;
        }
    }
}

function DistanceProxy() {
    this.m_buffer = [];
    this.m_vertices = [];
    this.m_count = 0;
    this.m_radius = 0;
}

DistanceProxy.prototype.getVertexCount = function() {
    return this.m_count;
};

DistanceProxy.prototype.getVertex = function(index) {
    ASSERT && common.assert(0 <= index && index < this.m_count);
    return this.m_vertices[index];
};

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

DistanceProxy.prototype.getSupportVertex = function(d) {
    return this.m_vertices[this.getSupport(d)];
};

DistanceProxy.prototype.set = function(shape, index) {
    ASSERT && common.assert(typeof shape.computeDistanceProxy === "function");
    shape.computeDistanceProxy(this, index);
};

function SimplexVertex() {
    this.indexA;
    this.indexB;
    this.wA = Vec2.zero();
    this.wB = Vec2.zero();
    this.w = Vec2.zero();
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

Simplex.prototype.readCache = function(cache, proxyA, transformA, proxyB, transformB) {
    ASSERT && common.assert(cache.count <= 3);
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
    if (this.m_count > 1) {
        var metric1 = cache.metric;
        var metric2 = this.getMetric();
        if (metric2 < .5 * metric1 || 2 * metric1 < metric2 || metric2 < Math.EPSILON) {
            this.m_count = 0;
        }
    }
    if (this.m_count == 0) {
        var v = this.m_v[0];
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
                return Vec2.cross(1, e12);
            } else {
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

Simplex.prototype.solve2 = function() {
    var w1 = this.m_v1.w;
    var w2 = this.m_v2.w;
    var e12 = Vec2.sub(w2, w1);
    var d12_2 = -Vec2.dot(w1, e12);
    if (d12_2 <= 0) {
        this.m_v1.a = 1;
        this.m_count = 1;
        return;
    }
    var d12_1 = Vec2.dot(w2, e12);
    if (d12_1 <= 0) {
        this.m_v2.a = 1;
        this.m_count = 1;
        this.m_v1.set(this.m_v2);
        return;
    }
    var inv_d12 = 1 / (d12_1 + d12_2);
    this.m_v1.a = d12_1 * inv_d12;
    this.m_v2.a = d12_2 * inv_d12;
    this.m_count = 2;
};

Simplex.prototype.solve3 = function() {
    var w1 = this.m_v1.w;
    var w2 = this.m_v2.w;
    var w3 = this.m_v3.w;
    var e12 = Vec2.sub(w2, w1);
    var w1e12 = Vec2.dot(w1, e12);
    var w2e12 = Vec2.dot(w2, e12);
    var d12_1 = w2e12;
    var d12_2 = -w1e12;
    var e13 = Vec2.sub(w3, w1);
    var w1e13 = Vec2.dot(w1, e13);
    var w3e13 = Vec2.dot(w3, e13);
    var d13_1 = w3e13;
    var d13_2 = -w1e13;
    var e23 = Vec2.sub(w3, w2);
    var w2e23 = Vec2.dot(w2, e23);
    var w3e23 = Vec2.dot(w3, e23);
    var d23_1 = w3e23;
    var d23_2 = -w2e23;
    var n123 = Vec2.cross(e12, e13);
    var d123_1 = n123 * Vec2.cross(w2, w3);
    var d123_2 = n123 * Vec2.cross(w3, w1);
    var d123_3 = n123 * Vec2.cross(w1, w2);
    if (d12_2 <= 0 && d13_2 <= 0) {
        this.m_v1.a = 1;
        this.m_count = 1;
        return;
    }
    if (d12_1 > 0 && d12_2 > 0 && d123_3 <= 0) {
        var inv_d12 = 1 / (d12_1 + d12_2);
        this.m_v1.a = d12_1 * inv_d12;
        this.m_v2.a = d12_2 * inv_d12;
        this.m_count = 2;
        return;
    }
    if (d13_1 > 0 && d13_2 > 0 && d123_2 <= 0) {
        var inv_d13 = 1 / (d13_1 + d13_2);
        this.m_v1.a = d13_1 * inv_d13;
        this.m_v3.a = d13_2 * inv_d13;
        this.m_count = 2;
        this.m_v2.set(this.m_v3);
        return;
    }
    if (d12_1 <= 0 && d23_2 <= 0) {
        this.m_v2.a = 1;
        this.m_count = 1;
        this.m_v1.set(this.m_v2);
        return;
    }
    if (d13_1 <= 0 && d23_1 <= 0) {
        this.m_v3.a = 1;
        this.m_count = 1;
        this.m_v1.set(this.m_v3);
        return;
    }
    if (d23_1 > 0 && d23_2 > 0 && d123_1 <= 0) {
        var inv_d23 = 1 / (d23_1 + d23_2);
        this.m_v2.a = d23_1 * inv_d23;
        this.m_v3.a = d23_2 * inv_d23;
        this.m_count = 2;
        this.m_v1.set(this.m_v3);
        return;
    }
    var inv_d123 = 1 / (d123_1 + d123_2 + d123_3);
    this.m_v1.a = d123_1 * inv_d123;
    this.m_v2.a = d123_2 * inv_d123;
    this.m_v3.a = d123_3 * inv_d123;
    this.m_count = 3;
};

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


},{"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../common/stats":26,"../util/Timer":50,"../util/common":51}],14:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

var Settings = require("../Settings");

var common = require("../util/common");

var Pool = require("../util/Pool");

var Vec2 = require("../common/Vec2");

var Math = require("../common/Math");

var AABB = require("./AABB");

module.exports = DynamicTree;

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

DynamicTree.prototype.getUserData = function(id) {
    var node = this.m_nodes[id];
    ASSERT && common.assert(!!node);
    return node.userData;
};

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

DynamicTree.prototype.createProxy = function(aabb, userData) {
    ASSERT && common.assert(AABB.isValid(aabb));
    var node = this.allocateNode();
    node.aabb.set(aabb);
    AABB.extend(node.aabb, Settings.aabbExtension);
    node.userData = userData;
    node.height = 0;
    this.insertLeaf(node);
    return node.id;
};

DynamicTree.prototype.destroyProxy = function(id) {
    var node = this.m_nodes[id];
    ASSERT && common.assert(!!node);
    ASSERT && common.assert(node.isLeaf());
    this.removeLeaf(node);
    this.freeNode(node);
};

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
    aabb = node.aabb;
    AABB.extend(aabb, Settings.aabbExtension);
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
    var leafAABB = leaf.aabb;
    var index = this.m_root;
    while (index.isLeaf() == false) {
        var child1 = index.child1;
        var child2 = index.child2;
        var area = index.aabb.getPerimeter();
        var combinedAABB = new AABB();
        combinedAABB.combine(index.aabb, leafAABB);
        var combinedArea = combinedAABB.getPerimeter();
        var cost = 2 * combinedArea;
        var inheritanceCost = 2 * (combinedArea - area);
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
        if (cost < cost1 && cost < cost2) {
            break;
        }
        if (cost1 < cost2) {
            index = child1;
        } else {
            index = child2;
        }
    }
    var sibling = index;
    var oldParent = sibling.parent;
    var newParent = this.allocateNode();
    newParent.parent = oldParent;
    newParent.userData = null;
    newParent.aabb.combine(leafAABB, sibling.aabb);
    newParent.height = sibling.height + 1;
    if (oldParent != null) {
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
        newParent.child1 = sibling;
        newParent.child2 = leaf;
        sibling.parent = newParent;
        leaf.parent = newParent;
        this.m_root = newParent;
    }
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
        if (grandParent.child1 == parent) {
            grandParent.child1 = sibling;
        } else {
            grandParent.child2 = sibling;
        }
        sibling.parent = grandParent;
        this.freeNode(parent);
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

DynamicTree.prototype.balance = function(iA) {
    ASSERT && common.assert(iA != null);
    var A = iA;
    if (A.isLeaf() || A.height < 2) {
        return iA;
    }
    var B = A.child1;
    var C = A.child2;
    var balance = C.height - B.height;
    if (balance > 1) {
        var F = C.child1;
        var G = C.child2;
        C.child1 = A;
        C.parent = A.parent;
        A.parent = C;
        if (C.parent != null) {
            if (C.parent.child1 == iA) {
                C.parent.child1 = C;
            } else {
                C.parent.child2 = C;
            }
        } else {
            this.m_root = C;
        }
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
    if (balance < -1) {
        var D = B.child1;
        var E = B.child2;
        B.child1 = A;
        B.parent = A.parent;
        A.parent = B;
        if (B.parent != null) {
            if (B.parent.child1 == A) {
                B.parent.child1 = B;
            } else {
                B.parent.child2 = B;
            }
        } else {
            this.m_root = B;
        }
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

DynamicTree.prototype.getHeight = function() {
    if (this.m_root == null) {
        return 0;
    }
    return this.m_root.height;
};

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
            continue;
        }
        totalArea += node.aabb.getPerimeter();
    }
    iteratorPool.release(it);
    return totalArea / rootArea;
};

DynamicTree.prototype.computeHeight = function(id) {
    var node;
    if (typeof id !== "undefined") {
        node = this.m_nodes[id];
    } else {
        node = this.m_root;
    }
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

DynamicTree.prototype.validate = function() {
    ValidateStructure(this.m_root);
    ValidateMetrics(this.m_root);
    ASSERT && common.assert(this.getHeight() == this.computeHeight());
};

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

DynamicTree.prototype.rebuildBottomUp = function() {
    var nodes = [];
    var count = 0;
    var node, it = iteratorPool.allocate().preorder();
    while (node = it.next()) {
        if (node.height < 0) {
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

DynamicTree.prototype.shiftOrigin = function(newOrigin) {
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

DynamicTree.prototype.rayCast = function(input, rayCastCallback) {
    ASSERT && common.assert(typeof rayCastCallback === "function");
    var p1 = input.p1;
    var p2 = input.p2;
    var r = Vec2.sub(p2, p1);
    ASSERT && common.assert(r.lengthSquared() > 0);
    r.normalize();
    var v = Vec2.cross(1, r);
    var abs_v = Vec2.abs(v);
    var maxFraction = input.maxFraction;
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
                return;
            }
            if (value > 0) {
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


},{"../Settings":7,"../common/Math":18,"../common/Vec2":23,"../util/Pool":49,"../util/common":51,"./AABB":11}],15:[function(require,module,exports){
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

function TOIInput() {
    this.proxyA = new DistanceProxy();
    this.proxyB = new DistanceProxy();
    this.sweepA = new Sweep();
    this.sweepB = new Sweep();
    this.tMax;
}

TOIOutput.e_unknown = 0;

TOIOutput.e_failed = 1;

TOIOutput.e_overlapped = 2;

TOIOutput.e_touching = 3;

TOIOutput.e_separated = 4;

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

function TimeOfImpact(output, input) {
    var timer = Timer.now();
    ++stats.toiCalls;
    output.state = TOIOutput.e_unknown;
    output.t = input.tMax;
    var proxyA = input.proxyA;
    var proxyB = input.proxyB;
    var sweepA = input.sweepA;
    var sweepB = input.sweepB;
    DEBUG && common.debug("sweepA", sweepA.localCenter.x, sweepA.localCenter.y, sweepA.c.x, sweepA.c.y, sweepA.a, sweepA.alpha0, sweepA.c0.x, sweepA.c0.y, sweepA.a0);
    DEBUG && common.debug("sweepB", sweepB.localCenter.x, sweepB.localCenter.y, sweepB.c.x, sweepB.c.y, sweepB.a, sweepB.alpha0, sweepB.c0.x, sweepB.c0.y, sweepB.a0);
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
    var cache = new SimplexCache();
    var distanceInput = new DistanceInput();
    distanceInput.proxyA = input.proxyA;
    distanceInput.proxyB = input.proxyB;
    distanceInput.useRadii = false;
    for (;;) {
        var xfA = Transform.identity();
        var xfB = Transform.identity();
        sweepA.getTransform(xfA, t1);
        sweepB.getTransform(xfB, t1);
        DEBUG && common.debug("xfA:", xfA.p.x, xfA.p.y, xfA.q.c, xfA.q.s);
        DEBUG && common.debug("xfB:", xfB.p.x, xfB.p.y, xfB.q.c, xfB.q.s);
        distanceInput.transformA = xfA;
        distanceInput.transformB = xfB;
        var distanceOutput = new DistanceOutput();
        Distance(distanceOutput, cache, distanceInput);
        DEBUG && common.debug("distance:", distanceOutput.distance);
        if (distanceOutput.distance <= 0) {
            output.state = TOIOutput.e_overlapped;
            output.t = 0;
            break;
        }
        if (distanceOutput.distance < target + tolerance) {
            output.state = TOIOutput.e_touching;
            output.t = t1;
            break;
        }
        var fcn = new SeparationFunction();
        fcn.initialize(cache, proxyA, sweepA, proxyB, sweepB, t1);
        if (false) {
            var N = 100;
            var dx = 1 / N;
            var xs = [];
            var fs = [];
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
        var done = false;
        var t2 = tMax;
        var pushBackIter = 0;
        for (;;) {
            var s2 = fcn.findMinSeparation(t2);
            var indexA = fcn.indexA;
            var indexB = fcn.indexB;
            if (s2 > target + tolerance) {
                output.state = TOIOutput.e_separated;
                output.t = tMax;
                done = true;
                break;
            }
            if (s2 > target - tolerance) {
                t1 = t2;
                break;
            }
            var s1 = fcn.evaluate(t1);
            var indexA = fcn.indexA;
            var indexB = fcn.indexB;
            DEBUG && common.debug("s1:", s1, target, tolerance, t1);
            if (s1 < target - tolerance) {
                output.state = TOIOutput.e_failed;
                output.t = t1;
                done = true;
                break;
            }
            if (s1 <= target + tolerance) {
                output.state = TOIOutput.e_touching;
                output.t = t1;
                done = true;
                break;
            }
            var rootIterCount = 0;
            var a1 = t1, a2 = t2;
            for (;;) {
                var t;
                if (rootIterCount & 1) {
                    t = a1 + (target - s1) * (a2 - a1) / (s2 - s1);
                } else {
                    t = .5 * (a1 + a2);
                }
                ++rootIterCount;
                ++stats.toiRootIters;
                var s = fcn.evaluate(t);
                var indexA = fcn.indexA;
                var indexB = fcn.indexB;
                if (Math.abs(s - target) < tolerance) {
                    t2 = t;
                    break;
                }
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

var e_points = 1;

var e_faceA = 2;

var e_faceB = 3;

function SeparationFunction() {
    this.m_proxyA = new DistanceProxy();
    this.m_proxyB = new DistanceProxy();
    this.m_sweepA;
    this.m_sweepB;
    this.m_type;
    this.m_localPoint = Vec2.zero();
    this.m_axis = Vec2.zero();
}

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
    var xfA = Transform.identity();
    var xfB = Transform.identity();
    this.m_sweepA.getTransform(xfA, t);
    this.m_sweepB.getTransform(xfB, t);
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


},{"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../common/stats":26,"../util/Timer":50,"../util/common":51,"./Distance":13}],16:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Mat22;

var common = require("../util/common");

var Math = require("./Math");

var Vec2 = require("./Vec2");

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

Mat22.mul = function(mx, v) {
    if (v && "x" in v && "y" in v) {
        ASSERT && Vec2.assert(v);
        var x = mx.ex.x * v.x + mx.ey.x * v.y;
        var y = mx.ex.y * v.x + mx.ey.y * v.y;
        return Vec2.neo(x, y);
    } else if (v && "ex" in v && "ey" in v) {
        ASSERT && Mat22.assert(v);
        return new Mat22(Vec2.mul(mx, v.ex), Vec2.mul(mx, v.ey));
    }
    ASSERT && common.assert(false);
};

Mat22.mulT = function(mx, v) {
    if (v && "x" in v && "y" in v) {
        ASSERT && Vec2.assert(v);
        return Vec2.neo(Vec2.dot(v, mx.ex), Vec2.dot(v, mx.ey));
    } else if (v && "ex" in v && "ey" in v) {
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


},{"../util/common":51,"./Math":18,"./Vec2":23}],17:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Mat33;

var common = require("../util/common");

var Math = require("./Math");

var Vec2 = require("./Vec2");

var Vec3 = require("./Vec3");

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

Mat33.prototype.setZero = function() {
    this.ex.setZero();
    this.ey.setZero();
    this.ez.setZero();
    return this;
};

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


},{"../util/common":51,"./Math":18,"./Vec2":23,"./Vec3":24}],18:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

var common = require("../util/common");

var create = require("../util/create");

var native = Math;

var math = module.exports = create(native);

math.EPSILON = 1e-9;

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

math.invSqrt = function(x) {
    return 1 / native.sqrt(x);
};

math.nextPowerOfTwo = function(x) {
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


},{"../util/common":51,"../util/create":52}],19:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Position;

var Vec2 = require("./Vec2");

var Rot = require("./Rot");

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
        this.s = Math.sin(angle);
        this.c = Math.cos(angle);
    }
};

Rot.prototype.setAngle = function(angle) {
    ASSERT && Math.assert(angle);
    this.s = Math.sin(angle);
    this.c = Math.cos(angle);
};

Rot.prototype.getAngle = function() {
    return Math.atan2(this.s, this.c);
};

Rot.prototype.getXAxis = function() {
    return Vec2.neo(this.c, this.s);
};

Rot.prototype.getYAxis = function() {
    return Vec2.neo(-this.s, this.c);
};

Rot.mul = function(rot, m) {
    ASSERT && Rot.assert(rot);
    if ("c" in m && "s" in m) {
        ASSERT && Rot.assert(m);
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

Rot.mulT = function(rot, m) {
    if ("c" in m && "s" in m) {
        ASSERT && Rot.assert(m);
        var qr = Rot.identity();
        qr.s = rot.c * m.s - rot.s * m.c;
        qr.c = rot.c * m.c + rot.s * m.s;
        return qr;
    } else if ("x" in m && "y" in m) {
        ASSERT && Vec2.assert(m);
        return Vec2.neo(rot.c * m.x + rot.s * m.y, -rot.s * m.x + rot.c * m.y);
    }
};


},{"../util/common":51,"./Math":18,"./Vec2":23}],21:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Sweep;

var common = require("../util/common");

var Math = require("./Math");

var Vec2 = require("./Vec2");

var Rot = require("./Rot");

var Transform = require("./Transform");

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

Sweep.prototype.getTransform = function(xf, beta) {
    beta = typeof beta === "undefined" ? 0 : beta;
    xf.q.setAngle((1 - beta) * this.a0 + beta * this.a);
    xf.p.wSet(1 - beta, this.c0, beta, this.c);
    xf.p.sub(Rot.mul(xf.q, this.localCenter));
};

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


},{"../util/common":51,"./Math":18,"./Rot":20,"./Transform":22,"./Vec2":23}],22:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Transform;

var common = require("../util/common");

var Vec2 = require("./Vec2");

var Rot = require("./Rot");

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

Transform.prototype.setIdentity = function() {
    this.p.setZero();
    this.q.setIdentity();
};

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
        var xf = Transform.identity();
        xf.q = Rot.mul(a.q, b.q);
        xf.p = Vec2.add(Rot.mul(a.q, b.p), a.p);
        return xf;
    }
};

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
        var xf = Transform.identity();
        xf.q.set(Rot.mulT(a.q, b.q));
        xf.p.set(Rot.mulT(a.q, Vec2.sub(b.p, a.p)));
        return xf;
    }
};


},{"../util/common":51,"./Rot":20,"./Vec2":23}],23:[function(require,module,exports){
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

Vec2.prototype.setZero = function() {
    this.x = 0;
    this.y = 0;
    return this;
};

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
    this.x = x;
    this.y = y;
    return this;
};

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
    this.x -= x;
    this.y -= y;
    return this;
};

Vec2.prototype.sub = function(w) {
    ASSERT && Vec2.assert(w);
    this.x -= w.x;
    this.y -= w.y;
    return this;
};

Vec2.prototype.mul = function(m) {
    ASSERT && Math.assert(m);
    this.x *= m;
    this.y *= m;
    return this;
};

Vec2.prototype.length = function() {
    return Vec2.lengthOf(this);
};

Vec2.prototype.lengthSquared = function() {
    return Vec2.lengthSquared(this);
};

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

Vec2.lengthOf = function(v) {
    ASSERT && Vec2.assert(v);
    return Math.sqrt(v.x * v.x + v.y * v.y);
};

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

Vec2.skew = function(v) {
    ASSERT && Vec2.assert(v);
    return Vec2.neo(-v.y, v.x);
};

Vec2.dot = function(v, w) {
    ASSERT && Vec2.assert(v);
    ASSERT && Vec2.assert(w);
    return v.x * w.x + v.y * w.y;
};

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


},{"../util/common":51,"./Math":18}],24:[function(require,module,exports){
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

Vec3.dot = function(v, w) {
    return v.x * w.x + v.y * w.y + v.z * w.z;
};

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


},{"../util/common":51,"./Math":18}],25:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports = Velocity;

var Vec2 = require("./Vec2");

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


},{"./Body":2,"./Contact":3,"./Fixture":4,"./Joint":5,"./Manifold":6,"./Settings":7,"./Shape":8,"./World":10,"./collision/AABB":11,"./collision/Distance":13,"./collision/DynamicTree":14,"./collision/TimeOfImpact":15,"./common/Math":18,"./common/Rot":20,"./common/Sweep":21,"./common/Transform":22,"./common/Vec2":23,"./common/stats":26,"./joint/DistanceJoint":28,"./joint/FrictionJoint":29,"./joint/GearJoint":30,"./joint/MotorJoint":31,"./joint/MouseJoint":32,"./joint/PrismaticJoint":33,"./joint/PulleyJoint":34,"./joint/RevoluteJoint":35,"./joint/RopeJoint":36,"./joint/WeldJoint":37,"./joint/WheelJoint":38,"./shape/BoxShape":39,"./shape/ChainShape":40,"./shape/CircleShape":41,"./shape/CollideCircle":42,"./shape/CollideCirclePolygone":43,"./shape/CollideEdgeCircle":44,"./shape/CollideEdgePolygon":45,"./shape/CollidePolygon":46,"./shape/EdgeShape":47,"./shape/PolygonShape":48}],28:[function(require,module,exports){
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

var DistanceJointDef = {
    frequencyHz: 0,
    dampingRatio: 0
};

function DistanceJoint(def, bodyA, anchorA, bodyB, anchorB) {
    if (!(this instanceof DistanceJoint)) {
        return new DistanceJoint(def, bodyA, anchorA, bodyB, anchorB);
    }
    def = options(def, DistanceJointDef);
    Joint.call(this, def, bodyA, bodyB);
    this.m_type = DistanceJoint.TYPE;
    this.m_localAnchorA = def.localAnchorA || bodyA.getLocalPoint(anchorA);
    this.m_localAnchorB = def.localAnchorB || bodyB.getLocalPoint(anchorB);
    this.m_length = Vec2.distance(anchorB, anchorA);
    this.m_frequencyHz = def.frequencyHz;
    this.m_dampingRatio = def.dampingRatio;
    this.m_impulse = 0;
    this.m_gamma = 0;
    this.m_bias = 0;
    this.m_u;
    this.m_rA;
    this.m_rB;
    this.m_localCenterA;
    this.m_localCenterB;
    this.m_invMassA;
    this.m_invMassB;
    this.m_invIA;
    this.m_invIB;
    this.m_mass;
}

DistanceJoint.prototype.getLocalAnchorA = function() {
    return this.m_localAnchorA;
};

DistanceJoint.prototype.getLocalAnchorB = function() {
    return this.m_localAnchorB;
};

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
    var length = this.m_u.length();
    if (length > Settings.linearSlop) {
        this.m_u.mul(1 / length);
    } else {
        this.m_u.set(0, 0);
    }
    var crAu = Vec2.cross(this.m_rA, this.m_u);
    var crBu = Vec2.cross(this.m_rB, this.m_u);
    var invMass = this.m_invMassA + this.m_invIA * crAu * crAu + this.m_invMassB + this.m_invIB * crBu * crBu;
    this.m_mass = invMass != 0 ? 1 / invMass : 0;
    if (this.m_frequencyHz > 0) {
        var C = length - this.m_length;
        var omega = 2 * Math.PI * this.m_frequencyHz;
        var d = 2 * this.m_mass * this.m_dampingRatio * omega;
        var k = this.m_mass * omega * omega;
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


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/create":52,"../util/options":53}],29:[function(require,module,exports){
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

var FrictionJointDef = {
    maxForce: 0,
    maxTorque: 0
};

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
    this.m_linearImpulse = Vec2.zero();
    this.m_angularImpulse = 0;
    this.m_maxForce = def.maxForce;
    this.m_maxTorque = def.maxTorque;
    this.m_rA;
    this.m_rB;
    this.m_localCenterA;
    this.m_localCenterB;
    this.m_invMassA;
    this.m_invMassB;
    this.m_invIA;
    this.m_invIB;
    this.m_linearMass;
    this.m_angularMass;
}

FrictionJoint.prototype.getLocalAnchorA = function() {
    return this.m_localAnchorA;
};

FrictionJoint.prototype.getLocalAnchorB = function() {
    return this.m_localAnchorB;
};

FrictionJoint.prototype.setMaxForce = function(force) {
    ASSERT && common.assert(IsValid(force) && force >= 0);
    this.m_maxForce = force;
};

FrictionJoint.prototype.getMaxForce = function() {
    return this.m_maxForce;
};

FrictionJoint.prototype.setMaxTorque = function(torque) {
    ASSERT && common.assert(IsValid(torque) && torque >= 0);
    this.m_maxTorque = torque;
};

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
    this.m_rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    this.m_rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    var mA = this.m_invMassA, mB = this.m_invMassB;
    var iA = this.m_invIA, iB = this.m_invIB;
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
    var iA = this.m_invIA, iB = this.m_invIB;
    var h = step.dt;
    {
        var Cdot = wB - wA;
        var impulse = -this.m_angularMass * Cdot;
        var oldImpulse = this.m_angularImpulse;
        var maxImpulse = h * this.m_maxTorque;
        this.m_angularImpulse = Math.clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
        impulse = this.m_angularImpulse - oldImpulse;
        wA -= iA * impulse;
        wB += iB * impulse;
    }
    {
        var Cdot = Vec2.sub(Vec2.add(vB, Vec2.cross(wB, this.m_rB)), Vec2.add(vA, Vec2.cross(wA, this.m_rA)));
        var impulse = Vec2.neg(Mat22.mul(this.m_linearMass, Cdot));
        var oldImpulse = this.m_linearImpulse;
        this.m_linearImpulse.add(impulse);
        var maxImpulse = h * this.m_maxForce;
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


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":51,"../util/create":52,"../util/options":53}],30:[function(require,module,exports){
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

var GearJointDef = {
    ratio: 1
};

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
    var coordinateA, coordinateB;
    this.m_bodyC = this.m_joint1.getBodyA();
    this.m_bodyA = this.m_joint1.getBodyB();
    var xfA = this.m_bodyA.m_xf;
    var aA = this.m_bodyA.m_sweep.a;
    var xfC = this.m_bodyC.m_xf;
    var aC = this.m_bodyC.m_sweep.a;
    if (this.m_type1 == RevoluteJoint.TYPE) {
        var revolute = joint1;
        this.m_localAnchorC = revolute.m_localAnchorA;
        this.m_localAnchorA = revolute.m_localAnchorB;
        this.m_referenceAngleA = revolute.m_referenceAngle;
        this.m_localAxisC = Vec2.zero();
        coordinateA = aA - aC - this.m_referenceAngleA;
    } else {
        var prismatic = joint1;
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
    var xfB = this.m_bodyB.m_xf;
    var aB = this.m_bodyB.m_sweep.a;
    var xfD = this.m_bodyD.m_xf;
    var aD = this.m_bodyD.m_sweep.a;
    if (this.m_type2 == RevoluteJoint.TYPE) {
        var revolute = joint2;
        this.m_localAnchorD = revolute.m_localAnchorA;
        this.m_localAnchorB = revolute.m_localAnchorB;
        this.m_referenceAngleB = revolute.m_referenceAngle;
        this.m_localAxisD = Vec2.zero();
        coordinateB = aB - aD - this.m_referenceAngleB;
    } else {
        var prismatic = joint2;
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
    this.m_lcA, this.m_lcB, this.m_lcC, this.m_lcD;
    this.m_mA, this.m_mB, this.m_mC, this.m_mD;
    this.m_iA, this.m_iB, this.m_iC, this.m_iD;
    this.m_JvAC, this.m_JvBD;
    this.m_JwA, this.m_JwB, this.m_JwC, this.m_JwD;
    this.m_mass;
}

GearJoint.prototype.getJoint1 = function() {
    return this.m_joint1;
};

GearJoint.prototype.getJoint2 = function() {
    return this.m_joint2;
};

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
    return inv_dt * P;
};

GearJoint.prototype.getReactionTorque = function(inv_dt) {
    var L = this.m_impulse * this.m_JwA;
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
        var rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC);
        var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA);
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
        var rD = Rot.mulSub(qD, this.m_localAnchorD, this.m_lcD);
        var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_lcB);
        this.m_JvBD = Vec2.mul(this.m_ratio, u);
        this.m_JwD = this.m_ratio * Vec2.cross(rD, u);
        this.m_JwB = this.m_ratio * Vec2.cross(rB, u);
        this.m_mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * this.m_JwD * this.m_JwD + this.m_iB * this.m_JwB * this.m_JwB;
    }
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
    Cdot += this.m_JwA * wA - this.m_JwC * wC + (this.m_JwB * wB - this.m_JwD * wD);
    var impulse = -this.m_mass * Cdot;
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
    var coordinateA, coordinateB;
    var JvAC, JvBD;
    var JwA, JwB, JwC, JwD;
    var mass = 0;
    if (this.m_type1 == RevoluteJoint.TYPE) {
        JvAC = Vec2.zero();
        JwA = 1;
        JwC = 1;
        mass += this.m_iA + this.m_iC;
        coordinateA = aA - aC - this.m_referenceAngleA;
    } else {
        var u = Rot.mul(qC, this.m_localAxisC);
        var rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC);
        var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA);
        JvAC = u;
        JwC = Vec2.cross(rC, u);
        JwA = Vec2.cross(rA, u);
        mass += this.m_mC + this.m_mA + this.m_iC * JwC * JwC + this.m_iA * JwA * JwA;
        var pC = this.m_localAnchorC - this.m_lcC;
        var pA = Rot.mulT(qC, Vec2.add(rA, Vec2.sub(cA, cC)));
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
        var pB = Rot.mulT(qD, Vec2.add(rB, Vec2.sub(cB, cD)));
        coordinateB = Vec2.dot(pB, this.m_localAxisD) - Vec2.dot(pD, this.m_localAxisD);
    }
    var C = coordinateA + this.m_ratio * coordinateB - this.m_constant;
    var impulse = 0;
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
    return linearError < Settings.linearSlop;
};


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":51,"../util/create":52,"../util/options":53,"./PrismaticJoint":33,"./RevoluteJoint":35}],31:[function(require,module,exports){
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

var MotorJointDef = {
    maxForce: 1,
    maxTorque: 1,
    correctionFactor: .3
};

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
    this.m_rA;
    this.m_rB;
    this.m_localCenterA;
    this.m_localCenterB;
    this.m_linearError;
    this.m_angularError;
    this.m_invMassA;
    this.m_invMassB;
    this.m_invIA;
    this.m_invIB;
    this.m_linearMass;
    this.m_angularMass;
}

MotorJoint.prototype.setMaxForce = function(force) {
    ASSERT && common.assert(IsValid(force) && force >= 0);
    this.m_maxForce = force;
};

MotorJoint.prototype.getMaxForce = function() {
    return this.m_maxForce;
};

MotorJoint.prototype.setMaxTorque = function(torque) {
    ASSERT && common.assert(IsValid(torque) && torque >= 0);
    this.m_maxTorque = torque;
};

MotorJoint.prototype.getMaxTorque = function() {
    return this.m_maxTorque;
};

MotorJoint.prototype.setCorrectionFactor = function(factor) {
    ASSERT && common.assert(IsValid(factor) && 0 <= factor && factor <= 1);
    this.m_correctionFactor = factor;
};

MotorJoint.prototype.getCorrectionFactor = function() {
    return this.m_correctionFactor;
};

MotorJoint.prototype.setLinearOffset = function(linearOffset) {
    if (linearOffset.x != this.m_linearOffset.x || linearOffset.y != this.m_linearOffset.y) {
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_linearOffset = linearOffset;
    }
};

MotorJoint.prototype.getLinearOffset = function() {
    return this.m_linearOffset;
};

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
    this.m_rA = Rot.mul(qA, Vec2.neg(this.m_localCenterA));
    this.m_rB = Rot.mul(qB, Vec2.neg(this.m_localCenterB));
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


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":51,"../util/create":52,"../util/options":53}],32:[function(require,module,exports){
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

var MouseJointDef = {
    maxForce: 0,
    frequencyHz: 5,
    dampingRatio: .7
};

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
    this.m_rB = Vec2.zero();
    this.m_localCenterB = Vec2.zero();
    this.m_invMassB = 0;
    this.m_invIB = 0;
    this.mass = new Mat22();
    this.m_C = Vec2.zero();
}

MouseJoint.prototype.setTarget = function(target) {
    if (this.m_bodyB.isAwake() == false) {
        this.m_bodyB.setAwake(true);
    }
    this.m_targetA = Vec2.clone(target);
};

MouseJoint.prototype.getTarget = function() {
    return this.m_targetA;
};

MouseJoint.prototype.setMaxForce = function(force) {
    this.m_maxForce = force;
};

MouseJoint.getMaxForce = function() {
    return this.m_maxForce;
};

MouseJoint.prototype.setFrequency = function(hz) {
    this.m_frequencyHz = hz;
};

MouseJoint.prototype.getFrequency = function() {
    return this.m_frequencyHz;
};

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
    var omega = 2 * Math.PI * this.m_frequencyHz;
    var d = 2 * mass * this.m_dampingRatio * omega;
    var k = mass * (omega * omega);
    var h = step.dt;
    ASSERT && common.assert(d + h * k > Math.EPSILON);
    this.m_gamma = h * (d + h * k);
    if (this.m_gamma != 0) {
        this.m_gamma = 1 / this.m_gamma;
    }
    this.m_beta = h * k * this.m_gamma;
    this.m_rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    var K = new Mat22();
    K.ex.x = this.m_invMassB + this.m_invIB * this.m_rB.y * this.m_rB.y + this.m_gamma;
    K.ex.y = -this.m_invIB * this.m_rB.x * this.m_rB.y;
    K.ey.x = K.ex.y;
    K.ey.y = this.m_invMassB + this.m_invIB * this.m_rB.x * this.m_rB.x + this.m_gamma;
    this.m_mass = K.getInverse();
    this.m_C.set(cB);
    this.m_C.wAdd(1, this.m_rB, -1, this.m_targetA);
    this.m_C.mul(this.m_beta);
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


},{"../Joint":5,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":51,"../util/create":52,"../util/options":53}],33:[function(require,module,exports){
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

var PrismaticJointDef = {
    enableLimit: false,
    lowerTranslation: 0,
    upperTranslation: 0,
    enableMotor: false,
    maxMotorForce: 0,
    motorSpeed: 0
};

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
    this.m_localCenterA;
    this.m_localCenterB;
    this.m_invMassA;
    this.m_invMassB;
    this.m_invIA;
    this.m_invIB;
    this.m_axis, this.m_perp;
    this.m_s1, this.m_s2;
    this.m_a1, this.m_a2;
    this.m_K = new Mat33();
    this.m_motorMass;
}

PrismaticJoint.prototype.getLocalAnchorA = function() {
    return this.m_localAnchorA;
};

PrismaticJoint.prototype.getLocalAnchorB = function() {
    return this.m_localAnchorB;
};

PrismaticJoint.prototype.getLocalAxisA = function() {
    return this.m_localXAxisA;
};

PrismaticJoint.prototype.getReferenceAngle = function() {
    return this.m_referenceAngle;
};

PrismaticJoint.prototype.getJointTranslation = function() {
    var pA = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    var pB = this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    var d = Vec2.sub(pB, pA);
    var axis = this.m_bodyA.getWorldVector(this.m_localXAxisA);
    var translation = Vec2.dot(d, axis);
    return translation;
};

PrismaticJoint.prototype.getJointSpeed = function() {
    var bA = this.m_bodyA;
    var bB = this.m_bodyB;
    var rA = Mul(bA.m_xf.q, this.m_localAnchorA - bA.m_sweep.localCenter);
    var rB = Mul(bB.m_xf.q, this.m_localAnchorB - bB.m_sweep.localCenter);
    var p1 = bA.m_sweep.c + rA;
    var p2 = bB.m_sweep.c + rB;
    var d = p2 - p1;
    var axis = Mul(bA.m_xf.q, this.m_localXAxisA);
    var vA = bA.m_linearVelocity;
    var vB = bB.m_linearVelocity;
    var wA = bA.m_angularVelocity;
    var wB = bB.m_angularVelocity;
    var speed = Dot(d, Cross(wA, axis)) + Dot(axis, vB + Cross(wB, rB) - vA - Cross(wA, rA));
    return speed;
};

PrismaticJoint.prototype.isLimitEnabled = function() {
    return this.m_enableLimit;
};

PrismaticJoint.prototype.enableLimit = function(flag) {
    if (flag != this.m_enableLimit) {
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_enableLimit = flag;
        this.m_impulse.z = 0;
    }
};

PrismaticJoint.prototype.getLowerLimit = function() {
    return this.m_lowerTranslation;
};

PrismaticJoint.prototype.getUpperLimit = function() {
    return this.m_upperTranslation;
};

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

PrismaticJoint.prototype.isMotorEnabled = function() {
    return this.m_enableMotor;
};

PrismaticJoint.prototype.enableMotor = function(flag) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_enableMotor = flag;
};

PrismaticJoint.prototype.setMotorSpeed = function(speed) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_motorSpeed = speed;
};

PrismaticJoint.prototype.setMaxMotorForce = function(force) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_maxMotorForce = force;
};

PrismaticJoint.prototype.getMotorSpeed = function() {
    return this.m_motorSpeed;
};

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
    var rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    var rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    var d = Vec2.zero();
    d.wAdd(1, cB, 1, rB);
    d.wSub(1, cA, 1, rA);
    var mA = this.m_invMassA, mB = this.m_invMassB;
    var iA = this.m_invIA, iB = this.m_invIB;
    {
        this.m_axis = Rot.mul(qA, this.m_localXAxisA);
        this.m_a1 = Vec2.cross(Vec2.add(d, rA), this.m_axis);
        this.m_a2 = Vec2.cross(rB, this.m_axis);
        this.m_motorMass = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2 * this.m_a2;
        if (this.m_motorMass > 0) {
            this.m_motorMass = 1 / this.m_motorMass;
        }
    }
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
            k22 = 1;
        }
        var k23 = iA * this.m_a1 + iB * this.m_a2;
        var k33 = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2 * this.m_a2;
        this.m_K.ex.set(k11, k12, k13);
        this.m_K.ey.set(k12, k22, k23);
        this.m_K.ez.set(k13, k23, k33);
    }
    if (this.m_enableLimit) {
        var jointTranslation = Vec2.dot(this.m_axis, d);
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
        var Cdot2 = 0;
        Cdot2 += Vec2.dot(this.m_axis, vB) + this.m_a2 * wB;
        Cdot2 -= Vec2.dot(this.m_axis, vA) + this.m_a1 * wA;
        var Cdot = Vec3(Cdot1.x, Cdot1.y, Cdot2);
        var f1 = Vec3(this.m_impulse);
        var df = this.m_K.solve33(Vec3.neg(Cdot));
        this.m_impulse.add(df);
        if (this.m_limitState == atLowerLimit) {
            this.m_impulse.z = Math.max(this.m_impulse.z, 0);
        } else if (this.m_limitState == atUpperLimit) {
            this.m_impulse.z = Math.min(this.m_impulse.z, 0);
        }
        var b = Vec2.wAdd(-1, Cdot1, -(this.m_impulse.z - f1.z), Vec2.neo(this.m_K.ez.x, this.m_K.ez.y));
        var f2r = Vec2.add(this.m_K.solve22(b), Vec2.neo(f1.x, f1.y));
        this.m_impulse.x = f2r.x;
        this.m_impulse.y = f2r.y;
        df = Vec3.sub(this.m_impulse, f1);
        var P = Vec2.wAdd(df.x, this.m_perp, df.z, this.m_axis);
        var LA = df.x * this.m_s1 + df.y + df.z * this.m_a1;
        var LB = df.x * this.m_s2 + df.y + df.z * this.m_a2;
        vA.wSub(mA, P);
        wA -= iA * LA;
        vB.wAdd(mB, P);
        wB += iB * LB;
    } else {
        var df = this.m_K.solve22(Vec2.neg(Cdot1));
        this.m_impulse.x += df.x;
        this.m_impulse.y += df.y;
        var P = Vec2.zero().wAdd(df.x, this.m_perp);
        var LA = df.x * this.m_s1 + df.y;
        var LB = df.x * this.m_s2 + df.y;
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
    var rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    var rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    var d = Vec2.sub(Vec2.add(cB, rB), Vec2.add(cA, rA));
    var axis = Rot.mul(qA, this.m_localXAxisA);
    var a1 = Vec2.cross(Vec2.add(d, rA), axis);
    var a2 = Vec2.cross(rB, axis);
    var perp = Rot.mul(qA, this.m_localYAxisA);
    var s1 = Vec2.cross(Vec2.add(d, rA), perp);
    var s2 = Vec2.cross(rB, perp);
    var impulse = Vec3();
    var C1 = Vec2.zero();
    C1.x = Vec2.dot(perp, d);
    C1.y = aB - aA - this.m_referenceAngle;
    var linearError = Math.abs(C1.x);
    var angularError = Math.abs(C1.y);
    var linearSlop = Settings.linearSlop;
    var maxLinearCorrection = Settings.maxLinearCorrection;
    var active = false;
    var C2 = 0;
    if (this.m_enableLimit) {
        var translation = Vec2.dot(axis, d);
        if (Math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * linearSlop) {
            C2 = Math.clamp(translation, -maxLinearCorrection, maxLinearCorrection);
            linearError = Math.max(linearError, Math.abs(translation));
            active = true;
        } else if (translation <= this.m_lowerTranslation) {
            C2 = Math.clamp(translation - this.m_lowerTranslation + linearSlop, -maxLinearCorrection, 0);
            linearError = Math.max(linearError, this.m_lowerTranslation - translation);
            active = true;
        } else if (translation >= this.m_upperTranslation) {
            C2 = Math.clamp(translation - this.m_upperTranslation - linearSlop, 0, maxLinearCorrection);
            linearError = Math.max(linearError, translation - this.m_upperTranslation);
            active = true;
        }
    }
    if (active) {
        var k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2;
        var k12 = iA * s1 + iB * s2;
        var k13 = iA * s1 * a1 + iB * s2 * a2;
        var k22 = iA + iB;
        if (k22 == 0) {
            k22 = 1;
        }
        var k23 = iA * a1 + iB * a2;
        var k33 = mA + mB + iA * a1 * a1 + iB * a2 * a2;
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
        var k12 = iA * s1 + iB * s2;
        var k22 = iA + iB;
        if (k22 == 0) {
            k22 = 1;
        }
        var K = new Mat22();
        K.ex.set(k11, k12);
        K.ey.set(k12, k22);
        var impulse1 = K.solve(Vec2.neg(C1));
        impulse.x = impulse1.x;
        impulse.y = impulse1.y;
        impulse.z = 0;
    }
    var P = Vec2.wAdd(impulse.x, perp, impulse.z, axis);
    var LA = impulse.x * s1 + impulse.y + impulse.z * a1;
    var LB = impulse.x * s2 + impulse.y + impulse.z * a2;
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


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":51,"../util/create":52,"../util/options":53}],34:[function(require,module,exports){
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

PulleyJoint._super = Joint;

PulleyJoint.prototype = create(PulleyJoint._super.prototype);

var PulleyJointDef = {
    collideConnected: true
};

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
    this.m_uA;
    this.m_uB;
    this.m_rA;
    this.m_rB;
    this.m_localCenterA;
    this.m_localCenterB;
    this.m_invMassA;
    this.m_invMassB;
    this.m_invIA;
    this.m_invIB;
    this.m_mass;
}

PulleyJoint.prototype.getGroundAnchorA = function() {
    return this.m_groundAnchorA;
};

PulleyJoint.prototype.getGroundAnchorB = function() {
    return this.m_groundAnchorB;
};

PulleyJoint.prototype.getLengthA = function() {
    return this.m_lengthA;
};

PulleyJoint.prototype.getLengthB = function() {
    return this.m_lengthB;
};

PulleyJoint.prototype.setRatio = function() {
    return this.m_ratio;
};

PulleyJoint.prototype.getCurrentLengthA = function() {
    var p = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    var s = this.m_groundAnchorA;
    return Vec2.distance(p, s);
};

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
    var ruA = Vec2.cross(this.m_rA, this.m_uA);
    var ruB = Vec2.cross(this.m_rB, this.m_uB);
    var mA = this.m_invMassA + this.m_invIA * ruA * ruA;
    var mB = this.m_invMassB + this.m_invIB * ruB * ruB;
    this.m_mass = mA + this.m_ratio * this.m_ratio * mB;
    if (this.m_mass > 0) {
        this.m_mass = 1 / this.m_mass;
    }
    if (step.warmStarting) {
        this.m_impulse *= step.dtRatio;
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
    var impulse = -this.m_mass * Cdot;
    this.m_impulse += impulse;
    var PA = Vec2.zero().wSet(-impulse, this.m_uA);
    var PB = Vec2.zero().wSet(-this.m_ratio * impulse, this.m_uB);
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
    var ruA = Vec2.cross(rA, uA);
    var ruB = Vec2.cross(rB, uB);
    var mA = this.m_invMassA + this.m_invIA * ruA * ruA;
    var mB = this.m_invMassB + this.m_invIB * ruB * ruB;
    var mass = mA + this.m_ratio * this.m_ratio * mB;
    if (mass > 0) {
        mass = 1 / mass;
    }
    var C = this.m_constant - lengthA - this.m_ratio * lengthB;
    var linearError = Math.abs(C);
    var impulse = -mass * C;
    var PA = Vec2.zero().wSet(-impulse, uA);
    var PB = Vec2.zero().wSet(-this.m_ratio * impulse, uB);
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


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":51,"../util/create":52,"../util/options":53}],35:[function(require,module,exports){
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

var RevoluteJointDef = {
    lowerAngle: 0,
    upperAngle: 0,
    maxMotorTorque: 0,
    motorSpeed: 0,
    enableLimit: false,
    enableMotor: false
};

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
    this.m_rA;
    this.m_rB;
    this.m_localCenterA;
    this.m_localCenterB;
    this.m_invMassA;
    this.m_invMassB;
    this.m_invIA;
    this.m_invIB;
    this.m_mass = new Mat33();
    this.m_motorMass;
    this.m_limitState = inactiveLimit;
}

RevoluteJoint.prototype.getLocalAnchorA = function() {
    return this.m_localAnchorA;
};

RevoluteJoint.prototype.getLocalAnchorB = function() {
    return this.m_localAnchorB;
};

RevoluteJoint.prototype.getReferenceAngle = function() {
    return this.m_referenceAngle;
};

RevoluteJoint.prototype.getJointAngle = function() {
    var bA = this.m_bodyA;
    var bB = this.m_bodyB;
    return bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
};

RevoluteJoint.prototype.getJointSpeed = function() {
    var bA = this.m_bodyA;
    var bB = this.m_bodyB;
    return bB.m_angularVelocity - bA.m_angularVelocity;
};

RevoluteJoint.prototype.isMotorEnabled = function() {
    return this.m_enableMotor;
};

RevoluteJoint.prototype.enableMotor = function(flag) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_enableMotor = flag;
};

RevoluteJoint.prototype.getMotorTorque = function(inv_dt) {
    return inv_dt * this.m_motorImpulse;
};

RevoluteJoint.prototype.setMotorSpeed = function(speed) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_motorSpeed = speed;
};

RevoluteJoint.prototype.getMotorSpeed = function() {
    return this.m_motorSpeed;
};

RevoluteJoint.prototype.setMaxMotorTorque = function(torque) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_maxMotorTorque = torque;
};

RevoluteJoint.prototype.isLimitEnabled = function() {
    return this.m_enableLimit;
};

RevoluteJoint.prototype.enableLimit = function(flag) {
    if (flag != this.m_enableLimit) {
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_enableLimit = flag;
        this.m_impulse.z = 0;
    }
};

RevoluteJoint.prototype.getLowerLimit = function() {
    return this.m_lowerAngle;
};

RevoluteJoint.prototype.getUpperLimit = function() {
    return this.m_upperAngle;
};

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

RevoluteJoint.prototype.getReactionForce = function(inv_dt) {
    var P = Vec2.neo(this.m_impulse.x, this.m_impulse.y);
    return inv_dt * P;
};

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
    var mA = this.m_invMassA;
    var mB = this.m_invMassB;
    var iA = this.m_invIA;
    var iB = this.m_invIB;
    var fixedRotation = iA + iB == 0;
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
    var iA = this.m_invIA;
    var iB = this.m_invIB;
    var fixedRotation = iA + iB == 0;
    if (this.m_enableMotor && this.m_limitState != equalLimits && fixedRotation == false) {
        var Cdot = wB - wA - this.m_motorSpeed;
        var impulse = -this.m_motorMass * Cdot;
        var oldImpulse = this.m_motorImpulse;
        var maxImpulse = step.dt * this.m_maxMotorTorque;
        this.m_motorImpulse = Math.clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
        impulse = this.m_motorImpulse - oldImpulse;
        wA -= iA * impulse;
        wB += iB * impulse;
    }
    if (this.m_enableLimit && this.m_limitState != inactiveLimit && fixedRotation == false) {
        var Cdot1 = Vec2.zero();
        Cdot1.wAdd(1, vB, 1, Vec2.cross(wB, this.m_rB));
        Cdot1.wSub(1, vA, 1, Vec2.cross(wA, this.m_rA));
        var Cdot2 = wB - wA;
        var Cdot = Vec3(Cdot1.x, Cdot1.y, Cdot2);
        var impulse = Vec3.neg(this.m_mass.solve33(Cdot));
        if (this.m_limitState == equalLimits) {
            this.m_impulse.add(impulse);
        } else if (this.m_limitState == atLowerLimit) {
            var newImpulse = this.m_impulse.z + impulse.z;
            if (newImpulse < 0) {
                var rhs = Vec2.wAdd(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y));
                var reduced = this.m_mass.solve22(rhs);
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
            if (newImpulse > 0) {
                var rhs = Vec2.wAdd(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y));
                var reduced = this.m_mass.solve22(rhs);
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
        var Cdot = Vec2.zero();
        Cdot.wAdd(1, vB, 1, Vec2.cross(wB, this.m_rB));
        Cdot.wSub(1, vA, 1, Vec2.cross(wA, this.m_rA));
        var impulse = this.m_mass.solve22(Vec2.neg(Cdot));
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
    var positionError = 0;
    var fixedRotation = this.m_invIA + this.m_invIB == 0;
    if (this.m_enableLimit && this.m_limitState != inactiveLimit && fixedRotation == false) {
        var angle = aB - aA - this.m_referenceAngle;
        var limitImpulse = 0;
        if (this.m_limitState == equalLimits) {
            var C = Math.clamp(angle - this.m_lowerAngle, -Settings.maxAngularCorrection, Settings.maxAngularCorrection);
            limitImpulse = -this.m_motorMass * C;
            angularError = Math.abs(C);
        } else if (this.m_limitState == atLowerLimit) {
            var C = angle - this.m_lowerAngle;
            angularError = -C;
            C = Math.clamp(C + Settings.angularSlop, -Settings.maxAngularCorrection, 0);
            limitImpulse = -this.m_motorMass * C;
        } else if (this.m_limitState == atUpperLimit) {
            var C = angle - this.m_upperAngle;
            angularError = C;
            C = Math.clamp(C - Settings.angularSlop, 0, Settings.maxAngularCorrection);
            limitImpulse = -this.m_motorMass * C;
        }
        aA -= this.m_invIA * limitImpulse;
        aB += this.m_invIB * limitImpulse;
    }
    {
        qA.set(aA);
        qB.set(aB);
        var rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        var rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        var C = Vec2.zero();
        C.wAdd(1, cB, 1, rB);
        C.wSub(1, cA, 1, rA);
        positionError = C.length();
        var mA = this.m_invMassA;
        var mB = this.m_invMassB;
        var iA = this.m_invIA;
        var iB = this.m_invIB;
        var K = new Mat22();
        K.ex.x = mA + mB + iA * rA.y * rA.y + iB * rB.y * rB.y;
        K.ex.y = -iA * rA.x * rA.y - iB * rB.x * rB.y;
        K.ey.x = K.ex.y;
        K.ey.y = mA + mB + iA * rA.x * rA.x + iB * rB.x * rB.x;
        var impulse = Vec2.neg(K.solve(C));
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


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":51,"../util/create":52,"../util/options":53}],36:[function(require,module,exports){
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

var RopeJointDef = {
    maxLength: 0
};

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
    this.m_u;
    this.m_rA;
    this.m_rB;
    this.m_localCenterA;
    this.m_localCenterB;
    this.m_invMassA;
    this.m_invMassB;
    this.m_invIA;
    this.m_invIB;
    this.m_mass;
}

RopeJoint.prototype.getLocalAnchorA = function() {
    return this.m_localAnchorA;
};

RopeJoint.prototype.getLocalAnchorB = function() {
    return this.m_localAnchorB;
};

RopeJoint.prototype.setMaxLength = function(length) {
    this.m_maxLength = length;
};

RopeJoint.prototype.getMaxLength = function() {
    return this.m_maxLength;
};

RopeJoint.prototype.getLimitState = function() {
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
    this.m_length = this.m_u.length();
    var C = this.m_length - this.m_maxLength;
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
    var crA = Vec2.cross(this.m_rA, this.m_u);
    var crB = Vec2.cross(this.m_rB, this.m_u);
    var invMass = this.m_invMassA + this.m_invIA * crA * crA + this.m_invMassB + this.m_invIB * crB * crB;
    this.m_mass = invMass != 0 ? 1 / invMass : 0;
    if (step.warmStarting) {
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
    var vpA = Vec2.addCross(vA, wA, this.m_rA);
    var vpB = Vec2.addCross(vB, wB, this.m_rB);
    var C = this.m_length - this.m_maxLength;
    var Cdot = Vec2.dot(this.m_u, Vec2.sub(vpB, vpA));
    if (C < 0) {
        Cdot += step.inv_dt * C;
    }
    var impulse = -this.m_mass * Cdot;
    var oldImpulse = this.m_impulse;
    this.m_impulse = Math.min(0, this.m_impulse + impulse);
    impulse = this.m_impulse - oldImpulse;
    var P = Vec2.mul(impulse, this.m_u);
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
    var aA = this.m_bodyA.c_position.a;
    var cB = this.m_bodyB.c_position.c;
    var aB = this.m_bodyB.c_position.a;
    var qA = Rot.neo(aA);
    var qB = Rot.neo(aB);
    var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
    var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
    var u = Vec2.zero();
    u.wAdd(1, cB, 1, rB);
    u.wSub(1, cA, 1, rA);
    var length = u.normalize();
    var C = length - this.m_maxLength;
    C = Math.clamp(C, 0, Settings.maxLinearCorrection);
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
    return length - this.m_maxLength < Settings.linearSlop;
};


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/create":52,"../util/options":53}],37:[function(require,module,exports){
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

var WeldJointDef = {
    frequencyHz: 0,
    dampingRatio: 0
};

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
    this.m_rA;
    this.m_rB;
    this.m_localCenterA;
    this.m_localCenterB;
    this.m_invMassA;
    this.m_invMassB;
    this.m_invIA;
    this.m_invIB;
    this.m_mass = new Mat33();
}

WeldJoint.prototype.getLocalAnchorA = function() {
    return this.m_localAnchorA;
};

WeldJoint.prototype.getLocalAnchorB = function() {
    return this.m_localAnchorB;
};

WeldJoint.prototype.getReferenceAngle = function() {
    return this.m_referenceAngle;
};

WeldJoint.prototype.setFrequency = function(hz) {
    this.m_frequencyHz = hz;
};

WeldJoint.prototype.getFrequency = function() {
    return this.m_frequencyHz;
};

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
    var mA = this.m_invMassA;
    var mB = this.m_invMassB;
    var iA = this.m_invIA;
    var iB = this.m_invIB;
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
        var m = invM > 0 ? 1 / invM : 0;
        var C = aB - aA - this.m_referenceAngle;
        var omega = 2 * Math.PI * this.m_frequencyHz;
        var d = 2 * m * this.m_dampingRatio * omega;
        var k = m * omega * omega;
        var h = step.dt;
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
    var iA = this.m_invIA;
    var iB = this.m_invIB;
    if (this.m_frequencyHz > 0) {
        var Cdot2 = wB - wA;
        var impulse2 = -this.m_mass.ez.z * (Cdot2 + this.m_bias + this.m_gamma * this.m_impulse.z);
        this.m_impulse.z += impulse2;
        wA -= iA * impulse2;
        wB += iB * impulse2;
        var Cdot1 = Vec2.zero();
        Cdot1.wAdd(1, vB, 1, Vec2.cross(wB, this.m_rB));
        Cdot1.wSub(1, vA, 1, Vec2.cross(wA, this.m_rA));
        var impulse1 = Vec2.neg(Mat33.mul(this.m_mass, Cdot1));
        this.m_impulse.x += impulse1.x;
        this.m_impulse.y += impulse1.y;
        var P = Vec2.clone(impulse1);
        vA.wSub(mA, P);
        wA -= iA * Vec2.cross(this.m_rA, P);
        vB.wAdd(mB, P);
        wB += iB * Vec2.cross(this.m_rB, P);
    } else {
        var Cdot1 = Vec2.zero();
        Cdot1.wAdd(1, vB, 1, Vec2.cross(wB, this.m_rB));
        Cdot1.wSub(1, vA, 1, Vec2.cross(wA, this.m_rA));
        var Cdot2 = wB - wA;
        var Cdot = Vec3(Cdot1.x, Cdot1.y, Cdot2);
        var impulse = Vec3.neg(Mat33.mul(this.m_mass, Cdot));
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
    var iA = this.m_invIA, iB = this.m_invIB;
    var rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    var rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    var positionError, angularError;
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
        positionError = C1.length();
        angularError = 0;
        var P = Vec2.neg(K.solve22(C1));
        cA.wSub(mA, P);
        aA -= iA * Vec2.cross(rA, P);
        cB.wAdd(mB, P);
        aB += iB * Vec2.cross(rB, P);
    } else {
        var C1 = Vec2.zero();
        C1.wAdd(1, cB, 1, rB);
        C1.wSub(1, cA, 1, rA);
        var C2 = aB - aA - this.m_referenceAngle;
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


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/create":52,"../util/options":53}],38:[function(require,module,exports){
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

var WheelJointDef = {
    enableMotor: false,
    maxMotorTorque: 0,
    motorSpeed: 0,
    frequencyHz: 2,
    dampingRatio: .7
};

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
    this.m_localCenterA;
    this.m_localCenterB;
    this.m_invMassA;
    this.m_invMassB;
    this.m_invIA;
    this.m_invIB;
    this.m_ax = Vec2.zero();
    this.m_ay = Vec2.zero();
    this.m_sAx;
    this.m_sBx;
    this.m_sAy;
    this.m_sBy;
}

WheelJoint.prototype.getLocalAnchorA = function() {
    return this.m_localAnchorA;
};

WheelJoint.prototype.getLocalAnchorB = function() {
    return this.m_localAnchorB;
};

WheelJoint.prototype.getLocalAxisA = function() {
    return this.m_localXAxisA;
};

WheelJoint.prototype.getJointTranslation = function() {
    var bA = this.m_bodyA;
    var bB = this.m_bodyB;
    var pA = bA.getWorldPoint(this.m_localAnchorA);
    var pB = bB.getWorldPoint(this.m_localAnchorB);
    var d = pB - pA;
    var axis = bA.getWorldVector(this.m_localXAxisA);
    var translation = Dot(d, axis);
    return translation;
};

WheelJoint.prototype.getJointSpeed = function() {
    var wA = this.m_bodyA.m_angularVelocity;
    var wB = this.m_bodyB.m_angularVelocity;
    return wB - wA;
};

WheelJoint.prototype.isMotorEnabled = function() {
    return this.m_enableMotor;
};

WheelJoint.prototype.enableMotor = function(flag) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_enableMotor = flag;
};

WheelJoint.prototype.setMotorSpeed = function(speed) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_motorSpeed = speed;
};

WheelJoint.prototype.getMotorSpeed = function() {
    return this.m_motorSpeed;
};

WheelJoint.prototype.setMaxMotorTorque = function(torque) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_maxMotorTorque = torque;
};

WheelJoint.prototype.getMaxMotorTorque = function() {
    return this.m_maxMotorTorque;
};

WheelJoint.prototype.getMotorTorque = function(inv_dt) {
    return inv_dt * this.m_motorImpulse;
};

WheelJoint.prototype.setSpringFrequencyHz = function(hz) {
    this.m_frequencyHz = hz;
};

WheelJoint.prototype.getSpringFrequencyHz = function() {
    return this.m_frequencyHz;
};

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
    var iA = this.m_invIA;
    var iB = this.m_invIB;
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
    var rA = Rot.mul(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    var rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    var d = Vec2.zero();
    d.wAdd(1, cB, 1, rB);
    d.wSub(1, cA, 1, rA);
    {
        this.m_ay = Rot.mul(qA, this.m_localYAxisA);
        this.m_sAy = Vec2.cross(Vec2.add(d, rA), this.m_ay);
        this.m_sBy = Vec2.cross(rB, this.m_ay);
        this.m_mass = mA + mB + iA * this.m_sAy * this.m_sAy + iB * this.m_sBy * this.m_sBy;
        if (this.m_mass > 0) {
            this.m_mass = 1 / this.m_mass;
        }
    }
    this.m_springMass = 0;
    this.m_bias = 0;
    this.m_gamma = 0;
    if (this.m_frequencyHz > 0) {
        this.m_ax = Rot.mul(qA, this.m_localXAxisA);
        this.m_sAx = Vec2.cross(Vec2.add(d, rA), this.m_ax);
        this.m_sBx = Vec2.cross(rB, this.m_ax);
        var invMass = mA + mB + iA * this.m_sAx * this.m_sAx + iB * this.m_sBx * this.m_sBx;
        if (invMass > 0) {
            this.m_springMass = 1 / invMass;
            var C = Vec2.dot(d, this.m_ax);
            var omega = 2 * Math.PI * this.m_frequencyHz;
            var d = 2 * this.m_springMass * this.m_dampingRatio * omega;
            var k = this.m_springMass * omega * omega;
            var h = step.dt;
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
    var iA = this.m_invIA;
    var iB = this.m_invIB;
    var vA = this.m_bodyA.c_velocity.v;
    var wA = this.m_bodyA.c_velocity.w;
    var vB = this.m_bodyB.c_velocity.v;
    var wB = this.m_bodyB.c_velocity.w;
    {
        var Cdot = Vec2.dot(this.m_ax, vB) - Vec2.dot(this.m_ax, vA) + this.m_sBx * wB - this.m_sAx * wA;
        var impulse = -this.m_springMass * (Cdot + this.m_bias + this.m_gamma * this.m_springImpulse);
        this.m_springImpulse += impulse;
        var P = Vec2.zero().wSet(impulse, this.m_ax);
        var LA = impulse * this.m_sAx;
        var LB = impulse * this.m_sBx;
        vA.wSub(mA, P);
        wA -= iA * LA;
        vB.wAdd(mB, P);
        wB += iB * LB;
    }
    {
        var Cdot = wB - wA - this.m_motorSpeed;
        var impulse = -this.m_motorMass * Cdot;
        var oldImpulse = this.m_motorImpulse;
        var maxImpulse = step.dt * this.m_maxMotorTorque;
        this.m_motorImpulse = Math.clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
        impulse = this.m_motorImpulse - oldImpulse;
        wA -= iA * impulse;
        wB += iB * impulse;
    }
    {
        var Cdot = Vec2.dot(this.m_ay, vB) - Vec2.dot(this.m_ay, vA) + this.m_sBy * wB - this.m_sAy * wA;
        var impulse = -this.m_mass * Cdot;
        this.m_impulse += impulse;
        var P = Vec2.zero().wSet(impulse, this.m_ay);
        var LA = impulse * this.m_sAy;
        var LB = impulse * this.m_sBy;
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
    var rB = Rot.mul(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    var d = Vec2.zero();
    d.wAdd(1, cB, 1, rB);
    d.wSub(1, cA, 1, rA);
    var ay = Rot.mul(qA, this.m_localYAxisA);
    var sAy = Vec2.cross(Vec2.sub(d, rA), ay);
    var sBy = Vec2.cross(rB, ay);
    var C = Vec2.dot(d, ay);
    var k = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_sAy * this.m_sAy + this.m_invIB * this.m_sBy * this.m_sBy;
    var impulse;
    if (k != 0) {
        impulse = -C / k;
    } else {
        impulse = 0;
    }
    var P = Vec2.zero().wSet(impulse, ay);
    var LA = impulse * sAy;
    var LB = impulse * sBy;
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


},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/create":52,"../util/options":53}],39:[function(require,module,exports){
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
        for (var i = 0; i < this.m_count; ++i) {
            this.m_vertices[i] = Transform.mul(xf, this.m_vertices[i]);
            this.m_normals[i] = Rot.mul(xf.q, this.m_normals[i]);
        }
    }
}


},{"../Settings":7,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":51,"../util/create":52,"../util/options":53,"./PolygonShape":48}],40:[function(require,module,exports){
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

ChainShape.prototype._createLoop = function(vertices) {
    ASSERT && common.assert(this.m_vertices.length == 0 && this.m_count == 0);
    ASSERT && common.assert(vertices.length >= 3);
    for (var i = 1; i < vertices.length; ++i) {
        var v1 = vertices[i - 1];
        var v2 = vertices[i];
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

ChainShape.prototype._createChain = function(vertices) {
    ASSERT && common.assert(this.m_vertices.length == 0 && this.m_count == 0);
    ASSERT && common.assert(vertices.length >= 2);
    for (var i = 1; i < vertices.length; ++i) {
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

ChainShape.prototype._setPrevVertex = function(prevVertex) {
    this.m_prevVertex = prevVertex;
    this.m_hasPrevVertex = true;
};

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
    return this.m_count - 1;
};

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


},{"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":51,"../util/create":52,"../util/options":53,"./EdgeShape":47}],41:[function(require,module,exports){
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

CircleShape.prototype.rayCast = function(output, input, xf, childIndex) {
    var position = Vec2.add(xf.p, Rot.mul(xf.q, this.m_p));
    var s = Vec2.sub(input.p1, position);
    var b = Vec2.dot(s, s) - this.m_radius * this.m_radius;
    var r = Vec2.sub(input.p2, input.p1);
    var c = Vec2.dot(s, r);
    var rr = Vec2.dot(r, r);
    var sigma = c * c - rr * b;
    if (sigma < 0 || rr < Math.EPSILON) {
        return false;
    }
    var a = -(c + Math.sqrt(sigma));
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
    massData.I = massData.mass * (.5 * this.m_radius * this.m_radius + Vec2.dot(this.m_p, this.m_p));
};

CircleShape.prototype.computeDistanceProxy = function(proxy) {
    proxy.m_vertices.push(this.m_p);
    proxy.m_count = 1;
    proxy.m_radius = this.m_radius;
};


},{"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":51,"../util/create":52,"../util/options":53}],42:[function(require,module,exports){
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


},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../common/Math":18,"../common/Transform":22,"../common/Vec2":23,"../util/common":51,"../util/create":52,"./CircleShape":41}],43:[function(require,module,exports){
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
    var c = Transform.mul(xfB, circleB.m_p);
    var cLocal = Transform.mulT(xfA, c);
    var normalIndex = 0;
    var separation = -Infinity;
    var radius = polygonA.m_radius + circleB.m_radius;
    var vertexCount = polygonA.m_count;
    var vertices = polygonA.m_vertices;
    var normals = polygonA.m_normals;
    for (var i = 0; i < vertexCount; ++i) {
        var s = Vec2.dot(normals[i], Vec2.sub(cLocal, vertices[i]));
        if (s > radius) {
            return;
        }
        if (s > separation) {
            separation = s;
            normalIndex = i;
        }
    }
    var vertIndex1 = normalIndex;
    var vertIndex2 = vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0;
    var v1 = vertices[vertIndex1];
    var v2 = vertices[vertIndex2];
    if (separation < Math.EPSILON) {
        manifold.pointCount = 1;
        manifold.type = Manifold.e_faceA;
        manifold.localNormal.set(normals[normalIndex]);
        manifold.localPoint.wSet(.5, v1, .5, v2);
        manifold.points[0].localPoint = circleB.m_p;
        manifold.points[0].id.key = 0;
        return;
    }
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


},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":51,"./CircleShape":41,"./PolygonShape":48}],44:[function(require,module,exports){
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

function CollideEdgeCircle(manifold, edgeA, xfA, circleB, xfB) {
    manifold.pointCount = 0;
    var Q = Transform.mulT(xfA, Transform.mul(xfB, circleB.m_p));
    var A = edgeA.m_vertex1;
    var B = edgeA.m_vertex2;
    var e = Vec2.sub(B, A);
    var u = Vec2.dot(e, Vec2.sub(B, Q));
    var v = Vec2.dot(e, Vec2.sub(Q, A));
    var radius = edgeA.m_radius + circleB.m_radius;
    if (v <= 0) {
        var P = Vec2.clone(A);
        var d = Vec2.sub(Q, P);
        var dd = Vec2.dot(d, d);
        if (dd > radius * radius) {
            return;
        }
        if (edgeA.m_hasVertex0) {
            var A1 = edgeA.m_vertex0;
            var B1 = A;
            var e1 = Vec2.sub(B1, A1);
            var u1 = Vec2.dot(e1, Vec2.sub(B1, Q));
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
    if (u <= 0) {
        var P = Vec2.clone(B);
        var d = Vec2.sub(Q, P);
        var dd = Vec2.dot(d, d);
        if (dd > radius * radius) {
            return;
        }
        if (edgeA.m_hasVertex3) {
            var B2 = edgeA.m_vertex3;
            var A2 = B;
            var e2 = Vec2.sub(B2, A2);
            var v2 = Vec2.dot(e2, Vec2.sub(Q, A2));
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


},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":51,"../util/create":52,"./ChainShape":40,"./CircleShape":41,"./EdgeShape":47}],45:[function(require,module,exports){
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

var e_unknown = -1;

var e_edgeA = 1;

var e_edgeB = 2;

var e_isolated = 0;

var e_concave = 1;

var e_convex = 2;

function EPAxis() {
    this.type;
    this.index;
    this.separation;
}

function TempPolygon() {
    this.vertices = [];
    this.normals = [];
    this.count = 0;
}

function ReferenceFace() {
    this.i1, this.i2;
    this.v1, this.v2;
    this.normal = Vec2.zero();
    this.sideNormal1 = Vec2.zero();
    this.sideOffset1;
    this.sideNormal2 = Vec2.zero();
    this.sideOffset2;
}

var edgeAxis = new EPAxis();

var polygonAxis = new EPAxis();

var polygonBA = new TempPolygon();

var rf = new ReferenceFace();

function CollideEdgePolygon(manifold, edgeA, xfA, polygonB, xfB) {
    DEBUG && common.debug("CollideEdgePolygon");
    var m_type1, m_type2;
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
    if (hasVertex0) {
        var edge0 = Vec2.sub(v1, v0);
        edge0.normalize();
        var normal0 = Vec2.neo(edge0.y, -edge0.x);
        convex1 = Vec2.cross(edge0, edge1) >= 0;
        offset0 = Vec2.dot(normal0, centroidB) - Vec2.dot(normal0, v0);
    }
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
    polygonBA.count = polygonB.m_count;
    for (var i = 0; i < polygonB.m_count; ++i) {
        polygonBA.vertices[i] = Transform.mul(xf, polygonB.m_vertices[i]);
        polygonBA.normals[i] = Rot.mul(xf.q, polygonB.m_normals[i]);
    }
    var radius = 2 * Settings.polygonRadius;
    manifold.pointCount = 0;
    {
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
    if (edgeAxis.type == e_unknown) {
        return;
    }
    if (edgeAxis.separation > radius) {
        return;
    }
    {
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
                polygonAxis.type = e_edgeB;
                polygonAxis.index = i;
                polygonAxis.separation = s;
                break;
            }
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
    var clipPoints1 = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];
    var clipPoints2 = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];
    var np;
    np = Manifold.clipSegmentToLine(clipPoints1, ie, rf.sideNormal1, rf.sideOffset1, rf.i1);
    if (np < Settings.maxManifoldPoints) {
        return;
    }
    np = Manifold.clipSegmentToLine(clipPoints2, clipPoints1, rf.sideNormal2, rf.sideOffset2, rf.i2);
    if (np < Settings.maxManifoldPoints) {
        return;
    }
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


},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":51,"../util/create":52,"./ChainShape":40,"./EdgeShape":47,"./PolygonShape":48}],46:[function(require,module,exports){
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
        var n = Rot.mul(xf.q, n1s[i]);
        var v1 = Transform.mul(xf, v1s[i]);
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
    FindMaxSeparation._maxSeparation = maxSeparation;
    FindMaxSeparation._bestIndex = bestIndex;
}

function FindIncidentEdge(c, poly1, xf1, edge1, poly2, xf2) {
    var normals1 = poly1.m_normals;
    var count2 = poly2.m_count;
    var vertices2 = poly2.m_vertices;
    var normals2 = poly2.m_normals;
    ASSERT && common.assert(0 <= edge1 && edge1 < poly1.m_count);
    var normal1 = Rot.mulT(xf2.q, Rot.mul(xf1.q, normals1[edge1]));
    var index = 0;
    var minDot = Infinity;
    for (var i = 0; i < count2; ++i) {
        var dot = Vec2.dot(normal1, normals2[i]);
        if (dot < minDot) {
            minDot = dot;
            index = i;
        }
    }
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
    var poly2;
    var xf1;
    var xf2;
    var edge1;
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
    var frontOffset = Vec2.dot(normal, v11);
    var sideOffset1 = -Vec2.dot(tangent, v11) + totalRadius;
    var sideOffset2 = Vec2.dot(tangent, v12) + totalRadius;
    var clipPoints1 = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];
    var clipPoints2 = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];
    var np;
    np = Manifold.clipSegmentToLine(clipPoints1, incidentEdge, Vec2.neg(tangent), sideOffset1, iv1);
    if (np < 2) {
        return;
    }
    np = Manifold.clipSegmentToLine(clipPoints2, clipPoints1, tangent, sideOffset2, iv2);
    if (np < 2) {
        return;
    }
    manifold.localNormal = localNormal;
    manifold.localPoint = planePoint;
    var pointCount = 0;
    for (var i = 0; i < clipPoints2.length; ++i) {
        var separation = Vec2.dot(normal, clipPoints2[i].v) - frontOffset;
        if (separation <= totalRadius) {
            var cp = manifold.points[pointCount];
            cp.localPoint.set(Transform.mulT(xf2, clipPoints2[i].v));
            cp.id = clipPoints2[i].id;
            if (flip) {
                var cf = cp.id.cf;
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


},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":51,"./PolygonShape":48}],47:[function(require,module,exports){
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

function EdgeShape(v1, v2) {
    if (!(this instanceof EdgeShape)) {
        return new EdgeShape(v1, v2);
    }
    EdgeShape._super.call(this);
    this.m_type = EdgeShape.TYPE;
    this.m_radius = Settings.polygonRadius;
    this.m_vertex1 = v1 ? Vec2.clone(v1) : Vec2.zero();
    this.m_vertex2 = v2 ? Vec2.clone(v2) : Vec2.zero();
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

EdgeShape.prototype.rayCast = function(output, input, xf, childIndex) {
    var p1 = Rot.mulT(xf.q, Vec2.sub(input.p1, xf.p));
    var p2 = Rot.mulT(xf.q, Vec2.sub(input.p2, xf.p));
    var d = Vec2.sub(p2, p1);
    var v1 = this.m_vertex1;
    var v2 = this.m_vertex2;
    var e = Vec2.sub(v2, v1);
    var normal = Vec2.neo(e.y, -e.x);
    normal.normalize();
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


},{"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/create":52,"../util/options":53}],48:[function(require,module,exports){
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

function PolygonShape(vertices) {
    if (!(this instanceof PolygonShape)) {
        return new PolygonShape(vertices);
    }
    PolygonShape._super.call(this);
    this.m_type = PolygonShape.TYPE;
    this.m_radius = Settings.polygonRadius;
    this.m_centroid = Vec2.zero();
    this.m_vertices = [];
    this.m_normals = [];
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
    var pRef = Vec2.zero();
    if (false) {
        for (var i = 0; i < count; ++i) {
            pRef.add(vs[i]);
        }
        pRef.mul(1 / count);
    }
    var inv3 = 1 / 3;
    for (var i = 0; i < count; ++i) {
        var p1 = pRef;
        var p2 = vs[i];
        var p3 = i + 1 < count ? vs[i + 1] : vs[0];
        var e1 = Vec2.sub(p2, p1);
        var e2 = Vec2.sub(p3, p1);
        var D = Vec2.cross(e1, e2);
        var triangleArea = .5 * D;
        area += triangleArea;
        c.wAdd(triangleArea * inv3, p1);
        c.wAdd(triangleArea * inv3, p2);
        c.wAdd(triangleArea * inv3, p3);
    }
    ASSERT && common.assert(area > Math.EPSILON);
    c.mul(1 / area);
    return c;
}

PolygonShape.prototype._set = function(vertices) {
    ASSERT && common.assert(3 <= vertices.length && vertices.length <= Settings.maxPolygonVertices);
    if (vertices.length < 3) {
        SetAsBox(1, 1);
        return;
    }
    var n = Math.min(vertices.length, Settings.maxPolygonVertices);
    var ps = [];
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
        ASSERT && common.assert(false);
        SetAsBox(1, 1);
        return;
    }
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
        ASSERT && common.assert(false);
        SetAsBox(1, 1);
        return;
    }
    this.m_count = m;
    for (var i = 0; i < m; ++i) {
        this.m_vertices[i] = ps[hull[i]];
    }
    for (var i = 0; i < m; ++i) {
        var i1 = i;
        var i2 = i + 1 < m ? i + 1 : 0;
        var edge = Vec2.sub(this.m_vertices[i2], this.m_vertices[i1]);
        ASSERT && common.assert(edge.lengthSquared() > Math.EPSILON * Math.EPSILON);
        this.m_normals[i] = Vec2.cross(edge, 1);
        this.m_normals[i].normalize();
    }
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
    var p1 = Rot.mulT(xf.q, Vec2.sub(input.p1, xf.p));
    var p2 = Rot.mulT(xf.q, Vec2.sub(input.p2, xf.p));
    var d = Vec2.sub(p2, p1);
    var lower = 0;
    var upper = input.maxFraction;
    var index = -1;
    for (var i = 0; i < this.m_count; ++i) {
        var numerator = Vec2.dot(this.m_normals[i], Vec2.sub(this.m_vertices[i], p1));
        var denominator = Vec2.dot(this.m_normals[i], d);
        if (denominator == 0) {
            if (numerator < 0) {
                return false;
            }
        } else {
            if (denominator < 0 && numerator < lower * denominator) {
                lower = numerator / denominator;
                index = i;
            } else if (denominator > 0 && numerator < upper * denominator) {
                upper = numerator / denominator;
            }
        }
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
    ASSERT && common.assert(this.m_count >= 3);
    var center = Vec2.zero();
    var area = 0;
    var I = 0;
    var s = Vec2.zero();
    for (var i = 0; i < this.m_count; ++i) {
        s.add(this.m_vertices[i]);
    }
    s.mul(1 / this.m_count);
    var k_inv3 = 1 / 3;
    for (var i = 0; i < this.m_count; ++i) {
        var e1 = Vec2.sub(this.m_vertices[i], s);
        var e2 = i + 1 < this.m_count ? Vec2.sub(this.m_vertices[i + 1], s) : Vec2.sub(this.m_vertices[0], s);
        var D = Vec2.cross(e1, e2);
        var triangleArea = .5 * D;
        area += triangleArea;
        center.wAdd(triangleArea * k_inv3, e1, triangleArea * k_inv3, e2);
        var ex1 = e1.x;
        var ey1 = e1.y;
        var ex2 = e2.x;
        var ey2 = e2.y;
        var intx2 = ex1 * ex1 + ex2 * ex1 + ex2 * ex2;
        var inty2 = ey1 * ey1 + ey2 * ey1 + ey2 * ey2;
        I += .25 * k_inv3 * D * (intx2 + inty2);
    }
    massData.mass = density * area;
    ASSERT && common.assert(area > Math.EPSILON);
    center.mul(1 / area);
    massData.center.wSet(1, center, 1, s);
    massData.I = density * I;
    massData.I += massData.mass * (Vec2.dot(massData.center, massData.center) - Vec2.dot(center, center));
};

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


},{"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":51,"../util/create":52,"../util/options":53}],49:[function(require,module,exports){
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


},{}],50:[function(require,module,exports){
DEBUG = typeof DEBUG === "undefined" ? false : DEBUG;

ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

module.exports.now = function() {
    return Date.now();
};

module.exports.diff = function(time) {
    return Date.now() - time;
};


},{}],51:[function(require,module,exports){
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


},{}],52:[function(require,module,exports){
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


},{}],53:[function(require,module,exports){
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


},{}],54:[function(require,module,exports){
function _identity(x) {
  return x;
};
var _cache = {};
var _modes = {};
var _easings = {};

function Easing(token) {
  if (typeof token === 'function') {
    return token;
  }
  if (typeof token !== 'string') {
    return _identity;
  }
  var fn = _cache[token];
  if (fn) {
    return fn;
  }
  var match = /^(\w+)(-(in|out|in-out|out-in))?(\((.*)\))?$/i.exec(token);
  if (!match || !match.length) {
    return _identity;
  }
  var easing = _easings[match[1]];
  var mode = _modes[match[3]];
  var params = match[5];
  if (easing && easing.fn) {
    fn = easing.fn;
  } else if (easing && easing.fc) {
    fn = easing.fc.apply(easing.fc, params
        && params.replace(/\s+/, '').split(','));
  } else {
    fn = _identity;
  }
  if (mode) {
    fn = mode.fn(fn);
  }
  // TODO: It can be a memory leak with different `params`.
  _cache[token] = fn;
  return fn;
};

Easing.add = function(data) {
  // TODO: create a map of all { name-mode : data }
  var names = (data.name || data.mode).split(/\s+/);
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    if (name) {
      (data.name ? _easings : _modes)[name] = data;
    }
  }
};

Easing.add({
  mode : 'in',
  fn : function(f) {
    return f;
  }
});

Easing.add({
  mode : 'out',
  fn : function(f) {
    return function(t) {
      return 1 - f(1 - t);
    };
  }
});

Easing.add({
  mode : 'in-out',
  fn : function(f) {
    return function(t) {
      return (t < 0.5) ? (f(2 * t) / 2) : (1 - f(2 * (1 - t)) / 2);
    };
  }
});

Easing.add({
  mode : 'out-in',
  fn : function(f) {
    return function(t) {
      return (t < 0.5) ? (1 - f(2 * (1 - t)) / 2) : (f(2 * t) / 2);
    };
  }
});

Easing.add({
  name : 'linear',
  fn : function(t) {
    return t;
  }
});

Easing.add({
  name : 'quad',
  fn : function(t) {
    return t * t;
  }
});

Easing.add({
  name : 'cubic',
  fn : function(t) {
    return t * t * t;
  }
});

Easing.add({
  name : 'quart',
  fn : function(t) {
    return t * t * t * t;
  }
});

Easing.add({
  name : 'quint',
  fn : function(t) {
    return t * t * t * t * t;
  }
});

Easing.add({
  name : 'sin sine',
  fn : function(t) {
    return 1 - Math.cos(t * Math.PI / 2);
  }
});

Easing.add({
  name : 'exp expo',
  fn : function(t) {
    return t == 0 ? 0 : Math.pow(2, 10 * (t - 1));
  }
});

Easing.add({
  name : 'circle circ',
  fn : function(t) {
    return 1 - Math.sqrt(1 - t * t);
  }
});

Easing.add({
  name : 'bounce',
  fn : function(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625
        * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625
        * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t
        + .984375;
  }
});

Easing.add({
  name : 'poly',
  fc : function(e) {
    return function(t) {
      return Math.pow(t, e);
    };
  }
});

Easing.add({
  name : 'elastic',
  fc : function(a, p) {
    p = p || 0.45;
    a = a || 1;
    var s = p / (2 * Math.PI) * Math.asin(1 / a);
    return function(t) {
      return 1 + a * Math.pow(2, -10 * t)
          * Math.sin((t - s) * (2 * Math.PI) / p);
    };
  }
});

Easing.add({
  name : 'back',
  fc : function(s) {
    s = typeof s !== 'undefined' ? s : 1.70158;
    return function(t) {
      return t * t * ((s + 1) * t - s);
    };
  }
});

module.exports = Easing;

},{}],55:[function(require,module,exports){
if (typeof DEBUG === 'undefined')
  DEBUG = true;

require('../core')._load(function(stage, elem) {
  Mouse.subscribe(stage, elem);
});

// TODO: capture mouse

Mouse.CLICK = 'click';
Mouse.START = 'touchstart mousedown';
Mouse.MOVE = 'touchmove mousemove';
Mouse.END = 'touchend mouseup';
Mouse.CANCEL = 'touchcancel mousecancel';

Mouse.subscribe = function(stage, elem) {
  if (stage.mouse) {
    return;
  }

  stage.mouse = new Mouse(stage, elem);

  // `click` events are synthesized from start/end events on same nodes
  // `mousecancel` events are synthesized on blur or mouseup outside element

  elem.addEventListener('touchstart', handleStart);
  elem.addEventListener('touchend', handleEnd);
  elem.addEventListener('touchmove', handleMove);
  elem.addEventListener('touchcancel', handleCancel);

  elem.addEventListener('mousedown', handleStart);
  elem.addEventListener('mouseup', handleEnd);
  elem.addEventListener('mousemove', handleMove);

  document.addEventListener('mouseup', handleCancel);
  window.addEventListener("blur", handleCancel);

  var clicklist = [], cancellist = [];

  function handleStart(event) {
    event.preventDefault();
    stage.mouse.locate(event);
    // DEBUG && console.log('Mouse Start: ' + event.type + ' ' + mouse);
    stage.mouse.publish(event.type, event);

    stage.mouse.lookup('click', clicklist);
    stage.mouse.lookup('mousecancel', cancellist);
  }

  function handleMove(event) {
    event.preventDefault();
    stage.mouse.locate(event);
    stage.mouse.publish(event.type, event);
  }

  function handleEnd(event) {
    event.preventDefault();
    // up/end location is not available, last one is used instead
    // DEBUG && console.log('Mouse End: ' + event.type + ' ' + mouse);
    stage.mouse.publish(event.type, event);

    if (clicklist.length) {
      // DEBUG && console.log('Mouse Click: ' + clicklist.length);
      stage.mouse.publish('click', event, clicklist);
    }
    cancellist.length = 0;
  }

  function handleCancel(event) {
    if (cancellist.length) {
      // DEBUG && console.log('Mouse Cancel: ' + event.type);
      stage.mouse.publish('mousecancel', event, cancellist);
    }
    clicklist.length = 0;
  }
};

function Mouse(stage, elem) {
  if (!(this instanceof Mouse)) {
    // old-style mouse subscription
    return;
  }

  var ratio = stage.viewport().ratio || 1;

  stage.on('viewport', function(size) {
    ratio = size.ratio || ratio;
  });

  this.x = 0;
  this.y = 0;
  this.toString = function() {
    return (this.x | 0) + 'x' + (this.y | 0);
  };
  this.locate = function(event) {
    locateElevent(elem, event, this);
    this.x *= ratio;
    this.y *= ratio;
  };
  this.lookup = function(type, collect) {
    this.type = type;
    this.root = stage;
    this.event = null;
    collect.length = 0;
    this.collect = collect;

    this.root.visit(this.visitor, this);
  };
  this.publish = function(type, event, targets) {
    this.type = type;
    this.root = stage;
    this.event = event;
    this.collect = false;
    this.timeStamp = Date.now();

    if (type !== 'mousemove' && type !== 'touchmove') {
      DEBUG && console.log(this.type + ' ' + this);
    }

    if (targets) {
      while (targets.length)
        if (this.visitor.end(targets.shift(), this))
          break;
      targets.length = 0;
    } else {
      this.root.visit(this.visitor, this);
    }
  };
  this.visitor = {
    reverse : true,
    visible : true,
    start : function(node, mouse) {
      return !node._flag(mouse.type);
    },
    end : function(node, mouse) {
      // mouse: event/collect, type, root
      rel.raw = mouse.event;
      rel.type = mouse.type;
      rel.timeStamp = mouse.timeStamp;
      rel.abs.x = mouse.x;
      rel.abs.y = mouse.y;

      var listeners = node.listeners(mouse.type);
      if (!listeners) {
        return;
      }
      node.matrix().inverse().map(mouse, rel);
      if (!(node === mouse.root || node.hitTest(rel))) {
        return;
      }
      if (mouse.collect) {
        mouse.collect.push(node);
      }
      if (mouse.event) {
        var cancel = false;
        for (var l = 0; l < listeners.length; l++) {
          cancel = listeners[l].call(node, rel) ? true : cancel;
        }
        return cancel;
      }
    }
  };
};

// TODO: define per mouse object with get-only x and y
var rel = {}, abs = {};

defineValue(rel, 'clone', function(obj) {
  obj = obj || {}, obj.x = this.x, obj.y = this.y;
  return obj;
});
defineValue(rel, 'toString', function() {
  return (this.x | 0) + 'x' + (this.y | 0) + ' (' + this.abs + ')';
});
defineValue(rel, 'abs', abs);
defineValue(abs, 'clone', function(obj) {
  obj = obj || {}, obj.x = this.x, obj.y = this.y;
  return obj;
});
defineValue(abs, 'toString', function() {
  return (this.x | 0) + 'x' + (this.y | 0);
});

function defineValue(obj, name, value) {
  Object.defineProperty(obj, name, {
    value : value
  });
}

function locateElevent(el, ev, loc) {
  // pageX/Y if available?
  if (ev.touches && ev.touches.length) {
    loc.x = ev.touches[0].clientX;
    loc.y = ev.touches[0].clientY;
  } else {
    loc.x = ev.clientX;
    loc.y = ev.clientY;
  }
  var rect = el.getBoundingClientRect();
  loc.x -= rect.left;
  loc.y -= rect.top;
  loc.x -= el.clientLeft | 0;
  loc.y -= el.clientTop | 0;
  return loc;
};

module.exports = Mouse;

},{"../core":60}],56:[function(require,module,exports){
var Easing = require('./easing');
var Class = require('../core');
var Pin = require('../pin');

Class.prototype.tween = function(duration, delay, append) {
  if (typeof duration !== 'number') {
    append = duration, delay = 0, duration = 0;
  } else if (typeof delay !== 'number') {
    append = delay, delay = 0;
  }

  if (!this._tweens) {
    this._tweens = [];
    var ticktime = 0;
    this.tick(function(elapsed, now, last) {
      if (!this._tweens.length) {
        return;
      }

      // ignore old elapsed
      var ignore = ticktime != last;
      ticktime = now;
      if (ignore) {
        return true;
      }

      var head = this._tweens[0];

      var next = head.tick(this, elapsed, now, last);

      if (next && head === this._tweens[0]) {
        this._tweens.shift();
      }

      if (typeof next === 'function') {
        try {
          next.call(this);
        } catch (e) {
          console.log(e);
        }
      }

      if (typeof next === 'object') {
        this._tweens.unshift(next);
      }

      return true;
    }, true);
  }

  this.touch();
  if (!append) {
    this._tweens.length = 0;
  }
  var tween = new Tween(this, duration, delay);
  this._tweens.push(tween);
  return tween;
};

function Tween(owner, duration, delay) {
  this._end = {};
  this._duration = duration || 400;
  this._delay = delay || 0;

  this._owner = owner;
  this._time = 0;
};

Tween.prototype.tick = function(node, elapsed, now, last) {
  this._time += elapsed;

  if (this._time < this._delay) {
    return;
  }

  var time = this._time - this._delay;

  if (!this._start) {
    this._start = {};
    for ( var key in this._end) {
      this._start[key] = this._owner.pin(key);
    }
  }

  var p, over;
  if (time < this._duration) {
    p = time / this._duration;
    over = false;
  } else {
    p = 1;
    over = true;
  }

  if (typeof this._easing == 'function') {
    p = this._easing(p);
  }

  var q = 1 - p;

  for ( var key in this._end) {
    this._owner.pin(key, this._start[key] * q + this._end[key] * p);
  }

  if (over) {
    return this._next || this._done || true;
  }
};

Tween.prototype.tween = function(duration, delay) {
  return this._next = new Tween(this._owner, duration, delay);
};

Tween.prototype.duration = function(duration) {
  this._duration = duration;
  return this;
};

Tween.prototype.delay = function(delay) {
  this._delay = delay;
  return this;
};

Tween.prototype.ease = function(easing) {
  this._easing = Easing(easing);
  return this;
};

Tween.prototype.done = function(fn) {
  this._done = fn;
  return this;
};

Tween.prototype.hide = function() {
  this.done(function() {
    this.hide();
  });
  return this;
};

Tween.prototype.remove = function() {
  this.done(function() {
    this.remove();
  });
  return this;
};

Tween.prototype.pin = function(a, b) {
  if (typeof a === 'object') {
    for ( var attr in a) {
      pinning(this._owner, this._end, attr, a[attr]);
    }
  } else if (typeof b !== 'undefined') {
    pinning(this._owner, this._end, a, b);
  }
  return this;
};

function pinning(node, map, key, value) {
  if (typeof node.pin(key) === 'number') {
    map[key] = value;
  } else if (typeof node.pin(key + 'X') === 'number'
      && typeof node.pin(key + 'Y') === 'number') {
    map[key + 'X'] = value;
    map[key + 'Y'] = value;
  }
}

Pin._add_shortcuts(Tween);

/**
 * @deprecated Use .done(fn) instead.
 */
Tween.prototype.then = function(fn) {
  this.done(fn);
  return this;
};

/**
 * @deprecated NOOP
 */
Tween.prototype.clear = function(forward) {
  return this;
};

module.exports = Tween;
},{"../core":60,"../pin":68,"./easing":54}],57:[function(require,module,exports){
var Class = require('./core');
require('./pin');
require('./loop');

var create = require('./util/create');
var math = require('./util/math');

Class.anim = function(frames, fps) {
  var anim = new Anim();
  anim.frames(frames).gotoFrame(0);
  fps && anim.fps(fps);
  return anim;
};

Anim._super = Class;
Anim.prototype = create(Anim._super.prototype);

// TODO: replace with atlas fps or texture time
Class.Anim = {
  FPS : 15
};

function Anim() {
  Anim._super.call(this);
  this.label('Anim');

  this._textures = [];

  this._fps = Class.Anim.FPS;
  this._ft = 1000 / this._fps;

  this._time = -1;
  this._repeat = 0;

  this._index = 0;
  this._frames = [];

  var lastTime = 0;
  this.tick(function(t, now, last) {
    if (this._time < 0 || this._frames.length <= 1) {
      return;
    }

    // ignore old elapsed
    var ignore = lastTime != last;
    lastTime = now;
    if (ignore) {
      return true;
    }

    this._time += t;
    if (this._time < this._ft) {
      return true;
    }
    var n = this._time / this._ft | 0;
    this._time -= n * this._ft;
    this.moveFrame(n);
    if (this._repeat > 0 && (this._repeat -= n) <= 0) {
      this.stop();
      this._callback && this._callback();
      return false;
    }
    return true;
  }, false);
};

Anim.prototype.fps = function(fps) {
  if (typeof fps === 'undefined') {
    return this._fps;
  }
  this._fps = fps > 0 ? fps : Class.Anim.FPS;
  this._ft = 1000 / this._fps;
  return this;
};

/**
 * @deprecated Use frames
 */
Anim.prototype.setFrames = function(a, b, c) {
  return this.frames(a, b, c);
};

Anim.prototype.frames = function(frames) {
  this._index = 0;
  this._frames = Class.texture(frames).array();
  this.touch();
  return this;
};

Anim.prototype.length = function() {
  return this._frames ? this._frames.length : 0;
};

Anim.prototype.gotoFrame = function(frame, resize) {
  this._index = math.rotate(frame, this._frames.length) | 0;
  resize = resize || !this._textures[0];
  this._textures[0] = this._frames[this._index];
  if (resize) {
    this.pin('width', this._textures[0].width);
    this.pin('height', this._textures[0].height);
  }
  this.touch();
  return this;
};

Anim.prototype.moveFrame = function(move) {
  return this.gotoFrame(this._index + move);
};

Anim.prototype.repeat = function(repeat, callback) {
  this._repeat = repeat * this._frames.length - 1;
  this._callback = callback;
  this.play();
  return this;
};

Anim.prototype.play = function(frame) {
  if (typeof frame !== 'undefined') {
    this.gotoFrame(frame);
    this._time = 0;
  } else if (this._time < 0) {
    this._time = 0;
  }

  this.touch();
  return this;
};

Anim.prototype.stop = function(frame) {
  this._time = -1;
  if (typeof frame !== 'undefined') {
    this.gotoFrame(frame);
  }
  return this;
};

},{"./core":60,"./loop":66,"./pin":68,"./util/create":74,"./util/math":78}],58:[function(require,module,exports){
if (typeof DEBUG === 'undefined')
  DEBUG = true;

var Class = require('./core');
var Texture = require('./texture');

var extend = require('./util/extend');
var create = require('./util/create');
var is = require('./util/is');

var string = require('./util/string');

// name : atlas
var _atlases_map = {};
// [atlas]
var _atlases_arr = [];

// TODO: print subquery not found error
// TODO: index textures

Class.atlas = function(def) {
  var atlas = is.fn(def.draw) ? def : new Atlas(def);
  if (def.name) {
    _atlases_map[def.name] = atlas;
  }
  _atlases_arr.push(atlas);

  deprecated(def, 'imagePath');
  deprecated(def, 'imageRatio');

  var url = def.imagePath;
  var ratio = def.imageRatio || 1;
  if (is.string(def.image)) {
    url = def.image;
  } else if (is.hash(def.image)) {
    url = def.image.src || def.image.url;
    ratio = def.image.ratio || ratio;
  }
  url && Class.preload(function(done) {
    url = Class.resolve(url);
    DEBUG && console.log('Loading atlas: ' + url);
    var imageloader = Class.config('image-loader');

    imageloader(url, function(image) {
      DEBUG && console.log('Image loaded: ' + url);
      atlas.src(image, ratio);
      done();

    }, function(err) {
      DEBUG && console.log('Error loading atlas: ' + url, err);
      done();
    });
  });

  return atlas;
};

Atlas._super = Texture;
Atlas.prototype = create(Atlas._super.prototype);

function Atlas(def) {
  Atlas._super.call(this);

  var atlas = this;

  deprecated(def, 'filter');
  deprecated(def, 'cutouts');
  deprecated(def, 'sprites');
  deprecated(def, 'factory');

  var map = def.map || def.filter;
  var ppu = def.ppu || def.ratio || 1;
  var trim = def.trim || 0;
  var textures = def.textures;
  var factory = def.factory;
  var cutouts = def.cutouts || def.sprites;

  function make(def) {
    if (!def || is.fn(def.draw)) {
      return def;
    }

    def = extend({}, def);

    if (is.fn(map)) {
      def = map(def);
    }

    if (ppu != 1) {
      def.x *= ppu, def.y *= ppu;
      def.width *= ppu, def.height *= ppu;
      def.top *= ppu, def.bottom *= ppu;
      def.left *= ppu, def.right *= ppu;
    }

    if (trim != 0) {
      def.x += trim, def.y += trim;
      def.width -= 2 * trim, def.height -= 2 * trim;
      def.top -= trim, def.bottom -= trim;
      def.left -= trim, def.right -= trim;
    }

    var texture = atlas.pipe();
    texture.top = def.top, texture.bottom = def.bottom;
    texture.left = def.left, texture.right = def.right;
    texture.src(def.x, def.y, def.width, def.height);
    return texture;
  }

  function find(query) {
    if (textures) {
      if (is.fn(textures)) {
        return textures(query);
      } else if (is.hash(textures)) {
        return textures[query];
      }
    }
    if (cutouts) { // deprecated
      var result = null, n = 0;
      for (var i = 0; i < cutouts.length; i++) {
        if (string.startsWith(cutouts[i].name, query)) {
          if (n === 0) {
            result = cutouts[i];
          } else if (n === 1) {
            result = [ result, cutouts[i] ];
          } else {
            result.push(cutouts[i]);
          }
          n++;
        }
      }
      if (n === 0 && is.fn(factory)) {
        result = function(subquery) {
          return factory(query + (subquery ? subquery : ''));
        };
      }
      return result;
    }
  }

  this.select = function(query) {
    if (!query) {
      // TODO: if `textures` is texture def, map or fn?
      return new Selection(this.pipe());
    }
    var found = find(query);
    if (found) {
      return new Selection(found, find, make);
    }
  };

};

var nfTexture = new Texture();
nfTexture.x = nfTexture.y = nfTexture.width = nfTexture.height = 0;
nfTexture.pipe = nfTexture.src = nfTexture.dest = function() {
  return this;
};
nfTexture.draw = function() {
};

var nfSelection = new Selection(nfTexture);

function Selection(result, find, make) {
  function link(result, subquery) {
    if (!result) {
      return nfTexture;

    } else if (is.fn(result.draw)) {
      return result;

    } else if (is.hash(result) && is.number(result.width)
        && is.number(result.height) && is.fn(make)) {
      return make(result);

    } else if (is.hash(result) && is.defined(subquery)) {
      return link(result[subquery]);

    } else if (is.fn(result)) {
      return link(result(subquery));

    } else if (is.array(result)) {
      return link(result[0]);

    } else if (is.string(result) && is.fn(find)) {
      return link(find(result));
    }
  }

  this.one = function(subquery) {
    return link(result, subquery);
  };

  this.array = function(arr) {
    var array = is.array(arr) ? arr : [];
    if (is.array(result)) {
      for (var i = 0; i < result.length; i++) {
        array[i] = link(result[i]);
      }
    } else {
      array[0] = link(result);
    }
    return array;
  };
}

Class.texture = function(query) {
  if (!is.string(query)) {
    return new Selection(query);
  }

  var result = null, atlas, i;

  if ((i = query.indexOf(':')) > 0 && query.length > i + 1) {
    atlas = _atlases_map[query.slice(0, i)];
    result = atlas && atlas.select(query.slice(i + 1));
  }

  if (!result && (atlas = _atlases_map[query])) {
    result = atlas.select();
  }

  for (i = 0; !result && i < _atlases_arr.length; i++) {
    result = _atlases_arr[i].select(query);
  }

  if (!result) {
    console.error('Texture not found: ' + query);
    result = nfSelection;
  }

  return result;
};

function deprecated(hash, name, msg) {
  if (name in hash)
    console.log(msg ? msg.replace('%name', name) : '\'' + name
        + '\' field of texture atlas is deprecated.');
};

module.exports = Atlas;

},{"./core":60,"./texture":71,"./util/create":74,"./util/extend":76,"./util/is":77,"./util/string":81}],59:[function(require,module,exports){
var Class = require('./core');
var Texture = require('./texture');

Class.canvas = function(type, attributes, callback) {
  if (typeof type === 'string') {
    if (typeof attributes === 'object') {
    } else {
      if (typeof attributes === 'function') {
        callback = attributes;
      }
      attributes = {};
    }
  } else {
    if (typeof type === 'function') {
      callback = type;
    }
    attributes = {};
    type = '2d';
  }

  var canvas = document.createElement('canvas');
  var context = canvas.getContext(type, attributes);
  var texture = new Texture(canvas);

  texture.context = function() {
    return context;
  };

  texture.size = function(width, height, ratio) {
    ratio = ratio || 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    this.src(canvas, ratio);
    return this;
  };

  texture.canvas = function(fn) {
    if (typeof fn === 'function') {
      fn.call(this, context);
    } else if (typeof fn === 'undefined' && typeof callback === 'function') {
      callback.call(this, context);
    }
    return this;
  };

  if (typeof callback === 'function') {
    callback.call(texture, context);
  }

  return texture;
};
},{"./core":60,"./texture":71}],60:[function(require,module,exports){
if (typeof DEBUG === 'undefined')
  DEBUG = true;

var stats = require('./util/stats');
var extend = require('./util/extend');
var is = require('./util/is');
var _await = require('./util/await');

stats.create = 0;

function Class(arg) {
  if (!(this instanceof Class)) {
    if (is.fn(arg)) {
      return Class.app.apply(Class, arguments);
    } else if (is.object(arg)) {
      return Class.atlas.apply(Class, arguments);
    } else {
      return arg;
    }
  }

  stats.create++;

  for (var i = 0; i < _init.length; i++) {
    _init[i].call(this);
  }
}

var _init = [];

Class._init = function(fn) {
  _init.push(fn);
};

var _load = [];

Class._load = function(fn) {
  _load.push(fn);
};

var _config = {};

Class.config = function() {
  if (arguments.length === 1 && is.string(arguments[0])) {
    return _config[arguments[0]];
  }
  if (arguments.length === 1 && is.object(arguments[0])) {
    extend(_config, arguments[0]);
  }
  if (arguments.length === 2 && is.string(arguments[0])) {
    _config[arguments[0], arguments[1]];
  }
};

var _app_queue = [];
var _preload_queue = [];
var _stages = [];
var _loaded = false;
var _paused = false;

Class.app = function(app, opts) {
  if (!_loaded) {
    _app_queue.push(arguments);
    return;
  }
  DEBUG && console.log('Creating app...');
  var loader = Class.config('app-loader');
  loader(function(stage, canvas) {
    DEBUG && console.log('Initing app...');
    for (var i = 0; i < _load.length; i++) {
      _load[i].call(this, stage, canvas);
    }
    app(stage, canvas);
    _stages.push(stage);
    DEBUG && console.log('Starting app...');
    stage.start();
  }, opts);
};

var loading = _await();

Class.preload = function(load) {
  if (typeof load === 'string') {
    var url = Class.resolve(load);
    if (/\.js($|\?|\#)/.test(url)) {
      DEBUG && console.log('Loading script: ' + url);
      load = function(callback) {
        loadScript(url, callback);
      };
    }
  }
  if (typeof load !== 'function') {
    return;
  }
  // if (!_started) {
  // _preload_queue.push(load);
  // return;
  // }
  load(loading());
};

Class.start = function(config) {
  DEBUG && console.log('Starting...');

  Class.config(config);

  // DEBUG && console.log('Preloading...');
  // _started = true;
  // while (_preload_queue.length) {
  // var load = _preload_queue.shift();
  // load(loading());
  // }

  loading.then(function() {
    DEBUG && console.log('Loading apps...');
    _loaded = true;
    while (_app_queue.length) {
      var args = _app_queue.shift();
      Class.app.apply(Class, args);
    }
  });
};

Class.pause = function() {
  if (!_paused) {
    _paused = true;
    for (var i = _stages.length - 1; i >= 0; i--) {
      _stages[i].pause();
    }
  }
};

Class.resume = function() {
  if (_paused) {
    _paused = false;
    for (var i = _stages.length - 1; i >= 0; i--) {
      _stages[i].resume();
    }
  }
};

Class.create = function() {
  return new Class();
};

Class.resolve = (function() {

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return function(url) {
      return url;
    };
  }

  var scripts = document.getElementsByTagName('script');

  function getScriptSrc() {
    // HTML5
    if (document.currentScript) {
      return document.currentScript.src;
    }

    // IE>=10
    var stack;
    try {
      var err = new Error();
      if (err.stack) {
        stack = err.stack;
      } else {
        throw err;
      }
    } catch (err) {
      stack = err.stack;
    }
    if (typeof stack === 'string') {
      stack = stack.split('\n');
      // Uses the last line, where the call started
      for (var i = stack.length; i--;) {
        var url = stack[i].match(/(\w+\:\/\/[^/]*?\/.+?)(:\d+)(:\d+)?/);
        if (url) {
          return url[1];
        }
      }
    }

    // IE<11
    if (scripts.length && 'readyState' in scripts[0]) {
      for (var i = scripts.length; i--;) {
        if (scripts[i].readyState === 'interactive') {
          return scripts[i].src;
        }
      }
    }

    return location.href;
  }

  return function(url) {
    if (/^\.\//.test(url)) {
      var src = getScriptSrc();
      var base = src.substring(0, src.lastIndexOf('/') + 1);
      url = base + url.substring(2);
      // } else if (/^\.\.\//.test(url)) {
      // url = base + url;
    }
    return url;
  };
})();

module.exports = Class;

function loadScript(src, callback) {
  var el = document.createElement('script');
  el.addEventListener('load', function() {
    callback();
  });
  el.addEventListener('error', function(err) {
    callback(err || 'Error loading script: ' + src);
  });
  el.src = src;
  el.id = 'preload-' + Date.now();
  document.body.appendChild(el);
};
},{"./util/await":73,"./util/extend":76,"./util/is":77,"./util/stats":80}],61:[function(require,module,exports){
require('./util/event')(require('./core').prototype, function(obj, name, on) {
  obj._flag(name, on);
});

},{"./core":60,"./util/event":75}],62:[function(require,module,exports){
var Class = require('./core');
require('./pin');
require('./loop');

var repeat = require('./util/repeat');
var create = require('./util/create');

module.exports = Image;

Class.image = function(image) {
  var img = new Image();
  image && img.image(image);
  return img;
};

Image._super = Class;
Image.prototype = create(Image._super.prototype);

function Image() {
  Image._super.call(this);
  this.label('Image');
  this._textures = [];
  this._image = null;
};

/**
 * @deprecated Use image
 */
Image.prototype.setImage = function(a, b, c) {
  return this.image(a, b, c);
};

Image.prototype.image = function(image) {
  this._image = Class.texture(image).one();
  this.pin('width', this._image ? this._image.width : 0);
  this.pin('height', this._image ? this._image.height : 0);
  this._textures[0] = this._image.pipe();
  this._textures.length = 1;
  return this;
};

Image.prototype.tile = function(inner) {
  this._repeat(false, inner);
  return this;
};

Image.prototype.stretch = function(inner) {
  this._repeat(true, inner);
  return this;
};

Image.prototype._repeat = function(stretch, inner) {
  var self = this;
  this.untick(this._repeatTicker);
  this.tick(this._repeatTicker = function() {
    if (this._mo_stretch == this._pin._ts_transform) {
      return;
    }
    this._mo_stretch = this._pin._ts_transform;
    var width = this.pin('width');
    var height = this.pin('height');
    this._textures.length = repeat(this._image, width, height, stretch, inner,
        insert);
  });

  function insert(i, sx, sy, sw, sh, dx, dy, dw, dh) {
    var repeat = self._textures.length > i ? self._textures[i]
        : self._textures[i] = self._image.pipe();
    repeat.src(sx, sy, sw, sh);
    repeat.dest(dx, dy, dw, dh);
  }
};

},{"./core":60,"./loop":66,"./pin":68,"./util/create":74,"./util/repeat":79}],63:[function(require,module,exports){
module.exports = require('./core');
module.exports.Matrix = require('./matrix');
module.exports.Texture = require('./texture');
require('./atlas');
require('./tree');
require('./event');
require('./pin');

require('./loop');
require('./root');
},{"./atlas":58,"./core":60,"./event":61,"./loop":66,"./matrix":67,"./pin":68,"./root":69,"./texture":71,"./tree":72}],64:[function(require,module,exports){
var Class = require('./core');
require('./pin');
require('./loop');

var create = require('./util/create');

Class.row = function(align) {
  return Class.create().row(align).label('Row');
};

Class.prototype.row = function(align) {
  this.sequence('row', align);
  return this;
};

Class.column = function(align) {
  return Class.create().column(align).label('Row');
};

Class.prototype.column = function(align) {
  this.sequence('column', align);
  return this;
};

Class.sequence = function(type, align) {
  return Class.create().sequence(type, align).label('Sequence');
};

Class.prototype.sequence = function(type, align) {

  this._padding = this._padding || 0;
  this._spacing = this._spacing || 0;

  this.untick(this._layoutTiker);
  this.tick(this._layoutTiker = function() {
    if (this._mo_seq == this._ts_touch) {
      return;
    }
    this._mo_seq = this._ts_touch;

    var alignChildren = (this._mo_seqAlign != this._ts_children);
    this._mo_seqAlign = this._ts_children;

    var width = 0, height = 0;

    var child, next = this.first(true);
    var first = true;
    while (child = next) {
      next = child.next(true);

      child.matrix(true);
      var w = child.pin('boxWidth');
      var h = child.pin('boxHeight');

      if (type == 'column') {
        !first && (height += this._spacing);
        child.pin('offsetY') != height && child.pin('offsetY', height);
        width = Math.max(width, w);
        height = height + h;
        alignChildren && child.pin('alignX', align);

      } else if (type == 'row') {
        !first && (width += this._spacing);
        child.pin('offsetX') != width && child.pin('offsetX', width);
        width = width + w;
        height = Math.max(height, h);
        alignChildren && child.pin('alignY', align);
      }
      first = false;
    }
    width += 2 * this._padding;
    height += 2 * this._padding;
    this.pin('width') != width && this.pin('width', width);
    this.pin('height') != height && this.pin('height', height);
  });
  return this;
};

Class.box = function() {
  return Class.create().box().label('Box');
};

Class.prototype.box = function() {
  this._padding = this._padding || 0;

  this.untick(this._layoutTiker);
  this.tick(this._layoutTiker = function() {
    if (this._mo_box == this._ts_touch) {
      return;
    }
    this._mo_box = this._ts_touch;

    var width = 0, height = 0;
    var child, next = this.first(true);
    while (child = next) {
      next = child.next(true);
      child.matrix(true);
      var w = child.pin('boxWidth');
      var h = child.pin('boxHeight');
      width = Math.max(width, w);
      height = Math.max(height, h);
    }
    width += 2 * this._padding;
    height += 2 * this._padding;
    this.pin('width') != width && this.pin('width', width);
    this.pin('height') != height && this.pin('height', height);
  });
  return this;
};

Class.layer = function() {
  return Class.create().layer().label('Layer');
};

Class.prototype.layer = function() {

  this.untick(this._layoutTiker);
  this.tick(this._layoutTiker = function() {
    var parent = this.parent();
    if (parent) {
      var width = parent.pin('width');
      if (this.pin('width') != width) {
        this.pin('width', width);
      }
      var height = parent.pin('height');
      if (this.pin('height') != height) {
        this.pin('height', height);
      }
    }
  }, true);
  return this;
};

// TODO: move padding to pin
Class.prototype.padding = function(pad) {
  this._padding = pad;
  return this;
};

Class.prototype.spacing = function(space) {
  this._spacing = space;
  return this;
};

},{"./core":60,"./loop":66,"./pin":68,"./util/create":74}],65:[function(require,module,exports){
/**
 * Default loader for web.
 */

if (typeof DEBUG === 'undefined')
  DEBUG = true;

var Class = require('../core');

Class._supported = (function() {
  var elem = document.createElement('canvas');
  return (elem.getContext && elem.getContext('2d')) ? true : false;
})();

window.addEventListener('load', function() {
  DEBUG && console.log('On load.');
  if (Class._supported) {
    Class.start();
  }
  // TODO if not supported
}, false);

Class.config({
  'app-loader' : AppLoader,
  'image-loader' : ImageLoader
});

function AppLoader(app, configs) {
  configs = configs || {};
  var canvas = configs.canvas, context = null, full = false;
  var width = 0, height = 0, ratio = 1;

  if (typeof canvas === 'string') {
    canvas = document.getElementById(canvas);
  }

  if (!canvas) {
    canvas = document.getElementById('cutjs')
        || document.getElementById('stage');
  }

  if (!canvas) {
    full = true;
    DEBUG && console.log('Creating Canvas...');
    canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';

    var body = document.body;
    body.insertBefore(canvas, body.firstChild);
  }

  context = canvas.getContext('2d');

  var devicePixelRatio = window.devicePixelRatio || 1;
  var backingStoreRatio = context.webkitBackingStorePixelRatio
      || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio
      || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
  ratio = devicePixelRatio / backingStoreRatio;

  var requestAnimationFrame = window.requestAnimationFrame
      || window.msRequestAnimationFrame || window.mozRequestAnimationFrame
      || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame
      || function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      };

  DEBUG && console.log('Creating stage...');
  var root = Class.root(requestAnimationFrame, render);

  function render() {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, width, height);
    root.render(context);
  }

  root.background = function(color) {
    canvas.style.backgroundColor = color;
    return this;
  };

  app(root, canvas);

  resize();
  window.addEventListener('resize', resize, false);
  window.addEventListener('orientationchange', resize, false);

  function resize() {

    if (full) {
      // screen.availWidth/Height?
      width = (window.innerWidth > 0 ? window.innerWidth : screen.width);
      height = (window.innerHeight > 0 ? window.innerHeight : screen.height);

      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

    } else {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
    }

    width *= ratio;
    height *= ratio;

    if (canvas.width === width && canvas.height === height) {
      return;
    }

    canvas.width = width;
    canvas.height = height;

    DEBUG && console.log('Resize: ' + width + ' x ' + height + ' / ' + ratio);

    root.viewport(width, height, ratio);

    render();
  }
}

function ImageLoader(src, success, error) {
  DEBUG && console.log('Loading image: ' + src);
  var image = new Image();
  image.onload = function() {
    success(image);
  };
  image.onerror = error;
  image.src = src;
}

},{"../core":60}],66:[function(require,module,exports){
var Class = require('./core');
require('./pin');
var stats = require('./util/stats');

Class.prototype._textures = null;
Class.prototype._alpha = 1;

Class.prototype.render = function(context) {
  if (!this._visible) {
    return;
  }
  stats.node++;

  var m = this.matrix();
  context.setTransform(m.a, m.b, m.c, m.d, m.e, m.f);

  // move this elsewhere!
  this._alpha = this._pin._alpha * (this._parent ? this._parent._alpha : 1);
  var alpha = this._pin._textureAlpha * this._alpha;

  if (context.globalAlpha != alpha) {
    context.globalAlpha = alpha;
  }

  if (this._textures !== null) {
    for (var i = 0, n = this._textures.length; i < n; i++) {
      this._textures[i].draw(context);
    }
  }

  if (context.globalAlpha != this._alpha) {
    context.globalAlpha = this._alpha;
  }

  var child, next = this._first;
  while (child = next) {
    next = child._next;
    child.render(context);
  }
};

Class.prototype._tickBefore = null;
Class.prototype._tickAfter = null;
Class.prototype.MAX_ELAPSE = Infinity;

Class.prototype._tick = function(elapsed, now, last) {
  if (!this._visible) {
    return;
  }

  if (elapsed > this.MAX_ELAPSE) {
    elapsed = this.MAX_ELAPSE;
  }

  var ticked = false;

  if (this._tickBefore !== null) {
    for (var i = 0; i < this._tickBefore.length; i++) {
      stats.tick++;
      var tickFn = this._tickBefore[i];
      ticked = tickFn.call(this, elapsed, now, last) === true || ticked;
    }
  }

  var child, next = this._first;
  while (child = next) {
    next = child._next;
    if (child._flag('_tick')) {
      ticked = child._tick(elapsed, now, last) === true ? true : ticked;
    }
  }

  if (this._tickAfter !== null) {
    for (var i = 0; i < this._tickAfter.length; i++) {
      stats.tick++;
      var tickFn = this._tickAfter[i];
      ticked = tickFn.call(this, elapsed, now, last) === true || ticked;
    }
  }

  return ticked;
};

Class.prototype.tick = function(ticker, before) {
  if (typeof ticker !== 'function') {
    return;
  }
  if (before) {
    if (this._tickBefore === null) {
      this._tickBefore = [];
    }
    this._tickBefore.push(ticker);
  } else {
    if (this._tickAfter === null) {
      this._tickAfter = [];
    }
    this._tickAfter.push(ticker);
  }
  this._flag('_tick', this._tickAfter !== null && this._tickAfter.length > 0
      || this._tickBefore !== null && this._tickBefore.length > 0);
};

Class.prototype.untick = function(ticker) {
  if (typeof ticker !== 'function') {
    return;
  }
  var i;
  if (this._tickBefore !== null && (i = this._tickBefore.indexOf(ticker)) >= 0) {
    this._tickBefore.splice(i, 1);
  }
  if (this._tickAfter !== null && (i = this._tickAfter.indexOf(ticker)) >= 0) {
    this._tickAfter.splice(i, 1);
  }
};

Class.prototype.timeout = function(fn, time) {
  this.setTimeout(fn, time);
};

Class.prototype.setTimeout = function(fn, time) {
  function timer(t) {
    if ((time -= t) < 0) {
      this.untick(timer);
      fn.call(this);
    } else {
      return true;
    }
  }
  this.tick(timer);
  return timer;
};

Class.prototype.clearTimeout = function(timer) {
  this.untick(timer);
};


},{"./core":60,"./pin":68,"./util/stats":80}],67:[function(require,module,exports){
function Matrix(a, b, c, d, e, f) {
  this.reset(a, b, c, d, e, f);
};

Matrix.prototype.toString = function() {
  return '[' + this.a + ', ' + this.b + ', ' + this.c + ', ' + this.d + ', '
      + this.e + ', ' + this.f + ']';
};

Matrix.prototype.clone = function() {
  return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
};

Matrix.prototype.reset = function(a, b, c, d, e, f) {
  this._dirty = true;
  if (typeof a === 'object') {
    this.a = a.a, this.d = a.d;
    this.b = a.b, this.c = a.c;
    this.e = a.e, this.f = a.f;
  } else {
    this.a = a || 1, this.d = d || 1;
    this.b = b || 0, this.c = c || 0;
    this.e = e || 0, this.f = f || 0;
  }
  return this;
};

Matrix.prototype.identity = function() {
  this._dirty = true;
  this.a = 1;
  this.b = 0;
  this.c = 0;
  this.d = 1;
  this.e = 0;
  this.f = 0;
  return this;
};

Matrix.prototype.rotate = function(angle) {
  if (!angle) {
    return this;
  }

  this._dirty = true;

  var u = angle ? Math.cos(angle) : 1;
  // android bug may give bad 0 values
  var v = angle ? Math.sin(angle) : 0;

  var a = u * this.a - v * this.b;
  var b = u * this.b + v * this.a;
  var c = u * this.c - v * this.d;
  var d = u * this.d + v * this.c;
  var e = u * this.e - v * this.f;
  var f = u * this.f + v * this.e;

  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.e = e;
  this.f = f;

  return this;
};

Matrix.prototype.translate = function(x, y) {
  if (!x && !y) {
    return this;
  }
  this._dirty = true;
  this.e += x;
  this.f += y;
  return this;
};

Matrix.prototype.scale = function(x, y) {
  if (!(x - 1) && !(y - 1)) {
    return this;
  }
  this._dirty = true;
  this.a *= x;
  this.b *= y;
  this.c *= x;
  this.d *= y;
  this.e *= x;
  this.f *= y;
  return this;
};

Matrix.prototype.skew = function(x, y) {
  if (!x && !y) {
    return this;
  }
  this._dirty = true;

  var a = this.a + this.b * x;
  var b = this.b + this.a * y;
  var c = this.c + this.d * x;
  var d = this.d + this.c * y;
  var e = this.e + this.f * x;
  var f = this.f + this.e * y;

  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.e = e;
  this.f = f;
  return this;
};

Matrix.prototype.concat = function(m) {
  this._dirty = true;

  var n = this;

  var a = n.a * m.a + n.b * m.c;
  var b = n.b * m.d + n.a * m.b;
  var c = n.c * m.a + n.d * m.c;
  var d = n.d * m.d + n.c * m.b;
  var e = n.e * m.a + m.e + n.f * m.c;
  var f = n.f * m.d + m.f + n.e * m.b;

  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.e = e;
  this.f = f;

  return this;
};

Matrix.prototype.inverse = Matrix.prototype.reverse = function() {
  if (this._dirty) {
    this._dirty = false;
    this.inversed = this.inversed || new Matrix();
    var z = this.a * this.d - this.b * this.c;
    this.inversed.a = this.d / z;
    this.inversed.b = -this.b / z;
    this.inversed.c = -this.c / z;
    this.inversed.d = this.a / z;
    this.inversed.e = (this.c * this.f - this.e * this.d) / z;
    this.inversed.f = (this.e * this.b - this.a * this.f) / z;
  }
  return this.inversed;
};

Matrix.prototype.map = function(p, q) {
  q = q || {};
  q.x = this.a * p.x + this.c * p.y + this.e;
  q.y = this.b * p.x + this.d * p.y + this.f;
  return q;
};

Matrix.prototype.mapX = function(x, y) {
  if (typeof x === 'object')
    y = x.y, x = x.x;
  return this.a * x + this.c * y + this.e;
};

Matrix.prototype.mapY = function(x, y) {
  if (typeof x === 'object')
    y = x.y, x = x.x;
  return this.b * x + this.d * y + this.f;
};

module.exports = Matrix;

},{}],68:[function(require,module,exports){
var Class = require('./core');
var Matrix = require('./matrix');

var iid = 0;

Class._init(function() {
  this._pin = new Pin(this);
});

Class.prototype.matrix = function(relative) {
  if (relative === true) {
    return this._pin.relativeMatrix();
  }
  return this._pin.absoluteMatrix();
};

Class.prototype.pin = function(a, b) {
  if (typeof a === 'object') {
    this._pin.set(a);
    return this;

  } else if (typeof a === 'string') {
    if (typeof b === 'undefined') {
      return this._pin.get(a);
    } else {
      this._pin.set(a, b);
      return this;
    }
  } else if (typeof a === 'undefined') {
    return this._pin;
  }
};

function Pin(owner) {

  this._owner = owner;
  this._parent = null;

  // relative to parent
  this._relativeMatrix = new Matrix();

  // relative to stage
  this._absoluteMatrix = new Matrix();

  this.reset();
};

Pin.prototype.reset = function() {

  this._textureAlpha = 1;
  this._alpha = 1;

  this._width = 0;
  this._height = 0;

  this._scaleX = 1;
  this._scaleY = 1;
  this._skewX = 0;
  this._skewY = 0;
  this._rotation = 0;

  // scale/skew/rotate center
  this._pivoted = false;
  this._pivotX = null;
  this._pivotY = null;

  // self pin point
  this._handled = false;
  this._handleX = 0;
  this._handleY = 0;

  // parent pin point
  this._aligned = false;
  this._alignX = 0;
  this._alignY = 0;

  // as seen by parent px
  this._offsetX = 0;
  this._offsetY = 0;

  this._boxX = 0;
  this._boxY = 0;
  this._boxWidth = this._width;
  this._boxHeight = this._height;

  // TODO: also set for owner
  this._ts_translate = ++iid;
  this._ts_transform = ++iid;
  this._ts_matrix = ++iid;
};

Pin.prototype._update = function() {
  this._parent = this._owner._parent && this._owner._parent._pin;

  // if handled and transformed then be translated
  if (this._handled && this._mo_handle != this._ts_transform) {
    this._mo_handle = this._ts_transform;
    this._ts_translate = ++iid;
  }

  if (this._aligned && this._parent
      && this._mo_align != this._parent._ts_transform) {
    this._mo_align = this._parent._ts_transform;
    this._ts_translate = ++iid;
  }

  return this;
};

Pin.prototype.toString = function() {
  return this._owner + ' (' + (this._parent ? this._parent._owner : null) + ')';
};

// TODO: ts fields require refactoring

Pin.prototype.absoluteMatrix = function() {
  this._update();
  var ts = Math.max(this._ts_transform, this._ts_translate,
      this._parent ? this._parent._ts_matrix : 0);
  if (this._mo_abs == ts) {
    return this._absoluteMatrix;
  }
  this._mo_abs = ts;

  var abs = this._absoluteMatrix;
  abs.reset(this.relativeMatrix());

  this._parent && abs.concat(this._parent._absoluteMatrix);

  this._ts_matrix = ++iid;

  return abs;
};

Pin.prototype.relativeMatrix = function() {
  this._update();
  var ts = Math.max(this._ts_transform, this._ts_translate,
      this._parent ? this._parent._ts_transform : 0);
  if (this._mo_rel == ts) {
    return this._relativeMatrix;
  }
  this._mo_rel = ts;

  var rel = this._relativeMatrix;

  rel.identity();
  if (this._pivoted) {
    rel.translate(-this._pivotX * this._width, -this._pivotY * this._height);
  }
  rel.scale(this._scaleX, this._scaleY);
  rel.skew(this._skewX, this._skewY);
  rel.rotate(this._rotation);
  if (this._pivoted) {
    rel.translate(this._pivotX * this._width, this._pivotY * this._height);
  }

  // calculate effective box
  if (this._pivoted) {
    // origin
    this._boxX = 0;
    this._boxY = 0;
    this._boxWidth = this._width;
    this._boxHeight = this._height;

  } else {
    // aabb
    var p, q;
    if (rel.a > 0 && rel.c > 0 || rel.a < 0 && rel.c < 0) {
      p = 0, q = rel.a * this._width + rel.c * this._height;
    } else {
      p = rel.a * this._width, q = rel.c * this._height;
    }
    if (p > q) {
      this._boxX = q;
      this._boxWidth = p - q;
    } else {
      this._boxX = p;
      this._boxWidth = q - p;
    }
    if (rel.b > 0 && rel.d > 0 || rel.b < 0 && rel.d < 0) {
      p = 0, q = rel.b * this._width + rel.d * this._height;
    } else {
      p = rel.b * this._width, q = rel.d * this._height;
    }
    if (p > q) {
      this._boxY = q;
      this._boxHeight = p - q;
    } else {
      this._boxY = p;
      this._boxHeight = q - p;
    }
  }

  this._x = this._offsetX;
  this._y = this._offsetY;

  this._x -= this._boxX + this._handleX * this._boxWidth;
  this._y -= this._boxY + this._handleY * this._boxHeight;

  if (this._aligned && this._parent) {
    this._parent.relativeMatrix();
    this._x += this._alignX * this._parent._width;
    this._y += this._alignY * this._parent._height;
  }

  rel.translate(this._x, this._y);

  return this._relativeMatrix;
};

Pin.prototype.get = function(key) {
  if (typeof getters[key] === 'function') {
    return getters[key](this);
  }
};

// TODO: Use defineProperty instead? What about multi-field pinning?
Pin.prototype.set = function(a, b) {
  if (typeof a === 'string') {
    if (typeof setters[a] === 'function' && typeof b !== 'undefined') {
      setters[a](this, b);
    }
  } else if (typeof a === 'object') {
    for (b in a) {
      if (typeof setters[b] === 'function' && typeof a[b] !== 'undefined') {
        setters[b](this, a[b], a);
      }
    }
  }
  if (this._owner) {
    this._owner._ts_pin = ++iid;
    this._owner.touch();
  }
  return this;
};

var getters = {
  alpha : function(pin) {
    return pin._alpha;
  },

  textureAlpha : function(pin) {
    return pin._textureAlpha;
  },

  width : function(pin) {
    return pin._width;
  },

  height : function(pin) {
    return pin._height;
  },

  boxWidth : function(pin) {
    return pin._boxWidth;
  },

  boxHeight : function(pin) {
    return pin._boxHeight;
  },

  // scale : function(pin) {
  // },

  scaleX : function(pin) {
    return pin._scaleX;
  },

  scaleY : function(pin) {
    return pin._scaleY;
  },

  // skew : function(pin) {
  // },

  skewX : function(pin) {
    return pin._skewX;
  },

  skewY : function(pin) {
    return pin._skewY;
  },

  rotation : function(pin) {
    return pin._rotation;
  },

  // pivot : function(pin) {
  // },

  pivotX : function(pin) {
    return pin._pivotX;
  },

  pivotY : function(pin) {
    return pin._pivotY;
  },

  // offset : function(pin) {
  // },

  offsetX : function(pin) {
    return pin._offsetX;
  },

  offsetY : function(pin) {
    return pin._offsetY;
  },

  // align : function(pin) {
  // },

  alignX : function(pin) {
    return pin._alignX;
  },

  alignY : function(pin) {
    return pin._alignY;
  },

  // handle : function(pin) {
  // },

  handleX : function(pin) {
    return pin._handleX;
  },

  handleY : function(pin) {
    return pin._handleY;
  }
};

var setters = {
  alpha : function(pin, value) {
    pin._alpha = value;
  },

  textureAlpha : function(pin, value) {
    pin._textureAlpha = value;
  },

  width : function(pin, value) {
    pin._width_ = value;
    pin._width = value;
    pin._ts_transform = ++iid;
  },

  height : function(pin, value) {
    pin._height_ = value;
    pin._height = value;
    pin._ts_transform = ++iid;
  },

  scale : function(pin, value) {
    pin._scaleX = value;
    pin._scaleY = value;
    pin._ts_transform = ++iid;
  },

  scaleX : function(pin, value) {
    pin._scaleX = value;
    pin._ts_transform = ++iid;
  },

  scaleY : function(pin, value) {
    pin._scaleY = value;
    pin._ts_transform = ++iid;
  },

  skew : function(pin, value) {
    pin._skewX = value;
    pin._skewY = value;
    pin._ts_transform = ++iid;
  },

  skewX : function(pin, value) {
    pin._skewX = value;
    pin._ts_transform = ++iid;
  },

  skewY : function(pin, value) {
    pin._skewY = value;
    pin._ts_transform = ++iid;
  },

  rotation : function(pin, value) {
    pin._rotation = value;
    pin._ts_transform = ++iid;
  },

  pivot : function(pin, value) {
    pin._pivotX = value;
    pin._pivotY = value;
    pin._pivoted = true;
    pin._ts_transform = ++iid;
  },

  pivotX : function(pin, value) {
    pin._pivotX = value;
    pin._pivoted = true;
    pin._ts_transform = ++iid;
  },

  pivotY : function(pin, value) {
    pin._pivotY = value;
    pin._pivoted = true;
    pin._ts_transform = ++iid;
  },

  offset : function(pin, value) {
    pin._offsetX = value;
    pin._offsetY = value;
    pin._ts_translate = ++iid;
  },

  offsetX : function(pin, value) {
    pin._offsetX = value;
    pin._ts_translate = ++iid;
  },

  offsetY : function(pin, value) {
    pin._offsetY = value;
    pin._ts_translate = ++iid;
  },

  align : function(pin, value) {
    this.alignX(pin, value);
    this.alignY(pin, value);
  },

  alignX : function(pin, value) {
    pin._alignX = value;
    pin._aligned = true;
    pin._ts_translate = ++iid;

    this.handleX(pin, value);
  },

  alignY : function(pin, value) {
    pin._alignY = value;
    pin._aligned = true;
    pin._ts_translate = ++iid;

    this.handleY(pin, value);
  },

  handle : function(pin, value) {
    this.handleX(pin, value);
    this.handleY(pin, value);
  },

  handleX : function(pin, value) {
    pin._handleX = value;
    pin._handled = true;
    pin._ts_translate = ++iid;
  },

  handleY : function(pin, value) {
    pin._handleY = value;
    pin._handled = true;
    pin._ts_translate = ++iid;
  },

  resizeMode : function(pin, value, all) {
    if (all) {
      if (value == 'in') {
        value = 'in-pad';
      } else if (value == 'out') {
        value = 'out-crop';
      }
      scaleTo(pin, all.resizeWidth, all.resizeHeight, value);
    }
  },

  resizeWidth : function(pin, value, all) {
    if (!all || !all.resizeMode) {
      scaleTo(pin, value, null);
    }
  },

  resizeHeight : function(pin, value, all) {
    if (!all || !all.resizeMode) {
      scaleTo(pin, null, value);
    }
  },

  scaleMode : function(pin, value, all) {
    if (all) {
      scaleTo(pin, all.scaleWidth, all.scaleHeight, value);
    }
  },

  scaleWidth : function(pin, value, all) {
    if (!all || !all.scaleMode) {
      scaleTo(pin, value, null);
    }
  },

  scaleHeight : function(pin, value, all) {
    if (!all || !all.scaleMode) {
      scaleTo(pin, null, value);
    }
  },

  matrix : function(pin, value) {
    this.scaleX(pin, value.a);
    this.skewX(pin, value.c / value.d);
    this.skewY(pin, value.b / value.a);
    this.scaleY(pin, value.d);
    this.offsetX(pin, value.e);
    this.offsetY(pin, value.f);
    this.rotation(pin, 0);
  }
};

function scaleTo(pin, width, height, mode) {
  var w = typeof width === 'number';
  var h = typeof height === 'number';
  var m = typeof mode === 'string';
  pin._ts_transform = ++iid;
  if (w) {
    pin._scaleX = width / pin._width_;
    pin._width = pin._width_;
  }
  if (h) {
    pin._scaleY = height / pin._height_;
    pin._height = pin._height_;
  }
  if (w && h && m) {
    if (mode == 'out' || mode == 'out-crop') {
      pin._scaleX = pin._scaleY = Math.max(pin._scaleX, pin._scaleY);
    } else if (mode == 'in' || mode == 'in-pad') {
      pin._scaleX = pin._scaleY = Math.min(pin._scaleX, pin._scaleY);
    }
    if (mode == 'out-crop' || mode == 'in-pad') {
      pin._width = width / pin._scaleX;
      pin._height = height / pin._scaleY;
    }
  }
};

Class.prototype.scaleTo = function(a, b, c) {
  if (typeof a === 'object')
    c = b, b = a.y, a = a.x;
  scaleTo(this._pin, a, b, c);
  return this;
};

// Used by Tween class
Pin._add_shortcuts = function(Class) {
  Class.prototype.size = function(w, h) {
    this.pin('width', w);
    this.pin('height', h);
    return this;
  };

  Class.prototype.width = function(w) {
    if (typeof w === 'undefined') {
      return this.pin('width');
    }
    this.pin('width', w);
    return this;
  };

  Class.prototype.height = function(h) {
    if (typeof h === 'undefined') {
      return this.pin('height');
    }
    this.pin('height', h);
    return this;
  };

  Class.prototype.offset = function(a, b) {
    if (typeof a === 'object')
      b = a.y, a = a.x;
    this.pin('offsetX', a);
    this.pin('offsetY', b);
    return this;
  };

  Class.prototype.rotate = function(a) {
    this.pin('rotation', a);
    return this;
  };

  Class.prototype.skew = function(a, b) {
    if (typeof a === 'object')
      b = a.y, a = a.x;
    else if (typeof b === 'undefined')
      b = a;
    this.pin('skewX', a);
    this.pin('skewY', b);
    return this;
  };

  Class.prototype.scale = function(a, b) {
    if (typeof a === 'object')
      b = a.y, a = a.x;
    else if (typeof b === 'undefined')
      b = a;
    this.pin('scaleX', a);
    this.pin('scaleY', b);
    return this;
  };

  Class.prototype.alpha = function(a, ta) {
    this.pin('alpha', a);
    if (typeof ta !== 'undefined') {
      this.pin('textureAlpha', ta);
    }
    return this;
  };
};

Pin._add_shortcuts(Class);

module.exports = Pin;

},{"./core":60,"./matrix":67}],69:[function(require,module,exports){
var Class = require('./core');
require('./pin');
require('./loop');

var stats = require('./util/stats');
var create = require('./util/create');
var extend = require('./util/extend');

Root._super = Class;
Root.prototype = create(Root._super.prototype);

Class.root = function(request, render) {
  return new Root(request, render);
};

function Root(request, render) {
  Root._super.call(this);
  this.label('Root');

  var paused = true;

  var self = this;
  var lastTime = 0;
  var loop = function(now) {
    if (paused === true) {
      return;
    }

    stats.tick = stats.node = stats.draw = 0;

    var last = lastTime || now;
    var elapsed = now - last;
    lastTime = now;

    var ticked = self._tick(elapsed, now, last);
    if (self._mo_touch != self._ts_touch) {
      self._mo_touch = self._ts_touch;
      render(self);
      request(loop);
    } else if (ticked) {
      request(loop);
    } else {
      paused = true;
    }

    stats.fps = elapsed ? 1000 / elapsed : 0;
  };

  this.start = function() {
    return this.resume();
  };

  this.resume = function() {
    if (paused) {
      this.publish('resume');
      paused = false;
      request(loop);
    }
    return this;
  };

  this.pause = function() {
    if (!paused) {
      this.publish('pause');
    }
    paused = true;
    return this;
  };

  this.touch_root = this.touch;
  this.touch = function() {
    this.resume();
    return this.touch_root();
  };
};

Root.prototype.background = function(color) {
  // to be implemented by loaders
  return this;
};

Root.prototype.viewport = function(width, height, ratio) {
  if (typeof width === 'undefined') {
    return extend({}, this._viewport);
  }
  this._viewport = {
    width : width,
    height : height,
    ratio : ratio || 1
  };
  this.viewbox();
  var data = extend({}, this._viewport);
  this.visit({
    start : function(node) {
      if (!node._flag('viewport')) {
        return true;
      }
      node.publish('viewport', [ data ]);
    }
  });
  return this;
};

// TODO: static/fixed viewbox
Root.prototype.viewbox = function(width, height, mode) {
  if (typeof width === 'number' && typeof height === 'number') {
    this._viewbox = {
      width : width,
      height : height,
      mode : /^(in|out|in-pad|out-crop)$/.test(mode) ? mode : 'in-pad'
    };
  }

  var box = this._viewbox;
  var size = this._viewport;
  if (size && box) {
    this.pin({
      width : box.width,
      height : box.height
    });
    this.scaleTo(size.width, size.height, box.mode);
  } else if (size) {
    this.pin({
      width : size.width,
      height : size.height
    });
  }

  return this;
};

},{"./core":60,"./loop":66,"./pin":68,"./util/create":74,"./util/extend":76,"./util/stats":80}],70:[function(require,module,exports){
var Class = require('./core');
require('./pin');
require('./loop');

var create = require('./util/create');
var is = require('./util/is');

Class.string = function(frames) {
  return new Str().frames(frames);
};

Str._super = Class;
Str.prototype = create(Str._super.prototype);

function Str() {
  Str._super.call(this);
  this.label('String');
  this._textures = [];
};

/**
 * @deprecated Use frames
 */
Str.prototype.setFont = function(a, b, c) {
  return this.frames(a, b, c);
};

Str.prototype.frames = function(frames) {
  this._textures = [];
  if (typeof frames == 'string') {
    frames = Class.texture(frames);
    this._item = function(value) {
      return frames.one(value);
    };
  } else if (typeof frames === 'object') {
    this._item = function(value) {
      return frames[value];
    };
  } else if (typeof frames === 'function') {
    this._item = frames;
  }
  return this;
};

/**
 * @deprecated Use value
 */
Str.prototype.setValue = function(a, b, c) {
  return this.value(a, b, c);
};

Str.prototype.value = function(value) {
  if (typeof value === 'undefined') {
    return this._value;
  }
  if (this._value === value) {
    return this;
  }
  this._value = value;

  if (value === null) {
    value = '';
  } else if (typeof value !== 'string' && !is.array(value)) {
    value = value.toString();
  }

  this._spacing = this._spacing || 0;

  var width = 0, height = 0;
  for (var i = 0; i < value.length; i++) {
    var image = this._textures[i] = this._item(value[i]);
    width += i > 0 ? this._spacing : 0;
    image.dest(width, 0);
    width = width + image.width;
    height = Math.max(height, image.height);
  }
  this.pin('width', width);
  this.pin('height', height);
  this._textures.length = value.length;
  return this;
};

},{"./core":60,"./loop":66,"./pin":68,"./util/create":74,"./util/is":77}],71:[function(require,module,exports){
var stats = require('./util/stats');
var math = require('./util/math');

function Texture(image, ratio) {
  if (typeof image === 'object') {
    this.src(image, ratio);
  }
}

Texture.prototype.pipe = function() {
  return new Texture(this);
};

/**
 * Signatures: (image), (x, y, w, h), (w, h)
 */
Texture.prototype.src = function(x, y, w, h) {
  if (typeof x === 'object') {
    var image = x, ratio = y || 1;

    this._image = image;
    this._sx = this._dx = 0;
    this._sy = this._dy = 0;
    this._sw = this._dw = image.width / ratio;
    this._sh = this._dh = image.height / ratio;

    this.width = image.width / ratio;
    this.height = image.height / ratio;

    this.ratio = ratio;

  } else {
    if (typeof w === 'undefined') {
      w = x, h = y;
    } else {
      this._sx = x, this._sy = y;
    }
    this._sw = this._dw = w;
    this._sh = this._dh = h;

    this.width = w;
    this.height = h;
  }
  return this;
};

/**
 * Signatures: (x, y, w, h), (x, y)
 */
Texture.prototype.dest = function(x, y, w, h) {
  this._dx = x, this._dy = y;
  this._dx = x, this._dy = y;
  if (typeof w !== 'undefined') {
    this._dw = w, this._dh = h;
    this.width = w, this.height = h;
  }
  return this;
};

Texture.prototype.draw = function(context, x1, y1, x2, y2, x3, y3, x4, y4) {
  var image = this._image;
  if (image === null || typeof image !== 'object') {
    return;
  }

  var sx = this._sx, sy = this._sy;
  var sw = this._sw, sh = this._sh;
  var dx = this._dx, dy = this._dy;
  var dw = this._dw, dh = this._dh;

  if (typeof x3 !== 'undefined') {
    x1 = math.limit(x1, 0, this._sw), x2 = math.limit(x2, 0, this._sw - x1);
    y1 = math.limit(y1, 0, this._sh), y2 = math.limit(y2, 0, this._sh - y1);
    sx += x1, sy += y1, sw = x2, sh = y2;
    dx = x3, dy = y3, dw = x4, dh = y4;

  } else if (typeof x2 !== 'undefined') {
    dx = x1, dy = y1, dw = x2, dh = y2;

  } else if (typeof x1 !== 'undefined') {
    dw = x1, dh = y1;
  }

  var ratio = this.ratio || 1;
  sx *= ratio, sy *= ratio, sw *= ratio, sh *= ratio;

  try {
    if (typeof image.draw === 'function') {
      image.draw(context, sx, sy, sw, sh, dx, dy, dw, dh);
    } else {
      stats.draw++;
      context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    }
  } catch (ex) {
    if (!image._draw_failed) {
      console.log('Unable to draw: ', image);
      console.log(ex);
      image._draw_failed = true;
    }
  }
};

module.exports = Texture;

},{"./util/math":78,"./util/stats":80}],72:[function(require,module,exports){
var Class = require('./core');
var is = require('./util/is');

var iid = 0;

// TODO: do not clear next/prev/parent on remove

Class.prototype._label = '';

Class.prototype._visible = true;

Class.prototype._parent = null;
Class.prototype._next = null;
Class.prototype._prev = null;

Class.prototype._first = null;
Class.prototype._last = null;

Class.prototype._attrs = null;
Class.prototype._flags = null;

Class.prototype.toString = function() {
  return '[' + this._label + ']';
};

/**
 * @deprecated Use label()
 */
Class.prototype.id = function(id) {
  return this.label(id);
};

Class.prototype.label = function(label) {
  if (typeof label === 'undefined') {
    return this._label;
  }
  this._label = label;
  return this;
};

Class.prototype.attr = function(name, value) {
  if (typeof value === 'undefined') {
    return this._attrs !== null ? this._attrs[name] : undefined;
  }
  (this._attrs !== null ? this._attrs : this._attrs = {})[name] = value;
  return this;
};

Class.prototype.visible = function(visible) {
  if (typeof visible === 'undefined') {
    return this._visible;
  }
  this._visible = visible;
  this._parent && (this._parent._ts_children = ++iid);
  this._ts_pin = ++iid;
  this.touch();
  return this;
};

Class.prototype.hide = function() {
  return this.visible(false);
};

Class.prototype.show = function() {
  return this.visible(true);
};

Class.prototype.parent = function() {
  return this._parent;
};

Class.prototype.next = function(visible) {
  var next = this._next;
  while (next && visible && !next._visible) {
    next = next._next;
  }
  return next;
};

Class.prototype.prev = function(visible) {
  var prev = this._prev;
  while (prev && visible && !prev._visible) {
    prev = prev._prev;
  }
  return prev;
};

Class.prototype.first = function(visible) {
  var next = this._first;
  while (next && visible && !next._visible) {
    next = next._next;
  }
  return next;
};

Class.prototype.last = function(visible) {
  var prev = this._last;
  while (prev && visible && !prev._visible) {
    prev = prev._prev;
  }
  return prev;
};

Class.prototype.visit = function(visitor, data) {
  var reverse = visitor.reverse;
  var visible = visitor.visible;
  if (visitor.start && visitor.start(this, data)) {
    return;
  }
  var child, next = reverse ? this.last(visible) : this.first(visible);
  while (child = next) {
    next = reverse ? child.prev(visible) : child.next(visible);
    if (child.visit(visitor, data)) {
      return true;
    }
  }
  return visitor.end && visitor.end(this, data);
};

Class.prototype.append = function(child, more) {
  if (is.array(child))
    for (var i = 0; i < child.length; i++)
      append(this, child[i]);

  else if (typeof more !== 'undefined') // deprecated
    for (var i = 0; i < arguments.length; i++)
      append(this, arguments[i]);

  else if (typeof child !== 'undefined')
    append(this, child);

  return this;
};

Class.prototype.prepend = function(child, more) {
  if (is.array(child))
    for (var i = child.length - 1; i >= 0; i--)
      prepend(this, child[i]);

  else if (typeof more !== 'undefined') // deprecated
    for (var i = arguments.length - 1; i >= 0; i--)
      prepend(this, arguments[i]);

  else if (typeof child !== 'undefined')
    prepend(this, child);

  return this;
};

Class.prototype.appendTo = function(parent) {
  append(parent, this);
  return this;
};

Class.prototype.prependTo = function(parent) {
  prepend(parent, this);
  return this;
};

Class.prototype.insertNext = function(sibling, more) {
  if (is.array(sibling))
    for (var i = 0; i < sibling.length; i++)
      insertAfter(sibling[i], this);

  else if (typeof more !== 'undefined') // deprecated
    for (var i = 0; i < arguments.length; i++)
      insertAfter(arguments[i], this);

  else if (typeof sibling !== 'undefined')
    insertAfter(sibling, this);

  return this;
};

Class.prototype.insertPrev = function(sibling, more) {
  if (is.array(sibling))
    for (var i = sibling.length - 1; i >= 0; i--)
      insertBefore(sibling[i], this);

  else if (typeof more !== 'undefined') // deprecated
    for (var i = arguments.length - 1; i >= 0; i--)
      insertBefore(arguments[i], this);

  else if (typeof sibling !== 'undefined')
    insertBefore(sibling, this);

  return this;
};

Class.prototype.insertAfter = function(prev) {
  insertAfter(this, prev);
  return this;
};

Class.prototype.insertBefore = function(next) {
  insertBefore(this, next);
  return this;
};

function append(parent, child) {
  _ensure(child);
  _ensure(parent);

  child.remove();

  if (parent._last) {
    parent._last._next = child;
    child._prev = parent._last;
  }

  child._parent = parent;
  parent._last = child;

  if (!parent._first) {
    parent._first = child;
  }

  child._parent._flag(child, true);

  child._ts_parent = ++iid;
  parent._ts_children = ++iid;
  parent.touch();
}

function prepend(parent, child) {
  _ensure(child);
  _ensure(parent);

  child.remove();

  if (parent._first) {
    parent._first._prev = child;
    child._next = parent._first;
  }

  child._parent = parent;
  parent._first = child;

  if (!parent._last) {
    parent._last = child;
  }

  child._parent._flag(child, true);

  child._ts_parent = ++iid;
  parent._ts_children = ++iid;
  parent.touch();
};

function insertBefore(self, next) {
  _ensure(self);
  _ensure(next);

  self.remove();

  var parent = next._parent;
  var prev = next._prev;

  next._prev = self;
  prev && (prev._next = self) || parent && (parent._first = self);

  self._parent = parent;
  self._prev = prev;
  self._next = next;

  self._parent._flag(self, true);

  self._ts_parent = ++iid;
  self.touch();
};

function insertAfter(self, prev) {
  _ensure(self);
  _ensure(prev);

  self.remove();

  var parent = prev._parent;
  var next = prev._next;

  prev._next = self;
  next && (next._prev = self) || parent && (parent._last = self);

  self._parent = parent;
  self._prev = prev;
  self._next = next;

  self._parent._flag(self, true);

  self._ts_parent = ++iid;
  self.touch();
};

Class.prototype.remove = function(child, more) {
  if (typeof child !== 'undefined') {
    if (is.array(child)) {
      for (var i = 0; i < child.length; i++)
        _ensure(child[i]).remove();

    } else if (typeof more !== 'undefined') {
      for (var i = 0; i < arguments.length; i++)
        _ensure(arguments[i]).remove();

    } else {
      _ensure(child).remove();
    }
    return this;
  }

  if (this._prev) {
    this._prev._next = this._next;
  }
  if (this._next) {
    this._next._prev = this._prev;
  }

  if (this._parent) {
    if (this._parent._first === this) {
      this._parent._first = this._next;
    }
    if (this._parent._last === this) {
      this._parent._last = this._prev;
    }

    this._parent._flag(this, false);

    this._parent._ts_children = ++iid;
    this._parent.touch();
  }

  this._prev = this._next = this._parent = null;
  this._ts_parent = ++iid;
  // this._parent.touch();

  return this;
};

Class.prototype.empty = function() {
  var child, next = this._first;
  while (child = next) {
    next = child._next;
    child._prev = child._next = child._parent = null;

    this._flag(child, false);
  }

  this._first = this._last = null;

  this._ts_children = ++iid;
  this.touch();
  return this;
};

Class.prototype.touch = function() {
  this._ts_touch = ++iid;
  this._parent && this._parent.touch();
  return this;
};

/**
 * Deep flags used for optimizing event distribution.
 */
Class.prototype._flag = function(obj, name) {
  if (typeof name === 'undefined') {
    return this._flags !== null && this._flags[obj] || 0;
  }
  if (typeof obj === 'string') {
    if (name) {
      this._flags = this._flags || {};
      if (!this._flags[obj] && this._parent) {
        this._parent._flag(obj, true);
      }
      this._flags[obj] = (this._flags[obj] || 0) + 1;

    } else if (this._flags && this._flags[obj] > 0) {
      if (this._flags[obj] == 1 && this._parent) {
        this._parent._flag(obj, false);
      }
      this._flags[obj] = this._flags[obj] - 1;
    }
  }
  if (typeof obj === 'object') {
    if (obj._flags) {
      for ( var type in obj._flags) {
        if (obj._flags[type] > 0) {
          this._flag(type, name);
        }
      }
    }
  }
  return this;
};

/**
 * @private
 */
Class.prototype.hitTest = function(hit) {
  if (this.attr('spy')) {
    return true;
  }
  return hit.x >= 0 && hit.x <= this._pin._width && hit.y >= 0
      && hit.y <= this._pin._height;
};

function _ensure(obj) {
  if (obj && obj instanceof Class) {
    return obj;
  }
  throw 'Invalid node: ' + obj;
};

module.exports = Class;

},{"./core":60,"./util/is":77}],73:[function(require,module,exports){
module.exports = function() {
  var count = 0;
  function fork(fn, n) {
    count += n = (typeof n === 'number' && n >= 1 ? n : 1);
    return function() {
      fn && fn.apply(this, arguments);
      if (n > 0) {
        n--, count--, call();
      }
    };
  }
  var then = [];
  function call() {
    if (count === 0) {
      while (then.length) {
        setTimeout(then.shift(), 0);
      }
    }
  }
  fork.then = function(fn) {
    if (count === 0) {
      setTimeout(fn, 0);
    } else {
      then.push(fn);
    }
  };
  return fork;
};
},{}],74:[function(require,module,exports){
if (typeof Object.create == 'function') {
  module.exports = function(proto, props) {
    return Object.create.call(Object, proto, props);
  };
} else {
  module.exports = function(proto, props) {
    if (props)
      throw Error('Second argument is not supported!');
    if (typeof proto !== 'object' || proto === null)
      throw Error('Invalid prototype!');
    noop.prototype = proto;
    return new noop;
  };
  function noop() {
  }
}

},{}],75:[function(require,module,exports){
module.exports = function(prototype, callback) {

  prototype._listeners = null;

  prototype.on = prototype.listen = function(types, listener) {
    if (!types || !types.length || typeof listener !== 'function') {
      return this;
    }
    if (this._listeners === null) {
      this._listeners = {};
    }
    var isarray = typeof types !== 'string' && typeof types.join === 'function';
    if (types = (isarray ? types.join(' ') : types).match(/\S+/g)) {
      for (var i = 0; i < types.length; i++) {
        var type = types[i];
        this._listeners[type] = this._listeners[type] || [];
        this._listeners[type].push(listener);
        if (typeof callback === 'function') {
          callback(this, type, true);
        }
      }
    }
    return this;
  };

  prototype.off = function(types, listener) {
    if (!types || !types.length || typeof listener !== 'function') {
      return this;
    }
    if (this._listeners === null) {
      return this;
    }
    var isarray = typeof types !== 'string' && typeof types.join === 'function';
    if (types = (isarray ? types.join(' ') : types).match(/\S+/g)) {
      for (var i = 0; i < types.length; i++) {
        var type = types[i], all = this._listeners[type], index;
        if (all && (index = all.indexOf(listener)) >= 0) {
          all.splice(index, 1);
          if (!all.length) {
            delete this._listeners[type];
          }
          if (typeof callback === 'function') {
            callback(this, type, false);
          }
        }
      }
    }
    return this;
  };

  prototype.listeners = function(type) {
    return this._listeners && this._listeners[type];
  };

  prototype.publish = function(name, args) {
    var listeners = this.listeners(name);
    if (!listeners || !listeners.length) {
      return 0;
    }
    for (var l = 0; l < listeners.length; l++) {
      listeners[l].apply(this, args);
    }
    return listeners.length;
  };

  prototype.trigger = function(name, args) {
    this.publish(name, args);
    return this;
  };

};

},{}],76:[function(require,module,exports){
module.exports = function(base) {
  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];
    for ( var key in obj) {
      if (obj.hasOwnProperty(key)) {
        base[key] = obj[key];
      }
    }
  }
  return base;
};

},{}],77:[function(require,module,exports){
/**
 * ! is the definitive JavaScript type testing library
 * 
 * @copyright 2013-2014 Enrico Marino / Jordan Harband
 * @license MIT
 */

var objProto = Object.prototype;
var owns = objProto.hasOwnProperty;
var toStr = objProto.toString;

var NON_HOST_TYPES = {
  'boolean' : 1,
  'number' : 1,
  'string' : 1,
  'undefined' : 1
};

var hexRegex = /^[A-Fa-f0-9]+$/;

var is = module.exports = {};

is.a = is.an = is.type = function(value, type) {
  return typeof value === type;
};

is.defined = function(value) {
  return typeof value !== 'undefined';
};

is.empty = function(value) {
  var type = toStr.call(value);
  var key;

  if ('[object Array]' === type || '[object Arguments]' === type
      || '[object String]' === type) {
    return value.length === 0;
  }

  if ('[object Object]' === type) {
    for (key in value) {
      if (owns.call(value, key)) {
        return false;
      }
    }
    return true;
  }

  return !value;
};

is.equal = function(value, other) {
  if (value === other) {
    return true;
  }

  var type = toStr.call(value);
  var key;

  if (type !== toStr.call(other)) {
    return false;
  }

  if ('[object Object]' === type) {
    for (key in value) {
      if (!is.equal(value[key], other[key]) || !(key in other)) {
        return false;
      }
    }
    for (key in other) {
      if (!is.equal(value[key], other[key]) || !(key in value)) {
        return false;
      }
    }
    return true;
  }

  if ('[object Array]' === type) {
    key = value.length;
    if (key !== other.length) {
      return false;
    }
    while (--key) {
      if (!is.equal(value[key], other[key])) {
        return false;
      }
    }
    return true;
  }

  if ('[object Function]' === type) {
    return value.prototype === other.prototype;
  }

  if ('[object Date]' === type) {
    return value.getTime() === other.getTime();
  }

  return false;
};

is.instance = function(value, constructor) {
  return value instanceof constructor;
};

is.nil = function(value) {
  return value === null;
};

is.undef = function(value) {
  return typeof value === 'undefined';
};

is.array = function(value) {
  return '[object Array]' === toStr.call(value);
};

is.emptyarray = function(value) {
  return is.array(value) && value.length === 0;
};

is.arraylike = function(value) {
  return !!value && !is.boolean(value) && owns.call(value, 'length')
      && isFinite(value.length) && is.number(value.length) && value.length >= 0;
};

is.boolean = function(value) {
  return '[object Boolean]' === toStr.call(value);
};

is.element = function(value) {
  return value !== undefined && typeof HTMLElement !== 'undefined'
      && value instanceof HTMLElement && value.nodeType === 1;
};

is.fn = function(value) {
  return '[object Function]' === toStr.call(value);
};

is.number = function(value) {
  return '[object Number]' === toStr.call(value);
};

is.nan = function(value) {
  return !is.number(value) || value !== value;
};

is.object = function(value) {
  return '[object Object]' === toStr.call(value);
};

is.hash = function(value) {
  return is.object(value) && value.constructor === Object && !value.nodeType
      && !value.setInterval;
};

is.regexp = function(value) {
  return '[object RegExp]' === toStr.call(value);
};

is.string = function(value) {
  return '[object String]' === toStr.call(value);
};

is.hex = function(value) {
  return is.string(value) && (!value.length || hexRegex.test(value));
};

},{}],78:[function(require,module,exports){
var create = require('./create');
var native = Math;

module.exports = create(Math);

module.exports.random = function(min, max) {
  if (typeof min === 'undefined') {
    max = 1, min = 0;
  } else if (typeof max === 'undefined') {
    max = min, min = 0;
  }
  return min == max ? min : native.random() * (max - min) + min;
};

module.exports.rotate = function(num, min, max) {
  if (typeof min === 'undefined') {
    max = 1, min = 0;
  } else if (typeof max === 'undefined') {
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

module.exports.limit = function(num, min, max) {
  if (num < min) {
    return min;
  } else if (num > max) {
    return max;
  } else {
    return num;
  }
};

module.exports.length = function(x, y) {
  return native.sqrt(x * x + y * y);
};
},{"./create":74}],79:[function(require,module,exports){
module.exports = function(img, owidth, oheight, stretch, inner, insert) {

  var width = img.width;
  var height = img.height;
  var left = img.left;
  var right = img.right;
  var top = img.top;
  var bottom = img.bottom;

  left = typeof left === 'number' && left === left ? left : 0;
  right = typeof right === 'number' && right === right ? right : 0;
  top = typeof top === 'number' && top === top ? top : 0;
  bottom = typeof bottom === 'number' && bottom === bottom ? bottom : 0;

  width = width - left - right;
  height = height - top - bottom;

  if (!inner) {
    owidth = Math.max(owidth - left - right, 0);
    oheight = Math.max(oheight - top - bottom, 0);
  }

  var i = 0;

  if (top > 0 && left > 0)
    insert(i++, 0, 0, left, top, 0, 0, left, top);
  if (bottom > 0 && left > 0)
    insert(i++, 0, height + top, left, bottom, 0, oheight + top, left, bottom);
  if (top > 0 && right > 0)
    insert(i++, width + left, 0, right, top, owidth + left, 0, right, top);
  if (bottom > 0 && right > 0)
    insert(i++, width + left, height + top, right, bottom, owidth + left,
        oheight + top, right, bottom);

  if (stretch) {
    if (top > 0)
      insert(i++, left, 0, width, top, left, 0, owidth, top);
    if (bottom > 0)
      insert(i++, left, height + top, width, bottom, left, oheight + top,
          owidth, bottom);
    if (left > 0)
      insert(i++, 0, top, left, height, 0, top, left, oheight);
    if (right > 0)
      insert(i++, width + left, top, right, height, owidth + left, top, right,
          oheight);
    // center
    insert(i++, left, top, width, height, left, top, owidth, oheight);

  } else { // tile
    var l = left, r = owidth, w;
    while (r > 0) {
      w = Math.min(width, r), r -= width;
      var t = top, b = oheight, h;
      while (b > 0) {
        h = Math.min(height, b), b -= height;
        insert(i++, left, top, w, h, l, t, w, h);
        if (r <= 0) {
          if (left)
            insert(i++, 0, top, left, h, 0, t, left, h);
          if (right)
            insert(i++, width + left, top, right, h, l + w, t, right, h);
        }
        t += h;
      }
      if (top)
        insert(i++, left, 0, w, top, l, 0, w, top);
      if (bottom)
        insert(i++, left, height + top, w, bottom, l, t, w, bottom);
      l += w;
    }
  }

  return i;
};
},{}],80:[function(require,module,exports){
module.exports = {};

},{}],81:[function(require,module,exports){
module.exports.startsWith = function(str, sub) {
  return typeof str === 'string' && typeof sub === 'string'
      && str.substring(0, sub.length) == sub;
};
},{}],82:[function(require,module,exports){
module.exports = require('../lib/');

module.exports.internal = {};

require('../lib/canvas');
module.exports.internal.Image = require('../lib/image');
require('../lib/anim');
require('../lib/str');
require('../lib/layout');
require('../lib/addon/tween');
module.exports.Mouse = require('../lib/addon/mouse');
module.exports.Math = require('../lib/util/math');
module.exports._extend = require('../lib/util/extend');
module.exports._create = require('../lib/util/create');

require('../lib/loader/web');
},{"../lib/":63,"../lib/addon/mouse":55,"../lib/addon/tween":56,"../lib/anim":57,"../lib/canvas":59,"../lib/image":62,"../lib/layout":64,"../lib/loader/web":65,"../lib/str":70,"../lib/util/create":74,"../lib/util/extend":76,"../lib/util/math":78}]},{},[1])(1)
});